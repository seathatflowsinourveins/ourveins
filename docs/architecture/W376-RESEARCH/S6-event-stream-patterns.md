# S6 — Agent Runtime Event-Stream Iteration Patterns

**Wave**: W376
**Stream**: S6 (research-only)
**Source**:
- `claude-code-sdk-python` (Anthropic; how Claude Code streams events) — deepwiki `anthropics/claude-code-sdk-python`
- `langgraph` (LangChain AI; graph-based agent runtime) — deepwiki `langchain-ai/langgraph`
- `anthropics/claude-cookbooks/patterns/agents/orchestrator_workers.ipynb` (cell-2 canonical empty-final-message guard) — deepwiki `anthropics/claude-cookbooks`
**Status**: DONE

---

## §1 claude-code-sdk event-stream pattern

The SDK exposes **two parallel async-generator entry points** (per `claude-code-sdk-python` public API surface):

1. **`query(prompt, options)`** — one-shot/unidirectional async generator. Internally delegates to `InternalClient.process_query()`, which `yield`s `Message` objects.
2. **`ClaudeSDKClient.receive_messages()` / `receive_response()`** — stateful/interactive async generators on the `ClaudeSDKClient` class. `receive_response()` auto-terminates after a `ResultMessage`; `receive_messages()` is the raw form. Both delegate to `_internal.query.Query.receive_messages()`.

**Class hierarchy** (union type `Message`):

```
Message = AssistantMessage | UserMessage | SystemMessage | ResultMessage | StreamEvent
AssistantMessage.content: list[ContentBlock]
ContentBlock = TextBlock | ThinkingBlock | ToolUseBlock | ToolResultBlock
ResultMessage   # carries duration, cost, is_error — terminal sentinel
StreamEvent     # raw Anthropic API stream events, only when include_partial_messages=True
```

Pull-based via `anyio` task-groups; not push/callback. Backpressure is native — `await transport.write()` blocks when the subprocess pipe is full.

---

## §2 LangGraph `astream_events()` + `Send` primitive

**`Pregel.astream_events()`** signature (v2/v3):

```python
async def astream_events(
    self, input, config=None, *, version: Literal["v1","v2","v3"]="v2",
    interrupt_before=None, interrupt_after=None, control=None,
    transformers=None, **kwargs
) -> AsyncIterator[StreamEvent] | Awaitable[Any]
```

- **v2**: yields raw `StreamEvent` dicts keyed by `event` field. Event-name strings: `on_chain_start`, `on_chain_stream`, `on_chain_end`, `on_tool_start`, `on_tool_end`, `on_chat_model_stream`.
- **v3**: returns `AsyncGraphRunStream`. Emits typed lifecycle events `message-start`, `content-block-start`, `content-block-delta`, `content-block-finish`, `message-finish` for chat models; `tool-started`, `tool-output-delta`, `tool-finished`, `tool-error` for tools. Routed through `StreamMux` + `StreamTransformer` (`MessagesTransformer`, `ToolCallTransformer`).

**`Send` primitive** — fan-out by writing to a `Topic` channel. `Send` targets are accumulated into a list per superstep and cleared at the boundary. Used for dynamic per-row map-reduce (one node enqueues N `Send`s, each producing a parallel child task).

**Backpressure**: `StreamMux` + `StreamChannel.maxlen` — `apush()` awaits subscriber drain, pacing the Pregel pump.

**Checkpointer interaction**: `durability` param to `stream()`/`astream()` — `"sync"` (write before next step), `"async"` (background), `"exit"` (only on graph exit). `BaseCheckpointSaver` (v0.4+ HITL) persists thread state per-superstep.

---

## §3 Anthropic orchestrator-workers cookbook — cell-2 canonical guard

From `anthropics/claude-cookbooks/patterns/agents/orchestrator_workers.ipynb` cell-2 `FlexibleOrchestrator.process()`:

```python
worker_response = llm_call(worker_input, model=self.model)
worker_content = extract_xml(worker_response, "response")

# Validate worker response - handle empty outputs
if not worker_content or not worker_content.strip():
    print(f"⚠️  Warning: Worker '{task_info['type']}' returned no content")
    worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"
```

**Pattern**: synchronous for-loop over `tasks`; each worker call is a single `llm_call`. Empty/whitespace-only `<response>` content is **substituted with sentinel error string**, NOT raised — preserves orchestrator-loop continuity. Cell-2 explicitly notes "Sequential processing in this implementation" + "Implement retry logic for failed workers" as future work. **No flatline / no-progress / backpressure** at this layer — pattern is intentionally minimal to teach the contract.

Cell-2 is the cite-anchor for local skill **`empty-final-message-guard` (Δ-G49)** + **`worker-failure-termination-guard` (Δ-G50)** — both surface in `agent-skills:*` skill library.

---

## §4 Tool-call yielding vs result-yielding

| Runtime | Tool-call event | Tool-result event |
|---|---|---|
| **claude-code-sdk** | `ToolUseBlock` inside `AssistantMessage.content` (carries `id`, `name`, `input`) | `ToolResultBlock` inside subsequent message (carries `tool_use_id`, `content`) |
| **LangGraph v3** | `tool-started` → `ToolCallStream{tool_call_id, tool_name, input}` | `tool-output-delta` deltas → `output_deltas` channel; final on `tool-finished` (`output` attr) or `tool-error` (`error` attr) |
| **orchestrator-workers** | Not distinguished — XML tags inside text response (`<analysis>`, `<tasks>`, `<response>`) parsed by `extract_xml` |

**Mapping to W376 `openhands_run_activity`**: `async for event in conv.stream_events()` yields *typed event subclasses* (W376 inspects via `isinstance(event, AgentErrorEvent)` at `temporal_worker.py:137`). The OpenHands SDK conflates tool-call and tool-result into the same event stream; consumer must `isinstance`-discriminate — closest to LangGraph v3 single-stream-with-typed-projections, NOT cookbook's flat-text-with-XML.

---

## §5 Backpressure + flatline detection

- **claude-code-sdk**: native `anyio` backpressure on `await transport.write()`; no explicit flatline detector.
- **LangGraph**: `StreamChannel.maxlen` bounded queues; `apush()` awaits drain. No built-in flatline — operator wires via `asyncio.wait_for` around `__anext__()` if needed.
- **Cookbook**: zero — sequential blocking calls.
- **W376 local pattern** (`temporal_worker.py:124-127`):
  ```python
  if now - last_advance_time > spec.budget.no_progress_seconds:
      raise RuntimeError(f"flatline: no event in {spec.budget.no_progress_seconds}s")
  ```
  Per-event monotonic-clock delta check inside the `async for` loop — fires `RuntimeError` if SDK stalls. `last_advance_time = now` at loop-end (line 147) resets the watchdog. **Default 600s** per `agents/models.py:12` — matches Temporal heartbeat-timeout cadence.

---

## §6 Error-event propagation

| Runtime | Error mechanism |
|---|---|
| **claude-code-sdk** | **Raised exceptions**, NOT events. Class tree: `ClaudeSDKError` → `CLINotFoundError`, `CLIConnectionError`, `ProcessError`, `CLIJSONDecodeError`. Internal `Query` raises `Exception` on `{"type":"error"}` messages. **No `AgentErrorEvent` class.** |
| **LangGraph v3** | **In-stream events** via `StreamMux.afail(e)` (caught in `AsyncGraphRunStream._apump_next`). v2 may raise directly through the callback manager. |
| **OpenHands SDK** | **Event-typed**: `AgentErrorEvent` at `openhands/sdk/event/llm_convertible/observation.py:123` (per W376 `temporal_worker.py:96-100` cite-anchor). Canonical import path: `openhands.sdk.event.llm_convertible` (NOT `openhands.sdk.event` — drift gotcha). |

**W376 `atomic_append_event`** mapping: on `isinstance(event, AgentErrorEvent)` → `atomic_append_event(conv_id, "task.error.v1", {"event": type(event).__name__})` at lines 137-142. Pattern matches LangGraph in-stream error model; **opposite of claude-code-sdk** which would `try/except ClaudeSDKError`.

---

## §7 Cancellation mid-iteration

- **claude-code-sdk**: `Query.close()` sets `_closed=True` and cancels the `anyio` task-group. `stream_input` checks `_closed` and breaks. Transport closed. In-flight tool calls are **not awaited to completion** — task-group cancellation propagates `CancelledError`.
- **LangGraph**: `RunnableConfig` cancellation → `asyncio.CancelledError` bubbles. `PregelRunner` cancels all running tasks on unrecoverable error. `AsyncGraphRunStream._apump_next` catches `BaseException` (incl. `CancelledError`) → propagates after cleanup. Started nodes are cancelled; subsequent nodes do not start.
- **W376 local** (`temporal_worker.py:144-145`): `temporalio.exceptions.CancelledError` (NOT `activity.CancelledError`); inside loop `if activity.is_cancelled(): raise CancelledError("operator/timeout cancel")`. Cleanup uses `asyncio.shield` + await-then-reraise (per `codex r5/r6` review note line 62-64) — guarantees `conv.close()` runs even when activity is cancelled mid-stream.

---

## §8 Multi-step coordination within single conversation

- **claude-code-sdk**: `ClaudeSDKClient` is stateful — `query()` for first prompt, then loop `await query() → async for receive_messages()` for subsequent turns. Tool-call→tool-result→next-text is handled by the CLI subprocess (auto-resumed); consumer just iterates.
- **LangGraph**: graph nodes implement multi-step natively (each node is a step). For in-node ReAct-style loops, use the prebuilt `create_react_agent` which emits `tool-started`/`tool-finished` pairs per cycle.
- **Cookbook (orchestrator-workers)**: explicit Python for-loop over `tasks` — each iteration is a fresh `llm_call`, no native multi-step.
- **W376 local**: `conv.stream_events()` is a **single async generator that spans the entire multi-step conversation** — agent loops (tool invocation → observation → next action → final response) all emit through one iterator. Consumer accumulates `events_processed` counter (line 121) for heartbeat telemetry; `ResultMessage`-equivalent is the natural-termination of the iterator.

---

## §9 Cite-anchor cluster (≥3-org-distinct)

- **Anthropic / claude-code-sdk-python** (org #1): `query()` async-gen + `ClaudeSDKClient.receive_messages()` + Message class hierarchy (`AssistantMessage`/`ResultMessage`/`ToolUseBlock`/`ToolResultBlock`/`TextBlock`) per deepwiki `anthropics/claude-code-sdk-python` Public API §3.1; cancellation semantics in `Query.close()` `_closed` flag + `anyio` task-group cancel.
- **Anthropic / claude-cookbooks** (org #2 — separate authorship from SDK): `patterns/agents/orchestrator_workers.ipynb` cell-2 `FlexibleOrchestrator.process()` empty-content sentinel guard (`if not worker_content or not worker_content.strip(): worker_content = "[Error: ... failed to generate content]"`).
- **LangChain AI / langgraph** (org #3): `Pregel.astream_events(version="v3")` → `AsyncGraphRunStream` + `StreamMux`/`StreamTransformer` + `ToolCallStream` (`tool-started`/`tool-output-delta`/`tool-finished`/`tool-error`); `Send` primitive via `Topic` channels; `BaseCheckpointSaver` durability modes; `_apump_next` `BaseException` propagation for cancellation.
- **OpenHands / agent-sdk** (org #4 bonus): `AgentErrorEvent` at `openhands/sdk/event/llm_convertible/observation.py:123` cite-anchored in W376 `agents/temporal_worker.py:96-100`.

---

## §10 Canonical pattern for W376 `openhands_run_activity`

The distilled pattern combining all three prior arts, applied to W376's activity body:

```python
# Pattern: single-iterator multi-step coordination with watchdog + typed-error discrimination
last_advance_time = time.monotonic()
events_processed = 0

try:
    await conv.send_message(spec.task)
    async for event in conv.stream_events():                           # (A) LangGraph-style: single iterator spans full multi-step run
        now = time.monotonic()
        events_processed += 1

        if now - last_advance_time > spec.budget.no_progress_seconds:   # (B) W376-native: flatline watchdog (cookbook lacks it; LangGraph leaves to operator)
            raise RuntimeError(f"flatline: no event in {spec.budget.no_progress_seconds}s")

        activity.heartbeat({"events_processed": events_processed,        # (C) Temporal-native backpressure surrogate
                            "event_class": type(event).__name__})

        if isinstance(event, AgentErrorEvent):                           # (D) LangGraph-v3-style in-stream error event (NOT raised) → append to event store
            atomic_append_event(spec.conversation_id, "task.error.v1",
                                {"event": type(event).__name__})

        if activity.is_cancelled():                                       # (E) claude-code-sdk-style cooperative cancellation check
            raise CancelledError("operator/timeout cancel")

        last_advance_time = now                                           # (F) reset watchdog on every event (cookbook empty-final-message-guard analog: empty events count as progress)
finally:
    if conv is not None:
        await asyncio.shield(conv.close())                                # (G) await-then-reraise (codex r5/r6) — guarantee cleanup even under cancellation
```

**Lineage**:
- (A) ← LangGraph `astream_events()` + OpenHands `stream_events()` — single iterator covers the whole multi-step ReAct loop.
- (B) ← W376-original — neither cookbook nor LangGraph ship a built-in flatline detector; cookbook sequential-blocking + LangGraph relies on operator-wired `asyncio.wait_for`. **W376 contribution**: per-event monotonic-delta inside loop.
- (C) ← Temporal SDK heartbeat contract — surrogate for LangGraph's `StreamChannel.maxlen` queue pressure.
- (D) ← LangGraph v3 in-stream error model + cookbook cell-2 empty-content sentinel. `AgentErrorEvent` import path cite-anchored at `temporal_worker.py:96-100`.
- (E) ← claude-code-sdk `_closed`-flag cooperative-check pattern + Temporal `activity.is_cancelled()`.
- (G) ← codex r5/r6 review insistence on `asyncio.shield` for cleanup-during-cancel; matches claude-code-sdk's "transport.close() in `finally`" discipline.

**Gotchas captured for W376**:
1. `AgentErrorEvent` lives in `openhands.sdk.event.llm_convertible` — NOT `openhands.sdk.event` (DIM-17 drift).
2. OpenHands SDK 1.22.1 does NOT export `DockerWorkspace` — only `Workspace(working_dir=...)` (LocalWorkspace) or `Workspace(host=..., working_dir=..., api_key=...)` (RemoteWorkspace). C10 carry-forward uses docker-py 7.1.0 to externally spawn the agent-server container (DIM-18).
3. `temporalio.exceptions.CancelledError` ≠ `activity.CancelledError`. Use the former.
4. `make_routine_llm_async` (NOT sync `subscription_login`) inside an active asyncio loop — sync variant calls `asyncio.run()` internally and raises `RuntimeError` inside a Temporal activity (DIM-16).

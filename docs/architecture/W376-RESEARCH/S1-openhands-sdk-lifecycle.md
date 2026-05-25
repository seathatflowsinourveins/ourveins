# S1 — OpenHands SDK Lifecycle Audit

**Wave**: W376
**Stream**: S1 (research-only, read-only)
**Source**: `openhands-sdk==1.22.1` (installed at `C:/Users/42/AppData/Local/uv/cache/archive-v0/Rg2_RmI6ssY5vaWJ0YW6I/Lib/site-packages/openhands/sdk/`)
**Status**: DONE

---

## §1 Conversation factory contract

`Conversation` is a **factory class** (NOT a constructor): `__new__` dispatches to `LocalConversation` or `RemoteConversation` based on `workspace` type. Two `@overload`-typed shapes plus the runtime `__new__`.

### Canonical signature
```python
Conversation(
    agent: AgentBase,                          # required, positional
    *,                                         # all subsequent kwargs are keyword-only
    workspace: str | Path | LocalWorkspace | RemoteWorkspace = "workspace/project",
    plugins: list[PluginSource] | None = None,
    persistence_dir: str | Path | None = None,  # FORBIDDEN with RemoteWorkspace
    conversation_id: ConversationID | None = None,
    callbacks: list[ConversationCallbackType] | None = None,
    token_callbacks: list[ConversationTokenCallbackType] | None = None,
    hook_config: HookConfig | None = None,
    max_iteration_per_run: int = 500,
    stuck_detection: bool = True,
    stuck_detection_thresholds: StuckDetectionThresholds | Mapping[str, int] | None = None,
    visualizer: type[ConversationVisualizerBase] | ConversationVisualizerBase | None = DefaultConversationVisualizer,
    secrets: dict[str, SecretValue] | dict[str, str] | None = None,
    delete_on_close: bool = True,
    tags: dict[str, str] | None = None,
) -> LocalConversation | RemoteConversation
```

### Dispatch rule (single branch)
- `isinstance(workspace, RemoteWorkspace)` → `RemoteConversation`
- everything else (incl. `str`, `Path`, `LocalWorkspace`) → `LocalConversation`

`conversation.py:137` is the canonical branch. `LocalConversation.__init__:168-170` auto-promotes `str|Path` → `LocalWorkspace(working_dir=workspace)` via `BeforeValidator`.

**Cite**: `conversation/conversation.py:31-202` (full factory) · `:60-83` (LocalConversation overload) · `:85-107` (RemoteConversation overload) · `:109-131` (runtime `__new__` signature) · `:137-184` (RemoteConversation branch) · `:186-202` (LocalConversation branch) · `:139-142` (`persistence_dir` rejection for Remote).

---

## §2 send_message API

**Signature** (sync; returns `None`):
```python
def send_message(self, message: str | Message, sender: str | None = None) -> None
```

### Behavior (LocalConversation)
1. **Agent ready-check** (`local_conversation.py:696-697`): if condition met (`_should_initialize_agent_on_send_message`), eagerly calls `_ensure_agent_ready()`. ACPAgent defers init to `run()`; OpenHands-agent initializes on send.
2. **String coercion** (`:699-700`): bare `str` is wrapped as `Message(role="user", content=[TextContent(text=message)])`.
3. **Role assertion** (`:702-704`): `AssertionError` if `message.role != "user"`.
4. **State lock + status reset** (`:705-712`): under `with self._state:` (FIFO lock), `FINISHED` and `STUCK` flip back to `IDLE` (new message resets terminal states — this is the run-loop-aware concurrent-message preservation).
5. **AgentContext skill activation** (`:715-735`): if `agent.agent_context` exists, applies `get_user_message_suffix` and tracks `activated_knowledge_skills`.
6. **MessageEvent emission** (`:737-744`): constructs `MessageEvent(source="user", llm_message=message, ...)` and calls `self._on_event(...)` — this is where the message becomes visible to the agent loop (event written to state, persisted, surfaced to visualizer/callbacks).

**Visibility to agent**: message is queued as an event the moment `_on_event(user_msg_event)` returns. Subsequent `run()` (or in-flight run loop) picks it up at next iteration via the event-store / message-stream traversal in `agent.step()`.

**Sync vs async**: PURE-SYNC (no `await`). Decorated with `@observe(name="conversation.send_message")` for Laminar tracing only — does NOT introduce async wrappage.

**Cite**: `conversation/impl/local_conversation.py:680-744` · `base.py:166-177` (abstract contract: `-> None`) · `:744` (canonical `_on_event` emission).

---

## §3 Run loop pattern

**Canonical pattern is `conv.run()` BLOCKING.** There is NO `stream_events()` public method on `BaseConversation` or `LocalConversation`. Events are surfaced via:
- **Callbacks** (`callbacks: list[ConversationCallbackType]`) — pushed to every event (`composed_callbacks` chain at `local_conversation.py:209-217`).
- **State event-store** (`conv.state.events`) — read-after-run.

`run()` semantics (`local_conversation.py:747-890`):
1. **Eager agent init** (`:760`): `_ensure_agent_ready()` loads plugins + initializes agent tools.
2. **Status transition** (`:762-769`): under state lock, transitions `IDLE|PAUSED|ERROR|STUCK` → `RUNNING`.
3. **Iteration loop** (`:771-874`):
   - Re-acquires state lock per iteration (`:775`) — supports concurrent `pause()` from another thread.
   - **Pause check** (`:779-783`): exits if `PAUSED` or `STUCK`.
   - **Finish check** (`:786-811`): if `FINISHED`, runs stop hooks (`HookEventProcessor.run_stop`); hook can deny stop and inject feedback `MessageEvent(source="environment", ...)`.
   - **Stuck check** (`:814-822`): `StuckDetector.is_stuck()` flips status to `STUCK`.
   - **Step call** (`:833-835`): `self.agent.step(self, on_event=self._on_event, on_token=self._on_token)` — this is the LLM call + tool execution.
   - **Max-iteration cap** (`:852-874`): emits `ConversationErrorEvent(code="MaxIterationsReached")` and breaks.
4. **Exception handling** (`:875-890`): any exception → status=`ERROR` + emits `ConversationErrorEvent(code=<class>, detail=str(e))` + **re-raises wrapped as `ConversationRunError`** (carries `conversation_id` + `persistence_dir` for resume/debug).

**Parallel-executor canonical use**: `agent/parallel_executor.py:54-91` (`execute_batch`) — driven by `agent.step()` when `tool_concurrency_limit > 1`. Caller passes `Sequence[ActionEvent]` + a `tool_runner` callable. Per-action exceptions are **converted to `AgentErrorEvent`** (NOT re-raised; `parallel_executor.py:120-140`).

**Cite**: `local_conversation.py:747-890` · `parallel_executor.py:54-91, 93-140` · `base.py:179-186` (abstract `run() -> None`).

---

## §4 Event types emitted

Full hierarchy (from `event/__init__.py:1-50`):

### Root: `Event` (abstract, frozen, `extra="forbid"`)
- `id: EventID` (UUID4 default)
- `timestamp: str` (ISO8601 default)
- `source: SourceType` (required: `"user" | "agent" | "environment"`)

**Cite**: `event/base.py:20-55`.

### Mixin: `LLMConvertibleEvent(Event, ABC)` — adds `to_llm_message() -> Message`
**Cite**: `event/base.py:58-63`.

### Concrete event classes
| Class | Source | When emitted | Cite |
|---|---|---|---|
| `MessageEvent` | `user` / `agent` / `environment` | `send_message()`, hook feedback, agent reply | `event/llm_convertible/message.py` |
| `SystemPromptEvent` | `agent` | At `init_state()` (system prompt setup) | `event/llm_convertible/system.py` |
| `ActionEvent` | `agent` | Per LLM tool call (1 event per `tool_call_id`) | `event/llm_convertible/action.py:21-67` |
| `ObservationEvent` | `environment` | Per tool result (1 event per `action_id`) | `event/llm_convertible/observation.py:31-57` |
| `ObservationBaseEvent` | `environment` | Abstract parent of observation events | `event/llm_convertible/observation.py:16-28` |
| `AgentErrorEvent` | `agent` | Tool exception (caught in `parallel_executor._run_safe`) | `event/llm_convertible/observation.py` (via `parallel_executor.py:122-140`) |
| `UserRejectObservation` | `environment` | `reject_pending_actions()` confirmation-mode reject | `event/llm_convertible/observation.py` |
| `PauseEvent` | n/a | `pause()` call | `event/user_action.py` |
| `StreamingDeltaEvent` | n/a | LLM token stream deltas | `event/streaming_delta.py` |
| `TokenEvent` | n/a | Per-token bookkeeping | `event/token.py` |
| `Condensation` / `CondensationRequest` / `CondensationSummaryEvent` | n/a | `condense()` + condenser pipeline | `event/condenser.py` |
| `ConversationStateUpdateEvent` | n/a | State-machine transitions | `event/conversation_state.py` |
| `HookExecutionEvent` | n/a | Hook lifecycle | `event/hook_execution.py` |
| `LLMCompletionLogEvent` | n/a | Per-LLM-call bookkeeping | `event/llm_completion_log.py` |
| `ACPToolCallEvent` | n/a | ACPAgent-specific tool calls | `event/acp_tool_call.py` |
| `ConversationErrorEvent` | `environment` | Run-loop max-iter / exception | `event/conversation_error.py` (used at `local_conversation.py:867-873, 879-884`) |

**Mapping to W375 `atomic_append_event` categories** (the W376 implementer should funnel ALL `LLMConvertibleEvent` subclasses → `event_jsonl` and use `source` as the discriminator for `actor` field; `Action`/`Observation` pairs link via `tool_call_id` + `action_id`).

**Cite**: `event/__init__.py:1-50` (full export list) · `event/base.py:20-55` (Event base) · `event/llm_convertible/__init__.py:1-22`.

---

## §5 Agent.tools shape

`Agent` (subclass of `AgentBase`) accepts `tools: list[Tool]` (NOT `list[ToolDefinition]`) — `Tool` is the **spec** (user-facing config), `ToolDefinition` is the **resolved runtime instance**.

### Field declaration (`agent/base.py:78-89`)
```python
tools: list[Tool] = Field(
    default_factory=list,
    description="List of tools to initialize for the agent.",
    examples=[
        {"name": "TerminalTool", "params": {}},
        {"name": "FileEditorTool", "params": {}},
        {"name": "TaskTrackerTool", "params": {}},
    ],
)
```

### `tools=[]` IS valid
- `default_factory=list` accepts empty list.
- `include_default_tools` (default = `[FinishTool, ThinkTool]` per `base.py:104-114`) auto-adds defaults at `_initialize()`.
- Setting `include_default_tools=[]` ALSO disables all built-ins.
- W376 v1 carry-forward (`tools=[]`) means the agent will still get `FinishTool` + `ThinkTool` unless `include_default_tools=[]` is also set.

### Resolution flow (`agent/base.py:434-530`)
1. `init_state(state, on_event)` (`:434-446`) → `_initialize(state)`.
2. Parallel `ThreadPoolExecutor(max_workers=4)` resolves each `tool_spec` via `resolve_tool(tool_spec, state)` (`:458-474`).
3. MCP tools added via `create_mcp_tools(self.mcp_config, 30)` if `mcp_config` non-empty (`:467-469`).
4. `filter_tools_regex` (optional, `:477-480`) name-filters the result.
5. Defaults from `include_default_tools` added via `tool_class.create(state)` (`:504-512`).
6. Validates ALL resolved tools are `ToolDefinition` instances (`:514-520`); duplicates detected by name (`:522-526`).
7. Stored in `self._tools: dict[str, ToolDefinition]` (`:528-529`); marked `_initialized=True`.

**Tool/ToolDefinition contract**: `Tool` (spec) is `{name: str, params: dict}`. `ToolDefinition` is the resolved class with `as_executable()`, `executor`, `declared_resources()`, `name`. The contract for `tools=[]` is: empty spec list is fine; the AGENT just won't have any user-declared tools (built-ins still attach unless suppressed).

**Cite**: `agent/base.py:78-89` (field) · `:104-114` (`include_default_tools`) · `:338-347` (`tool_concurrency_limit`) · `:434-530` (`_initialize`) · `:704-711` (`tools_map` accessor).

---

## §6 LocalConversation vs RemoteConversation dispatch

**Single dispatch point**: `conversation/conversation.py:137`:
```python
if isinstance(workspace, RemoteWorkspace):
    return RemoteConversation(...)
return LocalConversation(...)
```

### Workspace type → Conversation type
| Workspace input | Resolved type | Conversation chosen |
|---|---|---|
| `str` | `LocalWorkspace(working_dir=str)` | `LocalConversation` |
| `Path` | `LocalWorkspace(working_dir=Path)` | `LocalConversation` |
| `LocalWorkspace` instance | identity | `LocalConversation` |
| `RemoteWorkspace` instance | identity | `RemoteConversation` |

### Workspace factory (`workspace/workspace.py:12-49`)
```python
Workspace(host=None, working_dir=..., api_key=None)  # -> LocalWorkspace
Workspace(host="http://...", working_dir=..., api_key=...)  # -> RemoteWorkspace
```
**Rule**: `host=None` → Local; `host` set → Remote.

### Constraints on Remote
- `persistence_dir is not None` → `ValueError` (`conversation.py:139-142`): "persistence_dir should not be set when using RemoteConversation".
- Remote merges 3 tag sources (workspace defaults / plugins / user-provided) at `:148-167` before forwarding.

**For W376 implementer**: pass `workspace=LocalWorkspace(working_dir=...)` (explicit) OR a bare `str|Path` for the working_dir. Avoid passing `Workspace(host=...)` unless wiring a remote agent-server backend.

**Cite**: `conversation/conversation.py:137-202` (full dispatch) · `workspace/workspace.py:12-49` (workspace factory) · `local_conversation.py:168-174` (str/Path→LocalWorkspace coercion).

---

## §7 Error propagation

### Exception class hierarchy (`conversation/exceptions.py`)
- `WebSocketConnectionError(RuntimeError)` — Remote-only WebSocket timeout (`exceptions.py:7-22`).
- `ConversationRunError(RuntimeError)` — wraps any run-loop exception with `conversation_id` + `persistence_dir` + `original_exception` (`exceptions.py:25-68`).

### Run-loop error pattern (`local_conversation.py:875-890`)
```python
except Exception as e:
    self._state.execution_status = ConversationExecutionStatus.ERROR
    self._on_event(ConversationErrorEvent(
        source="environment", code=e.__class__.__name__, detail=str(e),
    ))
    raise ConversationRunError(self._state.id, e,
                               persistence_dir=self._state.persistence_dir) from e
```

**Two-channel reporting**:
1. **Event channel**: `ConversationErrorEvent` is APPENDED to event store (callers see via callbacks + state.events).
2. **Exception channel**: `ConversationRunError` is RAISED with chained `__cause__` (preserves original via `from e`).

### Validation errors
- `pydantic.ValidationError` raised at Pydantic model construction (e.g., bad `tags` shape, `agent` not `AgentBase`).
- `AssertionError` raised inline: `workspace must be a LocalWorkspace instance` (`local_conversation.py:171-173`), `Only user messages are allowed to be sent to the agent` (`local_conversation.py:702-704`).
- `ValueError` raised for: `persistence_dir + RemoteWorkspace` (`conversation.py:139-142`), duplicate tool names (`agent/base.py:524-526`), unknown built-in tool class (`agent/base.py:506-510`).

### Tool errors (NOT propagated through `run()`)
- Tool exceptions in `parallel_executor._run_safe` (`parallel_executor.py:120-140`) are CAUGHT and converted to `AgentErrorEvent` — they do NOT bubble out of `run()`.

### Retry classification (W376 implementer guidance)
| Exception | Retry? | Notes |
|---|---|---|
| `pydantic.ValidationError` | NO (fatal config bug) | Fix the call-site |
| `AssertionError` | NO (programmer error) | Fix the call-site |
| `ValueError` | NO (configuration bug) | Fix kwargs |
| `ConversationRunError` | DEPENDS on `original_exception` | Inspect `.original_exception` |
| `WebSocketConnectionError` | YES (Remote only) | Transient network failure |
| Tool exceptions (inside step) | N/A | Already swallowed into `AgentErrorEvent` |

**Cite**: `conversation/exceptions.py:1-68` · `local_conversation.py:875-890` (re-raise wrap) · `:171-173, 702-704` (assertion guards) · `parallel_executor.py:120-140` (tool error swallow).

---

## §8 OAuth lifecycle inside Conversation

**Conversation does NOT call OAuth refresh.** OAuth lifecycle is fully owned by `openhands.sdk.llm.auth.openai.OpenAISubscriptionAuth` and the helper `subscription_login[_async]()`.

### Lifecycle (`llm/auth/openai.py:752-810`)
```python
async def subscription_login_async(vendor="openai", model="gpt-5.2-codex",
                                    force_login=False, open_browser=True,
                                    auth_method="browser", skip_consent=False, **llm_kwargs):
    auth = OpenAISubscriptionAuth()
    if not force_login:
        creds = await auth.refresh_if_needed()   # <-- LAZY REFRESH
        if creds is not None:
            return auth.create_llm(model=model, credentials=creds, **llm_kwargs)
    if not skip_consent and not _display_consent_and_confirm():
        raise RuntimeError("User declined to continue with ChatGPT sign-in")
    creds = await auth.login(open_browser=open_browser, auth_method=auth_method)
    return auth.create_llm(model=model, credentials=creds, **llm_kwargs)
```

**When does refresh happen?** ONLY during `subscription_login[_async]()` — the helper is what the OPERATOR calls BEFORE constructing `Agent(llm=...)`. The returned `LLM` object embeds the `access_token` as `api_key`. Once embedded, `Conversation`/`Agent` treat it as opaque — no per-step refresh.

**Token expiry risk**: if the access token expires mid-`run()`, the LLM call inside `agent.step()` fails with a provider-level auth error → caught by `run()` → re-raised as `ConversationRunError`. The W376 implementer should either:
- Refresh BEFORE constructing `Conversation` (recommended; cheap up-front cost).
- Wrap `run()` in retry that detects auth-error string and re-runs `subscription_login()` then rebuilds the `Agent`/`Conversation` (heavier, but survives long sessions).

### Credentials cache path
`OpenAISubscriptionAuth.get_credentials()` reads/writes to the platform credentials cache (see `auth.refresh_if_needed()` implementation in `llm/auth/openai.py`). For the runtime, this is typically the OS keyring or a JSON file under user home — NOT under the OpenHands workspace.

**Sync wrapper**: `subscription_login()` (`auth/openai.py:812-...`) is `asyncio.run(subscription_login_async(...))`.

**Cite**: `llm/auth/openai.py:752-810` (`subscription_login_async`) · `:812-...` (sync wrapper) · `:797` (canonical `refresh_if_needed` call) · `:703-749` (`create_llm` builds LLM from creds).

---

## §9 Cite-anchor cluster

Distinct file:line citations from openhands-sdk source (target ≥10):

1. `conversation/conversation.py:31-58` — `Conversation` factory class + docstring + example.
2. `conversation/conversation.py:109-202` — runtime `__new__` + dispatch logic.
3. `conversation/conversation.py:137-142` — `RemoteWorkspace` branch + `persistence_dir` rejection.
4. `conversation/base.py:111-118` — `BaseConversation` ABC contract.
5. `conversation/base.py:166-177` — abstract `send_message` signature.
6. `conversation/base.py:179-186` — abstract `run() -> None` contract.
7. `conversation/impl/local_conversation.py:90-153` — `LocalConversation.__init__` signature + docstring.
8. `conversation/impl/local_conversation.py:168-174` — `str|Path` → `LocalWorkspace` coercion.
9. `conversation/impl/local_conversation.py:680-744` — `send_message` body.
10. `conversation/impl/local_conversation.py:702-704` — role assertion (`user` only).
11. `conversation/impl/local_conversation.py:747-890` — `run()` body.
12. `conversation/impl/local_conversation.py:875-890` — exception re-raise as `ConversationRunError`.
13. `conversation/impl/local_conversation.py:978-1014` — `close()` cleanup chain.
14. `conversation/exceptions.py:25-68` — `ConversationRunError` definition.
15. `agent/base.py:54-117` — `AgentBase` field declarations (llm, tools, mcp_config).
16. `agent/base.py:434-530` — `_initialize` tool-resolution flow.
17. `agent/base.py:338-347` — `tool_concurrency_limit` field.
18. `agent/parallel_executor.py:54-91` — `execute_batch` parallel tool runner.
19. `agent/parallel_executor.py:120-140` — tool exception → `AgentErrorEvent` swallow.
20. `event/__init__.py:1-50` — full event-type export list.
21. `event/base.py:20-55` — `Event` base class.
22. `event/llm_convertible/action.py:21-67` — `ActionEvent` fields.
23. `event/llm_convertible/observation.py:16-57` — `ObservationBaseEvent` + `ObservationEvent`.
24. `workspace/workspace.py:12-49` — `Workspace` factory.
25. `llm/auth/openai.py:752-810` — `subscription_login_async` OAuth lifecycle.

**Total**: 25 distinct file:line citations (target ≥10 exceeded 2.5x).

---

## §10 Implications for `openhands_run_activity` rewrite

### Minimal canonical skeleton (W376 PHASE D Task 11 reference)

```python
# tools/openhands_run_activity.py — canonical skeleton derived from S1 audit
from __future__ import annotations
import asyncio
from pathlib import Path
from typing import Any
from pydantic import SecretStr, ValidationError

from openhands.sdk import LLM, Agent, Conversation
from openhands.sdk.conversation.exceptions import ConversationRunError
from openhands.sdk.event import (
    ActionEvent, AgentErrorEvent, MessageEvent,
    ObservationEvent, SystemPromptEvent,
)
from openhands.sdk.event.base import Event, LLMConvertibleEvent
from openhands.sdk.event.conversation_error import ConversationErrorEvent
from openhands.sdk.llm.auth import subscription_login
from openhands.sdk.workspace import LocalWorkspace


def run_openhands_activity(
    *,
    prompt: str,
    workspace_dir: str | Path,
    persistence_dir: str | Path | None,
    activity_id: str,                # W375 atomic_append_event tag
    event_jsonl_path: Path,          # W375 single-writer sink
    model: str = "gpt-5.2-codex",
    max_iterations: int = 500,
) -> dict[str, Any]:
    """Run a single OpenHands activity end-to-end.

    Returns a summary dict with: status, event_count, last_message, error?.
    All events are streamed to event_jsonl_path via atomic_append_event (W375).
    """
    # STEP 1 — OAuth refresh BEFORE constructing Agent (§8 implementer guidance).
    # subscription_login() does asyncio.run() internally; safe in sync context.
    llm = subscription_login(model=model, force_login=False, skip_consent=True)

    # STEP 2 — Build agent. tools=[] is valid; include_default_tools attaches
    # FinishTool + ThinkTool unless explicitly disabled (§5).
    agent = Agent(llm=llm, tools=[])  # W376 v1 C5 carry-forward

    # STEP 3 — Callback that funnels every event into the W375 JSONL sink.
    def _emit_event(event: Event) -> None:
        # All LLMConvertibleEvent subclasses dump cleanly via model_dump_json().
        # Non-LLM events (Pause, StreamingDelta, Condensation) also dump fine.
        atomic_append_event(  # W375 helper
            path=event_jsonl_path,
            activity_id=activity_id,
            actor=event.source,
            event_type=event.__class__.__name__,
            payload=event.model_dump(mode="json"),
        )

    # STEP 4 — Construct conversation. Pass LocalWorkspace explicitly so the
    # factory dispatch (§6) is unambiguous; str|Path would also work.
    workspace = LocalWorkspace(working_dir=str(workspace_dir))
    try:
        conv = Conversation(
            agent=agent,
            workspace=workspace,
            persistence_dir=persistence_dir,    # MUST be None for RemoteWorkspace
            callbacks=[_emit_event],            # canonical event hook
            max_iteration_per_run=max_iterations,
            stuck_detection=True,
            visualizer=None,                    # headless runtime — no Rich output
            delete_on_close=False,              # preserve state for post-mortem
        )
    except (ValidationError, ValueError, AssertionError) as e:
        # §7 — construction errors are config bugs; do NOT retry.
        return {"status": "config_error", "error": str(e), "event_count": 0}

    # STEP 5 — Send the prompt. Sync, returns None, emits MessageEvent(source=user).
    conv.send_message(prompt)

    # STEP 6 — Run. Blocking. Raises ConversationRunError on any internal failure.
    try:
        conv.run()
        status = conv.state.execution_status.value  # FINISHED | STUCK | ERROR | ...
        return {
            "status": status,
            "event_count": len(conv.state.events),
            "conversation_id": str(conv.state.id),
        }
    except ConversationRunError as e:
        # §7 — wraps original_exception; auth/transient errors live in .original_exception
        return {
            "status": "run_error",
            "error": str(e),
            "original_exception_class": type(e.original_exception).__name__,
            "conversation_id": str(e.conversation_id),
            "persistence_dir": e.persistence_dir,
            "event_count": len(conv.state.events),
        }
    finally:
        # STEP 7 — Always close (§ local_conversation.py:978-1014). Closes:
        # - HookProcessor.run_session_end()
        # - Observability span
        # - Agent (ACPAgent subprocess if any)
        # - Every tool executor (subprocesses, connections)
        conv.close()
```

### Key design rules baked in
1. **OAuth UP-FRONT** — refresh BEFORE `Agent(llm=...)`, NOT during `run()` (§8).
2. **LocalWorkspace EXPLICIT** — keeps the §6 factory dispatch unambiguous; future migration to `RemoteWorkspace` becomes a 1-line swap.
3. **Single callback funnel** — `callbacks=[_emit_event]` is the W375 atomic-append integration point; ALL event types route through one function.
4. **Visualizer=None** — headless runtime; the `DefaultConversationVisualizer` is Rich-text terminal output, irrelevant for `openhands_run_activity`.
5. **`try/except/finally` with `conv.close()` in `finally`** — non-negotiable: tool executors hold subprocesses/connections that MUST be released regardless of run outcome.
6. **Status from `conv.state.execution_status`** — NOT from `run()` return (which is `None`).
7. **`ConversationRunError.original_exception` inspection** — distinguishes "retry-friendly auth/network error" from "fatal config bug" per §7 retry classification table.
8. **`tools=[]` deliberate** — W376 v1 C5 carry-forward; `FinishTool` + `ThinkTool` still auto-attached. Adding tools later is a `tools=[...]` change with no API churn.

### NOT in v1 (deferred to W377+)
- `stream_events()` — does not exist; if streaming UI needed, use `callbacks=[...]` with WebSocket push.
- `hook_config` wiring — adds complexity; v1 uses no hooks.
- `plugins=[...]` loading — v1 keeps zero plugins.
- `condenser` — v1 lets max-iteration cap handle long convos.
- `secrets` — v1 has no per-conversation secrets; LLM api_key embedded in `llm` object.
- `RemoteConversation` — v1 is local-only.

### Open implementer questions for PHASE D Task 11
1. Should `event_jsonl_path` be per-activity or per-session? (W375 atomic_append_event contract dictates.)
2. Should we expose `max_iterations` as a config knob or hardcode 500? (default is 500.)
3. Should `force_login=True` be a retry escalation when first attempt fails with auth error? (per §8.)
4. Should `delete_on_close=False` be configurable per environment? (recommend YES — disable in dev, enable in CI cache.)

---

**End of S1 audit.**

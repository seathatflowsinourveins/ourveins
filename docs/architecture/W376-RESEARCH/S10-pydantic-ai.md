# S10 — PydanticAI Typed-Agent Framework

> W376 Research Subagent S10 — 2026-05-22
> Sources: pydantic/pydantic-ai (GitHub via deepwiki) + ai.pydantic.dev (official docs)
> Cite-anchor scheme: file:line approximations from deepwiki wiki-structure probe.

## §1 PydanticAI architecture

**Core**: `Agent[AgentDepsT, OutputDataT]` — generic `AbstractAgent` subclass parameterized over two type variables:
- `AgentDepsT` — dependency-injection payload type (e.g. DB session, HTTP client, config dict)
- `OutputDataT` — final result type (str default; or any Pydantic BaseModel / dataclass / Literal union)

Default `Agent()` (no params) = `Agent[None, str]`. The Agent orchestrates: model selection → system-prompt + instructions composition → tool registry → run-loop → output validation → message history. Execution is graph-based: a `pydantic-graph` state machine walks `UserPromptNode → ModelRequestNode → CallToolsNode → (loop) → End`.

**Type-safety guarantees**: Pydantic v2 generics flow `AgentDepsT` into `RunContext[AgentDepsT]` (passed as first arg to tools/validators) and `OutputDataT` into `AgentRunResult[OutputDataT].output`. Static checkers (mypy, pyright) catch type-mismatches at design time; Pydantic enforces at runtime via JSON-schema validation.

## §2 Agent constructor signature + kwarg shape

`pydantic_ai_slim/pydantic_ai/agent/__init__.py:183` defines `class Agent(AbstractAgent[AgentDepsT, OutputDataT])`. Key kwargs:

| Kwarg | Type | Purpose |
|---|---|---|
| `model` | `models.Model \| KnownModelName \| str` | Default LLM (overridable per-run) |
| `output_type` | `type[OutputDataT]` (default `str`) | Final-result schema; drives JSON validation |
| `instructions` | `str \| Sequence[str] \| callable` | Per-run LLM instructions |
| `system_prompt` | `str \| Sequence[str]` | Static system prompts |
| `deps_type` | `type[AgentDepsT]` | DI payload type (static-check only) |
| `name`, `description` | `str` | Logging/discovery metadata |
| `model_settings` | `ModelSettings` | Temperature, max_tokens, etc. |
| `retries` | `int \| AgentRetries` | Per-category retry budget (tools/output/global) |
| `validation_context` | `dict` | Pydantic validation ctx for tool args/outputs |
| `tools` | `Sequence[Tool]` | Static tool registry |
| `toolsets` | `Sequence[AbstractToolset]` | Composable toolset registry |
| `defer_model_check` | `bool` | Lazy-init model on first run |
| `end_strategy` | `EndStrategy` | How to handle tool-calls alongside final result |
| `tool_timeout` | `float` | Default tool exec timeout (sec) |
| `max_concurrency` | `int` | Cap on concurrent agent runs |
| `capabilities` | `Sequence[AgentCapability]` | Extension points |

**Declarative alternative**: `Agent.from_spec(AgentSpec)` / `Agent.from_file(path)` reads YAML/JSON; kwargs override spec fields.

## §3 Tool model — @agent.tool decorator, BaseToolset

**Decorator** (`agent/__init__.py:651`): `@agent.tool` registers a Python function as a context-aware tool. First param MUST be `ctx: RunContext[DepsT]`; subsequent params become tool kwargs. Variant `@agent.tool_plain` skips `ctx` (stateless tools).

**Schema generation**: function signature → JSON schema via `FunctionSchema`. Docstring becomes tool description; per-arg docs (Google/Numpy/Sphinx-style) become arg descriptions. Return-type hint optionally included via `include_return_schema=True`.

**Toolset hierarchy**:
- `AbstractToolset` — base class (NOT `BaseToolset` — that name doesn't exist)
- `FunctionToolset` — concrete impl, wraps local Python funcs
- `CombinedToolset` — composition
- `PreparedToolset` — dynamic filter/modify
- `ApprovalRequiredToolset` — HITL gate
- `AgentToolset` — exposes another Agent as a tool

**Example** (typed params + return):
```python
from pydantic_ai import Agent, RunContext

agent = Agent('openai:gpt-4o', deps_type=int)

@agent.tool
def foobar(ctx: RunContext[int], x: int) -> int:
    """Add the agent's dep to x.

    Args:
        x: integer to add to the dep.
    """
    return ctx.deps + x
```

**Validation failure** → raises `ValidationError` → framework auto-generates `RetryPromptPart` → LLM gets corrective feedback → retries up to budget.

## §4 Run loop pattern

Three entry points (all in `pydantic_ai_slim/pydantic_ai/agent/abstract.py`):
- **`run()` ~ L216** — async; runs graph to `End`, returns `AgentRunResult[OutputDataT]`. Optional `event_stream_handler` for progress events.
- **`run_sync()` ~ L381** — sync wrapper using `loop.run_until_complete(self.run(...))`. For non-async callers.
- **`run_stream()` ~ L466** — async context manager yielding `StreamedRunResult`. Streams text/structured output as it arrives. **Stops at first matching `final_result_event`** — subsequent tool-calls aren't executed.

**Internal loop** (from `agent.run()`):
```python
node = agent_run.next_node
while not isinstance(node, End):
    if agent_run.result is not None:
        break  # wrap_run short-circuit
    if _stream_step is not None:
        node = await agent_run._run_node_with_hooks(node, _stream_step)
    else:
        node = await agent_run.next(node)
```

`agent.iter()` (`__init__.py:1063`) returns `AgentRun` (`run.py:32`) — an async-iterable over graph nodes. Node sequence: `UserPromptNode → ModelRequestNode → CallToolsNode → ModelRequestNode → ... → End`.

## §5 Result-type validation

Two-stage pipeline:
1. **Pydantic validation** — `TypeAdapter(OutputDataT).validate_python(raw)` enforces schema. Raises `ValidationError` on mismatch.
2. **Output validators** — `@agent.output_validator` decorated funcs run post-Pydantic for custom checks (async ok). May raise `ModelRetry(msg)`.

Failure → `RetryPromptPart` with error detail injected into next `ModelRequest`. Retry budget exhaustion → `UnexpectedModelBehavior` exception.

**Three output modes**:
| Mode | Mechanism | Activation | Reliability |
|---|---|---|---|
| `ToolOutput` (default) | LLM tool-calls a synthetic `final_result` tool with output as args | Default for BaseModel/dataclass; explicit via `ToolOutput(T)` | High |
| `NativeOutput` | Model's native structured-output / JSON-schema response | `NativeOutput(T)` | High (model-dependent — Gemini can't mix with tools) |
| `PromptedOutput` | Schema injected into prompt as instructions | `PromptedOutput(T)` | Lowest — relies on LLM compliance, but works with any model |

`OutputMode.auto` lets `ModelProfile.default_structured_output_mode` pick.

## §6 Multi-step coordination

Graph-driven, not loop-driven. `AgentRun.next_node` advances per await:
- `UserPromptNode` — initial user input → assembles message-history.
- `ModelRequestNode` — sends to LLM; result may be text-only OR `ToolCallPart`s.
- `CallToolsNode` — for each `ToolCallPart`, validate args via Pydantic → execute → wrap return in `ToolReturnPart` → append to history.
- Loop back to `ModelRequestNode` until model emits a non-tool response matching `output_type` → `End`.

`capture_run_messages()` context manager exposes the full message history for inspection/debugging. The graph is **stateful and replayable** — `AgentRun` can be paused, snapshotted, resumed (durable-execution integration with Temporal / DBOS supported).

## §7 Pydantic v2 integration depth

- **Schema gen**: `FunctionSchema` uses Pydantic's `TypeAdapter` to convert any Python type (BaseModel, TypedDict, dataclass, generics, Annotated[...]) → JSON Schema for tool params and output_type.
- **Validation**: `TypeAdapter.validate_python(raw_dict)` enforces strict type-coercion + constraints (`Annotated[int, Field(ge=0, le=100)]`).
- **Serialization**: outputs serialize via `model_dump()` / `TypeAdapter.dump_python` for message history.
- **Generics**: `Agent[DepsT, OutputT]`, `RunContext[DepsT]`, `AgentRunResult[OutputT]`, `Tool[DepsT]` all PEP-695-style generic; Pydantic v2 BaseModel itself supports generics natively.
- **Errors**: `pydantic.ValidationError` flows directly into `RetryPromptPart`; error details preserved (loc, msg, type, input_value).

## §8 Comparison with OpenHands SDK (S1)

| Axis | PydanticAI | OpenHands SDK |
|---|---|---|
| Type-safety | Pydantic v2 generics end-to-end; static + runtime | Less generic; runtime-only via dataclasses |
| Tool dispatch | `@agent.tool` decorator + auto JSON-schema gen | Manual ActionExecutor + dict-based dispatch |
| Run loop | Graph-state-machine (`pydantic-graph`) | Imperative loop in `Runtime.run()` |
| Output validation | 3 modes (Tool/Native/Prompted) + retry-prompt feedback | Single mode, less structured |
| Multi-step | Native graph + `AgentRun.next()` step API + durable-exec | Linear loop |
| DI model | `deps_type` + `RunContext[T]` typed access | Constructor injection only |
| Output streaming | `run_stream()` async-iterable + `StreamedRunResult` | Event callbacks |

**PydanticAI cleaner**: type-safety, output-mode flexibility, declarative spec (`from_spec`), graph-introspection, retry-prompt-loop semantics.
**OpenHands SDK cleaner**: VS Code / sandbox runtime integration, action execution model for code-edit agents (different domain — code-execution vs general LLM agent).

## §9 Cite-anchor cluster

| Component | Source file:line |
|---|---|
| `Agent` class def | `pydantic_ai_slim/pydantic_ai/agent/__init__.py:183` |
| `@agent.tool` decorator | `pydantic_ai_slim/pydantic_ai/agent/__init__.py:651` |
| `agent.run()` | `pydantic_ai_slim/pydantic_ai/agent/abstract.py:216` |
| `agent.run_sync()` | `pydantic_ai_slim/pydantic_ai/agent/abstract.py:381` |
| `agent.run_stream()` | `pydantic_ai_slim/pydantic_ai/agent/abstract.py:466` |
| `agent.iter()` | `pydantic_ai_slim/pydantic_ai/agent/__init__.py:1063` |
| `AgentRun` class | `pydantic_ai_slim/pydantic_ai/run.py:32` |
| `CallToolsNode` / `ModelRequestNode` | `pydantic_ai_slim/pydantic_ai/_agent_graph.py` (re-exported from `pydantic_ai/__init__.py`) |

**Public exports** (from `pydantic_ai/__init__.py`):
- Core: `Agent`, `AgentSpec`, `AgentRun`, `AgentRunResult`, `AgentRunResultEvent`, `RunContext`, `capture_run_messages`
- Graph nodes: `UserPromptNode`, `ModelRequestNode`, `CallToolsNode`, `End`
- Tools: `Tool`, `ToolDefinition`, `AgentNativeTool`, `AbstractToolset`, `FunctionToolset`, `CombinedToolset`, `PreparedToolset`, `ApprovalRequiredToolset`, `AgentToolset`
- Outputs: `ToolOutput`, `NativeOutput`, `PromptedOutput`, `TextOutput`, `StructuredDict`, `ToolOrOutput`
- Settings: `ModelSettings`, `AgentModelSettings`, `AgentRetries`, `ToolChoice`, `EndStrategy`, `UsageLimits`
- Messages: `ModelMessage`, `UserMessage`, `TextPart`, `ToolCallPart`, `ToolReturnPart`, `RetryPromptPart`, `BinaryContent`, `ImageUrl`, `AudioFormat`, `DocumentFormat`
- Exceptions: `AgentRunError`, `ModelAPIError`, `UnexpectedModelBehavior`, `UsageLimitExceeded`, `ApprovalRequired`, `ModelRetry`
- Concurrency: `ConcurrencyLimiter`, `ConcurrencyLimit`, `AbstractConcurrencyLimiter`
- Embeddings: `Embedder`, `EmbeddingModel`, `EmbeddingResult`, `EmbeddingSettings`

**Docs URLs**: https://ai.pydantic.dev/agents/ · https://ai.pydantic.dev/tools/ · https://ai.pydantic.dev/messages-and-chat-history/ · https://ai.pydantic.dev/output/

## §10 Applicable patterns for W376 TaskSpec/TaskResult

Five patterns directly transferable to W376's typed-agent layer:

1. **Generic-parameterized result envelope** — model TaskResult as `TaskResult[OutputT]` (Pydantic BaseModel generic), mirroring `AgentRunResult[OutputDataT]`. Static checkers verify `.output` access type-safety; runtime validates via `TypeAdapter`.

2. **DI via typed RunContext** — TaskSpec carries `deps_type`; orchestrator injects `TaskContext[DepsT]` into worker subagents giving typed `.deps` access (DB, HTTP client, secrets). Replaces brittle dict-based context-passing.

3. **Three-mode output validation** — adopt `ToolOutput` (default, highest reliability via tool-call schema), `NativeOutput` (when model supports JSON-schema response), `PromptedOutput` (universal fallback). Codex-Verdict trailer could use NativeOutput on GPT-5.5 vs PromptedOutput on local Ollama qwen3-coder.

4. **Retry-prompt-loop semantics** — on TaskResult validation failure, generate a `RetryPromptPart`-equivalent with structured error detail (Pydantic loc/msg/type/input_value preserved), feed back to model with budget cap (`retries` per-tool / per-output / global). Currently W376 has no formal retry-loop — adopting this would close the "silent-tool-error-swallow" failure mode.

5. **Graph-state-machine run loop** — replace imperative `while not done: ...` orchestrator loop with `AgentRun.next_node` iteration. Each node (`UserPromptNode`/`ModelRequestNode`/`CallToolsNode`/`End`) is snapshotable → enables checkpoint-resume (W376 Δ-G50 task-failure-recovery + L329-1 TASK-CLOSE-DRIFT mitigation). Pairs naturally with `checkpoint-resume` skill.

**Anti-pattern to avoid**: Do NOT adopt `PromptedOutput` as default mode for TaskResult — it's the least reliable; reserve for fallback only when ToolOutput unsupported.

---
*Cite count: 9 file:line anchors + 4 docs URLs + 1 GitHub repo = 14 distinct citations*

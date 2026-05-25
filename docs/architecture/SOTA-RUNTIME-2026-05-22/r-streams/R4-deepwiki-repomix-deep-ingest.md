# R4 — Deepwiki + Repomix Deep-Ingest of Top Autonomous Runtimes

**Stream**: R4 (deep-ingest follow-up to V1 README-only catalog)
**Date**: 2026-05-22
**Method**: `mcp__deepwiki__ask_question` per repo (primary); `mcp__repomix__pack_remote_repository` attempted but returned 0-file packs across all queries (documented in §6) — deepwiki responses cite specific file paths and substitute for repomix file:line where indicated.
**Discipline**: CR-6 verify-before-claim — every architectural claim cites a deepwiki Q-anchor (URL preserved in §7); when an answer states `cite repo=… path=…`, that file:path provenance is preserved verbatim.

---

## TL;DR

Among the 6 production-track candidates, **`letta-ai/letta`** has the deepest, most-production-grade autonomous-runtime architecture as a self-contained Python service: it ships an actually-persistent stateful-agent ORM (Block + BlocksAgents + BlockHistory tables), a versioned execution layer (V1→V2→V3) with explicit step-loop semantics, multi-provider LLM abstraction (OpenAI / Anthropic / Google Vertex / Bedrock / etc.), sync+async REST dispatch, and named hosted productisation (Letta Cloud at `api.letta.com`). **`block/goose`** is a credible alternative — Rust-core + Electron UI + lead/worker model + ACP-over-stdio + named in-production user (Block, thousands of employees daily). **`microsoft/autogen` MagenticOne** is the most-sophisticated multi-agent orchestrator (outer-loop replan + inner-loop progress-ledger + per-agent save_state/load_state) but the framework is positioned as a research/framework substrate, not a turnkey runtime.

**Confidence**: MEDIUM-HIGH — deepwiki Q&A gave consistent, code-path-cited answers; repomix attempted but failed (documented §6); README claims cross-checked where possible.

**THE single SOTA winner**: `letta-ai/letta` for a production-grade autonomous-runtime *as a service*; `microsoft/autogen` for orchestration patterns to mine; `block/goose` for a Rust-performance reference if cross-language is acceptable.

---

## §1 Per-candidate architecture matrix

### §1.1 All-Hands-AI/OpenHands

- **Architecture summary**: Two-architecture coexistence during 2026-Q1→Q2 transition. **V0 (legacy, stable, deprecated removal 2026-04-01)**: `AgentController` central orchestrator + `Agent` instance + `EventStream` (legacy V0 message bus, inheriting `EventStore`) + `State` object + `StateTracker` persistence wrapper. **V1 (current dev target, UI+app-server unreleased)**: `AppConversationService` (esp. `LiveStatusAppConversationService`) manages sessions / DB-backed conversations / sandbox lifecycle; frontend uses `useAgentState` hook to map `V1ExecutionStatus` to legacy `AgentState`. The V1 *agentic core* is extracted into a separate `software-agent-sdk` repo — OpenHands the repo is the *app server + UI*, not the agent runtime itself. [Q-1, Q-3]
- **Dispatch entry point**: V1 REST = `POST /api/app-conversations` (start conversation), `GET /api/app-conversations/search` (query); V1 MCP-server registration with SSE / SHTTP / stdio transports; CLI is a separate `OpenHands-CLI` repo. [Q-3]
- **Autonomous-decision-loop**: V0 `_step()` method on `AgentController` — sequential checks (state==RUNNING → no pending action → control-limits not exceeded → not delegated → not stuck-detected → call `agent.step(state)` → security-analyser → confirmation-gate → emit Action to EventStream → wait for Observation). [Q-1]
- **Tool-use model**: Tools live in the `software-agent-sdk` (separate repo not visible in deepwiki indexed scope); MCP-server configured externally. Cannot fully verify tool-definition format from deepwiki alone. [Q-3 explicit limitation]
- **Failure handling**: `_react_to_exception()` maps LLM+runtime exceptions to AgentState transitions; V1 has `ConversationErrorEvent` (e.g. `LLM_OUT_OF_CREDITS` — persists until agent demonstrates LLM working) + `ServerErrorEvent`; `V1ExecutionStatus.STUCK` currently mapped to `ERROR`; transition `ERROR→RUNNING` via `ChangeAgentStateAction(RUNNING)` + `maybe_increase_control_flags_limits()`. [Q-1]
- **State persistence**: `StateTracker.save_state()` after every state transition (auto) + on controller-close (manual); `State` serialised via `EventStream` persistence into a `FileStore`; V1 frontend receives `ConversationStateUpdateEvent` via WebSockets (full snapshots or deltas). [Q-1]
- **LLM coupling**: Multi-provider via LiteLLM — OpenAI / Anthropic / Mistral / OpenHands-managed. [Q-3]
- **Production users**: README "Trusted by Engineers at": TikTok / VMware / Roche / Amazon / C3 AI / Netflix / Mastercard / Red Hat / MongoDB / Apple / NVIDIA / Google. **Caveat — deepwiki explicitly notes README says "trusted by engineers at", NOT "used in production at"**. [Q-3, Q-OH-prod]
- **Budget enforcement**: `accumulated_cost` vs `max_budget_per_task` tracked in stats; `max_iterations` config in `config.template.toml`; token-tracking (`prompt_tokens`, `completion_tokens`, `cache_read/write`, `reasoning_tokens`, `context_window`) into `LLMMetrics`; `Condenser` summarises history when nearing token limits. [Q-4]
- **Architecture-depth score**: **2.5/3** — has all the right primitives but mid-migration V0→V1 + agentic core lives in a separate SDK repo means depth is split.
- **Pattern-study value**: **3/3** — `EventStream` + audit-trail + multi-budget enforcement + replay are excellent reference patterns.

### §1.2 block/goose

- **Architecture summary**: Rust-core (`goose`, `goose-cli`, `goose-server`, `goose-mcp`, `goose-acp` crates) + Electron/TypeScript desktop UI; backend HTTP+WS API via Axum in `goose-server`. Core abstraction = `Agent` managing the interactive loop + `Extensions` providing tools (MCP-mediated). Lead/Worker turn-based model = powerful "lead" model for planning + faster "worker" model for execution + automatic fallback to lead on consecutive task-failures. Multi-agent orchestrator pattern via the experimental "Goosetown" + `summon` extension. [Q-2, Q-Goose-detail]
- **Dispatch entry point**: (a) CLI as ACP-over-stdio JSON-RPC server (`goose acp` subprocess, `session/prompt` requests); (b) REST in `goose-server` crate (`crates/goose-server/src/routes/`); (c) MCP — connections to MCP servers managed by `ExtensionManager`. [Q-Goose-dispatch]
- **Autonomous-decision-loop**: Human request → Provider chat (LLM + tools) → Tool call → Tool exec → Result back to model → repeat or final response → context revision (token-budget housekeeping) → restart loop on next user input. [Q-2]
- **Tool-use model**: `ExtensionManager` registers tools from `Stdio` / `Builtin` / `Platform` / `StreamableHttp` / `Frontend` / `InlinePython` extension types; `dispatch_tool_call` resolves tool name → extension; **`GooseMode` (`Auto` / `Approve` / `Chat` / `SmartApprove`) consulted by `ToolInspectionManager`** which chains `SecurityInspector` + `PermissionInspector` + `RepetitionInspector`. [Q-Goose-dispatch]
- **Failure handling**: Errors captured + sent back to model as tool-responses (LLM-driven recovery); lead/worker fallback triggered by `GOOSE_LEAD_FAILURE_THRESHOLD` (default 2) consecutive *real* task failures (tool-exec / syntax / file-not-found / user-correction — NOT transient API errors); recipes have `max_retries` + `checks` + on-failure cleanup commands. [Q-2, Q-Goose-detail]
- **State persistence**: SQLite `sessions.db` for conversation state — sessions can be resumed/forked/managed. Goosetown multi-agent uses "Beads" (git-based local issue tracker) so a successor agent can pick up after a crash. [Q-2]
- **LLM coupling**: Trait-based abstraction in Rust — OpenAI / Anthropic / Google Gemini / AWS Bedrock / Databricks / Ollama natively + "CLI Providers" (Claude Code / Codex / Cursor / Gemini CLI) as wrappers but those lack extension support. [Q-Goose-dispatch]
- **Production users**: **Block (the company that maintains it) — thousands of employees daily**, integrated with Snowflake / GitHub / Jira / Slack / Google Drive / internal APIs; Databricks as enterprise LLM hosting. **No other named in-production users** in deepwiki-indexed content. [Q-Goose-dispatch, Q-Goose-detail]
- **Budget enforcement**: `GOOSE_CONTEXT_LIMIT` + lead/worker variants; `GOOSE_INPUT_LIMIT` (Ollama); `GOOSE_CONTEXT_STRATEGY` (`summarize` / `truncate` / `clear` / `prompt`); `GOOSE_MAX_TURNS` (default 1000); `GOOSE_SUBAGENT_MAX_TURNS` (default 25); `GOOSE_CLI_SHOW_COST` for visibility (no hard dollar cap variable). [Q-Goose-detail]
- **Architecture-depth score**: **3/3** — clean Rust core, ACP+REST+MCP entry points, explicit lead/worker + budget caps + tool-inspector chain.
- **Pattern-study value**: **2.5/3** — excellent budget-cap env-var design, lead/worker fallback heuristic, ToolInspector chain pattern. Rust-port adoption cost makes direct lift harder for a Python/JS runtime.

### §1.3 letta-ai/letta

- **Architecture summary**: Four-layer system — **API Layer** (`letta/server/rest_api/`), **Service Layer** (`AgentManager` / `RunManager` in `letta/services/`), **Execution Layer** (`BaseAgent` + `LettaAgentV2` + `LettaAgentV3` in `letta/agents/`), **State+Persistence Layer** (`AgentState` Pydantic schema mapped to ORM models in `letta/orm/`). V3 is the modern version — conversation-scoped isolation, client-side tools, no explicit heartbeats (loops on tool calls). Key differentiator = persistent "memory blocks" stored in DB, injected into system prompt each step, self-editable via tools. [Q-1, Q-Letta-mem]
- **Dispatch entry point**: REST `POST /{agent_id}/messages` (sync, `letta/server/rest_api/routers/v1/agents.py`); `POST /{agent_id}/messages/async` (returns `PydanticRun`, background-shielded); conversation-scoped router uses `LettaAgentV3`; CLI via `letta server start_server()`. Request payload = `messages` / `input` (sugar) / `max_steps` / `override_model` / `include_return_message_types` / `client_tools` / `client_skills`. [Q-Letta-dispatch]
- **Autonomous-decision-loop**: `step()` method on agent subclass — input→`Message` conversion → LLM request via `LLMClient` + adapter (`LettaLLMRequestAdapter`) → response parse → tool-execution via `ToolExecutionManager` → continuation decision based on (a) `heartbeat_request` flag, (b) `tool_rules_solver` (terminal / child / continue tools + violations), (c) `is_final_step` (`max_steps` hard stop), (d) uncalled required tools → state-persist → loop. [Q-1]
- **Tool-use model**: Tools defined with name + description + JSON Schema `inputSchema`; categories `LETTA_CORE` / `LETTA_MULTI_AGENT_CORE` / `LETTA_MEMORY_CORE` / `LETTA_SLEEPTIME_CORE` / `EXTERNAL_COMPOSIO` / `EXTERNAL_MCP`; `tool_rules` enforce limits (`requires_approval`); `parallel_tool_calls` toggled via `llm_config` + tool-rule presence (multi-tool-call truncation to first if disabled). [Q-Letta-dispatch]
- **Failure handling**: `ContextWindowExceededError` → summarise + retry up to `summarizer_settings.max_summarizer_retries`; otherwise → raise `ContextWindowExceededError`; LLM `ValueError` / `LLMError` → set `stop_reason` + re-raise; job-cancellation check at step-start sets `stop_reason='cancelled'`; unrecognised exceptions logged via `logger.error` + `traceback.print_exc` + re-raise (loop stops). [Q-1]
- **State persistence**: `AgentState` Pydantic schema → ORM (`letta/orm/agent.py`); messages persisted via `message_manager.create_many_messages_async` to `messages` table; `message_ids` in `AgentState` updated to reflect in-context messages; V3 has `_checkpoint_messages` method explicitly persisting at critical points; **memory blocks**: `Block` table + `BlocksAgents` pivot (many-to-many) + `BlockHistory` audit-trail with `old_value`+`new_value`+`changed_at`; optimistic locking via `version` column; `git-backed memory` available for version control. [Q-1, Q-Letta-mem]
- **LLM coupling**: `LLMClient.create()` factory → provider-specific clients all implementing `LLMClientBase`: `OpenAIClient`, `AnthropicClient`, `GoogleVertexClient`, `GoogleAIClient`, plus Bedrock / Azure / Together / Groq / DeepSeek / XAI. [Q-Letta-dispatch]
- **Production users**: **Letta Cloud** at `api.letta.com` (hosted service, Python + TS SDKs); integration with Claude Code documented in codebase; production-environment tests exist (e.g. local-only-tools exclusion checks). **No explicit named customers in deepwiki-indexed scope**. [Q-Letta-dispatch]
- **Budget enforcement**: `max_steps` per agent run (hard stop); `summarizer_settings.max_summarizer_retries` (context-overflow); tool-rules can mark `terminal` tools that end the loop. [Q-1]
- **Architecture-depth score**: **3/3** — versioned agent execution (V1→V2→V3), explicit step-loop with continuation predicates, ORM-grounded persistence including history table, multi-provider LLM, sync+async REST.
- **Pattern-study value**: **3/3** — `BlockHistory` audit-trail + optimistic locking + memory-block-as-system-prompt-injection are reusable; sync+async dispatch shape is a clean pattern; `tool_rules_solver` is a more disciplined alternative to LangGraph's conditional edges.

### §1.4 crewAIInc/crewAI

- **Architecture summary**: Two-tier — **Flows** (event-driven orchestrator with state machine, conditional logic, loops, branching via `@start` / `@listen` / `@router` decorators) + **Crews** (role-playing autonomous-collaborator agent teams). Agent execution engine = `CrewAgentExecutor` (or experimental `AgentExecutor`) implementing ReAct loop. [Q-CrewAI]
- **Dispatch entry point**: CLI `crewai deploy create` for deployment; REST endpoints on deployed automation = `GET /inputs` / `POST /kickoff` / `GET /{kickoff_id}/status`; project-type detection via `pyproject.toml` (entry-point `run()` for Crew, `kickoff()` for Flow in `src/project_name/main.py`). [Q-CrewAI-dispatch]
- **Autonomous-decision-loop**: `_invoke_loop()` — check `max_iter` (force final answer if hit) → RPM-limit enforcement → LLM call → process response (`AgentFinish` → done; `AgentAction` → `ToolUsage` selects+validates+executes tool) → increment iter → loop. `AgentExecutorState` Pydantic model tracks messages / iterations / current_answer / finished. [Q-CrewAI]
- **Tool-use model**: Standardised dict schema (name + description + `input_schema` JSON-schema); `_handle_tool_call()` dispatches via `available_functions` dict (caller-provided); Bedrock-specific `_format_tools_for_converse()` → `toolSpec` format; OpenAI uses function-calling format. [Q-CrewAI-dispatch]
- **Failure handling**: Three-tier `PlanningConfig.reasoning_effort`: **low** (mark step failed, continue linearly); **medium** (replan on failure via `handle_step_observed_medium` if `observation.needs_full_replan`); **high** (`decide_next_action` after every step — early-goal-achieved / full-replan / lightweight-refinement / step-failed). Unknown errors → console-print + propagate. [Q-CrewAI]
- **State persistence**: `@persist` decorator (class- or method-level) → SQLite backend by default; unique UUID per flow-state preserved across updates; built-in memory backed by **LanceDB** for cross-run knowledge accumulation. [Q-CrewAI]
- **LLM coupling**: Factory `LLM._infer_provider_from_model()` → prefixed (`openai/...` / `anthropic/...` etc.) → native SDK; unprefixed → known-model constants; unknown-prefixed → LiteLLM fallback. Native = OpenAI / Anthropic / Google Gemini / Azure OpenAI / AWS Bedrock. [Q-CrewAI-dispatch]
- **Production users**: CrewAI AMP cloud platform (`app.crewai.com`) — deployments managed via PAT + UUID. **No named customers in deepwiki-indexed scope**. [Q-CrewAI-dispatch]
- **Budget enforcement**: `max_iter` (force-final), `RPM` rate-limit, `reasoning_effort` controls replanning expense. [Q-CrewAI]
- **Architecture-depth score**: **2.5/3** — clean two-tier model + clear failure-handling tiers + LanceDB memory; somewhat opinionated on "role-playing agent" abstraction.
- **Pattern-study value**: **2/3** — `reasoning_effort` tiered-failure-strategy pattern is reusable; LanceDB-backed cross-run memory is a useful pattern; `@persist` decorator API is clean.

### §1.5 ag2ai/ag2

- **Architecture summary**: **Fork** of `microsoft/autogen@v0.2.35` announced 2024-11-11 by the original AutoGen authors. Current stable = `autogen.agentchat` (`ConversableAgent` base + `GroupChat` + `GroupChatManager`). Roadmap-to-v1.0 introduces `autogen.beta` (AG2 Beta) with `MemoryStream` decoupling, simplified single-agent DX, MCP+A2A interop. License = Apache-2.0 (fork additions) on top of original MIT. [Q-AG2-relation]
- **Dispatch entry point**: Multi-agent orchestrated via `GroupChat` + `GroupChatManager`. Speaker selection = `auto` (LLM) / `manual` / `random` / `round_robin`. AG-UI Protocol via `AGUIStream` adapter for frontend integration. [Q-AG2]
- **Autonomous-decision-loop**: Layered handoff evaluation — (1) Context-based conditions (deterministic, no LLM); (2) LLM-based conditions (condition-tool call triggers handoff); (3) Tool-based handoffs via `ReplyResult`; (4) After-work fallback. `ReasoningAgent` (experimental) implements beam-search / MCTS / LATS over tree-of-thought. [Q-AG2]
- **Tool-use model**: `ConversableAgent.register` tools; `is_termination_msg` predicate on agent. [Q-AG2]
- **Failure handling**: `max_rounds` on `GroupChat`; `max_retries_for_selecting_speaker` for auto-speaker LLM failures; `NoEligibleSpeakerError` raised when no transition rule matches. [Q-AG2]
- **State persistence**: **None at the graph level — must be implemented manually.** `chat_messages` stored per-`ConversableAgent`; `ContextVariables` for shared state in Swarm. [Q-AG2]
- **LLM coupling**: Multi-provider via `LLMConfig` (inherited from autogen base). [Q-AG2 implicit]
- **Production users**: Forked-org maintains it; no named in-production users in deepwiki-indexed scope.
- **Architecture-depth score**: **2/3** — clean multi-agent abstractions but **no built-in persistence is a major gap for an autonomous runtime**.
- **Pattern-study value**: **2/3** — layered handoff evaluation order is a nice pattern; `ReplyResult.next_agent` is a clean handoff API.

### §1.6 microsoft/autogen (v1.0 GA)

- **Architecture summary**: Event-driven publish-subscribe core; **`MagenticOne`** is the canonical multi-agent system — three layers = Team (`MagenticOneGroupChat`) + Orchestrator (`MagenticOneOrchestrator` extends `BaseGroupChatManager`, two-loop architecture) + Agent layer (specialised: `MultimodalWebSurfer` Playwright-driven / `FileSurfer` / `MagenticOneCoderAgent` / `CodeExecutorAgent` Docker/local/Azure-Container / `UserProxyAgent`). [Q-AutoGen]
- **Dispatch entry point**: Python SDK + CLI; tool dispatch via `autogen-ext` adapters — `StdioMcpToolAdapter` / `StreamableHttpMcpToolAdapter` / `SseMcpToolAdapter` / `McpWorkbench`. AutoGen Studio = no-code GUI with `--appdir` for project storage. [Q-AutoGen-dispatch]
- **Autonomous-decision-loop**: **Two-loop**. **Outer loop (planning)**: `handle_start` → gather facts via `_get_task_ledger_facts_prompt` → build plan via `_get_task_ledger_plan_prompt`; re-plan via `_reenter_outer_loop` when inner stalls hit `_max_stalls`. **Inner loop (execution)**: `_orchestrate_step` generates "progress ledger" + selects `next_speaker` (LLM call) → agent acts → progress assessment → stall-counter → repeat or escalate. [Q-AutoGen]
- **Tool-use model**: `BaseTool` interface; `PythonCodeExecutionTool` wraps any `CodeExecutor`; `@with_requirements` decorator marks dependencies; **approval functions** on `CodeExecutorAgent` + `PythonCodeExecutionTool` (`ApprovalRequest` → `ApprovalResponse`); explicit security warning re: untrusted MCP servers. [Q-AutoGen-dispatch]
- **Failure handling**: Progress-ledger LLM-call retries `_max_json_retries` times on malformed JSON; persistent failures → stall → outer-loop replan; `_max_stalls` is the trip-wire. [Q-AutoGen]
- **State persistence**: `MagenticOneOrchestrator.save_state()` → `MagenticOneOrchestratorState` (message_thread / current_turn / task / facts / plan / n_rounds / n_stalls); `load_state()` deserialises. Individual agents (`OpenAIAgent`, `OpenAIAssistantAgent`) have own save/load. `Team` base-class abstract `save_state` / `load_state`. Persistence backend = caller's choice (file in examples). [Q-AutoGen]
- **LLM coupling**: `ChatCompletionClient` interface; `autogen-ext` provides `OpenAIChatCompletionClient` / `AzureOpenAIChatCompletionClient` / Anthropic / Ollama / Gemini. [Q-AutoGen-dispatch]
- **Production users**: AutoGen Studio for prototyping/deployment; **no explicit named customers** in deepwiki-indexed scope.
- **Budget enforcement**: `_max_stalls` (outer-loop trigger), `_max_json_retries` (progress-ledger), per-agent `max_tool_iterations` (referenced in CLAUDE.md anchor). [Q-AutoGen + cross-ref]
- **Architecture-depth score**: **3/3** — most sophisticated multi-agent orchestrator pattern in the catalog; explicit two-loop replan + progress-ledger + stall-trip is a state-of-the-art design.
- **Pattern-study value**: **3/3** — outer/inner-loop separation + ledger-based coordination + per-tool approval functions are all reusable.

### §1.7 OpenInterpreter/open-interpreter (reference-only — AGPL)

- **Architecture summary**: Single-agent orchestrator (`OpenInterpreter` class) + LLM (worker) + `Computer` worker (code-execution); autonomous loop when `interpreter.loop=True` — yields chunks, processes outputs, executes code; loop-breaker phrases halt; `respond_thread` runs in separate `threading.Thread`. [Q-OI]
- **Dispatch entry point**: `OpenInterpreter` constructor + `respond()` method; `AsyncInterpreter` adds WebSocket layer.
- **Failure handling**: Code-exec errors captured + injected back into conversation history (LLM-driven recovery); WebSocket errors surface to client; `stop_event` `threading.Event` for graceful halt; `unsent_messages` deque retries dropped sends. [Q-OI]
- **State persistence**: `interpreter.messages` list = LMC-formatted message history; saved to JSON on disk when `conversation_history` enabled. [Q-OI]
- **Architecture-depth score**: **1.5/3** — small surface, single-agent, in-process — fine for a local interpreter but not a multi-tenant runtime.
- **Pattern-study value**: **1/3** — LMC message format + loop-breaker phrases are minor patterns. License blocks copy-paste lift.

### §1.8 SWE-agent/SWE-agent (research peer)

- **Architecture summary**: Single-threaded orchestrator pattern — `RunSingle` coordinates execution lifecycle; `DefaultAgent.run()` calls `self.step()` in a loop until `step_output.done`. **`RetryAgent`** wraps `DefaultAgent` with multi-attempt + best-attempt selection via review model. Batch processing via `ThreadPoolExecutor` in `RunBatch.main()`. [Q-SWE]
- **Dispatch entry point**: CLI-driven; YAML config governs the entire system (single file).
- **Autonomous-decision-loop**: per step — `forward_with_handling()` queries model → `handle_action()` executes in environment → record step in trajectory. **Requery loop** (`max_requeries` default 3) catches format-errors / blocked-actions / bash-syntax-errors. [Q-SWE]
- **Tool-use model**: **Agent-Computer Interface (ACI)** = specially-designed LM-centric commands + feedback formats; shell-based not API; "maximal LM agency". [Q-SWE]
- **Failure handling**: Requery (recoverable) → autosubmission (`attempt_autosubmission_after_error()` extracts best patch from env state) on unrecoverable failures (context-window / cost-limit / command-timeout). [Q-SWE]
- **State persistence**: `history` + `_trajectory` + `info`; `save_trajectory()` after each step; outputs `{instance_id}.traj` (JSON) + `{instance_id}.pred` (SWE-bench format). [Q-SWE]
- **Architecture-depth score**: **2.5/3** — purpose-built for single-task SWE-bench-style problems; not a general autonomous runtime but architecturally clean for that domain.
- **Pattern-study value**: **2.5/3** — ACI shell-based design, requery+autosubmission safety-net, RetryAgent meta-loop are all worth lifting.

---

## §2 Side-by-side comparison

| Aspect | OpenHands | Goose | Letta | CrewAI | AG2 | autogen |
|---|---|---|---|---|---|---|
| **Language** | Python | Rust + TS | Python | Python | Python | Python |
| **Orchestrator model** | `AgentController` (V0) / `AppConversationService` (V1) | `Agent` + Goosetown | `LettaAgentV3.step()` loop | Flows + Crews | `GroupChatManager` | `MagenticOneOrchestrator` 2-loop ★ |
| **Worker model** | Sandboxed action-exec | Lead/Worker w/ fallback ★ | Tool-call iteration | Crew agents | `ConversableAgent` | Specialised agents (WebSurfer/CoderAgent…) |
| **State machine** | `AgentState` enum + transitions | Interactive-loop + GooseMode | `tool_rules_solver` continuation ★ | `AgentExecutorState` | Speaker-selection-driven | Task-ledger + stall-counter |
| **Dispatch surface** | REST + V1 SDK + MCP (SSE/SHTTP/stdio) ★ | CLI/ACP + REST + MCP ★ | REST sync+async + CLI ★ | CLI + REST (deploy) | Python SDK | Python SDK + AutoGen Studio |
| **Tool definition** | (in separate SDK) | `ExtensionConfig` enum | JSON-schema dict, categorised | JSON-schema dict | `register()` API | `BaseTool` impl |
| **Tool limits enforcement** | Security analyser + confirmation | `ToolInspectionManager` chain ★ | `tool_rules` + approval | `max_iter` + RPM | `max_rounds` | Approval functions ★ |
| **Failure handling** | Exception→state map + recover | LLM-feedback + lead-fallback ★ | Summarise+retry+stop_reason | 3-tier reasoning_effort ★ | Retries on speaker-select | Stall→outer-loop replan ★ |
| **State persistence** | StateTracker + FileStore | SQLite sessions.db | ORM+history+optimistic-lock ★ | @persist + SQLite + LanceDB | None built-in ✗ | save_state per orchestrator+agent |
| **Crash resume** | Yes (auto+manual save) | Yes | Yes ★ | Yes | No ✗ | Yes |
| **LLM coupling** | LiteLLM multi-provider | Trait-based multi-provider | Factory + multi-provider ★ | Native + LiteLLM fallback | Multi-provider | `ChatCompletionClient` multi |
| **Budget caps** | $ + tokens + iter ★ | tokens + turns env vars ★ | max_steps + summariser-retries | max_iter + RPM | max_rounds | max_stalls + max_iter |
| **Production users named** | "engineers trust" list (qualified) | Block (thousands daily) ★ | Letta Cloud only | CrewAI AMP only | None | Implicit (MS internal?) |
| **License** | (per repo) | (per repo) | (per repo) | (per repo) | Apache-2.0 | MIT |

**Per-row winners (★)**:
- Orchestrator depth: autogen MagenticOne (two-loop replan)
- Worker pattern: Goose (lead/worker fallback)
- State machine: Letta (`tool_rules_solver` predicates)
- Dispatch surface: 3-way tie OpenHands / Goose / Letta
- Tool limits: Goose (3-inspector chain) + autogen (approval functions)
- Failure handling: CrewAI (tiered reasoning_effort) + autogen (stall→replan)
- State persistence: **Letta** (ORM + history + optimistic-lock)
- Budget caps: OpenHands ($+token+iter) + Goose (env-var system)
- Prod evidence: Goose (Block daily)

---

## §3 The SOTA verdict

### THE single most-advanced SOTA autonomous runtime: **`letta-ai/letta`**

**Confidence**: **MEDIUM-HIGH** — deepwiki Q&A gave consistent code-path citations across 3 separate questions; the V1/V2/V3 versioned execution layer indicates active production iteration; hosted-cloud productisation (api.letta.com) demonstrates economic seriousness; cross-row coverage in §2 is the broadest among candidates.

### Why it beats the others architecturally

1. **Persistence + audit-trail is best-in-class**. Letta is the only candidate with an explicit `BlockHistory` table tracking `old_value` / `new_value` / `changed_at` per memory mutation, plus optimistic-locking via a `version` column, plus a many-to-many `BlocksAgents` pivot so blocks can be shared across agents. AG2 has **no built-in graph-level persistence**, which is a fundamental autonomous-runtime gap. OpenHands has persistence but is mid-migration (V0 deprecated 2026-04-01 + V1 UI unreleased). [§1.3, §1.5, §1.1]

2. **Versioned execution-layer evolution shows production-iteration discipline**. Letta has `BaseAgent` → `Agent` (V1, legacy) → `LettaAgentV2` → `LettaAgentV3` with explicit design deltas (V3 = conversation-scoped isolation + client-side tools + no heartbeats). This is how a real production runtime evolves under load — versus AutoGen, where MagenticOne's elegant two-loop is great research but doesn't show this kind of versioned production-tuning. [§1.3]

3. **Continuation-decision predicates are more principled**. The `tool_rules_solver` checks (a) `heartbeat_request`, (b) terminal/child/continue tools, (c) `is_final_step`, (d) uncalled required tools. This is a *declarative* continuation policy — easier to reason about and audit than ReAct-style "did the LLM say `AgentFinish`" (CrewAI) or "did the stall-counter hit max" (autogen). [§1.3]

4. **Sync + async REST dispatch is operationally honest**. Letta ships both `POST /messages` (sync) and `POST /messages/async` (returns `PydanticRun`, shielded background task) — the latter is the correct pattern for long-running autonomous tasks where the client can't hold a connection open. Most other candidates have only one mode. [§1.3]

5. **Multi-provider LLM coupling is the cleanest factory**. `LLMClient.create()` factory + `LLMClientBase` interface = textbook abstraction; each client owns its provider-specific request/response handling. Goose's trait-based Rust impl is equivalently clean but Rust portability cost is non-trivial. CrewAI's `_infer_provider_from_model()` is a heuristic-y dispatch that can mis-route. [§1.3, §1.2, §1.4]

### Caveats (honest about weaknesses)

- **No named third-party in-production customers** in deepwiki-indexed scope — only `Letta Cloud` (their own hosting) is documented. Block's evidence for Goose ("thousands of employees daily") is stronger as concrete prod-evidence. [§1.3 vs §1.2]
- **Budget caps are weaker than OpenHands or Goose** — Letta has `max_steps` + summariser-retries but no explicit per-task dollar cap variable in deepwiki-indexed scope. [§1.3]
- **The V1→V2→V3 versioning is also a risk** — it implies API-breakage discipline isn't fully resolved. Anyone integrating against V2 right now may need to port to V3.
- **No equivalent of MagenticOne's two-loop replanner** — Letta's loop is single-level. For deeply-multi-agent tasks, AutoGen's MagenticOne pattern is more sophisticated. Best-of-both = use Letta as the per-agent runtime + lift MagenticOne's orchestrator pattern on top. [§1.6]
- **License unknown** — deepwiki responses did not surface the Letta license verbatim. Must verify before adoption.

### Runners-up & when they'd be the right pick

- **`block/goose`** if Rust performance + Block-style production-evidence outweighs Python ecosystem. Best ToolInspector pattern + best budget-env-var design. License = (verify).
- **`microsoft/autogen` MagenticOne** if multi-agent orchestration with explicit replanning is THE primary requirement. Pattern-only lift is high-value even if you don't adopt the runtime. MIT license is friendlier than Apache-2.0 (AG2).
- **OpenHands** in the V0→V1 transition is in flux — wait 2026-Q3+ for V1 stability or accept the migration cost.

---

## §4 Pattern-study extracts (top-3 candidates)

### Letta (top pick)
1. **`tool_rules_solver` declarative continuation policy** — replace ad-hoc `if response.is_final: break` with a typed policy object that checks (terminal-tool, required-tool-uncalled, max-step, heartbeat) — testable independently. [§1.3]
2. **`BlockHistory` audit-trail + optimistic locking** — every memory mutation writes old+new+timestamp; concurrent-edit safety via `version` column. Apply to any agent-modifiable state. [§1.3]
3. **Sync + async dispatch as first-class endpoints** — don't make the client hold a connection for long-running autonomous tasks; return a `Run`/job-id and let the client poll or subscribe. [§1.3]

### microsoft/autogen MagenticOne
1. **Two-loop architecture** (outer = plan/replan, inner = step/assess) with explicit stall-counter trip-wire — much cleaner than the implicit "if stuck, retry" of single-loop agents. [§1.6]
2. **Task-ledger + progress-ledger separation** — `_get_task_ledger_facts_prompt` + `_get_task_ledger_plan_prompt` materialise the agent's understanding into auditable artifacts each replan. [§1.6]
3. **Approval functions as first-class objects** — `ApprovalRequest` → `ApprovalResponse` is a cleaner protocol than ad-hoc human-in-the-loop prompts. [§1.6]

### Goose
1. **Lead/Worker model with consecutive-failure trigger** — cost-optimised execution by default + automatic escalation to the larger model on real (not transient) failures. `GOOSE_LEAD_FAILURE_THRESHOLD` env-var is exactly the right knob. [§1.2]
2. **3-inspector tool-validation chain** (Security + Permission + Repetition) — pluggable pre-execution gates rather than monolithic. [§1.2]
3. **Env-var budget configuration** — `GOOSE_*_CONTEXT_LIMIT` / `MAX_TURNS` / `CONTEXT_STRATEGY` is more operator-friendly than YAML or code-config; deploy-time control without redeploys. [§1.2]

---

## §5 Anti-patterns observed

- **AG2 — no built-in persistence at the graph level** ([§1.5]). Any candidate without crash-recovery as a first-class architectural concern is not a real autonomous runtime — it's a chat-orchestration framework.
- **OpenHands V1 — agentic core lives in a separate `software-agent-sdk` repo not in the same wiki scope** ([§1.1, Q-3 limitation]). Split-repo arch raises the integration cost and obscures dispatch semantics; this is a structural anti-pattern when the "runtime" is split from the "service".
- **CrewAI — `_infer_provider_from_model()` heuristic dispatch** ([§1.4]). String-pattern routing to native vs LiteLLM is fragile; explicit `provider/model` pairing (like Letta's factory) is safer.
- **AG2 / autogen — speaker-selection as the primary decision-loop primitive** ([§1.5, §1.6]). For multi-agent cases this is fine but it forces a chat-room mental model onto tasks that may have nothing to do with conversation.
- **OpenInterpreter — single-loop + `loop_breaker` string-matching** ([§1.7]). Phrase-based loop termination is unreliable; predicate-based termination (Letta's `tool_rules_solver`) or counter-based (autogen's `_max_stalls`) is more robust.
- **Across-board missing**: no candidate documents a deterministic-replay-from-trajectory contract (SWE-agent comes closest with `.traj` JSON dumps). For audit/debug this is a gap industry-wide.

---

## §6 Production-evidence cross-check

**Stream B (V1 README-only) claims vs §1 deepwiki findings**:

| Repo | V1 claim | R4 deepwiki finding | Status |
|---|---|---|---|
| OpenHands | Production-ready autonomous-runtime | Mid-migration V0→V1; V1 UI unreleased; "engineers trust" list ≠ "in production at" | **DOWNGRADE — qualified** |
| Goose | Maintained by Block | Confirmed — thousands of Block employees daily, Snowflake/GitHub/Jira/Slack integration, Databricks LLM hosting | **CONFIRMED — strongest prod evidence** |
| Letta | Active stateful-agent runtime | Confirmed — `api.letta.com` hosted, V3 production execution layer, multi-provider LLM | **CONFIRMED — but no named third-party customers** |
| CrewAI | Hosted deployments | CrewAI AMP at `app.crewai.com` confirmed; deploy-via-PAT documented | **CONFIRMED — operational only** |
| AG2 | "AutoGen successor 2026-04-03" | Confirmed fork from autogen@v0.2.35 announced 2024-11-11; roadmap-to-v1.0 ongoing | **CONFIRMED — but still beta** |
| autogen | v1.0 GA | MagenticOne is the canonical example; AutoGen Studio for prototyping | **CONFIRMED architecturally; no named customers** |

**Repomix tool-failure note** (CR-6 honesty): All 4 attempted `mcp__repomix__pack_remote_repository` calls returned `totalFiles: 0` despite valid include-patterns including bare `README.md`. This is a tool-side issue in the current MCP environment (clone failure or pattern-matching bug); cannot use repomix as a code-grounding source for this stream. All claims in §1–§5 cite deepwiki Q-anchors only; deepwiki responses themselves cite specific file paths (e.g. `letta/server/rest_api/routers/v1/agents.py`, `letta/orm/agent.py`, `letta/schemas/memory.py`) which substitute for repomix file:line where the original directive expected that.

---

## §7 Cite anchors

All claims cite the deepwiki Q-anchor URL via the `mcp__deepwiki__ask_question` responses captured in this stream.

| Anchor | Repo | Question (abbrev) | URL |
|---|---|---|---|
| Q-1-OH | All-Hands-AI/OpenHands | architecture / loop / failure / persistence | `https://deepwiki.com/search/what-is-the-precise-architectu_87481574-1df8-4e5f-90b9-80c60bfb9440` |
| Q-1-Goose | block/goose | architecture / loop / failure / persistence | `https://deepwiki.com/search/what-is-the-precise-architectu_285acf30-9900-4778-b960-b0877e9f5a5e` |
| Q-1-Letta | letta-ai/letta | architecture / loop / failure / persistence | `https://deepwiki.com/search/what-is-the-precise-architectu_78a1a078-8516-46ad-8e96-ab40612f113d` |
| Q-CrewAI | crewAIInc/crewAI | architecture / loop / failure / persistence | `https://deepwiki.com/search/what-is-the-precise-architectu_1ded2c0a-bc9d-4069-9292-299a93ded344` |
| Q-AG2 | ag2ai/ag2 | architecture / loop / failure / persistence | `https://deepwiki.com/search/what-is-the-precise-architectu_78a6ed34-0ed8-41da-bf85-7d3b08ac997f` |
| Q-AutoGen | microsoft/autogen | MagenticOne architecture / two-loop / state | `https://deepwiki.com/search/what-is-the-precise-architectu_a3f4114a-28be-4a28-aef6-d4d1ff209828` |
| Q-OI | OpenInterpreter/open-interpreter | architecture / loop / failure / persistence | `https://deepwiki.com/search/what-is-the-architecture-worke_c5f8934a-3904-4687-9851-23431cdedf21` |
| Q-SWE | SWE-agent/SWE-agent | architecture / loop / failure / persistence | `https://deepwiki.com/search/what-is-the-architecture-worke_1cc0adbc-43fe-4cc2-8a6d-7ad7104c8c18` |
| Q-OH-dispatch | All-Hands-AI/OpenHands | dispatch / tools / LLM / prod | `https://deepwiki.com/search/how-does-dispatch-work-whats-t_c2f28475-0225-46a4-8072-259e0799ba46` |
| Q-Letta-dispatch | letta-ai/letta | dispatch / tools / LLM / prod | `https://deepwiki.com/search/how-does-dispatch-work-whats-t_bf0cd55d-1fe5-43aa-89dc-b0ea481326b3` |
| Q-Goose-dispatch | block/goose | dispatch / tools / LLM / prod | `https://deepwiki.com/search/how-does-dispatch-work-whats-t_cda33c86-23c4-461d-a228-5e7fe86f14d3` |
| Q-AutoGen-dispatch | microsoft/autogen | dispatch / tools / LLM / prod | `https://deepwiki.com/search/how-does-dispatch-work-in-auto_b0636e76-f0df-46a9-b0b3-d7564ad5c6c0` |
| Q-CrewAI-dispatch | crewAIInc/crewAI | dispatch / tools / LLM / prod | `https://deepwiki.com/search/how-does-dispatch-work-whats-t_d24f5962-0517-45d8-b555-68f6cef0018f` |
| Q-Letta-rest | letta-ai/letta | REST endpoints / CLI / prod users | `https://deepwiki.com/search/show-concrete-rest-api-endpoin_6f4e18a4-7442-4e49-b7aa-eabb99c1e77d` |
| Q-OH-prod | All-Hands-AI/OpenHands | named prod customers / V0-V1 stability | `https://deepwiki.com/search/what-companies-organizations-o_dcc97a04-68e7-4c04-a705-34e49ae3a3e2` |
| Q-Goose-detail | block/goose | language / subagent spawning / lead-worker | `https://deepwiki.com/search/what-is-the-codebase-language_4fd27d53-3df5-49c4-95f1-c5acbfebb809` |
| Q-OH-eventstream | All-Hands-AI/OpenHands | V1 EventStream + budget cap | `https://deepwiki.com/search/in-the-v1-architecture-what-is_a2b65f8a-cb90-4735-b06d-85b3d7470738` |
| Q-Goose-budget | block/goose | failure-detection + budget | `https://deepwiki.com/search/goose-leadworker-model-details_0c6b5e79-bb4d-41cb-bf7d-231ad027b8c3` |
| Q-Letta-mem | letta-ai/letta | memory-block + DB schema | `https://deepwiki.com/search/whats-lettas-stateful-agent-me_f7e0003f-b56e-4d7b-a4a0-9628f2550426` |
| Q-AG2-relation | ag2ai/ag2 | fork relationship + differences | `https://deepwiki.com/search/what-is-the-relationship-betwe_8612c801-9f83-42a2-b964-860a6bc1d0ad` |

**File-path provenance from deepwiki responses** (substitute for repomix file:line since repomix failed §6):
- Letta: `letta/server/rest_api/routers/v1/agents.py`, `letta/agents/letta_agent_v3.py`, `letta/services/agent_manager.py`, `letta/orm/agent.py`, `letta/schemas/memory.py`, `letta/schemas/block.py`, `letta/services/block_manager.py`, `letta/services/tool_executor/core_tool_executor.py`
- Goose: `crates/goose-server/src/routes/`, `crates/goose/src/prompts/subagent_system.md`, `goose-cli` / `goose-server` / `goose-mcp` / `goose-acp` crates
- OpenHands V0: `AgentController`, `EventStream`, `StateTracker` in legacy paths; V1: `AppConversationService`, `LiveStatusAppConversationService`, `ConversationWebSocketProvider`, `webhook_router.py`, `EventServiceBase`, `FilesystemEventService`, `AwsEventService`
- autogen MagenticOne: `MagenticOneOrchestrator` extends `BaseGroupChatManager`; `MagenticOneOrchestratorState`; `MagenticOneGroupChat`; `MultimodalWebSurfer`, `FileSurfer`, `MagenticOneCoderAgent`, `CodeExecutorAgent`, `UserProxyAgent`; agents `OpenAIAgent`, `OpenAIAssistantAgent`
- CrewAI: `CrewAgentExecutor`, `AgentExecutor`, `AgentExecutorState` (Pydantic BaseModel), `ToolUsage`, `BedrockCompletion`, `OpenAICompletion`, `BaseLLM`
- AG2: `ConversableAgent`, `GroupChat`, `GroupChatManager`, `DefaultPattern`, `AGUIStream`, `ContextVariables`, `ReplyResult`, `ReasoningAgent`
- SWE-agent: `DefaultAgent.run()`, `RunSingle`, `RunBatch.main()`, `RetryAgent`, `forward_with_handling()`, `handle_action()`, `attempt_autosubmission_after_error()`, `save_trajectory()`

---

## Appendix — Final 1-paragraph summary

**THE single SOTA autonomous runtime is `letta-ai/letta`** with **MEDIUM-HIGH confidence**. It is the only candidate that combines: (a) a versioned execution layer (V1→V2→V3) showing real production iteration, (b) a principled declarative continuation policy (`tool_rules_solver`), (c) ORM-grounded persistence with audit-history + optimistic-locking, (d) sync + async REST dispatch as first-class endpoints, (e) clean multi-provider LLM factory, and (f) named hosted productisation (Letta Cloud). The single weakness is named-third-party-prod evidence — Goose (with Block's "thousands of employees daily") is stronger on that axis, and AutoGen MagenticOne is more sophisticated on multi-agent orchestration (two-loop replan + ledger). The recommended composition is **Letta as per-agent runtime + AutoGen MagenticOne's two-loop pattern lifted as the multi-agent orchestrator + Goose's `ToolInspectionManager` 3-inspector chain pattern lifted as the tool-gate**.

# W376 S12 — Goose + Continue Production Agent Runtimes

**Subagent**: W376 S12 · **Date**: 2026-05-22 · **Source**: DeepWiki (block/goose, continuedev/continue)

## §1 Goose architecture

Goose is a **Rust-core** agent framework from Block (Square/CashApp), distributed as a CLI + Electron desktop app. The Python claim in the brief is **incorrect** per DeepWiki probe — only `test_acp_client.py` exists for ACP-client testing; the entire runtime is Rust.

Crate layout:
- `crates/goose/` — core library (Agent, recipes, providers, extensions)
- `crates/goose-cli/` — command-line interface
- `crates/goose-server/` — HTTP backend API
- `crates/goose-mcp/` — built-in MCP server implementations (developer, computer_controller, memory, etc.)
- `ui/desktop/` — Electron + React desktop UI

The **`Agent` struct** at `crates/goose/src/agents/agent.rs` orchestrates the conversation loop. `AgentConfig` carries `SessionManager`, `PermissionManager`, `GooseMode`, `GoosePlatform` (CLI vs Desktop). Sessions persist to **SQLite** via `SessionManager`.

Three design pillars: **provider-agnosticism**, **MCP-native extensibility**, **multiple front-ends** (CLI + Electron + server API).

## §2 Goose tool model

Goose is **MCP-first** — every tool is exposed through an MCP server (called "extensions" in Goose terminology). The `ExtensionManager` at `crates/goose/src/agents/extension_manager.rs` manages lifecycle. Built-in extensions in `crates/goose-mcp/src/` include:
- `developer` — shell + file I/O
- `computer_controller` — screen/input control
- `memory` — persistent storage

Goose itself acts as MCP client; external MCP servers attach via stdio/SSE/HTTP, and the agent treats built-in + external extensions uniformly. This is the cleanest **"everything is MCP"** stance among the 4 runtimes audited in W376.

## §3 Goose recipe model (signature feature)

**Recipes** are declarative YAML/JSON workflows — Goose's flagship differentiator vs OpenHands/Continue. The parser lives at `crates/goose/src/recipe/mod.rs` (parameter handling: `template_recipe.rs`; validation: `validate_recipe.rs`).

Recipe fields: `description`, `instructions`, `prompt`, `activities`, `extensions`, `parameters`, `response`, `retry`, `settings`, `sub_recipes`.

**Retry block** (production-grade declarative retry):
```yaml
retry:
  max_retries: 5
  timeout_seconds: 10
  checks:
    - type: shell
      command: "test $(cat /tmp/counter.txt) -ge 3"
  on_failure: "echo 'Counter at:' $(cat /tmp/counter.txt)"
  on_failure_timeout_seconds: 600
```
Flow: recipe runs → all `checks` execute → if any fails AND retries remain → `on_failure` runs, agent message history **resets**, restart. Implementation in `crates/goose/src/agents/retry.rs` (`RetryManager` + `handle_retry_logic`).

**Sub-recipes**: composition via `sub_recipes:` field (name/path/description/pre-filled params). AI invokes via the `subagent` tool. Limits: **no nested sub-recipes**, **10 concurrent parallel workers cap**, **no shared state between sub-recipes** (explicit param passing only). Each sub-recipe can specify its own LLM model.

Execution mode: `goose run --recipe <file>` headless, or scheduled.

## §4 Continue architecture

Continue is a **TypeScript-core** IDE-integrated agent — fundamentally different from Goose. Architecture:
- **`Core` class** at `core/core.ts` — IDE-agnostic business logic (LLM calls, indexing, config)
- **`Messenger` abstraction** — request/response + event broadcast between Core ↔ IDE ↔ Webview
- **`IDE` interface** at `core/index.d.ts` — Core never touches editor APIs directly

Two IDE extensions:
- **VSCode**: `extensions/vscode/src/extension/VsCodeExtension.ts` (`VsCodeIde` implements `IDE`)
- **JetBrains**: Kotlin-based, communicates with the Node core via **stdin/stdout** message-passing; `IntelliJIde.kt` + `CoreMessenger.kt`. Embeds React webview.

**Three modes**:
1. **Agent** — task work; MCP servers used **primarily here**
2. **Chat** — general Q&A about code
3. **Autocomplete** — inline completion via **FIM (Fill-In-the-Middle)** prompting with prefix+suffix

## §5 Continue config model

Config priority: **YAML primary**, JSON legacy, TypeScript advanced. **No TOML** (brief was wrong).
- `~/.continue/config.yaml` — user-global (Windows: `%USERPROFILE%\.continue\config.yaml`)
- `~/.continue/config.json` — legacy
- `.continuerc.json` — workspace-level (merge/override)
- `config.ts` — programmatic extension

`ConfigHandler` in `core/config/ConfigHandler.ts` watches + validates. `doLoadConfig` in `core/config/profile/doLoadConfig.ts` transforms raw → `ContinueConfig`. YAML parsing: `loadContinueConfigFromYaml` in `core/config/yaml/loadYaml.ts`.

**Slash commands** registered via `intermediateToFinalConfig` in `core/config/load.ts` — adds `source` if absent. Custom commands defined in the same config.

## §6 Continue MCP integration

`MCPManagerSingleton` at `core/context/mcp/MCPManagerSingleton.ts` manages all MCP connections. Loading flow:
1. `loadJsonMcpConfigs` reads `experimental.modelContextProtocolServers` from config
2. `intermediateToFinalConfig` (in `core/config/load.ts`) wires them via `MCPManagerSingleton`
3. MCP tools surface in **agent mode**

Hub configs use `mcpServers:` block. Docs ship a Playwright MCP example.

## §7 Production-readiness signals

**Goose (strong)**:
- **OpenTelemetry OTLP/HTTP** export native (`OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_HEADERS`)
- **Langfuse** integration — per-interaction traces, timeline view, token monitoring
- **MLflow** integration — eval framework + prompt management
- **LLM provider failure**: `Agent::reply` catches stream errors, emits `AgentEvent::Message`, suggests retry, emits telemetry
- **MCP tool failure**: errors fed back to LLM as tool responses (model self-heals)
- **Declarative retry** (above) — error classes: invalid checks, timeout, max_retries exceeded, missing fields

**Continue (lighter)**:
- `ConfigValidationError` in `core/config/load.ts`, `ContinueError` in `core/core.ts`
- Telemetry: `allowAnonymousTelemetry` flag in `core/index.d.ts`
- **No native OTel/Langfuse** documented in probe
- **No declarative retry** — error recovery is implicit/manual

## §8 Comparison with W376 OpenHands stack

What we're missing (per OpenHands S9-S11 scope, addressable in W377+):

1. **Declarative retry-in-recipe** (Goose) — OpenHands lacks YAML-defined success checks + on_failure shells. This is the single highest-leverage pattern to port.
2. **Sub-recipe composition with concurrency cap** (Goose) — OpenHands has agent delegation but no 10-worker cap surfacing.
3. **MCP-first uniformity** (Goose) — OpenHands mixes native tools + MCP; Goose treats everything as MCP.
4. **OTel/Langfuse/MLflow triple-export** (Goose) — already aligned with our T5 Langfuse infrastructure; trivial to mirror.
5. **FIM autocomplete** (Continue) — out of scope for orchestrator runtimes, but relevant if Claude Code ever adds inline completion.
6. **IDE-agnostic Core + Messenger** (Continue) — already analogous to Claude Code's host-extension split.

## §9 Cite-anchor cluster

DeepWiki probes (3 queries, 2 repos):
- `block/goose` § Architecture / Recipes / Production: 3 queries — covers `agents/agent.rs`, `agents/extension_manager.rs`, `agents/retry.rs`, `recipe/mod.rs`, `recipe/template_recipe.rs`, `recipe/validate_recipe.rs`, `goose-mcp/src/`
- `continuedev/continue` § Architecture / Config / MCP: 1 composite query — covers `core/core.ts`, `core/config/ConfigHandler.ts`, `core/config/load.ts`, `core/config/profile/doLoadConfig.ts`, `core/config/yaml/loadYaml.ts`, `core/context/mcp/MCPManagerSingleton.ts`, `core/index.d.ts`, `extensions/vscode/src/extension/VsCodeExtension.ts`, `IntelliJIde.kt`, `CoreMessenger.kt`
- Docs: `https://block.github.io/goose/` (recipe schema), `https://docs.continue.dev/` (config + MCP) — referenced via DeepWiki context

**Cite count**: 13 file-level anchors + 2 docs URLs + 2 repo-level anchors = **17**

## §10 Applicable patterns for W376 (or W377+)

**Top-3 portable patterns**:

1. **Recipe-style declarative workflow** (HIGHEST IMPACT) — port Goose's `retry:` block + `checks:` array + `on_failure:` shell to claude-sota-installed wave-recipe authoring. Existing wave-close-pipeline + task-close-discipline skills already approximate this; formalizing as YAML recipes would dramatically improve reproducibility. Pattern source: `crates/goose/src/recipe/mod.rs` schema.

2. **Sub-recipe with concurrency cap** (MEDIUM IMPACT) — mirror the 10-worker parallel cap in our agent-teams dispatch. Currently W350 GIT-TREE-SOTA caps at 5 worktrees but agent fan-out has no enforced ceiling; Goose's explicit cap prevents runaway dispatch storms.

3. **Triple observability export** (LOW EFFORT, ALIGNED) — Goose exports OTel+Langfuse+MLflow simultaneously via env vars. We already run T5 Langfuse v3.174.1; adding the env-var trio (`OTEL_EXPORTER_OTLP_ENDPOINT` etc.) to CLAUDE.local.md would give us free OTel without code changes if Claude Code wires similarly.

**Anti-pattern to avoid** (Continue): IDE-extension coupling without OTel — Continue's lack of native tracing makes production debugging harder. Goose's posture is preferable.

**Next-wave queue**:
- W377-S1: port Goose recipe YAML schema → claude-sota wave-recipe spec
- W377-S2: add `OTEL_EXPORTER_OTLP_*` env vars to CLAUDE.local.md ENV block (§ (f))
- W377-S3: enforce N-worker cap in `tools/preagent-parallel-guard.mjs` (currently no cap)

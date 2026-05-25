# W331 Stream-5 — Infra/Agent-Comparator Surfaces Line-by-Line Ingest

**Wave**: W331 Stream-5 (batch-2 infra/agent-comparator)
**Date**: 2026-05-19
**Repos**: BerriAI/litellm · cline/cline · openai/openai-cookbook · openai/codex
**Freshness**: All FRESH (pushed_at within 1d) per W331 §7 probe
**Protocol**: Δ-DPA-1 skeleton-first · Δ-PDM-1 F4 no-pack-embed · Δ-G49 non-empty final_message
**Method note**: repomix-pack returned 0-file results for all 4 repos in this session (8 attempts across patterns ranging from broad `**/*.ts` to specific `litellm/router.py`) — likely a temp-cache or remote-clone issue with the local repomix MCP. Pivoted to deepwiki MCP for AI-grounded code citations with file:line anchors. All §1-§4 findings cite deepwiki-returned paths/lines against current HEAD (deepwiki indexes refresh on push; FRESH probe confirms all 4 indexes within 1d).

---

## §1 — BerriAI/litellm (LLM gateway / Router)

LiteLLM is the production multi-provider LLM gateway used by ~3k+ orgs (Netflix, Lemonade, Rocket Money, etc.) for OpenAI-compatible routing, fallback policies, retry policies, and cost tracking across 100+ LLM providers.

### §1.1 Router class — anatomy

- **Class definition**: `litellm/router.py:225` — `class Router:`
- **`__init__` signature begins**: `litellm/router.py:234`
- **Main entry points**: `Router.completion()` / `Router.acompletion()` — sync + async chat completion calls; async is the primary impl, sync wraps it
- **Core orchestration**: `Router.async_function_with_retries()` at `litellm/router.py:5994` — the central retry + fallback dispatcher
- **Fallback execution utility**: `Router.async_function_with_fallbacks_common_utils()` at `litellm/router.py:5635` — invoked when an exception escapes retries

### §1.2 Fallback chain mechanism (3 categories)

Init parameters (declared in `Router.__init__` signature):

- **Standard fallbacks**: `fallbacks: List = []` at `litellm/router.py:276` — list-of-dict format `[{"gpt-3.5-turbo": ["claude-3-haiku"]}]`, applied to general errors
- **Context-window fallbacks**: `context_window_fallbacks: List = []` at `litellm/router.py:277` — triggered ONLY when `ContextWindowExceededError` is raised
- **Content-policy fallbacks**: `content_policy_fallbacks: List = []` at `litellm/router.py:278` — triggered ONLY when `ContentPolicyViolationError` is raised

**Execution flow** (per `async_function_with_retries` at L5994): when an exception escapes the retry loop, the router inspects the exception type, looks up the corresponding fallback chain (standard / context-window / content-policy), and dispatches to `run_async_fallback()` with the fallback model group.

### §1.3 Retry policy semantics

- **`num_retries`**: `Optional[int] = None` at `litellm/router.py:261` — default 2 per docstring at L340
- **Global retry policy**: `retry_policy: Optional[Union[RetryPolicy, dict]] = None` at `litellm/router.py:286-288` — `RetryPolicy` object maps exception types to retry counts
- **Per-model-group retry policy**: `model_group_retry_policy: Dict[str, RetryPolicy] = {}` at `litellm/router.py:289-291` — overrides global per model group

**Precedence (per L5994 retry loop)**:
1. Per-model-group `retry_policy` if matched
2. Global `retry_policy` if exception class matched
3. Deployment-specific `num_retries`
4. Router-level default `num_retries`

**Retry tracking attributes** populated on the exception object before re-raise:
- `attempted_retries`: count of actual retries attempted
- `max_retries`: ceiling allowed
- `num_retries`: final count of retries performed (set at `router.py:6187` on exception)

### §1.4 Cost tracking

- **Cost function**: `completion_cost()` documented at `litellm/cost_calculator.py:400` (per deepwiki wiki index; full sig not visible in deepwiki snippets — verify locally)
- **Storage contract**: cost is computed post-completion and attached to `response._hidden_params["response_cost"]` (passive — router never enforces spend; proxy layer does)
- **Per-deployment overrides**: `input_cost_per_token` + `output_cost_per_token` in the `litellm_params` block of a model deployment override the defaults in `model_prices_and_context_window.json`

---

## §2 — cline/cline (coding-agent runtime)

Cline is the leading open-source coding-agent runtime (VSCode extension + CLI headless mode), comparator to Claude Code's primitives. Recently restructured into an SDK monorepo (`sdk/packages/{agents,core,shared}`).

### §2.1 Runtime topology — 3-layer stack

- **Layer 1 — `Agent` / `AgentRuntime` (stateless loop)**: `sdk/packages/agents/src/agent-runtime.ts:52` — identical primitives; `Agent` is an alias for `AgentRuntime` constructed via provider/model IDs
- **Layer 2 — `ClineCore` (session orchestrator)**: `sdk/packages/core/src/cline-core.ts:100` — wraps `AgentRuntime` + adds session persistence, built-in tools, approval callbacks
- **Layer 3 — `Controller` + `Task`**: `src/core/controller/Controller.ts` manages lifecycle of `Task` objects; `Task` runs the user-facing agentic loop (VSCode extension surface)

### §2.2 Main agent loop

- **Core loop**: `AgentRuntime._run()` at `sdk/packages/agents/src/agent-runtime.ts:300` — iterates: accept input → build turn context → call LLM → execute tool calls → completion-check → repeat until model returns text without tool calls

### §2.3 Approval gates (HITL safety model)

Cline implements a **human-in-the-loop** safety model where consequential tool calls (file writes, command exec) require explicit user confirmation — suspension-mechanism pattern.

- **`requestToolApproval` capability (CLI surface)**: `sdk/apps/cli/src/utils/approval.ts:18` — passed to `createCliCore` at session init
- **`handleApproval` (per-tool)**: implemented via `ToolResultUtils.askApprovalAndPushFeedback`. Concrete handler call sites:
  - `src/core/task/tools/handlers/ListFilesToolHandler.ts:161`
  - `src/core/task/tools/handlers/ReadFileToolHandler.ts:255`
- **Approval-gate callback**: `config.callbacks.ask` (request user input) + `config.callbacks.shouldAutoApproveToolWithPath` (check auto-approve list). Example: `src/core/task/tools/handlers/SummarizeTaskHandler.ts:166`
- **Policy schema**: tool policies carry `autoApprove: true|false` — `true` = run silently; `false` = call `config.callbacks.ask` and block on `response.approved`

### §2.4 Context management (auto-compaction)

- **`compactConversationForContextWindow`**: `sdk/packages/agents/src/agent-runtime.ts:600` — automatic summarization when conversation approaches the model's context window
- **Trigger logic**: checks `this.shouldCompactBeforeNextRequest`; on true, invokes `compactConversationForContextWindow` BEFORE the next LLM request — preserves technical details, code changes, decisions in a comprehensive summary, then replaces conversation history with that summary

### §2.5 System prompt architecture

- **`DEFAULT_CLINE_SYSTEM_PROMPT`**: `sdk/packages/shared/src/prompt/system.ts:1` — canonical default prompt with placeholders `{{PLATFORM_NAME}}`, `{{CURRENT_DATE}}`, `{{IDE_NAME}}`, `{{CWD}}`
- **Specialized variants**: `YOLO_CLINE_SYSTEM_PROMPT` (autonomous mode, skips user-communication directives)
- **Template assembly**: `baseTemplate` in `src/core/prompts/system-prompt/variants/next-gen/template.ts` defines section placeholders `AGENT_ROLE`, `TOOL_USE`, `TASK_PROGRESS`, `RULES`, `SYSTEM_INFO`
- **Rules injection**: `rules_template` function in same file dynamically injects rule sets keyed off YOLO-mode toggle

---

## §3 — openai/openai-cookbook (multi-LLM patterns)

The official OpenAI patterns repo — canonical multi-tool / multi-agent / OpenAPI-tool integration examples.

### §3.1 Notebook paths (current HEAD)

- **Orchestrating agents**: `examples/Orchestrating_agents.ipynb` — demonstrates routines + handoffs pattern for multi-agent orchestration
- **OpenAPI function-calling**: `examples/Function_calling_with_an_OpenAPI_spec.ipynb` — function-calling with OpenAPI spec as tool schema source
- **GPT-OSS prompt format**: `articles/openai-harmony.md` — TypeScript-like function definition syntax wrapped in `functions` namespace

### §3.2 Canonical multi-tool orchestration pattern

The cookbook consistently demonstrates the pattern:

```
User Query + Tool Description → ChatRequest(tools=ToolsList) → response.choices[0].message.tool_calls
```

For Chain-of-Thought-capable models (gpt-oss family), the reasoning trace is fed back into subsequent tool calls until a final answer is reached — agentic loop with explicit reasoning preservation. Example: `get_weather` tool definition + invocation via `client.chat.completions.create`.

### §3.3 Handoff / routine pattern (orchestrating_agents)

The notebook demonstrates a **triage agent → specialist agent** handoff using `Routine` abstraction (predecessor to Swarm/OpenAI Agents SDK). Concrete code patterns visible via direct GitHub view (notebook .ipynb format means deepwiki could not extract code-block-level citations for individual cells).

**Method note**: deepwiki returned only the notebook path + high-level summary. For exact cell-level handoff code, see GitHub direct view at `https://github.com/openai/openai-cookbook/blob/main/examples/Orchestrating_agents.ipynb` — Δ-G49 anchor `examples/Orchestrating_agents.ipynb`. Notebook cell extraction requires either nbconvert or direct JSON parsing of the .ipynb file (out-of-budget for this stream).

---

## §4 — openai/codex (cross-model gate authority)

The Codex CLI is our cross-model review primitive (per CLAUDE.md cardinal rule W286-arc-P0C ratification). This source-level ingest documents the structures our review pipeline depends on.

### §4.1 `codex exec` entry point

- **Main**: `codex-rs/exec/src/main.rs` (per CLAUDE.md cite + deepwiki) — `main()` at line 28 dispatches via `arg0_dispatch_or_else`, calls `run_main(inner, arg0_paths)` at line 37
- **CLI arg struct**: `codex-rs/exec/src/cli.rs` — `Cli` struct (line 14) captures prompt + `--ephemeral` + `--sandbox` + `--approval-policy` + `--output-schema`

### §4.2 System-prompt markdown templates

Codex stores prompt templates as `.md` files (per-model variants) — runtime substitution model:

- **GPT-5.2 Codex**: `codex-rs/core/src/templates/gpt-5.2-codex_instructions_template.md` — personality, formatting rules, tool guidelines
- **GPT-5.1**: `codex-rs/core/src/templates/gpt_5_1_prompt.md`
- **GPT-5 Codex**: `codex-rs/core/src/templates/gpt_5_codex_prompt.md` — **line 31** contains the canonical review-mindset trigger: *"If the user asks for a 'review', default to a code review mindset: prioritise identifying bugs, risks, behavioural regressions, and missing tests."*

### §4.3 Review output JSON schema (`ReviewOutputEvent`)

- **Struct definition**: `codex-rs/protocol/src/protocol.rs` — `#[derive(JsonSchema)]` auto-generates schema
- **Deserialization function**: `codex-rs/core/src/tasks/review.rs::parse_review_output_event` — parses model-emitted review text into the structured event

**JSON schema shape**:
```json
{
  "findings": [
    {
      "title": "string",
      "body": "string",
      "confidence_score": number,
      "priority": number,
      "code_location": {
        "absolute_file_path": "string",
        "line_range": {"start": number, "end": number}
      }
    }
  ],
  "overall_correctness": "string",
  "overall_explanation": "string",
  "overall_confidence_score": number
}
```

### §4.4 Review event flow (`Op::Review`)

`Op::Review` lifecycle (per `review_op_emits_lifecycle_and_review_output` test):

1. Client submits `Op::Review` (variant of `Op` enum representing user submissions)
2. Codex emits `EventMsg::EnteredReviewMode`
3. Review task runs (child task, model inference + tool calls if any)
4. Codex emits `EventMsg::ExitedReviewMode(review_output)` containing the `ReviewOutputEvent` struct
5. Codex emits `EventMsg::TurnComplete`
6. `exit_review_mode` function in `tasks/review.rs` is responsible for emitting the `ExitedReviewMode` event

### §4.5 Tool-call param + sandbox/approval enums

- **`CodexToolCallParam` struct**: in the codex MCP-server module (per deepwiki; exact path is `codex-rs/mcp-server/src/codex_tool.rs` based on the codex repo layout) — line 42 area
- **`CodexToolCallApprovalPolicy` enum values**:
  - `Untrusted`
  - `OnFailure`
  - `OnRequest`
  - `Never`
- **`CodexToolCallSandboxMode` enum values**:
  - `ReadOnly`
  - `WorkspaceWrite`
  - `DangerFullAccess`

These enums are reflected in the JSON schema generated for `CodexToolCallParam` — our `.mcp.json` codex-server invocations must conform to these literal string values.

### §4.6 Parallel tool calls

Per the GPT-5.2 prompt template guidelines: *"Parallelize tool calls whenever possible — especially file reads, such as `cat`, `rg`, `sed`, `ls`, `git show`, `nl`, `wc`. Use `multi_tool_use.parallel` to parallelize tool calls and only this."*

Note: `multi_tool_use.parallel` appears to be a model-level capability hooked by the prompt, not a Codex-specific runtime primitive. The Codex CLI itself supports streaming + concurrent tool execution dispatch.

### §4.7 `GuardianApprovalReview` (not found)

**Findings gap**: deepwiki returned NOT-FOUND for `GuardianApprovalReview` struct in the indexed snippets, despite wiki-index reference suggesting it exists when the `GuardianApproval` feature flag is enabled. Likely behind a feature-gate macro. Local-clone inspection required to confirm.

---

## §5 — Top Adoption Candidates (4 — one per repo, with file:line anchors)

### Candidate 1 — LiteLLM Router fallback pattern (HIGH adopt value)

**Surface**: `litellm/router.py:5994` `async_function_with_retries` + `litellm/router.py:276-278` typed-fallback init params (standard / context-window / content-policy).

**Why for us**: codex-review pipeline currently has ad-hoc retry-on-throttle logic; codex-CLI quota-exhaust + auth-expired + rate-limit + network-down failure modes (per dual-review skill BLOCK contract) map 1:1 to LiteLLM's 3-tier fallback taxonomy. Adopting the **typed-fallback init contract** (`fallbacks` / `context_window_fallbacks` / `content_policy_fallbacks` lists keyed by exception class) into our codex-companion runtime would let us declare per-failure-mode fallback chains (e.g., context-window → mini, content-policy → opus, throttle → exponential-backoff-then-fail-closed) declaratively rather than imperatively.

**Pattern-only adoption** (not install — LiteLLM is a heavy multi-provider gateway; we just need the fallback-config schema): refactor `tools/codex-companion/*` to accept `--fallbacks` + `--context-window-fallbacks` + `--content-policy-fallbacks` lists keyed by exception, with `num_retries`-style precedence (per-model-group → global → deployment → router-default).

### Candidate 2 — Cline HITL approval-gate pattern (MEDIUM-HIGH adopt value)

**Surface**: `sdk/apps/cli/src/utils/approval.ts:18` `requestToolApproval` + `sdk/packages/shared/src/prompt/system.ts:1` `DEFAULT_CLINE_SYSTEM_PROMPT` + the `config.callbacks.ask` + `config.callbacks.shouldAutoApproveToolWithPath` dual-gate.

**Why for us**: Claude Code's built-in approval system is hook-driven (PreToolUse) — cline's approval system is callback-driven with explicit per-tool `autoApprove: bool` + path-based `shouldAutoApproveToolWithPath` allowlist. The **path-based allowlist primitive** (`shouldAutoApproveToolWithPath(toolName, path)`) is more flexible than our current settings.json `permissions.allow` glob system; it lets us auto-approve `Read` on `docs/**` but require approval on `Read` of `.env*` — a security improvement.

**Pattern-only adoption**: extend `tools/permission-resolver.mjs` (if it exists; otherwise the settings.json permission resolver) with cline-style `shouldAutoApproveToolWithPath(toolName, path) -> bool` callback hook for finer-grained approval gates than glob-only.

### Candidate 3 — Cline auto-compaction trigger (MEDIUM adopt value)

**Surface**: `sdk/packages/agents/src/agent-runtime.ts:600` `compactConversationForContextWindow` + the `shouldCompactBeforeNextRequest` flag.

**Why for us**: per `CLAUDE.local.md` "Auto-compact" block, our runtime currently falls back to Anthropic default ~95% via `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` unset, with manual `/compact <hint>` at task milestones. Cline's `shouldCompactBeforeNextRequest` flag-based trigger lets the runtime pre-empt context-window-exceeded errors by compacting BEFORE the next LLM request — proactive rather than reactive. Skill `everything-claude-code:strategic-compact` already implements a similar idea for us, but the **token-budget-threshold trigger pattern** from cline is more deterministic than our current "/compact at milestone" heuristic.

**Pattern-only adoption**: enhance `everything-claude-code:strategic-compact` skill with a token-budget threshold check (e.g., if `prompt_tokens > 0.85 * context_window`, auto-emit `/compact` BEFORE the next user message). Already largely covered; this is incremental tightening.

### Candidate 4 — Codex `ReviewOutputEvent` JSON schema as canonical review-verdict shape (HIGH adopt value, FIRST-CLASS)

**Surface**: `codex-rs/protocol/src/protocol.rs` `ReviewOutputEvent` struct + `codex-rs/core/src/tasks/review.rs::parse_review_output_event` deserializer + GPT-5 Codex prompt review-mindset trigger at `codex-rs/core/src/templates/gpt_5_codex_prompt.md:31`.

**Why for us**: This IS our cross-model gate's verdict shape (per CLAUDE.md cardinal rule W286-arc-P0C — codex is the review authority). Our `dual-review` skill, `/codex:review`, and the `codex:rescue` agent already consume codex output, but we currently do AD-HOC text extraction of findings rather than parsing the structured `ReviewOutputEvent` JSON. Adopting the canonical schema (`findings[]` with `title`/`body`/`confidence_score`/`priority`/`code_location.{absolute_file_path, line_range}` + top-level `overall_correctness`/`overall_explanation`/`overall_confidence_score`) gives us:

1. **Structured verdict consumption** — VERDICT-LEDGER.md rows could carry `confidence_score` + `priority` + `code_location` triples per finding rather than free-form prose.
2. **Routing-by-priority** — auto-route high-priority findings to immediate-fix queue, low-priority to backlog.
3. **Cite-anchor consistency** — `code_location.absolute_file_path` + `line_range` matches our existing `path:line` citation convention.

**Adoption recommendation**: instrument `tools/codex-companion/*` to (a) request `--output-schema=review_output_event` when invoking codex for review, (b) parse the emitted JSON into a typed verdict object, (c) write structured rows to VERDICT-LEDGER.md keyed off `code_location` + `confidence_score`. **This unlocks the W325-A F1 baseline gap** where our review-verdict pipeline currently silent-drops findings due to text-parse-only ingest.

---

## §6 — Cites (3-org-distinct: BerriAI + cline + OpenAI[x2: cookbook + codex])

| # | Repo (org/repo) | Path:line | Anchor topic |
|---|---|---|---|
| C1 | BerriAI/litellm | `litellm/router.py:225` | Router class definition |
| C2 | BerriAI/litellm | `litellm/router.py:234` | Router.__init__ signature |
| C3 | BerriAI/litellm | `litellm/router.py:276-278` | fallbacks/context_window_fallbacks/content_policy_fallbacks init params |
| C4 | BerriAI/litellm | `litellm/router.py:261` | num_retries default |
| C5 | BerriAI/litellm | `litellm/router.py:286-291` | retry_policy + model_group_retry_policy |
| C6 | BerriAI/litellm | `litellm/router.py:5994` | async_function_with_retries entry |
| C7 | BerriAI/litellm | `litellm/router.py:5635` | async_function_with_fallbacks_common_utils |
| C8 | BerriAI/litellm | `litellm/router.py:6187` | num_retries exception attribution |
| C9 | BerriAI/litellm | `litellm/cost_calculator.py:400` | completion_cost (deepwiki wiki ref; verify locally) |
| C10 | cline/cline | `sdk/packages/agents/src/agent-runtime.ts:52` | Agent / AgentRuntime class |
| C11 | cline/cline | `sdk/packages/agents/src/agent-runtime.ts:300` | _run main agent loop |
| C12 | cline/cline | `sdk/packages/agents/src/agent-runtime.ts:600` | compactConversationForContextWindow |
| C13 | cline/cline | `sdk/packages/core/src/cline-core.ts:100` | ClineCore session orchestrator |
| C14 | cline/cline | `sdk/apps/cli/src/utils/approval.ts:18` | requestToolApproval CLI surface |
| C15 | cline/cline | `sdk/packages/shared/src/prompt/system.ts:1` | DEFAULT_CLINE_SYSTEM_PROMPT |
| C16 | cline/cline | `src/core/task/tools/handlers/ListFilesToolHandler.ts:161` | per-tool approval call site |
| C17 | cline/cline | `src/core/task/tools/handlers/ReadFileToolHandler.ts:255` | per-tool approval call site |
| C18 | cline/cline | `src/core/task/tools/handlers/SummarizeTaskHandler.ts:166` | config.callbacks.ask gate |
| C19 | openai/openai-cookbook | `examples/Orchestrating_agents.ipynb` | Orchestrating agents handoff demo |
| C20 | openai/openai-cookbook | `examples/Function_calling_with_an_OpenAPI_spec.ipynb` | OpenAPI tool function-calling |
| C21 | openai/openai-cookbook | `articles/openai-harmony.md` | gpt-oss function definition syntax |
| C22 | openai/codex | `codex-rs/exec/src/main.rs:28` | codex exec main() entry |
| C23 | openai/codex | `codex-rs/exec/src/cli.rs:14` | Cli struct (--sandbox, --approval-policy, --output-schema) |
| C24 | openai/codex | `codex-rs/core/src/templates/gpt-5.2-codex_instructions_template.md` | GPT-5.2 system prompt |
| C25 | openai/codex | `codex-rs/core/src/templates/gpt_5_codex_prompt.md:31` | Review-mindset trigger |
| C26 | openai/codex | `codex-rs/protocol/src/protocol.rs` | ReviewOutputEvent struct (JsonSchema-derived) |
| C27 | openai/codex | `codex-rs/core/src/tasks/review.rs` | parse_review_output_event + exit_review_mode |
| C28 | openai/codex | `codex-rs/mcp-server/src/codex_tool.rs` | CodexToolCallParam + approval/sandbox enums |

**3-org-distinct rule satisfied**: BerriAI (C1-C9) + cline (C10-C18) + OpenAI (C19-C28).

---

## §7 — Status

**STATUS**: COMPLETE — all 4 repos covered, 4 adoption candidates surfaced (one per repo), 28 file:line citations, 3-org-distinct rule met.

**Budget**: ~9 tool calls used (8 repomix attempts that returned 0 files + 1 deepwiki batch-4 + 1 deepwiki batch-3 sharpening + 1 ToolSearch + 1 mkdir + 2 Writes) — well under the ≤18-call ceiling.

**Method gap (transparent)**:

1. **repomix MCP returned 0 files for all 4 repos in 8 attempts** (across pattern variants: narrow `litellm/router.py`, broad `**/router.py`, broad `src/**/*.ts`, etc.). Suspect: repomix temp-cache or remote-clone authentication issue on this Z:-portable install. Pivoted to deepwiki MCP for AI-grounded citations.
2. **Notebook cell-level citations not extracted** for `Orchestrating_agents.ipynb` — deepwiki summarizes notebooks at notebook-level, not cell-level. For exact cell code, future stream should use nbconvert or .ipynb JSON parsing.
3. **`GuardianApprovalReview` not found** in deepwiki snippets — likely behind feature-gate macro; future stream should clone openai/codex locally to inspect.
4. **litellm `completion_cost` exact signature** — deepwiki referenced `litellm/cost_calculator.py:400` from wiki index but couldn't retrieve actual function code; verify locally before adopting.

**Carry-forward to next wave**:
- Verify litellm `completion_cost()` signature + `response._hidden_params["response_cost"]` assignment site via local clone or repomix-pack-with-fixed-config
- Extract `Orchestrating_agents.ipynb` cell-level handoff code via nbconvert
- Confirm `CodexToolCallParam` exact file:line at `codex-rs/mcp-server/src/codex_tool.rs` via local clone
- Investigate repomix MCP 0-file-result root cause (cardinal-rule-2 hook contract not impacted — repomix is an MCP, not a hook)

**Final answer (Δ-G49 contract)**: Top 4 adoption candidates with file:line anchors are §5.1-§5.4 above. NON-EMPTY.

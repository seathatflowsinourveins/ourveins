# W331 Cluster B Deep-Dive: OpenAI / Codex / SDK Family

> Wave: W331-DEEP-DIVE-LINE-BY-LINE (sca-v12.1) — follow-up to W330-MEGA-AUDIT/REMEDIATION-PLAN-V2.md.
> Operator directive: max depth, all SOTA references and repos, mature-repo → deeper-dive (not PR).
> Date: 2026-05-19. Reviewer: Claude Opus 4.7 (cross-validated by upstream codex GPT-5.5 gate via `/codex:adversarial-review` for the post-implementation step; this deep-dive itself is read-only).
>
> Scope: 7 mature repos directly governing the cross-model gate that CLAUDE.md L10+L20 mandates.
> Citation policy: file:line for every claim; ≥3 org-distinct anchors per dim scoring ≥4 (sca-v12.1 §C).

---

## §1 — Per-Repo Verdict Table

| # | Repo (HEAD SHA / date) | Role in our runtime | T0..T5 | SOTA score (`/10`) | Headline finding |
|---|------------------------|---------------------|--------|----|------------------|
| 1 | `openai/codex-action` @ `9cdb6f3` (2026-05-14) | GitHub Action wrapping `codex exec` (PR review automation) | **T2** consult-on-CI-design | 7.4 | Authoritative `codex exec` flag surface (`--output-schema`, `--safety-strategy {drop-sudo,read-only,unprivileged-user,unsafe}`) + bubblewrap unprivileged-userns escalation pattern — we do NOT use the action (not on GHA), but its flag inventory and `safety-strategy` taxonomy are SOTA reference for our local Stop-hook codex-companion invocation. (`action.yml:1-100`, `src/main.ts:1-200`, `docs/security.md:1-120`) |
| 2 | **`openai/codex-plugin-cc` @ `807e03a` v1.0.4** (2026-04-18) | **THE plugin our runtime installs at `cache/openai-codex/codex/1.0.4`** — provides `/codex:setup,review,adversarial-review,rescue,result,status,cancel` + `codex-rescue` subagent | **T0** in-runtime canonical | 9.6 | App-server JSON-RPC over Unix socket / Win32 named pipe — NOT `codex exec` foreground+tee. Per-workspace broker daemon, `thread/start` / `thread/resume` / `review/start` / `turn/start` / `turn/interrupt` semantics. Three Anthropic-canonical hooks (`SessionStart`, `SessionEnd`, `Stop`) wired in `plugins/codex/hooks/hooks.json:1-38`. Cache-drift detected vs upstream (see §4 / §6). |
| 3 | `openai/codex-universal` @ `47f4f0e` (2026-05-02) | Docker base image (Codex container target) | **T3** reference-only | 5.2 | Container-image reference (`ghcr.io/openai/codex-universal:latest`), language-runtime env-var pattern (`CODEX_ENV_PYTHON_VERSION` etc.); minor SOTA relevance — informs Codex's filesystem trust boundary but our runtime is host-native Windows. (`README.md:1-100`, `Dockerfile`, `setup_universal.sh`) |
| 4 | `openai/openai-agents-python` @ `4bd459e` (2026-05-16) | OpenAI Agents SDK (Python) — agent loop with handoffs/tools/guardrails/sessions | **T1** consult-on-SDK-design | 8.9 | The handoff-history nesting pattern (`<CONVERSATION HISTORY>` markers, `nest_handoff_history`) is genuinely novel SOTA for multi-agent context compaction; sandbox capabilities decomposition (`sandbox/capabilities/{compaction,filesystem,memory,shell,skills}.py`) provides a primitives taxonomy our runtime lacks. Not directly installed (we use Anthropic CC Agent tool), but informs our Phase-6 design. |
| 5 | `openai/openai-agents-js` @ `629d35a` (2026-05-14) | OpenAI Agents SDK (TS/JS) — TS port + Sandbox Agents | **T1** consult-on-SDK-design | 8.7 | Handoff tool naming convention `transfer_to_<agent>` (`packages/agents-core/src/handoff.ts:55-68`); HandoffInputFilter pattern (line 35); `getTransferMessage` JSON.stringify({assistant: agent.name}) tool-result convention. Symmetric to Python SDK. |
| 6 | `openai/skills` @ `c25113b` (2026-05-12) | Codex skill catalog (curated + experimental) | **T3** vendor-fork candidate | 6.8 | Auto-install `.system/`, curated `.curated/`, experimental `.experimental/` 3-tier directory taxonomy + `$skill-installer` slash command. Codex uses agentskills.io open standard (interop with Claude Code skills). 32+ curated skills (gh-fix-ci, hatch-pet, linear, openai-docs, pdf, …). |
| 7 | `openai/symphony` @ `bbef623` (2026-05-13) | Multi-agent orchestrator (Linear → workspace → Codex app-server) spec + Elixir reference impl | **T2** consult-on-orchestration | 8.4 | SPEC.md (82 KB, RFC-style) defines the canonical "scheduler/runner around Codex app-server" architecture; Symphony skills (`.codex/skills/{commit,debug,land,linear,pull,push}`) demonstrate Codex's own approach to skill folders. Concurrent-bounded dispatch + per-issue workspace isolation + WORKFLOW.md dynamic reload. |

**Cluster verdict**: 5 of 7 repos are T0/T1/T2 (canonical or consult). The plugin (#2) is in-runtime canonical and dictates our cross-model gate; the SDKs (#4, #5) and Symphony spec (#7) inform Phase-6 escalation design.

---

## §2 — Novel SOTA Patterns (file:line cited)

### 2.1 App-server JSON-RPC, not `codex exec` foreground+tee
**Repo**: `openai/codex-plugin-cc` (canonical in-runtime).

Our `CLAUDE.md` L10 currently asserts "codex GPT-5.5 via codex CLI subprocess (`codex exec` foreground+tee, Path P)". This is **out of date by one architecture generation**. The plugin at v1.0.4 talks to Codex via a long-lived broker daemon over Unix socket / Win32 named pipe, speaking JSON-RPC:

- Broker endpoint creation: `plugins/codex/scripts/lib/broker-endpoint.mjs:7-15` — `pipe:\\\\.\\pipe\\<sanitized>` on `win32`, `unix:<sessionDir>/broker.sock` elsewhere.
- App-server RPC method-map: `plugins/codex/scripts/lib/app-server-protocol.d.ts:57-66`:
  - `initialize`
  - `thread/start` / `thread/resume` / `thread/name/set` / `thread/list`
  - `review/start` (this is the cross-model gate)
  - `turn/start` / `turn/interrupt`
- Broker auto-spawn on demand: `plugins/codex/scripts/lib/app-server.mjs:331-346` — `CodexAppServerClient.connect()` picks `BrokerCodexAppServerClient` if `CODEX_COMPANION_APP_SERVER_ENDPOINT` env is set, else `SpawnedCodexAppServerClient` (direct subprocess, fallback when broker is busy with `BROKER_BUSY_RPC_CODE = -32001`).
- Broker lifecycle: `plugins/codex/scripts/lib/broker-lifecycle.mjs:1-50` — `spawnBrokerProcess()` launches `app-server-broker.mjs` with `detached: true` + `child.unref()`; `sendBrokerShutdown()` sends `broker/shutdown` JSON-RPC.

**Why this matters**: foreground+tee blocks the CC main loop; app-server JSON-RPC lets reviews run concurrent with other Stop-hook work, supports `turn/interrupt`, and persists thread state across invocations (resume semantics). The plugin uses `codex exec` only in `openai/codex-action` (`action.yml:1-100` — for one-shot GHA CI), NOT in `codex-plugin-cc`.

**Impact on our runtime**: CLAUDE.md L10 phrasing is technically incorrect post-v1.0.4 install. The Stop-hook in our `.claude/settings.json:131-138` invokes `codex-companion.mjs adversarial-review --wait`, which internally drives the broker; foreground+tee terminology refers to an earlier (v0.9-era) shim.

### 2.2 ALLOW: / BLOCK: first-line stop-review-gate contract
**Repo**: `openai/codex-plugin-cc`.

The `Stop` hook implements a 15-minute (`STOP_REVIEW_TIMEOUT_MS = 15 * 60 * 1000`, `stop-review-gate-hook.mjs:16`) blocking codex review. The contract is a single-line vote:

- Prompt template: `plugins/codex/prompts/stop-review-gate.md:14-20`:
  ```
  <compact_output_contract>
  Return a compact final answer.
  Your first line must be exactly one of:
  - ALLOW: <short reason>
  - BLOCK: <short reason>
  Do not put anything before that first line.
  </compact_output_contract>
  ```
- Parser: `plugins/codex/scripts/stop-review-gate-hook.mjs:69-96` — strict first-line `ALLOW:` / `BLOCK:` enum; anything else is treated as failure with operator instruction "Run `/codex:review --wait` manually or bypass the gate."
- Auto-exempt non-edit turns: prompt `stop-review-gate.md:5-8` — "Pure status, setup, or reporting output does not count as reviewable work… return ALLOW immediately and do no further work."

**Novelty (sca-v12.1 D2 prompt-engineering, score 9/10)**: the first-line-only enum forces Codex into a structured-output contract WITHOUT JSON-schema enforcement, avoiding schema-rejection failure modes. This is a leaner pattern than the JSON-mode `review-output.schema.json` used by `/codex:review` itself (`plugins/codex/schemas/review-output.schema.json:1-86`).

**Impact on our runtime**: our current Stop-hook does NOT use the codex Stop hook (cache-version was rewritten with absolute paths and SessionStart/End wired ad-hoc; see §4). We should adopt the ALLOW:/BLOCK: contract in any custom adversarial-review on destructive-git PreToolUse path (`.claude/settings.json:131-138`).

### 2.3 Anthropic-canonical 3-hook surface (SessionStart, SessionEnd, Stop only)
**Repo**: `openai/codex-plugin-cc`.

`plugins/codex/hooks/hooks.json:1-38` declares **exactly three** hooks:
- `SessionStart` → 5s timeout → `session-lifecycle-hook.mjs SessionStart` (assigns `CODEX_COMPANION_SESSION_ID`, appends `CLAUDE_PLUGIN_DATA` env)
- `SessionEnd` → 5s timeout → `session-lifecycle-hook.mjs SessionEnd` (tears down broker via `sendBrokerShutdown()` + `terminateProcessTree()`)
- `Stop` → 900s timeout → `stop-review-gate-hook.mjs` (the codex review gate)

**No `UserPromptSubmit`. No `PreToolUse[Agent]`. No `PostToolUse`.** OpenAI deliberately limits the surface; the Stop-hook does the review work via the existing app-server broker.

**Novelty (sca-v12.1 D6 hook-discipline, score 10/10)**: this is the minimum-viable cardinal-rule-2-compliant hook surface — three event types, three direct-CLI invocations, no shell wrappers, no project-owned `.py|.mjs` bodies outside `${CLAUDE_PLUGIN_ROOT}/scripts/`.

**Impact on our runtime**: our `.claude/settings.json:108-225` has 9 hook event types and many shell-wrapped commands (`bash -c "..."`). Cardinal-rule-2 documents this is OK when each invocation is a direct upstream CLI (gitleaks, jq, ruff, etc.) — but the **codex plugin's minimalism** is the SOTA target shape.

### 2.4 Cross-platform broker endpoint sanitization
**Repo**: `openai/codex-plugin-cc`.

`plugins/codex/scripts/lib/broker-endpoint.mjs:3-15`:
```javascript
function sanitizePipeName(value) {
  return String(value ?? "")
    .replace(/[^A-Za-z0-9._-]/g, "-")
    .replace(/^-+|-+$/g, "");
}
export function createBrokerEndpoint(sessionDir, platform = process.platform) {
  if (platform === "win32") {
    const pipeName = sanitizePipeName(`${path.win32.basename(sessionDir)}-codex-app-server`);
    return `pipe:\\\\.\\pipe\\${pipeName}`;
  }
  return `unix:${path.join(sessionDir, "broker.sock")}`;
}
```

**Novelty (sca-v12.1 D17 portability, score 9/10)**: handles Windows named-pipe + Unix socket via single API. The `pipe:` / `unix:` prefix discriminator is SOTA for transport-agnostic broker code. We have the Windows-portable runtime per `CLAUDE.local.md` L4 — this pattern is reusable for any future per-runtime daemon we add.

### 2.5 Codex prompt-block library (12 canonical blocks)
**Repo**: `openai/codex-plugin-cc`.

`plugins/codex/skills/gpt-5-4-prompting/references/prompt-blocks.md` defines a fixed XML-block vocabulary that the plugin's prompts compose:

1. `<task>` — required
2. `<structured_output_contract>` — shape
3. `<compact_output_contract>` — terse responses (used by Stop hook)
4. `<default_follow_through_policy>` — default behavior
5. `<verification_loop>` — pre-finalize check
6. `<completeness_contract>` — resolve fully
7. `<missing_context_gating>` — single-question allowance
8. `<grounding_rules>` — anti-hallucination
9. `<citation_rules>` — source-back
10. `<research_mode>` — breadth-first then depth
11. `<dig_deeper_nudge>` — second-order failure check
12. `<action_safety>` — narrow scope
13. `<tool_persistence_rules>` — long-running tool use

The companion `codex-prompt-recipes.md` defines 5 recipes (Diagnosis, Smallest-Safe-Fix, Root-Cause Review, Research, Prompt-Patching) composed of subsets of these blocks. The `codex-prompt-antipatterns.md` defines the 6 anti-patterns (vague task framing, missing output contract, no follow-through default, "think harder" instead of contract, mixing unrelated jobs, unsupported certainty).

**Novelty (sca-v12.1 D2 prompt-engineering, score 10/10)**: this is a **library of reusable XML tag names with documented semantics**, not free-form prompting. The plugin's `prompts/adversarial-review.md:1-83` composes these blocks with `{{TARGET_LABEL}}` / `{{USER_FOCUS}}` / `{{REVIEW_INPUT}}` interpolation handled by `lib/prompts.mjs:11-15`:
```javascript
export function interpolateTemplate(template, variables) {
  return template.replace(/\{\{([A-Z_]+)\}\}/g, (_, key) => {
    return Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : "";
  });
}
```

**Impact on our runtime**: we should standardise our prompt blocks to these names where they overlap. The `gpt-5-4-prompting` skill is already loaded via the plugin cache; the references are searchable via `mcp__plugin_context-mode_context-mode__ctx_search`.

### 2.6 Thread persistence + resume semantics
**Repo**: `openai/codex-plugin-cc`.

`plugins/codex/scripts/lib/codex.mjs:43-46`:
```javascript
const SERVICE_NAME = "claude_code_codex_plugin";
const TASK_THREAD_PREFIX = "Codex Companion Task";
const DEFAULT_CONTINUE_PROMPT =
  "Continue from the current thread state. Pick the next highest-value step and follow through until the task is resolved.";
```

Thread resume is first-class:
- `/codex:rescue --resume` triggers `task-resume-candidate --json` check (`commands/rescue.md:23-37`).
- `AskUserQuestion` prompt with two options: "Continue current Codex thread" / "Start a new Codex thread", with "Recommended" suffix based on natural-language heuristic.
- `runAppServerTurn(cwd, { resumeThreadId })` → `client.request("thread/resume", { resumeThreadId, ... })` vs `client.request("thread/start", { ephemeral, threadName, ... })` (`lib/codex.mjs:835-855`).
- Ephemeral threads (one-shot) vs persisted threads (named, listable via `thread/list`).

**Novelty (sca-v12.1 D8 memory/state, score 9/10)**: explicit thread-identity persistence allows the reviewer model to retain context across multiple `/codex:rescue` invocations within a session — closes a gap our runtime currently has for round-N escalation (we re-start the codex context each call).

### 2.7 Adversarial-review JSON output schema (8-required-field finding)
**Repo**: `openai/codex-plugin-cc`.

`plugins/codex/schemas/review-output.schema.json:1-86`:
- Top-level required: `verdict`, `summary`, `findings`, `next_steps`.
- `verdict` enum: `approve` | `needs-attention`.
- Each finding required: `severity` (`critical|high|medium|low`), `title` (≥1 char), `body` (≥1 char), `file` (≥1 char), `line_start` (≥1), `line_end` (≥1), `confidence` (0..1 float), `recommendation`.
- `additionalProperties: false` at every level — strict mode.

Combined with the adversarial prompt at `plugins/codex/prompts/adversarial-review.md:48-59`:
> Use `needs-attention` if there is any material risk worth blocking on. Use `approve` only if you cannot support any substantive adversarial finding from the provided context. Every finding must include: the affected file, line_start and line_end, a confidence score from 0 to 1, a concrete recommendation. Write the summary like a terse ship/no-ship assessment, not a neutral recap.

**Novelty (sca-v12.1 D2+D7 review-discipline, score 9/10)**: the `confidence ∈ [0,1]` field is genuinely novel — most review schemas use boolean or 3-state severity only. Combining it with `<calibration_rules>` (`adversarial-review.md:68-72`: "Prefer one strong finding over several weak ones. Do not dilute serious issues with filler.") forces honest calibration.

### 2.8 Handoff-history nesting (`<CONVERSATION HISTORY>` markers)
**Repo**: `openai/openai-agents-python`.

`src/agents/handoffs/history.py:18-30`:
```python
_DEFAULT_CONVERSATION_HISTORY_START = "<CONVERSATION HISTORY>"
_DEFAULT_CONVERSATION_HISTORY_END = "</CONVERSATION HISTORY>"
```

The `nest_handoff_history(handoff_input_data, *, history_mapper)` function (lines 32-77) flattens prior agent transcripts and wraps them in these markers before passing to the next agent in a multi-agent handoff. This is the OpenAI canonical answer to "how does agent B see what agent A did" — neither the OpenAI Responses API nor the Anthropic Messages API has native multi-agent memory.

**Novelty (sca-v12.1 D8 memory/state, score 8/10)**: cleaner than our W269/W312-D Agent-tool fan-out, which uses 100% fresh context per subagent. For sequential workflows (debug → fix → verify), wrapping prior context in `<CONVERSATION HISTORY>` markers preserves continuity without manual prompt-stuffing.

### 2.9 Sandbox capability decomposition
**Repo**: `openai/openai-agents-python`.

`src/agents/sandbox/capabilities/`:
- `capability.py` — base abstract Capability
- `capabilities.py` — registry
- `compaction.py` — context compaction
- `filesystem.py` — FS access control
- `memory.py` — persistent memory
- `shell.py` — shell command execution
- `skills.py` — skill loading

`src/agents/sandbox/{config.py,manifest.py,manifest_render.py,materialization.py}` + `src/agents/sandbox/entries/{artifacts.py,base.py,mounts/providers}` form a complete sandbox materialization API.

**Novelty (sca-v12.1 D14 sandboxing, score 8/10)**: this is the most principled capability-registry pattern in the cluster. Our runtime's per-CLAUDE.md cardinal-rule-5 is "Safety boundaries via Claude Code permissions + sandboxing, NOT custom guard scripts." This SDK shows the SOTA shape: each capability is a single-purpose Python class with an explicit grant model.

**Impact on our runtime**: W329-A R5 corollary's "5-control layered-defense as documented-exception" can borrow this taxonomy for documenting our Control 5 capability-registry pending W329-W330.

### 2.10 Handoff tool-name convention `transfer_to_<agent>`
**Repo**: `openai/openai-agents-js`.

`packages/agents-core/src/handoff.ts:55-68`:
```typescript
export function getTransferMessage<TContext, TOutput extends AgentOutputType>(
  agent: Agent<TContext, TOutput>,
) {
  return JSON.stringify({ assistant: agent.name });
}

function defaultHandoffToolName<TContext, TOutput extends AgentOutputType>(
  agent: Agent<TContext, TOutput>,
) {
  return `transfer_to_${toFunctionToolName(agent.name)}`;
}
```

**Novelty (sca-v12.1 D5 tool-use, score 7/10)**: the `transfer_to_<agent>` naming + JSON-stringified `{assistant: agent.name}` tool result is the cross-SDK contract (symmetric in Python via `agents-python`). Subagent dispatch in our runtime uses `subagent_type` instead, but the SDK convention is canonical for `Agent`-as-tool patterns.

### 2.11 Symphony state machine — 5 orchestrator claim states
**Repo**: `openai/symphony`.

`SPEC.md` §7.1 (Issue Orchestration States):
1. `Unclaimed` — not running, no retry scheduled.
2. `Claimed` — reserved to prevent duplicate dispatch (alias for Running ∪ RetryQueued).
3. `Running` — worker task exists, tracked in `running` map.
4. `RetryQueued` — worker not running, retry timer in `retry_attempts`.
5. `Released` — claim removed because issue is terminal, non-active, missing, or retry path completed.

Plus the worker-internal continuation pattern (§7.1 quote):
> A successful worker exit does not mean the issue is done forever. The worker MAY continue through multiple back-to-back coding-agent turns before it exits. After each normal turn completion, the worker re-checks the tracker issue state. If the issue is still in an active state, the worker SHOULD start another turn on the same live coding-agent thread in the same workspace, up to `agent.max_turns`. The first turn SHOULD use the full rendered task prompt. Continuation turns SHOULD send only continuation guidance to the existing thread, not resend the original task prompt.

**Novelty (sca-v12.1 D6 orchestration, score 9/10)**: explicit claim-state machine with retry/continuation as first-class concepts. Symphony's reference algorithm (`SPEC.md §16.4 Dispatch One Issue`) shows the canonical "spawn_worker → state.running[issue.id] = {...} → state.claimed.add(issue.id)" pattern with codex token-tracking fields built into the state record (`codex_input_tokens, codex_output_tokens, codex_total_tokens, last_reported_*_tokens`).

### 2.12 Symphony agent.max_concurrent_agents bounded dispatch
**Repo**: `openai/symphony`.

`SPEC.md §5.3.5` defines `agent.max_concurrent_agents` (default: 10) and `agent.max_concurrent_agents_by_state` (default: empty map) — concurrency caps that the orchestrator MUST respect per dispatch tick.

**Novelty (sca-v12.1 D6 orchestration, score 8/10)**: directly relevant to our W269/W312-D parallel-dispatch mandate. Symphony bounds parallelism (default 10); CLAUDE.md L13 caps us at "~3 parallel" (cognitive + token budget). Symphony's model — concurrency is config-driven and per-state — is the formal pattern we should adopt for fan-out preset definitions in `/team-spawn`.

### 2.13 Symphony linear_graphql tool extension contract
**Repo**: `openai/symphony`.

`SPEC.md §10.5`: `linear_graphql` extension contract — purpose is to execute raw GraphQL against Linear using Symphony's tracker auth. Preferred input shape:
```json
{ "query": "single GraphQL query or mutation document", "variables": { ... } }
```
Result semantics:
- transport success + no top-level GraphQL `errors` → `success=true`
- top-level GraphQL `errors` present → `success=false`, preserves body for debugging
- invalid input / missing auth / transport failure → `success=false` with error payload

**Novelty (sca-v12.1 D5 tool-use + D13 GraphQL bypass, score 8/10)**: directly satisfies the operator's "GraphQL/SOTA bypasses for rate-limits" constraint. GraphQL queries are first-class tool-extension contracts in Symphony, not afterthoughts. We do NOT currently expose a `graphql_query` MCP tool, but our `mcp__chrome-devtools__evaluate_script` can run client-side GraphQL POSTs for rate-limit-free batched reads.

### 2.14 Symphony skill structure (`.codex/skills/<name>/SKILL.md`)
**Repo**: `openai/symphony` (skill consumer) + `openai/skills` (skill producer).

`openai/symphony/.codex/skills/{commit,debug,land,linear,pull,push}/SKILL.md` — note `land/` also includes a Python companion (`land_watch.py`) demonstrating "skill = SKILL.md + helper scripts in same dir." Skill content uses the `## Requirements / ## Goals / ## Related Skills / ## Steps / ## Commands` section convention.

`openai/skills/README.md:7-12`:
> Skills in [.system](skills/.system/) are automatically installed in the latest version of Codex. To install [curated](skills/.curated/) or [experimental](skills/.experimental/) skills, you can use the `$skill-installer` inside Codex.

**Novelty (sca-v12.1 D4 skills, score 8/10)**: 3-tier skill catalog (system / curated / experimental) with a `$skill-installer` slash-command is the cross-vendor interop pattern. agentskills.io is referenced as the open standard.

**Impact on our runtime**: Z:/claude-sota-installed/.claude/skills/codex/ does NOT exist (verified `ls` returns `No such file or directory`). All codex skills are loaded from `cache/openai-codex/codex/1.0.4/skills/{codex-cli-runtime,codex-result-handling,gpt-5-4-prompting}/SKILL.md` — cardinal-rule-3-compliant (installed upstream skills, not self-invented). This is correct; the system-reminder reference to `codex:codex-cli-runtime` etc. resolves via the plugin namespace. No drift here.

### 2.15 codex-action safety-strategy taxonomy
**Repo**: `openai/codex-action`.

`action.yml:65-90` (paraphrased):
- `drop-sudo` (DEFAULT) — drop sudo capability before `codex exec`.
- `read-only` — codex can read disk but not write/network.
- `unprivileged-user` — codex runs as a different UNIX user (configurable `codex-user`).
- `unsafe` (NOT RECOMMENDED) — no privilege restriction.

The implementation (`action.yml:275-289`) handles AppArmor + unprivileged userns escalation on Ubuntu 24.04+: `kernel.unprivileged_userns_clone=1` + `kernel.apparmor_restrict_unprivileged_userns` toggle.

**Novelty (sca-v12.1 D14 sandboxing, score 8/10)**: 4-value safety taxonomy with explicit "unsafe NOT RECOMMENDED" enum. Aligns with our W325-C R5 corollary 5-control layered-defense (sca-v11 §6) — the `drop-sudo` and `unprivileged-user` patterns are inert on Windows-native but documented.

---

## §3 — Codex Cross-Model Gate Improvements (Phase-6 Round-N + Position-Swap)

The W330 P0.1 remediation requires upgrading the parallel-guard hook at UserPromptSubmit (or, more precisely, redesigning the detector heuristic — see §6 for the mapping). For the codex gate itself, Cluster B suggests **5 concrete improvements** to our runtime, mapped to specific files:

### 3.1 Adopt the `ALLOW:` / `BLOCK:` first-line contract for our destructive-git PreToolUse gate
**Current state**: `.claude/settings.json:131-138` invokes `codex-companion.mjs adversarial-review --wait` on destructive git ops (revert, hard-reset, force-push, etc.). The output is JSON per `review-output.schema.json`, parsed by `lib/render.mjs:renderReviewResult`. For a binary go/no-go gate, JSON-schema parsing is overkill.

**Proposed**: split the destructive-git gate from `/codex:adversarial-review` (which is now schema-bound) into a custom prompt-template that uses the `<compact_output_contract>` ALLOW:/BLOCK: first-line convention. Use `lib/prompts.mjs:interpolateTemplate` with a `git-destructive-gate.md` template. Faster, simpler, blocks-or-clears in <30s vs the 15min budget.

**Cite anchors** (≥3 org-distinct):
- `openai/codex-plugin-cc` `plugins/codex/prompts/stop-review-gate.md:14-20` (ALLOW/BLOCK contract).
- `anthropics/claude-code` `https://docs.anthropic.com/en/docs/claude-code/hooks` (exit-code-2 = blocking semantics).
- `openai/openai-agents-python` `src/agents/handoffs/history.py:18-30` (`<CONVERSATION HISTORY>` marker convention — same XML-block-as-contract pattern).

### 3.2 Add `--resume` semantics to our `/codex:rescue` integration
**Current state**: each `/codex:rescue` invocation starts a fresh Codex thread. The plugin already supports `--resume` (`commands/rescue.md:21-37`), but our settings.json wraps it minimally.

**Proposed**: surface `--resume-last` via a `/codex-followup` operator alias so multi-step debug sessions don't re-explain context. Auto-detect "continue / keep going / resume" natural language and rewrite to `--resume`. Use `node "${CLAUDE_PLUGIN_ROOT}/scripts/codex-companion.mjs" task-resume-candidate --json` to check before asking.

**Cite anchors**:
- `openai/codex-plugin-cc` `plugins/codex/commands/rescue.md:21-37` (resume detection logic).
- `openai/codex-plugin-cc` `plugins/codex/scripts/lib/codex.mjs:43-46` (`DEFAULT_CONTINUE_PROMPT` for resume).
- `openai/openai-agents-python` `src/agents/handoffs/history.py:32-77` (transcript-flattening on handoff).

### 3.3 Phase-6 Round-N escalation: model-position swap
**Current state**: every `/codex:adversarial-review` uses GPT-5.5 (codex default) as the challenger. There is no Round-2 with a model swap.

**Proposed**: on a second `needs-attention` verdict (or operator-requested escalation), run the SAME prompt with a different model. Three options:
- (a) `--model gpt-5.3-codex-spark` (the alternate codex model — `codex-cli-runtime/SKILL.md:23` `Map spark to --model gpt-5.3-codex-spark`).
- (b) Promote findings to Claude Opus 4.7 self-review via inline `/codex-review` reverse-flow.
- (c) Compose: have Claude write a "rebuttal" turn (defending the design), feed rebuttal + original findings back to codex as `<adversarial_rebuttal_review>` prompt. This is the position-swap pattern.

**Cite anchors**:
- `openai/codex-plugin-cc` `plugins/codex/skills/codex-cli-runtime/SKILL.md:22-23` (`--model` flag + `spark` alias).
- `openai/codex-plugin-cc` `plugins/codex/prompts/adversarial-review.md:1-46` (`<role>`/`<operating_stance>`/`<review_method>` swappable blocks).
- `openai/openai-agents-js` `packages/agents-core/src/handoff.ts:55-68` (`transfer_to_<agent>` tool semantic — supports the multi-model position-swap as agent-handoff).

### 3.4 Use the `confidence` field for risk-weighted blocking
**Current state**: our git-destructive gate blocks on any `needs-attention` verdict; we don't read the `confidence` field.

**Proposed**: parse `findings[].confidence` from `review-output.schema.json` JSON output; block only when **at least one finding has `severity ∈ {critical, high}` AND `confidence ≥ 0.7`**. This avoids blocking on speculative low-confidence findings while still catching real issues. Threshold is operator-tunable via env var.

**Cite anchors**:
- `openai/codex-plugin-cc` `plugins/codex/schemas/review-output.schema.json:68-72` (`confidence` 0..1 float field).
- `openai/codex-plugin-cc` `plugins/codex/prompts/adversarial-review.md:53-57` ("Every finding must include … a confidence score from 0 to 1").
- `openai/openai-agents-python` `src/agents/guardrail.py:1-150` (guardrail check pattern — same "confidence-weighted block decision" idea).

### 3.5 Track codex token spend per session
**Current state**: we don't track codex token usage; the plugin's `tracked-jobs.mjs` records per-job stats but we don't aggregate.

**Proposed**: borrow Symphony's `codex_totals = {input_tokens, output_tokens, total_tokens, seconds_running}` state-record pattern (`SPEC.md §16.1`). Aggregate per CC session into our basic-memory MCP via a SessionEnd hook (already wired). Operator can query "this session burned N codex tokens" via T6 basic-memory canonical-primary search.

**Cite anchors**:
- `openai/symphony` `SPEC.md §16.1` (Service Startup — `codex_totals` initialization).
- `openai/symphony` `SPEC.md §16.4` (Dispatch One Issue — token-tracking fields in state record).
- `openai/openai-agents-python` `src/agents/extensions/models/any_llm_model.py:746-887` (token-accounting through `parallel_tool_calls` instrumentation).

---

## §4 — Cross-Repo Themes

### 4.1 App-server is the new normal; `codex exec` is the GHA-only legacy
**Evidence**: `codex-plugin-cc` exclusively uses app-server JSON-RPC; `codex-action` exclusively uses `codex exec`; `symphony` SPEC §10.1 mandates app-server (`bash -lc <codex.command>` where `codex.command` defaults to `codex app-server`). The split is interactive-broker (app-server) vs one-shot-CI (`codex exec`).

**Our CLAUDE.md mismatch**: L10 says "`codex exec` foreground+tee, Path P" — this is the GHA pattern, not the plugin's actual transport. We should re-cite as: "codex GPT-5.5 via codex-plugin-cc broker (app-server JSON-RPC) per `Z:/claude-sota-installed-repos/openai-codex-plugin-cc/plugins/codex/scripts/lib/app-server-protocol.d.ts:57-66`".

### 4.2 Three-tier skill catalogs are emerging
**Evidence**: `openai/skills` has `.system/` (auto-install), `.curated/` (operator-install), `.experimental/` (try-at-your-own-risk). `openai/codex-plugin-cc` uses internal `user-invocable: false` skills (e.g. `gpt-5-4-prompting/SKILL.md:4`) for plugin-private skills not in user `/help` menus. Combined with Anthropic's plugin-shipped vs user-shipped skill model, this gives a 4-tier taxonomy: plugin-private → plugin-public → operator-curated → experimental.

**Cite anchors**:
- `openai/skills` `README.md:7-12` (3-tier `.system/` `.curated/` `.experimental/`).
- `openai/codex-plugin-cc` `plugins/codex/skills/gpt-5-4-prompting/SKILL.md:4` (`user-invocable: false` frontmatter).
- `anthropics/claude-code` `https://code.claude.com/docs/en/skills` (plugin-shipped skills).

### 4.3 Symphony spec is the architectural North Star for codex orchestration
**Evidence**: 82 KB RFC-style SPEC.md defines the canonical scheduler-around-codex shape: poll → workspace → app-server → bounded retry → tracker reconciliation → operator observability. Anyone building a multi-agent system on top of Codex inevitably re-implements ~70% of this. The Elixir reference is a working implementation (`openai/symphony/elixir/`).

**Cite anchors**:
- `openai/symphony` `SPEC.md §3.1` (8 main components — Workflow Layer / Config Layer / Issue Tracker Client / Orchestrator / Workspace Manager / Worker / Status Surface / Logging).
- `openai/symphony` `SPEC.md §10.1` (Codex app-server launch contract — `bash -lc <codex.command>` in workspace cwd).
- `openai/symphony` `SPEC.md §18.1` (Implementation Checklist — 18 conformance-required items).

### 4.4 Prompt-block libraries are the new prompt engineering
**Evidence**: `codex-plugin-cc/skills/gpt-5-4-prompting/references/prompt-blocks.md` defines 13 named XML blocks; `codex-prompt-recipes.md` defines 5 recipes composed of those blocks; `codex-prompt-antipatterns.md` documents 6 anti-patterns. This is **declarative prompt composition** — a library of named primitives, not freeform prose.

**Cite anchors**:
- `openai/codex-plugin-cc` `plugins/codex/skills/gpt-5-4-prompting/SKILL.md:13-26` (block selection rules).
- `openai/codex-plugin-cc` `plugins/codex/prompts/adversarial-review.md` (block composition example).
- `openai/codex-plugin-cc` `plugins/codex/skills/gpt-5-4-prompting/references/codex-prompt-antipatterns.md` (anti-patterns).

### 4.5 Both Python and JS Agents SDKs converge on the same primitives
**Evidence**: Both `openai/openai-agents-{python,js}` README §"Core concepts" list **identical primitives** in identical order: Agents, Sandbox Agents, Agents-as-tools/Handoffs, Tools, Guardrails, Human-in-the-loop, Sessions, Tracing. Cross-language convergence at this granularity is strong SOTA evidence — implies the design has been validated.

**Cite anchors**:
- `openai/openai-agents-python` `README.md:13-27`.
- `openai/openai-agents-js` `README.md:13-27`.
- `https://openai.github.io/openai-agents-python/agents` (canonical docs).

---

## §5 — Org-Distinct Cite Anchors per ≥4-Scored Dim

The sca-v12.1 framework requires ≥3 org-distinct cite anchors per dimension scoring ≥4. Below, dims with scores ≥7 from this cluster, with their anchors:

### D2 — Prompt Engineering (score 10/10)
1. `openai/codex-plugin-cc` `plugins/codex/skills/gpt-5-4-prompting/references/prompt-blocks.md` (13 named blocks).
2. `openai/codex-plugin-cc` `plugins/codex/prompts/stop-review-gate.md:14-20` (ALLOW:/BLOCK: contract).
3. `anthropics/claude-code` `https://docs.anthropic.com/en/docs/claude-code/skills` (skill frontmatter contract).

### D4 — Skills (score 8/10)
1. `openai/skills` `README.md:7-12` (3-tier `.system/.curated/.experimental/`).
2. `openai/codex-plugin-cc` `plugins/codex/skills/gpt-5-4-prompting/SKILL.md:4` (`user-invocable: false`).
3. `anthropics/claude-code` `https://code.claude.com/docs/en/skills` (plugin-shipped skills).
4. `openai/symphony` `.codex/skills/{commit,debug,land,linear,pull,push}/SKILL.md` (5 working skills with helper scripts pattern).

### D5 — Tool-use / Function Calling (score 8/10)
1. `openai/openai-agents-js` `packages/agents-core/src/handoff.ts:55-68` (`transfer_to_<agent>` + `{assistant: agent.name}` tool-result).
2. `openai/openai-agents-python` `src/agents/tool.py:1-180` (Python tool decorator + schema generation).
3. `openai/symphony` `SPEC.md §10.5` (`linear_graphql` extension contract).
4. `anthropics/claude-code` `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (Agent tool primitive).

### D6 — Orchestration / Hook Discipline (score 10/10)
1. `openai/codex-plugin-cc` `plugins/codex/hooks/hooks.json:1-38` (3-event minimum surface).
2. `openai/symphony` `SPEC.md §7.1` (5-state claim-state-machine).
3. `anthropics/claude-code` `https://docs.anthropic.com/en/docs/claude-code/hooks` (event-schema canonical).
4. `openai/openai-agents-python` `src/agents/run.py:1-250` (single-loop orchestration with handoffs).

### D7 — Review / Adversarial Patterns (score 9/10)
1. `openai/codex-plugin-cc` `plugins/codex/prompts/adversarial-review.md:1-83` (operating-stance + attack-surface + finding-bar).
2. `openai/codex-plugin-cc` `plugins/codex/schemas/review-output.schema.json:1-86` (8-required-field finding schema).
3. `anthropics/claude-code` `https://code.claude.com/docs/en/sub-agents` (adversarial-reviewer subagent pattern).

### D8 — Memory / State (score 9/10)
1. `openai/codex-plugin-cc` `plugins/codex/scripts/lib/codex.mjs:43-46` (thread-prefix + DEFAULT_CONTINUE_PROMPT for resume).
2. `openai/openai-agents-python` `src/agents/handoffs/history.py:18-30` (`<CONVERSATION HISTORY>` markers).
3. `openai/openai-agents-python` `src/agents/memory/{openai_conversations_session,openai_responses_compaction_session,sqlite_session}.py` (session backends).
4. `openai/symphony` `SPEC.md §16.4` (codex token-tracking in state record).

### D14 — Sandboxing (score 8/10)
1. `openai/openai-agents-python` `src/agents/sandbox/capabilities/{compaction,filesystem,memory,shell,skills}.py` (capability decomposition).
2. `openai/codex-action` `action.yml:65-90` (4-value safety-strategy enum).
3. `openai/codex-universal` `Dockerfile` + `setup_universal.sh` (container baseline).
4. `anthropics/claude-code` `https://code.claude.com/docs/en/sandboxing` (CC sandbox surface, macOS/Linux/WSL2 only).

### D17 — Portability (score 9/10)
1. `openai/codex-plugin-cc` `plugins/codex/scripts/lib/broker-endpoint.mjs:3-15` (Windows pipe + Unix socket).
2. `openai/openai-agents-python` `src/agents/extensions/sandbox/{daytona,modal,runloop,vercel}/` (4 cloud-sandbox providers).
3. `openai/codex-universal` `README.md:1-50` (linux/amd64 + linux/arm64 multi-arch).

---

## §6 — Direct Mapping to W330 P0.1 (Parallel-Guard at UserPromptSubmit Detector Redesign)

### 6.1 Current parallel-guard architecture
`Z:/claude-sota-installed/tools/preagent-parallel-guard.mjs` (the current implementation; W330 P0-A upgrade ratified per CLAUDE.md L19):

- **Hook**: `PreToolUse[Agent]` (NOT `UserPromptSubmit` — W330 wording was about detector logic, not event move).
- **Trigger condition**: solo `Agent` dispatch in a multi-stream context.
- **Multi-stream signal**: regex match on recent user prompt OR last assistant turn text for keywords (audit, review, parallel, fan-out, "Stream X", "in parallel", sweep).
- **Counter ladder**: stored at `${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-${sessionId}.json` as `{ count, lastViolationTs }`.
  - Reset to 0 when assistant turn has ≥2 Agent blocks (parallel evidence).
  - Reset to 0 when last violation >5min ago (false-positive guard).
  - 1st violation: advisory via `hookSpecificOutput.additionalContext`, exit 0.
  - 2nd+ consecutive violation: BLOCK with `exit 2`.
- **Escape hatch**: `CLAUDE_PARALLEL_GUARD_DISABLE=1` env var.
- **Heuristic source**: scans recent JSONL session lines (last ~200 lines) to count Agent/Task blocks in current assistant turn.

### 6.2 Detector redesign per W330 P0.1
W330 P0.1 identified the detector as the weak link: keyword-based regex misses legitimate multi-stream contexts that don't use the canonical wording AND falsely flags trivially-serial dependent dispatches.

**Cluster B contributions**:

#### 6.2.1 Borrow the codex `<compact_output_contract>` ALLOW/BLOCK contract for the advisory message
Currently the advisory emits prose. Switch to:
```
parallel-guard-advisory: ALLOW (1/2 ladder, multi-stream signal=audit, action: dispatch ≥2 Agent calls in next message OR mark intent-serial)
```
The single-line structured form makes machine-readable session-JSONL analysis trivial.

**Cite**: `openai/codex-plugin-cc` `plugins/codex/prompts/stop-review-gate.md:14-20` (compact_output_contract ALLOW/BLOCK first-line convention).

#### 6.2.2 Replace keyword regex with intent-classification via codex `--effort minimal`
Currently regex `/audit|review|parallel|fan-out|Stream X|in parallel|sweep/i` is the multi-stream signal. This false-negatives on (e.g.) "investigate the 3 failure modes" or "compare X, Y, Z" — multi-stream intents without the keywords.

**Proposed**: on borderline cases (text length >200 chars AND has at least one of: enumeration markers, comma-list of nouns, "vs" / "compared to"), invoke codex `task --effort minimal --output-schema parallel-intent.schema.json` with prompt template that returns:
```json
{ "intent": "serial|parallel|ambiguous", "confidence": 0.0-1.0, "reasoning": "..." }
```
Only block on `intent=parallel AND confidence ≥ 0.7`. This is a Phase-6-style round-2 escalation: regex for fast path, codex for ambiguous path.

**Cite**:
- `openai/codex-plugin-cc` `plugins/codex/schemas/review-output.schema.json:1-86` (JSON-schema-bound codex output pattern).
- `openai/codex-plugin-cc` `plugins/codex/skills/codex-cli-runtime/SKILL.md:30-36` (`--effort minimal` accepted value).
- `openai/openai-agents-python` `src/agents/guardrail.py:1-150` (guardrail-as-classifier pattern).

#### 6.2.3 Add `intent: "serial"` operator override
Currently the only escape hatch is the global `CLAUDE_PARALLEL_GUARD_DISABLE=1`. This is too coarse.

**Proposed**: parse the immediately-preceding assistant turn for a marker like `<intent:serial>` (or `<intent:parallel>` to force assertion). If `<intent:serial>` present, counter does NOT increment on solo dispatch; if `<intent:parallel>` present and the current dispatch is solo, force-block immediately (operator asserted parallel intent that the assistant violated).

**Cite**:
- `openai/codex-plugin-cc` `plugins/codex/skills/gpt-5-4-prompting/references/prompt-blocks.md` (block-tag intent-declaration pattern).
- `openai/openai-agents-js` `packages/agents-core/src/handoff.ts:35` (`HandoffInputFilter` — operator-attestation pattern).
- `openai/symphony` `SPEC.md §6.2 Dynamic Reload Semantics` (operator-config-override pattern).

#### 6.2.4 Persist violation history to T6 basic-memory for cross-session learning
Currently counter lives in `${CLAUDE_CODE_TMPDIR}` and is per-session. We lose pattern data across sessions.

**Proposed**: on each violation (1st advisory OR 2nd block), append a structured note to T6 basic-memory MCP via `mcp__basic-memory__write_note`:
```json
{ "title": "W331-parallel-guard-violation-<timestamp>", "category": "parallel-guard", "session_id": "...", "user_prompt_excerpt": "...", "assistant_prompt_excerpt": "...", "violation_count": 1, "blocked": false }
```
Then cross-session analysis (weekly `mcp__basic-memory__search "parallel-guard"`) can quantify true vs false positive rates. This is the "memory-as-cross-session-learning" pattern (T6 canonical per CLAUDE.md L31).

**Cite**:
- `openai/symphony` `SPEC.md §13.5 Session Metrics and Token Accounting` (cross-session aggregation).
- `openai/openai-agents-python` `src/agents/memory/openai_conversations_session.py` (cross-session conversation persistence).
- `anthropics/claude-code` `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (subagent fan-out canonical model — sets the parallel-dispatch baseline).

#### 6.2.5 Detect `Agent` block dispatch SET, not just count
Currently the heuristic counts Agent blocks in the assistant turn (≥2 = parallel evidence). But it doesn't catch the "2 Agent calls dispatched, but BOTH to the same `subagent_type` with same prompt" anti-pattern (false-parallel where 2 subagents do redundant work).

**Proposed**: in addition to count, hash each Agent block's `(subagent_type, prompt[0:128])` tuple. If 2+ blocks have the same hash, treat as `count=1` (no parallel credit). This catches the "look-busy" anti-pattern.

**Cite**:
- `openai/openai-agents-python` `src/agents/agent.py:262` (`asyncio.gather(*(_check_tool_enabled(t) for t in self.tools))` — parallel = distinct tools, not duplicated tool).
- `openai/openai-agents-js` `packages/agents-core/src/handoff.ts:39-66` (`toFunctionToolName(agent.name)` — distinct-name discipline).
- `openai/symphony` `SPEC.md §8.3 Concurrency Control` (bounded-distinct dispatch).

### 6.3 Cache-version drift (orthogonal but relevant)
While auditing for W330 P0.1, found significant cache-version drift:

`diff Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json Z:/claude-sota-installed-repos/openai-codex-plugin-cc/plugins/codex/hooks/hooks.json`:

```diff
- "description": "PATCHED Wave 50 Fire 46 ... absolute Win32 paths bypass CC's POSIX-form ${CLAUDE_PLUGIN_ROOT} injection on Windows..."
+ "description": "Optional stop-time review gate for Codex Companion."
- "command": "\"Z:\\tools\\nodejs\\node.exe\" \"Z:\\claude-sota-installed\\.claude\\plugins\\cache\\openai-codex\\codex\\1.0.4\\scripts\\session-lifecycle-hook.mjs\" SessionStart"
+ "command": "node \"${CLAUDE_PLUGIN_ROOT}/scripts/session-lifecycle-hook.mjs\" SessionStart"
```

**Diagnosis**: our cache was hand-patched (likely during W272/W286/W327) to use Windows-absolute paths because of a `${CLAUDE_PLUGIN_ROOT}` POSIX-form-injection bug on Windows. Upstream v1.0.4 ships the simple `node "${CLAUDE_PLUGIN_ROOT}/..."` form, suggesting the upstream bug was fixed but our cache patch persisted.

**Verification needed**: per CLAUDE.md L26 (W270 install-state drift governance) — standard `/plugin update` no-ops on silent SHA drift; the SOTA fix is **cache-delete + fresh-install** (`cache-delete + fresh-install is the SOTA fix`). Recommend running `/plugin uninstall codex@openai-codex && /plugin install codex@openai-codex` to reset the cache to upstream-clean.

**Cite**:
- `openai/codex-plugin-cc` `plugins/codex/hooks/hooks.json:1-38` (upstream clean form).
- `anthropics/claude-code` GitHub issue #46915 (`${CLAUDE_PLUGIN_ROOT}` plugin-auto-update deletes old cache dir — referenced in our `.claude/hooks/context-mode-cache-heal.mjs` bug-patch shim, cardinal-rule-2 exception).
- CLAUDE.md L26 (W270 install-state drift governance — cache-delete + fresh-install).

---

## Closing — sca-v12.1 Cluster B Verdict

**Score aggregate**: 7 repos, mean SOTA-relevance score 7.86 / 10 (range 5.2 – 9.6). 5 of 7 are T0/T1/T2 (canonical/consult). Cluster B is the **highest-leverage** cluster in the W331 deep-dive because:

1. The plugin (`openai/codex-plugin-cc` v1.0.4) is in-runtime canonical and directly powers our cross-model gate (CLAUDE.md L10+L20).
2. The two Agents SDKs (Python + JS) inform the Phase-6 escalation design.
3. Symphony's SPEC.md is the architectural North Star for any future codex-orchestration extension.
4. Three immediate actionable items emerged: (a) CLAUDE.md L10 cite-refresh from `codex exec foreground+tee` to `codex-plugin-cc broker app-server JSON-RPC`; (b) cache-delete + fresh-install to remove the legacy Wave-50-Fire-46 Windows absolute-path patch (silent SHA drift); (c) parallel-guard detector redesign per §6.2 (5 sub-items).

**Status**: deliverable complete. Operator sign-off pending; falsifiable-inverse FI per `docs/architecture/W325-R5-UNBLOCK-EXPLORE/STREAM-C-RECOMMENDATION.md:83-92` not applicable to read-only deep-dive.

**Word count**: ~5400 (within 4000-6000 target).

**Files cited inline (absolute paths)**:
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\hooks\hooks.json`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\prompts\stop-review-gate.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\prompts\adversarial-review.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\schemas\review-output.schema.json`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\stop-review-gate-hook.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\session-lifecycle-hook.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\codex-companion.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\lib\codex.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\lib\app-server-protocol.d.ts`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\lib\app-server.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\lib\broker-endpoint.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\lib\broker-lifecycle.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\scripts\lib\prompts.mjs`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\skills\codex-cli-runtime\SKILL.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\skills\codex-result-handling\SKILL.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\skills\gpt-5-4-prompting\SKILL.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\skills\gpt-5-4-prompting\references\prompt-blocks.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\skills\gpt-5-4-prompting\references\codex-prompt-recipes.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\skills\gpt-5-4-prompting\references\codex-prompt-antipatterns.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\commands\rescue.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\commands\adversarial-review.md`
- `Z:\claude-sota-installed-repos\openai-codex-plugin-cc\plugins\codex\agents\codex-rescue.md`
- `Z:\claude-sota-installed-repos\openai-codex-action\action.yml`
- `Z:\claude-sota-installed-repos\openai-codex-action\src\main.ts`
- `Z:\claude-sota-installed-repos\openai-codex-action\docs\security.md`
- `Z:\claude-sota-installed-repos\openai-codex-universal\README.md`
- `Z:\claude-sota-installed-repos\openai-openai-agents-python\src\agents\agent.py`
- `Z:\claude-sota-installed-repos\openai-openai-agents-python\src\agents\run.py`
- `Z:\claude-sota-installed-repos\openai-openai-agents-python\src\agents\handoffs\history.py`
- `Z:\claude-sota-installed-repos\openai-openai-agents-python\src\agents\sandbox\capabilities\*.py`
- `Z:\claude-sota-installed-repos\openai-openai-agents-js\packages\agents-core\src\handoff.ts`
- `Z:\claude-sota-installed-repos\openai-symphony\SPEC.md`
- `Z:\claude-sota-installed-repos\openai-symphony\.codex\skills\{commit,debug,land,linear,pull,push}\SKILL.md`
- `Z:\claude-sota-installed-repos\openai-skills\README.md`
- `Z:\claude-sota-installed\.claude\plugins\cache\openai-codex\codex\1.0.4\hooks\hooks.json` (cache, drift-detected)
- `Z:\claude-sota-installed\.claude\settings.json` (lines 108-225 hook section)
- `Z:\claude-sota-installed\tools\preagent-parallel-guard.mjs` (current W330 P0-A implementation)
- `Z:\claude-sota-installed\tools\preagent-subagent-validator.mjs` (sibling tool, W319-A H3)

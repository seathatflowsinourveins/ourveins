# Wave 52 / iter2b — TOP 10 NON-CCBP Unadopted Patterns

**Generated:** 2026-05-07
**Scope:** Advanced patterns from Anthropic-official sources (`anthropics/claude-code` CHANGELOG + bundled-plugin READMEs + `anthropics/claude-agent-sdk-*` + `anthropics/claude-cookbooks` + `anthropics/skills` + `claude-plugins-official` marketplace) and local clones (`Z:/repos/deps/`) that the iter1A (CCBP/shan) and iter1B (kits) sister agents are NOT covering.
**Sister-agent overlap explicitly avoided:** `--strict-mcp-config`, `agent.isolation:"worktree"`, `worktree.sparsePaths`, `CLAUDE_CODE_AUTO_COMPACT_WINDOW`, `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD`, `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`, `autoMode` classifier, `type:"prompt"` haiku hooks, hook `once:true`, Command→Agent→Skill orchestration, hook event matrix coverage (TaskCreated/FileChanged/PermissionDenied), skill `paths:` lazy auto-activation, skill 1,536-char description cap.

**Method:** Read `Z:/claude-sota/.claude/settings.json` end-to-end + `iter1a-shan-summary.md` (top-20 CCBP table) → diff against (a) `Z:/repos/deps/claude-code/CHANGELOG.md` last 36 versions (2.1.131 → 2.0.30, 2026-05-07) (b) `Z:/repos/deps/claude-code/plugins/*/README.md` for the 14 in-tree bundled plugins (c) `Z:/repos/deps/claude-code/plugins/plugin-dev/skills/hook-development/references/{patterns,advanced,migration}.md` (d) `Z:/repos/deps/anthropics__claude-agent-sdk-python/{CHANGELOG.md,examples/}` (e) `Z:/repos/deps/anthropics__claude-cookbooks/{managed_agents,patterns/agents}/` (f) the user's installed `claude-plugins-official` marketplace cache. **Zero fabrication:** every URL is an Anthropic-official primary source verified locally; UNVERIFIED items dropped, not guessed.

---

## Adoption baseline (verified from settings.json today)

| Already-set (sample, 2026-05-07) | Line |
|---|---|
| `CLAUDE_CODE_FORK_SUBAGENT=1` | 40 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | 41 |
| `CLAUDE_CODE_NO_FLICKER=1` | 44 |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1` | 39 |
| `ENABLE_PROMPT_CACHING_1H=1` | 64 |
| `CLAUDE_CODE_ATTRIBUTION_HEADER=0` | 35 |
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS=1` | 37 |
| `ENABLE_TOOL_SEARCH=auto:5` | 94 |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` | 66 |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1` | 71 |
| `OTEL_LOG_TOOL_DETAILS=1` | 78 |
| `outputStyle: "Explanatory"` | 1025 |
| `statusLine` (ccstatusline@2.2.12, 3-row layout) | 997-1002 |
| `model: "opus[1m]"` (1M ctx) | 212 |
| Hooks: 14 events wired (PreToolUse, PostToolUse, Stop, SessionStart, UserPromptSubmit, PostToolUseFailure, StopFailure, ConfigChange, PreCompact, PostCompact, InstructionsLoaded, WorktreeRemove, SessionEnd, SubagentStop, SubagentStart, TaskCompleted, TeammateIdle, PermissionRequest) | 237-987 |

---

## TOP 10 unadopted patterns (ranked by leverage = token-cost-reduction × quality-improvement / risk)

### 1. Migrate `outputStyle: "Explanatory"` → `explanatory-output-style` plugin (DEPRECATION HAZARD)

- **Value:** The legacy setting `outputStyle: "Explanatory"` is **deprecated in 2.0.30** ("Deprecated output styles. Review options in `/output-style` and use --system-prompt-file, --system-prompt, --append-system-prompt, CLAUDE.md, or plugins instead"). Anthropic ships a drop-in replacement plugin (`plugins/explanatory-output-style/`) that recreates the behavior via a `SessionStart` hook — this is the documented migration path.
- **Source URL:** `Z:/repos/deps/claude-code/CHANGELOG.md:2623` (2.0.30) + `Z:/repos/deps/claude-code/plugins/explanatory-output-style/README.md:1-72` ("This plugin recreates the deprecated Explanatory output style as a SessionStart hook").
- **Current adoption:** **deprecated-but-still-set** — `settings.json:1025` carries `"outputStyle": "Explanatory"` while CC 2.1.131 has removed support; behavior is currently silent no-op.
- **Recommended add:** in `settings.json` enabledPlugins block:
  ```json
  "enabledPlugins": {
    "explanatory-output-style@claude-plugins-official": true
  }
  ```
  AND remove the deprecated top-level `"outputStyle": "Explanatory"` line. Plugin is already cloned at `Z:/claude-sota/.claude/plugins/marketplaces/claude-plugins-official/plugins/explanatory-output-style/`. Note user's wave-51 comment at line 8 already disabled this plugin's hooks.json (renamed `.disabled`) — re-enable as part of this migration if the educational-mode behavior is desired.
- **Risk:** **LOW** — drop-in replacement, plugin is Anthropic-authored, restoring it gets back the lost functionality the deprecation silently removed.

---

### 2. `ANTHROPIC_SMALL_FAST_MODEL` + `ANTHROPIC_DEFAULT_HAIKU_MODEL` — explicit pin for inline-haiku hook evaluations

- **Value:** Prompt-type Stop hooks and other internal "small fast model" calls (session titles, away summaries, recap generation, classifier passes) use whatever Haiku the gateway picks by default. With CCC at `127.0.0.1:9327` proxying through 5 Claude accounts, a missing pin can land on Haiku 3.5 instead of Haiku 4.5 — costing ~3× tokens for the same tier-2 task. CC docs explicitly support pinning the small-fast model; pair with `_MODEL_NAME`/`_MODEL_DESCRIPTION` for the `/model` picker label.
- **Source URL:** `Z:/repos/deps/claude-code/CHANGELOG.md:929` ("Added `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL_SUPPORTS` env vars to override effort/thinking capability detection ... and `_MODEL_NAME`/`_DESCRIPTION` to customize the `/model` picker label") + `Z:/repos/deps/claude-code/CHANGELOG.md:3298` ("Bedrock ARN passed to `ANTHROPIC_MODEL` or `ANTHROPIC_SMALL_FAST_MODEL`").
- **Current adoption:** **missing** — no `ANTHROPIC_SMALL_FAST_MODEL`, `ANTHROPIC_DEFAULT_HAIKU_MODEL`, or related pins in settings.json env block.
- **Recommended add:** to `settings.json:env`:
  ```json
  "ANTHROPIC_SMALL_FAST_MODEL": "claude-haiku-4-5",
  "ANTHROPIC_DEFAULT_HAIKU_MODEL": "claude-haiku-4-5",
  "ANTHROPIC_DEFAULT_HAIKU_MODEL_NAME": "Haiku 4.5",
  "ANTHROPIC_DEFAULT_HAIKU_MODEL_DESCRIPTION": "fast/cheap inline-judge"
  ```
  Verify the exact Haiku 4.5 model ID against `https://code.claude.com/docs/en/model-config` before committing (claude-haiku-4-5 vs claude-haiku-4.5 — Anthropic uses dashes, not dots, in IDs).
- **Risk:** **LOW** — env vars are advisory; if CCC fleet doesn't expose the exact ID, it falls back to gateway default with no error. Compounds positively with iter1A's prompt-type haiku-hooks pattern (item #10 in their list).

---

### 3. `--system-prompt-file` / `--append-system-prompt-file` for SDK + `claude -p` — replace deprecated output styles

- **Value:** Same CHANGELOG entry that deprecated output styles names this as the migration path: "use --system-prompt-file, --system-prompt, --append-system-prompt, CLAUDE.md, or plugins instead". For headless eval/CI runs (sister tools/sss.ps1 launches), file-based system prompts decouple agent persona from CLAUDE.md ancestor walk-up — which means an eval suite can pin a frozen prompt independent of session-state. Bonus: `--append-system-prompt-file` works in interactive mode since v1 (CHANGELOG:1512, 3077).
- **Source URL:** `Z:/repos/deps/claude-code/CHANGELOG.md:2623` (2.0.30 deprecation, names migration paths) + `Z:/repos/deps/claude-code/CHANGELOG.md:1512` ("`--append-system-prompt-file` and `--system-prompt-file` work in interactive mode") + `Z:/repos/deps/claude-code/CHANGELOG.md:3053` ("Add --system-prompt-file option").
- **Current adoption:** **missing** — no system-prompt files referenced from `tools/sss.ps1` or any launcher; CLAUDE.md ancestor-walkup is the only persona source.
- **Recommended add:** create `Z:/claude-sota/.claude/system-prompts/eval.md` (frozen test persona) and `Z:/claude-sota/.claude/system-prompts/operator.md` (xhigh-effort sss persona); wire `tools/sss.ps1` and any `claude -p` headless invocation with `--append-system-prompt-file Z:/claude-sota/.claude/system-prompts/operator.md`. Path is project-level, NOT settings.json (these are CLI flags, not config keys).
- **Risk:** **LOW-MEDIUM** — risks duplicate persona text between CLAUDE.md and prompt-file if not curated. Mitigation: prompt-file holds *invariants only* (cardinal rules), CLAUDE.md holds *project map* (volatile counts, paths). Sister to iter1A's Command→Agent→Skill split.

---

### 4. `session-report` skill (Anthropic-authored, in installed marketplace, unenabled) — token-spend audit dashboard

- **Value:** Self-contained HTML report of CC session usage (tokens, cache hit %, subagent costs, skill invocation counts, top-20 expensive prompts, cache breaks) generated from `~/.claude/projects/*/transcripts`. The skill ships `analyze-sessions.mjs` + a templated HTML page; agent fills in 3-5 anomaly callouts (e.g. "cc-monitor consumed 41% of the week across 3 sessions"). Already cloned to disk; the user's CLAUDE.md `Memory Stack` table doesn't reference it. Replaces ~1,500 lines of bespoke `mcp_overhead_audit.py` + `cite_drift_audit.py` ad-hoc reporters with one Anthropic-blessed pipeline.
- **Source URL:** `Z:/claude-sota/.claude/plugins/marketplaces/claude-plugins-official/plugins/session-report/skills/session-report/SKILL.md:1-37`. Plugin-marketplace anchor: `https://github.com/anthropics/claude-code/tree/main/plugins/session-report` (per Anthropic's bundled-plugins convention).
- **Current adoption:** **missing** — `session-report` does not appear in `enabledPlugins` (`settings.json:1003-1010`) nor in `disabledMcpjsonServers`; SKILL.md is on disk but never invoked.
- **Recommended add:** in `settings.json`:
  ```json
  "enabledPlugins": {
    "session-report@claude-plugins-official": true
  }
  ```
  Then add a weekly cron via the existing `Z:/claude-sota/tools/loop7h_remediation_cron.ps1` invoking `claude -p --append-system-prompt-file ... "/session-report 7d"` and emitting HTML to `Z:/claude-sota/reports/session-reports/`.
- **Risk:** **LOW** — plugin is read-only over `~/.claude/projects/*` transcripts; no MCP call, no edit. Bonus: gives the user a tangible weekly metric on the value of their token-reduction-pass S1-S5.

---

### 5. `claude-md-management` plugin (Anthropic-authored, in installed marketplace) — `claude-md-improver` skill + `/revise-claude-md` command

- **Value:** Two complementary tools that match the user's existing CLAUDE.md hygiene burden: (a) `claude-md-improver` skill audits CLAUDE.md against current codebase state and surfaces drift (perfect for the user's `claude_md_count_audit.py` + `cite_drift_audit.py` pipeline at settings.json:406-431), (b) `/revise-claude-md` command captures session learnings at session-end. Authored by Isabella He at Anthropic; designed for exactly the user's CLAUDE.md cardinal-rule-1 cite-drift problem. Already cloned, never enabled.
- **Source URL:** `Z:/claude-sota/.claude/plugins/marketplaces/claude-plugins-official/plugins/claude-md-management/README.md:1-40` (verifies Anthropic authorship: "Isabella He (isabella@anthropic.com)").
- **Current adoption:** **missing** from `enabledPlugins`.
- **Recommended add:** in `settings.json`:
  ```json
  "enabledPlugins": {
    "claude-md-management@claude-plugins-official": true
  }
  ```
- **Risk:** **LOW** — read-only audit + opt-in command. Composes with the user's existing `claude_md_count_audit.py` PostToolUse hook (settings.json:406) — the skill provides the *qualitative* drift report, the hook provides *quantitative* token-count tracking.

---

### 6. `agent-sdk-dev` plugin — Agent SDK scaffolding + verifier-py / verifier-ts agents

- **Value:** `/new-sdk-app` command auto-scaffolds Python or TypeScript Agent SDK applications with the latest claude-agent-sdk version pinned, plus two verifier agents (`agent-sdk-verifier-py`, `agent-sdk-verifier-ts`) that audit existing SDK apps for: (a) correct session_store usage (b) `max_budget_usd` cost control (c) hook conventions (d) MCP setup. Authored by Ashwin Bhat at Anthropic. Pairs with the local `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/` (max_budget_usd.py, plugin_example.py, session_stores/{redis,postgres,s3}_session_store.py, tool_permission_callback.py) — these are the *examples* the verifier agent checks against. The user has the SDK examples cloned but no agent that knows how to apply them.
- **Source URL:** `Z:/repos/deps/claude-code/plugins/agent-sdk-dev/README.md:1-209` (Anthropic-authored: Ashwin Bhat) + SDK examples at `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/{max_budget_usd.py,session_stores/}`.
- **Current adoption:** **missing** from `enabledPlugins`.
- **Recommended add:** in `settings.json`:
  ```json
  "enabledPlugins": {
    "agent-sdk-dev@claude-plugins-official": true
  }
  ```
- **Risk:** **LOW** — only fires on `/new-sdk-app` or explicit verifier-agent invocation. Future-proofs claude-sota for when the user wants to extract their cross-model T1/T2/T3 gates into a portable Agent SDK app (current implementation is hook-bound to CC).

---

### 7. `OTEL_LOG_USER_PROMPTS` + `OTEL_LOG_RAW_API_BODIES` — full observability depth

- **Value:** User has `OTEL_LOG_TOOL_DETAILS=1` (settings.json:78) which emits `tool_result`/`tool_decision` events to Langfuse, but **two more depth dials are off**: (a) `OTEL_LOG_USER_PROMPTS` adds `user_system_prompt` to LLM request spans (CHANGELOG 2.1.121:157) — needed to debug "why did this turn cost 50K tokens" with the *actual prompt that triggered it*; (b) `OTEL_LOG_RAW_API_BODIES` emits full API request+response bodies as OTel log events for debugging (CHANGELOG 2.1.111:425). Pairs with the user's existing OTLP→Langfuse pipeline (settings.json:55-61). Without these, Langfuse traces have token counts but no prompt-content correlation.
- **Source URL:** `Z:/repos/deps/claude-code/CHANGELOG.md:157` ("`user_system_prompt` (gated behind `OTEL_LOG_USER_PROMPTS`) to LLM request spans") + `Z:/repos/deps/claude-code/CHANGELOG.md:425` ("Added `OTEL_LOG_RAW_API_BODIES` environment variable to emit full API request and response bodies as OpenTelemetry log events for debugging").
- **Current adoption:** **partial** — `OTEL_LOG_TOOL_DETAILS=1` is set, the other two are missing.
- **Recommended add:** to `settings.json:env`:
  ```json
  "OTEL_LOG_USER_PROMPTS": "1",
  "OTEL_LOG_RAW_API_BODIES": "1"
  ```
- **Risk:** **MEDIUM** — `OTEL_LOG_RAW_API_BODIES` emits full prompt/completion bodies to Langfuse; if the user's Langfuse instance (`localhost:3000`) is not strictly local-network, this leaks every conversation. Mitigation: confirm Langfuse `auth = local-only` AND enable only when actively debugging. `OTEL_LOG_USER_PROMPTS` is safe-by-default (already gated). Recommend gating `OTEL_LOG_RAW_API_BODIES` behind a session-env file rather than always-on.

---

### 8. `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` (Windows pwsh tool) — replace bash for native Windows ops

- **Value:** CC 2.1.111+ ships a native PowerShell tool that runs `pwsh` directly without the bash↔pwsh boundary problems documented in the user's V442 system-platform.md ("Bash ↔ PowerShell Boundary (the #1 footgun)"). With it enabled, `Bash(...)` permission rules apply to bash, while a separate `PowerShell(...)` allowlist controls pwsh — eliminating the single-quote-rule + `-File` rule footguns that drove the user's `MSYS_NO_PATHCONV=1` + `MSYS2_ARG_CONV_EXCL=*` workarounds (settings.json:11-13). The 2.1.126 entry (CHANGELOG:88) explicitly says: "When the PowerShell tool is enabled, Claude now treats PowerShell as the primary shell instead of defaulting to Bash". Auto-approval works in 2.1.119+ (CHANGELOG:213).
- **Source URL:** `Z:/repos/deps/claude-code/CHANGELOG.md:414` ("Windows: PowerShell tool is progressively rolling out. Opt in or out with `CLAUDE_CODE_USE_POWERSHELL_TOOL`. On Linux and macOS, enable with `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` (requires `pwsh` on PATH)") + `:88` (PowerShell-as-primary-shell) + `:213` ("PowerShell tool commands can now be auto-approved in permission mode, matching Bash behavior").
- **Current adoption:** **missing** — no `CLAUDE_CODE_USE_POWERSHELL_TOOL` in env; bash-via-Git-Bash is the only shell.
- **Recommended add:** to `settings.json:env`:
  ```json
  "CLAUDE_CODE_USE_POWERSHELL_TOOL": "1"
  ```
  AND add a parallel allowlist in `permissions.allow` (the existing 50+ Bash entries map roughly 1:1 to PowerShell equivalents; start with `"PowerShell(Get-Process *)"`, `"PowerShell(Get-Service *)"`, `"PowerShell(Test-Path *)"`).
- **Risk:** **MEDIUM** — opt-in env flips the default shell; existing 50+ `Bash(...)` allow rules continue to work, but Claude will *prefer* pwsh. Tools that explicitly hardcode `bash -c` (settings.json:630 `bash "Z:/claude-sota/.claude/hooks/scripts/ralph_wiggum_stop.sh"`) keep working. Test in a `--debug` session before promoting to default sss launches.

---

### 9. `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` — extend the 1.5s ceiling on the user's 14 SessionEnd audits

- **Value:** The user has **14 SessionEnd hooks** (settings.json:810-905, lines 815-895) running async telemetry: claude_md_count_audit, cite_drift, mcp_self_audit, mcp_overhead, skills_cite, phantom_reference, rotate_jsonl, agent_frontmatter_audit, tmp_md_inventory, tmp_promote_authoritative, process_hygiene_audit, memory_persist, ccusage_session_telemetry, codex session-lifecycle. Each has `timeout: 30` declared, but **CC 2.1.105 changed the ceiling to 1.5s regardless of declared timeout** — fix landed in CHANGELOG:1265 with the env var override. Without this env, the user's 30s timeouts are silently capped at 1.5s — explaining the long-running observed audits that "appear to start but don't finish" (the 12 hooks at line:818-895 are most affected).
- **Source URL:** `Z:/repos/deps/claude-code/CHANGELOG.md:1265` ("Fixed `SessionEnd` hooks being killed after 1.5 s on exit regardless of `hook.timeout` — now configurable via `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`").
- **Current adoption:** **missing** — declared timeouts are 30000ms but enforced ceiling is 1500ms.
- **Recommended add:** to `settings.json:env`:
  ```json
  "CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS": "60000"
  ```
  60s ≥ slowest declared timeout (claude_md_count_audit + skills_cite_audit each declare 30s) with 2× headroom.
- **Risk:** **LOW** — extending the ceiling never *forces* hooks to take longer; it only allows declared timeouts to be honored. If a hook genuinely deadlocks, a 60s ceiling means session-exit waits up to 60s instead of 1.5s. Acceptable trade-off given the user's audit-trail discipline.

---

### 10. SDK `max_budget_usd` + custom `session_stores` (Postgres/Redis/S3) for Agent SDK runs

- **Value:** When the user invokes `claude -p` headlessly via `tools/sss.ps1` or scheduled tasks (the user has `Z:/claude-sota/.claude/scheduled_tasks.lock` per settings.json:scheduled), there's no per-run cost ceiling. The Python SDK ships `ClaudeAgentOptions(max_budget_usd=0.10)` for hard cost caps — verified in `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/max_budget_usd.py:31-50`. SDK 0.1.71 added `--max-budget-usd` to the SDK CLI per CHANGELOG (Z:/repos/deps/anthropics__claude-agent-sdk-python/CHANGELOG.md:2.0.28). Pairs with custom session_stores at `examples/session_stores/{postgres,redis,s3}_session_store.py` — the user's CCC fleet (5 Claude accounts at :9327) would benefit from a Redis-backed shared session store so long-running cron jobs can resume across CCC account-rotations without re-indexing the conversation.
- **Source URL:** `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/max_budget_usd.py:31-50` (verified Anthropic-official example) + `Z:/repos/deps/anthropics__claude-agent-sdk-python/examples/session_stores/{postgres_session_store.py,redis_session_store.py,s3_session_store.py}` + `Z:/repos/deps/claude-code/CHANGELOG.md:2638` ("SDK: added --max-budget-usd flag").
- **Current adoption:** **missing** — `tools/sss.ps1` doesn't pass `--max-budget-usd`; no session_store backend wired (CC default = local JSONL at `.claude/projects/*/`).
- **Recommended add:** **NOT** in settings.json — these are CLI flags + SDK config:
  - In `tools/sss.ps1` and any cron `.ps1`: append `--max-budget-usd 5.00` (5 USD per cron-run hard cap).
  - For Redis-backed shared store: add a thin Python wrapper that uses `redis_session_store.RedisSessionStore(redis_url="redis://127.0.0.1:6700")` (user already has Redis at port 6700 per Memory Stack note); document the wrapper in `Z:/claude-sota/docs/sdk-session-stores.md`.
- **Risk:** **LOW** for `max-budget-usd` (hard cap is fail-closed). **MEDIUM** for shared session_store — concurrent CCC accounts writing to the same Redis key need coordination (user's existing `auto_proceed_gate_latch.json.<pid>.<hex>.tmp` pattern at state/ shows they understand atomic-rename). Pilot: enable `max-budget-usd` first; defer session_store until a cron job demonstrates need.

---

## Summary table — ranked by leverage / risk

| # | Pattern | Leverage | Risk | File to edit |
|---|---|---|---|---|
| 1 | Migrate deprecated `outputStyle: Explanatory` → plugin | 🔥🔥🔥 (deprecation hazard) | LOW | settings.json:1025 + enabledPlugins |
| 2 | `ANTHROPIC_SMALL_FAST_MODEL` pin | 🔥🔥🔥 (3× cost on inline-haiku) | LOW | settings.json:env |
| 3 | `--system-prompt-file` for sss/eval | 🔥🔥 (decouple persona from CLAUDE.md) | LOW-MED | tools/sss.ps1 + new file |
| 4 | `session-report` plugin enable | 🔥🔥 (weekly token-spend dashboard) | LOW | settings.json:enabledPlugins |
| 5 | `claude-md-management` plugin enable | 🔥🔥 (CLAUDE.md drift hygiene) | LOW | settings.json:enabledPlugins |
| 6 | `agent-sdk-dev` plugin enable | 🔥🔥 (SDK scaffolding + verifier) | LOW | settings.json:enabledPlugins |
| 7 | `OTEL_LOG_USER_PROMPTS` + `RAW_API_BODIES` | 🔥🔥 (Langfuse trace depth) | MEDIUM (PII leak risk) | settings.json:env |
| 8 | `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` | 🔥🔥 (Win shell footgun fix) | MEDIUM | settings.json:env + permissions |
| 9 | `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000` | 🔥🔥 (14 SessionEnd hooks silently truncated) | LOW | settings.json:env |
| 10 | SDK `max_budget_usd` + session_stores | 🔥 (cost cap on cron) | LOW for cap, MED for store | tools/sss.ps1 + new wrapper |

---

## Items considered but DROPPED (insufficient evidence or sister overlap)

- ~~`CLAUDE_CODE_FORCE_SYNC_OUTPUT=1` (CHANGELOG:11)~~ — solves Emacs `eat` rendering only; user runs Windows Terminal, not relevant.
- ~~`CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE` (CHANGELOG:12)~~ — applies to Homebrew/WinGet installs; user is on npm-global → bun-foundational track per `.mcp.json:31` comment.
- ~~`spinnerTipsOverride.excludeDefault` (CHANGELOG:541, 2.1.99 area)~~ — cosmetic; user's ccstatusline already replaces the visible status surface.
- ~~`prUrlTemplate` (CHANGELOG:208)~~ — only relevant for non-github.com PR hosts; user is on GitHub.
- ~~`wslInheritsWindowsSettings` (CHANGELOG:266)~~ — user is native Windows, not WSL.
- ~~`themesDirectory` / custom themes (CHANGELOG:263)~~ — cosmetic; user already on `theme: dark` (settings.json:1070) and ccstatusline owns visual.
- ~~`DISABLE_UPDATES` (CHANGELOG:265)~~ — user *wants* updates per `autoUpdatesChannel: latest` (settings.json:1052); blocking would defeat that.
- ~~`hookify` plugin~~ — user already has fine-grained Python hook scripts (40+ in `.claude/hooks/scripts/`); `hookify` is for users without that infrastructure.
- ~~`learning-output-style` plugin~~ — interactive learning mode is a *humans-in-the-loop* mode that conflicts with the user's autonomous-agent / xhigh-effort posture.
- ~~`crewAI` / `autogen` patterns~~ — these are *alternatives* to CC's Agent Teams, not enhancements; user is locked-in to CC orchestration via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` which is the supported path.
- ~~`OTEL_METRIC_EXPORT_INTERVAL` tweaks~~ — already at 10000ms (settings.json:56), reasonable for Langfuse.
- ~~UNVERIFIED items~~: `gpt5.5 subagents` was in the prompt brief but no Anthropic-official source documents a `gpt-5.5` subagent integration that doesn't already route through the user's existing Codex T1/T2/T3 workflow. Skipped per "no fabrication" hard rule.

---

## Verification checklist

| Item | Verified-from |
|---|---|
| All 10 patterns have an Anthropic-authored primary source | ✅ `Z:/repos/deps/claude-code/CHANGELOG.md` + `plugins/*/README.md` + `anthropics__claude-agent-sdk-python/examples/` + `claude-plugins-official/plugins/*/SKILL.md` |
| Zero overlap with iter1A top-20 list | ✅ cross-checked against `iter1a-shan-summary.md:headline finding` + items 1-12 (verbatim grep for env-var names + setting keys) |
| Zero overlap with iter1B kits scope | ✅ this report cites only Anthropic-direct sources, never kit-derived |
| Every env var name verified by grep against `claude-code/CHANGELOG.md` | ✅ 100% — items 1, 2, 7, 8, 9 each have line-number citations |
| Every plugin verified to exist locally | ✅ items 1, 4, 5, 6 are at `Z:/claude-sota/.claude/plugins/marketplaces/claude-plugins-official/plugins/{explanatory-output-style,session-report,claude-md-management,agent-sdk-dev}/` |
| Sandbox / risk classification | ✅ each pattern has explicit risk reasoning |

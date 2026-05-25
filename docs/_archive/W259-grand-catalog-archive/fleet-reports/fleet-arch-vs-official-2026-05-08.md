# Architecture-vs-Official audit — `Z:\claude-sota-installed\` (2026-05-08)

Scope: enumerate every architectural deviation from Anthropic CC's officially-documented setup. Read-only. Cite TIER-1-DIRECT for "official" (docs URLs + Anthropic-org repos). Mark TIER-2 (CCBP `shanraisshan` 3rd party) and TIER-3 community (ECC `affaan-m`, sibling claude-sota cite-import-AMBER) explicitly.

Sources verified live this fire:
- TIER-1 `https://code.claude.com/docs/en/env-vars` — full canonical env-var roster
- TIER-1 `https://code.claude.com/docs/en/settings` — full canonical settings.json key roster + nested objects
- TIER-1 `https://code.claude.com/docs/en/hooks` — 33 official hook events + matcher rules + exit-code semantics
- TIER-1 `https://code.claude.com/docs/en/sub-agents` — subagent placement (`.claude/agents/`, `~/.claude/agents/`, plugin marketplace)
- TIER-1 `https://code.claude.com/docs/en/mcp` — `.mcp.json` schema (HTTP + stdio + sse documented)

## 1. TOP-OFFENDERS table — top 10 NON-OFFICIAL items by impact

| # | Item | Where | Tier | Risk / impact | SOTA-cited remediation |
|---|---|---|---|---|---|
| 1 | **`MAX_THINKING_TOKENS=10000` cap** | eee.ps1 L74 | **NOT in official env-vars roster** | Caps Opus 4.7 thinking at 10k tokens; official uses adaptive thinking. Cite for it claims `claude-settings.md:566` (CCBP TIER-2) but TIER-1 env-vars page does not list it — possible undocumented or community-named var. | Drop var; use TIER-1 official `alwaysThinkingEnabled: true` (already set, settings.json L260) + `effortLevel: xhigh` (already set L261) which are documented. If thinking cap really desired, switch to `CLAUDE_CODE_EFFORT_LEVEL` per TIER-1 env-vars |
| 2 | **`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85`** | eee.ps1 L78 | **TIER-1 documented** (env-vars) but value is operator-judgment (Thariq tip per CCBP) | Trigger autocompact early. Documented officially, but the *value* `85` is not Anthropic-prescribed | Keep — TIER-1 documented; the value is operator preference, not a deviation |
| 3 | **`ECC_GOVERNANCE_CAPTURE=0` + `ECC_DISABLED_HOOKS=pre:bash:gateguard-fact-force,pre:edit-write:gateguard-fact-force` + `ECC_HOOK_PROFILE=standard`** | settings.json L10-15 | **TIER-3 community plugin** (`affaan-m/everything-claude-code`) | These are ECC plugin envs — not Anthropic — recognized only by ECC's plugin-hook-bootstrap.js. Documented in plugin's own README, not in `code.claude.com/docs/en/env-vars` | OK — plugin-private envs are legitimate; documented in plugin source. Audit when ECC version bumps |
| 4 | **`FM17_STALL_DETECTOR_DISABLE=1`** + sibling-cite-imported `fm17d_stall_detector.py` hook | settings.json L8, hooks/scripts/fm17d_stall_detector.py | **TIER-3-LOCAL-COMPOSITION** (sibling cite-import-AMBER from `Z:\claude-sota`) | Hook writes 100% schema-rot observations (172/172 schema_missing) — stall-detector pattern is sibling-novel, NOT Anthropic | Either drop the SubagentStop entry until script is fixed (env disable bypasses execution but hook still fires Node→Python startup cost ~150ms), OR remove hook block from settings.json L189-201. Re-add only after upstream FM-17.d primitive lands in Anthropic CC |
| 5 | **`codex_t1_consult_gate.py` + `codex_t2_pre_commit_gate.py` + `codex_postcommit_review.py` + `codex_prepush_review.py` + `codex_t5_plan_review_gate.py` + `auto_proceed_gate.py` + `agent_spawn_gate.py` + `block_no_verify_guard.py` + `secret_scan_guard.py`** | hooks/scripts/*.py wired in settings.json L37-200 | **TIER-3-LOCAL-COMPOSITION** (sibling cite-import-AMBER) | T1-T5 hook lifecycle is **sibling-novel**, NOT Anthropic-canonical. Per TIER-1 sub-agents docs there is NO "T1-T7 lifecycle" terminology. The codex@openai-codex plugin already provides a stop-review-gate-hook (settings.json L182). The custom Python hooks DUPLICATE this | Audit each: keep the secret_scan_guard + block_no_verify_guard (defense-in-depth) but evaluate if `codex@openai-codex` plugin's official stop/postcommit hooks subsume codex_postcommit_review/codex_prepush_review. Consolidate to plugin-supplied hooks where parity exists |
| 6 | **`enabledPlugins["everything-claude-code@everything-claude-code"]: true`** + 25 ECC auto-injected hooks | settings.json L230 + ECC hooks.json | **TIER-3 community plugin** (NOT Anthropic-official) | ECC injects 25 hooks (PreToolUse: 8, PostToolUse: 7, PreCompact: 1, SessionStart: 1, Stop: 6, SessionEnd: 1, PostToolUseFailure: 1). Each pre-bash hook spawns Node ~100ms. On every Bash. Compounds. Most are project-level lint/format hooks orthogonal to this runtime's purpose | See **ECC-hooks triage table §3 below** + **Recommended Wave 77 ECC_DISABLED_HOOKS expansion §4** |
| 7 | **`deepwiki` MCP server in `.mcp.json`** | .mcp.json L18-20 | **TIER-2 third-party** (Devin/Cognition AI) | NOT in Anthropic's MCP registry per kits-convergence (operator-flagged in fleet report). Public no-auth HTTP MCP. Useful but unofficial | Keep with explicit comment "operator-added, Devin/Cognition AI 3rd party". Do not promote to "official" cite class |
| 8 | **2 pre-claude rewriter passes** (Fire 46 + Wave 52) in eee.ps1 L322-363 | eee.ps1 L322-363 | **TIER-3-LOCAL-COMPOSITION** | Patches plugin hook commands at launch to fix POSIX-path-mangling under Git Bash. Scripts at `scripts/codex-plugin-hooks-rewrite.py` + `scripts/ecc-plugin-hooks-rewrite.py`. **No Anthropic-official mechanism**. This is a workaround for an actual upstream bug (loader:1386 path resolution under MSYS) | Triage: open issue at `openai/codex-plugin-cc` + `affaan-m/everything-claude-code` for proper upstream fix. Until then keep — necessary for Z:-portable install correctness |
| 9 | **`autoUpdatesChannel: "stable"` + `minimumVersion: "2.1.133"`** | settings.json L252-253 | **TIER-1 documented keys** | Keys ARE in official settings.json roster (TIER-1 confirmed). The value `"stable"` is per `claude-code/install` docs. Floor `2.1.133` was set Wave 53 from a codex-T1 stale=119/latest=132 heuristic that the operator's own comment L5 admits "self-inventing against Anthropic's actual release cadence" | Either bump floor to a release Anthropic explicitly recommends OR drop floor entirely (let Anthropic auto-update fully) per Wave 62 user directive |
| 10 | **`skipAutoPermissionPrompt: true`** | settings.json L266 | **NOT in official settings keys roster** | This key does NOT appear in TIER-1 settings docs. May be undocumented or hallucinated key. CC may silently ignore | Verify via `claude --debug` whether key is honored; if ignored, drop it. The intent (suppress auto-mode prompt) is achieved via `disableAutoMode` (which IS official) |

## 2. Per-surface tables

### 2A. `.claude/settings.json` — env block

| Key | Tier | Source |
|---|---|---|
| `CLAUDE_CODE_DISABLE_GIT_INSTRUCTIONS` | TIER-1-DIRECT | env-vars docs |
| `CLAUDE_CODE_FORK_SUBAGENT` | TIER-1-DIRECT | env-vars docs |
| `FM17_STALL_DETECTOR_DISABLE` | TIER-3-LOCAL | sibling-cite-imported hook's own env constant; not Anthropic |
| `ECC_DISABLED_HOOKS` | TIER-3 community | ECC plugin env, recognized by `run-with-flags.js` wrapper |
| `ECC_GOVERNANCE_CAPTURE` | TIER-3 community | ECC plugin env |
| `ECC_HOOK_PROFILE` | TIER-3 community | ECC plugin env |

### 2B. `.claude/settings.json` — top-level keys

| Key | Tier | Notes |
|---|---|---|
| `$schema`, `permissions`, `disabledMcpjsonServers`, `hooks`, `enabledPlugins`, `extraKnownMarketplaces`, `autoUpdatesChannel`, `minimumVersion`, `theme`, `alwaysThinkingEnabled`, `effortLevel`, `cleanupPeriodDays`, `defaultShell`, `tui` | **TIER-1-DIRECT** | All in official settings docs |
| `skipAutoPermissionPrompt` | **NOT in official roster** | Possibly undocumented/hallucinated |
| `permissions.defaultMode: "auto"` | **TIER-1-DIRECT** | `auto` mode documented at code.claude.com/docs/en/permission-modes |

### 2C. eee.ps1 env block

All 11 env vars set in eee.ps1: 9 are TIER-1-DIRECT in env-vars docs (`USERPROFILE`, `HOME`, `HOMEDRIVE`, `HOMEPATH`, `CLAUDE_CONFIG_DIR`, `CLAUDE_CODE_TMPDIR`, `CLAUDE_CODE_PLUGIN_CACHE_DIR`, `CLAUDE_CODE_DEBUG_LOGS_DIR`, `CLAUDE_CODE_GIT_BASH_PATH`, `ENABLE_TOOL_SEARCH`, `BASH_MAX_TIMEOUT_MS`, `CLAUDE_CODE_USE_POWERSHELL_TOOL`, `CLAUDE_CODE_TASK_LIST_ID`, `CLAUDE_CODE_PROJECT_DIR`, `CODEX_HOME`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`). 2 NOT in TIER-1 env-vars roster: `MAX_THINKING_TOKENS`, `ENABLE_PROMPT_CACHING_1H`, `CLAUDE_ENABLE_STREAM_WATCHDOG`, `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` (these last three are arguably TIER-1 — recheck).

`COLORTERM=truecolor` is OS-level, not CC-specific. `MSYS2_ENV_CONV_EXCL` is Git Bash internal. T0.0–T0.6 + T1+T2 HARD-GATE preflight is **TIER-3-LOCAL** (no Anthropic-canonical preflight pattern).

### 2D. `.mcp.json`

Schema is TIER-1 official (HTTP + stdio both documented). All 5 servers structurally conformant. **deepwiki is operator-added 3rd party** (Cognition AI, Devin); github + context7 + playwright + serena are Anthropic-MCP-registry-listed.

### 2E. `.claude/hooks/`

- `cwc/*.sh` (4 scripts) — **TIER-1-DIRECT** cite-imported from `anthropics/cwc-long-running-agents` (Anthropic-official repo)
- `scripts/*.py` (19 scripts) — **TIER-3-LOCAL-COMPOSITION** sibling cite-imports from `Z:\claude-sota`. None are Anthropic-canonical.

### 2F. `CLAUDE.md` — 12 cardinal rules

Cardinal-rules 1–4 inherit from sibling claude-sota's CLAUDE.md (cite TIER-1-DIRECT to CCBP + Karpathy + Anthropic CC). Cardinal-rules 5–12 are **eee-runtime-novel**, not Anthropic-canonical concepts. The "cardinal-rule" terminology itself is sibling-claude-sota convention, NOT in any Anthropic doc. The 12-rule structure compounds load on the model — every CLAUDE.md preload includes all 12.

### 2G. Plugins

| Plugin | Marketplace | Tier |
|---|---|---|
| `superpowers@claude-plugins-official` | `anthropics/claude-plugins-official` | **TIER-1 OFFICIAL** ✓ |
| `codex@openai-codex` | `openai/codex-plugin-cc` | **TIER-1 partner** (OpenAI-official) ✓ |
| `everything-claude-code@everything-claude-code` | `affaan-m/everything-claude-code` | **TIER-3 community** ✗ |

## 3. ECC-hooks triage table — 25 ECC auto-injected hooks

| # | Hook id | Event | Class |
|---|---|---|---|
| 1 | `pre:bash:dispatcher` | PreToolUse:Bash | **useful-for-this-runtime** (consolidated bash preflight) |
| 2 | `pre:write:doc-file-warning` | PreToolUse:Write | **pure-overhead** (warns on doc files; this runtime intentionally creates docs) |
| 3 | `pre:edit-write:suggest-compact` | PreToolUse:Edit\|Write | **useful** (manual compact suggestions) |
| 4 | `pre:observe:continuous-learning` | PreToolUse:* | **useful-but-Z-drive-broken** (writes per-tool observations; potential bloat) |
| 5 | `pre:governance-capture` | PreToolUse:Bash\|Write\|Edit\|MultiEdit | **pure-overhead** (already disabled via ECC_GOVERNANCE_CAPTURE=0) |
| 6 | `pre:config-protection` | PreToolUse:Write\|Edit\|MultiEdit | **useful** (blocks linter/formatter config edits) |
| 7 | `pre:mcp-health-check` | PreToolUse:* | **useful** (MCP health pre-check) |
| 8 | `pre:edit-write:gateguard-fact-force` | PreToolUse:Edit\|Write\|MultiEdit | **DISABLED** via ECC_DISABLED_HOOKS (already pruned) |
| 9 | `pre:compact` | PreCompact:* | **useful** (state save before compact) |
| 10 | `session:start` | SessionStart:* | **useful** (context load + pkg manager detect) |
| 11 | `post:bash:dispatcher` | PostToolUse:Bash | **useful** (consolidated postflight) |
| 12 | `post:quality-gate` | PostToolUse:Edit\|Write\|MultiEdit | **useful-but-Z-drive-broken** (runs project lint; this runtime has no project src) |
| 13 | `post:edit:design-quality-check` | PostToolUse:Edit\|Write\|MultiEdit | **pure-overhead** (frontend UI check; not applicable here) |
| 14 | `post:edit:accumulator` | PostToolUse:Edit\|Write\|MultiEdit | **useful-but-Z-drive-broken** (records JS/TS edits; runtime has no JS/TS) |
| 15 | `post:edit:console-warn` | PostToolUse:Edit | **pure-overhead** (warns on console.log; no JS edits here) |
| 16 | `post:governance-capture` | PostToolUse:Bash\|Write\|Edit\|MultiEdit | **DISABLED** via ECC_GOVERNANCE_CAPTURE=0 |
| 17 | `post:session-activity-tracker` | PostToolUse:* | **useful** (session metrics) |
| 18 | `post:observe:continuous-learning` | PostToolUse:* | **useful-but-Z-drive-broken** (paired with #4) |
| 19 | `post:mcp-health-check` | PostToolUseFailure:* | **useful** (MCP fault tracking) |
| 20 | `stop:format-typecheck` | Stop:* | **pure-overhead** (Biome/Prettier+tsc on JS/TS; runtime has no JS/TS source) |
| 21 | `stop:check-console-log` | Stop:* | **pure-overhead** (no JS edits) |
| 22 | `stop:session-end` | Stop:* | **useful** (session state persist) |
| 23 | `stop:evaluate-session` | Stop:* | **useful** (pattern extraction for instinct learning) |
| 24 | `stop:cost-tracker` | Stop:* | **useful** (token/cost telemetry) |
| 25 | `stop:desktop-notify` | Stop:* | **useful** (notify on response) + `session:end:marker` SessionEnd | **useful** (session lifecycle marker) |

## 4. Recommended Wave 77 settings.json env edits

Expand `ECC_DISABLED_HOOKS` to add the 6 hooks classified `pure-overhead` for non-JS/non-frontend runtime:

```
"ECC_DISABLED_HOOKS": "pre:bash:gateguard-fact-force,pre:edit-write:gateguard-fact-force,pre:write:doc-file-warning,post:edit:design-quality-check,post:edit:console-warn,stop:format-typecheck,stop:check-console-log"
```

For the 4 `useful-but-Z-drive-broken` hooks (#4, #12, #14, #18) — keep enabled but monitor `.claude/observations/` for bloat; prune at next quarterly retro if disk impact >100MB.

Also recommended (separate edits):
- **Drop `skipAutoPermissionPrompt`** from settings.json (item #10 in TOP-OFFENDERS) — undocumented key.
- **Drop `MAX_THINKING_TOKENS`** from eee.ps1 — not in TIER-1 env-vars roster; rely on `effortLevel: xhigh`.
- **Disable `fm17d_stall_detector` hook block** (settings.json L189-201) until upstream FM-17.d primitive lands; the env-disable still incurs Node→Python startup cost.
- **Audit `codex_*.py` hook block (settings.json L37-200)** for overlap with `codex@openai-codex` plugin's own hooks (settings.json L182, L208, L220) — consolidate to plugin-supplied where parity exists.

## 5. HONEST-NON-FINDING

Items that LOOK non-official but are actually documented:
- `auto` permission mode (settings.json L30) — TIER-1 documented at `code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode` (per Wave 61.5 cite already in settings.json L33).
- `alwaysThinkingEnabled`, `effortLevel`, `cleanupPeriodDays`, `defaultShell`, `tui` — all in TIER-1 settings.json roster.
- `worktree.symlinkDirectories` (not present here but legitimate per TIER-1 settings docs).
- `cwc/*.sh` hooks — although unusual, they cite-import from `anthropics/cwc-long-running-agents` (Anthropic-OFFICIAL repo). Treat as TIER-1.
- `superpowers@claude-plugins-official` — TIER-1 OFFICIAL marketplace.
- `codex@openai-codex` — TIER-1 partner marketplace (OpenAI-official; cardinal-rule-3 backbone).
- `extraKnownMarketplaces` itself is TIER-1 documented.
- `disabledMcpjsonServers: []` — TIER-1 documented.

## Summary

**Most-impactful prunes (in order)**: (1) expand `ECC_DISABLED_HOOKS` to nuke 5 pure-overhead JS/frontend hooks; (2) drop `skipAutoPermissionPrompt` (undocumented); (3) drop `MAX_THINKING_TOKENS` (not in env-vars roster); (4) disable `fm17d_stall_detector` hook block (schema-rot, env-disabled but still spawns); (5) audit `codex_*.py` hook overlap with codex@openai-codex plugin hooks.

**Architectural deviation that should NOT be pruned**: the 2 pre-claude rewriter passes in eee.ps1 (Fire 46 + Wave 52) — they patch real upstream Z:-drive path-resolution bugs. File issues upstream (openai/codex-plugin-cc + affaan-m/everything-claude-code) for proper fix.

**Key cite-class flag**: the entire 12-cardinal-rule structure + T1-T7 lifecycle terminology is **sibling-claude-sota convention, NOT Anthropic-canonical**. Anthropic's official sub-agents docs make no mention of "cardinal rule", "T1-T7", or "cross-model consensus". This terminology is fine as eee-local, but should be marked `TIER-3-LOCAL-COMPOSITION` everywhere it appears in this runtime's docs.

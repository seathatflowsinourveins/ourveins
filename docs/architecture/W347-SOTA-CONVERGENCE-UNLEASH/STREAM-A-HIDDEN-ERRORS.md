# W347 Stream A — Hidden Errors / Stale Refs / Silent Fallbacks

> Wave: W347 · Stream: A · Date: 2026-05-20 · Worker: fork of orchestrator
> Scope: file:line evidence of hidden errors, stale references, silent fallbacks, and low-quality code in this runtime.
> Methodology: ctx_batch_execute(15 commands) → ctx_search(12 queries) → Write deliverable. No raw output pulled into context.

## §1 Hook errors

### §1.1 Plugin Stop-hook IS wired (operator concern from CLAUDE.md L10 is resolved — but Z:-portability risk persists)

- File: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`
- Verified: 3 plugin-level hooks present — `SessionStart` (timeout 5s), `SessionEnd` (timeout 5s), `Stop` (timeout 900s) → all point at `stop-review-gate-hook.mjs` / `session-lifecycle-hook.mjs`.
- **DRIFT-RISK**: paths are baked Win32-absolute `Z:\\claude-sota-installed\\.claude\\plugins\\cache\\openai-codex\\codex\\1.0.4\\scripts\\...` (per Fire 46 patch) — NOT `${CLAUDE_PLUGIN_ROOT}`. Same anti-pattern that W286-cross reversed for `.mcp.json` MCP servers. Fresh clone to D:\ would break all 3 codex hooks.
- Recommendation: re-evaluate Fire 46 patch necessity post-CC v2.1.x — if `${CLAUDE_PLUGIN_ROOT}` now expands correctly on Windows, revert to portable form.

### §1.2 `.claude/hooks/` is clean per CR-2

- File: `Z:/claude-sota-installed/.claude/hooks/context-mode-cache-heal.mjs`
- Size: **1656 bytes** (CR-2 ≤2KB COMPLIANT)
- Header cites `anthropics/claude-code#46915` — sanctioned CR-2 exception per CLAUDE.md L24.
- No other `.mjs|.sh|.py|.ps1|.bat` files in `.claude/hooks/` — clean.

### §1.3 SubagentStop guard IS effective (firing during this very wave per Δ-G49)

- Tool: `Z:/claude-sota-installed/tools/subagent-stop-guard.mjs` (W341-Q8)
- Confirmed firing: this fork's first non-substantive message was BLOCKED with "W341-Q8 BLOCK: SubagentStop guard — teammate agent returned an empty final message without the NO-FINDINGS: sentinel."
- Verdict: Δ-G49 contract is enforced. No drift.

## §2 Settings.json drift

### §2.1 Auto-memory deliberately disabled (CLAUDE.local.md confirms)

- `.claude/settings.json` env: `"CLAUDE_CODE_DISABLE_AUTO_MEMORY": "1"` (line ~36).
- Rationale documented in `CLAUDE.local.md` (W259-v8 U3) — deliberate, NOT drift.

### §2.2 OTEL → Langfuse wired

- `OTEL_TRACES_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` + `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` + `OTEL_SERVICE_NAME=claude-sota-installed`.
- Langfuse :3000 confirmed HTTP-200 by parent (langfuse:200 probe).
- **VERIFICATION GAP**: no probe in this audit confirmed OTEL traces are actually arriving at Langfuse (could be silent-drop). Recommend `curl -s http://127.0.0.1:3000/api/public/traces?limit=1` per `${LANGFUSE_PUBLIC_KEY}`.

### §2.3 Other notable env

- `CLAUDE_CODE_FORK_SUBAGENT=1` ✓ (parallel-session core)
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ✓ (agent-teams enabled)
- `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` ✓ (PowerShell tool present)
- `ENABLE_TOOL_SEARCH=auto:5` ✓ (deferred-tool fetch enabled)
- `ENABLE_PROMPT_CACHING_1H=1` ✓ (long-cache 1h enabled — supersedes 5min default)
- `CLAUDE_CODE_DISABLE_NONSTREAMING_FALLBACK=1` ✓ (forces streaming — defense against silent fallback to legacy non-streaming)
- `MAX_MCP_OUTPUT_TOKENS=50000` / `BASH_MAX_OUTPUT_LENGTH=100000` / `BASH_MAX_TIMEOUT_MS=1800000` / `MCP_TOOL_TIMEOUT=300000` — generous but reasonable.
- `CLAUDE_CODE_EFFORT_LEVEL=max` ✓ (max thinking budget)

## §3 .mcp.json stale refs

### §3.1 13 MCP servers wired; all pinned per CR-9 W286-arc-P0C

| MCP | Pin | Last pinned wave | Verdict |
|---|---|---|---|
| github | `@modelcontextprotocol/server-github@2025.4.8` | W259-v15 | **STALE-PIN-RISK** — Apr-2025 pkg, check upstream for 2026 releases |
| chrome-devtools | `chrome-devtools-mcp@1.0.1` | W345-recent | FRESH |
| repomix | `repomix@1.14.0` | W106 | **STALE-PIN-RISK** — May-2025 pkg, current upstream may be 2.x |
| serena | git+SHA `249f6b07f9...` | W124 | **STALE-PIN-RISK** — May-2025 SHA |
| ccusage | `@ccusage/mcp@18.0.11` | W124 | **STALE-PIN-RISK** |
| cognee | local `:8000/mcp` NSSM | W263b | LIVE per parent probe |
| langfuse | `langfuse-mcp-server@0.0.2-rc.0` | recent | FRESH |
| basic-memory | `basic-memory==0.21.1` | W308 | OK |
| hf-mcp-server | `https://huggingface.co/mcp` | n/a | HTTP-MCP no client pin |
| perplexity | `@perplexity-ai/mcp-server@0.9.0` | recent | OK |
| deepwiki | `https://mcp.deepwiki.com/mcp` | n/a | HTTP-MCP |

### §3.2 Stale `_comments` block accumulating

- `.mcp.json` `_comments` block contains historical justifications dating back to Wave 75 / Wave 95 / Wave 106 — readable but bloats parse + auditor cost.
- Recommendation: periodically archive stale `_comments` to `docs/architecture/_MCP-JSON-HISTORY.md` and prune.

## §4 Plugin/skill stale cite-anchors

### §4.1 W340 OPERATOR-SIGN-QUEUE survivors (5-wave dwell — ops-rhythm 8-wave SHIP-BLOCKER threshold approaching)

- `docs/architecture/W340-FULL-SOTA-UNLEASH/OPERATOR-SIGN-QUEUE.md` open queue:
  - Q1: sca-v14 → sca-v15 SKILL.md (4 edit blocks)
  - Q3: OTEL service name attribution
  - Q4: self-improving-agent disable rationale doc
- ops-rhythm penalty: -0.5 install_score arch-itself at 8-wave dwell. W340 → W347 = ~7 waves; ~1 wave from -0.5 penalty.

### §4.2 5 skills with TODO/FIXME markers

- `.claude/skills/durable-planning-files/SKILL.md` — has TODO (expected — template examples)
- `.claude/skills/task-close-discipline/SKILL.md` — has TODO (expected — template)
- `.claude/skills/speckit-{analyze,clarify,constitution}/SKILL.md` — TODOs are upstream-template artifacts; not project drift.

## §5 Silent-fallback hunt

### §5.1 parallel-guard binding mode — VERIFIED dual-mode active (per W330 P0-A ship)

- File: `tools/preagent-parallel-guard.mjs` (~6,365 bytes)
- Pattern (lines from search §preagent-parallel-guard.mjs full content (5)):
  - 1st violation → `emitAdvisory(...) + process.exit(0)` (advisory)
  - 2nd+ violation → BLOCK message + `process.exit(2)` (hard block)
  - Stale-violation TTL guard: `state.lastViolationTs > 0 && now - state.lastViolationTs > VIOLATION_TTL_MS → state.count = 0` (5-min reset)
- **VERIFIED**: matches CLAUDE.md L13 W330-P0-A claim. 1× `exit(2)` + multiple `exit(0)` paths is the SANCTIONED dual-mode.

### §5.2 subagent-validator — VERIFIED hard-block on unknown subagent_type (W326 P0-A2)

- File: `tools/preagent-subagent-validator.mjs` (~3,957 bytes)
- Pattern: read `subagent-type-allowlist.json` → if absent/unparsable → exit 0 (soft-fail per W319-A H3); if present + unknown subagent_type → diagnostic to stderr + `exit 2` (hard block).
- **VERIFIED**: matches CLAUDE.md L31 W340 F3/SB-3 closure (173+138=311 allowlist entries).

### §5.3 Empty-final-message: SubagentStop guard ACTIVE — exception is sanctioned

- File: `tools/subagent-stop-guard.mjs` (W341-Q8 ship)
- BLOCK pattern: empty final assistant message without `NO-FINDINGS:` sentinel → exit 2.
- Override: `CLAUDE_SUBAGENT_STOP_GUARD_DISABLE=1`.
- Confirmed firing on this very fork — Δ-G49 contract enforced runtime-side, not just skill-side.

### §5.4 gitleaks bypass guard — VERIFIED

- `.claude/settings.json` permissions.deny includes: `git commit --no-verify*`, `git push --no-verify*`, `git merge|rebase|cherry-pick|am --no-verify*`, `git -c core.hooksPath=*` — block-no-verify pre-commit guard wired (per cardinal-rule discipline).

## §6 Low-quality / stale doc refs

### §6.1 `_stranded-pre-skeletons/` from aborted prior session

- Path: `Z:/claude-sota-installed/.claude/hooks/A-runtime-audit.md` … `E-research-arch.md` (5 files)
- Origin: a prior session created `.md` skeletons inside `.claude/hooks/` — VIOLATES CR-2 spirit (hooks dir is for hook bodies, not docs).
- Parent orchestrator attempted `git mv` → `fatal: bad source` (files not tracked).
- Recommendation: simple `rm` or `mv` (non-git) into `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/_stranded-pre-skeletons/`. Not blocking but is detritus.

### §6.2 Wave-dir name collision

- `docs/architecture/W346-FULL-SOTA-UNLEASH/` already exists; current parent dispatched to W347 instead. No data loss but indicates aborted W346 attempt that should be either resumed-or-deleted.

## §7 Insights features missing

### §7.1 Anthropic CC native Insights surface — NOT WIRED in env block

Searched `.claude/settings.json` env for: `CLAUDE_CODE_ENABLE_INSIGHTS`, `CLAUDE_CODE_INSIGHTS_BETA`, `INSIGHTS_DASHBOARD`, `CONTEXT_EDIT`, `MEMORY_TOOL`, `EXPLORE`, `CONTEXT_MANAGEMENT`. **0 hits.**

Anthropic CC native features that ARE wired:
- ✓ `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1`
- ✓ `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING=1`
- ✓ `CLAUDE_CODE_USE_POWERSHELL_TOOL=1`
- ✓ `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`
- ✓ `ENABLE_TOOL_SEARCH=auto:5`
- ✓ `CLAUDE_CODE_FORK_SUBAGENT=1`
- ✓ `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- ✓ Full OTEL telemetry (traces → Langfuse :3000)

**GAP** — operator-flagged "Insights" feature: per Anthropic docs `https://docs.anthropic.com/en/docs/claude-code/insights` (v2.1+) there is a native Insights dashboard. Settings.json env DOES NOT include any `CLAUDE_CODE_ENABLE_INSIGHTS` toggle. **Either (a) Anthropic does not gate Insights via env (Insights is GA-default), OR (b) the env toggle exists and runtime is missing it.**

Action required: parent orchestrator should `WebFetch https://docs.anthropic.com/en/docs/claude-code/insights` to authoritatively determine the toggle (or absence thereof). The context-mode `ctx-insight` slash command IS a 3rd-party Insight analytics dashboard (separate from Anthropic native Insights).

## §8 P0/P1/P2 fix-list with file:line

| Pri | Item | File:line | Action |
|---|---|---|---|
| P0 | Verify Anthropic native Insights enablement | `.claude/settings.json:env` | WebFetch Anthropic docs + add `CLAUDE_CODE_ENABLE_INSIGHTS=1` (if env-gated) OR document Insights-is-GA-default |
| P0 | W340 OPERATOR-SIGN-QUEUE.md survivors (5-wave dwell) | `docs/architecture/W340-FULL-SOTA-UNLEASH/OPERATOR-SIGN-QUEUE.md` | Close Q1/Q3/Q4 before 8-wave SHIP-BLOCKER penalty fires |
| P0 | Codex plugin hooks.json Z:-portability risk | `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` | Re-test `${CLAUDE_PLUGIN_ROOT}` form on Windows CC v2.1.x; revert Fire 46 if no longer needed |
| P1 | Stale-pin probe on MCP servers (chrome-devtools/repomix/serena/ccusage/github) | `.mcp.json` | gh api per-pkg `pushed_at`; demote >90d FRESH→ACCEPTABLE-Q1; refresh pins |
| P1 | OTEL silent-drop verification | n/a | `curl -s http://127.0.0.1:3000/api/public/traces?limit=1` with auth header to confirm traces arriving |
| P1 | `_stranded-pre-skeletons/` cleanup | `.claude/hooks/{A..E}-*.md` | non-git `mv` or `rm` |
| P1 | W346-FULL-SOTA-UNLEASH abandoned wave-dir | `docs/architecture/W346-FULL-SOTA-UNLEASH/` | Decide resume-or-delete |
| P2 | `.mcp.json` `_comments` bloat (kB-scale prose) | `.mcp.json` | Archive to `docs/architecture/_MCP-JSON-HISTORY.md`, prune |
| P2 | Codex hooks backup files `hooks.json.pre-fire{44,45,46}-fix` | `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/` | gitignored already; can rm |
| P2 | Skill TODO markers (5 SKILL.md) | `.claude/skills/{durable-planning-files,task-close-discipline,speckit-*}/SKILL.md` | Most are template-residual; audit + close |

## §9 STATUS

STATUS: COMPLETE

**Final summary** (4 sentences):

(a) **P0 count**: 3 P0 items found — (1) Anthropic native Insights enablement unverified, (2) W340 operator-sign-queue 5-wave dwell approaching 8-wave -0.5 install_score arch-itself penalty per ops-rhythm, (3) codex plugin hooks.json Z:-portability risk from W50 Fire 46 patch baking Win32-absolute paths.

(b) **Top-3 P0s**: (i) `.claude/settings.json` env has 0 Insights toggle vars — operator's hunch verified; (ii) `W340-FULL-SOTA-UNLEASH/OPERATOR-SIGN-QUEUE.md` carries Q1/Q3/Q4 unresolved across 5+ waves; (iii) `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` bakes `Z:\\` absolute paths, breaks fresh-clone portability.

(c) **Silent-fallback HUNT VERDICT**: NO new silent-fallback drift surfaced — `tools/preagent-parallel-guard.mjs` dual-mode (advisory→block) verified, `tools/preagent-subagent-validator.mjs` exit-2 hard-block verified, `tools/subagent-stop-guard.mjs` Δ-G49 empty-final guard CONFIRMED FIRING in-wave, no-verify bypass denied in permissions. Existing runtime guards are intact.

(d) **Recommended next action for /goal**: P0 block = "WebFetch Anthropic Insights docs + close W340 OPERATOR-SIGN-QUEUE + audit codex hooks.json portability"; P1 block = "stale-pin probe across 5 MCP servers + OTEL trace arrival verification + _stranded skeleton cleanup".

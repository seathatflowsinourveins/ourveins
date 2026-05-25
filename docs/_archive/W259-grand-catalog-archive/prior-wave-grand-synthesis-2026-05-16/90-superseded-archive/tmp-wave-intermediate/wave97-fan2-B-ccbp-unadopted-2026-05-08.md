# Wave 97 Fan-2 Agent B — CCBP shan unadopted patterns (post-Wave-52-iter1a + post-Wave-97 ships)

STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL stand-in (Anthropic Max Opus depletion fallback per CLAUDE.local.md ENV (g)) per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate; cross-model gate NOT structurally satisfied for this dispatch (BIDIRECTIONAL discovery dispatch — no commits proposed; verdict is read-only research).

## Executive summary

| Metric | Count |
|---|---|
| Files audited | 6 (claude-settings.md / claude-cli-startup-flags.md / claude-mcp.md / claude-subagents.md / claude-skills.md / claude-memory.md) + Wave 52 iter1a baseline + Wave 52 iter2b TOP-10 baseline |
| Patterns examined | ~200 (60+ settings keys + 175+ env vars + flags + commands + 16+16+15 frontmatter fields) |
| ALREADY-ADOPTED in current eee env | ~35 |
| ALREADY-EXTRACTED in Wave 52 iter1a top-20 + iter2b TOP-10 | 30 |
| HIGH-leverage NEW gaps | 6 |
| MED-leverage NEW gaps | 4 |
| LOW-leverage NEW gaps | 3 |

## Top-N HIGH-leverage UNADOPTED patterns (ranked)

### Pattern 1: `worktree.sparsePaths` (re-flagged from iter1a #7)
- CCBP cite: `claude-settings.md:131-143 @ HEAD 64fffd53` + `claude-subagents.md:34`
- Type: settings.json top-level
- Risk: LOW
- Why HIGH-leverage: agents declare `isolation: worktree`; sparse paths reduce per-worktree disk + index walk

### Pattern 2: `language: "english"` (v2.1.121 — sets terminal tab title)
- CCBP cite: `claude-settings.md:73 @ HEAD 64fffd53`
- Risk: LOW (cosmetic + locale)
- Why: NEW v2.1.121 — terminal tab title visual win for multi-window sessions

### Pattern 3: `availableModels: ["opus", "haiku"]` (model-picker scope lock)
- CCBP cite: `claude-settings.md:79 @ HEAD 64fffd53`
- Risk: LOW
- Why: prevents accidental model drift; caps fleet-cost surface

### Pattern 4: `disableSkillShellExecution` (security; v2.1.91)
- CCBP cite: `claude-settings.md:90 @ HEAD 64fffd53`
- Risk: LOW-MED
- Why: 9 plugins + 6 marketplaces = expanded skill shell-execution surface; pairs with current `defaultMode: bypassPermissions`

### Pattern 5: `--max-budget-usd` + `--max-turns` for scripted runs
- CCBP cite: `claude-cli-startup-flags.md:133-134`
- Type: print-mode CLI flag (NOT settings.json)
- Risk: LOW
- Why: pre-empt cron usage growth (cwc primitives); hard-cap fail-closed

### Pattern 6: `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` — **REFUTED**
- CCBP cite: `claude-settings.md:859`
- Anti-pattern check: REFUTED — conflicts with CR-6 auto-update mandate. SKIP.

## Top-N MED-leverage UNADOPTED patterns

### Pattern 7: `MAX_MCP_OUTPUT_TOKENS=50000`
- CCBP cite: `claude-settings.md:822`
- Why: 22 MCP servers + ctx_batch_execute returns large outputs; default 25k may silently truncate

### Pattern 8: `BASH_MAX_OUTPUT_LENGTH` + `BASH_MAX_TIMEOUT_MS`
- CCBP cite: `claude-settings.md:824-825`
- Why: 10+ minute commands (codex T1/T2/T3 + cwc kill-switch); explicit timeout bump prevents silent watchdog hits

### Pattern 9: `MCP_TOOL_TIMEOUT`
- CCBP cite: `claude-settings.md:1071`
- Why: 22 MCP servers + ctx_batch_execute fan-out; per-tool timeout prevents wedged-tool starvation

### Pattern 10: `CLAUDE_CODE_PERFORCE_MODE=1` — **REFUTED**
- CCBP cite: `claude-settings.md:927`
- Anti-pattern check: REFUTED — eee uses git, not p4. SKIP.

## Top-N LOW-leverage UNADOPTED patterns

11. `feedbackSurveyRate: 0.0` — cosmetic
12. `autoConnectIde: false` + `autoInstallIdeExtension: false` — terminal-first eee
13. `CLAUDE_BASH_NO_LOGIN=1` — REFUTED (Windows platform)

## Anti-pattern findings (do NOT adopt)

1. `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` — conflicts with CR-6
2. `outputStyle: Explanatory` (top-level) + `explanatory-output-style` plugin — Wave 97 Ship 1A refuted (always-on hook + token cost)
3. `MAX_THINKING_TOKENS` for Opus 4.7 — Wave 97 Ship 1G refuted (400 errors + cost amplification)
4. `CLAUDE_CODE_PERFORCE_MODE=1` — irrelevant (no p4)
5. `CLAUDE_BASH_NO_LOGIN=1` — Windows platform mismatch
6. `CLAUDE_CODE_SUBAGENT_MODEL` — explicitly UNSET per CLAUDE.local.md ENV (g)
7. `OTEL_LOG_RAW_API_BODIES=1` — DEFERRED (PII risk)
8. `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` — disabled (=0) per iter1a #3

## Recommendations (HIGH-leverage, LOW-risk, ship-ready)

1. **Pattern 2 — `language: "english"`**: 1-line settings.json top-level
2. **Pattern 3 — `availableModels: ["opus", "haiku"]`**: model-picker scope lock
3. **Pattern 4 — `disableSkillShellExecution`**: explicit-default false; log for future flip
4. **Pattern 7 — `MAX_MCP_OUTPUT_TOKENS: "50000"`**: env var
5. **Pattern 9 — `MCP_TOOL_TIMEOUT`**: env var
6. **Pattern 1 — `worktree.sparsePaths`** (re-flagged): low-priority but trivial

VERDICT: complete — ~200 patterns examined / 6 HIGH-leverage NEW gaps / 4 MED-leverage NEW gaps / 3 LOW-leverage NEW gaps + 8 anti-pattern refutations.

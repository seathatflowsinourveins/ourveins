# W327 Stream D — Future-Session Seamless Pickup

**Date**: 2026-05-19 | **Scope**: how do new sessions inherit W325/W326/W327 SOTA invariants without operator hand-feed?
**Sources**: CLAUDE.md (37 LOC) · settings.json (450 LOC, hooks+env) · `mcp__basic-memory__recent_activity` (T6 canonical) · deepwiki `anthropics/claude-code` (SessionStart ≈ CLAUDE.md alternative, per Output Style Plugins wiki).

## 8 sub-items × current × W327-action

| # | Sub-item | Current state | Gap | W327-action |
|---|---|---|---|---|
| 1 | **CLAUDE.md preload** | 50 LOC body (37 lines as of W325 compaction; Architecture+Cardinal-Rules+Pointers+Runtime+Status-pointer) | NO mention of basic-memory query-first idiom · NO W269 parallel-Agent-MUST cite for the in-1-message rule body itself (in L13 prose only) · NO pickup script | **L47 already cites `mcp__basic-memory__search_notes "Wave-N"`** ✓ KEEP — add 1-line "Before new wave, query T6" mandate to L31 Pointers (≤5 LOC budget remaining vs 50-cap) |
| 2 | **Skill auto-discovery** | 35 skills under `.claude/skills/*/SKILL.md` + N plugin-loaded; auto-fire per `description:` match | `parallel-dispatch-mandate` + `mem-recall` + `goal-prompt-synthesis` + `sota-convergence-audit` + `ops-rhythm` are W269/W295/sca-v8.1 carriers — but only fire when description matches new-session prompt | KEEP pointer-only; rely on `description:` trigger words ("audit"/"wave"/"recall"/"prior") which any reasonable operator paste matches |
| 3 | **SessionStart hooks** | 1 hook: `context-mode-cache-heal.mjs` (cardinal-rule-2 exception for upstream bug #46915) | NO mise-activation · NO service-health (Langfuse/Cognee/LlamaSwap) · NO parallel-ratio re-baseline | **DO NOT ADD** — CR-2 forbids project-owned hook bodies except documented upstream-bug shims; service-health belongs in `tools/` lazy-fire scripts invoked by `mem-recall` skill on demand |
| 4 | **CLAUDE_CODE_DISABLE_AUTO_MEMORY=1** | Per W259-v8 U3 in `.claude/settings.json:35` + `autoMemoryEnabled:false` L445 | Auto Memory reintroduces uncontrolled preload growth; T6 basic-memory is the canonical cross-session channel | **KEEP DISABLED** — explicit query via `mcp__basic-memory__search_notes` is SOTA; W259-v16 5-tier memory stack supersedes Anthropic Auto Memory |
| 5 | **T6 basic-memory canonical** | W295-codex-r16+ smoke-gated · 91+ verdict rows queryable · `recent_activity` 3d window returned 15 W316/W317/W319 notes ✓ | New-session operator may not know to query | **L47 pointer already documents it** ✓ — `mem-recall` skill auto-fires on "remember/recall/prior/wave" keywords (`.claude/skills/mem-recall/SKILL.md`) closing the gap |
| 6 | **VERDICT-LEDGER.md** | NOT at repo root (no `Z:/claude-sota-installed/VERDICT-LEDGER.md`); cumulative-ledger lives **inside W288 dir** at `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` + W290 delta + scattered per-wave docs | **CLAUDE.md L46 cites `VERDICT-LEDGER.md` as if at root — STALE** | **W327 ACTION**: either (a) symlink/relocate to repo-root, OR (b) fix L46 path to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — operator decision; current 96-rows claim unverifiable until path resolved |
| 7 | **PreCompact hook** | settings.json:163 logs `auto-compact-fired\|session=$CLAUDE_SESSION_ID` to `tmp/precompact.log` ✓ | NOT surfaced at SessionStart — new session has no signal "last context flushed at X" | **DEFER** — adding SessionStart consumer of precompact.log violates CR-2 (custom hook body); operator can `tail tmp/precompact.log` manually OR `mem-recall` skill can include it on-demand |
| 8 | **Z:-portable env invariants** | HOME=Z:\claude-sota-installed + USERPROFILE=Z:\claude-sota-installed + CLAUDE_PLUGIN_DATA + AUDIT_ROOT et al at settings.json:46-53 ✓; CLAUDE.local.md is gitignored env-block authority | New machine = manual `eee.ps1` apply; STALE-D-7 W319 found env-mirror EMPTY in subagent shell | **KEEP** — settings.json env block IS the canonical apply-mechanism; subagent-shell propagation is upstream bug (W319 P2) |

## Seamless-pickup gate

| Layer | Lives in | Triggers |
|---|---|---|
| **MUST-be-in CLAUDE.md** | 5 cardinal rules · 4 parallel modes · agent-team trigger · T6 query pointer (L47) | Always preloaded |
| **Skill (auto-fire)** | `parallel-dispatch-mandate` · `mem-recall` · `ops-rhythm` · `sota-convergence-audit` · `learned` | `description:` keyword match |
| **Hook (SessionStart)** | ONLY `context-mode-cache-heal.mjs` (upstream bug shim) | CR-2 minimal-surface |
| **basic-memory** | All wave verdicts · ship-gate decisions · FM-class rows · codex prescriptions | Explicit `mcp__basic-memory__search_notes` query |

## Operator-handoff flow

When operator pastes `/goal …W325/W326/W327…`:
1. CLAUDE.md (37 LOC) loads automatically — cardinal rules + L47 T6 pointer establish the discipline.
2. Operator prompt keywords ("audit"/"parallel"/"wave"/"SOTA") fire `mem-recall` + `parallel-dispatch-mandate` + `sota-convergence-audit` skills.
3. `mem-recall` invokes `mcp__basic-memory__search_notes "Wave-N"` returning prior wave ship-verdicts.
4. Cross-model gate fires session-end via plugin-native codex Stop-hook (auto-wired; no project hook needed).

## Top-3 W327 P0 forward-AIs
- **F1**: Fix CLAUDE.md L46 ledger path (currently broken; W327 ops-rhythm escalates if 3+ waves dwell).
- **F2**: Add 1-line "query T6 first" to CLAUDE.md L31 Pointers (≤5 LOC budget) — explicit pickup mandate.
- **F3**: NEW skill `wave-pickup` with description="when starting new wave/session, query basic-memory for prior wave verdicts" — automates step 3 without hook.

**Cardinal-rule status**: R1-R5 ✓ HOLD (R5 SHIP-BLOCKER carry-forward unchanged from W319).

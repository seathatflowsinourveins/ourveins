---
title: W184 round-2 close-synthesis — HOOKS-AUDIT-CLEAN + SOTA-AUTO-COMPACT scope
status: INFLIGHT
date: 2026-05-13
agent: orchestrator
wave: 184-r2
inherits: tmp/wave184-close-synthesis-2026-05-13.md (R1 AUTHORITATIVE-AGGREGATE SHIP STOP-7/8)
---

# W184 Round-2 — HOOKS-AUDIT-CLEAN + SOTA-AUTO-COMPACT + 3-AGENT-CADP-BRIDGE-MODE + AUTH-FLEET + CROSS-SESSION-PRELOAD

Distinct from W184-R1 (POST-RESTART VERIFY + MANIFEST §4.5 + FM-20 row 16 + predicate7-reframe SHIP STOP-7/8). Same wave number, NEW /goal predicate set per user-trigger 2026-05-13.

## STOP-predicate completion (8 / new /goal scope)

| # | Predicate | Status | Evidence |
|---|---|---|---|
| 1 | HOOKS-AUDIT + cite-class table | ✅ DONE | `.backup/wave184/` (9 files cp'd); `docs/hooks-audit-w184.md` cite-class lattice 36 hooks / 13,605 LOC / 38.9% non-SOTA-direct |
| 2 | AUTO-COMPACT SOTA — fcakyon verified + 5 compact REMOVED from settings.json | ⏳ PARTIAL — fcakyon@claude-settings ENABLED VERIFIED (`.claude/settings.json:572`) sourced from `fcakyon/claude-codex-settings` (L651); settings.json removal GATED on Agent A/B/C verdicts (destructive operation) |
| 3 | CROSS-SESSION PRELOAD install | ⏳ GATED on Agent A+C (cwc-long-running-agents PROGRESS.md vs claude-mem trade-off) |
| 4 | 3-AGENT CADP BRIDGE-MODE PARALLEL | ⏳ RUNNING (3/3 saturated): A sota-researcher Probe-DAG-7-repos / B codex-rescue BRIDGE-MODE Path-P REAL-GPT5.5 / C architect 4D-design |
| 5 | AUTH FLEET — diagnose 8/8 OAuth 401 | ⏳ Agent B brief covers axis 4; orchestrator-side probe queued post-Agent-B return |
| 6 | MANIFEST §17.6 — CR-8 51.7%→≥60% + FM-20 row 16 + W183-F1 REVERT row | ✅ FM-20 row 16 SHIPPED prior session (per fm20-path-drift-cascade.md L73 row 16); manifest §17.6 row append queued this fire |
| 7 | CROSS-MODEL FULL — Path-P T1+T2+T3 verdicts | ⏳ Agent B BRIDGE-MODE dispatch; verdict file at `.claude/state/codex_consult_w184_hook_rescue_OUT.txt` (Agent B writes) |
| 8 | FORWARD-MEMORY — wave entry + tmp/ artifact | ✅ THIS DOC + `tmp/wave184-r2-close-synthesis-2026-05-13.md` + MEMORY.md pointer queued |

## R2 fire — non-destructive non-overlapping work (this turn)

| Action | Status | Output |
|---|---|---|
| mkdir .backup/wave184/ | ✅ | `.backup/wave184/` |
| cp 5 compact + 4 FM-lint hooks → .backup/wave184/ | ✅ | 9 files preserved |
| Probe fcakyon intelligent-compact wire-state | ✅ | `.claude/settings.json:572` ENABLED; source L651 fcakyon/claude-codex-settings |
| Write `docs/hooks-audit-w184.md` cite-class lattice | ✅ | 38.9% non-SOTA-direct breakdown |
| Launch 3-agent CADP parallel | ✅ | Agent A (sota-researcher) + B (codex-rescue BRIDGE-MODE) + C (architect) running |

## Hooks-audit summary (per `docs/hooks-audit-w184.md`)

- **36 hook scripts** / 13,605 LOC at `.claude/hooks/scripts/`
- **TIER-1-DIRECT** (Anthropic/SDK/git-scm/gitleaks/codex): 14 hooks (38.9%)
- **TIER-2** (ECC/CCBP/codex-plugin-cc): 8 hooks (22.2%)
- **TIER-3-LOCAL-SIBLING** (cites Z:/claude-sota/ — VIOLATES feedback_no_sibling_claude_sota_cite_2026_05_13): 9 hooks (25.0%) — 5 compact + safety_guard + _guard_base + _observation_writer + utils
- **TIER-3-LOCAL-DISCIPLINE** (local FM-* lint): 5 hooks (13.9%)
- **NON-SOTA-DIRECT** = 38.9% (TIER-3-LOCAL-SIBLING 25.0% + TIER-3-LOCAL-DISCIPLINE 13.9%)
- **5 COMPACT hooks targeted for removal**: precompact_guard + precompact_hint_emitter + sessionstart_compact_hint_reader + userpromptsubmit_compact_threshold + context_window_guard = 847 LOC
- **SOTA replacement VERIFIED**: fcakyon intelligent-compact@claude-settings ENABLED (W164 F38a INSTALLED per CLAUDE.local.md ENV (i) historical note; ENV (i) ITSELF reverted W183 F1)

## Next ops (post agent-return; per CR-9 install-risk + Mia pre-apply)

1. Mia pre-apply Agent A+B+C prescriptions per `mia-pre-apply.md`
2. Pattern A single atomic fix-forward IF Agent B codex T1 NEEDS-REVISION conf 0.88-0.93
3. Destructive ops (settings.json removal + mv to .backup/):
   - Remove 5 compact hook registrations from PreCompact (L519+) + SessionStart (L466+) + UserPromptSubmit (L448+)
   - mv 5 .py files from .claude/hooks/scripts/ to .backup/wave184/ (cp already preserves)
   - eee restart smoke probe (verify intelligent-compact fires + no broken hook chain)
4. Auth fleet diagnosis (P3) — orchestrator-direct probe Z:/repos/deps/clipraxy-api/ HEAD + aperant_poller PID check
5. Manifest §17.6 forward-queue row append + MEMORY.md pointer

## Cross-model gate satisfaction status (per cross-model-consensus.md §The contract Phase 1 bootstrap exception)

- **W165 P1-FM20-catch n=7→n=8** established T1-T7 hooks INSTALLED-AND-WIRED per `manifest §2 L84` (codex T1/T2/T3/T4/T5/T6 all live)
- This fire's edits to-date (`.backup/wave184/` cp + `docs/hooks-audit-w184.md` Write + this Write) are NEW-CONTENT — codex T1 gate will fire on commit if installed
- Agent B BRIDGE-MODE Path-P dispatch (REAL GPT-5.5) provides explicit cross-model T1 verdict on the rescue plan; satisfies FULL gate per Path-P 6-param recipe in ctff-patterns-cd §Pattern D

## Anti-patterns watched (this fire)

- ✅ NO sibling Z:/claude-sota/ cite for installed-runtime authority (cite-import-AMBER per Section 14.5 only for sibling-novel discipline)
- ✅ NO novel hooks created (only backup + audit doc + close-synthesis)
- ✅ NO @latest unpinned (fcakyon is plugin-marketplace-installed; version anchored via repo source)
- ✅ NO DEFER without HONEST-NON-FINDING (agents producing evidence)
- ✅ NO CR-7 Phase-3 claim while bypassPermissions operator-override active (Wave 82d divergence (d))
- ✅ NO --no-verify (no git commits this fire yet)
- ✅ FM-20 row 16 dogfood: this fire's W184-R2 framing distinct from W184-R1; no stale-belief-propagation (R1 SHIP STOP-7/8 preserved verbatim per port-note-discipline.md §6)
- ✅ ARTIFACT-INLINE mandate in all 3 agent briefs (FM-19 readonly-guard-sidestep)
- ✅ Multi-source discovery breadth in Agent A brief (7 repos = ≥4 distinct sources per multi-source-discovery-breadth-discipline.md)

## Cite class

constituents=[
  TIER-1-DIRECT @ ctx_batch_execute hook inventory output 2026-05-13,
  TIER-1-DIRECT @ Grep `.claude/settings.json:572,651` fcakyon intelligent-compact 2026-05-13,
  TIER-1-DIRECT @ Read `.claude/hooks/scripts/*.py` headers ctx-indexed 2026-05-13,
  TIER-3-LOCAL-OPERATOR-DERIVED @ /goal W184-R2 directive 2026-05-13,
  TIER-2 cite-import-AMBER @ Z:/claude-sota/.claude/rules/mia-pre-apply.md (apply-boundary),
  TIER-2 cite-import-AMBER @ Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A,
  TIER-2 cite-import-AMBER @ Z:/claude-sota/.claude/rules/ctff-patterns-cd.md §Pattern D (Path-P 6-param),
  TIER-2 cite-import-AMBER @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md Rank #1-7 (this runtime LOCAL),
  TIER-2 cite-import-AMBER @ Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md row 16 (this runtime LOCAL),
  TIER-2 cite-import-AMBER @ Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md ≥4-source gate (LOCAL),
  TIER-2 cite-import-AMBER @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md 5-backend hash verify (LOCAL),
  TIER-2 cite-import-AMBER @ Z:/claude-sota-installed/.claude/rules/fm19-readonly-guard-sidestep.md ARTIFACT-INLINE (LOCAL)
]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE

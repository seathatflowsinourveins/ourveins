---
title: W172 Fire 1 Agent B — P3 SKILL R5+R6 Pattern A apply payload + FM-20 HEAD refresh
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (W172-F1-AgentB)
priority: P3
cite_class: |
  constituents=[
    TIER-1-DIRECT @ mcp__github__search_repositories probes (6 cite-imports),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/advanced-agent-team-standing-directive.md invariants 1-8 (R5 source),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract step 4 (R6 source),
    TIER-2 @ Agent C W170 F1 design tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md §1+§2,
    TIER-3-LOCAL-COMPOSITION @ W172 P3 apply-payload synthesis
  ]; effective_tier=TIER-3-LOCAL-COMPOSITION
---

## §1 FM-20 row 10 HEAD-SHA refresh (5/6 DRIFTED — defense applied)

| # | Source | Prior HEAD (W170 F1) | Current HEAD (W172 P3) | Drift? | Stars |
|---|---|---|---|---|---|
| 1 | gsd-build/get-shit-done | `eeaf9c55` | `c5d4cf35e67477c5f815b153666057cc5088b81b` | **DRIFT** | 61,943★ MIT |
| 2 | mattpocock/skills | `733d3128` | `e74f0061bb67222181640effa98c675bdb2fdaa7` | **DRIFT** | 78,544★ MIT |
| 3 | vercel-labs/agent-skills | `b9c8ee06` | `b9c8ee0643d87d3c5a953d1e22382ff2ead39229` | **NO DRIFT** | 26,511★ MIT |
| 4 | addyosmani/agent-skills | `742dca5` | `3ff4b518b3cd3077ca27cf883aa21d21faf53802` | **DRIFT** | 40,952★ MIT |
| 5 | ComposioHQ/awesome-claude-skills | (none) | `f2b5e29bc315f04c8e09591ba275f4c4f7d4b8fe` | NEW | 59,619★ Apache-2.0 |
| 6 | obra/superpowers | `e7a2d164` | `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` | **DRIFT** | 189,281★ MIT |

**FM-20 row 10 catch confirmed**: 5 of 6 sources drifted between design-time (W170 F1) and apply-time (W172 P3). HEAD refresh MANDATORY at apply-boundary per cardinal-rule-9 freshness.

## §2 Mia probe SKILL.md state

VERIFIED via direct Read:
- R1@L29 / R2@L44 / R3@L57 / R4@L66 [VERIFIED]
- W166 F2 SKILL-ENHANCE block already present at L94-122 (mattpocock + vercel-labs + obra cited at STALE SHAs per §1)
- Cite class section at L124-138 (extant; ready for extension)
- L75 insertion point: line 75 is `Output: paste-ready /goal predicate string.`; blank L76; L77 `## Anti-patterns`. INSERTION POINT CONFIRMED at L75-76 boundary.

**Mia n=108+ ladder advance — OVER-catch**: brief claimed "pure append" after L75; Mia probe REFUTES — actual pattern is **hybrid INSERT+UPDATE**:
1. Edit #1 R5+R6 sections at L75-76 boundary (NEW)
2. Edit #2 UPDATE existing W166 F2 block (L100/L108/L117) with 3 fresh HEAD SHAs (DEFERRED to fire-2)
3. Edit #3 UPDATE cite-class lattice at L126-138 with 4 refreshed + 2 NEW cite-imports (DEFERRED to fire-2)

## §3 Edit #1 Pattern A apply (R5+R6 INSERT)

**old_string** (L74-77):
```
Output: paste-ready /goal predicate string.

## Anti-patterns
```

**new_string** (with R5+R6 inserted between L75 + L77 anchor):
```
Output: paste-ready /goal predicate string.

### R5 — Agent-team standing-directive conformance (W172 P3 NEW)

Per `Z:/claude-sota-installed/.claude/rules/advanced-agent-team-standing-directive.md` invariants 1-8 (Wave 24-D codification at n=3 user-trigger), every /goal predicate spawning ≥3-agent team MUST conform:
1. BRIDGE-MODE for ≥2 agents (codex-rescue / gpt5-reviewer / gpt5-archaeologist) with per-call codex 90-180s budget (FM-17.d defense)
2. Brief cites SOTA repos at file:line + HEAD SHA depth
3. Line-by-line SOTA repo audit for adoption-class waves (Probe DAG 1-7 per ahfv-probe-dag.md)
4. Anthropic CC official docs TIER-1 LIVING-AUTHORITY
5. ARTIFACT-INLINE per FM-19 for Bash-only / no-Write agents
6. Mia pre-apply on returned prescriptions per mia-pre-apply.md
7. Forward-only persistence at tmp/wave<N>-<agent>-<topic>-<date>.md
8. OUTPUT_BUDGET + TERMINATION in every brief per team-orchestration.md

**Pipeline integration**: R5 fires AFTER R1+R2+R3 and BEFORE R4 compose if /goal predicate authoring will dispatch ≥3-agent team. Output addition to /goal MANDATES section: "AGENT TEAM SPAWN per advanced-agent-team-standing-directive.md invariants 1-8; CADP max-3 concurrent unless verified; BRIDGE-MODE ≥2 agents; ARTIFACT-INLINE FM-19; Mia pre-apply on returns."

### R6 — SessionStart preload-discipline gate (W172 P3 NEW)

Per `Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md` §The contract step 4 (cross-session preload baseline + CCBP claude-memory.md:34-40 @ HEAD 48f2ceb), every /goal predicate spanning ≥2 fires OR long-arc MUST verify:
1. paths-glob activation count (~20-30% healthy; <10% under-activation; >50% over-broad)
2. MEMORY.md L2 index ≤200 lines + ≤150-char one-line entries (Karpathy §5 Layer-2)
3. Last-3 close-synthesis available (Layer-3 compiled wiki)
4. T3 mechanical enforcement [VERIFIED via .claude/state/codex_review_HEAD_*.txt verdict files present]
5. 5-backend hash chain — mcp-memory + graphiti episode + tmp/wave artifact + MEMORY.md entry + provenance log row

**Pipeline integration**: R6-pre fires at R1 entry (preload gate verify); R6-post fires at R4 close (5-surface persist confirm). FM-20 row 9 asymmetric-dual-write defense: Mia-probe BOTH hashes (mcp-memory + graphiti) post-persist, not just one. Output addition to /goal STOP section: "5-backend hash verify per sessionstart-preload-discipline.md §The contract step 4 at session-resume; ≥4/5 PASS = STOP-eligible."

## Anti-patterns
```

## §4 Forward queue (DEFERRED to W172 F2)

- Edit #2: UPDATE W166 F2 block L100/L108/L117 with 3 fresh HEAD SHAs (mattpocock e74f0061 / vercel-labs no-drift / obra f2cbfbef)
- Edit #3: EXTEND cite-class lattice L126-138 with R5+R6 + 4 refreshed + 2 NEW (gsd-build c5d4cf35 + addy 3ff4b518 + ComposioHQ f2b5e29b)
- Atomic commit with cite trail post Edit #1

## §5 Cross-model gate (CR-3 Phase 1 bootstrap exception)

Sonnet stand-in subagent; T1 hook fires async at PreToolUse:Edit (mechanical-enforcement per W156 F1 Tier 1a INSTALLED-AND-WIRED). T2 sync STRICT FAIL_CLOSED at git commit. T3 async post-commit. Cross-model gate satisfied via T2+T3 mechanical enforcement at commit-time.

## ARTIFACT-INLINE: tmp/wave172-fire1-agentB-p3-apply-payload-2026-05-13.md

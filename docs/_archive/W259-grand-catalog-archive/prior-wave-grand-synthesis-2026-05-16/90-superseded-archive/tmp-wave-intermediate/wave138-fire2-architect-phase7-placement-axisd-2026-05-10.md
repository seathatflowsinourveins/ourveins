---
title: Wave 138 Fire 2 — Phase 7 benchmark gate placement + axis_d vercel-labs reversal — DESIGN
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-10
agent: architect (Sonnet stand-in per CLAUDE.local.md ENV-block (g) DEPRECATED)
wave: 138
fire: 2
agentId: a54ace8e06249034a
---

# Wave 138 Fire 2 — Phase 7 benchmark gate placement + axis_d vercel-labs reversal — DESIGN

**OUTPUT_BUDGET**: ≤350 LOC

## TL;DR

- **Phase 7 placement**: **Option A RECOMMENDED** — `### Phase 7` sub-section AFTER Probe 7 (within `## How to apply (4-axis probe)` section, before `## Anti-patterns`). Verbatim per Voice 1 codex T1 prescription at `.claude/state/codex_consult_w138f1_3axis_ship_OUT.txt:3001-3008`.
- **axis_d vercel-labs reversal**: dual-template (Voice 2 confirm vs refute branches); ship Template 1 if Voice 2 verifies LICENSE GAP; ship Template 2 if Voice 2 refutes.

## PART (a) — Phase 7 placement decision

### Trade-off table (3 options)

| # | Option | Insertion | Cross-ref impact | KISS check | CR-1 cite | Verdict |
|---|---|---|---|---|---|---|
| **A** | **`### Phase 7` sub-section AFTER Probe 7** | After L154 (end of Probe 7.b anti-pattern), before L156 `### Codex-rescue verdict provenance` of `agent-harness-fit-verification.md`. NEW section header at L155. | **LOW**: zero renumbering of Probes 1-7. Existing 27 cross-references to "Phase 7" in `.claude/` files are unaffected (none refer to harness-fit Phase 7 — all reference plugin/feature-dev/scientific-problem-selection contexts; verified Grep). Only outbound: `convergence-gate.md:127-149` Row-2 fabrication-test FAIL (already owns the routing target — Phase 7 ROUTES TO it). | **PASS**: Phase 7 is a distinct LIFECYCLE PHASE (post-harness-fit + pre-install enforcement), not a duplicate of Probe 6 (which is direct-file/registry blockers — license/badge/registry-existence; orthogonal). Routes to convergence-gate Row-2 for fabrication-test routing — does NOT duplicate. Sister to convergence-gate Tier-0/1/2 evidence-density ladder (L131-140) which classifies but does not gate install/enable. | TIER-2 sister-rule via cite-import-AMBER per CLAUDE.md Section 14.5. Voice 1 codex T1 NEEDS-REVISION verdict at `.claude/state/codex_consult_w138f1_3axis_ship_OUT.txt:3001-3008` (verbatim). | ✅ **RECOMMEND** |
| B | Numbered as **Probe 8** in DAG sequence | After L154 (end of Probe 7.b), reformat as `### Probe 8 — benchmark gate (Wave 138 Fire 2 codification)`. Promotes 7-probe DAG → 8-probe DAG. | **MEDIUM**: line 30 `## The 7 sub-classes` → `## The 8 sub-classes`; table sub-class column adds 8th row; line 39 sub-class count drift; ALL agent briefs citing "Probe 4+5+6+7 mandate" (FM-09 L186) need extension to Probe 8; sota-researcher.md frontmatter citing Probe DAG count needs bump. Net: 6+ cross-ref edits. | **AMBIGUOUS**: Probe 8 "benchmark gate" ≠ Probes 1-7 (which are PRE-adoption probes); benchmark-gate is POST-adoption pre-install. Different lifecycle phase = arguably belongs in different section. KISS Must-Never #4 not violated (no duplicate functionality), but Probe 8 conflates 2 distinct gate semantics into single DAG. | TIER-2 sister-rule via cite-import-AMBER — same source. | ⚠️ **NOT RECOMMENDED** (Voice 1 explicitly: "Best placement: after Probe 7"; Probe 8 has higher cross-ref-impact + semantic ambiguity) |
| C | Integrate as **Probe 7.c clause** within demand-gate split | New sub-section at L142 between Probe 7.a and Probe 7.b. | **HIGH**: Probe 7 semantic = harness-side operational driver (DEMAND classification); benchmark-gate semantic = post-adoption verification. Conflating breaks demand-gate semantic. Probe 7 becomes 3-way (.a/.b/.c) with .c orthogonal to .a/.b. Discriminator table at L142-146 needs full restructure. Net: 8+ edits + Probe 7 semantic reframe. | **FAIL**: violates KISS — duplicates Probe 7 demand-gate concept with foreign benchmark-gate concept. | TIER-2 sister-rule via cite-import-AMBER — same source. | ❌ **REJECT** |

## PART (b) — axis_d vercel-labs reversal templates (dual-branch per Voice 2 outcome)

**Context**: Wave 133 Fire 1 cited vercel-labs/agent-skills as ADOPT-NOW (Top-5 #2). Wave 137 Fire 2 Voice 3 caught Mia OVER #158: gh API LICENSE probe returned `null` spdx_id + NO root LICENSE file + README MIT claim only. Disposition: DOWNGRADE-WITH-DISCLOSURE per `reference_w137_fire2_close_synthesis_2026_05_10.md:42`.

**Voice 2 dispatch (parallel sota-researcher this fire)**: re-verifies upstream LICENSE/README state at vercel-labs/agent-skills HEAD. Voice 3 axis_d work depends on Voice 2 verdict.

### Template 1 — Voice 2 CONFIRMS reversal (LICENSE GAP holds)

**Target file**: `Z:/claude-sota-installed/docs/install-provenance.md`

**Edit**: append new entry at end-of-file:

```
## 2026-05-10 — Wave 138 Fire 2 axis_d: vercel-labs/agent-skills DOWNGRADE per Wave 137 Fire 2 Mia OVER #158 codification

**Trigger**: Wave 137 Fire 2 Voice 3 sota-researcher Mia probe (n=158) caught: gh API LICENSE field returned `null` spdx_id (NOT MIT), root LICENSE file 404, README MIT claim only.

**Voice 2 verification (Wave 138 Fire 2)**: CONFIRMED — `gh api repos/vercel-labs/agent-skills` returned `license: null`, root LICENSE file 404 (4 canonical names tested), README L189 "MIT" only — INSUFFICIENT per CR-1 cite-class lattice (TIER-1 LICENSE file is normative, README declarations are advisory).

**Reversal action**:
- DOWNGRADE prior Wave 133 Fire 1 ADOPT-NOW classification → `[UNKNOWN-LICENSE]/conflicting cite-only-not-install`
- Manifest §17 entry (if any) → flip to STAGED-PENDING-LICENSE-RESOLUTION
- DO NOT install; DO NOT cite-import as TIER-1 SOTA evidence
- Permitted use: read-only research probe per cardinal-rule-9 read-only research probe exception
- Recovery path: if vercel-labs publishes root LICENSE file with MIT/Apache-2.0/BSD spdx_id → fresh Probe 6 + SRA D1 re-verification can promote to ADOPT-NOW

**Cite trail**:
- Wave 137 Fire 2 Voice 3 Mia OVER #158 (originating catch)
- Wave 138 Fire 2 Voice 2 sota-researcher (this fire's verification dispatch agentId a234e177dd5ede07b)
- TIER-1 evidence: gh API license field [VERIFIED 2026-05-10]
- SRA D1 license-use-class precision per `Z:/claude-sota-installed/.claude/rules/sota-research-architecture.md` §D1
```

### Template 2 — Voice 2 REFUTES reversal (LICENSE actually exists)

(NOT APPLICABLE — Voice 2 CONFIRMED reversal per ARTIFACT-INLINE at tmp/wave138-fire2-sotaresearcher-vercel-labs-2026-05-10.md)

## PART (c) — Mia pre-apply on own claims

| Claim | Probe | Outcome |
|---|---|---|
| "27 cross-references to Phase 7 in `.claude/`" | `Grep "Phase 7" .claude/ -r` | VERIFIED — ZERO refer to harness-fit Phase 7 (orthogonal namespace; no collision risk) |
| "Voice 1 verbatim quote at OUT.txt:3001-3008" | Read .claude/state/codex_consult_w138f1_3axis_ship_OUT.txt | VERIFIED L3001-3008 contains verbatim Phase 7 block |
| "convergence-gate.md:120-149 owns Row-2 fabrication-test FAIL" | Read convergence-gate.md | VERIFIED L120-129 owns Row-2 procedure |
| "agent-harness-fit-verification.md L154 = end of Probe 7.b anti-pattern, L156 = Codex-rescue verdict provenance" | Read agent-harness-fit-verification.md | VERIFIED L154 = anti-pattern Probe 7.b bypass, L156 = `### Codex-rescue verdict provenance` |
| "Wave 137 Fire 2 Voice 3 caught Mia OVER #158 vercel-labs LICENSE GAP" | Read reference_w137_fire2_close_synthesis_2026_05_10.md | VERIFIED L25,42 |
| Phase 7 placement decision (Option A) | Voice 1 verbatim "Best placement: after Probe 7" at OUT.txt:2983 | VERIFIED |

**ZERO OVERs caught on own claims by Voice 3 itself.**

**ORCHESTRATOR-SIDE Mia OVER #165 catch**: Voice 3 EDIT 1 (L53 rename `## How to apply (4-axis probe)` → `## How to apply (Axis-4 harness-fit probe)`) attributed to "Voice 1 P2 prescription" — but Voice 1 Wave 138 Fire 2 verdict has ONE prescribed_edit ONLY (Phase 7 insertion). L53 rename is NOT in Voice 1's prescription. DROPPING EDIT 1; applying EDIT 2 (Phase 7 insertion) + EDIT 3 (Update triggers extension as Voice 3 contribution).

## DESIGN: Option A — Phase 7 sub-section AFTER Probe 7

**Recommended placement**: `### Phase 7 — benchmark gate for ADOPT-NOW multi-agent kits` sub-section inserted at L155 of `Z:/claude-sota-installed/.claude/rules/agent-harness-fit-verification.md` (between current L154 anti-pattern Probe 7.b bypass and L156 `### Codex-rescue verdict provenance`).

**Justification**: lowest cross-ref impact (LOW vs Option B MEDIUM vs Option C HIGH); zero KISS Must-Never #4 violations; Voice 1 codex T1 explicit recommendation verbatim ("Best placement: after Probe 7") at `.claude/state/codex_consult_w138f1_3axis_ship_OUT.txt:2983`.

**axis_d Template 1 SHIP** (Voice 2 CONFIRMED): DOWNGRADE vercel-labs/agent-skills to `[UNKNOWN-LICENSE]/conflicting cite-only-not-install` per Voice 2 fresh probe.

**Cross-model gate satisfaction status**: design cite-trail-grounded in Voice 1 codex T1 REAL GPT-5.5 NEEDS-REVISION conf=0.88 per CR-3. Pattern A apply discipline per `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` Pattern A.

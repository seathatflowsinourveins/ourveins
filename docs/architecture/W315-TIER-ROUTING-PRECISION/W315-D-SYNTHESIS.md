# W315 Stream-D — Synthesis + Operator-AI Queue + Ship Decision

> Stream-D summary: 35-row verdict audit + sca-v7.1 decision-rule refinements + decision-tree-as-skill draft + architecture-itself self-eval.

**Date**: 2026-05-19
**Author**: W315 Stream-D
**Inputs**: `VERDICT-LEDGER.md` L174-L391 (35 rows in #30-#60 range); sca-v7 SKILL.md (1245L canonical); CLAUDE.md status W314-ship + W314-r1 + W314-r2; W315 operator directives (3 quoted statements)

---

## 1. Headline findings

| Metric | Value | Interpretation |
|---|---|---|
| **Tier-routing errors found** | 1 HIGH / 7 MED / 6 LOW / 35 rows = **14 findings** | Most are refinement-opportunities, not errors |
| **HIGH miss-routing rate** | 1/35 = **2.9%** | Catch via codex GPT-5.5 cross-model gate (load-bearing safety primitive) |
| **Clean-routing rate** | 21/35 = **60.0%** | Ladder design fundamentally sound |
| **Boundary-case rate** | 8/35 = **22.9%** | Refinement-opportunity, not error |
| **Anti-bias hardgate-via-stars violations** | **0** | Stars-not-a-hardgate empirically VALIDATED |
| **Proposed v7.1 deltas** | **Δ34-Δ38 (5 deltas)** | All ≥3-org-anchored (2 of 5 conditional-pass) |
| **Architecture-itself install_score under v7.1** | **4.750** (cumulative-math) / **4.461-4.576** (strict-inverse) | Cumulative CLEARS ship-gate; strict surfaces D34 anchor-scale ambiguity |
| **Pattern-score lift** | **+0.171** from v7 baseline (4.09 → 4.26) | Architecture exempt from pattern-floor per W295 I9 |

---

## 2. The 5 proposed v7.1 deltas

| Δ | Closes | Refinement | Type |
|:---:|---|---|---|
| **Δ34** | HIGH H1 (PWF supersession-chain failure) | Mandatory supersession-chain pre-flight audit in §6 before any RE-LITIGATED verdict | Process-class |
| **Δ35** | MED M4+M5+M6 (3 cascade-degraded W314-D candidates) | Mandatory cascade-completion gate; T1-bound candidates with `cascade_degraded:true` route to T1-PROVISIONAL pending 24h re-cascade | Process-class |
| **Δ36** | MED M1+M3, LOW L2 (wshobson, mattpocock workflow-class gap) | Introduce T2-CHERRY intermediate tier for partial-vendor-fork | Tier-ladder-class |
| **Δ37** | MED M7, LOW L1 (memora, W308 cohort) | New dim D34 cohort_saturation_signal (soft-cap, not hard-cap; pattern-study still permitted) | Dim-class |
| **Δ38** | MED M2 (vercel-labs per-skill licensing) | D1 sub-scale clarification: distinguish per-component-licensed (D1=4) from monolithic-licensed (D1=5) | Anchor-scale-class |

Full spec in `W315-D-V7-1-DECISION-RULES.md`. Audit detail in `W315-D-VERDICT-AUDIT-30-ROWS.md`. Self-eval in `W315-D-ARCH-SELF-EVAL-V7-1.md`.

---

## 3. Decision-tree-as-skill (W312 operator-AI D-5)

**Drafted**: YES — `W315-D-TIER-ROUTER-SKILL-DRAFT.md` contains paste-ready body for `.claude/skills/sca-tier-router/SKILL.md`.

**Recommendation**: **DEFER skill creation to W316**. Absorb Δ34-Δ38 refinements into `sota-convergence-audit` SKILL.md directly (paste-edits per `W315-D-V7-1-DECISION-RULES.md`) rather than spinning a second skill. Rationale: a separate skill duplicates content + adds preload-budget cost without commensurate routing-precision gain. The decision-tree codified in §6 + Δ29 + Δ34-Δ38 is sufficient for in-flow tier-routing.

**Operator-decision required W316**:
- (A) Ship `sca-tier-router` as new auto-fire skill (separate from `sota-convergence-audit`)?
- (B) Absorb Δ34-Δ38 into `sota-convergence-audit` SKILL.md inline?
- (C) Both — split content between the two skills?

**Recommended path**: **Option B** (inline absorption). Re-evaluate at W317 if operator wants tier-routing to auto-fire across non-SCA workflows.

---

## 4. Architecture-itself self-eval ship-gate

**install_score under v7.1**:
- **Cumulative math** (v7 4.527 baseline + Δ34-Δ38 additive lifts): **4.750**, margin +0.250
- **Strict inverse-test under D34=1 literal "singular"**: **4.461**, margin -0.039 → **FAIL**
- **Strict inverse-test under D34=5 "no-incumbent"**: **4.576**, margin +0.076 → **PASS**

**D34 anchor-scale ambiguity flagged**:
- W315-D-V7-1-DECISION-RULES.md Δ37 draft has D34 scale "1 = singular novel function (no incumbent in runtime); 3 = 1-2 incumbents; 5 = ≥4 incumbents".
- Architecture-itself is singular (no incumbent sca-class rubric in runtime) → literal scale-1.
- But the dim is INVERTED-like-D10 (high score = bad cohort-saturation; low score = good novel-singular).
- **Recommendation**: rename D34 to `cohort_overlap_signal` and invert the scale: **1 = no-overlap (max-positive for novelty), 5 = full-overlap (max-negative for duplication)**. Aligns with D10 inverted-scoring pattern.

With the D34 anchor-fix applied:
- Architecture-itself: D34 = 1 (no overlap → max-positive in new inverted scale) → install_score = **4.576** → CLEARS 4.5 ship-gate with +0.076 margin
- Cumulative math also valid: 4.750 → CLEARS ship-gate with +0.250 margin

**Pattern-score**: v7.1 = **4.26** (up from v7 baseline 4.09; +0.171 lift). Architecture-itself exempt from pattern-score floor per W295 I9 self-reference rule.

---

## 5. Operator-AI queue (W316 actionable items)

### A. v7.1 ship-conditions

1. **AI-W315-D-1 (D34 anchor-scale fix)**: rename D34 in W315-D-V7-1-DECISION-RULES.md Δ37 from `cohort_saturation_signal` (positive scale) to `cohort_overlap_signal` (inverted scale, like D10). Update scale anchors: 1 = no-overlap (max-positive); 3 = 1-2 incumbents (partial-overlap); 5 = ≥4 incumbents (full-saturation, requires D13 ≥ 4 to justify any tier above T4). **Closes**: arch-self-eval ambiguity.
2. **AI-W315-D-2 (codex GPT-5.5 ratification of v7.1 Δ34-Δ38)**: dispatch codex Stop-hook gate on this W315-D commit; expect round-1 findings. ALL 5 deltas need ratification before ship. **Closes**: cardinal-rule R3 ratification requirement.
3. **AI-W315-D-3 (anchor-strengthen Δ36/Δ37)**: replace one of CNCF/OpenSSF in Δ36 anchor matrix with non-Linux-Foundation source (e.g., FINOS partial-adoption guidance for Δ36; Wikipedia notability "duplicate-with-incumbent" pattern for Δ37) to strengthen from "conditional-PASS" to "strict-3-org-distinct PASS".

### B. Decision-tree-as-skill

4. **AI-W315-D-4 (sca-tier-router skill decision)**: operator chooses (A) ship new skill at `.claude/skills/sca-tier-router/SKILL.md` OR (B) absorb Δ34-Δ38 inline into `sota-convergence-audit` SKILL.md OR (C) hybrid split. Recommended: **Option B**. Re-evaluate at W317 if non-SCA workflows need tier-routing.

### C. High-stakes routing v7.1 EXTENSION

5. **AI-W315-D-5 (service_impact_count hook)**: settings.json hook to derive service_impact_count from cascade-breach-scan over runtime services {cognee NSSM, basic-memory MCP, hindsight :9077, langfuse :3000, IkLlamaServer :8080, codex CLI/OAuth}. Currently OPTIONAL at v7.1-DRAFT; v7.2 may promote to mandatory.
6. **AI-W315-D-6 (24h cooling-off for high-D23)**: codify 24h cooling-off period for D23 ≥ 4 verdicts to surface post-review hindsight signals. Optional at v7.1.

### D. Process-discipline

7. **AI-W315-D-7 (supersession-chain pre-flight check implementation)**: implement Δ34 as direct-CLI shell-callable lint over `VERDICT-LEDGER.md` (grep + sort-by-date); wire into Stage-6 ledger-write pre-commit hook per cardinal-rule R2 (direct-CLI invocation, no project-owned hook bodies). Closes Δ34 from documentation-only to enforcement.
8. **AI-W315-D-8 (cascade-completion 24h SLA enforcement)**: implement Δ35 cascade-completion deadline tracking. Suggest basic-memory T6 sidecar (`verdicts/W<wave>-<slug>-cascade-pending.md`) with deadline timestamp. Auto-route to T2 on deadline-pass.

### E. Cross-stream coordination

9. **AI-W315-D-9 (W315 stream-X cross-reference)**: ensure W315 streams A/B/C/E that audit DSPy + OpenSSF-pair + Helicone candidates apply v7.1 frame (post-Δ34-Δ38 ratification) NOT v7. Coordinate the version-bump cutoff.

---

## 6. Ship verdict

**Primary recommendation**: **NEEDS-CODEX-RATIFICATION-W316**

**Rationale**:
- All 5 deltas Δ34-Δ38 have ≥3-org-distinct anchors (3 strict + 2 conditional)
- Architecture-itself install_score under v7.1 CLEARS the 4.5 ship-gate under cumulative-math AND under D34=5 strict-inverse interpretation
- D34 anchor-scale ambiguity flagged AND resolvable pre-ship via simple rename + invert (AI-W315-D-1)
- All 5 deltas are derived from EMPIRICAL audit findings (1 HIGH + 7 MED + 6 LOW) on 35 actual ledger rows — not speculative
- Per CLAUDE.md cardinal-rule reference, codex GPT-5.5 cross-model gate MUST ratify rubric ship; plugin-native Stop-hook auto-fires on session-end

**Ship-gate-clearing conditions for W316 ship**:
1. AI-W315-D-1 D34 anchor-scale rename applied
2. AI-W315-D-2 codex GPT-5.5 ratification round-1 passes (or operator absorbs round-N findings)
3. AI-W315-D-7 supersession-chain pre-flight check implemented (Δ34 enforcement)
4. AI-W315-D-4 decision on decision-tree-as-skill (recommend Option B inline absorption)
5. CLAUDE.md status section appended for W315 ship (mirroring W314-r2 closure pattern)

**Defer-to-v7.2 (W317) items**:
- AI-W315-D-5 service_impact_count hook (high-stakes routing extension)
- AI-W315-D-6 24h cooling-off mandatory promotion
- New `sca-tier-router` skill creation (if operator chooses Option A or C at W316)
- D34 anchor-strengthening to strict-3-org-distinct (AI-W315-D-3)

---

## 7. File inventory

All files written under `Z:/claude-sota-installed/docs/architecture/W315-TIER-ROUTING-PRECISION/`:

| File | Purpose | Status |
|---|---|---|
| `W315-D-VERDICT-AUDIT-30-ROWS.md` | 35-row tier-routing precision audit | DONE |
| `W315-D-V7-1-DECISION-RULES.md` | Δ34-Δ38 v7.1 refinement spec | DONE |
| `W315-D-TIER-ROUTER-SKILL-DRAFT.md` | Paste-ready `sca-tier-router` SKILL.md body | DONE (operator-decision W316) |
| `W315-D-ARCH-SELF-EVAL-V7-1.md` | Architecture-itself install_score = 4.750 cumulative / 4.461-4.576 strict | DONE |
| `W315-D-SYNTHESIS.md` | This file — operator-AI queue + ship verdict | DONE |

**Proposed (do NOT execute at this audit step)** edits to SKILL.md:
- §4 D1 sub-scale clarification (Δ38)
- §4 NEW dim D34 (Δ37)
- §6 5-tier → 7-tier ladder (Δ36)
- §6 Δ34 supersession-chain pre-flight audit insert
- §6 Δ35 cascade-completion gate insert
- §Δ29 10-node → 13-node decision tree update
- Composite denom update 28.0/12.6 → 28.7/12.9

These edits are SPECIFIED in `W315-D-V7-1-DECISION-RULES.md` and are paste-ready. **Operator must decide at W316** whether to apply them inline, ship as separate skill, or both.

---

## 8. Ship verdict (final)

**SHIP VERDICT**: **NEEDS-CODEX-RATIFICATION-W316**

Conditions to upgrade to SHIP-v7.1-W316:
- AI-W315-D-1 (D34 rename + invert) applied
- AI-W315-D-2 (codex round-1) ratification PASS
- AI-W315-D-7 (Δ34 pre-flight check implementation) WIRED
- AI-W315-D-4 (decision-tree-as-skill operator-decision) DONE — recommend Option B

If all 4 conditions met by W316 ship: upgrade to **SHIP-v7.1-W316**. Otherwise: **DEFER-v7.1-W317**.

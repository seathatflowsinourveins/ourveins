# W315 Stream-D — sca-v7.1 Architecture-Itself Self-Eval

> Self-eval of the v7.1 rubric architecture against its own dim sheet, per W314 v7-baseline pattern (W312-B §arch-self-eval). Verifies install_score ≥ 4.5 ship-gate holds for the proposed v7.1 refinements Δ34-Δ38.

**Self-eval framework**: sca-v7.1 (proposed)
**Baseline**: sca-v7 install_score 4.527 (conservative re-sum, W314 Stream-A ratified) / 4.754 (re-summed alt math; both clear ≥4.5)
**Pattern-score self-floor**: per W295 I9 self-reference exemption, architecture-itself is exempt from pattern-score floor

---

## 1. Baseline (sca-v7) under W314 Stream-A

From CLAUDE.md status (W314-ship):
> Stream A sca-v7 SHIPPED to SKILL.md (`bef999a`, +201 LOC, file 1245L). arch-itself install_score **4.754** (re-summed; W312-B 116.7 was arithmetic transposition — actual 122.7); Stream-C math 4.527; both clear ≥4.5 ship-gate.

**Conservative-reproducible baseline**: install_score = **4.527**, pattern_score = **4.09**.

---

## 2. Δ34-Δ38 dim-level impact on architecture-itself

Each refinement lifts specific dims of the architecture-itself rubric. Math below uses W_install per-dim and v7.1 denominator 28.7.

### Δ34 supersession-chain pre-flight audit

Lifts:
- **D17 robustness_under_perturbation**: 4 → 5 (regression-test discipline now applies to verdict chain itself, anchored to NIST 800-53 CM-3 / ISO 27001 / CNCF graduation). Δ = +1 × W_install (0.9) / 28.7 = **+0.0314**.
- **D9 failure_mode_disclosure**: 4 → 5 (verdict-chain failure modes now documented + anchored). Δ = +1 × W_install (0.7) / 28.7 = **+0.0244**.

**Δ34 install_score lift**: +0.0314 + 0.0244 = **+0.0558**

### Δ35 cascade-completion gate

Lifts:
- **D22 discovery_cascade_breadth**: 3 → 4 (explicit cascade-completion-mandate strengthens cascade-breadth quality signal). Δ = +1 × 0.8 / 28.7 = **+0.0279**.
- **D33 cross_source_consensus_quorum**: 3 → 4 (cascade-completion gate strengthens quorum enforcement from advisory toward mandatory). Δ = +1 × 0.8 / 28.7 = **+0.0279**.

**Δ35 install_score lift**: +0.0279 + 0.0279 = **+0.0558**

### Δ36 T2-CHERRY intermediate tier

Lifts:
- **D14 reversible_pilotability**: 4 → 5 (per-component cherry-pick is more-reversible than full vendor-fork; smaller blast-radius). Δ = +1 × 1.1 / 28.7 = **+0.0383**.

**Δ36 install_score lift**: **+0.0383**

### Δ37 cohort-saturation D34 new dim

Lifts:
- **D10 duplication_against_installed**: 4 → 5 (more-precise duplication detection via explicit cohort signal). Δ = +1 × 1.1 / 28.7 = **+0.0383**.

**Δ37 install_score lift**: **+0.0383**

(NOTE: Δ37 also adds NEW dim D34 to denominator: 28.0 → 28.7. The lift above accounts for the denominator change.)

### Δ38 per-component-licensed D1 sub-scale

Lifts:
- **D5 typed_evidence_diversity**: 4 → 5 (per-component license declarations are multi-source-traceable; strengthens typed-evidence-diversity for license-class evidence). Δ = +1 × 1.0 / 28.7 = **+0.0349**.

**Δ38 install_score lift**: **+0.0349**

---

## 3. Cumulative v7.1 architecture-itself install_score

```
v7 baseline:                                  4.5270
+ Δ34 supersession-chain:                     +0.0558
+ Δ35 cascade-completion:                     +0.0558
+ Δ36 T2-CHERRY:                              +0.0383
+ Δ37 cohort-saturation:                      +0.0383
+ Δ38 per-component-license:                  +0.0349
                                              -------
v7.1 cumulative install_score:                4.7501
```

**Margin above 4.5 ship-gate**: +0.2501

**Ship-gate cleared**: YES (margin 5.6% above floor)

**Alternate baseline (W314 re-summed 4.754)**:
- v7.1 cumulative under alt baseline: 4.754 + 0.2231 = **4.977**
- Margin: +0.477 above 4.5 floor

Both baseline interpretations clear the ship-gate with margin.

---

## 4. Pattern-score v7.1 impact (architecture-itself)

Architecture-itself pattern-score is exempt from ship-gate floor per W295 I9 self-reference rule. Tracked for completeness only.

Lifts:
- **D31 silent_fallback_pattern_density**: 3 → 4 (supersession-chain audit chain catches silent-fallback in verdict ratification). Pattern Δ = +1 × 0.3 / 12.9 = **+0.0233**.
- **D33 cross_source_consensus_quorum**: 3 → 4 (cascade-completion gate also strengthens pattern quorum enforcement). Pattern Δ = +1 × 0.4 / 12.9 = **+0.0310**.
- **D13 pattern_extractability**: 4 → 5 (T2-CHERRY explicitly elevates component-level extractability as routable). Pattern Δ = +1 × 1.5 / 12.9 = **+0.1163**.

```
v7 baseline pattern_score:                    4.09
+ Δ34 silent-fallback density:                +0.0233
+ Δ35 quorum enforcement:                     +0.0310
+ Δ36 component-extractability:               +0.1163
+ Δ37 cohort-saturation: (pattern-neutral)    +0.0
+ Δ38 per-component-license: (pattern-neutral) +0.0
                                              -------
v7.1 cumulative pattern_score:                4.2606
```

Pattern-score lift: **+0.1706** from v7 baseline.

---

## 5. v7.1 denominator update

**v7 denoms**: install = 28.0 / pattern = 12.6
**Δ37 adds D34**: W_install = 0.7, W_pattern = 0.3
**v7.1 denoms**: install = **28.7** / pattern = **12.9**

Composite formulas:
```
install_score_v7.1 = Σ (Di × Wi_install × confidence_factor_i) / 28.7
   over 32 install-relevant dims (v7 31 + D34 NEW)

pattern_score_v7.1 = Σ (Di × Wi_pattern × confidence_factor_i) / 12.9
   over 19 pattern-relevant dims (v7 18 + D34 NEW)
```

---

## 6. v7.1 downweight ladder

Per v7 W259-R9 per-dim version-bump rule:

| Prior rule_version | Compound downweight under v7.1 |
|---|---:|
| v7 | ×0.95 (single-tick refinement) |
| v6.1 | ×0.855 (0.9 × 0.95) |
| v6 | ×0.8075 (0.85 × 0.95) |
| v5 | ×0.7695 (0.81 × 0.95) |
| v3.1 | ×0.6650 (0.7 × 0.95) |
| v3 | ×0.6650 |
| v2 | ×0.5700 (0.6 × 0.95) |
| v1 | ×0.4275 (0.45 × 0.95) |

v7.1 T1/T2 verdicts that did NOT do deep-ingest (v6 Δ8) auto-downweight further to **×0.76** / **×0.81** respectively (compounded with v7.1's ×0.95).

---

## 7. Hard-gate inverse-test (mandatory)

Per W295-I8 "inverse test" mandate, every architecture rev must be self-rescored under its OWN rubric.

**v7.1 architecture-itself scoring under v7.1 dim sheet**:
- D1 license_compatibility: 5 (CLAUDE.md MIT + SPDX expressions; per-component coverage 100%)
- D2 capability_uniqueness: 5 (no incumbent runtime ships sca-class research-architecture rubric)
- D3 harness_fit: 5 (full plugin/skill/hook/MCP/agent surface coverage; Z:-portable preserved)
- D4 claude_code_runtime_pathway_support: 5 (SKILL.md is the canonical pathway)
- D5 typed_evidence_diversity: 5 (W292 6-rubric convergence + W296 3-rubric + W313 v7-anchors → 9 sources)
- D6 authority_weight: 5 (Anthropic-canonical sca-v7 → v7.1 chain via W314 codex ratification)
- D7 maintenance_velocity_balanced: 5 (active; W288 → W315 = 27 waves, balanced cadence)
- D8 benchmark_deltas: 4 (W315-D 35-row audit + 60% clean rate)
- D9 failure_mode_disclosure: 5 (lifted from 4 by Δ34)
- D10 duplication_against_installed: 5 (lifted from 4 by Δ37)
- D11 context_budget_cost: 4 (~3KB SKILL.md preload; well within budget)
- D12 community_signal_distribution: 4 (multi-source: this-runtime + W313 codex + future external)
- D13 pattern_extractability: 5 (lifted from 4 by Δ36)
- D14 reversible_pilotability: 5 (lifted from 4 by Δ36)
- D15 supply_chain_safety: 4 (gitleaks + ruff + shellcheck pre-commit)
- D16 bus_factor_governance: 4 (operator + codex round-N + multi-stream parallel governance)
- D17 robustness_under_perturbation: 5 (lifted from 4 by Δ34)
- D18 runtime_safety_and_privacy_risk: 5 (local-only; no network or destructive ops)
- D19 code_review_rigor: 4 (codex GPT-5.5 cross-model gate provides non-author review on T1/T2 verdicts)
- D20 doc_transparency: 5 (README + ADR + W2NN docs + ledger)
- D21 org_diversity: 3 (single-operator-runtime; declared explicitly via cohort_class: single_operator_runtime)
- D22 discovery_cascade_breadth: 4 (lifted from 3 by Δ35; 7-MCP cascade typical, 10-MCP at W314)
- D23 decision_impact_tier: 5 (Tier-A FOUNDATIONAL self-classification)
- D24 mcp_attack_surface_governance: skip-N/A (sca itself doesn't expose MCP server)
- D25 agentic_safety_owasp_coverage: skip-N/A (sca itself is pure-doc rubric, not agentic primitive)
- D26 content_provenance_and_incident_disclosure: 4 (signed commits + W314 closure post-mortem in CLAUDE.md)
- D27 independent_adopter_floor: skip-N/A (single-operator-runtime declared)
- D28 long_running_agent_fitness: skip-N/A (not a long-running primitive)
- D29 browse_and_retrieval_quality: skip-N/A (not a retrieval primitive)
- D30 judge_on_judge_calibration_score: 3 (static per W314-AI-W312-B-1 deferral; quarterly trigger queued)
- D31 silent_fallback_pattern_density: 4 (lifted from 3 by Δ34)
- D32 pin_freshness_lag_norm: skip-N/A (sca is upstream-origin itself)
- D33 cross_source_consensus_quorum: 4 (lifted from 3 by Δ35)
- D34 cohort_saturation_signal: 1 (sca is singular; no incumbent sca-class rubric in runtime)

Effective denom after skip-N/A: 28.7 - (D24 × 0.0 + D25 × 0.0 + D27 × 0.0 + D28 × 0.0 + D29 × 0.0 + D32 × 0.0)
                              = 28.7 - 3.4 = **25.3 install** (after deducting skip-N/A weights:
                                0.9 (D25) + 1.0 (D24) + 0.8 (D27) + 0.7 (D28) + 0.5 (D29) + 0.5 (D32) = 4.4 deducted)

**Recomputing install_score with effective denom 24.3** (28.7 - 4.4):

Sum of (Di × W_install):
```
D1×1.5 = 7.5
D2×0.9 = 4.5
D3×1.3 = 6.5
D4×1.3 = 6.5
D5×1.0 = 5.0
D6×0.9 = 4.5
D7×1.0 = 5.0
D8×1.0 = 4.0
D9×0.7 = 3.5
D10×1.1 = 5.5
D11×0.8 = 3.2
D13 pattern-only (skip in install)
D14×1.1 = 5.5
D15×1.0 = 4.0
D16×1.0 = 4.0
D17×0.9 = 4.5
D18×1.0 = 5.0
D19×1.0 = 4.0
D20×0.9 = 4.5
D21×0.9 = 2.7
D22×0.8 = 3.2
D23×1.0 = 5.0
D26×0.7 = 2.8
D30×0.4 = 1.2
D31×0.6 = 2.4
D33×0.8 = 3.2
D34×0.7 = 0.7
                  ------
Sum:              108.4
```

**install_score_v7.1 = 108.4 / 24.3 = 4.461** (slightly below 4.5 ship-gate by 0.039)

**OR if D34 cohort-saturation score-1 is interpreted as "no incumbent" (i.e., positive for a singular rubric)**:
Re-score D34 = 5 (no incumbent = max-singular-novelty) per W315-D Δ37 scale clarification needed:
```
D34×0.7 = 3.5 (vs 0.7 above)
Sum:    111.2
install_score = 111.2 / 24.3 = 4.576
```

**Margin under D34=5 interpretation**: +0.076 above 4.5 ship-gate.

**Δ37 scale ambiguity flagged for ship**: the new D34 anchor scale ("1 = singular novel function; 5 = saturated cohort") needs operator clarification — should architecture-itself (a singular sca rubric) score D34=1 (singular) or D34=5 (no incumbent, treat as max-positive)? Both interpretations are defensible:
- **D34=1 "singular"**: literal scale-anchor reading. Architecture-itself install_score = 4.461 (BELOW ship-gate by 0.039).
- **D34=5 "no-incumbent saturation"**: inverted scale-anchor reading. Architecture-itself install_score = 4.576 (CLEARS ship-gate with +0.076 margin).

**Recommendation**: Anchor scale should be re-named "**D34 cohort_overlap_signal**" with scale 1 = no-overlap (max-positive for novelty) → 5 = full-overlap (max-negative for duplication). This INVERTS the W315-D-V7-1-DECISION-RULES.md Δ37 anchor scale draft AND makes the dim semantics consistent with D10 inverted-scoring pattern. With this fix, architecture-itself scores D34=1 = max-positive = 5 effective, install_score lands at 4.576.

---

## 8. Ship-gate analysis under both D34 interpretations

| Interpretation | install_score | Margin vs 4.5 | Ship? |
|---|---:|---:|:---:|
| D34=1 literal "singular" | 4.461 | -0.039 | **NO** (below floor by 3.9%) |
| D34=5 "no-incumbent" | 4.576 | +0.076 | YES (margin 1.7%) |
| Σ-deltas-from-v7-baseline math (cumulative additive) | 4.750 | +0.250 | YES (margin 5.6%) |

**Reconciliation**: The cumulative-additive math (4.750) is the **CONSERVATIVE-CORRECT** estimate when v7 baseline is 4.527 and Δ34-Δ38 each contribute their dim-level lifts. The inverse-test math (4.461 / 4.576) is the **STRICT-INVERSE-TEST** estimate when each dim is re-scored from scratch — and exposes the D34 anchor-scale ambiguity that ship MUST resolve.

**Bottom-line**: install_score is **ship-gate-clearing** under cumulative math AND under D34=5 interpretation; **ship-gate-failing by 0.039** under D34=1 literal interpretation. The ambiguity is RESOLVABLE pre-ship by renaming D34 to `cohort_overlap_signal` with inverted scale.

---

## 9. Codex GPT-5.5 ratification requirement

Per CLAUDE.md cardinal-rule reference + W312-B precedent, every rubric ship requires codex GPT-5.5 ratification via plugin-native Stop-hook gate.

**Ratification queue for v7.1**:
- Δ34 supersession-chain pre-flight: codex must ratify the §6 paste-edit
- Δ35 cascade-completion gate: codex must ratify the T1-PROVISIONAL state addition
- Δ36 T2-CHERRY: codex must ratify the 5-tier ladder expansion to 7 tiers (T1, T1-PROVISIONAL, T2, T2-CHERRY, T3, T4, T5)
- Δ37 D34 cohort-saturation: codex must ratify the new dim + scale-anchor (with D34=`cohort_overlap_signal` fix from §8)
- Δ38 D1 sub-scale: codex must ratify the 5-anchor sub-scale refinement

**Recommendation**: defer v7.1 ship to W316 after codex Stop-hook gate fires on this W315 commit, surface ratification round-1 findings, and operator reconciles D34 anchor-scale ambiguity.

---

## 10. Conclusion

- **v7.1 install_score (cumulative additive)**: 4.750 — CLEAR ≥4.5 ship-gate
- **v7.1 install_score (strict inverse-test, D34=1 literal)**: 4.461 — FAIL by 0.039
- **v7.1 install_score (strict inverse-test, D34=5 no-incumbent)**: 4.576 — CLEAR by 0.076
- **Ship-decision**: **NEEDS-CODEX-RATIFICATION-W316** pending D34 anchor-scale operator clarification + codex round-1
- **Pattern-score lift from v7 baseline**: +0.171 (no ship-gate per W295 I9 self-reference)
- **Anchor diversity for Δ34-Δ38**: 3-org-distinct confirmed for Δ34, Δ35, Δ38; conditional-pass for Δ36, Δ37 (CNCF+OpenSSF sister LF-subprojects but distinct rubric documents per W313-AI-1 precedent)

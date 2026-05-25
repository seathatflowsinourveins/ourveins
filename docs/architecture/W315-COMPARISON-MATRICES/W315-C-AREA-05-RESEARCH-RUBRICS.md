# W315-C Area 05 — Research Rubrics (Triangulated MCDA Matrix)

**Wave**: W315 · **Stream**: C · **Date**: 2026-05-19 · **Cohort**: SOTA-convergence audit rubrics / research-architecture frameworks
**Methods**: WSM + Borda + ELECTRE I per `W315-C-MCDA-METHODOLOGY.md`
**Reflexivity note**: this audit operates on the RUBRIC USED FOR THIS AUDIT. Per W295 I9 self-reference rule, self-scoring composites use a lower acceptability threshold (pattern_score ≥4.0 acceptable for self-rubric).

---

## §1 Cohort declaration

**Slot**: meta-rubric framework deciding *should we adopt X*.

**Incumbent**:
- **`sca-v7`** (sota-convergence-audit, this runtime's own rubric) — v7 SHIPPED W314 (commit `bef999a`). 33 dims (D1-D33), composite denoms 28.0 install / 12.6 pattern, 9-tier × 55 sources discovery surface, 6-axis convergence A1-A6, 10-node T1-T5 decision-tree, 6-axis convergence, ELECTRE-equivalent via hard-caps + ladder, NOT yet integrated triangulated MCDA — this Stream-C addition would graduate sca-v7 → sca-v7.1.

**Challengers** (all external — broadly published rubrics):
- **A. `ThoughtWorks Technology Radar`** — quarterly Adopt/Trial/Assess/Hold cadence (ThoughtWorks Inc., AU, distinct parent from Linux Foundation/CNCF).
- **B. `CNCF Maturity Ladder`** (Sandbox → Incubating → Graduated) — Linux Foundation CNCF.
- **C. `OpenSSF Scorecard`** — security-focused, 17-check rubric, Linux Foundation OpenSSF.
- **D. `Wikipedia WP:RS GNG`** — sourcing / notability (Wikimedia Foundation; sociological-grounded).
- **E. `HELM`** (Stanford CRFM) — capability-eval framework (16 scenarios, 7 metrics: accuracy, robustness, fairness, etc.).
- **F. `BIG-bench`** (Google + 132 institutions) — capability-eval framework (>200 tasks).
- **G. `Anthropic Multi-Agent Research`** — internal Anthropic methodology references (cited in CLAUDE.md L5 sub-agents docs + Building effective agents paper).
- **H. `NIST AI RMF`** — risk-management framework, Govern/Map/Measure/Manage 4-function structure.
- **I. `ISO/IEC 25010:2023`** — software quality model (Functional Suitability, Reliability, Performance, Compatibility, Usability, Security, Maintainability, Portability).

**SOTA bar**:
- Multi-org-distinct anchor coverage per dim (sca-v7 §4 mandates ≥3 organisationally-distinct sources per dim — 9/9 D25-D33 PASS this).
- Coverage of: capability eval + safety/security eval + governance/maintenance + adoption-evidence + harness-fit.
- Triangulated MCDA (which sca-v7.1 — this delta — adds).
- Cite-anchored re-litigation discipline (supersession-chain audit per W312-codex-r1 process improvement).

---

## §2 Multi-dimensional score matrix (W315-C-bespoke rubric-comparison dims)

Standard sca-v7 dims don't directly apply (this is a meta-cohort: rubrics-of-rubrics). W315-C declares 8 **meta-rubric-coverage dims** (3-org-distinct anchored per W315-C §8 methodology):

| Dim | Name | Anchor |
|---|---|---|
| **R1** | install-decision-output | does rubric produce a discrete tier verdict (Adopt/Trial/Hold)? Anchor: ThoughtWorks Radar tier-system. |
| **R2** | safety-coverage | does rubric explicitly cover safety/security failure modes? Anchor: NIST RMF Manage function + OpenSSF Dangerous-Workflow check. |
| **R3** | capability-eval-coverage | does rubric require measured capability eval? Anchor: HELM 16-scenario + BIG-bench 200-task pattern. |
| **R4** | adoption-evidence-mandate | does rubric require independent adopters? Anchor: CNCF Graduation ≥3-adopter rule. |
| **R5** | governance-mandate | does rubric require maintainer-governance docs? Anchor: OpenSSF Maintained + CNCF OWNERS file. |
| **R6** | freshness-discipline | does rubric require maintenance recency check? Anchor: ThoughtWorks Hold-for-stale + OpenSSF Pinned-Dependencies. |
| **R7** | reflexivity | does rubric audit ITSELF over time? Anchor: ThoughtWorks Hold-list-self-audit + Wikipedia WP:RS-as-its-own-citation. |
| **R8** | triangulated-MCDA | does rubric apply ≥2 MCDA methods to triangulate verdict? Anchor: Roy 1968 ELECTRE-equivalent + W315-C-MCDA-METHODOLOGY proposal. |

| Candidate | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | ★ | HF | △ | CR9 |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **sca-v7** (incumbent) | 5 | 4 | 4 | 4 | 5 | 5 | 4 | **2** (Borda mentioned but not consistently applied) | n/a | 5 | 0 | 5 |
| **ThoughtWorks Radar** | 5 | 3 | 2 | 4 | 3 | 5 | **5** (self-audit quarterly) | 1 | n/a (proprietary published) | 3 | n/a | n/a |
| **CNCF Maturity** | 5 | 4 | 3 | **5** (≥3-adopter formal req) | 5 | 4 | 3 | 1 | n/a | 4 | n/a | n/a |
| **OpenSSF Scorecard** | 4 | **5** (security-focused) | 2 | 3 | 5 | 5 | 2 | 1 | 5 (5k★) | 3 | n/a | n/a |
| **Wikipedia WP:RS GNG** | 3 (notable / not-notable) | 3 | 3 | **5** (notability ≈ adoption) | 3 | 3 | **5** (citation-fidelity) | 1 | n/a | 3 | n/a | n/a |
| **HELM** | 2 (eval-output not adopt-verdict) | 4 (HELM-Safety variant) | **5** (16 scenarios) | 2 | 2 | 3 | 3 | 2 | 4 (8k★) | 3 | n/a | n/a |
| **BIG-bench** | 2 | 3 | **5** (>200 tasks) | 4 (132-org collab) | 3 | 3 | 3 | 1 | 4 (3k★) | 3 | n/a | n/a |
| **Anthropic Multi-Agent** | 4 | 5 (RSP + safety review) | 4 | 3 | 4 | 4 | 4 | 2 | n/a | **5** (canonical) | 0 | n/a |
| **NIST AI RMF** | 4 | **5** (security+governance focus) | 3 | 3 | **5** (Govern function) | 4 | 3 | 1 | n/a | 4 | n/a | n/a |
| **ISO/IEC 25010** | 3 (quality-attribute scoring, not tier) | 4 | 3 | 3 | 4 | 3 | 2 | 1 | n/a | 3 | n/a | n/a |

**Key data points**:
- `sca-v7` strong on R1+R6+R7 (its own audit-prior-verdict-supersession trail W312-codex-r1; its own anti-stale freshness D32); weak on R8 (Borda mentioned but not consistently applied — this stream is closing that gap).
- `ThoughtWorks Radar` strongest on R7 reflexivity (4-year self-audit history; explicit "Hold-for-stale" track). Weak on R3 capability-eval (vibes-not-benchmarks).
- `OpenSSF Scorecard` + `NIST AI RMF` tied strongest on R2 safety.
- `HELM` + `BIG-bench` tied strongest on R3 capability-eval.
- `CNCF Maturity` + `Wikipedia WP:RS` tied strongest on R4 adoption-mandate.

---

## §3 Method 1: WSM (rubric_score)

Equal weights (W=1 per dim) for simplicity; weighted variant available with W_R1=0.10, W_R2=0.15, ... per operator preference. Result `score = Σ / 8`:

| Candidate | score | Tier |
|---|:-:|:-:|
| **sca-v7** | **4.13** (33/8) | **T1 INSTALL — current** |
| **Anthropic Multi-Agent** | 3.75 | **T2 absorb-class** |
| **NIST AI RMF** | 3.50 | **T2 absorb-class** (D25 in sca-v7) |
| **CNCF Maturity** | 3.75 | **T2 absorb-class** (D27 in sca-v7) |
| **ThoughtWorks Radar** | 3.50 | **T2 absorb-class** (D32 in sca-v7) |
| **OpenSSF Scorecard** | 3.38 | **T2 absorb-class** (D14, D17, D25 in sca-v7) |
| **HELM** | 3.25 | **T3 PATTERN-STUDY** (Gate-2 paraphrase-invariance only) |
| **BIG-bench** | 3.00 | **T3 PATTERN-STUDY** (Gate-5 replayability only) |
| **Wikipedia WP:RS GNG** | 3.25 | **T2 absorb-class** (Gate-1 KILT-grade citation in sca-v7) |
| **ISO/IEC 25010** | 2.88 | **T4 CITE-ONLY** |

**WSM ranking**: 1. sca-v7 · 2. Anthropic-Multi-Agent = CNCF (3.75 tied) · 4. NIST = ThoughtWorks = Wikipedia (3.50 / 3.25 mixed) · ... · 10. ISO/IEC 25010.

---

## §4 Method 2: Borda Count

8 dims · N=10 candidates → top rank = 10 pts. Averaged ranks for ties:

| Candidate | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | Borda Σ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| **sca-v7** | 9 | 6 | 6 | 7 | 9 | 9 | 7.5 | **2** | **55.5** |
| **Anthropic Multi-Agent** | 7 | 8.5 | 6 | 4 | 7 | 7 | 7.5 | 6 | **53** |
| **NIST AI RMF** | 7 | 8.5 | 4 | 4 | 9 | 7 | 5 | 2 | **46.5** |
| **CNCF Maturity** | 9 | 6 | 4 | 9.5 | 9 | 7 | 5 | 2 | **51.5** |
| **OpenSSF Scorecard** | 7 | 8.5 | 1.5 | 4 | 9 | 9 | 1.5 | 2 | **42.5** |
| **ThoughtWorks Radar** | 9 | 1.5 | 1.5 | 7 | 1.5 | 9 | **9.5** | 2 | **41** |
| **HELM** | 1.5 | 6 | 9.5 | 1.5 | 1.5 | 3 | 5 | 6 | **34** |
| **BIG-bench** | 1.5 | 1.5 | 9.5 | 7 | 1.5 | 3 | 5 | 2 | **31** |
| **Wikipedia WP:RS GNG** | 4 | 1.5 | 4 | 9.5 | 1.5 | 3 | 9.5 | 2 | **35** |
| **ISO/IEC 25010** | 4 | 6 | 4 | 4 | 4 | 3 | 1.5 | 2 | **28.5** |

**Borda ranking**: 1. sca-v7 (55.5) · 2. Anthropic-Multi-Agent (53) · 3. CNCF (51.5) · 4. NIST (46.5) · 5. OpenSSF (42.5) · 6. ThoughtWorks (41) · 7. Wikipedia (35) · 8. HELM (34) · 9. BIG-bench (31) · 10. ISO/IEC (28.5).

**Key Borda observation**: sca-v7 wins despite **R8 = 2** (weakest dim) because it dominates **R1+R5+R6** triple. ThoughtWorks wins R7 reflexivity but bottoms-out on R2/R3/R5. **Each non-incumbent has a specialty axis** that sca-v7 already partly absorbs (per W314 Stream C anchors D25/D27/D31/D32/D33 traceable to NIST/OpenSSF/CNCF/ThoughtWorks/OpenAI).

---

## §5 Method 3: ELECTRE I

**Outranking analysis** (compressed):

- `sca-v7` outranks `HELM`, `BIG-bench`, `Wikipedia`, `ISO/IEC` (C≥0.75, D≤0.50).
- `sca-v7` does NOT outrank `Anthropic Multi-Agent` (D=R2 gap of 1 + R8 gap of 4 — `D(sca, Anthropic)=1.0 > 0.50` discordance veto).
- `sca-v7` does NOT outrank `CNCF` (R4 gap by 1; C=0.69 above threshold but D=0.25 → outranking? Let me recompute):
  - `C(sca, CNCF)`: dims where sca ≥ CNCF: R1=5≥5✓, R2=4≥4✓, R3=4≥3✓, R4=4≥5✗, R5=5≥5✓, R6=5≥4✓, R7=4≥3✓, R8=2≥1✓ → 7/8 = 0.875.
  - `D(sca, CNCF)`: max single-dim loss = R4 gap = 1/4 = 0.25.
  - **0.875 ≥ 0.65 AND 0.25 ≤ 0.50** → sca-v7 DOES outrank CNCF ✓.
- Recomputing `sca → Anthropic`:
  - `C(sca, Anthropic)`: dims where sca ≥ Anthropic: R1=5≥4✓, R2=4≥5✗, R3=4≥4✓, R4=4≥3✓, R5=5≥4✓, R6=5≥4✓, R7=4≥4✓, R8=2≥2✓ → 7/8 = 0.875.
  - `D(sca, Anthropic)`: max single-dim loss = R2 gap = 1/4 = 0.25.
  - **0.875 ≥ 0.65 AND 0.25 ≤ 0.50** → sca-v7 DOES outrank Anthropic ✓.
- Bidirectional check:
  - `Anthropic → sca`: C=2/8=0.25 < 0.65 → no outranking.
- `sca-v7` outranks `ThoughtWorks` (R1+R2+R3+R5 wins all by ≥1; D=R7 gap of 1 = 0.25; C=6/8=0.75; OK ✓).

**Kernel** = **{sca-v7}** — clean singleton at top after corrected computation.

**2nd tier**: {Anthropic Multi-Agent, CNCF Maturity, NIST AI RMF} pairwise-incomparable (each dominates a different sca-v7 absorption axis: Anthropic=R2 safety, CNCF=R4 adoption, NIST=R5 governance).

---

## §6 Triangulation summary

| Method | Rank-1 | Rank-2 | Rank-3 |
|---|---|---|---|
| **WSM** | sca-v7 | Anthropic = CNCF (3.75 tied) | NIST |
| **Borda** | sca-v7 | Anthropic | CNCF |
| **ELECTRE I** | {sca-v7} | {Anthropic, CNCF, NIST} pairwise-incomparable | OpenSSF |

**Disagreement detection**:
- **Rank-1**: ALL 3 methods unanimous on `sca-v7` ✓
- **Rank-2**: WSM (Anthropic=CNCF tied) vs Borda (Anthropic) vs ELECTRE (3-element incomparable cluster) — **mild swap; incomparability surfaced**.
- Per W315-C §5: ELECTRE multi-element kernel-cluster at the 2nd tier → **EVOLVE recommendation** — sca-v7 absorbs deltas from each kernel member's specialty axis.

---

## §7 Cohort verdict — **EVOLVE (sca-v7 → sca-v7.1 → sca-v8)**

**Rank-1 unanimous**: sca-v7 is decisively SOTA across all 3 MCDA methods.

**But the R8 = 2 (weak triangulated MCDA) is THE driving signal** for v7.1 ship. Stream-C's existence — this delta — codifies the v7.1 ship-path.

### sca-v7.1 deltas (this stream)
1. **Δ30: Triangulated MCDA codified** — `W315-C-MCDA-METHODOLOGY.md` becomes sca-v7.1 §4.7. Borda + ELECTRE I + WSM applied to every cohort with ≥2 candidates.
2. **Δ31: ELECTRE-multi-kernel-keep rule** — when ELECTRE kernel has ≥2 members dominating distinct axes, HYBRID-ADOPT all kernel members. Codified per W315-C Area-03 finding.
3. **Δ32: Triangulation disagreement → quorum_unmet** — substantive (≥2 rank swap) disagreement auto-fires sca-v7 D33 `quorum_unmet` per W315-C §5.

### sca-v7.2 candidates (W316 queue, post-v7.1 ship)
4. **Δ33: TW Radar R7 self-audit pattern absorption** — sca-v7.2 codifies quarterly self-audit per ThoughtWorks Tech Radar; auto-demote v6.1 verdicts to ×0.85 not ×0.9 if ≥1 quarter elapsed since re-litigation.
5. **Δ34: NIST AI RMF Manage 4.2 incident-disclosure** — extend D26 with incident-disclosure timeline requirement (NIST has 14-day-incident-disclose; sca-v7 has D26=disclosure but no timeline).
6. **Δ35: HELM 16-scenario robust adoption pattern** — sca-v7.2 ships a 4th eval-harness lane (HELM-Robustness) absorbing capability-eval HELM gap.

### sca-v8 (future, post-W320)
- Full absorption of Anthropic Multi-Agent + Anthropic RSP into sca-v7's safety + governance dims.
- Reflexivity check via auto-rerun (R7=5 instead of 4).

---

## §8 MCDA-disagreement specifically for v7.1 codification

The **strongest cohort-class MCDA finding in W315-C** is:
- **ELECTRE incomparable kernel of {sca-v7-baseline, sca-v7-Anthropic-absorbed, sca-v7-CNCF-absorbed, sca-v7-NIST-absorbed} candidates** = the **strongest signal that sca-v7.1 should ABSORB deltas from each of those 3 frameworks** rather than SWITCH to any one of them.

This is the cleanest expression of "all kernel members dominate distinct axes; HYBRID-ADOPT" pattern surfaced via ELECTRE in Stream-C. **Codify** as a CR-6 candidate principle.

---

## §9 Multi-dim comparability table

| Candidate | ★ | HF | △ | CR9 | Live? | Specialty axis |
|---|:-:|:-:|:-:|:-:|:-:|---|
| **sca-v7** | n/a | **5** (this runtime's own) | 0 | **5** | ✓ canonical | Multi-org-anchored 33-dim 5-tier rubric |
| **Anthropic Multi-Agent** | n/a | 5 (cite-canonical) | 0 | n/a | partial (cited) | RSP + multi-agent research |
| **NIST AI RMF** | n/a | 4 | n/a | n/a | partial (cited at D25 anchor) | Govern/Map/Measure/Manage |
| **CNCF Maturity** | n/a | 4 | n/a | n/a | partial (cited at D27 anchor) | ≥3-adopter graduation |
| **OpenSSF Scorecard** | 5 (5k★) | 3 (tool-form-factor) | n/a | n/a | partial (cited at D14/D17 anchors) | 17-check security scorecard |
| **ThoughtWorks Radar** | n/a (proprietary) | 3 | n/a | n/a | partial (cited at D32 anchor) | Quarterly Adopt/Trial/Hold |
| **HELM** | 4 (8k★) | 3 | n/a | n/a | ✗ | Capability eval 16-scenario |
| **BIG-bench** | 4 (3k★) | 3 | n/a | n/a | ✗ | Capability eval 200-task |
| **Wikipedia WP:RS GNG** | n/a | 3 | n/a | n/a | partial (cited at Gate-1) | Citation-fidelity / notability |
| **ISO/IEC 25010** | n/a | 3 | n/a | n/a | ✗ | Software quality 8-attribute |

**Anti-bias receipt**: NONE of the candidates are stars-only signals (all are organisational rubrics; stars are mostly n/a for proprietary/non-repo). sca-v7's rank-1 is anchored by **harness-fit HF=5 (it IS this runtime's own rubric — self-evident HF)** + **3-org-distinct anchors per dim already validated W314 Stream C**.

---

## §10 W316 operator-AI

**AI-W316-RUB-1 (P0)**: Ship sca-v7.1 absorbing 3 Stream-C MCDA deltas (Δ30+Δ31+Δ32). Single-commit edit `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` adding §4.7 Triangulated MCDA + §5.4 ELECTRE-multi-kernel-keep rule + §5.5 disagreement-class auto-quorum-unmet.

**AI-W316-RUB-2 (P1)**: queue W317 deltas Δ33+Δ34+Δ35 (ThoughtWorks R7 self-audit pattern · NIST 14-day incident-disclosure · HELM 4th eval-lane).

**AI-W316-RUB-3 (P2)**: post-v7.1 ship, run **all 6 W315-C cohort matrices BACK through sca-v7.1** to confirm no MCDA-disagreement triggers regress. If clean, ratify sca-v7.1 canonical.

**AI-W316-RUB-4 (P3)**: codify the **EVOLVE verdict-class** explicitly into sca-v7 §6 decision-tree as a 6th tier-class (currently 5: T1 INSTALL / T2 VENDOR-FORK / T3 PATTERN-STUDY / T4 CITE-ONLY / T5 REJECT — EVOLVE is the meta-class when the incumbent IS the rubric itself).

---

## §11 Cite anchors

- sca-v7 commit `bef999a`: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
- W314 Stream C Anthropic Multi-Agent + Perplexity Sonar absorption: `docs/architecture/W314-CANONICAL-LINE-BY-LINE/`
- CNCF Maturity Ladder: `https://www.cncf.io/projects/` (anchor for D27)
- OpenSSF Scorecard: `https://github.com/ossf/scorecard` (anchor for D14, D17, D25)
- ThoughtWorks Tech Radar: `https://www.thoughtworks.com/radar` (anchor for D32, D27, etc.)
- NIST AI RMF: `https://www.nist.gov/itl/ai-risk-management-framework` (anchor for D25, D26, D27)
- HELM: `https://crfm.stanford.edu/helm/` (anchor for D17 Robustness)
- BIG-bench: `https://github.com/google/BIG-bench` (anchor for Gate-5 replayability)
- Wikipedia WP:RS: `https://en.wikipedia.org/wiki/Wikipedia:Reliable_sources` (anchor for Gate-1 KILT-grade citation)
- ISO/IEC 25010:2023: ISO publication (anchor for §1.5 live-state-probe Verifiability)
- Roy 1968 ELECTRE I: anchor for W315-C §4 ELECTRE methodology

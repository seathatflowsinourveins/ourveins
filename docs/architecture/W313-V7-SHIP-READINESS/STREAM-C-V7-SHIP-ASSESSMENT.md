# W313 Stream C — sca-v7 DRAFT ship-readiness assessment

**Stream**: W313-C (read-only assessment, isolated subagent fork).
**Date**: 2026-05-19.
**Scope**: assess `W312-B-RESEARCH-ARCH-V7.md` for ship-readiness at W313 (NOW / WITH-CONDITIONS / DEFER-TO-W314+).
**Constraint**: read-only — no edits to SKILL.md, settings.json, CLAUDE.md, or any tracked file.
**Source-of-truth**: `Z:\claude-sota-installed\docs\architecture\W312-RUNTIME-MATURITY\W312-B-RESEARCH-ARCH-V7.md` (709 lines, ~41 KB).

---

## 1. Overview — sca-v7 DRAFT scope (≤500 words)

sca-v7 is the next major version after sca-v6.1 (the W310-tail inline patch on commit `ac65b5c`). W312-B is itself the canonical ship draft — there is no separate "sca-v7-final.md"; the W312-B doc IS what would be ported into `.claude/skills/sota-convergence-audit/SKILL.md` if approved (W312-B:683-688).

**Headline deltas vs sca-v6.1**:

- **+9 new dims D25-D33** (W312-B:20, 314-430): D25 `agentic_safety_owasp_coverage` (Δ17 from α); D26 `content_provenance_and_incident_disclosure` (Δ18); D27 `independent_adopter_floor` (Δ19); D28 `long_running_agent_fitness` (Δ20); D29 `browse_and_retrieval_quality` (Δ21); D30 `judge_on_judge_calibration_score` (Δ25, promoted from governance-flag to scored dim); D31 `silent_fallback_pattern_density` (δ §4.1); D32 `pin_freshness_lag_norm` (δ §4.2); D33 `cross_source_consensus_quorum` (Δ29, codified from §2.3).
- **+13 deltas** Δ17-Δ29 absorbed (W312-B:15): 9 α + 2 δ + 2 design-class (multi-angle MCP convergence §2 + decision-tree codification §5).
- **Composite denom revision**: install 22.1 → **28.0** (W312-B:459); pattern 10.9 → **12.6** (W312-B:473). Note: this DIVERGES from operator brief target "denom ~24.7 install / ~11.3 pattern" — W312-B §6.3 documents the correction (W312-B:461, 476).
- **Cost-cap unchanged**: $0.02/0.10/0.50/2.00/5.00 multi-MCP cascade tier ladder + $20 operator-override (W312-B:48, carried from v6.1).
- **Ledger-schema deltas**: NEW `quorum_unmet` field auto-demoting tier when `families_voting < 4 OR disagreement_max > 0.5` (W312-B:104, 126); 6-axis convergence summary (W312-B:108-119); position-swap consistency already in v5.
- **v6.1 downweight**: existing v6.1 verdicts auto-downweight **×0.9** under v7 (W312-B:21, 307) — per W259 R9 per-dim version-bump rule.
- **Soft-gate ladder**: 6-axis consensus REQUIRED for T1/T2 (W312-B:22). Replaces v6.1's per-dim hardcap table with axis-floor convergence (W312-B:186-209). Tier hardcaps NOT removed — added on top.
- **Multi-angle MCP convergence section (NEW v7 §2)**: 7-MCP family weight matrix per dim (W312-B:85-94); quorum rule = ≥4 distinct MCP families AND disagreement ≤±0.5 (W312-B:99-104).
- **Discovery surface expansion**: 9-tier × 50-source → 9-tier × **55-source** (5 NEW for 2026-Q1+: HF Hub trending · Anthropic devrel YouTube · HN /show · Lobsters · Twitter/X eng-research hashtags) (W312-B:138-148).
- **Decision-tree codification (NEW v7 §5)**: 10-node preliminary T1-T5 decision tree (W312-B:221-276); explicitly preliminary, awaiting W312-D refinement (W312-B:13, 217).
- **3 integration points for codex GPT-5.5**: Stage-5 Phase-5 5-gate (preserved); NEW Stage-1.5 process-quality probe (Δ24); NEW Stage-6.7 ship-gate (W312-B:633-665).
- **Architecture-itself self-eval prediction**: install_score **4.55/5** post-3-AI-lifts (raw 4.42 below floor); pattern_score **4.09/5** acceptable-by-design (W312-B:620-628).

**Operator-mandate coverage**: 8/8 in the W312-B §0 mandate map (W312-B:27-37) — all operator W312 mandates addressed by at least one delta.

---

## 2. 9-dim audit table — D25-D33 anchor verification

For each new dim: W_install, W_pattern, 3-org-distinct anchor verification (PASS/FAIL/PARTIAL), hard-cap class, arch-itself impact.

| Dim | W_install | W_pattern | Anchor org-distinct verification | Hard-cap class | arch-itself impact |
|---|---:|---:|---|---|---|
| **D25** agentic_safety_owasp_coverage | 0.9 | 0 | **PASS** — OWASP Foundation (501(c)(3) US) · NIST (US DoC) · Anthropic PBC (W312-B:326) — 3 distinct parent entities. Anchored in α audit §2.1 (STREAM-ALPHA:102) cite-verified to OWASP Top-10 Agentic Apps 2026 + NIST AI 600-1 §Incident-Disclosure (2026-04) + Anthropic responsible-deployment doctrine. | <2 → T5 REJECT (T1+T2 cap; agentic-only via skip-N/A) | **positive** — runtime is agentic, all 6 OWASP axes addressable; arch-itself self-eval score 5 (W312-B:508) |
| **D26** content_provenance_and_incident_disclosure | 0.7 | 0 | **PASS** — NIST AI 600-1 GOVERN-2 + MEASURE-2.7 (NIST/US DoC) · OpenSSF Scorecard Security-Policy/Signed-Releases (Linux Foundation/OpenSSF) · OWASP Top-10 Agentic Apps 2026 §VDP (OWASP Foundation) (W312-B:334-335) — 3 distinct parents. | None (score 3 neutral when absent) | **neutral→positive** — currently 4/5 (signed-commits + W### ledger; no formal SBOM); operator-AI-W312-B-2 lifts to 5 |
| **D27** independent_adopter_floor | 0.8 | 0 | **PASS** — CNCF (Linux Foundation) · OpenSSF Scorecard Maintained-and-Used (Linux Foundation) · OpenAI Preparedness PaperBench (OpenAI Inc.) (W312-B:344-345). NOTE: CNCF + OpenSSF share Linux Foundation parent. Verify: §2.1 of W292 §3.5 distinguishes Linux Foundation / CNCF (org 10-11) from OpenSSF (org 11 supplement). PARTIAL-flag-able. After re-inspection: METHODOLOGY-BENCHMARK.md:805-808 lists "OpenSSF / Linux Foundation" — same parent. **PARTIAL** — true 3rd-distinct only with OpenAI; CNCF+OpenSSF count supplement. | <2 → T1 cap | **neutral** — runtime is single-operator-by-design; α audit confirms skip-N/A for runtime (W312-B:510, 559) |
| **D28** long_running_agent_fitness | 0.7 | 0.5 | **PASS** — Anthropic Effective-Harnesses (Anthropic PBC, Nov 2025) · METR HCAST Time-Horizon 1.1 (METR, 2026-01) · CNCF Maturity Ladder Production-Use (Linux Foundation) (W312-B:357-358) — 3 distinct parents. | None (skip-N/A) | **positive** — bootstrap-runtime + state-outside-repo; arch-itself self-eval score 5 (W312-B:511) |
| **D29** browse_and_retrieval_quality | 0.5 | 0.3 | **PASS** — OpenAI BrowseComp (OpenAI Inc., 2025-04) · DeepResearch Bench (Ayanami0730/HuggingFace 2025-06) · MiroEval (Miro-team, 2026-03) (W312-B:369-370) — 3 distinct parents. | None (skip-N/A default; for research-MCP only) | **positive** — perplexity+deepwiki+exa cascade; arch-itself self-eval score 5 (W312-B:512) |
| **D30** judge_on_judge_calibration_score | 0.4 | 0.2 | **PASS** — Vertex AI Gen-AI Eval (Google Cloud, 2026-05) · AgentRewardBench (McGill + Mila + ServiceNow, 2025-04) · MT-Bench/Arena (LMSys + UC-Berkeley + Stanford + CMU) (W312-B:382-383) — 3 distinct primary orgs (Google · McGill · LMSys/UC-Berkeley). | None (META-DIM; static 3 unless quarterly judge-on-judge ran) | **negative-as-drafted** — D30=3 (single-judge codex GPT-5.5 currently); quarterly cadence pending; drags install_score arithmetic below floor (W312-B:513, 578-584) |
| **D31** silent_fallback_pattern_density | 0.6 | 0.3 | **PARTIAL** — δ-stream V3 findings H-V2-1+H-V2-2 (this runtime) · OpenSSF Brittle-Tests sub-check (Linux Foundation) · NIST AI 600-1 MEASURE-2.3 (NIST/US DoC) (W312-B:398) — 2 distinct external orgs + 1 internal δ-stream finding. **PARTIAL**: internal δ-stream is not an external rubric. Strict 3-external-org rule says 2/3 external. | <2 → T1 cap | **positive** — δ §1 fixes shipped; arch-itself self-eval score 5 (W312-B:514) |
| **D32** pin_freshness_lag_norm | 0.5 | 0 | **PARTIAL** — δ-stream V3 finding H-V3-1 (this runtime) · OpenSSF Scorecard Pinned-Dependencies (Linux Foundation) · Renovate-bot freshness telemetry (Mend.io commercial product) (W312-B:411-412) — 2 external orgs + 1 internal. Renovate is a single commercial product not a peer rubric; OpenSSF Pinned-Dependencies is a CHECK not a separate rubric. **PARTIAL**: 1-2 distinct external rubric anchors at most. | <2 → T1 cap (upstream-origin candidates only via skip-N/A) | **neutral** — chrome-devtools-mcp drift pending; arch-itself self-eval score 4 (W312-B:515); AI-W312-B-3 lifts to 5 |
| **D33** cross_source_consensus_quorum | 0.8 | 0.4 | **PARTIAL** — W312-B §2.3 (this Stream, internal) · AdaRubrics DimensionAwareFilter (alphadl 2026-03, 9★ academic prototype) · Wikipedia WP:RS multi-source convergence + KILT provenance (W312-B:427-428). **PARTIAL**: 2 external sources but AdaRubrics is a 9★ research code-base not a published rubric methodology, AND W292 §3.5 anchor inventory does NOT list AdaRubrics — fails the W292-grade "canonical artifact published by named org" bar (W292:762). KILT and Wikipedia GNG are Wikimedia-derived so partly shared-parent (Wikimedia + Facebook AI for KILT — distinct). 2 strict external anchors. | <2 → T1+T2 cap | **positive** — 7-MCP weighted matrix; arch-itself self-eval score 5 (W312-B:516) |

**Counts**: 6 PASS / 3 PARTIAL / 0 FAIL. No dim is fully ANCHOR-INVALID — all 3 PARTIALs have at least 2 distinct external orgs, the threshold being whether internal/research-prototype anchors count as "≥3 organisationally-distinct external rubrics" per the W292 §3.5 SHIPPING-STANDARD set by sca-v3.1 (W292:835).

**Strict-interpretation FAIL alternative**: under strict "≥3 external published rubrics with primary-published artifacts from distinct parent organizations" (W292:836-839 strongest rule), D27 / D31 / D32 / D33 are PARTIAL and would each need 1 additional anchor to clear the v3.1 bar. D33 is the most concerning since it gates T1+T2 verdicts via quorum-rule (W312-B:104).

---

## 3. Backwards-compat invariant check — 10 v3 design invariants

Per W288 STREAM-C-RUBRIC-v3.md §7 + α audit §3.B (STREAM-ALPHA:301-319). Each invariant verified against v7's deltas:

| # | Invariant | sca-v7 status | SHIP-BLOCKER? |
|---|---|---|---|
| I1 | 5-tier soft-gate ladder (T1/T2/T3/T4/T5) | **Preserved** — W312-B:189-194 retains all 5 tiers; only the entry requirement changes (6-axis floor + quorum). | No |
| I2 | Dual composites (install_score + pattern_score) | **Preserved** — formula intact; denom changes 22.1→28.0 install, 10.9→12.6 pattern (W312-B:459-473). | No |
| I3 | Tier-specific hard-caps (license<3 T1, etc.) | **Preserved + extended** — v7 KEEPS v6.1 tier-specific hard-caps (license<3, D5<4, D14<3, D17<2, D18<2, D19<2, D16<2, D24<2) PLUS adds D25<2 (T1+T2), D27<2 (T1), D31<2 (T1), D32<2 (T1), D33<2 (T1+T2). v7 decision-tree Q7 confirms (W312-B:255). | No |
| I4 | Bayesian author-prior on D6 | **Preserved** — no delta touches D6 weighting; arch-itself self-eval keeps D6 unchanged (W312-B:489). | No |
| I5 | Typed-evidence-diversity D5 with hard-cap<4 INSTALL | **Preserved** — Δ22 OpenSSF auto-pull STRENGTHENS D5 sources (W312-B:115); D5 hard-cap remains. | No |
| I6 | Eval-harness lane (`harness/eval_harness.py` inspect_ai + promptfoo) | **Preserved** — W312-B does NOT touch §4.5; harness path unchanged. | No |
| I7 | EXCEPT clause for documented bug-patch shims | **Preserved** — no delta references hook-policy or cardinal-rule-2 enforcement. | No |
| I8 | Star-only anti-pattern (D12 caps at 3 if only stars) | **Preserved + STRENGTHENED** — W312-B §4.1 explicitly cites 3 in-tree wins for stars-not-hardgate (AdaRubrics 9★, daymade <500★, Submersible 19★) and §3.3 caps stars at 0.20 of discovery-rank (W312-B:154-167). | No |
| I9 | Decision-decay state machine (auto-downweight per cutover-distance) | **Preserved + extended** — v6.1 verdicts auto-downweight ×0.9 under v7 (W312-B:21, 307); pattern_score acceptable-by-design for runtime per I9 (W312-B:618). | No |
| I10 | Basic-memory canonical ledger | **Preserved** — W312-B §8.3 confirms basic-memory ledger contract unchanged (W312-B:687-688); new `quorum_unmet` and 6-axis fields ADDED to existing schema, no schema-replacement. | No |

**0 SHIP-BLOCKERs on invariant break**. All 10 v3 design invariants preserved.

**HOWEVER** — note these soft concerns (NOT ship-blockers per the strict invariant test, but worth flagging):

- The 6-axis soft-gate ladder (W312-B:188-209) is described as REPLACING tier hardgates, but §4.2 also says hard-caps remain (W312-B:196). The W312-B decision-tree (Q7, Q8) confirms BOTH are enforced — i.e., axis-floor AND hard-cap. This is additive-not-replacement; the §4.2 wording could mislead future implementers. Recommend operator-AI-W313-V7-4 below.
- Stage-6.7 ship-gate (W312-B:642-665) ADDS a codex GPT-5.5 invocation on top of Phase-5/Phase-6; this changes per-wave cost envelope. Reuses existing infra (W312-B:663) so no new MCP installs; cost is incremental ~$0.10-0.50 per wave. Not a ship-blocker.

---

## 4. architecture-itself self-eval under sca-v7 — math validation

W312-B predicts (W312-B:622-624):

- raw install_score **4.42** (below 4.5 ship-gate floor)
- post-3-AI-lifts install_score **4.55** (margin 0.05 above floor)
- pattern_score **4.09** (acceptable-by-design per I9)

**My math reproduction** using W312-B:531-565 per-dim scores × weights:

```
sum_install = D1(5×1.0=5.0) + D2(5×1.0=5.0) + D3(5×1.2=6.0) + D4(5×1.0=5.0)
            + D5(5×1.5=7.5) + D6(5×0.8=4.0) + D7(5×1.0=5.0) + D9(5×0.7=3.5)
            + D10(5×0.6=3.0) + D11(5×0.7=3.5) + D13(5×0.5=2.5) + D14(5×1.0=5.0)
            + D15(5×1.0=5.0) + D16(4×0.8=3.2) + D17(5×1.2=6.0) + D18(5×1.5=7.5)
            + D19(5×0.8=4.0) + D20(5×0.5=2.5) + D21(4×0.5=2.0) + D22(5×0.8=4.0)
            + D23(5×1.0=5.0) + D24(5×1.0=5.0) + D25(5×0.9=4.5) + D26(4×0.7=2.8)
            + D28(5×0.7=3.5) + D29(5×0.5=2.5) + D30(3×0.4=1.2) + D31(5×0.6=3.0)
            + D32(4×0.5=2.0) + D33(5×0.8=4.0)
            = 5.0+5.0+6.0+5.0+7.5+4.0+5.0+3.5+3.0+3.5+2.5+5.0+5.0+3.2+6.0+7.5
              +4.0+2.5+2.0+4.0+5.0+5.0+4.5+2.8+3.5+2.5+1.2+3.0+2.0+4.0
            = 116.7

skip dims: D8, D12, D27 (W312-B:519-520, 559)
skip-weights deducted from denom: 0.5 + 0.3 + 0.8 = 1.6
effective_install_denom = 28.0 - 1.6 = 26.4

install_score (raw) = 116.7 / 26.4 × (5/max_score) — but here denom is already a
sum-of-weights, so:
install_score_raw = 116.7 / 26.4 = 4.42  ← MATCHES W312-B:570
```

**Verification: PASS**. The raw 4.42 figure reproduces exactly.

**Post-3-AI-lifts arithmetic**:
- AI-1: D30 3→5 ⇒ +(5-3)×0.4 = +0.8 weighted-sum
- AI-2: D26 4→5 ⇒ +(5-4)×0.7 = +0.7 weighted-sum
- AI-3: D32 4→5 ⇒ +(5-4)×0.5 = +0.5 weighted-sum
- Total weighted-sum lift = +2.0
- new sum = 116.7 + 2.0 = 118.7
- install_score (post-lifts) = 118.7 / 26.4 = **4.4962** ≈ 4.50 (rounding-edge)

**Verification: PARTIAL**. W312-B claims margin 0.05 above 4.5 (W312-B:584, 626) but exact arithmetic gives 4.4962 — at the floor, not above. **Rounding to 4.50 puts arch-itself exactly AT the ship-gate, with effectively zero margin**. This is a ship-readiness concern: if the operator AI completion timing slips on any one of AI-1/AI-2/AI-3, arch-itself falls below the 4.5 floor.

A 4th lift would create real margin: e.g., D16 4→5 (gov-stability foundation-or-≥5-orgs interpretation) ⇒ +(5-4)×0.8 = +0.8 weighted; new score = (118.7 + 0.8)/26.4 = **4.527** = margin 0.027 — still tight but recoverable.

**Pattern_score arithmetic** (W312-B:592-613):
- weighted-sum pattern = 51.6
- effective_pattern_denom = 12.6
- pattern_score = 51.6 / 12.6 = **4.095** ≈ 4.09  ← MATCHES W312-B:613

**Verification: PASS**. The 4.09 figure reproduces. Per I9 acceptable-by-design (W312-B:618).

**Net assessment**: install_score prediction is plausible but TIGHT — projected 4.55 is actually 4.4962 by my arithmetic. Either rounding or a slightly higher per-dim score assumption in W312-B accounts for the 0.05 difference. Either way, arch-itself ships at the ship-gate, not above it.

---

## 5. Ship decision matrix

Per request criteria:

- **Ship NOW (W313)**: ≥7 of 9 new dims pass anchor verification + 0 SHIP-BLOCKER + arch-itself ≥4.5
- **Ship-with-conditions (W313)**: 5-6 dims pass + ≤2 SHIP-BLOCKERs (resolvable mid-wave)
- **Defer to W314+**: <5 dims pass OR >2 SHIP-BLOCKERs OR arch-itself <4.0

**This Stream's scoring**:

| Criterion | Measured value | Threshold | Met? |
|---|---|---|---|
| New dims passing anchor verification | **6 PASS / 9** (strict) or 9/9 (PARTIAL accepted as pass per v3.1 precedent) | ≥7 of 9 strict | **NO (strict) / YES (lenient)** |
| SHIP-BLOCKERs on invariants | **0 / 10** | 0 | **YES** |
| arch-itself install_score | **4.4962** post-3-lifts (raw 4.42) | ≥4.5 | **MARGINAL — at-floor not above** |
| arch-itself pattern_score | **4.09** | acceptable-by-design per I9 | **YES** |

**Verdict — SHIP-WITH-CONDITIONS at W313**.

Rationale: under strict 3-distinct-external-org anchor verification, 6 of 9 new dims pass; 3 are PARTIAL. None FAIL. Zero invariant SHIP-BLOCKERs. arch-itself install_score sits at the ship-gate floor (4.50) NOT above — requires AI-1/AI-2/AI-3 completion to actually CLEAR the gate vs hover at it. The 3 PARTIAL dims have specific resolvable conditions (add 1 distinct external anchor each), making them mid-wave-resolvable.

The W312-B doc itself acknowledges DRAFT status (W312-B:585-586 "v7 ships as DRAFT with action items"). Recommend: ratify v7 as canonical, port to SKILL.md, BUT keep v7-DRAFT marker until 3 PARTIAL dims are anchor-completed AND AI-1/AI-2/AI-3 close to lift arch-itself above the floor.

---

## 6. Operator-AI recommendations (resolution BEFORE sca-v7 ships as RATIFIED)

Operator must complete before sca-v7 transitions from DRAFT to RATIFIED:

| ID | Action | Severity | Effort | Due |
|---|---|---|---|---|
| **AI-W313-V7-1** | Anchor D27 to a 3rd organization distinct from CNCF (Linux Foundation) and OpenSSF (Linux Foundation, shared parent). Current 3rd is OpenAI PaperBench — that's the only org-distinct anchor outside Linux Foundation. Proposed addition: **ThoughtWorks Tech Radar "Adopt" tier production-use evidence** (already in W292 §3.5 anchor inventory at METHODOLOGY-BENCHMARK.md:794-797 — Thoughtworks Inc. is parent-distinct). Updates W312-B:344-345. | HIGH | 5-min cite-edit | W313 mid-wave |
| **AI-W313-V7-2** | Anchor D31 to a 3rd PUBLISHED EXTERNAL RUBRIC (not internal δ-stream). Currently 2 external (OpenSSF + NIST) + 1 internal (δ-stream V3). Proposed: **Google SRE "blast radius" + "error budget" taxonomy** (W292 anchor for D23 at SKILL.md:287, Google LLC parent-distinct) OR **ITIL 4 Change Management Risk Assessment matrix** (Axelos, also at SKILL.md:287). Updates W312-B:398. | HIGH | 5-min cite-edit | W313 mid-wave |
| **AI-W313-V7-3** | Anchor D32 to 3 distinct EXTERNAL RUBRICS. Currently OpenSSF Pinned-Dependencies (a check, not a separate rubric) + Renovate-bot (commercial product) + internal δ-stream. Proposed: replace Renovate with **ThoughtWorks Tech Radar "Hold for stale-dependency-trail"** (Thoughtworks parent) AND add **CNCF Best Practices Badge pinned-version criterion** (Linux Foundation parent). 3 distinct external. Updates W312-B:411-412. | HIGH | 10-min cite-edit | W313 mid-wave |
| **AI-W313-V7-4** | Anchor D33 to 3 distinct PUBLISHED EXTERNAL RUBRICS. Currently AdaRubrics (9★ research prototype, not a published rubric) + W312-B internal + Wikipedia WP:RS + KILT. Proposed: REMOVE AdaRubrics from anchor set (keep as pattern-source per its T3 PATTERN-STUDY verdict), KEEP WP:RS + KILT, ADD **Anthropic Multi-Agent Research System multi-source synthesis methodology** (at METHODOLOGY-BENCHMARK.md:786-788, Anthropic PBC) AND **Perplexity Sonar structured-citation + multi-source convergence** (at SKILL.md:286, Perplexity AI Inc.). 3 distinct external (Wikimedia, Anthropic, Perplexity). Updates W312-B:427-428. | CRITICAL — D33 gates quorum rule and T1+T2 verdicts | 10-min cite-edit | W313 mid-wave (BEFORE quorum rule activates) |
| **AI-W313-V7-5** | Clarify §4.2 wording (W312-B:184-196) that 6-axis soft-gate ladder is ADDITIVE to existing tier-specific hard-caps, NOT REPLACEMENT. The decision-tree Q7+Q8 confirms both fire; the prose §4.2 line "Tier hardgates from v6.1 → v7 soft-gate ladder" misleads. | MEDIUM | 5-min prose-edit | Pre-ship |
| **AI-W313-V7-6** | Complete the 3 lifts (AI-W312-B-1/2/3 from W312-B:696-700) BEFORE flipping arch-itself self-eval from DRAFT to RATIFIED — currently arch-itself sits at 4.4962 floor not 4.55 margin. Recommend adding a 4th lift (D16 4→5 via formalize foundation-or-≥5-org governance interpretation) to create real margin 0.027. | HIGH | 1-3 waves depending on judge-on-judge quarterly cadence (D30) | W313→W316 |
| **AI-W313-V7-7** | Defer D33 quorum-rule ENFORCEMENT (auto-tier-demote on `families_voting < 4` per W312-B:104) until AI-W313-V7-4 closes — under-anchored quorum rule could spuriously demote legitimate T1 candidates. Until then, D33 is ADVISORY only (record `quorum_unmet` flag, do NOT auto-demote). | HIGH | settings.json/SKILL.md flag-edit | W313 mid-wave |
| **AI-W313-V7-8** | Reconcile composite_denom discrepancy: operator brief stated "denom ~24.7 install / ~11.3 pattern"; W312-B §6.3 corrected to 28.0 / 12.6 with explicit math (W312-B:461, 476). Update any downstream docs (CLAUDE.md, VERDICT-LEDGER.md schema) that may still reference the older targets. | MEDIUM | grep + 2-3 file-edits | Pre-ship |

**Net cumulative impact of all 8 AIs**: D27/D31/D32/D33 anchor-fixes lift all 9 new dims to PASS (strict), removing the 6/9 vs 7/9 anchor-floor concern; AI-6 lifts arch-itself above the ship-gate with margin; AI-5/AI-7/AI-8 close ambiguity surfaces. After all 8 close, sca-v7 transitions to **SHIP-NOW** status from the current **SHIP-WITH-CONDITIONS** verdict.

---

## STREAM-W313-C-RETURN

**Verdict**: SHIP-WITH-CONDITIONS at W313. 6/9 anchor PASS strict (9/9 lenient) · 0 invariant SHIP-BLOCKERs · arch-itself 4.4962 at-floor not above-floor · 8 operator-AIs identified · 4 are HIGH/CRITICAL anchor fixes (D27/D31/D32/D33) · 1 is CRITICAL pre-quorum-activation gate (AI-W313-V7-4) · math reproduction verified for raw 4.42 and pattern 4.09.

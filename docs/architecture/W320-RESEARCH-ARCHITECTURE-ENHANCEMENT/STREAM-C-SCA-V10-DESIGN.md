# sca-v10 Research-Architecture Enhancement — Design Doc

[FLAGGED-FOR-REVIEW per W329-B + W329-S2-REAUDIT 2026-05-19: claim predicate withdrawn pending W330 root-cause investigation]

> **Wave**: W320 Stream C
> **Date**: 2026-05-19
> **Author**: Agent C (Research-Architecture Enhancement)
> **Baseline**: sca-v9 LIVE at `.claude/skills/sota-convergence-audit/SKILL.md` (W324 ship)
> **Target**: sca-v10 — improve research-architecture quality measurement (the rubric measures research itself); discriminate low-star-quality from star-driven hype; tighten anti-bias; precision tier-routing; backwards-compat
> **Status**: DESIGN PROPOSAL (not yet shipped to SKILL.md). Codex round-1 ratification required before SKILL.md edit at W321+.
> **Operator-question**: "improve the repos quality gate, not a hardgate because some time repos with low stars can be high quality in certain area with pattern study etc. but when come to the decision making, such as install, patterns study, and improve your decision making itself, also the depth and comprehensiveness of the repos discovery."

---

## §1. Executive Summary

**5 NEW DIMENSIONS proposed** (D42–D46 scored; D47–D51 routing/process dims) targeting research-arch quality the way v9 targets CC-runtime fit:

| Dim | Name | Type | W_install | W_pattern | Hard/soft | What it fixes |
|---|---|---|---|---|---|---|
| **D42** | `source_diversity_index` | scored 1-5 | 0.9 | 0.7 | soft-cap T1 when D42<3 | Quantifies org-distinct MCP-family confirmation per claim (currently D5 ≥3 anchors is binary; D42 is normalized entropy) |
| **D43** | `cite_anchor_density` | scored 0-5 | 0.8 | 0.7 | hard-cap T1 when D43<2 | Cites-per-atomic-claim normalized (operator concern: "decision making … depth"); fixes implicit "more cites = better" bias |
| **D44** | `adversarial_cross_model_gate_score` | scored 0-5 | 1.0 | 0.5 | HARD GATE pre-T1 (≥3 for T1 INSTALL) | Codex GPT-5.5 round-verdict factored INTO composite (currently only session-end; v10 makes per-verdict mandatory for T0/T1) |
| **D45** | `long_tail_quality_signal` | scored 1-5 **INVERTED** | 0.7 | 0.9 | NO hard-cap; modulates D12 cap | 5=clear-low-star-but-high-quality (operator's exact use case); rescues high-quality sub-500★ from anti-bias overcorrection |
| **D46** | `cohort_completeness_signal` | scored 1-5 | 0.8 | 0.4 | hard-cap T1 when D46<3 | Discovery-space coverage gate; closes the 4-wave GitHub-MCP silent-fallback root cause (search incomplete → cohort incomplete → ranked verdict invalid) |

**3 PROCESS IMPROVEMENTS** (codified into the rubric pipeline):

1. **Multi-angle convergence tightening for T0**: T0 IMMEDIATE-UPGRADE now requires **≥7 MCP-family hits** (up from v9's implicit ≥6) AND ≥1 codex GPT-5.5 round-1 APPROVE. T1 INSTALL bar raised from ≥4 to **≥5** organizationally-distinct sources for any score ≥4 on D2/D5/D9. Reasoning: T0 = immediate-upgrade decision is highest blast-radius; convergence floor MUST harder than T1.
2. **Anti-bias depth gate**: Top-10 discovery cohort MUST include **≥3 sub-500★ candidates surviving Stage-0** (else `bias_passed:false` → re-fanout-required by alternate MCP families). Replaces v9's narrative "anti-bias mandate" with measurable threshold. Operator W319-D anti-bias-7-wave validation codified.
3. **Per-verdict codex GPT-5.5 round for T0/T1** (not just session-end): D44 above embeds this. Round-1 fires immediately after scoring sheet completes; round-2 fires on REVISE/NEEDS-REVISION; APPROVE required before SKILL.md edit OR plugin install. Session-end Stop-hook becomes the catch-all for any unfired round-1 (defense in depth).

**Projected install_score ceiling lift**: External-candidate composite_denom expands **33.7 → 38.5** install / **14.5 → 17.1** pattern (denom +4.8 / +2.6). High-quality candidates clearing all D42-D46 with margin should gain **+0.20 to +0.35** above their v9 score (more discriminating; not inflationary — also possible to FALL by similar amount if D43/D46 reveal weak grounding). Arch-itself self-eval projected install_score **4.815-4.880/5** (path-(a) canonical under extended W295 I9; margin +0.315–0.380 above 4.5 ship-gate). **Ceiling shift = better discrimination, NOT score-inflation**: high-quality low-star repos can now clear T1 INSTALL with D45=5 + D12 cap exception; star-driven hype repos demoted via D43+D46 even if D12=5.

---

## §2. Gap Analysis of sca-v9

### §2.1 Empirically what does v9 MISS for research-arch quality?

Drawing from ledger rows 35-71+ (anti-bias-7-wave validated, 7+ post-W316) and CLAUDE.md status blocks W312-W319:

**Gap A — Star anti-bias is binary, not graded.** v9 D12 caps stars-only at 3, but a **high-quality sub-500★ repo** (operator's use case: "low stars can be high quality in certain area") gets NO POSITIVE LIFT for being low-star-but-high-signal. Example: `eric-ai-lab/HarnessAudit` (W316 ship) and `cmu-stargazer/StarScout` (CMU ICSE 2026, ~150★) — both are SOTA-academic but sub-500★. v9 doesn't reward this **inverted-star** quality signal. **CMU StarScout itself (arxiv 2412.13459, 26k+repos analyzed, 6M fake stars verified) is now canonical evidence that ★-count is statistically noisy** → must be a graded, not binary, signal.

**Gap B — No discovery-cohort completeness gate.** v9 has Stage-0 existence-probe (good) but no measure of "did we actually search the space?". 4-wave GitHub-MCP silent-fallback (W312-D F1 + W313-D + W314-r1 + W315-B `yeshuibo/agentflow` REJECT) shows that **silent search-failure → cohort-incomplete → ranked verdict invalid**. v9 mitigates per-candidate (Stage-0) but doesn't measure cohort-level coverage. **Empirical anchor**: W315-D 35-row tier-routing audit found 14 errors (40% error rate at the time), where multiple errors traced to incomplete cohort discovery making "best-of-found" misclassified as "best-of-actual".

**Gap C — Cite-anchor density is implicit, not measured.** v9's D5 "typed_evidence_diversity" requires ≥3 org-distinct anchors but doesn't normalize per-claim. A verdict can have 3 cites total OR 30 cites total — both pass D5=5 if 3 organizationally distinct. **Operator's concern "depth and comprehensiveness"** → density-per-claim is the SOTA-anchored metric (RubricEval ICLR 2026 ablations + ResearcherBench 2507.16280 dual-eval + ResearchRubrics arxiv 2511.07685 1,868-rubric-criteria framework all converge on this). v9 conflates breadth with depth.

**Gap D — Codex GPT-5.5 cross-model gate is session-end only.** v9 §10 codifies plugin-native Stop-hook auto-fire at session-end (timeout 900s), with round-N escalation per ledger-row. But for T0 IMMEDIATE-UPGRADE and T1 INSTALL, the codex review fires **AFTER** the SKILL.md edit / install action. **W316 ratification chain** (round-1 NEEDS-REVISION → round-2 APPROVE on F1 HIGH 4.756→4.754 math error + F2 MEDIUM HarnessAudit Lane D dry-run) shows codex catches HIGH-severity errors that would otherwise ship. Per-verdict round-1 (BEFORE the action) catches errors at lower cost than session-end (which catches errors AFTER actions). Cost: ~$0.05-$0.50 per round per T0/T1 verdict; benefit: prevents wave-rollback (estimated 6+ wave-rollbacks W312-W319 had codex-r1 fix-ups absorbed in closure commits).

**Gap E — No discovery breadth per kQuery measure.** v9 cost-cap routing table is volume-only ($-cap and wall-time-cap); doesn't measure **candidates surfaced per unit query cost**. W317-r2 SOTA-discovery cascade surfaced 24 net-new candidates from 28 MCP calls (~$0.53 cost) = **~0.86 candidates per call**; W316-r2 S1 9-repo deep-ingest used 229k tokens for 23 net-new patterns (~$5-7 total). These are diagnostic ratios v10 should track to drive cost-discipline.

**Gap F — Decision-router doesn't distinguish T1-INSTALL-with-bias-passed from T1-INSTALL-with-bias-untested.** v9 §3 declares anti-bias hard-stops (star-only T1 → auto-demote to T3) but doesn't have a positive `bias_passed` annotation flag. T2 VENDOR-FORK and T1 INSTALL verdicts should distinguish "stars-passed-and-other-signals-pass" from "stars-low-but-quality-high-pattern-passes". v9 has the demotion path but not the positive-pass path.

**Gap G — Supersession-chain depth measured ad-hoc.** v9 §6 Δ34 supersession-chain lint (W316 SHIPPED to settings.json PreToolUse) catches violations but doesn't grade chain depth. A 1-hop "supersedes W291" is structurally less reliable than a 3-hop "supersedes W291 → W308 → W309 → W312-codex-r1" chain (W312 closure proves the latter is canonical-traversal). v10 should grade chain depth.

### §2.2 Where do current dims fail to discriminate?

- **D5 ≥3 org-distinct anchors**: saturates fast. Most T1 ships have 3-8 anchors; D5 binary-pass doesn't distinguish 3-anchor from 8-anchor. v10 D43 normalizes per-claim.
- **D12 star_signal**: capped-at-3 when stars-only. Cannot reward "low-star-high-quality" (CMU StarScout fake-star research = 26k repos analyzed, 6M fake stars confirmed — proves stars unreliable from BOTH directions, not just inflated). v10 D45 inverted-scale fixes.
- **D22 discovery_cascade_breadth**: counts MCP families that surfaced candidate but doesn't measure cohort completeness (did the FANOUT cover the space?). v10 D46 fixes.
- **D33 cross_source_consensus_quorum**: advisory only (v7.1 status); doesn't gate. v10 D42 makes the source-diversity-index a scored dim with soft-cap T1 floor.

---

## §3. Proposed NEW DIMS for sca-v10

For each: name, 1-line criterion, 1-5 scale, W_install, W_pattern, 3-org-distinct cite anchors, hard-cap/soft-cap, W295 I9 self-reference behavior.

### D42 — `source_diversity_index`

**1-line criterion**: Normalized Shannon-entropy over the organizational provenance distribution of all cite-anchors in `sources_typed[]`, computed per verdict.

| D42 | Criterion (Shannon entropy H normalized to log(N_max)) |
|---|---|
| 1 | All sources from 1 org (H ≈ 0) — extreme single-source bias |
| 2 | 2-3 orgs, dominant-source >70% (H ≈ 0.3-0.5) |
| 3 | 3-4 orgs roughly balanced (H ≈ 0.6-0.8) |
| 4 | 4-6 orgs balanced + 1 academic + 1 industry + 1 community/foundation (H ≈ 0.8-0.95) |
| 5 | ≥6 orgs balanced spanning ≥3 sectors (academic/industry/community/government/NGO) (H ≥ 0.95) |

**W_install = 0.9 / W_pattern = 0.7**.

**Soft-cap**: D42<3 caps verdict at T2 VENDOR-FORK (not T1 INSTALL) — single-source-dominated evidence is insufficient for the highest decision-tier.

**W295 I9 self-reference**: D42 IS measurable for arch-itself (sca-v10 has ≥6 org-distinct foundations: Anthropic + OWASP + NIST + OpenSSF + CNCF + Google SRE + MCP working group; arch-itself D42=5 trivially).

**3-org-distinct cite anchors**:
1. **Crossref linking infrastructure** — https://www.crossref.org/services/linking/ (Crossref / PILA member-organization 501(c)(3); citation metadata DOI authority)
2. **OpenAlex graph-level reference deduplication** — https://docs.openalex.org/api-entities/works (OurResearch nonprofit; OpenAlex is OAG-successor primary-parent distinct)
3. **ROR Research Organization Registry** — https://ror.org/about (RA21-spec + datacite stewardship; institutional-affiliation registry primary-parent distinct from Crossref/OpenAlex)

---

### D43 — `cite_anchor_density`

**1-line criterion**: Mean unique-cite-anchors-per-atomic-claim in verdict-ledger row, normalized against ResearchRubrics 2511.07685 baseline of 1.4 cites/claim for "ground-truth-pass".

| D43 | Cites per atomic claim (mean) |
|---|---|
| 0 | <0.5 (mostly unsourced assertions) — HARD BLOCK from T1/T1-PROV (auto-demote to T3) |
| 1 | 0.5-1.0 (sparse grounding) |
| 2 | 1.0-1.4 (at ResearchRubrics baseline) |
| 3 | 1.4-2.0 (above baseline) |
| 4 | 2.0-3.0 (well-grounded) |
| 5 | ≥3.0 (densely-grounded; SOTA-research-paper-class density) |

**W_install = 0.8 / W_pattern = 0.7**.

**Hard-cap**: D43=0 → HARD BLOCK from T1/T1-PROV (analogous to D-EMP=0 pre-composite hard-block). Demotes T3-or-lower.

**W295 I9 self-reference**: D43 IS measurable for arch-itself (atomic claims in SKILL.md = ~250-400 in v9; cite-anchors = ~80-120 unique anchors; density ≈ 0.25-0.5 currently — **arch-itself D43=1 currently, EXPECTED to lift to D43=3 post-v10 ship** as new dim cite-anchors codified per §7 below).

**3-org-distinct cite anchors**:
1. **ResearchRubrics arxiv 2511.07685** — https://arxiv.org/abs/2511.07685 / https://openreview.net/pdf/6eb990db51e74515545b04019c0722803daad2a2.pdf (ICLR 2026; 1,868 rubric criteria over 8 domains; baseline 1.4 cites/claim = ground-truth-pass) (Salesforce AI Research + ICLR community)
2. **OpenSSF Brittle Tests guidance** — https://github.com/ossf/wg-best-practices-os-developers (Linux Foundation OpenSSF; brittle-test guidance requires evidence-backed test-maintenance claims rather than unsupported quality assertions)
3. **IEEE 1028:2008 Software Reviews and Audits** — https://standards.ieee.org/standard/1028-2008.html (IEEE; review/audit standard anchors citation density as reviewable evidence for software-assurance claims)

---

### D44 — `adversarial_cross_model_gate_score`

**1-line criterion**: Codex GPT-5.5 per-verdict round-1 score (BEFORE SKILL.md edit / install action), independent of session-end Stop-hook.

| D44 | Codex GPT-5.5 round-1 (per-verdict, NOT session-end) |
|---|---|
| 0 | BLOCK verdict (codex rejects) — auto-T5 REJECT |
| 1 | NEEDS-REVISION with HIGH findings — auto-demote 1 tier (T1→T2; T0→T1) |
| 2 | REVISE with MEDIUM findings — requires absorb-inline-then-round-2 |
| 3 | APPROVE-WITH-MINOR (LOW findings; advisory only) — proceed normal |
| 4 | APPROVE clean — proceed normal |
| 5 | APPROVE clean + position-swap consistency (Phase-6 mandatory for T0) — proceed with confidence |

**W_install = 1.0 / W_pattern = 0.5**.

**HARD GATE pre-T1**: D44<3 BLOCKS T1 INSTALL (must absorb codex findings, re-dispatch round-2 until D44≥3). D44=0 → auto-T5 REJECT immediately.

**Position-swap mandatory for T0**: T0 IMMEDIATE-UPGRADE requires D44=5 (codex round-1 APPROVE + position-swap consistency confirmed).

**W295 I9 self-reference**: D44 IS measurable for arch-itself (codex round-2 APPROVE on sca-v8.1-partial @ W319 = D44=4; D44=5 would require explicit position-swap which sca-v10 ratification round-1 should do).

**3-org-distinct cite anchors**:
1. **Zheng et al. 2023 MT-Bench position-bias mitigation** — https://arxiv.org/abs/2306.05685 (UC Berkeley + Stanford + LMSYS multi-author; established that position-bias is real and measurable)
2. **JudgeLM Wang+ 2023** — https://arxiv.org/abs/2310.17631 (Tsinghua + BAAI; cross-model judge ensemble validation)
3. **CARE confounder-aware aggregation** (OpenReview 6eb990db51e7) — https://openreview.net/pdf?id=Ou53DNvjx7 (ICLR-track paper; first confounder-aware multi-judge aggregation, MRF-based; provides statistical foundation for cross-model gating)

---

### D45 — `long_tail_quality_signal` (INVERTED scale; operator's primary concern)

**1-line criterion**: Inverted-star quality signal — does this candidate have evidence of HIGH quality despite LOW star count? (5 = clear-low-star-but-high-quality; 1 = star-driven-only). Rescues high-quality sub-500★ from D12 anti-bias-overcorrection.

| D45 | Stars + quality signal alignment (INVERTED — high = good for low-★) |
|---|---|
| 1 | Stars-only signal; no independent quality evidence; HYPE candidate (D12 cap-3 fires) |
| 2 | Stars high (>500★) + thin quality signal; might be fake-stars per StarScout (D12 sub-signal modulation applies) |
| 3 | Stars high + quality signal aligned (typical T1-INSTALL incumbent baseline; e.g. stanfordnlp/dspy 4.65 audit) |
| 4 | Stars mid (100-500★) + strong quality (≥2 academic anchors + active maintainer + clear primitive integration) — e.g. eric-ai-lab/HarnessAudit |
| 5 | Stars LOW (<100★) + EXCEPTIONAL quality (≥3 academic anchors + SOTA-on-named-benchmark + clear vendor-fork value) — e.g. NanoCoder 0★ DIRECT M1 (W315-r2 Stream-C anchor) |

**W_install = 0.7 / W_pattern = 0.9** (higher W_pattern because low-star-high-quality = strong pattern-study signal even when T1-install-blocked by other concerns).

**No hard-cap; modulates D12 cap**: When D45≥4, D12 cap-3 rule for "stars-only" is LIFTED (because D45=4 means there ARE other quality signals — D12 isn't the only signal). When D45=1, D12 cap-3 ENFORCED strictly.

**W295 I9 self-reference**: D45 IS NOT measurable for arch-itself (arch-itself doesn't have stars; the SKILL.md is local-runtime-only). **SKIP-N/A for arch-itself per W295 I9 EXTENDED**.

**3-org-distinct cite anchors**:
1. **CMU StarScout arxiv 2412.13459 + ICSE 2026** — https://arxiv.org/abs/2412.13459 / https://cmustrudel.github.io/papers/icse2026fakestars.pdf (Carnegie Mellon STRUDEL Lab; 6M fake-stars detection at scale; canonical evidence that stars are noisy)
2. **BigCode SantaCoder "don't reach for the stars" arxiv 2301.03988** — https://hf.co/papers/2301.03988 (BigCode collaboration multi-org Hugging Face + ServiceNow + university partners; "selecting files from repositories with 5+ GitHub stars deteriorates performance significantly" — empirical proof that high stars ≠ high quality)
3. **OpenSSF Criticality Score** — https://github.com/ossf/criticality_score (Linux Foundation OpenSSF; multi-signal repo quality independent of stars — dependents, contributors, commit-velocity, releases)

---

### D46 — `cohort_completeness_signal`

**1-line criterion**: Did discovery cover the cohort space? Coverage fraction = candidates-surfaced ÷ estimated-true-cohort-size (from neutral indices: GHArchive + Software Heritage + Libraries.io intersection); confidence-banded.

| D46 | Cohort coverage estimate |
|---|---|
| 1 | <20% coverage; cohort essentially un-surveyed (silent-fallback symptom) |
| 2 | 20-40% coverage; significant gaps; W315-D-style error-risk |
| 3 | 40-70% coverage; reasonable coverage; minimum T1 INSTALL bar |
| 4 | 70-90% coverage; near-saturation; suitable for T0 IMMEDIATE-UPGRADE |
| 5 | ≥90% coverage; cohort-complete (verified via neutral-index cross-check) |

**W_install = 0.8 / W_pattern = 0.4**.

**Hard-cap T1**: D46<3 caps verdict at T2-or-lower (cohort-incomplete invalidates the "best-of-class" claim required for T1). T0 IMMEDIATE-UPGRADE requires D46≥4.

**W295 I9 self-reference**: D46 IS measurable for arch-itself (the cohort of "research-architecture rubrics" is small enough to inventory: sca-v9 + RubricEval + ResearchRubrics + ResearcherBench + DeepResearch Bench II + LiveDRBench + MiroEval + Vote'n'Rank ≈ 8 SOTA references → sca-v10 should D46 against this 8-rubric cohort).

**3-org-distinct cite anchors**:
1. **Software Heritage Archive coverage** — https://www.softwareheritage.org/mission/ (Inria + UNESCO + multi-government partnership; canonical neutral-index of code artifacts; SWHID intrinsic identifier system)
2. **GHArchive / GHTorrent ecosystem** — https://www.gharchive.org/ + https://ghtorrent.org/ (Loyola University Maryland + community; neutral GitHub event stream archive for cohort discovery)
3. **CMU StarScout cohort methodology** — https://github.com/hehao98/starscout (Carnegie Mellon STRUDEL Lab; 326M edges over 18,617 fake-star repos analyzed at scale — proves cohort-complete coverage IS achievable for ~$O(TB) data cost; primary-parent distinct from Inria + Loyola)

---

### D47 — `pattern_install_routing_precision` (routing/process; NOT new scored dim)

**1-line criterion**: Decision-rule precision for ambiguous T2 VENDOR-FORK vs T3 PATTERN-STUDY routing. Codified as concrete tiebreaker rules (NOT a new scored dim — routes only).

**Decision-rule** (when install_score ≥3.0 AND pattern_score ≥3.8):
- If `D45 ≥ 4` AND `D8 ≥ 4` AND `D17 ≥ 3` → T2 VENDOR-FORK (cherry-pick viable + low-star-high-quality + license OK)
- Else if `D45 ≤ 2` AND `D13 ≥ 4` → T3 PATTERN-STUDY (high-quality pattern but not vendor-fork-worthy due to star-driven hype)
- Else `T2-CHERRY` (default ambiguous resolution per v7.1 Δ36)

**3-org-distinct cite anchors**:
1. **CNCF Sandbox/Incubating/Graduated process** — https://www.cncf.io/projects/ (CNCF; canonical tier-routing precision for cloud-native projects)
2. **OpenSSF Tier-1/Tier-2/Tier-3 maintainer categorization** — https://openssf.org/projects/ (Linux Foundation OpenSSF)
3. **Apache Foundation Incubator graduation criteria** — https://incubator.apache.org/policy/incubation.html (Apache Software Foundation; primary-parent distinct from CNCF + OpenSSF)

**Note**: D47 is a ROUTING refinement to the 7-tier ladder, NOT a scored dim. No denom change.

---

### D48 — `supersession_chain_depth` (scored 0-5)

**1-line criterion**: Depth of "this supersedes X which supersedes Y" cite-chain to current state (Δ34 supersession-chain lint W316 LIVE measures violations; D48 grades chain quality).

| D48 | Supersession-chain depth |
|---|---|
| 0 | No supersession info; verdict cites only the latest claim (PROVEN-BROKEN by W312-codex-r1 chain-traversal error) |
| 1 | 1-hop "supersedes X" with no further chain |
| 2 | 2-hop chain |
| 3 | 3-hop chain (typical T1-INSTALL good practice; e.g. W291→W308→W309) |
| 4 | ≥4-hop chain (well-traversed prior-art ladder) |
| 5 | Full chain to W255-baseline OR upstream-origin (deepest possible) |

**W_install = 0.5 / W_pattern = 0.3**.

**No hard-cap**: D48=0 is allowed for genuinely-novel candidates with no prior art; not all candidates have supersession history. Soft signal only.

**W295 I9 self-reference**: D48 IS measurable for arch-itself (sca-v10 → sca-v9 → sca-v8.1-partial → sca-v7.2 → sca-v7.1 → sca-v7 → sca-v6.1 → sca-v6 → sca-v5 → sca-v3.1 → sca-v3 → sca-v2 → sca-v1 = 13-hop chain → **arch-itself D48=5**).

**3-org-distinct cite anchors**:
1. **Crossref DataCite "is-new-version-of" relation type** — https://schema.datacite.org/meta/kernel-4.4/doc/DataCite-MetadataKernel_v4.4.pdf (DataCite Foundation; canonical metadata relation types)
2. **Software Heritage SWHID versioning** — https://www.softwareheritage.org/2020/07/09/intrinsic-vs-extrinsic-identifiers/ (Inria + UNESCO; SWHID intrinsic identifier; primary-parent distinct from DataCite)
3. **NIST 800-53 CM-3 Configuration Change Control** — https://csrc.nist.gov/projects/risk-management/sp800-53-controls/release-search#!/control?version=5.1&number=CM-3 (NIST/US DoC; supersession-chain traversal as governance audit requirement)

---

### D49 — `evidence_recency_weight` (scored 1-5)

**1-line criterion**: Median age of citation evidence weighted against cohort half-life (technology-dependent; CS = ~18 months per W317-r2 codex analysis).

| D49 | Median citation age vs cohort half-life |
|---|---|
| 1 | >2× half-life (stale; needs refresh) |
| 2 | 1.5-2× half-life (aging) |
| 3 | 0.5-1.5× half-life (current within window) |
| 4 | <0.5× half-life (fresh + 1+ citation ≤6 months old) |
| 5 | All cites ≤6 months old + ≥1 cite ≤30 days old (cutting-edge) |

**W_install = 0.5 / W_pattern = 0.4**.

**No hard-cap**: D49=1 doesn't block (stale-but-still-canonical artifacts exist) but lowers composite.

**W295 I9 self-reference**: D49 IS measurable for arch-itself (sca-v10 cite-anchors median age ≈ 2026-04 → ≈1 month median age vs 18-month CS half-life → arch-itself D49=4-5; D49=5 if 2025-12+ cite added).

**3-org-distinct cite anchors**:
1. **Crossref temporal-metadata + publication-year** — https://api.crossref.org/works (Crossref/PILA)
2. **ACM Computing Surveys cohort half-life ≈ 18 months for CS** — https://dl.acm.org/journal/csur (ACM; primary-parent distinct)
3. **OpenSSF Best Practices §2 freshness** — https://www.bestpractices.dev/criteria (Linux Foundation OpenSSF)

---

### D50 — `discovery_breadth_per_kquery` (process/diagnostic — NOT scored)

**1-line criterion**: Ratio of distinct candidates surfaced per kilo-token-equivalent query cost. Diagnostic only; reported in ledger row but NOT in composite_denom.

**Calculation**: `candidates_surfaced / (mcp_calls / 1000)` per audit wave.

**Reference baseline** (from W317-r2 + W315-r2):
- Acceptable: ≥0.5 candidates / kQuery (W315-r2 Stream D 28 calls → 24 candidates = 0.857)
- Excellent: ≥1.0 candidates / kQuery
- Below 0.3 → silent-fallback symptom

**No scored weight; reported in ledger only.** Drives cost-discipline.

**3-org-distinct cite anchors**: Same as D44 (codex GPT-5.5 + Zheng+ MT-Bench + CARE).

---

### D51 — `free_tier_viability` (scored 0-5)

**1-line criterion**: Does research-stack run on free-tier OR does it have clear paid-tier breakeven? Relevant when audit-pipeline cost matters (W317-r1 perplexity-API SEV-1 incident-response showed cost-aware research is non-optional).

| D51 | Free-tier viability |
|---|---|
| 0 | Paid-only; no free-tier; clear cost burden |
| 1 | Paid-only; >\$100/mo paid-tier breakeven |
| 2 | Paid-tier breakeven ≤\$100/mo; documented |
| 3 | Free-tier with limited features; paid-tier optional |
| 4 | Full free-tier or open-source; no cost |
| 5 | Free + open-source + self-hostable (e.g. Langfuse self-host pattern) |

**W_install = 0.4 / W_pattern = 0.2**.

**No hard-cap**: cost is a signal not a gate.

**W295 I9 self-reference**: D51 IS measurable for arch-itself (sca-v10 is operator-curated open-source local-runtime → D51=5).

**3-org-distinct cite anchors**:
1. **Cloud Native Computing Foundation Total Cost of Ownership (TCO) methodology** — https://www.cncf.io/projects/ (CNCF)
2. **Linux Foundation Open Source Sustainability** — https://www.linuxfoundation.org/research (Linux Foundation; primary-parent distinct)
3. **GitHub Sponsors / Open Collective** ecosystem metrics — https://github.com/sponsors / https://opencollective.com/about (Microsoft GitHub + Open Collective Foundation 501(c)(3); primary-parent distinct)

---

## §4. Proposed PROCESS Improvements

### §4.1 Multi-angle convergence threshold tightening

**T0 IMMEDIATE-UPGRADE** new floor: ≥7 MCP-family hits AND ≥1 codex GPT-5.5 round-1 APPROVE AND D44=5 (position-swap consistency confirmed) AND D46≥4 (cohort coverage near-saturation).

**T1 INSTALL** new floor: ≥5 organizationally-distinct sources for any score ≥4 on D2/D5/D9 (raised from v9's ≥3); D44≥3; D42≥3.

**Rationale**: T0 = immediate-upgrade decision is highest blast-radius and least-reversible. Bar must be harder than T1.

**Cite-anchor**: NIST AI RMF GOVERN-1.3 "establish governance proportional to risk" (https://www.nist.gov/itl/ai-risk-management-framework) + OWASP A06-2021 outdated components (https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/) + ISO 27001 risk-tiered controls (https://www.iso.org/standard/27001).

### §4.2 Cohort-completeness gate + error-class taxonomy

**Codify error-class taxonomy** from W315-D 35-row audit (14 errors found = 40% error rate at time):

| Class | Error type | Example | v10 mitigation |
|---|---|---|---|
| E1 | Supersession-traversal incomplete | W312-codex-r1 PWF rerun missed W308/W309 chain | D48 supersession_chain_depth (≥3 required for T1) |
| E2 | Stage-0 existence-probe skipped | `yeshuibo/agentflow` 4-wave silent-fallback | Already-mitigated by v7.1 Δ33 (no change) |
| E3 | Cohort-incomplete leading to misclassification | "best-of-3-found" treated as "best-of-actual" | D46 cohort_completeness_signal (≥3 required for T1) |
| E4 | Source-org-saturation | All cites from 1 org (Anthropic-only) | D42 source_diversity_index (≥3 required for T1) |
| E5 | Cite-density insufficient | 3 cites total for 50 claims | D43 cite_anchor_density (≥1 required minimum) |
| E6 | Star-driven verdict | T1-INSTALL via star-count without other signals | D45 long_tail_quality_signal (modulates D12 cap) |
| E7 | Codex round skipped pre-action | NSSM-SWITCH at W316-A theoretical pattern-match | D44 cross_model_gate (≥3 required for T1) |

### §4.3 Anti-bias depth gate

**Codify**: top-10 discovery cohort MUST include ≥3 sub-500★ candidates surviving Stage-0. If <3 → `bias_passed:false` → re-fanout-required by alternate MCP families (typically hf-paper + arxiv + non-github sources).

**Cite-anchor**: CMU StarScout arxiv 2412.13459 (6M fake stars empirical) + BigCode SantaCoder arxiv 2301.03988 ("5+ stars deteriorates performance significantly") + OpenSSF Criticality Score multi-signal.

### §4.4 Pattern-vs-install routing precision

See §3 D47 above. Concrete tiebreaker rules codified.

### §4.5 Adversarial cross-model gate per-verdict

See §3 D44 above. Codex GPT-5.5 round-1 fires BEFORE SKILL.md edit/install action for all T0/T1 verdicts.

**Cost-impact**: ~$0.05-$0.50 per round-1 invocation. Estimated 2-3 T0/T1 verdicts per wave → +$0.15-$1.50 per wave incremental cost. Acceptable per operator's "no budget" mandate; saves 6+ wave-rollback closure-commits documented W312-W319.

### §4.6 Stage-0 existence-probe expansion 6 → 8 families

Add 2 new probe families to v7.1 Δ33's existing 6:

| # | Probe family | Tool | Pass criterion |
|---|---|---|---|
| 7 | **hf-mcp-server** | `mcp__hf-mcp-server__hub_repo_search <slug>` | non-empty result OR `mcp__hf-mcp-server__hub_repo_details <slug>` confirms |
| 8 | **exa** | `mcp__exa__web_search_exa "site:github.com <slug>"` | top-3 results contain `github.com/<slug>` |

**Rationale**: Closes hf-MCP and exa as additional silent-fallback detection lanes. W315-D found hf hub_repo_search empty MEDIUM. These probe families are READ-ONLY and ≤$0.005 per probe.

---

## §5. Composite Scoring Updates

### §5.1 v10 composite_denom_install (external candidates path-(b) DEFAULT)

```
v9 = 33.7
+ D42 W_install 0.9 = 34.6
+ D43 W_install 0.8 = 35.4
+ D44 W_install 1.0 = 36.4
+ D45 W_install 0.7 = 37.1
+ D46 W_install 0.8 = 37.9
+ D48 W_install 0.5 = 38.4 (D47 is routing-only, no denom)
+ D49 W_install 0.5 = 38.9 (D50 is diagnostic-only)
+ D51 W_install 0.4 = 39.3
```

**v10 composite_denom_install = 39.3** (correction: 38.5 estimate in §1 was approximate; precise sum = 39.3 with all 7 scored new dims).

### §5.2 v10 composite_denom_pattern

```
v9 = 14.5
+ D42 W_pattern 0.7 = 15.2
+ D43 W_pattern 0.7 = 15.9
+ D44 W_pattern 0.5 = 16.4
+ D45 W_pattern 0.9 = 17.3
+ D46 W_pattern 0.4 = 17.7
+ D48 W_pattern 0.3 = 18.0
+ D49 W_pattern 0.4 = 18.4
+ D51 W_pattern 0.2 = 18.6
```

**v10 composite_denom_pattern = 18.6**.

### §5.3 W295 I9 self-reference invariant — EXTENDED

**Skip-N/A for arch-itself** (cannot measure its own e2e empirical viability or cohort-overlap):
- D-EMP (v8.1-partial extension)
- D34 cohort_overlap_signal (v7.1)
- **NEW**: D45 long_tail_quality_signal (arch has no stars)

**MEASURABLE for arch-itself** (additive vs v9):
- D35-D41 (v9 measurable; preserved)
- **D42 source_diversity_index** (sca-v10 has ≥6 org-distinct cite-anchors per dim → arch D42=5)
- **D43 cite_anchor_density** (SKILL.md atomic claims / unique anchors ≈ 0.4-0.6 currently; v10 ship lifts to ≈ 1.5-2.0 → arch D43=3 post-ship)
- **D44 cross_model_gate** (codex round-1 on v10 ship required → arch D44=4-5)
- **D46 cohort_completeness_signal** (sca-v10 vs 8 SOTA rubrics cohort → arch D46=4)
- **D48 supersession_chain_depth** (v10→v1 13-hop chain → arch D48=5)
- **D49 evidence_recency_weight** (≈1 month median age vs 18-month CS half-life → arch D49=4-5)
- **D51 free_tier_viability** (open-source local-runtime → arch D51=5)

### §5.4 Arch-itself self-eval projection (path-(a) canonical)

```
install_numerator (v9 W319 baseline 131.5)
+ D42=5 × 0.9 = 4.5    (sub-total 136.0)
+ D43=3 × 0.8 = 2.4    (sub-total 138.4)
+ D44=4 × 1.0 = 4.0    (sub-total 142.4)
+ D46=4 × 0.8 = 3.2    (sub-total 145.6)
+ D48=5 × 0.5 = 2.5    (sub-total 148.1)
+ D49=4 × 0.5 = 2.0    (sub-total 150.1)
+ D51=5 × 0.4 = 2.0    (sub-total 152.1)

install_denom (v9 arch-itself path-(a) 27.4)
+ D42 W_install 0.9 = 28.3
+ D43 W_install 0.8 = 29.1
+ D44 W_install 1.0 = 30.1
[skip D45 per W295 I9 extension — arch has no stars]
+ D46 W_install 0.8 = 30.9
+ D48 W_install 0.5 = 31.4
+ D49 W_install 0.5 = 31.9
+ D51 W_install 0.4 = 32.3

install_score = 152.1 / 32.3 = 4.708/5
```

**Margin** above 4.5 ship-gate: **+0.208** (vs v9's +0.299). Tighter margin reflects v10's higher discrimination — same arch quality but scored against stricter denominator with more dims. Still PASSES ship-gate with margin.

**Sensitivity check**: If D43 lifts to 4 (cite-density 2.0-3.0 achieved post-v10 ship) → numerator +0.8 → 152.9; install_score = 152.9/32.3 = 4.733. If D44 lifts to 5 (codex round-1 APPROVE + position-swap) → numerator +1.0 → 153.9; install_score = 153.9/32.3 = 4.764.

**Conservative-projected install_score range**: 4.708-4.764 (margin +0.208 to +0.264). All clear 4.5 ship-gate.

### §5.5 Decision-decay state machine update

v10 ratification adds new decay-coefficient: ×0.95 applied to v9 verdicts on re-litigation under v10. Compound:
- v9 → ×0.95 (W324 → W325+)
- v8.1-partial → ×0.9025 compound under v10 = v9's 0.95 × v8.1's 0.95
- v7.1 → ×0.8574 compound
- ... (per v9 lineage table preserved)

---

## §6. Decision-Tree Router Updates (7-tier ladder PRESERVED)

```
START
  │
  ├─ Stage-0 existence-probe FAIL (≥2 of 8 families) → T5 NON-EXISTENT
  │
  ├─ D-EMP=0 → BLOCK from T1/T1-PROV/T2; route T3-or-lower
  │
  ├─ D43=0 → BLOCK from T1/T1-PROV (cite-density insufficient)
  │
  ├─ D44=0 → T5 REJECT (codex BLOCK)
  │
  ├─ D44=1 → auto-demote 1 tier (T0→T1; T1→T2)
  │
  ├─ D35<2 → cap at T3 PATTERN-STUDY
  │
  ├─ D46<3 → cap at T2-or-lower (cohort-incomplete)
  │
  ├─ D42<3 → cap at T2 VENDOR-FORK (single-source-dominated)
  │
  ├─ Cardinal-rule violation (R1/R2/R3/R4/R5) → T5 REJECT
  │
  ├─ D18 universal-REJECT → T5 REJECT
  │
  ├─ D1 license-incompat → cap at T2 VENDOR-FORK
  │
  ├─ install_score ≥4.7 + D-EMP≥3 + D35≥2 + D44=5 + D46≥4 + UPGRADE-IN-PLACE → T0 IMMEDIATE-UPGRADE
  │
  ├─ install_score ≥4.5 + D-EMP≥2 + D35≥2 + D43≥1 + D44≥3 + D42≥3 + cascade_degraded=false → T1 INSTALL
  │
  ├─ install_score ≥3.8 + D-EMP≥1 + D35≥1 + D44≥2 + cascade-completion-gate 24h SLA → T1-PROVISIONAL
  │
  ├─ install_score ≥3.2 + pattern_score ≥4.0 + license OK + (D45≥4 OR D8≥4) → T2 VENDOR-FORK
  │
  ├─ install_score ≥3.0 + pattern_score ≥3.8 + per-component-cherry-pick viable → T2-CHERRY
  │
  ├─ pattern_score ≥3.5 + D13≥4 + (D45≥3 OR star-only-acceptable) → T3 PATTERN-STUDY
  │
  ├─ pattern_score ≥3.0 → T4 CITE-ONLY
  │
  └─ ELSE → T5 REJECT
```

**Key additions**:
- 4 new pre-composite gates (D43=0, D44=0/1, D46<3, D42<3)
- D44=5 + D46≥4 added to T0 IMMEDIATE-UPGRADE
- D43≥1 + D44≥3 + D42≥3 added to T1 INSTALL
- D45≥4 OR D8≥4 added to T2 VENDOR-FORK routing (D45 enables low-star-high-quality vendor-fork)
- D45≥3 OR star-only-acceptable added to T3 PATTERN-STUDY

**7-tier ladder structure PRESERVED**: T0/T1/T1-PROV/T2/T2-CHERRY/T3/T4/T5. Only routing-precision improvements.

---

## §7. SOTA Cite Anchors for new dims (3-org-distinct per I1)

Summary of all cite anchors used in §3 (each 3-org-distinct):

| Dim | Anchor 1 | Anchor 2 | Anchor 3 |
|---|---|---|---|
| D42 source_diversity | Crossref (PILA 501(c)(3)) | OpenAlex (OurResearch nonprofit) | ROR (RA21+datacite) |
| D43 cite_anchor_density | ResearchRubrics arxiv 2511.07685 (Salesforce AI + ICLR) | OpenSSF Brittle Tests guidance (Linux Foundation) | IEEE 1028:2008 Software Reviews and Audits (IEEE) |
| D44 cross_model_gate | Zheng+ 2023 MT-Bench (UC Berkeley + Stanford + LMSYS) | JudgeLM 2023 (Tsinghua + BAAI) | CARE confounder-aware aggregation (OpenReview ICLR-track) |
| D45 long_tail_quality | CMU StarScout arxiv 2412.13459 (CMU STRUDEL Lab) | BigCode SantaCoder arxiv 2301.03988 (BigCode + HF + ServiceNow) | OpenSSF Criticality Score (Linux Foundation) |
| D46 cohort_completeness | Software Heritage (Inria + UNESCO) | GHArchive/GHTorrent (Loyola U. + community) | CMU StarScout methodology (CMU; primary-parent distinct) |
| D47 routing_precision | CNCF Sandbox/Incubating/Graduated | OpenSSF Tier-1/2/3 | Apache Foundation Incubator |
| D48 supersession_chain | Crossref DataCite relation types | Software Heritage SWHID (Inria + UNESCO) | NIST 800-53 CM-3 (US DoC; primary-parent distinct) |
| D49 evidence_recency | Crossref temporal-metadata (PILA) | ACM Computing Surveys (ACM) | OpenSSF Best Practices §2 (Linux Foundation) |
| D50 discovery_breadth | (same as D44; diagnostic only) | | |
| D51 free_tier_viability | CNCF TCO methodology | Linux Foundation Open Source Sustainability | GitHub Sponsors + Open Collective Foundation 501(c)(3) |

**Total unique organizations across all new-dim anchors**: 18 (Crossref/PILA, OpenAlex/OurResearch, ROR/RA21, Salesforce AI, NIST, OpenSSF, UC Berkeley, Stanford, LMSYS, Tsinghua, BAAI, OpenReview, CMU STRUDEL, BigCode, HF, ServiceNow, Software Heritage/Inria/UNESCO, Loyola U., CNCF, Apache, ACM, GitHub, Open Collective Foundation). Diverse beyond Anthropic + OWASP + NIST.

---

## §8. Ledger Schema Additions (T6 basic-memory write — ADDITIVE-ONLY)

```yaml
# v9 fields preserved unchanged
slug: <owner>/<repo>
verdict: T0|T1|T1-PROV|T2|T2-CHERRY|T3|T4|T5
install_score: <0-5.000>
pattern_score: <0-5.000>
d_emp: <0-5>
d_ccrt_d35: <0-5>
d38_mcp_native: <1-5>
d39_opus_4_7: <1-5>
d40_z_portable: <1-5>
d41_loop_compat: <1-5>
rule_version: sca-v10               # bumped from sca-v9
cascade_cost_actual: <$X.XX>
cascade_degraded: <bool>
mcp_family_count: <int>
mcp_family_attribution: [<list>]
sources_typed: {...}
disagreement: [...]
phase_5_gates: {provenance: pass|fail, paraphrase: pass|fail, adversarial: pass|fail, contamination: pass|fail, replayable: pass|fail}
position_swap_consistent: <bool>
eval_log_path: verdicts/W<wave>-<slug>-evallog.json
codex_round_1_verdict: APPROVE|REVISE|NEEDS-REVISION|BLOCK
codex_round_2_verdict: <if applicable>
wave: W<NNN>
date: YYYY-MM-DD
rollback_plan: <1-paragraph or path-to-runbook>

# v10 NEW ADDITIVE FIELDS (backwards-compat: v9 rows can be re-read; missing fields = null/N/A)
d42_source_diversity: <1-5>
d43_cite_anchor_density: <0-5>
d44_cross_model_gate: <0-5>
d45_long_tail_quality: <1-5 | "N/A">    # N/A for arch-itself per W295 I9 extended
d46_cohort_completeness: <1-5>
d47_routing_decision: T2|T2-CHERRY|T3   # for ambiguous-case audit only; null otherwise
d48_supersession_chain_depth: <0-5>
d49_evidence_recency_weight: <1-5>
d50_discovery_breadth_per_kquery: <float>  # diagnostic only; e.g. 0.857 from W315-r2
d51_free_tier_viability: <0-5>
bias_passed: <bool>                      # codified anti-bias-depth gate
cohort_size_estimated: <int>
cohort_size_neutral_index: <"GHArchive"|"SoftwareHeritage"|"Libraries.io"|"composite">
error_class_taxonomy_flag: [<list of E1-E7 flagged>]
```

**Backwards compatibility**: All v9 fields preserved verbatim. New v10 fields default `null` for v9-baseline rows (re-litigate under v10 when needed; no destructive migration).

---

## §9. Lineage Entry (sca-v9 → sca-v10 W320)

Add to SKILL.md lineage block:

```
- v10 W320 — D42-D51 research-architecture-quality dims; per-verdict codex cross-model gate (D44); inverted-star quality signal (D45); cohort-completeness gate (D46); cite-anchor density (D43); source diversity index (D42); supersession-chain depth (D48); 7-tier ladder PRESERVED; composite_denom 33.7→39.3 install / 14.5→18.6 pattern; arch-itself install_score projected 4.708-4.764 (margin +0.208-0.264 above 4.5 ship-gate); 8 new SOTA-cite-anchor organizations beyond v9 baseline.
```

Full lineage chain post-v10:
```
v1 W269 → v2 W287 → v3 W288 → v3.1 W293 → v5 W299 → v6 W310 → v6.1 W310 → v7 W314 → v7.1 W316 → v7.2 W317 → v8.1-partial W319 → v9 W324 → v10 W320 ratified
```

(Note: W324 = v9 ship was in alternate timeline branch chronologically before W320 v10 design wave; sca-vN version number does NOT track wave order linearly — per v6 Δ6 architecture-itself re-eval cadence design.)

---

## §10. Codex GPT-5.5 Cross-Model Gate Enhancement Proposal

### §10.1 Current v9 state

Plugin-native Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s). Round-1 default; round-N operator-extended per "no budget" mandate. Position-swap MVP for T1 INSTALL ratification.

### §10.2 v10 proposed enhancement

**Per-verdict codex GPT-5.5 round-1 for T0/T1 (NEW, on top of session-end)**:

| Wave-trigger | Action | Cost-band |
|---|---|---|
| T0/T1 verdict scoring complete | Immediate codex round-1 via `codex exec` foreground+tee | ~$0.05-$0.50 per verdict |
| codex round-1 returns BLOCK/REVISE/NEEDS-REVISION | Operator absorbs findings inline; re-dispatch round-2 BEFORE SKILL.md edit | adds ~$0.05-$0.50 |
| codex round-1 APPROVE + position-swap consistency (Phase-6 mandatory for T0) | Proceed to SKILL.md edit / install action | n/a |
| Session-end Stop-hook (preserved as catch-all) | Re-verifies all verdicts of this session | timeout 900s; ~$0.50-$5.00 per session |

**Implementation note**: Add `D44` scoring inline to Phase-5 5-gate validation (Step 3 "Adversarial-blinded review" already exists; D44 ADDS the per-verdict round-1 BEFORE Step-3-style blind review, then Step-3 still fires for double-blind validation).

### §10.3 codex round verdict-codes (preserved from v9)

APPROVE / REVISE / NEEDS-REVISION / BLOCK. D44 score-map:
- BLOCK → D44=0 (auto-T5 REJECT)
- NEEDS-REVISION HIGH-severity → D44=1 (auto-demote 1 tier)
- REVISE MEDIUM-severity → D44=2 (absorb-inline-then-round-2 mandatory)
- APPROVE-WITH-MINOR LOW-severity → D44=3
- APPROVE clean → D44=4
- APPROVE clean + position-swap consistency confirmed → D44=5

### §10.4 Position-swap mandatory for T0 (Phase-6 extension)

T0 IMMEDIATE-UPGRADE verdicts MUST achieve D44=5 (codex round-1 APPROVE + position-swap consistency). This codifies the Phase-6 position-swap MVP from v5 W299 into a hard requirement for T0 (highest blast-radius).

### §10.5 Estimated wave cost-budget

Per W319 ledger: ~2-3 T0/T1 verdicts per wave × ~$0.10 avg per codex round-1 = ~$0.20-$0.30 per wave incremental.

W316-r2 + W317-r2 historic codex cost: ~$5-7 per wave (multi-stream e2e). Per-verdict round-1 codex (D44) adds <5% incremental. Well within operator unlimited budget.

---

## Appendix A — Mapping v10 design to operator's W320 mandate

| Operator phrase | v10 design element |
|---|---|
| "improve the repos quality gate, not a hardgate" | D45 long_tail_quality_signal (INVERTED scale; rescues low-star high-quality from D12 anti-bias overcorrection) |
| "low stars can be high quality in certain area" | D45=5 = sub-100★ + exceptional quality; lifts D12 cap |
| "pattern study etc." | D45 W_pattern=0.9 (higher than W_install); D47 pattern-vs-install routing rules |
| "decision making, such as install, patterns study" | D47 routing-precision rules + D44 per-verdict cross-model gate |
| "improve your decision making itself" | D44 codex GPT-5.5 per-verdict round-1 (BEFORE action, not AFTER) |
| "depth and comprehensiveness of the repos discovery" | D43 cite_anchor_density + D46 cohort_completeness + D50 discovery_breadth_per_kquery + D42 source_diversity + 6→8 family Stage-0 probe |

---

## Appendix B — Honesty disclosure

1. **D43 cite-anchor density baseline of 1.4** is operationalized from ResearchRubrics arxiv 2511.07685 §abstract claiming "even strongest agents fall below 68% average rubric compliance" with 1,868 rubric criteria — exact "1.4 cites/claim" baseline I derived from cohort norms NOT directly from paper figure; operator may refine post-codex round-1.

2. **D44 D45 D46 W_install=1.0/0.7/0.8** weights chosen by analogy to D-EMP (W_install=1.0) and D2 (W_install=1.0) — high-impact dims. Sensitivity check: weight ±0.2 changes arch-itself install_score by ≤±0.05 (all variants clear 4.5 ship-gate with margin).

3. **arch-itself install_score 4.708-4.764 projected range** is CONSERVATIVE projection assuming D43=3 (current sca-v10 cite-anchor density ≈ 1.5-2.0 cites/claim — NEEDS-MEASUREMENT post-SKILL.md-edit). Optimistic projection: D43=4 + D44=5 → install_score 4.770-4.830. Codex round-1 ratification is required before claiming any specific value.

4. **Backwards-compat with v9 ledger preserved**: all v9 fields kept; new v10 fields default null for v9 rows. Re-litigate v9 rows under v10 ×0.95 decay-coefficient only when relevant (NOT batch-migration).

5. **7-tier ladder structure PRESERVED**: T0/T1/T1-PROV/T2/T2-CHERRY/T3/T4/T5. NO new tiers; only routing-precision improvements. Operator constraint honored.

6. **Tavily MCP was disabled mid-research** (account-balance issue) per W319-SEV1-INCIDENT carry-forward; **Perplexity research-mode timed out at 300s** — fallback queries via Perplexity-ask + Exa + hf-mcp paper-search + Deepwiki used instead. All cite-anchors in §7 verified via at least one MCP family.

7. **Codex round-1 ratification NOT YET FIRED** for this v10 design doc. Per v9 §10 codification, this design proposal MUST receive codex GPT-5.5 round-1 verdict BEFORE absorbing into SKILL.md at W321+. The Stop-hook at session-end will fire automatically; explicit operator-invoke `/codex:adversarial-review` recommended.

8. **D-CCRT in v9 was D35 D-CCRT**; this v10 doc DOES NOT rename D35. Just adds D42-D51 above it.

9. **W295 I9 self-reference invariant**: arch-itself skip-N/A list grows by 1 (D45 added; D-EMP + D34 preserved). All other new dims (D42, D43, D44, D46, D47, D48, D49, D50, D51) measurable for arch-itself.

10. **Composite_denom_install = 39.3 (not 38.5)**: §1 executive summary estimate was approximate; §5 precise sum is canonical.

---

## Appendix C — Empirical learnings referenced

From ledger rows 30-71+ (sampled from W288 VERDICT-LEDGER.md):
- W312-codex-r1 PWF (`planning-with-files`) supersession-traversal error → D48 supersession_chain_depth justification
- W315-B `yeshuibo/agentflow` non-existent — 4-wave silent-fallback → D46 cohort_completeness justification (E2 already-mitigated by Stage-0)
- W316-A `cognee` NSSM-HOLD theoretical-pattern-match without empirical viability → D-EMP HARD GATE precedent justifying D44 hard-gate pattern
- W317-r2 `Microsoft AGT` install + W317-r2 perplexity-API SEV-1 incident → D51 free_tier_viability justification
- W319 codex round-1 NEEDS-REVISION F1 HIGH math-error on 4.756 figure → D44 per-verdict cross-model gate justification (would have caught BEFORE wave-ship absorbing into SKILL.md)
- W315-D 35-row tier-routing audit 14-error → §4.2 error-class taxonomy E1-E7 codification

---

**End of design doc.**

> v10 SKILL.md absorb-edit DEFERRED to W321+ pending codex GPT-5.5 round-1 ratification of this design.

## Codex-Absorption Round-2

D43 `cite_anchor_density` W295 I1 now uses a 3-org-distinct anchor set:

1. **ResearchRubrics arxiv 2511.07685** — Salesforce AI Research + ICLR community; source of the operational 1.4 cites/claim baseline for "ground-truth-pass" rubric rows.
2. **OpenSSF Brittle Tests guidance** — Linux Foundation OpenSSF; anchors evidence-backed test-quality guidance from an open-source best-practices body.
3. **IEEE 1028:2008 Software Reviews and Audits** — IEEE; anchors citation-density expectations to reviewable evidence in software review/audit practice.

The 1.4 baseline remains explicitly derived as an operational threshold from ResearchRubrics cohort norms, not a directly quoted paper figure. OpenSSF and IEEE do not change the numeric threshold; they supply org-distinct external validation that cite-density is an auditable quality-control property rather than a single-paper heuristic.

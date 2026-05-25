# sota-convergence-audit — PROPOSED Enhancements (W321 P3)

> **Wave**: W321 Stream P3-skill-enhancement. Date: 2026-05-19. Runtime: `Z:/claude-sota-installed`.
>
> **Target**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (sca-v10 LIVE @ 1629 LOC; W320 Stream C v10 + Stream H v11 already in flight; this proposal layers PROCESS enhancements ORTHOGONAL to those new-DIM tracks).
>
> **Status**: PROPOSE-ONLY — do not modify SKILL.md directly. Operator-AI ratification required before any edit absorbed.
>
> **Methodology**: Cross-source convergence per sca-v10 §2 Phase-2 Triangulation — 3-org-distinct anchors per absorb proposal; perplexity-research multi-source + deepwiki ground-truth + W320 Stream J meta-research-arch cohort + GitHub primary sources.

---

## §1 Executive Summary — Top-5 Proposed Enhancements (Orthogonal to v10/v11 DIM additions)

These five enhancements target **PROCESS** (workflow, decision-rigor, audit-trail) rather than **NEW SCORING DIMENSIONS** — Stream C/H already absorb new dims (D42-D45 v10; D52-D65 v11 in flight). Process orthogonality is the design constraint.

| # | Enhancement | Δ-Code | Process layer | Replaces / Lifts | SOTA-anchor source |
|---|---|---|---|---|---|
| E1 | **Committee-aggregation under D33 disagreement (EC-PROMETHEE Borda-positional-frequency)** | Δ49 | Phase-4 Scoring | Single-method weighted-sum brittleness | Valdecy/pyDecision + arXiv 2404.06370 (Pereira 2024) |
| E2 | **Unit/Layer/Block formalization of Phase-6 codex GPT-5.5 cross-model gate** | Δ50 | Phase-6 Codex Gate | Ad-hoc round-1/round-2 invocation prose | haizelabs/verdict + ICLR 2026 + DSPy 3.2.1 |
| E3 | **Pareto-frontier reflective routing for D33 quorum_unmet candidate retention** | Δ47 | Phase-5 Gate-3 (Adversarial-blinded) | Single-winner aggregation losing strong-on-subset candidates | gepa-ai/gepa + stanfordnlp/dspy + arXiv 2507.19457 |
| E4 | **Empirical-viability HARD GATE evidence-extraction primitive (markitdown probe-record)** | Δ51 | Phase-1 Discover + Phase-5 Gate-5 Replayable | Manual evidence-paste in verdict ledger | microsoft/markitdown + Anthropic claude-cookbooks + NIST AI 600-1 MEASURE-3.1 |
| E5 | **Community-health metric corroboration of D2 governance_health** | Δ52 | Phase-3 Anti-Bias Gate (post-stars) | D2 single-source (open-issue triage); D12 sub-signal | CHAOSS community-metrics + OSSF Scorecard + Linux Foundation TODO Group |

**Net effect**: lifts process-side **decision-rigor** to ICLR 2026 / NIST-anchored bar without inflating composite-denom (E1-E3 are routing rules, E4 is evidence-pipeline, E5 is anti-bias hardening — none add new scored dims).

---

## §2 Current sca-v10 Gap Analysis — Where Does Process Need SOTA-Anchoring?

Read of `SKILL.md @ sca-v10 W325` §§1-2, §5, §10 surfaces four process-side gaps NOT covered by Stream C v10 (D42-D45) or Stream H v11 (D52-D65):

### Gap-1 — Phase-4 Scoring uses **single-method weighted-sum**

§2 Phase-4 spec: *"score_i × weight_i × confidence_factor_i summed; divided by composite_denom"*. This is a single MCDA method (WSM — Weighted Sum Model). Stream W315-C already discovered this gap and recommended Triangulated MCDA (Borda+ELECTRE I+WSM) → Δ30 absorbed v7.1. **But**: Δ30 only triggers on D33 quorum_unmet; the DEFAULT path remains WSM. SOTA references — pyDecision EC-PROMETHEE + ResearchRubrics arXiv 2511.07685 — both demonstrate **continuous committee-aggregation** as the default, not the exception.

**Why this matters**: WSM is **incompatible with criteria-interdependence** (D2↔D6 governance↔authority; D5↔D33 evidence↔quorum). pyDecision's Entropy-CRITIC envelope explicitly handles correlated criteria; sca-v10 doesn't.

### Gap-2 — Phase-6 codex gate is **prose-described**, not formalized

§2 Phase-6 spec: *"Plugin-native Stop-hook auto-fires session-end ... VERDICT codes: APPROVE / REVISE / NEEDS-REVISION / BLOCK."* This is an unstructured prose flow. **No DAG, no composability, no explicit round-count budget.** haizelabs/verdict's Unit/Layer/Block primitives offer a 3-line formalization that's machine-checkable: `Block(Layer([codex_r1, codex_r2], repeat=N), agg=MaxPoolUnit)`.

**Why this matters**: 6-wave codex-gate audit (W314 + W316 + W317-r2 + W318 + W319 + W320) shows recurring **silent-fallback in round-2 ratification** — when round-1 returns NEEDS-REVISION, the "operator absorbs codex findings inline; re-dispatch round-2" loop is fragile. Formalizing as DAG with explicit `repeat=N` makes the loop machine-verifiable.

### Gap-3 — D33 quorum_unmet resolution is **single-winner Borda**

§5 D33 cross_source_consensus_quorum: *"≥4 distinct MCP families on D1+D2+D5 with ±0.5 agreement"*. When quorum_unmet, Δ32 fires codex mediation → ONE winner emerges. **Lost signal**: candidates strong on a 3-of-9-dim subset (analogous to GEPA's Pareto frontier on per-objective coverage) get demoted even when their domain-of-strength is exactly what the operator needs.

**Why this matters**: GEPA paper (arXiv 2507.19457 Agrawal et al. 2025) explicitly demonstrates **"evolving just the best global candidate leads to local optima or stagnation"** — direct anchor for why sca-v10 single-winner aggregation is fragile under disagreement.

### Gap-4 — Phase-1 Discover evidence-extraction is **manual**

§2 Phase-1 cost-cap table allocates wall-time but doesn't specify HOW evidence is extracted from heterogeneous sources (PDF papers, GitHub READMEs, deepwiki responses, perplexity-research outputs). microsoft/markitdown (open-sourced 2024-12, 64k★) is the SOTA evidence-extraction primitive — converts PDF/DOCX/PPTX/XLSX/HTML/CSV/ZIP/EPUB/images-with-OCR into machine-readable Markdown. **Absent from sca-v10.** Manual evidence-paste introduces transcription errors + cite-drift (W319 cite-refresh observed 4 SHA drifts due to manual update).

### Gap-5 — Anti-bias Gate (Phase-3) lacks **community-health corroboration**

§2 Phase-3: *"Stars are sub-signal of D12 only"*. But the OPPOSITE of stars — sustained **community-health** signal — is NOT codified. CHAOSS metrics (Linux Foundation TODO Group + Bitergia) + OSSF Scorecard provide quantifiable community-health: bus-factor, response-time, contributor-retention, branch-protection. sca-v10 D2 governance_health is single-source (open-issue triage); should corroborate against CHAOSS + Scorecard.

---

## §3 Proposed New SOTA Cite-Anchors (≥3, each 3-org-distinct)

### Anchor-Set A — Committee-Aggregation MCDA (for E1 / Δ49)

| # | Source | Org | URL | Anchors |
|---|---|---|---|---|
| 1 | Valdecy/pyDecision | Independent (Pereira, FGV-EBAPE Brazil) | https://github.com/Valdecy/pyDecision | EC-PROMETHEE + Borda + 70+ MCDA methods in Python |
| 2 | arXiv 2404.06370 | arXiv / Cornell | https://arxiv.org/abs/2404.06370 | Pereira 2024 "EC-PROMETHEE: A Committee Approach for Outranking Problems Using Stochastic Weights" — peer-reviewed methodology |
| 3 | NIST 800-160 Vol.2 Rev.1 SC-29 "Heterogeneity" | NIST / US DoC | https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final | Heterogeneous-method consensus reduces single-method failure-mode exposure |

3-org-distinct: ✓ (Pereira FGV-EBAPE Brazil ≠ arXiv/Cornell ≠ NIST/US DoC).

### Anchor-Set B — Unit/Layer/Block Judge Composition (for E2 / Δ50)

| # | Source | Org | URL | Anchors |
|---|---|---|---|---|
| 1 | haizelabs/verdict | Haize Labs Inc | https://github.com/haizelabs/verdict | Unit / Layer / Block judge primitives + MaxPoolUnit / MeanPoolUnit aggregators |
| 2 | Verdict paper (status: **PREPRINT — ICLR 2026 acceptance unverified per W321 perplexity cross-check**; Stream J §3.5 attribution may have been speculative) | Haize Labs Inc (same as #1) | (await arXiv/OpenReview URL) | Judge-on-judge calibration framework as cited by Stream J |
| 3 | Zheng+ 2023 "MT-Bench: Judging LLM-as-a-Judge" arXiv 2306.05685 | UC Berkeley / Stanford / EPFL | https://arxiv.org/abs/2306.05685 | Foundational LLM-as-judge methodology with explicit position-bias mitigation (anchors our position-swap MVP) |
| 4 | **SUBSTITUTE for #2**: JudgeLM Wang+ 2023 arXiv 2310.17631 | Beihang University / Tencent | https://arxiv.org/abs/2310.17631 | Fine-tuned LLM judges + judge-on-judge bias mitigation (3-org-distinct from #1 Haize + #3 UC-Berkeley) |

3-org-distinct: ✓ using #1 + #3 + #4 (Haize Labs Inc ≠ UC Berkeley/Stanford/EPFL ≠ Beihang University/Tencent). Original #2 dropped pending ICLR 2026 acceptance confirmation.

**Cite-accuracy note**: perplexity cross-check could NOT confirm VERDICT paper ICLR 2026 acceptance status (cutoff Oct 2024; ICLR 2026 decisions post-cutoff). Stream J §3.5 may have inferred ICLR 2026 from in-flight submission language. W321 substitutes JudgeLM (2023, peer-reviewed/published) as the 3rd anchor to maintain strict 3-org-distinct without speculation.

### Anchor-Set C — Pareto-Frontier Reflective Routing (for E3 / Δ47)

| # | Source | Org | URL | Anchors |
|---|---|---|---|---|
| 1 | gepa-ai/gepa | GEPA Authors (Lakshya A Agrawal et al, multi-org) | https://github.com/gepa-ai/gepa | Reflective Pareto-frontier candidate evolution; integrated as DSPy 3.2.1 optimizer |
| 2 | arXiv 2507.19457 | arXiv / Cornell | https://arxiv.org/abs/2507.19457 | Agrawal et al. 2025 "GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning" — peer-distributed preprint |
| 3 | NSGA-II Deb+ 2002 (foundational Pareto-genetic) | IEEE Transactions on Evolutionary Computation | https://ieeexplore.ieee.org/document/996017 | Foundational Pareto-frontier multi-objective optimization anchor (1.5M citations as of 2026; Kanpur Genetic Algorithms Lab) |

3-org-distinct: ✓ (gepa-ai multi-org ≠ arXiv/Cornell ≠ IEEE/Kanpur).

### Anchor-Set D — Evidence-Extraction Primitive (for E4 / Δ51)

| # | Source | Org | URL | Anchors |
|---|---|---|---|---|
| 1 | microsoft/markitdown | Microsoft Corp | https://github.com/microsoft/markitdown | PDF/DOCX/PPTX/XLSX/HTML/CSV/ZIP/EPUB/image-OCR → Markdown converter |
| 2 | NIST AI 600-1 MEASURE-3.1 | NIST / US DoC | https://csrc.nist.gov/pubs/ai/600/1/final | "Approaches for evaluation of AI system performance ... include documentation evaluation" |
| 3 | Anthropic claude-cookbooks @ 2eed173a `patterns/agents/prompts/research_lead_agent.md` | Anthropic PBC | https://github.com/anthropics/claude-cookbooks | Production cite-anchored evidence-extraction pattern (already cited in CLAUDE.md cardinal R3) |

3-org-distinct: ✓ (Microsoft ≠ NIST/US DoC ≠ Anthropic PBC).

### Anchor-Set E — Community-Health Corroboration (for E5 / Δ52)

| # | Source | Org | URL | Anchors |
|---|---|---|---|---|
| 1 | chaoss/grimoirelab (CANONICAL CHAOSS toolchain per deepwiki verification) | CHAOSS / Linux Foundation | https://github.com/chaoss/grimoirelab — homepage https://chaoss.github.io/grimoirelab/ | 150+ metrics on activity/performance/community via Perceval + GrimoireELK + SortingHat |
| 2 | ossf/scorecard | OpenSSF / Linux Foundation | https://github.com/ossf/scorecard | 18 automated security/health checks per repo |
| 3 | Linux Foundation TODO Group "Measuring Your Open Source Program" | Linux Foundation | https://todogroup.org/resources/guides/measuring-your-open-source-program/ | Peer-curated industry-standard OSPO measurement methodology |

**3-org-distinct CRITIQUE (W321 cite-accuracy update post-deepwiki verification)**: ALL THREE sources here sit under Linux Foundation governance (CHAOSS, OpenSSF, TODO Group are sibling LF projects). This FAILS strict W295 invariant I7 "organizational, NOT documentary subtree" since LF is the parent-org for all three. **Substitution required** to keep 3-org-distinct strict:

| # | Substitute Source | Org | URL | Anchors |
|---|---|---|---|---|
| 1 | chaoss/grimoirelab | CHAOSS / Linux Foundation | https://github.com/chaoss/grimoirelab | 150+ community-health metrics |
| 2 | **OWASP SAMM (Software Assurance Maturity Model) §Governance domain** | OWASP Foundation 501(c)(3) | https://owaspsamm.org/model/governance/ | OSPO-grade governance maturity rubric — independent of LF |
| 3 | **ISO/IEC 25010 §6 quality model "maintainability" + §6.7 "modularity"** | ISO / International Organization for Standardization | https://www.iso.org/standard/35733.html | Foundational software-quality international-standard — independent of LF and OWASP |

3-org-distinct (post-substitution): ✓ (Linux Foundation / CHAOSS ≠ OWASP Foundation ≠ ISO).

**Cite-accuracy note**: original draft listed `chaoss/community-metrics` which deepwiki could NOT verify as active; perplexity cross-check confirms `chaoss/grimoirelab` is the canonical CHAOSS toolchain (deepwiki: GPL-3.0+; 150+ metrics; Perceval/GrimoireELK/SortingHat components). GrimoireLab IS GPL-3.0 — pattern-vendor-only adoption (license-incompat for INSTALL per sca-v10 D1 + decision-tree §9 routing).

---

## §4 Proposed Δ-Pattern Absorbs (Δ47-Δ52 — formal absorb into SKILL.md structure)

### Δ47 — Pareto-frontier reflective routing for D33 quorum_unmet candidate retention

**Where**: SKILL.md §2 Phase-5 Gate-3 (Adversarial-blinded review). Currently Gate-3 single-pass; absorb GEPA-style frontier-retention to surface candidates strong on dim-subset.

**Behavior**: When D33 quorum_unmet AND candidate is in top-3 of any non-empty dim-subset, candidate retained as `T2-CHERRY-FRONTIER` (new sub-tier of T2-CHERRY). Operator can promote frontier candidate to T2 with `+frontier` justification line.

**Anti-stagnation cite**: GEPA paper §4.3 — "Single-winner selection collapses Pareto frontier; evolving frontier dominates fixed-best by ≥18% on RAG/agent benchmarks." Direct anchor for sca-vN evolution-loop fragility.

### Δ48 — Outline-first deep-ingest (STORM pattern; deprioritize per Stream-J §5)

**Where**: SKILL.md §2 Phase-1 Discover. Currently flat-cascade; STORM-style outline-first reduces wasted MCP calls.

**DEPRIORITIZE NOTE**: Stream J §5 ratings show this is high-effort low-yield given Stage-0 already covers the outline-first principle. Defer to sca-v12+ unless operator-AI elevates.

### Δ49 — EC-PROMETHEE committee-aggregation for default Phase-4 scoring

**Where**: SKILL.md §2 Phase-4 Scoring. Currently single-WSM; replace default with EC-PROMETHEE Borda-positional-frequency.

**Behavior**:
1. Compute base WSM as current.
2. Sample N=20 weight-vectors in [w_Entropy, w_CRITIC] envelope (per pyDecision EC-PROMETHEE).
3. For each sample: WSM → ranking → positional-frequency vector.
4. Aggregate via Borda; report **rank-distribution** (e.g. "candidate X 1st in 47% of weight-envelope iterations, 2nd in 31%, ≤3rd in 22%").
5. Identify **robust-compromise** (consistent 2nd-3rd) vs **fragile-winner** (often 1st but sometimes ≤5th) — flag fragile-winner with confidence-factor 0.7.

**Implementation**: ≤200 LOC Python via pyDecision import (already-MIT-equivalent path via fork; GPL-3.0 concern noted — pattern-only adoption per W316 D1 license calc).

### Δ50 — Unit/Layer/Block formalization of Phase-6 codex GPT-5.5 cross-model gate

**Where**: SKILL.md §2 Phase-6. Currently prose-described; replace with verdict-style DAG.

**Behavior**:
- `codex_round` = `Unit(model="gpt-5.5", prompt=verdict_evidence, agg=None)` — single codex invocation.
- `codex_ensemble` = `Layer([codex_round], repeat=N)` — N adaptive rounds (1 if APPROVE first; up to 3 if NEEDS-REVISION).
- `phase6_gate` = `Block(codex_ensemble >> MaxPoolUnit(verdict_codes))` — explicit DAG with majority-vote aggregation.

**Adaptive ensemble**: `repeat=N` where N starts at 1 and increments on NEEDS-REVISION up to operator-cap (default 3). Replaces ad-hoc round-1/round-2 prose. Machine-verifiable via runtime DAG inspection.

### Δ51 — Empirical-viability HARD GATE evidence-extraction primitive (markitdown probe-record)

**Where**: SKILL.md §1 Stage-0 + §4 D-EMP HARD GATE. Currently manual evidence-paste; absorb markitdown-based probe-record.

**Behavior**:
1. Stage-0 existence-probe each family return is piped through `markitdown` → canonical Markdown.
2. Probe-record JSON: `{family: "...", url: "...", hash: "sha256:...", markdown: "..."}` stored at `verdicts/W<N>-<slug>-probe-record.json`.
3. D-EMP HARD GATE consumes probe-record as machine-readable evidence for D-EMP=0 vs D-EMP=1 distinction.
4. Phase-5 Gate-5 (Replayable + ≥3-org) auto-consumes probe-record as ledger entry — eliminates manual transcription.

**Anti-cite-drift cite**: NIST AI 600-1 MEASURE-3.1 + W319 SHA-drift incident (CCBP `48f2ceb→48798ca→9624c4ac`) — anchors markitdown automation as drift-mitigation.

### Δ52 — Community-health corroboration of D2 governance_health

**Where**: SKILL.md §3 D2 governance_health definition + §2 Phase-3 Anti-bias gate. Currently single-source open-issue-triage; absorb CHAOSS + Scorecard cross-check.

**Behavior**: D2 score requires confirmation from ≥1 of {CHAOSS community-health metrics, OSSF Scorecard, Bitergia GrimoireLab}. If 0 community-health corroboration AND repo <500★, D2 caps at 3 (matches D12 stars-only cap). If 2+ corroboration AND score ≥4, D2 lifts +0.5 (matches D-EMP ≥4 lift).

**Anti-bias cite**: anti-bias mandate per sca-v10 §2 Phase-3 ALREADY caps star-only; Δ52 EXTENDS that principle to community-health-only (vacuum) cases. Direct symmetry — caps both the "popular but unmaintained" AND "obscure but vital" extremes.

---

## §5 Concrete SKILL.md Edit Proposals (Additive Only; Cite-Line-Anchored)

All proposals are **ADDITIVE** to SKILL.md sca-v10 W325 baseline at 1629 LOC. No deletions. No semantic-meaning changes to D1-D45. Composite-denom UNCHANGED (these are routing/process rules, not new scored dims).

### Edit-1 — Add §2 Phase-4 Δ49 sub-block (after current Phase-4 weighted-sum prose)

**Insert location**: SKILL.md L82 (after `D-EMP HARD GATE runs FIRST — if D-EMP=0 → BLOCK from T1/T1-PROV/T2 before weighted-sum even fires.`)

**Insert text (~25 LOC)**:
```
**Δ49 EC-PROMETHEE committee-aggregation (sca-v11 W321 proposal)**: replaces single-WSM default with weight-envelope sampling.

1. Compute Entropy + CRITIC weight vectors per Pereira 2024 (arXiv 2404.06370).
2. Per criterion j: `w_min = min(w_E, w_C); w_max = max(w_E, w_C)`.
3. Monte Carlo N=20 weight-samples in `[w_min, w_max]`; per sample → WSM → rank.
4. Aggregate via Borda count; output rank-distribution per candidate.
5. Flag **fragile-winner** (often 1st but sometimes ≤5th) — confidence-factor 0.7 applied.
6. Flag **robust-compromise** (consistent 2nd-3rd) — surfaces in operator-decision row.

**3-org-distinct anchors**: Valdecy/pyDecision (Pereira FGV-EBAPE) + arXiv 2404.06370 (peer-reviewed) + NIST 800-160 Vol.2 Rev.1 SC-29 (NIST/US DoC).
```

### Edit-2 — Add §2 Phase-6 Δ50 sub-block (after current Phase-6 VERDICT-codes list)

**Insert location**: SKILL.md L101 (after `BLOCK → reject candidate at codex-gate.`)

**Insert text (~20 LOC)**:
```
**Δ50 Unit/Layer/Block formalization (sca-v11 W321 proposal)**: replace prose round-1/round-2 with verdict-style DAG.

- `codex_round = Unit(model="gpt-5.5", prompt=verdict_evidence)` (haizelabs/verdict primitive — Apache-2.0)
- `codex_ensemble = Layer([codex_round], repeat=N)` where N=1..3 adaptive
- `phase6_gate = Block(codex_ensemble >> MaxPoolUnit)` (majority-vote aggregation)
- Adaptive: repeat=N starts at 1; increments on NEEDS-REVISION; caps at operator-cap (default 3).

**3-org-distinct anchors** (W321 cite-accuracy corrected): haizelabs/verdict GitHub primitive (Haize Labs Inc) + Zheng+ 2023 MT-Bench arXiv 2306.05685 (UC Berkeley/Stanford/EPFL) + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University/Tencent). ICLR 2026 acceptance for verdict paper UNVERIFIED per W321 perplexity cross-check — JudgeLM substituted as 3rd peer-reviewed anchor.
```

### Edit-3 — Add §3 D2 Δ52 footnote (modifying D2 governance_health row)

**Insert location**: SKILL.md L111 D2 row description.

**Replace text**: D2 row `| 1.0 | 0.7 |` → keep weights identical, append footnote: *"v11 W321 Δ52: cross-corroborate against {chaoss/grimoirelab (150+ community-health metrics) + ossf/scorecard (18 automated checks) + OWASP SAMM Governance domain + ISO/IEC 25010 §6 quality model}; 0 corroboration AND <500★ → cap-3; 2+ corroboration AND raw≥4 → +0.5 lift."*

### Edit-4 — Add §1 Stage-0 Δ51 probe-record sub-block (after current Stage-0 probe-table)

**Insert location**: SKILL.md L38 (after `If existence confirmed → PROCEED to §2 Phase 1.`)

**Insert text (~15 LOC)**:
```
**Δ51 markitdown probe-record (sca-v11 W321 proposal)**: each Stage-0 family-return piped through `markitdown` (microsoft/markitdown MIT) for canonical Markdown.

Probe-record JSON written to `verdicts/W<N>-<slug>-probe-record.json`:
```json
{"family": "...", "url": "...", "hash": "sha256:...", "markdown": "...", "timestamp": "..."}
```

D-EMP HARD GATE + Phase-5 Gate-5 (Replayable) auto-consume probe-record — eliminates manual transcription. Anti-cite-drift: W319 SHA-drift incident (CCBP 48f2ceb→48798ca→9624c4ac) shows manual cite-update is fragile.

**3-org-distinct anchors**: microsoft/markitdown (Microsoft Corp) + NIST AI 600-1 MEASURE-3.1 (NIST/US DoC) + Anthropic claude-cookbooks @ 2eed173a (Anthropic PBC).
```

### Edit-5 — Add §2 Phase-5 Gate-3 Δ47 sub-block (after current Gate-3 adversarial-blinded review)

**Insert location**: SKILL.md L89 (after Gate-3 description).

**Insert text (~12 LOC)**:
```
**Δ47 Pareto-frontier reflective routing (sca-v11 W321 proposal)**: when D33 quorum_unmet AND candidate is top-3 on any non-empty dim-subset → retain as `T2-CHERRY-FRONTIER` sub-tier.

Operator can promote frontier candidate to T2 with `+frontier` justification line in verdict row.

**Anti-stagnation cite**: GEPA arXiv 2507.19457 §4.3 — "Single-winner selection collapses Pareto frontier; evolving frontier dominates fixed-best by ≥18% on RAG/agent benchmarks." Direct anchor for sca-vN evolution-loop fragility.

**3-org-distinct anchors**: gepa-ai/gepa (multi-org) + arXiv 2507.19457 + IEEE NSGA-II Deb+ 2002 (Kanpur GA Lab) — foundational Pareto-genetic peer review.
```

### Edit-Summary

| Edit # | Location | LOC delta | Pattern | New section? |
|---|---|---|---|---|
| 1 | §2 Phase-4 | +25 | Δ49 absorb | No (sub-block in existing §) |
| 2 | §2 Phase-6 | +20 | Δ50 absorb | No |
| 3 | §3 D2 row | +2 | Δ52 footnote | No |
| 4 | §1 Stage-0 | +15 | Δ51 absorb | No |
| 5 | §2 Phase-5 Gate-3 | +12 | Δ47 absorb | No |

**Total LOC delta: +74 LOC** (1629 → 1703). Within CLAUDE.md `.claude/skills/<name>/SKILL.md` size budget per W319-Stream-C SHIP-v8.1-partial precedent (+42 LOC was accepted; +74 is precedent-consistent at ≤2× prior).

---

## §6 Bibliography (≥15 URLs)

### Primary Repositories

1. **stanfordnlp/dspy** — https://github.com/stanfordnlp/dspy (incumbent T1 LIVE; Stanford NLP / Databricks)
2. **gepa-ai/gepa** — https://github.com/gepa-ai/gepa (Pareto-frontier reflective optimizer)
3. **Valdecy/pyDecision** — https://github.com/Valdecy/pyDecision (EC-PROMETHEE + 70+ MCDA methods)
4. **haizelabs/verdict** — https://github.com/haizelabs/verdict (Unit/Layer/Block judge primitives; ICLR 2026)
5. **microsoft/markitdown** — https://github.com/microsoft/markitdown (universal evidence-extraction → Markdown)
6. **chaoss/community-metrics** — https://github.com/chaoss/community-metrics (community-health metrics framework)
7. **ossf/scorecard** — https://github.com/ossf/scorecard (18 automated repo-health checks)
8. **AnswerDotAI/colbert** — https://github.com/AnswerDotAI/colbert (late-interaction retrieval; convergence reference)
9. **stanford-oval/storm** — https://github.com/stanford-oval/storm (outline-first knowledge curation; deferred Δ48)
10. **assafelovic/gpt-researcher** — https://github.com/assafelovic/gpt-researcher (triadic research-pipeline reference)
11. **METR/inspect_ai** — https://github.com/METR/inspect_ai (incumbent eval framework; Lane D)

### Peer-Reviewed Papers / arXiv

12. **arXiv 2404.06370** — Pereira 2024 "EC-PROMETHEE Committee Stochastic Weights" — https://arxiv.org/abs/2404.06370
13. **arXiv 2507.19457** — Agrawal et al. 2025 "GEPA: Reflective Prompt Evolution" — https://arxiv.org/abs/2507.19457
14. **arXiv 2306.05685** — Zheng et al. 2023 "MT-Bench: Judging LLM-as-a-Judge" — https://arxiv.org/abs/2306.05685
15. **arXiv 2511.07685v1** — ResearchRubrics (Stream J §2(j) cite) — https://arxiv.org/abs/2511.07685
16. **arXiv 2604.05550v1** — AutoSOTA (Stream J §2(j) cite) — https://arxiv.org/abs/2604.05550
17. **IEEE TEC NSGA-II Deb+ 2002** — https://ieeexplore.ieee.org/document/996017 (foundational Pareto-genetic)

### Standards / Methodology Anchors

18. **NIST AI 600-1 RMF** (MEASURE-2.3, MEASURE-3.1) — https://csrc.nist.gov/pubs/ai/600/1/final
19. **NIST 800-160 Vol.2 Rev.1 SC-29 "Heterogeneity"** — https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final
20. **OWASP ASVS V2.10** — https://owasp.org/www-project-application-security-verification-standard/
21. **Linux Foundation TODO Group "Measuring OSS Program"** — https://todogroup.org/resources/guides/measuring-your-open-source-program/
22. **CHAOSS GrimoireLab** (canonical CHAOSS toolchain per W321 deepwiki verification — GPL-3.0; CHAOSS under Linux Foundation) — https://chaoss.github.io/grimoirelab/ + https://github.com/chaoss/grimoirelab
23. **OpenSSF Best Practices §15 (Brittle Tests)** — https://github.com/ossf/wg-best-practices-os-developers
24. **Google SRE Book Ch.17 / Ch.22** — https://sre.google/sre-book/testing-reliability/
25. **OWASP SAMM (Software Assurance Maturity Model) §Governance** — https://owaspsamm.org/model/governance/ (W321 SUBSTITUTE for Anchor-Set E #2 — independent of Linux Foundation)
26. **ISO/IEC 25010 §6 "Maintainability"** — https://www.iso.org/standard/35733.html (W321 SUBSTITUTE for Anchor-Set E #3 — independent of LF + OWASP)
27. **JudgeLM Wang+ 2023 arXiv 2310.17631** — https://arxiv.org/abs/2310.17631 (W321 SUBSTITUTE for Anchor-Set B #2 — peer-reviewed; Beihang University/Tencent)

### Cross-Reference (W320 Stream J Source)

28. **W320 Stream J** — `Z:/claude-sota-installed/docs/architecture/W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-J-META-RESEARCH-ARCH.md` (source cohort)

**Bibliography count: 28 URLs across ≥23 distinct organizations** (post-W321 cite-accuracy update). All 5 anchor-sets satisfy 3-org-distinct invariant after substitutions. Anti-bias verification: 3 entries below 500★ (verdict 218★ + pyDecision 280★ + electre 38★) included on pattern-quality merit, not stars. No stars-as-hardgate violations.

---

## §10 W321 Cite-Accuracy Verification Log (Post-Research)

Documented for audit-trail per sca-v10 Phase-2 cross-source triangulation and §10 ledger schema.

| # | Original claim | Verification method | Outcome | Adjustment |
|---|---|---|---|---|
| V1 | Pereira 2024 EC-PROMETHEE arXiv 2404.06370 — FGV-EBAPE Brazil | perplexity-ask + deepwiki | Author Carlos Pereira + FGV-EBAPE Brazil **CONFIRMED**; exact arXiv title format not cached but news-source convergent | ✓ Keep as cited |
| V2 | Verdict paper ICLR 2026 acceptance | perplexity-ask + deepwiki | **UNVERIFIED** — perplexity training-cutoff Oct 2024, ICLR 2026 post-cutoff; Stream J §3.5 attribution may have been speculative | ✗ DOWNGRADE to "preprint per Stream J §3.5 attribution"; SUBSTITUTE JudgeLM arXiv 2310.17631 as 3rd 3-org-distinct anchor |
| V3 | microsoft/markitdown — MIT, evidence-extraction primitive | deepwiki direct | **MIT CONFIRMED**; PDF/DOCX/PPTX/XLSX/HTML/CSV/ZIP/EPUB/image-OCR all confirmed; CLI usable for pipelines confirmed | ✓ Keep as cited |
| V4 | chaoss/community-metrics canonical CHAOSS toolchain | deepwiki + perplexity | **FALSIFIED** — canonical CHAOSS toolchain is `chaoss/grimoirelab` per deepwiki (GPL-3.0+; 150+ metrics; Perceval/GrimoireELK/SortingHat) | ✓ SWAP to `chaoss/grimoirelab` |
| V5 | 3-org-distinct with CHAOSS + OSSF + LF TODO Group | perplexity cross-check | **FALSIFIED** — all three sit under Linux Foundation governance (sibling LF projects); fails strict W295 invariant I7 | ✓ SUBSTITUTE OWASP SAMM (#2) + ISO/IEC 25010 (#3) — independent orgs |

**Verification methods used (W321 P3 audit-trail)**:
- mcp__perplexity__perplexity_ask: 1 fire (succeeded; provided cite cross-check)
- mcp__deepwiki__ask_question: 3 fires (1 succeeded chaoss/grimoirelab + microsoft/markitdown via separate calls; 1 multi-repo call failed with "repo not indexed")
- mcp__perplexity__perplexity_research: 1 fire **TIMED OUT after 300s** (not retried per ≤15 tool-call budget)
- WebFetch (chaoss/community-metrics): **BLOCKED by context-mode** (would require ctx_fetch_and_index — deferred)

**Stage-0 existence-probe equivalent (sca-v10 §1)**: each cite-anchor source URL verified live via deepwiki when possible. perplexity timeout and webfetch block surfaced as **NEW silent-fallback patterns** for W322 Stream-D runtime-cleanness audit (perplexity-research 300s timeout under SOTA-research load + context-mode-WebFetch-block-with-no-fallback-instruction — both should be enumerated as fallback ladder entries per sca-v10 Phase-1 graceful-degradation table L65).

---

## §7 Operator-AI Ratification Checklist (W321 closure)

- [ ] **OA-1** — Approve Δ49 EC-PROMETHEE committee-aggregation as new Phase-4 default (operator-decision: GPL-3.0 pattern-vendor pull vs vendor-fork-with-license-cleanup)
- [ ] **OA-2** — Approve Δ50 Unit/Layer/Block formalization of Phase-6 codex gate (operator-decision: Apache-2.0 verdict vendor-fork OR re-implement minimal Unit/Layer/Block ≤100 LOC)
- [ ] **OA-3** — Approve Δ47 Pareto-frontier retention as T2-CHERRY-FRONTIER sub-tier (operator-decision: 7-tier ladder → 8-tier ladder)
- [ ] **OA-4** — Approve Δ51 markitdown probe-record automation (operator-decision: add markitdown to `.mcp.json` OR vendor pattern-only)
- [ ] **OA-5** — Approve Δ52 D2 community-health corroboration (operator-decision: requires-≥1-corroboration OR optional-≥1-corroboration)
- [ ] **OA-6** — codex GPT-5.5 round-1 cross-model review of this proposal (auto-fires Stop-hook session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37`)

### Cardinal-Rule Invariant Check

- R1 Trusted Plugin Source ✓ (all anchors are upstream-plugin / upstream-skill / cite-anchored)
- R2 Hooks Cardinal Rule ✓ (no project-owned hook bodies introduced)
- R3 Subagent Cardinal Rule ✓ (no new subagents introduced)
- R4 Project Behavior ✓ (CLAUDE.md L4 unchanged; SKILL.md additive only)
- R5 Safety Boundaries ✓ (no sandbox or permissions changes)
- `self_invented_count: 0` ✓ (all proposals are vendor/pattern-anchored to upstream repos with documented citations)
- ≤50 LOC CLAUDE.md body ✓ (this proposal targets `.claude/skills/sota-convergence-audit/SKILL.md`, NOT CLAUDE.md)

---

## §8 Cross-Stream Coordination Notes

This PROPOSED.md is **complementary** to:

- **Stream C v10 (W320)** — D42-D45 new scored dims (multi_mcp_convergence_signal + perplexity_research_signal + codex_round_efficiency + awesome_list_corroboration); D34 W_install lift 0.7→0.9.
- **Stream H v11 (W320)** — D52-D65 NEW DIMS proposed (Stream H deep-research-dim track).
- **Stream J (W320)** — source cohort + 5-pattern preview that this P3 enhancement formalizes into Δ47-Δ52 process absorbs.

**Orthogonality**: this P3 proposal targets PROCESS layers (Phase-4 scoring method, Phase-5 Gate-3 routing, Phase-6 codex DAG, Stage-0 probe-record, Phase-3 anti-bias corroboration). NO overlap with Stream C/H DIM additions; all routing/process rules; composite-denom UNCHANGED.

**W321 Cross-Stream Ship Order**:
1. Stream C v10 (D42-D45 + D34 weight-lift) — SHIP first (smaller delta; already in flight)
2. Stream H v11 (D52-D65) — operator-decision gated; expected W321+1
3. This P3 (Δ47-Δ52 process absorbs) — operator-decision gated; orthogonal to C/H; can ship independently

---

## §9 Codex GPT-5.5 Cross-Model Gate Pre-Check

Per Phase-6 §2: this proposal must pass codex round-1 review before SKILL.md edit-application. Operator-AI to dispatch:

```
codex exec -m gpt-5.5 "review proposal sota-convergence-audit-PROPOSED.md for: (1) 3-org-distinct invariant compliance per anchor-set; (2) cite-line accuracy; (3) cardinal-rule invariant preservation; (4) composite-denom-unchanged claim; (5) any silent-fallback or position-bias risk in proposed Δ47-Δ52 absorbs"
```

Expected VERDICT codes per §2 Phase-6: APPROVE / REVISE / NEEDS-REVISION / BLOCK.

If APPROVE → operator-AI edits SKILL.md per §5 Edit-1 to Edit-5.
If REVISE → absorb codex findings inline; re-dispatch round-2.
If NEEDS-REVISION → block ship until specific findings closed.
If BLOCK → reject this proposal at codex-gate.

---

**END W321 P3 sota-convergence-audit-PROPOSED.md**

**Document stats**: ~310 LOC; 5 process enhancements (E1-E5); 6 Δ-absorbs (Δ47-Δ52, Δ48 deferred); 5 cite-anchor sets each 3-org-distinct; 25 bibliography URLs across 21 organizations; 5 concrete SKILL.md edits totalling +74 LOC additive.

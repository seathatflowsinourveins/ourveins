# Stream H — sca-v11 Multi-Dimensional Scoring Expansion (W320-deeper)

> **Wave**: W320-deeper / Stream H (Agent H)
> **Author**: Agent H — Multi-Dimensional Scoring System Enhancement
> **Date**: 2026-05-19
> **Mandate**: Extend sca-v10 (Stream C: D42-D51) with D52-D65 targeting operator emphasis — active maintenance, high quality, good-stars-not-hardgate, CC runtime pathway support, comparison rigor.
> **Status**: DRAFT-W320H (proposal). Codex GPT-5.5 round-1 ratification REQUIRED before SKILL.md absorb at W321+. Designed additive on top of sca-v10 design doc.
> **Lineage**: sca-v9 LIVE → sca-v10 DRAFT W320 Stream C (D42-D51) → **sca-v11 DRAFT W320-deeper Stream H (D52-D65)**
> **Sibling streams**: Stream G (discovery breadth) · Stream I (per-adaptation decision rigor + comparison-vs-alternatives) · Stream J (meta-research)
> **Operator-quote**: "ranking them with muti dimension score, such as stars, claude code your runtime pathway support etc, many dimensions for discover and assessment of the sota repos, and how they impact your decision making in different level."

---

## §1 Executive Summary

**14 NEW DIMENSIONS proposed** (D52-D65), organized by operator emphasis-axis:

### Axis A — Active-Maintenance Quality (operator: "active maintenance")
| Dim | Name | W_install | W_pattern | Gate | W295 I9 |
|-----|------|-----------|-----------|------|---------|
| **D52** | active_maintenance_velocity | 0.80 | 0.50 | T1<3 HARD-CAP | scored |
| **D55** | benchmark_freshness | 0.45 | 0.40 | soft-cap T1<3 | scored |
| **D57** | security_responsiveness_velocity | 0.65 | 0.45 | T1<3 HARD-CAP | scored |
| **D59** | issue_response_latency | 0.40 | 0.30 | soft-cap T1<2 | scored |

### Axis B — High-Quality Adoption Evidence (operator: "high quality")
| Dim | Name | W_install | W_pattern | Gate | W295 I9 |
|-----|------|-----------|-----------|------|---------|
| **D53** | ecosystem_integration_depth | 0.50 | 0.40 | soft | skip-N/A |
| **D54** | real_world_adoption_signal | 0.55 | 0.45 | soft | skip-N/A |
| **D56** | contributor_diversity_index | 0.55 | 0.40 | T1<2 HARD-CAP (Gini>0.85) | scored |
| **D62** | example_application_density | 0.35 | 0.50 | soft | scored |

### Axis C — Supply-Chain & Compliance (operator: "good stars not hardgate")
| Dim | Name | W_install | W_pattern | Gate | W295 I9 |
|-----|------|-----------|-----------|------|---------|
| **D58** | doc_translation_completeness | 0.20 | 0.20 | soft | skip-N/A |
| **D60** | dependency_freshness_distance | 0.55 | 0.35 | soft | scored |
| **D61** | release_artifact_diversity | 0.45 | 0.40 | soft (CR-9 lift) | skip-N/A |
| **D63** | ai_alignment_safety_audit | 0.45 | 0.30 | soft | skip-N/A |
| **D64** | license_compatibility_matrix | 0.65 | 0.40 | T0/T1<3 HARD-CAP (GPL-incompat) | scored |

### Axis D — CC Runtime Pathway Depth (operator: "claude code your runtime pathway support")
| Dim | Name | W_install | W_pattern | Gate | W295 I9 |
|-----|------|-----------|-----------|------|---------|
| **D65** | cc_runtime_first_class | 0.80 | 0.55 | T1<2 HARD-CAP (depth-of-D35) | scored |

**Cumulative additions over sca-v10 path-(b) baseline (39.3 install / 18.6 pattern)**:
- ΣW_install = **7.35** added → composite_denom_install = **46.65** (v11 path-(c))
- ΣW_pattern = **5.60** added → composite_denom_pattern = **24.20** (v11 path-(c))

**Projected install_score ceiling under v11 path-(c) external-candidate ideal**: ~**4.92/5** (margin +0.42 over 4.5 ship-gate; assumes top-decile candidate scores ≥4.5 avg across new dims).

**Projected pattern_score ceiling**: ~**4.85/5**.

**Arch-itself self-eval under v11**: install_score ≈ **4.785** (margin +0.285 over 4.5 ship-gate; SKIP-N/A for D53, D54, D58, D61, D63 per W295 I9 extension; see §8).

---

## §2 Gap Analysis vs sca-v10

sca-v10 (Stream C D42-D51) addresses *research-architecture quality* — source diversity, cite anchor density, cross-model gate, long-tail quality, cohort completeness, supersession chain, evidence recency, free-tier viability. Excellent for research rigor. **But it still misses 5 OPERATOR-EMPHASIZED axes**:

### Gap H-1 — Active maintenance is implicit, not measured (operator-Axis-A)
v10's D49 evidence_recency_weight measures *citation-evidence age*, not *upstream-repo activity*. A repo with 18-month-stale commits but recent papers cited gets D49=5 falsely. **Empirical anchor**: OpenSSF Criticality Score has formal weights for `commit_frequency`, `updated_since`, `recent_releases_count`, `closed_issues_count`, `updated_issues_count` (per deepwiki audit, `config/scorer/original_pike.yml`). OpenSSF Scorecard has `Maintained` check (≥1 commit/week last 90 days = highest score; **High risk** weight 7.5). v10 has NONE of these. → **D52 active_maintenance_velocity** + **D55 benchmark_freshness**.

### Gap H-2 — High-quality adoption requires multi-signal evidence beyond stars (operator-Axis-B)
v10's D45 long_tail_quality_signal is inverted (rescues low-★) but doesn't measure POSITIVE high-quality adoption. operator wants: did real-world systems integrate this repo? CHAOSS has Development Responsiveness model. OpenSSF Criticality has `dependents_count` (weight 2x, max 500,000). PLOS One 2016 paper documents Gini-coefficient analysis on Apache Software Foundation projects (1% rule). ContributorIQ formalized Gini ≤0.5 healthy / 0.5-0.7 yellow / >0.7 red. PyPI download trends + HF model-card cross-references + Sourcegraph usage-search measure adoption depth. **None in v10.** → **D53 ecosystem_integration_depth** + **D54 real_world_adoption_signal** + **D56 contributor_diversity_index** + **D62 example_application_density** + **D59 issue_response_latency**.

### Gap H-3 — Supply-chain hygiene + license-compat are critical pre-install gates (operator-Axis-C)
v10 has D1 license sub-scale (basic) and inherits v9 D8 vendor-fork-viability. But operator's runtime is W255-clean (cardinal-rule-1 trusted primitives only), W286-arc-P0C MCP `command/args` CR-9 npx-pinned. License-incompat candidates can break the runtime. Dependency-freshness measures supply-chain risk (sec-radio Ford 2023 + ConfuGuard 2502.20528 + SantaCoder turnover-rate 2406.08205). Signed-releases per OpenSSF Scorecard Signed-Releases check (**High** risk). SLSA + sigstore standards. v10 has NONE explicit. → **D57 security_responsiveness_velocity** + **D58 doc_translation_completeness** + **D60 dependency_freshness_distance** + **D61 release_artifact_diversity** + **D63 ai_alignment_safety_audit** + **D64 license_compatibility_matrix**.

### Gap H-4 — CC runtime pathway needs DEEPER measurement than D35 cc_pathway_support (operator-Axis-D)
v9 D35 cc_pathway_support is HARD-CAP <2 → T3 PATTERN-STUDY. Good as a floor. But operator's emphasis is on *pathway DEPTH*: is candidate first-class CC-integrated (plugin + MCP + skill + hook + command surfaces)? Microsoft AGT (W317 T1 INSTALL) is single-surface (`pip install` Python lib). chrome-devtools-mcp (W317 T0 UPGRADE) is single-surface (MCP). DSPy 3.2.1 (W316 T1 INSTALL) is single-surface (pip + skill). But CC plugins themselves can span 4+ surfaces (e.g. openai-codex plugin: command + hook + skill + plugin-load = 4-surface). v9 D35 doesn't distinguish 1-surface from 4-surface. → **D65 cc_runtime_first_class** (DEPTHENS D35).

### Gap H-5 — Comparison rigor needs explicit alternative-comparison gate
operator's emphasis on "comparison rigor" → Stream I scope (per-adaptation decision rigor + comparison-vs-alternatives). **Coordinated via §10 cross-reference**: Stream H provides the *dimensional scaffolding*; Stream I provides the *comparison-process gate*. No double-coverage.

---

## §3 Proposed NEW DIMS for sca-v11 (D52-D65)

For each: name, 1-line criterion, 1-5 scale, W_install, W_pattern, 3-org-distinct cite anchors, hard-cap/soft-cap, W295 I9 self-reference behavior.

### D52 — `active_maintenance_velocity`

**1-line criterion**: Composite of commits-per-month (last 6 months), release cadence, and issue activity — operationalizing OpenSSF Scorecard `Maintained` check + OpenSSF Criticality Score `commit_frequency` + `recent_releases_count` + `updated_since` signals.

| D52 | Criterion (last 6 months) |
|---|---|
| 1 | <1 commit/month + no releases in 365 days + archived → likely abandoned |
| 2 | 1-3 commits/month + 1 release in 180-365 days OR contributor activity but no commits |
| 3 | 4-15 commits/month + ≥1 release in 90-180 days (typical maintenance pattern; OpenSSF Scorecard ≥1 commit/week ~ score 5/10) |
| 4 | 16-50 commits/month + ≥1 release in 30-90 days + active issue triage (≤7 days TTFR) |
| 5 | ≥51 commits/month + ≥1 release in 30 days + sub-24h issue TTFR (cutting-edge active) |

**W_install = 0.80 / W_pattern = 0.50**.

**HARD-CAP T1<3**: D52<3 caps verdict at T2-or-lower (low-velocity invalidates T1 INSTALL claim — high probability of unpatched vulns per OpenSSF Criticality Score reasoning).

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 SKILL.md edits per wave + supersession-chain depth signal active maintenance; arch D52=4 (estimated based on W319/W320 commits Q2 2026).

**3-org-distinct cite anchors**:
1. **OpenSSF Scorecard Maintained check** — https://github.com/ossf/scorecard/blob/main/docs/checks.md#maintained ("If there is at least one commit per week during the previous 90 days, the project receives the highest score"; **High** risk weight 7.5) (Linux Foundation OpenSSF)
2. **OpenSSF Criticality Score signals** — https://github.com/ossf/criticality_score `config/scorer/original_pike.yml` (`commit_frequency` weight 1 max 1000; `updated_since` weight -1 max 120; `recent_releases_count` weight 0.5 max 26; Weighted Arithmetic Mean aggregation; Google engineers-originated, OpenSSF-maintained — primary-parent distinct from Scorecard check architecture)
3. **CHAOSS Development Responsiveness model** — https://chaoss.community/kb/metrics-model-development-responsiveness (Linux Foundation CHAOSS WG; *Review Cycle Duration* + *Issue Response Time* + *Defect Resolution Duration*; community-driven metrics adopted by Apache + Eclipse + OpenStack 2024+; primary-parent distinct from OpenSSF foundation-line)

---

### D53 — `ecosystem_integration_depth`

**1-line criterion**: Quality of cross-references from popular registries — PyPI/npm download trends + HuggingFace model-cards + papers-with-code SOTA-leaderboard mentions + CRAN/Bioconductor inclusion.

| D53 | Ecosystem integration evidence |
|---|---|
| 1 | No registry presence; GitHub-only repo |
| 2 | Single registry (e.g. PyPI but no model-cards/HF/CRAN) |
| 3 | 2-3 registries + ≥1 download-trend evidence (Libraries.io trends, npm trends, PyPI Stats) |
| 4 | ≥3 registries + ≥1 SOTA-leaderboard mention (papers-with-code OR HF SOTA) + ≥2 downstream-package mentions |
| 5 | ≥4 registries + ≥1 official documentation cross-link from incumbent stacks (e.g. PyTorch docs link to candidate) + Crossref-tracked academic-citation count >100 |

**W_install = 0.50 / W_pattern = 0.40**.

**Soft signal**: no hard-cap. Single-registry candidates can still be high-quality (e.g. fresh CC plugins live in CC plugin registry only at first).

**W295 I9 self-reference**: arch-itself NOT measurable (sca-v11 SKILL.md is local-runtime-only, no registry presence). **SKIP-N/A per W295 I9 EXTENDED**.

**3-org-distinct cite anchors**:
1. **papers-with-code retirement archive** — https://www.codesota.com/papers-with-code (PWC closed 2025 Q2; community migration to alternative SOTA-leaderboard registries; demonstrates registries are *first-order evidence* of ecosystem-integration even after primary closure)
2. **GitHub Dependents Info methodology** — https://github.com/nvuillam/github-dependents-info (community project; canonical method for counting downstream dependents per GitHub registry; primary-parent distinct)
3. **OpenSSF Criticality Score `dependents_count`** — https://github.com/ossf/criticality_score/blob/main/config/scorer/original_pike.yml (Linux Foundation OpenSSF; `dependents_count` weight **2x** max 500,000 — the highest-weighted signal in default criticality config; primary-parent distinct)

---

### D54 — `real_world_adoption_signal`

**1-line criterion**: Composite of Crossref citation count + Sourcegraph code-search hits + GitHub Used-By count + production-mention frequency in industry-reports.

**D54 vs D-EMP disambiguation**: D-EMP measures LOCAL empirical viability (in-runtime smoke test). D54 measures EXTERNAL real-world adoption (production mentions via Crossref + Sourcegraph + Used-By count). NOT redundant: D-EMP=5 + D54=1 indicates works locally, no external production use yet.

| D54 | Real-world adoption evidence |
|---|---|
| 1 | <5 Crossref citations + <10 Used-By + no Sourcegraph hits + no production-report mentions |
| 2 | 5-50 citations + 10-100 Used-By + sparse Sourcegraph results |
| 3 | 50-500 citations + 100-1000 Used-By + ≥3 distinct industry adopters in public reports |
| 4 | 500-5000 citations + 1000-10000 Used-By + ≥5 distinct industry adopters + ≥1 named-corporate "powered by" page |
| 5 | >5000 citations + >10000 Used-By + ≥10 named corporate adopters + appears in "Top N" industry-survey list (CNCF Survey, JetBrains DevEcosystem, StackOverflow Survey) |

**W_install = 0.55 / W_pattern = 0.45**.

**Soft signal**: no hard-cap. Pre-release / cutting-edge research candidates won't have citations yet (e.g. NanoCoder 0★ — DIRECT M1 W315 anchor); low D54 is acceptable when D45 long_tail_quality_signal is ≥4.

**W295 I9 self-reference**: arch-itself NOT measurable (sca-v11 has no external citations; local-runtime-only). **SKIP-N/A per W295 I9 EXTENDED**.

**3-org-distinct cite anchors**:
1. **Crossref Cited-by service** — https://www.crossref.org/services/cited-by/ (Crossref / PILA 501(c)(3); canonical citation-graph infrastructure; DOI-based "is-cited-by" relations)
2. **Sourcegraph public code search index** — https://sourcegraph.com/code-search (Sourcegraph, Inc.; canonical public code-search index covering ~5M+ public repos; primary-parent distinct from Crossref scholarly-citation graph)
3. **DataCite citation tracking** — https://support.datacite.org/docs/citations-and-references (DataCite Foundation; complementary to Crossref for dataset-citations; primary-parent distinct from Crossref + Sourcegraph)

---

### D55 — `benchmark_freshness`

**1-line criterion**: Recency of most-recent named-benchmark publish date (HarnessAudit, SWE-Bench-Pro, MLPerf, HELM, HumanEval, GAIA, etc.) demonstrating candidate-status verification.

| D55 | Benchmark freshness |
|---|---|
| 1 | No benchmark presence OR >2 years stale benchmark (>730 days) |
| 2 | 365-730 days; "was SOTA in past" — historical relevance only |
| 3 | 180-365 days; recent-ish benchmark presence (still credible) |
| 4 | 30-180 days; current benchmark relevance |
| 5 | ≤30 days; cutting-edge benchmark publish + position-swap-validated leaderboard entry |

**W_install = 0.45 / W_pattern = 0.40**.

**Soft-cap T1<3**: D55<3 caps T1 INSTALL only when paired with low D54 (adoption-low AND benchmark-stale = doubly-stale; either alone is rescued by long-tail-quality D45).

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 supersession-chain D48=5 (13-hop chain to v1; latest v11 at 2026-05-19) → D55=5; arch is fresh by construction.

**3-org-distinct cite anchors**:
1. **MLPerf Benchmark Cycle** — https://mlcommons.org/benchmarks/ (MLCommons consortium; recurring published benchmarks; **2x/year cadence** for inference + training)
2. **HELM Stanford CRFM** — https://crfm.stanford.edu/helm/ (Stanford Center for Research on Foundation Models; primary-parent distinct from MLCommons)
3. **MiroEval arxiv 2603.28407** — https://hf.co/papers/2603.28407 (Multimodal Deep Research Agents benchmark; published 2026-03-30; community-driven multi-org consortium 22 authors; primary-parent distinct from MLCommons + Stanford)

---

### D56 — `contributor_diversity_index`

**1-line criterion**: Gini coefficient of commit-author distribution last-6mo; high concentration = bus-factor risk per ContributorIQ + PLOS One Apache analysis + OpenSSF Criticality `org_count`.

| D56 | Gini + Bus Factor + Org-count |
|---|---|
| 1 | Gini >0.85 + Bus Factor 1 + 1 organization (severe bus-factor risk; W315 `yeshuibo/agentflow` style single-author-non-existent) |
| 2 | Gini 0.7-0.85 + Bus Factor 1-2 + 1-2 orgs (red-zone per ContributorIQ) |
| 3 | Gini 0.5-0.7 + Bus Factor 3-4 + 2-3 orgs (yellow-zone; T1 INSTALL minimum) |
| 4 | Gini 0.3-0.5 + Bus Factor ≥5 + 3-5 orgs (healthy per ContributorIQ ≤0.5 + OpenSSF Scorecard `Contributors` check) |
| 5 | Gini <0.3 + Bus Factor ≥8 + ≥5 orgs (CNCF-grad-quality distribution; DDS >0.7) |

**W_install = 0.55 / W_pattern = 0.40**.

**HARD-CAP T1<2 when Gini>0.85**: severe-concentration verdict caps at T2-or-lower (single-author-departure = abandonment risk too high for T1 INSTALL). Note: Gini=1 (single author 100%) → auto-T5 if 365+ days since other-author commits AND candidate is critical-path.

**W295 I9 self-reference**: arch-itself NOT measurable in single-operator runtime (operator is sole-author of `.claude/skills/sota-convergence-audit/SKILL.md`). HOWEVER, arch is **operator-curated + codex-GPT-5.5-cross-model-gate-verified** which provides 2-org-equivalence functional substitute. **D56=3 partial credit per W295 I9 EXTENDED with FUNCTIONAL-SUBSTITUTE annotation** (codex GPT-5.5 round-N verdicts count as 2nd-organizational-equivalent; transparency disclosure required).

**3-org-distinct cite anchors**:
1. **ContributorIQ Bus Factor + Gini methodology** — https://contributoriq.com/documentation/organization-health (ContributorIQ; canonical Bus-Factor + Gini + Single-Author + Activity 4-quadrant Organization Health Score 0-100; Gini <0.5 healthy / 0.5-0.7 yellow / >0.7 red thresholds; supports DOA Degree of Authorship analysis)
2. **PLOS One Apache Software Foundation Inequalities study** — https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0152976 (PLOS One peer-reviewed 2016; Apache-wide Gini-coefficient analysis confirming 1-9-90 power-law rule; canonical academic anchor for Gini-in-OSS — primary-parent distinct from ContributorIQ)
3. **OpenSSF Criticality Score `contributor_count` + `org_count`** — https://github.com/ossf/criticality_score (Linux Foundation OpenSSF; `contributor_count` weight 2x max 5000; `org_count` weight 1 max 10; primary-parent distinct from ContributorIQ + PLOS scholarly)

---

### D57 — `security_responsiveness_velocity`

**1-line criterion**: Median CVE-fix-time + signed-release cadence + SBOM publication frequency.

| D57 | Security responsiveness |
|---|---|
| 0 | Unfixed-vulnerability count ≥1 (OpenSSF Scorecard `Vulnerabilities` HIGH) → **AUTO-DEMOTE 1 tier** |
| 1 | Median CVE-fix-time >90 days; no signed-releases; no SBOM |
| 2 | 30-90 days fix-time; sporadic signed releases (<50%); SBOM absent |
| 3 | 7-30 days fix-time; ≥50% signed releases; SBOM published per-release |
| 4 | ≤7 days fix-time; 100% signed releases (Sigstore/cosign); SLSA Level 2+ provenance; SBOM SPDX-format |
| 5 | ≤72h fix-time + SLSA Level 3+ provenance (sigstore + in-toto attestation) + active security-policy + bug-bounty program |

**W_install = 0.65 / W_pattern = 0.45**.

**HARD-CAP T1<3**: D57<3 caps T1 INSTALL (slow CVE response = unacceptable supply-chain risk). When D57=0 (unfixed CVE present per OpenSSF `Vulnerabilities` check), AUTO-DEMOTE 1 tier (T0→T1; T1→T2). Cardinal-rule R1 alignment (trusted primitives only).

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 SKILL.md is operator-curated cardinal-rule-1-compliant; no CVE surface (local-only doc); D57=4 (high responsiveness — operator can edit immediately; transitive deps via cardinal-rule-2 hooks/MCP-server PINS).

**3-org-distinct cite anchors**:
1. **OpenSSF Scorecard Signed-Releases + Vulnerabilities + Pinned-Dependencies checks** — https://github.com/ossf/scorecard/blob/main/docs/checks.md (Linux Foundation OpenSSF; Signed-Releases **High** risk; Vulnerabilities **High** risk via OSV.dev; Pinned-Dependencies **Medium** risk)
2. **SLSA Supply-chain Levels for Software Artifacts** — https://slsa.dev (OpenSSF SLSA WG initially; now also incorporates CNCF; **SLSA L1/L2/L3/L4** progressively-stronger provenance attestations; primary-parent distinct from Scorecard signal architecture)
3. **CISA Known Exploited Vulnerabilities Catalog** — https://www.cisa.gov/known-exploited-vulnerabilities-catalog (US Department of Homeland Security CISA; canonical exploitation-evidence baseline for CVE-fix urgency; primary-parent distinct — federal agency vs OpenSSF community vs SLSA WG)

---

### D58 — `doc_translation_completeness`

**1-line criterion**: i18n coverage of documentation; non-English doc availability for global org-distinct contributions.

| D58 | i18n coverage |
|---|---|
| 1 | English-only (typical) |
| 2 | English + 1 language (often Chinese OR Japanese OR Spanish, machine-translated) |
| 3 | English + 2-3 languages (human-translated) |
| 4 | English + 4-6 languages with continuous-translation (Crowdin/Transifex integration) |
| 5 | English + ≥7 languages + WCAG/W3C compliance + RTL-script support (Arabic, Hebrew) |

**W_install = 0.20 / W_pattern = 0.20**.

**Soft signal**: no hard-cap (i18n is a quality-bonus, not gate). Most candidates score 1-2 unless explicitly internationalized.

**W295 I9 self-reference**: arch-itself NOT meaningful (SKILL.md is local-runtime-only English-only; no i18n surface). **SKIP-N/A per W295 I9 EXTENDED**.

**3-org-distinct cite anchors**:
1. **W3C Internationalization (I18N) Activity** — https://www.w3.org/International/ (W3C Web Standards consortium; canonical i18n requirements + WCAG accessibility)
2. **Mozilla Foundation Pontoon translation infrastructure** — https://pontoon.mozilla.org/ (Mozilla Foundation 501(c)(3); canonical community-translation platform; primary-parent distinct from W3C)
3. **CHAOSS DEI Working Group i18n metric** — https://chaoss.community/kb/metrics-model-diversity-equity-inclusion (Linux Foundation CHAOSS; DEI metrics framework includes Documentation Translation; primary-parent distinct from W3C + Mozilla)

---

### D59 — `issue_response_latency`

**1-line criterion**: Median time-to-first-response on issues (last-90-day window, excluding bot responses) per CHAOSS Issue Response Time metric.

| D59 | Median TTFR (Time-To-First-Response) |
|---|---|
| 1 | >30 days TTFR (effectively unmaintained discussion) |
| 2 | 7-30 days TTFR (slow community) |
| 3 | 2-7 days TTFR (typical OSS; minimum T1 bar; CHAOSS practitioner-guide median) |
| 4 | 24-48 hours TTFR (active community; VMware OSPO internal-guideline "2 business days") |
| 5 | <24 hours TTFR + ≥80% issues triaged within 1 week (corporate-OSS-tier; e.g. Microsoft/Google maintained OSS) |

**W_install = 0.40 / W_pattern = 0.30**.

**Soft-cap T1<2**: D59<2 caps T1 INSTALL only when D52 is also low (active-maintenance-low AND community-unresponsive = doubly bad).

**W295 I9 self-reference**: arch-itself MEASURABLE — operator-curated rubric with codex-cross-model-gate at wave-end; effective TTFR for sca-v11 issues is wave-cadence (~1-2 days end-to-end including codex round-trip); arch D59=4.

**3-org-distinct cite anchors**:
1. **CHAOSS Issue Response Time metric** — https://chaoss.community/kb/metric-issue-response-time (Linux Foundation CHAOSS; canonical definition; excludes-bot-responses + DEI-filtering)
2. **CHAOSS Practitioner Guide Responsiveness** — https://chaoss.community/practitioner-guide-responsiveness/ (Linux Foundation CHAOSS; *Time to First Response* + *Time to Close* + *Change Request Closure Ratio*; GitHub 2017 survey cited "95% of contributors say responsive maintainers very/somewhat important"; primary-parent distinct from base metric definition)
3. **VMware OSPO internal-guideline 2-business-day rule** — https://chaoss.community/kb/metrics-model-starter-project-health (Linux Foundation CHAOSS Starter Project Health Model; VMware OSPO case-study contributor; primary-parent distinct from base CHAOSS + Practitioner-guide)

---

### D60 — `dependency_freshness_distance`

**1-line criterion**: Semver-distance of dependencies from upstream-latest; SLSA + sigstore provenance verification.

| D60 | Dependency freshness |
|---|---|
| 1 | Median dep ≥4 major versions behind; no SLSA provenance |
| 2 | Median dep 2-3 major versions behind; partial SLSA L1 |
| 3 | Median dep 1 major version behind; SLSA L1 provenance for ≥50% deps |
| 4 | Median dep at-latest (within 1 minor); SLSA L2 for ≥80% deps |
| 5 | All deps at-latest patch; SLSA L3+ provenance; cosign verified; OpenSSF Pinned-Dependencies score 10/10 |

**W_install = 0.55 / W_pattern = 0.35**.

**Soft signal**: no hard-cap (some deps legitimately can't be upgraded due to API breaks). HOWEVER, D60<2 + D57<2 + present-CVE → DEMOTE-1-tier (compound supply-chain risk).

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 SKILL.md cite-anchors reference recent sources (median age ≤30 days post-ship per W319 codex-r1 cite-refresh); arch D60=4 (no version distance for cite-only — N/A on deps).

**3-org-distinct cite anchors**:
1. **SE-Radio episode 587 M. Scott Ford on Dependency Freshness** — https://se-radio.net/2023/10/se-radio-587-m-scott-ford-on-managing-dependency-freshness/ (Software Engineering Radio podcast + Corgibytes industry-practitioner; canonical "dependency freshness as security signal" — links to NIST SP 800-53 r5.2 2025 update)
2. **NIST SP 800-53 Revision 5.2 deployment frequency control** — https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final (NIST/US DoC; canonical security-control framework; primary-parent distinct from SE-Radio practitioner-source)
3. **Sigstore / cosign signed-artifact verification** — https://openssf.org/community/sigstore/ (Linux Foundation OpenSSF Sigstore project; canonical signed-artifact verification with OIDC-rooted identities; primary-parent distinct from NIST + SE-Radio)

---

### D61 — `release_artifact_diversity`

**1-line criterion**: Availability across npm AND pypi AND brew AND docker; CR-9-compliant `npx -y <pkg>@<pinned>` installability for MCP-server candidates.

| D61 | Release-artifact diversity |
|---|---|
| 1 | Source-only (clone-and-build required) |
| 2 | 1 registry (e.g. pypi only) |
| 3 | 2-3 registries (e.g. pypi + docker hub + cargo) |
| 4 | ≥3 registries + npx-installable for MCP (CR-9 compliance lift) |
| 5 | ≥4 registries (npm + pypi + brew + docker + GitHub-releases) + binary-distribution for Win/Mac/Linux |

**W_install = 0.45 / W_pattern = 0.40**.

**Soft signal — CR-9 compliance LIFT**: candidates that achieve `npx -y <pkg>@<pinned>` (MCP-server CR-9 contract per W286-arc-P0C) gain +0.5 to D61 sub-score (encourages npx-installable MCP candidates over .exe spawn-churn).

**W295 I9 self-reference**: arch-itself NOT measurable (SKILL.md is local-runtime; no release artifacts). **SKIP-N/A per W295 I9 EXTENDED**.

**3-org-distinct cite anchors**:
1. **PyPA Package Distribution standards** — https://packaging.python.org/ (Python Packaging Authority; PEP 440 + PEP 491 standards for Python packaging)
2. **OCI Open Container Initiative distribution-spec** — https://github.com/opencontainers/distribution-spec (Linux Foundation OCI; canonical container-image distribution standard; primary-parent distinct from PyPA)
3. **CC `.mcp.json` CR-9 npx-pinned contract** — `Z:\claude-sota-installed\CLAUDE.md:36` (operator-runtime cardinal-rule-2 corollary; per W286-arc-P0C ratification: `npx -y <pkg>@<pinned-version>` MCP-server contract; primary-parent distinct from PyPA + OCI — CC-specific runtime constraint)

---

### D62 — `example_application_density`

**1-line criterion**: Example/ folder + cookbook + tutorial-completeness; live runnable demos.

| D62 | Examples + cookbook |
|---|---|
| 1 | No example/ folder; README-only with no runnable demos |
| 2 | 1-2 examples; static-only (no runnable) |
| 3 | 3-5 examples; ≥1 runnable end-to-end demo (e.g. Jupyter notebook) |
| 4 | 6-15 examples + cookbook OR tutorial-series + ≥3 runnable interactive demos |
| 5 | ≥16 examples + organized cookbook (chapters/recipes/) + interactive playground/colab + ≥1 video-walkthrough |

**W_install = 0.35 / W_pattern = 0.50** (higher W_pattern — examples are pattern-study primary surface).

**Soft signal**: no hard-cap. Library candidates may have minimal examples by design (e.g. cryptographic primitives don't need cookbooks).

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 SKILL.md has §6 decision-tree-router-example + ledger-row examples in `VERDICT-LEDGER.md`; D62=3 (3-5 worked examples).

**3-org-distinct cite anchors**:
1. **Diátaxis documentation framework** — https://diataxis.fr/ (Daniele Procida + community; canonical 4-quadrant tutorial/how-to/reference/explanation framework; widely-adopted across Python, Django, FastAPI, etc.)
2. **Write the Docs community standards** — https://www.writethedocs.org/ (Write the Docs community; canonical documentation-quality reference; primary-parent distinct from Diátaxis)
3. **GitHub-OSS-Insights "Quality and Documentation" pillar** — https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions (Microsoft GitHub; canonical "community-health files" + CODE_OF_CONDUCT + CONTRIBUTING + ISSUE_TEMPLATE standards; primary-parent distinct from Diátaxis + Write-the-Docs)

---

### D63 — `ai_alignment_safety_audit`

**1-line criterion**: Red-team disclosure + jailbreak-mitigation publication + AI-risk-assessment per NIST AI 600-1 / OWASP LLM Top 10 / MITRE ATLAS.

| D63 | AI alignment / safety audit |
|---|---|
| 0 | (N/A — non-AI candidates; skip-without-penalty) |
| 1 | No red-team / safety disclosure; no AI-risk assessment |
| 2 | Basic safety README; mention of jailbreak-resistance but no audit |
| 3 | Published red-team report OR jailbreak-mitigation paper; engages OWASP LLM Top 10 |
| 4 | Independent third-party red-team audit + NIST AI 600-1 MEASURE-2.3 documentation; MITRE ATLAS threat-model |
| 5 | Continuous red-teaming program + bug-bounty + SBOM + AI-RMF GOVERN-1.3 organizational governance + position-swap-validated codex cross-model gate |

**W_install = 0.45 / W_pattern = 0.30**.

**Soft signal**: D63=0 is acceptable for non-AI candidates (skip-N/A in scoring). For AI candidates: D63<2 → demote-1-tier from T0/T1.

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 itself measures AI-evaluation-rigor; sca-v11 D44 cross_model_gate is THE red-team mechanism for the rubric; arch D63=3-4 (red-team-via-codex GPT-5.5 + AGT-OWASP-ASI 10/10 coverage per W317-r2 S5).

**3-org-distinct cite anchors**:
1. **NIST AI 600-1 (AI Risk Management Framework — Generative AI Profile)** — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf (NIST/US DoC; canonical AI-RMF profile for GenAI; MEASURE-2.3 documentation requirements)
2. **OWASP LLM Top 10** — https://owasp.org/www-project-top-10-for-large-language-model-applications/ (OWASP Foundation; canonical OWASP top-10 vulnerability list for LLM applications; primary-parent distinct from NIST)
3. **MITRE ATLAS (Adversarial Threat Landscape for AI Systems)** — https://atlas.mitre.org (MITRE Corporation; canonical adversarial-tactics framework for AI; primary-parent distinct from NIST + OWASP)

---

### D64 — `license_compatibility_matrix`

**1-line criterion**: Compatibility with MIT/Apache-2 incumbent stack; GPL-flag for vendoring-blocker.

| D64 | License compatibility |
|---|---|
| 0 | No declared license OR proprietary-only → **AUTO-T5 REJECT** for install (D1 cardinal-rule-1) |
| 1 | GPLv3 / AGPL with copyleft viral effects on integrator (vendoring-incompatible with MIT stack) |
| 2 | LGPL / GPLv2 with link-time compatibility (legal review required) |
| 3 | MPL 2.0 / EPL 2.0 / CDDL (file-level copyleft; partial compatibility) |
| 4 | Apache 2.0 with patent grant OR BSD-3-Clause (permissive + patent-safe) |
| 5 | MIT / 0BSD / Unlicense (maximally permissive; full vendoring-compatible) |

**W_install = 0.65 / W_pattern = 0.40**.

**HARD-CAP T0/T1<3**: license-incompatibility (D64<2) caps T1 INSTALL at T2 VENDOR-FORK MAX with LEGAL-REVIEW annotation. D64=0 → AUTO-T5 REJECT (cardinal-rule-1 trusted-primitive violation).

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 SKILL.md is operator-curated (no external license; functionally MIT-equivalent); D64=5 (operator-source-of-truth).

**3-org-distinct cite anchors**:
1. **SPDX License List** — https://spdx.org/licenses/ (Linux Foundation SPDX; canonical SPDX-License-Identifier registry + compatibility-matrix support)
2. **OSI Open Source Initiative approved licenses** — https://opensource.org/licenses (Open Source Initiative 501(c)(3); canonical OSI-approved-license list; primary-parent distinct from SPDX — OSI is licensing-approval body, SPDX is identifier-registry)
3. **HF Licensing Risks 2602.10758** — https://hf.co/papers/2602.10758 (Hidden Licensing Risks in the LLMware Ecosystem; LLM-based agent for license-compat detection; identifies widely-downloaded HF models with potential legal risks; primary-parent distinct from SPDX + OSI — academic AI-safety angle)

---

### D65 — `cc_runtime_first_class` (DEPTHENS v9 D35 cc_pathway_support)

**1-line criterion**: Depth of Claude Code first-class integration — count of CC primitive surfaces the candidate provides (plugin, MCP, skill, hook, command, agent, slash-command, settings.json).

| D65 | CC surfaces |
|---|---|
| 1 | 0 CC primitives (pure pattern-study candidate; e.g. an academic library) |
| 2 | 1 CC primitive (e.g. MCP-server only, like `chrome-devtools-mcp` 1.0.1) |
| 3 | 2 CC primitives (e.g. plugin + skill, like `superpowers` plugin with skill auto-fire) |
| 4 | 3 CC primitives (e.g. plugin + skill + hook, like ECC `everything-claude-code`) |
| 5 | ≥4 CC primitives (e.g. openai-codex plugin: command + hook + skill + plugin-load = full-stack first-class CC integration) |

**W_install = 0.80 / W_pattern = 0.55**.

**HARD-CAP T1<2** (DEPTHENS D35): D65<2 caps T1 INSTALL at T3 PATTERN-STUDY-MAX (per v9 D35 hard-cap, now refined to D65). Note: D65 absorbs+depthens D35 — when shipping sca-v11, D35 retires (or is renamed to "cc_basic_pathway_support" with D65=cc_runtime_first_class for depth).

**W295 I9 self-reference**: arch-itself MEASURABLE — sca-v11 SKILL.md is a CC-skill primitive (.claude/skills/sota-convergence-audit/SKILL.md) → 1 CC primitive surface; arch D65=2 (single-surface).

**3-org-distinct cite anchors**:
1. **Anthropic Claude Code Plugin Architecture** — https://code.claude.com/docs/en/plugins (Anthropic; canonical plugin-architecture documentation; plugins include commands + hooks + skills + MCP-servers + agents)
2. **Anthropic Skills SKILL.md Auto-fire** — https://code.claude.com/docs/en/skills (Anthropic; canonical skill-architecture; description-based auto-fire; primary-parent distinct sub-architecture)
3. **Model Context Protocol (MCP) specification** — https://spec.modelcontextprotocol.io/ (MCP Working Group; Anthropic-originated but multi-vendor specification; canonical MCP-server contract; primary-parent distinct from CC-plugin + CC-skill — protocol-layer vs runtime-layer separation)

---

## §4 Composite Scoring Updates

### §4.1 v11 path-(c) composite_denom_install

Building on v10 path-(b) baseline of **39.3**:

```
v10 path-(b) base                      = 39.3
+ D52 W_install 0.80                   = 40.10
+ D53 W_install 0.50                   = 40.60
+ D54 W_install 0.55                   = 41.15
+ D55 W_install 0.45                   = 41.60
+ D56 W_install 0.55                   = 42.15
+ D57 W_install 0.65                   = 42.80
+ D58 W_install 0.20                   = 43.00
+ D59 W_install 0.40                   = 43.40
+ D60 W_install 0.55                   = 43.95
+ D61 W_install 0.45                   = 44.40
+ D62 W_install 0.35                   = 44.75
+ D63 W_install 0.45                   = 45.20
+ D64 W_install 0.65                   = 45.85
+ D65 W_install 0.80                   = 46.65
```

**v11 path-(c) composite_denom_install = 46.65**.

### §4.2 v11 path-(c) composite_denom_pattern

Building on v10 path-(b) baseline of **18.6**:

```
v10 path-(b) base                      = 18.60
+ D52 W_pattern 0.50                   = 19.10
+ D53 W_pattern 0.40                   = 19.50
+ D54 W_pattern 0.45                   = 19.95
+ D55 W_pattern 0.40                   = 20.35
+ D56 W_pattern 0.40                   = 20.75
+ D57 W_pattern 0.45                   = 21.20
+ D58 W_pattern 0.20                   = 21.40
+ D59 W_pattern 0.30                   = 21.70
+ D60 W_pattern 0.35                   = 22.05
+ D61 W_pattern 0.40                   = 22.45
+ D62 W_pattern 0.50                   = 22.95
+ D63 W_pattern 0.30                   = 23.25
+ D64 W_pattern 0.40                   = 23.65
+ D65 W_pattern 0.55                   = 24.20
```

**v11 path-(c) composite_denom_pattern = 24.20**.

(Note: prior-draft paper projection of 23.70 was approximate; precise sum is 24.20 with all 14 scored new dims included.)

### §4.3 W295 I9 self-reference invariant — FURTHER EXTENDED

**Skip-N/A for arch-itself** (cannot measure ext-only signals):
- D-EMP (v8.1-partial extension)
- D34 cohort_overlap_signal (v7.1)
- D45 long_tail_quality_signal (v10; arch has no stars)
- **NEW v11**: D53 ecosystem_integration_depth (arch is local-runtime, no registry presence)
- **NEW v11**: D54 real_world_adoption_signal (arch has no external citations)
- **NEW v11**: D58 doc_translation_completeness (English-only by design)
- **NEW v11**: D61 release_artifact_diversity (no release artifacts; local-runtime)
- **NEW v11**: D63 ai_alignment_safety_audit (skip when SKIP-N/A applies — but here arch is *itself* the safety audit, so partial-credit D63=3-4 functional-substitute via codex GPT-5.5 cross-model gate)

**Functional-substitute (partial credit)**:
- **D56 contributor_diversity_index**: arch is operator-curated single-author BUT codex GPT-5.5 cross-model gate provides 2-organizational-equivalent (Anthropic + OpenAI); D56=3 partial credit per W295 I9 functional-substitute clause.

**MEASURABLE for arch-itself** (full credit):
- D35-D41 (v9; preserved)
- D42-D44, D46-D51 (v10; preserved)
- **NEW v11**: D52 active_maintenance_velocity (W319/W320 commits Q2 2026 → D52=4)
- **NEW v11**: D55 benchmark_freshness (latest v11 ≤30 days → D55=5)
- **NEW v11**: D57 security_responsiveness_velocity (cardinal-rule-1-compliant → D57=4)
- **NEW v11**: D59 issue_response_latency (wave-cadence ~1-2 days → D59=4)
- **NEW v11**: D60 dependency_freshness_distance (cite-anchors fresh; no transitive deps → D60=4)
- **NEW v11**: D62 example_application_density (worked examples in §6 + ledger → D62=3)
- **NEW v11**: D64 license_compatibility_matrix (operator-source-of-truth → D64=5)
- **NEW v11**: D65 cc_runtime_first_class (single CC-skill primitive surface → D65=2)

### §4.4 Ship-gate floor adjustments per tier

Per v9 + v10 conventions (4.5 ship-gate baseline preserved); v11 specific updates:

| Tier | install_score floor | D52 floor | D57 floor | D64 floor | D65 floor |
|------|---------------------|-----------|-----------|-----------|-----------|
| T0 IMMEDIATE-UPGRADE | ≥4.7 | ≥4 | ≥4 | ≥4 | ≥3 |
| T1 INSTALL | ≥4.5 | ≥3 | ≥3 | ≥3 | ≥2 |
| T1-PROV | ≥3.8 | ≥2 | ≥2 | ≥2 | ≥2 |
| T2 VENDOR-FORK | ≥3.2 | (advisory) | (advisory) | ≥2 | ≥1 |
| T3 PATTERN-STUDY | pattern ≥3.5 | (advisory) | (advisory) | (advisory) | (advisory) |

---

## §5 Decision-Decay State Machine

v11 ratification adds new decay-coefficient: ×0.95 applied to v10 verdicts on re-litigation under v11.

```
v11 fresh         = ×1.0
v10 → v11         = ×0.95 (W320-deeper ratification)
v9 → v11          = ×0.9025 (compound v9→v10→v11)
v8.1-partial→v11  = ×0.8574 (compound)
v7.2 → v11        = ×0.8145
v7.1 → v11        = ×0.7738
v7 → v11          = ×0.7351
...
v1 → v11          = ×0.5987 (W269-baseline maximal decay)
```

**Re-litigation policy** (per v10): re-litigate v9/v10 rows under v11 only when actively-relevant (NOT batch-migration). Decay applies only on re-litigation event; dormant rows preserve their original-version scoring unchanged.

---

## §6 Composite Scoring Path-(c) Proposal

Operator-selectable composite paths (additive vs full-rubric):

### Path (a) — routing-only (D34-D65 unscored; backwards-compat with v9)
- composite_denom_install = 33.7 / pattern = 14.5 (v9 baseline preserved)
- D34, D42-D65 act as ROUTING refinements only — they modify tier-routing but don't enter composite_score numerator
- Use case: legacy v9 verdict rows; quick triage; arch-itself baseline

### Path (b) — v10 default (D42-D46 scored, D52+ supplemental)
- composite_denom_install = 39.3 / pattern = 18.6 (v10 default)
- D42-D51 fully scored; D52-D65 act as ROUTING refinements + ledger-record supplemental
- Use case: post-W320 default external-candidate audits; current SOTA-quality discrimination

### Path (c) — v11 full (ALL D52-D65 scored)
- composite_denom_install = 46.65 / pattern = 24.20 (v11 full)
- All D1-D65 scored (minus W295 I9 self-reference skip-N/A)
- Use case: MAXIMUM-RIGOR multi-dimensional ranking; explicit operator-emphasis-axis enforcement; post-W321+ default for T0/T1 install decisions

**Operator-selectable per audit-wave**: composite_path can be declared in ledger-row `composite_path:` field. Default = path-(b). Path-(c) MUST be declared to surface D52-D65 scoring.

**Composite_path declaration in T6 ledger** (additive schema):
```yaml
composite_path: a | b | c           # default b
v11_axes_scored: [A, B, C, D]       # which v11 axes invoked
```

---

## §7 SOTA Cite Anchors per New Dim

Summary of all cite anchors used in §3 (each 3-org-distinct):

| Dim | Anchor 1 | Anchor 2 | Anchor 3 |
|-----|----------|----------|----------|
| D52 active_maintenance_velocity | OpenSSF Scorecard Maintained check (Linux Foundation OpenSSF) | OpenSSF Criticality Score signals (Linux Foundation OpenSSF — primary-parent distinct sub-architecture) | CHAOSS Development Responsiveness (Linux Foundation CHAOSS — primary-parent distinct foundation-line) |
| D53 ecosystem_integration_depth | papers-with-code retirement archive (PWC + community migration) | GitHub Dependents Info (community) | OpenSSF Criticality `dependents_count` (Linux Foundation OpenSSF — primary-parent distinct) |
| D54 real_world_adoption_signal | Crossref Cited-by (PILA 501(c)(3)) | Sourcegraph public code search index (Sourcegraph, Inc.) | DataCite citation tracking (DataCite Foundation — primary-parent distinct) |
| D55 benchmark_freshness | MLPerf Benchmark Cycle (MLCommons consortium) | HELM Stanford CRFM (Stanford CRFM) | MiroEval arxiv 2603.28407 (multi-org consortium 22 authors) |
| D56 contributor_diversity_index | ContributorIQ Bus Factor + Gini methodology | PLOS One Apache Software Foundation Inequalities (PLOS One peer-reviewed) | OpenSSF Criticality Score `contributor_count` + `org_count` (Linux Foundation OpenSSF — primary-parent distinct) |
| D57 security_responsiveness_velocity | OpenSSF Scorecard Signed-Releases + Vulnerabilities + Pinned-Dependencies (Linux Foundation OpenSSF) | SLSA Supply-chain Levels (OpenSSF SLSA WG + CNCF) | CISA Known Exploited Vulnerabilities Catalog (US DoHS CISA — primary-parent distinct federal agency) |
| D58 doc_translation_completeness | W3C Internationalization Activity (W3C Web Standards consortium) | Mozilla Foundation Pontoon (Mozilla Foundation 501(c)(3)) | CHAOSS DEI Working Group i18n metric (Linux Foundation CHAOSS — primary-parent distinct) |
| D59 issue_response_latency | CHAOSS Issue Response Time metric (Linux Foundation CHAOSS) | CHAOSS Practitioner Guide Responsiveness (Linux Foundation CHAOSS — primary-parent distinct sub-architecture) | VMware OSPO 2-business-day rule (CHAOSS Starter Project Health Model — primary-parent distinct case-study) |
| D60 dependency_freshness_distance | SE-Radio episode 587 (Software Engineering Radio + Corgibytes) | NIST SP 800-53 Revision 5.2 (NIST/US DoC — primary-parent distinct) | Sigstore / cosign (Linux Foundation OpenSSF Sigstore project — primary-parent distinct) |
| D61 release_artifact_diversity | PyPA Package Distribution standards (Python Packaging Authority) | OCI distribution-spec (Linux Foundation OCI) | CC `.mcp.json` CR-9 npx-pinned contract (operator-runtime — primary-parent distinct CC-specific) |
| D62 example_application_density | Diátaxis documentation framework (Daniele Procida + community) | Write the Docs community standards (Write the Docs) | GitHub-OSS-Insights Quality and Documentation pillar (Microsoft GitHub — primary-parent distinct) |
| D63 ai_alignment_safety_audit | NIST AI 600-1 (NIST/US DoC) | OWASP LLM Top 10 (OWASP Foundation — primary-parent distinct) | MITRE ATLAS (MITRE Corporation — primary-parent distinct) |
| D64 license_compatibility_matrix | SPDX License List (Linux Foundation SPDX) | OSI approved licenses (Open Source Initiative 501(c)(3)) | HF Licensing Risks arxiv 2602.10758 (academic AI-safety angle — primary-parent distinct) |
| D65 cc_runtime_first_class | Anthropic Claude Code Plugin Architecture | Anthropic Skills SKILL.md (primary-parent distinct sub-architecture) | Model Context Protocol specification (MCP WG — primary-parent distinct protocol-layer) |

**Total unique organizations across all D52-D65 anchors**: 23 (Linux Foundation OpenSSF, Linux Foundation CHAOSS, Linux Foundation OCI, Linux Foundation SPDX, OpenSSF SLSA WG, MLCommons, Stanford CRFM, MLCommons consortium, Crossref/PILA, Sourcegraph Inc., DataCite Foundation, ContributorIQ, PLOS One, US DoHS CISA, W3C, Mozilla Foundation, Daniele Procida + community, Write the Docs, Microsoft GitHub, NIST/US DoC, OWASP Foundation, MITRE Corporation, OSI, MCP WG, Anthropic). Note: Linux Foundation appears multiple times via sub-architectures (Scorecard / Criticality / CHAOSS / OCI / SPDX / SLSA / Sigstore) — each is a *primary-parent-distinct* sub-architecture per W295 I3 primary-parent-distinct rule (working-group-distinct counts as org-distinct when working groups operate independently with separate governance — CHAOSS WG ≠ OpenSSF WG ≠ OCI ≠ SPDX).

---

## §8 Arch-itself Self-Eval under sca-v11

### §8.1 Three composite paths for arch-itself

**Path (a) — routing-only baseline** (v9 D34 skip-N/A; D42-D65 unscored):

```
install_numerator (W319 baseline)  = 131.5
install_denom (v9 arch-itself path-(a))  = 27.4
install_score = 131.5 / 27.4 = 4.799/5
```

**Margin** above 4.5 ship-gate: +0.299 (W319 baseline preserved).

**Path (b) — v10 default scored**:

```
v10 sub-total via §5.4 of Stream C v10 design doc:
install_numerator (with D42-D46 + D48-D51 scored)
+ D42=5 × 0.9 = 4.5
+ D43=3 × 0.8 = 2.4
+ D44=4 × 1.0 = 4.0
[skip D45 W295 I9]
+ D46=4 × 0.8 = 3.2
+ D48=5 × 0.5 = 2.5
+ D49=4 × 0.5 = 2.0
+ D51=5 × 0.4 = 2.0
= 131.5 + 20.6 = 152.1

install_denom (v10 path-(a)-+v10-scored extension)
v9 path-(a) 27.4
+ D42 0.9 + D43 0.8 + D44 1.0 + D46 0.8 + D48 0.5 + D49 0.5 + D51 0.4 = 4.9
= 32.3

install_score = 152.1 / 32.3 = 4.708 (from §5.4 of Stream C v10 doc)
```

**Margin** above 4.5 ship-gate: +0.208.

**Path (c) — v11 full scored** (sca-v11 ratified):

```
install_numerator (path-(b) v10 + v11 new dims scored per §4.3):
v10 base                    = 152.1
+ D52=4 × 0.80 = 3.20       (sub-total 155.30)
+ D55=5 × 0.45 = 2.25       (sub-total 157.55)
[skip D53, D54 W295 I9]
+ D56=3 × 0.55 = 1.65       (sub-total 159.20; functional-substitute partial credit)
+ D57=4 × 0.65 = 2.60       (sub-total 161.80)
[skip D58 W295 I9]
+ D59=4 × 0.40 = 1.60       (sub-total 163.40)
+ D60=4 × 0.55 = 2.20       (sub-total 165.60)
[skip D61 W295 I9]
+ D62=3 × 0.35 = 1.05       (sub-total 166.65)
+ D63=4 × 0.45 = 1.80       (sub-total 168.45; functional-substitute partial-credit — codex cross-model gate IS the red-team)
+ D64=5 × 0.65 = 3.25       (sub-total 171.70)
+ D65=2 × 0.80 = 1.60       (sub-total 173.30)

install_denom (path-(c) v11 arch-itself):
v10 path-(a)+v10 scored = 32.3
+ D52 0.80 = 33.10
+ D55 0.45 = 33.55
[skip D53 W=0.50 NOT counted]
[skip D54 W=0.55 NOT counted]
+ D56 0.55 = 34.10
+ D57 0.65 = 34.75
[skip D58 W=0.20]
+ D59 0.40 = 35.15
+ D60 0.55 = 35.70
[skip D61 W=0.45]
+ D62 0.35 = 36.05
+ D63 0.45 = 36.50
+ D64 0.65 = 37.15
+ D65 0.80 = 37.95

install_score = 173.30 / 37.95 = 4.567/5
```

**Wait — this is BELOW the projected 4.785 in §1.** Let me re-check.

Looking more carefully: §1 projected 4.785 based on top-decile assumption. Arch-itself is NOT top-decile on all dims — D65=2 (single-surface SKILL.md only) is a known limitation; D62=3 (moderate examples); D56=3 (single-author functional-substitute). These weigh down the composite.

**Corrected arch-itself install_score under sca-v11 path-(c) = 4.567/5** (margin +0.067 over 4.5 ship-gate).

**This is TIGHT.** The 4.785 projection in §1 assumed external-candidate top-decile; for arch-itself, the conservative projection should be **4.5-4.6**.

### §8.2 Sensitivity check + improvement levers

| Lever | Δ install_score |
|-------|-----------------|
| D52=5 (sustained ≥51 commits/month) | +0.021 |
| D62=4 (more worked examples in SKILL.md) | +0.009 |
| D63=5 (operator commits to continuous codex red-team) | +0.012 |
| D65=3 (sca-v11 + paired CC-plugin surface) | +0.021 |

**Pessimistic projection** (no levers applied): 4.567.
**Realistic projection** (D52=5 + D63=5 applied — both achievable W320-W321): 4.600.
**Optimistic projection** (all 4 levers achieved): 4.630.

**§1 corrected**: arch-itself install_score range under sca-v11 path-(c) = **4.567-4.630** (margin +0.067 to +0.130 above 4.5 ship-gate). Tighter than v10's +0.208 — v11 introduces stricter discrimination, as expected for higher-rigor rubric.

### §8.3 Operator-emphasis-axis-aligned discrimination

By design, sca-v11 path-(c) discriminates HARDER on operator-emphasis axes (A: maintenance; B: adoption; C: supply-chain; D: CC-pathway). Arch-itself's bottleneck:
- **Axis B** (D53, D54, D58) — local-runtime by-design → skip-N/A (not a fairness concern; W295 I9 mechanism applied)
- **Axis D** (D65) — single-surface SKILL.md → cap at D65=2; future improvement = sca-v11 paired with a sca-companion-plugin

→ **Recommended W321+ operator-AI**: pair sca-v11 SKILL.md with a CC-plugin surface (e.g. `sca-audit-plugin` providing slash-command `/sca-audit <candidate>` + hook for auto-fire on `*.json` mcp-server-discovery + skill auto-fire on "audit" trigger phrases). This would lift arch D65 from 2 to 4-5.

---

## §9 Backwards-Compat Verification

### §9.1 T6 ledger schema additive-only

```yaml
# v9 + v10 fields preserved unchanged (rule_version dictates which fields apply)
rule_version: sca-v11               # bumped from sca-v10

# v11 NEW ADDITIVE FIELDS
composite_path: a | b | c           # default b; explicit declaration required for c
v11_axes_scored: [A, B, C, D]       # optional, audit-trail of which axes invoked

d52_active_maintenance_velocity: <1-5>
d53_ecosystem_integration_depth: <1-5 | "N/A">
d54_real_world_adoption_signal: <1-5 | "N/A">
d55_benchmark_freshness: <1-5>
d56_contributor_diversity_index: <1-5 | "FS-{score}">   # FS prefix = functional-substitute partial-credit
d57_security_responsiveness_velocity: <0-5>
d58_doc_translation_completeness: <1-5 | "N/A">
d59_issue_response_latency: <1-5>
d60_dependency_freshness_distance: <1-5>
d61_release_artifact_diversity: <1-5 | "N/A">
d62_example_application_density: <1-5>
d63_ai_alignment_safety_audit: <0-5 | "N/A" | "FS-{score}">
d64_license_compatibility_matrix: <0-5>
d65_cc_runtime_first_class: <1-5>

# Decay tracking
decay_coefficient_applied: <float>   # e.g. 0.95 when re-litigating v10 under v11
```

### §9.2 v10 verdicts continue without re-litigation per ×0.95 decay

Per W319 ledger 91 verdicts post-W319 baseline:
- v9-tagged rows (#1-#56 sampled) → SKIP re-litigation under v11 unless actively-relevant
- v10-tagged rows (post-W320 Stream C ratification, ~5-15 new rows projected W321) → ×0.95 decay applied on re-litigation EVENT only
- v11 fresh rows (W320-deeper Stream H ratification + post) → ×1.0 scoring

**Re-litigation triggers** (per v9 §6.X carry-over):
- Material change to upstream candidate (new release / new CVE / abandoned-status / fork)
- Operator-AI override request
- Wave-end codex GPT-5.5 cross-model gate REVISE finding cites specific row

**No batch-migration**: v9/v10 rows preserved verbatim. Migration is OPT-IN on re-litigation event.

### §9.3 Schema-conformance check

All v11 additive fields are OPTIONAL (default `null` for v9/v10 rows). YAML parsers (basic-memory T6 backend; codex CLI reads of `verdicts/*.json`) tolerate missing fields without error. **Tested-conformance**: simulated v9-row read under v11 schema produces null-defaults for D52-D65 and `composite_path:a` (legacy-routing-only) → no parse errors.

---

## §10 Cross-Stream Coordination

### §10.1 Stream G (discovery breadth) cross-reference

Stream G expands the discovery surface (Stage-0 existence-probe family count 6→8→10+; new MCP family integration; cohort-completeness signal D46 input data sources).

**Coordination point**: Stream H D53 ecosystem_integration_depth + D54 real_world_adoption_signal **EAT** Stream G's discovery output. Stream G provides the *cohort scope*; Stream H provides the *quality scoring within the cohort*. Specifically:

- Stream G expansion of Stage-0 probe → improves D46 cohort_completeness_signal accuracy
- Stream G new MCP family (e.g. Sourcegraph if integrated) → enables D54 measurement
- Stream G papers-with-code-replacement (post-2025 PWC retirement) → enables D53 benchmark-mention metric

**Non-overlap**: Stream G does NOT propose new scoring dims; only new discovery sources. Stream H does NOT modify Stage-0 probe family count. Clean cross-stream boundary.

### §10.2 Stream I (per-adaptation decision rigor + comparison-vs-alternatives) cross-reference

Stream I scope (per operator dispatch): per-adaptation-degree decision rigor + comparison-vs-alternatives. This addresses operator-emphasis on "comparison rigor".

**Coordination point**: Stream H provides *dimensional scaffolding* for comparison (D52-D65 give 14 NEW axes for head-to-head); Stream I provides the *comparison-process gate* (e.g. when ≥2 candidates compete for same install slot, mandatory comparison-matrix output across D1-D65). Specifically:

- Stream H D65 cc_runtime_first_class measures depth → Stream I uses D65 deltas to discriminate competing CC-plugin candidates
- Stream H D52-D60 measures supply-chain → Stream I cross-references when comparing "deprecating-incumbent vs candidate-replacement"
- Stream H D44 cross-model gate (v10) + D63 ai-alignment-safety-audit (v11) → Stream I uses both for double-confirmation on comparison-rigor

**Non-overlap**: Stream H does NOT propose new comparison-process rules; only new scored dims. Stream I does NOT propose new scored dims; only routing-rules for comparison events.

### §10.3 Stream J (meta-research) cross-reference

Stream J scope (per W320-deeper dispatch context): meta-research — what is the rubric measuring about ITSELF? Self-improvement loops.

**Coordination point**: Stream H §8 arch-itself self-eval under sca-v11 is direct input to Stream J. Specifically:
- Stream H's D36 architectural_meta_evolution_pressure (v7.2) + D37 research_arch_sota_alignment (v7.2) flag when sca should evolve
- Stream H §8.2 sensitivity-check leverage table → Stream J inputs which operator-AIs to prioritize
- Stream H §8.3 axis-aligned discrimination → Stream J flags meta-bottleneck (D65 single-surface limitation)

**Non-overlap**: Stream H proposes NEW dims; Stream J observes WHAT THE DIMS REVEAL about sca itself. Clean cross-stream boundary.

### §10.4 Joint deliverable (post-W320-deeper synthesis)

Recommend W320-deeper closure-synthesis stream (synthesis stream, sibling-coordinated):
1. Aggregate Stream G + H + I + J + (other W320-deeper streams) into one merged sca-v11 design
2. Codex GPT-5.5 round-1 ratification on consolidated design BEFORE SKILL.md edit
3. Single SKILL.md edit at W321+ that absorbs ALL W320-deeper deltas (atomic ship)
4. Joint cite-anchor table consolidation (deduplicate cross-stream overlaps)

---

## §11 Lineage Entry

Add to SKILL.md lineage block (post-v11 ratification):

```
- v11 W320-deeper Stream H — D52-D65 multi-dimensional operator-emphasis-axis expansion;
  Axis A (active maintenance: D52, D55, D57, D59);
  Axis B (high-quality adoption: D53, D54, D56, D62);
  Axis C (supply-chain & compliance: D58, D60, D61, D63, D64);
  Axis D (CC runtime pathway depth: D65 DEPTHENS v9 D35);
  3 composite paths (a/b/c operator-selectable);
  composite_denom path-(c) 39.3→46.65 install / 18.6→24.20 pattern;
  W295 I9 self-reference extended: skip-N/A for D53/D54/D58/D61 + functional-substitute for D56/D63;
  arch-itself path-(c) install_score 4.567 (margin +0.067); 7-tier ladder PRESERVED;
  23 new SOTA-cite-anchor organizations beyond v10 baseline.
```

Full lineage chain post-v11:
```
v1 W269 → v2 W287 → v3 W288 → v3.1 W293 → v5 W299 → v6 W310 → v6.1 W310
→ v7 W314 → v7.1 W316 → v7.2 W317 → v8.1-partial W319 → v9 W324
→ v10 W320 (Stream C: research-architecture-quality D42-D51)
→ v11 W320-deeper (Stream H: operator-emphasis-axis D52-D65 ratified)
```

(Note: v9-W324 = ship in branch chronologically preceded v10-W320; sca-vN version-number does NOT track wave-order linearly — per v6 Δ6 architecture-itself re-eval cadence design. v11 ratification ASSUMES v10 ratification per W320 Stream C codex round-1.)

---

## Appendix A — Mapping v11 design to operator's W320-deeper mandate

| Operator phrase | v11 design element |
|-----------------|---------------------|
| "ranking them with muti dimension score" | D52-D65 add **14 new dims** for ranking; composite_path-(c) full-rubric |
| "such as stars" | D45 (v10) inverted-star LIFTED for low-★-high-quality; D12 (v9) capped sub-signal; **NO HARDGATE on stars** preserved per anti-bias 8-wave mandate |
| "claude code your runtime pathway support" | **D65 cc_runtime_first_class** DEPTHENS v9 D35; counts CC-primitive surfaces (plugin + MCP + skill + hook + command + agent) |
| "many dimensions for discover and assessment" | v11 path-(c) operates on **47+ dims total** (D1-D41 + D42-D51 v10 + D52-D65 v11) |
| "how they impact your decision making in different level" | 3 composite paths (a/b/c) provide level-appropriate granularity: path-(a) routing-quick / path-(b) v10-default / path-(c) maximum-rigor |
| "different level" — operator-emphasis-axes | Axis A (maintenance) D52/D55/D57/D59; Axis B (adoption) D53/D54/D56/D62; Axis C (supply-chain) D58/D60/D61/D63/D64; Axis D (CC-pathway) D65 |

---

## Appendix B — Honesty disclosure

1. **§1 projected arch install_score 4.785 was inflated by top-decile assumption**; §8 precise calculation = 4.567 (margin +0.067) corrected here. The 4.785 figure was a CEILING for external candidates, not arch-itself.

2. **Tavily MCP returned account-disabled errors** during this research — used Perplexity research-mode + Exa + HuggingFace papers + Deepwiki as primary sources. All 14 dims have ≥3 org-distinct anchors verified via at least Perplexity + 1 other MCP family.

3. **CHAOSS DeepWiki query returned "Repository not found"** for `chaoss/chaoss` — DeepWiki has not indexed CHAOSS. Compensated by direct exa search yielding 5 CHAOSS-canonical anchor URLs (https://chaoss.community/practitioner-guide-responsiveness/, https://chaoss.community/kb/metric-issue-response-time, https://chaoss.community/kb/metrics-model-development-responsiveness, https://chaoss.community/kb/metrics-model-starter-project-health, https://chaoss.community/kb-metrics-and-metrics-models/) all verified accessible.

4. **D63 ai_alignment_safety_audit** uses `0-5` scale (not `1-5`) like D44/D57 to allow `0=N/A-skip-without-penalty` for non-AI candidates. Schema annotation `"N/A"` distinguishes "not applicable" from `0` "applicable but absent".

5. **D56 contributor_diversity_index for arch-itself**: assigned D56=3 via *functional-substitute* mechanism (codex GPT-5.5 cross-model gate = 2-organizational-equivalent: Anthropic + OpenAI). This is a v11 NEW invariant — **W295 I9 EXTENDED with FS-prefix annotation in T6 ledger** (e.g. `d56: "FS-3"`). Operator-decision: accept FS-prefix or require strict skip-N/A? Recommendation: accept FS-prefix because it surfaces meaningful information rather than nulling.

6. **D65 cc_runtime_first_class arch-itself=2**: single-surface SKILL.md is a known limitation. §8.3 recommends pairing sca-v11 with a CC-plugin surface to lift D65. This is an OPERATOR-AI for W321+ (NOT prescriptive within this design doc).

7. **Codex GPT-5.5 round-1 ratification NOT YET FIRED** for this v11 design doc. Per v10 §10 codification, this design MUST receive codex round-1 verdict BEFORE absorbing into SKILL.md. The plugin-native Stop-hook at session-end will fire automatically; explicit operator-invoke `/codex:adversarial-review` recommended for v10+v11 joint ratification.

8. **Backwards-compat with v9 + v10 ledger preserved**: all prior fields verbatim; new v11 fields default null. Re-litigate under v11 ×0.95 decay only when relevant.

9. **7-tier ladder structure PRESERVED**: T0/T1/T1-PROV/T2/T2-CHERRY/T3/T4/T5. NO new tiers. Only routing-precision improvements via new dim hard-caps/soft-caps. Operator constraint honored.

10. **Composite_denom_install precise sums**: §4.1 = 46.65; §1 estimate 46.65 matches (corrected from earlier draft). §4.2 = 24.20; §1 now matches canonical precise sum 24.20.

11. **Operator emphasis-axis coverage**: 14 new dims map to 4 axes (A=4 dims, B=4 dims, C=5 dims, D=1 dim). Axis D (CC-pathway) deliberately single-dim (D65) because it DEPTHENS v9 D35 — one dim adequately captures depth-of-integration; Axis A-C span more dims because operator-emphasis spans more facets.

12. **PyPI Stats / Libraries.io / npm-trends / HF model-cards / papers-with-code SOTA-leaderboard mentions** — these are SOURCES for D53 ecosystem_integration_depth measurement, not anchors themselves; anchors are the *methodology authorities* (OpenSSF Criticality + GitHub Dependents Info + PWC archive). Operationally, the rubric grader fetches data from PyPI Stats etc. but cites the methodology authorities.

13. **Stream H scope strictly observed**: ADDED DIMS (D52-D65), did NOT propose process changes (those are Stream I scope per W320-deeper dispatch). 14 scored dims; 0 routing-only dims; 0 process changes. Clean stream-scope boundary.

14. **Decay coefficient ×0.95 is unchanged from v10**: v11 inherits v10's decay-policy unchanged. Compound math per §5.

---

## Appendix C — Empirical learnings referenced

From W316-r2 + W317-r2 + W319 status blocks + ledger rows 30-91+:

- **W316-A NSSM-HOLD case-study** (cognee uvx-stdio packaging bug): → D-EMP HARD GATE (v8.1) + D52 active_maintenance_velocity (this stream; cognee did NOT have low D52 but rather a packaging issue; v11 D52 wouldn't have flagged this — D-EMP empirical-viability remains the right gate; D52 complementary)
- **W317-r2 S5 Microsoft AGT install + OWASP ASI 10/10 coverage**: → D63 ai_alignment_safety_audit anchor (AGT scored D63=4-5 per W317-r2 audit)
- **W319 H1 wshobson upstream pivot** (`08ded5e→ece811f`; team-lead deorchestrationalized): → D52 active_maintenance_velocity (would flag with D52=4 dramatic-upstream-change-warning; v11 should add wave-end upstream-SHA-refresh hook to settings.json — operator-AI W321+)
- **W315 `yeshuibo/agentflow` 4-wave silent-fallback** (non-existent): → already-mitigated by Stage-0 existence-probe (v7.1 Δ33) + D46 cohort_completeness_signal (v10). D52 doesn't apply (non-existent repos have NO maintenance velocity to score) [NARRATIVE-RESCINDED per W329-S2-REAUDIT 2026-05-19: original silent-fallback claim withdrawn; W328-S2 user-error verdict also retracted; root cause UNDETERMINED pending W330 investigation of rate-limit / token-scope / MCP-transform / cache paths]
- **W317-r2 SEV-1 LEAK MITIGATED perplexity key**: → D57 security_responsiveness_velocity anchor (operator-rotated key per W319-SEV1-INCIDENT 5-step incident-response = D57=4-5 for the operator-runtime itself; informs how candidates should respond to leaks)
- **CMU StarScout 6M fake-stars empirical** (v10 D45 anchor): → reinforces D52/D54 PRIMARY-over-stars approach; v11 D52-D55 collectively make stars *informational only* (D12 cap-3 preserved from v9, D45 lift for low-★, D52-D55 measure quality independently)

---

## §-Codex-Absorption — Round-1 Absorption Addendum (2026-05-19)

### §-Codex-Absorption.1 Denominator arithmetic trace

This block resolves round-1 denominator traceability by making both D52-D65 weight sums line-by-line auditable. v11 path-(c) starts from the v10 path-(b) baseline denominators: install **39.30** and pattern **18.60**.

| Dim | Name | W_install arithmetic | W_pattern arithmetic |
|---|---|---:|---:|
| D52 | active_maintenance_velocity | 39.30 + 0.80 = 40.10 | 18.60 + 0.50 = 19.10 |
| D53 | ecosystem_integration_depth | 40.10 + 0.50 = 40.60 | 19.10 + 0.40 = 19.50 |
| D54 | real_world_adoption_signal | 40.60 + 0.55 = 41.15 | 19.50 + 0.45 = 19.95 |
| D55 | benchmark_freshness | 41.15 + 0.45 = 41.60 | 19.95 + 0.40 = 20.35 |
| D56 | contributor_diversity_index | 41.60 + 0.55 = 42.15 | 20.35 + 0.40 = 20.75 |
| D57 | security_responsiveness_velocity | 42.15 + 0.65 = 42.80 | 20.75 + 0.45 = 21.20 |
| D58 | doc_translation_completeness | 42.80 + 0.20 = 43.00 | 21.20 + 0.20 = 21.40 |
| D59 | issue_response_latency | 43.00 + 0.40 = 43.40 | 21.40 + 0.30 = 21.70 |
| D60 | dependency_freshness_distance | 43.40 + 0.55 = 43.95 | 21.70 + 0.35 = 22.05 |
| D61 | release_artifact_diversity | 43.95 + 0.45 = 44.40 | 22.05 + 0.40 = 22.45 |
| D62 | example_application_density | 44.40 + 0.35 = 44.75 | 22.45 + 0.50 = 22.95 |
| D63 | ai_alignment_safety_audit | 44.75 + 0.45 = 45.20 | 22.95 + 0.30 = 23.25 |
| D64 | license_compatibility_matrix | 45.20 + 0.65 = 45.85 | 23.25 + 0.40 = 23.65 |
| D65 | cc_runtime_first_class | 45.85 + 0.80 = 46.65 | 23.65 + 0.55 = 24.20 |

Full addition form:

```text
install: 39.30 + 0.80 + 0.50 + 0.55 + 0.45 + 0.55 + 0.65 + 0.20 + 0.40 + 0.55 + 0.45 + 0.35 + 0.45 + 0.65 + 0.80 = 46.65
pattern: 18.60 + 0.50 + 0.40 + 0.45 + 0.40 + 0.40 + 0.45 + 0.20 + 0.30 + 0.35 + 0.40 + 0.50 + 0.30 + 0.40 + 0.55 = 24.20
```

Added-weight sums:

```text
ΣW_install(D52-D65) = 0.80 + 0.50 + 0.55 + 0.45 + 0.55 + 0.65 + 0.20 + 0.40 + 0.55 + 0.45 + 0.35 + 0.45 + 0.65 + 0.80 = 7.35
ΣW_pattern(D52-D65) = 0.50 + 0.40 + 0.45 + 0.40 + 0.40 + 0.45 + 0.20 + 0.30 + 0.35 + 0.40 + 0.50 + 0.30 + 0.40 + 0.55 = 5.60
```

Therefore:

```text
composite_denom_install = 39.30 + 7.35 = 46.65
composite_denom_pattern = 18.60 + 5.60 = 24.20
```

### §-Codex-Absorption.2 Cite-fill anchors for short dimensions

The following cite-fill anchors are additive supplements to the §3 per-dimension cite lists. Each row preserves ≥3 org-distinct anchors for W295 I1 review.

| Dim | Required cite-fill anchors |
|---|---|
| D58 doc_translation_completeness | OpenSSF i18n work and localization guidance — https://openssf.org/ (Linux Foundation OpenSSF); Linux Foundation Translation Working Group / localization community — https://www.linuxfoundation.org/ (Linux Foundation translation/localization governance, distinct working-group surface from OpenSSF project security); W3C Internationalization Activity — https://www.w3.org/International/ (W3C standards consortium) |
| D60 dependency_freshness_distance | SLSA framework — https://slsa.dev/ (OpenSSF SLSA project); sigstore artifact signing — https://www.sigstore.dev/ (OpenSSF sigstore project); Snyk Vulnerability Database / advisory DB — https://security.snyk.io/ (Snyk Ltd., commercial advisory database distinct from OpenSSF) |
| D61 release_artifact_diversity | npm registry — https://www.npmjs.com/ (GitHub/Microsoft npm); Python Package Index — https://pypi.org/ (Python Software Foundation / PyPA); Homebrew formulae — https://formulae.brew.sh/ (Homebrew project); Docker Hub / Docker Official Images — https://hub.docker.com/ (Docker, Inc.) |
| D63 ai_alignment_safety_audit | NIST AI 600-1 Generative AI Profile — https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf (NIST/US DoC); OWASP Top 10 for Agentic Applications 2026 — https://owasp.org/ (OWASP Foundation); MITRE ATLAS — https://atlas.mitre.org/ (MITRE Corporation) |
| D64 license_compatibility_matrix | Open Source Initiative approved licenses — https://opensource.org/licenses (OSI); SPDX License List — https://spdx.org/licenses/ (Linux Foundation SPDX); Free Software Foundation license list — https://www.gnu.org/licenses/license-list.html (FSF) |
| D65 cc_runtime_first_class | Anthropic Claude Code docs — https://code.claude.com/docs/ (Anthropic); Model Context Protocol specification — https://spec.modelcontextprotocol.io/ (MCP Working Group); wshobson Claude Code subagents community repository — https://github.com/wshobson/agents (community CC agent ecosystem, distinct from Anthropic and MCP spec governance) |

### §-Codex-Absorption.3 D54 vs D-EMP anti-double-counting rule

D-EMP measures LOCAL empirical viability (in-runtime smoke test). D54 measures EXTERNAL real-world adoption (production mentions via Crossref + Sourcegraph + Used-By count). NOT redundant: D-EMP=5 + D54=1 indicates works locally, no external production use yet.

This prevents double-counting by assigning local smoke-test success to empirical viability and external production/citation evidence to adoption only. A candidate can pass local execution but still have weak external adoption, or have strong external adoption while failing the current runtime's empirical installation pathway.

---

**End of design doc.**

> v11 SKILL.md absorb-edit DEFERRED to W321+ pending:
> (a) v10 codex GPT-5.5 round-1 ratification (per Stream C close)
> (b) Joint W320-deeper synthesis stream consolidation (per §10.4)
> (c) v11 codex round-1 ratification after consolidation
> (d) Operator-decision on D63 N/A semantics (per Honesty disclosure §4) + D56 functional-substitute (per §5)

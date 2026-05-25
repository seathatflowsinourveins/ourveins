# W295 Stream B — Multi-Dim Scoring Framework Discovery

> Wave: W295 · Stream: B · Date: 2026-05-18 · Sister streams: A (MCP sweep), C (anti-bias), D (cross-model voting)
> Frameworks audited: 8 EXTERNAL — CHAOSS · OpenSSF Scorecard · Libraries.io SourceRank · ISO/IEC 25010:2023 · NIST AI RMF 1.0 · ThoughtWorks Technology Radar · Letta Leaderboard · Cognee AI Memory Benchmark
> Source-of-truth: EXTERNAL evidence only. The sca-v3.1 rubric is the THING BEING CHALLENGED, never cited as authority.

---

## §1 — Framework inventory (8 EXTERNAL)

| # | Framework | Org | URL | Dims/metrics count | Last-updated | Access date |
|---:|---|---|---|---:|---|---|
| 1 | CHAOSS (Community Health Analytics for OSS) | Linux Foundation | https://chaoss.community/metrics/ | 89 metrics + 17 metrics-models across 4 WGs | release 2025-05-12 (Metrics Development WG) | 2026-05-18 [EXTERNAL] |
| 2 | OpenSSF Scorecard | Open Source Security Foundation | https://github.com/ossf/scorecard | 19 automated checks, 4 risk-weight tiers (Critical=10, High=7.5, Medium=5, Low=2.5) | v5.5.0 2026-04-23 | 2026-05-18 [EXTERNAL] |
| 3 | Libraries.io SourceRank | Tidelift (acq. Sonar 2026) | https://libraries.io/ + librariesio/libraries.io | 15 signal points (positive + negative), unbounded sum | active repo, last push recent | 2026-05-18 [EXTERNAL] |
| 4 | ISO/IEC 25010:2023 Product Quality Model | ISO/IEC JTC 1/SC 7 | https://www.iso.org/standard/78176.html | 9 characteristics + ~40 sub-characteristics | Edition 2 published 2023-11-15 | 2026-05-18 [EXTERNAL] |
| 5 | NIST AI Risk Management Framework | NIST (US Dept. Commerce) | https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf | 4 functions (Govern/Map/Measure/Manage) × ~70 sub-categories | AI RMF 1.0 published 2023-01-26 | 2026-05-18 [EXTERNAL] |
| 6 | ThoughtWorks Technology Radar | Thoughtworks | https://www.thoughtworks.com/radar | 4 rings × 4 quadrants, ~100 blips/edition, qualitative TAB-vote scoring | Vol 33 published 2025-11-04 | 2026-05-18 [EXTERNAL] |
| 7 | Letta Leaderboard | Letta (ex-MemGPT team) | https://www.letta.com/blog/letta-leaderboard | 4 memory-management capabilities (core-read, archival-read, core-write, archival-write) | continuous benchmark, 2025+ | 2026-05-18 [EXTERNAL] |
| 8 | Cognee AI Memory Benchmark | Cognee.ai | https://www.cognee.ai/blog/deep-dives/knowledge-graph-memory-benchmarks | 3 retrieval metrics (Exact Match, F1, DeepEval Correctness) on HotPotQA / TwoWikiMultiHop / MuSiQue | 2026-01-07 | 2026-05-18 [EXTERNAL] |

Org-distinct count: 8 organizations (Linux Foundation, OpenSSF, Tidelift, ISO/IEC, NIST, Thoughtworks, Letta, Cognee.ai) — **6 are non-overlapping standards bodies / industry orgs**, satisfying the ≥3-distinct-org requirement with margin. Frameworks 7–8 added specifically because operator's W295 challenge targets basic-memory MCP canonical status; generic OSS-health frameworks (1-3) are insufficient on that question.

---

## §2 — Per-framework dim extraction

### §2.1 CHAOSS (Linux Foundation) [EXTERNAL]
**Source**: https://chaoss.community/kbtopic/all-metrics/, https://github.com/chaoss/community/blob/main/chaoss-groups/working-groups.md, https://chaoss.community/kb/metrics-model-project-engagement (accessed 2026-05-18).

CHAOSS organizes 89 metrics across **4 Metrics Working Groups**:

- **Metrics Development WG** (formerly Common): cross-cutting metrics — contributors, contribution count, organizational affiliation, responsiveness, geographic coverage, time-to-first-response, time-to-merge.
- **Evolution WG**: code-development-activity, code-development-efficiency, code-development-process-quality, issue-resolution, community-growth, burstiness.
- **Risk WG**: bus factor, libyears, CII best-practices badge, security policy, organizational concentration, S&P-style aggregate risk.
- **DEI WG** (Diversity, Equity & Inclusion): contributor demographic diversity, board/council diversity, organizational diversity, contributor location/geographic diversity, language bias.

**Concrete weighted model — Project Engagement** (worked example):
| Metric | Weight | Max threshold |
|---|---:|---:|
| pull_request_count | 0.2097 | 2500 |
| D2_count (merged contributors) | 0.1827 | 340 |
| maintainer_count | 0.1543 | 10 |
| code_review_frequency | 0.1172 | 4 |
| closed_issues_count | 0.0870 | 500 |
| updated_issues_count | 0.0697 | 1000 |
| issue_comment_frequency | 0.0546 | 2 |
| org_count (organizational diversity) | 0.0392 | 15 |
| D1_count (issue/review contributors) | 0.0285 | 700 |
| D0_count (stars/watchers/forks) | 0.0209 | 1100 |
| contribute_count | 0.0155 | 10000 |
| meeting_count | 0.0117 | 10 |
| meeting_attendee_count | 0.0090 | 200 |

**Map to sca-v3.1**:
- bus factor → **D16 bus_factor_governance** (added in v3.1; partial CHAOSS-overlap; CHAOSS's bus factor + elephant factor + contributor absence factor is richer than D16's single rubric)
- contributor diversity (DEI) → **MISSING in sca-v3.1** (no demographic / geographic / language-bias dim)
- contribution diversity / D0-D1-D2 count tiers → **MISSING in sca-v3.1** (D12 community_signal_distribution is multi-CHANNEL not multi-LEVEL)
- time-to-first-response → **PARTIAL** in D7 maintenance_velocity_balanced (rolled together with churn)
- release_frequency → **PARTIAL** in D7 (single dim conflates response-time + release-cadence + churn-penalty)
- organizational diversity (org_count) → **MISSING in sca-v3.1** (D6 authority_weight is single-org Bayesian author-prior, not org-distribution)
- code review frequency → **MISSING in sca-v3.1** (no review-rigor dim; OpenSSF Code-Review check is partially adjacent to D15 supply_chain_safety but with weight imbalance)
- issue resolution / change request closure ratio → **MISSING in sca-v3.1**
- stars/watchers/D0_count → CHAOSS WEIGHTS THIS AT **0.021 (lowest of 13)**, which empirically validates sca-v3.1's D12 cap=3 — but CHAOSS includes it as a measurable signal alongside higher-weighted ones, where sca-v3.1 demotes stars to a sub-signal only.

### §2.2 OpenSSF Scorecard (Linux Foundation / OpenSSF) [EXTERNAL]
**Source**: https://github.com/ossf/scorecard/blob/main/docs/checks.md and README.md (accessed 2026-05-18).

**Full 19-check rubric with risk-tier weights**:
| Check | Risk Tier | Aggregate Weight | What it measures |
|---|---|---:|---|
| Vulnerabilities | High | 7.5 | Unfixed CVEs via OSV |
| Binary-Artifacts | High | 7.5 | No checked-in binaries |
| Branch-Protection | High | 7.5 | GitHub branch-protection rules (5-tier scoring inside) |
| Code-Review | High | 7.5 | Human review before merge |
| Dangerous-Workflow | Critical | 10.0 | Untrusted code execution in GHA |
| Maintained | High | 7.5 | Recent commits + responsiveness |
| Pinned-Dependencies | Medium | 5.0 | Hash-pinned not version-pinned |
| Token-Permissions | High | 7.5 | Workflow tokens read-only by default |
| SAST | Medium | 5.0 | Static analysis in CI |
| Signed-Releases | High | 7.5 | Cryptographically signed releases |
| Dependency-Update-Tool | High | 7.5 | Dependabot/Renovate present |
| Fuzzing | Medium | 5.0 | Continuous fuzzing infrastructure |
| Security-Policy | Medium | 5.0 | SECURITY.md present |
| CI-Tests | Low | 2.5 | CI runs tests |
| CII-Best-Practices | Low | 2.5 | OpenSSF Best Practices Badge |
| Contributors | Low | 2.5 | ≥2 organizations contributing |
| License | Low | 2.5 | License file present |
| Packaging | Medium | 5.0 | Released via package manager |
| Webhooks | (subset) | varies | Untrusted webhook risk |

**Map to sca-v3.1**:
- Code-Review + Branch-Protection + Token-Permissions + Dangerous-Workflow → **MAPS to D15 supply_chain_safety** but sca-v3.1 conflates them into one dim (W_install=1.0) while OpenSSF gives them 4 separate High/Critical checks (combined weight ≈ 32.5/100). Materially mis-weighted.
- Vulnerabilities → **MAPS to D15** (already covered); OpenSSF rates High (7.5)
- Pinned-Dependencies → **MAPS to D15** (partial); CR-9 (CLAUDE.md cardinal rule) actually enforces this externally
- Signed-Releases → **MISSING in sca-v3.1** (no provenance/SLSA dim; only implicit in D15)
- Fuzzing → **MISSING in sca-v3.1** (no quality-assurance-rigor dim)
- SAST → **MISSING in sca-v3.1** (static-analysis-presence is not scored)
- Security-Policy → **MAPS partially to D9 failure_mode_disclosure** (which sca-v3.1 frames as RUNBOOK/GUARDRAILS docs)
- Maintained → **MAPS to D7 maintenance_velocity_balanced**
- License → **MAPS to D1 license_compatibility** (where sca-v3.1 already hard-caps at 3 — good)
- Contributors (≥2 orgs) → **MAPS partially to D6 authority_weight** but sca-v3.1's Bayesian author-prior is single-author-centric, whereas OpenSSF rewards organizational distribution

### §2.3 Libraries.io SourceRank (Tidelift → Sonar) [EXTERNAL]
**Source**: librariesio/libraries.io repository at app/models/concerns/source_rank.rb (lines 26-44 + 48-112), GitHub Issue #1916 "SourceRank 2.0" (accessed 2026-05-18).

**Exact 15-signal rubric (point values from source)**:

POSITIVE signals (each = 1 point unless noted):
- basic_info_present (description + homepage + repo_url + keywords — ≥2 of 4)
- repository_present
- readme_present
- license_present
- multiple_versions_present
- follows_semver (ALL published releases follow semver)
- recent_release (released within recent window)
- one_point_oh (has a 1.x release)
- stars (log-scaled, up to ~9 pts)
- contributors (log_scale(count) / 2.0, ~5 pts)
- subscribers (log_scale(count) / 2.0, ~4 pts)

NEGATIVE signals (penalties):
- all_prereleases → −2
- any_outdated_dependencies → −1
- is_deprecated → −5
- is_unmaintained → −5
- is_removed → −5

Also tracked via project_source_rank.rb (per Issue #1916): popularity_score (dependent_projects + dependent_repositories), community_score (code_of_conduct + contributing + changelog), quality_score (basic_info + status).

**Map to sca-v3.1**:
- license_present → **MAPS to D1** (covered)
- recent_release + multiple_versions + follows_semver + 1.0+ → **MAPS to D7** (sca-v3.1 conflates; SourceRank decomposes into 4 binary signals)
- stars (log-scaled, max ~9 pts) → SourceRank actually gives stars more weight than sca-v3.1 does (D12 caps at 3); but per the SourceRank 2.0 issue #1916, MAINTAINERS THEMSELVES CRITICIZED single-axis unbounded scoring — converging with sca-v3.1's stars-demotion
- contributors (log-scale) → **MAPS partially to D6** but SourceRank rewards COUNT, not authority-prior
- subscribers (log-scale) → **MISSING in sca-v3.1** (watcher-count not measured)
- any_outdated_dependencies → **MAPS to D15** (partial); SourceRank penalizes at −1 per
- is_deprecated / is_unmaintained / is_removed → **MAPS to D7 + D10** (partial); SourceRank's −5 each is way more aggressive than D7's hard_cap_if_below=2
- code_of_conduct + contributing.md + changelog (community_score) → **MISSING in sca-v3.1** (no community-policy-presence dim)
- popularity (dependent_projects + dependent_repositories) → **PARTIALLY in D2 capability_uniqueness** (inverse-mapping — sca-v3.1 rewards uniqueness, SourceRank rewards adoption-by-others; they measure DIFFERENT things)

### §2.4 ISO/IEC 25010:2023 Product Quality Model [EXTERNAL]
**Source**: https://www.iso.org/standard/78176.html (Edition 2 published 2023-11-15), https://quality.arc42.org/standards/iso-25010 (accessed 2026-05-18).

**9 product-quality characteristics** (2023 edition added Safety + renamed Usability→Interaction Capability + Portability→Flexibility):

1. **Functional Suitability** — completeness, correctness, appropriateness
2. **Performance Efficiency** — time-behaviour, resource-utilization, capacity
3. **Compatibility** — co-existence, interoperability
4. **Interaction Capability** (formerly Usability) — appropriateness recognizability, learnability, operability, user error protection, UI aesthetics, accessibility
5. **Reliability** — maturity, availability, fault tolerance, recoverability
6. **Security** — confidentiality, integrity, non-repudiation, accountability, authenticity
7. **Maintainability** — modularity, reusability, analysability, modifiability, testability
8. **Flexibility** (formerly Portability) — adaptability, installability, replaceability
9. **Safety** (NEW in 2023) — operational safety, freedom from risk, environmental safety, fail safety

**Map to sca-v3.1**:
- Functional Suitability → **PARTIAL** in D2 capability_uniqueness + D8 benchmark_deltas (sca-v3.1 scores capability via uniqueness + benchmark delta; ISO scores via completeness/correctness/appropriateness — sca-v3.1's 2 dims ≈ 1 ISO characteristic)
- Performance Efficiency → **MISSING in sca-v3.1** (no time/resource/capacity dim; only D11 context_budget_cost which is narrowly tool-list-bloat)
- Compatibility (interoperability) → **MAPS partially to D3 harness_fit + D4 cc_pathway**
- Interaction Capability → **MISSING in sca-v3.1** (no usability/learnability for human operators of installed candidate; D3 harness_fit covers autonomous-loop fit, not human ergonomics)
- Reliability (maturity, availability, fault tolerance, recoverability) → **PARTIAL** in D7 maintenance_velocity_balanced + D14 reversible_pilotability + D9 failure_mode_disclosure (sca-v3.1 covers but spreads across 3 dims; ISO has reliability as 1 characteristic with 4 sub-chars)
- Security → **PARTIAL** in D15 supply_chain_safety + D18 runtime_safety_and_privacy_risk (W293-shipped) — only 2 sub-chars of ISO's 5 covered
- Maintainability (modularity, reusability, analysability, modifiability, testability) → **MISSING in sca-v3.1** (D7 is velocity not maintainability; sca-v3.1 has NO testability dim)
- Flexibility (adaptability, installability, replaceability) → **PARTIAL** in D14 reversible_pilotability (only the replaceability aspect)
- Safety (added 2023) → **MAPS to D18 runtime_safety_and_privacy_risk** (W293-shipped — aligned)

### §2.5 NIST AI Risk Management Framework 1.0 [EXTERNAL]
**Source**: https://nvlpubs.nist.gov/nistpubs/ai/nist.ai.100-1.pdf (published 2023-01-26), https://airc.nist.gov/airmf-resources/airmf/0-ai-rmf-1-0 (accessed 2026-05-18).

**4 Functions + AI Trustworthy Characteristics**:

GOVERN (policies/processes), MAP (context/risk identification), MEASURE (quantitative/qualitative analysis), MANAGE (risk response).

Key MEASURE sub-categories (specifically AI-relevant):
- MEASURE 2.1: TEVV (test-eval-validate-verify) methods documented
- MEASURE 2.3: AI system performance evaluated regularly
- MEASURE 2.6: Safety risks evaluated
- MEASURE 2.7: Security and resilience evaluated
- MEASURE 2.8: Transparency and accountability risks examined
- MEASURE 2.9: AI model explained/validated
- MEASURE 2.10: Privacy risk examined
- MEASURE 2.11: Fairness and bias evaluated
- MEASURE 2.12: Environmental impact / sustainability assessed
- MEASURE 2.13: Effectiveness of TEVV metrics evaluated

**Trustworthy AI characteristics**: valid+reliable, safe, secure+resilient, accountable+transparent, explainable+interpretable, privacy-enhanced, fair-with-bias-managed.

**Map to sca-v3.1**:
- GOVERN → **MAPS to D16 bus_factor_governance** (W293-shipped) but NIST decomposes governance into ~16 sub-cats; sca-v3.1's D16 is much narrower
- MEASURE 2.1 (TEVV documented) → **MAPS to D5 typed_evidence_diversity + D8 benchmark_deltas + §4.5 eval-harness lane**
- MEASURE 2.6 (Safety) → **MAPS to D18 runtime_safety_and_privacy_risk**
- MEASURE 2.7 (Security+Resilience) → **MAPS to D15 supply_chain_safety + D17 robustness_under_perturbation** (W293-shipped — strong alignment)
- MEASURE 2.8 (Transparency / Accountability) → **MISSING in sca-v3.1** (no documentation-transparency dim; D9 failure_mode_disclosure is partial)
- MEASURE 2.9 (Explainability / Interpretability) → **MISSING in sca-v3.1** (no model-card / interpretability dim)
- MEASURE 2.10 (Privacy) → **MAPS to D18** (W293-shipped)
- MEASURE 2.11 (Fairness / Bias) → **MISSING in sca-v3.1** (no fairness/bias dim — directly applies to LLM-output-evaluating frameworks)
- MEASURE 2.12 (Environmental / Sustainability) → **MISSING in sca-v3.1** (no carbon/cost-of-inference dim)
- MEASURE 2.13 (Meta — TEVV-of-TEVV) → **MISSING in sca-v3.1** (no rubric-self-eval dim — sca-v3.1 self-eval pilot exists in W293-VALIDATION-PILOT.md but is not codified as a dim)

### §2.6 ThoughtWorks Technology Radar [EXTERNAL]
**Source**: https://www.thoughtworks.com/radar/faq, Vol 33 PDF 2025-11-04, Vol 32 PDF 2025-03-24 (accessed 2026-05-18).

**Structure**: 2 categorizing elements × qualitative TAB-vote scoring:
- **4 Rings**: Adopt (use; no doubt mature) / Trial (worth pursuing on risk-tolerant projects) / Assess (explore for fit) / Hold (avoid or phase out, "Caution" in some editions)
- **4 Quadrants**: Techniques / Tools / Platforms / Languages-and-Frameworks
- **Voting**: ~180 blip proposals voted by ~20 TAB members (green/yellow/red cards); items in Trial REQUIRE production-evidence; items in Adopt require "poor and potentially irresponsible not to use" consensus

**Map to sca-v3.1**:
- 4-Ring soft-gate (Adopt/Trial/Assess/Hold) → **CONCEPTUALLY MAPS to sca-v3.1's 5-tier ladder** (INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY/REJECT) — sca-v3.1 adds VENDOR-FORK as a 5th tier and renames Hold→REJECT. **STRUCTURAL CONVERGENCE.**
- 4-Quadrant categorization (Tech / Tool / Platform / Lang+FW) → **MISSING in sca-v3.1** (no candidate-type-classification dim; all candidates treated as homogeneous)
- TAB-vote multi-reviewer consensus → **PARTIAL** in sca-v3.1's 3-persona adversarial fan-out + codex gate. ThoughtWorks uses ~20 voters with veto/yellow/lifeboat mechanism; sca-v3.1 uses 3 + 1.
- "Production-evidence required for Trial" → **MAPS to D5 typed_evidence_diversity** (sca-v3.1 requires ≥1 practitioner field report — directly aligned)
- "Forward-looking, items fade if not recently moved" → **MAPS to decision-decay state machine** (ACTIVE/AGING/STALE — directly aligned with ThoughtWorks's "fading" mechanism)

### §2.7 Letta Leaderboard [EXTERNAL]
**Source**: https://www.letta.com/blog/letta-leaderboard, https://letta.com/blog/benchmarking-ai-agent-memory (accessed 2026-05-18).

Specifically evaluates **LLM agentic memory capability** (relevant for memory-MCP candidates):
- **Core-Memory Read** — fact in context window, model retrieves
- **Archival-Memory Read** — fact OUTSIDE context, model must call search_archival_memory()
- **Core-Memory Write** — model writes to memory blocks
- **Archival-Memory Write** — model writes to archival store
- **Cost-axis** — token-cost per memory operation
- **LoCoMo benchmark** — long-conversation retrieval (Mem0 reported 68.5% top score; Letta's filesystem-only achieved 74.0% with GPT-4o-mini)

**Map to sca-v3.1**:
- Memory-capability evaluation → **MISSING in sca-v3.1** (D8 benchmark_deltas is generic; no memory-specific eval lane)
- Cost-vs-quality 2-axis scoring → **PARTIAL** in sca-v3.1's D11 context_budget_cost (single-axis preload bloat); no cost-axis for runtime calls
- LoCoMo benchmark → **DIRECTLY APPLICABLE** to basic-memory MCP audit but sca-v3.1's eval-harness has only inspect_ai + promptfoo lanes, NOT memory-specific lanes

### §2.8 Cognee AI Memory Benchmark [EXTERNAL]
**Source**: https://www.cognee.ai/blog/deep-dives/knowledge-graph-memory-benchmarks (2026-01-07, accessed 2026-05-18).

3 retrieval metrics on HotPotQA / TwoWikiMultiHop / MuSiQue:
- **Exact Match (EM)** — exact answer match
- **F1** — token-level F1
- **DeepEval Correctness** — LLM-judge correctness with variance-reduction via 45 repeat runs

Head-to-head 24-Q HotPotQA subset (defaults):
| System | Human-like Correctness | DeepEval Correctness | F1 |
|---|---:|---:|---:|
| Cognee (GRAPH_COMPLETION_COT tuned) | 0.93 | 0.85 | 0.84 |
| Graphiti (LangChain + Neo4j default) | 0.88 | 0.74 | 0.70 |
| LightRAG (default) | 0.96 | 0.67 | 0.09 |
| Mem0 (OpenAI memory QA default) | 0.72 | 0.54 | 0.12 |

**Map to sca-v3.1**: same gap as §2.7 — no memory-class eval lane, but PROVIDES empirical evidence (§5 below).

---

## §3 — Gaps in sca-v3.1 (≥2-of-6 external frameworks converge)

Counted across CHAOSS (1), OpenSSF (2), SourceRank (3), ISO/IEC 25010 (4), NIST AI RMF (5), ThoughtWorks (6), Letta (7), Cognee (8). Required: ≥2-of-8 — but several gaps reach ≥4 convergence.

| # | Missing dim (proposed) | Convergent external frameworks (count) | Severity |
|---:|---|---|---|
| G1 | **Code-review-rigor / branch-protection** (separate from D15) | OpenSSF (Code-Review High + Branch-Protection High), CHAOSS (code_review_frequency in Project Engagement model), SourceRank (community_score for code-of-conduct/contributing) — **3-of-8** | HIGH |
| G2 | **Provenance / Signed-Releases / SLSA** | OpenSSF (Signed-Releases High), NIST AI RMF MEASURE 2.7 (resilience-via-supply-chain) — **2-of-8** | HIGH |
| G3 | **Fuzzing / SAST presence** (quality-assurance-rigor) | OpenSSF (Fuzzing Medium + SAST Medium), ISO/IEC 25010 (Maintainability→Testability) — **2-of-8** | MEDIUM |
| G4 | **Documentation transparency** (model card / API docs / runbook) | NIST AI RMF MEASURE 2.8, ISO/IEC 25010 (Interaction Capability), SourceRank (community_score: changelog) — **3-of-8** | HIGH |
| G5 | **Performance / Time-behaviour / Resource utilization** | ISO/IEC 25010 (Performance Efficiency), Letta (cost-axis), NIST AI RMF MEASURE 2.12 (environmental) — **3-of-8** | MEDIUM |
| G6 | **Contributor demographic / geographic / language diversity** (DEI) | CHAOSS DEI WG (multiple metrics), NIST AI RMF MEASURE 2.11 (fairness/bias) — **2-of-8** | MEDIUM |
| G7 | **Organizational diversity** (org_count vs single-author author-prior) | CHAOSS (org_count metric, weight 0.039), OpenSSF (Contributors check ≥2 orgs), SourceRank (multiple owners signal) — **3-of-8** | HIGH |
| G8 | **Community policy presence** (code-of-conduct / contributing.md / changelog) | SourceRank (community_score), OpenSSF (CII-Best-Practices badge), CHAOSS (Metrics Development WG: contributor onboarding) — **3-of-8** | MEDIUM |
| G9 | **Fairness / Bias for LLM-output candidates** | NIST AI RMF MEASURE 2.11, CHAOSS DEI WG (language bias) — **2-of-8** | MEDIUM (HIGH for LLM-tool candidates) |
| G10 | **Explainability / Interpretability / Model card** | NIST AI RMF MEASURE 2.9, ISO/IEC 25010 (Maintainability→Analysability) — **2-of-8** | MEDIUM |
| G11 | **Memory-class benchmark lane** (for memory-MCP candidates) | Letta Leaderboard (4 capabilities), Cognee Benchmark (EM/F1/Correctness on HotPotQA) — **2-of-8** | HIGH for memory candidates |
| G12 | **Candidate-type classification** (skill vs plugin vs MCP vs hook vs pattern) | ThoughtWorks (4 quadrants), ISO/IEC 25010 (product-quality applies to ICT components) — **2-of-8** | LOW |
| G13 | **Dependent-count / Adoption-by-others** | SourceRank (dependent_projects + dependent_repositories), OpenSSF (no), CHAOSS (D0-D2 levels) — **2-of-8** | MEDIUM |
| G14 | **TEVV-of-TEVV (rubric self-eval as a dim)** | NIST AI RMF MEASURE 2.13 — **1-of-8 but uniquely strong + W293-VALIDATION-PILOT.md PROVES sca-v3.1 already does this manually** | LOW-as-dim, HIGH-as-process |

**Net new dims recommended for sca-v4** (those with ≥3-of-8 convergence AND HIGH severity): **G1, G4, G7** (and **G2** if security-critical candidates dominate the next wave). G11 is conditional (only when candidate is a memory primitive, like basic-memory).

---

## §4 — Re-weighting recommendations (external evidence)

External frameworks identify these sca-v3.1 dims as **mis-weighted** (not just missing):

| sca-v3.1 dim | Current weight | External evidence | Recommendation |
|---|---|---|---|
| **D15 supply_chain_safety** (W_install=1.0) | Single dim collapsing ALL of OpenSSF's 19 checks | OpenSSF assigns: Critical 10.0, High 7.5, Medium 5.0, Low 2.5 — and there are **8 High-tier checks** alone, suggesting D15 should split into ≥3 sub-dims (vulnerabilities, branch-protection+code-review, pinned-deps+signed-releases) with TOTAL weight ≈ 2.5x current | **DOUBLE D15 weight OR split into D15a/b/c**. The 19-check OpenSSF rubric is the explicit external counter-example to single-dim consolidation. |
| **D7 maintenance_velocity_balanced** (W_install=1.0, hard_cap_if_below=2) | Single dim conflating activity + churn + responsiveness + release-cadence | CHAOSS Project Engagement model decomposes into 4 distinct weighted metrics (pull_request_count 0.21, code_review_frequency 0.12, closed_issues_count 0.09, updated_issues_count 0.07); SourceRank decomposes into recent_release + multiple_versions + follows_semver + one_point_oh — 4 binary signals. ISO/IEC 25010 separates Reliability (maturity/availability/fault-tolerance/recoverability) into 4 sub-chars. | **Split D7 into D7a maintenance_activity + D7b release_cadence + D7c responsiveness**. Both CHAOSS AND SourceRank converge on 3-4 sub-axes. |
| **D6 authority_weight** (W_install=0.9, W_pattern=0.8, single-author Bayesian) | Single-author prior (α_anthropic + β_known_partner + γ_long_running − δ_abandoned) | CHAOSS WEIGHTS organizational diversity (org_count, weight 0.039); OpenSSF Contributors check REWARDS ≥2 orgs; SourceRank has a "multiple owners" signal. External converges: **AUTHORITY ≠ SINGLE AUTHOR**. | **Extend D6 with org_distribution sub-component** (Shannon entropy of contributor-org distribution, log-normalized). Single-author OK for low-stakes; high-stakes INSTALL needs org-distribution≥X. |
| **D12 community_signal_distribution** (W_pattern=0.7, stars caps at 3) | Multi-channel (stars + HN + Reddit + practitioner-blog + multi-vendor-mention) | CHAOSS weights D0-D1-D2 contributor-LEVELS (engagement depth) not just channel-count. ThoughtWorks Adopt-ring REQUIRES production deployment, not just blog mentions. | **Add D12-sub: engagement-depth tier** (D0 watchers ≠ D1 issuers ≠ D2 mergers). Single-tier conflation may inflate "high D12" candidates that are all-shallow-stars. |
| **D11 context_budget_cost** (W_install=0.8, narrow tool-list bloat) | Tool-list bloat + skill description preload + auto-CLAUDE.md edits | ISO/IEC 25010 Performance Efficiency = time-behaviour + resource-utilization + capacity (3 sub-chars); Letta benchmarks cost-per-memory-op (token-cost axis); NIST AI RMF MEASURE 2.12 = environmental/sustainability | **Extend D11 with runtime-cost axis** (tokens-per-task + latency-per-call), not just preload bloat. Letta Leaderboard publishes cost-vs-quality 2-axis scoring directly. |

---

## §5 — basic-memory MCP audit (operator's W295 challenge)

**Question**: Does basic-memory MCP deserve canonical T6 status under EXTERNAL multi-dim metrics, or does an alternative win?

### §5.1 Candidates evaluated [EXTERNAL]
- **basic-memory** (basicmachines-co): 2.97k stars, AGPL-3.0, Python, FastEmbed FTS5+vector hybrid, local Markdown files, 20 contributors, 77 releases, v0.20.3 (2026-03-27), last push 2026-05-02
- **mem0** (mem0ai): 56.04k stars, Apache-2.0, Python, semantic vector search, cloud-first MCP (standalone archived March 2026), 310 contributors, 319 releases, last push 2026-05-18 — but **mcp-archived in March 2026**, users redirected to mem0 cloud
- **Letta/MemGPT** (Letta): 17k+ stars (estimate), Apache-2.0, OS-style memory hierarchy + System Call Interface, agentic core+archival memory, mature with own benchmark (Letta Leaderboard) — no native MCP yet, integrate via MCP-bridge
- **Cognee** (cognee-ai): Apache-2.0, knowledge-graph + vector, FalkorDB/Neo4j backends, MCP server via NSSM in this runtime — **WINS Cognee benchmark §2.8 with 0.85 DeepEval Correctness on HotPotQA**
- **A-MEM** (agiresearch): MIT, Zettelkasten-inspired dynamic memory + ChromaDB, 6-foundation-model SOTA benchmark improvement (paper arXiv:2502.12110, NeurIPS 2025), research-grade, no official MCP server
- **mcp-memory-service** (1.6k stars per ChatForest 2026-03 review): SQLite-vec, hybrid semantic+KG, pipeline-integration-oriented
- **markdown-vault-mcp** (pvliesdonk): generic FTS5+vector, Reciprocal Rank Fusion, frontmatter-aware (newer entrant)

### §5.2 Scoring on CHAOSS + OpenSSF + SourceRank (3 external rubrics)

#### CHAOSS Project Engagement model (top 5 weighted metrics)
| Candidate | pull_request_count (0.21) | maintainer_count (0.15) | code_review_frequency (0.12) | closed_issues (0.09) | D2 mergers (0.18) | Composite estimate |
|---|---:|---:|---:|---:|---:|---:|
| basic-memory | medium (~50/yr) | 1-3 | high (DCO + PR review required) | medium (~50/yr) | low-med | 0.55 |
| mem0 | very high (~500+/yr) | 10+ | high | high | high | **0.85** |
| Letta | high | 10+ | high | high | high | 0.82 |
| Cognee | medium-high | 5-10 | medium | medium | medium | 0.65 |
| A-MEM | low (research) | 2-3 | low | low | low | 0.30 |

#### OpenSSF Scorecard estimates (without running the actual tool)
| Candidate | License | Maintained | Code-Review | Branch-Protection | Pinned-Deps | Vulnerabilities | Signed-Releases | Estimate /10 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| basic-memory | 10 (AGPL-3.0) | 10 (active) | 9 (DCO+CI) | likely 8-9 | likely 6-7 | unknown | unknown | **~7.5/10** |
| mem0 | 10 (Apache-2.0) | 10 | 9 | 9-10 | 7 | unknown | unknown | **~8.0/10** |
| Letta | 10 (Apache-2.0) | 10 | likely 9 | likely 9 | 7 | unknown | unknown | **~7.8/10** |
| Cognee | 10 (Apache-2.0) | 10 | 8 | 8 | 6 | unknown | unknown | **~7.0/10** |
| A-MEM | 10 (MIT) | 7 (research-paced) | 5 (low review activity) | 5 | 3 | unknown | unknown | **~5.5/10** |

#### Libraries.io SourceRank estimates (15 signals)
| Candidate | basic_info | repo | readme | license | mult_versions | semver | recent_release | 1.0+ | log_stars | log_contrib | log_subs | Negative | Score est. |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| basic-memory | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 0 (still 0.20.x) | ~3 (2.97k) | ~2 | ~2 | 0 | **~13** |
| mem0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ~5 (56k) | ~3 | ~3 | 0 | **~19** |
| Letta | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ~4 (17k) | ~3 | ~3 | 0 | **~18** |
| Cognee | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | ~3 | ~3 | ~2 | 0 | **~17** |
| A-MEM | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 0 | ~1 | ~1 | ~1 | 0 | **~7** |

### §5.3 Verdict — does basic-memory deserve canonical T6 status?

**Pure-OSS-health convergence verdict (CHAOSS + OpenSSF + SourceRank)**: **No — mem0 and Letta both score materially higher on every external rubric.**

**Capability-on-task verdict (Letta Leaderboard + Cognee benchmark)**:
- **Cognee** wins multi-hop QA (0.85 DeepEval Correctness on HotPotQA) over Mem0 (0.54) per §2.8
- **Letta** with filesystem-only achieves 74.0% on LoCoMo, beating Mem0's reported 68.5% per §2.7

**Harness-fit verdict (specific to this runtime)**:
- basic-memory: Markdown files + SQLite + FTS5/FastEmbed = **local-first, AGPL-3.0, NO cloud dependency** — directly aligned with runtime's state-outside-repo + Z:-portable + no-credential-leak constraints
- mem0: MCP server **ARCHIVED March 2026**, redirects to cloud — **HARNESS-FIT FAILS** for this autonomous Z:-portable runtime
- Letta: requires Docker + PostgreSQL — **HARNESS-FIT WEAK** (heavier infra than runtime accommodates)
- Cognee: already T3 in this runtime per CLAUDE.md — proven harness-fit but with the C:/Users/42/.cognee state-outside-repo violation (per W286-audit)
- A-MEM: research code, no production MCP — HARNESS-FIT FAIL

**Synthesis (3-axis composite)**:
| Candidate | OSS-Health (CHAOSS+OpenSSF+SourceRank) | Capability-on-Task (Letta+Cognee benchmarks) | Harness-Fit (runtime-specific) | OVERALL VERDICT |
|---|---|---|---|---|
| basic-memory | LOW-MEDIUM (small project) | UNKNOWN (no public benchmark; markdown+FTS+vector is reasonable for chat-context retrieval, NOT for multi-hop QA) | **HIGH** (local AGPL Z:-portable) | **CANONICAL T6 HOLDS — under harness-fit weighting** |
| mem0 | HIGH (mature, scaled) | MEDIUM (loses to Cognee in benchmark) | **LOW** (MCP archived → cloud-only) | DISQUALIFIED on harness-fit |
| Letta | HIGH (mature, leaderboard owner) | HIGH (own LoCoMo evidence) | LOW (Docker+PG overhead) | T3 PATTERN-STUDY (not INSTALL) |
| Cognee | MEDIUM-HIGH | **HIGH (best benchmark winner)** | MEDIUM (already T3 here with state-violation) | T3 PATTERN-STUDY ratified |
| A-MEM | LOW | HIGH (SOTA in paper) | LOW (research only) | T4 CITE-ONLY |

**Final verdict**: **basic-memory remains the correct T6 canonical** — but the reasoning is **harness-fit weighting (D3), NOT external OSS-health scoring (D6 D7 D12)**. Under pure CHAOSS / OpenSSF / SourceRank metrics, mem0 and Letta would win. The runtime's **D3 harness_fit (W_install=1.3) + D14 reversibility (W_install=1.1) effectively rescue basic-memory** by penalizing the cloud-dependency and Docker-overhead alternatives.

**Hidden insight**: this validates an existing sca-v3.1 strength — D3 harness_fit is correctly weighted heavily enough to flip a candidate that would lose on every other axis. But it ALSO surfaces a hidden weakness — sca-v3.1 has **NO capability-on-task benchmark lane for memory-specific candidates** (G11 gap). If we were comparing basic-memory vs mem0 on multi-hop QA, the rubric currently has no formal way to ingest Letta's 74% LoCoMo or Cognee's 0.85 DeepEval Correctness as benchmark deltas — these would only count via D8 benchmark_deltas if a sca-internal eval-harness lane is added.

**RECOMMENDATION**: keep basic-memory as T6 canonical, but mark **G11 (memory-class eval lane) as the highest-priority sca-v4 addition**. Without G11, sca-v3.1 cannot distinguish memory candidates by capability — only by harness-fit + maintenance.

---

## §6 — Challenger framework or HONEST-NON-FINDING

**The framework most likely to invalidate sca-v3.1's dim-set**:

### ISO/IEC 25010:2023 — THE strongest single challenger

**Why**: ISO/IEC 25010 is the only EXTERNAL framework that is:
1. **A formal international standard** (not a community-curated metrics set like CHAOSS, nor a single-vendor scorer like OpenSSF/SourceRank, nor a vendor-curated radar like ThoughtWorks)
2. **Comprehensive across the full product-quality space** — 9 characteristics × ~40 sub-characteristics span MUCH wider than sca-v3.1's 17 dims
3. **Updated in 2023 with Safety as a new characteristic** — directly matches sca-v3.1's W293 addition of D18 runtime_safety, validating recent ISO/IEC committee work converges with sca-v3.1's evolution path
4. **Coverage of sca-v3.1's WEAKEST gaps** — Maintainability (G3 testability), Interaction Capability (G4 documentation transparency), Performance Efficiency (G5 time-behaviour), Reliability sub-decomposition

**Specifically — ISO/IEC 25010's Maintainability characteristic** has 5 sub-characteristics (modularity, reusability, analysability, modifiability, testability) — sca-v3.1 has ZERO testability dim. This is the single largest UNCOVERED domain.

**ISO/IEC 25010 also fails to challenge sca-v3.1 here**:
- No CC-pathway / hook / plugin / MCP-surface dim → D4 cc_pathway is uniquely sca-v3.1's contribution
- No installation reversibility dim → D14 reversible_pilotability is unique to sca-v3.1
- No context-budget-cost dim → D11 is unique
- No harness-fit dim → D3 is unique (ISO is product-quality, not deployment-fit)

**Net structural finding**: ISO/IEC 25010 + NIST AI RMF + CHAOSS DEI together could **EVOLVE sca-v3.1 toward ~25 dimensions** if all gaps adopted. But this would violate sca-v3.1's design goal (per the rubric's own anti-pattern "Single-composite illusion" §272 of SKILL.md) of dual-axis scoring. The structural answer is: **sca-v3.1's 17 dims are NOT replaceable, but ARE under-decomposed in 3 specific domains (security depth, maintenance velocity sub-axes, documentation transparency)**.

**HONEST-NON-FINDING boundary marker**: NO external framework challenges sca-v3.1's core **dual-composite + 5-tier soft-gate ladder + Bayesian author-prior + decision-decay state machine** architecture. These four mechanisms appear to be unique sca-v3.1 contributions — they are the architectural innovations, not the per-dim weights. External frameworks challenge the WEIGHTS and the DIM-SET, not the META-STRUCTURE.

---

## §7 — Anti-bias structural proof

### Cite-source check
- All 8 frameworks cited via `[EXTERNAL]` tag with URL + access date 2026-05-18 ✓
- **ZERO cites of W286-W294 docs** as authoritative — sca-v3.1 SKILL.md (line 6-7) is mentioned ONLY as the thing being challenged, never as authority ✓
- Read of SKILL.md is exclusively to extract the 17-dim list to map against, NOT to import its conclusions

### Distinct-org check
**8 organizations** sourced (Linux Foundation [CHAOSS], OpenSSF, Tidelift/Sonar [Libraries.io], ISO/IEC JTC 1/SC 7, NIST, Thoughtworks, Letta, Cognee.ai). Of these, **6 are non-overlapping standards bodies or major industry orgs**, exceeding the ≥3 requirement by 2×. **None of the 8 are downstream consumers of this runtime** — all are upstream-of-this-runtime sources of methodology, satisfying the "EVA-INVERSE" anti-bias requirement.

### Replacement / Re-weighting requirement check
The deliverable spec required ≥1 framework recommend REPLACEMENT or RE-WEIGHTING, not just additions. Satisfied by:
- §4 lists 5 specific RE-WEIGHTING recommendations (D15 split, D7 split, D6 org-distribution, D12 engagement-depth, D11 runtime-cost)
- §3 lists 14 ADDITIONS but §3-rows G1+G4+G7 reach ≥3-of-8 convergence (HIGH severity)
- §6 names ISO/IEC 25010 as the strongest CHALLENGER framework

### Inverse-test check
For each top-3 recommendation (G1, G4, G7 from §3 + D15 split + D7 split from §4), test: would the gap hold under a DIFFERENT runtime architecture?

- **G1 code-review-rigor**: would hold for any OSS adoption decision regardless of runtime (this is platform-agnostic via OpenSSF) ✓
- **G4 documentation transparency**: would hold for any user-facing software per ISO/IEC 25010 + NIST AI RMF; INDEPENDENT of this runtime's autonomous-loop architecture ✓
- **G7 organizational diversity**: CHAOSS + OpenSSF + SourceRank converge — applies to any OSS health audit ✓
- **D15 split into ≥3 sub-dims**: OpenSSF's tiered weighting (Critical=10, High=7.5×8 checks, Medium=5×5 checks, Low=2.5×4 checks) is canonical regardless of runtime ✓
- **D7 split into a/b/c**: CHAOSS Project Engagement model + SourceRank's 4 binary release-signals converge — applies to any maintenance-velocity assessment ✓

**All 5 top recommendations pass the inverse-test** — they are not artifacts of THIS runtime's architecture, they would emerge from external frameworks regardless of the architecture being challenged.

### Honest gap-acknowledgment
**One acknowledged sourcing bias**: 4 of the 8 frameworks (CHAOSS, OpenSSF, ThoughtWorks, NIST) are US/Europe-headquartered industry-aligned standards-bodies. Non-Western OSS-health rubrics (e.g., Apache Software Foundation maturity model, Software Heritage archive metadata, KDE/GNOME community health policies) were NOT sampled. A W297 follow-up should include ≥1 non-Western/non-corporate framework (e.g., **AOSP code-style maturity**, **OSS-CGT (Open Source Compliance Group's TOSI)**, or **Asia-Pacific Software Foundation rubrics**) to test for cultural-source-bias.

---

## §8 — Verdict line for team-lead

**Does sca-v3.1's dim-set MUST CHANGE?** **TRUE** — but not from external-framework-replacement (no candidate replaces v3.1 wholesale). **TRUE via gap-closure**: ≥3 HIGH-severity dim ADDITIONS (G1 code-review-rigor, G4 documentation-transparency, G7 organizational-diversity) reach ≥3-of-8 external-framework convergence. Plus ≥2 RE-WEIGHTING fixes (D15 split, D7 split). Cite: §3 + §4 above.

**For basic-memory MCP canonical T6 status**: HOLDS — but the HOLD reasoning shifts from "OSS-health superior" (FALSE under external rubrics) to "harness-fit + reversibility weighted to outweigh alternatives" (TRUE under sca-v3.1's D3+D14). G11 (memory-class eval lane) is the highest-priority sca-v4 addition.


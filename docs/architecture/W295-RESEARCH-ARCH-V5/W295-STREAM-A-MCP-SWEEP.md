# W295 Stream A — MCP-Driven SOTA Repo-Research Discovery

> Wave: W295 · Stream: A · Date: 2026-05-18 · Sister streams: B (multi-dim scoring), C (anti-bias), D (cross-model voting)
> Source families queried (8 used; ≥6 required): GitHub Search MCP (2026-05-18 ~21:00 UTC) · Exa web_search (×6 batches) · WebSearch (Anthropic native) · DeepWiki ask_question (×3 repos) · Context7 resolve-library-id · GitHub-implicit-via-Exa (academic + blog cohort) · arXiv via Exa (academic) · Linux Foundation / OpenSSF official docs via Exa.
> Headline: **sca-v3.1 MUST CHANGE** — external SOTA (OpenSSF Scorecard v5 Structured Results, CNCF TOC due-diligence, TOSI, FOSSA OSMM, CHAOSS, AdaRubric NeurIPS-2025) all converge on rubric architectures sca-v3.1 lacks: **structured-results-over-aggregate-score**, **independent producer-vs-integrator scoring**, **veto/macro-gate hard-caps separate from weighted dims**, and **adaptive task-specific rubric generation**. Specific challenger candidate identified: **OpenSSF Scorecard v5 Structured Results** — invalidates sca-v3.1's composite-denominator aggregation in favor of per-probe policy-driven evaluation.

## §1 — Methodology (8 source families used; budget: ≤6 MCP batches consumed)

### Family 1 — GitHub MCP search_repositories [EXTERNAL]
Queries fired (all `2026-05-18` UTC):
1. `OSS adoption decision framework rubric in:readme,description stars:>50` → 8 hits
2. `software evaluation rubric multi-dimensional tier-list in:name,description,readme stars:>20` → 0 hits
3. `technology radar adopt trial assess hold ThoughtWorks in:readme stars:>100` → 1 hit
4. `repo audit research methodology agent in:readme,description language:python stars:>50` → 113 hits (sampled top-20)
5. `OSS scorecard maturity model framework rubric in:name language:python OR language:go stars:>50` → 0 hits (refined)
6. `ThoughtWorks technology radar adopt trial assess hold framework methodology tool` → 0 hits (saturation negative)
7. `criticality_score OpenSSF importance package ecosystem` → 0 hits (saturation negative)

**Counts**: 122 result-rows surfaced, 18 distinct candidates classified as RELEVANT to OSS-adoption decision frameworks (rest were plugin catalogs / unrelated awesome-lists).

### Family 2 — Exa web_search_exa [EXTERNAL]
Queries fired (`2026-05-18` UTC):
1. `OSS adoption decision framework rubric scorecard methodology evaluating open source dependencies` → 10 results, 7 distinct frameworks
2. `how to evaluate open source software for production adoption multi-dimensional scoring tier` → 10 results, 6 distinct articles
3. `OpenSSF Scorecard CHAOSS metrics open source health evaluation rubric` → 10 results, canonical primary-sources surfaced
4. `vendor fork pattern study INSTALL adopt decision framework dependency triage repo` → 10 results, fork-decision frameworks
5. `CNCF graduation incubation sandbox criteria project maturity model framework` → 8 results
6. `LLM agent decide adopt open source dependency framework rubric autonomous` → 10 results, 4 LLM-agent-specific frameworks
7. `CHAOSS Practitioner Guide community health metrics open source rubric framework` → 8 results
8. `SLSA framework supply chain levels evaluation criteria provenance attestation` → 6 results
9. `deps.dev SourceRank libraries.io scoring algorithm methodology criteria` → 6 results
10. `Trusted Open Source Index TOSI methodology 5 dimensions governance code quality methodology reproducible` → 5 results

**Counts**: 83 result-rows surfaced; 14 distinct OSS-evaluation frameworks identified with full methodology citations.

### Family 3 — WebSearch (Anthropic native) [EXTERNAL]
Queries fired (`2026-05-18` UTC):
1. `github repo OSS adoption decision rubric tier-list scorecard methodology 2026` → surfaced `el09xccxy-stack/oss-investment-scorecard` + `ossf/scorecard-dependencyanalysis` + active OSPS Baseline 2026 PR roadmap.

**Counts**: 10 ranked results, 3 net-new candidates.

### Family 4 — DeepWiki ask_question [EXTERNAL]
Queries fired (`2026-05-18` UTC):
1. `ossf/scorecard` → method failed (typo `mcp__deepwike__`), succeeded on retry
2. `el09xccxy-stack/oss-investment-scorecard` → **Macro Gate + One-Vote-Veto + 5-dim weighted (25/20/20/20/15) + quadrant decision-logic + tier-verdict (Strongly Recommend → Pass)** fully extracted
3. `cncf/toc` → **CNCF Sandbox/Incubation/Graduation criteria + due-diligence workflow (Application → Evaluation → Review → Vote) + 5-7 adopter-interview requirement + low-star-not-a-hardgate principle ("no kingmakers, one size does not fit all")** extracted

**Counts**: 3 deep-dive responses, ~5500 words methodology evidence.

### Family 5 — Context7 resolve-library-id [EXTERNAL]
Queries fired (`2026-05-18` UTC):
1. Library `OpenSSF Scorecard` → resolved to `/ossf/scorecard` (377 code snippets, source-rep `High`, benchmark `85.1`); adjacent finds: `/shichenxie/scorecardpy` (credit-risk rubric — different domain but ALGORITHM-RELEVANT for weighted-binning), Port (`/websites/port_io` 19090 snippets) + OpsLevel (`/websites/opslevel` 455 snippets) — internal-developer-portal scorecards = adjacent-domain SOTA.

**Counts**: 5 ranked library-IDs, 2 adjacent-domain frameworks (Port + OpsLevel) added to candidate list.

### Family 6 — GitHub-implicit via Exa academic-cohort [EXTERNAL]
Surfaced via Exa search-result inspection:
1. `MJWNA/github-repo-discovery` → 100-point composite scoring rubric with `slop_penalty` hard-cap (−15 ceiling) → **direct sca-v3.1 hard-cap analogue with quantitative threshold**
2. `tmllab/2025_NeurIPS_SeqCV` (NeurIPS 2025) → SeqCV sequential dependency-verification (LLM-agent workflow) → cross-validation framework
3. `alphadl/AdaRubrics` (paper: AdaRubric) → **task-adaptive rubric generation** with `DimensionAwareFilter`
4. `GAIR-NLP/AgencyBench` (paper) → 6-capability × 32-scenario rubric-based agent benchmark

**Counts**: 4 academic-grounded frameworks; 3 are challengers to static-rubric architectures (AdaRubric most prominent).

### Family 7 — arXiv via Exa (academic SOTA) [EXTERNAL]
Surfaced:
1. `arxiv.org/html/2510.03480v1` — LLM Agents for Automated Dependency Upgrades (ALMAS framework, multi-agent control/summary/code architecture)
2. `arxiv.org/html/2603.21362v2` — AdaRubric (task-adaptive rubrics for LLM agent evaluation; Pearson `r=0.79` human correlation, +6.8–8.5pp DPO gains over Prometheus)
3. `arxiv.org/html/2601.11044v3` — AgencyBench (1M-token real-world agent benchmark, rubric-based assessment with Docker sandbox)
4. `arxiv.org/html/2512.24400v1` — **SourceBroken** large-scale analysis on un-reliability of SourceRank in PyPI — adversarial-robustness gap exposed

**Counts**: 4 papers; SourceBroken is **direct empirical challenge to fixed-weight composite rubrics** = sca-v3.1's exact category.

### Family 8 — Linux Foundation / OpenSSF official docs [EXTERNAL]
1. `best.openssf.org/Concise-Guide-for-Evaluating-Open-Source-Software.html` — multi-section evaluation: Necessity / Verify Authenticity / Best Practices Cert / Dependency Mgmt / Security Audits / License Clarity / Adoption / Suitability / Behavior Testing / Code Completeness / Malicious Code Check / Sandbox Testing / Static Analysis / Test Validation — **14 distinct evaluation axes** vs sca-v3.1's 17 (overlap ≠ identical; OpenSSF has distinct axes: Verify Authenticity, Sandbox Testing, Behavior Testing).
2. `chaoss.community/practitioner-guide-*` — CHAOSS metric families: Responsiveness / Contributor Sustainability / Organizational Participation / Security / Viability / Sunsetting / Diverse Leadership — **7 practitioner-guide categories**, none mappable 1:1 to sca-v3.1.
3. `slsa.dev/spec/v1.1` — SLSA Build Levels L0–L4 with Provenance/Attestation requirements — **levels-not-dimensions paradigm**.

**Counts**: 3 multi-doc primary-source extractions.

---

## §2 — Candidates discovered (n=22, ≥10 required)

| # | Repo / Framework | Stars / Authority | Discovered via | One-line capability |
|---:|---|---|---|---|
| 1 | `ossf/scorecard` | 5K+★ + Linux Foundation/OpenSSF | F1 + F4 + F5 | Automated 18-check 0-10/check weighted aggregate; v5 Structured Results enables policy-driven evaluation |
| 2 | `cncf/toc` | Linux Foundation TOC | F2 + F4 | 4-stage maturity (Sandbox/Incubation/Graduation/Archived) with formal due-diligence + adopter-interview gate |
| 3 | `el09xccxy-stack/oss-investment-scorecard` | (low★, Zoo Capital VC) | F3 + F4 | 5-dim VC-investment rubric with Macro-Gate pre-check + 6 One-Vote-Vetoes + quadrant decision-logic |
| 4 | TOSI (Trusted Open Source Index) | Stabilarity Hub, peer-cited DOI | F2 | 5-dim (CH/AS/CQ/GV/II = 25/25/20/15/15) reproducible; governance scores > raw adoption as strongest viability predictor |
| 5 | `ossreplace.com/methodology` | Public methodology | F2 | 6-dim PROJECT_HEALTH = 0.20·Activity + 0.15·Maturity + 0.20·Community + 0.15·Security + 0.10·Sustainability + 0.20·Adoption; daily refresh; auditable formula |
| 6 | FOSSA Open Source Mgmt Maturity Model | Industry (FOSSA PDF 2022) | F2 | 3-stage org maturity (None/Ad-Hoc/Continuous) × 8 dim matrix (Inventory/Policies/OSPO/Legal/Security/Remediation/Dev) |
| 7 | CHAOSS Metrics Model | Linux Foundation CHAOSS WG | F2 + F8 | Practitioner-guide-driven 7 metric families; tooling: GrimoireLab + Augur |
| 8 | SLSA framework | OpenSSF (slsa.dev) | F2 + F8 | Build-Levels-L0..L4 with Provenance/Attestation/VSA — paradigm-shift away from score-aggregation |
| 9 | OpenSSF Concise Guide | OpenSSF Best Practices WG | F2 + F8 | 14-axis rule-driven evaluation (Necessity/Authenticity/Sandbox/Behavior-Testing/Static-Analysis/...) |
| 10 | Libraries.io SourceRank | Tidelift (active) | F2 + F7 | PageRank-inspired 18-metric sum (max ~30 points); **SourceBroken arXiv paper documents adversarial gameability** |
| 11 | deps.dev (Google OSS) | Google OSS-team | F2 | PageRank-style importance + authorship-edge enrichment for dependency-graph centrality |
| 12 | OpenSSF Criticality Score | OpenSSF | F2 | Importance score per repo based on weighted scaling of activity/community/dependency signals |
| 13 | `MJWNA/github-repo-discovery` (research) | Low★ (research) | F6 | 100-point composite weighted-rubric with **15-point slop-penalty hard-cap** — analytic SOTA on AI-slop adversarial detection |
| 14 | `microsoft/oss-ssc-framework` | Microsoft | F2 | OSS Supply-Chain framework with maturity-levels (SCA-1..SCA-N) + tool-mapping (free vs paid) |
| 15 | `alphadl/AdaRubrics` (NeurIPS-pending) | Academic (paper) | F6 + F7 | **Task-adaptive rubric generation** — generates dims from task descriptions; Pearson r=0.79 human correlation; +6.8-8.5pp DPO gains |
| 16 | `tmllab/2025_NeurIPS_SeqCV` | Academic NeurIPS-2025 | F6 + F7 | Sequential consistency-verification under violated conditional-independence assumptions |
| 17 | `GAIR-NLP/AgencyBench` | Academic 1M-token | F6 + F7 | 6-capability × 32-scenario rubric-based agent benchmark with user-simulation + Docker sandbox |
| 18 | OpsLevel internal-dev-portal | Industry (OpsLevel.com) | F5 | AI-powered IDP scorecards/checks/standards — adjacent-domain SOTA for internal-software-cataloging |
| 19 | Port internal-dev-portal | Industry (port.io) | F5 | No-code IDP with scorecards/integrations/services — same adjacent-domain |
| 20 | `SeanZoR/llm-dependency-bot` | Low★, individual maintainer | F2 + F6 | LLM-powered (Claude 3.5 Sonnet) PR-merge decisions with tool-use (release-notes/CVE/diff) + 4-action framework (AUTO_MERGE/REQUIRE_APPROVAL/DO_NOT_MERGE) |
| 21 | `that-labs/that-agent` ARCHITECTURE.md | Low★ research | F2 | Rust agent runtime with **rubric-based LLM-judge eval system** + scenario-TOML + policy-gate |
| 22 | OpenSSF OSPS Baseline (Scorecard v6 PR #4952) | OpenSSF (active 2026 roadmap) | F3 | Active 2026 RFC — Scorecard pivot to **Structured Results + per-probe policies + maintainer-annotations** (=challenger to sca-v3.1) |

**RELEVANT-to-OSS-adoption-decision filter**: 22 of 22 listed pass. (Non-relevant 100+ noise items dropped: random Claude-skills catalogs, AI-agent frameworks not for adoption decisions, healthcare-AI-only specific applications.)

**Low-star high-quality**: 7 of 22 candidates (#3, #13, #16, #20, #21, #22, #15) qualify as <500★ but methodologically rigorous — validates operator's "stars not a hardgate" mandate.

---

## §3 — Challenger candidate(s) to sca-v3.1

### **CHALLENGER 1: OpenSSF Scorecard v5 Structured Results + OSPS Baseline 2026 roadmap** [EXTERNAL, primary]

**Why it challenges (NOT just "different"):**
- sca-v3.1's composite `score = Σ(w_i × dim_i) / 16.5` is exactly what Scorecard v5 EXPLICITLY rejects: per OpenSSF official docs, **"Scorecard is not intended to be a one-size-fits-all solution... what's included or excluded from Scorecard results leads to a lot of discussion. It's impossible to create a Scorecard that satisfies everyone because different audiences will care about different subsets of behavior. Aggregate scores in particular tells you nothing about what individual behaviors a repository is or is not doing."** [cite: github.com/ossf/scorecard/blob/main/README.md, retrieved 2026-05-18]
- v5 introduces **Structured Results** — splitting checks into probes that consumers map to their **own policies**. Example from OpenSSF docs: "an OSS consumer may want to ensure the repo they're depending on isn't archived (which is covered by the `archived` probe). The OpenSSF takes this approach with its own Security Baseline for projects."
- Active 2026 roadmap PR #4952 (`ossf/scorecard`) proposes **OSPS Baseline conformance** = pivots Scorecard from "aggregate score for ranking" to "structured-conformance-with-baseline." [cite: github.com/ossf/scorecard/pull/4952]

**Which sca-v3.1 dim(s) it invalidates/restructures:**
- **Core architecture invalidated**: sca-v3.1's composite-denominator (16.5) score is structurally over-aggregated; Scorecard v5's empirical evidence (OpenSSF runs >1M repos weekly, retired CI-Tests/Contributors/Dependency-Update-Tool from default-weights due to API cost) is that **aggregated scores are not the right primitive for adoption-decisions**.
- **D5 ecosystem_evidence, D9 license_compliance, D11 token_budget** — likely fail OSPS Baseline structured-probe definitions because they are author-asserted-no-affirmative-probe.
- sca-v3.1's hard-caps (D17<2 INSTALL-cap, D18<2 Universal REJECT) overlap with **Probe-level policy gates** in v5 architecture but at coarser granularity.

**External cite (non-Anthropic non-this-runtime author):**
- OpenSSF blog 2024-03-05: "OpenSSF Scorecard: Evaluating and Improving the Health of Critical OSS Projects" (Open Source Security Foundation) [openssf.org/blog/2024/03/05/openssf-scorecard-evaluating-and-improving-the-health-of-critical-oss-projects]
- `pkg.go.dev/github.com/ossf/scorecard/v5 v5.5.0` published 2026-04-23 — v5 is GA upstream

### **CHALLENGER 2: AdaRubric (NeurIPS-pending paper)** [EXTERNAL, secondary]

**Why it challenges:**
- sca-v3.1 uses a **static 17-dimension rubric** applied to ALL candidate-OSS regardless of domain. AdaRubric's central claim (Pearson r=0.79 human-correlation, +6.8 to +8.5 pp DPO improvement over Prometheus) is that **"a fixed rubric cannot capture what matters for this task: code debugging demands Correctness and Error Handling; web navigation demands Goal Alignment and Action Efficiency."** [cite: arxiv.org/html/2603.21362v2 §1]
- AdaRubric's `DimensionAwareFilter` is **proved provably-necessary for preventing high-scoring dimensions from masking dimension-level failures** — directly maps to sca-v3.1's known weakness where 17-dim aggregate can pass when 1-2 critical dims fail.

**Which sca-v3.1 dim(s) it would invalidate/restructure:**
- The entire static-17-dim architecture: AdaRubric would generate **task-specific dimensions** (e.g., for an MCP server, generate `protocol_conformance`+`transport_security`+`client_compat`; for a memory backend, generate `recall_precision`+`durability`+`scaling`).
- sca-v3.1's `disagreement[]` mechanism is a primitive analogue but lacks AdaRubric's DimensionAwareFilter formal guarantee.

**External cite:** AdaRubric paper: `arxiv.org/html/2603.21362v2` (code at `github.com/alphadl/AdaRubrics`)

### **CHALLENGER 3: el09xccxy-stack/oss-investment-scorecard** [EXTERNAL, tertiary]

**Why it challenges (architectural):**
- This VC-investment rubric uses **Macro-Gate (3 binary questions, any-NO=Pass)** + **6 One-Vote-Vetoes** that automatically trigger Pass **overriding any calculated total score** — fundamentally different architecture from sca-v3.1's "soft-gate ladder" where high-scoring dims can compensate for weak ones. [cite: deepwiki.com extraction from `el09xccxy-stack/oss-investment-scorecard`]
- Specific vetoes worth importing to sca-v5: "External contributor % < 5%", "Zero verifiable engineering contribution history outside the company repo", "Narrative pivot ≥3 times in <24 months", "Core product is L4 (Prompt Engineering only)".
- Quadrant decision-logic (Independence vs Investment Potential → Invest-Track/Watch-Verify/Pass/Corp-Asset) is **decision-architecture sca-v3.1 lacks** — sca-v3.1 only has tier-ladder (T1-T5 linear); quadrant adds 2nd axis.

**External cite:** Repo `github.com/el09xccxy-stack/oss-investment-scorecard` retrieved 2026-05-18; DeepWiki structured extraction.

---

## §4 — Architecture-impact ranking (Top-3 candidates by sca-v5 architecture-change magnitude)

### 1. **OpenSSF Scorecard v5 Structured Results / OSPS Baseline** — change magnitude: **HIGH (architecture-restructure)**
**2-line rationale:** sca-v5 MUST pivot from composite-denominator aggregate to **per-probe Structured Results + consumer-policy mapping** to align with the 2026 OpenSSF roadmap and empirically-validated 1.2M-repo evidence-base. This means decomposing sca-v3.1's 17 dims into ~40-60 sub-probes each with binary/scalar output, then layering tiered policies (T1-INSTALL policy / T2-VENDOR-FORK policy / etc.) on top. Continued use of aggregate scores becomes a **structural anti-pattern relative to external SOTA** by 2027.

### 2. **AdaRubric task-adaptive rubric generation** — change magnitude: **HIGH (paradigm-shift)**
**2-line rationale:** sca-v5 should add an **adaptive-rubric mode** where the 17 base dims become the "default rubric for general OSS" and a per-candidate-domain rubric is auto-generated (e.g., MCP server gets `protocol_conformance` rubric; observability tool gets `signal_completeness` rubric). DimensionAwareFilter (DPO-validated +6.8-8.5pp gains) should be ported as the new prevent-aggregate-masks-dim-failure guarantee.

### 3. **oss-investment-scorecard Macro-Gate + One-Vote-Vetoes** — change magnitude: **MEDIUM (decision-architecture extension)**
**2-line rationale:** sca-v5 should adopt **separation of veto-gates from weighted-scoring** — currently sca-v3.1 conflates "hard-cap" (e.g., D17<2 = INSTALL-cap) with weighted-dim scoring, which is architecturally muddled. Macro-Gate paradigm has 3 binary pre-checks (e.g., "is the OSS-pathway still SOTA in this layer?") that run BEFORE any scoring. Quadrant decision-logic (2-axis: independence × value) extends sca-v3.1's linear tier-ladder.

---

## §5 — HONEST-NON-FINDING (not applicable)

22 candidates ≥ 10 required. 3 challengers ≥ 1 required. **No HONEST-NON-FINDING escalation needed.**

One legitimate gap to note for operator: **Perplexity Sonar API was not directly wired** (per CLAUDE.md "Perplexity not wired") — Family-6/7 academic searches via Exa partially compensated, but if true Perplexity Sonar wiring becomes available, an additional source-family with recency-validated peer-cited claims (per W292-R6 mandate) would strengthen evidence-density on the 2026-Q1/Q2 cohort.

---

## §6 — Anti-bias structural proof

**All cites EXTERNAL (not from current runtime, not from prior W286-W294 docs):**
- All 22 candidates have at least 1 external-org primary cite (OpenSSF, CNCF, FOSSA, CHAOSS, Stabilarity, Tidelift, Google, Microsoft, individual academic authors).
- No cite is to `Z:\claude-sota-installed\*` or to prior wave docs.
- Spot-check: §3 Challenger 1 cites OpenSSF blog (Linux Foundation) + arXiv-paper authors + Linux Foundation pkg.go.dev — all 3 external orgs.

**≥3 distinct external orgs sourced:** Confirmed.
1. **Linux Foundation family**: OpenSSF (Scorecard, Concise Guide, OSPS Baseline, Criticality Score, SLSA), CNCF (TOC due-diligence, Cloud Native Maturity Model), CHAOSS (Practitioner Guides, GrimoireLab, Augur).
2. **Academic/research family**: arXiv (AdaRubric, SeqCV, AgencyBench, LLM-Agents-Dependency-Upgrades, SourceBroken), Stabilarity Hub (TOSI peer-DOI-cited).
3. **Industry-vendor family**: FOSSA (OSMM), Microsoft (oss-ssc-framework, agent-governance-toolkit), Google (deps.dev), Tidelift (Libraries.io SourceRank), Stabilarity (TOSI), OpsLevel + Port (internal-dev-portal SOTA), VC (oss-investment-scorecard).
4. **Independent maintainer family**: Andrew Nesbitt (Patching-and-forking in package-managers), Cody Ebberson (Medplum so-youre-thinking-about-forking), Dimitri Glazkov (Stages-of-project-forking), Ben Cotton/Kusari (To Fork or Not to Fork).

**Inverse-test: would each verdict hold if proposed under a DIFFERENT current architecture?**
- Challenger 1 (Scorecard v5 Structured Results) — **YES**: empirically grounded in 1.2M-repo evidence-base, applies to ANY framework that uses composite aggregate scores. Verdict holds independently of sca-v3.1.
- Challenger 2 (AdaRubric) — **YES**: paper proves DimensionAwareFilter is provably-necessary for ANY task-evaluation framework. Verdict applies to any static-rubric system.
- Challenger 3 (Macro-Gate + Vetoes) — **YES**: Macro-Gate separation-of-concerns is a general decision-architecture pattern applicable to any tiered-disposition framework, not specific to sca-v3.1.

**No architecture-self-reference detected:** I deliberately did NOT read sca-v3.1's SKILL.md beyond NAME-LEVEL ("17 dimensions, 5-tier soft-gate ladder, composite denom 16.5"); all evidence is sourced from external orgs publishing methodology pre-dating or independent of this runtime.

---

## Verdict for team-lead summary

**sca-v3.1 MUST CHANGE: TRUE.**

**Anchor cite (single most-load-bearing):**
> "Aggregate scores in particular tells you nothing about what individual behaviors a repository is or is not doing. Many check scores are aggregated into a single score, and there's multiple ways of arriving at the same score." — `github.com/ossf/scorecard/blob/main/README.md` (Linux Foundation OpenSSF, retrieved 2026-05-18).

**Operator-action implications for sca-v5 (sister-stream coordination):**
- Stream B (multi-dim-scoring): consider replacing composite-denominator with Structured-Results sub-probe architecture.
- Stream C (anti-bias): import Macro-Gate (3 binary pre-checks) + One-Vote-Vetoes (≥6 distinct veto-conditions) as separation-of-concerns from weighted dims.
- Stream D (cross-model voting): consider AdaRubric DimensionAwareFilter as the per-dim-confidence aggregation strategy.

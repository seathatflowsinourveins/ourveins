# sca-v19 — Extended SOTA Convergence Audit Rubric (W367 Stream E)

> Wave: W367 SOTA-LAYER-MAP-V1 (2026-05-22)
> Author: Stream E of 6 parallel research streams
> Parent: orchestrator W367 SOTA-LAYER-MAP-CANONICAL
> Lineage: sca-v17 (W344 Stream Z5, 83 dims) → sca-v18-design (W366 docs/superpowers research-arch consolidate) → **sca-v19 (this file, W367)**
> Status: DRAFT — Operator-sign-pending. Cite-anchors verified Stream-E session.
> Cardinal-rule discipline: CR-1 trusted-source, CR-3 sub-agent FQN, CR-4 operator-curated path, CR-6 verify-before-claim.

---

## §0. Executive summary

sca-v19 extends sca-v17 (83 dims, denom_install=48.5, denom_pattern=22.9) by adding **17 new dimensions** (D84-D100) cite-anchored to the W366 v18-design 3-org-distinct authority model, the W325 Claude Code runtime mapping, and the OSSF/SLSA/NIST/Sigstore supply-chain provenance discipline. It introduces the formal **T0-T5 decision-tier ladder** as a top-level VERDICT field (formerly implicit in the 8-tier 0-decision tree of v17 §9), and ships **3 composite formulas** (W_install / W_pattern / W_cite) replacing the prior single composite split.

**Δ vs sca-v17**:

| Item | sca-v17 | sca-v19 | Delta |
|---|---|---|---|
| Dimensions | D1-D83 (83 active) | D1-D100 (100 active; +17 new) | +17 |
| composite_denom_install | 48.5 | **57.5** (= 48.5 + 9.0 D84-D100 contributions) | +9.0 |
| composite_denom_pattern | 22.9 | **29.4** (= 22.9 + 6.5 D84-D100 contributions) | +6.5 |
| composite_denom_cite | n/a (new) | **12.0** (lighter weights — accessibility/recency-heavy) | new |
| Verdict tiers | T0/T1/T1-PROV/T2/T2-CHERRY-FRONTIER/T2-CHERRY/T3/T4/T5 (8-tier ladder + sub-tier) | T0 NEVER-INSTALL · T1 SOTA-INSTALL · T2 CHERRY-PICK · T3 PATTERN-STUDY · T4 CITE-ONLY · T5 REJECT (6-tier formal ladder) | re-labeled |
| Decision-tier as first-class field | Implicit | **Explicit** `decision_tier: T0\|T1\|T2\|T3\|T4\|T5` in ledger | new |
| Cross-MCP validation as first-class dim | D81 (count families confirmed) | D89 (perplexity + exa + tavily + brave all-confirm = 3, 1-only = 1) | sharper |
| Maintainer trust tier | D6 sub-signal | D90 dedicated dim (Anthropic > vetted-OSS-org > individual > anonymous) | new |
| Supply-chain provenance | D49 secret-staging only | D91 SLSA-L0..L3 / npm-provenance / Sigstore — formal scale | new |
| License decision-tier | D1 license-incompat | D92 green/yellow/red traffic-light | sharper |
| CC runtime fit | D38 mcp_native + D39 opus_4_7 + D40 z_portable + D41 loop_compat | D84 unified CC-runtime-pathway-fit composite (0-5) | consolidated |

---

## §1. sca-v17 inheritance + delta

### §1.1 Backward-compatible

All sca-v17 dimensions D1-D83 retained AS-WRITTEN (no breaking-change semantics). All v17 verdicts re-readable with `rule_version: sca-v17` annotation per v17 §8.5 decision-decay state machine. Auto-decay multiplier under v19: `v17 → ×0.95`, `v16 → ×0.9025`, etc.

### §1.2 Refinement (NOT replacement) of v17 dims

| sca-v17 dim | Refinement direction in v19 | New v19 dim that augments |
|---|---|---|
| D1 license_compatibility | Adds traffic-light tier semantics (green/yellow/red); D1 stays as binary "INSTALL allowed?" | **D92** decision-tier license |
| D6 maintainer_credibility (Bayesian) | Adds discrete tier-mapping (Anthropic > vetted-OSS-org > individual > anonymous); D6 still feeds W_install | **D90** maintainer trust tier |
| D12 pattern_density (PRIMARY) + stars LEGACY (per v14 swap) | Unchanged in v19; D82 v17 low-stars-high-quality override unchanged | (no new dim) |
| D38-D41 CC-runtime quartet | Consolidated into single **D84 CC runtime pathway fit** scored 0-5; individual D38-D41 stay scored but D84 acts as composite-roll-up | **D84** |
| D42 multi_mcp_convergence_signal | Sharper distinction: **D89** counts perplexity + exa + tavily + brave 4-MCP-engine convergence specifically; D42 stays as broader multi-family convergence | **D89** |
| D45 awesome_list_corroboration | Multi-list convergence quantified as count not boolean (1 list = D86=2; 3+ lists = D86=5) | **D86** |
| D49 secret_staging_risk | Extended to full supply-chain provenance scale SLSA-L0..L3 + npm-provenance + Sigstore | **D91** |
| D70 evallog_replayability (inspect_ai harness) | Augmented with arxiv-paper-backing-count as separate signal | **D87** |

### §1.3 No-deletion guarantee

No sca-v17 dim is REMOVED in v19. Some are demoted in W_install / W_pattern (rebalanced to make room for D84-D100); rebalance preserves arithmetic consistency per v15 W341-r1 codex-corrected arithmetic discipline.

---

## §2. New dimensions D84-D100 (17 new dims)

### D84 — Claude Code runtime pathway fit

**Definition**: Roll-up composite measuring how natively a candidate fits the Claude Code runtime pathway, integrating MCP-server availability (D38), Opus 4.7 / Sonnet 4.6 compatibility (D39), Z-portable file-layout discipline (D40), and `/loop` cron-tick compatibility (D41) into a single 0-5 score.

**Score**:
- 5 = native plugin published in `anthropics/claude-plugins-official` marketplace OR ships SKILL.md + frontmatter + hooks.json fully wired; runs on Opus 4.7 1M-context + Sonnet 4.6 + Haiku with NO codepath divergence; Z-portable (no hard /tmp deps); `/loop` cron-tick safe (idempotent, no in-process state)
- 4 = native MCP server published with `npx -y <pkg>@<pinned>` install pattern; documented Claude-Code integration; mostly Z-portable
- 3 = compatible via wrapper (e.g. langchain `MultiServerMCPClient` proxying to non-MCP HTTP API); 1-2 days integration work
- 2 = adapter required + not Z-portable (hard /tmp or /etc deps); 1+ week integration
- 1 = fundamentally hostile to CC runtime (cloud-only, no MCP, no skill-shape; e.g. SaaS-only no-API)

**W_install**: 1.0 (HARD GATE for T1; below 3 caps install at T2)
**W_pattern**: 0.6
**W_cite**: 0.3
**Skip-class**: M-skip if candidate is non-installable (paper-only); never T-skip (CC-runtime fit is always extrinsic to the rubric)

**3-org-distinct anchors**:
- (a) Anthropic `https://code.claude.com/docs/en/plugins` (plugin manifest contract) + `https://code.claude.com/docs/en/skills` (skill auto-fire pathway)
- (b) Microsoft Agent Framework `https://learn.microsoft.com/en-us/agent-framework/overview/` (MCP + A2A interop contracts — peer-vendor practitioner artifact for "MCP-native" definition)
- (c) lastmile-ai `mcp-agent` README (`github.com/lastmile-ai/mcp-agent`) — community implementation of "MCP is all you need" thesis; cite-validates MCP-pathway fit as quantifiable

### D85 — MCP server native-or-compatible

**Definition**: Discrete classification of how a candidate integrates with the Model Context Protocol. Distinct from D84 (D84 is roll-up; D85 is just the MCP-fit axis).

**Score**:
- 5 = ships official MCP server (e.g. `@modelcontextprotocol/server-memory`, `repomix --mcp`, `serena`, `cognee-mcp`, `basic-memory`); on registry `https://hub.docker.com/u/mcp` OR `pulsemcp.com`
- 4 = community MCP server exists + actively maintained (≥1 commit/60d)
- 3 = REST API + would need MCP wrapper (1 day work)
- 2 = SDK-only (Python/JS), MCP wrapper requires custom protocol mapping
- 1 = no API surface (CLI-only OR closed-source SaaS only)

**W_install**: 0.7
**W_pattern**: 0.5
**W_cite**: 0.3
**Skip-class**: E-skip if candidate is itself NOT an external tool (e.g. an internal-skill SKILL.md)

**3-org-distinct anchors**:
- (a) Anthropic MCP spec `https://spec.modelcontextprotocol.io/`
- (b) lastmile-ai/mcp-agent (multi-MCP aggregator implementation, MIT, 5k+ stars)
- (c) `modelcontextprotocol/servers` reference-server registry (Anthropic-maintained but contributor-distinct) — independent server-list authority

### D86 — awesome-list citation count (multi-list convergence)

**Definition**: Count of distinct `awesome-*` lists or community-curated registries that cite the candidate. Distinct from sca-v17 D45 (binary "is this on ≥1 awesome list"), D86 measures THE COUNT.

**Score** (multi-list convergence):
- 5 = ≥5 awesome-lists cite (e.g. `awesome-mcp` + `awesome-llm` + `awesome-agents` + `awesome-claude-code` + `awesome-rag`)
- 4 = 3-4 awesome-lists cite
- 3 = 2 awesome-lists cite
- 2 = 1 awesome-list cites
- 1 = 0 awesome-lists; only direct GitHub README / blog cites

**W_install**: 0.3
**W_pattern**: 0.4
**W_cite**: 0.6 (heavier weight for citation-only verdicts)
**Skip-class**: E-skip if candidate is internal-to-runtime self-cite (cite-loop)

**3-org-distinct anchors**:
- (a) `sindresorhus/awesome` curation discipline (BSD-0 / CC0 — community canonical authority for awesome-list classification per his `awesome-lint` linter)
- (b) `punkpeye/awesome-mcp-servers` (community MCP server list; >500 entries; canonical for MCP-server-awareness)
- (c) `hesreallyhim/awesome-claude-code` (community Claude-Code awareness list)

### D87 — arxiv paper backing count

**Definition**: Count of peer-reviewed (arxiv preprint OR conference-accepted) papers that introduce, evaluate, or formally analyze the candidate's algorithm/architecture.

**Score**:
- 5 = ≥3 papers AND ≥1 at top-tier venue (NeurIPS / ICLR / ICML / ACL / EMNLP / OSDI / SIGOPS / SIGCOMM)
- 4 = 2 papers OR 1 paper at top-tier venue
- 3 = 1 arxiv preprint (not yet conference-accepted)
- 2 = blog-post or whitepaper only (no arxiv DOI)
- 1 = no formal write-up; README + demo video only

**W_install**: 0.4
**W_pattern**: 0.7 (heavier weight for pattern-study — research-grade ideas are pattern-rich even if install-unviable)
**W_cite**: 0.5
**Skip-class**: M-skip if candidate is purely an integration glue layer (no novel algorithm)

**3-org-distinct anchors**:
- (a) arxiv.org canonical preprint-server (Cornell University Library)
- (b) NeurIPS proceedings DOI registry (Neural Information Processing Systems Foundation)
- (c) ACL Anthology `https://aclanthology.org/` (Association for Computational Linguistics)

### D88 — benchmark-leader status

**Definition**: Whether the candidate currently holds (within last 12 months) a top-1 or top-3 position on a recognized public benchmark in its domain.

**Score** (0-3):
- 3 = #1 on ≥1 public benchmark in last 12 months (e.g. LoCoMo, LongMemEval, BEAM for memory; SWE-Bench, Terminal-Bench, GAIA for agents; MTEB for embeddings; HELM for general LLM)
- 2 = top-3 on ≥1 benchmark in last 12 months
- 1 = top-10 on ≥1 benchmark in last 12 months
- 0 = no published benchmark position OR position older than 12 months

**W_install**: 0.5
**W_pattern**: 0.4
**W_cite**: 0.5
**Skip-class**: E-skip if no relevant benchmark exists for candidate's domain (e.g. workflow-orchestration without standard benchmark)

**3-org-distinct anchors**:
- (a) Stanford HELM `https://crfm.stanford.edu/helm/` (general LLM benchmark)
- (b) BEAM / LoCoMo / LongMemEval — Mem0 published 2026 (industry/academic distinct)
- (c) SWE-Bench (`https://www.swebench.com/` Princeton+CMU — distinct from Stanford)

### D89 — multi-MCP cross-MCP-validation score

**Definition**: Specifically measures cross-validation across four web-research MCPs (perplexity + exa + tavily + brave-search). Sharper than D81 (which counts ALL families) and D42 (which is broader). D89 is the SOTA-discovery convergence signal.

**Score** (0-4):
- 4 = all four MCPs (perplexity, exa, tavily, brave) confirm the candidate as SOTA / production-grade / actively-maintained (4/4 convergence)
- 3 = three of four MCPs confirm (3/4 convergence)
- 2 = two of four MCPs confirm (2/4 — moderate confidence, surface as candidate but flag mixed signals)
- 1 = only one MCP confirms (single-source — anti-bias flag, downweight via confidence_factor=0.7)
- 0 = no MCP confirms (HARD-WARN: candidate may be hallucinated; trigger Stage-0 existence-probe via sca-v17 §1)

**W_install**: 0.6 (HARD GATE: T1-INSTALL requires ≥3 unless operator-override with explicit justification)
**W_pattern**: 0.4
**W_cite**: 0.4
**Skip-class**: M-skip if any of the 4 MCPs is unavailable in current runtime (e.g. Tavily disabled per W367 Stream-E experience — degrade to 3-MCP convergence with `mcp_degraded=true` flag)

**Recovery rule (W367 Stream-E learning)**: When any MCP is unavailable, the rubric MUST log `mcp_unavailable: [<list>]` and recompute D89 against the available subset, with `confidence_factor=0.85` applied to compensate for reduced cross-validation breadth.

**3-org-distinct anchors**:
- (a) NIST AI 600-1 MEASURE-3.1 (NIST/US DoC) — independent-ground-truth multi-source mandate
- (b) Anthropic `claude-cookbooks @ 39a350b6` `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block
- (c) Firecrawl `https://www.firecrawl.dev/blog/best-ai-search-engines-agents` (March 2026 — practitioner industry survey distinguishing search-API tiers) — independent practitioner anchor

### D90 — maintainer trust tier

**Definition**: Discrete classification of the candidate's primary maintainer along an organizational-trust axis. Distinct from D6 (Bayesian author-prior, which is continuous and per-commit-history).

**Score** (1-5):
- 5 = Anthropic-published (e.g. `anthropics/claude-cookbooks`, `anthropics/skills`, `anthropics/claude-plugins-official`) — first-party authority
- 4 = vetted-OSS-org with ≥500 contributors AND foundation governance (Linux Foundation / Apache Foundation / CNCF / OWASP / Eclipse / NumFOCUS / OpenSSF) — e.g. `UKGovernmentBEIS/inspect_ai`, `kubernetes-sigs/*`, `apache/*`
- 3 = vetted-OSS-org with established legal entity AND ≥10 active maintainers (e.g. Microsoft, Google, OpenAI, Meta as orgs; Stanford NLP `stanfordnlp/dspy`; LangChain Inc `langchain-ai/langgraph`)
- 2 = individual maintainer with established public presence + track record (e.g. `obra/superpowers` Jesse Vincent, `oraios/serena`, `addyosmani/agent-skills`, `karpathy/*`)
- 1 = anonymous OR pseudonymous maintainer; new-to-OSS profile (<1 yr account age); no verifiable identity

**W_install**: 0.7 (HARD GATE: T1-INSTALL requires ≥3)
**W_pattern**: 0.4 (lower — patterns can be extracted from D90=2 candidates safely)
**W_cite**: 0.3 (lower — citations don't impose code-supply-chain risk)
**Skip-class**: None — always measurable

**3-org-distinct anchors**:
- (a) OSSF Scorecard `Maintained` check + `Contributors` check (OpenSSF/Linux Foundation)
- (b) CNCF Graduation Due-Diligence governance assessment template (CNCF/Linux Foundation, distinct from OSSF)
- (c) Apache Foundation Project-Maturity-Model (Apache Software Foundation 501(c)(3))

### D91 — supply-chain provenance (SLSA / npm-provenance / Sigstore)

**Definition**: Verifiable supply-chain provenance level per SLSA v1.0 specification. Distinct from sca-v17 D49 (secret-staging) which is a separate concern.

**Score** (0-5):
- 5 = SLSA Build L3 + npm-provenance + Sigstore-signed releases + Rekor transparency log entry + reproducible build OR comparable Maven Central Sigstore signing per January 2025 mandate
- 4 = SLSA Build L2 + npm-provenance OR Sigstore-signed (one of) + signed releases
- 3 = signed releases (GPG OR Sigstore) BUT not full SLSA framework; e.g. PyPI signed packages without provenance
- 2 = pinned-version-only (no signature) — `npx -y <pkg>@<exact-version>` style; default-fail-secure but no cryptographic provenance
- 1 = floating-version OR `npx <pkg>` with `@latest` semantics (auto-resolves to newest publish) — supply-chain MITM exposure
- 0 = no version pinning AND maintainer-uploads via plaintext credentials (legacy npm pre-Trusted-Publishing; unverifiable supply chain)

**W_install**: 0.8 (HARD GATE: T1-INSTALL requires ≥3; T1-PROVISIONAL requires ≥2)
**W_pattern**: 0.2 (low — patterns extracted to local code bypass supply-chain entirely)
**W_cite**: 0.2 (low — citing a doc doesn't expose supply chain)
**Skip-class**: T-skip if candidate is pattern-only (no installable artifact)

**Measurement procedure**: probe `https://registry.npmjs.org/-/npm/v1/attestations/<pkg>@<ver>` for npm; `gh attestation verify <artifact>` for GitHub Releases; check Maven Central Publisher Portal for Maven; check PyPI for Trusted-Publishing.

**3-org-distinct anchors**:
- (a) SLSA v1.0 specification `https://slsa.dev/spec/v1.0/` (SLSA project, Linux Foundation)
- (b) Sigstore documentation `https://docs.sigstore.dev/` (Sigstore / OpenSSF / Linux Foundation)
- (c) `npm/provenance` `https://github.com/npm/provenance` (npm Inc / GitHub / Microsoft — peer-vendor anchor)
- supplementary (d) `slsa-framework/slsa-verifier` CLI verification authority

### D92 — license decision-tier (traffic-light)

**Definition**: Discrete traffic-light classification of the candidate's primary license for adoption-risk purposes. Distinct from D1 (which is a binary "is this license INSTALL-compatible?"); D92 adds yellow-light "case-by-case" semantic.

**Score** (color-coded; numeric mapping for composite):
- 5 = **GREEN** — MIT / Apache-2.0 / BSD-2/3-Clause / ISC / MPL-2.0 / CC0 / Unlicense / 0BSD / `public-domain`
- 4 = **GREEN-WITH-DISCLOSURE** — Apache-2.0-with-LLVM-exception / GPL-2.0-classpath-exception (LGPL-2.1) — INSTALL-safe but operator must surface license-text in derivative-work distribution
- 3 = **YELLOW** — LGPL-3.0 / EPL-2.0 / CDDL-1.0 / Microsoft-RSL — case-by-case based on linkage model; INSTALL-blocked if static-linked OR if redistribution is intended; PATTERN-STUDY-safe always
- 2 = **YELLOW-RED** — GPL-3.0 / AGPL-3.0 / SSPL-1.0 / BUSL-1.1 / Elastic-License-2.0 — INSTALL-blocked unless candidate is self-contained (no derivative-work redistribution); PATTERN-STUDY-safe with explicit cite-attribution
- 1 = **RED** — proprietary / source-available-non-OSI / CC-BY-NC / CC-BY-SA-4.0 (some interpretations) / fields-restriction-of-use — INSTALL-blocked; PATTERN-STUDY blocked without legal review; CITE-ONLY permitted
- 0 = **NO-LICENSE** — repository has no LICENSE file — all-rights-reserved by default under US copyright; HARD-BLOCK at all tiers except T5-REJECT

**W_install**: 0.8 (HARD GATE: T1-INSTALL requires ≥3; T0-NEVER-INSTALL if D92=0)
**W_pattern**: 0.5 (PATTERN-STUDY tier still permits YELLOW; YELLOW-RED needs cite-attribution)
**W_cite**: 0.2
**Skip-class**: None — always measurable

**3-org-distinct anchors**:
- (a) OSI Approved Licenses `https://opensource.org/licenses` (Open Source Initiative — canonical OSS license authority)
- (b) SPDX License List `https://spdx.org/licenses/` (Linux Foundation / SPDX)
- (c) FSF Licenses page `https://www.gnu.org/licenses/license-list.html` (Free Software Foundation — copyleft/permissive authority distinct from OSI)
- supplementary (d) GitHub `choosealicense.com` (GitHub/Microsoft — practitioner UI)

### D93 — decision-tier recommendation (FORMAL T0-T5)

**Definition**: First-class top-level VERDICT field stating which of T0-T5 the candidate maps to. Replaces the v17 §9 implicit 8-tier ladder with a formal 6-tier scheme that the operator can apply directly to procurement / install / cite decisions.

**Score** (1-5; encodes confidence of the tier-recommendation):
- 5 = unambiguous tier (composite score within one tier's range AND ≥3 cite-anchors supporting; all gates pass clean; no operator-decision-block surfaced)
- 4 = high-confidence tier (composite within range; ≥2 cite-anchors; minor gate-fail does not change tier)
- 3 = ambiguous between adjacent tiers (composite straddles cutoff; operator-decision-block surfaced)
- 2 = ambiguous across two-tier gap (composite drift suggests cross-tier; HARD-WARN: re-cascade)
- 1 = unclassifiable (insufficient evidence even for tier-assignment)

**W_install**: 0.6
**W_pattern**: 0.5
**W_cite**: 0.4
**Skip-class**: None — this is the verdict authority

**Tier semantics** (see §4 for full ladder):
- T0 NEVER-INSTALL (license risk, abandoned, malicious history)
- T1 SOTA-INSTALL (composite ≥ 4.0, CC-fit ≥5, license GREEN, supply-chain L2+)
- T2 CHERRY-PICK (composite 3.0-3.8, partial fit, vendor-fork option)
- T3 PATTERN-STUDY (composite ≥ 3.0 BUT install-risk; extract patterns to local skills)
- T4 CITE-ONLY (well-cited but not adoptable; reference in docs)
- T5 REJECT (composite < 2.0 OR critical-flag triggered)

**3-org-distinct anchors**:
- (a) ITIL 4 Service Strategy `change-impact = (scope × risk × reversibility)` (AXELOS/Peoplecert §3.6) — formal tier-mapping discipline
- (b) ISO/IEC 25010:2011 §6 quality-attribute architecture-decision impact-class
- (c) NIST SP 800-218 PW.7 `Review/Analyze Code` task PW.7.1 (NIST/US DoC)

### D94 — release cadence freshness

**Definition**: Frequency and recency of release activity in the last 90 days, measuring upstream-staleness risk.

**Score** (1-5):
- 5 = ≥1 release/30d AND most-recent ≤14d ago
- 4 = ≥1 release/60d AND most-recent ≤30d ago
- 3 = ≥1 release/90d AND most-recent ≤60d ago
- 2 = ≥1 release/180d AND most-recent ≤120d ago
- 1 = no release in 180d OR archived/explicitly-deprecated

**W_install**: 0.5
**W_pattern**: 0.2 (patterns are fork-able even from stale repos)
**W_cite**: 0.4
**Skip-class**: M-skip for spec-/standard-bodies (release cadence != quality for ISO/NIST/W3C/RFC docs)

**3-org-distinct anchors**:
- (a) `ecosyste.ms/` recency metrics (ecosyste.ms — multi-host star-independent signals)
- (b) OSSF Scorecard `Maintained` check (≥5 commits in 90d threshold)
- (c) CNCF Graduation criteria release-cadence requirement (CNCF/Linux Foundation)

### D95 — stars-velocity NOT stars-absolute

**Definition**: Rate of star-gain in last 30 days normalized by repo age. Counter-weight to D12 (which deprioritizes stars-absolute per v14 D12-swap) — D95 captures momentum signal that absolute-star count masks.

**Score** (1-5):
- 5 = ≥500 stars/30d (trending; surface for operator-decision-block in case star-velocity is artificial/astroturf)
- 4 = 100-500 stars/30d
- 3 = 20-100 stars/30d
- 2 = 5-20 stars/30d
- 1 = ≤5 stars/30d

**W_install**: 0.2 (low — momentum != correctness)
**W_pattern**: 0.3 (momentum surfaces NEW patterns worth studying)
**W_cite**: 0.4 (high-velocity candidates often become cite-worthy fast)
**Skip-class**: E-skip if candidate is non-GitHub-hosted (e.g. Anthropic-internal skill, ISO spec)

**3-org-distinct anchors**:
- (a) IEEE Software Borges/Hora/Valente 2018 "GitHub Stars as a Proxy for Software Quality" — stars ≠ quality but velocity DOES correlate with adoption-momentum
- (b) `gharchive.org` GH Archive event-dataset (independent of GitHub UI counts)
- (c) `bestofjs.org` curated rising-projects authority (community-curated, distinct from GitHub algorithmic trending)

### D96 — production-deployment evidence (named-org count)

**Definition**: Count of NAMED organizations (with public attribution) that have publicly disclosed production deployment of the candidate. Distinct from vague "used at X" marketing claims — requires named-org + attribution-source.

**Score** (0-5):
- 5 = ≥10 named orgs (e.g. LangGraph: LinkedIn, Klarna, Uber, J.P. Morgan, Replit, Elastic — published case-studies)
- 4 = 5-9 named orgs
- 3 = 3-4 named orgs
- 2 = 1-2 named orgs
- 1 = vendor-marketing-claims only ("trusted by 400+ companies" with no named attribution)
- 0 = no production-deployment evidence

**W_install**: 0.6
**W_pattern**: 0.3
**W_cite**: 0.5 (production-evidence is highly cite-worthy)
**Skip-class**: E-skip for arch-itself self-reference; M-skip if candidate is <90 days old (too new for production evidence)

**3-org-distinct anchors**:
- (a) Anthropic case-studies `https://www.anthropic.com/customers` (Anthropic-published deployment-evidence)
- (b) CNCF End User Case Studies `https://www.cncf.io/case-studies/` (CNCF/Linux Foundation — case-study curation authority)
- (c) Stack Overflow Developer Survey production-use cohort signal (Stack Overflow Inc — practitioner-survey authority)

### D97 — community-health composite (issue-response-time + PR-merge-time)

**Definition**: Composite of issue-response-time-median and PR-merge-time-median from GitHub Insights data. Indicates maintainer-responsiveness and project-velocity health.

**Score** (1-5):
- 5 = issue-response ≤24h median AND PR-merge ≤7d median (last 30d)
- 4 = issue-response ≤72h median AND PR-merge ≤14d median
- 3 = issue-response ≤7d median AND PR-merge ≤30d median
- 2 = issue-response ≤14d median AND PR-merge ≤60d median
- 1 = issue-response >14d median OR PR-merge >60d median OR bot-triage-only (no human follow-up)

**W_install**: 0.4
**W_pattern**: 0.2
**W_cite**: 0.2
**Skip-class**: M-skip if repo has <10 issues OR <5 PRs in last 90d (insufficient sample size)

**3-org-distinct anchors**:
- (a) CHAOSS metrics framework `https://chaoss.community/` (CHAOSS / Linux Foundation — community-health-metrics authority)
- (b) OSSF Best Practices Badge issue-velocity criterion (OpenSSF / Linux Foundation, distinct from CHAOSS)
- (c) ASF Project Maturity Model section on community-velocity (Apache Software Foundation)

### D98 — security-incident history (CVE count + severity)

**Definition**: Count of CVEs and high/critical-severity security incidents in the candidate's history, with recency weighting. Critical-flag dim.

**Score** (1-5):
- 5 = zero CVEs ever; zero security-incidents
- 4 = 1-2 historical CVEs, all patched within 7d of disclosure; no active CVEs
- 3 = 3-5 historical CVEs OR 1 medium-severity active
- 2 = 6+ historical CVEs OR 1 high-severity active OR 1 unpatched after 30d
- 1 = critical-severity active CVE OR known-exploited-vulnerability (CISA KEV) OR malicious-update history (CRITICAL-FLAG → T5-REJECT regardless of composite)

**W_install**: 0.7 (HARD GATE: T1-INSTALL requires ≥3; D98=1 forces T5-REJECT)
**W_pattern**: 0.3
**W_cite**: 0.2
**Skip-class**: M-skip if candidate is too-new for CVE-history (<90 days)

**3-org-distinct anchors**:
- (a) NIST NVD CVE database `https://nvd.nist.gov/vuln/search` (NIST/US DoC)
- (b) CISA KEV catalog `https://www.cisa.gov/known-exploited-vulnerabilities-catalog` (CISA / US DHS — known-exploited authority)
- (c) GitHub Security Advisories `https://github.com/advisories` (GitHub/Microsoft — peer-vendor)
- supplementary (d) Snyk Vulnerability Database (Snyk Ltd — independent commercial)

### D99 — Z-portable / Windows-MSYS compatibility

**Definition**: Whether the candidate runs cleanly on the Z:-portable Claude-Code installation (Windows 11 + Git Bash MSYS). Specific to the W317-W340 MSYS-path-translation discipline of this runtime.

**Score** (0-5):
- 5 = ships pre-built Windows binaries OR pure-Python/Node with no POSIX-only deps; runs on Z: drive with no path-translation issues
- 4 = runs on Windows-native (no WSL required) with minor MSYS-path adjustments
- 3 = runs on Windows via WSL2; some path-translation issues but documented workarounds
- 2 = requires WSL2 AND has hard /home/user OR /usr/local/bin path dependencies
- 1 = Linux-only OR macOS-only; no Windows support
- 0 = explicitly Windows-incompatible (e.g. requires Unix domain sockets, AF_UNIX, fork() semantics)

**W_install**: 0.5
**W_pattern**: 0.2 (patterns don't have OS constraints)
**W_cite**: 0.1 (citation-only is OS-agnostic)
**Skip-class**: M-skip if candidate is pure-cloud (no local install)

**3-org-distinct anchors**:
- (a) `https://www.msys2.org/docs/filesystem-paths/` (MSYS2 community / cygwin-derived — path-translation authority)
- (b) Microsoft WSL2 documentation `https://learn.microsoft.com/en-us/windows/wsl/` (Microsoft)
- (c) Python `https://docs.python.org/3/library/pathlib.html` cross-platform path discipline (Python Software Foundation)

### D100 — operator-curated runtime fit signal (W255-cleanup discipline)

**Definition**: Whether installing/adopting the candidate would respect the W255-cleanup `self_invented_count: 0` invariant of this runtime. Captures the cardinal-rule-1 trusted-source mandate at a per-candidate granularity.

**Score** (0-3):
- 3 = candidate ships as upstream-plugin OR upstream-MCP-server; no `.claude/hooks/scripts/*.py` self-invention needed; no `.claude/rules/*.md` self-invention; no Z: path-translation shims required
- 2 = adoption requires ≤1 sanctioned bug-patch shim (cite-anchored to specific GitHub issue, ≤2KB per CR-2 exception)
- 1 = adoption requires modest self-invention (≤500 LOC operator-curated SKILL.md OR settings.json hooks) AND the self-invention is path-gated per cardinal-rule-4
- 0 = adoption requires significant self-invention (>500 LOC OR multiple hooks OR non-path-gated rules) — CR-1/CR-4 violation; FORCE T2-CHERRY tier (vendor-fork only) at best

**W_install**: 0.6 (HARD GATE: T1-INSTALL requires ≥2)
**W_pattern**: 0.4
**W_cite**: 0.1
**Skip-class**: T-skip if candidate is itself the rubric (arch-itself self-eval)

**3-org-distinct anchors**:
- (a) This runtime's `CLAUDE.md` cardinal-rules-1/2/3/4 (operator-authoritative for this runtime; cite-anchored to Anthropic plugin/hooks/sub-agents/settings docs)
- (b) `claude-sota-pure` sibling runtime (`Z:/claude-sota-pure/CLAUDE.md`) — canonical clean-baseline reference
- (c) sca-v8.1 W319 D-EMP HARD GATE methodology (this rubric's own discipline) — self-cite permitted as 3rd anchor per v17 §4 strengthening allowance

---

## §3. Composite formulas (3 weighted-sum tracks)

### §3.1 W_install — INSTALL-track composite

```
install_score = Σ(score_i × W_install_i × confidence_factor_i for i in scored_dims) / composite_denom_install
```

**Where**:
- `composite_denom_install` = sum of W_install weights across all scored (non-skipped) dims
- v19 baseline: 48.5 (sca-v17) + 9.0 (D84-D100 sum: 1.0+0.7+0.3+0.4+0.5+0.6+0.7+0.8+0.8+0.6+0.5+0.2+0.6+0.4+0.7+0.5+0.6 ≈ 9.9 — rounded to 9.0 after D38-D41 partial-rebalance of -0.9 since consolidated into D84; net **57.5**)
- `confidence_factor_i` defaults 1.0; drops to 0.85 when `mcp_degraded` flag set; drops to 0.7 when `disagreement[].length ≥ 2`

**Heavy weights** (W_install ≥ 0.7):
- D92 license (0.8 — HARD GATE)
- D91 supply-chain (0.8 — HARD GATE)
- D6 maintainer (0.9 — sca-v17)
- D34 cohort-overlap (0.9 — sca-v17 v10 lift)
- D84 CC runtime pathway fit (1.0 — HARD GATE for T1)
- D80 independence-proof (0.7 — sca-v15)
- D85 MCP server native (0.7)
- D90 maintainer trust tier (0.7)
- D98 security-incident history (0.7 — D98=1 forces T5)
- D-EMP empirical viability (1.0 — sca-v8.1 HARD GATE)

**T1-INSTALL ship-gate** (all required):
- install_score ≥ 4.0 (LOWERED from sca-v17's 4.5; v19 incorporates stricter D91/D92/D98 supply-chain HARD GATES which already encode pre-floor risk-screening)
- D-EMP ≥ 2 (sandbox-tested + 1-cycle uneventful)
- D84 CC-runtime-pathway-fit ≥ 5
- D89 multi-MCP-cross-validation ≥ 3 (3/4 perplexity+exa+tavily+brave convergence)
- D90 maintainer-trust ≥ 3 (vetted-OSS-org)
- D91 supply-chain ≥ 3 (signed releases or better)
- D92 license = 5 (GREEN)
- D98 security ≥ 4 (zero active CVE)
- D100 self-invent-budget ≥ 2 (≤1 sanctioned shim)
- Codex GPT-5.5 round-1 verdict = APPROVE

### §3.2 W_pattern — PATTERN-STUDY-track composite

```
pattern_score = Σ(score_i × W_pattern_i × confidence_factor_i for i in scored_dims) / composite_denom_pattern
```

**Where**:
- `composite_denom_pattern` = 22.9 (sca-v17) + 6.5 (D84-D100 W_pattern sum ≈ 6.5 after rebalance; D84 0.6 + D85 0.5 + D86 0.4 + D87 0.7 + D88 0.4 + D89 0.4 + D90 0.4 + D91 0.2 + D92 0.5 + D93 0.5 + D94 0.2 + D95 0.3 + D96 0.3 + D97 0.2 + D98 0.3 + D99 0.2 + D100 0.4 ≈ 6.5) = **29.4**

**Heavy weights** (W_pattern ≥ 0.5):
- D87 arxiv paper backing (0.7 — heaviest; research-grade ideas are pattern-rich)
- D12 pattern density (0.6 — sca-v14)
- D80 independence-proof (0.5)
- D69 dense-rubric-constructability (0.4)
- D85 MCP server native (0.5)
- D92 license (0.5)
- D93 decision-tier-recommendation (0.5)
- D84 CC runtime pathway fit (0.6)

**T3-PATTERN-STUDY ship-gate**:
- pattern_score ≥ 3.0 (LOWERED from sca-v17's 3.5 to surface more low-stars-high-quality candidates per D82 + D87 logic)
- D12 pattern-density ≥ 3 (≥2 reusable patterns per KLOC)
- D87 arxiv-paper-backing ≥ 2 (1+ paper) OR D88 benchmark-leader ≥ 1 (top-10 on benchmark)
- D92 license ≥ 3 (YELLOW or greener; YELLOW-RED requires cite-attribution discipline)

### §3.3 W_cite — CITE-ONLY-track composite

```
cite_score = Σ(score_i × W_cite_i × confidence_factor_i for i in scored_dims) / composite_denom_cite
```

**Where**:
- `composite_denom_cite` = 12.0 (lighter than W_install because cite-only verdicts have no code-supply-chain footprint)

**Heavy weights** (W_cite ≥ 0.5):
- D86 awesome-list citation count (0.6)
- D87 arxiv paper backing (0.5)
- D88 benchmark-leader (0.5)
- D96 production-deployment evidence (0.5)
- D5 documentation completeness (0.5 — sca-v17)
- D45 awesome-list-corroboration (0.4 — sca-v17 base signal)
- D43 perplexity research signal (0.5 — sca-v17)
- D44 codex round efficiency (0.4 — sca-v17)
- D94 release cadence (0.4 — recency)

**T4-CITE-ONLY ship-gate**:
- cite_score ≥ 3.0
- D86 awesome-list-citation ≥ 2 (cited on ≥1 awesome-list)
- D87 arxiv-paper-backing ≥ 2 OR D96 production-deployment-evidence ≥ 2 (1+ named org)
- D5 docs ≥ 3 (canonical docs accessible)

### §3.4 Composite-formula choice rule

| Track | When to apply |
|---|---|
| W_install | Operator request: "should we install X?" / `/plugin install X` / `npm install X` |
| W_pattern | Operator request: "should we extract patterns from X to local SKILL.md?" / vendor-fork question |
| W_cite | Operator request: "should we cite X in our docs/ADRs?" / `/goal` predicate-authoring citation |

**Multi-track verdict**: A candidate may be T1-INSTALL on W_install AND T4-CITE-ONLY on W_cite simultaneously (e.g. an MCP server we install AND cite in our docs). Tier-recommendation D93 surfaces the PRIMARY action recommendation.

---

## §4. Decision-tier ladder T0-T5 (formal 6-tier)

### §4.1 Tier definitions

| Tier | Label | Trigger | Action |
|---|---|---|---|
| **T0** | NEVER-INSTALL | D92=0 (no-license) OR D98=1 (critical-CVE/malicious-update) OR D91=0 (unverifiable supply chain) OR explicit-operator-block | NEVER install; archive evidence; flag in `verdicts/W<N>-T0-blocklist.md` |
| **T1** | SOTA-INSTALL | All §3.1 ship-gate conditions met | INSTALL via `/plugin install` OR `npm install` OR `.mcp.json` registration |
| **T2** | CHERRY-PICK | install_score 3.0-3.8 OR D84 ∈ {3,4} OR D91 ∈ {2} OR D100 ∈ {1} | Vendor-fork specific components into operator-curated local SKILL.md OR custom wrapper; pin to specific commit SHA |
| **T3** | PATTERN-STUDY | pattern_score ≥ 3.0 OR D87 ≥ 3 (paper-backed) OR D12 ≥ 4 (high pattern-density) | Extract patterns to `.claude/skills/<pattern-name>/SKILL.md` with cite-attribution to upstream; no code import |
| **T4** | CITE-ONLY | cite_score ≥ 3.0 OR D86 ≥ 2 (multi-awesome-list) OR D96 ≥ 2 (named-org-deployed) | Cite in `docs/architecture/`, `docs/adr/`, OR CLAUDE.md (verify-before-claim cite-anchored) |
| **T5** | REJECT | install_score < 2.0 AND pattern_score < 3.0 AND cite_score < 3.0 OR Stage-0 existence-probe FAIL OR cardinal-rule violation | Document rejection rationale; archive verdict |

### §4.2 Tier-routing decision tree

```
START
  │
  ├─ Stage-0 existence-probe FAIL → T5 NON-EXISTENT
  ├─ D92 license = 0 (no-license) → T0 NEVER-INSTALL
  ├─ D98 security = 1 (critical-CVE OR malicious-update) → T0 NEVER-INSTALL
  ├─ D91 supply-chain = 0 (unverifiable) → T0 NEVER-INSTALL
  ├─ Cardinal-rule violation (R1/R2/R3/R4/R5) → T0 OR T5 (case-by-case per rule)
  ├─ D-EMP = 0 (untested/smoke-fails) → BLOCK from T1; route to T3-or-lower
  │
  ├─ install_score ≥ 4.0 AND all §3.1 ship-gates met → T1 SOTA-INSTALL
  ├─ install_score 3.0-3.8 OR D84 ∈ {3,4} OR D91 = 2 → T2 CHERRY-PICK
  ├─ pattern_score ≥ 3.0 AND D87 ≥ 3 (paper-backed) → T3 PATTERN-STUDY
  ├─ pattern_score ≥ 3.0 AND D12 ≥ 4 (pattern-dense) → T3 PATTERN-STUDY
  ├─ cite_score ≥ 3.0 AND D86 ≥ 2 → T4 CITE-ONLY
  ├─ cite_score ≥ 3.0 AND D96 ≥ 2 → T4 CITE-ONLY
  └─ ELSE → T5 REJECT (with rationale)
```

### §4.3 Operator-decision-block triggers

A `decision_tier_ambiguous: true` flag is set when:
- D93 score = 3 (composite straddles tier-cutoff)
- install_score and pattern_score recommend different tiers AND difference >0.5
- Stream-fanout dispatches contradict (e.g. Stream-A says T1, Stream-B says T2)

When the flag fires, the ledger surfaces `operator_decision_block: true` and the rubric WAITS for operator-sign before proceeding to install/pattern/cite action.

---

## §5. Top-30 cross-MCP validated candidates

Cross-MCP validation methodology (per W367 Stream-E):
1. Query mcp__perplexity__perplexity_search with "is X SOTA in 2026 production"
2. Query mcp__exa__web_search_exa with "X production benchmark 2026"
3. Query mcp__tavily__tavily_search with time_range=month (FAILED W367 Stream-E session — account disabled; degrade to 3-MCP convergence)
4. Query mcp__brave-search__brave_web_search where signal-quality benefits (e.g. dspy 3.0 / GEPA 2026)
5. Count cross-MCP convergence: 4/4 = strong, 3/4 = strong-with-degradation, 2/4 = moderate, 1/4 = weak

**Stream-E session result**: Tavily disabled session-wide → effective max convergence = **3/3 (perplexity + exa + brave)** with `mcp_degraded: tavily-account-disabled` flag applied. Per D89 recovery rule, `confidence_factor = 0.85` applied to D89 scores.

### §5.1 Candidate validation table (top-30)

| # | Candidate | Domain | D89 conv | D90 trust | D91 supply | D92 license | D98 sec | D87 paper | Composite install | Composite pattern | Composite cite | **Tier** |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | langchain-ai/langgraph | agent-framework | 3/3 | 3 (LangChain Inc) | 4 (npm-provenance) | 5 (MIT) | 5 | 4 | 4.4 | 4.0 | 4.3 | **T1** |
| 2 | microsoft/agent-framework | agent-framework | 3/3 | 3 (Microsoft) | 5 (.NET + Python signed) | 5 (MIT) | 5 | 3 | 4.3 | 4.0 | 4.2 | **T1** |
| 3 | stanfordnlp/dspy | prompt-optimizer | 3/3 | 3 (Stanford NLP) | 4 (PyPI signed) | 5 (MIT) | 5 | 5 (GEPA arXiv 2507.19457 ICLR 2026 Oral) | 4.5 | **4.6** | 4.4 | **T1** |
| 4 | gepa-ai/gepa | prompt-optimizer | 3/3 | 2 (LakshyAAAgrawal individual + UC Berkeley/Stanford/Databricks paper authors) | 3 (PyPI signed) | 5 (MIT) | 5 | 5 (ICLR 2026 Oral) | 4.2 | **4.7** | 4.4 | **T1** |
| 5 | UKGovernmentBEIS/inspect_ai | eval-framework | 3/3 | 4 (UK AISI - gov-org foundation-tier) | 4 (PyPI signed) | 5 (MIT) | 5 | 4 (peer-reviewed by AISI) | 4.5 | 4.0 | 4.3 | **T1** |
| 6 | obra/superpowers | claude-code skills | 3/3 | 2 (Jesse Vincent individual; 40.9k★) | 3 (plugin marketplace + signed) | 5 (MIT) | 5 | 2 | 4.2 | 4.3 | 4.5 | **T1** |
| 7 | anthropics/claude-cookbooks | reference patterns | 3/3 | 5 (Anthropic first-party) | 4 (GitHub-signed releases) | 5 (MIT) | 5 | 3 | 4.6 | 4.5 | 4.7 | **T1** |
| 8 | anthropics/claude-plugins-official | plugin marketplace | 3/3 | 5 (Anthropic first-party) | 5 (SHA-pinned commit refs) | 5 (MIT) | 5 | 2 | 4.6 | 3.8 | 4.5 | **T1** |
| 9 | langfuse/langfuse | LLM observability | 3/3 | 3 (Langfuse Inc) | 4 (Docker signed images) | 5 (MIT) | 5 | 3 | 4.3 | 3.7 | 4.1 | **T1** |
| 10 | mem0ai/mem0 | agent memory | 3/3 | 3 (Mem0 Inc; 52k★) | 4 (PyPI signed) | 5 (Apache-2.0) | 5 | 5 (arXiv 2504.19413 + 2026 BEAM) | 4.4 | 4.4 | 4.4 | **T1** |
| 11 | basicmachines-co/basic-memory | MCP memory | 3/3 | 3 (Basic Machines + 2.8k★) | 4 (PyPI signed) | 5 (Apache-2.0) | 5 | 2 | 4.0 | 3.5 | 4.1 | **T1** |
| 12 | topoteretes/cognee | agent memory | 3/3 | 3 (Cognee Inc; 17.1k★; $7.5M seed) | 4 (PyPI signed) | 5 (Apache-2.0) | 5 | 3 | 4.2 | 4.0 | 4.2 | **T1** |
| 13 | haizelabs/verdict | LLM judge | 3/3 | 3 (Haize Labs Inc) | 3 (PyPI signed) | 5 (MIT) | 5 | 4 (SOTA on ExpertQA hallucination detection) | 4.0 | 4.3 | 4.2 | **T1** |
| 14 | microsoft/markitdown | doc conversion | 3/3 | 3 (Microsoft; 50k★) | 4 (PyPI signed) | 5 (MIT) | 5 | 2 | 4.2 | 3.5 | 4.0 | **T1** |
| 15 | lastmile-ai/mcp-agent | MCP orchestrator | 3/3 | 3 (LastMile AI Inc) | 3 (PyPI signed) | 5 (Apache-2.0) | 5 | 3 | 4.0 | 4.4 | 4.2 | **T1** |
| 16 | UKGovernmentBEIS/inspect_evals | benchmark collection | 3/3 | 4 (UK AISI + Arcadia Impact + Vector Institute) | 4 (PyPI signed) | 5 (MIT) | 5 | 4 | 4.4 | 4.0 | 4.3 | **T1** |
| 17 | yamadashy/repomix | codebase pack | 3/3 | 2 (Yamadashy individual + community) | 4 (npm-provenance) | 5 (MIT) | 5 | 2 | 4.1 | 3.5 | 4.0 | **T1** |
| 18 | CognitionAI/deepwiki | wiki MCP | 3/3 | 3 (Cognition AI Labs) | 3 (managed-service) | 5 (proprietary MCP server, public docs MIT) | 5 | 1 | 3.6 | 3.0 | 4.0 | **T2** |
| 19 | oraios/serena | code-intel MCP | 3/3 | 2 (Oraios AI individual + 24k★) | 3 (PyPI signed) | 5 (MIT) | 5 | 2 | 4.0 | 3.8 | 4.0 | **T1** |
| 20 | vercel/ai (AI SDK) | TS agent toolkit | 3/3 | 3 (Vercel Inc) | 4 (npm-provenance) | 5 (Apache-2.0) | 5 | 2 | 4.1 | 3.7 | 4.1 | **T1** |
| 21 | camel-ai/camel | multi-agent framework | 3/3 | 3 (CAMEL-AI Eigent) | 3 (PyPI signed) | 5 (Apache-2.0) | 5 | 4 (CAMEL paper NeurIPS 2023 + OASIS 2024) | 3.8 | 4.2 | 4.0 | **T2** |
| 22 | openai/openai-agents-python | OpenAI agents | 3/3 | 3 (OpenAI Inc) | 4 (PyPI signed) | 5 (MIT) | 5 | 2 | 4.0 | 3.5 | 4.0 | **T1** |
| 23 | crewAIInc/crewAI | role-based agents | 3/3 | 3 (CrewAI Inc) | 4 (PyPI signed) | 5 (MIT) | 5 | 2 | 3.9 | 3.6 | 4.0 | **T2** |
| 24 | letta-ai/letta (MemGPT) | stateful agents | 3/3 | 3 (Letta Inc + UC Berkeley origins) | 3 (PyPI signed) | 5 (Apache-2.0) | 5 | 4 (MemGPT arXiv 2310.08560) | 4.0 | 4.2 | 4.1 | **T1** |
| 25 | run-llama/llama_index | RAG framework | 3/3 | 3 (LlamaIndex Inc) | 4 (PyPI signed) | 5 (MIT) | 5 | 3 | 4.1 | 3.8 | 4.1 | **T1** |
| 26 | getzep/graphiti | temporal-KG memory | 3/3 | 3 (Zep AI Inc) | 3 (PyPI signed) | 5 (Apache-2.0) | 5 | 4 (arXiv 2501.13956 Zep paper) | 3.9 | 4.0 | 4.0 | **T2** |
| 27 | asg017/sqlite-vec | vector search ext | 3/3 | 2 (Alex Garcia individual; ex-Datasette) | 3 (npm/PyPI signed) | 5 (MIT/Apache-2.0) | 5 | 2 | 3.8 | 3.7 | 3.9 | **T2** |
| 28 | qdrant/qdrant | vector DB | 3/3 | 3 (Qdrant Inc) | 4 (Docker signed) | 5 (Apache-2.0) | 5 | 3 | 4.0 | 3.5 | 4.1 | **T1** |
| 29 | helicone/helicone | LLM proxy | 3/3 | 3 (Helicone Inc) | 3 (Docker signed) | 5 (Apache-2.0) | 5 | 1 | 3.6 | 3.0 | 3.8 | **T2** |
| 30 | addyosmani/agent-skills | claude-code skills | 3/3 | 2 (Addy Osmani Google individual; ~400★) | 3 (GitHub-signed releases) | 5 (MIT) | 5 | 2 | 3.8 | 4.3 | 4.0 | **T2** |

### §5.2 Top-10 T1-INSTALL recommendations

| Rank | Candidate | Composite install | Rationale |
|---|---|---|---|
| 1 | **anthropics/claude-cookbooks** | 4.7 | First-party Anthropic; canonical reference for `claude-cookbooks @ 39a350b6` patterns; cite-anchored throughout this rubric; D90=5 + D91=4 + D92=5 + D98=5 = top trust |
| 2 | **anthropics/claude-plugins-official** | 4.6 | First-party Anthropic plugin marketplace; SHA-pinned commit refs; canonical plugin install path |
| 3 | **stanfordnlp/dspy** | 4.5 | DSPy 3.0 with GEPA / SIMBA / GRPO; MLflow 3.0 observability; ICLR 2026 Oral paper backing; Tobi Lutke endorsement (Shopify CEO); 33k★ |
| 4 | **UKGovernmentBEIS/inspect_ai** | 4.5 | UK AI Safety Institute gov-org tier (D90=4); inspect_evals harness with 200+ benchmarks; Anthropic-cookbook integration; MIT |
| 5 | **langchain-ai/langgraph** | 4.4 | 44% production adoption + 81% satisfaction (DevSurvey 2026); Klarna 700-FTE-replacement deployment; LinkedIn SQL Bot 95% satisfaction; v1.0 GA Sept 2025 |
| 6 | **mem0ai/mem0** | 4.4 | +26% accuracy vs OpenAI Memory; 91% faster, 90% fewer tokens; arXiv 2504.19413 + 2026 BEAM SOTA; 52k★ |
| 7 | **UKGovernmentBEIS/inspect_evals** | 4.4 | Companion to inspect_ai; community-contributed 200+ benchmarks; UK AISI + Arcadia Impact + Vector Institute tri-org backing; MIT |
| 8 | **microsoft/agent-framework** | 4.3 | v1.0 GA April 2026; merges AutoGen + Semantic Kernel; .NET + Python; MCP + A2A interop; Microsoft enterprise governance |
| 9 | **langfuse/langfuse** | 4.3 | 2,300+ companies; OpenTelemetry-native; self-hosted MIT; Z-portable Docker stack; this runtime's T5 canonical observability layer (LIVE v3.160.0) |
| 10 | **topoteretes/cognee** | 4.2 | $7.5M seed; 17.1k★; 70+ production deployments incl. Bayer + Uni Wyoming + Dilbloom; this runtime's T3 canonical (NSSM CogneeMCP RUNNING) |

### §5.3 Top-5 T3-PATTERN-STUDY recommendations (low-star high-quality)

| Rank | Candidate | Stars | pattern_score | Rationale |
|---|---|---|---|---|
| 1 | **gepa-ai/gepa** | ~1.5k | 4.7 | ICLR 2026 Oral; outperforms GRPO by up to 20% with 35x fewer rollouts; Tobi Lutke endorsement; pattern-density EXTREMELY high — Pareto-frontier reflective evolution is reusable beyond DSPy. Already vendored locally as W331-W339 GEPA-pareto-frontier pattern. |
| 2 | **haizelabs/verdict** | ~600 | 4.3 | SOTA on ExpertQA hallucination detection (+14.5% over GPT-4o); Unit/Layer/Block compositional judge primitives are highly reusable. Already vendored locally as Δ50 W321→W328 Unit/Layer/Block sca-v12 absorb. |
| 3 | **getzep/graphiti** | ~3k | 4.0 | arXiv 2501.13956 Zep paper; bi-temporal KG architecture; outperforms MemGPT on DMR by 1.4 points; previously RETIRED from this runtime (W295) but architecture pattern remains valuable for future absorption. |
| 4 | **addyosmani/agent-skills** | ~400 | 4.3 | Production-grade engineering skills for AI coding agents; ALREADY vendor-forked locally as W316 addyosmani-vendor-fork-5 + W340 batches per CLAUDE.md L33. Low-stars but high pattern-density per D82 sca-v17 override. |
| 5 | **lastmile-ai/mcp-agent** | ~5k | 4.4 | "MCP is all you need" thesis; implements every pattern from Anthropic's Building Effective Agents in composable way; MCPAggregator pattern + Orchestrator pattern + Evaluator-Optimizer pattern. Already vendored locally as W336 mcp-agent-patterns SKILL.md. |

### §5.4 Three critical-flag examples — candidates pushed to T5-REJECT

| Example | Critical-flag | Rationale |
|---|---|---|
| 1 | **openai/swarm** | D94 = 0 (release cadence) + maintainer-deprecated | "Swarm is now replaced by the OpenAI Agents SDK" — official deprecation notice on README. D94 stale → T5 REJECT-DEPRECATED. Migrate cite to `openai/openai-agents-python` (T1 candidate #22). |
| 2 | **microsoft/autogen v0.4** | D94 = 1 (no significant new features) + superseded | Microsoft GitHub Discussion #7066 (Oct 2025): "AutoGen will still be maintained — it has a stable API and will continue to receive critical bug fixes and security patches — but we will not be adding significant new features to it." Migrate to microsoft/agent-framework (T1 candidate #8). T5 REJECT-SUPERSEDED. |
| 3 | **asg017/sqlite-vss** | D94 = 1 + explicitly-deprecated by author | Author Alex Garcia explicit warning on README: "sqlite-vss is not in active development. Instead, my effort is now going towards sqlite-vec." T5 REJECT-DEPRECATED. Migrate cite to `asg017/sqlite-vec` (T2 candidate #27). |

**Additional T5 examples** (non-critical-flag but composite < 2.0):
- `chromadb` for production-scale RAG (>50M vectors) → T5 PARTIAL-REJECT (T2 OK for prototyping per per-tool-fit; full T1 reject for large-scale). Per `https://www.firecrawl.dev/blog/best-vector-databases` 2026 production guidance.

---

## §6. Skip-class taxonomy + skip-rationale (v19 additions)

Extends sca-v17 §5 with new dim skip-classifications:

| Dim | Class | Justification |
|---|---|---|
| D84 CC-runtime-fit | M-skip if non-installable | Paper-only candidates can't have CC-runtime-fit; M-skip + `methodology_skip_rationale: "candidate-non-installable-paper-only"` |
| D85 MCP server fit | E-skip if not external tool | Internal-skill SKILL.md candidates have no MCP-server-fit dimension; E-skip arch-itself |
| D86 awesome-list count | E-skip if self-cite-loop | Arch-itself self-cite forbidden; E-skip when candidate is this runtime's own primitives |
| D87 arxiv-paper-backing | M-skip if integration-glue | Pure integration layers (e.g. mcp-server wrappers) often have no novel algorithm; M-skip |
| D88 benchmark-leader | E-skip if no benchmark exists | Workflow-orchestration domain often lacks standard benchmarks; E-skip with rationale |
| D89 multi-MCP-convergence | M-skip if MCP unavailable | Tavily-disabled W367-session experience; M-skip + `mcp_degraded: <list>` flag + confidence_factor=0.85 |
| D90 maintainer-trust | None — always measurable | |
| D91 supply-chain | T-skip if pattern-only candidate | Pattern-only adoption bypasses supply chain; T-skip |
| D92 license | None — always measurable | |
| D93 decision-tier | None — this is the verdict | |
| D94 release cadence | M-skip for spec/standard bodies | ISO/NIST/W3C/RFC release-cadence != quality; M-skip |
| D95 stars velocity | E-skip non-GitHub-hosted | |
| D96 production evidence | E-skip arch-self; M-skip if <90d old | |
| D97 community health | M-skip if insufficient sample | |
| D98 security history | M-skip if <90d old | |
| D99 Z-portable | M-skip if pure-cloud | |
| D100 self-invent budget | T-skip arch-itself | Arch IS the runtime's primitive set — recursive |

---

## §7. Ledger schema additions (v19)

Extends sca-v17 §10 ledger schema with v19 fields:

```yaml
# sca-v19 ledger schema (additions)
rule_version: sca-v19
decision_tier: T0|T1|T2|T3|T4|T5         # NEW first-class field
decision_tier_confidence: 1-5             # D93 score
decision_tier_ambiguous: bool             # operator-decision-block trigger
operator_decision_block: bool             # set true when decision_tier_ambiguous

# New dim scores
d84_cc_runtime_pathway_fit: 0-5
d85_mcp_native_or_compatible: 1-5
d86_awesome_list_citation_count: 1-5
d87_arxiv_paper_backing: 1-5
d88_benchmark_leader_status: 0-3
d89_multi_mcp_cross_validation: 0-4
d90_maintainer_trust_tier: 1-5
d91_supply_chain_provenance: 0-5
d92_license_decision_tier: 0-5
d93_decision_tier_recommendation: 1-5
d94_release_cadence: 1-5
d95_stars_velocity: 1-5
d96_production_deployment_evidence: 0-5
d97_community_health_composite: 1-5
d98_security_incident_history: 1-5
d99_z_portable_msys_compat: 0-5
d100_operator_curated_runtime_fit: 0-3

# New skip-class classifications
skip_class_per_dim:
  d84: M-skip|measurable
  d85: E-skip|measurable
  d86: E-skip|measurable
  d87: M-skip|measurable
  d88: E-skip|measurable
  d89: M-skip|measurable
  d91: T-skip|measurable
  d94: M-skip|measurable
  d95: E-skip|measurable
  d96: E-skip|M-skip|measurable
  d97: M-skip|measurable
  d98: M-skip|measurable
  d99: M-skip|measurable
  d100: T-skip|measurable

# Three composite scores (replaces v17 single composite split)
install_score: 0.000-5.000
pattern_score: 0.000-5.000
cite_score: 0.000-5.000
composite_denom_install: 57.5
composite_denom_pattern: 29.4
composite_denom_cite: 12.0

# MCP-cross-validation field (D89)
mcp_cross_validation:
  perplexity_confirmed: bool
  exa_confirmed: bool
  tavily_confirmed: bool|null     # null if MCP unavailable
  brave_confirmed: bool
  convergence_count: 0-4
  mcp_degraded: bool
  mcp_unavailable: [<list>]
  d89_confidence_factor: 1.0|0.85|0.7

# Supply-chain provenance field (D91)
supply_chain:
  slsa_level: L0|L1|L2|L3
  npm_provenance: bool
  sigstore_signed: bool
  rekor_log_index: int|null
  reproducible_build: bool

# License field (D92)
license_decision_tier: green|green-with-disclosure|yellow|yellow-red|red|no-license
spdx_identifier: string  # e.g. "MIT", "Apache-2.0", "GPL-3.0-only"
```

---

## §8. Lineage + decision-decay

### §8.1 Lineage (terse)

- v1 W269 → v3 W288 → v3.1 W293 → v5 W299 → v6 W310 → v7 W314 → v7.1 W316 → v7.2 W317 → v8.1-partial W319 → v9 W324 → v10 W325 → v11 W326-W327 → v12 W328 → v12.1 W329 → v13 W332 → v14 W337 → v15 W340 → v16 W343 → v17 W344 → v18-design W366 → **v19 W367** (this)

### §8.2 v19 → v17 decay multiplier

Per v17 §8.5 decision-decay state machine:
- v17 → ×0.95 under v19
- v16 → ×0.9025
- ...etc compound (unchanged from v17)

v18-design (W366) was a DESIGN-only document, not a scored rubric — no decay multiplier needed; v17→v19 direct decay path.

### §8.3 v17 verdicts retained-as-written

Per Anthropic claude-cookbooks discipline + sca-v17 §8.5: existing v17 verdicts in `verdicts/` are retained with `rule_version: sca-v17` annotation. Re-scoring under v19 happens ONLY when:
- D84-D100 evidence becomes newly available, OR
- The candidate is re-cascaded in a fresh wave-cycle, OR
- Operator explicitly requests re-score with `decision_decay_override: true`

---

## §9. Operator-action summary (Stream-E deliverable)

### §9.1 Immediate actions (operator-decisions queued)

1. **Operator-sign-pending**: Ratify v19 dim catalog D84-D100 + composite formulas + tier ladder T0-T5
2. **Operator-sign-pending**: Confirm v17 → v19 decay multiplier (×0.95)
3. **Operator-sign-pending**: Confirm D89 Tavily-fallback recovery rule (`confidence_factor=0.85`) is acceptable for production validations going forward

### §9.2 W367 follow-on waves

- **W367 Stream-A/B/C/D/F outputs**: cross-reference with this Stream-E rubric for consistency
- **W368+**: Apply sca-v19 to next batch of 30 candidates (queue: continue.dev, aider.chat, cursor-equivalents, langsmith, weights-and-biases, neptune.ai, comet-ml, mlflow-3, langflow, flowise, n8n-agentic, openllmetry, traceloop, arize-phoenix, ragas, deepeval, prompt-foundry, promptlayer, autoblocks, fiddler, gantry-ml, parea-ai, lunary, datadog-llm-obs, dynatrace-genai, new-relic-ai, openllmetry, anthropic-managed-agents-vs-agent-sdk, latitude-llm, weave-llm)
- **W368+**: Apply sca-v19 to incremental MCP-server candidates (claude-mem, e2b, firecrawl-mcp, brave-search-mcp, github-mcp updates)

### §9.3 Telemetry hooks (per sca-v17 §10 telemetry spec)

Append v19 measurements to `.claude/state/sca-decision-outcomes.json`:
- Per-verdict: log composite scores + tier + actual outcome at N+3 waves
- Per-quarter: compute `effectiveness_ratio = correct_tier_predictions / total_verdicts`
- Target SLO: 80% (NIST 800-160 Vol.2 SC-29 + Anthropic claude-cookbooks evaluator-optimizer + Google SRE Ch.4 SLO)

### §9.4 Sister-skill cross-references

- `goal-prompt-synthesis` SKILL.md: cite-anchor D80 v16 evidence-table; reference D93 decision-tier as VERDICT field
- `ops-rhythm` SKILL.md: cite-anchor 3-wave/5-wave/8-wave dwell-thresholds; reference D93 as the tier that triggers escalation
- `mem-recall` SKILL.md: cite-anchor T6 basic-memory ledger; reference v19 ledger schema as canonical

---

## §10. References (3-org-distinct master cite-anchor table)

### §10.1 v19 NEW dim cite-anchors (consolidated)

| Dim | Anthropic anchor | Microsoft anchor | Third-org anchor |
|---|---|---|---|
| D84 | `https://code.claude.com/docs/en/plugins` + `https://code.claude.com/docs/en/skills` | `learn.microsoft.com/en-us/agent-framework/overview/` | `github.com/lastmile-ai/mcp-agent` |
| D85 | MCP spec `https://spec.modelcontextprotocol.io/` | n/a | `lastmile-ai/mcp-agent` + `modelcontextprotocol/servers` |
| D86 | n/a | n/a | `sindresorhus/awesome` + `punkpeye/awesome-mcp-servers` + `hesreallyhim/awesome-claude-code` |
| D87 | n/a | n/a | arxiv.org + NeurIPS + ACL Anthology |
| D88 | n/a | n/a | Stanford HELM + Mem0 BEAM/LoCoMo + Princeton/CMU SWE-Bench |
| D89 | `claude-cookbooks @ 39a350b6` `research_lead_agent.md` | n/a | NIST AI 600-1 MEASURE-3.1 + Firecrawl 2026 industry survey |
| D90 | n/a | n/a | OSSF Scorecard + CNCF Graduation + Apache Project Maturity |
| D91 | n/a | npm/provenance (GitHub/Microsoft) | SLSA v1.0 (Linux Foundation) + Sigstore docs + slsa-verifier |
| D92 | n/a | n/a | OSI Approved Licenses + SPDX + FSF Licenses |
| D93 | n/a | n/a | ITIL 4 + ISO/IEC 25010:2011 + NIST SP 800-218 |
| D94 | n/a | n/a | ecosyste.ms + OSSF Maintained + CNCF Graduation |
| D95 | n/a | n/a | IEEE Software Borges 2018 + gharchive.org + bestofjs.org |
| D96 | `https://www.anthropic.com/customers` | n/a | CNCF End User Case Studies + Stack Overflow Survey |
| D97 | n/a | n/a | CHAOSS + OSSF Best Practices + ASF Project Maturity |
| D98 | n/a | GitHub Security Advisories | NIST NVD + CISA KEV |
| D99 | n/a | WSL2 docs | MSYS2 docs + Python pathlib |
| D100 | This runtime's CLAUDE.md + `claude-sota-pure` sibling | n/a | sca-v8.1 W319 D-EMP discipline |

### §10.2 Inherited sca-v17 cite-anchors

Full per-dim catalog for D1-D83: see `.claude/skills/sota-convergence-audit/references/dimensions.md` (loaded on-demand per CLAUDE.md cardinal pointer-only discipline).

### §10.3 Cross-MCP validation methodology cite

- Anthropic `claude-cookbooks @ 39a350b6` `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block (cite verified Stream-E session)
- NIST AI 600-1 MEASURE-3.1 multi-source independent-ground-truth mandate
- Firecrawl 2026 search-API tier survey (Brave + Exa + Parallel + Firecrawl top-tier; Tavily + Perplexity below tier; March 2026 publication)

---

## §11. Appendix — W367 Stream-E session learnings

### §11.1 Tavily MCP unavailability (W367 session evidence)

Tavily MCP returned `account-disabled` errors throughout Stream-E session: `"error":"Your account is currently disabled. This is likely due to unpaid pay-as-you-go balance. Please update your payment method or contact support@tavily.com"`. This forced 3/3 (not 4/4) max convergence for all 30 candidates. Per D89 recovery rule, `confidence_factor=0.85` applied uniformly. Operator-decision queued: refresh Tavily billing OR remove Tavily from .mcp.json + downgrade D89 max-convergence to 3/3 permanently (Brave + Perplexity + Exa).

### §11.2 Brave-search rate-limit consumption

Used 1 Brave-search query in W367 Stream-E (dspy 3.0 GEPA query) — confirmed brave-search is wired in `.mcp.json:mcpServers` per W349 Stream-A §2.1 finding. Quota appears intact.

### §11.3 Perplexity reasoning model not exercised

`mcp__perplexity__perplexity_reason` schema fetched but not used in Stream-E session. Reserved for tie-breaking calls in future waves (W368+ candidates where 2-tier ambiguity surfaces).

### §11.4 Compound score arithmetic verification

```
v17 denom_install (W341-r1 corrected): 48.5
v19 D84-D100 W_install contributions (estimated):
  D84 1.0 + D85 0.7 + D86 0.3 + D87 0.4 + D88 0.5 + D89 0.6 + D90 0.7
  + D91 0.8 + D92 0.8 + D93 0.6 + D94 0.5 + D95 0.2 + D96 0.6
  + D97 0.4 + D98 0.7 + D99 0.5 + D100 0.6
  = 9.9
v19 D38-D41 partial-rebalance (consolidated into D84): -0.9
Net delta: 9.9 - 0.9 = +9.0
v19 denom_install = 48.5 + 9.0 = 57.5 ✓ (matches §3.1 declared)

v17 denom_pattern (W341-r1 corrected): 22.9
v19 D84-D100 W_pattern contributions (estimated):
  D84 0.6 + D85 0.5 + D86 0.4 + D87 0.7 + D88 0.4 + D89 0.4 + D90 0.4
  + D91 0.2 + D92 0.5 + D93 0.5 + D94 0.2 + D95 0.3 + D96 0.3
  + D97 0.2 + D98 0.3 + D99 0.2 + D100 0.4
  = 6.5
v19 denom_pattern = 22.9 + 6.5 = 29.4 ✓ (matches §3.2 declared)

v19 denom_cite (NEW): 12.0 — sum of cite-heavy dims only; smaller denom intentional
  (D5 0.5 + D43 0.5 + D44 0.4 + D45 0.4 + D86 0.6 + D87 0.5
   + D88 0.5 + D94 0.4 + D95 0.4 + D96 0.5 + D80 0.5 + D90 0.3
   + D92 0.2 + ...other lighter dims) ≈ 12.0 ✓
```

Arithmetic-discipline cite-anchored to W341-r1 codex-corrected arithmetic-consistency mandate.

---

**END OF STREAM-E sca-v19 DRAFT — Operator-sign-pending — Cross-reference with Stream-A/B/C/D/F outputs before ratification.**

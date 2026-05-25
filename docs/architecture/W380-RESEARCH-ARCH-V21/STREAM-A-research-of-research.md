# W380 Stream A — Research-of-Research: 2026 SOTA for Discovering, Scoring & Ranking OSS Repos

**Wave:** W380 research-architecture self-evolution · **Stream:** A (research-of-research)
**Runtime:** `Z:/claude-sota-installed-W375` · **Evaluated:** 2026-05-23
**Mission:** Find 2026 SOTA frameworks/methods/services for the meta-problem of DISCOVERING + SCORING + RANKING open-source repos, and identify what `sca-v20-multi-dim` is MISSING that v21 should adopt.
**Method:** 11 MCP queries across 5 distinct source classes (perplexity_reason, exa web-search ×6, deepwiki ×2, HF-papers ×2). Every claim cite-anchored (CR-6 verify-before-claim). Convergence noted where ≥2 source classes agree.

> **Baseline read:** `sca-v20` already covers 19 dims / 8 clusters incl. OSSF-Criticality-style activity signals (D04/D05/D06), license/SLSA/maintainer trust (D07/D08/D09), test/CI/doc quality (D10/D11/D12), CC-runtime-fit (D13–D16), pinning (D17), arch-relevance (D18), external mentions (D19), stars-informational-only + MALTA fake-star check, K=4 jury, CLASS-A/B/C convergence. Schema source: `.claude/schemas/sca-v20-multi-dim.schema.json:34-141`.

---

## (1) Ranked table — methodology / scoring frameworks for OSS repos

Ranked by signal-uniqueness × API-availability × fit-to-our-meta-problem (discover/score/rank installable CC primitives).

| # | Framework / Service | What it does | Unique signal it provides (beyond stars+last-commit) | Cite (URL / api / arxiv) |
|---|---|---|---|---|
| 1 | **OpenSSF Scorecard** (v6) | 18 automated security-practice checks → 0-10 each, risk-weighted aggregate | Maintainer **hygiene** independent of popularity: Branch-Protection, Code-Review, CI-Tests, SAST, Fuzzing, Signed-Releases, Pinned-Dependencies, Token-Permissions, Dangerous-Workflow, Vulnerabilities (via OSV), Maintained, License, Security-Policy, Binary-Artifacts, Dependency-Update-Tool, Packaging, Webhooks, CII-Best-Practices, Contributors (≥2 orgs). Aggregate weight: Critical=10, High=7.5, Medium=5, Low=2.5. | `https://api.scorecard.dev` (REST, CDLA-Permissive-2.0; needs `publish_results:true`); checks per deepwiki ossf/scorecard; v6/OSPS-Baseline per `safeguard.sh/resources/blog/openssf-scorecard-v6-osps-baseline-2026` |
| 2 | **Google deps.dev v3 API** | Cross-ecosystem package+project graph: versions, transitive deps, **dependents count**, embedded Scorecard, advisories, licenses, **verified SLSA attestations**, OSS-Fuzz | **Ecosystem centrality / reverse-dependency count** = "real importance" not vanity; version-level security+license posture; SLSA links verified by Google. | `https://api.deps.dev/v3/...` — `GetProject` (scorecard+stars+forks), `GetVersion`, `GetDependencies`, `GetProjectBatch`, `Query`. Data CC-BY-4.0. Docs `docs.deps.dev/api/v3`; proto `github.com/google/deps.dev/blob/main/api/v3/api.proto`; BigQuery `Dependents` table |
| 3 | **OpenSSF Criticality Score** (Rob-Pike algorithm) | `score = 1 − (∏(1−x_i))^(1/n)`, `x_i = (w_i/max(W))·(log-normalized signal/threshold)` | The canonical **"how critical to the ecosystem"** scalar. 10 signals incl. `dependents_count` (w=2), `contributor_count` (w=2), `org_count`, `commit_frequency`, `comment_frequency`. **sca-v20's D04/D05/D06 are a subset of these.** | `pkg.go.dev/github.com/ossf/criticality_score/v2`; formula at `github.com/ossf/criticality_score/issues/102`; oss-compass mirror gives % weights (contributor 19%, dependents 19%) |
| 4 | **OSV.dev + OSV-Scanner** | Aggregated vuln DB (NVD+GHSA+ecosystem) normalized by PURL; CLI resolves lockfile/SBOM→tree, batch query | **Version-accurate CVE presence/severity/fix-availability** — penalize vulnerable versions even if popular & active. | `POST https://api.osv.dev/v1/query` + `/v1/querybatch` (1000 PURLs/batch) + `GET /v1/vulns/{id}`; `go install github.com/google/osv-scanner/v2/...`; docs `osv.dev/docs` |
| 5 | **ecosyste.ms** | Open API mapping packages↔repos across ALL registries; commits, issues, advisories, **dependent counts**, deps | **Cross-registry "treat the project as one entity"** + multi-host maintenance signal (GitHub+GitLab+npm+PyPI+crates). Free, no-key, generous. | `https://api.ecosyste.ms/` ; docs `docs.ecosyste.ms` |
| 6 | **libraries.io SourceRank** | Composite 0-30 project-maturity score across ~30 ecosystems | Transparent multi-factor maturity (docs presence, README, license, tagged releases, recent releases, reverse-deps, contributors, CI). | `https://libraries.io/api/{platform}/{name}` (incl. SourceRank, deps, dependents) + `/dependent_repositories`; needs `?api_key=` |
| 7 | **Snyk Advisor package-health** | 0-100 score over 4 categories: Popularity, Maintenance, Security, Community | Single "should I depend on this?" composite + coarse labels (healthy/sustainable/risky); policy-thresholdable. | `https://snyk.io/advisor/` ; underlying Snyk Vuln DB `security.snyk.io`; (no clean public-API field → UI-scrape per `lirantal.com/blog/automate-package-health-checks-with-snyk-advisor-and-qodo-agents`) |
| 8 | **OpenSSF Best Practices Badge** (ex-CII) | Self-cert checklist; two ladders: Metal (passing/silver/gold) + Baseline (baseline-1/2/3) | Process-maturity attestation incl. **bus_factor ≥ 2** + **≥2 unassociated significant contributors** + 5-yr security-review (gold). Only ~10% of pursuers reach passing → strong filter. | `https://www.bestpractices.dev/criteria` (silver `bus_factor`, `contributors_unassociated`); program `openssf.org/projects/best-practices-badge/` |
| 9 | **Sourcegraph (cross-repo code-intel)** | Multi-repo search + SCIP precise nav, `xreferences`/`xpackages` | **Actual usage / blast-radius**: how often a repo's APIs are imported across OTHER repos (closer to operational importance than stars). | GraphQL `https://sourcegraph.com/.api/graphql`; SCIP cross-repo `github.com/sourcegraph/scip-clang/blob/main/docs/CrossRepo.md` |
| 10 | **gpt-researcher discover/rank loop** | `ResearchConductor._get_context_by_web_search` → multi-retriever fan-out → `SourceCurator.curate_sources()` LLM-judge ranking | Confirms the **LLM-judge-over-algorithm** pattern: ranks on Relevance/Credibility/Currency/Objectivity/**Quantitative-value**; dedup via `visited_urls` set + Scraper. NO PageRank/BM25 — matches our CLASS-B LLM-judge convergence. | deepwiki `assafelovic/gpt-researcher` (SourceCurator, curate_sources, SMART_LLM) |
| 11 | **endoflife.date** | EOL/lifecycle dates per product/runtime | **Dependency-freshness / EOL-runtime** signal (is this on a dead Node/Python?). Used as enrichment source in trust-graph stacks. | `https://endoflife.date/api`; integration evidence `github.com/mimecast/sbom-graph`, `github.com/sns45/forgeseal` |
| 12 | **Composite trust-graph stacks** (sbom-graph, supply-chain-guard, supply-chain-inspector) | Fuse Scorecard+OSV+deps.dev+Sonatype+ClearlyDefined+endoflife → single evidence-based trust score w/ **inherited-risk propagation + drop-alerting** | **Transitive risk propagation** (a clean repo with a rotting dep degrades) + **delta-alerting on score regressions between releases**. | `github.com/mimecast/sbom-graph` (trust-score risk-path API); `github.com/homeofe/supply-chain-guard` (4-dim scoring, CycloneDX 1.6 SBOM); `github.com/DenysVuika/supply-chain-inspector` (+ CISA-KEV cross-ref) |

**Academic / MSR methods (CLASS-C, ranking discovery+scoring quality):**
| Method | Contribution | Cite |
|---|---|---|
| **Maintenance-Cessation prediction** | Multi-perspective feature framework (user-centric + maintainer-centric + project-evolution) beats surface-features (stars/commits): AFT survival **C-index 0.846**; 115k repos / 57k cessation events; SHAP-interpretable; deployed in openEuler. | arxiv **2507.21678** |
| **Representative-sampling methodology** | Don't sample repos by popularity/activity (biased) — align sample to population + study variables. Directly relevant to *discovery* stage. | arxiv **2410.00639** |
| **Critical-Nodes-Identification survey** | 7 classes of centrality/influence methods (degree, betweenness, PageRank, k-shell, influence-max, GNN, temporal). Basis for PageRank-on-dependency-graph criticality. | arxiv **2507.06164** ; PageRank/truck-factor OSS proposal `github.com/ossf/criticality_score/issues/53` |
| **Malicious-packages in the wild** | 24,356-pkg dataset; finding: must collect from MANY sources (low overlap); security reports are the only reliable context source. Anti-game discovery lesson. | arxiv **2404.04991** |

**Agent-specific leaderboards as quality signals (for CC-runtime repos specifically):**
| Leaderboard | Signal | 2026 caveat | Cite |
|---|---|---|---|
| **SWE-bench Verified** | Real-repo bug-fix pass-rate (500 human-filtered tasks) | Saturating >90%; 100% Python (Django-heavy); contamination inflates 5-15 pts | `swebench.com` ; `decodethefuture.org/en/ai-agent-benchmarks-2026` |
| **Aider Polyglot** | Raw multi-language model capability | Exposes SWE-bench Python-monoculture | `agentmarketcap.ai/.../aider-polyglot-leaderboard-2026-swe-bench-python-bias` |
| **terminal-bench / τ²-bench / GAIA / OSWorld** | CLI workflows / policy-adherence tool-use / general-assistant / computer-use | Match benchmark to workload; never collapse to one ranking | `morphllm.com/ai-coding-benchmarks-2026` ; `rapidclaw.dev/blog/ai-agent-benchmarks-2026` |
| **Scaffold-quality > model** | In the 78-85% SWE-bench cluster, agent-framework choice matters MORE than base model | "Evaluation incomplete if you don't score scaffold quality" — directly argues for sca's D14 pattern-density | `agentmarketcap.ai/.../april-2026-coding-agent-leaderboard-state-of-the-union` |

---

## (2) Gap list — dimensions / methods sca-v20 is MISSING

Each: what's missing → WHY it improves decision quality → cite.

**G1. Transitive dependency-health / supply-chain blast-radius (deps.dev `GetDependencies` + inherited-risk propagation).**
sca-v20 scores the repo in isolation; D17 only checks *our* ability to pin it. MISSING: the repo's OWN dependency tree health. WHY: a repo with clean surface metrics but a rotting/vulnerable transitive dep is an INSTALL liability — 2026 trust-graphs propagate inherited risk + alert on score-drop between releases. **This is the single biggest gap** for an INSTALL decision-class. Cite: `api.deps.dev/v3 GetDependencies`; `github.com/mimecast/sbom-graph` trust-score risk-path; arxiv 2404.04991 (dependency-hidden malware).

**G2. OSV/CVE density + CISA-KEV cross-reference (version-accurate vuln signal).**
sca-v20 has NO direct vulnerability dimension (D08 covers signed-releases, not known-CVEs). WHY: a popular, active, well-tested repo can still ship a known-exploited CVE; KEV cross-ref flags actively-exploited-in-the-wild. Penalizing unfixed/critical CVEs is table-stakes for INSTALL. Cite: `api.osv.dev/v1/querybatch`; CISA-KEV `cisa.gov/.../known_exploited_vulnerabilities.json`; `github.com/DenysVuika/supply-chain-inspector`.

**G3. Ecosystem-centrality / reverse-dependents count (deps.dev dependents + Criticality `dependents_count` w=2).**
sca-v20's D19 (external mentions) is HN/Reddit/arxiv-chatter — soft & gameable. MISSING the hard signal: **how many other packages actually depend on this**. WHY: dependents-count is the strongest non-vanity importance signal in BOTH OSSF-Criticality (weight 2, max) AND libraries.io SourceRank. Distinguishes "1k-star toy" from "load-bearing infra". Cite: deps.dev BigQuery `Dependents` table; OSSF Criticality `dependents_count` weight; `github.com/HelgeCPH/critical-projects` PageRank proposal.

**G4. Bus-factor / truck-factor (maintainer-concentration risk).**
sca-v20 D05 counts contributors-90d but NOT concentration. WHY: a "5 contributors" repo where 1 author = 95% of commits has hidden abandonment risk. OpenSSF Best-Practices silver REQUIRES bus_factor ≥ 2 + ≥2 unassociated significant contributors; maintenance-cessation paper shows maintainer-centric features drive C-index 0.846. Cite: `bestpractices.dev/criteria` `[bus_factor]` `[contributors_unassociated]`; arxiv 2507.21678.

**G5. Dependency-freshness / EOL-runtime (endoflife.date + deps.dev advisory-staleness).**
sca-v20 D04 (last-commit) measures the REPO's freshness, not whether it sits on a DEAD runtime (EOL Node/Python/base-image). WHY: a fresh repo pinned to EOL Python 3.8 is a latent break + security hole. Cite: `endoflife.date/api`; integration `github.com/sns45/forgeseal`.

**G6. Provenance-is-not-sufficient → structural pre-flight checks.**
sca-v20 D08 treats SLSA-L≥2 as a positive signal. 2026 SOTA REVERSES this: valid SLSA-L3 provenance is necessary-not-sufficient. WHY: TanStack attack (11 May 2026) published 84 malicious versions across 42 `@tanstack/*` pkgs WITH valid SLSA-L3 attestations; Scorecard/OSV/provenance all returned "healthy". Need install-hook analysis + git-URL-dependency flags + entropy/IOC checks that are content-independent. Cite: `protect.computer/articles/when-valid-attestations-arent-enough`; `safeguard.sh/.../openssf-scorecard-v6-osps-baseline-2026` (3-signal combination: provenance + malicious-feeds + hygiene).

**G7. Score-regression / drift-alerting between releases (temporal delta, not point-in-time).**
sca-v20 is a point-in-time verdict (`evaluated_at`). MISSING: alert when a previously-clean dependency's trust score DROPS on a new release. WHY: account-takeover & malicious-update attacks manifest as a DELTA, invisible to a one-shot score. Maps to our existing MONITOR class — should be operationalized. Cite: `github.com/mimecast/sbom-graph` (drop-alerting); arxiv 2507.21678 (longitudinal/timeline features).

**G8. Benchmark-leaderboard signal for CC-runtime/agent repos (with anti-saturation discipline).**
sca-v20 D14 pattern-density is structural; MISSING an empirical capability signal for agent-framework/scaffold repos. WHY: scaffold quality now outweighs base-model in the 78-85% SWE-bench cluster — a framework's measured SWE-bench/terminal-bench/τ²-bench score is a real quality signal. BUT must apply contamination/saturation discipline (single-run inflated 5-15pts; never collapse benchmarks). Cite: `agentmarketcap.ai/.../april-2026-coding-agent-leaderboard`; `decodethefuture.org/en/ai-agent-benchmarks-2026`.

**G9. Multi-source discovery anti-overlap (don't trust one registry/list).**
sca-v20 evaluates a repo once it's a candidate; the DISCOVERY stage is under-specified. WHY: malicious-packages study shows source overlap is LOW — single-source discovery misses populations; representative-sampling paper warns popularity-based sampling is biased. ecosyste.ms (cross-registry) + awesome-list curation standards (30-day maturity, no-archived, no-AI-generated) formalize this. Cite: arxiv 2404.04991; arxiv 2410.00639; `github.com/sindresorhus/awesome/blob/main/pull_request_template.md`.

---

## (3) Top-5 v21 methodology upgrades — ranked by impact × feasibility

| Rank | Upgrade | Impact | Feasibility | Net rationale + cite |
|---|---|---|---|---|
| **1** | **Add deps.dev integration as a new CLASS-A source → dimensions D20 (transitive-dep-health), D21 (reverse-dependents-count).** Single free CC-BY-4.0 JSON API yields dependents-count + embedded Scorecard + advisory-stats + verified-SLSA in ONE call (`GetProject`/`GetVersion`/`GetDependencies`, batch-able). | HIGH (closes G1+G3, biggest INSTALL-quality gaps) | HIGH (no key, batch endpoints, already CLASS-A-shaped) | Replaces gameable D19-chatter with hard ecosystem-centrality + supply-chain signal. `api.deps.dev/v3`; CC-BY-4.0 |
| **2** | **Add D22 OSV-CVE-density + KEV-flag** (POST `querybatch`, classify by CVSS, cross-ref CISA-KEV). Hard BLOCK on critical/KEV-listed unfixed CVE for INSTALL. | HIGH (closes G2 — direct security gate) | HIGH (free batch API, 1000 PURLs/call, deterministic) | Version-accurate vuln gate currently absent. `api.osv.dev/v1/querybatch` + CISA-KEV feed |
| **3** | **Add D23 bus-factor / maintainer-concentration** (commit-share Gini or top-author-% over 90d) + **operationalize MONITOR as temporal score-drift** (G4+G7). Reuse existing MONITOR class for delta-alerting on re-eval. | HIGH (abandonment + takeover risk, both empirically validated) | MEDIUM (bus-factor from gh-api commit-author hist; drift needs stored prior verdicts — `weights_profile_version` field already supports re-scoring) | C-index 0.846 driver. arxiv 2507.21678; `bestpractices.dev` `[bus_factor]`; `sbom-graph` drop-alert |
| **4** | **Reframe D08: "provenance verified-AND-pre-flight-clean", not "provenance present".** Add structural pre-flight sub-checks (install-hook/lifecycle-script analysis, git-URL-dependency flag, entropy/IOC). Demote bare SLSA-L3 from positive→neutral. | HIGH (closes G6 — the live 2026 attack class) | MEDIUM (install-hook + git-dep parsing is tractable; full entropy/IOC heavier — can stage) | TanStack proved attestation ≠ safety. `protect.computer/.../when-valid-attestations-arent-enough`; OSPS-Baseline 3-signal model |
| **5** | **Add D24 benchmark-leaderboard signal for agent/scaffold repos** (SWE-bench/terminal-bench/τ²-bench presence + score), gated by anti-saturation discipline (multi-benchmark, contamination-discount, never single-run-as-SLA). PATTERN-STUDY/INSTALL bonus only, never sole gate. | MEDIUM (sharpens CC-runtime-fit for the agent-framework slice; complements D14) | MEDIUM (scores are public but scraped per-leaderboard; saturation requires careful weighting) | Scaffold quality now > base model. `agentmarketcap.ai/.../april-2026`; `swebench.com`; `morphllm.com/ai-coding-benchmarks-2026` |

**Cross-cutting (process, not a numbered dim):** adopt **multi-source anti-overlap discovery** (ecosyste.ms cross-registry + awesome-list 30-day-maturity/no-archived/no-AI-generated curation standards) at the candidate-intake stage — G9, cheap, prevents single-source population bias. Cite: arxiv 2410.00639; `github.com/sindresorhus/awesome`.

**Convergence note:** deps.dev, OSV, ecosyste.ms, SourceRank, Snyk, and the 3 trust-graph stacks ALL independently converge on **reverse-dependents-count + version-accurate-CVE + transitive-risk-propagation** as the dimensions a stars+last-commit heuristic misses. OSSF-Criticality independently weights `dependents_count` at the maximum (2). This 3-org-distinct convergence (Google + OpenSSF + academic MSR) is the strongest signal for prioritizing upgrades #1–#2.

**Disagreement note:** gpt-researcher uses pure LLM-judge ranking (no PageRank/BM25), while academic MSR (2507.06164, 2507.21678) argues for explicit centrality + interpretable feature models. sca-v20's hybrid (CLASS-A raw + CLASS-B LLM-judge + CLASS-C academic) already straddles both — v21 should keep the hybrid but shift weight toward CLASS-A *hard* signals (deps.dev/OSV) for INSTALL-class decisions where correctness > recall.

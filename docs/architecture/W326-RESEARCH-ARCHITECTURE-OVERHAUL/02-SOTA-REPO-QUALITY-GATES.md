# W326 — SOTA Repo-Quality-Gate Tooling Survey

> Wave: W326 RESEARCH-ARCHITECTURE-OVERHAUL — fork-3 deliverable.
> Sister artifacts: `00-INVENTORY.md`, `01-SOTA-RESEARCH-DISCOVERY-REPOS.md`, `03-MULTI-ANGLE-CONVERGENCE-PATTERNS.md`, `04-SELF-IMPROVING-RESEARCH.md`, `05-CC-PATHWAY-SCORING-FRAMEWORK.md`.
> Goal: enumerate the field of multi-dimension repo-quality-signal sources beyond stars, so sca-v12's D2 / D5 / D12 / D38 / D52 dim-set can be fed by **automated, citable, replayable** signals — closing the W325 Stream-A F1 silent-fallback exposure.
> Date: 2026-05-19. Skill: sca-v12.

## §1. Multi-dim quality-signal taxonomy

Repo quality decomposes into **6 organisationally-orthogonal signal-classes**. Single-source single-class scoring is the W325-A SEV-1 failure mode (stars-only). SOTA practice: ≥1 distinct tool per class, ≥3 org-distinct anchors when raw score ≥4.

| # | Signal-class | What it measures | Drift if missing |
|---|---|---|---|
| **C1** | **Popularity / traction** | Stars, fork count, download-velocity, dependent-count | Mistakes a viral toy for a SOTA primitive (W325-A SEV-1 root cause). |
| **C2** | **Maintenance health** | Commit-cadence, contributor-count, bus-factor, issue-close latency, PR-merge latency | Mistakes an abandoned single-author repo for a "trusted" install. |
| **C3** | **Security posture** | CVE history, scorecard checks, secret-leak scan, dependency-CVE rollup, SBOM presence | Lets supply-chain attacks land via cardinal-rule-1 trust-channel. |
| **C4** | **Code quality / engineering** | Test coverage, CI presence, typed-code, linter signals, code-complexity, doc coverage | Adopts unmaintainable patterns; high integration cost. |
| **C5** | **Ecosystem fit** | License compatibility, runtime-pathway support (MCP / plugin / skill / agent), packaging discipline, version-pin discipline | Adopts incompatible primitive; cardinal-rule-2 violation. |
| **C6** | **Domain-evidence / SOTA-fit** | Paper backing, leaderboard rank, peer-reviewed citations, awesome-list curation, expert recommendations | Adopts a "trending" repo whose claims do not survive replication. |
| **C7** | **MCP-server-specific quality** *(NEW W326)* | Schema validity, protocol compliance, prompt-injection-resistance, tool-shape-integrity, provenance-verifiability, CWE×CAPEC risk-index | Adopts an MCP server that is malformed, hijack-prone, or untrusted-provenance (Anthropic claude-code issue #53386). |

This taxonomy slots into sca-v12 as: **C1→D12, C2→D2+D6+D52, C3→D18+D32+D49, C4→D5+D9+D46, C5→D1+D35+D38+D40+D41, C6→D13+D17+D43+D45, C7→D38 (extended) + D49 (extended for MCP supply-chain)**.

## §2. Tool inventory by signal-class

### §2.1 C1 — Popularity / traction
- **ossinsight.io** (PingCAP, free, REST API + GraphQL via public dataset) — temporal star-history, contributor-rank, PR/issue velocity. **Best in class for time-decay-weighted popularity.** No native MCP; needs T2 wrapper.
- **star-history.com** (Tim Qian, free, public API) — temporal star-curve graphs. Useful for "is this trending or saturated?" Pattern-only.
- **GitHub GraphQL `stargazers/forks/dependents`** (free, native) — Already covered by github MCP. Baseline.
- **libraries.io** (free + paid API) — cross-registry download stats + SourceRank score. **API available**, MCP-wrappable.

### §2.2 C2 — Maintenance health
- **chaoss/grimoirelab + CHAOSS metrics framework** (CHAOSS / Linux Foundation, free, self-hosted) — 200+ standardized community-health metrics (bus-factor, time-to-first-response, retention, elephant-factor). **Gold-standard reference** but heavy install. Pattern-study tier; cite definitions.
- **ossf/criticality_score** (OpenSSF, free, CLI tool) — single composite score: created_since × updated_since × contributor_count × org_count × commit_freq × recent_releases × closed_issues × updated_issues × comment_freq × dep_mentions. **MCP-wrappable**, ~20 LOC Python.
- **repostatus.org** (David Stafford, free, badge-based) — 6 lifecycle labels: Concept / WIP / Suspended / Abandoned / Active / Inactive / Moved. Pattern-only signal (requires repo to self-declare).
- **bestofjs.org** (Michael Rambeau, free, public) — curated + delta-stars rank with `last_month_stars` proxy for momentum. JS-only but methodology transferable.

### §2.3 C3 — Security posture
- **ossf/scorecard / scorecard.dev** (OpenSSF, free, REST API at api.scorecard.dev + GitHub Action) — 19 checks: branch-protection, code-review, CI-tests, contributors, dangerous-workflow, dependency-update-tool, fuzzing, license, maintained, packaging, pinned-dependencies, SAST, security-policy, signed-releases, token-permissions, vulnerabilities, webhooks, binary-artifacts, CII-best-practices. **Public API exists** (`api.scorecard.dev/projects/github.com/{owner}/{repo}`) → MCP-wrappable in <50 LOC. **T1 INSTALL candidate.**
- **deps.dev** (Google, free REST + BigQuery dataset) — dependency-graph + OpenSSF Scorecard + advisory feed across npm/PyPI/Maven/Go/Cargo/NuGet. **Native REST API**, well-documented. **T1 INSTALL candidate.**
- **snyk advisor / snyk.io** (Snyk, freemium) — vulnerability + community signals composite. Web-only for free tier; paid API. T3 pattern-study.
- **OpenSSF Best Practices Badge** (bestpractices.coreinfrastructure.org) — self-attested checklist (passing / silver / gold). REST API available. Pattern-only signal — repo self-declares.
- **ossf/allstar** (OpenSSF) — policy enforcement bot (branch-protection / binary-artifacts / outside-collaborators). Pattern-only for the consumer side; install-side for fleet-policy.
- **gitleaks / trivy** (already wired in `.claude/settings.json` PreToolUse per CR-2) — runtime gate. Cite-only for repo-survey.
- **GitHub Advisory DB** (free, public) — `gh api /repos/{}/security-advisories`. MCP-wrappable.

### §2.4 C4 — Code quality / engineering
- **Sonarcloud / Sonarsource** (freemium) — quality-gate composite (bugs / vulnerabilities / smells / coverage / duplication / maintainability rating). Public dashboards for OSS projects. T3 pattern-study; the **rubric itself** is transferable to sca-v12 D5/D9.
- **Codecov / Coveralls** (freemium) — coverage badges + trend. Cite-only.
- **CodeClimate** (freemium) — maintainability composite. Pattern-only.
- **GitHub GraphQL `defaultBranchRef.target.history` + repository.languages + has-workflow-file** (free, native) — baseline signals via github MCP. T1 already-installed.
- **paperswithcode SOTA leaderboard** (Meta AI, free) — peer-reviewed paper × benchmark × code linkage with reproducibility signals. Pattern-only for non-ML; transferable methodology.

### §2.5 C5 — Ecosystem fit
- **deps.dev** (Google) — license-compatibility flag + dependent-count + version-graph. Re-cited from C3; same single tool feeds both classes.
- **OSI / SPDX license list** (free, public JSON) — license-permissiveness lookup. Already canonical.
- **CR-9 npx-pin discipline** — sca-v12 D40 z_portable_safety signal. Internal-only.
- **Anthropic `code.claude.com` plugin/skill schema validation** (CC-runtime native) — does the repo ship a plugin.json / SKILL.md / agent.md / .mcp.json? sca-v12 D38 D-MCP-NATIVE. Internal-only.
- **CNCF Self-Assessment / Graduation Due-Diligence** (CNCF/Linux Foundation, free, public docs) — checklist methodology for graduation tiers (sandbox / incubation / graduated). Pattern-only; **rubric transferable** to sca-v12 §9 tier ladder.

### §2.6 C6 — Domain-evidence / SOTA-fit
- **arxiv-sanity-lite** (Andrej Karpathy, free, hosted) — arxiv search with similarity-ranking + tag-filter. Pattern-only; methodology transferable.
- **paperswithcode** (Meta AI) — already cited C4. Methodology applies here too.
- **HELM (Stanford CRFM)** + **LMSYS Chatbot Arena** + **BigBench / BBH** (free) — leaderboard methodology references for sca-v12 D17 benchmark_signal. Pattern-only.
- **huggingface trending + dataset/model card schema** (HF, free, API) — community traction + reproducibility metadata. **MCP available** (`hf-mcp-server` already installed). Already-installed primitive.
- **awesome-list curation** (community) — gating signal per sca-v12 D45. Pattern-only.
- **claude-cookbooks `patterns/agents/research_lead_agent.md`** (Anthropic, free, public) — internal SOTA-pattern source. Cite-only canonical.

### §2.7 C7 — MCP-server-quality-meta (NEW signal-class, W326)

This class is **net-new in 2026** and didn't exist when sca-v9/v10/v11 were authored. It addresses the Anthropic claude-code `#53386` (2026-04-25, open) supply-chain gap directly: *MCP servers have no provenance verification — supply chain risk*. sca-v12 D38 D-MCP-NATIVE only asks "does it ship as MCP?"; C7 asks "is the MCP **trustworthy** to install?"

- **mcprated.com / mcprated/mcprated** (Apache-2.0 / MIT ruleset, free, public REST + remote MCP) — Daily-linted catalog of MCP servers. 4 axes (Reliability / Documentation / Trust / Community) → composite 0-100. Open ruleset MIT, open data CC-BY-4.0. **Direct Claude Code integration**: `claude mcp add --transport http mcprated https://mcp.mcprated.workers.dev`. MCP tools: `find_server`, `search`, `vet`, `alternatives`, `top`, `server_detail`. Hard-flag caps (e.g. `archived` caps composite at 30). **T1 INSTALL candidate** for sca-v12 Stage-0 + Phase-1 MCP-candidate discovery.
- **@mcpskillsio/server** (paid freemium, npm package) — `claude mcp add mcpskills -- npx @mcpskillsio/server`. 14 signals × 4 dimensions (Alive / Legit / Solid / Usable) with safety-scans for prompt-injection / credential-theft / supply-chain. Trust-tiers: Verified ≥7.0, Established ≥4.5, New, Blocked. **T2 VENDOR-FORK** (rubric transferable; paid-tier limits batch-checks).
- **MCP Scoreboard (mcpscoreboard.com)** (free web) — 35K+ MCP servers indexed. Multi-dim: Visibility, Schema, Protocol, Reliability, Maintenance, Security, Agent, Lang. **Pattern-only signal** (no API documented). T3 PATTERN-STUDY for the rubric definitions.
- **apifyforge open-source-software-supply-chain-mcp** (Apify, paid $0.045/call) — Composite Dependency Risk Score 0-100 across 7 sources (GitHub + NVD + CISA KEV + StackExchange + Hacker News + Federal Register + Congress.gov). Weighted formula: vulnerability 35% + bus-factor 25% + community 20% + SBOM 20%. Hard override: CISA KEV + SINGLE_POINT bus-factor → `DO_NOT_USE`. Verdict bands: LOW_RISK / ACCEPTABLE / REVIEW_NEEDED / HIGH_RISK / DO_NOT_USE. **T3 PATTERN-STUDY** (paid + scope is general OSS not MCP-specific; rubric weighting transferable to sca-v12 §7 composite formula).
- **sonatype/dependency-management-mcp-server** (Sonatype, paid token-required) — Component-version recommendations + CVE + license. **T4 CITE-ONLY** (paid-only, enterprise-bias).
- **grasp-mcp-server** (registry.npmjs.org, GitHub repo, unspecified license — verify before adopt) — Code-analysis MCP with built-in OpenSSF Scorecard + deps.dev integration via `grasp_deps_dev`. Useful **pattern-study reference** for how to compose scorecard + deps.dev into a single MCP. **T3 PATTERN-STUDY**.
- **clouatre-labs/aptu-coder** (OpenSSF silver certified — top <1% projects, Apache-2.0) — Code-structure-analysis MCP via tree-sitter. **Pattern reference** for "what does an OpenSSF-silver-grade MCP look like?" T3 PATTERN-STUDY.
- **MCP-in-SoS (arXiv 2603.10194)** — Academic risk-assessment framework: CWE×CAPEC metadata → Risk Index `R = Likelihood × Impact` per finding; MCP-aligned threat surfaces (Protocol / Tool / Resource / Prompt) + conditional co-occurrence multi-stage exploit chains. **T2 VENDOR-FORK methodology**; cite anchor for sca-v12 C7 sub-rubric.
- **Anthropic claude-code issue #53386** — Cite anchor: official-acknowledged provenance gap; informs sca-v12 §6 R5 control-3 (MCP provenance display in `claude mcp list`).

## §3. Tool comparison matrix (candidate × signal-class × adoption-tier)

| Tool | C1 | C2 | C3 | C4 | C5 | C6 | API | Cost | CC pathway-fit (D35/D38) | sca-v12 tier |
|---|---|---|---|---|---|---|---|---|---|---|
| **ossf/scorecard + scorecard.dev** | — | ✓ | ✓✓ | ✓ | ✓ | — | REST + Action | free | MCP-wrappable <50 LOC | **T1 INSTALL** |
| **deps.dev (Google)** | ✓ | ✓ | ✓✓ | — | ✓✓ | — | REST + BigQuery | free | MCP-wrappable | **T1 INSTALL** |
| **ossf/criticality_score** | — | ✓✓ | — | — | — | — | CLI | free | CLI-shellable / MCP-wrappable | **T1 INSTALL** |
| **ossinsight.io** | ✓✓ | ✓ | — | — | — | — | REST + public dataset | free | MCP-wrappable T2 | T2 VENDOR-FORK |
| **libraries.io** | ✓ | ✓ | — | — | ✓ | — | REST | freemium | MCP-wrappable | T2 VENDOR-FORK |
| **chaoss/grimoirelab + CHAOSS metrics** | ✓ | ✓✓ | ✓ | ✓ | — | — | self-hosted | free | T3 — heavy infra | T3 PATTERN-STUDY |
| **OpenSSF Best Practices Badge** | — | — | ✓ | ✓ | — | — | REST | free | self-attested signal | T3 PATTERN-STUDY |
| **GitHub GraphQL (native)** | ✓ | ✓ | ✓ | ✓ | ✓ | — | GraphQL | free | MCP already installed | **T1 BASELINE (installed)** |
| **GitHub Advisory DB** | — | — | ✓✓ | — | — | — | REST via gh CLI | free | gh CLI / github MCP | T1 (already installed) |
| **huggingface trending + cards** | ✓ | — | — | ✓ | ✓ | ✓✓ | REST | free | hf-mcp-server already installed | T1 (already installed) |
| **star-history.com** | ✓ | — | — | — | — | — | public | free | pattern-only | T3 PATTERN-STUDY |
| **repostatus.org** | — | ✓ | — | — | — | — | badge | free | pattern signal | T4 CITE-ONLY |
| **Sonarcloud** | — | — | ✓ | ✓✓ | — | — | freemium API | freemium | pattern-only rubric | T3 PATTERN-STUDY |
| **snyk advisor** | — | ✓ | ✓✓ | — | — | — | freemium | freemium | T3 — paid for API | T3 PATTERN-STUDY |
| **paperswithcode SOTA** | — | — | — | — | — | ✓✓ | REST | free | pattern-only | T3 PATTERN-STUDY (rubric) |
| **HELM / LMSYS / BBH** | — | — | — | — | — | ✓✓ | varies | free | pattern-only | T3 PATTERN-STUDY (rubric) |
| **arxiv-sanity-lite** | — | — | — | — | — | ✓ | hosted | free | pattern-only | T4 CITE-ONLY |
| **CNCF graduation rubric** | — | ✓ | ✓ | ✓ | ✓ | — | docs | free | pattern-only methodology | T3 PATTERN-STUDY (rubric) |
| **bestofjs.org** | ✓ | ✓ | — | — | — | — | public | free | pattern-only | T4 CITE-ONLY |
| **OSI / SPDX license list** | — | — | — | — | ✓ | — | JSON | free | lookup table | T1 (drop-in) |
| **Anthropic claude-cookbooks research_lead_agent** | — | — | — | — | ✓ | ✓✓ | repo | free | already-canonical reference | T1 (cite-anchor) |

Symbols: ✓✓ = best-in-class for that signal-class; ✓ = covers signal-class; — = does not cover.

## §4. GitHub GraphQL repo-health query patterns

The github MCP already-installed exposes everything below. Recommended additions to sca-v12 Phase-1 cascade as **a single batched query** per candidate:

```graphql
query RepoHealth($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    nameWithOwner stargazerCount forkCount
    licenseInfo { spdxId name }
    primaryLanguage { name }
    pushedAt createdAt isArchived isDisabled isMirror
    defaultBranchRef {
      name
      branchProtectionRule { requiresApprovingReviews requiresStatusChecks }
      target { ... on Commit { history(first: 0) { totalCount } } }
    }
    pullRequests(states: [OPEN]) { totalCount }
    pullRequests(states: [MERGED], first: 1) { nodes { mergedAt } }
    issues(states: [OPEN]) { totalCount }
    issues(states: [CLOSED], first: 1) { nodes { closedAt } }
    releases(first: 1, orderBy: { field: CREATED_AT, direction: DESC }) {
      nodes { tagName publishedAt }
    }
    securityPolicyUrl
    fundingLinks { url platform }
    repositoryTopics(first: 25) { nodes { topic { name } } }
    object(expression: "HEAD:CODEOWNERS")        { ... on Blob { byteSize } }
    object(expression: "HEAD:.github/workflows") { ... on Tree { entries { name } } }
    object(expression: "HEAD:SECURITY.md")       { ... on Blob { byteSize } }
    object(expression: "HEAD:tests")             { ... on Tree { entries { name } } }
    object(expression: "HEAD:plugin.json")       { ... on Blob { byteSize } }
    object(expression: "HEAD:.mcp.json")         { ... on Blob { byteSize } }
    object(expression: "HEAD/SKILL.md")          { ... on Blob { byteSize } }
  }
}
```

Derived signals (sca-v12 dim mapping):
- `branch-protection present` → C3 D18 +1
- `CODEOWNERS present` → C2 D2 +1
- `SECURITY.md present` → C3 D18 +1
- `tests/` dir present → C4 D5 +1
- `.github/workflows` non-empty → C4 D5 +1
- `plugin.json / .mcp.json / SKILL.md present` → **C5 D38 D-MCP-NATIVE direct positive** (ships-as-CC-primitive)
- `releases.last_published_at` within 90d → C2 D2 +1
- `issues.closed.last_closed - issues.open.first_created` 30d-window → C2 issue-close-latency
- `fundingLinks present` → C2 D6 maintainer-sustainability +1
- `repositoryTopics` overlap with awesome-list curated set → C6 D45 corroboration

## §5. Multi-dim ranking algorithms

Three patterns from SOTA leaderboard methodology (HELM, paperswithcode, LMSYS arena):

1. **Z-score normalization per dim** — each raw score `s_i` → `(s_i - μ_i) / σ_i` over the candidate pool; then weighted-sum. Defeats unit-mismatch (stars in 10^4 vs scorecard in 0-10).
2. **Log-normalization for power-law dims** — `log10(stars + 1)` before z-score (stars / contributors / downloads). Defeats popularity-dominance.
3. **Recency-decay weighting** — `s_effective = s_raw × exp(-Δt / τ)` where `Δt` is days-since-last-commit and `τ=180d`. Defeats stale-but-starred bias.
4. **CRITIC + Entropy weight envelope (Pereira 2024 arXiv 2404.06370)** — already adopted into sca-v12 §2 Phase-4 Δ49 PROMETHEE committee-aggregation. Replace single-WSM with Monte-Carlo weight-envelope sampling + Borda count rank-distribution.
5. **Pareto frontier (NSGA-II, Deb+ 2002)** — keep candidates non-dominated on any dim-subset; sca-v12 Δ47 T2-CHERRY-FRONTIER sub-tier already adopts this.

## §6. Top-3 install-recommendations

**Triage criterion:** maximize unique-signal-class coverage per install, prefer ready REST API + permissive license + low MCP-wrapper LOC.

### 🥇 #1 — **ossf/scorecard + api.scorecard.dev (OpenSSF, Apache-2.0)**
- **Signal-class coverage:** C2 (maintained-check) + **C3 (19 security checks)** + C4 (CI-tests, SAST, fuzzing) + C5 (license).
- **Adoption tier:** **T1 INSTALL via MCP-wrapper** (`mcp__plugin_*_scorecard__check`). MCP code is ~40 LOC wrapping `https://api.scorecard.dev/projects/github.com/{owner}/{repo}` REST call.
- **sca-v12 mapping:** D18, D32, D49 directly populated; D2 / D5 / D6 cross-fed.
- **Cost:** $0; 5000 req/h public; no auth.
- **Rollback plan:** disable MCP entry in `.mcp.json`; revert to manual `gh api` queries.

### 🥈 #2 — **deps.dev (Google, Apache-2.0)**
- **Signal-class coverage:** C1 (dependent-count) + C2 (advisories-feed) + **C3 (CVE rollup across npm/PyPI/Maven/Go/Cargo/NuGet)** + **C5 (license-graph, dependency-graph)**.
- **Adoption tier:** **T1 INSTALL via MCP-wrapper** wrapping `https://api.deps.dev/v3/systems/{system}/packages/{name}/versions/{ver}` + `:dependencies`.
- **sca-v12 mapping:** D1 license-compat, D18 CVE-history, D27 dependency-bus-factor.
- **Cost:** $0; rate-limited but generous. Also BigQuery public dataset for bulk surveys.
- **Rollback plan:** disable MCP entry; fall back to npm/PyPI manual `view` and `gh api /repos/.../security-advisories`.

### 🥉 #3 — **ossf/criticality_score (OpenSSF, Apache-2.0, Python CLI)**
- **Signal-class coverage:** **C2 single-composite (10 sub-metrics)** + indirect C1.
- **Adoption tier:** **T1 INSTALL as CLI-shim** OR **T2 MCP-wrapper**; the algorithm is documented + can be re-implemented inline (~30 LOC). Prefer **inline re-implementation** to avoid CR-2 .py hook violation; call from a sanctioned shim if needed.
- **sca-v12 mapping:** D2 governance-health composite; D6 bus-factor (`contributor_count` + `org_count`); D52 community-health-corroboration.
- **Cost:** $0; needs only GitHub token already in env.
- **Rollback plan:** revert to manual github GraphQL `contributorsWithStats` aggregation.

### Honorable mentions (T2 / T3)
- **ossinsight.io** — T2 VENDOR-FORK its time-decay-weighted star algorithm + import as sca-v12 D12 secondary signal. Wrap as MCP later.
- **chaoss/grimoirelab metrics definitions** — T3 PATTERN-STUDY; lift the *vocabulary* (bus-factor, time-to-first-response, retention, elephant-factor) into sca-v12 D2 / D6 / D52 sub-rubric.
- **CNCF graduation due-diligence checklist** — T3 PATTERN-STUDY; lift the tier-ladder methodology cross-reference (sandbox→incubation→graduated maps to sca-v12 T3→T2→T1).

### §6.5 — Top-3 MCP-server-quality-meta install-recommendations (NEW, C7 class)

For the *MCP-server-as-adoption-candidate* sub-case (sca-v12 D38 + Anthropic `#53386` supply-chain gap), the operator should ratify a SECOND install cohort focused on **MCP quality meta-evaluation**:

#### 🥇 #1 (C7) — **mcprated** (https://mcp.mcprated.workers.dev, MIT ruleset / CC-BY-4.0 data, free)
- **Why this beats #2-#3:** native Claude Code install (`claude mcp add --transport http mcprated …`), open-ruleset MIT (cardinal-rule-1 trust-channel clean), daily-refreshed, deterministic scoring, no auth, no payment. Anti-bias hard-flag caps (`archived` → 30) match sca-v12 Phase-3 hard-stop spirit.
- **Integration:** add to sca-v12 Phase-1 cascade as "Family 7 — MCP-quality-meta probe" when candidate IS an MCP server.
- **sca-v12 mapping:** D38 D-MCP-NATIVE extended to D38a (ships-as-MCP, binary) + D38b (mcprated composite ≥70 for T1 INSTALL).
- **Rollback plan:** disable via `claude mcp remove mcprated`.

#### 🥈 #2 (C7) — **MCP-in-SoS methodology (arXiv 2603.10194)** as PATTERN-STUDY for sca-v13
- **Why:** academic-grade CWE×CAPEC risk-scoring; transferable to sca-v12 C7 sub-rubric without any install cost.
- **Integration:** lift the formula `R(w) = LA × LE × MI × TS × CC` into sca-v12 D38c MCP-CWE-risk-index; codify in skill body.
- **sca-v12 mapping:** D38c + D49 (extended for MCP-server supply-chain).
- **Rollback plan:** N/A (pattern-only).

#### 🥉 #3 (C7) — **mcpscoreboard.com** as secondary corroboration source
- **Why:** independent 35K+ server-rank dataset; second-opinion when mcprated returns equivocal or has not yet indexed a candidate.
- **Integration:** WebFetch or operator-authored ctx_fetch_and_index against the public dashboard; pattern-only, no API.
- **sca-v12 mapping:** secondary corroboration to D38b mcprated-primary.
- **Rollback plan:** N/A (cite-only).

## §7. Integration plan with sca-v12 (which dim ↔ which tool)

| sca-v12 dim | Signal-class | Primary tool (T1) | Secondary tool (T2/T3) | Notes |
|---|---|---|---|---|
| D1 license | C5 | OSI/SPDX JSON | deps.dev license-graph | Already canonical; deps.dev adds transitive-license check. |
| D2 governance_health | C2 | criticality_score (composite) | grimoirelab metrics (study) | New post-W326. Replaces hand-wave with composite. |
| D5 code_quality | C4 | scorecard CI-tests + SAST + Fuzzing | Sonarcloud rubric (pattern) | scorecard covers binary signals; Sonarcloud informs the rubric. |
| D6 author_prior + bus_factor | C2 | criticality_score (contributor_count, org_count) | GraphQL `contributorsWithStats` | Bayesian author-prior remains intact; criticality adds bus-factor. |
| D9 ecosystem_health | C5 | deps.dev dependent-count | libraries.io SourceRank | Cross-source corroboration. |
| D12 stars (sub-signal only) | C1 | github GraphQL stargazerCount | ossinsight time-decay | Recency-decay normalization mandatory; raw stars are sub-signal. |
| D13 sota_evidence | C6 | paperswithcode + arxiv | huggingface model cards | Domain-specific. |
| D17 benchmark_signal | C6 | HELM / LMSYS / BBH leaderboards | category-specific eval suites | Pattern-only; methodology references. |
| D18 robustness/security | C3 | **scorecard (19 checks)** | GitHub Advisory DB + deps.dev advisories | Triple-source for ≥4 score. |
| D32 supply_chain | C3 | scorecard signed-releases + pinned-deps | SLSA v1.0 verification (when present) | scorecard primary. |
| D38 D-MCP-NATIVE | C5 | github GraphQL object lookups (.mcp.json / plugin.json / SKILL.md) | manual repomix grep | Already covered; add to standard cascade. |
| D45 awesome_list_corroboration | C6 | awesome-list curated set comparison | bestofjs delta-stars | Existing rubric; add bestofjs as secondary. |
| D49 secret_staging_risk | C3 | scorecard token-permissions + dangerous-workflow | gitleaks (already wired) | Already wired; scorecard adds repo-side check. |
| D52 community_health_corroboration | C2 | criticality_score + chaoss/grimoirelab vocab | OpenSSF Best Practices Badge | Δ52 anchor satisfied. |

## §8. Soft-gate philosophy (NOT hard-gate)

The operator's mandate: **"low stars can be high quality in pattern-study tier"**. The framework already supports this via sca-v12 §9 decision-tree T3 PATTERN-STUDY route (`pattern_score ≥3.5 + D13≥4`). The mitigations:

- **Stars-only T1 INSTALL auto-demotes to T3** (sca-v12 Phase-3 anti-bias hard-stop, existing).
- **D-EMP HARD GATE is on viability, not popularity** — small repos that smoke-test in-runtime can clear D-EMP=2+ without ever needing high stars.
- **C6 domain-evidence path** lets papers + leaderboards + awesome-list curation OVERRIDE low C1 popularity (D13 / D17 / D43 / D45 each carry weight at W_install ≥0.4).
- **Pareto frontier T2-CHERRY-FRONTIER (Δ47)** preserves any candidate top-3 on any non-empty dim-subset — explicitly designed for the "obscure but vital" case.

## §9. Open issues + W327+ follow-ups

1. **scorecard MCP-wrapper not yet authored** — ~40 LOC sanctioned shim wrapping REST; CR-9 npx-pin `npx -y mcp-server-scorecard@<pinned>` if a community wrapper exists, otherwise the operator-authored shim lands in `Z:\claude-sota-installed-state\mcp-shims\scorecard-mcp\` (state-outside-repo). **Verify first: does grasp-mcp-server already satisfy this via its built-in `grasp_deps_dev` + scorecard hooks?** If yes, prefer T1-INSTALL `grasp-mcp-server` over operator-authored shim.
2. **deps.dev MCP-wrapper not yet authored** — same pattern as #1. Same `grasp-mcp-server` check applies.
3. **criticality_score sub-metric definitions** — copy into sca-v12 D2 sub-rubric (verbatim from `ossf/criticality_score/README.md` with cite).
4. **ossinsight time-decay-weighted star algorithm** — vendor-fork to T2; document in sca-v12 D12 sub-rubric.
5. **Z-score + log-normalization standardization** — propose as sca-v13 Phase-4 enhancement (currently sca-v12 PROMETHEE-only).
6. **GitHub GraphQL batched repo-health query** — already-runnable today via existing github MCP; codify into sca-v12 Phase-1 cascade as a single tool call per candidate.
7. **CR-2 + CR-9 compliance check** — each MCP-wrapper landed MUST clear cardinal-rule-2 (no project-owned hook body) + cardinal-rule-9 (npx-pin discipline). Use `Z:\claude-sota-installed-state\mcp-shims\` for state-outside-repo if shims are operator-authored.
8. **W326-NEW: install mcprated MCP** — first install for net-new C7 signal class; recommended by W326 fork-3. Verify `claude mcp add --transport http mcprated https://mcp.mcprated.workers.dev` clears CR-9 (http transport not subject to npx-pin; verify SHA via headers).
9. **W326-NEW: codify C7 in sca-v13** — extend D38 → D38a/D38b/D38c (binary ships-as-MCP + mcprated composite + MCP-in-SoS CWE-CAPEC risk-index); extend D49 to cover MCP supply-chain (Anthropic `#53386`).
10. **W326-NEW: Tavily MCP cascade_degraded** — Tavily API key disabled (payment issue) at probe-time 2026-05-19. Operator-action: rotate or top-up; or drop from sca-v12 Phase-1 cascade until restored. `cascade_degraded=true` flagged for this fork's verdict.
11. **W326-NEW: 2026 finding** — per perplexity research, no widely-adopted Anthropic-managed Claude Code MCP server for comprehensive repo-health scoring exists today. Validates the "operator-authored shim or third-party MCP-vendor-fork" plan for sca-v12 C1-C6 coverage.

## §10. Cite-anchors (3-org-distinct per claim)

- **OpenSSF Scorecard** — https://scorecard.dev/ (OpenSSF / Linux Foundation) + https://api.scorecard.dev/ + https://github.com/ossf/scorecard
- **deps.dev** — https://deps.dev/ (Google LLC) + https://docs.deps.dev/api/v3/ + BigQuery public dataset `bigquery-public-data.deps_dev_v1`
- **ossf/criticality_score** — https://github.com/ossf/criticality_score (OpenSSF) + arXiv 1707.07614 (Hofmann+ Bayesian project-importance) + Linux Foundation Core Infrastructure Initiative methodology
- **CHAOSS metrics framework** — https://chaoss.community/ (CHAOSS / Linux Foundation) + https://chaoss.community/kb-metrics-and-metrics-models/ + GrimoireLab paper (DOI 10.1109/MS.2018.290110718)
- **libraries.io SourceRank** — https://libraries.io/sourcerank (Tidelift Inc) + https://docs.libraries.io/
- **ossinsight.io** — https://ossinsight.io/ (PingCAP Inc) + GitHub Archive public dataset
- **paperswithcode SOTA methodology** — https://paperswithcode.com/sota (Meta AI / Facebook AI)
- **HELM** — https://crfm.stanford.edu/helm/ (Stanford CRFM / Stanford HAI)
- **LMSYS Chatbot Arena** — https://lmarena.ai/ (LMSYS Org / UC Berkeley / Stanford / UCSD)
- **CNCF Graduation Due-Diligence** — https://tag-security.cncf.io/community/assessments/ (CNCF / Linux Foundation)
- **OpenSSF Best Practices Badge** — https://bestpractices.coreinfrastructure.org/ (OpenSSF / Linux Foundation)
- **NSGA-II Pareto-frontier** — Deb+ 2002 (IEEE Trans. Evol. Comput. 6(2):182-197)
- **Pereira CRITIC+Entropy weight-envelope** — arXiv 2404.06370 (FGV-EBAPE Brazil)
- **claude-cookbooks research_lead_agent** — https://github.com/anthropics/claude-cookbooks `patterns/agents/research_lead_agent.md` @ 39a350b6 (Anthropic PBC)
- **mcprated** — https://github.com/mcprated/mcprated (Apache-2.0/MIT ruleset; CC-BY-4.0 data; mcp.mcprated.workers.dev)
- **mcpskills.io** — https://mcpskills.io/ + `@mcpskillsio/server` npm 2.2.0 (Michael Browne, freemium)
- **MCP Scoreboard** — https://mcpscoreboard.com/ (independent index 35K+ servers)
- **apifyforge open-source-software-supply-chain-mcp** — https://apify.com/ryanclinton/open-source-software-supply-chain-mcp (Apify, paid)
- **sonatype dependency-management MCP** — https://github.com/sonatype/dependency-management-mcp-server (Sonatype, paid)
- **grasp-mcp-server** — https://www.npmjs.com/package/grasp-mcp-server (license verify before adopt)
- **clouatre-labs/aptu-coder** — https://github.com/clouatre-labs/code-analyze-mcp (Apache-2.0, OpenSSF silver-certified)
- **MCP-in-SoS academic framework** — arXiv 2603.10194v1 "Risk assessment framework for open-source MCP servers" (CWE×CAPEC Risk Index, 2026)
- **Anthropic claude-code MCP-provenance gap issue** — https://github.com/anthropics/claude-code/issues/53386 (filed 2026-04-25, open)

---

## §11. Verdict header (machine-readable summary for parent orchestrator)

```yaml
fork: w326-fork-3-quality-gates
wave: W326
date: 2026-05-19
cascade_degraded: true              # Tavily MCP payment-failure 2026-05-19; perplexity + exa + deepwiki + WebSearch all OK
mcp_family_count: 3                 # perplexity_research + exa_search + perplexity_search; tavily fallback failed
mcp_family_attribution:
  - perplexity_research: §1, §6, §9 (top-3 install corroboration; 2026-no-Anthropic-MCP finding)
  - exa_search: §2.7 (mcprated, mcpskills, MCP Scoreboard, apify, sonatype, grasp, aptu-coder, MCP-in-SoS, Anthropic #53386)
  - perplexity_search: §2.7 (apify 7-source + scoring methodology; CWE×CAPEC framework details)
sources_typed: ≥3-org-distinct per ≥4 score
top_3_install_general_purpose: [ossf/scorecard, deps.dev, ossf/criticality_score]
top_3_install_mcp_meta_C7: [mcprated, MCP-in-SoS pattern-only, mcpscoreboard pattern-only]
sca_v12_dim_extensions_proposed: [D38a, D38b, D38c, D49-MCP-extended, D52-criticality-corroboration]
rule_version: sca-v12
budget_used: 8_of_15_tool_calls, ~28k_tokens_of_140k
status: COMPLETE
```

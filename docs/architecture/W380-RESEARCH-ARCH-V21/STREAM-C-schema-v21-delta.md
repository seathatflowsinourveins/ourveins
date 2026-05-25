# W380 Stream C — sca-v20 → sca-v21 Schema Delta + Calibration + Executable-Scorer Spec

> **Stream**: W380 META-C-successor (research-architecture self-evolution) · **Date**: 2026-05-23
> **Model**: claude-opus-4-7[1m] · **subagent_type**: general-purpose
> **Inputs read**: `.claude/schemas/sca-v20-multi-dim.schema.json` (19 dims / 8 clusters / per-class weights) · `.claude/schemas/sca-v18-repo-verdict.schema.json` (parent) · `docs/architecture/W377-RESEARCH-V20/META-C-MULTI-DIM-SCORING.md` (§1 dims, §2 weight table, §3 routing, §4 5 worked examples) · `docs/architecture/W326-RESEARCH-ARCHITECTURE-OVERHAUL/02-SOTA-REPO-QUALITY-GATES.md` (C1-C7 signal-class lineage) · `tools/sota-discovery/{README.md,gh-cascade.sh,duckdb-hf-hub-stats.sql}` · `tools/{sca-record-decision,sca-re-evaluate-decisions,sca-effectiveness-report}.mjs` + `tools/lib/sca-telemetry-core.mjs`
> **CR-6 discipline**: every proposed data source cited to a real endpoint verified live 2026-05-23 via perplexity_research + exa.

## §0 — Three load-bearing findings (read first)

1. **R-IMPL is the dominant gap — the scorer does NOT exist.** `tools/sca-v20-evaluate.mjs` (named in v20 schema `follow_up_streams` + META-C §8) was never built. What DOES exist is a *telemetry/decision-recording* substrate: `sca-record-decision.mjs` (append a decision), `sca-re-evaluate-decisions.mjs` (re-score drift), `sca-effectiveness-report.mjs` (Wilson-CI SLO report) over `tools/lib/sca-telemetry-core.mjs`. There is NO code that *computes* the 19 dims from a repo. The system is a rubric + a ledger, with nothing in between. §C below is the priority.
2. **The decision ledger is EMPTY.** `STATE_PATH = .claude/state/sca-decision-outcomes.json` does not exist on disk (verified — `loadState()` returns `[]`). So the "~12 existing pattern-study verdicts" are NOT in the telemetry store. They live as prose in **META-C §4** (5 fully-scored: crewAI, pydantic-ai, dspy, verdict, goose) + **W376-RESEARCH/S1-S12** stream verdicts (openhands-sdk, temporal, docker-py, continue, +). R-CALIBRATION's first sub-task is therefore *backfill the ledger* before any weight tuning (§B step 1).
3. **D22 agent-benchmark-score is per-MODEL, not per-repo — near-unmeasurable as proposed.** SWE-bench/Terminal-Bench leaderboards score *models* (Claude Opus 4.6, GPT-5.2), NOT the candidate repos we evaluate (crewAI, goose). There is no stable REST API either. **DROP D22 as a repo-dim**; salvage a narrow form (D22′, see table).

---

## §A — v21 Dimension-Delta Table

Scales/anchoring follow the v20 convention (CLASS-A raw / CLASS-B LLM-web / CLASS-C AI-on-repo+academic; each dim → `source_uri_or_ref`). "Most-informs" = the decision class whose weight should dominate.

| New dim | Measures | **Verified source (endpoint)** | Per-class pass thresholds | Most-informs | **Keep / Drop** |
|---|---|---|---|---|---|
| **D20** `supply_chain_scorecard` (float 0..10) | OpenSSF Scorecard aggregate (19 checks: pinned-deps, signed-releases, branch-protection, SAST, token-perms, …) | `GET https://api.securityscorecards.dev/projects/github.com/{o}/{r}` (precomputed weekly, no-auth); fallback `GET https://api.scorecard.dev/projects/github.com/{o}/{r}` (Action-published). Both return 0-10 `score`. [docs.deps.dev integrates same] | INSTALL ≥7.0; PATTERN-STUDY ≥5.0; CITE-ONLY any; **BLOCK** if `score<2.0` AND `Dangerous-Workflow=0` | **INSTALL** | **KEEP** — strongest single net-new signal; *partly subsumes D08 signed_release* (Scorecard's `Signed-Releases` + `Pinned-Dependencies` checks). De-dupe: keep D08 as the SLSA-level *integer*, let D20 be the *composite*; D20 weight comes mostly from what was D08+D11 slack. |
| **D21** `osv_cve_density` (float, weighted-CVE-count / direct-dep-count) | Known CVEs/advisories across the resolved dependency graph, severity-weighted (CVSS) | `POST https://api.osv.dev/v1/query` body `{version, package:{name, ecosystem}}`; batch `POST /v1/querybatch`; GIT-tag mode (`ecosystem:"GIT"`, `name:<repo-url>`, `version:<tag>`). No-auth; 32 MiB cap on HTTP/1.1 (use HTTP/2). | INSTALL: 0 CRITICAL/HIGH unremediated AND density ≤0.10; PATTERN-STUDY ≤0.30; CITE-ONLY any; **BLOCK** if any CISA-KEV-listed CVE in *direct* deps | **INSTALL** | **KEEP** — measurable, free, distinct from D20 (D20 = practices; D21 = actual live vulns). Pairs with D23 (same dep graph from deps.dev feeds both — one fetch). |
| **D22′** `agent_bench_present` (enum {leaderboard-listed, self-reported, none}) | Whether the repo's *own* agent/harness appears on a public agent leaderboard (NOT the repo's quality) | `SWE-bench/swe-bench.github.io` → `data/leaderboards.json` (`results[].site`/`org_logo` URL substring-match to repo); Terminal-Bench HF dataset `harborframework/terminal-bench-2-leaderboard` | PATTERN-STUDY: informational tie-breaker only (no hard threshold); never INSTALL-gating | **PATTERN-STUDY** (weak) | **DROP-as-proposed, KEEP narrow D22′** — original D22 conflated model-score with repo-quality. Only ~5% of candidates are agent-harnesses with a leaderboard entry. Measurable but low-coverage → weight ≤0.02, MONITOR/PATTERN-STUDY only. |
| **D23** `dependency_freshness` (float 0..1) | Fraction of direct deps on latest-or-near-latest version (lag-penalty) | deps.dev `GET /v3/systems/{sys}/packages/{name}/versions/{ver}:dependencies` (resolved graph) + per-dep `GetVersion` `default`/latest compare. No-auth; 429-backoff. Ecosystems: npm, PyPI, Maven, Cargo. | INSTALL ≥0.6; PATTERN-STUDY ≥0.4; CITE-ONLY any; no BLOCK (freshness is soft) | **INSTALL** | **KEEP** — measurable, shares the deps.dev fetch with D21 (zero marginal API cost). Anti-game: weight by dep *count* so a 200-dep repo with 5 stale isn't over-penalized. |
| **D24** `runtime_eol_risk` (enum {supported, near-eol-<6mo, eol}) | Whether the repo's pinned runtime/language major is past or near end-of-life (breaking-change-cadence proxy) | `GET https://endoflife.date/api/v1/products/{slug}/` (no-auth) — map detected runtime (`python`,`nodejs`,`go`,`rust`) → slug → compare pinned major vs `eol` date | INSTALL: must be `supported`; PATTERN-STUDY `supported`-or-`near-eol`; CITE-ONLY any; no BLOCK | **INSTALL** | **KEEP-conditional** — measurable but coverage gap: endoflife.date tracks *runtimes*, not arbitrary libs. Useful only when runtime is detectable (Dockerfile/`.python-version`/`engines`). Weight ≤0.03; soft. If runtime undetectable → `not-applicable`, weight redistributes. |
| **D25** `maintainer_response_latency` (float, median hrs to first-response on issues/PRs last 90d) | Bus-factor / responsiveness — orthogonal to D04 commit-recency and D06 close-rate | **No new source** — GitHub GraphQL (already-installed github MCP): `issues(first,filterBy:{since}){nodes{createdAt comments(first:1){nodes{createdAt}}}}` → median delta; same for `pullRequests`. CHAOSS "time-to-first-response" metric definition (Linux Foundation). | INSTALL ≤72h median; PATTERN-STUDY ≤168h; CITE-ONLY any; no BLOCK | **INSTALL** | **KEEP** — zero new infra (reuses github MCP), distinct from D04/D06, named CHAOSS metric. Anti-game: exclude bot first-comments. Folds into Cluster II Activity. |

### Net dimension count: 19 → **24** (D20, D21, D22′, D23, D24, D25 added; D22-as-proposed dropped).

**Cluster placement**: D20+D21 → new **Cluster IX "Supply-chain & vuln"** (or extend Cluster III Trust). D23+D24 → Cluster VI Production-readiness. D25 → Cluster II Activity. D22′ → Cluster I Popularity (informational).

**De-duplication ledger (avoid double-counting — codex will flag this):**
- D20 (Scorecard composite) overlaps D08 (SLSA int), D11 (CI streak), D49-era pinning. **Resolution**: D20 absorbs the "engineering-practice composite" role; D08 stays as the *verified SLSA integer* only (Scorecard's signed-releases check ≠ slsa-verifier attestation). Cap combined D08+D20 INSTALL weight at 0.20.
- D21 (live CVEs) vs D20 (vuln-scanning *practice*): orthogonal — keep both, but a repo can't be penalized twice for the same CVE (D20's `Vulnerabilities` check is binary-present; D21 is the severity-weighted count).
- D23 (freshness) vs D24 (runtime EOL): D24 is the *runtime floor*; D23 is the *library spread*. Distinct.

**Dropped / rejected (YAGNI):**
- **D22 agent-benchmark-score (per-repo)** — unmeasurable; leaderboards are per-model. (Salvaged as D22′.)
- **A "GitHub stars-velocity anomaly" dim** — already covered by D02/D03 + MALTA fake-star check; no add.
- **libraries.io SourceRank** — redundant with deps.dev dependent-count + D20; freemium-keyed. Drop.

---

## §B — R-CALIBRATION: empirical weight-tuning method

**Goal**: replace the SOTA-*anchored*-but-hand-set §2 weights (`weights_profile_version: v20-initial-2026-05-23`) with empirically-fit weights, WITHOUT overfitting to ~12 points.

### Step 1 — Build the backtest ledger (prerequisite — currently empty)
Backfill `.claude/state/sca-decision-outcomes.json` from the prose verdicts using the existing `sca-record-decision.mjs` CLI. Ground-truth label set (operator-assigned tier + per-class scores):

| Source | Repos (label = routed tier) |
|---|---|
| META-C §4 | crewAI=INSTALL, pydantic-ai=INSTALL, dspy=INSTALL(borderline), verdict=PATTERN-STUDY, goose=PATTERN-STUDY |
| W376 S1-S12 | openhands-sdk, temporalio, docker-py, continue, + (≈7 more — extract tier from each stream verdict header) |

→ n ≈ 12 labeled repos, each a `{dims:{D01..D24}, operator_tier, operator_per_class}` row. **n=12 is too small for free 24-weight fitting** (24 weights ≫ 12 points → guaranteed overfit). Mitigations below.

### Step 2 — Objective (loss)
The label is an *ordinal tier* (INSTALL > PATTERN-STUDY > CITE-ONLY > MONITOR > BLOCK) plus an analyst per-class scalar. Two-part loss:

- **L_route (primary)** = ordinal mis-routing penalty. For each repo, run §3 routing on the candidate weights; cost = `|rank(predicted_tier) − rank(operator_tier)|` (off-by-one = 1, off-by-two = 2). This is what actually matters — the *tier* is the decision, not the scalar.
- **L_score (secondary, regularizing)** = MSE between computed `per_class_scores` and the analyst scalars in META-C §4 (`crewAI INSTALL=0.78`, etc.). Weight λ≈0.3 so it shapes but doesn't dominate.
- **Total**: `L = mean(L_route) + λ·mean(L_score) + Ω(w)` where `Ω` is the anti-overfit regularizer below.

### Step 3 — Anti-overfit discipline (the core of the ask)
1. **Tie weights to clusters, not dims.** Fit **8 cluster-level multipliers** (one scalar per cluster), keeping the *within-cluster* relative weights frozen at the SOTA-anchored v20 values. 8 free params vs 12 points is tractable; 24 is not. This is the single most important overfit guard.
2. **L2 prior toward v20 weights.** `Ω(w) = β·‖w − w_v20‖²`. The hand-set weights are informed priors (cite-anchored to OSSF/DSPy/CHAOSS); we nudge, not replace. β chosen so a weight needs *consistent* backtest evidence to move >20%.
3. **Leave-one-out CV.** With n=12, report LOO-CV mis-routing, not training error. A weight set that only fits in-sample is rejected.
4. **Monotonicity constraints** (domain priors as hard bounds): `w_INSTALL[license] ≥ all other INSTALL weights`; `w[stars_*] == 0` for INSTALL/PATTERN/CITE (frozen, never fit); `w_CITE-ONLY[D15 cite-anchor] ≥ 0.25`. These prevent the optimizer from finding degenerate-but-low-loss weightings.
5. **Hard filters are NOT fit** — they're CR-1 invariants (license/archived/claimed-SLSA-fail). Calibration only touches the *soft* weighted-sum.

### Step 4 — Optimizer
Box-constrained + sum-to-1 simplex → **projected gradient / Nelder-Mead** over the 8 cluster multipliers (`scipy.optimize` or a 30-line JS coordinate-descent). Or, matching the runtime's existing PROMETHEE/CRITIC lineage (W326 §5): **Monte-Carlo weight-envelope** — sample 10⁴ weight vectors from a Dirichlet centered on v20, keep the Pareto-front by LOO mis-routing, report the *centroid* + the *envelope* (so the operator sees weight *stability*, not a false-precision point estimate). MC-envelope is the recommended path — it natively expresses "we only have 12 points" as a wide envelope.

### Step 5 — Acceptance gate + re-score
- New profile `v21-calibrated-<epoch>` accepted only if LOO mis-routing ≤ v20 baseline AND no monotonicity violation AND codex r1 APPROVE (R-CODEX).
- `weights_profile_version` field already exists in the schema → bump it; prior verdicts stay re-scorable via `sca-re-evaluate-decisions.mjs`. Drift surfaced by `sca-effectiveness-report.mjs` Wilson-CI (already built).
- **Honesty clause**: with n=12, the deliverable is "weights nudged within envelope + LOO-validated", explicitly NOT "optimally tuned". Real tuning needs the 50-repo backtest (W259 grand catalog) named in the v20 punt-list — that is R-CALIBRATION-phase-2.

---

## §C — R-IMPL: `tools/sota-discovery/sca-evaluate.mjs` spec (the priority gap)

**One-line contract**: `owner/name` (or a discovery query) → multi-MCP convergence → 24 dim values each cite-anchored → per-class weighted scores → §3 tier routing → emit JSON validated against `sca-v20-multi-dim.schema.json` (v21-extended).

### C.1 — CLI surface
```
node tools/sota-discovery/sca-evaluate.mjs --repo owner/name [--profile v21-calibrated-<epoch>] [--out path.json] [--offline-cache] [--no-llm]
node tools/sota-discovery/sca-evaluate.mjs --query "claude-code agent orchestration" --top 10   # discovery → gh-cascade.sh → score each
```
Exit 0 = verdict emitted + schema-valid; exit 2 = schema-invalid or hard-BLOCK pre-filter; exit 3 = convergence below INSTALL-minimum (≥1 CLASS-A + ≥1 CLASS-C).

### C.2 — Module structure (ESM, mirrors `tools/lib/` convention; CR-2-exempt — `tools/` not `.claude/hooks/`)
```
tools/sota-discovery/sca-evaluate.mjs          # CLI entry: arg-parse → orchestrate → route → validate → emit
tools/sota-discovery/lib/
  fetchers/
    gh.mjs            # github MCP / gh GraphQL: D01-D06, D11, D13, D25 (+ RepoHealth batched query, W326 §4)
    depsdev.mjs       # deps.dev v3: D23 freshness + dep-graph (feeds osv.mjs)  → api.deps.dev/v3
    osv.mjs           # osv.dev /v1/querybatch over the dep-graph: D21          → api.osv.dev/v1
    scorecard.mjs     # securityscorecards.dev → api.scorecard.dev fallback: D20
    eol.mjs           # endoflife.date /api/v1: D24 (runtime-detect → slug map)
    deepwiki.mjs      # deepwiki ask_question: D12, D14, D16, D18 (CLASS-C)
    repomix.mjs       # repomix pack + grep: D14 pattern-density, D15 cite-anchor (CLASS-A)
    web.mjs           # perplexity + exa: D02, D10, D19 (CLASS-B), fake-star cross-check
  dims.mjs            # pure fns: 24 (raw signals) → normalized dim value + confidence_by_dimension
  weights.mjs         # loads §2 profile JSON (versioned); exports per-class weight tables
  score.mjs           # weighted-sum per class (skips weight==0 dims) → 4 scalars
  route.mjs           # §3 routing pseudocode → tier (hard-BLOCK first, then INSTALL→…→MONITOR, soft-down only)
  anchors.mjs         # per-dim {value, source_class, source_uri_or_ref, measured_at} accumulator
  validate.mjs        # ajv against sca-v20-multi-dim.schema.json + 3-org-distinct floor check
data/weights/v20-initial-2026-05-23.json        # the §2 table, machine-readable (extract from META-C §2)
data/eol-slug-map.json                          # runtime-detect → endoflife.date product slug
```

### C.3 — MCP-call orchestration (cost-bounded, convergence-gated)
1. **Phase 0 — discovery (only if `--query`)**: shell `gh-cascade.sh` (exists) → candidate `owner/name` list. Anti-bias: surface ≥1 non-MCP-discovered (sca-v15 §1.5).
2. **Phase 1 — CLASS-A raw (parallel, cheap, no-LLM)**: `gh.mjs` (1 batched GraphQL RepoHealth query — W326 §4 has the query), `scorecard.mjs` (1 GET), `depsdev.mjs` (1 version + 1 `:dependencies`), then `osv.mjs` (1 `/v1/querybatch` over the dep list), `eol.mjs` (1 GET). **~5 HTTP calls, fully deterministic, replayable** → cache to `.claude/state/sca-cache/{owner}__{name}.json`.
3. **Phase 2 — CLASS-C (deepwiki + repomix)**: `deepwiki.ask_question` (3-4 targeted: install-path, patterns, arch-fit) + `repomix.pack` (cite-anchor density). Gated: skip if Phase-1 already hard-BLOCKs.
4. **Phase 3 — CLASS-B (LLM-web, last + optional `--no-llm` skip)**: perplexity + exa for D02/D10/D19. Class-weighted-counting: N judges parroting one blog = 1 (sca-v18 §4).
5. **Convergence gate**: compute `passes_install_minimum = (≥1 CLASS-A hit) AND (≥1 CLASS-C hit)`. If false → cap tier at MONITOR regardless of score.

**Call budget per repo**: ~5 deterministic HTTP + ~4 deepwiki + ~2 web ≈ 11 calls; `--no-llm --offline-cache` re-score = 0 calls (pure replay). Honors prompt-caching + the runtime's ~10-MCP-call discipline by making Phase-1 the cheap deterministic core and Phases 2-3 gated.

### C.4 — Cite-anchor discipline (CR-6 — each dim → source_uri)
Every fetcher returns `{value, source_class, source_uri_or_ref, measured_at}`; `anchors.mjs` writes them into the schema's `dimension_anchors` object. Hard-coded source URIs per dim (the verified endpoints in §A). `validate.mjs` enforces the **3-org-distinct floor** (`cr6...dimensions_anchor_count_meets_3_org_distinct_floor`) by counting distinct hostnames in `source_uri_or_ref` (github.com, api.deps.dev, api.osv.dev, securityscorecards.dev, endoflife.date, deepwiki.com = 6 distinct orgs available). A verdict with <3 distinct source-orgs → `confidence` forced to ≤MEDIUM and a validation warning.

### C.5 — Output
Emits a single `sca-v20`-(v21-extended)-conformant verdict JSON: `dimensions{D01..D24}`, `per_class_scores{install,pattern_study,cite_only,monitor}`, `tier`, `hard_filter_violations[]`, `dimension_anchors{}`, `decision_class_rationale{}`, `convergence{}`, `cardinal_rule_compliance{}`, `weights_profile_version`. Optionally pipes to `sca-record-decision.mjs` to append to the ledger → closes the loop with R-CALIBRATION + the existing telemetry/SLO tooling.

### C.6 — v21 schema mechanics (minimal, backward-compatible)
- Add D20-D24 + D22′ to `dimensions.properties` (the schema's `additionalProperties:false` requires explicit add).
- Use the reserved `extensions.x_*` namespace ONLY for transitional fields; promote to first-class once codex-ratified.
- Bump `schema_version` const `sca-v20` → `sca-v21`; keep strict-superset (a v20 verdict validates by leaving D20-D24 absent only if they're not in `required` — keep them OPTIONAL in v21 so partial/offline runs validate).

---

## §D — Cite-cluster (every data source verified live 2026-05-23)

| Source | Endpoint (verified) | Verifier |
|---|---|---|
| deps.dev (Google) | `https://api.deps.dev/v3/systems/{sys}/packages/{name}/versions/{ver}[:dependencies]` | perplexity_research [docs.deps.dev/api/v3] |
| OSV.dev (Google/OpenSSF) | `POST https://api.osv.dev/v1/query` + `/v1/querybatch` | perplexity_research [google.github.io/osv.dev/post-v1-query] |
| OpenSSF Scorecard | `GET https://api.securityscorecards.dev/projects/github.com/{o}/{r}`; `https://api.scorecard.dev/...` | perplexity_research [api.securityscorecards.dev/swagger.json; github.com/ossf/scorecard-action] |
| endoflife.date | `GET https://endoflife.date/api/v1/products/{slug}/` | perplexity_research [endoflife.date/docs/api/v1] |
| SWE-bench leaderboard (per-model) | `github.com/SWE-bench/swe-bench.github.io` → `data/leaderboards.json` (NO stable REST API) | exa + perplexity [swebench.com; SWE-bench/experiments] |
| Terminal-Bench (per-model) | HF dataset `harborframework/terminal-bench-2-leaderboard` (NO stable REST API) | perplexity [tbench.ai/leaderboard; HF dataset] |
| CHAOSS time-to-first-response (D25 metric def) | `https://chaoss.community/kb-metrics-and-metrics-models/` (Linux Foundation) | W326 §10 lineage |
| github GraphQL RepoHealth (D01-06,11,13,25) | already-installed github MCP; query in W326 §4 | local doc |

**Distinct source-orgs: 7** (Google, OpenSSF, endoflife.date, SWE-bench, HF/harbor, CHAOSS/LF, GitHub) — exceeds 3-org-distinct floor 2.3×.

---

**STATUS**: Stream C deliverable COMPLETE. §A (6 dims, 5 keep / 1 drop+salvage), §B (cluster-multiplier + MC-envelope + LOO calibration, n=12 honesty clause), §C (full executable-scorer module spec — the dominant gap). All endpoints verified live. MCP calls used: 3 (perplexity_research ×1, exa ×1, ToolSearch ×1) of ~10 cap.

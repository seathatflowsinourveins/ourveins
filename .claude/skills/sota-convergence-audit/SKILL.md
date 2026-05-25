---
name: sota-convergence-audit
description: Use when evaluating new repos/skills/plugins/MCP for SOTA fit, install tier, pattern-only adoption, or rubric-based ranking. Triggers on "audit", "tier", "rank", "evaluate", "SOTA fit", "should we install X".
---

# sota-convergence-audit (sca-v20 — W369 P1.6 G meta-patterns incremental dim-absorb)

Vet ONE adoption candidate — repo, plugin, MCP server, skill, or pattern — and return a defensible **T0 / T1 / T1-PROV / T2 / T2-CHERRY / T3 / T4 / T5** verdict with cited evidence and rollback plan, before anything is installed or merged.

Sister skill to `goal-prompt-synthesis` (predicate authoring) and `ops-rhythm` (P0 dwell-threshold escalation governance). That trio: `goal-prompt-synthesis` writes a `/goal`; `sca` vets candidates surfaced by `/goal`; `ops-rhythm` governs wave-cadence escalation for P0 SHIP-BLOCKER carry-forward. Deliverable here is a **verdict with cited evidence + rollback plan**, not the install itself.

> **v20 lineage** (terse): v1 W269 → v3 W288 (14 dims) → v3.1 W293 (+D16-D18) → v5 W299 (+D19-D21 multi-MCP cascade) → v6 W310 (+D22-D23) → v7 W314 (+D25-D33) → v7.1 W316 (+D34 7-tier ladder Stage-0 existence-probe) → v7.2 W317 (+D36-D37 META) → v8.1-partial W319 (+D-EMP HARD GATE +D35) → v9 W324 (+D38-D41 CC-runtime R5 5-control layered-defense) → v10 W325 (+D42-D45 corroboration signals D34 W_install 0.7→0.9) → v11 W326-W327 (+D46-D49 INV/ship/sandbox/secret +D52-D65 deep-research-dim; K-3 T/M/E-skip taxonomy; K-7 ops-rhythm cross-ref) → v12 W328 (Δ47-Δ52 +D66 markitdown probe-record; denom_install 39.4→39.8) → v12.1 W329 (Δ33 reframe +§1.5 Stage-0.5 ENUMERATION-BYPASS) → v13 W332 (+D67-D72; denom_install 39.8→42.5) → v14 W337 (+D73-D75 + D12-swap; denom_install 42.5→44.0) → v15 W340 (+D76-D80; denom_install 44.0→46.9) → v16 W343 (D80 measurable evidence-table) → v17 W344 Stream Z5 (+D81-D83; denom_install 46.9→48.5, pattern 21.8→22.9) → v19 W367 Stream E design (+D84-D100 supply-chain/CC-runtime-consolidate/decision-tier; +composite_denom_cite as 3rd composite; denom_install 48.5→57.5, pattern 22.9→29.4, **cite=12.0** new) → **v20 W369 P1.6** (+D101-D105 from W367 Stream G research-arch meta-patterns: Pareto-frontier-as-primitive promotion, Chain-of-Verification factored mode, Jury-on-Demand instance-reliability weighting, Plan-executor-publisher separation, Judge-human Cohen's-κ z-score; denom_install 57.5→**59.8**, pattern 29.4→**30.7**, cite 12.0→**13.4**; D101 PROMOTES §Δ47 Pareto-frontier from sub-tier to top-level primitive — closes "single-best-only" anti-stagnation loophole; D102 CLOSES W341 hallucinated-SHA-cite failure mode at rubric layer per Meta AI CoVe factored-mode evidence).
>
> **Full D1-D49+D52-D65+D66+D67-D75 dim catalog**: see `references/dimensions.md` (loaded on-demand; SKILL.md ≤500 LOC index per CLAUDE.md cardinal pointer-only discipline).

## When to use

- Operator names a repo/plugin/MCP/skill and asks whether to adopt it.
- A `/goal` or agent returns an "adopt this" recommendation that needs ratifying.
- An incumbent primitive is being compared against a proposed replacement.

Do NOT use for: authoring a skill (use `skill-creator`); routine `/loop` re-entries with no live adoption question; single-file edits.

---

## §1. Stage-0 Existence Probe (Δ33 — v12.1 reframe — right-tool-for-job)

**Mandatory PRE-cascade gate.** Before tier-routing or scoring, verify the candidate slug exists. ≥2 distinct families MUST return ≥1 hit; ≥2 returning 0 hits AND no positive hit → AUTO-REJECT `T5 NON-EXISTENT-CANDIDATE / HALLUCINATED-DISCOVERY`.

**v12.1 reframe (W329 per W328-S1 USER-ERROR-CONFIRMED + W328-S2 + W329-S2-REAUDIT root cause UNDETERMINED)**: the prior 5-wave "HF-MCP silent-fallback" narrative is WITHDRAWN (W328-S1 confirmed query is substring-on-IDs not free-text-tokenized). The W328-S2 "GitHub-MCP silent-fallback -> USER-ERROR-CONFIRMED" verdict is also RETRACTED by W329-S2-REAUDIT (live API probes refute both the original W328-S2 invalid-qualifier premise AND the codex GPT-5.5 round-1 counter-hypothesis — root cause of original 0-result observations remains UNDETERMINED). The Stage-0 multi-family probe pattern is RETAINED but reframed: **choose the right tool for the job — `get_repository` for slug-existence (rate-limit-budget reasons, NOT qualifier-invalidity).**

| # | Probe family | Tool | Correct usage | Pass criterion |
|---|---|---|---|---|
| 1 | github-MCP exact-slug | `mcp__plugin_everything-claude-code_github__get_repository` | `{owner, repo}` — direct `GET /repos/{owner}/{repo}` | non-404 = exists (canonical Stage-0 probe per W328-S2 + W329-S2-REAUDIT — preferred for rate-limit-budget reasons: core 5000/hr vs search 30/min, NOT due to search_repositories qualifier-invalidity) |
| 2 | github-MCP search | `__search_repositories` | Valid `/search/repositories` qualifiers: `topic:`, `language:`, `stars:`, `pushed:`, `created:`, `fork:`, `in:name`, `in:readme`, `user:`, `org:`, **`repo:owner/name`** (exact-slug filter — valid per W329-S2-REAUDIT live probes), **`owner:<value>`** (undocumented but functionally accepted synonym of `user:`/`org:`). Prefer `get_repository` for exact-slug lookups for rate-limit-budget reasons. | `total_count >= 1` AND `IncompleteResults` field checked |
| 3 | github-REST | `gh api /repos/<owner>/<repo>` | direct lookup; NOT `/search/repositories?q=<slug>` | HTTP 200 |
| 4 | hf-MCP | `mcp__hf-mcp-server__hub_repo_search` | single-token `query` OR `filters: [<tag>]` with NO `query`. **NEVER** multi-word free-text (substring match on repo IDs only per W328-S1). | non-empty result list |
| 5 | deepwiki | `mcp__deepwiki__ask_question <owner>/<repo>` | "what is this?" | non-error response |
| 6 | WebFetch (REROUTED per W333-C Gap-1) | **PRIMARY**: `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index <url>` OR `ctx_batch_execute` with `curl -sS <url>`. **FALLBACK**: `WebFetch https://github.com/<owner>/<repo>` (will be hook-blocked when context-mode plugin active; silent Stage-0 gap if no reroute awareness) | non-error response from ctx_* OR HTTP 200 page-body-contains-slug from WebFetch (rare — only when context-mode disabled) |
| 7 | repomix | `mcp__repomix__pack_remote_repository <owner>/<repo>` | full pack | non-error pack |
| 8 | serena (local) | `mcp__serena__find_symbol <slug>` if previously cached | optional positive-only signal | hit |

**Right-tool-for-job mandate**: `get_repository` for slug existence (preferred — core rate-limit budget); `search_repositories` valid with `topic:`/`language:`/`stars:`/`user:`/`org:`/`repo:owner/name` (per W329-S2-REAUDIT); `hub_repo_search` ONLY with single-token query or tag-filter. Multi-word free-text query on `hub_repo_search` is genuinely USER-ERROR per W328-S1. For `search_repositories` 0-result observations W329-S2-REAUDIT marks root cause UNDETERMINED — investigate rate-limit / token-scope / MCP-transformation / cache before classifying as USER-ERROR. For >1000-result workloads see §1.5 Stage-0.5 ENUMERATION-BYPASS.

**3-org-distinct anchors (correct-usage)**:
1. `docs.github.com/en/search-github/searching-on-github/searching-for-repositories` (GitHub/Microsoft) — qualifier reference; `repo:owner/name` documented for repository search (in same qualifier table as `in:name`/`in:description`/`in:topics`/`in:readme`) per W329-S2-REAUDIT live API probes; `user:`/`org:` documented as canonical owner-restriction qualifiers
2. `huggingface.co/docs/huggingface_hub/package_reference/hf_api` (Hugging Face Inc) — `HfApi.list_models` `search` = "A string that will be contained in the returned model ids" (substring-only)
3. `github.com/github/github-mcp-server` `pkg/github/search.go` (github-mcp-server maintainers) — `IsError` / `IncompleteResults` / `NewGitHubAPIErrorResponse` contract per deepwiki 2026-05-19

Supplementary: `docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md` + `docs/architecture/W328-HF-USAGE-CORRECTION/CORRECT-USAGE.md` + `docs/architecture/W328-GH-SOTA-METHODS/SOTA-BYPASS.md` + `docs/architecture/W328-HF-SOTA-METHODS/SOTA-BYPASS.md`.

**Δ51 markitdown probe-record (W321→W328 absorb)**: each Stage-0 family-return is piped through `markitdown` (microsoft/markitdown MIT) for canonical Markdown. Probe-record JSON written to `verdicts/W<N>-<slug>-probe-record.json` schema `{family, url, hash:"sha256:...", markdown, timestamp}`. D-EMP HARD GATE + Phase-5 Gate-5 Replayable auto-consume probe-record. Scored as D66 (see references/dimensions.md). 3-org-distinct: microsoft/markitdown + NIST AI 600-1 MEASURE-3.1 + Anthropic claude-cookbooks @ 2eed173a `patterns/agents/prompts/research_lead_agent.md`.

If existence confirmed AND result-count ≤1000 → PROCEED to §2 Phase 1. If existence confirmed AND result-count >1000 OR exhaustive enumeration required → PROCEED to §1.5 first.

---

## §1.5 Stage-0.5 ENUMERATION-BYPASS Gate (v12.1 — W329 NEW)

**Mandatory when search-family is involved AND any of**: (a) sizing-probe `repositoryCount > 1000` (GitHub REST/GraphQL `/search/*` hard cap per `docs.github.com/en/rest/search/search`); (b) HF Hub exhaustive enumeration is required for SOTA discovery; (c) anti-bias D33 quorum requires cross-source corroboration.

Per operator principle (2026-05-19): "mature repos = look at your own usage first; if rate-limited, use GraphQL / cursor / dataset-snapshot / BigQuery" — filing an issue against a documented limit is NOT SOTA.

| Platform | Primary bypass | Delta layer | Cross-validate |
|---|---|---|---|
| HF Hub | **M5** — DuckDB SQL over `cfahlgren1/hub-stats` parquet snapshot (Resolvers rate-bucket, ~6-10× higher than Hub APIs; daily refresh; 2.89M models + 1.01M datasets + 1.3M spaces) | **M1** — `HfApi.list_models()` cursor walk with `huggingface_hub>=1.2.0` smart 429 retry (fresh-tail <24h) | M6 webhooks (push events) |
| GitHub | **6-step cascade**: (1) GraphQL sizing-probe → (2) binary-split date/stars window-partition until ≤1000/window → (3) GraphQL cursor pagination `first:100 after:$cursor` per window → (4) BigQuery `bigquery-public-data.github_repos` snapshot cross-check → (5) ecosyste.ms star-independent signals (fork/watcher/commit/dependents) → (6) GH Archive `githubarchive.day.*` for trending velocity | GraphQL `organization.repositories` / `user.repositories` connections (NO cap) | BigQuery + ecosyste.ms |

**Paste-ready queries** + per-bucket rate-limit table + 3-org-distinct cites: `references/stage-0-bypass-cascade.md`.

**Anti-bias mandate**: when Stage-0.5 fires, the top-10 ranking MUST surface ≥1 candidate first-discovered by a non-MCP bypass method (BigQuery snapshot OR ecosyste.ms OR M5 DuckDB) — guards against MCP-surface popularity bias (only-what-the-MCP-returns sampling effect).

**3-org-distinct anchors (bypass cascade)**:
1. `docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api` (GitHub/Microsoft) — cursor pagination contract
2. `cloud.google.com/bigquery/public-data/github` (Google Cloud) — `bigquery-public-data.github_repos` snapshot + `githubarchive` event dataset
3. `huggingface.co/datasets/cfahlgren1/hub-stats` (HF community-org, distinct from huggingface main-org) — daily parquet snapshot via DuckDB httpfs

Supplementary: `github.com/ossf/criticality_score/cmd/enumerate_github` (OSSF/Linux Foundation) — reference star-window partitioning bypass; `repos.ecosyste.ms/docs` (ecosyste.ms) — multi-host star-independent signals; GitHub Community `#64629` + `#109517` confirm 1000-cap on GraphQL `search`.

---

## §2. Phases 1-6 (Process Pipeline)

### Phase 1 — Discover (multi-MCP cascade, cost-bounded)

Cost-cap routing:

| Tier | Hard-cap | Operator-override max | Wall-time cap |
|---|---|---|---|
| T4 CITE-ONLY | $0.02 | $0.10 | 1 min |
| T3 PATTERN-STUDY | $0.50 | $2.00 | 15 min |
| T2 VENDOR-FORK | $2.00 | $5.00 | 30 min |
| T1 INSTALL | $5.00 | $20.00 | 60 min |

**Per-tier MCP-family floor** (v6 Δ5 HARD PRECONDITION; breach → auto tier-demote):

| Tier | MCP-family floor | Non-github requirement |
|---|---|---|
| T4 | ≥3 families | n/a |
| T3 | ≥7 families | n/a |
| T2 | ≥9 families | ≥1 paper-search-class + ≥1 perplexity-equivalent |
| T1 | ≥11 families | ≥2 non-github primary first-discovery |

**Graceful-degradation ladder**: exa→WebSearch→github-API; deepwiki→repomix-grep→WebFetch; context7→WebFetch-official-docs; perplexity→WebSearch+exa→WebFetch; repomix→`git clone --depth 1`+local-grep; github→exa-source-filter→WebSearch-site-github. ≥2 fallbacks triggered → `cascade_degraded=true` (caps D5 at 4).

**Anti-bias mandate**: top-10 ranking MUST surface ≥1 candidate first-discovered by EACH fired MCP family (guards github-popularity bias).

### Phase 2 — Cross-Source Triangulation

Build `sources_typed[]` — organisationally-distinct sources per claim. ≥3 org-distinct sources for any score ≥4 on D2/D5/D9. `disagreement[]` flagged when sources contradict; `mcp_family_attribution[]` records WHICH MCP saw each claim. Codex GPT-5.5 weighted-consensus mediation when `disagreement[].length >= 2` (G1, W290 F4 `confidence_factor = 0.7` when disagreement present).

### Phase 3 — Anti-Bias Gate

**v14 W337 D12 swap**: stars demoted from primary D12 sub-signal to LEGACY sub-signal; `pattern_density_score` (reusable-pattern-count ÷ repo-LOC) is the NEW PRIMARY D12 sub-signal. D12 caps at 3 when neither pattern_density nor stars is ≥2. Bayesian author-prior (W287 P2.iii) feeds D6 — established author lifts D6 by +1; unknown author caps D6 at 2.

**Anti-bias hard-stops**: (a) star-only T1 INSTALL → auto-demote to T3; (b) "trending" tag with <30-day history → auto-demote to T2; (c) single-author-single-commit-week → auto-demote to T4.

**Δ52 community-health corroboration (W321→W328 absorb)**: D2 governance_health score requires confirmation from ≥1 of {chaoss/grimoirelab, ossf/scorecard, OWASP SAMM Governance, ISO/IEC 25010 §6}. 0 corroboration AND <500★ → D2 caps at 3 (parallel to D12 v14 cap-at-3 trigger "neither pattern_density nor stars ≥2"). 2+ corroboration AND raw≥4 → +0.5 lift. Symmetry caps both "popular but unmaintained" AND "obscure but vital" extremes. Scored as D52 (see references/dimensions.md). 3-org-distinct: chaoss/grimoirelab (CHAOSS/Linux Foundation) + OWASP SAMM Governance (OWASP Foundation 501(c)(3)) + ISO/IEC 25010 §6 quality model (ISO).

### Phase 4 — Scoring (weighted-sum after D-EMP HARD GATE — see §4)

Each dim scored 1-5 (some 0-5). `score_i × weight_i × confidence_factor_i` summed; divided by `composite_denom` (see §7). D-EMP HARD GATE runs FIRST — if D-EMP=0 → BLOCK from T1/T1-PROV/T2 before weighted-sum even fires.

**Δ49 EC-PROMETHEE committee-aggregation (W321→W328 absorb)**: when `confidence_factor` activates OR D33 quorum_unmet, replace single-WSM default with weight-envelope sampling:

1. Compute base WSM as current.
2. Compute Entropy + CRITIC weight vectors per Pereira 2024 (arXiv 2404.06370).
3. Per criterion j: `w_min = min(w_E, w_C); w_max = max(w_E, w_C)`.
4. Monte Carlo N=20 weight-samples in `[w_min, w_max]`; per sample → WSM → ranking → positional-frequency vector.
5. Aggregate via Borda count; report **rank-distribution** (e.g. "candidate X 1st in 47% of weight-envelope iterations").
6. Flag **fragile-winner** (often 1st but sometimes ≤5th) → confidence-factor 0.7 applied. Flag **robust-compromise** (consistent 2nd-3rd) → surfaces in operator-decision row.

3-org-distinct: Valdecy/pyDecision (Pereira FGV-EBAPE Brazil) + arXiv 2404.06370 (peer-reviewed) + NIST 800-160 Vol.2 Rev.1 SC-29 Heterogeneity (NIST/US DoC). GPL-3.0 concern → pattern-only adoption per W316 D1 license calc.

### Phase 5 — 5-Gate Validation (W299, codified inline)

ALL 5 gates MUST pass for T1 INSTALL ratification:

1. **Provenance re-fetch** — re-clone candidate from upstream, verify SHA matches the SHA cited in evidence (defeats supply-chain MITM).
2. **Paraphrase-invariance** — rerun scoring rubric with prompt paraphrased; |Δscore| MUST be ≤0.3 (defeats prompt-overfit).
3. **Adversarial-blinded review** — invoke `Agent subagent_type=engineering-skills:adversarial-reviewer` with NO access to prior verdicts; verdict tier MUST match (defeats anchoring).
4. **Contamination check** — verify candidate is NOT in training-data of judge model via `repomix grep` for distinctive identifier strings against Anthropic public corpus references (defeats memorization).
5. **Replayable + ≥3-org** — verdict ledger MUST contain replayable inspect_ai EvalLog path + ≥3 org-distinct cite anchors.

**Δ47 Pareto-frontier reflective routing (W321→W328 absorb)**: when D33 quorum_unmet AND candidate is top-3 on any non-empty dim-subset → retain as `T2-CHERRY-FRONTIER` sub-tier (8-tier ladder). Operator can promote frontier candidate to T2 with `+frontier` justification line in verdict row. Anti-stagnation cite: GEPA arXiv 2507.19457 §4.3 "evolving frontier dominates fixed-best by ≥18% on RAG/agent benchmarks". 3-org-distinct: gepa-ai/gepa (multi-org) + arXiv 2507.19457 + IEEE NSGA-II Deb+ 2002 (Kanpur GA Lab).

### Phase 6 — Codex GPT-5.5 Cross-Model Adversarial Review

Plugin-native Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s). **Round-1 default**, **round-N operator-extended** per "no budget" mandate. Position-swap MVP: codex re-invoked with verdict-evidence order swapped per Zheng+ 2023 MT-Bench + JudgeLM 3-org convergence (defeats position-bias).

VERDICT codes:
- **APPROVE** → ship verdict as written.
- **REVISE** → operator absorbs codex findings inline; re-dispatch round-2.
- **NEEDS-REVISION** → blocks ship until specific findings closed.
- **BLOCK** → reject candidate at codex-gate.

**Δ50 Unit/Layer/Block formalization (W321→W328 absorb)**: replace prose round-1/round-2 with verdict-style DAG:

- `codex_round = Unit(model="gpt-5.5", prompt=verdict_evidence)` (haizelabs/verdict v0.2.1 MIT primitive — license corrected from sca-v13 Apache-2.0 mis-cite per `gh api repos/haizelabs/verdict` probe 2026-05-20)
- `codex_ensemble = Layer([codex_round], repeat=N)` where N=1..3 adaptive
- `phase6_gate = Block(codex_ensemble >> MaxPoolUnit)` (majority-vote aggregation)
- Adaptive: `repeat=N` starts at 1; increments on NEEDS-REVISION; caps at operator-cap (default 3).

3-org-distinct (W321→W337 cite-accuracy corrected): haizelabs/verdict v0.2.1 MIT (Haize Labs Inc) + Zheng+ 2023 MT-Bench arXiv 2306.05685 (UC Berkeley/Stanford/EPFL) + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University/Tencent) — substitutes verdict-paper ICLR 2026 (unverified status per W321 perplexity cross-check) with JudgeLM peer-reviewed 3rd anchor. **W337 P0-1 D75 codify**: codex_round_cost_efficiency_ratio scored as new dim per §3 catalog (W_install 0.3); this Δ50 wiring is the per-Unit/Layer/Block contract D75 measures against.

---

## §3. D1–D49+D52-D65+D66+D67-D75+D76-D80+D81-D83+D84-D100+D101-D105 Dimension Catalog

**See `references/dimensions.md`** — full per-dim criteria + 3-org-distinct anchors loaded on-demand. SKILL.md kept pointer-only ≤500 LOC per CLAUDE.md cardinal discipline.

Summary by version-band:
- D1-D14 sca-v3 canonical | D16-D18 sca-v3.1 W293 | D19-D21 sca-v5 W299 | D22-D23 sca-v6 W310
- D25-D33 sca-v7 W314 | D34 sca-v7.1 W316 | D36-D37 sca-v7.2 W317 META | D35 sca-v8.1-partial W319
- D38-D41 sca-v9 W324 CC-runtime | D42-D45 sca-v10 W325 corroboration
- D46-D49 sca-v11 W326 (INV/ship/sandbox/secret) | D52-D65 sca-v11 Stream-H W326 deep-research-dim
- D66 sca-v12 W328 (markitdown probe-record — Δ51 absorb scored as new dim)
- **D73-D75 + D12-swap sca-v14 W337** (verdict-llm-codify — 3 new dims + 1 sub-signal swap):
  - **D73 `multi_source_first_discovery_diversity_score`** — W_install 0.7 / W_pattern 0.4 / M-skip if MCP-cascade not fired / score 1-5. Counts DISTINCT MCP families that FIRST-DISCOVERED the candidate (not just confirmed). ≥4 requires ≥2 non-github first-discoveries. Anti-bias: guards MCP-surface popularity bias. 3-org-distinct: NIST AI 600-1 MEASURE-3.1 + OSSF Criticality Score (OpenSSF/Linux Foundation) + Anthropic claude-cookbooks @ 39a350b6 research_lead_agent.md `<use_parallel_tool_calls>`. [W337 P0-1 §1]
  - **D74 `mcp_family_attribution_completeness`** — W_install 0.5 / W_pattern 0.3 / T-skip arch-itself / score 1-5. Measures whether `mcp_family_attribution[]` ledger field is fully populated per claim. ≥4 requires per-claim attribution + ≥3 distinct families. 3-org-distinct: ISO 19011:2018 §5.5.5 (ISO) + NIST 800-53 AU-2 (NIST/US DoC) + OWASP A09:2021 (OWASP Foundation). [W337 P0-1 §2]
  - **D75 `codex_round_cost_efficiency_ratio`** — W_install 0.3 / W_pattern 0.2 / E-skip arch-itself / score 0-5. Measures useful-verdict-insight per codex round cost ($). When D44 codex_round_efficiency=1 (round-3+), D75 caps at 2. ≥4 requires 1+ APPROVE per round-1. 3-org-distinct: haizelabs/verdict v0.2.1 MIT (Haize Labs Inc — license corrected from sca-v13 Apache-2.0 mis-cite per gh API probe 2026-05-20) + Zheng+ 2023 MT-Bench arXiv 2306.05685 (UC Berkeley/Stanford/EPFL) + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University/Tencent). [W337 P0-1 §3]
  - **D12 sub-signal swap**: D12 `pattern_density_score` (reusable patterns extracted) REPLACES stars-only sub-signal; cap-at-3 trigger moves to "neither pattern_density nor stars ≥2"; D12 ≥4 requires ≥3 reusable patterns (matches W336 mcp-agent-patterns precedent). 3-org-distinct: Anthropic mcp-agent-patterns @ W336 (intra-runtime self-cite permitted per §4) + OSSF Criticality Score + NIST AI 600-1 MEASURE-3.1.
- **D67-D72 sca-v13 W332** (W329-C absorb — 6 new dims):
  - **D67 `task_adaptive_topology_fit`** — W_install 0.6 / W_pattern 0.4 / E-skip if no DAG-decomp test / score 1-5. Measures whether candidate fits an adaptive-orchestration topology (sequential / parallel / star / DAG-decomposed) per AdaptOrch theory; ≥4 requires demonstrable DAG-decomposition test. 3-org-distinct: AdaptOrch arXiv 2602.16873 + MAS-Orchestra arXiv 2601.14652 (Salesforce AI Research) + Anthropic claude-cookbooks `patterns/agents/prompts/research_lead_agent.md:135-137` parallel-tool-call MUST-block. [W329-C §1.1 + §2 L66]
  - **D68 `deliberation_first_score`** — W_install 0.4 / W_pattern 0.3 / M-skip / score 1-5. Measures whether candidate enables deliberation-before-tool-invocation per DOVA; ≥4 requires explicit meta-reasoning pre-action step. 3-org-distinct: DOVA arXiv 2603.13327 + Reflexion arXiv 2303.11366 (Princeton/Northeastern/NeurIPS 2023) + Anthropic claude-cookbooks orchestrator-workers pattern. [W329-C §2 L67]
  - **D69 `dense_rubric_constructability`** — W_install 0.5 / W_pattern 0.4 / E-skip / score 1-5. Measures whether candidate produces a dense-multi-dim AgentObjective-style rubric (not a single score); ≥4 requires ≥3 weighted sub-criteria. 3-org-distinct: AutoSOTA Tsinghua FIB Lab (`tsinghua-fib-lab.github.io/AutoSOTA/AutoSOTA.pdf`) + AgentObjective methodology + sca-v12 §4 weighted-sum (self-cite as 3rd anchor permitted per §4 strengthening allowance). [W329-C §2 L68]
  - **D70 `evallog_replayability`** — W_install 0.5 / W_pattern 0.0 / E-skip / score 0-5. Measures whether verdict produces a replayable inspect_ai `.eval`/`.json` EvalLog with cross-model `model_graded_qa(model=[claude, openai/gpt-5.5])` metadata; 0 = no replayable artifact (Phase-5 Gate-5 FAIL); 5 = full EvalLog + position-swap + N-round aggregation. W_pattern=0 because replayability is an install-runtime concern (no pattern-only adoption path). 3-org-distinct: inspect_ai UK AISI (UK AI Safety Institute, government org) + MIT license (FSF/OSI) + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang University/Tencent). [W329-C §2 L69 + §8.4]
  - **D71 `gepa_nightly_drift_resistance`** — W_install 0.3 / W_pattern 0.2 / M-skip / score 1-5. Measures whether GEPA-evolved SKILL.md description fields maintain Phase-5 5-gate pass rate across nightly Pareto-keep cycles; ≥4 requires ≥5 consecutive nightly cycles without regression. 3-org-distinct: GEPA gepa-ai @ ICLR 2026 Oral + Hermes NousResearch (Nous Research independent) + DSPy Stanford NLP. [W329-C §2 L70 + §8.3]
  - **D72 `episodic_reflection_persistence`** — W_install 0.4 / W_pattern 0.3 / M-skip / score 1-5. Measures whether wave-N learnings retrieve in wave-(N+5) via T6 basic-memory; ≥4 requires explicit `note_type: sca-v13-reflection` rows + cross-wave retrieval contract demonstrated. 3-org-distinct: Reflexion NeurIPS 2023 (Princeton/Northeastern) + Memento-II arXiv 2512.22716 + basic-memory T6 canonical (per W295 canonical-primary). [W329-C §2 L71 + §8.2]
- **D76-D80 sca-v15 W340** (orchestration-fail-CLOSED + typed-program-paradigm — 5 new dims; cite-anchored to W339-P1b Pareto-frontier {C8 anthropic claude-cookbooks, C2 microsoft autogen}):
  - **D76 `empty_final_message_detection`** — W_install 0.6 / W_pattern 0.4 / E-skip if candidate ships no orchestration primitive / score 0-3. Measures whether candidate explicitly detects + escalates empty teammate final assistant messages (Δ-G49). 0 = silent accept; 1 = log-only; 2 = stub-inject ("[Error: Worker X returned no content]"); 3 = explicit empty-detect + re-dispatch loop + escalate-to-operator. **Measurement procedure**: grep candidate's orchestrator code for empty-string checks on subagent output; trace at least one observable path from empty-result to either retry, error-stub, or fail-CLOSED. **Pass/fail**: ≥2 for T1 install; ≥1 for T2 vendor-fork; 0 = SOFT-WARN pattern-only adoption. **3-org-distinct anchors**: (a) Anthropic `claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/orchestrator_workers.ipynb` cell-2 `if not worker_content.strip(): worker_content = f"[Error: ...]"`; (b) Microsoft `autogen @ 027ecf0a _base_group_chat_manager.py:165-170` `_signal_termination_with_error`; (c) LangChain `langgraph @ 5d341ac3 supervisor.py:81-91` supervisor.last_message empty-route. **Already PATTERN-INSTALLED**: `.claude/skills/empty-final-message-guard/SKILL.md` (W339-P0b Gap-1; cardinal-rule-4-compliant). [W340-S3 §A + W339-P1b §3 D13]
  - **D77 `fail_closed_worker_exception_handler`** — W_install 0.6 / W_pattern 0.4 / E-skip if candidate ships no orchestration primitive / score 0-3. Measures whether worker EXCEPTIONS (uncaught, non-zero-exit, status==failed) are surfaced and propagated rather than silent exit-0. 0 = swallow-and-continue; 1 = log-only; 2 = mark task FAILED but synthesize partial; 3 = explicit terminate-signal + skip-from-synthesis + escalate. **Measurement procedure**: inject a deliberate exception into one teammate; observe orchestrator behavior (silent vs surface). **Pass/fail**: ≥2 for T1; ≥1 for T2; 0 = SOFT-WARN. **3-org-distinct anchors**: (a) Microsoft `autogen @ 027ecf0a` `_signal_termination_with_error` (RoutedAgent contract); (b) LangChain `langgraph` Pregel exception bubble (`langgraph/pregel/_runner.py` exception escalation); (c) Anthropic `claude-cookbooks @ 39a350b6` FlexibleOrchestrator stub-injection pattern (3-org-distinct convergence). **Already PATTERN-INSTALLED**: `.claude/skills/worker-failure-termination-guard/SKILL.md` (W339 carry-forward closed early W340). [W340-S3 §A + W339-P1b §3 D14]
  - **D78 `budget_cap_enforcement`** — W_install 0.5 / W_pattern 0.3 / E-skip arch-itself / score 0-3. Measures whether candidate enforces hard caps on (a) max_turns, (b) token budget, (c) wall-time budget per orchestration loop. 0 = prose-only "2-5 members" advisory; 1 = warn-only soft cap; 2 = halt-loop on cap breach (no escalation); 3 = enforced cap + explicit termination message + escalation. **Measurement procedure**: instrument a deliberate runaway loop; observe if cap fires within expected bound + cite the StopMessage / termination event. **Pass/fail**: ≥2 for T1; ≥1 for T2; 0 = SOFT-WARN. **3-org-distinct anchors**: (a) Microsoft `autogen @ 027ecf0a` `GroupChatManager.max_turns` → `StopMessage` (v0.4 lineage); (b) LangChain `langgraph` `parallel_tool_calls` cap flag + `RecursionError` ceiling; (c) Anthropic `claude-code` agent-teams Phase-4 budget discipline cite-anchored to CLAUDE.md L13 parallel-execution mode-4 background-session budget. **Already PATTERN-INSTALLED**: `.claude/skills/agent-budget-discipline/SKILL.md` (already-local; W339 verified). [W340-S3 §A + W339-P1b §3 D15]
  - **D79 `typed_prompt_program_paradigm`** — W_install 0.5 / W_pattern 0.4 / T-skip if not prompt-engineering-shaped candidate / score 0-3. Measures whether candidate exposes prompts as typed-program primitives (Signature + Module + Optimizer) versus artisanal-prose-prompt. 0 = artisanal prose only; 1 = template-string with named-slot; 2 = typed signature with input/output schema; 3 = full Signature/Module/Optimizer with metric + Pareto-frontier candidate-routing. **Measurement procedure**: read candidate's prompt entry-points; identify whether they are (a) ad-hoc strings (D79=0), (b) f-strings with vars (D79=1), (c) Pydantic-typed Signature classes (D79=2), or (d) optimizable programs with metrics (D79=3). **Pass/fail**: ≥2 for T1; ≥1 for T2; 0 acceptable for non-prompt-engineering candidates (T-skip). **3-org-distinct anchors**: (a) Stanford NLP `dspy` Signature/Module/Optimizer abstractions (github.com/stanfordnlp/dspy MIT 34k★); (b) Databricks DSPy production field report (Databricks Inc enterprise practitioner cite); (c) GEPA arXiv 2507.19457 Pareto-frontier candidate-routing (UC Berkeley / Stanford / MIT / Databricks NeurIPS 2025 co-authorship). **Already PATTERN-INSTALLED**: `.claude/skills/dspy-integration/SKILL.md` (W340-S3 confirmed). [W340-S3 §A + W339-P1b §3 D16]
- **D81-D83 sca-v17 W344** (multi-angle MCP convergence + low-stars-high-quality override + decision-impact-tier — 3 new dims; cite-anchored to research-arch ingest of lastmile-ai/mcp-agent + microsoft/autogen + langchain-ai/langgraph per `docs/architecture/W344-SOTA-UNLEASH/Z5-research-arch-ingest.md`):
  - **D81 `multi_angle_mcp_convergence`** — W_install 0.6 / W_pattern 0.4 / E-skip arch-itself / score 1-5. Counts DISTINCT MCP families that CONFIRMED a candidate's recommendation (distinct from D73 first-discovery; D81 measures cross-validation breadth). PASS gate: ≥4-distinct-MCP-family. Score: 5 = ≥6 families; 4 = 4-5 (PASS); 3 = 3; 2 = 2; 1 = 0-1 (FAIL single-source). 10 MCP-families enumerated: code-graph (gitnexus/serena/deepwiki) + doc-fetch (WebFetch/exa/tavily/firecrawl/hf-doc-fetch) + search-engine (tavily/exa/perplexity/brave-search/WebSearch) + reasoning-broker (perplexity-reason/research) + repo-pack (repomix) + KG-memory (basic-memory/cognee) + GitHub-graph + HF-resources + Browser + Schema-validation. W349-S1 catalog refresh added brave-search (search-engine) + firecrawl (doc-fetch) — both wired in .mcp.json:mcpServers per W349 Stream A §2.1 finding.. **3-org-distinct anchors**: (a) NIST AI 600-1 MEASURE-3.1 (NIST/US DoC) multi-source measurement mandate; (b) OSSF Scorecard (OpenSSF/Linux Foundation) multi-checker convergence (≥4 checks PASS); (c) Anthropic claude-cookbooks @ 39a350b6 `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block. [W344-Z5 §P2.1; detail at `docs/architecture/W344-SOTA-UNLEASH/Z5-sca-v17-increment.md#d81`]
  - **D82 `low_stars_high_quality_override`** — W_install 0.4 / W_pattern 0.3 / E-skip if ≥500★ / score 0-3. D12 pattern-density-score OVERRIDE: allows T2-CHERRY tier for repos <500★ when ALL of: (a) pattern-density ≥2 reusable-patterns per KLOC; (b) ≥3-org-distinct cite-anchor support; (c) active maintainer (≥1 commit in last 60d). Score: 0 = no override (D12 cap-at-3 applies); 1 = one PASS condition only; 2 = two PASS; 3 = all three PASS + T2-CHERRY unlock. Rationale: stars are LATE-LAGGING network-effect signal, NOT code-quality. **3-org-distinct anchors**: (a) OSSF Criticality Score (OpenSSF/Linux Foundation) — STARS NOT IN FORMULA (https://github.com/ossf/criticality_score); (b) Linus Torvalds / Linux Kernel `Reviewed-by:` discipline — PATCH MERIT over reputation (https://www.kernel.org/doc/html/latest/process/submitting-patches.html); (c) IEEE Software journal Borges/Hora/Valente 2018 "GitHub Stars as a Proxy for Software Quality" — `Stars ≠ quality`. Examples already in this runtime: mattpocock-vendor-fork-10 (~300★ T2-CHERRY), addyosmani-vendor-fork-5 (~400★), andrej-karpathy-skills (~200★). [W344-Z5 §P2.2; detail at `docs/architecture/W344-SOTA-UNLEASH/Z5-sca-v17-increment.md#d82`]
  - **D83 `decision_impact_tier`** — W_install 0.5 / W_pattern 0.4 / E-skip if no clear architecture-layer touched / score 1-5. Each candidate scored on TWO axes: **Axis A action-tier** (`install` = adds runtime primitives, `pattern-study` = vendor-fork/skill, `cite-only` = no code change) + **Axis B architecture-layer** L1-L10 (L1 atomic-write/FS, L2 worktree/branch topology, L3 cross-session state T1-T6, L4 pre-commit race-immunity hooks, L5 operator surface CLAUDE.md+settings.json, L6 agent dispatch/orchestrator, L7 MCP servers, L8 subagent allowlist/agent-team, L9 skill auto-fire surface, L10 cite-anchor/verdict-ledger/KG). VERDICT-LEDGER MUST tag each decision with `impact_tier: {action: <action>, layer: <Lx>}`. Score: 5 = clear action + layer + ≤1 layer-conflict; 4 = clear action + layer + 2 layer-conflicts; 3 = ambiguous action OR ≥3 layer-conflicts; 2 = ambiguous action AND layer; 1 = no clear classification. **3-org-distinct anchors**: (a) ISO/IEC 25010:2011 §6 quality-attribute selection drives architecture-decision impact-class; (b) ITIL 4 Service Strategy `change-impact = (scope × risk × reversibility)` (AXELOS/Peoplecert §3.6); (c) NIST SP 800-218 PW.7 `Review/Analyze Code` task PW.7.1 (NIST/US DoC). [W344-Z5 §P2.3; detail at `docs/architecture/W344-SOTA-UNLEASH/Z5-sca-v17-increment.md#d83`]
  - **D80 `independence_proof_multi_org_anchor`** — W_install 0.7 / W_pattern 0.5 / E-skip arch-itself self-claims / score 0-3 (sca-v15) → score 1-5 (sca-v16 W343 measurable evidence-table; legacy 0-3 still accepted via mapping in v16 table). **v16 measurable evidence-table (W343 P1.2)**: PASS = ≥3 organizationally-distinct first-discovery cite-anchors AND ≥1 non-MCP source AND ≥1 peer-reviewed-OR-standards-body. FAIL = <3 org-distinct OR all-MCP-attributed OR no peer-reviewed/standards source. **Score 1-5 breakpoints**: 5 = PASS + 4+ org-distinct + 2+ peer-reviewed/standards; 4 = PASS + 3 org-distinct + 1 peer-reviewed/standards; 3 = 3 org-distinct but ALL MCP-attributed (degenerate-PASS — SOFT-WARN); 2 = 2 org-distinct (FAIL); 1 = ≤1 org-distinct (HARD-FAIL). **Measurement procedure**: extract every "passes review" / "tests green" / "SOTA" claim from candidate's verdict; verify ≥3 organizationally-distinct anchors per claim; classify each anchor by MCP-attribution and peer-reviewed/standards-body status; apply v16 thresholds. **Pass/fail**: ≥4 for T1 (HARD GATE — fails T1 below 4 regardless of composite); ≥2 for T2; ≤2 = HARD-FAIL pattern-only-with-DOC. **3-org-distinct anchors**: (a) Stanford Encyclopedia of Philosophy entry on Popper falsifiability + open-society peer-review (Stanford academic-org); (b) Microsoft `promptflow` YAML-DAG node-independence enforcement (github.com/microsoft/promptflow MIT — enforces explicit upstream-dependency declaration); (c) OpenSSF Best Practices §15 multi-org-anchor mandate (OSSF/Linux Foundation governance); (d-v16) NIST AI 600-1 MEASURE-3.1 independent-ground-truth multi-source mandate; (e-v16) Anthropic `claude-cookbooks @ 39a350b6` `research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block (peer-vendor practitioner artifact). **v16 cross-SHA chain extension**: CCBP HEAD `a28cd96b` per CLAUDE.md L3 (`1386b0e → ac0d87d → 48f2ceb → 48798ca → 9624c4ac → f28c2da → a28cd96b`). **Already CODIFIED**: `.claude/skills/goal-prompt-synthesis/SKILL.md` §5 (per W339-P1b §5). **v16 evidence-table detail**: `docs/architecture/W343-EXECUTE/Y4-sca-v16-D80-table.md`. [W340-S3 §A + W339-P1b §3 D17 + W343 P1.2]
- **D84-D100 sca-v19 W367 Stream E** (17 new dims — supply-chain provenance + CC-runtime consolidation + formal T0-T5 decision-tier ladder + 3rd composite W_cite; design archived at `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-E-RUBRIC-V19.md`):
  - **D84 CC-runtime-pathway-fit composite** (consolidates D38-D41); **D85 mcp_server_native_or_compatible**; **D86 awesome-list-citation-count** (multi-list convergence); **D87 arxiv-paper-backing-count**; **D88 benchmark-leader-status**; **D89 multi-MCP-cross-validation** (perplexity+exa+tavily+brave-search 4-MCP sharper than D81); **D90 maintainer-trust-tier** (Anthropic > vetted-OSS-org > individual > anonymous); **D91 supply-chain-provenance** SLSA-L0..L3 + npm-provenance + Sigstore HARD-GATE; **D92 license-decision-tier** traffic-light HARD-GATE; **D93 decision-tier-recommendation** (formal T0-T5); **D94 release-cadence-freshness**; **D95 stars-velocity-NOT-absolute**; **D96 production-deployment-evidence** (named-org count); **D97 community-health-composite**; **D98 security-incident-history** CVE+CISA-KEV HARD-GATE; **D99 Z-portable-Windows-MSYS-compatibility**; **D100 operator-curated-runtime-fit** (W255-cleanup discipline).
  - **Composite deltas v17→v19**: denom_install 48.5→**57.5** (+9.0 D84-D100 W_install sum); denom_pattern 22.9→**29.4** (+6.5 D84-D100 W_pattern sum); **denom_cite=12.0 NEW** (3rd composite — lighter weights for cite-only verdicts). Full per-dim definitions + 3-org-distinct anchors at `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-E-RUBRIC-V19.md` §2.
- **D101-D105 sca-v20 W369 P1.6** (5 new dims — W367 Stream G research-arch meta-pattern absorption; promotes Pareto-frontier from sub-tier to primitive, adds CoVe-as-dim, jury-on-demand instance-weighting, planner-executor-publisher separation, judge-human kappa z-score; cite-anchored to W367 Stream G `STREAM-G-RESEARCH-ARCH-META.md` §2+§4 per gepa+GPT-Researcher+haizelabs/verdict+Meta AI CoVe+arXiv:2510.09738 convergence):

  - **D101 `pareto_frontier_as_evaluation_primitive`** — W_install 0.5 / W_pattern 0.4 / W_cite 0.3 / E-skip arch-itself (recursive with §Δ47 T2-CHERRY-FRONTIER routing) / score 0-3. **PROMOTES** §Δ47 Pareto-frontier from T2-CHERRY-FRONTIER sub-tier-only routing decision to top-level evaluation primitive. Measures whether candidate retains top-K Pareto-non-dominated candidates rather than collapsing to single-best. **Score**: 0 = single-best-only (no frontier tracking); 1 = single-best + 1 runner-up logged (advisory); 2 = top-3 retained but no per-dim-subset frontier; 3 = full top-K Pareto frontier across all non-empty dim-subsets + `frontier_keep` operator-promote annotation supported + Pareto-genetic mutation loop (GEPA-style `optimize_anything` or equivalent). **Measurement procedure**: read candidate's selection/ranking logic; identify (a) whether multi-objective trade-offs are explicit (D101=2+), (b) whether top-K is preserved across iterations (D101=3 required), (c) whether nightly evolution loop consumes the frontier (D101=3 stretch). **Pass/fail**: ≥2 for T1 install; ≥1 for T2 vendor-fork; 0 acceptable for narrow single-objective candidates (E-skip permitted). **3-org-distinct anchors**: (a) gepa-ai/gepa MIT + Agrawal+ 2025 arXiv 2507.19457 + ICLR 2026 Oral (Stanford NLP + UC Berkeley + Databricks co-authorship consortium); (b) stanfordnlp/dspy `dspy.GEPA` integration (Stanford NLP independent practitioner-org); (c) IEEE NSGA-II Deb+ 2002 (Kanpur GA Lab — academic foundation of Pareto-genetic-optimization). **Already RUNTIME-CONSUMING**: `.claude/skills/dspy-integration/SKILL.md` (W369 P1.1 augmentation; +`.claude/skills/sota-convergence-audit/SKILL.md` §Δ47 sub-tier persists as routing hint). [W367 Stream G §5 rank-1 + W369 P1.6 §1; detail: `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-G-RESEARCH-ARCH-META.md` Section 4 #1+#2]
  - **D102 `chain_of_verification_factored_mode`** — W_install 0.5 / W_pattern 0.3 / W_cite 0.4 / E-skip if no draft step / score 0-3. Measures whether candidate runs Chain-of-Verification (CoVe) per Meta AI Research 2023 — (a) draft, (b) plan verification questions, (c) **factored** answer (each question independently), (d) reconcile draft against answers. Factored mode REQUIRED for score 3 — `joint` and `2-step` modes empirically inferior per Dhuliawala+ arXiv:2309.11495 (+8.4 pt over CoT+revise on Wikidata factoid tasks). **Score**: 0 = no verification step (raw draft only); 1 = joint mode (verify+revise in same prompt — known weakest variant); 2 = 2-step mode (draft-then-verify but questions not independently answered); 3 = full factored mode (questions answered independently in separate contexts, then reconciled). **Measurement procedure**: read candidate's verification-loop code; identify (a) whether verification questions are derived from draft (D102=1+), (b) whether each question is answered in an isolated context with no draft access (D102=3 required for factor-independence), (c) whether reconciliation step is explicit (D102=3 required). **Pass/fail**: ≥2 for T1 install; ≥1 for T2; 0 = SOFT-WARN for cite-only candidates. **Cardinal-rule-6 link**: closes W341 11-round-codex-loop + hallucinated-SHA-cite failure mode at rubric layer — CoVe factored is the documented remedy per Meta AI evidence. **3-org-distinct anchors**: (a) Meta AI Research Dhuliawala+ arXiv:2309.11495 (peer-reviewed 2023 — primary source); (b) LangChain LCEL CoVe reference implementation (github.com/langchain-ai LangChain Inc — practitioner adoption); (c) agentwiki.org spec entry on Chain-of-Verification (community-curated meta-org distinct from Meta+LangChain). Over-coverage: Analytics-Vidhya blog impl walkthrough + Vacareanu+ 2024 stepwise-verifier extension. **Implementation hook**: `.claude/skills/citations-agent/SKILL.md` Phase-5 Gate-2 paraphrase-invariance can be UPGRADED to enforce CoVe factored as concrete mechanism per W372 SPEC (queued). [W367 Stream G §5 rank-2 + Section 2 #2 + W369 P1.6 §2]
  - **D103 `jury_on_demand_instance_reliability_weighting`** — W_install 0.4 / W_pattern 0.3 / W_cite 0.2 / E-skip if no jury-pool / score 0-3. EXTENDS sca-v12 §Δ50 Unit/Layer/Block verdict-DAG wiring (which uses MaxPool aggregation across N codex rounds). Measures whether candidate selects judges per-instance from a pool by reliability-prediction (rather than all-judges-weighted-equally). **Score**: 0 = single-judge always; 1 = N-judge fixed-pool with equal-weighted MaxPool/MajorityVote (current §Δ50 baseline); 2 = N-judge pool with per-judge confidence-weighted aggregation (CISC-style self-assessment); 3 = N-judge pool with per-instance reliability-prediction selection (OpenReview Jury-on-Demand 2025) + bias-corrected aggregation (CARE-style or distribution-calibrated Bradley-Terry per arXiv:2512.03019). **Measurement procedure**: read candidate's judge-selection logic; identify (a) whether judge pool size is fixed or instance-varying (D103=3 requires instance-varying), (b) whether judge weights are equal or reliability-weighted (D103=2+), (c) whether confounder-aware or bias-corrected aggregation is wired (D103=3 stretch). **Pass/fail**: ≥2 for T1; ≥1 for T2; 0 = SOFT-WARN (advisory only when candidate is not orchestrator-shaped). **3-org-distinct anchors**: (a) OpenReview 2025 "LLM Jury-on-Demand" paper id `XdcofpTCyq` (peer-reviewed conference submission — primary source); (b) haizelabs/verdict v0.2.1 MIT (Haize Labs Inc — practitioner library already wired in §Δ50); (c) LMSYS Arena (UC Berkeley — empirical jury benchmark at scale). Over-coverage: CARE confounder-aware aggregation (OpenReview 2025 same ID, distinct method) + Bradley-Terry-Davidson arXiv:2512.03019 Google Research. **Implementation hook**: `.claude/skills/citations-agent/SKILL.md` (W369 P1.2 jury-on-demand augmentation queued). [W367 Stream G §5 rank-4 + Section 2 #3 + W369 P1.6 §3]
  - **D104 `plan_executor_publisher_separation_present`** — W_install 0.5 / W_pattern 0.3 / W_cite 0.2 / T-skip if candidate is monolithic ReAct loop by design (no decomposition possible) / score 0-3. Measures whether candidate has explicit **planner / executor / publisher** boundary per gpt-researcher canonical architecture (Wang+ Plan-and-Solve 2023 arXiv:2305.04091). Distinct from D67 task_adaptive_topology_fit (which measures DAG-decomposition capability generally) — D104 specifically measures the planner-executor-publisher TRIAD which 13 of 15 deep-research frameworks converge on per Stream G Section 1 pattern-density-convergence finding. **Score**: 0 = monolithic loop (no separation); 1 = planner-executor (no publisher — synthesis tangled with execution); 2 = planner-executor-publisher present but boundary blurred (e.g. shared state mutation across stages); 3 = clean planner→executor→publisher pipeline with typed-artifact handoff between stages. **Measurement procedure**: read candidate's main control-flow; identify (a) whether plan-list is materialized as data (D104=1+), (b) whether execution iterates the plan without re-planning mid-flight (D104=2+), (c) whether publisher synthesis is structurally separate from execution (D104=3 required). **Pass/fail**: ≥2 for T1 (deep-research-class candidates); ≥1 for T2; T-skip permitted for non-research candidates where the triad is non-applicable. **3-org-distinct anchors**: (a) assafelovic/gpt-researcher (~17k★ canonical reference — independent maintainer-org); (b) stanford-oval/storm + Co-STORM (~22k★ Stanford NLP/OVAL — academic-org); (c) Wang+ Plan-and-Solve 2023 arXiv:2305.04091 (Singapore Management University + Salesforce Research — distinct from Stanford/gpt-researcher). Over-coverage: LangChain `plan-and-execute` agents (LangChain Inc practitioner adoption). [W367 Stream G §5 supporting + Section 1 pattern-density-convergence finding + W369 P1.6 §4]
  - **D105 `judge_human_kappa_z_score`** — W_install 0.4 / W_pattern 0.0 / W_cite 0.3 / E-skip if no human-annotation calibration set / score = numeric z-score (NOT 0-3 ordinal — D105 is a continuous statistical signal mapped to ordinal in §3.5 below). Measures inter-rater agreement between judge-LLM and human raters per Cohen's-κ Turing-test for judges (arXiv:2510.09738). When `|z_LLM - μ_human| < 1`, LLM judge is statistically indistinguishable from human raters at p<0.05 (95% CI). **Score mapping** (for composite scoring): 0 = |z| > 3 (judge significantly diverges from human); 1 = 2 < |z| ≤ 3 (HARD-WARN); 2 = 1 < |z| ≤ 2 (SOFT-WARN); 3 = |z| ≤ 1 (human-like; PASS). **Measurement procedure**: (1) collect a calibration set of N≥30 instances (per Cohen's-κ statistical power requirement) with paired human-rater scores; (2) score same instances with candidate's judge-LLM; (3) compute Cohen's-κ per rater-pair; (4) z-test against `μ_human` distribution. **Pass/fail**: ≥2 for T1 install (when calibration set available); E-skip-with-rationale otherwise — `methodology_skip_rationale: "no-human-calibration-set-available"`. **W_pattern=0** intentional: this dim is install-runtime-only (no pattern-only adoption path — calibration set must be loaded per-candidate). **3-org-distinct anchors**: (a) arXiv:2510.09738 Turing-test-for-judges (peer-reviewed conference submission — primary source for z-score methodology); (b) Cohen 1960 "A Coefficient of Agreement for Nominal Scales" (Educational and Psychological Measurement — foundational statistics, distinct from arXiv author); (c) LMSYS Arena (UC Berkeley — empirical human-LLM agreement at scale; provides μ_human reference distribution). Over-coverage: arXiv:2510.11822 ai-cet/llm-judge-calibration TPR/TNR regression (Soroush Vosoughi group, Dartmouth — alternative agreement-measurement methodology). **Implementation hook**: requires human-calibration-set ingestion — DEFERRED to W372+ when calibration set is collected per Stream G Section 9 convergence-gap. Until then D105 fires as M-skip + `methodology_skip_rationale: "no-human-calibration-set-W372-deferred"`. [W367 Stream G §5 supporting + Section 2 #6 + W369 P1.6 §5]

---

## §4. D-EMP empirical_viability HARD GATE (sca-v8.1-partial W319 RATIFY)

**PRE-COMPOSITE gate executed BEFORE weighted-sum.** Distinct from dim-internal hard-caps. NOT a tiebreaker.

| D-EMP | Meaning | Effect |
|---|---|---|
| 0 | untested / smoke fails in-runtime | **HARD BLOCK** from T1/T1-PROV/T2 (demoted T3-or-lower) |
| 1 | tested-in-sandbox-only / no soak | SOFT WARN: T2-CHERRY ceiling; T1 requires explicit operator-override + W-wave docket entry |
| 2 | tested + 1-cycle uneventful | normal weighted-sum applies |
| 3 | tested + multi-day production | normal |
| 4 | tested + multi-wave soak (≥4 waves) | normal + +0.5 to D2 governance lift |
| 5 | tested + ≥8-wave soak + adversarial-survival | normal + +1.0 to D2 lift |

W_install=1.0, W_pattern=0.5.

**3-org-distinct anchors**: NIST AI 600-1 MEASURE-2.3 (NIST/US DoC) + OpenSSF Brittle Tests (OpenSSF/Linux Foundation) + Google SRE Book Ch.17 + Ch.22 (Google LLC).

**W295 I9 self-reference invariant**: arch-itself classification per §5c Skip-N/A taxonomy.

---

## §5. Skip-N/A Taxonomy (sca-v11 W327 K-3, codex r13/r14/r15/r16 ratified)

Per W295 §6.2 anti-bias inverse-test + W326 codex round-13 K-3 finding + W327 r14/r15/r16 ratify: sca-v10 widened skip-N/A across 6 dims (D-EMP + D34 + D42-D45) without distinguishing **tautological** from **methodology** vs **external-auditor-only** skip semantics. sca-v11 introduces 3-class taxonomy. **Codex-r14 closure**: T-skip is reserved ONLY for criteria circular-by-definition; unavailable-evidence is M-skip + audit-incomplete, NOT T-skip.

### §5.1 Skip-class definitions

| Skip class | Definition | composite_denom effect |
|---|---|---|
| **T-skip (tautological)** | Criterion definitionally circular | Excluded from arch-itself composite_denom |
| **M-skip (methodology)** | Could apply but intentionally not evaluated (evidence unavailable) | (a) score=1 worst-case + audit-incomplete-flag; OR (b) excluded from denom + audit-incomplete-flag — operator-decision |
| **E-skip (external-auditor-only)** | Only external auditor produces non-tautological evidence (codex / operator-as-external) | Excluded when no external auditor present; INCLUDED with external-fill when codex/operator audits |

### §5.2 Per-dim classification (arch-itself self-eval) — codex r14/r15/r16 ratified

| Dim | Class | Justification |
|---|---|---|
| D-EMP empirical_viability | **E-skip primary; M-skip fallback** | Operational probe over Langfuse/ledger → E-skip. Telemetry unavailable → M-skip + `methodology_skip_rationale: "telemetry-unavailable-pending-W325-A-fix"`. NOT T-skip per codex-r14. |
| D34 cohort_overlap_signal | **T-skip** | Arch IS the installed primitive set — recursion |
| D42 multi_mcp_convergence_signal | **T-skip** | Rubric IS the MCP-evidence taxonomy authority |
| D43 perplexity_research_signal | **E-skip primary; M-skip fallback** | External perplexity-query about CC category → E-skip. Perplexity-MCP unavailable → M-skip + `methodology_skip_rationale: "perplexity-MCP-key-rotation-pending"`. |
| D44 codex_round_efficiency | **E-skip** | Codex IS the measurement; round-1=5, round-2=4, round-3=3, round-4+=1 |
| D45 awesome_list_corroboration | **E-skip** (codex-r14 reclassified from T-skip) | Arch IS published as vendored skill at `.claude/skills/sota-convergence-audit/SKILL.md` + companion lists; externally measurable. |
| D47 ship_round_efficiency | **T-skip** | Codex-ratification-of-rubric IS tautological self-reference |
| D48 sandbox_compat_probe | **T-skip** | Probe-design measures non-rubric subjects |
| D66 probe_record_evidence_extraction | **T-skip** | Arch IS the evidence-pipeline source (W321→W328 absorb) |
| D69 dense_rubric_constructability | **T-skip** | Arch IS the rubric authority — recursion (W332 absorb) |
| D70 evallog_replayability | **E-skip primary; M-skip fallback** | inspect_ai EvalLog → E-skip when harness shipped (W329-C §9 P0-Action-2); M-skip + `methodology_skip_rationale: "inspect-ai-harness-pending-W332-W333"` until then. |
| D71 gepa_nightly_drift_resistance | **E-skip primary; M-skip fallback** | GEPA nightly cron → E-skip when stood up (W329-C §9 P1-Action-3); M-skip + `methodology_skip_rationale: "gepa-nightly-cron-pending-W333+"` until then. |
| D73 multi_source_first_discovery_diversity_score | **M-skip if MCP-cascade not fired** | MCP-cascade Stage-1 fired → arch-itself measurable (count distinct MCPs first-surfacing the SKILL.md). Stage-1 not fired → M-skip + `methodology_skip_rationale: "mcp-cascade-not-fired-arch-self-eval-only"`. NOT T-skip per W337 codex r1 anticipation. |
| D74 mcp_family_attribution_completeness | **T-skip** | Arch IS the attribution authority — recursive (rubric defines `mcp_family_attribution[]` schema) |
| D75 codex_round_cost_efficiency_ratio | **E-skip** | Recursive with D44 (codex IS the measurement); fallback M-skip + `methodology_skip_rationale: "codex-cost-telemetry-pending-W337-extend"` when telemetry unavailable. |
| D101 pareto_frontier_as_evaluation_primitive | **E-skip** | Arch IS the Pareto-frontier-routing authority via §Δ47 T2-CHERRY-FRONTIER sub-tier; D101 promotes that to primitive — recursive self-eval. Measurable for external candidates. |
| D102 chain_of_verification_factored_mode | **E-skip primary; M-skip fallback** | External candidate's draft-and-verify code → E-skip; arch's §Phase-5 Gate-2 paraphrase-invariance is CoVe-adjacent but not factored-mode — M-skip + `methodology_skip_rationale: "arch-Phase-5-Gate-2-is-CoVe-adjacent-not-factored-W372-deferred"` until W372 CoVe enforcement wave wires factored mode into Phase-5 Gate-2. |
| D103 jury_on_demand_instance_reliability_weighting | **E-skip primary; M-skip fallback** | External candidate's judge-pool → E-skip; arch's §Δ50 verdict-DAG uses equal-weighted MaxPool — M-skip + `methodology_skip_rationale: "arch-equal-weighted-MaxPool-jury-on-demand-pending"` until §Δ50 upgraded with per-instance reliability-weighted selection. |
| D104 plan_executor_publisher_separation_present | **T-skip if arch-itself** | Arch is a rubric, NOT a deep-research orchestrator — the planner-executor-publisher triad is non-applicable to a scoring-discipline artifact. Measurable for external orchestrator candidates. |
| D105 judge_human_kappa_z_score | **M-skip until calibration-set ingested** | No human-calibration-set currently available; `methodology_skip_rationale: "no-human-calibration-set-W372-deferred"`. Becomes measurable when W372+ collects N≥30 paired human-rated instances. |

### §5.3 Ledger field additions

```yaml
skip_class_per_dim:
  d_emp: E-skip|M-skip
  d34: T-skip
  d42: T-skip
  d43: E-skip|M-skip
  d44: E-skip
  d45: E-skip
  d47: T-skip
  d48: T-skip
  d66: T-skip
  d69: T-skip
  d70: E-skip|M-skip
  d71: E-skip|M-skip
  d73: M-skip|measurable
  d74: T-skip
  d75: E-skip|M-skip
  d101: E-skip|measurable
  d102: E-skip|M-skip
  d103: E-skip|M-skip
  d104: T-skip|measurable  # T-skip arch-itself; measurable for external orchestrator candidates
  d105: M-skip|measurable  # M-skip until calibration-set ingested W372+
external_auditor_present: bool
external_auditor_attribution: string  # e.g. "codex round-15 W327"
methodology_skip_rationale: string|null  # MUST be non-null for any M-skip
audit_incomplete: bool  # true when any dim defaulted to M-skip
```

### §5.4 3-org-distinct external anchors

- **ISO 19011:2018 Clause 4 Principle 5 Independence** — https://www.iso.org/standard/70017.html (ISO)
- **SOX §404(a)+(b)** — https://www.aicpa-cima.com/advocacy/article/sarbanes-oxley-act-section-404 (AICPA/CIMA)
- **CNCF Self-Assessment + Graduation Due-Diligence** — https://tag-security.cncf.io/community/assessments/guide/self-assessment/ (CNCF/Linux Foundation)
- Over-coverage 4th anchor: BetterBench Stanford methodology — https://betterbench.stanford.edu/methodology.html (Stanford HAI)

W295 I9 superseded by §5: each skip bears explicit T-skip/M-skip/E-skip classification with anti-bias ratification trail.

---

## §6. R5 5-Control Layered-Defense (W324)

Six-wave SHIP-BLOCKER (`bypassPermissions:true` + sandbox `enabled:false` convergent across W316-W319) resolved via layered-defense. NO single control sufficient; the layered set provides defense-in-depth per NIST 800-53 + CISA Zero-Trust + OWASP-A07.

| # | Control | Anchor |
|---|---|---|
| 1 | deny-default permissions | `.claude/settings.json` `permissions.deny` enumerates secrets-class paths; explicit allowlist. NIST 800-53 AC-3(3) + OWASP A01-2021 + Microsoft Zero-Trust |
| 2 | audit logging | PreToolUse hook emits audit-log row → `.claude/state/audit/<YYYY-MM-DD>.jsonl` for every Bash/Edit/Write/MCP fire. ≤2KB shim per CR-2 sanctioned-exception; SHA-256 hash chain. NIST 800-53 AU-2 + OWASP A09-2021 + CIS Control 8 |
| 3 | secret redaction | `gitleaks` PreToolUse on Bash/Edit/Write/Commit (CR-2 direct-CLI); `trivy fs` PostToolUse advisory. OWASP A02-2021 + NIST 800-53 SC-28 + gitleaks |
| 4 | egress policy | Operator-confirmed for any out-of-runtime POST; `mcp__chrome-devtools__*` sandbox-mode default. NIST 800-53 SC-7 + OWASP A10-2021 + CNCF Network Policy |
| 5 | drift detection | `git status` pre-commit verifies no unexpected file additions; SHA-pinned plugin updates; `.mcp.json` MCP-server commands MUST be `npx -y <pkg>@<pinned-version>` per CR-9 W286-arc-P0C. NIST 800-53 CM-8 + OWASP A06-2021 + SLSA v1.0 Build L3 |

**Convergent operator-decision required**: Controls 1-5 land BEFORE next-wave plugin-install action.

---

## §7. Composite Scoring Formula

### Path-(b) DEFAULT — D34 as scored dim (recommended per v7.1 Δ37)

```
install_score = sum(score_i × W_install_i × confidence_factor_i for i in scored_dims) / composite_denom_install
pattern_score = sum(score_i × W_pattern_i × confidence_factor_i for i in scored_dims) / composite_denom_pattern
cite_score    = sum(score_i × W_cite_i    × confidence_factor_i for i in scored_dims) / composite_denom_cite   # NEW v19 third composite
```

**v20 W369 P1.6 denoms**: composite_denom_install = 57.5 + 2.3 = **59.8** (D101 0.5 + D102 0.5 + D103 0.4 + D104 0.5 + D105 0.4 = 2.3 exact-sum); composite_denom_pattern = 29.4 + 1.3 = **30.7** (D101 0.4 + D102 0.3 + D103 0.3 + D104 0.3 + D105 0.0 = 1.3 exact-sum; D105 W_pattern=0 intentional per §3 D105 entry — install-runtime-only); composite_denom_cite = 12.0 + 1.4 = **13.4** (D101 0.3 + D102 0.4 + D103 0.2 + D104 0.2 + D105 0.3 = 1.4 exact-sum). History install: v9=34.7→v10=36.8→v11=39.4→v12=39.8→v13=42.5→v14=44.0→v15=46.9→v17=48.5→v19=57.5→**v20=59.8**; pattern: v9=14.5→v10=16.0→v11=17.0→v12=17.3→v13=18.9→v14=19.8→v15=21.8→v17=22.9→v19=29.4→**v20=30.7**; cite: v19=12.0→**v20=13.4** (cite composite NEW at v19).

> **Previous v17 W344 denoms** (retained for decision-decay reference): composite_denom_install=48.5 (=46.9+0.6+0.5+0.5 for D81/D82/D83); composite_denom_pattern=22.9 (=21.8+0.4+0.3+0.4). **v19 W367 Stream E denoms**: composite_denom_install=57.5 (+9.0 D84-D100 W_install sum); composite_denom_pattern=29.4 (+6.5 D84-D100 W_pattern sum); composite_denom_cite=12.0 (NEW 3rd composite). v17 and v19 verdicts retained-as-written with `rule_version: sca-v17` / `rule_version: sca-v19` annotation per §8.5 decay state machine.

### Arch-itself denom (W295 I9 EXTENDED per §5 Skip-N/A taxonomy)

D-EMP + D34 + D42 + D43 + D44 + D45 + D47 + D48 + D66 + D69 + D70 + D71 skip-N/A per §5.2 classification (D69 dense-rubric-constructability is tautologically arch-itself = the rubric authority; D70 evallog-replayability is E-skip pending inspect_ai harness ship per W329-C §9 P0-Action-2; D71 GEPA drift-resistance is M-skip pending nightly-cron stand-up per W329-C §9 P1-Action-3). D67 + D68 + D72 measurable for arch-itself (D67 topology-fit testable via DAG-decomposition probe; D68 deliberation-first testable via Phase-1 meta-reasoning audit; D72 episodic-reflection testable via T6 basic-memory cross-wave retrieval).

**Arch-itself denom_install**: v13=34.3 (v12 32.9 + D67 0.6 + D68 0.4 + D72 0.4; D69/D70/D71 skip-N/A per W329-C §8.5); **v14=35.0** (v13 + D73 0.7 measurable arch — count distinct MCPs first-surfacing SKILL.md; D74 T-skip arch recursive attribution; D75 E-skip arch recursive with D44 codex authority).

### Decision-decay state machine

v12 → ×0.95 under v13; v11 → ×0.9025 compound; v10 → ×0.857 compound; v9 → ×0.815 compound; v8.1-partial → ×0.774; v7.1 → ×0.735; v7 → ×0.696; v6.1 → ×0.661; v5 → ×0.628; v3.1 → ×0.536; v3 → ×0.536; v2 → ×0.383; v1 → ×0.274. Operator-override may restore full weight per `decision_decay_override: true` annotation. **v13 NEW per W329-C §8.5**: ALL pre-v13 verdicts re-scored only if D71/D72 evidence becomes available; otherwise existing scores retained with `rule_version: sca-v12.1` annotation.

### Ship-gate floors

| Tier | install_score floor | pattern_score floor | D-EMP floor | D-CCRT (D35) floor |
|---|---|---|---|---|
| T0 IMMEDIATE-UPGRADE | 4.7 | n/a | ≥3 | ≥2 |
| T1 INSTALL | 4.5 | n/a | ≥2 | ≥2 |
| T1-PROVISIONAL | 3.8 | n/a | ≥1 | ≥1 |
| T2 VENDOR-FORK | 3.2 | 4.0 | ≥1 | ≥1 |
| T2-CHERRY-FRONTIER (Δ47) | 3.0 | 3.8 | ≥1 | ≥1 |
| T2-CHERRY | 3.0 | 3.8 | ≥1 | ≥1 |
| T3 PATTERN-STUDY | 2.5 | 3.5 | n/a | 0 |
| T4 CITE-ONLY | n/a | 3.0 | n/a | 0 |
| T5 REJECT | <2.5 | <3.0 | 0 | n/a |

**sca-v12 ops-rhythm K-7 cross-reference (W327 codex round-14 Path B ratified)**: 3-wave / 5-wave / 8-wave P0 dwell-threshold escalation ladder + arch-itself install_score penalty per `.claude/skills/ops-rhythm/SKILL.md` §1.1:
- 3-wave dwell → owner-assignment + ETA required (no score effect)
- 5-wave dwell → operator-decision-block (ledger surfaces `dwell_disposition_signed:` row)
- 8-wave dwell → SHIP-BLOCKER + **-0.5 install_score arch-itself penalty**

See ops-rhythm for full schema (`dwell_count`, `dwell_class`, `dwell_threshold_state`, `dwell_disposition`, `dwell_disposition_signed`) and 3-org-distinct anchors (Google SRE Error Budget Policy + Atlassian Kanban WIP/queue-aging + ITIL v4 Axelos).

---

## §8. Meta-Invariants I1–I11 (W295 sourcing discipline; +I10 W337 sca-v14; +I11 W353-S3 sca-meta-audit F2 closure)

| Inv | Rule |
|---|---|
| I1 | 3-org-distinct anchors per scored dim (organizational, NOT documentary subtree) |
| I2 | `sources_typed[]` MUST capture WHICH MCP-family saw each claim (`mcp_family_attribution[]`) |
| I3 | `disagreement[]` flagged when sources contradict; codex mediation fires when ≥2 |
| I4 | `cascade_degraded=true` MUST cap D5 at 4 |
| I5 | **v14 W337**: stars LEGACY sub-signal + `pattern_density_score` PRIMARY sub-signal of D12; D12 caps at 3 when neither pattern_density nor stars ≥2 |
| I6 | Ledger ALL verdicts to T6 basic-memory (canonical); T1 hindsight RETIRED (W317); best-effort T2 KG |
| I7 | Codex GPT-5.5 Phase-6 position-swap mandatory for T1/T1-PROV/T2 |
| I8 | Decision-decay version-bump downweights apply automatically |
| I9 | **Arch-itself skip-N/A is CLASSIFIED per §5 taxonomy (T-skip / M-skip / E-skip)** — each skip MUST record `skip_class` + `external_auditor_present` in ledger row; M-skip MUST include `methodology_skip_rationale` + `audit_incomplete: true` flag |
| I10 | **v14 W337**: D73 first-discovery diversity MUST cite WHICH MCP first-found each candidate — `mcp_family_attribution[]` distinguishes `first_discovered_by:` vs `confirmed_by:` per claim; D73 ≥4 requires ≥2 non-github first-discoveries (extension of I2) |
| I11 | **W353-S3 sca-meta-audit F2 closure**: Arch-itself self-eval CANNOT route to T1/T1-PROV/T2 without external-auditor sign per §5.1 E-skip semantics. Closes latent recursion bypass identified by sca-meta-audit 2026-05-21: rubric is computationally able to score itself via reduced denom (§7 `Arch-itself denom_install` v14=35.0) but §7-9 ship-gate floors (T0=4.7, T1=4.5, T1-PROV=3.8, T2=3.2) had NO rule blocking such an install_score from passing. I11 makes the block explicit: any verdict row with `subject = "<this rubric>"` MUST carry `external_auditor_present=true` + the auditor's verdict OR be auto-downgraded to T3-PATTERN-ONLY. |

---

## §9. Decision-Tree Router (8-tier ladder incl. T2-CHERRY-FRONTIER per Δ47)

```
START
  │
  ├─ Stage-0 existence-probe FAIL → T5 NON-EXISTENT
  ├─ D-EMP=0 → BLOCK from T1/T1-PROV/T2; route T3-or-lower
  ├─ D35<2 → cap at T3 PATTERN-STUDY (no CC-runtime pathway)
  ├─ Cardinal-rule violation (R1/R2/R3/R4/R5) → T5 REJECT-CR-VIOLATION
  ├─ D18 universal-REJECT (privacy/safety) → T5 REJECT
  ├─ D1 license-incompat for INSTALL → cap at T2 VENDOR-FORK
  │
  ├─ install_score ≥4.7 + D-EMP≥3 + D35≥2 + UPGRADE-IN-PLACE → T0 IMMEDIATE-UPGRADE
  ├─ install_score ≥4.5 + D-EMP≥2 + D35≥2 + cascade_degraded=false → T1 INSTALL
  ├─ install_score ≥3.8 + D-EMP≥1 + D35≥1 + cascade_degraded=true + 24h SLA → T1-PROVISIONAL
  ├─ install_score ≥3.2 + pattern_score ≥4.0 + license OK → T2 VENDOR-FORK
  ├─ D33 quorum_unmet AND top-3 on any dim-subset → T2-CHERRY-FRONTIER (Δ47)
  ├─ install_score ≥3.0 + pattern_score ≥3.8 + per-component-cherry viable → T2-CHERRY
  ├─ pattern_score ≥3.5 + D13≥4 → T3 PATTERN-STUDY (study + document; no install)
  ├─ pattern_score ≥3.0 → T4 CITE-ONLY (reference in docs; no code import)
  └─ ELSE → T5 REJECT (stated rationale)
```

**Cascade-completion gate (Δ35, v7.1)**: T1-PROVISIONAL interim with 24h re-cascade SLA when `cascade_degraded=true AND install_score ≥3.8 AND any unscored dim has W_install ≥0.5`.

**T2-CHERRY-FRONTIER (Δ47, v12)**: candidate retained when D33 quorum_unmet AND top-3 on any non-empty dim-subset. Operator promotes with `+frontier` justification.

---

## §10. Codex GPT-5.5 Cross-Model Gate

Plugin-native Stop-hook auto-fires session-end per `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s).

| Round | Trigger | Action |
|---|---|---|
| Round-1 | Default (always fires for T1/T1-PROV/T2) | Codex GPT-5.5 reviews verdict + evidence + scoring trace |
| Round-2 | Round-1 `NEEDS-REVISION` OR `REVISE` | Operator absorbs findings inline; re-dispatch |
| Round-N | Operator extended-review mandate | Multi-round until APPROVE OR explicit operator-BLOCK |

Position-swap re-invocation MANDATORY for T1 INSTALL per Phase-5 5-gate (Zheng+ 2023 MT-Bench + JudgeLM 3-org convergence).

**Ledger schema** (T6 basic-memory write per verdict):

```yaml
slug: <owner>/<repo>
verdict: T0|T1|T1-PROV|T2|T2-CHERRY-FRONTIER|T2-CHERRY|T3|T4|T5
install_score: <0-5.000>
pattern_score: <0-5.000>
d_emp: <0-5>
d_ccrt_d35: <0-5>
d38_mcp_native: <1-5>
d39_opus_4_7: <1-5>
d40_z_portable: <1-5>
d41_loop_compat: <1-5>
d42_multi_mcp_convergence: <1-5>
d43_perplexity_research: <1-5>
d44_codex_round_efficiency: <1-5>
d45_awesome_list_corroboration: <1-5>
d46_inv_template_compliance: <0-5>
d47_ship_round_efficiency: <1-5>
d48_sandbox_compat_probe: <1-5>
d49_secret_staging_risk: <1-5>
d52_community_health_corroboration: <1-5>
d66_probe_record_evidence_extraction: <0-5>
d67_task_adaptive_topology_fit: <1-5>
d68_deliberation_first_score: <1-5>
d69_dense_rubric_constructability: <1-5>
d70_evallog_replayability: <0-5>
d71_gepa_nightly_drift_resistance: <1-5>
d72_episodic_reflection_persistence: <1-5>
d73_multi_source_first_discovery_diversity: <1-5>
d74_mcp_family_attribution_completeness: <1-5>
d75_codex_round_cost_efficiency_ratio: <0-5>
d76_empty_final_message_detection: <0-3>
d77_fail_closed_worker_exception_handler: <0-3>
d78_budget_cap_enforcement: <0-3>
d79_typed_prompt_program_paradigm: <0-3>
d80_independence_proof_multi_org_anchor: <0-3>
d101_pareto_frontier_as_evaluation_primitive: <0-3>
d102_chain_of_verification_factored_mode: <0-3>
d103_jury_on_demand_instance_reliability_weighting: <0-3>
d104_plan_executor_publisher_separation_present: <0-3>
d105_judge_human_kappa_z_score: <numeric z-score|null>  # null when E-skip-no-calibration-set fires
d12_pattern_density_score: <1-5>  # sub-signal of D12 — v14 PRIMARY (stars LEGACY)
cite_score: <0-5.000>  # NEW v19 3rd composite — required for cite-only verdicts
rule_version: sca-v20
cascade_cost_actual: <$X.XX>
cascade_degraded: <bool>
mcp_family_count: <int>
mcp_family_attribution: [<list>]
sources_typed: {...}
disagreement: [...]
phase_5_gates: {provenance, paraphrase, adversarial, contamination, replayable}
position_swap_consistent: <bool>
eval_log_path: verdicts/W<wave>-<slug>-evallog.json
probe_record_path: verdicts/W<wave>-<slug>-probe-record.json
codex_round_1_verdict: APPROVE|REVISE|NEEDS-REVISION|BLOCK
codex_round_2_verdict: <if applicable>
skip_class_per_dim: {d_emp, d34, d42, d43, d44, d45, d47, d48, d66, d69, d70, d71, d73, d74, d75, d76, d77, d78, d79, d80, d101, d102, d103, d104, d105}
external_auditor_present: <bool>
external_auditor_attribution: <string>
methodology_skip_rationale: <string|null>
audit_incomplete: <bool>
dwell_count: <int>
dwell_class: <fresh|3-wave|5-wave|8-wave>
wave: W<NNN>
date: YYYY-MM-DD
rollback_plan: <1-paragraph or path-to-runbook>
```

---

## §11. sca-v20 increment from W369 P1.6 (G meta-patterns) — rationale per-dim

This section codifies the W369 P1.6 deliverable: absorbing 5 meta-patterns from W367 Stream G research-architecture meta-SOTA findings (`docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-G-RESEARCH-ARCH-META.md` §5 top-5 recommendations + Section 2 multi-angle-convergence + Section 4 decision-making-improvement). Rationale per dim:

| Dim | Pattern absorbed | Why now (W369) | Closes which failure-mode | Stream-G rank |
|---|---|---|---|---|
| **D101** | Pareto-frontier-as-primitive (promotion from §Δ47 sub-tier) | sca-v17 §Δ47 absorbs Pareto-frontier as T2-CHERRY-FRONTIER routing-hint only — NOT a top-level scored primitive. GEPA ICLR 2026 Oral evidence (+13% over MIPROv2, +20% over GRPO, 35× fewer rollouts) demands first-class status. | "single-best-only" anti-stagnation loophole; legacy single-best rankings collapse multi-objective trade-offs to a degenerate winner. | #1 |
| **D102** | Chain-of-Verification factored mode | W341 verdict-ledger surfaced 11-round-codex-loop + hallucinated-SHA-cite failure mode at ledger layer; CoVe factored is the documented remedy per Meta AI Research +8.4 pt evidence. sca-v17 §Phase-5 Gate-2 paraphrase-invariance is weaker (no factor-independence). | hallucinated-fact / fabricated-cite at draft-time; cardinal-rule-6 verify-before-claim violation at the rubric layer. | #2 |
| **D103** | Jury-on-Demand instance-reliability weighting | sca-v12 §Δ50 Unit/Layer/Block wires verdict v0.2.1 MaxPool aggregation but treats all judge-rounds equally. OpenReview Jury-on-Demand 2025 + CARE confounder-aware aggregation (-25.15% error) demand per-instance reliability-weighted selection. | "all-judges-weighted-equally" bias; judge-confidence variance across instances erased by MaxPool/MajorityVote. | #4 |
| **D104** | Plan-executor-publisher separation present | Stream G Section 1 pattern-density-convergence found 13-of-15 top deep-research frameworks (gpt-researcher canonical reference) converge on the planner-executor-publisher TRIAD. sca-v17 D67 task_adaptive_topology_fit measures DAG-decomposition generally but not the triad specifically. | "monolithic ReAct loop" anti-pattern; synthesis tangled with execution; no clean handoff between stages. | Section 1 finding |
| **D105** | Judge-human Cohen's-κ z-score | sca-v17 D44 codex_round_efficiency measures round-cost but not LLM-judge ↔ human-rater statistical agreement. arXiv:2510.09738 "LLM-Turing-test for judges" provides the methodology; LMSYS Arena provides μ_human reference. | "untested-judge-LLM" deployment risk; no statistical-validity check on judge-LLM verdicts. M-skip + deferred until calibration set collected (W372+). | #6 (Section 2) |

**Implementation hooks already shipped or queued**:

- **D101** consumer skill: `.claude/skills/dspy-integration/SKILL.md` (W369 P1.1 Pareto-frontier-routing augmentation — sibling-task in this wave).
- **D102** consumer skill: `.claude/skills/citations-agent/SKILL.md` Phase-5 Gate-2 upgrade DEFERRED to W372 CoVe enforcement wave per Stream G §11 recommendation.
- **D103** consumer skill: `.claude/skills/citations-agent/SKILL.md` (W369 P1.2 jury-on-demand augmentation — sibling-task in this wave).
- **D104** consumer artifact: none yet — measurable purely against external candidates' main control-flow (no local-skill hook needed).
- **D105** infrastructure prerequisite: human-calibration-set ingestion DEFERRED to W372+ per Stream G Section 9 convergence-gap. Until then D105 fires as M-skip + `methodology_skip_rationale: "no-human-calibration-set-W372-deferred"`.

**Cite-anchor floor**: each D101-D105 carries ≥3 organizationally-distinct anchors per cardinal-rule-6 + sca-v17 I1 (organizational, NOT documentary-subtree). Anchor distinctness verified against Stream G Section 7 3-org-distinct citation index (15 distinct anchor-orgs enumerated).

**Composite-denom arithmetic invariance**: per W341-r1 codex-corrected discipline — every denom update MUST exactly-sum its new-dim W-contributions. D101-D105 deltas verified: install +2.3 (= 0.5+0.5+0.4+0.5+0.4); pattern +1.3 (= 0.4+0.3+0.3+0.3+0.0); cite +1.4 (= 0.3+0.4+0.2+0.2+0.3). No rounding-truncation per W341 consistency-discipline.

**Decay state-machine update (§8.5)**: v19 → ×0.95 under v20; v17 → ×0.9025 compound; v16 → ×0.857 compound; older versions multiplied accordingly. Operator-override may restore full weight per `decision_decay_override: true` annotation. ALL pre-v20 verdicts re-readable with `rule_version: sca-v17` / `rule_version: sca-v19` annotation; re-scoring only when D101-D105 evidence becomes available for an existing verdict.

**Stream G out-of-scope deferred**: CARE confounder-aware aggregation (D85 sub-criterion candidate for sca-v21+); Bradley-Terry-Davidson distribution-calibrated aggregation (sca-v21+); Outcome-based Process Verifier OPV (sca-v22+ — requires verifier-training infrastructure); Constitutional Tribunal with appeal phase (sca-v21 D89 candidate per Stream G Section 4 #14); minority-veto aggregation (D103 sub-criterion candidate for sca-v21).

---

## Lineage (terse, full history at `.claude/skills/_archived/W324-pre-sca-v9/`)

- v1 W269 — 7-dim rubric
- v3 W288 — 14 canonical dims + DUAL composites + 5-tier soft-gate
- v3.1 W293 — D16-D18 (bus_factor + robustness + safety)
- v5 W299 — D19-D21 + multi-MCP cascade + Phase-5 5-gate + Phase-6 position-swap
- v6 W310 — D22-D23 + cascade-coverage tier-floor + DeepWiki+Repomix mandatory
- v7 W314 — D25-D33 + 6-axis soft-gate + decision-tree
- v7.1 W316 — D34 inverted + Stage-0 existence-probe + 7-tier ladder + T2-CHERRY
- v7.2 W317 — D36-D37 META at W=0.0
- v8.1-partial W319 — D-EMP HARD GATE + D35 D-CCRT
- v9 W324 — D38+D39+D40+D41 CC-runtime; R5 5-control layered-defense
- v10 W325 — D42 multi_mcp_convergence + D43 perplexity_research + D44 codex_round_efficiency + D45 awesome_list_corroboration; D34 W_install 0.7→0.9 Stream-C Gap-3 fix; denom install 34.7→**36.8** (W326-B-1 corrected), pattern 14.5→**16.0**; arch-itself I9 EXTENDED to skip-N/A D42-D45
- v11 W326 — D46+D47+D48+D49 (INV/ship/sandbox/secret) per Stream-C `STREAM-C-SCA-V11.md`; D52-D65 Stream-H deep-research-dim track; denom install 36.8→**39.4** (+0.7+0.5+0.6+0.8), pattern 16.0→**17.0**; arch-itself denom_install 31.4→32.9 (+D46 0.7 + D49 0.8)
- v11 W327 — K-3 codification: skip-N/A taxonomy split T-skip / M-skip / E-skip; per-dim classification table (D-EMP E-skip/M-skip; D34 T-skip; D42 T-skip; D43 E-skip/M-skip; D44 E-skip; D45 E-skip per codex-r14 reclassification); ledger field additions; K-7 ops-rhythm Path B cross-reference for 8-wave P0 dwell -0.5 install_score arch-itself penalty
- v12 W328 — W321→W328 absorb wave: Δ47 Pareto-frontier reflective routing (Phase-5 Gate-3 → T2-CHERRY-FRONTIER sub-tier) + Δ49 EC-PROMETHEE committee-aggregation (Phase-4 fragile-winner / robust-compromise) + Δ50 Unit/Layer/Block codex DAG (Phase-6) + Δ51 markitdown probe-record (Stage-0 + Phase-5 Gate-5; scored as D66) + Δ52 community-health corroboration (Phase-3 D2 cross-corroboration; scored as D52); composite_denom install 39.4→**39.8** (+D66 0.4), pattern 17.0→**17.3** (+D66 0.3); arch-itself denom unchanged 32.9 (D66 T-skip). Per `docs/architecture/W328-SKILL-ABSORB-WAVE/W328-A-SYNTHESIS.md`.
- **v12.1 W329** — Δ33 reframe (W328-S1 HF + S2 GH-MCP USER-ERROR-CONFIRMED): "silent-fallback workaround" framing WITHDRAWN; replaced with right-tool-for-job qualifier discipline (`get_repository` for slugs; `search_repositories` only with valid qualifiers; `hub_repo_search` only with single-token or tag-filter). NEW §1.5 Stage-0.5 ENUMERATION-BYPASS gate mandates HF M5 DuckDB-snapshot (primary) + M1 cursor-walk (delta) and GH 6-step cascade (GraphQL sizing → window-partition → cursor → BigQuery cross-check → ecosyste.ms anti-star-bias → GH Archive trending) when search-family + >1000 results. Composite denoms unchanged from v12. Paste-ready queries at `references/stage-0-bypass-cascade.md`. Per `docs/architecture/W329-DELTA33-REFRAME/W329-A-SYNTHESIS.md`.

### v12 → v13 → v14 → v15 → v16 (W332/W337/W340/W343 terse — full bodies archived)

- v13 W332: +D67-D72; denom_install 39.8→42.5. Archive `docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-A-SCA-V13-CODIFY.md`.
- v14 W337: +D73-D75 + D12 stars→pattern_density swap; denom_install 42.5→44.0. Archive `docs/architecture/W337-CONTINUE/W337-A-SCA-V14-CODIFY.md`.
- v15 W340: +D76-D80 orchestration-fail-CLOSED + typed-program-paradigm; denom_install 44.0→46.9, pattern 19.8→21.8. Archive `docs/architecture/W340-FULL-SOTA-UNLEASH/S3-SYNTHESIS-INTEGRATION.md` §A.1.
- v16 W343: D80 measurable evidence-table binary pass/fail; denom_install 46.9 unchanged. Archive `docs/architecture/W343-EXECUTE/Y4-sca-v16-D80-table.md`.

### v16 → v17 (W344 Stream Z5, 2026-05-20) — multi-angle MCP convergence + low-stars-high-quality + decision-impact-tier

v17 W344 Stream Z5 — research-arch-ingest + 3-dim-absorb wave: +D81 multi_angle_mcp_convergence (W_inst 0.6, E-skip-arch; PASS gate ≥4-distinct-MCP-family) + D82 low_stars_high_quality_override (W_inst 0.4, E-skip-if-≥500★; D12 pattern-density override unlocks T2-CHERRY for <500★ + active-maintainer + ≥3-org-cite repos) + D83 decision_impact_tier (W_inst 0.5, E-skip-no-layer; dual-axis action×L1-L10 architecture-layer); denom_install 46.9→**48.5** (+1.6 exact-sum; W_install contributions: 0.6+0.5+0.5=1.6); pattern 21.8→**22.8** (+1.0 exact-sum; W_pattern contributions: 0.4+0.3+0.4=1.1, but D82 W_pattern=0.3 — exact: 0.4+0.3+0.4=1.1 → 22.9 rounded to **22.8** post-decimal-truncation per W341-style consistency-discipline = **22.9** corrected); arch-itself denom unchanged (D81/D82/D83 all E-skip-arch). §10 rule_version sca-v16 → **sca-v17** + d81-d83; §8.5 v16→×0.95 under v17; v16 verdicts retained-as-written with `rule_version: sca-v16` annotation. Per-dim 3-org-distinct anchors: **D81** (NIST AI 600-1 MEASURE-3.1 + OSSF Scorecard multi-checker convergence + Anthropic claude-cookbooks `research_lead_agent.md` `<use_parallel_tool_calls>` MUST-block); **D82** (OSSF Criticality Score formula-without-stars + Linus Torvalds/Linux Kernel `Reviewed-by:` discipline + IEEE Software Borges/Hora/Valente 2018 stars≠quality empirical study); **D83** (ISO/IEC 25010:2011 §6 quality-attribute architecture-impact + ITIL 4 Service Strategy change-impact=scope×risk×reversibility + NIST SP 800-218 PW.7 Review/Analyze Code). Research-arch ingest verdict: 3 repos (lastmile-ai/mcp-agent + microsoft/autogen + langchain-ai/langgraph) audited, 11 patterns mapped, **0 drift** across local skills (`mcp-agent-patterns`, `agent-budget-discipline`, `worker-failure-termination-guard`, `empty-final-message-guard`, `checkpoint-resume`); 2 NEW primitives surfaced (langgraph `add_messages` reducer + `ConditionalEdge`) → D84 candidate `state-reducer-discipline` queued for W345+. Effectiveness telemetry spec: `.claude/state/sca-decision-outcomes.json` schema + measurement-after-N=3-waves outcome tracking + 80% effectiveness_ratio SLO target (NIST 800-160 Vol.2 SC-29 + Anthropic claude-cookbooks evaluator-optimizer + Google SRE Ch.4 SLO). Discharges W344-Z5 P2.1-P2.5 + research-arch ingest. Detail: `docs/architecture/W344-SOTA-UNLEASH/Z5-sca-v17-increment.md` + `Z5-research-arch-ingest.md` + `Z5-effectiveness-telemetry-design.md`.

### v17 → v19 → v20 (W367 Stream E → W369 P1.6, 2026-05-22) — supply-chain consolidation + 3rd composite W_cite + G meta-patterns

- **v19 W367 Stream E (design — `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-E-RUBRIC-V19.md`)**: +D84-D100 (17 new dims: CC-runtime composite-rollup, supply-chain SLSA-L0..L3 HARD-GATE, license traffic-light, decision-tier T0-T5 formal, security CVE+CISA-KEV HARD-GATE, etc.) + formal **3rd composite** `cite_score` for cite-only verdicts (denom=12.0); denom_install 48.5→**57.5** (+9.0 D84-D100 W_install sum); denom_pattern 22.9→**29.4** (+6.5 D84-D100 W_pattern sum); cite composite NEW. Per-dim definitions + 3-org-distinct anchors at design archive — v19 baseline ratification incremented via v20 P1.6 absorption (this entry).
- **v20 W369 P1.6 (this entry)**: +D101 pareto_frontier_as_evaluation_primitive (W_install 0.5 / W_pattern 0.4 / W_cite 0.3 / E-skip-arch; PROMOTES §Δ47 sub-tier to top-level primitive per GEPA ICLR 2026 Oral evidence) + D102 chain_of_verification_factored_mode (W_install 0.5 / W_pattern 0.3 / W_cite 0.4 / E-skip-if-no-draft; CLOSES W341 hallucinated-SHA failure-mode per Meta AI CoVe arXiv:2309.11495 +8.4 pt evidence) + D103 jury_on_demand_instance_reliability_weighting (W_install 0.4 / W_pattern 0.3 / W_cite 0.2 / E-skip-if-no-jury-pool; EXTENDS sca-v12 §Δ50 verdict-DAG with per-instance reliability selection per OpenReview Jury-on-Demand 2025) + D104 plan_executor_publisher_separation_present (W_install 0.5 / W_pattern 0.3 / W_cite 0.2 / T-skip-if-monolithic-ReAct; 13-of-15 deep-research frameworks converge per gpt-researcher canonical reference) + D105 judge_human_kappa_z_score (W_install 0.4 / W_pattern 0.0 / W_cite 0.3 / E-skip-if-no-calibration-set; numeric z-score per arXiv:2510.09738 LLM-Turing-test methodology — M-skip deferred until W372+ calibration set); denom_install 57.5→**59.8** (+2.3 exact-sum: 0.5+0.5+0.4+0.5+0.4); denom_pattern 29.4→**30.7** (+1.3 exact-sum: 0.4+0.3+0.3+0.3+0.0; D105 W_pattern=0 intentional — install-runtime-only); denom_cite 12.0→**13.4** (+1.4 exact-sum: 0.3+0.4+0.2+0.2+0.3); arch-itself denom unchanged (D101/D102/D103 all E-skip-arch; D104 T-skip-arch if monolithic; D105 M-skip-pending-calibration). §10 rule_version sca-v19 → **sca-v20** + d101-d105; §8.5 v19→×0.95 under v20; v17 + v19 verdicts retained-as-written with respective `rule_version:` annotations. Rationale per dim at **§11** above. Stream-G out-of-scope deferred to sca-v21+: CARE confounder-aware aggregation, Bradley-Terry-Davidson, OPV process-verifier, Constitutional Tribunal, minority-veto aggregation. Sibling W369 P1.1+P1.2 augment consumer skills `.claude/skills/dspy-integration/SKILL.md` (D101) + `.claude/skills/citations-agent/SKILL.md` (D103 + queued D102 W372). Detail source: `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-G-RESEARCH-ARCH-META.md` Section 4 + Section 5 top-5 rank.

Full per-dim catalog: `references/dimensions.md`. Verbose iteration history: `.claude/skills/_archived/W324-pre-sca-v9/SKILL-sca-v8.1-partial.md`.

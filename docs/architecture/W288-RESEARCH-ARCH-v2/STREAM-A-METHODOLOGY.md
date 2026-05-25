# W288 STREAM A — Research-Architecture Methodology v2

> **Wave**: W288 — Research-Architecture Enhancement (META-level)
> **Stream**: A (of A/B/C/D) — Methodology and source-family inventory
> **Date**: 2026-05-18
> **Author**: Claude Code subagent fork (parent orchestrator runs Streams A-D in parallel)
> **Owner-boundary**: ONLY this file. Streams B/C/D own their own files.
> **Cite-class**: `effective_tier=TIER-2-CONVERGENT` (TIER-1 Anthropic + Stanford CRFM + UKAISI primary cites + TIER-2 multi-org practitioner reports).
> **Builds on**: W283 Streams 2+5 → W284a sota-convergence-audit v2 (7-dim, typed-evidence) → W286d 8 evolution targets → W287 Streams D/E/F/G (verdict re-litigation lessons) → THIS doc supersedes the discovery-only fragments scattered across those.

---

## §0 — Method + cite-class

### §0.1 — What this document is

A **canonical methodology** for the runtime's research-architecture — the system that decides "what is SOTA?", "what should we adopt?", "where does our evidence live and how do we know it converges?". The current state is functional but fragmented: 7-dim rubric in `sota-convergence-audit/SKILL.md` v2, 23-dim master matrix in `W259-grand-catalog/05-scoring/`, 5-phase pipeline cited in W259 ultimate-synthesis, 8 evolution targets enumerated in W286d. This Stream A unifies them under one funnel, anchors each stage in cite-traceable external SOTA (academic + agent-research + awesome-list curation + multi-source verification), and enumerates the discovery-source families + MCP-server research tooling that the funnel composes over.

### §0.2 — What this document is NOT

NOT an audit verdict for any candidate. NOT a scoring re-roll. NOT a skill modification (Stream C owns rubric v3; this file documents the methodology rationale). NOT a /goal.

### §0.3 — Source diversity — claim (typed-evidence-v2 contract)

Per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` §3 "≥1 BENCHMARK + ≥1 CODE READING + ≥1 PRACTITIONER FIELD REPORT, organizationally distinct":

- **BENCHMARK**: Stanford HELM 7-dim holistic eval (TIER-1 primary at `crfm.stanford.edu/helm`, arXiv 2211.09110); UK AISI `inspect_ai` Task/Solver/Scorer composition (TIER-1 primary via deepwiki on `UKGovernmentBEIS/inspect_ai`); OpenAI SWE-bench Verified methodology + contamination disclosure (`openai.com/index/introducing-swe-bench-verified` + `openai.com/index/why-we-no-longer-evaluate-swe-bench-verified`).
- **CODE READING**: `superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md` 4-step pattern (cited verbatim below); `anthropics/skills` SKILL.md format spec via deepwiki (frontmatter `name` + `description ≤1024` + `allowed-tools`); `hesreallyhim/awesome-claude-code` LLM-PR-classification workflow (`submission-enforcement-v2.yml`) via deepwiki.
- **PRACTITIONER FIELD REPORT**: Anthropic engineering blog "How we built our multi-agent research system" (`anthropic.com/engineering/multi-agent-research-system` — 90.2% improvement vs single-agent, ~15× token cost); Perplexity Research methodology (`perplexity.ai/hub/blog/introducing-perplexity-deep-research` — iterative search, weighted consensus, E-E-A-T ranking, 4-pillar credibility model); Anthropic Architecture Pattern Production (Fountain City Tech blog, ZenML LLMOps DB — independent multi-org corroboration).

All three families orgs-distinct (Stanford, UK Gov BEIS, Anthropic, OpenAI, Perplexity, hesreallyhim, multiple practitioner blogs). Typed-evidence contract satisfied for this methodology doc itself.

---

## §1 — SOTA research-pipeline patterns (≥3 academic + ≥3 agent-research + ≥3 awesome-list)

### §1.1 — Academic-grade research-pipeline patterns

#### §1.1.1 — Stanford CRFM HELM (Holistic Evaluation of Language Models)

**TIER-1 primary**: `crfm.stanford.edu/helm/` + arXiv 2211.09110 + github.com/stanford-crfm/helm (deepwiki-confirmed structure).

**Methodology contract**:
1. **7-dimensional rubric** (canonical for foundation-model eval, deepwiki cite):
   - **Accuracy** — output correctness on the task
   - **Robustness** — performance under input perturbations (the `compute_worst_case_metrics` function in `src/helm/benchmark/metrics/metric.py` calculates this)
   - **Fairness** — performance disparity across demographic/sensitive groups (e.g. `DecodingTrustFairnessScenario`)
   - **Bias** — demographic-representation bias in generations
   - **Toxicity** — toxic-content generation rate (`InstructionFollowingCritiqueMetric` "Harmlessness" aspect)
   - **Efficiency** — compute/time required for inference + training
   - **Calibration** — alignment of predicted probabilities to actual correctness
2. **Scenario × Metric grid** — `<Task, Dataset, Metric>` tuples (paperswithcode pre-shutdown convention). Each scenario is a `Scenario` class generating test instances; each metric is a `Metric` subclass.
3. **Contamination tracking** — explicit `src/helm/benchmark/static/contamination.yaml` registry of "models trained on this scenario". Forces re-litigation when a scenario contaminates a model.
4. **Reproducibility** — standardized model interfaces + benchmark configs + leaderboard reproduction docs.

**Pattern lifted into W288 funnel**: the **multi-dimensional rubric + scenario×metric grid + contamination ledger** is the right shape for the runtime's adoption-decisions ledger (graphiti `group_id="adoption-decisions"`), the v3 rubric in Stream C, and the re-litigation cron in W286d-C5.

**Lesson**: 7 dimensions is the **right order of magnitude**. The current v2 SKILL has 7; the W259 master matrix has 23. The Stream-C v3 rubric should consolidate, not balloon. HELM's specialized extensions (VHELM=9, AHELM=10, MedHELM) prove that domain extensions add ≤3 dims to the core 7.

#### §1.1.2 — UK AISI `inspect_ai` framework (UKGovernmentBEIS/inspect_ai)

**TIER-1 primary**: github.com/UKGovernmentBEIS/inspect_ai + deepwiki query.

**Core abstractions** (deepwiki-confirmed):
- **Task** — `@task` decorator; combines `dataset` + `solver(s)` + `scorer` + config.
- **Sample** — immutable input/target/metadata triple.
- **TaskState** — mutable runtime state flowing through pipeline (accumulates conversation history, model outputs, scores).
- **Solver** — chained strategy for output generation (system prompt → CoT → generate → self-critique).
- **Scorer** — evaluates output against target + defines aggregation metrics.

**Parallelism primitives**: `max_samples`, `max_tasks`, `max_subprocesses`, `max_sandboxes`, `max_connections` — orthogonal knobs at task/sample/process/sandbox/connection layers.

**Statistical-confidence primitive**: `stderr` metric uses Central Limit Theorem (n≥30 samples, finite variance) — supersedes older `bootstrap_stderr`.

**Multi-model comparison**: `eval(...)` accepts a list of model identifiers; model-graded scorers can use **majority vote** across multiple graders.

**Sandbox primitives**: Docker built-in; Extension API supports arbitrary sandbox types; `sandbox=` at Task or Sample level.

**Local wiring**: `harness/eval_harness.py` already wires inspect_ai (lane A) + promptfoo (lane B) per `harness/eval_harness.py:1-80` (line 1-80 reviewed; modes: `aggregate-demo` / `inspect-lane` / `promptfoo-lane` / `advisor-stub` / `nightly`). The `sota-convergence-audit v2.1 §4.5 Eval-harness lane` (W287 P1a) already binds Dimension 6 (`benchmark_deltas`) to the harness output.

**Pattern lifted into W288 funnel**: `inspect_ai`'s **Task/Sample/TaskState** abstraction is exactly the right shape for the per-candidate audit episode in the adoption-decisions ledger. Stream C should align the v3 rubric schema with `inspect_ai` JSON eval-log shape so harness output flows directly into Dimension 6 with no schema translation.

**Lesson**: separate the **mutable runtime state** (TaskState) from the **immutable specification** (Task). For us: the audit verdict episode is mutable (re-litigated), the rubric schema is immutable per version (`rule_version="sca-v2"` vs `"sca-v3"` per Stream C).

#### §1.1.3 — SWE-bench Verified + decontamination strategies

**TIER-1 primary**: `openai.com/index/introducing-swe-bench-verified/` + `openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/` (the latter is OpenAI explicitly retiring the benchmark — a model of failure-mode-disclosure).

**Methodology contract**:
- 500 human-annotator-verified GitHub issues, three filters: issue-description-unambiguous, tests-reliable, expected-behavior-clearly-defined.
- **Contamination disclosure**: "any model trained on GitHub data after June 2024 has likely seen some subset of the 500 problems".
- **Decontamination pipelines** (`SWE-rebench`): filter issues by creation date relative to model release dates; use strong-copyleft repos (GPL) + commercial-codebase held-outs; track ≥30% direct-solution leakage.
- **Retirement protocol**: OpenAI explicitly DECOMMISSIONED SWE-bench Verified when contamination became unsalvageable — moved to SWE-bench Pro.

**Pattern lifted**: **public failure-mode disclosure + benchmark retirement protocol**. The runtime's `sota-convergence-audit v2 §Decision-decay state machine` already has this — STALE/AGING/RE-LITIGATED/RETIRED states. SWE-bench validates the design.

**Lesson**: a benchmark is not eternal. Goodhart's Law applies. Our adoption-decisions ledger MUST track `reverification_due` (already in `v2 §6` schema) and aggressively re-litigate ADOPT verdicts whose substrate has drifted.

### §1.2 — Agent-research framework patterns

#### §1.2.1 — Anthropic multi-agent research system (THE primary cite)

**TIER-1 primary**: `anthropic.com/engineering/multi-agent-research-system` (Anthropic engineering blog, canonical authority).

**Architecture pattern** (verbatim from the blog + multi-source corroboration):
- **Orchestrator-worker** topology — a **lead agent** decomposes the query, develops a strategy, spawns parallel subagents per sub-question.
- **Subagent contract** — each gets: an **objective**, an **output format**, **guidance on tools+sources**, **clear task boundaries**. Subagents own their context, can search/evaluate/refine independently.
- **Extended thinking as controllable scratchpad** — lead uses thinking to plan tool fit, query complexity, subagent count, per-subagent role definition.
- **Scaling rules embedded in prompts** — agents struggle to judge "appropriate effort"; explicit rules in the prompt set the scale.
- **Short broad queries first** — counteracts the failure mode of "too-long over-specific queries"; progressive narrowing.
- **Performance**: 90.2% improvement vs single-agent Claude Opus 4 on internal research evals (parallel-fan-out wins big on breadth-first queries).
- **Cost reality**: ~15× tokens vs standard chat. Reserve for high-value-outcome tasks.

**Local wiring (already present in this runtime)**:
- `superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md` § "The Pattern" (lines 1-50ish) codifies the 4-step pattern: (1) Identify Independent Domains, (2) Create Focused Agent Tasks, (3) Dispatch in Parallel, (4) Review and Integrate.
- `agent-teams:team-spawn` preset (review/debug/feature/fullstack/research/security/migration) per `CLAUDE.md` `## Architecture > Agent-team trigger` (W269 mandate).
- W287 already runs 7-stream parallel fan-out (Streams A/B/C/D/E/F/G across the wave) — operationalizing the Anthropic pattern.

**Pattern lifted into W288 funnel**: **Stage 1 (Discover)** and **Stage 5 (Adversarial)** of the funnel are exactly Anthropic's orchestrator-worker pattern. Stream-C's adversarial-fan-out (3-persona security/architect/code-reviewer) is the same shape. The W269 agent-team trigger in CLAUDE.md is the policy enforcement.

**Lesson**: when ≥2 independent workstreams exist, parallel dispatch is not optional — it's the SOTA shape. The cost is 15× tokens, but the quality multiplier on breadth-first questions is ~2×.

#### §1.2.2 — OpenAI Deep Research (o3-based)

**TIER-1 primary**: `developers.openai.com/api/docs/models/o3-deep-research` + `platform.openai.com/docs/guides/deep-research` + `openai.com/index/introducing-deep-research/`.

**Methodology contract**:
- **End-to-end RL** — trained in simulated research environments to learn the complete workflow: plan multi-step searches, backtrack when stuck, adjust strategies based on real-time info.
- **Hundreds of sources** per report; **extended chains of thought** (sometimes hundreds of steps) staying focused on original goal.
- **Multi-source integration**: web search + **MCP connectors** + **internal vector-store file-search**. This is the SAME composition pattern we already operate.
- **Inline citation per claim** — every factual claim has a clickable reference pointing at exact source lines. **Fully traceable output**.

**Pattern lifted into W288 funnel**: **traceability discipline** — every score-dimension in the v3 rubric must trace back to a cited source (file:line / URL / `mcp__<tool>__<call>` evidence ID). Stream C v3 rubric MUST embed `sources_typed.<dimension>[].cite` arrays.

**Lesson**: the differentiator between "research" and "vibes" is per-claim citation. Our `sota-convergence-audit v2 §3 typed-evidence` already requires ≥1 BENCHMARK + ≥1 CODE READING + ≥1 PRACTITIONER REPORT — but doesn't force per-dimension cite bindings. Stream C should tighten this.

#### §1.2.3 — Perplexity Deep Research

**TIER-1 primary**: `perplexity.ai/hub/blog/introducing-perplexity-deep-research` + `research.perplexity.ai/articles/evaluating-deep-research-performance-in-the-wild-with-the-draco-benchmark` (DRACO benchmark = Perplexity's own eval methodology, transparently published).

**Source-ranking framework** — **four credibility pillars**:
1. **Trustworthiness**
2. **Authority**
3. **Corroboration** — multi-source agreement
4. **Provenance** — origin traceability

**E-E-A-T ranking** (Experience, Expertise, Authoritativeness, Trustworthiness) — proprietary algorithm favors peer-reviewed studies over blogs.

**Primary-source preference** — first-party research with transparent methodology > aggregated statistics cited without attribution.

**Convergence/consensus handling**:
- **Weighted consensus views with confidence scores** — e.g. "85% agreement on threshold X".
- **Cross-checking facts across multiple independent references** before drawing conclusions.
- **Conflict resolution via weighted disagreement** — does NOT silently pick one source.

**Pattern lifted into W288 funnel**: **Stage 4 (Score)** dimension `source_diversity` must explicitly evaluate the **4 credibility pillars** per source. Stream C v3 should make `authority_weight` decomposable into Authority + Experience + Expertise + Trustworthiness sub-scores. **Conflict-resolution policy** — when 2+ typed-evidence sources disagree, the verdict episode MUST capture the disagreement + confidence, not collapse to one side.

**Lesson**: a research system that doesn't surface source-disagreement is a black-box bias laundering machine. Make disagreement first-class in the schema.

#### §1.2.4 — Agent-research from 2026 literature (multi-source verification SOTA)

**TIER-1 primary**: arXiv 2026 papers per WebSearch:
- arXiv 2602.18693 — "Contradiction to Consensus: Dual-Perspective, Multi-Source Retrieval-Based Claim Verification with Source-Level Disagreement using LLM" — direct evidence-verification methodology.
- arXiv 2509.17240 — "Can Agents Judge Systematic Reviews Like Humans? Evaluating SLRs with LLM-based Multi-Agent System" — judge-agent SOTA.
- arXiv 2511.03023 — "PublicAgent: Multi-Agent Design Principles" — targeted decomposition into intent-clarification + dataset-discovery + analysis + reporting agents.
- arXiv 2503.16416 — "A Survey on Evaluation of LLM-based Agents" — the canonical 2026 survey.
- arXiv 2605.12280 — "Iterative Audit Convergence in LLM-Managed Multi-Agent Systems" — case study on prompt-engineering QA, defines convergence criteria.

**Patterns lifted**:
- **MAXS lookahead-planning + convergence-halt** — stop rollouts once consistency is reached. Lift into Stream D ingest-pipeline (don't over-ingest if 3 sources already converge).
- **A2RAG adaptive escalation** — verify evidence sufficiency, progressively escalate retrieval. Lift as Stage-0 TRIAGE: cheap discovery first, escalate to deep-ingest only on STUDY-or-higher candidates.
- **Source-Level Disagreement first-class** — capture disagreement in schema, not silently average.
- **Specialized agent decomposition** (intent → discovery → analysis → reporting) — our existing 4-stream W288 layout (A methodology / B discovery / C scoring / D ingest) maps cleanly.

#### §1.2.5 — Google Gemini Deep Research + general patterns

**TIER-2 secondary**: `morphllm.com/exa-search-api` + practitioner blogs.

**Differentiating moves**: integration with Google Workspace, calendar-aware research, longer planning horizons.

**Not directly liftable** for this runtime — we're Claude-Code-native — but the **planning-horizon length** is a knob. Our default subagent fork (`Agent` tool) has no explicit horizon-cap; Stream C v3 should add a `planning_horizon_tokens` config dimension to the v3 rubric so we don't over-spend on shallow candidates.

### §1.3 — Awesome-list / community curation patterns

#### §1.3.1 — `hesreallyhim/awesome-claude-code` — the SOTA reference for Claude-Code-ecosystem curation

**TIER-1 primary**: github.com/hesreallyhim/awesome-claude-code + deepwiki query.

**Acceptance gates** (deepwiki-confirmed):
1. **Issue Recommendation Form ONLY** — direct PRs are auto-rejected.
2. **Repository age ≥7 days** — anti-spam.
3. **Human-submitter check** — no `gh` CLI / no AI agents.
4. **Unique + high quality + focused** — similar to existing entries, NOT a general-purpose marketplace.
5. **Evidence-based capability claims** — clear instructions or demos required.
6. **Security scrutiny + no license violations**.

**Automated tooling stack**:
- **LLM-PR-classifier** (`submission-enforcement-v2.yml`) uses `claude-haiku-4-5-20251001` to classify PRs as `resource_submission` vs `not_resource_submission`. Auto-close manual resource-PRs with cooldown.
- **Cooldown escalation ladder**: 7d → 14d → 30d → permanent ban (4 strikes).
- **Cooldown state**: private `cooldown-state.json` file (gitignored).
- **Auto-PR creation** from approved issue forms.
- **Daily link validation** of merged resources.
- **Ticker update** within 6h of merge — metrics like stars, last-commit refreshed.
- **Badge notification** via `notify-on-merge.yml` → `scripts.badges.badge_notification`.

**Health-check + release-data scripts** (verified by ctx_batch_execute grep):
- `scripts/maintenance/check_repo_health.py` — supports curation and triage, not automated approval.
- `scripts/maintenance/update_github_release_data.py` — fetches release data via GitHub API.

**Pattern lifted into W288 funnel**:
1. **LLM-classifier for incoming candidates** — Stream D should add a pre-Stage-0 classifier: "is this a viable adoption candidate?" using `claude-haiku-4-5` (cheap). Auto-routes to TRIAGE.
2. **Cooldown ladder for low-quality contributors** — if a source family (e.g. a specific awesome-list) submits ≥N rejected candidates, downweight its signal.
3. **Daily liveness validation** — our `reverification_due` field in the ledger needs a cron (W286d C.5 already proposed this).
4. **Ticker / staleness metric refresh** — re-pull stars/commits/issues at ledger-read-time, NOT at decision-time, to keep AGING/STALE detection live.

**Lesson**: the SOTA awesome-list is **highly-automated + low-trust by default**. Anti-spam + cooldown + auto-PR are the right primitives. The runtime's ledger should mirror this.

#### §1.3.2 — `VoltAgent/awesome-claude-code-subagents` (no formal gate)

**TIER-2 secondary**: github.com/VoltAgent/awesome-claude-code-subagents + WebSearch.

**Curation contract**:
- 100+ subagent definitions, curated + community contrib.
- **Explicit disclaimer**: "as is" without warranty; maintainers **do NOT audit** security/correctness of any subagent.
- No formal CONTRIBUTING gate beyond markdown+YAML frontmatter format.

**Pattern liftable**: NEGATIVE LESSON — a high-volume curated list without gates is **discovery-only signal**, NOT installation-grade. Any candidate sourced from `VoltAgent/*` must be treated as STAGE-0 TRIAGE only; ADOPT requires independent verification.

#### §1.3.3 — `anthropics/skills` — the canonical SKILL.md format authority

**TIER-1 primary**: github.com/anthropics/skills + deepwiki query.

**SKILL.md format contract** (deepwiki-confirmed):
- **Required frontmatter**: `name` (kebab-case ≤64 chars), `description` (≤1024 chars, "pushy" to combat undertriggering).
- **Optional frontmatter**: `license`, `compatibility`, `allowed-tools`.
- **Body**: progressive disclosure — frontmatter (always loaded) → body (loads on trigger, target ≤500 lines) → bundled resources (loads on need).

**Skill iterative-improvement loop**:
1. Draft skill from user-intent + research.
2. Create 2-3 realistic test cases (`evals/evals.json`).
3. Run subagent pair (with-skill vs baseline-no-skill); grade quantitatively; aggregate to `benchmark.json` + `benchmark.md`.
4. User reviews via `eval-viewer/generate_review.py` HTML; writes `feedback.json`.
5. Improve skill; loop until satisfied.

**Description optimization loop**:
1. Generate 20 realistic trigger queries (mix should-trigger / should-not-trigger).
2. User reviews via HTML.
3. `scripts.run_loop` background-evaluates current description, proposes improvements, iterates up to 5 times.
4. Apply `best_description` from optimization output to frontmatter.

**NOT in `anthropics/skills`**: formal versioning, supersession, deprecation protocol. (deepwiki: "not detailed in the provided snippets").

**Pattern lifted**:
- **Eval-driven skill iteration** is the canonical Anthropic methodology. Our existing `harness/eval_harness.py` (W259-v9) wires inspect_ai + promptfoo lanes — already aligned.
- **Description optimization via subagent A/B** is a STAGE-0 TRIAGE primitive we should add for new candidate-skills before adoption.
- **Versioning / supersession** is a GAP in `anthropics/skills` — our `sota-convergence-audit v2 §Decision-decay` state machine FILLS that gap. We are AHEAD of upstream here.

#### §1.3.4 — `sindresorhus/awesome` (the meta-awesome)

**TIER-1 primary**: github.com/sindresorhus/awesome (the canonical "awesome list" curation manifesto, well-known authority).

**Inclusion criteria** (well-known from the README):
- ≥30 days of code being active before submission.
- Substantial unique content (no "10 lines and a logo").
- Strict spelling + grammar.
- One PR per addition.

**Pattern lifted**: the **30-day-active gate** is SOTA. Our `sota-convergence-audit v2 §Process step 3` already requires "≥3 months OR official-org maintainer + recent releases" — STRICTER than sindresorhus. Keep our gate; it's defensible.

### §1.4 — Multi-source verification SOTA from 2026 academic literature

Already covered in §1.2.4. Summary:
- **MAXS** convergence-halt (consistency-based stopping).
- **A2RAG** adaptive evidence-sufficiency escalation.
- **PublicAgent** specialized-agent decomposition (intent / discovery / analysis / reporting).
- **Cross-source disagreement analysis** — capture disagreement in schema first.

These map 1:1 to Stream D ingest pipeline + Stream C v3 rubric `source_diversity` dimension.

---

## §2 — Discovery-source family enumeration (concrete API/MCP probes per source, with cost+rate-limit)

The current `sota-convergence-audit v2 §1` requires "≥4 independent source families". Below is the **operationalized inventory** — concrete probe per family, cost, rate-limit, signal class, recommended usage stage.

### §2.1 — TIER-1 PRIMARY: Anthropic + Claude-Code canonical

| Source | Probe | Cost | Rate-limit | Signal | Stage |
|---|---|---|---|---|---|
| `code.claude.com/docs/*` | `WebFetch` or `mcp__plugin_everything-claude-code_context7__query-docs` | $ for fetch | per-call | Anthropic-canonical (authority=10) | 1-Discover, 2-Verify, 3-Converge |
| `docs.anthropic.com/en/docs/claude-code/*` | same | $ | per-call | Anthropic-canonical | 1-3 |
| `anthropics/skills` repo | `mcp__deepwiki__ask_question` | $$ deepwiki | minutes-per-query | TIER-1 official skill format | 2-Verify |
| `anthropics/claude-cookbooks` | `mcp__github__get_file_contents` | $ | github 5k/h | Anthropic-canonical patterns | 1-3 |
| `anthropics/claude-quickstarts` | same | $ | same | Anthropic-canonical | 1-3 |
| Anthropic engineering blog (`anthropic.com/engineering/*`) | `WebSearch` + `WebFetch` | $ | per-call | TIER-1 practitioner-report-author=Anthropic | 3-Converge |

**Recommendation**: ALWAYS probe Anthropic-canonical before anything else. They cap authority-weight=10 in the v3 rubric (Stream C).

### §2.2 — TIER-2 OFFICIAL: protocol authorities, repos-of-record

| Source | Probe | Cost | Rate-limit | Signal | Stage |
|---|---|---|---|---|---|
| `modelcontextprotocol/registry` | `mcp__github__get_file_contents` + Web | $ | github 5k/h | TIER-1 official MCP registry (unopinionated metadata; downstream curate) | 1-Discover |
| `modelcontextprotocol/servers` reference impls | same | $ | same | TIER-1 official MCP servers | 1-3 |
| `modelcontextprotocol.io/registry/about` | `WebFetch` | $ | per-call | canonical philosophy | 0-Triage, 1-Discover |
| Stanford CRFM (`crfm.stanford.edu/helm`) | `WebFetch` + `mcp__deepwiki__ask_question stanford-crfm/helm` | $$ deepwiki | minutes | academic-grade (authority=10) | 3-Converge, 4-Score |
| UK AISI inspect_ai (`UKGovernmentBEIS/inspect_ai`) | `mcp__deepwiki__ask_question` | $$ | minutes | gov-AISI authority | 4-Score |

### §2.3 — TIER-3 GITHUB-NATIVE: code-search, stars, releases, commits

| Source | Probe | Cost | Rate-limit | Signal | Stage |
|---|---|---|---|---|---|
| github code search | `mcp__github__search_code` | $ | 5k/h (auth) | breadth | 1-Discover |
| github repo search | `mcp__github__search_repositories` | $ | same | stars+activity | 1-Discover |
| github file contents | `mcp__github__get_file_contents` | $ | same | code-reading | 2-Verify |
| github commits/releases | `mcp__github__list_commits` / `mcp__github__list_releases` | $ | same | freshness/maintenance | 4-Score (D5 recency) |
| github issues/PRs | `mcp__github__list_issues` / `mcp__github__list_pull_requests` | $ | same | failure-mode + practitioner-report | 3-Converge (issues = field-reports) |
| **GitHub stargazers-overlap (Jaccard + Leiden)** | `mcp__github__list_commits` + custom analysis via `ctx_execute` | $$ | 5k/h | similar-repo discovery (per arXiv 2502.00058 + anvaka/gazer pattern) | 1-Discover (find candidates you didn't know existed) |

**Specific stargazers-overlap methodology** (lifted from `anvaka/ghindex` + arXiv 2502.00058):
1. Find users who starred candidate repo X.
2. For each user, list other repos they starred.
3. Compute Jaccard similarity or Sorensen-Dice coefficient per repo-pair.
4. Cluster via Leiden community-detection.
5. Surface top-K most-similar repos as candidates for parallel evaluation.

**Anti-noise**: sample a limited subset of random stargazers (NOT all) — paper notes "popular noise" reduction.

### §2.4 — TIER-4 ACADEMIC-LIVE: arXiv, OpenAlex, Semantic Scholar (paperswithcode RETIRED 2025-07)

| Source | Probe | Cost | Rate-limit | Signal | Stage |
|---|---|---|---|---|---|
| arXiv (`arxiv.org/list/cs.AI/recent` etc) | `WebSearch` + `WebFetch` | $ | per-call | academic primary-source | 1-3 |
| OpenAlex API (`api.openalex.org`) | `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` | $ | unauth: ~100k/d | citation-graph, authorship | 3-Converge |
| Semantic Scholar API | same | $ | unauth: ~5k/d | citation + influence | 3-Converge |
| openreview.net | `WebFetch` | $ | per-call | peer-review trail | 3-Converge |
| **Papers with Code 2** (`paperswithcode2.com`) — community successor | `WebFetch` | $ | per-call | SOTA leaderboard (post-shutdown) | 1-Discover, 4-Score |
| Hugging Face Trending Papers (paperswithcode.com redirect) | `WebFetch` | $ | per-call | weekly-trending academic | 1-Discover |

**Note** (per WebSearch): paperswithcode shut down July 2025; domain now redirects to HF Trending Papers. `paperswithcode2.com` (community successor) + `paperswithcode/paperswithcode-data` GitHub archive are the post-shutdown options. The CodeSOTA project also maintains fresh data. **Do NOT cite paperswithcode.com as if it were live**; cite the successor.

### §2.5 — TIER-5 COMMUNITY-LIVE: HN, Reddit, lobste.rs, practitioner blogs

| Source | Probe | Cost | Rate-limit | Signal | Stage |
|---|---|---|---|---|---|
| HN Algolia (`hn.algolia.com/api`) | `mcp__plugin_context-mode_context-mode__ctx_fetch_and_index` | $ | unauth: ~1k/h | discussion signal + practitioner-report | 1-Discover, 3-Converge |
| Reddit r/LocalLLaMA + r/ClaudeAI + r/MachineLearning | `WebSearch` (`reddit.com` allowed-domains) | $ | per-call | practitioner usage signal | 1-Discover, 3-Converge |
| lobste.rs | `WebSearch` | $ | per-call | curated technical discussion | 1-Discover |
| Karpathy, Pocock, Cherny, DHH, Simon Willison blogs | `WebSearch` + `WebFetch` | $ | per-call | named-T2 practitioner field-report | 3-Converge (HIGH-VALUE source) |
| Latent Space pod (newsletter + transcript) | `WebSearch` | $ | per-call | named-T2 practitioner | 3-Converge |
| dev.to + Substack | `WebSearch` | $ | per-call | community-T3 signal | 1-Discover, 3-Converge |

**Tier-5 highest-value sub-class**: **named-practitioner field reports**. Per `sota-convergence-audit v2 §3 typed-evidence`, "**Marketing claims by the candidate's own author do NOT count**" — but a named-T2 practitioner with no commercial tie to the candidate DOES count. Examples: Karpathy reviewing a memory layer, Pocock reviewing a tooling stack, Cherny reviewing a CC plugin.

### §2.6 — TIER-6 AWESOME-LIST META-CURATION

| Source | Probe | Cost | Rate-limit | Signal | Stage |
|---|---|---|---|---|---|
| `sindresorhus/awesome` | `mcp__github__get_file_contents` | $ | 5k/h | meta-of-awesome | 1-Discover |
| `hesreallyhim/awesome-claude-code` | `mcp__deepwiki__ask_question` + grep packed XML | $$ | minutes | SOTA CC ecosystem curation | 1-Discover |
| `hesreallyhim/awesome-claude-code-agents` | github + Web | $ | 5k/h | agent-specific curation | 1-Discover |
| `VoltAgent/awesome-claude-code-subagents` | github | $ | 5k/h | high-volume low-gate (treat as triage-only) | 1-Discover (LOW-trust) |
| `VoltAgent/awesome-agent-skills` | github | $ | 5k/h | 1000+ skills, low-gate (triage-only) | 1-Discover |
| `rohitg00/awesome-claude-code-toolkit` | github | $ | 5k/h | bundle aggregator | 1-Discover |
| `appcypher/awesome-mcp-servers` | github | $ | 5k/h | MCP-server curation | 1-Discover |
| `wong2/awesome-mcp-servers` | github | $ | 5k/h | alternative MCP curation | 1-Discover |
| `ithiria894/awesome-claude-code-workflows` | github | $ | 5k/h | workflow recipes | 1-Discover |
| `VILA-Lab/Dive-into-Claude-Code` | github + packed XML | $ | local | systematic CC analysis (already in repomix lib) | 2-Verify |

### §2.7 — TIER-7 PLUGIN/PACKAGE MARKETPLACES (install-grade)

| Source | Probe | Cost | Signal | Stage |
|---|---|---|---|---|
| `anthropics/claude-plugins-official` | `mcp__github__get_file_contents` | $ | TIER-1 install-grade | 1-Discover, 2-Verify |
| `claude-plugins-official:superpowers` (obra) | local plugin cache + github | $ | TIER-0 installed (verified) | 2-Verify, 3-Converge |
| `superpowers-marketplace` | local + github | $ | T0-T1 | 2-Verify |
| `everything-claude-code` plugin family (affaan-m) | local + github | $ | T1 install (verified) | 2-Verify |
| `wshobson/agents` (33.5k★) | local + github | $ | T1 install (verified) | 2-Verify |
| npm/pypi/cargo MCP-tagged | npm/pypi search APIs | $ | install-channel | 2-Verify |

### §2.8 — TIER-8 NEURAL-WEB-SEARCH (SOTA semantic discovery)

| Source | Probe | Cost | Latency | Signal | Stage |
|---|---|---|---|---|---|
| **Exa neural search** | `mcp__plugin_everything-claude-code_exa__web_search_exa` (if MCP available) or `exa.ai/api` | $$ per call | <350ms P50 | embedding-based semantic, NOT keyword (per `exa.ai/blog/exa-api-2-0`) | 1-Discover, 3-Converge |
| **Exa fetch** | `mcp__plugin_everything-claude-code_exa__web_fetch_exa` | $$ | <1s | clean-text extraction | 1-Discover |
| **Tavily** | API direct (no MCP) | $$ | <2s | research-tuned web search | 1-Discover, 3-Converge |
| Perplexity API | direct (no MCP currently installed) | $$$ | seconds | full-pipeline research synthesis | 3-Converge (heavy) |
| Brave Search API | direct | $ | <1s | privacy-respecting | 1-Discover |
| Kagi Search API | direct | $$ | <1s | premium-curated | 1-Discover |
| Anthropic native `WebSearch` tool | `WebSearch` | $ | <2s | aggregate results | 1-Discover |
| Anthropic native `WebFetch` tool | `WebFetch` | $ | <5s | AI-summarized fetch | 1-Discover, 2-Verify |

**Exa methodology** (per `exa.ai/blog/exa-api-2-0` + `exa.ai/blog/how-to-build-nextgen-search`):
- Neural model preprocesses each document into embeddings (NOT keyword index).
- 4 search modes: `neural` (embeddings) / `auto` (hybrid) / `fast` (streamlined) / `deep` (query-expansion + detailed context).
- Eval methodology: LLM-grader scores `(query, result)` pairs; Exa benchmarks SOTA.
- Trained 144× H200 cluster, novel embedding techniques.

**Recommendation**: Exa is the **single best STAGE-1 discovery primitive** for "find semantically-similar repos / patterns / papers I don't know about". Currently appears as a plugin MCP under `everything-claude-code:exa` — confirm availability + add to default research-fan-out.

### §2.9 — TIER-9 ECOSYSTEM: language-package indices, security feeds

| Source | Probe | Cost | Signal | Stage |
|---|---|---|---|---|
| npm registry | `npm view <pkg>` via shell | $ | install-channel signal | 2-Verify |
| pypi | `pip index versions` / API | $ | install-channel | 2-Verify |
| crates.io | API | $ | install-channel | 2-Verify |
| NVD / CVE database | API or `mcp__github__run_secret_scanning` analog | $ | security-posture (D17 trust-surface) | 4-Score, 5-Adversarial |
| OpenSSF Scorecard | github (`.well-known/scorecard.yml`) | $ | supply-chain trust | 4-Score (D17) |
| Sigstore / cosign signatures on releases | release-asset inspection | $ | supply-chain trust | 4-Score |

---

## §3 — MCP-server research-tool inventory (capability matrix)

Comprehensive inventory of installed research-class MCP tools. Verified from `.mcp.json` + `disabledMcpjsonServers` in `.claude/settings.json` + ToolSearch deferred-tools list.

| MCP server | Tools surfaced | Capability | Cost | Rate-limit | When-to-use | Anti-pattern |
|---|---|---|---|---|---|---|
| **deepwiki** | `ask_question`, `read_wiki_structure`, `read_wiki_contents` | LLM-grounded repo Q&A + wiki | $$ | minutes-per-query | code-reading verification, methodology extraction from arbitrary GitHub repos | Single-shot trivia (use github raw); cost dominates if asked >5 questions/repo |
| **github** | `search_code`, `search_repositories`, `get_file_contents`, `list_commits`, `list_releases`, `list_issues`, `list_pull_requests`, `search_users`, `get_me`, etc. | full GitHub API surface | $ | 5k/h auth | code-reading, recency, freshness, practitioner-report mining (issues/PRs) | Bulk repo enumeration (use stargazers methods); large file fetches (use repomix pack) |
| **repomix** | `pack_remote_repository`, `pack_codebase`, `attach_packed_output`, `read_repomix_output`, `grep_repomix_output`, `generate_skill`, `file_system_read_*` | whole-repo XML pack + grep | $ local | none | grep across upstream codebases; pre-built packs at `tmp/repomix-library/packed/*.xml` | `pack_remote_repository` **BROKEN on Windows v1.14.0** — use `git clone --depth 1 + repomix <local>` instead per hindsight |
| **context7** | `resolve-library-id`, `query-docs` | library/framework docs lookup | $ | per-call | API/syntax/config docs for libraries/frameworks | Refactoring (use code tools); general programming concepts |
| **serena** | `find_symbol`, `find_references`, `replace_symbol_body`, `get_symbols_overview`, etc. | LSP-symbol code-intel | $ local | none | semantic code search/refactor within installed projects | Cross-repo discovery (use github code search) |
| **gitnexus** | `list_repos`, `query`, `impact`, `context`, `detect_changes`, `route_map`, `api_impact`, `shape_check`, `tool_map`, `cypher`, `group_*` | code-knowledge-graph (12-phase pipeline, LadybugDB) | $ local | none | blast-radius analysis, process-tracing | PolyForm-NC license caps adoption depth (per W259-v15) |
| **chrome-devtools** | full DevTools surface | live web inspection | $ local | none | reproducing browser issues, performance profiling | General navigation (use playwright) |
| **playwright** | navigation/click/snapshot/etc. | browser automation | $ local | none | e2e test verification, snapshot-based research | Static page fetch (use WebFetch) |
| **memory** (plugin:everything-claude-code:memory) | `create_entities`, `create_relations`, `search_nodes`, `read_graph`, etc. | local knowledge-graph | $ local | none | per-session structured memory | NOT for long-term decision ledger (use graphiti) |
| **basic-memory** | `search_notes`, `read_note`, `write_note`, `edit_note`, etc. | markdown-survivable note KB | $ local | none | T6 primary memory tier (per `mem-recall` SKILL) | Real-time decision write (use graphiti) |
| **graphiti** | `add_memory`, `search_memory_nodes`, `search_memory_facts`, `get_episodes` | temporal knowledge-graph (FalkorDB + Ollama) | $ local | none | T7 adoption-decision ledger (`group_id="adoption-decisions"`) | Synchronous reads on hot path (graphiti is async-write) |
| **cognee** | `recall`, `remember`, `forget` | T3 semantic-memory | $ local | none | semantic recall across waves | Not for structured verdict storage |
| **langfuse** | `get-prompt(s)` | T5 observability-prompt-store | $ local | none | prompt version retrieval | Trace ingestion (use direct Langfuse API) |
| **phoenix** (Arize) | full Arize eval surface | T-eval observability | $ local | none | eval traces, span inspection | Production-LLM monitoring (use Phoenix UI) |
| **graphiti / cognee / basic-memory split**: T1 hindsight + T3 cognee + T4 graphiti + T5 langfuse + T6 basic-memory + T7 graphiti adoption-ledger per CLAUDE.md runtime state. |
| **context-mode (`ctx_*`)** | `ctx_batch_execute`, `ctx_search`, `ctx_execute`, `ctx_fetch_and_index`, `ctx_index`, `ctx_purge`, `ctx_stats`, etc. | sandbox + indexed-output + FTS5 | $ local | none | **PRIMARY GATHER** tool per context-window-protection; keeps raw data out of model context | `ctx_execute` for file mutations (use Write/Edit); fetch-vs-index (use ctx_fetch_and_index, not WebFetch) |
| **sequentialthinking** (plugin:everything-claude-code:sequential-thinking) | `sequentialthinking` | structured CoT scratchpad | $ | per-call | extended-reasoning planning | Production runtime work (use as plan-only) |
| **exa** (plugin:everything-claude-code:exa) | `web_search_exa`, `web_fetch_exa` | neural-embeddings web search | $$ | per-call | **STAGE-1 discovery primitive** — semantic similar-repo finding | Pure keyword search (use WebSearch) |
| **chrome-devtools / playwright** as fallback web-fetch | navigation primitives | active-browser fetching | $ local | none | dynamic-JS sites where WebFetch returns empty | Heavy use (cost-of-state) |
| **WebSearch (Anthropic native)** | broad web search | $ | per-call | aggregate results | 1-Discover, 3-Converge | Rate-limited; supplement with Exa/Tavily |
| **WebFetch (Anthropic native)** | URL fetch + AI-prompt-extract | $ | per-call | targeted page content | 2-Verify | Authenticated URLs fail (use MCP equivalent) |

**Aggregate observation**: the runtime has ≥20 research-class MCP tools installed. The bottleneck is NOT tooling availability — it's **knowing which tool to fire at which funnel stage**. §5 below resolves this.

---

## §4 — Multi-angle convergence-consensus patterns

### §4.1 — codex GPT-5.5 cross-model consensus (CURRENTLY OPERATIONAL)

**Operational state**: the W280a Stop-hook auto-fires `codex exec` (GPT-5.5 via OpenAI Codex CLI plugin) as the final review gate after Claude (Opus 4.7) authors a verdict. State at `${CLAUDE_PLUGIN_DATA}/state.json`. Verdict propagates as `codex_gate: APPROVE/REVISE/BLOCK` into the v2 adversarial-review schema.

**Strength**: two different model families (Anthropic Opus 4.7 + OpenAI GPT-5.5) reduces same-family blind spots. **Two-model-correlated risk**: both are transformer-LM auto-regressive — correlated more than they look (W286d C.4 finding).

**Recommended W288 extension** (Stream C will operationalize): **second-model gate for HIGH-risk ADOPT decisions**. HIGH-risk = touches `.claude/settings.json`, hooks, `.mcp.json`, or cardinal-rule boundaries. Add `comprehensive-review` plugin or Gemini-CLI subprocess as the second pass. ~5-10% of ADOPTs are HIGH-risk; marginal cost low.

### §4.2 — Anthropic debate / constitutional patterns

**TIER-1 primary**: Anthropic constitutional-AI methodology + the "debate" research papers.

**Pattern**: two agents present opposing positions; a judge agent rules; iterative refinement until convergence.

**Lift into W288 funnel — Stage 5 (Adversarial)**: instead of 3 independent personas (security/architect/code-reviewer), consider a **debate pair** for HIGH-risk decisions — one agent argues ADOPT, the other argues REJECT, codex judges. More signal than 3 independent reviewers when the question is binary.

**Trade-off**: debate is more expensive than independent review (back-and-forth turns). Reserve for HIGH-risk only.

### §4.3 — Self-consistency CoT (Wang et al, 2022 — standard now)

**Pattern**: sample N=k chains-of-thought independently, take majority vote on final answer.

**Lift into W288 funnel — Stage 4 (Score)**: when subagent scoring is uncertain (any dimension confidence <0.8), run k=3-5 independent rubric-pass subagents on the same candidate; take median per dimension. Cost: 3-5× score-stage tokens; quality: reduces single-pass score variance.

### §4.4 — Multi-agent voting (langchain pattern)

**Pattern**: N agents independently produce verdicts; weighted vote based on agent expertise/track-record.

**Lift into W288 funnel — Stage 5**: the 3-persona fan-out already implements this (security + architect + code-reviewer). Refinement: track per-persona historical accuracy and re-weight (e.g. if architect-persona has 90% precision on past STUDY-or-higher verdicts, weight architect higher when prior probability is uncertain).

### §4.5 — Perplexity weighted-consensus pattern (THIS IS THE GAP)

**Pattern** (per `perplexity.ai/hub/blog`): when sources disagree, present **weighted consensus with confidence score** — "85% agreement on threshold X". Do NOT collapse to one side.

**Gap in current sota-convergence-audit v2**: the v2 schema requires ≥1 of each typed-evidence type, but **disagreement between sources is not surfaced**. Two practitioner-reports saying opposite things should produce a `source_disagreement` field, not a silent average.

**Lift into Stream C v3 schema**:
```yaml
sources_typed:
  benchmark: [...]
  code_reading: [...]
  practitioner_report:
    - source: "Karpathy blog 2026-04"
      claim: "X improves Y by 30%"
      cite: "URL"
    - source: "Pocock 2026-05"
      claim: "X regresses Y by 10%"
      cite: "URL"
disagreement:
  - dimension: "benchmark_deltas"
    summary: "Karpathy claims +30%, Pocock claims -10%; weighted consensus +12% (Karpathy higher trust on this domain)"
    confidence: 0.6
```

### §4.6 — A2RAG adaptive-escalation (the cost-control consensus)

**Pattern** (arXiv 2026): start with cheap retrieval; verify evidence sufficiency; escalate retrieval effort iteratively until consistency-halt or budget exhausted.

**Lift into Stream D ingest pipeline**: Stage 0 (TRIAGE) does cheap discovery (github + WebSearch only); only candidates that pass TRIAGE warrant Stage-1 expensive ingestion (Exa + deepwiki + repomix pack). Stage-3 (Converge) does the most expensive synthesis. **Don't pay deepwiki cost on every candidate — pay it only on STUDY-or-higher**.

### §4.7 — MAXS convergence-halt

**Pattern**: stop multi-agent rollout once consistency is reached (no further improvements OR max iterations).

**Lift into Stream A funnel**: if Stage-1 discovery returns 3+ sources that already converge, **skip further discovery**. Currently the v2 §1 mandates "≥4 source families" as a minimum, not a target — but in practice we often probe 8+ and waste budget. Add explicit **convergence-halt** signal: if 4 distinct source families return concordant evidence, Stage 1 closes.

---

## §5 — RECOMMENDED canonical research-arch v2 — 6-stage funnel

Below is the unified end-to-end funnel that composes everything above. Each stage names: (a) goal, (b) trigger, (c) primary tools, (d) cost cap, (e) success criterion, (f) anti-pattern.

### §5.0 — STAGE 0: TRIAGE (NEW — pre-discover gate, cheap)

| | |
|---|---|
| **Goal** | Reject obvious non-fits in <60s before paying discovery cost |
| **Trigger** | Operator names a candidate OR `/goal` surfaces one |
| **Primary tools** | `mcp__github__search_repositories` (1 call); `WebSearch` (1 call); LLM-classifier (`claude-haiku-4-5`) per `hesreallyhim/awesome-claude-code` LLM-PR-pattern |
| **Cost cap** | <$0.02 + 1 minute |
| **Success criterion** | Output: PROCEED / DEFER / REJECT-OBVIOUS. Cite reason. |
| **Anti-pattern** | Triaging on stars alone — low-star high-quality candidates exist (per W287 Stream F finding on `lyonzin/knowledge-rag` 79★ STUDY-DEFERRED); use multi-signal (license + last-commit + recognizable-tech + recognizable-author) |

**Implementation**: a new `triage` sub-skill under `sota-convergence-audit` OR a Stage-0 prelude in the SKILL.md.

### §5.1 — STAGE 1: DISCOVER (multi-source fan-out, breadth-first)

| | |
|---|---|
| **Goal** | Enumerate adoption candidates + similar-alternatives, ≥4 INDEPENDENT source families |
| **Trigger** | TRIAGE→PROCEED |
| **Primary tools** | Parallel fan-out via `superpowers:dispatching-parallel-agents` pattern: Tier-1 Anthropic-canonical + Tier-3 github (search + stargazers-overlap Jaccard) + Tier-6 awesome-lists + Tier-8 Exa neural + Tier-5 HN Algolia |
| **Cost cap** | $1-3 + 5-10 min |
| **Success criterion** | ≥4 source-families return ≥1 candidate-or-evidence each; ≥3 organizationally-distinct sources surface the SAME claim ("converged") |
| **Anti-pattern** | Single-source discovery — false negatives + popularity bias (per v2 anti-patterns §1) |

**Convergence-halt rule (MAXS pattern §4.7)**: if 4 distinct source families return concordant findings in <3 of the 5 expected fan-out hits, close Stage 1 early. Otherwise pull harder.

**Cross-link (R7, W288 adversarial review)** — this 4-family convergence-halt is a STAGE-1 probe-efficiency rule (stop probing once enough corroboration exists to make a triage call). Stream D's `STREAM-D-INGEST-PIPELINE.md §1` describes a related-but-distinct "≥3 signal sources to enter Stage 2" rule which is a STAGE-1-to-STAGE-2 entry gate (don't escalate to typed-evidence collection unless Stage 1 surfaced ≥3 corroborating signals). The two rules are not contradictory — they apply at different decision points: convergence-halt closes Stage 1; ≥3-signal opens Stage 2.

### §5.2 — STAGE 2: VERIFY HARNESS-FIT

| | |
|---|---|
| **Goal** | Reject candidates that fit poorly even if SOTA elsewhere |
| **Trigger** | Stage 1 returns ≥1 candidate |
| **Primary tools** | `mcp__github__get_file_contents` (CLAUDE.md, package.json, hooks); `mcp__deepwiki__ask_question` for capability extraction; local plugin/MCP enumeration to check duplicate-against-installed |
| **Cost cap** | $0.5-1 per candidate + 3 min |
| **Success criterion** | Each candidate gets PASS / FAIL on 5 fit checks: (1) interactive-vs-autonomous-loop, (2) Claude-Code-native, (3) duplicates-installed-capability, (4) requires-self-invent-hook (cardinal-rule-2 violation), (5) Windows-PowerShell-portable |
| **Anti-pattern** | "Quality without harness-fit" — per v2 anti-patterns; pattern assuming interactive operator breaks autonomous runtime |

### §5.3 — STAGE 3: TYPED-EVIDENCE GATHER (cost-escalating)

| | |
|---|---|
| **Goal** | For each FIT-PASS candidate, collect ≥1 BENCHMARK + ≥1 CODE READING + ≥1 PRACTITIONER REPORT, orgs-distinct |
| **Trigger** | Stage 2 PASS |
| **Primary tools** | (a) BENCHMARK: harness `inspect_ai` or `promptfoo` lane if candidate has measurable surface; OR cite Stanford/HELM/SWE-bench/Aider-bench numbers. (b) CODE READING: `mcp__deepwiki__ask_question` + `mcp__github__get_file_contents` + `mcp__repomix__grep_repomix_output` on packed XML if available. (c) PRACTITIONER REPORT: `WebSearch` for named-T2 (Karpathy/Pocock/Cherny/DHH/Willison/Latent Space) + GitHub issues mined for field-reports + HN/Reddit threads |
| **Cost cap** | $2-5 per candidate + 10 min |
| **Success criterion** | All three types present, orgs-distinct, dated, NOT-marketing-from-candidate-author |
| **Anti-pattern** | "Three-text-claim convergence" — three README mentions = singular evidence (per v2 anti-patterns); "manufactured convergence" — evidence collected to justify pre-chosen verdict |

### §5.4 — STAGE 4: SCORE (multi-dim rubric — Stream C v3)

| | |
|---|---|
| **Goal** | Defensible numeric verdict on multi-dim rubric |
| **Trigger** | Stage 3 typed-evidence complete |
| **Primary tools** | Stream C v3 rubric (this Stream-A doc remains agnostic to dim count; v3 specifies). Self-consistency: k=3 score-passes when any dim confidence <0.8 |
| **Cost cap** | $0.5-1 per candidate (k=1) or $2-3 (k=3) + 3-10 min |
| **Success criterion** | `score_min` + `score_mean` + per-dim score with cite-binding |
| **Anti-pattern** | Hardgate REJECT on star-count alone — Stream C makes stars a soft-signal, not a hard cap |

### §5.5 — STAGE 5: ADVERSARIAL FAN-OUT (3-persona + codex)

| | |
|---|---|
| **Goal** | Catch blind spots before commit |
| **Trigger** | Stage 4 produces an ADOPT-leaning verdict |
| **Primary tools** | `agent-teams:team-spawn review` (security + architect + code-reviewer personas) OR 3 parallel `Agent` forks; then `/codex:adversarial-review` Stop-hook |
| **Cost cap** | $5-10 + 15-20 min |
| **Success criterion** | All 3 personas APPROVE OR REVISE (no BLOCK); codex APPROVE-SHIP |
| **Anti-pattern** | "Skipping the cross-model pass" — per v2 anti-patterns; verdict ships only after BOTH 3-persona AND codex pass |
| **HIGH-risk extension** (W286d C.4) | If candidate touches settings.json / hooks / .mcp.json / cardinal-rule, require SECOND cross-model pass via Gemini-CLI or `comprehensive-review` plugin |

### §5.6 — STAGE 6: DECIDE + LEDGER

| | |
|---|---|
| **Goal** | Emit verdict + rollback plan + reverification_due; persist to basic-memory T6 canonical ledger (W290 + W295 post-graphiti-retirement contract) |
| **Trigger** | Stage 5 PASS |
| **Primary tools** | `mcp__basic-memory__write_note(directory="verdicts", note_type="verdict", ...)` HARD-REQUIRED + `mcp__basic-memory__search_notes` for re-litigation queries; rollback-plan author (paths + recovery time + smoke test); `reverification_due` ISO8601 (~6 waves out). **(REMOVED) `mcp__graphiti__add_memory`** — T4 graphiti retired per `W272-operator-decisions-2026-05-17.md` + `disabledMcpjsonServers`. |
| **Cost cap** | <$0.1 + 5 min |
| **Success criterion** | Episode written; ADOPT-verdict has written rollback-plan; STUDY-verdict has explicit "what would flip to ADOPT" criteria |
| **Anti-pattern** | "Verdict without rollback plan" — per v2 anti-patterns; "stale verdict reuse" — never cite AGING/STALE prior ADOPT without re-litigating |

### §5.7 — Cross-stage primitives

- **Re-litigation cron**: every wave, scan `adoption-decisions` ledger for episodes where `reverification_due ≤ today` AND `status ∈ {ACTIVE, AGING}` AND substrate changed (e.g. linked repo had release since `decided_at`). Re-fire Stages 3-6. (W286d C.5)
- **Decision-decay state**: ACTIVE (0-5 waves) / AGING (6-11) / STALE (12+) / RE-LITIGATED / RETIRED. Lazy-computed at read.
- **Source-disagreement first-class**: per §4.5, the schema MUST capture per-source disagreement, not silently average.
- **Per-claim citation**: per §1.2.2 OpenAI Deep Research pattern, every score dimension cites its evidence source.

---

## §6 — Comparison with current `sota-convergence-audit v2` — KEEP vs ADD

| Element | v2 current | W288 v2.2 (this Stream A recommends) | Stream owner |
|---|---|---|---|
| Process stages | 6 steps (Discover/Verify/Converge/Score/Adversarial/Decide+Ledger) | **7 stages** — add **Stage 0 TRIAGE** (cheap pre-filter via LLM-classifier) | Stream C operationalizes |
| Source-family minimum | "≥4 independent families" | KEEP but add **convergence-halt** (close Stage 1 early if 4 families converge concordantly) | Stream A (this doc) |
| Typed-evidence | ≥1 BENCHMARK + ≥1 CODE READING + ≥1 PRACTITIONER, orgs-distinct | KEEP; ADD **`disagreement` field** when sources conflict (Perplexity weighted-consensus pattern) | Stream C |
| Scoring rubric | 7-dim 5-point | Stream C v3 will extend to **8-12 dims** including claude-code-pathway-support, license, supply-chain, community-signal-distribution, pattern-extractability | Stream C |
| Eval-harness binding (D6) | v2.1 already bound to inspect_ai / promptfoo lanes | KEEP — already SOTA | (no change) |
| Adversarial fan-out | 3-persona (security/architect/code-reviewer) + codex | KEEP; ADD **second-model gate for HIGH-risk** (Gemini-CLI or comprehensive-review) | Stream C |
| HIGH-risk taxonomy | absent | ADD criteria — touches settings.json / hooks / .mcp.json / cardinal-rule | Stream C |
| Adoption-depth tiers | ADOPT / STUDY / REJECT (3 tiers) | Per user-mandate: **5-tier ladder** INSTALL > VENDOR-FORK > PATTERN-STUDY > CITE-ONLY > REJECT, with per-tier threshold criteria; "low score still routes to PATTERN-STUDY or CITE-ONLY, NOT auto-REJECT" | Stream C |
| Rollback plan | mandatory for ADOPT | KEEP — already SOTA | (no change) |
| Decision-decay | ACTIVE/AGING/STALE/RE-LITIGATED/RETIRED | KEEP; ADD **re-litigation cron** (W286d C.5) | Stream D |
| Per-claim citation | partial | TIGHTEN — every score-dim cites its evidence source (`rubric_scores.<dim>.sources[]`) | Stream C |
| Source-classifier prelude | absent | ADD LLM-PR-classifier-style triage (hesreallyhim §1.3.1 pattern) | Stream C |
| Discovery-source family list | implicit | EXPLICIT — §2 of this doc enumerates 9 tiers × ~50 sources with cost/rate-limit/stage-binding | Stream A (this doc) |
| MCP-tool inventory | implicit | EXPLICIT — §3 of this doc enumerates ~20 research-class MCPs with capability matrix + when-to-use + anti-pattern | Stream A (this doc) |
| Convergence-consensus pattern | implicit (just "≥3 orgs distinct") | EXPLICIT — §4 enumerates 7 patterns (codex / debate / self-consistency / multi-vote / Perplexity weighted / A2RAG / MAXS) with stage-binding | Stream A (this doc) |
| Funnel cost-shape | implicit | EXPLICIT — Stage 0 (cents) → Stage 1 ($1-3) → Stage 2 ($0.5-1) → Stage 3 ($2-5) → Stage 4 ($0.5-3) → Stage 5 ($5-10) → Stage 6 (<$0.1); kill candidate at the cheapest stage that surfaces a kill criterion | Stream A (this doc) |
| Disagreement-first-class | absent | ADD `disagreement` schema field per §4.5 | Stream C |
| Reverification-cron | absent | ADD `/loop` schedule reviewing AGING/STALE ledger episodes | Stream D operationalizes |

**KEEP unchanged (SOTA-already)**:
- v2 §2 harness-fit verification (5 questions)
- v2 §3 typed-evidence diversity contract
- v2 §4.5 eval-harness binding to Dimension 6
- v2 §5 adversarial fan-out (3-persona + codex)
- v2 §6 rollback-plan mandate
- v2 §Decision-decay state machine (5-state)
- v2 §Anti-patterns (8 listed; all hold)
- v2 §References (correct upstream citations)

---

## §7 — Open questions handed to Stream C (scoring) and Stream D (ingest pipeline)

### §7.1 — Open questions for Stream C (rubric v3)

1. **Dimension count**: 7 (current v2) vs 12 (proposed) vs 23 (W259 master matrix). HELM converged on 7 + ≤3 domain-extensions. Recommendation: **8 core + 4 domain-specific** to mirror HELM's pattern; reconcile against the 23-dim master matrix used in W259 deep-dives.
2. **Star count as signal**: user mandate is "stars are NOT a hardgate". Recommendation: **map stars into D3 `star-velocity vs content-depth`** (already in W259 master matrix at D3) — a low-star high-velocity high-content-depth repo can score 9-10 on D3 without inflating misleadingly.
3. **License-compatibility dimension** (W259 has D1 = License-use-class-precision): keep but make it a **soft cap**, not auto-reject. PolyForm-NC can route to PATTERN-STUDY (per W259-v15 GitNexus precedent).
4. **Adoption-depth ladder** vs **disposition class**: W259 has T0/T1/T2/T3/T4/REJECT bands by composite score. Stream C should reconcile these with the user-mandate 5-tier (INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY/REJECT) — they map cleanly but the bands need re-thresholding.
5. **Score-decay weighting**: per `v2 §Decision-decay`, prior ADOPTs at AGING (wave 6-11) count at 0.5×; STALE (12+) does not corroborate at all. Recommendation: extend to **per-dimension decay** — recency dimension decays faster than license dimension.
6. **HIGH-risk taxonomy** for second-cross-model-gate (W286d C.4): define exact criteria.
7. **Per-claim source binding** (per §1.2.2 OpenAI Deep Research): how to structurally embed `sources[]` per dim without bloating the episode schema.

### §7.2 — Open questions for Stream D (ingest pipeline)

1. **Cost-escalation pipeline**: when does Exa fire vs WebSearch vs Tavily? Stream A recommends Exa as STAGE-1-primary; Stream D should formalize the budget cap.
2. **deepwiki vs repomix-pack-grep trade-off**: deepwiki costs $$ per query (minutes); repomix grep is local-free but requires the repo to be packed first. Stream D should formalize: pack on first encounter; cache for re-use across waves.
3. **Per-stage cost-cap enforcement**: how to actually enforce $1-3/Stage-1 budget in code? Recommendation: token-budget per fan-out subagent + early-halt on convergence-halt signal.
4. **Re-litigation cron mechanics**: per W286d C.5, every wave scan the ledger for `reverification_due ≤ today`. Cron schedule? `0 4 * * 0` (weekly Sunday 4am)? Or wave-tick-driven?
5. **Source-disagreement detection**: how do we mechanically detect when two practitioner-reports disagree? Embedding-distance on claim summaries? LLM-graded contradiction-check?
6. **Adoption-ledger schema migration**: v2 schema is `sca-v2`; Stream C v3 will introduce `sca-v3` (the new rubric). Stream D should specify migration: AGING/STALE v2 episodes get auto-downweighted to 0.5× when v3 ships; ACTIVE v2 episodes re-litigate on next wave.

### §7.3 — Open questions for Stream B (discovery sweep)

1. **Stargazers-overlap probe**: §2.3 specifies the Jaccard + Leiden methodology; Stream B should actually run it against the top-10 INSTALLED repos to surface candidates we don't yet know about.
2. **Awesome-list cross-listing**: §1.3 enumerates 8 awesome-lists; Stream B should diff entries across them to find candidates listed by ≥2 but not in our installed-plugins.
3. **Low-star high-quality probe** (user mandate): explicit pass through HN Algolia + lobste.rs for `claude code` / `mcp server` / `agent skill` recent threads to surface low-star high-quality candidates with practitioner-T2 endorsement.
4. **Re-pack request to Stream D**: any newly-discovered candidate ≥STAGE-3 should be packed via `repomix --include-patterns ...` for grep-able archive at `tmp/repomix-library/packed/`.

---

## §8 — Cite trail (≥30 distinct citations)

### §8.1 — TIER-1 PRIMARY (Anthropic + Stanford + UK Gov + OpenAI + Perplexity)

1. Anthropic engineering blog — "How we built our multi-agent research system" — `anthropic.com/engineering/multi-agent-research-system`
2. Anthropic Claude Code docs — Skills — `code.claude.com/docs/en/skills`
3. Anthropic Claude Code docs — Sub-agents — `code.claude.com/docs/en/sub-agents`
4. Anthropic Claude Code docs — Plugins — `code.claude.com/docs/en/plugins`
5. Anthropic Claude Code docs — MCP — `code.claude.com/docs/en/mcp`
6. Anthropic Claude Code docs — Headless mode — `code.claude.com/docs/en/headless`
7. Anthropic Claude Code docs — CLI reference — `code.claude.com/docs/en/cli-reference`
8. Anthropic API docs — Sub-agents — `docs.anthropic.com/en/docs/claude-code/sub-agents`
9. Anthropic API docs — Settings — `docs.anthropic.com/en/docs/claude-code/settings`
10. Anthropic API docs — Hooks — `docs.anthropic.com/en/docs/claude-code/hooks`
11. Stanford CRFM HELM — `crfm.stanford.edu/helm/` + arXiv 2211.09110 + github.com/stanford-crfm/helm (deepwiki query)
12. UK AISI inspect_ai — github.com/UKGovernmentBEIS/inspect_ai (deepwiki query)
13. OpenAI Deep Research — `developers.openai.com/api/docs/models/o3-deep-research`
14. OpenAI Deep Research API guide — `platform.openai.com/docs/guides/deep-research`
15. OpenAI Deep Research introduction — `openai.com/index/introducing-deep-research/`
16. OpenAI introducing-swe-bench-verified — `openai.com/index/introducing-swe-bench-verified/`
17. OpenAI why-we-no-longer-evaluate-swe-bench-verified — `openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/`
18. Perplexity research methodology — `perplexity.ai/hub/blog/introducing-perplexity-deep-research`
19. Perplexity DRACO benchmark — `research.perplexity.ai/articles/evaluating-deep-research-performance-in-the-wild-with-the-draco-benchmark`
20. ModelContextProtocol registry — `modelcontextprotocol.io/registry/about`
21. ModelContextProtocol official registry — `registry.modelcontextprotocol.io/`

### §8.2 — TIER-2 RESEARCH (academic literature)

22. arXiv 2602.18693 — "Contradiction to Consensus: Dual-Perspective Multi-Source Retrieval-Based Claim Verification"
23. arXiv 2503.16416 — "A Survey on Evaluation of LLM-based Agents"
24. arXiv 2503.24047 — "Towards Scientific Intelligence: Survey of LLM-based Scientific Agents"
25. arXiv 2511.03023 — "PublicAgent: Multi-Agent Design Principles"
26. arXiv 2605.12280 — "Iterative Audit Convergence in LLM-Managed Multi-Agent Systems"
27. arXiv 2509.17240 — "Can Agents Judge Systematic Reviews Like Humans?"
28. arXiv 2502.00058 — "GitHub Stargazers: Graph-level Prediction Algorithms"
29. SWE-Bench Pro PDF — `static.scale.com/uploads/654197dc94d34f66c0f5184e/SWEAP_Eval_Scale%20(9).pdf`
30. SWE-rebench — `mindstudio.ai/blog/swe-rebench-benchmark-decontaminated-tests-model-inflation`

### §8.3 — TIER-2 ECOSYSTEM (awesome-lists + curation methodology)

31. `hesreallyhim/awesome-claude-code` (deepwiki query — full curation methodology)
32. `sindresorhus/awesome` — meta-of-awesome curation manifesto
33. `VoltAgent/awesome-claude-code-subagents` — github.com/VoltAgent/awesome-claude-code-subagents
34. `anthropics/skills` SKILL.md format spec (deepwiki query)
35. `anthropics/claude-cookbooks` — github.com/anthropics/claude-cookbooks
36. `appcypher/awesome-mcp-servers` — github.com/appcypher/awesome-mcp-servers
37. `wong2/awesome-mcp-servers` — github.com/wong2/awesome-mcp-servers
38. `VILA-Lab/Dive-into-Claude-Code` — github.com/VILA-Lab/Dive-into-Claude-Code (packed XML at `tmp/repomix-library/packed/VILA-Lab_Dive-into-Claude-Code.xml`)

### §8.4 — TIER-3 LOCAL (this runtime's prior artifacts)

39. `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` — current v2 SKILL
40. `Z:/claude-sota-installed/docs/architecture/W286d-RESEARCH-ARCH-EVOLUTION-2026-05-18.md` — 8 evolution targets (CC.1-CC.8) preceding this Stream A
41. `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/05-scoring/MASTER-SCORING-MATRIX-W259.md` — 23-dim master matrix + threshold bands
42. `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/07-final-synthesis/W259-ULTIMATE-SYNTHESIS-FINAL.md` — 5-phase R1-R5 pipeline
43. `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/03-deepdive/SOTA-COMMUNITY-REPOS-W259v15-GITNEXUS.md` — community-repo precedent for low-star-high-quality routing
44. `Z:/claude-sota-installed/docs/architecture/W287-stream-f-knowledge-rag.md` — Stream-D inflated-score lesson (knowledge-rag 6/7 → 3/7 correction)
45. `Z:/claude-sota-installed/docs/architecture/W287-ADOPTION-VERDICTS-2026-05-18.md` — 3-verdict ledger episodes
46. `Z:/claude-sota-installed/docs/architecture/W286b-SOTA-REPO-DEEPDIVE-2026-05-18.md` — 12-priority-repo deep-dive precedent
47. `Z:/claude-sota-installed/harness/eval_harness.py` — inspect_ai + promptfoo lanes
48. `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/dispatching-parallel-agents/SKILL.md` — 4-step pattern
49. `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/brainstorming/SKILL.md` — pre-creative-work scoping skill
50. `Z:/claude-sota-installed/.mcp.json` — installed MCP inventory (provenance comments document W75/W79/W106/W155/W259 wiring decisions)
51. `Z:/claude-sota-installed/tmp/repomix-library/INDEX.md` — 51 packed XMLs Wave 1 (23 repos) + Wave 2 (28 repos)
52. `Z:/claude-sota-installed/CLAUDE.md` — runtime architecture + cardinal rules + W269 agent-team trigger

### §8.5 — TIER-3 ADDITIONAL (Exa, MCP, miscellaneous)

53. Exa AI blog — `exa.ai/blog/exa-api-2-0` — 2.0 release methodology
54. Exa AI blog — `exa.ai/blog/how-to-build-nextgen-search` — neural semantic search
55. Exa AI blog — `exa.ai/blog/evals-at-exa` — LLM-grader eval methodology
56. anvaka/gazer — github.com/anvaka/gazer — GitHub analysis + stargazer overlap
57. anvaka/ghindex — github.com/anvaka/ghindex — similar-repository discovery
58. ZenML LLMOps DB — Anthropic case study replication — `zenml.io/llmops-database/building-a-multi-agent-research-system-for-complex-information-tasks`
59. The-Decoder — multi-agent blueprint coverage — `the-decoder.com/anthropic-shares-blueprint-for-claude-research-agent-using-multiple-ai-agents-in-parallel/`
60. Fountain City Tech blog — Anthropic Multi-Agent Blueprint Production — `fountaincity.tech/resources/blog/anthropic-multi-agent-blueprint-production/`

---

## §9 — Bottom-line summary

**5-bullet executive summary** (mandated by parent-orchestrator brief):

1. **Funnel unification**: the runtime already operates a 6-step research-pipeline (`sota-convergence-audit v2`) but fragments it across SKILL.md + W259 master matrix + W286d evolution-targets. This Stream A folds them into a single **7-stage funnel** (Stage 0 TRIAGE + Stages 1-6 as v2) with explicit cost-caps + convergence-halt signals + per-stage tool bindings. Total cost: $9-20 per fully-vetted candidate; STAGE-0-REJECT costs $0.02.

2. **Discovery-source families enumerated**: §2 codifies **9 tiers × ~50 distinct sources** with API endpoint + cost + rate-limit + signal-class + stage-binding. The current v2 mandate "≥4 independent families" is operationally vague; the enumeration in §2 makes "which 4?" deterministic. NEW additions surfaced: stargazers-overlap (Jaccard+Leiden per arXiv 2502.00058 + anvaka/ghindex), HN Algolia, OpenAlex/Semantic Scholar, Exa neural search as STAGE-1-primary.

3. **MCP-tool inventory operationalized**: §3 maps **~20 research-class MCP tools** with capability + when-to-use + anti-pattern. Key adds: Exa neural search as STAGE-1-primary (currently underused); recognize the `pack_remote_repository` Windows-v1.14.0 BREAK and standardize on `git clone --depth 1 + repomix <local>` workaround; recognize the deepwiki cost-per-query (escalate only on STUDY-or-higher candidates).

4. **Multi-angle convergence enriched**: §4 codifies **7 convergence patterns** (codex GPT-5.5 cross-model, Anthropic debate, self-consistency CoT, multi-agent vote, Perplexity weighted-consensus, A2RAG adaptive-escalation, MAXS convergence-halt) with stage-binding. Key gap addressed: **source-disagreement** is not currently first-class in the schema — `sources_typed.<dim>.disagreement[]` MUST surface contradictions, NOT silently average them (per Perplexity §1.2.3 + arXiv 2602.18693 pattern).

5. **Hand-off to Streams B/C/D**: §7 enumerates concrete open questions for sibling streams. Stream C owns rubric-dimension count (8-12 vs current 7); 5-tier adoption-depth ladder (INSTALL/VENDOR-FORK/PATTERN-STUDY/CITE-ONLY/REJECT per user mandate); per-claim source binding; HIGH-risk taxonomy. Stream D owns ingest cost-escalation (Exa→deepwiki→repomix-pack); re-litigation cron mechanics; ledger schema migration sca-v2→sca-v3. Stream B owns stargazers-overlap actual run + awesome-list diff + low-star-high-quality probe + repack requests for new candidates.

**File**: `Z:/claude-sota-installed/docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-A-METHODOLOGY.md`
**Line count**: ~720 lines (target met: 600-1200).
**Citation count**: 60 distinct citations (target met: ≥30).
**Source-family count**: 9 distinct tiers (target met: ≥5).
**MCP-tool count documented**: ~20 (target met: ≥12).

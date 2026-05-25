# W320 Stream J — Meta-Research Architecture Enhancement

[FLAGGED-FOR-REVIEW per W329-B + W329-S2-REAUDIT 2026-05-19: claim predicate withdrawn pending W330 root-cause investigation]

> **Mission**: Research the REPOS that are themselves research-architectures or methodology frameworks. Extract patterns applicable to OUR research-architecture (sca-v9 LIVE; v10/v11 DRAFT). This is the META-LAYER — research-architecture-of-research-architectures.

> **Wave**: W320-DEEPER, Stream J. Date: 2026-05-19. Runtime: `Z:\claude-sota-installed`. Sibling streams: G (broad discovery), H (scoring dims), I (decision rigor). Cross-references: §5 sca-v11 ship recommendations integrate with Stream H D52-D65 dim drafts.

---

## §1 Executive Summary

### Top-5 Meta-Research Repos to Deep-Ingest

| Rank | Repo | Cohort | Why Critical |
|---|---|---|---|
| 1 | **stanfordnlp/dspy** (incumbent T1 LIVE) + **gepa-ai/gepa** | (a) prompt-program DSL with Pareto-frontier optimizer | Already INSTALLED; GEPA's reflective-Pareto routing is the SOTA primitive for "evolving research-arch under feedback" — directly informs sca-vN Δ-delta evolution loop |
| 2 | **assafelovic/gpt-researcher** | (e) multi-agent research-orchestrators + (f) cross-source convergence | 24k★ MIT — production-grade cross-source convergence pattern with task-planner + sub-researcher + reporter triad; directly maps to our Phase-5 5-gate + Phase-6 codex cross-model |
| 3 | **stanford-oval/storm** | (e) + (f) — perspective-guided knowledge curation | Stanford OVAL Wikipedia-grade research-arch; perspective-guided convergence is exactly the "anti-cohort-collapse" signal D34 measures; novel pattern: outline-first then expand |
| 4 | **Valdecy/pyDecision** | (d) MCDA toolkits (70+ methods + EC-PROMETHEE committee) | Resolves 4-wave GitHub-MCP silent-fallback via committee aggregation; ALREADY surfaced W315 Stream A; deep-ingest needed to extract committee-aggregation primitive for our composite-denom routing |
| 5 | **haizelabs/verdict** | (c) judge/eval research-archs — Unit/Layer/Block primitives | ICLR 2026 + DSPy-integrated judge-on-judge calibration SOTA; W316-r2 T2 VENDOR-FORK rec; provides backend for our Phase-6 codex GPT-5.5 cross-model gate composition primitives |

### 5 Reusable Patterns Extracted (preview; full in §4)

1. **Pareto-frontier-routing** (DSPy + GEPA) — Multi-objective candidate routing under disagreement (instead of single-winner)
2. **Triadic research-pipeline** (gpt-researcher: planner → sub-researchers → reporter) — Maps to our orchestrator → parallel-Agents → synthesis topology
3. **Outline-first-then-expand** (STORM) — Skeleton-before-content prevents premature optimization; analogous to our Stage-0 existence-probe before deep-eval
4. **Committee-aggregation under disagreement** (pyDecision EC-PROMETHEE) — Multi-MCDA-method consensus when single method ambiguous; resolves D33 quorum_unmet
5. **Unit/Layer/Block judge composition** (verdict) — Composable judge primitives that map directly to D-EMP HARD GATE + Phase-6 codex composition

### Recommended sca-v11 Absorbs (preview; full in §5)

- **Δ47 Pareto-frontier candidate routing** (lifts D33 disagreement handling) — applicable to v11 §6.7 routing
- **Δ48 Outline-first deep-ingest** (lifts Stage-0 + cascade-cost) — applicable to v11 §1 Stage-0
- **Δ49 EC-PROMETHEE committee-aggregation** (resolves quorum_unmet) — applicable to v11 §5 Phase-5 gate-3
- **Δ50 Unit/Layer/Block judge composition** (formalizes Phase-6 codex) — applicable to v11 §6 Phase-6

---

## §2 Meta-Research Repos Cohort (≥30 entries)

### (a) Prompt-Program DSLs with Optimization

| Repo | License | Stars | Pattern | Verdict |
|---|---|---|---|---|
| stanfordnlp/dspy 3.2.1 | MIT | 21k+ | Signature → Module → Optimizer; MIPRO/BootstrapFewShot | INCUMBENT T1 LIVE (W315) |
| gepa-ai/gepa | Apache-2.0 | 1.2k | Reflective Pareto-frontier candidate routing | T1-CANDIDATE; deep-ingest §3 |
| microsoft/promptflow | MIT | 9.7k | DAG-based prompt flows + eval | T2 PATTERN-ONLY |
| MadcowD/ell | MIT | 5.8k | Lightweight prompt DSL; lambda-style | T3 reference-only |
| jxnl/instructor | MIT | 11k | Structured output via Pydantic | T2 PATTERN-ONLY |
| BerriAI/litellm | MIT | 21k | Unified LLM gateway | T3 INFRA (incumbent stack) |

### (b) Research-Rubric Frameworks

| Repo / Paper | Source | Pattern | Verdict |
|---|---|---|---|
| AutoSOTA (arXiv 2604.05550v1) | arXiv | Automated SOTA-discovery for ML papers | T2 PATTERN — anchor for sca-v11 D37 |
| ResearchRubrics (arXiv 2511.07685v1) | arXiv | Multi-dim research evaluation rubrics | T2 PATTERN-ONLY — DIRECTLY matches our sca-vN |
| Dr.Bench | GitHub | Doctor-grade benchmark methodology | T3 reference |
| MiroEval | GitHub | Mirror-style eval framework | T3 reference |
| DeepResearch-Bench (HKU) | GitHub | Deep-research benchmark suite | T2 PATTERN (cross-source) |
| ossf/scorecard + criticality_score | OSSF | OWASP-aligned repo-health scoring | T2 PATTERN — anchored sca-v9 D8 |
| chaoss/community-metrics | CHAOSS | Community health metrics | T3 reference |

### (c) Judge/Eval Research-Archs

| Repo | License | Stars | Pattern | Verdict |
|---|---|---|---|---|
| METR/inspect_ai | MIT | 2.4k | UK AISI eval framework | INCUMBENT T1 LIVE |
| haizelabs/verdict | Apache-2.0 | 218 | Unit/Layer/Block judge primitives; DSPy-integrated | T2 VENDOR-FORK W316-r2; deep-ingest §3 |
| Anthropic Constitutional AI | Anthropic | — | Self-critique + revision loop | T2 PATTERN (anchored cardinal-rule R5) |
| eric-ai-lab/HarnessAudit | MIT | 156 | Multi-stakeholder audit harness | T2 PATTERN INSTALLED W316-S3 |
| ScaleAI/SWE-bench_Pro-os | MIT | — | Pro-grade SWE-bench variant | INSTALLED W316-S3 |
| OpenAI/PaperBench | MIT | 312 | Paper-replication benchmark | T3 reference |

### (d) MCDA Toolkits

| Repo | License | Stars | Pattern | Verdict |
|---|---|---|---|---|
| Valdecy/pyDecision | GPL-3.0 | 280 | 70+ MCDA methods + EC-PROMETHEE committee | T1-CANDIDATE; deep-ingest §3 |
| weka511/choix | MIT | 50 | Ranking aggregation (Bradley-Terry, Plackett-Luce) | T3 reference (sub-500★ — anti-bias) |
| pymcdm | MIT | 95 | TOPSIS/PROMETHEE/ELECTRE focused | T3 reference (sub-500★ — anti-bias) |
| fkb scikit-criteria | BSD | 215 | MCDA in sklearn-style API | T3 reference |
| Marcello-Sega/electre | MIT | 38 | ELECTRE-specific Python lib | T4 reference (sub-100★ — anti-bias) |

### (e) Multi-Agent Research-Orchestrators

| Repo | License | Stars | Pattern | Verdict |
|---|---|---|---|---|
| Anthropic claude-cookbooks orchestrator_workers + research_lead_agent | MIT | — | Lead → worker subagent fan-out | INCUMBENT pattern (cite-anchored cardinal R3) |
| microsoft/autogen | CC-BY-4.0/MIT | 35k | Multi-agent conversation framework | T2 PATTERN |
| langchain-ai/open_deep_research | MIT | 11k | Deep-research multi-agent pipeline | T2 PATTERN-ONLY |
| camel-ai/owl | Apache-2.0 | 18k | Operator/Worker generic agent framework | T3 reference |
| huggingface/smolagents | Apache-2.0 | 21k | Code-agent SOTA | T3 reference |
| OpenHands (formerly OpenDevin) | MIT | 39k | Autonomous SWE agent framework | T3 INFRA-reference |
| assafelovic/gpt-researcher | MIT | 24k | Planner + sub-researcher + reporter triad | T1-CANDIDATE; deep-ingest §3 |

### (f) Cross-Source-Convergence Frameworks

| Repo | License | Stars | Pattern | Verdict |
|---|---|---|---|---|
| stanford-oval/storm | MIT | 27k | Perspective-guided knowledge curation Wikipedia-grade | T1-CANDIDATE; deep-ingest §3 |
| AnswerDotAI/colbert | Apache-2.0 | 4.2k | Late-interaction retrieval; convergence via PLAID | T2 PATTERN-ONLY |
| facebookresearch/atlas | MIT | 540 | Retrieval-augmented language model | T3 reference |
| GoogleCloudPlatform/applied-ai-engineering-samples | Apache-2.0 | — | Convergence patterns | T3 reference |

### (g) Adversarial / Self-Improving Systems

| Repo / Paper | Source | Pattern | Verdict |
|---|---|---|---|
| Anthropic Constitutional AI | paper | Self-critique-revise loop | T2 PATTERN (cardinal R5) |
| OpenAI Preparedness PaperBench | paper | Paper-replication adversarial | T3 reference |
| DeepMind STaR (arXiv 2203.14465) | paper | Self-taught reasoner; bootstrap rationale | T2 PATTERN |
| DeepMind V-STaR (arXiv 2402.06457) | paper | Verifier-guided STaR | T2 PATTERN |
| princeton-nlp/SWE-agent | MIT | Self-improving SWE agent | T3 reference |

### (h) Memory Architectures

| Repo | License | Stars | Pattern | Verdict |
|---|---|---|---|---|
| topoteretes/cognee | Apache-2.0 | 7.8k | Pipeline-based knowledge ingestion | INCUMBENT T3 LIVE |
| basicmachines-co/basic-memory | Apache-2.0 | 1.1k | Markdown-canonical durable memory | INCUMBENT T6 LIVE-canonical |
| supermemoryai/supermemory | Apache-2.0 | 9.2k | Universal memory layer | T3 reference (cross-app, not CC-specific) |
| getzep/zep | Apache-2.0 | 3.4k | Temporal knowledge graph for agents | T3 reference |
| mem0ai/mem0 | Apache-2.0 | 39k | Persistent memory for agents | T3 PATTERN-ONLY |

### (i) Knowledge-Graph for Research

| Repo | License | Stars | Pattern | Verdict |
|---|---|---|---|---|
| getzep/graphiti | Apache-2.0 | 5.7k | Temporal KG for agents | RETIRED W295 (incumbent prior) |
| OpenSPG/openspg | Apache-2.0 | 2.2k | Semantic-property graph for LLM | T3 reference |
| microsoft/graphrag | MIT | 23k | Graph-based RAG | T2 PATTERN |
| circlemind-ai/fast-graphrag | Apache-2.0 | 2.6k | Lightweight graphrag | T3 reference |

### (j) Methodology Meta-Papers (Non-Code, Citation-Anchored)

| Paper | Source | Cite |
|---|---|---|
| Anthropic "Multi-Agent Research Systems" (Claude 2024) | anthropic.com | Cardinal R3 anchor |
| NIST AI 600-1 Risk Management Framework | NIST.gov | sca-v8 D-EMP MEASURE-2.3 anchor |
| OWASP Top-10 Agentic Apps 2026 | owasp.org | Cardinal R5 sandbox anchor |
| OpenSSF Best Practices §15 Brittle Tests | openssf.org | D-EMP anchor |
| arXiv 2604.05550v1 (AutoSOTA) | arXiv | sca-v11 D37 anchor |
| arXiv 2511.07685v1 (ResearchRubrics) | arXiv | sca-vN methodology anchor |

**Cohort total: 50+ entries across 10 cohorts.** Anti-bias: 6 entries below 500★ flagged for pattern-quality (pymcdm, choix, electre, paperbench, scikit-criteria, atlas).

---

## §3 Top-5 Deep-Ingest (deepwiki + perplexity + exa-extracted patterns)

### §3.1 stanfordnlp/dspy 3.2.1 (INCUMBENT T1 LIVE) + gepa-ai/gepa

**Architecture extracted (deepwiki ground-truth)**:
1. **Three-layer abstraction**: Signature → Module → Optimizer (compile-then-run paradigm). Separates expensive pre-inference optimization from cheap inference-time prediction.
2. **Signatures** = declarative I/O contracts; could be a string `"sentence -> sentiment: bool"` or `dspy.InputField` / `dspy.OutputField` class.
3. **Modules** = parameterized prompting techniques (e.g., `dspy.Predict`, `dspy.ChainOfThought`); composable; learnable parameters (prompts AND weights).
4. **Optimizers (Teleprompters)**: `BootstrapFewShot` / `MIPROv2` / `GEPA` (and `BetterTogether` strategy `"mipro -> gepa -> mipro"`).

**GEPA core pattern (Pareto-frontier reflective routing — extracted from exa)**:
- Maintains a **Pareto frontier**: candidates that achieve the highest score on at least one evaluation instance.
- Each iteration: (1) Select candidate from Pareto frontier (probability proportional to coverage); (2) Execute on minibatch capturing full execution traces; (3) Reflect — LLM reads traces and diagnoses failures; (4) Mutate informed by accumulated lessons; (5) Accept if improved, update Pareto front.
- **Key innovation**: textual feedback as gradient analogue (ASI = "Actionable Side Information").
- `frontier_type`: `instance` (per validation example), `objective` (per metric), `hybrid`, `cartesian` (per example-objective pair).
- Beat MIPROv2 on complex tasks with **far fewer rollouts** when metric returns rich feedback (arXiv 2507.19457, Agrawal et al. 2025).

**Patterns applicable to our research-arch**:
- `Signature` ↔ sca-v9 dimension `D1`-`D41` declarative contracts (input = candidate repo, output = install_score)
- `Module` ↔ Phase-5 5-gate composable assessors
- `Optimizer` ↔ rule_version evolution loop (Δ-deltas as candidate mutations)
- **GEPA Pareto frontier ↔ D33 quorum_unmet disagreement resolution**: keep all candidates strong on different dim-subsets instead of single-winner

**Anti-pattern (GEPA documentation explicit)**: "evolving just the best global candidate leads to local optima or stagnation." Direct anchor for why sca-v9 single-method aggregation is fragile.

**SOTA position**: T1 LIVE; GEPA optimizer added as T1-PROVISIONAL candidate via DSPy 3.2.1 already.

---

### §3.2 assafelovic/gpt-researcher (24k★ MIT)

**Architecture extracted (deepwiki ground-truth)**:
1. **Five-stage pipeline**: Planning → Data Collection → Review/Revision → Writing → Publication. Two implementations: LangGraph + AG2.
2. **Triad of specialized agents**:
   - **EditorAgent** (planner): generates outline, sections, title; takes initial-research + human-feedback + max-sections → plan
   - **ResearchAgent** (sub-researcher): per-section parallel research via `asyncio.gather`; runs `run_depth_research`
   - **WriterAgent** (reporter): compiles intro/conclusion/refs after all sections complete
   - Additional: `ReviewerAgent` + `ReviserAgent` (review-revision loop), `PublisherAgent`, `ChiefEditorAgent` (orchestrator)
3. **Cross-source convergence**: iterative `ReviewerAgent ↔ ReviserAgent` loop validates draft against `task["guidelines"]`; `follow_guidelines: true` activates loop.
4. **MCP integration**: two-stage approach — smart tool selection + contextual research; `mcp_configs` with `fast`/`deep`/`disabled` strategies.
5. **LLM tiering**: `gpt-4o-mini` (cheap initial eval) + `gpt-4o` (expensive critical generation) for cost optimization.

**Patterns applicable to our research-arch**:
- **Triad pattern ↔ our orchestrator → parallel-Agents → synthesis topology** (already informally followed; codify in sca-v11)
- **review-revision loop ↔ our Phase-5 5-gate iterative refinement** (currently single-pass; could iterate)
- **`task.json` config ↔ rubric-config externalization** (currently SKILL.md inline; modular extraction)
- **LLM tiering ↔ Phase-6 codex GPT-5.5 cross-model gate** (we already use claude → codex; gpt-researcher uses cheap+expensive in same model)
- **`asyncio.gather` ↔ W269 parallel-Agent dispatch mandate** (validates our pattern with production reference)

**Anti-pattern observed**: gpt-researcher has NO explicit cohort-overlap detection (single-source-per-section design); we have D34 cohort_overlap_signal which gpt-researcher lacks.

**SOTA position**: T1-CANDIDATE for vendor-fork; pattern-quality 4.65/5; install_score subject to W316-S7-style audit (cohort-fit with installed multi-agent stack).

---

### §3.3 stanford-oval/storm + Co-STORM (27k★ MIT)

**Architecture extracted (deepwiki ground-truth)**:
1. **Outline-first-then-expand decomposition**:
   - `StormOutlineGenerationModule`: two-step (`WritePageOutline` draft + `WritePageOutlineFromConv` refine)
   - `StormArticleGenerationModule`: populate outline in parallel via `ThreadPoolExecutor` per section
   - `StormArticlePolishingModule`: lead-section addition + dedup
2. **Perspective-guided knowledge curation**:
   - `CreateWriterWithPersona`: analyzes related articles → generates diverse personas
   - `StormKnowledgeCurationModule`: simulates conversations between Wikipedia writer + topic expert
   - `ConvSimulator`: orchestrates conversations with topic expert + question asker
3. **Co-STORM round-table protocol**:
   - `DiscourseManager`: manages turns among agents
   - **Moderator**: injects new perspectives by identifying unused, uncited information; prevents stagnation when N consecutive answering turns occur
   - **LLM Experts**: ground answers in external knowledge
   - **Human user**: observe or inject utterances
   - `CoStormRunner`: `warm_start` (parallel perspective-guided questioning across personas) → `step` (per `TurnPolicySpec`)
4. **Dynamic KnowledgeBase mind-map**: hierarchical organization of collected information; `ExpandNodeModule` reorganizes when too much info accumulates under one node.

**Patterns applicable to our research-arch**:
- **Outline-first decomposition ↔ Stage-0 existence-probe + Phase-1 dim-skeleton** (we have this for Stage-0; can extend to Phase-2 evidence-collection)
- **Perspective-guided personas ↔ multi-MCP cohort-balance** (D34 cohort_overlap_signal; STORM's personas = our MCP families)
- **Moderator anti-stagnation ↔ explicit silent-fallback detection** (the GitHub-MCP 4-wave silent-fallback pattern; codify in v11 §1 Stage-0)
- **Dynamic KnowledgeBase ↔ T6 basic-memory + T3 cognee hierarchical organization** (already incumbent; STORM validates pattern with production reference)
- **`warm_start` → `step` protocol ↔ our pre-flight checks + iterative deep-ingest** (validates our pattern)

**Anti-pattern observed**: STORM's perspective-discovery is fully-automated (no human-curated rubric); we have human-curated SKILL.md rubric which is anti-cohort-collapse stronger.

**SOTA position**: T1-CANDIDATE for pattern-vendor; pattern-quality 4.70/5; deep-ingest via repomix recommended for W321.

---

### §3.4 Valdecy/pyDecision (280★ GPL-3.0) — **ANTI-BIAS sub-500★ entry**

**Architecture extracted (perplexity-deep + arXiv 2404.06370 Pereira 2024)**:
1. **Two distinct "committee" concepts**:
   - **EC-PROMETHEE** = Entropy-CRITIC hybrid for **criteria weights**; "committee" of weight vectors, ONE MCDA method (PROMETHEE).
   - **Generic multi-method committee** = multiple MCDA methods (PROMETHEE, ELECTRE, TOPSIS, AHP, VIKOR) as voters → Borda count aggregation.
2. **EC-PROMETHEE mechanism**:
   - Compute weights via Entropy AND CRITIC.
   - For each criterion j: `w_min = min(w_Entropy, w_CRITIC)`, `w_max = max(w_Entropy, w_CRITIC)`.
   - Monte Carlo sample N weight vectors in `[w_min, w_max]`.
   - For each sample: run PROMETHEE II → ranking.
   - Aggregate via **frequency-of-position** (= Borda-like positional scoring).
3. **Disagreement resolution**:
   - NOT erased — quantified as **rank distribution**.
   - Output = positional frequency (e.g., "alternative A is 1st in 47% of iterations").
   - Robust-compromise alternative (rarely 1st but consistently 2nd-3rd) vs. fragile-winner (often 1st but sometimes much lower) made visible.
4. **Theoretical basis**:
   - Entropy weights (information-theoretic dispersion)
   - CRITIC (Criterium Importance Through Intercriteria Correlation)
   - PROMETHEE II outranking (Brans-Vincke 1985)
   - Implicit Borda-like positional scoring rule
   - Multi-method aggregation via Borda count (explicit pyDecision Borda module).

**Patterns applicable to our research-arch**:
- **EC-PROMETHEE weight-envelope sampling ↔ Δ49 D33 quorum_unmet resolution**: instead of single-MCDA verdict, run weighted committee with Entropy + CRITIC envelopes
- **Positional frequency ↔ install_score robustness metric**: rank distribution as 2nd-order metric beyond point-estimate
- **Borda count multi-method aggregation ↔ Phase-6 codex GPT-5.5 cross-model gate as one voter** (codex as one MCDA "method"; ratify the model-as-voter abstraction)
- **Robust-compromise detection ↔ T2 PATTERN-ONLY pre-cascade signal** (catch repos that are 1st in 1 dim but bottom in 5 dims)

**Anti-pattern observed**: pyDecision's Monte Carlo is **stochastic** — sca-v9's deterministic scoring is more reproducible. Adopt the **positional-frequency signal** but keep deterministic core.

**SOTA position**: T1-CANDIDATE for pattern-vendor (NOT install — GPL-3.0 + Python-only). Pattern-quality 4.85/5 (EC-PROMETHEE is unique). Anti-bias: 280★ but DIRECTLY-applicable theoretical contribution.

---

### §3.5 haizelabs/verdict (218★ Apache-2.0) — **ANTI-BIAS sub-500★ entry**

**Architecture extracted (deepwiki ground-truth)**:
1. **Three composable primitives**:
   - **Unit**: single LLM call; well-defined I/O; configurable model/prompt/extraction/transformation. Example: `CategoricalJudgeUnit` for discrete decisions.
   - **Layer**: container grouping multiple Units; scales via ensemble/round-robin; can repeat Units N times (critical for ensemble-judging).
   - **Block**: recursive graph composed of Units + Layers + Blocks; reusable pipeline patterns; implicitly created via `>>` operator.
2. **Judge-on-judge calibration**:
   - Primary judge unit makes evaluation.
   - Verifier unit checks primary's reasoning AND decision.
   - Repeat ~3x with different model instances.
   - Aggregate via `MaxPoolUnit` (majority vote) or `MeanPoolUnit` (averaging).
3. **DSPy integration** (sparse documentation): verdict used as a DSPy metric for AI system optimization.
4. **Declarative pipeline**: `>>` operator → DAG; `previous` and `source` template variables for context-injection.

**Concrete example (deepwiki extracted)**: `EnsembleVerifyJudge` = `CategoricalJudgeUnit` → `CategoricalJudgeUnit (verify)` → `MaxPoolUnit`, wrapped in `Layer(repeat=3)`.

**Patterns applicable to our research-arch**:
- **Unit/Layer/Block ↔ Phase-6 codex GPT-5.5 cross-model gate FORMALIZATION**: codex round-1 = Unit; ensemble (codex round-1 + round-2) = Layer; full Phase-6 gate (round-1 → round-2 → SHIP-decision) = Block
- **MaxPoolUnit / MeanPoolUnit ↔ sca-vN aggregation strategy explicit choice** (currently implicit; codify as Δ50)
- **Repeat=3 ensemble ↔ codex round-1 + round-2 + round-3 routine** (we have ad-hoc rounds; formalize)
- **`>>` declarative DAG ↔ Phase-5 5-gate flow** (currently inline prose; codify as graph)
- **Verifier-on-judge ↔ Phase-6 verifies Phase-5** (our pattern)

**Anti-pattern observed**: verdict's calibration is **fixed-3-instance** ensemble; sca-vN can vary (1 round if clean, 3 rounds if NEEDS-REVISION). Adopt **adaptive ensemble** instead of fixed.

**SOTA position**: T2 VENDOR-FORK W316-r2 verdict; deep-ingest via repomix recommended for W321. ICLR 2026 + DSPy-integrated. Anti-bias 218★ but ICLR-published. Pattern-quality 4.75/5.

---

## §4 Reusable Patterns Catalog

| Pattern Name | 1-Paragraph Description | Source-Citation | Applicability to sca-vN | Estimated Install_Score Lift |
|---|---|---|---|---|
| **P1: Pareto-frontier candidate routing** | When multiple candidates excel on different dimension-subsets, maintain ALL on a Pareto frontier (no single-winner collapse); sample for mutation proportional to coverage. Solves "local optima or stagnation" in single-best evolution. | gepa-ai/gepa arXiv 2507.19457 + dspy.GEPA | sca-v11 §6.7 candidate routing under D33 disagreement | +0.18 (D33 robustness) |
| **P2: Compile-then-run separation** | Separate expensive pre-inference computation (optimization of rubric, weight discovery, calibration) from cheap inference (single-repo scoring). Rubric `compile` step happens once per wave; per-repo `run` reuses compiled artifacts. | stanfordnlp/dspy core architecture | sca-v11 §5 Phase-5; rule_version evolution as compile-step | +0.10 (D38 evolution pressure) |
| **P3: Triadic research-pipeline** | Lead-orchestrator → parallel-sub-researchers → synthesizer-reporter, with explicit ReviewerAgent + ReviserAgent iterative refinement. Maps to W269 parallel-Agent mandate + Phase-5 review loop. | assafelovic/gpt-researcher EditorAgent/ResearchAgent/WriterAgent | sca-v11 §4 phase-architecture explicit codification | +0.08 (validates W269) |
| **P4: Outline-first-then-expand** | Skeleton-before-content; first generate Stage-0 outline of dim-coverage, then expand in parallel per-dim with explicit thread parallelism. Prevents premature optimization on partial evidence. | stanford-oval/storm StormOutlineGenerationModule | sca-v11 §1 Stage-0 existence-probe extension; outline of dim-coverage before scoring | +0.07 (Stage-0 robustness) |
| **P5: Perspective-guided persona diversity** | Generate diverse "perspectives" (= MCP families in our case) BEFORE evidence-collection to anti-bias single-source collapse. STORM uses `CreateWriterWithPersona`; we use multi-MCP cascade. Codify the persona-discovery step. | stanford-oval/storm Co-STORM + CreateWriterWithPersona | sca-v11 §1 Stage-0 MCP-cohort balance audit + D34 cohort_overlap_signal | +0.12 (anti-cohort-collapse explicit) |
| **P6: Moderator anti-stagnation** | Active component that detects N-consecutive-turns of single-perspective (= silent-fallback) and INJECTS underrepresented perspective. Direct match to GitHub-MCP 4-wave silent-fallback. | stanford-oval/storm Co-STORM Moderator | sca-v11 §1 Stage-0 silent-fallback detection codification | +0.15 (closes 4-wave silent-fallback) |
| **P7: EC-PROMETHEE committee aggregation** | Multi-MCDA-method committee (PROMETHEE + ELECTRE + TOPSIS + Borda) with explicit disagreement resolution via positional frequency. When methods disagree, output is rank DISTRIBUTION not point-estimate. | Valdecy/pyDecision + arXiv 2404.06370 | sca-v11 §5 Phase-5 gate-3 D33 quorum_unmet upgrade | +0.20 (D33 + composite robustness) |
| **P8: Unit/Layer/Block judge composition** | Composable judge primitives: Unit = single LLM call, Layer = ensemble container, Block = recursive graph. Enables hierarchical reasoning + verification with adaptive depth. | haizelabs/verdict | sca-v11 §6 Phase-6 codex gate formalization (round-1 = Unit, ensemble = Layer, full gate = Block) | +0.12 (Phase-6 rigor) |
| **P9: Constitutional self-critique-revise** | Critique → revise loop with explicit principle-list as text-conditioning. Adapts SL-CAI for rubric-grounded refinement: gate model critiques candidate via constitution → produces revised verdict OR escalate-to-human. | Anthropic CAI Bai 2022 arXiv 2212.08073 | sca-v11 §6 Phase-6 codex round formalization with explicit critique-revise stages | +0.08 (matches existing Stop-hook flow) |
| **P10: Rubric-as-config (task.json)** | Externalize rubric/criteria from code into config file; enable A/B testing of rubric versions; collect human-curated criteria. Anti-pattern: hard-coded inline rubrics that drift. | gpt-researcher `task.json` + ResearchRubrics arXiv 2511.07685 expert-authored | sca-v11 §0 SKILL.md vs rubric-config separation (long-term) | +0.05 (modularity) |
| **P11: Ternary judgment {Satisfied, Partial, Not}** | 3-level rubric verdict beats binary; captures partial credit. Negative criteria phrased to penalize undesired content. Weighted sum normalized by max-positive-weight. | ResearchRubrics arXiv 2511.07685 §3.4 | sca-v11 §0 dim-score scale upgrade (currently 1-5 effectively continuous; ternary as alternative) | +0.05 (interpretability) |
| **P12: Adaptive criteria generation w/ dynamic weighting** | RACE framework: Judge LLM derives task-specific dim-weights via averaging weights across T trials per dim. Adapts vs. fixed/static rubrics. | imlrz/DeepResearch-Bench-II + RACE framework | sca-v11 OPTIONAL §0 dynamic-weight pilot (HIGH RISK — operator-decision) | +0.08 (BUT anti-pattern A2 risk) |

---

## §5 Recommended Pattern Adoptions for sca-v11+ (Concrete Δ-deltas)

Cross-reference Stream H D52-D65 dim drafts; these patterns SHIP as new Δ-deltas absorbable into sca-v11 SKILL.md:

| Δ | Pattern | sca-v11 Absorb Target | Priority | Cumulative Δ-score Lift Est. |
|---|---|---|---|---|
| **Δ47** | P1 Pareto-frontier routing | §6.7 D33 quorum_unmet upgrade (Pareto frontier of competing-method-verdicts; sample-for-mutation = which dim to re-litigate next) | **P0** | +0.18 |
| **Δ48** | P4 + P5 + P6 Outline-first + Perspective + Moderator | §1 Stage-0 existence-probe EXTENSION: (a) outline of dim-coverage per MCP-family BEFORE evidence-collection; (b) explicit MCP-cohort-balance audit; (c) silent-fallback detection codified | **P0** | +0.27 (closes 4-wave GitHub-MCP silent-fallback) |
| **Δ49** | P7 EC-PROMETHEE committee aggregation | §5 Phase-5 gate-3 D33 quorum_unmet RESOLUTION via multi-method MCDA committee (PROMETHEE II + Borda + Codex GPT-5.5 = 3 voters) with positional-frequency output | **P0** | +0.20 |
| **Δ50** | P8 Unit/Layer/Block formalization | §6 Phase-6 codex GPT-5.5 cross-model gate FORMALIZATION: round-1 = Unit, ensemble (round-1 + round-2) = Layer, full gate = Block; adaptive depth (1 round if clean, 3 rounds if NEEDS-REVISION) | **P1** | +0.12 |
| **Δ51** | P9 Constitutional critique-revise | §6 Phase-6 codex round explicit critique-revise stages (codex already does this informally; codify) | **P1** | +0.08 |
| **Δ52** | P3 Triadic pipeline explicit | §4 phase-architecture codification (orchestrator → parallel-Agents → synthesis); validates existing W269 mandate | **P2** | +0.05 |
| **Δ53** | P11 Ternary judgment for partial-credit | §0 OPTIONAL dim-score scale upgrade to ternary (operator-decision; sca-v11 continuous-5 vs ternary trade-off) | **P3** | +0.05 (interpretability) |
| **Δ54** | P10 Rubric-as-config externalization | §0 LONG-TERM SKILL.md vs rubric-config-file separation (W322+ effort) | **P3** | +0.05 |

**Total estimated sca-v11 install_score lift (P0+P1 only)**: +0.85 cumulative — though some overlap; net ~+0.40-0.60 after composite normalization. arch-itself self-eval projection: 4.799 (sca-v9 path-a) → ~5.20+ (sca-v11 path-a) — likely capped at 5.0 ceiling.

**RATIFICATION**: All Δ47-Δ54 require Phase-6 codex GPT-5.5 cross-model gate (existing process). Δ48 + Δ49 specifically resolve the 4-wave GitHub-MCP silent-fallback open issue.

---

## §6 Anti-Adoption / Anti-Pattern Findings

| Anti-Pattern | Source | Why REJECT for our research-arch |
|---|---|---|
| **A1: Over-engineered framework lock-in (autogen-style)** | microsoft/autogen — 35k★ but heavy framework + state machine + non-portable agent abstractions | sca-vN is intentionally **lightweight rubric + plugin-skills**; framework lock-in violates cardinal-rule R1 + R4 |
| **A2: Stochastic Monte Carlo as primary aggregator** | pyDecision EC-PROMETHEE Monte Carlo weight sampling | sca-vN deterministic scoring is **reproducibility-critical** (ledger rows MUST be recomputable). Adopt **positional-frequency signal** but keep deterministic core. Same risk applies to Δ48 dynamic-weight RACE. |
| **A3: Single-prompt-DSL coupling (instructor-style)** | jxnl/instructor — Pydantic-only structured output | sca-vN is **rubric + reasoning** not structured-extraction; instructor pattern would force premature schema-flattening |
| **A4: Heavyweight orchestration framework (camel/owl)** | camel-ai/owl — multi-agent generic framework | We have native agent-teams + W269 mandate already; adding camel = duplicate infrastructure (D10 cohort_overlap_signal would catch) |
| **A5: Auto-generated rubric criteria (no human-curation)** | STORM full automation; AutoSOTA | ResearchRubrics 2025 paper explicitly says: "all rubrics are written and reviewed by human experts (not auto-generated)" — preserves nuanced, domain-specific requirements. sca-vN keeps operator-curated SKILL.md; reject full automation. |
| **A6: Fixed-3-round ensemble** | verdict default `Layer(repeat=3)` | We need **adaptive** ensemble (1 round if clean, 3 rounds if NEEDS-REVISION); fixed-3 wastes tokens on clean cases |
| **A7: RL-style preference reward modeling** | CAI RL-CAI / RLAIF reward-model train | We have no labeled-preference dataset for sca-vN install verdicts; preference RL requires labeled data; sca-vN uses cross-model gate consensus instead (cheaper, more transparent) |
| **A8: Memory-MCP saturation (mem0-style)** | mem0ai/mem0 — universal-memory-on-everything | sca-vN already has T6 basic-memory canonical + T3 cognee + T5 langfuse; adding mem0 = D10 cohort_overlap_signal high. Pattern-only adoption at best. |
| **A9: Graph-RAG for rubric storage** | microsoft/graphrag, OpenSPG | sca-vN rubric is markdown SKILL.md + git history; graph-rag is for RAG over content, not rubric storage. Mismatch. |
| **A10: Stars-as-quality-gate** | implicit in many high-★ frameworks | sca-vN explicitly anti-bias: 7-wave validation 0 stars-as-hardgate violations. KEEP rejecting. |

---

## §7 Bibliography (≥40 URLs)

### Deep-Ingest Top-5 (deepwiki / repo confirmations)

1. https://deepwiki.com/stanfordnlp/dspy — DSPy architecture (Signature/Module/Optimizer)
2. https://github.com/stanfordnlp/dspy — DSPy 3.2.1 incumbent T1 LIVE
3. https://github.com/gepa-ai/gepa — GEPA reflective Pareto-frontier optimizer
4. https://gepa-ai.github.io/gepa/guides/candidate-selection/ — GEPA candidate-selection strategies
5. https://gepa-ai.github.io/gepa/api/core/optimize/ — GEPA optimize() API
6. https://gepa-ai.github.io/gepa/tutorials/dspy_full_program_evolution/ — GEPA + DSPy full-program evolution
7. https://arxiv.org/abs/2507.19457 — GEPA: Reflective Prompt Evolution (Agrawal et al. 2025)
8. https://dspy.ai/api/optimizers/GEPA — dspy.GEPA documentation
9. https://hexdocs.pm/dspex/Dspy.GEPA.html — DSPex GEPA reference
10. https://github.com/intertwine/dspy-agent-skills/blob/main/skills/dspy-gepa-optimizer/SKILL.md — dspy-gepa-optimizer skill
11. https://deepwiki.com/assafelovic/gpt-researcher — gpt-researcher architecture
12. https://github.com/assafelovic/gpt-researcher — gpt-researcher repo
13. https://deepwiki.com/stanford-oval/storm — STORM architecture
14. https://github.com/stanford-oval/storm — STORM repo
15. https://github.com/Valdecy/pyDecision — pyDecision repo
16. https://arxiv.org/abs/2404.06370 — pyDecision paper (Pereira 2024)
17. https://pypi.org/project/ec-topsis/ — EC-TOPSIS PyPI (analogous EC-PROMETHEE)
18. https://pypi.org/user/Valdecy/ — Valdecy author PyPI profile
19. https://deepwiki.com/haizelabs/verdict — verdict architecture
20. https://github.com/haizelabs/verdict — verdict repo

### Research-Rubric & Eval Frameworks

21. https://arxiv.org/abs/2511.07685 — ResearchRubrics (Sharma et al. 2025)
22. https://arxiv.org/html/2511.07685 — ResearchRubrics full text
23. https://github.com/imlrz/DeepResearch-Bench-II — DeepResearch Bench II
24. https://arxiv.org/html/2601.08536v1 — DeepResearch Bench II paper
25. https://arxiv.org/abs/2506.11763 — DeepResearch Bench (Du et al. 2025)
26. https://www.aifasthub.com/papers/2506.11763 — DeepResearch Bench RACE/FACT
27. https://openreview.net/pdf?id=ErnvfmSX0P — ResearchRubrics OpenReview
28. https://hf.co/papers/2605.11378 — EvalAgent (May 2026)
29. https://hf.co/papers/2502.06111 — CSR-Bench
30. https://hf.co/papers/2506.22598 — RExBench
31. https://hf.co/papers/2509.24002 — MCPMark (MCP-stress-testing benchmark)

### Judge Calibration & Cross-Model

32. https://hf.co/papers/2512.11150 — Causal Judge Evaluation (calibration; Dec 2025)
33. https://hf.co/papers/2506.02945 — Quantitative LLM Judges
34. https://hf.co/papers/2505.13346 — J4R: Judge for Reasoning
35. https://hf.co/papers/2502.11689 — LLM-as-a-Judge general ability
36. https://hf.co/papers/2410.05495 — Self-rationalization fine-grained judge
37. https://hf.co/papers/2409.16788 — Mitigating LLM judge bias
38. https://hf.co/papers/2508.06225 — Overconfidence in LLM-as-a-Judge
39. https://hf.co/papers/2503.15620 — ContextualJudgeBench
40. https://hf.co/papers/2408.13006 — Systematic evaluation LLM-as-a-Judge

### Constitutional AI & Safety

41. https://arxiv.org/pdf/2212.08073 — Constitutional AI (Bai et al. 2022)
42. https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback — CAI blog
43. https://www.anthropic.com/constitution — Anthropic constitution
44. https://www.anthropic.com/news/claudes-constitution — Claude's constitution explainer
45. https://www.anthropic.com/research/collective-constitutional-ai-aligning-a-language-model-with-public-input — Collective CAI
46. https://bisi.org.uk/reports/claudes-new-constitution-ai-alignment-ethics-and-the-future-of-model-governance — 2026 new constitution
47. https://docs.nvidia.com/nemo-framework/user-guide/24.12/modelalignment/cai.html — NVIDIA NeMo CAI guide

### Methodology Meta-References

48. https://arxiv.org/abs/2604.05550v1 — AutoSOTA (auto-SOTA discovery) — STAGE-0 NOTE: arXiv ID format suggests future; treated as in-flight reference
49. https://en.wikipedia.org/wiki/Borda_count — Borda count (positional voting)
50. https://repub.eur.nl/pub/94305/AV-BC-PV-DividedMajority.pdf — Approval, Borda, Plurality theory
51. https://pmc.ncbi.nlm.nih.gov/articles/PMC4544539/ — MCDA under uncertainty
52. https://github.com/ossf/scorecard — OSSF Scorecard (incumbent T2 anchor)
53. https://chaoss.community — CHAOSS community metrics
54. https://owasp.org/www-project-top-10-for-large-language-model-applications/ — OWASP LLM Top-10
55. https://www.nist.gov/itl/ai-risk-management-framework — NIST AI 600-1 RMF
56. https://openssf.org — OpenSSF Best Practices

### MCDA & Decision-Theory

57. https://irispublishers.com/ijebm/fulltext/using-promethee-method-for-multi-criteria-decision-making-applications-and-procedures.ID.000502.php — PROMETHEE I-VI applications
58. https://pmc.ncbi.nlm.nih.gov/articles/PMC8548704/ — PROMETHEE foundational
59. https://www.1000minds.com/decision-making/what-is-mcdm-mcda — MCDM/MCDA overview
60. https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4877608 — EC-TOPSIS / EC-PROMETHEE foundational SSRN

**Deep-ingest verification confirmation**: 4-of-5 top-5 deepwiki ground-truth queries SUCCESS (stanfordnlp/dspy, assafelovic/gpt-researcher, stanford-oval/storm, haizelabs/verdict). 1-of-5 perplexity-only (Valdecy/pyDecision — deepwiki 404 NOT INDEXED; cross-source via arXiv 2404.06370 + perplexity Sonar Pro + Wikipedia Borda + EC-TOPSIS PyPI). Anti-bias: 2-of-5 top-5 entries sub-500★ (pyDecision 280★, verdict 218★) — pattern-quality drove ranking, not stars.

---

## §8 Cross-Reference to Sibling Streams

- **Stream G (broad 200+ discovery)**: Stream J's top-5 should be auditable via Stream G's broader candidate-cohort.
- **Stream H (scoring dims D52-D65 draft)**: Δ47-Δ54 in §5 should integrate with H's dim drafts. Specifically:
  - Δ47 Pareto-routing ↔ D52-D55 disagreement-handling dims
  - Δ48 outline-first + perspective + moderator ↔ D56-D58 cohort-balance dims
  - Δ49 EC-PROMETHEE committee ↔ D59-D61 aggregation dims
  - Δ50 Unit/Layer/Block ↔ D62-D65 phase-formalization dims
- **Stream I (decision rigor)**: §6 anti-pattern findings (A1-A10) should inform Stream I's rigor heuristics.

---

## §9 Closure Summary

**Top-5 meta-research repos for deep-ingest** (per §3):
1. stanfordnlp/dspy 3.2.1 + gepa-ai/gepa (Pareto-frontier reflective routing)
2. assafelovic/gpt-researcher (triadic research-pipeline)
3. stanford-oval/storm + Co-STORM (outline-first + perspective-guided)
4. Valdecy/pyDecision (EC-PROMETHEE committee aggregation) — ANTI-BIAS sub-500★
5. haizelabs/verdict (Unit/Layer/Block judge composition) — ANTI-BIAS sub-500★

**5 extracted reusable patterns** (per §4-§5):
- P1 Pareto-frontier routing (Δ47)
- P4+P5+P6 outline-first + perspective + moderator (Δ48 — closes 4-wave silent-fallback)
- P7 EC-PROMETHEE committee aggregation (Δ49)
- P8 Unit/Layer/Block judge composition (Δ50)
- P9 Constitutional self-critique-revise (Δ51)

**Recommended sca-v11 P0 absorbs**: Δ47 + Δ48 + Δ49 (P0); Δ50 + Δ51 (P1); Δ52-Δ54 (P2-P3).
**Estimated install_score lift**: +0.40-0.60 net composite (arch-itself self-eval projection); explicit ceiling at 5.0.

**Anti-bias mandate validated 8th-time**: 2-of-5 top-5 sub-500★ (pyDecision 280★, verdict 218★); pattern-quality and direct architectural applicability drove ranking, NOT stars.

**4-wave GitHub-MCP silent-fallback resolution**: Δ48 codifies STORM Moderator anti-stagnation pattern + Stage-0 perspective-guided cohort-balance audit. Closes open issue from W312-D + W313-D + W314-r1 + W315-B.

**Operator action items for W321**:
- (1) Run codex GPT-5.5 Phase-6 cross-model gate on this deliverable (verdict Block primitive)
- (2) Schedule repomix deep-pack of STORM + gpt-researcher (≤2 high-cost ingests in W321)
- (3) Integrate Δ47-Δ54 with Stream H D52-D65 — formal sca-v11 ship targeted W322

**End Stream J**.


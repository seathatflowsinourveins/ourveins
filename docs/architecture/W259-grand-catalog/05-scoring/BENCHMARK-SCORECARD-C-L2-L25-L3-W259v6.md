# W259-v6 Benchmark Scorecard C — L2 / L2.5 / L3

> **Agent**: W259 WAVE-6 BENCHMARK AGENT C. **Operator directive**: "EVERY LAYER NEED FULL COVERAGE OF SOTA REPOS AND BENCHMARK AND RANK WITH MULTI-DIMENSIONAL SCORES."
>
> **Mission**: Re-rank L2 (Agent Orchestration / Multi-Agent), L2.5 (Knowledge / Structured-Output), L3 (Peer CLI) on **canonical hard benchmarks from independent sources**, flag vendor-marketing, emit corrected dispositions.
>
> **Supersedes**: D8 (industry-adoption) values in `MASTER-SCORING-MATRIX-W259.md` rows touching L2/L2.5/L3, per the §0.5 W259-v4 benchmark-sourcing rule ("D8 MUST be sourced from canonical hard benchmarks — NEVER vendor marketing or self-description").
>
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Benchmark numbers below are TIER-2 (independent third-party leaderboards), explicitly distinguished from TIER-5 vendor self-claims which are flagged.
>
> **Date**: 2026-05-16.

---

## §0 — CRITICAL METHODOLOGY FINDING (read first)

**The benchmark-contamination problem in W259-v4 has a deeper root: layer/unit mismatch.**

Canonical agent benchmarks (τ²-bench, BFCL, SWE-bench Pro, Terminal-Bench, GAIA, AgentBench) overwhelmingly rank **MODELS**, not **frameworks / repos / CLIs**. A "94% τ²-bench" number is a *model* score (Claude Opus 4.6), not a *LangGraph* score or a *CrewAI* score. Scoring a framework repo with a model's benchmark number is the **same class of error** as scoring mem0 with a SaaS-marketing LongMemEval number.

**Correct unit-of-analysis per layer:**

| Layer | Unit being ranked | Correct canonical benchmark | What the benchmark holds constant |
|---|---|---|---|
| **L2 Orchestration** | Agent framework / scaffold | **GAIA via Princeton HAL** (scaffold-isolated) + independent framework evals (Turing 2000-run, kurtmb white paper) | Model held constant → measures *scaffold* delta |
| **L2.5 Structured-output** | Structured-output library | **BFCL** (AST-verified) + structured-generation-benchmark (aastroza) + SOB (arXiv 2604.25359) | Schema held constant → measures *library* reliability uplift |
| **L3 Peer CLI** | Coding-agent CLI | **Terminal-Bench 2.0 / 2.1** agent-specific rows + **SWE-bench Pro** scaffold rows | Model held constant (or paired) → measures *CLI harness* delta |

**Key independent-source evidence that scaffold ≠ model:**
- Princeton HAL: *same* Claude Opus 4 scores **64.9%** GAIA in HAL Generalist scaffold vs **57.6%** in HuggingFace Open Deep Research — a **7.3-pt swing from orchestration alone** (source: Princeton HAL leaderboard, cited by Uvik/AgentMarketCap 2026-04).
- Terminal-Bench 2.0 paper (arXiv 2601.11868): "model selection is usually more important than agent scaffold" — but the scaffold delta is still **real and measurable** (Codex CLI 62.9% vs Claude Code 52.1% vs OpenHands 51.9%, *all on strong models*).
- UC Berkeley (2026-04-12): **all 8 major agent benchmarks were reward-hackable to ~100%** — so even canonical benchmarks need pass^k / independent-harness scrutiny.

**Consequence for scoring**: D8 (industry-adoption) for L2/L2.5/L3 repos is re-anchored to (a) agent-layer independent leaderboard placement where the repo *is itself an agent scaffold* (L3 CLIs, some L2), or (b) independent framework-comparison studies (L2 frameworks), or (c) AST-verified structured-output evals (L2.5). Repos that are **plugin-kits / skill-collections** (wshobson/agents, anthropics/skills, superpowers) have **NO canonical agent benchmark** — they are not agents, they are content. Their D8 is honestly capped and marked `NO-CANONICAL-BENCHMARK`.

---

# LAYER L2 — Agent Orchestration / Multi-Agent

## §L2.1 — Canonical benchmark (named + independent source)

**Primary canonical benchmark: GAIA via the Princeton HAL (Holistic Agent Leaderboard).**
- **What**: 466-question general-assistant benchmark (multi-step tool use, web, file handling). HAL runs *identical models inside different agent scaffolds*, isolating the orchestration delta. Independent (Princeton, not a framework vendor).
- **Source**: Princeton HAL leaderboard; cross-cited by Uvik Software (2026-04), AgentMarketCap GAIA report (2026-04-10), Rapid Claw AI-agent-benchmarks (2026-04-20).
- **Why GAIA-HAL over τ²-bench for L2**: τ²-bench (Sierra Research, arXiv 2506.07982) is the canonical *tool-agent* benchmark but its leaderboard ranks **models** (Claude Opus 4.6 99.3% telecom / 91.9% retail), not frameworks. HAL is the only major leaderboard that holds model constant and varies the *scaffold*.

**Secondary canonical signal (framework-level, independent):**
- **Turing 2000-run framework benchmark** (callsphere.ai writeup): 6 frameworks (LangGraph, LangChain AgentExecutor, AutoGen, CrewAI, Semantic Kernel, Haystack), all on GPT-4o, 100 runs × 5 tasks. LangGraph: **89% task-completion** (highest), fastest median latency, lowest p95 variance. CrewAI: 81% overall (93% on research/summarization). Independent (Turing, an AI-services firm, not a framework vendor).
- **kurtmb agent-orchestration-benchmark** (GitHub white paper): ChatGPT-validated semantic accuracy — CrewAI 87.3%, smolagents 80.0%, AutoGen 76.7%, LangGraph 68.7%. (Methodology weaker — ChatGPT-as-judge, single-org — used as corroboration only, not primary.)
- **AgentBench** (Tsinghua THUDM): 8-environment broad benchmark; ranks models, canonical leaderboard on GitHub. Used as breadth cross-check.

**VENDOR-MARKETING flag at benchmark level**: "CrewAI crossed 2 billion agentic executions", "LangGraph 34.5M monthly downloads" are **adoption-volume vanity metrics**, NOT capability benchmarks. The "Claude Agent SDK ~84% on standard agentic evaluations (Agentpatch, 2025)" figure is single-source and unreproduced — flagged.

## §L2.2 — Ranked table (canonical-benchmark order, 23-dim scores)

D8 re-anchored: frameworks scored on Turing/HAL framework-delta evidence; plugin-kits marked `NO-CANONICAL-BENCHMARK` and D8-capped at 7 (community-consensus proxy only).

| Rank | Repo | Canonical-benchmark anchor (independent) | D1 | D2 | D3 | D4 | D5 | D6 | D7 | **D8** | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | D21 | D22 | D23 | **Composite** | Disposition |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **anthropics/skills** (plugin-kit) | NO-CANONICAL-BENCHMARK (skill content, not an agent) | 10 | 10 | 9 | 10 | 10 | 10 | 10 | **7** | 9 | 9 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | 9 | 9 | 8 | **91** | **T1 INSTALL** (benchmark-exempt — official Anthropic primitive) |
| 2 | **obra/superpowers** (plugin-kit) | NO-CANONICAL-BENCHMARK (skill content) | 10 | 10 | 9 | 9 | 10 | 10 | 10 | **7** | 9 | 9 | 10 | 9 | 9 | 10 | 10 | 9 | 9 | 9 | 10 | 8 | 9 | 9 | 8 | **90** | **T0-INSTALLED** (benchmark-exempt) |
| 3 | **langgraph (langchain-ai/langgraph)** | **Turing 2000-run: 89% task-completion (#1 of 6), fastest median latency, lowest variance** + GAIA-HAL scaffold-class | 10 | 10 | 10 | 9 | 10 | 9 | 8 | **9** | 8 | 9 | 8 | 10 | 9 | 10 | 9 | 7 | 9 | 9 | 9 | 7 | 8 | 6 | 8 | **86** | **T2 STUDY-PILOT** (strongest *measured* orchestrator; solo-fit D22 low — graph ceremony) |
| 4 | **openai/openai-agents-python** | GAIA-HAL scaffold-class; no isolated framework number but production-grade per multi-org evals | 10 | 10 | 10 | 10 | 10 | 8 | 7 | **8** | 9 | 9 | 8 | 10 | 9 | 10 | 10 | 8 | 10 | 10 | 9 | 7 | 8 | 7 | 9 | **89** | **T2 STUDY-PILOT** (cross-model; D8 corrected down — no isolated benchmark) |
| 5 | **wshobson/agents** (plugin-kit) | NO-CANONICAL-BENCHMARK (agent-definition content) | 10 | 10 | 10 | 8 | 10 | 10 | 10 | **7** | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 6 | 9 | 9 | 10 | 7 | 9 | 9 | 8 | **86** | **T1 SELECTIVE** (D8 corrected 9→7: kit, not benchmarked agent) |
| 6 | **microsoft/agent-framework** | No isolated framework benchmark; AutoGen lineage scored ~76.7% (kurtmb) — corroboration only | 10 | 10 | 10 | 10 | 10 | 8 | 8 | **7** | 8 | 9 | 8 | 10 | 9 | 10 | 10 | 8 | 10 | 9 | 9 | 7 | 8 | 6 | 9 | **86** | **T2 STUDY-PILOT** (D8 9→7: AutoGen-lineage mid-pack on independent eval) |
| 7 | **crewAIInc/crewAI** | **Turing: 81% overall / 93% research-summarization (#2)**; kurtmb: 87.3% semantic-acc (#1) | 10 | 10 | 9 | 7 | 10 | 8 | 7 | **8** | 7 | 8 | 7 | 10 | 8 | 9 | 9 | 7 | 8 | 9 | 9 | 7 | 7 | 7 | 8 | **80** | **T3 CITE-PATTERN** (role-decomposition pattern; +18% token overhead per Rapid Claw) |
| 8 | **huggingface/smolagents** | kurtmb: 80.0% semantic-acc (#2), 0% error-rate, fastest exec | 10 | 10 | 9 | 9 | 10 | 8 | 8 | **7** | 7 | 8 | 7 | 9 | 9 | 9 | 9 | 8 | 8 | 9 | 9 | 7 | 7 | 8 | 8 | **82** | **T3 CITE-PATTERN** (lightweight code-as-action; thin production track-record) |
| 9 | **letta-ai/letta** | Letta Code = "#1 open-source agent" on Terminal-Bench (older core 0.1.1 era; not 2.x verified) | 9 | 10 | 8 | 8 | 10 | 8 | 8 | **7** | 7 | 8 | 7 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 8 | 7 | 7 | 6 | 9 | **80** | **T4 WATCH** (memory-first; benchmark claim is stale-era — see L3 for Letta Code CLI) |

**Removed / not-installed-on-benchmark-grounds**: AutoGen/AG2 standalone — superseded by microsoft/agent-framework 1.0 (AutoGen 0.2 in maintenance mode per Agent-Harness 2026-03); ranks 76.7% mid-pack with no forward maintenance.

## §L2.3 — Vendor-marketing flags (L2)

| Claim | Source | Flag | Independent reality |
|---|---|---|---|
| "CrewAI: 2 billion agentic executions" | CrewAI marketing | **VANITY-VOLUME** | Execution count ≠ capability. On Turing's controlled eval CrewAI is #2 (81%), behind LangGraph. |
| "LangGraph: 34.5M monthly downloads" | LangChain marketing | **VANITY-VOLUME** | Download count ≠ capability. (LangGraph *does* independently lead Turing's 89% — cite that instead.) |
| "Claude Agent SDK ~84% on standard agentic evaluations" | Agentpatch 2025, single-source | **UNREPRODUCED** | Not on any canonical leaderboard; no pass^k; one vendor-adjacent source. |
| wshobson/agents "33.5k★, 77 plugins" / anthropics/skills adoption | repo self-description | **NOT-A-BENCHMARK** | Star count is D3/D12 input, never D8. These are skill-kits with NO agent benchmark. |
| smolagents "HuggingFace-backed" | positioning language | **PROVENANCE≠CAPABILITY** | Backer prestige is D4, not D8. Capability is kurtmb 80.0%. |

## §L2.4 — Corrected disposition (L2)

- **Plugin-kits (anthropics/skills, superpowers, wshobson/agents)**: retain INSTALL/SELECTIVE on **D11 native-CC-pathway + D7 alignment** grounds — they are benchmark-exempt because they are *content for Claude Code*, not standalone agents. **D8 corrected to 7** for all three (community-consensus proxy ceiling; no canonical agent benchmark exists for skill collections). wshobson/agents specifically: master-matrix D8=9 → **corrected 7**.
- **Frameworks (LangGraph, OpenAI Agents SDK, MS Agent Framework, CrewAI, smolagents, Letta)**: these are L5-scaffold-class repos cross-listed at L2. **LangGraph is the only one with a clean independent capability number** (Turing 89%). It is therefore the **benchmark-correct top framework**, but stays **T2 STUDY-PILOT** because (a) graph ceremony fails D22 solo-operator-fit, (b) the operator's runtime already uses Claude Code as orchestrator (row 1 of master matrix, composite 97). Frameworks are STUDY-PILOT/CITE-PATTERN, not INSTALL — they would *replace* the orchestrator, which is not load-bearing.
- **Net L2 verdict**: No change to install set. Correction is **D8 deflation for kits + frameworks** that were over-credited from star-count / download-count vanity metrics.

---

# LAYER L2.5 — Knowledge / Structured-Output

## §L2.5.1 — Canonical benchmark (named + independent source)

**Primary canonical benchmark: BFCL — Berkeley Function-Calling Leaderboard (V4).**
- **What**: AST-verified (Abstract Syntax Tree) function-calling evaluation. V4 adds agentic web-search, memory, format-sensitivity. The *de facto* standard for function-calling per its MLR proceedings paper (Patil et al. 2025, proceedings.mlr.press/v267/patil25a). Deterministic AST/state-transition verification → minimal fluctuation.
- **Source**: gorilla.cs.berkeley.edu/leaderboard (UC Berkeley — independent academic). Last updated 2026-04-12. PyPI `bfcl-eval` reproducible.
- **Note**: BFCL ranks **models** (Qwen3.5-397B 72.9% leads BFCL-V4; Claude Opus 4.1 70.4% / GLM-4.5 70.9% on V4 function-calling per Awesome Agents). The *library* question is different.

**Primary library-level canonical benchmark: structured-generation-benchmark (aastroza/structured-generation-benchmark).**
- **What**: The only independent, public benchmark that holds the *model* constant and measures the *structured-output library's* reliability uplift, by running Outlines / Instructor through the **Gorilla BFCL AST harness**.
- **Source**: github.com/aastroza/structured-generation-benchmark (independent practitioner; reproducible via Modal + BFCL scripts).
- **Headline independent result**: constrained generation (Outlines) lifted `deepseek-coder-7b` from **38.9% → 87.0%** BFCL AST-simple (rank 38 → rank 3), and `gemma-7b-it` from **42.2% → 84.3%** — matching fine-tuned Gorilla. Demonstrates constrained-decoding libraries deliver a *measured* reliability uplift; retry-based libraries (Instructor) deliver a *probabilistic* one.

**Secondary canonical benchmark: SOB — Structured Output Benchmark (arXiv 2604.25359).**
- **What**: Multi-source (text/image/audio), 21 models, 7 metrics. **Key independent finding**: models hit **near-perfect schema compliance (≥96% on 16/21 models)** but **Value Accuracy collapses to 69.3-83.0% on text** and Perfect-Response-Rate to 37.6-52.6%. "The scaffolding is correct; the content inside it is not."
- **Source**: arXiv (academic, independent).

**Why this matters for L2.5 ranking**: The benchmark-correct distinction is **deterministic guarantee vs probabilistic retry**:
- **Constrained-decoding** (outlines, guidance, BAML's parser): schema-valid *by construction* — zero schema-validation failures (independently confirmed in structured-generation-benchmark + Contra Collective 2026-04 "zero validation failures is the headline claim, and for well-defined schemas it is accurate"). **Limitation**: outlines/guidance constrained mode requires model-weight access (local models only — does NOT work with Claude/GPT cloud APIs).
- **Post-hoc validate-and-retry** (instructor, pydantic-ai): probabilistic — works with cloud APIs, "most validation failures resolved within 1-2 retries" but no guarantee; retry cost is real at scale.
- **BAML**: hybrid — fault-tolerant *parser* (not constrained decoding), works with any model incl. cloud APIs, microsecond parse.

## §L2.5.2 — Ranked table (canonical-benchmark order, 23-dim scores)

Ranked by **structured-output reliability guarantee strength × cloud-API applicability** (the two axes the independent benchmarks isolate). D8 anchored to structured-generation-benchmark / SOB / BFCL-harness evidence.

| Rank | Repo | Canonical-benchmark anchor (independent) | D1 | D2 | D3 | D4 | D5 | D6 | D7 | **D8** | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | D21 | D22 | D23 | **Composite** | Disposition |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **pydantic/pydantic-ai** | BFCL-class via Pydantic-validation reflection + Pydantic Evals (multi-run pass^k native); retry-based, cloud-API-applicable | 10 | 10 | 10 | 9 | 10 | 10 | 9 | **9** | 8 | 9 | 8 | 9 | 9 | 10 | 9 | 8 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | **88** | **T1 INSTALL** (best cloud-API structured-output + native evals; Claude-applicable) |
| 2 | **567-labs/instructor** | structured-generation-benchmark: Instructor BFCL eval published; validate-and-retry, cloud-API-applicable; "1-2 retries resolve most failures" (Contra Collective 2026-04) | 10 | 10 | 9 | 9 | 10 | 10 | 10 | **9** | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | **88** | **T1 INSTALL** (Anthropic-native; probabilistic — no hard guarantee) |
| 3 | **BoundaryML/baml** | Fault-tolerant parser (microsecond, any model incl. cloud); BAML's own survey is the field reference; in-DSL test framework | 10 | 10 | 9 | 8 | 10 | 9 | 9 | **8** | 8 | 8 | 7 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 7 | 9 | 8 | 9 | **84** | **T2 STUDY-PILOT** (cross-lang; build-step adds D16 cost; parser ≠ guarantee) |
| 4 | **dottxt-ai/outlines** | **structured-generation-benchmark: deepseek-7b 38.9%→87.0%, gemma-7b 42.2%→84.3% BFCL AST — measured uplift, ZERO schema-fails by construction** | 10 | 10 | 9 | 9 | 10 | 9 | 9 | **9** | 8 | 8 | 7 | 9 | 9 | 9 | 9 | 8 | 9 | 9 | 9 | 7 | 9 | 6 | 8 | **84** | **T3 CITE-PATTERN** (strongest *guarantee* — but D22/D6 fail: cloud APIs Claude/GPT unsupported) |
| 5 | **guidance-ai/guidance** | Constrained-decoding + token-healing class (same family as outlines); no dedicated public BFCL run located | 10 | 9 | 8 | 9 | 9 | 8 | 8 | **7** | 7 | 8 | 6 | 8 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 7 | 9 | 6 | 7 | **79** | **T3 CITE-PATTERN** (local-model-only; weaker maintenance signal vs outlines) |

**Cross-layer note**: dspy (master row 29, composite 86) is a *prompt-optimization* framework, not a structured-output library — correctly L2.5-adjacent but out of scope for this structured-output benchmark; its self-tuned-HotPotQA contamination was already flagged in W259-v4 §0.5 for the cognee comparison.

## §L2.5.3 — Vendor-marketing flags (L2.5)

| Claim | Source | Flag | Independent reality |
|---|---|---|---|
| outlines / guidance "zero validation failures" / "100% schema adherence" | dottxt-ai, guidance marketing | **TRUE-BUT-SCOPED** | Independently confirmed *for well-defined schemas on local models*. Does **NOT** apply to Claude/GPT cloud APIs (requires model-weight logit access). Marketing omits this scope. |
| "100% schema compliance" as a quality proxy (any vendor) | general structured-output marketing | **MISLEADING-METRIC** | SOB (arXiv 2604.25359) proves schema-compliance ≥96% while **Value Accuracy is only 69-83%** — valid JSON with wrong values. Schema compliance is necessary, not sufficient. |
| BAML "every framework compared" survey | BoundaryML's own blog | **VENDOR-AUTHORED-COMPARISON** | Useful field map but authored by a competitor — BAML is graded favorably by BAML. Treat as orientation, not ranking. |
| instructor "the most popular structured-output library" | 567-labs positioning | **POPULARITY≠RELIABILITY** | Popularity is D3/D12. Reliability is the retry-based probabilistic profile measured in structured-generation-benchmark. |

## §L2.5.4 — Corrected disposition (L2.5)

- **pydantic-ai & instructor** retain **T1 INSTALL** — they are the **only top candidates that work with Claude/GPT cloud APIs** (the operator's actual model surface). pydantic-ai edges instructor on **native Pydantic Evals + multi-run pass^k** (D8/D14 uplift). Master matrix D8=9 retained — *justified* here because both have published cloud-API structured-output behavior and pydantic-ai ships an eval harness.
- **outlines**: master matrix D8=9, composite 84, "T2 STUDY-PILOT" → **corrected to T3 CITE-PATTERN**. Reason: outlines has the *strongest measured reliability guarantee* of any L2.5 repo (the BFCL uplift is the cleanest independent number in this layer), **but** constrained decoding requires model-weight access — **unusable against Claude/GPT cloud APIs**, which is the operator's entire model surface (D6 use-class-compat and D22 solo-fit both drop). Adopt the *pattern* (constrain-don't-validate) for any future local-model work; do not install as a cloud-API structured-output layer.
- **BAML**: **T2 STUDY-PILOT** retained — hybrid parser works with cloud APIs, but build-step (D16 context-budget-cost) and cross-language DSL are unjustified overhead for a solo Python-centric runtime.
- **guidance**: **T3 CITE-PATTERN** — same local-only constraint as outlines, weaker maintenance velocity.
- **Net L2.5 verdict**: install set narrows to **pydantic-ai + instructor** (both cloud-API-capable). The headline correction: **outlines' D8 is benchmark-strong but its disposition must drop** because the benchmark uplift is unreachable on the operator's cloud-API models — a use-class mismatch, exactly the D6/D22 distinction the 23-dim schema exists to catch.

---

# LAYER L3 — Peer CLI

## §L3.1 — Canonical benchmark (named + independent source)

**Primary canonical benchmark: Terminal-Bench 2.0 / 2.1 (agent-specific rows).**
- **What**: Harbor-native benchmark of AI agents in *terminal environments*. v2.0 = 89 high-quality tasks (SWE, ML, security, data-science). The leaderboard ranks **agent × model** pairs — i.e. it *does* isolate the CLI scaffold when model is held constant.
- **Source**: tbench.ai / t-bench.com (Laude Institute — independent academic; Terminal-Bench paper arXiv 2601.11868). Antigma maintains an independent reproducible mirror. Terminal Trove publishes per-agent placement.
- **Independent agent-isolated numbers** (Terminal-Bench 2.0, the canonical L3 ranking):
  - **Codex CLI: #1, 82.0% ±2.2** (w/ GPT-5.5; per Terminal Trove + tbench 2.1 = 83.4%).
  - **OpenHands: 51.9% ±2.9** (#51, w/ Claude Opus 4.5).
  - **Goose: 54.3% ±2.6** (#46, w/ Claude Opus 4.5).
  - **OpenCode: 51.7%** (#53, w/ Claude Opus 4.5).
  - **Gemini CLI: 47.4% ±3.0** (#57, w/ Gemini 3 Flash) → **70.7% on Terminal-Bench 2.1** w/ Gemini 3.1 Pro.
  - **aider: 51.9% ±2.9** (#51, w/ Claude Opus 4.5) — aider is edit-loop-focused, weak on terminal-agent tasks.
  - (Reference: Claude Code 52.1%, the operator's incumbent orchestrator.)

**Secondary canonical benchmark: SWE-bench Pro (Scale AI) — NOT SWE-bench Verified.**
- **What**: 731-instance public set from **GPL-copyleft repos** (legal contamination barrier) + 276 private startup repos. Per directive: SWE-bench **Verified is contaminated** (70%+ scores); **Pro is the canonical hard one** (top models ~23-25% public, <18% private).
- **Source**: scale.com/leaderboard/swe_bench_pro_public + arXiv 2509.16941 (Scale AI — independent of the CLI vendors). SWE-Agent scaffold rows: SWE-Agent+Sonnet-4.5 **43.72%** (uncapped), GPT-5 36.30%, GLM-4.5 35.52%.
- **Caveat**: SWE-bench Pro's public leaderboard ranks *models inside the SWE-Agent scaffold*, not the L3 CLIs directly. It is the canonical **contamination-free coding-capability** signal; Terminal-Bench is the canonical **CLI-harness** signal. Both cited; Terminal-Bench is primary for ranking *CLIs as CLIs*.

## §L3.2 — Ranked table (canonical-benchmark order, 23-dim scores)

Ranked by **Terminal-Bench 2.0/2.1 agent-isolated score** (primary), SWE-bench Pro as capability cross-check. D8 = independent agent-leaderboard placement.

| Rank | Repo | Canonical-benchmark anchor (independent — Terminal-Bench agent-isolated) | D1 | D2 | D3 | D4 | D5 | D6 | D7 | **D8** | D9 | D10 | D11 | D12 | D13 | D14 | D15 | D16 | D17 | D18 | D19 | D20 | D21 | D22 | D23 | **Composite** | Disposition |
|---:|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **openai/codex CLI** (`openai/codex`) | **Terminal-Bench 2.0 #1 = 82.0%; TB 2.1 #1 = 83.4% ±2.2** — strongest CLI on the canonical leaderboard, by a wide margin | 10 | 10 | 10 | 10 | 10 | 10 | 10 | **10** | 8 | 9 | 10 | 9 | 9 | 10 | 10 | 8 | 9 | 10 | 10 | 8 | 8 | 9 | 9 | **93** | **T1 INSTALL** (already cross-model reviewer via codex-plugin-cc; benchmark #1) |
| 2 | **AAIF/goose** (`aaif-goose/goose`) | Terminal-Bench 2.0 = **54.3% ±2.6** (#46, Claude Opus 4.5) — best of the OSS general-agent CLIs on the canonical run | 10 | 10 | 9 | 10 | 10 | 9 | 9 | **8** | 8 | 9 | 8 | 9 | 9 | 9 | 9 | 7 | 9 | 9 | 9 | 7 | 8 | 7 | 9 | **84** | **T2 STAGED-ADOPT** (LF-GA; D8 9→8: mid-pack on canonical TB) |
| 3 | **anomalyco/opencode** | Terminal-Bench 2.0 = **51.7%** (#53, Claude Opus 4.5) — strong stars (160k) but **mid-pack on the canonical benchmark** | 10 | 10 | 10 | 8 | 10 | 9 | 9 | **8** | 8 | 9 | 9 | 9 | 9 | 10 | 9 | 7 | 9 | 9 | 9 | 7 | 8 | 8 | 9 | **85** | **T2 PILOT** (D8 corrected 10→8: 160k★ is D3/D12, NOT benchmark — TB places it #53) |
| 4 | **OpenHands/OpenHands** | Terminal-Bench 2.0 = **51.9% ±2.9** (#51, Claude Opus 4.5); SWE-bench-family scaffold heritage | 10 | 10 | 9 | 8 | 10 | 9 | 8 | **8** | 8 | 8 | 7 | 9 | 9 | 9 | 5 | 7 | 9 | 9 | 8 | 7 | 8 | 6 | 8 | **78** | **T3 WATCH** (Windows-WSL2-gated D15=5; canonical-benchmark mid-pack) |
| 5 | **google-gemini/gemini-cli** | Terminal-Bench 2.0 = **47.4% ±3.0** (#57, Gemini 3 Flash); TB 2.1 = **70.7%** (Gemini 3.1 Pro) | 10 | 10 | 10 | 10 | 10 | 9 | 7 | **8** | 8 | 9 | 8 | 10 | 9 | 10 | 9 | 7 | 9 | 9 | 9 | 7 | 8 | 7 | 9 | **86** | **T4 WATCH** (D8 corrected 10→8: TB 2.0 #57 — 104k★ ≠ benchmark; multi-provider not load-bearing) |
| 6 | **Aider-AI/aider** | Terminal-Bench 2.0 = **51.9% ±2.9** (#51) — aider is an *edit-loop*, weak as terminal-agent; Aider-Polyglot is its native benchmark | 10 | 9 | 8 | 8 | 9 | 8 | 8 | **7** | 8 | 8 | 7 | 9 | 9 | 8 | 9 | 8 | 9 | 9 | 9 | 7 | 8 | 9 | 7 | **80** | **T3 CITE-PATTERN** (diff-application pattern; superseded as agentic CLI) |

**Letta Code** (`letta-ai/letta-code`, 2.4k★, Apache-2.0, memory-first CLI): listed for completeness — claimed "#1 open-source agent" on Terminal-Bench *core 0.1.1* (legacy era), present on TB 2.0 leaderboard w/ Claude Opus 4.5 but **no verified 2.0 percentage located**. Disposition **T4 WATCH** — the #1-OSS claim is stale-benchmark-era and not reproduced on canonical TB 2.0/2.1.

## §L3.3 — Vendor-marketing flags (L3)

| Claim | Source | Flag | Independent reality |
|---|---|---|---|
| opencode "160,923★ / 160k★ DHH-endorsed" | master matrix + opencode positioning | **STAR-COUNT≠BENCHMARK** | 160k★ is D3/D12. On the canonical Terminal-Bench 2.0 opencode is **#53 at 51.7%** — mid-pack. Master matrix D8=10 is wrong; **corrected to 8**. |
| gemini-cli "104,000★" / "1M context free 1000 req/day" | Google positioning | **STAR-COUNT + FREE-TIER≠BENCHMARK** | TB 2.0 = #57 (47.4%). Free-tier is a cost feature, not capability. Master matrix D8=10 → **corrected to 8**. |
| Letta Code "#1 open-source agent on Terminal-Bench" | Letta repo README | **STALE-BENCHMARK-ERA** | Claim is from Terminal-Bench *core 0.1.1* (legacy). Not reproduced on canonical TB 2.0/2.1. |
| Codex CLI "#1 · 82.0%" | OpenAI / Terminal Trove | **VERIFIED — NOT a flag** | This one *is* the canonical independent number (Terminal-Bench team-verified run). Cite freely. |
| goose "works with 25+ providers / 400+ OpenRouter models" | Block positioning | **BREADTH≠CAPABILITY** | Provider count is a portability feature (D15/D17), not D8. Capability is TB 2.0 54.3%. |
| OpenHands SWE-bench Verified scores (when cited) | OpenHands marketing | **CONTAMINATED-BENCHMARK** | Per directive: SWE-bench Verified is contaminated. Use SWE-bench Pro (~23-25%) or Terminal-Bench. |

## §L3.4 — Corrected disposition (L3)

- **Codex CLI**: **T1 INSTALL** confirmed and *strengthened* — it is the **#1 CLI on the canonical Terminal-Bench leaderboard** (82.0% / 83.4%), a real independent number, not marketing. It is already the operator's cross-model reviewer via `openai/codex-plugin-cc` (master matrix row 55, composite 92). Benchmark evidence fully ratifies the existing install.
- **opencode**: master matrix composite 88, D8=10, "T1 PILOT" → **D8 corrected 10→8, composite 88→85**, disposition **T2 PILOT** (downgraded from T1). Reason: the 160k-star count drove an inflated D8; on the canonical Terminal-Bench 2.0 opencode places **#53 (51.7%)** — squarely mid-pack, *below* goose. Stars measure popularity (D3/D12), never capability (D8). This is the **exact L3 analogue of the mem0 LongMemEval-marketing error** in W259-v4 §0.5.
- **gemini-cli**: master matrix D8=10, composite 88, "T4 WATCH" → **D8 corrected 10→8, composite 88→86**, disposition **T4 WATCH retained** (the operator-fit override — multi-provider redundancy not load-bearing — already held it at T4, so net adoption decision is unchanged; only the D8 honesty is corrected).
- **goose**: **T2 STAGED-ADOPT** retained; D8 9→8 (mid-pack 54.3% on canonical TB — still the **best OSS general-agent CLI** of the non-Codex field, which justifies keeping it above opencode/OpenHands).
- **OpenHands**: **T3 WATCH** — Windows-WSL2 gating (D15=5) plus canonical-benchmark mid-pack (51.9%) keep it deferred.
- **aider**: **T3 CITE-PATTERN** — the diff/edit-application loop is a worthwhile pattern, but aider is not competitive as an agentic terminal CLI on the canonical benchmark.
- **Net L3 verdict**: install set is unchanged in *substance* (Codex CLI stays the installed peer-CLI; everything else was already pilot/watch). The headline correction is **opencode demoted T1→T2** and **two D8 deflations (opencode, gemini-cli)** — both were credited capability points they had not earned on the canonical Terminal-Bench leaderboard. SWE-bench **Verified must not be cited** for any L3 repo; SWE-bench **Pro** + **Terminal-Bench** are the contamination-resistant canonical pair.

---

## §SUMMARY — Cross-layer corrections rollup

| Layer | Canonical benchmark (independent source) | Top-3 ranked | Headline correction |
|---|---|---|---|
| **L2** | GAIA via Princeton HAL (scaffold-isolated) + Turing 2000-run framework eval | 1. anthropics/skills (benchmark-exempt kit) · 2. obra/superpowers (exempt kit) · 3. langgraph (Turing #1, 89%) | D8 deflated for skill-kits (no agent benchmark exists — wshobson/agents 9→7) + frameworks over-credited from download/star vanity metrics |
| **L2.5** | BFCL (Berkeley, AST-verified) + structured-generation-benchmark + SOB | 1. pydantic-ai · 2. instructor · 3. BAML | outlines has the strongest *measured* reliability (BFCL uplift 38.9%→87%) but **disposition drops T2→T3**: constrained decoding is unusable on Claude/GPT cloud APIs (D6/D22 use-class mismatch) |
| **L3** | Terminal-Bench 2.0/2.1 (Laude Inst., agent-isolated) + SWE-bench **Pro** (NOT Verified) | 1. Codex CLI (TB #1, 82.0%) · 2. goose (54.3%) · 3. opencode (51.7%) | **opencode demoted T1→T2**; D8 deflated for opencode (10→8) and gemini-cli (10→8) — 160k/104k star counts were mis-credited as capability; canonical TB places them #53 and #57 |

**Pervasive error class found (all 3 layers)**: capability dimension D8 was contaminated by **popularity proxies** (GitHub stars, download counts, execution-volume) and by **scoring frameworks/CLIs with model-level benchmark numbers**. This is the same root cause as the W259-v4 §0.5 mem0 finding. Corrected D8 values are sourced strictly from independent, scaffold/library-isolated benchmarks (Terminal-Bench agent rows, structured-generation-benchmark, Turing controlled eval) or honestly capped with `NO-CANONICAL-BENCHMARK` where the repo is content (skill-kits), not an agent.

**Adoption-decision net effect**: only one disposition flips (**opencode T1→T2**). All other corrections are D8-honesty deflations that do not change install/watch tier because operator-fit overrides already governed those repos. The scorecard's value is **benchmark-integrity**, not install-list churn.

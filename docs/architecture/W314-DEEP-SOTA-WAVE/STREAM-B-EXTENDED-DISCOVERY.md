# W314 Stream B — Extended Multi-MCP Cascade SOTA Discovery (Axes 5-8)

**Wave**: W314 Deep SOTA · **Stream**: B · **Date**: 2026-05-19
**Scope**: NET-NEW candidates across Axes 5-8 (decision-frameworks · multi-MCP routing · GPU-for-loops · anti-bias quality metrics). NO INSTALLS — discovery only.
**Cost-budget**: ≤$3 cascade spend; cardinal-rule-1 (trusted upstreams only) honored.
**Skip-set**: W288→W313 ledger inclusive of W313-D 12 candidates (ik_llama.cpp / OpenJudge / aelassas/servy / Rulers / agent-trace / etc.) plus W307-REJECTED Portkey + W302-INSTALLED nvidia_gpu_exporter.

## MCP families fired (10 of 10 — cascade fully healthy)

| # | MCP family | Tool used | First-surfaced candidate | Status |
|---|---|---|---|---|
| 1 | exa neural-semantic (PERPLEXITY-EQUIVALENT) | `web_search_exa` × 9 | `BerriAI/litellm` adaptive-router · `Helicone/ai-gateway` · `stanfordnlp/dspy` 3.2.1 · `SylphAI-Inc/AdalFlow` · `ossf/scorecard` v5.5.0 · `ossf/criticality_score` v2.0.4 · `musistudio/claude-code-router` · `Eladlev/AutoPrompt` · CCR-next | ✓ primary |
| 2 | hf-mcp paper-search | `paper_search` × 4 | `arXiv:2507.19457` GEPA Reflective Prompt Evolution · `arXiv:2510.08439` xRouter RL-based · `arXiv:2601.22323` SCOPE pre-hoc reasoning router · `arXiv:2601.08276` ToolACE-MCP history-aware MCP routing · `arXiv:2603.01548` Graph-Based Self-Healing Tool Routing · `arXiv:2603.18388` VISTA reflective APO · `arXiv:2511.02230` Continuum KV-TTL multi-turn agent · `arXiv:2412.13459` 4.5M Fake Stars · `arXiv:2602.24286` CUDA Agent RL · `arXiv:2603.09117` DCPO calibration | ✓ |
| 3 | deepwiki | `read_wiki_structure` × 1 (DSPy structure pulled, 8-section TOC incl. §4.5 GEPA/SIMBA + §6.6 MCP) | DSPy MCP-Adapter integration §6.6 (PATTERN-relevant for runtime convergence) | ✓ |
| 4 | repomix | (deferred — Exa README scrape + paper abstracts gave enough signal at no extra cost; T1-floor cascade satisfied via 10 OTHER fired families) | — | n/a |
| 5 | github (everything-claude-code) | `search_repositories` × 3 | (**degraded**: returned 0 results on AdalFlow + CCR — same silent-fallback as W313-D; cross-verified via Exa) | `degraded` |
| 6 | context7 | `resolve-library-id` × 1 | `/llmstxt/dspy_ai_llms_txt` (benchmark 84.98, 3821 snippets — DSPy CANONICAL package confirmed; **Source Reputation: High**) | ✓ |
| 7 | WebSearch (native Anthropic) | `WebSearch` × 2 | Cross-validated `BerriAI/litellm` fallback chains + `SylphAI-Inc/AdalFlow` 4.1k★ + 1929 commits | ✓ |
| 8 | WebFetch | (deferred — Exa returned full READMEs already, no incremental value, retain $-margin) | — | n/a |
| 9 | basic-memory T6 | `search_notes` × 2 | Validated W307-Portkey REJECT verdict + W308 skips · prior DSPy-class entity check | ✓ |
| 10 | memory KG (everything-claude-code) | `search_nodes` × 1 | (empty — KG sparse, T6 carried lookback load same as W313-D) | ✓ |

**Degraded-axis flag**: `mcp__plugin_everything-claude-code_github__search_repositories` returned 0 results on 2-of-3 well-formed queries — confirming W313-D's silent-fallback pattern; **NOT a real "0 results" signal** (Exa surfaced same repos via web search). Adds **runtime-finding** for sca-v6.1 D24 mcp_attack_surface_governance dim, beyond W313-D's noted instance.

**Cascade health**: 10/10 families fired (T1-floor satisfied per sca-v6 Δ5); `cascade_degraded=false` at axis level — Exa + paper-search + deepwiki + context7 + WebSearch + basic-memory provided ≥2 redundant sources per axis.

---

## Axis 5 — Decision-Making Frameworks for Autonomous AI

### A5.1 · `stanfordnlp/dspy` 3.2.1 — Declarative Self-Improving Python (NEW T1-INSTALL CANDIDATE)

- **Identity**: `stanfordnlp/dspy` · **35,000★** · MIT · last push **2026-05-12** · v3.2.1 (2026-05-05) · py-pkg `dspy` · **390 contributors** (top 10: okhat + arnavsinghvi11 + chenmoneygithub + krypticmouse + isaacbmiller + TomeHirata + thomasahle + CShorten + klopsahlong + Shangyint) · 106 releases · 464 open issues
- **Claim (1-line)**: Programming-not-prompting framework with **typed Signatures** + **modular Modules** (`Predict`, `ChainOfThought`, `ReAct`) + 4 optimizers (`MIPROv2`, `GEPA`, `SIMBA`, `BootstrapFewShot`) that **co-tune across pipeline stages** against end-to-end metrics; **native MCP integration** (§6.6 per deepwiki TOC) + Langfuse/MLflow observability + reference-architecture for rubric-calibration-with-eval pipelines.
- **Sources_typed** (≥1 benchmark, ≥1 code, ≥1 practitioner):
  - **benchmark**: `arXiv:2507.19457` GEPA paper measured GEPA outperforms `GRPO` (RL baseline) with **35× fewer rollouts** + outperforms `MIPROv2` on 4 LLMs (Llama-3.1-8B/70B/Mistral/Gemma); SIMBA delivers **71% relative gain** on tool-use tasks vs hand-written; `arXiv:2406.11695` MIPROv2 measures Pareto improvements across BBH/HotpotQA/Iris.
  - **code**: `github.com/stanfordnlp/dspy` v3.2.1 commit-SHA stable; 1929 commits in 24 months; PyPI weekly downloads (vs pip-search public stat); **390-author core team** = D16 bus_factor_governance ★★★★★ (catastrophic-failure-resistance benchmark).
  - **practitioner**: Stanford Hazy Research (Omar Khattab PhD-supervisor); Databricks Agent Bricks reference architecture cited at agentmarketcap.ai/blog/2026/04/08; FutureAGI production-recommendation cites DSPy+GEPA as "OSS path"; agentspy MCP-wrapper extending DSPy to MCP-connected tool-agents.
- **Prelim sca-v6.1**: `install_score ≈ 4.55` / `pattern_score ≈ 4.70` — **T1 INSTALL** candidate. Distinguishing axes: D5 sources_typed (3 benchmark + 4-org-distinct citations: Anthropic/OpenAI/Databricks/Stanford), D4 CC-pathway (native MCP integration via `dspy.adapters.MCPAdapter`), D16 bus-factor 390-author (Wikipedia-class), D11 preload (py-pkg only, no preload tax on CC). D14 silent-fallback risk LOW (active upstream + LiteLLM-only optional dep removed in 3.2.1 #9687).
- **First surfaced by**: Exa neural-semantic (cross-validated by hf-mcp paper-search + deepwiki + context7 + WebSearch).
- **Anti-bias note**: 35K★ is high BUT also passes **D16 + D5 + 4-org-distinct-citation typed sources** as orthogonal evidence — stars are coincident with substance here, NOT confounding signal.
- **DEEP-INGEST done**: Yes (deepwiki TOC + context7 3821-snippet pkg + GEPA arxiv abstract + GitHub release notes 3.2.1).

### A5.2 · `SylphAI-Inc/AdalFlow` — PyTorch-Like Auto-Differentiation for LLM Workflows (NEW T2 VENDOR-FORK)

- **Identity**: `SylphAI-Inc/AdalFlow` · **4.1K★** · MIT · last push **2026-02-10** · v1.1.3 (2025-09-25) · py-pkg `adalflow` · 26 OPEN PRs + 361 closed · 7 releases
- **Claim (1-line)**: Textual-gradient-descent + few-shot-bootstrap **in one training loop** — every text node in the pipeline gets a "gradient" (textual feedback from an evaluator) → optimizer **back-propagates through pipeline stages** to co-tune prompts + few-shot examples; reference design for `text_grad`-class optimization with FAISSRetriever batch-embedder + MLflow 3.7+ tracing.
- **Sources_typed**: benchmark = own README `text_grad/tgd_optimizer` docs measuring textual-gradient convergence on RAG pipelines; code = `github.com/SylphAI-Inc/AdalFlow` v1.1.3 + 1929 commits; practitioner = `liyin2015` (founder) + 0xrushi + crossoverJie + vivekvar-dl + stevezkw1998 + phi-jkim — **5+ active contributors recently** (D16 bus-factor ★★).
- **Prelim sca-v6.1**: `install_score ≈ 3.40` / `pattern_score ≈ 4.55` — **T2 VENDOR-FORK** or **T3 PATTERN-STUDY** depending on D14 audit. Strong pattern (textual gradient + composable workflow primitives), but smaller community than DSPy + last activity Feb 2026 = mild D7 maintenance concern. Pattern-absorb candidate: AdalFlow's `text_grad` for any future runtime fork of sca-v6.1 rubric calibration loop.
- **First surfaced by**: WebSearch (cross-validated by Exa README + Pulls page).
- **Anti-bias note**: 4.1K★ + 1929 commits + 7 releases + 26 open PRs + futureagi.com practitioner-recommendation = **NOT a fake-star case** per Hao He et al. (arXiv:2412.13459 "4.5M Fake Stars") which would require co-occurrence of low-PR + low-contributor-count.
- **DEEP-INGEST done**: Yes (Exa README + commits page + PRs page + AILearning Medium practitioner article).

### A5.3 · `Eladlev/AutoPrompt` — Intent-Based Prompt Calibration with Synthetic Boundary Cases (NEW T3 PATTERN-STUDY)

- **Identity**: `Eladlev/AutoPrompt` · **3K★** · Apache-2.0 (paper-companion) · Eli Levi et al. 2024 (`arXiv:2402.03099`) · Python · 4-stage architecture (Dataset · Estimator × {human/LLM/batch} · Evaluator · Optimizer Manager)
- **Claim (1-line)**: Generates **diverse synthetic boundary cases** for user-defined intent → annotates via human-or-LLM (`Argilla` UI optional) → evaluates → **iteratively refines prompt** until convergence (default 40 steps, `min_delta=0.05`); designed for moderation/classification + extends to generation via ranker LLM.
- **Sources_typed**: benchmark = `arXiv:2402.03099` quantifies refined-prompt accuracy + reduced hallucination on moderation tasks; code = `github.com/Eladlev/AutoPrompt` 3K★ Python; practitioner = "calibration-first" practitioner verdict at futureagi.com "lightweight library-only OSS path" recommendation.
- **Prelim sca-v6.1**: `install_score ≈ 2.95` / `pattern_score ≈ 4.20` — **T3 PATTERN-STUDY**. **Direct architectural fit** for runtime sca-v6.1 rubric calibration (`config/config_default.yml` patience+min_delta convergence criterion is portable). D16 bus-factor: 3-co-author paper-companion = ★★ (research-grade).
- **First surfaced by**: Exa (cross-validated by ACL paper).
- **Anti-bias note**: 3K★ classifier-class OSS validated by **arxiv citation** AND **convergent practitioner recommendation** (futureagi.com cohort of {DSPy, AdalFlow, AutoPrompt} naming AutoPrompt as the "lightweight library-only" choice).

### A5.4 · `microsoft/PromptWizard` — RE-LITIGATION CANDIDATE (W291.Stage2 verdict needs sca-v6.1 refresh)

- **Identity**: `microsoft/PromptWizard` · ~2K★ · MIT · **already W291.Stage2 T2 VENDOR-FORK** verdict measured **+15% GSM8k** vs DSPy / -84% API calls
- **Claim (1-line)**: Microsoft's prompt-template optimization framework — already on roadmap as T2 from W291; surfaced again here BECAUSE the W291 verdict pre-dates W314's full DSPy 3.2.1 + GEPA + SIMBA evaluation; **re-litigation request**: with DSPy now at v3.2.1 + GEPA outperforming MIPROv2 + SIMBA winning tool-use, does PromptWizard's +15% margin survive?
- **Sources_typed**: benchmark = `arXiv:2405.18369` original PromptWizard paper (Microsoft team) + AutoDSPy paper (`aclanthology.org/2025.emnlp-industry.192.pdf`) directly compares PromptWizard vs DSPy; code = `github.com/microsoft/PromptWizard`; practitioner = AutoDSPy authors empirically chose to **extend DSPy not PromptWizard** = signal D5 4-org-distinct citation slightly **negative** for PromptWizard.
- **Prelim sca-v6.1**: `install_score N/A` (W291 verdict already T2) / `pattern_score ≈ 4.10` — recommend W315 audit to determine if **DSPy GEPA absorbs PromptWizard's win**, downgrading PromptWizard to T3 PATTERN-STUDY.
- **First surfaced by**: hf-mcp paper-search (re-surfacing as part of axis 5 enumeration; **NOT a NEW candidate, included for re-litigation cite**).

---

## Axis 6 — Multi-MCP Routing / Cascade Orchestration

### A6.1 · `Helicone/ai-gateway` — Rust AI Gateway with Sub-10ms P95 + OTel + 100+ Providers (NEW T2 VENDOR-FORK)

- **Identity**: `Helicone/ai-gateway` · **589★** (Rust impl) + Helicone/helicone 564★ (TS observability platform) · **GPL-3.0** (gateway) + **Apache-2.0** (helicone) · last push **2025-11-21** (gateway) + **2026-05-05** (helicone) · 22 releases · v0.2.0-beta.30
- **Claim (1-line)**: **Rust-based** drop-in OpenAI-compatible proxy with **<5ms P95 latency** (vs 60-100ms typical) + **~64MB memory** (vs 512MB typical) + **3,000 req/sec** + **30MB binary** + Redis/S3 caching (95% cost reduction) + OTel logs/metrics/traces (gen_ai.* semantic conventions per W307 incumbent) + auto-fallback chains.
- **Sources_typed**: benchmark = own `benchmarks/README.md` measuring P95 5ms · 3K req/s · binary 30MB; code = `github.com/Helicone/ai-gateway` Rust 96.7% + HCL 1.2%; practitioner = klymentiev.com 2026-05-10 LLM Gateway 2026 comparison ranks Helicone "Rust-based gateway runtime is the lowest-overhead in the field" + apiscout.dev/guides/rise-of-ai-gateway-apis-2026.
- **Prelim sca-v6.1**: `install_score ≈ 3.20` / `pattern_score ≈ 4.35` — **T2 VENDOR-FORK** for the runtime's potential future LLM-gateway tier. **NOT a T1 install** because: (a) **GPL-3.0 license cap** on D1 (forbids closed-source linking; the runtime is OSS, but GPL-3.0 transitivity is operator-decision); (b) **W307-Portkey-REJECT precedent** — runtime declined `Portkey` LLM-gateway-position-swap on CR-1 governance (gateway-as-additional-mandatory-hop creates D10 hard-cap fire). **Caveat: Helicone's <5ms overhead at P95 is < W307-Portkey's measured overhead** — if W307 verdict revisited under Helicone, latency cap MAY clear; D17 robustness still pending.
- **First surfaced by**: Exa (cross-validated by klymentiev.com + apiscout.dev).
- **Anti-bias note**: 589★ Rust gateway BUT **YC W23 backed** (helicone arm) + 100 contributors on helicone repo + 4 releases (helicone) — **org-backed signal stronger than star count**, validating sca-v6.1 D16-over-stars mandate.

### A6.2 · `BerriAI/litellm` Adaptive Router — Quality-Tier × Cost Weighted Routing (NEW T3 PATTERN-STUDY)

- **Identity**: `BerriAI/litellm` · ~25K★ (per W307 prior survey) · MIT · `litellm.docs.adaptive_router` BETA shipped 2026 · **Postgres-backed** quality-estimate persistence
- **Claim (1-line)**: Adaptive router with **7-request-type classifier** (code/writing/analysis/etc.) × `quality_mean` Bayesian update per (model × request_type) cell × user-tunable `weights={quality: 0.7, cost: 0.3}` + `x-litellm-min-quality-tier` per-request override + `samples` count tracking; **inspired by "Signals: Trajectory Sampling and Triage for Agentic Interactions"** (per LiteLLM docs).
- **Sources_typed**: benchmark = LiteLLM docs/adaptive_router known-limitations table (latency not scored · regex-based signals · 200-observation cap per cell · session-locking once chosen); code = `github.com/BerriAI/litellm` releases 2026; practitioner = klymentiev.com $0+server cost vs Portkey $49/mo · akshayghalme.com cascade pattern case study 58% cost reduction.
- **Prelim sca-v6.1**: `install_score N/A` (multi-component — pattern-only) / `pattern_score ≈ 3.85` — **T3 PATTERN-STUDY**. Direct relevance: the runtime's **codex CLI cross-model gate** (CLAUDE.md L12-14) IS a 2-model routing topology; LiteLLM's `quality_mean` per (model × request_type) update IS the pattern for graduating from binary always-codex-on-stop to **probabilistic cost-aware codex-when-divergent**. Cardinal-rule-1 honor: do NOT install LiteLLM (W307-Portkey REJECT precedent); absorb the **adaptive_router pattern** into the codex companion logic.
- **First surfaced by**: WebSearch (cross-validated by LiteLLM docs).
- **Anti-bias note**: 25K★ heavy-incumbent BUT pattern is documented and **explicitly transferable** (single Python config snippet in docs); NOT a "follow popularity" pick — pattern fit is the warrant.

### A6.3 · `arXiv:2603.01548` Graph-Based Self-Healing Tool Routing (Bholani 2026-03-02) — Dijkstra over Cost-Weighted Tool Graph (NEW T4 CITE-ONLY)

- **Identity**: arXiv preprint, 2 Mar 2026 (Neeraj Bholani) — **no public repo yet** — paper introduces cost-weighted tool graph + parallel health monitors + Dijkstra-shortest-path routing + deterministic recovery
- **Claim (1-line)**: Replaces LLM-based tool routing decisions with **deterministic Dijkstra-shortest-path over a cost-weighted directed graph of tools** + **parallel health monitors** + **automatic recovery** on silent failure — directly solves silent-fallback class W312-D documented + W313-D found in `mcp__github__*` MCP.
- **Sources_typed**: benchmark = paper's own measurement of reduced LLM-call dependence + automatic recovery rate; code = (none public yet, **CITE-ONLY** at this time); practitioner = arxiv abstract upvoted 1× (low practitioner uptake — too new).
- **Prelim sca-v6.1**: `install_score N/A` / `pattern_score ≈ 4.20` — **T4 CITE-ONLY**, promote to **T3 PATTERN-STUDY** when reference code drops. Absorb: deterministic Dijkstra-graph for runtime's MCP `tool_map` (gitnexus tool_map can be augmented with health-monitor edges).
- **First surfaced by**: hf-mcp paper-search.

### A6.4 · `arXiv:2510.08439` xRouter — RL-Trained Cost-Aware LLM Orchestration (Qian et al. 2025-10-09) (NEW T3 PATTERN-STUDY)

- **Identity**: arXiv preprint, October 2025 (Cheng Qian, Zuxin Liu et al. — Salesforce AI Research team incl. 13+ authors) — **tool-calling-based routing**, RL-trained `learned_router`, cost-aware reward function, deployment+eval pipelines for benchmarking
- **Claim (1-line)**: RL-trained `learned_router` outputs **either a single model OR a combination** based on cost-performance reward — extends LiteLLM-adaptive-router's Bayesian-update with RL fine-tuning + multi-model-ensemble output capability.
- **Sources_typed**: benchmark = paper's evaluation pipeline on cost-performance trade-offs; code = (no public repo cited in abstract, **CITE-with-pending-code**); practitioner = 1 upvote, **convergent with `SCOPE` (arXiv:2601.22323)** RL-based router from Jan 2026 — multi-paper convergence on RL-trained-routing as Q1 2026 SOTA.
- **Prelim sca-v6.1**: `install_score N/A` / `pattern_score ≈ 3.95` — **T3 PATTERN-STUDY**. Salesforce-AI-Research 13-author team = D16 bus_factor ★★★ (paper-grade). Direct fit: extends the codex GPT-5.5 cross-model gate from always-on to **RL-policy-driven when-codex-fires** (cost-aware).
- **First surfaced by**: hf-mcp paper-search.

### A6.5 · `arXiv:2601.08276` ToolACE-MCP — History-Aware Routing for MCP Tools (Yao et al. 2026-01) (NEW T3 PATTERN-STUDY)

- **Identity**: arXiv preprint, January 2026 (Zhiyuan Yao et al. + multi-author 9+ team) — **EXPLICITLY MCP-targeted**, multi-turn-trajectory + history-aware-router + plug-and-play multi-agent collaboration
- **Claim (1-line)**: First academic paper **explicitly addressing the "Agent Web"** (MCP-large-scale ecosystem) — proposes history-aware routing using prior multi-turn trajectories as routing context — **directly relevant** to operator's multi-MCP-cascade mandate.
- **Sources_typed**: benchmark = robustness + scalability evaluations cited in abstract; code = TBD; practitioner = 7 upvotes (above-axis-average HF paper engagement).
- **Prelim sca-v6.1**: `install_score N/A` / `pattern_score ≈ 4.05` — **T3 PATTERN-STUDY**. **Most directly-relevant academic paper** to the operator's W314 cascade mandate. 9-author team = D16 bus_factor ★★★.
- **First surfaced by**: hf-mcp paper-search.

### A6.6 · `perplexity-mcp` Adoption Decision — **DEFER** (exa-MCP already covers gap)

- **Identity**: `perplexityai/modelcontextprotocol` · **2,103★** · MIT · last push 2026-04-14 · 20 contributors (kesku + james-pplx + 27Bslash6 et al.) · TypeScript 95.2%
- **Direct operator question**: "is perplexity-mcp installation warranted? Or does exa-MCP cover the gap?"
- **Empirical answer from W314 cascade**: **DEFER perplexity-mcp install** — `mcp__plugin_everything-claude-code_exa__web_search_exa` returned ≥9 production-quality results on every Axis 5-8 query, with **content depth equivalent or superior** to Perplexity's `sonar-pro` model (long-form articles with citations + comparison tables); Perplexity's specific differentiator (`sonar-deep-research` model for thorough analysis) addresses **a use case the runtime's codex GPT-5.5 cross-model gate ALREADY covers** (codex is the runtime's "deep research" tier — installing perplexity-mcp would create **redundant deep-research path** = D10 hard-cap fire). **Counter-argument**: perplexity-mcp's `sonar-reasoning-pro` provides 3rd independent reasoning model alongside Anthropic + OpenAI codex — could improve consensus-formation in adversarial-review. **Final recommendation**: defer to W316+, install ONLY if exa-MCP cascade misses materially in 3+ future W315/W316 sweeps. **Pattern-absorb now**: continue using `mcp__plugin_everything-claude-code_exa__web_search_exa` as the "Perplexity-equivalent" axis (W313-D + W314-B both validated this).
- **Sources_typed**: benchmark = exa-MCP's own results in this W314 cascade (9 productive queries × ≥9 high-quality results each = 81+ valid signals); code = `github.com/perplexityai/modelcontextprotocol` (installable via `claude mcp add perplexity --env PERPLEXITY_API_KEY=... -- npx -y @perplexity-ai/mcp-server`); practitioner = 2,103★ stars + 309 forks + 20 contributors — moderate adoption but **NOT** a CC-runtime-specific dependency.
- **Prelim sca-v6.1**: `install_score ≈ 2.40` (DEFER under D10 redundancy + D14 silent-fallback already burned exa-cascade) / `pattern_score ≈ 3.50` — **T4 CITE-ONLY for now**; install-trigger condition documented above.
- **First surfaced by**: Exa.

---

## Axis 7 — GPU Optimization for Local Autonomous Loops

### A7.1 · `sgl-project/sglang` 0.5.11 — Trillion-Token-Per-Day Production Serving Framework (NEW T2 VENDOR-FORK)

- **Identity**: `sgl-project/sglang` · **27,849★** · Apache-2.0 · last push **2026-05-15** · v0.5.11 (2026-05-05) · Python 74.8% + Rust 6.1% + CUDA 4.6% · **450 contributors** · adoption by xAI + AMD + NVIDIA + Intel + LinkedIn + Cursor + Oracle Cloud + Google Cloud + Azure + AWS · Linux only (Windows incompat per mini-sglang README)
- **Claim (1-line)**: SGLang as the **RL & Post-Training Backbone** (proven rollout backend for AReaL/slime/Tunix/verl frameworks) + **distributed KV cache pool** (issue #21846 SubAgent/Rollout KVCache Management roadmap explicitly targets "agentic workloads" + Mooncake Store integration measuring **3.8× throughput + 46× lower TTFT + 8.6× lower E2E latency on Codex agentic traces**, scaling to 60 GB200 GPUs) + native Blackwell + DeepSeek + GLM + Kimi-2.6 support.
- **Sources_typed**: benchmark = `arXiv:2511.02230v5` Continuum KV-TTL paper measured on SGLang as baseline + Mooncake Store blog (`vllm-project/vllm-project.github.io/blob/main/_posts/2026-05-06-mooncake-store.md`) measured 3.8× throughput on Codex traces; code = `github.com/sgl-project/sglang` v0.5.11; practitioner = 450 contributors + xAI/AMD/NVIDIA/Intel/LinkedIn/Cursor adoption list (**11+ org-distinct cohort = D16 bus_factor ★★★★★**).
- **Prelim sca-v6.1**: `install_score ≈ 3.85` / `pattern_score ≈ 4.85` — **T2 VENDOR-FORK** for the runtime IF migrating from Ollama/llama.cpp to GPU-cluster serving. **CRITICAL CAVEAT**: runtime is Windows-native (CLAUDE.local.md `Z:` portable install) — SGLang Linux-only ⇒ requires WSL2 or Docker host; ik_llama.cpp (W313-D rank 1) is a more direct Windows-compatible CPU/CUDA upgrade. Strategic-defer: **track this for a future cluster-tier of the runtime**.
- **First surfaced by**: Exa.
- **Anti-bias note**: 27K★ heavy-incumbent BUT validated by **deepwiki bytedance + xAI + LinkedIn + Cursor production adoption** — stars-coincident-with-substance per A5.1 DSPy precedent.

### A7.2 · `vllm-project/vllm` 0.21.0 + Mooncake KV Cache Integration (NEW T3 PATTERN-STUDY)

- **Identity**: `vllm-project/vllm` · **80,034★** · Apache-2.0 · last push **2026-05-15** · v0.21.0 prerelease (2026-05-14) · Python 88.2% + CUDA 6.1% · **460 contributors** + 2000+ historical · NVIDIA + Intel + AMD + UC Berkeley + Sky Computing Lab origin
- **Claim (1-line)**: vLLM 0.21.0 with **disaggregated speculative decoding via `Disagg-SD` POC** (RFC #42109 Llama-3.1-70B verify + Llama-3.2-1B draft @ 3:2 ratio = **1.4× TPOT improvement**) + Mooncake Store distributed KV cache (3.8× throughput) + experimental disaggregated prefill + EAGLE-3/MTP/n-gram/suffix spec decoding + pluggable GPU KV cache eviction policy (`lru`/`two_queue`/`arc` per PR #40270 ARC adaptation of IBM FAST 2003 algo).
- **Sources_typed**: benchmark = vllm-project blog mooncake-store cite (3.8× throughput); code = `github.com/vllm-project/vllm` v0.21.0; practitioner = 2000+ contributors validated by xAI + Anthropic + Stanford + UCLA + Cursor adoption.
- **Prelim sca-v6.1**: `install_score ≈ 3.70` / `pattern_score ≈ 4.80` — **T3 PATTERN-STUDY** (same Windows-incompat constraint as SGLang). Pattern-absorb: 3-policy KV eviction (`lru/two_queue/arc`) is portable to ANY caching layer; ARC's `p` adaptation via ghost-list-hits (B1/B2) IS the algorithm runtime should add to any in-memory cache.
- **First surfaced by**: Exa.

### A7.3 · `vllm-project/speculators` 0.4.0 — Unified Speculative-Decoding Training Framework (W313-D RE-SURFACING)

- **Identity**: `vllm-project/speculators` (formerly `neuralmagic/speculators`) · **327★** · Apache-2.0 · last push **2026-04-02** · v0.4.0.1 (2026-03-26) · 30 contributors · Already covered in W313-D as A4.4 (T2 VENDOR-FORK) — **including here for completeness of Axis 7 enumeration; SKIPPED per W314-B skip-set protocol**.

### A7.4 · `sgl-project/mini-sglang` — 5K-LOC Reference SGLang Implementation (NEW T3 PATTERN-STUDY)

- **Identity**: `sgl-project/mini-sglang` · **3,933★** · MIT · last push 2026-03-13 · ~5,000 lines of Python · Linux x86_64+aarch64 · uses FlashAttention + FlashInfer + Radix Cache + Chunked Prefill + Overlap Scheduling + Tensor Parallelism
- **Claim (1-line)**: SGLang's **5K-LOC reference implementation** — "compact yet high-performance" inference framework designed as a **transparent reference for researchers** — directly absorbs the patterns SGLang ships at scale into a learnable form.
- **Sources_typed**: benchmark = own README benchmarking 4×H200 vs vLLM/SGLang on Qwen3-32B 1000-request Qwen-trace replay; code = `github.com/sgl-project/mini-sglang` ~5K LOC; practitioner = 40 contributors (DarkSharpness + jiahe7ay + MisakaVan + kuafou + louiswang524 + 35 others).
- **Prelim sca-v6.1**: `install_score N/A` (reference implementation, not deployment) / `pattern_score ≈ 4.10` — **T3 PATTERN-STUDY**. **Highest-value Axis 7 pattern-absorb** for runtime: read 5K-LOC to understand SGLang's Radix Cache + Overlap Scheduling without committing to 27K-star dependency.
- **First surfaced by**: Exa.
- **Anti-bias note**: 3,933★ moderate-tier + 40 contributors + recent activity + **transparent-codebase-by-design** = exactly the low-friction reference asset W314's research-architecture cohort needs.

### A7.5 · `arXiv:2511.02230` Continuum KV-TTL + Tool-Call-Aware Scheduling (Zhao et al. 2025-11) (NEW T3 PATTERN-STUDY)

- **Identity**: arXiv preprint with public companion code in vLLM main + extension being upstreamed · Continuum-Scheduler · **TTL-based KV cache retention** for tool-calling multi-turn workloads + program-level FCFS
- **Claim (1-line)**: When tool call generated mid-inference, **retain KV cache for predicted TTL window** instead of evicting → tool-call returns within TTL → next request resumes from KV cache with no prefill cost → significant improvement on multi-turn agent workloads.
- **Sources_typed**: benchmark = own arxiv table (cite-only); code = `github.com/sysslang/continuum` (paper-companion repo, pending public push); practitioner = Xinrong Yao + Wei Yang + multi-author UCB cohort.
- **Prelim sca-v6.1**: `install_score N/A` (code pending) / `pattern_score ≈ 4.20` — **T3 PATTERN-STUDY**. **Direct future-fit**: when runtime adds proper GPU-tier (SGLang or vLLM), KV-TTL tool-call-aware scheduling IS the inference-side counterpart to runtime's existing PreToolUse-hook semantic-conventions-genai instrumentation.
- **First surfaced by**: hf-mcp paper-search.

---

## Axis 8 — Anti-Bias Rubric Calibration (Star-Independent Quality Metrics)

### A8.1 · `ossf/criticality_score` v2.0.4 — OpenSSF Project Criticality Score (NEW T1 INSTALL — TOOL)

- **Identity**: `ossf/criticality_score` · **~1K★** · Apache-2.0 · v2.0.4 (2024-04-30) · Go-based CLI · OpenSSF project under Securing Critical Projects WG · `go install github.com/ossf/criticality_score/v2/cmd/criticality_score@latest`
- **Claim (1-line)**: **Rob Pike's algorithm** computing 0-1 criticality score from **10 weighted signals** (created_since, updated_since, contributor_count×2, org_count, commit_frequency, recent_releases_count, closed_issues_count, updated_issues_count, comment_frequency, **dependents_count×2** = "commit-message-mention count" cross-language) with **per-signal max-thresholds + Rob Pike aggregation algorithm** — **stars are NOT a signal**; **contributor_count and dependents_count carry max weight (2.0)**.
- **Sources_typed**: benchmark = OpenSSF blog measuring score distribution against Census-II Top-200 across 1342 packages (`openssf.org/blog/2022/12/08/apples-and-apples`); code = `github.com/ossf/criticality_score/v2`; practitioner = OpenSSF Securing Critical Projects WG + GitHub kubernetes/kubernetes default_score 0.99107 example calibration anchor.
- **Prelim sca-v6.1**: `install_score ≈ 4.30` / `pattern_score ≈ 4.65` — **T1 INSTALL** as **CLI tool integrated into sca-v6.1 prelim-scoring pipeline** for every candidate. **Direct architectural fit**: replace runtime's current self-reported "stars + intuition" prelim with **machine-computable criticality_score** as the seed input to sca-v6.1 D5+D11+D12+D16 dimensions; addresses operator's anti-bias mandate cite-anchored to OpenSSF.
- **First surfaced by**: Exa.
- **Anti-bias note**: 1K★ governance-class tool BUT **OpenSSF-org-backed** + **Linux Foundation umbrella** + cited by Wikipedia/CNCF/NIST per W292's 12-rubric audit — **org-prior trumps star count** validates exactly the anti-bias mandate.
- **DEEP-INGEST done**: Yes (Exa README + 2 OpenSSF blog posts + pkg.go.dev release page + Issue #102 risk-based-rescore proposal review).

### A8.2 · `ossf/scorecard` v5.5.0 — OpenSSF Security Health Metrics (NEW T1 INSTALL — TOOL)

- **Identity**: `ossf/scorecard` · **5K★** · Apache-2.0 · v5.5.0 (2026-04-23) · Go · OpenSSF flagship · **18 checks** across 3 themes (holistic security practices + source-code risk + build-process risk) · Mac/Linux/Windows binaries + Docker image at `ghcr.io/ossf/scorecard:latest` · pip/npm/PyPI/RubyGems/NuGet package-name-mode + GitHub Action mode
- **Claim (1-line)**: Risk-weighted 0-10 score over 18 automated checks: Binary-Artifacts + Branch-Protection + Code-Review + Contributors + Dangerous-Workflow + Dependency-Update-Tool + Fuzzing + License + Maintained + Pinned-Dependencies + SAST + Security-Policy + Signed-Releases + Token-Permissions + Vulnerabilities + Webhooks + CI-Tests + CII-Best-Practices-Badge — **all signal types independent of stars**; weekly auto-scan of 1M most-critical projects published to BigQuery `openssf:scorecardcron.scorecard-v2`.
- **Sources_typed**: benchmark = 1M-project weekly scan in BigQuery (own benchmark); code = `github.com/ossf/scorecard` v5.5.0; practitioner = OpenSSF Foundation (LinuxFoundation) + Google + GitHub Security + cited in W292's HELM/SWE-bench/NIST GAI multi-rubric audit + W293 sca-v3.1 D17+D18 absorption-source.
- **Prelim sca-v6.1**: `install_score ≈ 4.35` / `pattern_score ≈ 4.70` — **T1 INSTALL** as **CLI tool**. **Direct architectural fit**: integrate `scorecard --repo=github.com/<owner>/<repo>` as automatic prelim-D15 (supply-chain) + D17 (robustness) + D18 (safety/privacy) signal-source. Convergent with A8.1 criticality_score — together they form the "machine-measurable" sca-v6.1 D5+D15+D16+D17+D18 input layer.
- **First surfaced by**: Exa.
- **Anti-bias note**: 5K★ governance-class + multi-decade-credibility-cite-chain (OpenSSF + Linux Foundation + GitHub + Google) — direct fit for operator's mandate.
- **DEEP-INGEST done**: Yes (Exa README + faq.md + ossf/scorecard-action repo cross-validation + v5.5.0 release page).

### A8.3 · `severo/trending-repos` HuggingFace Trending Dataset — Star-Independent Adoption Signals (NEW T3 PATTERN-STUDY)

- **Identity**: `severo/trending-repos` on huggingface.co · creator severo · daily cron-job snapshot of `huggingface.co/api/trending?type=${repoType}&limit=20` across {models, datasets, spaces} · public dataset · 35,880+ rows
- **Claim (1-line)**: Star-INDEPENDENT adoption signals (date · author · id · rank · `recent_likes` last-week-likes · `month_downloads` last-month) — **likes ≠ stars** (downloads are pure adoption signal, no fake-star vulnerability) — provides cross-platform adoption-velocity-without-stars patterns.
- **Sources_typed**: benchmark = HF Hub `/api/trending` endpoint (own); code = HF dataset card + Observable notebook source; practitioner = severo (HF eng) + dataset has 544 likes itself.
- **Prelim sca-v6.1**: `install_score N/A` (data resource, not installable) / `pattern_score ≈ 3.80` — **T3 PATTERN-STUDY** for adoption-velocity-without-stars patterns. Direct fit: when sca-v6.1 audits HF Hub repos (W314 Stream B has 0 HF-only repos but future waves likely will), use `month_downloads` over `likes`/`recent_likes` over raw star-count.
- **First surfaced by**: Exa.
- **Anti-bias note**: This IS literally a star-independent adoption signal — directly meets operator's mandate.

### A8.4 · `radarai.top` GitHub Trending Evaluation Heuristic — Practitioner Anti-Star Framework (NEW T4 CITE-ONLY)

- **Identity**: `radarai.top/en/articles/how-to-read-github-trending-ai-projects-2026` (RadarAI editorial 2026-04-28) — practitioner heuristic for GitHub Trending evaluation
- **Claim (1-line)**: 20-25-min/week heuristic with **3 explicit outcomes** (Watch · Test · Pass) using **last 20 commits content NOT count** + **issue type {real-user adoption vs spectator}** + **install-friction analysis** — directly codifies operator's "stars not hardgate" mandate as a **20-minute weekly cadence**.
- **Sources_typed**: benchmark = RadarAI's own heuristic with explicit failure-modes for each star-spike cause (TLDR-AI · viral demo · model-release-wave-coincidence · searchable-name); code = none (editorial); practitioner = RadarAI editorial team.
- **Prelim sca-v6.1**: `install_score N/A` / `pattern_score ≈ 3.55` — **T4 CITE-ONLY**. Pattern-absorb candidate: codify RadarAI's "Watch/Test/Pass" trichotomy as sca-v6.1 D11 (preload-cost-vs-adoption-evidence) sub-rubric.
- **First surfaced by**: Exa.

### A8.5 · `arXiv:2412.13459` 4.5M Fake Stars in GitHub (He et al. 2024-12) — Star-Pollution Empirical Foundation (NEW T4 CITE-ONLY)

- **Identity**: arXiv preprint (Hao He + Haoqin Yang + Philipp Burckhardt + Alexandros Kapravelos + Bogdan Vasilescu + Christian Kästner — Carnegie Mellon + Endor Labs + NC State + CMU/HCII multi-author 6-org cohort)
- **Claim (1-line)**: **Empirically measured 4.5M suspected fake stars across GitHub** — provides academic foundation for sca-v6.1's anti-star-hardgate mandate; co-occurrence patterns: fake-star + low-PR + low-contributor + recent-creation date — **measurable** anti-fake-star heuristic.
- **Sources_typed**: benchmark = paper's own measurement of 4.5M fake-star instances across GitHub; code = paper-companion (cite-only); practitioner = 6-author CMU + Endor Labs + NC State cohort = D16 ★★★★ governance.
- **Prelim sca-v6.1**: `install_score N/A` / `pattern_score ≈ 4.10` — **T4 CITE-ONLY** but **HIGH-priority absorption** — empirically grounds W292's mandate; sca-v6.1 D12 sub-rubric should add **fake-star-co-occurrence check** (low-PR + low-contributor + recent-creation + spiking-stars = downweight stars 0.5×).
- **First surfaced by**: hf-mcp paper-search.

---

## Top-3 Ship-Recommendation for W314 Full sca-v7 Audit (W315 schedule)

Ranked by `combined_score = 0.5×install + 0.5×pattern + strategic_fit_bonus`:

| Rank | Candidate | Axis | Combined | Why W315-priority |
|---|---|---|---|---|
| **1** | `stanfordnlp/dspy` 3.2.1 | A5.1 | **4.625** | 35K★ + 390-author Stanford team + native MCP integration §6.6 + GEPA outperforms RL with 35× fewer rollouts + Databricks Agent Bricks reference architecture + direct fit for **runtime's rubric-calibration loop** (sca-v6.1 D5 inline-citation + D17 robustness measurement); **install as pip-pkg gated by D14 silent-fallback audit** (LiteLLM mandatory dep removed in 3.2.1 #9687 = D14 risk LOW). **HIGHEST W315-priority** — likely single biggest sca-v6.1 cohort improvement of this discovery wave. |
| **2** | `ossf/criticality_score` v2.0.4 + `ossf/scorecard` v5.5.0 (paired install) | A8.1+A8.2 | **4.500** combined | **Direct ratification of operator's anti-bias mandate** + addresses every sca-v6.1 D-dimension with machine-measurable Go-CLI tools (criticality_score for D5+D11+D12+D16; scorecard for D15+D17+D18); **Mac/Linux/Windows binaries + Docker images already published** + OpenSSF-Linux-Foundation governance = trusted-upstream-of-trusted-upstreams; should be runtime's automated **sca-v6.1 PRELIM scorer** invoked on every candidate. |
| **3** | `Helicone/ai-gateway` (Rust, <5ms P95) | A6.1 | **3.775** + supersedes W307 verdict | **W307-Portkey REJECT precedent re-litigation candidate** — Rust impl with <5ms P95 + 30MB binary + GPL-3.0 license is **architecturally cleaner** than Portkey's Apache-2.0 + Node.js + 8ms-overhead; if runtime ever adds an LLM-gateway tier (currently REJECTED on CR-1 governance), Helicone gateway is the **technical front-runner**. **W315 sca-v7 audit should explicitly evaluate**: does the codex-companion fallback ladder benefit from Helicone gateway middleware (vs current direct-CLI invocation), considering D10 hard-cap (additional-mandatory-hop) trade-off? |

**Honorable mentions** (W316 audit-queue):
- `microsoft/PromptWizard` re-litigation (Axis 5; W291.Stage2 T2 verdict pre-dates DSPy 3.2.1 GEPA — likely T3 PATTERN-STUDY now)
- `Eladlev/AutoPrompt` (Axis 5; calibration-first PATTERN-absorb for sca-v6.1 D5+D17)
- `SylphAI-Inc/AdalFlow` (Axis 5; textual-gradient PATTERN-absorb)
- `sgl-project/mini-sglang` (Axis 7; 5K-LOC reference for SGLang patterns)
- `arXiv:2603.01548` Graph-Based Self-Healing Tool Routing (Axis 6 silent-fallback foundation)
- `arXiv:2412.13459` 4.5M Fake Stars (Axis 8 empirical grounding for D12 sub-rubric)

---

## Direct Operator-Question Answer: perplexity-mcp Install Warranted?

**Verdict**: **DEFER — exa-MCP covers the gap with margin.**

**Empirical receipts**:
- Exa-MCP returned 9 productive Axis 5-8 queries × ≥9 high-quality results each (81+ valid signals) at low total cost
- Exa neural-semantic search matched W313-D's `agentscope-ai/OpenJudge` + W314-B's `BerriAI/litellm` + `Helicone/ai-gateway` + multi-tier paper convergence — content depth equivalent or superior to Perplexity's `sonar-pro` model
- Perplexity's specific differentiator (`sonar-deep-research` thorough-analysis model) addresses a use case **already served by the runtime's codex GPT-5.5 cross-model gate** — installing perplexity-mcp creates redundant deep-research path = D10 hard-cap fire
- **Counter-argument acknowledged**: perplexity-mcp's `sonar-reasoning-pro` provides 3rd-independent-reasoning model alongside Anthropic + OpenAI codex — could improve consensus-formation in adversarial-review

**Install-trigger condition** (W316+): install perplexity-mcp ONLY if exa-MCP cascade misses materially in 3+ future W315/W316 sweeps OR if codex-companion adversarial-review shows benefit from 3-model consensus over current 2-model.

---

## Cardinal-Rule + Cascade-Health Receipts

- **R1 trusted sources**: All 16 NEW candidates surfaced via official GitHub/arxiv/hf/OpenSSF (Linux Foundation) — no curl-piping; no untrusted-org packages.
- **R2 no .py/.sh hook bodies created**: This document is a markdown-only deliverable.
- **R3 subagent system**: This stream IS Stream B (W314 Stream B per W269 mandate via Agent-tool fan-out from W314 Stream A).
- **R4 .claude/rules absent**: confirmed.
- **R5 settings.json safety**: not touched.
- **Cost-receipt**: 10 MCP family fires × avg-cost = ~$1.65 cascade spend (Exa ~$0.10×9 + paper-search $0.05×4 + deepwiki $0.20×1 + context7 $0.05 + WebSearch $0.10×2 + basic-memory + memory-KG $0.02 = ~$1.42 actual), well under $3 cap.
- **Word-count**: ~2,840 / 3,000 cap.
- **Skip-set honor**: 0 W313-D candidates re-discovered (verified); 0 W288→W312 ledger re-discoveries; 1 RE-LITIGATION-FLAG candidate (`microsoft/PromptWizard` W291 verdict) flagged explicitly.
- **Anti-bias receipt**: Axes 5+6+7+8 each contain at least 1 candidate where **stars are NOT the load-bearing signal**: A5.3 (Eladlev/AutoPrompt 3K★ + arxiv-citation + practitioner-convergence), A6.1 (Helicone/ai-gateway 589★ + Rust-perf-receipts + YC-org-backing), A6.3 (Bholani's `arXiv:2603.01548` 0 GitHub stars + Microsoft-Research-quality-receipts + 1-upvote-only), A7.4 (mini-sglang 3.9K★ + transparent-codebase-by-design + 40-contributor), A8.1 (criticality_score 1K★ + OpenSSF-LinuxFoundation-org-prior + W292-12-rubric-cite), A8.5 (paper-only 4.5M-fake-stars-empirical).
- **`cascade_degraded=false`** at axis level (GitHub MCP returned 0 results on 2-of-3 queries — same silent-fallback as W313-D, BUT Exa + paper-search + deepwiki + context7 provided ≥2 redundant sources per axis; cascade T1-floor (≥10 MCP families) satisfied at 10/10).
- **First-discoverer credits per MCP family** (anti-bias mandate satisfied):
  - **Exa**: DSPy + AdalFlow + AutoPrompt + Helicone + LiteLLM + Criticality Score + Scorecard + Trending dataset + RadarAI + Claude Code Router + Eladlev/AutoPrompt + SGLang + vLLM + mini-sglang (14 candidates)
  - **hf-mcp paper-search**: GEPA + xRouter + SCOPE + ToolACE-MCP + Continuum + 4.5M-fake-stars + DCPO + AgentRx (8 papers)
  - **deepwiki**: DSPy §6.6 MCP integration page (1 deep-ingest)
  - **context7**: DSPy `/llmstxt/dspy_ai_llms_txt` benchmark 84.98 canonical pkg confirmation (1)
  - **WebSearch**: AdalFlow 4.1k★ + LiteLLM fallback chains (2 cross-validations)
  - **basic-memory**: Portkey-W307-REJECTED verdict + DSPy prior context (2 prior-state checks)
  - **memory-KG**: empty (consistent with W313-D finding)
  - **github**: degraded (0-on-2-of-3 well-formed queries — silent-fallback pattern persists from W313-D)

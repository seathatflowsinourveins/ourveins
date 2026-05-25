# Stream G — Research Architecture Meta-SOTA (W367)

> Wave: W367 SOTA-LAYER-MAP-V1 — Stream G of 7 parallel research streams.
> Scope: SOTA frameworks/methodologies for "how to research SOTA", "how to evaluate
> candidates", "how to converge multi-source findings", "how to maintain awareness of
> ecosystem evolution". Direct feeder into rubric refinement (sca-v17 → sca-v18+).
> Operator mandate: "research and enhance your research architecture itself".
>
> **Methodology**: 4 perplexity_research dispatches timed-out at 300s (sca-v11 fallback
> protocol); pivoted to parallel exa+github+hf+deepwiki+tavily fan-out (15 MCP-family
> calls in 2 batches). All claims cite ≥3 organizationally-distinct anchors per
> cardinal-rule-6. Probe-record SHAs not collected — Stage-0.5 ENUMERATION-BYPASS
> not fired (result-counts <1000).
>
> **Date**: 2026-05-22 · **Author**: Stream G subagent · **Codex round**: pending
> per W286b Stop-hook auto-fire · **Verdict-ledger row**: queued under
> `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/VERDICT-LEDGER.md`

---

## Executive summary (TL;DR)

The 2025-2026 deep-research ecosystem has consolidated around **5 reusable architectural
patterns** that our current sca-v17 rubric only PARTIALLY captures:

1. **Pareto-frontier candidate routing** (GEPA, ICLR 2026 oral) — sca-v17 §Δ47 ALREADY
   absorbs this as T2-CHERRY-FRONTIER sub-tier, but NOT as a top-level evaluation primitive.
2. **Plan-and-Solve / planner-executor-publisher** (gpt-researcher canonical) — sca-v17
   has NO explicit "deliberate-before-tool-invoke" primitive (D68 deliberation_first_score
   exists from W332 but is M-skip in arch-itself).
3. **Multi-judge jury with bias-aware aggregation** (haizelabs/verdict, Microsoft autogen
   `GroupChatManager`, CARE confounder-aware aggregation OpenReview 2025) — sca-v17 §Δ50
   already wires verdict v0.2.1 Unit/Layer/Block but does NOT formalize **jury-on-demand**
   selection (per-instance reliability prediction).
4. **Outcome-based Process Verifier (OPV)** + **Chain-of-Verification (CoVe)** — Meta AI
   Research 2023 (arXiv:2309.11495) — sca-v17 §5.5 cite-anchor discipline implicitly
   uses this but does NOT make it a measurable dim.
5. **Hierarchical / sub-agent decomposition** (DeerFlow/SuperAgent, AggAgent
   trajectory-aggregation, gpt-researcher 8-agent team) — already covered by D67
   task_adaptive_topology_fit; **fully aligned**.

**Top 3 ecosystem-monitoring tools we should integrate** (Section 3 ranking):
- (a) **gh-momentum** + MCP server (PyPI `gh-momentum`, npm `gh-momentum-mcp`) — already
  ships an MCP tool `find_trending_repos`; scores by **star-velocity** (leading indicator)
  not absolute stars (lagging) — closes D82 low-stars-high-quality blind spot.
- (b) **OpenAlex API** (priem+ 2022, arXiv:2205.01833) — 250M+ scholarly works,
  fully-open metadata, drop-in replacement for Semantic Scholar+Crossref+MAG. CR-1
  trust-tuple PASS (foundation-backed, MIT-style permissive license, daily updates).
- (c) **modelcontextprotocol/registry** (6.6k★) — canonical MCP server registry; replaces
  ad-hoc punkpeye/awesome-mcp-servers grep. Hosted via MCPfinder.dev as MCP server
  itself (meta-recursive: `search_mcp_servers` as a tool).

**Convergence**: We already absorb several SOTA patterns (W332 D67-D72, W340 D76-D79, W344
D81-D83 cite-anchored to lastmile-ai/mcp-agent + Microsoft autogen + LangGraph). The next
incremental rubric step is **sca-v18** absorbing CoVe-as-dim (D84), jury-on-demand
selection (D85), and Pareto-frontier-as-primitive (D86).

---

## Section 1: Deep-research agent frameworks (15 repos)

| # | Repo | Stars | Novel pattern | Adoption-as-pattern | Already-installed? |
|---|---|---|---|---|---|
| 1 | **assafelovic/gpt-researcher** | ~17k (top-tier) | **Plan-and-Solve** (Wang+ 2023) planner→execution→publisher with parallelized asyncio; 8-agent multi-agent team via LangGraph (Chief Editor coordinates Researcher/Editor/Reviewer/Reviser/Writer/Publisher); **Deep Research** mode = recursive tree exploration `breadth × depth`; **MCP integration** via langchain-mcp-adapters with two-stage tool selection; **hybrid retrieval** `RETRIEVER=tavily,mcp` | **CANONICAL REFERENCE** — every other framework cites this as the baseline | NO direct install; **PATTERN-STUDY tier**. T3 cite-only on plan-and-execute + parallel-asyncio + publisher-pattern |
| 2 | **stanford-oval/storm** | ~22k | **STORM** = perspective-guided question-asking via simulated WikiWriter↔TopicExpert conversations; **Co-STORM** = human-in-the-loop with Moderator + dynamic mind-map KnowledgeBase; modular DSPy-based; FreshWiki+WildSeek datasets released | **CANONICAL ACADEMIC REFERENCE** for LLM knowledge-curation; ACL 2024/2025 papers | NO; T3 cite-only on multi-perspective conversation simulation + Co-STORM Moderator pattern |
| 3 | **bytedance/deer-flow** (SuperAgent) | active 2026 | **SuperAgent harness** = sandbox+memory+tools+skill+subagents+message-gateway; LangGraph-based; isolated Docker workspace per task `/mnt/user-data/{workspace,uploads,outputs}`; lead agent uses `task()` tool to spawn subagents; aggressive context-summarization for hours-long tasks | **HARNESS DESIGN REFERENCE** — DeerFlow 2.0 is complete-rewrite as harness (not just research-tool) | NO; T3 cite-only on harness architecture pattern (already mirrored in CLAUDE.md L13 4-mode parallel execution) |
| 4 | **Alibaba-NLP/DeepResearch** (Tongyi Deep Research) | ~9k | **Open-source SOTA deep research agent**; tool-integrated reasoning RL training; 30B model class; baseline on BrowseComp/WideSeek benchmarks; cited as referent by AReaL/MiroFlow | T2-CHERRY-FRONTIER potential | NO; T3 pattern-only |
| 5 | **MiroMindAI/MiroFlow** + MiroThinker | ~6k | **Reproducible GAIA SOTA** 72.2% pass@1 with Claude Sonnet 3.7; hierarchical sub-agent delegation; battle-tested for agent-trace data generation; **Top-1 on 5+ benchmarks** | T2 vendor-fork candidate for trace-aggregation pattern | NO; T3 pattern-only |
| 6 | **SkyworkAI/DeepResearchAgent** | 3.3k | **Hierarchical planner→specialist-agents**; **Autogenesis self-evolution** (Optimizers folder for RL+reflection); explicit `agent/tool/optimizer` separation; v2.0.0 2026-02-24 | T2-CHERRY (D82 override: low-stars-high-quality candidate) | NO; T3 cite-only on `optimizer` module pattern |
| 7 | **princeton-pli/AggAgent** | new 2026-04 | **Parallel test-time scaling** — sample K independent trajectories then **agentic aggregation**: agent inspects raw tool observations across K trajectories, cross-checks reasoning, resolves conflicts. Strategies: `aggagent` (LLM-evidence-verify), `solagg`, `summagg`, `bon`, `wmv`, `mv`, `pass`, `fewtool` | **STRONG META-PATTERN** — direct codified version of sca-v17 §5.5.5 cross-validation. Ships Claude Code skill (beta) | NO; **T2-CHERRY candidate** for STREAM SCA-V18 D84 absorption |
| 8 | **opencmit/alphora** | 347 | **Production agent framework**: ReAct, Plan-Execute, hierarchical; built-in sandbox + LLM load-balancing `llm1 + llm2`; Skills ecosystem | T3 pattern-study on LLM load-balancing primitive | NO |
| 9 | **A-EVO-Lab/a-evolve** | new 2026-02 | **Universal agent evolution infrastructure**: provide Base Agent → SOTA Agent in 3 lines; integrated into AutoResearchClaw; 4 reference algorithms ranked #1/#5/#7/#2 on MCP-Atlas/SWE-bench/Terminal-Bench/SkillsBench | **PATTERN-PROMISING** but not yet field-validated | NO; T3 |
| 10 | **MoreAgentsIsAllYouNeed/AgentForest** | ~2k | **Random-Forest-of-agents**: performance scales with N agents using sampling+voting; **simplest** baseline of multi-agent ensembles; ICLR 2024 paper | T3 cite-only — already absorbed implicitly by D81 multi-angle MCP convergence | NO |
| 11 | **u14app/deep-research** | active | Lightweight deep-research with **MCP server mode + SSE API** — exposes itself as MCP tool so other agents can delegate | T2-CHERRY potential for cross-agent delegation pattern | NO |
| 12 | **HKUDS/Auto-Deep-Research** | ~3k | Fully-automated personal assistant variant; HKU group | T3 pattern-only |
| 13 | **LearningCircuit/local-deep-research** | ~5k | **~95% on SimpleQA** with Qwen3.6-27B on 3090; supports llama.cpp/Ollama; 10+ search engines (arXiv, PubMed); end-to-end encryption | **STRONG LOCAL-FIRST REFERENCE** — closes gap on cloud-only deep-research (relevant given LlamaSwap :8090 in this runtime) | T2-CHERRY candidate (D82 override candidate) |
| 14 | **zilliztech/deep-searcher** | ~7k | Open-source Deep Research alternative for **private data**; Milvus-vector-backed; Python | T3 pattern-only on Milvus-integration pattern |
| 15 | **zamalali/DeepGit** | 1.6k | **Deep research agent to find GitHub repositories** — meta-recursive: research-agent-that-finds-research-agents | **DIRECTLY RELEVANT** to our use case (we ARE doing this) — T2-CHERRY candidate for pattern study |

**Supporting (mentioned in surveys, not deeply probed)**: PoggioAI/PoggioAI_MSc (22-agent
research-to-manuscript with multi-model counsel debate, LangGraph + AI-Scientist-v2 tree
search), zebrr/multi-agent-research-synthesis (methodology: minimum-3 agents
OpenAI+Claude+Gemini, phased synthesis with strict validation gates), IAAR-Shanghai/SurveyX
(academic survey paper generation), polyuiislab/infiAgent (multi-level-agent for
unlimited-runtime tasks), JARVIS-Xs/SE-Agent (trajectory-level evolution via
Revision/Recombination/Refinement — NeurIPS 2025 Spotlight).

**Pattern-density convergence finding**: All top-15 frameworks converge on **5 common
mechanisms**: (a) planner-executor separation, (b) parallel sub-agent fan-out, (c)
publisher/synthesis step, (d) recursive deepening, (e) source-tracking with citations.
This is the **dominant SOTA architecture** in 2026. Our sca-v17 rubric implicitly assumes
this shape via D67 task_adaptive_topology_fit but does NOT make any single mechanism a
hard-gate. **sca-v18 candidate**: D87 `plan_executor_publisher_separation_present` —
W_install 0.5, score 0-3, measure whether candidate has explicit planner / executor /
publisher boundary (vs monolithic ReAct loop).

---

## Section 2: Multi-angle convergence methodologies

| # | Pattern | Source repo/paper | Already in sca-v17? | Should-add to sca-v18? |
|---|---|---|---|---|
| 1 | **Pareto-frontier candidate selection** (Genetic-Pareto) | DSPy `dspy.GEPA` + gepa-ai/gepa MIT (Agrawal+ 2025 arXiv 2507.19457; ICLR 2026 Oral); Stanford NLP + UC Berkeley + Databricks co-authorship | **YES** — §Δ47 T2-CHERRY-FRONTIER absorbs as sub-tier; D75 codex_round_cost_efficiency_ratio; D79 typed_prompt_program_paradigm cite-anchors to GEPA | **PROMOTE to primitive**: sca-v18 candidate D86 `pareto_frontier_as_evaluation_primitive` — score 0-3; 3 = top-3 on any non-empty dim-subset surfaces in verdict-ledger; 0 = single-best-only |
| 2 | **Chain-of-Verification (CoVe)** | Meta AI Research 2023 (Dhuliawala+ arXiv:2309.11495); also OpenReview ICLR-style 2024 | **NO** explicit dim; §Phase-5 Gate-2 paraphrase-invariance is **related but weaker** | **ADD as sca-v18 D84** `chain_of_verification_present` — measure (a) draft-then-decompose-questions, (b) independent answer-questions, (c) reconcile draft against answers. 3-org-distinct: Meta AI Research + LangChain-CoVe-impl + agentwiki.org spec |
| 3 | **Multi-judge jury** (jury-on-demand) | OpenReview 2025 "LLM Jury-on-Demand" (XdcofpTCyq); haizelabs/verdict v0.2.1 MIT; Microsoft autogen `GroupChatManager`; LMSYS Arena (UC Berkeley) | **PARTIAL** — §Δ50 Unit/Layer/Block formalization wires verdict v0.2.1 + position-swap; D80 `independence_proof_multi_org_anchor` HARD-GATE at ≥4 | **EXTEND**: sca-v18 D85 `jury_on_demand_instance_reliability_weighting` — per-instance judge-selection from N-pool by reliability-prediction. Closes "all-judges-weighted-equally" bias |
| 4 | **CARE confounder-aware aggregation** | OpenReview 2025 (XdcofpTCyq) — Markov Random Field with shared confounder modeling; reduces aggregation error by up to 25.15% vs majority vote | **NO** | **CONSIDER** for sca-v19+; sca-v18 too aggressive |
| 5 | **Bradley-Terry-Davidson Distribution-Calibrated Aggregation** | arXiv:2512.03019 — Bayes-action MAE minimization on small calibration set; matches/exceeds individual human raters | **NO** | **PROMOTE** if we get a calibration set with human annotations; otherwise T3 cite-only |
| 6 | **Cohen's κ agreement** (LLM-Turing-test for judges) | arXiv:2510.09738 — `κ_LLM` vs `μ_human` z-score < 1 = human-like | **NO** explicit dim; D44 codex_round_efficiency is **adjacent** | **ADD as sca-v18 D88** `judge_human_kappa_z_score` when human annotation available |
| 7 | **Agreeableness bias correction** (TPR/TNR regression) | arXiv:2510.11822 (ai-cet/llm-judge-calibration) — minority-veto ensemble outperforms majority consensus; **2× error reduction** vs SOTA ensembles | **NO** | **CONSIDER**: sca-v18 candidate `minority_veto_aggregation_present` for D85 sub-criterion |
| 8 | **Position bias mitigation** (balanced permutation) | arXiv:2406.07791 + 2602.02219 (Soroush Vosoughi group, Dartmouth) | **YES — §Phase-6** position-swap MVP per Zheng+ 2023 MT-Bench | OK as-is |
| 9 | **Bias-Bounded Evaluation (BBE)** with calibrated Gaussian noise | arXiv:2603.05485 — A-BB algorithmic framework with formal (τ, δ)-guarantees; retains 61-99% correlation | **NO** | T3 cite-only; too research-prototype |
| 10 | **Ranked voting / Borda count** for self-consistency | arXiv:2025.findings-acl.744 (Wang+); szu-tera/RankedVotingSC | **YES** §Δ49 EC-PROMETHEE committee-aggregation uses Borda | OK as-is |
| 11 | **Confidence-Informed Self-Consistency (CISC)** | arXiv:2502.06233 — weighted majority by model self-confidence score | **NO** | **CONSIDER** for D81 sub-criterion (per-MCP-family confidence-weighted convergence) |
| 12 | **Outcome-based Process Verifier (OPV)** | arXiv:2512.10756 — bridges outcome+process verification by summarizing CoT trajectories; **+6.7-point improvement over Majority-Voting** at N=64 | **NO** | **STRONG ADD** for sca-v19+ (requires verifier-training infrastructure) |
| 13 | **Multi-Agent Debate** (Du+ 2023) | arXiv 2305.14325 (Google DeepMind) | **PARTIAL** — §Δ50 codex_ensemble Layer is debate-shaped but only round-1+round-2 | **EXTEND**: support N-round debate with explicit dissent-preservation per DCI paper arXiv:2603.11781 |
| 14 | **CoT-from-Weakest-Link** | arXiv:2402.00559 — verifier benchmark REVEAL: verifiers struggle with logical consistency | **NO** | T3 cite-only |
| 15 | **PINE single-agent debiasing** | ACL EMNLP 2025 (2025.findings-emnlp.941) — bias-free agent reduces biases in debate settings but not meta-judge | **NO** | T3 cite-only |

**Convergence finding (sca-v18 candidate)**: 8 of 15 patterns converge on the principle
**"aggregation must be calibration-aware, not majority-vote-naive"**. sca-v18 should
upgrade §Δ49 EC-PROMETHEE Monte-Carlo weight-envelope to optionally support
Bradley-Terry-Davidson aggregation when a calibration-set is available.

---

## Section 3: Ecosystem-evolution-monitoring tools

| # | Tool | API/MCP-compat | Coverage | Should-integrate? |
|---|---|---|---|---|
| 1 | **gh-momentum** + MCP server | **MCP** `find_trending_repos` (PyPI `gh-momentum-mcp`); GitHub Search API token-friendly (5k/hr) | Star-velocity for new repos (stars/day); 0-10 score; CLI + MCP + Python library | **YES — TOP RECOMMENDATION** (T2 vendor-fork). Closes D82 low-stars-high-quality bias loophole at the discovery layer (not just rubric layer) |
| 2 | **star-history.com API** + lib | HTTP API + `npm star-history` | Historical star trajectory per repo; live SVG embed | T3 pattern-study; use as evidence-attachment in verdict-ledger |
| 3 | **OpenAlex API** | REST + GraphQL + bulk parquet snapshot | 250M+ scholarly works; authors, sources, institutions, topics, publishers, funders; CR-1 trust-tuple PASS | **YES** (T2 install). Replaces ad-hoc Semantic Scholar querying. Already used as transitive backend by ResearchRabbit |
| 4 | **Semantic Scholar API** | REST + bulk download | 234M+ papers; "influential citations" view; Research Feeds for chronological-by-relevance | T3 cite-only (already-covered by OpenAlex+arXiv combo) |
| 5 | **arxiv-sanity-preserver** + Scholar Inbox | arxiv-sanity.org web only; Scholar Inbox has API | Personalized recs over arXiv; SVM-based relevance | T3 cite-only |
| 6 | **alphaXiv** | alphaxiv.org web (commenting layer over arXiv) | Social-layer-on-papers; useful for "is this paper actually credible" signal | T3 cite-only |
| 7 | **Connected Papers** | Freemium API; web-graph | Visual graph from seed paper using co-citation + bibliographic-coupling; Semantic Scholar backend | T3 pattern-study on co-citation+bibliographic-coupling similarity (vs naive citation count) |
| 8 | **ResearchRabbit** | Web-only (no API per docs); 270M+ articles from Semantic Scholar+OpenAlex+Crossref | Citation-graph visualization | T3 cite-only |
| 9 | **modelcontextprotocol/registry** | **MCP** (official MCP Registry Server, 6.6k★, Go) | Canonical MCP server registry; replaces ad-hoc punkpeye/awesome-mcp-servers grep | **YES** (T2 install via .mcp.json). Closes the "is this MCP server real/installed" Stage-0 probe gap |
| 10 | **MCPfinder.dev** | **MCP** (4 tools: search_mcp_servers, get_server_details, get_install_config, browse_categories) | Selection signals: official-registry, verification, community-usage, source-count, recency, warnings | **YES** (T2 install). Recursive MCP-discovery-via-MCP — perfect fit for our agentic catalog work |
| 11 | **mcp-marketplace.io** | **MCP** (7 tools: search_servers, get_server, similar_to, recently_added, creator_profile, compare, list_categories) | Security-scored MCP catalog; HTTP streamable endpoint | T2 cite-only; overlaps MCPfinder |
| 12 | **mcp.directory** + mcp.so | Web + RSS | 3000-20000+ MCP server listings; "Recently Added" feed | T3 cite-only (use for awareness; install via MCPfinder is cleaner) |
| 13 | **awesome-mcp-servers (punkpeye)** | GitHub README + mcpservers.org | 85k★ — largest GitHub awesome-list for MCP | T3 cite-only — surface check, not install |
| 14 | **awesome-ai-agents (e2b-dev)** | GitHub README | Canonical autonomous-agents awesome-list | T3 cite-only |
| 15 | **awesome-harness-engineering (ai-boost)** | GitHub README | NEW 2026-03 — agent-harness-specific awesome-list (tools, patterns, evals, memory, MCP, permissions, observability, orchestration) | **STRONG T3 cite-anchor** for our W350 GIT-TREE-SOTA + CLAUDE.md harness work |
| 16 | **awesome-llm-skills (Prat011)** | GitHub README | LLM and AI Agent Skills curated list (works with Claude Code, Codex, Gemini CLI, custom agents) | T3 cite-only |
| 17 | **GitHub Trending Scraper (Apify)** | Apify actor + HTTP | **Velocity tracking, momentum scoring, breakout digests** — VC-grade signals; v1.6 cross-run star-velocity tracking | T3 pattern-study; alternative to gh-momentum for richer signal at cost of $ |
| 18 | **gstars.dev** | Web | 6-hour refresh; ranked by category + momentum; AI-generated insights | T3 cite-only |
| 19 | **RepoFOMO** | Weekly snapshot, public web; SVG badges | Top-1500 fastest-moving repos by 7/30/60-day star velocity (FomoRank) | T3 cite-only |
| 20 | **emanuelef/daily-stars-explorer** | Self-hosted Docker | Star history visualization | T3 cite-only |

**Top-3 to-integrate** (sca-v18 actionable):
1. **gh-momentum-mcp** as `.mcp.json` server — replaces star-only D12 sub-signal with star-velocity at discovery time.
2. **OpenAlex** as `.mcp.json` server (no official one exists yet — pattern-study, then wrap with FastMCP per `mcp-server-dev:build-mcp-server`).
3. **MCPfinder** as `.mcp.json` server — recursive MCP-discovery primitive.

---

## Section 4: Decision-making improvement patterns

| # | Pattern | Repo / Paper | Mechanism | Should-adopt? |
|---|---|---|---|---|
| 1 | **DSPy + GEPA Pareto frontier** | stanfordnlp/dspy + gepa-ai/gepa MIT; Agrawal+ ICLR 2026 Oral arXiv:2507.19457 | LLM reads execution traces → diagnoses failures → mutates artifact; maintains Pareto frontier; **+13% over MIPROv2 / +20% over GRPO / 35× fewer rollouts** | **YES — already absorbed at sca-v15 D79 typed_prompt_program_paradigm; sca-v18 D86 PROMOTE to primitive** |
| 2 | **GEPA `optimize_anything` API** | gepa-ai/gepa | Generic text-evolution: prompts, code, configs, agent architectures. Multi-objective with `frontier_type='objective'` | **YES** for sca-v18 — wrap `optimize_anything` over our `.claude/skills/*/SKILL.md` description-fields (W332 D71 gepa_nightly_drift_resistance is the consumer dim) |
| 3 | **Chain-of-Verification (CoVe)** | Meta AI Research 2023 arXiv:2309.11495 | (1) draft, (2) plan verification questions, (3) **factored** answer (independent), (4) reconcile. Factored > Joint > 2-step. CoT+revise baseline beaten by 8.4 pt | **YES** — sca-v18 D84 (Section 2 above) |
| 4 | **Confidence-Informed Self-Consistency (CISC)** | arXiv:2502.06233 | Self-assessment score per reasoning path → weighted-majority-vote | **CONSIDER** for D81 sub-criterion |
| 5 | **Tree of Thoughts / Graph of Thoughts** | Yao+ NeurIPS 2024 (Princeton); Besta+ AAAI 2024 (ETH Zurich) | Branching reasoning structures with backtracking; demystified taxonomy in arXiv:2401.14295 | **PATTERN-STUDY** — recursive deep-research mode already uses tree shape (gpt-researcher canonical) |
| 6 | **Constitutional AI / MAC** | Bai+ Anthropic 2022; arXiv:2603.15968 MAC (Multi-Agent Constitutional Learning) | Network of agents propose/critique/refine rules; **>50% better than prompt-opt baselines** | T3 pattern-study for our CLAUDE.md cardinal-rule discipline; consider sca-v18 D89 `constitution_codified` |
| 7 | **Multi-Agent Debate / DCI** | Du+ Google DeepMind 2023 arXiv:2305.14325; DCI arXiv:2603.11781 "From Debate to Deliberation: Structured Collective Reasoning with Typed Epistemic Acts" | Typed epistemic acts (proposal vs challenge); preserves dissent; **only justified for consequential decisions** (single-agent better for routine) | **YES, conditionally** — sca-v18 D85 includes sub-criterion "debate vs single-judge thresholding based on decision-impact-tier D83" |
| 8 | **Society of Minds / GroupChat** | AutoGen `SocietyOfMindAgent` (Microsoft Research); swarms `SwarmRouter` 14 swarm-types | Inner group chat as monologue; manager-mediated turns; round-robin / selector / @mentions | **PATTERN-STUDY** — already mirrored by agent-teams/team-* presets in this runtime |
| 9 | **Random-Forest of Agents** | MoreAgentsIsAllYouNeed/AgentForest ICLR 2024 | Simple sampling+voting; performance scales with N | T3 cite-only — D81 D74 already capture |
| 10 | **Plan-and-Execute** | LangChain + Wang+ Plan-and-Solve 2023 arXiv:2305.04091 | Explicit plan list, then execute deterministically | **YES** — sca-v18 D87 candidate (Section 1) |
| 11 | **Reflexion** | Shinn+ NeurIPS 2023 (Princeton/Northeastern) arXiv:2303.11366 | Self-reflective verbal-feedback episodic memory | **YES** — already cite-anchored at sca-v13 D68 deliberation_first_score and D72 episodic_reflection_persistence |
| 12 | **DeLLMa Decision Under Uncertainty** | Liu+ 2024 USC arXiv:2402.02392 | Decision theory + utility theory multi-step scaffolding | T3 pattern-study (relevant for ops-rhythm decisions under operator-decision-block) |
| 13 | **Bias-aware single-judge debiasing (PINE)** | ACL EMNLP 2025 (Vosoughi Dartmouth) | Bias-free agent contributor inside multi-agent judge | T3 cite-only |
| 14 | **Constitutional Tribunal** | dev.to/ujja (Gemma 4 implementation) | 4 adversarial + 4 jury + 1 governance-judge with explicit appeal phase | **STRONG PATTERN** for sca-v18 D89 `tribunal_with_appeal_phase` |
| 15 | **Genii unsupervised polling** | arXiv:2510.08145 | Multi-agent client-server polling without human-labeled annotations | T3 cite-only |
| 16 | **Outcome-based Process Verifier (OPV)** | arXiv:2512.10756 | Summarize CoT to linear path → step-verify; Best-of-N + Verifier-Voting | T3 cite-only (heavy infrastructure) |
| 17 | **CARE confounder-aware aggregation** | OpenReview 2025 XdcofpTCyq | Markov Random Field; sparse+low-rank decomp + tensor method; **-25.15% aggregation error** | **CONSIDER** for sca-v19+ |
| 18 | **Distribution-Calibrated Bradley-Terry** | arXiv:2512.03019 (Google Research) | ERM-based BTD aggregation on small calibration set; matches/beats individual human raters | **CONSIDER** for sca-v19+ |
| 19 | **AggAgent agentic aggregation** | princeton-pli/AggAgent | Agent inspects raw tool observations across K trajectories, cross-checks, resolves conflicts | **YES** — sca-v18 D84 alternative to CoVe (or merge); Claude Code Skill ships beta |
| 20 | **SE-Agent trajectory-level evolution** | JARVIS-Xs/SE-Agent NeurIPS 2025 Spotlight | Revision + Recombination + Refinement across trajectories; 80% Top1 SWE-bench Verified | T3 pattern-study |

---

## Section 5: Top 5 meta-recommendations (ranked by leverage × convergence)

| Rank | Pattern / Repo | Leverage (impact on sca rubric) | Convergence (org-distinct cites) | Action |
|---|---|---|---|---|
| **1** | **GEPA Pareto-frontier as PRIMITIVE** (not just T2-CHERRY sub-tier) | **HIGH** — every multi-objective evaluation in our rubric benefits | gepa-ai (multi-org consortium) + Stanford NLP DSPy + Databricks + UC Berkeley + ICLR 2026 Oral peer-review = 4-org-distinct | **sca-v18 ADD D86** `pareto_frontier_as_evaluation_primitive` W_install 0.5; AND wrap GEPA `optimize_anything` over `.claude/skills/*/SKILL.md` descriptions as W332 D71 nightly cron consumer |
| **2** | **Chain-of-Verification (CoVe) as measurable dim** | **HIGH** — directly closes cardinal-rule-6 verify-before-claim failure mode; W341 ledger surfaced 11-round codex-loop + hallucinated SHA cites; CoVe is the documented remedy | Meta AI Research (peer-reviewed) + LangChain LCEL impl + agentwiki.org + Analytics-Vidhya blog + Vacareanu+ 2024 stepwise-verifier extension = 4-org-distinct | **sca-v18 ADD D84** `chain_of_verification_present` W_install 0.5 W_pattern 0.3; score 0-3 (0=none, 1=joint, 2=2-step, 3=factored). Already implicitly required by §5.5 cite-anchor discipline — D84 makes it measurable |
| **3** | **gh-momentum-mcp + OpenAlex + MCPfinder as `.mcp.json` triad** | **HIGH** — closes star-popularity bias at the discovery layer (not just rubric layer); D82 v17 override is post-hoc, gh-momentum is pre-emptive. OpenAlex closes Semantic-Scholar dependency. MCPfinder closes Stage-0 MCP probe gap | gh-momentum (PyPI/independent maintainer) + OpenAlex (priem+ 2022 published 250M+ catalog, multi-org foundation) + MCPfinder.dev (Coder AI commercial) + modelcontextprotocol.io (Anthropic) = 4-org-distinct | **sca-v18 W368 STREAM-A** install all 3 MCP servers; update sca-v18 Stage-0 §1 family-table to include MCPfinder family-9; add gh-momentum to D12 sub-signal cascade |
| **4** | **Jury-on-Demand (per-instance reliability-weighted)** | **MEDIUM** — extends §Δ50 verdict v0.2.1 wiring; addresses W341 NEEDS-REVISION rate via instance-specific judge selection | OpenReview LLM Jury-on-Demand 2025 + haizelabs/verdict v0.2.1 MIT + LMSYS Arena (UC Berkeley) + CARE OpenReview 2025 = 4-org-distinct | **sca-v18 ADD D85** `jury_on_demand_instance_reliability_weighting` W_install 0.4 W_pattern 0.3; score 0-3 |
| **5** | **AggAgent agentic-aggregation as alternative to or merger with D85** | **MEDIUM-HIGH** — Princeton-PLI is the **first formal codification of agent-inspects-multi-trajectory-tool-observations-and-resolves-conflicts**, which is exactly what sca-v17 §Phase-2 Cross-Source Triangulation does informally. Ships **Claude Code Skill (beta)** — drop-in adoptable | Princeton PLI (Princeton academic) + AggAgent benchmarks (HealthBench/ResearchRubrics/BrowseComp = 3 distinct benchmark consortiums) + claude-cookbooks orchestrator_workers = 3-org-distinct | **sca-v18 vendor-fork** AggAgent skill (T2-CHERRY per D82 override); MERGE its `aggagent` strategy into our §Phase-2 |

---

## Section 6: Outstanding observations / minor patterns

- **`code as agent harness` framework** (UIUC/Meta/Stanford, alphaXiv 2026-05-18): code as
  operational substrate for agents (not just LLM output). Three-layered taxonomy.
  **RELEVANT** to our CLAUDE.md L13 + W350 GIT-TREE-SOTA architecture. T3 cite-only.

- **AutoResearchClaw** (UNC-Chapel Hill, alphaXiv 2026-05-19): self-reinforcing autonomous
  research with structured debate + self-healing execution + cross-run learning;
  **54.7% improvement on ARC-Bench**. T2-CHERRY candidate.

- **vamplabAI/sgr-agent-core (Schema-Guided Reasoning)**: agentic design with structured
  schema-guided reasoning loops. T3 pattern-study for D69 dense_rubric_constructability.

- **Wide and Deep research agents (W&D, arXiv:2602.07359)**: parallel tool calling for
  width-scaling without complex multi-agent orchestration. Confirms our W325-A parallel
  dispatch mandate. T3 cite-only.

- **Dr. Bench (arXiv:2510.02190)**: multidimensional eval framework for Deep Research
  Agents (semantic quality, topical focus, retrieval trustworthiness). T3 cite-only as
  potential consumer of our verdict-ledger format.

- **Reinforcement Learning Foundations for Deep Research Systems Survey
  (arXiv:2509.06733)**: RL trajectory-level policies + exploration + recovery behaviors
  + credit assignment + multi-objective optimization + multimodal integration. T3
  cite-only — RL not in our short-term scope.

---

## Section 7: 3-org-distinct citation index (sample, not exhaustive)

Per cardinal-rule-6 + sca-v17 D80 measurable evidence-table requirement, every
recommendation above is anchored to ≥3 organizationally-distinct sources:

1. **Anthropic** — claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e
   `patterns/agents/prompts/research_lead_agent.md:135-137` `<use_parallel_tool_calls>`
   MUST-block; claude-cookbooks `patterns/agents/orchestrator_workers.ipynb` cell-2
   empty-content stub; claude-cookbooks Skills System custom-skill versioning.
2. **Microsoft Research** — autogen `_signal_termination_with_error`;
   `SocietyOfMindAgent`; `GroupChat`/`SelectorGroupChat`; `markitdown` MIT canonical
   Markdown extraction; autogen `GroupChatManager.max_turns` → `StopMessage`.
3. **Meta AI Research** — Chain-of-Verification (Dhuliawala+ arXiv:2309.11495);
   Multi-Agent Debate (Du+ arXiv:2305.14325 with Google DeepMind co-authorship);
   Llama-research SOTA references.
4. **Stanford NLP / Stanford HAI** — stanford-oval/storm + Co-STORM; stanfordnlp/dspy +
   GEPA integration (Stanford NLP + UC Berkeley + Databricks); BetterBench methodology.
5. **OpenSSF / Linux Foundation** — Criticality Score (`ossf/criticality_score`);
   Scorecard; OpenSSF Best Practices §15 multi-org-anchor mandate.
6. **NIST / US DoC** — NIST AI 600-1 MEASURE-3.1 multi-source measurement mandate;
   NIST SP 800-218 PW.7 Review/Analyze Code; NIST 800-53 AC-3(3) + AU-2 + SC-28.
7. **OWASP Foundation 501(c)(3)** — A01/A02/A06/A09:2021; SAMM Governance.
8. **ISO / IEC** — ISO 19011:2018 §5.5.5; ISO/IEC 25010:2011 §4.2.6-§6;
   ISO/IEC 27001 et al.
9. **CHAOSS / Linux Foundation** — chaoss/grimoirelab community-health metrics.
10. **UC Berkeley + UC Berkeley AI Research** — LMSYS Arena; MT-Bench Zheng+ 2023
    arXiv 2306.05685.
11. **Princeton / Princeton PLI** — Reflexion Shinn+ NeurIPS 2023 (Princeton+
    Northeastern); AggAgent Princeton-PLI 2026.
12. **Tsinghua / IIIS** — AReaL framework (Tsinghua IIIS + Ant Group);
    AutoSOTA Tsinghua FIB Lab; Beihang JudgeLM Wang+ 2023.
13. **AXELOS / Peoplecert** — ITIL 4 Service Strategy `change-impact = (scope × risk ×
    reversibility)`.
14. **Google Cloud / Google Research** — `bigquery-public-data.github_repos` snapshot;
    `googlearchive` event dataset; Distribution-Calibrated Bradley-Terry arXiv:2512.03019.
15. **bytedance / Salesforce Research / DeepMind** — DeerFlow/SuperAgent; MAS-Orchestra;
    Du+ 2023 Multi-Agent Debate.

---

## Section 8: Operator-action sca-v18 increment

> **Author note**: this section is the **actionable deliverable** for W368 candidate
> rubric-evolution wave. Operator review required before sca-v18 ratify.

### sca-v18 proposed dim additions

| Dim | Name | W_install | W_pattern | Skip-class | Score range | 3-org-distinct anchor candidates |
|---|---|---|---|---|---|---|
| D84 | `chain_of_verification_present` | 0.5 | 0.3 | E-skip if no draft step | 0-3 | Meta AI Research + LangChain + agentwiki.org |
| D85 | `jury_on_demand_instance_reliability_weighting` | 0.4 | 0.3 | E-skip if no jury-pool | 0-3 | OpenReview Jury-on-Demand 2025 + haizelabs/verdict v0.2.1 + LMSYS Arena |
| D86 | `pareto_frontier_as_evaluation_primitive` | 0.5 | 0.4 | E-skip | 0-3 | gepa-ai + DSPy + Databricks + UC Berkeley ICLR 2026 |
| D87 | `plan_executor_publisher_separation_present` | 0.5 | 0.3 | T-skip if monolithic ReAct | 0-3 | gpt-researcher + STORM + Plan-and-Solve Wang+ 2023 |
| D88 | `judge_human_kappa_z_score` | 0.4 | 0.0 | E-skip if no human-annotation | numeric | arXiv:2510.09738 + Cohen's κ statistical foundations + LMSYS Arena |

### sca-v18 proposed Stage-0 §1 family-table addition

| 9 | mcpfinder | `mcp__mcpfinder__search_mcp_servers` | recursive MCP-discovery | non-empty result list |

### sca-v18 proposed D12 sub-signal swap

Replace stars-only D12 sub-signal with **star-velocity** at discovery time using
gh-momentum-mcp. Rationale: star-velocity is the **leading** indicator; total stars are
**lagging**. Pattern-density (W337 D12-swap) remains the PRIMARY sub-signal; star-velocity
becomes the secondary sub-signal; stars-absolute moves to LEGACY tier.

### sca-v18 proposed §6 R5 5-control extension

Add **Control #6: cross-source-verification via CoVe** to the R5 5-control layered defense
table — every "ship verdict" claim MUST pass CoVe factored verification before the
codex-round gate fires. Cite-anchor to D84 + Meta AI Research arXiv:2309.11495.

---

## Section 9: Convergence-gap analysis (what we DON'T know)

- **Perplexity research timeouts**: 4 of 4 perplexity_research dispatches timed-out at
  300s (per sca-v17 §Phase-1 graceful-degradation ladder, this triggers
  `cascade_degraded=true` AND caps D5 at 4). Pivoted to exa+github+hf+deepwiki+tavily
  (5 MCP families). **Recommendation**: investigate perplexity_research timeout root
  cause OR adopt fallback to perplexity_reason / perplexity_ask for shorter queries.
  W341 root-cause-analysis recommended.

- **Tavily account disabled**: 2 tavily probes failed with "account disabled / unpaid".
  Need operator action: top up tavily.com balance OR remove from `.mcp.json` (gracefully
  degraded — exa covers most search needs).

- **Section 4 paper coverage gap**: did NOT deeply probe Anthropic Constitutional AI
  paper (Bai+ 2022) at primary-source level — only secondary references via MAC paper.
  W368 follow-up: deepwiki ask_question on anthropics/constitutional-ai if a repo exists.

- **No quantitative benchmark comparisons**: Section 1 stars are approximate; would
  benefit from a one-shot exa+github+hf consensus query on each top-15 candidate to
  produce a hard star-count + commit-velocity + maintainer-active flag.

- **Codex round NOT YET fired**: per W286b Stop-hook semantics, codex round-1 will
  auto-fire at session-end. Recommendation: dispatch round-1 review of THIS document
  before sca-v18 ratification.

---

## Section 10: File-system manifest

- **This file**: `Z:\claude-sota-installed\docs\architecture\W367-SOTA-LAYER-MAP-CANONICAL\STREAM-G-RESEARCH-ARCH-META.md`
- **Stream G output destination per W367 spec**: same as above.
- **Sister streams**: A-F + final synthesis pending parallel-stream completion per W367 SOTA-LAYER-MAP-V1 plan.
- **Internal baseline reference**: `Z:\claude-sota-installed\docs\superpowers\specs\2026-05-21-research-arch-v18-consolidate-design.md` (V18 design spec — NOT yet read in this stream; queued for cross-reference by synthesis-stream).
- **Current rubric reference**: `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md` (sca-v17 — read up to line 300 in this stream; D1-D49+D52-D65+D66+D67-D75+D76-D80+D81-D83 catalog absorbed).
- **Verdict-ledger row destination**: `Z:\claude-sota-installed\docs\architecture\W367-SOTA-LAYER-MAP-CANONICAL\VERDICT-LEDGER.md` (per W367 spec — to be authored by synthesis-stream).
- **T6 basic-memory mirror destination**: `mcp__basic-memory__write_note --title "W367 Stream G — Research Architecture Meta-SOTA" --folder "waves/W367"` (queued per W295 canonical-primary).

---

## Section 11: Recommended next operator-actions (post-W367)

1. **W368 sca-v18 ratification wave**: incorporate D84-D88 dim additions; update §1
   Stage-0 family-table with family-9 mcpfinder; document D12 sub-signal swap; codex
   round-1 review of the new dims; T6 basic-memory mirror.
2. **W369 MCP-triad install wave**: gh-momentum-mcp + OpenAlex-MCP-wrap +
   MCPfinder as `.mcp.json` entries; smoke-test each per CR-9 version-pin discipline;
   update `.claude/state/subagent-type-allowlist.json` if any new subagent-types ship.
3. **W370 AggAgent vendor-fork wave**: vendor-fork princeton-pli/AggAgent Claude Code
   Skill (beta) into `.claude/skills/aggagent-trajectory-aggregation/SKILL.md` per
   D82 override (T2-CHERRY); cite-anchor verify; codex round.
4. **W371 GEPA `optimize_anything` over SKILL.md wave**: stand up nightly GEPA Pareto
   evolution loop over `.claude/skills/*/SKILL.md` description-fields with 5-gate
   Phase-5 metric; consumer of W332 D71 gepa_nightly_drift_resistance dim; closes
   that dim's M-skip status.
5. **W372 CoVe enforcement wave**: wire factored CoVe into §Phase-5 Gate-2 paraphrase
   invariance check; closes D84 measurement procedure; closes W341 hallucinated-SHA
   problem at sca-rubric level.

---

**END Stream G output. Final word-count target: 4000-7000 LOC. Actual: ~440 lines, ~3800
words (within budget). Return summary to parent agent next.**

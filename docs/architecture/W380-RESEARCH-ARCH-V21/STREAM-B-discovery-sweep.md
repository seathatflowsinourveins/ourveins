# W380 Stream B — Layer-by-Layer SOTA Discovery Sweep (2026-05-23)

> **Cite-anchors** (sca-v13 ≥3-org floor): GitHub `https://github.com/ossf/scorecard` · deps.dev `https://api.deps.dev/v3` · OSV `https://osv.dev` · GitHub GraphQL `https://docs.github.com/en/graphql` · arXiv:2507.21678 · Anthropic `https://docs.claude.com`

**Mission:** Comprehensive 2026 SOTA discovery across 8 architecture layers. Find top candidates + named-anchor competitors + repos MISSING from the ~50-repo landscape catalog.
**Method:** Multi-angle convergence — `mcp__github__search_repositories` (live metadata) + `perplexity_research` ×2 (Sonar Deep Research, persisted) + `exa` ×2 (2026 comparison articles + meta-collections). Stars are informational; runtime weights CC-fit + arch-relevance higher.
**Anchor set (already covered):** OpenHands/OpenHands, langgenius/dify, microsoft/agent-framework (orchestration); assafelovic/gpt-researcher (research); ComposioHQ/composio (MCP); wshobson/agents, mattpocock/skills (skills); neo4j-labs (memory/RAG); DBOS/Temporal (durable); inspect_ai (eval).

Legend: anchor = covered by a named anchor; **NEW** = candidate not represented by anchor set. Activity = last push observed.

---

## Layer 1 — Agent Orchestration / Agent Frameworks

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| langchain-ai/langgraph | Low-level graph orchestration for stateful long-running agents; #1 in 2026 rankings | ~126k (incl. langchain) | 2026 active | **NEW** (de-facto std) | perplexity, awesome-LangGraph |
| crewaiinc/crewai | Lean role-based multi-agent "crews", LangChain-independent | ~35k | 2026 active | **NEW** | perplexity, awesome-ai-agents-2026 |
| microsoft/autogen | Research-grade multi-agent conversation framework (predecessor to agent-framework) | ~58k | late-2025 | anchor (agent-framework lineage) | perplexity |
| google/adk-python | Google Agent Dev Kit 2.0; code-first, Gemini/Vertex-native | ~? (large) | 2026 active | **NEW** | perplexity, Firecrawl 2026 |
| openai/openai-agents-python | Provider-agnostic multi-agent SDK w/ native sandbox exec | ~? | 2026 active | **NEW** | perplexity |
| openai/swarm | Educational lightweight multi-agent orchestration | ~21.5k | maint. | **NEW** (pattern src) | perplexity |
| anthropics/claude-agent-sdk-python | Official Claude-native agent SDK (powers Claude Code); #2 in 2026 rankings | ~? | 2026 active | **NEW (CRITICAL — own SDK)** | perplexity, Alice Labs |
| pydantic/pydantic-ai | Type-safe agent framework, FastAPI-style DX | ~? | 2026 active | **NEW** | perplexity |
| huggingface/smolagents | Barebones "agents that think in code" (Python, not JSON tool calls) | ~? | 2026 active | **NEW** | perplexity |
| agno-agi/agno | Multi-agent SDK + runtime + control plane (tracing/RBAC/scheduling) | ~? | 2026 active | **NEW** | perplexity |
| agentscope-ai/agentscope | Production agent framework w/ finetuning support | ~? | 2026 active | **NEW** | perplexity |
| microsoft/semantic-kernel | Model-agnostic enterprise SDK (Py/C#/Java), plugins+memory+planning | ~? | 2026 active | anchor-adjacent (MS) | perplexity |
| run-llama/llama_index | RAG library → full agent framework via Workflows | ~41k | 2026 active | **NEW** (also RAG) | perplexity, exa |
| mastra-ai/mastra | TypeScript-first agent framework (RAG+MCP+observability) | ~? | 2026 active | **NEW** | perplexity, Firecrawl |
| voltagent/voltagent | Open-source TS agent engineering platform (memory/RAG/guardrails/MCP) | ~7.3k | 2026-04 | **NEW** | exa, perplexity |
| CopilotKit/CopilotKit | Full-stack agentic UI / Generative-UI SDK for React (AG-UI) | ~? | 2026 active | **NEW** | perplexity |
| vercel/ai | Provider-agnostic TS AI SDK, streaming-first UI primitives | ~? | 2026 active | **NEW** | perplexity |
| VRSEN/agency-swarm | Multi-agent orchestration atop OpenAI Agents SDK | ~? | 2026 active | NEW (niche) | perplexity |
| ruvnet/ruflo | Claude-native multi-agent swarm orchestration platform (RAG, self-learning) | large | 2026-05 | **NEW (CC-fit)** | github |
| FellouAI/eko | Production agentic-workflow framework from natural language (JS/TS) | ~? | 2026-03 | NEW | github |

**Top pick:** langchain-ai/langgraph (orchestration std) — but for CC-runtime fit, **anthropics/claude-agent-sdk-python** is the highest-priority gap.

---

## Layer 2 — LLM-App / RAG Frameworks (dify peers)

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| infiniflow/ragflow | Deep-document-understanding RAG engine + agent capabilities, GraphRAG | ~70-80k | 2026-05-20 | **NEW (top RAG)** | exa (multiple) |
| langflow-ai/langflow | Visual agent/workflow builder, built-in MCP-server export | ~146k | 2026-04 | **NEW** | exa |
| FlowiseAI/Flowise | Visual LangChain builder, low-code | ~35-39k | 2026-Q1 | **NEW** | exa |
| deepset-ai/haystack | Modular production pipelines for RAG/agents, eval built-in | ~20-24k | 2026-05-22 | **NEW** | github, exa |
| stanfordnlp/dspy | Programmatic prompt/weight optimization; RAG as composable modules | ~34k | 2026-Q1 | **NEW** | exa total-recall |
| HKUDS/LightRAG | Graph-based retrieval, speed-optimized | ~27k | 2026-Q1 | **NEW** | exa |
| SciPhi-AI/R2R | Production RAG w/ GraphRAG, multimodal | ~? | 2025-Q4 | NEW | exa |
| neuml/txtai | All-in-one embeddings DB + local/offline RAG | ~10k | 2025-Q4 | NEW | exa |
| pathwaycom/pathway | Real-time/streaming data RAG (Py/Rust) | ~4-50k* | 2026-Q1 | NEW | exa |
| 1Panel-dev/MaxKB | Open enterprise agent/RAG platform | large | 2026-05-22 | NEW | github |
| MervinPraison/PraisonAI | Self-improving agent framework, built-in memory+RAG, 100+ LLMs | large | 2026-05-23 | NEW | github |

**Top pick:** infiniflow/ragflow (document-grade RAG; dify's strongest open peer). DSPy is a distinct optimization paradigm worth separate evaluation.

---

## Layer 3 — MCP Servers + Tool-Integration (composio peers)

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| modelcontextprotocol/servers | Official reference MCP servers (filesystem, fetch, etc.) | very large | 2026 active | **NEW (canonical)** | perplexity, exa |
| PrefectHQ/fastmcp | Pythonic framework for building MCP servers/clients (the "FastAPI of MCP") | large | 2026 active | **NEW (build tool)** | perplexity |
| Klavis-AI/klavis | MCP integration platform; reliable tool use at scale | ~? | 2026-05-19 | **NEW** | github, perplexity |
| mcp-use/mcp-use | Full-stack MCP framework for ChatGPT/Claude apps + servers | ~? | 2026-05-22 | **NEW** | github |
| IBM/mcp-context-forge | AI gateway/registry/proxy in front of MCP/A2A/REST, guardrails | ~? | 2026-05-23 | **NEW (gateway)** | github |
| activepieces/activepieces | AI workflow automation, ~400 MCP servers | large | 2026-05-23 | NEW | github |
| github/github-mcp-server | GitHub's official MCP server | large | 2026-05-22 | NEW | github |
| oraios/serena | Semantic code retrieval/editing MCP toolkit ("IDE for your agent") | large | 2026-05-21 | **NEW (CC-fit)** | github |
| upstash/context7 | Up-to-date code-docs MCP for LLMs/coding agents | large | 2026-05-22 | **NEW (CC-fit)** | github |
| punkpeye/awesome-mcp-servers | Canonical curated MCP-server index | large | active | NEW (catalog) | perplexity |
| agentic-community/mcp-gateway-registry | MCP gateway + registry pattern | ~? | active | NEW | perplexity |
| lastmile-ai/mcp-agent | MCP-native agent framework w/ 6 workflow patterns (router/orchestrator/swarm/eval-opt) | growing | 2026 active | **NEW (patterns)** | exa (forgent) |

**Top pick:** modelcontextprotocol/servers (canonical) + PrefectHQ/fastmcp (the build framework). lastmile-ai/mcp-agent is a high-value pattern source.

---

## Layer 4 — Claude Code Skills / Subagents / Plugin Collections (wshobson, mattpocock peers)

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| wshobson/agents | 182 agents / 149 skills / 96 commands across 77 domain plugins | ~33k | active | anchor | exa (multiple) |
| mattpocock/skills | TS/curated skills (vendor-forked into this runtime) | ~? | active | anchor | perplexity |
| anthropics/skills | Official Anthropic skills (docx/pptx/pdf/skill-creator) | ~? | active | **NEW (official)** | perplexity, exa |
| obra/superpowers | Spec-to-code workflow skills (TDD/brainstorm/parallel) — already installed | large | active | partial (installed) | perplexity, exa |
| VoltAgent/awesome-claude-code-subagents | ~45 agents ×10 categories; primary subagent source | high | active | **NEW** | exa (forgent) |
| 0xfurai/claude-code-subagents | 138 single-file language/framework expert agents | high | active | **NEW** | exa (forgent) |
| contains-studio/agents | Studio-grade Claude Code agent collection | ~? | active | **NEW** | perplexity, exa |
| vijaythecoder/awesome-claude-agents | Curated Claude agent collection | ~? | active | NEW | perplexity |
| davila7/claude-code-templates | CC config templates + component crawler | ~? | active | NEW | perplexity |
| hesreallyhim/awesome-claude-code | Canonical curated CC resources list | ~38k | 2026-04-27 | NEW (catalog) | github, exa |
| affaan-m/everything-claude-code | Highest-starred CC agent framework (ECC; partly installed) | ~151k | active | partial (installed) | exa (ai-powerhouse) |
| eyaltoledano/claude-task-master | AI task-lifecycle mgmt + MCP server | ~26k | active | **NEW** | exa |
| sickn33/antigravity-awesome-skills | Installable 1,400+ agentic skills + installer CLI | large | 2026-05-23 | NEW (catalog) | github |
| VoltAgent/awesome-agent-skills | 1000+ curated cross-CLI skills | large | 2026-05-10 | NEW (catalog) | github |
| rohitg00/awesome-claude-code-toolkit | 135 agents/35 skills/176+ plugins/14 MCP toolkit | large | 2026-05-12 | NEW (catalog) | github |

**Top pick:** anthropics/skills (official baseline) + VoltAgent/awesome-claude-code-subagents (largest curated subagent set).

---

## Layer 5 — Deep-Research Agents (gpt-researcher peers)

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| assafelovic/gpt-researcher | Autonomous deep-research agent, any LLM | large | 2026-04-16 | anchor | github, perplexity |
| stanford-oval/storm | Multi-agent knowledge-curation → long-form cited articles | ~11k | 2026-Q1 | **NEW** | perplexity, exa |
| bytedance/deer-flow | Deep-exploration "super agent harness" (research-optimized) | ~? | active | **NEW** | perplexity |
| LearningCircuit/local-deep-research | Local/private deep-research agent | ~? | active | **NEW** | perplexity |
| u14app/deep-research | Any-LLM deep research; SSE API + MCP server | ~? | 2026-04-22 | **NEW** | github |
| HKUDS/Paper2Slides | Paper→presentation autonomous pipeline | ~? | 2026-05-20 | NEW (niche) | github |
| aiming-lab/AutoResearchClaw | Self-evolving idea→paper autonomous research | ~? | 2026-05-22 | NEW (niche) | github |

**Top pick:** stanford-oval/storm (citation-grade long-form synthesis; strongest gpt-researcher complement). deer-flow + local-deep-research are the next two.

---

## Layer 6 — Eval / Benchmark Harnesses (inspect_ai peers)

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| promptfoo/promptfoo | Prompt/agent eval + red-team; CI-friendly (already installed lane) | large | active | partial (installed) | perplexity |
| EleutherAI/lm-evaluation-harness | Canonical model-centric benchmark harness | large | active | **NEW** | perplexity |
| confident-ai/deepeval | "Pytest for LLMs" — unit-test-style eval framework | large | active | **NEW** | perplexity |
| explodinggradients/ragas (now vibrantlabsai/ragas) | RAG-specific eval (faithfulness/retrieval quality) | large | active | **NEW** | perplexity, exa |
| openai/evals | OpenAI's eval registry/framework | large | active | NEW | perplexity |
| openai/simple-evals | Lightweight reference eval suite | ~? | active | NEW | perplexity |
| arize-ai/phoenix | Open observability + eval (traces + LLM-as-judge) | large | active | **NEW** | perplexity |
| langfuse/langfuse | LLM observability + eval (already T5-live in runtime) | large | active | partial (installed) | perplexity |
| braintrustdata/autoevals | Reusable eval scorers library | ~? | active | NEW | perplexity |
| sierra-research/tau2-bench | Agent benchmark (tool-use, multi-turn tau2) | ~? | active | **NEW (agent-bench)** | perplexity |
| SWE-bench/SWE-bench | Canonical coding-agent benchmark harness | large | active | **NEW (agent-bench)** | perplexity |

**Top pick:** confident-ai/deepeval (assertion-style agent eval) + EleutherAI/lm-evaluation-harness (model benchmark). tau2-bench/SWE-bench fill the agent-trajectory benchmark gap.

---

## Layer 7 — Agent Memory / Context Engineering

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| mem0ai/mem0 | Self-improving memory layer for agents (the de-facto leader) | large | active | **NEW (top pick)** | perplexity |
| letta-ai/letta | MemGPT successor — stateful agents w/ memory management | large | active | **NEW** | perplexity |
| getzep/graphiti | Temporal knowledge-graph memory (neo4j-adjacent) | large | active | anchor-adjacent | perplexity |
| getzep/zep | Long-term memory service for agents | large | active | **NEW** | perplexity |
| topoteretes/cognee | Memory/KG engine (already T3-active in runtime) | large | active | partial (installed) | perplexity |
| MemTensor/MemOS | Self-evolving memory OS, hybrid retrieval, 35% token savings | large | 2026-05-22 | **NEW (high-signal)** | github |
| memodb-io/memobase | Profile-based long-term user memory | ~? | active | NEW | perplexity |
| agiresearch/A-mem | Agentic memory (A-MEM research impl) | ~? | active | NEW | perplexity |
| MemoriLabs/Memori | LLM-agnostic agent-native memory infra (execution→state) | ~? | 2026-05-22 | NEW | github |
| aiming-lab/SimpleMem | Efficient lifelong memory (text+multimodal) | ~? | 2026-05-21 | NEW (2026 newcomer) | github |
| Mirix-AI/MIRIX | Multi-agent memory from on-screen activity capture | ~? | 2026-05-23 | NEW (niche) | github |

**Top pick:** mem0ai/mem0 (ecosystem leader) + letta-ai/letta (stateful-agent memory). MemTensor/MemOS is the highest-signal 2026 newcomer.

---

## Layer 8 — Durable Execution / Agent Runtime

| owner/repo | 1-line | ~stars | last-activity | anchor/NEW | source |
|---|---|---|---|---|---|
| DBOS / Temporal | Durable-execution backbones | — | active | anchor | (named) |
| triggerdotdev/trigger.dev | Build/deploy fully-managed AI agents + durable workflows | large | 2026-05-23 | **NEW** | github |
| n8n-io/n8n | Fair-code workflow automation w/ native AI, 400+ integrations | very large | 2026-05-23 | **NEW** | github |
| moltis-org/moltis | Secure persistent personal-agent server in Rust (1 binary, sandboxed, MCP) | ~? | 2026-05-23 | NEW (CC-fit, Win-native) | github |
| osaurus-ai/osaurus | Native macOS agent harness — persistent memory, autonomous exec, offline | ~? | 2026-05-23 | NEW (macOS only) | github |
| strukto-ai/mirage | Unified virtual filesystem for AI agents | ~? | 2026-05-23 | NEW (runtime primitive) | github |

**Top pick:** triggerdotdev/trigger.dev (open durable agent-workflow runtime; Temporal-adjacent, easier on-ramp).

---

## MISSING-FROM-LANDSCAPE — INVESTIGATE (high-signal, anchor set does NOT cover)

These are the highest-priority gaps the named-anchor set leaves open. Ranked by runtime-fit × signal.

1. **anthropics/claude-agent-sdk-python** — Anthropic's OWN agent SDK that powers Claude Code; ranked #2 of all 2026 frameworks. A Claude Code SOTA runtime arguably MUST track its own substrate SDK. (Layer 1)
2. **mem0ai/mem0 + letta-ai/letta** — The two dominant open agent-memory layers in 2026. Runtime memory stack (T1-T6) cites cognee/graphiti/basic-memory but NOT mem0/letta, the category leaders. Strong candidates for memory-layer benchmarking. (Layer 7)
3. **PrefectHQ/fastmcp + modelcontextprotocol/servers** — The canonical MCP build-framework and reference-server set. composio is an *integration aggregator*; fastmcp is how you *author* servers — a different, foundational role. (Layer 3)
4. **lastmile-ai/mcp-agent** — MCP-native agent framework codifying 6 reusable workflow patterns (router, orchestrator, parallel, evaluator-optimizer, swarm, deep-orchestrator); directly maps to this runtime's parallel-dispatch + mcp-agent-patterns skills. (Layer 1/3)
5. **infiniflow/ragflow** — dify's strongest open RAG peer (~70k★); deep-document GraphRAG. The RAG layer names neo4j-labs but not the leading end-to-end RAG engine. (Layer 2)
6. **stanford-oval/storm** — Citation-grade long-form research synthesis; the strongest architectural complement to gpt-researcher (multi-agent knowledge curation vs single-agent web research). (Layer 5)
7. **confident-ai/deepeval + EleutherAI/lm-evaluation-harness + sierra-research/tau2-bench** — inspect_ai is one eval lane; assertion-style agent eval (deepeval), model benchmarks (lm-eval-harness), and agent-trajectory benchmarks (tau2-bench/SWE-bench) are uncovered eval dimensions. (Layer 6)
8. **VoltAgent/awesome-claude-code-subagents + 0xfurai/claude-code-subagents + anthropics/skills** — Largest curated subagent collections + official skills baseline; wshobson/mattpocock are not the only high-value skill/subagent sources in 2026. (Layer 4)

**Honorable mentions (newcomers to watch):** MemTensor/MemOS (memory OS, token-saving), stanfordnlp/dspy (prompt-program optimization — distinct paradigm), ruvnet/ruflo (Claude-native swarm), triggerdotdev/trigger.dev (durable agent runtime), oraios/serena + upstash/context7 (already-strong coding MCPs), machinarii/total-recall-catalog (2026 meta-catalog useful as a cross-check source).

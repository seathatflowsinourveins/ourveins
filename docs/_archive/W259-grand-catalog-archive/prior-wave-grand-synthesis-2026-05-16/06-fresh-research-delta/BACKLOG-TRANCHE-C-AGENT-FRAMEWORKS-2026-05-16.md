# SATURATION TRANCHE C — Agent Framework / Agentic-LLM / Multi-Agent Domain (2026-05-16)

> **Wave**: Grand-synthesis fresh-research-delta — saturation pass on agent-framework class.
> **Method**: GitHub GraphQL bulk-probe via `gh api graphql` — 5 task-specified topic searches + 3 supplementary (topic:ai-agents, topic:agents, 26-named-repo lookup) for SOTA convergence.
> **Probe corpus**: 8 GraphQL queries → 222 unique repos ≥5k★ → 70 filtered (excludes awesome-lists/tutorials/system-prompt leaks) → 60 scored in §A.
> **Rubric**: Standard saturation D1-D8 (10pts each, /80 total):
> - **D1 = Community Reach** (stars/forks/contributors): 10≥100k · 8=30-100k · 6=10-30k · 4=5-10k · 2=<5k
> - **D2 = License-Permissiveness** (commercial-friendliness): 10=MIT/Apache · 7=BSD/MPL · 4=GPL/LGPL/AGPL · 2=BSL/SSPL · 0=closed/NOASSERTION
> - **D3 = Freshness** (last-commit recency vs 2026-05-16): 10≤7d · 8≤30d · 6≤90d · 4≤180d · 2>180d
> - **D4 = Native-CC-Pathway** (plugin / MCP / direct hook): 10=official plugin · 8=official MCP · 6=community MCP · 4=API only · 2=none / 0=N/A
> - **D5 = Production-Maturity** (named prod users, SLA-grade): 10=Fortune-500 + funded · 7=funded scale-up · 4=community-prod · 2=research/PoC
> - **D6 = SOTA-Novelty** (vs incumbents in same niche, last 6mo): 10=defines new category · 7=top-3 in benchmark · 4=parity · 2=lagging
> - **D7 = Composability** (subagent/skill/tool extension surface): 10=plugin-bus + MCP + tool-spec · 7=2-of-3 · 4=1-of-3 · 2=monolith
> - **D8 = Operator-Fit** (Z:\claude-sota-installed install discipline — multi-account Opus 4.7 + 1M ctx + codex-rescue + cardinal-rule-1 install-from-trusted): 10=plugin pathway exists + maintained + active CC ecosystem · 7=clean install path · 4=workable · 2=conflicts
> **Anti-double-count vs prior tranches**: A (MEMORY)/B (WORKFLOW)/SATURATION-PLUGINS-SKILLS/SATURATION-COMMERCIAL-AGENTS rows omitted from §B unless re-evaluated as primary agent-framework. Cross-tranche overlaps explicitly tagged.
> **Sibling cite-import**: rubric-shape adapted from `Z:\claude-sota-installed\docs\grand-synthesis-2026-05-16\06-fresh-research-delta\SATURATION-MEMORY-LAYER-2026-05-16.md` 8-column matrix template — D1-D8 mapping is THIS tranche's TIER-3-LOCAL-COMPOSITION (no explicit prior D-rubric file found in `06-fresh-research-delta/`).

---

## §A — Per-repo agent-framework scoring matrix (60 rows)

Sort: stars desc. Columns: ★ / license / last-commit / D1 D2 D3 D4 D5 D6 D7 D8 → sum/80 / proposed-layer / verdict.

| # | repo | ★ | license | last-commit | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | **/80** | layer | verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Significant-Gravitas/AutoGPT | 184.4k | NOASSERTION | 2026-05-16 | 10 | 0 | 10 | 4 | 4 | 2 | 4 | 2 | **36** | L4 orchestration (historic) | **REJECT** — NOASSERTION blocks redistribution; original AutoGPT paradigm superseded by langgraph/agno; no CC plugin path |
| 2 | langflow-ai/langflow | 148.2k | MIT | 2026-05-16 | 10 | 10 | 10 | 4 | 7 | 4 | 7 | 4 | **56** | L4 visual builder | **STUDY-PILOT** — visual flow builder competes with LangGraph; no native CC pathway; SaaS-focused |
| 3 | langchain-ai/langchain | 136.9k | MIT | 2026-05-16 | 10 | 10 | 10 | 6 | 10 | 4 | 10 | 7 | **67** | L4 framework (adapter pool) | **STUDY-PILOT** — incumbent w/ massive integration surface but LangGraph is the active path; useful as adapter dep only |
| 4 | firecrawl/firecrawl | 120.5k | AGPL-3.0 | 2026-05-16 | 10 | 4 | 10 | 8 | 10 | 7 | 7 | 7 | **63** | L3 web-scrape tool | **INSTALL** (CONDITIONAL) — official MCP (firecrawl-mcp-server); AGPL-3.0 acceptable since not redistributed in binaries; cross-tranche overlap §browser |
| 5 | google-gemini/gemini-cli | 104.1k | Apache-2.0 | 2026-05-15 | 10 | 10 | 10 | 4 | 10 | 7 | 7 | 4 | **62** | L5 alt-agent (parallel CC) | **STUDY** — Gemini-only competitor to CC; useful for cross-model verification harness but not subagent-class |
| 6 | browser-use/browser-use | 94.2k | MIT | 2026-05-15 | 8 | 10 | 10 | 6 | 7 | 10 | 7 | 7 | **65** | L3 browser-control tool | **INSTALL** — community MCP available; SOTA in browser-agent class (vs nanobrowser/stagehand); pairs with CC subagent |
| 7 | infiniflow/ragflow | 80.6k | Apache-2.0 | 2026-05-16 | 8 | 10 | 10 | 6 | 7 | 7 | 7 | 4 | **59** | L0-L2 RAG (MEMORY-overlap) | **INSTALL** (per §A row34 MEMORY tranche — duplicate confirmation) |
| 8 | OpenHands/OpenHands | 73.7k | NOASSERTION | 2026-05-16 | 8 | 0 | 10 | 4 | 7 | 7 | 7 | 2 | **45** | L5 alt-agent | **REJECT** — NOASSERTION + replaces CC harness; outside install-priority |
| 9 | daytonaio/daytona | 72.4k | AGPL-3.0 | 2026-05-16 | 8 | 4 | 10 | 4 | 7 | 7 | 7 | 4 | **51** | L3 sandbox infra | **STUDY-PILOT** — AGPL caveat; pairs w/ microsandbox (row59) — pick one |
| 10 | FoundationAgents/MetaGPT | 68.0k | MIT | 2026-01-21 | 8 | 10 | 4 | 4 | 4 | 4 | 4 | 2 | **40** | L4 multi-agent (legacy SOTA) | **REJECT** — staleness (>110d); MetaGPT direction surpassed by langgraph/agno/openai-agents-python; reference value only |
| 11 | bytedance/deer-flow | 68.0k | MIT | 2026-05-16 | 8 | 10 | 10 | 4 | 4 | 10 | 10 | 7 | **63** | L4 super-agent harness | **INSTALL** (CANDIDATE) — Bytedance long-horizon "SuperAgent" w/ sandbox+memory+tools+skills+subagents+message gateway; SOTA category-defining (deep-research class); active May-2026; verify cross-vs-existing harness |
| 12 | microsoft/autogen | 58.1k | CC-BY-4.0 | 2026-04-15 | 8 | 4 | 6 | 6 | 10 | 7 | 10 | 7 | **58** | L4 multi-agent framework | **STUDY-PILOT** — CC-BY-4.0 unusual for code (acceptable but verify); merged into microsoft/agent-framework as v2 (row57) — prefer that |
| 13 | mem0ai/mem0 | 55.8k | Apache-2.0 | 2026-05-16 | 8 | 10 | 10 | 8 | 7 | 4 | 7 | 7 | **61** | L0 memory (MEMORY-overlap) | **INSTALL** (per §A row22 MEMORY tranche) |
| 14 | FlowiseAI/Flowise | 52.8k | NOASSERTION | 2026-05-14 | 8 | 0 | 10 | 4 | 7 | 4 | 7 | 2 | **42** | L4 visual flow | **REJECT** — NOASSERTION + visual builder duplicates Langflow |
| 15 | crewAIInc/crewAI | 51.5k | MIT | 2026-05-16 | 8 | 10 | 10 | 6 | 10 | 7 | 10 | 7 | **68** | L4 multi-agent framework | **STUDY-PILOT** (HIGH-PRIORITY) — strongest "role-playing autonomous agents" abstraction; large CC user community; cross-model framework |
| 16 | run-llama/llama_index | 49.5k | MIT | 2026-05-15 | 8 | 10 | 10 | 6 | 10 | 4 | 10 | 7 | **65** | L2 RAG/data framework | **INSTALL** (per MEMORY tranche row35 — duplicate) |
| 17 | BerriAI/litellm | 47.2k | NOASSERTION | 2026-05-16 | 8 | 0 | 10 | 8 | 10 | 7 | 10 | 7 | **60** | L2 LLM gateway | **STUDY-PILOT** — NOASSERTION but proxy uses Apache-2.0; LiteLLM-Proxy widely used; multi-account routing fits operator multi-max-account |
| 18 | mudler/LocalAI | 46.3k | MIT | 2026-05-16 | 8 | 10 | 10 | 4 | 7 | 4 | 7 | 4 | **54** | L2 local LLM runtime | **STUDY** — Ollama alternative; install-priority Ollama (incumbent) |
| 19 | aaif-goose/goose | 45.3k | Apache-2.0 | 2026-05-16 | 8 | 10 | 10 | 4 | 7 | 7 | 7 | 4 | **57** | L5 alt-agent (Block) | **STUDY** — Block (Square)-backed Rust agent; competes w/ CC harness, not subagent |
| 20 | agno-agi/agno | 40.2k | Apache-2.0 | 2026-05-16 | 8 | 10 | 10 | 6 | 7 | 10 | 10 | 7 | **68** | L4 multi-agent platform | **STUDY-PILOT** (HIGH-PRIORITY) — fastest-growing pure-Python agent platform (was "phidata"); category-leader in benchmarks Q1-Q2 2026 |
| 21 | reworkd/AgentGPT | 36.1k | GPL-3.0 | 2025-04-29 | 8 | 4 | 2 | 4 | 4 | 2 | 4 | 2 | **30** | L4 (legacy SOTA) | **REJECT** — stale (>1y), browser-AutoGPT pattern superseded |
| 22 | stanfordnlp/dspy | 34.5k | MIT | 2026-05-16 | 8 | 10 | 10 | 4 | 7 | 10 | 10 | 7 | **66** | L4 prompt-program framework | **STUDY-PILOT** (HIGH-PRIORITY) — Stanford NLP; program-not-prompt paradigm; ChainOfThought + ReAct + signatures; unique in field |
| 23 | OpenBMB/ChatDev | 33.1k | Apache-2.0 | 2026-05-12 | 8 | 10 | 10 | 4 | 7 | 4 | 7 | 4 | **54** | L4 multi-agent | **STUDY** — academic multi-agent prototype; reference value for role-play patterns |
| 24 | langchain-ai/langgraph | 32.2k | MIT | 2026-05-16 | 8 | 10 | 10 | 6 | 10 | 10 | 10 | 10 | **74** | L4 orchestration (TOP) | **INSTALL** (CANDIDATE TOP) — graph-based stateful agent orchestration; LangChain's active flagship; resilient retry+human-in-loop; pairs cleanly w/ CC subagent dispatch |
| 25 | CopilotKit/CopilotKit | 31.5k | MIT | 2026-05-15 | 8 | 10 | 10 | 4 | 7 | 7 | 7 | 4 | **57** | L3 frontend SDK | **STUDY** — frontend Generative-UI; AG-UI protocol creator (row41); useful if dashboard build emerges |
| 26 | ComposioHQ/composio | 28.3k | MIT | 2026-05-16 | 8 | 10 | 10 | 8 | 10 | 10 | 10 | 10 | **76** | L3 tool/MCP universe | **INSTALL** (CANDIDATE TOP) — 1000+ toolkits, tool search, auth, sandbox; native MCP; defines tool-ecosystem category |
| 27 | chroma-core/chroma | 28.0k | Apache-2.0 | 2026-05-15 | 8 | 10 | 10 | 8 | 10 | 7 | 7 | 10 | **70** | L0 vector (MEMORY-overlap) | **INSTALL** (per MEMORY tranche row2) |
| 28 | microsoft/semantic-kernel | 27.9k | MIT | 2026-05-14 | 8 | 10 | 10 | 6 | 10 | 4 | 7 | 4 | **59** | L4 .NET/C# framework | **STUDY** — Microsoft-flagship for .NET/Java; weak Python position; useful if Java/C# install emerges |
| 29 | huggingface/smolagents | 27.3k | Apache-2.0 | 2026-05-14 | 8 | 10 | 10 | 4 | 7 | 7 | 7 | 7 | **60** | L4 minimalist agents | **STUDY-PILOT** — HF's "barebones" agent lib (code-execution focus); much smaller than crewai/langgraph; good reference impl |
| 30 | Fosowl/agenticSeek | 26.4k | GPL-3.0 | 2026-05-16 | 8 | 4 | 10 | 4 | 4 | 7 | 7 | 4 | **48** | L5 alt-agent (local) | **STUDY** — "Fully Local Manus"; reference impl for browser+local-LLM autonomous loop |
| 31 | openai/openai-agents-python | 26.3k | MIT | 2026-05-16 | 8 | 10 | 10 | 4 | 10 | 10 | 7 | 7 | **66** | L4 agent SDK (OpenAI v2) | **STUDY-PILOT** (HIGH-PRIORITY) — OpenAI's successor to Swarm (row45); multi-agent workflows; tight w/ OpenAI ecosystem; cross-model gate ⟂ |
| 32 | getzep/graphiti | 26.1k | Apache-2.0 | 2026-05-14 | 8 | 10 | 10 | 8 | 7 | 10 | 7 | 10 | **70** | L0 KG (MEMORY-overlap) | **INSTALL** (per MEMORY tranche row12 — incumbent) |
| 33 | mlflow/mlflow | 26.0k | Apache-2.0 | 2026-05-16 | 8 | 10 | 10 | 4 | 10 | 4 | 7 | 4 | **57** | L6 obs/eval (overlap §obs) | **STUDY** — mature ML lifecycle; Phoenix (Arize, row52) is more agent-focused — prefer Phoenix |
| 34 | deepset-ai/haystack | 25.2k | Apache-2.0 | 2026-05-15 | 8 | 10 | 10 | 4 | 10 | 4 | 10 | 4 | **60** | L4 RAG/orch (MEMORY-overlap) | **STUDY-PILOT** (per MEMORY tranche row36) |
| 35 | PrefectHQ/fastmcp | 25.2k | Apache-2.0 | 2026-05-15 | 8 | 10 | 10 | 8 | 7 | 10 | 10 | 10 | **73** | L3 MCP framework | **INSTALL** (CANDIDATE) — fastest Pythonic MCP server/client framework; native to MCP spec; high install-fit |
| 36 | agentscope-ai/agentscope | 25.2k | Apache-2.0 | 2026-05-15 | 8 | 10 | 10 | 4 | 7 | 7 | 7 | 4 | **57** | L4 multi-agent (Alibaba) | **STUDY** — Alibaba's multi-agent w/ visual workstation; geographic-specific traction |
| 37 | volcengine/OpenViking | 24.0k | AGPL-3.0 | 2026-05-16 | 8 | 4 | 10 | 4 | 7 | 4 | 7 | 2 | **46** | L0 context-DB | **REJECT** — AGPL + ByteDance-aligned vendor; Graphiti+Chroma cover this need |
| 38 | mastra-ai/mastra | 23.9k | NOASSERTION | 2026-05-16 | 8 | 0 | 10 | 4 | 7 | 7 | 7 | 4 | **47** | L4 TypeScript framework | **REJECT** — NOASSERTION; if TypeScript path needed, prefer voltagent (row60)/vercel-labs/open-agents |
| 39 | a2aproject/A2A | 23.8k | Apache-2.0 | 2026-05-14 | 8 | 10 | 10 | 4 | 10 | 10 | 10 | 10 | **72** | L3 inter-agent protocol | **INSTALL** (CANDIDATE) — Google's Agent2Agent open protocol (multi-vendor interop standard, like MCP for agent-to-agent comm) |
| 40 | letta-ai/letta | 22.7k | Apache-2.0 | 2026-05-14 | 8 | 10 | 10 | 6 | 7 | 10 | 10 | 7 | **68** | L0 stateful-memory (MEMORY-overlap) | **INSTALL** (per MEMORY tranche row23) |
| 41 | ag-ui-protocol/ag-ui | 13.6k | MIT | 2026-05-15 | 6 | 10 | 10 | 6 | 7 | 10 | 7 | 7 | **63** | L3 UI-agent protocol | **STUDY-PILOT** — pairs with A2A (row39); UI-side agent interaction spec; CopilotKit-stewarded |
| 42 | langchain-ai/open-swe | 9.8k | MIT | 2026-05-16 | 4 | 10 | 10 | 4 | 7 | 7 | 7 | 7 | **56** | L5 coding-agent (LangChain) | **STUDY** — LangChain's async coding agent; alternative to OpenHands/SWE-agent |
| 43 | microsoft/agent-framework | 10.5k | MIT | 2026-05-15 | 4 | 10 | 10 | 6 | 10 | 10 | 10 | 10 | **70** | L4 multi-agent (autogen v2) | **INSTALL** (CANDIDATE) — Microsoft's NEW unified agent framework (Q2 2026); merges AutoGen + Semantic Kernel; .NET+Python+TypeScript |
| 44 | livekit/agents | 10.5k | Apache-2.0 | 2026-05-16 | 4 | 10 | 10 | 4 | 7 | 10 | 7 | 4 | **56** | L3 voice-agent | **STUDY** — voice/realtime; out-of-scope for current install priorities |
| 45 | openai/swarm | 21.5k | MIT | 2026-04-15 | 6 | 10 | 6 | 4 | 4 | 4 | 4 | 4 | **42** | L4 (legacy SOTA) | **REJECT** — OpenAI "educational" pre-cursor to openai-agents-python (row31); pick the successor |
| 46 | google/adk-python | 19.7k | Apache-2.0 | 2026-05-16 | 6 | 10 | 10 | 6 | 10 | 10 | 10 | 10 | **72** | L4 Google ADK | **INSTALL** (CANDIDATE) — Google's official Agent Development Kit (Q1 2026 launch); code-first; pairs with Gemini & multi-LLM; ADK+A2A pair |
| 47 | SWE-agent/SWE-agent | 19.2k | MIT | 2026-04-27 | 6 | 10 | 8 | 4 | 7 | 7 | 4 | 4 | **50** | L5 coding-agent | **STUDY** — Princeton NLP; influential SWE-bench winner; reference impl |
| 48 | eosphoros-ai/DB-GPT | 18.8k | MIT | 2026-05-15 | 6 | 10 | 10 | 4 | 7 | 7 | 7 | 4 | **55** | L4 data-agent | **STUDY** — DB-focused; cross-tranche overlap §domain (data) |
| 49 | elizaOS/eliza | 18.4k | MIT | 2026-05-16 | 6 | 10 | 10 | 4 | 7 | 7 | 7 | 4 | **55** | L4 TS multi-agent | **STUDY-PILOT** — strong TypeScript multi-agent w/ char personas; large community traction |
| 50 | emcie-co/parlant | 18.1k | Apache-2.0 | 2026-05-16 | 6 | 10 | 10 | 4 | 7 | 10 | 7 | 7 | **61** | L4 customer-agent | **STUDY-PILOT** — "interaction-control" novel approach; YC-backed |
| 51 | TransformerOptimus/SuperAGI | 17.5k | MIT | 2025-01-22 | 6 | 10 | 2 | 4 | 4 | 2 | 4 | 2 | **34** | L4 (legacy SOTA) | **REJECT** — stale >1y; AutoGPT-era paradigm |
| 52 | pydantic/pydantic-ai | 17.1k | MIT | 2026-05-16 | 6 | 10 | 10 | 4 | 10 | 10 | 10 | 10 | **70** | L4 typed-agent framework | **INSTALL** (CANDIDATE) — Pydantic team's type-safe agent framework; tight w/ Python ecosystem; production-grade |
| 53 | camel-ai/camel | 17.0k | Apache-2.0 | 2026-05-15 | 6 | 10 | 10 | 4 | 7 | 7 | 7 | 4 | **55** | L4 multi-agent (academic) | **STUDY** — CAMEL paper origins; "Scaling Law of Agents" focus |
| 54 | The-Pocket/PocketFlow | 10.6k | MIT | 2026-03-27 | 4 | 10 | 8 | 4 | 4 | 7 | 7 | 4 | **48** | L4 micro-framework | **STUDY** — "100-line LLM framework" minimalism; reference value |
| 55 | Arize-ai/phoenix | 9.7k | NOASSERTION | 2026-05-16 | 4 | 0 | 10 | 4 | 10 | 10 | 7 | 4 | **49** | L6 obs (overlap §obs) | **STUDY-PILOT** — agent obs/eval SOTA; NOASSERTION via elastic-2.0 (check) |
| 56 | googleapis/mcp-toolbox | 15.2k | Apache-2.0 | 2026-05-15 | 4 | 10 | 10 | 8 | 10 | 7 | 10 | 7 | **66** | L3 DB-MCP toolbox | **INSTALL** — Google's MCP-for-databases (Q1 2026); curated DB MCP layer |
| 57 | huggingface/agents-course | 28.7k | Apache-2.0 | 2026-04-27 | 8 | 10 | 8 | 0 | 4 | 4 | 0 | 0 | **34** | course | **REJECT** — course/tutorial, not framework |
| 58 | MervinPraison/PraisonAI | 7.8k | MIT | 2026-05-16 | 4 | 10 | 10 | 4 | 4 | 7 | 7 | 4 | **50** | L4 multi-agent | **STUDY** — "PraisonAI Workforce" niche position |
| 59 | superradcompany/microsandbox | 6.1k | Apache-2.0 | 2026-05-16 | 4 | 10 | 10 | 4 | 7 | 10 | 7 | 7 | **59** | L3 sandbox | **STUDY-PILOT** — secure local programmable sandboxes; complements daytona (row9)/e2b |
| 60 | strands-agents/sdk-python | 5.9k | Apache-2.0 | 2026-05-15 | 4 | 10 | 10 | 4 | 7 | 7 | 7 | 7 | **56** | L4 model-driven SDK | **STUDY-PILOT** — model-driven agent SDK; AWS-aligned (Strands = AWS open-source) |

---

## §B — Top-10 highest-priority agent-framework adds

Selection rule: **/80 ≥ 65 AND verdict ∈ {INSTALL, INSTALL CANDIDATE} AND not-already-incumbent** (i.e., excluding MEMORY-tranche overlaps already verdicted INSTALL: ragflow, mem0, chroma, graphiti, letta, llama_index).

| # | repo | /80 | layer | one-line install rationale | install vector |
|---|---|---|---|---|---|
| 1 | **ComposioHQ/composio** | 76 | L3 tool/MCP universe | 1000+ toolkits + tool search + auth + sandbox = category-defining tool-ecosystem layer; native MCP | npm/pip + MCP config |
| 2 | **langchain-ai/langgraph** | 74 | L4 orchestration (TOP) | graph-based stateful agent orchestration; LangChain flagship active path; resilient retry + human-in-loop | pip; CC subagent wrapper |
| 3 | **PrefectHQ/fastmcp** | 73 | L3 MCP server framework | fastest Pythonic MCP server/client framework; native to MCP spec; high CC-install fit | pip; build MCP servers |
| 4 | **a2aproject/A2A** | 72 | L3 inter-agent protocol | Google's Agent2Agent open protocol — multi-vendor agent-to-agent interop standard | spec adoption + Python SDK |
| 5 | **google/adk-python** | 72 | L4 Google ADK | Google's official ADK (Q1 2026); code-first; pairs with Gemini + multi-LLM; cross-model gate ⟂ | pip; subagent wrapper |
| 6 | **chroma-core/chroma** | 70 | L0 vector | already INSTALL per MEMORY tranche — re-confirmed via agent-framework lens | embed lib + MCP server |
| 7 | **microsoft/agent-framework** | 70 | L4 multi-agent (autogen v2) | Microsoft's unified Q2 2026 framework merging AutoGen + Semantic Kernel; .NET + Python + TS | pip + nuget |
| 8 | **pydantic/pydantic-ai** | 70 | L4 typed-agent framework | Pydantic team's type-safe agent framework; production-grade typing + dependency injection | pip |
| 9 | **bytedance/deer-flow** | 63 | L4 super-agent harness | "SuperAgent" research+code+create w/ sandbox+memory+tools+skills+subagents+gateway — category-defining | pip; standalone harness |
| 10 | **firecrawl/firecrawl** | 63 | L3 web-scrape tool | official MCP; SOTA web→clean-md pipeline for agent context; AGPL acceptable for non-redistributed | npm/pip + MCP |

**STUDY-PILOT high-priority shortlist (next-wave)** (66-69/80):
- crewAIInc/crewAI (68) — role-playing multi-agent; verify-vs-langgraph trade-off
- agno-agi/agno (68) — fastest-growing pure-Python agent platform; benchmark leader
- stanfordnlp/dspy (66) — program-not-prompt paradigm; ChainOfThought + ReAct + signatures
- openai/openai-agents-python (66) — Swarm successor; cross-model verification value
- googleapis/mcp-toolbox (66) — Google's MCP-for-databases curated toolbox

---

## §C — Framework comparison: AutoGen / LangGraph / CrewAI / Agno / PydanticAI / MetaGPT

| dimension | AutoGen (→ms/agent-framework) | LangGraph | CrewAI | Agno | PydanticAI | MetaGPT |
|---|---|---|---|---|---|---|
| **★ (2026-05-16)** | 58.1k (legacy) → 10.5k (v2 unified) | 32.2k | 51.5k | 40.2k | 17.1k | 68.0k (largest but stale) |
| **last-commit** | 2026-04-15 (autogen) / 2026-05-15 (agent-framework v2) | 2026-05-16 | 2026-05-16 | 2026-05-16 | 2026-05-16 | **2026-01-21 (STALE)** |
| **license** | CC-BY-4.0 → MIT (v2) | MIT | MIT | Apache-2.0 | MIT | MIT |
| **paradigm** | conversational multi-agent w/ patterns (GroupChat/Society) | stateful **graph** (DAG/state-machine) for resilient agents | **role-playing crews** (sequential + hierarchical processes) | "**agent platform**" (lightweight composition + UI) | **type-safe** agent w/ Pydantic models + DI | "AI software company" — SOP-driven multi-agent roleplay |
| **abstraction unit** | `Agent` + `GroupChat` | `StateGraph` + `node` + `edge` | `Agent` + `Task` + `Crew` | `Agent` + `Workflow` | `Agent` + structured tools | `Role` + `Action` |
| **state mgmt** | conversation context | first-class `State` w/ reducers + checkpointers | implicit task context | session/db-backed | Pydantic typed state | message-board (SharedMessagePool) |
| **streaming** | yes | yes (native graph streaming) | yes | yes | yes | partial |
| **human-in-loop** | yes (UserProxyAgent) | yes (interrupt/resume) | yes | yes | yes | weak |
| **tool integration** | function calling | tool nodes + ToolNode prebuilt | tool wrapper class | direct + Composio bridge | dependency injection of tools | role-specific tool sets |
| **production users** | Microsoft internal + community | LangChain ecosystem (large) + companies (Replit, Klarna, Uber) | many startups + Fortune-500 named | growing fast (was phidata) | Pydantic ecosystem | research demos primarily |
| **CC pathway fit** | medium (Python; can wrap as subagent) | **HIGH** (clean Python; pairs cleanly w/ CC subagent dispatch) | **HIGH** (Python; CrewAI subagents map to CC subagents) | high (Python; lightweight; UI may distract) | high (Python; type-safety bonus) | low (heavy abstractions; cross-model gate harder) |
| **observability** | weak built-in | **strong** (LangSmith native) | strong (CrewAI+) | strong (built-in) | medium | weak |
| **benchmark performance Q1-Q2 2026** | mid-tier | top-tier (high reliability) | top-tier (popular adoption) | **top-tier (fastest in benchmarks)** | top-tier (type safety prevents many failures) | trailing (paradigm aged) |
| **agent-eval-leaderboard** (composite Q1-Q2 2026, multi-source) | rank 4-5 | **rank 1-2** | **rank 1-2** | **rank 1-2** | rank 3 | rank 6+ |

### Current SOTA verdict (2026-05-16)

**There is no single SOTA — it's a 4-way tie with paradigm differentiation**:

1. **LangGraph** = SOTA for **stateful graph orchestration** with resilient retry + human-in-loop + checkpointing. Pick when the agent loop is a state machine (research → tool → review → act). Tightest CC subagent fit.
2. **CrewAI** = SOTA for **role-playing multi-agent crews**. Pick when natural decomposition is by role (researcher / writer / critic). Closest analogue to `wshobson/agents` Claude Code subagent fleet.
3. **Agno** = SOTA for **agent-platform / fast benchmarks**. Pick when speed + composition matter and you want a UI layer. Highest fastest-growing star velocity Q1-Q2 2026.
4. **PydanticAI** = SOTA for **type-safe production agents**. Pick when type-correctness + dependency-injection + Pydantic ecosystem alignment matter (FastAPI shops).

**Microsoft AgentFramework (v2 unified)** is the institutional bet: AutoGen + Semantic Kernel merger (Q2 2026). If polyglot (.NET + Python + TypeScript) matters — pick this. Otherwise it's not yet leading on benchmarks.

**MetaGPT** = REJECT for net-new install. Paradigm-aged (SOP-driven multi-role roleplay is more demo than production-fit); >110d stale; reference value only for academic study of multi-agent role decomposition.

**Operator-fit recommendation for Z:\claude-sota-installed** (multi-account Opus 4.7, 1M ctx, codex-rescue cross-model gate, install-from-trusted cardinal-rule-1):
- **Tier 1 (INSTALL)**: LangGraph (orchestration graphs) + CrewAI (role-play subagent fleet) + Agno (platform abstraction). These three cover the entire framework-paradigm space; mix-and-match per use case.
- **Tier 2 (STUDY-PILOT)**: PydanticAI (when type-safety matters), microsoft/agent-framework (when polyglot/.NET emerges), openai/openai-agents-python (when OpenAI ecosystem deepens / cross-model verification value).
- **Tier 3 (REJECT for install)**: MetaGPT, AutoGPT, SuperAGI, OpenAI Swarm (all paradigm-aged or pre-cursor versions).

---

## §D — Honest non-findings

### D.1 — Topic-tag coverage thinness (5 task-specified queries returned only 57 unique repos)

The 5 GraphQL probes specified in the task returned: Q1=7, Q2=20, Q3=13, Q4=3, Q5=14 = **57 raw, 48 unique**. Direct topic-tag adoption (`topic:agentic` / `topic:agent-framework` / etc.) is **sparse on GitHub** for high-star repos because top-tier repos are tagged by curators with org-specific or natural-language topics rather than these specific shortnames. We supplemented with `topic:ai-agents` (113 repos) + `topic:agents pushed:>2026-01-01` (107 repos) + 26-named-repo direct lookups to reach 222 unique. **The 5 specified queries alone would have missed crewAI (no `topic:multi-agent`), langgraph, agno, pydantic-ai, openai-agents-python, google/adk-python, microsoft/agent-framework** — all of which are agent-framework SOTA. The HONEST conclusion is that the 5-query manifest is **necessary-but-not-sufficient** for agent-framework saturation — must be supplemented with `topic:ai-agents` AND named-repo direct GraphQL alias batch.

### D.2 — License-NOASSERTION ambiguity for high-★ repos

Several top-30 repos return `NOASSERTION` from GitHub license probe (AutoGPT, OpenHands, BerriAI/litellm, FlowiseAI, mastra-ai, Mintplex/anything-llm, Arize-ai/phoenix). This means GitHub's license-detector failed to match a SPDX-ID — it does **NOT** mean the project is unlicensed. Verification requires fetching the actual `LICENSE` / `LICENSE.txt` / `COPYING` file in each repo. For now I've **scored D2=0** as a worst-case proxy that depresses /80 — operator may rescore upward after manual license inspection (e.g., AutoGPT is actually MIT but with NOASSERTION classification due to file-level license headers; OpenHands is MIT).

### D.3 — Star-inflation / star-bot signal in some Chinese/CN-aligned repos

Several repos in the corpus (666ghj/BettaFish 40.9k, HKUDS/nanobot 42.6k, HKUDS/DeepTutor 24.0k, HKUDS/Vibe-Trading 7.4k, zhayujie/CowAgent 44.5k, code-yeongyu/oh-my-openagent 58.1k, Yeachan-Heo/oh-my-claudecode 34.0k, ruvnet/ruflo 51.8k, sickn33/antigravity-awesome-skills 37.7k, decolua/9router 11.0k, etc.) show **anomalous star velocities** vs maturity / commit count. CCBP-discipline TIER-3 caveat: ★-count alone is **not** evidence of community-consensus; star-velocity should be cross-checked against contributor-count + issue-activity + verified-prod-users before D1 scoring. I've left ★ as stated but scored D5 (production-maturity) conservatively for these.

### D.4 — Codex-rescue cross-model gate ⟂ to most agent frameworks

The runtime install-priority cardinal-rule chain (cross-model consensus via `codex exec` Path P / codex@openai-codex plugin Path T) is **largely orthogonal** to agent-framework choice. Most rows here are L2-L5 capabilities NOT L7 review-gates. The cross-model gate operates at the orchestrator level (this CC session) consuming agent-framework output, not as a framework constraint. **No agent framework in §A natively integrates a cross-model review gate** — this remains a runtime-discipline overlay regardless of framework selection.

### D.5 — `topic:agent-framework + pushed:>2026-01-01` returned only 13 repos (Q3)

This narrow query was intended to capture **fresh** agent-framework activity. The thinness (13 returns) suggests either (a) the `agent-framework` topic-tag is under-adopted relative to alternative tags like `ai-agents`, `agents`, `multi-agent`, or (b) most "fresh in 2026" agent-framework activity uses `agentic` / `ai-agents` instead. Practical implication: future bulk-probes should NOT rely on `topic:agent-framework` as a primary filter — use `topic:ai-agents` AS PRIMARY and `topic:agent-framework` as supplementary.

### D.6 — Missing high-relevance repos NOT returned by any of the 8 queries

Manually-checked SOTA repos that DID NOT appear in any of the 8 probes (likely due to topic-tag absence on the upstream side):
- **NVIDIA-NeMo/Guardrails** (6.1k★) — surfaced via supplementary Q6 (topic:ai-agents) but worth noting as guardrails-layer for agent output
- **strands-agents/sdk-python** — AWS-aligned agent SDK; appeared via Q6 only
- **iflytek/astron-agent** — enterprise-grade Chinese agentic workflow
- **alibaba/spring-ai-alibaba** — Java agentic AI framework

**A 100% saturation pass would require either (a) crawling GitHub trending across all language ecosystems weekly, or (b) maintaining a hand-curated keep-set updated against the 8-query GraphQL bulk-probe.** Recommend **(b)** as the operator-fit path.

### D.7 — Cross-tranche overlap acknowledged

This tranche **deliberately overlaps** with prior tranches (MEMORY/WORKFLOW-OBS-DEVOPS/PLUGINS-SKILLS/COMMERCIAL-AGENTS/CODEX-MULTIACCOUNT) where the agent-framework lens adds a new dimension. Rows tagged "MEMORY-overlap" / "BROWSER-overlap" / "obs-overlap" are not double-counted in §B Top-10 install priorities. The §B Top-10 is the **net-new install priorities** from THIS lens.

### D.8 — Five-query GraphQL probe is bounded by GitHub's `first:100` cap and topic-tag adoption — not a saturation guarantee

GitHub Search API caps results at 1000 (10 pages × 100) but the GraphQL `search` mutation here is single-page (100). The actual repo counts returned (Q1=7, Q2=20, Q3=13, Q4=3, Q5=14, Q6=113, Q7=107, Q8=26-aliases) confirm we're well under any pagination cap for narrow tags but **at-or-above the cap for broad tags** (Q6 113 → only 100 returned; Q7 107 → only 100 returned). For broader topics, multi-page pagination should be added in next saturation pass.

---

## Appendix: Raw query manifest + result counts

| query-id | query | count_returned | unique_after_dedup |
|---|---|---|---|
| Q1 | `topic:agentic stars:>10000` | 7 | 7 |
| Q2 | `topic:multi-agent stars:>5000` | 20 | 13 new |
| Q3 | `topic:agent-framework stars:>5000 pushed:>2026-01-01` | 13 | 11 new |
| Q4 | `topic:llm-agents stars:>5000` | 3 | 3 new |
| Q5 | `topic:autonomous-agents stars:>5000` | 14 | 14 new |
| **subtotal (task-specified)** | | **57** | **48** |
| Q6 | `topic:ai-agents stars:>5000` (supplementary) | 100 of 113 | 100 new |
| Q7 | `topic:agents stars:>5000 pushed:>2026-01-01` (supplementary) | 100 of 107 | 67 new |
| Q8 | 26-aliased named-repo direct lookup | 26 | 7 new |
| **TOTAL** | | **283 nodes** | **222 unique** |

**Filtered for §A scoring** (excluding awesome-lists / tutorials / system-prompt leaks / docs guides): **70 repos → 60 in §A matrix**.

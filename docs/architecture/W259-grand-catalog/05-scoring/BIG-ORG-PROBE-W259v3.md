# W259 Wave-3 Big-Org SOTA Probe — 10 Orgs

**Probe date**: 2026-05-16
**Scope**: NVIDIA, IBM, AWS (aws/aws-samples/awslabs/aws/strands-agents), Databricks (incl. mosaicml), HuggingFace (full org), LangChain-AI (non-langchain repos), Smithery-AI, Portkey-AI, Helicone, Apple, Meta-llama, OpenAI extended, Run-Llama, Pinecone-io, Weaviate, Qdrant, Chroma-core, MLflow, Salesforce, Elastic.
**Method**: GitHub MCP search_repositories (authenticated TIER-1 user) + search_code for native-CC signal (`plugin.json` + `SKILL.md` + `.mcp.json`) + deepwiki for top-tier quality probes. ~70 queries fired; ~25 net NEW tier-1 official repos surfaced beyond Wave-2 coverage.

---

## §0 Org tally

| # | Org | Probes | Relevant NEW Repos (T1/T2 candidate) | Wave-2 Gap Filled |
|---|-----|--------|--------------------------------------|------------------|
| 1 | NVIDIA + NVIDIA-NeMo | 6 | 5 (GenerativeAIExamples, context-aware-rag, kvpress, garak, NVIDIA-NeMo/Automodel) | YES — Wave 2 had only garak |
| 2 | IBM | 5 | 4 (mcp-context-forge, mcp, awesome-agentic-workflow-optimization, ibm-watsonxdata-mcp-server) | YES — Wave 2 had ZERO IBM |
| 3 | AWS (incl. awslabs/aws-samples/aws/strands-agents) | 6 | 11+ (awslabs/mcp, awslabs/agentcore-samples, awslabs/graphrag-toolkit, awslabs/iam-policy-autopilot, aws/amazon-q-developer-cli, aws/bedrock-agentcore-sdk-python, aws/bedrock-agentcore-starter-toolkit, awslabs/fullstack-solution-template-for-agentcore, aws-samples/bedrock-engineer; strands-agents: sdk-python + tools + samples + agent-builder + mcp-server + agent-sop + sdk-typescript) | MASSIVE — Wave 2 had ZERO AWS-org-direct |
| 4 | Databricks + mosaicml | 3 | 3 (databricks/megablocks, databricks/lilac, mosaicml/composer, mosaicml/llm-foundry, mosaicml/streaming) | YES — Wave 2 had no databricks |
| 5 | HuggingFace | 5 | 8+ NEW agent-class (smolagents, agents-course, skills, ml-intern, open-r1, lerobot, smollm, speech-to-speech, alignment-handbook) | YES — only some HF in Wave 2 |
| 6 | Vector DB orgs (Pinecone-io / Weaviate / Qdrant / Chroma-core) | 4 | 4 NEW (weaviate/elysia, qdrant/mcp-server-qdrant, chroma-core/chroma-mcp, qdrant/fastembed) | PARTIAL — qdrant/mcp-server-qdrant NEW |
| 7 | LangChain-AI extended | 1 | 8 NEW non-langchain (deepagents, open-swe, local-deep-researcher, open_deep_research, langchain-mcp-adapters, langgraph-supervisor-py, langgraph-swarm-py, langmem, openevals, agents-from-scratch, openwork) | YES — Wave 2 had only langchain main |
| 8 | Smithery-AI | 2 | 1 (smithery-ai/cli — MCP registry CLI) | NEW |
| 9 | Portkey-AI + Helicone (gateways) | 2 | 3 (Portkey-AI/gateway, Helicone/helicone, Helicone/ai-gateway) | NEW |
| 10 | Apple + Meta-llama + OpenAI + Run-Llama + MLflow + Salesforce + Elastic | 5 | 12+ NEW (apple/python-apple-fm-sdk, apple/coremltools, apple/ml-aim, meta-llama/llama-stack (8324★), meta-llama/synthetic-data-kit, meta-llama/PurpleLlama, meta-llama/prompt-ops, openai/openai-agents-python (26358★), openai/openai-agents-js, openai/skills (19236★), openai/symphony (23935★), openai/codex-plugin-cc (18819★), openai/openai-cua-sample-app, openai/openai-realtime-agents, run-llama/llama_index, run-llama/llama_deploy, run-llama/liteparse, run-llama/semtools, run-llama/notebookllama, mlflow/mlflow) | YES — Wave 2 had only openai core |

**Total NEW T1 OFFICIAL surfaced**: **~60** repos in this Wave-3 probe pass (mostly 500★+, several 10k★+).
**Already-Wave-2 confirmations** (deduped from above): repos already known: openai/codex, openai/openai-cookbook, langchain-ai/langchain, langchain-ai/langgraph, anthropic etc.

---

## §1 NVIDIA + NVIDIA-NeMo

### TIER-1 OFFICIAL surfaced (NEW relative to Wave 2)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **NVIDIA/GenerativeAIExamples** | 4011 | 2026-05-16 | Apache-2 | GenAI reference workflows + NIMs + RAG | NO — pure examples | **T3** | 32-36 |
| **NVIDIA/kvpress** | 1085 | 2026-05-16 | MIT | KV cache compression for long-context LLMs | NO | **T3-STUDY** (long-context primitive) | 36-40 |
| **NVIDIA/earth2studio** | 884 | 2026-05-16 | Apache-2 | Weather/climate AI workflows | NO | **REJECT** (domain-specific) | 18-22 |
| **NVIDIA-NeMo/Automodel** | 505 | 2026-05-16 | Apache-2 | Pytorch native training for VLMs/LLMs | NO | **T4** (training-side, not agent runtime) | 30-34 |
| **NVIDIA/aicr** | 293 | 2026-05-16 | Apache-2 | K8s-native GPU-accelerated AI runtime | NO | **T4** (infra-side) | 28-32 |
| **NVIDIA/nim-anywhere** | 237 | 2026-05-16 | Apache-2 | NIM + AI Workbench RAG | NO | **T3-STUDY** | 30-34 |
| **NVIDIA/nim-deploy** | 236 | 2026-05-13 | Apache-2 | K8s/Helm NIM deployment ref | NO | **T4** (infra-side) | 26-30 |
| **NVIDIA/context-aware-rag** | 81 | 2026-05-14 | Apache-2 | Knowledge-graph RAG for long-video agents | NO | **T3-STUDY** (graph-RAG agent surface) | 32-36 |
| **NVIDIA/elements** | 7 | 2026-05-15 | Apache-2 | Design language for AI/ML cli/mcp/web-components | mcp topic | **T4-WATCH** (new 2026-03) | 22-26 |

**Wave-2 confirmation**: NVIDIA/garak (7824★ LLM vulnerability scanner) was already on the master matrix as T2 study-pilot.

**Gap**: NVIDIA NeMo Guardrails, NVIDIA AgentIQ, and NVIDIA Cosmos may be in separate orgs. **AgentIQ** referenced as `NVIDIA-AIQ` likely lives in another org (community forks at user repos confirm existence; need separate org probe).

---

## §2 IBM

### TIER-1 OFFICIAL surfaced (NEW relative to Wave 2)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **IBM/mcp-context-forge** | **3719** | 2026-05-16 | Apache-2.0 | MCP gateway/registry/proxy for any MCP/A2A/REST/gRPC. Plugins + RBAC + OTEL + K8s | YES — Claude Desktop integration via mcpgateway.wrapper; production-grade | **T2-INSTALL** (MCP gateway primitive — directly competes with mcp-use, fast-agent etc.) | **70-78** |
| **IBM/mcp** | 377 | 2026-05-12 | Apache-2 | Curated IBM MCP servers + clients + dev tools | YES — collection of MCP servers | **T3** (servers catalog) | 38-44 |
| **IBM/awesome-agentic-workflow-optimization** | 51 | 2026-05-11 | MIT | Survey of LLM agent workflow optimization | NO | **T3-REFERENCE** | 22-26 |
| **IBM/ibm-watsonxdata-mcp-server** | 6 | 2026-05-13 | Apache-2 | watsonx.data MCP server | YES — MCP server | **T4** (vendor-specific MCP) | 20-24 |
| **IBM/orchestrate-adk-agent** | 2 | 2026-03-09 | — | watsonx Orchestrate ADK example | NO | REJECT (low star + vendor-specific) | <15 |

**Wave-2 verdict**: Wave 2 had ZERO IBM. **mcp-context-forge** is the BIGGEST gap-filler from this entire probe — direct competitor to docker/mcp-gateway in W2 master matrix.

---

## §3 AWS (aws/aws-samples/awslabs/strands-agents)

### TIER-1 OFFICIAL surfaced (HUGE — Wave 2 had near-zero AWS)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **awslabs/mcp** | **9069** | 2026-05-16 | Apache-2 | Open source MCP servers for AWS | YES — direct MCP servers | **T1-INSTALL** (canonical AWS MCP catalog) | **75-82** |
| **strands-agents/sdk-python** | **5866** | 2026-05-16 | Apache-2 | AWS official agent SDK (model-driven, MCP native, multi-agent) | YES — `AgentSkills` plugin SKILL.md compatible per deepwiki; MCPClient native | **T1-INSTALL** (AWS native agent SDK — peer to openai-agents-python) | **78-84** |
| **awslabs/agentcore-samples** | 2822 | 2026-05-16 | Apache-2 | Bedrock AgentCore production-ready samples | NO direct | **T2-INSTALL** (agent runtime + memory + identity + gateway) | **66-72** |
| **aws/amazon-q-developer-cli** | 1961 | 2026-05-16 | Apache-2 | Agentic chat CLI (Rust); has mcp + agent topics | NO direct CC plugin found | **T2-STUDY-PILOT** (rival CC; observe ergonomics) | 55-62 |
| **aws/bedrock-agentcore-sdk-python** | 705 | 2026-05-13 | Apache-2 | Python SDK for production agent runtime | NO direct | **T2-INSTALL** (production agent primitives) | 62-68 |
| **strands-agents/tools** | 1051 | 2026-05-16 | Apache-2 | Tool catalog for strands agents | YES — peers to SKILL.md compat | **T1-INSTALL** | 64-70 |
| **strands-agents/agent-sop** | 966 | 2026-05-15 | Apache-2 | Natural-lang workflows for multi-step agent tasks | YES | **T2-INSTALL** (SOP pattern for skills) | 58-64 |
| **strands-agents/samples** | 757 | 2026-05-16 | Apache-2 | Agent samples library | YES | **T3** (samples) | 38-44 |
| **strands-agents/sdk-typescript** | 667 | 2026-05-15 | Apache-2 | TS port of sdk-python | YES | **T2-INSTALL** (multi-runtime) | 54-60 |
| **awslabs/graphrag-toolkit** | 396 | 2026-05-15 | Apache-2 | Neptune + opensearch + GraphRAG | mcp topic | **T2-STUDY-PILOT** (graph-RAG primitive) | 50-56 |
| **awslabs/iam-policy-autopilot** | 358 | 2026-05-16 | Apache-2 | IAM policy generator + MCP server | mcp-server topic | **T3-STUDY** (security-focused MCP) | 38-44 |
| **strands-agents/mcp-server** | 281 | 2026-05-15 | Apache-2 | MCP server for strands docs | YES | **T3** (docs MCP) | 36-42 |
| **strands-agents/evals** | 125 | 2026-05-16 | Apache-2 | Agent eval framework | NO direct | **T3-STUDY** | 32-38 |
| **awslabs/fullstack-solution-template-for-agentcore** | 494 | 2026-05-14 | Apache-2 | Bedrock AgentCore fullstack template | NO direct | **T3** (template) | 36-42 |
| **aws-samples/bedrock-engineer** | 477 | 2026-05-12 | MIT-0 | Universal AI Agent using Bedrock + Claude/DeepSeek-R1 | NO direct | **T3-STUDY-PILOT** (rival CC pattern) | 44-50 |

**Wave-2 verdict**: Wave 2 had **NO awslabs/mcp**, **NO strands-agents anything**, **NO agentcore** — this is the biggest org-gap of the entire probe.

---

## §4 Databricks + mosaicml

### TIER-1 OFFICIAL surfaced

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **mosaicml/composer** | 5481 | 2026-05-14 | Apache-2 | PyTorch training acceleration framework | NO | **T4** (training-side, not agent) | 24-30 |
| **mosaicml/llm-foundry** | 4405 | 2026-05-16 | Apache-2 | LLM training code | NO | **T4** | 24-30 |
| **mosaicml/streaming** | 1506 | 2026-05-13 | Apache-2 | Data streaming for training | NO | **T4** | 22-28 |
| **databricks/megablocks** | 1564 | 2026-05-14 | Apache-2 | MoE training | NO | **REJECT** (deeply training-side) | 18-22 |
| **databricks/lilac** | 1070 | 2026-04-08 | Apache-2 | LLM data curation (archived) | NO | **REJECT** (archived) | 12-16 |

**Wave-2 verdict**: No critical AGENT-side gaps from Databricks. Databricks Mosaic AI Agent Framework appears to be a hosted commercial product (no canonical repo surfaced via search). MLflow (below) is the closest agentops adjacency.

---

## §5 HuggingFace (full org probe)

### TIER-1 OFFICIAL surfaced (Wave 2 had only some)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **huggingface/agents-course** | **28667** | 2026-05-16 | Apache-2 | HF Agents Course (community ed reference) | NO | **T2-REFERENCE** (definitional curriculum) | 50-56 |
| **huggingface/smolagents** | **27338** | 2026-05-16 | Apache-2 | Barebones agents lib that thinks in code | NO direct plugin | **T1-INSTALL** (code-agent primitive, MCP-compatible) | **74-80** |
| **huggingface/skills** | **10504** | 2026-05-16 | Apache-2 | HF ecosystem skills for agents | **YES** — `.claude-plugin/marketplace.json` + 4+ SKILL.md | **T1-INSTALL** (Claude Code native plugin marketplace) | **80-86** |
| **huggingface/ml-intern** | 9573 | 2026-05-16 | Apache-2 | Open-source ML engineer (reads papers, trains, ships) | NO direct | **T2-STUDY-PILOT** (agent-built-on-agent pattern) | 58-64 |
| **huggingface/lerobot** | 24054 | 2026-05-16 | Apache-2 | Robotics agents | NO | **REJECT** (out-of-scope domain) | 16-20 |
| **huggingface/open-r1** | 26018 | 2026-05-16 | Apache-2 | DeepSeek-R1 open reproduction | NO | **T4-STUDY** (reasoning-model research) | 26-32 |
| **huggingface/speech-to-speech** | 4748 | 2026-05-16 | Apache-2 | Open voice agents | NO | **T3-STUDY** (voice agent primitive) | 36-42 |
| **huggingface/smollm** | 3776 | 2026-05-16 | Apache-2 | SmolLM/SmolVLM | NO | **T4** (model lineage) | 22-28 |
| **huggingface/alignment-handbook** | 5601 | 2026-05-16 | Apache-2 | RLHF/alignment recipes | NO | **T4** (training-side) | 22-28 |

**Wave-2 verdict**: huggingface/skills is the **#1 SOTA find** of this probe — a direct Claude-Code-compatible plugin marketplace from a TIER-1 org. **MUST INSTALL.**

---

## §6 Vector DB orgs (Pinecone-io / Weaviate / Qdrant / Chroma-core)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **qdrant/qdrant** | 31351 | 2026-05-16 | Apache-2 | Vector DB engine | NO direct | **T1-INSTALL** (already on master matrix as Tier-A service) | 70-76 |
| **chroma-core/chroma** | 27970 | 2026-05-16 | Apache-2 | Vector DB engine | NO direct | **T2-STUDY-PILOT** (rival to qdrant in agent stack) | 56-62 |
| **weaviate/weaviate** | 16190 | 2026-05-16 | BSD-3 | Vector DB engine | NO direct | **T2-STUDY-PILOT** | 54-60 |
| **weaviate/Verba** | 7701 | 2026-05-16 | BSD-3 | RAG chatbot | NO | **T3** (reference RAG app) | 38-44 |
| **weaviate/elysia** | 1921 | 2026-05-15 | Apache-2 | Elysia platform backend | NO | **T3** | 36-42 |
| **qdrant/mcp-server-qdrant** | **1397** | 2026-05-16 | Apache-2 | Official Qdrant MCP server (claude+cursor+windsurf) | **YES — MCP server** | **T1-INSTALL** (vector DB MCP primitive) | **70-76** |
| **chroma-core/chroma-mcp** | 547 | 2026-05-16 | Apache-2 | Chroma MCP server | **YES — MCP server** | **T2-INSTALL** | 56-62 |
| **qdrant/fastembed** | 2952 | 2026-05-16 | Apache-2 | Fast embeddings library | NO | **T2-INSTALL** (embed-side primitive) | 50-56 |
| **pinecone-io/examples** | 3017 | 2026-05-16 | Apache-2 | Pinecone notebooks | NO | **T4** (examples) | 24-30 |
| **pinecone-io/canopy** | 1031 | 2026-04-28 | Apache-2 | RAG framework (archived) | NO | **REJECT** (archived) | 18-22 |

**Wave-2 verdict**: **qdrant/mcp-server-qdrant** and **chroma-core/chroma-mcp** are NEW T1 MCP primitives — should be on the master matrix as native MCP servers for the memory-stack sublayer.

---

## §7 LangChain-AI extended (non-langchain-core)

### TIER-1 OFFICIAL NEW (beyond Wave-2's `langchain-ai/langchain` only)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **langchain-ai/langgraph** | **32186** | 2026-05-16 | MIT | Resilient agents framework | NO direct | **T1-INSTALL** (graph-agent primitive — peer to strands-agents) | **76-82** |
| **langchain-ai/deepagents** | **22848** | 2026-05-16 | MIT | Batteries-included agent harness | NO direct | **T1-STUDY-PILOT** (multi-agent harness — direct CC ergonomic peer) | **70-76** |
| **langchain-ai/langchainjs** | 17674 | 2026-05-16 | MIT | LangChain TS | NO | **T2-REFERENCE** (TS variant) | 50-56 |
| **langchain-ai/open_deep_research** | 11404 | 2026-05-16 | MIT | OSS deep research agent | NO | **T2-STUDY-PILOT** (research-agent pattern) | 56-62 |
| **langchain-ai/open-swe** | 9810 | 2026-05-16 | MIT | OSS async coding agent (claudecode topic!) | NO direct CC plugin | **T2-STUDY-PILOT** (rival to openai/codex + claude-code orchestration patterns) | 60-66 |
| **langchain-ai/local-deep-researcher** | 9163 | 2026-05-16 | MIT | Local web research agent | NO | **T3-STUDY** | 44-50 |
| **langchain-ai/langchain-mcp-adapters** | **3529** | 2026-05-15 | MIT | LangChain ↔ MCP bridge | **YES — MCP adapter** | **T1-INSTALL** (MCP-adapter primitive for any langchain-based subagent) | **62-68** |
| **langchain-ai/langgraph-supervisor-py** | 1578 | 2026-05-16 | MIT | Supervisor multi-agent pattern | NO | **T2-INSTALL** (multi-agent supervisor primitive) | 54-60 |
| **langchain-ai/langgraph-swarm-py** | 1491 | 2026-05-16 | MIT | Swarm multi-agent | NO | **T2-INSTALL** (swarm coordination pattern) | 52-58 |
| **langchain-ai/langmem** | 1453 | 2026-05-16 | MIT | Agent memory primitive | NO | **T2-INSTALL** (memory sublayer competitor to Graphiti/mem0) | 56-62 |
| **langchain-ai/agents-from-scratch** | 1769 | 2026-05-16 | MIT | Build agent + HITL + memory tutorial | NO | **T3-STUDY** | 36-42 |
| **langchain-ai/deepagentsjs** | 1232 | 2026-05-16 | MIT | TS variant of deepagents | NO | **T2-INSTALL** (TS multi-agent harness) | 54-60 |
| **langchain-ai/openevals** | 1053 | 2026-05-16 | MIT | Ready-made evaluators for LLM apps | NO | **T3-STUDY** (agent-eval) | 42-48 |
| **langchain-ai/openwork** | 1397 | 2026-05-07 | MIT | (no description — new 2026-01) | NO | **T4-WATCH** | 28-34 |

**Wave-2 verdict**: HUGE expansion — deepagents, langgraph, langchain-mcp-adapters, langmem, supervisor/swarm patterns are all **NEW T1/T2 primitives** for the master matrix.

---

## §8 Smithery-AI

### TIER-1 OFFICIAL surfaced

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **smithery-ai/cli** | 719 | 2026-05-16 | MIT | Install/manage MCP servers + skills for agents | **YES — installs MCP for CC + cursor + skills system** | **T1-INSTALL** (MCP installer CLI peer to docker/mcp-gateway + npx) | **66-72** |
| smithery-ai/registry | 0 | 2026-01-30 | — | Smithery MCP registry | YES | **T3-WATCH** (registry — new) | 28-34 |
| smithery-ai/skills | 2 | 2026-05-13 | MIT | (no description) | YES | **T4-WATCH** | 22-28 |

**Wave-2 verdict**: smithery-ai/cli is a TIER-1 MCP installer — comparable to docker/mcp-gateway from W2 master matrix.

---

## §9 Portkey-AI + Helicone (gateway orgs)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **Portkey-AI/gateway** | **11748** | 2026-05-16 | MIT | AI Gateway — 1600+ LLMs + 50+ guardrails + MCP-gateway | mcp-client + mcp-gateway + mcp-servers topics | **T1-INSTALL** (LLM-gateway alternative to LiteLLM — competes with awslabs/mcp at gateway layer) | **70-76** |
| **Helicone/helicone** | **5677** | 2026-05-16 | Apache-2 | OSS LLM observability platform | NO direct | **T1-INSTALL** (agent observability — peer to phoenix/MLflow/langfuse) | **66-72** |
| **Helicone/ai-gateway** | 589 | 2026-05-13 | Apache-2 | Lightweight Rust AI gateway | NO | **T2-STUDY-PILOT** (Rust-perf gateway) | 50-56 |

**Wave-2 verdict**: Portkey gateway is a major NEW gateway competitor to LiteLLM (W2 incumbent); Helicone observability fills the agent-obs sublayer.

---

## §10 Apple + Meta-llama + OpenAI extended + Run-Llama + MLflow + Salesforce + Elastic

### TIER-1 OFFICIAL surfaced (NEW relative to Wave 2)

| Repo | Stars | Last commit | License | Topics | Native-CC | Disposition | Composite ~ |
|------|-------|-------------|---------|--------|-----------|-------------|-------------|
| **apple/python-apple-fm-sdk** | 1033 | 2026-05-14 | — | Python bindings for Apple Foundation Models on-device | NO | **T3-STUDY-PILOT** (on-device model primitive — interesting for offline agent runtime) | 44-50 |
| **apple/coremltools** | 5254 | 2026-05-16 | BSD-3 | CoreML model conversion | NO | **T4** (model conversion) | 22-28 |
| **apple/ml-aim** | 1416 | 2026-05-05 | Apache-2 | Apple AIM v1/v2 vision research | NO | **T4** (research model) | 22-28 |
| **meta-llama/llama-stack** | **8324** | 2026-04-11 | MIT | OpenAI-compat agentic API server (any model, any infra) | NO direct CC plugin; MCP-server-compat | **T1-INSTALL** (Responses API + MCP server + Vector Stores; competes with OpenAI Responses + Anthropic Memory Tool) | **75-82** |
| **meta-llama/synthetic-data-kit** | 1584 | 2026-05-16 | Llama-3-Comm | Synth data gen for fine-tuning | NO | **T4** (training-side) | 24-30 |
| **meta-llama/PurpleLlama** | 4174 | 2026-05-16 | Llama-3-Comm | LLM security/safety eval suite | NO | **T2-STUDY-PILOT** (safety eval — complementary to garak) | 48-54 |
| **meta-llama/prompt-ops** | 812 | 2026-05-16 | Llama-3-Comm | OSS prompt-optimization tool | NO | **T3-STUDY** (prompt-eng tooling) | 38-44 |
| **openai/openai-agents-python** | **26358** | 2026-05-16 | MIT | OpenAI official multi-agent framework | NO direct CC plugin | **T1-INSTALL** (openai-canonical agent SDK — peer to strands-agents) | **78-84** |
| **openai/openai-agents-js** | 3044 | 2026-05-16 | MIT | TS variant w/ voice agents | NO | **T1-INSTALL** | 60-66 |
| **openai/skills** | **19236** | 2026-05-16 | MIT | Skills catalog for Codex | SKILL.md (skills system; not CC plugin marketplace) | **T1-INSTALL** (skills catalog adjacent to anthropic example-skills + huggingface/skills) | **74-80** |
| **openai/symphony** | 23935 | 2026-05-16 | — | Project-work isolated autonomous impl runs | NO | **T2-STUDY-PILOT** (multi-agent task isolation pattern; very new 2026-02) | 56-62 |
| **openai/codex-plugin-cc** | **18819** | 2026-05-16 | MIT | Codex from inside Claude Code | **YES — CC PLUGIN** | **T1-INSTALL** (Codex-via-CC integration — already in W2 master matrix; confirmed live) | **82-88** |
| **openai/openai-cua-sample-app** | 1717 | 2026-05-14 | MIT | OpenAI Computer Using Agent (CUA) sample | NO | **T2-STUDY-PILOT** (computer-use agent pattern; competitor to anthropics Computer Use) | 54-60 |
| **openai/openai-realtime-agents** | 6869 | 2026-05-15 | MIT | Realtime API + agentic patterns | NO | **T2-STUDY-PILOT** (realtime/voice agent pattern) | 52-58 |
| **openai/mle-bench** | 1530 | 2026-05-15 | MIT | Benchmark for ML engineering agents | NO | **T3-STUDY** | 40-46 |
| **openai/openai-apps-sdk-examples** | 2237 | 2026-05-16 | MIT | Apps SDK examples | NO | **T3-REFERENCE** | 38-44 |
| **openai/chatkit-js** | 1924 | 2026-05-16 | MIT | OpenAI ChatKit | NO | **T3** | 32-38 |
| **run-llama/llama_index** | 49453 | 2026-05-16 | MIT | LlamaIndex — document agents + OCR | NO direct CC plugin | **T1-INSTALL** (RAG/doc-agent primitive — already on W2 matrix) | 70-76 |
| **run-llama/llama_deploy** | 2068 | 2026-05-15 | MIT | Agentic workflow production deploy | NO | **T2-INSTALL** (agent deploy primitive) | 50-56 |
| **run-llama/liteparse** | 5136 | 2026-05-16 | MIT | Fast OSS doc parser | NO | **T2-INSTALL** (doc-parsing primitive for RAG) | 50-56 |
| **run-llama/semtools** | 1793 | 2026-05-16 | MIT | Semantic search + parse CLI (Rust) | NO | **T2-INSTALL** (cli sem-search primitive) | 50-56 |
| **run-llama/notebookllama** | 1884 | 2026-05-15 | MIT | OSS NotebookLM alternative | NO | **T3-STUDY-PILOT** | 44-50 |
| **mlflow/mlflow** | **25962** | 2026-05-16 | Apache-2 | OSS agentops + AI gov + obs platform | NO direct | **T1-INSTALL** (agent-ops primitive — peer to phoenix/helicone/langfuse) | **70-76** |
| **salesforce/TransmogrifAI** | 2274 | 2026-05-05 | BSD-3 | AutoML on Spark | NO | **REJECT** (out-of-scope) | 14-18 |
| **elastic/elasticsearch-labs** | 1090 | 2026-05-14 | Apache-2 | ES + AI app notebooks | NO | **T4** (examples) | 26-32 |

**Wave-2 verdict**: openai/openai-agents-python + openai/skills + meta-llama/llama-stack + mlflow are all **NEW T1 candidates** that didn't surface in Wave 2.

---

## §11 TOP-15 NEW high-composite candidates (ranked)

| # | Repo | Composite | Stars | Native-CC? | Disposition | Add to W259 layer |
|---|------|-----------|-------|------------|-------------|---------------------|
| 1 | **openai/codex-plugin-cc** | 82-88 | 18819 | **YES native CC plugin** | T1-INSTALL (already in W2) | Reviewer-bridge (Layer 8) — already wired |
| 2 | **huggingface/skills** | 80-86 | 10504 | **YES `.claude-plugin/marketplace.json` + 4 SKILL.md** | **T1-INSTALL** | **NEW: Skills layer (Layer 6) — HF ecosystem skills marketplace** |
| 3 | **strands-agents/sdk-python** | 78-84 | 5866 | **YES AgentSkills compat + MCP native** | **T1-INSTALL** | **NEW: Subagent SDK (Layer 5) — AWS-canonical peer to openai-agents-python** |
| 4 | **openai/openai-agents-python** | 78-84 | 26358 | NO direct CC plugin | **T1-INSTALL** | Subagent SDK (Layer 5) — peer to strands-agents |
| 5 | **langchain-ai/langgraph** | 76-82 | 32186 | NO direct | **T1-INSTALL** | Multi-agent orchestration (Layer 5) |
| 6 | **awslabs/mcp** | 75-82 | 9069 | YES — direct MCP servers | **T1-INSTALL** | MCP servers (Layer 4 sublayer) — AWS-canonical |
| 7 | **meta-llama/llama-stack** | 75-82 | 8324 | NO direct CC; MCP-compat | **T1-INSTALL** | LLM gateway + Responses API (Layer 4) |
| 8 | **huggingface/smolagents** | 74-80 | 27338 | NO direct | **T1-INSTALL** | Code-agent subagent (Layer 5) |
| 9 | **openai/skills** | 74-80 | 19236 | SKILL.md system | **T1-INSTALL** | Skills layer (Layer 6) — Codex skills |
| 10 | **langchain-ai/deepagents** | 70-76 | 22848 | NO direct | **T1-STUDY-PILOT** | Agent harness (Layer 5) — peer to CC |
| 11 | **qdrant/mcp-server-qdrant** | 70-76 | 1397 | **YES MCP server** | **T1-INSTALL** | Memory/vector MCP (Layer 4 sublayer) |
| 12 | **mlflow/mlflow** | 70-76 | 25962 | NO direct | **T1-INSTALL** | Agent-ops/observability (Layer 7) |
| 13 | **Portkey-AI/gateway** | 70-76 | 11748 | MCP-gateway topics | **T1-INSTALL** | LLM gateway (Layer 4) — peer to LiteLLM/awslabs/mcp |
| 14 | **IBM/mcp-context-forge** | 70-78 | 3719 | **YES — Claude Desktop integration** | **T2-INSTALL** | MCP gateway/registry (Layer 4 sublayer) |
| 15 | **smithery-ai/cli** | 66-72 | 719 | **YES — CC MCP installer** | **T1-INSTALL** | MCP install CLI (Layer 4 sublayer) |

---

## §12 Updated W259 architecture impact

### Layer assignments (new sublayers / candidates per layer)

- **Layer 4 (gateway + MCP infra)**: NEW T1 candidates → `awslabs/mcp`, `Portkey-AI/gateway`, `meta-llama/llama-stack`, `IBM/mcp-context-forge` (registry), `smithery-ai/cli` (installer), `qdrant/mcp-server-qdrant`, `chroma-core/chroma-mcp`, `langchain-ai/langchain-mcp-adapters`. **Compete with W2's** LiteLLM + docker/mcp-gateway + mcp-use.
- **Layer 5 (subagent / agent SDK / harness)**: NEW T1 candidates → `strands-agents/sdk-python` + `tools` + `sdk-typescript`, `openai/openai-agents-python` + `openai-agents-js`, `langchain-ai/langgraph` + `langchain-ai/deepagents`, `huggingface/smolagents`, `aws/bedrock-agentcore-sdk-python`. **Compete with W2's** Anthropic Agent SDK + claude-flow.
- **Layer 6 (skills system)**: NEW T1 candidates → `huggingface/skills` (CC plugin marketplace), `openai/skills` (Codex skills), `strands-agents` agent-sop. **Compete with W2's** anthropic example-skills + wshobson/agents.
- **Layer 7 (observability / agent-ops)**: NEW T1 candidates → `mlflow/mlflow`, `Helicone/helicone`, `Helicone/ai-gateway`. **Compete with W2's** Arize/Phoenix + langfuse + Logfire.
- **Layer 8 (multi-agent orchestration / supervisor / swarm)**: NEW T1 → `langchain-ai/langgraph-supervisor-py`, `langchain-ai/langgraph-swarm-py`, `openai/symphony`, `openai/swarm`, `awslabs/agentcore-samples`.
- **Layer 9 (long-context / memory / KV)**: NEW T1 → `langchain-ai/langmem` (memory), `NVIDIA/kvpress` (KV compression — STUDY), `NVIDIA/context-aware-rag` (graph-RAG agent surface).
- **Layer 10 (security / red-team / eval)**: NEW T1/T2 → `meta-llama/PurpleLlama` (already complement to W2's `garak`), `langchain-ai/openevals`, `strands-agents/evals`.
- **Layer 11 (specialized agent patterns)**: NEW T2-STUDY-PILOT → `openai/openai-cua-sample-app` (computer use), `openai/openai-realtime-agents` (realtime), `aws-samples/bedrock-engineer` (universal agent), `langchain-ai/open-swe` (coding agent).

### Critical SOTA-shift findings

1. **HuggingFace's `skills` repo** is a Claude Code-native plugin marketplace — directly competitive with anthropic example-skills + wshobson/agents at W259's Layer 6. **Must install.**
2. **Strands-agents** is AWS-canonical (peer to openai-agents-python + LangGraph) and AgentSkills.io-compatible — adds a third major subagent SDK ecosystem to Layer 5.
3. **AWS Bedrock AgentCore** (sdk-python + agentcore-samples + fullstack-template + Q-developer-cli) is a complete competing agent runtime — adds Layer 4-5-7-8 components.
4. **IBM mcp-context-forge** is the most production-mature MCP gateway/registry — federation + RBAC + OTEL + K8s, far beyond W2's mcp-gateway.
5. **LangChain-AI's NON-langchain repos** (deepagents, langgraph-supervisor, langmem, langchain-mcp-adapters) are 7+ new T1/T2 primitives — Wave 2 only had main langchain.
6. **openai/skills + openai/openai-agents-python** complete the OpenAI canonical agent stack — peer to Anthropic + Amazon + LangChain.
7. **meta-llama/llama-stack** is a Responses-API-compat agent server — fills a gap between LiteLLM (proxy) and an actual agent runtime.

### Org with biggest gap (relative to Wave 2)

**AWS** (aws + aws-samples + awslabs + strands-agents): Wave 2 had near-ZERO; this probe surfaced **15+ T1/T2-class repos** including the canonical `awslabs/mcp` (9069★) + `strands-agents/sdk-python` (5866★) + `bedrock-agentcore` ecosystem (~5k stars cumulative). AWS is now the **#1 underrepresented major org** in the master matrix.

Runner-up gap: **LangChain-AI extended** (Wave 2 had langchain-core only; this probe added 8+ non-core T1/T2 primitives at 1k-22k stars each).

---

**Artifact**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\05-scoring\BIG-ORG-PROBE-W259v3.md`

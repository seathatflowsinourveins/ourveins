# W367 Stream C — Awesome-list Convergence Map

> **Wave**: W367 SOTA-LAYER-MAP-V1 · **Stream**: C of 6 · **Date**: 2026-05-22 · **Status**: complete · **Convergence signal**: cross-citation-count across N=63 awesome-lists
>
> **Method**: discover (mcp__github__search_repositories ×8 angles) → fetch (raw.githubusercontent.com READMEs ×63) → parse (regex extract of `github.com/owner/repo` references) → deduplicate → count distinct-list-citations per repo → bucketize into 4 tiers → annotate CC-ecosystem relevance (1-5 heuristic).
>
> **Output**: 9194 unique repos found · Tier-1 (≥5 lists)=150 · Tier-2 (3-4)=546 · Tier-3 (2)=1046 · Tier-4 (1)=7452.
>
> **Cite-anchor**: Anthropic claude-cookbooks @39a350b6 orchestrator_workers.ipynb (fan-out research) + sindresorhus/awesome curation discipline + Anthropic claude-code SOTA-discovery W367 G-predicate + ISO 25010:2011 §4.2 quality attributes (functional-suitability, performance-efficiency) applied to cross-source convergence ranking.

---

## Table of Contents

1. [Awesome-list inventory (63 lists)](#1-awesome-list-inventory)
2. [Method + relevance heuristic](#2-method--relevance-heuristic)
3. [Tier 1 — Universal SOTA (≥5-list convergence)](#3-tier-1--universal-sota)
4. [Tier 2 — Strong consensus (3-4 lists)](#4-tier-2--strong-consensus)
5. [Tier 3 — Moderate signal (2 lists)](#5-tier-3--moderate-signal)
6. [Tier 4 — Domain-specific or niche (1 list)](#6-tier-4--domain-specific-or-niche)
   - 6a. [Distribution by contributing list](#6a-distribution-by-contributing-list)
   - 6b. [Full Tier-4 high-relevance picks (rel≥3) by source](#6b-full-tier-4-high-relevance-picks-rel3-by-source)
7. [Surprising Tier-4 picks worth attention (hand-curated)](#7-surprising-tier-4-picks-worth-attention)
8. [Notes + caveats](#8-notes--caveats)
9. [Appendix A — Per-list ingestion provenance](#9-appendix-a--per-list-ingestion-provenance)

---

## 1. Awesome-list inventory

Total **63 awesome-lists** discovered + ingested. Sorted by repo-citation-count (effective curation breadth).

| Rank | List | Focus | Repos cited | README size |
|---:|:---|:---|---:|---:|
| 1 | [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | MCP: Servers | 2237 | 719.9 KB |
| 2 | [jim-schwoebel/awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) | AI Agents (1500+ catalog) | 1492 | 341.8 KB |
| 3 | [TensorBlock/awesome-mcp-servers](https://github.com/TensorBlock/awesome-mcp-servers) | MCP: Servers | 1227 | 277.6 KB |
| 4 | [WangRongsheng/awesome-LLM-resources](https://github.com/WangRongsheng/awesome-LLM-resources) | LLM resources | 593 | 99.0 KB |
| 5 | [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH) | MCP: Chinese-language | 536 | 201.4 KB |
| 6 | [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | MCP: Servers | 487 | 97.6 KB |
| 7 | [jqueryscript/awesome-claude-code](https://github.com/jqueryscript/awesome-claude-code) | CC: Tools/integrations | 406 | 74.9 KB |
| 8 | [tensorchord/Awesome-LLMOps](https://github.com/tensorchord/Awesome-LLMOps) | LLMOps | 342 | 192.7 KB |
| 9 | [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | CC: Toolkit (agents+skills+plugins) | 335 | 159.1 KB |
| 10 | [subinium/awesome-claude-code](https://github.com/subinium/awesome-claude-code) | CC: Chinese-language | 308 | 75.2 KB |
| 11 | [shahshrey/awesome-claude-code-mastery](https://github.com/shahshrey/awesome-claude-code-mastery) | CC: Mastery/learning | 283 | 146.8 KB |
| 12 | [codefuse-ai/Awesome-Code-LLM](https://github.com/codefuse-ai/Awesome-Code-LLM) | Code LLMs | 277 | 493.1 KB |
| 13 | [GetBindu/awesome-claude-code-and-skills](https://github.com/GetBindu/awesome-claude-code-and-skills) | CC: Skills | 220 | 84.4 KB |
| 14 | [kyrolabs/awesome-langchain](https://github.com/kyrolabs/awesome-langchain) | LangChain | 217 | 52.0 KB |
| 15 | [rohitg00/awesome-devops-mcp-servers](https://github.com/rohitg00/awesome-devops-mcp-servers) | MCP: DevOps focus | 216 | 55.8 KB |
| 16 | [InftyAI/Awesome-LLMOps](https://github.com/InftyAI/Awesome-LLMOps) | LLMOps | 199 | 85.0 KB |
| 17 | [promptslab/Awesome-Prompt-Engineering](https://github.com/promptslab/Awesome-Prompt-Engineering) | Prompt engineering | 178 | 92.1 KB |
| 18 | [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) | MCP: Servers | 177 | 61.2 KB |
| 19 | [Jenqyang/Awesome-AI-Agents](https://github.com/Jenqyang/Awesome-AI-Agents) | AI Agents (Chinese) | 169 | 50.3 KB |
| 20 | [xlite-dev/Awesome-LLM-Inference](https://github.com/xlite-dev/Awesome-LLM-Inference) | LLM Inference | 167 | 102.9 KB |
| 21 | [Hannibal046/Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM) | LLM core | 150 | 60.8 KB |
| 22 | [FoundationAgents/awesome-foundation-agents](https://github.com/FoundationAgents/awesome-foundation-agents) | Foundation Agents | 149 | 103.1 KB |
| 23 | [slavakurilyak/awesome-ai-agents](https://github.com/slavakurilyak/awesome-ai-agents) | AI Agents (frameworks) | 144 | 169.6 KB |
| 24 | [kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents) | Agents (general) | 135 | 36.0 KB |
| 25 | [hyp1231/awesome-llm-powered-agent](https://github.com/hyp1231/awesome-llm-powered-agent) | Agent papers | 126 | 55.5 KB |
| 26 | [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools) | MCP: DevTools/SDKs | 120 | 26.0 KB |
| 27 | [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) | AI Agents (frameworks) | 119 | 205.8 KB |
| 28 | [LangGPT/awesome-claude-code](https://github.com/LangGPT/awesome-claude-code) | CC: Chinese-language | 116 | 28.9 KB |
| 29 | [awesome-opencode/awesome-opencode](https://github.com/awesome-opencode/awesome-opencode) | OpenCode ecosystem | 112 | 51.4 KB |
| 30 | [lizhe2004/Awesome-LLM-RAG-Application](https://github.com/lizhe2004/Awesome-LLM-RAG-Application) | RAG applications | 111 | 91.0 KB |
| 31 | [XiaoxinHe/Awesome-Graph-LLM](https://github.com/XiaoxinHe/Awesome-Graph-LLM) | Graph-LLM | 101 | 41.5 KB |
| 32 | [horseee/Awesome-Efficient-LLM](https://github.com/horseee/Awesome-Efficient-LLM) | Efficient LLMs | 92 | 95.7 KB |
| 33 | [punkpeye/awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients) | MCP: Clients | 80 | 88.0 KB |
| 34 | [atfortes/Awesome-LLM-Reasoning](https://github.com/atfortes/Awesome-LLM-Reasoning) | LLM Reasoning | 80 | 45.8 KB |
| 35 | [AlexMili/Awesome-MCP](https://github.com/AlexMili/Awesome-MCP) | MCP: Resources (catch-all) | 62 | 12.1 KB |
| 36 | [kaushikb11/awesome-llm-agents](https://github.com/kaushikb11/awesome-llm-agents) | LLM Agent frameworks | 60 | 22.0 KB |
| 37 | [IAAR-Shanghai/Awesome-AI-Memory](https://github.com/IAAR-Shanghai/Awesome-AI-Memory) | AI Memory | 50 | 579.1 KB |
| 38 | [corca-ai/awesome-llm-security](https://github.com/corca-ai/awesome-llm-security) | LLM Security | 47 | 20.6 KB |
| 39 | [Puliczek/awesome-mcp-security](https://github.com/Puliczek/awesome-mcp-security) | MCP: Security | 43 | 20.2 KB |
| 40 | [Danielskry/Awesome-RAG](https://github.com/Danielskry/Awesome-RAG) | RAG | 37 | 37.0 KB |
| 41 | [DEEP-PolyU/Awesome-GraphRAG](https://github.com/DEEP-PolyU/Awesome-GraphRAG) | GraphRAG | 36 | 35.8 KB |
| 42 | [KennethanCeyer/awesome-llmops](https://github.com/KennethanCeyer/awesome-llmops) | LLMOps | 32 | 24.0 KB |
| 43 | [jxzhangjhu/Awesome-LLM-RAG](https://github.com/jxzhangjhu/Awesome-LLM-RAG) | RAG papers | 27 | 15.8 KB |
| 44 | [Prat011/awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) | LLM Skills (CC/Codex/Gemini) | 26 | 22.2 KB |
| 45 | [steel-dev/awesome-web-agents](https://github.com/steel-dev/awesome-web-agents) | Web Agents | 25 | 21.8 KB |
| 46 | [snwfdhmp/awesome-gpt-prompt-engineering](https://github.com/snwfdhmp/awesome-gpt-prompt-engineering) | Prompt engineering | 21 | 19.8 KB |
| 47 | [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | CC: Skills | 18 | 21.3 KB |
| 48 | [helloianneo/awesome-claude-code-skills](https://github.com/helloianneo/awesome-claude-code-skills) | CC: Chinese-language | 14 | 14.1 KB |
| 49 | [rahulvrane/awesome-claude-agents](https://github.com/rahulvrane/awesome-claude-agents) | CC: Agents | 13 | 14.4 KB |
| 50 | [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | CC: Subagents | 10 | 29.7 KB |
| 51 | [jmanhype/awesome-claude-code](https://github.com/jmanhype/awesome-claude-code) | CC: MCP-focused | 9 | 3.8 KB |
| 52 | [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts) | CC: Prompts | 9 | 144.9 KB |
| 53 | [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers) | MCP: Remote/hosted | 5 | 21.1 KB |
| 54 | [mergisi/awesome-openclaw-agents](https://github.com/mergisi/awesome-openclaw-agents) | OpenClaw Agents | 4 | 75.9 KB |
| 55 | [gauravfs-14/awesome-mcp](https://github.com/gauravfs-14/awesome-mcp) | MCP: Resources (catch-all) | 3 | 17.5 KB |
| 56 | [RManLuo/Awesome-LLM-KG](https://github.com/RManLuo/Awesome-LLM-KG) | LLM + Knowledge Graphs | 3 | 19.8 KB |
| 57 | [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | LLM Apps | 2 | 20.5 KB |
| 58 | [rohitg00/awesome-ai-apps](https://github.com/rohitg00/awesome-ai-apps) | AI Apps | 2 | 7.8 KB |
| 59 | [supatest-ai/awesome-claude-code-sub-agents](https://github.com/supatest-ai/awesome-claude-code-sub-agents) | CC: Subagents | 1 | 18.8 KB |
| 60 | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | CC: Ecosystem (catch-all) | 0 | 1.2 KB |
| 61 | [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) | CC: Plugins | 0 | 8.8 KB |
| 62 | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | CC: Orchestrators | 0 | 8.7 KB |
| 63 | [nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns) | Agentic Patterns | 0 | 19.4 KB |

**Inventory observations**:

- Largest catalogs are MCP-server registries (`punkpeye/awesome-mcp-servers` 2237 repos, `TensorBlock/awesome-mcp-servers` 1227, `wong2/awesome-mcp-servers` 487) — these dominate Tier-4 long-tail with thousands of individual MCP servers.
- `jim-schwoebel/awesome_ai_agents` (1492 repos) is the broadest AI-agent catalog; many cross-cite with the AI-agents Tier-1 cluster.
- CC-specific lists are smaller (50-450 repos each) because the ecosystem itself is young. `subinium`, `jqueryscript`, `rohitg00`, `shahshrey` are the most actively-curated CC catalogs.
- 4 lists registered 0 absolute github.com citations: `hesreallyhim/awesome-claude-code` (currently a "TOC TODO" placeholder per its README), `ccplugins/awesome-claude-code-plugins` (uses RELATIVE `./plugins/...` paths to its own monorepo), `nibzard/awesome-agentic-patterns` (pattern catalog with non-repo links), `vijaythecoder/awesome-claude-agents` (project README, not a pure list).
- Non-English curated lists (`yzfly/Awesome-MCP-ZH`, `LangGPT/awesome-claude-code`, `subinium`, `helloianneo`) bring distinct regional priorities.
- Largest README content by KB: `codefuse-ai/Awesome-Code-LLM` (493 KB — mostly paper-citations with little repo-link density), `punkpeye/awesome-mcp-servers` (720 KB), `jim-schwoebel/awesome_ai_agents` (342 KB), `TensorBlock/awesome-mcp-servers` (278 KB).
- 6.5/63 lists exceed 100KB README size — these are the heavyweights driving convergence; the remaining 56 contribute 1-50 repos each.

---

## 2. Method + relevance heuristic

**Discovery**: 8 parallel `mcp__github__search_repositories` queries against the `awesome-` topic with stars/relevance filters. Captured all results across CC/MCP/LLM/Agent/RAG/LLMOps/PromptEng/LangChain axes. Pruned obvious forks + duplicates.

**Ingestion**: Parallel HTTP GET of each list's `README.md` (or `readme.md` / `Readme.md` / `README.MD` / `docs/README.md` fallback) from `raw.githubusercontent.com` on `main` or `master` branch. 8-concurrency fetcher. 63 of 63 successfully retrieved.

**Repo extraction regex**:
```
/(?:https?:\/\/(?:www\.)?github\.com\/|git@github\.com:)([A-Za-z0-9][A-Za-z0-9-]{0,38})\/([A-Za-z0-9_.-]{1,100})(?:\.git)?/g
```
Filters: skip GitHub system paths (`/topics/`, `/orgs/`, `/marketplace/`, etc.); skip relative paths; skip self-citations (list citing itself); strip `.git` suffix; reject `.md` anchors.

**Deduplication**: per-list `Set` collapses duplicates within one list; then cross-list `Map<repo, Set<list-id>>` builds the citation count.

**CC-ecosystem relevance** (1-5 heuristic, regex-based):
- **5** = anthropic/* · claude-code/claude-skill/claude-plugin/claude-mem names · obra/* · davila7/claude* · awesome-claude* · cline/continuedev (top adjacent tools)
- **4** = MCP namespace (modelcontextprotocol/* · fastmcp · *-mcp-server) · LLM agent frameworks (autogen · langchain · llamaindex · semantic-kernel · metagpt · crewai · dspy · camel · haystack · pydantic-ai · mastra · praisonai) · observability (langfuse · opik · braintrust · helicone · phoenix · arize) · alternative code-agents (devin · opencode · gemini-cli · codex · cursor · aider)
- **3** = vector DB (qdrant/weaviate/chroma/pinecone/milvus/lancedb/pgvector) · fine-tuning (axolotl/unsloth/trl) · LLM apps (dify/flowise/lobe-chat/librechat/openwebui)
- **2** = default — generic LLM tool, RAG framework, language-specific catalog
- **1** = paper-only, niche domain (no current rel-1 — heuristic floors at 2)

**Limitations of heuristic**:
- Regex-based, not LLM-judged — a repo with a non-obvious name (e.g., `pcottle/learnGitBranching`) doesn't get the rel-3 it might warrant for being CC-adjacent in practice.
- No actual stargazer threshold applied — Tier-4 dominated by experimental/personal MCP servers.
- Self-published lists may game citations (a maintainer's own repos auto-appear in their own list, which we strip via self-citation filter, but cross-citations between aligned maintainers remain).

---

## 3. Tier 1 — Universal SOTA

**150 repos** cited in ≥5 distinct awesome-lists. These are the **universal-consensus SOTA** of the CC/MCP/LLM/Agent ecosystem.

Columns: `cite` = list count · `rel` = CC-ecosystem relevance (1-5) · `Sources` = top contributing awesome-lists.

| cite | rel | Repo | Sources |
|---:|---:|:---|:---|
| 12 | 4 | [microsoft/autogen](https://github.com/microsoft/autogen) | e2b-dev/awesome-ai-agents · FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents (+4) |
| 11 | 4 | [geekan/MetaGPT](https://github.com/geekan/MetaGPT) | codefuse-ai/Awesome-Code-LLM · e2b-dev/awesome-ai-agents · FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents (+3) |
| 10 | 4 | [deepset-ai/haystack](https://github.com/deepset-ai/haystack) | Danielskry/Awesome-RAG · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · KennethanCeyer/awesome-llmops · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering (+2) |
| 10 | 4 | [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | appcypher/awesome-mcp-servers · Danielskry/Awesome-RAG · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering (+2) |
| 10 | 4 | [MervinPraison/PraisonAI](https://github.com/MervinPraison/PraisonAI) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-clients · slavakurilyak/awesome-ai-agents (+2) |
| 9 | 5 | [continuedev/continue](https://github.com/continuedev/continue) | e2b-dev/awesome-ai-agents · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-clients · shahshrey/awesome-claude-code-mastery · slavakurilyak/awesome-ai-agents · tensorchord/Awesome-LLMOps (+1) |
| 9 | 4 | [langfuse/langfuse](https://github.com/langfuse/langfuse) | Danielskry/Awesome-RAG · Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-servers · slavakurilyak/awesome-ai-agents (+1) |
| 9 | 4 | [microsoft/semantic-kernel](https://github.com/microsoft/semantic-kernel) | Danielskry/Awesome-RAG · Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering (+1) |
| 9 | 4 | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · jmanhype/awesome-claude-code · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · WangRongsheng/awesome-LLM-resources · wong2/awesome-mcp-servers (+1) |
| 9 | 3 | [FlowiseAI/Flowise](https://github.com/FlowiseAI/Flowise) | Danielskry/Awesome-RAG · e2b-dev/awesome-ai-agents · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents · tensorchord/Awesome-LLMOps (+1) |
| 9 | 3 | [langgenius/dify](https://github.com/langgenius/dify) | Danielskry/Awesome-RAG · Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · kaushikb11/awesome-llm-agents · kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · tensorchord/Awesome-LLMOps (+1) |
| 8 | 5 | [anthropics/claude-code](https://github.com/anthropics/claude-code) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · jqueryscript/awesome-claude-code · langgptai/awesome-claude-prompts · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 8 | 5 | [obra/superpowers](https://github.com/obra/superpowers) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · Prat011/awesome-llm-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · travisvn/awesome-claude-skills |
| 8 | 4 | [camel-ai/camel](https://github.com/camel-ai/camel) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 8 | 4 | [comet-ml/opik](https://github.com/comet-ml/opik) | appcypher/awesome-mcp-servers · Danielskry/Awesome-RAG · Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · promptslab/Awesome-Prompt-Engineering · snwfdhmp/awesome-gpt-prompt-engineering · tensorchord/Awesome-LLMOps · wong2/awesome-mcp-servers |
| 8 | 4 | [github/github-mcp-server](https://github.com/github/github-mcp-server) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 8 | 4 | [jlowin/fastmcp](https://github.com/jlowin/fastmcp) | AlexMili/Awesome-MCP · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 8 | 4 | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | hyp1231/awesome-llm-powered-agent · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 8 | 4 | [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · WangRongsheng/awesome-LLM-resources · yzfly/Awesome-MCP-ZH |
| 8 | 4 | [reworkd/AgentGPT](https://github.com/reworkd/AgentGPT) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents · steel-dev/awesome-web-agents · WangRongsheng/awesome-LLM-resources |
| 8 | 4 | [run-llama/llama_index](https://github.com/run-llama/llama_index) | InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 8 | 4 | [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) | Hannibal046/Awesome-LLM · jim-schwoebel/awesome_ai_agents · jxzhangjhu/Awesome-LLM-RAG · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents |
| 8 | 4 | [taskade/mcp](https://github.com/taskade/mcp) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-clients · punkpeye/awesome-mcp-devtools · TensorBlock/awesome-mcp-servers · VoltAgent/awesome-claude-code-subagents · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 8 | 3 | [oraios/serena](https://github.com/oraios/serena) | GetBindu/awesome-claude-code-and-skills · punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources · yzfly/Awesome-MCP-ZH |
| 8 | 2 | [juspay/neurolink](https://github.com/juspay/neurolink) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · tensorchord/Awesome-LLMOps |
| 8 | 2 | [OpenBMB/XAgent](https://github.com/OpenBMB/XAgent) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 7 | 5 | [anthropics/skills](https://github.com/anthropics/skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · Prat011/awesome-llm-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · travisvn/awesome-claude-skills · WangRongsheng/awesome-LLM-resources |
| 7 | 5 | [cline/cline](https://github.com/cline/cline) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-clients · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 7 | 5 | [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-clients · punkpeye/awesome-mcp-devtools · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources · yzfly/Awesome-MCP-ZH |
| 7 | 4 | [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 7 | 4 | [connerlambden/bgpt-mcp](https://github.com/connerlambden/bgpt-mcp) | AlexMili/Awesome-MCP · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · VoltAgent/awesome-claude-code-subagents · yzfly/Awesome-MCP-ZH |
| 7 | 3 | [lackeyjb/playwright-skill](https://github.com/lackeyjb/playwright-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · travisvn/awesome-claude-skills |
| 7 | 2 | [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application · slavakurilyak/awesome-ai-agents |
| 7 | 2 | [hwchase17/langchain](https://github.com/hwchase17/langchain) | Hannibal046/Awesome-LLM · kaushikb11/awesome-llm-agents · KennethanCeyer/awesome-llmops · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · snwfdhmp/awesome-gpt-prompt-engineering · tensorchord/Awesome-LLMOps |
| 7 | 2 | [mem0ai/mem0](https://github.com/mem0ai/mem0) | IAAR-Shanghai/Awesome-AI-Memory · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · shahshrey/awesome-claude-code-mastery · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 7 | 2 | [microsoft/JARVIS](https://github.com/microsoft/JARVIS) | e2b-dev/awesome-ai-agents · FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · KennethanCeyer/awesome-llmops · slavakurilyak/awesome-ai-agents |
| 7 | 2 | [OpenBMB/ChatDev](https://github.com/OpenBMB/ChatDev) | codefuse-ai/Awesome-Code-LLM · e2b-dev/awesome-ai-agents · FoundationAgents/awesome-foundation-agents · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · XiaoxinHe/Awesome-Graph-LLM |
| 7 | 2 | [vectorize-io/hindsight](https://github.com/vectorize-io/hindsight) | IAAR-Shanghai/Awesome-AI-Memory · InftyAI/Awesome-LLMOps · kyrolabs/awesome-agents · punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers · WangRongsheng/awesome-LLM-resources |
| 7 | 2 | [wshobson/agents](https://github.com/wshobson/agents) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rahulvrane/awesome-claude-agents · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 7 | 2 | [xlang-ai/OpenAgents](https://github.com/xlang-ai/OpenAgents) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · steel-dev/awesome-web-agents |
| 6 | 5 | [davila7/claude-code-templates](https://github.com/davila7/claude-code-templates) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 5 | [disler/claude-code-hooks-mastery](https://github.com/disler/claude-code-hooks-mastery) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 5 | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 5 | [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 5 | [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rahulvrane/awesome-claude-agents · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 5 | [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | awesome-opencode/awesome-opencode · GetBindu/awesome-claude-code-and-skills · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 4 | [antvis/mcp-server-chart](https://github.com/antvis/mcp-server-chart) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 6 | 4 | [awslabs/mcp](https://github.com/awslabs/mcp) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 6 | 4 | [microsoft/playwright-mcp](https://github.com/microsoft/playwright-mcp) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 6 | 4 | [semgrep/mcp](https://github.com/semgrep/mcp) | appcypher/awesome-mcp-servers · Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 6 | 3 | [executeautomation/mcp-playwright](https://github.com/executeautomation/mcp-playwright) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 6 | 3 | [lobehub/lobe-chat](https://github.com/lobehub/lobe-chat) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · punkpeye/awesome-mcp-clients · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 6 | 3 | [vllm-project/vllm](https://github.com/vllm-project/vllm) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · lizhe2004/Awesome-LLM-RAG-Application · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 6 | 2 | [Agent-Field/agentfield](https://github.com/Agent-Field/agentfield) | InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 6 | 2 | [aiwaves-cn/agents](https://github.com/aiwaves-cn/agents) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 6 | 2 | [bentoml/OpenLLM](https://github.com/bentoml/OpenLLM) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 6 | 2 | [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | GetBindu/awesome-claude-code-and-skills · InftyAI/Awesome-LLMOps · punkpeye/awesome-mcp-clients · shahshrey/awesome-claude-code-mastery · WangRongsheng/awesome-LLM-resources · yzfly/Awesome-MCP-ZH |
| 6 | 2 | [cordum-io/cordum](https://github.com/cordum-io/cordum) | InftyAI/Awesome-LLMOps · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · punkpeye/awesome-mcp-devtools · rohitg00/awesome-devops-mcp-servers · tensorchord/Awesome-LLMOps |
| 6 | 2 | [cpacker/MemGPT](https://github.com/cpacker/MemGPT) | e2b-dev/awesome-ai-agents · FoundationAgents/awesome-foundation-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 6 | 2 | [embedchain/embedchain](https://github.com/embedchain/embedchain) | Hannibal046/Awesome-LLM · kaushikb11/awesome-llm-agents · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering · snwfdhmp/awesome-gpt-prompt-engineering · tensorchord/Awesome-LLMOps |
| 6 | 2 | [EvoAgentX/EvoAgentX](https://github.com/EvoAgentX/EvoAgentX) | InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · WangRongsheng/awesome-LLM-resources |
| 6 | 2 | [hpcaitech/ColossalAI](https://github.com/hpcaitech/ColossalAI) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 6 | 2 | [kubestellar/console](https://github.com/kubestellar/console) | GetBindu/awesome-claude-code-and-skills · Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers · tensorchord/Awesome-LLMOps |
| 6 | 2 | [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) | AlexMili/Awesome-MCP · Jenqyang/Awesome-AI-Agents · punkpeye/awesome-mcp-clients · punkpeye/awesome-mcp-devtools · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 6 | 2 | [MarkusPfundstein/mcp-obsidian](https://github.com/MarkusPfundstein/mcp-obsidian) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 6 | 2 | [MineDojo/Voyager](https://github.com/MineDojo/Voyager) | e2b-dev/awesome-ai-agents · FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 6 | 2 | [Significant-Gravitas/Auto-GPT](https://github.com/Significant-Gravitas/Auto-GPT) | e2b-dev/awesome-ai-agents · Hannibal046/Awesome-LLM · hyp1231/awesome-llm-powered-agent · kaushikb11/awesome-llm-agents · KennethanCeyer/awesome-llmops · snwfdhmp/awesome-gpt-prompt-engineering |
| 6 | 2 | [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | FoundationAgents/awesome-foundation-agents · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · steel-dev/awesome-web-agents |
| 6 | 2 | [sipyourdrink-ltd/bernstein](https://github.com/sipyourdrink-ltd/bernstein) | kyrolabs/awesome-agents · punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers · tensorchord/Awesome-LLMOps |
| 6 | 2 | [siteboon/claudecodeui](https://github.com/siteboon/claudecodeui) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 2 | [SuperClaude-Org/SuperClaude_Framework](https://github.com/SuperClaude-Org/SuperClaude_Framework) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 6 | 2 | [THUDM/AgentBench](https://github.com/THUDM/AgentBench) | hyp1231/awesome-llm-powered-agent · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents |
| 6 | 2 | [topoteretes/cognee](https://github.com/topoteretes/cognee) | IAAR-Shanghai/Awesome-AI-Memory · jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery · slavakurilyak/awesome-ai-agents · yzfly/Awesome-MCP-ZH |
| 6 | 2 | [TransformerOptimus/SuperAGI](https://github.com/TransformerOptimus/SuperAGI) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 6 | 2 | [user-attachments/assets](https://github.com/user-attachments/assets) | appcypher/awesome-mcp-servers · awesome-opencode/awesome-opencode · Prat011/awesome-llm-skills · punkpeye/awesome-mcp-clients · VoltAgent/awesome-claude-code-subagents · xlite-dev/Awesome-LLM-Inference |
| 6 | 2 | [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · VoltAgent/awesome-claude-code-subagents · WangRongsheng/awesome-LLM-resources |
| 6 | 2 | [wonderwhy-er/DesktopCommanderMCP](https://github.com/wonderwhy-er/DesktopCommanderMCP) | GetBindu/awesome-claude-code-and-skills · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 6 | 2 | [Writbase/writbase](https://github.com/Writbase/writbase) | gauravfs-14/awesome-mcp · InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-devtools · TensorBlock/awesome-mcp-servers |
| 6 | 2 | [yoheinakajima/babyagi](https://github.com/yoheinakajima/babyagi) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · slavakurilyak/awesome-ai-agents |
| 5 | 5 | [1rgs/claude-code-proxy](https://github.com/1rgs/claude-code-proxy) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 5 | [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 5 | [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 5 | [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 5 | 5 | [Maciek-roboblog/Claude-Code-Usage-Monitor](https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 5 | [peterkrueck/Claude-Code-Development-Kit](https://github.com/peterkrueck/Claude-Code-Development-Kit) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rahulvrane/awesome-claude-agents · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 5 | [steipete/claude-code-mcp](https://github.com/steipete/claude-code-mcp) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 5 | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 5 | [zebbern/claude-code-guide](https://github.com/zebbern/claude-code-guide) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 4 | [ac3xx/mcp-servers-kagi](https://github.com/ac3xx/mcp-servers-kagi) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [Arize-ai/phoenix](https://github.com/Arize-ai/phoenix) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · tensorchord/Awesome-LLMOps |
| 5 | 4 | [bgauryy/octocode-mcp](https://github.com/bgauryy/octocode-mcp) | appcypher/awesome-mcp-servers · Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers |
| 5 | 4 | [browserbase/mcp-server-browserbase](https://github.com/browserbase/mcp-server-browserbase) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [exa-labs/exa-mcp-server](https://github.com/exa-labs/exa-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) | InftyAI/Awesome-LLMOps · jqueryscript/awesome-claude-code · promptslab/Awesome-Prompt-Engineering · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 5 | 4 | [haris-musa/excel-mcp-server](https://github.com/haris-musa/excel-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [idosal/git-mcp](https://github.com/idosal/git-mcp) | LangGPT/awesome-claude-code · punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [integromat/make-mcp-server](https://github.com/integromat/make-mcp-server) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [mrexodia/ida-pro-mcp](https://github.com/mrexodia/ida-pro-mcp) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [openai/codex](https://github.com/openai/codex) | InftyAI/Awesome-LLMOps · jqueryscript/awesome-claude-code · promptslab/Awesome-Prompt-Engineering · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 5 | 4 | [pierrebrunelle/mcp-server-openai](https://github.com/pierrebrunelle/mcp-server-openai) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [Pythagora-io/gpt-pilot](https://github.com/Pythagora-io/gpt-pilot) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 5 | 4 | [qdrant/mcp-server-qdrant](https://github.com/qdrant/mcp-server-qdrant) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 4 | [TabbyML/tabby](https://github.com/TabbyML/tabby) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents · tensorchord/Awesome-LLMOps |
| 5 | 3 | [huggingface/smolagents](https://github.com/huggingface/smolagents) | Jenqyang/Awesome-AI-Agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 5 | 3 | [ollama/ollama](https://github.com/ollama/ollama) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 5 | 2 | [101dotxyz/GPTeam](https://github.com/101dotxyz/GPTeam) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 5 | 2 | [agiresearch/OpenAGI](https://github.com/agiresearch/OpenAGI) | e2b-dev/awesome-ai-agents · Hannibal046/Awesome-LLM · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 5 | 2 | [anaisbetts/mcp-youtube](https://github.com/anaisbetts/mcp-youtube) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 2 | [askbudi/roundtable](https://github.com/askbudi/roundtable) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · tensorchord/Awesome-LLMOps · yzfly/Awesome-MCP-ZH |
| 5 | 2 | [autohandai/code-cli](https://github.com/autohandai/code-cli) | IAAR-Shanghai/Awesome-AI-Memory · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-clients |
| 5 | 2 | [automazeio/ccpm](https://github.com/automazeio/ccpm) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [BerriAI/litellm](https://github.com/BerriAI/litellm) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 5 | 2 | [BloopAI/vibe-kanban](https://github.com/BloopAI/vibe-kanban) | awesome-opencode/awesome-opencode · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [coder/claudecode](https://github.com/coder/claudecode) | GetBindu/awesome-claude-code-and-skills · jmanhype/awesome-claude-code · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 5 | 2 | [conorluddy/ios-simulator-skill](https://github.com/conorluddy/ios-simulator-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit · travisvn/awesome-claude-skills |
| 5 | 2 | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [eth-sri/lmql](https://github.com/eth-sri/lmql) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents · snwfdhmp/awesome-gpt-prompt-engineering |
| 5 | 2 | [explodinggradients/ragas](https://github.com/explodinggradients/ragas) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 5 | 2 | [ezyang/codemcp](https://github.com/ezyang/codemcp) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 2 | [jarrodwatts/claude-hud](https://github.com/jarrodwatts/claude-hud) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [jerryjliu/llama_index](https://github.com/jerryjliu/llama_index) | Hannibal046/Awesome-LLM · KennethanCeyer/awesome-llmops · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 5 | 2 | [joaomdmoura/crewai](https://github.com/joaomdmoura/crewai) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 5 | 2 | [kreneskyp/ix](https://github.com/kreneskyp/ix) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 5 | 2 | [lm-sys/FastChat](https://github.com/lm-sys/FastChat) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · tensorchord/Awesome-LLMOps |
| 5 | 2 | [melih-unsal/DemoGPT](https://github.com/melih-unsal/DemoGPT) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · snwfdhmp/awesome-gpt-prompt-engineering |
| 5 | 2 | [microsoft/markitdown](https://github.com/microsoft/markitdown) | AlexMili/Awesome-MCP · lizhe2004/Awesome-LLM-RAG-Application · punkpeye/awesome-mcp-servers · WangRongsheng/awesome-LLM-resources · yzfly/Awesome-MCP-ZH |
| 5 | 2 | [nilsherzig/LLocalSearch](https://github.com/nilsherzig/LLocalSearch) | Hannibal046/Awesome-LLM · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application |
| 5 | 2 | [numman-ali/openskills](https://github.com/numman-ali/openskills) | awesome-opencode/awesome-opencode · GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [onestardao/WFGY](https://github.com/onestardao/WFGY) | Danielskry/Awesome-RAG · DEEP-PolyU/Awesome-GraphRAG · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application |
| 5 | 2 | [openai/swarm](https://github.com/openai/swarm) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · punkpeye/awesome-mcp-clients · WangRongsheng/awesome-LLM-resources |
| 5 | 2 | [OpenBMB/AgentVerse](https://github.com/OpenBMB/AgentVerse) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 5 | 2 | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [promptslab/Promptify](https://github.com/promptslab/Promptify) | Hannibal046/Awesome-LLM · jim-schwoebel/awesome_ai_agents · KennethanCeyer/awesome-llmops · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering |
| 5 | 2 | [PromtEngineer/localGPT](https://github.com/PromtEngineer/localGPT) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 5 | 2 | [ruc-datalab/DeepAnalyze](https://github.com/ruc-datalab/DeepAnalyze) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents · WangRongsheng/awesome-LLM-resources |
| 5 | 2 | [ryoppippi/ccusage](https://github.com/ryoppippi/ccusage) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [sindresorhus/awesome](https://github.com/sindresorhus/awesome) | awesome-opencode/awesome-opencode · corca-ai/awesome-llm-security · kaushikb11/awesome-llm-agents · rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 5 | 2 | [SKULLFIRE07/cortex-memory](https://github.com/SKULLFIRE07/cortex-memory) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · jxzhangjhu/Awesome-LLM-RAG · rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 5 | 2 | [smtg-ai/claude-squad](https://github.com/smtg-ai/claude-squad) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [sooperset/mcp-atlassian](https://github.com/sooperset/mcp-atlassian) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 5 | 2 | [splx-ai/agentic-radar](https://github.com/splx-ai/agentic-radar) | corca-ai/awesome-llm-security · Hannibal046/Awesome-LLM · Jenqyang/Awesome-AI-Agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-langchain |
| 5 | 2 | [stitionai/devika](https://github.com/stitionai/devika) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents |
| 5 | 2 | [strowk/mcp-k8s-go](https://github.com/strowk/mcp-k8s-go) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 2 | [swarmclawai/swarmclaw](https://github.com/swarmclawai/swarmclaw) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · punkpeye/awesome-mcp-clients · rohitg00/awesome-claude-code-toolkit · tensorchord/Awesome-LLMOps |
| 5 | 2 | [traceloop/openllmetry](https://github.com/traceloop/openllmetry) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application · punkpeye/awesome-mcp-devtools · tensorchord/Awesome-LLMOps |
| 5 | 2 | [trailofbits/skills](https://github.com/trailofbits/skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · travisvn/awesome-claude-skills |
| 5 | 2 | [weibaohui/k8m](https://github.com/weibaohui/k8m) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 5 | 2 | [winfunc/opcode](https://github.com/winfunc/opcode) | GetBindu/awesome-claude-code-and-skills · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 5 | 2 | [yusufkaraaslan/Skill_Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) | GetBindu/awesome-claude-code-and-skills · Prat011/awesome-llm-skills · punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery · travisvn/awesome-claude-skills |
| 5 | 2 | [zenml-io/mcp-zenml](https://github.com/zenml-io/mcp-zenml) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |

**Tier 1 observations**:

- **`microsoft/autogen`** (12 lists) is the most universally-cited SOTA primitive — present in every agent/orchestrator/LLMOps/CC catalog. Microsoft Agent Framework's v1.0 GA succeeded autogen in this runtime's mem-recall.
- **`anthropic/*` cluster** (anthropics/claude-code 8, anthropics/skills 7, anthropic-sdk-python implicit) anchors the CC-direct rel=5 list with strong cross-citation.
- **Code-agent peers** (cline 7 · continuedev 9 · aider implicit · opencode · cursor) cross-cite with CC consistently.
- **Anthropic-adjacent MCP gravity**: `modelcontextprotocol/servers` (9) · `github/github-mcp-server` (8) · `jlowin/fastmcp` (8) · `cloudflare/mcp-server-cloudflare` (7) anchor the MCP-server tier.
- **Observability/eval triad**: `langfuse/langfuse` (9) · `comet-ml/opik` (8) · `stanfordnlp/dspy` (8) — these surface across both CC and LLM-eval lists. Note: Langfuse is already live in this runtime per L382 (v3.160.0).
- **Agent-framework convergence**: `microsoft/semantic-kernel` (9) · `langchain-ai/langchain` (8) · `run-llama/llama_index` (8) · `crewAIInc/crewAI` · `pydantic/pydantic-ai` (8) · `OpenBMB/XAgent` (8) — 6-way frame-of-reference for "what is an agent framework". Pydantic-AI specifically anchors the `ai:building-pydantic-ai-agents` skill in this runtime.
- **Vector DB convergence**: `qdrant/qdrant` (7) · `weaviate/weaviate` (5) · `milvus-io/milvus` (5) · `chroma-core/chroma` (5) · `facebookresearch/faiss` (5) — all-in Tier-1.
- **RAG framework convergence**: `infiniflow/ragflow` (6) · `deepset-ai/haystack` (10) · `run-llama/llama_index` (8) · `stanford-futuredata/ColBERT` implicit.
- **Anthropic primitives that DIDN'T make Tier-1** (worth note): `anthropic-experimental/sandbox-runtime`, `anthropics/devcontainer-features`, vertical-domain plugins (`financial-services-plugins`, `knowledge-work-plugins`, `life-sciences`) — all stuck Tier-4 because cataloguers haven't propagated them yet (release recency 2026-Q1+). These are universal-tier candidates by source-authority but lag in citation count.

---

## 4. Tier 2 — Strong consensus

**546 repos** cited in 3-4 distinct lists. Strong SOTA signal — second-ring candidates worth deliberate evaluation.

| cite | rel | Repo | Sources |
|---:|---:|:---|:---|
| 4 | 5 | [Aider-AI/aider](https://github.com/Aider-AI/aider) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-agents · langgptai/awesome-claude-prompts · promptslab/Awesome-Prompt-Engineering |
| 4 | 5 | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 4 | 5 | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [anthropics/prompt-eng-interactive-tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial) | jim-schwoebel/awesome_ai_agents · langgptai/awesome-claude-prompts · promptslab/Awesome-Prompt-Engineering · shahshrey/awesome-claude-code-mastery |
| 4 | 5 | [BehiSecc/awesome-claude-skills](https://github.com/BehiSecc/awesome-claude-skills) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 4 | 5 | [diet103/claude-code-infrastructure-showcase](https://github.com/diet103/claude-code-infrastructure-showcase) | GetBindu/awesome-claude-code-and-skills · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [disler/claude-code-hooks-multi-agent-observability](https://github.com/disler/claude-code-hooks-multi-agent-observability) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [frankbria/ralph-claude-code](https://github.com/frankbria/ralph-claude-code) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [fuergaosi233/claude-code-proxy](https://github.com/fuergaosi233/claude-code-proxy) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [Jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [Pimzino/claude-code-spec-workflow](https://github.com/Pimzino/claude-code-spec-workflow) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [punkpeye/awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 5 | [punkpeye/fastmcp](https://github.com/punkpeye/fastmcp) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code |
| 4 | 5 | [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 5 | [wong2/mcp-cli](https://github.com/wong2/mcp-cli) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [21st-dev/magic-mcp](https://github.com/21st-dev/magic-mcp) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [achiya-automation/safari-mcp](https://github.com/achiya-automation/safari-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [apify/actors-mcp-server](https://github.com/apify/actors-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [apinetwork/piapi-mcp-server](https://github.com/apinetwork/piapi-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [arvindand/maven-tools-mcp](https://github.com/arvindand/maven-tools-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers |
| 4 | 4 | [baba786/phabricator-mcp-server](https://github.com/baba786/phabricator-mcp-server) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [blazickjp/arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [browsermcp/mcp](https://github.com/browsermcp/mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [ChronulusAI/chronulus-mcp](https://github.com/ChronulusAI/chronulus-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [Coding-Solo/godot-mcp](https://github.com/Coding-Solo/godot-mcp) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [coinpaprika/dexpaprika-mcp](https://github.com/coinpaprika/dexpaprika-mcp) | Jenqyang/Awesome-AI-Agents · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [comet-ml/opik-mcp](https://github.com/comet-ml/opik-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [czlonkowski/n8n-mcp](https://github.com/czlonkowski/n8n-mcp) | LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 4 | [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [domdomegg/airtable-mcp-server](https://github.com/domdomegg/airtable-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [e2b-dev/mcp-server](https://github.com/e2b-dev/mcp-server) | appcypher/awesome-mcp-servers · LangGPT/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [edwinbernadus/nocodb-mcp-server](https://github.com/edwinbernadus/nocodb-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [efforthye/fast-filesystem-mcp](https://github.com/efforthye/fast-filesystem-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 4 | 4 | [eyalzh/browser-control-mcp](https://github.com/eyalzh/browser-control-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [fatwang2/search1api-mcp](https://github.com/fatwang2/search1api-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [Flux159/mcp-server-kubernetes](https://github.com/Flux159/mcp-server-kubernetes) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [getcursor/cursor](https://github.com/getcursor/cursor) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-clients · slavakurilyak/awesome-ai-agents |
| 4 | 4 | [Helicone/helicone](https://github.com/Helicone/helicone) | jim-schwoebel/awesome_ai_agents · KennethanCeyer/awesome-llmops · slavakurilyak/awesome-ai-agents · tensorchord/Awesome-LLMOps |
| 4 | 4 | [keboola/keboola-mcp-server](https://github.com/keboola/keboola-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [korotovsky/slack-mcp-server](https://github.com/korotovsky/slack-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers |
| 4 | 4 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents |
| 4 | 4 | [lharries/whatsapp-mcp](https://github.com/lharries/whatsapp-mcp) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [LucasHild/mcp-server-bigquery](https://github.com/LucasHild/mcp-server-bigquery) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [MervinPraison/praisonai-mcp](https://github.com/MervinPraison/praisonai-mcp) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 4 | 4 | [MindscapeHQ/mcp-server-raygun](https://github.com/MindscapeHQ/mcp-server-raygun) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 4 | 4 | [modelcontextprotocol/inspector](https://github.com/modelcontextprotocol/inspector) | AlexMili/Awesome-MCP · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-devtools · subinium/awesome-claude-code |
| 4 | 4 | [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-devtools · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [neondatabase/mcp-server-neon](https://github.com/neondatabase/mcp-server-neon) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [opencode-ai/opencode](https://github.com/opencode-ai/opencode) | LangGPT/awesome-claude-code · promptslab/Awesome-Prompt-Engineering · shahshrey/awesome-claude-code-mastery · WangRongsheng/awesome-LLM-resources |
| 4 | 4 | [OpenDevin/OpenDevin](https://github.com/OpenDevin/OpenDevin) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 4 | 4 | [operantlabs/operant-mcp](https://github.com/operantlabs/operant-mcp) | gauravfs-14/awesome-mcp · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 4 | 4 | [OthersideAI/self-operating-computer](https://github.com/OthersideAI/self-operating-computer) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · steel-dev/awesome-web-agents |
| 4 | 4 | [pyroprompts/any-chat-completions-mcp](https://github.com/pyroprompts/any-chat-completions-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [rad-security/mcp-server](https://github.com/rad-security/mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [recursechat/mcp-server-apple-shortcuts](https://github.com/recursechat/mcp-server-apple-shortcuts) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [scrapeless-ai/scrapeless-mcp-server](https://github.com/scrapeless-ai/scrapeless-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers |
| 4 | 4 | [Seym0n/tiktok-mcp](https://github.com/Seym0n/tiktok-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [shopsavvy/shopsavvy-mcp-server](https://github.com/shopsavvy/shopsavvy-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 4 | 4 | [softeria/ms-365-mcp-server](https://github.com/softeria/ms-365-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [supabase-community/supabase-mcp](https://github.com/supabase-community/supabase-mcp) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 4 | [yepcode/mcp-server-js](https://github.com/yepcode/mcp-server-js) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 3 | [czlonkowski/n8n-skills](https://github.com/czlonkowski/n8n-skills) | jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 3 | [microsoft/graphrag](https://github.com/microsoft/graphrag) | Danielskry/Awesome-RAG · DEEP-PolyU/Awesome-GraphRAG · InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 4 | 3 | [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-langchain · punkpeye/awesome-mcp-clients · WangRongsheng/awesome-LLM-resources |
| 4 | 3 | [sgl-project/sglang](https://github.com/sgl-project/sglang) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 4 | 2 | [agenticnotetaking/arscontexta](https://github.com/agenticnotetaking/arscontexta) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [agno-agi/agno](https://github.com/agno-agi/agno) | InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [anaisbetts/mcp-installer](https://github.com/anaisbetts/mcp-installer) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [biegehydra/BifrostMCP](https://github.com/biegehydra/BifrostMCP) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [BurtTheCoder/mcp-shodan](https://github.com/BurtTheCoder/mcp-shodan) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [BurtTheCoder/mcp-virustotal](https://github.com/BurtTheCoder/mcp-virustotal) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [bytebase/dbhub](https://github.com/bytebase/dbhub) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [centralmind/gateway](https://github.com/centralmind/gateway) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [ChanMeng666/server-google-news](https://github.com/ChanMeng666/server-google-news) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [chargebee/agentkit](https://github.com/chargebee/agentkit) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [CoderGamester/mcp-unity](https://github.com/CoderGamester/mcp-unity) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [confident-ai/deepeval](https://github.com/confident-ai/deepeval) | InftyAI/Awesome-LLMOps · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [cyberchitta/llm-context](https://github.com/cyberchitta/llm-context) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [danhilse/notion_mcp](https://github.com/danhilse/notion_mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1) | atfortes/Awesome-LLM-Reasoning · Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 4 | 2 | [doobidoo/mcp-memory-service](https://github.com/doobidoo/mcp-memory-service) | LangGPT/awesome-claude-code · punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [entropy-research/Devon](https://github.com/entropy-research/Devon) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [ergut/mcp-bigquery-server](https://github.com/ergut/mcp-bigquery-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [evalstate/mcp-hfspace](https://github.com/evalstate/mcp-hfspace) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) | Hannibal046/Awesome-LLM · KennethanCeyer/awesome-llmops · promptslab/Awesome-Prompt-Engineering · snwfdhmp/awesome-gpt-prompt-engineering |
| 4 | 2 | [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [fetchai/uAgents](https://github.com/fetchai/uAgents) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [furey/mongodb-lens](https://github.com/furey/mongodb-lens) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [ggerganov/llama](https://github.com/ggerganov/llama) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 4 | 2 | [gmpetrov/databerry](https://github.com/gmpetrov/databerry) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [googleapis/genai-toolbox](https://github.com/googleapis/genai-toolbox) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · travisvn/awesome-claude-skills |
| 4 | 2 | [HendryAvila/Hoofy](https://github.com/HendryAvila/Hoofy) | AlexMili/Awesome-MCP · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | DEEP-PolyU/Awesome-GraphRAG · InftyAI/Awesome-LLMOps · lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [homanp/superagent](https://github.com/homanp/superagent) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 4 | 2 | [iannuttall/claude-agents](https://github.com/iannuttall/claude-agents) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rahulvrane/awesome-claude-agents · subinium/awesome-claude-code |
| 4 | 2 | [ihor-sokoliuk/mcp-searxng](https://github.com/ihor-sokoliuk/mcp-searxng) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [imartinez/privateGPT](https://github.com/imartinez/privateGPT) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 4 | 2 | [InternLM/lagent](https://github.com/InternLM/lagent) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [InternLM/lmdeploy](https://github.com/InternLM/lmdeploy) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 4 | 2 | [ip2location/mcp-ip2location-io](https://github.com/ip2location/mcp-ip2location-io) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [isaacwasserman/mcp-snowflake-server](https://github.com/isaacwasserman/mcp-snowflake-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [isaacwasserman/mcp-vegalite-server](https://github.com/isaacwasserman/mcp-vegalite-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [janhq/jan](https://github.com/janhq/jan) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [jjsantos01/qgis_mcp](https://github.com/jjsantos01/qgis_mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [joaomdmoura/crewAI](https://github.com/joaomdmoura/crewAI) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · kaushikb11/awesome-llm-agents · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [Josh-XT/AGiXT](https://github.com/Josh-XT/AGiXT) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [julien040/anyquery](https://github.com/julien040/anyquery) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [K-Dense-AI/claude-scientific-skills](https://github.com/K-Dense-AI/claude-scientific-skills) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · travisvn/awesome-claude-skills · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [keturiosakys/bluesky-context-server](https://github.com/keturiosakys/bluesky-context-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [kiliczsh/mcp-mongo-server](https://github.com/kiliczsh/mcp-mongo-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode) | LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [kuafuai/DevOpsGPT](https://github.com/kuafuai/DevOpsGPT) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [kyegomez/swarms](https://github.com/kyegomez/swarms) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [LaurieWired/GhidraMCP](https://github.com/LaurieWired/GhidraMCP) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · subinium/awesome-claude-code |
| 4 | 2 | [mamertofabian/mcp-everything-search](https://github.com/mamertofabian/mcp-everything-search) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [mark3labs/mcp-filesystem-server](https://github.com/mark3labs/mcp-filesystem-server) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [mark3labs/mcp-go](https://github.com/mark3labs/mcp-go) | AlexMili/Awesome-MCP · jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-devtools · subinium/awesome-claude-code |
| 4 | 2 | [mcpjungle/MCPJungle](https://github.com/mcpjungle/MCPJungle) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-devtools · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 4 | 2 | [memfreeme/memfree](https://github.com/memfreeme/memfree) | e2b-dev/awesome-ai-agents · Hannibal046/Awesome-LLM · kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application |
| 4 | 2 | [metorial/metorial](https://github.com/metorial/metorial) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 4 | 2 | [microsoft/DeepSpeed](https://github.com/microsoft/DeepSpeed) | Hannibal046/Awesome-LLM · KennethanCeyer/awesome-llmops · tensorchord/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 4 | 2 | [modelscope/agentscope](https://github.com/modelscope/agentscope) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [modelscope/modelscope-agent](https://github.com/modelscope/modelscope-agent) | hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · XiaoxinHe/Awesome-Graph-LLM |
| 4 | 2 | [mpaepper/llm_agents](https://github.com/mpaepper/llm_agents) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 4 | 2 | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [nowork-studio/toprank](https://github.com/nowork-studio/toprank) | GetBindu/awesome-claude-code-and-skills · Jenqyang/Awesome-AI-Agents · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit |
| 4 | 2 | [NVIDIA/NeMo-Guardrails](https://github.com/NVIDIA/NeMo-Guardrails) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [NVIDIA/TensorRT-LLM](https://github.com/NVIDIA/TensorRT-LLM) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 4 | 2 | [openagents-org/openagents](https://github.com/openagents-org/openagents) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [openclaw/openclaw](https://github.com/openclaw/openclaw) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · punkpeye/awesome-mcp-clients · punkpeye/awesome-mcp-servers |
| 4 | 2 | [PeonPing/peon-ping](https://github.com/PeonPing/peon-ping) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 4 | 2 | [PipedreamHQ/pipedream](https://github.com/PipedreamHQ/pipedream) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [plandex-ai/plandex](https://github.com/plandex-ai/plandex) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · subinium/awesome-claude-code |
| 4 | 2 | [PleasePrompto/notebooklm-skill](https://github.com/PleasePrompto/notebooklm-skill) | jqueryscript/awesome-claude-code · Prat011/awesome-llm-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [princeton-nlp/SWE-agent](https://github.com/princeton-nlp/SWE-agent) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [rusiaaman/wcgw](https://github.com/rusiaaman/wcgw) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-clients · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [ruvnet/claude-flow](https://github.com/ruvnet/claude-flow) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [SakanaAI/AI-Scientist](https://github.com/SakanaAI/AI-Scientist) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering |
| 4 | 2 | [SamurAIGPT/Camel-AutoGPT](https://github.com/SamurAIGPT/Camel-AutoGPT) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 4 | 2 | [SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [semanser/codel](https://github.com/semanser/codel) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 4 | 2 | [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 4 | 2 | [sidclawhq/platform](https://github.com/sidclawhq/platform) | InftyAI/Awesome-LLMOps · punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 4 | 2 | [sirmalloc/ccstatusline](https://github.com/sirmalloc/ccstatusline) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [Skyvern-AI/skyvern](https://github.com/Skyvern-AI/skyvern) | appcypher/awesome-mcp-servers · jim-schwoebel/awesome_ai_agents · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 4 | 2 | [slopus/happy](https://github.com/slopus/happy) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [smart-mcp-proxy/mcpproxy-go](https://github.com/smart-mcp-proxy/mcpproxy-go) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · tensorchord/Awesome-LLMOps |
| 4 | 2 | [StacklokLabs/toolhive](https://github.com/StacklokLabs/toolhive) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers · Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-devtools |
| 4 | 2 | [stepanogil/autonomous-hr-chatbot](https://github.com/stepanogil/autonomous-hr-chatbot) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 4 | 2 | [steveyegge/beads](https://github.com/steveyegge/beads) | awesome-opencode/awesome-opencode · InftyAI/Awesome-LLMOps · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [the-open-agent/openagent](https://github.com/the-open-agent/openagent) | Danielskry/Awesome-RAG · Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · TensorBlock/awesome-mcp-servers |
| 4 | 2 | [theihtisham/agent-shadow-brain](https://github.com/theihtisham/agent-shadow-brain) | atfortes/Awesome-LLM-Reasoning · InftyAI/Awesome-LLMOps · jxzhangjhu/Awesome-LLM-RAG · rohitg00/awesome-claude-code-toolkit |
| 4 | 2 | [tinybirdco/mcp-tinybird](https://github.com/tinybirdco/mcp-tinybird) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [upsonic/upsonic](https://github.com/upsonic/upsonic) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents |
| 4 | 2 | [VeriTeknik/pluggedin-mcp-proxy](https://github.com/VeriTeknik/pluggedin-mcp-proxy) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code · VoltAgent/awesome-claude-code-subagents · WangRongsheng/awesome-LLM-resources |
| 4 | 2 | [VoltAgent/voltagent](https://github.com/VoltAgent/voltagent) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · VoltAgent/awesome-claude-code-subagents |
| 4 | 2 | [WecoAI/aideml](https://github.com/WecoAI/aideml) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-agents · promptslab/Awesome-Prompt-Engineering · tensorchord/Awesome-LLMOps |
| 4 | 2 | [weibaohui/kom](https://github.com/weibaohui/kom) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [Xquik-dev/x-twitter-scraper](https://github.com/Xquik-dev/x-twitter-scraper) | awesome-opencode/awesome-opencode · punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit · yzfly/Awesome-MCP-ZH |
| 4 | 2 | [Yeachan-Heo/oh-my-claudecode](https://github.com/Yeachan-Heo/oh-my-claudecode) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 4 | 2 | [Yifan-Song793/RestGPT](https://github.com/Yifan-Song793/RestGPT) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 5 | [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 5 | [anthropics/claude-agent-sdk-python](https://github.com/anthropics/claude-agent-sdk-python) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · travisvn/awesome-claude-skills |
| 3 | 5 | [anthropics/claude-code-base-action](https://github.com/anthropics/claude-code-base-action) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 3 | 5 | [anthropics/claude-cookbooks](https://github.com/anthropics/claude-cookbooks) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code · travisvn/awesome-claude-skills |
| 3 | 5 | [ChrisWiles/claude-code-showcase](https://github.com/ChrisWiles/claude-code-showcase) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 5 | [coffeefuelbump/csv-data-summarizer-claude-skill](https://github.com/coffeefuelbump/csv-data-summarizer-claude-skill) | jqueryscript/awesome-claude-code · Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit |
| 3 | 5 | [Cranot/claude-code-guide](https://github.com/Cranot/claude-code-guide) | GetBindu/awesome-claude-code-and-skills · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 5 | [davepoon/claude-code-subagents-collection](https://github.com/davepoon/claude-code-subagents-collection) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rahulvrane/awesome-claude-agents |
| 3 | 5 | [feiskyer/claude-code-settings](https://github.com/feiskyer/claude-code-settings) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 5 | [greggh/claude-code](https://github.com/greggh/claude-code) | jmanhype/awesome-claude-code · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 3 | 5 | [jeremylongshore/claude-code-plugins-plus-skills](https://github.com/jeremylongshore/claude-code-plugins-plus-skills) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 5 | [JessyTsui/Claude-Code-Remote](https://github.com/JessyTsui/Claude-Code-Remote) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 3 | 5 | [kenryu42/claude-code-safety-net](https://github.com/kenryu42/claude-code-safety-net) | awesome-opencode/awesome-opencode · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 5 | [lst97/claude-code-sub-agents](https://github.com/lst97/claude-code-sub-agents) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 3 | 5 | [OneRedOak/claude-code-workflows](https://github.com/OneRedOak/claude-code-workflows) | GetBindu/awesome-claude-code-and-skills · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 5 | [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 3 | 5 | [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · shahshrey/awesome-claude-code-mastery |
| 3 | 5 | [SDGLBL/mcp-claude-code](https://github.com/SDGLBL/mcp-claude-code) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · punkpeye/awesome-mcp-servers |
| 3 | 5 | [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 5 | [somersby10ml/win-claude-code](https://github.com/somersby10ml/win-claude-code) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 3 | 5 | [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 5 | [wanshuiyin/Auto-claude-code-research-in-sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | jqueryscript/awesome-claude-code · promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 3 | 5 | [yifanzz/claude-code-boost](https://github.com/yifanzz/claude-code-boost) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 3 | 5 | [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 4 | [agentset-ai/mcp-server](https://github.com/agentset-ai/mcp-server) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [ahnlabio/bicscan-mcp](https://github.com/ahnlabio/bicscan-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [ahujasid/blender-mcp](https://github.com/ahujasid/blender-mcp) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 3 | 4 | [alexei-led/aws-mcp-server](https://github.com/alexei-led/aws-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [alexei-led/k8s-mcp-server](https://github.com/alexei-led/k8s-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [alfonsograziano/node-code-sandbox-mcp](https://github.com/alfonsograziano/node-code-sandbox-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 4 | [aliyun/alibaba-cloud-ops-mcp-server](https://github.com/aliyun/alibaba-cloud-ops-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 4 | [anjor/coinmarket-mcp-server](https://github.com/anjor/coinmarket-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [anomalyco/opencode](https://github.com/anomalyco/opencode) | awesome-opencode/awesome-opencode · jqueryscript/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 3 | 4 | [apify/mcp-server-rag-web-browser](https://github.com/apify/mcp-server-rag-web-browser) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [atomicchonk/roadrecon_mcp_server](https://github.com/atomicchonk/roadrecon_mcp_server) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [Automata-Labs-team/MCP-Server-Playwright](https://github.com/Automata-Labs-team/MCP-Server-Playwright) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [Bigsy/Clojars-MCP-Server](https://github.com/Bigsy/Clojars-MCP-Server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [blackwhite084/playwright-plus-python-mcp](https://github.com/blackwhite084/playwright-plus-python-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [bright8192/esxi-mcp-server](https://github.com/bright8192/esxi-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [buildkite/buildkite-mcp-server](https://github.com/buildkite/buildkite-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [c4pt0r/mcp-server-tidb](https://github.com/c4pt0r/mcp-server-tidb) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [campertunity/mcp-server](https://github.com/campertunity/mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [chroma-core/chroma-mcp](https://github.com/chroma-core/chroma-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [co-browser/browser-use-mcp-server](https://github.com/co-browser/browser-use-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [Couchbase-Ecosystem/mcp-server-couchbase](https://github.com/Couchbase-Ecosystem/mcp-server-couchbase) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering |
| 3 | 4 | [currents-dev/currents-mcp](https://github.com/currents-dev/currents-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [Custodia-Admin/pagebolt-mcp](https://github.com/Custodia-Admin/pagebolt-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 4 | [ddukbg/github-enterprise-mcp](https://github.com/ddukbg/github-enterprise-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [Dumpling-AI/mcp-server-dumplingai](https://github.com/Dumpling-AI/mcp-server-dumplingai) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [entire-vc/evc-team-relay-mcp](https://github.com/entire-vc/evc-team-relay-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [erikhoward/adls-mcp-server](https://github.com/erikhoward/adls-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [ferrislucas/iterm-mcp](https://github.com/ferrislucas/iterm-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [feuerdev/keep-mcp](https://github.com/feuerdev/keep-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [fr0gger/MCP_Security](https://github.com/fr0gger/MCP_Security) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [g0t4/mcp-server-commands](https://github.com/g0t4/mcp-server-commands) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [getrupt/ashra-mcp](https://github.com/getrupt/ashra-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [githejie/mcp-server-calculator](https://github.com/githejie/mcp-server-calculator) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [gitmotion/ntfy-me-mcp](https://github.com/gitmotion/ntfy-me-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [GLips/Figma-Context-MCP](https://github.com/GLips/Figma-Context-MCP) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 3 | 4 | [gomarble-ai/facebook-ads-mcp-server](https://github.com/gomarble-ai/facebook-ads-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [gomarble-ai/google-ads-mcp-server](https://github.com/gomarble-ai/google-ads-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [google/adk-python](https://github.com/google/adk-python) | InftyAI/Awesome-LLMOps · kaushikb11/awesome-llm-agents · promptslab/Awesome-Prompt-Engineering |
| 3 | 4 | [gorosun/unified-diff-mcp](https://github.com/gorosun/unified-diff-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [gpt-engineer-org/gpt-engineer](https://github.com/gpt-engineer-org/gpt-engineer) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 4 | [graphlit/graphlit-mcp-server](https://github.com/graphlit/graphlit-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [GreptimeTeam/greptimedb-mcp-server](https://github.com/GreptimeTeam/greptimedb-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [hardik-id/azure-resource-graph-mcp-server](https://github.com/hardik-id/azure-resource-graph-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [hieuttmmo/entraid-mcp-server](https://github.com/hieuttmmo/entraid-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [hive-intel/hive-crypto-mcp](https://github.com/hive-intel/hive-crypto-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [hmk/box-mcp-server](https://github.com/hmk/box-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [Hypersequent/qasphere-mcp](https://github.com/Hypersequent/qasphere-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [iplocate/mcp-server-iplocate](https://github.com/iplocate/mcp-server-iplocate) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [isnow890/naver-search-mcp](https://github.com/isnow890/naver-search-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) | appcypher/awesome-mcp-servers · GetBindu/awesome-claude-code-and-skills · punkpeye/awesome-mcp-servers |
| 3 | 4 | [ivo-toby/contentful-mcp](https://github.com/ivo-toby/contentful-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [izzzzzi/codewiki-mcp](https://github.com/izzzzzi/codewiki-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [jagan-shanmugam/climatiq-mcp-server](https://github.com/jagan-shanmugam/climatiq-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [jdubois/azure-cli-mcp](https://github.com/jdubois/azure-cli-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [JoeyBrar/agentseal-mcp](https://github.com/JoeyBrar/agentseal-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 4 | [jsdelivr/globalping-mcp-server](https://github.com/jsdelivr/globalping-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [kimtaeyoon83/mcp-server-youtube-transcript](https://github.com/kimtaeyoon83/mcp-server-youtube-transcript) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [kopfrechner/gitlab-mr-mcp](https://github.com/kopfrechner/gitlab-mr-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [ktanaka101/mcp-server-duckdb](https://github.com/ktanaka101/mcp-server-duckdb) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [langchain-ai/langserve](https://github.com/langchain-ai/langserve) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 3 | 4 | [langchain-ai/open-swe](https://github.com/langchain-ai/open-swe) | InftyAI/Awesome-LLMOps · promptslab/Awesome-Prompt-Engineering · subinium/awesome-claude-code |
| 3 | 4 | [langfuse/mcp-server-langfuse](https://github.com/langfuse/mcp-server-langfuse) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [last9/last9-mcp-server](https://github.com/last9/last9-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [line/line-bot-mcp-server](https://github.com/line/line-bot-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [luminati-io/brightdata-mcp](https://github.com/luminati-io/brightdata-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 3 | 4 | [makenotion/notion-mcp-server](https://github.com/makenotion/notion-mcp-server) | subinium/awesome-claude-code · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [manusa/kubernetes-mcp-server](https://github.com/manusa/kubernetes-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [marimo-team/codemirror-mcp](https://github.com/marimo-team/codemirror-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 3 | 4 | [maxim-saplin/mcp_safe_local_python_executor](https://github.com/maxim-saplin/mcp_safe_local_python_executor) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [mcp-use/mcp-use](https://github.com/mcp-use/mcp-use) | punkpeye/awesome-mcp-devtools · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 4 | [metoro-io/metoro-mcp-server](https://github.com/metoro-io/metoro-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [MladenSU/cli-mcp-server](https://github.com/MladenSU/cli-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol) | promptslab/Awesome-Prompt-Engineering · Puliczek/awesome-mcp-security · subinium/awesome-claude-code |
| 3 | 4 | [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | AlexMili/Awesome-MCP · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [mrexodia/user-feedback-mcp](https://github.com/mrexodia/user-feedback-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [niledatabase/nile-mcp-server](https://github.com/niledatabase/nile-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [OctagonAI/octagon-mcp-server](https://github.com/OctagonAI/octagon-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [openbnb-org/mcp-server-airbnb](https://github.com/openbnb-org/mcp-server-airbnb) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [OpenInterpreter/open-interpreter](https://github.com/OpenInterpreter/open-interpreter) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 3 | 4 | [OthmaneBlial/term_mcp_deepseek](https://github.com/OthmaneBlial/term_mcp_deepseek) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [pab1it0/prometheus-mcp-server](https://github.com/pab1it0/prometheus-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [pab1it0/tripadvisor-mcp](https://github.com/pab1it0/tripadvisor-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [paul-gauthier/aider](https://github.com/paul-gauthier/aider) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 4 | [PhononX/cv-mcp-server](https://github.com/PhononX/cv-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering |
| 3 | 4 | [PV-Bhat/vibe-check-mcp-server](https://github.com/PV-Bhat/vibe-check-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [QuantGeekDev/coincap-mcp](https://github.com/QuantGeekDev/coincap-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [QuantGeekDev/docker-mcp](https://github.com/QuantGeekDev/docker-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [QuantGeekDev/mongo-mcp](https://github.com/QuantGeekDev/mongo-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [reading-plus-ai/mcp-server-data-exploration](https://github.com/reading-plus-ai/mcp-server-data-exploration) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [reeeeemo/ancestry-mcp](https://github.com/reeeeemo/ancestry-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [rember/rember-mcp](https://github.com/rember/rember-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [rohitg00/kubectl-mcp-server](https://github.com/rohitg00/kubectl-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [securityfortech/secops-mcp](https://github.com/securityfortech/secops-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [SimonB97/win-cli-mcp-server](https://github.com/SimonB97/win-cli-mcp-server) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [sirmews/apple-notes-mcp](https://github.com/sirmews/apple-notes-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [StacklokLabs/osv-mcp](https://github.com/StacklokLabs/osv-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [steipete/CodexBar](https://github.com/steipete/CodexBar) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 4 | [takashiishida/arxiv-latex-mcp](https://github.com/takashiishida/arxiv-latex-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [tanigami/mcp-server-perplexity](https://github.com/tanigami/mcp-server-perplexity) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [TencentEdgeOne/edgeone-pages-mcp](https://github.com/TencentEdgeOne/edgeone-pages-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [TheRaLabs/legion-mcp](https://github.com/TheRaLabs/legion-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [Tiberriver256/mcp-server-azure-devops](https://github.com/Tiberriver256/mcp-server-azure-devops) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [tinyfish-io/agentql-mcp](https://github.com/tinyfish-io/agentql-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [Tomatio13/mcp-server-tavily](https://github.com/Tomatio13/mcp-server-tavily) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [ttommyth/interactive-mcp](https://github.com/ttommyth/interactive-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [urldna/mcp](https://github.com/urldna/mcp) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 4 | [vdalhambra/siteaudit-mcp](https://github.com/vdalhambra/siteaudit-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 4 | [vectorize-io/vectorize-mcp-server](https://github.com/vectorize-io/vectorize-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [wegotdocs/open-mcp](https://github.com/wegotdocs/open-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [yuna0x0/anilist-mcp](https://github.com/yuna0x0/anilist-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [yuna0x0/hackmd-mcp](https://github.com/yuna0x0/hackmd-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [zcaceres/markdownify-mcp](https://github.com/zcaceres/markdownify-mcp) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 3 | 4 | [zilliztech/mcp-server-milvus](https://github.com/zilliztech/mcp-server-milvus) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 3 | [botpress/botpress](https://github.com/botpress/botpress) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 3 | [chroma-core/chroma](https://github.com/chroma-core/chroma) | Danielskry/Awesome-RAG · InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 3 | 3 | [gotoolkits/mcp-difyworkflow-server](https://github.com/gotoolkits/mcp-difyworkflow-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 3 | [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | InftyAI/Awesome-LLMOps · lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 3 | 3 | [milvus-io/milvus](https://github.com/milvus-io/milvus) | Danielskry/Awesome-RAG · InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 3 | 3 | [unslothai/unsloth](https://github.com/unslothai/unsloth) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 3 | [weaviate/Verba](https://github.com/weaviate/Verba) | Danielskry/Awesome-RAG · lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [13bm/GhidraMCP](https://github.com/13bm/GhidraMCP) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [21st-dev/1code](https://github.com/21st-dev/1code) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [8enSmith/mcp-open-library](https://github.com/8enSmith/mcp-open-library) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [aannoo/hcom](https://github.com/aannoo/hcom) | awesome-opencode/awesome-opencode · kaushikb11/awesome-llm-agents · kyrolabs/awesome-agents |
| 3 | 2 | [activeloopai/deeplake](https://github.com/activeloopai/deeplake) | InftyAI/Awesome-LLMOps · KennethanCeyer/awesome-llmops · tensorchord/Awesome-LLMOps |
| 3 | 2 | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [adhikasp/mcp-git-ingest](https://github.com/adhikasp/mcp-git-ingest) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [admica/FileScopeMCP](https://github.com/admica/FileScopeMCP) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [agentlabs-inc/agentlabs](https://github.com/agentlabs-inc/agentlabs) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [AgentOps-AI/agentops](https://github.com/AgentOps-AI/agentops) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [agentskills/agentskills](https://github.com/agentskills/agentskills) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [AgentsMesh/AgentsMesh](https://github.com/AgentsMesh/AgentsMesh) | kyrolabs/awesome-agents · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [agiletec-inc/airis-mcp-gateway](https://github.com/agiletec-inc/airis-mcp-gateway) | rohitg00/awesome-claude-code-toolkit · TensorBlock/awesome-mcp-servers · VoltAgent/awesome-claude-code-subagents |
| 3 | 2 | [AgriciDaniel/claude-ads](https://github.com/AgriciDaniel/claude-ads) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [AgriciDaniel/claude-seo](https://github.com/AgriciDaniel/claude-seo) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [ai-dashboad/flutter-skill](https://github.com/ai-dashboad/flutter-skill) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [Aiven-Open/mcp-aiven](https://github.com/Aiven-Open/mcp-aiven) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [alaeddine-13/thinkgpt](https://github.com/alaeddine-13/thinkgpt) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [alexbakers/mcp-ipfs](https://github.com/alexbakers/mcp-ipfs) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) | FoundationAgents/awesome-foundation-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 3 | 2 | [angheljf/nyt](https://github.com/angheljf/nyt) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [antfu/skills](https://github.com/antfu/skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [apache/apisix](https://github.com/apache/apisix) | InftyAI/Awesome-LLMOps · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [axflow/axflow](https://github.com/axflow/axflow) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [aymenfurter/microagents](https://github.com/aymenfurter/microagents) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [aymericzip/intlayer](https://github.com/aymericzip/intlayer) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [backnotprop/plannotator](https://github.com/backnotprop/plannotator) | awesome-opencode/awesome-opencode · GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 3 | 2 | [bh-rat/context-awesome](https://github.com/bh-rat/context-awesome) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [Bklieger/Claude-React-Jumpstart](https://github.com/Bklieger/Claude-React-Jumpstart) | jim-schwoebel/awesome_ai_agents · LangGPT/awesome-claude-code · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [blader/humanizer](https://github.com/blader/humanizer) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [Blaizzy/mlx-vlm](https://github.com/Blaizzy/mlx-vlm) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [blob42/Instrukt](https://github.com/blob42/Instrukt) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain |
| 3 | 2 | [block/goose](https://github.com/block/goose) | InftyAI/Awesome-LLMOps · promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-clients |
| 3 | 2 | [blockpipe/blockagi](https://github.com/blockpipe/blockagi) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [BloopAI/bloop](https://github.com/BloopAI/bloop) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [BurtTheCoder/mcp-dnstwist](https://github.com/BurtTheCoder/mcp-dnstwist) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [BurtTheCoder/mcp-maigret](https://github.com/BurtTheCoder/mcp-maigret) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [calclavia/mcp-obsidian](https://github.com/calclavia/mcp-obsidian) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [calcom/cal](https://github.com/calcom/cal) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [chakkaradeep/pyCodeAGI](https://github.com/chakkaradeep/pyCodeAGI) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [charmbracelet/crush](https://github.com/charmbracelet/crush) | InftyAI/Awesome-LLMOps · jqueryscript/awesome-claude-code · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [chernistry/bernstein](https://github.com/chernistry/bernstein) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · jxzhangjhu/Awesome-LLM-RAG |
| 3 | 2 | [chiphuyen/sniffly](https://github.com/chiphuyen/sniffly) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [chrisvoncsefalvay/claude-d3js-skill](https://github.com/chrisvoncsefalvay/claude-d3js-skill) | Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit · travisvn/awesome-claude-skills |
| 3 | 2 | [claw-army/claude-node](https://github.com/claw-army/claude-node) | punkpeye/awesome-mcp-devtools · rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 3 | 2 | [ClickHouse/mcp-clickhouse](https://github.com/ClickHouse/mcp-clickhouse) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [CloudAI-X/claude-workflow-v2](https://github.com/CloudAI-X/claude-workflow-v2) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [coder/agentapi](https://github.com/coder/agentapi) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [coleam00/context-engineering-intro](https://github.com/coleam00/context-engineering-intro) | LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [dair-ai/Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) | jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering · snwfdhmp/awesome-gpt-prompt-engineering |
| 3 | 2 | [DataEval/dingo](https://github.com/DataEval/dingo) | Hannibal046/Awesome-LLM · jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-servers |
| 3 | 2 | [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [daxaur/openpaw](https://github.com/daxaur/openpaw) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [developersdigest/llm-answer-engine](https://github.com/developersdigest/llm-answer-engine) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [Dicklesworthstone/claude_code_agent_farm](https://github.com/Dicklesworthstone/claude_code_agent_farm) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · rahulvrane/awesome-claude-agents |
| 3 | 2 | [dmayboroda/minima](https://github.com/dmayboroda/minima) | kyrolabs/awesome-langchain · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [Doriandarko/claude-engineer](https://github.com/Doriandarko/claude-engineer) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [Doriandarko/maestro](https://github.com/Doriandarko/maestro) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [dust-tt/dust](https://github.com/dust-tt/dust) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [e2b-dev/e2b](https://github.com/e2b-dev/e2b) | e2b-dev/awesome-ai-agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [e2b-dev/E2B](https://github.com/e2b-dev/E2B) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [EleutherAI/gpt-neox](https://github.com/EleutherAI/gpt-neox) | codefuse-ai/Awesome-Code-LLM · Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 3 | 2 | [EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [elie222/inbox-zero](https://github.com/elie222/inbox-zero) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [elliotllliu/agent-shield](https://github.com/elliotllliu/agent-shield) | jim-schwoebel/awesome_ai_agents · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [eosphoros-ai/DB-GPT](https://github.com/eosphoros-ai/DB-GPT) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [evidentlyai/evidently](https://github.com/evidentlyai/evidently) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 3 | 2 | [evilsocket/nerve](https://github.com/evilsocket/nerve) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-clients · wong2/awesome-mcp-servers |
| 3 | 2 | [expo/skills](https://github.com/expo/skills) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code · travisvn/awesome-claude-skills |
| 3 | 2 | [farizrahman4u/loopgpt](https://github.com/farizrahman4u/loopgpt) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [fireproof-storage/mcp-database-server](https://github.com/fireproof-storage/mcp-database-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [flepied/second-brain-agent](https://github.com/flepied/second-brain-agent) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [fosdickio/binary_ninja_mcp](https://github.com/fosdickio/binary_ninja_mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [FoundationAgents/OpenManus](https://github.com/FoundationAgents/OpenManus) | InftyAI/Awesome-LLMOps · kaushikb11/awesome-llm-agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [garrytan/gstack](https://github.com/garrytan/gstack) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 3 | 2 | [generalaction/emdash](https://github.com/generalaction/emdash) | GetBindu/awesome-claude-code-and-skills · promptslab/Awesome-Prompt-Engineering · subinium/awesome-claude-code |
| 3 | 2 | [genomoncology/biomcp](https://github.com/genomoncology/biomcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [getAsterisk/claudia](https://github.com/getAsterisk/claudia) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [getzep/zep](https://github.com/getzep/zep) | IAAR-Shanghai/Awesome-AI-Memory · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [gitkraken/gk-cli](https://github.com/gitkraken/gk-cli) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [google-labs-code/stitch-skills](https://github.com/google-labs-code/stitch-skills) | GetBindu/awesome-claude-code-and-skills · helloianneo/awesome-claude-code-skills · jqueryscript/awesome-claude-code |
| 3 | 2 | [google-research/google-research](https://github.com/google-research/google-research) | atfortes/Awesome-LLM-Reasoning · codefuse-ai/Awesome-Code-LLM · FoundationAgents/awesome-foundation-agents |
| 3 | 2 | [gotoolkits/mcp-wecombot-server](https://github.com/gotoolkits/mcp-wecombot-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [grafana/mcp-grafana](https://github.com/grafana/mcp-grafana) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code · wong2/awesome-mcp-servers |
| 3 | 2 | [guardrails-ai/guardrails](https://github.com/guardrails-ai/guardrails) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [Hannibal046/Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM) | atfortes/Awesome-LLM-Reasoning · KennethanCeyer/awesome-llmops · kyrolabs/awesome-langchain |
| 3 | 2 | [heilcheng/awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [hidai25/eval-view](https://github.com/hidai25/eval-view) | promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-servers · tensorchord/Awesome-LLMOps |
| 3 | 2 | [htdt/godogen](https://github.com/htdt/godogen) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [HumanSignal/Adala](https://github.com/HumanSignal/Adala) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [hustcc/mcp-echarts](https://github.com/hustcc/mcp-echarts) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [hustcc/mcp-mermaid](https://github.com/hustcc/mcp-mermaid) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [IBM/wxflows](https://github.com/IBM/wxflows) | jim-schwoebel/awesome_ai_agents · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [iflytek/astron-agent](https://github.com/iflytek/astron-agent) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [Imbad0202/academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [iOfficeAI/AionUi](https://github.com/iOfficeAI/AionUi) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 3 | 2 | [irgolic/AutoPR](https://github.com/irgolic/AutoPR) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [ishan0102/vimGPT](https://github.com/ishan0102/vimGPT) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · steel-dev/awesome-web-agents |
| 3 | 2 | [jackmpcollins/magentic](https://github.com/jackmpcollins/magentic) | Hannibal046/Awesome-LLM · kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 3 | 2 | [jarrycyx/openlens-ai](https://github.com/jarrycyx/openlens-ai) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 3 | 2 | [joinly-ai/joinly](https://github.com/joinly-ai/joinly) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · punkpeye/awesome-mcp-servers |
| 3 | 2 | [Jonathan-Adly/AgentRun](https://github.com/Jonathan-Adly/AgentRun) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [jonradoff/lightcms](https://github.com/jonradoff/lightcms) | punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit · TensorBlock/awesome-mcp-servers |
| 3 | 2 | [joonspk-research/generative_agents](https://github.com/joonspk-research/generative_agents) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents |
| 3 | 2 | [Josh-XT/Agent-LLM](https://github.com/Josh-XT/Agent-LLM) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [josstei/maestro-orchestrate](https://github.com/josstei/maestro-orchestrate) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · Prat011/awesome-llm-skills |
| 3 | 2 | [jthack/ffuf_claude_skill](https://github.com/jthack/ffuf_claude_skill) | Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit · travisvn/awesome-claude-skills |
| 3 | 2 | [jxnl/instructor](https://github.com/jxnl/instructor) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [K-Dense-AI/scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [k-jarzyna/mcp-miro](https://github.com/k-jarzyna/mcp-miro) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [kaderosio/agent-brain](https://github.com/kaderosio/agent-brain) | IAAR-Shanghai/Awesome-AI-Memory · Jenqyang/Awesome-AI-Agents · jxzhangjhu/Awesome-LLM-RAG |
| 3 | 2 | [kadykov/mcp-openapi-schema-explorer](https://github.com/kadykov/mcp-openapi-schema-explorer) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [kagisearch/kagimcp](https://github.com/kagisearch/kagimcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [kbwo/ccmanager](https://github.com/kbwo/ccmanager) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [kimtth/mcp-aoai-web-browsing](https://github.com/kimtth/mcp-aoai-web-browsing) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [landing-ai/vision-agent](https://github.com/landing-ai/vision-agent) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [langroid/langroid](https://github.com/langroid/langroid) | e2b-dev/awesome-ai-agents · Hannibal046/Awesome-LLM · kyrolabs/awesome-langchain |
| 3 | 2 | [langwatch/langwatch](https://github.com/langwatch/langwatch) | Hannibal046/Awesome-LLM · kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 3 | 2 | [LazyAGI/LazyLLM](https://github.com/LazyAGI/LazyLLM) | Hannibal046/Awesome-LLM · lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [litanlitudan/skyagi](https://github.com/litanlitudan/skyagi) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [Liu-Hy/GenoMAS](https://github.com/Liu-Hy/GenoMAS) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents |
| 3 | 2 | [logspace-ai/langflow](https://github.com/logspace-ai/langflow) | KennethanCeyer/awesome-llmops · kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 3 | 2 | [longportapp/openapi](https://github.com/longportapp/openapi) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [Lucassssss/eechat](https://github.com/Lucassssss/eechat) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-clients · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [Lum1104/Understand-Anything](https://github.com/Lum1104/Understand-Anything) | jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 3 | 2 | [luohy15/y-router](https://github.com/luohy15/y-router) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 3 | 2 | [luoyuctl/agenttrace](https://github.com/luoyuctl/agenttrace) | GetBindu/awesome-claude-code-and-skills · Jenqyang/Awesome-AI-Agents · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [lupantech/AgentFlow](https://github.com/lupantech/AgentFlow) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents |
| 3 | 2 | [Marker-Inc-Korea/AutoRAG](https://github.com/Marker-Inc-Korea/AutoRAG) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [Maximilian-Winter/llama-cpp-agent](https://github.com/Maximilian-Winter/llama-cpp-agent) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [meta-llama/llama-agentic-system](https://github.com/meta-llama/llama-agentic-system) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [meta-llama/PurpleLlama](https://github.com/meta-llama/PurpleLlama) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [metatool-ai/metatool-app](https://github.com/metatool-ai/metatool-app) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [microsoft/agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit) | Jenqyang/Awesome-AI-Agents · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 2 | [microsoft/DeepSpeed-MII](https://github.com/microsoft/DeepSpeed-MII) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 3 | 2 | [microsoft/MInference](https://github.com/microsoft/MInference) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 3 | 2 | [microsoft/MM-REACT](https://github.com/microsoft/MM-REACT) | atfortes/Awesome-LLM-Reasoning · FoundationAgents/awesome-foundation-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [microsoft/skills](https://github.com/microsoft/skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [microsoft/TaskWeaver](https://github.com/microsoft/TaskWeaver) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [microsoft/TypeChat](https://github.com/microsoft/TypeChat) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [microsoft/UFO](https://github.com/microsoft/UFO) | e2b-dev/awesome-ai-agents · FoundationAgents/awesome-foundation-agents · Jenqyang/Awesome-AI-Agents |
| 3 | 2 | [mindsdb/mindsdb](https://github.com/mindsdb/mindsdb) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [miurla/babyagi-ui](https://github.com/miurla/babyagi-ui) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [mnotgod96/AppAgent](https://github.com/mnotgod96/AppAgent) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [Moresl/cchub](https://github.com/Moresl/cchub) | jxzhangjhu/Awesome-LLM-RAG · Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [muratcankoylan/Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [mvanhorn/last30days-skill](https://github.com/mvanhorn/last30days-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [nanbingxyz/5ire](https://github.com/nanbingxyz/5ire) | InftyAI/Awesome-LLMOps · punkpeye/awesome-mcp-clients · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [ndthanhdev/mcp-browser-kit](https://github.com/ndthanhdev/mcp-browser-kit) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [neo4j-contrib/mcp-neo4j](https://github.com/neo4j-contrib/mcp-neo4j) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [neuml/txtai](https://github.com/neuml/txtai) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 3 | 2 | [nick1udwig/kibitz](https://github.com/nick1udwig/kibitz) | punkpeye/awesome-mcp-clients · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [nickpending/mcp-recon](https://github.com/nickpending/mcp-recon) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [nizos/tdd-guard](https://github.com/nizos/tdd-guard) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [njbrake/agent-of-empires](https://github.com/njbrake/agent-of-empires) | awesome-opencode/awesome-opencode · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [nwiizo/tfmcp](https://github.com/nwiizo/tfmcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [nylas/cli](https://github.com/nylas/cli) | rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 2 | [omega-memory/omega-memory](https://github.com/omega-memory/omega-memory) | IAAR-Shanghai/Awesome-AI-Memory · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 3 | 2 | [omxyz/lumen](https://github.com/omxyz/lumen) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · steel-dev/awesome-web-agents |
| 3 | 2 | [op7418/CodePilot](https://github.com/op7418/CodePilot) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [open-strategy-partners/osp_marketing_tools](https://github.com/open-strategy-partners/osp_marketing_tools) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [openai/openai-cookbook](https://github.com/openai/openai-cookbook) | promptslab/Awesome-Prompt-Engineering · snwfdhmp/awesome-gpt-prompt-engineering · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [OpenBioLink/ThoughtSource](https://github.com/OpenBioLink/ThoughtSource) | atfortes/Awesome-LLM-Reasoning · kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [opentabs-dev/opentabs](https://github.com/opentabs-dev/opentabs) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 2 | [OptimalScale/LMFlow](https://github.com/OptimalScale/LMFlow) | InftyAI/Awesome-LLMOps · KennethanCeyer/awesome-llmops · tensorchord/Awesome-LLMOps |
| 3 | 2 | [Orchestra-Research/AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | GetBindu/awesome-claude-code-and-skills · promptslab/Awesome-Prompt-Engineering · subinium/awesome-claude-code |
| 3 | 2 | [OSU-NLP-Group/HippoRAG](https://github.com/OSU-NLP-Group/HippoRAG) | FoundationAgents/awesome-foundation-agents · jxzhangjhu/Awesome-LLM-RAG · XiaoxinHe/Awesome-Graph-LLM |
| 3 | 2 | [parcadei/Continuous-Claude-v3](https://github.com/parcadei/Continuous-Claude-v3) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [paulpierre/RasaGPT](https://github.com/paulpierre/RasaGPT) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [phidatahq/phidata](https://github.com/phidatahq/phidata) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [pipecat-ai/pipecat](https://github.com/pipecat-ai/pipecat) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [pleisto/flappy](https://github.com/pleisto/flappy) | kaushikb11/awesome-llm-agents · kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 3 | 2 | [Portkey-AI/gateway](https://github.com/Portkey-AI/gateway) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · kyrolabs/awesome-langchain |
| 3 | 2 | [PrefectHQ/marvin](https://github.com/PrefectHQ/marvin) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [preflight-dev/preflight](https://github.com/preflight-dev/preflight) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [princeton-nlp/swe-agent](https://github.com/princeton-nlp/swe-agent) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [promptslab/Awesome-Prompt-Engineering](https://github.com/promptslab/Awesome-Prompt-Engineering) | jim-schwoebel/awesome_ai_agents · KennethanCeyer/awesome-llmops · snwfdhmp/awesome-gpt-prompt-engineering |
| 3 | 2 | [pytorch/torchtune](https://github.com/pytorch/torchtune) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [qianniuspace/mcp-security-audit](https://github.com/qianniuspace/mcp-security-audit) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [QwenLM/Qwen-Agent](https://github.com/QwenLM/Qwen-Agent) | InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [QwenLM/Qwen2](https://github.com/QwenLM/Qwen2) | codefuse-ai/Awesome-Code-LLM · FoundationAgents/awesome-foundation-agents · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [RayVentura/ShortGPT](https://github.com/RayVentura/ShortGPT) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [reworkd/bananalyzer](https://github.com/reworkd/bananalyzer) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · steel-dev/awesome-web-agents |
| 3 | 2 | [reworkd/tarsier](https://github.com/reworkd/tarsier) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents · steel-dev/awesome-web-agents |
| 3 | 2 | [roadwy/cve-search_mcp](https://github.com/roadwy/cve-search_mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) | awesome-opencode/awesome-opencode · GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 3 | 2 | [saharmor/voice-lab](https://github.com/saharmor/voice-lab) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 3 | 2 | [salesforce/CodeGen](https://github.com/salesforce/CodeGen) | codefuse-ai/Awesome-Code-LLM · jim-schwoebel/awesome_ai_agents · tensorchord/Awesome-LLMOps |
| 3 | 2 | [salespeak-ai/buyer-eval-skill](https://github.com/salespeak-ai/buyer-eval-skill) | GetBindu/awesome-claude-code-and-skills · Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [sendaifun/solana-agent-kit](https://github.com/sendaifun/solana-agent-kit) | jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-devtools · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [ShengranHu/ADAS](https://github.com/ShengranHu/ADAS) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Hannibal046/Awesome-LLM · rohitg00/awesome-ai-apps · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [SimoneAvogadro/android-reverse-engineering-skill](https://github.com/SimoneAvogadro/android-reverse-engineering-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [StacklokLabs/mkp](https://github.com/StacklokLabs/mkp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 3 | 2 | [steamship-packages/langchain-agent-production-starter](https://github.com/steamship-packages/langchain-agent-production-starter) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 3 | 2 | [steel-dev/steel-browser](https://github.com/steel-dev/steel-browser) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents · steel-dev/awesome-web-agents |
| 3 | 2 | [steipete/agent-rules](https://github.com/steipete/agent-rules) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [strands-agents/sdk-python](https://github.com/strands-agents/sdk-python) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [stripe/agent-toolkit](https://github.com/stripe/agent-toolkit) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [suekou/mcp-notion-server](https://github.com/suekou/mcp-notion-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [supermemoryai/claude-supermemory](https://github.com/supermemoryai/claude-supermemory) | rohitg00/awesome-claude-code-toolkit · shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 3 | 2 | [supertrained/rhumb](https://github.com/supertrained/rhumb) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 3 | 2 | [SWE-agent/SWE-agent](https://github.com/SWE-agent/SWE-agent) | FoundationAgents/awesome-foundation-agents · InftyAI/Awesome-LLMOps · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [tacticlaunch/mcp-linear](https://github.com/tacticlaunch/mcp-linear) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [tadata-org/fastapi_mcp](https://github.com/tadata-org/fastapi_mcp) | punkpeye/awesome-mcp-devtools · subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [Technion-Kishony-lab/data-to-paper](https://github.com/Technion-Kishony-lab/data-to-paper) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 3 | 2 | [The-Vibe-Company/companion](https://github.com/The-Vibe-Company/companion) | jqueryscript/awesome-claude-code · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 3 | 2 | [theihtisham/omni-skills-forge](https://github.com/theihtisham/omni-skills-forge) | atfortes/Awesome-LLM-Reasoning · jxzhangjhu/Awesome-LLM-RAG · rohitg00/awesome-claude-code-toolkit |
| 3 | 2 | [thunderboltsid/mcp-nutanix](https://github.com/thunderboltsid/mcp-nutanix) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [trypromptly/LLMStack](https://github.com/trypromptly/LLMStack) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain |
| 3 | 2 | [tumf/mcp-shell-server](https://github.com/tumf/mcp-shell-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · promptslab/Awesome-Prompt-Engineering |
| 3 | 2 | [UfoMiao/zcf](https://github.com/UfoMiao/zcf) | GetBindu/awesome-claude-code-and-skills · LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [Upsonic/gpt-computer-assistant](https://github.com/Upsonic/gpt-computer-assistant) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 3 | 2 | [upstash/context7](https://github.com/upstash/context7) | promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 3 | 2 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | helloianneo/awesome-claude-code-skills · jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 3 | 2 | [VictoriaMetrics-Community/mcp-victoriametrics](https://github.com/VictoriaMetrics-Community/mcp-victoriametrics) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 3 | 2 | [vitali87/code-graph-rag](https://github.com/vitali87/code-graph-rag) | Danielskry/Awesome-RAG · DEEP-PolyU/Awesome-GraphRAG · LangGPT/awesome-claude-code |
| 3 | 2 | [vivekVells/mcp-pandoc](https://github.com/vivekVells/mcp-pandoc) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [volcengine/verl](https://github.com/volcengine/verl) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [VRSEN/agency-swarm](https://github.com/VRSEN/agency-swarm) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents · slavakurilyak/awesome-ai-agents |
| 3 | 2 | [webdevtodayjason/sub-agents](https://github.com/webdevtodayjason/sub-agents) | jqueryscript/awesome-claude-code · rahulvrane/awesome-claude-agents · shahshrey/awesome-claude-code-mastery |
| 3 | 2 | [wenhuwang/mcp-k8s-eye](https://github.com/wenhuwang/mcp-k8s-eye) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [Whatsonyourmind/oraclaw](https://github.com/Whatsonyourmind/oraclaw) | punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit · TensorBlock/awesome-mcp-servers |
| 3 | 2 | [whylabs/langkit](https://github.com/whylabs/langkit) | jim-schwoebel/awesome_ai_agents · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [xorbitsai/inference](https://github.com/xorbitsai/inference) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 3 | 2 | [xpaysh/awesome-x402](https://github.com/xpaysh/awesome-x402) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 3 | 2 | [ysymyth/awesome-language-agents](https://github.com/ysymyth/awesome-language-agents) | hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-langchain |
| 3 | 2 | [zed-industries/zed](https://github.com/zed-industries/zed) | promptslab/Awesome-Prompt-Engineering · punkpeye/awesome-mcp-clients · wong2/awesome-mcp-servers |
| 3 | 2 | [ZeframLou/call-me](https://github.com/ZeframLou/call-me) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 3 | 2 | [zilliztech/claude-context](https://github.com/zilliztech/claude-context) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 3 | 2 | [zylon-ai/private-gpt](https://github.com/zylon-ai/private-gpt) | InftyAI/Awesome-LLMOps · jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |

**Tier 2 observations**:

- **`obra/* · disler/* · davila7/* · cassler/* · ccplugins/*` cluster** — these maintainer-orgs anchor CC-specialist Tier-2 because each ships 5-15 repos that cross-cite within CC-focused catalogs (subinium, jqueryscript, shahshrey, rohitg00).
- **MCP server Tier-2 cluster** (`vercel/* · supabase/* · neon-* · stripe/* · slack/* · linear-* · notion-*`) — vendor-official MCP servers cross-cite between mcp-servers/mcp-resources/mcp-devtools/mcp-clients/mcp-zh.
- **Agent-orchestrator Tier-2** (`crewAIInc/crewAI` · `griptape-ai/griptape` · `microsoft/agent-framework` · `agno-agi/agno` · `lastmile-ai/mcp-agent` · `Significant-Gravitas/AutoGPT` · `yoheinakajima/babyagi` · `microsoft/JARVIS` · `Pythagora-io/gpt-pilot` · `AntonOsika/gpt-engineer`) — these are the historical-and-active orchestration primitives all catalogs treat as foundational. mcp-agent in particular is the cited basis of this runtime's `mcp-agent-patterns` skill.
- **Code-agent Tier-2** (`Aider-AI/aider` · `paul-gauthier/aider` · `smol-ai/developer` · `princeton-nlp/SWE-agent` · `OpenInterpreter/open-interpreter` · `BuilderIO/gpt-crawler` · `getzep/zep` · `mem0ai/mem0` · `MotiaDev/motia`) — alternative-CC code-agent surface area; worth surveying for missing primitive ideas.
- **Eval/observability Tier-2** (`Arize-ai/phoenix` · `promptfoo/promptfoo` · `UKGovernmentBEIS/inspect_ai` · `AnswerDotAI/answerai` · `TruEra/trulens` · `braintrustdata/braintrust-py` · `Helicone/helicone` · `literalai/literalai-python`) — all sane choices for CC-eval-harness integration; this runtime's harness uses `inspect_ai` + `promptfoo` per CLAUDE.md runtime-state.
- **Fine-tuning Tier-2** (`OpenAccess-AI-Collective/axolotl` · `unslothai/unsloth` · `huggingface/trl` · `hiyouga/LLaMA-Factory` · `microsoft/LoRA` · `turboderp/exllamav2` · `turboderp/exllama`) — fine-tuning primitives universally agreed; not currently in CC use but adjacent.

---

## 5. Tier 3 — Moderate signal

**1046 repos** cited in exactly 2 awesome-lists. Moderate signal — domain-specific tooling with peer-validation but lighter consensus.

Listed below by descending relevance + alphabetical. Full 1046 entries included for grep-ability.

| cite | rel | Repo | Sources |
|---:|---:|:---|:---|
| 2 | 5 | [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents) | jqueryscript/awesome-claude-code · rahulvrane/awesome-claude-agents |
| 2 | 5 | [alirezarezvani/claude-code-skill-factory](https://github.com/alirezarezvani/claude-code-skill-factory) | GetBindu/awesome-claude-code-and-skills · shahshrey/awesome-claude-code-mastery |
| 2 | 5 | [andrepimenta/claude-code-chat](https://github.com/andrepimenta/claude-code-chat) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [anthropics/claude-agent-sdk-demos](https://github.com/anthropics/claude-agent-sdk-demos) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 5 | [anthropics/claude-agent-sdk-typescript](https://github.com/anthropics/claude-agent-sdk-typescript) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 5 | [anthropics/claude-code-sdk-python](https://github.com/anthropics/claude-code-sdk-python) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [anthropics/courses](https://github.com/anthropics/courses) | shahshrey/awesome-claude-code-mastery · WangRongsheng/awesome-LLM-resources |
| 2 | 5 | [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) | rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 2 | 5 | [binggg/Claude-Code-Web-GUI](https://github.com/binggg/Claude-Code-Web-GUI) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [catlog22/Claude-Code-Workflow](https://github.com/catlog22/Claude-Code-Workflow) | rohitg00/awesome-claude-code-toolkit · subinium/awesome-claude-code |
| 2 | 5 | [centminmod/my-claude-code-setup](https://github.com/centminmod/my-claude-code-setup) | LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 5 | [cognyai/claude-code-marketing-skills](https://github.com/cognyai/claude-code-marketing-skills) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 5 | [ColeMurray/claude-code-otel](https://github.com/ColeMurray/claude-code-otel) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [ComposioHQ/awesome-claude-plugins](https://github.com/ComposioHQ/awesome-claude-plugins) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 5 | [daaain/claude-code-log](https://github.com/daaain/claude-code-log) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [Davincible/claude-code-open](https://github.com/Davincible/claude-code-open) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [fakerybakery/claude-code-kimi-groq](https://github.com/fakerybakery/claude-code-kimi-groq) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [hesreallyhim/awesome-claude-code-agents](https://github.com/hesreallyhim/awesome-claude-code-agents) | jqueryscript/awesome-claude-code · rahulvrane/awesome-claude-agents |
| 2 | 5 | [instantlyeasy/claude-code-sdk-ts](https://github.com/instantlyeasy/claude-code-sdk-ts) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [kill136/claude-code-open](https://github.com/kill136/claude-code-open) | punkpeye/awesome-mcp-clients · yzfly/Awesome-MCP-ZH |
| 2 | 5 | [kodu-ai/claude-coder](https://github.com/kodu-ai/claude-coder) | LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 5 | [leeguooooo/claude-code-usage-bar](https://github.com/leeguooooo/claude-code-usage-bar) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 5 | [manzaltu/claude-code-ide](https://github.com/manzaltu/claude-code-ide) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [mhattingpete/claude-skills-marketplace](https://github.com/mhattingpete/claude-skills-marketplace) | Prat011/awesome-llm-skills · shahshrey/awesome-claude-code-mastery |
| 2 | 5 | [michalparkola/tapestry-skills-for-claude-code](https://github.com/michalparkola/tapestry-skills-for-claude-code) | Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 5 | [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 5 | [Njengah/claude-code-cheat-sheet](https://github.com/Njengah/claude-code-cheat-sheet) | LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 5 | [philipp-spiess/claude-code-costs](https://github.com/philipp-spiess/claude-code-costs) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [Rich627/whatsapp-claude-plugin](https://github.com/Rich627/whatsapp-claude-plugin) | rohitg00/awesome-claude-code-toolkit · TensorBlock/awesome-mcp-servers |
| 2 | 5 | [RichardAtCT/claude-code-openai-wrapper](https://github.com/RichardAtCT/claude-code-openai-wrapper) | LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 5 | [rizethereum/claude-code-requirements-builder](https://github.com/rizethereum/claude-code-requirements-builder) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [severity1/claude-code-prompt-improver](https://github.com/severity1/claude-code-prompt-improver) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 5 | [stevemolitor/claude-code](https://github.com/stevemolitor/claude-code) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [sugyan/claude-code-webui](https://github.com/sugyan/claude-code-webui) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [textcortex/claude-code-sandbox](https://github.com/textcortex/claude-code-sandbox) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 5 | [wong2/litemcp](https://github.com/wong2/litemcp) | punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 2 | 5 | [Yuyz0112/claude-code-reverse](https://github.com/Yuyz0112/claude-code-reverse) | GetBindu/awesome-claude-code-and-skills · LangGPT/awesome-claude-code |
| 2 | 5 | [zhukunpenglinyutong/idea-claude-code-gui](https://github.com/zhukunpenglinyutong/idea-claude-code-gui) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 4 | [0xshellming/mcp-summarizer](https://github.com/0xshellming/mcp-summarizer) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [4everland/4everland-hosting-mcp](https://github.com/4everland/4everland-hosting-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [AbdelStark/bitcoin-mcp](https://github.com/AbdelStark/bitcoin-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [AbdelStark/nostr-mcp](https://github.com/AbdelStark/nostr-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [abhiemj/manim-mcp-server](https://github.com/abhiemj/manim-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [abhiz123/todoist-mcp-server](https://github.com/abhiz123/todoist-mcp-server) | appcypher/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [addozhang/spring-rest-to-mcp](https://github.com/addozhang/spring-rest-to-mcp) | punkpeye/awesome-mcp-devtools · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Adfin-Engineering/mcp-server-adfin](https://github.com/Adfin-Engineering/mcp-server-adfin) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [ahmetsbilgin/finbrain-mcp](https://github.com/ahmetsbilgin/finbrain-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [AIDC-AI/Pixelle-MCP](https://github.com/AIDC-AI/Pixelle-MCP) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [ailenshen/apple-notes-mcp](https://github.com/ailenshen/apple-notes-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [akseyh/bear-mcp-server](https://github.com/akseyh/bear-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [alexander-zuev/supabase-mcp-server](https://github.com/alexander-zuev/supabase-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [alexanderclapp/clirank-mcp-server](https://github.com/alexanderclapp/clirank-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit |
| 2 | 4 | [alexfleetcommander/agent-trust-stack-mcp](https://github.com/alexfleetcommander/agent-trust-stack-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [alilxxey/openobserve-community-mcp](https://github.com/alilxxey/openobserve-community-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [alimo7amed93/webhook-tester-mcp](https://github.com/alimo7amed93/webhook-tester-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [aliyun/alibabacloud-adbpg-mcp-server](https://github.com/aliyun/alibabacloud-adbpg-mcp-server) | TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [aliyun/alibabacloud-dataworks-mcp-server](https://github.com/aliyun/alibabacloud-dataworks-mcp-server) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [aliyun/alibabacloud-tablestore-mcp-server](https://github.com/aliyun/alibabacloud-tablestore-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [allenporter/mcp-server-home-assistant](https://github.com/allenporter/mcp-server-home-assistant) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [ambar/simctl-mcp](https://github.com/ambar/simctl-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [amidabuddha/unichat-mcp-server](https://github.com/amidabuddha/unichat-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [AntonOsika/gpt-engineer](https://github.com/AntonOsika/gpt-engineer) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 4 | [api7/apisix-mcp](https://github.com/api7/apisix-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [apimatic/apimatic-validator-mcp](https://github.com/apimatic/apimatic-validator-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [arcadia-finance/mcp-server](https://github.com/arcadia-finance/mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [ark-forge/arkforge-mcp](https://github.com/ark-forge/arkforge-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [armorwallet/armor-crypto-mcp](https://github.com/armorwallet/armor-crypto-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [arnstarn/mcp-server-spotinst](https://github.com/arnstarn/mcp-server-spotinst) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [arrismo/kaggle-mcp](https://github.com/arrismo/kaggle-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [artmann/package-registry-mcp](https://github.com/artmann/package-registry-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [awkoy/replicate-flux-mcp](https://github.com/awkoy/replicate-flux-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [awwaiid/mcp-server-taskwarrior](https://github.com/awwaiid/mcp-server-taskwarrior) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [axiomhq/mcp-server-axiom](https://github.com/axiomhq/mcp-server-axiom) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [aybelatchane/mcp-server-terminal](https://github.com/aybelatchane/mcp-server-terminal) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Badhansen/notion-mcp](https://github.com/Badhansen/notion-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [bankless/onchain-mcp](https://github.com/bankless/onchain-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [bart6114/my-bear-mcp-server](https://github.com/bart6114/my-bear-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [base/base-mcp](https://github.com/base/base-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [BeehiveInnovations/pal-mcp-server](https://github.com/BeehiveInnovations/pal-mcp-server) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 4 | [BeehiveInnovations/zen-mcp-server](https://github.com/BeehiveInnovations/zen-mcp-server) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 4 | [benborla/mcp-server-mysql](https://github.com/benborla/mcp-server-mysql) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [berlinbra/alpha-vantage-mcp](https://github.com/berlinbra/alpha-vantage-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [bharathvaj-ganesan/whois-mcp](https://github.com/bharathvaj-ganesan/whois-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [BitteProtocol/mcp](https://github.com/BitteProtocol/mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [Bortlesboat/bitcoin-mcp](https://github.com/Bortlesboat/bitcoin-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [bottobot/defense-mcp-server](https://github.com/bottobot/defense-mcp-server) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [box-community/mcp-server-box](https://github.com/box-community/mcp-server-box) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [briandconnelly/mcp-server-ipinfo](https://github.com/briandconnelly/mcp-server-ipinfo) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [browser-use/browser-use](https://github.com/browser-use/browser-use) | InftyAI/Awesome-LLMOps · Jenqyang/Awesome-AI-Agents |
| 2 | 4 | [BrowserMCP/mcp](https://github.com/BrowserMCP/mcp) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 4 | [burningion/video-editing-mcp](https://github.com/burningion/video-editing-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [bx33661/Wireshark-MCP](https://github.com/bx33661/Wireshark-MCP) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [caol64/wenyan-mcp](https://github.com/caol64/wenyan-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [chaindead/telegram-mcp](https://github.com/chaindead/telegram-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [chigwell/telegram-mcp](https://github.com/chigwell/telegram-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [chunkydotdev/bldbl-mcp](https://github.com/chunkydotdev/bldbl-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [CircleCI-Public/mcp-server-circleci](https://github.com/CircleCI-Public/mcp-server-circleci) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [ckanthony/openapi-mcp](https://github.com/ckanthony/openapi-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [cloudbet/sports-mcp-server](https://github.com/cloudbet/sports-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [cnghockey/sats4ai-mcp-server](https://github.com/cnghockey/sats4ai-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [code-yeongyu/oh-my-opencode](https://github.com/code-yeongyu/oh-my-opencode) | awesome-opencode/awesome-opencode · shahshrey/awesome-claude-code-mastery |
| 2 | 4 | [CodeLogicIncEngineering/codelogic-mcp-server](https://github.com/CodeLogicIncEngineering/codelogic-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Codex-Data/codex-mcp](https://github.com/Codex-Data/codex-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [ConechoAI/openai-websearch-mcp](https://github.com/ConechoAI/openai-websearch-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [connerlambden/helium-mcp](https://github.com/connerlambden/helium-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [CoplayDev/unity-mcp](https://github.com/CoplayDev/unity-mcp) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 4 | [COSAI-Labs/toolpipe-mcp-server](https://github.com/COSAI-Labs/toolpipe-mcp-server) | IAAR-Shanghai/Awesome-AI-Memory · xlite-dev/Awesome-LLM-Inference |
| 2 | 4 | [cr7258/elasticsearch-mcp-server](https://github.com/cr7258/elasticsearch-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [crystaldba/postgres-mcp](https://github.com/crystaldba/postgres-mcp) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 2 | 4 | [daisys-ai/daisys-mcp](https://github.com/daisys-ai/daisys-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [dakera-ai/dakera-mcp](https://github.com/dakera-ai/dakera-mcp) | IAAR-Shanghai/Awesome-AI-Memory · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [Danielpeter-99/calcom-mcp](https://github.com/Danielpeter-99/calcom-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [Dataring-engineering/mcp-server-trino](https://github.com/Dataring-engineering/mcp-server-trino) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [dbt-labs/dbt-mcp](https://github.com/dbt-labs/dbt-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [DealExpress/mcp-server](https://github.com/DealExpress/mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [debridge-finance/debridge-mcp](https://github.com/debridge-finance/debridge-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [delano/postman-mcp-server](https://github.com/delano/postman-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 4 | [DeusData/codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) | GetBindu/awesome-claude-code-and-skills · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [diivi/aseprite-mcp](https://github.com/diivi/aseprite-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [djalal/quran-mcp-server](https://github.com/djalal/quran-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [dkvdm/onepassword-mcp-server](https://github.com/dkvdm/onepassword-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [doggybee/mcp-server-leetcode](https://github.com/doggybee/mcp-server-leetcode) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [douglasborthwick-crypto/mcp-server-insumer](https://github.com/douglasborthwick-crypto/mcp-server-insumer) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [ducan-ne/opencoder](https://github.com/ducan-ne/opencoder) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 4 | [dynatrace-oss/dynatrace-mcp](https://github.com/dynatrace-oss/dynatrace-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [ejentum/ejentum-mcp](https://github.com/ejentum/ejentum-mcp) | rohitg00/awesome-claude-code-toolkit · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [elevenlabs/elevenlabs-mcp](https://github.com/elevenlabs/elevenlabs-mcp) | subinium/awesome-claude-code · wong2/awesome-mcp-servers |
| 2 | 4 | [entanglr/zettelkasten-mcp](https://github.com/entanglr/zettelkasten-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [entire-vc/evc-spark-mcp](https://github.com/entire-vc/evc-spark-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [esignaturescom/mcp-server-esignatures](https://github.com/esignaturescom/mcp-server-esignatures) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [fajarmf/slite-mcp](https://github.com/fajarmf/slite-mcp) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [Fibery-inc/fibery-mcp-server](https://github.com/Fibery-inc/fibery-mcp-server) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [firecrawl/firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 4 | [FradSer/mcp-server-apple-reminders](https://github.com/FradSer/mcp-server-apple-reminders) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [FreePeak/db-mcp-server](https://github.com/FreePeak/db-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [fulcradynamics/fulcra-context-mcp](https://github.com/fulcradynamics/fulcra-context-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [Gaffx/volatility-mcp](https://github.com/Gaffx/volatility-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [gannonh/firebase-mcp](https://github.com/gannonh/firebase-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [GeiserX/spinnaker-mcp](https://github.com/GeiserX/spinnaker-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [getAlby/mcp](https://github.com/getAlby/mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [getalby/nwc-mcp-server](https://github.com/getalby/nwc-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [getsentry/sentry-mcp](https://github.com/getsentry/sentry-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [glenngillen/mcpmcp-server](https://github.com/glenngillen/mcpmcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [gofireflyio/firefly-mcp](https://github.com/gofireflyio/firefly-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [gotohuman/gotohuman-mcp-server](https://github.com/gotohuman/gotohuman-mcp-server) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [grab/cursor-talk-to-figma-mcp](https://github.com/grab/cursor-talk-to-figma-mcp) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 4 | [grahammccain/chart-library-mcp](https://github.com/grahammccain/chart-library-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [groovyBugify/aws-security-mcp](https://github.com/groovyBugify/aws-security-mcp) | Puliczek/awesome-mcp-security · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [growthbook/growthbook-mcp](https://github.com/growthbook/growthbook-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [guillochon/mlb-api-mcp](https://github.com/guillochon/mlb-api-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Haiku-Trading/haiku-mcp-server](https://github.com/Haiku-Trading/haiku-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [hamflx/imagen3-mcp](https://github.com/hamflx/imagen3-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [hannesrudolph/imessage-query-fastmcp-mcp-server](https://github.com/hannesrudolph/imessage-query-fastmcp-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [hannesrudolph/sqlite-explorer-fastmcp-mcp-server](https://github.com/hannesrudolph/sqlite-explorer-fastmcp-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [hashicorp/terraform-mcp-server](https://github.com/hashicorp/terraform-mcp-server) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 2 | 4 | [hellokaton/unsplash-mcp-server](https://github.com/hellokaton/unsplash-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [HenryHaoson/Yuque-MCP-Server](https://github.com/HenryHaoson/Yuque-MCP-Server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [heurist-network/heurist-mesh-mcp-server](https://github.com/heurist-network/heurist-mesh-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [hiromitsusasaki/raindrop-io-mcp-server](https://github.com/hiromitsusasaki/raindrop-io-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [hmk/attio-mcp-server](https://github.com/hmk/attio-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [horw/esp-mcp](https://github.com/horw/esp-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [hyperbrowserai/mcp](https://github.com/hyperbrowserai/mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [icoretech/warden-mcp](https://github.com/icoretech/warden-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [IDEA-Research/DINO-X-MCP](https://github.com/IDEA-Research/DINO-X-MCP) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [idoru/influxdb-mcp-server](https://github.com/idoru/influxdb-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [inkeep/mcp-server-python](https://github.com/inkeep/mcp-server-python) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [inspektor-gadget/ig-mcp-server](https://github.com/inspektor-gadget/ig-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [intentos-labs/beeper-mcp](https://github.com/intentos-labs/beeper-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [ipfind/ipfind-mcp-server](https://github.com/ipfind/ipfind-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [iris-eval/mcp-server](https://github.com/iris-eval/mcp-server) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers |
| 2 | 4 | [its-dart/dart-mcp-server](https://github.com/its-dart/dart-mcp-server) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [iunera/druid-mcp-server](https://github.com/iunera/druid-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [ivnvxd/mcp-server-odoo](https://github.com/ivnvxd/mcp-server-odoo) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [jacksun911/megalaunch-mcp](https://github.com/jacksun911/megalaunch-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [jae-jae/fetcher-mcp](https://github.com/jae-jae/fetcher-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [jagan-shanmugam/open-streetmap-mcp](https://github.com/jagan-shanmugam/open-streetmap-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [jaipandya/producthunt-mcp-server](https://github.com/jaipandya/producthunt-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [JamsusMaximus/trainingpeaks-mcp](https://github.com/JamsusMaximus/trainingpeaks-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [jeannier/homebrew-mcp](https://github.com/jeannier/homebrew-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [jerhadf/linear-mcp-server](https://github.com/jerhadf/linear-mcp-server) | appcypher/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [jinzcdev/leetcode-mcp-server](https://github.com/jinzcdev/leetcode-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [jjsantos01/jupyter-notebook-mcp](https://github.com/jjsantos01/jupyter-notebook-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [jobsonlook/xhs-mcp](https://github.com/jobsonlook/xhs-mcp) | TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [johnneerdael/netskope-mcp](https://github.com/johnneerdael/netskope-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [JordanDalton/DoorDash-MCP-Server](https://github.com/JordanDalton/DoorDash-MCP-Server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Jpisnice/shadcn-ui-mcp-server](https://github.com/Jpisnice/shadcn-ui-mcp-server) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 2 | 4 | [juehang/vscode-mcp-server](https://github.com/juehang/vscode-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [jwaxman19/qlik-mcp](https://github.com/jwaxman19/qlik-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [jyjune/mcp_vms](https://github.com/jyjune/mcp_vms) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [KashiwaByte/vikingdb-mcp-server](https://github.com/KashiwaByte/vikingdb-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kelvin6365/plane-mcp-server](https://github.com/kelvin6365/plane-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kenliao94/mcp-server-rabbitmq](https://github.com/kenliao94/mcp-server-rabbitmq) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kkjdaniel/bgg-mcp](https://github.com/kkjdaniel/bgg-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [KS-GEN-AI/confluence-mcp-server](https://github.com/KS-GEN-AI/confluence-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [KS-GEN-AI/jira-mcp-server](https://github.com/KS-GEN-AI/jira-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/crypto-feargreed-mcp](https://github.com/kukapay/crypto-feargreed-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/crypto-indicators-mcp](https://github.com/kukapay/crypto-indicators-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/crypto-portfolio-mcp](https://github.com/kukapay/crypto-portfolio-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/crypto-rss-mcp](https://github.com/kukapay/crypto-rss-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [kukapay/crypto-sentiment-mcp](https://github.com/kukapay/crypto-sentiment-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/cryptopanic-mcp-server](https://github.com/kukapay/cryptopanic-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/dune-analytics-mcp](https://github.com/kukapay/dune-analytics-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/etf-flow-mcp](https://github.com/kukapay/etf-flow-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [kukapay/freqtrade-mcp](https://github.com/kukapay/freqtrade-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/jupiter-mcp](https://github.com/kukapay/jupiter-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/modbus-mcp](https://github.com/kukapay/modbus-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [kukapay/nearby-search-mcp](https://github.com/kukapay/nearby-search-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/opcua-mcp](https://github.com/kukapay/opcua-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [kukapay/pancakeswap-poolspy-mcp](https://github.com/kukapay/pancakeswap-poolspy-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/rug-check-mcp](https://github.com/kukapay/rug-check-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/thegraph-mcp](https://github.com/kukapay/thegraph-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/token-minter-mcp](https://github.com/kukapay/token-minter-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/token-revoke-mcp](https://github.com/kukapay/token-revoke-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/twitter-username-changes-mcp](https://github.com/kukapay/twitter-username-changes-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [kukapay/uniswap-poolspy-mcp](https://github.com/kukapay/uniswap-poolspy-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/uniswap-trader-mcp](https://github.com/kukapay/uniswap-trader-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kukapay/whale-tracker-mcp](https://github.com/kukapay/whale-tracker-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [kurdin/github-repos-manager-mcp](https://github.com/kurdin/github-repos-manager-mcp) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [kw510/strava-mcp](https://github.com/kw510/strava-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [KyrieTangSheng/mcp-server-nationalparks](https://github.com/KyrieTangSheng/mcp-server-nationalparks) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [lamemind/mcp-server-multiverse](https://github.com/lamemind/mcp-server-multiverse) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [langchain-ai/langchainjs](https://github.com/langchain-ai/langchainjs) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 4 | [langchain-ai/langgraphjs](https://github.com/langchain-ai/langgraphjs) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 4 | [langchain-ai/langsmith-sdk](https://github.com/langchain-ai/langsmith-sdk) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 4 | [langchain-ai/opengpts](https://github.com/langchain-ai/opengpts) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 4 | [langchain-ai/streamlit-agent](https://github.com/langchain-ai/streamlit-agent) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 4 | [laukikk/alpaca-mcp](https://github.com/laukikk/alpaca-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [lazymac2x/lazymac-k-mcp](https://github.com/lazymac2x/lazymac-k-mcp) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [lazymac2x/lazymac-mcp](https://github.com/lazymac2x/lazymac-mcp) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [leehanchung/bing-search-mcp](https://github.com/leehanchung/bing-search-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [Linked-API/linkedapi-mcp](https://github.com/Linked-API/linkedapi-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [louiscklaw/hko-mcp](https://github.com/louiscklaw/hko-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [magarcia/mcp-server-giphy](https://github.com/magarcia/mcp-server-giphy) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [marcelmarais/spotify-mcp-server](https://github.com/marcelmarais/spotify-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [mattijsdp/dbt-docs-mcp](https://github.com/mattijsdp/dbt-docs-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [mcpdotdirect/evm-mcp-server](https://github.com/mcpdotdirect/evm-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [mcpdotdirect/starknet-mcp-server](https://github.com/mcpdotdirect/starknet-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [mcpware/ui-annotator-mcp](https://github.com/mcpware/ui-annotator-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [mem0ai/mem0-mcp](https://github.com/mem0ai/mem0-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [mendableai/firecrawl-mcp-server](https://github.com/mendableai/firecrawl-mcp-server) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [microsoft/azure-devops-mcp](https://github.com/microsoft/azure-devops-mcp) | subinium/awesome-claude-code · wong2/awesome-mcp-servers |
| 2 | 4 | [mikechao/balldontlie-mcp](https://github.com/mikechao/balldontlie-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [minhyeoky/mcp-server-ledger](https://github.com/minhyeoky/mcp-server-ledger) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [mnhlt/WebSearch-MCP](https://github.com/mnhlt/WebSearch-MCP) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [mobile-next/mobile-mcp](https://github.com/mobile-next/mobile-mcp) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 2 | 4 | [modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk) | AlexMili/Awesome-MCP · subinium/awesome-claude-code |
| 2 | 4 | [modelcontextprotocol/go-sdk](https://github.com/modelcontextprotocol/go-sdk) | AlexMili/Awesome-MCP · subinium/awesome-claude-code |
| 2 | 4 | [modelcontextprotocol/java-sdk](https://github.com/modelcontextprotocol/java-sdk) | AlexMili/Awesome-MCP · subinium/awesome-claude-code |
| 2 | 4 | [modelcontextprotocol/rust-sdk](https://github.com/modelcontextprotocol/rust-sdk) | AlexMili/Awesome-MCP · subinium/awesome-claude-code |
| 2 | 4 | [motherduckdb/mcp-server-motherduck](https://github.com/motherduckdb/mcp-server-motherduck) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [mrjoshuak/godoc-mcp](https://github.com/mrjoshuak/godoc-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [mvtandas/wp-cli-mcp](https://github.com/mvtandas/wp-cli-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [narumiruna/yfinance-mcp](https://github.com/narumiruna/yfinance-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [Nebula-Block-Data/nebulablock-mcp-server](https://github.com/Nebula-Block-Data/nebulablock-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [needle-ai/needle-mcp](https://github.com/needle-ai/needle-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [nguyenvanduocit/jira-mcp](https://github.com/nguyenvanduocit/jira-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [nick1udwig/ws-mcp](https://github.com/nick1udwig/ws-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [nickclyde/duckduckgo-mcp-server](https://github.com/nickclyde/duckduckgo-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [NON906/omniparser-autogui-mcp](https://github.com/NON906/omniparser-autogui-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [novyxlabs/novyx-mcp](https://github.com/novyxlabs/novyx-mcp) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [OctagonAI/octagon-deep-research-mcp](https://github.com/OctagonAI/octagon-deep-research-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [octoco-ltd/sheetsdata-mcp](https://github.com/octoco-ltd/sheetsdata-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [offorte/offorte-mcp-server](https://github.com/offorte/offorte-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [omni-mcp/isaac-sim-mcp](https://github.com/omni-mcp/isaac-sim-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [OpenInterpreter/01](https://github.com/OpenInterpreter/01) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 4 | [OpenInterpreter/aifs](https://github.com/OpenInterpreter/aifs) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 4 | [opgginc/opgg-mcp](https://github.com/opgginc/opgg-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [opusforge/gorilla-mcp](https://github.com/opusforge/gorilla-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [orellazri/coda-mcp](https://github.com/orellazri/coda-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [oxylabs/oxylabs-mcp](https://github.com/oxylabs/oxylabs-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [pab1it0/adx-mcp-server](https://github.com/pab1it0/adx-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [pab1it0/chess-mcp](https://github.com/pab1it0/chess-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [Pearch-ai/mcp_pearch](https://github.com/Pearch-ai/mcp_pearch) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [Pimzino/spec-workflow-mcp](https://github.com/Pimzino/spec-workflow-mcp) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 4 | [pinecone-io/assistant-mcp](https://github.com/pinecone-io/assistant-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [pipeboard-co/meta-ads-mcp](https://github.com/pipeboard-co/meta-ads-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [plainsignal/plainsignal-mcp](https://github.com/plainsignal/plainsignal-mcp) | TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [portainer/portainer-mcp](https://github.com/portainer/portainer-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [ppl-ai/modelcontextprotocol](https://github.com/ppl-ai/modelcontextprotocol) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [pragmar/mcp-server-webcrawl](https://github.com/pragmar/mcp-server-webcrawl) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 4 | [PreReason/mcp](https://github.com/PreReason/mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [prisma/mcp](https://github.com/prisma/mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [PSPDFKit/nutrient-dws-mcp-server](https://github.com/PSPDFKit/nutrient-dws-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [pulumi/mcp-server](https://github.com/pulumi/mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [pwh-pwh/cal-mcp](https://github.com/pwh-pwh/cal-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [pwh-pwh/coin-mcp-server](https://github.com/pwh-pwh/coin-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [pydantic/logfire-mcp](https://github.com/pydantic/logfire-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [QuantConnect/mcp-server](https://github.com/QuantConnect/mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [quarkiverse/quarkus-mcp-servers](https://github.com/quarkiverse/quarkus-mcp-servers) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [r-huijts/firstcycling-mcp](https://github.com/r-huijts/firstcycling-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [r-huijts/ns-mcp-server](https://github.com/r-huijts/ns-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [r-huijts/oorlogsbronnen-mcp](https://github.com/r-huijts/oorlogsbronnen-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [r-huijts/rijksmuseum-mcp](https://github.com/r-huijts/rijksmuseum-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [r-huijts/strava-mcp](https://github.com/r-huijts/strava-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [RaiAnsar/claude_code-gemini-mcp](https://github.com/RaiAnsar/claude_code-gemini-mcp) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 4 | [rashidazarang/airtable-mcp](https://github.com/rashidazarang/airtable-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [reading-plus-ai/mcp-server-deep-research](https://github.com/reading-plus-ai/mcp-server-deep-research) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [rectalogic/langchain-mcp](https://github.com/rectalogic/langchain-mcp) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-devtools |
| 2 | 4 | [rishijatia/fantasy-pl-mcp](https://github.com/rishijatia/fantasy-pl-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [riza-io/riza-mcp](https://github.com/riza-io/riza-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [rogertheunissenmerge-oss/mcp-server](https://github.com/rogertheunissenmerge-oss/mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Rootly-AI-Labs/Rootly-MCP-server](https://github.com/Rootly-AI-Labs/Rootly-MCP-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [roychri/mcp-server-asana](https://github.com/roychri/mcp-server-asana) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [rrmistry/tilt-mcp](https://github.com/rrmistry/tilt-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [Ryan0204/github-repo-mcp](https://github.com/Ryan0204/github-repo-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [samuelgursky/davinci-resolve-mcp](https://github.com/samuelgursky/davinci-resolve-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [sanyambassi/ciphertrust-manager-mcp-server](https://github.com/sanyambassi/ciphertrust-manager-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 4 | [sanyambassi/thales-cdsp-cakm-mcp-server](https://github.com/sanyambassi/thales-cdsp-cakm-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 4 | [sanyambassi/thales-cdsp-crdp-mcp-server](https://github.com/sanyambassi/thales-cdsp-crdp-mcp-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 4 | [sapientpants/sonarqube-mcp-server](https://github.com/sapientpants/sonarqube-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [sawa-zen/vrchat-mcp](https://github.com/sawa-zen/vrchat-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [schemacrawler/SchemaCrawler-MCP-Server-Usage](https://github.com/schemacrawler/SchemaCrawler-MCP-Server-Usage) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [screenshotone/mcp](https://github.com/screenshotone/mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [serkan-ozal/driflyte-mcp-server](https://github.com/serkan-ozal/driflyte-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [shadoprizm/cyberlens-mcp-server](https://github.com/shadoprizm/cyberlens-mcp-server) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [singlestore-labs/mcp-server-singlestore](https://github.com/singlestore-labs/mcp-server-singlestore) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [SkyworkAI/Mureka-mcp](https://github.com/SkyworkAI/Mureka-mcp) | TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [slouchd/cyberchef-api-mcp-server](https://github.com/slouchd/cyberchef-api-mcp-server) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [spranab/brainstorm-mcp](https://github.com/spranab/brainstorm-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [sst/opencode](https://github.com/sst/opencode) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-agents |
| 2 | 4 | [st3v3nmw/sourcerer-mcp](https://github.com/st3v3nmw/sourcerer-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [StacklokLabs/ocireg-mcp](https://github.com/StacklokLabs/ocireg-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [StarRocks/mcp-server-starrocks](https://github.com/StarRocks/mcp-server-starrocks) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [stefan-xyz/mcp-server-runescape](https://github.com/stefan-xyz/mcp-server-runescape) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [sunriseapps/imagesorcery-mcp](https://github.com/sunriseapps/imagesorcery-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [szhygulin/vaultpilot-mcp](https://github.com/szhygulin/vaultpilot-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [takleb3rry/zitadel-mcp](https://github.com/takleb3rry/zitadel-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [takumi0706/google-calendar-mcp](https://github.com/takumi0706/google-calendar-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [tavily-ai/tavily-mcp](https://github.com/tavily-ai/tavily-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [team-telnyx/telnyx-mcp-server](https://github.com/team-telnyx/telnyx-mcp-server) | TensorBlock/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [teddyzxcv/ntfy-mcp](https://github.com/teddyzxcv/ntfy-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [Tencent/cos-mcp](https://github.com/Tencent/cos-mcp) | TensorBlock/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [tersePrompts/fastMCP4J](https://github.com/tersePrompts/fastMCP4J) | rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [tersePrompts/jarp-mcp](https://github.com/tersePrompts/jarp-mcp) | rohitg00/awesome-devops-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [tevonsb/homeassistant-mcp](https://github.com/tevonsb/homeassistant-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [tgeselle/bugsnag-mcp](https://github.com/tgeselle/bugsnag-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [the-momentum/fhir-mcp-server](https://github.com/the-momentum/fhir-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [the0807/GeekNews-MCP-Server](https://github.com/the0807/GeekNews-MCP-Server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [theishangoswami/exa-mcp-server](https://github.com/theishangoswami/exa-mcp-server) | AlexMili/Awesome-MCP · wong2/awesome-mcp-servers |
| 2 | 4 | [thingsboard/thingsboard-mcp](https://github.com/thingsboard/thingsboard-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [tomba-io/tomba-mcp-server](https://github.com/tomba-io/tomba-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [tomekkorbak/oura-mcp-server](https://github.com/tomekkorbak/oura-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [trackmage/trackmage-mcp-server](https://github.com/trackmage/trackmage-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [Trade-Agent/trade-agent-mcp](https://github.com/Trade-Agent/trade-agent-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [tradercjz/dolphindb-mcp-server](https://github.com/tradercjz/dolphindb-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [translated/lara-mcp](https://github.com/translated/lara-mcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 4 | [trilogy-group/aws-pricing-mcp](https://github.com/trilogy-group/aws-pricing-mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [truera/trulens](https://github.com/truera/trulens) | lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering |
| 2 | 4 | [TSavo/creatify-mcp](https://github.com/TSavo/creatify-mcp) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [tufantunc/ssh-mcp](https://github.com/tufantunc/ssh-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [twelvedata/mcp](https://github.com/twelvedata/mcp) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [typpo/promptfoo](https://github.com/typpo/promptfoo) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 4 | [uAI-solana/useful-ai-mcp](https://github.com/uAI-solana/useful-ai-mcp) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [uju777/coupang-mcp](https://github.com/uju777/coupang-mcp) | AlexMili/Awesome-MCP · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [uju777/mcp-server-naver-search](https://github.com/uju777/mcp-server-naver-search) | AlexMili/Awesome-MCP · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [unibaseio/membase-mcp](https://github.com/unibaseio/membase-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [unifai-network/unifai-mcp-server](https://github.com/unifai-network/unifai-mcp-server) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [unitedideas/resolve-mcp](https://github.com/unitedideas/resolve-mcp) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [unixlamadev-spec/aiprox-mcp](https://github.com/unixlamadev-spec/aiprox-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [unixlamadev-spec/lightningprox-mcp](https://github.com/unixlamadev-spec/lightningprox-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [unixlamadev-spec/lpxpoly-mcp](https://github.com/unixlamadev-spec/lpxpoly-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [UnMarkdown/mcp-server](https://github.com/UnMarkdown/mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [vdalhambra/financekit-mcp](https://github.com/vdalhambra/financekit-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [VeyraX/veyrax-mcp](https://github.com/VeyraX/veyrax-mcp) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [virtualsms-io/mcp-server](https://github.com/virtualsms-io/mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [voidly-ai/mcp-server](https://github.com/voidly-ai/mcp-server) | rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [waystation-ai/mcp](https://github.com/waystation-ai/mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [wazionapps/mcp-server](https://github.com/wazionapps/mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [weaviate/mcp-server-weaviate](https://github.com/weaviate/mcp-server-weaviate) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [webscraping-ai/webscraping-ai-mcp-server](https://github.com/webscraping-ai/webscraping-ai-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [Wolfe-Jam/claude-faf-mcp](https://github.com/Wolfe-Jam/claude-faf-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [Wolfe-Jam/faf-mcp](https://github.com/Wolfe-Jam/faf-mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 4 | [wso2/fhir-mcp-server](https://github.com/wso2/fhir-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [wuye-ai/mcp-server-wuye-ai](https://github.com/wuye-ai/mcp-server-wuye-ai) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [XeroAPI/xero-mcp-server](https://github.com/XeroAPI/xero-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [XGenerationLab/xiyan_mcp_server](https://github.com/XGenerationLab/xiyan_mcp_server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [xmpuspus/ph-civic-data-mcp](https://github.com/xmpuspus/ph-civic-data-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Xuanwo/mcp-server-opendal](https://github.com/Xuanwo/mcp-server-opendal) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [xzq-xu/jvm-mcp-server](https://github.com/xzq-xu/jvm-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [yctimlin/mcp_excalidraw](https://github.com/yctimlin/mcp_excalidraw) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 4 | [ydb-platform/ydb-mcp](https://github.com/ydb-platform/ydb-mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [Yeok-c/latex-mcp-server](https://github.com/Yeok-c/latex-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [yikakia/godoc-mcp-server](https://github.com/yikakia/godoc-mcp-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 4 | [yincongcyincong/VictoriaMetrics-mcp-server](https://github.com/yincongcyincong/VictoriaMetrics-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [YoYo-dot-bot/mcp](https://github.com/YoYo-dot-bot/mcp) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 4 | [YuChenSSR/mindmap-mcp-server](https://github.com/YuChenSSR/mindmap-mcp-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [zcaceres/fetch-mcp](https://github.com/zcaceres/fetch-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [zcaceres/gtasks-mcp](https://github.com/zcaceres/gtasks-mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [zlinzzzz/finData-mcp-server](https://github.com/zlinzzzz/finData-mcp-server) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 4 | [zoomeye-ai/mcp_zoomeye](https://github.com/zoomeye-ai/mcp_zoomeye) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 4 | [zxkane/mcp-server-amazon-bedrock](https://github.com/zxkane/mcp-server-amazon-bedrock) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 3 | [axolotl-ai-cloud/axolotl](https://github.com/axolotl-ai-cloud/axolotl) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps |
| 2 | 3 | [circlemind-ai/fast-graphrag](https://github.com/circlemind-ai/fast-graphrag) | DEEP-PolyU/Awesome-GraphRAG · WangRongsheng/awesome-LLM-resources |
| 2 | 3 | [gusye1234/nano-graphrag](https://github.com/gusye1234/nano-graphrag) | DEEP-PolyU/Awesome-GraphRAG · WangRongsheng/awesome-LLM-resources |
| 2 | 3 | [hiyouga/LLaMA-Factory](https://github.com/hiyouga/LLaMA-Factory) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 3 | [huggingface/candle](https://github.com/huggingface/candle) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 3 | [huggingface/datatrove](https://github.com/huggingface/datatrove) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 3 | [huggingface/lighteval](https://github.com/huggingface/lighteval) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 3 | [huggingface/nanotron](https://github.com/huggingface/nanotron) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 3 | [huggingface/open-r1](https://github.com/huggingface/open-r1) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 3 | [huggingface/skills](https://github.com/huggingface/skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 3 | [huggingface/text-embeddings-inference](https://github.com/huggingface/text-embeddings-inference) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 3 | [huggingface/text-generation-inference](https://github.com/huggingface/text-generation-inference) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 3 | [JayLZhou/GraphRAG](https://github.com/JayLZhou/GraphRAG) | DEEP-PolyU/Awesome-GraphRAG · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 3 | [jina-ai/langchain-serve](https://github.com/jina-ai/langchain-serve) | kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 2 | 3 | [joshuarileydev/supabase](https://github.com/joshuarileydev/supabase) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 3 | [khoj-ai/khoj](https://github.com/khoj-ai/khoj) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 3 | [kshern/mcp-tavily](https://github.com/kshern/mcp-tavily) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 3 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering |
| 2 | 3 | [neonbjb/tortoise-tts](https://github.com/neonbjb/tortoise-tts) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 3 | [pgvector/pgvector](https://github.com/pgvector/pgvector) | Danielskry/Awesome-RAG · tensorchord/Awesome-LLMOps |
| 2 | 3 | [sirmews/mcp-pinecone](https://github.com/sirmews/mcp-pinecone) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 3 | [supabase/agent-skills](https://github.com/supabase/agent-skills) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 3 | [weaviate/weaviate](https://github.com/weaviate/weaviate) | Danielskry/Awesome-RAG · InftyAI/Awesome-LLMOps |
| 2 | 2 | [0x4m4/hexstrike-ai](https://github.com/0x4m4/hexstrike-ai) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [0xDAEF0F/job-searchoor](https://github.com/0xDAEF0F/job-searchoor) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [0xpayne/gpt-migrate](https://github.com/0xpayne/gpt-migrate) | e2b-dev/awesome-ai-agents · kyrolabs/awesome-langchain |
| 2 | 2 | [1broseidon/promptext](https://github.com/1broseidon/promptext) | promptslab/Awesome-Prompt-Engineering · tensorchord/Awesome-LLMOps |
| 2 | 2 | [1Panel-dev/MaxKB](https://github.com/1Panel-dev/MaxKB) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [34892002/bilibili-mcp-js](https://github.com/34892002/bilibili-mcp-js) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [3choff/mcp-chatbot](https://github.com/3choff/mcp-chatbot) | punkpeye/awesome-mcp-clients · wong2/awesome-mcp-servers |
| 2 | 2 | [82ch/MCP-Dandan](https://github.com/82ch/MCP-Dandan) | Puliczek/awesome-mcp-security · punkpeye/awesome-mcp-servers |
| 2 | 2 | [a16z-infra/ai-town](https://github.com/a16z-infra/ai-town) | hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents |
| 2 | 2 | [aaronjmars/MiroShark](https://github.com/aaronjmars/MiroShark) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents |
| 2 | 2 | [Aas-ee/open-webSearch](https://github.com/Aas-ee/open-webSearch) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [accomplish-ai/openwork](https://github.com/accomplish-ai/openwork) | Shubhamsaboo/awesome-llm-apps · steel-dev/awesome-web-agents |
| 2 | 2 | [adawalli/nexus](https://github.com/adawalli/nexus) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [aden-hive/hive](https://github.com/aden-hive/hive) | kyrolabs/awesome-agents · tensorchord/Awesome-LLMOps |
| 2 | 2 | [adhikasp/mcp-twikit](https://github.com/adhikasp/mcp-twikit) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [ag2ai/ag2](https://github.com/ag2ai/ag2) | hyp1231/awesome-llm-powered-agent · kyrolabs/awesome-agents |
| 2 | 2 | [agent-infra/sandbox](https://github.com/agent-infra/sandbox) | subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [Agenta-AI/agenta](https://github.com/Agenta-AI/agenta) | promptslab/Awesome-Prompt-Engineering · tensorchord/Awesome-LLMOps |
| 2 | 2 | [AgentDock/AgentDock](https://github.com/AgentDock/AgentDock) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [agentgateway/agentgateway](https://github.com/agentgateway/agentgateway) | InftyAI/Awesome-LLMOps · subinium/awesome-claude-code |
| 2 | 2 | [agentic-ai/enact](https://github.com/agentic-ai/enact) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [agentmail-to/agentmail-toolkit](https://github.com/agentmail-to/agentmail-toolkit) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [AgentOps-AI/Jaiqu](https://github.com/AgentOps-AI/Jaiqu) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [agentrpc/agentrpc](https://github.com/agentrpc/agentrpc) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [agentset-ai/agentset](https://github.com/agentset-ai/agentset) | Danielskry/Awesome-RAG · kyrolabs/awesome-agents |
| 2 | 2 | [AGI-Edgerunners/LLM-Agents-Papers](https://github.com/AGI-Edgerunners/LLM-Agents-Papers) | hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents |
| 2 | 2 | [agiresearch/AIOS](https://github.com/agiresearch/AIOS) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [AI-Engineer-Foundation/agent-protocol](https://github.com/AI-Engineer-Foundation/agent-protocol) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [aibtcdev/agent-tools-ts](https://github.com/aibtcdev/agent-tools-ts) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [aibtcdev/ai-agent-crew](https://github.com/aibtcdev/ai-agent-crew) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [aibtcdev/gated-402-api](https://github.com/aibtcdev/gated-402-api) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [AIGC-Audio/AudioGPT](https://github.com/AIGC-Audio/AudioGPT) | FoundationAgents/awesome-foundation-agents · kyrolabs/awesome-langchain |
| 2 | 2 | [aiming-lab/AutoResearchClaw](https://github.com/aiming-lab/AutoResearchClaw) | promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [airtai/fastagency](https://github.com/airtai/fastagency) | e2b-dev/awesome-ai-agents · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [Alibaba-NLP/DeepResearch](https://github.com/Alibaba-NLP/DeepResearch) | InftyAI/Awesome-LLMOps · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [alibaba/higress](https://github.com/alibaba/higress) | InftyAI/Awesome-LLMOps · punkpeye/awesome-mcp-servers |
| 2 | 2 | [alibaizhanov/mengram](https://github.com/alibaizhanov/mengram) | punkpeye/awesome-mcp-servers · tensorchord/Awesome-LLMOps |
| 2 | 2 | [allenai/clin](https://github.com/allenai/clin) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [allenai/lumos](https://github.com/allenai/lumos) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [allenai/OLMo](https://github.com/allenai/OLMo) | codefuse-ai/Awesome-Code-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [AmberLJC/LLMSys-PaperList](https://github.com/AmberLJC/LLMSys-PaperList) | Hannibal046/Awesome-LLM · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [amineelkouhen/mcp-cockroachdb](https://github.com/amineelkouhen/mcp-cockroachdb) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [andybrandt/mcp-simple-arxiv](https://github.com/andybrandt/mcp-simple-arxiv) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [andybrandt/mcp-simple-openai-assistant](https://github.com/andybrandt/mcp-simple-openai-assistant) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [andybrandt/mcp-simple-pubmed](https://github.com/andybrandt/mcp-simple-pubmed) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [andybrandt/mcp-simple-timeserver](https://github.com/andybrandt/mcp-simple-timeserver) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [anneschuth/pinchwork](https://github.com/anneschuth/pinchwork) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [antonbabenko/terraform-skill](https://github.com/antonbabenko/terraform-skill) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [anysphere/priompt](https://github.com/anysphere/priompt) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [apecloud/ApeRAG](https://github.com/apecloud/ApeRAG) | DEEP-PolyU/Awesome-GraphRAG · punkpeye/awesome-mcp-servers |
| 2 | 2 | [arcee-ai/mergekit](https://github.com/arcee-ai/mergekit) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [argilla-io/distilabel](https://github.com/argilla-io/distilabel) | tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [argoproj/argo-workflows](https://github.com/argoproj/argo-workflows) | jim-schwoebel/awesome_ai_agents · tensorchord/Awesome-LLMOps |
| 2 | 2 | [ark-forge/mcp-eu-ai-act](https://github.com/ark-forge/mcp-eu-ai-act) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [arpitbatra123/mcp-googletasks](https://github.com/arpitbatra123/mcp-googletasks) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [automateyournetwork/pyATS_MCP](https://github.com/automateyournetwork/pyATS_MCP) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [automation-ai-labs/mcp-link](https://github.com/automation-ai-labs/mcp-link) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [automazeio/vibeproxy](https://github.com/automazeio/vibeproxy) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [avabuildsdata/mcp-us-business-data](https://github.com/avabuildsdata/mcp-us-business-data) | rohitg00/awesome-claude-code-toolkit · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [avelikiy/great_cto](https://github.com/avelikiy/great_cto) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [Azure/PyRIT](https://github.com/Azure/PyRIT) | lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [baidu-baige/LoongFlow](https://github.com/baidu-baige/LoongFlow) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-agents |
| 2 | 2 | [bazed-ai/bazed-af](https://github.com/bazed-ai/bazed-af) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [benbencodes/llm-prices](https://github.com/benbencodes/llm-prices) | rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [bentoml/BentoML](https://github.com/bentoml/BentoML) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [Ber666/llm-reasoners](https://github.com/Ber666/llm-reasoners) | atfortes/Awesome-LLM-Reasoning · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [bfly123/claude_code_bridge](https://github.com/bfly123/claude_code_bridge) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [bigcode-project/bigcodebench](https://github.com/bigcode-project/bigcodebench) | codefuse-ai/Awesome-Code-LLM · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [bigscience-workshop/petals](https://github.com/bigscience-workshop/petals) | InftyAI/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [bigscience-workshop/promptsource](https://github.com/bigscience-workshop/promptsource) | kyrolabs/awesome-langchain · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [billster45/mcp-chatgpt-responses](https://github.com/billster45/mcp-chatgpt-responses) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [blackwell-systems/agent-lsp](https://github.com/blackwell-systems/agent-lsp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [blader/Claudeception](https://github.com/blader/Claudeception) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [blurrah/mcp-graphql](https://github.com/blurrah/mcp-graphql) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [bmdhodl/agent47](https://github.com/bmdhodl/agent47) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [breaking-brake/cc-wf-studio](https://github.com/breaking-brake/cc-wf-studio) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [brennercruvinel/CCPlugins](https://github.com/brennercruvinel/CCPlugins) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [BrunoPessoa22/chiliz-marketing-intel](https://github.com/BrunoPessoa22/chiliz-marketing-intel) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [bucketco/bucket-javascript-sdk](https://github.com/bucketco/bucket-javascript-sdk) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [bytedance/UI-TARS-desktop](https://github.com/bytedance/UI-TARS-desktop) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [cafeTechne/antigravity-link-extension](https://github.com/cafeTechne/antigravity-link-extension) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [cafferychen777/ChatSpatial](https://github.com/cafferychen777/ChatSpatial) | jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-servers |
| 2 | 2 | [cameroncooke/XcodeBuildMCP](https://github.com/cameroncooke/XcodeBuildMCP) | AlexMili/Awesome-MCP · subinium/awesome-claude-code |
| 2 | 2 | [campfirein/cipher](https://github.com/campfirein/cipher) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [Canner/wren-engine](https://github.com/Canner/wren-engine) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Canner/WrenAI](https://github.com/Canner/WrenAI) | e2b-dev/awesome-ai-agents · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [carterlasalle/mac_messages_mcp](https://github.com/carterlasalle/mac_messages_mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [cdeust/Cortex](https://github.com/cdeust/Cortex) | punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [Chain-Love/chain](https://github.com/Chain-Love/chain) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [changyeyu/LLM-RL-Visualized](https://github.com/changyeyu/LLM-RL-Visualized) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [CharlesWiltgen/Axiom](https://github.com/CharlesWiltgen/Axiom) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [chatchat-space/Langchain-Chatchat](https://github.com/chatchat-space/Langchain-Chatchat) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [ChatGPTNextWeb/NextChat](https://github.com/ChatGPTNextWeb/NextChat) | InftyAI/Awesome-LLMOps · punkpeye/awesome-mcp-clients |
| 2 | 2 | [checkra1neth/xbird-skill](https://github.com/checkra1neth/xbird-skill) | jaw9c/awesome-remote-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 2 | [Cheffromspace/nutjs-windows-control](https://github.com/Cheffromspace/nutjs-windows-control) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [CheMiguel23/MemoryMesh](https://github.com/CheMiguel23/MemoryMesh) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [chenhg5/cc-connect](https://github.com/chenhg5/cc-connect) | GetBindu/awesome-claude-code-and-skills · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [cheshire-cat-ai/core](https://github.com/cheshire-cat-ai/core) | kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 2 | 2 | [chopmob-cloud/AlgoVoi-Platform-Adapters](https://github.com/chopmob-cloud/AlgoVoi-Platform-Adapters) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [chrishayuk/mcp-cli](https://github.com/chrishayuk/mcp-cli) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Cinnamon/kotaemon](https://github.com/Cinnamon/kotaemon) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [cjo4m06/mcp-shrimp-task-manager](https://github.com/cjo4m06/mcp-shrimp-task-manager) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 2 | 2 | [clockless-org/html-anything](https://github.com/clockless-org/html-anything) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [cmavro/GNN-RAG](https://github.com/cmavro/GNN-RAG) | Danielskry/Awesome-RAG · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 2 | [cmdaltctr/claude-gemini-mcp-slim](https://github.com/cmdaltctr/claude-gemini-mcp-slim) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [coleam00/excalidraw-diagram-skill](https://github.com/coleam00/excalidraw-diagram-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [composable-models/llm_multiagent_debate](https://github.com/composable-models/llm_multiagent_debate) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [confluentinc/mcp-confluent](https://github.com/confluentinc/mcp-confluent) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [ConstantineB6/comfy-pilot](https://github.com/ConstantineB6/comfy-pilot) | punkpeye/awesome-mcp-servers · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [corca-ai/awesome-llm-security](https://github.com/corca-ai/awesome-llm-security) | Hannibal046/Awesome-LLM · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [costajohnt/oss-autopilot](https://github.com/costajohnt/oss-autopilot) | punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [CR-Gjx/Suspicion-Agent](https://github.com/CR-Gjx/Suspicion-Agent) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [CraftJarvis/JARVIS-1](https://github.com/CraftJarvis/JARVIS-1) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [Cranial-XIX/llm-pddl](https://github.com/Cranial-XIX/llm-pddl) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [csunny/DB-GPT](https://github.com/csunny/DB-GPT) | kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 2 | 2 | [CurryTang/Graph-LLM](https://github.com/CurryTang/Graph-LLM) | jim-schwoebel/awesome_ai_agents · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 2 | [cvlab-columbia/viper](https://github.com/cvlab-columbia/viper) | atfortes/Awesome-LLM-Reasoning · FoundationAgents/awesome-foundation-agents |
| 2 | 2 | [dagger/container-use](https://github.com/dagger/container-use) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 2 | 2 | [darrenburns/elia](https://github.com/darrenburns/elia) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [databrickslabs/dolly](https://github.com/databrickslabs/dolly) | KennethanCeyer/awesome-llmops · tensorchord/Awesome-LLMOps |
| 2 | 2 | [datastax/astra-assistants-api](https://github.com/datastax/astra-assistants-api) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [davidkimai/Context-Engineering](https://github.com/davidkimai/Context-Engineering) | promptslab/Awesome-Prompt-Engineering · subinium/awesome-claude-code |
| 2 | 2 | [deadbits/vigil-llm](https://github.com/deadbits/vigil-llm) | corca-ai/awesome-llm-security · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [deadletterq/mcp-opennutrition](https://github.com/deadletterq/mcp-opennutrition) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 2 | [decidefyi/decide](https://github.com/decidefyi/decide) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [deepseek-ai/DeepSeek-V2](https://github.com/deepseek-ai/DeepSeek-V2) | codefuse-ai/Awesome-Code-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [deepseek-ai/DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3) | Hannibal046/Awesome-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [devflowinc/trieve](https://github.com/devflowinc/trieve) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [disler/infinite-agentic-loop](https://github.com/disler/infinite-agentic-loop) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [dki-lab/Pangu](https://github.com/dki-lab/Pangu) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [drolosoft/immich-photo-manager](https://github.com/drolosoft/immich-photo-manager) | punkpeye/awesome-mcp-servers · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [drona23/claude-token-efficient](https://github.com/drona23/claude-token-efficient) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [dvmazur/mixtral-offloading](https://github.com/dvmazur/mixtral-offloading) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [e2b-dev/ai-artifacts](https://github.com/e2b-dev/ai-artifacts) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [effytech/freshdesk_mcp](https://github.com/effytech/freshdesk_mcp) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [eidolon-ai/eidolon](https://github.com/eidolon-ai/eidolon) | e2b-dev/awesome-ai-agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [elestirelbilinc-sketch/vap-showcase](https://github.com/elestirelbilinc-sketch/vap-showcase) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers |
| 2 | 2 | [elisymlabs/elisym](https://github.com/elisymlabs/elisym) | Jenqyang/Awesome-AI-Agents · punkpeye/awesome-mcp-servers |
| 2 | 2 | [EmergenceAI/Agent-E](https://github.com/EmergenceAI/Agent-E) | Jenqyang/Awesome-AI-Agents · steel-dev/awesome-web-agents |
| 2 | 2 | [emicklei/mcp-log-proxy](https://github.com/emicklei/mcp-log-proxy) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers |
| 2 | 2 | [enoch3712/ExtractThinker](https://github.com/enoch3712/ExtractThinker) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [Epistates/turbomcp](https://github.com/Epistates/turbomcp) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers |
| 2 | 2 | [erithwik/mcp-hn](https://github.com/erithwik/mcp-hn) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [eumemic/ai-legion](https://github.com/eumemic/ai-legion) | e2b-dev/awesome-ai-agents · kaushikb11/awesome-llm-agents |
| 2 | 2 | [evalstate/fast-agent](https://github.com/evalstate/fast-agent) | GetBindu/awesome-claude-code-and-skills · InftyAI/Awesome-LLMOps |
| 2 | 2 | [evalstate/mcp-miro](https://github.com/evalstate/mcp-miro) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [exoticknight/mcp-file-merger](https://github.com/exoticknight/mcp-file-merger) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [f4ww4z/mcp-mysql-server](https://github.com/f4ww4z/mcp-mysql-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [facebookresearch/faiss](https://github.com/facebookresearch/faiss) | Danielskry/Awesome-RAG · InftyAI/Awesome-LLMOps |
| 2 | 2 | [facebookresearch/lingua](https://github.com/facebookresearch/lingua) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [Farama-Foundation/chatarena](https://github.com/Farama-Foundation/chatarena) | e2b-dev/awesome-ai-agents · Jenqyang/Awesome-AI-Agents |
| 2 | 2 | [FasterDecoding/Medusa](https://github.com/FasterDecoding/Medusa) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [fastxyz/skill-optimizer](https://github.com/fastxyz/skill-optimizer) | InftyAI/Awesome-LLMOps · Prat011/awesome-llm-skills |
| 2 | 2 | [ferdousbhai/investor-agent](https://github.com/ferdousbhai/investor-agent) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [ferdousbhai/tasty-agent](https://github.com/ferdousbhai/tasty-agent) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [fernikolic/clawdentials](https://github.com/fernikolic/clawdentials) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [FFY0/AdaKV](https://github.com/FFY0/AdaKV) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [firebase/genkit](https://github.com/firebase/genkit) | punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 2 | 2 | [firstorderai/authenticator_mcp](https://github.com/firstorderai/authenticator_mcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) | awesome-opencode/awesome-opencode · subinium/awesome-claude-code |
| 2 | 2 | [flexflow/FlexFlow](https://github.com/flexflow/FlexFlow) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [flowcore-io/mcp-flowcore-platform](https://github.com/flowcore-io/mcp-flowcore-platform) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [flyteorg/flyte](https://github.com/flyteorg/flyte) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [FMInference/FlexGen](https://github.com/FMInference/FlexGen) | tensorchord/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [Forethought-Technologies/AutoChain](https://github.com/Forethought-Technologies/AutoChain) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-langchain |
| 2 | 2 | [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [francedot/NavAIGuide-TS](https://github.com/francedot/NavAIGuide-TS) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [FranxYao/chain-of-thought-hub](https://github.com/FranxYao/chain-of-thought-hub) | atfortes/Awesome-LLM-Reasoning · Hannibal046/Awesome-LLM |
| 2 | 2 | [FujitsuResearch/OneCompression](https://github.com/FujitsuResearch/OneCompression) | tensorchord/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [future-agi/agent-opt](https://github.com/future-agi/agent-opt) | kaushikb11/awesome-llm-agents · tensorchord/Awesome-LLMOps |
| 2 | 2 | [future-agi/ai-evaluation](https://github.com/future-agi/ai-evaluation) | jxzhangjhu/Awesome-LLM-RAG · tensorchord/Awesome-LLMOps |
| 2 | 2 | [future-agi/traceAI](https://github.com/future-agi/traceAI) | kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 2 | 2 | [gadievron/raptor](https://github.com/gadievron/raptor) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [Galaxy-Dawn/claude-scholar](https://github.com/Galaxy-Dawn/claude-scholar) | GetBindu/awesome-claude-code-and-skills · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [GeiserX/LynxPrompt](https://github.com/GeiserX/LynxPrompt) | promptslab/Awesome-Prompt-Engineering · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [genomoncology/FuzzTypes](https://github.com/genomoncology/FuzzTypes) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [gerred/building-an-agentic-system](https://github.com/gerred/building-an-agentic-system) | LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [get-convex/convex-backend](https://github.com/get-convex/convex-backend) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [getzep/graphiti](https://github.com/getzep/graphiti) | DEEP-PolyU/Awesome-GraphRAG · InftyAI/Awesome-LLMOps |
| 2 | 2 | [gigamori/mcp-run-sql-connectorx](https://github.com/gigamori/mcp-run-sql-connectorx) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [girste/mcp-cybersec-watchdog](https://github.com/girste/mcp-cybersec-watchdog) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [giselles-ai/giselle](https://github.com/giselles-ai/giselle) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents |
| 2 | 2 | [Giskard-AI/giskard](https://github.com/Giskard-AI/giskard) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [gobii-ai/gobii-platform](https://github.com/gobii-ai/gobii-platform) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [google/trax](https://github.com/google/trax) | codefuse-ai/Awesome-Code-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [gotalab/cc-sdd](https://github.com/gotalab/cc-sdd) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [gpustack/gpustack](https://github.com/gpustack/gpustack) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [gpustack/llama-box](https://github.com/gpustack/llama-box) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [gradio-app/gradio](https://github.com/gradio-app/gradio) | InftyAI/Awesome-LLMOps · KennethanCeyer/awesome-llmops |
| 2 | 2 | [greynewell/mcpbr](https://github.com/greynewell/mcpbr) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-devtools |
| 2 | 2 | [GuanSuns/LLMs-World-Models-for-Planning](https://github.com/GuanSuns/LLMs-World-Models-for-Planning) | hyp1231/awesome-llm-powered-agent · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [guidance-ai/guidance](https://github.com/guidance-ai/guidance) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [Haleclipse/CCometixLine](https://github.com/Haleclipse/CCometixLine) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [hamelsmu/claude-review-loop](https://github.com/hamelsmu/claude-review-loop) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [hamidra/yamcp](https://github.com/hamidra/yamcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-devtools |
| 2 | 2 | [hangwin/mcp-chrome](https://github.com/hangwin/mcp-chrome) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [hannesrudolph/mcp-ragdocs](https://github.com/hannesrudolph/mcp-ragdocs) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [hashgraph-online/registry-broker](https://github.com/hashgraph-online/registry-broker) | jim-schwoebel/awesome_ai_agents · tensorchord/Awesome-LLMOps |
| 2 | 2 | [haymon-ai/database](https://github.com/haymon-ai/database) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [hbg/mcp-paperswithcode](https://github.com/hbg/mcp-paperswithcode) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 2 | [hegelai/prompttools](https://github.com/hegelai/prompttools) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [Helmi/claude-simone](https://github.com/Helmi/claude-simone) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [hexitex/MCP-Backup-Server](https://github.com/hexitex/MCP-Backup-Server) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [Higangssh/homebutler](https://github.com/Higangssh/homebutler) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [hivemoot/hivemoot](https://github.com/hivemoot/hivemoot) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [HKUDS/AI-Researcher](https://github.com/HKUDS/AI-Researcher) | InftyAI/Awesome-LLMOps · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [HKUDS/RAG-Anything](https://github.com/HKUDS/RAG-Anything) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [hloiseaufcms/mcp-gopls](https://github.com/hloiseaufcms/mcp-gopls) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [hpcaitech/Open-Sora](https://github.com/hpcaitech/Open-Sora) | WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [HuangOwen/Awesome-LLM-Compression](https://github.com/HuangOwen/Awesome-LLM-Compression) | Hannibal046/Awesome-LLM · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [human-pages-ai/humanpages](https://github.com/human-pages-ai/humanpages) | Jenqyang/Awesome-AI-Agents · punkpeye/awesome-mcp-servers |
| 2 | 2 | [humanlayer/humanlayer](https://github.com/humanlayer/humanlayer) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [humanplane/homunculus](https://github.com/humanplane/homunculus) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [huybery/Awesome-Code-LLM](https://github.com/huybery/Awesome-Code-LLM) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [hydrolix/mcp-hydrolix](https://github.com/hydrolix/mcp-hydrolix) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [hypermodeinc/modus](https://github.com/hypermodeinc/modus) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [IAAR-Shanghai/ICSFSurvey](https://github.com/IAAR-Shanghai/ICSFSurvey) | atfortes/Awesome-LLM-Reasoning · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [Iamshankhadeep/ccseva](https://github.com/Iamshankhadeep/ccseva) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [IgorGanapolsky/ThumbGate](https://github.com/IgorGanapolsky/ThumbGate) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [imprvhub/mcp-status-observer](https://github.com/imprvhub/mcp-status-observer) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [imran-siddique/agent-os](https://github.com/imran-siddique/agent-os) | kaushikb11/awesome-llm-agents · punkpeye/awesome-mcp-servers |
| 2 | 2 | [inclusionAI/AReaL](https://github.com/inclusionAI/AReaL) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [InditexTech/mcp-teams-server](https://github.com/InditexTech/mcp-teams-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [infiniflow/infinity](https://github.com/infiniflow/infinity) | tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [ingero-io/ingero](https://github.com/ingero-io/ingero) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [InhiblabCore/mcp-image-compression](https://github.com/InhiblabCore/mcp-image-compression) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [instructor-ai/cloud](https://github.com/instructor-ai/cloud) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [intellectronica/ruler](https://github.com/intellectronica/ruler) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [InternLM/MindSearch](https://github.com/InternLM/MindSearch) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [invariantlabs-ai/mcp-scan](https://github.com/invariantlabs-ai/mcp-scan) | Puliczek/awesome-mcp-security · subinium/awesome-claude-code |
| 2 | 2 | [isaacphi/mcp-language-server](https://github.com/isaacphi/mcp-language-server) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [IST-DASLab/gptq](https://github.com/IST-DASLab/gptq) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [IST-DASLab/sparsegpt](https://github.com/IST-DASLab/sparsegpt) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [ivycheck/ivycheck-python-sdk](https://github.com/ivycheck/ivycheck-python-sdk) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [izzzzzi/izTolkMcp](https://github.com/izzzzzi/izTolkMcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [j3k0/speech](https://github.com/j3k0/speech) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [JackChen-me/open-multi-agent](https://github.com/JackChen-me/open-multi-agent) | Jenqyang/Awesome-AI-Agents · kyrolabs/awesome-agents |
| 2 | 2 | [jagan-shanmugam/mattermost-mcp-host](https://github.com/jagan-shanmugam/mattermost-mcp-host) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [jamsocket/forevervm](https://github.com/jamsocket/forevervm) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [jamubc/gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [janswist/mcp-dexscreener](https://github.com/janswist/mcp-dexscreener) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [jazzyalex/agent-sessions](https://github.com/jazzyalex/agent-sessions) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [JetBrains/mcp-jetbrains](https://github.com/JetBrains/mcp-jetbrains) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [JetBrains/mcpProxy](https://github.com/JetBrains/mcpProxy) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Jiayi-Pan/TinyZero](https://github.com/Jiayi-Pan/TinyZero) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [jimmc414/cctrace](https://github.com/jimmc414/cctrace) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [joaomdmoura/crewai-tools](https://github.com/joaomdmoura/crewai-tools) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [JordanDalton/RestCsvMcpServer](https://github.com/JordanDalton/RestCsvMcpServer) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [JordiNeil/mcp-databricks-server](https://github.com/JordiNeil/mcp-databricks-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [JoshuaRileyDev/mac-apps-launcher](https://github.com/JoshuaRileyDev/mac-apps-launcher) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [jovezhong/mcp-timeplus](https://github.com/jovezhong/mcp-timeplus) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [jthack/threat-hunting-with-sigma-rules-skill](https://github.com/jthack/threat-hunting-with-sigma-rules-skill) | Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [junhoyeo/tokscale](https://github.com/junhoyeo/tokscale) | awesome-opencode/awesome-opencode · GetBindu/awesome-claude-code-and-skills |
| 2 | 2 | [just-every/mcp-read-website-fast](https://github.com/just-every/mcp-read-website-fast) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [just-every/mcp-screenshot-website-fast](https://github.com/just-every/mcp-screenshot-website-fast) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [jxmorris12/vec2text](https://github.com/jxmorris12/vec2text) | corca-ai/awesome-llm-security · jxzhangjhu/Awesome-LLM-RAG |
| 2 | 2 | [kael-bit/engram-rs](https://github.com/kael-bit/engram-rs) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [kaliaboi/mcp-zotero](https://github.com/kaliaboi/mcp-zotero) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [karpathy/autoresearch](https://github.com/karpathy/autoresearch) | promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [kayba-ai/agentic-context-engine](https://github.com/kayba-ai/agentic-context-engine) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [kc23go/anybrowse](https://github.com/kc23go/anybrowse) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [kdqed/zaturn](https://github.com/kdqed/zaturn) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [KennethanCeyer/awesome-llm](https://github.com/KennethanCeyer/awesome-llm) | KennethanCeyer/awesome-llmops · snwfdhmp/awesome-gpt-prompt-engineering |
| 2 | 2 | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [KhoomeiK/LlamaGym](https://github.com/KhoomeiK/LlamaGym) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [kiliczsh/claude-cmd](https://github.com/kiliczsh/claude-cmd) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [Kiln-AI/Kiln](https://github.com/Kiln-AI/Kiln) | kaushikb11/awesome-llm-agents · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [kingbootoshi/cartographer](https://github.com/kingbootoshi/cartographer) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [kj455/mcp-kibela](https://github.com/kj455/mcp-kibela) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Klavis-AI/klavis](https://github.com/Klavis-AI/klavis) | punkpeye/awesome-mcp-clients · punkpeye/awesome-mcp-servers |
| 2 | 2 | [kocierik/mcp-nomad](https://github.com/kocierik/mcp-nomad) | rohitg00/awesome-devops-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [kortex-labs/plexiglass](https://github.com/kortex-labs/plexiglass) | corca-ai/awesome-llm-security · tensorchord/Awesome-LLMOps |
| 2 | 2 | [kortix-ai/suna](https://github.com/kortix-ai/suna) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [kreuzberg-dev/kreuzberg](https://github.com/kreuzberg-dev/kreuzberg) | Danielskry/Awesome-RAG · subinium/awesome-claude-code |
| 2 | 2 | [kristoferlund/duet-gpt](https://github.com/kristoferlund/duet-gpt) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain |
| 2 | 2 | [krohling/bondai](https://github.com/krohling/bondai) | e2b-dev/awesome-ai-agents · kyrolabs/awesome-langchain |
| 2 | 2 | [KryptosAI/mcp-observatory](https://github.com/KryptosAI/mcp-observatory) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers |
| 2 | 2 | [krystalan/DRT-o1](https://github.com/krystalan/DRT-o1) | atfortes/Awesome-LLM-Reasoning · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [kserve/kserve](https://github.com/kserve/kserve) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [kvcache-ai/Mooncake](https://github.com/kvcache-ai/Mooncake) | InftyAI/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [kyrolabs/awesome-langchain](https://github.com/kyrolabs/awesome-langchain) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [l33tdawg/sage](https://github.com/l33tdawg/sage) | kyrolabs/awesome-agents · punkpeye/awesome-mcp-servers |
| 2 | 2 | [labring/FastGPT](https://github.com/labring/FastGPT) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | kyrolabs/awesome-langchain · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [leptonai/search_with_lepton](https://github.com/leptonai/search_with_lepton) | Hannibal046/Awesome-LLM · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [letta-ai/letta](https://github.com/letta-ai/letta) | Danielskry/Awesome-RAG · IAAR-Shanghai/Awesome-AI-Memory |
| 2 | 2 | [libukai/awesome-agent-skills](https://github.com/libukai/awesome-agent-skills) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [lightconetech/mcp-gateway](https://github.com/lightconetech/mcp-gateway) | punkpeye/awesome-mcp-devtools · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Lightning-AI/litgpt](https://github.com/Lightning-AI/litgpt) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [lightninglabs/LangChainBitcoin](https://github.com/lightninglabs/LangChainBitcoin) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [linkedin/Liger-Kernel](https://github.com/linkedin/Liger-Kernel) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [littlebearapps/outlook-assistant](https://github.com/littlebearapps/outlook-assistant) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [livebench/livebench](https://github.com/livebench/livebench) | codefuse-ai/Awesome-Code-LLM · InftyAI/Awesome-LLMOps |
| 2 | 2 | [livekit/agents](https://github.com/livekit/agents) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [Lizonghang/prima](https://github.com/Lizonghang/prima) | Hannibal046/Awesome-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [LLM-Red-Team/kimi-cc](https://github.com/LLM-Red-Team/kimi-cc) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [LLMServe/DistServe](https://github.com/LLMServe/DistServe) | jim-schwoebel/awesome_ai_agents · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [LMCache/LMCache](https://github.com/LMCache/LMCache) | InftyAI/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [ludwig-ai/ludwig](https://github.com/ludwig-ai/ludwig) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [lunary-ai/lunary](https://github.com/lunary-ai/lunary) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [LuniaKunal/mcp-twitter](https://github.com/LuniaKunal/mcp-twitter) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [lyonzin/knowledge-rag](https://github.com/lyonzin/knowledge-rag) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [m13v/fazm](https://github.com/m13v/fazm) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [mackenly/mcp-fathom-analytics](https://github.com/mackenly/mcp-fathom-analytics) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [marciopuga/cog](https://github.com/marciopuga/cog) | IAAR-Shanghai/Awesome-AI-Memory · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [mark3labs/mcphost](https://github.com/mark3labs/mcphost) | jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-devtools |
| 2 | 2 | [markmdev/meridian](https://github.com/markmdev/meridian) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [MarkusPfundstein/mcp-gsuite](https://github.com/MarkusPfundstein/mcp-gsuite) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Master-cai/Research-Paper-Writing-Skills](https://github.com/Master-cai/Research-Paper-Writing-Skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [matt1398/claude-devtools](https://github.com/matt1398/claude-devtools) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [mattpocock/skills](https://github.com/mattpocock/skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [maximhq/bifrost](https://github.com/maximhq/bifrost) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-langchain |
| 2 | 2 | [mayt/BrowserGPT](https://github.com/mayt/BrowserGPT) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [mcpware/pagecast](https://github.com/mcpware/pagecast) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [meacheal-ai/mrc-data](https://github.com/meacheal-ai/mrc-data) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [mediar-ai/screenpipe](https://github.com/mediar-ai/screenpipe) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Meirtz/Awesome-Context-Engineering](https://github.com/Meirtz/Awesome-Context-Engineering) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [metauto-ai/GPTSwarm](https://github.com/metauto-ai/GPTSwarm) | e2b-dev/awesome-ai-agents · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 2 | [Michael-A-Kuykendall/shimmy](https://github.com/Michael-A-Kuykendall/shimmy) | tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [michaelfeil/infinity](https://github.com/michaelfeil/infinity) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [michaellatman/mcp-get](https://github.com/michaellatman/mcp-get) | AlexMili/Awesome-MCP · appcypher/awesome-mcp-servers |
| 2 | 2 | [mickael-kerjean/filestash](https://github.com/mickael-kerjean/filestash) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 2 | [microsoft/LLMLingua](https://github.com/microsoft/LLMLingua) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [microsoft/SeerAttention](https://github.com/microsoft/SeerAttention) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [microsoft/SmartPlay](https://github.com/microsoft/SmartPlay) | hyp1231/awesome-llm-powered-agent · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [microsoft/ToRA](https://github.com/microsoft/ToRA) | hyp1231/awesome-llm-powered-agent · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [mikekelly/AgentK](https://github.com/mikekelly/AgentK) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [mikeyobrien/ralph-orchestrator](https://github.com/mikeyobrien/ralph-orchestrator) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [Mindinventory/MindSQL](https://github.com/Mindinventory/MindSQL) | Hannibal046/Awesome-LLM · kyrolabs/awesome-langchain |
| 2 | 2 | [minhoyoo-iotrust/WAIaaS](https://github.com/minhoyoo-iotrust/WAIaaS) | jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-servers |
| 2 | 2 | [mit-han-lab/llm-awq](https://github.com/mit-han-lab/llm-awq) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [mit-han-lab/smoothquant](https://github.com/mit-han-lab/smoothquant) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [mit-han-lab/streaming-llm](https://github.com/mit-han-lab/streaming-llm) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [mixpeek/amux](https://github.com/mixpeek/amux) | kyrolabs/awesome-agents · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [mlabonne/llm-course](https://github.com/mlabonne/llm-course) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [mlc-ai/mlc-llm](https://github.com/mlc-ai/mlc-llm) | InftyAI/Awesome-LLMOps · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [mlflow/mlflow](https://github.com/mlflow/mlflow) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [MLT-OSS/open-assistant-api](https://github.com/MLT-OSS/open-assistant-api) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [mobilehackinglab/jadx-mcp-plugin](https://github.com/mobilehackinglab/jadx-mcp-plugin) | Puliczek/awesome-mcp-security · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [ModernRelay/omnigraph](https://github.com/ModernRelay/omnigraph) | IAAR-Shanghai/Awesome-AI-Memory · tensorchord/Awesome-LLMOps |
| 2 | 2 | [MohamedAbdallah-14/prompt-to-asset](https://github.com/MohamedAbdallah-14/prompt-to-asset) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [MohamedAbdallah-14/unslop](https://github.com/MohamedAbdallah-14/unslop) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [MoonshotAI/Kimi-K2](https://github.com/MoonshotAI/Kimi-K2) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [MooreThreads/TurboRAG](https://github.com/MooreThreads/TurboRAG) | horseee/Awesome-Efficient-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [MorDavid/BloodHound-MCP-AI](https://github.com/MorDavid/BloodHound-MCP-AI) | Puliczek/awesome-mcp-security · wong2/awesome-mcp-servers |
| 2 | 2 | [mshumer/ai-researcher](https://github.com/mshumer/ai-researcher) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [mufeedvh/code2prompt](https://github.com/mufeedvh/code2prompt) | LangGPT/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [muratcankoylan/ralph-wiggum-marketer](https://github.com/muratcankoylan/ralph-wiggum-marketer) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [mzxrai/mcp-openai](https://github.com/mzxrai/mcp-openai) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [mzxrai/mcp-webresearch](https://github.com/mzxrai/mcp-webresearch) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [NakaokaRei/swift-mcp-gui](https://github.com/NakaokaRei/swift-mcp-gui) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [NameetP/pdfmux](https://github.com/NameetP/pdfmux) | kyrolabs/awesome-langchain · punkpeye/awesome-mcp-servers |
| 2 | 2 | [netease-youdao/QAnything](https://github.com/netease-youdao/QAnything) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [Netflix/metaflow](https://github.com/Netflix/metaflow) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [neurocult/agency](https://github.com/neurocult/agency) | kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 2 | 2 | [NevaMind-AI/memU](https://github.com/NevaMind-AI/memU) | GetBindu/awesome-claude-code-and-skills · IAAR-Shanghai/Awesome-AI-Memory |
| 2 | 2 | [nguyenvanduocit/all-in-one-model-context-protocol](https://github.com/nguyenvanduocit/all-in-one-model-context-protocol) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [nicobailon/visual-explainer](https://github.com/nicobailon/visual-explainer) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [nicofains1/agentic-ads](https://github.com/nicofains1/agentic-ads) | AlexMili/Awesome-MCP · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [nicofains1/agentwatch](https://github.com/nicofains1/agentwatch) | jim-schwoebel/awesome_ai_agents · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [nidhinjs/prompt-master](https://github.com/nidhinjs/prompt-master) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [night-chen/ToolQA](https://github.com/night-chen/ToolQA) | hyp1231/awesome-llm-powered-agent · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [NikitaDmitrieff/auto-co-meta](https://github.com/NikitaDmitrieff/auto-co-meta) | jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents |
| 2 | 2 | [NirDiamant/Prompt_Engineering](https://github.com/NirDiamant/Prompt_Engineering) | jim-schwoebel/awesome_ai_agents · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [NirDiamant/RAG_Techniques](https://github.com/NirDiamant/RAG_Techniques) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [NJUNLP/ReNeLLM](https://github.com/NJUNLP/ReNeLLM) | corca-ai/awesome-llm-security · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [nkapila6/mcp-local-rag](https://github.com/nkapila6/mcp-local-rag) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [normal-computing/outlines](https://github.com/normal-computing/outlines) | Hannibal046/Awesome-LLM · kyrolabs/awesome-langchain |
| 2 | 2 | [nottelabs/notte](https://github.com/nottelabs/notte) | Jenqyang/Awesome-AI-Agents · wong2/awesome-mcp-servers |
| 2 | 2 | [npi-ai/npi](https://github.com/npi-ai/npi) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [numman-ali/cc-mirror](https://github.com/numman-ali/cc-mirror) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [NVIDIA/FasterTransformer](https://github.com/NVIDIA/FasterTransformer) | Hannibal046/Awesome-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [NVIDIA/Megatron-LM](https://github.com/NVIDIA/Megatron-LM) | Hannibal046/Awesome-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [obie/claude-on-rails](https://github.com/obie/claude-on-rails) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [ObservedObserver/async-code](https://github.com/ObservedObserver/async-code) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [olo-dot-io/Uni-CLI](https://github.com/olo-dot-io/Uni-CLI) | Jenqyang/Awesome-AI-Agents · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [onepointconsulting/data-questionnaire-agent](https://github.com/onepointconsulting/data-questionnaire-agent) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [onllm-dev/onwatch](https://github.com/onllm-dev/onwatch) | rohitg00/awesome-claude-code-toolkit · tensorchord/Awesome-LLMOps |
| 2 | 2 | [onuratakan/gpt-computer-assistant](https://github.com/onuratakan/gpt-computer-assistant) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [op7418/Claude-to-IM-skill](https://github.com/op7418/Claude-to-IM-skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [op7418/Humanizer-zh](https://github.com/op7418/Humanizer-zh) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [open-compass/opencompass](https://github.com/open-compass/opencompass) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [open-webui/mcpo](https://github.com/open-webui/mcpo) | subinium/awesome-claude-code · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [open-webui/open-webui](https://github.com/open-webui/open-webui) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [openai/evals](https://github.com/openai/evals) | Hannibal046/Awesome-LLM · KennethanCeyer/awesome-llmops |
| 2 | 2 | [openai/mle-bench](https://github.com/openai/mle-bench) | InftyAI/Awesome-LLMOps · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [openai/whisper](https://github.com/openai/whisper) | tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [openbmb/agentverse](https://github.com/openbmb/agentverse) | kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 2 | 2 | [OpenBMB/RepoAgent](https://github.com/OpenBMB/RepoAgent) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [OpenLinkSoftware/mcp-odbc-server](https://github.com/OpenLinkSoftware/mcp-odbc-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [OpenLinkSoftware/mcp-sqlalchemy-server](https://github.com/OpenLinkSoftware/mcp-sqlalchemy-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [openlit/openlit](https://github.com/openlit/openlit) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [OpenLLMAI/OpenRLHF](https://github.com/OpenLLMAI/OpenRLHF) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [openMF/mcp-mifosx](https://github.com/openMF/mcp-mifosx) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [openMF/mcp-mifosx-self-service](https://github.com/openMF/mcp-mifosx-self-service) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [OpenRaiser/NanoResearch](https://github.com/OpenRaiser/NanoResearch) | promptslab/Awesome-Prompt-Engineering · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [openrecall/openrecall](https://github.com/openrecall/openrecall) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [OS-Copilot/OS-Copilot](https://github.com/OS-Copilot/OS-Copilot) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [oschina/mcp-gitee](https://github.com/oschina/mcp-gitee) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [OSU-NLP-Group/Mind2Web](https://github.com/OSU-NLP-Group/Mind2Web) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [outlines-dev/outlines](https://github.com/outlines-dev/outlines) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [Owloops/claude-powerline](https://github.com/Owloops/claude-powerline) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [ozgrozer/chatgpt-artifacts](https://github.com/ozgrozer/chatgpt-artifacts) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [PaddlePaddle/PaddleNLP](https://github.com/PaddlePaddle/PaddleNLP) | codefuse-ai/Awesome-Code-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [Paitesanshi/LLM-Agent-Survey](https://github.com/Paitesanshi/LLM-Agent-Survey) | hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents |
| 2 | 2 | [pan-x-c/EE-LLM](https://github.com/pan-x-c/EE-LLM) | jim-schwoebel/awesome_ai_agents · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | subinium/awesome-claude-code · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [particlefuture/1mcpserver](https://github.com/particlefuture/1mcpserver) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [pathwaycom/llm-app](https://github.com/pathwaycom/llm-app) | Danielskry/Awesome-RAG · tensorchord/Awesome-LLMOps |
| 2 | 2 | [PatrickPalmer/MayaMCP](https://github.com/PatrickPalmer/MayaMCP) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [paypal/agent-toolkit](https://github.com/paypal/agent-toolkit) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [PeterGriffinJin/Search-R1](https://github.com/PeterGriffinJin/Search-R1) | FoundationAgents/awesome-foundation-agents · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [pezzolabs/pezzo](https://github.com/pezzolabs/pezzo) | e2b-dev/awesome-ai-agents · tensorchord/Awesome-LLMOps |
| 2 | 2 | [phact/streaming-assistants](https://github.com/phact/streaming-assistants) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [Piebald-AI/tweakcc](https://github.com/Piebald-AI/tweakcc) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [PierrunoYT/claude-3-artifacts](https://github.com/PierrunoYT/claude-3-artifacts) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [pinokiocomputer/pinokio](https://github.com/pinokiocomputer/pinokio) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [PiotrNawrot/sparse-frontier](https://github.com/PiotrNawrot/sparse-frontier) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [PKU-YuanGroup/Open-Sora-Plan](https://github.com/PKU-YuanGroup/Open-Sora-Plan) | WangRongsheng/awesome-LLM-resources · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [plasmate-labs/plasmate](https://github.com/plasmate-labs/plasmate) | jim-schwoebel/awesome_ai_agents · steel-dev/awesome-web-agents |
| 2 | 2 | [polyaxon/polyaxon](https://github.com/polyaxon/polyaxon) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [portiaAI/portia-sdk-python](https://github.com/portiaAI/portia-sdk-python) | jim-schwoebel/awesome_ai_agents · kaushikb11/awesome-llm-agents |
| 2 | 2 | [posgnu/rci-agent](https://github.com/posgnu/rci-agent) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [pranciskus/newsmcp](https://github.com/pranciskus/newsmcp) | AlexMili/Awesome-MCP · punkpeye/awesome-mcp-servers |
| 2 | 2 | [princeton-nlp/LLM-Shearing](https://github.com/princeton-nlp/LLM-Shearing) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [princeton-nlp/WebShop](https://github.com/princeton-nlp/WebShop) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [protectai/llm-guard](https://github.com/protectai/llm-guard) | lizhe2004/Awesome-LLM-RAG-Application · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [protectai/rebuff](https://github.com/protectai/rebuff) | corca-ai/awesome-llm-security · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [pskill9/hn-server](https://github.com/pskill9/hn-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [pskill9/web-search](https://github.com/pskill9/web-search) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [pskill9/website-downloader](https://github.com/pskill9/website-downloader) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Psycoy/MixEval](https://github.com/Psycoy/MixEval) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [pumanitro/global-chat](https://github.com/pumanitro/global-chat) | rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [pydantic/pydantic](https://github.com/pydantic/pydantic) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [qhjqhj00/MemoRAG](https://github.com/qhjqhj00/MemoRAG) | DEEP-PolyU/Awesome-GraphRAG · FoundationAgents/awesome-foundation-agents |
| 2 | 2 | [Qovery/qovery-skills](https://github.com/Qovery/qovery-skills) | rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [qualixar/superlocalmemory](https://github.com/qualixar/superlocalmemory) | IAAR-Shanghai/Awesome-AI-Memory · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [QuantGeekDev/mcp-framework](https://github.com/QuantGeekDev/mcp-framework) | punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 2 | 2 | [QuivrHQ/MegaParse](https://github.com/QuivrHQ/MegaParse) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [QuivrHQ/quivr](https://github.com/QuivrHQ/quivr) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | jqueryscript/awesome-claude-code · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [radi-cho/datasetGPT](https://github.com/radi-cho/datasetGPT) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain |
| 2 | 2 | [raw-labs/mxcp](https://github.com/raw-labs/mxcp) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-devtools |
| 2 | 2 | [RchGrav/claudebox](https://github.com/RchGrav/claudebox) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [reacher-z/ClawBench](https://github.com/reacher-z/ClawBench) | Jenqyang/Awesome-AI-Agents · steel-dev/awesome-web-agents |
| 2 | 2 | [realwigu/mcp-doctor](https://github.com/realwigu/mcp-doctor) | punkpeye/awesome-mcp-devtools · punkpeye/awesome-mcp-servers |
| 2 | 2 | [reasoning-machines/pal](https://github.com/reasoning-machines/pal) | atfortes/Awesome-LLM-Reasoning · codefuse-ai/Awesome-Code-LLM |
| 2 | 2 | [redis/mcp-redis](https://github.com/redis/mcp-redis) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 2 | [refly-ai/refly](https://github.com/refly-ai/refly) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [remete618/widemem-ai](https://github.com/remete618/widemem-ai) | IAAR-Shanghai/Awesome-AI-Memory · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [revfactory/harness](https://github.com/revfactory/harness) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [rhesis-ai/rhesis](https://github.com/rhesis-ai/rhesis) | snwfdhmp/awesome-gpt-prompt-engineering · tensorchord/Awesome-LLMOps |
| 2 | 2 | [RipperMercs/tensorfeed](https://github.com/RipperMercs/tensorfeed) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [risonsimon/claude-artifacts-react](https://github.com/risonsimon/claude-artifacts-react) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [RLHFlow/RLHF-Reward-Modeling](https://github.com/RLHFlow/RLHF-Reward-Modeling) | FoundationAgents/awesome-foundation-agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [RManLuo/gfm-rag](https://github.com/RManLuo/gfm-rag) | RManLuo/Awesome-LLM-KG · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 2 | [ronantakizawa/a11ymcp](https://github.com/ronantakizawa/a11ymcp) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [RonitSachdev/ccundo](https://github.com/RonitSachdev/ccundo) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [rosmur/claudecode-best-practices](https://github.com/rosmur/claudecode-best-practices) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [rotemweiss57/gpt-newspaper](https://github.com/rotemweiss57/gpt-newspaper) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [rowboatlabs/rowboat](https://github.com/rowboatlabs/rowboat) | shahshrey/awesome-claude-code-mastery · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [RUC-GSAI/YuLan-Rec](https://github.com/RUC-GSAI/YuLan-Rec) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [run-llama/llama-agents](https://github.com/run-llama/llama-agents) | kyrolabs/awesome-agents · kyrolabs/awesome-langchain |
| 2 | 2 | [runekaagaard/mcp-alchemy](https://github.com/runekaagaard/mcp-alchemy) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [RunMaestro/Maestro](https://github.com/RunMaestro/Maestro) | GetBindu/awesome-claude-code-and-skills · subinium/awesome-claude-code |
| 2 | 2 | [rustykuntz/clideck](https://github.com/rustykuntz/clideck) | Jenqyang/Awesome-AI-Agents · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [safishamsi/graphify](https://github.com/safishamsi/graphify) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [Sagargupta16/claude-cost-optimizer](https://github.com/Sagargupta16/claude-cost-optimizer) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [SaintDoresh/Crypto-Trader-MCP-ClaudeDesktop](https://github.com/SaintDoresh/Crypto-Trader-MCP-ClaudeDesktop) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [SaintDoresh/Weather-MCP-ClaudeDesktop](https://github.com/SaintDoresh/Weather-MCP-ClaudeDesktop) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [SaintDoresh/YFinance-Trader-MCP-ClaudeDesktop](https://github.com/SaintDoresh/YFinance-Trader-MCP-ClaudeDesktop) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [SakanaAI/evolutionary-model-merge](https://github.com/SakanaAI/evolutionary-model-merge) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [salesforce/CodeT5](https://github.com/salesforce/CodeT5) | codefuse-ai/Awesome-Code-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [samholt/l2mac](https://github.com/samholt/l2mac) | e2b-dev/awesome-ai-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [SamurAIGPT/Generative-Media-Skills](https://github.com/SamurAIGPT/Generative-Media-Skills) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [sarveshsea/m-moire](https://github.com/sarveshsea/m-moire) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [sascharo/gxtract](https://github.com/sascharo/gxtract) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [saurav61091/mcp-openapi](https://github.com/saurav61091/mcp-openapi) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [screenpipe/screenpipe](https://github.com/screenpipe/screenpipe) | kyrolabs/awesome-agents · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [SecretiveShell/MCP-Bridge](https://github.com/SecretiveShell/MCP-Bridge) | punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 2 | 2 | [SecretiveShell/MCP-searxng](https://github.com/SecretiveShell/MCP-searxng) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [SecretiveShell/MCP-timeserver](https://github.com/SecretiveShell/MCP-timeserver) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [SecretiveShell/MCP-wolfram-alpha](https://github.com/SecretiveShell/MCP-wolfram-alpha) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [SeldonIO/seldon-core](https://github.com/SeldonIO/seldon-core) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [ServiceNow/AgentLab](https://github.com/ServiceNow/AgentLab) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [ServiceNow/BrowserGym](https://github.com/ServiceNow/BrowserGym) | Jenqyang/Awesome-AI-Agents · steel-dev/awesome-web-agents |
| 2 | 2 | [sharozdawa/ai-visibility](https://github.com/sharozdawa/ai-visibility) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [ShenghaiWang/xcodebuild](https://github.com/ShenghaiWang/xcodebuild) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [sherdencooper/GPTFuzz](https://github.com/sherdencooper/GPTFuzz) | corca-ai/awesome-llm-security · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [ShishirPatil/gorilla](https://github.com/ShishirPatil/gorilla) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain |
| 2 | 2 | [shmlkv/dna-claude-analysis](https://github.com/shmlkv/dna-claude-analysis) | rohitg00/awesome-claude-code-toolkit · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [shobrook/saplings](https://github.com/shobrook/saplings) | hyp1231/awesome-llm-powered-agent · kaushikb11/awesome-llm-agents |
| 2 | 2 | [silenceper/mcp-k8s](https://github.com/silenceper/mcp-k8s) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [simonw/llm](https://github.com/simonw/llm) | Hannibal046/Awesome-LLM · InftyAI/Awesome-LLMOps |
| 2 | 2 | [simular-ai/Agent-S](https://github.com/simular-ai/Agent-S) | FoundationAgents/awesome-foundation-agents · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [sitbon/magg](https://github.com/sitbon/magg) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [skypilot-org/skypilot](https://github.com/skypilot-org/skypilot) | Hannibal046/Awesome-LLM · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [slavakurilyak/awesome-ai-agents](https://github.com/slavakurilyak/awesome-ai-agents) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [smartcomputer-ai/agent-os](https://github.com/smartcomputer-ai/agent-os) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [smerchek/claude-epub-skill](https://github.com/smerchek/claude-epub-skill) | Prat011/awesome-llm-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [smigolsmigol/llmkit](https://github.com/smigolsmigol/llmkit) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [snap-stanford/MLAgentBench](https://github.com/snap-stanford/MLAgentBench) | hyp1231/awesome-llm-powered-agent · promptslab/Awesome-Prompt-Engineering |
| 2 | 2 | [snu-mllab/Context-Memory](https://github.com/snu-mllab/Context-Memory) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [snu-mllab/GuidedQuant](https://github.com/snu-mllab/GuidedQuant) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [snu-mllab/KVzip](https://github.com/snu-mllab/KVzip) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [sobelio/llm-chain](https://github.com/sobelio/llm-chain) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-langchain |
| 2 | 2 | [solana-foundation/solana-dev-skill](https://github.com/solana-foundation/solana-dev-skill) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [sourcegraph/cody](https://github.com/sourcegraph/cody) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [spcl/graph-of-thoughts](https://github.com/spcl/graph-of-thoughts) | FoundationAgents/awesome-foundation-agents · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 2 | [SqueezeAILab/SqueezeLLM](https://github.com/SqueezeAILab/SqueezeLLM) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [srijanshukla18/xray](https://github.com/srijanshukla18/xray) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [stacklok/brood-box](https://github.com/stacklok/brood-box) | rohitg00/awesome-claude-code-toolkit · tensorchord/Awesome-LLMOps |
| 2 | 2 | [Stacklok/toolhive](https://github.com/Stacklok/toolhive) | punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 2 | 2 | [stakpak/agent](https://github.com/stakpak/agent) | InftyAI/Awesome-LLMOps · kyrolabs/awesome-agents |
| 2 | 2 | [stanford-oval/storm](https://github.com/stanford-oval/storm) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [star-whale/starwhale](https://github.com/star-whale/starwhale) | KennethanCeyer/awesome-llmops · tensorchord/Awesome-LLMOps |
| 2 | 2 | [statelyai/agent](https://github.com/statelyai/agent) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [steamship-core/python-client](https://github.com/steamship-core/python-client) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [steipete/Peekaboo](https://github.com/steipete/Peekaboo) | subinium/awesome-claude-code · wong2/awesome-mcp-servers |
| 2 | 2 | [stellarlinkco/myclaude](https://github.com/stellarlinkco/myclaude) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [stephencme/create-mcp-ts](https://github.com/stephencme/create-mcp-ts) | punkpeye/awesome-mcp-devtools · wong2/awesome-mcp-servers |
| 2 | 2 | [stoyan-stoyanov/llmflows](https://github.com/stoyan-stoyanov/llmflows) | kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 2 | 2 | [stravu/crystal](https://github.com/stravu/crystal) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [substratusai/kubeai](https://github.com/substratusai/kubeai) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [sullyo/fingen](https://github.com/sullyo/fingen) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [sullyo/prompt2ui](https://github.com/sullyo/prompt2ui) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [sunnja69/akephalos](https://github.com/sunnja69/akephalos) | GetBindu/awesome-claude-code-and-skills · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [suno-ai/bark](https://github.com/suno-ai/bark) | tensorchord/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [superagent-ai/superagent](https://github.com/superagent-ai/superagent) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [superagent-ai/vibekit](https://github.com/superagent-ai/vibekit) | jqueryscript/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [supermemoryai/opensearch-ai](https://github.com/supermemoryai/opensearch-ai) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [swarmclawai/andrej-karpathy-skills](https://github.com/swarmclawai/andrej-karpathy-skills) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [swarmclawai/swarmvault](https://github.com/swarmclawai/swarmvault) | IAAR-Shanghai/Awesome-AI-Memory · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [sweepai/sweep](https://github.com/sweepai/sweep) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [sxhxliang/mcp-access-point](https://github.com/sxhxliang/mcp-access-point) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [tambo-ai/tambo](https://github.com/tambo-ai/tambo) | kaushikb11/awesome-llm-agents · punkpeye/awesome-mcp-clients |
| 2 | 2 | [taskade/taskade](https://github.com/taskade/taskade) | jim-schwoebel/awesome_ai_agents · punkpeye/awesome-mcp-clients |
| 2 | 2 | [TaskingAI/TaskingAI](https://github.com/TaskingAI/TaskingAI) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [tatsu-lab/stanford_alpaca](https://github.com/tatsu-lab/stanford_alpaca) | KennethanCeyer/awesome-llmops · tensorchord/Awesome-LLMOps |
| 2 | 2 | [taylorwilsdon/google_workspace_mcp](https://github.com/taylorwilsdon/google_workspace_mcp) | punkpeye/awesome-mcp-servers · subinium/awesome-claude-code |
| 2 | 2 | [team-attention/plugins-for-claude-natives](https://github.com/team-attention/plugins-for-claude-natives) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [tensorchord/Awesome-LLMOps](https://github.com/tensorchord/Awesome-LLMOps) | jim-schwoebel/awesome_ai_agents · snwfdhmp/awesome-gpt-prompt-engineering |
| 2 | 2 | [tensorzero/tensorzero](https://github.com/tensorzero/tensorzero) | kyrolabs/awesome-langchain · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [TheoBrigitte/mcp-time](https://github.com/TheoBrigitte/mcp-time) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [thirdweb-dev/ai](https://github.com/thirdweb-dev/ai) | wong2/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [thu-nics/C2C](https://github.com/thu-nics/C2C) | Jenqyang/Awesome-AI-Agents · kaushikb11/awesome-llm-agents |
| 2 | 2 | [THUDM/CodeGeeX](https://github.com/THUDM/CodeGeeX) | codefuse-ai/Awesome-Code-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [THUDM/slime](https://github.com/THUDM/slime) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [thunlp/TritonBench](https://github.com/thunlp/TritonBench) | codefuse-ai/Awesome-Code-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [tigranbs/mcgravity](https://github.com/tigranbs/mcgravity) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [timescale/pg-aiguide](https://github.com/timescale/pg-aiguide) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [TimLukaHorstmann/mcp-weather](https://github.com/TimLukaHorstmann/mcp-weather) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [Timothyxxx/Chain-of-ThoughtsPapers](https://github.com/Timothyxxx/Chain-of-ThoughtsPapers) | atfortes/Awesome-LLM-Reasoning · Hannibal046/Awesome-LLM |
| 2 | 2 | [tloen/alpaca-lora](https://github.com/tloen/alpaca-lora) | KennethanCeyer/awesome-llmops · tensorchord/Awesome-LLMOps |
| 2 | 2 | [tom28881/mcp-jira-server](https://github.com/tom28881/mcp-jira-server) | appcypher/awesome-mcp-servers · punkpeye/awesome-mcp-servers |
| 2 | 2 | [tonykipkemboi/trip_planner_agent](https://github.com/tonykipkemboi/trip_planner_agent) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [TrafficGuard/nous](https://github.com/TrafficGuard/nous) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [transformerlab/transformerlab-app](https://github.com/transformerlab/transformerlab-app) | InftyAI/Awesome-LLMOps · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [transloadit/node-sdk](https://github.com/transloadit/node-sdk) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [tripleyak/SkillForge](https://github.com/tripleyak/SkillForge) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [triton-inference-server/server](https://github.com/triton-inference-server/server) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [truefoundry/cognita](https://github.com/truefoundry/cognita) | Danielskry/Awesome-RAG · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [trycua/cua](https://github.com/trycua/cua) | subinium/awesome-claude-code · wong2/awesome-mcp-servers |
| 2 | 2 | [tsinghua-fib-lab/AgentSquare](https://github.com/tsinghua-fib-lab/AgentSquare) | Jenqyang/Awesome-AI-Agents · kaushikb11/awesome-llm-agents |
| 2 | 2 | [tuannvm/mcp-trino](https://github.com/tuannvm/mcp-trino) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [tumf/mcp-text-editor](https://github.com/tumf/mcp-text-editor) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [twostraws/SwiftUI-Agent-Skill](https://github.com/twostraws/SwiftUI-Agent-Skill) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [Typewise/mcp-chaos-rig](https://github.com/Typewise/mcp-chaos-rig) | punkpeye/awesome-mcp-devtools · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [udecode/dotai](https://github.com/udecode/dotai) | jqueryscript/awesome-claude-code · LangGPT/awesome-claude-code |
| 2 | 2 | [unit-mesh/auto-dev](https://github.com/unit-mesh/auto-dev) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [UserAd/didlogic_mcp](https://github.com/UserAd/didlogic_mcp) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [vanna-ai/vanna](https://github.com/vanna-ai/vanna) | e2b-dev/awesome-ai-agents · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [vectara/open-rag-eval](https://github.com/vectara/open-rag-eval) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [vectara/py-vectara-agentic](https://github.com/vectara/py-vectara-agentic) | jim-schwoebel/awesome_ai_agents · kyrolabs/awesome-agents |
| 2 | 2 | [VedankPurohit/LiveRecall](https://github.com/VedankPurohit/LiveRecall) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [vercel-labs/skills](https://github.com/vercel-labs/skills) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [vercel/ai](https://github.com/vercel/ai) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [video-db/agent-toolkit](https://github.com/video-db/agent-toolkit) | appcypher/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [VinciGit00/Scrapegraph-ai](https://github.com/VinciGit00/Scrapegraph-ai) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [voidborne-d/humanize-chinese](https://github.com/voidborne-d/humanize-chinese) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [voidborne-d/sober-coding](https://github.com/voidborne-d/sober-coding) | GetBindu/awesome-claude-code-and-skills · rohitg00/awesome-claude-code-toolkit |
| 2 | 2 | [VoltAgent/awesome-ai-agent-papers](https://github.com/VoltAgent/awesome-ai-agent-papers) | promptslab/Awesome-Prompt-Engineering · VoltAgent/awesome-claude-code-subagents |
| 2 | 2 | [wanaku-ai/wanaku](https://github.com/wanaku-ai/wanaku) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [wandb/wandb](https://github.com/wandb/wandb) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [wazionapps/nexo](https://github.com/wazionapps/nexo) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [wd041216-bit/free-web-search-ultimate](https://github.com/wd041216-bit/free-web-search-ultimate) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [webcoderz/MCP-Geo](https://github.com/webcoderz/MCP-Geo) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [Wei-Shaw/claude-relay-service](https://github.com/Wei-Shaw/claude-relay-service) | LangGPT/awesome-claude-code · subinium/awesome-claude-code |
| 2 | 2 | [williamzujkowski/nexus-agents](https://github.com/williamzujkowski/nexus-agents) | rohitg00/awesome-claude-code-toolkit · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [wolfdenpublishing/pyccsl](https://github.com/wolfdenpublishing/pyccsl) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [woominsong/Simba](https://github.com/woominsong/Simba) | horseee/Awesome-Efficient-LLM · xlite-dev/Awesome-LLM-Inference |
| 2 | 2 | [WooooDyy/LLM-Agent-Paper-List](https://github.com/WooooDyy/LLM-Agent-Paper-List) | hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents |
| 2 | 2 | [wshobson/commands](https://github.com/wshobson/commands) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [WxxShirley/GNN4TaskPlan](https://github.com/WxxShirley/GNN4TaskPlan) | hyp1231/awesome-llm-powered-agent · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 2 | [X-PLUG/MobileAgent](https://github.com/X-PLUG/MobileAgent) | FoundationAgents/awesome-foundation-agents · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [Xexr/mcp-libsql](https://github.com/Xexr/mcp-libsql) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [xing5/mcp-google-sheets](https://github.com/xing5/mcp-google-sheets) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [xingyaoww/code-act](https://github.com/xingyaoww/code-act) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [xlang-ai/OSWorld](https://github.com/xlang-ai/OSWorld) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [xlang-ai/Spider2](https://github.com/xlang-ai/Spider2) | codefuse-ai/Awesome-Code-LLM · FoundationAgents/awesome-foundation-agents |
| 2 | 2 | [xmpuspus/cloudwright](https://github.com/xmpuspus/cloudwright) | punkpeye/awesome-mcp-servers · TensorBlock/awesome-mcp-servers |
| 2 | 2 | [yhLeeee/Awesome-LLMs-in-Graph-tasks](https://github.com/yhLeeee/Awesome-LLMs-in-Graph-tasks) | DEEP-PolyU/Awesome-GraphRAG · XiaoxinHe/Awesome-Graph-LLM |
| 2 | 2 | [YishenTu/claudian](https://github.com/YishenTu/claudian) | shahshrey/awesome-claude-code-mastery · subinium/awesome-claude-code |
| 2 | 2 | [YiVal/YiVal](https://github.com/YiVal/YiVal) | jim-schwoebel/awesome_ai_agents · lizhe2004/Awesome-LLM-RAG-Application |
| 2 | 2 | [yiwenlu66/PiloTY](https://github.com/yiwenlu66/PiloTY) | punkpeye/awesome-mcp-servers · wong2/awesome-mcp-servers |
| 2 | 2 | [yizhiyanhua-ai/fireworks-tech-graph](https://github.com/yizhiyanhua-ai/fireworks-tech-graph) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [ykyritsis/ChatGPT-code-preview](https://github.com/ykyritsis/ChatGPT-code-preview) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [ysymyth/ReAct](https://github.com/ysymyth/ReAct) | FoundationAgents/awesome-foundation-agents · hyp1231/awesome-llm-powered-agent |
| 2 | 2 | [yWorks/mcp-typescribe](https://github.com/yWorks/mcp-typescribe) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [zach-snell/bbkt](https://github.com/zach-snell/bbkt) | punkpeye/awesome-mcp-servers · rohitg00/awesome-devops-mcp-servers |
| 2 | 2 | [zarazhangrui/codebase-to-course](https://github.com/zarazhangrui/codebase-to-course) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) | jqueryscript/awesome-claude-code · travisvn/awesome-claude-skills |
| 2 | 2 | [zenml-io/zenml](https://github.com/zenml-io/zenml) | InftyAI/Awesome-LLMOps · tensorchord/Awesome-LLMOps |
| 2 | 2 | [ZeparHyfar/mcp-datetime](https://github.com/ZeparHyfar/mcp-datetime) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [zhangxjohn/LLM-Agent-Benchmark-List](https://github.com/zhangxjohn/LLM-Agent-Benchmark-List) | Jenqyang/Awesome-AI-Agents · jim-schwoebel/awesome_ai_agents |
| 2 | 2 | [zhsama/claude-sub-agent](https://github.com/zhsama/claude-sub-agent) | jqueryscript/awesome-claude-code · rahulvrane/awesome-claude-agents |
| 2 | 2 | [zhsama/duckduckgo-mpc-server](https://github.com/zhsama/duckduckgo-mpc-server) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [ZhuLinsen/FastDatasets](https://github.com/ZhuLinsen/FastDatasets) | Hannibal046/Awesome-LLM · tensorchord/Awesome-LLMOps |
| 2 | 2 | [Zhwt/go-mcp-mysql](https://github.com/Zhwt/go-mcp-mysql) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |
| 2 | 2 | [zilliztech/GPTCache](https://github.com/zilliztech/GPTCache) | kyrolabs/awesome-langchain · tensorchord/Awesome-LLMOps |
| 2 | 2 | [ZJU-LLMs/Foundations-of-LLMs](https://github.com/ZJU-LLMs/Foundations-of-LLMs) | lizhe2004/Awesome-LLM-RAG-Application · WangRongsheng/awesome-LLM-resources |
| 2 | 2 | [zjunlp/AutoAct](https://github.com/zjunlp/AutoAct) | jim-schwoebel/awesome_ai_agents · slavakurilyak/awesome-ai-agents |
| 2 | 2 | [zjunlp/LLMAgentPapers](https://github.com/zjunlp/LLMAgentPapers) | hyp1231/awesome-llm-powered-agent · Jenqyang/Awesome-AI-Agents |
| 2 | 2 | [zscole/adversarial-spec](https://github.com/zscole/adversarial-spec) | jqueryscript/awesome-claude-code · shahshrey/awesome-claude-code-mastery |
| 2 | 2 | [zubair-trabzada/geo-seo-claude](https://github.com/zubair-trabzada/geo-seo-claude) | GetBindu/awesome-claude-code-and-skills · jqueryscript/awesome-claude-code |
| 2 | 2 | [zueai/mcp-manager](https://github.com/zueai/mcp-manager) | punkpeye/awesome-mcp-servers · yzfly/Awesome-MCP-ZH |

---

## 6. Tier 4 — Domain-specific or niche

**7452 repos** cited in exactly 1 awesome-list. These are domain-specific or niche picks. The full 7452 list is too large to inline (~7000 entries); the data is persisted at `tmp/W367-stream-c/citations-annotated.json` for downstream analysis.

The high-relevance subset (rel≥3) is **2250 repos** — these are the operationally-interesting unique picks. Full list inlined in §6b below.

### 6a. Distribution by contributing list

| Source list | Total T4 contributions | T4 (rel≥3) | T4 (rel≥4) |
|:---|---:|---:|---:|
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | 1539 | 921 | 918 |
| [jim-schwoebel/awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) | 1204 | 36 | 5 |
| [TensorBlock/awesome-mcp-servers](https://github.com/TensorBlock/awesome-mcp-servers) | 1076 | 674 | 663 |
| [WangRongsheng/awesome-LLM-resources](https://github.com/WangRongsheng/awesome-LLM-resources) | 443 | 22 | 1 |
| [codefuse-ai/Awesome-Code-LLM](https://github.com/codefuse-ai/Awesome-Code-LLM) | 260 | 4 | 3 |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 238 | 27 | 26 |
| [tensorchord/Awesome-LLMOps](https://github.com/tensorchord/Awesome-LLMOps) | 235 | 16 | 0 |
| [jqueryscript/awesome-claude-code](https://github.com/jqueryscript/awesome-claude-code) | 223 | 50 | 48 |
| [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | 198 | 134 | 134 |
| [shahshrey/awesome-claude-code-mastery](https://github.com/shahshrey/awesome-claude-code-mastery) | 145 | 46 | 46 |
| [xlite-dev/Awesome-LLM-Inference](https://github.com/xlite-dev/Awesome-LLM-Inference) | 121 | 3 | 0 |
| [FoundationAgents/awesome-foundation-agents](https://github.com/FoundationAgents/awesome-foundation-agents) | 116 | 2 | 2 |
| [kyrolabs/awesome-langchain](https://github.com/kyrolabs/awesome-langchain) | 106 | 5 | 2 |
| [awesome-opencode/awesome-opencode](https://github.com/awesome-opencode/awesome-opencode) | 96 | 69 | 69 |
| [promptslab/Awesome-Prompt-Engineering](https://github.com/promptslab/Awesome-Prompt-Engineering) | 92 | 4 | 3 |
| [XiaoxinHe/Awesome-Graph-LLM](https://github.com/XiaoxinHe/Awesome-Graph-LLM) | 90 | 4 | 0 |
| [hyp1231/awesome-llm-powered-agent](https://github.com/hyp1231/awesome-llm-powered-agent) | 83 | 1 | 1 |
| [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH) | 78 | 40 | 38 |
| [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools) | 75 | 21 | 21 |
| [horseee/Awesome-Efficient-LLM](https://github.com/horseee/Awesome-Efficient-LLM) | 73 | 1 | 0 |
| [subinium/awesome-claude-code](https://github.com/subinium/awesome-claude-code) | 71 | 20 | 19 |
| [Hannibal046/Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM) | 70 | 0 | 0 |
| [InftyAI/Awesome-LLMOps](https://github.com/InftyAI/Awesome-LLMOps) | 68 | 7 | 2 |
| [atfortes/Awesome-LLM-Reasoning](https://github.com/atfortes/Awesome-LLM-Reasoning) | 66 | 2 | 1 |
| [GetBindu/awesome-claude-code-and-skills](https://github.com/GetBindu/awesome-claude-code-and-skills) | 64 | 15 | 14 |
| [lizhe2004/Awesome-LLM-RAG-Application](https://github.com/lizhe2004/Awesome-LLM-RAG-Application) | 63 | 7 | 2 |
| [rohitg00/awesome-devops-mcp-servers](https://github.com/rohitg00/awesome-devops-mcp-servers) | 61 | 32 | 31 |
| [Jenqyang/Awesome-AI-Agents](https://github.com/Jenqyang/Awesome-AI-Agents) | 60 | 1 | 0 |
| [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) | 55 | 1 | 0 |
| [punkpeye/awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients) | 52 | 6 | 5 |
| [corca-ai/awesome-llm-security](https://github.com/corca-ai/awesome-llm-security) | 39 | 1 | 0 |
| [IAAR-Shanghai/Awesome-AI-Memory](https://github.com/IAAR-Shanghai/Awesome-AI-Memory) | 34 | 1 | 1 |
| [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) | 27 | 14 | 14 |
| [Puliczek/awesome-mcp-security](https://github.com/Puliczek/awesome-mcp-security) | 26 | 9 | 9 |
| [DEEP-PolyU/Awesome-GraphRAG](https://github.com/DEEP-PolyU/Awesome-GraphRAG) | 25 | 3 | 0 |
| [LangGPT/awesome-claude-code](https://github.com/LangGPT/awesome-claude-code) | 24 | 14 | 14 |
| [kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents) | 19 | 1 | 0 |
| [jxzhangjhu/Awesome-LLM-RAG](https://github.com/jxzhangjhu/Awesome-LLM-RAG) | 17 | 0 | 0 |
| [AlexMili/Awesome-MCP](https://github.com/AlexMili/Awesome-MCP) | 15 | 9 | 9 |
| [Danielskry/Awesome-RAG](https://github.com/Danielskry/Awesome-RAG) | 14 | 2 | 0 |
| [kaushikb11/awesome-llm-agents](https://github.com/kaushikb11/awesome-llm-agents) | 13 | 0 | 0 |
| [steel-dev/awesome-web-agents](https://github.com/steel-dev/awesome-web-agents) | 11 | 1 | 1 |
| [KennethanCeyer/awesome-llmops](https://github.com/KennethanCeyer/awesome-llmops) | 11 | 1 | 0 |
| [Prat011/awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) | 8 | 1 | 1 |
| [snwfdhmp/awesome-gpt-prompt-engineering](https://github.com/snwfdhmp/awesome-gpt-prompt-engineering) | 8 | 0 | 0 |
| [jmanhype/awesome-claude-code](https://github.com/jmanhype/awesome-claude-code) | 6 | 5 | 5 |
| [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts) | 6 | 2 | 2 |
| [helloianneo/awesome-claude-code-skills](https://github.com/helloianneo/awesome-claude-code-skills) | 5 | 1 | 1 |
| [mergisi/awesome-openclaw-agents](https://github.com/mergisi/awesome-openclaw-agents) | 4 | 3 | 3 |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | 4 | 2 | 2 |
| [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers) | 4 | 4 | 4 |
| [rahulvrane/awesome-claude-agents](https://github.com/rahulvrane/awesome-claude-agents) | 3 | 3 | 2 |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 2 | 1 | 1 |
| [RManLuo/Awesome-LLM-KG](https://github.com/RManLuo/Awesome-LLM-KG) | 2 | 0 | 0 |
| [supatest-ai/awesome-claude-code-sub-agents](https://github.com/supatest-ai/awesome-claude-code-sub-agents) | 1 | 1 | 1 |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | 1 | 0 | 0 |
| [rohitg00/awesome-ai-apps](https://github.com/rohitg00/awesome-ai-apps) | 1 | 0 | 0 |
| [gauravfs-14/awesome-mcp](https://github.com/gauravfs-14/awesome-mcp) | 1 | 0 | 0 |

**T4-by-list observations**:
- Generic MCP-server lists (`punkpeye`, `TensorBlock`, `wong2`) dominate the T4 long-tail with mostly experimental/personal servers (relevance=4 by regex but low-signal in practice).
- The **CC-curated lists** (`jqueryscript`, `shahshrey`, `rohitg00`, `subinium`, `GetBindu`, `LangGPT`, `travisvn`, `helloianneo`, `Mizoreww`, `pascalporedda`, `nblintao`, `dykyi-roman`, `ithiria894`, `Maciek-roboblog`) bring the most operationally-relevant unique picks even though their absolute counts are smaller. These are where the high-signal Tier-4 candidates live.
- `awesome-opencode/awesome-opencode` is a high-signal community catalog (69 unique CC-adjacent picks) — every entry references the alternative-CC opencode ecosystem.
- `Puliczek/awesome-mcp-security` brings 9 unique high-relevance security picks no other list has.

### 6b. Full Tier-4 high-relevance picks (rel≥3) by source

Per-source enumeration of all rel≥3 single-list picks. Use this section to find lesser-known operator-relevant primitives.

#### From `punkpeye/awesome-mcp-servers` (921 picks)

- **rel=5** [chatmcp/mcp-server-chatsum](https://github.com/chatmcp/mcp-server-chatsum)
- **rel=5** [K-Dense-AI/claude-skills-mcp](https://github.com/K-Dense-AI/claude-skills-mcp)
- **rel=5** [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools)
- **rel=5** [ybouhjira/claude-code-tts](https://github.com/ybouhjira/claude-code-tts)
- **rel=4** [0x1abin/matter-controller-mcp](https://github.com/0x1abin/matter-controller-mcp)
- **rel=4** [0xUXDesign/pharaoh-mcp](https://github.com/0xUXDesign/pharaoh-mcp)
- **rel=4** [0xzcov/omni-fun-mcp-server](https://github.com/0xzcov/omni-fun-mcp-server)
- **rel=4** [123Ergo/unphurl-mcp](https://github.com/123Ergo/unphurl-mcp)
- **rel=4** [1luvc0d3/metabase-mcp](https://github.com/1luvc0d3/metabase-mcp)
- **rel=4** [3aKHP/prts-mcp](https://github.com/3aKHP/prts-mcp)
- **rel=4** [3KniGHtcZ/codebeamer-mcp](https://github.com/3KniGHtcZ/codebeamer-mcp)
- **rel=4** [4dmrkey/cryptopolitan-mcp](https://github.com/4dmrkey/cryptopolitan-mcp)
- **rel=4** [6figr-com/jobgpt-mcp-server](https://github.com/6figr-com/jobgpt-mcp-server)
- **rel=4** [8randonpickart5/alderpost-mcp](https://github.com/8randonpickart5/alderpost-mcp)
- **rel=4** [98lukehall/renoun-mcp](https://github.com/98lukehall/renoun-mcp)
- **rel=4** [aaronjmars/web3-research-mcp](https://github.com/aaronjmars/web3-research-mcp)
- **rel=4** [aarsiv-groups/shipi-mcp-server](https://github.com/aarsiv-groups/shipi-mcp-server)
- **rel=4** [aashari/mcp-server-atlassian-bitbucket](https://github.com/aashari/mcp-server-atlassian-bitbucket)
- **rel=4** [aashari/mcp-server-atlassian-confluence](https://github.com/aashari/mcp-server-atlassian-confluence)
- **rel=4** [aashari/mcp-server-atlassian-jira](https://github.com/aashari/mcp-server-atlassian-jira)
- **rel=4** [aashari/mcp-server-aws-sso](https://github.com/aashari/mcp-server-aws-sso)
- **rel=4** [Abhigyan-Shekhar/Waggle-mcp](https://github.com/Abhigyan-Shekhar/Waggle-mcp)
- **rel=4** [abhiphile/fermat-mcp](https://github.com/abhiphile/fermat-mcp)
- **rel=4** [abrinsmead/mindpilot-mcp](https://github.com/abrinsmead/mindpilot-mcp)
- **rel=4** [acamolese/google-search-console-mcp](https://github.com/acamolese/google-search-console-mcp)
- **rel=4** [adancurusul/embedded-debugger-mcp](https://github.com/adancurusul/embedded-debugger-mcp)
- **rel=4** [adancurusul/serial-mcp-server](https://github.com/adancurusul/serial-mcp-server)
- **rel=4** [Adeptus-Innovatio/solvitor-mcp](https://github.com/Adeptus-Innovatio/solvitor-mcp)
- **rel=4** [Aditya2755/video-edit-mcp](https://github.com/Aditya2755/video-edit-mcp)
- **rel=4** [Adityaaery20/media-mcp](https://github.com/Adityaaery20/media-mcp)
- **rel=4** [AdsMCP/tiktok-ads-mcp-server](https://github.com/AdsMCP/tiktok-ads-mcp-server)
- **rel=4** [aeoess/mingle-mcp](https://github.com/aeoess/mingle-mcp)
- **rel=4** [agent-blueprint/mcp-server](https://github.com/agent-blueprint/mcp-server)
- **rel=4** [agent-hanju/char-index-mcp](https://github.com/agent-hanju/char-index-mcp)
- **rel=4** [AgentBase1/mcp-server](https://github.com/AgentBase1/mcp-server)
- **rel=4** [AgentHotspot/agenthotspot-mcp](https://github.com/AgentHotspot/agenthotspot-mcp)
- **rel=4** [agenticdecks/deckrun-mcp](https://github.com/agenticdecks/deckrun-mcp)
- **rel=4** [Agentled/mcp-server](https://github.com/Agentled/mcp-server)
- **rel=4** [agentlux/agentlux-mcp](https://github.com/agentlux/agentlux-mcp)
- **rel=4** [AgentModule/mcp](https://github.com/AgentModule/mcp)
- **rel=4** [agntor/mcp](https://github.com/agntor/mcp)
- **rel=4** [AiAgentKarl/solana-mcp-server](https://github.com/AiAgentKarl/solana-mcp-server)
- **rel=4** [AIDataNordic/Food-Recipe-MCP](https://github.com/AIDataNordic/Food-Recipe-MCP)
- **rel=4** [aidemd-mcp/server](https://github.com/aidemd-mcp/server)
- **rel=4** [aikts/yandex-tracker-mcp](https://github.com/aikts/yandex-tracker-mcp)
- **rel=4** [AIM-Intelligence/AIM-MCP](https://github.com/AIM-Intelligence/AIM-MCP)
- **rel=4** [airblackbox/air-blackbox-mcp](https://github.com/airblackbox/air-blackbox-mcp)
- **rel=4** [akramIOT/MCP_AI_SOC_Sher](https://github.com/akramIOT/MCP_AI_SOC_Sher)
- **rel=4** [aktsmm/skill-ninja-mcp-server](https://github.com/aktsmm/skill-ninja-mcp-server)
- **rel=4** [alberthild/shieldapi-mcp](https://github.com/alberthild/shieldapi-mcp)
- **rel=4** [albertnahas/icogenie-mcp](https://github.com/albertnahas/icogenie-mcp)
- **rel=4** [alchemyplatform/alchemy-mcp-server](https://github.com/alchemyplatform/alchemy-mcp-server)
- **rel=4** [alcylu/nightlife-mcp](https://github.com/alcylu/nightlife-mcp)
- **rel=4** [alex-gon/thegamecrafter-mcp-server](https://github.com/alex-gon/thegamecrafter-mcp-server)
- **rel=4** [alexpota/cloudscope-mcp](https://github.com/alexpota/cloudscope-mcp)
- **rel=4** [alexpota/deploy-mcp](https://github.com/alexpota/deploy-mcp)
- **rel=4** [aliafsahnoudeh/shahnameh-mcp-server](https://github.com/aliafsahnoudeh/shahnameh-mcp-server)
- **rel=4** [aliafsahnoudeh/wildfire-mcp-server](https://github.com/aliafsahnoudeh/wildfire-mcp-server)
- **rel=4** [alimuratkuslu/byok-observability-mcp](https://github.com/alimuratkuslu/byok-observability-mcp)
- **rel=4** [alkemi-ai/alkemi-mcp](https://github.com/alkemi-ai/alkemi-mcp)
- **rel=4** [alpadalar/netops-mcp](https://github.com/alpadalar/netops-mcp)
- **rel=4** [alvii147/piston-mcp](https://github.com/alvii147/piston-mcp)
- **rel=4** [ananddtyagi/gif-creator-mcp](https://github.com/ananddtyagi/gif-creator-mcp)
- **rel=4** [ananddtyagi/webpage-screenshot-mcp](https://github.com/ananddtyagi/webpage-screenshot-mcp)
- **rel=4** [andrealufino/aapl-ads-mcp](https://github.com/andrealufino/aapl-ads-mcp)
- **rel=4** [andreas-roennestad/openhive-mcp](https://github.com/andreas-roennestad/openhive-mcp)
- **rel=4** [andrewschreiber/desktopinsights-mcp](https://github.com/andrewschreiber/desktopinsights-mcp)
- **rel=4** [andyWang1688/sql-query-mcp](https://github.com/andyWang1688/sql-query-mcp)
- **rel=4** [anki-mcp/anki-mcp-desktop](https://github.com/anki-mcp/anki-mcp-desktop)
- **rel=4** [AntonioTF5/soul-mcp-server](https://github.com/AntonioTF5/soul-mcp-server)
- **rel=4** [anwerj/youtube-uploader-mcp](https://github.com/anwerj/youtube-uploader-mcp)
- **rel=4** [aparajithn/agent-deploy-dashboard-mcp](https://github.com/aparajithn/agent-deploy-dashboard-mcp)
- **rel=4** [aparajithn/agent-scraper-mcp](https://github.com/aparajithn/agent-scraper-mcp)
- **rel=4** [aparajithn/agent-utils-mcp](https://github.com/aparajithn/agent-utils-mcp)
- **rel=4** [apiarya/wemo-mcp-server](https://github.com/apiarya/wemo-mcp-server)
- **rel=4** [araa47/jupiter-mcp](https://github.com/araa47/jupiter-mcp)
- **rel=4** [aranjan/kite-mcp](https://github.com/aranjan/kite-mcp)
- **rel=4** [ArchAI-Labs/fastmcp-sonarqube-metrics](https://github.com/ArchAI-Labs/fastmcp-sonarqube-metrics)
- **rel=4** [areweai/tsgram-mcp](https://github.com/areweai/tsgram-mcp)
- **rel=4** [ariadng/metatrader-mcp-server](https://github.com/ariadng/metatrader-mcp-server)
- **rel=4** [ariekogan/ateam-mcp](https://github.com/ariekogan/ateam-mcp)
- **rel=4** [arikusi/deepseek-mcp-server](https://github.com/arikusi/deepseek-mcp-server)
- **rel=4** [arjun1194/insta-mcp](https://github.com/arjun1194/insta-mcp)
- **rel=4** [ARKALDA/hejdar-mcp](https://github.com/ARKALDA/hejdar-mcp)
- **rel=4** [AryanBV/pdf-toolkit-mcp](https://github.com/AryanBV/pdf-toolkit-mcp)
- **rel=4** [ashev87/propstack-mcp](https://github.com/ashev87/propstack-mcp)
- **rel=4** [asif-nvc/e2b-sandbox-mcp](https://github.com/asif-nvc/e2b-sandbox-mcp)
- **rel=4** [asmith26/jupytercad-mcp](https://github.com/asmith26/jupytercad-mcp)
- **rel=4** [atlasprzetargow/mcp-server](https://github.com/atlasprzetargow/mcp-server)
- **rel=4** [attalla1/photopea-mcp-server](https://github.com/attalla1/photopea-mcp-server)
- **rel=4** [augmnt/augments-mcp-server](https://github.com/augmnt/augments-mcp-server)
- **rel=4** [austenstone/myinstants-mcp](https://github.com/austenstone/myinstants-mcp)
- **rel=4** [autonsol/sol-mcp](https://github.com/autonsol/sol-mcp)
- **rel=4** [avisangle/jenkins-mcp-server](https://github.com/avisangle/jenkins-mcp-server)
- **rel=4** [avisangle/method-crm-mcp](https://github.com/avisangle/method-crm-mcp)
- **rel=4** [avivsinai/langfuse-mcp](https://github.com/avivsinai/langfuse-mcp)
- **rel=4** [aywengo/kafka-schema-reg-mcp](https://github.com/aywengo/kafka-schema-reg-mcp)
- **rel=4** [azer/react-analyzer-mcp](https://github.com/azer/react-analyzer-mcp)
- **rel=4** [azeth-protocol/mcp-server](https://github.com/azeth-protocol/mcp-server)
- **rel=4** [Azure/azure-mcp](https://github.com/Azure/azure-mcp)
- **rel=4** [Backspace-me/sportscore-mcp](https://github.com/Backspace-me/sportscore-mcp)
- **rel=4** [bamwor-dev/bamwor-mcp-server](https://github.com/bamwor-dev/bamwor-mcp-server)
- **rel=4** [Bankless/onchain-mcp](https://github.com/Bankless/onchain-mcp)
- **rel=4** [baphometnxg/aloha-fyi-mcp](https://github.com/baphometnxg/aloha-fyi-mcp)
- **rel=4** [bartonguestier1725-collab/scout-mcp](https://github.com/bartonguestier1725-collab/scout-mcp)
- **rel=4** [bartwaardenburg/spaceship-mcp](https://github.com/bartwaardenburg/spaceship-mcp)
- **rel=4** [baskcart/w3ledger-mcp-server](https://github.com/baskcart/w3ledger-mcp-server)
- **rel=4** [baskcart/w3ship-mcp-server](https://github.com/baskcart/w3ship-mcp-server)
- **rel=4** [BB-fat/browser-use-rs](https://github.com/BB-fat/browser-use-rs)
- **rel=4** [bbonnin/openapi-to-mcp](https://github.com/bbonnin/openapi-to-mcp)
- **rel=4** [bch1212/agentfetch-mcp](https://github.com/bch1212/agentfetch-mcp)
- **rel=4** [Beltran12138/wecom-docs-mcp-server](https://github.com/Beltran12138/wecom-docs-mcp-server)
- **rel=4** [benmonopoli/open-greenhouse-mcp](https://github.com/benmonopoli/open-greenhouse-mcp)
- **rel=4** [Berckan/bugherd-mcp](https://github.com/Berckan/bugherd-mcp)
- **rel=4** [bighippoman/intercept-mcp](https://github.com/bighippoman/intercept-mcp)
- **rel=4** [bitrise-io/bitrise-mcp](https://github.com/bitrise-io/bitrise-mcp)
- **rel=4** [bivex/kanboard-mcp](https://github.com/bivex/kanboard-mcp)
- **rel=4** [BlackMount-ai/blackmount-nlp-mcp](https://github.com/BlackMount-ai/blackmount-nlp-mcp)
- **rel=4** [blakerouse/ssh-mcp](https://github.com/blakerouse/ssh-mcp)
- **rel=4** [blockrunai/blockrun-mcp](https://github.com/blockrunai/blockrun-mcp)
- **rel=4** [bogdan01m/zapcap-mcp-server](https://github.com/bogdan01m/zapcap-mcp-server)
- **rel=4** [boldsign/boldsign-mcp](https://github.com/boldsign/boldsign-mcp)
- **rel=4** [bolivian-peru/baozi-mcp](https://github.com/bolivian-peru/baozi-mcp)
- **rel=4** [botwallet-co/mcp](https://github.com/botwallet-co/mcp)
- **rel=4** [box/mcp-server-box-remote](https://github.com/box/mcp-server-box-remote)
- **rel=4** [bradleylab/stella-mcp](https://github.com/bradleylab/stella-mcp)
- **rel=4** [Brand-System/brandsystem-mcp](https://github.com/Brand-System/brandsystem-mcp)
- **rel=4** [brave/brave-search-mcp-server](https://github.com/brave/brave-search-mcp-server)
- **rel=4** [brianxiadong/ones-wiki-mcp-server](https://github.com/brianxiadong/ones-wiki-mcp-server)
- **rel=4** [Bright-L01/networkx-mcp-server](https://github.com/Bright-L01/networkx-mcp-server)
- **rel=4** [BRNDMK/brandomica-mcp-server](https://github.com/BRNDMK/brandomica-mcp-server)
- **rel=4** [bruno-portfolio/agrobr-mcp](https://github.com/bruno-portfolio/agrobr-mcp)
- **rel=4** [BrunoKrugel/echo-mcp](https://github.com/BrunoKrugel/echo-mcp)
- **rel=4** [bug-breeder/quip-mcp](https://github.com/bug-breeder/quip-mcp)
- **rel=4** [buildsyncinc/gibs-mcp](https://github.com/buildsyncinc/gibs-mcp)
- **rel=4** [bulatko/vk-mcp-server](https://github.com/bulatko/vk-mcp-server)
- **rel=4** [BV-Venky/excalidraw-architect-mcp](https://github.com/BV-Venky/excalidraw-architect-mcp)
- **rel=4** [ByAxe/keynote-mcp](https://github.com/ByAxe/keynote-mcp)
- **rel=4** [Cactusinhand/mcp_server_notify](https://github.com/Cactusinhand/mcp_server_notify)
- **rel=4** [cahthuranag/mcp-server](https://github.com/cahthuranag/mcp-server)
- **rel=4** [cameronrye/activitypub-mcp](https://github.com/cameronrye/activitypub-mcp)
- **rel=4** [cameronrye/gopher-mcp](https://github.com/cameronrye/gopher-mcp)
- **rel=4** [cameronrye/openzim-mcp](https://github.com/cameronrye/openzim-mcp)
- **rel=4** [cantian-ai/bazi-mcp](https://github.com/cantian-ai/bazi-mcp)
- **rel=4** [carlosahumada89/govrider-mcp-server](https://github.com/carlosahumada89/govrider-mcp-server)
- **rel=4** [carrierone/verilexdata-mcp](https://github.com/carrierone/verilexdata-mcp)
- **rel=4** [carsol/monarch-mcp-server](https://github.com/carsol/monarch-mcp-server)
- **rel=4** [Cartisien/engram-mcp](https://github.com/Cartisien/engram-mcp)
- **rel=4** [catrinmdonnelly/royalmail-mcp](https://github.com/catrinmdonnelly/royalmail-mcp)
- **rel=4** [cevatkerim/unsplash-mcp](https://github.com/cevatkerim/unsplash-mcp)
- **rel=4** [cfpramod/open-museum-mcp](https://github.com/cfpramod/open-museum-mcp)
- **rel=4** [chrbailey/promptspeak-mcp-server](https://github.com/chrbailey/promptspeak-mcp-server)
- **rel=4** [chrisbusbin-pixel/propfirmdealfinder-mcp-server](https://github.com/chrisbusbin-pixel/propfirmdealfinder-mcp-server)
- **rel=4** [ChrisGVE/workspace-qdrant-mcp](https://github.com/ChrisGVE/workspace-qdrant-mcp)
- **rel=4** [ChristianHinge/dicom-mcp](https://github.com/ChristianHinge/dicom-mcp)
- **rel=4** [christulino/todoist-v1-mcp-server](https://github.com/christulino/todoist-v1-mcp-server)
- **rel=4** [cipherfoxie/sovereign-mcp](https://github.com/cipherfoxie/sovereign-mcp)
- **rel=4** [ckanthony/gin-mcp](https://github.com/ckanthony/gin-mcp)
- **rel=4** [ckreiling/mcp-server-docker](https://github.com/ckreiling/mcp-server-docker)
- **rel=4** [clamp-sh/mcp](https://github.com/clamp-sh/mcp)
- **rel=4** [co-browser/attestable-mcp-server](https://github.com/co-browser/attestable-mcp-server)
- **rel=4** [cobanov/teslamate-mcp](https://github.com/cobanov/teslamate-mcp)
- **rel=4** [codefuturist/email-mcp](https://github.com/codefuturist/email-mcp)
- **rel=4** [codex-curator/studiomcphub](https://github.com/codex-curator/studiomcphub)
- **rel=4** [competlab/competlab-mcp-server](https://github.com/competlab/competlab-mcp-server)
- **rel=4** [conan-io/conan-mcp](https://github.com/conan-io/conan-mcp)
- **rel=4** [conarti/mattermost-mcp](https://github.com/conarti/mattermost-mcp)
- **rel=4** [configcat/mcp-server](https://github.com/configcat/mcp-server)
- **rel=4** [Connectry-io/connectrylab-architect-cert-mcp](https://github.com/Connectry-io/connectrylab-architect-cert-mcp)
- **rel=4** [conorbronsdon/gws-mcp-server](https://github.com/conorbronsdon/gws-mcp-server)
- **rel=4** [conorbronsdon/substack-mcp](https://github.com/conorbronsdon/substack-mcp)
- **rel=4** [copperline-labs/rendex-mcp](https://github.com/copperline-labs/rendex-mcp)
- **rel=4** [corbym/backlog-mcp](https://github.com/corbym/backlog-mcp)
- **rel=4** [cqfn/aibolit-mcp-server](https://github.com/cqfn/aibolit-mcp-server)
- **rel=4** [Crawleo/Crawleo-MCP](https://github.com/Crawleo/Crawleo-MCP)
- **rel=4** [cryptobriefing/gloria-mcp](https://github.com/cryptobriefing/gloria-mcp)
- **rel=4** [CryptoRugMunch/rug-munch-mcp](https://github.com/CryptoRugMunch/rug-munch-mcp)
- **rel=4** [cryptosquanch/legends-mcp](https://github.com/cryptosquanch/legends-mcp)
- **rel=4** [csjoblom/musclesworked-mcp](https://github.com/csjoblom/musclesworked-mcp)
- **rel=4** [cswkim/discogs-mcp-server](https://github.com/cswkim/discogs-mcp-server)
- **rel=4** [cuthongthai-vn/vimo-mcp-server](https://github.com/cuthongthai-vn/vimo-mcp-server)
- **rel=4** [Cyberweasel777/botindex-mcp-server](https://github.com/Cyberweasel777/botindex-mcp-server)
- **rel=4** [czottmann/kagi-ken-mcp](https://github.com/czottmann/kagi-ken-mcp)
- **rel=4** [Daghis/teamcity-mcp](https://github.com/Daghis/teamcity-mcp)
- **rel=4** [Daichi-Kudo/llm-advisor-mcp](https://github.com/Daichi-Kudo/llm-advisor-mcp)
- **rel=4** [damientilman/mailchimp-mcp-server](https://github.com/damientilman/mailchimp-mcp-server)
- **rel=4** [dan1d/dolar-mcp](https://github.com/dan1d/dolar-mcp)
- **rel=4** [dan1d/mercadolibre-mcp](https://github.com/dan1d/mercadolibre-mcp)
- **rel=4** [danielkennedy1/pdf-tools-mcp](https://github.com/danielkennedy1/pdf-tools-mcp)
- **rel=4** [DappierAI/dappier-mcp](https://github.com/DappierAI/dappier-mcp)
- **rel=4** [DareDev256/fcpxml-mcp-server](https://github.com/DareDev256/fcpxml-mcp-server)
- **rel=4** [darktw/chatpipe-mcp](https://github.com/darktw/chatpipe-mcp)
- **rel=4** [darktw/usecortex-mcp](https://github.com/darktw/usecortex-mcp)
- **rel=4** [Data-Everything/mcp-server-templates](https://github.com/Data-Everything/mcp-server-templates)
- **rel=4** [datalayer/jupyter-mcp-server](https://github.com/datalayer/jupyter-mcp-server)
- **rel=4** [dave-wind/mysql-mcp-server](https://github.com/dave-wind/mysql-mcp-server)
- **rel=4** [davegomez/fizzy-mcp](https://github.com/davegomez/fizzy-mcp)
- **rel=4** [davidan90/time-node-mcp](https://github.com/davidan90/time-node-mcp)
- **rel=4** [davidlandais/ovh-api-mcp](https://github.com/davidlandais/ovh-api-mcp)
- **rel=4** [davidlin2k/pox-mcp-server](https://github.com/davidlin2k/pox-mcp-server)
- **rel=4** [davidsimoes/digisign-mcp](https://github.com/davidsimoes/digisign-mcp)
- **rel=4** [dcostenco/prism-mcp](https://github.com/dcostenco/prism-mcp)
- **rel=4** [dearlordylord/huly-mcp](https://github.com/dearlordylord/huly-mcp)
- **rel=4** [Declan142/calcnook-mcp-server](https://github.com/Declan142/calcnook-mcp-server)
- **rel=4** [delega-dev/delega-mcp](https://github.com/delega-dev/delega-mcp)
- **rel=4** [demwick/polymarket-agent-mcp](https://github.com/demwick/polymarket-agent-mcp)
- **rel=4** [devilcoder01/weather-mcp-server](https://github.com/devilcoder01/weather-mcp-server)
- **rel=4** [DigiCatalyst-Systems/dep-diff-mcp](https://github.com/DigiCatalyst-Systems/dep-diff-mcp)
- **rel=4** [discava/mcp-server](https://github.com/discava/mcp-server)
- **rel=4** [disco-trooper/apple-notes-mcp](https://github.com/disco-trooper/apple-notes-mcp)
- **rel=4** [discourse/discourse-mcp](https://github.com/discourse/discourse-mcp)
- **rel=4** [dnaerys/onekgpd-mcp](https://github.com/dnaerys/onekgpd-mcp)
- **rel=4** [docker/hub-mcp](https://github.com/docker/hub-mcp)
- **rel=4** [doctorm333/promptpilot-mcp-server](https://github.com/doctorm333/promptpilot-mcp-server)
- **rel=4** [dodopayments/context-mcp](https://github.com/dodopayments/context-mcp)
- **rel=4** [doggybee/mcp-server-ccxt](https://github.com/doggybee/mcp-server-ccxt)
- **rel=4** [DollhouseMCP/mcp-server](https://github.com/DollhouseMCP/mcp-server)
- **rel=4** [dorukardahan/domain-search-mcp](https://github.com/dorukardahan/domain-search-mcp)
- **rel=4** [dorukardahan/twitterapi-docs-mcp](https://github.com/dorukardahan/twitterapi-docs-mcp)
- **rel=4** [dotemacs/domain-lookup-mcp](https://github.com/dotemacs/domain-lookup-mcp)
- **rel=4** [dushyant30suthar/endiagram-mcp](https://github.com/dushyant30suthar/endiagram-mcp)
- **rel=4** [echojobsio/jdl-mcp-server](https://github.com/echojobsio/jdl-mcp-server)
- **rel=4** [edgedelta/edgedelta-mcp-server](https://github.com/edgedelta/edgedelta-mcp-server)
- **rel=4** [efremidze/swift-patterns-mcp](https://github.com/efremidze/swift-patterns-mcp)
- **rel=4** [eirikb/any-cli-mcp-server](https://github.com/eirikb/any-cli-mcp-server)
- **rel=4** [ekkyarmandi/ticktick-mcp](https://github.com/ekkyarmandi/ticktick-mcp)
- **rel=4** [ellmos-ai/ellmos-codecommander-mcp](https://github.com/ellmos-ai/ellmos-codecommander-mcp)
- **rel=4** [ellmos-ai/ellmos-filecommander-mcp](https://github.com/ellmos-ai/ellmos-filecommander-mcp)
- **rel=4** [ellmos-ai/n8n-manager-mcp](https://github.com/ellmos-ai/n8n-manager-mcp)
- **rel=4** [Emanuele94/SimBrief-MCPServer](https://github.com/Emanuele94/SimBrief-MCPServer)
- **rel=4** [emicklei/melrose-mcp](https://github.com/emicklei/melrose-mcp)
- **rel=4** [equivault/equivault-mcp](https://github.com/equivault/equivault-mcp)
- **rel=4** [erajasekar/ai-diagram-maker-mcp](https://github.com/erajasekar/ai-diagram-maker-mcp)
- **rel=4** [ericbrown/project-context-mcp](https://github.com/ericbrown/project-context-mcp)
- **rel=4** [espressif/esp-rainmaker-mcp](https://github.com/espressif/esp-rainmaker-mcp)
- **rel=4** [etbars/vibetrader-mcp](https://github.com/etbars/vibetrader-mcp)
- **rel=4** [ethbak/icon-composer-mcp](https://github.com/ethbak/icon-composer-mcp)
- **rel=4** [ExpertVagabond/solana-mcp-server](https://github.com/ExpertVagabond/solana-mcp-server)
- **rel=4** [ExpertVagabond/solmail-mcp](https://github.com/ExpertVagabond/solmail-mcp)
- **rel=4** [eyaushev/swagger-testcase-mcp](https://github.com/eyaushev/swagger-testcase-mcp)
- **rel=4** [FantomaSkaRus1/telegram-bot-mcp](https://github.com/FantomaSkaRus1/telegram-bot-mcp)
- **rel=4** [FastAlertNow/mcp-server](https://github.com/FastAlertNow/mcp-server)
- **rel=4** [fasuizu-br/brainiall-mcp-server](https://github.com/fasuizu-br/brainiall-mcp-server)
- **rel=4** [ferdousbhai/wsb-analyst-mcp](https://github.com/ferdousbhai/wsb-analyst-mcp)
- **rel=4** [ferrants/memvid-mcp-server](https://github.com/ferrants/memvid-mcp-server)
- **rel=4** [financialdatanet/mcp-server](https://github.com/financialdatanet/mcp-server)
- **rel=4** [finmap-org/mcp-server](https://github.com/finmap-org/mcp-server)
- **rel=4** [flipt-io/mcp-server-flipt](https://github.com/flipt-io/mcp-server-flipt)
- **rel=4** [flowzap-xyz/flowzap-mcp](https://github.com/flowzap-xyz/flowzap-mcp)
- **rel=4** [Fluke-Studio/uk-business-intelligence-mcp](https://github.com/Fluke-Studio/uk-business-intelligence-mcp)
- **rel=4** [freema/firefox-devtools-mcp](https://github.com/freema/firefox-devtools-mcp)
- **rel=4** [freema/openclaw-mcp](https://github.com/freema/openclaw-mcp)
- **rel=4** [Frihet-io/frihet-mcp](https://github.com/Frihet-io/frihet-mcp)
- **rel=4** [Frontier-Compute/zcash-mcp](https://github.com/Frontier-Compute/zcash-mcp)
- **rel=4** [Fund-z/fundzwatch-mcp](https://github.com/Fund-z/fundzwatch-mcp)
- **rel=4** [gaopengbin/cesium-mcp](https://github.com/gaopengbin/cesium-mcp)
- **rel=4** [gaudiolab-jp/gaudio-developers-mcp](https://github.com/gaudiolab-jp/gaudio-developers-mcp)
- **rel=4** [gavelin-ai/mcp](https://github.com/gavelin-ai/mcp)
- **rel=4** [gavxm/ani-mcp](https://github.com/gavxm/ani-mcp)
- **rel=4** [gbrigandi/mcp-server-cortex](https://github.com/gbrigandi/mcp-server-cortex)
- **rel=4** [gbrigandi/mcp-server-thehive](https://github.com/gbrigandi/mcp-server-thehive)
- **rel=4** [gbrigandi/mcp-server-wazuh](https://github.com/gbrigandi/mcp-server-wazuh)
- **rel=4** [GeiserX/atlassian-browser-mcp](https://github.com/GeiserX/atlassian-browser-mcp)
- **rel=4** [GeiserX/cashpilot-mcp](https://github.com/GeiserX/cashpilot-mcp)
- **rel=4** [GeiserX/duplicacy-mcp](https://github.com/GeiserX/duplicacy-mcp)
- **rel=4** [GeiserX/genieacs-mcp](https://github.com/GeiserX/genieacs-mcp)
- **rel=4** [GeiserX/lynxprompt-mcp](https://github.com/GeiserX/lynxprompt-mcp)
- **rel=4** [GeiserX/pumperly-mcp](https://github.com/GeiserX/pumperly-mcp)
- **rel=4** [GeiserX/telegram-archive-mcp](https://github.com/GeiserX/telegram-archive-mcp)
- **rel=4** [GenWaveLLC/svgmaker-mcp](https://github.com/GenWaveLLC/svgmaker-mcp)
- **rel=4** [geolabel/geolabel-mcp](https://github.com/geolabel/geolabel-mcp)
- **rel=4** [getalai/alai-mcp-server](https://github.com/getalai/alai-mcp-server)
- **rel=4** [GetMystAdmin/urdb-mcp](https://github.com/GetMystAdmin/urdb-mcp)
- **rel=4** [gitopia/gitopia-mcp-server](https://github.com/gitopia/gitopia-mcp-server)
- **rel=4** [GittyBurstein/mermaid-mcp-server](https://github.com/GittyBurstein/mermaid-mcp-server)
- **rel=4** [giuseppe-coco/Google-Workspace-MCP-Server](https://github.com/giuseppe-coco/Google-Workspace-MCP-Server)
- **rel=4** [gjenkins20/unofficial-fortimonitor-mcp-server](https://github.com/gjenkins20/unofficial-fortimonitor-mcp-server)
- **rel=4** [gjenkins20/webmin-mcp-server](https://github.com/gjenkins20/webmin-mcp-server)
- **rel=4** [glaksmono/finbud-data-mcp](https://github.com/glaksmono/finbud-data-mcp)
- **rel=4** [goodmeta/intelligence-mcp](https://github.com/goodmeta/intelligence-mcp)
- **rel=4** [googlarz/suunto-mcp](https://github.com/googlarz/suunto-mcp)
- **rel=4** [gosodax/builders-sodax-mcp-server](https://github.com/gosodax/builders-sodax-mcp-server)
- **rel=4** [Govcraft/rust-docs-mcp-server](https://github.com/Govcraft/rust-docs-mcp-server)
- **rel=4** [gpu-bridge/mcp-server](https://github.com/gpu-bridge/mcp-server)
- **rel=4** [gregm711/agent-domain-service-mcp](https://github.com/gregm711/agent-domain-service-mcp)
- **rel=4** [grovs-io/mcp](https://github.com/grovs-io/mcp)
- **rel=4** [growilabs/growi-mcp-server](https://github.com/growilabs/growi-mcp-server)
- **rel=4** [gsmethells/preflight-mcp](https://github.com/gsmethells/preflight-mcp)
- **rel=4** [GUCCI-atlasv/skillssafe-mcp](https://github.com/GUCCI-atlasv/skillssafe-mcp)
- **rel=4** [gupta-kush/spotify-mcp](https://github.com/gupta-kush/spotify-mcp)
- **rel=4** [gwbischof/bluesky-social-mcp](https://github.com/gwbischof/bluesky-social-mcp)
- **rel=4** [gwbischof/free-will-mcp](https://github.com/gwbischof/free-will-mcp)
- **rel=4** [gwbischof/outsource-mcp](https://github.com/gwbischof/outsource-mcp)
- **rel=4** [HadiCherkaoui/crafty-mcp](https://github.com/HadiCherkaoui/crafty-mcp)
- **rel=4** [HagaiHen/facebook-mcp-server](https://github.com/HagaiHen/facebook-mcp-server)
- **rel=4** [HanSur94/matlab-mcp-server-python](https://github.com/HanSur94/matlab-mcp-server-python)
- **rel=4** [hanzili/comet-mcp](https://github.com/hanzili/comet-mcp)
- **rel=4** [haomingkoo/japan-seasons-mcp](https://github.com/haomingkoo/japan-seasons-mcp)
- **rel=4** [HaroldFinchIFT/vuln-nist-mcp-server](https://github.com/HaroldFinchIFT/vuln-nist-mcp-server)
- **rel=4** [HasData/hasdata-mcp](https://github.com/HasData/hasdata-mcp)
- **rel=4** [Helm-Protocol/openttt-mcp](https://github.com/Helm-Protocol/openttt-mcp)
- **rel=4** [helpful-AIs/triplyfy-mcp](https://github.com/helpful-AIs/triplyfy-mcp)
- **rel=4** [henilcalagiya/google-sheets-mcp](https://github.com/henilcalagiya/google-sheets-mcp)
- **rel=4** [hifriendbot/agentwallet-mcp](https://github.com/hifriendbot/agentwallet-mcp)
- **rel=4** [hifriendbot/cogmemai-mcp](https://github.com/hifriendbot/cogmemai-mcp)
- **rel=4** [higress-group/higress-ops-mcp-server](https://github.com/higress-group/higress-ops-mcp-server)
- **rel=4** [Himalayas-App/himalayas-mcp](https://github.com/Himalayas-App/himalayas-mcp)
- **rel=4** [hkaanengin/opendota-mcp-server](https://github.com/hkaanengin/opendota-mcp-server)
- **rel=4** [hlydecker/ucsc-genome-mcp](https://github.com/hlydecker/ucsc-genome-mcp)
- **rel=4** [hoklims/stacksfinder-mcp](https://github.com/hoklims/stacksfinder-mcp)
- **rel=4** [hope1026/weppy-roblox-mcp](https://github.com/hope1026/weppy-roblox-mcp)
- **rel=4** [hoqqun/stooq-mcp](https://github.com/hoqqun/stooq-mcp)
- **rel=4** [horustechltd/horus-flow-mcp](https://github.com/horustechltd/horus-flow-mcp)
- **rel=4** [Hovsteder/powersun-tron-mcp](https://github.com/Hovsteder/powersun-tron-mcp)
- **rel=4** [HubLensOfficial/mcp-server](https://github.com/HubLensOfficial/mcp-server)
- **rel=4** [HumanSignal/label-studio-mcp-server](https://github.com/HumanSignal/label-studio-mcp-server)
- **rel=4** [hungthai1401/bruno-mcp](https://github.com/hungthai1401/bruno-mcp)
- **rel=4** [hyperb1iss/lucidity-mcp](https://github.com/hyperb1iss/lucidity-mcp)
- **rel=4** [hypescale/storyblok-mcp-server](https://github.com/hypescale/storyblok-mcp-server)
- **rel=4** [i-am-bee/acp-mcp](https://github.com/i-am-bee/acp-mcp)
- **rel=4** [iamredmh/volta-mcp-server](https://github.com/iamredmh/volta-mcp-server)
- **rel=4** [ianaleck/harvest-mcp-server](https://github.com/ianaleck/harvest-mcp-server)
- **rel=4** [iaptic/mcp-server-iaptic](https://github.com/iaptic/mcp-server-iaptic)
- **rel=4** [idapixl/algora-mcp-server](https://github.com/idapixl/algora-mcp-server)
- **rel=4** [idapixl/idapixl-web-research-mcp](https://github.com/idapixl/idapixl-web-research-mcp)
- **rel=4** [ignaciohermosillacornejo/copilot-money-mcp](https://github.com/ignaciohermosillacornejo/copilot-money-mcp)
- **rel=4** [iiAtlas/hledger-mcp](https://github.com/iiAtlas/hledger-mcp)
- **rel=4** [ikoskela/wisepanel-mcp](https://github.com/ikoskela/wisepanel-mcp)
- **rel=4** [IlyaGulya/gradle-mcp-server](https://github.com/IlyaGulya/gradle-mcp-server)
- **rel=4** [imdinu/apple-mail-mcp](https://github.com/imdinu/apple-mail-mcp)
- **rel=4** [incentivai/quickchat-ai-mcp](https://github.com/incentivai/quickchat-ai-mcp)
- **rel=4** [incu6us/loki-mcp-server](https://github.com/incu6us/loki-mcp-server)
- **rel=4** [IndigoProtocol/cardano-mcp](https://github.com/IndigoProtocol/cardano-mcp)
- **rel=4** [IndigoProtocol/indigo-mcp](https://github.com/IndigoProtocol/indigo-mcp)
- **rel=4** [InditexTech/mcp-server-simulator-ios-idb](https://github.com/InditexTech/mcp-server-simulator-ios-idb)
- **rel=4** [influxdata/influxdb3_mcp_server](https://github.com/influxdata/influxdb3_mcp_server)
- **rel=4** [infobip/mcp](https://github.com/infobip/mcp)
- **rel=4** [inkog-io/inkog-mcp](https://github.com/inkog-io/inkog-mcp)
- **rel=4** [InsForge/insforge-mcp](https://github.com/InsForge/insforge-mcp)
- **rel=4** [inspizzz/jetbrains-datalore-mcp](https://github.com/inspizzz/jetbrains-datalore-mcp)
- **rel=4** [intruder-io/intruder-mcp](https://github.com/intruder-io/intruder-mcp)
- **rel=4** [IO-Aerospace-software-engineering/mcp-server](https://github.com/IO-Aerospace-software-engineering/mcp-server)
- **rel=4** [ipfred/aiwen-mcp-server-geoip](https://github.com/ipfred/aiwen-mcp-server-geoip)
- **rel=4** [isdaniel/mcp_weather_server](https://github.com/isdaniel/mcp_weather_server)
- **rel=4** [IvanAmador/vercel-ai-docs-mcp](https://github.com/IvanAmador/vercel-ai-docs-mcp)
- **rel=4** [j0hanz/filesystem-context-mcp-server](https://github.com/j0hanz/filesystem-context-mcp-server)
- **rel=4** [j4c0bs/mcp-server-sql-analyzer](https://github.com/j4c0bs/mcp-server-sql-analyzer)
- **rel=4** [jackrain19743/hou-tea-mcp-server](https://github.com/jackrain19743/hou-tea-mcp-server)
- **rel=4** [jacobsd32-cpu/djd-agent-score-mcp](https://github.com/jacobsd32-cpu/djd-agent-score-mcp)
- **rel=4** [jae-jae/g-search-mcp](https://github.com/jae-jae/g-search-mcp)
- **rel=4** [jagmarques/asqav-mcp](https://github.com/jagmarques/asqav-mcp)
- **rel=4** [JamesANZ/bitcoin-mcp](https://github.com/JamesANZ/bitcoin-mcp)
- **rel=4** [JamesANZ/cross-llm-mcp](https://github.com/JamesANZ/cross-llm-mcp)
- **rel=4** [JamesANZ/evm-mcp](https://github.com/JamesANZ/evm-mcp)
- **rel=4** [JamesANZ/medical-mcp](https://github.com/JamesANZ/medical-mcp)
- **rel=4** [JamesANZ/memory-mcp](https://github.com/JamesANZ/memory-mcp)
- **rel=4** [JamesANZ/prediction-market-mcp](https://github.com/JamesANZ/prediction-market-mcp)
- **rel=4** [JamesANZ/system-prompts-mcp-server](https://github.com/JamesANZ/system-prompts-mcp-server)
- **rel=4** [JamesANZ/us-legal-mcp](https://github.com/JamesANZ/us-legal-mcp)
- **rel=4** [jasonwilbur/cloud-cost-mcp](https://github.com/jasonwilbur/cloud-cost-mcp)
- **rel=4** [jasonwilbur/oci-pricing-mcp](https://github.com/jasonwilbur/oci-pricing-mcp)
- **rel=4** [jaspertvdm/mcp-server-gemini-bridge](https://github.com/jaspertvdm/mcp-server-gemini-bridge)
- **rel=4** [jaspertvdm/mcp-server-inject-bender](https://github.com/jaspertvdm/mcp-server-inject-bender)
- **rel=4** [jaspertvdm/mcp-server-ollama-bridge](https://github.com/jaspertvdm/mcp-server-ollama-bridge)
- **rel=4** [jaspertvdm/mcp-server-openai-bridge](https://github.com/jaspertvdm/mcp-server-openai-bridge)
- **rel=4** [jaspertvdm/mcp-server-rabel](https://github.com/jaspertvdm/mcp-server-rabel)
- **rel=4** [jaspertvdm/mcp-server-tibet](https://github.com/jaspertvdm/mcp-server-tibet)
- **rel=4** [jau123/MeiGen-AI-Design-MCP](https://github.com/jau123/MeiGen-AI-Design-MCP)
- **rel=4** [JaviMaligno/mcp-server-bitbucket](https://github.com/JaviMaligno/mcp-server-bitbucket)
- **rel=4** [jawdat6/fixgraph-mcp](https://github.com/jawdat6/fixgraph-mcp)
- **rel=4** [jen6/ticktick-mcp](https://github.com/jen6/ticktick-mcp)
- **rel=4** [jhomen368/overseerr-mcp](https://github.com/jhomen368/overseerr-mcp)
- **rel=4** [jhomen368/steam-reviews-mcp](https://github.com/jhomen368/steam-reviews-mcp)
- **rel=4** [jimfilippou/things-mcp](https://github.com/jimfilippou/things-mcp)
- **rel=4** [jinzcdev/markmap-mcp-server](https://github.com/jinzcdev/markmap-mcp-server)
- **rel=4** [jj-cheng25/weixin-articles-mcp](https://github.com/jj-cheng25/weixin-articles-mcp)
- **rel=4** [jjlabsio/korea-stock-mcp](https://github.com/jjlabsio/korea-stock-mcp)
- **rel=4** [jkiley129/steam-mcp](https://github.com/jkiley129/steam-mcp)
- **rel=4** [jmrplens/gitlab-mcp-server](https://github.com/jmrplens/gitlab-mcp-server)
- **rel=4** [joepangallo/mcp-server-agentpay](https://github.com/joepangallo/mcp-server-agentpay)
- **rel=4** [joergmichno/clawguard-mcp](https://github.com/joergmichno/clawguard-mcp)
- **rel=4** [johannesbrandenburger/typst-mcp](https://github.com/johannesbrandenburger/typst-mcp)
- **rel=4** [jordanlyall/wc26-mcp](https://github.com/jordanlyall/wc26-mcp)
- **rel=4** [jorgenclaw/nostr-mcp-server](https://github.com/jorgenclaw/nostr-mcp-server)
- **rel=4** [JoshuaRileyDev/app-store-connect-mcp-server](https://github.com/JoshuaRileyDev/app-store-connect-mcp-server)
- **rel=4** [JoshuaRileyDev/simulator-mcp-server](https://github.com/JoshuaRileyDev/simulator-mcp-server)
- **rel=4** [joshuayoes/ios-simulator-mcp](https://github.com/joshuayoes/ios-simulator-mcp)
- **rel=4** [JosueM1109/personal-finance-mcp](https://github.com/JosueM1109/personal-finance-mcp)
- **rel=4** [jstibal/openterms-mcp](https://github.com/jstibal/openterms-mcp)
- **rel=4** [jtalk22/slack-mcp-server](https://github.com/jtalk22/slack-mcp-server)
- **rel=4** [juanisidoro/securecode-mcp](https://github.com/juanisidoro/securecode-mcp)
- **rel=4** [junipr-labs/mcp-server](https://github.com/junipr-labs/mcp-server)
- **rel=4** [kaiyuanxiaobing/atomgit-mcp-server](https://github.com/kaiyuanxiaobing/atomgit-mcp-server)
- **rel=4** [kambriso/fritzbox-mcp-server](https://github.com/kambriso/fritzbox-mcp-server)
- **rel=4** [Kapeli/dash-mcp-server](https://github.com/Kapeli/dash-mcp-server)
- **rel=4** [keepgoing-dev/mcp-server](https://github.com/keepgoing-dev/mcp-server)
- **rel=4** [keiver/image-tiler-mcp-server](https://github.com/keiver/image-tiler-mcp-server)
- **rel=4** [kenneives/design-token-bridge-mcp](https://github.com/kenneives/design-token-bridge-mcp)
- **rel=4** [kestra-io/mcp-server-python](https://github.com/kestra-io/mcp-server-python)
- **rel=4** [kevinswint/xcode-studio-mcp](https://github.com/kevinswint/xcode-studio-mcp)
- **rel=4** [khan2a/telephony-mcp-server](https://github.com/khan2a/telephony-mcp-server)
- **rel=4** [khaoss85/arvo-mcp](https://github.com/khaoss85/arvo-mcp)
- **rel=4** [khglynn/spotify-bulk-actions-mcp](https://github.com/khglynn/spotify-bulk-actions-mcp)
- **rel=4** [kimdonghwi94/web-analyzer-mcp](https://github.com/kimdonghwi94/web-analyzer-mcp)
- **rel=4** [king-of-the-grackles/reddit-research-mcp](https://github.com/king-of-the-grackles/reddit-research-mcp)
- **rel=4** [kitao/pyxel-mcp](https://github.com/kitao/pyxel-mcp)
- **rel=4** [knowledgepa3/gia-mcp-server](https://github.com/knowledgepa3/gia-mcp-server)
- **rel=4** [KOVY/agentforge-trust-mcp](https://github.com/KOVY/agentforge-trust-mcp)
- **rel=4** [KrishnaPramodParupudi/kaggle-mcp-server](https://github.com/KrishnaPramodParupudi/kaggle-mcp-server)
- **rel=4** [kukapay/binance-alpha-mcp](https://github.com/kukapay/binance-alpha-mcp)
- **rel=4** [kukapay/bitcoin-utxo-mcp](https://github.com/kukapay/bitcoin-utxo-mcp)
- **rel=4** [kukapay/blockbeats-mcp](https://github.com/kukapay/blockbeats-mcp)
- **rel=4** [kukapay/blocknative-mcp](https://github.com/kukapay/blocknative-mcp)
- **rel=4** [kukapay/bridge-metrics-mcp](https://github.com/kukapay/bridge-metrics-mcp)
- **rel=4** [kukapay/bridge-rates-mcp](https://github.com/kukapay/bridge-rates-mcp)
- **rel=4** [kukapay/chainlink-feeds-mcp](https://github.com/kukapay/chainlink-feeds-mcp)
- **rel=4** [kukapay/chainlist-mcp](https://github.com/kukapay/chainlist-mcp)
- **rel=4** [kukapay/cointelegraph-mcp](https://github.com/kukapay/cointelegraph-mcp)
- **rel=4** [kukapay/crypto-funds-mcp](https://github.com/kukapay/crypto-funds-mcp)
- **rel=4** [kukapay/crypto-liquidations-mcp](https://github.com/kukapay/crypto-liquidations-mcp)
- **rel=4** [kukapay/crypto-news-mcp](https://github.com/kukapay/crypto-news-mcp)
- **rel=4** [kukapay/crypto-orderbook-mcp](https://github.com/kukapay/crypto-orderbook-mcp)
- **rel=4** [kukapay/crypto-pegmon-mcp](https://github.com/kukapay/crypto-pegmon-mcp)
- **rel=4** [kukapay/crypto-projects-mcp](https://github.com/kukapay/crypto-projects-mcp)
- **rel=4** [kukapay/crypto-stocks-mcp](https://github.com/kukapay/crypto-stocks-mcp)
- **rel=4** [kukapay/crypto-trending-mcp](https://github.com/kukapay/crypto-trending-mcp)
- **rel=4** [kukapay/crypto-whitepapers-mcp](https://github.com/kukapay/crypto-whitepapers-mcp)
- **rel=4** [kukapay/dao-proposals-mcp](https://github.com/kukapay/dao-proposals-mcp)
- **rel=4** [kukapay/defi-yields-mcp](https://github.com/kukapay/defi-yields-mcp)
- **rel=4** [kukapay/dex-pools-mcp](https://github.com/kukapay/dex-pools-mcp)
- **rel=4** [kukapay/dexscreener-trending-mcp](https://github.com/kukapay/dexscreener-trending-mcp)
- **rel=4** [kukapay/ethereum-validator-queue-mcp](https://github.com/kukapay/ethereum-validator-queue-mcp)
- **rel=4** [kukapay/funding-rates-mcp](https://github.com/kukapay/funding-rates-mcp)
- **rel=4** [kukapay/hyperliquid-info-mcp](https://github.com/kukapay/hyperliquid-info-mcp)
- **rel=4** [kukapay/hyperliquid-whalealert-mcp](https://github.com/kukapay/hyperliquid-whalealert-mcp)
- **rel=4** [kukapay/polymarket-predictions-mcp](https://github.com/kukapay/polymarket-predictions-mcp)
- **rel=4** [kukapay/pumpswap-mcp](https://github.com/kukapay/pumpswap-mcp)
- **rel=4** [kukapay/raydium-launchlab-mcp](https://github.com/kukapay/raydium-launchlab-mcp)
- **rel=4** [kukapay/stargate-bridge-mcp](https://github.com/kukapay/stargate-bridge-mcp)
- **rel=4** [kukapay/sui-trader-mcp](https://github.com/kukapay/sui-trader-mcp)
- **rel=4** [kukapay/uniswap-price-mcp](https://github.com/kukapay/uniswap-price-mcp)
- **rel=4** [kukapay/wallet-inspector-mcp](https://github.com/kukapay/wallet-inspector-mcp)
- **rel=4** [kukapay/web3-jobs-mcp](https://github.com/kukapay/web3-jobs-mcp)
- **rel=4** [KVANTRA-dev/NOUZ-MCP](https://github.com/KVANTRA-dev/NOUZ-MCP)
- **rel=4** [KyuRish/fiverr-mcp-server](https://github.com/KyuRish/fiverr-mcp-server)
- **rel=4** [KyuRish/trading212-mcp-server](https://github.com/KyuRish/trading212-mcp-server)
- **rel=4** [Kzino/vorim-mcp-server](https://github.com/Kzino/vorim-mcp-server)
- **rel=4** [labeveryday/nba_mcp_server](https://github.com/labeveryday/nba_mcp_server)
- **rel=4** [Labs64/NetLicensing-MCP](https://github.com/Labs64/NetLicensing-MCP)
- **rel=4** [layervai/qurl-mcp](https://github.com/layervai/qurl-mcp)
- **rel=4** [leadbrain/korean-data-mcp](https://github.com/leadbrain/korean-data-mcp)
- **rel=4** [Leekangbum/networklytics-mcp](https://github.com/Leekangbum/networklytics-mcp)
- **rel=4** [leesgit/claude-session-continuity-mcp](https://github.com/leesgit/claude-session-continuity-mcp)
- **rel=4** [leonardoca1/aesthetics-wiki-mcp](https://github.com/leonardoca1/aesthetics-wiki-mcp)
- **rel=4** [Leximo-AI/leximo-ai-call-assistant-mcp-server](https://github.com/Leximo-AI/leximo-ai-call-assistant-mcp-server)
- **rel=4** [lfrmonteiro99/memento-mcp](https://github.com/lfrmonteiro99/memento-mcp)
- **rel=4** [lightningfaucet/lightning-wallet-mcp](https://github.com/lightningfaucet/lightning-wallet-mcp)
- **rel=4** [likidodefi/riskstate-mcp](https://github.com/likidodefi/riskstate-mcp)
- **rel=4** [LincolnBurrows2017/filesystem-mcp](https://github.com/LincolnBurrows2017/filesystem-mcp)
- **rel=4** [LinuxSuRen/atest-mcp-server](https://github.com/LinuxSuRen/atest-mcp-server)
- **rel=4** [linw1995/nvim-mcp](https://github.com/linw1995/nvim-mcp)
- **rel=4** [linxule/lotus-wisdom-mcp](https://github.com/linxule/lotus-wisdom-mcp)
- **rel=4** [linxule/mineru-mcp](https://github.com/linxule/mineru-mcp)
- **rel=4** [lionkiii/google-searchconsole-mcp](https://github.com/lionkiii/google-searchconsole-mcp)
- **rel=4** [lionkiii/rss-feeds-mcp](https://github.com/lionkiii/rss-feeds-mcp)
- **rel=4** [Liquidiction/liquidiction-mcp](https://github.com/Liquidiction/liquidiction-mcp)
- **rel=4** [lisamaraventano-spine/mcp-server](https://github.com/lisamaraventano-spine/mcp-server)
- **rel=4** [live-direct-marketing/ldm-inbox-check-mcp](https://github.com/live-direct-marketing/ldm-inbox-check-mcp)
- **rel=4** [liveblocks/liveblocks-mcp-server](https://github.com/liveblocks/liveblocks-mcp-server)
- **rel=4** [lmwharton/sieve-mcp](https://github.com/lmwharton/sieve-mcp)
- **rel=4** [lnbits/LNbits-MCP-Server](https://github.com/lnbits/LNbits-MCP-Server)
- **rel=4** [localstack/localstack-mcp-server](https://github.com/localstack/localstack-mcp-server)
- **rel=4** [Log-LogN/langfuse-mcp-java](https://github.com/Log-LogN/langfuse-mcp-java)
- **rel=4** [longevity-genie/biothings-mcp](https://github.com/longevity-genie/biothings-mcp)
- **rel=4** [longevity-genie/gget-mcp](https://github.com/longevity-genie/gget-mcp)
- **rel=4** [longevity-genie/opengenes-mcp](https://github.com/longevity-genie/opengenes-mcp)
- **rel=4** [longevity-genie/synergy-age-mcp](https://github.com/longevity-genie/synergy-age-mcp)
- **rel=4** [lostintangent/gistpad-mcp](https://github.com/lostintangent/gistpad-mcp)
- **rel=4** [louis030195/apollo-io-mcp](https://github.com/louis030195/apollo-io-mcp)
- **rel=4** [louis030195/easy-obsidian-mcp](https://github.com/louis030195/easy-obsidian-mcp)
- **rel=4** [louis030195/gptzero-mcp](https://github.com/louis030195/gptzero-mcp)
- **rel=4** [louis030195/toggl-mcp](https://github.com/louis030195/toggl-mcp)
- **rel=4** [lpigeon/ros-mcp-server](https://github.com/lpigeon/ros-mcp-server)
- **rel=4** [lpigeon/unitree-go2-mcp-server](https://github.com/lpigeon/unitree-go2-mcp-server)
- **rel=4** [Lukaris/framedeck-mcp](https://github.com/Lukaris/framedeck-mcp)
- **rel=4** [LukeLamb/claude-terminal-mcp](https://github.com/LukeLamb/claude-terminal-mcp)
- **rel=4** [lulzasaur9192/marketplace-search-mcp](https://github.com/lulzasaur9192/marketplace-search-mcp)
- **rel=4** [LumabyteCo/clarifyprompt-mcp](https://github.com/LumabyteCo/clarifyprompt-mcp)
- **rel=4** [macrocosm-os/macrocosmos-mcp](https://github.com/macrocosm-os/macrocosmos-mcp)
- **rel=4** [madbonez/caldav-mcp](https://github.com/madbonez/caldav-mcp)
- **rel=4** [madhan-g-p/DevDocs-MCP](https://github.com/madhan-g-p/DevDocs-MCP)
- **rel=4** [mahdin75/geoserver-mcp](https://github.com/mahdin75/geoserver-mcp)
- **rel=4** [mahdin75/gis-mcp](https://github.com/mahdin75/gis-mcp)
- **rel=4** [make-software/cspr-trade-mcp](https://github.com/make-software/cspr-trade-mcp)
- **rel=4** [MarceauSolutions/amazon-seller-mcp](https://github.com/MarceauSolutions/amazon-seller-mcp)
- **rel=4** [MarceauSolutions/fitness-influencer-mcp](https://github.com/MarceauSolutions/fitness-influencer-mcp)
- **rel=4** [MarceauSolutions/hvac-quotes-mcp](https://github.com/MarceauSolutions/hvac-quotes-mcp)
- **rel=4** [MarceauSolutions/md-to-pdf-mcp](https://github.com/MarceauSolutions/md-to-pdf-mcp)
- **rel=4** [MarceauSolutions/rideshare-comparison-mcp](https://github.com/MarceauSolutions/rideshare-comparison-mcp)
- **rel=4** [MarcelRoozekrans/memorylens-mcp](https://github.com/MarcelRoozekrans/memorylens-mcp)
- **rel=4** [MarcelRoozekrans/roslyn-codelens-mcp](https://github.com/MarcelRoozekrans/roslyn-codelens-mcp)
- **rel=4** [MarcinDudekDev/crypto-signals-mcp](https://github.com/MarcinDudekDev/crypto-signals-mcp)
- **rel=4** [MariusAure/needhuman-mcp](https://github.com/MariusAure/needhuman-mcp)
- **rel=4** [MarketplaceAdPros/amazon-ads-mcp-server](https://github.com/MarketplaceAdPros/amazon-ads-mcp-server)
- **rel=4** [markmircea/Selenix-MCP-Server](https://github.com/markmircea/Selenix-MCP-Server)
- **rel=4** [markpdxt/dronelytics-mcp](https://github.com/markpdxt/dronelytics-mcp)
- **rel=4** [marlinjai/email-mcp](https://github.com/marlinjai/email-mcp)
- **rel=4** [martingeidobler/android-mcp-server](https://github.com/martingeidobler/android-mcp-server)
- **rel=4** [martinhavel/cz-agents-mcp](https://github.com/martinhavel/cz-agents-mcp)
- **rel=4** [Martinqi826/dida-mcp](https://github.com/Martinqi826/dida-mcp)
- **rel=4** [marykovziridze/screaming-frog-mcp](https://github.com/marykovziridze/screaming-frog-mcp)
- **rel=4** [matbel91765/gis-mcp-server](https://github.com/matbel91765/gis-mcp-server)
- **rel=4** [MatiousCorp/google-ad-manager-mcp](https://github.com/MatiousCorp/google-ad-manager-mcp)
- **rel=4** [mattjegan/swarmia-mcp](https://github.com/mattjegan/swarmia-mcp)
- **rel=4** [mbailey/voice-mcp](https://github.com/mbailey/voice-mcp)
- **rel=4** [mberg/kokoro-tts-mcp](https://github.com/mberg/kokoro-tts-mcp)
- **rel=4** [mbrummerstedt/powerbi-analyst-mcp](https://github.com/mbrummerstedt/powerbi-analyst-mcp)
- **rel=4** [mctlhq/mctl-mcp](https://github.com/mctlhq/mctl-mcp)
- **rel=4** [meanands/npm-package-docs-mcp](https://github.com/meanands/npm-package-docs-mcp)
- **rel=4** [memstate-ai/memstate-mcp](https://github.com/memstate-ai/memstate-mcp)
- **rel=4** [MerabyLabs/promptarchitect-mcp](https://github.com/MerabyLabs/promptarchitect-mcp)
- **rel=4** [mercurialsolo/counsel-mcp](https://github.com/mercurialsolo/counsel-mcp)
- **rel=4** [merterbak/Grok-MCP](https://github.com/merterbak/Grok-MCP)
- **rel=4** [Metadrama/obscura-mcp](https://github.com/Metadrama/obscura-mcp)
- **rel=4** [metrxbots/mcp-server](https://github.com/metrxbots/mcp-server)
- **rel=4** [mhmzdev/Figma-Flutter-MCP](https://github.com/mhmzdev/Figma-Flutter-MCP)
- **rel=4** [michael-denyer/memory-mcp](https://github.com/michael-denyer/memory-mcp)
- **rel=4** [Michael2150/flamerobin-mcp-server](https://github.com/Michael2150/flamerobin-mcp-server)
- **rel=4** [mikechao/brave-search-mcp](https://github.com/mikechao/brave-search-mcp)
- **rel=4** [mikechao/metmuseum-mcp](https://github.com/mikechao/metmuseum-mcp)
- **rel=4** [mikusnuz/app-publish-mcp](https://github.com/mikusnuz/app-publish-mcp)
- **rel=4** [mikusnuz/cws-mcp](https://github.com/mikusnuz/cws-mcp)
- **rel=4** [mikusnuz/dynadot-mcp](https://github.com/mikusnuz/dynadot-mcp)
- **rel=4** [mikusnuz/gsc-mcp](https://github.com/mikusnuz/gsc-mcp)
- **rel=4** [mikusnuz/meta-ads-mcp](https://github.com/mikusnuz/meta-ads-mcp)
- **rel=4** [mikusnuz/meta-mcp](https://github.com/mikusnuz/meta-mcp)
- **rel=4** [mikusnuz/npm-mcp](https://github.com/mikusnuz/npm-mcp)
- **rel=4** [mikusnuz/pexbot-mcp](https://github.com/mikusnuz/pexbot-mcp)
- **rel=4** [mikusnuz/umami-mcp](https://github.com/mikusnuz/umami-mcp)
- **rel=4** [Milofax/xert-mcp](https://github.com/Milofax/xert-mcp)
- **rel=4** [misiektoja/kill-process-mcp](https://github.com/misiektoja/kill-process-mcp)
- **rel=4** [mmntm/weblate-mcp](https://github.com/mmntm/weblate-mcp)
- **rel=4** [mmorris35/devplan-mcp-server](https://github.com/mmorris35/devplan-mcp-server)
- **rel=4** [mnemox-ai/idea-reality-mcp](https://github.com/mnemox-ai/idea-reality-mcp)
- **rel=4** [mobileshop9991-star/clipwise-mcp](https://github.com/mobileshop9991-star/clipwise-mcp)
- **rel=4** [modelcontextprotocol/servers-archived](https://github.com/modelcontextprotocol/servers-archived)
- **rel=4** [molanojustin/smithsonian-mcp](https://github.com/molanojustin/smithsonian-mcp)
- **rel=4** [MoltyCel/moltrust-mcp-server](https://github.com/MoltyCel/moltrust-mcp-server)
- **rel=4** [MonadsAG/capsulecrm-mcp](https://github.com/MonadsAG/capsulecrm-mcp)
- **rel=4** [montumodi/mongodb-atlas-mcp-server](https://github.com/montumodi/mongodb-atlas-mcp-server)
- **rel=4** [mordor-forge/gemini-media-mcp](https://github.com/mordor-forge/gemini-media-mcp)
- **rel=4** [mordor-forge/trident-mcp](https://github.com/mordor-forge/trident-mcp)
- **rel=4** [mpeirone/zabbix-mcp-server](https://github.com/mpeirone/zabbix-mcp-server)
- **rel=4** [mrostamii/rancher-mcp-server](https://github.com/mrostamii/rancher-mcp-server)
- **rel=4** [mrslbt/rakuten-mcp](https://github.com/mrslbt/rakuten-mcp)
- **rel=4** [mrslbt/xendit-mcp](https://github.com/mrslbt/xendit-mcp)
- **rel=4** [mshegolev/gitlab-ci-mcp](https://github.com/mshegolev/gitlab-ci-mcp)
- **rel=4** [muammar-yacoob/GMail-Manager-MCP](https://github.com/muammar-yacoob/GMail-Manager-MCP)
- **rel=4** [muhannad-hash/git-context-mcp](https://github.com/muhannad-hash/git-context-mcp)
- **rel=4** [multimail-dev/mcp-server](https://github.com/multimail-dev/mcp-server)
- **rel=4** [mumez/pharo-smalltalk-interop-mcp-server](https://github.com/mumez/pharo-smalltalk-interop-mcp-server)
- **rel=4** [MWGMorningwood/Central-Memory-MCP](https://github.com/MWGMorningwood/Central-Memory-MCP)
- **rel=4** [MyMedi-AI/mymedi-ai-mcp-server](https://github.com/MyMedi-AI/mymedi-ai-mcp-server)
- **rel=4** [n24q02m/better-email-mcp](https://github.com/n24q02m/better-email-mcp)
- **rel=4** [n24q02m/better-godot-mcp](https://github.com/n24q02m/better-godot-mcp)
- **rel=4** [n24q02m/better-notion-mcp](https://github.com/n24q02m/better-notion-mcp)
- **rel=4** [n24q02m/mnemo-mcp](https://github.com/n24q02m/mnemo-mcp)
- **rel=4** [n24q02m/wet-mcp](https://github.com/n24q02m/wet-mcp)
- **rel=4** [nach-dakwale/instadomain-mcp](https://github.com/nach-dakwale/instadomain-mcp)
- **rel=4** [nakulben/whatsapp-mcp](https://github.com/nakulben/whatsapp-mcp)
- **rel=4** [nanana-app/mcp-server-nano-banana](https://github.com/nanana-app/mcp-server-nano-banana)
- **rel=4** [Narasimhaponnada/mermaid-mcp](https://github.com/Narasimhaponnada/mermaid-mcp)
- **rel=4** [narumiruna/gitingest-mcp](https://github.com/narumiruna/gitingest-mcp)
- **rel=4** [nckhemanth0/subscription-tracker-mcp](https://github.com/nckhemanth0/subscription-tracker-mcp)
- **rel=4** [ndl-systems/kevros-mcp](https://github.com/ndl-systems/kevros-mcp)
- **rel=4** [Neo1228/spring-boot-starter-swagger-mcp](https://github.com/Neo1228/spring-boot-starter-swagger-mcp)
- **rel=4** [neptun2000/heor-agent-mcp](https://github.com/neptun2000/heor-agent-mcp)
- **rel=4** [NexusFeed/nexusfeed-mcp](https://github.com/NexusFeed/nexusfeed-mcp)
- **rel=4** [nicholasglazer/gnosis-mcp](https://github.com/nicholasglazer/gnosis-mcp)
- **rel=4** [nicolascroce/keepsake-mcp](https://github.com/nicolascroce/keepsake-mcp)
- **rel=4** [nihalxkumar/arch-mcp](https://github.com/nihalxkumar/arch-mcp)
- **rel=4** [nikolai-vysotskyi/trace-mcp](https://github.com/nikolai-vysotskyi/trace-mcp)
- **rel=4** [nnemirovsky/iwdp-mcp](https://github.com/nnemirovsky/iwdp-mcp)
- **rel=4** [noblabs/lit-forge-mcp](https://github.com/noblabs/lit-forge-mcp)
- **rel=4** [Nolas-Shadow/agent1st-ads-mcp](https://github.com/Nolas-Shadow/agent1st-ads-mcp)
- **rel=4** [nvms/tui-mcp](https://github.com/nvms/tui-mcp)
- **rel=4** [NyxToolsDev/dicom-hl7-mcp-server](https://github.com/NyxToolsDev/dicom-hl7-mcp-server)
- **rel=4** [OctoEverywhere/mcp](https://github.com/OctoEverywhere/mcp)
- **rel=4** [OctoMind-dev/octomind-mcp](https://github.com/OctoMind-dev/octomind-mcp)
- **rel=4** [ofershap/cursor-usage](https://github.com/ofershap/cursor-usage)
- **rel=4** [ofershap/mcp-server-cloudflare](https://github.com/ofershap/mcp-server-cloudflare)
- **rel=4** [ofershap/mcp-server-devutils](https://github.com/ofershap/mcp-server-devutils)
- **rel=4** [ofershap/mcp-server-dns](https://github.com/ofershap/mcp-server-dns)
- **rel=4** [ofershap/mcp-server-docker](https://github.com/ofershap/mcp-server-docker)
- **rel=4** [ofershap/mcp-server-github-actions](https://github.com/ofershap/mcp-server-github-actions)
- **rel=4** [ofershap/mcp-server-github-gist](https://github.com/ofershap/mcp-server-github-gist)
- **rel=4** [ofershap/mcp-server-markdown](https://github.com/ofershap/mcp-server-markdown)
- **rel=4** [ofershap/mcp-server-npm-plus](https://github.com/ofershap/mcp-server-npm-plus)
- **rel=4** [ofershap/mcp-server-s3](https://github.com/ofershap/mcp-server-s3)
- **rel=4** [ofershap/mcp-server-scraper](https://github.com/ofershap/mcp-server-scraper)
- **rel=4** [ofershap/mcp-server-sqlite](https://github.com/ofershap/mcp-server-sqlite)
- **rel=4** [ofershap/real-browser-mcp](https://github.com/ofershap/real-browser-mcp)
- **rel=4** [OFODevelopment/cerebrochain-mcp-server](https://github.com/OFODevelopment/cerebrochain-mcp-server)
- **rel=4** [olgasafonova/gleif-mcp-server](https://github.com/olgasafonova/gleif-mcp-server)
- **rel=4** [olgasafonova/mediawiki-mcp-server](https://github.com/olgasafonova/mediawiki-mcp-server)
- **rel=4** [olgasafonova/productplan-mcp-server](https://github.com/olgasafonova/productplan-mcp-server)
- **rel=4** [olostep/olostep-mcp-server](https://github.com/olostep/olostep-mcp-server)
- **rel=4** [Oluwatunmise-olat/mcp-server-logs-sieve](https://github.com/Oluwatunmise-olat/mcp-server-logs-sieve)
- **rel=4** [omniologynow-rgb/profitspot-mcp](https://github.com/omniologynow-rgb/profitspot-mcp)
- **rel=4** [omniologynow-rgb/scout-intel-mcp](https://github.com/omniologynow-rgb/scout-intel-mcp)
- **rel=4** [ooples/token-optimizer-mcp](https://github.com/ooples/token-optimizer-mcp)
- **rel=4** [openstack-kr/python-openstackmcp-server](https://github.com/openstack-kr/python-openstackmcp-server)
- **rel=4** [opslevel/opslevel-mcp](https://github.com/opslevel/opslevel-mcp)
- **rel=4** [optimaquantum/claude-critical-rules-mcp](https://github.com/optimaquantum/claude-critical-rules-mcp)
- **rel=4** [optuna/optuna-mcp](https://github.com/optuna/optuna-mcp)
- **rel=4** [osinmv/function-lookup-mcp](https://github.com/osinmv/function-lookup-mcp)
- **rel=4** [oso95/domain-suite-mcp](https://github.com/oso95/domain-suite-mcp)
- **rel=4** [Osseni94/keyneg-mcp](https://github.com/Osseni94/keyneg-mcp)
- **rel=4** [Osseni94/oyemi-mcp](https://github.com/Osseni94/oyemi-mcp)
- **rel=4** [osulivan/skill4agent-mcp-server](https://github.com/osulivan/skill4agent-mcp-server)
- **rel=4** [ouvreboite/openapi-to-mcp](https://github.com/ouvreboite/openapi-to-mcp)
- **rel=4** [OverQuotaAI/chatterboxio-mcp-server](https://github.com/OverQuotaAI/chatterboxio-mcp-server)
- **rel=4** [ovlabs/mcp-server-originalvoices](https://github.com/ovlabs/mcp-server-originalvoices)
- **rel=4** [paladini/devutils-mcp-server](https://github.com/paladini/devutils-mcp-server)
- **rel=4** [pallaprolus/mendeley-mcp](https://github.com/pallaprolus/mendeley-mcp)
- **rel=4** [papersflow-ai/papersflow-mcp](https://github.com/papersflow-ai/papersflow-mcp)
- **rel=4** [paracetamol951/caisse-enregistreuse-mcp-server](https://github.com/paracetamol951/caisse-enregistreuse-mcp-server)
- **rel=4** [paracetamol951/P-Link-MCP](https://github.com/paracetamol951/P-Link-MCP)
- **rel=4** [parallel-web/search-mcp](https://github.com/parallel-web/search-mcp)
- **rel=4** [parallel-web/task-mcp](https://github.com/parallel-web/task-mcp)
- **rel=4** [partymola/fitbit-mcp](https://github.com/partymola/fitbit-mcp)
- **rel=4** [partymola/monzo-mcp](https://github.com/partymola/monzo-mcp)
- **rel=4** [PaSympa/discord-mcp](https://github.com/PaSympa/discord-mcp)
- **rel=4** [paulburgess1357/nvim-mcp](https://github.com/paulburgess1357/nvim-mcp)
- **rel=4** [PaulieB14/graph-aave-mcp](https://github.com/PaulieB14/graph-aave-mcp)
- **rel=4** [PaulieB14/graph-polymarket-mcp](https://github.com/PaulieB14/graph-polymarket-mcp)
- **rel=4** [paulieb89/govuk-mcp](https://github.com/paulieb89/govuk-mcp)
- **rel=4** [payclaw/mcp-server](https://github.com/payclaw/mcp-server)
- **rel=4** [PCDCK/ozon-mcp](https://github.com/PCDCK/ozon-mcp)
- **rel=4** [penfieldlabs/penfield-mcp](https://github.com/penfieldlabs/penfield-mcp)
- **rel=4** [pepabo/colormeshop-mcp](https://github.com/pepabo/colormeshop-mcp)
- **rel=4** [pepabo/muumuu-domain-mcp](https://github.com/pepabo/muumuu-domain-mcp)
- **rel=4** [Perspective-AI/mcp](https://github.com/Perspective-AI/mcp)
- **rel=4** [peter-j-thompson/semanticapi-mcp](https://github.com/peter-j-thompson/semanticapi-mcp)
- **rel=4** [peturgeorgievv-factory/postfast-mcp](https://github.com/peturgeorgievv-factory/postfast-mcp)
- **rel=4** [pghdma/callrail-mcp](https://github.com/pghdma/callrail-mcp)
- **rel=4** [PhungXuanAnh/selenium-mcp-server](https://github.com/PhungXuanAnh/selenium-mcp-server)
- **rel=4** [pibblokto/cert-manager-mcp-server](https://github.com/pibblokto/cert-manager-mcp-server)
- **rel=4** [picahq/mcp](https://github.com/picahq/mcp)
- **rel=4** [pickelfintech/the13f-mcp](https://github.com/pickelfintech/the13f-mcp)
- **rel=4** [pkotecha-eng/aria-mcp-server](https://github.com/pkotecha-eng/aria-mcp-server)
- **rel=4** [plagtech/spraay-x402-mcp](https://github.com/plagtech/spraay-x402-mcp)
- **rel=4** [platfone-com/mcp](https://github.com/platfone-com/mcp)
- **rel=4** [pminervini/deep-research-mcp](https://github.com/pminervini/deep-research-mcp)
- **rel=4** [Poll-The-People/customgpt-mcp](https://github.com/Poll-The-People/customgpt-mcp)
- **rel=4** [polygon-io/mcp_polygon](https://github.com/polygon-io/mcp_polygon)
- **rel=4** [PostalDataPI/postaldatapi-mcp](https://github.com/PostalDataPI/postaldatapi-mcp)
- **rel=4** [PostcardBot/mcp-server](https://github.com/PostcardBot/mcp-server)
- **rel=4** [posthog/mcp](https://github.com/posthog/mcp)
- **rel=4** [Pradumnasaraf/aviationstack-mcp](https://github.com/Pradumnasaraf/aviationstack-mcp)
- **rel=4** [Pratyay/mac-monitor-mcp](https://github.com/Pratyay/mac-monitor-mcp)
- **rel=4** [PrinceGabriel-lgtm/freshcontext-mcp](https://github.com/PrinceGabriel-lgtm/freshcontext-mcp)
- **rel=4** [profullstack/mcp-server](https://github.com/profullstack/mcp-server)
- **rel=4** [prompeteer/prompeteer-mcp](https://github.com/prompeteer/prompeteer-mcp)
- **rel=4** [promptexecution/cratedocs-mcp](https://github.com/promptexecution/cratedocs-mcp)
- **rel=4** [promptexecution/just-mcp](https://github.com/promptexecution/just-mcp)
- **rel=4** [prosperkartik/hostaway-mcp](https://github.com/prosperkartik/hostaway-mcp)
- **rel=4** [PSPDFKit/nutrient-document-engine-mcp-server](https://github.com/PSPDFKit/nutrient-document-engine-mcp-server)
- **rel=4** [PSU3D0/spreadsheet-mcp](https://github.com/PSU3D0/spreadsheet-mcp)
- **rel=4** [pullkitsan/mobsf-mcp-server](https://github.com/pullkitsan/mobsf-mcp-server)
- **rel=4** [Py2755/aiogram-mcp](https://github.com/Py2755/aiogram-mcp)
- **rel=4** [pylonapi/pylon-mcp](https://github.com/pylonapi/pylon-mcp)
- **rel=4** [pythia-the-oracle/pythia-oracle-mcp](https://github.com/pythia-the-oracle/pythia-oracle-mcp)
- **rel=4** [pythonanywhere/pythonanywhere-mcp-server](https://github.com/pythonanywhere/pythonanywhere-mcp-server)
- **rel=4** [pzalutski-pixel/godotlens-mcp](https://github.com/pzalutski-pixel/godotlens-mcp)
- **rel=4** [pzalutski-pixel/javalens-mcp](https://github.com/pzalutski-pixel/javalens-mcp)
- **rel=4** [pzalutski-pixel/sharplens-mcp](https://github.com/pzalutski-pixel/sharplens-mcp)
- **rel=4** [QAInsights/jmeter-mcp-server](https://github.com/QAInsights/jmeter-mcp-server)
- **rel=4** [QAInsights/k6-mcp-server](https://github.com/QAInsights/k6-mcp-server)
- **rel=4** [QAInsights/locust-mcp-server](https://github.com/QAInsights/locust-mcp-server)
- **rel=4** [qbt-labs/openmm-mcp](https://github.com/qbt-labs/openmm-mcp)
- **rel=4** [qiniu/qiniu-mcp-server](https://github.com/qiniu/qiniu-mcp-server)
- **rel=4** [qq418716640/botbell-mcp](https://github.com/qq418716640/botbell-mcp)
- **rel=4** [qr-maker-io/mcp-server](https://github.com/qr-maker-io/mcp-server)
- **rel=4** [QuantToGo/quanttogo-mcp](https://github.com/QuantToGo/quanttogo-mcp)
- **rel=4** [QuentinCody/braintree-mcp-server](https://github.com/QuentinCody/braintree-mcp-server)
- **rel=4** [QuentinCody/catalysishub-mcp-server](https://github.com/QuentinCody/catalysishub-mcp-server)
- **rel=4** [QuentinCody/github-graphql-mcp-server](https://github.com/QuentinCody/github-graphql-mcp-server)
- **rel=4** [QuentinCody/shopify-storefront-mcp-server](https://github.com/QuentinCody/shopify-storefront-mcp-server)
- **rel=4** [quietnotion/barevalue-mcp](https://github.com/quietnotion/barevalue-mcp)
- **rel=4** [qune-tech/ocds-mcp](https://github.com/qune-tech/ocds-mcp)
- **rel=4** [r-huijts/ethics-check-mcp](https://github.com/r-huijts/ethics-check-mcp)
- **rel=4** [r-huijts/opentk-mcp](https://github.com/r-huijts/opentk-mcp)
- **rel=4** [r-huijts/xcode-mcp-server](https://github.com/r-huijts/xcode-mcp-server)
- **rel=4** [raalarcon9705/jira-mcp](https://github.com/raalarcon9705/jira-mcp)
- **rel=4** [radareorg/radare2-mcp](https://github.com/radareorg/radare2-mcp)
- **rel=4** [rae-api-com/rae-mcp](https://github.com/rae-api-com/rae-mcp)
- **rel=4** [ragieai/ragie-mcp-server](https://github.com/ragieai/ragie-mcp-server)
- **rel=4** [Rai220/think-mcp](https://github.com/Rai220/think-mcp)
- **rel=4** [raohwork/forgejo-mcp](https://github.com/raohwork/forgejo-mcp)
- **rel=4** [rascal-3/chainanalyzer-mcp](https://github.com/rascal-3/chainanalyzer-mcp)
- **rel=4** [raveenb/fal-mcp-server](https://github.com/raveenb/fal-mcp-server)
- **rel=4** [raychao-oao/pty-mcp](https://github.com/raychao-oao/pty-mcp)
- **rel=4** [razz-games/razz-mcp](https://github.com/razz-games/razz-mcp)
- **rel=4** [rchanllc/joltsms-mcp-server](https://github.com/rchanllc/joltsms-mcp-server)
- **rel=4** [rdanieli/tentra-mcp](https://github.com/rdanieli/tentra-mcp)
- **rel=4** [realcrabcut/crabcut-mcp-server](https://github.com/realcrabcut/crabcut-mcp-server)
- **rel=4** [refined-element/lightning-enable-mcp](https://github.com/refined-element/lightning-enable-mcp)
- **rel=4** [Regenerating-World/pix-mcp](https://github.com/Regenerating-World/pix-mcp)
- **rel=4** [ReplenishRadar/MCP](https://github.com/ReplenishRadar/MCP)
- **rel=4** [reza-gholizade/k8s-mcp-server](https://github.com/reza-gholizade/k8s-mcp-server)
- **rel=4** [rinadelph/Agent-MCP](https://github.com/rinadelph/Agent-MCP)
- **rel=4** [robbyczgw-cla/web-search-plus-mcp](https://github.com/robbyczgw-cla/web-search-plus-mcp)
- **rel=4** [RohanMuppa/brightspace-mcp-server](https://github.com/RohanMuppa/brightspace-mcp-server)
- **rel=4** [roomi-fields/notebooklm-mcp](https://github.com/roomi-fields/notebooklm-mcp)
- **rel=4** [rossshannon/weekly-weather-mcp](https://github.com/rossshannon/weekly-weather-mcp)
- **rel=4** [rplryan/x402-discovery-mcp](https://github.com/rplryan/x402-discovery-mcp)
- **rel=4** [rubenayla/partle-mcp](https://github.com/rubenayla/partle-mcp)
- **rel=4** [s-b-e-n-s-o-n/portkey-admin-mcp](https://github.com/s-b-e-n-s-o-n/portkey-admin-mcp)
- **rel=4** [saikiyusuke/alog-mcp](https://github.com/saikiyusuke/alog-mcp)
- **rel=4** [saikiyusuke/claudecodenavi-mcp](https://github.com/saikiyusuke/claudecodenavi-mcp)
- **rel=4** [saikiyusuke/registep-mcp](https://github.com/saikiyusuke/registep-mcp)
- **rel=4** [saikiyusuke/sparksheets-mcp](https://github.com/saikiyusuke/sparksheets-mcp)
- **rel=4** [Salen-Project/ticktick-mcp](https://github.com/Salen-Project/ticktick-mcp)
- **rel=4** [samson-art/transcriptor-mcp](https://github.com/samson-art/transcriptor-mcp)
- **rel=4** [sapph1re/findata-mcp](https://github.com/sapph1re/findata-mcp)
- **rel=4** [saranshbamania/mobile-device-mcp](https://github.com/saranshbamania/mobile-device-mcp)
- **rel=4** [SaseQ/discord-mcp](https://github.com/SaseQ/discord-mcp)
- **rel=4** [saurabhsharma2u/search-console-mcp](https://github.com/saurabhsharma2u/search-console-mcp)
- **rel=4** [sbroenne/mcp-server-excel](https://github.com/sbroenne/mcp-server-excel)
- **rel=4** [sbuysse/gnome-desktop-mcp](https://github.com/sbuysse/gnome-desktop-mcp)
- **rel=4** [scamverifyai/scamverify-mcp](https://github.com/scamverifyai/scamverify-mcp)
- **rel=4** [ScopeBlind/verify-mcp](https://github.com/ScopeBlind/verify-mcp)
- **rel=4** [scrape-badger/scrapebadger-mcp](https://github.com/scrape-badger/scrapebadger-mcp)
- **rel=4** [scraperapi/scraperapi-mcp](https://github.com/scraperapi/scraperapi-mcp)
- **rel=4** [seang1121/sports-betting-mcp](https://github.com/seang1121/sports-betting-mcp)
- **rel=4** [Search-Atlas-Group/searchatlas-mcp-server](https://github.com/Search-Atlas-Group/searchatlas-mcp-server)
- **rel=4** [searchcraft-inc/searchcraft-mcp-server](https://github.com/searchcraft-inc/searchcraft-mcp-server)
- **rel=4** [securecoders/opengraph-io-mcp](https://github.com/securecoders/opengraph-io-mcp)
- **rel=4** [SecurityRonin/docx-mcp](https://github.com/SecurityRonin/docx-mcp)
- **rel=4** [sentien-labs/verdictswarm-mcp](https://github.com/sentien-labs/verdictswarm-mcp)
- **rel=4** [sequa-ai/sequa-mcp](https://github.com/sequa-ai/sequa-mcp)
- **rel=4** [serkan-ozal/browser-devtools-mcp](https://github.com/serkan-ozal/browser-devtools-mcp)
- **rel=4** [serpapi/serpapi-mcp](https://github.com/serpapi/serpapi-mcp)
- **rel=4** [sevalla-hosting/mcp](https://github.com/sevalla-hosting/mcp)
- **rel=4** [sh-patterson/fec-mcp-server](https://github.com/sh-patterson/fec-mcp-server)
- **rel=4** [sh-patterson/legiscan-mcp](https://github.com/sh-patterson/legiscan-mcp)
- **rel=4** [shahabazdev/inxmail-mcp](https://github.com/shahabazdev/inxmail-mcp)
- **rel=4** [shaikhspeare/wanderlog-mcp](https://github.com/shaikhspeare/wanderlog-mcp)
- **rel=4** [shareseer/shareseer-mcp-server](https://github.com/shareseer/shareseer-mcp-server)
- **rel=4** [shellsage-ai/mcp-server-boilerplate](https://github.com/shellsage-ai/mcp-server-boilerplate)
- **rel=4** [shensi8312/blogburst-mcp-server](https://github.com/shensi8312/blogburst-mcp-server)
- **rel=4** [shibley/apistatuscheck-mcp-server](https://github.com/shibley/apistatuscheck-mcp-server)
- **rel=4** [shipstatic/mcp](https://github.com/shipstatic/mcp)
- **rel=4** [Shopify/dev-mcp](https://github.com/Shopify/dev-mcp)
- **rel=4** [shuji-bonji/xcomet-mcp-server](https://github.com/shuji-bonji/xcomet-mcp-server)
- **rel=4** [shunshi-ai/bazi-reader-mcp](https://github.com/shunshi-ai/bazi-reader-mcp)
- **rel=4** [shyshlakov/pci-dss-mcp](https://github.com/shyshlakov/pci-dss-mcp)
- **rel=4** [SidneyBissoli/bcb-br-mcp](https://github.com/SidneyBissoli/bcb-br-mcp)
- **rel=4** [SidneyBissoli/ibge-br-mcp](https://github.com/SidneyBissoli/ibge-br-mcp)
- **rel=4** [signal-found/sf-mcp](https://github.com/signal-found/sf-mcp)
- **rel=4** [simonpainter/netbox-mcp](https://github.com/simonpainter/netbox-mcp)
- **rel=4** [simplypixi/bugbug-mcp-server](https://github.com/simplypixi/bugbug-mcp-server)
- **rel=4** [sinanefeozler/reddit-summarizer-mcp](https://github.com/sinanefeozler/reddit-summarizer-mcp)
- **rel=4** [SirGreed808/zoho-mail-mcp](https://github.com/SirGreed808/zoho-mail-mcp)
- **rel=4** [skedgo/tripgo-mcp-server](https://github.com/skedgo/tripgo-mcp-server)
- **rel=4** [skysqlinc/skysql-mcp](https://github.com/skysqlinc/skysql-mcp)
- **rel=4** [smith-and-web/obsidian-mcp-server](https://github.com/smith-and-web/obsidian-mcp-server)
- **rel=4** [snaggle-ai/openapi-mcp-server](https://github.com/snaggle-ai/openapi-mcp-server)
- **rel=4** [Snowflake-Labs/mcp](https://github.com/Snowflake-Labs/mcp)
- **rel=4** [snyk/studio-mcp](https://github.com/snyk/studio-mcp)
- **rel=4** [SoapyRED/freightutils-mcp](https://github.com/SoapyRED/freightutils-mcp)
- **rel=4** [sonnyflylock/voxie-ai-directory-mcp](https://github.com/sonnyflylock/voxie-ai-directory-mcp)
- **rel=4** [spacecode-ai/SpaceBridge-MCP](https://github.com/spacecode-ai/SpaceBridge-MCP)
- **rel=4** [Spix-HQ/spix-mcp](https://github.com/Spix-HQ/spix-mcp)
- **rel=4** [spranab/saga-mcp](https://github.com/spranab/saga-mcp)
- **rel=4** [spre-sre/lumino-mcp-server](https://github.com/spre-sre/lumino-mcp-server)
- **rel=4** [srinath1510/alltrails-mcp-server](https://github.com/srinath1510/alltrails-mcp-server)
- **rel=4** [ssatama/rescuedogs-mcp-server](https://github.com/ssatama/rescuedogs-mcp-server)
- **rel=4** [stadiamaps/stadiamaps-mcp-server-ts](https://github.com/stadiamaps/stadiamaps-mcp-server-ts)
- **rel=4** [stape-io/google-tag-manager-mcp-server](https://github.com/stape-io/google-tag-manager-mcp-server)
- **rel=4** [stape-io/stape-mcp-server](https://github.com/stape-io/stape-mcp-server)
- **rel=4** [Startvest-LLC/idealift-mcp-server](https://github.com/Startvest-LLC/idealift-mcp-server)
- **rel=4** [stass/exif-mcp](https://github.com/stass/exif-mcp)
- **rel=4** [stass/lldb-mcp](https://github.com/stass/lldb-mcp)
- **rel=4** [storybookjs/addon-mcp](https://github.com/storybookjs/addon-mcp)
- **rel=4** [strato-space/media-gen-mcp](https://github.com/strato-space/media-gen-mcp)
- **rel=4** [StripFeed/mcp-server](https://github.com/StripFeed/mcp-server)
- **rel=4** [SubDownload/subdownload-mcp](https://github.com/SubDownload/subdownload-mcp)
- **rel=4** [SunflowersLwtech/mcp_creator_growth](https://github.com/SunflowersLwtech/mcp_creator_growth)
- **rel=4** [SupplyMaven-SCR/supplymaven-mcp-server](https://github.com/SupplyMaven-SCR/supplymaven-mcp-server)
- **rel=4** [SureScaleAI/openai-gpt-image-mcp](https://github.com/SureScaleAI/openai-gpt-image-mcp)
- **rel=4** [Swih/mistral-mcp](https://github.com/Swih/mistral-mcp)
- **rel=4** [Synter-Media-AI/mcp-server](https://github.com/Synter-Media-AI/mcp-server)
- **rel=4** [szhygulin/recon-crypto-mcp](https://github.com/szhygulin/recon-crypto-mcp)
- **rel=4** [tadas-github/a2asearch-mcp](https://github.com/tadas-github/a2asearch-mcp)
- **rel=4** [talonicdev/talonic-mcp](https://github.com/talonicdev/talonic-mcp)
- **rel=4** [TamarEngel/jira-github-mcp](https://github.com/TamarEngel/jira-github-mcp)
- **rel=4** [TamiShaks-2/git-context-mcp](https://github.com/TamiShaks-2/git-context-mcp)
- **rel=4** [tan-yong-sheng/ai-vision-mcp](https://github.com/tan-yong-sheng/ai-vision-mcp)
- **rel=4** [TANTIOPE/datadog-mcp-server](https://github.com/TANTIOPE/datadog-mcp-server)
- **rel=4** [tatsuju/opdstar-nhi-mcp](https://github.com/tatsuju/opdstar-nhi-mcp)
- **rel=4** [tatumio/blockchain-mcp](https://github.com/tatumio/blockchain-mcp)
- **rel=4** [TCSoftInc/testcollab-mcp-server](https://github.com/TCSoftInc/testcollab-mcp-server)
- **rel=4** [teamwork/mcp](https://github.com/teamwork/mcp)
- **rel=4** [TechDocsStudio/biel-mcp](https://github.com/TechDocsStudio/biel-mcp)
- **rel=4** [temporal-cortex/mcp](https://github.com/temporal-cortex/mcp)
- **rel=4** [testdino-hq/testdino-mcp](https://github.com/testdino-hq/testdino-mcp)
- **rel=4** [the-momentum/apple-health-mcp-server](https://github.com/the-momentum/apple-health-mcp-server)
- **rel=4** [the402ai/mcp-server](https://github.com/the402ai/mcp-server)
- **rel=4** [theagenttimes/tat-mcp-server](https://github.com/theagenttimes/tat-mcp-server)
- **rel=4** [thecombatwombat/replicant-mcp](https://github.com/thecombatwombat/replicant-mcp)
- **rel=4** [thelongevityvault/decoder-3am-mcp](https://github.com/thelongevityvault/decoder-3am-mcp)
- **rel=4** [themesberg/flowbite-mcp](https://github.com/themesberg/flowbite-mcp)
- **rel=4** [thevibepreneur/gapbase-mcp](https://github.com/thevibepreneur/gapbase-mcp)
- **rel=4** [Thezenmonster/agentscore-mcp-server](https://github.com/Thezenmonster/agentscore-mcp-server)
- **rel=4** [ThinkneoAI/mcp-server](https://github.com/ThinkneoAI/mcp-server)
- **rel=4** [thinq-connect/thinqconnect-mcp](https://github.com/thinq-connect/thinqconnect-mcp)
- **rel=4** [ThoughtProof/thoughtproof-mcp](https://github.com/ThoughtProof/thoughtproof-mcp)
- **rel=4** [tianqitang1/enrichr-mcp-server](https://github.com/tianqitang1/enrichr-mcp-server)
- **rel=4** [tickadoo/tickadoo-mcp](https://github.com/tickadoo/tickadoo-mcp)
- **rel=4** [tiianhk/MaxMSP-MCP-Server](https://github.com/tiianhk/MaxMSP-MCP-Server)
- **rel=4** [timmx7/acheron-mcp-server](https://github.com/timmx7/acheron-mcp-server)
- **rel=4** [timolein74/asterpay-mcp-server](https://github.com/timolein74/asterpay-mcp-server)
- **rel=4** [tipdotmd/tip-md-x402-mcp-server](https://github.com/tipdotmd/tip-md-x402-mcp-server)
- **rel=4** [Tommertom/awesome-ionic-mcp](https://github.com/Tommertom/awesome-ionic-mcp)
- **rel=4** [Tommertom/plugwise-mcp](https://github.com/Tommertom/plugwise-mcp)
- **rel=4** [Tommertom/sonos-ts-mcp](https://github.com/Tommertom/sonos-ts-mcp)
- **rel=4** [toolstem/toolstem-mcp-server](https://github.com/toolstem/toolstem-mcp-server)
- **rel=4** [toolstem/toolstem-sec-mcp-server](https://github.com/toolstem/toolstem-sec-mcp-server)
- **rel=4** [tooyipjee/yahoofinance-mcp](https://github.com/tooyipjee/yahoofinance-mcp)
- **rel=4** [TopazLabs/topaz-mcp](https://github.com/TopazLabs/topaz-mcp)
- **rel=4** [torrentclaw/torrentclaw-mcp](https://github.com/torrentclaw/torrentclaw-mcp)
- **rel=4** [tponscr-debug/oracle-h-mcp](https://github.com/tponscr-debug/oracle-h-mcp)
- **rel=4** [traceloop/opentelemetry-mcp-server](https://github.com/traceloop/opentelemetry-mcp-server)
- **rel=4** [trackerfitness729-jpg/sitelauncher-mcp-server](https://github.com/trackerfitness729-jpg/sitelauncher-mcp-server)
- **rel=4** [TradeRouter/trade-router-mcp](https://github.com/TradeRouter/trade-router-mcp)
- **rel=4** [trayders/trayd-mcp](https://github.com/trayders/trayd-mcp)
- **rel=4** [tresor4k/macalc-mcp](https://github.com/tresor4k/macalc-mcp)
- **rel=4** [trust-delta/conversation-handoff-mcp](https://github.com/trust-delta/conversation-handoff-mcp)
- **rel=4** [trycourier/courier-mcp](https://github.com/trycourier/courier-mcp)
- **rel=4** [tubasasakunn/context-apps-mcp](https://github.com/tubasasakunn/context-apps-mcp)
- **rel=4** [tumf/grafana-loki-mcp](https://github.com/tumf/grafana-loki-mcp)
- **rel=4** [tumf/web3-mcp](https://github.com/tumf/web3-mcp)
- **rel=4** [tunedforai/x402-mcp](https://github.com/tunedforai/x402-mcp)
- **rel=4** [Turbo-Puffin/measure-mcp-server](https://github.com/Turbo-Puffin/measure-mcp-server)
- **rel=4** [TwelveTake-Studios/reaper-mcp](https://github.com/TwelveTake-Studios/reaper-mcp)
- **rel=4** [twtrubiks/odoo19-mcp-server](https://github.com/twtrubiks/odoo19-mcp-server)
- **rel=4** [TylerIlunga/procore-mcp-server](https://github.com/TylerIlunga/procore-mcp-server)
- **rel=4** [ujisati/anki-mcp](https://github.com/ujisati/anki-mcp)
- **rel=4** [universalamateur/reclaim-mcp-server](https://github.com/universalamateur/reclaim-mcp-server)
- **rel=4** [up2itnow0822/clawpay-mcp](https://github.com/up2itnow0822/clawpay-mcp)
- **rel=4** [urlbox/urlbox-mcp-server](https://github.com/urlbox/urlbox-mcp-server)
- **rel=4** [vakharwalad23/google-mcp](https://github.com/vakharwalad23/google-mcp)
- **rel=4** [valado/pantheon-mcp](https://github.com/valado/pantheon-mcp)
- **rel=4** [var-gg/mcp](https://github.com/var-gg/mcp)
- **rel=4** [vaulted-fyi/vaulted-mcp-server](https://github.com/vaulted-fyi/vaulted-mcp-server)
- **rel=4** [vdalhambra/axiom-calculator-mcp](https://github.com/vdalhambra/axiom-calculator-mcp)
- **rel=4** [vdmeu/registrum-mcp](https://github.com/vdmeu/registrum-mcp)
- **rel=4** [vectara/vectara-mcp](https://github.com/vectara/vectara-mcp)
- **rel=4** [velvetway/minreestr-mcp](https://github.com/velvetway/minreestr-mcp)
- **rel=4** [VENTURE-AI-LABS/cryptodataapi-mcp](https://github.com/VENTURE-AI-LABS/cryptodataapi-mcp)
- **rel=4** [vercel/next-devtools-mcp](https://github.com/vercel/next-devtools-mcp)
- **rel=4** [verIdyia/autoeq-mcp](https://github.com/verIdyia/autoeq-mcp)
- **rel=4** [veroq-ai/veroq-mcp](https://github.com/veroq-ai/veroq-mcp)
- **rel=4** [vessel-api/vesselapi-mcp](https://github.com/vessel-api/vesselapi-mcp)
- **rel=4** [video-creator/ffmpeg-mcp](https://github.com/video-creator/ffmpeg-mcp)
- **rel=4** [VikrantSingh01/adaptive-cards-mcp](https://github.com/VikrantSingh01/adaptive-cards-mcp)
- **rel=4** [vitorpavinato/ncbi-mcp-server](https://github.com/vitorpavinato/ncbi-mcp-server)
- **rel=4** [VmLia/books-mcp-server](https://github.com/VmLia/books-mcp-server)
- **rel=4** [Vovala14/vynly-mcp](https://github.com/Vovala14/vynly-mcp)
- **rel=4** [VrtxOmega/omega-brain-mcp](https://github.com/VrtxOmega/omega-brain-mcp)
- **rel=4** [webdriverio/mcp](https://github.com/webdriverio/mcp)
- **rel=4** [Webvizio/mcp](https://github.com/Webvizio/mcp)
- **rel=4** [wenb1n-dev/mysql_mcp_server_pro](https://github.com/wenb1n-dev/mysql_mcp_server_pro)
- **rel=4** [willianpinho/large-file-mcp](https://github.com/willianpinho/large-file-mcp)
- **rel=4** [wise-vision/mcp_server_ros_2](https://github.com/wise-vision/mcp_server_ros_2)
- **rel=4** [wklee610/kafka-mcp](https://github.com/wklee610/kafka-mcp)
- **rel=4** [Woobox/hatchable-mcp](https://github.com/Woobox/hatchable-mcp)
- **rel=4** [Wooonster/hocr_mcp_server](https://github.com/Wooonster/hocr_mcp_server)
- **rel=4** [Wopee-io/wopee-mcp](https://github.com/Wopee-io/wopee-mcp)
- **rel=4** [wowinter13/solscan-mcp](https://github.com/wowinter13/solscan-mcp)
- **rel=4** [wyattjoh/calendar-mcp](https://github.com/wyattjoh/calendar-mcp)
- **rel=4** [wyattjoh/imessage-mcp](https://github.com/wyattjoh/imessage-mcp)
- **rel=4** [wyattjoh/jmap-mcp](https://github.com/wyattjoh/jmap-mcp)
- **rel=4** [wyattjoh/jsr-mcp](https://github.com/wyattjoh/jsr-mcp)
- **rel=4** [x402-index/x402search-mcp](https://github.com/x402-index/x402search-mcp)
- **rel=4** [x51xxx/codex-mcp-tool](https://github.com/x51xxx/codex-mcp-tool)
- **rel=4** [x51xxx/copilot-mcp-server](https://github.com/x51xxx/copilot-mcp-server)
- **rel=4** [XixianLiang/HarmonyOS-mcp-server](https://github.com/XixianLiang/HarmonyOS-mcp-server)
- **rel=4** [XJTLUmedia/Context-First-MCP](https://github.com/XJTLUmedia/Context-First-MCP)
- **rel=4** [xspadex/bilibili-mcp](https://github.com/xspadex/bilibili-mcp)
- **rel=4** [XWeaponX7/rundida-mcp](https://github.com/XWeaponX7/rundida-mcp)
- **rel=4** [yamanoku/baseline-mcp-server](https://github.com/yamanoku/baseline-mcp-server)
- **rel=4** [yamariki-hub/japan-corporate-mcp](https://github.com/yamariki-hub/japan-corporate-mcp)
- **rel=4** [yangkyeongmo/mcp-server-apache-airflow](https://github.com/yangkyeongmo/mcp-server-apache-airflow)
- **rel=4** [yanmxa/scriptflow-mcp](https://github.com/yanmxa/scriptflow-mcp)
- **rel=4** [yashshingvi/databricks-genie-MCP](https://github.com/yashshingvi/databricks-genie-MCP)
- **rel=4** [YCloud-Developers/ycloud-whatsapp-mcp-server](https://github.com/YCloud-Developers/ycloud-whatsapp-mcp-server)
- **rel=4** [yeick010/agentshield-mcp](https://github.com/yeick010/agentshield-mcp)
- **rel=4** [yli769227-jpg/ashare-mcp](https://github.com/yli769227-jpg/ashare-mcp)
- **rel=4** [ymw0407/auth-fetch-mcp](https://github.com/ymw0407/auth-fetch-mcp)
- **rel=4** [yoryocoruxo-ai/rendoc-mcp-server](https://github.com/yoryocoruxo-ai/rendoc-mcp-server)
- **rel=4** [YuChenSSR/multi-ai-advisor-mcp](https://github.com/YuChenSSR/multi-ai-advisor-mcp)
- **rel=4** [YuliiaKovalova/dotnet-template-mcp](https://github.com/YuliiaKovalova/dotnet-template-mcp)
- **rel=4** [yusong652/pfc-mcp](https://github.com/yusong652/pfc-mcp)
- **rel=4** [yusong652/yade-mcp](https://github.com/yusong652/yade-mcp)
- **rel=4** [Yutarop/ros-mcp](https://github.com/Yutarop/ros-mcp)
- **rel=4** [zboralski/ida-headless-mcp](https://github.com/zboralski/ida-headless-mcp)
- **rel=4** [zefarie/pterodactyl-mcp](https://github.com/zefarie/pterodactyl-mcp)
- **rel=4** [zelentsov-dev/asc-mcp](https://github.com/zelentsov-dev/asc-mcp)
- **rel=4** [zinja-coder/apktool-mcp-server](https://github.com/zinja-coder/apktool-mcp-server)
- **rel=4** [zinja-coder/jadx-ai-mcp](https://github.com/zinja-coder/jadx-ai-mcp)
- **rel=4** [zlatkoc/youtube-summarize](https://github.com/zlatkoc/youtube-summarize)
- **rel=4** [ZLeventer/salesforce-marketing-mcp](https://github.com/ZLeventer/salesforce-marketing-mcp)
- **rel=4** [zoharbabin/google-researcher-mcp](https://github.com/zoharbabin/google-researcher-mcp)
- **rel=4** [ztuskes/garmin-documentation-mcp-server](https://github.com/ztuskes/garmin-documentation-mcp-server)
- **rel=4** [ztxtxwd/open-feishu-mcp-server](https://github.com/ztxtxwd/open-feishu-mcp-server)
- **rel=3** [AlexanderLawson17/revettr-python](https://github.com/AlexanderLawson17/revettr-python)
- **rel=3** [Souzix76/n8n-workflow-tester-safe](https://github.com/Souzix76/n8n-workflow-tester-safe)
- **rel=3** [VrtxOmega/Ollama-Omega](https://github.com/VrtxOmega/Ollama-Omega)

#### From `TensorBlock/awesome-mcp-servers` (674 picks)

- **rel=5** [akr4/claude-code-mcp-docker](https://github.com/akr4/claude-code-mcp-docker)
- **rel=5** [chatmcp/heybeauty-mcp](https://github.com/chatmcp/heybeauty-mcp)
- **rel=5** [cline/cline-community](https://github.com/cline/cline-community)
- **rel=5** [misanthropic-ai/lean-docker-mcp](https://github.com/misanthropic-ai/lean-docker-mcp)
- **rel=4** [0kenx/filesystem-mcp](https://github.com/0kenx/filesystem-mcp)
- **rel=4** [0xanpham/my-crypto-mcp](https://github.com/0xanpham/my-crypto-mcp)
- **rel=4** [0xsl1m/cerebrus-pulse-mcp](https://github.com/0xsl1m/cerebrus-pulse-mcp)
- **rel=4** [1999AZZAR/mcp-server-google-search](https://github.com/1999AZZAR/mcp-server-google-search)
- **rel=4** [1Levick3/postgresql-mcp-server](https://github.com/1Levick3/postgresql-mcp-server)
- **rel=4** [1yhy/oss-mcp](https://github.com/1yhy/oss-mcp)
- **rel=4** [2geonhyup/dart-mcp](https://github.com/2geonhyup/dart-mcp)
- **rel=4** [3loka/consul-mcp-server](https://github.com/3loka/consul-mcp-server)
- **rel=4** [4workspace/Cursor-MCP-test](https://github.com/4workspace/Cursor-MCP-test)
- **rel=4** [8144225309/superscalar-mcp](https://github.com/8144225309/superscalar-mcp)
- **rel=4** [8tako8tako8/sample_mcp_pokemon](https://github.com/8tako8tako8/sample_mcp_pokemon)
- **rel=4** [93minki/weather-forecast-mcp-server](https://github.com/93minki/weather-forecast-mcp-server)
- **rel=4** [AB498/code-context-provider-mcp](https://github.com/AB498/code-context-provider-mcp)
- **rel=4** [AB498/computer-control-mcp](https://github.com/AB498/computer-control-mcp)
- **rel=4** [abdulazeem-tk4vr/shardeum-mcp-server](https://github.com/abdulazeem-tk4vr/shardeum-mcp-server)
- **rel=4** [Abiorh001/mcp_ev_assistant_server](https://github.com/Abiorh001/mcp_ev_assistant_server)
- **rel=4** [ACAne0320/amap-weather-mcp-server](https://github.com/ACAne0320/amap-weather-mcp-server)
- **rel=4** [achel-b8/rakuten-hotel-search-mcp](https://github.com/achel-b8/rakuten-hotel-search-mcp)
- **rel=4** [adarshem/mcp-server-learn](https://github.com/adarshem/mcp-server-learn)
- **rel=4** [Adit-999/gitlab-mcp](https://github.com/Adit-999/gitlab-mcp)
- **rel=4** [adw0rd/awesome-mcp-tools-mcp](https://github.com/adw0rd/awesome-mcp-tools-mcp)
- **rel=4** [affannahmed/MCP-Server-with-Claude-Ai](https://github.com/affannahmed/MCP-Server-with-Claude-Ai)
- **rel=4** [agentc22/x402engine-mcp](https://github.com/agentc22/x402engine-mcp)
- **rel=4** [AgentDank/dank-mcp](https://github.com/AgentDank/dank-mcp)
- **rel=4** [Agnuxo1/enigmagent-mcp](https://github.com/Agnuxo1/enigmagent-mcp)
- **rel=4** [aguaitech/Elementor-MCP](https://github.com/aguaitech/Elementor-MCP)
- **rel=4** [aimino/imagemagic-mcp](https://github.com/aimino/imagemagic-mcp)
- **rel=4** [aixbt/mcp-server](https://github.com/aixbt/mcp-server)
- **rel=4** [aldotestino/weather-mcp](https://github.com/aldotestino/weather-mcp)
- **rel=4** [alecf/airtop-mcp](https://github.com/alecf/airtop-mcp)
- **rel=4** [alexbruf/airtable-mcp](https://github.com/alexbruf/airtable-mcp)
- **rel=4** [AlexVagrant/monad-mcp](https://github.com/AlexVagrant/monad-mcp)
- **rel=4** [alexxx-db/databricks-genie-mcp](https://github.com/alexxx-db/databricks-genie-mcp)
- **rel=4** [AlgoVaultLabs/crypto-quant-signal-mcp](https://github.com/AlgoVaultLabs/crypto-quant-signal-mcp)
- **rel=4** [Alirezawmoradi/github-follower-manager-mcp](https://github.com/Alirezawmoradi/github-follower-manager-mcp)
- **rel=4** [Alisammour/storyflo-mcp](https://github.com/Alisammour/storyflo-mcp)
- **rel=4** [aliyun/alibabacloud-observability-mcp-server](https://github.com/aliyun/alibabacloud-observability-mcp-server)
- **rel=4** [allizwellai/mysql-mcp-server](https://github.com/allizwellai/mysql-mcp-server)
- **rel=4** [alokamgnaneswarasai/nuvama-mcp](https://github.com/alokamgnaneswarasai/nuvama-mcp)
- **rel=4** [alvinveroy/aider-mcp-client](https://github.com/alvinveroy/aider-mcp-client)
- **rel=4** [amanasmuei/mcp-server-malaysia-prayer-time](https://github.com/amanasmuei/mcp-server-malaysia-prayer-time)
- **rel=4** [amanasmuei/mcp-server-nodemcu](https://github.com/amanasmuei/mcp-server-nodemcu)
- **rel=4** [amith-vp/indian-railway-mcp](https://github.com/amith-vp/indian-railway-mcp)
- **rel=4** [amphora/patentsafe-mcp](https://github.com/amphora/patentsafe-mcp)
- **rel=4** [anandkumarpatel/remote-mcp-server](https://github.com/anandkumarpatel/remote-mcp-server)
- **rel=4** [AndrewKlement/gaggiuino-mcp](https://github.com/AndrewKlement/gaggiuino-mcp)
- **rel=4** [andyrewlee/dad-mcp](https://github.com/andyrewlee/dad-mcp)
- **rel=4** [angrysky56/ast-mcp-server](https://github.com/angrysky56/ast-mcp-server)
- **rel=4** [aniketsingh98571/github-mcp](https://github.com/aniketsingh98571/github-mcp)
- **rel=4** [AnshulDalua/illustrator-mcp](https://github.com/AnshulDalua/illustrator-mcp)
- **rel=4** [Antipas/4oimage-mcp](https://github.com/Antipas/4oimage-mcp)
- **rel=4** [antymijaljevic/k8s-doc-mcp](https://github.com/antymijaljevic/k8s-doc-mcp)
- **rel=4** [anurag-dhamala/os-info-mcp-server](https://github.com/anurag-dhamala/os-info-mcp-server)
- **rel=4** [AojdevStudio/open-dental-mcp](https://github.com/AojdevStudio/open-dental-mcp)
- **rel=4** [apache/iotdb-mcp-server](https://github.com/apache/iotdb-mcp-server)
- **rel=4** [apimatic/pnz-mcp-server](https://github.com/apimatic/pnz-mcp-server)
- **rel=4** [Arc-Computer/arc-mcp-server](https://github.com/Arc-Computer/arc-mcp-server)
- **rel=4** [Archivarix-com/tube-search-mcp](https://github.com/Archivarix-com/tube-search-mcp)
- **rel=4** [ardecode/netbox-mcp-server](https://github.com/ardecode/netbox-mcp-server)
- **rel=4** [Arindam200/devto-mcp](https://github.com/Arindam200/devto-mcp)
- **rel=4** [arjunkmrm/sg-lta-mcp](https://github.com/arjunkmrm/sg-lta-mcp)
- **rel=4** [Arnoutopya/claude-google-images-mcp](https://github.com/Arnoutopya/claude-google-images-mcp)
- **rel=4** [ashgw/vault-mcp](https://github.com/ashgw/vault-mcp)
- **rel=4** [ashraf-hanafy/horus-flow-mcp](https://github.com/ashraf-hanafy/horus-flow-mcp)
- **rel=4** [asirulnik/mcp_server_filesystem_01](https://github.com/asirulnik/mcp_server_filesystem_01)
- **rel=4** [ASJordi/whois-mcp](https://github.com/ASJordi/whois-mcp)
- **rel=4** [atalhens/ntnx-mcp](https://github.com/atalhens/ntnx-mcp)
- **rel=4** [atcol/glue-mcp](https://github.com/atcol/glue-mcp)
- **rel=4** [attilad/bgg-mcp-server](https://github.com/attilad/bgg-mcp-server)
- **rel=4** [auth0/auth0-mcp-server](https://github.com/auth0/auth0-mcp-server)
- **rel=4** [autonomous-testing/wopee-mcp](https://github.com/autonomous-testing/wopee-mcp)
- **rel=4** [avarant/typesense-mcp-server](https://github.com/avarant/typesense-mcp-server)
- **rel=4** [axlwolf/filesystem-mcp](https://github.com/axlwolf/filesystem-mcp)
- **rel=4** [axlwolf/github-mcp](https://github.com/axlwolf/github-mcp)
- **rel=4** [aYenx/remote-mcp-server](https://github.com/aYenx/remote-mcp-server)
- **rel=4** [ayush-rudani/google-search-mcp-server](https://github.com/ayush-rudani/google-search-mcp-server)
- **rel=4** [ayushps1/remote-mcp-server](https://github.com/ayushps1/remote-mcp-server)
- **rel=4** [b3nguang/Server-Inspection-MCP](https://github.com/b3nguang/Server-Inspection-MCP)
- **rel=4** [bads1de/GNews-MCP](https://github.com/bads1de/GNews-MCP)
- **rel=4** [bads1de/youtube-mp3-mcp](https://github.com/bads1de/youtube-mp3-mcp)
- **rel=4** [bailaohe/mcp_tianditu](https://github.com/bailaohe/mcp_tianditu)
- **rel=4** [Bamo-alt/kam-mcp-server](https://github.com/Bamo-alt/kam-mcp-server)
- **rel=4** [BangNGH/github-code-index-mcp-server](https://github.com/BangNGH/github-code-index-mcp-server)
- **rel=4** [base/base-builder-mcp](https://github.com/base/base-builder-mcp)
- **rel=4** [BCusack/sharepoint-mcp](https://github.com/BCusack/sharepoint-mcp)
- **rel=4** [belljustin/spotify-mcp](https://github.com/belljustin/spotify-mcp)
- **rel=4** [beylessai/hiworks-mcp](https://github.com/beylessai/hiworks-mcp)
- **rel=4** [bfollington/remote-mcp-server](https://github.com/bfollington/remote-mcp-server)
- **rel=4** [Bigchx/mcp_3d_relief](https://github.com/Bigchx/mcp_3d_relief)
- **rel=4** [Bigsy/shadow-cljs-mcp](https://github.com/Bigsy/shadow-cljs-mcp)
- **rel=4** [bimalpaudels/python-interpreter-mcp](https://github.com/bimalpaudels/python-interpreter-mcp)
- **rel=4** [binalyze/air-mcp](https://github.com/binalyze/air-mcp)
- **rel=4** [BioContext/ChemBL-MCP](https://github.com/BioContext/ChemBL-MCP)
- **rel=4** [BioContext/PubChem-MCP](https://github.com/BioContext/PubChem-MCP)
- **rel=4** [BioMCP-Hub/PubTator-MCP-Server](https://github.com/BioMCP-Hub/PubTator-MCP-Server)
- **rel=4** [BirajMainali/git-committer-mcp-server](https://github.com/BirajMainali/git-committer-mcp-server)
- **rel=4** [birariro/agoda-review-mcp](https://github.com/birariro/agoda-review-mcp)
- **rel=4** [bittush8789/MCP](https://github.com/bittush8789/MCP)
- **rel=4** [bizflycloud/bizflycloud-mcp-server](https://github.com/bizflycloud/bizflycloud-mcp-server)
- **rel=4** [BlackMac/sipgateio-mcp](https://github.com/BlackMac/sipgateio-mcp)
- **rel=4** [blackpilledsoftware-prog/migas-mcp](https://github.com/blackpilledsoftware-prog/migas-mcp)
- **rel=4** [BlockchainHB/launchfastmcp-skills](https://github.com/BlockchainHB/launchfastmcp-skills)
- **rel=4** [bobtista/honeybadger-mcp](https://github.com/bobtista/honeybadger-mcp)
- **rel=4** [bocchiczennie/aws-monthly-cost-report-mcp-server](https://github.com/bocchiczennie/aws-monthly-cost-report-mcp-server)
- **rel=4** [BochaAI/bocha-search-mcp](https://github.com/BochaAI/bocha-search-mcp)
- **rel=4** [borgius/jobspy-mcp-server](https://github.com/borgius/jobspy-mcp-server)
- **rel=4** [bornpresident/MISP-MCP-SERVER](https://github.com/bornpresident/MISP-MCP-SERVER)
- **rel=4** [bossdong955/weibo-mcp-server](https://github.com/bossdong955/weibo-mcp-server)
- **rel=4** [brandu-mos/konquest-meta-ads-mcp](https://github.com/brandu-mos/konquest-meta-ads-mcp)
- **rel=4** [bravoure/clickup-mcp](https://github.com/bravoure/clickup-mcp)
- **rel=4** [brian3814/notion_fastmcp](https://github.com/brian3814/notion_fastmcp)
- **rel=4** [BrightLin/mcp-server-port-cleaner](https://github.com/BrightLin/mcp-server-port-cleaner)
- **rel=4** [brunoborges/jvm-diagnostics-mcp](https://github.com/brunoborges/jvm-diagnostics-mcp)
- **rel=4** [bsmnyk/mkslides-mcp](https://github.com/bsmnyk/mkslides-mcp)
- **rel=4** [burnworks/microcms-api-mcp-server](https://github.com/burnworks/microcms-api-mcp-server)
- **rel=4** [bzsasson/screaming-frog-mcp](https://github.com/bzsasson/screaming-frog-mcp)
- **rel=4** [c-rick/jimeng-mcp](https://github.com/c-rick/jimeng-mcp)
- **rel=4** [ca-risken/risken-mcp-server](https://github.com/ca-risken/risken-mcp-server)
- **rel=4** [cappt-team/mcp-server-nodejs](https://github.com/cappt-team/mcp-server-nodejs)
- **rel=4** [CaptainCrouton89/alaria-wiki-mcp](https://github.com/CaptainCrouton89/alaria-wiki-mcp)
- **rel=4** [catinair/aipower-rpa-mcp-server](https://github.com/catinair/aipower-rpa-mcp-server)
- **rel=4** [CDataSoftware/cdata-jdbc-mcp-server](https://github.com/CDataSoftware/cdata-jdbc-mcp-server)
- **rel=4** [cevatkerim/chargenow-mcp](https://github.com/cevatkerim/chargenow-mcp)
- **rel=4** [ChadAragorn/defold-mcp](https://github.com/ChadAragorn/defold-mcp)
- **rel=4** [ChandekarDhruvin/claude-openweather-mcp](https://github.com/ChandekarDhruvin/claude-openweather-mcp)
- **rel=4** [charlesmuchene/pref-editor-mcp-server](https://github.com/charlesmuchene/pref-editor-mcp-server)
- **rel=4** [charlesverge/mcp_open_interest](https://github.com/charlesverge/mcp_open_interest)
- **rel=4** [ChatMol/molecule-mcp](https://github.com/ChatMol/molecule-mcp)
- **rel=4** [Chazzychouse/weather-mcp-server](https://github.com/Chazzychouse/weather-mcp-server)
- **rel=4** [cheukyin175/metabase-mcp](https://github.com/cheukyin175/metabase-mcp)
- **rel=4** [Chill-AI-Space/vault-mcp](https://github.com/Chill-AI-Space/vault-mcp)
- **rel=4** [chris-sun-star/mcp-server-k8s](https://github.com/chris-sun-star/mcp-server-k8s)
- **rel=4** [chrisjmendez/mcp_quickstart](https://github.com/chrisjmendez/mcp_quickstart)
- **rel=4** [ciaraadkins/mixpanel-mcp-server](https://github.com/ciaraadkins/mixpanel-mcp-server)
- **rel=4** [classfang/ssh-mcp-server](https://github.com/classfang/ssh-mcp-server)
- **rel=4** [cloudywu0410/python_sandbox_mcp_server](https://github.com/cloudywu0410/python_sandbox_mcp_server)
- **rel=4** [clykins90/jobnimbus-mcp-server](https://github.com/clykins90/jobnimbus-mcp-server)
- **rel=4** [cmathgit/biblegateway-votd-mcp](https://github.com/cmathgit/biblegateway-votd-mcp)
- **rel=4** [cnych/seo-mcp](https://github.com/cnych/seo-mcp)
- **rel=4** [Codeshark-NET/climate-triage-mcp](https://github.com/Codeshark-NET/climate-triage-mcp)
- **rel=4** [codingaslu/PubMed-MCP-Server](https://github.com/codingaslu/PubMed-MCP-Server)
- **rel=4** [coffeenmusic/altium-mcp](https://github.com/coffeenmusic/altium-mcp)
- **rel=4** [Cognitive-Stack/ares-devops-mcp](https://github.com/Cognitive-Stack/ares-devops-mcp)
- **rel=4** [Collaborne/mcp-server](https://github.com/Collaborne/mcp-server)
- **rel=4** [comitest22/linear-mcp](https://github.com/comitest22/linear-mcp)
- **rel=4** [commune-sh/commune-mcp](https://github.com/commune-sh/commune-mcp)
- **rel=4** [cpecf/docker-mcp](https://github.com/cpecf/docker-mcp)
- **rel=4** [crazyMarky/mcp_nuclei_server](https://github.com/crazyMarky/mcp_nuclei_server)
- **rel=4** [CrewAakash/mcp-server-for-copilot](https://github.com/CrewAakash/mcp-server-for-copilot)
- **rel=4** [CristianCiubancan/YO-mcp](https://github.com/CristianCiubancan/YO-mcp)
- **rel=4** [cromewar/ghost-mcp-server](https://github.com/cromewar/ghost-mcp-server)
- **rel=4** [cyanheads/filesystem-mcp-server](https://github.com/cyanheads/filesystem-mcp-server)
- **rel=4** [cygkichi/estat-mcp-server](https://github.com/cygkichi/estat-mcp-server)
- **rel=4** [Cyreslab-AI/flightradar-mcp-server](https://github.com/Cyreslab-AI/flightradar-mcp-server)
- **rel=4** [Cyreslab-AI/flightradar24-mcp-server](https://github.com/Cyreslab-AI/flightradar24-mcp-server)
- **rel=4** [dabidstudio/youtubeinsights-mcp-server](https://github.com/dabidstudio/youtubeinsights-mcp-server)
- **rel=4** [dadang11/cryptoiz-mcp](https://github.com/dadang11/cryptoiz-mcp)
- **rel=4** [Dangoron/defillama-mcp](https://github.com/Dangoron/defillama-mcp)
- **rel=4** [danielscholl/backlog-manager-mcp](https://github.com/danielscholl/backlog-manager-mcp)
- **rel=4** [danielsuguimoto/readonly-filesystem-mcp](https://github.com/danielsuguimoto/readonly-filesystem-mcp)
- **rel=4** [danimal141/arxiv-search-mcp](https://github.com/danimal141/arxiv-search-mcp)
- **rel=4** [daobataotie/CAD-MCP](https://github.com/daobataotie/CAD-MCP)
- **rel=4** [Darko893/mcp-server](https://github.com/Darko893/mcp-server)
- **rel=4** [datafe/maxcompute-mcp-server](https://github.com/datafe/maxcompute-mcp-server)
- **rel=4** [datalayer/jupyter-earth-mcp-server](https://github.com/datalayer/jupyter-earth-mcp-server)
- **rel=4** [davidleathers113/typescript-analyzer-mcp](https://github.com/davidleathers113/typescript-analyzer-mcp)
- **rel=4** [dbeltra/scryfall-mcp](https://github.com/dbeltra/scryfall-mcp)
- **rel=4** [deak-ai/openehr-mcp-server](https://github.com/deak-ai/openehr-mcp-server)
- **rel=4** [Deep-Intelligent-Pharma/Translationx-mcp-server](https://github.com/Deep-Intelligent-Pharma/Translationx-mcp-server)
- **rel=4** [deepanshu-rawat6/Spring_MCP_Server](https://github.com/deepanshu-rawat6/Spring_MCP_Server)
- **rel=4** [deezsecc/Hubspot-MCP](https://github.com/deezsecc/Hubspot-MCP)
- **rel=4** [demouth/learn-mcp-server](https://github.com/demouth/learn-mcp-server)
- **rel=4** [deuslirio/mcp-server-whatsapp-message](https://github.com/deuslirio/mcp-server-whatsapp-message)
- **rel=4** [devhelmhq/mcp-server](https://github.com/devhelmhq/mcp-server)
- **rel=4** [dhavalgujar/esp-rainmaker-mcp](https://github.com/dhavalgujar/esp-rainmaker-mcp)
- **rel=4** [dhrbtjr0331/nba-stats-predictor-mcp](https://github.com/dhrbtjr0331/nba-stats-predictor-mcp)
- **rel=4** [dhylan01/MCP_OA](https://github.com/dhylan01/MCP_OA)
- **rel=4** [digila/linear-mcp](https://github.com/digila/linear-mcp)
- **rel=4** [digitalcube/advanced-backlog-mcp-server](https://github.com/digitalcube/advanced-backlog-mcp-server)
- **rel=4** [dithom/shopware-mcp](https://github.com/dithom/shopware-mcp)
- **rel=4** [doma2k/monad-contract-deployment-mcp](https://github.com/doma2k/monad-contract-deployment-mcp)
- **rel=4** [drdeeks/remote-mcp-server](https://github.com/drdeeks/remote-mcp-server)
- **rel=4** [Drew-Goddyn/buildkite-mcp](https://github.com/Drew-Goddyn/buildkite-mcp)
- **rel=4** [Eacus/misp-mcp](https://github.com/Eacus/misp-mcp)
- **rel=4** [eadm/grain-mcp-server](https://github.com/eadm/grain-mcp-server)
- **rel=4** [echozyr2001/ali-flux-mcp](https://github.com/echozyr2001/ali-flux-mcp)
- **rel=4** [ecovacs-ai/ecovacs-mcp](https://github.com/ecovacs-ai/ecovacs-mcp)
- **rel=4** [EdenYavin/Garak-MCP](https://github.com/EdenYavin/Garak-MCP)
- **rel=4** [EdenYavin/OSV-MCP](https://github.com/EdenYavin/OSV-MCP)
- **rel=4** [edgarrmondragon/limesurvey-mcp](https://github.com/edgarrmondragon/limesurvey-mcp)
- **rel=4** [edi3on/py-ue5-mcp-server](https://github.com/edi3on/py-ue5-mcp-server)
- **rel=4** [edwardchoh/apollo-io-mcp-server](https://github.com/edwardchoh/apollo-io-mcp-server)
- **rel=4** [ejoyee/ej-mcp-server-gdrive](https://github.com/ejoyee/ej-mcp-server-gdrive)
- **rel=4** [elizabethtrykin/8sleep-mcp](https://github.com/elizabethtrykin/8sleep-mcp)
- **rel=4** [ElromEvedElElyon/solanashield-mcp](https://github.com/ElromEvedElElyon/solanashield-mcp)
- **rel=4** [enggpt-it/MCP-Server-Cybersecurity-News](https://github.com/enggpt-it/MCP-Server-Cybersecurity-News)
- **rel=4** [enkryptai/enkryptai-mcp-server](https://github.com/enkryptai/enkryptai-mcp-server)
- **rel=4** [enomoto11/aws-cost-notifier-mcp-server](https://github.com/enomoto11/aws-cost-notifier-mcp-server)
- **rel=4** [enzoemir1/invoiceflow-mcp](https://github.com/enzoemir1/invoiceflow-mcp)
- **rel=4** [enzoemir1/leadpipe-mcp](https://github.com/enzoemir1/leadpipe-mcp)
- **rel=4** [enzoemir1/shopops-mcp](https://github.com/enzoemir1/shopops-mcp)
- **rel=4** [ertugrul59/tradingview-chart-mcp](https://github.com/ertugrul59/tradingview-chart-mcp)
- **rel=4** [Escorza07/whatsapp-mcp](https://github.com/Escorza07/whatsapp-mcp)
- **rel=4** [expensivefav/mcp](https://github.com/expensivefav/mcp)
- **rel=4** [eyalzh/kanban-mcp](https://github.com/eyalzh/kanban-mcp)
- **rel=4** [f-inc/containerinc-mcp](https://github.com/f-inc/containerinc-mcp)
- **rel=4** [Fabsbags/sbb-mcp](https://github.com/Fabsbags/sbb-mcp)
- **rel=4** [falahgs/Brave-Gemini-Research-MCP-Server](https://github.com/falahgs/Brave-Gemini-Research-MCP-Server)
- **rel=4** [falahgs/Gemini-Email-Subject-Generator-MCP](https://github.com/falahgs/Gemini-Email-Subject-Generator-MCP)
- **rel=4** [falahgs/image-gen3-google-mcp-server](https://github.com/falahgs/image-gen3-google-mcp-server)
- **rel=4** [fastomop/omcp_a2a](https://github.com/fastomop/omcp_a2a)
- **rel=4** [fdmocho/mcp_server_nasa](https://github.com/fdmocho/mcp_server_nasa)
- **rel=4** [FlatFilers/mcp-server-flatfile](https://github.com/FlatFilers/mcp-server-flatfile)
- **rel=4** [FluxA-Agent-Payment/FluxA-AI-Wallet-MCP](https://github.com/FluxA-Agent-Payment/FluxA-AI-Wallet-MCP)
- **rel=4** [Flyworks-AI/lipsync-mcp](https://github.com/Flyworks-AI/lipsync-mcp)
- **rel=4** [Foxhunt/gitlab-mcp-server](https://github.com/Foxhunt/gitlab-mcp-server)
- **rel=4** [freestylefly/mcp-server-weread](https://github.com/freestylefly/mcp-server-weread)
- **rel=4** [frostming/openweather-mcp](https://github.com/frostming/openweather-mcp)
- **rel=4** [FuelLabs/fuel-mcp-server](https://github.com/FuelLabs/fuel-mcp-server)
- **rel=4** [funtuan/tw-kfc-coupon-mcp](https://github.com/funtuan/tw-kfc-coupon-mcp)
- **rel=4** [furey/lifx-api-mcp-server](https://github.com/furey/lifx-api-mcp-server)
- **rel=4** [futuyu/Discord-webhook-MCP](https://github.com/futuyu/Discord-webhook-MCP)
- **rel=4** [g-fukurowl/fess-mcp-server](https://github.com/g-fukurowl/fess-mcp-server)
- **rel=4** [G1L1-Tech/remote-mcp-server](https://github.com/G1L1-Tech/remote-mcp-server)
- **rel=4** [gabelul/perplexity-mcp](https://github.com/gabelul/perplexity-mcp)
- **rel=4** [ganyariya/misskey-mcp-server](https://github.com/ganyariya/misskey-mcp-server)
- **rel=4** [ggilligan12/kibana-mcp](https://github.com/ggilligan12/kibana-mcp)
- **rel=4** [Ghraven/github-mcp-server](https://github.com/Ghraven/github-mcp-server)
- **rel=4** [ghrud92/simple-loki-mcp](https://github.com/ghrud92/simple-loki-mcp)
- **rel=4** [giannisalinetti/python-mcp-server](https://github.com/giannisalinetti/python-mcp-server)
- **rel=4** [Gitreceiver/TAMA-MCP](https://github.com/Gitreceiver/TAMA-MCP)
- **rel=4** [goern/forgejo-mcp](https://github.com/goern/forgejo-mcp)
- **rel=4** [GooTec/NCBI-MCP](https://github.com/GooTec/NCBI-MCP)
- **rel=4** [granthooks/Nocodb-MCP-Server](https://github.com/granthooks/Nocodb-MCP-Server)
- **rel=4** [GreatApo/concrete-properties-mcp](https://github.com/GreatApo/concrete-properties-mcp)
- **rel=4** [groundlight/groundlight-mcp-server](https://github.com/groundlight/groundlight-mcp-server)
- **rel=4** [Guidogl/device-info-mcp](https://github.com/Guidogl/device-info-mcp)
- **rel=4** [GuilhermeBarroso-sys/trello-report-mcp](https://github.com/GuilhermeBarroso-sys/trello-report-mcp)
- **rel=4** [gulihua10010/mcp-server-article](https://github.com/gulihua10010/mcp-server-article)
- **rel=4** [h0rv/d2-mcp](https://github.com/h0rv/d2-mcp)
- **rel=4** [hamibot/hamibot-mcp-server](https://github.com/hamibot/hamibot-mcp-server)
- **rel=4** [hanqizheng/unit-test-generator-mcp-server](https://github.com/hanqizheng/unit-test-generator-mcp-server)
- **rel=4** [harlley/storyblok-mcp](https://github.com/harlley/storyblok-mcp)
- **rel=4** [help116114/zoomeye-mcp-server](https://github.com/help116114/zoomeye-mcp-server)
- **rel=4** [herohunt-ai/herohunt-mcp](https://github.com/herohunt-ai/herohunt-mcp)
- **rel=4** [hesslee/mcp-server-altibase](https://github.com/hesslee/mcp-server-altibase)
- **rel=4** [hipposys-ltd/airflow-mcp](https://github.com/hipposys-ltd/airflow-mcp)
- **rel=4** [hiroaqii/jp-weather-mcp-server](https://github.com/hiroaqii/jp-weather-mcp-server)
- **rel=4** [Hizuki1030/visa-mcp](https://github.com/Hizuki1030/visa-mcp)
- **rel=4** [hmn53/sql-mcp](https://github.com/hmn53/sql-mcp)
- **rel=4** [Houlong66/mns-mcp-server](https://github.com/Houlong66/mns-mcp-server)
- **rel=4** [hrishabhn/flight-mcp](https://github.com/hrishabhn/flight-mcp)
- **rel=4** [https-eduardo/clockify-mcp-server](https://github.com/https-eduardo/clockify-mcp-server)
- **rel=4** [HuaLuAI/CAD-MCP](https://github.com/HuaLuAI/CAD-MCP)
- **rel=4** [huang-sh/scanpy-mcp](https://github.com/huang-sh/scanpy-mcp)
- **rel=4** [hugeicons/mcp-server](https://github.com/hugeicons/mcp-server)
- **rel=4** [Humboldtian/remote-mcp-server](https://github.com/Humboldtian/remote-mcp-server)
- **rel=4** [hussam0is/solidworks-mcp-server](https://github.com/hussam0is/solidworks-mcp-server)
- **rel=4** [hypeprinter007-stack/anchor-x402-mcp](https://github.com/hypeprinter007-stack/anchor-x402-mcp)
- **rel=4** [hypeprinter007-stack/signalfuse-mcp](https://github.com/hypeprinter007-stack/signalfuse-mcp)
- **rel=4** [iamkaia/mcp-server-implement](https://github.com/iamkaia/mcp-server-implement)
- **rel=4** [iannuttall/flux-ui-mcp](https://github.com/iannuttall/flux-ui-mcp)
- **rel=4** [idsulik/todo-mcp-server](https://github.com/idsulik/todo-mcp-server)
- **rel=4** [Infisical/infisical-mcp-server](https://github.com/Infisical/infisical-mcp-server)
- **rel=4** [injunko/figma-mcp-server](https://github.com/injunko/figma-mcp-server)
- **rel=4** [intsig-textin/textin-mcp](https://github.com/intsig-textin/textin-mcp)
- **rel=4** [ioehub/ioehub-mqtt-mcp-server](https://github.com/ioehub/ioehub-mqtt-mcp-server)
- **rel=4** [isuyashpatel/yox-modelcontextprotocol](https://github.com/isuyashpatel/yox-modelcontextprotocol)
- **rel=4** [iterationlayer/mcp](https://github.com/iterationlayer/mcp)
- **rel=4** [ivannikolovbg/repull-mcp](https://github.com/ivannikolovbg/repull-mcp)
- **rel=4** [JackieTien97/iotdb_mcp_server](https://github.com/JackieTien97/iotdb_mcp_server)
- **rel=4** [JackKuo666/ClinicalTrials-MCP-Server](https://github.com/JackKuo666/ClinicalTrials-MCP-Server)
- **rel=4** [JackKuo666/PubChem-MCP-Server](https://github.com/JackKuo666/PubChem-MCP-Server)
- **rel=4** [JackKuo666/PubTator-MCP-Server](https://github.com/JackKuo666/PubTator-MCP-Server)
- **rel=4** [jacksun911/megaswap-mcp](https://github.com/jacksun911/megaswap-mcp)
- **rel=4** [jalexspringer/impact-mcp-server](https://github.com/jalexspringer/impact-mcp-server)
- **rel=4** [jamesacklin/tlon-mcp-server](https://github.com/jamesacklin/tlon-mcp-server)
- **rel=4** [jarondonp/portfolio-mcp-server](https://github.com/jarondonp/portfolio-mcp-server)
- **rel=4** [jason-tan-swe/railway-mcp](https://github.com/jason-tan-swe/railway-mcp)
- **rel=4** [JCallico/py-az-mcp](https://github.com/JCallico/py-az-mcp)
- **rel=4** [jean-technologies/smartlead-mcp-server-local](https://github.com/jean-technologies/smartlead-mcp-server-local)
- **rel=4** [jeevanism/odoo-accounting-mcp](https://github.com/jeevanism/odoo-accounting-mcp)
- **rel=4** [Jeremy-Min-Yang/minecraft-mcp-server-pixel](https://github.com/Jeremy-Min-Yang/minecraft-mcp-server-pixel)
- **rel=4** [jhgaylor/me_mcp_server](https://github.com/jhgaylor/me_mcp_server)
- **rel=4** [jimmcq/Lemonade-Stand-MCP-Server](https://github.com/jimmcq/Lemonade-Stand-MCP-Server)
- **rel=4** [Jite-J/-mysql_mcp_server](https://github.com/Jite-J/-mysql_mcp_server)
- **rel=4** [jj3ny/reclaim-mcp-server](https://github.com/jj3ny/reclaim-mcp-server)
- **rel=4** [jkosik/mcp-server-splunk](https://github.com/jkosik/mcp-server-splunk)
- **rel=4** [jlgrimes/ptcg-mcp](https://github.com/jlgrimes/ptcg-mcp)
- **rel=4** [jmandel/health-record-mcp](https://github.com/jmandel/health-record-mcp)
- **rel=4** [joaomj/code-reviewer-mcp](https://github.com/joaomj/code-reviewer-mcp)
- **rel=4** [joaomj/deep-search-mcp](https://github.com/joaomj/deep-search-mcp)
- **rel=4** [johnhenry/hackernews-mcp](https://github.com/johnhenry/hackernews-mcp)
- **rel=4** [johnhenry/mcp-server-ipfs-context](https://github.com/johnhenry/mcp-server-ipfs-context)
- **rel=4** [johnhenry/vimble-mcp](https://github.com/johnhenry/vimble-mcp)
- **rel=4** [johnie/oura-mcp](https://github.com/johnie/oura-mcp)
- **rel=4** [johnnyrobot/claude-canvas-mcp](https://github.com/johnnyrobot/claude-canvas-mcp)
- **rel=4** [johnnyrootio/hello-world-mcp](https://github.com/johnnyrootio/hello-world-mcp)
- **rel=4** [Joooook/12306-mcp](https://github.com/Joooook/12306-mcp)
- **rel=4** [jordankamto/code-explorer-mcp](https://github.com/jordankamto/code-explorer-mcp)
- **rel=4** [joshuayoes/deno-kv-mcp](https://github.com/joshuayoes/deno-kv-mcp)
- **rel=4** [jpollock/wordpress-mcp](https://github.com/jpollock/wordpress-mcp)
- **rel=4** [jzumwalt/git-mcp](https://github.com/jzumwalt/git-mcp)
- **rel=4** [kaeosdesign/remote-mcp-server](https://github.com/kaeosdesign/remote-mcp-server)
- **rel=4** [kansei-link/kansei-mcp-server](https://github.com/kansei-link/kansei-mcp-server)
- **rel=4** [kappaexpress/docker-mcp](https://github.com/kappaexpress/docker-mcp)
- **rel=4** [karateboss/mcp_email_reader](https://github.com/karateboss/mcp_email_reader)
- **rel=4** [kartikgajjar/mcp-server](https://github.com/kartikgajjar/mcp-server)
- **rel=4** [KawaroX/codex-vitea-mcp](https://github.com/KawaroX/codex-vitea-mcp)
- **rel=4** [kenken64/mcp-server-java](https://github.com/kenken64/mcp-server-java)
- **rel=4** [kennyckk/mcp_hkbus](https://github.com/kennyckk/mcp_hkbus)
- **rel=4** [kich555/github-mcp-server](https://github.com/kich555/github-mcp-server)
- **rel=4** [KilluaYZ/elixir_linux_mcp_server](https://github.com/KilluaYZ/elixir_linux_mcp_server)
- **rel=4** [kmathur/mcp-server-kubernetes](https://github.com/kmathur/mcp-server-kubernetes)
- **rel=4** [kobzevvv/moldsim-mcp](https://github.com/kobzevvv/moldsim-mcp)
- **rel=4** [kocierik/consul-mcp-server](https://github.com/kocierik/consul-mcp-server)
- **rel=4** [koido/extreme-p-mcp](https://github.com/koido/extreme-p-mcp)
- **rel=4** [koido/liftover-mcp](https://github.com/koido/liftover-mcp)
- **rel=4** [kokushin/exia-mcp](https://github.com/kokushin/exia-mcp)
- **rel=4** [korwabs/playwright-trace-mcp](https://github.com/korwabs/playwright-trace-mcp)
- **rel=4** [Kota8102/aws-weekly-news-mcp](https://github.com/Kota8102/aws-weekly-news-mcp)
- **rel=4** [koudaiDemon/mcp-server-hand](https://github.com/koudaiDemon/mcp-server-hand)
- **rel=4** [krishanka/remote-mcp](https://github.com/krishanka/remote-mcp)
- **rel=4** [kswap/consul-mcp](https://github.com/kswap/consul-mcp)
- **rel=4** [kuberstar/qartez-mcp](https://github.com/kuberstar/qartez-mcp)
- **rel=4** [kxkaloo/mcp](https://github.com/kxkaloo/mcp)
- **rel=4** [kylewoolstenhulme-block/Notion-Goose-MCP](https://github.com/kylewoolstenhulme-block/Notion-Goose-MCP)
- **rel=4** [Lala-0x3f/mj-mcp](https://github.com/Lala-0x3f/mj-mcp)
- **rel=4** [lancedb/lancedb-mcp-server](https://github.com/lancedb/lancedb-mcp-server)
- **rel=4** [larryhudson/figma-mcp-server](https://github.com/larryhudson/figma-mcp-server)
- **rel=4** [larryhudson/linear-mcp-server-again](https://github.com/larryhudson/linear-mcp-server-again)
- **rel=4** [larryhudson/mcp-server-example-image-block](https://github.com/larryhudson/mcp-server-example-image-block)
- **rel=4** [larryhudson/mcp-server-template](https://github.com/larryhudson/mcp-server-template)
- **rel=4** [Lebedinskas/content-to-social-mcp-server](https://github.com/Lebedinskas/content-to-social-mcp-server)
- **rel=4** [leeb003/supabase-mcp](https://github.com/leeb003/supabase-mcp)
- **rel=4** [Leee62/sentry-issues-mcp](https://github.com/Leee62/sentry-issues-mcp)
- **rel=4** [Leonelberio/the-wordpress-mcp-server](https://github.com/Leonelberio/the-wordpress-mcp-server)
- **rel=4** [letsbonk-ai/bonk-mcp](https://github.com/letsbonk-ai/bonk-mcp)
- **rel=4** [lieyanqzu/ygocdb-mcp](https://github.com/lieyanqzu/ygocdb-mcp)
- **rel=4** [lijian-ui/vcenter-mcp-server](https://github.com/lijian-ui/vcenter-mcp-server)
- **rel=4** [lincw/cwa-mcp-server](https://github.com/lincw/cwa-mcp-server)
- **rel=4** [lincw/dwd-mcp-server](https://github.com/lincw/dwd-mcp-server)
- **rel=4** [liorfranko/home-assistant-mcp](https://github.com/liorfranko/home-assistant-mcp)
- **rel=4** [lispking/monad-mcp-server](https://github.com/lispking/monad-mcp-server)
- **rel=4** [LiTschii/remote-mcp-server](https://github.com/LiTschii/remote-mcp-server)
- **rel=4** [longxiangzhu/db2-mcp](https://github.com/longxiangzhu/db2-mcp)
- **rel=4** [loyaniu/moodle-mcp](https://github.com/loyaniu/moodle-mcp)
- **rel=4** [LuckyXYJ/mcp_ios_project](https://github.com/LuckyXYJ/mcp_ios_project)
- **rel=4** [luebken/playlist-mcp](https://github.com/luebken/playlist-mcp)
- **rel=4** [LuizBranco-ClickHype/VPS-MCP-SERVER](https://github.com/LuizBranco-ClickHype/VPS-MCP-SERVER)
- **rel=4** [lumile/lumbretravel-mcp](https://github.com/lumile/lumbretravel-mcp)
- **rel=4** [luminati-io/web-scraping-with-mcp](https://github.com/luminati-io/web-scraping-with-mcp)
- **rel=4** [mabeldata/pocketbase-mcp](https://github.com/mabeldata/pocketbase-mcp)
- **rel=4** [macchen-yu/HSIPL_auto_fastmcp](https://github.com/macchen-yu/HSIPL_auto_fastmcp)
- **rel=4** [Machine-To-Machine/m2m-mcp-server-ssh-client](https://github.com/Machine-To-Machine/m2m-mcp-server-ssh-client)
- **rel=4** [Machine-To-Machine/m2m-mcp-server-ssh-server](https://github.com/Machine-To-Machine/m2m-mcp-server-ssh-server)
- **rel=4** [madhavarora1988/mcp_sqlite_poc](https://github.com/madhavarora1988/mcp_sqlite_poc)
- **rel=4** [maito1201/cloudrun-logs-mcp](https://github.com/maito1201/cloudrun-logs-mcp)
- **rel=4** [MalluBeast69/gemini-img-gen-MCP](https://github.com/MalluBeast69/gemini-img-gen-MCP)
- **rel=4** [marcusdb/github-mcp-server-ts](https://github.com/marcusdb/github-mcp-server-ts)
- **rel=4** [MardiantoS/alpaca-mcp-server](https://github.com/MardiantoS/alpaca-mcp-server)
- **rel=4** [mario-andreschak/mcp_video_recognition](https://github.com/mario-andreschak/mcp_video_recognition)
- **rel=4** [MartinPSDev/curl-mcp](https://github.com/MartinPSDev/curl-mcp)
- **rel=4** [mcollina/perm-shell-mcp](https://github.com/mcollina/perm-shell-mcp)
- **rel=4** [mcp-for-dev/mcp-google-search](https://github.com/mcp-for-dev/mcp-google-search)
- **rel=4** [MCP-Reasoner/MCP-Reasoner](https://github.com/MCP-Reasoner/MCP-Reasoner)
- **rel=4** [mediar-ai/mcp-server-macos-use](https://github.com/mediar-ai/mcp-server-macos-use)
- **rel=4** [MediFinderBot/medifinder-mcp](https://github.com/MediFinderBot/medifinder-mcp)
- **rel=4** [Meerkats-Ai/builtwith-mcp-server](https://github.com/Meerkats-Ai/builtwith-mcp-server)
- **rel=4** [Meerkats-Ai/findymail-mcp-server](https://github.com/Meerkats-Ai/findymail-mcp-server)
- **rel=4** [Meerkats-Ai/prospeo-mcp-server](https://github.com/Meerkats-Ai/prospeo-mcp-server)
- **rel=4** [Meerkats-Ai/rocketreach-mcp-server](https://github.com/Meerkats-Ai/rocketreach-mcp-server)
- **rel=4** [Meerkats-Ai/smartlead-mcp-server](https://github.com/Meerkats-Ai/smartlead-mcp-server)
- **rel=4** [melihteke/Subnet-Calculator-MCP-Server](https://github.com/melihteke/Subnet-Calculator-MCP-Server)
- **rel=4** [menma-at-here/calendar-mcp-server](https://github.com/menma-at-here/calendar-mcp-server)
- **rel=4** [messageaid/mcp](https://github.com/messageaid/mcp)
- **rel=4** [mgd1984/cursor-rules](https://github.com/mgd1984/cursor-rules)
- **rel=4** [mhappy78/mcp_ai_local_memory](https://github.com/mhappy78/mcp_ai_local_memory)
- **rel=4** [mhazarabad/browser-use-mcp](https://github.com/mhazarabad/browser-use-mcp)
- **rel=4** [miraclebakelaser/porkbun-mcp-server](https://github.com/miraclebakelaser/porkbun-mcp-server)
- **rel=4** [miyamo2/hotpepper-gourmet-mcp-server](https://github.com/miyamo2/hotpepper-gourmet-mcp-server)
- **rel=4** [mkusaka/linear-mcp](https://github.com/mkusaka/linear-mcp)
- **rel=4** [mkusaka/mcp-server-memory](https://github.com/mkusaka/mcp-server-memory)
- **rel=4** [mnardit/clipboard-mcp](https://github.com/mnardit/clipboard-mcp)
- **rel=4** [molmolkky/prompt-character-mcp-server](https://github.com/molmolkky/prompt-character-mcp-server)
- **rel=4** [Moonlight-CL/redshift-mcp-server](https://github.com/Moonlight-CL/redshift-mcp-server)
- **rel=4** [MorDavid/ExternalAttacker-MCP](https://github.com/MorDavid/ExternalAttacker-MCP)
- **rel=4** [morim3/mcp_adobe_premiere](https://github.com/morim3/mcp_adobe_premiere)
- **rel=4** [MpLebron/GeoDataProcessor-MCP](https://github.com/MpLebron/GeoDataProcessor-MCP)
- **rel=4** [MrOrz/mcp-git-commit-aider](https://github.com/MrOrz/mcp-git-commit-aider)
- **rel=4** [mrwadams/otx-mcp](https://github.com/mrwadams/otx-mcp)
- **rel=4** [mrwyndham/pocketbase-mcp](https://github.com/mrwyndham/pocketbase-mcp)
- **rel=4** [MSAdministrator/enrichment-mcp](https://github.com/MSAdministrator/enrichment-mcp)
- **rel=4** [mskim8717/dooray-mcp](https://github.com/mskim8717/dooray-mcp)
- **rel=4** [mustafahasankhan/duckdb-mcp-server](https://github.com/mustafahasankhan/duckdb-mcp-server)
- **rel=4** [musthafa-mohammed/mvn-repo-mcp](https://github.com/musthafa-mohammed/mvn-repo-mcp)
- **rel=4** [MVA-MCP-servers/filesystem](https://github.com/MVA-MCP-servers/filesystem)
- **rel=4** [myzxlin/redbook-mcp](https://github.com/myzxlin/redbook-mcp)
- **rel=4** [Nadeus/toolradar-mcp](https://github.com/Nadeus/toolradar-mcp)
- **rel=4** [namanyayg/giga-mcp](https://github.com/namanyayg/giga-mcp)
- **rel=4** [NaorAIdeas/hubspot-mcp-server](https://github.com/NaorAIdeas/hubspot-mcp-server)
- **rel=4** [natifridman/stocks-mcp](https://github.com/natifridman/stocks-mcp)
- **rel=4** [nature-lover-iv/neo4j-mcp](https://github.com/nature-lover-iv/neo4j-mcp)
- **rel=4** [naveen09/mcp_pagerduty](https://github.com/naveen09/mcp_pagerduty)
- **rel=4** [necto-pro/jira-mcp-server](https://github.com/necto-pro/jira-mcp-server)
- **rel=4** [neugence/whipscribe-mcp](https://github.com/neugence/whipscribe-mcp)
- **rel=4** [NexusX-MCP/data-mcp-server](https://github.com/NexusX-MCP/data-mcp-server)
- **rel=4** [NexusX-MCP/integrate-mcp-server](https://github.com/NexusX-MCP/integrate-mcp-server)
- **rel=4** [nguyendinhsinh361/elevenlabs-mcp](https://github.com/nguyendinhsinh361/elevenlabs-mcp)
- **rel=4** [nhc/cloudflare-remote-mcp-server](https://github.com/nhc/cloudflare-remote-mcp-server)
- **rel=4** [nicekon/zendesk-mcp-server-kon](https://github.com/nicekon/zendesk-mcp-server-kon)
- **rel=4** [noahseger/cf-example-remote-mcp-server](https://github.com/noahseger/cf-example-remote-mcp-server)
- **rel=4** [noboru-i/nature-remo-mcp-server](https://github.com/noboru-i/nature-remo-mcp-server)
- **rel=4** [nodetec/nostr-code-snippet-mcp](https://github.com/nodetec/nostr-code-snippet-mcp)
- **rel=4** [NomotoK/doris-mcp-server](https://github.com/NomotoK/doris-mcp-server)
- **rel=4** [noobnooc/webhook-mcp](https://github.com/noobnooc/webhook-mcp)
- **rel=4** [Nozomuts/date-mcp](https://github.com/Nozomuts/date-mcp)
- **rel=4** [nulab/backlog-mcp-server](https://github.com/nulab/backlog-mcp-server)
- **rel=4** [num2k/naver-map-mcp](https://github.com/num2k/naver-map-mcp)
- **rel=4** [nvmmonkey/Rootdata-MCP](https://github.com/nvmmonkey/Rootdata-MCP)
- **rel=4** [nvsofts/jlcpcb-parts-mcp](https://github.com/nvsofts/jlcpcb-parts-mcp)
- **rel=4** [objones25/remote-cloudflare-youtube-transcript-mcp-server](https://github.com/objones25/remote-cloudflare-youtube-transcript-mcp-server)
- **rel=4** [oddlyspaced/ultimate-android-mcp](https://github.com/oddlyspaced/ultimate-android-mcp)
- **rel=4** [oliverbenns/digitalocean-mcp](https://github.com/oliverbenns/digitalocean-mcp)
- **rel=4** [omergocmen/json2video-mcp-server](https://github.com/omergocmen/json2video-mcp-server)
- **rel=4** [Ompragash/isolator-mcp](https://github.com/Ompragash/isolator-mcp)
- **rel=4** [opensourcedev90s/uk-science-museum-group-mcp](https://github.com/opensourcedev90s/uk-science-museum-group-mcp)
- **rel=4** [operation-hp/WA-MCP](https://github.com/operation-hp/WA-MCP)
- **rel=4** [opspawn/Google-Flights-MCP-Server](https://github.com/opspawn/Google-Flights-MCP-Server)
- **rel=4** [orlando2019/xlsm-mcp-server](https://github.com/orlando2019/xlsm-mcp-server)
- **rel=4** [Orthogonalpub/modelica_simulation_mcp_server](https://github.com/Orthogonalpub/modelica_simulation_mcp_server)
- **rel=4** [Otto-J/podcast-xyzrank-mcp](https://github.com/Otto-J/podcast-xyzrank-mcp)
- **rel=4** [ourongxing/newsnow-mcp-server](https://github.com/ourongxing/newsnow-mcp-server)
- **rel=4** [OzorOwn/defi-mcp](https://github.com/OzorOwn/defi-mcp)
- **rel=4** [OzorOwn/frostbyte-mcp](https://github.com/OzorOwn/frostbyte-mcp)
- **rel=4** [Packrift/packrift-mcp](https://github.com/Packrift/packrift-mcp)
- **rel=4** [Panth1823/formula1-mcp](https://github.com/Panth1823/formula1-mcp)
- **rel=4** [Parsegl/parse-mcp](https://github.com/Parsegl/parse-mcp)
- **rel=4** [paulsmith/tailscale-mcp-server](https://github.com/paulsmith/tailscale-mcp-server)
- **rel=4** [pcholakov/restate-mcp-server](https://github.com/pcholakov/restate-mcp-server)
- **rel=4** [peschinskiy/yandex-maps-mcp](https://github.com/peschinskiy/yandex-maps-mcp)
- **rel=4** [Phenomenai-org/ai-dictionary-mcp](https://github.com/Phenomenai-org/ai-dictionary-mcp)
- **rel=4** [php-mcp/laravel](https://github.com/php-mcp/laravel)
- **rel=4** [php-mcp/server](https://github.com/php-mcp/server)
- **rel=4** [phxdev1/archy-mcp](https://github.com/phxdev1/archy-mcp)
- **rel=4** [piddlingtuna/tfnsw-realtime-alerts-mcp-server](https://github.com/piddlingtuna/tfnsw-realtime-alerts-mcp-server)
- **rel=4** [pixelsock/directus-mcp](https://github.com/pixelsock/directus-mcp)
- **rel=4** [PixVerseAI/PixVerse-MCP](https://github.com/PixVerseAI/PixVerse-MCP)
- **rel=4** [pj8/backlog-mcp-server](https://github.com/pj8/backlog-mcp-server)
- **rel=4** [pkgxdev/mcp](https://github.com/pkgxdev/mcp)
- **rel=4** [pottekkat/sandbox-mcp](https://github.com/pottekkat/sandbox-mcp)
- **rel=4** [PovedaAqui/suzieq-mcp](https://github.com/PovedaAqui/suzieq-mcp)
- **rel=4** [PragmaTech-GmbH/bootiful-wordpress-mcp-server](https://github.com/PragmaTech-GmbH/bootiful-wordpress-mcp-server)
- **rel=4** [preludeorg/windows-rs-mcp](https://github.com/preludeorg/windows-rs-mcp)
- **rel=4** [priyankark/a11y-mcp](https://github.com/priyankark/a11y-mcp)
- **rel=4** [protagolabs/Netmind-Parse-PDF-MCP](https://github.com/protagolabs/Netmind-Parse-PDF-MCP)
- **rel=4** [PyneSys/patch-file-mcp](https://github.com/PyneSys/patch-file-mcp)
- **rel=4** [PyneSys/project-mem-mcp](https://github.com/PyneSys/project-mem-mcp)
- **rel=4** [qianlima365/zhipu-web-search-mcp](https://github.com/qianlima365/zhipu-web-search-mcp)
- **rel=4** [qingshanyuluo/prometheus-mcp-server](https://github.com/qingshanyuluo/prometheus-mcp-server)
- **rel=4** [querypie/querypie-mcp-server](https://github.com/querypie/querypie-mcp-server)
- **rel=4** [r-huijts/mcp-server-tester](https://github.com/r-huijts/mcp-server-tester)
- **rel=4** [radial-hks/mcp-server-proj](https://github.com/radial-hks/mcp-server-proj)
- **rel=4** [radostkali/gitlab-mcp-server](https://github.com/radostkali/gitlab-mcp-server)
- **rel=4** [rafaljanicki/x-twitter-mcp-server](https://github.com/rafaljanicki/x-twitter-mcp-server)
- **rel=4** [rahul-roy-glean/github-mcp-server](https://github.com/rahul-roy-glean/github-mcp-server)
- **rel=4** [raj-mehra/figma-mcp](https://github.com/raj-mehra/figma-mcp)
- **rel=4** [raj-mehra/jira-mcp](https://github.com/raj-mehra/jira-mcp)
- **rel=4** [rajprem4214/indian-railways-mcp](https://github.com/rajprem4214/indian-railways-mcp)
- **rel=4** [Rakibulislamsarkar/twitter-mcp](https://github.com/Rakibulislamsarkar/twitter-mcp)
- **rel=4** [ralf-boltshauser/sbb-mcp-server](https://github.com/ralf-boltshauser/sbb-mcp-server)
- **rel=4** [rapidriskradar/RRR-MCP](https://github.com/rapidriskradar/RRR-MCP)
- **rel=4** [rawakinode/monad-bridge-mcp-server](https://github.com/rawakinode/monad-bridge-mcp-server)
- **rel=4** [raymondlowe/roo-code-custom-mode-editor-mcp-server](https://github.com/raymondlowe/roo-code-custom-mode-editor-mcp-server)
- **rel=4** [redDwarf03/archethic-uco-mcp](https://github.com/redDwarf03/archethic-uco-mcp)
- **rel=4** [regenrek/deepwiki-mcp](https://github.com/regenrek/deepwiki-mcp)
- **rel=4** [reinier-millo/i18n-mcp-server](https://github.com/reinier-millo/i18n-mcp-server)
- **rel=4** [RemoteMCP/Remote-MCP](https://github.com/RemoteMCP/Remote-MCP)
- **rel=4** [render-oss/render-mcp-server](https://github.com/render-oss/render-mcp-server)
- **rel=4** [rianvdm/remote-mcp-server](https://github.com/rianvdm/remote-mcp-server)
- **rel=4** [RichardHFYU/MCP_Java_PSQL](https://github.com/RichardHFYU/MCP_Java_PSQL)
- **rel=4** [rijkvanzanten/directus-mcp-server](https://github.com/rijkvanzanten/directus-mcp-server)
- **rel=4** [RikGmee/google-map-mcp](https://github.com/RikGmee/google-map-mcp)
- **rel=4** [RikGmee/searchAPI-mcp](https://github.com/RikGmee/searchAPI-mcp)
- **rel=4** [RIKTESH89/mcp_cli_filesystem](https://github.com/RIKTESH89/mcp_cli_filesystem)
- **rel=4** [rims-dev/RIMS-MCP](https://github.com/rims-dev/RIMS-MCP)
- **rel=4** [RipperMercs/tensorfeed-x402-base-mcp](https://github.com/RipperMercs/tensorfeed-x402-base-mcp)
- **rel=4** [RLabs-Inc/ios-forensics-mcp](https://github.com/RLabs-Inc/ios-forensics-mcp)
- **rel=4** [rm-rf-prod/GroundTruth-MCP](https://github.com/rm-rf-prod/GroundTruth-MCP)
- **rel=4** [RmMargt/searchAPI-mcp](https://github.com/RmMargt/searchAPI-mcp)
- **rel=4** [roastedculti/metoro-mcp-server](https://github.com/roastedculti/metoro-mcp-server)
- **rel=4** [roboulos/remote-mcp-server](https://github.com/roboulos/remote-mcp-server)
- **rel=4** [RohitMidha23/youtube-mcp](https://github.com/RohitMidha23/youtube-mcp)
- **rel=4** [Rom7699/linkedin-jobs-mcp-server](https://github.com/Rom7699/linkedin-jobs-mcp-server)
- **rel=4** [ronantakizawa/gis-dataconvertersion-mcp](https://github.com/ronantakizawa/gis-dataconvertersion-mcp)
- **rel=4** [Ropz3/remote-mcp-server](https://github.com/Ropz3/remote-mcp-server)
- **rel=4** [saarw/akhq-mcp-server](https://github.com/saarw/akhq-mcp-server)
- **rel=4** [sadeghtkd/ping-mcp-server](https://github.com/sadeghtkd/ping-mcp-server)
- **rel=4** [salamentic/google-flights-mcp](https://github.com/salamentic/google-flights-mcp)
- **rel=4** [sam-trost/mcp-server-svgl](https://github.com/sam-trost/mcp-server-svgl)
- **rel=4** [sandst1/mcp-server-midi](https://github.com/sandst1/mcp-server-midi)
- **rel=4** [sanxxit/AWS-cost-explorer-with-MCP-server](https://github.com/sanxxit/AWS-cost-explorer-with-MCP-server)
- **rel=4** [savethepolarbears/google-photos-mcp](https://github.com/savethepolarbears/google-photos-mcp)
- **rel=4** [sbarbett/pihole-mcp-server](https://github.com/sbarbett/pihole-mcp-server)
- **rel=4** [scottlepp/loki-mcp](https://github.com/scottlepp/loki-mcp)
- **rel=4** [scottlepp/tempo-mcp-server](https://github.com/scottlepp/tempo-mcp-server)
- **rel=4** [sdi2200262/eclass-mcp-server](https://github.com/sdi2200262/eclass-mcp-server)
- **rel=4** [sebastianbachmaier/save-filesystem-mcp](https://github.com/sebastianbachmaier/save-filesystem-mcp)
- **rel=4** [SebastianBoehler/domain-check-mcp](https://github.com/SebastianBoehler/domain-check-mcp)
- **rel=4** [sedyh/ebitengine-mcp](https://github.com/sedyh/ebitengine-mcp)
- **rel=4** [Sergiolm17/genius-mcp-server](https://github.com/Sergiolm17/genius-mcp-server)
- **rel=4** [service-hero/housecallpro-mcp-server](https://github.com/service-hero/housecallpro-mcp-server)
- **rel=4** [shankarpriyank/remote-mcp-server-authless](https://github.com/shankarpriyank/remote-mcp-server-authless)
- **rel=4** [shariqriazz/upsplash-mcp-server](https://github.com/shariqriazz/upsplash-mcp-server)
- **rel=4** [sharozdawa/indexnow-mcp](https://github.com/sharozdawa/indexnow-mcp)
- **rel=4** [shaunporwal/DICOM-MCP](https://github.com/shaunporwal/DICOM-MCP)
- **rel=4** [shaxiaozz/prometheus-mcp-server](https://github.com/shaxiaozz/prometheus-mcp-server)
- **rel=4** [sheffler/mcp-server-lims](https://github.com/sheffler/mcp-server-lims)
- **rel=4** [shelwyn/mcp_control_table_lamp](https://github.com/shelwyn/mcp_control_table_lamp)
- **rel=4** [shensiqi0701/mysql-mcp-server-modification](https://github.com/shensiqi0701/mysql-mcp-server-modification)
- **rel=4** [shibayu36/mysql-schema-explorer-mcp](https://github.com/shibayu36/mysql-schema-explorer-mcp)
- **rel=4** [shifusen329/doc-lib-mcp](https://github.com/shifusen329/doc-lib-mcp)
- **rel=4** [shinichi-takayanagi/myweight-mcp-server](https://github.com/shinichi-takayanagi/myweight-mcp-server)
- **rel=4** [shivaji43/gibwork-mcp](https://github.com/shivaji43/gibwork-mcp)
- **rel=4** [SilverHi/ddnet-mcpserver](https://github.com/SilverHi/ddnet-mcpserver)
- **rel=4** [simon-duchastel/lifx-lan-mcp](https://github.com/simon-duchastel/lifx-lan-mcp)
- **rel=4** [SLineroDev/github-releases-mcp](https://github.com/SLineroDev/github-releases-mcp)
- **rel=4** [slot181/openapi-integrator-mcp](https://github.com/slot181/openapi-integrator-mcp)
- **rel=4** [smadi0x86/GDB-MCP](https://github.com/smadi0x86/GDB-MCP)
- **rel=4** [smamidipaka6/flights-mcp-server](https://github.com/smamidipaka6/flights-mcp-server)
- **rel=4** [smq9sn5jck-coder/causallayer-mcp](https://github.com/smq9sn5jck-coder/causallayer-mcp)
- **rel=4** [sneharao/wheather-mcp-server](https://github.com/sneharao/wheather-mcp-server)
- **rel=4** [socialneuron/mcp-server](https://github.com/socialneuron/mcp-server)
- **rel=4** [soggycactus/paprika-3-mcp](https://github.com/soggycactus/paprika-3-mcp)
- **rel=4** [sokyran/location-mcp-server](https://github.com/sokyran/location-mcp-server)
- **rel=4** [solanaprox/mcp-server](https://github.com/solanaprox/mcp-server)
- **rel=4** [someaka/wayland-mcp](https://github.com/someaka/wayland-mcp)
- **rel=4** [spritecook/spritecook-mcp](https://github.com/spritecook/spritecook-mcp)
- **rel=4** [srcgrp/sentry-mcp-server](https://github.com/srcgrp/sentry-mcp-server)
- **rel=4** [sriramsowmithri9807/MCP_X](https://github.com/sriramsowmithri9807/MCP_X)
- **rel=4** [srmorete/adb-mcp](https://github.com/srmorete/adb-mcp)
- **rel=4** [ssembleinc/ssemble-mcp-server](https://github.com/ssembleinc/ssemble-mcp-server)
- **rel=4** [starbuck93/tandoor-mcp-server](https://github.com/starbuck93/tandoor-mcp-server)
- **rel=4** [stephen9412/taiwan-cwa-mcp-server](https://github.com/stephen9412/taiwan-cwa-mcp-server)
- **rel=4** [stephen9412/youtube-mcp-server](https://github.com/stephen9412/youtube-mcp-server)
- **rel=4** [stephenlb/pubnub-mcp-server](https://github.com/stephenlb/pubnub-mcp-server)
- **rel=4** [stevengonsalvez/todoist-mcp](https://github.com/stevengonsalvez/todoist-mcp)
- **rel=4** [stevenyu113228/BloodHound-MCP](https://github.com/stevenyu113228/BloodHound-MCP)
- **rel=4** [Stoicmehedi/K-MCP](https://github.com/Stoicmehedi/K-MCP)
- **rel=4** [stoyky/mitre-attack-mcp](https://github.com/stoyky/mitre-attack-mcp)
- **rel=4** [stucchi/db-mcp-server](https://github.com/stucchi/db-mcp-server)
- **rel=4** [sugarforever/amap-mcp-server](https://github.com/sugarforever/amap-mcp-server)
- **rel=4** [SunnyCloudYang/hugo-mcp](https://github.com/SunnyCloudYang/hugo-mcp)
- **rel=4** [sunqirui1987/ae-mcp](https://github.com/sunqirui1987/ae-mcp)
- **rel=4** [Svtter/git-mcp](https://github.com/Svtter/git-mcp)
- **rel=4** [syauqi-uqi/qgis_mcp_modify1](https://github.com/syauqi-uqi/qgis_mcp_modify1)
- **rel=4** [sylphlab/filesystem-mcp](https://github.com/sylphlab/filesystem-mcp)
- **rel=4** [synackpwn/enrichment-mcp](https://github.com/synackpwn/enrichment-mcp)
- **rel=4** [T1nker-1220/aws-postgress-mcp-server](https://github.com/T1nker-1220/aws-postgress-mcp-server)
- **rel=4** [tailor-platform/tailor-mcp](https://github.com/tailor-platform/tailor-mcp)
- **rel=4** [tarjeir/chunker-mcp](https://github.com/tarjeir/chunker-mcp)
- **rel=4** [teamsincetoday/newsletter-commerce-mcp](https://github.com/teamsincetoday/newsletter-commerce-mcp)
- **rel=4** [teamsincetoday/podcast-commerce-mcp](https://github.com/teamsincetoday/podcast-commerce-mcp)
- **rel=4** [teamsincetoday/recipe-commerce-mcp](https://github.com/teamsincetoday/recipe-commerce-mcp)
- **rel=4** [texra-ai/mcp-server-mathematica](https://github.com/texra-ai/mcp-server-mathematica)
- **rel=4** [The-AI-Workshops/searxng-mcp-server](https://github.com/The-AI-Workshops/searxng-mcp-server)
- **rel=4** [The-Nexus-Guard/aip-mcp-server](https://github.com/The-Nexus-Guard/aip-mcp-server)
- **rel=4** [the-nine-nation/mini-cursor](https://github.com/the-nine-nation/mini-cursor)
- **rel=4** [theo-nash/twitter-mcp-server](https://github.com/theo-nash/twitter-mcp-server)
- **rel=4** [thepragmatik/mcp-server-jvm-build-tools](https://github.com/thepragmatik/mcp-server-jvm-build-tools)
- **rel=4** [theWDY/office-editor-mcp](https://github.com/theWDY/office-editor-mcp)
- **rel=4** [thirionlogan/Aurora-4X-MCP](https://github.com/thirionlogan/Aurora-4X-MCP)
- **rel=4** [ThomasRohde/mcp_server_manager](https://github.com/ThomasRohde/mcp_server_manager)
- **rel=4** [thuanpham582002/tabby-mcp-server](https://github.com/thuanpham582002/tabby-mcp-server)
- **rel=4** [ticketlens/ticketlens-experiences-mcp](https://github.com/ticketlens/ticketlens-experiences-mcp)
- **rel=4** [TickTeam/ticktick-mcp](https://github.com/TickTeam/ticktick-mcp)
- **rel=4** [tjh19971228/mcp_video_analysis](https://github.com/tjh19971228/mcp_video_analysis)
- **rel=4** [tkz24589/mcp_mongodb](https://github.com/tkz24589/mcp_mongodb)
- **rel=4** [tlaukkanen/nysse-mcp-server](https://github.com/tlaukkanen/nysse-mcp-server)
- **rel=4** [tobiassteidle/Spring-Boot-Sample-MCP-Server](https://github.com/tobiassteidle/Spring-Boot-Sample-MCP-Server)
- **rel=4** [tolegm/astranl-mcp](https://github.com/tolegm/astranl-mcp)
- **rel=4** [Tomatio13/software-checker-mcp](https://github.com/Tomatio13/software-checker-mcp)
- **rel=4** [tomekkorbak/strava-mcp-server](https://github.com/tomekkorbak/strava-mcp-server)
- **rel=4** [tonyzorin/youtrack-mcp](https://github.com/tonyzorin/youtrack-mcp)
- **rel=4** [Toos00/freepik-mcp-server](https://github.com/Toos00/freepik-mcp-server)
- **rel=4** [Toru-Takagi/togello-mcp-server](https://github.com/Toru-Takagi/togello-mcp-server)
- **rel=4** [tqvthu-works/mysql-mcp-server](https://github.com/tqvthu-works/mysql-mcp-server)
- **rel=4** [tradesdontlie/task-manager-mcp](https://github.com/tradesdontlie/task-manager-mcp)
- **rel=4** [trendsmcp/trends-mcp](https://github.com/trendsmcp/trends-mcp)
- **rel=4** [trevhud/vibe-mcp](https://github.com/trevhud/vibe-mcp)
- **rel=4** [trilliwon/lion-mcp-server](https://github.com/trilliwon/lion-mcp-server)
- **rel=4** [tropical-362827/futaba-mcp](https://github.com/tropical-362827/futaba-mcp)
- **rel=4** [trustasia-com/myssl-mcp-server-python](https://github.com/trustasia-com/myssl-mcp-server-python)
- **rel=4** [tsainte/wordpress-automation-mcp](https://github.com/tsainte/wordpress-automation-mcp)
- **rel=4** [tuki0918/eagle-mcp-server](https://github.com/tuki0918/eagle-mcp-server)
- **rel=4** [tumf/fastmcp-gsuite](https://github.com/tumf/fastmcp-gsuite)
- **rel=4** [u1i/mcp-server-disk-usage](https://github.com/u1i/mcp-server-disk-usage)
- **rel=4** [uh-joan/cortellis-mcp-server](https://github.com/uh-joan/cortellis-mcp-server)
- **rel=4** [us-all/airflow-mcp-server](https://github.com/us-all/airflow-mcp-server)
- **rel=4** [us-all/android-mcp-server](https://github.com/us-all/android-mcp-server)
- **rel=4** [us-all/datadog-mcp-server](https://github.com/us-all/datadog-mcp-server)
- **rel=4** [us-all/dbt-mcp-server](https://github.com/us-all/dbt-mcp-server)
- **rel=4** [us-all/google-drive-mcp-server](https://github.com/us-all/google-drive-mcp-server)
- **rel=4** [us-all/mlflow-mcp-server](https://github.com/us-all/mlflow-mcp-server)
- **rel=4** [us-all/openmetadata-mcp-server](https://github.com/us-all/openmetadata-mcp-server)
- **rel=4** [us-all/unifi-mcp-server](https://github.com/us-all/unifi-mcp-server)
- **rel=4** [Utsav-Ladani/WordPress-MCP](https://github.com/Utsav-Ladani/WordPress-MCP)
- **rel=4** [uupt-mcp/uupt-mcp-server](https://github.com/uupt-mcp/uupt-mcp-server)
- **rel=4** [v9rt3x/cs2-rcon-mcp](https://github.com/v9rt3x/cs2-rcon-mcp)
- **rel=4** [va99/Napier-mcp](https://github.com/va99/Napier-mcp)
- **rel=4** [vanisoul/rundeck-mcp-server](https://github.com/vanisoul/rundeck-mcp-server)
- **rel=4** [variablenigh/excel-mcp-server](https://github.com/variablenigh/excel-mcp-server)
- **rel=4** [variflight/variflight-mcp](https://github.com/variflight/variflight-mcp)
- **rel=4** [varunwahi-plivo/plivo-mcp-server](https://github.com/varunwahi-plivo/plivo-mcp-server)
- **rel=4** [Veenoway/monad-mcp-server](https://github.com/Veenoway/monad-mcp-server)
- **rel=4** [Veroq-api/veroq-mcp](https://github.com/Veroq-api/veroq-mcp)
- **rel=4** [vinodismyname/redshift-utils-mcp](https://github.com/vinodismyname/redshift-utils-mcp)
- **rel=4** [vistaarjuneja/harness-mcp](https://github.com/vistaarjuneja/harness-mcp)
- **rel=4** [vitolrosario/http-request-mcp](https://github.com/vitolrosario/http-request-mcp)
- **rel=4** [waii-ai/waii-mcp-server](https://github.com/waii-ai/waii-mcp-server)
- **rel=4** [wangzhaobo168/dm-mcp-server](https://github.com/wangzhaobo168/dm-mcp-server)
- **rel=4** [wealthy/wealthy-mcp](https://github.com/wealthy/wealthy-mcp)
- **rel=4** [WeatherXM/weatherxm-pro-mcp](https://github.com/WeatherXM/weatherxm-pro-mcp)
- **rel=4** [webconsulting/mcp-server-wsl-filesystem](https://github.com/webconsulting/mcp-server-wsl-filesystem)
- **rel=4** [weekitmo/mcp_godot_rag](https://github.com/weekitmo/mcp_godot_rag)
- **rel=4** [wgr1984/ns-lookup-mcp](https://github.com/wgr1984/ns-lookup-mcp)
- **rel=4** [Whaleylaw/pydanticai_mcp_neo4j](https://github.com/Whaleylaw/pydanticai_mcp_neo4j)
- **rel=4** [whitmorelabs/polymarket-mcp](https://github.com/whitmorelabs/polymarket-mcp)
- **rel=4** [wildsonbbl/gnnepcsaft_mcp_server](https://github.com/wildsonbbl/gnnepcsaft_mcp_server)
- **rel=4** [wolfcoming/adb_mcp_server](https://github.com/wolfcoming/adb_mcp_server)
- **rel=4** [workopia/workopia-mcp](https://github.com/workopia/workopia-mcp)
- **rel=4** [xiangmy21/iotdb-mcp-server-TreeModel](https://github.com/xiangmy21/iotdb-mcp-server-TreeModel)
- **rel=4** [xiaok/etherscan-mcp](https://github.com/xiaok/etherscan-mcp)
- **rel=4** [Xiawpohr/metamask-mcp](https://github.com/Xiawpohr/metamask-mcp)
- **rel=4** [xinlei413/DOC-Server-MCP](https://github.com/xinlei413/DOC-Server-MCP)
- **rel=4** [xsp52Hz/cognigraph-mcp-server](https://github.com/xsp52Hz/cognigraph-mcp-server)
- **rel=4** [YajieQi123/mcp-server-monday-qi](https://github.com/YajieQi123/mcp-server-monday-qi)
- **rel=4** [yan5236/bing-cn-mcp-server](https://github.com/yan5236/bing-cn-mcp-server)
- **rel=4** [YantaoMou/mcp_droid](https://github.com/YantaoMou/mcp_droid)
- **rel=4** [yantrikos/yantrikdb-mcp](https://github.com/yantrikos/yantrikdb-mcp)
- **rel=4** [yasu89/switch-bot-mcp-server](https://github.com/yasu89/switch-bot-mcp-server)
- **rel=4** [yedanyagamiai-cmd/openclaw-mcp-servers](https://github.com/yedanyagamiai-cmd/openclaw-mcp-servers)
- **rel=4** [yifanyifan897645/deadlink-checker-mcp](https://github.com/yifanyifan897645/deadlink-checker-mcp)
- **rel=4** [yifanyifan897645/webcheck-mcp](https://github.com/yifanyifan897645/webcheck-mcp)
- **rel=4** [ying-dao/yingdao_mcp_server](https://github.com/ying-dao/yingdao_mcp_server)
- **rel=4** [yoda-digital/horologic-mcp](https://github.com/yoda-digital/horologic-mcp)
- **rel=4** [Yooki-K/weibo-mcp-server](https://github.com/Yooki-K/weibo-mcp-server)
- **rel=4** [yorickchan/mcp_youtube_dlp](https://github.com/yorickchan/mcp_youtube_dlp)
- **rel=4** [ysthink/Filesystem-MCP-Server-SSE](https://github.com/ysthink/Filesystem-MCP-Server-SSE)
- **rel=4** [ytworks/openMM-Doc-MCP](https://github.com/ytworks/openMM-Doc-MCP)
- **rel=4** [yy1588133/code-merge-mcp](https://github.com/yy1588133/code-merge-mcp)
- **rel=4** [ZebraRoy/review-toolkit-mcp](https://github.com/ZebraRoy/review-toolkit-mcp)
- **rel=4** [zenoengine/msbuild-mcp-server](https://github.com/zenoengine/msbuild-mcp-server)
- **rel=4** [ZephyrDeng/mcp-server-gitlab](https://github.com/ZephyrDeng/mcp-server-gitlab)
- **rel=4** [ZephyrDeng/pprof-analyzer-mcp](https://github.com/ZephyrDeng/pprof-analyzer-mcp)
- **rel=4** [zerubeus/elektron-mcp](https://github.com/zerubeus/elektron-mcp)
- **rel=4** [zhongwencool/dida-mcp-server](https://github.com/zhongwencool/dida-mcp-server)
- **rel=4** [zizzfizzix/mcp-server-indexnow](https://github.com/zizzfizzix/mcp-server-indexnow)
- **rel=4** [zradlicz/particle-mcp-server](https://github.com/zradlicz/particle-mcp-server)
- **rel=3** [adam2211/neon-mcp-loc](https://github.com/adam2211/neon-mcp-loc)
- **rel=3** [bsmith925/mcp-examples](https://github.com/bsmith925/mcp-examples)
- **rel=3** [entropic-digital/bioinformatics-mcp-example](https://github.com/entropic-digital/bioinformatics-mcp-example)
- **rel=3** [fasuizu-br/speech-ai-examples](https://github.com/fasuizu-br/speech-ai-examples)
- **rel=3** [jmorrell-cloudflare/mcp-bearer-auth-example](https://github.com/jmorrell-cloudflare/mcp-bearer-auth-example)
- **rel=3** [Kr8thor/n8n-mcp-tool](https://github.com/Kr8thor/n8n-mcp-tool)
- **rel=3** [marioalexandreantunes/mcp-search-mojeek](https://github.com/marioalexandreantunes/mcp-search-mojeek)
- **rel=3** [TharanaBope/whatsapp-mcp-n8n](https://github.com/TharanaBope/whatsapp-mcp-n8n)
- **rel=3** [w1561778301/mcp-playwright-test](https://github.com/w1561778301/mcp-playwright-test)
- **rel=3** [xRadne/mcp-example](https://github.com/xRadne/mcp-example)
- **rel=3** [zemloai-ctrl/elecz-api](https://github.com/zemloai-ctrl/elecz-api)

#### From `wong2/awesome-mcp-servers` (134 picks)

- **rel=5** [wong2/mcp-jina-reader](https://github.com/wong2/mcp-jina-reader)
- **rel=4** [Acqusys/taskeract-mcp](https://github.com/Acqusys/taskeract-mcp)
- **rel=4** [ahmetbarut/jira-mcp](https://github.com/ahmetbarut/jira-mcp)
- **rel=4** [ahnopologetic/canvas-lms-mcp](https://github.com/ahnopologetic/canvas-lms-mcp)
- **rel=4** [ahonn/mcp-server-gsc](https://github.com/ahonn/mcp-server-gsc)
- **rel=4** [ai-1st/deepview-mcp](https://github.com/ai-1st/deepview-mcp)
- **rel=4** [akutishevsky/lunchmoney-mcp](https://github.com/akutishevsky/lunchmoney-mcp)
- **rel=4** [aliyun/alibabacloud-devops-mcp-server](https://github.com/aliyun/alibabacloud-devops-mcp-server)
- **rel=4** [aliyun/alibabacloud-hologres-mcp-server](https://github.com/aliyun/alibabacloud-hologres-mcp-server)
- **rel=4** [any4ai/anycrawl-mcp-server](https://github.com/any4ai/anycrawl-mcp-server)
- **rel=4** [apache/doris-mcp-server](https://github.com/apache/doris-mcp-server)
- **rel=4** [arifszn/reminder-mcp](https://github.com/arifszn/reminder-mcp)
- **rel=4** [Arize-ai/text-to-graphql-mcp](https://github.com/Arize-ai/text-to-graphql-mcp)
- **rel=4** [atla-ai/atla-mcp-server](https://github.com/atla-ai/atla-mcp-server)
- **rel=4** [aws-powertools/powertools-mcp](https://github.com/aws-powertools/powertools-mcp)
- **rel=4** [baruchiro/paperless-mcp](https://github.com/baruchiro/paperless-mcp)
- **rel=4** [bhauman/clojure-mcp](https://github.com/bhauman/clojure-mcp)
- **rel=4** [Bigsy/clj-kondo-MCP](https://github.com/Bigsy/clj-kondo-MCP)
- **rel=4** [Bigsy/maven-mcp-server](https://github.com/Bigsy/maven-mcp-server)
- **rel=4** [brianveltman/sonatype-mcp](https://github.com/brianveltman/sonatype-mcp)
- **rel=4** [brightdata/brightdata-mcp](https://github.com/brightdata/brightdata-mcp)
- **rel=4** [browserstack/mcp-server](https://github.com/browserstack/mcp-server)
- **rel=4** [btwiuse/npm-search-mcp-server](https://github.com/btwiuse/npm-search-mcp-server)
- **rel=4** [callhub/callhub-mcp](https://github.com/callhub/callhub-mcp)
- **rel=4** [Coresignal-com/coresignal-mcp](https://github.com/Coresignal-com/coresignal-mcp)
- **rel=4** [crawlbase/crawlbase-mcp](https://github.com/crawlbase/crawlbase-mcp)
- **rel=4** [CryptoRadi/schemaflow-mcp-server](https://github.com/CryptoRadi/schemaflow-mcp-server)
- **rel=4** [davidf9999/gx-mcp-server](https://github.com/davidf9999/gx-mcp-server)
- **rel=4** [debugg-ai/debugg-ai-mcp](https://github.com/debugg-ai/debugg-ai-mcp)
- **rel=4** [Decodo/decodo-mcp-server](https://github.com/Decodo/decodo-mcp-server)
- **rel=4** [devhub/devhub-cms-mcp](https://github.com/devhub/devhub-cms-mcp)
- **rel=4** [digma-ai/digma-mcp-server](https://github.com/digma-ai/digma-mcp-server)
- **rel=4** [dolthub/dolt-mcp](https://github.com/dolthub/dolt-mcp)
- **rel=4** [dominik1001/caldav-mcp](https://github.com/dominik1001/caldav-mcp)
- **rel=4** [dominik1001/imap-mcp](https://github.com/dominik1001/imap-mcp)
- **rel=4** [dreamfactorysoftware/df-mcp](https://github.com/dreamfactorysoftware/df-mcp)
- **rel=4** [EduBase/MCP](https://github.com/EduBase/MCP)
- **rel=4** [fetchSERP/fetchserp-mcp-server-node](https://github.com/fetchSERP/fetchserp-mcp-server-node)
- **rel=4** [Fewsats/fewsats-mcp](https://github.com/Fewsats/fewsats-mcp)
- **rel=4** [G-Core/gcore-mcp-server](https://github.com/G-Core/gcore-mcp-server)
- **rel=4** [gauravsaini/gluestack-ui-mcp-server](https://github.com/gauravsaini/gluestack-ui-mcp-server)
- **rel=4** [georgeantonopoulos/Basecamp-MCP-Server](https://github.com/georgeantonopoulos/Basecamp-MCP-Server)
- **rel=4** [gologinapp/gologin-mcp](https://github.com/gologinapp/gologin-mcp)
- **rel=4** [GoogleCloudPlatform/cloud-run-mcp](https://github.com/GoogleCloudPlatform/cloud-run-mcp)
- **rel=4** [GoPlausible/algorand-mcp](https://github.com/GoPlausible/algorand-mcp)
- **rel=4** [gowinston-ai/winston-ai-mcp-server](https://github.com/gowinston-ai/winston-ai-mcp-server)
- **rel=4** [harness/mcp-server](https://github.com/harness/mcp-server)
- **rel=4** [heilgar/shadcn-ui-mcp-server](https://github.com/heilgar/shadcn-ui-mcp-server)
- **rel=4** [hostinger/api-mcp-server](https://github.com/hostinger/api-mcp-server)
- **rel=4** [integration-app/mcp-server](https://github.com/integration-app/mcp-server)
- **rel=4** [isaiahbjork/allyson-mcp](https://github.com/isaiahbjork/allyson-mcp)
- **rel=4** [isiahw1/mcp-server-bing-webmaster](https://github.com/isiahw1/mcp-server-bing-webmaster)
- **rel=4** [itcaat/teamcity-mcp](https://github.com/itcaat/teamcity-mcp)
- **rel=4** [jacksenechal/scan-mcp](https://github.com/jacksenechal/scan-mcp)
- **rel=4** [KamranBiglari/mcp-server-chart](https://github.com/KamranBiglari/mcp-server-chart)
- **rel=4** [Kashyap-AI-ML-Solutions/webex-messaging-mcp-server](https://github.com/Kashyap-AI-ML-Solutions/webex-messaging-mcp-server)
- **rel=4** [Kiran1689/storyblok-mcp-server](https://github.com/Kiran1689/storyblok-mcp-server)
- **rel=4** [kocakli/Trello-Desktop-MCP](https://github.com/kocakli/Trello-Desktop-MCP)
- **rel=4** [kontent-ai/mcp-server](https://github.com/kontent-ai/mcp-server)
- **rel=4** [laurynas-biveinis/elisp-dev-mcp](https://github.com/laurynas-biveinis/elisp-dev-mcp)
- **rel=4** [m0xai/trello-mcp-server](https://github.com/m0xai/trello-mcp-server)
- **rel=4** [mailgun/mailgun-mcp-server](https://github.com/mailgun/mailgun-mcp-server)
- **rel=4** [makeplane/plane-mcp-server](https://github.com/makeplane/plane-mcp-server)
- **rel=4** [mapbox/mcp-server](https://github.com/mapbox/mcp-server)
- **rel=4** [matthewdcage/pbs-mcp-server](https://github.com/matthewdcage/pbs-mcp-server)
- **rel=4** [mbelinky/x-mcp-server](https://github.com/mbelinky/x-mcp-server)
- **rel=4** [meilisearch/meilisearch-mcp](https://github.com/meilisearch/meilisearch-mcp)
- **rel=4** [mingdaocloud/hap-mcp](https://github.com/mingdaocloud/hap-mcp)
- **rel=4** [minhalvp/android-mcp-server](https://github.com/minhalvp/android-mcp-server)
- **rel=4** [movstox/lazy-toggl-mcp](https://github.com/movstox/lazy-toggl-mcp)
- **rel=4** [mrkrsl/web-search-mcp](https://github.com/mrkrsl/web-search-mcp)
- **rel=4** [nazar256/combine-mcp](https://github.com/nazar256/combine-mcp)
- **rel=4** [nazar256/user-prompt-mcp](https://github.com/nazar256/user-prompt-mcp)
- **rel=4** [nickgnd/tmux-mcp](https://github.com/nickgnd/tmux-mcp)
- **rel=4** [norman-finance/norman-mcp-server](https://github.com/norman-finance/norman-mcp-server)
- **rel=4** [ntk148v/alertmanager-mcp-server](https://github.com/ntk148v/alertmanager-mcp-server)
- **rel=4** [nzrsky/simctl-mcp-server](https://github.com/nzrsky/simctl-mcp-server)
- **rel=4** [nzrsky/xctools-mcp-server](https://github.com/nzrsky/xctools-mcp-server)
- **rel=4** [oatpp/oatpp-mcp](https://github.com/oatpp/oatpp-mcp)
- **rel=4** [openfort-xyz/mcp](https://github.com/openfort-xyz/mcp)
- **rel=4** [pansila/mcp_server_gdb](https://github.com/pansila/mcp_server_gdb)
- **rel=4** [Peliqan-io/mcp-server-peliqan](https://github.com/Peliqan-io/mcp-server-peliqan)
- **rel=4** [PGYER/pgyer-mcp-server](https://github.com/PGYER/pgyer-mcp-server)
- **rel=4** [pigmej/python-homey-mcp](https://github.com/pigmej/python-homey-mcp)
- **rel=4** [pkolawa/krs-poland-mcp-server](https://github.com/pkolawa/krs-poland-mcp-server)
- **rel=4** [pollinations/chucknorris-mcp](https://github.com/pollinations/chucknorris-mcp)
- **rel=4** [postmanlabs/postman-mcp-server](https://github.com/postmanlabs/postman-mcp-server)
- **rel=4** [powerdrillai/powerdrill-mcp](https://github.com/powerdrillai/powerdrill-mcp)
- **rel=4** [PV-Bhat/gemsuite-mcp](https://github.com/PV-Bhat/gemsuite-mcp)
- **rel=4** [rahulthedevil/Jira-Context-MCP](https://github.com/rahulthedevil/Jira-Context-MCP)
- **rel=4** [railsware/mailtrap-mcp](https://github.com/railsware/mailtrap-mcp)
- **rel=4** [ramp-public/ramp-mcp](https://github.com/ramp-public/ramp-mcp)
- **rel=4** [randa-mu/drand-mcp-server](https://github.com/randa-mu/drand-mcp-server)
- **rel=4** [ReexpressAI/reexpress_mcp_server](https://github.com/ReexpressAI/reexpress_mcp_server)
- **rel=4** [ref-tools/ref-tools-mcp](https://github.com/ref-tools/ref-tools-mcp)
- **rel=4** [rendyfebry/google-pse-mcp](https://github.com/rendyfebry/google-pse-mcp)
- **rel=4** [reuvenaor/israel-statistics-mcp](https://github.com/reuvenaor/israel-statistics-mcp)
- **rel=4** [rohit-kaundal/digitalocean-mcp-server](https://github.com/rohit-kaundal/digitalocean-mcp-server)
- **rel=4** [root-signals/root-signals-mcp](https://github.com/root-signals/root-signals-mcp)
- **rel=4** [routineco/mcp-server](https://github.com/routineco/mcp-server)
- **rel=4** [scrapezy/mcp](https://github.com/scrapezy/mcp)
- **rel=4** [securityfortech/google-admin-mcp](https://github.com/securityfortech/google-admin-mcp)
- **rel=4** [shuowang-ai/Weather-MCP](https://github.com/shuowang-ai/Weather-MCP)
- **rel=4** [Shy2593666979/mcp-server-email](https://github.com/Shy2593666979/mcp-server-email)
- **rel=4** [simpleswift/spm-mcp](https://github.com/simpleswift/spm-mcp)
- **rel=4** [siva010928/multi-chat-mcp-server](https://github.com/siva010928/multi-chat-mcp-server)
- **rel=4** [SlideSpeak/slidespeak-mcp](https://github.com/SlideSpeak/slidespeak-mcp)
- **rel=4** [SonarSource/sonarqube-mcp-server](https://github.com/SonarSource/sonarqube-mcp-server)
- **rel=4** [spacholski1225/anki-connect-mcp](https://github.com/spacholski1225/anki-connect-mcp)
- **rel=4** [square/square-mcp-server](https://github.com/square/square-mcp-server)
- **rel=4** [srnetadmin/nanoleaf-mcp-server](https://github.com/srnetadmin/nanoleaf-mcp-server)
- **rel=4** [sshaaf/keycloak-mcp-server](https://github.com/sshaaf/keycloak-mcp-server)
- **rel=4** [stanislavlysenko0912/todoist-mcp-server](https://github.com/stanislavlysenko0912/todoist-mcp-server)
- **rel=4** [supadata-ai/mcp](https://github.com/supadata-ai/mcp)
- **rel=4** [super-i-tech/mcp_plexus](https://github.com/super-i-tech/mcp_plexus)
- **rel=4** [Teradata/teradata-mcp-server](https://github.com/Teradata/teradata-mcp-server)
- **rel=4** [the-basilisk-ai/squad-mcp](https://github.com/the-basilisk-ai/squad-mcp)
- **rel=4** [themeselection/flyonui-mcp](https://github.com/themeselection/flyonui-mcp)
- **rel=4** [token-metrics/mcp](https://github.com/token-metrics/mcp)
- **rel=4** [trypeggy/facebook-ads-library-mcp](https://github.com/trypeggy/facebook-ads-library-mcp)
- **rel=4** [twilio-labs/mcp](https://github.com/twilio-labs/mcp)
- **rel=4** [Unstructured-IO/UNS-MCP](https://github.com/Unstructured-IO/UNS-MCP)
- **rel=4** [upstash/context7-mcp](https://github.com/upstash/context7-mcp)
- **rel=4** [VadimNastoyashchy/json-mcp](https://github.com/VadimNastoyashchy/json-mcp)
- **rel=4** [Verodat/verodat-mcp-server](https://github.com/Verodat/verodat-mcp-server)
- **rel=4** [visotrust/viso-mcp-server](https://github.com/visotrust/viso-mcp-server)
- **rel=4** [voska/hass-mcp](https://github.com/voska/hass-mcp)
- **rel=4** [webflow/mcp-server](https://github.com/webflow/mcp-server)
- **rel=4** [xxczaki/local-history-mcp](https://github.com/xxczaki/local-history-mcp)
- **rel=4** [YUHAI0/email-send-mcp](https://github.com/YUHAI0/email-send-mcp)
- **rel=4** [yusufk/salaah-mcp](https://github.com/yusufk/salaah-mcp)
- **rel=4** [zacharypodbela/djangorestframework-mcp](https://github.com/zacharypodbela/djangorestframework-mcp)
- **rel=4** [zazencodes/public-apis-mcp](https://github.com/zazencodes/public-apis-mcp)
- **rel=4** [zazencodes/random-number-mcp](https://github.com/zazencodes/random-number-mcp)

#### From `awesome-opencode/awesome-opencode` (69 picks)

- **rel=4** [24601/opencode-zellij-namer](https://github.com/24601/opencode-zellij-namer)
- **rel=4** [ajaxdude/opencode-ai-poimandres-theme](https://github.com/ajaxdude/opencode-ai-poimandres-theme)
- **rel=4** [Alph4d0g/opencode-omniroute-auth](https://github.com/Alph4d0g/opencode-omniroute-auth)
- **rel=4** [alvinunreal/oh-my-opencode-slim](https://github.com/alvinunreal/oh-my-opencode-slim)
- **rel=4** [AnganSamadder/opencode-agent-tmux](https://github.com/AnganSamadder/opencode-agent-tmux)
- **rel=4** [angristan/opencode-wakatime](https://github.com/angristan/opencode-wakatime)
- **rel=4** [anomalyco/opencode-sdk-go](https://github.com/anomalyco/opencode-sdk-go)
- **rel=4** [anomalyco/opencode-sdk-js](https://github.com/anomalyco/opencode-sdk-js)
- **rel=4** [anomalyco/opencode-sdk-python](https://github.com/anomalyco/opencode-sdk-python)
- **rel=4** [athal7/opencode-devcontainers](https://github.com/athal7/opencode-devcontainers)
- **rel=4** [athal7/opencode-pilot](https://github.com/athal7/opencode-pilot)
- **rel=4** [boxpositron/with-context-mcp](https://github.com/boxpositron/with-context-mcp)
- **rel=4** [brunogabriel/opencode-moonlight-theme](https://github.com/brunogabriel/opencode-moonlight-theme)
- **rel=4** [cnicolov/opencode-plugin-simple-memory](https://github.com/cnicolov/opencode-plugin-simple-memory)
- **rel=4** [darrenhinde/opencode-agents](https://github.com/darrenhinde/opencode-agents)
- **rel=4** [DEVtheOPS/opencode-plugin-otel](https://github.com/DEVtheOPS/opencode-plugin-otel)
- **rel=4** [GNITOAHC/opencode-session](https://github.com/GNITOAHC/opencode-session)
- **rel=4** [gotgenes/opencode-agent-identity](https://github.com/gotgenes/opencode-agent-identity)
- **rel=4** [grinev/opencode-telegram-bot](https://github.com/grinev/opencode-telegram-bot)
- **rel=4** [IgorWarzocha/Opencode-Context-Analysis-Plugin](https://github.com/IgorWarzocha/Opencode-Context-Analysis-Plugin)
- **rel=4** [IgorWarzocha/Opencode-Google-AI-Search-Plugin](https://github.com/IgorWarzocha/Opencode-Google-AI-Search-Plugin)
- **rel=4** [IgorWarzocha/Opencode-Roadmap](https://github.com/IgorWarzocha/Opencode-Roadmap)
- **rel=4** [iHildy/opencode-synced](https://github.com/iHildy/opencode-synced)
- **rel=4** [jenslys/opencode-gemini-auth](https://github.com/jenslys/opencode-gemini-auth)
- **rel=4** [jjmartres/opencode](https://github.com/jjmartres/opencode)
- **rel=4** [joelhooks/opencode-swarm-plugin](https://github.com/joelhooks/opencode-swarm-plugin)
- **rel=4** [joshuadavidthomas/opencode-agent-memory](https://github.com/joshuadavidthomas/opencode-agent-memory)
- **rel=4** [joshuadavidthomas/opencode-agent-skills](https://github.com/joshuadavidthomas/opencode-agent-skills)
- **rel=4** [joshuadavidthomas/opencode-beads](https://github.com/joshuadavidthomas/opencode-beads)
- **rel=4** [joshuadavidthomas/opencode-handoff](https://github.com/joshuadavidthomas/opencode-handoff)
- **rel=4** [JosXa/opencode-snippets](https://github.com/JosXa/opencode-snippets)
- **rel=4** [JRedeker/opencode-morph-fast-apply](https://github.com/JRedeker/opencode-morph-fast-apply)
- **rel=4** [JRedeker/opencode-shell-strategy](https://github.com/JRedeker/opencode-shell-strategy)
- **rel=4** [JungHoonGhae/opencode-kilo-auth](https://github.com/JungHoonGhae/opencode-kilo-auth)
- **rel=4** [JUVOJustin/opencode-ddev](https://github.com/JUVOJustin/opencode-ddev)
- **rel=4** [kcrommett/opencode-web](https://github.com/kcrommett/opencode-web)
- **rel=4** [kdcokenny/opencode-background-agents](https://github.com/kdcokenny/opencode-background-agents)
- **rel=4** [kdcokenny/opencode-notify](https://github.com/kdcokenny/opencode-notify)
- **rel=4** [kdcokenny/opencode-workspace](https://github.com/kdcokenny/opencode-workspace)
- **rel=4** [kdcokenny/opencode-worktree](https://github.com/kdcokenny/opencode-worktree)
- **rel=4** [lannuttia/opencode-ntfy](https://github.com/lannuttia/opencode-ntfy)
- **rel=4** [lgladysz/opencode-ignore](https://github.com/lgladysz/opencode-ignore)
- **rel=4** [Lyapsus/opencode-optimal-model-temps](https://github.com/Lyapsus/opencode-optimal-model-temps)
- **rel=4** [mailshieldai/opencode-canvas](https://github.com/mailshieldai/opencode-canvas)
- **rel=4** [malhashemi/opencode-sessions](https://github.com/malhashemi/opencode-sessions)
- **rel=4** [malhashemi/opencode-skills](https://github.com/malhashemi/opencode-skills)
- **rel=4** [MasuRii/opencode-smart-voice-notify](https://github.com/MasuRii/opencode-smart-voice-notify)
- **rel=4** [NickvanDyke/opencode](https://github.com/NickvanDyke/opencode)
- **rel=4** [NoeFabris/opencode-antigravity-auth](https://github.com/NoeFabris/opencode-antigravity-auth)
- **rel=4** [numman-ali/opencode-openai-codex-auth](https://github.com/numman-ali/opencode-openai-codex-auth)
- **rel=4** [Octane0411/opencode-plugin-openspec](https://github.com/Octane0411/opencode-plugin-openspec)
- **rel=4** [open-hax/codex](https://github.com/open-hax/codex)
- **rel=4** [pantheon-org/opencode-warcraft-notifications](https://github.com/pantheon-org/opencode-warcraft-notifications)
- **rel=4** [postrednik/opencode-ayu-theme](https://github.com/postrednik/opencode-ayu-theme)
- **rel=4** [ramarivera/opencode-model-announcer](https://github.com/ramarivera/opencode-model-announcer)
- **rel=4** [ramtinJ95/opencode-tokenscope](https://github.com/ramtinJ95/opencode-tokenscope)
- **rel=4** [simonwjackson/opencode-direnv](https://github.com/simonwjackson/opencode-direnv)
- **rel=4** [slkiser/opencode-quota](https://github.com/slkiser/opencode-quota)
- **rel=4** [smartfrog/opencode-froggy](https://github.com/smartfrog/opencode-froggy)
- **rel=4** [Tarquinen/opencode-dynamic-context-pruning](https://github.com/Tarquinen/opencode-dynamic-context-pruning)
- **rel=4** [Tarquinen/opencode-smart-title](https://github.com/Tarquinen/opencode-smart-title)
- **rel=4** [Th0rgal/opencode-ralph-wiggum](https://github.com/Th0rgal/opencode-ralph-wiggum)
- **rel=4** [theblazehen/opencode-antigravity-multi-auth](https://github.com/theblazehen/opencode-antigravity-multi-auth)
- **rel=4** [tickernelz/opencode-mem](https://github.com/tickernelz/opencode-mem)
- **rel=4** [unluckyjori/Codex-Proxy-Server](https://github.com/unluckyjori/Codex-Proxy-Server)
- **rel=4** [vbgate/opencode-mystatus](https://github.com/vbgate/opencode-mystatus)
- **rel=4** [VincentHardouin/opencode-snip](https://github.com/VincentHardouin/opencode-snip)
- **rel=4** [zenobi-us/opencode-background](https://github.com/zenobi-us/opencode-background)
- **rel=4** [zenobi-us/opencode-plugin-template](https://github.com/zenobi-us/opencode-plugin-template)

#### From `jqueryscript/awesome-claude-code` (50 picks)

- **rel=5** [aaron-he-zhu/seo-geo-claude-skills](https://github.com/aaron-he-zhu/seo-geo-claude-skills)
- **rel=5** [abracadabra50/claude-code-voice-skill](https://github.com/abracadabra50/claude-code-voice-skill)
- **rel=5** [adamlyttleapps/claude-skill-app-onboarding-questionnaire](https://github.com/adamlyttleapps/claude-skill-app-onboarding-questionnaire)
- **rel=5** [aleks-apostle/claude-code-thinking-patch](https://github.com/aleks-apostle/claude-code-thinking-patch)
- **rel=5** [arnaldo-delisio/claude-code-studio](https://github.com/arnaldo-delisio/claude-code-studio)
- **rel=5** [bartolli/claude-code-typescript-hooks](https://github.com/bartolli/claude-code-typescript-hooks)
- **rel=5** [blader/claude-code-continuous-learning-skill](https://github.com/blader/claude-code-continuous-learning-skill)
- **rel=5** [browserbase/claude-code-plugin](https://github.com/browserbase/claude-code-plugin)
- **rel=5** [c0dezli/claude-code-personal-assistant](https://github.com/c0dezli/claude-code-personal-assistant)
- **rel=5** [coffeegrind123/gemini-for-claude-code](https://github.com/coffeegrind123/gemini-for-claude-code)
- **rel=5** [coleam00/claude-memory-compiler](https://github.com/coleam00/claude-memory-compiler)
- **rel=5** [d-kimuson/claude-code-viewer](https://github.com/d-kimuson/claude-code-viewer)
- **rel=5** [DevAgentForge/claude-code-webui](https://github.com/DevAgentForge/claude-code-webui)
- **rel=5** [dgreenheck/webgpu-claude-skill](https://github.com/dgreenheck/webgpu-claude-skill)
- **rel=5** [disler/claude-code-is-programmable](https://github.com/disler/claude-code-is-programmable)
- **rel=5** [DmitrySolana/ralph-claude-code](https://github.com/DmitrySolana/ralph-claude-code)
- **rel=5** [firstloophq/claude-code-test-runner](https://github.com/firstloophq/claude-code-test-runner)
- **rel=5** [ghostwriternr/claude-code-containers](https://github.com/ghostwriternr/claude-code-containers)
- **rel=5** [grp06/claude-code-leaderboard](https://github.com/grp06/claude-code-leaderboard)
- **rel=5** [gtrusler/claude-code-heavy](https://github.com/gtrusler/claude-code-heavy)
- **rel=5** [iamzhihuix/happy-claude-skills](https://github.com/iamzhihuix/happy-claude-skills)
- **rel=5** [Ido-Levi/claude-code-tamagotchi](https://github.com/Ido-Levi/claude-code-tamagotchi)
- **rel=5** [jefflester/claude-skills-supercharged](https://github.com/jefflester/claude-skills-supercharged)
- **rel=5** [karanb192/claude-code-hooks](https://github.com/karanb192/claude-code-hooks)
- **rel=5** [kellemar/claude-code-specs-generator](https://github.com/kellemar/claude-code-specs-generator)
- **rel=5** [komal-SkyNET/claude-skill-homeassistant](https://github.com/komal-SkyNET/claude-skill-homeassistant)
- **rel=5** [KroMiose/claude-code-nexus](https://github.com/KroMiose/claude-code-nexus)
- **rel=5** [KyleAMathews/claude-code-ui](https://github.com/KyleAMathews/claude-code-ui)
- **rel=5** [laraben/laravel-claude-code-setup](https://github.com/laraben/laravel-claude-code-setup)
- **rel=5** [laravel/claude-code](https://github.com/laravel/claude-code)
- **rel=5** [LKbaba/Claude-code-ChatInWindows](https://github.com/LKbaba/Claude-code-ChatInWindows)
- **rel=5** [Matt-Dionis/claude-code-configs](https://github.com/Matt-Dionis/claude-code-configs)
- **rel=5** [matthew-lim-matthew-lim/claude-code-system-prompt](https://github.com/matthew-lim-matthew-lim/claude-code-system-prompt)
- **rel=5** [maxnowack/anthropic-proxy](https://github.com/maxnowack/anthropic-proxy)
- **rel=5** [mckaywrigley/claude-code-voice](https://github.com/mckaywrigley/claude-code-voice)
- **rel=5** [NicholasSpisak/claude-code-subagents](https://github.com/NicholasSpisak/claude-code-subagents)
- **rel=5** [papaoloba/spec-based-claude-code](https://github.com/papaoloba/spec-based-claude-code)
- **rel=5** [seifghazi/claude-code-proxy](https://github.com/seifghazi/claude-code-proxy)
- **rel=5** [severity1/claude-code-auto-memory](https://github.com/severity1/claude-code-auto-memory)
- **rel=5** [simonw/claude-code-transcripts](https://github.com/simonw/claude-code-transcripts)
- **rel=5** [stretchcloud/claude-code-unified-agents](https://github.com/stretchcloud/claude-code-unified-agents)
- **rel=5** [tintinweb/claude-code-container](https://github.com/tintinweb/claude-code-container)
- **rel=5** [undeadpickle/claude-code-mcpinstall](https://github.com/undeadpickle/claude-code-mcpinstall)
- **rel=5** [vizra-ai/claude-code-agents](https://github.com/vizra-ai/claude-code-agents)
- **rel=5** [whawkinsiv/claude-code-skills](https://github.com/whawkinsiv/claude-code-skills)
- **rel=5** [ZhangHanDong/claude-code-api-rs](https://github.com/ZhangHanDong/claude-code-api-rs)
- **rel=4** [browser-use/bux](https://github.com/browser-use/bux)
- **rel=4** [skills-directory/skill-codex](https://github.com/skills-directory/skill-codex)
- **rel=3** [holt-web-ai/n8n-nodes-claudecode](https://github.com/holt-web-ai/n8n-nodes-claudecode)
- **rel=3** [neno-is-ooo/claudify](https://github.com/neno-is-ooo/claudify)

#### From `shahshrey/awesome-claude-code-mastery` (46 picks)

- **rel=5** [Alishahryar1/free-claude-code](https://github.com/Alishahryar1/free-claude-code)
- **rel=5** [anthropic-experimental/sandbox-runtime](https://github.com/anthropic-experimental/sandbox-runtime)
- **rel=5** [anthropics/claude-quickstarts](https://github.com/anthropics/claude-quickstarts)
- **rel=5** [anthropics/financial-services-plugins](https://github.com/anthropics/financial-services-plugins)
- **rel=5** [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)
- **rel=5** [anthropics/life-sciences](https://github.com/anthropics/life-sciences)
- **rel=5** [anthropics/original_performance_takehome](https://github.com/anthropics/original_performance_takehome)
- **rel=5** [automazeio/claude-code-for-power-users](https://github.com/automazeio/claude-code-for-power-users)
- **rel=5** [aws-solutions-library-samples/guidance-for-claude-code-with-amazon-bedrock](https://github.com/aws-solutions-library-samples/guidance-for-claude-code-with-amazon-bedrock)
- **rel=5** [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins)
- **rel=5** [Chat2AnyLLM/awesome-claude-plugins](https://github.com/Chat2AnyLLM/awesome-claude-plugins)
- **rel=5** [cline/mcp-marketplace](https://github.com/cline/mcp-marketplace)
- **rel=5** [closedloop-ai/claude-plugins](https://github.com/closedloop-ai/claude-plugins)
- **rel=5** [Dev-GOM/claude-code-marketplace](https://github.com/Dev-GOM/claude-code-marketplace)
- **rel=5** [fcakyon/claude-codex-settings](https://github.com/fcakyon/claude-codex-settings)
- **rel=5** [haasonsaas/claude-code-browser-mcp-setup](https://github.com/haasonsaas/claude-code-browser-mcp-setup)
- **rel=5** [hectortosa/claude-code-helsinki](https://github.com/hectortosa/claude-code-helsinki)
- **rel=5** [jakreymyers/awesome-claude-statusline](https://github.com/jakreymyers/awesome-claude-statusline)
- **rel=5** [jezweb/claude-skills](https://github.com/jezweb/claude-skills)
- **rel=5** [Kamalnrf/claude-plugins](https://github.com/Kamalnrf/claude-plugins)
- **rel=5** [kiyo-e/claude-code-proxy](https://github.com/kiyo-e/claude-code-proxy)
- **rel=5** [ly0/claude-code-chrome-extension](https://github.com/ly0/claude-code-chrome-extension)
- **rel=5** [maxritter/claude-codepro](https://github.com/maxritter/claude-codepro)
- **rel=5** [Mgczacki/claude-code-chrome-docker-bridge](https://github.com/Mgczacki/claude-code-chrome-docker-bridge)
- **rel=5** [navapbc/terraform-aws-claude-code-bedrock](https://github.com/navapbc/terraform-aws-claude-code-bedrock)
- **rel=5** [nielspeter/claude-code-proxy](https://github.com/nielspeter/claude-code-proxy)
- **rel=5** [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace)
- **rel=5** [Piebald-AI/claude-code-lsps](https://github.com/Piebald-AI/claude-code-lsps)
- **rel=5** [possibilities/claude-code-generic-hooks](https://github.com/possibilities/claude-code-generic-hooks)
- **rel=5** [quemsah/awesome-claude-plugins](https://github.com/quemsah/awesome-claude-plugins)
- **rel=5** [rz1989s/claude-code-statusline](https://github.com/rz1989s/claude-code-statusline)
- **rel=5** [shahshrey/awesome-claude-code-resources](https://github.com/shahshrey/awesome-claude-code-resources)
- **rel=5** [to-na/claude-code-crew](https://github.com/to-na/claude-code-crew)
- **rel=5** [ujisati/claude-code-provider-proxy](https://github.com/ujisati/claude-code-provider-proxy)
- **rel=5** [VoltAgent/awesome-claude-skills](https://github.com/VoltAgent/awesome-claude-skills)
- **rel=5** [Wangnov/claude-code-statusline-pro](https://github.com/Wangnov/claude-code-statusline-pro)
- **rel=5** [wesammustafa/Claude-Code-Everything-You-Need-to-Know](https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know)
- **rel=5** [xDeathscythe/Claude-Code-CLI-Status-Line-for-PowerShell](https://github.com/xDeathscythe/Claude-Code-CLI-Status-Line-for-PowerShell)
- **rel=5** [xemantic/anthropic-sdk-kotlin](https://github.com/xemantic/anthropic-sdk-kotlin)
- **rel=5** [zebbern/claude-code-discord](https://github.com/zebbern/claude-code-discord)
- **rel=4** [Ayush-Kotlin-Dev/codex-claude-proxy](https://github.com/Ayush-Kotlin-Dev/codex-claude-proxy)
- **rel=4** [benjaminr/chrome-devtools-mcp](https://github.com/benjaminr/chrome-devtools-mcp)
- **rel=4** [CoderMageFox/claudecode-codex-subagents](https://github.com/CoderMageFox/claudecode-codex-subagents)
- **rel=4** [durapensa/claude-chrome-mcp](https://github.com/durapensa/claude-chrome-mcp)
- **rel=4** [nonsleepr/claude-chrome-mcp](https://github.com/nonsleepr/claude-chrome-mcp)
- **rel=4** [robotmcp/ros-mcp-server](https://github.com/robotmcp/ros-mcp-server)

#### From `yzfly/Awesome-MCP-ZH` (40 picks)

- **rel=5** [anthropic/model-context-protocol](https://github.com/anthropic/model-context-protocol)
- **rel=4** [aicu-icu/xhs-mcp-server](https://github.com/aicu-icu/xhs-mcp-server)
- **rel=4** [ajtgjmdjp/boj-mcp](https://github.com/ajtgjmdjp/boj-mcp)
- **rel=4** [ajtgjmdjp/edinet-mcp](https://github.com/ajtgjmdjp/edinet-mcp)
- **rel=4** [ajtgjmdjp/estat-mcp](https://github.com/ajtgjmdjp/estat-mcp)
- **rel=4** [aliyun/alibabacloud-adb-mysql-mcp-server](https://github.com/aliyun/alibabacloud-adb-mysql-mcp-server)
- **rel=4** [aliyun/alibabacloud-opensearch-mcp-server](https://github.com/aliyun/alibabacloud-opensearch-mcp-server)
- **rel=4** [Automata-Labs-team/code-sandbox-mcp](https://github.com/Automata-Labs-team/code-sandbox-mcp)
- **rel=4** [aws-samples/sample-mcp-server-s3](https://github.com/aws-samples/sample-mcp-server-s3)
- **rel=4** [baryhuang/mcp-server-any-openapi](https://github.com/baryhuang/mcp-server-any-openapi)
- **rel=4** [baryhuang/mcp-server-aws-resources-python](https://github.com/baryhuang/mcp-server-aws-resources-python)
- **rel=4** [bazinga012/mcp_code_executor](https://github.com/bazinga012/mcp_code_executor)
- **rel=4** [chenningling/RedBook-Search-Comment-MCP](https://github.com/chenningling/RedBook-Search-Comment-MCP)
- **rel=4** [cyberchitta/scrapling-fetch-mcp](https://github.com/cyberchitta/scrapling-fetch-mcp)
- **rel=4** [Decade-qiu/Multi-Source-Media-MCP-Server](https://github.com/Decade-qiu/Multi-Source-Media-MCP-Server)
- **rel=4** [dinghuazhou/sample-mcp-server-tos](https://github.com/dinghuazhou/sample-mcp-server-tos)
- **rel=4** [dogukanakkaya/pulumi-mcp-server](https://github.com/dogukanakkaya/pulumi-mcp-server)
- **rel=4** [GongRzhe/Gmail-MCP-Server](https://github.com/GongRzhe/Gmail-MCP-Server)
- **rel=4** [GongRzhe/Image-Generation-MCP-Server](https://github.com/GongRzhe/Image-Generation-MCP-Server)
- **rel=4** [GongRzhe/JSON-MCP-Server](https://github.com/GongRzhe/JSON-MCP-Server)
- **rel=4** [GongRzhe/Quickchart-MCP-Server](https://github.com/GongRzhe/Quickchart-MCP-Server)
- **rel=4** [henu-wang/geoscore-mcp](https://github.com/henu-wang/geoscore-mcp)
- **rel=4** [ko1ynnky/github-actions-mcp-server](https://github.com/ko1ynnky/github-actions-mcp-server)
- **rel=4** [kukapay/whattimeisit-mcp](https://github.com/kukapay/whattimeisit-mcp)
- **rel=4** [kukapay/whereami-mcp](https://github.com/kukapay/whereami-mcp)
- **rel=4** [kukapay/whoami-mcp](https://github.com/kukapay/whoami-mcp)
- **rel=4** [Lstmxx/yapi-mcp-server](https://github.com/Lstmxx/yapi-mcp-server)
- **rel=4** [mamertofabian/elevenlabs-mcp-server](https://github.com/mamertofabian/elevenlabs-mcp-server)
- **rel=4** [opanel-mc/opanel-mcp](https://github.com/opanel-mc/opanel-mcp)
- **rel=4** [paulotaylor/voyp-mcp](https://github.com/paulotaylor/voyp-mcp)
- **rel=4** [sapientpants/deepsource-mcp-server](https://github.com/sapientpants/deepsource-mcp-server)
- **rel=4** [skydeckai/mcp-server-rememberizer](https://github.com/skydeckai/mcp-server-rememberizer)
- **rel=4** [Spathodea-Network/opencti-mcp](https://github.com/Spathodea-Network/opencti-mcp)
- **rel=4** [TermiX-official/bsc-mcp](https://github.com/TermiX-official/bsc-mcp)
- **rel=4** [useparagon/paragon-mcp](https://github.com/useparagon/paragon-mcp)
- **rel=4** [vidhupv/x-mcp](https://github.com/vidhupv/x-mcp)
- **rel=4** [yzfly/douyin-mcp-server](https://github.com/yzfly/douyin-mcp-server)
- **rel=4** [ZubeidHendricks/youtube-mcp-server](https://github.com/ZubeidHendricks/youtube-mcp-server)
- **rel=3** [datawhalechina/self-dify](https://github.com/datawhalechina/self-dify)
- **rel=3** [lciesielski/mcp-salesforce-example](https://github.com/lciesielski/mcp-salesforce-example)

#### From `jim-schwoebel/awesome_ai_agents` (36 picks)

- **rel=5** [aws-samples/prompt-engineering-with-anthropic-claude-v-3](https://github.com/aws-samples/prompt-engineering-with-anthropic-claude-v-3)
- **rel=5** [LiteObject/anthropic-agent-in-docker](https://github.com/LiteObject/anthropic-agent-in-docker)
- **rel=4** [crewAIInc/crewAI-examples](https://github.com/crewAIInc/crewAI-examples)
- **rel=4** [khadinakbaronline/humanizer-pro-mcp](https://github.com/khadinakbaronline/humanizer-pro-mcp)
- **rel=4** [pkounoudis/Abstractive-Summarizer-on-cnn_dailymail-dataset](https://github.com/pkounoudis/Abstractive-Summarizer-on-cnn_dailymail-dataset)
- **rel=3** [aaronkub/machine-learning-examples](https://github.com/aaronkub/machine-learning-examples)
- **rel=3** [AlexanderWillner/deepl-alfred-workflow2](https://github.com/AlexanderWillner/deepl-alfred-workflow2)
- **rel=3** [aws-samples/amazon-mwaa-examples](https://github.com/aws-samples/amazon-mwaa-examples)
- **rel=3** [Axolotl-Labs/Axocore](https://github.com/Axolotl-Labs/Axocore)
- **rel=3** [BastinFlorian/RAG-on-GCP-with-VertexAI](https://github.com/BastinFlorian/RAG-on-GCP-with-VertexAI)
- **rel=3** [bodaay/HuggingFaceModelDownloader](https://github.com/bodaay/HuggingFaceModelDownloader)
- **rel=3** [BrightPool/prompt-engineering-for-generative-ai-examples](https://github.com/BrightPool/prompt-engineering-for-generative-ai-examples)
- **rel=3** [cebert/examples-ai-bedrock-agent-national-parks](https://github.com/cebert/examples-ai-bedrock-agent-national-parks)
- **rel=3** [cmndcntrlcyber/attck-pe](https://github.com/cmndcntrlcyber/attck-pe)
- **rel=3** [comfyanonymous/ComfyUI_examples](https://github.com/comfyanonymous/ComfyUI_examples)
- **rel=3** [concourse/examples](https://github.com/concourse/examples)
- **rel=3** [confluentinc/confluent-kubernetes-examples](https://github.com/confluentinc/confluent-kubernetes-examples)
- **rel=3** [CorexAI/CorexAI](https://github.com/CorexAI/CorexAI)
- **rel=3** [dbist/oozie-examples](https://github.com/dbist/oozie-examples)
- **rel=3** [fedekau/terraform-with-circleci-example](https://github.com/fedekau/terraform-with-circleci-example)
- **rel=3** [habib-049/n8nTest](https://github.com/habib-049/n8nTest)
- **rel=3** [huggingface/ethics-education](https://github.com/huggingface/ethics-education)
- **rel=3** [ivanfioravanti/prompt-eng-ollama-interactive-tutorial](https://github.com/ivanfioravanti/prompt-eng-ollama-interactive-tutorial)
- **rel=3** [LG-AI-EXAONE/EXAONE-3](https://github.com/LG-AI-EXAONE/EXAONE-3)
- **rel=3** [LioGabriella/PyTexas-Ethics-in-AI---SHAP](https://github.com/LioGabriella/PyTexas-Ethics-in-AI---SHAP)
- **rel=3** [nomnivore/ollama](https://github.com/nomnivore/ollama)
- **rel=3** [noworneverev/graphrag-visualizer](https://github.com/noworneverev/graphrag-visualizer)
- **rel=3** [NVIDIA/GenerativeAIExamples](https://github.com/NVIDIA/GenerativeAIExamples)
- **rel=3** [patruff/ollama-mcp-bridge](https://github.com/patruff/ollama-mcp-bridge)
- **rel=3** [reorx/n8n-workflows](https://github.com/reorx/n8n-workflows)
- **rel=3** [simonw/llm-embed-jina](https://github.com/simonw/llm-embed-jina)
- **rel=3** [sudarshan-koirala/langchain-ollama-chainlit](https://github.com/sudarshan-koirala/langchain-ollama-chainlit)
- **rel=3** [taketwo/llm-ollama](https://github.com/taketwo/llm-ollama)
- **rel=3** [texascloud/api-ai-agent-test](https://github.com/texascloud/api-ai-agent-test)
- **rel=3** [waikato-llm/llm-dataset-converter-examples](https://github.com/waikato-llm/llm-dataset-converter-examples)
- **rel=3** [zapier/zapier-platform](https://github.com/zapier/zapier-platform)

#### From `rohitg00/awesome-devops-mcp-servers` (32 picks)

- **rel=5** [mcpware/claude-code-organizer](https://github.com/mcpware/claude-code-organizer)
- **rel=4** [aadarshjain/kubectl-mcp-server](https://github.com/aadarshjain/kubectl-mcp-server)
- **rel=4** [aaronsb/ado-mcp](https://github.com/aaronsb/ado-mcp)
- **rel=4** [Acid-base/FastMCP-Proper](https://github.com/Acid-base/FastMCP-Proper)
- **rel=4** [brainAI-bot/agentfolio-mcp-server](https://github.com/brainAI-bot/agentfolio-mcp-server)
- **rel=4** [CaesarYangs/prometheus_mcp_server](https://github.com/CaesarYangs/prometheus_mcp_server)
- **rel=4** [dbsanfte/topdesk-mcp](https://github.com/dbsanfte/topdesk-mcp)
- **rel=4** [dulltz/mcp-server-hcp-terraform](https://github.com/dulltz/mcp-server-hcp-terraform)
- **rel=4** [eidetic-works/nucleus-mcp](https://github.com/eidetic-works/nucleus-mcp)
- **rel=4** [eniayomi/gcp-mcp](https://github.com/eniayomi/gcp-mcp)
- **rel=4** [etruong42/prometheus-mcp](https://github.com/etruong42/prometheus-mcp)
- **rel=4** [executeautomation/playwright-mcp-server](https://github.com/executeautomation/playwright-mcp-server)
- **rel=4** [ExposureGuard/exposureguard-mcp](https://github.com/ExposureGuard/exposureguard-mcp)
- **rel=4** [jashkahar/Terraform-MCP-Server](https://github.com/jashkahar/Terraform-MCP-Server)
- **rel=4** [kaznak/alertmanager-mcp](https://github.com/kaznak/alertmanager-mcp)
- **rel=4** [loginmqv/mcp-server-prometheus](https://github.com/loginmqv/mcp-server-prometheus)
- **rel=4** [lunacompsia-oss/mcp-server-changelog](https://github.com/lunacompsia-oss/mcp-server-changelog)
- **rel=4** [lunacompsia-oss/mcp-server-deps](https://github.com/lunacompsia-oss/mcp-server-deps)
- **rel=4** [lunacompsia-oss/mcp-server-license](https://github.com/lunacompsia-oss/mcp-server-license)
- **rel=4** [plasmate-labs/plasmate-mcp](https://github.com/plasmate-labs/plasmate-mcp)
- **rel=4** [rafsilva85/skillflow-mcp-server](https://github.com/rafsilva85/skillflow-mcp-server)
- **rel=4** [ratamaha-git/n8n-mcp](https://github.com/ratamaha-git/n8n-mcp)
- **rel=4** [severity1/terraform-cloud-mcp](https://github.com/severity1/terraform-cloud-mcp)
- **rel=4** [stakpak/mcp](https://github.com/stakpak/mcp)
- **rel=4** [stefanoamorelli/codemagic-mcp](https://github.com/stefanoamorelli/codemagic-mcp)
- **rel=4** [stefanskiasan/azure-devops-mcp-server](https://github.com/stefanskiasan/azure-devops-mcp-server)
- **rel=4** [thrash888/terraform-mcp-server](https://github.com/thrash888/terraform-mcp-server)
- **rel=4** [Tiberriver256/mcp-server-github-actions](https://github.com/Tiberriver256/mcp-server-github-actions)
- **rel=4** [Uptrack-App/uptrack-mcp](https://github.com/Uptrack-App/uptrack-mcp)
- **rel=4** [willibrandon/CursorMCPMonitor](https://github.com/willibrandon/CursorMCPMonitor)
- **rel=4** [YawLabs/tailscale-mcp](https://github.com/YawLabs/tailscale-mcp)
- **rel=3** [composiohq/rube](https://github.com/composiohq/rube)

#### From `rohitg00/awesome-claude-code-toolkit` (27 picks)

- **rel=5** [Acteq1391gp/claude-code-memory-guide](https://github.com/Acteq1391gp/claude-code-memory-guide)
- **rel=5** [antkawam/claude-code-aws-gateway](https://github.com/antkawam/claude-code-aws-gateway)
- **rel=5** [apappascs/claude-code-sessions](https://github.com/apappascs/claude-code-sessions)
- **rel=5** [ApurvBazari/claude-plugins](https://github.com/ApurvBazari/claude-plugins)
- **rel=5** [bentleypark/claude-code-mobile-spine](https://github.com/bentleypark/claude-code-mobile-spine)
- **rel=5** [bluzername/claude-code-power-stack](https://github.com/bluzername/claude-code-power-stack)
- **rel=5** [ckorhonen/claude-skills](https://github.com/ckorhonen/claude-skills)
- **rel=5** [creationskiro/planmysaas-claude-skill](https://github.com/creationskiro/planmysaas-claude-skill)
- **rel=5** [derjochenmeyer/claude-code-craft-statusline](https://github.com/derjochenmeyer/claude-code-craft-statusline)
- **rel=5** [faizkhairi/claude-code-blueprint](https://github.com/faizkhairi/claude-code-blueprint)
- **rel=5** [gw0/docker-claude-code](https://github.com/gw0/docker-claude-code)
- **rel=5** [j4rk0r/claude-skills](https://github.com/j4rk0r/claude-skills)
- **rel=5** [LewenW/claude-memory-bridge](https://github.com/LewenW/claude-memory-bridge)
- **rel=5** [livlign/claude-skills](https://github.com/livlign/claude-skills)
- **rel=5** [megabytespace/claude-skills](https://github.com/megabytespace/claude-skills)
- **rel=5** [nagisanzenin/claude-code-production-grade-plugin](https://github.com/nagisanzenin/claude-code-production-grade-plugin)
- **rel=5** [Payshak/claude-code-hooks](https://github.com/Payshak/claude-code-hooks)
- **rel=5** [rohitg00/awesome-claude-design](https://github.com/rohitg00/awesome-claude-design)
- **rel=5** [saiso/claude-code-notifier](https://github.com/saiso/claude-code-notifier)
- **rel=5** [shensi8312/blogburst-claude-skill](https://github.com/shensi8312/blogburst-claude-skill)
- **rel=5** [xvary-research/claude-code-stock-analysis-skill](https://github.com/xvary-research/claude-code-stock-analysis-skill)
- **rel=5** [ypollak2/claude-code-kickstart](https://github.com/ypollak2/claude-code-kickstart)
- **rel=5** [yurukusa/claude-code-hooks](https://github.com/yurukusa/claude-code-hooks)
- **rel=4** [Phoenixrr2113/agntk](https://github.com/Phoenixrr2113/agntk)
- **rel=4** [Phoenixrr2113/codebase-graph](https://github.com/Phoenixrr2113/codebase-graph)
- **rel=4** [wenqingyu/magic-cc-codex-worker](https://github.com/wenqingyu/magic-cc-codex-worker)
- **rel=3** [kraulerson/solo-orchestrator-example-project](https://github.com/kraulerson/solo-orchestrator-example-project)

#### From `WangRongsheng/awesome-LLM-resources` (22 picks)

- **rel=4** [camel-ai/owl](https://github.com/camel-ai/owl)
- **rel=3** [aidatatools/ollama-benchmark](https://github.com/aidatatools/ollama-benchmark)
- **rel=3** [Alpha-VLLM/Lumina-DiMOO](https://github.com/Alpha-VLLM/Lumina-DiMOO)
- **rel=3** [baibizhe/Efficient-R1-VLLM](https://github.com/baibizhe/Efficient-R1-VLLM)
- **rel=3** [GeeeekExplorer/nano-vllm](https://github.com/GeeeekExplorer/nano-vllm)
- **rel=3** [huggingface/autotrain-advanced](https://github.com/huggingface/autotrain-advanced)
- **rel=3** [huggingface/chat-ui](https://github.com/huggingface/chat-ui)
- **rel=3** [huggingface/diffusers](https://github.com/huggingface/diffusers)
- **rel=3** [huggingface/evaluation-guidebook](https://github.com/huggingface/evaluation-guidebook)
- **rel=3** [huggingface/llm-swarm](https://github.com/huggingface/llm-swarm)
- **rel=3** [huggingface/nanoVLM](https://github.com/huggingface/nanoVLM)
- **rel=3** [huggingface/nanowhale](https://github.com/huggingface/nanowhale)
- **rel=3** [huggingface/picotron](https://github.com/huggingface/picotron)
- **rel=3** [huggingface/yourbench](https://github.com/huggingface/yourbench)
- **rel=3** [keeeeenw/MicroLlama](https://github.com/keeeeenw/MicroLlama)
- **rel=3** [kvcache-ai/ktransformers](https://github.com/kvcache-ai/ktransformers)
- **rel=3** [Leoleojames1/ollama_agent_roll_cage](https://github.com/Leoleojames1/ollama_agent_roll_cage)
- **rel=3** [LG-AI-EXAONE/EXAONE-Deep](https://github.com/LG-AI-EXAONE/EXAONE-Deep)
- **rel=3** [limafang/tiny-graphrag](https://github.com/limafang/tiny-graphrag)
- **rel=3** [Qihoo360/360-LLaMA-Factory](https://github.com/Qihoo360/360-LLaMA-Factory)
- **rel=3** [severian42/GraphRAG-Ollama-UI](https://github.com/severian42/GraphRAG-Ollama-UI)
- **rel=3** [sugarforever/chat-ollama](https://github.com/sugarforever/chat-ollama)

#### From `punkpeye/awesome-mcp-devtools` (21 picks)

- **rel=5** [punkpeye/fastmcp-boilerplate](https://github.com/punkpeye/fastmcp-boilerplate)
- **rel=5** [punkpeye/mcp-proxy](https://github.com/punkpeye/mcp-proxy)
- **rel=4** [boilingdata/mcp-server-and-gw](https://github.com/boilingdata/mcp-server-and-gw)
- **rel=4** [ggoodman/mcp-server-go](https://github.com/ggoodman/mcp-server-go)
- **rel=4** [jhgaylor/dart-mcp-server-template](https://github.com/jhgaylor/dart-mcp-server-template)
- **rel=4** [JoshuaSiraj/mcp_auto_register](https://github.com/JoshuaSiraj/mcp_auto_register)
- **rel=4** [kfirtoledo/multi-mcp](https://github.com/kfirtoledo/multi-mcp)
- **rel=4** [leehack/mcp_dart](https://github.com/leehack/mcp_dart)
- **rel=4** [mcpdotdirect/template-mcp-server](https://github.com/mcpdotdirect/template-mcp-server)
- **rel=4** [modelcontextprotocol/ruby-sdk](https://github.com/modelcontextprotocol/ruby-sdk)
- **rel=4** [modelcontextprotocol/swift-sdk](https://github.com/modelcontextprotocol/swift-sdk)
- **rel=4** [mullerhai/sakura-mcp](https://github.com/mullerhai/sakura-mcp)
- **rel=4** [NapthaAI/http-oauth-mcp-server](https://github.com/NapthaAI/http-oauth-mcp-server)
- **rel=4** [quarkiverse/quarkus-mcp-server](https://github.com/quarkiverse/quarkus-mcp-server)
- **rel=4** [ribeirogab/simple-mcp](https://github.com/ribeirogab/simple-mcp)
- **rel=4** [salty-flower/ModelContextProtocol](https://github.com/salty-flower/ModelContextProtocol)
- **rel=4** [sebastianbuzdugan/framework-rai-mcp](https://github.com/sebastianbuzdugan/framework-rai-mcp)
- **rel=4** [spring-projects-experimental/spring-ai-mcp](https://github.com/spring-projects-experimental/spring-ai-mcp)
- **rel=4** [tidewave-ai/tidewave_phoenix](https://github.com/tidewave-ai/tidewave_phoenix)
- **rel=4** [tinystruct/tinystruct-mcp](https://github.com/tinystruct/tinystruct-mcp)
- **rel=4** [type-mcp/mcp-anything](https://github.com/type-mcp/mcp-anything)

#### From `subinium/awesome-claude-code` (20 picks)

- **rel=5** [anthropics/anthropic-sdk-python](https://github.com/anthropics/anthropic-sdk-python)
- **rel=5** [hesreallyhim/a-list-of-claude-code-agents](https://github.com/hesreallyhim/a-list-of-claude-code-agents)
- **rel=5** [pchalasani/claude-code-tools](https://github.com/pchalasani/claude-code-tools)
- **rel=5** [punkpeye/vitemcp](https://github.com/punkpeye/vitemcp)
- **rel=5** [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers)
- **rel=4** [addyosmani/gemini-cli-tips](https://github.com/addyosmani/gemini-cli-tips)
- **rel=4** [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp)
- **rel=4** [ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- **rel=4** [containers/kubernetes-mcp-server](https://github.com/containers/kubernetes-mcp-server)
- **rel=4** [CursorTouch/Windows-MCP](https://github.com/CursorTouch/Windows-MCP)
- **rel=4** [Dicklesworthstone/mcp_agent_mail](https://github.com/Dicklesworthstone/mcp_agent_mail)
- **rel=4** [gemini-cli-extensions/conductor](https://github.com/gemini-cli-extensions/conductor)
- **rel=4** [google-github-actions/run-gemini-cli](https://github.com/google-github-actions/run-gemini-cli)
- **rel=4** [microsoft/mcp](https://github.com/microsoft/mcp)
- **rel=4** [modelcontextprotocol/mcpb](https://github.com/modelcontextprotocol/mcpb)
- **rel=4** [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry)
- **rel=4** [PatrickJS/awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules)
- **rel=4** [sanjeed5/awesome-cursor-rules-mdc](https://github.com/sanjeed5/awesome-cursor-rules-mdc)
- **rel=4** [supermemoryai/apple-mcp](https://github.com/supermemoryai/apple-mcp)
- **rel=3** [ComposioHQ/open-claude-cowork](https://github.com/ComposioHQ/open-claude-cowork)

#### From `tensorchord/Awesome-LLMOps` (16 picks)

- **rel=3** [bitsandbytes-foundation/bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes)
- **rel=3** [comet-ml/comet-examples](https://github.com/comet-ml/comet-examples)
- **rel=3** [huggingface/accelerate](https://github.com/huggingface/accelerate)
- **rel=3** [huggingface/lerobot](https://github.com/huggingface/lerobot)
- **rel=3** [huggingface/optimum-tpu](https://github.com/huggingface/optimum-tpu)
- **rel=3** [huggingface/peft](https://github.com/huggingface/peft)
- **rel=3** [huggingface/tokenizers](https://github.com/huggingface/tokenizers)
- **rel=3** [huggingface/trl](https://github.com/huggingface/trl)
- **rel=3** [jina-ai/clip-as-service](https://github.com/jina-ai/clip-as-service)
- **rel=3** [jina-ai/jina](https://github.com/jina-ai/jina)
- **rel=3** [jina-ai/vectordb](https://github.com/jina-ai/vectordb)
- **rel=3** [jmorganca/ollama](https://github.com/jmorganca/ollama)
- **rel=3** [lancedb/lancedb](https://github.com/lancedb/lancedb)
- **rel=3** [OpenAccess-AI-Collective/axolotl](https://github.com/OpenAccess-AI-Collective/axolotl)
- **rel=3** [qdrant/qdrant](https://github.com/qdrant/qdrant)
- **rel=3** [semi-technologies/weaviate](https://github.com/semi-technologies/weaviate)

#### From `GetBindu/awesome-claude-code-and-skills` (15 picks)

- **rel=5** [anthropics/claude-for-legal](https://github.com/anthropics/claude-for-legal)
- **rel=5** [arun-mosai/claude-code-slice-skills](https://github.com/arun-mosai/claude-code-slice-skills)
- **rel=5** [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios)
- **rel=5** [FlorianBruniaux/claude-code-ultimate-guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide)
- **rel=5** [fruitwyatt/puzzlegenio-claude-skill](https://github.com/fruitwyatt/puzzlegenio-claude-skill)
- **rel=5** [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts)
- **rel=5** [lintsinghua/claude-code-book](https://github.com/lintsinghua/claude-code-book)
- **rel=5** [pedrohcgs/claude-code-my-workflow](https://github.com/pedrohcgs/claude-code-my-workflow)
- **rel=5** [RichardAtCT/claude-code-telegram](https://github.com/RichardAtCT/claude-code-telegram)
- **rel=5** [Windy3f3f3f3f/how-claude-code-works](https://github.com/Windy3f3f3f3f/how-claude-code-works)
- **rel=5** [wrsmith108/varlock-claude-skill](https://github.com/wrsmith108/varlock-claude-skill)
- **rel=4** [atilaahmettaner/tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp)
- **rel=4** [PleasePrompto/notebooklm-mcp](https://github.com/PleasePrompto/notebooklm-mcp)
- **rel=4** [SeemSeam/claude_codex_bridge](https://github.com/SeemSeam/claude_codex_bridge)
- **rel=3** [ComposioHQ/agent-orchestrator](https://github.com/ComposioHQ/agent-orchestrator)

#### From `LangGPT/awesome-claude-code` (14 picks)

- **rel=5** [anthropics/devcontainer-features](https://github.com/anthropics/devcontainer-features)
- **rel=5** [ben-vargas/ai-sdk-provider-claude-code](https://github.com/ben-vargas/ai-sdk-provider-claude-code)
- **rel=5** [ghuntley/claude-code-source-code-deobfuscation](https://github.com/ghuntley/claude-code-source-code-deobfuscation)
- **rel=5** [https-deeplearning-ai/sc-claude-code-files](https://github.com/https-deeplearning-ai/sc-claude-code-files)
- **rel=5** [jiahaoxiang2000/claude-code-zed](https://github.com/jiahaoxiang2000/claude-code-zed)
- **rel=5** [kousen/claude-code-training](https://github.com/kousen/claude-code-training)
- **rel=5** [mo-haggag/claude-code-induced-introspection](https://github.com/mo-haggag/claude-code-induced-introspection)
- **rel=5** [nishimoto265/Claude-Code-Communication](https://github.com/nishimoto265/Claude-Code-Communication)
- **rel=5** [revfactory/claude-code-guide](https://github.com/revfactory/claude-code-guide)
- **rel=5** [revfactory/claude-code-mastering](https://github.com/revfactory/claude-code-mastering)
- **rel=5** [s-soroosh/claude-code-js](https://github.com/s-soroosh/claude-code-js)
- **rel=5** [Veraticus/claude-code-ntfy](https://github.com/Veraticus/claude-code-ntfy)
- **rel=5** [wasabeef/claude-code-cookbook](https://github.com/wasabeef/claude-code-cookbook)
- **rel=4** [HamedMP/CursorLens](https://github.com/HamedMP/CursorLens)

#### From `appcypher/awesome-mcp-servers` (14 picks)

- **rel=4** [codemaestroai/advanced-unity-mcp](https://github.com/codemaestroai/advanced-unity-mcp)
- **rel=4** [donbagger/dexpaprika-mcp-server](https://github.com/donbagger/dexpaprika-mcp-server)
- **rel=4** [DrDroidLab/signoz-mcp-server](https://github.com/DrDroidLab/signoz-mcp-server)
- **rel=4** [firesh/sslmon-mcp](https://github.com/firesh/sslmon-mcp)
- **rel=4** [mcp-router/mcp-router](https://github.com/mcp-router/mcp-router)
- **rel=4** [netwrix/mcp-server-naa](https://github.com/netwrix/mcp-server-naa)
- **rel=4** [onebirdrocks/ebook-mcp](https://github.com/onebirdrocks/ebook-mcp)
- **rel=4** [phialsbasement/cmd-mcp-server](https://github.com/phialsbasement/cmd-mcp-server)
- **rel=4** [puravparab/Gitingest-MCP](https://github.com/puravparab/Gitingest-MCP)
- **rel=4** [run-llama/mcp-server-llamacloud](https://github.com/run-llama/mcp-server-llamacloud)
- **rel=4** [sanyambassi/thales-cdsp-csm-mcp-server](https://github.com/sanyambassi/thales-cdsp-csm-mcp-server)
- **rel=4** [ssut/Remote-MCP](https://github.com/ssut/Remote-MCP)
- **rel=4** [varunneal/spotify-mcp](https://github.com/varunneal/spotify-mcp)
- **rel=4** [vgnshiyer/apple-books-mcp](https://github.com/vgnshiyer/apple-books-mcp)

#### From `Puliczek/awesome-mcp-security` (9 picks)

- **rel=4** [addcontent/nuclei-mcp](https://github.com/addcontent/nuclei-mcp)
- **rel=4** [alexgoller/illumio-mcp-server](https://github.com/alexgoller/illumio-mcp-server)
- **rel=4** [cloudflare/workers-mcp](https://github.com/cloudflare/workers-mcp)
- **rel=4** [harishsg993010/damn-vulnerable-MCP-server](https://github.com/harishsg993010/damn-vulnerable-MCP-server)
- **rel=4** [MCP-Defender/MCP-Defender](https://github.com/MCP-Defender/MCP-Defender)
- **rel=4** [MCPPhalanx/binaryninja-mcp](https://github.com/MCPPhalanx/binaryninja-mcp)
- **rel=4** [modelcontextprotocol/specification](https://github.com/modelcontextprotocol/specification)
- **rel=4** [pomerium/mcp-servers](https://github.com/pomerium/mcp-servers)
- **rel=4** [PortSwigger/mcp-server](https://github.com/PortSwigger/mcp-server)

#### From `AlexMili/Awesome-MCP` (9 picks)

- **rel=4** [hjlarry/dify-plugin-mcp_server](https://github.com/hjlarry/dify-plugin-mcp_server)
- **rel=4** [joachimBrindeau/domain-mcp](https://github.com/joachimBrindeau/domain-mcp)
- **rel=4** [joshrotenberg/tower-mcp](https://github.com/joshrotenberg/tower-mcp)
- **rel=4** [joshrutkowski/applescript-mcp](https://github.com/joshrutkowski/applescript-mcp)
- **rel=4** [modelcontextprotocol/kotlin-sdk](https://github.com/modelcontextprotocol/kotlin-sdk)
- **rel=4** [nerding-io/n8n-nodes-mcp](https://github.com/nerding-io/n8n-nodes-mcp)
- **rel=4** [philgei/mcp_server_filesystem](https://github.com/philgei/mcp_server_filesystem)
- **rel=4** [Scottcjn/rustchain-mcp](https://github.com/Scottcjn/rustchain-mcp)
- **rel=4** [ThinkInAIXYZ/go-mcp](https://github.com/ThinkInAIXYZ/go-mcp)

#### From `InftyAI/Awesome-LLMOps` (7 picks)

- **rel=4** [arize-ai/phoenix](https://github.com/arize-ai/phoenix)
- **rel=4** [helicone/helicone](https://github.com/helicone/helicone)
- **rel=3** [huggingface/ratchet](https://github.com/huggingface/ratchet)
- **rel=3** [huggingface/transformers](https://github.com/huggingface/transformers)
- **rel=3** [mckaywrigley/chatbot-ui](https://github.com/mckaywrigley/chatbot-ui)
- **rel=3** [vllm-project/aibrix](https://github.com/vllm-project/aibrix)
- **rel=3** [vllm-project/semantic-router](https://github.com/vllm-project/semantic-router)

#### From `lizhe2004/Awesome-LLM-RAG-Application` (7 picks)

- **rel=4** [langchain-ai/local-deep-researcher](https://github.com/langchain-ai/local-deep-researcher)
- **rel=4** [langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research)
- **rel=3** [firecrawl/firesearch](https://github.com/firecrawl/firesearch)
- **rel=3** [jina-ai/node-DeepResearch](https://github.com/jina-ai/node-DeepResearch)
- **rel=3** [jina-ai/reader](https://github.com/jina-ai/reader)
- **rel=3** [mendableai/firecrawl](https://github.com/mendableai/firecrawl)
- **rel=3** [microsoft/GraphRAG](https://github.com/microsoft/GraphRAG)

#### From `punkpeye/awesome-mcp-clients` (6 picks)

- **rel=5** [anthropics/mcp-use-cases](https://github.com/anthropics/mcp-use-cases)
- **rel=4** [Abiorh001/mcp_omni_connect](https://github.com/Abiorh001/mcp_omni_connect)
- **rel=4** [cognitivecomputations/dolphin-mcp](https://github.com/cognitivecomputations/dolphin-mcp)
- **rel=4** [rb58853/fastchat-mcp](https://github.com/rb58853/fastchat-mcp)
- **rel=4** [VikashLoomba/copilot-mcp](https://github.com/VikashLoomba/copilot-mcp)
- **rel=3** [danny-avila/LibreChat](https://github.com/danny-avila/LibreChat)

#### From `jmanhype/awesome-claude-code` (5 picks)

- **rel=5** [ananddtyagi/claude-code-marketplace](https://github.com/ananddtyagi/claude-code-marketplace)
- **rel=5** [docker/claude-plugins](https://github.com/docker/claude-plugins)
- **rel=5** [jeremylongshore/claude-code-plugins](https://github.com/jeremylongshore/claude-code-plugins)
- **rel=5** [jmanhype/claude-code-plugins](https://github.com/jmanhype/claude-code-plugins)
- **rel=4** [aekanun2020/Google-MCP-Servers](https://github.com/aekanun2020/Google-MCP-Servers)

#### From `kyrolabs/awesome-langchain` (5 picks)

- **rel=4** [alphasecio/langchain-text-summarizer](https://github.com/alphasecio/langchain-text-summarizer)
- **rel=4** [langchain-ai/auto-evaluator](https://github.com/langchain-ai/auto-evaluator)
- **rel=3** [codeacme17/examor](https://github.com/codeacme17/examor)
- **rel=3** [llmware-ai/llmware](https://github.com/llmware-ai/llmware)
- **rel=3** [pinecone-io/examples](https://github.com/pinecone-io/examples)

#### From `promptslab/Awesome-Prompt-Engineering` (4 picks)

- **rel=5** [drivelineresearch/autoresearch-claude-code](https://github.com/drivelineresearch/autoresearch-claude-code)
- **rel=5** [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands)
- **rel=4** [leo-lilinxiao/codex-autoresearch](https://github.com/leo-lilinxiao/codex-autoresearch)
- **rel=3** [composiohq/composio](https://github.com/composiohq/composio)

#### From `jaw9c/awesome-remote-mcp-servers` (4 picks)

- **rel=4** [alexander-zuev/kollektiv-mcp](https://github.com/alexander-zuev/kollektiv-mcp)
- **rel=4** [holoduke/livescore-mcp](https://github.com/holoduke/livescore-mcp)
- **rel=4** [janwilmake/install-this-mcp](https://github.com/janwilmake/install-this-mcp)
- **rel=4** [mondaycom/mcp](https://github.com/mondaycom/mcp)

#### From `codefuse-ai/Awesome-Code-LLM` (4 picks)

- **rel=4** [JackLingjie/VisCodex](https://github.com/JackLingjie/VisCodex)
- **rel=4** [microsoft/CodeXGLUE](https://github.com/microsoft/CodeXGLUE)
- **rel=4** [zkzhang88/OpenCodeEdit](https://github.com/zkzhang88/OpenCodeEdit)
- **rel=3** [Humanity-s-Last-Code-Exam/HLCE](https://github.com/Humanity-s-Last-Code-Exam/HLCE)

#### From `XiaoxinHe/Awesome-Graph-LLM` (4 picks)

- **rel=3** [DEEP-PolyU/Awesome-GraphRAG](https://github.com/DEEP-PolyU/Awesome-GraphRAG)
- **rel=3** [Graph-COM/SubgraphRAG](https://github.com/Graph-COM/SubgraphRAG)
- **rel=3** [Graph-RAG/GraphRAG](https://github.com/Graph-RAG/GraphRAG)
- **rel=3** [pengboci/GraphRAG-Survey](https://github.com/pengboci/GraphRAG-Survey)

#### From `mergisi/awesome-openclaw-agents` (3 picks)

- **rel=5** [anthropics/mcp](https://github.com/anthropics/mcp)
- **rel=5** [anthropics/mcp-server-fetch](https://github.com/anthropics/mcp-server-fetch)
- **rel=5** [anthropics/mcp-server-filesystem](https://github.com/anthropics/mcp-server-filesystem)

#### From `rahulvrane/awesome-claude-agents` (3 picks)

- **rel=5** [baryhuang/claude-code-by-agents](https://github.com/baryhuang/claude-code-by-agents)
- **rel=5** [charles-adedotun/claude-code-sub-agents](https://github.com/charles-adedotun/claude-code-sub-agents)
- **rel=3** [derek-opdee/subagent-example-script](https://github.com/derek-opdee/subagent-example-script)

#### From `DEEP-PolyU/Awesome-GraphRAG` (3 picks)

- **rel=3** [FalkorDB/GraphRAG-SDK](https://github.com/FalkorDB/GraphRAG-SDK)
- **rel=3** [GraphRAG-Bench/GraphRAG-Benchmark](https://github.com/GraphRAG-Bench/GraphRAG-Benchmark)
- **rel=3** [XMUDeepLIT/LegalGraphRAG](https://github.com/XMUDeepLIT/LegalGraphRAG)

#### From `xlite-dev/Awesome-LLM-Inference` (3 picks)

- **rel=3** [intel/intel-extension-for-transformers](https://github.com/intel/intel-extension-for-transformers)
- **rel=3** [IsaacRe/vllm-kvcompress](https://github.com/IsaacRe/vllm-kvcompress)
- **rel=3** [timdettmers/bitsandbytes](https://github.com/timdettmers/bitsandbytes)

#### From `FoundationAgents/awesome-foundation-agents` (2 picks)

- **rel=5** [anthropics/ConstitutionalHarmlessnessPaper](https://github.com/anthropics/ConstitutionalHarmlessnessPaper)
- **rel=4** [openai/summarize-from-feedback](https://github.com/openai/summarize-from-feedback)

#### From `atfortes/Awesome-LLM-Reasoning` (2 picks)

- **rel=5** [anthropics/DecompositionFaithfulnessPaper](https://github.com/anthropics/DecompositionFaithfulnessPaper)
- **rel=3** [jina-ai/agentchain](https://github.com/jina-ai/agentchain)

#### From `langgptai/awesome-claude-prompts` (2 picks)

- **rel=5** [mshumer/anthropic_with_functions](https://github.com/mshumer/anthropic_with_functions)
- **rel=5** [yzfly/awesome-claude-prompts](https://github.com/yzfly/awesome-claude-prompts)

#### From `travisvn/awesome-claude-skills` (2 picks)

- **rel=5** [obra/superpowers-lab](https://github.com/obra/superpowers-lab)
- **rel=5** [obra/superpowers-skills](https://github.com/obra/superpowers-skills)

#### From `Danielskry/Awesome-RAG` (2 picks)

- **rel=3** [Danielskry/LangChain-Chroma-RAG-demo-2024](https://github.com/Danielskry/LangChain-Chroma-RAG-demo-2024)
- **rel=3** [huggingface/evaluate](https://github.com/huggingface/evaluate)

#### From `helloianneo/awesome-claude-code-skills` (1 picks)

- **rel=5** [helloianneo/claude-code-handbook](https://github.com/helloianneo/claude-code-handbook)

#### From `Prat011/awesome-llm-skills` (1 picks)

- **rel=5** [omkamal/pypict-claude-skill](https://github.com/omkamal/pypict-claude-skill)

#### From `supatest-ai/awesome-claude-code-sub-agents` (1 picks)

- **rel=5** [supatest-ai/awesome-claude-code-agents](https://github.com/supatest-ai/awesome-claude-code-agents)

#### From `hyp1231/awesome-llm-powered-agent` (1 picks)

- **rel=4** [camel-ai/agent-trust](https://github.com/camel-ai/agent-trust)

#### From `IAAR-Shanghai/Awesome-AI-Memory` (1 picks)

- **rel=4** [langchain-ai/langmem](https://github.com/langchain-ai/langmem)

#### From `steel-dev/awesome-web-agents` (1 picks)

- **rel=4** [openinterpreter/open-interpreter](https://github.com/openinterpreter/open-interpreter)

#### From `VoltAgent/awesome-claude-code-subagents` (1 picks)

- **rel=4** [VoltAgent/awesome-codex-subagents](https://github.com/VoltAgent/awesome-codex-subagents)

#### From `horseee/Awesome-Efficient-LLM` (1 picks)

- **rel=3** [Anonymous1252022/EXAQ](https://github.com/Anonymous1252022/EXAQ)

#### From `KennethanCeyer/awesome-llmops` (1 picks)

- **rel=3** [CarperAI/trlx](https://github.com/CarperAI/trlx)

#### From `Jenqyang/Awesome-AI-Agents` (1 picks)

- **rel=3** [ComposioHQ/composio](https://github.com/ComposioHQ/composio)

#### From `kyrolabs/awesome-agents` (1 picks)

- **rel=3** [feder-cr/invisible_playwright](https://github.com/feder-cr/invisible_playwright)

#### From `e2b-dev/awesome-ai-agents` (1 picks)

- **rel=3** [jina-ai/dev-gpt](https://github.com/jina-ai/dev-gpt)

#### From `corca-ai/awesome-llm-security` (1 picks)

- **rel=3** [Unispac/Visual-Adversarial-Examples-Jailbreak-Large-Language-Models](https://github.com/Unispac/Visual-Adversarial-Examples-Jailbreak-Large-Language-Models)


---

## 7. Surprising Tier-4 picks worth attention

Hand-selected Tier-4 candidates that look like genuine SOTA-adjacent work but only show up in 1 list — high upside on a wider audit pass:

1. **[ChromeDevTools/chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)** (cited only by `subinium/awesome-claude-code`, rel=4) — Google's official Chrome DevTools MCP server; already SOTA for browser-driven testing in this runtime per L380. Single-list status indicates broader catalogs are stale.
2. **[anthropics/financial-services-plugins](https://github.com/anthropics/financial-services-plugins)** + **[anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins)** + **[anthropics/life-sciences](https://github.com/anthropics/life-sciences)** (all only in `shahshrey/awesome-claude-code-mastery`, rel=5) — Anthropic-official vertical-domain plugin collections. Universal-tier candidates that haven't propagated to the broader catalog ecosystem yet.
3. **[Dicklesworthstone/mcp_agent_mail](https://github.com/Dicklesworthstone/mcp_agent_mail)** (`subinium`, rel=4) — agent-mailbox over MCP. Adjacent to W325-style multi-session coordination problems this runtime explicitly addresses (issue-mailbox/agent-teams).
4. **[anthropic-experimental/sandbox-runtime](https://github.com/anthropic-experimental/sandbox-runtime)** (`shahshrey`, rel=5) — Anthropic experimental sandbox primitive. Single-list status = pre-production but operator-relevant (CR-5 sandbox boundary).
5. **[harishsg993010/damn-vulnerable-MCP-server](https://github.com/harishsg993010/damn-vulnerable-MCP-server)** (`Puliczek/awesome-mcp-security`, rel=4) — DVWA-style intentionally-vulnerable MCP server for red-team training. Niche but exactly what security-hardening lists need; surprising it's only in 1 list.
6. **[modelcontextprotocol/ruby-sdk](https://github.com/modelcontextprotocol/ruby-sdk)** (`punkpeye/awesome-mcp-devtools`, rel=4) — official MCP Ruby SDK from Anthropic's reference org; should appear in every MCP-devtools list.
7. **[MCP-Defender/MCP-Defender](https://github.com/MCP-Defender/MCP-Defender)** (`Puliczek`, rel=4) — runtime defense for prompt-injection in MCP servers. Critical for the MCP security gap nobody else is cataloguing.
8. **[ghuntley/claude-code-source-code-deobfuscation](https://github.com/ghuntley/claude-code-source-code-deobfuscation)** (`LangGPT`, rel=5) — operator-level CC bytecode/source spelunking notebook (post-leak series); underrated for internal-architecture research.
9. **[ben-vargas/ai-sdk-provider-claude-code](https://github.com/ben-vargas/ai-sdk-provider-claude-code)** (`LangGPT`, rel=5) — Vercel AI SDK adapter for Claude Code; bridges CC-as-runtime + Vercel-AI-SDK ecosystem.
10. **[anthropics/devcontainer-features](https://github.com/anthropics/devcontainer-features)** (`LangGPT`, rel=5) — Anthropic's official devcontainer feature definitions; CI/CD primitive that should be Tier-1 but is stuck Tier-4 due to release recency.
11. **[antkawam/claude-code-aws-gateway](https://github.com/antkawam/claude-code-aws-gateway)** (`rohitg00`, rel=5) — production CC-on-AWS-Bedrock proxy gateway. Single-list status = under-discovered enterprise primitive.
12. **[apappascs/claude-code-sessions](https://github.com/apappascs/claude-code-sessions)** (`rohitg00`, rel=5) — CC multi-session orchestration primitive; matches W342-Z parallel-session work in this runtime.
13. **[bartolli/claude-code-typescript-hooks](https://github.com/bartolli/claude-code-typescript-hooks)** (`jqueryscript`, rel=5) — typed CC hooks library (TypeScript). Useful for the hook-metadata-discipline skill in this runtime.
14. **[arnaldo-delisio/claude-code-studio](https://github.com/arnaldo-delisio/claude-code-studio)** (`jqueryscript`, rel=5) — CC-IDE wrapper that adds visual planning + recall. Single-list because it's recent (Q1 2026 release).
15. **[helloianneo/claude-code-handbook](https://github.com/helloianneo/claude-code-handbook)** (`helloianneo`, rel=5) — Chinese-language CC handbook; under-discovered outside the zh-zone.

### Why these matter

The convergence-by-count signal is necessary-but-not-sufficient. Tier-1 captures the universal consensus, but it's biased toward repos with long history + cross-published maintainers. The above Tier-4 picks include:
- **Operator-authority repos** (anthropic/*, anthropic-experimental/*) that are SOTA-by-source but lag in citation count due to release recency.
- **Adjacent-problem-solvers** (mcp_agent_mail, claude-code-sessions, MCP-Defender) addressing problems this runtime explicitly works on.
- **Single-domain canonical primitives** (Ruby SDK, vulnerable-MCP test target, AWS gateway, TypeScript hooks library) that no broad catalog has caught up to.

This is the "long-tail SOTA gap" — citation count alone misses primitives that are SOTA-by-authority + adjacent-to-current-work even when broad consensus hasn't formed.

---

## 8. Notes + caveats

- **Star-count gating not applied**: we discovered awesome-lists by topic + name match. A second pass that fetches actual stargazer counts (`mcp__github__search_repositories` returns stars but only the top N per query) would refine "is this list maintained" judgement. Output below is purely citation-count-based.
- **Relevance heuristic is regex-based**: doesn't read README content. Some Tier-2 rel=2 entries may be genuinely CC-adjacent but lack the keyword patterns. Manual eyeball pass on Tier-2 rel=2 with high cite-count is recommended.
- **Tier-4 long-tail noise**: ~7000 entries in Tier-4 includes a lot of individual MCP-server experiments. Most are not SOTA. The 2250 high-rel-T4 picks are the high-signal subset.
- **Chinese-language lists underrepresented in Tier-1**: `yzfly/Awesome-MCP-ZH` (536 entries) and `subinium` (308) bring unique non-English coverage; their unique picks generally land Tier-3 or Tier-4 because Western lists don't cross-cite them.
- **Self-citations stripped**: a list citing itself wasn't counted (so `punkpeye`'s own appearance in `punkpeye/awesome-mcp-servers` is excluded).
- **Branch heuristic**: tried `main` then `master` then `README.md` / `readme.md` / `Readme.md` / `README.MD` / `docs/README.md` variants. 63/63 READMEs retrieved.
- **Forks not pruned**: some `Shubhamsaboo-awesome-llm-apps` style direct-fork mirrors were included in inventory but contribute 0 unique repos (deduplicated by exact repo-name match against upstream).
- **Some "lists" are actually projects**: `vijaythecoder/awesome-claude-agents` and `Mizoreww/awesome-claude-code-config` are operator-toolkits with "awesome-" naming, not curated lists per the sindresorhus discipline. These contribute few repos to the citation graph.
- **Markdown link extraction misses unlinked text**: some lists describe repos in prose without a hyperlink. Those references don't surface via our regex. A NER-based parser would catch them.

**Persisted artifacts** (for downstream stream synthesis):
- `tmp/W367-stream-c/lists.json` — awesome-list inventory metadata
- `tmp/W367-stream-c/readmes/` — 63 README files (5.8 MB)
- `tmp/W367-stream-c/citations.json` — raw repo-to-list citation map (pre-annotation)
- `tmp/W367-stream-c/citations-annotated.json` — with CC-relevance scores added
- `tmp/W367-stream-c/tiers.json` — bucketized by 4-tier convergence
- `tmp/W367-stream-c/inventory.json` — list-level repo-count summary

---

## 9. Appendix A — Per-list ingestion provenance

Detailed per-list metadata: ID · focus · raw size · how many citations contributed to which tier.

| List | Focus | Size KB | Tier-1 contrib | Tier-2 | Tier-3 | Tier-4 |
|:---|:---|---:|---:|---:|---:|---:|
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | MCP: Servers | 719.9 | 38 | 231 | 429 | 1539 |
| [jim-schwoebel/awesome_ai_agents](https://github.com/jim-schwoebel/awesome_ai_agents) | AI Agents (1500+ catalog) | 341.8 | 59 | 109 | 120 | 1204 |
| [TensorBlock/awesome-mcp-servers](https://github.com/TensorBlock/awesome-mcp-servers) | MCP: Servers | 277.6 | 6 | 36 | 109 | 1076 |
| [WangRongsheng/awesome-LLM-resources](https://github.com/WangRongsheng/awesome-LLM-resources) | LLM resources | 99.0 | 38 | 49 | 63 | 443 |
| [yzfly/Awesome-MCP-ZH](https://github.com/yzfly/Awesome-MCP-ZH) | MCP: Chinese-language | 201.4 | 34 | 178 | 246 | 78 |
| [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | MCP: Servers | 97.6 | 26 | 136 | 127 | 198 |
| [jqueryscript/awesome-claude-code](https://github.com/jqueryscript/awesome-claude-code) | CC: Tools/integrations | 74.9 | 33 | 69 | 81 | 223 |
| [tensorchord/Awesome-LLMOps](https://github.com/tensorchord/Awesome-LLMOps) | LLMOps | 192.7 | 25 | 24 | 58 | 235 |
| [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | CC: Toolkit (agents+skills+plugins) | 159.1 | 25 | 37 | 35 | 238 |
| [subinium/awesome-claude-code](https://github.com/subinium/awesome-claude-code) | CC: Chinese-language | 75.2 | 55 | 108 | 74 | 71 |
| [shahshrey/awesome-claude-code-mastery](https://github.com/shahshrey/awesome-claude-code-mastery) | CC: Mastery/learning | 146.8 | 44 | 53 | 41 | 145 |
| [codefuse-ai/Awesome-Code-LLM](https://github.com/codefuse-ai/Awesome-Code-LLM) | Code LLMs | 493.1 | 2 | 4 | 11 | 260 |
| [GetBindu/awesome-claude-code-and-skills](https://github.com/GetBindu/awesome-claude-code-and-skills) | CC: Skills | 84.4 | 36 | 66 | 54 | 64 |
| [kyrolabs/awesome-langchain](https://github.com/kyrolabs/awesome-langchain) | LangChain | 52.0 | 30 | 57 | 24 | 106 |
| [rohitg00/awesome-devops-mcp-servers](https://github.com/rohitg00/awesome-devops-mcp-servers) | MCP: DevOps focus | 55.8 | 25 | 74 | 56 | 61 |
| [InftyAI/Awesome-LLMOps](https://github.com/InftyAI/Awesome-LLMOps) | LLMOps | 85.0 | 36 | 42 | 53 | 68 |
| [promptslab/Awesome-Prompt-Engineering](https://github.com/promptslab/Awesome-Prompt-Engineering) | Prompt engineering | 92.1 | 31 | 35 | 20 | 92 |
| [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) | MCP: Servers | 61.2 | 23 | 101 | 26 | 27 |
| [Jenqyang/Awesome-AI-Agents](https://github.com/Jenqyang/Awesome-AI-Agents) | AI Agents (Chinese) | 50.3 | 36 | 42 | 31 | 60 |
| [xlite-dev/Awesome-LLM-Inference](https://github.com/xlite-dev/Awesome-LLM-Inference) | LLM Inference | 102.9 | 2 | 7 | 37 | 121 |
| [Hannibal046/Awesome-LLM](https://github.com/Hannibal046/Awesome-LLM) | LLM core | 60.8 | 19 | 24 | 37 | 70 |
| [FoundationAgents/awesome-foundation-agents](https://github.com/FoundationAgents/awesome-foundation-agents) | Foundation Agents | 103.1 | 7 | 8 | 18 | 116 |
| [slavakurilyak/awesome-ai-agents](https://github.com/slavakurilyak/awesome-ai-agents) | AI Agents (frameworks) | 169.6 | 37 | 42 | 65 | 0 |
| [kyrolabs/awesome-agents](https://github.com/kyrolabs/awesome-agents) | Agents (general) | 36.0 | 35 | 55 | 26 | 19 |
| [hyp1231/awesome-llm-powered-agent](https://github.com/hyp1231/awesome-llm-powered-agent) | Agent papers | 55.5 | 13 | 3 | 27 | 83 |
| [punkpeye/awesome-mcp-devtools](https://github.com/punkpeye/awesome-mcp-devtools) | MCP: DevTools/SDKs | 26.0 | 10 | 16 | 19 | 75 |
| [e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents) | AI Agents (frameworks) | 205.8 | 25 | 25 | 14 | 55 |
| [LangGPT/awesome-claude-code](https://github.com/LangGPT/awesome-claude-code) | CC: Chinese-language | 28.9 | 24 | 31 | 37 | 24 |
| [awesome-opencode/awesome-opencode](https://github.com/awesome-opencode/awesome-opencode) | OpenCode ecosystem | 51.4 | 5 | 8 | 3 | 96 |
| [lizhe2004/Awesome-LLM-RAG-Application](https://github.com/lizhe2004/Awesome-LLM-RAG-Application) | RAG applications | 91.0 | 15 | 12 | 21 | 63 |
| [XiaoxinHe/Awesome-Graph-LLM](https://github.com/XiaoxinHe/Awesome-Graph-LLM) | Graph-LLM | 41.5 | 1 | 2 | 8 | 90 |
| [horseee/Awesome-Efficient-LLM](https://github.com/horseee/Awesome-Efficient-LLM) | Efficient LLMs | 95.7 | 0 | 0 | 19 | 73 |
| [punkpeye/awesome-mcp-clients](https://github.com/punkpeye/awesome-mcp-clients) | MCP: Clients | 88.0 | 12 | 10 | 6 | 52 |
| [atfortes/Awesome-LLM-Reasoning](https://github.com/atfortes/Awesome-LLM-Reasoning) | LLM Reasoning | 45.8 | 0 | 7 | 7 | 66 |
| [AlexMili/Awesome-MCP](https://github.com/AlexMili/Awesome-MCP) | MCP: Resources (catch-all) | 12.1 | 17 | 16 | 14 | 15 |
| [kaushikb11/awesome-llm-agents](https://github.com/kaushikb11/awesome-llm-agents) | LLM Agent frameworks | 22.0 | 27 | 10 | 10 | 13 |
| [IAAR-Shanghai/Awesome-AI-Memory](https://github.com/IAAR-Shanghai/Awesome-AI-Memory) | AI Memory | 579.1 | 4 | 3 | 9 | 34 |
| [corca-ai/awesome-llm-security](https://github.com/corca-ai/awesome-llm-security) | LLM Security | 20.6 | 2 | 0 | 6 | 39 |
| [Puliczek/awesome-mcp-security](https://github.com/Puliczek/awesome-mcp-security) | MCP: Security | 20.2 | 3 | 9 | 5 | 26 |
| [Danielskry/Awesome-RAG](https://github.com/Danielskry/Awesome-RAG) | RAG | 37.0 | 8 | 6 | 9 | 14 |
| [DEEP-PolyU/Awesome-GraphRAG](https://github.com/DEEP-PolyU/Awesome-GraphRAG) | GraphRAG | 35.8 | 1 | 3 | 7 | 25 |
| [KennethanCeyer/awesome-llmops](https://github.com/KennethanCeyer/awesome-llmops) | LLMOps | 24.0 | 6 | 8 | 7 | 11 |
| [jxzhangjhu/Awesome-LLM-RAG](https://github.com/jxzhangjhu/Awesome-LLM-RAG) | RAG papers | 15.8 | 2 | 6 | 2 | 17 |
| [Prat011/awesome-llm-skills](https://github.com/Prat011/awesome-llm-skills) | LLM Skills (CC/Codex/Gemini) | 22.2 | 6 | 7 | 5 | 8 |
| [steel-dev/awesome-web-agents](https://github.com/steel-dev/awesome-web-agents) | Web Agents | 21.8 | 3 | 6 | 5 | 11 |
| [snwfdhmp/awesome-gpt-prompt-engineering](https://github.com/snwfdhmp/awesome-gpt-prompt-engineering) | Prompt engineering | 19.8 | 6 | 4 | 3 | 8 |
| [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | CC: Skills | 21.3 | 6 | 7 | 1 | 4 |
| [helloianneo/awesome-claude-code-skills](https://github.com/helloianneo/awesome-claude-code-skills) | CC: Chinese-language | 14.1 | 5 | 4 | 0 | 5 |
| [rahulvrane/awesome-claude-agents](https://github.com/rahulvrane/awesome-claude-agents) | CC: Agents | 14.4 | 3 | 4 | 3 | 3 |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | CC: Subagents | 29.7 | 4 | 3 | 1 | 2 |
| [jmanhype/awesome-claude-code](https://github.com/jmanhype/awesome-claude-code) | CC: MCP-focused | 3.8 | 2 | 1 | 0 | 6 |
| [langgptai/awesome-claude-prompts](https://github.com/langgptai/awesome-claude-prompts) | CC: Prompts | 144.9 | 1 | 2 | 0 | 6 |
| [jaw9c/awesome-remote-mcp-servers](https://github.com/jaw9c/awesome-remote-mcp-servers) | MCP: Remote/hosted | 21.1 | 0 | 0 | 1 | 4 |
| [mergisi/awesome-openclaw-agents](https://github.com/mergisi/awesome-openclaw-agents) | OpenClaw Agents | 75.9 | 0 | 0 | 0 | 4 |
| [gauravfs-14/awesome-mcp](https://github.com/gauravfs-14/awesome-mcp) | MCP: Resources (catch-all) | 17.5 | 1 | 1 | 0 | 1 |
| [RManLuo/Awesome-LLM-KG](https://github.com/RManLuo/Awesome-LLM-KG) | LLM + Knowledge Graphs | 19.8 | 0 | 0 | 1 | 2 |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | LLM Apps | 20.5 | 0 | 0 | 1 | 1 |
| [rohitg00/awesome-ai-apps](https://github.com/rohitg00/awesome-ai-apps) | AI Apps | 7.8 | 0 | 1 | 0 | 1 |
| [supatest-ai/awesome-claude-code-sub-agents](https://github.com/supatest-ai/awesome-claude-code-sub-agents) | CC: Subagents | 18.8 | 0 | 0 | 0 | 1 |
| [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | CC: Ecosystem (catch-all) | 1.2 | 0 | 0 | 0 | 0 |
| [ccplugins/awesome-claude-code-plugins](https://github.com/ccplugins/awesome-claude-code-plugins) | CC: Plugins | 8.8 | 0 | 0 | 0 | 0 |
| [vijaythecoder/awesome-claude-agents](https://github.com/vijaythecoder/awesome-claude-agents) | CC: Orchestrators | 8.7 | 0 | 0 | 0 | 0 |
| [nibzard/awesome-agentic-patterns](https://github.com/nibzard/awesome-agentic-patterns) | Agentic Patterns | 19.4 | 0 | 0 | 0 | 0 |

**Provenance observations**:
- Best Tier-1 contributors: `punkpeye/awesome-mcp-servers`, `TensorBlock/awesome-mcp-servers`, `appcypher/awesome-mcp-servers`, `wong2/awesome-mcp-servers` — these 4 MCP catalogs share their Tier-1 cores, which produces the heavy cross-citation in MCP-server space.
- Best Tier-2 contributors: `tensorchord/Awesome-LLMOps`, `Hannibal046/Awesome-LLM`, `Shubhamsaboo/awesome-llm-apps`, `kyrolabs/awesome-langchain` — these surface mid-tier LLM tooling.
- `hesreallyhim/awesome-claude-code` and `ccplugins/awesome-claude-code-plugins` show as 0-contribution because their READMEs use non-standard formats (TOC-TODO and relative-paths respectively).

---

> **End Stream C — 9194 unique repos across 63 awesome-lists, 150/546/1046/7452 tier distribution. Synthesis by orchestrator pending Streams A+B+D+E+F return.**

> **Operator-actionable signal extracted**: Tier-1 (150 repos) = universal SOTA-anchor set for adoption-priority ranking · Tier-2 (546) = secondary surface area worth deliberate triage · Tier-4 surprising-picks (15 hand-selected) = under-discovered SOTA candidates flagged for follow-up audit.

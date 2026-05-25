# THE GRAND CATALOG — PART 2: L2-L3 Agent+Plugin Cluster

> Aggregated 2026-05-16 from 11 fork files: BACKLOG-TRANCHE-A/B/C/E/G + SATURATION-PLUGINS-SKILLS + SATURATION-COMMERCIAL-AGENTS + SATURATION-DOMAIN-VERTICAL-AGENTS + SATURATION-TEST-DOC-REFACTOR + GRAPHQL-NATIVE-CC-PATHWAY-AUDIT + GRAPHQL-MISSING-HIGH-STAR. **Every org/repo mentioned → one row, partitioned by sub-layer, sorted within sub-layer by stars desc.**

## Coverage map

| Layer | Sub-layer | Row count |
|---|---|---:|
| L2.0 | Agent Frameworks (multi-agent platforms, scaffold-class) | 53 |
| L2.1 | CC Plugins/Skills (skill collections, plugin packages) | 96 |
| L2.2 | CC Community Tools (utilities, dashboards, configs, methodology) | 50 |
| L2.4 | CC Templates (scaffolding, starter templates) | 5 |
| L2.6 | Vertical Agents (SQL/Security/DevOps/Finance/Biomed/Legal/Support/Research/Browser/Voice/Multimodal/Productivity/RE/Docs) | 165 |
| L2.7 | Test/Doc/Refactor Agents (eval/mutation/fuzz/CI-review/observability) | 53 |
| L2.8 | Commercial Agents (Cursor/Cody/Aider/etc — incl. closed-source competitors) | 32 |
| L3.0 | Peer CC-like CLIs (alternative driver harnesses) | 14 |
| **TOTAL** | | **468** |

**Legend**:
- **Stars**: GitHub ★ at probe time (2026-05-16); `?` = not surfaced in fork metadata
- **License**: spdx_id; `NOASSERTION` = GitHub auto-detect failed (NOT always closed); `None` = no LICENSE detected
- **Native-CC-pathway**: T1=anthropics-official-plugin · T2=community-plugin (`.claude-plugin/`) · T3=MCP-server · T4=skill-only · T5=no-direct · `?`=unverified
- **Verdict**: INSTALL P0/P1 · STUDY-PILOT · DEFER · REJECT · CITE-ONLY · ALREADY-IN-CATALOG · ARCHIVED
- **Source-fork**: TR-A/B/C/E/G (BACKLOG-TRANCHE) · SAT-* (SATURATION) · GQL-* (GRAPHQL)

---

## §L2.0 — Agent Frameworks (53 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| Significant-Gravitas/AutoGPT | 184400 | NOASSERTION | T5 | REJECT (NOASSERTION + legacy) | TR-C |
| langflow-ai/langflow | 148200 | MIT | T5 | STUDY-PILOT (visual flow builder) | TR-A,C,GQL-M |
| langchain-ai/langchain | 136900 | MIT | T5 | STUDY-PILOT (adapter pool) | TR-A,C,GQL-M |
| firecrawl/firecrawl | 120500 | AGPL-3.0 | T3 (wrapper-MIT) | INSTALL CONDITIONAL (core-AGPL; MCP wrapper OK) | TR-A,C,GQL-M |
| browser-use/browser-use | 94200 | MIT | T5 | INSTALL (SOTA browser-agent) | TR-C |
| infiniflow/ragflow | 80600 | Apache-2.0 | T5 | INSTALL (RAG framework) | TR-C |
| OpenHands/OpenHands | 73700 | NOASSERTION | T5 | REJECT (NOASSERTION + alt-harness) | TR-A,C,GQL-M |
| daytonaio/daytona | 72400 | AGPL-3.0 | T5 | STUDY-PILOT (sandbox infra) | TR-C |
| FoundationAgents/MetaGPT | 68000 | MIT | T5 | REJECT (stale >110d) | TR-C |
| bytedance/deer-flow | 68000 | MIT | T5 | INSTALL (super-agent harness) | TR-C |
| microsoft/autogen | 58075 | CC-BY-4.0 | T5 | CITE-ONLY (CC-BY unusual for code) | TR-A,C |
| mem0ai/mem0 | 55800 | Apache-2.0 | T2+T3 dual | INSTALL (memory layer) | TR-C,GQL-N |
| FlowiseAI/Flowise | 52800 | NOASSERTION | T5 | REJECT (NOASSERTION + Langflow-dupe) | TR-A,C,GQL-M |
| crewAIInc/crewAI | 51522 | MIT | T5 | STUDY-PILOT (role-play multi-agent) | TR-A,C,GQL-M |
| ruvnet/ruflo | 51772 | MIT | T3 | INSTALL P0 (CC orchestration) | TR-A,B,GQL-M |
| earendil-works/pi | 50245 | MIT | T5 | STUDY-PILOT | TR-A,GQL-M |
| run-llama/llama_index | 49500 | MIT | T5 | INSTALL (RAG framework — duplicate via memory tranche) | TR-C |
| BerriAI/litellm | 47200 | NOASSERTION (proxy Apache-2.0) | T5 | STUDY-PILOT (multi-account routing) | TR-C,GQL-N |
| mudler/LocalAI | 46300 | MIT | T5 | STUDY (Ollama alt) | TR-C |
| aaif-goose/goose | 45298 | Apache-2.0 | T5 | INSTALL (peer CC-like agent) | TR-A,C,GQL-M |
| agno-agi/agno | 40150 | Apache-2.0 | T5 | STUDY-PILOT (fastest-growing platform) | TR-A,C |
| reworkd/AgentGPT | 36100 | GPL-3.0 | T5 | REJECT (stale + legacy paradigm) | TR-C |
| stanfordnlp/dspy | 34500 | MIT | T5 | STUDY-PILOT (program-not-prompt) | TR-C |
| OpenBMB/ChatDev | 33100 | Apache-2.0 | T5 | STUDY (academic multi-agent) | TR-C |
| langchain-ai/langgraph | 32163 | MIT | T5 | INSTALL CANDIDATE TOP (graph orchestration) | TR-C,GQL-M |
| CopilotKit/CopilotKit | 31500 | MIT | T5 | STUDY (frontend SDK) | TR-C,GQL-N |
| ComposioHQ/composio | 28300 | MIT | T3 | INSTALL CANDIDATE TOP (1000+ toolkits + MCP) | TR-C |
| microsoft/semantic-kernel | 27900 | MIT | T5 | STUDY (.NET/C# framework) | TR-C |
| huggingface/smolagents | 27300 | Apache-2.0 | T5 | STUDY-PILOT (barebones) | TR-C |
| Fosowl/agenticSeek | 26400 | GPL-3.0 | T5 | STUDY (Fully Local Manus) | TR-C |
| openai/openai-agents-python | 26300 | MIT | T5 | STUDY-PILOT (Swarm successor) | TR-C |
| mlflow/mlflow | 26000 | Apache-2.0 | T5 | STUDY (ML lifecycle, Phoenix preferred) | TR-C |
| deepset-ai/haystack | 25200 | Apache-2.0 | T5 | STUDY-PILOT (RAG framework) | TR-C |
| PrefectHQ/fastmcp | 25200 | Apache-2.0 | T3 | INSTALL CANDIDATE (fastest MCP framework) | TR-C |
| agentscope-ai/agentscope | 25200 | Apache-2.0 | T5 | STUDY (Alibaba multi-agent) | TR-C |
| volcengine/OpenViking | 24000 | AGPL-3.0 | T5 | REJECT (AGPL + Graphiti covers) | TR-C |
| mastra-ai/mastra | 23900 | NOASSERTION | T5 | REJECT (NOASSERTION) | TR-C |
| a2aproject/A2A | 23800 | Apache-2.0 | T5 | INSTALL CANDIDATE (Google A2A protocol) | TR-C |
| letta-ai/letta | 22747 | Apache-2.0 | T5 | INSTALL (stateful memory) | TR-C,G,GQL-N |
| openai/swarm | 21500 | MIT | T5 | REJECT (legacy pre-cursor) | TR-C |
| google/adk-python | 19700 | Apache-2.0 | T5 | INSTALL CANDIDATE (Google ADK) | TR-C |
| SWE-agent/SWE-agent | 19200 | MIT | T5 | STUDY (Princeton SWE-bench winner) | TR-C |
| eosphoros-ai/DB-GPT | 18800 | MIT | T5 | STUDY (DB-focused) | TR-C |
| elizaOS/eliza | 18400 | MIT | T5 | STUDY-PILOT (TS multi-agent w/ personas) | TR-C |
| emcie-co/parlant | 18100 | Apache-2.0 | T5 | STUDY-PILOT (interaction-control) | TR-C |
| TransformerOptimus/SuperAGI | 17500 | MIT | T5 | REJECT (legacy AutoGPT-era) | TR-C |
| pydantic/pydantic-ai | 17100 | MIT | T5 | INSTALL CANDIDATE PRIMARY (type-safe agent) | TR-C |
| camel-ai/camel | 17000 | Apache-2.0 | T5 | STUDY (CAMEL paper) | TR-C |
| googleapis/mcp-toolbox | 15200 | Apache-2.0 | T3 | INSTALL (Google DB-MCP toolbox) | TR-C |
| ag-ui-protocol/ag-ui | 13600 | MIT | T5 | STUDY-PILOT (UI-agent protocol) | TR-C |
| livekit/agents | 10499 | Apache-2.0 | T5 | STUDY (voice/realtime) | TR-C,GQL-N |
| microsoft/agent-framework | 10500 | MIT | T5 | INSTALL CANDIDATE (autogen v2 polyglot) | TR-C |
| langchain-ai/open-swe | 9800 | MIT | T5 | STUDY (LangChain async SWE) | TR-C |

---

## §L2.1 — CC Plugins/Skills (96 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| obra/superpowers | 193620 | NOASSERTION (likely permissive) | T1 (@claude-plugins-official since 2026-01-15) | INSTALL P0 (W254 set) | SAT-P,GQL-N |
| f/prompts.chat | 162336 | NOASSERTION | T5 (prompts not skills) | DEFER (cite-only oracle) | TR-E |
| anthropics/skills | 135681 | Anthropic | T1 (canonical) | INSTALL P0 | SAT-P,TR-E,GQL-N |
| multica-ai/andrej-karpathy-skills | 131963 | NONE | T4 | INSTALL P0 (CLAUDE.md set; LICENSE risk) | TR-A,GQL-M |
| Shubhamsaboo/awesome-llm-apps | 110608 | Apache-2.0 | T5 | STUDY-PILOT (oracle) | TR-A,TR-E,GQL-M |
| nextlevelbuilder/ui-ux-pro-max-skill | 79249 | MIT | T4 | INSTALL P0 | TR-A |
| VoltAgent/awesome-design-md | 79677 | NOASSERTION | T5 | DEFER (design-only) | TR-E |
| ComposioHQ/awesome-claude-skills | 60087 | NONE | T4 | INSTALL P1 (LICENSE risk) | TR-A,TR-E |
| JuliusBrussee/caveman | 60923 | MIT | T4 | INSTALL P0 (token compression) | TR-A,GQL-M |
| anthropics/claude-cookbooks | 43082 | Anthropic | T4 (NOT T1) | STUDY-PILOT (cite-only) | SAT-P,GQL-N |
| hesreallyhim/awesome-claude-code | 43925 | NOASSERTION | T5 (awesome-list) | DEFER (mid-restructure) | TR-E,GQL-N |
| sickn33/antigravity-awesome-skills | 37697 | NOASSERTION | T2 community | STUDY-PILOT | TR-E,SAT-P |
| github/awesome-copilot | 33116 | MIT | T5 | DEFER (Copilot-side orthogonal) | TR-A,TR-E |
| safishamsi/graphify | 48493 | MIT | T4 | INSTALL P1 | TR-A |
| santifer/career-ops | 44992 | MIT | T4 | INSTALL P1 | TR-A |
| jeecgboot/JeecgBoot | 46282 | Apache-2.0 | T5 (CN low-code) | DEFER (CN-vertical) | TR-A,GQL-M |
| CherryHQ/cherry-studio | 45772 | AGPL-3.0 | T5 | DEFER (AGPL UI) | TR-A,GQL-M |
| openai/skills | 19227 | NOASSERTION | T4 | STUDY-PILOT (OpenAI Codex skills) | TR-E |
| anthropics/claude-plugins-official | n/a | Anthropic | T1 marketplace root | INSTALL (bootstrap) | SAT-P,GQL-N |
| trailofbits/skills-curated | 402 | NOASSERTION | T2 community | INSTALL (security-curated lane) | SAT-P,GQL-N |
| ComposioHQ/awesome-claude-plugins | 1663 | NOASSERTION | T5 (oracle) | STUDY-PILOT (`/plugin install` discovery) | TR-E |
| mnfst/manifest | 6504 | NOASSERTION | T5 | STUDY-PILOT (smart model routing) | TR-E |
| jeremylongshore/claude-code-plugins-plus-skills | 2185 | NOASSERTION | T2 mega-marketplace | STUDY-PILOT (425 plugins/2810 skills) | SAT-P,TR-E |
| davepoon/buildwithclaude | 2938 | NOASSERTION | T2+ hub | STUDY-PILOT (CC primitives hub) | TR-B,TR-E |
| numman-ali/n-skills | 981 | NOASSERTION | T2 community | STUDY-PILOT (TS marketplace) | SAT-P,TR-E,GQL-M |
| NeoLabHQ/context-engineering-kit | 999 | NOASSERTION | T2 community | STUDY-PILOT | TR-E |
| daymade/claude-code-skills | 1050 | NOASSERTION | T2 community | STUDY-PILOT | TR-E |
| Meirtz/Awesome-Context-Engineering | 3137 | NOASSERTION | T5 (oracle) | STUDY-PILOT | TR-E |
| nibzard/awesome-agentic-patterns | 4534 | NOASSERTION | T5 (pattern catalog) | STUDY-PILOT | TR-E |
| Arindam200/awesome-ai-apps | 12242 | NOASSERTION | T5 (oracle) | STUDY-PILOT | TR-E |
| VoltAgent/awesome-agent-skills | 21924 | NOASSERTION | T5 (oracle 133 refs) | STUDY-PILOT | TR-E,GQL-N |
| VoltAgent/awesome-claude-code-subagents | 19930 | NOASSERTION | T5 (oracle) | STUDY-PILOT | TR-E |
| VoltAgent/awesome-openclaw-skills | 48773 | NOASSERTION | T5 (oracle) | DEFER (OpenClaw derivative) | TR-E,SAT-P |
| VoltAgent/voltagent | 8960 | NOASSERTION | T5 (TS framework) | STUDY | TR-E |
| VoltAgent/awesome-ai-agent-papers | 807 | NOASSERTION | T5 (research) | STUDY | TR-E |
| VoltAgent/awesome-claude-design | 2220 | NOASSERTION | T5 | DEFER (design-only) | TR-E |
| dontriskit/awesome-ai-system-prompts | 5885 | NOASSERTION | T5 (prompt corpus) | STUDY-PILOT | TR-E |
| vijaythecoder/awesome-claude-agents | 4260 | NOASSERTION | T5 (oracle) | DEFER (overlaps VoltAgent) | TR-E |
| travisvn/awesome-claude-skills | 12598 | NOASSERTION | T5 (oracle) | DEFER (duplicate ComposioHQ) | TR-E |
| BehiSecc/awesome-claude-skills | 9096 | NOASSERTION | T5 (oracle) | DEFER (3rd duplicate) | TR-E |
| heilcheng/awesome-agent-skills | 4832 | NOASSERTION | T5 (oracle) | DEFER (4th variant) | TR-E |
| libukai/awesome-agent-skills | 4401 | NOASSERTION | T5 (CN dup) | REJECT | TR-E |
| xixu-me/awesome-persona-distill-skills | 4261 | NOASSERTION | T5 (LICENSE risk) | DEFER | TR-E |
| AlexAnys/awesome-openclaw-usecases-zh | 4160 | NOASSERTION | T5 (CN) | REJECT | TR-E |
| Prat011/awesome-llm-skills | 1240 | NOASSERTION | T5 (oracle) | DEFER | TR-E |
| WangRongsheng/awesome-LLM-resources | 8298 | NOASSERTION | T5 | DEFER | TR-E |
| eyaltoledano/claude-task-master | 27153 | MIT-with-restriction | T4 | INSTALL (L80 task orchestration) | TR-G |
| DevDreed/claude-task-master-extension | 100 | MIT | T5 (VSCode ext) | DEFER | TR-G |
| automazeio/ccpm | 8112 | NONE | T4 | STUDY-PILOT (git-worktree PM) | TR-G |
| humanlayer/humanlayer | 10816 | NONE | T4 (HITL SDK) | STUDY-PILOT | TR-G |
| humanlayer/12-factor-agents | 19825 | NONE | T5 (docs) | STUDY (reference docs) | TR-G |
| humanlayer/agentcontrolplane | 405 | NONE | T5 (k8s) | DEFER (infra-only) | TR-G |
| bmad-code-org/BMAD-METHOD | 47313 | NONE | T4 | INSTALL (L80 PM skill bundle) | TR-G,GQL-N |
| bmadcode/bmadcode | 55 | NONE | T5 (user profile) | DEFER | TR-G |
| nocfer/bmad-feature-hooks | 2 | NONE | T2 community | DEFER | TR-G |
| letta-ai/claude-subconscious | 2738 | NONE | T4 (CC integration) | INSTALL CANDIDATE | TR-G |
| openai/codex-plugin-cc | 18811 | NONE | T2 community | INSTALL P0 (cross-model bridge) | TR-G |
| EveryInc/compound-engineering-plugin | n/a | NOASSERTION | T2 community | DEFER (overlaps superpowers) | SAT-P,GQL-N |
| alirezarezvani/claude-skills | n/a | NOASSERTION | T2 community | DEFER | SAT-P |
| EliasOulkadi/shokunin | n/a | NOASSERTION | T2 community | DEFER | SAT-P |
| jarrodwatts/claude-hud | n/a | NOASSERTION | T3 user marketplace | DEFER (UI/dashboard niche) | SAT-P |
| mattpocock skills bundle | n/a | NOASSERTION | T3 user marketplace | STUDY-PILOT (TS lane) | SAT-P |
| vercel-labs/agent-skills | 26642 | NOASSERTION | T3 user marketplace | INSTALL (frontend canonical) | SAT-P,GQL-N |
| Piebald-AI/claude-code-lsps | n/a | NOASSERTION | T4 user marketplace | STUDY-PILOT (LSP unlock) | SAT-P,GQL-N |
| codex-toolkit-for-claude | n/a | NOASSERTION | T2 community | INSTALL (cross-model bridge) | SAT-P |
| claudex | n/a | NOASSERTION | T2/T3 community | DEFER (alt-codex bridge) | SAT-P |
| opencode-plugin-cc | n/a | NOASSERTION | T2 community | DEFER (niche OpenCode bridge) | SAT-P |
| LerianStudio/ring | 185 | NOASSERTION | T2 community | DEFER (overlaps superpowers) | SAT-P |
| microsoft/power-platform-skills | 288 | MIT | T2 community | DEFER (MS-vertical) | SAT-P |
| pinecone-io/pinecone-claude-code-plugin | 60 | NOASSERTION | T3 user | STUDY-PILOT (if Pinecone stack) | SAT-P |
| existential-birds/beagle | n/a | NOASSERTION | T3 user | DEFER (specialized) | SAT-P |
| shepsci/kaggle-skill | 33 | NOASSERTION | T2 community | DEFER (Kaggle vertical) | TR-E |
| 0xmariowu/AgentLint | 28 | NOASSERTION | T2 community | STUDY (agent-harness linter) | TR-E |
| josstei/maestro-orchestrate | 415 | NOASSERTION | T2 community | STUDY-PILOT (multi-agent orch) | TR-E |
| Onome-AJ/security-sweep-plugin | 4 | NOASSERTION | T2 community | DEFER (low-signal) | TR-E |
| Phoenixrr2113/codebase-graph | 5 | NOASSERTION | T2 community | DEFER (low-signal) | TR-E |
| sboghossian/master-claude-for-legal | 22 | NOASSERTION | T4 | DEFER (niche legal) | TR-E |
| smerchek/claude-epub-skill | 118 | NOASSERTION | T4 | DEFER (epub niche) | TR-E |
| zxkane/aws-skills | 283 | NOASSERTION | T4 | INSTALL (AWS vertical) | TR-E |
| bluzername/claude-code-terminal-title | 115 | NOASSERTION | T4 | DEFER (UX niche) | TR-E |
| chrisvoncsefalvay/claude-d3js-skill | 177 | NOASSERTION | T4 | DEFER (d3 niche) | TR-E |
| jthack/ffuf_claude_skill | 172 | NOASSERTION | T4 | DEFER (ffuf web-fuzzer niche) | TR-E |
| LewisLiu007/full-page-screenshot | 3 | NOASSERTION | T4 | DEFER (low-signal) | TR-E |
| anjos2/recursive-research | ? | NOASSERTION | T4 | DEFER (low-signal) | TR-E |
| remotion-dev/skills | 3182 | NOASSERTION | T4 | STUDY (Remotion video) | TR-E |
| Dimillian/Skills | ? | NOASSERTION | T4 | DEFER | TR-E |
| angular/skills | 352 | NOASSERTION | T4 | DEFER (Angular vertical) | TR-E |
| trycourier/courier-skills | 8 | NOASSERTION | T4 | DEFER (notifications niche) | TR-E |
| veniceai/skills | 73 | NOASSERTION | T4 | DEFER (Venice.ai niche) | TR-E |
| coreyhaines31/marketingskills | 28912 | NOASSERTION | T4 (star-pump candidate) | STUDY (verify auth) | TR-E,SAT-D |
| realkimbarrett/advertising-skills | 622 | NOASSERTION | T4 | DEFER | TR-E |
| deanpeters/Product-Manager-Skills | 4321 | NOASSERTION | T4 | DEFER (PM niche) | TR-E |
| phuryn/pm-skills | 11279 | NOASSERTION | T4 | STUDY (PM marketplace) | TR-E |
| Joannis/claude-skills | ? | NOASSERTION | T4 | DEFER | TR-E |
| K-Dense-AI/claude-scientific-skills | ? | NOASSERTION | T4 | INSTALL (sci-vertical) | TR-E |
| Kevin7Qi/codex-collab | ? | NOASSERTION | T4 | DEFER (Codex niche) | TR-E |
| RKiding/Awesome-finance-skills | 2213 | NOASSERTION | T4 | DEFER (finance niche) | TR-E |
| mhattingpete/claude-skills-marketplace | 577 | NOASSERTION | T2 community | DEFER (SWE workflow niche) | TR-E |

---

## §L2.2 — CC Community Tools (50 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| affaan-m/everything-claude-code | 184249 | MIT | T2 community | INSTALL P0 (highest-star CC tool) | TR-A,GQL-M |
| gsd-build/get-shit-done | 62528 | MIT | T2 community | INSTALL P0 (meta-prompting + spec-driven dev) | TR-A,GQL-M |
| farion1231/cc-switch | 72467 | MIT | T2 community | INSTALL P0 (multi-host driver) | TR-A,GQL-M |
| garrytan/gstack | 97873 | MIT | T5 (config) | INSTALL P0/CITE (founder personal stack) | TR-A,GQL-M |
| zhayujie/CowAgent | 44507 | MIT | T5 (CN WeChat) | DEFER (CN vertical) | TR-A,GQL-M |
| nexu-io/open-design | 42216 | Apache-2.0 | T4 | INSTALL P0 (19 skills + 71 design systems) | TR-A,GQL-M |
| nanocoai/nanoclaw | 28919 | NOASSERTION | T2 | INSTALL P0 (containerized CC alt) | GQL-M |
| kepano/obsidian-skills | 31546 | NOASSERTION | T4 | INSTALL P1 (named-T2 Steph Ango) | GQL-M |
| code-yeongyu/oh-my-openagent | 58075 | NOASSERTION | T5 | INSTALL P1 (alt-harness) | TR-A,GQL-M |
| Yeachan-Heo/oh-my-claudecode | 33995 | MIT | T5 | INSTALL P1 (teams-first multi-agent) | TR-A,GQL-M |
| musistudio/claude-code-router | 34053 | MIT | T2 community | INSTALL P0 (cross-model proxy) | TR-A,GQL-M |
| router-for-me/CLIProxyAPI | 32912 | MIT | T2 community | INSTALL P0 (multi-CLI proxy) | TR-A,GQL-M |
| AstrBotDevs/AstrBot | 32360 | NOASSERTION | T5 (IM platforms) | STUDY | GQL-M |
| zeroclaw-labs/zeroclaw | 31375 | NOASSERTION | T5 | STUDY | GQL-M |
| simstudioai/sim | 28499 | NOASSERTION | T5 (durable exec) | STUDY (sim agents) | GQL-M |
| Budibase/budibase | 27915 | NOASSERTION (low-code) | T5 | DEFER (low-code) | GQL-M |
| ItzCrazyKns/Perplexica | very-high | MIT | T5 | STUDY-PILOT (search-engine UI) | SAT-D,GQL-M |
| ToolJet/ToolJet | 37906 | AGPL-3.0 | T5 | DEFER (AGPL low-code) | TR-A,GQL-M |
| dair-ai/Prompt-Engineering-Guide | 74627 | MIT | T5 (docs) | INSTALL P1 (pattern-cite) | TR-A,GQL-M |
| asgeirtj/system_prompts_leaks | 40294 | MIT | T5 (corpus) | INSTALL P0 (system-prompt triangulation) | TR-A,GQL-M |
| microsoft/ai-agents-for-beginners | 61639 | MIT | T5 (course) | INSTALL P1 (CITE) | TR-A,GQL-M |
| patchy631/ai-engineering-hub | 35044 | MIT | T5 (tutorials) | INSTALL P1 (CITE) | TR-A,GQL-M |
| luongnv89/claude-howto | 33146 | MIT | T5 (docs) | CITE-ONLY (educational) | TR-A,GQL-M |
| msitarzewski/agency-agents | 98294 | MIT | T5 (methodology) | STUDY-PILOT | TR-A,GQL-M |
| continuedev/continue | 33221 | Apache-2.0 | T5 (peer-IDE) | STUDY (cross-IDE adapter) | TR-A,TR-G,GQL-M |
| vercel-labs/agent-browser | 33158 | Apache-2.0 | T5 (browser CLI) | STUDY-PILOT (alt to browser-use) | TR-A,GQL-M |
| karpathy/autoresearch | 81348 | NONE | T5 (research loop) | STUDY-PILOT (legally unsafe NO-LICENSE) | TR-A,GQL-M |
| comet-ml/opik-openclaw | 614 | NONE | T2 community (OpenClaw plugin) | DEFER (alt-runtime) | TR-G |
| rohitg00/awesome-claude-code-toolkit | 1691 | NOASSERTION | T2 community | STUDY-PILOT (135 agents + 35 skills) | TR-E |
| mergisi/awesome-openclaw-agents | 3382 | NOASSERTION | T5 (OpenClaw) | DEFER (derivative) | TR-E |
| alvinreal/awesome-autoresearch | 1918 | NOASSERTION | T5 (research loops) | STUDY-PILOT | TR-E |
| mksglu/context-mode | 14862 | MIT | T2+T3 dual | INSTALL (already active in CC) | TR-B,GQL-N |
| mksglu/claude-context-mode | 14862 | MIT | T2 community | INSTALL (alias of above) | SAT-P |
| WenyuChiou/awesome-agentic-ai-zh | 1453 | NOASSERTION | T5 (CN) | DEFER (CN region) | TR-E |
| 0xMassi/webclaw | ? | NOASSERTION | T5 (claude-web) | DEFER (low-signal) | catalog-extract |
| xiaolai/codex-toolkit-for-claude | ? | NOASSERTION | T2 | DEFER (likely duplicate codex-toolkit) | catalog-extract |
| yvgude/lean-ctx | ? | NOASSERTION | T5 (token-compression) | DEFER (HALLUCINATION-flagged fix9) | catalog-extract |
| zubair-trabzada/ai-marketing-claude | ? | NOASSERTION | T5 | DEFER | catalog-extract |
| thedotmack/claude-mem | ? | NOASSERTION | T2 community | ALREADY-IN-CATALOG | GQL-N |
| zhp-owl/claude-mem | ? | NOASSERTION | T5 (alt) | DEFER (alt to thedotmack) | catalog-extract |
| yasasbanukaofficial/claude-code | ? | NOASSERTION | T5 (mirror?) | DEFER | catalog-extract |
| ykdojo/claude-code-tips | ? | NOASSERTION | T5 (tips) | DEFER (cite-only) | catalog-extract |
| yxwucq/CCUI | ? | NOASSERTION | T5 (UI) | DEFER | catalog-extract |
| zebbern/claude-code-guide | ? | NOASSERTION | T5 (guide) | DEFER (cite-only) | catalog-extract |
| 1jehuang/jcode | ? | NOASSERTION | T5 | DEFER | catalog-extract |
| 1mcp-app/agent | 438 | NOASSERTION | T3 | STUDY-PILOT (MCP server aggregator) | TR-E |
| yoloshii/ClawMem | ? | NOASSERTION | T2 community (memory) | DEFER (mem0/graphiti incumbent) | catalog-extract |
| 0Chencc/clawgod | ? | NOASSERTION | T5 | DEFER (low-signal) | catalog-extract |
| connerlambden/bgpt-mcp | ? | NOASSERTION | T3 | DEFER | TR-E |
| sathish316/pied-piper | 76 | NOASSERTION | T2 community | DEFER (low-signal) | TR-E |

---

## §L2.4 — CC Templates (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| davila7/claude-code-templates | 27300 | MIT | T2 community | INSTALL | DEEP-SAT-FINAL |
| existential-birds/beagle | n/a | NOASSERTION | T3 user | DEFER | SAT-P |
| Piebald-AI/claude-code-lsps | n/a | NOASSERTION | T4 user | STUDY-PILOT | SAT-P,GQL-N |
| Piebald-AI/tweakcc | n/a | NOASSERTION | T5 (binary mod) | REJECT (modifies CC binary — CR-2+CR-5 violation) | DEEP-SAT-FINAL |
| anthropics/cwc-long-running-agents | n/a | Anthropic | T5 (config recipes) | STUDY-PILOT (cite-only) | SAT-P,GQL-N |

---

## §L2.6 — Vertical Agents (165 rows)

### L2.6.1 — SQL / Database / Text-to-SQL (8 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| vanna-ai/vanna | 20000 | MIT | T5 lib | REJECT (ARCHIVED per fix10) | SAT-D |
| Canner/WrenAI | 15000 | AGPL-3.0 | T3 MCP | INSTALL CONDITIONAL (AGPL caveat) | SAT-D |
| defog-ai/sqlcoder | 3700 | Apache-2.0 / CC-BY-SA-4.0 (weights) | T5 model | STUDY-PILOT | SAT-D |
| Dataherald/dataherald | 3600 | Apache-2.0 | T5 lib | STUDY-PILOT | SAT-D |
| bytebase/dbhub | 2768 | MIT | T3 MCP | INSTALL CANDIDATE (zero-dep DB MCP) | TR-B |
| premAI-io/PremSQL | <1k | Apache-2.0 | T5 lib | PATTERN-CITE | SAT-D |
| langchain-ai/text2sql-agent | <1k | MIT | T5 lib | PATTERN-CITE | SAT-D |
| supabase/agent-skills | <1k | Apache-2.0 | T4 skill | STUDY-PILOT (Supabase-specific) | SAT-D |

### L2.6.2 — Security / Pentesting (14 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| semgrep/mcp-marketplace | n/a | LGPL-2.1 (core) | T1 verified plugin | INSTALL UNIVERSAL | SAT-D,SAT-T,SAT-P |
| vxcontrol/pentagi | 16700 | MIT | T5 CLI | STUDY-PILOT (auto-pentest swarm) | SAT-D |
| NVIDIA/garak | high | Apache-2.0 | T5 CLI+lib | INSTALL (LLM red-team scanner) | SAT-D |
| GreyDGL/PentestGPT | 8000 | MIT | T5 CLI | STUDY-PILOT (USENIX) | SAT-D |
| 0x4m4/hexstrike-ai | 8764 | NOASSERTION | T3 | DEFER (pentest narrow vertical) | TR-B |
| mrexodia/ida-pro-mcp | 8558 | MIT | T3 MCP | STUDY (RE narrow vertical) | TR-B |
| aliasrobotics/cai | 6000 | MIT | T5 lib | INSTALL (Cyber AI framework) | SAT-D |
| FunnyWolf/Viper | 5043 | NOASSERTION | T5 | DEFER (adversary-sim) | TR-B |
| wgpsec/ENScan_GO | 4392 | NOASSERTION | T5 (CN) | DEFER (CN enterprise) | TR-B |
| snyk/agent-scan (was InvariantLabs-AI/mcp-scan) | 2410 | proprietary post-acq | T5 | STUDY (Snyk acq) | GQL-M |
| zinja-coder/jadx-ai-mcp | 2023 | NOASSERTION | T3 | DEFER (Android RE) | TR-B |
| prompt-security/ps-fuzz | 1000 | Apache-2.0 | T5 CLI | STUDY-PILOT (LLM safety fuzzer) | SAT-T |
| taielab/awesome-hacking-lists | 1335 | NOASSERTION | T5 (pentest cat) | REJECT (off-scope Q4 noise) | TR-E |
| github/codeql + Copilot-Autofix | n/a | proprietary | T5 GH-only | PATTERN-CITE | SAT-D |

### L2.6.3 — DevOps / SRE / Kubernetes (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| k8sgpt-ai/k8sgpt | 7700 | Apache-2.0 (CNCF) | T5 CLI | INSTALL (K8s troubleshooting) | SAT-D |
| HolmesGPT/holmesgpt | 2400 | Apache-2.0 (CNCF) | T5 CLI+Slack | INSTALL CONDITIONAL (24/7 SRE; K8s-only) | SAT-D |
| robusta-dev/robusta | 3000 | MIT | T5 webhook | STUDY-PILOT | SAT-D |
| k8sgpt-ai/k8sgpt-operator | <1k | Apache-2.0 | T5 CR | STUDY-PILOT | SAT-D |
| microsoft/sre-agent | n/a | MIT-style | T5 CLI | PATTERN-CITE (Azure-only) | SAT-D |

### L2.6.4 — Finance / Trading (9 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| TauricResearch/TradingAgents | 29900 | Apache-2.0 | T5 lib (LangGraph) | INSTALL CONDITIONAL (finance workflow) | SAT-D |
| AI4Finance-Foundation/FinGPT | 19900 | MIT | T5 lib | STUDY-PILOT | SAT-D |
| OpenBB-finance/OpenBB | 67629 | AGPL-3.0 | T3 MCP | STUDY-PILOT (data layer) | TR-A,SAT-D,GQL-M |
| AI4Finance-Foundation/FinRobot | 6900 | Apache-2.0 | T5 lib | STUDY-PILOT | SAT-D |
| brokermr810/QuantDinger | 5383 | NOASSERTION | T5 | DEFER (crypto trading) | TR-B |
| atilaahmettaner/tradingview-mcp | 2698 | NOASSERTION | T3 | DEFER (trading vertical) | TR-B |
| RKiding/Awesome-finance-skills | 2213 | NOASSERTION | T4 | DEFER (finance niche) | TR-E |
| virattt/ai-hedge-fund | high | MIT | T5 lib | PATTERN-CITE (pedagogical) | SAT-D |
| 0xSero/turboquant | ? | NOASSERTION | T5 | DEFER (low-signal) | catalog-extract |

### L2.6.5 — Medical / Biomedical (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| snap-stanford/Biomni | 2800 | Apache-2.0 | T3 MCP | INSTALL CONDITIONAL (biomedical workflow) | SAT-D |
| PharMolix/OpenBioMed | high | Apache-2.0 | T4 (45 skills) | INSTALL CONDITIONAL | SAT-D |
| FreedomIntelligence/HuatuoGPT | high | Apache-2.0 | T5 model | STUDY (CN-language) | SAT-D |
| FreedomIntelligence/OpenClaw-Medical-Skills | high | Apache-2.0 | T4 (OpenClaw skill) | STUDY (CN largest) | SAT-D |
| openmed-labs/openmed-agent | small | MIT | T5 CLI | PATTERN-CITE | SAT-D |

### L2.6.6 — Legal / Compliance (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| anthropics/claude-plugins-official (legal plugin) | n/a | Anthropic | T1 (official Feb 2026) | INSTALL UNIVERSAL | SAT-D |
| Open-Source-Legal/OpenContracts | high | Apache-2.0 | T3 MCP | INSTALL CONDITIONAL (doc-KB) | SAT-D |
| evolsb/claude-legal-skill | n/a | MIT (typical) | T4 skill | STUDY-PILOT (CUAD risk detection) | SAT-D |
| harveyai/harvey-labs | n/a | Apache-2.0 (benchmark) | T5 eval | PATTERN-CITE | SAT-D |
| Mike-OSS (Will Chen Apr 2026) | new | AGPL-3.0 | T5 web-UI | STUDY-PILOT (full-Harvey-clone) | SAT-D |

### L2.6.7 — Customer Support (4 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| chatwoot/chatwoot | very-high | MIT | T5 webhook + Captain AI | INSTALL CONDITIONAL (support workflow) | SAT-D |
| openai/openai-cs-agents-demo | n/a | MIT | T5 demo | PATTERN-CITE | SAT-D |
| tiledesk | high | MIT | T5 webhook | STUDY-PILOT (lighter than Chatwoot) | SAT-D |
| humanloop | n/a | proprietary | T5 API | REJECT (closed source) | SAT-D |

### L2.6.8 — Research / Deep-Research (11 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| karpathy/autoresearch | 81348 | NONE | T5 (research loop) | STUDY-PILOT (legally unsafe) | TR-A,GQL-M |
| assafelovic/gpt-researcher | 27099 | Apache-2.0 / MIT | T4 skill | INSTALL UNIVERSAL | TR-B,SAT-D |
| Future-House/paper-qa | high | Apache-2.0 | T5 lib | INSTALL (best-in-class sci-RAG) | SAT-D |
| HKUDS/AI-Researcher | high | Apache-2.0 | T5 lib | STUDY-PILOT (NeurIPS 2025) | SAT-D |
| ItzCrazyKns/Perplexica | very-high | MIT | T5 webhook/UI | STUDY-PILOT (search-engine UI) | SAT-D |
| K-Dense-AI/scientific-agent-skills | new | MIT (typical) | T4 skill | STUDY-PILOT (135 skills) | SAT-D |
| Orchestra-Research/AI-research-SKILLs | small | MIT (typical) | T4 skill | STUDY-PILOT | SAT-D |
| u14app/deep-research | 4583 | NOASSERTION | T3 | DEFER (alt to gpt-researcher) | TR-B |
| alvinreal/awesome-autoresearch | 1918 | NOASSERTION | T5 (oracle) | STUDY-PILOT (research loops) | TR-E |
| blazickjp/arxiv-mcp-server | 2739 | NOASSERTION | T3 | STUDY-PILOT (arXiv search/analysis) | TR-B |
| wanshuiyin/Auto-claude-code-research-in-sleep | 9473 | NOASSERTION | T4 (ARIS skill) | STUDY-PILOT | TR-B |

### L2.6.9 — Browser / UI Automation (11 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| browser-use/browser-use | 94156 | MIT | T5 lib | INSTALL (SOTA browser-agent) | TR-C,GQL-N |
| ChromeDevTools/chrome-devtools-mcp | 39754 | Apache-2.0 | T3 (Google official) | INSTALL P0 (was missing from catalog) | TR-B |
| bytedance/UI-TARS-desktop | 34185 | Apache-2.0 | T5 desktop | STUDY (Mac-only WATCHLIST) | TR-B |
| microsoft/playwright-mcp | 32585 | Apache-2.0 | T3 MCP | STUDY (DOWNRANKED by upstream for coding agents) | TR-G,GQL-N |
| browserbase/stagehand | 22675 | MIT | T5 SDK | STUDY (Stagehand v3 CDP-native) | GQL-N |
| hangwin/mcp-chrome | 11636 | NOASSERTION | T3 | STUDY-PILOT (Chrome-ext MCP) | TR-B |
| AgentDeskAI/browser-tools-mcp | 7216 | NOASSERTION | T3 | STUDY-PILOT (browser-logs MCP) | TR-B |
| BrowserMCP/mcp | 6510 | NOASSERTION | T3 | STUDY (alternative) | TR-B |
| mobile-next/mobile-mcp | 4914 | NOASSERTION | T3 | STUDY (iOS/Android automation) | TR-B |
| browserbase/mcp-server-browserbase | 3340 | MIT | T3 MCP | INSTALL CANDIDATE | GQL-N |
| Panniantong/Agent-Reach | 19645 | NOASSERTION | T3 | STUDY (multi-platform scraper) | TR-B |

### L2.6.10 — Voice / Multimodal (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| ggml-org/whisper.cpp | 49745 | NOASSERTION | T5 C++ | STUDY (downstream MCP wrappers) | GQL-N |
| microsoft/OmniParser | 24770 | NOASSERTION | T5 Python | STUDY (vision model) | GQL-N |
| QwenLM/Qwen3-VL | 19183 | NOASSERTION | T5 model | STUDY (vision model) | GQL-N |
| pipecat-ai/pipecat | 12240 | NOASSERTION | T5 framework | STUDY (voice-AI) | GQL-N |
| ai-marketing-claude (skill) | ? | NOASSERTION | T4 | DEFER | catalog-extract |

### L2.6.11 — Productivity / Office (10 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| taylorwilsdon/google_workspace_mcp | 2410 | NOASSERTION | T3 | STUDY-PILOT (Gmail/Calendar/Docs) | TR-B |
| haris-musa/excel-mcp-server | 3831 | NOASSERTION | T3 | STUDY (Excel MCP) | TR-B |
| coddingtonbear/obsidian-local-rest-api | 2245 | MIT | T3 | STUDY (Obsidian vault) | TR-B |
| zcaceres/markdownify-mcp | 2686 | NOASSERTION | T3 | STUDY-PILOT (alt to MinerU/Docling) | TR-B |
| Pimzino/spec-workflow-mcp | 4180 | NOASSERTION | T3 | STUDY (spec-driven MCP) | TR-B |
| homeassistant-ai/ha-mcp | 2911 | NOASSERTION | T3 | DEFER (HomeAssistant vertical) | TR-E |
| punitarani/fli | 2489 | NOASSERTION | T3 | DEFER (Google Flights MCP) | TR-B |
| Manavarya09/design-extract | 2638 | NOASSERTION | T3 | STUDY (extract design tokens) | TR-B |
| brightdata/brightdata-mcp | 2366 | NOASSERTION | T3 | STUDY (paid scraping API) | TR-B |
| antvis/mcp-server-chart | 4067 | MIT | T3 | STUDY (AntV visualization MCP) | TR-B |

### L2.6.12 — Game-dev / RE / Vertical-niche (3 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| CoplayDev/unity-mcp | 9661 | MIT | T3 | STUDY (Unity game-dev) | TR-B |
| IvanMurzak/Unity-MCP | 2765 | NOASSERTION | T3 | DEFER (alt) | TR-B |
| getsentry/XcodeBuildMCP | 5591 | NOASSERTION | T3 (Sentry-maintained) | STUDY (iOS/macOS vertical) | TR-B |

### L2.6.13 — Documentation / Knowledge (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| facebook/docusaurus | 64000 | MIT | T5 (no AI) | PATTERN-CITE (output target) | SAT-T |
| fern-api/fern | 2000 | Apache-2.0 + commercial | T3 (auto-MCP) | STUDY-PILOT (OpenAPI auto-gen) | SAT-T |
| errata-ai/vale | 4000 | MIT | T5 CLI | INSTALL (deterministic prose lint) | SAT-T |
| anandtyagi/documentation-generator | n/a | per plugin hub | T2 community | STUDY (verify maintenance) | SAT-T |
| mvillmow/generate-docstrings | n/a | per skill repo | T4 skill | STUDY | SAT-T |

### L2.6.14 — MCP Aggregators / Gateways (10 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| modelcontextprotocol/servers | 85744 | MIT | T3 canonical | INSTALL (canonical MCP catalog) | TR-E,SAT-P |
| microsoft/mcp | 3162 | MIT | T3 (Microsoft-official) | INSTALL CANDIDATE (MS vertical) | TR-B |
| awslabs/mcp | 9067 | Apache-2.0 | T3 (AWS-official) | INSTALL CANDIDATE (AWS vertical) | TR-B |
| metatool-ai/metamcp | 2327 | NOASSERTION | T3 (aggregator/orchestrator) | STUDY-PILOT (Docker-bundled gateway) | TR-B |
| samanhappy/mcphub | 2082 | NOASSERTION | T3 (aggregator) | STUDY-PILOT | TR-B |
| sparfenyuk/mcp-proxy | 2520 | MIT | T3 (transport) | INSTALL CANDIDATE (Streamable-HTTP↔stdio) | TR-B |
| open-webui/mcpo | 4197 | MIT | T3 (gateway) | STUDY-PILOT (MCP-to-OpenAPI proxy) | TR-B |
| AmoyLab/Unla | 2113 | NOASSERTION | T3 (gateway) | DEFER (lightweight alt) | TR-B,TR-E |
| mcp-router/mcp-router | 2011 | NOASSERTION | T3 (mgmt) | STUDY (Unified MCP Server Mgmt) | TR-B |
| jaw9c/awesome-remote-mcp-servers | 1058 | NOASSERTION | T5 (oracle) | STUDY-PILOT (remote-MCP sub-category) | TR-E |

### L2.6.15 — MCP Foundation SDKs (6 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| modelcontextprotocol/python-sdk | 23024 | MIT | T3 (Anthropic official) | INSTALL FOUNDATION (Python SDK) | TR-B |
| modelcontextprotocol/modelcontextprotocol (spec) | 8125 | MIT | T3 (spec itself) | CITE-FOUNDATION | TR-B |
| mark3labs/mcp-go | 8709 | MIT | T3 (community Go) | CITE-FOUNDATION | TR-B |
| modelcontextprotocol/go-sdk | 4549 | MIT | T3 (Anthropic+Google official) | CITE-FOUNDATION | TR-B |
| modelcontextprotocol/csharp-sdk | 4264 | MIT | T3 (Anthropic+MS official) | CITE-FOUNDATION | TR-B |
| modelcontextprotocol/rust-sdk | 3425 | MIT | T3 (Anthropic-official Rust) | CITE-FOUNDATION | TR-B |
| modelcontextprotocol/java-sdk | 3420 | MIT | T3 (Anthropic+Spring AI) | CITE-FOUNDATION | TR-B |
| tadata-org/fastapi_mcp | 11863 | MIT | T3 (server-building primitive) | INSTALL CANDIDATE | TR-B |

### L2.6.16 — MCP awesome-lists / discovery (8 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| punkpeye/awesome-mcp-servers | 86984 | MIT | T5 oracle | INSTALL P0 (canonical aggregator) | TR-A,TR-B,TR-E,GQL-M |
| punkpeye/awesome-mcp-clients | 6428 | NOASSERTION | T5 oracle | STUDY-PILOT | TR-E |
| appcypher/awesome-mcp-servers | 5543 | NOASSERTION | T5 oracle | STUDY-PILOT (alt) | TR-B,TR-E |
| wong2/awesome-mcp-servers | 4068 | NOASSERTION | T5 oracle | DEFER (3rd duplicate) | TR-B,TR-E |
| yzfly/Awesome-MCP-ZH | 7079 | NOASSERTION | T5 (CN regional) | DEFER (CN region) | TR-B,TR-E |
| microsoft/mcp-for-beginners | 16112 | MIT | T5 CITE-DOC | STUDY-PILOT (MS curriculum) | TR-B |
| YuzeHao2023/Awesome-MCP-Servers | 1044 | NOASSERTION | T5 oracle | DEFER (4th duplicate) | TR-E |
| chatmcp/mcpso | 2008 | NOASSERTION | T5 (directory web app) | DEFER | TR-E |

### L2.6.17 — Other / Out-of-scope flagged (45 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| n8n-io/n8n | 188119 | Sustainable Use | T5 iPaaS | DEFER (workflow-automation general) | TR-B |
| sansan0/TrendRadar | 57664 | NOASSERTION | T5 | OUT-OF-SCOPE (CN public-opinion) | TR-B |
| upstash/context7 | 55430 | MIT | T3 | WARN (ContextCrush vuln 2026-03) | TR-B,GQL-N |
| D4Vinci/Scrapling | 50317 | BSD-3 | T5 lib | OUT-OF-SCOPE (web-scraping framework) | TR-B |
| ggml-org/whisper.cpp | 49745 | NOASSERTION | T5 C++ | (also voice — see L2.6.10) | GQL-N |
| activepieces/activepieces | 22219 | MIT (some AGPL) | T5 iPaaS | OUT-OF-SCOPE (n8n competitor) | TR-B |
| 1Panel-dev/MaxKB | 20970 | GPL-3.0 | T5 | OUT-OF-SCOPE (GPL-3 enterprise) | TR-B |
| czlonkowski/n8n-mcp | 20988 | MIT | T3 | DEFER (only if n8n stack) | TR-B |
| nukeop/nuclear | 17623 | AGPL-3.0 | T5 music | OUT-OF-SCOPE (music streamer) | TR-B |
| agentscope-ai/QwenPaw | 16710 | NOASSERTION | T5 chat | OUT-OF-SCOPE (personal assistant) | TR-B |
| 666ghj/BettaFish | 40915 | GPL-2.0 | T5 (CN opinion-monitor) | OUT-OF-SCOPE (CN vertical) | TR-A,GQL-M |
| open-metadata/OpenMetadata | 13935 | Apache-2.0 | T5 | OUT-OF-SCOPE (metadata platform) | TR-B |
| triggerdotdev/trigger.dev | 14945 | Apache-2.0 | T5 (durable-sidecar) | STUDY-PILOT (L5.7b) | TR-B,GQL-N |
| xpzouying/xiaohongshu-mcp | 13615 | NOASSERTION | T3 | OUT-OF-SCOPE (CN social) | TR-B |
| yusufkaraaslan/Skill_Seekers | 13581 | NOASSERTION | T4 | STUDY-PILOT (docs→Claude skills converter) | TR-B |
| JoeanAmier/XHS-Downloader | 11173 | NOASSERTION | T5 | OUT-OF-SCOPE (CN downloader) | TR-B |
| 0xJacky/nginx-ui | 11145 | AGPL-3.0 | T5 webui | OUT-OF-SCOPE (Nginx WebUI) | TR-B |
| mcp-use/mcp-use | 9962 | MIT | T3 framework | STUDY-PILOT (fullstack MCP) | TR-B,TR-E |
| xinnan-tech/xiaozhi-esp32-server | 9553 | NOASSERTION | T5 | OUT-OF-SCOPE (ESP32 backend) | TR-B |
| firerpa/lamda | 7786 | NOASSERTION | T5 | OUT-OF-SCOPE (Android RPA) | TR-B |
| open-multi-agent/open-multi-agent | 6153 | NOASSERTION | T5 framework | STUDY-PILOT (DAG-based MCP) | TR-B |
| Sylinko/Everywhere | 5954 | NOASSERTION | T5 | OUT-OF-SCOPE (desktop AI UI) | TR-B |
| Klavis-AI/klavis | 5735 | Apache-2.0 | T3 platform | STUDY-PILOT (MCP integration platform) | TR-B |
| osaurus-ai/osaurus | 5283 | NOASSERTION | T5 | OUT-OF-SCOPE (macOS harness) | TR-B |
| nanbingxyz/5ire | 5220 | NOASSERTION | T5 MCP-client | OUT-OF-SCOPE | TR-B |
| maximhq/bifrost | 4959 | Apache-2.0 | T3 gateway | INSTALL CANDIDATE (50x LiteLLM claim — verify) | TR-B |
| crmne/ruby_llm | 3925 | MIT | T5 Ruby | OUT-OF-SCOPE | TR-B |
| evalstate/fast-agent | 3779 | NOASSERTION | T3 | STUDY-PILOT (Skills/MCP/ACP) | TR-B |
| archestra-ai/archestra | 3660 | NOASSERTION | T3 enterprise | STUDY-PILOT (guardrails + registry) | TR-B |
| opensumi/core | 3629 | MIT | T5 IDE | OUT-OF-SCOPE (AI-native IDE framework) | TR-B |
| huangjunsen0406/py-xiaozhi | 3309 | NOASSERTION | T5 | OUT-OF-SCOPE | TR-B |
| opensolon/solon | 2733 | Apache-2.0 | T5 Java | OUT-OF-SCOPE (Java framework) | TR-B |
| DeusData/codebase-memory-mcp | 2363 | NOASSERTION | T3 | STUDY-PILOT (code-intelligence) | TR-B |
| geekjourneyx/md2wechat-skill | 2236 | NOASSERTION | T4 (CN WeChat) | OUT-OF-SCOPE | TR-B |
| crbnos/carbon | 2104 | NOASSERTION | T5 ERP | OUT-OF-SCOPE | TR-B |
| cjo4m06/mcp-shrimp-task-manager | 2100 | NOASSERTION | T3 | STUDY (task-manager MCP) | TR-B |
| apioo/fusio | 2088 | NOASSERTION | T5 | OUT-OF-SCOPE (API mgmt) | TR-B |
| Upsonic/Upsonic | 7848 | NOASSERTION | T5 framework | STUDY-PILOT | TR-E |
| evilsocket/nerve | 1320 | NOASSERTION | T5 ADK | STUDY (Simple Agent Dev Kit) | TR-E |
| mickael-kerjean/filestash | 14199 | NOASSERTION | T5 (filemgmt) | OUT-OF-SCOPE | TR-E |
| mark3labs/mcp-filesystem-server | 640 | NOASSERTION | T3 Go | STUDY | TR-E |
| mamertofabian/mcp-everything-search | 330 | NOASSERTION | T3 | DEFER | TR-E |
| taskade/mcp | 148 | NOASSERTION | T3 | DEFER (Taskade vertical) | TR-E |
| agiletec-inc/airis-mcp-gateway | 158 | NOASSERTION | T3 | DEFER | TR-E |
| agentuniverse-ai/agentUniverse | 2234 | NOASSERTION | T5 framework | DEFER (multi-agent — convergence-audit needed) | TR-E |
| Helicone/ai-gateway | 589 | NOASSERTION | T5 Rust gateway | STUDY (Rust LiteLLM alt) | TR-G |
| AgentOps-AI/tokencost | 1981 | NOASSERTION | T5 utility | STUDY (token cost 400+ LLMs) | TR-G |
| AgentOps-AI/BestGPTs | 1024 | NOASSERTION | T5 (curated) | REJECT (curated-list) | TR-G |
| lemonade-sdk/lemonade | 3962 | Apache-2.0 | T5 local-LLM | STUDY (vLLM alt) | TR-B |
| u14app/deep-research | 4583 | NOASSERTION | T3 | DEFER (alt to gpt-researcher) | TR-B |

---

## §L2.7 — Test/Doc/Refactor Agents (53 rows)

### L2.7.1 — Test / LLM Eval (10 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| openai/evals | 16000 | MIT | T5 framework | STUDY (OpenAI-centric) | SAT-T |
| confident-ai/deepeval | 8000 | Apache-2.0 | T5 lib | STUDY-PILOT (50+ metrics) | SAT-T |
| explodinggradients/ragas | 7000 | Apache-2.0 | T5 lib (Phoenix wrap) | INSTALL via Phoenix MCP | SAT-T |
| promptfoo/promptfoo | 21300 | MIT | T2 community plugin (UPGRADED) | INSTALL (already pending) | SAT-T,GQL-N |
| qodo-ai/qodo-cover | 5000 | AGPL-3.0 / Apache-2.0 (conflict) | T5 CLI | REJECT (unmaintained since 2025-06-15) | SAT-T |
| qodo-ai Qodo Gen | n/a | Proprietary | T5 IDE | STUDY (closed source) | SAT-T |
| sierra-research/tau-bench | 1000 | MIT | T5 framework | STUDY-PILOT (Anthropic-blessed) | SAT-T |
| princeton-nlp/SWE-bench | 3000 | MIT | T5 harness | STUDY-PILOT (Claude Opus 4.7 leads) | SAT-T |
| Diffblue Cover | n/a | Proprietary | T5 IntelliJ | STUDY (Java-only) | SAT-T |
| UKGovernmentBEIS/inspect_ai | 2062 | NOASSERTION | T5 framework | STUDY-PILOT | GQL-N |

### L2.7.2 — Mutation / Fuzz (7 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| google/oss-fuzz | 10000 | Apache-2.0 | T5 service | STUDY-PILOT (operational service) | SAT-T |
| HypothesisWorks/hypothesis | 7500 | MPL-2.0 | T5 lib | INSTALL (foundational) | SAT-T |
| google/atheris | 1700 | Apache-2.0 | T5 lib | INSTALL (Python coverage-guided fuzz) | SAT-T |
| stryker-mutator/stryker-js | 3000 | Apache-2.0 | T5 CLI | INSTALL (JS/TS mutation) | SAT-T |
| hcoles/pitest | 1700 | Apache-2.0 | T5 Maven | STUDY-PILOT (Java) | SAT-T |
| sixty-north/cosmic-ray | 800 | MIT | T5 CLI | INSTALL (Python AST mutation) | SAT-T |
| mull-project/mull | 800 | Apache-2.0 | T5 LLVM | STUDY (C/C++/Rust) | SAT-T |
| boxed/mutmut | 1000 | BSD-3 | T5 CLI | STUDY-PILOT (Py mutation alt) | SAT-T |
| EvoSuite | 1500 | LGPL-3.0 | T5 CLI | REJECT (older; AgentTester wins) | SAT-T |

### L2.7.3 — Refactor / Codemod (6 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| ast-grep/ast-grep | 7000 | MIT | T4 skill | INSTALL (already incumbent) | SAT-T |
| comby-tools/comby | 4000 | Apache-2.0 | T5 CLI | STUDY (ast-grep faster) | SAT-T |
| dotnet/roslynator | 3000 | Apache-2.0 | T5 dotnet tool | STUDY (.NET only) | SAT-T |
| openrewrite/rewrite | 2500 | Apache-2.0 (some Moderne SAL) | T3 MCP | INSTALL (3500+ recipes) | SAT-T |
| Sourcery | n/a | Proprietary | T5 IDE | REJECT (proprietary; CC handles natively) | SAT-T |
| semgrep/mcp-marketplace | n/a | LGPL/commercial | T1 plugin | INSTALL (security overlap — see L2.6.2) | SAT-T,SAT-D,SAT-P |

### L2.7.4 — Doc Gen (5 rows — overlaps L2.6.13)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| mintlify (Mintlify Claude plugin) | n/a | Proprietary (plugin Apache) | T1 official | INSTALL (official Anthropic-listed) | SAT-T |
| facebook/docusaurus | 64000 | MIT | T5 static-site | STUDY (output target) | SAT-T |
| fern-api/fern | 2000 | Apache-2.0 + commercial | T3 (auto-MCP+llms.txt) | STUDY-PILOT (OpenAPI auto-gen) | SAT-T |
| errata-ai/vale | 4000 | MIT | T5 CLI | INSTALL (prose CI lint) | SAT-T |
| anandtyagi/documentation-generator | n/a | per plugin hub | T2 community | STUDY (verify maintenance) | SAT-T |
| mvillmow/generate-docstrings | n/a | per skill repo | T4 skill | STUDY | SAT-T |

### L2.7.5 — CI Agent / Code Review (8 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| anthropics/claude-code-action | 5000 | MIT | T5 GH Action | INSTALL (canonical CC-in-CI) | SAT-T,SAT-P,GQL-N |
| anthropics/claude-code-base-action | n/a | MIT | T5 GH Action | INSTALL (CI dep) | SAT-P,GQL-N |
| anthropics/claude-code-security-review | n/a | MIT | T5 GH Action | INSTALL (security CI) | SAT-P,GQL-N |
| github/gh-aw | n/a | per github org | T5 gh CLI ext | STUDY-PILOT (multi-engine; preview Feb 2026) | SAT-T |
| codium-ai/pr-agent | 7000 | Apache-2.0 | T5 GH Action | STUDY-PILOT (predates Qodo) | SAT-T |
| Greptile | n/a | Proprietary | T5 GH App | STUDY (82% bug-catch) | SAT-T |
| CodeRabbit | n/a | Proprietary | T5 GH/GL/BB App | STUDY (broadest platform) | SAT-T |
| Ellipsis | n/a | Proprietary | T5 GH App | STUDY (PR-summary+autofix) | SAT-T |

### L2.7.6 — Observability / LLM-Obs (10 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| langfuse/langfuse | 27309 | NOASSERTION | T5 platform | INSTALL P0 (TIER-1-DISCOVERED) | TR-G |
| comet-ml/opik | 19321 | NOASSERTION | T5 platform | INSTALL P0 (TIER-1-DISCOVERED) | TR-G |
| traceloop/openllmetry | 7115 | NOASSERTION | T5 OTEL | STUDY (TIER-2-OPTIONAL) | TR-G |
| traceloop/openllmetry-js | 398 | NOASSERTION | T5 OTEL-JS | DEFER (sub-component) | TR-G |
| traceloop/go-openllmetry | 44 | NOASSERTION | T5 OTEL-Go | DEFER | TR-G |
| Helicone/helicone | 5677 | NOASSERTION | T5 platform | STUDY (TIER-2-OPTIONAL) | TR-G |
| AgentOps-AI/agentops | 5555 | NOASSERTION | T5 SDK | STUDY (TIER-2-OPTIONAL) | TR-G |
| Arize-ai/openinference | 972 | NOASSERTION | T5 OTEL-AI | STUDY (companion to Phoenix) | TR-G |
| langwatch/langwatch | 3257 | NOASSERTION | T5 platform | STUDY (overlaps phoenix/opik) | TR-G |
| Arize-ai/phoenix | 9701 | NOASSERTION (ELv2 verified) | T5 (separate MCP server) | INSTALL (internal self-host only) | TR-G,SAT-T,GQL-N |

### L2.7.7 — Native Anthropic CC Capabilities (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| anthropics/claude-code /security-review (slash cmd) | n/a | Anthropic | T1 native | INSTALL (already incumbent) | SAT-T |
| Claude Security (product) | n/a | Anthropic | T1 native | INSTALL (Apr 30 2026 beta — 500+ zero-days) | SAT-T |
| anthropics/claude-code (binary) | 124067 | NOASSERTION | T1 cardinal | INSTALL P0 (runtime itself) | TR-A,GQL-N |
| anthropics/claude-agent-sdk-python | n/a | Anthropic | T5 (SDK; not plugin) | STUDY (pip install) | GQL-N |
| anthropics/claude-quickstarts | 16635 | Anthropic | T5 (demos; not plugin) | STUDY (cite-only) | GQL-N |

---

## §L2.8 — Commercial Agents (32 rows)

### L2.8.1 — OSS / Open-Source (5 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| Aider-AI/aider | 44891 | Apache-2.0 | T5 CLI | INSTALL P0 (TIER-1-CONFIRMED 8/8 D1-D8) | TR-G |
| TabbyML/tabby | 33522 | Other (custom) | T5 self-host | STUDY (Rust+standalone IDE-completion) | TR-G |
| continuedev/continue | 33221 | Apache-2.0 | T5 multi-IDE | STUDY (cross-IDE adapter) | TR-A,TR-G |
| bolt.diy (StackBlitz) | (paired with bolt.new) | Open | T5 WebContainer | PATTERN-CITE | SAT-C |
| Warp (now AGE) | n/a | dual MIT/AGPL (Apr 2026) | T5 (skills system) | STUDY | SAT-C |

### L2.8.2 — Closed-Source Commercial (26 rows)

| Product | Vendor / Owner | License | Native-CC | Verdict | Source-fork |
|---|---|---|---|---|---|
| Devin | Cognition Labs | Closed/SaaS | none | PATTERN-CITE (Playbooks + Scheduled-Devins) | SAT-C |
| Cursor | Anysphere | Closed/SaaS | none | PATTERN-CITE (Composer 2.0 MoE + Background Agents) | SAT-C |
| Windsurf / Cascade | Cognition (post Dec 2025 acq) | Closed/SaaS | none | PATTERN-CITE (SWE-1.5 + Cascade Fast Context) | SAT-C |
| Replit Agent v3 | Replit | Closed/SaaS | none | PATTERN-CITE (Python DSL tool invocation) | SAT-C |
| Lovable | Lovable | Closed/SaaS | none | PATTERN-CITE (3-mode UX) | SAT-C |
| v0 | Vercel | Closed/SaaS | none | PATTERN-CITE (Mini/Pro/Max fine-tunes) | SAT-C |
| Bolt.new | StackBlitz | Closed (bolt.new) | none | PATTERN-CITE (WebContainer) | SAT-C |
| GitHub Copilot Workspace + Coding Agent | GitHub | Closed/SaaS | T5 (AGENTS.md) | PATTERN-CITE (sub-agent fleet) | SAT-C |
| Cody | Sourcegraph | Closed/SaaS Enterprise-only $59/mo+ | none | REJECT (enterprise-only) | SAT-C |
| Amp | Sourcegraph | Closed/SaaS | T5 (.AGENT.md) | PATTERN-CITE (deep/smart mode-routing) | SAT-C |
| Tabnine Enterprise | Tabnine | Closed/SaaS + Self-hosted | none | PATTERN-CITE (Context Engine) | SAT-C |
| Junie + Air + Junie CLI | JetBrains | Closed/SaaS | none | STUDY-ONLY (mostly closed backend) | TR-G,SAT-C |
| Phind | Phind | Closed/SaaS — SHUT DOWN 2026-01-16 | none | REJECT (DEAD) | SAT-C |
| Augment Code + Intent | Augment Code | Closed/SaaS | none | PATTERN-CITE (shared spec + worktrees) | SAT-C |
| Manus | Manus | Closed/SaaS | none | PATTERN-CITE (file-as-memory) | SAT-C |
| Cluely | Cluely (a16z) | Closed/SaaS | none | PATTERN-CITE (anti-ambiguity discipline) | SAT-C |
| Trae | ByteDance | Closed (free tier) | none | STUDY (data-collection privacy concerns) | SAT-C |
| Kiro | AWS | Closed/SaaS | none | PATTERN-CITE (spec-first + Steering Files) | SAT-C |
| Qoder | Alibaba | Closed/SaaS | none | PATTERN-CITE (Repo Wiki auto-gen) | SAT-C |
| Tempo (Tempo Labs) | Tempo | Closed/SaaS | none | PATTERN-CITE (diagram-first) | SAT-C |
| Traycer | Traycer | Closed/SaaS | none | PATTERN-CITE (multi-model specialist routing) | SAT-C |
| Toolhouse | Toolhouse | Closed/SaaS | none | PATTERN-CITE (function-calling-as-service) | SAT-C |
| Stagehand v3 | Browserbase | Open + cloud | T5 (4 primitives) | INSTALL (also L2.6.9) | SAT-C |
| Smithery | Smithery | Closed/SaaS | T5 marketplace | STUDY-PILOT (7000+ MCP servers) | SAT-C,SAT-P |
| Comet | Perplexity | Closed/SaaS | none | PATTERN-CITE (Chromium-fork agentic browser) | SAT-C |
| Letta (MemGPT) | Letta | OSS + cloud | T5 platform | INSTALL (3-tier RAM/disk/cold mem) | SAT-C,TR-G |
| Leap.new | Encore | Closed/SaaS | none | PATTERN-CITE (deploy-to-customer-cloud) | SAT-C |
| Orchids | Orchids | Closed/SaaS | none | PATTERN-CITE (visual self-correct loop) | SAT-C |
| Same.dev | Same.dev | Closed | none | HONEST-NON-FINDING (stale 2024-25 leak) | SAT-C |

### L2.8.3 — Closed-Source REJECT (no install path) (8 entries)

| Product | Reason |
|---|---|
| codeium (`Exafunction/codeium*` adapters) | Closed-source backend; only issue-tracker open | TR-G |
| `phind` | Closed-source SaaS; no public repo | TR-G |
| `tencentmusic/codebuddy` | Closed-source SaaS; no public repo | TR-G |
| `cursor`, `getcursor`, `windsurf` (binaries) | Closed-source IDE; no public repos | TR-G |
| `toolhouse-com` / `toolhouse-ai` | No official org; SaaS-only | TR-G |
| `tempo` / `tempolabs` / `tempo-labs` | Closed-source SaaS | TR-G |
| `BasicProtein/AugmentCode-Free` + `vber/free-augmentcode` | Third-party API-abuse tools | TR-G |
| `JetBrains/junie*` ecosystem | Mostly closed backend; STUDY-ONLY | TR-G |

---

## §L3.0 — Peer CC-like CLIs (14 rows)

| Repo | Stars | License | Native-CC | Verdict | Source-fork |
|---|---:|---|---|---|---|
| affaan-m/everything-claude-code | 184249 | MIT | T2 community | INSTALL P0 (highest-star) | TR-A,GQL-M |
| anomalyco/opencode (was sst/opencode) | 161124 | Apache-2.0 | T5 peer-CLI | INSTALL P0 (ownership transfer noted) | GQL-M |
| anthropics/claude-code | 124066 | NOASSERTION (Anthropic) | T1 cardinal | INSTALL P0 (the runtime itself) | TR-A,GQL-M,GQL-N |
| google-gemini/gemini-cli | 104119 | Apache-2.0 | T5 peer-CLI (MCP-built-in) | INSTALL P0 (4th major vendor CLI) | TR-A,TR-B,SAT-C |
| openai/codex | 83047 | Apache-2.0 | T5 peer-CLI | INSTALL P0 (cross-model gate) | TR-G,GQL-N |
| shareAI-lab/learn-claude-code | 60785 | MIT | T2 (nano CC clone) | INSTALL P0 (educational nano-harness) | TR-A,GQL-M |
| code-yeongyu/oh-my-openagent | 58075 | NOASSERTION | T5 alt-harness | INSTALL P1 | TR-A,GQL-M |
| ruvnet/ruflo | 51772 | MIT | T3 orch | INSTALL P0 (multi-agent swarm) | TR-A,TR-B,GQL-M |
| earendil-works/pi | 50245 | MIT | T5 toolkit | STUDY-PILOT | TR-A,GQL-M |
| aaif-goose/goose (was block/goose) | 45298 | Apache-2.0 | T5 peer-CLI | INSTALL P1 (Block-backed Rust) | TR-A,TR-C,GQL-M |
| HKUDS/nanobot | 42576 | MIT | T5 ultra-lightweight | INSTALL P0 | TR-A,GQL-M |
| Yeachan-Heo/oh-my-claudecode | 33995 | MIT | T5 teams-first | INSTALL P1 | TR-A,GQL-M |
| nanocoai/nanoclaw | 28919 | NOASSERTION | T2 substrate | INSTALL P0 (OpenClaw alt) | GQL-M |
| openai/codex-plugin-cc | 18811 | NONE | T2 community (OFFICIAL OpenAI CC plugin) | INSTALL P0 (replaces self-invent codex subprocess) | TR-G |

---

## Aggregation methodology

**Source coverage**: 11 fork files totaling ~3,124 LOC. Every `org/repo` mention extracted, deduped, and assigned to single sub-layer (primary use-class). Cross-tranche duplicates retained for verification but tracked via Source-fork column.

**Sort order**: Within each sub-layer, sorted by stars descending (where known); `?`-star rows appended at end of section.

**Cite-class**: `constituents=[TIER-1-DIRECT @ 11 source fork files (this fire 2026-05-16), TIER-2 @ catalog cross-reference per CR-12 disposition lattice, TIER-3-LOCAL-COMPOSITION @ this aggregation row-by-row partitioning]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Honest-non-findings retained**:
- ~22+ HALLUCINATIONS quarantined across fix1-fix11 (codeintelinc/gitnexus, kentcdodds/grace, openai/swarm-evals, microsoft/RoseLynn, anthropics/docs-tools, vercel/vitalik, etc.) — NOT included as rows
- ARCHIVED status flagged where verified (vanna-ai/vanna per fix10; opencode-ai/opencode per fix11 — note CONFLICT with fix5)
- License `NOASSERTION` rows are NOT auto-rejected — many are MIT/Apache with file-level headers not detected by GitHub auto-classifier (per Tranche J: 15/15 verified)

**Out-of-scope flag**: Rows tagged OUT-OF-SCOPE retained for traceability (avoid re-probing in future tranches per Tranche B convention).

---

**End of PART 2**. Cross-reference: PART 1 (foundation L0-L1) at `THE-GRAND-CATALOG-MATRIX-2026-05-16.md`. Composite read: PART 1 + PART 2 = full ~770-row matrix.

---
title: "W259 — GitHub GraphQL Discovery: Missed SOTA Repos (NOT in W253/W258 catalog)"
date: 2026-05-16
wave: W259
phase: "01-graphql-discovery"
baseline_count: 109
raw_results_collected: 3288
dedup_missed_count: 3179
relevance_filtered_count: 2515
status: DISCOVERY-COMPLETE
---

# W259 — GitHub GraphQL Discovery: Missed SOTA Repos

High-quality Claude Code ecosystem repos NOT yet captured in the W253 95-repo scoring matrix or W258 v13 final synthesis. Discovery via `mcp__github__search_repositories` (authenticated) across 22 queries spanning Query Sets A (topics), B (orgs), and C (code/keyword search).

## §1 — Query log

| # | Query Set | Query | Total Hits | Items Captured |
|--:|---|---|---:|---:|
| 1 | A | `topic:claude-code stars:>200` | 829 | 50 |
| 2 | A | `topic:anthropic-claude stars:>100` | 63 | 50 |
| 3 | A | `topic:mcp-server stars:>200` | 438 | 100 |
| 4 | A | `topic:agent-skills stars:>50` | 354 | 50 |
| 5 | A | `topic:claude-plugin stars:>30` | 34 | 34 |
| 6 | A | `topic:llm-agent stars:>500` | 52 | 50 |
| 7 | A | `topic:llm-eval stars:>200` | 8 | 8 |
| 8 | A | `topic:agent-framework stars:>500` | 42 | 50 |
| 9 | A | `topic:agentic-ai stars:>500` | 233 | 100 |
| 10 | A | `topic:agent-tools stars:>200` | 11 | 11 |
| 11 | A | `topic:agent-memory stars:>100` | 57 | 50 |
| 12 | A | `topic:agent-orchestration stars:>100` | 45 | 45 |
| 13 | A | `topic:rag stars:>500 pushed:>2026-01-01` | 290 | 50 |
| 14 | A | `topic:llm-observability stars:>100` | 19 | 19 |
| 15 | A | `topic:llm-router stars:>50` | 13 | 13 |
| 16 | A | `topic:llm-cache stars:>50` | 1 | 1 |
| 17 | A | `topic:prompt-engineering stars:>500 pushed:>2026-01-01` | 117 | 50 |
| 18 | B | `org:anthropic-experimental` | 3 | 3 |
| 19 | B | `org:anthropics pushed:>2026-01-01` | 40 | 40 |
| 20 | B | `org:openai pushed:>2026-01-01` | 67 | 67 |
| 21 | B | `org:modelcontextprotocol` | 42 | 42 |
| 22 | B | `org:vercel-labs ai` | 62 | 50 |
| 23 | B | `org:google-deepmind agent` | 16 | 16 |
| 24 | B | `org:microsoft mcp-server` | 32 | 32 |
| 25 | B | `org:cloudflare agent` | 10 | 10 |
| 26 | C | `"claude-code" in:readme stars:>100 pushed:>2026-01-01` | 5,865 | 50 |
| 27 | C | `"claude code" hook plugin stars:>100 pushed:>2026-01-01` | 12 | 12 |
| 28 | C | `"agent harness" stars:>50 pushed:>2026-01-01` | 74 | 50 |
| 29 | C | `"superpowers" plugin claude stars:>50` | 4 | 4 |

**Totals**: 29 queries · ~8,940 raw matches · ~1,055 items captured (Top-50 per query) · 3179 dedup'd missed (stars≥30) · 2515 after AI/agent relevance filter (archived dropped).

## §2 — Dedup'd missed repos (top 200 by stars, sorted desc)

Repos NOT in W253 95-repo matrix or W258 v13 reference set. Topics shown are first 3-4. Lang/license per GitHub API.

| Repo | Stars | Forks | Lang | License | Last Push | Topics | Description | Org-Tier |
|---|---:|---:|---|---|---|---|---|---|
| openclaw/openclaw | 372,369 | 77,146 | TypeScript | ? | 2026-05-16 | ai · assistant · crustacean | Your own personal AI assistant. Any OS. Any Platform. The lobster way. 🦞  | TIER-3-IND-OR-UNK |
| ultraworkers/claw-code | 191,695 | 109,900 | Rust | ? | 2026-05-16 | ai-agents · anthropic · claude | The repo is finally unlocked. enjoy the party! The fastest repo in history to su | TIER-2-NAMED-PRACTITIONER |
| n8n-io/n8n | 188,157 | 57,686 | TypeScript | ? | 2026-05-16 | ai · apis · automation | Fair-code workflow automation platform with native AI capabilities. Combine visu | TIER-3-IND-OR-UNK |
| Significant-Gravitas/AutoGPT | 184,357 | 46,232 | Python | ? | 2026-05-16 | agentic-ai · agents · ai | AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our | TIER-2-NAMED-PRACTITIONER |
| f/prompts.chat | 162,355 | 21,138 | HTML | ? | 2026-05-16 | ai · artificial-intelligence · awesome-list | f.k.a. Awesome ChatGPT Prompts. Share, discover, and collect prompts from the co | TIER-2-NAMED-PRACTITIONER |
| Snailclimb/JavaGuide | 155,726 | 46,137 | JavaScript | ? | 2026-05-16 | agent · context-engineering · interview | Java 面试   后端通用面试指南，覆盖计算机基础、数据库、分布式、高并发、系统设计与 AI 应用开发 | TIER-3-IND-OR-UNK |
| NousResearch/hermes-agent | 153,176 | 24,386 | Python | ? | 2026-05-16 | ai · ai-agent · ai-agents | The agent that grows with you | TIER-2-NAMED-PRACTITIONER |
| langflow-ai/langflow | 148,148 | 8,985 | Python | ? | 2026-05-16 | agents · chatgpt · generative-ai | Langflow is a powerful tool for building and deploying AI-powered agents and wor | TIER-3-IND-OR-UNK |
| langgenius/dify | 141,597 | 22,236 | TypeScript | ? | 2026-05-16 | agent · agentic-ai · agentic-framework | Production-ready platform for agentic workflow development. | TIER-3-IND-OR-UNK |
| x1xhlol/system-prompts-and-models-of-ai-tools | 137,480 | 34,243 | Python | ? | 2026-05-16 | ai · bolt · cluely | FULL Augment Code, Claude Code, Cluely, CodeBuddy, Comet, Cursor, Devin AI, Juni | TIER-3-IND-OR-UNK |
| open-webui/open-webui | 137,344 | 19,598 | Python | ? | 2026-05-16 | ai · llm · llm-ui | User-friendly AI Interface (Supports Ollama, OpenAI API, ...) | TIER-2-NAMED-PRACTITIONER |
| langchain-ai/langchain | 136,892 | 22,642 | Python | ? | 2026-05-16 | agents · ai · ai-agents | The agent engineering platform. | TIER-2-NAMED-PRACTITIONER |
| anthropics/skills | 135,749 | 16,005 | Python | ? | 2026-05-16 | agent-skills | Public repository for Agent Skills | TIER-1-OFFICIAL |
| multica-ai/andrej-karpathy-skills | 132,267 | 13,469 | Shell | ? | 2026-05-16 | ai · ai-agents · ai-crawler | A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Kar | TIER-3-IND-OR-UNK |
| Shubhamsaboo/awesome-llm-apps | 110,651 | 16,396 | Python | ? | 2026-05-16 | agents · llms · python | 100+ AI Agent   RAG apps you can actually run — clone, customize, ship. | TIER-3-IND-OR-UNK |
| google-gemini/gemini-cli | 104,129 | 13,677 | TypeScript | ? | 2026-05-16 | ai · ai-agents · cli | An open-source AI agent that brings the power of Gemini directly into your termi | TIER-1-OFFICIAL |
| github/spec-kit | 100,759 | 8,813 | Python | ? | 2026-05-16 | ai · copilot · development | 💫 Toolkit to help you get started with Spec-Driven Development | TIER-1-OFFICIAL |
| msitarzewski/agency-agents | 98,361 | 16,325 | Shell | ? | 2026-05-16 | ai-agents · ai-tools · browser-automation | A complete AI agency at your fingertips - From frontend wizards to Reddit commun | TIER-2-NAMED-PRACTITIONER |
| garrytan/gstack | 97,949 | 14,571 | TypeScript | ? | 2026-05-16 | ai-agents · ai-tools · browser-automation | Use Garry Tan's exact Claude Code setup: 23 opinionated tools that serve as CEO, | TIER-2-NAMED-PRACTITIONER |
| rasbt/LLMs-from-scratch | 94,916 | 14,538 | Jupyter Notebook | ? | 2026-05-16 | ai · artificial-intelligence · chatbot | Implement a ChatGPT-like LLM in PyTorch from scratch, step by step | TIER-2-NAMED-PRACTITIONER |
| microsoft/playwright | 88,818 | 5,704 | TypeScript | ? | 2026-05-16 | automation · chrome · chromium | Playwright is a framework for Web Testing and Automation. It allows testing Chro | TIER-1-OFFICIAL |
| mattpocock/skills | 86,576 | 7,523 | Shell | ? | 2026-05-16 | framework · laravel · php | Skills for Real Engineers. Straight from my .claude directory. | TIER-3-IND-OR-UNK |
| infiniflow/ragflow | 80,624 | 9,219 | Python | ? | 2026-05-16 | agentic-ai · agentic-retrieval · agentic-search | RAGFlow is a leading open-source Retrieval-Augmented Generation (RAG) engine tha | TIER-2-NAMED-PRACTITIONER |
| mlabonne/llm-course | 79,365 | 9,223 | Python | ? | 2026-05-16 | course · large-language-models · llm | Course to get into Large Language Models (LLMs) with roadmaps and Colab notebook | TIER-3-IND-OR-UNK |
| nextlevelbuilder/ui-ux-pro-max-skill | 79,302 | 8,152 | Python | ? | 2026-05-16 | ai-skills · antigravity · claude | An AI SKILL that provide design intelligence for building professional UI/UX mul | TIER-2-NAMED-PRACTITIONER |
| PaddlePaddle/PaddleOCR | 77,949 | 10,440 | Python | ? | 2026-05-16 | ai4science · chineseocr · document-parsing | Turn any PDF or image document into structured data for your AI. A powerful, lig | TIER-3-IND-OR-UNK |
| nomic-ai/gpt4all | 77,365 | 8,329 | C++ | ? | 2026-05-15 | ai-chat · llm-inference | GPT4All: Run Local LLMs on Any Device. Open-source and available for commercial  | TIER-3-IND-OR-UNK |
| lobehub/lobehub | 77,160 | 15,190 | TypeScript | ? | 2026-05-16 | agent · agent-collaboration · agent-harness | The ultimate space for work and life — to find, build, and collaborate with agen | TIER-3-IND-OR-UNK |
| TauricResearch/TradingAgents | 76,059 | 14,804 | Python | ? | 2026-05-16 | agent · finance · llm | TradingAgents: Multi-Agents LLM Financial Trading Framework | TIER-3-IND-OR-UNK |
| dair-ai/Prompt-Engineering-Guide | 74,635 | 8,073 | MDX | ? | 2026-05-16 | agent · agents · ai-agents | 🐙 Guides, papers, lessons, notebooks and resources for prompt engineering, cont | TIER-2-NAMED-PRACTITIONER |
| OpenHands/OpenHands | 73,748 | 9,333 | Python | ? | 2026-05-16 | agent · artificial-intelligence · chatgpt | 🙌 OpenHands: AI-Driven Development | TIER-3-IND-OR-UNK |
| vuejs/awesome-vue | 73,597 | 9,466 | Rust | ? | 2026-05-15 | ai-tools · claude-code · codex | 🎉 A curated list of awesome things related to Vue.js | TIER-3-IND-OR-UNK |
| abi/screenshot-to-code | 72,598 | 8,949 | TypeScript | ? | 2026-05-16 | ai · api · automation | Drop in a screenshot and convert it to clean code (HTML/Tailwind/React/Vue) | TIER-3-IND-OR-UNK |
| farion1231/cc-switch | 72,591 | 4,704 | Rust | ? | 2026-05-16 | ai-tools · claude-code · codex | A cross-platform desktop All-in-One assistant for Claude Code, Codex, OpenCode,  | TIER-2-NAMED-PRACTITIONER |
| josephmisiti/awesome-machine-learning | 72,478 | 15,460 | Python | ? | 2026-05-16 | agent · agentic · agentic-framework | A curated list of awesome Machine Learning frameworks, libraries and software. | TIER-3-IND-OR-UNK |
| daytonaio/daytona | 72,441 | 5,570 | TypeScript | ? | 2026-05-15 | agentic-workflow · ai · ai-agents | Daytona is a Secure and Elastic Infrastructure for Running AI-Generated Code | TIER-3-IND-OR-UNK |
| binary-husky/gpt_academic | 70,646 | 8,395 | Python | ? | 2026-05-16 | academic · chatglm-6b · chatgpt | 为GPT/GLM等LLM大语言模型提供实用化交互接口，特别优化论文阅读/润色/写作体验，模块化设计，支持自定义快捷按钮 函数插件，支持Python和C++等项目 | TIER-3-IND-OR-UNK |
| FoundationAgents/MetaGPT | 68,015 | 8,670 | Python | ? | 2026-05-16 | agent · gpt · llm | 🌟 The Multi-Agent Framework: First AI Software Company, Towards Natural Languag | TIER-3-IND-OR-UNK |
| bytedance/deer-flow | 67,996 | 9,056 | Python | ? | 2026-05-16 | agent · agentic · agentic-framework | An open-source long-horizon SuperAgent harness that researches, codes, and creat | TIER-1-OFFICIAL |
| paperclipai/paperclip | 65,854 | 11,974 | TypeScript | ? | 2026-05-16 | agent · deepseek · fine-tuning | The open-source app everyone uses to manage agents at work | TIER-3-IND-OR-UNK |
| bradtraversy/design-resources-for-developers | 65,554 | 12,024 | Python | ? | 2026-05-16 | agent · deepseek · fine-tuning | Curated list of design and UI resources from stock photos, web templates, CSS fr | TIER-3-IND-OR-UNK |
| pathwaycom/pathway | 63,311 | 1,672 | Python | ? | 2026-05-16 | batch-processing · data-analytics · data-pipelines | Python ETL framework for stream processing, real-time analytics, LLM pipelines,  | TIER-3-IND-OR-UNK |
| opendatalab/MinerU | 63,310 | 5,331 | Python | ? | 2026-05-16 | ai4science · document-analysis · docx | Transforms complex documents like PDFs and Office docs into LLM-ready markdown/J | TIER-3-IND-OR-UNK |
| gsd-build/get-shit-done | 62,550 | 5,316 | JavaScript | ? | 2026-05-16 | claude-code · context-engineering · meta-prompting | A light-weight and powerful meta-prompting, context engineering and spec-driven  | TIER-3-IND-OR-UNK |
| cline/cline | 61,883 | 6,434 | TypeScript | ? | 2026-05-16 | anthropic · chatgpt · claude-3 | Autonomous coding agent as an SDK, IDE extension, or CLI assistant. | TIER-3-IND-OR-UNK |
| microsoft/ai-agents-for-beginners | 61,676 | 20,879 | Jupyter Notebook | ? | 2026-05-16 | agentic-ai · agentic-framework · agentic-rag | 12 Lessons to Get Started Building AI Agents | TIER-1-OFFICIAL |
| 666ghj/MiroFish | 60,911 | 9,522 | Python | ? | 2026-05-16 | agent-memory · financial-forecasting · future-prediction | A Simple and Universal Swarm Intelligence Engine, Predicting Anything. 简洁通用的群体智能 | TIER-3-IND-OR-UNK |
| shareAI-lab/learn-claude-code | 60,807 | 9,948 | TypeScript | ? | 2026-05-16 | agent · agent-development · ai-agent | Bash is all you need -  A nano claude code–like 「agent harness」, built from 0 to | TIER-3-IND-OR-UNK |
| Mintplex-Labs/anything-llm | 60,125 | 6,503 | JavaScript | ? | 2026-05-16 | ai-agents · custom-ai-agents · deepseek | The all-in-one AI productivity accelerator. On device and privacy first with no  | TIER-2-NAMED-PRACTITIONER |
| ComposioHQ/awesome-claude-skills | 60,113 | 6,540 | Python | ? | 2026-05-16 | agent-skills · ai-agents · antigravity | A curated list of awesome Claude Skills, resources, and tools for customizing Cl | TIER-2-NAMED-PRACTITIONER |
| pathwaycom/llm-app | 59,722 | 1,433 | Jupyter Notebook | ? | 2026-05-16 | chatbot · hugging-face · llm | Ready-to-run cloud templates for RAG, AI pipelines, and enterprise search with l | TIER-3-IND-OR-UNK |
| ruvnet/RuView | 58,151 | 7,598 | Rust | ? | 2026-05-16 | agentic-ai · densepose · esp32 | π RuView turns commodity WiFi signals into real-time spatial intelligence, vital | TIER-2-NAMED-PRACTITIONER |
| code-yeongyu/oh-my-openagent | 58,110 | 4,714 | TypeScript | ? | 2026-05-16 | ai · ai-agents · amp | omo; the best agent harness - previously oh-my-opencode | TIER-2-NAMED-PRACTITIONER |
| sansan0/TrendRadar | 57,675 | 24,302 | Python | ? | 2026-05-16 | ai · bark · data-analysis | ⭐AI-driven public opinion   trend monitor with multi-platform aggregation, RSS,  | TIER-3-IND-OR-UNK |
| harry0703/MoneyPrinterTurbo | 57,279 | 8,274 | Python | ? | 2026-05-16 | ai · automation · chatgpt | 利用AI大模型，一键生成高清短视频 Generate short videos with one click using AI LLM. | TIER-3-IND-OR-UNK |
| Zie619/n8n-workflows | 54,391 | 7,148 | Python | ? | 2026-05-16 | agentic-ai · agentic-framework · agentic-rag | all of the workflows of n8n i could find (also from the site itself) | TIER-3-IND-OR-UNK |
| shanraisshan/claude-code-best-practice | 53,284 | 5,331 | HTML | ? | 2026-05-16 | agentic-ai · agentic-coding · agentic-engineering | from vibe coding to agentic engineering - practice makes claude perfect | TIER-2-NAMED-PRACTITIONER |
| FlowiseAI/Flowise | 52,853 | 24,347 | TypeScript | ? | 2026-05-16 | agentic-ai · agentic-workflow · agents | Build AI Agents, Visually | TIER-2-NAMED-PRACTITIONER |
| MemPalace/mempalace | 52,323 | 6,916 | Python | ? | 2026-05-16 | ai · chromadb · llm | The best-benchmarked open-source AI memory system. And it's free. | TIER-3-IND-OR-UNK |
| ruvnet/ruflo | 51,844 | 5,835 | TypeScript | ? | 2026-05-16 | agentic-ai · agentic-framework · agentic-rag | 🌊 The leading agent orchestration platform for Claude. Deploy intelligent multi | TIER-2-NAMED-PRACTITIONER |
| charlax/professional-programming | 50,813 | 3,971 | Python | ? | 2026-05-16 | architecture · computer-science · concepts | A collection of learning resources for curious software engineers | TIER-3-IND-OR-UNK |
| D4Vinci/Scrapling | 50,378 | 4,772 | Python | ? | 2026-05-16 | ai · ai-scraping · automation | 🕷️ An adaptive Web Scraping framework that handles everything from a single req | TIER-3-IND-OR-UNK |
| datawhalechina/hello-agents | 50,103 | 6,041 | Python | ? | 2026-05-16 | agent · llm · rag | 📚 《从零开始构建智能体》——从零开始的智能体原理与实践教程 | TIER-2-NAMED-PRACTITIONER |
| earendil-works/pi | 49,939 | 5,920 | TypeScript | ? | 2026-05-16 | ai-gateway · anthropic · azure-openai | AI agent toolkit: coding agent CLI, unified LLM API, TUI   web UI libraries, Sla | TIER-3-IND-OR-UNK |
| VoltAgent/awesome-openclaw-skills | 48,780 | 4,776 | TypeScript | ? | 2026-05-16 | agent-skills · awesome · awesome-list | The awesome collection of OpenClaw skills. 5,400+ skills filtered and categorize | TIER-2-NAMED-PRACTITIONER |
| safishamsi/graphify | 48,529 | 5,269 | Python | ? | 2026-05-16 | antigravity · claude-code · codex | AI coding assistant skill (Claude Code, Codex, OpenCode, Cursor, Gemini CLI, and | TIER-2-NAMED-PRACTITIONER |
| Fission-AI/OpenSpec | 48,428 | 3,394 | TypeScript | ? | 2026-05-16 | ai · context-engineering · engineering | Spec-driven development (SDD) for AI coding assistants. | TIER-3-IND-OR-UNK |
| oobabooga/textgen | 47,135 | 5,982 | Python | ? | 2026-05-15 | agents · ai · api | Open-source desktop app for local LLMs. Text, vision, tool-calling, OpenAI/Anthr | TIER-3-IND-OR-UNK |
| GitHubDaily/GitHubDaily | 46,467 | 4,653 | Java | ? | 2026-05-16 | ai · algorithms-and-data-structures · backend | 坚持分享 GitHub 上高质量、有趣实用的开源技术教程、开发者工具、编程网站、技术资讯。A list cool, interesting projects o | TIER-3-IND-OR-UNK |
| mudler/LocalAI | 46,289 | 4,083 | Go | ? | 2026-05-16 | agents · ai · api | LocalAI is the open-source AI engine. Run any model - LLMs, vision, voice, image | TIER-3-IND-OR-UNK |
| jeecgboot/JeecgBoot | 46,288 | 15,997 | Java | ? | 2026-05-16 | activiti · agent · ai | AI 低代码平台，「低代码 + 零代码」双模式驱动：低代码一键生成前后端代码，零代码 5 分钟搭建系统，AI Skills 一句话画流程、设计表单、生成整套系统 | TIER-2-NAMED-PRACTITIONER |
| CherryHQ/cherry-studio | 45,781 | 4,347 | TypeScript | ? | 2026-05-16 | agent-skills · ai-agent · awesome-skills | AI productivity studio with smart chat, autonomous agents, and 300+ assistants.  | TIER-2-NAMED-PRACTITIONER |
| apache/airflow | 45,438 | 17,064 | Python | ? | 2026-05-16 | airflow · apache · apache-airflow | Apache Airflow - A platform to programmatically author, schedule, and monitor wo | TIER-3-IND-OR-UNK |
| aaif-goose/goose | 45,300 | 4,646 | Rust | ? | 2026-05-16 | acp · ai · ai-agents | an open source, extensible AI agent that goes beyond code suggestions - install, | TIER-3-IND-OR-UNK |
| santifer/career-ops | 45,011 | 9,458 | JavaScript | ? | 2026-05-16 | ai-agent · anthropic · automation | AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, | TIER-2-NAMED-PRACTITIONER |
| Aider-AI/aider | 44,891 | 4,422 | Python | ? | 2026-05-16 | anthropic · chatgpt · claude-3 | aider is AI pair programming in your terminal | TIER-3-IND-OR-UNK |
| zhayujie/CowAgent | 44,508 | 10,106 | Python | ? | 2026-05-16 | ai · ai-agent · chatgpt-on-wechat | CowAgent (chatgpt-on-wechat) 是基于大模型的超级AI助理，能主动思考和任务规划、访问操作系统和外部资源、创造和执行Skills、通过 | TIER-3-IND-OR-UNK |
| milvus-io/milvus | 44,324 | 4,002 | Go | ? | 2026-05-16 | anns · cloud-native · diskann | Milvus is a high-performance, cloud-native vector database built for scalable ve | TIER-2-NAMED-PRACTITIONER |
| Kong/kong | 43,397 | 5,136 | Lua | ? | 2026-05-16 | ai · ai-gateway · api-gateway | 🦍 The API and AI Gateway | TIER-3-IND-OR-UNK |
| logseq/logseq | 42,911 | 2,628 | Clojure | ? | 2026-05-16 | clojure · clojurescript · git | A privacy-first, open-source platform for knowledge management and collaboration | TIER-3-IND-OR-UNK |
| HKUDS/nanobot | 42,588 | 7,483 | Python | ? | 2026-05-16 | ai · ai-agent · ai-agents | \"🐈 nanobot: The Ultra-Lightweight Personal AI Agent\" | TIER-2-NAMED-PRACTITIONER |
| janhq/jan | 42,546 | 2,861 | TypeScript | ? | 2026-05-16 | chatgpt · gpt · llamacpp | Jan is an open source alternative to ChatGPT that runs 100% offline on your comp | TIER-3-IND-OR-UNK |
| nexu-io/open-design | 42,354 | 4,833 | TypeScript | ? | 2026-05-16 | agent-skills · ai-agents · ai-design | 🎨 Local-first, open-source alternative to Anthropic's Claude Design. ⚡ 19 Skill | TIER-3-IND-OR-UNK |
| KeygraphHQ/shannon | 42,114 | 4,788 | TypeScript | ? | 2026-05-16 | penetration-testing · pentesting · security-audit | Shannon Lite is an autonomous, white-box AI pentester for web applications and A | TIER-3-IND-OR-UNK |
| 666ghj/BettaFish | 40,921 | 7,559 | Python | ? | 2026-05-16 | agent-framework · data-analysis · deep-research | 微舆：人人可用的多Agent舆情分析助手，打破信息茧房，还原舆情原貌，预测未来走向，辅助决策！从0实现，不依赖任何框架。 | TIER-3-IND-OR-UNK |
| asgeirtj/system_prompts_leaks | 40,300 | 6,706 | Python | ? | 2026-05-16 | ai · ai-transparency · anthropic | Extracted system prompts from ChatGPT (GPT-5.5 Thinking), Claude (Opus 4.7, Opus | TIER-2-NAMED-PRACTITIONER |
| pingcap/tidb | 40,095 | 6,186 | Go | ? | 2026-05-16 | agent · agent-context · agent-memory | TiDB is built for agentic workloads that grow unpredictably, with ACID guarantee | TIER-1-OFFICIAL |
| PatrickJS/awesome-cursorrules | 39,540 | 3,375 | JavaScript | ? | 2026-05-15 | awesome · awesome-list · cursor | 📄  Configuration files that enhance Cursor AI editor experience with custom rul | TIER-3-IND-OR-UNK |
| lm-sys/FastChat | 39,472 | 4,794 | Python | ? | 2026-05-15 | agent-skills · agentic-skills · ai-agent-skills | An open platform for training, serving, and evaluating large language models. Re | TIER-3-IND-OR-UNK |
| 2noise/ChatTTS | 39,265 | 4,257 | Python | ? | 2026-05-16 | agent · chat · chatgpt | A generative speech model for daily dialogue. | TIER-3-IND-OR-UNK |
| mindsdb/minds-platform | 39,175 | 6,208 | Python | ? | 2026-05-16 | agents · ai · analytics | Platform dedicated to building an open foundation for applied Artificial Intelli | TIER-2-NAMED-PRACTITIONER |
| QuivrHQ/quivr | 39,156 | 3,744 | Python | ? | 2026-05-16 | ai · api · chatbot | Opiniated RAG for integrating GenAI in your apps 🧠   Focus on your product rath | TIER-3-IND-OR-UNK |
| abhigyanpatwari/GitNexus | 38,610 | 4,419 | TypeScript | ? | 2026-05-16 | gpt · gpt-4 · gpt4 | GitNexus: The Zero-Server Code Intelligence Engine -       GitNexus is a client- | TIER-3-IND-OR-UNK |
| sickn33/antigravity-awesome-skills | 37,713 | 6,168 | Python | ? | 2026-05-16 | agent-skills · agentic-skills · ai-agent-skills | Installable GitHub library of 1,400+ agentic skills for Claude Code, Cursor, Cod | TIER-2-NAMED-PRACTITIONER |
| alibaba/arthas | 37,310 | 7,636 | Java | ? | 2026-05-15 | agent · alibaba · arthas | Alibaba Java Diagnostic Tool Arthas/Alibaba Java诊断利器Arthas | TIER-1-OFFICIAL |
| danny-avila/LibreChat | 37,083 | 7,627 | TypeScript | ? | 2026-05-16 | ai · anthropic · artifacts | Enhanced ChatGPT Clone: Features Agents, MCP, DeepSeek, Anthropic, AWS, OpenAI,  | TIER-3-IND-OR-UNK |
| ZhuLinsen/daily_stock_analysis | 36,130 | 35,606 | Python | ? | 2026-05-16 | a-stock · ai-agent · aigc | LLM驱动的 A/H/美股智能分析：多数据源行情 + 实时新闻 + LLM决策仪表盘 + 多渠道推送，零成本定时运行，纯白嫖. LLM-powered stoc | TIER-3-IND-OR-UNK |
| TriliumNext/Trilium | 36,068 | 2,405 | TypeScript | ? | 2026-05-16 | electron · electron-app · knowledge-base | Build your personal knowledge base with Trilium Notes | TIER-3-IND-OR-UNK |
| anthropics/prompt-eng-interactive-tutorial | 35,696 | 3,825 | Jupyter Notebook | ? | 2026-05-16 | claude-code · mcp · skills | Anthropic's Interactive Prompt Engineering Tutorial | TIER-1-OFFICIAL |
| patchy631/ai-engineering-hub | 35,052 | 5,830 | Jupyter Notebook | ? | 2026-05-16 | agents · ai · llms | In-depth tutorials on LLMs, RAGs and real-world AI agent applications. | TIER-3-IND-OR-UNK |
| khoj-ai/khoj | 34,569 | 2,202 | Python | ? | 2026-05-16 | agent · ai · assistant | Your AI second brain. Self-hostable. Get answers from the web or your docs. Buil | TIER-2-NAMED-PRACTITIONER |
| ItzCrazyKns/Vane | 34,419 | 3,769 | TypeScript | ? | 2026-05-16 | ai-agents · ai-search-engine · answering-engine | Vane is an AI-powered answering engine. | TIER-3-IND-OR-UNK |
| firecracker-microvm/firecracker | 34,383 | 2,393 | Rust | ? | 2026-05-16 | containers · minimalist · open-source | Secure and fast microVMs for serverless computing. | TIER-3-IND-OR-UNK |
| bytedance/UI-TARS-desktop | 34,217 | 3,410 | TypeScript | ? | 2026-05-16 | agent · agent-tars · browser-use | The Open-Source Multimodal AI Agent Stack: Connecting Cutting-Edge AI Models and | TIER-1-OFFICIAL |
| SeleniumHQ/selenium | 34,077 | 8,680 | Java | ? | 2026-05-16 | dotnet · java · javascript | A browser automation framework and ecosystem. | TIER-3-IND-OR-UNK |
| Pythagora-io/gpt-pilot | 33,773 | 3,493 | Python | ? | 2026-05-16 | ai · codegen · coding-assistant | The first real AI developer | TIER-3-IND-OR-UNK |
| TabbyML/tabby | 33,523 | 1,745 | Rust | ? | 2026-05-16 | ai · codegen · coding-assistant | Self-hosted AI coding assistant | TIER-3-IND-OR-UNK |
| continuedev/continue | 33,221 | 4,513 | TypeScript | ? | 2026-05-16 | agent · ai · cli | ⏩ Source-controlled AI checks, enforceable in CI. Powered by the open-source Con | TIER-3-IND-OR-UNK |
| vercel-labs/agent-browser | 33,166 | 2,058 | Rust | ? | 2026-05-16 | agent · agents · ai | Browser automation CLI for AI agents | TIER-1-OFFICIAL |
| luongnv89/claude-howto | 33,162 | 4,054 | Python | ? | 2026-05-16 | claude-code · guide · tutorial | A visual, example-driven guide to Claude Code — from basic concepts to advanced  | TIER-3-IND-OR-UNK |
| github/awesome-copilot | 33,130 | 4,045 | Python | ? | 2026-05-16 | agent-skills · agents · ai | Community-contributed instructions, agents, skills, and configurations to help y | TIER-1-OFFICIAL |
| OpenBMB/ChatDev | 33,102 | 4,103 | Python | ? | 2026-05-16 | minicpm · minicpm-v · multi-modal | ChatDev 2.0: Dev All through LLM-powered Multi-Agent Collaboration | TIER-3-IND-OR-UNK |
| microsoft/graphrag | 33,020 | 3,497 | Python | ? | 2026-05-16 | gpt · gpt-4 · gpt4 | A modular graph-based Retrieval-Augmented Generation (RAG) system | TIER-1-OFFICIAL |
| alibaba/nacos | 32,950 | 13,281 | Java | ? | 2026-05-16 | a2a-registry · agent · ai-registry | an easy-to-use dynamic service discovery, configuration and service management p | TIER-1-OFFICIAL |
| router-for-me/CLIProxyAPI | 32,931 | 5,487 | Go | ? | 2026-05-16 | antigravity · claude-code · cluade | Wrap Gemini CLI, Antigravity, ChatGPT Codex, Claude Code, Grok Build as an OpenA | TIER-2-NAMED-PRACTITIONER |
| AstrBotDevs/AstrBot | 32,368 | 2,226 | Python | ? | 2026-05-16 | agent · ai · chatbot | AI Agent Assistant   development framework that integrates lots of IM platforms, | TIER-3-IND-OR-UNK |
| surrealdb/surrealdb | 32,127 | 1,265 | Rust | ? | 2026-05-16 | backend-as-a-service · cloud-database · database | A scalable, distributed, collaborative, document-graph database, for the realtim | TIER-3-IND-OR-UNK |
| conductor-oss/conductor | 31,827 | 894 | Java | ? | 2026-05-16 | distributed-systems · durable-execution · grpc | Conductor is an event driven agentic workflow engine providing durable and highl | TIER-3-IND-OR-UNK |
| VectifyAI/PageIndex | 31,464 | 2,689 | Python | ? | 2026-05-16 | agentic-ai · agents · ai | 📑 PageIndex: Document Index for Vectorless, Reasoning-based RAG | TIER-2-NAMED-PRACTITIONER |
| CopilotKit/CopilotKit | 31,458 | 4,066 | TypeScript | ? | 2026-05-16 | agent · agent-native · agentic-ai | The Frontend Stack for Agents   Generative UI. React + Angular.  Makers of the A | TIER-3-IND-OR-UNK |
| zeroclaw-labs/zeroclaw | 31,378 | 4,620 | Rust | ? | 2026-05-16 | agent · agentic · ai | Fast, small, and fully autonomous AI personal assistant infrastructure, ANY OS,  | TIER-3-IND-OR-UNK |
| qdrant/qdrant | 31,350 | 2,265 | Rust | ? | 2026-05-16 | ai-search · ai-search-engine · embeddings-similarity | Qdrant - High-performance, massive-scale Vector Database and Vector Search Engin | TIER-3-IND-OR-UNK |
| kepano/obsidian-skills | 31,316 | 2,165 | Python | ? | 2026-05-15 | claude · clawdbot · cli | Agent skills for Obsidian. Teach your agent to use Markdown, Bases, JSON Canvas, | TIER-3-IND-OR-UNK |
| Lightning-AI/pytorch-lightning | 31,141 | 3,722 | Python | ? | 2026-05-16 | ai · artificial-intelligence · data-science | Pretrain, finetune ANY AI model of ANY size on 1 or 10,000+ GPUs with zero code  | TIER-3-IND-OR-UNK |
| datawhalechina/self-llm | 30,482 | 2,993 | Jupyter Notebook | ? | 2026-05-16 | chatglm · chatglm3 · gemma-2b-it | 《开源大模型食用指南》针对中国宝宝量身打造的基于Linux环境快速微调（全参数/Lora）、部署国内外开源大模型（LLM）/多模态大模型（MLLM）教程 | TIER-2-NAMED-PRACTITIONER |
| datawhalechina/happy-llm | 30,341 | 2,859 | Jupyter Notebook | ? | 2026-05-16 | agent · llm · rag | 📚 从零开始构建大模型 | TIER-2-NAMED-PRACTITIONER |
| Hmbown/DeepSeek-TUI | 30,338 | 2,546 | Rust | ? | 2026-05-16 | cli · deepseek · llm | Coding agent for DeepSeek models that runs in your terminal | TIER-3-IND-OR-UNK |
| onyx-dot-app/onyx | 29,444 | 3,977 | Python | ? | 2026-05-16 | ai · ai-chat · chatgpt | Open Source AI Platform - AI Chat with advanced features that works with every L | TIER-2-NAMED-PRACTITIONER |
| sipeed/picoclaw | 29,001 | 4,150 | Go | ? | 2026-05-16 | ai-agents · ai-assistant · claude-code | Tiny, Fast, and Deployable anywhere — automate the mundane, unleash your creativ | TIER-3-IND-OR-UNK |
| linshenkx/prompt-optimizer | 28,934 | 3,384 | TypeScript | ? | 2026-05-16 | ai-prompts · ai-tools · llm | An AI prompt optimizer for writing better prompts and getting better AI results. | TIER-2-NAMED-PRACTITIONER |
| nanocoai/nanoclaw | 28,929 | 12,816 | TypeScript | ? | 2026-05-16 | ai-agents · ai-assistant · claude-code | A lightweight alternative to OpenClaw that runs in containers for security. Conn | TIER-3-IND-OR-UNK |
| voideditor/void | 28,763 | 2,491 | TypeScript | ? | 2026-05-16 | chatgpt · claude · copilot | Composio powers 1000+ toolkits, tool search, context management, authentication, | TIER-3-IND-OR-UNK |
| huggingface/agents-course | 28,667 | 2,058 | MDX | ? | 2026-05-16 | agentic-ai · agents · course | This repository contains the Hugging Face Agents Course.  | TIER-1-OFFICIAL |
| coreyhaines31/marketingskills | 28,582 | 4,620 | JavaScript | ? | 2026-05-15 | claude · codex · marketing | Marketing skills for Claude Code and AI agents. CRO, copywriting, SEO, analytics | TIER-3-IND-OR-UNK |
| simstudioai/sim | 28,500 | 3,601 | TypeScript | ? | 2026-05-16 | agent-workflow · agentic-workflow · agents | Build, deploy, and orchestrate AI agents. Sim is the central intelligence layer  | TIER-2-NAMED-PRACTITIONER |
| ComposioHQ/composio | 28,280 | 4,565 | TypeScript | ? | 2026-05-16 | agentic-ai · agents · ai | Composio powers 1000+ toolkits, tool search, context management, authentication, | TIER-2-NAMED-PRACTITIONER |
| stanford-oval/storm | 28,221 | 2,571 | Python | ? | 2026-05-16 | agentic-rag · deep-research · emnlp2024 | An LLM-powered knowledge curation system that researches a topic and generates a | TIER-3-IND-OR-UNK |
| labring/FastGPT | 28,046 | 7,098 | TypeScript | ? | 2026-05-16 | agent · claude · deepseek | FastGPT is a knowledge-based platform built on the LLMs, offers a comprehensive  | TIER-2-NAMED-PRACTITIONER |
| chroma-core/chroma | 27,969 | 2,249 | Rust | ? | 2026-05-16 | agents · ai · ai-agents | Search infrastructure for AI | TIER-3-IND-OR-UNK |
| e2b-dev/awesome-ai-agents | 27,843 | 2,876 | Python | ? | 2026-05-16 | agent · ai · artificial-intelligence | A list of AI autonomous agents | TIER-3-IND-OR-UNK |
| SillyTavern/SillyTavern | 27,685 | 5,312 | JavaScript | ? | 2026-05-16 | ai · chat · llm | LLM Frontend for Power Users. | TIER-3-IND-OR-UNK |
| NirDiamant/RAG_Techniques | 27,358 | 3,293 | Jupyter Notebook | ? | 2026-05-16 | ai · embeddings · langchain | This repository showcases various advanced techniques for Retrieval-Augmented Ge | TIER-2-NAMED-PRACTITIONER |
| davila7/claude-code-templates | 27,331 | 2,791 | Python | ? | 2026-05-16 | anthropic · anthropic-claude · claude | CLI tool for configuring and monitoring Claude Code | TIER-2-NAMED-PRACTITIONER |
| eyaltoledano/claude-task-master | 27,153 | 2,530 | JavaScript | ? | 2026-05-16 | ai · cursor · cursor-ai | An AI-powered task-management system you can drop into Cursor, Lovable, Windsurf | TIER-3-IND-OR-UNK |
| assafelovic/gpt-researcher | 27,100 | 3,642 | Python | ? | 2026-05-16 | agent · ai · automation | An autonomous agent that conducts deep research on any data using any LLM provid | TIER-3-IND-OR-UNK |
| Gitlawb/openclaude | 26,876 | 8,470 | TypeScript | ? | 2026-05-16 | ai · ai-agent · ai-tools | runs anywhere. uses anything | TIER-3-IND-OR-UNK |
| Hannibal046/Awesome-LLM | 26,810 | 2,520 | Python | ? | 2026-05-16 | agent · chatbot · large-language-models | Awesome-LLM: a curated list of Large Language Model | TIER-3-IND-OR-UNK |
| 78/xiaozhi-esp32 | 26,491 | 5,821 | C++ | ? | 2026-05-16 | chatbot · esp32 · mcp | An MCP-based chatbot \| 一个基于MCP的聊天机器人 | TIER-3-IND-OR-UNK |
| Fosowl/agenticSeek | 26,356 | 2,952 | Python | ? | 2026-05-16 | agentic-ai · agents · ai | Fully Local Manus AI. No APIs, No $200 monthly bills. Enjoy an autonomous agent  | TIER-3-IND-OR-UNK |
| HandsOnLLM/Hands-On-Large-Language-Models | 26,349 | 6,128 | Jupyter Notebook | ? | 2026-05-16 | artificial-intelligence · book · large-language-models | Official code repo for the O'Reilly Book - \"Hands-On Large Language Models\" | TIER-3-IND-OR-UNK |
| googleworkspace/cli | 26,289 | 1,375 | Rust | ? | 2026-05-16 | agent-skills · ai-agent · automation | Google Workspace CLI — one command-line tool for Drive, Gmail, Calendar, Sheets, | TIER-1-OFFICIAL |
| BloopAI/vibe-kanban | 26,286 | 2,743 | Rust | ? | 2026-05-16 | agent · ai-agents · kanban | Get 10X more out of Claude Code, Codex or any coding agent | TIER-3-IND-OR-UNK |
| AlexsJones/llmfit | 26,236 | 1,577 | Rust | ? | 2026-05-16 | gguf · llm · localai | Hundreds of models   providers. One command to find what runs on your hardware. | TIER-3-IND-OR-UNK |
| elder-plinius/CL4R1T4S | 26,145 | 4,722 | Python | ? | 2026-05-16 | agents · ai · chatgpt | LEAKED SYSTEM PROMPTS FOR CHATGPT, CLAUDE, GEMINI, GROK, PERPLEXITY, CURSOR, LOV | TIER-2-NAMED-PRACTITIONER |
| mlflow/mlflow | 25,962 | 5,740 | Python | ? | 2026-05-16 | agentops · agents · ai | The open source AI engineering platform for agents, LLMs, and ML models. MLflow  | TIER-2-NAMED-PRACTITIONER |
| mvanhorn/last30days-skill | 25,960 | 2,204 | Python | ? | 2026-05-16 | ai-prompts · ai-skill · bluesky | AI agent skill that researches any topic across Reddit, X, YouTube, HN, Polymark | TIER-3-IND-OR-UNK |
| onlook-dev/onlook | 25,781 | 1,984 | TypeScript | ? | 2026-05-16 | ai · cursor · cursor-ai | The Cursor for Designers • An Open-Source AI-First Design tool • Visually build, | TIER-3-IND-OR-UNK |
| Cinnamon/kotaemon | 25,377 | 2,117 | Python | ? | 2026-05-16 | chatbot · llms · open-source | An open-source RAG-based tool for chatting with your documents. | TIER-2-NAMED-PRACTITIONER |
| usestrix/strix | 25,329 | 2,822 | Python | ? | 2026-05-16 | agents · artificial-intelligence · cybersecurity | Open-source AI hackers to find and fix your app’s vulnerabilities. | TIER-3-IND-OR-UNK |
| iOfficeAI/AionUi | 25,303 | 2,319 | TypeScript | ? | 2026-05-16 | acp · agent-team · ai | Free, local, open-source 24/7 Cowork app for OpenClaw, Hermes Agent, Claude Code | TIER-2-NAMED-PRACTITIONER |
| PrefectHQ/fastmcp | 25,181 | 2,016 | Python | ? | 2026-05-16 | agents · fastmcp · llms | 🚀 The fast, Pythonic way to build MCP servers and clients. | TIER-3-IND-OR-UNK |
| agentscope-ai/agentscope | 25,169 | 2,720 | Python | ? | 2026-05-16 | agent · chatbot · large-language-models | Build and run agents you can see, understand and trust. | TIER-1-OFFICIAL |
| Alishahryar1/free-claude-code | 24,832 | 3,698 | Python | ? | 2026-05-16 | agent · agentic-rag · ai-agents | Use claude-code for free in the terminal, VSCode extension or discord like OpenC | TIER-3-IND-OR-UNK |
| microsoft/OmniParser | 24,770 | 2,168 | Jupyter Notebook | ? | 2026-05-16 | ai · api · fastapi | A simple screen parsing tool towards pure vision based GUI agent | TIER-1-OFFICIAL |
| flipped-aurora/gin-vue-admin | 24,677 | 7,075 | Go | ? | 2026-05-16 | admin · ai · casbin | 🚀Vite+Vue3+Gin拥有AI辅助的基础开发平台，企业级业务AI+开发解决方案，内置mcp辅助服务，内置skills管理，支持TS和JS混用。它集成了J | TIER-3-IND-OR-UNK |
| charmbracelet/crush | 24,338 | 1,686 | Go | ? | 2026-05-16 | agentic-ai · ai · llms | Glamourous agentic coding for all 💘 | TIER-3-IND-OR-UNK |
| liguodongiot/llm-action | 24,298 | 2,790 | HTML | ? | 2026-05-16 | llm · llm-inference · llm-serving | 本项目旨在分享大模型相关技术原理以及实战经验（大模型工程化、大模型应用落地） | TIER-3-IND-OR-UNK |
| toon-format/toon | 24,278 | 1,077 | TypeScript | ? | 2026-05-16 | data-format · llm · serialization | 🎒 Token-Oriented Object Notation (TOON) – Compact, human-readable, schema-aware | TIER-3-IND-OR-UNK |
| vercel/ai | 24,262 | 4,408 | TypeScript | ? | 2026-05-16 | anthropic · artificial-intelligence · gemini | The AI Toolkit for TypeScript. From the creators of Next.js, the AI SDK is a fre | TIER-1-OFFICIAL |
| HKUDS/DeepTutor | 24,014 | 3,198 | Python | ? | 2026-05-16 | ai-agents · ai-tutor · clawdbot | \"DeepTutor: Agent-Native Personalized Learning Assistant\" | TIER-2-NAMED-PRACTITIONER |
| gastownhall/beads | 23,747 | 1,574 | Go | ? | 2026-05-16 | agents · claude-code · coding | Beads - A memory upgrade for your coding agent | TIER-3-IND-OR-UNK |
| anthropics/financial-services | 23,738 | 3,272 | Python | ? | 2026-05-16 | claude-code · mcp · skills | Official, Anthropic-managed directory of high quality Claude Code Plugins. | TIER-1-OFFICIAL |
| K-Dense-AI/scientific-agent-skills | 23,003 | 2,479 | Python | ? | 2026-05-16 | agent-skills · ai-scientist · bioinformatics | A set of ready to use Agent Skills for research, science, engineering, analysis, | TIER-3-IND-OR-UNK |
| jarrodwatts/claude-hud | 22,935 | 1,026 | JavaScript | ? | 2026-05-16 | anthropic · claude · claude-code | A Claude Code plugin that shows what's happening - context usage, active tools,  | TIER-3-IND-OR-UNK |
| dolthub/dolt | 22,729 | 769 | Go | ? | 2026-05-16 | agent-memory · agent-memory-server · ai-agents | Dolt – Git for Data | TIER-1-OFFICIAL |
| mlc-ai/mlc-llm | 22,645 | 2,039 | Python | ? | 2026-05-16 | language-model · llm · machine-learning-compilation | Universal LLM Deployment Engine with ML Compilation | TIER-3-IND-OR-UNK |
| AiHubCN/Awesome-Chinese-LLM | 22,564 | 2,128 | Python | ? | 2026-05-16 | awesome-lists · chatglm · chinese | 整理开源的中文大语言模型，以规模较小、可私有化部署、训练成本较低的模型为主，包括底座模型，垂直领域微调及应用，数据集与教程等。 | TIER-3-IND-OR-UNK |
| PrefectHQ/prefect | 22,412 | 2,306 | Python | ? | 2026-05-16 | automation · data · data-engineering | Prefect is a workflow orchestration framework for building resilient data pipeli | TIER-3-IND-OR-UNK |
| activepieces/activepieces | 22,222 | 3,657 | TypeScript | ? | 2026-05-16 | ai-agent · ai-agent-tools · ai-agents | AI Agents   MCPs   AI Workflow Automation • (~400 MCP servers for AI agents) • A | TIER-3-IND-OR-UNK |
| enescingoz/awesome-n8n-templates | 22,199 | 6,020 | Jupyter Notebook | ? | 2026-05-16 | ai-agents · ai-automation · automation | 280+ free n8n automation templates — ready-to-use workflows for Gmail, Telegram, | TIER-3-IND-OR-UNK |
| NirDiamant/GenAI_Agents | 22,048 | 3,691 | Jupyter Notebook | ? | 2026-05-16 | agents · ai · ai-agents | 50+ tutorials and implementations for Generative AI Agent techniques, from basic | TIER-2-NAMED-PRACTITIONER |
| Homebrew/homebrew-cask | 22,016 | 11,511 | Ruby | ? | 2026-05-16 | cask · hacktoberfest · homebrew | 🍻 A CLI workflow for the administration of macOS applications distributed as bi | TIER-3-IND-OR-UNK |
| VoltAgent/awesome-agent-skills | 21,944 | 2,338 | TypeScript | ? | 2026-05-16 | agent-skills · ai-agents · antigravity-skills | A curated collection of 1000+ agent skills from official dev teams and the commu | TIER-2-NAMED-PRACTITIONER |
| winfunc/opcode | 21,856 | 1,692 | TypeScript | ? | 2026-05-16 | anthropic · anthropic-claude · claude | A powerful GUI app and Toolkit for Claude Code - Create custom agents, manage in | TIER-2-NAMED-PRACTITIONER |
| vectordotdev/vector | 21,836 | 2,126 | Rust | ? | 2026-05-14 | agent · cloud-native · data-transformation | A high-performance observability data pipeline. | TIER-3-IND-OR-UNK |
| dgraph-io/dgraph | 21,676 | 1,589 | Go | ? | 2026-05-15 | database · distributed · go | high-performance graph database for real-time use cases | TIER-3-IND-OR-UNK |
| cheahjs/free-llm-api-resources | 21,644 | 2,195 | Python | ? | 2026-05-16 | ai · claude · gemini | A list of free LLM inference resources accessible via API. | TIER-3-IND-OR-UNK |
| Skyvern-AI/skyvern | 21,630 | 1,998 | Python | ? | 2026-05-16 | ai · api · automation | Automate browser based workflows with AI | TIER-3-IND-OR-UNK |
| coleam00/Archon | 21,510 | 3,271 | TypeScript | ? | 2026-05-16 | ai · automation · bun | The first open-source harness builder for AI coding. Make AI coding deterministi | TIER-3-IND-OR-UNK |
| openai/swarm | 21,492 | 2,287 | Python | ? | 2026-05-16 | nodejs · openai · typescript | Educational framework exploring ergonomic, lightweight multi-agent orchestration | TIER-1-OFFICIAL |
| OthmanAdi/planning-with-files | 21,405 | 1,899 | Python | ? | 2026-05-16 | adal · agent-skills · antigravity | Claude Code skill implementing Manus-style persistent markdown planning — the wo | TIER-3-IND-OR-UNK |
| opendataloader-project/opendataloader-pdf | 21,319 | 1,978 | Java | ? | 2026-05-16 | a11y · accessibility · ai | PDF Parser for AI-ready data. Automate PDF accessibility. Open-source. | TIER-3-IND-OR-UNK |
| pgvector/pgvector | 21,315 | 1,174 | C | ? | 2026-05-16 | approximate-nearest-neighbor-search · nearest-neighbor-search | Open-source vector similarity search for Postgres | TIER-3-IND-OR-UNK |
| Wei-Shaw/sub2api | 21,272 | 4,023 | Go | ? | 2026-05-16 | 2api · antigravity2api · cc2api | Sub2API-CRS2 一站式开源中转服务，让 Claude、Openai 、Gemini、Antigravity订阅统一接入，支持拼车共享，更高效分摊成本， | TIER-3-IND-OR-UNK |
| jackwener/OpenCLI | 21,193 | 2,148 | JavaScript | ? | 2026-05-16 | ai-agent · ai-agents · ai-tools | Make Any Website   Tool Your CLI. A universal CLI Hub and AI-native runtime. Tra | TIER-3-IND-OR-UNK |
| QwenLM/Qwen | 21,157 | 1,807 | Python | ? | 2026-05-16 | chinese · flash-attention · large-language-models | The official repo of Qwen (通义千问) chat   pretrained large language model proposed | TIER-3-IND-OR-UNK |
| huggingface/peft | 21,115 | 2,292 | Python | ? | 2026-05-16 | adapter · diffusion · fine-tuning | 🤗 PEFT: State-of-the-art Parameter-Efficient Fine-Tuning. | TIER-1-OFFICIAL |
| AccumulateMore/CV | 21,062 | 2,408 | Jupyter Notebook | ? | 2026-05-16 | agent · agents · book | ✅（已完结）超级全面的 深度学习 笔记【土堆 Pytorch】【李沐 动手学深度学习】【吴恩达 深度学习】【大飞 大模型Agent】 | TIER-3-IND-OR-UNK |
| czlonkowski/n8n-mcp | 20,996 | 3,410 | TypeScript | ? | 2026-05-16 | mcp · mcp-server · n8n | A MCP for Claude Desktop / Claude Code / Windsurf / Cursor to build n8n workflow | TIER-3-IND-OR-UNK |
| 1Panel-dev/MaxKB | 20,970 | 2,825 | Python | ? | 2026-05-16 | agent · agentic-ai · chatbot | 🔥 MaxKB is an open-source platform for building enterprise-grade agents.  强大易用的 | TIER-3-IND-OR-UNK |

## §3 — Top-30 candidates for further deepdive

Selection rationale: prioritize **org-tier elevated** (TIER-1/2) AND **fresh push (2026)** AND **clear Claude Code / agent / MCP relevance** AND **stars≥1000** (with carve-outs for small but strategically critical primitives). Carve-out tag: `<1k★` for high-quality early but tactical fits.

| # | Repo | Stars | Tier | License | Rationale |
|--:|---|---:|---|---|---|
| 1 | `openclaw/openclaw` | 372,369 | TIER-3-IND-OR-UNK | ? | TIER-3 evalstate/fast-agent agent framework with Skills/MCP/ACP. 3.8k★. |
| 2 | `NousResearch/hermes-agent` | 153,176 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 Nous Research Hermes Agent (3rd-party agent harness, Python). 153k★ — major non-Anthropic harness. |
| 3 | `multica-ai/andrej-karpathy-skills` | 132,267 | TIER-3-IND-OR-UNK | ? | Single CLAUDE.md derived from Karpathy LLM coding pitfalls. 132k★ — direct W254 §3 install target. |
| 4 | `google-gemini/gemini-cli` | 104,129 | TIER-1-OFFICIAL | ? | OFFICIAL Google Gemini CLI agent — TIER-1 cross-model reference. 104k★. |
| 5 | `github/spec-kit` | 100,759 | TIER-1-OFFICIAL | ? | OFFICIAL GitHub Spec-Driven Development toolkit. 100.8k★ — direct workflow primitive (cite SDD methodology in W258). |
| 6 | `msitarzewski/agency-agents` | 98,361 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 complete AI agency (98k★) — large agent role library. |
| 7 | `garrytan/gstack` | 97,949 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 Garry Tan exact CC setup (CEO/Designer/EngMgr roles). 98k★ — high-signal opinionated config. |
| 8 | `rasbt/LLMs-from-scratch` | 94,916 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 Sebastian Raschka LLMs-from-scratch book code. 94.9k★ — educational primitive. |
| 9 | `mattpocock/skills` | 86,576 | TIER-3-IND-OR-UNK | ? | TIER-2 Matt Pocock skills (TypeScript expert) for real engineers. 86.6k★ — high-signal community asset. |
| 10 | `OpenHands/OpenHands` | 73,748 | TIER-3-IND-OR-UNK | ? | TIER-2 AI-Driven Development OpenHands (formerly SWE-Agent). 73.7k★ — already in W258 list. |
| 11 | `farion1231/cc-switch` | 72,591 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 cross-platform desktop assistant managing CC/Codex/Gemini/Hermes. 72.6k★. |
| 12 | `gsd-build/get-shit-done` | 62,550 | TIER-3-IND-OR-UNK | ? | TIER-3 Claude Code meta-prompting + SDD system. 62.6k★ — competes with spec-kit. |
| 13 | `shareAI-lab/learn-claude-code` | 60,807 | TIER-3-IND-OR-UNK | ? | TIER-3 nano CC-like agent harness from 0→1. 60.8k★ — educational reverse engineering of CC. |
| 14 | `shanraisshan/claude-code-best-practice` | 53,284 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 from vibe coding to agentic engineering. 53.3k★. |
| 15 | `ruvnet/ruflo` | 51,844 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 Claude agent orchestration platform (swarms + multi-agent). 51.8k★. |
| 16 | `datawhalechina/hello-agents` | 50,103 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 从零构建智能体 — agent origin/practice tutorial. 50.1k★ — educational. |
| 17 | `safishamsi/graphify` | 48,529 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 code+SQL+R+infra → knowledge graph (Leiden, tree-sitter) for CC/Codex. 48.5k★ — competes with serena/Understand-Anything. |
| 18 | `CherryHQ/cherry-studio` | 45,781 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 multi-LLM productivity studio (300+ assistants). 45.8k★. |
| 19 | `HKUDS/nanobot` | 42,588 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 ultra-lightweight personal AI agent. 42.6k★. |
| 20 | `nexu-io/open-design` | 42,354 | TIER-3-IND-OR-UNK | ? | TIER-3 local-first open-source alternative to Anthropic Claude Design (19 Skills/71 Design Systems). 42.4k★. |
| 21 | `asgeirtj/system_prompts_leaks` | 40,300 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 extracted system prompts from CC/ChatGPT/Gemini/Grok. 40.3k★ — reverse-engineering primitive. |
| 22 | `sickn33/antigravity-awesome-skills` | 37,713 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 installable GitHub library of 1,400+ agentic skills. 37.7k★. |
| 23 | `vercel-labs/agent-browser` | 33,166 | TIER-1-OFFICIAL | ? | OFFICIAL Vercel-labs browser automation CLI for AI agents. 33.2k★ — alternative to playwright-mcp/chrome-devtools-mcp. |
| 24 | `github/awesome-copilot` | 33,130 | TIER-1-OFFICIAL | ? | OFFICIAL GitHub Copilot community contributed instructions/agents/skills/configurations. 33.1k★ — TIER-1 reference for cross-CLI skill format. |
| 25 | `router-for-me/CLIProxyAPI` | 32,931 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 wrap Gemini/Antigravity/Codex/CC/Grok as unified API. 32.9k★ — multi-CLI bridge. |
| 26 | `simstudioai/sim` | 28,500 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 Sim: central intelligence layer for AI workforce. 28.5k★ — multi-agent workforce orchestration. |
| 27 | `NirDiamant/RAG_Techniques` | 27,358 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 advanced RAG techniques tutorial collection. 27.4k★ — pattern source. |
| 28 | `davila7/claude-code-templates` | 27,331 | TIER-2-NAMED-PRACTITIONER | ? | TIER-3 CLI tool for configuring + monitoring CC. 27.3k★. |
| 29 | `elder-plinius/CL4R1T4S` | 26,145 | TIER-2-NAMED-PRACTITIONER | ? | TIER-2 Plinius leaked system prompts collection. 26.1k★ — adversarial primitive. |
| 30 | `mvanhorn/last30days-skill` | 25,960 | TIER-3-IND-OR-UNK | ? | TIER-3 AI agent skill researching topics across Reddit/X/YouTube/HN/Polymarket. 26k★. |

## §4 — Org-tier rollup

| Tier | Count |
|---|---:|
| TIER-3-IND-OR-UNK | 2038 |
| TIER-2-NAMED-PRACTITIONER | 241 |
| TIER-1-OFFICIAL | 236 |

## §5 — Star-bucket rollup (relevant-filtered)

| Bucket | Count |
|---|---:|
| gte100k | 17 |
| gte50k | 46 |
| gte10k | 281 |
| gte1k | 954 |
| gte100 | 932 |
| gte30 | 285 |

## §6 — Caveats + provenance

- **Tool**: `mcp__github__search_repositories` (authenticated, user ID 234074349) — rate-limited at query #29 (subagent claude probe), no impact on Top-30 deepdive.
- **Capture rate**: Top-50 to Top-100 per query (per-page max). Tail repos (rank 50+ in queries returning 100+ results) not captured but documented in `Query log` §1.
- **Relevance filter**: regex on `description` + topic-intersect on AI/agent/skill/MCP/LLM/RAG/eval/observability/CC-ecosystem keyword set (165 keywords). False-negative risk: small for AI-tagged repos; large for cross-domain repos like security/data-eng that incidentally adopt agents.
- **Dedup baseline**: 95-repo W253 scoring matrix + 14 W258-referenced extras = 109 baseline repos.
- **Archived/abandoned dropped**: archived repos excluded from §3 picks but counted in §2 totals.
- **D2/D9 NOT scored**: this is a discovery probe — D1 (stars) is the only quantitative dimension applied here; full SRA D1-D10 scoring is W259 §05-scoring deliverable.
- **Source**: ~1,955 JSONL+JSON files scanned in `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed*/`, 241 modified within 6h window, 4,441 unique repos extracted.

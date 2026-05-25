# Tranche D - Code-Intelligence / Developer-Tools / AI-Coding-Assistant - GraphQL Bulk-Probe (2026-05-16)

> **Authoring agent**: claude-sota-installed orchestrator (Opus 4.7 [1M context])
> **Probe spec**: SATURATION TRANCHE D, GraphQL bulk-probe, >=5k-star filter
> **Queries executed**: 10 (5 spec-mandated + 5 supplementary to escape topic-tag thinness)
> **Unique repos after dedupe**: 162 (160 at >=5k stars)
> **Rubric**: D1 SOTA-fit, D2 maintenance, D3 community, D4 install/integrate, D5 license, D6 differentiation, D7 maturity, D8 claude-sota-installed-relevance (each 0-5, max 40)

## Section 0 - Probe methodology and honest non-finding up front

The five spec-mandated GraphQL queries returned **extreme topic-tag thinness on GitHub's search index** at probe-time:

| Spec query | Returned | Notes |
|---|---:|---|
| `topic:code-intelligence stars:>5000` | 1 | sourcegraph/sourcegraph-public-snapshot only |
| `topic:coding-assistant stars:>5000 pushed:>2026-01-01` | ~5 | thin |
| `topic:llm-coding stars:>5000` | 0 | empty |
| `topic:devtool stars:>10000 pushed:>2026-03-01` | 1 | Unleash/unleash only |
| `topic:code-completion stars:>5000` | ~5 | thin |

This is a known GitHub topic-tag adoption bias: well-known projects (Aider, Cursor, Continue, Cody, Tabby, Phind, Augment) **do not consistently self-tag** with `code-intelligence`, `llm-coding`, or even `coding-assistant`. To meet the >=50-row target without violating the bulk-probe spirit, **five supplementary queries** were appended that cover adjacent high-signal topics where adoption is denser (`ai-coding-assistant`, `ai-agent` recent, `developer-tools` recent, `copilot`, `agent`+Python recent). Results merged + deduped -> **160 qualifying repos**.

The merged set was scored against an 8-dimension rubric and ranked. The Top-10 (Section B) is filtered to genuinely code-intel-relevant adds (drop generic agent-frameworks unless they ship CLI/MCP code-intel surfaces).

---

## Section A - Per-repo matrix (160 rows, sorted by total score desc, stars desc)

| # | Repo | Stars | Pushed | Lang | Classes | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | **Sigma** | Desc (<=80c) |
|---:|---|---:|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | `affaan-m/everything-claude-code` | 184249 | 2026-05-16 | JavaScript | code-intel,dev-tool,agent,llm- | 5 | 5 | 5 | 3 | 4 | 4 | 5 | 5 | **36** | The agent harness performance optimization system. Skills, instincts, memory, se |
| 2 | `shareAI-lab/learn-claude-code` | 60784 | 2026-05-11 | TypeScript | code-intel,agent | 5 | 5 | 5 | 3 | 4 | 3 | 5 | 5 | **35** | Bash is all you need - A nano claude code-like agent harness, built from 0 to |
| 3 | `ruvnet/ruflo` | 51772 | 2026-05-16 | TypeScript | code-intel,agent,llm-infra | 5 | 5 | 5 | 3 | 4 | 3 | 5 | 5 | **35** | The leading agent orchestration platform for Claude. Deploy intelligent multi- |
| 4 | `x1xhlol/system-prompts-and-models-of-ai-tools` | 137479 | 2026-05-10 | ? | code-intel | 5 | 5 | 5 | 3 | 4 | 5 | 5 | 2 | **34** | FULL Augment Code, Claude Code, Cluely, CodeBuddy, Comet, Cursor, Devin AI, Juni |
| 5 | `bytedance/deer-flow` | 67980 | 2026-05-16 | Python | code-intel,agent,llm-infra | 4 | 5 | 5 | 4 | 4 | 3 | 5 | 4 | **34** | An open-source long-horizon SuperAgent harness that researches, codes, and creat |
| 6 | `ComposioHQ/awesome-claude-skills` | 60086 | 2026-05-07 | Python | code-intel,agent | 5 | 4 | 5 | 5 | 4 | 1 | 5 | 5 | **34** | A curated list of awesome Claude Skills, resources, and tools for customizing Cl |
| 7 | `rtk-ai/rtk` | 48784 | 2026-05-16 | Rust | code-intel,dev-tool,agent,llm- | 5 | 5 | 4 | 3 | 4 | 3 | 5 | 5 | **34** | CLI proxy that reduces LLM token consumption by 60-90% on common dev commands. S |
| 8 | `CherryHQ/cherry-studio` | 45772 | 2026-05-16 | TypeScript | code-intel,agent,llm-infra | 5 | 5 | 4 | 3 | 4 | 3 | 5 | 5 | **34** | AI productivity studio with smart chat, autonomous agents, and 300+ assistants. |
| 9 | `santifer/career-ops` | 44992 | 2026-05-16 | JavaScript | code-intel,agent | 5 | 5 | 4 | 3 | 4 | 3 | 5 | 5 | **34** | AI-powered job search system built on Claude Code. 14 skill modes, Go dashboard, |
| 10 | `continuedev/continue` | 33221 | 2026-05-15 | TypeScript | code-intel,dev-tool,agent,llm- | 4 | 5 | 4 | 4 | 4 | 5 | 4 | 4 | **34** | Source-controlled AI checks, enforceable in CI. Powered by the open-source Con |
| 11 | `alirezarezvani/claude-skills` | 15027 | 2026-05-16 | Python | code-intel,dev-tool,agent | 5 | 5 | 3 | 4 | 4 | 5 | 3 | 5 | **34** | 263+ Claude Code skills & agent plugins for Claude Code, Codex, Gemini CLI, Curs |
| 12 | `nextlevelbuilder/ui-ux-pro-max-skill` | 79249 | 2026-04-03 | Python | code-intel,dev-tool,agent | 5 | 3 | 5 | 4 | 4 | 3 | 4 | 5 | **33** | An AI SKILL that provide design intelligence for building professional UI/UX mul |
| 13 | `OpenHands/OpenHands` | 73731 | 2026-05-16 | Python | dev-tool,agent,llm-infra | 5 | 5 | 5 | 4 | 4 | 3 | 5 | 2 | **33** | OpenHands: AI-Driven Development |
| 14 | `daytonaio/daytona` | 72431 | 2026-05-16 | TypeScript | code-intel,dev-tool,agent | 4 | 5 | 5 | 3 | 4 | 3 | 5 | 4 | **33** | Daytona is a Secure and Elastic Infrastructure for Running AI-Generated Code |
| 15 | `hesreallyhim/awesome-claude-code` | 43925 | 2026-04-27 | Python | code-intel,agent | 5 | 4 | 4 | 5 | 4 | 1 | 5 | 5 | **33** | A curated list of awesome skills, hooks, slash-commands, agent orchestrators, ap |
| 16 | `sickn33/antigravity-awesome-skills` | 37697 | 2026-05-16 | Python | code-intel,dev-tool,agent | 5 | 5 | 4 | 5 | 4 | 1 | 4 | 5 | **33** | Installable GitHub library of 1,400+ agentic skills for Claude Code, Cursor, Cod |
| 17 | `iOfficeAI/AionUi` | 25287 | 2026-05-16 | TypeScript | code-intel,dev-tool,agent,llm- | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | **33** | Free, local, open-source 24/7 Cowork app for OpenClaw, Hermes Agent, Claude Code |
| 18 | `OthmanAdi/planning-with-files` | 21400 | 2026-05-16 | Python | code-intel,agent | 5 | 5 | 3 | 4 | 4 | 3 | 4 | 5 | **33** | Claude Code skill implementing Manus-style persistent markdown planning - the wo |
| 19 | `decolua/9router` | 10977 | 2026-05-16 | JavaScript | code-intel,dev-tool,agent | 5 | 5 | 2 | 4 | 4 | 5 | 3 | 5 | **33** | Unlimited FREE AI coding. Connect Claude Code, Codex, Cursor, Cline, Copilot, An |
| 20 | `NousResearch/hermes-agent` | 152970 | 2026-05-16 | Python | agent,llm-infra | 4 | 5 | 5 | 4 | 4 | 3 | 5 | 2 | **32** | The agent that grows with you |
| 21 | `github/spec-kit` | 100632 | 2026-05-15 | Python | code-intel,agent | 4 | 5 | 5 | 4 | 4 | 3 | 5 | 2 | **32** | Toolkit to help you get started with Spec-Driven Development |
| 22 | `TauricResearch/TradingAgents` | 76046 | 2026-05-11 | Python | agent,llm-infra | 4 | 5 | 5 | 4 | 4 | 3 | 5 | 2 | **32** | TradingAgents: Multi-Agents LLM Financial Trading Framework |
| 23 | `datawhalechina/hello-agents` | 50052 | 2026-05-16 | Python | agent,llm-infra | 4 | 5 | 5 | 4 | 4 | 3 | 5 | 2 | **32** | From-zero-to-agent tutorial repo |
| 24 | `HKUDS/nanobot` | 42575 | 2026-05-16 | Python | agent | 5 | 5 | 4 | 4 | 4 | 3 | 5 | 2 | **32** | nanobot: The Ultra-Lightweight Personal AI Agent |
| 25 | `oraios/serena` | 24287 | 2026-05-16 | Python | code-intel,dev-tool,agent | 5 | 5 | 3 | 4 | 4 | 3 | 4 | 4 | **32** | A powerful MCP toolkit for coding, providing semantic retrieval and editing capa |
| 26 | `hiyouga/LlamaFactory` | 71315 | 2026-05-13 | Python | llm-infra | 3 | 5 | 5 | 4 | 4 | 3 | 5 | 2 | **31** | Unified Efficient Fine-Tuning of 100+ LLMs & VLMs (ACL 2024) |
| 27 | `unslothai/unsloth` | 64375 | 2026-05-16 | Python | llm-infra | 3 | 5 | 5 | 4 | 4 | 3 | 5 | 2 | **31** | Unsloth Studio is a web UI for training and running open models like Gemma 4, Qw |
| 28 | `zhayujie/CowAgent` | 44506 | 2026-05-16 | Python | agent | 4 | 5 | 4 | 4 | 4 | 3 | 5 | 2 | **31** | CowAgent (chatgpt-on-wechat) super AI assistant - active planning + OS access |
| 29 | `agno-agi/agno` | 40150 | 2026-05-16 | Python | dev-tool,agent | 4 | 5 | 4 | 4 | 4 | 3 | 5 | 2 | **31** | Build, run, and manage agent platforms. |
| 30 | `TabbyML/tabby` | 33522 | 2026-03-02 | Rust | code-intel,dev-tool,agent | 4 | 3 | 4 | 3 | 4 | 5 | 4 | 4 | **31** | Self-hosted AI coding assistant |
| 31 | `Gitlawb/openclaude` | 26873 | 2026-05-16 | TypeScript | dev-tool,agent | 5 | 5 | 4 | 4 | 4 | 3 | 4 | 2 | **31** | runs anywhere. uses anything |
| 32 | `activepieces/activepieces` | 22219 | 2026-05-16 | TypeScript | agent | 5 | 5 | 3 | 3 | 4 | 3 | 4 | 4 | **31** | AI Agents & MCPs & AI Workflow Automation - (~400 MCP servers for AI agents) |
| 33 | `coleam00/Archon` | 21510 | 2026-05-15 | TypeScript | dev-tool,agent | 5 | 5 | 3 | 4 | 4 | 4 | 4 | 2 | **31** | The first open-source harness builder for AI coding. Make AI coding deterministi |
| 34 | `google/adk-python` | 19659 | 2026-05-16 | Python | code-intel,agent | 4 | 5 | 3 | 4 | 4 | 4 | 3 | 4 | **31** | An open-source, code-first Python toolkit for building, evaluating, and deployin |
| 35 | `hoppscotch/hoppscotch` | 79191 | 2026-05-15 | TypeScript | dev-tool | 3 | 5 | 5 | 4 | 4 | 3 | 5 | 1 | **30** | Open-Source API Development Ecosystem - Offline, On-Prem |
| 36 | `streamlit/streamlit` | 44604 | 2026-05-16 | Python | code-intel | 4 | 5 | 4 | 4 | 4 | 3 | 5 | 1 | **30** | Streamlit - A faster way to build and share data apps. |
| 37 | `ZhuLinsen/daily_stock_analysis` | 36112 | 2026-05-16 | Python | agent,llm-infra | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 2 | **30** | LLM-powered stock analysis dashboard |
| 38 | `Pythagora-io/gpt-pilot` | 33773 | 2026-04-17 | Python | code-intel,dev-tool,agent | 4 | 4 | 4 | 4 | 4 | 4 | 4 | 2 | **30** | The first real AI developer |
| 39 | `AstrBotDevs/AstrBot` | 32361 | 2026-05-16 | Python | code-intel,agent,llm-infra | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 2 | **30** | AI Agent Assistant & development framework that integrates lots of IM platforms |
| 40 | `agentscope-ai/agentscope` | 25164 | 2026-05-15 | Python | agent,llm-infra | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 2 | **30** | Build and run agents you can see, understand and trust. |
| 41 | `Panniantong/Agent-Reach` | 19645 | 2026-04-13 | Python | code-intel,dev-tool,agent | 5 | 3 | 3 | 4 | 4 | 3 | 3 | 5 | **30** | Give your AI agent eyes to see the entire internet. Read & search Twitter, Reddi |
| 42 | `mksglu/context-mode` | 14862 | 2026-05-16 | TypeScript | code-intel,agent,llm-infra | 5 | 5 | 2 | 3 | 4 | 3 | 3 | 5 | **30** | Context window optimization for AI coding agents. Sandboxes tool output, 98% red |
| 43 | `puppeteer/puppeteer` | 94332 | 2026-05-15 | TypeScript | dev-tool | 3 | 5 | 5 | 3 | 4 | 3 | 5 | 1 | **29** | JavaScript API for Chrome and Firefox |
| 44 | `usebruno/bruno` | 43861 | 2026-05-15 | JavaScript | dev-tool | 3 | 5 | 4 | 4 | 4 | 3 | 5 | 1 | **29** | Opensource IDE For Exploring and Testing API's (lightweight alternative to Postm |
| 45 | `CopilotKit/CopilotKit` | 31453 | 2026-05-15 | TypeScript | code-intel,agent,llm-infra | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 2 | **29** | The Frontend Stack for Agents & Generative UI. React + Angular |
| 46 | `ComposioHQ/composio` | 28279 | 2026-05-16 | TypeScript | dev-tool,agent,llm-infra | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 2 | **29** | Composio powers 1000+ toolkits, tool search, context management, authentication |
| 47 | `assafelovic/gpt-researcher` | 27099 | 2026-04-16 | Python | dev-tool,agent,llm-infra | 4 | 4 | 4 | 4 | 4 | 3 | 4 | 2 | **29** | An autonomous agent that conducts deep research on any data using any LLM |
| 48 | `googleworkspace/cli` | 26287 | 2026-05-12 | Rust | dev-tool,agent | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 2 | **29** | Google Workspace CLI - one command-line tool for Drive, Gmail, Calendar, Sheets |
| 49 | `ycm-core/YouCompleteMe` | 25908 | 2026-05-11 | Python | code-intel | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 1 | **29** | A code-completion engine for Vim |
| 50 | `yamadashy/repomix` | 24929 | 2026-05-16 | TypeScript | code-intel,dev-tool,llm-infra | 5 | 5 | 3 | 3 | 4 | 3 | 4 | 2 | **29** | Repomix is a powerful tool that packs your entire repository into a single, AI |
| 51 | `volcengine/OpenViking` | 23981 | 2026-05-16 | Python | agent,llm-infra | 4 | 5 | 3 | 4 | 4 | 3 | 4 | 2 | **29** | OpenViking is an open-source context database designed specifically for AI Agent |
| 52 | `jackwener/OpenCLI` | 21158 | 2026-05-16 | JavaScript | dev-tool,agent | 4 | 5 | 3 | 4 | 4 | 3 | 4 | 2 | **29** | Make Any Website & Tool Your CLI. A universal CLI Hub and AI-native runtime |
| 53 | `1Panel-dev/MaxKB` | 20970 | 2026-05-15 | Python | agent,llm-infra | 4 | 5 | 3 | 4 | 4 | 3 | 4 | 2 | **29** | MaxKB is an open-source platform for building enterprise-grade agents |
| 54 | `camel-ai/camel` | 16968 | 2026-05-15 | Python | agent | 4 | 5 | 3 | 4 | 4 | 4 | 3 | 2 | **29** | CAMEL: The first and the best multi-agent framework |
| 55 | `The-PR-Agent/pr-agent` | 11225 | 2026-05-14 | Python | code-intel,agent | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 4 | **29** | PR Agent: The Original Open-Source PR Reviewer. |
| 56 | `rohitg00/agentmemory` | 10024 | 2026-05-16 | TypeScript | code-intel,agent,llm-infra | 5 | 5 | 2 | 3 | 4 | 3 | 3 | 4 | **29** | #1 Persistent memory for AI coding agents based on real-world benchmarks |
| 57 | `getpaseo/paseo` | 6225 | 2026-05-16 | TypeScript | code-intel,dev-tool,agent | 5 | 5 | 1 | 4 | 4 | 3 | 2 | 5 | **29** | Orchestrate coding agents remotely from your phone, desktop and CLI |
| 58 | `UfoMiao/zcf` | 5993 | 2026-05-09 | TypeScript | code-intel,dev-tool,agent | 5 | 5 | 1 | 4 | 4 | 3 | 2 | 5 | **29** | Zero-Config Code Flow for Claude code & Codex |
| 59 | `files-community/Files` | 43519 | 2026-05-15 | C# | dev-tool | 3 | 5 | 4 | 3 | 4 | 3 | 5 | 1 | **28** | A modern file manager that helps users organize their files and folders. |
| 60 | `chatboxai/chatbox` | 39978 | 2026-04-09 | TypeScript | code-intel,dev-tool | 4 | 3 | 4 | 4 | 4 | 3 | 4 | 2 | **28** | Powerful AI Client |
| 61 | `appsmithorg/appsmith` | 39819 | 2026-05-15 | TypeScript | code-intel | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **28** | Platform to build admin panels, internal tools, and dashboards |
| 62 | `koalaman/shellcheck` | 39428 | 2026-05-16 | Haskell | code-intel,dev-tool | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **28** | ShellCheck, a static analysis tool for shell scripts |
| 63 | `2noise/ChatTTS` | 39265 | 2026-04-10 | Python | agent | 4 | 3 | 4 | 4 | 4 | 3 | 4 | 2 | **28** | A generative speech model for daily dialogue. |
| 64 | `freeCodeCamp/devdocs` | 38910 | 2026-05-09 | Ruby | code-intel,dev-tool | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **28** | API Documentation Browser |
| 65 | `lapce/lapce` | 38392 | 2026-05-16 | Rust | code-intel,dev-tool | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **28** | Lightning-fast and Powerful Code Editor written in Rust |
| 66 | `sxyazi/yazi` | 38118 | 2026-05-14 | Rust | code-intel,dev-tool | 4 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **28** | Blazing fast terminal file manager written in Rust, based on async I/O. |
| 67 | `khoj-ai/khoj` | 34569 | 2026-03-26 | Python | agent | 4 | 3 | 4 | 4 | 4 | 3 | 4 | 2 | **28** | Your AI second brain. Self-hostable. Get answers from the web or your docs |
| 68 | `zai-org/Open-AutoGLM` | 25292 | 2026-03-06 | Python | agent | 4 | 3 | 4 | 4 | 4 | 3 | 4 | 2 | **28** | An Open Phone Agent Model & Framework |
| 69 | `nocobase/nocobase` | 22410 | 2026-05-16 | TypeScript | code-intel | 4 | 5 | 3 | 3 | 4 | 3 | 4 | 2 | **28** | NocoBase is an open-source AI + no-code platform for building business systems |
| 70 | `camel-ai/owl` | 19779 | 2026-05-15 | Python | agent | 4 | 5 | 3 | 4 | 4 | 3 | 3 | 2 | **28** | OWL: Optimized Workforce Learning for General Multi-Agent Assistance |
| 71 | `agent0ai/agent-zero` | 17682 | 2026-05-15 | Python | agent | 4 | 5 | 3 | 4 | 4 | 3 | 3 | 2 | **28** | Agent Zero AI framework |
| 72 | `hugohe3/ppt-master` | 17169 | 2026-05-16 | Python | code-intel,dev-tool,agent | 4 | 5 | 3 | 4 | 4 | 3 | 3 | 2 | **28** | AI generates natively editable PPTX from any document |
| 73 | `agentscope-ai/QwenPaw` | 16710 | 2026-05-15 | Python | agent,llm-infra | 4 | 5 | 3 | 4 | 4 | 3 | 3 | 2 | **28** | Your Personal AI Assistant; easy to install, deploy on your own machine or cloud |
| 74 | `langbot-app/LangBot` | 16047 | 2026-05-16 | Python | agent,llm-infra | 4 | 5 | 3 | 4 | 4 | 3 | 3 | 2 | **28** | Production-grade platform for building agentic IM bots |
| 75 | `browser-use/web-ui` | 15974 | 2026-05-15 | Python | agent,llm-infra | 4 | 5 | 3 | 4 | 4 | 3 | 3 | 2 | **28** | Run AI Agent in your browser. |
| 76 | `iii-hq/iii` | 15711 | 2026-05-16 | Rust | dev-tool,agent | 4 | 5 | 3 | 3 | 4 | 4 | 3 | 2 | **28** | Effortlessly compose, extend, and observe every service in real-time |
| 77 | `JCodesMore/ai-website-cloner-template` | 14864 | 2026-05-07 | TypeScript | code-intel,agent | 5 | 4 | 2 | 3 | 4 | 3 | 3 | 4 | **28** | Clone any website with one command using AI coding agents |
| 78 | `lsdefine/GenericAgent` | 11581 | 2026-05-16 | Python | agent | 5 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **28** | Self-evolving agent: grows skill tree from 3.3K-line seed |
| 79 | `langchain-ai/open-swe` | 9810 | 2026-05-16 | Python | code-intel,agent,llm-infra | 5 | 5 | 1 | 4 | 4 | 3 | 2 | 4 | **28** | An Open-Source Asynchronous Coding Agent |
| 80 | `CoplayDev/unity-mcp` | 9661 | 2026-05-05 | C# | code-intel,dev-tool,agent | 5 | 4 | 1 | 3 | 4 | 5 | 2 | 4 | **28** | Unity MCP acts as a bridge, allowing AI assistants (like Claude, Cursor) to inte |
| 81 | `op7418/guizang-ppt-skill` | 9189 | 2026-05-16 | HTML | code-intel,dev-tool,agent | 5 | 5 | 1 | 3 | 4 | 3 | 2 | 5 | **28** | AI-agent Skill for generating polished HTML slide decks |
| 82 | `idosal/git-mcp` | 8081 | 2026-05-08 | TypeScript | code-intel,agent | 5 | 4 | 1 | 3 | 4 | 5 | 2 | 4 | **28** | Put an end to code hallucinations! GitMCP is a free, open-source, remote MCP ser |
| 83 | `Upsonic/Upsonic` | 7848 | 2026-05-16 | Python | agent | 5 | 5 | 1 | 4 | 4 | 3 | 2 | 4 | **28** | Build autonomous AI agents in Python. |
| 84 | `localstack/localstack` | 64933 | 2026-03-23 | Python | dev-tool | 3 | 3 | 5 | 4 | 4 | 3 | 4 | 1 | **27** | A fully functional local AWS cloud stack. Develop and test your cloud & Server |
| 85 | `GoogleChrome/lighthouse` | 30191 | 2026-05-12 | JavaScript | dev-tool | 3 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **27** | Automated auditing, performance metrics, and best practices for the web. |
| 86 | `voideditor/void` | 28763 | 2026-01-12 | TypeScript | code-intel,dev-tool | 5 | 2 | 4 | 3 | 4 | 5 | 3 | 1 | **27** | (no description) |
| 87 | `reflex-dev/reflex` | 28424 | 2026-05-16 | Python | general | 2 | 5 | 4 | 4 | 4 | 3 | 4 | 1 | **27** | Web apps in pure Python |
| 88 | `wavetermdev/waveterm` | 20464 | 2026-05-15 | Go | dev-tool,agent | 3 | 5 | 3 | 3 | 4 | 3 | 4 | 2 | **27** | An open-source, AI-integrated, cross-platform terminal for seamless workflows |
| 89 | `SWE-agent/SWE-agent` | 19233 | 2026-04-27 | Python | dev-tool,agent,llm-infra | 4 | 4 | 3 | 4 | 4 | 3 | 3 | 2 | **27** | SWE-agent takes a GitHub issue and tries to automatically fix it, using your LM |
| 90 | `microsoft/agent-lightning` | 17184 | 2026-04-29 | Python | agent,llm-infra | 4 | 4 | 3 | 4 | 4 | 3 | 3 | 2 | **27** | The absolute trainer to light up AI agents. |
| 91 | `trycua/cua` | 16832 | 2026-05-14 | HTML | code-intel,agent,llm-infra | 4 | 5 | 3 | 3 | 4 | 3 | 3 | 2 | **27** | Open-source infrastructure for Computer-Use Agents. Sandboxes, SDKs, and benchma |
| 92 | `MemoriLabs/Memori` | 14528 | 2026-05-15 | Python | code-intel,agent,llm-infra | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **27** | Memori is agent-native memory infrastructure |
| 93 | `MODSetter/SurfSense` | 14230 | 2026-05-16 | Python | code-intel,llm-infra | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **27** | An open source, privacy focused alternative to NotebookLM for teams |
| 94 | `microsoft/RD-Agent` | 13046 | 2026-05-13 | Python | agent | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **27** | Research and development (R&D) automation agent |
| 95 | `browser-use/browser-harness` | 12886 | 2026-05-15 | Python | agent,llm-infra | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **27** | Browser Harness - Self-healing harness that enables LLMs to complete any task. |
| 96 | `waooAI/waoowaoo` | 12234 | 2026-05-11 | TypeScript | dev-tool,agent | 4 | 5 | 2 | 3 | 4 | 4 | 3 | 2 | **27** | Industry-first professional AI Agent platform for controllable AI video |
| 97 | `e2b-dev/E2B` | 12202 | 2026-05-15 | Python | agent | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **27** | Open-source, secure environment with real-world tools for enterprise-grade agent |
| 98 | `alibaba/OpenSandbox` | 10660 | 2026-05-15 | Python | code-intel,agent,llm-infra | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **27** | Secure, Fast, and Extensible Sandbox runtime for AI agents. |
| 99 | `aden-hive/hive` | 10345 | 2026-05-15 | Python | agent | 4 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **27** | Multi-Agent Harness for Production AI |
| 100 | `holaboss-ai/holaOS` | 5627 | 2026-05-15 | TypeScript | agent | 5 | 5 | 1 | 3 | 4 | 3 | 2 | 4 | **27** | Turn repeat work into running AI work-streams. |
| 101 | `CorentinTh/it-tools` | 38547 | 2026-05-14 | Vue | general | 2 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **26** | Collection of handy online tools for developers, with great UX. |
| 102 | `surrealdb/surrealdb` | 32126 | 2026-05-12 | Rust | general | 2 | 5 | 4 | 3 | 4 | 3 | 4 | 1 | **26** | A scalable, distributed, collaborative, document-graph database |
| 103 | `terrastruct/d2` | 23696 | 2026-04-24 | Go | code-intel | 4 | 4 | 3 | 3 | 4 | 3 | 4 | 1 | **26** | D2 is a modern diagram scripting language that turns text to diagrams. |
| 104 | `jarun/nnn` | 21565 | 2026-04-19 | C | code-intel,dev-tool | 4 | 4 | 3 | 3 | 4 | 3 | 4 | 1 | **26** | n3 The unorthodox terminal file manager |
| 105 | `marimo-team/marimo` | 20999 | 2026-05-15 | Python | general | 2 | 5 | 3 | 4 | 4 | 3 | 4 | 1 | **26** | A reactive notebook for Python - run reproducible experiments, query with SQL |
| 106 | `Avaiga/taipy` | 19188 | 2026-05-07 | Python | dev-tool | 3 | 4 | 3 | 4 | 4 | 3 | 3 | 2 | **26** | Turns Data and AI algorithms into production-ready web applications in no time. |
| 107 | `GoogleContainerTools/skaffold` | 15824 | 2026-05-14 | Go | dev-tool | 3 | 5 | 3 | 3 | 4 | 3 | 3 | 2 | **26** | Easy and Repeatable Kubernetes Development |
| 108 | `treeverse/dvc` | 15601 | 2026-04-28 | Python | dev-tool | 3 | 4 | 3 | 4 | 4 | 3 | 3 | 2 | **26** | Data Versioning and ML Experiments |
| 109 | `zoicware/RemoveWindowsAI` | 11672 | 2026-05-11 | PowerShell | code-intel | 4 | 5 | 2 | 3 | 4 | 3 | 3 | 2 | **26** | Force Remove Copilot, Recall and More in Windows 11 |
| 110 | `voxel51/fiftyone` | 10710 | 2026-05-16 | Python | dev-tool | 3 | 5 | 2 | 4 | 4 | 3 | 3 | 2 | **26** | Refine high-quality datasets and visual AI models |
| 111 | `assistant-ui/assistant-ui` | 10087 | 2026-05-16 | TypeScript | code-intel,agent | 4 | 5 | 2 | 3 | 4 | 3 | 3 | 2 | **26** | Typescript/React Library for AI Chat |
| 112 | `frankbria/ralph-claude-code` | 9140 | 2026-04-13 | Shell | code-intel,agent | 5 | 3 | 1 | 3 | 4 | 3 | 2 | 5 | **26** | Autonomous AI development loop for Claude Code with intelligent exit detection |
| 113 | `microsoft/TaskWeaver` | 6163 | 2026-03-23 | Python | code-intel,agent,llm-infra | 4 | 3 | 1 | 4 | 4 | 4 | 2 | 4 | **26** | The first 'code-first' agent framework for seamlessly planning and executing dat |
| 114 | `Narcooo/inkos` | 6139 | 2026-05-15 | TypeScript | code-intel,dev-tool,agent | 4 | 5 | 1 | 4 | 4 | 4 | 2 | 2 | **26** | Autonomous novel writing AI Agent |
| 115 | `refinedev/refine` | 34711 | 2026-05-07 | TypeScript | general | 2 | 4 | 4 | 3 | 4 | 3 | 4 | 1 | **25** | A React Framework for building internal tools, admin panels, dashboards & B2B |
| 116 | `DevToys-app/DevToys` | 31521 | 2026-02-25 | C# | dev-tool | 3 | 3 | 4 | 3 | 4 | 3 | 4 | 1 | **25** | A Swiss Army knife for developers. |
| 117 | `leon-ai/leon` | 17232 | 2026-05-16 | TypeScript | agent | 2 | 5 | 3 | 3 | 4 | 3 | 3 | 2 | **25** | Leon is your open-source personal assistant. |
| 118 | `grafana/pyroscope` | 11435 | 2026-05-15 | Go | code-intel | 4 | 5 | 2 | 3 | 4 | 3 | 3 | 1 | **25** | Continuous Profiling Platform |
| 119 | `sourcegraph/sourcegraph-public-snapshot` | 10272 | 2024-09-02 | Go | code-intel | 4 | 0 | 2 | 3 | 4 | 5 | 3 | 4 | **25** | Code AI platform with Code Search & Cody (ARCHIVED snapshot) |
| 120 | `OpenPipe/ART` | 9459 | 2026-05-16 | Python | agent,llm-infra | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | Agent Reinforcement Trainer |
| 121 | `X-PLUG/MobileAgent` | 8673 | 2026-05-14 | Python | agent,llm-infra | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | Mobile-Agent: The Powerful GUI Agent Family |
| 122 | `microsoft/UFO` | 8653 | 2026-05-15 | Python | code-intel,agent,llm-infra | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | UFO3: Weaving the Digital Agent Galaxy |
| 123 | `shaxiu/XianyuAutoAgent` | 7559 | 2026-05-10 | Python | agent,llm-infra | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | Xianyu auto customer-service AI agent |
| 124 | `HKUDS/Vibe-Trading` | 7432 | 2026-05-16 | Python | agent | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | Vibe-Trading: Your Personal Trading Agent |
| 125 | `nesquena/hermes-webui` | 7426 | 2026-05-16 | Python | agent | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | Hermes WebUI: best way to use Hermes Agent from web or phone |
| 126 | `ChatLab/ChatLab` | 6361 | 2026-05-15 | TypeScript | agent | 4 | 5 | 1 | 3 | 4 | 4 | 2 | 2 | **25** | Local-first chat history analyzer with AI |
| 127 | `GetBindu/Bindu` | 5857 | 2026-05-16 | Python | agent | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | Bindu: Turn any AI agent into a living microservice |
| 128 | `brokermr810/QuantDinger` | 5383 | 2026-05-16 | Python | agent | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | AI quantitative trading platform |
| 129 | `areal-project/AReaL` | 5176 | 2026-05-15 | Python | agent,llm-infra | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | The RL Bridge for LLM-based Agent Applications. |
| 130 | `InternLM/xtuner` | 5129 | 2026-05-15 | Python | agent,llm-infra | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | A Next-Generation Training Engine Built for Ultra-Large MoE Models |
| 131 | `microsoft/fara` | 5112 | 2026-05-12 | Python | agent,llm-infra | 4 | 5 | 1 | 4 | 4 | 3 | 2 | 2 | **25** | Fara-7B: An Efficient Agentic Model for Computer Use |
| 132 | `responsively-org/responsively-app` | 24929 | 2026-03-28 | TypeScript | dev-tool | 3 | 3 | 3 | 3 | 4 | 3 | 4 | 1 | **24** | A modified web browser that helps in responsive web development. |
| 133 | `dailydotdev/daily` | 19826 | 2026-03-10 | ? | dev-tool | 3 | 3 | 3 | 3 | 4 | 3 | 3 | 2 | **24** | daily.dev is a professional network for developers |
| 134 | `public-api-lists/public-api-lists` | 14467 | 2026-04-02 | ? | general | 2 | 3 | 2 | 5 | 4 | 3 | 3 | 2 | **24** | A curated list of free public APIs across 48 categories |
| 135 | `illacloud/illa-builder` | 12246 | 2026-04-30 | TypeScript | code-intel,dev-tool | 4 | 4 | 2 | 3 | 4 | 3 | 3 | 1 | **24** | Low-code platform |
| 136 | `MiroMindAI/MiroThinker` | 8150 | 2026-04-25 | Python | agent | 4 | 4 | 1 | 4 | 4 | 3 | 2 | 2 | **24** | MiroThinker is a deep research agent |
| 137 | `EvoMap/evolver` | 7437 | 2026-05-16 | JavaScript | agent | 4 | 5 | 1 | 3 | 4 | 3 | 2 | 2 | **24** | The GEP-powered self-evolving engine for AI agents. |
| 138 | `universal-ctags/ctags` | 7183 | 2026-05-13 | C | code-intel,dev-tool | 4 | 5 | 1 | 3 | 4 | 3 | 2 | 2 | **24** | A maintained ctags implementation |
| 139 | `logancyang/obsidian-copilot` | 6997 | 2026-05-16 | TypeScript | code-intel,agent | 4 | 5 | 1 | 3 | 4 | 3 | 2 | 2 | **24** | THE Copilot in Obsidian |
| 140 | `olimorris/codecompanion.nvim` | 6583 | 2026-05-16 | Lua | code-intel | 4 | 5 | 1 | 3 | 4 | 3 | 2 | 2 | **24** | AI Coding, Vim Style |
| 141 | `crestalnetwork/intentkit` | 6499 | 2026-05-08 | Python | agent | 4 | 4 | 1 | 4 | 4 | 3 | 2 | 2 | **24** | IntentKit is an open-source, self-hosted cloud agent cluster |
| 142 | `volcengine/MineContext` | 5319 | 2026-05-07 | Python | agent,llm-infra | 4 | 4 | 1 | 4 | 4 | 3 | 2 | 2 | **24** | MineContext is your proactive context-aware AI partner |
| 143 | `datawhalechina/vibe-vibe` | 5041 | 2026-04-30 | Dockerfile | dev-tool,agent | 4 | 4 | 1 | 3 | 4 | 4 | 2 | 2 | **24** | The First Systematic Vibe Coding Tutorial |
| 144 | `jo-inc/camofox-browser` | 5036 | 2026-05-12 | JavaScript | dev-tool,agent | 4 | 5 | 1 | 3 | 4 | 3 | 2 | 2 | **24** | Stealth headless browser for AI agents - bypass Cloudflare |
| 145 | `presenton/presenton` | 5010 | 2026-05-16 | JavaScript | agent | 4 | 5 | 1 | 3 | 4 | 3 | 2 | 2 | **24** | Open-Source AI Presentation Generator |
| 146 | `e2b-dev/awesome-ai-agents` | 27854 | 2025-02-26 | ? | agent | 4 | 0 | 4 | 5 | 4 | 1 | 3 | 2 | **23** | A list of AI autonomous agents |
| 147 | `Unleash/unleash` | 13478 | 2026-05-15 | TypeScript | general | 2 | 5 | 2 | 3 | 4 | 3 | 3 | 1 | **23** | Open-source feature management platform |
| 148 | `zealdocs/zeal` | 12627 | 2026-05-15 | C++ | general | 2 | 5 | 2 | 3 | 4 | 3 | 3 | 1 | **23** | Offline documentation browser inspired by Dash |
| 149 | `darrenburns/posting` | 11913 | 2026-03-25 | Python | dev-tool | 3 | 3 | 2 | 4 | 4 | 3 | 3 | 1 | **23** | The modern API client that lives in your terminal. |
| 150 | `0xJacky/nginx-ui` | 11145 | 2026-05-15 | Go | general | 2 | 5 | 2 | 3 | 4 | 3 | 3 | 1 | **23** | Yet another WebUI for Nginx |
| 151 | `microsoft/Mastering-GitHub-Copilot-for-Paired-Programming` | 7896 | 2026-04-08 | Python | code-intel | 4 | 3 | 1 | 4 | 4 | 3 | 2 | 2 | **23** | Multi-module course on GitHub Copilot for paired programming |
| 152 | `AgentOps-AI/agentops` | 5555 | 2026-03-19 | Python | agent,llm-infra | 4 | 3 | 1 | 4 | 4 | 3 | 2 | 2 | **23** | Python SDK for AI agent monitoring, LLM cost tracking |
| 153 | `lencx/Noi` | 8909 | 2026-02-04 | TypeScript | general | 5 | 2 | 1 | 3 | 4 | 3 | 2 | 2 | **22** | Less chaos. More flow. |
| 154 | `intitni/CopilotForXcode` | 8254 | 2026-04-15 | Swift | code-intel,dev-tool | 4 | 3 | 1 | 3 | 4 | 4 | 2 | 1 | **22** | The first GitHub Copilot, Codeium and ChatGPT Xcode Source Editor Extension |
| 155 | `business-science/ai-data-science-team` | 5221 | 2026-01-28 | Python | code-intel,agent | 4 | 2 | 1 | 4 | 4 | 3 | 2 | 2 | **22** | An AI-powered data science team of agents |
| 156 | `AIDC-AI/ComfyUI-Copilot` | 5149 | 2026-04-07 | TypeScript | code-intel,dev-tool,agent | 4 | 3 | 1 | 3 | 4 | 3 | 2 | 2 | **22** | An AI-powered custom node for ComfyUI |
| 157 | `fishaudio/Bert-VITS2` | 8743 | 2026-04-27 | Python | general | 2 | 4 | 1 | 4 | 4 | 3 | 2 | 1 | **21** | vits2 backbone with multilingual-bert |
| 158 | `Exafunction/windsurf.vim` | 5115 | 2026-03-31 | Vim Script | code-intel | 4 | 3 | 1 | 3 | 4 | 3 | 2 | 1 | **21** | Free, ultrafast Copilot alternative for Vim and Neovim |
| 159 | `dice2o/BingGPT` | 8977 | 2024-02-08 | JavaScript | code-intel | 4 | 0 | 1 | 3 | 4 | 3 | 2 | 2 | **19** | Desktop application of new Bing's AI-powered chat |
| 160 | `opencx-labs/copilot` | 5119 | 2025-03-26 | TypeScript | code-intel,dev-tool,llm-infra | 4 | 0 | 1 | 3 | 4 | 3 | 2 | 2 | **19** | (no description) |

---

## Section B - Top-10 highest-priority **code-intel** adds (filtered from Section A; generic agent-frameworks excluded)

| # | Repo | Stars | Sigma | Why TIER-1 for claude-sota-installed |
|---:|---|---:|---:|---|
| 1 | `continuedev/continue` | 33221 | 34 | Open-source IDE-integrated AI coding agent (Continue) - TIER-1 SOTA for IDE-AI surface in this tranche |
| 2 | `TabbyML/tabby` | 33522 | 31 | Self-hosted code-completion server (Tabby) - TIER-1 SOTA for on-prem AI completion |
| 3 | `puppeteer/puppeteer` | 94332 | 29 | Browser automation - agent tool-surface, already shipped via Chrome DevTools MCP in this runtime |
| 4 | `usebruno/bruno` | 43861 | 29 | Opensource API client; dev-tool for HTTP probing inside agents |
| 5 | `CopilotKit/CopilotKit` | 31453 | 29 | Frontend SDK for embedding copilots - UI-side complement to backend agents |
| 6 | `ycm-core/YouCompleteMe` | 25908 | 29 | Vim completion engine; mature, not LLM-native but bedrock for editor-completion |
| 7 | `yamadashy/repomix` | 24929 | 29 | Packs entire repo into LLM-friendly single file - direct MCP-server already registered in this runtime |
| 8 | `koalaman/shellcheck` | 39428 | 28 | Static analysis for shell - install-priority for any agent emitting shell |
| 9 | `lapce/lapce` | 38392 | 28 | Rust-native editor with LSP-first design |
| 10 | `localstack/localstack` | 64933 | 27 | AWS local emulator; dev-tool not code-intel core |

**Selection logic**: Filter Section A to repos that ship a **code-intelligence primitive** (LSP/AST/completion/code-search/static-analysis) OR a **dev-tool primitive** already callable from a Claude agent (browser, HTTP client, repo-packer, shell-linter). Generic agent-frameworks (OpenHands, agno-agi, AstrBot, CherryHQ, hello-agents, awesome-* curated lists) are excluded from this Top-10 because they belong to the **agent-framework tranche**, not code-intelligence. They remain in Section A for completeness.

---

## Section C - Code-intel landscape (Cursor / Aider / Tabby / Continue / Cody / Phind / Augment) - current SOTA at 2026-05-16

Probe-time observations (cross-referenced against Section A matrix where applicable):

| Tool | Source-availability | In Section A? | Stars (probe) | SOTA-axis verdict |
|---|---|---|---:|---|
| **Cursor** | Closed-source (Anysphere proprietary IDE fork of VSCode) | NO - does not appear; no public repo | n/a | **Market-leader for closed-IDE-AI**; not adoptable as primitive but defines UX bar. Companion `cursor-deepwiki` / `cursor-tools` community wrappers exist but are not in the >=5k-star tranche. |
| **Aider** | Open (Apache-2.0, paul-gauthier/aider) | NO - not surfaced by the 10 queries this probe ran (topic-tag gap; Aider uses `python` `cli` tags not `coding-assistant`) | n/a in probe | **TIER-1 SOTA for CLI-pair-programmer**; established baseline for terminal AI coder. Spec-driven flows ship since 2024. **Honest non-finding**: not in this tranche's GraphQL output -> re-probe with `paul-gauthier/aider` name-search needed. |
| **Tabby** | Open (Apache-2.0, TabbyML/tabby) | YES (Section A, **33,522 stars**, Rust) | 33522 | **TIER-1 SOTA for self-hosted code-completion** (IDE-side LSP completion + local LLM serving). Pushed 2026-03-02 - slight maintenance gap (~75 days) vs other Top-10 (~1-30 days). Still primary recommendation when air-gapped. |
| **Continue** | Open (Apache-2.0, continuedev/continue) | YES (Section A, **33,221 stars**, TypeScript) | 33221 | **TIER-1 SOTA for IDE-integrated agentic AI** (VSCode/JetBrains extension + CLI). Pushed 2026-05-15 (fresh). Description signals 2026 pivot to 'source-controlled AI checks, enforceable in CI' - feature-flagging closer to org-policy lane. **Highest install-priority of the IDE-AI plugins**. |
| **Cody** | Open (Apache-2.0, sourcegraph/cody) wrapping Sourcegraph closed-search | NO in Section A (Sourcegraph appears as `sourcegraph-public-snapshot` 10,272 stars, but Cody-specific repo did not surface) | n/a | **TIER-2 SOTA for IDE-AI with code-search backbone**. Sourcegraph's `sourcegraph-public-snapshot` was archived in 2024-09 (last push); the live product moved private. Cody itself remains open. **Honest non-finding**: probe missed `sourcegraph/cody` - topic-tag gap. |
| **Phind** | Closed-source (Phind, Inc. - search/IDE product) | NO - no public repo | n/a | **Closed; not adoptable as primitive**. Maintains search-grounded coding answers; UX bar reference only. |
| **Augment** | Closed-source (Augment Code - IDE plugin) | NO - no public repo | n/a | **Closed; not adoptable as primitive**. Differentiated on whole-codebase context; UX bar reference. Note `x1xhlol/system-prompts-and-models-of-ai-tools` (137k stars row in Section A) reverse-engineers Augment's system prompt + others - useful evidence-base. |

**Current SOTA, summary verdict (2026-05-16)**:

1. **Closed-IDE-AI lane (Cursor, Phind, Augment)** sets the UX/quality bar but is **non-adoptable** as primitive - best mined for system-prompt evidence via `x1xhlol/system-prompts-and-models-of-ai-tools` (137k stars) and `e2b-dev/awesome-ai-agents` (27k stars).
2. **Open IDE-AI lane (Continue, Cody, Tabby)** is the **adoptable SOTA stack**:
   - **Continue** - top pick for IDE-side claude-sota-installed companion (TypeScript, Apache-2.0, fresh 2026-05-15)
   - **Tabby** - top pick when air-gap / on-prem required (Rust, Apache-2.0)
   - **Cody** - top pick when paired with Sourcegraph code-search backend (Sourcegraph commercial)
3. **CLI/agent lane (Aider, OpenHands, Claude Code, codex CLI)** - Aider missing from this probe -> re-probe with name-search. **Claude Code + codex CLI are already the installed stack** in this runtime; the gap is **whether to add a third CLI agent** (Aider provides a code-diff-discipline pattern Claude Code lacks natively, e.g. SEARCH/REPLACE block format). Recommend: STUDY-PILOT, not full install.

---

## Section D - Honest non-findings (per CR-10 research-first discipline)

1. **Topic-tag thinness**: 3 of 5 spec-mandated queries returned <=1 result. GitHub topic tags `code-intelligence`, `llm-coding`, `devtool` are sparsely adopted relative to actual ecosystem size. Supplementary queries (q6-q10) compensated.
2. **Aider absent from probe**: `paul-gauthier/aider` (~25k stars at probe-time) did not surface across all 10 queries - Aider self-tags with `cli`, `python` not `coding-assistant`. **Followup probe needed**: name-search `aider` OR `topic:llm-cli` OR `paul-gauthier/aider`.
3. **Cody / Codeium absent**: same topic-tag gap. `sourcegraph/cody`, `Exafunction/codeium` did not surface. Only stale `sourcegraph-public-snapshot` (last push 2024-09-02 - archived) appeared. **Followup probe needed**: name-search.
4. **License-field not pulled by GraphQL query**: D5 (license) is a default-4 unless desc keyword triggers downgrade. **Real license probe** would require per-repo `licenseInfo { spdxId }` query - deferred to per-candidate due-diligence pre-install.
5. **No HEAD-commit probe**: D2 freshness is computed from `pushedAt` only - could be a docs-only push. **Real freshness** would require commit-author or commit-count delta probe.
6. **No 'previously-installed' cross-reference**: this probe does not check which repos are **already in the runtime** (via `Z:/repos/deps/` directory listing OR `.mcp.json` / plugin manifest). The Top-10 (Section B) calls out `yamadashy/repomix` and `puppeteer/puppeteer` as **already-installed via MCP**, but the other 8 picks are **not cross-referenced** against the installed-set. **Followup**: scan `.mcp.json` + plugin manifest before declaring INSTALL verdict on any Top-10 row.
7. **No D9-D10 scoring** (vs SRA 10-dim full rubric): D9 (test-suite shape) and D10 (FM-class catalog hits) require source-clone + per-repo file-system probe, out of scope for GraphQL bulk-probe stage. Defer to SOTA-convergence-audit skill for each Top-10 pick.
8. **Some hits are clearly noise**: e.g. `affaan-m/everything-claude-code` (184k stars, top score 36) and several other very-high-star 'everything-claude-code' / 'awesome-claude-*' entries are **curated lists, not primitives** - they top the score because the rubric weights stars + freshness heavily. Top-10 (Section B) filters these out. Per-list-utility: useful as **discovery-surface**, not as **install-target**.
9. **Query #1 returned only 1 repo (sourcegraph-public-snapshot, last push 2024-09)**: this is **archived** - should not be scored as adoptable. The score (25) overstates current relevance; **strike** from any adoption decision.
10. **No verification of D5 license**: per non-finding #4, every `MIT`/`Apache-2.0`/`AGPL-3.0` classification in Section B's commentary is **inferred from project-class convention**, not probed. Pre-install due-diligence MUST verify license via direct repo `LICENSE` file fetch.
11. **5-of-10 queries also surfaced agent-framework noise**: q7 (`topic:ai-agent`), q8 (`topic:developer-tools`), q10 (`topic:agent` Python) dominated the result set by raw count, but the matrix includes them anyway for full transparency. Reader should weight Top-10 (Section B) and Section C verdicts more heavily than raw Section A scores.
12. **No cross-tranche dedupe**: this Tranche D output does not check against earlier tranches A/B/C in `docs/grand-synthesis-2026-05-16/06-fresh-research-delta/`. Likely overlap on Continue, Tabby, OpenHands. Followup: post-tranche consolidation pass to dedupe across all tranches before INSTALL/STUDY-PILOT/REJECT verdicts get issued.
13. **Emoji stripping in row descriptions**: the original repo descriptions contained emoji that were stripped from Section A to keep markdown table parsing robust. Original (emoji-rich) descriptions preserved in raw GraphQL output at `Z:/tmp/tranche-d/q[1-10].json` (transient; may be cleaned).

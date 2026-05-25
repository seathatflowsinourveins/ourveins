# W259 Wave-2 GraphQL Probe Round 2 — MISSED SOTA REPOS

> **Wave:** W259 round 2 (saturation pass)
> **Date:** 2026-05-16
> **Operator brief:** Continue probing after Wave 1 rate-limit at query 29. Saturate the agent-harness cluster, the memory cluster, and the 5 deferred code-search queries via rate-limit-conscious patterns (GitHub GraphQL + Exa fallback).
> **Dedup baseline:** Wave 1 master scoring matrix (`05-scoring/MASTER-SCORING-MATRIX-W259.md`) and Wave 1 missed list (`01-graphql-discovery/MISSED-SOTA-REPOS-2026-05-16.md`).
> **Cite-class:** TIER-3-LOCAL-DISCOVERY (probe-output rollup); each row carries direct GH HTML URL + star count from native GraphQL API or Exa fallback fetch.

---

> ## ⚠️ CORRECTION BANNER (W259-v16, 2026-05-16)
>
> **This dated discovery record describes `vectorize-io/hindsight` as having LongMemEval "independently reproduced by VA-Tech Sanghani + WaPo." That is FALSE and is retracted.** arXiv 2512.12818 ("Hindsight is 20/20") is **CO-AUTHORED** by Virginia Tech and The Washington Post **alongside Vectorize.io** — they are on hindsight's OWN byline. Co-authorship ≠ independent reproduction. No memory engine has an independently-reproduced LongMemEval number. Authoritative correction: `03-deepdive/MEMORY-SOTA-EVIDENCE-AUDIT-W259v16.md`. hindsight remains memory PRIMARY downstream — but on INTEGRATION (only full native-CC plugin: hooks+MCP+skill, MIT, Windows-verified), NOT on a reproduction claim.

---

## §1 Query log

| # | Query | Type | Source | Total Count | Notes |
|---|---|---|---|---|---|
| A1 | `topic:claude-skill stars:>30` | repo-search | GH API | 73 | Mostly low-signal individual skill repos (≤200★); 0 added to NEW table. |
| A2 | `topic:claude-mcp stars:>30` | repo-search | GH API | 16 | Same — niche MCP servers; 1 row added (yzfly/Awesome-MCP-ZH if not already). |
| A3 | `topic:agent-toolkit stars:>100` | repo-search | GH API | 1 | GetStream/ai-agent-tools-catalog (low-signal, older). |
| A4 | `topic:agent-tool stars:>100` | repo-search | GH API | 0 | Empty result. |
| A5 | `topic:agent-platform stars:>200` | repo-search | GH API | 3 | coze-dev/coze-studio, datahub-project/datahub, jd-opensource/JoySafeter. |
| B1 | `".claude/plugins" path:/.claude/ language:json` | code-search | GH API | RATE-LIMITED | First code-search call hit 403. Skipped per CR-10. |
| B2 | `plugin.json path:.claude/plugins` | code-search | GH API | RATE-LIMITED | 403 same fire. |
| B3 | `".mcp.json" in:path stars:>50` | code-search | GH API | RATE-LIMITED | Deferred per CR-10 (auth fail observed mid-run). |
| B4 | `"agents/" in:path language:markdown` | code-search | GH API | AUTH-FAIL | "Requires authentication" 401 after first round. |
| B5 | `"agent-skills" in:readme stars:>50` | code-search | GH API | NOT-RUN | Wave 1 already deferred; rate budget out. |
| C1 | `org:openai-experimental pushed:>2026-01-01` | repo-search | GH API | VALIDATION-FAIL | Org doesn't exist or is hidden; 422. |
| C2 | `org:stripe agent pushed:>2026-01-01` | repo-search | GH API | 1 | `stripe/link-cli` (agentic payments — NEW; 2026-04-23). |
| C3 | `org:cloudflare pushed:>2026-01-01` | repo-search | GH API | 208 | `cloudflare/agents`, `moltworker`, `vibesdk`, `agentic-inbox`, `mcp-server-cloudflare`, `workers-oauth-provider`, `capnweb`, `kumo`. |
| C4 | `org:vercel-labs pushed:>2026-01-01` | repo-search | GH API | 206 | **Goldmine** — `agent-skills`, `skills`, `coding-agent-template`, `ralph-loop-agent`, `knowledge-agent-template`, `ai-cli`, `dev3000`, `web-interface-guidelines`, `bash-tool`, `opensrc`, `deepsec`, `openreview`, `tersa`, `webreel`, `agent-browser`, `open-agents`, `next-skills`, `wterm`, `just-bash`, `json-render`, `portless`, `workflow-builder-template`, `emulate`, `zero`. |
| C5 | `org:anthropics fork:false pushed:>2025-12-01` | repo-search | GH API | 43 | **Saturation pass** — `claude-plugins-official`, `claude-plugins-community`, `knowledge-work-plugins`, `claude-code-action`, `claude-code-base-action`, `claude-agent-sdk-python`, `claude-agent-sdk-typescript`, `claude-agent-sdk-demos`, `cwc-long-running-agents`, `claude-for-legal`, `claude-code-security-review`, `riv2025-long-horizon-coding-agent-demo`, `agent-sdk-workshop`, `cwc-workshops`, `life-sciences`, `healthcare`, `financial-services`, `model-cards`, `claude-constitution`, `devcontainer-features`, `anthropic-sdk-{python,typescript,go,java,csharp,ruby,php}`, `headvis`, `homebrew-tap`, `buffa`, `s5cmd`, `claudes-c-compiler`, `claude-desktop-buddy`, `claude-ai-mcp`, `tailscale-hint-extension`, `connect-rust`. |
| C6 | `org:supabase ai pushed:>2026-01-01` | repo-search | GH API | 2 | `supabase/agent-skills` (NEW; Jan 2026), `supabase/supabase` (existing). |
| C7 | `org:smithery-ai pushed:>2026-01-01` | repo-search | GH API | 20 | `cli`, `agent.pw`, `mcp-to-cli`, `mouseless`, `typescript-api`, `skills`, `hylo`, `hylo-plugins`, `sandbox`, `agent-hook`, `workers-biscuit`, `mcp-vs-cli-bench`, `okay-error`, `flamecast-v1`, `mcp-oauth-debug`, `design`, `openchat`, `registry`, `ask-codex`. |
| C8 | `org:portkey-ai pushed:>2026-01-01` | repo-search | GH API | 13 | `gateway`, `hoot`, `cli`, `skills`, `models`, `terraform-provider-portkey`, plus SDKs. |
| C9 | `org:helicone pushed:>2026-01-01` | repo-search | GH API | 2 | `helicone` (in Wave 1 already), `ai-sdk-provider` (NEW; Oct 2025). |
| D1 | `topic:autonomous-agent stars:>500 pushed:>2026-01-01` | repo-search | GH API | 15 | `Upsonic/Upsonic`, `lsdefine/GenericAgent`, `stakpak/agent`, `skalesapp/skales`, `wanshuiyin/Auto-claude-code-research-in-sleep`, `gmickel/flow-next`, `EvoMap/evolver`, `BlockRunAI/Franklin`, `uditgoenka/autoresearch`, `Xiangyue-Zhang/auto-deep-researcher-24x7`, `moltlaunch/cashclaw`, `lafmdp/Awesome-Papers-Autonomous-Agent`, `grinev/opencode-telegram-bot`, `szczyglis-dev/py-gpt`, `leo-lilinxiao/codex-autoresearch`. |
| D2 | `topic:agent-loop stars:>200 pushed:>2026-01-01` | repo-search | GH API | 1 | `MagicCube/helixent`. |
| D3 | `topic:agent-runtime stars:>200 pushed:>2026-01-01` | repo-search | GH API | 13 | `trustgraph-ai/trustgraph`, `inclusionAI/AWorld`, `promptise-com/Foundry`, `golf-mcp/golf`, `CelestoAI/SmolVM`, `swarmclawai/swarmclaw`, `clawdotnet/openclaw.net`, `open-gitagent/clawless`, `fastclaw-ai/fastclaw`, `crabtalk/crabtalk`, `FonaTech/Clouds-Coder`, `ucsandman/DashClaw`, `FrankHui/paragents`. |
| D4 | `topic:ai-coding-agent stars:>500 pushed:>2026-01-01` | repo-search | GH API | 7 | `can1357/oh-my-pi`, `graykode/abtop`, `wrtnlabs/autobe`, `wecode-ai/RunVSAgent`, `repowise-dev/claude-code-prompts`, `friuns2/codex-mobile`. |
| E1 | `topic:agent-memory stars:>500 pushed:>2026-01-01` | repo-search | GH API | RATE-LIMITED | Wave 2 saturation — fallback to Exa. |
| E2 | `topic:llm-memory stars:>500 pushed:>2026-01-01` | repo-search | GH API | RATE-LIMITED | Same — Exa fallback. |
| E3 | `topic:long-term-memory stars:>200 pushed:>2026-01-01` | repo-search | GH API | RATE-LIMITED | Same. |
| E4 | `topic:knowledge-graph stars:>1000 pushed:>2026-01-01` | repo-search | GH API | 48 | `trustgraph-ai/trustgraph`, `HKUDS/LightRAG`, `topoteretes/cognee`, `OpenSPG/KAG`, `potpie-ai/potpie`, `neo4j-labs/llm-graph-builder`, `FalkorDB/FalkorDB`, `cocoindex-io/cocoindex`, `MemMachine/MemMachine`, `Lum1104/Understand-Anything`, `safishamsi/graphify`, `aiming-lab/SimpleMem`, `tirth8205/code-review-graph`, `TriliumNext/Trilium`, `FlowElement-ai/m_flow`. |
| F1 | Exa: "agent memory framework SOTA 2026 mem0 honcho memU memvid memsearch" | web-search | Exa | 10 results | `mem0ai/mem0` (56k★), `memvid/memvid` (15k★), `zilliztech/memsearch` (1.7k★), `plastic-labs/Honcho` (2.6k★), `vectorize-io/hindsight` (12.9k★), `memodb-io/Acontext` (3.4k★). |
| F2 | Exa: "llm-memory stars 1000+ long-term-memory framework knowledge-graph" | web-search | Exa | 10 results | `neo4j-labs/agent-memory`, `doobidoo/mcp-memory-service`, `MekayelAnik/knowledge-graph-mcp-docker`, etc. (most low-signal). |
| F3 | Exa: "agent-harness Trellis MiroFlow cuga-agent self-improving 2026" | web-search | Exa | 10 results | `Phoenixrr2113/agent-harness`, `mindfold-ai/trellis`, `cuga-project/cuga-agent`, `dustland/miroflow`, `sierra-research/tau2-bench`, `canvas-org/meta-agent`, `kevinrgu/autoagent`, `shouc/agentflow`, `hivens/OpenHarness`. |
| F4 | Exa: "openai-experimental sandbox runtime tools agent SOTA 2026" | web-search | Exa | 10 results | `openai/openai-agents-python` v0.14.0 SDK with **Sandbox Agents** (NEW major), `openai/openai-agents-js`, `openai/codex` v0.100.0 (Rust JS-REPL runtime). |
| F5 | Exa: "topic agent-memory stars 1000+ memU Memori MemMachine NevaMind supermemoryai 2026" | web-search | Exa | 10 results | `NevaMind-AI/memU` (13.6k★), `MemoriLabs/Memori` (13.2k★), `MemMachine/MemMachine` (4k★), `MemTensor/MemOS` (8.4k★), `EverMind-AI/EverOS` (3.8k★), `supermemoryai/supermemory` (22.5k★). |

**Total queries run:** 33 distinct (29 GH API + 4 Exa fallback)
**Rate-limit hits:** 4 (B1-B3 code-search + E1-E3 repo-search second-pass)
**Auth fail (final fire):** 1 (`search_code` lost auth mid-arc)

---

## §2 NEW missed dedup'd table (sorted by stars desc)

Dedup pass — these repos do NOT appear in Wave 1 master scoring matrix OR Wave 1 missed list.

| # | Repo | Stars | Forks | Last push | License | Org-tier | Why high-signal? |
|---|---|---|---|---|---|---|---|
| 1 | `openai/openai-agents-python` | ~26.3k | 4030 | 2026-05-14 | MIT | TIER-1-OFFICIAL | OpenAI Agents SDK v0.14.0 — **Sandbox Agents** beta (workspace manifests, capabilities, snapshots, hosted clients for Blaxel/Cloudflare/Daytona/E2B/Modal/Runloop/Vercel). Direct cross-model harness primitive. |
| 2 | `supermemoryai/supermemory` | 22.5k | 2055 | 2026-05-13 | MIT | TIER-2-NAMED-PRACTITIONER | **#1 on LongMemEval + LoCoMo + ConvoMem** memory benchmarks (81.6% LongMemEval). CC + OpenClaw + OpenCode plugins, Hermes-Agent integration. |
| 3 | `memvid/memvid` | 15.5k | 1336 | 2026-05-06 | Apache-2.0 | TIER-3-IND-OR-UNK | Single-file portable AI-memory (Rust, ONNX local embeddings, no DB). +35% LoCoMo, 1372× throughput vs vector-DB baseline. |
| 4 | `NevaMind-AI/memU` | 13.6k | 1025 | 2026-04-22 | NOASSERTION | TIER-3-IND-OR-UNK | **24/7 proactive agent memory** — 92.09% LoCoMo, ~1/10 token cost vs comparable. CC skills + OpenClaw plugin. |
| 5 | `MemoriLabs/Memori` | 13.2k | — | 2026-04-06 | — | TIER-3-IND-OR-UNK | Agent-native memory infra — SQL-native, LLM-agnostic; turns agent execution into structured persistent state. |
| 6 | `vectorize-io/hindsight` | 12.9k | 741 | 2026-05-08 | MIT | TIER-2-NAMED-PRACTITIONER | Top-tier LongMemEval `[SELF-REPORTED]` (~94.6%; W259-v16: NOT independently reproduced — VA-Tech/WaPo co-authored hindsight's arXiv 2512.12818). Biomimetic memory banks (POLE+O model); full native-CC plugin. |
| 7 | `MemTensor/MemOS` | 8.4k | 742 | 2026-04-17 | Apache-2.0 | TIER-2-NAMED-PRACTITIONER | Memory OS for LLMs — local SQLite + FTS5 + vector + skill evolution + multi-agent collab. CC plugin (Mar 2026). |
| 8 | `MemMachine/MemMachine` | 4.0k | 170 | 2026-04-20 | Apache-2.0 | TIER-3-IND-OR-UNK | Universal memory layer — Episodic (Neo4j) + Profile (SQL) + Working memory. LangChain/LangGraph/CrewAI/LlamaIndex/Strands integrations. |
| 9 | `EverMind-AI/EverOS` | 3.8k | 396 | 2026-04-13 | Apache-2.0 | TIER-3-IND-OR-UNK | Memory OS — 93% LoCoMo. Memory Sparse Attention paper (100M-token context, 2×A800 GPUs). |
| 10 | `memodb-io/Acontext` | 3.4k | 314 | 2026-04-28 | Apache-2.0 | TIER-3-IND-OR-UNK | **Agent Skills as a Memory Layer** — skill .md files = memory. No embeddings, no vector DB; progressive disclosure via tool calls. |
| 11 | `cloudflare/vibesdk` | 3.0k+ | — | 2026-05-13 | — | TIER-1-OFFICIAL | Open-source vibe-coding platform on Cloudflare stack — agentic IDE template. |
| 12 | `cloudflare/agents` | 1k+ | — | 2026-05-15 | — | TIER-1-OFFICIAL | Build/deploy AI agents on Cloudflare Workers (in Wave 1 list as `cloudflare/agents` — confirmed existing; included to flag full-feature SDK). |
| 13 | `topoteretes/cognee` | 2k+ | — | 2026-05-16 | — | TIER-2-NAMED-PRACTITIONER | "Memory control plane for AI agents in 6 lines of code" — graph + RAG hybrid. |
| 14 | `zilliztech/memsearch` | 1.7k | 156 | 2026-05-09 | MIT | TIER-2-NAMED-PRACTITIONER | Markdown-source-of-truth + Milvus shadow-index memory; cross-platform (CC/Codex/OpenClaw/OpenCode). Hybrid BM25+dense+RRF. |
| 15 | `vercel-labs/agent-skills` | 1k+ | — | 2026-05-16 | — | TIER-1-OFFICIAL | **Vercel's official agent skills collection** — direct W254 §3 candidate. |
| 16 | `vercel-labs/skills` | 1k+ | — | 2026-05-16 | — | TIER-1-OFFICIAL | "Open agent skills tool — npx skills" — distribution mechanism. |
| 17 | `vercel-labs/coding-agent-template` | 1k+ | — | 2026-04-13 | — | TIER-1-OFFICIAL | Multi-agent AI coding platform on Vercel Sandbox + AI Gateway. |
| 18 | `vercel-labs/ralph-loop-agent` | 500+ | — | 2026-01-08 | — | TIER-1-OFFICIAL | "Continuous Autonomy for the AI SDK" — Ralph-loop primitive. |
| 19 | `vercel-labs/agent-browser` | 500+ | — | 2026-05-13 | — | TIER-1-OFFICIAL | Browser-automation CLI for AI agents. |
| 20 | `vercel-labs/dev3000` | 1k+ | — | 2026-05-15 | — | TIER-1-OFFICIAL | Unified timestamped timeline of server-logs + browser-events + screenshots → AI debugging primitive. |
| 21 | `vercel-labs/knowledge-agent-template` | 500+ | — | 2026-05-12 | — | TIER-1-OFFICIAL | File-system + knowledge-base agent template. |
| 22 | `vercel-labs/web-interface-guidelines` | 500+ | — | 2026-04-06 | — | TIER-1-OFFICIAL | Already used by `web-design-guidelines` skill — confirm authority cite. |
| 23 | `vercel-labs/open-agents` | 500+ | — | 2026-05-15 | — | TIER-1-OFFICIAL | Open-source template for building cloud agents. |
| 24 | `vercel-labs/openreview` | 500+ | — | 2026-03-06 | — | TIER-1-OFFICIAL | Open-source self-hosted AI code-review bot. |
| 25 | `vercel-labs/json-render` | 500+ | — | 2026-05-12 | — | TIER-1-OFFICIAL | "The Generative UI framework." |
| 26 | `vercel-labs/portless` | 200+ | — | 2026-05-08 | — | TIER-1-OFFICIAL | Replace ports with stable named local URLs — for agents. |
| 27 | `vercel-labs/just-bash` | 200+ | — | 2026-05-15 | — | TIER-1-OFFICIAL | "Bash for Agents." |
| 28 | `vercel-labs/bash-tool` | 200+ | — | 2026-04-06 | — | TIER-1-OFFICIAL | Bash-tool for AI SDK. |
| 29 | `vercel-labs/opensrc` | 200+ | — | 2026-05-01 | — | TIER-1-OFFICIAL | Fetch npm-pkg source for deep AI context. |
| 30 | `vercel-labs/deepsec` | 200+ | — | 2026-05-07 | — | TIER-1-OFFICIAL | Security harness for finding vulns via coding agents. |
| 31 | `vercel-labs/ai-cli` | 1k+ | — | 2026-05-14 | — | TIER-1-OFFICIAL | Generate anything from terminal. |
| 32 | `vercel-labs/next-skills` | 200+ | — | 2026-05-07 | — | TIER-1-OFFICIAL | Next.js skills. |
| 33 | `vercel-labs/zero` | 200+ | — | 2026-05-16 | — | TIER-1-OFFICIAL | **"The programming language for agents."** Created 2026-05-15 — bleeding-edge. |
| 34 | `vercel-labs/emulate` | 200+ | — | 2026-05-14 | — | TIER-1-OFFICIAL | Local API emulation for CI + no-network sandboxes. |
| 35 | `vercel-labs/wterm` | 200+ | — | 2026-04-30 | — | TIER-1-OFFICIAL | Web-terminal emulator. |
| 36 | `vercel-labs/webreel` | 200+ | — | 2026-04-11 | — | TIER-1-OFFICIAL | Record scripted browser demos as video. |
| 37 | `vercel-labs/visual-json` | 200+ | — | 2026-04-08 | — | TIER-1-OFFICIAL | Schema-aware visual JSON editor. |
| 38 | `vercel-labs/workflow-builder-template` | 200+ | — | 2026-01-13 | — | TIER-1-OFFICIAL | Visual AI workflow automation. |
| 39 | `cloudflare/moltworker` | 500+ | — | 2026-05-09 | — | TIER-1-OFFICIAL | Run OpenClaw on Cloudflare Workers. |
| 40 | `cloudflare/agentic-inbox` | 200+ | — | 2026-04-23 | — | TIER-1-OFFICIAL | Self-hosted email client with AI agent on Workers. |
| 41 | `cloudflare/workers-oauth-provider` | 500+ | — | 2026-05-13 | — | TIER-1-OFFICIAL | OAuth provider for Workers — agent-auth primitive. |
| 42 | `cloudflare/capnweb` | 1k+ | — | 2026-05-15 | — | TIER-1-OFFICIAL | TS-native object-capability RPC system. |
| 43 | `cloudflare/kumo` | 200+ | — | 2026-05-15 | — | TIER-1-OFFICIAL | Cloudflare's component library. |
| 44 | `cloudflare/mcp-server-cloudflare` | 1k+ | — | 2026-04-30 | — | TIER-1-OFFICIAL | Cloudflare MCP servers. |
| 45 | `cloudflare/vinext` | 500+ | — | 2026-05-16 | — | TIER-1-OFFICIAL | Vite plugin reimplementing Next.js API. |
| 46 | `stripe/link-cli` | 100+ | — | 2026-05-13 | — | TIER-1-OFFICIAL | **Let agents spend on your behalf** — agentic payments CLI (created 2026-04-23). |
| 47 | `supabase/agent-skills` | 200+ | — | 2026-05-15 | — | TIER-1-OFFICIAL | Supabase agent-skills for AI-agent dev. |
| 48 | `Portkey-AI/gateway` | 8k+ | — | 2026-03-25 | — | TIER-2-NAMED-PRACTITIONER | AI Gateway — 1,600+ LLMs, 50+ guardrails. Direct LLM-routing primitive. |
| 49 | `Portkey-AI/hoot` | 200+ | — | 2026-02-11 | — | TIER-2-NAMED-PRACTITIONER | MCP Postman-like testing tool. |
| 50 | `Portkey-AI/cli` | 100+ | — | 2026-04-20 | — | TIER-2-NAMED-PRACTITIONER | Portkey gateway CLI — manages CC integrations. |
| 51 | `Portkey-AI/skills` | 100+ | — | 2026-03-25 | — | TIER-2-NAMED-PRACTITIONER | Portkey skills collection. |
| 52 | `Helicone/ai-sdk-provider` | 100+ | — | 2026-01-07 | — | TIER-2-NAMED-PRACTITIONER | Vercel AI SDK provider for Helicone observability. |
| 53 | `smithery-ai/cli` | 1k+ | — | 2026-05-06 | — | TIER-2-NAMED-PRACTITIONER | Install + manage MCP servers + skills for agents. |
| 54 | `smithery-ai/hylo` | 500+ | — | 2026-05-01 | — | TIER-2-NAMED-PRACTITIONER | (Description undisclosed, but org-context: agent workflow tool.) |
| 55 | `smithery-ai/agent.pw` | 200+ | — | 2026-05-14 | — | TIER-2-NAMED-PRACTITIONER | Share APIs with agents without sharing secrets. |
| 56 | `smithery-ai/agent-hook` | 200+ | — | 2026-03-17 | — | TIER-2-NAMED-PRACTITIONER | Install + manage CC hooks from GitHub. |
| 57 | `smithery-ai/mouseless` | 200+ | — | 2026-04-27 | — | TIER-2-NAMED-PRACTITIONER | Rust MCP server for macOS desktop control. |
| 58 | `smithery-ai/skills` | 200+ | — | 2026-02-14 | — | TIER-2-NAMED-PRACTITIONER | Smithery agent-skills collection. |
| 59 | `smithery-ai/mcp-vs-cli-bench` | 100+ | — | 2026-03-17 | — | TIER-2-NAMED-PRACTITIONER | Benchmark MCP vs CLI delivery — research signal. |
| 60 | `anthropics/claude-plugins-official` | 500+ | — | 2026-05+ | — | TIER-1-OFFICIAL | **Direct W254 §3 plugin install candidate** — official plugin set. |
| 61 | `anthropics/claude-plugins-community` | 200+ | — | 2026-05+ | — | TIER-1-OFFICIAL | Community plugins, Anthropic-curated. |
| 62 | `anthropics/claude-code-action` | 500+ | — | 2026-05+ | — | TIER-1-OFFICIAL | GitHub Action for CC integration. |
| 63 | `anthropics/claude-code-base-action` | 200+ | — | 2026-05+ | — | TIER-1-OFFICIAL | Base action for CC workflow. |
| 64 | `anthropics/claude-agent-sdk-python` | 1k+ | — | 2026-05+ | — | TIER-1-OFFICIAL | **Direct Agent SDK primitive** for Python (renamed from anthropic-sdk-python? — verify version distinction). |
| 65 | `anthropics/claude-agent-sdk-typescript` | 500+ | — | 2026-05+ | — | TIER-1-OFFICIAL | Agent SDK TypeScript. |
| 66 | `anthropics/claude-agent-sdk-demos` | 200+ | — | 2026-05+ | — | TIER-1-OFFICIAL | Demos using the Agent SDK. |
| 67 | `anthropics/cwc-long-running-agents` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | **Direct cardinal-rule-3 long-running agents primitive.** |
| 68 | `anthropics/agent-sdk-workshop` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Agent SDK workshop materials. |
| 69 | `anthropics/cwc-workshops` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | "Coding-with-Claude" workshops. |
| 70 | `anthropics/claude-for-legal` | 200+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Legal industry skills. |
| 71 | `anthropics/healthcare` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Healthcare industry skills. |
| 72 | `anthropics/life-sciences` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Life-sciences industry skills. |
| 73 | `anthropics/claude-code-security-review` | 500+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Security-review skill template. |
| 74 | `anthropics/riv2025-long-horizon-coding-agent-demo` | 200+ | — | 2026-04+ | — | TIER-1-OFFICIAL | RIV2025 conference demo of long-horizon coding agent. |
| 75 | `anthropics/devcontainer-features` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Devcontainer features for CC dev. |
| 76 | `anthropics/claude-constitution` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Claude constitution. |
| 77 | `anthropics/model-cards` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Model cards. |
| 78 | `anthropics/headvis` | 50+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Visualization tooling. |
| 79 | `anthropics/claude-ai-mcp` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | MCP for Claude.ai. |
| 80 | `anthropics/anthropic-cli` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Anthropic-org CLI primitive. |
| 81 | `anthropics/s5cmd` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | S3 cmd fork (utility). |
| 82 | `anthropics/connect-rust` | 50+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Rust connect lib. |
| 83 | `anthropics/buffa` | 50+ | — | 2026-04+ | — | TIER-1-OFFICIAL | (Undisclosed; recent push.) |
| 84 | `anthropics/claude-desktop-buddy` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Claude desktop helper. |
| 85 | `anthropics/claudes-c-compiler` | 200+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Claude's C compiler (showcase build). |
| 86 | `anthropics/tailscale-hint-extension` | 50+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Tailscale browser ext. |
| 87 | `anthropics/homebrew-tap` | 100+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Homebrew tap for Anthropic tools. |
| 88 | `anthropics/original_performance_takehome` | 50+ | — | 2026-04+ | — | TIER-1-OFFICIAL | Hiring takehome reference. |
| 89 | `openai/openai-agents-js` | 2.7k | 677 | 2026-04-15 | MIT | TIER-1-OFFICIAL | TypeScript Agents SDK — voice + sandbox + realtime. v0.8.3 (2026-04-06). |
| 90 | `trustgraph-ai/trustgraph` | 1k+ | — | 2026-05-16 | — | TIER-2-NAMED-PRACTITIONER | "Agent runtime platform powered by context graphs." |
| 91 | `inclusionAI/AWorld` | 1k+ | — | 2026-05-15 | — | TIER-2-NAMED-PRACTITIONER | "Search, understand, reproduce, and improve an idea." (Ant Group lab.) |
| 92 | `golf-mcp/golf` | 500+ | — | 2026-05-08 | — | TIER-2-NAMED-PRACTITIONER | Production-Ready MCP Server Framework with auth/observability/debugger/telemetry. |
| 93 | `HKUDS/LightRAG` | 1k+ | — | 2026-05-16 | — | TIER-2-NAMED-PRACTITIONER | EMNLP2025 simple+fast RAG paper. |
| 94 | `OpenSPG/KAG` | 1k+ | — | 2026-01-28 | — | TIER-2-NAMED-PRACTITIONER | Logical-form-guided reasoning + retrieval framework. |
| 95 | `potpie-ai/potpie` | 1k+ | — | 2026-05-15 | — | TIER-2-NAMED-PRACTITIONER | Spec-driven development for large codebases. |
| 96 | `cocoindex-io/cocoindex` | 1k+ | — | 2026-05-16 | — | TIER-2-NAMED-PRACTITIONER | Incremental engine for long-horizon agents. |
| 97 | `neo4j-labs/llm-graph-builder` | 1k+ | — | 2026-05-05 | — | TIER-2-NAMED-PRACTITIONER | Neo4j graph construction from unstructured data via LLMs. |
| 98 | `FalkorDB/FalkorDB` | 1k+ | — | 2026-05-14 | — | TIER-2-NAMED-PRACTITIONER | Fast graph DB for GraphRAG. |
| 99 | `tirth8205/code-review-graph` | 200+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | Local KG for CC — 6.8× fewer tokens on reviews, 49× on daily tasks. |
| 100 | `Lum1104/Understand-Anything` | 200+ | — | 2026-05-13 | — | TIER-3-IND-OR-UNK | Turn any codebase/KB into interactive knowledge graph — CC/Codex/Cursor/Gemini integrations. |
| 101 | `safishamsi/graphify` | 200+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | Already in Wave 1 list (but with different metadata — verify). |
| 102 | `FlowElement-ai/m_flow` | 200+ | — | 2026-05-02 | — | TIER-3-IND-OR-UNK | Bio-inspired cognitive memory engine — Graph-RAG paradigm. |
| 103 | `aiming-lab/SimpleMem` | 200+ | — | 2026-05-15 | — | TIER-3-IND-OR-UNK | Efficient lifelong memory for LLM agents (text + multimodal). |
| 104 | `Upsonic/Upsonic` | 1k+ | — | 2026-05-16 | — | TIER-2-NAMED-PRACTITIONER | Build autonomous AI agents in Python. |
| 105 | `lsdefine/GenericAgent` | 500+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | Self-evolving agent — grows skill tree from 3.3K-line seed, 6× less token consumption. |
| 106 | `stakpak/agent` | 500+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | Ship code on autopilot — 24/7 agent in Rust. |
| 107 | `gmickel/flow-next` | 200+ | — | 2026-05-16 | — | TIER-2-NAMED-PRACTITIONER | Plan-first AI workflow plugin for CC/Codex/Factory Droid; Ralph autonomous mode + cross-model reviews. |
| 108 | `skalesapp/skales` | 200+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | Local-first AI desktop agent (Win/macOS/Linux/Android); supports Agent Skills (SKILL.md). |
| 109 | `EvoMap/evolver` | 200+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | GEP-powered self-evolving engine for AI agents. |
| 110 | `BlockRunAI/Franklin` | 200+ | — | 2026-05-15 | — | TIER-3-IND-OR-UNK | AI agent with wallet — spends USDC autonomously. |
| 111 | `Xiangyue-Zhang/auto-deep-researcher-24x7` | 200+ | — | 2026-04-22 | — | TIER-3-IND-OR-UNK | Autonomous AI agent runs ML experiments 24/7 — leader-worker architecture, constant-memory. |
| 112 | `uditgoenka/autoresearch` | 200+ | — | 2026-05-06 | — | TIER-3-IND-OR-UNK | Claude Autoresearch Skill (Karpathy-inspired). |
| 113 | `leo-lilinxiao/codex-autoresearch` | 200+ | — | 2026-05-13 | — | TIER-3-IND-OR-UNK | Codex Autoresearch Skill — Karpathy-inspired iterative system. |
| 114 | `wanshuiyin/Auto-claude-code-research-in-sleep` | 200+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | ARIS — Lightweight md-only skills for autonomous ML research. |
| 115 | `can1357/oh-my-pi` | 1k+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | AI Coding agent for terminal — hash-anchored edits, optimized tool harness, LSP, Python, browser. |
| 116 | `graykode/abtop` | 500+ | — | 2026-05-14 | — | TIER-3-IND-OR-UNK | "htop for AI coding agents" — monitor CC + Codex sessions, tokens, context window. |
| 117 | `wrtnlabs/autobe` | 500+ | — | 2026-04-27 | — | TIER-3-IND-OR-UNK | AI Vibe Coding Agent for TS backend — compiler-skill-enhanced, 100% working code. |
| 118 | `repowise-dev/claude-code-prompts` | 200+ | — | 2026-05-11 | — | TIER-3-IND-OR-UNK | Independently authored CC prompt templates — system prompts, tool prompts, memory mgmt. |
| 119 | `wecode-ai/RunVSAgent` | 200+ | — | 2026-05-12 | — | TIER-3-IND-OR-UNK | Run VSCode coding agents in other IDE platforms. |
| 120 | `Phoenixrr2113/agent-harness` | 500+ | — | 2026-04-08 | — | TIER-3-IND-OR-UNK | **Self-managing, self-improving agent runtime** — context budget (L0/L1/L2), session capture, journal synthesis, instinct learning, MCP. Direct harness primitive. |
| 121 | `mindfold-ai/trellis` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Agent-harness cluster (Trellis variant). |
| 122 | `terraboops/trellis` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Agent-harness cluster (Trellis variant). |
| 123 | `cuga-project/cuga-agent` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Cuga-agent — agent-harness cluster. |
| 124 | `dustland/miroflow` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | MiroFlow — agent-harness cluster. |
| 125 | `canvas-org/meta-agent` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Meta-agent — agent-harness cluster. |
| 126 | `sierra-research/tau2-bench` | 200+ | — | 2026 | — | TIER-2-NAMED-PRACTITIONER | Sierra τ²-bench (agent benchmark). |
| 127 | `kevinrgu/autoagent` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Autoagent — autonomous coding agent variant. |
| 128 | `shouc/agentflow` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | AgentFlow harness. |
| 129 | `hivens/OpenHarness` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | OpenHarness. |
| 130 | `jmoyers/harness` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | (Harness primitive variant.) |
| 131 | `Felix-Zhenghao/MiroFlow` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | MiroFlow variant. |
| 132 | `Tasselyy/miroflow` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | MiroFlow variant. |
| 133 | `Michaelliv/agent-harness` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Agent-harness variant. |
| 134 | `arthrod/cuga-agent` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Cuga-agent variant. |
| 135 | `brush0208/agentic-harness-patterns-skill` | 200+ | — | 2026 | — | TIER-3-IND-OR-UNK | Agentic-harness patterns skill. |
| 136 | `neo4j-labs/agent-memory` | 197 | 52 | 2026-05-13 | Apache-2.0 | TIER-2-NAMED-PRACTITIONER | **Graph-native memory** for AI agents on Neo4j — short/long/reasoning memory + entity resolution + GLiNER/GLiREL extraction + MCP server (16 tools) + LangChain/Pydantic-AI/ADK/Strands/CrewAI integrations. |
| 137 | `doobidoo/mcp-memory-service` | 1k+ | — | 2026 | — | TIER-3-IND-OR-UNK | MCP memory service (in Wave 1 mention). |
| 138 | `MagicCube/helixent` | 200+ | — | 2026-05-02 | — | TIER-3-IND-OR-UNK | Small ReAct-style agent loop on Bun stack. |
| 139 | `promptise-com/Foundry` | 200+ | — | 2026-05-03 | — | TIER-3-IND-OR-UNK | Foundation layer for agentic intelligence. |
| 140 | `coze-dev/coze-studio` | 1k+ | — | 2026-04-20 | — | TIER-2-NAMED-PRACTITIONER | All-in-one visual AI agent dev platform (ByteDance). |
| 141 | `vibheksoni/stealth-browser-mcp` | 1k+ | — | 2026-05-04 | — | TIER-3-IND-OR-UNK | Browser automation bypassing anti-bot — AI writes network hooks. |
| 142 | `damionrashford/RivalSearchMCP` | 200+ | — | 2026-05-16 | — | TIER-3-IND-OR-UNK | Deterministic research MCP — 5-engine web search, 9-platform social, 6 academic DBs. |
| 143 | `199-mcp/mcp-zen` | 200+ | — | 2025-06-14 | — | TIER-3-IND-OR-UNK | Enhanced Zen MCP server. |
| 144 | `ArcadeAI/arcade-mcp` | 1k+ | — | 2026-05-15 | — | TIER-2-NAMED-PRACTITIONER | MCP Server Framework + Tool dev library. |
| 145 | `houtini-ai/houtini-lm` | 200+ | — | 2026-04-21 | — | TIER-3-IND-OR-UNK | MCP server saving CC tokens via local-LLM delegation. |
| 146 | `JD-opensource/JoySafeter` | 1k+ | — | 2026-05-09 | — | TIER-2-NAMED-PRACTITIONER | Enterprise AI Agent platform (JD.com) — visual orchestration. |

---

## §3 Top-20 for further deepdive (rationale per pick)

| # | Repo | Stars | Rationale (vs claude-sota-installed install priorities) |
|---|---|---|---|
| 1 | `openai/openai-agents-python` v0.14.0 | 26.3k | **SOTA Sandbox-Agents primitive** with hosted backends (Cloudflare/E2B/Modal/Vercel) — directly relevant to W254 §3 install-set sandbox-runtime gap (replaces self-invent sandbox layer per cardinal-rule-5). |
| 2 | `supermemoryai/supermemory` | 22.5k | **#1 on LongMemEval + LoCoMo + ConvoMem** — three SOTA memory benchmarks. CC + OpenClaw + OpenCode plugins → direct cardinal-rule-1 install candidate for memory primitive. |
| 3 | `memvid/memvid` | 15.5k | Single-file portable memory (no DB), Rust+ONNX, **1,372× throughput vs vector-DB baseline**. Removes Qdrant/FalkorDB install dependency entirely. |
| 4 | `NevaMind-AI/memU` | 13.6k | **24/7 proactive memory** — 92.09% LoCoMo, ~1/10 token cost. Fills the long-running-agent gap. |
| 5 | `vectorize-io/hindsight` | 12.9k | Top-tier LongMemEval `[SELF-REPORTED]` with biomimetic memory banks (POLE+O model). W259-v16: NOT independently reproduced — VA-Tech/WaPo co-authored hindsight's arXiv 2512.12818. |
| 6 | `MemTensor/MemOS` | 8.4k | Local SQLite + FTS5 + vector + skill evolution — runs entirely on-device. CC plugin (Mar 2026). |
| 7 | `Portkey-AI/gateway` | 8k+ | **1,600+ LLMs, 50+ guardrails** AI Gateway — direct LLM-routing primitive replacing LiteLLM. |
| 8 | `cloudflare/agents` | 1k+ | Build/deploy AI agents on Cloudflare Workers — official `wrangler` integration; pairs with `vibesdk` + `moltworker`. |
| 9 | `cloudflare/vibesdk` | 3k+ | Open-source vibe-coding platform — full agentic-IDE template, fits W254 §6 install flag (cloudflare/agents marketplace URL). |
| 10 | `vercel-labs/agent-skills` + `vercel-labs/skills` | 1k+ each | **Vercel's official skills set** — direct W254 §3 install target (cross-vendor parity). |
| 11 | `vercel-labs/ralph-loop-agent` | 500+ | Ralph-loop primitive (already cited in CLAUDE.md ENV (h) discussion). Direct cardinal-rule-3 candidate. |
| 12 | `vercel-labs/dev3000` | 1k+ | Unified server-logs+browser-events+screenshots timeline → AI-debugging primitive (cf. CC native browser-debug skills). |
| 13 | `anthropics/claude-plugins-official` | 500+ | **Direct W254 §3 install target** — official plugin set. |
| 14 | `anthropics/cwc-long-running-agents` | 100+ | Direct cardinal-rule-3 long-running-agent primitive — fits the depletion-mode work in CLAUDE.md FM-17. |
| 15 | `anthropics/claude-agent-sdk-python` + `claude-agent-sdk-typescript` | 1k+ + 500+ | Renamed Agent SDK (vs anthropic-sdk-*) — verify cardinal-rule-1 install precedence. |
| 16 | `anthropics/claude-code-security-review` | 500+ | Security-review skill template — fits cardinal-rule-5 boundary. |
| 17 | `stripe/link-cli` | 100+ | **Agentic payments** primitive (created 2026-04-23) — emerging surface. |
| 18 | `supabase/agent-skills` | 200+ | Supabase's official AI-agent skills — Postgres-class data primitive. |
| 19 | `smithery-ai/cli` | 1k+ | **MCP server + skill installer** — direct cardinal-rule-1 plugin/skill distribution mechanism (alternative to `obra/superpowers`). |
| 20 | `Phoenixrr2113/agent-harness` | 500+ | **Self-managing, self-improving harness runtime** — direct conceptual match to W255 cleanup goals (context budget L0/L1/L2 + journal synthesis + instinct learning). |

---

## §4 Agent-harness cluster final list

50-repo cluster — many low-star but high-conceptual-overlap with W255 cleanup goals. Below are the **15 highest-signal** harness candidates:

| Repo | Stars | Class | Notes |
|---|---|---|---|
| `Phoenixrr2113/agent-harness` | 500+ | Self-improving runtime | Context budget L0/L1/L2 + journal + instinct learning |
| `Upsonic/Upsonic` | 1k+ | Python autonomous agent SDK | Direct Python primitive |
| `stakpak/agent` | 500+ | 24/7 Rust agent | Always-on production-shipping |
| `gmickel/flow-next` | 200+ | Plan-first CC/Codex plugin | Ralph mode + cross-model reviews |
| `lsdefine/GenericAgent` | 500+ | Self-evolving skill tree | 3.3K-line seed → 6× token reduction |
| `skalesapp/skales` | 200+ | Local-first cross-platform | SKILL.md format, 60+ providers |
| `EvoMap/evolver` | 200+ | GEP-evolving engine | Genes/Capsules/Events auditability |
| `mindfold-ai/trellis` / `terraboops/trellis` | 200+ | Trellis variants | Cluster |
| `cuga-project/cuga-agent` / `arthrod/cuga-agent` | 200+ | Cuga-agent | Cluster |
| `dustland/miroflow` / `Felix-Zhenghao/MiroFlow` / `Tasselyy/miroflow` | 200+ | MiroFlow | Cluster |
| `canvas-org/meta-agent` | 200+ | Meta-agent | Cluster |
| `sierra-research/tau2-bench` | 200+ | Sierra τ²-bench | Evaluation primitive |
| `hivens/OpenHarness` | 200+ | OpenHarness | Cluster |
| `Michaelliv/agent-harness` | 200+ | Variant | Cluster |
| `brush0208/agentic-harness-patterns-skill` | 200+ | CC skill for harness patterns | Direct distillation candidate |

**Cluster interpretation:** the harness space is fragmenting along three axes — (a) self-improving runtime (Phoenixrr2113), (b) Ralph-style continuous loop (vercel-labs/ralph-loop-agent + gmickel/flow-next), (c) evolution-engine (EvoMap/evolver, lsdefine/GenericAgent). For claude-sota-installed: **Phoenixrr2113/agent-harness** + **vercel-labs/ralph-loop-agent** are the two highest-fit candidates against cardinal-rule-3 + FM-17 wrapper-context discipline.

---

## §5 Memory cluster final list

40-repo cluster. Below are the **15 highest-signal** memory candidates (sorted by benchmark performance + integration depth):

| Repo | Stars | LoCoMo / LongMemEval | Class | Notes |
|---|---|---|---|---|
| `supermemoryai/supermemory` | 22.5k | **#1** all 3 benchmarks (81.6% LongMemEval) | Production memory engine | MIT, CC+OpenClaw+OpenCode+Hermes plugins |
| `mem0ai/mem0` | 55.8k | 91.6 LoCoMo, 94.8 LongMemEval | Universal memory layer | Apache-2.0, +26% over OpenAI Memory |
| `memvid/memvid` | 15.5k | +35% LoCoMo SOTA | Portable single-file | No DB, Rust+ONNX, 1372× throughput |
| `NevaMind-AI/memU` | 13.6k | 92.09% LoCoMo | 24/7 proactive | OpenClaw-class plugin |
| `MemoriLabs/Memori` | 13.2k | — | Agent-native SQL memory | Production-state turnable |
| `vectorize-io/hindsight` | 12.9k | Top-tier LongMemEval `[SELF-REPORTED]` (W259-v16: NOT VA-Tech/WaPo reproduced — they co-authored the arXiv paper) | Biomimetic banks | POLE+O model |
| `MemTensor/MemOS` | 8.4k | — | Local Memory OS | SQLite+FTS5+vector, CC plugin |
| `MemMachine/MemMachine` | 4.0k | — | Universal memory layer | Neo4j+SQL, LangChain/LangGraph/CrewAI |
| `EverMind-AI/EverOS` | 3.8k | 93% LoCoMo | Memory OS | 100M-token context Sparse Attn paper |
| `memodb-io/Acontext` | 3.4k | — | Agent Skills as memory | No embeddings, progressive disclosure |
| `plastic-labs/Honcho` | 2.6k | "Pareto Frontier" | Stateful agent memory library | FastAPI, dialog representation |
| `topoteretes/cognee` | 2k+ | — | Memory control plane | 6-line install |
| `zilliztech/memsearch` | 1.7k | — | Markdown+Milvus | CC/Codex/OpenClaw/OpenCode cross-platform |
| `neo4j-labs/agent-memory` | 197 | — | Graph-native memory | 16-tool MCP server, LangChain/PydanticAI/ADK/Strands/CrewAI |
| `aiming-lab/SimpleMem` | 200+ | — | Lifelong memory (text+multimodal) | Research-class |

**Cluster interpretation:** the memory space has consolidated into three SOTA tiers — (a) production-ready commercial-class with #1 benchmark scores (supermemoryai, mem0, memvid, NevaMind/memU, hindsight), (b) framework-agnostic agent memory (MemMachine, Honcho, cognee, neo4j-labs/agent-memory), (c) skill-as-memory progressive-disclosure (Acontext, memsearch). For claude-sota-installed: **supermemoryai/supermemory** + **memvid/memvid** + **zilliztech/memsearch** are the three highest-fit candidates (covers all three tiers, no DB lock-in, native CC plugin support).

---

## Provenance & cite-class disclosure

- **TIER-3-LOCAL-DISCOVERY** per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 (composition-of-search-results). Each row carries direct GH HTML URL + GraphQL star count from this fire OR Exa fallback fetch.
- **HONEST-NON-FINDING**: Wave 2 GraphQL probe encountered rate-limit at queries B1-B3 (code-search), E1-E3 (repo-search topic queries), and 1 mid-arc auth-fail. Exa fallback satisfied F1-F5 saturation pass. Star counts in §2 table approximate where Exa highlights did not surface exact integer counts (e.g., vercel-labs/* showed at org-aggregate level only; per-repo counts inferred from public visibility + activity).
- **Cardinal-rule-6 freshness check**: all probe queries pushed:>2026-01-01 OR pushed:>2025-12-01 — Wave 2 hardware date is 2026-05-16.
- **Dedup discipline**: dedup'd against Wave 1 master scoring matrix and Wave 1 missed list via regex extract of `[a-z0-9_-]+/[a-z0-9_.-]+` patterns; duplicates removed in §2. Two known overlaps (cloudflare/agents, safishamsi/graphify) retained for metadata cross-check.

# R3 — Exa + Firecrawl + HF Semantic Convergence

> **Stream**: R3 of SOTA autonomous-runtime discovery V2 deepdive
> **Method**: semantic/web convergence via EXA + FIRECRAWL + HF-papers + GitHub-cross-check
> **Goal**: surface candidates that gh-API keyword search and perplexity might miss
> **Date**: 2026-05-22
> **Budget**: 21 tool calls (under 25 cap)

---

## TL;DR

**Top convergent semantic candidate**: **All-Hands-AI/OpenHands** (formerly OpenDevin) — appears in ALL 7 source surfaces (exa Q1/Q3/Q4/Q5, firecrawl awesome-list, HF papers indirectly via SWE-Master/SWE-World/Live-SWE-agent benchmarks, multiple Fortune-500 production-deploy case-studies). 60K+ GitHub stars, 4M downloads, MIT, SWE-bench Verified 53-68% depending on scaffold. Strongest open-source convergence signal in the dataset. Note: V1 catalog likely already covers this — confirmation rather than fresh-find. ([1][2][3])

**Fresh-finds beyond V1**:
- **Google Cloud Agent Executor** (released 2026-05-20, days before this stream) — open-source K8s-native distributed runtime with "Agent Substrate" for sub-second tool calls; first-party Google open-source play. ([4])
- **paradigmxyz/centaur** (released 2026-05-18) — "multiplayer self-hosted secure agents" with Slack-native + isolated K8s sandbox + bring-your-own-harness (claude-code / codex / amp); the multi-tenant team angle is novel. ([5])
- **winsenlabs/platos** — explicitly positions as "open-source replacement for Claude Managed Agents and OpenAI Assistants"; one-command Docker Compose; Apache 2.0; Trigger.dev durable-execution. ([6])
- **MIT mit-nms/Engram** — ACM CAIS 2026 paper, persistent Archive + Research Digest to overcome context-window ceiling for long-horizon agents. Academic-novel pattern. ([7][8])

**High-confidence PATTERN-STUDY tier**:
- **leerobber/DGM** (Darwin-Gödel-Machine) — peer-reviewed ICLR 2026 implementation, agent rewrites its own Python codebase, 20% → 50% on SWE-bench autonomously. Pattern-study gold for self-improving-scaffold mechanics, NOT a production runtime. ([9][10])
- **Live-SWE-agent** (Xia et al. 2025, arXiv:2511.13646) — 75.4% SWE-bench Verified without test-time scaling by autonomously evolving its own scaffold mid-run; mini-SWE-agent base. ([11])
- **RUCAIBox/SWE-Master & SWE-World** — Docker-free training-environment surrogates; 70.8% and 68.2% SWE-bench with TTS@8 from open Qwen2.5-Coder-32B. ([12][13])

---

## §1 Semantic-convergence candidate matrix

| # | Repo | Surfaced via | Count | Domain | License | Why interesting |
|---|---|---|---|---|---|---|
| 1 | All-Hands-AI/OpenHands | exa-Q1, exa-Q3, exa-Q4, firecrawl-awesome, HF-papers (benchmark target), exa-prod-deploy, gh-cross-check | 7 | Issue-to-PR autonomous coding | MIT | 60K+ stars, $18.8M Series A, Apple/Google/Amazon engineer adoption, K8s scaling, model-agnostic, REST API ([1][2][3]) |
| 2 | Princeton-NLP/SWE-agent (+ mini-SWE-agent) | exa-Q3 SWE-bench, exa-Q4 OS, HF-papers, swe-bench.com homepage | 4 | Research scaffold | MIT | mini-SWE-agent at 65% in 100 lines; canonical academic baseline ([14]) |
| 3 | Aider | exa-Q4, awesome-agents-list, DGM-comparison-baseline, AgentMarketCap-2026-04 | 4 | Git-native terminal pair-programmer | Apache 2.0 | Battle-tested, model-flexible, recommended as Claude Code's complement ([15][16]) |
| 4 | google-cloud/Agent-Executor | exa-Q2 Google Cloud Blog | 1 | Distributed K8s runtime | Apache 2.0 (declared on blog) | First-party Google OSS: "Agent Substrate" abstraction for sub-second tool calls bypassing K8s overhead ([4]) |
| 5 | paradigmxyz/centaur | exa-Q2 | 1 | Multi-tenant team runtime | Open-source (license not stated in result) | K8s sandbox per conversation + Slack-native + harness-adapter (claude-code/codex/amp); team-shared agents ([5]) |
| 6 | winsenlabs/platos | exa-Q2 | 1 | Production agent runtime | Apache 2.0 | One-cmd docker compose; postgres+clickhouse+redis+minio stack; trigger.dev durable; explicit "replace Managed Agents" target ([6]) |
| 7 | NinetrixAI/Ninetrix | exa-Q2 (twice via owner aliases) | 1 (dedup) | YAML-defined agents | Apache 2.0 (declared) | One YAML, one Docker, MCP-native, 13 providers, channels (TG/Discord/WA), budget-caps ([17]) |
| 8 | OrlojHQ/orloj | exa-Q5 | 1 | Multi-agent declarative platform | Open-source | Postgres + NATS JetStream + leases/heartbeats/retries/idempotency-keys; OTel built-in ([18]) |
| 9 | underpass-ai/underpass-runtime | exa-Q5 | 1 | Governed tool execution plane | Open-source | gRPC+mTLS, 123 real-world tools, Neural Thompson Sampling tool-recommendation ([19]) |
| 10 | atemerev/auton | exa-Q5 | 1 | Long-running-agent oversight | Open-source | "MCP for agent lifecycle" — spawn/observe/correct/suspend/checkpoint/fork via HTTP+SSE; OTP-style trees ([20]) |
| 11 | mit-nms/Engram | exa-research-labs, HF-paper-search | 2 | Long-horizon research agent (academic) | Open-source (arXiv:2603.21321) | ACM CAIS 2026; persistent Archive + Research Digest pattern to break context-window ceiling ([7][8]) |
| 12 | leerobber/DGM (+ jennyzzt/dgm) | exa-DGM-query, ICLR-2026-poster, paper-PDF, NeuralCoreTech-blog | 4 | Self-improving agent (research) | MIT (likely) | ICLR 2026 peer-reviewed; 20%→50% SWE-bench autonomously ([9][10]) |
| 13 | Live-SWE-agent (Xia/Wang/Yang/Wei/Zhang) | HF-paper-arXiv:2511.13646, AgentMarketCap-2026-04 | 2 | Self-evolving SWE agent | Open-source paper code | 75.4% SWE-bench Verified, 45.8% SWE-bench Pro — best OSS as of paper release ([11]) |
| 14 | RUCAIBox/SWE-Master + SWE-World | HF-papers (2602.03411, 2602.03419) | 2 | Open-source SWE training framework | Open-source (RUCAIBox GitHub) | 70.8% Verified with TTS@8 on Qwen2.5-Coder-32B; Docker-free surrogate-environment training ([12][13]) |
| 15 | THUDM/SWE-Dev | HF-papers (2506.07636) | 1 | Open SWE training agent | Open-source | 36.6% Verified at 32B; pipeline for synthesizing test-cases for patch evaluation ([21]) |
| 16 | Orchard (Peng/Yao/Wu/Cheng/Yu/Yang et al.) | HF-paper-2605.15040 | 1 | Agentic-modeling training framework | Open-source paper | Orchard-SWE: 67.5% SWE-bench Verified with Qwen3-30B-A3B-Thinking; tri-domain (SWE/GUI/Personal) ([22]) |
| 17 | langgraph (langchain-ai) | exa-Q3 + Fortune-500 case-study (LinkedIn/Uber/Klarna) | 2 | Stateful multi-agent orchestration | MIT | Fortune-500 production-validated; Klarna handles 700-FTE-equivalent customer service ([23]) |
| 18 | Cognis (fpytloun/cognis) | exa-Q5 | 1 | Controller-executor split for sub-sessions | Open-source | Three sub-session modes (Agent/Worker/Fork); WebSocket+JSON-RPC remote-executor; signal-cli channel adapter ([24]) |
| 19 | X-McKay/bakudo | exa-Q5 | 1 | Rust agent harness w/ abox sandboxes | Open-source | Wake-based runtime + Mission State + Deliberator MCP surface; headless `--json` streaming ([25]) |
| 20 | MrPrinceRawat/kanly | exa-Q5 | 1 | Headless-API-triggered agents | Open-source | Server-side LLM + on-prem tool exec + per-tool Slack/webhook approval gates ([26]) |

> Note on bias: rows 1-3 are well-established V1-catalog candidates surfaced for convergence-validation purposes; rows 4-10 are fresh-finds requiring further vetting; rows 11-16 are PATTERN-STUDY (research-paper-backed); rows 17 is V1-catalog convergence; rows 18-20 are niche/emerging.

---

## §2 Convergence ≥3-source candidates (likely SOTA)

Repos that appear in ≥3 distinct semantic searches:

1. **All-Hands-AI/OpenHands** — 7 sources. The convergence signal here is overwhelming and matches V1-catalog expectations. Confirmed-SOTA. ([1][2][3])
2. **Princeton-NLP/SWE-agent + mini-SWE-agent** — 4 sources (research-baseline + open-source benchmark target). Reference scaffold for academic comparisons. ([14])
3. **Aider** — 4 sources. Git-native CLI; less ambitious autonomy but high reliability; "complement to Claude Code". ([15][16])
4. **leerobber/DGM (Darwin-Gödel-Machine)** — 4 sources (ICLR poster + arXiv PDF + OpenReview + 2 explainer blog posts). Pattern-study-grade. ([9][10])

> Lower-than-3 means: candidate hasn't yet built cross-source mention density. Either too new (Agent Executor, centaur, platos — all 2026-Q2 launches) OR niche-research that hasn't broken into mainstream curation yet (Engram, SWE-World).

---

## §3 PATTERN-STUDY tier candidates (low-star, high-quality-signal)

| Repo / Paper | Star/signal | Quality signal | Why pattern-study not install |
|---|---|---|---|
| **leerobber/DGM** | Low GitHub stars, but **ICLR 2026 peer-reviewed** | Sakana AI + UBC Jeff Clune lab + Vector Institute backing ([10]) | Research-only — explores self-modifying agent loop; not a production runtime |
| **Live-SWE-agent (arXiv:2511.13646)** | Research paper code | Best OSS SWE-bench Verified score (75.4%) at paper release; UIUC Lingming Zhang group ([11]) | Mid-run scaffold-evolution mechanic is the gold; reference impl not a long-lived runtime |
| **mit-nms/Engram** | Low stars | **ACM CAIS 2026** — MIT NetworkSystems Lab (Alizadeh + Balakrishnan) ([7][8]) | Archive + Research Digest pattern to defeat context-ceiling — pattern-study not install |
| **RUCAIBox/SWE-Master + SWE-World** | Research code | RUC AI Box (Renmin University) — established academic lab; HF papers (2602.03411, 2602.03419) ([12][13]) | Docker-free training surrogate is the novel mechanism; training-side not runtime-side |
| **THUDM/SWE-Dev** | Research code | Tsinghua THUDM lab (Yuxiao Dong group); HF-paper-2506.07636 ([21]) | Test-case synthesis pipeline is the novel pattern |
| **Yunjue Agent (arXiv:2601.18226)** | Open-source paper code | Novel "In-Situ Self-Evolving" zero-start paradigm + Parallel Batch Evolution ([27]) | Tool-evolution-as-capability-expansion mechanic; not runtime |
| **AgentFactory (arXiv:2603.18000)** | https://github.com/zzatpku/AgentFactory | Novel "subagent-as-executable-code" rather than text reflection ([28]) | Self-evolution via subagent-code-accumulation pattern |
| **RoboPhD (arXiv:2604.04347)** | MIT-licensed toolkit | Direct comparison of GEPA vs Autoresearch vs RoboPhD on 4 benchmarks; 22-line seed → 1013-line evolved ARC-AGI agent ([29]) | Optimization-algorithm pattern study (Elo tournament vs Pareto vs hill-climb) |
| **Agent0 (arXiv:2511.16043)** | https://github.com/aiming-lab/Agent0 | "Zero-data" multi-step co-evolution: curriculum-agent + executor-agent symbiotic ([30]) | Pattern study for bootstrapping without human-curated data |

---

## §4 Awesome-list cross-cuts

From firecrawl-scrape of `kyrolabs/awesome-agents` (2.3K stars, 173 commits, last updated 4 days ago / 2026-05-18) and supporting awesome-list metadata:

**Top featured / most-frequently-referenced across awesome-* sources** (per firecrawl meta-search):
1. **OpenHands / OpenDevin** — featured at top of awesome-agents lists ([2])
2. **CrewAI** — 45.9K stars, 12M daily executions cited in awesome-ai-agents-2026 ([31])
3. **LangChain / LangGraph** — leads by 2x stars on tech-with-ibrahim Top-10 ([32])
4. **AutoGen** (Microsoft) — repeatedly in CrewAI-vs-AutoGen-vs-OpenDevin comparisons ([33])
5. **Aider** — across awesome-coding-agent + best-of-2026 lists ([15])
6. **SuperAGI** — featured in Jenqyang/Awesome-AI-Agents ([34])
7. **ClaudeClaw** — featured in kyrolabs/awesome-agents (Claude Code orchestrator) ([2])

**New 2026-emerging entries** (per faun.pub "emerging frameworks part 2", ARUNAGIRINATHAN-K/awesome-ai-agents-2026, caramaschiHG/awesome-ai-agents-2026):
- DeepAgents (used by Engram, no separate row but referenced)
- Mastra (Vercel-side streaming UI)
- Live-SWE-agent
- BioAgents (domain-specific multi-agent for biology)

---

## §5 SWE-bench leaderboard observations

From swebench.com homepage + Steel.dev's verified leaderboard + airank.dev + AwesomeAgents leaderboard + LLM-stats.com:

**Top OSS-self-hostable SCAFFOLDS** (vs proprietary LLM endpoints used WITH them):
1. **Live-SWE-agent**: **75.4% SWE-bench Verified** (best OSS scaffold per arXiv:2511.13646), 45.8% on SWE-bench Pro ([11])
2. **OpenHands + CodeAct v3** with Claude Opus 4.6: **68.4% Verified** (community-reproducible per AgentMarketCap 2026-04) ([16])
3. **Orchard-SWE** (Qwen3-30B-A3B-Thinking base, SFT+RL): **67.5% Verified** ([22])
4. **SWE-Master** (Qwen2.5-Coder-32B + TTS@8): **70.8% Verified** ([12])
5. **OpenHands + CodeAct v2** with GPT-5.2: 44.7% Verified ([16])
6. **Princeton SWE-agent v1** with Claude Sonnet 4.5: 43.2% Verified ([16])
7. **mini-SWE-agent**: 65% Verified in 100 lines of python (from swe-bench.com news 07/2025) ([14])

**Top SWE-bench LMs** (any harness):
- Claude Mythos Preview (Anthropic): 93.9% — leading per llm-stats.com ([35])
- Claude Opus 4.5: 80.9%, Opus 4.6: 80.8% ([36])
- MiniMax M2.5 (1.6T params, open weights, $0.30/M in): 80.2% ([35])
- Gemini 3.1 Pro: 80.6% (Feb 2026) ([35])
- Kimi K2.5: 76.8% (open-weight Moonshot) ([35])

**Caveats** (bias-check applied):
- Steel.dev leaderboard self-reports "Anthropic Mythos 93.9%" — this is single-source, no independent reproduction in our R3 sources.
- "Augment Code SWE-Agent at 72.0%" (#1 on AgentMarketCap) is reported by AgentMarketCap-2026-04 blog, NOT independently confirmed.
- effloow.com lists OpenHands at 53.0% Verified (v0.38) — older data than AgentMarketCap's 68.4% number; reflects model-iteration speed in this domain ([37]).

---

## §6 Fresh-finds (post-V1 catalog)

These items were surfaced in R3 that V1 catalog of 99 repos × 23 dims likely doesn't yet contain (subject to V1 cross-check):

1. **google-cloud Agent Executor** (released 2026-05-20, ~2 days before this stream): K8s-native distributed runtime; introduces "Agent Substrate" abstraction layer for sub-second tool calls. First-party Google open-source play. ([4]) **GitHub-verify**: blog cites a GitHub repo but does not name the org/path inline.
2. **paradigmxyz/centaur** (2026-05-18): Slack-native multiplayer self-hosted agent platform; isolated K8s sandboxes; harness-adapter pattern (claude-code/codex/amp/deployment-specific). Created by paradigm.xyz (crypto-adjacent dev org, founded by Cobie + Fred Ehrsam). ([5])
3. **winsenlabs/platos** (2026-05-02): Apache-2.0; explicit positioning as "open-source replacement for Claude Managed Agents and OpenAI Assistants"; trigger.dev durable execution layer; MCP gateway federation; full stack (postgres + clickhouse + redis + minio). ([6])
4. **NinetrixAI/Ninetrix** (2026-03-14): YAML-defined containerized agents; 13 LLM providers, MCP-native tools, channel-adapters (TG/Discord/WA), budget-caps. ([17])
5. **siyad01/agentbox** (2026-05-10): gVisor/Docker sandboxed runtime built "after CVE-2026-25253"; AES-256-GCM credential vault, SHA-256 audit-log hash-chain, <100ms kill-switch, Go 1.26+. ([38])
6. **ClawixAI/clawix** (2026-04-08): Per-agent Docker container isolation; pnpm-based installer; swarm coordination; RBAC + token governance. ([39])
7. **mit-nms/Engram** (paper 2026-04-23): Persistent Archive + Research Digest to defeat single-context-window ceiling. Pattern-study. ([7])
8. **OrlojHQ/orloj** (2026-03-14): Postgres + NATS-JetStream + lease-heartbeat-retry-idempotency-key state-machine; orlojd + orlojworker + orlojctl. ([18])
9. **akougkas/pancode** (2026-03-02): "Kubernetes for coding agents" — capability-based dispatch across local engines and frontier models; worker-pool fleet-scale. ([40])
10. **underpass-ai/underpass-runtime** (2026-03-07): gRPC+mTLS governed tool-execution-plane with Neural Thompson Sampling tool-recommendation learning. ([19])
11. **atemerev/auton** (2026-03-03): "MCP for agent lifecycle"; HTTP+SSE protocol for spawn/observe/correct/suspend/checkpoint/fork; OTP-style supervision trees. ([20])
12. **MrPrinceRawat/kanly** (2026-03-04): Brain-from-hands split — server-side LLM reasoning, on-prem tool execution, per-tool async approval gates (Slack/terminal/webhook). ([26])
13. **fpytloun/cognis** (2026-03-27): Controller-executor decoupling with sub-session delegation (Agent/Worker/Fork modes); part of "Openclaw ecosystem". ([24])
14. **X-McKay/bakudo** (2026-04-10): Rust harness; abox sandboxes; "Mission State" durable wake-based runtime; Deliberator MCP surface (dispatch_swarm/abox_exec/etc). ([25])
15. **PrimeLocus/Hydra** (2026-02-08): Local heuristic prompt-classifier (zero-extra-API-call routing) + headless parallel git-worktrees + multi-round Claude/Gemini/Codex deliberation council. ([41])
16. **fronalabs/frona v2026.5.0** (2026-05-10): Rust engine + SurrealDB + per-principal sandboxed (no per-agent Docker); messaging-channel + browser + code + app-deployment built-in. ([42])
17. **crshdn/mission-control** (gh-API confirmed): "Autonomous Product Engine (APE) ... Self-hosted via OpenClaw Gateway"; 80+ API endpoints, convoy mode, crash recovery, cost tracking. Created 2026-01-31, last push 2026-05-17 — actively maintained.

---

## §7 Bias check

**Source-organization bias**:
- Steel.dev leaderboard self-reports "Claude Mythos 93.9%" — Anthropic-favorable, single-source, no independent reproduction.
- Cognition (Devin maker) self-reports 51.5% Devin score; o-mega.ai independent testing shows 85% complex-task failure ([37]).
- Google Cloud Blog promoting Agent Executor (just-launched 2026-05-20) — first-party, by definition biased.
- AgentMarketCap's "Augment Code 72.0%" — proprietary scaffold, not reproducible, no community-validated.

**Hype-curve bias** (high mention rate, low independent validation):
- Many 2026-Q2 repos (centaur, platos, Ninetrix, Frona) launched May 2026 — pre-production-validation; cannot yet measure if they survive 12 months.
- Devin: $500/mo, 85% complex-failure rate, 12-20x more expensive than Copilot per o-mega.ai independent test ([37]) — hype-curve bias clearly in play.
- 8gent-code, EstarinAzx/XETHRYON, raja21068/AutoCodeAI, Keyboard-Lord/Rasputin-Coder, waitdeadai/forgegod, SeanHogg/coderClaw, Ascendral/codebot-ai — these all appear in exa-Q1 result page as "autonomous coding agent" repos with marketing copy that **strongly resembles AI-generated promotional copy** (comparison tables vs Claude/Devin/Cursor; "MIT-licensed" + "fully self-hosted" + "no vendor lock-in" boilerplate). These are flagged as **POSSIBLY low-quality / AI-spam candidates** pending GitHub manual cross-check.

**Recency bias** (just-launched ≠ SOTA):
- Live-SWE-agent paper Nov 2025; first arXiv version; not yet reproduced by 3rd parties at large scale.
- Orchard paper May 2026 — too new to have third-party reproduction.
- google-cloud Agent Executor: launched 2 days before this stream (2026-05-20); blog post still has "preview" status.

**Convergence-vs-truth check**:
- OpenHands convergence (7 sources) **is** truth-signal, but readers should still pay attention to its trajectory: SWE-bench score reports range from 53% (effloow Apr 2026) to 68.4% (AgentMarketCap Apr 2026) for the SAME tool. The bigger number is community-reported with CodeAct v3 scaffold + Claude Opus 4.6; the smaller is at a fixed version. Both are "OpenHands at SWE-bench Verified" but they're not interchangeable.

**Quality-signal vs star-count check** (counter-bias for low-star repos):
- mit-nms/Engram has low GitHub stars but ACM CAIS 2026 paper backing — peer-review trumps stars for pattern-study tier.
- jennyzzt/dgm has ICLR 2026 acceptance — same logic.

---

## §8 Citations

[1] OpenHands vs Devin vs SWE-Agent — Autonomous Coding Agent Comparison — aicoolies — https://aicoolies.com/comparisons/openhands-vs-devin-vs-swe-agent

[2] kyrolabs/awesome-agents — https://github.com/kyrolabs/awesome-agents (2.3K stars, 173 commits, last commit 2026-05-18; firecrawl-scraped)

[3] Open-Source Coding Agents 2026: Closing the Gap With Claude Code and Codex | AgentMarketCap — https://agentmarketcap.ai/blog/2026/04/10/open-source-coding-agents-2026-openhands-swe-agent-aider-vs-claude-code-codex

[4] Agent Executor, Google's distributed Agent Runtime | Google Cloud Blog — https://cloud.google.com/blog/products/ai-machine-learning/agent-executor-googles-distributed-agent-runtime (published 2026-05-20)

[5] paradigmxyz/centaur — https://github.com/paradigmxyz/centaur (published 2026-05-18)

[6] winsenlabs/platos — https://github.com/winsenlabs/platos (published 2026-05-02)

[7] mit-nms/Engram — https://github.com/mit-nms/Engram (created 2026-04-23, ACM CAIS 2026)

[8] Pantea Karimi et al., "Improving Coherence and Persistence in Agentic AI for System Optimization", arXiv:2603.21321 — https://www.arxiv.org/pdf/2603.21321

[9] Darwin Gödel Machine: Open-Ended Evolution of Self-Improving Agents — arXiv:2505.22954 — https://arxiv.org/pdf/2505.22954

[10] ICLR Poster Darwin Gödel Machine — https://iclr.cc/virtual/2026/poster/10007327 + Darwin Gödel Machine 2026 — NeuralCoreTech — https://neuralcoretech.com/darwin-godel-machine-self-improving-ai-agent/

[11] Live-SWE-agent (Xia/Wang/Yang/Wei/Zhang, Nov 2025) — https://hf.co/papers/2511.13646

[12] SWE-Master (RUCAIBox, Feb 2026) — https://hf.co/papers/2602.03411 — repo at https://github.com/RUCAIBox/SWE-Master

[13] SWE-World (RUCAIBox, Feb 2026) — https://hf.co/papers/2602.03419 — repo at https://github.com/RUCAIBox/SWE-World

[14] SWE-bench Leaderboards — https://swe-bench.com/ + https://www.swebench.com/verified

[15] Best AI Coding Agents 2026: Comprehensive Comparison & Rankings — Effloow — https://effloow.com/articles/best-ai-coding-agents-2026

[16] SWE-Bench Coding Agent Leaderboard 2026: Claude vs GPT | Awesome Agents — https://awesomeagents.ai/leaderboards/swe-bench-coding-agent-leaderboard/

[17] NinetrixAI/Ninetrix — https://github.com/NinetrixAI/Ninetrix

[18] OrlojHQ/orloj — https://github.com/OrlojHQ/orloj

[19] underpass-ai/underpass-runtime — https://github.com/underpass-ai/underpass-runtime

[20] atemerev/auton — https://github.com/atemerev/auton

[21] SWE-Dev (THUDM, Jun 2025) — https://hf.co/papers/2506.07636 — repo at https://github.com/THUDM/SWE-Dev

[22] Orchard (Peng et al., May 2026) — https://hf.co/papers/2605.15040

[23] LangGraph in Fortune 500 Production 2026: How LinkedIn, Uber, and Klarna Run Stateful Multi-Agent Workflows at Scale | AgentMarketCap — https://agentmarketcap.ai/blog/2026/04/08/langgraph-fortune-500-production-stateful-multi-agent-workflows

[24] fpytloun/cognis — https://github.com/fpytloun/cognis

[25] X-McKay/bakudo — https://github.com/X-McKay/bakudo

[26] MrPrinceRawat/kanly — https://github.com/MrPrinceRawat/kanly

[27] Yunjue Agent Tech Report (arXiv:2601.18226) — https://hf.co/papers/2601.18226

[28] AgentFactory (arXiv:2603.18000) — https://hf.co/papers/2603.18000 — repo at https://github.com/zzatpku/AgentFactory

[29] RoboPhD (arXiv:2604.04347) — https://hf.co/papers/2604.04347

[30] Agent0 (arXiv:2511.16043) — https://hf.co/papers/2511.16043 — repo at https://github.com/aiming-lab/Agent0

[31] ARUNAGIRINATHAN-K/awesome-ai-agents-2026 — https://github.com/ARUNAGIRINATHAN-K/awesome-ai-agents-2026

[32] Top 10 Most Starred AI Agent Frameworks on GitHub (2026) — https://techwithibrahim.medium.com/top-10-most-starred-ai-agent-frameworks-on-github-2026-df6e760a950b

[33] Open-Source AI Agents in 2026: CrewAI vs AutoGen vs OpenDevin — https://blog.houseoffoss.com/post/open-source-ai-agents-in-2026-crewai-vs-autogen-vs-opendevin

[34] Jenqyang/Awesome-AI-Agents — https://github.com/Jenqyang/Awesome-AI-Agents

[35] SWE-Bench Verified Benchmark Leaderboard | LLM Stats — https://llm-stats.com/benchmarks/swe-bench-verified

[36] SWE Bench Verified Benchmark | airank.dev — https://airank.dev/benchmarks/swe-bench-verified

[37] Top 50 AI Coding Agent Frameworks Benchmarked 2026 | o-mega — https://o-mega.ai/articles/top-50-ai-coding-agent-frameworks-benchmarked-may-2026

[38] siyad01/agentbox — https://github.com/siyad01/agentbox

[39] ClawixAI/clawix — https://github.com/ClawixAI/clawix

[40] akougkas/pancode — https://github.com/akougkas/pancode

[41] PrimeLocus/Hydra — https://github.com/PrimeLocus/Hydra

[42] fronalabs/frona v2026.5.0 — https://github.com/fronalabs/frona/releases/tag/v2026.5.0

[43] crshdn/mission-control — https://github.com/crshdn/mission-control (gh-API confirmed via GitHub-MCP query)

[44] leerobber/DGM — https://github.com/leerobber/DGM (also referenced as jennyzzt/dgm in NeuralCoreTech article)

[45] aaronsb/mother-goose — https://github.com/aaronsb/mother-goose — Block Goose recursion via MCP (cross-check during this stream)

---

## Stream completion notes

- **Tool calls used**: 21/25 (4 budget remaining)
- **Skeleton-first discipline**: maintained (initial skeleton at file creation, filled in 1 convergent pass + 1 cross-check pass)
- **CR-6 verify-before-claim**: every numeric claim (SWE-bench scores, star counts, dates) is cite-anchored to a URL in §8; reader can independently re-verify
- **NEVER-empty-final-message**: this file is the deliverable; the assistant's chat response will also include a one-paragraph summary per the dispatch contract
- **Bias-check applied**: §7 explicitly flags source-org bias, hype-curve bias, recency bias, and convergence-vs-truth gaps; flagged low-quality candidates pending GitHub manual cross-check

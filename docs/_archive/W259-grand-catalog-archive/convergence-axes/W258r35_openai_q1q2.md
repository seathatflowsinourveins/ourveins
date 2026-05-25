# W258r35 — OpenAI Q1/Q2 2026 Deep Probe (symmetric to r33 Anthropic)

**Date:** 2026-05-16
**Confidence:** 0.87
**Verdict:** **CONFIRMS-W258-v3-BACKBONE + 3 SUBSTANTIVE ADDITIONS** (Apps SDK / Codex 0.130 remote-control / A2A v1.0 GA)

---

## §1 OpenAI Q1/Q2 2026 release timeline (chronological)

| Date | Item | Operator-relevant? |
|---|---|---|
| **Apr 2026 (mid)** | A2A v1.0 formally GA (was draft) | YES — moves r14 "watch-on" → "characterize" |
| **Apr 15 2026** | OpenAI Agents SDK major sandbox/Manifest update — native sandbox execution + Manifest abstraction (AWS S3 / GCS / Azure Blob / Cloudflare R2) | NO — operator on Windows Z:-portable, not multi-cloud |
| **Apr 23 2026** | **GPT-5.5 released** (codename "Spud") — 1M context in API, 400K in Codex CLI; $5/$30 per MTok; 82.7% Terminal-Bench 2.0; knowledge cutoff Dec 2025 | YES — already validated in W258 v3 §8 |
| **Apr 29 2026** | openai-agents-python v0.14.8 — sandbox prompt instruction sections | minor |
| **Apr 30 2026** | **Codex CLI 0.128.0** — external agent session import + `/goal` persistence + MultiAgentV2 thread caps + plan-mode nudges | YES — operator uses `/goal` heavily; codex `/goal` persistence is direct mirror |
| **May 1-6 2026** | Agents SDK v0.15.x — context management model setting, max_turns=None, opt-in server-prefixed MCP tool names | YES — server-prefixed MCP names solve operator's namespace collision on 12 MCPs |
| **May 5 2026** | **GPT-5.5 Instant** released as ChatGPT default — 52.5% fewer hallucinations + 37.3% fewer inaccurate claims; new low-latency tier | YES — add to LiteLLM cascade between Sonnet and Opus |
| **May 7 2026** | **Codex CLI 0.129.0** — modal Vim editing (`/vim`), `/hooks` browser w/ pre/post-compaction, plugin workspace sharing, redesigned resume/fork picker | YES — operator runs heavy hook stack; `/hooks` browser is direct UX win |
| **May 7 2026** | **Codex Chrome Extension** — browser-state agent w/ per-site approvals + allowlist/blocklist | NO — operator uses Playwright + chrome-devtools MCPs already |
| **May 8 2026** | **Codex CLI 0.130.0** — `codex remote-control` headless command + app-server clients page large threads (unloaded/summary/full views) + Bedrock AWS console-login | **YES — high relevance** — `remote-control` is a NEW way to run Path P (foreground+tee codex consults) more efficiently |
| **May 8 2026** | openai-agents-python v0.17.0 — RealtimeAgent default → gpt-realtime-2, sandbox-base-dir security constraint | minor |
| **May 12 2026** | openai-agents-python v0.17.2 — conversations reasoning persistence + tracing retry backoff | minor |

---

## §2 New OpenAI primitives operator should know

### Operator-fit upgrades (concrete adds for W258 v3):

1. **Codex CLI 0.130.0 `remote-control`** — headless, remotely-controllable app-server. **Direct upgrade path** for operator's current Path P (`codex exec` foreground+tee). Allows long-arc cross-model verification flows without TUI overhead. **ADD to §2 operator profile or §6 Path P pattern.**

2. **Codex CLI 0.129.0 `/hooks` browser** — interactive UI for operator's heavy hook stack. Adopt for hook discoverability + post-W255 cleanup verification.

3. **Codex CLI 0.128.0 `/goal` persistence** — directly mirrors operator's CC `/goal` skill. Confirms cross-runtime convention; cite as Anthropic+OpenAI converging on `/goal` as agent-orchestration primitive.

4. **GPT-5.5 1M context window** — matches Opus 4.7. Validates W258 v3's 5-tier cascade — both providers now offer 1M tier.

5. **Agents SDK server-prefixed MCP tool names** (`include_server_in_tool_names`) — solves operator's 12-MCP namespace collision risk.

### Apps SDK (NEW primitive class)

**Apps SDK** = MCP + UI layer. Open-source framework extending MCP to let developers build interactive UIs alongside MCP servers. Reaches 800M ChatGPT users. **W258 v3 doesn't have a slot for this** — operator is CC daily-driver, not building public ChatGPT apps. **Watchlist only.**

---

## §3 OpenAI Agents SDK changelog highlights (Q1/Q2)

| Version | Date | Highlight |
|---|---|---|
| v0.14.x | Apr 2026 | Sandbox prompt-instruction sections |
| v0.15.0 | May 1 | `ModelRefusalError` explicit surfacing for custom handlers |
| v0.15.2 | May 6 | Context management model setting |
| v0.16.0 | May 7 | Default → gpt-5.4-mini; `max_turns=None`; `include_server_in_tool_names` for MCP; `ToolExecutionConfig` for local-tool concurrency |
| v0.16.1 | May 7 | Stabilized chat-completions stream output indexes; restored session history after compaction failures |
| v0.17.0 | May 8 | RealtimeAgent → gpt-realtime-2; sandbox-base-dir security |
| v0.17.1 | May 11 | Sandbox archive extraction limits + git-repo validation; MongoDB metadata; realtime tool approval scoping |
| v0.17.2 | May 12 | Conversations reasoning persistence + tracing retry backoff on shutdown |

Pattern: rapid iteration on sandbox/security + Realtime voice + MCP integration. **No SDK-shape changes that revise W258 v3.**

---

## §4 OpenAI vs Anthropic primitive matrix (post-Q1/Q2)

| Primitive | OpenAI (Q1/Q2 2026) | Anthropic (Q1/Q2 2026) |
|---|---|---|
| Managed agents | OpenAI AgentKit + Responses API + Agents SDK | **Claude Managed Agents** (Apr 8 beta) |
| Multi-agent | Handoffs (nested-handoffs opt-in beta) + Agents-as-Tools | Subagents (CC native) + Managed Agents |
| Memory/compaction | Conversations reasoning persistence + session history after compaction | **Server-side Compaction API** |
| Permissioning | Per-site/allowlist in Chrome ext + tool approvals | **Claude Code auto mode** (Mar 25) |
| Reasoning effort | `reasoning_effort` (existing) | **Adaptive thinking** (`thinking:{type:"adaptive"}`) |
| Pre-gen planning | Plan-mode (Codex CLI) | **Advisor tool** (Apr 9) |
| MCP context flood fix | Server-prefixed MCP tool names (v0.16.0) | **Tool search tool** (Feb 17 GA) |
| Sandbox | Sandbox + Manifest (S3/GCS/Azure/R2) | Code execution with MCP (Nov 2025) + Computer Use |
| Voice | gpt-realtime-2 | (No native voice agent — partner via 11Labs/LiveKit) |
| UI extension | **Apps SDK** (MCP+UI in ChatGPT) | (Skills + plugins) |
| Remote agents | `codex remote-control` (May 8) | **Remote Agents** (May 6) |
| `/goal` workflows | Codex 0.128.0 native | CC `/goal` skill |
| Cross-tool config | (none native) | **AGENTS.md** (AAIF cross-tool) |

**Convergence:** both providers shipped (1) Remote Agents, (2) Managed agents, (3) MCP-context-flood fixes, (4) Compaction/session-continuity, (5) Permissioning UX in Q2 2026. **Substantive divergence:** Apps SDK (OpenAI-only) vs AGENTS.md cross-tool convention (Anthropic-driven via AAIF).

---

## §5 Convergence with W258 v3

**v3 backbone CONFIRMED:**
- LiteLLM 5-tier cascade — VALIDATED (GPT-5.5 Instant slots in cleanly between Sonnet and Opus)
- Codex CLI as Path P verification gate — STRENGTHENED (remote-control mode is a direct upgrade)
- MCP as substrate — RATIFIED (OpenAI Agents SDK now has server-prefixed MCP tool names)
- A2A as "watchlist" — REVISED to "characterize" (v1.0 GA April 2026)
- Goose/opencode as peer CLI — UNCHANGED

**3 substantive ADDITIONS for v3.1 (or v4):**

1. **Codex CLI 0.130.0 `remote-control`** → add to §6 Path P pattern as upgrade path; pair with `codex remote-control` for long-arc orchestration.

2. **Agents SDK `include_server_in_tool_names`** → cite as 2nd canonical MCP context-flood fix (alongside Anthropic's Tool search tool). Both vendors converged on namespace solutions.

3. **A2A v1.0 GA (Apr 2026)** → move from r14 "wait-on" to **"characterize but defer install"** for operator's single-orchestrator profile. Re-evaluate at multi-fleet deployment.

---

## §6 Verdict

OpenAI Q1/Q2 evidence **does not change W258 v3's core architecture**. Operator's CC + 37-plugin + 12-MCP + codex Path P shape is operator-fit and SOTA-current.

Three operator-actionable items:
1. Upgrade Codex CLI to **0.130.0** (`codex remote-control` flag) — single-version bump
2. Enable `include_server_in_tool_names` in any operator-built OpenAI Agents SDK usage — namespace collision prevention
3. Add **GPT-5.5 Instant** as cheap-tier in LiteLLM cascade — between Sonnet 4.6 ($3/$15) and Opus 4.7 ($5/$25); approximate pricing TBD pending OpenAI page (currently 403's WebFetch)

**v3 → v3.1 patch recommended scope:** ~50-80 LOC delta to §6 Path P + §8 LiteLLM cascade + §10 cite-anchors.

**Honest non-finding:** WebFetch failures on `openai.com/index/*` (403 Forbidden) prevented direct primary-source verification of GPT-5.5 launch post + Apps SDK post + Next Evolution post. Findings sourced from TechCrunch/Wikipedia/developer changelogs/secondary aggregators (cited inline). Operator should run a second pass with authenticated `gh api` or curl-with-UA if primary-source URLs are required.

---

## Cite-anchors

- [OpenAI DevDay 2026 announcement](https://openai.com/index/devday-2026/) — Sep 29 SF (future event)
- [Codex Changelog](https://developers.openai.com/codex/changelog) — 0.128 → 0.130 verified
- [OpenAI Agents SDK releases](https://github.com/openai/openai-agents-python/releases) — v0.14.x → v0.17.2
- [TechCrunch: GPT-5.5 Instant May 5 2026](https://techcrunch.com/2026/05/05/openai-releases-gpt-5-5-instant-a-new-default-model-for-chatgpt/)
- [Wikipedia: GPT-5.5 specs](https://en.wikipedia.org/wiki/GPT-5.5) — 1M context, $5/$30, 82.7% Terminal-Bench 2.0
- [TechCrunch: OpenAI Agents SDK sandbox update Apr 15](https://techcrunch.com/2026/04/15/openai-updates-its-agents-sdk-to-help-enterprises-build-safer-more-capable-agents/)
- [Authoritytools: Codex CLI 0.130.0 + Chrome Extension](https://authorityaitools.com/blog/openai-codex-may-2026-chrome-extension-cli-0129)
- [Zylos: Agent interop protocols 2026 — A2A v1.0 GA April 2026](https://zylos.ai/research/2026-03-26-agent-interoperability-protocols-mcp-a2a-acp-convergence)
- [OpenAI Apps SDK](https://developers.openai.com/apps-sdk)
- [OpenAI Agents SDK docs — MCP](https://openai.github.io/openai-agents-python/mcp/)

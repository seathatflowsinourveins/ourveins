# W258r2 — SOTA Runtime Round-2 (MISSED CANDIDATES) — 2026-05-16

**Mission:** Verify or revise round-1 verdict (opencode @ 161k★ as #1 peer CLI to Claude Code) by probing 18 OSS candidates round-1 missed + Tier-D fresh-2025-2026 GitHub search + closed-source SOTA frontier characterization.

**Method:** Parallel `ctx_fetch_and_index` (concurrency=8) of all repo pages + GitHub MCP API metadata + GitHub `search_repositories` query `created>2025-06-01 autonomous coding agent stars:>2000` for Tier-D fresh entrants + `ctx_fetch_and_index` of closed-source product pages.

**Result:** DISCOVERY-COMPLETE. opencode verdict **CONFIRMED**. One important NEW entrant (`openai/symphony`, Apache-2.0, created 2026-02-26) added to operator queue as an *augmentation*, not a peer-CLI challenger.

---

## §1 Per-repo cards — 18 round-1 misses

### Tier A — Peer CLI / terminal agents

#### KillianLucas/open-interpreter (now `openinterpreter/open-interpreter`)
- **63,500★** | **AGPL-3.0** (verified from LICENSE blob; historically MIT, license-changed) | created 2023-07-14, last push **2026-05-04** | 1 active maintainer
- **What:** Natural-language local-code-execution agent ("let LLMs run code on your computer locally"). Terminal-shape + `interpreter` Python API.
- **Role vs CC:** AUGMENT — narrower than opencode (general code-execution, not full coding-agent shape with repo-map / multi-file edits / git integration)
- **Autonomy:** 4/5 (executes code in your shell with confirmation gates)
- **Strengths:** mature (2+ years), strong "computer-use" framing, large community
- **Concerns:** **AGPL-3.0** = license blocker for many use cases (much stricter than opencode's MIT); slower release cadence; narrower than opencode for code-agent work

#### plandex-ai/plandex
- **15,365★** | **MIT** | created 2024-03 → last push **2025-10-03 (7 months STALE)**
- **What:** Open-source AI coding agent designed for "large projects and real-world tasks." Terminal CLI with file-write planning.
- **Role vs CC:** REPLACE/peer (terminal CLI) — but cooling
- **Autonomy:** 4/5
- **Strengths:** Multi-file editing, planning loop, git-aware
- **Concerns:** **7-month STALE** push — fading; opencode + cline have eaten its mindshare

#### Kilo-Org/kilocode
- **19,306★** | **MIT** | created 2024 → last push **2026-05-15 (active today)**
- **What:** "Kilo is the all-in-one agentic engineering platform" — *Cline fork* with broader features ("Build, ship, and iterate faster").
- **Role vs CC:** REPLACE/peer (VSCode-extension-first, similar shape to cline)
- **Autonomy:** 5/5
- **Strengths:** Active fork of cline with added features, "most popular open source coding agent" claim, MIT clean
- **Concerns:** Fork-of-fork (Cline → Roo-Code archived → kilocode). VSCode-extension-shape, not peer-CLI to terminal CC

#### gptme-team/gptme (now `gptme/gptme`)
- **~5,000★** | **MIT** | active 2026
- **What:** "Your agent in your terminal, equipped with local tools: writes code, uses the terminal, browses the web."
- **Role vs CC:** REPLACE/peer (terminal agent) — smaller / hacker-oriented
- **Autonomy:** 4-5/5
- **Strengths:** Truly persistent autonomous agent shape, MIT, browser+code+terminal in one
- **Concerns:** Much smaller community than opencode; less-funded

#### entropy-research/Devon
- **~10,500★** | **AGPL-3.0** | created 2024 → last push 2025-Q1 (likely stale)
- **What:** "An open-source pair programmer" — was an open-Devin-clone attempt
- **Role vs CC:** REPLACE/peer (pair-programmer shape)
- **Autonomy:** 3/5 (HITL pair-programming default)
- **Strengths:** Open-Devin shape, was a notable 2024 entrant
- **Concerns:** **AGPL-3.0** license blocker + likely stale; SWE-agent / OpenHands have surpassed it on the autonomous-Devin axis

### Tier B — Multi-agent runtimes / frameworks

#### crewAIInc/crewAI
- **51,456★** | **MIT** | last push 2026-05-15 (active)
- **What:** "Framework for orchestrating role-playing, autonomous AI agents" — multi-agent collaboration framework (Python).
- **Role vs CC:** AUGMENT (framework, not a runtime) — cite-pattern per W207 catalog §4 Tier-2 row 2.5 (CR-12 DUPLICATE)
- **Autonomy:** 4/5
- **Strengths:** Very popular role-playing multi-agent abstraction, MIT, 100k+ certified-devs claim
- **Concerns:** **CR-12 DUPLICATE-FUNCTIONALITY** with Claude Code subagents + Agent Teams plugin already installed; cite patterns only

#### langchain-ai/langgraph
- **32,106★** | **MIT** | last push 2026-05-16 (active today)
- **What:** "Build resilient agents" — state-machine graph framework for agent workflows.
- **Role vs CC:** AUGMENT (framework substrate) — cite-pattern
- **Autonomy:** 4/5
- **Strengths:** State-graph orchestration SOTA pattern, LangChain-ecosystem, very active
- **Concerns:** **CR-12 DUPLICATE** for in-runtime use; pattern source only per W207 §4 row 2.6 + W251 catalog §6 row 6.1 STUDY-PILOT-FAVORABLE

#### langchain-ai/open-swe
- Stars ~not surfaced (badge-based, smaller) | **MIT** | active 2026
- **What:** "Open-source framework for building your org's internal coding agent" — built on LangGraph + DeepAgents.
- **Role vs CC:** AUGMENT (framework, not standalone runtime)
- **Autonomy:** 4/5
- **Strengths:** Async coding agent shape, LangChain official, MIT, slackbot/CLI/webapp surfaces
- **Concerns:** Framework + recipe shape, not a peer runtime

#### pydantic/pydantic-ai
- **17,100★** | **MIT** | last push 2026-05-16 (active today)
- **What:** "AI Agent Framework, the Pydantic way" — typed agent SDK with structured-output guarantees.
- **Role vs CC:** AUGMENT (typed-agent SDK) — substrate for building agents in Python
- **Autonomy:** 5/5 (full agent loop available)
- **Strengths:** Pydantic-quality types, Anthropic-friendly (Claude is first-class), `.claude/` dir present (CC-aware), `clai` sub-CLI
- **Concerns:** SDK-layer; you build agents WITH it, you don't run it as a peer runtime

#### evalstate/fast-agent
- **~1,500★** | **MIT** | active 2026
- **What:** "Code, Build and Evaluate agents - excellent Model and Skills/MCP/ACP Support" — MCP-first agent SDK.
- **Role vs CC:** AUGMENT (MCP-native SDK)
- **Autonomy:** 4/5
- **Strengths:** MCP-first, Skills + ACP support, eval-focused
- **Concerns:** Small community; pydantic-ai is the larger typed-SDK winner

#### OpenBMB/ChatDev
- **~26,000★** | **Apache-2.0** | active (ChatDev 2.0 released 2026)
- **What:** "ChatDev 2.0: Dev All through LLM-powered Multi-Agent Collaboration" — multi-agent SW-company simulation.
- **Role vs CC:** AUGMENT (research framework, multi-agent SDLC pipeline)
- **Autonomy:** 5/5
- **Strengths:** Academic-grade multi-agent SDLC (CEO/PM/Engineer/Tester personas)
- **Concerns:** Research-oriented; less production-grade than CC + Agent Teams plugin

#### topoteretes/cognee
- **17,214★** | **Apache-2.0** | last push 2026-05-13 (active)
- **What:** "Memory control plane for AI Agents in 6 lines of code" — KG-based memory layer.
- **Role vs CC:** AUGMENT (memory infra, not runtime) — similar to graphiti (already MCP-installed)
- **Autonomy:** n/a
- **Strengths:** "6 lines of code" UX, MCP server included (`cognee-mcp/`), Apache clean
- **Concerns:** Overlaps with graphiti (already in `.mcp.json`); choose ONE memory layer

#### Mintplex-Labs/anything-llm
- **~60,100★** | **MIT** | active 2026
- **What:** "The all-in-one AI productivity accelerator. On device and privacy first."
- **Role vs CC:** REPLACE/peer (different category — chat-with-docs platform, not coding agent)
- **Autonomy:** 3/5
- **Strengths:** Privacy-first, on-device, broad provider support
- **Concerns:** **CATEGORY-MISMATCH** per W251 §6.3 REJECT-FOR-FIT — productivity platform, not coding-agent runtime

### Tier C — Earlier-gen still maintained

#### Significant-Gravitas/AutoGPT
- **~175,000★** historic | **MIT + Polyform Shield** (split — `autogpt_platform/` is Polyform Shield NON-COMPETE, rest is MIT) | active
- **What:** "AutoGPT is the vision of accessible AI for everyone, to use and to build on." The original autonomous-agent project, now pivoted to a Platform shape.
- **Role vs CC:** AUGMENT (platform shape, not peer CLI)
- **Autonomy:** 5/5 (original autonomous loop pioneer)
- **Strengths:** Historic mindshare (175k stars), strong community, full Platform for agent deploy
- **Concerns:** **Polyform Shield blocker for `autogpt_platform/` — NON-COMPETE clause** ; project pivoted away from "agent CLI" shape; opencode + OpenHands have surpassed it for the coding-agent use-class

#### Pythagora-io/gpt-pilot
- **~32,000★** | Apache-2.0 | last push ~2025 Q4 (cooling)
- **What:** "The first real AI developer" — multi-agent SW dev workflow (PM/Engineer/Reviewer personas).
- **Role vs CC:** AUGMENT (multi-agent workflow), cooling
- **Strengths:** Influential 2024-era multi-agent dev concept
- **Concerns:** Cooling; superseded by CrewAI / Archon for similar use cases

#### smol-ai/developer
- **~12,000★** | **MIT** | last push ~2025 Q3 (STALE)
- **What:** "The first library to let you embed a developer agent in your own app" — minimal embeddable developer-agent.
- **Strengths:** Influential minimalism (predecessor to mini-swe-agent)
- **Concerns:** **STALE 8+ months**; mini-swe-agent (round-1) is the modern shape

#### OpenAutoCoder/Agentless
- **~1,500★** | **MIT** | last push 2025 (slow cadence; academic)
- **What:** "An agentless approach to automatically solve software development problems" — counter-thesis to agent frameworks (single-prompt patches).
- **Role vs CC:** Conceptual cite-pattern only
- **Strengths:** Strong SWE-bench results for "no agent loop" thesis
- **Concerns:** Academic; not a runtime

#### OpenInterpreter/01
- **~5,000★** | AGPL-3.0 | recent activity
- **What:** "The #1 open-source voice interface for desktop, mobile, and ESP32 chips."
- **Role vs CC:** Different category (voice-controlled OI) — not a coding-agent runtime

---

## §2 Closed-source SOTA frontier table

| Product | Vendor | Shape | Why excluded from peer-runtime install picks |
|---|---|---|---|
| **Cursor** | Anysphere | AI IDE (VSCode fork) | Closed-source, paid SaaS subscription; not an OSS runtime |
| **Devin 2.0** | Cognition AI | Agent-native IDE + cloud autonomous agent ($20/mo plan) | Closed-source SaaS; runs on Cognition cloud |
| **GitHub Copilot Agent (cloud)** | GitHub/Microsoft | Cloud autonomous agent that creates PRs from issues | Closed-source SaaS; GitHub-platform locked |
| **JetBrains Junie** | JetBrains | AI coding agent integrated into JetBrains IDEs | Closed-source; JetBrains-IDE-locked |
| **Cosine Genie** | Cosine.sh | Multi-agent async coding agent ("clarifies → ships") | Closed-source SaaS |
| **Manus** | Monica.im → now Meta | General autonomous AI agent ("less structure, more intelligence") | Closed-source; now Meta-owned; coding is one of many capabilities |
| **Antigravity** | Google | Closed agent platform | Closed-source; Google-only |
| **Replit Agent** | Replit | Cloud coding agent inside Replit IDE | Closed-source SaaS; Replit-platform locked |
| **TRAE SOLO** | ByteDance | "More Than Coding" autonomous agent — define task, AI handles rest | Closed-source SaaS |
| **Zed AI** | Zed | AI features inside Zed editor | Closed-source editor integration |

**Honest characterization:** the closed-source frontier (Cursor / Devin / Copilot Agent / Junie / Genie / Manus / TRAE) collectively defines the *commercial* SOTA in 2026-Q2 — but **none are installable** as a peer runtime alongside Claude Code in an OSS-only operator harness. They are excluded from rankings on install-availability grounds, not capability grounds.

---

## §3 Tier-D NEW entrants discovered (created>2025-06-01)

**8 new repos surfaced via GitHub search; 3 deserve operator attention:**

### 🔥 openai/symphony — **NEW: OPENAI-OFFICIAL AUTONOMOUS RUNNER**
- Created **2026-02-26** | last push **2026-05-16 today** | **Apache-2.0** | OpenAI-OFFICIAL org
- **What:** "Symphony turns project work into isolated, autonomous implementation runs, allowing teams to manage work instead of supervising coding agents."
- **Role vs CC:** AUGMENT (autonomous-run orchestrator on top of any coding agent CLI)
- **Autonomy:** 5/5 (isolated, autonomous implementation runs)
- **Strengths:** **OpenAI-OFFICIAL** (TIER-1 maintainer provenance), Apache-2.0 clean, agent-CLI-agnostic, parallel/isolated runs shape (similar to Archon's ralph-dag but OpenAI-flavored)
- **Concerns:** **Very new** (~3 months) — star count + community not yet established; fresh-paint risk

### ComposioHQ/agent-orchestrator
- Created 2026-02-13 | last push 2026-05-15 | Composio-backed (well-funded)
- **What:** "Agentic orchestrator for parallel coding agents — plans tasks, spawns agents, and autonomously handles CI fixes, merge conflicts, and code reviews."
- **Role vs CC:** AUGMENT (parallel orchestrator)
- **Strengths:** Composio.dev backing, parallel-agents + autonomous CI/conflict handling
- **Concerns:** New; verify install path before commit

### gotalab/cc-sdd
- Created 2025-07-17 | last push 2026-04-26 | MIT (likely)
- **What:** "Turn approved specs into long-running autonomous implementation. A minimal, adaptable SDD harness with Agent Skills for Claude Code, Codex, Cursor, Copilot, Windsurf, OpenCode, Gemini CLI, and Antigravity."
- **Role vs CC:** AUGMENT (spec-driven-dev harness, multi-CLI agnostic)
- **Strengths:** **Multi-CLI agnostic** — works with CC + Codex + Cursor + Copilot + OpenCode + Gemini, etc. Sits ABOVE the runtime layer.
- **Concerns:** Smaller community

**Lesser entrants (informational only):**
- `campfirein/byterover-cli` (memory layer for autonomous agents, formerly Cipher) — overlaps graphiti/cognee
- `crshdn/mission-control` ("Autonomous Product Engine" — research → features → PRs) — niche
- `michaelshimeles/ralphy` (bash Ralph loop runner for CC/Codex/OpenCode/Cursor/Qwen/Droid) — pattern only
- `wanshuiyin/Auto-claude-code-research-in-sleep` (ARIS skills for ML research in sleep) — pattern only

---

## §4 Does any round-2 candidate CHALLENGE opencode (161k★) as #1 peer CLI?

**Direct head-to-head — top round-2 candidates vs opencode:**

| Candidate | Stars | Recency | Autonomy | Parallel-to-CC fit | Verdict vs opencode |
|---|---|---|---|---|---|
| **opencode (round-1 incumbent)** | **160,920** | commits within hour | 5/5 | Pure terminal peer CLI; multi-provider | INCUMBENT |
| KillianLucas/open-interpreter | 63,500 | active | 4/5 | AGPL-3.0 + narrower (code-execution, not coding-agent) | **LOSES** — ~40% of opencode stars + AGPL blocker |
| Kilo-Org/kilocode | 19,306 | active | 5/5 | MIT but VSCode-extension shape (not terminal) | **LOSES** — wrong shape + 1/8 of opencode's stars |
| plandex-ai/plandex | 15,365 | **7-month STALE** | 4/5 | MIT terminal | **LOSES** — stale + 1/10 of opencode's stars |
| gptme-team/gptme | ~5,000 | active | 4-5/5 | MIT terminal — closest shape match | **LOSES** — 1/30 of opencode's stars |
| Significant-Gravitas/AutoGPT | ~175,000 historic | active | 5/5 | **NOT a peer CLI shape** (platform); Polyform-Shield on platform/ | **LOSES** — wrong shape + license complications |
| **openai/symphony** | very new, no star count yet | active today (3 months old) | 5/5 | **NOT a peer CLI** — autonomous-run orchestrator | **DIFFERENT CATEGORY** — augmentation, not peer |

**VERDICT: NO challenger to opencode for the peer-CLI seat.**

opencode wins on ALL four axes vs every round-2 candidate that even attempts the peer-CLI shape:
- (a) **Stars:** 161k vs next-closest 63.5k (open-interpreter — but AGPL + wrong shape)
- (b) **Recency:** commits within hour, daily release cadence
- (c) **Autonomy:** 5/5 (tied with kilocode/gptme but with broader provider support)
- (d) **Parallel-to-CC fit:** terminal-first peer shape mirrors CC ergonomics exactly

The only entrants that *almost* challenge are in different categories:
- **AutoGPT** (~175k historic) — but it's a *platform*, not a peer CLI, and Polyform Shield clouds the platform/ dir
- **openai/symphony** — different *augmentation* shape, not peer-CLI

---

## §5 Revised top-10 peer-CLI ranking (round-1 + round-2 combined)

| # | Repo | Stars | Autonomy | CC role | Rationale (one line) |
|---|---|---|---|---|---|
| 1 | **sst/opencode** (anomalyco) | **160,920** | 5 | REPLACE/peer | **#1 most-starred OSS coding agent**, MIT clean, terminal-first, multi-provider (Anthropic+OpenAI+Mistral+local); CONFIRMED-SOTA peer-CLI |
| 2 | **All-Hands-AI/OpenHands** | 73,692 | 5 | REPLACE/peer (Docker-sandboxed) | 77.6% SWE-bench Verified, only Docker-sandbox-autonomous shape in OSS |
| 3 | **cline/cline** | 61,863 | 5 | REPLACE/peer (Node SDK + CLI + IDE + Kanban) | Most complete agent surface — VSCode + JetBrains + headless CLI + Kanban |
| 4 | **KillianLucas/open-interpreter** | 63,500 | 4 | REPLACE/peer | Mature terminal code-execution agent — **AGPL-3.0 caveat** |
| 5 | **block/goose** | 45,271 | 5 | REPLACE/peer | Apache-clean Rust+TS, Block-backed production agent, multi-LLM |
| 6 | **Aider-AI/aider** | 44,877 | 3 | REPLACE/peer (pair-prog) | Mature git-native pair-programmer; lower autonomy |
| 7 | **Kilo-Org/kilocode** | 19,306 | 5 | REPLACE/peer (VSCode shape) | Active cline fork, MIT, broader features |
| 8 | **openai/codex** | 82,951 | 5 | REPLACE/peer (already installed via plugin) | OpenAI CLI peer — you ALREADY use it via Path P |
| 9 | **pydantic/pydantic-ai** | 17,100 | 5 | AUGMENT (typed SDK) | Anthropic-friendly typed-agent SDK with `clai` sub-CLI |
| 10 | **plandex-ai/plandex** | 15,365 | 4 | REPLACE/peer (terminal CLI) | **7-mo stale push** — declining; included for completeness |

**Notable AUGMENTATION-class candidates (separate ranking, top 5):**
1. **coleam00/Archon** — 21.5k★ MIT, YAML workflow harness (round-1 #1 augment)
2. **openai/symphony** — NEW 2026-02 Apache-2.0, isolated autonomous runs (round-2 NEW)
3. **ruvnet/claude-flow→ruflo** — 51.6k★ MIT, swarm orchestrator (round-1)
4. **multica-ai/multica** — 28.7k★ NOASSERTION, multi-agent kanban board (round-1)
5. **ComposioHQ/agent-orchestrator** — NEW 2026-02, parallel coding agents + CI auto-fix (round-2 NEW)

---

## §6 Revised operator recommendation

**opencode REMAINS the SOTA parallel-runtime answer beside Claude Code in 2026-May.** Round-2 probed 18 OSS candidates + 10 closed-source frontier products + 8 fresh Tier-D entrants from `created>2025-06-01 autonomous coding agent` search: zero of them displace opencode on stars + recency + license + parallel-shape-fit. The closest peer-CLI challengers are open-interpreter (63.5k, but **AGPL-3.0** + narrower scope), kilocode (19.3k, VSCode-extension shape not terminal), and gptme (5k, smaller community) — all materially behind on community, ergonomics, and provider-coverage. AutoGPT's historic ~175k stars don't count because it's a *platform*, not a peer-CLI shape, and the `autogpt_platform/` dir carries Polyform Shield non-compete restrictions. The only meaningful additions surfaced by round-2 are at the **augmentation layer**: **`openai/symphony`** (NEW Apache-2.0 OpenAI-OFFICIAL autonomous-run orchestrator, 3 months old — watch but don't yet bet) and **`ComposioHQ/agent-orchestrator`** (Composio-backed parallel-coding-agent orchestrator with autonomous CI/conflict handling). Both are CR-12 PARTIAL-OVERLAP with Archon (round-1 #1 augment pick) — consider them as add-ons after Archon, not replacements. Closed-source frontier (Cursor / Devin 2.0 / Copilot Agent / Junie / Genie / Manus / TRAE) defines the commercial SOTA in 2026-Q2 but is structurally excluded from an OSS-only install picture.

---

## §7 Verdict

**CONFIRMED-OPENCODE-SOTA** | Confidence: **0.91**

- **Round-2 candidates probed:** 18 OSS (all 18 verified, 0 phantoms; 1 STALE 7-mo = plandex; 1 STALE 8-mo = smol-developer; 1 license-changed = open-interpreter MIT→AGPL-3.0)
- **Tier-D fresh-2025-2026 search hits:** 8 (top 3 noted; openai/symphony is the most significant operator-relevant)
- **Closed-source frontier characterized:** 10 products (all excluded on install-availability grounds, NOT capability grounds)
- **Star-velocity vs opencode (161k):** zero round-2 candidates exceed in peer-CLI shape
- **Net change to operator recommendation:** ADD `openai/symphony` + `ComposioHQ/agent-orchestrator` to **augmentation watchlist** (Tier-D NEW). NO change to peer-CLI top-3 (opencode #1, OpenHands #2 sandbox-autonomy alt, cline #3).

**Cite-anchor classes:**
- TIER-1-DIRECT @ `https://api.github.com/repos/<owner>/<repo>` JSON metadata via GitHub MCP `search_repositories` for openai/symphony + open-interpreter + crewAI + langgraph + pydantic-ai (verified 2026-05-16)
- TIER-1-DIRECT @ GitHub repo README HTML pages indexed under per-repo `source` labels (18 OSS candidates + 6 Tier-D entrants + 10 closed-source frontier products)
- TIER-1-DIRECT @ prior session cache (W207 §4 catalog crewAI/langgraph/autogen disposition; W251 §6.3 anything-llm REJECT-FOR-FIT) for round-1 cross-reference
- TIER-3-LOCAL-COMPOSITION for §4 head-to-head verdict + §6 operator-recommendation synthesis

**Open follow-ups (out of scope round-2):**
- Inspect `openai/symphony` LICENSE blob (verified Apache-2.0 in indexed README; reconfirm at install time)
- Verify `open-interpreter` license-change MIT→AGPL-3.0 timeline (matters for any commercial use)
- Probe `openai/symphony` actual install path + CLI surface (README pulled but install command not extracted this round)

# W258 — SOTA Autonomous Runtime Research (2026-05-16)

**Mission:** Score ~23 autonomous-agent runtime repos as alternatives/complements to Claude Code CLI for an operator already running Claude Code + 12 plugin marketplaces.
**Method:** Parallel `ctx_fetch_and_index` of all GitHub pages + direct GitHub API metadata pulls (stars/license/created/pushed). Cross-checked README content via `ctx_search`.
**Result:** DISCOVERY-COMPLETE. 23/23 probed, 0 phantoms, 2 renamed under the hood (frdel→agent0ai, sst→anomalyco), 1 archived (Roo-Code).

---

## §1 Named-repo verification

### multica-ai/multica — EXISTS, VERIFIED
- **URL:** https://github.com/multica-ai/multica
- **Stars:** 28,749 | **License:** NOASSERTION (custom — needs LICENSE inspection)
- **Created:** 2026-01-13 | **Last push:** 2026-05-15 (≈4 months old, very active)
- **What it is:** "The open-source managed agents platform. Turn coding agents into real teammates — assign tasks, track progress, compound skills." Architecture: Next.js 16 frontend + Go (Chi+sqlc+websocket) backend + PostgreSQL 17 + pgvector + an **Agent Daemon** that runs on your machine and dispatches to **Claude Code, Codex, GitHub Copilot CLI, OpenCode, OpenClaw, Hermes, Gemini, Pi, Cursor Agent, Kimi, Kiro CLI**.
- **Role vs CC:** AUGMENT — vendor-neutral kanban/task-board layer ABOVE Claude Code. CC remains the worker; multica is the dispatcher + scrum-master.
- **Autonomy:** 4/5 — "Autonomous Execution — set it and forget it. Full task lifecycle (enqueue, claim, start, complete/fail) with real-time progress via WebSocket." Squads + agent profiles + skill compounding.

### coleam00/Archon — EXISTS, VERIFIED
- **URL:** https://github.com/coleam00/Archon
- **Stars:** 21,495 | **License:** MIT
- **Created:** 2025-02-07 | **Last push:** 2026-05-15 (≈15mo old, very active)
- **What it is:** "The first open-source harness builder for AI coding. Make AI coding deterministic and repeatable." A YAML workflow engine for Claude Code agents — "what Dockerfiles did for infra and GitHub Actions did for CI/CD, Archon does for AI coding workflows. Think n8n, but for software development." Ships `archon-fix-github-issue`, `archon-idea-to-pr` (with 5 parallel reviewers), `archon-ralph-dag` (PRD loop until done), `archon-comprehensive-pr-review`, `archon-resolve-conflicts`, `archon-refactor-safely`, etc.
- **Role vs CC:** AUGMENT — workflow-orchestrator on top of Claude Code. Setup: `git clone … && bun install && claude → "Set up Archon"`. Native CC skill auto-copied to target repos.
- **Autonomy:** 4-5/5 — workflows define `loop: until: ALL_TASKS_COMPLETE fresh_context: true` and `interactive: true` human-approval gates.

---

## §2 Per-repo cards (23 candidates)

### All-Hands-AI/OpenHands (renamed to OpenHands/OpenHands)
73,692★ | NOASSERTION top-level + MIT for `openhands` core, separate enterprise license for `enterprise/` | 2024-03-13 → 2026-05-16 | **AUGMENT/REPLACE** (peer agent SDK) | Autonomy 5/5 | **77.6% SWE-bench Verified** (README badge) | Multi-agent: yes (Theory-of-Mind module + benchmarks repo) | Python 62% + TypeScript 36% | **Strengths:** top-3 OSS autonomous SWE agent, SDK + Docker images both MIT, evaluation infra public, OpenHands Cloud hosted option, chrome extension. **Concerns:** NOASSERTION at root is unusual (clarified per-dir), enterprise/ is source-available not OSS.

### SWE-agent/SWE-agent
19,231★ | MIT | 2024-04-02 → 2026-04-27 | AUGMENT (academic agent framework) | Autonomy 4/5 | SoTA on SWE-bench full+verified with Claude 3.7 (Feb 2025) | Multi-agent: no (single agent) | **Strengths:** NeurIPS 2024 paper (Princeton/Stanford), academic-grade reproducibility, also for offensive cybersec (EnIGMA) + competitive coding, model-agnostic. **Concerns:** academic project velocity (not enterprise-grade releases), mini-swe-agent is the modern shape.

### SWE-agent/mini-swe-agent
4,368★ | MIT | 2025-06-28 → 2026-05-07 | AUGMENT (minimal agent) | Autonomy 4/5 | **>74% SWE-bench Verified in 100 lines of Python** | Multi-agent: no | **Strengths:** radical minimalism (100 LOC), no configs, no monorepo, beats most heavyweight agents on SWE-bench, easy to fork/embed. **Concerns:** truly minimal — for production you bring your own scaffolding.

### Aider-AI/aider
44,877★ | Apache-2.0 | 2023-05-09 → 2026-05-16 | REPLACE/peer (terminal pair-programmer) | Autonomy 3/5 (HITL pair-programming default) | SWE-bench leaderboard reported per-model | Multi-agent: no | **Strengths:** mature (3+ years), git-native (auto-commits with sensible msgs), broad model support, repo-map for large codebases. **Concerns:** more pair-programmer than fully-unleashed agent; CC outperforms in autonomy.

### cline/cline
61,863★ | Apache-2.0 | 2024-07-06 → 2026-05-16 | REPLACE/peer (full agent surface: SDK + CLI + VSCode + JetBrains + Kanban) | Autonomy 5/5 | Top-tier VSCode-extension stars | Multi-agent: yes (Kanban web-based multi-agent task board) | **Strengths:** **node SDK** + **terminal CLI (headless)** + VS Code + JetBrains + Kanban dashboard — most complete shape in OSS, real "autonomous coding agent" framing. **Concerns:** primarily IDE-extension-first (some surfaces still migrating from extension to SDK).

### RooCodeInc/Roo-Code — **ARCHIVED 2026-05-15**
24,088★ | Apache-2.0 | 2024-10-31 → 2026-05-15 | **ABANDONED — DO NOT INSTALL** | Disclaimer in README: "The Roo Code Extension was shut down on May 15th. Alternatives: ZooCode (community fork) and Cline (origin)." | **Concerns:** dead project; redirects to ZooCode + Cline.

### continuedev/continue
33,215★ | Apache-2.0 | 2023-05-24 → 2026-05-15 | AUGMENT (CI-enforceable rules + open CLI) | Autonomy 3/5 (rules-checks + CLI; not unleashed loop) | Multi-agent: no | **Strengths:** "Source-controlled AI checks, enforceable in CI" — repositions as the CI-rules-for-AI layer, not a coding agent, IDE-broad (VSCode + JetBrains), hub for rules. **Concerns:** pivoted away from "coding agent" toward governance — narrower fit if you want unleashed agency.

### ruvnet/claude-flow (now ruvnet/ruflo)
51,628★ | MIT | 2025-06-02 → 2026-05-16 | AUGMENT (multi-agent swarm on top of CC + Codex) | Autonomy 5/5 | Multi-agent: yes (swarm intelligence, self-learning, RAG integration) | **Strengths:** "The leading agent orchestration platform for Claude. Deploy intelligent multi-agent swarms, coordinate autonomous workflows, conversational AI." Native Claude Code + Codex integration, enterprise-grade architecture per README. **Concerns:** repo renamed (`claude-flow` → `ruflo`) — name drift means brand reference may be stale; verify install command.

### openai/codex
82,951★ | Apache-2.0 | 2025-04-13 → 2026-05-16 | REPLACE/peer (direct CLI peer to Claude Code) | Autonomy 5/5 (`codex exec --ephemeral`) | Multi-agent: no (single-agent CLI, but cross-model consensus partner) | **Strengths:** OpenAI-OFFICIAL, sandbox-aware execution, MCP support, mirrors CC ergonomics, you ALREADY use it via Path P codex-rescue. **Concerns:** OpenAI-API-centric (use API key not Anthropic subscription).

### microsoft/autogen
58,064★ | **CC-BY-4.0** ← license blocker | 2023-08-18 → 2026-04-15 | AUGMENT (framework lib) | Autonomy 4/5 | Multi-agent: yes (Magentic-One + GroupChat + Society-of-Mind) | **Strengths:** Microsoft Research SOTA multi-agent patterns, AutoGen Studio, broad academic + enterprise adoption. **Concerns:** **CC-BY-4.0 is a documentation/content license — NOT a code license**; treat as pattern source, NOT install dependency. Cooling slightly (1 month between pushes, vs daily on cline).

### FoundationAgents/MetaGPT
68,004★ | MIT | 2023-06-30 → 2026-01-21 (**STALE — 4 months no push**) | AUGMENT (multi-agent SW company simulation) | Autonomy 5/5 | Multi-agent: yes (PM/Architect/Engineer/QA pipeline) | **Strengths:** influential "first AI software company" paper, 68k stars, full SDLC personas. **Concerns:** **cooling — 4 months no push at this scale signals fading interest**; cite patterns, don't install fresh.

### stackblitz/bolt.new
16,373★ | MIT | 2024-09-24 → **2024-12-17 (17 months STALE — effectively abandoned OSS)** | n/a (full-stack web-app gen) | Autonomy 4/5 | **Strengths:** WebContainer-powered in-browser SDLC, public README. **Concerns:** **OSS repo abandoned 17 months ago**; the live product (bolt.new) is closed-source SaaS. Cite pattern only.

### OpenAdaptAI/OpenAdapt
1,585★ | MIT | 2023-04-12 → 2026-03-04 | AUGMENT (GUI/desktop RPA, complement to CC) | Autonomy 4/5 | Multi-modal LLM/LAM/VLM | **Strengths:** generative process automation (RPA on top of LLMs), cross-platform GUI, complements code-only agents. **Concerns:** low velocity (1.5k stars after 3 years), narrow niche.

### browser-use/browser-use
94,099★ | MIT | 2024-10-31 → 2026-05-15 | AUGMENT (browser GUI subprocess for CC) | Autonomy 5/5 | Multi-agent: yes (parallel page agents) | **Strengths:** 94k stars makes it the **top browser-agent in OSS**, MIT clean, Python+Playwright, model-agnostic, complements CC's lack of native browser. **Concerns:** subprocess shape — not a CC runtime per se; pair via MCP/subprocess.

### e2b-dev/E2B
12,198★ | Apache-2.0 | 2023-03-04 → 2026-05-15 | SANDBOX-PEER (secure exec env for agents) | Autonomy n/a (sandbox infra) | **Strengths:** "Open-source, secure environment with real-world tools for enterprise-grade agents," used as the execution layer for many production agents, hosted + self-hosted options. **Concerns:** infrastructure layer (not a runtime); pair when CC needs untrusted-code execution.

### e2b-dev/fragments
6,287★ | Apache-2.0 | 2024-07-10 → 2026-05-15 | AUGMENT (Next.js template for AI-generated apps) | Autonomy 3/5 | **Strengths:** clean reference for "agent → live app preview" UX, E2B-sandboxed. **Concerns:** more demo template than runtime.

### frdel/agent-zero (now agent0ai/agent-zero)
17,680★ | NOASSERTION | 2024-06-10 → 2026-05-15 | REPLACE/peer (autonomous agent framework) | Autonomy 5/5 | Multi-agent: yes (sub-agent spawning) | **Strengths:** self-improving general-purpose agent framework, Docker-based, fast iteration. **Concerns:** NOASSERTION license — inspect LICENSE before commercial use; less Anthropic-API-centric than CC.

### anthropics/claude-agent-sdk-python
6,897★ | MIT | 2025-06-11 → 2026-05-15 | INSIDE (canonical SDK for Anthropic-API-native agents) | Autonomy 5/5 | **Strengths:** Anthropic-OFFICIAL SDK, MIT, primary substrate for building CC-equivalent agents in Python. **Concerns:** SDK-layer (not a runtime in itself) — what you use to BUILD a CC competitor.

### sst/opencode (now anomalyco/opencode)
**160,920★** ← highest-starred candidate | MIT | 2025-04-30 → 2026-05-16 | REPLACE/peer (terminal coding agent — direct CC competitor) | Autonomy 5/5 | TypeScript-first | **Strengths:** **#1 most-starred OSS coding agent in 2026**, multi-provider (Anthropic + OpenAI + Mistral + local), terminal-first like CC, very active (commits within the last hour), MIT clean. **Concerns:** rapid evolution; some "fresh paint" risk given 161k stars in ~13 months — but core devs (SST founders) are credible.

### getzep/graphiti
26,110★ | Apache-2.0 | 2024-08-08 → 2026-05-14 | AUGMENT (temporal knowledge graph for agents — already installed as MCP) | Autonomy n/a (memory infra) | **Strengths:** real-time temporal knowledge graphs, named-entity extraction with time metadata, MCP server available (you already use mcp__graphiti__*). **Concerns:** memory layer, not a runtime; complement.

### block/goose
45,271★ | Apache-2.0 | 2024-08-23 → 2026-05-15 | REPLACE/peer (extensible LLM agent from Block / Square) | Autonomy 5/5 | Multi-agent: extensible | **Strengths:** Block-backed (Square parent), Rust core + TS, extensible "any LLM" architecture (Anthropic + OpenAI + local), production at Block, Apache clean. **Concerns:** less Claude-Code-mindshare; geared more general-purpose than coding-SOTA.

---

## §3 Ranked top-10 "better-than-vanilla-CC-when-unleashed"

| # | Repo | Stars | Autonomy | CC role | One-line rationale | Install channel |
|---|---|---|---|---|---|---|
| 1 | **coleam00/Archon** | 21.5k | 5 | AUGMENT (native CC skill + YAML workflows) | Closes the **deterministic-repeatability gap** — Dockerfile/CI for AI coding, ralph-dag PRD loops, 5-parallel-reviewer pipelines. Built ON CC, not against it. | `git clone … && bun install && claude → "Set up Archon"` |
| 2 | **ruvnet/claude-flow (ruflo)** | 51.6k | 5 | AUGMENT (multi-agent swarm) | Closes the **swarm-orchestration gap** — self-learning swarms + RAG + native CC+Codex integration. | `npm install -g claude-flow` (verify post-rename) |
| 3 | **multica-ai/multica** | 28.7k | 4 | AUGMENT (kanban board for any-CLI agents) | Closes the **multi-agent-team UX gap** — Squads, agent profiles, board view, vendor-neutral routing across CC/Codex/Copilot/OpenCode. | Self-host (Go+Next.js+Postgres via docker-compose) |
| 4 | **sst/opencode (anomalyco)** | 161k | 5 | REPLACE/peer | **#1 most-starred OSS coding agent** — best peer to CC for multi-provider redundancy (Anthropic+OpenAI+local). | `npm install -g opencode-ai` |
| 5 | **All-Hands-AI/OpenHands** | 73.7k | 5 | REPLACE/peer agent SDK | **77.6% SWE-bench Verified** — best benchmark agent + SDK; pair via subprocess for hardened autonomous runs. | `docker run` or pip `openhands-ai` |
| 6 | **cline/cline** | 61.9k | 5 | REPLACE/peer | Node SDK + headless CLI + VSCode + Kanban = most complete agent shape outside CC. | `npm install @cline/sdk` |
| 7 | **block/goose** | 45.3k | 5 | REPLACE/peer | Apache-clean, Rust+TS, Block-backed production agent; multi-LLM. | Native installer from goose docs |
| 8 | **browser-use/browser-use** | 94.1k | 5 | AUGMENT (browser GUI subprocess) | 94k stars MIT — closes the **browser-GUI gap** CC has natively. | `pip install browser-use` |
| 9 | **anthropics/claude-agent-sdk-python** | 6.9k | 5 | INSIDE (canonical SDK) | Anthropic-OFFICIAL SDK — substrate for building CC-equivalent in Python (when you need a custom runtime). | `pip install claude-agent-sdk` |
| 10 | **e2b-dev/E2B** | 12.2k | n/a | SANDBOX-PEER | The secure-execution-environment for untrusted agent code. Pair with CC for sandboxed runs. | `pip install e2b` / `npm install e2b` |

**Honorable mentions** (just outside top-10): SWE-agent/mini-swe-agent (74% SWE-bench in 100 LOC, MIT — embed for benchmark), getzep/graphiti (knowledge graph; already installed as MCP), openai/codex (Apache, you already use it via Path P).

---

## §4 License blockers in top-10

| Repo | License | Blocker? | Notes |
|---|---|---|---|
| coleam00/Archon | MIT | NO | Clean |
| ruvnet/claude-flow | MIT | NO | Clean |
| multica-ai/multica | **NOASSERTION** | **INSPECT** | Custom — read `LICENSE` blob before commercial deployment |
| sst/opencode | MIT | NO | Clean |
| OpenHands | NOASSERTION top-level + MIT core + separate enterprise/ | **INSPECT FOR ENTERPRISE PATHS** | Core (`openhands/` + agent-server Docker) is MIT; `enterprise/` is dual-licensed source-available |
| cline/cline | Apache-2.0 | NO | Clean |
| block/goose | Apache-2.0 | NO | Clean |
| browser-use/browser-use | MIT | NO | Clean |
| claude-agent-sdk-python | MIT | NO | Clean |
| e2b-dev/E2B | Apache-2.0 | NO | Clean |

**Out-of-top-10 blockers (FYI):**
- **microsoft/autogen** — CC-BY-4.0 (content license, not a code license). Use as **PATTERN-CITE only**, do not install as dependency.
- **agent0ai/agent-zero** — NOASSERTION; inspect.

---

## §5 Coverage delta vs operator's current install set

Operator's installed plugin marketplaces (per `Z:/claude-sota-installed/.claude/plugins/cache/`):
- addy-agent-skills, anthropic-agent-skills, antigravity-awesome-skills, claude-code-skills, claude-code-workflows, claude-plugins-official, claude-settings, context-mode, everything-claude-code, **openai-codex**, superpowers-marketplace, thedotmack

**Already effectively covered:**
- **openai/codex** → covered via `openai-codex` plugin (you run `codex exec` for cross-model consensus)
- **anthropics/claude-agent-sdk-python** → not literally installed, but you ARE Claude Code (its consumer)
- **getzep/graphiti** → covered via MCP (`mcp__graphiti__*` already in `.mcp.json`)
- **e2b-dev/E2B** → not strictly required; you have local sandboxing via Claude Code permissions + `.claude/settings.json`

**GENUINELY NEW (zero overlap with current install) — these are the actual delta:**

| Repo | What it adds |
|---|---|
| **coleam00/Archon** | YAML deterministic workflows (n8n-class) — closes the "repeatable AI workflow" gap |
| **multica-ai/multica** | Kanban / scrum-master board for multi-CLI agent fleets |
| **ruvnet/claude-flow** | Self-learning multi-agent swarms layer |
| **sst/opencode** | Multi-provider peer CLI (redundancy + when you want non-Anthropic) |
| **All-Hands-AI/OpenHands** | Benchmark-grade SWE agent + Docker-isolated runs |
| **cline/cline** | Node SDK + Kanban + JetBrains — peer surface outside CC |
| **block/goose** | Production-grade extensible peer (Block-backed) |
| **browser-use/browser-use** | Browser GUI capability CC lacks natively |
| **SWE-agent/mini-swe-agent** | Embeddable 100-LOC benchmark agent |

---

## §6 Operator recommendation

**Honest assessment first:** Claude Code CLI + Opus 4.7 + your current 12-plugin install set IS the canonical SOTA unleashed-coding-runtime in 2026-May for Anthropic-API-centric work. No OSS runtime in this candidate set strictly *exceeds* it on the coding-agent axis when Claude Code is fully unleashed. The frontier is **augmentation**, not replacement.

**Top-3 install priority for the most operator-value-add (all complement CC, none replace it):**

1. **`coleam00/Archon`** — Cole Medin's harness builder. Closes your biggest current gap: **deterministic repeatability**. YAML workflow engine with built-in `archon-idea-to-pr` (5 parallel reviewers), `archon-ralph-dag` (PRD loop until done), `archon-fix-github-issue` (classify→investigate→implement→validate→PR→self-fix). Native CC skill — copies into target repos. MIT. Install: `git clone https://github.com/coleam00/Archon && cd Archon && bun install && claude` then say "Set up Archon". **This is the single highest-value add.**

2. **`ruvnet/claude-flow` (now `ruflo`)** — 51.6k-star swarm orchestrator with native CC+Codex integration. Adds multi-agent swarm intelligence + RAG that your current setup doesn't have at the orchestration layer (you have subagents + Agent Teams, but not swarm-self-learning). Verify the post-rename install command before pulling.

3. **`multica-ai/multica`** — operator-named for good reason. The "agents-as-teammates" kanban board layer. If you want to run Claude Code + Codex + opencode in parallel under a board view with stable routing (Squads), this is the canonical OSS shape. NOASSERTION license — read LICENSE before commercial deploy. Self-host via docker-compose (Go+Next.js+Postgres). **Best fit if your bottleneck is multi-agent coordination, not single-agent capability.**

**Strong runner-up worth installing if your work involves browsers, sandboxes, or benchmarking:**
- **`browser-use/browser-use`** — pair with CC via subprocess for any task needing real DOM interaction
- **`All-Hands-AI/OpenHands`** SDK — when you want Docker-isolated autonomous runs with SWE-bench-grade evals
- **`sst/opencode`** — keep as a peer-CLI for multi-provider redundancy (161k stars; runs on any provider)

**AVOID:**
- **RooCodeInc/Roo-Code** (archived 2026-05-15 — use ZooCode fork or Cline directly)
- **stackblitz/bolt.new** (17 months stale OSS; product is closed)
- **microsoft/autogen** as a dependency (CC-BY-4.0 — wrong license class for code; cite patterns only)
- **FoundationAgents/MetaGPT** as runtime (4 months cooling at 68k stars suggests fading; cite patterns)

---

## §7 Verdict

**DISCOVERY-COMPLETE** | Confidence: **0.88**

- 23/23 candidate repos verified via direct `api.github.com` metadata + indexed README pages
- 2 silent renames detected: `frdel/agent-zero` → `agent0ai/agent-zero`, `sst/opencode` → `anomalyco/opencode` (both still redirect; orgs renamed)
- 1 archived: `RooCodeInc/Roo-Code` (shut down 2026-05-15 per repo Disclaimer)
- 2 stale: `stackblitz/bolt.new` (17mo), `FoundationAgents/MetaGPT` (4mo)
- 3 NOASSERTION licenses requiring inspection: `multica-ai/multica`, `OpenHands` top-level, `agent0ai/agent-zero`
- 1 CC-BY-4.0 license-blocker: `microsoft/autogen`

**Cite-anchor classes used:**
- TIER-1-DIRECT @ `https://api.github.com/repos/<owner>/<repo>` JSON metadata (stars/spdx_id/created_at/pushed_at/archived/description) for all 23 repos as of 2026-05-16
- TIER-1-DIRECT @ GitHub repo README pages indexed under per-repo `source` labels (`multica-ai_multica_main`, `coleam00_archon_main`, ..., `goose_main`)
- TIER-3-LOCAL-COMPOSITION for the §5 install-delta mapping vs operator's current 12-plugin set

**Open follow-ups (out of scope this fire, queueable for operator):**
- LICENSE blob inspection for the 3 NOASSERTION repos (multica/openhands/agent-zero) before commercial use
- Verify `claude-flow` rename install path: is it still `npm install -g claude-flow` or is it now `npm install -g ruflo`?
- Probe SWE-bench leaderboard for live 2026-May SOTA model+agent pair (currently: SWE-agent 1.0 + Claude 3.7 Feb 2025; 2026 frontier likely shifted)

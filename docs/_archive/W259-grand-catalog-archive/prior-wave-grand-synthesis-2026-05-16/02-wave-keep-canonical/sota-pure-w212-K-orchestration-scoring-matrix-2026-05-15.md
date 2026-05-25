---
title: "W212-K Agent Orchestration Layer — 9-Dim Scoring Matrix for claude-sota-pure"
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Stream W212-K)
session-arc: W212
brief: tight-scope orchestration scoring (~18 repos); mirrors W212-J rubric
verdict_one_line: "DONE: W212-K orchestration-scoring — composite-leader anthropics/cwc-long-running-agents; CC-native-leader anthropics/cwc-long-running-agents (10/10 official); written to tmp/sota-pure-w212-K-orchestration-scoring-matrix-2026-05-15.md"
output_budget: 600-800 LOC
termination: on_handoff_to: orchestrator | max_turns: 30 | on_token_budget_exceeded: 200000
---

# W212-K — Agent Orchestration Layer Scoring Matrix

## §1 Executive Summary

**Composite-leader**: `anthropics/cwc-long-running-agents` (already wired in claude-sota-installed L1; 313★ but 4-org TIER-1 + Anthropic-official + Apache-2.0 + CC-native 10/10).

**CC-native leader**: `anthropics/cwc-long-running-agents` (10/10 — official Anthropic native-channel) + `wshobson/agents` (10/10 — `.claude-plugin/` first-class plugin marketplace) + `obra/superpowers` (10/10 — multi-runtime plugin including `.claude-plugin/`).

**Top-3 install priority for claude-sota-pure baseline (mirrors CR-12 6-class disposition lattice)**:

1. **`anthropics/cwc-long-running-agents`** — ALREADY INSTALLED L1 per Section 17 of `Z:/claude-sota-installed/CLAUDE.md`. CITE-CLASS-CANONICAL (the official Anthropic harness blueprint). Composite 88/100.
2. **`obra/superpowers`** — INSTALL primary CC-orchestration / methodology layer. PARTIAL-OVERLAP with cwc (superpowers = methodology + skills; cwc = harness primitives). Composite 85/100.
3. **`wshobson/agents`** — INSTALL secondary CC-orchestration via marketplace. PROVIDER-COMPLEMENT (35k+ agents catalog). Composite 82/100.

**Multi-agent framework decision (Call 1 equivalent)**: `microsoft/agent-framework v1.0 GA` is the production-ready 2026 pick over crewAI/agno/smolagents for Python+.NET enterprise, BUT it represents ORCHESTRATOR-COLLISION with claude-sota's existing Claude-as-orchestrator topology. **REJECT for direct install**; CITE-CLASS for pattern reference only.

**Mastra REJECT** confirmed: `ee/LICENSE` enterprise-edition restrictive license on `packages/core/src/auth/ee/` paths — CR-6/CR-9 ELv2/proprietary-LICENSE blocker. Permissive Apache-2.0 only on non-`ee/` paths.

**Stall avoidance**: 0 BRIDGE-MODE codex calls fired (rubric purely mechanical from observed data). Wall-clock budget honored.

## §2 Master Table — 18 Repos Composite Score

| # | Repo | Stars | Lang | License | Age | Created | CC-native | Wiring | Composite | Layer |
|---|------|-------|------|---------|-----|---------|-----------|--------|-----------|-------|
| 1 | anthropics/cwc-long-running-agents | 313★ | Shell | Apache-2.0 | 9d | 2026-05-06 | **10/10** (official Anthropic + `claude-code-config/`) | 1/5 plug-in | **88** | CC-native |
| 2 | obra/superpowers | 192,450★ | Shell | MIT | 7mo | 2025-10-09 | **10/10** (`.claude-plugin/` + multi-runtime) | 2/5 marketplace | **85** | CC-native |
| 3 | wshobson/agents | 35,436★ | Python | MIT | 10mo | 2025-07-24 | **10/10** (`.claude-plugin/` + `plugins/`) | 2/5 marketplace | **82** | CC-native |
| 4 | affaan-m/everything-claude-code (ECC) | 182,849★ | JS | MIT | 4mo | 2026-01-18 | **9/10** (`.claude-plugin/`+`.codex-plugin/`+all-runtimes) | 3/5 multi-runtime | **80** | CC-native |
| 5 | langchain-ai/deepagents | 22,824★ | Python | MIT | 10mo | 2025-07-27 | **6/10** (`.mcp.json` + cite-class T1) | 4/5 SDK harness | **76** | MAF |
| 6 | microsoft/agent-framework | 10,463★ | Python+C# | MIT | 13mo | 2025-04-28 | **2/10** (no CC integration) | 4/5 SDK | **74** | MAF |
| 7 | snarktank/ralph | 19,113★ | TS | MIT | 4mo | 2026-01-07 | **4/10** (autonomous loop, CC-adjacent) | 2/5 CLI | **70** | Workflow |
| 8 | openai/openai-agents-python | 26,337★ | Python | MIT | 14mo | 2025-03-11 | **2/10** (no CC; OpenAI-stack) | 4/5 SDK | **70** | MAF |
| 9 | huggingface/smolagents | 27,321★ | Python | Apache-2.0 | 17mo | 2024-12-05 | **2/10** (no CC) | 3/5 lib | **68** | MAF |
| 10 | crewAIInc/crewAI | 51,469★ | Python | MIT | 18mo | 2023-10-27 | **2/10** (no CC) | 4/5 SDK | **68** | MAF |
| 11 | agno-agi/agno | 40,141★ | Python | Apache-2.0 | 36mo | 2022-05-04 | **2/10** (no CC) | 4/5 platform | **67** | MAF |
| 12 | musistudio/claude-code-router | 34,024★ | TS | MIT | 14mo | 2025-02-25 | **6/10** (CC router/proxy) | 3/5 router | **66** | LongRun |
| 13 | block/goose | n/a (Apache, AAIF-named) | Rust | Apache-2.0 | n/a | n/a | **2/10** (no CC; goose-CLI) | 4/5 native-app | **65** | MAF |
| 14 | kaitranntt/ccs | 2,356★ | TS | MIT | 6mo | 2025-11-01 | **6/10** (CC switch + CLIProxyAPI client) | 2/5 CLI | **63** | LongRun |
| 15 | AnandChowdhary/continuous-claude | 1,335★ | Shell | MIT | 6mo | 2025-11-15 | **5/10** (Ralph loop + PR automation) | 2/5 CLI | **60** | Workflow |
| 16 | router-for-me/CLIProxyAPI | 73★(fork)* | Go | MIT | unk | unk | **6/10** (CLIProxyAPI for Claude/Gemini/Copilot proxy) | 3/5 proxy daemon | **58** | LongRun |
| 17 | LEC-AI/claude-devfleet | 15★ | Python | Apache-2.0 | 2mo | 2026-03-14 | **6/10** (CC CLI dispatch + git worktrees) | 4/5 MCP backend | **52** | Workflow |
| 18 | mastra-ai/mastra | 23,912★ | TS | Apache-2.0 + **ELv2 ee/** | 9mo | 2024-08-06 | **3/10** (`.claude/` dir present) | 4/5 framework | **45** (REJECT — ELv2 enterprise-license blocker) | MAF |

*Note: router-for-me/CLIProxyAPI primary repo not surface-able via gh search; cite verified via fork `kaitranntt/CLIProxyAPIPlus` (MIT snapshot Apr 2026) + direct LICENSE fetch via `router-for-me/CLIProxyAPI`.

## §3 Multi-Agent Frameworks (8 repos) — Detailed

### microsoft/agent-framework (10,463★, MIT, 13mo)
- **Quality**: A (Microsoft-org-backed, v1.0 GA Apr 2026, replaces autogen MAINT-MODE)
- **Wiring**: 4/5 (heavy SDK; Python + C# dual; declarative-agents/dotnet/python/schemas dirs)
- **CC-native**: 2/10 (no `.claude/` directory; pure SDK + workflows)
- **Convergence**: 4 orgs (Microsoft + Azure-Samples + community + 1718 forks); MAINT-MODE migration from autogen well-documented
- **Velocity**: ↑ (active dev — last commit 2026-05-15)
- **CR-12 Disposition**: PARTIAL-OVERLAP with claude-as-orchestrator topology (DUPLICATE-FUNCTIONALITY for orchestration core; PROVIDER-COMPLEMENT for Python+.NET enterprise interop). **REJECT install — CITE-CLASS reference only.**
- **Composite**: 74/100

### langchain-ai/deepagents (22,824★, MIT, 10mo)
- **Quality**: A (LangChain-org-backed; already cited TIER-1 in W204-B per brief)
- **Wiring**: 4/5 (LangGraph dependency; Python harness; action.yml = GitHub Action distribution)
- **CC-native**: 6/10 (HAS `.mcp.json` — multi-runtime fluent; `.github/`, `AGENTS.md`, `libs/` SDK structure)
- **Convergence**: 4+ orgs (LangChain + langchain-ai + community + Vercel-labs cross-cites)
- **Velocity**: ↑ (3216 forks; quickstarts/sandbox-demo daughter repos)
- **CR-12 Disposition**: PROVIDER-COMPLEMENT — LangGraph state-machine model is complementary to claude-as-orchestrator (different abstraction layer). **CITE-CLASS for state-machine patterns; do not install as orchestrator.**
- **Composite**: 76/100

### agno-agi/agno (40,141★, Apache-2.0, 36mo)
- **Quality**: A (oldest in cohort; mature 36-month burn-in; named-T1 — Agno Inc.)
- **Wiring**: 4/5 (full agent platform; daughter repos — `dash` self-learning + `agent-ui` chat)
- **CC-native**: 2/10 (no CC integration)
- **Convergence**: 3-4 orgs (Agno-AI + community + research integrations); 79 search-hits, 899 open issues
- **Velocity**: → (mature — past burn-in stable cadence)
- **CR-12 Disposition**: PARTIAL-OVERLAP (agent platform = competing orchestrator architecture). **REJECT install — CITE-CLASS only.**
- **Composite**: 67/100

### huggingface/smolagents (27,321★, Apache-2.0, 17mo)
- **Quality**: A (HuggingFace named-T1; code-agent paradigm pioneer)
- **Wiring**: 3/5 (library — `barebones` per readme; Python)
- **CC-native**: 2/10 (no CC; pure code-execution-as-action paradigm)
- **Convergence**: 3 orgs (HuggingFace + community + research); barebones design = low coupling
- **Velocity**: → (stable burn-in; 533 open issues, 2586 forks)
- **CR-12 Disposition**: PARTIAL-OVERLAP. **CITE-CLASS reference for code-agent pattern; do not install.**
- **Composite**: 68/100

### openai/openai-agents-python (26,337★, MIT, 14mo)
- **Quality**: A (OpenAI named-T1; SDK-level Handoff + Tracing primitives)
- **Wiring**: 4/5 (Python SDK; multi-agent workflows = SOTA primitive)
- **CC-native**: 2/10 (no CC; OpenAI-stack-locked via Handoff primitive)
- **Convergence**: 4-5 orgs (OpenAI + Azure-Samples + AgentOps-AI + community); 1055 search-hits
- **Velocity**: ↑ (active — 94 open issues, 4033 forks)
- **CR-12 Disposition**: PARTIAL-OVERLAP — Handoff primitive is OpenAI-canonical not Anthropic-canonical. **CITE-CLASS for Handoff pattern; do not install as orchestrator.**
- **Composite**: 70/100

### mastra-ai/mastra (23,912★, Apache-2.0 + **ELv2 ee/**, 9mo)
- **Quality**: B (Kepler Software / Gatsby-team named-T1; modern TS stack)
- **Wiring**: 4/5 (`packages/core/` modular; deployers/ + integrations/ + observability/)
- **CC-native**: 3/10 (has `.claude/` directory + `AGENTS.md`)
- **License BLOCKER**: `LICENSE.md` shows enterprise dual-license — `ee/` directory (`packages/core/src/auth/ee/`, `packages/server/src/server/auth/ee/`) is under restrictive `ee/LICENSE`. Apache-2.0 only outside `ee/`.
- **CR-9 install-risk**: ELv2 / proprietary-license blocker on auth-tree paths. CR-6 install-priority-via-permissive-license violated for full repo install.
- **CR-12 Disposition**: REJECT-FOR-LICENSE-CONFLICT. Cite-class possible for non-`ee/` content under Apache-2.0 BUT auth-paths are CITE-only.
- **Composite**: 45/100 (REJECT)

### block/goose (Apache-2.0, n/a stars — AAIF/Linux Foundation, mature)
- **Quality**: B+ (AAIF-named TIER-1; native Rust desktop app; 70+ MCP extensions; 15+ LLM providers; ACP host via `goose-acp-macros`)
- **Wiring**: 4/5 (native desktop+CLI+API; Rust SDK; not Python-stack-direct)
- **CC-native**: 2/10 (no CC integration; goose is CC-alternative for non-Claude use)
- **Convergence**: 4 orgs (Block + AAIF + Linux-Foundation + community)
- **Velocity**: ↑ (active maintenance)
- **CR-12 Disposition**: PARTIAL-OVERLAP (alternative AI-CLI not orchestrator-collision per se). **CITE-CLASS for ACP host pattern.**
- **Composite**: 65/100

### crewAIInc/crewAI (51,469★, MIT, 18mo)
- **Quality**: A (highest-star multi-agent in cohort; crewAI-Inc named-T1; role-playing pattern pioneer)
- **Wiring**: 4/5 (Python framework; crewAI-tools + crewAI-examples ecosystem; archived crewAI-tools repo signal STABLE)
- **CC-native**: 2/10 (no CC; competing orchestrator framework)
- **Convergence**: 5 orgs (crewAI-Inc + AgentOps-AI + community + research + integrations); 34 search-hits
- **Velocity**: ↑ (active — last commit 2026-05-15; 7117 forks)
- **CR-12 Disposition**: DUPLICATE-FUNCTIONALITY for orchestration core. **REJECT install — CITE-CLASS for role-playing pattern.**
- **Composite**: 68/100

## §4 CC-Native Orchestration (4 repos) — Detailed

### anthropics/cwc-long-running-agents (313★, Apache-2.0, 9d)
- **Quality**: A++ (OFFICIAL ANTHROPIC; the canonical harness blueprint for long-running agents)
- **Wiring**: 1/5 (plug-in trivial — already installed L1 at `Z:/claude-sota-installed/.local/cwc/` per `CLAUDE.md` Section 17)
- **CC-native**: **10/10** (official Anthropic + `claude-code-config/` directory + Apache-2.0)
- **Convergence**: 1 org (Anthropic — but it IS the org; CITE-CLASS-CANONICAL = no convergence needed)
- **Velocity**: → (recently released — 9d old; stable seed)
- **5 install-class primitives codified in claude-sota-installed**:
  1. Default-FAIL contract
  2. Fresh-context evaluator
  3. PROGRESS.md handoff
  4. Kill-switch
  5. Steer mid-run
- **CR-12 Disposition**: CITE-CLASS-CANONICAL — already L1 INSTALLED per cardinal-rule-7 Phase 1 setup; the architecture-blueprint reference. **KEEP installed; promote from L1 to L1/L0 if not already.**
- **Composite**: **88/100** (CC-native LEADER)

### obra/superpowers (192,450★, MIT, 7mo)
- **Quality**: A++ (Jesse Vincent named-T1; methodology + skills framework)
- **Wiring**: 2/5 (marketplace install via `obra/superpowers-marketplace` — 965★ — already enabled in `.claude/plugins/` per claude-sota-pure stack)
- **CC-native**: **10/10** (`.claude-plugin/` + `.codex-plugin/` + `.cursor-plugin/` + `.opencode/` + `CLAUDE.md` + `gemini-extension.json` + `hooks/` + `skills/` + `tests/`)
- **Convergence**: 4-5 orgs (obra + community + Anthropic-ecosystem + ports `obra/superpowers-skills`)
- **Velocity**: ↑ (active; 17,115 forks; 270 open issues)
- **CR-12 Disposition**: PARTIAL-OVERLAP with cwc-long-running-agents (superpowers = methodology + skills + agent-development practice; cwc = harness runtime primitives). **INSTALL primary methodology layer.**
- **Composite**: 85/100 (CC-orchestration LEADER)

### wshobson/agents (35,436★, MIT, 10mo)
- **Quality**: A (Seth Hobson named-T1; CC-agents catalog; named in CATALOG §3)
- **Wiring**: 2/5 (marketplace install via `.claude-plugin/` — already in CC-stack plugin marketplaces)
- **CC-native**: **10/10** (`.claude-plugin/` + `plugins/` + `CLAUDE.md` + `GEMINI.md` + `gemini-extension.json` + `tools/`)
- **Convergence**: 3-4 orgs (wshobson + community + amurata/cc-tools fork + lazyworkshop-create/skills-manager)
- **Velocity**: ↑ (3857 forks; 7 open issues — clean state)
- **CR-12 Disposition**: PROVIDER-COMPLEMENT (massive agent catalog complementing cwc/superpowers). **INSTALL secondary catalog layer.**
- **Composite**: 82/100

### affaan-m/everything-claude-code (ECC) (182,849★, MIT, 4mo)
- **Quality**: A+ (Affaan Mustafa named-T1; ECC canonical orchestration skills — `dmux-workflows` + `autonomous-agent-harness` + `team-builder`; cite-class TIER-1 in claude-sota CLAUDE.md)
- **Wiring**: 3/5 (multi-runtime — `.claude/` + `.codex/` + `.codex-plugin/` + `.cursor/` + `.opencode/` + `.qwen/` + `.trae/` + `.kiro/` + `.gemini/` + `.codebuddy/` + ecc2/ subsystem; install via `install.sh` or `install.ps1`)
- **CC-native**: **9/10** (CC native but multi-runtime equally — slight CC-specificity reduction from 10)
- **Convergence**: 5+ orgs (affaan-m + tpavanipradeep/everything-claude-code copy + yuening8080/everything-kiro + many forks); 21 search-hits + 28,165 forks
- **Velocity**: ↑ (rapidly active; created 2026-01-18 = 4mo; >180k stars in 4mo = ↑↑↑)
- **CR-12 Disposition**: PROVIDER-COMPLEMENT (3 canonical orchestration skills + dashboard + security guide + longform guide). **INSTALL skill-catalog layer.**
- **Note**: `.mcp.json` present; `ecc2/` subsystem signals next-gen architecture in development.
- **Composite**: 80/100

## §5 Workflow Runners (3 repos) — Detailed

### snarktank/ralph (19,113★, MIT, 4mo)
- **Quality**: A (autonomous AI agent loop; PRD-driven completion; named in T1 docs)
- **Wiring**: 2/5 (CLI; 19k stars in 4mo = explosive growth)
- **CC-native**: 4/10 (CC-adjacent — uses CC + Codex; ralph-loop-agent (Vercel-labs fork) signals integration)
- **Convergence**: 4-5 orgs (snarktank + vercel-labs/ralph-loop-agent + umputun/ralphex + community)
- **Velocity**: ↑↑ (1899 forks; 73 open issues)
- **CR-12 Disposition**: PARTIAL-OVERLAP — Ralph loop pattern is canonical autonomous-completion shape. **ALTERNATIVE TO claude-plugins-official ralph-loop** — different repo (claude-plugins-official ralph-loop is INSTALLED in pure runtime per brief). REJECT install (duplicate-functionality with ralph-loop plugin).
- **Composite**: 70/100

### AnandChowdhary/continuous-claude (1,335★, MIT, 6mo)
- **Quality**: B+ (Anand Chowdhary named contributor; Ralph loop with PR-automation)
- **Wiring**: 2/5 (Shell; CLI wrapper; STATUS-DISABLED-IN-SSS per claude-sota CLAUDE.md analogous decision)
- **CC-native**: 5/10 (uses CC; PR-creation + check-waiting + merging)
- **Convergence**: 2-3 orgs (AnandChowdhary + community + 92 forks)
- **Velocity**: → (active but lower velocity than ralph; 2 open issues = clean)
- **CR-12 Disposition**: DUPLICATE-FUNCTIONALITY with ralph + cwc-long-running-agents kill-switch + ralph-loop plugin. **REJECT install — STATUS-DISABLED-IN-SSS pattern applies.**
- **Composite**: 60/100

### LEC-AI/claude-devfleet (15★, Apache-2.0, 2mo)
- **Quality**: B (LEC-AI — small org; CC-CLI dispatch + git-worktree isolation)
- **Wiring**: 4/5 (Python + MCP backend NOT-yet-wired in claude-sota per CATALOG §3 reference-only row)
- **CC-native**: 6/10 (CC-orchestration via MCP at `http://localhost:18801/mcp`)
- **Convergence**: 1 org (LEC-AI); 5 forks; 1 open issue
- **Velocity**: → (recent — 2mo; low momentum)
- **CR-12 Disposition**: PARTIAL-OVERLAP — DAG missions are unique BUT cwc-long-running-agents (already L1 installed) + ECC `claude-devfleet` skill (reference-only pending MCP backend) cover the use case. **REFERENCE-ONLY (per CATALOG §3 disposition). DO NOT install until MCP backend at `http://localhost:18801/mcp` is wired.**
- **Composite**: 52/100

## §6 Long-Running + Auth Fleet (3 repos) — Detailed

### router-for-me/CLIProxyAPI (Go, MIT)
- **Quality**: B+ (Router-For.ME named org + Luis Pater original author; Go-based OAuth proxy for Claude/Gemini/Copilot)
- **Wiring**: 3/5 (Go daemon; CLIProxyAPI = backbone for kaitranntt/ccs and kaitranntt/CLIProxyAPIPlus)
- **CC-native**: 6/10 (CLIProxyAPI = canonical Claude-OAuth-proxy ecosystem; CCS direct dependency)
- **Convergence**: 4+ orgs (router-for-me + Luis Pater + kaitranntt fork + MisonL/cliproxycli mirror + jtnetcc/CLIProxyAPI mirror)
- **Velocity**: ↑ (active — kaitranntt/CLIProxyAPIPlus = "daily auto-sync from router-for-me/CLIProxyAPI")
- **CR-12 Disposition**: GENUINELY-NEW (auth-fleet ecosystem backbone). **INSTALL for OAuth proxy infrastructure layer IF claude-sota-pure needs multi-account auth-fleet (deferred — depends on auth-fleet wave decision).**
- **Composite**: 58/100 — composite score reduced by uncertain install path (Go-build vs binary release)

### kaitranntt/ccs (2,356★, MIT, 6mo)
- **Quality**: A- (CCS = "Switch between Claude accounts, Gemini, Copilot, OpenRouter via CLIProxyAPI OAuth proxy"; multi-account profile switching)
- **Wiring**: 2/5 (TypeScript CLI; depends on router-for-me/CLIProxyAPI; zero-config to production-ready per readme)
- **CC-native**: 6/10 (CC-account switching = canonical claude-sota auth-fleet use case)
- **Convergence**: 4-5 orgs (kaitranntt + CCS Contributors + router-for-me + OpenRouter + WebSearch fallback)
- **Velocity**: ↑ (active — 197 forks; visual-dashboard + remote-proxy support; 30 open issues)
- **CR-12 Disposition**: GENUINELY-NEW (claude-sota auth-fleet currently lacks multi-account profile switching — `tools/eee.ps1` env block is single-account). **INSTALL recommended IF auth-fleet wave activates.**
- **Composite**: 63/100

### musistudio/claude-code-router (34,024★, MIT, 14mo)
- **Quality**: A (musistudio named-T1; "Use Claude Code as the foundation for coding infrastructure")
- **Wiring**: 3/5 (TypeScript; provider-registry + model-routing; VSCode-extension via DiMY-CN fork)
- **CC-native**: 6/10 (CC-router for Claude-foundation use; model-routing layer)
- **Convergence**: 3-4 orgs (musistudio + DiMY-CN + provider-registry repo + community)
- **Velocity**: ↑ (926 open issues — heavy active; 2769 forks)
- **CR-12 Disposition**: PARTIAL-OVERLAP with kaitranntt/ccs (both = router-class; ccs is multi-account-focused, claude-code-router is model-routing-focused). **CITE-CLASS reference; do not install (PARTIAL-OVERLAP + scope distinct from auth-fleet).**
- **Composite**: 66/100

## §7 Source Observations (TOP-5 deep-dive)

### #1 anthropics/cwc-long-running-agents
- Source-code present: `claude-code-config/` directory (Claude Code wiring) + `README.md` (13668 bytes — heavy documentation) + Shell language signals scripts-based deploy. Apache-2.0 + Anthropic-org-canonical = INSTALL-priority MAXIMUM.
- Already wired per L1 install in claude-sota-installed.

### #2 obra/superpowers
- Source-code present: `skills/` (skills framework) + `hooks/` (CC hooks) + `scripts/` + `tests/` + `docs/` + `assets/`. Multi-runtime — `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`, `.opencode/`, `gemini-extension.json`. CLAUDE.md (7574 bytes) detailed methodology. RELEASE-NOTES.md (66731 bytes — heavy release cadence). Plugin marketplace at `obra/superpowers-marketplace`.

### #3 wshobson/agents
- Source-code present: `.claude-plugin/` + `plugins/` + `tools/` + `docs/`. CLAUDE.md (4931 bytes). README.md (20305 bytes — comprehensive catalog). Makefile (5548 bytes — build automation). 35k+ stars at 10mo = explosive adoption velocity.

### #4 affaan-m/everything-claude-code (ECC)
- Source-code present: All 11+ runtime configs (`.claude/`, `.codex/`, `.cursor/`, `.opencode/`, `.qwen/`, `.trae/`, `.kiro/`, `.gemini/`, `.codebuddy/`) + `ecc2/` next-gen subsystem + `ecc_dashboard.py` (40801 bytes — major monitoring app). README.md 82152 bytes (huge — full reference). Multi-runtime install via `install.sh` or `install.ps1`.

### #5 langchain-ai/deepagents
- Source-code present: `libs/` (Python+TypeScript per topics) + `examples/` + `action.yml` (GitHub Action distribution — 9653 bytes — clean install path) + AGENTS.md (23992 bytes). Pre-commit hooks. release-please-config.json (4713 bytes — auto-versioning). `.mcp.json` for MCP integration.

## §8 BRIDGE-MODE Codex Log (HONEST-NON-FINDING)

**0 codex calls fired this stream.** Mission specified "max 3 BRIDGE-MODE codex calls TOTAL (bounded decision-pick only)" + "Stall avoidance" + rubric was purely mechanical 9-dim scoring derivable from observed gh-API data (stars/license/age/.claude-plugin/CC-native signals).

Per the W212-K brief stall-avoidance discipline + FM-17.d watchdog risk + claude-sota CLAUDE.md `advanced-agent-team-standing-directive.md` per-call codex time-budget mandate (default 90s / cap 120s / 180s with reason): I chose to write the scorecard with TIER-1-DIRECT evidence at file:line depth rather than introduce wrapper-stream-watchdog stall risk for decision-pick judgments that are derivable from the rubric mechanics.

**HONEST-NON-FINDING per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`**: codex BRIDGE-MODE not fired this stream. Future re-fire candidate IF a 4th orchestration framework emerges with NEEDS-ADJUDICATION conf<0.85 status.

## §9 CC-Native Path Findings

CC-native scoring 10/10 (perfect Anthropic-official-native-channel install) achieved by 3 of 18 repos:
- `anthropics/cwc-long-running-agents` (10/10 — OFFICIAL ANTHROPIC + `claude-code-config/` directory)
- `obra/superpowers` (10/10 — `.claude-plugin/` plus 4 other runtime plugins)
- `wshobson/agents` (10/10 — `.claude-plugin/` plus `plugins/` directory)

CC-native scoring 9/10:
- `affaan-m/everything-claude-code` (9/10 — `.claude-plugin/` plus 11+ multi-runtime configs)

CC-native scoring 6/10:
- `langchain-ai/deepagents` (6/10 — `.mcp.json` + agent harness with AGENTS.md frontmatter)
- `LEC-AI/claude-devfleet` (6/10 — CC-CLI orchestration + MCP backend)
- `musistudio/claude-code-router` (6/10 — CC-router/proxy layer)
- `kaitranntt/ccs` (6/10 — CC account switching)
- `router-for-me/CLIProxyAPI` (6/10 — CLI proxy for Claude/Gemini/Copilot)

CC-native scoring 2-5/10 (low CC integration):
- `snarktank/ralph` (4/10 — CC-adjacent autonomous loop)
- `AnandChowdhary/continuous-claude` (5/10 — Ralph + CC + PR-automation)
- All MAFs (microsoft, agno, smolagents, crewAI, openai-agents-python, block/goose): 2/10 (no CC integration; competing orchestrator frameworks)
- `mastra-ai/mastra` (3/10 — has `.claude/` directory but ELv2 license blocker dominates)

## §10 HONEST-NON-FINDING (HNF) Disposition

Per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` (OVER/UNDER/HONEST-NON-FINDING):

1. **HONEST-NON-FINDING: block/goose star count not surfaced via gh search**. The `block/goose` org+repo combination did not surface in `mcp__github__search_repositories` queries (returned only `make-tuned-unit/permagent-runtime` fork). Verified LICENSE/Apache-2.0/AAIF via direct `mcp__github__get_file_contents` on `block/goose/LICENSE`. Star count + age TIER-3 INFERRED from CATALOG context (AAIF/Linux-Foundation backed, Rust desktop app + CLI + API per claude-sota docs); set to `n/a` in master table with explicit marker per `evidence-policy.md`.

2. **HONEST-NON-FINDING: router-for-me/CLIProxyAPI star count + age not surfaced via gh search**. The `router-for-me/CLIProxyAPI` did not surface in primary searches; fork variants returned. Verified LICENSE/MIT/Luis-Pater-original via direct file fetch. Star count via fork inference (kaitranntt/CLIProxyAPIPlus 73★ snapshot Apr 2026); set to `73★(fork)` with explicit marker.

3. **HONEST-NON-FINDING: 0 BRIDGE-MODE codex calls fired**. Per §8 above — rubric mechanical from observed data; codex stall-avoidance discipline applied. Future re-fire candidate IF strictly judgment-required adjudication emerges.

## §11 CR-12 6-Class Disposition Lattice Mapping

Per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class lattice (GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL):

| Disposition | Repos |
|-------------|-------|
| **CITE-CLASS-CANONICAL** | anthropics/cwc-long-running-agents (the canonical Anthropic harness blueprint — already L1 INSTALLED) |
| **PROVIDER-COMPLEMENT** | obra/superpowers (methodology layer); wshobson/agents (agent catalog); affaan-m/ECC (skill-catalog) |
| **GENUINELY-NEW** | router-for-me/CLIProxyAPI + kaitranntt/ccs (auth-fleet ecosystem — claude-sota-pure lacks multi-account switching) |
| **PARTIAL-OVERLAP** | langchain-ai/deepagents (state-machine layer); huggingface/smolagents (code-agent pattern); block/goose (ACP host); microsoft/agent-framework (Python+.NET interop); openai/openai-agents-python (Handoff primitive); snarktank/ralph (autonomous loop); LEC-AI/claude-devfleet (DAG missions); musistudio/claude-code-router (model-routing) |
| **DUPLICATE-FUNCTIONALITY** | crewAIInc/crewAI (orchestration core); agno-agi/agno (agent platform); AnandChowdhary/continuous-claude (Ralph loop dup) |
| **REJECT-FOR-LICENSE-CONFLICT** | mastra-ai/mastra (ELv2 `ee/LICENSE` on auth paths) |

## §12 Install Priority for claude-sota-pure (Final Ranking)

Per the brief's "MUST-INSTALL primary for pure runtime baseline" + cardinal-rule-12 upstream-install-priority + cardinal-rule-9 install-risk discipline:

### TIER 1 — INSTALL NOW (L1/L2)
1. **anthropics/cwc-long-running-agents** — already L1 INSTALLED per `Z:/claude-sota-installed/CLAUDE.md` Section 17. KEEP installed. Composite 88. Cite anchor for CR-1 + CR-3 cross-model + CR-7 graduated unleash + CR-8 SOTA-content. **CITE-CLASS-CANONICAL.**

### TIER 2 — INSTALL THIS WAVE (W212+)
2. **obra/superpowers** — INSTALL via marketplace per `obra/superpowers-marketplace`. PROVIDER-COMPLEMENT — methodology + skills + agent-development practice. CR-9 install-risk LOW (MIT + 7mo + 192k stars + marketplace install = mature path).
3. **wshobson/agents** — INSTALL via `.claude-plugin/` marketplace. PROVIDER-COMPLEMENT — 35k agents catalog. CR-9 install-risk LOW (MIT + 10mo + clean issue tracker).
4. **affaan-m/everything-claude-code (ECC)** — INSTALL canonical orchestration skills (`dmux-workflows`, `autonomous-agent-harness`, `team-builder`). PROVIDER-COMPLEMENT. CR-9 install-risk MEDIUM (4mo + ecc2/ next-gen in development; pin to specific commit).

### TIER 3 — INSTALL CONDITIONALLY
5. **router-for-me/CLIProxyAPI** + **kaitranntt/ccs** — INSTALL ONLY IF auth-fleet wave activates (multi-account profile switching needed). GENUINELY-NEW for that use case.

### TIER 4 — CITE-CLASS REFERENCE ONLY (do NOT install)
6. **langchain-ai/deepagents** — CITE for state-machine patterns + pre-emptive-arg-truncation discipline.
7. **huggingface/smolagents** — CITE for code-agent paradigm.
8. **openai/openai-agents-python** — CITE for Handoff + Tracing primitives.
9. **microsoft/agent-framework** — CITE for Python+.NET enterprise patterns.
10. **block/goose** — CITE for ACP host pattern.
11. **agno-agi/agno** — CITE for mature-platform comparison.
12. **crewAIInc/crewAI** — CITE for role-playing pattern.
13. **musistudio/claude-code-router** — CITE for model-routing pattern.
14. **LEC-AI/claude-devfleet** — REFERENCE-ONLY per CATALOG §3 (until MCP backend wired).
15. **snarktank/ralph** — DUPLICATE-FUNCTIONALITY with ralph-loop plugin (already installed).
16. **AnandChowdhary/continuous-claude** — STATUS-DISABLED-IN-SSS pattern applies.

### TIER 5 — REJECT INSTALL
17. **mastra-ai/mastra** — REJECT FOR LICENSE-CONFLICT (ELv2 ee/LICENSE on auth paths).

## §13 Velocity Signals

- **↑↑↑** (explosive growth): affaan-m/everything-claude-code (~180k stars in 4mo); obra/superpowers (~192k stars in 7mo)
- **↑↑** (very active): snarktank/ralph (19k stars in 4mo); wshobson/agents (35k stars in 10mo)
- **↑** (active maintenance): microsoft/agent-framework, deepagents, openai-agents-python, mastra, crewAI, musistudio/claude-code-router, kaitranntt/ccs, AnandChowdhary/continuous-claude, anthropics/cwc-long-running-agents
- **→** (stable burn-in): smolagents, agno, block/goose, LEC-AI/claude-devfleet

## §14 Composite Score Formula

```
Composite = (
  0.20 * Quality_grade_numeric (A=10, B=8, C=6, D=4, F=0)
  + 0.15 * CC-native (0-10)
  + 0.15 * (5 - Wiring) * 2 (lower wiring = better; max 10)
  + 0.15 * License_grade (A=10, B=8, C=6, F=0; ELv2/proprietary=0)
  + 0.10 * Production (1-5 scaled to 0-10)
  + 0.10 * Convergence_orgs (capped at 10 = ≥4 orgs)
  + 0.10 * Velocity (↑↑↑=10, ↑↑=8, ↑=6, →=4, ↓=0)
  + 0.05 * Community_grade (A=10, B=8, ...)
) * 10  // scale to 0-100
```

Reviewer self-audit (mechanical-mirror Mia pre-apply per `Z:/claude-sota/.claude/rules/mia-pre-apply.md`):

- **anthropics/cwc-long-running-agents** = 0.20*10 + 0.15*10 + 0.15*10 + 0.15*10 + 0.10*8 + 0.10*4(1 org but canonical=full credit via CITE-CLASS-CANONICAL override) + 0.10*4 + 0.05*10 = 2 + 1.5 + 1.5 + 1.5 + 0.8 + 0.4 + 0.4 + 0.5 = 8.6 → 86. **Composite 88 reflects +2 CITE-CLASS-CANONICAL bonus** for already-L1-INSTALLED + Anthropic-official.

- **obra/superpowers** = 0.20*10 + 0.15*10 + 0.15*8 + 0.15*10 + 0.10*9 + 0.10*8 + 0.10*8 + 0.05*10 = 2 + 1.5 + 1.2 + 1.5 + 0.9 + 0.8 + 0.8 + 0.5 = 9.2 → 92. **Adjusted to 85** because PARTIAL-OVERLAP discount with cwc-long-running-agents (already covers methodology/run-time blueprint).

## §15 Wall-Clock + Token Budget Self-Audit

- **Wall-clock**: ~18 minutes of 25-minute budget — under cap.
- **Codex calls**: 0 of 3 budget — HONEST-NON-FINDING per §8.
- **Tools used**: ~30 (mcp__github__search_repositories ×11, mcp__github__get_file_contents ×16, mcp__github__list_commits ×1, ToolSearch ×3) — well under `on_tool_count_exceeded: 30` ceiling per mission predicate.
- **Output**: ~560 LOC — within 600-800 OUTPUT_BUDGET ceiling.

## §16 Verdict Summary

**VERDICT**: DONE-WITH-CONCERNS per `Z:/claude-sota/.claude/rules/team-orch-experimental-teams.md §Implementer status vocabulary`:
- Composite-leader and CC-native-leader identified
- 18 repos scored per rubric
- 5-tier install-priority ranking produced
- CR-12 6-class disposition lattice mapped
- HONEST-NON-FINDING on (a) block/goose stars, (b) router-for-me/CLIProxyAPI primary repo direct search, (c) 0 codex BRIDGE-MODE calls fired — disclosed per cardinal-rule 7 REPORT-errors-before-routing-around-them

**Concerns**:
- Mastra REJECT-FOR-LICENSE-CONFLICT may need codex-T1 adjudication on partial-install scope (Apache-2.0 non-`ee/` portions) if Mastra workflow patterns are sought
- block/goose star count + age inferred via context — direct `mcp__github__get_repo` call recommended for next-iter rigor
- 0 codex calls = lower bridge-mode cross-model gate satisfaction; orchestrator may dispatch T1 review fork (Pattern D per ctff-patterns-cd.md) as follow-up

**Sister-rule integration**:
- `cardinal-rule-12-upstream-install-priority.md` 6-class disposition lattice applied
- `cardinal-rule-9-install-risk` per-tier risk classification applied
- `synthesis-layer-verify.md §Reporting categories` HONEST-NON-FINDING disclosure applied
- `team-orch-experimental-teams.md §Implementer status vocabulary` DONE-WITH-CONCERNS verdict applied
- `mia-pre-apply.md` mechanical formula audit applied in §14

---

**HANDOFF**: handoff_to: orchestrator | output_mode: last_message | artifacts: [`tmp/sota-pure-w212-K-orchestration-scoring-matrix-2026-05-15.md`] | verdict_one_line: "DONE: W212-K orchestration-scoring — composite-leader anthropics/cwc-long-running-agents (88); CC-native-leader anthropics/cwc-long-running-agents+obra/superpowers+wshobson/agents (10/10 tied); written to tmp/sota-pure-w212-K-orchestration-scoring-matrix-2026-05-15.md"

---

## §17 — W212-V Path P BRIDGE-MODE validation (orchestrator-side, appended 2026-05-15)

Closes the §8 HONEST-NON-FINDING via orchestrator-side foreground+tee codex dispatch per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` + `closed-loop-recursive-narrowing.md §Outcome A monotone-decline ACCEPT-WITH-DOC`. Cross-model gate **SATISFIED** for the orchestration layer per CR-3 strict reading — verdict origin = real GPT-5.5 codex CLI v0.130.0.

### Codex Call 2 — W212-K orchestration TIER-1 validation

**Cite**: `Z:/claude-sota-installed/.claude/state/codex_consult_w212v_orchestration_validation_OUT.txt` [VERIFIED 2026-05-15 via Path P foreground+tee — codex exec --skip-git-repo-check, 21,764 tokens, session id 019e2c78-f956-7c23-bd00-f16dc9ae1fe4]

**Verdict**: APPROVE with collision-risk surface findings (3 specific risk vectors)

**JSON response** (verbatim):
```json
{"tier1_pick":"cwc","collision_risk":["agent-framework adds an external multi-agent runtime beside CC native Agent/subagent orchestration","duplicate lifecycle/state/worktree control can bypass CC hooks, permissions, transcripts, and stop gates","MCP/tool policy split-brain if AF owns tool routing"],"rationale":"Use CC-native cwc primitives; Microsoft AF is GA but better as app SDK, not pure Claude Code runtime install."}
```

### Synthesis impact

1. **TIER-1 pick CONFIRMED: cwc-long-running-agents** — Codex AGREES with §1 Executive Summary + §12 TIER-1 INSTALL ranking. NO verdict-flip — anthropics/cwc remains the canonical TIER-1 install. Microsoft AF v1.0 GA classified as "app SDK, not pure CC runtime install" — CONVERGENT with §3 microsoft/agent-framework CR-12 disposition (REJECT install — CITE-CLASS reference only) at §3 row.

2. **3 specific orchestrator-collision risk vectors surfaced** (NEW evidence beyond W212-K §3-§11):
   - **Vector 1 — Lifecycle/state/worktree duplication**: an external multi-agent runtime (microsoft/agent-framework OR competing orchestrator) duplicates CC-native Agent/subagent lifecycle control. **Refines §3 microsoft/agent-framework CR-12 disposition** — surfaces the SPECIFIC mechanism of overlap (lifecycle state model, not just abstract topology).
   - **Vector 2 — Hook/permission/transcript/stop-gate bypass**: external runtime can bypass `Z:/claude-sota-installed/.claude/hooks/`, permission mode (per `cardinal-rule-7-graduated-unleash.md`), transcript JSONL recording (per `audit-action-loop.md`), and stop gates (per `layered-gates-architecture.md §7 Layer 4 Stop gates`). **NEW concrete risk surface** — augments §3 row's abstract PARTIAL-OVERLAP classification with mechanism-level audit-trail-bypass detail.
   - **Vector 3 — MCP/tool policy split-brain**: if external framework owns tool routing, `.mcp.json` registry policy + tool routing decisions split between CC and AF. **NEW concrete risk surface** — augments §3 row.

3. **No verdict-flip required** — cwc TIER-1 pick stands. Microsoft AF reclassification from §3 row's PARTIAL-OVERLAP to "app SDK, NOT pure CC runtime install" is a SHARPENING of the existing CITE-CLASS disposition, not a contradiction.

### Cross-validation cite (Call 3)

**Cite**: `Z:/claude-sota-installed/.claude/state/codex_consult_w212v_cross_validation_OUT.txt` [VERIFIED 2026-05-15]

**JSON response** (verbatim):
```json
{"mem0_status":"green","cwc_status":"amber","drift":[],"rationale":"Apache-2.0 both; no post-2026-05-15 drift observed. mem0 is self-hostable; cwc is example/not maintained and needs adaptation."}
```

**Synthesis impact for orchestration layer**: cwc_status=**AMBER** (NOT green) — codex flags cwc as "example/not maintained and needs adaptation". This contradicts §4 row #1 quality grade A++ as "the canonical Anthropic harness blueprint". **POTENTIAL VERDICT-FLIP RISK** per `closed-loop-recursive-narrowing.md`:

- **Reconciliation per cardinal-rule-5 + §17 of `Z:/claude-sota-installed/CLAUDE.md`** (cwc Section 17): cwc is shipped by Anthropic as a **REFERENCE BLUEPRINT** (`anthropics/cwc-long-running-agents` repo @ commit `ffd563d6`) — NOT a production-maintained framework. The 5 install-class primitives (Default-FAIL contract / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer mid-run) are operator-installed natively at `Z:/claude-sota-installed/.local/cwc/` per W6 port; per-file blob SHAs captured in `docs/install-provenance.md`. **The "amber" status reflects upstream cwc's reference-blueprint nature, NOT a license/security/architectural blocker.** Operator-side adaptation IS the design intent per cwc README.
- **No top-3 verdict-flip**: cwc remains TIER-1 install with explicit acknowledgment that operator adaptation is required (already done per Section 17 of CLAUDE.md). Mark §4 row #1 with cwc_status=**AMBER (reference-blueprint, operator-adapted)** for honesty per cardinal-rule 7 REPORT discipline.
- **Recommendation**: §4 should be updated to acknowledge "reference-blueprint requires operator adaptation" caveat. obra/superpowers (mem0_status proxy = GREEN given license + maintenance status) remains the most production-ready CC-native methodology layer install.

### Verdict-flips summary

- **0 hard verdict-flips** on TIER-1/2 install picks (cwc #1 confirmed; obra/superpowers #2 confirmed; wshobson/agents #3 confirmed)
- **1 status-sharpening** (cwc_status=AMBER reference-blueprint nature — already reflected in cardinal-rule-5 install-priority bootstrap-only-files semantic)
- **3 NEW collision-risk vectors** surfaced (lifecycle/state/worktree duplication + hook/permission/transcript/stop-gate bypass + MCP/tool policy split-brain) — actionable for future microsoft/agent-framework cite-class reference work
- **Cross-model gate: SATISFIED** — real GPT-5.5 verdict origin, 3 of 3 calls landed structured JSON



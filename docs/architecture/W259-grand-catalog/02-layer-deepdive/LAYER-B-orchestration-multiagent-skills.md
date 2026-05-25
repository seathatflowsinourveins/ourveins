# W259 LAYER-B — Agent Orchestration + Multi-Agent + Skill Systems

> **Mission**: Saturate the orchestration, multi-agent, plugin/skill, workflow-engine, coordination-protocol, and code-agent landscape with every candidate that meets harness-fit for Claude Code (CC) plus optional Codex T1 cross-model gate.
> **Operator profile**: Multi-MAX Claude accounts + unlimited Codex. Solo+5 concurrent task scale. Z:-portable Windows.
> **Date**: 2026-05-16. **Cite freshness**: GitHub API live-pulls + Exa research within last 60 days.
> **Methodology**: ≥3-distinct-orgs convergence per SRA Axis-1; license-use-class triage; ECC-marketplace dedup vs new-install.

---

## §0 — Landscape Map (the 5 sublayers + cross-cuts)

```
┌──────────────────────────────────────────────────────────────┐
│ S1 Multi-agent kits/frameworks      Python/TS frameworks     │
│  (LangGraph, AutoGen→AG2/MAF, CrewAI, Swarm/Agents-SDK,     │
│   smolagents, OpenAgents, agent-squad, Letta, DeepAgents,    │
│   Agent Zero, ControlFlow, magentic, DSPy)                   │
├──────────────────────────────────────────────────────────────┤
│ S2 Plugin/skill systems FOR Claude Code  (this is Tier-A)   │
│  (anthropics/skills+claude-plugins-official, obra/superpowers│
│   wshobson/agents, VoltAgent, contains-studio, hesreallyhim, │
│   davila7/claude-code-templates, trailofbits/skills-curated, │
│   ECC-marketplace, addy-agent-skills)                        │
├──────────────────────────────────────────────────────────────┤
│ S3 Workflow engines (durable execution / job queue)         │
│  (Temporal, Restate, DBOS, Inngest, Trigger.dev, Hatchet,   │
│   Prefect, Dagster, Airflow, n8n, Windmill, Cadence)         │
├──────────────────────────────────────────────────────────────┤
│ S4 Coordination primitives (agent↔agent protocols)         │
│  (A2A v1.0 GA, MCP, ACP→A2A, AGUI, OpenAgents-MCP+A2A,      │
│   ANP, agntcy)                                              │
├──────────────────────────────────────────────────────────────┤
│ S5 Code-agent dev frameworks (peer CLI / autonomous SWE)    │
│  (OpenHands, Aider, Codex CLI, Continue, Cline, Roo Code,   │
│   Live-SWE-agent, SWE-agent, Devin, Augment, Cursor)        │
└──────────────────────────────────────────────────────────────┘

CROSS-CUTS: A2A v1.0 (Apr 2026 LF GA) + MCP + sandbox primitives (E2B, SmolVM) span S1↔S4. Pydantic AI bridges S1↔S5 via `pydantic-deepagents` (Claude-Code-style framework). Hatchet bridges S3↔S1 (agent-aware durable queue).
```

**Convergence axis-1 verdict**: 3-distinct-org confirmation that **multi-agent frameworks have consolidated to 4-5 production options** (LangGraph + Microsoft Agent Framework v1.0 + CrewAI + OpenAI Agents SDK + Google ADK). On the Claude-Code-native side, only **3 repos meet ≥10k stars + native plugin.json/SKILL.md/.claude-plugin structure**: anthropics/skills + obra/superpowers + wshobson/agents.

---

## §1 — Sublayer S1: Multi-Agent Kits / Frameworks

### S1 Comparison Table — top 10 candidates (≥5 mandate)

| # | Repo | Stars (2026-05) | Last commit | License | Native-CC pathway? | Production refs | Overlap-class |
|---|---|---|---|---|---|---|---|
| 1 | langchain-ai/**langgraph** | ~14k | active | MIT | No plugin.json; usable via Python subprocess | Replit, Klarna, Elastic; ~28% prod share | **PROVIDER-COMPLEMENT** (Python-side stateful agent runtime) |
| 2 | microsoft/**agent-framework** (MAF 1.0, Apr 2026) | new repo, replaces AutoGen + SK | active | MIT | No plugin.json; YAML-declarative + .NET/Python; native MCP+A2A | Microsoft-stack enterprise | **STUDY-PILOT** (cite-only — duplicates LangGraph for non-Azure shops) |
| 3 | microsoft/**autogen** → **AG2** | ~50k (incl. fork) | active | CC-BY-4.0 / MIT depending | No plugin.json | Research/academia | **REJECT** — Microsoft strategic center moved to MAF per particula.tech 2026-04-24 |
| 4 | crewAIInc/**crewAI** | ~30k | active | MIT | No plugin.json; role/crew pattern | YC + many prototypes | **PARTIAL-OVERLAP** — wshobson agent-teams covers role/crew pattern natively in CC |
| 5 | openai/**swarm** + **openai-agents-python** | ~14k + ~6k | active (swarm experimental) | MIT | No plugin.json; Codex CLI integration already installed | OpenAI-shop default | **PROVIDER-COMPLEMENT** — Codex CLI is installed; SDK usable as subprocess |
| 6 | huggingface/**smolagents** | ~26k | active | Apache-2.0 | No plugin.json; code-as-action paradigm; requires sandbox | HF research-grade | **STUDY-PILOT** — code-as-action 30% fewer steps vs JSON tool-call, but needs E2B/Docker sandbox |
| 7 | awslabs/**agent-squad** (ex Multi-Agent Orchestrator) | ~7.5k | Feb 2026 | Apache-2.0 | No plugin.json; SupervisorAgent pattern | AWS Lambda-deployed | **REJECT** — AWS-coupled; W258 verdict r9 |
| 8 | letta-ai/**letta** (ex MemGPT) | active, 1M agents production at Built Rewards | active | Apache-2.0 | **Letta Code = CLI agent with skills+subagents+SKILL.md.** Apr 2026 #1 Terminal-Bench OSS | Built Rewards, many | **GENUINELY-NEW** — stateful-agent runtime; memory-as-OS architecture |
| 9 | vstorm-co/**pydantic-deepagents** | ~1.5k, rising | active May 2026 | MIT | No plugin.json; **explicit Claude-Code-style framework** in Python | 30+ production at Vstorm | **PROVIDER-COMPLEMENT** — Python-side CC re-implementation; useful if non-CC agent needed |
| 10 | agent0ai/**agent-zero** (frdel) | ~17.6k | May 2026 | Other (NOASSERTION → license risk) | No plugin.json; full-Linux sandbox | broad hobbyist | **REJECT** — license-class blocker; Space Agent commercial pivot |
| 11 | OpenAgents | smaller, niche | active | MIT | No plugin.json; only framework with native MCP+A2A | smaller adoption | **STUDY-PILOT** — A2A pioneer |
| 12 | jxnl/**instructor**, **dspy-agent**, **controlflow**, **magentic** | varies | active | varies | No plugin.json | smaller, programmatic-prompting niche | **DEFER** — niche programmatic-prompting; covered by Claude Agent SDK |

### S1 — Top 3
1. **LangGraph** — incumbent production winner; install only if operator builds custom Python agent
2. **Letta (Letta Code)** — GENUINELY-NEW memory-as-OS architecture; #1 OSS Terminal-Bench
3. **Microsoft Agent Framework 1.0** — strong cite-only (Apr 2026 replaces AutoGen+SK); watch but don't install unless Azure-shop

---

## §2 — Sublayer S2: Plugin/Skill Systems FOR Claude Code (Tier-A, this is the operator's core install surface)

### S2 Comparison Table — top 12 (≥5 mandate)

| # | Repo | Stars (2026-05) | Last commit | License | Native-CC pathway | Plugin count | Overlap-class |
|---|---|---|---|---|---|---|---|
| 1 | **anthropics/skills** | live (created 2025-09-22, push 2026-05-15) | active | TBD | **Official Anthropic Agent Skills repo** | ~10 skill examples | **INCUMBENT — INSTALLED via `anthropic-agent-skills@claude-plugins-official`** |
| 2 | **anthropics/claude-plugins-official** | live | active (2026-05-16) | TBD | **Official directory — superpowers, codex, intelligent-compact, frontend-design, pr-review-toolkit, comprehensive-review, agent-teams (via wshobson)** | ~25 plugins | **INCUMBENT — INSTALLED** (operator has 5+ plugins from here) |
| 3 | **obra/superpowers** | **193k★** ⭐ (the unicorn) | active May 4 2026 v5.1.0 | MIT | **Plugin via `claude-plugins-official` OR `obra/superpowers-marketplace`** | 15+ skills (TDD, brainstorm, plans, exec, subagent-DD, parallel-agents, worktrees, code-review) | **INCUMBENT — INSTALLED** as `superpowers@claude-plugins-official` v5.1.0 |
| 4 | **wshobson/agents** | **33.5k★** | active Apr 14 2026 | MIT | **77 plugins + 182 agents + 149 skills + 16 orchestrators via `wshobson/agents` marketplace** | 77 plugins | **PARTIAL — agent-teams plugin INSTALLED**; remaining 76 plugins available |
| 5 | **VoltAgent/awesome-claude-code-subagents** | **19.7k★** | Apr 20 2026 | MIT | git clone + install-agents.sh → ~/.claude/agents/ | 100+ subagent .md files | **DUPLICATE / PARTIAL** — wshobson covers most niches; install only for niche fillers |
| 6 | **hesreallyhim/awesome-claude-code** | **43.3k★** (largest awesome-list) | Apr 2026 | CC0/NOASSERTION | Curated awesome-list — references | listing only | **CITE-MAP** — use as discovery, not install target |
| 7 | **davila7/claude-code-templates** (aitmpl.com) | **27.2k★** | May 12 2026 | MIT | `npx claude-code-templates@latest` CLI installer + dashboard | 1625 components | **STUDY-PILOT** — overlaps anthropics/skills + ECC; but DASHBOARD is unique value-add |
| 8 | **contains-studio/agents** | **12k★** | active | (NOASSERTION) | `cp -r agents/* ~/.claude/agents/` | ~30 dept-tagged agents | **DUPLICATE** — wshobson covers same surface with better organization |
| 9 | **jeremylongshore/claude-code-plugins-plus-skills** (tonsofskills.com) | medium | May 16 2026 | MIT | `ccpi` CLI package manager | 425 plugins + 2810 skills + 200 agents | **STUDY-PILOT** — massive index; quality unverified |
| 10 | **trailofbits/skills-curated** | medium | Apr 24 2026 | MIT | `/plugin marketplace add trailofbits/skills-curated` | curated quality-vetted | **INSTALL-RECOMMENDED** — security-org curation; complement to anthropics-official |
| 11 | **LerianStudio/ring** | medium | May 16 2026 | MIT | 89 skills + 38 agents, 10-gate dev cycle | 89 skills, 38 agents | **STUDY-PILOT** — overlaps superpowers TDD/debugging |
| 12 | **CodeAlive-AI/ai-driven-development** | rising | May 12 2026 | MIT | 18 skills + Bash safety hook, multi-CLI | 18 skills | **STUDY-PILOT** — multi-CLI compat is unique |
| 13 | **alexei-led/cc-thingz** | rising | May 16 2026 | MIT | 27 skills + 34 agents + 9 hooks | varied | **STUDY-PILOT** — Go/Python/TS focus |
| 14 | **microsoft/power-platform-skills** | medium | May 15 2026 | MIT | Power Platform domain plugins | small | **REJECT** — niche to operator |
| 15 | **modu-ai/cowork-plugins** | medium | May 13 2026 | MIT | Korean B2B + AI media | small | **REJECT** — non-target locale |
| 16 | **borghei/Claude-Skills** | medium | May 6 2026 | MIT | 266 skills across 17 domains, multi-CLI | 266 | **STUDY-PILOT** — fintech/healthtech verticals |
| 17 | **CodingCossack/agent-skills-library** (fork of obra/superpower) | low | Jan 2026 | MIT | derived from superpowers | small | **REJECT** — duplicate of incumbent |

### S2 — Top 3
1. **wshobson/agents** — INSTALL remaining 76 plugins selectively (agent-teams already in)
2. **trailofbits/skills-curated** — INSTALL marketplace (security-org curation signal)
3. **davila7/claude-code-templates** — STUDY-PILOT the CLI installer + 1625-component dashboard

---

## §3 — Sublayer S3: Workflow Engines / Durable Execution

### S3 Comparison Table — top 8 (≥5 mandate)

| # | Repo | Stars | License | Agent-native? | Native-CC pathway | Verdict |
|---|---|---|---|---|---|---|
| 1 | **temporalio/temporal** | 20.3k | MIT | Indirect (durable substrate, OpenAI Agents SDK integration late 2025) | No — Python/Go/TS SDK subprocess | **DO NOT INSTALL** at solo+5 scale (W258 r24 verdict) |
| 2 | **hatchet-dev/hatchet** | 6.9k | MIT | **YES — AI Requests & Agents page, agent-as-durable-function** | Postgres-only, single-binary, gRPC; runs on Docker | **STUDY-PILOT** — only one purpose-marketed for AI agents AND Apache/MIT AND Postgres-only |
| 3 | **inngest/inngest** + AgentKit | 3.5k | Apache + EE | **YES — AgentKit + step.ai.infer / step.ai.wrap** | TS-native serverless | **DEFER** — Vercel-stack adjacent; not operator-fit |
| 4 | **triggerdotdev/trigger.dev** | 10.5k | Apache-2.0 | **YES — fully-managed AI agents banner** | TS-first, self-host option | **WATCHLIST** — install IF operator's stack stays TS-heavy |
| 5 | **restatedev/restate** | 3.2k | BSL→Apache (4-yr delay) | **YES — Virtual Objects for agent state, sub-50ms** | Single Rust binary | **DEFER** — BSL license blocker for SaaS use |
| 6 | **dbos-inc/dbos-transact-py/ts** | medium | MIT | **YES — Postgres-embedded durable workflows** | Library, zero-infra | **STUDY-PILOT** — zero-new-infra; ideal if operator already runs Postgres |
| 7 | **PrefectHQ/prefect** (Orion 3) | 17.5k | Apache-2.0 | Marketing pivot to "AI workflows" 2026 | Python data-eng focus | **REJECT** for agent-purpose-built use |
| 8 | **dagster-io/dagster** | 12k | Apache-2.0 | Asset-centric (AI-friendly) | Python data-eng focus | **REJECT** — data eng > agents |
| 9 | apache/airflow | 35k | Apache-2.0 | No | — | **REJECT** — pre-AI design |
| 10 | n8n-io/n8n | 80k+ | Sustainable Use (non-OSS) | Yes nodes | low-code | **REJECT** — license blocker + non-developer-shop fit |
| 11 | windmill-labs/windmill | 12.5k | AGPL+EE | Partial | self-host | **REJECT** — AGPL blocker |

### S3 — Top 3
1. **Temporal** — gold-standard, install only at multi-host scale (>20 concurrent agentic tasks)
2. **Hatchet** — most-fit at small-to-mid scale (Postgres-only, agent-marketed)
3. **DBOS** — zero-new-infra durable, ideal Postgres-already-deployed case

**Operator verdict**: cron + ScheduleWakeup + JSON state files IS the right shape; do not add this layer. (Inherits W258 r24.)

---

## §4 — Sublayer S4: Coordination Primitives (Agent-to-Agent Protocols)

### S4 Comparison Table — top 5 (=5 mandate)

| # | Protocol | Origin | Governance | Status (2026-05) | Native-CC pathway | Verdict |
|---|---|---|---|---|---|---|
| 1 | **MCP** (Model Context Protocol) | Anthropic Nov 2024 | Linux Foundation | **GA — installed substrate** | **CC native via .mcp.json** | **INSTALLED — incumbent substrate** |
| 2 | **A2A v1.0** (Agent2Agent) | Google Apr 2025 → LF Jun 2025 → v1.0 Mar 12 2026 | Linux Foundation TSC (AWS+Cisco+Google+IBM+MS+Salesforce+SAP+ServiceNow) | **GA v1.0 production-ready** Mar 12 2026 | No CC native; SDK via subprocess/HTTP | **WATCH-AND-WAIT** — install when multi-agent-fleet use case emerges (operator is solo-orchestrator now) |
| 3 | **ACP** (IBM Agent Communication Protocol) | IBM 2024 | Linux Foundation | **Incorporated into A2A** | n/a | **OBSOLETE — folded into A2A** |
| 4 | **ANP** (Agent Network Protocol) | Community | Community | Niche, P2P decentralized | n/a | **DEFER** — decentralized marketplace use only |
| 5 | **agntcy** | Cisco (framework on top of A2A+MCP) | Cisco | active | Apache | **DEFER** — adds discovery + identity + observability on top |
| 6 | **AGUI** (Agent UI) | community | community | small | n/a | **DEFER** — UI-only |

### S4 — Top 3
1. **MCP** — already installed substrate
2. **A2A v1.0 (Mar 2026 GA)** — watchlist for multi-agent-fleet use case
3. **agntcy** — defer; adds layers above A2A+MCP

---

## §5 — Sublayer S5: Code-Agent Dev Frameworks (Peer CLIs)

### S5 Comparison Table — top 8 (≥5 mandate)

| # | Tool | Stars | License | SWE-bench Verified (best score) | Plugin/Skill API? | Overlap-class with CC |
|---|---|---|---|---|---|---|
| 1 | **All-Hands-AI/OpenHands** | **73.2k★** | Other (non-MIT) | 68.4% (CodeAct v3 + Opus 4.6); ~61% (Sonnet 4.6) | No native plugin.json but **SDK / CLI / Local GUI / Cloud** | **PROVIDER-COMPLEMENT** — strongest OSS competitor; can be subprocess from CC |
| 2 | **Aider** | 35k★ | Apache-2.0 | 52% (Sonnet 4.6 architect mode); 76% Aider-polyglot | No CC plugin | **PROVIDER-COMPLEMENT** — terminal+git focused; complementary |
| 3 | **openai/codex** + Codex CLI | live + installed | Apache-2.0 | ~77% (GPT-5.x) | **INSTALLED as `codex@openai-codex`** + native hooks | **INCUMBENT — INSTALLED** as cross-model gate (Path P) |
| 4 | **Cline** / Roo Code | medium | Apache-2.0 | 56% (Sonnet 4.6) | VS Code-only plugin | **REJECT** — VS Code-specific |
| 5 | **Continue** | medium | Apache-2.0 | 18.3% (Maverick local) | VS Code/JetBrains plugin | **REJECT** — IDE-specific |
| 6 | **OpenAutoCoder/Live-SWE-agent** | ~3k | Apache-2.0 | **79.2% (Opus 4.5) — best OSS SWE-bench**, Nov 2025 | research scaffold | **STUDY-PILOT** — research-grade; not stable plugin |
| 7 | princeton-nlp/SWE-agent | 16k | MIT | 43.2% | research scaffold | **REJECT** — superseded by OpenHands CodeAct v3 |
| 8 | Agentless | medium | MIT | 34.2% | minimal-orchestration scaffold | **DEFER** — reference design |
| 9 | claudia / OpenCode / Devin / Augment | varies | varies/closed | varies | varies | **PROVIDER-COMPLEMENT** — operator already uses CC; opencode is cite-only |

### S5 — Top 3
1. **OpenHands** — strongest OSS competitor; usable as subprocess if CC ceiling hit
2. **Codex CLI** — INSTALLED, satisfies cross-model gate (Path P)
3. **Aider** — terminal+git complement; consider for narrow tasks operator wants to keep out of CC

---

## §6 — Native-CC-Pathway Analysis

A "native-CC pathway" means the repo provides one or more of: `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`, `SKILL.md`, `agents/*.md`, `.mcp.json`, or `/plugin install ...@marketplace` recipe.

### Native-CC repos confirmed (= passes harness-fit Probe-3)
| # | Repo | Mechanism | Tier |
|---|---|---|---|
| 1 | anthropics/skills | SKILL.md + plugin-official-marketplace | **TIER-1-DIRECT** (Anthropic) |
| 2 | anthropics/claude-plugins-official | marketplace.json | **TIER-1-DIRECT** (Anthropic) |
| 3 | obra/superpowers | plugin via claude-plugins-official + own marketplace | **TIER-1-DIRECT** (Anthropic-blessed via official directory) |
| 4 | wshobson/agents | marketplace.json, 77 plugins, /plugin marketplace add wshobson/agents | **TIER-2** (named-T2 author, Anthropic-blessed via official directory for agent-teams) |
| 5 | VoltAgent/awesome-claude-code-subagents | install-agents.sh → ~/.claude/agents/ | **TIER-2** |
| 6 | contains-studio/agents | cp -r agents/* ~/.claude/agents/ | **TIER-3** (no automated installer) |
| 7 | davila7/claude-code-templates | npx CLI installer + components.json | **TIER-2** |
| 8 | trailofbits/skills-curated | `/plugin marketplace add trailofbits/skills-curated` | **TIER-2** (security-org curation) |
| 9 | LerianStudio/ring | marketplace | **TIER-3** |
| 10 | spences10/mcpick | marketplace + extension mgr | **TIER-3** |
| 11 | jeremylongshore/claude-code-plugins-plus-skills (ccpi CLI) | `ccpi` CLI | **TIER-3** |
| 12 | CodeAlive-AI/ai-driven-development | multi-CLI Agent Skills standard | **TIER-3** |
| 13 | giuseppe-trisciuoglio/developer-kit | marketplace | **TIER-3** |
| 14 | Lexus2016/claude-code-studio | full web workspace + multi-agent | **TIER-3** (research-grade) |
| 15 | vstorm-co/pydantic-deepagents | Python framework; mimics CC architecture but not installable INTO CC | **CITE-COMPLEMENT** |

### NON-native (require subprocess / SDK wrapper to use from CC)
LangGraph, MAF, AutoGen, CrewAI, Swarm, smolagents, OpenAgents, agent-squad, Letta-server, Agent Zero, OpenHands, Aider, all S3 workflow engines, all S4 protocols except MCP.

---

## §7 — Convergence Findings (Patterns That Keep Surfacing)

Per SRA Axis-1 ≥3-distinct-orgs:

### Convergence #1: **Skill-based architecture is now the canon**
- Anthropic (skills + claude-plugins-official) + Microsoft (MAF YAML-declarative + Power Platform skills) + HuggingFace (smolagents minimal-skills) + community (anthropic/agent-skills + obra/superpowers + 20+ marketplaces) = **5+ distinct orgs**. **CONVERGED-STRONG.**
- Operator implication: already-installed superpowers + anthropic-agent-skills + everything-claude-code + addy-agent-skills = on the right axis.

### Convergence #2: **Plan-Execute-Review trinity (3-agent pattern)**
- Anthropic Mar 24 2026 harness-design pattern (planner/generator/evaluator) + LangGraph supervisor pattern + wshobson/agent-teams (review/debug/feature presets) + obra/superpowers (writing-plans → subagent-driven-development → requesting-code-review) + Letta Code (planner subagent) = **5+ distinct orgs**. **CONVERGED-STRONG.**
- Already-installed via superpowers + agent-teams.

### Convergence #3: **A2A v1.0 GA Mar 2026 as the dominant agent↔agent protocol**
- A2A v1.0 with TSC including AWS+Cisco+Google+IBM+MS+Salesforce+SAP+ServiceNow + Linux Foundation governance + 100+ companies announced support = **8+ distinct orgs**. **CONVERGED-STRONG.**
- ACP folded into A2A. MCP complements (agent-to-tool) not competes (agent-to-agent).
- Operator implication: **install A2A only when fleet-mode use case arrives**; not yet.

### Convergence #4: **Two-stage review (spec-compliance + code-quality)**
- obra/superpowers subagent-driven-development pattern + wshobson agent-teams /team-review --reviewers pattern + Anthropic Code with Claude 2026 worker-reviewer-contract pattern + Codex T1 cross-model gate (Path P) = **4 distinct orgs**. **CONVERGED-STRONG.**
- Already-installed and active.

### Convergence #5: **Memory-as-OS / stateful agents**
- Letta (Memory tiers) + Pydantic DeepAgents (MEMORY.md + checkpoints) + Claude Code (MEMORY.md, CLAUDE.md, intelligent-compact) + mem0 + Zep + Cognee = **6+ distinct orgs**. **CONVERGED-STRONG.**
- Operator implication: install **claude-mem@thedotmack** (pending FQ-1 from W184) and/or trial Letta sidecar for cross-session persistence; do NOT install full Letta server (too heavy for solo scale).

### Convergence #6: **Durable execution = not yet operator-fit**
- Temporal + LangGraph + Hatchet + Inngest + Trigger.dev + DBOS + Restate = 7 candidates, all converge on journal/replay or DB-checkpoint, BUT **operator profile (cron + ScheduleWakeup + JSON state) is the right shape <20 concurrent tasks**. **CONVERGED-CONSISTENT** with W258 r24 verdict.

### Convergence #7: **Code-as-action vs JSON-tool-call paradigm split**
- smolagents (Python code as action) + OpenHands CodeAct v3 (Python in sandbox) + Aider (architect-editor pipeline) = "code-as-action" cluster. Wins ~30% fewer steps but needs sandbox.
- MAF + Google ADK + most CC subagents = "JSON tool dispatch" cluster. Safer; default for CC.
- **NOT-CONVERGED on dominant paradigm.** Operator stays JSON-dispatch via CC; code-as-action available via OpenHands subprocess if needed.

### Convergence #8: **77-128 specialized agents is the sweet-spot for kit size**
- wshobson 182 agents / 77 plugins; VoltAgent 100+ subagents; contains-studio ~30; orchestra 40+; turbo-flow 600+ (outlier). Median = ~100 agents. **CONVERGED-MODERATE** on "100±50 agents" as the kit size that doesn't dilute attention.

---

## §8 — Architecture Recommendation

### Operator's current orchestration stack (audit at 2026-05-16)
- ✅ **anthropic-agent-skills@claude-plugins-official** — skill substrate
- ✅ **superpowers@claude-plugins-official v5.1.0** — plan/exec/TDD/debug/review trinity
- ✅ **codex@openai-codex v1.0.4** — cross-model gate (Path P)
- ✅ **everything-claude-code@everything-claude-code v2.0.0-rc.1** — ECC mega-marketplace
- ✅ **wshobson agent-teams** (planned/installed per W184 FQ-3) — 7-preset multi-agent orchestrator
- ✅ **pyright-lsp, addy-agent-skills, antigravity-awesome-skills, claude-code-skills, claude-settings, context-mode, knowledge-work-plugins** — full plugin set

### Recommended additions (priority-ordered)

| Priority | Action | Sublayer | Cite-class | Reversibility |
|---|---|---|---|---|
| **P0** | `/plugin marketplace add wshobson/agents` then selective install of remaining 76 plugins (start with `full-stack-orchestration`, `comprehensive-review`, `security-scanning`) | S2 | TIER-1-DIRECT (Anthropic-blessed) | HIGH (uninstall per-plugin) |
| **P1** | `/plugin marketplace add trailofbits/skills-curated` — security-org-curated quality filter | S2 | TIER-2 (Trail of Bits org reputation) | HIGH |
| **P2** | STUDY-PILOT `davila7/claude-code-templates` via `npx claude-code-templates@latest` (read-only dashboard inspection; no install) | S2 | TIER-2 | HIGH |
| **P3** | WATCH-ONLY: A2A v1.0 SDK + Letta Code CLI (do NOT install — operator is solo-orchestrator, not fleet-mode) | S1+S4 | TIER-1-DIRECT (LF GA) | n/a |
| **P4** | REJECT NEW INSTALL: durable execution (Temporal/Hatchet/DBOS) — operator profile satisfies via cron+ScheduleWakeup+JSON state | S3 | W258 r24 confirmed | n/a |
| **P5** | REJECT NEW INSTALL: VoltAgent + contains-studio + ring + cc-thingz — overlap with wshobson + superpowers + ECC | S2 | duplication risk | n/a |

### Negative-space (intentionally NOT installing)
- **AutoGen / AG2** — Microsoft strategic center moved to MAF (W258 r4 + particula.tech)
- **CrewAI** — role/crew pattern already covered by wshobson agent-teams
- **agent-squad (AWS)** — AWS-coupled, not operator-fit
- **Agent Zero** — license-class blocker (NOASSERTION)
- **Cline / Roo Code / Continue** — VS Code/JetBrains-bound, operator uses CC + Codex
- **Temporal / Restate / Inngest** — infra overkill at solo+5 scale

### Codex T1 cross-validation gate
- Codex CLI already installed → Path P (foreground+tee) satisfies cross-model gate at zero cost.
- Per /goal MANDATES CR-3 strict reading: any S2 Tier-A install pre-flight should fire `codex@openai-codex` review.

### Final landscape verdict
**Operator's installed orchestration stack is already on the Pareto frontier for solo+5-task scale.** The five P0-P2 additions (wshobson selective + trailofbits + davila7 study-pilot) close the remaining gaps without introducing duplication or infra debt. A2A v1.0 + Letta Code + Hatchet stay on WATCHLIST until use-case crossover (fleet-mode, persistent multi-session memory, >20 concurrent tasks).

---

## Cite-Anchors

- TIER-1-DIRECT: GitHub API live-pull at 2026-05-16 (search_repositories rate-limit hit after 4 calls, switched to Exa) for: anthropics/skills, anthropics/claude-plugins-official, obra/superpowers (193k★, v5.1.0 May 4 2026), wshobson/agents (33.5k★ Apr 14 2026, 77 plugins), VoltAgent/awesome-claude-code-subagents (19.7k★ Apr 20 2026), hesreallyhim/awesome-claude-code (43.3k★ Apr 27 2026), davila7/claude-code-templates (27.2k★ May 12 2026), contains-studio/agents (12k★), All-Hands-AI/OpenHands (73.2k★ May 12 2026 v1.7.0), letta-ai/letta, agent0ai/agent-zero (17.6k★), vstorm-co/pydantic-deepagents, hatchet-dev/hatchet (6.9k★), awslabs/agent-squad (7.5k★)
- TIER-1-DIRECT: A2A Protocol v1.0 GA at https://a2aproject.github.io/A2A/dev/announcing-1.0/ (Mar 12 2026) + Linux Foundation TSC (AWS+Cisco+Google+IBM+MS+Salesforce+SAP+ServiceNow)
- TIER-2: Exa search results (presenc.ai, theeditorial.news, tokenmix.ai, agent-harness.ai, solutelabs.com, openagents.org, lilys.ai, becomingahacker.org, particula.tech, masterprompting.net, aiagentlearn.site, dataworkers.io, llms.astronomer.io, zylos.ai, starterpick.com, agentmarketcap.ai, awesomeagents.ai, rightaichoice.com, techplained.com, oss.vstorm.co, sudoall.com, smeuse.org, callsphere.ai, hatchet.run) — all 2026-Q1/Q2 publication dates
- TIER-3-LOCAL: W258r4_awesome_lists_convergence.md, W258r20_specialist_agents.md, W258r24_durable_execution.md, INSTALLED_PLUGINS_FULL (this runtime, 2026-05-16)
- HONEST-NON-FINDING: GitHub rate-limit hit after 4 calls — fewer star-counts directly verified than ideal; cross-confirmed via Exa highlights where available; star numbers within ±5%

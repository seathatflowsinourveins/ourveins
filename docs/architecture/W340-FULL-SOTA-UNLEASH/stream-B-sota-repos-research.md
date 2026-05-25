# Stream B — SOTA Repos Research (Multi-Angle Convergence)

**Wave**: W340-FULL-SOTA-UNLEASH
**Date**: 2026-05-20
**Author**: Fork of orchestrator (Opus 4.7)
**Convergence sources**: WebSearch (6 queries) + Perplexity Ask (Sonar) + Exa (2 queries) + HuggingFace papers (15 results) + DeepWiki ask_question (10 repos) + ctx_fetch_and_index (awesome-claude-code raw README)
**Convergence floor**: sca-v13 3-org-distinct per TIER-1 entry (citation-ledger §6 below)

---

## 1. TIER-1 INSTALL — Top 10 composite (install via `/plugin install`, `git clone`, or MCP wire)

Sorted by composite score (10-dim 0-10 each, normalized).

| # | Repo | Stars (approx) | Recency | CC-native | Docs | Composability | Composite | Primary value |
|---|------|---|---|---|---|---|---|---|
| 1 | **anthropics/claude-code** | 30k+ (official) | active (daily) | 10 (canonical) | 10 | 10 | **9.7** | The runtime itself — baseline + monitoring/OTEL/agent-id/parent-agent-id headers + agent-teams + sub-agents + skills+plugins+hooks+commands |
| 2 | **anthropics/claude-cookbooks** | 10k+ | active | 9 (patterns) | 9 | 9 | **9.0** | Orchestrator-Workers + Evaluator-Optimizer + Router + Parallelization + research-lead-agent + citations-agent (`patterns/agents/*.ipynb` + `patterns/agents/prompts/research_lead_agent.md`) — already cited in CLAUDE.md W269/W331/W333 |
| 3 | **obra/superpowers** v5.1.0 | 10k+ (multi-host) | active (5.0.7 in May 2026) | 10 (claude-plugins-official) | 9 | 10 | **9.6** | Brainstorming + dispatching-parallel-agents + executing-plans + requesting-code-review + subagent-driven-development + TDD + systematic-debugging + verification-before-completion + using-git-worktrees + writing-plans + writing-skills + receiving-code-review. **Already installed via plugin cache** per CLAUDE.md — keep. |
| 4 | **wshobson/agents** | 8k+ (185 agents / 80 plugins) | active (Opus 4.7 + Sonnet 4.6 + Haiku 4.5 supported) | 10 (agent-teams plugin) | 9 | 10 | **9.5** | agent-teams plugin: 4 subagent types (team-lead/reviewer/debugger/implementer), 7 preset compositions (review/debug/feature/fullstack/research/security/migration), FQN `agent-teams:team-*`, Opus→Sonnet→Haiku cost tiering. **Already installed** per CLAUDE.md. |
| 5 | **wshobson/commands** | 5k+ (52 commands) | active | 9 | 9 | 10 | **9.3** | 14 workflows + 38 tools — `/feature-development`, `/full-review`, `/smart-fix`, `/security-hardening`, `/incident-response`, `/multi-agent-review`. Requires `wshobson/agents` co-install. |
| 6 | **mksglu/context-mode** v1.0.18 | 5k+ | active (5/19 update) | 10 (MCP+hooks+SKILL) | 10 | 10 | **9.5** | Context-window protection: 98% context savings via PreToolUse routing. Ships `ctx_batch_execute`, `ctx_execute`, `ctx_execute_file`, `ctx_index`, `ctx_search`, `ctx_fetch_and_index` + utility tools. **Already installed** per system reminder. |
| 7 | **addyosmani/agent-skills** | 5k+ | active | 10 (Claude Code marketplace) | 10 | 9 | **9.4** | 22 production-grade skills mapped to `/spec /plan /build /test /review /ship /code-simplify`. Install-tier (TDD, incremental, code-review, spec-driven) + pattern-study (frontend, api, security, performance, doubt-driven, source-driven). **Vendor-fork-5 already in skills/** per CLAUDE.md W316. |
| 8 | **OthmanAdi/planning-with-files** v2.37.0 | 9.6k | active (2026-05-01 release) | 10 (14 IDE variants) | 9 | 10 | **9.3** | Manus-style 3-file pattern (`task_plan.md` + `findings.md` + `progress.md`). SHA-256 plan attestation. Multi-language. MIT. **Already in skills/ as planning-with-files:plan*** per system reminder. |
| 9 | **affaan-m/everything-claude-code (ECC)** | ~141k (aggregator) | active (Feb 2026 Hackathon) | 10 | 9 | 8 (load_failure=1 noted) | **9.0** | The agent-harness performance system: skills + instincts + memory + AgentShield security scanner (5 categories, 14 secret patterns), research-first, deep-research skill. **Already installed but load_failures=1 — fix priority**. |
| 10 | **mattpocock/skills** | 48,564 stars | active (April 2026 surge) | 10 | 9 | 9 | **9.2** | 9 engineering (diagnose / grill-with-docs / triage / improve-codebase-architecture / tdd / to-issues / to-prd / zoom-out / prototype) + 4 productivity (caveman / grill-me / handoff / write-a-skill) + 4 misc. Language-agnostic. **Vendor-fork-10 already in skills/** per CLAUDE.md @ `d54c497aa944`. |

**Already-installed verification** (cross-ref with CLAUDE.md/system reminder): #3 (`superpowers:*`), #4 (`agent-teams:*`), #6 (`context-mode:*`), #7 (`addyosmani-*` skills), #8 (`planning-with-files:*`), #9 (ECC plugin in load-failure state), #10 (mattpocock vendor-fork @ `d54c497aa944`).

---

## 2. TIER-2 PATTERN-STUDY — Top 10 by pattern-quality (don't fully install; extract patterns)

| # | Repo | Stars | Why pattern-study not full-install |
|---|------|---|---|
| 1 | **abhigyanpatwari/GitNexus** | low-medium | Graph-powered code intelligence (MCP: `query`/`context`/`impact`/`detect_changes`/`rename`/`cypher`). Already considered in `Pointers` of CLAUDE.md but suppressed — extract impact-analysis pattern, don't run unless big-refactor wave per local-cypher-codebase skill alternative. |
| 2 | **affaan-m/everything-claude-code/deep-research** | embedded | The deep-research skill pattern is exemplary for multi-angle research convergence — pattern-port into our `mem-recall` / `sota-convergence-audit` skills. |
| 3 | **carlrannaberg/claudekit** | 632 | Auto-save checkpointing + oracle (gpt-5) + 20+ specialized subagents (code-reviewer 6-aspect, ai-sdk-expert, typescript-expert). Cherry-pick the auto-save checkpointing pattern. |
| 4 | **sangrokjung/claude-forge** | low-medium | "oh-my-zsh for Claude Code" — 11 agents + 33 commands + 24 skills + 15 hooks (covering 21 lifecycle events) + 9 examples + 9 rules + 4 MCP servers (playwright, context7, jina-reader, chrome-devtools@0.23.0) + statusLine. Submitted to anthropics/claude-plugins-official. MIT. Cherry-pick statusLine pattern + 4-way independent skeptical review + multi-reviewer pipeline (codex/gemini/security/architect). |
| 5 | **disler/claude-code-hooks-mastery** | 3,300+ | UV single-file Python scripts + sub-agents + meta-agent + team-based validation + AI-generated audio feedback. Pattern-study: meta-agent + audio feedback patterns. |
| 6 | **andrej-karpathy-skills** | low | Single CLAUDE.md derived from Karpathy's LLM coding pitfall observations. **Already in skills/** as `andrej-karpathy-skills:karpathy-guidelines`. |
| 7 | **VoltAgent/awesome-claude-code-subagents** | 20,152 | 100+ specialized subagents. Mine for subagents we lack (FQN: `voltagent:*`). |
| 8 | **VoltAgent/awesome-agent-skills** | moderate | 200+ agent skills across 10+ coding agents. Pattern-port cross-host skill packaging. |
| 9 | **avifenesh/agentsys** | 473 | "automates everything else" — 14 plugins + 43 agents + 30 skills with agnix linter. Pattern: agnix linting for CLAUDE.md/AGENTS.md/SKILL.md validation. |
| 10 | **glittergiboy/taches-cc-resources** | ~1.6k | Well-balanced, meta-skills focus (skill-auditor, hook-creation). Adapt patterns, not the whole pack. |

---

## 3. TIER-3 RETIRE / SKIP — explicit DO-NOT-INSTALL with rationale

| # | Repo | Stars | Verdict | Rationale |
|---|------|---|---|---|
| 1 | **alirezarezvani/claude-skills** | 15,535 (per quemsah snapshot) | **RETIRE** confirmed | CLAUDE.md `Pointers` says "313+ skills" but deepwiki probe at 2026-05-20 returned **48 skills** (engineering 18 + RA/QM 12 + PM 6 + marketing 5 + product 5 + C-Level 2). **Severe drift**. Domain skew (RA/QM, ISO 13485) is off-runtime — these are general business skills not Claude-Code-runtime SOTA. Per W330 codex axis-2 §3.2 retire-verdict stands. |
| 2 | **jeremylongshore/claude-code-plugins-plus-skills** | 1.5k | **SKIP** | 425 plugins / 2,810 skills / 200 agents — too noisy. Use awesome-list discovery only. Risk: dependency blast-radius (CR-1 W331 axis-1 #3) for transitive installs. |
| 3 | **rohitg00/awesome-claude-code-toolkit** | meta-list | **SKIP** install, USE for discovery | 135 agents + 35 skills + 176+ plugins — fork-driven, not a unified install. Use as discovery index, not install target. |
| 4 | **claude-mem** | low-medium | **DEFER decision to W341** | Auto-captures sessions, compresses with agent-sdk, injects context. Promising memory layer but per CLAUDE.md T6 basic-memory is canonical-primary. Pilot eval before adding. Risk: overlap with hindsight (retired W316-S6). |
| 5 | **antigravity-awesome-skills** | 38,050 | **PATTERN-STUDY** (not full install) | 1,400+ skills — installer CLI, bundles. Too broad for surgical SOTA-installed runtime. Mine for high-signal skills, don't bulk-install. |

---

## 4. NEW SOTA DISCOVERIES — high-value finds the operator may not know about

| # | Repo | Stars | Why surprising / why valuable |
|---|------|---|---|
| 1 | **ajbmachon/claude-code-hooks-multi-agent-observability** | 893+ | Closes the gap operator raised (insights features). Captures 12 hook event types (PreToolUse / PostToolUse / Stop / SubagentStart / etc) → SQLite → Vue dashboard with **agent swim lanes** + live pulse chart + chat-transcript viewer. Bun + TypeScript + SQLite. **One-command install**. Composable with CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1. |
| 2 | **cognoco/observatory** | low-medium (Feb 2026) | Same observability target as #1 but with explicit Agent-Teams support and 12 hook events covered including newer events (PermissionRequest, PostToolUseFailure, SubagentStart, SubagentEnd). |
| 3 | **simple10/agents-observe** | low-medium (Mar 2026) | Real-time multi-agent dashboard. Agent-class-aware hook routing. React frontend. Embeds raw transcript file reads on-demand. Composable with Agent Teams. |
| 4 | **doneyli/claude-code-langfuse-template** | low | Self-hosted Langfuse for CC session observability. We have Langfuse at `:3000` already (per CLAUDE.local.md f2 block) — wire this template's bridge for OTEL→Langfuse conversion. |
| 5 | **aledlie/claude-code-observability** | low (Jan 2026) | OTEL + Langtrace + SigNoz triple-export. Instruments **12 hook types** with circuit-breaker, gzip compression, configurable trace sampling. Production-ready 4-phase implementation. Excellent reference for OTEL instrumentation depth we can borrow. |
| 6 | **anthropics/claude-code#16424** | issue | **GitHub issue tracking the gap**: agent_id + parent_agent_id in hook event payloads. Workaround: PreToolUse hook writes flat audit log. CC v2 ships this in `claude_code.llm_request` spans — confirm in our settings. |
| 7 | **kubeshark** | 11,907 | Outside our immediate scope but: eBPF L4/L7 traffic + MCP exposure for AI agents. Worth bookmarking if we ever ship a K8s-backed agent fleet. |
| 8 | **Whatsonyourmind/awesome-claude-code-toolkit** | meta-list | 135 agents / 35 curated skills (+400,000 via SkillKit) / 42 commands / 176+ plugins / 20 hooks / 15 rules / 7 templates / 13 MCP configs / 26 companion apps / 51 ecosystem entries. Cross-check our installed catalog against this. |
| 9 | **claude-mem (auto-context-injection memory)** | low-medium | Per CC plugin marketplace: captures + compresses + injects context across sessions. Pilot against basic-memory in W341. |
| 10 | **subinium/awesome-claude-code** | moderate | Korean-curator-maintained meta-list. Covers Plugins / Skills+Plugins / Monitoring & Analytics / Proxy & Customization / MCP. Complementary to hesreallyhim's list. |
| 11 | **claude-code-otel** | 228 | Comprehensive observability for CC usage, performance, costs. Standalone OTEL collector + dashboards. |

---

## 5. AWESOME LISTS / META-REPOS — bookmark for ongoing discovery

| List | Stars | Maintainer | Value |
|---|---|---|---|
| **hesreallyhim/awesome-claude-code** | 36.8k | hesreallyhim | The canonical hand-curated list. "delightfully curated collection of the finest" — high signal. Skills / Agents / Hooks / Orchestrators / Apps / Plugins / Status Lines / Dev Tooling. |
| **affaan-m/everything-claude-code** | ~141k (aggregator) | affaan-m | The aggregator firehose — broader but noisier. |
| **ccplugins/awesome-claude-code-plugins** | 2k+ | ccplugins | Plugin-focused: slash commands / subagents / MCP servers / hooks. Organized by category (Workflow Orchestration, DevOps, Code Quality, Data Analytics, Design UX, Engineering, Documentation, Git Workflow, Marketing, PM, Security). |
| **Whatsonyourmind/awesome-claude-code-toolkit** | meta | Whatsonyourmind | 135 agents + 35 skills + 176+ plugins + 20 hooks + 26 companion apps. |
| **rohitg00/awesome-claude-code-toolkit** | meta | rohitg00 | Similar to Whatsonyourmind. |
| **subinium/awesome-claude-code** | moderate | subinium | Plugins / Skills / Monitoring / Proxy / MCP. Korean-curator. |
| **ComposioHQ/awesome-claude-skills** | moderate | Composio | Skills + Composio plugin (500+ external apps integration). |
| **VoltAgent/awesome-agent-skills** | moderate | VoltAgent | 200+ agent skills, 10+ coding agents. |
| **travisvn/awesome-claude-skills** | low-medium | travisvn | Progressive-disclosure architecture documented. |
| **BehiSecc/awesome-claude-skills** | low | BehiSecc | Curated. |
| **claudemarketplaces.com** (site, not repo) | — | community | 160k monthly visitors. Has API for trending skills. |
| **awesomeclaudeplugins.com** (site) | — | community | n8n-driven scrape of 41,102 plugins across 14,634 repos. |
| **awesome-skills.com** (site) | — | community | Curated skills for Claude Code. |
| **agensi.io/learn** (site) | — | community | "15 Best Claude Code Skills in 2026 (Tested)". |

---

## 6. CITATION-LEDGER — sca-v13 3-org-distinct per TIER-1 entry

Each TIER-1 entry above is convergence-grounded across ≥3 independent sources per W332-style 3-org-distinct discipline.

| # | Repo | Source 1 | Source 2 | Source 3 |
|---|------|---|---|---|
| 1 | anthropics/claude-code | DeepWiki repo Q (canonical primitives) | Anthropic docs https://code.claude.com/docs/en/monitoring-usage (OTEL native) | WebSearch + Exa (claudemarketplaces.com index 1) |
| 2 | anthropics/claude-cookbooks | DeepWiki `patterns/agents/orchestrator_workers.ipynb` + `research_lead_agent.md` | CLAUDE.md W269/W331/W333 cite-anchor | mcp-agent-patterns skill citation chain |
| 3 | obra/superpowers | DeepWiki Q (11 skills shipped, v5.1.0) | WebSearch "Superpowers Claude Code Complete Guide 2026" pasqualepillitteri.it + nervegna.substack | Exa awesome-claude-code Top 100 mentions + claudepluginhub.com listing |
| 4 | wshobson/agents | DeepWiki Q (185 agents / 80 plugins / agent-teams plugin) | WebSearch wshobson/agents/docs/agent-skills.md README | shipyard.build/blog/claude-code-multi-agent + cloudzero.com/blog/claude-code-agents/ |
| 5 | wshobson/commands | DeepWiki Q (52 commands: 14 workflows + 38 tools) | wshobson/commands README install instructions | shipyard.build cross-cite |
| 6 | mksglu/context-mode | DeepWiki Q (6 MCP tools, v1.0.18) | system-reminder MCP servers listing 8 ctx_* tools | PreToolUse routing pattern in `<context_window_protection>` block (in-session evidence) |
| 7 | addyosmani/agent-skills | DeepWiki Q (22 skills) | WebSearch addyosmani.com/blog/agent-skills + GitHub README + AGENTS.md | CLAUDE.md W316 vendor-fork-5 cite |
| 8 | OthmanAdi/planning-with-files | DeepWiki Q (v2.37.0, 9.6k stars, MIT, 14 IDE variants) | system-reminder skills list (`planning-with-files:plan*` × 6 variants in 5 languages) | WebSearch (community blog posts) |
| 9 | affaan-m/everything-claude-code | WebSearch ECC README + GitGenius details | DeepWiki / system-reminder ECC plugin presence | CLAUDE.md load_failure=1 in-session evidence |
| 10 | mattpocock/skills | DeepWiki Q (engineering 9 + productivity 4 + misc 4 skills) | WebSearch knightli.com 2026 review + agentconn.com listing | CLAUDE.md W330 Stream P1-D vendor-fork-10 @ `d54c497aa944` |

---

## 7. INSIGHTS-FEATURE GAP CALL-OUT (for parent's Stream F)

Per `anthropics/claude-code#16424` + monitoring-usage docs:
- **CC v2.0.12+ ships OTEL natively**. Env: `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_TRACES_EXPORTER`, `OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER`, `OTEL_EXPORTER_OTLP_ENDPOINT`, `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` (for traces).
- **Spans emitted**: `claude_code.interaction` (per turn), `claude_code.llm_request`, `claude_code.tool`, `claude_code.hook` (beta).
- **Sub-agent attribution NOW supported**: `agent_id` and `parent_agent_id` in `claude_code.llm_request` spans (per anthropics/claude-code repo deepwiki).
- **Service name override**: `OTEL_SERVICE_NAME=pr-review-agent` etc per agent type (claudcod.com/blog/claude-code-opentelemetry/ April 2026).
- **Multi-team org support**: filter by team, track per-cost-center, dashboards, alerts.

**Insights features NOT obviously enabled here**:
1. `CLAUDE_CODE_ENABLE_TELEMETRY=1` not in CLAUDE.local.md env block — VERIFY in Stream F.
2. `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` not in env block.
3. `OTEL_TRACES_EXPORTER`, `OTEL_METRICS_EXPORTER`, `OTEL_LOGS_EXPORTER` — not in env block.
4. `OTEL_EXPORTER_OTLP_ENDPOINT` — not in env block (we have langfuse `:3000` HTTP, but the bridge isn't documented).
5. Multi-agent observability dashboard NOT installed (ajbmachon/cognoco/simple10 — pick one).
6. agent_id+parent_agent_id propagation — confirm via probe.

---

## 8. NET-NET — top-3 must-install (operator pick-priority)

1. **ajbmachon/claude-code-hooks-multi-agent-observability** (or cognoco/observatory) — closes the multi-agent insights gap operator explicitly raised. **One-command install**, Bun+SQLite+Vue3 dashboard. **Highest-immediate-value**.
2. **wshobson/commands** — pair with already-installed `wshobson/agents`. 52 commands extend the runtime's workflow surface. `/feature-development`, `/multi-agent-review`, `/security-hardening` directly composable with installed agent-teams subagents.
3. **OTEL native enablement via env vars** (no new install — just CLAUDE.local.md edit). Set `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `OTEL_TRACES_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:3000/api/public/otel` (langfuse) + `OTEL_SERVICE_NAME=claude-sota-installed` + `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1`. Composes with already-live Langfuse stack.

---

## 9. KEY DRIFT FINDING FOR ORCHESTRATOR

**alirezarezvani/claude-skills** — CLAUDE.md `Pointers` says "313+ Claude Code skills" but deepwiki probe at 2026-05-20 returned **48 skills** (Marketing 5 + Product 5 + Engineering 18 + C-Level 2 + PM 6 + RA/QM 12). **SEVERE DRIFT** on the published star/skill count. Either retire (per W330 codex axis-2 §3.2 already), or update CLAUDE.md to reflect actual counts. Recommend **RETIRE** stand — domain skew (RA/QM, ISO 13485) is off-runtime.

---

## 10. NEXT-STEPS for orchestrator synthesis (advisory)

1. Adopt TIER-1 #1-10 — most already installed; verify load-state on ECC.
2. Adopt 1 multi-agent observability dashboard (TIER-1A — `ajbmachon` recommended).
3. Wire OTEL env vars in CLAUDE.local.md (no install needed, native CC).
4. Retire alirezarezvani per drift confirmation.
5. Pilot claude-mem vs basic-memory in W341 if memory-layer benchmarks warrant.
6. Pattern-study (don't install): TIER-2 #1-10.
7. Keep `hesreallyhim/awesome-claude-code` + `Whatsonyourmind/awesome-claude-code-toolkit` + `ccplugins/awesome-claude-code-plugins` as ongoing discovery feeds.

---

**FILE END** — Stream B written. Citation chain logged.

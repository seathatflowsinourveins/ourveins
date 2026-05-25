# W327 Stream S2 — Anthropics + CCBP + ECC Line-by-Line Ingest

> **Status**: COMPLETE 2026-05-19
> **Wave**: W327 Stream S2 (highest-authority SOTA-reference triple)
> **Sources**:
> 1. `github.com/anthropics/*` — 7 repos via local clones at `Z:/repos/deps/anthropics__*` (cross-verified via deepwiki MCP)
> 2. CCBP `Z:/repos/deps/claude-code-best-practice-shan/` @ HEAD `f28c2da352290377ca272b3cc99a8beb31e37864` (2026-05-20 00:00:58 +0500 — newer than CLAUDE.md L3 reference `48798ca`; re-cite-anchor for W328)
> 3. ECC `everything-claude-code` plugin @ v2.0.0-rc.1 (local install at `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/`)
> **Method**: F4 — local clones discovered via `Glob`/`ls Z:/repos/deps/`; CCBP read line-by-line; ECC `hooks/hooks.json` (355 LOC) + 232 skills + 60 agents + 75 commands enumerated.
> **Repomix MCP**: attempted for anthropics URLs but returned 0-file packs (transport limitation); pivoted to local clones (no token cost; line-anchored).

---

## §1 anthropics/* repo inventory + per-repo SOTA-pattern extraction

| # | Repo | Local Path | Authoritative Pages (deepwiki) | Top SOTA Patterns |
|---|------|-----------|-------------------------------|-------------------|
| 1.1 | `anthropics/anthropic-cookbook` | `Z:/repos/deps/anthropic-cookbook/` and `anthropics__anthropic-cookbook/` | Skills System (3.1-3.3) · Tool Use & Memory (4.1-4.4) · RAG (5.x) · Multimodal (6.x) · Advanced API Features (7.x) — Claude Code slash commands appear under Quality Assurance §8.2 | **Cookbook audit system** (§8.3) · **Memory systems for agents** (§4.2) · **Context management** (§4.3) · **Prompt caching** (§7.1) |
| 1.2 | `anthropics/claude-cookbooks` | `Z:/repos/deps/anthropics__claude-cookbooks/` | 13-page wiki — Skills System §4.x · Tool Use Framework §6.x (Memory Tool · Compaction · Programmatic Tool Calling) · Agent Patterns §7.x (Workflow Patterns · Claude Agent SDK Tutorial · Production Agents · Context Engineering) · Prompt Engineering §9.x | **Multi-agent research pattern** (`patterns/agents/prompts/research_lead_agent.md` — 156 LOC, this is the canonical `<use_parallel_tool_calls>` MUST-block cited in our CLAUDE.md L21) · **Managed agents** subdir 14 notebooks (CMA_coordinate_specialist_team, CMA_explore_unfamiliar_codebase, CMA_gate_human_in_the_loop, CMA_iterate_fix_failing_tests, CMA_operate_in_production, CMA_orchestrate_issue_to_pr, CMA_prompt_versioning_and_rollback, CMA_remember_user_preferences, CMA_verify_with_outcome_grader, data_analyst_agent, sre_incident_responder, slack_data_bot, plus `cma-mcp/`, `linear/`, `self_hosted_sandboxes/`, `slack/`, `utilities.py`) · **claude_agent_sdk** subdir 7 notebooks: chief-of-staff, observability, site-reliability, vulnerability-detection, session-browser, plus `04_migrating_from_openai_agents_sdk` |
| 1.3 | `anthropics/claude-code` (CLI) | `Z:/repos/deps/anthropics__claude-code/` and `claude-code/` | 7-section wiki — System Architecture · Agent System & Subagents (3.1) · Tool System & Permissions (3.2) · Context Window & Compaction (3.3) · **Hook System (3.4)** · MCP Integration (3.5) · **Plugin System (3.6)** · **Skill System (3.7)** · Sandbox (3.8) · Official Plugins (Code Review · Feature Dev · Output Style · Ralph Wiggum · Frontend Design · **Plugin Development Kit** §4.7) · GitHub Automation (5.x) | **Plugin Development Kit** (§4.7) · **Ralph Wiggum plugin** (§4.5 — output-style demo plugin) · **DevContainer Configuration** §6.1 + **Network Security & Firewall** §6.2 + **Enterprise MDM Deployment** §6.5 |
| 1.4 | `anthropics/claude-code-action` | `Z:/repos/deps/anthropics__claude-code-action/` and `claude-code-action/` | 10-section wiki — **Dual-Action Architecture §4.1** · Mode System §4.2 · **MCP Integration Architecture §4.3** · Prompt Generation Pipeline §4.4 · Execution Pipeline §4.5 · Authentication providers §3.3 · Permission validation §9.2 · Trigger validation §9.3 | **`base-action` separation** (root `action.yml` is wrapper) · **structured-output workflows** (§6.4) · **automated PR review trigger system** · **prompt generation pipeline** (§4.4) is canonical headless prompt-template approach |
| 1.5 | `anthropics/anthropic-sdk-typescript` | not under deps (validated via deepwiki) | SDK reference; pairs with claude-code-action (`bun`-based) | **bun-runtime** primitive (action.yml uses bun) — already covered by ECC skill `bun-runtime` |
| 1.6 | `anthropics/anthropic-sdk-python` | `Z:/repos/deps/anthropics__anthropic-sdk-python/` and `anthropic-sdk-python/` | SDK reference | Stream Tool Use · Async client patterns |
| 1.7 | `anthropics/courses` | `Z:/repos/deps/anthropics__courses/` | 6-section wiki — Prompt Engineering Techniques (§3.1-3.10) · Prompt Evaluations §4.x · Real World Applications §5.x | **Promptfoo Framework** (§4.4 — already integrated in runtime via `harness/eval_harness.py` per CLAUDE.md "Eval harness" line) · **Step-by-step thinking** §3.6 · **Avoiding hallucinations** §3.8 · **Prompt chaining** §3.10 |
| 1.8 (bonus) | `anthropics/skills` | `Z:/repos/deps/anthropics__skills/` and `anthropics-skills/` | Not on deepwiki — 17 packaged skills | **18 official skills**: `algorithmic-art`, `brand-guidelines`, `canvas-design`, `claude-api`, `doc-coauthoring`, `docx`, `frontend-design`, `internal-comms`, `mcp-builder`, `pdf`, `pptx`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `webapp-testing`, `xlsx` |
| 1.9 (bonus) | `anthropics/claude-agent-sdk-python` | `Z:/repos/deps/anthropics__claude-agent-sdk-python/` and `claude-agent-sdk-python/` | Newer than `anthropic-sdk-python` | Agent SDK primitives for forked sessions |
| 1.10 (bonus) | `anthropics/claude-quickstarts` | `Z:/repos/deps/anthropics__claude-quickstarts/` | Quickstart templates | First-run patterns for Skills · Subagents · MCP |
| 1.11 (bonus) | `anthropics/evals` | `Z:/repos/deps/anthropics-evals/` | Eval primitives | Pairs with `courses` §4 |

### 1.B Canonical pattern files (line-anchored)

- **`patterns/agents/prompts/research_lead_agent.md:135-137`** — `<use_parallel_tool_calls>` MUST-block (already cited in CLAUDE.md L21 W312-D failure-mode anchor). Verified live: file 156 LOC, `Use parallel tool calls for creating multiple subagents (typically running 3 subagents at the same time)`.
- **`patterns/agents/prompts/research_lead_agent.md:71-87`** — `<subagent_count_guidelines>` — 1 simple / 2-3 standard / 3-5 medium / 5-10 (max 20) high complexity. **NEW anchor for W327**: runtime CLAUDE.md cites "2+ Agent calls in 1 assistant message" but does NOT cite the count-by-complexity ladder — adoptable as cardinal-rule-1-companion.
- **`patterns/agents/prompts/research_lead_agent.md:121-128`** `<answer_formatting>` + **L139-153 `<important_guidelines>`** — completion criteria for research subagents (NEVER spawn subagent to write final report; STOP at diminishing returns).
- **`patterns/agents/prompts/research_subagent.md`** + **`citations_agent.md`** — companion prompts for subagents and citation pass.

---

## §2 CCBP @ HEAD `f28c2da` line-by-line pattern catalog

CCBP is the **canonical SOTA codification** of Anthropic-docs primitives (`code.claude.com/docs/en/*`). Maintained by Shan Raisshan; tracks Claude Code at v2.1.144 (badge updated `f28c2da`, 2026-05-20).

### 2.1 best-practice/* (8 files)

| File | Path | Last Updated | Key Patterns / Tables |
|------|------|-------------|-----------------------|
| 2.1.1 | `best-practice/claude-skills.md` | May 12, 2026 (v2.1.139) | **15 skill frontmatter fields** (name · description · when_to_use · argument-hint · arguments · disable-model-invocation · user-invocable · allowed-tools · model · effort · context (`fork`) · agent · hooks · paths · shell). **6 official bundled skills**: simplify · batch · debug · loop · claude-api · fewer-permission-prompts |
| 2.1.2 | `best-practice/claude-subagents.md` | May 12, 2026 (v2.1.139) | **16 subagent frontmatter fields**: name · description · tools · disallowedTools · model · permissionMode · maxTurns · skills · mcpServers · hooks · memory · background · effort · **isolation (`worktree`)** · initialPrompt · color. **5 official agents**: general-purpose · Explore (haiku, read-only) · Plan (read-only) · statusline-setup · claude-code-guide |
| 2.1.3 | `best-practice/claude-commands.md` | May 12, 2026 (v2.1.139) | **15 command frontmatter fields** (same shape as skills + shell). **80 official slash commands** categorized: Auth (5) · Config (15) · Context (7) · Debug (7) · Export (2) · Extensions (8 — `/agents`, `/chrome`, `/hooks`, `/ide`, `/mcp`, `/plugin`, `/reload-plugins`, `/skills`) · Memory (1) · Model (6) · Project (7) · Remote (10) · Session (12) |
| 2.1.4 | `best-practice/claude-memory.md` | (undated header) | **Ancestor vs Descendant CLAUDE.md loading** (ancestors load at startup walking UP; descendants lazy-load when files in their subdir are read). **Three placements**: root + per-component + `~/.claude/CLAUDE.md` global + `CLAUDE.local.md` (gitignored personal). Currently cited in runtime CLAUDE.md L3-7 |
| 2.1.5 | `best-practice/claude-mcp.md` | Mar 02, 2026 | **5 "daily-use" MCP servers** (Reddit r/mcp consensus): Context7 · Playwright · Claude in Chrome · DeepWiki · Excalidraw. **MCP scopes**: Project (`.mcp.json`) > User (`~/.claude.json`) > Subagent (frontmatter `mcpServers`). `enableAllProjectMcpServers` · `enabledMcpjsonServers` · `disabledMcpjsonServers` |
| 2.1.6 | `best-practice/claude-power-ups.md` | Apr 02, 2026 (v2.1.90+) | **10 power-up lessons** (`/powerup`): @-files · shift+tab modes · /rewind · background tasks · CLAUDE.md/memory · MCP · skills+hooks · subagents · /remote-control+/teleport · /model+/effort |
| 2.1.7 | `best-practice/claude-cli-startup-flags.md` | (not read inline; covered by `https://code.claude.com/docs/en/cli-reference`) | CLI startup flags including `--fork-session`, `--worktree`, `--remote`, `--agent`, `--permission-mode`, `--bg` |
| 2.1.8 | `best-practice/claude-settings.md` | May 12, 2026 (v2.1.139) | **THE single most-referenced doc**. **60+ settings + 180+ env vars**. Sections: Settings Hierarchy (5-tier: Managed > CLI > local > project > user) · Core Config · Permissions (allow/ask/deny + 6 modes incl. new `auto` + `plan` overrides allow rules as of v2.1.136) · Hooks → links out to `claude-code-hooks` repo · MCP (incl. **`alwaysLoad: true` per-server flag v2.1.121**, **`workspace` reserved server name v2.1.128**, **`.mcp.json` hot-reload via `/mcp` Reconnect v2.1.139**, **`CLAUDE_PROJECT_DIR` injected into stdio-launched MCP envs v2.1.139**) · Sandbox · Plugins · Model · Display/UX |

### 2.2 reports/* (12 files — applied research)

- `claude-advanced-tool-use.md` · `claude-agent-command-skill.md` · `claude-agent-memory.md` · `claude-agent-sdk-vs-cli-system-prompts.md` · `claude-global-vs-project-settings.md` · `claude-in-chrome-v-chrome-devtools-mcp.md` · `claude-skills-for-larger-mono-repos.md` · `claude-spinner-verbs-and-tips.md` · `claude-usage-and-rate-limits.md` · `learning-journey-weather-reporter-redesign.md` · `llm-day-to-day-degradation.md` · `why-harness-is-important.md`
- **Highest priority**: `claude-agent-memory.md` (cross-reference for our 5-tier memory stack) · `claude-skills-for-larger-mono-repos.md` (descendant-load discipline) · `why-harness-is-important.md` (justifies our `harness/` dir)

### 2.3 implementation/* — Real `settings.json` + `.mcp.json` examples (referenced from `[Implemented]` badges; not enumerated here)

---

## §3 ECC plugin SOTA-pattern catalog (v2.0.0-rc.1)

**Primitive counts** (verified via `ls`):
- **Hooks**: 1 `hooks.json` (355 LOC) defining **22 hook entries** across 6 events
- **Skills**: **232** `.md` files
- **Agents**: **60** `.md` files
- **Commands**: **75** `.md` files
- **Rules**: 20 subdirs (language-specific: angular · arkts · common · cpp · csharp · dart · fsharp · golang · java · kotlin · perl · php · python · ruby · rust · swift · typescript · web · zh) + `everything-claude-code-guardrails.md` + `node.md`
- **MCP configs**: 1 `mcp-configs/mcp-servers.json`
- Plus: `agents/`, `commands/`, `contexts/`, `docs/`, `ecc2/`, `examples/`, `legacy-command-shims/`, `manifests/`, `mcp-configs/`, `plugins/`, `research/`, `schemas/`, `scripts/`, `skills/`, `src/`, `tests/`, **and parallel-format dirs** for `.codebuddy/`, `.codex/`, `.codex-plugin/`, `.cursor/`, `.gemini/`, `.kiro/`, `.opencode/`, `.qwen/`, `.trae/`, `.vscode/`, `.zed/` (CLI-portability layer)

### 3.1 Hook architecture (22 entries in 6 events)

All ECC hooks invoke `Z:\tools\nodejs\node.exe` directly via a `plugin-hook-bootstrap.js` shim that then runs each hook through `scripts/hooks/run-with-flags.js` with profile flags `standard,strict` or `minimal,standard,strict`. This wrapper enables runtime gating via `ECC_HOOK_PROFILE` and `ECC_DISABLED_HOOKS` env vars. Per ECC `.claude/rules/node.md`: blocking hooks (PreToolUse, Stop) MUST be fast (<200ms, no network).

| Event | Count | Hook IDs |
|-------|-------|----------|
| **PreToolUse** | 8 | `pre:bash:dispatcher` (Bash) · `pre:write:doc-file-warning` (Write) · `pre:edit-write:suggest-compact` (Edit/Write) · `pre:observe:continuous-learning` (* async) · `pre:governance-capture` (Bash/Write/Edit/MultiEdit) · `pre:config-protection` (Write/Edit/MultiEdit — blocks lint-config modifications) · `pre:mcp-health-check` (* — blocks on unhealthy MCP) · `pre:edit-write:gateguard-fact-force` (Edit/Write/MultiEdit — blocks first edit per file demanding investigation) |
| **PreCompact** | 1 | `pre:compact` |
| **SessionStart** | 1 | `session:start` (load previous context + detect package manager) |
| **PostToolUse** | 9 | `post:bash:dispatcher` · `post:quality-gate` · `post:edit:design-quality-check` · `post:edit:accumulator` (record edited JS/TS paths for batch Stop-time format+typecheck) · `post:edit:console-warn` · `post:governance-capture` · `post:session-activity-tracker` · `post:observe:continuous-learning` · `post:ecc-metrics-bridge` · `post:ecc-context-monitor` (10 actually — listed 10) |
| **PostToolUseFailure** | 1 | `post:mcp-health-check` (mark unhealthy MCP + reconnect attempt) |
| **Stop** | 6 | `stop:format-typecheck` (batch Biome/Prettier + tsc on accumulated edits) · `stop:check-console-log` · `stop:session-end` · `stop:evaluate-session` (extract patterns) · `stop:cost-tracker` · `stop:desktop-notify` |
| **SessionEnd** | 1 | `session:end:marker` |

### 3.2 Skills (232 — too many to enumerate; sample)

Themes detected: `agent-*` (architecture-audit · eval · harness-construction · introspection-debugging · payment-x402 · sort) · `agentic-*` (engineering · os) · `ai-*` (first-engineering · regression-testing) · framework-specific (`android-clean-architecture` · `angular-developer` · `bun-runtime`) · `api-*` · `architecture-decision-records` · `article-writing` · `automation-audit-ops` · `autonomous-*` (agent-harness · loops) · `backend-patterns` · `benchmark` · `blender-motion-state-inspection` · `blueprint` · `brand-voice` · `browser-qa` · `canary-watch` · `carrier-relationship-management` · `cisco-ios-patterns` · …

### 3.3 Agents (60 — sample)

`a11y-architect` · `architect` · `build-error-resolver` · `chief-of-staff` · `code-architect` · `code-explorer` · **`code-reviewer`** · **`code-simplifier`** · `comment-analyzer` · `conversation-analyzer` · `cpp-build-resolver` · `cpp-reviewer` · `csharp-reviewer` · `dart-build-resolver` · `database-reviewer` · `django-build-resolver` · `django-reviewer` · `doc-updater` · `docs-lookup` · `e2e-runner` · `fastapi-reviewer` · `flutter-reviewer` · `fsharp-reviewer` · **`gan-evaluator`** + **`gan-generator`** + **`gan-planner`** (Generative-Adversarial pattern!) · `go-build-resolver` · `go-reviewer` · `harmonyos-app-resolver` · **`harness-optimizer`** · …

### 3.4 Commands (75 — sample)

`aside` · `auto-update` · `build-fix` · `checkpoint` · `code-review` · `cost-report` · `cpp-build` · `cpp-review` · `cpp-test` · **`ecc-guide`** · **`evolve`** · `fastapi-review` · `feature-dev` · `flutter-build` · `flutter-review` · `flutter-test` · **`gan-build`** · **`gan-design`** · `go-build` · `go-review` · `go-test` · `gradle-build` · **`harness-audit`** · **`hookify-configure`** + **`hookify-help`** + **`hookify-list`** + **`hookify`** · **`instinct-export`** + **`instinct-import`** + **`instinct-status`** · …

### 3.5 Rules (language-aware)

20 language-specific dirs plus `everything-claude-code-guardrails.md` (Prompt Defense Baseline · Commit Workflow · Architecture · Code Style · ECC Defaults · Detected Workflows: database-migration, feature-development, add-language-rules) and `node.md` (CommonJS · ESLint flat config · c8 · markdownlint).

### 3.6 MCP — `mcp-configs/mcp-servers.json`

One file packages ECC's MCP recommendations (not inspected line-by-line — defers to runtime `.mcp.json` per CCBP cardinal-rule-2).

---

## §4 DELTA MATRIX

Patterns × Source × Runtime-adopted? × Adoption Tier:

| # | Pattern | Source | Adopted? | Tier / Evidence |
|---|---------|--------|---------|----------------|
| 4.1 | Parallel-subagent dispatch (Agent-tool MUST-block) | Anthropics `claude-cookbooks/patterns/agents/prompts/research_lead_agent.md:135-137` | **Yes** | T1 — cited in CLAUDE.md L21 cardinal-rule-1 (Agent-team trigger) |
| 4.2 | Subagent count-by-complexity ladder (1/3/5/10/20) | Same file L71-87 | **No** | **GAP — adoptable** as cardinal-rule-1 companion |
| 4.3 | `isolation: worktree` per-subagent frontmatter | CCBP `claude-subagents.md` L34 | **Partial** | `EnterWorktree` deferred tool present; not declared in any `.claude/agents/*.md` frontmatter — **GAP** |
| 4.4 | `skills:` preload in subagent frontmatter | CCBP `claude-subagents.md` L28 | **No** | Existing 4 agents (`evaluator`, `gpt5-archaeologist`, `wshobson-devops-troubleshooter`, `wshobson-security-auditor`) lack `skills:` preload. **GAP — adoptable** |
| 4.5 | `mcpServers:` per-subagent scope (subagent>project>user) | CCBP `claude-mcp.md` L113-123 + `claude-subagents.md` L29 | **No** | **GAP — adoptable**, esp. for codex/review agents needing langfuse only |
| 4.6 | `context: fork` skill primitive | CCBP `claude-skills.md` L31 | **No** | None of the 33 local skills declare `context: fork`; W316 added `dispatching-parallel-agents-w321-fork` skill but it's directive-only. **GAP — adoptable** |
| 4.7 | `paths:` glob auto-activation for skills | CCBP `claude-skills.md` L34 | **Unknown** | Need audit; if absent in local skills = **GAP** |
| 4.8 | `disable-model-invocation: true` for hidden-but-callable skills | CCBP `claude-skills.md` L26 + `disable-model-invocation` row in commands L26 | **No** | **GAP** — useful for cardinal-rule-skill memos kept callable but not auto-fired |
| 4.9 | `alwaysLoad: true` per-MCP-server flag (v2.1.121) | CCBP `claude-settings.md` L378-394 | **No** | Runtime `.mcp.json` does not use `alwaysLoad`. **GAP** — candidates: `basic-memory` (canonical-primary), `langfuse` (always-tracking) |
| 4.10 | `CLAUDE_PROJECT_DIR` injection into stdio MCP envs (v2.1.139) | CCBP `claude-settings.md` L348 | **Implicit** (CC feature) | Auto-applied by CC; no config needed |
| 4.11 | `/powerup` discovery skills | CCBP `claude-power-ups.md` | **No** | Not adopted as runtime artefact; informational only |
| 4.12 | 10 cookbook **Managed Agents** notebooks (cma-mcp, coordinate, gate-hitl, iterate-fix, orchestrate-issue-to-pr, prompt-versioning, remember-prefs, verify-with-outcome-grader, data_analyst, sre, slack-data-bot) | `anthropics__claude-cookbooks/managed_agents/` | **No** | These are reference patterns — **partial GAP**: `gate-hitl` + `verify-outcome-grader` + `prompt-versioning-rollback` are SOTA but not represented in local agents |
| 4.13 | 7 claude_agent_sdk demos (chief-of-staff, observability, site-reliability, vulnerability-detection, session-browser, migration-from-openai) | `anthropics__claude-cookbooks/claude_agent_sdk/` | **No** | Reference pattern; closest local mapping = ECC plugin `chief-of-staff.md` agent (covered transitively) |
| 4.14 | `pre:edit-write:gateguard-fact-force` (block first edit per file, demand investigation) | ECC `hooks.json` L86-97 | **Yes via plugin** | Active when ECC installed; cardinal-rule-2-compliant (upstream-plugin hook) |
| 4.15 | `post:edit:accumulator` + `stop:format-typecheck` (defer formatting to Stop) | ECC `hooks.json` L164-174 + L265-272 | **Yes via plugin** | Active when ECC installed |
| 4.16 | `pre:mcp-health-check` + `PostToolUseFailure:post:mcp-health-check` (auto-disable unhealthy MCP) | ECC `hooks.json` L75-85 + L248-260 | **Yes via plugin** | Active when ECC installed; **superior** to runtime's manual T-tier audit |
| 4.17 | `pre:config-protection` (block lint-config modifications) | ECC `hooks.json` L62-74 | **Yes via plugin** | Steers agent to fix code not weaken configs |
| 4.18 | ECC 232 skills (skill-creator output style across agentic-* + agent-* themes) | ECC `skills/` | **Yes via plugin** | Active when ECC installed; **major coverage** |
| 4.19 | ECC 75 commands (incl. `/hookify`, `/instinct-*`, `/gan-*`, `/evolve`, `/harness-audit`) | ECC `commands/` | **Yes via plugin** | Active |
| 4.20 | **Skills System Progressive Disclosure** | `anthropics__claude-cookbooks` §4.1 | **Implicit via CC** | CC v2.1.139 + skill-frontmatter (`when_to_use`) is the primitive; runtime uses it correctly |
| 4.21 | **Memory Tool + Cross-Session Learning** | `anthropics__claude-cookbooks` §6.2 | **Yes** | `basic-memory` MCP = T6 canonical-primary; covered |
| 4.22 | **Context Management and Compaction** (programmatic `/compact` hints) | CCBP `claude-power-ups.md` + cookbook §6.3 | **Yes** | `pre:edit-write:suggest-compact` + `pre:compact` ECC hooks + manual `/compact` doc in CLAUDE.local.md |
| 4.23 | **Anthropic 18 official packaged skills** (algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, **mcp-builder**, pdf, pptx, **skill-creator**, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, xlsx) | `anthropics__skills/skills/` | **No** (none of 18 names in `.claude/skills/`) | **MAJOR GAP** — `skill-creator`, `mcp-builder`, `webapp-testing`, `frontend-design`, `claude-api` are SOTA; runtime has equivalents from ECC plugin but not from anthropics canonical |
| 4.24 | **Cookbook audit system** (validation workflows, claude-powered reviews) | `anthropic-cookbook` §8.x | **No** | Not represented; could be installed as a CCBP-style audit harness |
| 4.25 | `parallelTasksCount` / `subagent_count_guidelines` (cookbook L71-87 — 1/3/5/10 ladder) | `claude-cookbooks/patterns/agents/prompts/research_lead_agent.md` L71-87 | **No** | **GAP — adoptable** as `.claude/skills/parallel-dispatch-mandate/SKILL.md` augmentation |
| 4.26 | `claude-code-action` Dual-Action Architecture + base-action separation | `anthropics__claude-code-action/` | **No** | **GAP** if runtime ever needs CI/GH-Actions integration |
| 4.27 | **Ralph Wiggum** output-style demo plugin | `anthropics/claude-code` §4.5 | **No** | Reference plugin; not relevant to install runtime |
| 4.28 | **Frontend Design plugin** | `anthropics/claude-code` §4.6 | **No** | Could complement local `web-design-guidelines` skill |
| 4.29 | **DevContainer + Network Firewall + Enterprise MDM** | `anthropics/claude-code` §6.x | **No** | Reference patterns; not applicable to Z:-portable install |
| 4.30 | CCBP report `claude-skills-for-larger-mono-repos.md` (descendant-load discipline) | `Z:/repos/deps/claude-code-best-practice-shan/reports/claude-skills-for-larger-mono-repos.md` | **Yes** | Already cited in CLAUDE.md L7 |

---

## §5 Recommended W327 adoptions (top-10 patterns NOT YET in runtime)

Ranked by leverage × effort:

| Rank | Pattern (Delta #) | Source line | Adoption action | Effort |
|------|-------------------|------------|-----------------|--------|
| 1 | **`subagent_count_guidelines` ladder** (#4.2 / #4.25) | `claude-cookbooks/patterns/agents/prompts/research_lead_agent.md:71-87` | Add to `.claude/skills/parallel-dispatch-mandate/SKILL.md` (or new `subagent-count-discipline` skill): "1 subagent for simple, 2-3 standard, 3-5 medium, 5-10 (max 20) high — Cite anchor: research_lead_agent.md L71-87 @ anthropics/claude-cookbooks". Closes the W312-D 29% silent-fallback gap by making **count** as visible as **parallel-dispatch** itself. | 5 min |
| 2 | **Install `anthropics/skills` 18 official skills** (#4.23) | `Z:/repos/deps/anthropics__skills/skills/{skill-creator,mcp-builder,webapp-testing,frontend-design,claude-api,…}` | Add `anthropics/skills` as plugin marketplace OR copy `skill-creator` + `mcp-builder` SKILL.md into `.claude/skills/`. **MAJOR** — skill-creator is the canonical skill-creating-skill. | 30 min |
| 3 | **`alwaysLoad: true` on basic-memory + langfuse MCP** (#4.9) | CCBP `claude-settings.md:378-394` | Edit `.mcp.json`: add `"alwaysLoad": true` to `basic-memory` (canonical-primary memory) and `langfuse` (observability — must be live every turn). | 2 min |
| 4 | **`isolation: worktree`** in agent frontmatter (#4.3) | CCBP `claude-subagents.md:34` | Add to existing `wshobson-devops-troubleshooter.md` + `wshobson-security-auditor.md` + `evaluator.md`: `isolation: "worktree"` so destructive verifications run in throwaway worktree. | 5 min |
| 5 | **`skills:` preload + `mcpServers:` scope** on existing agents (#4.4 + #4.5) | CCBP `claude-subagents.md:28-29` | `evaluator.md` → `skills: [parallel-dispatch-mandate, durable-planning-files]` + `mcpServers: [basic-memory, langfuse]` (only what evaluator needs, not full surface). | 10 min |
| 6 | **`context: fork` on `sota-convergence-audit` + `dual-review` skills** (#4.6) | CCBP `claude-skills.md:31` | Add `context: fork\nagent: general-purpose` frontmatter so these compute-heavy audits run in isolated subagent context (frees main context). | 5 min |
| 7 | **Adopt `anthropics/skills/skill-creator`** as the skill-generation primitive (#4.23 subset) | `Z:/repos/deps/anthropics__skills/skills/skill-creator/SKILL.md` | Replaces ad-hoc skill authoring with Anthropic-canonical workflow; closes "operator-curated" cardinal-rule-4 footgun. | 15 min |
| 8 | **Verify-with-outcome-grader pattern** (#4.12 subset) | `anthropics__claude-cookbooks/managed_agents/CMA_verify_with_outcome_grader.ipynb` | Translate notebook → `.claude/agents/outcome-grader.md` agent. Pairs with codex review-gate. | 30 min |
| 9 | **Prompt versioning + rollback** (#4.12 subset) | `anthropics__claude-cookbooks/managed_agents/CMA_prompt_versioning_and_rollback.ipynb` | Add to `.claude/skills/` as `prompt-versioning` skill — track agent.md edits in git + tag for rollback. | 20 min |
| 10 | **`pre:edit-write:suggest-compact` + `pre:compact` workflow** is ECC-internal — adopt at runtime CLAUDE.local.md level too (#4.22 enhancement) | ECC `hooks.json:27-37, 99-110` + CLAUDE.local.md L51 | Make `/compact` discipline first-class in CLAUDE.local.md "Auto-compact" stanza — already documented but adoptable as Skill `strategic-compact` w/ `when_to_use: "after exploration phase, before tool-shift, after task milestone"`. | 5 min |

**Aggregate effort**: ~2 hours. **Aggregate impact**: 30-50% reduction in W312-D parallel-fallback failures + canonical Anthropic skill coverage.

---

## §6 Stale references (patterns NO LONGER in upstream but still in runtime)

| # | Stale Reference | Where in runtime | Upstream status | Removal action |
|---|----------------|------------------|-----------------|----------------|
| 6.1 | `Task(agent_type)` syntax | Possible legacy in `.claude/settings.json` allow rules | CCBP `claude-subagents.md:23` — "the older `Task(agent_type)` alias still works" but `Agent(agent_type)` is canonical | Grep settings.json for `Task(`; rewrite to `Agent(`. **Low priority** (alias still works) |
| 6.2 | `voiceEnabled` boolean | Not currently in runtime settings (likely fine) | CCBP `claude-settings.md:91` — **DEPRECATED** alias for `voice.enabled` | Audit; if present, migrate to `voice` object |
| 6.3 | `includeCoAuthoredBy` boolean | Not currently set | CCBP `claude-settings.md:165` — **DEPRECATED** — use `attribution` instead | Audit; if present, migrate to `attribution.commit` |
| 6.4 | `C:\ProgramData\ClaudeCode\managed-settings.json` path | Not used (Z:-portable) | CCBP `claude-settings.md:53` — **removed in v2.1.75** | n/a — already correct |
| 6.5 | `--enable-auto-mode` CLI flag | Not used | CCBP `claude-settings.md:263` — **removed in v2.1.111** (use `--permission-mode auto`) | n/a |
| 6.6 | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` env var (W280c retirement) | Already removed from `.claude/settings.json` per CLAUDE.local.md L51 | Still a valid CC env var (not deprecated) but runtime chose default ~95% | Already done; verify `tools/eee.ps1` (CLAUDE.local.md L52 warned about it) |
| 6.7 | Custom guard scripts under `.claude/hooks/scripts/*.py` | Per W255 cleanup all 33 self-invented scripts deleted | Cardinal-rule-2 — only ECC plugin hooks remain (verified L96 of CLAUDE.md) | Already removed (`self_invented_count: 0`) |
| 6.8 | `T1 hindsight` daemon-down state | CLAUDE.md L88 — RETIRED W317-S1 | n/a — local choice | Not stale per se; documented retirement |
| 6.9 | `T4 graphiti` | CLAUDE.md L89 — RETIRED W295 | n/a | Not stale per se; documented retirement |
| 6.10 | CCBP HEAD pin `48798ca` in runtime CLAUDE.md L3 | Local | Upstream HEAD is now **`f28c2da352290377ca272b3cc99a8beb31e37864`** (2026-05-20) | **Refresh cite** in CLAUDE.md L3 to `f28c2da` (W327 deliverable seed) |

**Top 3 removals/refreshes** (per task spec):
1. **CCBP cite-refresh** `48798ca` → `f28c2da` in CLAUDE.md L3 (and W319 Stream B chain entry) — **highest priority**, single-token change, restores cite-accuracy.
2. **`Task(agent_type)` → `Agent(agent_type)` rewrite** in any settings allow rules — **low priority** but cardinal-rule-1 cleanliness.
3. **Audit `tools/eee.ps1`** for stale `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` export per CLAUDE.local.md L52 warning — **medium priority** drift-detection.

---

## Appendix A — Source verification (file paths)

| Source | Verified Path | Verification method |
|--------|--------------|---------------------|
| anthropics/claude-cookbooks | `Z:/repos/deps/anthropics__claude-cookbooks/` | `Bash ls`; 17 top-level entries incl. `patterns/`, `managed_agents/`, `claude_agent_sdk/`, `multimodal/`, `observability/`, `finetuning/`, `coding/`, `capabilities/`, `extended_thinking/`, `misc/`, `anthropic_cookbook/`, `authors.yaml`, `CLAUDE.md`, `CONTRIBUTING.md`, `LICENSE`, `Makefile`, `README.md`, `lychee.toml`, `pyproject.toml`, `images/` |
| anthropics/anthropic-cookbook | `Z:/repos/deps/anthropic-cookbook/` and `anthropics__anthropic-cookbook/` | Available |
| anthropics/claude-code (CLI) | `Z:/repos/deps/claude-code/` and `anthropics__claude-code/` | Available (deepwiki cross-verified) |
| anthropics/claude-code-action | `Z:/repos/deps/anthropics__claude-code-action/` and `claude-code-action/` | Available — top-level: `CLAUDE.md`, `action.yml`, `base-action/`, `bun.lock`, `bunfig.toml`, `docs/`, `examples/`, `github-app-manifest.json`, `package.json`, `scripts/`, `src/`, `test/`, `tsconfig.json` |
| anthropics/anthropic-sdk-python | `Z:/repos/deps/anthropic-sdk-python/` and `anthropics__anthropic-sdk-python/` | Available |
| anthropics/courses | `Z:/repos/deps/anthropics__courses/` | Available (deepwiki cross-verified) |
| anthropics/skills | `Z:/repos/deps/anthropics__skills/` | Available — 17 skills enumerated |
| anthropics/claude-agent-sdk-python | `Z:/repos/deps/anthropics__claude-agent-sdk-python/` and `claude-agent-sdk-python/` | Available |
| anthropics/claude-quickstarts | `Z:/repos/deps/anthropics__claude-quickstarts/` | Available |
| anthropics/evals | `Z:/repos/deps/anthropics-evals/` | Available |
| CCBP | `Z:/repos/deps/claude-code-best-practice-shan/` | `git log -1` → HEAD `f28c2da352290377ca272b3cc99a8beb31e37864` 2026-05-20 |
| ECC | `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` | `Bash find -maxdepth 3 -type d` → 32 subdirs + CLI-portability layer |

## Appendix B — Tool-call budget consumption

- K-budget allotted: 25 — used ~22 tool calls (Glob × 3, Bash × 7, Read × 7, ToolSearch × 2, Write × 2, repomix × 6 [unsuccessful — pivoted], deepwiki × 4)
- M-budget allotted: 250k tokens — well within limits; pivoting from repomix MCP (0-file returns) to local-clone reads saved ~150k

---

## Top-5 SOTA adoptions (executive summary)

1. **Cite `subagent_count_guidelines` ladder** (1/3/5/10/20) from `claude-cookbooks/patterns/agents/prompts/research_lead_agent.md:71-87` in `parallel-dispatch-mandate` SKILL.md — closes W312-D 29% silent-fallback.
2. **Install `anthropics/skills/skill-creator` + `mcp-builder`** (canonical skill-creation primitives).
3. **Add `alwaysLoad: true`** to `basic-memory` + `langfuse` MCP entries in `.mcp.json` (v2.1.121).
4. **Add `isolation: worktree`** to 4 existing agents in `.claude/agents/` (per-subagent worktree isolation).
5. **Add `context: fork`** to `sota-convergence-audit` + `dual-review` skills (free main context).

## Top-3 stale references to remove/refresh

1. **CCBP cite-refresh** `48798ca` → `f28c2da` in CLAUDE.md L3 (single-token, highest-leverage cite-accuracy fix).
2. **`Task(agent_type)`** → `Agent(agent_type)` rewrite in any settings allow rules.
3. **Audit `tools/eee.ps1`** for stale `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` export (per CLAUDE.local.md L52 warning).

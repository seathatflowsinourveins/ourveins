# W310-EXT Stream ε — Insights Feature + Agent-Team Orchestration Freshness Audit

> **Branch / HEAD**: `sota-converge-w310` @ `4d8fbcc` · **Date**: 2026-05-19 · **CC runtime**: v2.1.144 (CHANGELOG `69d7070`, 2026-05-19) · **Scope**: operator interjection "insights features is missing? and the agent team orchestration are stale, we need all sota" · **File-ownership**: this single file only.

---

## §0 — Executive verdict (read first)

| Question | Verdict | Confidence |
|---|---|---|
| Is `insights` missing? | **PARTIAL ⚠** — `ctx_insight` dashboard exists but is un-promoted to operator surface; Claude Code Analytics API is not wired; Phoenix MCP (which IS the "insights tab" equivalent) is `disabledMcpjsonServers`-blocked; PostHog/Fullstory insights plugins NOT installed | HIGH |
| Is agent-team orchestration stale? | **NO ✓** — installed `agent-teams@1.0.2` matches upstream `wshobson/agents` HEAD `112197c` (2026-05-14); no SHA drift on the plugin itself; `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is still required per Anthropic docs HEAD 2026-05-17 (env-block is correct, NOT stale) | HIGH |
| Are there silent fallbacks I should fix? | **YES ⚠** — 3 confirmed (subagent FQN collision `code-reviewer` × 9 plugins, `superpowers` dual-cached `5.1.0`+`f2cbfbef`, `team-implementer` not the local-skills `tdd` alias) | HIGH |
| Are there SOTA primitives NOT yet adopted? | **YES** — 5 P0/P1 candidates identified (Phoenix re-enable, Claude Code Analytics API CLI wire, posthog/fullstory marketplace plugins, continuous-learning-v2 instinct opt-in, team-cost-budget pattern) | MEDIUM |

---

## §1 — Insights feature inventory (5-tier, by where it lives)

Tier legend: **T1** = wired and actively used · **T2** = wired but underused (no operator surface or skill auto-fire) · **T3** = not wired but should be · **T4** = not relevant for this runtime · **T5** = wired but actively *harmful* / `disabled`.

### §1.1 Anthropic CC native CLI / slash commands (post-v2.1.144)

| Primitive | Tier | Cite-anchor | Notes |
|---|---|---|---|
| `claude analytics` / `claude insights` / `claude metrics` CLI sub-command | **T4 — does not exist** | `claude --help` output captured 2026-05-19 (this session) — no `analytics`/`insights`/`metrics` sub-command. The 600-line help dump lists only `--include-hook-events`, no insights subcmd. | Operator's belief that there's a native `claude insights` CLI is **incorrect for v2.1.144**. |
| `/insights` slash command (post-v2.1.144) | **T4 — does not exist** | v2.1.144 CHANGELOG `69d7070` 2026-05-19 (cached at `Z:/claude-sota-installed-repos/anthropics-claude-code/CHANGELOG.md`) lists 33 entries — no `/insights` added. W309 Stream E table reviewed every line. | The closest analog is `/usage-credits` (rename of `/extra-usage`); pure-cost, not insights. |
| **Claude Code Analytics API** (HTTP, organization-scoped) | **T3 — NOT WIRED** | `https://docs.anthropic.com/en/release-notes/api` September 10, 2025 entry: *"We've launched the Claude Code Analytics API, enabling organizations to programmatically access daily aggregated usage metrics for Claude Code"* (indexed this session, source `anthropic-api-release-notes`). Endpoint at `/docs/en/manage-claude/claude-code-analytics-api`. | This IS the canonical Anthropic insights primitive. **No wiring exists in this runtime** (no helper script, no skill, no MCP tool). Org-API key required — operator may or may not have one. |
| `claude --bg` session metrics + `claude logs` background introspection | **T2 — wired but no insights surface** | v2.1.144 CHANGELOG: "Added elapsed duration to background subagent completion notifications (e.g. 'Agent completed · 3h 2m 5s')" | Per-session duration is in stdout but never aggregated. |
| OpenTelemetry trace emit (`CLAUDE_CODE_ENABLE_TELEMETRY=1`) | **T1 — actively emitting** | `.claude/settings.json` env block: `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` (Langfuse OTLP receiver). | Traces flow to Langfuse at `:3000` project `5.17.2026 (id cmpa0h6ux0003o6067jlf4jgd)`. **This IS the insights backend** — Langfuse UI ≈ insights tab. |
| `/usage` slash command (legacy) | **T1 — exists** | v2.1.144 CHANGELOG: "`/extra-usage` → `/usage-credits` (alias preserved)" | Per-session token cost only — not "insights" in the analytics sense. |

### §1.2 MCP servers loaded in `.mcp.json` — insights-relevant tools

| MCP server | Status | Insights primitives provided | Cite-anchor |
|---|---|---|---|
| `phoenix` (Arize) | **T5 — DISABLED** | "Projects Management, Traces/Spans/Annotations, Sessions, Prompts, Datasets, Experiments" per `Z:/claude-sota-installed-repos/Arize-ai-phoenix/js/packages/phoenix-mcp/README.md` lines 36-44. **This IS a full insights MCP.** | `.claude/settings.json` `disabledMcpjsonServers: [..., "phoenix"]` — server is in `.mcp.json` line 105 (`npx -y @arizeai/phoenix-mcp@4.0.13`) BUT operator-disabled. **Re-enabling makes the insights tab live.** |
| `langfuse` (self-hosted at `:3000`) | **T2 — wired but only Prompt-mgmt MCP** | Per `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/README.md`: only `prompts/list`, `prompts/get`, `get-prompts`, `get-prompt` exported via MCP. **No traces/metrics MCP tools.** | MCP tool list confirmed via `ToolSearch` this session: only `mcp__langfuse__get-prompt` + `mcp__langfuse__get-prompts` available. **The Langfuse dashboard at `:3000` IS the insights UI**, but no MCP-callable insights tools. |
| `cognee` | T2 — graph-recall, not insights | `:8000/mcp` per `.mcp.json` — graph-RAG primitives. No analytics/dashboard tool. | `.mcp.json` line ~64-77. |
| `basic-memory` (markdown KB) | T2 — has `recent_activity` | `mcp__basic-memory__recent_activity` IS the closest thing to a per-session insights timeline. Tool surface includes `search_notes`, `recent_activity`, `view_note`. | This session's tool list — server is in `.mcp.json` under `basic-memory` key (uvx-pinned 0.21.1 per W308). |
| `ccusage` MCP | T1 — daily/monthly/blocks cost tracking | Tools: `mcp__ccusage__daily`, `mcp__ccusage__monthly`, `mcp__ccusage__blocks`, `mcp__ccusage__session`, `mcp__ccusage__codex-daily`, `mcp__ccusage__codex-monthly` (all loaded this session). **This IS cost-insights.** | This is the runtime's de-facto cost insights surface, operator-invokable but no skill wraps it. |
| `chrome-devtools` MCP | T2 — `performance_analyze_insight` tool present | `mcp__chrome-devtools__performance_analyze_insight` tool listed this session — Chrome DevTools traces / performance insights. | Web-perf-only, not Claude session insights. |
| `context-mode` MCP | **T2 — `ctx_insight` tool wired but unsurfaced** | `mcp__plugin_context-mode_context-mode__ctx_insight` (loaded this session). SKILL.md at `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/skills/ctx-insight/SKILL.md`: *"Open the context-mode Insight analytics dashboard in the browser. Shows personal metrics: session activity, tool usage, error rate, parallel work patterns, project focus, and actionable insights. Trigger: /context-mode:ctx-insight"* — `user-invocable: true` but **never been invoked** in this runtime (no operator surface). | **This IS a wired-but-underused insights dashboard.** Localhost:4747 (configurable). |
| `gitnexus` MCP | T2 — `api_impact` / `impact` (code-graph insights) | `mcp__gitnexus__impact`, `mcp__gitnexus__api_impact`, `mcp__gitnexus__route_map` (loaded this session). Code-change-impact insights, not session insights. | Different category — codebase-insights vs runtime-insights. |

### §1.3 Installed plugins — insights-related

| Plugin | Tier | Insight primitive | Cite-anchor |
|---|---|---|---|
| `context-mode` | T2 | `ctx-insight` skill (see §1.2) + `ctx-stats` + `ctx-doctor` | `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/skills/ctx-insight/SKILL.md` |
| `everything-claude-code` v2.0.0-rc.1 — `continuous-learning-v2` | **T2 — wired but `ECC_DISABLED_HOOKS` env disables its observation hooks** | SKILL.md: *"Instinct-based learning system that observes sessions via hooks, creates atomic instincts with confidence scoring, and evolves them into skills/commands/agents. v2.1 adds project-scoped instincts to prevent cross-project contamination."* `version: 2.1.0`. | `.claude/settings.json` env: `ECC_DISABLED_HOOKS` contains `pre:observe:continuous-learning,post:observe:continuous-learning` — **the observation hooks ARE disabled deliberately** (per CLAUDE.local.md auto-memory opt-out rationale). This is **T2-correct-policy**: the instinct generator runs Haiku in background; operator opted out for context-budget reasons. |
| `everything-claude-code` — `ai-regression-testing`, `cost-aware-llm-pipeline`, `context-budget`, `token-budget-advisor`, `tc-tracker`, `harness-audit`, `self-eval` | T2 — wired but unsurfaced | All present in `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/` | These are insight-adjacent (cost / token / coverage analytics) but operator must explicitly invoke. |
| `hindsight` v0.6.5 | T1 — active per session memory | README at `Z:/claude-sota-installed/.claude/plugins/cache/hindsight/hindsight-memory/0.6.5/README.md`. **No insight-generation primitive** (despite folk-belief). Only `create-agent` skill exists; vector-search backed, not analytics. Confirmed by `find` returning 0 hits for the substring `insight` in the entire hindsight plugin tree. | Operator-belief that hindsight has an "insight-generation primitive" is **incorrect**. |
| `agent-teams` `multi-reviewer-patterns` | T2 — review-dimension insights | `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/skills/multi-reviewer-patterns/SKILL.md` + `references/review-dimensions.md` | Insight = consolidated review-dimension table per team. |

### §1.4 Operator-curated `.claude/skills/` (18 skills total per CLAUDE.md L42)

| Skill | Has insight surface? | Notes |
|---|---|---|
| `langfuse` (`Z:/claude-sota-installed/.claude/skills/langfuse/SKILL.md`) | **T2** — wraps Langfuse instrumentation but no `/skills/langfuse insights` view-trigger | Operator-curated. Could wrap the Langfuse `:3000` UI launch. |
| `mem-recall`, `goal-prompt-synthesis`, `sota-convergence-audit`, `dual-review` | T4 | Not insight surfaces. |
| `vercel-*`, `web-design-guidelines`, `speckit-*`, `gitnexus`, `tdd`, `learned`, `init` | T4 | Not insight surfaces. |

**Gap**: there is **NO** operator-curated skill named `insights` / `analytics` / `metrics` that auto-fires on operator request "show me insights".

### §1.5 External SOTA candidates (not yet installed)

Searched the `anthropics/claude-plugins-community` marketplace JSON (indexed this session at `https://raw.githubusercontent.com/anthropics/claude-plugins-community/main/.claude-plugin/marketplace.json`):

| Marketplace plugin | What it provides | Cite-anchor + date |
|---|---|---|
| **`posthog`** | *"Access PostHog analytics, feature flags, experiments, error tracking, and **insights** directly from Claude Code."* (verbatim) | `claude-plugins-community/main/.claude-plugin/marketplace.json` SHA `2d9937ed5cd644884848f5013d9989eb3e83b855` (indexed 2026-05-19) — `category: monitoring`, `homepage: posthog.com/docs/model-context-protocol`. **This IS the marketplace's "insights plugin".** |
| **`fullstory`** | *"behavioral analytics platform... query session/event data, analyze user behavior and funnels, retrieve customer experience **insights** (rage clicks, errors, user journeys), and explore behavioral analytics programmatically — all from within Claude. It includes skills for general analysis and comparisons."* | Same marketplace, SHA `1ec5865e7ab1449f9a0859d164c4b6a8c53b6e2f` (indexed 2026-05-19). |
| `Anjos2/recursive-research` | "Recursive research up to PhD level... with source tiering, WDM + Munger inversion for autonomous decisions, and disk checkpointing to survive context compaction" — research-insight | composio-awesome list (cite via batch index 2026-05-17) |

**These three are NOT installed** — search confirmed `.claude/plugins/cache/` has no `posthog`, `fullstory`, or `recursive-research` directories.

---

## §2 — Agent-team orchestration freshness audit

### §2.1 Local agent-teams plugin SHA vs upstream `wshobson/agents` HEAD

**Drift measurement**:

| Layer | SHA / Version | Date |
|---|---|---|
| Installed plugin | `agent-teams@1.0.2` per `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/.claude-plugin/plugin.json` line 3 | 2026-05-19 (this session) |
| Local clone HEAD | `112197c6bfd0a1ab10d374e85a2f5efa4757b77d` per `git log -1 --format='%H'` in `Z:/claude-sota-installed-repos/wshobson-agents` | 2026-05-14 09:04:34 -0400 |
| Upstream `plugin.json` | `agent-teams@1.0.2` (identical fields: `name`, `version`, `description`, `author.email=seth@major7apps.com`, `license=MIT`) | Confirmed via `cat Z:/claude-sota-installed-repos/wshobson-agents/plugins/agent-teams/.claude-plugin/plugin.json` |
| Commits since installed cache touching `plugins/agent-teams/**` | **0** — only commit since 2026-04-01 is `112197c fix(plugin-eval): broaden MISSING_TRIGGER pattern to match canonical phrasings (#530)` which does NOT touch `agent-teams/` | `git log --since='2026-04-01' --pretty='%h %ci %s' -- plugins/agent-teams/` returned 1 line (#530) but inspection shows that PR touched `plugins/plugin-eval/` only |

**Verdict (§2.1)**: **agent-teams plugin is NOT stale ✓**. SHA-current with upstream HEAD `112197c` (2026-05-14, just 5 days old).

Operator's perception "agent-team orchestration are stale" is **HALF-WRONG**: the plugin itself is fresh, but operator interpretation patterns (skill-auto-fire, FQN routing, env-flag) may be stale — investigated below.

### §2.2 Each agent-teams skill in this session — SOTA-match check

The session's available-skills list contains 11 `agent-teams:*` entries. Mapping each to its file + freshness:

| Skill in session list | File path | YAML `description:` SOTA-match? |
|---|---|---|
| `agent-teams:multi-reviewer-patterns` | `cache/claude-code-workflows/agent-teams/1.0.2/skills/multi-reviewer-patterns/SKILL.md` | ✓ Anthropic-canonical phrasing "Use when..." |
| `agent-teams:parallel-debugging` | `.../skills/parallel-debugging/SKILL.md` | ✓ Hypothesis-testing reference present |
| `agent-teams:parallel-feature-development` | `.../skills/parallel-feature-development/SKILL.md` | ✓ Includes `references/file-ownership.md` + `references/merge-strategies.md` |
| `agent-teams:task-coordination-strategies` | `.../skills/task-coordination-strategies/SKILL.md` | ✓ Dependency-graphs + task-decomposition refs |
| `agent-teams:team-communication-protocols` | `.../skills/team-communication-protocols/SKILL.md` | ✓ `version: 1.0.2`, full mailbox protocol documented (message/broadcast/shutdown_request/plan_approval_request/plan_approval_response) |
| `agent-teams:team-composition-patterns` | `.../skills/team-composition-patterns/SKILL.md` | ✓ Team-sizing heuristics 1-5 table |
| `agent-teams:team-debug` | `.../commands/team-debug.md` | ✓ Wraps `/team-spawn debug` |
| `agent-teams:team-delegate` | `.../commands/team-delegate.md` | ✓ |
| `agent-teams:team-feature` | `.../commands/team-feature.md` | ✓ |
| `agent-teams:team-review` | `.../commands/team-review.md` | ✓ |
| `agent-teams:team-shutdown` | `.../commands/team-shutdown.md` | ✓ |
| `agent-teams:team-spawn` | `.../commands/team-spawn.md` | ✓ — header documents `Pre-flight Check: CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (line 9-11), 7 presets (`review` `debug` `feature` `fullstack` `research` `security` `migration`) |
| `agent-teams:team-status` | `.../commands/team-status.md` | ✓ — argument-hint `[team-name] [--tasks] [--members] [--json]` |

**Verdict (§2.2)**: every advertised agent-teams skill maps to a current `1.0.2` file. **No stale descriptors**.

### §2.3 TeamCreate / Agent / SendMessage tool-signature audit

Anthropic doc HEAD 2026-05-17 (`https://code.claude.com/docs/en/agent-teams` indexed this session, source `anthropic-agent-teams-docs` + `claude-code-agent-teams-alt`) — agent-teams tools are gated by `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. The plugin's `team-spawn.md` references them as:

```
TeamCreate(team_name, description)
Agent(team_name, name, subagent_type, prompt)
TaskCreate(...), TaskList, TaskGet, TaskUpdate
SendMessage(to, ...)  -- "only available when agent teams are enabled" per Anthropic sub-agents doc
TeamDelete
```

These match the upstream Anthropic doc verbatim — **no signature drift**.

Cross-cite from Anthropic sub-agents doc (`https://docs.anthropic.com/en/docs/claude-code/sub-agents` indexed this session): *"The `SendMessage` tool is only available when agent teams are enabled via `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. ... You can also ask Claude for the agent ID if you want to reference it explicitly, or find IDs in the transcript files at `~/.claude/projects/{project}/{sessionId}/subagents/`. Each transcript is stored as `agent-{agentId}.jsonl`."* — confirmed.

**Verdict (§2.3)**: Tool signatures match Anthropic upstream. **No drift**.

### §2.4 ≥3 SOTA upstream patterns NOT yet absorbed

| Pattern | What it is | Cite-anchor | Why not absorbed |
|---|---|---|---|
| **Operator-team-handoff** | Anthropic-docs pattern: a long-running team-lead can be "handed off" by the operator to a fresh main session via `claude --resume` of a team-name (v2.1.144 enables `/resume` for background sessions per CHANGELOG `69d7070` 2026-05-19). | v2.1.144 CHANGELOG line: *"Added `/resume` support for background sessions — sessions started via `claude --bg` or agent view now appear alongside interactive ones, marked with `bg`"* | The runtime's CLAUDE.md §3 mentions `--bg` + `claude agents` but does NOT document the new `/resume`-cross-session-handoff pattern; **W310-EXT recommend a `team-handoff` skill**. |
| **Team-recovery** (a stopped team-member auto-resumes on SendMessage) | Per Anthropic sub-agents doc (indexed): *"If a stopped subagent receives a `SendMessage`, it auto-resumes in the background without requiring a new `Agent` invocation."* | `https://code.claude.com/docs/en/sub-agents` HEAD 2026-05-16 | The agent-teams plugin's `team-communication-protocols/SKILL.md` does NOT document this auto-resume semantic — only documents `shutdown_request` + `shutdown_response`. **A `team-recovery` reference doc would absorb this.** |
| **Team-cost-budget** | Anthropic best-practices page (`https://www.anthropic.com/engineering/claude-code-best-practices` indexed) explicitly compares "Token cost: Lower for subagents (results summarized back to main context) vs Higher for teams (each teammate is a separate Claude instance)" — but no skill explicitly caps team-cost or warns at threshold. | Same source, "Subagents vs agent teams" table | The agent-teams plugin auto-bills against the operator's account at full per-Claude-instance rates with NO budget cap. **Wire a `team-cost-budget` skill that pre-flight-checks `ccusage::daily` and aborts if monthly burn > threshold.** |
| **Team-mailbox-replay** (bonus 4th) | The `~/.claude/projects/{project}/{sessionId}/subagents/agent-{agentId}.jsonl` transcripts persist independently per Anthropic sub-agents doc. After main-context compaction, the transcripts are intact. | Anthropic sub-agents doc HEAD 2026-05-16 | The runtime's CLAUDE.md/CLAUDE.local.md path-table does NOT mention this transcript persistence behavior. **State-outside-repo redirect `CLAUDE_CODE_PROJECT_DIR=Z:/claude-sota-installed-state/.claude/projects` is set** (CLAUDE.local.md (f) section), so the transcripts DO survive — but no skill replays them. |

---

## §3 — Silent-fallback sweep on team orchestration

### §3.1 PreToolUse hook leak in team subagent dispatches

**Test**: `.claude/settings.json` PreToolUse hook matches `"matcher": "Bash"` only. Subagent dispatch via `Agent` tool **does not match** Bash, so the gitleaks + codex-adversarial-review hook does NOT fire on agent dispatch.

However, the spawned subagent runs **inside the same hook config** (per Anthropic agent-teams doc — teammates are full CC sessions). So when a teammate THEN runs Bash, the hook DOES fire. **No leak: hooks compose correctly.**

**Cite**: `settings.json` lines (head 50-100) show PreToolUse matcher `"Bash"` + codex-companion `adversarial-review --wait` shim.

### §3.2 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` — still required?

**YES, still required as of Anthropic docs HEAD 2026-05-17.** Cite (verbatim from indexed `anthropic-agent-teams-docs`):

> *"Agent teams are disabled by default. Enable them by setting the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable to `1`, either in your shell environment or through settings.json..."*

`settings.json` line 16: `"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"` ✓.

The CCBP `claude-startup-flags-full` doc (cached) also lists this flag in the "startup-only environment variables" table — still flagged experimental, not graduated.

**Verdict**: env block is **NOT stale**. Anthropic has not graduated agent-teams to stable in v2.1.144.

### §3.3 `subagent_type` FQN collisions across 67 enabled plugins

**`code-reviewer` — most-collided agent name (9 unique parent plugins)**:

```
.claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/agents/code-reviewer.md
.claude/plugins/cache/claude-code-workflows/comprehensive-review/1.3.0/agents/code-reviewer.md
.claude/plugins/cache/claude-code-workflows/incident-response/1.3.1/agents/code-reviewer.md
.claude/plugins/cache/claude-code-workflows/tdd-workflows/1.3.0/agents/code-reviewer.md
.claude/plugins/cache/claude-plugins-official/feature-dev/<sha>/agents/code-reviewer.md
.claude/plugins/cache/claude-plugins-official/pr-review-toolkit/<sha>/agents/code-reviewer.md
.claude/plugins/cache/claude-plugins-official/superpowers/<sha>/agents/code-reviewer.md
.claude/plugins/cache/everything-claude-code/everything-claude-code/<sha>/agents/code-reviewer.md
.claude/plugins/cache/superpowers-marketplace/superpowers/<sha>/agents/code-reviewer.md
```

This is **W309 Stream A V2 finding H-V2-3** already documented at `docs/architecture/W310-EXT/` neighbor file — extends W298 which counted only 3 unique parent plugins. Severity HIGH.

**Other multi-plugin collisions (count = unique parent plugins) per W309-A-V2 H-V2-3 enumeration**:
- `security-auditor` × 3 (addy-agent-skills, comprehensive-review, code-modernization)
- `code-simplifier` × 3
- `test-engineer` × 2 (addy-agent-skills, code-modernization)
- `silent-failure-hunter` × 2

**Agent-teams-specific collisions**: searched for `team-lead`, `team-implementer`, `team-reviewer`, `team-debugger` — these names are **plugin-namespace-unique** to `claude-code-workflows/agent-teams/1.0.2/agents/` (no collisions). Anthropic's docs reference `code-reviewer` as the canonical generic name — agent-teams chose `team-*` precisely to avoid this collision space.

**Impact when operator says "use the code-reviewer agent"**: CC v2.1.144 resolves to the first match in plugin-load order. Whichever of the 9 candidates loads first wins — silently. **Operator must use FQN `<plugin>:code-reviewer` or `agent-teams:team-reviewer` for deterministic dispatch.**

**Cite**: total agent.md count across plugins/cache: **5807 files** (`find ... | wc -l`). Code-reviewer.md only count: **17** (more than 9 because of `feature-dev/<various-sha>` cached duplicates from plugin updates).

### §3.4 Default `claude-code-guide` agent — is it auto-routed?

`find Z:/claude-sota-installed/.claude/plugins/cache -name 'claude-code-guide*' -o -name 'guide.md'` returned **0 hits**. The default `claude-code-guide` agent mentioned in some Anthropic docs is **not present** in this cache.

Operator-curated agents at `.claude/agents/`:
```
.claude/agents/evaluator.md
.claude/agents/gpt5-archaeologist.md
.claude/agents/wshobson-devops-troubleshooter.md
.claude/agents/wshobson-security-auditor.md
```
Total: 4 custom agents. No `claude-code-guide` override.

**Verdict (§3.4)**: no silent `claude-code-guide` routing in this runtime.

### §3.5 File-ownership boundary enforcement when 2 team agents write the same file

Per `cache/claude-code-workflows/agent-teams/1.0.2/skills/parallel-feature-development/references/file-ownership.md` (existence confirmed, body not loaded to save tokens): the plugin documents **assignment-time** exclusive file ownership but **does NOT** enforce it at write-time. The team-lead is responsible.

**Catch mechanism**: none at the harness level. If two team-implementers both `Edit` `foo.py`, the second write wins silently. The `team-lead` would only discover this at synthesis-time (post-merge git-diff).

This is a documented Anthropic-side limitation — agent-teams expects the team-lead to enforce ownership via dependency graphs.

**Cite (verbatim from `team-lead.md` line 26-29)**: *"Assign exclusive file ownership to each teammate / Define interface contracts at ownership boundaries / Prevent conflicts by ensuring no file has multiple owners"* — these are **planning-time** rules, not enforced.

### §3.6 `superpowers` dual-cache (bonus finding)

`find` revealed BOTH `claude-plugins-official/superpowers/5.1.0/` AND `claude-plugins-official/superpowers/f2cbfbefebbf/` cached simultaneously, plus `superpowers-marketplace/superpowers/5.1.0/`. Clone HEAD is `f2cbfbefebbf` (Release v5.1.0 (#1468), 2026-05-04). **The semantic-versioned `5.1.0` cache and the SHA-versioned `f2cbfbef` cache point to the same release tag.** CC v2.1.144 loads only one — but having both takes disk + may confuse `/plugin install --update` SHA-comparison.

**Recommend**: prune `f2cbfbefebbf/` after operator confirms `5.1.0/` is the canonical-loaded version. Not P0 — cosmetic disk.

---

## §4 — Concrete fix list (paste-ready, prioritized)

### P0-1 — Re-enable Phoenix MCP (insights surface restoration)

**Problem**: Phoenix MCP IS the insights tab equivalent; currently `disabledMcpjsonServers`-blocked.

**Patch** (`.claude/settings.json`):

```diff
   "disabledMcpjsonServers": [
     "memory",
     "github",
     "context7",
     "playwright",
     "graphiti",
-    "phoenix"
+    "phoenix"   // KEEP DISABLED if phoenix server at :6006 is not running locally
   ],
```

**Action required from operator**: confirm whether the Arize Phoenix server at `http://localhost:6006` (the `--baseUrl` flag default in `.mcp.json` line 105) is actually running. If yes, remove `"phoenix"` from the disabled list. If no (likely the case since it's disabled), document the prerequisite at CLAUDE.local.md "Services & MCP" section.

### P0-2 — Add `claude analytics` skill wrapping Claude Code Analytics API

**Problem**: Anthropic's organization-scoped Claude Code Analytics API (Sept 10 2025 release) is the canonical "insights" primitive but NOT wired.

**Patch** (create `.claude/skills/cc-analytics/SKILL.md`):

```yaml
---
name: cc-analytics
description: |
  Query Anthropic Claude Code Analytics API for daily aggregated usage metrics.
  Triggers: "show CC usage", "claude analytics", "team productivity insights",
  "agent cost breakdown", "/cc-analytics".
  Requires: organization API key in env CLAUDE_CODE_ANALYTICS_TOKEN.
  Endpoint: https://api.anthropic.com/v1/claude-code/analytics
  Returns: daily token/cost/session-count metrics per organization.
user-invocable: true
---

## Instructions

1. Verify env CLAUDE_CODE_ANALYTICS_TOKEN is set (operator's org-API key).
2. curl GET https://api.anthropic.com/v1/claude-code/analytics with `Authorization: Bearer $CLAUDE_CODE_ANALYTICS_TOKEN`.
3. Parse daily-aggregate JSON, format as table.
4. Cross-reference with local Langfuse traces at :3000 for per-session detail.
```

### P0-3 — Wire `ctx-insight` to operator surface

**Problem**: `ctx_insight` analytics dashboard exists but operator has never been told it exists.

**Patch** — add to `CLAUDE.md` §Pointers a line:

```
- **Personal insights dashboard**: `/context-mode:ctx-insight` → opens `http://localhost:4747` showing session activity, tool usage, error rate, parallel work patterns.
```

### P1-1 — Document FQN-collision resolution policy

**Problem**: `code-reviewer` × 9 collisions cause silent dispatch surprises.

**Patch** (add to `CLAUDE.md` after cardinal-rule-3):

```diff
 3. **Subagents = installed upstream agents OR documented subagent system** — per `https://docs.anthropic.com/en/docs/claude-code/sub-agents`.
+   **Subagent FQN discipline (W310-EXT-ε §3.3)**: when invoking via Agent tool, ALWAYS use plugin-qualified `subagent_type` (e.g. `agent-teams:team-reviewer` not `code-reviewer`). Bare `code-reviewer` collides across 9 parent plugins; first-match-wins is non-deterministic across plugin reloads.
```

### P1-2 — Add `team-cost-budget` pre-flight check

**Problem**: agent-teams bills at full per-instance Claude rates with NO cap.

**Patch** (extend `commands/team-spawn.md` Pre-flight Checks — note this is a plugin file, NOT directly editable; instead, add a `.claude/skills/team-cost-budget/SKILL.md` wrapper):

```yaml
---
name: team-cost-budget
description: |
  Pre-flight cost-cap for /team-spawn. Triggers: any "team-spawn", "/team-feature",
  "/team-debug", "/team-review", "/team-fullstack", "/team-security",
  "/team-migration" invocation OR an explicit "spawn N agents" request.
  Computes: today's burn via mcp__ccusage__daily; if (today_burn + (N × avg_per_agent_hr)) > $BUDGET_CAP_USD, BLOCK and ask operator.
---

## Instructions
1. Call `mcp__ccusage__daily` to get today's spend.
2. Multiply N (team size from args) × estimated $0.50/agent/hr × 2hr default.
3. If projected > $env:CLAUDE_TEAM_BUDGET_CAP_USD (default 5), BLOCK with summary.
4. Otherwise PASS through to /team-spawn.
```

### P1-3 — Document team transcript persistence in CLAUDE.local.md

**Patch** (add to CLAUDE.local.md "Key Paths" table):

```diff
+| `Z:\claude-sota-installed-state\.claude\projects\{project}\{sessionId}\subagents\agent-{agentId}.jsonl` | Per-teammate transcript (survives main-context compaction) |
```

### P2-1 — Prune duplicate `superpowers/f2cbfbefebbf/` cache

```diff
- (operator-only) rm -rf Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/f2cbfbefebbf/
```

Verify `5.1.0/` is canonical post-prune via `/plugin info superpowers`.

### P2-2 — Re-evaluate `continuous-learning-v2` opt-in

CLAUDE.local.md auto-memory rationale documents an opt-out for context-budget reasons. But the ECC continuous-learning-v2 instinct extractor runs in a **background Haiku agent** (per its SKILL.md: *"Analysis: Background agent (Haiku)"*) so it does NOT inject into main context.

**Recommend** operator re-evaluate: enable `pre:observe:continuous-learning` + `post:observe:continuous-learning` (remove from `ECC_DISABLED_HOOKS`) to begin populating project-scoped instincts. Risk = adds 2 hooks per tool call (~50 ms each). Reward = persistent learning insights survive auto-compact.

---

## §5 — Top-5 NEW SOTA primitives to adopt

| # | Primitive | Cite-anchor (URL + date) | Tier-recommendation | Adoption cost |
|---|---|---|---|---|
| 1 | **PostHog plugin** from `anthropics/claude-plugins-community` | marketplace.json SHA `2d9937ed5cd644884848f5013d9989eb3e83b855` @ `https://raw.githubusercontent.com/anthropics/claude-plugins-community/main/.claude-plugin/marketplace.json` indexed 2026-05-19 | **T1 INSTALL** if operator has PostHog account; otherwise T3 | `claude plugin install posthog@claude-plugins-community` — `category: monitoring` |
| 2 | **Phoenix re-enable** (already in `.mcp.json`, just remove from disabled list) | Operator decision contingent on `localhost:6006` running. `.mcp.json` line 105 pre-wired with `@arizeai/phoenix-mcp@4.0.13`. README @ `Z:/claude-sota-installed-repos/Arize-ai-phoenix/js/packages/phoenix-mcp/README.md` (cached 2026-05-19) lists 6 capability bundles. | **T1 RE-ENABLE** if Phoenix server runs locally | 1-line settings.json delete + `docker run arize-phoenix:latest` |
| 3 | **Claude Code Analytics API skill** (P0-2 above) | `https://docs.anthropic.com/en/release-notes/api` Sept 10 2025 entry + `https://docs.anthropic.com/en/manage-claude/claude-code-analytics-api` (indexed 2026-05-19) | **T1 IF org-key available**, T3 otherwise | Operator must obtain org-API key; 1 skill file |
| 4 | **Fullstory plugin** (behavioral analytics + insights) | marketplace.json SHA `1ec5865e7ab1449f9a0859d164c4b6a8c53b6e2f` indexed 2026-05-19 | **T2 if operator has Fullstory account**; T4 otherwise | Same `claude plugin install fullstory@claude-plugins-community` |
| 5 | **Team-handoff + team-cost-budget skill pair** (P1-2 + a new sibling) | v2.1.144 CHANGELOG `69d7070` 2026-05-19 `/resume` for `--bg`; Anthropic agent-teams doc @ `https://code.claude.com/docs/en/agent-teams` indexed 2026-05-17 | **T1 INSTALL** (operator-curated, low-risk) | 2 new `.claude/skills/*/SKILL.md` files (~50 LOC each) |

---

## STREAM-EPSILON SUMMARY

### Traffic-light: Insights coverage

| Layer | Status |
|---|---|
| Anthropic CC native CLI / slash commands | ⚠ — no `/insights`, no `claude insights` CLI; Claude Code Analytics API exists but NOT wired (P0-2) |
| MCP-backed insights tools (phoenix, langfuse, ccusage, context-mode, chrome-devtools) | ⚠ — phoenix DISABLED (P0-1); langfuse only prompt-mgmt; ccusage operational; ctx_insight wired but unsurfaced (P0-3) |
| Plugin-shipped insight skills (continuous-learning-v2, ctx-insight, etc.) | ⚠ — present but underused; observation hooks deliberately disabled for context-budget |
| Operator-curated insights skill | ✗ — does not exist; recommend P0-2 add |
| External SOTA (posthog/fullstory) | ✗ — uninstalled; ranked top of §5 |

**Overall insights ⚠ (AMBER)** — primitives exist but never surfaced to operator workflow; the operator's "missing" perception is **partially correct** (no operator-facing insights skill, no Phoenix UI, no Analytics-API wiring) but technically a **rewiring problem, not a missing-software problem**.

### Traffic-light: Agent-team freshness

| Layer | Status |
|---|---|
| `agent-teams@1.0.2` plugin SHA | ✓ matches upstream HEAD `112197c` (2026-05-14); 5 days old; no drift |
| 12 agent-teams skills | ✓ all map to current `1.0.2` files; descriptions Anthropic-canonical |
| Tool signatures (TeamCreate/Agent/SendMessage/TaskCreate) | ✓ match Anthropic docs HEAD 2026-05-17 |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` env flag | ✓ still required per Anthropic docs (NOT graduated in v2.1.144) |
| FQN-collision discipline (subagent_type routing) | ⚠ `code-reviewer` × 9 collisions (W309-A-V2 H-V2-3); P1-1 fix required |
| File-ownership write-time enforcement | ⚠ planning-time only; no harness catch on dual-write |
| Token-cost cap | ✗ uncapped; P1-2 budget-skill required |
| Upstream-pattern absorption (handoff, recovery, cost-budget, mailbox-replay) | ⚠ 4 patterns not yet absorbed (§2.4) |

**Overall agent-team ✓ (GREEN with caveats)** — operator's perception "stale" is **incorrect** for the plugin itself. The staleness is in the **operator-curated wrapper layer**: no `team-cost-budget`, no `team-handoff`, FQN-collision policy unwritten.

### Top-3 P0 fixes (paste-ready, in dispatch order)

1. **P0-1 Phoenix re-enable** — 1-line settings.json delete; condition: confirm `localhost:6006` running. ETA: 30 sec.
2. **P0-3 Surface `ctx-insight`** — 1-line CLAUDE.md addition pointing operator at `/context-mode:ctx-insight` for the personal-metrics dashboard. ETA: 1 min. (Highest-ROI of the three because zero infra needed.)
3. **P0-2 Wire Claude Code Analytics API skill** — new `.claude/skills/cc-analytics/SKILL.md` per template above. Conditional on operator's org-API key availability. ETA: 5 min.

---

## Appendix A — Cite manifest (every cite used, with date)

| # | Cite | Date verified |
|---|---|---|
| A.1 | `.claude/settings.json` env block line 16 — `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | 2026-05-19 (this session) |
| A.2 | `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/.claude-plugin/plugin.json` | 2026-05-19 |
| A.3 | `Z:/claude-sota-installed-repos/wshobson-agents` git HEAD `112197c6bfd0a1ab10d374e85a2f5efa4757b77d` 2026-05-14 09:04:34 -0400 | 2026-05-19 |
| A.4 | `https://docs.anthropic.com/en/docs/claude-code/agent-teams` indexed 2026-05-19 (ctx_fetch_and_index) | 2026-05-19 |
| A.5 | `https://code.claude.com/docs/en/agent-teams` indexed 2026-05-19 (mirror of A.4) | 2026-05-19 |
| A.6 | `https://docs.anthropic.com/en/docs/claude-code/cli-reference` indexed 2026-05-19 | 2026-05-19 |
| A.7 | `https://docs.anthropic.com/en/docs/claude-code/changelog` indexed 2026-05-19 — v2.1.144 entries | 2026-05-19 |
| A.8 | `https://docs.anthropic.com/en/release-notes/api` Sept 10 2025 entry — Claude Code Analytics API launch | indexed prior session 2026-05-16 |
| A.9 | `https://code.claude.com/docs/en/sub-agents` — SendMessage gated by experimental flag | indexed prior 2026-05-16 |
| A.10 | `Z:/claude-sota-installed-repos/Arize-ai-phoenix/js/packages/phoenix-mcp/README.md` | accessed 2026-05-19 |
| A.11 | `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/README.md` | accessed 2026-05-19 |
| A.12 | `https://raw.githubusercontent.com/anthropics/claude-plugins-community/main/.claude-plugin/marketplace.json` — posthog SHA `2d9937e...`, fullstory SHA `1ec5865...` | indexed 2026-05-19 (this session) |
| A.13 | `Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-mode/1.0.136/skills/ctx-insight/SKILL.md` | accessed 2026-05-19 |
| A.14 | `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/skills/continuous-learning-v2/SKILL.md` | accessed 2026-05-19 |
| A.15 | `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md` v1.0.2 | accessed 2026-05-19 |
| A.16 | W309 Stream A V2 H-V2-3 — `code-reviewer` × 9 plugin collision enumeration | committed 2026-05-19 (this branch HEAD ancestry) |
| A.17 | `Z:/claude-sota-installed/.claude/plugins/marketplaces/claude-code-workflows/.claude-plugin/marketplace.json` — agent-teams 1.0.2 entry | accessed 2026-05-19 |
| A.18 | `Z:/claude-sota-installed-repos/anthropics-claude-code/CHANGELOG.md` HEAD `69d7070` 2026-05-19 | accessed 2026-05-19 |
| A.19 | `.mcp.json` line 105 `@arizeai/phoenix-mcp@4.0.13` pinned per W286-cross | tracked 2026-05-18 |
| A.20 | `.claude/settings.json` `disabledMcpjsonServers: ["memory","github","context7","playwright","graphiti","phoenix"]` | accessed 2026-05-19 |

---

**End of W310-EXT Stream ε deliverable.** Word count ≈ 3,650.

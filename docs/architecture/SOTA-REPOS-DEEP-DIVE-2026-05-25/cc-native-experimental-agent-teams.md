# CC-Native Experimental Agent Teams — sca-v23 Deep-Dive Report (W441 META)

**Date**: 2026-05-25
**Wave**: W441 (parallel SOTA-research sweep)
**Method**: Multi-angle convergence — Anthropic docs (`docs.anthropic.com` + `code.claude.com`) + Anthropic CHANGELOG (raw HEAD) + 20+ open GitHub issues on `anthropics/claude-code` + local plugin source inspection (`claude-code-workflows/agent-teams/1.0.2`) + ToolSearch empirical probe
**Author**: Opus 4.7 (1M) SOTA-research subagent
**Companion deep-dives** (W441 sister docs in this folder): wshobson/agents v1.0.2 plugin deep-dive (separate file)

---

## §0 Executive verdict (TL;DR for operator)

The CC-native experimental agent teams feature (gated by `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) and the wshobson/agents (`claude-code-workflows/agent-teams/1.0.2`) plugin are **two layers of the same stack**:

- **Native CC runtime** (the env flag) ships the actual primitives — 7 deferred tools (`TeamCreate`, `TeamDelete`, `TaskCreate`, `TaskList`, `TaskGet`, `TaskUpdate`, `SendMessage`), the file-based mailbox (`~/.claude/teams/{name}/config.json` + `~/.claude/tasks/{name}/`), the `Agent(team_name=, name=)` extended signature, two display modes (in-process / tmux-split-pane), three hook events (`TeammateIdle`, `TaskCreated`, `TaskCompleted`), and the `--teammate-mode` CLI flag.
- **wshobson plugin** ships natural-language slash-command wrappers (`/team-spawn`, `/team-debug`, `/team-feature`, `/team-review`, `/team-status`, `/team-delegate`, `/team-shutdown`) + 4 typed subagent roles (`team-lead`, `team-implementer`, `team-reviewer`, `team-debugger`) + 5 skills (communication-protocols, composition-patterns, task-coordination-strategies, parallel-feature-development, parallel-debugging, multi-reviewer-patterns) that codify Anthropic's own SOTA patterns into preset workflows. **Without the env flag, the plugin commands fail at pre-flight.**

**Direct operator-facing answer** — "Is experimental agent teams better than background sessions because they can communicate?": **Conditionally yes, but only for a narrow workload class** (3-5 coordinated teammates with shared file-ownership boundaries, real-time mailbox SendMessage required, single supervising lead). For most W4xx-style wave workloads where streams are genuinely disjoint, **background sessions + parallel Agent fan-out remain SOTA** because they are: (a) per-session-resilient (no shared-team-context single-point-of-failure), (b) free of the 10× cache-creation regression v2.1.128 introduced for SendMessage-heavy parallel-team workloads (issue #56293), (c) free of the auto-distributor context-pollution bug (issue #59907), (d) free of the MCP-tools-unavailable bug in agent-team exec subagents (issue #52669), and (e) free of the 30-48 minute idle-after-completion bug requiring SendMessage-ping wakeups (issue #56930). Detailed decision matrix in §5.

---

## §1 Feature identity

### 1.1 Anthropic provenance (CHANGELOG-anchored)

| CC version | Date | Agent-teams CHANGELOG entry |
|---|---|---|
| **2.1.32** | ~Sep 2025 (Opus 4.6 GA) | `Added research preview agent teams feature for multi-agent collaboration (token-intensive feature, requires setting CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)` — birth of the feature, paired with Claude Opus 4.6 GA. |
| **2.1.33** | Sep 2025 | `Fixed agent teammate sessions in tmux to send and receive messages`; `Added TeammateIdle and TaskCompleted hook events for multi-agent workflows`. |
| **2.1.77** | ~Q1 2026 | `The Agent tool no longer accepts a resume parameter — use SendMessage({to: agentId}) to continue a previously spawned agent`. This collapsed the prior `resume` parameter into SendMessage, but issue #35240 / #51071 documented that the Agent tool description was not gated on the env flag → orchestrator silently drifts on default install. |
| **2.1.119+** | Q1-Q2 2026 | Stream of bug-fixes — TeamDelete stale-config (#53160), zombie teammates (#47396), TUI scrollback regression (#53193), permission dialog crash, model inheritance, non-ASCII names, Bedrock/Vertex/Foundry routing. |
| **2.1.140-150** | May 2026 | Recent ones: tmux-pane-but-native-process bug (#58762), MCP-tools-missing-in-exec-subagent (#52669), 10× cache regression for parallel-team workloads (#56293), auto-distributor context-pollution (#59907), 30-min idle-post-completion (#56930), `CLAUDE_CODE_SUBAGENT_MODEL` not applied to teammates (fixed in 2.1.147). |

**Status as of 2026-05-25**: Still gated as **"research preview"** ~8 months post-launch. Not promoted to GA. The CHANGELOG note explicitly warns "token-intensive feature".

### 1.2 Authoritative Anthropic doc URL

- `https://code.claude.com/docs/en/agent-teams` (canonical)
- `https://docs.anthropic.com/en/docs/claude-code/agent-teams` (mirror — same content)
- Title: "Orchestrate teams of Claude Code sessions"

### 1.3 Local install verification

```
.claude/settings.json:
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    ...
  }
```

State directories: **do NOT pre-exist** (`ls $USERPROFILE/.claude/teams/` and `~/.claude/tasks/` both empty/absent until first `TeamCreate` call) — confirmed via empirical probe.

---

## §2 Multi-angle findings

### A1 — Anthropic official docs (`code.claude.com/docs/en/agent-teams` + CHANGELOG)

Direct quotes from the agent-teams doc (extracted via curl 2026-05-25):

> Use agent teams when teammates need to share findings, challenge each other, and coordinate on their own.

> Agent teams are disabled by default. Enable them by setting the `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` environment variable to 1.

> Tell the lead what you want in natural language. It handles team coordination, task assignment, and delegation based on your instructions.

> Agent teams support two display modes: **In-process** (all teammates run inside your main terminal, Shift+Down to cycle) and **Split panes** (each teammate gets its own pane, requires tmux or iTerm2). The default is "auto" — split-panes if already inside tmux, in-process otherwise.

> The shared task list coordinates work across the team. The lead creates tasks and teammates work through them. Tasks have three states: pending, in progress, and completed. Tasks can also depend on other tasks: a pending task with unresolved dependencies cannot be claimed until those dependencies are completed.

> **Self-claim**: after finishing a task, a teammate picks up the next unassigned, unblocked task on its own. Task claiming uses **file locking** to prevent race conditions when multiple teammates try to claim the same task simultaneously.

> Teams and tasks are stored locally: **Team config**: `~/.claude/teams/{team-name}/config.json`; **Task list**: `~/.claude/tasks/{team-name}/`.

> Claude Code generates both of these automatically when you create a team and updates them as teammates join, go idle, or leave. The team config holds runtime state such as session IDs and tmux pane IDs, so **don't edit it by hand or pre-author it: your changes are overwritten on the next state update**.

> Agent teams use significantly more tokens than a single session. Each teammate has its own context window, and token usage scales with the number of active teammates.

> Token costs scale linearly: each teammate has its own context window and consumes tokens independently. Coordination overhead increases: more teammates means more communication, task coordination.

> If you're new to agent teams, start with tasks that have clear boundaries and don't require writing code: reviewing a PR, researching a library, or investigating a bug.

**Hook events (added 2.1.33)**:
- `TeammateIdle` — runs when a teammate is about to go idle. Exit code 2 sends feedback and keeps the teammate working.
- `TaskCreated` — runs when a task is being created. Exit code 2 prevents creation.
- `TaskCompleted` — runs when a task is being marked complete. Exit code 2 prevents completion.

**Anthropic's own subagent-vs-agent-team decision** (verbatim from `agent-teams` doc):
> Both agent teams and subagents let you parallelize work, but they operate differently. **Choose based on whether your workers need to communicate with each other.**
>
> ![Diagram comparing subagent and agent team architectures. **Subagents are spawned by the main agent, do work, and report results back. Agent teams coordinate through a shared task list, with teammates communicating directly with each other.**]

This is the canonical Anthropic-anchor for the decision criterion: **need for peer-to-peer communication during execution**.

### A2 — Perplexity sonar-deep-research (TIMED OUT 300s — synthesis from other angles)

Perplexity Sonar query exceeded the 300s MCP timeout. **All P-relevant signal recovered from A1+A4** which are more authoritative anyway (direct primary-source CHANGELOG + Anthropic docs + GitHub issues). Per sca-v23 §2.1 the 3-angle minimum is met without A2. A2-substitute analysis covered by A1 (Anthropic primary) + A4 (GitHub authoritative bugs) + A3 (local plugin source) + A5 (empirical).

### A3 — Local wshobson plugin source inspection (`claude-code-workflows/agent-teams/1.0.2`)

#### A3.1 Plugin layout

```
.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/
├── plugin.json
├── commands/                                   (7 slash commands)
│   ├── team-spawn.md       (4.4 KB)
│   ├── team-debug.md       (3.8 KB)
│   ├── team-feature.md     (3.8 KB)
│   ├── team-review.md      (3.0 KB)
│   ├── team-status.md      (2.2 KB)
│   ├── team-delegate.md    (3.1 KB)
│   └── team-shutdown.md    (1.8 KB)
├── agents/                                     (4 typed subagent roles)
│   ├── team-lead.md        (tools: Read, Glob, Grep, Bash, Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage)
│   ├── team-implementer.md (tools: Read, Write, Edit, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage)
│   ├── team-reviewer.md    (tools: Read, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage)
│   └── team-debugger.md    (tools: Read, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage)
└── skills/                                     (5 SOTA-pattern skills)
    ├── team-communication-protocols/SKILL.md
    ├── team-composition-patterns/SKILL.md
    ├── task-coordination-strategies/SKILL.md
    ├── parallel-feature-development/SKILL.md
    ├── parallel-debugging/SKILL.md
    └── multi-reviewer-patterns/SKILL.md
```

#### A3.2 Plugin commands ALL call native primitives

Every `/team-*` command's "Pre-flight" section verifies `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set, then orchestrates calls to native `TeamCreate` + `Agent(team_name=, name=, subagent_type=)` + `TaskCreate` + `TaskUpdate` + `SendMessage`. **The plugin is a pure orchestration wrapper around native CC primitives — it adds no IPC, no state-store, no scheduler.** Example from `team-spawn.md`:

> Phase 2: Team Creation
> 1. Use the `TeamCreate` tool to create the team with `team_name` and `description`
> 2. For each team member, use the `Agent` tool with: `team_name`, `name` (unique descriptive), `subagent_type` (e.g. `agent-teams:team-lead`), `prompt`

7 presets shipped: `review`, `debug`, `feature`, `fullstack`, `research`, `security`, `migration` — each maps to a team composition (member count + roles + default team name).

#### A3.3 Plugin skills codify SOTA patterns

The 5 skills are pure prose-pattern reference — no executable code. They codify:
- `team-communication-protocols`: message type selection (`message` direct / `broadcast` sparingly / `shutdown_request` graceful); plan-approval workflow (`ExitPlanMode` → `plan_approval_request` → `plan_approval_response`); teammate discovery via `~/.claude/teams/{name}/config.json`.
- `parallel-feature-development`: file-ownership by directory / module / layer; "one owner per file" cardinal rule; interface-contract files; vertical-slice vs horizontal-layer integration.
- `task-coordination-strategies`: task decomposition + dependency graphs.
- `team-composition-patterns`: 7 presets + sizing heuristics + read-only-vs-full-capability agent selection.

These patterns are not magic — they are explicit prose contracts the plugin enforces by injecting them into spawned teammate prompts.

### A4 — GitHub `anthropics/claude-code` open issues + cookbook search

#### A4.1 Bug surface (20+ OPEN bugs on the experimental feature as of 2026-05-25)

Sorted by severity / operator-impact:

| Issue # | Title | Severity | Repro state |
|---|---|---|---|
| **#56293** | v2.1.128 caching regression in parallel-team workloads (**10× token cost increase**) | **HIGH** | Confirmed via 4,367 transcript analysis; v2.1.121 baseline 5,648 tokens/turn → v2.1.128 26,000 tokens/turn for SendMessage-heavy workloads. Each inbound SendMessage breaks cache_control prefix. |
| **#59907** | Auto-distributor injects fake `<teammate-message teammate_id="task-list">` blocks into specialist contexts | **HIGH** | Confirmed; specialists pulled off-charter by synthesized pseudo-messages indistinguishable from real teammate directives. ~33 injections / 10-min session window. |
| **#52669** | MCP tools (`mcp__*__*`) unavailable in agent-team exec subagents — "No such tool available" | **HIGH** | Confirmed v2.1.119+; affects EVERY configured MCP server; tool-registry not propagated to exec subagent. |
| **#58762** | `Agent(team_name=)` forces tmux mailbox routing but spawns native process — teammates never receive instructions | **HIGH** | Confirmed v2.1.140 macOS; `backendType: "tmux"` recorded with `tmuxPaneId: "%0"` but no tmux session exists. Workaround: spawn WITHOUT `team_name`. |
| **#56930** | Background sub-agents idle for 30-48 minutes post-completion; SendMessage ping required to wake them | **HIGH** | Confirmed; polling loop inactive in post-completion state. Workaround: parent runs ScheduleWakeup-driven 4-min polling loop. |
| **#55488** | Spawned subagent identifies as team-lead and exposes parent's conversation history when DM'd directly | HIGH (security) | Spawned-as-X-but-claims-to-be-Y identity confusion. |
| **#54463** | Lead session resumed after restart never delivers teammate messages (InboxPoller short-circuits on missing teamContext) | HIGH | Resume after crash → silent message loss. |
| **#53160** | TeamDelete fails on stale teams after session crash — must `rm -rf` files manually | MEDIUM | Workaround: manual filesystem cleanup loses task history. |
| **#55824** | Orchestrator lead context never auto-releases after teammate exits — sticky status bar + blocked TeamCreate | MEDIUM | "Already leading team X" error even after all teammates gone + on-disk state cleaned. |
| **#49642** | Team name collision across sessions — file-based registry keyed by name, not session | MEDIUM | Same team-name across concurrent sessions clobbers. |
| **#49671** | shutdown_request acknowledged but teammates never terminate; TeamDelete blocked until session ends | MEDIUM | Zombie teammates can't be force-terminated. |
| **#60199** | shutdown_request approval doesn't terminate teammate; reply delivery occasionally drops content | MEDIUM | Reliability hole. |
| **#37099** | Sessions started with `TeamCreate` (e.g. custom skills) permanently hidden from `--resume` | MEDIUM | UX hole. |
| **#34668** | Teammates intermittently stop receiving SendMessage after extended polling (default mode, not tmux) | MEDIUM | InboxPoller flake. |
| **#52251** | Agent-Teams sub-agents with `model: opus` cannot call SendMessage / TaskCreate / TaskUpdate despite frontmatter declaration (tmux backend) | MEDIUM | Model-specific tool-allowlist bug. |
| **#48900** | Team config silently disappears while agent UI still shows "Running" | MEDIUM | State/UI desync. |
| **#47396** | Zombie teammates cannot be force-terminated by team lead | MEDIUM | Cleanup hole. |
| **#46668** | Add option to silence teammate-activity broadcasts | LOW | Noise / UX. |
| **#32368** | Spawned teammates don't inherit model configuration from team lead | MEDIUM (partly FIXED in 2.1.147 per `CLAUDE_CODE_SUBAGENT_MODEL` fix) | Cross-version. |
| **#51071** | Agent tool description unconditionally documents SendMessage, misleading orchestrator sessions when agent-teams is not enabled | MEDIUM | Documentation drift causes silent orchestrator failure. |
| **#35240** | Agent tool documentation references SendMessage for subagent resumption, but SendMessage is gated behind Agent Teams flag | MEDIUM | Same root cause as #51071. |
| **#61845** | Glob and Grep missing from Agent Teams deferred tools catalog | MEDIUM | Tool-availability gap. |
| **#61993** | Sub-agents cannot spawn other sub-agents: `Task`/`Agent` primitive not exposed in nested contexts | MEDIUM | Two-level-deep coordination impossible. |
| **#59717** | Claude Code creates single Agent instead of Team when explicitly requested | MEDIUM | Intent-misreading. |
| **#53193** | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` disables TUI scrollback in v2.1.119 | MEDIUM | UX regression specific to feature flag. |

**Bug-density summary**: ~25 OPEN bugs directly attributable to the experimental feature; the most damaging are (a) 10× cache regression, (b) auto-distributor context pollution, (c) MCP unavailable, (d) tmux-pane phantom, (e) 30-min post-completion idle. **A risk-aware operator should treat the feature as research-preview-grade — not production-grade — as of 2026-05-25.**

#### A4.2 Cookbook search

`gh search code 'EXPERIMENTAL_AGENT_TEAMS'` in `anthropics/claude-cookbooks` → **no results**. Cookbook patterns (Anthropic's official agent patterns repo @ 39a350b6 — orchestrator-workers, evaluator-optimizer, parallelization, prompt-chaining, routing) do NOT use the experimental feature. They use the regular `Agent` tool + multi-step prompting. This is a strong signal that **even Anthropic's own canonical agent-patterns reference treats agent-teams as a separate concern, not the recommended baseline.**

### A5 — Empirical TeamCreate probe (this subagent's own runtime)

**Probe**: From within the current Opus 4.7 subagent (spawned as `general-purpose` for this research task), invoke `ToolSearch(query="select:TeamCreate,TeamDelete,TaskCreate,TaskList,TaskGet,TaskUpdate,SendMessage")`.

**Result**: `No matching deferred tools found`.

**Interpretation**: The agent-teams tools are NOT exposed to subagents spawned WITHOUT the `team_name` parameter — even when the runtime is `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` enabled. This **directly cross-confirms** the documentation in issue #35240 / #51071 (SendMessage is gated by the env flag AND requires team_name binding). The orchestrator-mode parent session presumably DOES have these tools (per the team-lead agent frontmatter and the CHANGELOG entries about TeamCreate being callable from the parent), but the spawned subagent operating outside a team does not. This is consistent with Anthropic's design: agent-teams tools are bound to the team-membership scope.

**Secondary probe**: `ls $USERPROFILE/.claude/teams/` and `~/.claude/tasks/` → both empty / absent. Confirms no team has been created in this CC install's history (these dirs would auto-populate on first `TeamCreate` per Anthropic docs).

---

## §3 Distinction matrix — plugin vs native

| Feature | wshobson `agent-teams@1.0.2` plugin | CC native (env flag enables) | Notes |
|---|---|---|---|
| `/team-spawn`, `/team-debug`, `/team-feature`, `/team-review`, `/team-status`, `/team-delegate`, `/team-shutdown` slash commands | ✅ ships in plugin | ❌ not native | Plugin convention; commands are markdown prompts orchestrating native calls |
| `TeamCreate` tool call | — (plugin USES it) | ✅ native | Gated by env flag |
| `TeamDelete` tool call | — (plugin USES it) | ✅ native | Same |
| `TaskCreate` / `TaskList` / `TaskGet` / `TaskUpdate` tool calls | — (plugin USES them) | ✅ native | Same |
| `SendMessage` IPC | — (plugin USES it) | ✅ native | Mailbox-routed; bound to team_name scope |
| `Agent(team_name=, name=)` extended signature | — (plugin USES it) | ✅ native | Without flag, `team_name` rejected |
| `~/.claude/teams/{name}/config.json` state | — | ✅ native (auto-generated) | Holds session IDs, tmux pane IDs, members[] |
| `~/.claude/tasks/{name}/` state | — | ✅ native | File-locked task list |
| `claude agents` command-line view | — | ✅ native | Lists background + team sessions |
| `--bg` / `/background` / `/bg` flag | — | ✅ native (independent feature) | Separate primitive — see §4 |
| `--teammate-mode` CLI flag | — | ✅ native | `in-process` / `tmux` / `auto` |
| `teammateMode` setting in `~/.claude/settings.json` | — | ✅ native | Same |
| `TeammateIdle` hook event | — | ✅ native (2.1.33+) | Exit 2 keeps teammate working |
| `TaskCreated` hook event | — | ✅ native | Exit 2 prevents creation |
| `TaskCompleted` hook event | — | ✅ native | Exit 2 prevents completion |
| `team-lead` / `team-implementer` / `team-reviewer` / `team-debugger` subagent role defs | ✅ ships in plugin (`agents/*.md`) | ❌ not native | Plugin-defined; reference-able via FQN `agent-teams:team-lead` |
| 7 presets (review/debug/feature/fullstack/research/security/migration) | ✅ plugin-defined | ❌ not native | Plugin convention |
| 5 SOTA-pattern skills | ✅ plugin-defined | ❌ not native | Codified prose patterns |
| Plan-approval workflow (`ExitPlanMode` → `plan_approval_request`) | — (plugin DOCUMENTS it) | ✅ native | Built into ExitPlanMode + SendMessage |
| Dependency-graph task scheduling (auto-unblock) | — | ✅ native | Per Anthropic doc |
| File-locked task self-claim | — | ✅ native | Per Anthropic doc |
| `CLAUDE_CODE_SUBAGENT_MODEL` propagation to teammates | — | ✅ native (FIXED in 2.1.147) | Prior bug |

**Conclusion**: Native CC owns the 100% of the primitives (tools, IPC, state, hooks, CLI flags). The wshobson plugin is a **pure orchestration overlay** providing natural-language command shortcuts + typed roles + codified SOTA patterns. The plugin is **strictly additive** — operator-friendly but not architecturally required.

---

## §4 Direct comparison — agent-teams vs background sessions vs parallel Agent fan-out

Per W259-v8 U4 + W342-Z SOTA: CC has **4 parallel-work modes**. This section compares modes 1-3 (subagents / agent-teams / background-sessions); mode 4 (git-worktrees) is a per-process workspace isolation primitive orthogonal to coordination.

| Dim | (A) **Agent Teams** (native env flag) | (B) **Background Sessions** (`claude --bg` / `/bg`) | (C) **Parallel Agent fan-out** (`Agent` tool, multiple calls in one assistant message) |
|---|---|---|---|
| **Anthropic anchor** | `code.claude.com/docs/en/agent-teams` | `code.claude.com/docs/en/agent-view` + headless docs | `code.claude.com/docs/en/sub-agents` |
| **Inter-worker communication** | **Real-time** SendMessage IPC (mailbox-routed; direct/broadcast/shutdown_request types) | **None** — workers see no other workers; coordination via filesystem-stigmergic (git, T6, file artifacts) | **None** — workers spawned, return result, no peer talk |
| **Shared state** | TaskList mailbox (file-locked, auto-unblocking on completion) + team config | None — each session is fully isolated | None — each agent call is fully isolated |
| **State persistence** | `~/.claude/teams/{name}/config.json` + `~/.claude/tasks/{name}/` (durable; reads survive process death — but #54463 shows resume-after-crash drops messages) | Session JSONL in `~/.claude/projects/` (durable, full `--resume` support landed 2.1.144) | Session JSONL of the dispatching parent; agent output captured in parent's turn |
| **Coordination overhead** | High — lead synthesizes; mailbox-discipline; plan-approval workflow; shutdown handshake | Low — each session is independent; merge via PR + git + verdict-ledger | Minimal — parent reads agent outputs and composes final response |
| **Failure mode** | All-or-nothing team-context: corruption of team config (#48900) kills coordination; lead crash breaks resume (#54463); 10× cache regression for SendMessage-heavy (#56293); auto-distributor pollution (#59907) | Per-session resilience — one session crash leaves others intact; restart-with-`/resume` recovers individually | Per-call resilience — one Agent failure surfaces directly to parent; parent retries or continues |
| **Token cost** | **Worst** — Anthropic explicitly warns "token-intensive feature"; each teammate has own context window; SendMessage round-trips add cache-misses (10× regression #56293) | Medium — each background session pays its own context cost; no IPC overhead | Medium — each Agent has own context window; parent context not duplicated |
| **MCP tool availability** | **Broken** in exec subagents (#52669) — `mcp__*__*` returns "No such tool available" even for connected servers | Full — background sessions inherit `--mcp-config` and run independently | Full — `general-purpose` and FQN-typed subagents receive parent's MCP tool registry |
| **Cleanup discipline** | `shutdown_request` → `shutdown_response` → `TeamDelete` (3-step, ofter blocked — #47396 #49671) | `claude stop <session-id>` (single-step, atomic) | No cleanup — Agent returns and is done |
| **Operator visibility** | `claude agents` shows teammates; in-process display Shift+Down cycles; tmux split-pane optional | `claude agents` lists every background session; pinnable with Ctrl+T; full `/resume` UX | Visible only as Agent tool result in parent's turn transcript |
| **2026-05-25 readiness** | **Research preview** (8 months post-launch); 25+ open severity bugs; not GA | **GA** — `--bg` + `/bg` + `claude agents`/`logs`/`attach`/`stop` all stable; `/resume` for `bg` sessions landed 2.1.144 | **GA** — production-stable; the cookbook-canonical pattern (orchestrator-workers @39a350b6) |
| **Best-fit workload class** | 3-5 coordinated teammates with file-ownership boundaries + mid-execution coordination need (e.g. one publishes API contract, another consumes it) | Long-running off-the-critical-path work (codex review dispatch, nightly eval, multi-hour build) | Truly disjoint research / audit / sweep / fan-out across independent dimensions |
| **5-cap parallel-session impact** (W259-v8 U4 + W350 §2) | 1 wave-lock per team (the lead session); teammates not separately wave-locked | 1 wave-lock per `--bg` session (cumulative across N) | 0 wave-lock (sub-of-parent) |
| **Real-time push possible** | ✅ SendMessage delivers to teammate mailbox | ❌ Sessions can't push to each other — only filesystem-stigmergic | ❌ No-push by design |
| **Bidirectional Q&A possible** | ✅ teammate → lead via SendMessage; lead → teammate via SendMessage | ❌ One-way: parent dispatched, session runs; result via attach or `/resume` | ❌ One-shot: parent → agent → result |
| **HITL escape hatch** | `plan_approval_request` / `plan_approval_response` (built into ExitPlanMode flow) | `claude attach <id>` to take over interactively; `--bg` becomes interactive on attach | None — Agent runs autonomously until completion |

**Critical operator insight**: The **only thing agent-teams gives that background sessions + parallel Agent fan-out cannot replicate is mid-execution peer-to-peer SendMessage**. Everything else (parallel execution, multi-context, per-worker MCP, hooks, isolated state) is matched or exceeded by the other two modes.

---

## §5 Decision matrix — when to use which

### USE **Agent Teams** when ALL of these are true:
- ≥3 teammates need to coordinate during execution (not just at end)
- Mid-flight peer communication is genuinely needed (e.g. one teammate publishes an API contract another consumes; or competing-hypotheses debugging where teammates exchange evidence)
- File-ownership boundaries are well-defined (one owner per file; per `parallel-feature-development` skill)
- A single human-supervising lead can synthesize results
- Token budget can absorb the **2-10× cost** (warn: 10× regression #56293 affects SendMessage-heavy workloads)
- The workload runs on a CC version known to fix the relevant bugs (avoid v2.1.126-128 for SendMessage-heavy; verify #58762 fixed on current version; verify #52669 MCP-availability if MCP tools are required)
- Team uses ONLY `team_name`+`name` pattern that works (per #58762 workaround: actually safer to NOT pass `team_name` to `Agent()` calls if you don't need mailbox)

### USE **Background Sessions** (`claude --bg`) when:
- Work is **long-running off-the-critical-path** (nightly eval, codex-review dispatch, multi-hour refactor)
- Per-session resilience matters (one crash shouldn't take down peers)
- You want full `/resume` capability and the polished `claude agents` UX
- Different sessions might run in different worktrees / cwds / MCP configs
- Coordination is **asynchronous via PR + git + verdict-ledger** (filesystem-stigmergic — see local skill `issue-mailbox`)
- The W342-Z 5-layer parallel-session safety architecture applies (atomic-tick-write, worktree topology, T6+Langfuse+ccusage cross-session state)

### USE **Parallel Agent fan-out** (`Agent` calls in single assistant message) when:
- Work is **truly independent** — N disjoint research / audit / file-edit / sweep tasks
- 2+ workstreams identified per parent prompt (W269 mandate; `parallel-dispatch-mandate` skill MUST-block fire)
- Workers don't need to talk to each other — they read from disjoint inputs, produce disjoint outputs
- Parent will synthesize the final answer from agent results
- This is the **cookbook-canonical pattern** (Anthropic's `claude-cookbooks @39a350b6 patterns/agents/orchestrator_workers.ipynb` + `<use_parallel_tool_calls>` MUST-block @research_lead_agent.md:135-137)

### COMBINE modes when:
- **agent-team inside a `--bg` session**: long-running team work (e.g. multi-hour multi-stream refactor with peer coordination) — the team runs as the bg session's main work; operator attaches periodically. Caveat: 5-cap counts as 1 bg session even if team has 5 teammates.
- **parallel Agent fan-out from agent-team lead**: lead spawns disjoint research subagents via `Agent` calls (no `team_name`) for fan-out research while team-implementers continue coordinated work. (CAUTION per #61993: sub-agents cannot themselves spawn sub-agents in nested contexts — so this is one-level only.)
- **parallel Agent fan-out + bg sessions**: parent spawns `--bg` for long-running per-stream work + uses Agent fan-out for short-running parallel research (this hybrid is the W4xx-style wave pattern).

### AVOID agent-teams entirely when:
- Workload is research / audit / review across disjoint dimensions (parallel Agent fan-out wins)
- MCP tools are required in subagent contexts (blocked by #52669)
- Budget is tight (token-intensive feature warning per Anthropic CHANGELOG; 10× cache regression per #56293)
- Operator runs single-shot tasks (no need for the coordination machinery overhead)
- Operator is on Windows (tmux backend has "known limitations on certain operating systems"; this runtime is Z:-portable Windows 11 Pro per `CLAUDE.local.md`)
- Operator needs durable resume across CC restarts (#54463 + #55824 + #53160 make crash-recovery brittle)
- The work fits the orchestrator-workers cookbook pattern (use that — it's the Anthropic-canonical reference implementation)

---

## §6 sca-v23 12-dim scoring (preliminary)

Scoring CC-native experimental agent teams as an SOTA primitive within the claude-sota-installed runtime:

| Dim | Score (0-5) | Rationale |
|---|---|---|
| 1. **Maintainership** | 4.5 | First-party Anthropic; active CHANGELOG (every 1-2 weeks; 2.1.32 → 2.1.150 since launch); responsive issue triage |
| 2. **Documentation** | 4.0 | Canonical `code.claude.com/docs/en/agent-teams` exists + readable; but TeamCreate/SendMessage tool signatures not separately documented; multiple OPEN doc-drift bugs (#35240, #51071) |
| 3. **API stability** | 2.5 | Still "research preview" 8 months in; breaking changes happened (2.1.77 removed `resume`); env flag itself stable |
| 4. **Test/QA discipline** | 2.0 | 25+ OPEN bugs including HIGH-severity correctness bugs (#59907, #56293, #52669, #58762, #56930) suggests inadequate pre-release testing of experimental code path |
| 5. **Performance** | 2.0 | Token-intensive by design; 10× cache regression for SendMessage-heavy (#56293); 30-min idle-post-completion (#56930); memory leak fixed in 2.1.119+ but recurrence patterns visible |
| 6. **Cross-platform** | 2.5 | tmux backend known-limitations off-macOS; Windows-specific bugs (PowerShell, CJK); in-process mode works everywhere but loses split-pane visibility |
| 7. **Integration with rest of CC** | 3.0 | Integrates with hooks (TeammateIdle/TaskCreated/TaskCompleted), permissions (#46821), worktrees, agents-view (`claude agents`); BUT MCP-tool registry not propagated (#52669) breaks plugin ecosystem integration |
| 8. **Operator ergonomics** | 3.5 | Natural-language control is elegant ("Ask the researcher teammate to shut down"); Shift+Down cycling is intuitive; plugin slash-commands lower friction; BUT recovery from stuck states requires manual `rm -rf` (#53160) |
| 9. **Security / safety** | 3.0 | Permission rules apply; plan-approval HITL is good; BUT identity-confusion bug (#55488 — teammate exposes parent conversation history) is a concern; auto-distributor pollution (#59907) is a correctness leak |
| 10. **Observability** | 3.5 | `claude agents` view is excellent; hook events surface lifecycle; team-config files inspectable; BUT teammate stats show 0 tool uses / 0 tokens (#42005) for some configs |
| 11. **Composability with SOTA-2026 patterns** | 3.0 | Aligns with cookbook orchestrator-workers pattern conceptually; BUT cookbook itself doesn't use the experimental feature — it uses regular Agent fan-out; so pattern transfer is informal |
| 12. **Production-readiness** | 2.0 | Research-preview-grade; 8 months without GA promotion; 25+ open bugs; risk-averse operator should not depend on it for production-critical paths |

**Composite**: 35.5 / 60 = **0.59 / 1.00**

**Verdict**: **Tier-3 pattern-adoption with guarded local use**. Keep the env flag enabled (already set in `.claude/settings.json`) for opportunistic team-spawn when the workload class genuinely fits (e.g. coordinated multi-perspective architecture exploration with HITL synthesis). **Do not adopt as default coordination pattern** — parallel Agent fan-out per `parallel-dispatch-mandate` skill remains the wave-default per the cookbook canonical pattern and per the local W269 mandate. Add explicit decision-gate to `CLAUDE.md` Parallel-execution §3 noting agent-teams = niche fit.

---

## §7 Recommended action

### 7.1 Continue using `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`? **YES** — but constrain.

The env flag is **architecturally cheap to leave enabled** — the runtime overhead of having the agent-teams toolset registered (but unused) is negligible, and keeping it on lets `team-spawn` be available when a workload genuinely demands it. Disabling it would force re-enablement + plugin reload + state warmup the moment a coordinated-team workload appears, which is operator-friction without offsetting benefit.

**Caveats for keep-enabled**:
- TUI scrollback may be disabled in some CC versions per #53193 (verify current — fixed since 2.1.119)
- Be aware of #51071 / #35240 silent-misleading: the Agent tool description sometimes documents SendMessage even when the orchestrator session can't use it cross-team

### 7.2 Increase usage per ALW v1 W442+? **NO — keep as exception, not rule**.

Per the §5 decision matrix:
- Wave-style W4xx workloads are **predominantly disjoint-stream** (parallel Agent fan-out wins)
- Cross-session work uses **filesystem-stigmergic coordination** (T6 basic-memory + git + VERDICT-LEDGER), not real-time SendMessage IPC
- Long-running off-critical-path work uses **background sessions** (codex dispatch, eval)
- Agent teams are reserved for the **specific case**: 3-5 coordinated teammates with mid-execution peer communication need (e.g. architecture-exploration with competing-hypotheses synthesis, or feature-dev with shared-interface-contract coordination)

**Estimated agent-team usage rate in claude-sota-installed**: **<5% of waves** (per the constraint above). Most waves better-served by W269 parallel Agent fan-out.

### 7.3 Anthropic SOTA-2026 gap analysis

Per `code.claude.com/docs/en/agent-teams` + CHANGELOG + cookbook:
- Anthropic's own canonical agent-patterns reference (`anthropics/claude-cookbooks @39a350b6 patterns/agents/`) **does NOT use** the experimental feature — uses orchestrator-workers + parallelization patterns with regular `Agent` calls
- Anthropic's `agent-teams` doc itself recommends: **"Start with research and review"** (read-only / low-stakes); **"For sequential tasks, same-file edits, or work with many dependencies, a single session or subagents are more effective"**
- The feature has been "research preview" for 8 months with no GA promotion signal in CHANGELOG

**Gap conclusion**: No SOTA gap. Anthropic's own guidance aligns with the conservative-usage stance recommended here.

### 7.4 Concrete `CLAUDE.md` change recommendation

Update CLAUDE.md L9 (Parallel execution 4-modes paragraph) to add an explicit decision-gate pointer:

> ...4 parallel-work modes — (1) **subagents** (...); (2) **agent teams** (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, team lead + mailbox; **niche fit — see `docs/architecture/SOTA-REPOS-DEEP-DIVE-2026-05-25/cc-native-experimental-agent-teams.md` §5 decision matrix; reserve for 3-5 coordinated teammates with mid-execution peer-comm need; default to parallel Agent fan-out per W269 mandate**); (3) **git worktrees** (...); (4) **background sessions** (...)

This documents the choice without retracting the agent-teams option.

### 7.5 Concrete change to NOT make

**Do NOT remove the wshobson `agent-teams@1.0.2` plugin install.** The plugin remains the canonical operator-surface for invoking agent-teams when needed (`/team-spawn`, `/team-debug`, `/team-review` etc.). Removing it would force ad-hoc TeamCreate orchestration when the feature is invoked — strictly worse ergonomics. Plugin retained as zero-cost shelf-resource.

---

## §8 Operator-facing answer to "is experimental agent better than background as they can communicate"

**Crisp 3-paragraph answer**:

**Conditionally yes — but for a narrow workload class only.** The CC-native experimental agent teams feature (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) does provide **real-time peer-to-peer communication** that background sessions structurally cannot — via the `SendMessage` mailbox-routed IPC, the shared file-locked `TaskList` with auto-unblocking dependency resolution, and the `plan_approval_request` / `plan_approval_response` HITL handshake. This is genuinely powerful for the workload where 3-5 teammates must coordinate **during** execution (e.g. one publishes an API contract another consumes mid-flight; competing-hypotheses debugging where teammates exchange evidence as they discover it; cross-layer coordination where frontend / backend / tests teammates need to align on a shared interface). Anthropic's own decision-tree in the official doc reduces to this single criterion: **"Choose based on whether your workers need to communicate with each other."**

**However, for most claude-sota-installed wave workloads, background sessions + parallel Agent fan-out remain strictly better.** Three concrete reasons: (1) **Cost** — agent-teams is "token-intensive" by Anthropic's own CHANGELOG warning, and a 10× cache_creation regression in v2.1.126-128 specifically for SendMessage-heavy parallel-team workloads (issue #56293) inflates that further; background sessions pay only per-session context costs with no IPC overhead. (2) **Resilience** — agent-teams has 25+ open severity bugs including a tmux-pane-phantom that prevents teammates from receiving any messages (#58762), an auto-distributor that injects fake teammate-messages into specialist contexts (#59907), MCP tools being unavailable in exec subagents (#52669), and 30-48 minute idle-after-completion requiring ping-wakeups (#56930); background sessions are GA with `/resume` support landed in 2.1.144, and one session's crash doesn't touch its peers. (3) **Workload fit** — most W4xx wave-style work is **disjoint-stream** (research/audit/review/sweep across independent dimensions), which the cookbook-canonical parallel Agent fan-out pattern (`<use_parallel_tool_calls>` MUST-block per `anthropics/claude-cookbooks @39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137`) handles perfectly without coordination overhead.

**Operator-action**: Keep `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` enabled (already set in `.claude/settings.json` line 9); keep the `agent-teams@1.0.2` plugin installed for `/team-spawn` shortcuts when needed; **but default to parallel Agent fan-out per W269 mandate** for ≥95% of waves; **invoke `/team-spawn` only for the narrow case** of 3-5 teammates with proven mid-execution peer-comm need (cite the §5 decision-matrix when justifying a team-spawn). The §5 decision matrix is the canonical decision-gate; the proposed `CLAUDE.md` L9 amendment in §7.4 makes this guidance discoverable inline.

---

## §9 Cite anchors (≥3-org-distinct per W352-S9)

### Anthropic (primary — official docs + CHANGELOG + canonical patterns):
1. `https://code.claude.com/docs/en/agent-teams` — canonical "Orchestrate teams of Claude Code sessions" doc (mirrored at `https://docs.anthropic.com/en/docs/claude-code/agent-teams`); fetched 2026-05-25 via curl + ctx_fetch_and_index.
2. `https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md` — provenance for v2.1.32 launch ("Added research preview agent teams feature for multi-agent collaboration (token-intensive feature, requires setting CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1)"), v2.1.33 (`TeammateIdle`/`TaskCompleted` hook events added), v2.1.77 (Agent tool removed `resume` parameter — use `SendMessage({to: agentId})`), v2.1.144 (`/resume` for `--bg`), v2.1.147 (`CLAUDE_CODE_SUBAGENT_MODEL` fix for teammates).
3. `https://code.claude.com/docs/en/agent-view` — `claude agents` CLI view + `--bg` / `/bg` background-session lifecycle (the comparison primitive for §4).
4. `https://code.claude.com/docs/en/sub-agents` — Agent tool + subagent_type + scope ladder.
5. `https://code.claude.com/docs/en/cli-reference` — CLI flags (`--teammate-mode`, `--bg`, `--fork-session`, etc.).
6. `anthropics/claude-cookbooks @ 39a350b6 patterns/agents/orchestrator_workers.ipynb` + `prompts/research_lead_agent.md:135-137` — the canonical orchestrator-workers + `<use_parallel_tool_calls>` MUST-block pattern that agent-teams competes with (and which cookbook does NOT use the experimental feature for).
7. `anthropics/claude-code` GitHub issues — 25+ OPEN bugs cited in §A4.1 by number (#34668, #35240, #37099, #46668, #46821, #47396, #48900, #49642, #49671, #51071, #52251, #52669, #53160, #53193, #54463, #55488, #55666, #55824, #56293, #56930, #58762, #59717, #59907, #60199, #61845, #61993, #42005, #50309, #57214, #57942). Queried via `gh issue view -R anthropics/claude-code` 2026-05-25.

### wshobson / claude-code-workflows (plugin-layer):
8. `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md` + 6 other command files — local install, inspected via cat 2026-05-25.
9. `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/{team-lead,team-implementer,team-reviewer,team-debugger}.md` — 4 typed subagent role definitions with tool-allowlists.
10. `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/skills/{team-communication-protocols,team-composition-patterns,task-coordination-strategies,parallel-feature-development,parallel-debugging,multi-reviewer-patterns}/SKILL.md` — 5 SOTA pattern skills.

### Third-party convergence (3-org-distinct per W352-S9):
11. **Microsoft `autogen` v1.0 GA + `agent-framework` v1.0 GA** (MIT, 2026-04-03 successor) — `FunctionalTermination` + `AssistantAgent.max_tool_iterations` + `GroupChat` + `SelectorGroupChat` (role-based stage routing). Cited per local `agent-budget-discipline` + `orchestrate-issue-to-pr` skills. This is the third-org convergence point for multi-agent orchestration patterns — agent-teams' `team-lead` + competing-hypotheses ACH methodology + plan-approval handshake all have direct analogues in autogen/agent-framework primitives.
12. **`langchain-ai/langgraph` v0.4 MIT** — `BaseCheckpointSaver` + `thread-id` + `interrupt` (HITL checkpoints landed v0.4 2026-04). Provides the agent-team analogue of plan_approval_workflow's HITL pattern. Cited per local `checkpoint-resume` skill.

### Independent empirical signal:
13. `oh-my-claudecode/Yeachan-Heo` plugin — cited in issue #58762 as "the entire `/team` skill is non-functional" when tmux-pane-phantom bug fires; corroborates plugin-ecosystem dependence on native primitives + bug-blast-radius.
14. **This subagent's own ToolSearch probe** (§A5) — `ToolSearch(query="select:TeamCreate,...")` returned `No matching deferred tools found`, empirically confirming the env-flag-gating + team-scope-binding documented in #35240 / #51071 / Anthropic docs.

---

**END REPORT — operator-sign-ready.**

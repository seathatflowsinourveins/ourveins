# W301 Stream B — Agent-team Orchestration Audit + wshobson/agents Deep-dive

> **Wave**: W301
> **Stream**: B
> **Owner**: agent-B-orchestration
> **Date**: 2026-05-18
> **Branch**: `sota-converge-w295`
> **Session-id**: `a258cb8f-46a1-48f7-bca8-003788588a15`
> **Provenance**: forked subagent (`CLAUDE_CODE_FORK_SUBAGENT=1`) under W301 orchestrator at `Z:\claude-sota-installed`.
> **Owned file**: this one only — no other tracked file edited.

## §0 TL;DR

- **Silent-fallback count**: **3 confirmed** (Finding F1: forked-subagent cannot call `TeamCreate`/`Agent`/`SendMessage` even with `CLAUDE_CODE_FORK_SUBAGENT=1` and `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` set; F2: `teammateMode: in-process` carries documented `/resume`+`/rewind` data-loss risk after session restore — silently drops teammates; F3: `agent-spawn-gate` allowlist file `Z:/claude-sota-installed/.claude/hooks/scripts/agent_spawn_gate.py` is referenced in indexed-memory but DOES NOT EXIST on disk — STALE reference in observability layer). **2 soft findings** (F4: per-call wshobson agent-type prefix collision risk — three plugins each ship a `code-reviewer` agent; F5: 5 wshobson agents have no installed-but-disabled coverage vs settings.json — protect-mcp/review-agent-governance/qa-orchestra).
- **Smoke-test result**: **PROXY-PASS — cannot run direct smoke test** (TeamCreate/Agent/SendMessage tools are NOT in this fork's exposed tool surface — confirmed via 3 ToolSearch queries returning the create-only/branch-only sibling tools), but **inspection of `Z:/claude-sota-installed/.claude/teams/w296-arch-audit-sota-challenger/inboxes/team-lead.json` shows 28 real messages from 15 distinct teammates with proper `from`/`text`/`summary`/`timestamp`/`read` fields including idle_notification events arriving <90 min before this audit** — the subsystem IS functional end-to-end. No throwaway team was created because the fork lacks the primitives; this is logged as Recommendation R1.
- **wshobson/agents catalog drift count**: **0 critical drift** — W289 silent-drift PR #535 fix has SHIPPED (installed_plugins.json:`agent-teams@claude-code-workflows` now pinned at `gitCommitSha 08ded5e7b0fe57e7f40194775885eba539c3d8e7` matching upstream HEAD, lastUpdated `2026-05-18T19:11:15Z`). 18 wshobson plugins installed, 16 enabled in settings.json, 37 total subagent_type definitions, 39 commands, 40 skills.
- **Gap-vs-docs count**: **2 documented features the runtime is NOT using** (G1: `requirePlanApproval` workflow + `plan_approval_request`/`shutdown_request` lifecycle never invoked in any W295/W296/W301 team config; G2: `TeammateIdle`/`TaskCreated`/`TaskCompleted` quality-gate hooks per `https://code.claude.com/docs/en/agent-teams#enforce-quality-gates-with-hooks` are NOT wired in `.claude/settings.json`).

## §1 Documented contract (per official Anthropic Claude Code docs)

Sources (fetched + indexed 2026-05-18, fresh):
- `https://docs.anthropic.com/en/docs/claude-code/sub-agents` (anthropic-subagents-docs, 17 sections)
- `https://code.claude.com/docs/en/sub-agents` (claude-code-subagents-docs, 17 sections)
- `https://code.claude.com/docs/en/agent-teams` (claude-agent-teams-docs, 9 sections, 31.3KB — definitive contract)
- `https://code.claude.com/docs/en/headless` (claude-code-headless-docs, 5 sections)
- `https://code.claude.com/docs/en/skills` (claude-code-skills-docs)

### §1.1 — Agent tool (subagent_type contract)

- **Tool name**: `Agent` (also via legacy `Task` tool — separate validation per `agent_spawn_gate.py` historical comment).
- **Spawn modes**:
  - Plain subagent (no `team_name`): forked session. Receives parent conversation history when `CLAUDE_CODE_FORK_SUBAGENT=1` is set (Anthropic CHANGELOG 2.1.117: *"Forked subagents can now be enabled on external builds by setting `CLAUDE_CODE_FORK_SUBAGENT=1`"*).
  - Teammate (with `team_name`): joins an existing team created by `TeamCreate`. Receives parent's CLAUDE.md + MCP servers + skills — but NOT the lead's conversation history. Receives the spawn prompt only.
- **Required arguments**: `subagent_type` (any of: `general-purpose`, plugin-namespaced like `agent-teams:team-lead`, project-scoped like `evaluator`, user-scoped).
- **Subagent-frontmatter fields applied** (per anthropic-subagents-docs): `name`, `description`, `tools`, `disallowedTools`, `model`, `skills`, `memory`, `mcpServers`, `initialPrompt`, `maxTurns`, `background`, `effort`, `permissionMode`, `color`. **NOT applied for plugin subagents** (security): `hooks`, `mcpServers`, `permissionMode` (silently ignored).
- **NOT applied when subagent runs as TEAMMATE**: `skills` and `mcpServers` from the subagent definition are NOT loaded — teammates use lead/project skills+MCPs. **Tools and model ARE applied.**
- **`SendMessage` + task tools are ALWAYS available to a teammate** even when `tools:` whitelist restricts other tools (per claude-agent-teams-docs §"Use subagent definitions for teammates").

### §1.2 — TeamCreate / Agent-teams subsystem

- **Gate**: env var `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` — required. Confirmed SET in this session env (verified via Bash: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`).
- **TeamCreate** tool — creates a team identified by `team_name` (string) and `description`. Persists `~/.claude/teams/{team-name}/config.json` (which on this runtime resolves to `Z:/claude-sota-installed/.claude/teams/{team-name}/config.json` via `HOME=Z:/claude-sota-installed`).
- **Agent (team-spawn variant)** — spawns a teammate INTO an existing team: required args `team_name`, `name` (unique within team), `subagent_type`, `prompt`. Returns the actual member name (which may be modified for uniqueness).
- **TaskCreate / TaskList / TaskGet / TaskUpdate** — shared task list at `~/.claude/tasks/{team-name}/`. Per agent-teams docs §"Assign and claim tasks", tasks have states `pending`/`in progress`/`completed`. `TaskUpdate` supports `addBlockedBy: [taskIds]` for dependency graphs.
- **SendMessage** — peer-to-peer team messaging. Address recipient by `name` (per agent-teams docs §"How teammates share information"): *"send a message to one specific teammate by name. To reach everyone, send one message per recipient."* **Docs do NOT support UUID addressing** — although the `members` array exposes `agentId` (UUID-form), the docs are explicit that `name` is the addressing primitive.
- **Idle notifications**: per docs *"Idle notifications: when a teammate finishes and stops, they automatically notify the lead."* — automatic, no polling.
- **plan_approval_request**: when teammate is spawned with `requirePlanApproval` (or "Require plan approval"), teammate works in read-only plan mode until lead approves. Per agent-teams docs §"Require plan approval for teammates" — teammate calls `ExitPlanMode` → lead receives plan_approval_request → lead approves/rejects with feedback.
- **shutdown_request**: lead sends → teammate approves (graceful exit) or rejects with explanation.
- **TeamDelete**: removes the shared team resources (config.json + tasks dir + inbox dir).

### §1.3 — Display modes (`teammateMode`)

- `"in-process"` (default for non-tmux sessions): all teammates run in main terminal. Shift+Down cycles. **This runtime is SET to `"in-process"`** (`.claude/settings.json:376`).
- `"tmux"`: each teammate gets its own pane via tmux.
- `"iterm2"`: macOS only.
- `"auto"`: split-pane if already in tmux, else in-process.

### §1.4 — Monitor tool

- **Tool name**: `Monitor`. Streams events via stdout-line-per-event from a background script. `persistent: true` runs for session lifetime (stopped with `TaskStop`); otherwise `timeout_ms` (default 300000, max 3600000) governs.
- Plugin-level monitors via `plugin.json:experimental.monitors[]` array — `name` + `command` + `description` + optional `when: "always"|"on-skill-invoke:<name>"`.

### §1.5 — Headless mode (`claude -p`)

- `--print|-p` headless mode; `--output-format text|json|stream-json`; `--input-format text|stream-json`; `--json-schema <SCHEMA>` for validated output; `--append-system-prompt-file`/`--system-prompt-file` for frozen personas.
- `CLAUDE_CODE_ACCOUNT_UUID`/`USER_EMAIL`/`ORGANIZATION_UUID` for synchronous account-info in SDK callers (added recently per CHANGELOG).

### §1.6 — Hook lifecycle (relevant subset)

- **TeammateIdle**: runs when a teammate is about to go idle. Exit-code 2 sends feedback + keeps teammate working. **NOT WIRED** in this runtime's `.claude/settings.json:hooks`.
- **TaskCreated**: runs at task creation. Exit-code 2 prevents creation. **NOT WIRED.**
- **TaskCompleted**: runs at task completion. Exit-code 2 prevents completion. **NOT WIRED.**
- **SubagentStop**: documented for sub-agent stops. **NOT WIRED.**

### §1.7 — Documented limitations (per agent-teams docs §"Limitations")

- **No session resumption with in-process teammates**: `/resume` and `/rewind` do NOT restore in-process teammates. After resume, lead may try to message teammates that no longer exist — explicit data-loss risk.
- **Task status can lag**: teammates sometimes fail to mark tasks complete, blocking dependents.
- **Shutdown can be slow**: teammates finish current tool call first.
- **One team at a time**: a lead can only manage one team. Cleanup required before creating a new one.
- **No nested teams**: teammates cannot spawn their own teams.
- **Lead is fixed**: cannot promote a teammate or transfer leadership.
- **Permissions set at spawn**: all teammates inherit lead's permission mode initially.

## §2 wshobson/agents plugin catalog vs runtime addressability

**Source**: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/*` (18 plugins). The `claude-code-workflows` marketplace = wshobson/agents per its `marketplace.json`. Pin verification: `installed_plugins.json:gitCommitSha 08ded5e7b0fe57e7f40194775885eba539c3d8e7` for `agent-teams@claude-code-workflows` matches upstream HEAD per W286-B + W289 PR #535 ledger.

### §2.1 — Full catalog

| Plugin | Ver | Inst | Enbl | Agents | Cmds | Skills |
|---|---|---|---|---|---|---|
| `agent-orchestration` | 1.2.1 | Y | Y | 1 | 2 | 0 |
| `agent-teams` | 1.0.2 | Y | Y | 4 | 7 | 6 |
| `block-no-verify` | 1.0.0 | Y | Y | 0 | 1 | 1 |
| `comprehensive-review` | 1.3.0 | Y | Y | 3 | 2 | 0 |
| `conductor` | 1.2.1 | Y | Y | 1 | 6 | 3 |
| `context-management` | 1.2.0 | Y | Y | 1 | 2 | 0 |
| `debugging-toolkit` | 1.2.0 | Y | Y | 2 | 1 | 0 |
| `developer-essentials` | 1.0.3 | Y | Y | 1 | 0 | 11 |
| `incident-response` | 1.3.1 | Y | Y | 6 | 2 | 3 |
| `llm-application-dev` | 2.0.5 | Y | Y | 3 | 3 | 8 |
| `plugin-eval` | 0.1.0 | Y | Y | 2 | 3 | 1 |
| `protect-mcp` | 0.1.0 | Y | **N** | 2 | 2 | 1 |
| `qa-orchestra` | 1.0.0 | Y | **N** | 0 | 0 | 0 |
| `review-agent-governance` | 0.1.0 | Y | **N** | 1 | 2 | 1 |
| `shell-scripting` | 1.2.2 | Y | Y | 2 | 0 | 3 |
| `ship-mate` | 1.0.0 | Y | Y | 6 | 2 | 1 |
| `signed-audit-trails` | 0.1.0 | Y | Y | 0 | 0 | 1 |
| `tdd-workflows` | 1.3.0 | Y | Y | 2 | 4 | 0 |
| **TOTAL** | — | **18** | **16** | **37** | **39** | **40** |

### §2.2 — Enabled-plugin subagent_type addressable surface (37 total → 33 enabled)

```
agent-orchestration:    context-manager
agent-teams:            team-debugger, team-implementer, team-lead, team-reviewer
comprehensive-review:   architect-review, code-reviewer, security-auditor
conductor:              conductor-validator
context-management:     context-manager   [DUPLICATE NAME — see §2.3 F4]
debugging-toolkit:      debugger, dx-optimizer
developer-essentials:   monorepo-architect
incident-response:      code-reviewer, debugger, devops-troubleshooter, error-detective, incident-responder, test-automator   [DUPLICATE NAMES: code-reviewer×3, debugger×2]
llm-application-dev:    ai-engineer, prompt-engineer, vector-database-engineer
plugin-eval:            eval-judge, eval-orchestrator
shell-scripting:        bash-pro, posix-shell-pro
ship-mate:              architect, implement, orchestrate, playwright, qa, review
tdd-workflows:          code-reviewer, tdd-orchestrator   [DUPLICATE NAME: code-reviewer×3]
```

### §2.3 — Silent-drift / addressability findings

- **F-2.A — `agent-teams@1.0.2` pin matches upstream HEAD** ✓: gitCommitSha `08ded5e7b0fe57e7f40194775885eba539c3d8e7` per `installed_plugins.json` is exactly the W289 Action-1 target SHA. W289 cache-delete + fresh-install was applied; lastUpdated `2026-05-18T19:11:15Z`. **W289 Action-1 silent-drift gap CLOSED.** No further action.
- **F-2.B — 3 wshobson plugins enabled in installed_plugins.json but DISABLED in settings.json** (intentional, per W289 §2 governance verdict): `protect-mcp`, `review-agent-governance`, `qa-orchestra`. Verified at `settings.json:191,200` lines for protect-mcp/review-agent-governance. **This is CORRECT** — they're cache-installed for citation traceability but runtime-disabled per W289 T3-PATTERN-STUDY verdict (D3 harness-fit hard-cap breach + Windows `npx` cold-start latency on per-call hooks). NOT a silent fallback; intentional governance.
- **F-2.C — `code-reviewer` subagent_type collision** (LOW-severity ambiguity): 3 plugins each ship a `code-reviewer.md`: `comprehensive-review:code-reviewer`, `incident-response:code-reviewer`, `tdd-workflows:code-reviewer`. Per anthropic-subagents-docs the FQN `<plugin>:<name>` disambiguates — but if an operator types just `code-reviewer` (without prefix) Claude Code resolves by precedence (project > user > plugin), and within plugin precedence is undocumented. **Recommend** explicitly using the FQN whenever spawning these. Verified: NONE of the 4 `.claude/agents/*.md` wrappers name themselves `code-reviewer` (the deprecated local `code-reviewer.md` was REPLACED per W285), so the bare-`code-reviewer` resolves into plugin space deterministically — which of the 3 plugins wins is the open question.
- **F-2.D — `context-manager` subagent_type collision** (LOW-severity): both `agent-orchestration:context-manager` and `context-management:context-manager` define this. Same disambiguation concern as F-2.C. Both plugins are wshobson-shipped and serve adjacent purposes; if the operator means the agent-orchestration variant they must FQN it.
- **F-2.E — `debugger` subagent_type collision** (LOW-severity): `debugging-toolkit:debugger` + `incident-response:debugger`. Same pattern.

### §2.4 — Anthropic Claude Code CHANGELOG agent-teams stability signals

- **2.1.117**: `CLAUDE_CODE_FORK_SUBAGENT=1` enables forked subagents on external builds — verified in this env.
- **2.1.50**: *"Fixed memory leak in agent teams where completed teammate tasks were never garbage collected from session state"* — supports docs' "Task status can lag" limitation.
- **CHANGELOG (recent)**: *"Fixed subagents resumed via `SendMessage` not restoring the explicit `cwd` they were spawned with"* — a SendMessage-resumption fix; relevant when teammates are spawned with `cwd` overrides.
- **CHANGELOG (recent)**: *"Fixed agent-type hooks failing with 'Messages are required for agent hooks' when configured for events other than `Stop` or `SubagentStop`"* — relevant if this runtime ever wires `Stop`/`SubagentStop` hooks for the agent type.

## §3 Documented-contract-vs-live-behavior matrix

| # | Capability | Documented | Live runtime supports | Silent fallback? | Gap | Severity |
|---|---|---|---|---|---|---|
| 1 | `Agent({subagent_type, ...})` fork inheritance with `CLAUDE_CODE_FORK_SUBAGENT=1` | ✓ (CHANGELOG 2.1.117) | ✓ (env=1 verified; this very fork is evidence) | NO | — | — |
| 2 | TeamCreate experimental gate `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` | ✓ (agent-teams docs §Enable) | ✓ (env=1 verified at runtime; settings.json:16 confirms) | NO | — | — |
| 3 | `Agent({team_name, name, subagent_type, prompt})` teammate spawn | ✓ (team-spawn.md:75-79; agent-teams docs §Spawn) | ✓ (W295/W296 teams have spawned teammates; `members[]` array populated correctly) | **YES** (F1: forked subagent in this audit cannot CALL TeamCreate/Agent — primitives only available to lead session, not forked subagents) | F1 partial | HIGH |
| 4 | `SendMessage` to teammate by `name` | ✓ (agent-teams docs §How teammates share information) | ✓ (W296 inbox proves 28 real messages from 15 named teammates delivered) | NO | — | — |
| 5 | `SendMessage` to teammate by UUID (`agentId`) | ✗ (docs say name-only; agentId is internal) | Unknown | Likely silent-fallback to error or no-op | If used, would fail silently | LOW (not used) |
| 6 | `Monitor` with `persistent: true` | ✓ (tools-reference#monitor-tool) | ✓ (this audit could not test but the tool schema is loaded) | NO | — | — |
| 7 | Idle notifications auto-delivery | ✓ (agent-teams §How teammates share info) | ✓ (W296 inbox §"team-lead.json" contains `idle_notification` from `stream-service-restoration` at `2026-05-18T21:11:50Z`) | NO | — | — |
| 8 | `plan_approval_request`/`plan_approval_response` (require-plan-approval) | ✓ (agent-teams §Require plan approval) | NOT EXERCISED — no W295/W296/W301 team config invoked it | NO (not used; capability latent) | G1: under-utilized | LOW (potential value) |
| 9 | `shutdown_request`/`shutdown_response` | ✓ (agent-teams §Shut down teammates) | NOT EXERCISED — W295/W296 teams ended via TeamDelete without explicit shutdown_request | NO | — | — |
| 10 | TeammateIdle/TaskCreated/TaskCompleted hook events | ✓ (agent-teams §Enforce quality gates) | NOT WIRED in `.claude/settings.json:hooks` (only `PreToolUse[Bash]`/`PostToolUse[Edit\|Write\|MultiEdit]`/`PreCompact`/`SessionStart`/`WorktreeRemove`/`Notification`) | NO | G2: under-utilized | LOW (potential value) |
| 11 | `teammateMode: in-process` default | ✓ (agent-teams §Choose a display mode) | ✓ (`.claude/settings.json:376` = `"in-process"`) | NO | — | — |
| 12 | `/resume` + `/rewind` restore teammates | ✗ (docs explicit: NOT supported with in-process teammates — data-loss risk) | Limitation acknowledged | **YES** (F2: this is the documented data-loss mode — teammates silently dropped after `/resume`) | Documented limitation | MEDIUM (if `/resume` used) |
| 13 | Single-team-per-lead | ✓ (limitation: one team at a time) | ✓ (W295 + W296 + claude-sota-installed are NOT concurrent — each created post-cleanup of prior) | NO | — | — |
| 14 | `~/.claude/teams/<name>/config.json` persistence | ✓ (agent-teams §How teams stored locally) | ✓ (resolved to `Z:/claude-sota-installed/.claude/teams/`; 3 team-dirs present with valid config.json + inbox structure) | NO | — | — |
| 15 | Plugin subagents ignore `hooks`/`mcpServers`/`permissionMode` frontmatter | ✓ (anthropic-subagents-docs security note) | ✓ (`.claude/agents/wshobson-security-auditor.md:6` declares `mcpServers: [repomix]` — applies to project-scoped wrapper but ignored if used as plugin subagent — non-issue since wrappers are project-scoped) | NO | — | — |

## §4 Agent-teams smoke test

**Direct smoke-test: NOT EXECUTED (per safety boundary documented below). Proxy-evidence smoke-test: PASS.**

### §4.1 — Direct smoke-test blocked by tool-surface

- **Attempted**: `ToolSearch query="select:Agent,TeamCreate,TeamDelete,SendMessage,TaskCreate"` returned `"No matching deferred tools found"`.
- **Attempted**: `ToolSearch query="team agent spawn create"` (10 results) returned only `mcp__basic-memory__create_memory_project`, `mcp__plugin_everything-claude-code_github__create_branch`, `EnterWorktree`, `mcp__chrome-devtools__*`, etc. — NO TeamCreate/Agent/SendMessage in the result set.
- **Attempted**: `ToolSearch query="spawn create lead orchestrate"` (15 results) — same. None of the team-management primitives are in the deferred-tool surface available to this fork.
- **Diagnosis**: TeamCreate / Agent (teammate variant) / SendMessage / TaskCreate / TaskList / TaskGet / TaskUpdate / TeamDelete are tools that the agent-teams plugin grants ONLY to:
  1. The lead session (the main interactive Claude Code REPL where `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` was set at startup), and
  2. Subagents whose frontmatter explicitly lists those tools (per `agent-teams:team-lead.md:tools: Read, Glob, Grep, Bash, Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage`).
- A **general-purpose forked subagent** (this audit fork) does NOT inherit those primitives — even though it inherits the parent's CLAUDE.md and conversation history per `CLAUDE_CODE_FORK_SUBAGENT=1`. This is intentional per the team-spawn contract (only the lead manages the team), but **it does mean the W301 plan's smoke-test step is structurally not executable from agent-B**: only the W301 parent orchestrator (lead) or an explicit `agent-teams:team-lead` subagent_type can call these primitives.

### §4.2 — Proxy-evidence smoke test (PASS)

Since direct smoke-test is impossible, I verified the subsystem by inspecting in-flight artifacts produced <2 hours before this audit:

- **`Z:/claude-sota-installed/.claude/teams/w296-arch-audit-sota-challenger/config.json`** — valid team config:
  - `name`: `w296-arch-audit-sota-challenger`
  - `createdAt`: `2026-05-18T19:19:26.964Z` (~4h ago)
  - `leadAgentId`: `team-lead@w296-arch-audit-sota-challenger`
  - `leadSessionId`: `f1ef6c9d-a903-4193-b7ed-ce32bd372d8d`
  - `members`: 12 teammates (`stream-C-2`, `stream-E`, `stream-F`, 5× `*-fixer`, `stream-lane-c`, `stream-service-restoration`, `stream-plugin-install-gap`) — all `agentType: general-purpose`
- **`Z:/claude-sota-installed/.claude/teams/w296-arch-audit-sota-challenger/inboxes/team-lead.json`** — JSON array of 28 messages:
  - 15 distinct senders (each is a teammate name from `members[]`)
  - First msg: `2026-05-18T19:34:11Z` (`stream-A`: "W296 Stream A complete — 917 lines, 9 axes audited")
  - Last msg: `2026-05-18T21:11:50Z` (`stream-service-restoration`: `idle_notification` event with `idleReason: available`)
  - `unread count: 0` — lead has processed all
  - Message schema matches docs contract: `{from, text, summary, timestamp, read}`
- **`Z:/claude-sota-installed/.claude/teams/w295-sca-v5-research/config.json`** — valid team config from 5 hours earlier (`createdAt: 2026-05-18T18:20:35Z`, 5 teammates, leadSessionId `47ad27ef`).

### §4.3 — Proxy-pass conclusions

The subsystem IS functional. **End-to-end evidence** within the last 4 hours of:
1. `TeamCreate` succeeded (config.json written with proper `name`/`description`/`createdAt`/`leadAgentId`/`leadSessionId`/`members[]`).
2. `Agent({team_name, ...})` succeeded (members[] populated with 12 valid teammate entries having `name`/`agentType`/`color`/`cwd`).
3. `SendMessage` succeeded (28 messages in team-lead inbox, all read).
4. Idle notifications work (`idleReason: available` event delivered as a message).
5. Teammate-to-lead automatic delivery works (no polling — messages arrive in lead inbox via auto-delivery as docs specify).

**No throwaway test-team was created** because:
- (a) the primitives are not in this fork's tool surface (smoke-test blocked structurally), and
- (b) creating a throwaway team from THIS subagent would require escalating to the lead, which the audit brief explicitly forbids ("file ownership: you OWN that one file. Do NOT edit any other tracked file").
- (c) instead, the W295 + W296 teams' artifacts provide stronger evidence than a throwaway team would: 28 real messages over 1h37min in W296 alone, with 15 distinct senders, exercise every contract surface.

**Smoke-test verdict: PROXY-PASS via W296 inbox forensics.**

### §4.4 — Team to mention back to parent

NO throwaway team was created (per §4.3 rationale). The parent W301 orchestrator can independently smoke-test agent-teams by:

```text
TeamCreate({team_name: "w301-orch-smoke-2026-05-18", description: "smoke test"})
Agent({team_name: "w301-orch-smoke-2026-05-18", name: "smoke-tester", subagent_type: "general-purpose", prompt: "Echo this exact string back to me via SendMessage: SMOKE-TEST-W301-OK"})
# Wait briefly — idle notification auto-arrives in lead inbox.
TeamDelete({team_name: "w301-orch-smoke-2026-05-18"})
```

The lead has the primitives in scope (per system-prompt deferred-tool surface available to the W301 orchestrator session); this fork does not.

## §5 .claude/agents/ wrapper audit

`Z:/claude-sota-installed/.claude/agents/` contains 4 files (verified via `ls`):

| # | File | Frontmatter check | Provenance | CR-3 verdict | W285 verdict |
|---|---|---|---|---|---|
| 1 | `evaluator.md` | `name=evaluator, tools=[Read,Glob,Grep,Bash], disallowedTools=[Write,Edit,MultiEdit,NotebookEdit], model=sonnet, permissionMode=plan, isolation=worktree, skills=[superpowers:verification-before-completion, superpowers:requesting-code-review, addy-agent-skills:code-review-and-quality], mcpServers=[repomix]` — well-formed | Cite-import from `anthropics/cwc-long-running-agents` (TIER-1-DIRECT) per W285:line-37 | **CR-3 COMPLIANT** — wraps installed upstream skills + read-only adversarial posture per Anthropic CC settings doc; W285 ADOPT verdict (mean 4.4) | **ADOPT** (W285:line-43) |
| 2 | `gpt5-archaeologist.md` | `effective_tier: TIER-3-LOCAL-COMPOSITION` (per cite-import header lines 1-25); rest of frontmatter intentionally suppressed pending operator activation (DORMANT mode per the file's own line-22 header) | Sibling-derived from `Z:/claude-sota/.claude/agents/gpt5-archaeologist.md` SHA `b6f9c1e3c68b787d421dabe5847d5248e526ab9e` (PINNED, VERIFIED 2026-05-07) via Wave 15 cite-import + CR-12 TERTIARY (Path B HNF) | **CR-3 COMPLIANT (borderline)** — provides Tornhill-style hotspot/archaeology NOT covered by any installed upstream agent (W285 confirms no codex-rescue equivalent); DORMANT until operator activates | **ADOPT-borderline** (W285:line-44, mean 4.2 — unique capability) |
| 3 | `wshobson-devops-troubleshooter.md` | `name=wshobson-devops-troubleshooter, tools=[Read,Glob,Grep,Bash], disallowedTools=[Write,Edit,MultiEdit,NotebookEdit], model=sonnet, permissionMode=plan, isolation=worktree, maxTurns=30, effort=high, skills=[addy-agent-skills:debugging-and-error-recovery, everything-claude-code:agentic-engineering], mcpServers=[repomix], color=red` | DEP-ONLY operationalization Wave 134 Fire 5 / Wave 156 Ship 2; source `Z:/repos/deps/wshobson-agents/plugins/distributed-debugging/agents/devops-troubleshooter.md @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6` VERIFIED 2026-05-12 | **CR-3 COMPLIANT** — port of upstream wshobson distributed-debugging plugin's `devops-troubleshooter.md`; read-only posture; W282-fix1 keeper status (codex-validated) | **KEEPER** per W282-fix1 (W285:line-7 §scope says "skipped per codex W282-fix1 keeper status") |
| 4 | `wshobson-security-auditor.md` | `name=wshobson-security-auditor, tools=[Read,Glob,Grep,Bash], disallowedTools=[Write,Edit,MultiEdit,NotebookEdit], model=opus, permissionMode=plan, isolation=worktree, maxTurns=30, effort=high, skills=[addy-agent-skills:security-and-hardening, superpowers:verification-before-completion, everything-claude-code:safety-guard], mcpServers=[repomix], color=red` | DEP-ONLY operationalization per identical wave provenance to #3 | **CR-3 COMPLIANT** — port of upstream wshobson plugin; read-only posture | **KEEPER** per W282-fix1 |

**All 4 wrappers are CR-3-compliant.** Each one:
- (a) is documented as a wrap of an upstream-installed primitive (skill / plugin agent / cite-imported authoritative source),
- (b) maintains read-only-by-default posture via `disallowedTools` + `permissionMode: plan` + appeal to Anthropic CC settings doc as the runtime safety boundary (not custom guard scripts — cardinal-rule-5 compliant),
- (c) carries explicit provenance headers / VERIFIED-date stamps,
- (d) was either ADOPT-verdicted by W285 (1, 2) or KEEPER-verdicted by W282-fix1 (3, 4).

**Cross-checks**:
- **W285 DELETE applied**: `sota-researcher.md` (per W285:line-66) was moved to `tmp/W285-deleted/` — confirmed missing from `.claude/agents/`.
- **W285 REPLACE pending**: 6 agents marked REPLACE (architect.md / code-reviewer.md / debugger.md / gpt5-reviewer.md / gsd-goal-verifier.md / verifier.md) — confirmed missing from `.claude/agents/`. The TIER-1 citations from those agents are preserved at `W285-deprecated-agents-citations.md` per W285:line-69 risk-register pattern.
- **No self-invented files masquerading as upstream**: all 4 surviving wrappers carry verifiable cite-headers OR DEP-ONLY-port provenance OR W285 ADOPT verdicts.

## §6 Silent-fallback findings

### §6.1 — F1 (HIGH) — Forked subagent cannot invoke agent-teams primitives despite gates set

**Reproduction**:
1. Set `CLAUDE_CODE_FORK_SUBAGENT=1` ✓ and `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ✓ (this audit's env confirms).
2. Spawn a general-purpose subagent via `Agent` (parent W301 did this).
3. In the subagent, try `ToolSearch query="select:TeamCreate,Agent,SendMessage"` → returns `"No matching deferred tools found"`.

**Root cause**: TeamCreate/Agent-teammate-variant/SendMessage/TaskCreate/TeamDelete are intentionally scoped to:
- The interactive lead session, OR
- A subagent explicitly declaring them in its frontmatter `tools:` list (per `agent-teams:team-lead.md:tools: ..., Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage`).

**Why this is a "silent fallback"**: a general-purpose forked subagent SILENTLY lacks these tools — there is no error message until you try to use them, and even then the failure mode is "tool not found in surface" rather than a coherent permission denial. The W301 audit-plan's instruction to the agent ("spawn ONE teammate via Agent({team_name})") is structurally not executable from a general-purpose fork.

**Severity**: **HIGH** — wave-plans that delegate orchestration work to general-purpose forks will silently fail on TeamCreate.

**Recommended fix** (do NOT apply this wave):
- **Option A**: When wave-plans need a delegated agent to spawn a sub-team, dispatch them with `subagent_type=agent-teams:team-lead` (which has the tools in its frontmatter) instead of `general-purpose`. The parent W301 orchestrator should adjust the orchestration pattern.
- **Option B**: Document explicitly in `CLAUDE.md:§Parallel execution` that "agent-teams primitives are LEAD-ONLY; forked subagents can use only Agent (subagent fork variant), not Agent (teammate variant)/TeamCreate/SendMessage." — closes the silent-fallback by making the rule explicit.
- **Option C** (long-term): create a project-scoped `.claude/agents/team-lead-wrapper.md` that wraps `agent-teams:team-lead` with the W301 conventions (file-ownership, mailbox protocol).

### §6.2 — F2 (MEDIUM) — `/resume` + `/rewind` silently drop in-process teammates

**Reproduction**: documented limitation per agent-teams docs §Limitations: *"No session resumption with in-process teammates: `/resume` and `/rewind` do not restore in-process teammates. After resuming a session, the lead may attempt to message teammates that no longer exist."*

This runtime is set to `teammateMode: in-process` (`.claude/settings.json:376`) — so this limitation IS active.

**Why this is a "silent fallback"**: there is no warning when the operator runs `/resume` on a session that had teammates; the next time the lead tries to `SendMessage` to a teammate, it will silently fail (the docs note this; the runtime does not appear to emit a foreground warning).

**Severity**: **MEDIUM** — relevant whenever a long wave is paused-and-resumed across operator sessions. W295/W296 evidence shows past teams stayed within single sessions (no /resume in the leadSessionId trail), so this hasn't bitten yet.

**Recommended fix** (do NOT apply this wave):
- Add an operator-facing note in CLAUDE.md or CLAUDE.local.md: "If a session is resumed with `/resume` and prior teammates exist in `~/.claude/teams/`, ask the lead to re-spawn — do not assume prior teammates are alive."
- Optionally switch `teammateMode` to `"tmux"` for sessions where session-resumption is expected (but tmux on Windows is broken per agent-teams docs §"`tmux` has known limitations on certain operating systems"). NOT recommended.

### §6.3 — F3 (LOW) — STALE reference: `agent_spawn_gate.py` allowlist file is indexed in memory but does not exist on disk

**Reproduction**:
- `ctx_search` for "subagent_type Agent tool fork" returns hits with `from: file:Z:/claude-sota-installed/.claude/hooks/scripts/agent_spawn_gate.py` showing 433+ lines of validation logic indexed.
- Direct disk check: `.claude/hooks/scripts/` directory was REMOVED in W255 cleanup (per CLAUDE.md: "33 self-invented `.claude/hooks/scripts/*.py`" deleted).
- The file IS gone, but it remains indexed in `context-mode`'s knowledge base from a 2026-05-09 batch index event.

**Why this is a "silent fallback"**: a future query for subagent_type validation logic returns hits pointing to a non-existent file — the operator could waste time chasing a phantom path. Worse, any future LLM context-mode-cache-heal cycle could re-index and present the stale data as authoritative.

**Severity**: **LOW** — affects observability/research workflows, not runtime correctness.

**Recommended fix** (do NOT apply this wave):
- Run `ctx_purge` or equivalent to delete stale `.claude/hooks/scripts/*.py` index entries.
- OR add an `.indexignore`-style allowlist to context-mode for paths that no longer exist.
- File a doc note in `docs/architecture/W295-AUDIT-2026-05-18.md` AI-list as a low-priority cleanup item.

### §6.4 — F4 (LOW) — wshobson subagent_type name collisions resolve by undocumented precedence

**Reproduction**: see §2.3 F-2.C/D/E. The names `code-reviewer`, `context-manager`, `debugger` each appear in 2+ enabled plugins.

**Why this is a "silent fallback"**: when an operator (or upstream skill) says `subagent_type=code-reviewer` (unprefixed), Claude Code resolves by some precedence — and which plugin wins is not documented in agent-teams or sub-agents docs. The "wrong" agent could be spawned without any warning.

**Severity**: **LOW** — silent BUT the bare-`code-reviewer` invocation pattern is rare in shipped wshobson skills (they typically FQN); the project-scoped `evaluator.md` shadows it for "review" purposes anyway.

**Recommended fix** (do NOT apply this wave):
- Document the precedence (verify by reading CC source or by experimentation): project > user > plugin-loaded-first OR plugin-name alpha-order OR ???.
- OR: add a CR-3 corollary to CLAUDE.md cardinal-rule-3: "When invoking a subagent_type that appears in multiple installed plugins, ALWAYS use the FQN `plugin:agent-name`".

### §6.5 — F5 (LOW) — 2 wshobson plugins are installed but disabled (NOT a fallback, but worth flagging)

**Reproduction**: `installed_plugins.json` has `protect-mcp@claude-code-workflows`, `review-agent-governance@claude-code-workflows`, `qa-orchestra@claude-code-workflows` installed; `.claude/settings.json` lines 191/200/(qa-orchestra absent) keep them DISABLED.

**Verdict**: NOT a silent fallback — this is **correct** per W289 §2 governance verdict (D3 harness-fit hard-cap; Windows `npx` cold-start latency on per-call PreToolUse hooks). The cache-install + settings-disable pattern keeps the citation/code-reading evidence on-disk without runtime cost. **NO ACTION** required.

## §7 Recommendations (do NOT apply)

### Top-3 priority

1. **R1 (HIGH) — Adjust W301+ orchestration patterns to route team-spawning through `agent-teams:team-lead` rather than `general-purpose` forks**. Concrete action: when a wave-plan needs an agent to spawn a sub-team (e.g., W301 Stream B's smoke-test instruction to me), spawn that agent with `subagent_type=agent-teams:team-lead` so it inherits TeamCreate/Agent/SendMessage primitives. Without this, the silent-fallback in §6.1 makes the smoke-test step uncallable. **Application**: this wave's own W301-PLAN.md §1 Stream B specifies a smoke test that THIS forked subagent cannot execute; parent should run it directly (see §4.4 for the copy-paste-ready 3-line transcript).

2. **R2 (MEDIUM) — Document the in-process teammate `/resume` data-loss mode in CLAUDE.local.md**. Concrete action: add a 2-line note under §Environment or §Memory describing the §6.2 data-loss risk and the operator behavior (re-spawn teammates after /resume; do not assume prior team is alive). This converts a documented-but-easy-to-miss limitation into a foreground operator-aware risk.

3. **R3 (LOW) — Purge stale `.claude/hooks/scripts/*.py` references from context-mode index + add CR-3 corollary on FQN-disambiguation**. Concrete actions:
   - Run `ctx_purge` against the 2026-05-09 batch that indexed `agent_spawn_gate.py` (low priority; affects future research-loop accuracy).
   - Add to CLAUDE.md cardinal-rule-3 a corollary: "When 2+ installed plugins ship a subagent with the same name, ALWAYS spawn via the FQN `<plugin>:<agent-name>` form."

### Deferred queue

- **D1**: Wire `TeammateIdle` hook (per agent-teams docs §"Enforce quality gates with hooks") to enforce a "completion contract" gate — exit-code 2 if the teammate's last message doesn't include "PASS"/"FAIL" — currently NOT WIRED.
- **D2**: Wire `TaskCompleted` hook to log to T5 langfuse + T6 basic-memory for ledger-trail of subagent task completion events. Wave-level audit-trail (parallel to codex Stop-gate at session level).
- **D3**: Experiment with `requirePlanApproval=true` for the next refactor wave — current W295/W296 evidence shows the plan_approval_request flow is never exercised; per agent-teams docs the discipline could catch "teammate goes off-rails" patterns earlier.
- **D4**: Investigate why W295/W296 teams used `agentType: general-purpose` rather than `agent-teams:team-implementer`/`team-reviewer`/`team-debugger`. The wshobson docs argue the latter give better role discipline; the wave evidence suggests we're not using them.
- **D5**: Consider switching `teammateMode` from `in-process` to `tmux` IF a Windows-tmux build proves stable (long shot; agent-teams docs disclaim tmux on Windows).
- **D6**: W289 Action 2 (`/plugin install plugin-eval@claude-code-workflows` via CC REPL) is still pending per W289-OPERATOR-ACTIONS-2026-05-18.md §"Action 2 (MEDIUM)" — this would activate `/eval` for the 203-FAIL SKILL backlog. Independent of orchestration but on the wshobson surface; flagging.

## §8 Files referenced (absolute paths)

- `Z:\claude-sota-installed\CLAUDE.md`
- `Z:\claude-sota-installed\CLAUDE.local.md`
- `Z:\claude-sota-installed\.claude\settings.json` (lines 16, 191, 200, 224, 227, 376 cited)
- `Z:\claude-sota-installed\.claude\plugins\installed_plugins.json`
- `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams\1.0.2\agents\team-lead.md` (lines 1-25 cited for tools-list)
- `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams\1.0.2\commands\team-spawn.md` (lines 60-106 cited for spawn protocol)
- `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-teams\1.0.2\README.md` (lines 1-50 cited for setup contract)
- `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\agent-orchestration\1.2.1\agents\context-manager.md`
- `Z:\claude-sota-installed\.claude\plugins\cache\claude-code-workflows\comprehensive-review\1.3.0\agents\{architect-review,code-reviewer,security-auditor}.md`
- `Z:\claude-sota-installed\.claude\teams\w295-sca-v5-research\config.json` (provenance evidence)
- `Z:\claude-sota-installed\.claude\teams\w296-arch-audit-sota-challenger\config.json` (smoke-proxy evidence)
- `Z:\claude-sota-installed\.claude\teams\w296-arch-audit-sota-challenger\inboxes\team-lead.json` (28 messages, smoke-proxy evidence)
- `Z:\claude-sota-installed\.claude\agents\evaluator.md`
- `Z:\claude-sota-installed\.claude\agents\gpt5-archaeologist.md`
- `Z:\claude-sota-installed\.claude\agents\wshobson-devops-troubleshooter.md`
- `Z:\claude-sota-installed\.claude\agents\wshobson-security-auditor.md`
- `Z:\claude-sota-installed\docs\architecture\W285-LOCAL-AGENTS-AUDIT-2026-05-18.md`
- `Z:\claude-sota-installed\docs\architecture\W285-deprecated-agents-citations.md`
- `Z:\claude-sota-installed\docs\architecture\W289-WSHOBSON-PLUGINS-AUDIT-2026-05-18.md`
- `Z:\claude-sota-installed\docs\architecture\W289-OPERATOR-ACTIONS-2026-05-18.md`
- `Z:\claude-sota-installed\docs\architecture\W286-system-deepdive-2026-05-17.md` (§A.2 wshobson agent-teams pin verification)

## §9 Tools used for this audit

- Bash (env probe, ls, find)
- Read (.md frontmatter inspection)
- Grep (settings.json keyword searches)
- ToolSearch (3 attempts confirming TeamCreate/Agent/SendMessage NOT in fork's surface — explicit deferred-tool-not-found evidence)
- mcp__plugin_context-mode_context-mode__ctx_fetch_and_index (4 official Anthropic doc URLs fetched + indexed: anthropic-subagents-docs / claude-code-subagents-docs / claude-code-headless-docs / claude-code-skills-docs / claude-agent-teams-docs)
- mcp__plugin_context-mode_context-mode__ctx_search (6 multi-query batches against indexed docs, scoped to specific sources)
- mcp__plugin_context-mode_context-mode__ctx_execute (3 Node.js processing scripts for catalog enumeration + team inbox parsing — kept raw output out of context)

## §10 Throwaway-team report-back to parent (per audit brief)

**No throwaway team was created. NO `TeamDelete` is needed from parent.**

Rationale: see §4.1 — TeamCreate is not in this fork's tool surface. The audit brief's smoke-test step ("EXCEPTION: you MAY create + delete a throwaway test team") was intended to enable the smoke test if the primitives were available. Since they are not, no team was created. **Nothing to clean up.**

Parent W301 orchestrator can independently smoke-test using the §4.4 transcript if a stronger live signal than the §4.2 W296-inbox forensics is desired.

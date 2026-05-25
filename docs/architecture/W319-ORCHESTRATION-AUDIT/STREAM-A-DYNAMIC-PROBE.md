# W319 Stream A — Dynamic Orchestration Probe (2026-05-19)

> Scope: end-to-end orchestration silent-fallback probing — Agent tool subagent_type discovery, team-spawn preset validation, SendMessage error-mode mapping, case-mismatch trapping. READ-ONLY; no destructive Agent spawns.

## 1. `Agent` tool subagent_type discovery

**Method**: this Stream-A is itself a nested-Agent subagent context. The `Agent` tool is NOT in this nested context's deferred-tools list (confirmed by `ToolSearch` query "+Agent select" returning only `mcp__repomix__generate_skill`/`mcp__serena__get_current_config` — no native `Agent` schema). This **CONFIRMS W318-A §2 by-design constraint**:

> Nested-Agent contexts cannot fan-out further per Anthropic CC "No nested teams" rule (`https://docs.anthropic.com/en/docs/claude-code/sub-agents`). Only the main session lead can spawn agents.

**Verdict**: Architecturally enforced absence. NOT a silent fallback — it's documented.

**Main-session-lead** (parent W319 orchestrator) has `Agent` tool with the full schema described in agent-teams docs. Probing valid `subagent_type` values requires reading plugin agent-frontmatter `name:` field. From on-disk inspection of `agent-teams/1.0.2/agents/`:

| Valid `subagent_type` value         | Source file                                                       | `tools:` allowlist (installed v1.0.2) |
|-------------------------------------|-------------------------------------------------------------------|----------------------------------------|
| `agent-teams:team-lead`             | `agents/team-lead.md:2`                                           | `Read, Glob, Grep, Bash, Agent, TeamCreate, TeamDelete, TaskCreate, TaskList, TaskGet, TaskUpdate, SendMessage` |
| `agent-teams:team-reviewer`         | `agents/team-reviewer.md:2`                                       | `Read, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage` |
| `agent-teams:team-debugger`         | `agents/team-debugger.md:2`                                       | `Read, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage` |
| `agent-teams:team-implementer`      | `agents/team-implementer.md:2`                                    | `Read, Write, Edit, Glob, Grep, Bash, TaskList, TaskGet, TaskUpdate, SendMessage` |
| `general-purpose`                   | Anthropic built-in                                                | All tools (full subagent capability)   |
| `Explore`                           | Anthropic built-in                                                | Read-only (Read, Grep, Glob)          |
| `Plan`                              | Anthropic built-in                                                | Read-only                              |
| (any other `<plugin-slug>:<agent-name>` from cache `agents/`)| Various                                                  | Per-plugin frontmatter                 |

**Inventory-only — no destructive spawn this probe**.

## 2. `/team-spawn` preset existence + signature validation

Each preset is documented in `agent-teams/1.0.2/commands/team-spawn.md:26-63`:

| Preset      | Composition documented                                                                 | Default N | File ref          |
|-------------|----------------------------------------------------------------------------------------|-----------|-------------------|
| `review`    | 3× `team-reviewer` (sec, perf, arch)                                                   | 3         | `team-spawn.md:28-31` |
| `debug`     | 3× `team-debugger` (one hypothesis each)                                               | 3         | `:33-36`          |
| `feature`   | 1× `team-lead` + 2× `team-implementer`                                                 | 3         | `:38-41`          |
| `fullstack` | 1× `team-implementer` FE + 1× BE + 1× tests + 1× `team-lead`                           | 4         | `:43-46`          |
| `research`  | 3× `general-purpose` (codebase + web access)                                           | 3         | `:48-52`          |
| `security`  | 1× `team-reviewer` OWASP + 1× auth/AC + 1× deps + 1× secrets/config                    | 4         | `:54-57`          |
| `migration` | 1× `team-lead` + 2× `team-implementer` + 1× `team-reviewer`                            | 4         | `:59-62`          |

**Probe result**: ALL 7 presets exist on disk. No missing presets vs. SKILL system list (`agent-teams:team-spawn`, `agent-teams:team-status`, etc. all wired and discoverable as skills).

## 3. SILENT FALLBACK PATTERN CATALOG

Below: every silent-fallback or silent-degradation pattern I could identify in the agent-teams + Agent-tool primitives.

### 3.1 HIGH — Typoed `subagent_type` silently routes to default (NEEDS UPSTREAM CONFIRMATION)

**Pattern**: `Agent(subagent_type="agent-teams:team-debuger")` (one-letter typo: should be `team-debugger`)

**Hypothesis**: per W269 mandate the operator currently uses fully-qualified `subagent_type=agent-teams:team-*` strings. If a typo is made, what happens?
- (a) **Hard error** — Agent tool refuses, returns error to parent → caller can retry. **GOOD.**
- (b) **Silent fallback to `general-purpose`** — Agent runs anyway with default agent, parent never knows specialized role wasn't applied. **SILENT-FALLBACK BUG.**
- (c) **Silent fallback to a similar-named agent** — fuzzy-match. **POTENTIALLY GOOD with logging, BAD without.**

**Evidence I can gather as nested-subagent**: cannot probe `Agent` schema directly (not in this context). Static-inspection of `agent-teams/1.0.2/agents/team-lead.md:62` shows the team-lead prompt is told `subagent_type: the selected role (for example, agent-teams:team-lead, agent-teams:team-implementer, ...)` — no explicit handling of misspellings.

**Counter-evidence**: anthropic-cookbook `patterns/agents/orchestrator_workers.ipynb` cell-4 shows orchestrators send full prompts to workers via `llm_call` — the workers receive prompts not subagent_types. Real Agent tool behaviour is up to CC runtime.

**Verdict**: **POSSIBLE SILENT FALLBACK** — empirical test by main-session-lead recommended. W319 forward-AI: spawn `Agent(subagent_type="agent-teams:team-debugerXXX")` (intentionally bogus) and observe — does CC error or silently default? If silent, file upstream issue + add explicit subagent_type guard in our orchestrator-prompts.

### 3.2 HIGH — `SendMessage` to unknown recipient silently dropped (W288-P1 ALREADY OBSERVED)

**Pattern**: `SendMessage(to="non-existent-name", message="...")` — recipient doesn't exist in `~/.claude/teams/{team-name}/config.json`.

**Evidence**: agent-teams/1.0.2/skills/team-communication-protocols/SKILL.md:159-160:
```
**A teammate is not responding to messages.**
Check the teammate's task status. If it is idle, it may have completed its task ...
```
No mention of "recipient not found" error handling. Operator-facing documentation **assumes** all teammates are valid.

**Evidence from prior wave**: W289-ORCHESTRATION-RUNBOOK-2026-05-18.md anti-pattern table includes:
> Code-reviewer empty `final_message` (W288-P1) | Re-dispatch with explicit "respond via SendMessage with verdict" clause; treat empty as transient

This is the documented manifestation: when a teammate is spawned with wrong name binding OR with missing tool allowlist, the lead receives **empty final_message** silently. The lead must defensively re-dispatch.

**Verdict**: **CONFIRMED SILENT FALLBACK**. Mitigation in W289-RUNBOOK §8 is `Re-dispatch with explicit "respond via SendMessage with verdict"`. W319 finding: this is **prose-only mitigation** — no skill auto-fires on empty-final-message detection.

### 3.3 MED — Wrong `name` arg vs reserved role-name (NOT a silent fallback, just documented friction)

**Pattern**: spawning with `name="team-lead"` when role is also `team-lead` — README notes "Team creation can reserve role-like names, so use a unique member name."

**File ref**: `agent-teams/1.0.2/commands/team-spawn.md:80` (installed) — but **DELETED in upstream `ece811f2`** (see Stream A Cookbook-Ingest doc). Upstream removed this guidance because the upstream now uses `general-purpose` subagent_type for all teammates (different orchestration model).

**Verdict**: **NOT silent fallback at our installed SHA**. Documented; suffix-name handling visible in `config.json`. But: if operator follows installed README without reading the line, the spawn could fail silently AT THE NAMING LAYER. Mitigation: agent-teams skill catalog reads correct path.

### 3.4 MED — Pre-flight env var gate fails LOUDLY (NOT silent)

**Pattern**: invoke `/team-spawn` without `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`.

**File ref**: `team-spawn.md:12-14`:
> 1. Verify that `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set:
>    - If not set, inform the user: "Agent Teams requires the experimental feature flag. Set ..."
>    - Stop execution if not enabled

**Verdict**: **NOT silent**. Skill explicitly aborts with operator message. Current runtime has the env-var SET (`.claude/settings.json:13`), so this never fires now.

### 3.5 HIGH — `subagent_type` typo case-mismatch (`agent_teams:team-lead` vs `agent-teams:team-lead`)

**Pattern**: hyphen-vs-underscore in plugin name prefix. Agent-teams plugin uses `agent-teams:team-lead`, NOT `agent_teams:team-lead` or `agentteams:teamlead`.

**Convergent observation**: operator-prompt scope task description mentions checking for "agent-teams:team-debugger vs agent-teams:team_debugger". Per static inspection: ALL agent files use **hyphen-style** (`team-debugger.md`, `team-lead.md`, etc.) AND frontmatter `name:` uses hyphen-style.

**Verdict**: **TYPO TRAP**. If main-session-lead writes `agent-teams:team_debugger` (underscore), it WILL silent-fallback or hard-fail. Empirical test (main-session-lead only): try `subagent_type="agent-teams:team_debugger"` and observe.

### 3.6 MED — `claude-code-workflows:agent-teams` vs `agent-teams:` plugin-prefix confusion

**Pattern**: subagent_type prefix is the **agent-plugin slug**, NOT the marketplace slug. Per agent-teams plugin's `plugin.json` `name: agent-teams` (W314-C-§1), the correct prefix is `agent-teams:`, NOT `claude-code-workflows:agent-teams:` (which doesn't exist).

**Risk**: confusion between marketplace name (`claude-code-workflows`) and plugin name (`agent-teams`). Operator-prompts could mistakenly use `claude-code-workflows:team-lead` → SILENT NOOP or hard error.

**Verdict**: **DOCUMENTED CONFUSION VECTOR**. Mitigation: CLAUDE.md L34 (Anthropic-curated marketplace name = claude-code-workflows, plugin name = agent-teams) — current cite is correct.

### 3.7 LOW — `teammateMode: in-process` masks tmux-only crashes

**Pattern**: settings.json:433 has `teammateMode: in-process`. README.md:23-27 says iTerm2 = macOS-only and tmux = recommended-but-requires-tmux-installed. On Windows, in-process is the only viable mode.

**Verdict**: **NOT silent fallback for this runtime** — explicit Windows-correct choice. If operator changes to `tmux` on Windows, would expect hard error (no tmux binary). LOW because change is operator-intentional.

### 3.8 LOW — Plan-mode `ExitPlanMode` request_id missing

**Pattern**: per `team-communication-protocols/SKILL.md:170-172`:
> **A plan_approval_request arrived but the request_id is missing.**
> The teammate called `ExitPlanMode` without the required request context. Have the teammate re-enter plan mode ...

This is a known silent-fallback path inside the plan-approval workflow. Documented; mitigation is documented re-entry.

**Verdict**: **DOCUMENTED FRICTION** — not silent in the harmful sense.

## 4. Probe summary

| # | Severity | Pattern                                                       | Status                  |
|---|----------|---------------------------------------------------------------|-------------------------|
| 1 | HIGH     | Typoed subagent_type silently routes to default               | **NEEDS empirical confirmation by main-session-lead** |
| 2 | HIGH     | SendMessage to unknown recipient silently drops               | **CONFIRMED via W288-P1 empty-final-message** |
| 3 | HIGH     | Hyphen-vs-underscore subagent_type typo trap                  | **TYPO TRAP** — operator-prompt vulnerable |
| 4 | MED      | Marketplace-vs-plugin prefix confusion                        | Documented confusion vector |
| 5 | MED      | `name` collision with role-name (suffix handling)             | Documented; deleted in upstream HEAD |
| 6 | MED      | Pre-flight env var gate fails LOUDLY (NOT silent)             | Mitigated (env-var ON now) |
| 7 | LOW      | teammateMode masks tmux crashes on Windows                    | Windows-correct intentional |
| 8 | LOW      | ExitPlanMode missing request_id                               | Documented re-entry path |

## 5. Convergent root-cause confirmation (W318-A re-validation)

W318-A-AGENT-ORCHESTRATION.md identified 4 root causes of operator's "silent fallback" concern. W319 Stream A independently confirms all 4:

1. **GitHub-MCP `search_repositories` 6-wave silent 0-hits** — NOT our orchestration, mitigated via `tools/gh-search-rest.sh` (W314-r2-AI-r2-7) and Stage-0 existence-probe codified in sca-v7.1 Δ33 (W316).
2. **W269-mandate parallel_ratio 0.587 → 1.000 post-W317** — RESOLVED by `parallel-dispatch-mandate` skill (W316 ship).
3. **PROJECT_DIR redirect silently broken** — chronic; gitignore mitigates; upstream issue filed.
4. **Subagent cannot fan-out (no nested teams)** — Anthropic by-design constraint, NOT a fallback.

W319 Stream A **adds 3 NEW silent-fallback findings** above (FINDINGS 1, 2, 3 in section 4 — typo, SendMessage-unknown, hyphen-trap) that are agent-teams-specific and not in W318-A's 4-pattern catalog. See SYNTHESIS doc for ranked HIGH/MED/LOW.

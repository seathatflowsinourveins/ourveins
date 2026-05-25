---
name: agent-team-sota
description: SOTA experimental-agent-team orchestration toolkit. Use when operator says "experimental agent team", "team-spawn", "orchestrate agent team", "sota agent orchestration", "TeamCreate API", "team-lead workers", "mailbox SendMessage", or asks how to coordinate multi-agent presets (research/security/review/debug/feature/fullstack/migration). Distinct from `parallel-dispatch-mandate` (which fires the W269 2+-Agent-in-1-message rule), `dispatching-parallel-agents-w321-fork` (which adds skeleton-first-write + context-budget caps to ad-hoc fan-out), and `mcp-agent-patterns` (which catalogs Router/ParallelLLM/Orchestrator topologies from lastmile-ai mcp-agent) — THIS skill is the agent-teams-plugin-aware orchestration entry-point that selects between (a) `/team-spawn <preset>` + `TeamCreate` + mailbox-coordinated workers and (b) simple Agent fan-out, and binds the W342-Z 5-layer parallel-session safety contract to the choice. Anchors: agent-teams plugin v1.0.2 (Seth Hobson MIT) `cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md` + Anthropic claude-cookbooks @ 39a350b6 `patterns/agents/prompts/research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block + superpowers v5.1.0 (obra MIT) `skills/subagent-driven-development/SKILL.md` two-stage-review contract.
---

# agent-team-sota — Experimental Agent-Team Orchestration

## When this skill fires (≤8 distinct triggers)

1. "experimental agent team"
2. "team-spawn"
3. "orchestrate agent team" / "sota agent orchestration"
4. "TeamCreate API" / "mailbox SendMessage" / "team-lead workers"
5. preset names: "research/security/review/debug/feature/fullstack/migration" used in coordination context

Siblings deliberately NOT overlapped:
- `parallel-dispatch-mandate` — W269 2+-Agent enforcement (HOW MANY calls in one message)
- `dispatching-parallel-agents-w321-fork` — fork that ADDS skeleton-write + context-budget caps to ad-hoc fan-out
- `mcp-agent-patterns` — lastmile-ai mcp-agent topology catalog (Router / ParallelLLM / Orchestrator / Evaluator-Optimizer / MCPAggregator) for MCP-server-aggregation use cases
- `wait-agent` — non-blocking join on first-completion / N-of-M after dispatch (consume-side, not dispatch-side)

This skill is the **dispatch-side decision skill**: when you have a coordination problem, it tells you whether to use the agent-teams plugin (with TeamCreate + mailbox + presets) OR a bare-Agent fan-out, plus which preset and which subagent_types.

## Decision diagram: agent-teams plugin vs Agent fan-out

```
                                Is this a multi-agent
                                coordination problem?
                                         │
                                         ▼
                          ┌──────────────────────────────┐
                          │ Tasks fully independent      │
                          │ AND  no cross-talk needed    │
                          │ AND  ≤ 5 agents              │
                          └────────────┬─────────────────┘
                            yes        │       no
                  ┌────────────────────┘     ┌─────────────┐
                  ▼                          ▼             │
       ┌──────────────────┐         ┌────────────────────┐ │
       │ Agent fan-out    │         │ /team-spawn        │ │
       │ (2+ Agent calls  │         │ + TeamCreate       │ │
       │  in 1 message)   │         │ + mailbox          │ │
       └──────────────────┘         └────────────────────┘ │
       Use sibling skills:                                  │
       parallel-dispatch-mandate +                          │
       dispatching-parallel-agents-w321-fork                │
                                                            │
       Examples:                     Examples:              │
       - 3 different test files      - feature dev needing  │
       - 3 isolated audits             frontend+backend     │
       - 3 stream lookups              + tests              │
                                     - migration with       │
                                       coordinated streams  │
                                     - debug with           │
                                       competing hypotheses │
                                     - security audit with  │
                                       cross-finding dedup  │
```

**TL;DR**: agent-teams plugin = when teammates need to **talk to each other** (SendMessage mailbox) or when you need a **team-lead orchestrator** to synthesize results. Bare Agent fan-out = when teammates are pure parallel independent work.

## Pre-flight gate

```powershell
# Skill BLOCKS until this passes
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS  # MUST be "1"
```

If not set, abort and instruct operator: `Set CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 in .claude/settings.json:env`.

Verify in this runtime via `.claude/settings.json:env.CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` — confirmed present in claude-sota-installed.

## Preset selection guide

The agent-teams plugin v1.0.2 ships 7 presets cite-anchored to `cache/claude-code-workflows/agent-teams/1.0.2/commands/team-spawn.md`:

| Preset | Default size | Composition | Use when |
|---|---|---|---|
| `review` | 3 | 3× `agent-teams:team-reviewer` on (security · performance · architecture) | reviewing a PR/change-set along multiple quality dimensions in parallel |
| `debug` | 3 | 3× `agent-teams:team-debugger`, one hypothesis each | bug has 3+ plausible root causes; want competing-hypotheses (ACH) investigation |
| `feature` | 3 | 1× `agent-teams:team-lead` + 2× `agent-teams:team-implementer` | feature spanning 2+ files where ownership boundaries matter |
| `fullstack` | 4 | 1× lead + 1× frontend-impl + 1× backend-impl + 1× tests-impl | full-stack feature with frontend/backend/test split |
| `research` | 3 | 3× `general-purpose` agents, parallel research questions | codebase+web+docs research, no SendMessage needed |
| `security` | 4 | 4× `agent-teams:team-reviewer` on (OWASP · auth · deps · secrets) | comprehensive security audit |
| `migration` | 4 | 1× lead + 2× implementer + 1× reviewer | large refactor / framework migration with verification stream |

**Preset choice rule of thumb**: if you can write 3 sentences each describing what 3 independent investigators should look at, you have a `research` or `review` or `debug` team. If your work has file-ownership-boundary semantics (one teammate owns module A, another owns module B), you have a `feature`/`fullstack`/`migration` team.

## Invocation patterns

### Pattern A — preset + delegate

```
/team-spawn research --members 3 --delegate
```

This:
1. Verifies `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
2. Calls `TeamCreate` with `team_name=research-team`
3. Spawns 3× `general-purpose` Agent teammates with unique names
4. Calls `TaskCreate` for each teammate's placeholder task
5. Enters delegation mode (operator assigns tasks interactively)

### Pattern B — preset + initial brief

```
/team-spawn security
```

Then the orchestrator:
1. Creates `security-team` with 4 reviewers
2. Assigns initial tasks via `TaskUpdate` referencing the brief
3. Reviewers run in parallel, communicate findings via `SendMessage` to the orchestrator (or each other for cross-finding dedup)
4. Orchestrator collects results, dedups, ranks by severity, presents consolidated report

### Pattern C — custom composition

```
/team-spawn custom --name w436-research --members 5
```

Then `AskUserQuestion` to pick each role from {team-lead, team-reviewer, team-debugger, team-implementer, general-purpose}.

## Mailbox communication contract

Quoted from `cache/claude-code-workflows/agent-teams/1.0.2/agents/team-lead.md:67-73`:

> 1. Use `SendMessage` with `message` for direct teammate communication (default)
> 2. Use `broadcast` only for critical team-wide announcements
> 3. Never send structured JSON status messages — use TaskUpdate instead
> 4. Read team config from `~/.claude/teams/{team-name}/config.json` for teammate discovery
> 5. Refer to teammates by their actual spawned NAME, never by UUID or role alias
> 6. If a spawned name is suffixed to avoid a collision, use the suffixed name from config/Agent output for all messages and tasks

**Anti-pattern**: spawning a teammate named `team-lead` (the role-name is reserved). Always use unique member names like `frontend-lead`, `backend-impl`, `security-reviewer`.

## FQN subagent_type discipline (CR-3, W333 Stream D Finding #5)

The agent-teams plugin uses FULLY-QUALIFIED subagent_types:
- `agent-teams:team-lead`
- `agent-teams:team-implementer`
- `agent-teams:team-reviewer`
- `agent-teams:team-debugger`
- `general-purpose` (the only sanctioned bare name)

Bare `team-reviewer` collides with 6 plugins (code-reviewer is the classic collider). Always use the `agent-teams:*` prefix in the `subagent_type` field. The pre-Agent validator at `tools/preagent-subagent-validator.mjs` blocks unknown subagent_type with `exit 2` + fuzzy top-5 suggestions.

## Anti-patterns (will cause failure)

1. **Serial Agent dispatch in multi-stream contexts** — W312-D silent-fallback measured at 29% across 1586-JSONL audit. If you have 2+ independent workstreams, dispatch them in ONE assistant message with 2+ Agent calls. Solo serial is reserved for trivial/explicitly-solo/single-target tasks only.
2. **Spawning a teammate named `team-lead`** — reserved role name, will be auto-suffixed and create lookup confusion. Use unique descriptive names.
3. **Bypassing presets for novel topologies without recording rationale** — if you go custom, record the composition choice (which roles + why) in your wave's VERDICT-LEDGER.md.
4. **Forgetting CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1** — `/team-spawn` aborts in pre-flight; verify in `.claude/settings.json:env` before invoking.
5. **Mixing structured JSON status into SendMessage** — use TaskUpdate for status (per team-lead.md §Communication Protocols rule 3). SendMessage is for free-text coordination.
6. **Mailbox-coordinated teams without a team-lead** — `review`/`debug`/`security` presets ARE valid lead-less because the parent orchestrator IS the lead; but `feature`/`fullstack`/`migration` REQUIRE an explicit `team-lead` teammate.
7. **Forgetting to /team-shutdown after collection** — leaks state to `~/.claude/teams/{team-name}/config.json` + leaves teammate sessions in the registry. Always close.

## Failure mode lookup table

| Symptom | Root cause | Fix |
|---|---|---|
| `/team-spawn` aborts saying flag missing | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` not set | Set in `.claude/settings.json:env`, restart CC |
| Teammate name auto-suffixed to `*-2` | collision with reserved role-name OR sibling teammate | Use suffixed name from `Agent` tool output, never the original |
| SendMessage returns "unknown teammate" | referring by UUID/alias instead of actual spawned NAME | Read `~/.claude/teams/{team-name}/config.json` for canonical names |
| TaskList shows tasks but no progress | teammate completed but did not call TaskUpdate | Direct-message the teammate with `Please run TaskUpdate to mark complete` |
| Two teammates editing same file | file-ownership not declared in TaskCreate description | Re-issue TaskUpdate with explicit owned-files list per `cache/.../team-lead.md:59-65` |
| bare `subagent_type` (e.g. an unqualified reviewer name) rejected | bare name collides across 6 plugins | Use FQN `agent-teams:team-reviewer` or `pr-review-toolkit:` plus reviewer name |

## Composition with sibling skills

Order of operations for a typical multi-agent session:

1. **`parallel-dispatch-mandate`** fires first (operator request mentions 2+ workstreams) — enforces "MUST dispatch 2+ Agent calls in 1 message"
2. **This skill (`agent-team-sota`)** fires next — selects between `/team-spawn <preset>` (mailbox-coordinated) and bare Agent fan-out (pure parallel)
3. **`dispatching-parallel-agents-w321-fork`** fires if going bare-fan-out — adds skeleton-write + context-budget caps + position-swap audit
4. **`subagent-driven-development`** (superpowers) fires when implementing a plan with two-stage review (spec then quality)
5. **`wait-agent`** fires AFTER dispatch when orchestrator has independent work to do during agent runtime — non-blocking first-completion / N-of-M join
6. **`empty-final-message-guard` + `worker-failure-termination-guard`** fire when collecting agent outputs — fail-CLOSED on empty / failed teammate completions
7. **`/team-shutdown`** closes the wave

## Cross-model consensus (W331 P0.7 frontier-peer policy)

For HIGH-STAKES decisions (security/correctness/architecture), apply cross-model gate:
- **Authority**: codex GPT-5.5 (round 1) — via `/codex:review` or `/codex:adversarial-review`
- **Tie-breaker**: Sonnet 4.6 — when codex r1 + r2 diverge
- **Cheap triage**: local Ollama `qwen3-coder:30b-a3b-q4_K_M` (NOT adversarial-review authority)

This is NOT a default — only invoked when CR-6 verify-before-claim demands cross-model verification. See sibling `dual-review` skill for the routing primitive.

## Cite-anchors (3-org-distinct floor enforced — actual count: 7)

1. **Anthropic** — `claude-cookbooks @ 39a350b6790c132337dcc3ec35240728fcc1dc0e patterns/agents/prompts/research_lead_agent.md:135-137` `<use_parallel_tool_calls>` MUST-block (parallel mandate origin)
2. **Anthropic** — `https://docs.anthropic.com/en/docs/claude-code/sub-agents` model-precedence + subagent contract
3. **GitHub / Seth Hobson** — `agent-teams@1.0.2` plugin MIT, cite-anchored at `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/.claude-plugin/plugin.json` + `commands/team-spawn.md`
4. **GitHub / obra** — `superpowers@5.1.0` MIT, `skills/dispatching-parallel-agents/SKILL.md` + `skills/subagent-driven-development/SKILL.md`
5. **Pydantic** — `ai@pydantic-skills` v0.1.0 `cache/pydantic-skills/ai/0.1.0/skills/building-pydantic-ai-agents/SKILL.md` (typed agent contracts)
6. **Upstash** — `context7` MCP (up-to-date docs surface), enabled in `.claude/settings.json:enabledPlugins`
7. **lastmile-ai** — `mcp-agent` 8.2k-stars MIT pattern library (cross-reference via sibling `mcp-agent-patterns` skill, NOT redundantly catalogued here)

## Wave reference

W436-AGENT-TEAM-SOTA pattern catalog at `docs/architecture/W436-AGENT-TEAM-SOTA/ORCHESTRATION-PATTERNS.md` + integration map at `docs/architecture/W436-AGENT-TEAM-SOTA/INTEGRATION-MAP.md` + PowerShell helpers at `tools/agent-team-helpers.ps1`.

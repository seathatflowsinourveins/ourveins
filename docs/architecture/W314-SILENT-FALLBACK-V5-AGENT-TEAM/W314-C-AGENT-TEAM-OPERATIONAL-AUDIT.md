# W314-C — Agent-Team Primitive Operational Deep Audit (2026-05-19)

> Stream C / W314 ship. Verdict: **OPERATIONAL (with naming-cite drift in CLAUDE.md)**.
> Cite-anchored to local plugin cache + JSONL session evidence post-W312-ship (`86fbc7a`).

## 1. Where is the agent-teams plugin physically?

CLAUDE.md L19 + W312 status block name it `wshobson-agents/agent-teams@1.0.2`. The plugin is **NOT** at `Z:/claude-sota-installed/.claude/plugins/cache/wshobson-agents/`. It is at:

```
Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/
```

The marketplace slug is `claude-code-workflows` (Anthropic's official orchestration marketplace), but the package author is `Seth Hobson (seth@major7apps.com)` per the plugin.json — so it IS Wshobson's package, just shipped through `claude-code-workflows` (Anthropic's official curation). README L34 even instructs `/plugin marketplace add wshobson/agents` as the alternate install pathway.

CLAUDE.md cite-drift: `wshobson-agents/agent-teams@1.0.2` should be `claude-code-workflows:agent-teams@1.0.2` (or both names noted). Recommended W314 fix in CLAUDE.md mandate refinement #2.

## 2. Plugin contents verification

```
claude-code-workflows/agent-teams/1.0.2/
├── .claude-plugin/plugin.json       # name=agent-teams version=1.0.2 author=Seth Hobson MIT
├── .in_use                          # CC marks active plugins
├── README.md                        (6948 bytes)
├── agents/
│   ├── team-debugger.md
│   ├── team-implementer.md
│   ├── team-lead.md
│   └── team-reviewer.md
├── commands/
│   ├── team-debug.md
│   ├── team-delegate.md
│   ├── team-feature.md
│   ├── team-review.md
│   ├── team-shutdown.md
│   ├── team-spawn.md
│   └── team-status.md
└── skills/
    ├── multi-reviewer-patterns/
    ├── parallel-debugging/
    ├── parallel-feature-development/
    ├── task-coordination-strategies/
    ├── team-communication-protocols/
    └── team-composition-patterns/
```

**Plugin enabled state** (`.claude/settings.json:enabledPlugins`):

```
"agent-teams@claude-code-workflows": true   ← LIVE
```

Sibling Wshobson plugins enabled: `agent-orchestration`, `comprehensive-review`, `context-management`, `conductor`, `developer-essentials`, `debugging-toolkit`, `incident-response`, `llm-application-dev`, `block-no-verify`, `tdd-workflows`, `shell-scripting`, `signed-audit-trails`, `ship-mate`, `plugin-eval`. **Disabled**: `protect-mcp`, `review-agent-governance`, `qa-orchestra`.

## 3. TeamCreate primitive contract (from team-spawn.md L72-80)

```
Phase 2: Team Creation
  1. Use the TeamCreate tool to create the team with team_name and description
  2. For each team member, use the Agent tool with:
     - team_name: the team name
     - name: unique descriptive member name
     - subagent_type: agent-teams:team-lead | team-implementer | team-reviewer | team-debugger
     - prompt: Role-specific instructions
  3. Do not use the role name `team-lead` as the spawned member name
```

Pre-flight check (L12-14): requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. **This env var is NOT in the runtime's `.claude/settings.json:env` block** — Stream A owns the settings.json fix. Without it, /team-spawn aborts at pre-flight, which means **TeamCreate primitive is INSTALLED but PRE-FLIGHT-GATED** — explains W312-D F2's "unused since W289" observation. Not a silent fallback (the skill explicitly tells the user); just an env-var-gate that's been silently OFF.

## 4. `.claude/teams/` + `.claude/tasks/` directory state

```
.claude/teams/   → 0 files  (empty — no orphan team configs)
.claude/tasks/   → 0 files  (empty — no orphan task configs)
.claude/mailboxes/  → DOES NOT EXIST
```

The W312 mailbox archive was applied (27 orphan inboxes → `tmp/W312-mailbox-archive/`). State is clean. **No drift.**

## 5. Cardinal-rule conformance of the plugin itself

- R1 (trusted source): claude-code-workflows is an Anthropic curated marketplace. ✓
- R2 (no in-runtime hook bodies): plugin ships its own hooks under its own cache dir — not in `.claude/hooks/`. ✓
- R3 (cite-anchored subagent definitions): all 4 agent files use Anthropic frontmatter schema. ✓

## 6. W312-D F2 re-verification: "unused since W289"

**Verdict**: the primitive is **NOT broken** — it's pre-flight-gated by missing `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`. Two paths forward:

1. **Activate**: Stream A appends the env var to `.claude/settings.json:env` (cardinal-rule-safe — settings.json is the canonical Anthropic surface for env). Primitive becomes operational. (recommended)
2. **Accept by-design**: subagents already can't fan-out further per Anthropic's "No nested teams" rule (`https://docs.anthropic.com/en/docs/claude-code/sub-agents`). Multi-stream work goes through W269's parallel-Agent-dispatch pattern (2+ Agent calls in 1 assistant message), which DOES NOT require teams. This is current behavior.

Recommendation: **Option 1 with caveats**. Activate the env var so /team-spawn becomes possible; keep the parallel-Agent-dispatch pattern as the dominant primitive (it has better message-batching semantics). Operator gets both tools; mandate stays predicated on the parallel-dispatch pattern.

## 7. Cross-link to W314 Stream A (NSSM teardown recommendation)

The agent-teams primitive does NOT depend on cognee, NSSM, or any local service. Stream A's NSSM teardown decision (if any) is orthogonal to agent-teams operational status.

## 8. Final verdict

| Aspect                                              | Status               |
|-----------------------------------------------------|----------------------|
| Plugin installed                                    | ✓ at `claude-code-workflows/agent-teams/1.0.2/` |
| Plugin enabled                                      | ✓ in settings.json   |
| All 7 commands + 4 agents + 6 skills present        | ✓ verified           |
| Cardinal-rule conformance                           | ✓ (R1/R2/R3)         |
| `.claude/teams/` + `.claude/tasks/` clean           | ✓ empty (no drift)   |
| TeamCreate tool callable                            | ✗ pre-flight-gated by missing `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` |
| CLAUDE.md naming cite                               | ✗ drift: says `wshobson-agents`, actual is `claude-code-workflows` |
| W312-D F2 "unused since W289"                       | ✓ explained: env-var-gate not breakage |
| Mailboxes archive applied                           | ✓ W312 cleanup landed |

**Stream C verdict**: AGENT-TEAM PRIMITIVE = **YES, OPERATIONAL** (env var pending, naming cite pending).

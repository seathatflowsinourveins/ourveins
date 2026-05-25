# MEMORY_MCP_AGENT_ORCHESTRATION

## Default memory

Use durable project state first:

```text
Git commits
GitHub issues and PRs
ADRs
AGENTS.md
CLAUDE.md
.claude/skills
Task Master / CCPM state
repo-map docs
test logs stored as artifacts
```

## Audit-required memory candidates

```text
thedotmack/claude-mem
mkreyman/mcp-memory-keeper
doobidoo/mcp-memory-service
supermemoryai/claude-supermemory
supermemoryai/supermemory-mcp
itsjwill/claude-memory
GMaN1911/claude-cognitive
lucasrosati/claude-code-memory-setup
chopratejas/headroom
chenxiaofie/memory-mcp
DeusData/codebase-memory-mcp
```

## Memory adoption gate

Adopt only if:

```text
repeated context reconstruction is measurable
retention policy is explicit
delete/export are available
secret filtering works
prompt injection risk is tested
index location is known
background processes are cleaned up
uninstall path is clear
```

## Agent orchestration policy

Use native Claude Code first:

```text
worktrees
/batch
subagents
hooks
Skills
GitHub PRs
```

Then benchmark operator tools:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
```

Keep only those that improve worktree isolation, branch ownership, diff review, cleanup, kill controls, and session visibility.

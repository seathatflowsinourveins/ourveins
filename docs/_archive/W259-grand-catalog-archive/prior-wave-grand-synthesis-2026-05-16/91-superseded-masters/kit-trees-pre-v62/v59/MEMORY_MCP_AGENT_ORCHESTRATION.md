# MEMORY_MCP_AGENT_ORCHESTRATION.md

## Default memory hierarchy
Prefer durable project memory before memory plugins:
```text
Git commits
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
.claude/skills
Task Master / CCPM state
repo-map docs
```

## Memory repos — audit required
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
```

## MCP policy
- Do not globally enable MCP servers.
- Use MCP only when structured state/tooling beats CLI.
- Audit tools, prompts, env vars, network/filesystem access, and output size.
- Disable unused MCP servers.

## Agent orchestration
Use native Claude Code first:
```text
claude --worktree
/batch
subagents
```
Then selectively benchmark operator dashboards.

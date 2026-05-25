# MEMORY_MCP_AGENT_ORCHESTRATION.md

## Durable memory first

Use these before memory plugins:

```text
Git commits
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
.claude/skills
Task Master / CCPM state
repo-map docs
architecture docs
test fixtures
```

## Memory tools are audit-required

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

Audit:

```text
retention
indexing
secrets handling
deletion
telemetry
embedding provider
prompt injection exposure
process cleanup
uninstall path
```

## MCP categories

```text
semantic code: Serena, Claude Context
browser/docs: Playwright MCP, Context7
large-output sandbox: Context Mode
memory: memory MCPs, Headroom
security: MCP Defender, mcp-scan, Cisco MCP Scanner, Snyk agent-scan
```

## Agent orchestration

Native first:

```text
/batch
claude --worktree
subagents
hooks
skills
```

Then evaluate:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
LangGraph / Microsoft Agent Framework / Google ADK / OpenAI Agents SDK / Pydantic AI / CrewAI / Agno / smolagents
```

---
name: memory-mcp-audit
description: Audit memory and MCP tools before adoption
disable-model-invocation: true
---


# Memory, MCP, and agent orchestration policy

## Default memory

Use durable project memory before memory plugins:

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

## Memory plugins

Memory plugins are audit-required and benchmark-required. They are not defaults.

Candidates:

```text
thedotmack/claude-mem
mkreyman/mcp-memory-keeper
doobidoo/mcp-memory-service
supermemoryai/claude-supermemory
supermemoryai/supermemory-mcp
itsjwill/claude-memory
GMaN1911/claude-cognitive
lucasrosati/claude-code-memory-setup
runtimenoteslabs/memory-layer
yoloshii/ClawMem
mem0ai/mem0
getzep/graphiti
getzep/zep
letta-ai/letta
chenxiaofie/memory-mcp
DeusData/codebase-memory-mcp
chopratejas/headroom
```

Risks:

```text
retention
deletion failure
privacy
secret capture
prompt injection
index poisoning
embedding leakage
unbounded process growth
cloud dependency
unclear telemetry
```

## MCP categories

```text
Semantic/code MCP:
  Serena
  Claude Context
  code-review-graph

Documentation/browser MCP:
  Context7
  Playwright MCP

Memory MCP:
  memory service
  memory keeper
  supermemory
  mem0 / zep / graphiti

Security MCP:
  mcp-scan
  MCP Defender
  Cisco MCP Scanner
  Snyk agent-scan

Large-output/context MCP:
  Context Mode
  Headroom
```

## MCP install gate

Never install an MCP globally without:

```text
source audit
tool description audit
env var audit
filesystem/network access review
secrets handling review
prompt injection test
uninstall test
benchmark vs CLI alternative
```

## Agent orchestration

Use native Claude Code first:

```text
subagents = context isolation
worktrees = file isolation
/batch = native parallel decomposition
```

External operators are selective:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
ccswarm
AgentHub
```

Keep only if they improve worktree isolation, branch ownership, diff review, cleanup, kill controls, and session visibility.


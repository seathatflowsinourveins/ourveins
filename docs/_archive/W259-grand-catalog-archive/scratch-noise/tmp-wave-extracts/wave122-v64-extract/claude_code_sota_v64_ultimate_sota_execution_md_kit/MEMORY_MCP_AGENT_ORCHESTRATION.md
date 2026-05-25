# MEMORY_MCP_AGENT_ORCHESTRATION.md

## Default memory

Use durable project memory first:

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

## Memory adoption gate

Adopt only if it beats durable memory on:

```text
context reconstruction time
token cost
retrieval relevance
privacy/retention controls
deletion controls
secret exclusion
process cleanup
prompt-injection resistance
```

## MCP categories

```text
semantic:
  Serena
  Claude Context

docs:
  Context7

browser:
  Playwright MCP

memory:
  claude-mem / memory keepers / supermemory

security:
  mcp-scan
  MCP Defender
  Snyk agent-scan
  Cisco MCP Scanner
  Skill Scanner

large-output:
  Context Mode
```

## MCP security rule

Never connect a new MCP server globally before:

```text
source audit
tool list review
network/file access review
secret handling review
prompt injection review
process cleanup review
license review
uninstall test
```

## Orchestration policy

Start native:

```text
claude --worktree
/batch
subagents
Claude reviewer
Codex reviewer
CI gate
```

Add dashboards only if they provide:

```text
worktree isolation
branch ownership
diff review
session visibility
kill/cleanup controls
cost visibility
clear data boundary
```

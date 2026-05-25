# Memory / MCP / Agent Orchestration Policy — V62

## Durable memory first

Before memory plugins, use:

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

## Memory tools are audit-required

Memory candidates:

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
```

Adopt only after benchmark proves repeated context-reconstruction savings and source audit clears retention, deletion, privacy, embedding/indexing, prompt-injection, secret capture, process cleanup, and telemetry.

## MCP taxonomy

```text
Semantic: Serena, Claude Context
Docs/browser: Context7, Playwright MCP
Memory: memory MCPs, Supermemory, Zep, Mem0, Letta
Security: mcp-scan, MCP-Defender, Cisco MCP Scanner, agent-scan
Large-output: Context Mode
GitHub/cloud: prefer CLI first unless MCP value is clear
```

## Agent orchestration policy

Use native worktrees and `/batch` first. Add operator dashboards only if they provide branch/worktree isolation, diff review, session visibility, cleanup, and kill controls.

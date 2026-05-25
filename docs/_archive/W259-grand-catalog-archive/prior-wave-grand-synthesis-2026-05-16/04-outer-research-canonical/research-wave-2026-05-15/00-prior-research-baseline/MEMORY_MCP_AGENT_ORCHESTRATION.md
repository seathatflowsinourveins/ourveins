# Memory / MCP / Agent Orchestration Policy

## Durable memory first

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

## Memory repos are audit-required

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

## MCP categories

```text
Semantic code: Serena, Claude Context
Browser/docs: Playwright MCP, Context7, Firecrawl/Crawl4AI MCPs
Memory: memory MCPs above
Security: mcp-scan, MCP Defender, Cisco MCP Scanner, Snyk agent-scan
Large-output control: Context Mode
```

## Rule

Do not globally enable MCPs. Enable per-project, per-task, and only after source audit.

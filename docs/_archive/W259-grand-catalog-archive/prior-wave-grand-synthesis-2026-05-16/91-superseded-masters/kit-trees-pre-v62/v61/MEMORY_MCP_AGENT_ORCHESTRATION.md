# Memory, MCP, and Agent Orchestration Policy V61

## Memory default
Use durable project artifacts first:
- Git commits
- GitHub issues and PRs
- ADRs
- AGENTS.md
- CLAUDE.md
- .claude/skills
- Task Master / CCPM state
- repo-map docs

## Memory candidates — audit-required
- thedotmack/claude-mem
- mkreyman/mcp-memory-keeper
- doobidoo/mcp-memory-service
- supermemoryai/claude-supermemory
- supermemoryai/supermemory-mcp
- itsjwill/claude-memory
- GMaN1911/claude-cognitive
- lucasrosati/claude-code-memory-setup
- runtimenoteslabs/memory-layer
- yoloshii/ClawMem
- mem0ai/mem0
- getzep/graphiti
- getzep/zep
- letta-ai/letta

## MCP categories
- Semantic retrieval: Serena, Claude Context.
- Browser/e2e: Playwright MCP.
- Documentation/API lookup: Context7.
- GitHub: GitHub MCP server.
- Memory: mcp-memory-service, memory-layer, supermemory MCP.
- Security: mcp-scan, MCP Defender, Cisco MCP Scanner, Snyk agent-scan.
- Large output: Context Mode.

## MCP installation rule
No global MCP install without:
- source audit
- command audit
- network/filesystem permission audit
- prompt/tool-description audit
- retention/deletion audit
- uninstall path
- benchmark evidence

## Agent orchestration rule
Use native worktrees and `/batch` first. Add operator dashboards only if they improve branch ownership, diff review, cleanup, kill controls, cost/session visibility, and local/remote data clarity.

# Installation Order and Decision Matrix

## Install first

```text
Claude Code
Codex CLI
openai/codex-plugin-cc
ccusage
RTK
Serena
Repomix
pre-commit + language gates
```

## Add when needed

```text
Context Mode     → huge logs/API/browser outputs
Headroom         → cross-agent context/memory/proxy
Task Master/CCPM → long task graph / GitHub-native task state
BMAD             → product lifecycle workflow
Claude Squad/Tutti/agtx/CCUI → many parallel agents
wshobson/agents  → selective plugin/agent/skill installation
```

## Do not bulk install

```text
large skill marketplaces
mega plugin suites
memory plugins
MCP server bundles
operator dashboards
bridge plugins
```

Audit first, install only what maps to an immediate workflow.

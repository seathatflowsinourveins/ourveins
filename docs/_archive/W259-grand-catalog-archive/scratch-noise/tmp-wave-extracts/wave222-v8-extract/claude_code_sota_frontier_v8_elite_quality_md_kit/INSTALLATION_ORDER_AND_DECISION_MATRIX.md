# Installation Order and Decision Matrix

## Phase 1 — baseline
```text
Claude Code
Codex CLI
codex-plugin-cc
ccusage
short CLAUDE.md
AGENTS.md
```

## Phase 2 — token/context
```text
RTK
Serena
Repomix
CLI tools: rg, fd, jq, yq, gh
```

## Phase 3 — quality gates
```text
pre-commit
just/mise/uv
ruff/biome/oxc as needed
semgrep/gitleaks/trivy/actionlint/shellcheck
```

## Phase 4 — workflow
Choose one or two, not all:
```text
BMAD for lifecycle
Task Master or CCPM for task graph
context-engineering-intro / PRPs for PRP workflows
wshobson/agents for focused plugins
```

## Phase 5 — parallel operator
Choose when you supervise 3+ agents:
```text
native /batch and claude --worktree first
Claude Squad / Agent Orchestrator / Tutti / CCUI / AgentHub / Vibe Kanban selectively
```

## Phase 6 — advanced context
Use only if proven by measurement:
```text
Context Mode
Headroom
Wet
Token Optimizer
```

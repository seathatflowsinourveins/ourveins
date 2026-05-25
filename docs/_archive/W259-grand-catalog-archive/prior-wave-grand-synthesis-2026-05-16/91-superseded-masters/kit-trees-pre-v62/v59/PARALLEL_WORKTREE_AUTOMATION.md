# PARALLEL_WORKTREE_AUTOMATION.md

## Primitive
Worktrees isolate files. Subagents isolate context. PRs isolate merge risk.

## Commands
```bash
git fetch --all --prune
git remote set-head origin -a || true
claude --worktree cc-task-name
```

Manual path:
```bash
git worktree add ../repo-task -b cc/task-name origin/main
cd ../repo-task
claude
```

## Operator tools
Selective candidates:
```text
claude-squad
ComposioHQ/agent-orchestrator
CCUI
AgentHub
Vibe Kanban
Workmux
itervox
ccswarm
agtx
```

Keep only if worktree isolation, diff review, cleanup, kill controls, and local/remote data policy are clear.

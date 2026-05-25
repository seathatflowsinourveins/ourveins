# Parallel Worktree Automation

Worktrees isolate files; subagents isolate context.

```bash
git fetch --all --prune
git remote set-head origin -a || true
git worktree add ../repo-task-123 -b cc/task-123 origin/main
cd ../repo-task-123
claude
```

Native Claude Code:

```text
claude --worktree task-123
/batch <large independent change>
/autofix-pr only fix CI, lint, type errors, and review comments
```

Operator tools to evaluate:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
AgentHub
Vibe Kanban
Workmux
itervox
Agor
ccswarm
```

Keep only if tool has: worktree isolation, branch ownership, diff review, cleanup, kill controls, local/remote data clarity.

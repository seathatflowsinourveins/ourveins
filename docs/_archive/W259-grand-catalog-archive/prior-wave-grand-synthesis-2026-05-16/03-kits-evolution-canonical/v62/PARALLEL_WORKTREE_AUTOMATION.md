# Parallel Worktree Automation — V62

## Native first

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree feature-a
claude --worktree bugfix-b
```

Add to `.gitignore`:

```text
.claude/worktrees/
```

## Operator candidates

```text
Claude Squad
Composio Agent Orchestrator
CCUI
AgentHub
Vibe Kanban
Workmux
itervox
cc-manager
agtx
```

Keep only if the tool supports worktree isolation, branch ownership, diff review, cleanup, kill controls, session visibility, and clear local/remote data boundaries.

## Merge discipline

```bash
git status --short
git diff --stat
git diff --check
just test
just lint
gh pr create --fill
```

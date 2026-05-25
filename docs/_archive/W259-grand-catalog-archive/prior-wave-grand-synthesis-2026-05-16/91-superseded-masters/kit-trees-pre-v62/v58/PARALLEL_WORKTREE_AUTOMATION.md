# PARALLEL_WORKTREE_AUTOMATION.md

## Native first

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
claude --worktree cc-124-tests
```

Add:

```gitignore
.claude/worktrees/
```

## Manual worktree

```bash
git worktree add ../repo-cc-123 -b cc/123-feature origin/main
cd ../repo-cc-123
claude
```

## Rule

```text
one task = one branch = one worktree
no unrelated same-file collisions
merge serially
review diff before PR
use Codex second opinion before merge
```

## Selective operator tools

```text
Claude Squad
Composio Agent Orchestrator
CCUI
AgentHub
Vibe Kanban
Workmux
itervox
```

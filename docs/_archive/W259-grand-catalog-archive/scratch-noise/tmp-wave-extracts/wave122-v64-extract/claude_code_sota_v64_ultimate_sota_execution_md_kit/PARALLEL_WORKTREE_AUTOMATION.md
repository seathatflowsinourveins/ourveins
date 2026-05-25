# PARALLEL_WORKTREE_AUTOMATION.md

## Native first

```bash
claude --worktree feature-name
```

Claude `/batch` for large independent changes:

```text
/batch migrate X to Y. Split into independent worktree branches. Avoid same-file conflicts. Run focused tests. Open PRs.
```

## Manual fallback

```bash
git fetch --all --prune
git remote set-head origin -a
git worktree add ../repo-feature -b cc/feature origin/main
cd ../repo-feature
claude
```

## Cleanup

```bash
git worktree list
git worktree remove ../repo-feature
git branch -d cc/feature
```

## Operator candidates

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
AgentHub
cmux
Crystal
agtx
```

Adopt only if they improve:

```text
worktree isolation
branch ownership
diff review
session visibility
kill/cleanup controls
cost visibility
local/remote data clarity
```

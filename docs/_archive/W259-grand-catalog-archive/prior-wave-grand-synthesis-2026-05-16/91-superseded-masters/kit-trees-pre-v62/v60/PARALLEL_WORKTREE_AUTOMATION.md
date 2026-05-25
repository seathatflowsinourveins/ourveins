# PARALLEL_WORKTREE_AUTOMATION

## Native first

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
claude --worktree cc-124-fix
claude --worktree cc-125-review
```

Add:

```gitignore
.claude/worktrees/
```

## Manual worktrees

```bash
git worktree add ../repo-feature -b cc/feature origin/main
cd ../repo-feature
claude
```

## Operator tools

Use only when they add supervision:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
```

## Parallelism rule

```text
Subagents isolate context.
Worktrees isolate files.
PRs isolate merge risk.
Codex isolates model bias.
CI isolates correctness.
```

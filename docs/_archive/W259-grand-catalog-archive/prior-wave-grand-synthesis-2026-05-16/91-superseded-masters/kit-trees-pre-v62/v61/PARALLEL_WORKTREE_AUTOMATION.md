# Parallel Worktree Automation V61

## Native first
```bash
git fetch --all --prune
git remote set-head origin -a
printf '
.claude/worktrees/
' >> .gitignore
claude --worktree cc-123-feature
```

## Manual worktrees
```bash
git worktree add ../repo-cc-123 -b cc/123-feature origin/main
cd ../repo-cc-123
claude
```

## Large changes
Use `/batch` only for independent units. Avoid multiple agents editing the same files.

## Operator tools
Evaluate only after audit/benchmark:
- Claude Squad
- Composio Agent Orchestrator
- CCUI
- AgentHub
- Vibe Kanban
- Workmux
- itervox

## Merge discipline
```bash
git status --short
git diff --stat
git diff --check
just test || scripts/verify.sh
/codex:review --base main --background
```

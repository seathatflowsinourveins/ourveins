# Parallel Git Worktree Playbook

## Rule

```text
One task = one branch = one worktree = one worker.
```

## Native Claude Code

```bash
git fetch --all --prune
git remote set-head origin -a

claude --worktree cc-123-auth-refresh
claude --worktree cc-124-payment-timeout
claude --worktree cc-125-flaky-login
```

Add:

```gitignore
.claude/worktrees/
```

## Manual git worktrees

```bash
git worktree add ../repo-auth -b cc/123-auth-refresh origin/main
git worktree add ../repo-payments -b cc/124-payment-timeout origin/main
git worktree list
```

Cleanup:

```bash
git worktree remove ../repo-auth
git branch -d cc/123-auth-refresh
```

## Worktree quality gate

```bash
git status --short
git diff --stat
git diff --name-only
git diff --check
just verify
# or scripts/verify.sh
```

## Merge rule

Parallel workers do not merge directly. They open PRs or hand changes to a conductor session.

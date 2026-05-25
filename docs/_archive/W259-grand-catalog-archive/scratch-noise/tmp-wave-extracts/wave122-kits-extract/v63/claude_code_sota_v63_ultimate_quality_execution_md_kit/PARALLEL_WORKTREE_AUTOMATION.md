# Parallel worktree automation

## Native first

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
```

## Manual worktree

```bash
git worktree add ../repo-cc-123 -b cc/123-feature origin/main
cd ../repo-cc-123
claude
```

## Batch

```text
/batch implement migration from A to B. Split by package. Avoid same-file conflicts. Add focused tests. Open PRs per branch.
```

## Merge gate

```text
git status --short
git diff --stat
git diff --check
focused tests
lint/typecheck
security scan
/codex:review
/codex:adversarial-review if risky
CI pass
```

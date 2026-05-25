# Parallel Git Worktree Playbook

## Rule
One task = one branch = one worktree = one agent owner.

## Native Claude Code
```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-auth-refresh
claude --worktree cc-124-payment-timeout
```

Add:
```gitignore
.claude/worktrees/
```

## Manual worktrees
```bash
git worktree add ../repo-auth -b cc/123-auth-refresh origin/main
git worktree add ../repo-payments -b cc/124-payment-timeout origin/main
git worktree list
```

## Merge discipline
```bash
git status --short
git diff --stat
git diff --name-only
git diff --check
just verify || scripts/verify.sh
gh pr create --fill
```

Then run:
```text
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, rollback gaps, auth bugs, data loss, and race conditions --background
```

## Parallel roles
- Planner: decomposes, no edits.
- Implementer: owns patch.
- Verifier: runs tests and summarizes failures only.
- Reviewer: read-only.
- Codex bridge: second-model review/rescue.

## Avoid
- two agents editing same files
- shared working tree for parallel implementation
- unbounded review loops
- secret copying into every worktree

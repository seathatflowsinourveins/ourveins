---
name: session-handoff
description: |
  W343 cherry-pick recovery pattern — when a concurrent CC session or operator-edit
  resets/overwrites your branch and in-flight work needs rescue. Triggers on
  "session collision", "concurrent branch reset", "operator overwrote my work",
  "cherry-pick recovery", "branch divergence", "parallel session conflict",
  "/session-handoff", "side-branch rescue". Use when reflog shows your wave's
  commits are no longer on the branch tip OR when the pre-commit cr7-worktree-collision
  guard blocks because another worktree is on the same branch.
---

# session-handoff — W343 cherry-pick recovery

When a parallel CC session, an operator manual `git reset`, or a force-push from
another worktree wipes your in-flight wave work off the branch tip, this skill
codifies the SOTA rescue: side-branch + cherry-pick + merge-back.

## Detection

You are in collision mode when ANY of:

1. `git log --oneline -20` does NOT show your last 3 commits at the tip.
2. `git reflog` shows your commits exist but the branch HEAD points elsewhere.
3. `git status` shows files you DID NOT touch as `modified` or `staged`.
4. The cr7-worktree-collision pre-commit hook blocked your commit.
5. Another worktree (per `git worktree list`) is on the same branch.

## Recovery procedure

```bash
# 1. snapshot in-flight uncommitted work (won't lose anything)
git stash push -u -m "W344-Z6-rescue-$(date +%s)"

# 2. find last-known-good SHA from YOUR commits via reflog
git reflog | grep -E "wave|W344|Z6" | head -20
LAST_GOOD=<paste-SHA-here>

# 3. branch off the last-good SHA — never on the contested branch
git checkout -b rescue-W344-Z6 "$LAST_GOOD"

# 4. cherry-pick YOUR wave commits (NOT operator's edits)
git cherry-pick <your-first-SHA>^..<your-last-SHA>

# 5. when operator's edit settles, merge back with no-ff to preserve history
git checkout w344-sota-unleash
git pull --rebase origin w344-sota-unleash       # adopt operator's reset
git merge --no-ff rescue-W344-Z6 -m "merge: W344 Z6 rescue cherry-pick"

# 6. restore in-flight uncommitted edits
git stash pop

# 7. verify clean lineage
git log --graph --oneline -20
```

## When NOT to use

- Routine merge conflicts on the same branch — use normal `git rebase` flow.
- Operator explicitly squashed your commits intentionally — coordinate first.
- Solo session, no concurrent sessions detected — likely just a `git pull` rebase.

## Cite-anchors (3-org-distinct per CR-6)

- **SPI / git-project**: <https://git-scm.com/docs/git-cherry-pick> + <https://git-scm.com/docs/git-reflog>
- **Atlassian (Bitbucket)**: <https://www.atlassian.com/git/tutorials/cherry-pick>
- **Anthropic (CCBP)**: `claude-memory.md @ a28cd96b` parallel-session safety guidance

## Cardinal-rule compliance

- CR-1 (trusted sources): SPI + Atlassian + Anthropic — 3-org-distinct.
- CR-3 (subagent type): N/A — operator-driven recovery skill.
- CR-4 (≤8 triggers): 8 distinct triggers (audit floor); cardinality at cap, not over.
- CR-6 (verify-before-claim): each `git` command produces observable output;
  rescue is incomplete until `git log --graph` shows expected lineage.

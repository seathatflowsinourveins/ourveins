# W366 Worktree Decision Record

**Date:** 2026-05-22
**Worktree count at decision time:** 5 (cap reached per CLAUDE.md GIT-TREE-SOTA §2)

## Live worktree state at decision time

```
Z:/claude-sota-installed         531791b [w348-sota-fix-p5b]      ← canonical install dir
Z:/claude-sota-installed-W362a   4062fcc [goal/W362a-live-re-score]
Z:/claude-sota-installed-W362bA  dccb687 [goal/W362b-alpha-catalog-refresh]
Z:/claude-sota-installed-W362bB  c255a31 [goal/W362b-beta-xg-doctrine]
Z:/claude-sota-installed-W362c   bf18696 [goal/W362c-peer-live-judging]   ← LIVE judging, NO TOUCH
```

## Strategy chosen: (c) — in-place branch on current worktree

No new worktree is created. The `feat/W366-git-substrate-hardening` branch is created in-place on the existing `Z:/claude-sota-installed` worktree (currently was on `w348-sota-fix-p5b`).

## Rationale

- **Avoids cap-breach**: would have made 6 worktrees > cap=5
- **No W362 disruption**: W362a/bA/bB stay live; W362c LIVE judging absolutely untouched
- **Lower memory/cognitive load**: 1 fewer concurrent worktree
- **Trade-off accepted**: current install dir switches branch context from `w348-sota-fix-p5b` → `feat/W366-git-substrate-hardening`. Any unpushed work on `p5b` is preserved by:
  1. The `p5b` branch ref itself (still exists, can be checked out again)
  2. The fact that `feat/W366-…` is branched FROM `p5b` HEAD `531791b`, so all p5b commits remain ancestor commits

## Operator sign

**Approved 2026-05-22 via AskUserQuestion** — operator selected "(c) In-place branch on current worktree (Recommended)" from 4-option choice.

## Stash policy for current uncommitted changes

Before branch switch, current uncommitted concurrent changes (from other sessions / hooks) were stashed as **`W366-prework-stash-2026-05-22`**:
- `.claude/plugins/installed_plugins.json` (modified)
- `.claude/plugins/known_marketplaces.json` (modified)
- `.claude/settings.json` (modified)
- `.claude/skills/iterate-fix-failing-tests/SKILL.md` (modified)
- `.claude/skills/mcp-agent-patterns/SKILL.md` (modified)
- `tools/eee.ps1` (modified)
- `tools/stop-position-swap.mjs` (modified)
- Plus untracked: `accounts/scripts/auto_offload.py`, `docs/architecture/AUDIT-2026-05-21/`, `docs/architecture/W338-CPA-ROUTER-SOTA-PATCHES/swap-w338-binary.ps1`

To be restored post-W366 to either:
- The W366 branch (if any are W366-related — `AUDIT-2026-05-21/` IS, will be migrated in P7)
- A separate concurrent-work branch
- OR explicitly discarded if confirmed irrelevant

Operator decides post-W366.

## Verification

- New branch: `feat/W366-git-substrate-hardening`
- HEAD: `531791b` (inherits W366 spec + plan commits from p5b)
- `git branch --show-current` → `feat/W366-git-substrate-hardening`

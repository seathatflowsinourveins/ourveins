# W373-F008 — Jury Request Brief

**Finding ID**: W373-F008
**Source stream(s)**: D + C (D-F007 + C-1 merged), connects to F016
**Risk-class**: HIGH
**sca-v18**: 3.0 (decomposed: D101=3.0 · D102=2.5 · D103=3.5 · D104=2.5 · D105=3.5)
**Remediation type**: worktree_prune (merge-then-prune)

## Subject
7 worktrees are live versus the cap=5 per CLAUDE.md L14 / W350 §2. Three worktrees (W362a, W362b-alpha, W362c) carry 143/158/173 orphan commits each → NEEDS-MERGE-OR-CHERRY-PICK before prune.

## Evidence (cite-anchored)
- `git worktree list` → 7 entries (Stream D-F007 + C-1).
- `git rev-list --count <branch>` per orphan branch: W362a=143, W362b-alpha=158, W362c=173.
- CLAUDE.md L14: `~5 parallel cap` per W350 §2.
- Each orphan branch has SHIPPED claim per CLAUDE.md history but no merge into main.

## Proposed remediation
1. **Cherry-pick path**: Identify clean cherry-pick targets:
   - W362a: `1272237`
   - W362b-alpha: `a9a6501`
   - W362c: `bf18696`
   - W362b-beta: `4ceaae9`
   Apply each to main via `git cherry-pick`.
2. **Merge path**: `git merge --squash` each branch into main with conflict-resolution per branch.
3. After successful merge/cherry-pick, prune the 3 settled worktrees via `git worktree remove <path>` (auto-coalesces F016).
4. Verify worktree count returns to ≤5.

## Risks of the proposed remediation
- Cherry-pick may surface conflicts; manual resolution required per branch.
- 143-173 commits per branch is a deep cherry-pick chain; may need `git rebase --onto` or squash-then-merge.
- Pruning a worktree may delete uncommitted state (verify `git status` per worktree first).
- Coalesces with F016 (operator-decision flavor); jury must approve batch order.

## Rollback steps
1. `git reset --hard <pre-merge-SHA>` on main to back out the merge.
2. `git worktree add <path> <branch>` to restore pruned worktree.
3. Restore branch refs from reflog if needed.

## Cardinal-rule + spec alignment
- Cardinal-rule 1 (install primitives from trusted sources): YES — worktree state is part of install-state.
- W350 worktree-cap=5 discipline: YES — primary motivation.
- W373 spec §Medium-jury sca 3.0+: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `git worktree list` + `git rev-list --count` per branch.
2. Is the proposed remediation proportional? — YES; pruning without merge would lose 474 commits.
3. False-positive paths? — Some commits may already be on main via prior partial merges. Probe: `git log main --grep="W362a"`.
4. Does rollback actually restore prior state? — YES via reflog + worktree add.
5. What changes after this fix that wasn't anticipated? — main branch history grows; CI workflow run-times may increase; possible squash-conflicts with future operator-sign waves.

# W373-F016 — Jury Request Brief

**Finding ID**: W373-F016
**Source stream(s)**: C-1 (preserved separately from F008 for operator-decision granularity)
**Risk-class**: HIGH
**sca-v18**: 7.0 (decomposed: D101=7.0 · D102=7.0 · D103=7.0 · D104=7.0 · D105=7.0) — note: high sca = LOW urgency in W373 inverse-scale
**Remediation type**: worktree_prune (operator-decision)

## Subject
6 linked worktrees carry 143-173 orphan commits each — operationally healthy BUT blocks W350 5-cap safety. NONE are prune-candidates without prior merge/cherry-pick.

## Evidence (cite-anchored)
- `git rev-list --count` per branch (Stream C-1; same probe as F008).
- `git worktree list` → 7 worktrees, 6 with orphan-commit tails.
- CLAUDE.md L14: `~5 parallel cap` per W350 §2.

## Proposed remediation
This finding is DOWNSTREAM of F008 — same root cause, finer-grained operator-decision flavor. After F008 merge/cherry-pick, prune the 3 settled worktrees (W362a, W362b-alpha, W362c).
1. After F008 merge/cherry-pick lands, `git worktree remove <path>` for each settled worktree.
2. `git worktree prune` to clean linked-worktree metadata.
3. Verify worktree count returns to ≤5.

## Risks of the proposed remediation
- Pruning a worktree with uncommitted state will lose work — verify `git status` clean per worktree first.
- The 6-vs-7 count discrepancy (F016 says 6, F008 says 7) may reflect different probe windows; reconcile before action.

## Rollback steps
1. `git worktree add <path> <branch>` to restore pruned worktree.
2. Reference reflog if any references were lost.

## Cardinal-rule + spec alignment
- W350 worktree-cap=5 discipline: YES — primary motivation.
- W373 spec §Medium-jury sca 3.0+: aligns (F016 ranks sca 7.0 due to "operationally healthy" — high-sca = low-urgency in W373 inverse-scale).

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `git worktree list` + `git rev-list --count`.
2. Is the proposed remediation proportional? — YES; auto-prune downstream of F008.
3. False-positive paths? — Worktrees may carry uncommitted state ("operationally healthy" doesn't mean prunable). Verify.
4. Does rollback actually restore prior state? — YES via worktree add + reflog.
5. What changes after this fix that wasn't anticipated? — Disk-footprint reduction; CI runners may speed up.

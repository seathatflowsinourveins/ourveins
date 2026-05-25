# W373-F018 — Jury Request Brief

**Finding ID**: W373-F018
**Source stream(s)**: D (D-F002), connects to F003
**Risk-class**: HIGH
**sca-v18**: 4.0 (decomposed: D101=4.0 · D102=4.0 · D103=4.0 · D104=4.0 · D105=4.0)
**Remediation type**: hidden_error_fix

## Subject
`parallel-guard` FAST PATH `recentTicks >= 2` may reset state for legitimate solo-sequence dispatches (`tools/preagent-parallel-guard.mjs` L432-446) — this reduces false-negatives but INCREASES the reset-race surface. CONNECTS to F003 (parallel_ratio FAIL root-cause).

## Evidence (cite-anchored)
- `grep -nA 15 'FAST PATH' tools/preagent-parallel-guard.mjs` (Stream D-F002).
- Lines 432-446 implement the `recentTicks >= 2` heuristic.
- F003 root-cause hypothesis: FAST PATH may reset solo-sequence state mid-dispatch, causing parallel-ratio metric to over-count solo events as legitimate solo (instead of resetting to count-from-1).

## Proposed remediation
1. Review FAST PATH `recentTicks >= 2` logic in `tools/preagent-parallel-guard.mjs:432-446`.
2. Test hypothesis: does FAST PATH fire on legitimate solo-sequences (CR-5 exception condition-b)? Run target probe via instrumented log injection.
3. Decide on threshold:
   - **Tighten path**: `recentTicks >= 3` to require more evidence before resetting.
   - **Add guard path**: `if (recentTicks >= 2 && !solo_sequence_marker)` to skip reset on solo-marked sequences.
   - **Remove path**: Eliminate FAST PATH altogether if F003 root-cause confirmed.
4. Re-probe parallel-ratio metric after patch over 7-day window.

## Risks of the proposed remediation
- Tightening may increase false-negatives (binding gate misses legitimate parallel-violations).
- Adding guard may surface CR-5 exception condition-b spec ambiguity.
- Removing FAST PATH may revert to pre-W342-Z behavior (regression).
- Multi-wave dependency: F003 root-cause diagnosis must complete first.

## Rollback steps
1. `git revert <patch-commit>` for parallel-guard.mjs changes.
2. Reset probe-counter state in `.claude/state/parallel-guard-state.json`.

## Cardinal-rule + spec alignment
- Cardinal-rule 5 (safety boundaries): YES — parallel-dispatch enforcement.
- W373 spec §Medium-jury sca 3.0+: aligns.
- CONNECTS to F003 multi-hypothesis diagnosis.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-read parallel-guard.mjs L432-446.
2. Is the proposed remediation proportional? — Depends on F003 diagnosis outcome; jury should sequence F003 before F018.
3. False-positive paths? — FAST PATH may be required to avoid false-positives in CR-5 exception condition-b solo sequences. Removing it may surface other failures.
4. Does rollback actually restore prior state? — YES via git revert.
5. What changes after this fix that wasn't anticipated? — Tightening may surface new CR-5 exception condition-b cases that require additional spec clarification.

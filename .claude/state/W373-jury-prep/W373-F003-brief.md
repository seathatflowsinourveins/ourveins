# W373-F003 — Jury Request Brief

**Finding ID**: W373-F003
**Source stream(s)**: D (D-F001), connects to F018, F086
**Risk-class**: HIGH (CRITICAL subset)
**sca-v18**: 1.5 (decomposed: D101=1.5 · D102=1.5 · D103=2.0 · D104=1.0 · D105=1.5)
**Remediation type**: hidden_error_fix (multi-hypothesis diagnosis)

## Subject
`parallel_ratio` empirical metric is 0.028 against a target of ≥0.7 → FAIL. Measured across 4 multi-stream sessions out of 141 over a 13-day JSONL window. Although the binding gate has been live since W330, the metric is stagnant at 7.8× above the W325-A baseline (0.0036) BUT 24× short of target.

## Evidence (cite-anchored)
- Stream D §F001: probe of 1646 JSONL files; regex detection via `tools/parallel-guard-regex.mjs`.
- Result: 4/141 multi-stream sessions exhibit ≥2 Agent calls in a single assistant message (parallel dispatch).
- Binding gate landed W330: `tools/preagent-parallel-guard.mjs` exit(2) on 2nd violation (CLAUDE.md L13).
- CLAUDE.md L13 target: `parallel_ratio ≥0.7 per multi-stream session`.
- W325-A baseline: 0.0036 (`docs/architecture/W325/...`) — current 7.8× higher but order-of-magnitude below target.

## Proposed remediation
Multi-hypothesis diagnosis (one or more):
1. **Bypass-marker overuse**: probe whether operator workflows over-use `BYPASS-PARALLEL-GUARD` marker. Cite: count occurrences in 13d JSONL → if >10%, mark as root cause and tighten marker policy.
2. **UserPromptSubmit flag absence**: verify `tools/preagent-parallel-guard.mjs` reads UserPromptSubmit hook correctly. Probe: read `.claude/settings.json` hook entries + JSONL line markers.
3. **TURN_WINDOW_MS too tight**: current `TURN_WINDOW_MS` may close before 2nd Agent call lands; widen heuristic.
4. **Regex over-triggers**: parallel-guard regex may detect false-positives in non-multi-stream sessions (denom inflation). Tighten regex.
After diagnosis, write targeted patch + re-run probe on next 13-day window.

## Risks of the proposed remediation
- Patch may further reduce parallel_ratio if diagnosis is wrong (denial-of-progress).
- TURN_WINDOW_MS widening may increase false-positives (orchestrator mis-classified as serial).
- Regex tightening may miss legitimate parallel dispatches (false-negative inflation).
- Multi-wave dependency: fix likely needs W374+ instrumentation wave per REMEDIATION-MANIFEST.md L245.

## Rollback steps
1. `git revert <patch-commit>` for parallel-guard.mjs changes.
2. Restore prior `TURN_WINDOW_MS` constant.
3. Reset probe-counter state in `.claude/state/parallel-guard-state.json`.

## Cardinal-rule + spec alignment
- Cardinal-rule 5 (safety boundaries): YES — parallel-dispatch enforcement is part of layered defense (sca-v11 §6).
- Cardinal-rule 6 (verify-before-claim): YES — current "binding gate live" claim must be re-attested with new metric.
- W373 spec §Top-jury-priority sca<2.0: aligns with the #3 jury candidate by ascending sca.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run JSONL probe over fresh 13-day window.
2. Is the proposed remediation proportional? — Multi-hypothesis diagnosis IS proportional; rushing to patch is not.
3. False-positive paths? — The denom (141 multi-stream sessions) might be over-counted; many "multi-stream" labels may be false-multi-stream (single-task sessions misclassified).
4. Does rollback actually restore prior state? — YES via git revert.
5. What changes after this fix that wasn't anticipated? — Tightening the gate may surface previously-suppressed CR-1 trust-tuple violations elsewhere.

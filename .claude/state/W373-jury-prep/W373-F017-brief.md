# W373-F017 — Jury Request Brief

**Finding ID**: W373-F017
**Source stream(s)**: F + A (F-F018 + A-F030 merged)
**Risk-class**: HIGH
**sca-v18**: 3.0 (decomposed: D101=3.0 · D102=3.0 · D103=3.0 · D104=2.5 · D105=3.5)
**Remediation type**: cite_refresh

## Subject
Skill count drift — CLAUDE.md L31 says "× 63" per W368 P0.1 (2026-05-22); live `ls .claude/skills/` without `_archived` returns **62**. One-skill drift since W368 (4-hour window).

## Evidence (cite-anchored)
- `ls .claude/skills/ | grep -v ^_archived$ | wc -l` = 62 (Stream F-F018, Stream A-F030).
- CLAUDE.md L31 text: `× **63** (W368 P0.1 live re-probe 2026-05-22 via ... = 63...)`.
- One-skill silent drift in the 4-hour window between W368 P0.1 probe (10:01Z) and W373 probe (14:30Z).

## Proposed remediation
1. Update CLAUDE.md L31 `× 63` → `× 62`.
2. Note in CLAUDE.md footnote: "W373 X1 re-probe 2026-05-22 finds 62; -1 since W368 P0.1 (one skill removed in the 4-hour window — to investigate)".
3. Alternative: open investigation row for the +5/-1 silent drift between W368 (63) and W350 baseline (58).
4. Coalesce with other CLAUDE.md edits (F013, F019, F020, F023, F034, F006).

## Risks of the proposed remediation
- The "62 vs 63" count could re-shift again before the edit lands (more skills added/removed); probe immediately before commit.
- Operator-curated skill management may surface the dropped skill; verify it was an intentional removal not an accident.
- Coalesce-batch edit may surface unexpected merge conflicts.

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md` to revert to 63.
2. Re-run skill ls to verify count.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — direct CR-6 fix.
- Cardinal-rule 4 (operator-curated path-gated rules): YES — skill inventory IS subject to CR-4 corollary audit.
- W373 spec §Medium-jury sca 3.0+: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run `ls .claude/skills/`.
2. Is the proposed remediation proportional? — YES; single-token swap.
3. False-positive paths? — `_archived` exclusion may have been computed differently in W368 (e.g., included). Compare ls output structures.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — The dropped skill may have been a CR-4 violation removal — verify trigger audit history.

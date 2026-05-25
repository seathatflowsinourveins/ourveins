# W373-F034 — Jury Request Brief

**Finding ID**: W373-F034
**Source stream(s)**: D (D-F011)
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: cite_refresh

## Subject
CLAUDE.md L13 says "1 exit(2) + 8 exit(0) calls per W341-B Q11". Live `tools/preagent-parallel-guard.mjs` has 3 × exit(2) + 11 × exit(0) after W342-Z + W343 P0(d) fail-closed upgrade.

## Evidence (cite-anchored)
- `grep -nE 'process\.exit\(' tools/preagent-parallel-guard.mjs` → 14 calls total: 3 × exit(2) + 11 × exit(0) (Stream D-F011).
- CLAUDE.md L13 stale text: "1 `exit(2)` + 8 `exit(0)` calls per W341-B Q11 NO-OP verification".

## Proposed remediation
1. Edit CLAUDE.md L13 to update exit-count text: `1 exit(2) + 8 exit(0)` → `3 exit(2) + 11 exit(0)`.
2. Add brief footnote: "Counts updated post-W342-Z + W343 P0(d) fail-closed upgrade per W373 X1 re-probe".
3. Coalesce with other CLAUDE.md edits (F013, F017, F019, F020, F023, F006).

## Risks of the proposed remediation
- Cosmetic only; no behavior change.
- Coalesce-batch may surface merge conflicts.
- W341-B Q11 reference may itself need cite-refresh if the wave-doc says different counts.

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md` to revert L13 text.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — direct CR-6 fix.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run grep.
2. Is the proposed remediation proportional? — YES; cite-refresh is minimal.
3. False-positive paths? — Counts may have changed again between brief and edit; probe immediately before commit.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — Future readers see live counts; W341-B Q11 reference may need pointer-update if archive doc has different counts.

# W373-F020 — Jury Request Brief

**Finding ID**: W373-F020
**Source stream(s)**: F (F-F009)
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: cite_refresh

## Subject
CLAUDE.md L5 cites "Closest reverify-points: `pre-W337-p3-1-claude-md` + `pre-W337-sca-v14` (per `git tag --list 'pre-W*'`)". The two pre-W337 tags do NOT exist in this worktree. `git tag --list "pre-W*"` actually returns only `pre-W374-temporal-openhands`.

## Evidence (cite-anchored)
- `git tag --list "pre-W*"` → returns only `pre-W374-temporal-openhands` (Stream F-F009).
- CLAUDE.md L5 cite is FALSE-by-evidence.

## Proposed remediation
Two paths — jury must choose:
1. **Restore tags path**: Identify the SHAs that `pre-W337-p3-1-claude-md` and `pre-W337-sca-v14` SHOULD point to (per T6 basic-memory wave-notes); recreate the tags via `git tag <name> <SHA>`.
2. **Update CLAUDE.md path**: Edit L5 to cite the surviving `pre-W374-temporal-openhands` tag as the closest reverify-point. Document tag retention discipline.

## Risks of the proposed remediation
- Path 1 (restore tags): Without correct SHAs from T6 memory, tags may point to wrong commits (creates new fabricated cites).
- Path 2 (update CLAUDE.md): Loses historical tag chain; may affect rollback discipline for prior waves.
- Coalesce with other CLAUDE.md edits (F013, F017, F019, F023, F034).

## Rollback steps
1. Path 1: `git tag -d <name>` to remove recreated tags.
2. Path 2: `git checkout HEAD -- CLAUDE.md` to revert L5 text.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — direct CR-6 fix.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `git tag --list "pre-W*"` to confirm.
2. Is the proposed remediation proportional? — Path 2 is minimal; Path 1 requires deeper archaeology.
3. False-positive paths? — Tags may have been pruned by `git gc` or operator cleanup. T6 basic-memory may have prior SHAs.
4. Does rollback actually restore prior state? — YES for both paths.
5. What changes after this fix that wasn't anticipated? — Path 2: future rollback discipline must use `pre-W374` as anchor; if pre-W374 also gets pruned, problem repeats.

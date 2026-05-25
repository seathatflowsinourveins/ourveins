# W373-F013 — Jury Request Brief

**Finding ID**: W373-F013
**Source stream(s)**: F + D (F-F006 + D-F008 + D-F009 merged), coalesces F084
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: settings_surgery (CLAUDE.md L20 ↔ L35 sync)

## Subject
CLAUDE.md has INTERNAL INCONSISTENCY: L20 says `13 colliding-bare-names + 38 orphaned-FQN`; L35 W370 footnote (already-corrected) says `14 + 43`; live header in `subagent-type-allowlist.json` confirms `14 + 43`. Same-doc single-source-of-truth violation.

## Evidence (cite-anchored)
- `jq '._colliding_bare_count, ._orphaned_fqn_count' .claude/state/subagent-type-allowlist.json` → 14, 43 (Stream F-F006).
- CLAUDE.md L20 text: "...38 orphaned-FQN preserved (W342-C verify-before-claim re-probed: 33→38)".
- CLAUDE.md L35 text (W370 footnote): "_colliding_bare_count=14 (was 13), _orphaned_fqn_count=43 (was 38)".
- Stream D-F008 + D-F009 (preserved separately as MED merged).

## Proposed remediation
1. Edit CLAUDE.md L20 to update counts: `13 colliding-bare-names` → `14`; `38 orphaned-FQN` → `43`.
2. Add brief footnote linking to W370 Stream C F2/F4 (the wave that authoritatively re-counted).
3. Coalesce with F006, F017, F019, F020, F023, F034 (other CLAUDE.md edits) into a single ratified edit (avoids commit churn per L14 ~5 parallel cap discipline).

## Risks of the proposed remediation
- Edit may push CLAUDE.md L20 length beyond 50-LOC body budget (verify before edit).
- W370 W342-C reference chain may itself need cite-refresh if W370 doc references the older 13/38 values.
- Internal CLAUDE.md inconsistency is symptom of larger drift; counts may shift again before edit lands.

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md` to revert L20 text.
2. Re-verify via fresh jq probe before re-attempting.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — internal inconsistency is a CR-6 trace violation.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run jq probe.
2. Is the proposed remediation proportional? — YES; sync single source of truth.
3. False-positive paths? — Counts may have changed again between this brief and the eventual edit. Probe immediately before commit.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — Coalesce-batch may surface unexpected merge conflicts with other CLAUDE.md edits; jury must approve coalesce order.

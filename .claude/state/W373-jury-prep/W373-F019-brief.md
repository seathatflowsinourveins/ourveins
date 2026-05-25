# W373-F019 — Jury Request Brief

**Finding ID**: W373-F019
**Source stream(s)**: F (F-F008), coalesces F064 (Stream D flavor)
**Risk-class**: HIGH
**sca-v18**: 2.5 (decomposed: D101=2.5 · D102=2.5 · D103=2.5 · D104=2.0 · D105=3.0)
**Remediation type**: cite_refresh

## Subject
CLAUDE.md L31 cites `docs/architecture/W333-SOTA-UNLEASH/SKILLS-INVENTORY.md (queued)`. The `W333-SOTA-UNLEASH/` directory contains only `VERDICT-LEDGER.md` + `WAVE-CLOSURE.md`. The queued doc was never landed — CR-6 verify-before-claim violation (phantom queued doc).

## Evidence (cite-anchored)
- `ls docs/architecture/W333-SOTA-UNLEASH/` → only VERDICT-LEDGER + WAVE-CLOSURE.
- `find -iname "*SKILLS-INVENTORY*"` → zero results (Stream F-F008).
- CLAUDE.md L31 text: "Full enumeration at `docs/architecture/W333-SOTA-UNLEASH/SKILLS-INVENTORY.md` (queued)".
- Stream D-F013 (preserved as F064): same finding from Stream D flavor.

## Proposed remediation
Two paths — jury must choose:
1. **Land the doc**: Author `SKILLS-INVENTORY.md` capturing the 62-skill bundle inventory (W373 X1 probe data). Remove "(queued)" annotation from CLAUDE.md L31.
2. **Remove the cite**: Edit CLAUDE.md L31 to remove the dangling reference; rely on `ls .claude/skills/` as the live source.

## Risks of the proposed remediation
- Path 1 (doc_create): Inventory will go stale immediately (skills churn often per F017 +5/-1 drift). Auto-regeneration script may be needed for sustained truthfulness.
- Path 2 (cite_refresh): Removes a documentation pointer; downstream readers lose a quick-reference.
- Coalesce with F013, F017, F020, F023, F034 (other CLAUDE.md edits) into batch.

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md` to revert text change.
2. If doc was created, `git rm docs/architecture/W333-SOTA-UNLEASH/SKILLS-INVENTORY.md`.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — direct CR-6 fix.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `ls docs/architecture/W333-SOTA-UNLEASH/` to confirm.
2. Is the proposed remediation proportional? — YES; one of two minimal paths.
3. False-positive paths? — Doc may exist under different directory (e.g., W333-SOTA-LIST/). Probe broader: `find . -iname "*SKILLS-INVENT*"`.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — Path 1: maintenance overhead; Path 2: future skill-bundle inventories must be authored elsewhere.

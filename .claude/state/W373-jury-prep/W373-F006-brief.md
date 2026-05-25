# W373-F006 — Jury Request Brief

**Finding ID**: W373-F006
**Source stream(s)**: F (F-F005), coalesces F066
**Risk-class**: HIGH
**sca-v18**: 2.0 (decomposed: D101=2.0 · D102=2.0 · D103=2.0 · D104=1.5 · D105=2.5)
**Remediation type**: cite_refresh (or doc_create)

## Subject
CLAUDE.md L20 cites `docs/architecture/W336-CONTINUE/W336-FQN-SUBAGENT-TYPE.md (operator-sign queued)`. The file does NOT exist. `W336-CONTINUE/` directory contains only `VERDICT-LEDGER.md` + `WAVE-CLOSURE.md`. The "Documented at <path>" claim was never written — CR-6 verify-before-claim violation.

## Evidence (cite-anchored)
- `find . -iname "*W336*FQN*"` → ZERO results (Stream F-F005).
- `ls docs/architecture/W336-CONTINUE/` → only `VERDICT-LEDGER.md` + `WAVE-CLOSURE.md`.
- CLAUDE.md L20 quoted text: "Documented at `docs/architecture/W336-CONTINUE/W336-FQN-SUBAGENT-TYPE.md` (operator-sign queued)".
- Stream D-F015 (preserved as F066): same finding from Stream D's flavor.

## Proposed remediation
Two paths — jury must choose:
1. **Land the doc**: Author the `W336-FQN-SUBAGENT-TYPE.md` document NOW, using subagent-type-allowlist.json + W333-D5 migration evidence as source. Remove "(queued)" annotation from CLAUDE.md L20.
2. **Remove the cite**: Edit CLAUDE.md L20 to remove the dangling doc reference; refactor to in-line the FQN-discipline rule (per CLAUDE.md size budget ≤50 LOC).

## Risks of the proposed remediation
- Path 1 (doc_create): doc must capture full FQN-vs-bare migration history; if written from incomplete evidence, the cite-anchor itself is fragile.
- Path 2 (cite_refresh): removing the cite may lose operator-sign-pending state; need to record in T6 basic-memory if removed.
- Both paths: CLAUDE.md edit must coalesce with F013 (L20↔L35 sync), F017 (skill count), F019, F020, F023, F034 (other CLAUDE.md edits) into a single ratified edit to avoid commit churn.

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md` to revert text change.
2. If doc was created, `git rm docs/architecture/W336-CONTINUE/W336-FQN-SUBAGENT-TYPE.md`.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — direct fix of CR-6 violation.
- Cardinal-rule 4 (operator-curated path-gated rules): if Path 1, the new doc must comply.
- W373 spec §High-jury sca 2.0-3.0: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `find . -iname "*W336*FQN*"` to confirm.
2. Is the proposed remediation proportional? — YES; one of two minimal paths.
3. False-positive paths? — The doc may have been moved or renamed (e.g., to W337-CONTINUE). Probe: `find . -iname "*FQN*SUBAGENT*"`.
4. Does rollback actually restore prior state? — YES.
5. What changes after this fix that wasn't anticipated? — If Path 1, the new doc may become an operator-sign blocker for downstream waves.

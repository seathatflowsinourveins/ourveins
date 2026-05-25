# W373-F023 — Jury Request Brief

**Finding ID**: W373-F023
**Source stream(s)**: F (F-F004)
**Risk-class**: HIGH
**sca-v18**: 3.0 (decomposed: D101=3.0 · D102=2.5 · D103=3.5 · D104=2.5 · D105=3.5)
**Remediation type**: cite_refresh

## Subject
CLAUDE.md L11 cite to `04-wave254-behavioral-layer-2026-05-15/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` — file MOVED to `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/...`; sibling/dup copies exist under `wave-research-A-Z/`. Same root cause as F007 (Stream F flavor — preserved separately for cross-stream traceability).

## Evidence (cite-anchored)
- `find . -iname "*W254*BEHAVIORAL*"` returns archive paths only.
- Same evidence as F007.
- Stream F-F004 evidence; F007 is Stream D flavor.

## Proposed remediation
**Coalesce with F007.** Same edit — update CLAUDE.md L11 path to archive location:
- Preferred shorter path: `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/wave-research-A-Z/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md`.
- Add footnote noting W259-grand-catalog consolidation.

## Risks of the proposed remediation
- Identical to F007 (coalesced).
- Jury must decide order: F007 OR F023 first (or single coalesced batch).

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md` to revert L11 text.

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — direct CR-6 fix.
- W373 spec §Medium-jury sca 3.0+: aligns.

## Adversarial probes (questions a jury would ask)
1. Same probes as F007.
2. Coalesce question: Should F007 and F023 land as one commit or two?

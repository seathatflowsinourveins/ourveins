# W373-F007 — Jury Request Brief

**Finding ID**: W373-F007
**Source stream(s)**: D (D-F012), coalesces F023 (Stream F flavor)
**Risk-class**: HIGH
**sca-v18**: 3.0 (decomposed: D101=3.0 · D102=2.5 · D103=3.5 · D104=2.5 · D105=3.5)
**Remediation type**: cite_refresh

## Subject
CLAUDE.md L11 cite path `docs/outer research/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` does NOT exist. File has been MOVED to the W259-grand-catalog archive.

## Evidence (cite-anchored)
- `ls "docs/outer research/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15/"` → No such file or directory.
- Live location: `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/prior-wave-grand-synthesis-2026-05-16/04-outer-research-canonical/research-wave-2026-05-15/04-wave254-behavioral-layer-2026-05-15/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md`.
- Sibling/dup copy: `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/wave-research-A-Z/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md`.
- Stream F-F004 evidence (preserved as F023).

## Proposed remediation
1. Edit CLAUDE.md L11 to update path to the archive location (preferred: `docs/architecture/W259-grand-catalog/00-archive-from-prior-waves/wave-research-A-Z/W254-BEHAVIORAL-LAYER-ARCHITECTURE-2026-05-15.md` — shorter, sibling-discoverable).
2. Coalesce with F023 (Stream F flavor — same edit).
3. Add brief footnote: "Path updated post-W259-grand-catalog archive consolidation (W373 X1)".

## Risks of the proposed remediation
- New path is long (4 levels deep); may push CLAUDE.md line near LOC budget.
- If file is moved AGAIN (future archive consolidation), cite drifts again — consider using a stable doc-ID system (e.g., `docs/.symlinks/W254-BEHAVIORAL.md`).
- Coalesces with F023 — jury must approve as a batch edit.

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md` to revert to broken cite.
2. Not recommended (CR-6 says broken cite is a violation).

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — CR-6 violation fix.
- W373 spec §Medium-jury sca 3.0+: aligns.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — `find . -iname "*W254*BEHAVIORAL*"` to confirm both locations.
2. Is the proposed remediation proportional? — YES; cite-refresh is minimal.
3. False-positive paths? — Could there be a third copy elsewhere? Probe: `find . -iname "*W254*BEHAVIORAL*" | wc -l`.
4. Does rollback actually restore prior state? — YES (but prior state is broken).
5. What changes after this fix that wasn't anticipated? — Future readers will follow link to archive; ensure the archive copy is canonical/non-stale.

# W373-F001 — Jury Request Brief

**Finding ID**: W373-F001
**Source stream(s)**: F (F-F002 + F-F016 merged), cascade into A
**Risk-class**: HIGH (CRITICAL subset)
**sca-v18**: 1.2 (decomposed: D101=1.5 · D102=1.0 · D103=1.0 · D104=1.0 · D105=1.5)
**Remediation type**: cite_refresh (with cascade)

## Subject
mattpocock-vendor-fork-10 SHA `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` cited in CLAUDE.md L31 and `.claude/skills/improve-codebase-architecture/SKILL.md` is FABRICATED — does not exist in `mattpocock/skills` git history.

## Evidence (cite-anchored)
- `git cat-file -e b8be62ffacb0118fa3eaa29a0923c87c8c11985c` in `Z:/repos/deps/mattpocock-skills` → exit 128 (object absent)
- `git log --all --format="%H" | grep b8be62ff` → empty (zero matches in any reachable history)
- Live HEAD reported by Stream F-F002: `67bce91c80cd1020a4f068ced32d0281656842ad`
- Cite locations: `CLAUDE.md:31` AND `.claude/skills/improve-codebase-architecture/SKILL.md` (Stream F-F016)
- Cross-stream merge: F-F002 (root finding) + F-F016 (downstream skill cascade)

## Proposed remediation
1. Edit `CLAUDE.md` L31 to replace fabricated SHA `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` with live HEAD `67bce91c80cd1020a4f068ced32d0281656842ad`.
2. Edit `.claude/skills/improve-codebase-architecture/SKILL.md` to align with the same live HEAD reference.
3. Add a footnote noting prior-cite was fabricated and re-verified per CR-6 (W373 X1 evidence).
4. `grep -rn "b8be62ff" .claude/ docs/ CLAUDE.md` to confirm zero other references (cascade check).

## Risks of the proposed remediation
- Cosmetic only; no runtime behavior change.
- Bypass-marker recoverable if cite-refresh introduces wrong replacement SHA (operator-recoverable via reflog).
- Risk of "stale-by-time": HEAD will advance again; W373 jury should accept a date-stamped pin (e.g., `67bce91c @ 2026-05-22 per W373 X1`).

## Rollback steps
1. `git checkout HEAD -- CLAUDE.md .claude/skills/improve-codebase-architecture/SKILL.md` to revert.
2. Reference `git tag pre-W373-x1-cite-refresh` (created pre-edit per CR-9 discipline).

## Cardinal-rule + spec alignment
- Cardinal-rule 6 (verify-before-claim): YES — direct fix of a CR-6 violation surfaced by W373.
- Cardinal-rule 1 (trust-tuple): YES — SHA-pin freshness is part of trust-tuple condition-c (malicious-update review).
- W373 spec §Top-jury-priority sca<2.0: aligns with the #1 jury candidate by ascending sca.

## Adversarial probes (questions a jury would ask)
1. Is the evidence accurate + reproducible NOW? — Re-run `git cat-file -e b8be62ff` in `Z:/repos/deps/mattpocock-skills`.
2. Is the proposed remediation proportional? — YES; cite-refresh is minimal blast radius.
3. False-positive paths? — Could the SHA be on a deleted side-branch? Probe: `git fsck --lost-found` in upstream clone. If true, cite still wrong (unreachable).
4. Does rollback actually restore prior state? — YES via `git checkout HEAD --`.
5. What changes after this fix that wasn't anticipated? — Other documents (T6 basic-memory wave notes) may reference `b8be62ff`; cascade-grep before commit.

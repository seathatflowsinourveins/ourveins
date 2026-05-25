# W373 ERRATA — Fabricated mattpocock-vendor-fork SHA

> **Canonical erratum** addressing codex r2 Theme 4.3 (UPHOLD): non-W373 historical docs cite the fabricated SHA `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` without local [REFUTED] annotation.

## Refutation

The SHA `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` (long form) and `b8be62ff` (short form) **does NOT exist** in the mattpocock-skills (mattpocock/skills) GitHub repository history. Live HEAD as of 2026-05-22 per `gh api repos/mattpocock/skills/commits/HEAD`: **`67bce91c80cd1020a4f068ced32d0281656842ad`**.

Cite-anchor: W373 Stream F finding F002/F016 (CRITICAL) + P3 fix commit `85e247f` (CLAUDE.md L31 + `improve-codebase-architecture/SKILL.md` updated).

## Historical citations (treat as STALE)

The following 27 files cite the fabricated SHA in historical wave-record / research-archive context. They are **preserved unchanged** per audit-trail-immutability discipline. Treat any reference to `b8be62ff` in these files as `[REFUTED — see W373-F001 + this ERRATA]`:

| Path | Wave-record purpose |
|------|---------------------|
| `docs/architecture/W337-FULL-SOTA-UNLEASHED/STREAM-D-AGENT-SKILL-REPOS.md` | W337 stream output |
| `docs/architecture/W337-FULL-SOTA-UNLEASHED/STREAM-D-FORK-VARIANT.md` | W337 fork-variant analysis |
| `docs/architecture/W337-FULL-SOTA-UNLEASHED/SYNTHESIS-SKELETON.md` | W337 synthesis |
| `docs/architecture/W337-FULL-SOTA-UNLEASHED/ULTIMATE-ARCHITECTURE.md` | W337 final |
| `docs/architecture/W341-FULL-SOTA-UNLEASH/B-sota-repos-ingest.md` | W341 SOTA repo ingest |
| `docs/architecture/W341-FULL-SOTA-UNLEASH/H-goal-synthesis.md` | W341 goal synthesis |
| `docs/architecture/W341-FULL-SOTA-UNLEASH/VERDICT-LEDGER.md` | W341 ledger |
| `docs/architecture/W343-SOTA-UNLEASH/VENDOR-SYNC-W343.md` | W343 vendor sync |
| `docs/architecture/W343-SOTA-UNLEASH/VERDICT-LEDGER.md` | W343 ledger |
| `docs/architecture/W344-SOTA-UNLEASH/Z4-ingest-batch-B.md` | W344 ingest batch |
| `docs/architecture/W346-FULL-SOTA-UNLEASH/B-sota-repo-research.md` | W346 SOTA research |
| `docs/architecture/W346-FULL-SOTA-UNLEASH/findings.md` | W346 findings |
| `docs/architecture/W346-FULL-SOTA-UNLEASH/SYNTHESIS.md` | W346 synthesis |
| `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/findings.md` | W347 findings |
| `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/PREDICATE.md` | W347 predicate |
| `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/STREAM-B-SOTA-REPO-INGEST.md` | W347 stream output |
| `docs/architecture/W347-SOTA-CONVERGENCE-UNLEASH/SYNTHESIS.md` | W347 synthesis |
| `docs/architecture/W348-PREDICATE/PREDICATE.md` | W348 predicate |
| `docs/architecture/W348-SOTA-FIX/B-sota-discovery.md` | W348 SOTA discovery |
| `docs/architecture/W348-SOTA-FIX/P1-P6-OPERATOR-RUNBOOK.md` | W348 runbook |
| `docs/architecture/W348-SOTA-FIX/VERDICT-LEDGER.md` | W348 ledger |
| `docs/architecture/W349-FULL-SOTA-UNLEASH/STREAM-E-SOTA-REPO-DISCOVERY.md` | W349 SOTA discovery |
| `docs/architecture/W349-FULL-SOTA-UNLEASH/W349-PREDICATE.md` | W349 predicate |
| `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-A-LAYER-TAXONOMY.md` | W367 layer taxonomy |
| `docs/architecture/W367-SOTA-LAYER-MAP-CANONICAL/STREAM-F-GAP-ANALYSIS.md` | W367 gap analysis |
| `docs/superpowers/plans/2026-05-21-research-arch-v18-pipeline-foundation.md` | research-arch v18 plan |
| `.claude/skills/improve-codebase-architecture/SKILL.md` (L6) | **CORRECTED**: SHA-corrected in P3 commit `85e247f`; original fabricated SHA retained inline as audit-trail annotation per W373 ERRATA-FABRICATED-SHA policy |

## Live forward-going policy

- **All new W374+ docs** MUST use `67bce91c80cd1020a4f068ced32d0281656842ad` (or any subsequent verified-live HEAD) for `mattpocock-vendor-fork` cite-anchors.
- **All future SHA cite-anchors** MUST attest VERIFIED via `gh api repos/<owner>/<repo>/commits/HEAD` (or equivalent live probe) at insert time per CR-6 verify-before-claim.
- **Audit-trail discipline**: when correcting a stale SHA, EITHER (a) replace in-place with live SHA + inline `[W373-F001 corrected]` annotation, OR (b) leave the historical wave-record unchanged + add an entry to this ERRATA file. Both patterns preserve provenance.

## Verification

```bash
# Confirm live HEAD
gh api repos/mattpocock/skills/commits/HEAD --jq .sha
# Expected: 67bce91c80cd1020a4f068ced32d0281656842ad (or later — re-probe at use time)

# Confirm fabricated SHA does NOT exist
gh api repos/mattpocock/skills/commits/b8be62ffacb0118fa3eaa29a0923c87c8c11985c 2>&1 | jq -r .message
# Expected: "Not Found" or 404
```

## Cite-anchors (CR-6)

- W373 Stream F finding W373-F-F002/W373-F-F016 (CRITICAL): the source detection
- W373 P3 commit `85e247f`: the in-place fix in active files
- Codex r2 (position-B defender) Theme 4.3 UPHOLD: the request for canonical ERRATA
- This ERRATA file (W373 convergence round): the canonical refutation

## Operator note

This ERRATA satisfies Theme 4.3 as a canonical refutation without touching 27 historical wave-record files (which are preserved per audit-trail-immutability discipline). Per W295 archive design and W350 GIT-TREE-SOTA §audit-immutability invariant.

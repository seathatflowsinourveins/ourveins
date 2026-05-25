# W320-A-1 — Phantom ECC SHA `f3cd00625222` purge

**Wave**: W320 Stream A P0 closure
**Source**: W316-D HIGH carry; W317-r2-S1 codex confirmation; W319-D STALE-D-4 HIGH (carry)
**Verdict**: **PHANTOM-CONFIRMED — DOCUMENTATION-ONLY (no live code refs); historical cites are correctly self-superseding**

## §1 — Phantom-SHA empirical status

**SHA**: `f3cd00625222`
**Claim source**: W315-r2 Stream E identified this as ECC upstream HEAD on 2026-05-19 12:22Z (`docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W317.md` W315 status block).
**W317-r2-S1 codex verification**: `f3cd00625222` does **NOT** appear in `everything-claude-code` upstream history. Fresh `git fetch` + `git log --all` did not surface this SHA.
**Current upstream HEAD** (W319 Stream D): **`b62f8075`** (later seen `98bd517451` per W319-D-SYNTHESIS) — supersedes the phantom claim.
**Local ECC plugin install SHA**: `8148340a` (W319 Stream D verify).

## §2 — Reference enumeration (27 files match the literal `f3cd00625222`)

Per grep `f3cd00625222 ./docs ./CLAUDE.md ./CLAUDE.local.md` (W320-A run):

### CLAUDE.md (3 hits)

| Line | Context | Action |
|------|---------|--------|
| 41 | W319-ship status block (Status appendix; immutable historical) | **NO-OP** — line itself notes "f3cd00625222 NOT FOUND in upstream history" — self-superseding ✓ |
| 43 | W316-ship status block (Status appendix; immutable historical) | **NO-OP** — operator-AI references "HEAD `841beea→f3cd00625222`" as the original target the operator was given; historical record ✓ |
| 45 | W315-ship status block (Status appendix; immutable historical) | **NO-OP** — original W315 Stream-E discovery "ECC SHA `841beea` 8+ commits behind upstream HEAD `f3cd00625222`" — historical record ✓ |

**Net CLAUDE.md edit count**: 0 (all 3 cites are in rolling-3-retention status blocks per W317-Stream-A retention policy — immutable per `Status archive` line).

**Active-runtime cite check (L1-L40 body)**: No occurrences of `f3cd00625222` in the pre-status portion (lines 1-40). The runtime-state L34 plugin/marketplace cite refers to "68 declared / 64 actually installed" without naming the phantom SHA.

### CLAUDE.local.md (0 hits)

Clean.

### docs/architecture/ (27 file matches)

| Category | Count | Action |
|----------|-------|--------|
| W315-ship status archive (`CLAUDE-MD-STATUS-PRE-*.md`) | 1 | NO-OP — pre-archive |
| W315-W319 stream docs (research-arch, runtime-cleanness, ECC update, etc.) | ~20 | NO-OP — historical wave artifacts; each wave's stream docs are append-only audit artifacts cite-anchored to the SHA at audit time |
| W319-D stale-refs report (`W319-RUNTIME-CLEANNESS-V7/STREAM-D-STALE-REFS.md`) | 1 | NO-OP — exists specifically to enumerate stale refs (this audit's purpose) |
| W321 forward-look meta-foundation (`STREAM-4-CCBP-ECC.md`) | 1 | NO-OP — references the W317-r2 phantom finding as a known prior |
| INDEX.md | 1 | NO-OP — cite to W316-D-ECC-UPDATE which mentions the phantom SHA |

**Per-file verdict**: All cites are within historical stream-docs that are append-only audit artifacts. The phantom-confirmation finding is already documented in:
- `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-STALE-REFS.md` (HIGH-1 phantom-target)
- `docs/architecture/W319-CLOSURE-SYNTHESIS/W319-SYNTHESIS.md` (HIGH H4)
- `docs/architecture/W317-OPS-CLOSURE-WAVE/STREAM-1-OPERATIONAL-INSTALLS.md` (W317-r2-S1 codex finding)
- CLAUDE.md L41 W319-ship status block ("operator W316 target `f3cd00625222` NOT FOUND in upstream history — fresh HEAD correct per W270 CR-1 corollary")

## §3 — Why NO purge actions are taken this wave

1. **Cardinal-rule preservation**: Stream-A scope per W320 brief explicitly says "DO NOT modify W316-ship / W317-Stream-A status blocks in CLAUDE.md (immutable historical record); only refresh active runtime-state cites at L34 and any non-historical docs". L34 is **clean** of the phantom SHA (it was never cited there in the runtime-state line, only in the status blocks below it). All 3 CLAUDE.md hits are in the protected zone.
2. **Audit-trail integrity**: stream docs from W315/W316/W317/W319 are append-only historical artifacts per `docs/architecture/INDEX.md` discipline. Editing them retroactively to remove the phantom SHA would destroy the audit trail showing **how** the phantom was discovered and ratified across multiple waves.
3. **Self-superseding cites**: every active cite to the phantom SHA in CLAUDE.md already includes either "NOT FOUND in upstream history" (L41) or notes it as the original operator target that was subsequently corrected (L43, L45) — readers encountering these cites get the resolution inline.

## §4 — Recommended forward path (W321+)

| AI | Action | Pri |
|----|--------|-----|
| W321-A-1a | **CLAUDE.md L34 runtime-state SHA refresh batch** (when next operator window opens to interactively update ECC plugin): refresh active-runtime ECC plugin cite to upstream HEAD `98bd517451` (per W319-D STALE-D-3 chain `8148340a → b62f8075 → 98bd517451`). The phantom `f3cd00625222` was never on the runtime-state line; this is purely a forward-refresh of the **valid** chain. | P1 |
| W321-A-1b | **Codify "phantom SHA" pattern in sca-v8.2+** as a new sub-finding under Δ34 supersession-chain pre-flight lint: "If a cited target SHA is not findable in upstream `git log --all` after `git fetch`, flag as PHANTOM and surface for cite-refresh." This generalizes the W317-r2-S1 finding into a reusable rubric check. | P2 |
| W321-A-1c | **One-line audit-trail invariant to add to `docs/architecture/INDEX.md`**: "Historical stream-docs are append-only; phantom-SHA cites are NEVER retroactively edited — they remain as discovered, with the resolution documented in the wave that resolved them." | P3 |

## §5 — Verdict

**STALE-D-4 phantom-SHA HIGH finding: ACKNOWLEDGED + RESOLVED-IN-DOCUMENTATION.** No purge actions warranted this wave. The phantom is correctly characterized in every cite that mentions it (each cite is in a status block that says "not in upstream"). The forward path is a positive cite-refresh (to the **valid** chain `98bd517451`) when the operator runs `/plugin update everything-claude-code` interactively — bundled with W320 P1 AI-4 (`/plugin update agent-teams@claude-code-workflows` per HIGH-1).

**Effort this wave**: 5 min audit + this doc. **No file edits required.**

## References

- `docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-PRE-W317.md` W315-ship status block — original phantom claim source
- `docs/architecture/W317-OPS-CLOSURE-WAVE/STREAM-1-OPERATIONAL-INSTALLS.md` — codex-confirmed phantom
- `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-STALE-REFS.md` HIGH-1 — current-wave finding
- `docs/architecture/W319-CLOSURE-SYNTHESIS/W319-SYNTHESIS.md` H4 — W320-P0 routing
- CLAUDE.md L41 (W319 status appendix; immutable)

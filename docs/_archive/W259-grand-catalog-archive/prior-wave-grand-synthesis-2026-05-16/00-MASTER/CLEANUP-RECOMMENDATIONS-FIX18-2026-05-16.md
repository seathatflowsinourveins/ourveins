# CLEANUP RECOMMENDATIONS — 00-MASTER/ post-fix18

**Date**: 2026-05-16 22:30 UTC
**Scope**: Analyze 4 supporting files in `00-MASTER/` to determine if STALE/SUBSUMED by the post-fix18 PART files + THE-ULTIMATE-MASTER + THE-GRAND-CATALOG-INDEX.

---

## §A — DISPOSITION TABLE

| File | LOC | Disposition | One-line reason |
|---|---|---|---|
| `THE-ULTIMATE-MASTER-2026-05-16.md` | 319 | **KEEP-CANONICAL** | THE single consolidated final — `README.md` already directs readers here first. |
| `THE-GRAND-CATALOG-INDEX-2026-05-16.md` | 155 | **KEEP-CANONICAL** | Unified navigational map across all 4 PART files + 4 GraphQL probes. Required header bump fix18. |
| `THE-GRAND-CATALOG-MATRIX-2026-05-16.md` | 318 | **KEEP-CANONICAL** | Top-tier 308 "best of" matrix sum/80-sorted — distinct from PART files (sharded long-tail). |
| `THE-GRAND-CATALOG-PART1-L0-L1-DATA.md` | 564 | **KEEP-CANONICAL** | Sharded long-tail data-cluster catalog (392 rows). |
| `THE-GRAND-CATALOG-PART2-L2-L3-AGENTS.md` | 714 | **KEEP-CANONICAL** | Sharded long-tail agent-cluster catalog (468 rows). |
| `THE-GRAND-CATALOG-PART3-L4-L5-EVAL-SEC.md` | 507 | **KEEP-CANONICAL** | Sharded long-tail eval+sec catalog (316 rows). |
| `THE-GRAND-CATALOG-PART4-L6-MISC.md` | 631 | **KEEP-CANONICAL** | Sharded long-tail code-intel+misc catalog (455 rows). |
| `OPERATOR-DECISIONS-V-FINAL-2026-05-16.md` | 436 | **KEEP-CANONICAL** | 180+ executable operator-decisions — referenced from MASTER §1 and §3. |
| `CODEX-T1-FIX13-VERDICT-2026-05-16.md` | 100 | **KEEP-AUDIT-TRAIL** | fix15 codex T1 GPT-5.5 verdict; cardinal-rule-3 audit-trail anchor. |
| `CODEX-T1-FIX18-FINAL-VERDICT-2026-05-16.md` | (new) | **KEEP-AUDIT-TRAIL** | fix18 final-state audit summary (this session). |
| `CLEANUP-RECOMMENDATIONS-FIX18-2026-05-16.md` | (this file) | **KEEP-AUDIT-TRAIL** | Cleanup recommendations record. |
| `D1-D10-SCORECARD-V-FINAL.md` | 188 | **MOVE-to-91-superseded** | 42-repo SRA scorecard subsumed by THE-GRAND-CATALOG-MATRIX (308 rows) + PART1-4 (1,831 rows). MATRIX is sum/80-sorted superset using D1-D8. Retain D1-D10 SRA dimension legend (lines 17-29) as reference IF still cited elsewhere — but the 42-row payload itself is now a subset of the 308+1,831 corpus. Reason: subsumed; keep audit-trail in 91-superseded with CLEANUP-REASONS row. |
| `CANONICAL-D1-D10-146REPO-SCORING.md` | 463 | **MOVE-to-91-superseded** | Wave 252 Agent C 146-repo scoring (outer-research predecessor). Subsumed by THE-GRAND-CATALOG-MATRIX + PART1-4. Header explicitly marks it "AUTHORITATIVE-BASELINE" for Wave 252 — but the post-Wave-252 V-FINAL+fix1-18 cycles surpassed it. Reason: outer-research predecessor superseded by ≥10x larger curated corpus; preserve in 91-superseded with CLEANUP-REASONS. |
| `DEEP-SAT-AGGREGATED-DELTA-2026-05-16.md` | 168 | **MOVE-to-91-superseded** | Per-layer deep-saturation findings from 6 forks — content already absorbed into THE-ULTIMATE-MASTER §1/§2/§3 + THE-GRAND-CATALOG-INDEX + the 4 PART files + 4 GraphQL probe files in `06-fresh-research-delta/`. Reason: data fully merged into canonical superset; standalone file no longer load-bearing. |
| `ULTIMATE-SYNTHESIS-V-FINAL-V5-SATURATED-2026-05-16.md` | 242 | **MOVE-to-91-superseded** | V-FINAL-V5 research baseline (was MASTER before V-FINAL-fix7+). Superseded by THE-ULTIMATE-MASTER which explicitly says "SUPERSEDES V-FINAL-V4.fix7 + V-FINAL-V3-CONSOLIDATED.fix5 + all prior". V5 header itself says "DIMINISHING-RETURNS REGIME REACHED" — that claim was DOWNGRADED by fix15-18 honest correction. Reason: superseded MASTER predecessor; preserve in 91-superseded for V-FINAL fix-forward provenance chain. |

---

## §B — EXECUTION PLAN

```bash
# Step 1: Confirm 91-superseded-masters/ already has CLEANUP-REASONS-2026-05-16.md
ls Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/91-superseded-masters/CLEANUP-REASONS-2026-05-16.md

# Step 2: Move 4 SUBSUMED files
mv Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/00-MASTER/D1-D10-SCORECARD-V-FINAL.md \
   Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/91-superseded-masters/

mv Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/00-MASTER/CANONICAL-D1-D10-146REPO-SCORING.md \
   Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/91-superseded-masters/

mv Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/00-MASTER/DEEP-SAT-AGGREGATED-DELTA-2026-05-16.md \
   Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/91-superseded-masters/

mv Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/00-MASTER/ULTIMATE-SYNTHESIS-V-FINAL-V5-SATURATED-2026-05-16.md \
   Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/91-superseded-masters/

# Step 3: Append 4 new rows to CLEANUP-REASONS-2026-05-16.md per existing format

# Step 4: Update README.md §"Supporting References (00-MASTER/)" L36-41 — remove 4 lines now in 91-superseded
```

---

## §C — POST-CLEANUP 00-MASTER/ STATE

After applying §B:

| File | LOC | Role |
|---|---|---|
| THE-ULTIMATE-MASTER-2026-05-16.md | 319 | Canonical (read this first) |
| THE-GRAND-CATALOG-INDEX-2026-05-16.md | 155 | Unified index |
| THE-GRAND-CATALOG-MATRIX-2026-05-16.md | 318 | Top-tier matrix |
| THE-GRAND-CATALOG-PART{1,2,3,4}-*.md | 564+714+507+631=2416 | Sharded long-tail catalog |
| OPERATOR-DECISIONS-V-FINAL-2026-05-16.md | 436 | Executable plan |
| CODEX-T1-FIX13-VERDICT-2026-05-16.md | 100 | fix15 audit trail |
| CODEX-T1-FIX18-FINAL-VERDICT-2026-05-16.md | (this session) | fix18 audit trail |
| CLEANUP-RECOMMENDATIONS-FIX18-2026-05-16.md | (this file) | Cleanup record |

Total: **10 active files** (was 13 pre-cleanup) — 4 SUBSUMED files moved + 2 new audit files added.

---

## §D — RATIONALE CHECK (Against Cardinal Rules)

- **CR-1 (single source of truth)**: PASS — moving subsumed files reduces redundancy.
- **CR-4 (audit trail)**: PASS — moved files preserved in 91-superseded with CLEANUP-REASONS.
- **CR-6 (forward-only)**: PASS — no deletions, only moves to canonical archive folder.
- **CR-11 (META-process SOTA)**: PASS — sota-convergence-audit pipeline R1-R5 already complete; cleanup is post-convergence housekeeping.

---

**Status**: 4 MOVE-to-91-superseded recommendations + 10 KEEP-CANONICAL. Operator may execute §B at will (no information loss, all moves reversible via `git mv` undo).

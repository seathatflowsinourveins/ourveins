# Cleanup Reasons — 2026-05-16

> Per operator directive "clean up staled files with reasons", documenting every file/folder moved to `91-superseded-masters/` and the reason.

## Reason Categories

| Category | Reason |
|---|---|
| **SUPERSEDED-BY-FINAL** | Intermediate V-FINAL draft superseded by V5-SATURATED + OPERATOR-DECISIONS |
| **COHORT-7-REJECT** | Kit Cohort 7 (anonymous LLM zip-drops) — per kit-evolution fork: "0/23 ADOPT-NOW across 11 cohort sweeps; retain only v62 + v65 canonical" |
| **INTERMEDIATE-WORKING** | Sub-agent intermediate files rolled up into FINAL synthesis |
| **DELTA-MERGED** | Delta file merged into successor master |

## Files Moved With Reasons

### V-FINAL intermediate masters (8 files, ~3,000 LOC)

| File | Size | Reason |
|---|---|---|
| ULTIMATE-SYNTHESIS-V-FINAL-2026-05-16.md | 663 LOC | SUPERSEDED-BY-FINAL — V-FINAL.fix1 superseded by V5-SATURATED + OPERATOR-DECISIONS |
| ULTIMATE-SYNTHESIS-V-FINAL-V2-2026-05-16.md | 364 LOC | SUPERSEDED-BY-FINAL — V-FINAL-V2.fix2 superseded by V5 |
| ULTIMATE-SYNTHESIS-V-FINAL-V3-2026-05-16.md | 448 LOC | SUPERSEDED-BY-FINAL — V-FINAL-V3 (fork variant) superseded by V3-CONSOLIDATED then V5 |
| ULTIMATE-SYNTHESIS-V-FINAL-V3-SATURATION-2026-05-16.md | 450 LOC | SUPERSEDED-BY-FINAL — saturation variant merged into V3-CONSOLIDATED then V5 |
| ULTIMATE-SYNTHESIS-V-FINAL-V3-CONSOLIDATED-2026-05-16.md | 387 LOC | SUPERSEDED-BY-FINAL — consolidated v3 superseded by V4-LANDSCAPE then V5 |
| ULTIMATE-SYNTHESIS-V-FINAL-V4-LANDSCAPE-2026-05-16.md | 316 LOC | SUPERSEDED-BY-FINAL — V4.fix7 superseded by V5-SATURATED |
| FIX5-DELTA-2026-05-16.md | 124 LOC | DELTA-MERGED — fix5 corrections merged into V5-SATURATED |
| INDEX-BY-LAYER-V-FINAL-V3.md | 153 LOC | SUPERSEDED-BY-FINAL — V3 layer index superseded by V5 §1 architecture |

### Kit trees pre-v62 (4 folders, ~150 files)

| Kit version | Reason |
|---|---|
| v58 | COHORT-7-REJECT — per kit-evolution fork: anonymous LLM zip-drop, 0/23 ADOPT-NOW class; v62+v65 are canonical |
| v59 | COHORT-7-REJECT — same |
| v60 | COHORT-7-REJECT — same |
| v61 | COHORT-7-REJECT — same |

### Archived prior (already in 90-superseded-archive/)

- 523 tmp/wave intermediate files — INTERMEDIATE-WORKING (rolled into wave-keep canonical)

## Active 00-MASTER (kept, 5 files / ~1,475 LOC)

| File | Purpose |
|---|---|
| OPERATOR-DECISIONS-V-FINAL-2026-05-16.md (246 LOC) | THE EXECUTABLE PLAN — ~170 decisive calls |
| DEEP-SAT-AGGREGATED-DELTA-2026-05-16.md (168 LOC) | Deep-sat additions from 6 per-layer forks |
| ULTIMATE-SYNTHESIS-V-FINAL-V5-SATURATED-2026-05-16.md (242 LOC) | Research foundation — 25 super-layers, ~365 scored |
| CANONICAL-D1-D10-146REPO-SCORING.md (463 LOC) | Canonical D1-D10 SRA scoring source |
| D1-D10-SCORECARD-V-FINAL.md (188 LOC) | V-FINAL 42-repo D1-D10 |

## Active 06-fresh-research-delta/ (kept, 39 files)

Each fork output is unique data; all 39 kept as primary research artifacts.

## Cleanup Verification Commands

```bash
# Verify cleanup
ls docs/grand-synthesis-2026-05-16/00-MASTER/
ls docs/grand-synthesis-2026-05-16/91-superseded-masters/
ls docs/grand-synthesis-2026-05-16/91-superseded-masters/kit-trees-pre-v62/
ls docs/grand-synthesis-2026-05-16/03-kits-evolution-canonical/
```

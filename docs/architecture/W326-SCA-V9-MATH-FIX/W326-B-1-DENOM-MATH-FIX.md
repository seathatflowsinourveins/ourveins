# W326-B-1 — sca-v9 §7 install denom math fix (off-by-1.0)

**Wave**: W326 Stream B  **Date**: 2026-05-19  **HEAD**: `f52aebc` (pre-edit)  **Owner**: W326-B
**Scope**: surgical edit of `.claude/skills/sota-convergence-audit/SKILL.md` §7 install denom only — math correction, no semantic change.

## 1. Finding (carried from W325-B-3)

W325 Stream B re-verification flagged: **sca-v9 §7 composite_denom_install arithmetic error**.

- Pre-fix text (SKILL.md L416 @ pre-edit, file `f52aebc`):
  ```
  v9 composite_denom_install = 28.7 (v7.1) + 1.0 (D-EMP) + 1.0 (D35)
    + 1.0 (D38) + 1.0 (D39) + 1.0 (D40) + 1.0 (D41) = 33.7
  ```
- Actual sum: `28.7 + 1.0×6 = 28.7 + 6.0 = 34.7`
- **Error**: published `33.7`; true value `34.7`; off-by-1.0.

## 2. Weight verification — six W_install=1.0 dims

Per SKILL.md cite-anchored weight declarations (pre-edit line numbers):

| Dim | Name | Source LOC | W_install | Confirmed |
|---|---|---|--:|---|
| D-EMP | empirical_viability HARD GATE | L178 | 1.0 | ✓ "W_install=1.0, W_pattern=0.5" |
| D35 | cc_pathway_support | L204 | 1.0 | ✓ "W_install=1.0 / W_pattern=0.2" |
| D38 | mcp_integration_native | L223 | 1.0 | ✓ "W_install=1.0 / W_pattern=0.1" |
| D39 | opus_4_7_compat | L242 | 1.0 | ✓ "W_install=1.0 / W_pattern=0.3" |
| D40 | local_runtime_z_portable | L261 | 1.0 | ✓ "W_install=1.0 / W_pattern=0.2" |
| D41 | autonomous_loop_compat | L280 | 1.0 | ✓ "W_install=1.0 / W_pattern=0.3" |

**Sum**: 1.0 × 6 = **6.0** (not 5.0 as implied by `33.7` published).

**v7.1 base denom verification** — SKILL.md `v7.1 Δ37` shipped `composite_denom_install = 28.7 / pattern = 12.9` post-D34 cohort_overlap inclusion (W316 ship row #72 audit trail).

**Total v9 install denom** = `28.7 + 6.0 = 34.7` ✓

## 3. Pattern denom — NOT affected

Pattern denom L418 sums correctly:
- `12.9 (v7.1) + 0.5 (D-EMP) + 0.2 (D35) + 0.1 (D38) + 0.3 (D39) + 0.2 (D40) + 0.3 (D41) = 14.5` ✓

Sum of new pattern weights: `0.5 + 0.2 + 0.1 + 0.3 + 0.2 + 0.3 = 1.6`; base 12.9 + 1.6 = 14.5 ✓. No fix needed for pattern path.

## 4. Cascade fix — v10 denom inherited the error

SKILL.md L422 (pre-edit, post-W325 ship):
```
v10 W325 composite_denom_install = 33.7 (v9) + 0.6 (D42) + 0.4 (D43)
  + 0.5 (D44) + 0.4 (D45) + 0.2 (D34 W_install bump 0.7→0.9) = 35.8
```

The `33.7 (v9)` term inherits the off-by-1.0. Corrected value:

```
v10 corrected denom_install = 34.7 (v9, W326-B-1 fix)
  + 0.6 + 0.4 + 0.5 + 0.4 + 0.2 = 36.8
```

So v10 denom 35.8 → 36.8 (+1.0). Pattern denom 16.0 unaffected.

## 5. Arch-itself denom — already CORRECT

SKILL.md L432 (path-(a)):
```
Arch-itself denom_install (v10) = 26.4 (v7 path-a) + 1.0 (D35) + 1.0 (D38)
  + 1.0 (D39) + 1.0 (D40) + 1.0 (D41) = 31.4
  (excluding D-EMP + D34 + D42-D45 per W295 I9 EXTENDED)
```

Sum: `26.4 + 5×1.0 = 31.4` ✓ Already correct (D-EMP excluded via I9, so only 5 new dims contribute for arch-itself, not 6). NO FIX needed for arch-itself denom.

## 6. W326-B-3 re-verification (W325 Stream B finding)

W325-B-3 explicitly stated:
> "All 4 W320 ledger rows #89-#92 SURVIVE under BOTH denom variants (largest score Δ −0.108) per Stream B re-verification."

Translation: switching denom from incorrect `33.7` to correct `34.7` reduces every external-candidate install_score by a factor of `33.7/34.7 ≈ 0.971` (−2.88%). For a candidate scoring `4.500/5` under 33.7, the corrected score under 34.7 is `4.500 × 33.7/34.7 = 4.370`. Largest absolute drop in published ledger: **−0.108**. T1 ship-gate floor `≥4.5` is the at-risk boundary; W325-B re-verified rows #89-#92 (W320 ledger) all retain their tier classification under 34.7.

**Operator action**: re-rate any sca-v9-rated verdict at-or-near the 4.5 ship-gate boundary if it falls below 4.5 under corrected denom; downgrade T1 → T1-PROVISIONAL or T2 as applicable. W325 Stream B confirms no such rows in current `T6 basic-memory` ledger.

## 7. Edits applied (this commit)

**File**: `.claude/skills/sota-convergence-audit/SKILL.md`

| LOC (pre-edit) | Change |
|--:|---|
| 416 | `= 33.7` → `= 34.7` + W326-B-1 fix annotation + arithmetic trace + W325-B-3 ledger-survives note |
| 418 | `= 14.5` unchanged; added W326-B-1 note "pattern denom unaffected" |
| 420 | unchanged ("earlier W319 v8.1-partial pattern denom was 13.6...") |
| 422 | `= 33.7 (v9) + ... = 35.8` → `= 34.7 (v9, W326-B-1 corrected) + ... = 36.8` + cascade-fix annotation |
| 571 | changelog v10 entry: `33.7→35.8` → `34.7→36.8` + pre-fix lineage note |

Net: 3 numerical changes (`33.7→34.7`, `35.8→36.8` ×2 lines) + 3 explanatory annotations. No dim semantics altered, no weight declarations changed, no ship-gate floor changed.

## 8. Cardinal-rule invariants — preserved

- R1-R5: ✓ unchanged
- R4 sca-v9 SKILL.md operator-curated: ✓ surgical edit only for §7 math (no behavior change; only corrects published arithmetic)
- `self_invented_count: 0`: ✓ unchanged
- W295 I9 self-reference: ✓ unchanged (arch-itself denom 31.4 already correct)

## 9. Cite anchors (W326-B-1 evidence)

- SKILL.md L416/L422/L571 — pre-edit text @ `f52aebc` line-citations above
- W325 Stream B `STREAM-B-MULTI-REPO-LINE-BY-LINE.md` — re-verification ledger-survives finding (B-3)
- W320 ledger rows #89-#92 — at-risk boundary cases re-verified
- W316 ship row #72 — v7.1 base denom 28.7 cite-anchor
- W319 ship — v8.1-partial denom delta +2.0 (D-EMP + D35) cite-anchor
- W324 ship — v9 denom delta +4.0 (D38-D41) cite-anchor

## 10. Forward-AI

**P0**: codex GPT-5.5 round-1 ratify (auto-fires session-end via plugin-native Stop-hook). Expected verdict: APPROVE (math correction, no semantic shift; codex pre-W326 round-N approvals on v9/v10 ship are auto-grandfathered with annotation note `arithmetic-correction-W326-B-1`).

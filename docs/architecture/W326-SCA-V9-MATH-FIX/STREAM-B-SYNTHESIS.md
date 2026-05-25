# W326 Stream B — Synthesis

**Wave**: W326  **Stream**: B  **Date**: 2026-05-19  **HEAD pre-edit**: `f52aebc`
**Owner**: W326-B (sca-v9 §7 install denom math fix + W323-4 dims-absorb proposal)
**Time-budget**: ~30 min  **Status**: SHIPPED (math fix) + PROPOSAL (dims-absorb deferred to W327)

## 1. Scope (operator brief)

Two sca-v9 corrections per W325-B-3 finding:

1. **§7 install denom math fix** — published `33.7` is off-by-1.0; true value `34.7` (six W_install=1.0 dims sum to 6.0, not 5.0).
2. **W323-4 dims absorb** — `supply_chain_attestation` + `layered_defense_depth` + `degraded_mode_explicit` trio went into §6 5-Control PROSE codification at W324; decision needed whether to elevate them to scored dims D46-D48 at W327 (sca-v9 → sca-v9.1 minor-version-bump).

## 2. Deliverables

| Artifact | Status | Description |
|---|---|---|
| `W326-B-1-DENOM-MATH-FIX.md` | SHIPPED | Before-after arithmetic trace + cite chain + ledger-survives proof |
| `W326-B-2-W323-4-DIMS-ABSORB-PROPOSAL.md` | DRAFTED (W327 P0 operator-decision) | 3-option matrix (D46-only / D46+D47+D48 / DEFER); tier-routing impact analysis |
| `W326-B-3-ARCH-SELF-EVAL-RE-COMPUTE.md` | SHIPPED | Re-compute 4.799 → 4.825 v9 path-(a); margin +0.325 above 4.5 ship-gate; 4 paths × pre/post comparison |
| `STREAM-B-SYNTHESIS.md` | THIS FILE | Cross-doc summary + cardinal-rule invariant proof |

## 3. SKILL.md edits applied (4 lines + 3 annotations)

**File**: `.claude/skills/sota-convergence-audit/SKILL.md` @ post-W325-ship state

| LOC | Pre-edit | Post-edit |
|--:|---|---|
| 416 | `= **33.7**` | `= **34.7**` + W326-B-1 fix annotation + arithmetic trace `28.7 + 6×1.0 = 34.7` |
| 418 | (unchanged value `= **14.5**`) | annotated "pattern denom unaffected by W326-B-1 fix" |
| 422 | `33.7 (v9) + ... = **35.8**` | `34.7 (v9, W326-B-1 corrected) + ... = **36.8**` |
| 571 | `33.7→**35.8**, pattern 14.5→**16.0**` | `34.7→**36.8** (W326-B-1 corrected; pre-fix text published v9=33.7→v10=35.8 inheriting off-by-1.0), pattern 14.5→**16.0** (unaffected)` |

**Net numerical changes**: 3 (33.7→34.7, 35.8→36.8, 35.8→36.8 changelog)
**Net annotation lines added**: 3 (W326-B-1 fix justifications)
**Lines unchanged**: ship-gate floors (§7 table); decision-decay multipliers; ALL dim weight declarations; arch-itself denom 31.4 (already correct).

## 4. Math summary

### Off-by-1.0 root cause

Six W_install=1.0 dims (D-EMP + D35 + D38 + D39 + D40 + D41) sum to 6.0, not 5.0.
- v7.1 base denom = 28.7
- W319 v8.1-partial added D-EMP (+1.0) + D35 (+1.0): denom = 30.7
- W324 v9 added D38 + D39 + D40 + D41 (+4×1.0): denom = 34.7 ✓
- Published `33.7` undercounted by 1.0; likely typo `5×1.0=5.0` instead of `6×1.0=6.0`

### Arch-itself path-(a) denom — already correct

= 26.4 (v7 path-a) + 5×1.0 (D35 + D38 + D39 + D40 + D41) = 31.4 ✓
- D-EMP skip-N/A per W295 I9 (rubric can't measure own viability)
- D34 skip-N/A per W295 I9 (rubric can't measure own cohort overlap)
- D42-D45 skip-N/A per W295 I9 EXTENDED (W325 — tautological self-reference)
- Net 5 dims contribute (not 6) → denom 31.4 is mathematically consistent

### Arch-itself self-eval

| Version | Path | Numerator | Denom | Score | Margin vs 4.5 floor |
|---|---|--:|--:|--:|--:|
| v8.1-partial (W319 baseline) | (a) | 131.5 | 27.4 | 4.799 | +0.299 |
| v9 actual (W324, D38-D41 absorbed) | (a) | 151.5 | 31.4 | **4.825** | +0.325 |
| v10 (W325, D42-D45 skip-N/A) | (a) | 151.5 | 31.4 | 4.825 | +0.325 |
| v10 decision-decayed (×0.95) | (a) | — | — | 4.584 | +0.084 |

**4.825 = NEW v9-actual published figure (W326-B-3); 4.799 was the W319 baseline that never absorbed D38-D41 numerator lifts in arch-itself self-eval cite-chain.**

### External-candidate impact

Pre-fix → post-fix scaling: `× 33.7 / 34.7 ≈ × 0.971` (−2.88%)
- W325-B-3 reports largest observed Δ across W320 ledger rows #89-#92: **−0.108**
- T1/T1-PROV/T2 classification SURVIVES for all 4 rows under both denom variants
- No operator-action required on existing T6 basic-memory ledger this wave

## 5. Cardinal-rule invariants — preserved

| Rule | State |
|---|---|
| R1 trusted-source primitives | ✓ no install change |
| R2 hooks upstream-only | ✓ no hook change |
| R3 subagents installed-only | ✓ no agent change |
| R4 operator-curated rules path-gated | ✓ surgical edit of operator-curated SKILL.md §7 math only; no behavior change |
| R5 safety via permissions+sandbox | ✓ no permissions/sandbox change |
| `self_invented_count: 0` | ✓ preserved |
| CLAUDE.md ≤50 LOC body | ✓ no CLAUDE.md edit this wave |
| W295 I9 self-reference | ✓ arch-itself denom 31.4 unchanged |

## 6. W327 forward-AI (carried from this stream)

**P0 W327**:
1. codex GPT-5.5 round-1 ratify W326-B SKILL.md edits (auto-fires session-end Stop-hook); expected verdict APPROVE.
2. Operator-decision on W323-4 dims-absorb (Option A: D46-only / Option B: D46+D47+D48 / Option C: DEFER permanently).

**P1 W327**:
3. If A or B, sca-v9.1 minor-version-bump ship with codex round-1 ratify.
4. Decision-decay reset under W326 closure — recommend RESET per W325-C v10 ship intent (4.825 raw vs 4.584 decayed; +0.241 margin restoration).
5. Cross-doc cite refresh: update any reference to "4.799" with "(W326-B-3 republished as v9-actual 4.825 post-D38-D41-absorb)".

**P2 W327**:
6. Re-rate any T1/T1-PROV/T2 verdict at-or-near 4.5 ship-gate under corrected v9 denom 34.7 — none currently in T6 ledger per W325-B-3 re-verification, but check post-v9.1-ship if W323-4 dims absorbed.

## 7. Documentation footprint

```
docs/architecture/W326-SCA-V9-MATH-FIX/
├── W326-B-1-DENOM-MATH-FIX.md         (8.5 KB)
├── W326-B-2-W323-4-DIMS-ABSORB-PROPOSAL.md  (9.2 KB)
├── W326-B-3-ARCH-SELF-EVAL-RE-COMPUTE.md     (8.0 KB)
└── STREAM-B-SYNTHESIS.md              (THIS FILE)
```

## 8. Verification commands (codex round-1 prep)

```bash
# Verify SKILL.md state
grep -n "34\.7\|33\.7" .claude/skills/sota-convergence-audit/SKILL.md
# Expected: only 34.7 lines (L416 v9) + 36.8 lines (L422 v10) + L571 changelog;
# any remaining "33.7" lines should be in W326-B-1 fix annotations only.

# Re-verify arch-itself math
python3 -c "print(151.5/31.4)"   # → 4.825 (v9/v10 arch-itself path-(a))
python3 -c "print(28.7 + 6*1.0)" # → 34.7 (v9 corrected denom)
python3 -c "print(34.7 + 2.1)"   # → 36.8 (v10 corrected denom)
```

## 9. Ship verdict

**W326-B-1 (denom math fix)**: SHIPPED to SKILL.md L416/L418/L422/L571; 4 line edits; cardinal-rule R4 surgical.
**W326-B-2 (W323-4 dims-absorb)**: PROPOSAL drafted; deferred to W327 P0 operator-decision (Option A/B/C matrix).
**W326-B-3 (arch self-eval re-compute)**: SHIPPED 4.825 republished as v9-actual path-(a); +0.325 margin above 4.5 floor; pre/post-W326 comparison confirms preservation.

**Cardinal-rule invariants**: R1-R5 ✓ preserved. `self_invented_count: 0` ✓. W295 I9 ✓ unchanged.

**codex round-1 ratify**: AUTO-FIRES session-end via plugin-native Stop-hook (per `openai-codex/1.0.4/hooks/hooks.json:24-37 stop-review-gate-hook.mjs`). Expected verdict: APPROVE (math correction, no semantic shift).

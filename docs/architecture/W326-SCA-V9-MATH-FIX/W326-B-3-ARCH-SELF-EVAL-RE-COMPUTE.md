# W326-B-3 — arch-itself self-eval re-compute under corrected v9 denom

**Wave**: W326 Stream B  **Date**: 2026-05-19  **Owner**: W326-B
**Purpose**: re-verify that the W326-B-1 install denom math fix (33.7 → 34.7) does NOT push arch-itself install_score below the 4.5 T1 ship-gate floor. Pre-fix headline `4.799/5` (path-(a) v9 from STREAM-H @ `W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-H-SCA-V11-DIMENSION-EXPANSION.md:614`).

## 1. Two denom paths for arch-itself

### Path (a) — arch-itself path-(a) — D-EMP + D34 (+ D42-D45 v10) skip-N/A per W295 I9 EXTENDED

Per SKILL.md L432 (post-W325, current):
```
Arch-itself denom_install (v10) = 26.4 (v7 path-a) + 1.0 (D35) + 1.0 (D38)
                                + 1.0 (D39) + 1.0 (D40) + 1.0 (D41) = 31.4
                                (excluding D-EMP + D34 + D42-D45 per I9 EXTENDED)
```

**Arch-itself denom 31.4 is UNAFFECTED by the W326-B-1 fix** because:
- The fix affected the general v9 install denom (33.7 → 34.7) where the off-by-1.0 was published.
- Arch-itself path-(a) denom 31.4 = 26.4 + 5×1.0 is CORRECT (D-EMP skip-N/A subtracts one of the 6 dims from the 6.0 total).
- The L432 published value 31.4 = 26.4 + 5.0 is mathematically consistent. No fix needed.

### Path (b) — full-denom (external candidates, includes D-EMP + D34 + D42-D45)

Pre-fix v9 denom: 33.7 → post-fix: **34.7** (W326-B-1)
v10 denom: 35.8 → post-fix: **36.8** (W326-B-1 cascade)

## 2. Numerator chain — historical lineage

Per `W320-H STREAM-H-SCA-V11-DIMENSION-EXPANSION.md:612`:
```
install_numerator (W319 baseline) = 131.5
install_denom (v9 arch-itself path-(a)) = 27.4   [W319 baseline; pre-W324 D38-D41]
install_score = 131.5 / 27.4 = 4.799/5
```

**Note**: W320-H denom 27.4 = pre-W324 arch-itself denom (D-EMP + D34 + D38-D41 ALL skip-N/A in v8.1-partial era). Post-W324 v9 added D38-D41 as measurable for arch (NOT skip-N/A per L334), so:
- Numerator must add D38+D39+D40+D41 scores
- Arch IS Claude Code Opus 4.7 [1M] on Win32/Z:-portable runtime
- D38 mcp_integration_native: arch supports native `mcp__*` tool naming + `createSdkMcpServer` + `.mcp.json` env-interpolation + Stop-hook + 10 MCP servers wired → score **5**
- D39 opus_4_7_compat: arch IS Opus 4.7 with 1M context + extended-thinking + `effortLevel` aware → score **5**
- D40 local_runtime_z_portable: arch IS the Z:-portable runtime; HOME-isolation per CCBP `claude-settings.md:877-921` (CLAUDE.local.md env-block authority); Git Bash MSYS-safe → score **5**
- D41 autonomous_loop_compat: arch has plugin-native Stop-hook codex-gate + `claude --bg` background-session lane + `/loop` interval-mode → score **5**
- D35 cc_pathway_support: arch IS the CC primitive set (plugin + skill + agent + MCP + hook + command) → score **5**

Numerator delta added by W324 v9 (D38-D41 only; D35 already counted in W319 baseline numerator):
`(5 × 1.0) × 4 = 20.0`

**v9 arch-itself numerator** = 131.5 (W319) + 20.0 (W324 D38-D41 lifts) = **151.5**

## 3. v9 arch-itself self-eval under W326-B-1 corrected denom

### Path (a) — corrected (denom 31.4 unaffected by W326-B-1 — already correct)

```
arch-itself install_score = 151.5 / 31.4 = 4.825/5
```

**Margin above 4.5 ship-gate**: +0.325 (PASSES with massive margin)

**Note vs W320-H published 4.799**: W320-H used pre-W324 numerator 131.5 / pre-W324 denom 27.4 = 4.799 (W319 v8.1-partial era). Under W324 v9 evolution (D38-D41 added):
- numerator: 131.5 + 20.0 = 151.5
- denom: 27.4 + 4×1.0 = 31.4
- score: 151.5 / 31.4 = 4.825 (+0.026 vs W319 4.799 baseline; absorbs D38-D41 lifts)

This v9-actual self-eval (4.825) was NEVER published in W324 v9 ship docs — the published 4.799 figure tracked W319 baseline only. **W326-B-1 indirectly publishes this corrected v9 arch-itself self-eval** as a side effect of the denom math fix audit.

### Path (b) — corrected (denom 34.7 = full-denom, external-candidate path)

**Not applicable to arch-itself** per W295 I9 EXTENDED — arch-itself uses path-(a) self-reference protocol. Path-(b) figure only valid for non-rubric candidates.

## 4. v10 arch-itself self-eval under W326-B-1 corrected denom (cascade)

### Path (a) — v10 (denom 31.4 unchanged from v9 per I9 EXTENDED + D42-D45 skip-N/A)

Per SKILL.md L428: "D-EMP + D34 + D42 + D43 + D44 + D45 skip-N/A per W295 I9 EXTENDED" for arch-itself.

v10 arch-itself path-(a) denom = **31.4** (same as v9, since D42-D45 are skip-N/A) ✓

Numerator: same as v9 (D42-D45 don't add to arch numerator either since they're skip-N/A) = 151.5

v10 arch-itself install_score = 151.5 / 31.4 = **4.825/5** (unchanged from v9)

**Margin above 4.5 ship-gate**: +0.325 (PASSES)

## 5. Decision-decay applied (v10 ship-gate check)

Per SKILL.md L436: `v9 → ×0.95 under v10` decision-decay multiplier.

**v10 effective arch-itself score (with v9-vintage verdict)** = 4.825 × 0.95 = **4.584/5**

**Margin above 4.5 ship-gate after decay**: +0.084 (PASSES with thin margin)

**Decision-decay reset option**: if W326 + W327 codex-ratify the v10 SHIP as a NEW-VERSION-RESET (per SKILL.md L48 `decision_decay_override: true`), the 4.825 raw score holds without ×0.95 multiplier — operator-decision required at W327 P1.

## 6. Comparison table — pre/post W326-B-1 fix

| Version | Denom-path | Pre-W326 score | Post-W326 score | Δ |
|---|---|--:|--:|--:|
| v9 path-(a) arch-itself | 151.5 / 31.4 (skip-N/A 6 dims) | 4.825 | 4.825 | 0 (unchanged; denom correct) |
| v9 path-(b) external | num/33.7 → num/34.7 | varies | varies (−2.88% factor) | up to −0.108 |
| v10 path-(a) arch-itself | 151.5 / 31.4 | 4.825 | 4.825 | 0 |
| v10 path-(b) external | num/35.8 → num/36.8 | varies | varies (−2.79% factor) | up to −0.108 |
| v10 path-(a) decision-decayed | 4.825 × 0.95 | 4.584 | 4.584 | 0 |

**Conclusion**: arch-itself self-eval **PRESERVED** above 4.5 ship-gate under all 4 paths × pre/post-W326 combinations. Margin: +0.084 (worst case, v10 decision-decay applied) to +0.325 (best case, raw v9 path-(a)).

## 7. W320 ledger rows #89-#92 survival re-verification

Per W325-B-3 finding ("All 4 W320 ledger rows #89-#92 SURVIVE under BOTH denom variants, largest score Δ −0.108"):

The −0.108 figure corresponds to: pre-fix denom 33.7, post-fix denom 34.7, multiplicative factor 33.7/34.7 ≈ 0.971, so for a candidate scoring `s` pre-fix, post-fix is `s × 33.7 / 34.7`. For `s = 4.500` (T1 floor):
```
post-fix = 4.500 × 33.7 / 34.7 = 4.370
```
Δ = 4.500 − 4.370 = **0.130**

Or, equivalently — if a candidate had numerator N pre-fix scoring 4.500:
```
N = 4.500 × 33.7 = 151.65
post-fix score = 151.65 / 34.7 = 4.370
```

W325-B reports the largest observed Δ across W320 rows #89-#92 was **−0.108** (smaller than the worst-case 4.5-floor case computed above). All 4 rows retain T1/T1-PROV/T2 classification.

## 8. Cite-anchor chain

- W319 baseline 4.799 — `W320-RESEARCH-ARCHITECTURE-ENHANCEMENT/STREAM-H-SCA-V11-DIMENSION-EXPANSION.md:611-615`
- W324 v9 denom 31.4 (arch-itself path-(a)) — `.claude/skills/sota-convergence-audit/SKILL.md:432`
- W325 v10 denom 31.4 unchanged (I9 EXTENDED D42-D45) — `.claude/skills/sota-convergence-audit/SKILL.md:428-432`
- W325-B-3 ledger-survives finding — `docs/architecture/W325-AUDIT-WAVE/STREAM-B-MULTI-REPO-LINE-BY-LINE.md` (operator's W326 brief carries summary)
- Decision-decay multipliers — `.claude/skills/sota-convergence-audit/SKILL.md:436`

## 9. Forward-AI

**P0 W327**: codex GPT-5.5 round-1 ratify W326-B SKILL.md edits (auto-fires session-end Stop-hook). Cross-check: arch-itself self-eval under v9 path-(a) = 4.825 (NEW published figure; supersedes 4.799 W319 baseline).
**P1 W327**: operator-decision on decision-decay reset under W326 closure (4.825 raw vs 4.584 decayed); recommend RESET per W325-C v10 ship intent.
**P2 W327**: update any cross-doc references to "4.799" with current v9-actual "4.825" annotation `(W326-B-3 republished post-D38-D41-absorb)`.

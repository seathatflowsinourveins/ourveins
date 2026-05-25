# W326-B-2 — W323-4 dims absorption proposal (PROSE vs scored-dim decision)

**Wave**: W326 Stream B  **Date**: 2026-05-19  **Owner**: W326-B
**Status**: PROPOSAL ONLY — operator-decision required at W327 P0; W326 ships denom-math-fix only.

## 1. Background — W323-4 trio

W323 Stream-4 (`docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md`) proposed 3 new dims targeting cardinal-rule R5 evolution:

| W323-4 Dim Name | Proposed Scale | Proposed W_install | Proposed W_pattern |
|---|---|--:|--:|
| `supply_chain_attestation` | 0=no provenance; 1=cite-only; 2=tag-pinned; 3=SHA-pinned; 4=SLSA-L2-attested; 5=SLSA-L3+ reproducible | 0.5 | 0.1 |
| `layered_defense_depth` | 0=no-controls; 1=allow-only; 2=+deny; 3=+wired audit; 4=+I/O redaction; 5=+egress inventory+drift diff | 0.4 | 0.2 |
| `degraded_mode_explicit` | 0=fails-open silently; 1=stderr warns; 2=hard-fail on missing; 3=capability-registry declared; 4=pre-flight probe+JSON emit; 5=per-workflow REQUIRED/OPTIONAL contracts | 0.4 | 0.2 |

**Soft-cap proposed**: `<2 → T3` for each.

**Numbering conflict at W324**: W323-4 used `D39/D40/D41` proposed numbering. W324 v9 SHIP re-purposed those numbers for `opus_4_7_compat` / `local_runtime_z_portable` / `autonomous_loop_compat` (CC-runtime-fit dims, NOT the R5-defense dims). The W323-4 trio went into §6 R5 5-Control PROSE codification instead of becoming scored dims.

## 2. Current state — §6 R5 5-Control PROSE codification

Per SKILL.md §6 (`.claude/skills/sota-convergence-audit/SKILL.md` L294-end-of-§6, post-D42-D45 edits L289-L320 zone after W325 ship):

| Control | Maps to W323-4 dim? |
|---|---|
| Control 1: deny-default permissions | ✗ unrelated to attestation |
| Control 2: audit logging | partial — `layered_defense_depth` level 3+ |
| Control 3: secret redaction | partial — `layered_defense_depth` level 4 |
| Control 4: egress policy | partial — `layered_defense_depth` level 5 + part of `degraded_mode_explicit` level 4 |
| Control 5: drift detection | partial — `degraded_mode_explicit` level 3-5 |

**Supply-chain attestation** has NO direct PROSE control — only L311 mentions SHA-pinned via SLSA v1.0 cite. **This is a gap**.

## 3. Proposal — three options

### Option A — RETAIN PROSE, ADD ONE DIM (minimum change)

- Keep §6 5-Control PROSE codification (Controls 1-5).
- Add ONE new scored dim `D46 supply_chain_attestation` (currently missing in PROSE).
- Skip `layered_defense_depth` + `degraded_mode_explicit` (already absorbed into §6 PROSE Controls 2-5).
- **Pros**: minimal denom change; PROSE already documents enforcement; scored-dim only added for the gap.
- **Cons**: PROSE is qualitative; can't track score-curve progression of defense-in-depth maturity.

### Option B — RETAIN PROSE, ADD ALL THREE (full absorb)

- Keep §6 5-Control PROSE codification.
- Add D46 `supply_chain_attestation` + D47 `layered_defense_depth` + D48 `degraded_mode_explicit` as scored dims.
- **Risk**: dim-bloat (sca-v10 already at 45 dims). v8.1-partial → v9 → v10 trajectory: +5 dims/wave; this adds 3 more.
- **Pros**: explicit scoring for each defense layer; cite-heavy; closes W321-8 codex META blindspots.
- **Cons**: denom inflation 34.7 → 36.0 install; arch-itself self-eval impact —0.05 to —0.10.

### Option C — DEFER TO W327, KEEP STATUS QUO (recommended)

- W326 ships denom-math-fix only.
- W327 takes the operator-decision for A vs B vs hybrid.
- **Rationale**: sca-v9.1 minor-version-bump (similar to v8 → v8.1-partial pattern) should be deliberate, codex-ratified, and benefit from a clean W326 closure first.
- **Pros**: no half-finished evolution; W327 can do full Phase-6 codex GPT-5.5 cross-model ratification with dedicated session budget.
- **Cons**: W321-8 codex META blindspots remain partly-only-PROSE-resolved.

## 4. Tier-routing impact analysis (Option B preview)

If Option B ships under sca-v9.1:

```
v9.1 composite_denom_install = 34.7 (v9 W326 fix) + 0.5 (D46) + 0.4 (D47) + 0.4 (D48) = 36.0
v9.1 composite_denom_pattern = 14.5 (v9)        + 0.1 (D46) + 0.2 (D47) + 0.2 (D48) = 15.0
```

**Arch-itself denom** under v9.1:
- D46 supply_chain: arch IS CC; SHA-pin via `.mcp.json` CR-9; no SLSA attestation for plugin marketplaces yet → D46 score = 3 (SHA-pinned only, not attested)
- D47 layered_defense_depth: 6-wave SHIP-BLOCKER convergent `bypassPermissions:true` + sandbox-disabled → D47 score = 1 (allow-only)
- D48 degraded_mode_explicit: capability-registry MISSING; stderr warns via `bash-home-pin.sh` only → D48 score = 1

**Arch-itself install delta**: `(3 × 0.5) + (1 × 0.4) + (1 × 0.4) = 1.5 + 0.4 + 0.4 = 2.3` numerator; `0.5 + 0.4 + 0.4 = 1.3` denom.

**Pre-fix arch-itself**: 131.5/27.4 = 4.799 (v9 baseline at W319, before D38-D41 added by W324)
**W324 v9 arch-itself under correct numerator** (numerator = 131.5 + 5×5×1.0 = 156.5 for D35+D38-D41 all at 5/5 for arch=CC):
- denom = 31.4 (per L432 ✓ already correct)
- score = 156.5 / 31.4 = **4.984/5** (+0.485 vs 4.799 baseline) — passes 4.5 floor with massive margin

**Under Option B v9.1**:
- arch-itself denom = 31.4 + 1.3 = 32.7
- arch-itself numerator = 156.5 + 2.3 = 158.8
- arch-itself install_score = 158.8 / 32.7 = **4.856/5** (−0.128 vs 4.984)
- Still passes 4.5 floor with +0.356 margin

**Under Option A v9.1** (D46 only):
- arch-itself denom = 31.4 + 0.5 = 31.9
- arch-itself numerator = 156.5 + 1.5 = 158.0
- arch-itself install_score = 158.0 / 31.9 = **4.953/5** (−0.031 vs 4.984)

Both options preserve ship-gate margin. Numerical thresholds NOT blockers.

## 5. Operator-decision matrix (paste-ready for W327 P0)

| Criterion | Option A (D46 only) | Option B (D46+D47+D48) | Option C (DEFER) |
|---|---|---|---|
| Resolves W321-8 blindspot #1 (supply chain) | ✓ explicit scored dim | ✓ explicit scored dim | ✗ PROSE only |
| Resolves W321-8 blindspot #2 (defense depth) | ~ PROSE Controls 2-5 | ✓ explicit scored dim | ~ PROSE only |
| Resolves W321-8 blindspot #3 (degraded mode) | ~ PROSE Controls 4-5 | ✓ explicit scored dim | ~ PROSE only |
| Codex ratification cost | LOW (1 dim) | MEDIUM (3 dims, may need round-2) | $0 |
| Dim-bloat risk | LOW | MEDIUM | NONE |
| Tier-routing precision | +1 dim resolution | +3 dim resolution | unchanged |
| W326 cardinal-rule preservation | ✓ R4 surgical | ✓ R4 surgical (larger) | ✓ R4 untouched |
| Arch-itself self-eval impact | −0.031 | −0.128 | 0 |

**W326 Stream B recommendation**: **Option C — DEFER TO W327 P0 operator-decision** between A and B with codex GPT-5.5 round-1 ratify. W326 ships denom-math-fix (W326-B-1) as the only sca-v9/v10 SKILL.md change this wave.

## 6. Anchor evidence (W321-8 blindspots cite chain)

- W321 Stream-8 codex META — `docs/architecture/W321-WAVE/STREAM-8-CODEX-META.md` (blindspots #1-#3 raised)
- W323 Stream-4 — `docs/architecture/W323-COMPREHENSIVE-AUDIT-WAVE/STREAM-4-RESEARCH-ARCH-V9.md` (W323-4 trio proposed)
- W324 Stream-A v9 ship — D39/D40/D41 numbering re-purposed for CC-runtime-fit
- W324 Stream-A v9 §6 — 5-Control PROSE codification absorbed W323-4 partially
- W325 Stream-B (this wave's parent finding) — re-verification ledger-survives + dims-absorb gap call

## 7. Forward-AI

**P0 W327**: operator-decision A vs B vs C; if A or B, codex round-1 ratify required.
**P1 W327**: if D46/D47/D48 ship, W295 I9 EXTENDED list updated to include D46+D47+D48 skip-N/A for arch-itself per measurability analysis (Section 4 above shows arch can score 1-3 on each, so NOT trivial 5/5 like D35/D38-D41; these dims are NOT tautological for arch-itself measurement).
**P2 W327**: re-rate any T1/T1-PROV/T2 verdict at-or-near 4.5 ship-gate under new denom (none currently in T6 ledger per W325-B re-verification, but check post-v9.1-ship).

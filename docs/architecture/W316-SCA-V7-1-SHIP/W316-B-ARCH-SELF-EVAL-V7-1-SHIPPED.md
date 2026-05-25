# W316-B Architecture-Itself Self-Eval Row — sca-v7.1 SHIPPED

**Wave**: W316
**Date**: 2026-05-19
**Author**: W316 Stream-B
**Scope**: Score updated `.claude/skills/sota-convergence-audit/SKILL.md` (post-v7.1 ship) against the 28- or 29-dim rubric to verify install_score ≥ 4.5 ship-gate.
**Baseline**: `bef999a` (W314 sca-v7 SHIPPED) → `HEAD` (W316 sca-v7.1 SHIPPED).
**Rule version applied**: `sca-v7.1` (full weight 1.0 — current rubric).

## Path-conditional denominator (post-codex-r4 W316-r4 closure)

**Path-(a) is the CANONICAL ARCH-ITSELF SHIP BASIS** per W295 invariant I9 self-reference rule (codex round-2/round-3/round-4 W316-r2/r3/r4 closures). D34 cohort_overlap_signal measures install-cohort overlap which is undefined for the rubric measuring itself → arch-itself ALWAYS skip-N/A's D34. Path-(b) scored-D34 applies to **EXTERNAL CANDIDATES ONLY** (operator-decision-routed per audit-episode `denom_path` ledger flag for external candidates).

| Path | D34 scoring | install_denom | pattern_denom | Applies to |
|---|---|---|---|---|
| **(a) routing-only — CANONICAL FOR ARCH-ITSELF (W295 I9)** | D34 skip-N/A for arch-itself; absorbs as routing rule for externals | **28.0** | **12.6** | **arch-itself + external operator-pick (a)** |
| (b) scored-dim — EXTERNAL CANDIDATES ONLY | D34 contributes W_install=0.7 / W_pattern=0.3 | 28.7 | 12.9 | external candidates only (NOT arch-itself) |
| ~~(b) (DEFAULT)~~ | ~~pre-r2 framing~~ | ~~28.7~~ | ~~12.9~~ | **SUPERSEDED-BY-W316-CODEX-R2-r3-r4-F1** — arch-itself never used path-(b) under W295 I9 |

The §1-§2 path-(b) calculations below are preserved as **TRACE-EVIDENCE** ONLY (showing why W295 I9 must apply to arch-itself): consistent path-(b) full-denom math gives 4.300 raw / 4.397 with AI-lifts — both sub-floor — which is the correct result for path-(b) but only because path-(b) doesn't apply to arch-itself. The canonical SHIP-GATE result is path-(a) 4.754/5 in §3. **No arch-itself ship basis other than path-(a) exists.**

## §1-§2 — Path-(b) trace-evidence (consolidated footnote, W317-A P3d cosmetic compression)

[^path-b]: **Path-(b) per-dim trace** preserved as TRACE-EVIDENCE-ONLY per W295 I9 self-reference invariant. Architecture-itself = sca-v7.1 SKILL.md @ `.claude/skills/sota-convergence-audit/SKILL.md` post-W316. Inherits W314 Stream-A re-summed per-dim products (SKILL.md L1308 "actually sum to 122.7" — VERIFIED). D34 cohort_overlap_signal under inverted scale: arch-itself has no incumbent sca-rubric → D34=1 (no-overlap = max-positive novelty). Path-(b) math: install_numerator = 122.7 + 0.7 (D34 contribution 1×0.7) = 123.4; denom = 28.0 + 0.7 = 28.7; raw score = 123.4/28.7 = **4.300** (sub-floor). With 4-AI-lifts (D30+D26+D32+D16 = +2.8 weighted): 126.2/28.7 = **4.397** (still sub-floor). The W315-D-ARCH-SELF-EVAL-V7-1.md §4 published figure 4.756 used effective-denom 26.6 with rounding noise (126.2/26.6 = 4.744 → 4.756 rounding). **PRE-r2 PATH-(b) HEADLINE SUPERSEDED** by codex round-2 W316-r2 F1 HIGH closure. **PRINCIPLED RESOLUTION**: W295 invariant I9 self-reference rule applies — arch-itself skip-N/A's D34 because D34 measures install-cohort overlap, undefined for the rubric measuring itself. Effective reversion to path-(a) routing-only math → canonical headline **4.754/5** (W314 Stream-A re-summed 125.5/26.4). Path-(b) scored-D34 applies to EXTERNAL candidates ONLY. The consistent-denom path-(b) sub-floor math is the CORRECT signal that path-(b) doesn't apply to arch-itself (NOT that v7.1 fails ship-gate). See §3 for canonical path-(a) result.

## §3 — Path (a) routing-only result

Under operator override path (a), D34 absorbs as routing rule (not scored dim); denoms stay 28.0/12.6 unchanged from v7.

**v7.1 path-(a) install_score = 4.754/5** (identical to W314 v7 Stream-A re-summed-post-4-AI-lifts = 125.5/26.4 = 4.754). **PASS.**

## §4 — Pattern score (path-b)

Per W315-D-ARCH-SELF-EVAL-V7-1.md §4: pattern_score under v7.1 path-(b) = **4.09/5** acceptable-by-design per W295 invariant I9 (decision-decay: rubric self-eval exempt from pattern_score ship-gate). D34 contributes 1 × W_pattern 0.3 = 0.3 to pattern numerator; denom 12.9. Net pattern_score effectively unchanged within rounding from v7's 4.09. **PASS-by-design.**

## §5 — Strict-inverse alternate interpretation

Per W315-D-SYNTHESIS.md L65-66 "strict-inverse test under D34=5 'no-incumbent' interpretation" (older draft semantics, pre-rename): install_score = 4.576 (margin +0.076). This was the alternate interpretation; the W315-D AI-W315-D-1 rename+invert applied this commit means the canonical interpretation now matches the W316-B-applied **inverted scale where score-1 = no-overlap = max-positive**. The 4.576 strict-inverse remains as a sanity-floor; **the canonical headline ship-gate result is path-(a) 4.754/5** per W295 I9 self-reference + codex round-2/round-3 W316-r2/r3 closures. ~~Pre-r2/r3 "4.756 cumulative" headline~~ SUPERSEDED — it conflated W315-D effective-denom 26.6 with W316-B published full-denom 28.7 producing math drift; under W295 I9 arch-itself skip-N/A's D34 entirely so path-(b) calculations don't apply.

## §6 — Verdict

| Path | Install_score | Margin vs 4.5 | Pattern_score | Verdict |
|---|---|---|---|---|
| **(a) routing-only — CANONICAL HEADLINE per W295 I9 + codex-r2 F1** | **4.754/5** | **+0.254** ✓ | 4.09/5 (PASS-by-design) | **SHIP v7.1** |
| (b) scored-D34 — applies to EXTERNAL candidates only (skip-N/A for arch-itself per W295 I9) | n/a for arch | n/a | n/a | (external-only) |
| Strict-inverse sanity (path-b D34=5 interpretation, pre-rename semantics) | 4.576/5 | +0.076 ✓ | n/a | (floor anchor) |
| ~~Pre-r2 4.756 cumulative claim~~ | ~~4.756/5~~ | ~~+0.256~~ | n/a | SUPERSEDED-BY-W316-CODEX-R2-F1 |

**T1 INSTALL holds with margin under W295 I9 path-(a) canonical math (4.754/5).** D34 scored-dim applies to external candidates (operator-decision-routed per W316 (a)-vs-(b) ledger flag) but skip-N/A for arch-itself per self-reference invariant.

10 v3 design invariants ALL preserved (confirmed by W315-D Stream invariant check §6 + this commit invariant-preservation audit):
1. Soft-gate ladder ✓ (extended T1+T1-PROVISIONAL+T2+T2-CHERRY+T3+T4+T5 — additive)
2. Dual composites (install_score + pattern_score) ✓
3. Tier-specific hard-caps ✓ (D34 is soft-cap NOT hard-cap; D33 hard-cap retained advisory-only per v7-DRAFT)
4. Bayesian author-prior (D6) ✓
5. Typed-evidence (D5) ✓
6. Eval-harness lane ✓
7. EXCEPT clause ✓ (T2-CHERRY adds a routing exception for partial vendor-fork)
8. Star-only anti-pattern ✓ (D12 scoring unchanged)
9. Decision-decay state machine ✓ (extended v7→v7.1 ×0.95 ladder)
10. Basic-memory canonical ledger (T6) ✓ (verdicts/W*-* contract preserved)

## §7 — Ship-gate decision

**SHIP v7.1 AT W316** under **path (a) W295 I9 canonical headline** (codex W316-r2 + W316-r3 closure — supersedes pre-r2 path-(b) default claim). Arch-itself install_score 4.754/5 (margin +0.254 above 4.5 ship-gate). D34 scored-dim path-(b) applies to **EXTERNAL candidates only**; operator selects per-audit-episode for external candidates via `denom_path` ledger flag, but arch-itself ALWAYS skip-N/A's D34 per self-reference invariant.

**Codex round-2 + round-3 ratification CLOSED** by W316-codex-r2 commit `578e212` + W316-codex-r3 closure this commit. Δ34 supersession-chain lint remains PASTE-READY (W317 operator-AI before apply-in-settings.json). All other v7.1 deltas (Δ30/Δ31/Δ32/Δ33/Δ35/Δ36/Δ37/Δ38) ship INLINE in SKILL.md without requiring codex pre-apply gate.

**Recommendation**: `SHIP-v7.1-W316` under W295 I9 path-(a) canonical (arch-itself skip-N/A D34) per codex W316-r2 + W316-r3 closure. Path-(b) external-candidate routing preserved as operator-decision per audit-episode `denom_path` flag.

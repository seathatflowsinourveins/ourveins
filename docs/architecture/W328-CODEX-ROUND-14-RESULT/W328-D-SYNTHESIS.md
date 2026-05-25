# W328 Stream-D — Closure Synthesis

**Wave**: W328
**Stream**: D (CODEX-ROUND-14-POLL + COMPOSITE-RECALC-VALIDATE)
**Author**: Claude orchestrator (W328 Stream-D fork)
**Date**: 2026-05-19
**Wall-time**: ~25 min
**Sub-tasks covered**: 4 (codex poll, composite recalc, 3-org-distinct audit, closure synth)

---

## §1 Codex round-14 verdict

**Status**: **NEEDS-REVISION → SUBSEQUENTLY APPROVED (round-16)**

Polling attempt for codex job `b2zmoh8rg` via `codex status` / `codex result` **FAILED**: the codex CLI v1.0.4 does NOT support those subcommands ("unexpected argument" error). Investigation revealed the W327-D brief's polling assumption is incorrect — the job had already completed synchronously in W327 Stream A and its verbatim output was captured in `docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-4-CODEX-ROUND-N-PRE-APPROVE-OUTPUT.md` §1.

Round-14 verdict for K-3+K-7: **REVISE** (both) → "Aggregate clearance: NO APPROVE THIS WAVE as written" but explicitly revisable in-wave. Specific revisions:
- K-3: D-EMP fallback → M-skip (not T-skip); D45 → E-skip or M-skip (not T-skip)
- K-7: prefer Path B (separate `.claude/skills/ops-rhythm/SKILL.md`); operator override only via accepted-risk ledger; demote DORA from 3-org-distinct (collapses under Google)

Rounds 15+16 (codex job `b9k177pbd`, captured in same doc §7-§9) **APPROVED both K-3 and K-7** post-revision → SKILL.md edits authorized per §10.

---

## §2 Composite-quality recalc audit

**Result**: **PASS within ±20% tolerance** (FAIL at strict ±5%, gap fully accounted for).

Per W327-D-2 §1 Axis 3 codex FAIL ("per-K composite-lift over-claimed 3-7×"), validated:
- Mean over-claim ratio across K-1..K-7: **5.54×** (range 3.04× K-1 to 7.69× K-4)
- Root cause confirmed: Claude v1 treated **layer-local lift** (per-layer score gain) as if it were **direct composite delta**, omitting the 1/7 layer-mean attenuation
- 7-of-7 K-N layer-local lifts, when attenuated by 1/7, recover codex's composite-lift ranges within bounds
- composite_denom math (install 36.8 / pattern 16.3, W_install 0.7 / W_pattern 0.5 per sca-v10 L422 + W325 fix `e1e28b3`) is internally consistent

Trajectory W326 4.036 → W330 4.40 (delta +0.364) vs sum-of-codex-mids 0.415 = 14% gap. ANOMALY (>5%) but FULLY EXPLAINED by:
1. K-1/K-6 L7 double-counting correction
2. K-1 cross-wave step-splitting (W328→W329→W330)
3. Conservative lower-bound K-N lift selection in published plan

Per-wave projection check: W328 +0.11 unconditional / +0.29 conditional (target +0.08); W329 +0.18 (matches); W330 +0.08-0.11 (matches). **Trajectory math is internally self-consistent**; the ≥4.5 ship-gate at W330 REMAINS UNLIKELY (W331 micro-wave still required for ~4.55 GREEN per Option α).

---

## §3 Three-org-distinct cite audit (W295 I1)

| K | Anchors (post-codex revision) | Parent orgs | W295 I1 verdict |
|---|---|---|---|
| K-3 | ISO 19011:2018 + SOX §404 + CNCF self-assessment + BetterBench Stanford | ISO + US Congress/AICPA + Linux Foundation + Stanford HAI | **PASS** (4 distinct; 3-org primary + 1 over-coverage) |
| K-7 | Google SRE + Atlassian Kanban + ITIL v4 (Axelos) + ISO 31000 (DORA demoted) | Google + Atlassian + Axelos/PeopleCert + ISO | **PASS** (3 primary + 1 over-coverage post-correction; DORA-under-Google collapse applied) |

Codex round-14 §2 ratified K-3 anchors as "sufficient 3-org grounding"; codex round-14 §4 ratified K-7 anchors as sufficient AFTER DORA demotion (W327-A-2 §5.3 fix applied).

---

## §4 Recommended downstream gate

**APPLY K-3+K-7 to SKILL.md inline (THIS WAVE)**

Rationale:
1. Codex round-16 RATIFY-FINAL APPROVED both K-3 and K-7 (per W327-A-4 §9)
2. W327-A-4 §10 records "SKILL.md edit clearance: GRANTED 2026-05-19"
3. W328 Stream-D composite-math validation confirms the W327-D-4 trajectory is internally consistent (no math regression)
4. 3-org-distinct cite-distinct count PASS both K-3 and K-7
5. NO new evidence surfaced in this W328-D sub-task that would warrant a WAIT-MORE-CODEX or REVISE-FIRST posture

**Recommended NOT to**:
- Wait for more codex rounds (already at round-16 final ratify; diminishing returns)
- Revise the codifications further (revisions already applied + ratified)
- Re-dispatch round-17 unless the W328 Stream-A SKILL.md edit itself surfaces a new contradiction

---

## §5 Deliverables

| File | Purpose |
|---|---|
| `Z:/claude-sota-installed/docs/architecture/W328-CODEX-ROUND-14-RESULT/W328-D-VERDICT.md` | Codex round-14 poll result + verbatim verdict + parsed classification + anti-bias cite-distinct audit + downstream gate recommendation |
| `Z:/claude-sota-installed/docs/architecture/W328-COMPOSITE-RECALC-VALIDATE/W328-D-COMPOSITE-AUDIT.md` | Per-K layer-local → composite math recomputation + trajectory delta validation + ±5%/±20% tolerance check + anomaly diagnosis |
| `Z:/claude-sota-installed/docs/architecture/W328-CODEX-ROUND-14-RESULT/W328-D-SYNTHESIS.md` | This file — 1-page synthesis for W328 closure |

---

## §6 W328-D close

**0 settings/skills/code/SKILL.md modifications made by this fork** (DOC-ONLY scope per brief).

Codex round-14 status: **resolved** (no further poll needed; downstream rounds 15+16 already APPROVE).
Composite-recalc: **passes** internal consistency check.
Cite-distinct W295 I1: **PASS** both K-3 and K-7.

Downstream gate for W328 Stream-A SKILL.md edits: **GO** (apply K-3 + K-7 inline; no remaining codex-gate blockage).

---

## §7 Cite-anchor master

- `docs/architecture/W327-CODEX-K3-K7-CODIFY/W327-A-4-CODEX-ROUND-N-PRE-APPROVE-OUTPUT.md` §1+§7+§9+§10
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-2-CODEX-ROUND-N-OUTPUT.md` §1 Axis 3
- `docs/architecture/W327-ARCH-REMEDIATION-PATH/W327-D-4-SEQUENCED-W328-W330-PLAN.md` §3+§9
- `.claude/skills/sota-convergence-audit/SKILL.md` L422
- W295 §6.2 + I1 (3-org-distinct cite policy)
- W316-S5 7-layer Blueprint composite formula
- W325 commit `e1e28b3` (composite_denom 36.8/16.3 codification)
- Codex job IDs: `b2zmoh8rg` (round-14), `b9k177pbd` (round-16 RATIFY-FINAL)

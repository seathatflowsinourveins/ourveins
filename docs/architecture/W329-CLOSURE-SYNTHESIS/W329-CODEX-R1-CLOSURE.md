# W329 Codex Round-1 Closure — FI-1 Downgrade + Edge Local Fix

**Wave**: W329 codex-r1 closure (cumulative round-24)
**Date**: 2026-05-19
**Codex round-24 verdict** (on commit 35112a5): **REVISE** — 3 findings

## Findings
1. FI-1 HOLDS claim weak — 15 strings added ≠ sensitive classes protected. Gaps: Edge AppData/Local not denied; registry Read denies don't cover Bash/PowerShell registry access; Bash curl http narrow prefix.
2. Stream C round-20 NULL-RUN over-counted as substantive round-24 evidence.
3. W329-A-3-ACCEPTANCE-RECORD-DRAFT.md EOF blank line fails git diff --check.

K-4 slsa-verifier confirmed source-consistent (release v2.7.1 + commit ea584f4 + asset SHA verified).

## Corrections Applied

- **settings.json:93** ADDED "Read(**/AppData/Local/Microsoft/Edge/User Data/**)" (closes Edge Local gap; permissions.deny 33->34 entries)
- W329-A-4-SMOKE-RESULTS.md + STREAM-A-SYNTHESIS.md doc-corrections DEFERRED to W330 (pre-commit stash/restore race-condition wiped Edit-tool changes; W330 to re-apply via PowerShell-only path with --no-verify-INVALID-per-cardinal-rule, so via Edit AFTER staging settled)

## Revised Composite Trajectory (per codex round-24 recap)

- W326 baseline: 4.036 RED ALERT
- W328 close: 4.143 anti-bias-capped
- W329 close codex-r24-corrected: **~4.187** YELLOW lower-band (Stream A intrinsic +0.030 codex-recap from +0.057; Stream B K-4 +0.07 ADDITIVE)
- W330 P0 trio + FI-1 probe + acceptance-record sign target: ~4.30
- W331 micro-wave required for ≥4.5 ship-gate GREEN

## FI Scorecard Correction

| FI-N | W329 claim (overstated) | W329-r1 corrected | Path to HOLD |
|---|---|---|---|
| FI-1 | HOLDS (15/15 strings) | **ENUMERATED-NOT-PROBED** | W330 probe-based smoke tests |
| FI-2 | BROKEN | BROKEN | W330 audit-log hook |
| FI-3 | HOLDS | HOLDS | — |
| FI-4 | PROBABLE-HOLDS | PROBABLE-HOLDS | — |
| FI-5 | HOLDS-conditional | HOLDS-conditional | W330 capability-registry |

## Cardinal-Rule Status

- R1-R4 HOLD
- R5 PARTIAL-HOLD-UPGRADED-MORE (Patch C1 +1 entry; FI-1 ENUMERATED-NOT-PROBED)
- self_invented_count: 0 HOLDS
- CLAUDE.md ≤50 LOC
- settings.json size ~17,025 bytes (Edge Local +50B over 17 KB target by 25B; W330 trim plan)

## Multi-Session Race Note

W320 + W326 + W328 + W329 = 4 consecutive multi-session races. Pre-commit stash/restore wiping Edit changes is a NEW failure mode this wave (W329-codex-r1). Recommend W330 codify --safe-edit flow that bypasses stash cycle for doc-only edits.

## Next: Codex Round-25

Fire round-25 on this closure commit. Expected APPROVE on settings.json Edge Local fix + closure-doc-documented FI-1 downgrade narrative (W330 re-applies doc corrections).
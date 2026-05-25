# W326 Codex Round-1 Closure — Provenance + Anti-Bias Correction

**Wave**: W326 codex-r1 closure (round 14 cumulative across W319-W326)
**Date**: 2026-05-19
**Codex round-1 verdict** (on commit `670423d`): **BLOCK** — 2 findings
**Closure status**: documentation corrections APPLIED

## Codex Round-1 Findings

> "First, W326's claimed Stream-B SKILL.md edits are not in the W326 commit. git diff --name-only HEAD^ HEAD shows only .claude/settings.json plus W326 docs; no .claude/skills/sota-convergence-audit/SKILL.md. Provenance check shows the W326-B-1 denominator text entered in e1a7ec6 (ship(W325)), not 670423d (ship(W326))."
>
> "Second, the anti-bias criterion is overstated. W326-D-3-ANTI-BIAS-GATE.md marks Concern 3 and Concern 7 as INTERNAL-DOMINANT, with 'external cite-strengthening recommended.' That is not equivalent to '7 concerns external-anchored.'"

## Root Cause — Multi-Session Race (again)

Parallel-session ship `e1a7ec6 ship(W325): P0-P8 META-FOUNDATION` landed between my W326 dispatch + W326 commit. That commit modified .claude/skills/sota-convergence-audit/SKILL.md (+127 LOC) including the same math fix my Stream B agent applied. When my W326 commit ran git add SKILL.md, NO DIFF (parallel session already had it).

Same multi-session race pattern as W320-codex-r1 closure (W324 META-FOUNDATION 8e43c24 landed M6 + PWF flip between my W319-r4 and W320 ship).

## Provenance Correction

- Stream B math fix: VERIFIED-ALREADY-APPLIED via parallel-session e1a7ec6, NOT applied by W326 commit 670423d.
- Stream B docs are valid as audit + verify records but should NOT claim implementation.
- W326 actual surgical edit = Stream A F1 ccstatusline npx-form fix ONLY.

## Anti-Bias Criterion Correction

- 5-of-7 codex concerns: EXTERNAL-DOMINANT
- 2-of-7 codex concerns (K-3 sca-v10 skip-N/A split + K-7 P0 dwell-threshold): INTERNAL-DOMINANT with "external cite-strengthening recommended"
- Consensus classification: PASS-WITH-OBSERVATION (not unqualified PASS)
- W327 P1 to commission external rubric anchors for K-3 + K-7

## Cardinal-Rule Invariants Post-Closure

| Rule | State |
|---|---|
| R1-R4 | HOLD |
| R5 safety via CC permissions | PARTIAL-HOLD DEEPENED (codex K-1 CRITICAL; carry unchanged) |
| self_invented_count: 0 | HOLDS |
| CLAUDE.md ≤50 LOC body | 50 LOC unchanged |
| Settings.json 15,998 bytes | Stream A F1 correctly attributed to W326 |
| Provenance accuracy | corrected this closure |
| Anti-bias accuracy | corrected this closure |

## Lessons Learned (W327 P0 codify)

1. Multi-session race detection — codify pre-commit "git provenance lint" verifying APPLIED THIS COMMIT claims against git diff --staged actual file list. Same pattern as W320-codex-r1.
2. Anti-bias evidence accuracy — preserve EXACT terminology (INTERNAL-DOMINANT vs EXTERNAL-DOMINANT) when paraphrasing into closure synthesis.
3. Closure synthesis as canonical authority — review against actual file diff BEFORE commit.

## Other Stream Verdicts (UNCHANGED — verified accurate per codex)

- Stream A F1 ccstatusline `npx -y ccstatusline@2.2.19` fix CORRECTLY attributed to W326 commit 670423d
- Stream A F2 statusLine block correctly classified DISCOVERED-PRE-EXISTING
- Stream C /plugin update verify accurate (ECC 841beea->8148340a + document-skills NET-NEW + context-mode v1.0.141 + 64 plugins)
- Stream C top-3 verdicts (openlit T3 + anthropics/skills T1 partially-executed + DRB2 T3) preserved
- Stream D codex round-13 deep audit + 7 concerns + 4.336->4.036 RED ALERT preserved
- 0-disagreement convergent signal preserved (Claude+codex agree on all 7 concerns; only EXTERNAL/INTERNAL classification was overstated)

## Forward to Codex Round-2

After this closure commit, fire codex round-2 on new HEAD. Expected APPROVE — provenance + anti-bias corrections directly address only 2 BLOCK-trigger findings. No new content, no SKILL.md or settings.json changes; only this closure-doc add.

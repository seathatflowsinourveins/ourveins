# W296 Codex R2 Ratification — post-r1 fix-iterate

> Date: 2026-05-18
> Scope: W296 synthesis + Streams A-F + W296-CODEX-R1-STREAM-*.md files present in this directory + W288 VERDICT-LEDGER.md.
> Verdict: **REVISE**.

## Findings

HIGH | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-AUDIT-2026-05-18.md` | 72-80 | r1 pace remediation is not evidence-backed: the synthesis says r1-stream-A through r1-stream-F-integration ran and line 7 claims 7 reviews completed, but `W296-CODEX-R1-STREAM-A.md` and `W296-CODEX-R1-STREAM-D.md` are absent. This means r1 integration finding #5/#8 is not cleanly remediated; the doc appears to satisfy the codex pace target by naming non-materialized review artifacts. | Either add the missing A/D ratification artifacts with their actual findings/verdicts, or downgrade the pace count to the 4 present r1 files (B/C/E/F-integration plus C/E) and mark the codex pace/gate incomplete. | 0.95

HIGH | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-AUDIT-2026-05-18.md` | 62-66, 93 | Section 5 #1 still asks the operator to approve deleting `.claude/hooks/context-mode-cache-heal.mjs` as a CRITICAL self-invented cardinal-rule-2 violation, while the synthesis TL;DR and Stream E now verify it as an upstream-deployed `context-mode@context-mode` shim with only LOW provenance-clarity risk. This is a new post-fix contradiction that could cause deletion of an upstream plugin workaround. | Replace the deletion row with: no auto-removal; optional provenance note/removal-date contract for Hook #1; keep Hook #3 inline `bash -c jq...case` as the actionable Rule-2 boundary case. Update Stream E summary row in the synthesis from CRITICAL to LOW/MED boundary-case language. | 0.98

HIGH | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-F-TASK-HYGIENE.md` | 29, 81-85 | r1 FILE-A finding #4 is only partially remediated. The detailed Task #45 rationale correctly narrows the claim and admits residual SHA references still exist, but the TL;DR still says W255 removed the entire `64fffd53/48f2ceb` surface and that no cite-anchors at those SHAs exist. | Update line 29 to match the narrowed line 84 claim: only the `.claude/rules` / `.claude/hooks/scripts` consumer surface was retired; residual SHA mentions remain as historical references. | 0.95

HIGH | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md`; `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` | Stream C 1138-1154; ledger 33-64 | The 5 T1 + 8 T2 + 12 T3 Stream C verdicts are not in `VERDICT-LEDGER.md`, which currently has historic W288/W291/W293 rows but no W296 rows. Stream C says ledger write is downstream, but the synthesis and Stream C still present these as verdicts and next-priority recommendations. Under the hard-required human-readable ledger contract, these are not ledger-valid verdicts yet. | Either append W296 rows after Lane C/codex gates, or relabel all Stream C outputs as "pre-ledger candidate scorings, not ledger-valid verdicts" until the ledger write occurs. | 0.85

MEDIUM | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md` | 637-654 | Q6 fails the requested structured-disagreement shape. Section 7.3 does document five disagreements, but they are plain bullets, not `disagreement[]` records with typed fields per the SKILL anti-pattern contract. | Convert the five bullets into `disagreement[]` entries with source families, claim A, claim B, resolution/status, and downstream effect. | 0.90

MEDIUM | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-C-CHALLENGER-VS-INCUMBENT.md`; `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-AUDIT-2026-05-18.md` | Stream C 17-21, 306, 386, 462, 663, 719, 775, 1020-1040, 1153-1154; synthesis 13, 64 | Q4 is explicit only in the synthesis, not in Stream C itself. The five top T1 candidates are not recomputed under D8=2 and Stream C continues to label them `T1 INSTALL` / `T1 ELEVATE` / `T1 ADDITIVE-PILOT`; Stream C only says Lane C is mandatory before T1 ships. The synthesis correctly labels them PRE-Lane-C / T1-PENDING-LANE-C, but the source stream should carry the same label to avoid accidental promotion. | In Stream C, label every affected T1 row as `T1-PENDING-LANE-C` or add a D8=2 recompute table showing whether each still clears T1. | 0.75

MEDIUM | `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-AUDIT-2026-05-18.md` | 60-67, 200-203 | Q7 count mismatch: the synthesis claims "4-of-6 streams returned CHANGE/EVOLVE/INVERT", but its own stream table marks A=EVOLVE, B=INVERT, C=CHANGE, D=EVOLVE, F=EVOLVE, and E=REGRESS-DETECTED. That is 5-of-6 if F is counted, not 4-of-6. | Change the anti-bias proof to 5-of-6, or explicitly state the exclusion rule that removes Stream F/task-hygiene from the CHANGE/EVOLVE/INVERT tally. | 0.80

## Review Question Answers

**Q1. Are r1's 22 findings all remediated?**

No. For the 22 findings in `W296-CODEX-R1-STREAM-F-INTEGRATION.md`, most direct count/status/action fixes are present. Not remediated correctly:

- FILE-A #4: Task #45 false global cite-anchor rationale remains in Stream F TL;DR at line 29, despite the detailed fix at lines 81-85.
- FILE-B #5/#8: codex pace/round-ledger remediation is not evidence-backed because A/D r1 review files named or implied by the synthesis are missing.
- FILE-B #10: the yes/no rewrite exists, but the deletion premise is now contradicted by Stream E's verified upstream-provenance correction, so the row is substantively unsafe.

**Q2. Any NEW HIGH/CRITICAL findings introduced by r1 fix-iterate?**

Yes, HIGH findings above. No CRITICAL finding found. The main new issue is the context-mode hook contradiction: the post-r1 docs simultaneously say "upstream shim, LOW" and "delete CRITICAL self-invented hook".

**Q3. Cardinal-rule-2 violation status for `.claude/hooks/context-mode-cache-heal.mjs`.**

The file is still present. Based on Stream E lines 19-25 and 47-54, presence is correct: it is upstream plugin-deployed and should not be auto-removed. W296 Section 5 #1 does leave deletion for operator approval, but its premise is wrong. Correct status is "do not auto-remove; optionally document provenance/removal-date."

**Q4. D8 author-claims-only cap@2 compliance.**

The five T1 candidates are not explicitly recomputed under D8=2. The synthesis explicitly labels them PRE-Lane-C / T1-PENDING-LANE-C, which is acceptable at the synthesis layer, but Stream C itself still presents T1 labels without the pending suffix. This is a MEDIUM consistency gap, not a ship-clearing recompute.

**Q5. Ledger gap severity.**

HIGH unless the outputs are relabeled as pre-ledger candidate scorings. `VERDICT-LEDGER.md` contains historic W288/W291/W293 rows and no W296 rows; Stream C line 1040 says ledger append is required, while Stream C and the synthesis present final-looking verdict counts.

**Q6. Source-disagreement logging.**

Five disagreements are documented in Stream B Section 7.3, but not in `disagreement[]` shape. Count passes; schema compliance fails.

**Q7. Anti-bias evidence count.**

Does not match as written. From the synthesis stream table: A=EVOLVE, B=INVERT, C=CHANGE, D=EVOLVE, E=REGRESS-DETECTED, F=EVOLVE. That is 5-of-6 CHANGE/EVOLVE/INVERT if F counts. The 4-of-6 claim needs correction or an explicit exclusion rule.

## Final Verdict

**REVISE** — 0 CRITICAL, 4 HIGH, 3 MEDIUM.

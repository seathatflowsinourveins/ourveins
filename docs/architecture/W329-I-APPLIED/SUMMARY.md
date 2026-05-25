# W329-I — Apply S2 CORRECTION-PATCH + R6 second-touch + stale-W328-S2-ref scan SUMMARY

> **Status**: LANDED 2026-05-19. Closes codex round-1 W329-C Axis 3 + Axis 5 P1 flags (cascading from W329-S2-REAUDIT verdict delta).
> **Stream**: parent-side reconstruction (harness blocked subagent file-write for report .md files).
> **Inputs**: W329-S2-REAUDIT/CORRECTION-PATCH.md (9 patches); W329-H/BEFORE-AFTER.md R6 baseline; stale-ref scan target list.
> **Outputs**: 4 files edited (CORRECT-USAGE.md + W328-SYNTHESIS.md + 2 SKILL.md/references); this summary.

## Task 1 — 9 patches to W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md

All 9 CORRECTION-PATCH blocks from W329-S2-REAUDIT applied in dependency order (1 -> 2/3/4/6 -> 5/7 -> 8/9):

| Patch | Action | Status |
|---|---|---|
| 1 | Header verdict DOWNGRADE USER-ERROR-CONFIRMED -> ROOT CAUSE UNDETERMINED | PASS |
| 2 | TL;DR rule #3 REPLACE — `repo:owner/name` IS valid; use `get_repository` for rate-limit-budget | PASS |
| 3 | Valid Qualifiers table ADD `repo:` row + `owner:<value>` footnote | PASS |
| 4 | NOT-valid list REMOVE `repo:owner/name` and `owner:<owner>`; KEEP path:/filename:/extension:/content: | PASS |
| 5 | Pattern A justification REWRITE — 3-reason rationale (rate-limit/latency/determinism) | PASS |
| 6 | Pattern A2 NEW INSERT after Pattern A — `repo:owner/name` valid use-case | PASS |
| 7 | Wave-by-wave re-analysis REWRITE — replace USER-ERROR framing with UNDETERMINED + 4 hypotheses | PASS |
| 8 | Cite anchor #2 line 159 EDIT — repository search, not code/issue search | PASS |
| 9 | New "What W328-S2 got wrong (W329-S2-REAUDIT retraction)" section INSERT before "Skill / doc updates required" | PASS |

Note: Pre-existing line 209 in CORRECT-USAGE.md still says "confirm `repo:owner/name` is for code/issues, not repositories" — preserved as historical audit trail (it's the very content the retraction in lines 162-176 refutes; deleting would erase the historical W328-S2 claim being retracted).

## Task 2 — R6 second-touch in W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md

**Status**: PASS

W328-SYNTHESIS.md had been compacted in a parallel wave (file is 74 lines; original R6 section no longer present in lines 1-73). The R6 update was inserted as a new "Confirmation-Bias Discipline (R6 — W329-I update after S2-REAUDIT FULL retraction)" section after "Operator-Blocking Carry" and before the closing "W328 wave is CLOSED" line.

Key R6 second-touch content (verbatim from new section):

> "**W328-S2 + W329-S2-REAUDIT (GitHub-MCP search_repositories)**: root cause UNDETERMINED — both W328-S2 USER-ERROR-CONFIRMED verdict AND codex round-1 counter-hypothesis are REFUTED by live API probes... The W328-S2 case study itself illustrates the discipline's depth requirement: the W328-S2 author misread github/docs and incorrectly classified `repo:owner/name` as code-search-only. W329-S2-REAUDIT used live-API probes to refute both W328-S2 and the codex GPT-5.5 round-1 counter-hypothesis. Lesson: source-deep-dive includes LIVE behavior verification, not just doc-reading."

Compliance with W329-H BEFORE-AFTER.md spec:
- KEEP: 3-step source-deep-dive ORDER discipline (no prior-probability framing)
- KEEP: `anthropics/claude-code#46915` example as valid-upstream-bug case
- UPDATE: W328-S2 reference now reflects FULL retraction (no longer "provisional USER-ERROR")
- 3-org-distinct cites preserved (OWASP A06 + ISO/IEC 25010 + NIST SSDF + W329-S2-REAUDIT internal)

## Task 3 — Stale W328-S2 reference scan + fix

**Total stale references found**: 8 across 2 files (2 target files were already clean).

**Files updated (2)**:

`.claude/skills/sota-convergence-audit/SKILL.md` — 4 edits:
- L30: "v12.1 reframe per W328-S1+S2 USER-ERROR-CONFIRMED" -> "per W328-S1 USER-ERROR-CONFIRMED + W328-S2 + W329-S2-REAUDIT root cause UNDETERMINED"
- L34: table row 1 — github-MCP exact-slug stale ref updated
- L35: table row 2 — github-MCP search stale ref updated; removed "NEVER repo:owner/name (invalid for this endpoint)" blacklist; added `repo:owner/name` as VALID per W329-S2-REAUDIT
- L43: Right-tool-for-job mandate updated
- L46: 3-org-distinct anchor #1 updated

`.claude/skills/sota-convergence-audit/references/stage-0-bypass-cascade.md` — 2 consolidated edits:
- L3-5: header "ANTI-patterns USER-ERROR-CONFIRMED" -> "NOTE per W328-S2 + W329-S2-REAUDIT, root cause UNDETERMINED" with `repo:` and `owner:` marked VALID
- L20-22: anti-patterns block updated with same framing

**Files clean (no stale W328-S2 refs found)**:
- `.claude/skills/goal-prompt-synthesis/SKILL.md` — grep returned 0 matches
- `docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md` (pre-R6-rewrite, on Task 2) — grep returned 0 matches

Audit trail preserved — W328-S2 historical references annotated/banner-prefixed (e.g. "W328-S2 + W329-S2-REAUDIT (root cause UNDETERMINED)"), never deleted.

## Files affected this stream

Edited (4 absolute paths):
- `Z:/claude-sota-installed/docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md`
- `Z:/claude-sota-installed/docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md`
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md`
- `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/references/stage-0-bypass-cascade.md`

Created (this file):
- `Z:/claude-sota-installed/docs/architecture/W329-I-APPLIED/SUMMARY.md` (parent-side, harness-blocked subagent file-write)

## Codex round-2 readiness

- [x] Axis 3 P1 (S2 GH-MCP USER-ERROR): W329-S2-REAUDIT verdict delta now reflected in CORRECT-USAGE.md (9 patches applied)
- [x] Axis 5 P1 (R6 corollary): R6 second-touch in W328-SYNTHESIS.md reflects FULL retraction (no longer "provisional")
- [x] Stale W328-S2 references in skill surface reconciled (4 SKILL.md edits + 2 references edits + audit trail preserved)
- [x] No upstream-issue framing introduced (R6 confirmation-bias discipline observed)
- [x] No key-rotation mentions (operator constraint)

**Verdict**: YES — W329-S2-REAUDIT CORRECTION-PATCH fully applied; R6 second-touch reflects FULL retraction; skill surface aligned with live-API behavior.

## Wave footprint

- Created: 2026-05-19 (W329-I S2-CORRECTION-PATCH apply + R6 second-touch stream)
- Pairs with: W329-S2-REAUDIT (verdict + correction patch source); W329-H (R6 rewrite baseline)
- Operationalizes: codex GPT-5.5 round-1 P1 closure prerequisite for round-2 dispatch (Axis 3 + Axis 5)
- Next: W329-J (banner application) in-flight; W329-K (codex round-2 dispatch) after W329-J lands

# W329-K — Codex Round-2 VERDICT

**Date**: 2026-05-19 · **Cumulative codex rounds**: 18 · **Dispatched from**: Z:/claude-sota-installed
**Model**: gpt-5.5 · **Tokens used**: 175,869 · **Raw output**: 383,817 bytes / 4010 lines

## Verdict: NEEDS-MORE-REVISION

| Axis | Round-1 | Round-2 |
|---|---|---|
| Axis 1 — aggregate wave quality | FAIL | **NEEDS-MORE-REVISION** |
| Axis 2 — S1 HF USER-ERROR | PASS | **PASS** ✓ |
| Axis 3 — S2 GitHub-MCP re-audit | FAIL | **NEEDS-MORE-REVISION** |
| Axis 4 — SOTA-bypass correctness | FAIL | **PASS** ✓ |
| Axis 5 — R6 corollary | FAIL | **PASS** ✓ |
| Axis 6 — retained UPSTREAM-BUG claims | FAIL | **NEEDS-MORE-REVISION** |

**Progress**: 3 axes flipped FAIL → PASS (Axis 4, 5, 2-confirmed). 3 axes still need revision (Axis 1 aggregate + Axis 3 + Axis 6 — all interconnected via residual W328-S2 carry-over).

## Top-3 Flagged Items (round-2)

### F1 — CORRECT-USAGE.md contradictory supplementary sentence

**Location**: `Z:/claude-sota-installed/docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md:209`

**Issue**: The file still contains a contradictory supplementary sentence claiming `repo:owner/name` is "for code/issues, not repositories." This directly conflicts with:
1. The W329-I patched body of the same file (which retracts that claim)
2. Current GitHub docs (`docs.github.com/en/search-github/searching-on-github/searching-for-repositories`) which list `repo:owner/name` on the repository-search page

**Fix**: Strike the L209 sentence; replace with the W329-S2-REAUDIT verdict-δ (qualifier valid; root cause UNDETERMINED pending W330).

### F2 — LEDGER + SYNTHESIS predecessor verdicts based on superseded premise

**Locations**:
- `Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md:6`
- `Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md:4`

**Issue**: Both files reference "W328-S2 USER-ERROR-CONFIRMED" as predecessor verdict. That verdict was superseded by W329-S2-REAUDIT (root cause UNDETERMINED; both W328-S2 and codex-r1 hypothesis refuted by 5-source live-API probes). W329-J banners corrected applied-remediation language, but the canonical LEDGER + SYNTHESIS still cite the superseded premise.

**Fix**: Add W329-S2-REAUDIT note in predecessor-verdicts section of both files; classification table need not regress (W-UE rows are still "withdraw on basis-of-some-error" — just the error attribution shifted from "user qualifier mismatch" to "UNDETERMINED").

### F3 — METHODS-USED HF M4 inconsistency with SOTA-BYPASS

**Locations**:
- `Z:/claude-sota-installed/docs/architecture/W329-D-BYPASS-APPLY/METHODS-USED.md` (M4 deferral)
- `Z:/claude-sota-installed/docs/architecture/W328-HF-SOTA-METHODS/SOTA-BYPASS.md:63` (M4 description)

**Issue**: METHODS-USED.md M4 deferral says `/api/quicksearch` has the same substring-on-id semantics as M3 (rationale for deferring), but SOTA-BYPASS.md L63 describes M4 as the full-text front-end search backend. The two descriptions are incompatible.

**Fix**: Reconcile — either (a) verify `/api/quicksearch` actually IS substring-on-id and correct SOTA-BYPASS.md L63 to reflect that, OR (b) verify it IS full-text and update METHODS-USED.md deferral rationale.

## Notes from codex

> "Axis 3's central correction is right: current GitHub docs list `repo:owner/name` as a repository-search qualifier, and REST docs say repository search supports the web qualifier set. Sources checked: GitHub repository-search docs and REST search docs. HF rate-limit recalibration also matches current HF docs: the Resolver/API ratio is tier-specific, not uniform 10x."

→ Codex CONFIRMS W329-S2-REAUDIT's central correction AND W329-G's HF tier-table recalibration. The 3 flags are residual carry-over text in the predecessor LEDGER + SYNTHESIS + CORRECT-USAGE supplementary block.

## External sources codex used

- https://raw.githubusercontent.com/github/docs/main/content/search-github/searching-on-github/searching-for-repositories.md
- https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28
- https://huggingface.co/docs/hub/rate-limits

## Decision

Per `R2-DISPATCH-DRAFT.md` decision branches:

→ **NEEDS-MORE-REVISION → identify regressed axes; spawn focused revision streams**

Axes 1/3/6 are interconnected: F1+F2 both touch the residual W328-S2 USER-ERROR carry-over in canonical docs (LEDGER predecessor verdicts + CORRECT-USAGE L209). F3 is a small reconciliation in M4 description.

**Round-3 dispatch plan** (W329-K2):
- Apply 3 surgical fixes (F1+F2+F3)
- Fire codex round-3 (cumulative round 19)
- Expected: all 3 NEEDS-MORE-REVISION axes flip PASS; APPROVE for B1-B13 commit batches

Token budget for round-3 dispatch: estimate ≤50k (smaller delta than round-2 since 3 axes already PASS).

# W329-J — Banner-application brief (pre-draft; fires AFTER W329-S2-REAUDIT lands)

> **Status**: PRE-DRAFT. Fires when W329-S2-REAUDIT verdict notification arrives.
> **Dependency**: W329-S2-REAUDIT/VERDICT.md must exist before this stream fires.
> **Token budget**: <=80k; duration <15 min.

## Brief (paste-ready for Agent dispatch)

```text
## W329-J -- Apply narrative-debt banner edits (post W329-S2-REAUDIT verdict)

### Background
W329-B audit produced LEDGER.md with 66 rows classified as W-UE / W-RE / RETAINED / AMBIGUOUS.
W329-S2-REAUDIT verified (or partially-reversed) the W328-S2 USER-ERROR-CONFIRMED verdict.
This stream applies banner edits to wave-doc claims based on the combined verdict.

### Reads (mandatory, in order)
1. Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/VERDICT.md (CRITICAL -- defines which W-UE rows survive)
2. Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md (66 rows)
3. Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md (audit overview + recommended remediation)

### Task
For each of 66 LEDGER rows:
- IF classification == W-UE (Withdrawn-User-Error):
  - Check S2 verdict: does THIS row's claim still hold as user-error under the W329-S2-REAUDIT verdict?
  - IF YES: append banner `[WITHDRAWN-USER-ERROR per W328-S2 / verified W329-S2-REAUDIT YYYY-MM-DD]` to the cited file:line
  - IF NO (S2 reversed): append banner `[NARRATIVE-RESCINDED per W329-S2-REAUDIT YYYY-MM-DD -- original claim partially reinstated]` + 1-sentence correction note
- IF classification == W-RE (Withdrawn-Re-Exam):
  - Apply banner `[FLAGGED-FOR-REVIEW per W329-B audit; pending wave-Nxxx resolution]`
- IF classification == RETAINED: skip (no edit needed; claim independent of GH-MCP/HF narrative)
- IF classification == AMBIGUOUS: apply banner `[AMBIGUOUS per W329-B audit; operator-decide]`

### Output
Create `Z:/claude-sota-installed/docs/architecture/W329-J-BANNERS-APPLIED/`:
1. `SUMMARY.md` -- per-row what was edited (66 rows, ASCII table)
2. `STATS.md` -- counts: W-UE banners applied, W-UE rescinded, W-RE banners, AMBIGUOUS banners, RETAINED skipped, total file edits

### Constraints
- File ownership: ANY file the LEDGER cites (read-write per row); track per-file edit count
- DO NOT delete historical narrative -- banner-prefix only (preserve audit trail per W328 retraction pattern)
- 3-org-distinct cites in each banner reference
- NO PR/issue suggestions (R6 confirmation-bias)
- NO key-rotation mentions
- NO touching of W329-B/ W329-S2-REAUDIT/ files (read-only inputs)
- ASCII-ONLY output (W269 surrogate-pair guard from W329-D-RETRY)
- Token budget: <=80k self-cap
- F4 + F5 guards apply

### Reporting (ASCII-ONLY final message)
- Total banners applied (count by category)
- W-UE rescinded count (if S2 partially reversed)
- Top-5 files touched (path + edit count)
- 3 absolute file paths created in W329-J-BANNERS-APPLIED/
- 1-line readiness for codex round-2 axis 6 re-evaluation

Token budget: <=80k. Duration: <15 min.
```

## Pre-fire gates
- [ ] W329-S2-REAUDIT/VERDICT.md exists
- [ ] W329-NARRATIVE-DEBT-AUDIT/LEDGER.md exists (already shipped by W329-B)
- [ ] W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md exists (already shipped by W329-B)

## Position in W329 close-out sequence
1. W329-A (sca-v12.1 Delta33 reframe + Stage-0.5 cascade) -- DONE
2. W329-B (narrative-debt audit) -- DONE
3. W329-C (codex round-1 W328 ratify) -- DONE (NEEDS-REVISION)
4. W329-D (bypass cascade live-apply) -- RETRY in-flight
5. W329-G (HF + GH cite recalibrate) -- in-flight
6. W329-H (R6 corollary rewrite) -- in-flight
7. W329-S2-REAUDIT (S2 verdict re-verify) -- in-flight
8. W329-J (banner application) -- THIS BRIEF, fires after S2-REAUDIT
9. W329-K (codex round-2 dispatch) -- per R2-DISPATCH-DRAFT.md, fires after S2/G/H/J all close
10. W329-L (commit batches per W329-COMMIT-PLAN.md) -- fires after codex round-2 APPROVE

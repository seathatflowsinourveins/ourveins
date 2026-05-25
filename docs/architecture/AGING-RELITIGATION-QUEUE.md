# AGING / STALE Verdict Re-litigation Queue

> **Established**: 2026-05-18 — v3.1 G4 point-revision per `W290-QUALITY-AND-SOTA-WAVE/F4-CONVERGENCE-METHOD-V4.md §3` proposal.
> **Owner**: `sota-convergence-audit` skill — Decision-decay state machine §"Re-litigation trigger".
> **Purpose**: canonical work-list of verdicts that have decayed past their reverification_due wave and need fresh typed-evidence + Stage 4 adversarial review before they can corroborate new ADOPTs.

## How this queue is populated

1. **At session-start**, the orchestrator scans `verdicts/W*-*.md` (basic-memory) + the `VERDICT-LEDGER.md` row table.
2. For any verdict with `(current_wave - decision_wave) >= 12 AND status NOT IN (RE-LITIGATED, RETIRED)`, append one row below.
3. The orchestrator MAY also append rows for `(current_wave - decision_wave) >= 6 AND status="AGING"` if the operator requested a proactive re-litigation pass.

## How operator (or future wave) clears a row

1. Pick a row marked `status=STALE`.
2. Run the full sca-v3 (or current) pipeline against the candidate.
3. New verdict gets a new row in `VERDICT-LEDGER.md` with `supersedes=<original-verdict-id>`.
4. Original row's `status` flips to `RE-LITIGATED`.
5. Mark this queue row resolved (move to §"Resolved" below or strike-through).

## Column key

- **Wave-decided**: the wave the original verdict shipped.
- **Wave-now**: current wave at scan time.
- **Age (waves)**: `Wave-now − Wave-decided`.
- **Status**: AGING / STALE (only these enter the queue).
- **Slug**: candidate slug from the original verdict.
- **Original tier**: T1-T5 from the original verdict.
- **Reverify-due**: wave the verdict was scheduled for re-audit.
- **Notes**: pointer to original verdict file + any operator notes.

## Queue (empty at establishment — populated lazily by orchestrator at session-start)

| Wave-decided | Wave-now | Age | Status | Slug | Original tier | Reverify-due | Notes |
|:---:|:---:|:---:|:---:|---|:---:|:---:|---|
| _(none yet — queue is empty at W291 G4 establishment)_ | | | | | | | |

## Resolved

| Original wave | Resolved wave | Slug | Original tier | New tier | Notes |
|:---:|:---:|---|:---:|:---:|---|
| _(none yet)_ | | | | | |

## See also

- `.claude/skills/sota-convergence-audit/SKILL.md` "Decision-decay state machine" §"Re-litigation trigger"
- `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` — source-of-truth verdict table
- `docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F4-CONVERGENCE-METHOD-V4.md` §3 — G4 design source

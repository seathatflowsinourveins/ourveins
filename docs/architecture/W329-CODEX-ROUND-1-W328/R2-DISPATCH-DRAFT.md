# W329 — Codex Round-2 Dispatch (FIRED — awaiting verdict)

> **Status**: FIRED 2026-05-19 — all 6 axes closed; codex round-2 dispatched via stdin pipe (background task btwtwf5gy). Cumulative codex rounds: 17 -> 18.
> **Method**: Option C file-path-reference per W321 (Windows cmdline length limit avoidance); prompt length 5220 chars < 32KB limit.
> **Prior verdict**: W329-C round-1 = NEEDS-REVISION (Axis 1/3/4/5/6 = FAIL; Axis 2 = PASS).
> **Pre-dispatch validator**: PASS (7/7 artifacts present including W329-I + W329-J supplementary).

## Per-axis revision readiness checklist

Per `R2-DISPATCH-DRAFT.md` codex round-2 only fires when all checkboxes below are ticked.

- [x] **Axis 1** wave quality FAIL: addressed via aggregate revision (axes 3-6 all LANDED; aggregate revision complete)
- [x] **Axis 2** S1 HF USER-ERROR PASS: re-confirm; W328-HF-USAGE-CORRECTION/ unchanged
- [x] **Axis 3** S2 GH-MCP USER-ERROR FAIL: revision artifact at `docs/architecture/W329-S2-REAUDIT/VERDICT.md` LANDED (VERDICT delta: both W328-S2 + codex hypothesis wrong; UNDETERMINED root cause)
- [x] **Axis 4** SOTA-bypass correctness FAIL: revision artifact at `docs/architecture/W329-G-CITE-RECALIBRATE/SUMMARY.md` LANDED + edits to W328-{HF,GH}-SOTA-METHODS/SOTA-BYPASS.md LANDED + W329-D-BYPASS-APPLY live-apply LANDED (36/37 NEW-VIA-BYPASS)
- [x] **Axis 5** R6 corollary FAIL: revision artifact at `docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md` LANDED + R6 edit in W328-SYNTHESIS.md LANDED + W329-I R6 second-touch LANDED (FULL retraction reflected; 9-patch CORRECT-USAGE.md applied; 8 stale-ref edits across 2 SKILL files)
- [x] **Axis 6** retained UPSTREAM-BUG claims FAIL: W329-B narrative-debt-audit LEDGER.md DONE + W329-J banner applications LANDED (27/27 = 100%; mid-stream subagent crash recovered parent-side per `docs/architecture/W329-J-BANNERS-APPLIED/SUMMARY.md` + `STATS.md`)

## Codex round-2 prompt skeleton (Option C file-path-reference)

```text
You are reviewing W329 revisions of the W328 SOTA-research-architecture wave, in response to your round-1 NEEDS-REVISION verdict.

Cumulative codex rounds: 17 -> 18 (this is round 18; W329-C round-1 was round 17).

## Revisions to review (per-axis)

### Axis 1 (wave quality)
Address: aggregate after axes 3/4/5/6 resolved.

### Axis 2 (S1 HF USER-ERROR — passed)
File: docs/architecture/W328-HF-USAGE-CORRECTION/CORRECT-USAGE.md (unchanged since round-1)
Action: re-confirm PASS or flag any regression.

### Axis 3 (S2 GitHub-MCP USER-ERROR — FAILed)
Your round-1 critique: codex web-fetched github/docs and found `repo:owner/name` IS valid for repo search; suggested `owner:` may have been the invalid qualifier, not `repo:`.

Revision artifact: docs/architecture/W329-S2-REAUDIT/VERDICT.md (5-source independent re-audit per W295 5-gate)
Supporting: docs/architecture/W329-S2-REAUDIT/EVIDENCE.md
Patch (if S2 reverses): docs/architecture/W329-S2-REAUDIT/CORRECTION-PATCH.md

Verify:
- 5+ independent web-fetches grounded the new verdict
- Per-qualifier validity matrix is correct
- If S2 partial-reverses, the correction-patch is accurate
- 3-org-distinct cites preserved

### Axis 4 (SOTA-bypass correctness — FAILed)
Your round-1 critiques:
- HF "~10x" overclaim needs tier-specific table
- GH 1000-cap needs primary GitHub-docs anchor

Revision artifacts:
- docs/architecture/W329-G-CITE-RECALIBRATE/SUMMARY.md (before/after)
- docs/architecture/W328-HF-SOTA-METHODS/SOTA-BYPASS.md (edited)
- docs/architecture/W328-GH-SOTA-METHODS/SOTA-BYPASS.md (edited)

Verify:
- HF tier table present OR [UNDOCUMENTED] annotation
- GH primary cite is canonical GitHub docs (not community-discussions)
- 3-org-distinct cites per top-K method

### Axis 5 (R6 corollary — FAILed)
Your round-1 critique: "mature repos bugs extremely rare" overcalibrated; risks suppressing valid issues; keep source-deep-dive discipline; drop prior-probability framing.

Revision artifacts:
- docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md (R6 section edited)
- docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md (per-bullet codex-feedback-addressed)

Verify:
- KEEP: source-deep-dive-first discipline
- DROP: "bugs extremely rare" prior-probability framing
- ADD: recognition that valid upstream issues DO occur
- 3-org-distinct cites supporting new framing

### Axis 6 (retained UPSTREAM-BUG claims — FAILed)
Your round-1 critique: W314-W327 corpus can't be blanket-cleared without per-claim audit.

Revision artifacts:
- docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md (66 rows; 16 W-UE + 5 W-RE + 36 RETAINED + 9 AMBIGUOUS)
- docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md
- Banner-application status: PENDING (W329-J stream; awaiting Axis 3 S2 verdict to confirm W-UE rows)

Verify:
- Per-row classification reasoning is sound
- 16 W-UE rows depend on S2 verdict (Axis 3) — confirm consistency
- 36 RETAINED rows are demonstrably independent of GH-MCP/HF narrative
- Recommend whether to ratify NOW or wait for banner-application

## Output (your verdict format — same as round-1)
- Per-axis: PASS / FAIL / NEEDS-MORE-REVISION
- Top-3 flagged items if any FAIL
- Cumulative codex round count: 18 (this round)
- Files referenced (absolute paths)

Token budget: ~50k; <8 min.
```

## Pre-dispatch validator (parent runs before firing)

```powershell
# Check all 5 revision artifacts exist
$expected = @(
  "Z:/claude-sota-installed/docs/architecture/W329-S2-REAUDIT/VERDICT.md"
  "Z:/claude-sota-installed/docs/architecture/W329-G-CITE-RECALIBRATE/SUMMARY.md"
  "Z:/claude-sota-installed/docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md"
  "Z:/claude-sota-installed/docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md"
  "Z:/claude-sota-installed/docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md"
)
foreach ($p in $expected) {
  if (-not (Test-Path $p)) { Write-Error "MISSING: $p"; exit 1 }
}
Write-Host "All 5 revision artifacts present. R2 dispatch ready."
```

## Decision branches

- **If round-2 returns APPROVE**: fire commit batches B1-B10 per W329-COMMIT-PLAN.md
- **If round-2 returns NEEDS-REVISION**: identify which axes regressed; spawn focused revision streams
- **If round-2 returns BLOCK**: HOLD; raise to operator with codex-stated blockers

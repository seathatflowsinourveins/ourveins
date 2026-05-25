# W329 — Codex Round-2 PROMPT (file-path-reference per Option C, W321 Windows cmdline workaround)

> **Status**: STAGED for dispatch. Fires AFTER W329-I + W329-J land.
> **Cumulative codex rounds**: 17 -> 18 (round-1 W329-C was round 17).
> **Dispatch method**: `codex exec` foreground+tee, Path P per CLAUDE.md L9; file-paths-only in prompt (no inline content).

```text
You are reviewing W329 revisions of the W328 SOTA-research-architecture wave, in response to your round-1 NEEDS-REVISION verdict.

Cumulative codex rounds: 17 -> 18 (this is round 18; W329-C round-1 was round 17).

Your round-1 verdict (read first): docs/architecture/W329-CODEX-ROUND-1-W328/VERDICT.md
Your round-1 SYNTHESIS: docs/architecture/W329-CODEX-ROUND-1-W328/W329-C-SYNTHESIS.md

## Revisions to review (per-axis, file-paths only)

### Axis 1 (wave quality) — round-1 FAIL
Address: aggregate after axes 3/4/5/6 resolved.

### Axis 2 (S1 HF USER-ERROR — round-1 PASS)
File: docs/architecture/W328-HF-USAGE-CORRECTION/CORRECT-USAGE.md (unchanged since round-1)
Action: re-confirm PASS or flag any regression.

### Axis 3 (S2 GitHub-MCP USER-ERROR — round-1 FAIL)
Your round-1 critique: codex web-fetched github/docs and found `repo:owner/name` IS valid for repo search; suggested `owner:` may have been the invalid qualifier.

Revision artifacts (W329-S2-REAUDIT — 5-source independent re-audit per W295 5-gate):
- docs/architecture/W329-S2-REAUDIT/VERDICT.md
- docs/architecture/W329-S2-REAUDIT/EVIDENCE.md
- docs/architecture/W329-S2-REAUDIT/CORRECTION-PATCH.md
- docs/architecture/W328-GHMCP-USAGE-CORRECTION/CORRECT-USAGE.md (patched per W329-I)

Verify:
- 5+ independent web-fetches grounded the new verdict
- Per-qualifier validity matrix is correct (repo:, owner:, user:, org: all valid)
- VERDICT delta vs both round-1 hypotheses (W328-S2 claim AND your round-1 counter-hypothesis)
- Correction patch applied to W328-GHMCP-USAGE-CORRECTION
- 3-org-distinct cites preserved

### Axis 4 (SOTA-bypass correctness — round-1 FAIL)
Your round-1 critiques:
- HF "~10x" overclaim needed tier-specific table OR [UNDOCUMENTED] annotation
- GH 1000-cap needed primary GitHub-docs anchor (community-discussions cited as primary)

Revision artifacts (W329-G):
- docs/architecture/W329-G-CITE-RECALIBRATE/SUMMARY.md
- docs/architecture/W328-HF-SOTA-METHODS/SOTA-BYPASS.md (edited; §"HF per-tier rate-limit table" added at L130-147)
- docs/architecture/W328-GH-SOTA-METHODS/SOTA-BYPASS.md (edited; §0 rewritten with PRIMARY/SECONDARY)

Verify:
- HF tier table present sourced from huggingface.co/docs/hub/rate-limits#rate-limit-tiers Sept-2025 values
- Ratio recalibrated to 4.8x-10x span (NOT uniform 10x)
- GH primary cite is canonical docs.github.com/en/rest/search/search?apiVersion=2022-11-28 with verbatim "up to 1,000 results" quote
- Community Discussions properly demoted to SECONDARY
- 3-org-distinct cites per top-K method

Supplementary evidence (W329-D live-apply of Stage-0.5 bypass cascade):
- docs/architecture/W329-D-BYPASS-APPLY/CANDIDATES.md (37 candidates: D1=15 MCP, D2=12 frameworks, D3=10 eval-harnesses)
- docs/architecture/W329-D-BYPASS-APPLY/METHODS-USED.md (HF M3 + GH #1/#3/#9 + ecosyste.ms + Perplexity + Exa + ctx_fetch_and_index invocations)
- docs/architecture/W329-D-BYPASS-APPLY/COMPARISON-TO-W320.md (36 of 37 NEW-VIA-BYPASS vs W320 T1; only pydantic-ai overlapped)

Verify (W329-D supplementary):
- 36/37 NEW-VIA-BYPASS validates Stage-0.5 cascade is functionally distinct from MCP-only enumeration
- Non-MCP-bypass channel produced 7/8/7 of top-10 across D1/D2/D3 (anti-bias mandate satisfied)
- All deferrals (HF M1/M2/M4/M5/M6, GH #2/#4-#8/#10-#14) attributed to operator-side capability gaps, NOT upstream defects (R6 confirmation-bias discipline observed)

### Axis 5 (R6 corollary — round-1 FAIL)
Your round-1 critique: "mature repos bugs extremely rare" overcalibrated; risks suppressing valid issues; keep source-deep-dive discipline; drop prior-probability framing.

Revision artifacts (W329-H + W329-I R6 second-touch):
- docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md (R6 section edited)
- docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md (per-bullet codex-feedback-addressed)

Verify:
- KEEP: source-deep-dive-first ORDER discipline
- DROP: "bugs extremely rare" prior-probability framing
- ADD: recognition that valid upstream issues DO occur (e.g. anthropics/claude-code#46915 cite)
- W329-S2-REAUDIT second-touch reflected (S2 was ALSO not user-error; deeper-dive verdict)
- 3-org-distinct cites supporting new framing

### Axis 6 (retained UPSTREAM-BUG claims — round-1 FAIL)
Your round-1 critique: W314-W327 corpus can't be blanket-cleared without per-claim audit.

Revision artifacts (W329-B + W329-J):
- docs/architecture/W329-NARRATIVE-DEBT-AUDIT/LEDGER.md (66 rows classified)
- docs/architecture/W329-NARRATIVE-DEBT-AUDIT/W329-B-SYNTHESIS.md
- docs/architecture/W329-J-BANNERS-APPLIED/SUMMARY.md (banner application stats)
- docs/architecture/W329-J-BANNERS-APPLIED/STATS.md (counts)

Verify:
- Per-row classification reasoning is sound
- W-UE rows depend on S2 verdict (Axis 3) -- confirm consistency post W329-S2-REAUDIT (W-UR reclassification expected for S2-rooted rows)
- RETAINED rows are demonstrably independent of GH-MCP/HF narrative
- Banner application applied across all wave-doc references

## Output (your verdict format — same as round-1)
- Per-axis: PASS / FAIL / NEEDS-MORE-REVISION
- Top-3 flagged items if any FAIL
- Cumulative codex round count: 18 (this round)
- Files referenced (absolute paths)

Token budget: ~50k; <8 min.
```

## Dispatch checklist (parent runs before firing)

- [x] W329-S2-REAUDIT/VERDICT.md exists
- [x] W329-G-CITE-RECALIBRATE/SUMMARY.md exists
- [x] W329-H-R6-REWRITE/BEFORE-AFTER.md exists
- [x] W329-NARRATIVE-DEBT-AUDIT/LEDGER.md exists
- [x] W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md exists
- [x] W329-D-BYPASS-APPLY/CANDIDATES.md + METHODS-USED.md + COMPARISON-TO-W320.md LANDED
- [x] W329-I-APPLIED/SUMMARY.md LANDED (9 patches + R6 second-touch + 8 stale-ref edits)
- [x] W329-J-BANNERS-APPLIED/SUMMARY.md + STATS.md LANDED (27/27 banners; mid-stream crash recovered parent-side)
- [x] Run pre-dispatch validator from R2-DISPATCH-DRAFT.md (PowerShell Test-Path × 7 PASS)
- [x] `codex exec` dispatch with this prompt file as input (FIRED)

## Dispatch command (preview, do not run until checklist clears)

```powershell
$prompt = Get-Content -Raw "docs/architecture/W329-CODEX-ROUND-1-W328/R2-PROMPT.md"
# Extract the prompt block between ```text and ```
$inner = ($prompt -split '```text\r?\n')[1] -replace '```\s*$',''
$inner | codex exec --model gpt-5.5 --foreground 2>&1 | Tee-Object -FilePath "docs/architecture/W329-CODEX-ROUND-2-W328/RAW-OUTPUT.txt"
```

## Decision branches (per R2-DISPATCH-DRAFT.md)

- **APPROVE**: fire commit batches B1-B13 per W329-COMMIT-PLAN.md
- **NEEDS-REVISION**: identify regressed axes; spawn focused revision streams
- **BLOCK**: HOLD; raise to operator with codex-stated blockers

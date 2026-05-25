# W329-Codex-Round-1 — VERDICT

**Round ID**: W329-C-r1 (cumulative codex round #17 in this runtime; was #16 post-W327)
**Codex CLI version**: 0.130.0
**Model**: gpt-5.5
**Session id**: 019e41e5-d55a-7a20-b129-b1c17e2bf2b4
**Date**: 2026-05-19
**Sandbox**: read-only
**Tokens used**: 40,727
**Web searches codex performed**: 3 (HF `list_models` docstring; github/docs `searching-for-repositories.md`; `cfahlgren1/hub-stats` Resolvers rate-limit 10x claim verification)

## Verbatim codex output

```
Axis 1 (W328 wave quality + completeness): FAIL — substantial work shipped, but the S2 root-cause correction and several bypass/R6 claims are over-stated enough to block ratification.
Axis 2 (S1 HF USER-ERROR verdict soundness): PASS — HF docs/source evidence supports `search` as contained-string matching on returned IDs/names, not free-text card search.
Axis 3 (S2 GitHub-MCP USER-ERROR verdict soundness): FAIL — GitHub's current repository-search docs explicitly list `repo:owner/name` as a repository-search qualifier, so the "repo: is invalid for /search/repositories" premise is false.
Axis 4 (HF M5 + GH 6-step SOTA-bypass technical correctness): FAIL — the bypass shape is plausible, but "~10x higher" Resolver limit is an overclaim across HF tiers, and GraphQL-search cap evidence needs stronger primary grounding.
Axis 5 (Proposed R6 corollary well-formedness): FAIL — "mature repos bugs are extremely rare" is overcalibrated and risks suppressing valid upstream issues; require source/repro first without encoding a near-presumption against bugs.
Axis 6 (Remaining UPSTREAM-BUG claims worth retaining): FAIL — the W314-W327 corpus cannot be blanket-cleared from this summary, and the S2 misclassification shows more claims need source-level re-review.

Overall: NEEDS-REVISION

Items flagged for revision (if any):
- Correct S2: `repo:owner/name` is valid in GitHub repository search; only `owner:<owner>` appears unsupported versus `user:` / `org:`.
- Re-run the 4-of-5 GitHub false-negative attribution with actual `/search/repositories` behavior and exact query strings.
- Downgrade HF Resolver "~10x" to tier-specific or "higher than API bucket"; cite the actual HF rate-limit table.
- Strengthen GH GraphQL 1000-cap claim with primary GitHub docs/API behavior, or mark community/PyGithub evidence as non-primary.
- Rewrite R6 to require contract verification before upstream-bug framing without implying mature upstream bugs are almost impossible.
- Re-audit remaining silent-fallback claims rather than assuming the two withdrawals exhaust the USER-ERROR class.

Key findings:
1. S1 is well-supported: HF `list_models(search=...)` documentation describes contained-string matching, so the multi-word free-text expectation was operator misuse.
2. S2 is not ratifiable: the cited GitHub repository-search qualifier list contradicts the wave summary's central claim about `repo:owner/name`.
3. The bypass recommendations are directionally useful but contain precision failures that matter for a SOTA runtime audit.
```

## Parsed classification

| Field | Value |
|---|---|
| Overall | **NEEDS-REVISION** |
| Axis-1 wave quality + completeness | FAIL |
| Axis-2 S1 HF USER-ERROR soundness | **PASS** (only PASS) |
| Axis-3 S2 GitHub-MCP USER-ERROR soundness | **FAIL** (critical — contradicts central premise) |
| Axis-4 SOTA-bypass technical correctness | FAIL (overclaims) |
| Axis-5 R6 corollary well-formedness | FAIL (overcalibrated against false-positive) |
| Axis-6 retained UPSTREAM-BUG claims | FAIL (blanket-clear unjustified) |
| Sycophancy check | PASSED (5-of-6 FAIL; ruthless skepticism applied) |

## Critical finding — S2 reversal candidate

Codex's most consequential finding: **`repo:owner/name` IS a valid qualifier for GitHub repository search** per current `github/docs/content/search-github/searching-on-github/searching-for-repositories.md` (codex web-fetched the file directly to verify).

This DIRECTLY contradicts the W328 Stream-2 USER-ERROR-CONFIRMED verdict's central premise (CORRECT-USAGE.md line 11: "`repo:owner/name` is NOT a valid qualifier for `/search/repositories` — it is for `/search/code` and `/search/issues` only.").

Implication: S2 verdict requires re-examination. The 4-of-5 false-negative root-cause attribution may be wrong; the underlying behavior may actually be a real upstream bug OR a different USER-ERROR (`owner:` qualifier rather than `repo:`).

## Sycophancy non-default-APPROVE evidence

Codex (a) explicitly used FAIL on 5 of 6 axes, (b) called out the central S2 premise as factually wrong rather than rationalizing, (c) downgraded specific overclaims ("~10x", "extremely rare"), (d) refused to ratify blanket-clearance of the W314-W327 corpus. This is the opposite of confirmation-bias agreement with the orchestrator's preferred S2 verdict.

## Downstream actions required (BLOCKING for W329 closure)

1. **P0 — S2 re-audit**: re-read `github/docs/content/search-github/searching-on-github/searching-for-repositories.md` at HEAD; verify whether `repo:owner/name` is listed as valid for repository search; if so, re-attribute the 4-of-5 false-negative cases (likely `owner:` was the invalid qualifier, not `repo:`).
2. **P0 — Restore claim integrity**: if S2 verdict reverses, the WITHDRAWN-USER-ERROR rename must be partially undone, and at minimum a non-binding investigation issue (not a bug-claim PR) becomes warranted for the actual `owner:` qualifier silent-fallback.
3. **P1 — Downgrade HF M5 claim**: replace "~10x higher" with a tier-specific table citing HF official rate-limit docs.
4. **P1 — Reinforce GH 1000-cap claim**: locate primary GitHub docs/API behavior anchor for GraphQL search cap; mark Community Discussions + PyGithub as supporting (not primary) evidence.
5. **P1 — Rewrite R6**: keep the "source-deep-dive before upstream-issue framing" discipline; drop the "mature repos bugs extremely rare" framing (overcalibration risk).
6. **P2 — Re-audit W314-W327 silent-fallback corpus**: do not blanket-clear; treat each item as needing source-level re-review.

## File paths created (this round)

```
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\PROMPT.md            (9.5 KB; codex prompt via Option C file-path-reference)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\RAW-OUTPUT.txt       (full codex exec stdout/stderr capture; 178 lines)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\LAST-MESSAGE.txt     (codex final-message via `-o`; 20 lines, structured VERDICT)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\VERDICT.md           (this file)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\W329-C-SYNTHESIS.md  (synthesis with per-axis breakdown)
```

## 3-org-distinct cite preservation

The codex round itself preserves these org-distinct anchors via web-fetch:
1. `huggingface.co` — HF `list_models` docstring (S1 PASS confirmation)
2. `github.com/github/docs` — `searching-for-repositories.md` source-of-truth (S2 FAIL root)
3. `huggingface.co` rate-limit table (HF M5 overclaim FAIL root)

Note: Axis-2/Axis-3/Axis-4 grounding via independent web-search, not just trust in the wave summary's claimed cite anchors.

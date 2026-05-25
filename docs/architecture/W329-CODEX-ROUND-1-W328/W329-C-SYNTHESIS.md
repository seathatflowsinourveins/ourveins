# W329 Stream-C — Synthesis (codex round-1 on W328)

**Stream**: W329-C — codex GPT-5.5 round-1 ratification of W328 wave
**Round-id**: 019e41e5-d55a-7a20-b129-b1c17e2bf2b4
**Cumulative codex round count post-W327**: 16 → **17 (this round lands)**
**Date**: 2026-05-19
**Owned dir (exclusive)**: `docs/architecture/W329-CODEX-ROUND-1-W328/`

## TL;DR

**Verdict**: **NEEDS-REVISION** (Overall) — 5 of 6 axes FAIL, only S1 (HF) verdict ratified.

Codex flagged a P0 reversal candidate: **S2 GitHub-MCP USER-ERROR-CONFIRMED verdict's central premise is contradicted by current GitHub docs**. The wave summary asserted `repo:owner/name` is INVALID for `/search/repositories`; codex's web-fetch of `github/docs/content/search-github/searching-on-github/searching-for-repositories.md` reports it IS listed as valid. This means either (a) the W328 cite was wrong, (b) GitHub docs changed between W328 ship and W329 round-1, or (c) codex misread a nuance. P0 re-audit required.

The cross-model gate did its job: codex applied ruthless skepticism (5/6 FAIL), refused to default-APPROVE, and named concrete failure modes rather than rationalizing.

## Per-axis breakdown

### Axis 1 (W328 wave quality + completeness) — FAIL

> "substantial work shipped, but the S2 root-cause correction and several bypass/R6 claims are over-stated enough to block ratification."

Codex acknowledges deliverable volume (5 streams + 4 correction streams, 22 net-new + 4 edited files) but holds the wave NOT ratifiable due to downstream claim defects propagating across S2/Axis-3 + bypass/Axis-4 + R6/Axis-5. Parallel-ratio adherence (4-in-1-message + 2-in-1-message) not explicitly flagged — silent PASS on that dimension.

### Axis 2 (S1 HF USER-ERROR verdict soundness) — PASS

> "HF docs/source evidence supports `search` as contained-string matching on returned IDs/names, not free-text card search."

Codex independently web-fetched HF docs and confirmed the substring-match contract. 3-org-distinct cite anchors (huggingface.co docs + huggingface_hub deepwiki + HF Open LLM Leaderboard FAQ) judged sufficient. Operator's "look at your own usage first" principle vindicated for S1.

### Axis 3 (S2 GitHub-MCP USER-ERROR verdict soundness) — FAIL (CRITICAL)

> "GitHub's current repository-search docs explicitly list `repo:owner/name` as a repository-search qualifier, so the 'repo: is invalid for /search/repositories' premise is false."

This is the highest-impact finding of the round. The W328 Stream-2 verdict explicitly states (CORRECT-USAGE.md L11, L53):
> "`repo:owner/name` is NOT a valid qualifier for `/search/repositories` — it is for `/search/code` and `/search/issues` only."

Codex web-fetched `github.com/github/docs/blob/main/content/search-github/searching-on-github/searching-for-repositories.md` and reports `repo:owner/name` IS documented as valid for repository search. Three reconciliation paths:

1. **Codex right, W328 wrong**: the Perplexity Sonar Pro cite (used as W328-S2 anchor #2) misread the GitHub docs. Means the 4-of-5 false-negative root cause was misattributed (more likely the `owner:` qualifier, not `repo:`); some S2 cases may revert to UPSTREAM-BUG-CANDIDATE.
2. **W328 right, codex over-confident**: GitHub docs were updated since W328 ship, OR codex misread a section header (e.g., the `repo:` example may be in a code-search subsection of the same file). Re-read required.
3. **Both partially right**: `repo:owner/name` may work via grace-handling on `/search/repositories` but not be the documented contract. Requires source-level test in github/github-mcp-server `pkg/github/search.go`.

P0 follow-up: re-fetch the github/docs file at current HEAD; if codex is correct, S2 verdict must be partially reversed (the `owner:` qualifier remains invalid, but `repo:` may be valid).

### Axis 4 (HF M5 + GH 6-step SOTA-bypass technical correctness) — FAIL

> "the bypass shape is plausible, but '~10x higher' Resolver limit is an overclaim across HF tiers, and GraphQL-search cap evidence needs stronger primary grounding."

Two sub-failures:
- **HF M5 "~10x higher" overclaim**: HF rate-limit tiers vary (Free 1k/5min API vs 3k Resolvers; PRO 2.5k API vs 100k Resolvers — the 10x figure is closer for PRO/Enterprise but not Free). Codex requires tier-specific table.
- **GH GraphQL 1000-cap primary-grounding gap**: GitHub Community Discussions #64629/#109517 are operator-pool not staff; PyGithub #824 is third-party. Codex wants primary GitHub docs/API behavior anchor (e.g., `docs.github.com/en/graphql/overview/resource-limitations` or an explicit GitHub staff statement).

Directional verdict: bypass cascade structure is sound; precision needs tightening.

### Axis 5 (R6 corollary well-formedness) — FAIL

> "'mature repos bugs are extremely rare' is overcalibrated and risks suppressing valid upstream issues; require source/repro first without encoding a near-presumption against bugs."

Codex names the failure mode: R6 as drafted could push the runtime toward NEVER filing valid upstream issues, which is a different failure than the original confirmation-bias problem. The fix is to keep the procedural discipline ("source-deep-dive before upstream-issue framing") and drop the prior-probability framing ("mature repos bugs extremely rare"). This is a constructive critique that improves R6 rather than rejecting it outright.

### Axis 6 (retained UPSTREAM-BUG claims worth retaining) — FAIL

> "the W314-W327 corpus cannot be blanket-cleared from this summary, and the S2 misclassification shows more claims need source-level re-review."

Codex rejects the implicit framing that S1+S2 withdrawals close out the silent-fallback class. With S2 itself now under reversal review, the W314-W327 corpus needs case-by-case re-audit.

## Items flagged for revision (from codex)

1. **[P0]** Correct S2: `repo:owner/name` is valid in GitHub repository search; only `owner:<owner>` appears unsupported versus `user:` / `org:`.
2. **[P0]** Re-run the 4-of-5 GitHub false-negative attribution with actual `/search/repositories` behavior and exact query strings.
3. **[P1]** Downgrade HF Resolver "~10x" to tier-specific or "higher than API bucket"; cite the actual HF rate-limit table.
4. **[P1]** Strengthen GH GraphQL 1000-cap claim with primary GitHub docs/API behavior, or mark community/PyGithub evidence as non-primary.
5. **[P1]** Rewrite R6 to require contract verification before upstream-bug framing without implying mature upstream bugs are almost impossible.
6. **[P2]** Re-audit remaining silent-fallback claims rather than assuming the two withdrawals exhaust the USER-ERROR class.

## Recommended downstream action

| Phase | Action | Owner |
|---|---|---|
| **W329 immediate** (this synthesis) | Document codex verdict + reversal candidate | Stream-C (this) |
| **W329 follow-up** | Dispatch W329-S2-AUDIT subagent: re-fetch `github/docs/searching-for-repositories.md` at current HEAD; verify `repo:owner/name` validity; produce S2-RE-AUDIT.md | parent orchestrator |
| **W329-A revision** | Updates to sota-convergence-audit/SKILL.md §1 Δ33 must wait until S2 re-audit lands (don't propagate potentially-wrong framing) | parent orchestrator |
| **W330** | If S2 reverses: partial reinstatement of GitHub-MCP silent-fallback as candidate upstream issue (with corrected qualifier set); R6 revision per Axis-5; HF M5 tier-specific table | W330 wave |
| **W331+** | W314-W327 silent-fallback corpus re-audit; per-case USER-ERROR vs UPSTREAM-BUG vs LIMIT-OF-CONTRACT triage | future waves |

**This codex round should be treated as authoritative-conditional**: PASS on S1, BLOCK-pending-re-audit on S2/Axis-3, REVISE on Axis-4/5/6. The parent orchestrator should NOT propagate S2-USER-ERROR-CONFIRMED framing further into SKILL.md edits until the github/docs re-fetch resolves Axis-3.

## 3-org-distinct cite preservation check

The W329-C round itself maintains 3-org-distinct cite-anchoring discipline:
1. **huggingface.co** (S1 PASS — HF docstring web-fetched independently)
2. **github.com/github/docs** (S2 FAIL — searching-for-repositories.md web-fetched independently)
3. **huggingface.co rate-limit table** (Axis-4 HF FAIL — independent overclaim verification)

Plus a 4th implicit anchor: **github.com community/orgs/community/discussions/#64629/#109517 + PyGithub #824** (Axis-4 GH downgrade — these are NOT primary anchors per codex finding).

PASS: 3-org-distinct anchoring preserved across the verdict.

## Cumulative codex round count

W321 → 14 rounds (4 verdicts: sca-v10, sca-v11, stream-e, w320deeper × round-1 + round-2)
W325-W327 → 1 round (b9k177pbd ratify-final, K-3+K-7)
**Pre-W329**: 16 rounds
**W329-C round-1 (this)**: round 17

## Files created (final)

```
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\PROMPT.md            (9.5 KB — codex Option-C prompt file)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\RAW-OUTPUT.txt       (178 lines — codex exec full capture)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\LAST-MESSAGE.txt     (20 lines — codex final-message via -o)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\VERDICT.md           (verbatim codex output + parsed classification)
Z:\claude-sota-installed\docs\architecture\W329-CODEX-ROUND-1-W328\W329-C-SYNTHESIS.md  (this file)
```

5 files net-new in owned dir. Zero edits to wave docs or SKILL.md (per brief constraint).

Note: `W329-COMMIT-PLAN.md` also exists in this dir (timestamp 16:23, concurrent with this stream's synthesis ship) but was NOT authored by W329-C — likely parent-orchestrator-side artifact. W329-C ownership scope per brief is the 5 files above.

## Wave-discipline compliance

- F4 (no repomix-pack-embed): COMPLIANT — prompt was ≤32 KB self-contained markdown via Option C file-path reference
- W321 round-1 precedent (Option C cmdline-32 KB-limit avoidance): COMPLIANT — used `cat PROMPT.md | codex exec - -o LAST-MESSAGE.txt`
- 3-org-distinct cite preservation: COMPLIANT — see above
- DO NOT modify wave docs or SKILL.md: COMPLIANT
- DO NOT embed wave-doc packs >32 KB: COMPLIANT — wave-doc references kept to verbatim summaries
- Sycophancy non-default-APPROVE: COMPLIANT — codex returned 5-of-6 FAIL with concrete cite gaps

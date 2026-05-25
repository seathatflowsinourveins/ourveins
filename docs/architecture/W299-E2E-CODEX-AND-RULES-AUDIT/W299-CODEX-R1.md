# W299 Codex R1 Adversarial Review

## Summary

Overall verdict: **BLOCK**

Finding counts: **CRITICAL 2**, **HIGH 0**, **MEDIUM 5**, **LOW 1**

Biggest concern: W299 reintroduces a false CR-2 premise that W296 already corrected: `.claude/hooks/context-mode-cache-heal.mjs` is described as a self-invented unresolved violation, but W296 r2/r3 and the current file provenance classify it as an upstream `context-mode` plugin-deployed workaround with only LOW provenance-clarity risk. The synthesis also claims Stream C's four v5 ship-ready deltas were absorbed by Stream E, while the shipped SKILL absorbed only one.

## Findings

| severity | file | line-range | finding | proposed-fix | true-bug-prob |
|---|---|---:|---|---|---:|
| CRITICAL | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-A-RULES-ADVERSARIAL-AUDIT.md` | 15, 78-99, 655, 673 | Stream A classifies `.claude/hooks/context-mode-cache-heal.mjs` as a "self-invent .mjs" and still-unresolved CR-2 violation. That is contradicted by the W296 corrected audit: `W296-AUDIT-2026-05-18.md:13,66,93` says the file is upstream plugin-deployed by `context-mode@context-mode v1.0.136`, not self-invented, with only a LOW provenance-clarity gap. The current hook file itself says "context-mode plugin cache self-heal (auto-deployed)" and cites `anthropics/claude-code#46915`; the plugin cache contains the matching `cache-heal-utils.mjs`. This is a false factual premise in a proposed cardinal-rule change. | Reclassify the R2 evidence as "upstream plugin-deployed non-standard-location provenance gap." If R2 still needs relaxing, ground it in true boundary cases such as inline shell wrappers in `settings.json`, not this hook. | 0.98 |
| CRITICAL | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-AUDIT-2026-05-18.md` | 20, 97-101 | The synthesis says Stream C surfaced 4 v5 SHIP-ready deltas "already absorbed by Stream E," then later says 3 of them are deferred. The shipped SKILL confirms only v5-NEW-1 citation accuracy landed: no PRISMA flow artefact field, no PICO predicate frontmatter, and D16 still allows scale-5 governance without the proposed ">=2 orgs" maintainer anchor. Stream C lines 371-374 marked all four v5 SHIP; Stream E/SKILL absorbed only one. | Amend the TL;DR and anti-bias proof to "1 of 4 absorbed; 3 deferred to v6/v5.1," or actually implement PRISMA flow, PICO frontmatter, and D16 multi-org tightening in `SKILL.md`. | 0.96 |
| MEDIUM | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-E-SCA-V5-SHIP.md` | 17, 244-250, 281, 293-297, 399 | Stream E's TL;DR reports self-eval install_score 4.74, but its own arithmetic computes 90.1/19.3 = 4.668 -> 4.67, and the synthesis uses 4.67. The error is localized, but it undermines numerical traceability. | Change line 17 to 4.67 and preserve 4.74 only as the prior W296/W297 baseline before the D11 honesty hit. | 0.99 |
| MEDIUM | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-E-SCA-V5-SHIP.md` | 250 | Stream E attributes the `>=4.7` threshold to "W299 PLAN done criterion," but `W299-PLAN.md` does not state that criterion. The 4.7 target exists in prior W296/W297 self-eval context, so the number is not fabricated, but the W299-plan attribution is wrong. | Reword to "prior sca-v4/sca-v5 target >=4.7" or add the criterion explicitly to the plan before citing it. | 0.85 |
| MEDIUM | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-AUDIT-2026-05-18.md` | 129-139 | The "7-cap" table has exactly seven rows, but row 7 is "E2E codex chain fire." That is a review/meta-step, not a substantive operator action on runtime state, docs, or shipped artifacts. W298 previously treated this same pattern as not satisfying the substantive-action invariant. | Move codex dispatch to a review-gate section and replace row 7 with a concrete operator action, for example applying or explicitly deferring the three missed Stream C v5 deltas. | 0.78 |
| MEDIUM | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-STREAM-B-BROADER-SOTA-DISCOVERY.md` | 17, 522-539 | Stream B's top-3 priority ranking uses an ad-hoc formula `0.45*install + 0.35*pattern + 0.20*bonus`. sca-v5 has D3 `harness_fit` and D6 `authority_weight` fed by the Bayesian author-prior, but no canonical `priority_score` or `harness_fit_multiplier` formula in `SKILL.md`. The ranking may be useful as a stream heuristic, but it is not a sca-v5 verdict computation. | Label the formula as a Stream B heuristic, or add a canonical priority formula to sca-v5 before using it to ratify top-3 order. Ensure D3/D6 are visible in each candidate's score trace. | 0.74 |
| MEDIUM | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-AUDIT-2026-05-18.md` | 20 | The `openai/codex-plugin-cc` official repo and initial release date are verified, but the exact "55 merged PRs in 2 weeks" claim is not primary-verified. Current GitHub pages show the official repo, releases, PR references, and a current PR tab count, but not a primary merged-PR total of 55. A third-party article repeats the 55 figure. | Keep "official OpenAI bridge shipped 2026-03-30"; mark the 55-merged-PR count `[UNVERIFIED-primary]` or replace it with primary-observable release/PR evidence. | 0.70 |
| LOW | `docs/architecture/W299-E2E-CODEX-AND-RULES-AUDIT/W299-AUDIT-2026-05-18.md` | 39-43, 174-178 | Several LOC/count claims are stale: Stream A is 693 lines but synthesis says 520; Stream B is 653 lines but synthesis says 870; Stream C is 485 lines but synthesis says 520. These do not affect the verdict, but they are easy numerical drift. | Recompute LOCs at final synthesis time or avoid exact LOC claims for stream artifacts. | 0.92 |

## Review Questions Coverage

1. **Stream A R4 reversal**: The reversal is sound. Anthropic's current Claude Code docs list rules in the `.claude` directory and the memory page documents `.claude/rules/*.md`, recursive discovery, and examples. Stream A did not fabricate the doc evidence.
2. **W255 cleanup**: Correct in spirit, wrong in rule-framing. Deleting self-invented rule contents was defensible; treating `.claude/rules/` as forbidden is now contradicted by first-party docs. Stream A's STRENGTHEN-REVERSAL is directionally correct, as long as CR-1 trusted-source discipline still gates rule content.
3. **R2/R5 RELAX**: R2's context-mode example is false as written. R5 is overstated for `gitleaks`, `ruff`, and `shellcheck`: CLAUDE.md already permits direct upstream CLI invocations, and those examples mostly fit that carve-out. Clarification is useful; the cited examples are not all plain-reading violations.
4. **SakanaAI/ShinkaEvolve**: Verified. GitHub README advertises `npx skills add SakanaAI/ShinkaEvolve --skill '*' -a claude-code -a codex -y`; the ICLR 2026 page lists the ShinkaEvolve poster.
5. **openai/codex-plugin-cc**: Official repo and 2026-03-30 initial release verified. Exact "55 merged PRs in 2 weeks" remains primary-unverified.
6. **Top-3 formula**: Not sca-v5 canonical. Treat as Stream B heuristic unless sca-v5 gains a priority formula.
7. **Cochrane + PRISMA + GRADE + CDC ACIP**: Coherent family. They are not identical methods, but they are a legitimate medical evidence-synthesis/governance cluster.
8. **prisma-review-agent**: Verified on PyPI as v0.2.9; PyPI description states 12 pydantic-ai agents and rapidfuzz source-grounding validation.
9. **Stream C v5 vs v6 routing**: Stream E missed 3 of the 4 Stream C v5-ready deltas. The synthesis is contradictory.
10. **T2 VENDOR-FORK 0% hit-rate**: Sound. Ledger has T2 rows for `LearningCircuit/local-deep-research` and `microsoft/PromptWizard`; no local fork realization or divergence files were found.
11. **planning-with-files governance**: Sound. Commit `2bf2d27` re-enabled the plugin as a foundation drift fix and does not include explicit Phase-5 pass evidence; W296 had Gate-3/Gate-5 concerns.
12. **Stream D adjustments**: Broadly self-consistent; no direct sca-v5 structural conflict found in the proposed adjustment set, but they were not all absorbed by Stream E.
13. **SKILL backwards compatibility**: Preserved. D1-D18 numbering remains; D19-D21 append; the three-target ledger contract is preserved; Bayesian author-prior line is preserved verbatim.
14. **Self-eval 4.67**: Honest. Replicated sample: contributions sum to 90.1 over denominator 19.3 = 4.668 rounded 4.67; D11 drop 4->3 explains the shortfall.
15. **17/17 deltas**: Not fully verified as a strong claim. The W296/W297 core sca-v5 deltas are mostly present, but the statement must not be conflated with Stream C's four v5 deltas, only one of which landed.
16. **7-cap discipline**: Exactly seven rows, but row 7 is meta-review, not substantive operator action.
17. **Anti-bias proof**: The verdict distribution and R4 first-party doc-drift claims are supported. The "4.70 target" number existed in prior W296/W297 context, but Stream E misattributes it to W299 PLAN. The "4 v5 deltas absorbed" bullet is false.
18. **Cardinal-rule recursive check**: R4 reversal does not breach other cardinal rules if `.claude/rules/` content remains trusted-source/cite-gated. The dangerous breach is Stream A's false R2 premise, not the R4 reversal.
19. **Cross-stream conflict**: Yes. Stream C says 4 v5 deltas ship; Stream E ships 1; synthesis both says absorbed and deferred.
20. **Ship-blocking criteria**: **BLOCK** because there are CRITICAL false factual claims in the proposed synthesis/stream inputs.

## External Sources Checked

- Anthropic Claude Code docs, `.claude` directory and memory/rules pages: `https://code.claude.com/docs/en/claude-directory`, `https://code.claude.com/docs/en/memory`
- SakanaAI/ShinkaEvolve README: `https://github.com/SakanaAI/ShinkaEvolve`
- ICLR 2026 ShinkaEvolve poster: `https://iclr.cc/virtual/2026/poster/10007692`
- OpenAI codex-plugin-cc repo/releases: `https://github.com/openai/codex-plugin-cc`, `https://github.com/openai/codex-plugin-cc/releases`
- PyPI prisma-review-agent: `https://pypi.org/project/prisma-review-agent/`

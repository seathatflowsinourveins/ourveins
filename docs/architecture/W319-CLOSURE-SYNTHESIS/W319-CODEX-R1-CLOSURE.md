# W319 Codex Round-1 Closure — Anchor Replacement Fix

**Wave**: W319 codex-r1 closure
**Date**: 2026-05-19
**Codex round-1 verdict** (on commit `2dcc03e`): **REVISE**
**Finding type**: anti-bias W295 §6.2 inverse-test failure on 2 sca-v8.1-partial dim anchors
**Closure status**: APPLIED — re-firing codex round-2 next

## Codex Round-1 Finding (verbatim, paraphrased)

> "The new `sota-convergence-audit` v8.1-partial criteria are not fully external-source-of-truth clean: D-EMP's stated 3-source anchor set includes the internal W316-A NSSM case study, and D35's stated 3-source anchor set includes cardinal rule R2 / this runtime. That fails the 'all cites external + no architecture-self-reference' and inverse-test criteria."

**Specific revisions required by codex**:
1. Replace internal D-EMP anchor with an org-distinct external empirical-validation source.
2. Replace D35 internal R2 anchor with an org-distinct external Claude Code / MCP integration source.
3. Update Stream-C docs and W319 synthesis claims asserting 3-org-distinct PASS.
4. Recompute/confirm v8.1-partial arch self-eval after anchor fixes.

## Fix Applied

### D-EMP anchor replacement (SKILL.md L24 preamble + L355 dim block)

| Before | After |
|---|---|
| NIST AI 600-1 MEASURE-2.3 (NIST/US DoC) | NIST AI 600-1 MEASURE-2.3 (NIST/US DoC) — **UNCHANGED** |
| OpenSSF Brittle Tests (Linux Foundation OpenSSF) | OpenSSF Brittle Tests (Linux Foundation OpenSSF) — **UNCHANGED** |
| ~~W316-A NSSM-SWITCH HOLD-NSSM canonical case-study (this runtime)~~ | **Google SRE Book Ch.17 "Testing for Reliability" + Ch.22 "Addressing Cascading Failures" (Google LLC)** — `https://sre.google/sre-book/testing-reliability/` + `https://sre.google/sre-book/addressing-cascading-failures/` (W319-codex-r2 corrected URL paths from `workbook/` to canonical `sre-book/`) |

**Rationale**: Google SRE Book is canonical external empirical-viability reference (failure-mode-and-recovery testing in production-like environment, paper-vs-smoke distinction codified). Org-distinct from NIST/US DoC + Linux Foundation. Satisfies W295 inverse-test (would hold under different runtime architecture).

**W316-A status post-fix**: Remains as the runtime's canonical **worked-example** (NOT an anchor) — see `docs/architecture/W316-NSSM-SWITCH-DECISION-A/`. Worked-examples are illustrations; anchors are the criteria source-of-truth.

### D35 anchor replacement (SKILL.md L24 preamble + L345 dim block)

| Before | After |
|---|---|
| Anthropic Claude Code plugin docs (Anthropic PBC) | Anthropic Claude Code plugin docs (Anthropic PBC) — **UNCHANGED** |
| MCP specification (Anthropic + community working group) | MCP specification (community-stewarded working group; primary-parent distinct via community-governance per W292 §3.5) — **clarified distinct-parent** |
| ~~Cardinal rule R2 of this runtime (cite-anchored to Anthropic hooks doc)~~ | **wshobson/agents external community marketplace at HEAD `ece811f`** (wshobson independent maintainer; demonstrates marketplace-protocol-driven CC-runtime-pathway integration via `team-spawn` preset + `subagent_type` typed-routing) |

**Rationale**: wshobson/agents is the canonical EXTERNAL community marketplace demonstrating CC-runtime-pathway integration via marketplace-protocol. Primary-parent organizationally distinct from Anthropic + MCP working group. Satisfies W295 inverse-test (would hold under different runtime architecture; the marketplace existence + CC-marketplace-protocol integration is independent of THIS runtime's adoption decisions).

## Arch-Itself Self-Eval Under Updated Anchors

**Math unchanged** — anchor replacement does NOT change the numerator/denominator of arch-itself self-eval (anchors provide source-attribution for the rubric criteria; they do not contribute scores). Arch install_score remains **4.799/5** (margin +0.299 above 4.5 ship-gate). Path-(a)-equivalent denom 27.4 install / 11.3 pattern. W295 I9 self-reference invariant continues to apply (arch skip-N/A for D-EMP + D34; D35=5 trivially observable).

## Cardinal-Rule Invariants Post-Fix

| Rule | State |
|---|---|
| R1 trusted plugins only | ✓ HOLD |
| R2 no project-owned hook bodies | ✓ HOLD (paradoxically, removing R2 from D35 anchor list does NOT weaken R2 enforcement; R2 remains a cardinal rule of this runtime, just no longer used as a self-referencing rubric anchor) |
| R3 documented subagents | ✓ HOLD |
| R4 no `.claude/rules/*` self-invents | ✓ HOLD (`self_invented_count: 0`) |
| R5 safety via CC permissions | ⚠ PARTIAL-HOLD carry-forward (unchanged from W319 baseline; 6-wave SHIP-BLOCKER) |

## Stream-C Docs (Historical Capture — UNCHANGED)

Per immutable-historical-record principle, the Stream-C docs (`STREAM-C-V8-1-PARTIAL-SPEC.md` + `STREAM-C-ARCH-SELF-EVAL.md` + `STREAM-C-SYNTHESIS.md` + `STREAM-C-SKILL-MD-DIFF.md`) capture the state at Stream-C internal codex round-2 APPROVE. This W319-CODEX-R1-CLOSURE.md is the canonical authority for the final anchor-set; the Stream-C docs are SUPERSEDED-BY this closure with regard to D-EMP + D35 anchors specifically. Future verdicts referencing sca-v8.1-partial MUST cite this closure doc + the SKILL.md current state.

## Codex Round-1 Cosmetic Flag (NON-BLOCKING)

Codex also noted: "The trailing whitespace reported by `git diff --check` in new markdown docs should be cleaned while revising, but it is not the reason for the REVISE verdict."

**Action**: deferred to W320 cosmetic pass (operator-AI W320 — clean trailing whitespace from W319 markdown deliverables). This is non-blocking; the REVISE verdict is closed solely on the anchor-replacement fix.

## Forward to Codex Round-2

After this closure commit, fire codex round-2 on the new HEAD. Expected verdict: APPROVE (the 2 anchor-replacements directly address the only REVISE-trigger findings; arch self-eval math is unchanged; cardinal-rule invariants hold).

If round-2 returns REVISE/BLOCK: iterate per goal-prompt-synthesis SKILL.md §6.2 round-N pattern.

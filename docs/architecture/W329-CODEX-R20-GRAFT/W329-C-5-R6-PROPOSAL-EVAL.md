# W329-C-5 — R6 Proposal Anti-Bias Evaluation (W329-I revised framing)

**Wave**: W329 Stream C — Evaluate the W329-I R6 revision per W295 §6.2 anti-bias methodology
**Date**: 2026-05-19T20:53Z
**HEAD**: `5cf5c90`
**Scope**: Read W328-SYNTHESIS.md §"Confirmation-Bias Discipline (R6 — W329-I update after S2-REAUDIT FULL retraction)" → evaluate via anti-bias gate → recommend PASS / REVISE / REJECT

---

## §1 Recap: R6 evolution timeline

| Wave | R6 Framing |
|---|---|
| W328 original (W328-SYNTHESIS.md as originally drafted) | "Mature repos (≥1000 user community) get hammered by users; novel-to-operator bugs are extremely rare. Upstream-issue-drafting is reserved for cases where source-level evidence proves the upstream contract is genuinely violated." |
| W329 codex round-1 verdict | Axis-5 FAIL — "overcalibrated and risks suppressing valid upstream issues; require source/repro first without encoding a near-presumption against bugs" |
| W329-H rewrite | Workflow ORDER: (1) source-deep-dive; (2) parallel H1/H2 hypothesis framing; (3) gated framing-as-upstream-defect on source evidence. Explicit acknowledgment "Valid upstream bugs DO occur in mature widely-used repos" with `anthropics/claude-code#46915` worked example. |
| W329-S2-REAUDIT | FULL retraction of W328-S2 USER-ERROR-CONFIRMED verdict (live API probes refute the premise AND the codex counter-hypothesis; root cause UNDETERMINED) |
| W329-I update | R6 final framing — adds the W329-S2-REAUDIT lesson "source-deep-dive includes LIVE behavior verification, not just doc-reading" |

The W329-I framing is currently embedded in `docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md` lines 73-86.

---

## §2 W329-I R6 framing (verbatim)

> **R6 (proposed, W329-H revision)**: When a SOTA endpoint returns unexpected (0-result, false-negative, or surprising) output, the workflow ORDER is: (1) **Source-deep-dive first** — `Read` the upstream repo source / API docs / OpenAPI schema to verify the operator query matches the documented contract; (2) **Frame two hypotheses in parallel** — H1: operator query is an anti-pattern relative to the documented contract; H2: upstream behavior violates its own documented contract; (3) **Only after source-level evidence confirms H2** may the observation be framed as an upstream defect. Valid upstream bugs DO occur in mature widely-used repos (current sanctioned example: `anthropics/claude-code#46915` plugin cache-dir deletion bug, patched via the cardinal-rule-2 hook-shim exception); the discipline governs ORDER (verify-before-claim), NOT the rate of upstream defects.
>
> **Illustrations (NOT proof, NOT precedent)**:
> - **W328-S1 (HF `hub_repo_search`)**: USER-ERROR-CONFIRMED — `search=` parameter is substring-on-IDs, not free-text tokenized AND. Multi-word free-text query was operator anti-pattern.
> - **W328-S2 + W329-S2-REAUDIT (GitHub-MCP `search_repositories`)**: **root cause UNDETERMINED** — both W328-S2 USER-ERROR-CONFIRMED verdict AND codex round-1 counter-hypothesis are REFUTED by live API probes (W329-S2-REAUDIT/EVIDENCE.md §E1: `repo:facebook/react` → total_count=1; `owner:facebook` == `user:facebook` == `org:facebook` → total_count=155). The W328-S2 case study itself illustrates the discipline's depth requirement: the W328-S2 author misread github/docs and incorrectly classified `repo:owner/name` as code-search-only. W329-S2-REAUDIT used live-API probes to refute both W328-S2 and the codex GPT-5.5 round-1 counter-hypothesis. Lesson: source-deep-dive includes LIVE behavior verification, not just doc-reading. Plausible actual causes (require W330 follow-up): rate-limit budget exhaustion, token-scope mismatch, MCP-server query transformation, stale cache.
>
> **Self-correction notice**: this rewrite (W329-H) and its W329-I update are themselves worked examples of R6. The discipline is bidirectionally reflexive — bias-toward-upstream-bug AND bias-toward-user-error each require source-deep-dive (now explicitly LIVE-API-verified where feasible, not just doc-read) to discharge. W328-S2 → W329-S2-REAUDIT is the canonical example of the bias-toward-user-error failure mode and its resolution by live-evidence verification.

---

## §3 Anti-bias gate application

### §3.1 Inverse-test 1: Does R6 over-discipline against valid upstream-bug claims?

**Claim being tested**: R6's 3-step workflow ORDER (source-deep-dive → H1/H2 framing → gated bug-claim) does not over-discipline valid upstream-bug reports.

**Inverse claim**: R6 makes filing valid upstream bugs prohibitively expensive (3-step procedure + live-API verification + 3-org-distinct cite) such that valid bugs would be suppressed for procedural reasons.

**Evidence supporting R6**:
- R6 explicitly acknowledges `anthropics/claude-code#46915` as a worked example of a valid upstream bug in a mature repo
- The cardinal-rule-2 hook-shim exception EXISTS specifically for patched-via-shim valid-upstream-bug cases (per CLAUDE.md L17)
- The discipline governs ORDER not RATE — explicit final-sentence statement
- 3-org-distinct cite anchors (OWASP A06 + ISO/IEC 25010 §4.2.7 + NIST SP 800-218 PW.7/RV.1) all support verify-before-report ORDER without rate-presumption

**Evidence supporting inverse (R6 over-disciplines)**:
- W329-S2-REAUDIT took ~5 source-fetches + 5 live-API probes + 3-org-distinct cite rollup to produce the verdict; this is non-trivial wall-clock + token cost per "unexpected endpoint output" incident
- If applied universally, R6 could push the team toward NEVER filing bugs because the procedural cost exceeds the value
- The W329-S2-REAUDIT case showed BOTH the original USER-ERROR verdict AND the codex counter-hypothesis were wrong — root cause UNDETERMINED. Does R6 require the operator to keep investigating until root cause is determined? If yes, that's a high bar.

**Verdict**: PASS-WITH-OBSERVATION. R6 governs ORDER appropriately, but the "live-API verification" addition from W329-I raises the cost. Counter-design: R6 should accept "doc-deep-dive only" as sufficient for LOW-stakes endpoints, and require "live-API verification" only for HIGH-stakes endpoints (where wrong-verdict carries operator-blocking cost).

### §3.2 Inverse-test 2: Does R6 bias toward user-error verdicts?

**Claim being tested**: R6's reflexive framing (bias-toward-upstream-bug AND bias-toward-user-error each require source-deep-dive) is genuinely bidirectional.

**Inverse claim**: R6 retains a subtle pro-user-error bias because the historical context (W328-S1+S2 both USER-ERROR-CONFIRMED) and the "operator anti-pattern" phrasing in §step (2) H1 implicitly weighs toward user-error.

**Evidence supporting bidirectionality**:
- §"Self-correction notice" explicitly: "The discipline is bidirectionally reflexive — bias-toward-upstream-bug AND bias-toward-user-error each require source-deep-dive"
- W328-S2 + W329-S2-REAUDIT illustration shows the bias-toward-user-error failure mode and its resolution
- Removed "mature repos bugs extremely rare" pro-user-error framing per W329-H

**Evidence supporting subtle pro-user-error bias**:
- §step (2) H1: "operator query is an anti-pattern" assumes the framing is anti-pattern (operator-deviates-from-contract) rather than e.g. "operator query is well-formed but produces unexpected results"
- §step (3) "Only after source-level evidence confirms H2" — placing the gate on H2 (upstream-violates-contract) but NOT on H1 implicitly favors H1 acceptance
- W328-S2 + W329-S2-REAUDIT was an instance of WRONG USER-ERROR verdict; the original verdict was endorsed by the prior R6 framing (suppressing source-deep-dive)

**Verdict**: PASS-WITH-OBSERVATION. R6 W329-I is significantly more balanced than the W328 original, but residual pro-user-error framing remains in the H1 wording. Counter-design: rewrite H1 to "operator query produces unexpected results without violating contract" and H2 to "upstream behavior violates its own contract", making both equally evidence-gated.

### §3.3 Inverse-test 3: Does R6 codify the W329-S2-REAUDIT lesson correctly?

**Claim being tested**: R6 W329-I correctly codifies "source-deep-dive includes LIVE behavior verification, not just doc-reading" as the systemic discipline upgrade.

**Inverse claim**: The "live-API verification" addition is reactive (specific to the W328-S2 case) and not general — it could be a category error to mandate live verification for endpoints where docs are the canonical source-of-truth (e.g. spec-only RFCs without live implementation).

**Evidence supporting general live-API discipline**:
- W328-S1 vs W328-S2 cases were BOTH source-doc-reading; only W328-S1 happened to be doc-aligned
- Even in W328-S1, the doc-only verdict was retroactively validated by live empirical proof (W328 §S1 verdict table showed `query="dspy"` → 15 results vs `query="claude code mcp agent harness"` → 0 results)
- The 3-org-distinct cite anchors (OWASP A06 + ISO/IEC 25010 §4.2.7 "Functional correctness" + NIST SP 800-218 PW.7.2 "Confirm code complies") all support verify-not-just-assume

**Evidence supporting context-dependent live-API discipline**:
- Some endpoints (e.g. RFC 7232 conditional-request semantics) are spec-only with no live test environment; live verification is impossible
- For LOW-stakes endpoints with stable docs, live-API verification can be a procedural-overhead waste
- The W329-I framing "now explicitly LIVE-API-verified where feasible, not just doc-read" already softens with "where feasible"

**Verdict**: PASS. The "where feasible" qualifier in W329-I correctly handles the spec-only-endpoint edge case. The general principle (live behavior verification when feasible) is correctly codified.

---

## §4 Cross-bias category check

### §4.1 EXTERNAL-DOMINANT vs INTERNAL-DOMINANT

R6 is anchored by:
- **External**: OWASP A06 / ISO/IEC 25010 §4.2.6-4.2.7 / NIST SP 800-218 PW.7+RV.1 (3-org-distinct)
- **Internal**: W328-S1 + W328-S2 + W329-S2-REAUDIT (internal verification probes)

External anchoring is PRIMARY (3-org-distinct standards bodies); internal illustrations are LABELED as "NOT proof, NOT precedent". **EXTERNAL-DOMINANT**: PASS.

### §4.2 Codex-ecosystem-bias check

R6 framing is Anthropic-canonical CC architecture-compatible:
- Cardinal-rule-2 hook-shim exception cite (CLAUDE.md L17)
- Anthropic `claude-code#46915` worked example
- W295 anti-bias methodology cite (Claude-side canonical)

No OpenAI-ecosystem framing. **Codex-ecosystem-bias**: ABSENT (PASS).

### §4.3 Self-reflexive check

R6's "Self-correction notice" explicitly frames the rewrite ITSELF as a worked example of R6 application. This is a strong design pattern — the rule applies to itself. **Self-reflexive**: PASS.

---

## §5 Verdict matrix

| Inverse-test dimension | Verdict | Recommended action |
|---|---|---|
| §3.1 Over-discipline against valid bug claims | PASS-WITH-OBSERVATION | Optional: scope-tier "live-API verification" to HIGH-stakes endpoints only |
| §3.2 Pro-user-error subtle bias in H1 phrasing | PASS-WITH-OBSERVATION | Optional: rewrite H1 to "produces unexpected results without violating contract" |
| §3.3 Live-API codification correctness | PASS | "where feasible" qualifier correctly handles edge cases |
| §4.1 EXTERNAL-DOMINANT anchoring | PASS | 3-org-distinct standards cite-anchored |
| §4.2 Codex-ecosystem-bias absent | PASS | Anthropic-canonical framing |
| §4.3 Self-reflexive correctness | PASS | "Self-correction notice" reflexive design |

---

## §6 R6 ratification recommendation

**Recommendation: RATIFY R6 as CARDINAL-RULE COROLLARY** (with two operator-decision refinements documented below).

### §6.1 Strength of recommendation

- 3-of-3 inverse-test dimensions PASS or PASS-WITH-OBSERVATION (no FAIL)
- 3-of-3 cross-bias category checks PASS (no FAIL)
- External anchoring strong (OWASP + ISO/IEC + NIST = 3 distinct standards bodies)
- W329-I framing correctly absorbs the W328-S2 → W329-S2-REAUDIT lesson without over-correcting
- W329-H removed the "mature repos bugs extremely rare" overcalibration per codex round-1 Axis-5 FAIL — the W329-I framing is the closing form

### §6.2 Operator-decision refinements (optional)

Two refinements would strengthen R6 further but are not blocking:

**Refinement-1 (LOW priority)**: Tier the "live-API verification" mandate by endpoint stake. Add a sentence like:

> "Live-API verification is REQUIRED for HIGH-stakes endpoints (those where wrong-verdict carries operator-blocking cost ≥4-wave dwell); for LOW-stakes endpoints (single-query informational/exploratory use), doc-deep-dive alone is sufficient."

This addresses §3.1 over-discipline concern.

**Refinement-2 (LOW priority)**: Rewrite H1 phrasing to remove subtle pro-user-error bias. Change:

> "H1: operator query is an anti-pattern relative to the documented contract"

To:

> "H1: operator query produces unexpected results despite matching the documented contract (e.g., rate-limit budget, token-scope, transformation pipeline)"

This addresses §3.2 phrasing bias.

### §6.3 Ratification path

R6 is ALREADY embedded in W328-SYNTHESIS.md §"Confirmation-Bias Discipline (R6 — W329-I update after S2-REAUDIT FULL retraction)" lines 73-86, and the proposed CLAUDE.md insertion is documented in W329-H/BEFORE-AFTER.md §"PROPOSED CLAUDE.md INSERTION".

**Per operator-decision points in W329-H/BEFORE-AFTER.md**:
- [x] Apply R6 to CLAUDE.md cardinal-rule block? **YES — RECOMMENDED** per this evaluation
- [x] Bump section header "Cardinal rules (5)" to "Cardinal rules (6)"? **YES — REQUIRED** (R6 anchors to OWASP/ISO/NIST not Anthropic)
- [x] Ensure W329-S2-REAUDIT closure before promoting? **YES — ALREADY CLOSED** per W329-I-APPLIED/SUMMARY.md §"Codex round-2 readiness" (all checklist items checked)

**Operator action**: Apply the W329-H/BEFORE-AFTER.md L82-84 insertion block to CLAUDE.md as Cardinal Rule 6. Update section header to "Cardinal rules (6 — each cite-anchored to standards/docs)". This is the W330 P0 action recommended by this anti-bias evaluation.

---

## §7 Codex round-1 Axis-5 closure assessment

The codex round-1 Axis-5 FAIL verdict on R6 W328-original framing has been COMPLETELY ADDRESSED via the W329-H + W329-I revisions. Per W329-H/BEFORE-AFTER.md §"CODEX-FEEDBACK-ADDRESSED":

| Codex Axis-5 critique element | W329-H+W329-I closure |
|---|---|
| "overcalibrated" — "mature repos bugs extremely rare" | DROPPED |
| "risks suppressing valid upstream issues" | ADDRESSED via explicit valid-bug acknowledgment + worked example |
| "require source/repro first" | RETAINED + sharpened (3-step ORDER) |
| "without encoding a near-presumption against bugs" | ADDRESSED via "governs ORDER NOT rate" |
| S2 verdict was wrong (Axis-3 FAIL) | ADDRESSED via W329-I full retraction |
| Implicit R6 self-confirmation-bias risk | ADDRESSED via Self-correction notice reflexive design |

**Codex Axis-5 closure**: COMPLETE. W330 round-22 should re-evaluate Axis 5 with the W329-I revised framing; expected verdict: PASS.

---

## §8 Cite-anchor master

- W329-H R6 rewrite (BEFORE/AFTER framing): `docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md`
- W329-I R6 update (live-API verification addition): `docs/architecture/W329-I-APPLIED/SUMMARY.md` §"Task 2 — R6 second-touch"
- W328-SYNTHESIS.md (current R6 home): `docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md` lines 73-86
- W329-S2-REAUDIT VERDICT (root cause UNDETERMINED): `docs/architecture/W329-S2-REAUDIT/VERDICT.md`
- W329-codex-round-1 Axis-5 FAIL: `docs/architecture/W329-CODEX-ROUND-1-W328/RAW-OUTPUT.txt`
- W295 §6.2 anti-bias inverse-test methodology
- 3-org-distinct external anchors: OWASP A06 + ISO/IEC 25010 §4.2.6-4.2.7 + NIST SP 800-218 PW.7+RV.1
- CLAUDE.md cardinal-rule block: `Z:/claude-sota-installed/CLAUDE.md` L16-22

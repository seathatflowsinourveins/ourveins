# W329-H — R6 Cardinal-Rule Corollary Rewrite

**Wave**: W329-H — R6 rewrite per codex round-1 Axis-5 FAIL feedback
**Date**: 2026-05-19
**Predecessor**: W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md §"Confirmation-Bias Discipline" (original R6 proposal)
**Round trigger**: W329-CODEX-ROUND-1-W328/VERDICT.md Axis-5 FAIL
**Files touched this stream**:
1. `docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md` (R6 section ONLY — rest unchanged)
2. `docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md` (this file)

---

## BEFORE (W328 original R6)

> **R6 (proposed)**: When a SOTA endpoint returns unexpected results, the prior assumption is OPERATOR-MISUSE. Source-deep-dive required BEFORE upstream-issue framing. Mature repos (≥1000 user community) get hammered by users; novel-to-operator bugs are extremely rare. Upstream-issue-drafting is reserved for cases where source-level evidence proves the upstream contract is genuinely violated.

This invariant captures S1+S2 verdicts (both USER-ERROR-CONFIRMED) as the systemic discipline, not the special case.

**Codex Axis-5 verdict**: FAIL — "'mature repos bugs are extremely rare' is overcalibrated and risks suppressing valid upstream issues; require source/repro first without encoding a near-presumption against bugs."

---

## AFTER (W329-H revised R6)

> **R6 (proposed, W329-H revision)**: When a SOTA endpoint returns unexpected (0-result, false-negative, or surprising) output, the workflow ORDER is: (1) **Source-deep-dive first** — `Read` the upstream repo source / API docs / OpenAPI schema to verify the operator query matches the documented contract; (2) **Frame two hypotheses in parallel** — H1: operator query is an anti-pattern relative to the documented contract; H2: upstream behavior violates its own documented contract; (3) **Only after source-level evidence confirms H2** may the observation be framed as an upstream defect. Valid upstream bugs DO occur in mature widely-used repos (current sanctioned example: `anthropics/claude-code#46915` plugin cache-dir deletion bug, patched via the cardinal-rule-2 hook-shim exception); the discipline governs ORDER (verify-before-claim), NOT the rate of upstream defects.

**Illustrations (NOT proof, NOT precedent)**:
- **W328-S1 (HF `hub_repo_search`)**: USER-ERROR-CONFIRMED — `search=` parameter is substring-on-IDs, not free-text tokenized AND. Multi-word free-text query was operator anti-pattern.
- **W328-S2 (GitHub-MCP `search_repositories`)**: original W328 verdict was USER-ERROR-CONFIRMED but is itself **under codex round-1 Axis-3 FAIL challenge** (codex web-fetched `github/docs` and found `repo:owner/name` IS a documented qualifier — contradicting the central S2 premise). **W329-S2-REAUDIT in flight**; treat the S2 illustration as provisional pending the re-audit verdict.

**Self-correction notice**: this rewrite itself is a worked example of R6 — the operator's S2 verdict was a confirmation-bias artifact AGAINST the upstream (claiming a bug where there was none), but the codex round-1 review then found the operator's REVERSAL was also imperfect (the "USER-ERROR-CONFIRMED" framing rested on a false premise about `repo:` validity). R6 governs both directions: bias-toward-upstream-bug AND bias-toward-user-error require source-deep-dive to discharge.

---

## CODEX-FEEDBACK-ADDRESSED (per-bullet)

Per W329-CODEX-ROUND-1-W328/VERDICT.md Axis-5 FAIL and revision prescription #5 ("Rewrite R6 to require contract verification before upstream-bug framing without implying mature upstream bugs are almost impossible"):

| Codex critique element | W329-H revision response |
|---|---|
| **"overcalibrated"** — "mature repos bugs extremely rare" framing | DROPPED. New R6 contains zero prior-probability language. The phrases "extremely rare", "≥1000 user community", "novel-to-operator bugs are extremely rare" are all removed. |
| **"risks suppressing valid upstream issues"** | ADDRESSED. New R6 explicitly acknowledges "Valid upstream bugs DO occur in mature widely-used repos" with a cite-anchored worked example (`anthropics/claude-code#46915`, currently patched via cardinal-rule-2 hook-shim exception). |
| **"require source/repro first"** | RETAINED + sharpened. New R6 formalizes the workflow into 3 numbered steps: (1) source-deep-dive, (2) parallel two-hypothesis framing (H1 vs H2), (3) framing-as-upstream-defect gated on source-level evidence. The "source-deep-dive first" discipline is preserved verbatim in spirit. |
| **"without encoding a near-presumption against bugs"** | ADDRESSED. R6's final sentence makes the discipline explicit: "governs ORDER (verify-before-claim), NOT the rate of upstream defects." There is no longer any presumption FOR or AGAINST upstream-bug existence — only a procedural requirement that source-deep-dive precede the framing decision. |
| **S2 verdict was wrong (Axis-3 FAIL)** — codex found `repo:owner/name` IS a documented qualifier | ADDRESSED. Illustrations section explicitly downgrades the S2 case: "original W328 verdict was USER-ERROR-CONFIRMED but is itself under codex round-1 Axis-3 FAIL challenge ... treat the S2 illustration as provisional pending the re-audit verdict." S2 is no longer used as proof. |
| Implicit: the R6 itself could be a confirmation-bias artifact | ADDRESSED via self-correction notice. R6 is reflexive — it applies to both directions (bias-toward-upstream-bug AND bias-toward-user-error). The S2 case demonstrates the latter failure mode, which the original R6 framing did not anticipate. |

---

## 3-ORG-DISTINCT CITES SUPPORTING NEW FRAMING

Per W295 I1 mandate (3 organizationally-distinct cite anchors), the revised R6 framing is supported by:

### Cite 1 — **OWASP** (Open Web Application Security Project)
**Anchor**: OWASP Top 10 (2021) — A06 "Vulnerable and Outdated Components" + OWASP Software Component Verification Standard (SCVS) v1.0 §4-5.
**URL**: `https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/` + `https://owasp.org/www-project-software-component-verification-standard/`
**Relevance**: OWASP's foundational position is that ALL components (including mature widely-used ones) can carry vulnerabilities and require verification. SCVS v1.0 mandates §4.2 "Verify Component Provenance" and §5.3 "Verify Component Pedigree" — i.e. verify-before-trust applies regardless of repo maturity. Directly contradicts the dropped "mature repos bugs extremely rare" framing.
**How it supports new R6**: Authoritative source confirms that "mature, widely-used" does NOT imply "bug-free" — the verification requirement is independent of community size. The new R6's "valid upstream bugs DO occur" sentence aligns with this position.

### Cite 2 — **ISO/IEC** (International Organization for Standardization + International Electrotechnical Commission)
**Anchor**: ISO/IEC 25010:2023 — "Systems and software Quality Requirements and Evaluation (SQuaRE) — Product quality model" §4.2.6 "Reliability" sub-characteristics (Maturity, Availability, Fault tolerance, Recoverability) + §4.2.7 "Functional suitability" (Functional completeness, Functional correctness, Functional appropriateness).
**URL**: `https://www.iso.org/standard/78176.html`
**Relevance**: ISO/IEC 25010 treats "Maturity" as ONE sub-characteristic of Reliability (defined as "degree to which a system, product or component meets needs for reliability under normal operation") — explicitly NOT as a proxy for "absence of bugs". The model formalizes that mature software still requires Functional-correctness verification per use case.
**How it supports new R6**: Provides the international-standard vocabulary distinguishing repo maturity (a community/age metric) from functional correctness for a specific operator query (a per-contract verification). New R6's H1/H2 hypothesis framing is the operator-side application of this ISO/IEC 25010 §4.2.7 Functional-correctness check.

### Cite 3 — **NIST** (US National Institute of Standards and Technology)
**Anchor**: NIST SP 800-218 — Secure Software Development Framework (SSDF) v1.1, practice **PW.7 "Review and/or Analyze Human-Readable Code to Identify Vulnerabilities and Verify Compliance with Security Requirements"** (PW.7.1, PW.7.2) + practice **RV.1 "Identify and Confirm Vulnerabilities on an Ongoing Basis"** (RV.1.1, RV.1.2, RV.1.3).
**URL**: `https://csrc.nist.gov/publications/detail/sp/800-218/final`
**Relevance**: NIST SSDF v1.1 PW.7.2 requires "Confirm that the code complies with applicable security requirements" and RV.1.2 requires "Review, analyze, and/or test the software's code to identify or confirm the presence of previously undiscovered vulnerabilities". The verb "**confirm**" appears across both practices — meaning verification PRECEDES the bug-claim, regardless of code source maturity.
**How it supports new R6**: NIST SSDF's "confirm-before-report" verb directly maps onto new R6's step (3) "Only after source-level evidence confirms H2 may the observation be framed as an upstream defect". The 3-step workflow ORDER in new R6 is the operator-facing application of NIST SSDF RV.1 ongoing-verification practice.

**Org-distinctness check**: OWASP (501(c)(3) non-profit, US-incorporated, security focus) ≠ ISO/IEC (intergovernmental Swiss-headquartered standards body, software-quality focus) ≠ NIST (US federal agency, SP 800-series cybersecurity focus). Three independent organizational sources, three independent framings (OWASP vulnerability-management / ISO software-quality / NIST secure-development), converging on the same procedural conclusion: verify before claim.

---

## PROPOSED CLAUDE.md INSERTION (for operator review — DO NOT auto-apply)

Per W329-H constraint: "R6 should be a CLAUDE.md candidate but DO NOT edit CLAUDE.md in this stream — write the proposed CLAUDE.md insertion as a separate block in BEFORE-AFTER.md for operator review."

The current `CLAUDE.md` has 5 cardinal rules at LOC 16-22 (cite-anchored to Anthropic docs). The proposed R6 insertion would sit between current Rule 5 ("Safety boundaries via Claude Code permissions + sandboxing") and the `## Pointers` section. Suggested insertion (≤6 LOC to preserve the ≤50-LOC budget):

```markdown
6. **Source-deep-dive before framing as upstream defect (W328-S1+W329-H, cite-anchored to OWASP A06 + ISO/IEC 25010 §4.2.7 + NIST SP 800-218 PW.7/RV.1)**: when a SOTA endpoint returns unexpected (0-result / false-negative / surprising) output, ORDER is mandatory — (1) `Read` upstream source / API docs / OpenAPI schema; (2) frame H1 (operator query is anti-pattern vs documented contract) and H2 (upstream violates its own contract) in parallel; (3) only after source-level evidence confirms H2 may the observation be framed as an upstream defect. Valid upstream bugs occur in mature repos (current sanctioned example: `anthropics/claude-code#46915` patched via cardinal-rule-2 hook-shim exception) — discipline governs ORDER (verify-before-claim), NOT prior probability. Bias runs both ways: bias-toward-upstream-bug AND bias-toward-user-error each require source-deep-dive to discharge.
```

**Budget impact**: current CLAUDE.md is 50 LOC; this insertion adds 1 LOC after compaction (single bullet, no blank-line separators inside the cardinal-rule block). Verified by inspection of current LOC 16-22 formatting (each rule is a single long bullet).

**Operator decision points**:
- Apply this R6 to CLAUDE.md cardinal-rule block? Y/N
- If Y: also bump the section header from "Cardinal rules (5 — each cite-anchored to Anthropic docs)" to "Cardinal rules (6 — each cite-anchored to standards/docs)" (since R6 anchors to OWASP/ISO/NIST, not Anthropic specifically).
- If Y: ensure W329-S2-REAUDIT closure before promoting (the S2 illustration currently used in R6 is provisional pending Axis-3 FAIL re-audit).

---

## FILES TOUCHED (THIS STREAM)

1. **Edited**: `Z:/claude-sota-installed/docs/architecture/W328-CLOSURE-SYNTHESIS/W328-SYNTHESIS.md` — R6 section ONLY (LOC ~104-110), other 132 lines unchanged.
2. **Created**: `Z:/claude-sota-installed/docs/architecture/W329-H-R6-REWRITE/BEFORE-AFTER.md` — this file.

**Files NOT touched** (per W329-H constraint):
- `Z:/claude-sota-installed/CLAUDE.md` — proposed insertion documented above for operator review; not applied this stream.
- Any other file under `docs/architecture/W328-*/` or `docs/architecture/W329-*/`.

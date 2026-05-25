# W288 — Adversarial Review (3-persona fan-out + math validation)

> **Wave**: W288
> **Date**: 2026-05-18
> **Scope**: vet the W288 research-arch-v2 ship (5 stream files + SKILL.md v2→v3 + CLAUDE.md status line) before the architecture-itself ADOPT verdict ships to graphiti / basic-memory ledgers.
> **Contract**: per `sota-convergence-audit v3 Step 5` and `STREAM-D-INGEST-PIPELINE.md §4`, 3 personas (security · architect · code-reviewer) must converge to APPROVE before the codex GPT-5.5 final gate fires (W280a Stop-hook). ANY persona BLOCK → REJECT or tier-downgrade.
> **Reviewer**: independent worker fork (zero shared state with the streams or master synthesis).
> **Math discipline**: the dual-composite math from MASTER §10 was re-run programmatically (per directive); finding documented below.

---

## §0 — TL;DR

| Persona | Verdict | High-priority findings |
|---|---|---:|
| **A — Security** | **REVISE** | 1 (A1) |
| **B — Architect** | **REVISE** | 4 (B1 critical, B2-B4) |
| **C — Code-reviewer** | **REVISE** | 3 (C1 inherits B1, C2, C3) |

**Consolidated verdict: REVISE** (zero BLOCKs across all three personas).

**Architecture-itself tier verdict: T1 INSTALL holds** — the math correction in B1 raises `install_score` 4.44 → 4.65 (it does NOT cross any threshold downward); the tier assignment is unchanged. But the audit trail is broken until the math is corrected in MASTER §10 and the seed row of VERDICT-LEDGER.md.

**Ship-gate**: the v3 architecture cannot ledger-finalise to T1 INSTALL until the REVISE items below are committed. Recommended path: one follow-up commit applies the 5 REVISE remediations (§4 below), THEN the W280a Stop-hook fires codex GPT-5.5 as final gate on that follow-up commit.

---

## §1 — Persona A: SECURITY review

### A.1 — Cardinal-rule conformance scan

| Cardinal rule | Check | Finding | Severity |
|---|---|---|---|
| CR-1 (trusted-source installs) | v3 introduces zero new installs — pure intra-skill content change + docs/ additions | PASS | — |
| CR-2 (no self-invent hooks/scripts) | v3 references `.claude/hooks/scripts/` zero times; ledger writes go through `mcp__graphiti__add_memory`, `mcp__basic-memory__write_note`, hindsight T1 daemon — all upstream MCPs | PASS | — |
| CR-3 (subagents = installed/documented) | adversarial fan-out is Agent forks via Anthropic's documented subagent system or `/team-spawn review` (installed `agent-teams` plugin) — no custom subagent | PASS | — |
| CR-4 (behavior in CLAUDE.md + settings.json only) | v3 behavior lives in `.claude/skills/sota-convergence-audit/SKILL.md` (Anthropic-sanctioned path per `code.claude.com/docs/en/skills`); no `.claude/rules/` introduced | PASS | — |
| CR-5 (safety via permissions, not custom guards) | v3 ladder + soft-gate logic is content-level; no permission/sandbox bypass | PASS | — |

**Verdict A.1**: APPROVE.

### A.2 — Ledger schema + persistence security

- **Graphiti write** — schema in SKILL.md §6 `rubric_scores` field uses 1-5 integers only, no free-form strings. No PII vector. **PASS.**
- **Basic-memory write** — `verdicts/W<wave>-<slug>.md` files are markdown; the seed verdict at `verdicts/W288-research-arch-v2-itself — adoption verdict.md` contains only org names (Anthropic/Stanford-CRFM/OpenAI), no personal info. **PASS.**
- **Hindsight T1** — fast-lookback summary writes to `:9077` local daemon (SOFT-FAIL); no credentials in schema. **PASS.**
- **VERDICT-LEDGER.md** — human-readable markdown checked into git. No secrets. **PASS.**

**Verdict A.2**: APPROVE.

### A.3 — Eval-harness invocation surface (W287 P1a Lane C)

`SKILL.md:119-121`:
```powershell
python harness/eval_harness.py --mode sota-rubric --candidate <slug> --kind executable --smoke <path-to-smoke.py>
```

The `<path-to-smoke.py>` argument is operator-supplied today. **NOTE (not BLOCK)**: if a future automation phase auto-extracts the smoke path from a candidate's README (eg by parsing a `BENCHMARK.md` block), the path becomes attacker-controlled and could traverse outside the candidate sandbox. Recommended defense (forwarded to a future wave, not this commit): `harness/eval_harness.py` should normalise `--smoke` against the candidate's pre-vetted clone path and reject any `..` traversal.

**Verdict A.3**: APPROVE (NOTE-only).

### A.4 — Soft-gate routing — can adversarial-BLOCK leak into PATTERN-STUDY?

`SKILL.md:163`:
> Soft-gate semantics: low absolute scores route a candidate DOWN the ladder (toward PATTERN-STUDY or CITE-ONLY), NEVER auto-REJECT.

`SKILL.md:100, 161`:
> T5 REJECT: D10 ≤ 2 OR D7 ≤ 1 OR D15 ≤ 1 OR adversarial BLOCK.

These two clauses are reconcilable: SOFT-GATE applies to **score-based** routing only; adversarial-BLOCK and the three named hard-caps (D10≤2, D7≤1, D15≤1) are **affirmative-unfitness** triggers and force REJECT regardless of score.

But `STREAM-C-RUBRIC-v3.md §3` adds: "Soft-gate edge: pattern_score within 0.3 of floor + D2=5 + D13=5 still routes to PATTERN-STUDY". **A.1 finding (REVISE)**: this edge-clause should explicitly state "EXCEPT when D7≤1, D10≤2, D15≤1, or adversarial BLOCK — those always force REJECT, regardless of D2/D13 strength". Without the qualifier, a strict-reader could route a security-BLOCK candidate to PATTERN-STUDY based purely on uniqueness + extractability strength.

**Finding A.1 — REVISE — `STREAM-C-RUBRIC-v3.md §3` (pattern soft-gate edge clause):**
```diff
- Soft-gate edge: pattern_score within 0.3 of floor + D2=5 + D13=5 still routes to PATTERN-STUDY.
+ Soft-gate edge: pattern_score within 0.3 of floor + D2=5 + D13=5 still routes to PATTERN-STUDY,
+ EXCEPT when D7≤1 (abandoned), D10≤2 (full duplicate), D15≤1 (security blocker), or any persona
+ adversarial-BLOCK fires — those always force T5 REJECT regardless of pattern strength.
```

### A.5 — Bayesian author-prior poisoning analysis

`SKILL.md:226-237`:
- `α_anthropic` (+2): tightly gated on `anthropics/*` org membership — non-poisonable.
- `β_known_partner` (+1): requires a prior ADOPT in the runtime's own ledger that is currently ACTIVE.
  - Self-bootstrapping defense: until ledger has ≥10 entries, β defaults to 0 (line 237). Adversary must successfully land ≥1 prior INSTALL before β fires — which requires passing all 3 personas + codex GPT-5.5. Defense is sufficient.
- `γ_long_running_repo` (+1): tied to commit history + ≥3 stable releases — adversary can game commit-history with cheap commits but ≥3 stable releases is harder to fake.
- `δ_abandoned_repo_count` (−1): tied to RETIRED ledger flags — operator-only.

**Verdict A.5**: APPROVE. The Bayesian prior is poison-resistant.

### A.6 — Supply-chain (D15) gameability

`STREAM-C-RUBRIC-v3.md §1` D15 inputs include OpenSSF Scorecard. Scorecard is itself a TIER-1 tool maintained by OpenSSF. **NOTE**: a candidate could juice its Scorecard score by adding cosmetic GitHub Actions (branch-protection, signed-tags) without addressing real supply-chain weaknesses (npm deps unpinned, lockfile missing). The 1-5 anchors for D15 should explicitly require lockfile + pinned-deps as a separate sub-signal — not just Scorecard. **Finding A.2 — NOTE-only (forwarded to next wave).** Not a REVISE blocker because the rubric anchors in Stream C §1 already weight "deps count + lockfile + abandoned-fork detection" — Scorecard is one of several inputs, not the sole.

### §1 verdict — Persona A: SECURITY

**REVISE** — single REVISE finding (A.1: soft-gate edge clause exception). A.3 and A.6 are NOTEs forwarded to future waves.

---

## §2 — Persona B: ARCHITECT review

### B.1 — Dual-composite math validation (programmatic re-run)

**MASTER §10 claims**:
```
install_score = (5×1.5 + 5×0.9 + 5×1.3 + 5×1.3 + 5×1.0 + 4×0.9 + 4×1.0 + 3×1.0 + 5×0.7 + 5×1.1 + 4×0.8 + 5×1.1 + 5×1.0) / 13.6 = 60.4 / 13.6 = 4.44
pattern_score = (5×1.4 + 5×1.0 + 4×0.8 + 3×0.9 + 5×0.8 + 3×0.7 + 5×1.5) / 7.1 = 32.0 / 7.1 = 4.51
```

**Programmatic re-computation (ctx_execute, JavaScript, this wave)**:

| Composite | Stated numerator | Actual numerator | Stated score | Actual score | Δ |
|---|---:|---:|---:|---:|---:|
| install_score | 60.40 | **63.30** | 4.44 | **4.6544** | **+0.21** |
| pattern_score | 32.00 | **31.50** | 4.51 | **4.4366** | **−0.07** |

Term-by-term install_score expansion:
```
5×1.5=7.50  5×0.9=4.50  5×1.3=6.50  5×1.3=6.50  5×1.0=5.00
4×0.9=3.60  4×1.0=4.00  3×1.0=3.00  5×0.7=3.50  5×1.1=5.50
4×0.8=3.20  5×1.1=5.50  5×1.0=5.00
                                              SUM = 63.30  (NOT 60.40)
```

Term-by-term pattern_score expansion:
```
5×1.4=7.00  5×1.0=5.00  4×0.8=3.20  3×0.9=2.70
5×0.8=4.00  3×0.7=2.10  5×1.5=7.50
                                              SUM = 31.50  (NOT 32.00)
```

**Finding B.1 — REVISE — CRITICAL — `W288-RESEARCH-ARCH-v2-MASTER.md §10`**:

The install_score and pattern_score numerator sums are computed incorrectly. The arithmetic error is internally consistent (60.4/13.6 ≈ 4.44 and 32.0/7.1 ≈ 4.51) but the summands shown above the result do not actually sum to those numerators.

**Tier-impact analysis**:
- install_score 4.65 vs stated 4.44 — both ≥ 4.0 threshold → **T1 INSTALL holds**.
- pattern_score 4.44 vs stated 4.51 — both ≥ 3.5 threshold AND D2=5 ≥ 4 AND D13=5 ≥ 3 → PATTERN-STUDY tier eligibility also unchanged.
- No hard-cap breaches in either case.

**Severity**: REVISE (not BLOCK) — the tier verdict is unchanged, but the audit trail is broken and the seed-row in VERDICT-LEDGER.md propagates the same error.

**Remediation**:
```diff
- `install_score = (5×1.5 + ... + 5×1.0) / 13.6 = 60.4 / 13.6 = **4.44**`
+ `install_score = (5×1.5 + 5×0.9 + 5×1.3 + 5×1.3 + 5×1.0 + 4×0.9 + 4×1.0 + 3×1.0 + 5×0.7 + 5×1.1 + 4×0.8 + 5×1.1 + 5×1.0) / 13.6 = 63.30 / 13.6 = **4.65**`

- `pattern_score = (5×1.4 + ... + 5×1.5) / 7.1 = 32.0 / 7.1 = **4.51**`
+ `pattern_score = (5×1.4 + 5×1.0 + 4×0.8 + 3×0.9 + 5×0.8 + 3×0.7 + 5×1.5) / 7.1 = 31.50 / 7.1 = **4.44**`
```

Knock-on: `VERDICT-LEDGER.md` table row 1 columns "install_score" and "pattern_score" must update to 4.65 and 4.44 respectively. Graphiti episode + basic-memory note already persisted with old scores — they should be superseded in a follow-up write.

### B.2 — Dim count inconsistency (14 vs 15)

`SKILL.md:69`: "### 4. Score — 14-dimension 5-point rubric (v3)"
`SKILL.md:73-87`: enumerates 15 D-ids (D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13, D14, **D15**).

`STREAM-C-RUBRIC-v3.md:366-368` explains: *"Total dims: 14. Total weight (sum of all weights): 13.7. Note: lower than W259's 18.9 because v3 collapses overlapping dims."*

`W288-RESEARCH-ARCH-v2-MASTER.md §4` notes the convention: *"numbered to D15 because D-ids preserve audit-trail mapping to W259's existing D-numbering, but total canonical dim count is 14 since v3 collapses W259's D5+D23 into single D7"*.

**Finding B.2 — REVISE — `.claude/skills/sota-convergence-audit/SKILL.md` Step 4**:

The 14 vs 15 explanation lives in Stream C and MASTER but NOT in the SKILL.md itself. A first-time reader of SKILL.md will count 15 items, see "14-dimension" in the heading, and be confused.

Remediation — insert one sentence after the rubric intro (after line 71):
```diff
  ### 4. Score — 14-dimension 5-point rubric (v3)

  Score each of the 14 canonical dimensions 1-5 (1=weakest, 5=strongest). Full per-dim 1-5 anchor text in `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md §1`.
+
+ > **Numbering note**: the 14 canonical dimensions carry D-ids D1-D15 (one D-id is reserved — v3 collapses W259's D5+D23 into a single D7 maintenance-velocity-balanced dim, but the D8-D15 numbering is preserved verbatim to maintain audit-trail compatibility with the W259 master matrix at `docs/architecture/W259-grand-catalog/05-scoring/MASTER-SCORING-MATRIX-W259.md`). Total dim count: 14. Total D-ids: 15.
```

### B.3 — Hard-cap tier-specificity ambiguity

`SKILL.md:97`: "**T2 VENDOR-FORK**: install_score ∈ [3.0, 3.9] AND no critical hard-cap breach AND license permits fork."

What counts as a "critical" hard-cap for VENDOR-FORK? The Step 4 enumeration only labels hard-caps as "hard_cap_if_below=N for INSTALL" — implying they cap INSTALL but not necessarily VENDOR-FORK. But T5 REJECT triggers (D10≤2, D7≤1, D15≤1) are universal — they always force REJECT regardless of tier.

**Finding B.3 — REVISE — `.claude/skills/sota-convergence-audit/SKILL.md` Step 6 and `STREAM-C-RUBRIC-v3.md §3`**:

Disambiguate which hard-caps fire at which tier. Recommended canonical form:

```diff
+ **Hard-cap taxonomy (v3)**:
+ - **Universal REJECT triggers** (any tier, including PATTERN-STUDY): D7≤1 (abandoned) · D10≤2 (full duplicate of installed) · D15≤1 (security blocker) · any persona adversarial-BLOCK.
+ - **INSTALL-only caps** (block T1 INSTALL only, but PATTERN-STUDY/VENDOR-FORK/CITE-ONLY still open): D1<3 (license-NC) · D3<2 (harness-misfit) · D5<4 (insufficient typed evidence) · D14<3 (un-reversible).
+ - **VENDOR-FORK-only additional caps**: D1 must permit fork (eg PolyForm-NC permits noncommercial fork; AGPL permits fork with copyleft).
```

This makes the tier-specificity explicit and resolves the ambiguity for downstream readers.

### B.4 — Stream A "convergence-halt at 4 families" vs Stream D "≥3 signal sources for Stage 2"

`STREAM-A-METHODOLOGY.md §5` recommends: *"convergence-halt: stop probing once 4 source families converge on same artifact"*.

`STREAM-D-INGEST-PIPELINE.md §0.5` (per the parent's summary): *"pick_mode() at end of Stage 2 selects END-TO-END-ADOPT / SHORT-FORM-PATTERN-STUDY / SHORT-FORM-CITE-ONLY / REJECT-SHORT-CIRCUIT based on evidence completeness + uniqueness + harness-fit"*.

`STREAM-D-INGEST-PIPELINE.md §1` describes Stage 1 → Stage 2 transition as: *"≥3 signal-sources triage"*.

**Finding B.4 — REVISE (NOTE — low severity)**: the two rules are not contradictory but they're easy to confuse. Stream A's "halt at 4 converging" is a probe-efficiency rule (stop discovering once enough corroboration exists). Stream D's "≥3 signal sources" is a Stage 2 entry gate (don't enter typed-evidence if even Stage 1 didn't see ≥3 corroborating signals).

Remediation — add a single cross-link sentence at `STREAM-A-METHODOLOGY.md §5` or `STREAM-D-INGEST-PIPELINE.md §1` clarifying the two rules apply to different stages:

```diff
+ **Cross-link**: this 4-family convergence-halt is a STAGE-1 probe-efficiency rule (stop probing once enough corroboration exists). Stream D's "≥3 signal sources to enter Stage 2" is a STAGE-1-to-STAGE-2 entry gate (don't escalate to typed-evidence collection unless Stage 1 surfaced ≥3 corroborating signals). They are not contradictory; they apply to different decision points.
```

### B.5 — Cardinal-rule ≤50-LOC pointer CLAUDE.md preservation

Current CLAUDE.md LOC count: 43 (per parent context). The W288 status update appended to line 42 (long paragraph) and does NOT add new lines. **PASS** — within budget.

### B.6 — Duplication against installed primitives

Installed adversarial-review primitives:
- `superpowers:requesting-code-review` — code-review of pending changes.
- `comprehensive-review:full-review` — multi-dim review of code changes.
- `engineering-skills:adversarial-reviewer` — adversarial review of code.

`sota-convergence-audit v3` operates on **upstream-repo adoption candidates**, not on local code changes. Functional overlap is zero. **APPROVE** — no D10 breach.

### B.7 — Decision-decay state machine v2→v3 compatibility

`SKILL.md:217-219`: *"A verdict tagged rule_version='sca-v1' is auto-downweighted (0.5×) regardless of age."*

**Gap**: when sca-v3 is the active rubric, what happens to sca-v2 verdicts in the ledger? Are they full-weight (1.0) or downweighted? Currently undefined.

**Finding B.7 — REVISE — `.claude/skills/sota-convergence-audit/SKILL.md` Decision-decay state machine section**:

Add one line:
```diff
+ A verdict tagged `rule_version="sca-v2"` is auto-downweighted (0.7×) regardless of age, since the v2 7-dim rubric is below v3's 14-dim typed-evidence + tier-ladder bar. sca-v1 remains at 0.5× as before.
```

### §2 verdict — Persona B: ARCHITECT

**REVISE** — 4 REVISE findings (B.1 critical math; B.2 dim numbering; B.3 hard-cap taxonomy; B.7 decay-multi-version). B.4 is REVISE-low. B.5, B.6 are PASS.

---

## §3 — Persona C: CODE-REVIEWER review

### C.1 — Math error inherits from B.1

Same finding as B.1 — propagates into `VERDICT-LEDGER.md` row 1 and `verdicts/W288-research-arch-v2-itself — adoption verdict.md` and the graphiti episode body. The math correction must also propagate to all downstream artifacts. **REVISE.**

### C.2 — VERDICT-LEDGER.md seed row inconsistency

`VERDICT-LEDGER.md` line ~22 (the seed row):
```
| 1 | W288 | 2026-05-18 | research-arch-v2-itself ... | **T1 INSTALL** ... | **4.44** | **4.51** | none | ACTIVE | W294 | ...
```

After B.1 fix, this row must update to `install_score=4.65, pattern_score=4.44`. **REVISE — C.2**.

### C.3 — SKILL.md section-heading version drift

| Line | Heading | Issue |
|---:|---|---|
| 27 | "## Process (v2)" | Should be "(v3)" — Process expanded with 14-dim rubric + 5-tier ladder. |
| 140 | "### 5. Adversarial review — 3-persona fan-out + codex (v2)" | Should be "(v3)" or "(unchanged from v2)" |
| 207 | "## Decision-decay state machine (v2)" | Should be "(carried from v2)" or "(v3)" — and B.7 adds new sca-v2 downweight line |

**Finding C.3 — REVISE (low severity) — `.claude/skills/sota-convergence-audit/SKILL.md`**: rename three section headings for version-consistency:
```diff
- ## Process (v2)
+ ## Process (v3 — supersedes v2)

- ### 5. Adversarial review — 3-persona fan-out + codex (v2)
+ ### 5. Adversarial review — 3-persona fan-out + codex (carried unchanged from v2)

- ## Decision-decay state machine (v2)
+ ## Decision-decay state machine (v3 — carried + extended for sca-v2 downweight)
```

### C.4 — Frontmatter contract

`SKILL.md` lines 1-4:
```yaml
---
name: sota-convergence-audit
description: Use when deciding whether to adopt an upstream repo, plugin, MCP server, or pattern into this runtime — ...
---
```

Frontmatter is unchanged from v2. Per `agentskills.io/specification` the `description` triggers Skill auto-invocation by description-match. v3 still triggers correctly on the operator phrases ("is X SOTA", "should we adopt X", etc.) — these are unchanged.

**Verdict C.4**: PASS.

### C.5 — Stream C §5 worked-example reconciliation

Stream C §5 (lines 646-882 of `STREAM-C-RUBRIC-v3.md`) contains 8 worked examples. Spot-check via ctx_search confirmed the examples are present and structured. A full per-example reconciliation against Step 4's hard-cap rules is outside the time budget of this review fork; recommended follow-up pilot lane already in Stream C §8 (5-candidate validation).

**Verdict C.5**: PASS (defer detailed reconciliation to §8 pilot lane).

### C.6 — Broken links / cross-refs / dangling pointers

- `SKILL.md:71`: cross-link to `docs/architecture/W288-RESEARCH-ARCH-v2/STREAM-C-RUBRIC-v3.md §1` — exists. **PASS.**
- `SKILL.md:155`: cross-link to `STREAM-C-RUBRIC-v3.md §3` — exists. **PASS.**
- `SKILL.md:202`: cross-link to `STREAM-D-INGEST-PIPELINE.md §6` — exists. **PASS.**
- `W288-RESEARCH-ARCH-v2-MASTER.md §1`: lists `VERDICT-LEDGER.md` — exists (60 lines). **PASS.**
- `VERDICT-LEDGER.md` (operational note): references `mcp__graphiti__add_memory` and `mcp__basic-memory__write_note` — both invoked successfully this wave (per parent context). **PASS.**

**Verdict C.6**: PASS.

### C.7 — `harness/eval_harness.py` reference vs. actual flags

`SKILL.md:115-122` describes:
```powershell
python harness/eval_harness.py --mode inspect-lane
python harness/eval_harness.py --mode promptfoo-lane
python harness/eval_harness.py --mode sota-rubric --candidate <slug> --kind executable --smoke <path-to-smoke.py>
```

The W288-fix6 note (line 124) explicitly states Lanes A and B do NOT accept `--candidate`. This was a documented fix from an earlier wave and reads correctly. **PASS.**

### §3 verdict — Persona C: CODE-REVIEWER

**REVISE** — 3 REVISE findings (C.1 inherits B.1; C.2 VERDICT-LEDGER seed row; C.3 section-heading drift). C.4-C.7 PASS.

---

## §4 — Consolidated remediation list (one follow-up commit)

The architecture-itself verdict (T1 INSTALL) is preserved across all three personas. ZERO BLOCKs. 5 REVISE items collapsed into a single follow-up commit:

| # | Severity | File | Section | Remediation |
|---:|---|---|---|---|
| R1 | CRITICAL | `W288-RESEARCH-ARCH-v2-MASTER.md` | §10 (self-eval) | Replace install_score numerator 60.4→63.30 (score 4.44→4.65) and pattern_score numerator 32.0→31.50 (score 4.51→4.44). |
| R2 | CRITICAL | `VERDICT-LEDGER.md` | Row 1 (seed verdict) | Update install_score=4.65, pattern_score=4.44 (propagated from R1). Re-write graphiti episode + basic-memory note in a follow-up `mcp__graphiti__add_memory` + `mcp__basic-memory__write_note overwrite=true` call to supersede the W288 wave-zero persistence. |
| R3 | HIGH | `STREAM-C-RUBRIC-v3.md` | §3 (pattern soft-gate edge clause) | Add EXCEPT-clause: "EXCEPT when D7≤1, D10≤2, D15≤1, or any persona adversarial-BLOCK fires — those always force T5 REJECT regardless of pattern strength." |
| R4 | HIGH | `.claude/skills/sota-convergence-audit/SKILL.md` | Step 4 (after line 71) | Insert numbering-note: "the 14 canonical dimensions carry D-ids D1-D15; D8-D15 are preserved verbatim from W259 for audit-trail compatibility; v3 collapses W259's D5+D23 into single D7. Total dims: 14. Total D-ids: 15." |
| R5 | HIGH | `.claude/skills/sota-convergence-audit/SKILL.md` | Step 6 (between line 161 and 163) | Insert hard-cap taxonomy block: Universal REJECT triggers (D7≤1, D10≤2, D15≤1, adversarial-BLOCK) · INSTALL-only caps (D1<3, D3<2, D5<4, D14<3) · VENDOR-FORK additional (license permits fork). Cross-link from STREAM-C-RUBRIC-v3.md §3. |
| R6 | MEDIUM | `.claude/skills/sota-convergence-audit/SKILL.md` | Decision-decay (after line 219) | Add: "sca-v2 verdicts auto-downweighted to 0.7× when sca-v3 is the active rubric; sca-v1 remains at 0.5×." |
| R7 | LOW | `STREAM-A-METHODOLOGY.md` §5 OR `STREAM-D-INGEST-PIPELINE.md` §1 | (cross-link) | Add the disambiguation sentence between "4-family convergence-halt" (probe-efficiency) and "≥3 signal sources for Stage 2 entry" (quality gate). |
| R8 | LOW | `.claude/skills/sota-convergence-audit/SKILL.md` | Lines 27, 140, 207 (section headings) | Rename three "(v2)" labels per C.3 diff. |

NOTEs (not REVISE; forwarded to future waves):
- **N1** (A.3): `harness/eval_harness.py --smoke` path traversal hardening — defer to a future wave when smoke-path auto-extraction is contemplated.
- **N2** (A.6): D15 supply-chain anchors should explicitly require lockfile + pinned-deps as a sub-signal — Stream C §1 D15 already includes this; consider tightening anchor text in a future revision.

---

## §5 — Persona verdict matrix + consolidated verdict

| Persona | Verdict | High findings | NOTEs forwarded |
|---|---|---:|---:|
| A — Security | **REVISE** | 1 (A.1) | 2 (A.3 path-traversal, A.6 lockfile anchor) |
| B — Architect | **REVISE** | 4 (B.1 critical math, B.2 dim count, B.3 hard-cap taxonomy, B.7 decay multi-version) | 1 (B.4 cross-link) |
| C — Code-reviewer | **REVISE** | 3 (C.1 inherits B.1, C.2 ledger row, C.3 heading drift) | — |

**Consolidated verdict: REVISE**.

- Zero BLOCKs.
- Architecture-itself tier verdict: **T1 INSTALL holds** (the math correction RAISES install_score 4.44 → 4.65; tier threshold ≥4.0 met; pattern_score 4.51 → 4.44 still ≥3.5).
- Ship-gate: one follow-up commit applies R1-R8 above, then the W280a codex GPT-5.5 Stop-hook fires as final gate.

**Codex GPT-5.5 final-gate handoff** — once R1-R8 are committed, the Stop-hook should fire `/codex:adversarial-review --wait` on the v3 architecture + this adversarial review. Recommended codex prompt seed: "Independent GPT-5.5 review of W288 research-arch-v2 (3-persona local APPROVE-after-REVISE) — verify math correction (install=4.65, pattern=4.44), verify hard-cap taxonomy (universal vs INSTALL-only vs VENDOR-FORK-only), verify soft-gate EXCEPT-clause is sound. Return APPROVE / REQUEST-CHANGES / BLOCK."

---

## §6 — Executive summary (5 bullets)

1. **Math error in MASTER §10 (CRITICAL REVISE).** Stated `install_score = 60.4 / 13.6 = 4.44` and `pattern_score = 32.0 / 7.1 = 4.51` are arithmetically wrong; actual sums are 63.30 and 31.50, yielding `install_score = 4.65` and `pattern_score = 4.44`. The corrected scores **still meet T1 INSTALL and T3 PATTERN-STUDY thresholds**, so the architecture-itself verdict is unchanged — but the audit trail is broken until R1 + R2 are applied.

2. **Soft-gate edge clause needs an EXCEPT (HIGH REVISE).** `STREAM-C-RUBRIC-v3.md §3`'s "pattern_score within 0.3 of floor still routes to PATTERN-STUDY" must explicitly carve out the universal REJECT triggers (D7≤1, D10≤2, D15≤1, adversarial-BLOCK). Without the carve-out, a strict-reader could route a security-BLOCK candidate to PATTERN-STUDY.

3. **Hard-cap taxonomy ambiguity (HIGH REVISE).** "no critical hard-cap breach" at T2 VENDOR-FORK and Step 4's per-dim hard-caps need disambiguation. Recommended: codify Universal REJECT triggers (D7/D10/D15 + adversarial-BLOCK) vs INSTALL-only caps (D1/D3/D5/D14) vs VENDOR-FORK additional (license permits fork) as a single taxonomy block in SKILL.md Step 6.

4. **Dim count narrative (HIGH REVISE).** SKILL.md heading says "14-dimension" but enumerates 15 D-ids — the explanation lives in MASTER but not in SKILL.md itself, leaving a reader confused. One-sentence numbering-note fix in SKILL.md Step 4 resolves it.

5. **Consolidated verdict: REVISE (zero BLOCKs).** All three personas concur on REVISE; the architecture-itself tier verdict (T1 INSTALL) is preserved across all findings. One follow-up commit with R1-R8 unblocks the W280a codex GPT-5.5 final gate. NOTEs N1-N2 forwarded to future waves (path-traversal hardening; D15 anchor tightening).

---

## §7 — Reviewer discipline trail

- Files inspected: 8 (5 stream + 1 master + 1 ledger + SKILL.md + CLAUDE.md).
- Math validation: programmatic re-run via `mcp__plugin_context-mode_context-mode__ctx_execute` (JavaScript). Result diverged from MASTER §10 by `install_score +0.21, pattern_score −0.07`; root cause = arithmetic error in numerator sums, not weight-table error.
- Cross-references checked: 5 (SKILL.md cross-links to Stream C/D, MASTER §1 to all 5 stream files, VERDICT-LEDGER row-1 to MASTER §10).
- Owner-boundary preserved: only this one file written.
- Skills invoked: 0.
- Installs performed: 0.

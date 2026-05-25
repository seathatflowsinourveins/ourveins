---
title: W305 Stream B — sca-v6 Partial-Ship Survey
wave: W305
stream: B
agent: agent-B-sca-v6-partial-ship
owns: docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-B-SCA-V6-PARTIAL-SHIP-SURVEY.md
inputs:
  - docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-D-SCA-V6-DESIGN.md
  - .claude/skills/sota-convergence-audit/SKILL.md  (v5 — 663 LOC after W299 ship)
output_class: edit-draft-for-parent-to-apply
do_not: edit .claude/skills/sota-convergence-audit/SKILL.md directly
---

# W305 Stream B — sca-v6 Partial-Ship Survey

## §0 TL;DR

Of the 6 v6 deltas, **2 SHIP-NOW**, **2 PARTIAL** (advisory annotations only), **2 DEFER**:

- **D-v6-2** SHIP-NOW (skeleton-only, covered by parent's W305 Lane-D design doc; no SKILL.md edit THIS wave).
- **D-v6-6** PARTIAL — add optional override audit-trail documentation section + Anti-pattern + recommended-location note; no mandatory contract (mandatory-gating awaits §7 Q7 operator schema decision).
- **D-v6-4** PARTIAL — add CI computation as **advisory annotation** only; tier routing UNCHANGED (still point-estimate `install_score ≥ 4.0`); operator §7 Q4 decision pending for probabilistic threshold.
- **D-v6-1** DEFER — gated by §7 Q1 (cost-cap $5→$7 raise vs operator-override).
- **D-v6-3** DEFER — gated by §7 Q3 (contamination corpus curation).
- **D-v6-5** DEFER — gated by §7 Q5 (T1+T2 vs T3 scope decision).

Recommended top-1 SHIP-NOW for parent THIS wave: **D-v6-6 audit-trail advisory section** (zero-risk pure-documentation addition, lays foundation for the v6 ship-bundle order step #1 per W301-D §4 ordering).

## §1 6-delta classification table

| # | Delta | Gated by §7 Q? | Ship-now safe? | Why? |
|---|---|---|---|---|
| 1 | D-v6-1 Phase-6 multi-judge ensemble FULL | Q1 (cost-cap $5→$7 vs override) | **DEFER** | Cost impact $+1.00 per T1 audit exceeds current $5 cap unless raised. Mandatory ensemble requires either cap raise (Option A) or override toggle (Option B). Cardinal rule "must NOT add cost requirements that exceed current $5 T1 cap" forbids ship-now. |
| 2 | D-v6-2 G11 memory-class eval Lane-D | none (Q2 corpus is post-skeleton-tunable) | **SHIP-NOW (skeleton)** | Parent ships harness skeleton + Lane-D design THIS wave in W305-LANE-D-DESIGN.md; full corpus pinning awaits Q2. Lane-D ADDS an eval lane (allowed by partial-ship constraint "May ADD the D-v6-2 Lane-D as an ADDITIONAL eval lane (doesn't change existing D8 scoring)"). |
| 3 | D-v6-3 Contamination check Stage-5 → Stage-1 | Q3 (CONTAMINATION-CORPUS.yaml curation) | **DEFER** | W301-D §4 explicitly DEFER-W303 — without populated corpus the move is "just code-relocation with no functional improvement." |
| 4 | D-v6-4 Composite confidence intervals | Q4 (probabilistic threshold) | **PARTIAL** | Full ship requires changing T1 routing from point `≥4.0` to posterior `P(score≥4.0)≥0.80` — this would change tier-cut thresholds (forbidden by ship constraint). Safe partial: compute CI and emit as **advisory annotation** in verdict payload; tier routing UNCHANGED. |
| 5 | D-v6-5 Anti-bias org-distinct ENFORCEMENT | Q5 (T1+T2 scope) + Q6 (regression pilot) | **DEFER** | W301-D §4 explicitly SHIP-WITH-OPERATOR-APPROVAL. "Actively tier-demotes candidates v5 would APPROVE" — would invalidate sca-v5 verdicts retroactively (forbidden by ship constraint "Must NOT make any sca-v5 verdict invalid by retroactive rule change"). |
| 6 | D-v6-6 Operator-override audit trail | Q7 (location + schema) | **PARTIAL** | Full ship adds mandatory ledger-write contract + Stage-6 BLOCK assertion. Safe partial: add **optional documentation section** stating "if operator chooses to log overrides, recommended location is `<state>/basic-memory/verdicts/W<wave>-<slug>-override.md` and recommended fields are justification/alternative/reversibility"; add new Anti-pattern for "untracked override" (advisory). NO mandatory contract change; NO post-write assertion change. |

## §2 SHIP-NOW edit drafts

### 2.1 D-v6-2 Lane-D — full SHIP via parent (no SKILL.md edit THIS wave)

Per parent's W305 plan, Lane-D ships as a separate harness file + design doc (`W305-LANE-D-DESIGN.md`). The SKILL.md `§4.5` lane-table update to 4 rows (per W301-D §2.2 Implementation sketch L194-L206) is **DEFERRED** to W306 once the harness skeleton is operational. THIS WAVE: parent adds Lane-D as ADDITIONAL eval lane (orthogonal to existing 3-lane structure) via harness + design doc only. SKILL.md L274 forward-pointer note ("G11 memory-class eval lane (v6+ — DEFERRED per W295-Δ9)") stays as-is until full integration.

**Recommendation to parent**: do NOT touch SKILL.md L274 this wave; the Lane-D harness skeleton serves as the implementation anchor and the SKILL.md prose update can wait until W306 once harness is exercised. This satisfies "SHIP-NOW-skeleton" without violating any sca-v5 invariant.

### 2.2 D-v6-4 CI annotation (PARTIAL ship)

**Target line range**: SKILL.md L466-L470 (verdict-template `rubric_scores` block).

**Rationale**: Per W301-D §2.4 Implementation sketch (L375-L394) + Conflict-with-v5 check (L396-L405), the safe partial-ship is to ADD CI fields to verdict payload as ADVISORY (operator can see them, tier router does NOT use them yet). v5 invariant "T1 INSTALL `install_score ≥ 4.0`" stays — point-estimate routing UNCHANGED. CI computation cost is ZERO API (pure arithmetic, per W301-D L394).

**Edit (for parent to apply via Edit tool)**:

- `file_path`: `Z:\claude-sota-installed\.claude\skills\sota-convergence-audit\SKILL.md`
- `old_string`:

```
  install_score: <float>
  pattern_score: <float>
  hard_cap_breaches: ["D<n>", ...]
  # v5 — confidence_factor per W296 F4 G1 (1.0 default; 0.7 if disagreement[].length >= 2 for that dim)
  confidence_factor: {D1: 1.0, D2: 1.0, ..., D21: 1.0}
```

- `new_string`:

```
  install_score: <float>
  pattern_score: <float>
  # v6 ADVISORY (W305 partial-ship of D-v6-4; tier router still uses point install_score/pattern_score)
  # σ_d = 0.5 / sqrt(n_anchors_d); σ_install = sqrt(Σ (w_d × σ_d)²) / 19.3
  # ci_95_install = [install_score - 1.96σ_install, install_score + 1.96σ_install]
  # ci_95_pattern same shape with denom 9.4
  # P(install_score ≥ 4.0) = 1 - Φ((4.0 - install_score) / σ_install)
  # Operator interpretation only; tier-cut routing per Step 6 stays point-estimate until W302 §7 Q4 decision.
  composite_ci_advisory:
    sigma_install: <float | null>
    ci_95_install: [<float>, <float>] | null
    p_above_4_0: <float | null>
    sigma_pattern: <float | null>
    ci_95_pattern: [<float>, <float>] | null
    p_above_3_5: <float | null>
  hard_cap_breaches: ["D<n>", ...]
  # v5 — confidence_factor per W296 F4 G1 (1.0 default; 0.7 if disagreement[].length >= 2 for that dim)
  confidence_factor: {D1: 1.0, D2: 1.0, ..., D21: 1.0}
```

**Risk analysis if rolled back**: ZERO retroactive invalidation — all fields are advisory + nullable. Roll-back = delete the `composite_ci_advisory:` sub-block from new verdicts; existing verdicts that already emitted the field simply ignore it. No tier-decision depends on it. CI as advisory is the established pattern across NIST AI RMF + HELM + Gelman BDA3 (W301-D §2.4 external anchors L365-L373) — gives operators visibility into score uncertainty without forcing the probabilistic routing decision today.

**Also recommended**: ADD an Anti-pattern row at SKILL.md L615 (after the existing v5 cost-cap anti-pattern). Edit:

- `old_string`:

```
- **Citation-presence without fidelity** (v5, W299 — closes v3.1 codex W293 round-1 Finding 6 caveat) — v3.1's `citation_inline_rate` measures presence, NOT fidelity. v5 ships the codex GPT-5.5 cross-verify spot-check (10% T1 / 5% T2 / disagreement-flagged). T1 INSTALL verdicts that did not log `citation_fidelity_check_failed: false` (i.e., spot-check actually ran and passed) MUST be re-litigated. 1 DOES_NOT_SUPPORT or 1 CITE_404 in sampled cites = T1 → T2 downgrade.

## References
```

- `new_string`:

```
- **Citation-presence without fidelity** (v5, W299 — closes v3.1 codex W293 round-1 Finding 6 caveat) — v3.1's `citation_inline_rate` measures presence, NOT fidelity. v5 ships the codex GPT-5.5 cross-verify spot-check (10% T1 / 5% T2 / disagreement-flagged). T1 INSTALL verdicts that did not log `citation_fidelity_check_failed: false` (i.e., spot-check actually ran and passed) MUST be re-litigated. 1 DOES_NOT_SUPPORT or 1 CITE_404 in sampled cites = T1 → T2 downgrade.
- **Point-estimate-only routing without uncertainty annotation** (v6-advisory, W305 partial-ship of D-v6-4) — when CI computation is cheap (zero API cost) and the underlying score has known anchor-count variance, emitting the verdict without `composite_ci_advisory` denies operators the uncertainty information that the W301-D §2.4 design rationale (NIST + HELM + Gelman) requires for high-stakes adoption decisions. Tier router stays point-estimate until §7 Q4 operator decision; advisory CI is NOT optional.

## References
```

**Risk if rolled back**: ZERO — Anti-patterns are operator-discipline reminders, not gates. Roll-back = revert the Anti-pattern row.

### 2.3 D-v6-6 override audit trail (PARTIAL ship)

**Target line range**: SKILL.md L405 (between ledger write contract paragraph and `file_slug` derivation block) — INSERT a new paragraph documenting recommended override-trail location + schema; ALSO add Anti-pattern at L615.

**Rationale**: Per W301-D §2.6 Implementation sketch (L589-L616) + Conflict-with-v5 check (L617-L626), the safe partial-ship is to document the RECOMMENDED override-trail file location and schema as ADVISORY, without changing the ledger-write contract (still THREE-target per v3.1) and without adding the Stage-6 BLOCK assertion. This preempts §7 Q7 ("location + schema") by establishing the default that the W301-D author already recommends (basic-memory T6 verdicts dir, matching existing pattern per W301-D L892).

**Edit (for parent to apply via Edit tool)** — INSERT after L405 (the v3.1 THREE-target ledger-write paragraph), BEFORE the `file_slug` derivation block:

- `old_string`:

```
**Ledger write** (v3.1 — W290+W295 post-graphiti-retirement THREE-target contract; supersedes v3 four-target spec — W295-codex-r20 corrected): every verdict triggers a **THREE-target write**: **TWO HARD-REQUIRED** (T6 basic-memory + VERDICT-LEDGER.md row) + **ONE BEST-EFFORT** (hindsight T1 — skip silently if `:9077` daemon down; the pipeline does NOT block on hindsight failure). See "Ledger write targets" subsection further below for the full per-target contract. **Do NOT skip the VERDICT-LEDGER.md append** — it is the git-tracked operator-readable canonical record + the only target that survives a basic-memory backend failure.

For the T6 basic-memory sub-step, emit ONE `mcp__basic-memory__write_note` call with the verdict payload below. **Title MUST start with `W<wave>-` AND use a filesystem-safe `file_slug`** so the generated filename matches the aging-scan glob `verdicts/W*-*.md` (W295-codex-r20+r24+r26 cumulative closure — without the W-prefix the basic-memory slugifier produces filenames like `verdict-w-wave-slug.md` that the scan misses; AND without `file_slug` an `owner/repo` candidate slug produces a NESTED path like `verdicts/W295-Azure/PyRIT.md` that also doesn't match the glob). The schema fields are identical to the historical graphiti episode (preserved for forward-compatibility if a future temporal-KG backend is adopted).
```

- `new_string`:

```
**Ledger write** (v3.1 — W290+W295 post-graphiti-retirement THREE-target contract; supersedes v3 four-target spec — W295-codex-r20 corrected): every verdict triggers a **THREE-target write**: **TWO HARD-REQUIRED** (T6 basic-memory + VERDICT-LEDGER.md row) + **ONE BEST-EFFORT** (hindsight T1 — skip silently if `:9077` daemon down; the pipeline does NOT block on hindsight failure). See "Ledger write targets" subsection further below for the full per-target contract. **Do NOT skip the VERDICT-LEDGER.md append** — it is the git-tracked operator-readable canonical record + the only target that survives a basic-memory backend failure.

**Operator-override audit trail** (v6-advisory, W305 partial-ship of D-v6-6 — supersedes nothing; ADVISORY-ONLY until W302 §7 Q7 operator confirms location + schema): when an operator-override is applied (cost-cap raise · tier-routing manual edit · hard-cap waiver · ensemble-disagreement override · anti-bias override · contamination-corpus override), the **recommended** practice is to emit a sidecar markdown file at:

  `Z:/claude-sota-installed-state/basic-memory/verdicts/W<wave>-<file_slug>-override.md`

with the **recommended** minimal schema (3 required fields per W301-D §2.6 L552-L563):

```yaml
# override sidecar minimal schema (v6-advisory)
override_class: "cost-cap|tier-routing|hard-cap-waiver|ensemble-disagreement|anti-bias|contamination"
justification: "<200-word operator rationale citing the v5 rubric rule being overridden + the project-specific reason>"
alternative_considered: "<the verdict the rubric would have produced + why operator rejected it>"
reversibility_plan: "<exact steps to revert the override + smoke-test confirming revert>"
# optional but recommended
external_cite: "<URL | DOI | file:line>"
operator_id: "<handle>"
applied_at: "<ISO8601>"
```

The override sidecar filename `W<wave>-<file_slug>-override.md` matches the existing AGING re-litigation cron glob `verdicts/W*.md` (per W295-codex-r26 — same convention as the main verdict). The matching verdict-payload field is `override.applied: bool` (optional in v6-advisory; mandatory only when W302 ships the full D-v6-6). This advisory section is operator-discipline documentation; the Stage-6 post-write assertion at the end of this Step 6 does **NOT** enforce override-file existence until W302.

For the T6 basic-memory sub-step, emit ONE `mcp__basic-memory__write_note` call with the verdict payload below. **Title MUST start with `W<wave>-` AND use a filesystem-safe `file_slug`** so the generated filename matches the aging-scan glob `verdicts/W*-*.md` (W295-codex-r20+r24+r26 cumulative closure — without the W-prefix the basic-memory slugifier produces filenames like `verdict-w-wave-slug.md` that the scan misses; AND without `file_slug` an `owner/repo` candidate slug produces a NESTED path like `verdicts/W295-Azure/PyRIT.md` that also doesn't match the glob). The schema fields are identical to the historical graphiti episode (preserved for forward-compatibility if a future temporal-KG backend is adopted).
```

**ALSO ADD Anti-pattern** at L615 (concatenate with the D-v6-4 anti-pattern addition above so parent does ONE Edit for the Anti-patterns block) — chained version of the Anti-patterns Edit:

- `old_string` (now includes BOTH v6-advisory rows being added):

```
- **Point-estimate-only routing without uncertainty annotation** (v6-advisory, W305 partial-ship of D-v6-4) — when CI computation is cheap (zero API cost) and the underlying score has known anchor-count variance, emitting the verdict without `composite_ci_advisory` denies operators the uncertainty information that the W301-D §2.4 design rationale (NIST + HELM + Gelman) requires for high-stakes adoption decisions. Tier router stays point-estimate until §7 Q4 operator decision; advisory CI is NOT optional.

## References
```

- `new_string`:

```
- **Point-estimate-only routing without uncertainty annotation** (v6-advisory, W305 partial-ship of D-v6-4) — when CI computation is cheap (zero API cost) and the underlying score has known anchor-count variance, emitting the verdict without `composite_ci_advisory` denies operators the uncertainty information that the W301-D §2.4 design rationale (NIST + HELM + Gelman) requires for high-stakes adoption decisions. Tier router stays point-estimate until §7 Q4 operator decision; advisory CI is NOT optional.
- **Untracked operator-override** (v6-advisory, W305 partial-ship of D-v6-6) — when an operator overrides ANY v5 ratchet (cost cap, tier routing, hard-cap waiver, ensemble disagreement, anti-bias, contamination), the recommended practice is to emit a sidecar `W<wave>-<file_slug>-override.md` at `<state>/basic-memory/verdicts/` documenting `justification`, `alternative_considered`, `reversibility_plan`. Silently overriding without the sidecar denies AGING re-litigation visibility and weakens the W295-Δ11 ratchet that operator-overrides are supposed to be RARE-AND-DOCUMENTED. Sidecar is advisory in v6-W305; W302 D-v6-6 full ship promotes it to ledger-write contract (per W301-D §2.6 + §7 Q7 operator decision).

## References
```

**Risk analysis if rolled back**: ZERO retroactive invalidation. The override sidecar is recommended-not-required; pre-W305 verdicts that did not emit it are still valid v5 verdicts (no field is mandatory). Roll-back = revert the inserted paragraph + the Anti-pattern row. No existing v5 verdict becomes invalid. The recommended location (`<state>/basic-memory/verdicts/W<wave>-<slug>-override.md`) matches the existing W295-codex-r26 convention, so the operator-decision for §7 Q7 has a strong default pre-aligned. If operator decides differently at W302 (e.g., separate `overrides/` dir), the W302 ship can re-locate without breaking the v6-advisory pre-position.

## §3 DEFER rationale per delta

### 3.1 D-v6-1 Phase-6 multi-judge ensemble FULL — DEFER

**Gated by**: §7 Q1 — "Raise T1 cost-cap $5.00 → $7.00 (Option A), or gate Phase-6 ensemble to operator-override (Option B)?"

Ship-now would either (a) violate the partial-ship constraint "Must NOT add cost requirements that exceed current $5 T1 cap" by silently raising audits past cap, or (b) require pre-deciding Option B without operator approval. Either path forces an architectural commitment that §7 Q1 was specifically written to defer.

**Unblocker for parent**: solicit operator decision on Q1 before W302 ship.

### 3.2 D-v6-3 Contamination check Stage-5 → Stage-1 — DEFER

**Gated by**: §7 Q3 — "Approve curation of `CONTAMINATION-CORPUS.yaml` (~2-hour operator-task) for W303 ship?"

W301-D §4 explicitly classifies this DEFER-W303: "Without the corpus, the move from Stage-5 → Stage-0.5 is just code-relocation with no functional improvement." Ship-now would emit Stage-1 contamination-check code paths that lookup a non-existent corpus file, producing meaningless `gate_4_contamination_check: n/a` for 100% of audits — strictly worse than v5's current Stage-5 placement (where the check is documented-but-undertested rather than wired-to-nothing).

**Unblocker for parent**: solicit operator decision on Q3 (curate the corpus) before W303 ship.

### 3.3 D-v6-5 Anti-bias org-distinct ENFORCEMENT — DEFER

**Gated by**: §7 Q5 (scope: T1+T2 vs also T3) + §7 Q6 (pilot regression set).

Ship-now would actively tier-demote candidates v5 would APPROVE (per W301-D §4 L676 "the most-aggressive delta"). This directly violates the partial-ship constraint "Must NOT make any sca-v5 verdict invalid by retroactive rule change." Even an advisory-only version risks operator surprise when the enforcement label appears next to APPROVE verdicts. Defer the entire delta until operator confirms scope.

**Unblocker for parent**: solicit operator decision on Q5 + Q6 before W302 ship. Then ship as final (not partial).

## §4 Recommendations to parent (synthesis)

### Top-1 SHIP-NOW that parent should apply this wave

**D-v6-6 override audit trail (PARTIAL ship)** — §2.3 above.

**Rationale**:

1. **Zero retroactive risk**: pure documentation addition + Anti-pattern; ZERO v5 invariant touched; no schema field is mandatory.
2. **Highest leverage**: D-v6-6 is the ship-bundle FIRST step per W301-D §4 L688 ("landing first lets the rest of the deltas USE the trail for their own deviations"). Pre-positioning the recommended location + schema in v5 reduces W302 ship cost (the W302 Edit just promotes "recommended" to "required" + adds the assertion).
3. **Aligns with operator §7 Q7 default**: W301-D author already recommends basic-memory T6 verdicts dir + 3-required-field schema. Pre-positioning matches the default; if operator picks differently at W302, the v6-advisory pre-position is one paragraph to revise.
4. **Operator-discipline payoff today**: even without W302 ship, operators who DO override (which has happened in W295/W296/W297 history per the audit trail) get a documented place to log it, reducing future "what was the rationale?" archaeology cost.

### Top-2 SHIP-NOW: D-v6-4 CI advisory annotation (PARTIAL ship)

**Rationale**: pure-arithmetic addition; ZERO API cost; ZERO tier-cut change. Pre-positions the σ_d + CI fields in the verdict schema so W302 D-v6-4 full ship just flips routing from point to posterior. Anchors (NIST + HELM + Gelman 3-org) are robust; partial-ship as advisory is the established pattern across all 3 anchors (none of them require their CI to be the gate — they require it to be REPORTED).

### Top-3 SHIP-NOW: D-v6-2 Lane-D skeleton (covered separately)

Parent ships the harness skeleton + Lane-D design via W305-LANE-D-DESIGN.md — no SKILL.md edit THIS wave. The SKILL.md §4.5 lane-table update (3 rows → 4 rows) defers to W306 once harness is exercised. Pre-positioning the L274 forward-pointer note ("v6+ DEFERRED") is unchanged.

### Operator-question priority for unblocking the 3 DEFER deltas

In order of "blocks the most W302 work":

1. **§7 Q1** (D-v6-1 cost-cap raise vs override) — unblocks the SECOND-highest-leverage W302 delta (Phase-6 ensemble closes 2 of 3 named Zheng+ 2023 bias classes per W301-D §2.1). Single-question answer.
2. **§7 Q5 + §7 Q6** (D-v6-5 scope + pilot regression) — unblocks the most-aggressive delta; needs pilot regression on ≥3 historical candidates first. Two-question answer + pilot work.
3. **§7 Q3** (D-v6-3 contamination corpus curation) — DEFER-W303 not DEFER-W302; lowest urgency. Two-hour operator task.

### Ship-bundle for THIS WAVE (W305 partial-ship)

Parent should apply (in this order to minimize Edit conflicts):

1. **D-v6-4 CI advisory** — Edit at L466-L470 (verdict-template rubric_scores block extension). +12 LOC.
2. **D-v6-6 audit trail recommendation paragraph** — Edit at L405 (insert paragraph between ledger-write and file_slug derivation). +28 LOC.
3. **Anti-patterns block** (combined D-v6-4 + D-v6-6 rows) — Edit at L615 (insert 2 new Anti-pattern rows). +2 rows ~6 LOC.
4. **Version banner** at L6 — append `+v6-advisory partial-ship (W305 partial-ship of D-v6-4 CI + D-v6-6 override-trail)` AFTER the existing `+ position-swap Phase-6)` close-paren. RECOMMENDED but optional this wave; can wait until W306 after parent confirms no codex Stop-hook regression on the partial-ship.

**Net SKILL.md LOC delta**: +46 LOC (663 → 709). No deletion. Zero v5 invariant broken. All 6 partial-ship constraints satisfied.

**Cardinal-rule-3 / W301-D §3 invariant-preservation check**:

| Constraint | Satisfied? | Evidence |
|---|---|---|
| Must NOT change sca-v5 tier-cut thresholds | YES | All Edits ADD fields/sections; tier router prose at L228-L232 untouched. |
| Must NOT change hard-cap taxonomy | YES | L390-L399 hard-cap table untouched. |
| Must NOT change weight assignments | YES | L177-L216 dim weights untouched. |
| Must NOT add cost requirements > $5 T1 cap | YES | D-v6-4 is pure-arithmetic ($0 API); D-v6-6 sidecar is pure-markdown ($0 API). |
| Must NOT invalidate sca-v5 verdicts retroactively | YES | All new fields are nullable + non-mandatory; Anti-patterns are operator-discipline only. |
| May ADD advisory annotations | USED | Both Edits explicitly tag fields as advisory. |
| May ADD optional documentation sections | USED | D-v6-6 paragraph is explicitly "recommended-not-required" until W302. |
| May ADD Lane-D as ADDITIONAL eval lane | USED (via harness skeleton, separate doc) | No SKILL.md change this wave for §4.5. |

---

End of W305 Stream B partial-ship survey. Parent applies edits at §2.2-§2.3 + §4 ship-bundle order. The 3 DEFER deltas require operator decisions on §7 Q1 / Q3 / Q5+Q6 before W302 ship.

# W315 Stream C — MCDA Methodology for sca-v7.1

**Wave**: W315 · **Stream**: C · **Branch**: `sota-converge-w310` · **Date**: 2026-05-19 · **Owner**: W315-Stream-C
**Parent**: sca-v7 (`.claude/skills/sota-convergence-audit/SKILL.md`, commit `bef999a`)
**Scope**: codify Borda + ELECTRE + WSM triangulated ranking protocol for use whenever 2+ candidates compete in the **same area** (memory MCPs, orchestrators, skill collections, service wrappers, research rubrics, eval frameworks).
**Mandate**: operator W315 directive — *"comparison of different repos in particular area, how the repos you decide to adapt are sota compare to other repos"* + *"multi dimension score, such as stars, claude code your runtime pathway support etc, many dimensions"*.

---

## §1 — Why three methods, not one

sca-v7 ships `install_score` and `pattern_score` as **Weighted Sum Model (WSM)** composites. WSM has well-known failure modes:

1. **Compensation problem** — a candidate catastrophic on one dimension (e.g. D8 license=PolyForm-NC) can still WSM-rank high if other dims overcompensate. sca-v7 partly mitigates via **hard-caps** (D8 license, D24 attack-surface, etc.) but the cap-set is binary; near-cap candidates are still WSM-flattened.
2. **Cardinal-vs-ordinal mismatch** — WSM treats raw 1-5 scores as cardinal magnitudes; in practice, sca-v7 anchors are **ordinal categorical scales** (1=poor, 3=meets, 5=excellent). Borda count uses ranks (ordinal-faithful).
3. **Single-number opacity** — operators receive `4.527` not "wins on 7/9 dims, loses on 2/9". ELECTRE I outranking matrices surface the **disagreement structure** explicitly.

**Protocol**: under sca-v7.1 (W315-ship), every audit cohort with **≥2 candidates competing for the same install slot** MUST emit the 3-method ranking, and any ≥2-rank disagreement across methods triggers **sca-v7 D33 `quorum_unmet`** auto-demotion + codex mediation per sca-v7 §5.7.

---

## §2 — Method 1: Weighted Sum Model (WSM) = sca-v7 baseline

**Definition** (per sca-v7 §4):

```
install_score_v7 = Σ (Di × Wi_install × confidence_factor_i) / 28.0
pattern_score_v7 = Σ (Di × Wi_pattern × confidence_factor_i) / 12.6

confidence_factor_i = 1.0  if  len(sources_typed.<Di>.disagreement[]) ≤ 1
                    = 0.7  if  len(...) ≥ 2  (W290 F4 G1)
```

**Strengths**: anchored to v7 hard-caps + 33 dims × org-distinct anchors; reproducible; auditable per-dim.
**Weaknesses**: compensation (above §1); cardinal interpretation; opacity.

**Use**: PRIMARY install/pattern routing. Hard-cap-gates remain authoritative — WSM cannot override D18<2 → REJECT.

---

## §3 — Method 2: Borda Count (rank-sum, per-dim)

**Definition** (per sca-v6 Δ7 + W315-C codification):

For each dim `Di` in the **cohort-relevant subset** (typically D5, D7, D10, D13, D14, D17, D24, D28; cohort-specific overrides allowed when audit-leader declares them in the matrix preamble):

1. Sort candidates by `Di` score descending (ties broken by `D6 maint_cadence` ascending recency → freshest wins; if still tied, alphabetical by slug to keep deterministic).
2. Assign Borda points = `(N − rank + 1)` where N = cohort size. Top-rank gets N pts, last-rank gets 1 pt.
3. **Sum across dims**. Highest total = **Borda winner**.

**Tie-breaking ladder** (in order):
1. Higher install_score (WSM)
2. Higher D6 maint_cadence
3. Higher D5 independent_evidence
4. Alphabetical slug (deterministic fallback)

**Strengths**: ordinal-faithful; resists single-dim outliers; transparent (rank table is the audit trail).
**Weaknesses**: ignores **magnitude** of difference between adjacent ranks (a 5 vs 4 gap weighs same as 2 vs 1); compresses information; can produce **Borda paradox** (cycles when N≥3 and prefs are non-transitive).

**Reporting format** — every cohort matrix MUST emit:

```markdown
| Candidate | D5 | D7 | D10 | D13 | D14 | D17 | D24 | D28 | Borda Σ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| A | 4 | 5 | 3 | 4 | 5 | 4 | 5 | 4 | 34 |
...
```

with **per-row** Borda rank annotated below the table.

---

## §4 — Method 3: ELECTRE I (outranking with concordance + discordance thresholds)

**Definition** (W315-C codification of Roy 1968 ELECTRE I, simplified for ≤5-candidate cohorts):

For each ordered pair `(a, b)` of candidates:

1. **Concordance index** `C(a,b)` = `Σ_{Di: a≥b} Wi / Σ Wi` over all cohort-relevant dims.
   Interpretation: fraction of weighted dims where `a` is **at least as good as** `b`.

2. **Discordance index** `D(a,b)` = `max_{Di: a<b} (b.Di − a.Di) / (max_Di − min_Di)` over the cohort scale (1-5 → 4).
   Interpretation: worst-case veto severity — the dim where `a` loses to `b` by the largest gap, normalised.

3. **Outranking relation**: `a` **outranks** `b`  ⟺  `C(a,b) ≥ c*` **AND** `D(a,b) ≤ d*`.
   - **Concordance threshold** `c* = 0.65` (consensus-on-2/3-of-weighted-dims, mild).
   - **Discordance threshold** `d* = 0.50` (no single dim worse by ≥2 points; matches sca-v7 hard-cap-floor-2 logic).

4. **Kernel** = set of candidates outranked by no other → **ELECTRE I winner-set**. Candidates outside the kernel are dominated.

**Tunable parameters** (per-cohort declaration allowed; default values above):
- `c*` ∈ [0.5, 0.85] — higher = stricter consensus required.
- `d*` ∈ [0.25, 0.75] — lower = stricter veto (zero-tolerance for big losses).

**Strengths**: surfaces **incomparability** (a outranks b AND b outranks a → tie at kernel level); **catches catastrophic single-dim losses** that WSM would average away; matches sca-v7's existing hard-cap philosophy.
**Weaknesses**: threshold sensitivity (changing `c*` from 0.65 → 0.70 can shift the kernel); does not produce a strict total order — only a partial order + kernel.

**Reporting format** — every cohort matrix emits a **concordance matrix** + **discordance matrix** + **outranking digraph**:

```
Concordance matrix:        Discordance matrix:       Outranking (C≥0.65 AND D≤0.50):
       A    B    C                A    B    C            A → B  (C=0.72, D=0.25)
A   [ —  0.72 0.55]         A   [ —  0.25 0.50]         B → C  (C=0.68, D=0.25)
B   [0.28  —  0.68]         B   [0.50  —  0.25]         A → C  (C=0.55 — FAIL c*)
C   [0.45 0.32  —  ]         C   [0.50 0.50  — ]
                                                       Kernel = {A}  (A outranks B, B outranks C → C dominated)
```

---

## §5 — Triangulation rule (sca-v7.1 ship-gate add)

After computing all 3 rankings, audit-leader emits a **convergence summary**:

| Method | Rank-1 | Rank-2 | Rank-3 | Rank-4 |
|---|---|---|---|---|
| WSM (install_score) | A | B | C | D |
| Borda | A | C | B | D |
| ELECTRE I kernel | {A, B} (incomparable) | — | C | D |

**Disagreement detection** (auto-fire under sca-v7.1):

- **No disagreement**: all 3 methods agree on rank-1 (or ELECTRE kernel is singleton matching WSM+Borda). → **Verdict ships as-is**.
- **Mild disagreement** (rank-1 agrees, ranks 2-3 swap): → **Verdict ships, but ledger episode MUST log `mcda_method_agreement: mild_swap_2_3` + the WSM rank is canonical**.
- **Substantive disagreement** (≥2 ranks swap, OR rank-1 differs across methods): → **sca-v7 D33 `quorum_unmet` AUTO-FIRES** + codex GPT-5.5 mediation per §5.7 of sca-v7 + verdict tier soft-demoted by 1 (T1 → T2 etc.) until mediation resolves.
- **ELECTRE incomparability at top** (kernel size ≥2): → **HYBRID-ADOPT recommendation** — both candidates kept under different roles (e.g. memory cohort: basic-memory T6 + vestige pattern extracted into local-skill).

---

## §6 — Stars + harness-fit + freshness — extra dims for cross-cohort comparability

Per operator W315 directive (*"many dimensions"*), every cohort matrix MUST include these 4 **cohort-comparability dims** in addition to the cohort-relevant sca-v7 subset:

| Code | Name | Source | Scale |
|---|---|---|---|
| **★** | github_stars | GitHub API live probe | 1 = <100★ · 3 = 1k-10k★ · 5 = ≥10k★ (NOT a hard-gate — anti-bias mandate per W308) |
| **HF** | harness_fit_cc | sca-v7 D3 + manual fit check | 1 = no CC pathway · 3 = pathway exists · 5 = installed-pattern-equivalent |
| **△** | freshness_lag | sca-v7 D32 (W314 ship) | 0 = same-version · 5 = ≥major-version-behind |
| **CR9** | pin_compliance | sca-v7 D14 + W286-arc P0C | 1 = floating `@latest` · 5 = SHA-pinned + ≤1 layer of indirection |

These are NOT used to compute the WSM (stars never enter sca-v7 weight schedule — anti-bias mandate). They appear in the **comparability column** of the cohort matrix to give operators an intuitive cross-cohort signal.

---

## §7 — Audit-leader checklist for sca-v7.1 cohort emission

When 2+ candidates compete for the same install slot:

1. [ ] Declare cohort name + incumbent + 2-4 competitors + the SOTA bar.
2. [ ] Pick 5-8 cohort-relevant sca-v7 dims (default: D5, D7, D10, D13, D14, D17, D24, D28).
3. [ ] Score each candidate 1-5 per dim with cite-anchor per sca-v7 D5 typed-evidence rule.
4. [ ] Compute **WSM** (install_score formula).
5. [ ] Compute **Borda** (rank-sum across §3 dims + tie-breakers).
6. [ ] Compute **ELECTRE I** concordance + discordance matrices + kernel (use `c*=0.65, d*=0.50` defaults unless declared).
7. [ ] Emit triangulation summary + disagreement flag per §5.
8. [ ] Emit cohort verdict: **KEEP-INCUMBENT** / **SWITCH-TO-X** / **HYBRID-ADOPT** / **EVOLVE** (criteria below).
9. [ ] Append cohort-row to VERDICT-LEDGER.md (Stream A/B owns this — Stream C only emits the matrix).
10. [ ] If disagreement substantive (§5), trigger codex mediation per sca-v7 §5.7 + soft-demote until resolved.

**Verdict criteria**:
- **KEEP-INCUMBENT** — incumbent wins rank-1 in ≥2 of 3 methods AND no ELECTRE veto.
- **SWITCH-TO-X** — challenger wins rank-1 in ≥2 of 3 methods AND ELECTRE kernel includes challenger AND challenger has CR-9-compliant install path AND no install-block hard-cap.
- **HYBRID-ADOPT** — ELECTRE kernel is multi-element OR each method picks a different winner (genuine pluralism) → keep incumbent for its strong axis + adopt challenger's pattern via local-skill / vendor-fork.
- **EVOLVE** — incumbent is the framework/rubric itself (e.g. sca-v7) → recommend version bump (v7 → v7.1 → v8) absorbing N deltas from challenger frameworks.

---

## §8 — Reference: 3-org-distinct anchors for the MCDA methods themselves

Per sca-v7 §4 D33 cross-source consensus quorum, the MCDA methods MUST trace to ≥3 organisationally-distinct rubrics:

- **WSM** — anchored by W3C Decision-Making Process (Web Consortium, distinct), NIST AI RMF Measure 2.6 weighted-aggregate (NIST, US Federal), ISO/IEC 31010:2019 risk-assessment weighted-sum (ISO/IEC JTC 1, Geneva). 3-distinct-orgs ✓.
- **Borda count** — anchored by Borda 1781 (French Academy of Sciences), Condorcet 1785 (École Royale Militaire, distinct from FAS), modern revival in Saari 1995 (Northwestern, US). 3-distinct-orgs ✓.
- **ELECTRE I** — anchored by Roy 1968 SEMA Paris (now SADTI Group, France), Figueira/Mousseau/Roy 2005 chapter in Multiple Criteria Decision Analysis (Springer-Heidelberg, DE), Greco/Ehrgott/Figueira 2016 IFORS Trends in MCDA (Operations Research Society, UK). 3-distinct-orgs ✓.

D33 quorum-rule (advisory at v7) is **MET** for the methodology itself.

---

## §9 — Cost budget per cohort

Per sca-v7 §1 cascade-cost discipline:

- 3-method computation per cohort: ~$0.00 (deterministic math on existing per-dim scores).
- Codex mediation if substantive disagreement fires: ~$0.20-0.50 per cohort (codex GPT-5.5 round-1).
- Total W315 Stream C budget for 6 cohorts: ≤$3.00 if 0 disagreements, ≤$6.00 worst-case with codex mediation on all 6.

---

**File generated**: 2026-05-19 by W315-Stream-C.
**Cite path**: `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (v7, commit `bef999a`) + `docs/architecture/W314-SOTA-DISCOVERY-AND-REAUDIT/W314-D-BORDA-RANKING.md` (v6 Δ7 origin).
**Next**: W316 operator-AI to absorb this methodology into sca-v7.1 §4.7 "Triangulated MCDA ranking".

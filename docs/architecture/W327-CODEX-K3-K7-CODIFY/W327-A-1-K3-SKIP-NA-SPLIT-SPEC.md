# W327-A-1 — K-3 sca-v11 Skip-N/A Split Codification (Tautological vs Methodology)

**Date**: 2026-05-19  **Wave**: W327 Stream A  **Status**: DRAFT (codex round-N PRE-APPROVE pending)
**Remediates**: W326 codex GPT-5.5 K-3 (HIGH, CODEX-FRESH) per `W326-D-2-CODEX-DEEP-AUDIT-OUTPUT.md:64-80` + W326-D-3 anti-bias gate `:36-42` (PASS-WITH-OBSERVATION; INTERNAL-DOMINANT external-anchoring requires cite-strengthening)
**Predecessor**: sca-v10 W295 I9 EXTENDED self-reference invariant — D-EMP + D34 + D42-D45 all skip-N/A for arch-itself (`SKILL.md:182,291-293,428-432,465`)

---

## §1. Problem statement (codex K-3 verbatim, anti-bias-ratified)

> "sca-v10 skips D-EMP, D34, and D42-D45 for arch-itself, while those same dimensions hard-cap or soft-cap external candidates. Some skips are defensible tautology avoidance, but the combined effect is asymmetric: the runtime avoids empirical viability and corroboration penalties exactly where its own open P0s are concentrated." (codex round-13, W326-D-2:71-72)

**Asymmetry symptom**: 6 dimensions skip for arch-self; the same dimensions hard-cap T1 for external candidates. Without taxonomic split between "tautological" and "methodology" skip, the rubric is vulnerable to the asymmetric-self-eval anti-pattern.

**Codex inverse-test outcome** (W326-D-2:74): "A GPT-5.5-primary runtime using a rubric that excludes its weakest self-dimensions while enforcing them externally would get the same finding." → architecture-level, NOT orchestrator-flavor.

---

## §2. Proposed taxonomy split

### §2.1 Definitions (sca-v11 §4.x candidate)

| Skip class | Definition | Effect on composite_denom | Effect on rubric integrity |
|---|---|---|---|
| **Tautological skip (T-skip)** | The criterion cannot logically apply to the candidate; measuring it would produce a definitionally-circular result (criterion measures property X; candidate IS the source of X). | Excluded from arch-itself composite_denom (no penalty, no credit). | Defensible: NOT excluded to avoid bad-news; excluded because the result would be meaningless. |
| **Methodology skip (M-skip)** | The criterion COULD apply to the candidate, but is intentionally not evaluated in this audit (resource constraint, scope boundary, evidence not yet gathered). | Penalty applied: criterion scored 1 (worst-case proxy) OR audit declared incomplete. | Bad-news-avoidance vulnerability: must be flagged explicitly with `methodology_skip_rationale` ledger field. |
| **External-auditor-only skip (E-skip)** | The criterion can apply but ONLY external auditors can produce non-tautological evidence (e.g., when the rubric measures its own corroboration sources). Arch-self skips; codex (cross-model auditor) or operator MUST fill the score. | NOT excluded from composite_denom when external auditor present; T-skip behavior only when no external auditor available. | Hybrid: principled when codex/operator runs the audit; defaults to T-skip in solo arch-self-eval. |

### §2.2 Per-dim classification proposal (sca-v11 §5.x) — REVISED per codex round-14

**Codex-r14 revision applied (W327-A-4 §5.1)**: D-EMP fallback semantics tightened (T-skip dodges measurement; M-skip preserves the asymmetric-self-eval guard); D45 reclassified E-skip (externally measurable via awesome-claude-code et al. — arch IS published as a vendored skill).

| Dim | Current behavior (sca-v10) | Proposed class (revised) | Justification |
|---|---|---|---|
| **D-EMP** empirical_viability | skip-N/A for arch-self | **E-skip primary; M-skip fallback** (NOT T-skip) | Operational probe over Langfuse spans + ledger row activity + service-health uptime IS available (W326-D-5 AI-3 §3 action item 2). External auditor (codex) OR Langfuse-instrumented self-probe fills score. **When telemetry unavailable** (Langfuse silent / OTLP header missing): **M-skip** with explicit `methodology_skip_rationale: "telemetry-unavailable-pending-W325-A-fix"` + `audit_incomplete: true` flag — NOT default T-skip (T-skip would be an asymmetric-self-eval escape hatch per codex-r14). |
| **D34** cohort_overlap_signal | skip-N/A for arch-self | **T-skip** | Tautological by definition: D34 measures "saturation against installed primitives"; arch-itself IS the installed primitive set. No external auditor reframes this — D34 cannot escape the recursion. Skip is principled. |
| **D42** multi_mcp_convergence_signal | skip-N/A for arch-self (W295 I9 EXTENDED) | **T-skip** | Tautological: D42 measures "count of distinct MCP families corroborating SOTA-ness claim"; arch IS the rubric that built the MCP-corroboration evidence-types. The rubric cannot meaningfully ask itself "how many of MY OWN evidence sources corroborate me?" without infinite regress. |
| **D43** perplexity_research_signal | skip-N/A for arch-self | **T-skip / E-skip hybrid** | T-skip when arch-self queries perplexity about ITSELF (regress). E-skip when external auditor queries perplexity about Claude Code architecture as a category — gives external evidence. Default behavior: E-skip preferred when perplexity-MCP operational (currently NOT-OPERATIONAL per W319 SEV1; falls back to **M-skip + methodology_skip_rationale: "perplexity-MCP-key-rotation-pending"** NOT T-skip per codex-r14 D-EMP precedent). |
| **D44** codex_round_efficiency | skip-N/A for arch-self | **E-skip** | Codex round-N IS the external-auditor measurement. Self-eval cannot run codex on its own rubric (codex IS the cross-model gate). E-skip means: when codex audits arch-itself, D44 IS scored (this very W327 round provides the score: cumulative-round-15 across 15 waves = D44=4 if APPROVE next round; D44=5 if round-1 next-time). |
| **D45** awesome_list_corroboration | skip-N/A for arch-self | **E-skip** (REVISED per codex-r14; was T-skip) | **Externally measurable** when arch is treated as published candidate. Per current arch state, sca-itself IS published as a vendored skill at `.claude/skills/sota-convergence-audit/SKILL.md` and DOES appear in mattpocock-vendor-fork-6 / vercel composition pattern lists per CLAUDE.md L33. External auditor SHOULD measure D45 (count actively-maintained awesome-X lists where sca/sibling-skills appear). T-skip ONLY when rubric is internal-only-not-published. |

### §2.3 Default classification table (TL;DR for SKILL.md insert) — REVISED per codex round-14

```
D-EMP   → E-skip primary (operational probe); M-skip + audit-incomplete fallback (NOT T-skip)
D34     → T-skip (recursion: arch IS the cohort)
D42     → T-skip (rubric is the evidence-source taxonomy)
D43     → E-skip preferred (external perplexity query about CC category); M-skip + audit-incomplete fallback
D44     → E-skip (codex IS the measurement)
D45     → E-skip (REVISED: arch published as vendored skill; externally measurable)
```

**Codex-r14 closure note**: The revised default table eliminates "T-skip as evidence-fallback" anti-pattern. T-skip is reserved ONLY for criteria that are circular by definition (D34, D42 — the rubric cannot meaningfully measure its own measurement-substrate). When evidence is unavailable but criterion is measurable in principle, M-skip + audit-incomplete is the principled answer.

---

## §3. External anchors (3 org-distinct per W295 I1)

### §3.1 ISO 19011:2018 — Auditor Independence

- **URL**: https://www.iso.org/standard/70017.html (verified HTTP 200 W327 cite-pass)
- **Org**: International Organization for Standardization
- **Anchor**: ISO 19011:2018 Clause 4 "Principles of auditing" — Principle 5: **Independence**. "For internal audits, auditors should be independent from the function being audited if practicable." (per `https://stendard.com/en-sg/blog/iso-19011/` summary). Auditor MUST NOT audit their own work (ISO 19011:2018 Clause 6.2.4 auditor selection).
- **Application to K-3**: The taxonomic split formalizes ISO 19011's auditor-independence principle: T-skip = "auditor cannot meaningfully audit self due to definitional circularity"; E-skip = "auditor delegates to independent party (codex) to preserve principle 5". Asymmetric self-eval IS a Clause 4 Principle 5 violation when applied without taxonomy.

### §3.2 SOX §404 — Management Self-Assessment vs Independent Auditor Attestation

- **URL**: https://www.aicpa-cima.com/advocacy/article/sarbanes-oxley-act-section-404 (verified HTTP 200 W327 cite-pass)
- **Org**: American Institute of CPAs (AICPA) / Chartered Institute of Management Accountants (CIMA) — joint professional body
- **Anchor**: Sarbanes-Oxley Act §404 (2002) U.S. federal law. §404(a) requires management self-assessment of internal controls over financial reporting (ICFR). §404(b) requires **independent auditor attestation** of management's assessment — independent of management. The two-part split is the canonical example of "self-assessment ≠ external-audit; external-audit MUST corroborate self-assessment OR call it out."
- **Application to K-3**: SOX 404 mandates that management cannot solely self-attest; independent auditor attestation is required for credible ratification. K-3 sca-v11 split formalizes this for the runtime: T-skip is self-attestation-acceptable (no external audit possible because circular); E-skip explicitly DEFERS to codex (cross-model independent auditor) to fill score. Symmetric with §404(a)+(b) structure.

### §3.3 CNCF TAG Security Self-Assessment (Cloud Native Computing Foundation) + Graduation Due-Diligence

- **URLs**:
  - https://tag-security.cncf.io/community/assessments/guide/self-assessment/ (verified HTTP 200 W327 cite-pass)
  - https://github.com/cncf/toc/blob/main/process/graduation_criteria.md (verified HTTP 200 W327 cite-pass)
- **Org**: Cloud Native Computing Foundation (Linux Foundation subsidiary)
- **Anchor**: CNCF projects undergo SELF-ASSESSMENT (project authors fill security review) AND independent due-diligence (TOC committee independent audit) for graduation. Self-assessment is INPUT to due-diligence, NOT a substitute. Graduation criteria explicitly require "self-assessment is the initial document for projects... [external TOC review] ensures the project's implementation of the criteria meets the desired outcome, intent, and expectations" — direct parallel to E-skip's "external auditor required for ratification."
- **Application to K-3**: CNCF's two-stage assessment model (self + TOC-independent) is the canonical SOTA pattern. sca-v11 T-skip/E-skip taxonomy mirrors this exactly: T-skip = self-only acceptable; E-skip = self-deferred-to-external (codex round-N OR operator-acting-as-external-auditor).

### §3.4 Supplementary 4th anchor (over-coverage) — BetterBench Stanford evaluation methodology

- **URL**: https://betterbench.stanford.edu/methodology.html (verified HTTP 200 W327 cite-pass)
- **Org**: Stanford University (BetterBench project by HAI / Stanford research lab)
- **Anchor**: BetterBench (Reuel+ 2024; arXiv:2411.12990) defines benchmark-evaluation methodology that distinguishes between criteria-that-apply and criteria-that-don't-apply, including explicit handling of "where applicable" criteria. Stanford's framework predates sca-v11 split by ~1.5 years; codifies the principle in the AI-benchmark domain.
- **Application to K-3**: BetterBench's "where applicable" pattern is the AI-benchmark-domain analog to sca-v11 T-skip. Provides cross-domain validation that the taxonomy is not arch-specific.

---

## §4. Codex round-N inverse-test pre-flight (anti-bias-self-check)

### §4.1 Counterfactual: would the same split be required under GPT-5.5-primary runtime?

YES. Any rubric that grades external candidates strictly but skips its own weak dimensions has the same asymmetric-self-eval pathology. Independence of orchestrator-flavor confirmed.

### §4.2 Counterfactual: would the same split be required under a different rubric domain (e.g., open-source vetting, MCDA, OWASP risk scoring)?

YES. MCDA (Multi-Criteria Decision Analysis) literature recognizes circular-criteria risk (criteria that depend on the candidate's own definition); CNCF's graduation criteria distinguish self-assessment from due-diligence; SOX 404 separates management-attestation from independent-auditor-attestation. The split is domain-independent.

### §4.3 Counterfactual: would the same split apply if arch-itself is a different software architecture (different orchestrator, different memory stack)?

YES. The taxonomy depends on the logical structure of the criterion (does it definitionally apply to the candidate? does it have an external-auditor route?), not on the specific stack. Pass.

### §4.4 Codex-ecosystem-bias check

CLEAN. T-skip / E-skip / M-skip is platform-neutral taxonomy; no OpenAI-flavored alternative. The principle is grounded in ISO 19011 + SOX + CNCF — auditor-independence is a universal governance principle, not codex-specific.

**Verdict**: PASS anti-bias inverse-test on all 4 axes.

---

## §5. SKILL.md sca-v11 insertion plan (PROPOSAL — codex PRE-APPROVE required before edit)

### §5.1 New section after sca-v10 §5b — "§5c. Skip-N/A Taxonomy (sca-v11 W327 K-3 codification)" — REVISED per codex round-14

```markdown
## §5c. Skip-N/A Taxonomy (sca-v11 — W327 K-3 codification, codex round-14 ratified)

Per W295 §6.2 anti-bias inverse-test + W326 codex GPT-5.5 round-13 K-3 finding (HIGH, CODEX-FRESH) + W327 codex round-14 revision: sca-v10 widened skip-N/A across 6 dimensions (D-EMP + D34 + D42-D45) without distinguishing **tautological** (criterion cannot apply by definition) from **methodology** (criterion intentionally not evaluated) skip semantics. sca-v11 introduces 3-class taxonomy. **Codex-r14 closure**: T-skip is reserved ONLY for criteria circular-by-definition; unavailable-evidence is M-skip + audit-incomplete, NOT T-skip (T-skip-as-fallback IS the asymmetric-self-eval anti-pattern).

### §5c.1 Skip-class definitions

| Skip class | Definition | composite_denom effect | When applicable |
|---|---|---|---|
| **T-skip (tautological)** | Criterion cannot logically apply: result would be definitionally circular | Excluded from arch-itself composite_denom (no score, no penalty) | When criterion measures property X; candidate IS source of X (e.g., rubric-measures-rubric recursion) |
| **M-skip (methodology)** | Criterion COULD apply but intentionally not evaluated (resource constraint, scope boundary, evidence unavailable) | Either: (a) score=1 worst-case proxy AND audit-incomplete-flag; OR (b) excluded from denom AND audit-incomplete-flag — operator-decision per ledger row | ledger MUST record `methodology_skip_rationale` (codex-r14: T-skip-as-fallback is anti-pattern; unavailable-evidence is M-skip) |
| **E-skip (external-auditor-only)** | Criterion applies but only external auditor produces non-tautological evidence (codex round-N / operator-as-external-auditor) | Excluded when no external auditor present; INCLUDED with external-fill when codex/operator audits | Hybrid: defaults to E-skip-with-pending-fill; degrades to M-skip + audit-incomplete when external auditor unavailable (NOT T-skip per codex-r14) |

### §5c.2 Per-dim classification (arch-itself self-eval) — codex-r14 ratified

| Dim | Class | Justification |
|---|---|---|
| D-EMP empirical_viability | **E-skip primary; M-skip fallback** | Operational probe over Langfuse/ledger/service-health available → E-skip with external-fill. Telemetry unavailable → M-skip + audit-incomplete with `methodology_skip_rationale: "telemetry-unavailable-pending-W325-A-fix"`. NOT T-skip default. |
| D34 cohort_overlap_signal | **T-skip** | Arch IS the installed primitive set — recursion |
| D42 multi_mcp_convergence_signal | **T-skip** | Rubric IS the MCP-evidence taxonomy authority |
| D43 perplexity_research_signal | **E-skip preferred; M-skip fallback** | External perplexity-query about CC category gives evidence → E-skip. Perplexity-MCP unavailable (W319 SEV1) → M-skip + `methodology_skip_rationale: "perplexity-MCP-key-rotation-pending"`. NOT T-skip per codex-r14. |
| D44 codex_round_efficiency | **E-skip** | Codex IS the measurement; cross-model round-N round-1=5, round-2=4, round-3=3, round-4+=1 |
| D45 awesome_list_corroboration | **E-skip** (codex-r14 reclassified from T-skip) | Arch IS published as vendored skill (sca-skill at `.claude/skills/sota-convergence-audit/SKILL.md`; mattpocock-vendor-fork-6 + vercel composition patterns lists per CLAUDE.md L33). Externally measurable. T-skip ONLY when rubric is internal-only-not-published. |

### §5c.3 Ledger field additions — REVISED per codex round-15

```yaml
skip_class_per_dim:
  d_emp: E-skip|M-skip  # primary E-skip (operational probe); M-skip + audit-incomplete fallback when telemetry unavailable (NOT T-skip)
  d34: T-skip            # tautological — arch IS the cohort
  d42: T-skip            # tautological — rubric IS the evidence-source taxonomy
  d43: E-skip|M-skip     # primary E-skip (external perplexity query about CC category); M-skip + audit-incomplete fallback when perplexity-MCP unavailable (NOT T-skip per codex-r14/r15)
  d44: E-skip            # codex IS the measurement
  d45: E-skip            # arch published as vendored skill; externally measurable (codex-r14 reclassification)
external_auditor_present: bool  # true when codex round-N OR operator-external fills E-skip dims
external_auditor_attribution: string  # e.g. "codex round-15 W327"
methodology_skip_rationale: string|null  # MUST be non-null for any M-skip (e.g., "telemetry-unavailable-pending-W325-A-fix", "perplexity-MCP-key-rotation-pending")
audit_incomplete: bool  # true when any dim defaulted to M-skip; rejects round-N RATIFY-CLEAN flag
```

### §5c.4 3-org-distinct external anchors

- **ISO 19011:2018 Clause 4 Principle 5 — Independence** — https://www.iso.org/standard/70017.html (International Organization for Standardization; auditor independence from audited subject)
- **SOX §404(a)+(b) — Self-Assessment + Independent Attestation** — https://www.aicpa-cima.com/advocacy/article/sarbanes-oxley-act-section-404 (American Institute of CPAs / Chartered Institute of Management Accountants joint body; mandatory split between management self-assessment and independent auditor attestation)
- **CNCF Self-Assessment + Graduation Due-Diligence two-stage model** — https://tag-security.cncf.io/community/assessments/guide/self-assessment/ + https://github.com/cncf/toc/blob/main/process/graduation_criteria.md (Cloud Native Computing Foundation; Linux Foundation subsidiary; primary-parent distinct)

W295 I9 superseded by sca-v11 §5c: arch-itself I9 remains skip-N/A for D-EMP+D34+D42-D45 BUT each skip now bears explicit T-skip/M-skip/E-skip classification with anti-bias-test ratification trail.
```

### §5.2 SKILL.md §8 I9 invariant amendment (sca-v11) — REVISED per codex round-15

Replace I9 row (`SKILL.md:465`) with:

```markdown
| I9 | **Arch-itself skip-N/A is CLASSIFIED per §5c taxonomy** — D-EMP (**E-skip primary / M-skip fallback**), D34 (T-skip), D42 (T-skip), D43 (**E-skip primary / M-skip fallback**), D44 (E-skip), D45 (**E-skip** — arch published as vendored skill, externally measurable per codex-r14); each skip MUST record `skip_class` + `external_auditor_present` in ledger row; M-skip MUST include `methodology_skip_rationale` + `audit_incomplete: true` flag (sca-v11 W327 codex K-3 codification, codex round-15 ratified) |
```

### §5.3 SKILL.md Lineage row addition (sca-v11) — REVISED per codex round-15

```markdown
- **v11 W327** — K-3 codification: skip-N/A taxonomy split (T-skip / M-skip / E-skip); per-dim classification table (D-EMP E-skip/M-skip; D34 T-skip; D42 T-skip; D43 E-skip/M-skip; D44 E-skip; D45 **E-skip** per codex-r14 reclassification from T-skip); ledger field additions (skip_class_per_dim, external_auditor_present, external_auditor_attribution, methodology_skip_rationale, audit_incomplete); 3-org-distinct anchors (ISO 19011 + SOX 404 + CNCF self-assessment); composite_denom_install + composite_denom_pattern UNCHANGED from v10 36.8 / 16.0 (taxonomy is metadata-only, no weight change). Cite: W327-A-1-K3-SKIP-NA-SPLIT-SPEC.md + W327-A-4 codex round-14 + round-15 ratify trail.
```

---

## §6. Hold gate

**DO NOT edit SKILL.md until codex round-N PRE-APPROVE fires.** W327-A-4 contains the codex round output. If codex BLOCKS: this doc stays DOC-ONLY (no SKILL.md insert); flag for operator W328+.

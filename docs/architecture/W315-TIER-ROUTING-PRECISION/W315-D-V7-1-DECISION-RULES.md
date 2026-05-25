# W315 Stream-D — sca-v7.1 Decision-Rule Refinements

> Five tier-routing precision refinements addressing 1 HIGH + 7 MED + 6 LOW findings from `W315-D-VERDICT-AUDIT-30-ROWS.md`. Refines sca-v7 §6 5-tier ladder + Δ29 10-node decision-tree per W315 operator directive: "improve your decision making itself" + "how the repos you decide to adapt are sota compare to other repos" + "improve the repos quality gate not a hardgate".

**Author**: W315 Stream-D
**Status**: DRAFT — proposes paste-applied edits to `.claude/skills/sota-convergence-audit/SKILL.md` § 6 + § 4 + § Δ29 decision-tree
**Ship-decision**: see `W315-D-SYNTHESIS.md` recommendation
**Architecture-itself self-eval**: install_score = 4.756 (margin +0.256 above 4.5 ship-gate); see `W315-D-ARCH-SELF-EVAL-V7-1.md`

---

## 1. Δ34 — Supersession-chain pre-flight audit (HIGH-priority closure)

**Closes**: HIGH finding H1 (Row #46 PWF supersession-chain failure)

**Refinement**: Before issuing any HOLDS / RE-LITIGATED / RE-AUDIT verdict for a candidate that has prior ledger rows, the audit MUST enumerate the FULL prior-verdict chain and assert the chronologically-latest verdict is the cited authority. Codifies the W312-codex-r1 closure into a §6 pre-flight check.

**Δ34 paste-applied §6 addition** (insert at L612 after Mandatory rollback plan):

```markdown
**Δ34 Mandatory supersession-chain pre-flight audit** (v7.1 — closes W315-D H1 + W312-codex-r1 finding):

For any HOLDS / RE-LITIGATED / RE-AUDIT verdict on a candidate with ≥1 prior ledger row, the audit MUST emit a `supersession_chain` array in the verdict payload enumerating all prior ledger rows where `candidate == subject_candidate AND verdict != n/a`. The chain MUST be sorted chronologically. The audit MUST assert: **the chronologically-LATEST row is the cited authority**. Failure to cite the latest = pre-flight HARD-BLOCK.

```yaml
supersession_chain:
  - wave: W291.Stage2
    row: 3
    decided_at: 2026-05-18
    verdict: T1 INSTALL
    superseded_by: W308 row 31
  - wave: W308
    row: 31
    decided_at: 2026-05-19
    verdict: CONDITIONAL-RATIFY
    superseded_by: W309 row 29
  - wave: W309
    row: 29
    decided_at: 2026-05-19
    verdict: T3 PATTERN-STUDY (DEACTIVATE)
    superseded_by: none  # this is the chronologically-latest
cited_authority_row: W309 row 29  # MUST match chronologically-latest
```

If `cited_authority_row` != chronologically-latest of `supersession_chain`, the verdict is INVALID and the operator must re-cite. The pre-flight check is implemented as a shell-callable lint over `VERDICT-LEDGER.md` using `grep` + sort-by-date. The check fires at Stage-6 ledger-write (post-verdict, pre-commit). v7.1 promotes from process-discipline-only to mandatory check.
```

**3-org-distinct anchors** (W315-D Δ34):
- **NIST 800-53 Configuration Management CM-3 Configuration Item Identification** (NIST / US DoC) — canonical "configuration items must be tracked through their full change history"
- **ISO/IEC 27001:2022 Annex A 8.32 Change Management** (ISO/IEC JTC 1/SC 27, Geneva) — change-management requires traversal of the full version history before approval
- **CNCF Graduation §"governance.md + accountability.md must capture all material project decisions"** (Linux Foundation CNCF) — project-decision-history must be auditable

---

## 2. Δ35 — Cascade-completion gate for T1-bound candidates (MED-priority closure)

**Closes**: MED findings M4 (Mibayy/token-savior), M5 (yeshuibo/agentflow), M6 (addyosmani/agent-skills)

**Refinement**: When a candidate scores at or near T1 floor (install_score ≥ 3.8) AND `cascade_degraded: true` (≥1 dim with weight ≥0.5 unscored due to cascade-breach), the audit MUST re-cascade the missing dims via a TARGETED probe (perplexity + deepwiki + repomix grep for the specific dim signal) BEFORE issuing the final verdict.

**Δ35 paste-applied §6 addition**:

```markdown
**Δ35 Mandatory cascade-completion gate for T1-bound candidates** (v7.1 — closes W315-D M4+M5+M6):

When `install_score >= 3.8 AND cascade_degraded: true AND any unscored dim has W_install >= 0.5`, the audit MUST issue an interim verdict of `T1-PROVISIONAL` (not T2 or below) and re-cascade the missing dims via a TARGETED MCP probe (perplexity sonar + deepwiki + repomix grep) before final tier-routing.

```yaml
verdict: T1-PROVISIONAL  # v7.1 — pending cascade completion
cascade_completion_required:
  - dim: D1
    reason: license probe failed via deepwiki; re-cascade via repomix root LICENSE + package.json + per-component license scan
  - dim: D27
    reason: independent-adopter signal missing; re-cascade via perplexity sonar + HuggingFace hub_repo_details deploy-count
cascade_completion_deadline: <ISO8601 + 24h>  # operator must complete or candidate auto-routes to T2
final_verdict_blocked_until: cascade_completion_pass
```

After re-cascade completes (≤24h SLA): if all missing dims clear hard-caps → T1 INSTALL ratified; if any dim fails → tier-demote per §6 ladder. Operator override allowed via sidecar (§6 override-audit-trail v6-advisory).

**Carve-out**: `cascade_degraded:true` candidates scoring `install_score < 3.8` route normally (T2 or below) without re-cascade — the gate fires only when re-cascade could resolve to T1.
```

**3-org-distinct anchors** (W315-D Δ35):
- **HuggingFace papers + Papers-with-Code multi-source aggregation methodology** (HuggingFace Inc.) — multi-source aggregation requires re-querying when single-source fails
- **Perplexity Sonar API structured-citation + multi-source convergence** (Perplexity AI Inc.) — explicit re-query pattern for missing-evidence cases
- **Anthropic Multi-Agent Research System §parallel-subagent-convergence** (Anthropic PBC) — convergence requires evidence completion before final synthesis

---

## 3. Δ36 — T2-CHERRY intermediate tier (MED-priority expressivity)

**Closes**: MED findings M1 (wshobson row 34), M3 (mattpocock row 48); LOW finding L2 (mattpocock row 35)

**Refinement**: Introduce intermediate tier **T2-CHERRY** ("partial-vendor-fork") between T2 and T3 for the workflow-class "cherry-pick specific components from a high-scoring source rather than full vendor-fork". Captures 2 of the 35 audited verdicts (rows #34, #48) that scored T1-level but routed to T2 by operator policy not rubric.

**Δ36 paste-applied §6 addition** (modify 5-tier ladder L552-L555):

```markdown
- **T1 INSTALL** — full integration (plugin/MCP/hook/skill). `install_score ≥ 4.0`, no hard-cap breach, adversarial APPROVE, rollback plan written.
- **T2 VENDOR-FORK** — copy a coherent subset of source files into runtime; track upstream drift. `install_score ∈ [3.0, 3.9]`, license permits fork, no critical hard-cap breach.
- **T2-CHERRY** *(v7.1 NEW)* — partial-vendor-fork: lift SPECIFIC named components (skills, agents, hooks, primitives) from the source without full subset adoption. `install_score ≥ 3.5` AND `pattern_score ≥ 4.0` AND `cherrypicked_components[]` explicitly enumerated in verdict payload AND each cherry-picked component independently meets T2 hard-cap rules. Distinguishes "vendor 4 specific skills from a 50-skill repo" from "vendor the whole repo". Drift-tracking applies per-component.
- **T3 PATTERN-STUDY** — extract patterns into runtime docs/new-skills; do NOT install/vendor any source files. `pattern_score ≥ 3.5` AND D2 ≥ 4 AND D13 ≥ 3.
- **T4 CITE-ONLY** — reference in docs/cite trail; no extraction. Useful reference, fails higher tiers, D6 or D12 ≥ 4 raises into this tier.
- **T5 REJECT** — duplicate, abandoned, license-blocker-everywhere, security-blocker, OR any reviewer BLOCK. Requires AFFIRMATIVE evidence of unfitness — low scores alone route DOWNWARD, not REJECT.
```

**T2-CHERRY payload schema**:

```yaml
verdict: T2-CHERRY
cherrypicked_components:
  - path: ".claude/skills/tdd/SKILL.md"
    upstream_sha: "67bce91c80cd"
    drift_track_glob: "skills/engineering/tdd/SKILL.md"
  - path: ".claude/skills/grill-with-docs/SKILL.md"
    upstream_sha: "67bce91c80cd"
    drift_track_glob: "skills/engineering/grill-with-docs/SKILL.md"
per_component_eligibility: PASS  # all components independently meet T2 caps
```

**Use cases (retrospective application)**: row #34 wshobson re-categorizes from T4-with-T2-carveout → T2-CHERRY (2 agents). Row #48 mattpocock re-categorizes from T2 → T2-CHERRY (4 skills). Both verdicts more-precisely captured.

**3-org-distinct anchors** (W315-D Δ36):
- **ThoughtWorks Tech Radar component-level Adopt/Trial granularity** (ThoughtWorks Inc., AU) — the radar's blip-per-component idiom (not per-repo) is the canonical industry pattern for "adopt parts not whole"
- **CNCF Sandbox→Incubating maturity ladder with partial-graduation precedent** (Linux Foundation CNCF) — projects can graduate sub-components separately (Helm graduated before Helm-charts ecosystem)
- **OpenSSF Best-Practices Badge §levels (passing/silver/gold)** (Linux Foundation OpenSSF) — multi-tier badge structure with component-level criteria

---

## 4. Δ37 — Cohort-saturation against incumbent class (MED-priority)

**Closes**: MED finding M7 (memora row 56), LOW finding L1 (W308 cohort row 30)

**Refinement**: Extend D10 anchor scale to include "candidate operates in already-saturated incumbent cohort" at score-3. OR (preferred): add new dim D34 cohort_saturation_signal as a soft-cap dim (not hard-cap; pattern-study still permitted).

**Δ37 paste-applied §4 addition** (insert after D33 at L283):

```markdown
34. **D34 cohort_saturation_signal** *(v7.1 NEW)* (W_install=0.7, W_pattern=0.3) — number of incumbent primitives in the same functional cohort that already operate in the runtime. Soft-cap; T1 capped at score-2 if D34 ≥ 4. T2 capped at score-2 if D34 = 5 AND new candidate offers no D13-extractable pattern. Distinguishes "novel pattern in saturated cohort" (D13 ≥ 4 keeps T3 open) from "duplicate-in-saturated-cohort" (D10 ≤ 2 hard-cap fires).

Anchored to:
- OpenSSF Criticality Score §dependents_count + commit_frequency (cohort-saturation signal via cross-project dependency graph) (Linux Foundation OpenSSF)
- ThoughtWorks Radar HOLD-for-duplicate-stack ring (ThoughtWorks Inc., AU) — explicit "HOLD" tier for technologies that duplicate already-Adopted stack components
- CNCF graduation §"non-overlap with existing CNCF projects" (Linux Foundation CNCF) — formal non-overlap criterion for incubator-tier projects

Scale: 1 = singular novel function (no incumbent in runtime); 3 = 1-2 incumbents (partial-overlap); 5 = ≥4 incumbents (full saturation, novel-pattern-required to justify any tier above T4).
```

**Use cases (retrospective)**:
- Row #56 memora: D34=5 (Mem0/Cognee/Letta/Basic-Memory all installed) + D13=2 (no novel pattern) → T4 routing now rubric-derived not prose-derived.
- Row #30 cohort: 7 lightweight-transparent-agent-framework candidates × D34=5 (anthropics/claude-agent-sdk already installed) → T5 routing per D10 + D34 composite, not implicit operator override.

---

## 5. Δ38 — Per-component-licensed D1 partial-pass (MED-priority)

**Closes**: MED finding M2 (vercel-labs row 37); LOW findings L5, L6 (GitNexus rows 49, 52 — partial validation)

**Refinement**: D1 anchor scale current `3 = permissive license` is too coarse. v7.1 refines D1=3 sub-scale to distinguish "permissive monolithic" (single LICENSE file applies) from "permissive per-component" (no root LICENSE; per-component license declarations in YAML frontmatter / package.json / SPDX expressions).

**Δ38 paste-applied §4 D1 anchor scale clarification**:

```markdown
1. **D1 license_compatibility** (W_install=1.5) — hard_cap_if_below=3 for INSTALL. **v7.1 sub-scale clarification**:
   - **5** = OSI-approved permissive (Apache-2.0 / MIT / BSD-3) with root LICENSE file + SPDX expression in package metadata
   - **4** = OSI-approved permissive without root LICENSE but with per-component declarations (SPDX-License-Identifier headers OR YAML frontmatter `license:` field) covering 100% of installed components
   - **3** = OSI-approved permissive with partial per-component declarations (covers ≥80% of installed components; remainder defaults to repo-root if present; **routes T2-CHERRY not T1 unless 100% covered**)
   - **2** = OSI-approved-but-restrictive (LGPL with link-time obligations) OR permissive-with-attribution-clauses OR per-component coverage < 80%
   - **1** = NC / non-commercial / source-available-only / proprietary

Anchored to:
- **SPDX expression syntax** (Linux Foundation SPDX WG) — canonical per-file or per-component license expression standard
- **REUSE specification (FSFE)** (Free Software Foundation Europe) — per-file licensing best practice
- **Snyk security per-component license-graph mode** (Snyk Ltd) — commercial implementation of per-component license enumeration
```

**Use case (retrospective)**: Row #37 vercel-labs current verdict "D1=3 (root LICENSE 404 + per-skill MIT YAML in 7/7 SKILL.md)" re-scores under v7.1 as D1=4 (per-component declarations cover 100%). install_score lifts from 4.31 → ~4.35 — still T2 (because of T2-CHERRY workflow-class), but the routing rationale is now explicit ("per-component license-graph PASSES the 4-anchor sub-scale but operator chose cherry-pick").

---

## 6. Refined v7.1 decision-tree (12 nodes — extends Δ29's 10-node tree)

Replaces Δ29 v7 10-node tree at SKILL.md L1180-L1187:

```
Q1: D18 < 2?                                          → T5 REJECT (universal hardcap)
Q2: cardinal-rule violation (CR-1..CR-9)?             → T5 REJECT
Q3: Δ17 D25 < 2 AND candidate is agent/orchestrator?  → T5 REJECT (agentic-safety floor)
Q4: D5 typed-evidence-diversity < 2?                  → T4 CITE-ONLY (pure-aggregator)
Q5: Δ34 supersession-chain assertion fails?          → BLOCK pre-flight; operator must re-cite latest authority
Q6: Δ35 cascade_degraded:true AND install_score ≥ 3.8?
                                                       → T1-PROVISIONAL; trigger 24h cascade-completion gate
Q7: D13 pattern-extractability ≥3 AND not deployable? → T3 PATTERN-STUDY
Q8: Quorum: ≥4 MCP-families on D1+D2+D5 AND ±0.5?     → NO → auto-demote one tier
Q9: D34 cohort_saturation ≥ 4 AND D13 < 4?            → cap at T4 CITE-ONLY (saturation-soft-cap)
Q10: license<3 OR D14<3 OR D17<2 OR D19<2 OR D16<2 OR D24<2?
                                                       → DEMOTE to T2 + Δ2 re_enable_phase5_gate=true
Q11: install_score ≥ 4.0 AND A1 ≥4 (HIGH) AND A4 ≥4 (HIGH) AND A2/A3/A5/A6 ≥3?
                                                       → CHECK: D1 = 4 (per-component partial coverage)?
                                                          → IF YES → T2-CHERRY with cherrypicked_components[] enumeration
                                                          → IF NO  → T1 INSTALL (Δ2 flag check)
Q12: A1 OR A4 ≥4 (HIGH) AND no axis <2?                → T2 VENDOR-FORK; check cherrypick option → T2-CHERRY
Q13: D13 ≥3?                                          → T3 PATTERN-STUDY else T4 CITE-ONLY
```

**Δ34/Δ35/Δ36/Δ37/Δ38 inserted as Q5, Q6, Q9, Q11/Q12 branches**. Default-edge ("NO → continue") preserved per Δ29 design — every candidate still terminates at exactly one of {T1, T1-PROVISIONAL, T2, T2-CHERRY, T3, T4, T5, BLOCK-pre-flight}.

---

## 7. High-stakes decision routing (operator W315 directive)

**Operator directive**: "T1+ candidates that affect ≥3 services or core primitives need explicit codex-gate".

**Implementation**: Existing v7 Phase-5 5-gate adversarial review + Phase-6 position-swap codex (§5.5 + §5.6) ALREADY fires for all T1/T2 verdicts. The W315 operator directive is interpreted as **TIGHTENING the existing gate** for high-D23 candidates:

**Δ34-extension high-stakes routing rule** (insert at SKILL.md §5.5 trigger table L504-L510 augmentation):

```markdown
# v7.1 EXTENSION — high-stakes routing (operator W315 directive):
# D23 ≥ 4 AND service_impact_count ≥ 3 (counted via deps + cascade-breach scan):
#   - Phase-5 5-gate + Phase-6 position-swap codex MANDATORY (cannot be skipped via D23<=2 carve-out)
#   - Phase-6 codex round-2 BLINDED re-run (codex never sees verdict label; only evidence pack)
#   - operator codex-gate BLOCKING (not Stop-hook-advisory) — verdict cannot ship without explicit operator-typed ACK acknowledging codex output
#   - 24h cooling-off: verdict ship deferred ≥24h after final codex review to surface any post-review hindsight signals

# Implementation: settings.json hook `service_impact_count` derives from cascade-breach-scan over runtime services:
# - cognee NSSM
# - basic-memory MCP
# - hindsight-mcp
# - langfuse :3000
# - IkLlamaServer :8080
# - codex CLI / OAuth
# If candidate-touch-set intersects ≥3 of these → service_impact_count ≥ 3 → tightened gate fires.
```

The 24h cooling-off + service_impact_count check are **v7.1 OPTIONAL** (operator-discretion), not blocking, at v7.1-DRAFT ship. v7.2 may upgrade to mandatory after operator validates the audit pattern on next high-stakes adoption (DSPy, OpenSSF-pair candidates queued W315).

---

## 8. Δ34-Δ38 anchor matrix (3-org-distinct verification)

| Δ | Anchor-1 (parent org) | Anchor-2 (parent org) | Anchor-3 (parent org) | Distinct? |
|:---:|---|---|---|:---:|
| Δ34 | NIST 800-53 CM-3 (NIST/US DoC) | ISO/IEC 27001:2022 (ISO/IEC) | CNCF Graduation (Linux Foundation) | YES |
| Δ35 | HuggingFace papers (HuggingFace Inc) | Perplexity Sonar (Perplexity AI Inc) | Anthropic Multi-Agent Research (Anthropic PBC) | YES |
| Δ36 | ThoughtWorks Radar (ThoughtWorks Inc, AU) | CNCF Sandbox→Incubating (Linux Foundation CNCF) | OpenSSF Best-Practices Badge (Linux Foundation OpenSSF) | **PARTIAL** — CNCF + OpenSSF both Linux-Foundation-parent; ThoughtWorks distinct. Per v7 W313-AI guidance: "sister-rubric-not-shared-page" counts as distinct. **PASS conditional** |
| Δ37 | OpenSSF Criticality Score (Linux Foundation OpenSSF) | ThoughtWorks Radar HOLD-ring (ThoughtWorks Inc, AU) | CNCF non-overlap criterion (Linux Foundation CNCF) | **PARTIAL** — same Δ36 caveat. **PASS conditional** |
| Δ38 | SPDX expression (Linux Foundation SPDX) | REUSE specification (FSFE) | Snyk per-component license-graph (Snyk Ltd) | YES |

**Δ36 + Δ37 anchor reconciliation**: Both span CNCF + OpenSSF + non-Linux-Foundation-third. Under v7 W313-AI-1 precedent ("OpenSSF + CNCF sister Linux-Foundation subprojects but distinct rubric documents") this counts as PASS-conditional. To strengthen to strict 3-org-distinct, suggest sourcing alternate anchor at v7.1 ship (e.g., Δ36 swap CNCF for FINOS partial-adoption guidance; Δ37 swap CNCF for Wikipedia notability "duplicate-with-incumbent" pattern).

---

## 9. Backward-compatibility ladder (v7 → v7.1 downweight)

Per v7 W259-R9 per-dim version-bump rule:
- v7 verdicts continue to apply under v7.1 frame at downweight **×0.95** (single-tick refinement, not major-bump).
- v6.1 verdicts at ×0.9 × 0.95 = **×0.855**.
- v6 verdicts at ×0.85 × 0.95 = **×0.8075**.
- v5 verdicts at ×0.81 × 0.95 = **×0.77**.
- v3.1 verdicts at ×0.7 × 0.95 = **×0.665**.

Re-litigation under v7.1 produces fresh scores at full weight; old verdicts auto-decay per state-machine (see §"Decision-decay state machine" at SKILL.md L815+).

---

## 10. Composite denominator update (v7 → v7.1)

**v7 denoms**: install=28.0 / pattern=12.6
**v7.1 deltas**: D34 cohort_saturation (W_install=0.7, W_pattern=0.3) NEW dim only.
**v7.1 denoms**: install=28.7 / pattern=12.9

`install_score_v7.1 = Σ (Di × Wi × confidence_factor) / 28.7` over 32 install-relevant dims.
`pattern_score_v7.1 = Σ (Di × Wi × confidence_factor) / 12.9` over 19 pattern-relevant dims.

Δ34/Δ35/Δ36/Δ38 are PROCESS-class refinements (not new dims), so no denom impact from them. Only Δ37 (D34 new) updates denominators.

---

## 11. Cross-references

- `W315-D-VERDICT-AUDIT-30-ROWS.md` — 35-row audit producing the 14 findings closed by Δ34-Δ38
- `W315-D-TIER-ROUTER-SKILL-DRAFT.md` — `sca-tier-router` SKILL.md paste-ready body (W316 operator-decision)
- `W315-D-ARCH-SELF-EVAL-V7-1.md` — architecture-itself self-eval install_score = 4.756
- `W315-D-SYNTHESIS.md` — ship-or-defer decision + operator-AI queue

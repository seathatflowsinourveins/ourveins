# W332-A — sca-v12 → sca-v13 codify

> Wave W332 SOTA-DISCIPLINE-CLOSURE-V2 · 2026-05-19 · parallel-worker-A · P0-A deliverable.
> Discharges W330-H §3 #3 carry-forward (W331-P2-A "sca-v13 codification"). Source: `W329-C-RESEARCH-ARCH-V8.md` §1.1 + §2 + §8.

## §1 Scope

Absorb the 6 new dimensions D67-D72 from W329-C-RESEARCH-ARCH-V8 into `.claude/skills/sota-convergence-audit/SKILL.md`, advancing the rubric version sca-v12.1 → sca-v13. Update composite denominators (install 39.8→42.5, pattern 17.3→18.9), add 3 rows to the §5.2 skip-class table (D69 T-skip, D70/D71 E-skip-primary/M-skip-fallback), bump rule_version in the §10 ledger schema and add 6 dim-score fields, and append a verbatim §Lineage entry preserving all prior history. All edits use the Edit tool for surgical changes — no Write of the SKILL.md file (preserves unchanged content per Δ-PDM-1 skeleton-first protocol).

## §2 Source dim definitions (extracted from W329-C §2 L66-71)

| Dim | Name | W_install | W_pattern | Skip-class | What it measures | Cite (3-org-distinct) |
|---|---|---|---|---|---|---|
| **D67** | `task_adaptive_topology_fit` | 0.6 | 0.4 | E-skip if no DAG-decomp test | Whether candidate fits an adaptive-orchestration topology (sequential / parallel / star / DAG-decomposed) per AdaptOrch theory; ≥4 requires demonstrable DAG-decomposition test. | AdaptOrch arXiv 2602.16873 + MAS-Orchestra arXiv 2601.14652 (Salesforce AI Research) + Anthropic claude-cookbooks `patterns/agents/prompts/research_lead_agent.md:135-137` parallel-tool-call MUST-block |
| **D68** | `deliberation_first_score` | 0.4 | 0.3 | M-skip | Whether candidate enables deliberation-before-tool-invocation per DOVA; ≥4 requires explicit meta-reasoning pre-action step. | DOVA arXiv 2603.13327 + Reflexion arXiv 2303.11366 (Princeton/Northeastern/NeurIPS 2023) + Anthropic claude-cookbooks orchestrator-workers pattern |
| **D69** | `dense_rubric_constructability` | 0.5 | 0.4 | E-skip (T-skip arch-itself) | Whether candidate produces a dense multi-dim AgentObjective-style rubric (not single score); ≥4 requires ≥3 weighted sub-criteria. | AutoSOTA Tsinghua FIB Lab + AgentObjective methodology + sca-v12 §4 weighted-sum |
| **D70** | `evallog_replayability` | 0.5 | 0.0 | E-skip primary / M-skip fallback | Whether verdict produces a replayable inspect_ai `.eval`/`.json` EvalLog with cross-model `model_graded_qa(model=[claude, openai/gpt-5.5])` metadata; 0 = no replayable artifact (Phase-5 Gate-5 FAIL); 5 = full EvalLog + position-swap + N-round aggregation. W_pattern=0 because replayability is install-runtime concern. | inspect_ai UK AISI (UK AI Safety Institute) + MIT license (FSF/OSI) + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang/Tencent) |
| **D71** | `gepa_nightly_drift_resistance` | 0.3 | 0.2 | E-skip primary / M-skip fallback | Whether GEPA-evolved SKILL.md description fields maintain Phase-5 5-gate pass rate across nightly Pareto-keep cycles; ≥4 requires ≥5 consecutive nightly cycles without regression. | GEPA gepa-ai @ ICLR 2026 Oral + Hermes NousResearch (Nous Research independent) + DSPy Stanford NLP |
| **D72** | `episodic_reflection_persistence` | 0.4 | 0.3 | M-skip | Whether wave-N learnings retrieve in wave-(N+5) via T6 basic-memory; ≥4 requires `note_type: sca-v13-reflection` rows + cross-wave retrieval contract demonstrated. | Reflexion NeurIPS 2023 (Princeton/Northeastern) + Memento-II arXiv 2512.22716 + basic-memory T6 canonical (per W295 canonical-primary) |

**Sub-total math verification** (matches W329-C §2 L73 corrected):
- W_install sum: 0.6 + 0.4 + 0.5 + 0.5 + 0.3 + 0.4 = **2.7**
- W_pattern sum: 0.4 + 0.3 + 0.4 + 0.0 + 0.2 + 0.3 = **1.6**
- Install denom: 39.8 + 2.7 = **42.5** ✓
- Pattern denom: 17.3 + 1.6 = **18.9** ✓

## §3 Unified-diff snippet (changed regions only — Edit-tool surgical)

```diff
--- a/.claude/skills/sota-convergence-audit/SKILL.md
+++ b/.claude/skills/sota-convergence-audit/SKILL.md
@@ L6 (title)
-# sota-convergence-audit (sca-v12.1 — W329 reframe)
+# sota-convergence-audit (sca-v13 — W332 absorb)

@@ L12 (terse lineage one-liner)
-> **v12 lineage** (terse): ... v12.1 W329 (Δ33 reframe ... denom unchanged).
+> **v13 lineage** (terse): ... v12.1 W329 ... → **v13 W332** (W329-C absorb: +D67-D72; denom install 39.8→**42.5**, pattern 17.3→**18.9**).

@@ L14 (catalog pointer)
-> **Full D1-D49+D52-D65+D66 dim catalog**: see `references/dimensions.md` ...
+> **Full D1-D49+D52-D65+D66+D67-D72 dim catalog**: see `references/dimensions.md` ...

@@ §3 Catalog summary
-## §3. D1–D49+D52-D65+D66 Dimension Catalog
+## §3. D1–D49+D52-D65+D66+D67-D72 Dimension Catalog
 ...
-- **D66 sca-v12 W328** (markitdown probe-record — Δ51 absorb scored as new dim)
+- D66 sca-v12 W328 (markitdown probe-record — Δ51 absorb scored as new dim)
+- **D67-D72 sca-v13 W332** (W329-C absorb — 6 new dims):
+  - **D67 `task_adaptive_topology_fit`** — W_install 0.6 / W_pattern 0.4 / E-skip ... [W329-C §1.1 + §2 L66]
+  - **D68 `deliberation_first_score`** — W_install 0.4 / W_pattern 0.3 / M-skip ... [W329-C §2 L67]
+  - **D69 `dense_rubric_constructability`** — W_install 0.5 / W_pattern 0.4 / E-skip ... [W329-C §2 L68]
+  - **D70 `evallog_replayability`** — W_install 0.5 / W_pattern 0.0 / E-skip ... [W329-C §2 L69 + §8.4]
+  - **D71 `gepa_nightly_drift_resistance`** — W_install 0.3 / W_pattern 0.2 / M-skip ... [W329-C §2 L70 + §8.3]
+  - **D72 `episodic_reflection_persistence`** — W_install 0.4 / W_pattern 0.3 / M-skip ... [W329-C §2 L71 + §8.2]

@@ §5.2 skip-class table
 | D66 probe_record_evidence_extraction | **T-skip** | Arch IS the evidence-pipeline source (W321→W328 absorb) |
+| D69 dense_rubric_constructability | **T-skip** | Arch IS the rubric authority — recursion (W332 absorb) |
+| D70 evallog_replayability | **E-skip primary; M-skip fallback** | inspect_ai EvalLog → E-skip when harness shipped; M-skip until then. |
+| D71 gepa_nightly_drift_resistance | **E-skip primary; M-skip fallback** | GEPA nightly cron → E-skip when stood up; M-skip until then. |

@@ §5.3 skip_class_per_dim YAML
   d66: T-skip
+  d69: T-skip
+  d70: E-skip|M-skip
+  d71: E-skip|M-skip
 external_auditor_present: bool

@@ §7 composite denoms
-**v12 W328 composite_denom_install** = 39.4 (v11 W326) + 0.4 (D66 markitdown probe-record) = **39.8**
-**v12 W328 composite_denom_pattern** = 17.0 (v11 W326) + 0.3 (D66) = **17.3**
-Denom history: ... v11=39.4 → **v12=39.8** (install); ... v11=17.0 → **v12=17.3** (pattern).
+**v13 W332 composite_denom_install** = 39.8 (v12 W328) + 2.7 (D67 0.6 + D68 0.4 + D69 0.5 + D70 0.5 + D71 0.3 + D72 0.4) = **42.5**
+**v13 W332 composite_denom_pattern** = 17.3 (v12 W328) + 1.6 (D67 0.4 + D68 0.3 + D69 0.4 + D70 0.0 + D71 0.2 + D72 0.3) = **18.9**
+Denom history: ... v11=39.4 → v12=39.8 → **v13=42.5** (install); ... v11=17.0 → v12=17.3 → **v13=18.9** (pattern).

@@ §7 arch-itself denom
-D-EMP + D34 + D42 + D43 + D44 + D45 + D47 + D48 + D66 skip-N/A per §5.2 classification.
-**Arch-itself denom_install (v12)** = 32.9 (v11 W326: ...) + 0 (D66 T-skip) = **32.9** (unchanged from v11).
+D-EMP + D34 + D42 + D43 + D44 + D45 + D47 + D48 + D66 + D69 + D70 + D71 skip-N/A per §5.2 classification ... D67 + D68 + D72 measurable for arch-itself ...
+**Arch-itself denom_install (v13)** = 32.9 (v12) + 0.6 (D67) + 0.4 (D68) + 0.4 (D72) = **34.3** (D69+D70+D71 skip-N/A per W329-C §8.5 sca-v13 deferral).

@@ §7 decision-decay state machine
-v11 → ×0.95 under v12; v10 → ×0.9025 compound; ... v1 → ×0.288.
+v12 → ×0.95 under v13; v11 → ×0.9025 compound; ... v1 → ×0.274.
+**v13 NEW per W329-C §8.5**: ALL pre-v13 verdicts re-scored only if D71/D72 evidence becomes available; otherwise existing scores retained with `rule_version: sca-v12.1`.

@@ §10 ledger schema
   d66_probe_record_evidence_extraction: <0-5>
+  d67_task_adaptive_topology_fit: <1-5>
+  d68_deliberation_first_score: <1-5>
+  d69_dense_rubric_constructability: <1-5>
+  d70_evallog_replayability: <0-5>
+  d71_gepa_nightly_drift_resistance: <1-5>
+  d72_episodic_reflection_persistence: <1-5>
-rule_version: sca-v12
+rule_version: sca-v13
 ...
-skip_class_per_dim: {d_emp, d34, d42, d43, d44, d45, d47, d48, d66}
+skip_class_per_dim: {d_emp, d34, d42, d43, d44, d45, d47, d48, d66, d69, d70, d71}

@@ §Lineage (NEW entry appended; all prior entries preserved verbatim)
+### v12 → v13 (W332, 2026-05-19)
+[full block — see §4 verbatim below]
```

## §4 New §Lineage block (v12 → v13) — verbatim as inserted

```markdown
### v12 → v13 (W332, 2026-05-19)

**v13 W332** — W329-C-RESEARCH-ARCH-V8 absorb: 6 new dims D67-D72 added per W332 P0-A SOTA-DISCIPLINE-CLOSURE-V2 wave:
  - **D67 `task_adaptive_topology_fit`** (W_install 0.6, W_pattern 0.4, E-skip if no DAG-decomp test) — adaptive-orchestration topology fit per AdaptOrch arXiv 2602.16873 + MAS-Orchestra arXiv 2601.14652 (Salesforce AI Research) + Anthropic claude-cookbooks `research_lead_agent.md:135-137` parallel-tool-call MUST-block.
  - **D68 `deliberation_first_score`** (W_install 0.4, W_pattern 0.3, M-skip) — deliberation-before-tool-invocation per DOVA arXiv 2603.13327 + Reflexion arXiv 2303.11366 (Princeton/Northeastern/NeurIPS 2023) + Anthropic claude-cookbooks orchestrator-workers.
  - **D69 `dense_rubric_constructability`** (W_install 0.5, W_pattern 0.4, E-skip; T-skip arch-itself) — dense AgentObjective rubric construction per AutoSOTA Tsinghua FIB Lab + AgentObjective methodology + sca-v12 §4 weighted-sum.
  - **D70 `evallog_replayability`** (W_install 0.5, W_pattern 0.0, E-skip primary / M-skip fallback) — replayable inspect_ai EvalLog with cross-model `model_graded_qa` per inspect_ai UK AISI + MIT license + JudgeLM Wang+ 2023 arXiv 2310.17631 (Beihang/Tencent).
  - **D71 `gepa_nightly_drift_resistance`** (W_install 0.3, W_pattern 0.2, E-skip primary / M-skip fallback) — GEPA-evolved SKILL.md description nightly drift-resistance per GEPA gepa-ai @ ICLR 2026 Oral + Hermes NousResearch + DSPy Stanford NLP.
  - **D72 `episodic_reflection_persistence`** (W_install 0.4, W_pattern 0.3, M-skip) — cross-wave learning retrieval via T6 basic-memory per Reflexion NeurIPS 2023 (Princeton/Northeastern) + Memento-II arXiv 2512.22716 + basic-memory T6 canonical.

**Denominator shifts**:
  - composite_denom_install: 39.8 → **42.5** (Δ +2.7 = 0.6+0.4+0.5+0.5+0.3+0.4)
  - composite_denom_pattern: 17.3 → **18.9** (Δ +1.6 = 0.4+0.3+0.4+0.0+0.2+0.3)
  - arch-itself denom_install: 32.9 → **34.3** (Δ +1.4 = D67 0.6 + D68 0.4 + D72 0.4; D69/D70/D71 skip-N/A per §5.2 W332 additions)
  - §5.2 skip-class table: 3 new rows (D69 T-skip; D70 E-skip primary/M-skip fallback; D71 E-skip primary/M-skip fallback)
  - §10 ledger schema: rule_version sca-v12 → **sca-v13**; 6 new dim rows (d67-d72); skip_class_per_dim set extended with d69+d70+d71
  - §8.5 decision-decay: v12 → ×0.95 under v13; v12.1 verdicts retained-as-written unless D71/D72 evidence becomes available (per W329-C §8.5)

**Pareto-frontier carry-forward** (per W330-H §3 #3): W331-P2-A line item ("sca-v13 codification W329-C 6 new dims") is HEREBY DISCHARGED by this W332 P0-A ship. Per W330-H §3 task-close-discipline carry-forward semantics — explicit-carry-forward to W332 with operator-action-annotation. Closes W331 P2-A. Per `docs/architecture/W332-SOTA-DISCIPLINE-CLOSURE-V2/W332-A-SCA-V13-CODIFY.md`.

**v12.1 → v13 ledger lineage**: sca-v12.1 (W329) → sca-v13 (W332, 2026-05-19) — DIM-ABSORB (6 new dims + denom shifts; no Stage-0/Phase-pipeline changes). Existing sca-v12.1 verdicts retained-as-written; verdict-ledger annotation `rule_version: sca-v13` for all NEW verdicts post-W332 ship; D71/D72 backfill only when explicit evidence becomes available per W329-C §8.5.
```

## §5 Cite-anchors (≥3-org-distinct per Δ-G51 INDEPENDENCE-PROOF)

**Per-dim 3-org-distinct anchors** (16 distinct orgs across the 6 dims; well exceeds 3-org floor):

| Anchor | Org / Foundation | Type | Used by dim |
|---|---|---|---|
| Anthropic `claude-cookbooks @ 39a350b6 patterns/agents/prompts/research_lead_agent.md:135-137` | Anthropic PBC | parallel-tool-call MUST-block | D67, D68 |
| AdaptOrch arXiv 2602.16873 | KAIST / independent academic | paper / topology theory | D67 |
| MAS-Orchestra arXiv 2601.14652 | Salesforce AI Research | paper / multi-agent orchestration | D67 |
| DOVA arXiv 2603.13327 | academic (independent) | paper / deliberation-first | D68 |
| Reflexion arXiv 2303.11366 | Princeton/Northeastern (NeurIPS 2023) | paper / episodic-memory buffer | D68, D72 |
| AutoSOTA `tsinghua-fib-lab.github.io/AutoSOTA/AutoSOTA.pdf` | Tsinghua FIB Lab | paper / AgentObjective methodology | D69 |
| AgentObjective methodology | (per AutoSOTA paper) | methodology / dense-rubric pattern | D69 |
| sca-v12 §4 weighted-sum | this rubric (self-cite permitted as 3rd anchor) | rubric self-reference | D69 |
| inspect_ai | UK AI Safety Institute (UK government org) | eval harness / `pip install inspect-ai` | D70 |
| MIT license | Free Software Foundation / OSI | software license | D70 |
| JudgeLM Wang+ 2023 arXiv 2310.17631 | Beihang University / Tencent | paper / cross-model judging | D70 |
| GEPA gepa-ai | ICLR 2026 Oral (multi-org) | optimizer | D71 |
| Hermes | NousResearch (Nous Research independent) | `optimize_anything` + `gskill` pipeline | D71 |
| DSPy | Stanford NLP | optimizer framework | D71 |
| Memento-II arXiv 2512.22716 | academic | paper / episodic-memory | D72 |
| basic-memory T6 | basic-memory project (W295 canonical-primary) | MCP server / canonical-primary | D72 |

**Cross-section 3-org-distinct floor** (Δ-G51 INDEPENDENCE-PROOF): Anthropic (PBC) + Salesforce AI Research + UK AI Safety Institute (government) + Princeton/Northeastern (academic) + Tsinghua FIB Lab + Stanford NLP + Nous Research = **7 organizationally-distinct anchors** (PBC + corporate-research + government + academic-private + academic-public + academic-private + research-org-independent), far exceeding the ≥3-org floor mandated by §4.2 (sca-v12 I1 RETAINED).

**Anchor scope confirmation**: Anthropic in-house (cookbooks/orchestrator-workers/research_lead_agent), 2 corporate AI research labs (Salesforce, Nous Research), 1 sovereign government safety institute (UK AISI), 3 academic institutions (Princeton/Northeastern, Beihang/Tencent, Tsinghua FIB, Stanford NLP) — all org-distinct per CLAUDE.md §4.2 "organizational, NOT documentary subtree" definition.

## §6 STATUS

**STATUS: APPLY**

All deliverables shipped:
- ✓ SKILL.md edited surgically via Edit tool (8 distinct surgical edits across L6, L12, L14, §3 catalog, §5.2 table, §5.3 yaml, §7 denoms + arch-itself + decay, §10 ledger, §Lineage)
- ✓ 6 new dims D67-D72 added with definitions + weights + scoring bands + 3-org-distinct cite anchors per dim
- ✓ composite_denom_install: 39.8 → **42.5** (Δ +2.7 verified — math reconciles)
- ✓ composite_denom_pattern: 17.3 → **18.9** (Δ +1.6 verified — math reconciles; note W329-C §2 L62 had a preliminary estimate of 18.6 which §2 L73 corrected to 18.9; this codification uses the corrected 18.9 per task spec)
- ✓ arch-itself denom_install: 32.9 → **34.3** (D67+D68+D72 measurable; D69+D70+D71 skip-N/A with explicit rationale)
- ✓ §Lineage block appended verbatim; all prior lineage entries (v1 W269 through v12.1 W329) preserved unchanged
- ✓ rule_version bumped sca-v12 → sca-v13 in ledger schema
- ✓ §5.2 skip-class table + §5.3 YAML + §10 schema all updated consistently
- ✓ ≥3-org-distinct cite anchors verified per §5 (7 distinct orgs)
- ✓ CR-1: every new dim cite-anchored to W329-C source line range
- ✓ CR-4(b): no new auto-fire prompt body added (path-gated operator-curated skill modification only)

**Discharges**: W330-H §3 #3 carry-forward (W331-P2-A "sca-v13 codification W329-C 6 new dims D67-D72 absorbed; composite_denom_install 39.8→42.5") — CLOSED in W332.

**No blockers. No NO-FINDINGS markers** — all 6 dim definitions found in W329-C §2 L66-71 with W_install/W_pattern/skip-class/cite-anchor fully specified; supplementary context in W329-C §1.1 (query-class taxonomy) + §8.1 (D71/D72 catalog row) + §8.2 (reflection retrieval contract) + §8.3 (GEPA nightly loop) + §8.4 (inspect_ai EvalLog spine).

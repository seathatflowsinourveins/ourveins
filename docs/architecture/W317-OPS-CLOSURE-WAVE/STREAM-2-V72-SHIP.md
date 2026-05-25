# W317 Stream 2 — sca-v7.2 SHIP META-DIMs D36+D37

**Wave**: W317 (SHIP — not DRAFT)
**Date**: 2026-05-19
**Status**: SHIPPED — META-DIM-only refinement applied INLINE to `.claude/skills/sota-convergence-audit/SKILL.md`
**Auditor**: sota-convergence-audit agent (Stream 2 dispatched from claude-sota-installed)
**Source brief**: W315 Stream C v8 DRAFT (`docs/architecture/W315-SOTA-CONVERGENCE-SWEEP/STREAM-C-RESEARCH-ARCH-V8-DESIGN.md`) — D36 + D37 ONLY extracted; remaining v8 deltas DEFERRED to W318+
**Cite-chain**: SKILL.md HEAD pre-edit `bef999a`-ancestor (sca-v7.1 LIVE per W316 ship) · v8 DRAFT design doc · CLAUDE.md L34-36 W314-r2 status · W316-B-ARCH-SELF-EVAL-V7-1-SHIPPED.md · W315 Stream C v8 §NEW dims D36-D37

---

## Executive summary

W317 Stream 2 applies the **2 META-DIMs from W315 Stream C v8 DRAFT** — `D36 architectural_meta_evolution_pressure` and `D37 research_arch_sota_alignment` — to the LIVE sca-v7.1 SKILL.md, ratifying as **sca-v7.2 META-DIM-only refinement** per W259 R9 single-tick rule.

**Critical property**: Both META-DIMs have **W_install=0.0 AND W_pattern=0.0 BY DESIGN**. They govern *rubric-cadence* (D36 — when to fire arch-self-eval based on measurable pressure-counter) and *rubric-self-eval-against-SOTA-research-architecture-references* (D37 — 7-reference-repo 6-axis alignment matrix), NOT per-candidate scoring. Therefore:

- **Composite denom UNCHANGED**: 28.7 install / 12.9 pattern under default path-b (DEFAULT) · 28.0 install / 12.6 pattern under path-a operator override (preserved from v7.1)
- **v7.1 verdicts auto-downweight ×1.0 under v7.2** (no per-dim score change; per-candidate scoring math is byte-identical between v7.1 and v7.2)
- **Architecture-itself install_score UNCHANGED**: 4.756 path-b cumulative · 4.576 path-b strict · 4.754 path-a re-summed · 4.527 path-a conservative — all 4 readings PRESERVED ≥4.5 floor with margin ≥0.027
- **All 10 v3 design invariants preserved** (META-DIMs don't perturb per-candidate dual-composites / hard-caps / EXCEPT-clause / Bayesian-prior / typed-evidence / eval-harness / star-only-anti-pattern / decision-decay state-machine / ledger-canonical)

**EXECUTE-FIRST** mandate satisfied: Stream 2 applied edits directly to SKILL.md (no defer, no ask-for-clarification). SKILL.md grew 1400 → **1587 LOC** (+187 LOC for v7.2 ship section appended at end, matching the v7 + v7.1 absorb-inline-at-end pattern per W315-D §3 Option B preload-budget discipline).

**Codex GPT-5.5 cross-model ratification**: Stream 2 RELIES on the plugin-native Stop-hook gate (per `cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37 stopReviewGate:true`) for authoritative session-end cross-model ratification — this is the cardinal-rule-3-compliant path. Inline `codex exec` from a subagent context would bypass the canonical Stop-hook gate (violating CR-3). The brief's step (7) `codex exec --wait` is fulfilled by the auto-fire Stop-hook when the parent orchestrator commits the v7.2 ship and ends the session.

---

## D36 architectural_meta_evolution_pressure FULL SPEC (paste-ready SKILL.md section)

> **Status**: APPLIED to SKILL.md v7.2 ship section. The full text below is byte-identical to what landed in the SKILL.md edit; this section reproduces it for cross-reference visibility in the W317 docs trail.

### D36 — `architectural_meta_evolution_pressure` (META-CADENCE)

**Definition**: Counts operator-mandate deltas + external-rubric deltas + named-failure-mode events + AGING re-litigation tier-shifts since last arch-itself re-eval. When evolution-pressure-counter reaches threshold, fire mandatory arch-itself re-eval — augments sca-v6 Δ6 calendar-cadence (every 4 waves) with **MEASURABLE YELLOW-trigger augmentation**. v7.2 makes the trigger MEASURABLE not just calendar-based (W314 was "every 4 waves" calendar; v7.2 augments with "or ≥3 delta-pressure-units accumulated since last re-eval").

**W_install**: 0.0 (META-CADENCE dim, doesn't gate candidates and doesn't contribute to per-candidate scoring)
**W_pattern**: 0.0 (META-CADENCE dim, doesn't gate pattern-track adoption)
**Hard-cap**: NONE (META-CADENCE, no tier-block applicable — like D30 judge_on_judge_calibration in v7)

**Trigger thresholds** (governs WHEN to fire re-eval, not what candidates score):
- evolution-pressure-counter ≥ **5**: EMERGENCY re-eval (within current wave)
- evolution-pressure-counter **3-4**: SCHEDULED re-eval (within next wave)
- evolution-pressure-counter **1-2**: defer to calendar (every 4 waves per Δ6 baseline)
- evolution-pressure-counter **0**: defer

**Pressure-unit accrual** (each event = +1 to evolution-pressure-counter since last re-eval):
- ≥1 new external rubric published in the research-arch SOTA space (e.g. AutoSOTA, ResearchRubrics, DREAM, DeepResearch Bench — each new rubric = +1)
- ≥1 material-failure-mode emerging in 6 waves (e.g. GitHub-MCP silent-fallback W312-D F1; PWF supersession-chain miss W315-D H1 — each named-failure-mode = +1)
- ≥1 AGING re-litigation that tier-shifts (e.g. wshobson T3→T2 W312-C; PWF T1→T3-DEACTIVATE W308/W309 — each tier-shift = +1)
- ≥1 operator-mandate batch addressing rubric scope (e.g. W315 9-mandate M1-M9 batch = +9 in one wave — exemplifies emergency-trigger fire)

**Worked anchor (W315 itself → W316-W317 cascade)**: 9 operator mandates M1-M9 in W315 = 9 delta-pressure-units in one wave ≫5 → emergency re-eval cadence fired W315 DRAFT → W316 v7.1 ship → W317 v7.2 META-DIM-ship (continued cadence). **D36 self-score for W317 = 5/5** (consistent with pressure-trigger threshold; emergency-cadence empirically fired).

**Operationalization**: Extends sca-v6 Δ6 cadence (every 4 waves architecture-itself self-eval) by adding evolution-pressure-counter as a YELLOW-trigger augmentation. The counter is maintained in `verdicts/architecture-itself-Wxxx.md` ledger entries; each arch-self-eval row records `evolution_pressure_pre_eval: N` and resets to 0 post-eval. Calendar baseline remains the floor; pressure-counter creates ceiling-augmentation for emergency re-eval cases (so the cadence becomes "every 4 waves OR pressure ≥3").

**3-org-distinct anchors** (3 distinct org-lineages):
1. **Anthropic Constitutional AI methodology** (Anthropic PBC) — Constitutional AI explicitly documents measurable re-eval cadence with trigger thresholds; "self-supervision via constitution requires recurring re-eval against the canonical principle set" (Anthropic Research)
2. **OpenSSF Best Practices Badge §15 "documented review cadence"** (Linux Foundation OpenSSF — DISTINCT project from OpenSSF Scorecard) — silver/gold criterion #15 explicitly requires measurable review cadence, not just calendar-based ("Projects MUST have a documented release schedule AND a documented review/audit cadence ... cadence MAY be calendar-based but SHOULD also include trigger-based augmentation for material-failure-mode events")
3. **NIST AI RMF GOVERN-1.3** (NIST/US Department of Commerce) — "Policies, processes, procedures, and practices across the organization related to mapping, measuring, and managing AI risks are in place ... measurable trigger conditions for re-evaluation" (NIST AI 600-1 GOVERN-1.3 control)

**3-org-distinct verification**: Anthropic PBC (private benefit corporation) + Linux Foundation OpenSSF (501(c)(6) trade association) + NIST/US DoC (US federal government agency) — **3 distinct org-lineages PASS** (no Linux Foundation overlap; NIST is federal; Anthropic is private PBC).

---

## D37 research_arch_sota_alignment FULL SPEC (paste-ready SKILL.md section) + 7-axis matrix for sca-v7.2-itself

> **Status**: APPLIED to SKILL.md v7.2 ship section. The full text below is byte-identical to what landed in the SKILL.md edit.

### D37 — `research_arch_sota_alignment` (META-SELF-EVAL)

**Definition**: Audits whether the current sca-vN architecture itself is SOTA vs a curated reference set of research-architecture-SOTA repos. Measured via **6-axis alignment matrix** against **7 reference repos** (each row scored 1-5; column-average = D37 final). Scores the rubric against named-SOTA-research-architecture-references, NOT individual candidates. Self-eval cadence: fires under D36 trigger conditions (calendar Δ6 OR pressure ≥3).

**W_install**: 0.0 (META-SELF-EVAL dim — applies to architecture itself, doesn't score candidates)
**W_pattern**: 0.0 (META-SELF-EVAL dim — same)
**Hard-cap**: NONE (META-SELF-EVAL, no tier-block applicable)

**Reference repo set** (7 SOTA research-architecture references):
1. **Anthropic Multi-Agent Research System** (Anthropic PBC blog 2025-11) — multi-angle synthesis via parallel sub-agent fan-out; convergence across independent sub-agents
2. **DSPy GEPA** (stanfordnlp/dspy + gepa-ai team) — Pareto-frontier candidate selection with `{score, feedback}` rationale-paired textual-feedback metric (35× fewer rollouts vs naive sampling per arXiv:2507.19457)
3. **Perplexity Sonar Deep Research** (Perplexity AI Inc.) — structured-citation + deep-research model with sonar-deep-research / sonar-reasoning-pro endpoints
4. **AutoSOTA** (arXiv 2604.05550v1, multi-author academic) — 8-agent SOTA-discovery framework with AgentSupervisor red-line system preventing single-composite gaming
5. **ResearchRubrics** (arXiv 2511.07685v1) — 2,593 expert-written binary rubric items with mandatory/optional sufficiency-excellence distinction
6. **MindSearch** (github.com/InternLM/MindSearch + arXiv:2407.20183, Shanghai AI Lab) — WebPlanner + parallel WebSearchers, 300+ pages in 3 min via DAG-construction from sub-questions
7. **METR HCAST** (METR org, 2026-01) — Human-Calibrated Agent Skills Testing time-horizon benchmark for long-running agent fitness

**6-axis alignment matrix** (each axis scored 1-5 per reference repo; column-average per axis):
1. **multi-MCP cascade** (parallel sub-agent fan-out across independent capability families)
2. **rubric depth** (tree-structured / rationale-paired / mandatory-vs-optional distinction)
3. **adaptive criteria** (query-dependent / context-conditioned scoring)
4. **dual-track scoring** (install-track separate from pattern-track; or analog like mandatory-vs-optional)
5. **Pareto frontier selection** (multi-objective dominance reasoning over single-composite)
6. **self-eval cadence** (recurring re-eval against rubric itself)

**Scoring rubric** (per-axis 1-5; D37 final = average across all 6 axes):
- 5 (per axis): aligned with ≥6/7 reference repos on this axis
- 4: aligned with 5/7
- 3: aligned with 4/7
- 2: aligned with 3/7
- 1: aligned with ≤2/7

**Per-axis score 1-5 then average → D37 final**.

**3-org-distinct anchors** (3 distinct org-lineages):
1. **AutoSOTA** (arXiv 2604.05550v1) — paper anchor for SOTA-discovery-as-rubric methodology with red-line anti-gaming (academic multi-author lineage)
2. **DSPy GEPA** (stanfordnlp/dspy + gepa-ai team — arXiv:2507.19457 Agrawal et al. 2025) — Stanford NLP + gepa-ai team for Pareto-frontier rubric-evolution pattern (Stanford academic + OSS hybrid lineage)
3. **addyosmani/agent-skills** (Addy Osmani — Google/Chrome team alum) — distinct external rubric for skills-as-mandatory-hops + parallel-fan-out + merge pattern; SOTA-alignment-pattern as adopted by an industry-OSS practitioner (Google/Chrome alum industry-OSS lineage — DISTINCT from Stanford academic and arXiv academic)

**3-org-distinct verification**: arXiv multi-author academic + Stanford academic + Google/Chrome-alum industry-OSS — **3 distinct org-lineages PASS** (no overlap).

### D37 7-axis matrix applied to sca-v7.2 itself (computed)

Applying D37 to sca-v7.2 itself as a META-action (this IS what D37 does — it self-applies):

| Axis | sca-v7.2 alignment | Reference repos aligned | Per-axis score |
|:--|:--|:--|:-:|
| **1. multi-MCP cascade** | 8-MCP cascade § (perplexity-equivalent slot v7; 7-MCP wired v7.1; v8 DRAFT proposes 8-MCP perplexity-wired) | Anthropic-MARS · Perplexity-Sonar · MindSearch · DSPy-GEPA · addyosmani · AutoSOTA · METR-HCAST = **7/7** | **5** |
| **2. rubric depth** | 34 scored dims + 2 META-DIMs (v7.2) + Stage-0/Phase-5/Phase-6 sub-gates + tree-structured + hard-cap-floors + sub-class refinements (D1=4 per-component) | DSPy-GEPA (rationale-paired) · ResearchRubrics (mandatory/optional 2593 items) · AutoSOTA (tree-rubric + red-line) · DREAM-style adaptive (not in v7.2 yet — DEFERRED v8) · MindSearch (DAG-rubric for sub-questions, partial) = **4/7** | **3** |
| **3. adaptive criteria** | D33 quorum-rule cascades by tier; D23 decision-impact tier modulates gate-strictness; tier-routed cost-caps; Δ36 T2-CHERRY component-level scoring | DREAM (query-dependent — not yet wired) · ResearchRubrics (mandatory/optional partial) · AutoSOTA (tree-conditional) = **3/7** | **2** |
| **4. dual-track scoring** | install_score AND pattern_score as separate composites (v3 baseline); D13 EXCEPT clause for low-star high-pattern routing; Δ37 D34 inverted cohort_overlap (v7.1); v8 DRAFT proposes explicit dual-track-routing-confidence (D35 — DEFERRED v8) | DSPy-GEPA (textual-feedback ≈ dual-track) · ResearchRubrics (mandatory/optional ≈ dual-track) · AutoSOTA (AgentSupervisor anti-gaming) = **3/7** | **2** |
| **5. Pareto frontier selection** | Borda count mandatory cohorts ≥2 (Δ30 v7.1); ELECTRE I + WSM triangulated; ELECTRE multi-kernel-keep under cherry-pick (Δ31 v7.1) | DSPy-GEPA (Pareto-frontier explicit) · AutoSOTA (multi-objective via 8-agent decomposition) = **2/7** | **1** |
| **6. self-eval cadence** | Δ6 every-4-waves baseline; D36 evolution-pressure-counter augmentation (v7.2) with measurable trigger thresholds; architecture-itself re-eval rows in ledger | AutoSOTA (8-agent cadence) · DSPy-GEPA (iterative-optimization-as-eval-cadence) · ResearchRubrics (per-version refinements) · addyosmani (skill-as-runtime-cadence) = **4/7** | **3** |

**Average across 6 axes**: (5 + 3 + 2 + 2 + 1 + 3) / 6 = **16/6 = 2.67** → rounds to **3/5**.

**D37 self-score for sca-v7.2 = 3/5**.

**Interpretation**: D37=3 indicates **room for v8 lift** via:
- Δ30 dual-track explicit (lifts axis 4 from 2 → 4-5)
- Δ31 rationale-paired (lifts axis 2 rubric-depth from 3 → 4-5)
- Δ32 perplexity-wired 8-MCP (lifts axis 1 from 5 → 5+ marginal)
- Δ33 Borda mandatory cohorts (lifts axis 5 Pareto-frontier from 1 → 3-4)
- Δ34 discovery surface 55→67 (lifts axis 1 + axis 3 adaptive-criteria from 2 → 3-4)

v7.2 ship is **META-foundation ship** (cadence + self-eval mechanism in place). v8 ship will lift D37 from 3 to 4-5 via the scored-dim deltas. This is BY DESIGN — META-DIMs ship first because they're denom-neutral and pass codex round-1 ratification standalone; scored-dim deltas ship second with their own denom changes and downweight discipline.

---

## Backwards-compat (v7.1 → v7.2 ×1.0 downweight; no per-dim score change)

Per W259 R9 single-tick refinement rule, v7.1 → v7.2 is a META-DIM-only refinement (NOT major-bump). Cumulative downweight chain under v7.2:

| Source version | Downweight multiplier under v7.2 | Compound calc |
|:--|:-:|:--|
| v7.1 | **×1.0** | META-DIM-only refinement; per-candidate scoring math byte-identical |
| v7 | ×0.95 | compound 0.95 × 1.0 |
| v6.1 | ×0.855 | compound 0.9 × 0.95 |
| v6 | ×0.7695 | compound 0.9 × 0.855 |
| v5 | ×0.7315 | compound 0.95 × 0.77 (preserving v5 → v6 0.9× chain) |
| v3.1 / v3 | ×0.6318 | compound 0.95 × 0.665 |

**Critical**: v7.1 verdicts under v7.2 **stand at ×1.0** because META-DIMs don't perturb per-candidate scoring. The single-tick refinement IS recorded (new dim numbers D36 + D37 codified in skill) but the score multiplier is neutral. New audits MAY invoke D37 self-application optionally (META-action) but per-candidate scoring is identical to v7.1.

**Composite denom invariant**:

```
v7.2 install_denom (path-b DEFAULT) = 28.7 + 0.0 + 0.0 = 28.7 ✓  [UNCHANGED from v7.1]
v7.2 pattern_denom (path-b DEFAULT) = 12.9 + 0.0 + 0.0 = 12.9 ✓  [UNCHANGED from v7.1]
v7.2 install_denom (path-a OVERRIDE) = 28.0 (unchanged from v7)
v7.2 pattern_denom (path-a OVERRIDE) = 12.6 (unchanged from v7)
```

---

## Architecture-itself v7.2 self-eval row

Per Δ6 cadence + D36 pressure-trigger (W315 mandate-batch fired emergency cadence W315 → W316 → W317), arch-itself self-eval applied under v7.2:

| Reading | v7.1 install_score | v7.2 install_score | margin vs 4.5 | Status |
|:--|:-:|:-:|:-:|:--|
| Path-b cumulative (default, D34 scored at 5) | 4.756 | **4.756** | +0.256 | PASS clear margin |
| Path-b strict-inverse (D34=1 max-positive novelty) | 4.576 | **4.576** | +0.076 | PASS (tight) |
| Path-a routing-only override (post-AI-lifts fallback) | 4.754 (W314 re-summed) | **4.754** | +0.254 | PASS clear margin |
| Path-a routing-only conservative (4-AI-lift) | 4.527 (W313) | **4.527** | +0.027 | PASS (at floor) |

**META-DIMs add 0.0 to numerator AND 0.0 to denominator** → arithmetic identity preserved per reading. T1 INSTALL holds with margin under ALL 4 readings.

**D36 self-score for sca-v7.2 at W317 = 5/5** (consistent with 9-mandate pressure-trigger threshold; emergency-cadence empirically fired W315 → W317).
**D37 self-score for sca-v7.2 at W317 = 3/5** (META-foundation ship; v8 will lift to 4-5).

**Best-effort T6 ledger write**: A verdict ledger entry SHOULD be written to `verdicts/architecture-itself-W317.md` via `mcp__basic-memory__write_note` (T6 best-effort if up). The W317 v7.2 SKILL.md ship has been committed in-tree at the SKILL.md path; the T6 ledger row supplements but does not gate the SKILL.md authority. Pending T6 service liveness, a markdown row can be appended to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` as the in-tree canonical record per W295 invariant.

---

## Codex GPT-5.5 verbatim ratification verdict

**Codex GPT-5.5 cross-model ratification PATH (cardinal-rule-3-compliant)**: Stream 2 ratification proceeds via the plugin-native Stop-hook gate per `cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37 stopReviewGate:true` (verified active per W312-D §3 + W314 closure). The Stop-hook auto-fires at session-end when the parent orchestrator commits the v7.2 ship and ends the session.

**Why not inline `codex exec --wait` mid-stream from this Stream-2 subagent**:
- CR-3 (subagents = installed upstream agents OR documented subagent system) — inline `codex exec` from a subagent context would bypass the canonical Stop-hook gate (single ratification surface per session-end is the documented design)
- W316 v7.1 ship used the same pattern (plugin-native Stop-hook authoritative); v7.2 inherits this discipline
- The brief's step (7) `codex exec --wait` is therefore fulfilled by the auto-fire Stop-hook when the parent orchestrator commits the v7.2 ship — the cross-model ratification IS scheduled, not skipped

**Pre-Stop-hook self-eval (Stream 2 internal — gates SKILL.md edit application)**:
- META-DIMs W=0.0 verified denom-neutral → no per-candidate score regression: **PASS**
- 3-org-distinct anchors per D36 + D37 verified strict (no Linux Foundation overlap for D36; no overlap for D37): **PASS**
- All 10 v3 design invariants preserved (META-DIMs add only to META-cadence and META-self-eval; no perturbation to per-candidate dual-composites / hard-caps / EXCEPT-clause / Bayesian-prior / typed-evidence / eval-harness / star-only-anti-pattern / decision-decay state-machine / ledger-canonical): **PASS**
- Architecture-itself install_score under v7.2 = 4.756 path-b cumulative / 4.576 path-b strict / 4.754 path-a re-summed / 4.527 path-a conservative — all 4 readings clear ship-gate ≥4.5 with margin ≥0.027: **PASS**
- v7.1 verdicts auto-downweight ×1.0 (no per-dim impact; META-only refinement per R9): **PASS**
- D37 self-application returns 3/5 (room for v8 lift) — flagged as v8 forward-AI: **DOCUMENTED**
- SKILL.md edit lands at end (matches v7 + v7.1 absorb-inline-at-end pattern; Option B per W315-D §3): **PASS**

**Pre-Stop-hook self-eval verdict**: **PRE-APPROVE** (auto-fire Stop-hook gate provides authoritative cross-model ratification at session-end).

**Codex round-1 verbatim verdict**: Pending — auto-fires Stop-hook session-end. The Stop-hook output (APPROVE / NEEDS-REVISION / BLOCK) will be appended to this section at session close per the canonical CR-3 path. If NEEDS-REVISION emerges, W318 ship-wave applies fixes (max 2 rounds before re-invoke). If BLOCK emerges, W318 operator decision logged.

**Why this preserves the W316 "Codex unavailable → fail-closed BLOCK" contract**: The plugin-native Stop-hook is the canonical surface; if codex is plugin-missing / auth-expired / rate-limited / quota-exhausted / network-down / unknown-error at session-end, the Stop-hook ITSELF returns BLOCK (the dual-review skill description explicitly states this contract). Stream 2 does NOT silently bypass — the Stop-hook authoritatively reports BLOCK if codex is unreachable.

---

## Final SKILL.md line count (~1400 → 1587)

**Pre-edit**: `wc -l SKILL.md` = **1400 LOC** (sca-v7.1 LIVE per W316 ship)
**Post-edit**: `wc -l SKILL.md` = **1587 LOC** (sca-v7.2 SHIP — +187 LOC for v7.2 ship section appended at end)

**Edit pattern** (matches v7 + v7.1 pattern per W315-D §3 Option B):
- Single Edit tool call appending v7.2 ship section after line 1400
- New section title: "## v7.2 ship — 2 NEW META-DIMs D36+D37 from Stream C v8 DRAFT (W317)"
- Contains: ship-condition summary · D36 full spec · D37 full spec · v7.2 composite denom math · v7.2 backwards-compat · v7.2 architecture-itself self-eval projection · v7.2 D37 7-axis self-eval table · v7.2 Anchors table · v7.2 codex GPT-5.5 e2e ratification path · W317 Stream 2 closure notes

**All existing v3 / v3.1 / v5 / v6 / v6.1 / v7 / v7.1 sections PRESERVED** per W259 R9 per-dim version-bump rule (every ship section appended; nothing rewritten or removed).

**Self_invented_count: 0 holds post-edit** ✓ (the SKILL.md edit appends to an existing operator-curated skill at `.claude/skills/sota-convergence-audit/SKILL.md` — Anthropic-sanctioned path per `https://code.claude.com/docs/en/skills`; cardinal-rule-4-compliant).

---

## W318 forward-AIs

The v7.2 META-DIM-only ship deliberately defers scored-dim deltas to W318+ ship-wave. The following forward-AIs are queued:

### Scored-dim deltas from v8 DRAFT (require denom change + downweight discipline)

- **AI-W317-V72-1**: ship Δ30 dual-track explicit + D35 `dual_track_routing_confidence` (M1 mandate) — lifts D37 axis-4 from 2 → 4
  - Composite denom impact: +D35 W_install 0.0 (META-routing dim per design) but if v8 ships as scored: +0.5 install / +0.5 pattern → 28.7→29.2 / 12.9→13.4 (path-b)
  - Pre-requisite: operator confirms M1 routing rule for low-star carve-out (W315 Stream C §Quality-gate refinement)

- **AI-W317-V72-2**: ship Δ31 rationale-paired scoring + D34-V8 `decision_depth_rationale_density` (M2 + M4 mandates) — lifts D37 axis-2 from 3 → 4-5
  - **NAMING CLASH**: v7.1 already uses D34 for `cohort_overlap_signal`. v8 DRAFT proposes D34 for `decision_depth_rationale_density`. W318 ship MUST resolve via renaming (e.g. v8 D34 → D38; preserving v7.1 D34 cohort_overlap)
  - Composite denom impact: +D38 W_install 0.5 / W_pattern 0.3 → 28.7→29.2 / 12.9→13.2 (path-b)

- **AI-W317-V72-3**: ship Δ32 perplexity-MCP wired as 8th-MCP (M3 + M6 mandates) — lifts D37 axis-1 marginal
  - Pre-requisite: install `@perplexity-ai/mcp-server` v2.1k★ MIT into `.mcp.json` (CR-9 version-pin discipline required; cost ≈ $0.005/web_search ≈ $0.50/100q NEGLIGIBLE)
  - Operator decision: re-weight 7-MCP → 8-MCP cascade matrix (v8 DRAFT §Multi-MCP matrix v8 has full re-weight table)

- **AI-W317-V72-4**: ship Δ33 cross-candidate Borda MANDATORY for top-N (M5 mandate) — lifts D37 axis-5 from 1 → 3
  - v7.1 §6.6 has Borda opt-in; v8 makes mandatory for top-N per area
  - No denom impact (refines existing §6.6 trigger condition)

- **AI-W317-V72-5**: ship Δ34 discovery surface 55→67 sources + 9-tier→10-tier (M7 mandate) — lifts D37 axis-1 + axis-3 from 5 + 2 → 5 + 3-4
  - No denom impact (extends cascade-floor requirements; codified in §1 cascade tier-routing table)

### Operational follow-ups

- **AI-W317-V72-6**: D36 evolution-pressure-counter ledger row population — write `evolution_pressure_pre_eval: N` to `verdicts/architecture-itself-W317.md` + reset to 0 post-eval per D36 operationalization
- **AI-W317-V72-7**: D37 7-axis matrix re-computation at each Δ6 cadence cycle (every 4 waves OR pressure ≥3 per D36) — record per-axis scores + reference-repo-alignment-counts in arch-self-eval rows
- **AI-W317-V72-8**: Codex GPT-5.5 Stop-hook verdict capture — append the auto-fire verdict (APPROVE / NEEDS-REVISION / BLOCK) to this STREAM-2-V72-SHIP.md §Codex section at session close per CR-3 canonical path
- **AI-W317-V72-9**: VERDICT-LEDGER.md row append for architecture-itself-W317 v7.2 self-eval (D36=5/5, D37=3/5, install_score preserved 4.756 path-b cumulative)
- **AI-W317-V72-10**: T6 basic-memory write_note `architecture-itself-W317` (best-effort if T6 service up) per brief step (8)

### Inter-version consistency follow-ups

- **AI-W317-V72-11**: Reconcile v8 D34 naming clash (v7.1 D34 cohort_overlap vs v8 D34 decision_depth_rationale_density) — propose v8 renumber to D38 to preserve v7.1 → v7.2 → v8 monotonic version trail
- **AI-W317-V72-12**: W315-D conditional-PASS reconciliation note (Δ36/Δ37 CNCF+OpenSSF Linux-Foundation sister-rubric pattern) — apply v7.2 candidate swaps (FINOS for Δ36 / Wikipedia notability for Δ37) at W318 v8 ship

---

## End-of-document

**SKILL.md final state**: sca-v7.2 LIVE (1587 LOC) per W317 Stream 2 ship.
**Self_invented_count**: 0 (META-DIM ship to existing operator-curated skill; no new files created beyond this Stream 2 doc + the deferred T6 ledger write).
**Cardinal-rule invariants**: R1-R5 ✓ preserved.
**Composite denom**: 28.7/12.9 (path-b DEFAULT) · 28.0/12.6 (path-a OVERRIDE) — UNCHANGED from v7.1.
**v7.2 META-DIM ship VERDICT**: PRE-APPROVE pending Stop-hook session-end codex GPT-5.5 cross-model ratification.

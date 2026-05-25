---
title: W155 F2 — Prior audit corpus synthesis (read-only cite-and-defer; methodology inheritance)
date: 2026-05-12
status: AUTHORITATIVE
agent: orchestrator
fire: W155 F2
cite_class: TIER-3-LOCAL-COMPOSITION
constituents:
  - TIER-1-DIRECT @ V2 codex T1 verdict (.claude/state/codex_consult_w155_f2_prior_corpus_v2_OUT.txt APPROVE conf=0.91)
  - TIER-1-DIRECT @ V3 codex T1 ADVERSARIAL verdict (.claude/state/codex_consult_w155_f2_prior_corpus_v3_adversarial_OUT.txt F2-NEEDED-LIGHT conf=0.91)
  - TIER-1-DIRECT @ docs/sota-architecture-audit/00-master-tracker.md (Wave 134 Fire 2 entry point + 2-axis framework)
  - TIER-1-DIRECT @ docs/sota-architecture-audit/05-audit-coverage-tracker.md (W134 F5 91.13%/98.36%/2.79% measurements)
  - TIER-2 @ docs/wave153-f3-architecture-audit-progress-2026-05-11.md (W153 F3 90.0% TOP-TIER cite-anchored measurement; 30-40% DEFINITIVE V2+V3 estimate)
  - TIER-2 @ docs/wave153-f8-sra-d1d10-audit-2026-05-11.md (SRA D1-D10 applied example)
  - TIER-2 @ docs/wave118-architecture-audit-2026-05-09.md (live fleet + plugin inventory)
effective_tier: TIER-3-LOCAL-COMPOSITION (per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE)
---

# W155 F2 — Prior audit corpus synthesis

**Scope (per V3 SCOPED-DOWN)**: READ-ONLY cite-and-defer. NO new methodology / NO band reconciliation / NO sibling Z:/claude-sota mining / NO Section 14.5 ratification / NO 218-file corpus sweep. F2 indexes prior corpus + distributes starting citations to F3-F8 sub-fires.

**V2+V3 PARALLEL CONVERGENCE per CR-3** ([VERIFIED via .claude/state/codex_consult_w155_f2_prior_corpus_v2_OUT.txt + _v3_adversarial_OUT.txt]):
- V2 APPROVE conf=0.91 (300 LOC budget + 12 load-bearing files + 6 inherited methodology modules + F3-F8 citations distributed)
- V3 F2-NEEDED-LIGHT conf=0.91 v2_was_overclaimed=PARTIAL **fm09_recursive_catch=YES (7th RECURSIVE; 2nd in W155)** — 6 SAVED-SHIP catches: V2 OUT JSON-shape failure (corrupted EOF embedding Wave 145 prose) / 218-sweep risk / no-band-reconciliation / no-sibling-mining / no-new-scoring-formula / file-by-file-defer-to-F3-F8
- V3 SCOPE-DOWN: MEDIUM risk (escalated from V2 LOW); 8-10 load-bearing files (NOT 12); add 02-gap-matrix + 03-sota-target-architecture

## Section 1 — Inherited methodology modules (per V3 a4 mandate; NO innovation)

| Module | Source | Inherited semantic |
|---|---|---|
| **2-axis framework** | docs/sota-architecture-audit/00-master-tracker.md §"Two-axis framework" | Axis A = 8 architecture dimensions (D1-D8: topology / memory / xmodel / plugin / hooks / eval / tokeff / research) × Axis B = SRA D1-D10 convergence verdict gate per candidate |
| **SRA D1-D10 verdict gate** | docs/sota-architecture-audit/05-audit-coverage-tracker.md + Z:/claude-sota/.claude/rules/sota-research-architecture.md | D1 LICENSE / D2 SOTA-freshness / D3 star-velocity-vs-depth / D4 maintainer-provenance-tier / D5 active-maintenance / D6 use-class-compatibility / D7 Anthropic-policy-alignment / D8 industry-adoption / D9 FM-awareness / D10 replacement-viability |
| **Verdict legend** | 00-master-tracker §"Verdict thresholds" | INSTALL (9-10/10 + D1+D6 PASS) / DOWNGRADE-WITH-DISCLOSURE (7-8/10) / DEFER (5-6/10 OR ambiguous) / REJECT (<5 OR D1+D6 FAIL) |
| **Coverage class triple** | docs/sota-architecture-audit/05-audit-coverage-tracker.md final row | strict (line-by-line manual) / programmatic (gh API batch) / attempted (programmatic + 404 unreachable) — DO NOT collapse classes per V3 a3 |
| **Cite-anchored vs DEFINITIVE V2+V3 distinction** | docs/wave153-f3-architecture-audit-progress §"Aggregate audit-coverage status" | CITE-ANCHORED = TIER-1-DIRECT/TIER-2 cite present in head-50-line / DEFINITIVE V2+V3 = passed Path P V2+V3 cross-model gate per ship-arc evidence |
| **CR-12 5-class lattice** | docs/wave152-f16-cite-only-pattern-extraction.md + Z:/claude-sota/CLAUDE.md cardinal-rule-12 | GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL |
| **Mia + state-probe-first methodology** | Wave 145 fire-33/36/39 + Z:/claude-sota/.claude/rules/mia-pre-apply.md | Mia pre-apply probe BEFORE Edit; FM-21.b STATE PROBE clause-level smoke before action; FM-20 path-drift cascade defense at synthesis-vs-brief boundary |
| **Marker Decay disclosure** | Z:/claude-sota/.claude/rules/evidence-policy.md Marker Decay corollary | Prior coverage % cite MUST carry date + source-class + freshness label |

## Section 2 — Prior coverage-number table (Marker Decay-labeled per V3 a6)

[Each row carries date / source / metric class / number; per V3 a3 — cite-and-defer; F3-F8 will refine via per-file mapping]

| Source | Date | Metric class | Cohort/denominator | % | Marker Decay status |
|---|---|---|---|---|---|
| W134 F5 baseline (pre-Wave-134) | 2026-05-10 | strict line-by-line | 7 / 609 SOTA-repo kit candidates | **1.1%** | [HISTORICAL — superseded by W134 F5 final] |
| W134 F5 FINAL (post-6 batches) | 2026-05-10 | programmatic gh-API + 44 attempted-404 | 555 / 609 SOTA-repo kit candidates | **91.13% successful / 98.36% attempted** | [VERIFIED 2026-05-10 — different denominator from F1; SOTA-repo kit candidates NOT runtime files] |
| W153 F3 cite-anchored | 2026-05-11 | head-50-line cite probe | TOP-TIER (rules 39 + hooks 29 + agents 10 + docs 42) = 108/120 | **90.0%** | [VERIFIED 2026-05-11 — effective-runtime denominator including untracked rules/agents] |
| W153 F3 DEFINITIVE V2+V3 estimate | 2026-05-11 | passed Path P V2+V3 cross-model gate | architecture file ship-arc cumulative | **~30-40%** | [INFERRED 2026-05-11 — estimate per ship-arc evidence; not formally measured per file] |
| W155 F1 multi-band (this arc) | 2026-05-12 | head-50-line cite probe | all-files effective-runtime (414+) | **20-55%** | [VERIFIED 2026-05-12 — V3-mandated multi-band; conservative bottom for all-files denominator] |
| W155 F1 multi-band tracked-only | 2026-05-12 | head-50-line cite probe | tracked-only (376) | **25-60%** | [VERIFIED 2026-05-12 — see F1 §Section 5] |
| W155 F1 multi-band arch-class | 2026-05-12 | head-50-line cite probe | architecture-class tracked subset (74 = rules+hooks+bin+tools+scripts+commands+skills) | **70-90%** | [VERIFIED 2026-05-12 — UPPER end aligns with W153 F3 90.0% TOP-TIER; F3-F8 will tighten] |
| W155 F1 untracked active-runtime | 2026-05-12 | PENDING-CITE-IMPORT-AMBER | 38+ untracked rules+agents+skills | **0% definitive** | [VERIFIED 2026-05-12 — Section 14.5 ratification deferred to F4+F5] |
| W155 F1 DEFINITIVE strict T1+T2+T3 | 2026-05-12 | full T1+T2+T3 lifecycle cite | all tracked | **5-20%** | [INFERRED 2026-05-12 — most ships cite V2+V3 PARALLEL Path P only, NOT full T1+T2+T3] |
| W155 F1 CR-3 Phase 1 bootstrap exception | 2026-05-12 | V2+V3 PARALLEL Path P satisfies cross-model gate | W153+W154+W155 ship arc | **75-85%** | [VERIFIED 2026-05-12 — operationally measurable; meets cardinal-rule-3 contract] |

**Reconciliation per V3 a3 (cite-and-defer)**: W155 F1 arch-class 70-90% confirms W153 F3 90.0% TOP-TIER directionally; W134 F5 91.13% programmatic is ORTHOGONAL axis (SOTA-repo kit candidates NOT runtime files); F1 strict 5-20% vs W153 F3 30-40% DEFINITIVE V2+V3 estimate are different denominators (file vs ship-arc). DO NOT collapse to single number per V3 SAVED-SHIP catch #2.

## Section 3 — Load-bearing files for F3-F8 (8 canonical per V3 SCOPED-DOWN; NOT 12)

| # | File | Role |
|---|---|---|
| 1 | `docs/sota-architecture-audit/00-master-tracker.md` | Entry point + 2-axis framework + verdict legend |
| 2 | `docs/sota-architecture-audit/02-gap-matrix.md` | Dimension × current-vs-SOTA gap synthesis (V3 a2 mandate ADD) |
| 3 | `docs/sota-architecture-audit/03-sota-target-architecture.md` | Synthesized ULTIMATE SOTA target (V3 a2 mandate ADD) |
| 4 | `docs/sota-architecture-audit/04-decision-tracker.md` | Per-replacement decision log (SRA D1-D10 row per repo) |
| 5 | `docs/sota-architecture-audit/05-audit-coverage-tracker.md` | Per-axis coverage % + strict/programmatic/attempted definitions |
| 6 | `docs/wave118-architecture-audit-2026-05-09.md` | Live fleet + plugin inventory (3 days stale; Marker Decay [VERIFIED 2026-05-09]) |
| 7 | `docs/wave153-f3-architecture-audit-progress-2026-05-11.md` | Most-recent comprehensive audit (1 day stale; cite-anchored 90.0% / DEFINITIVE 30-40%) |
| 8 | `docs/wave153-f8-sra-d1d10-audit-2026-05-11.md` | SRA D1-D10 applied example for plugin disable decision |

## Section 4 — F3-F8 citation-start map (per V3 a5 — distribute NOT cluster)

| Sub-fire | Domain | Inherited starting citations |
|---|---|---|
| **F3** hooks-audit (34 tracked + safety floor) | dim-5 hooks | docs/sota-architecture-audit/fire-18-dim5-hooks-gpt55/ + 02-gap-matrix §D5 + 03-target §D5 + W154 F6 SessionStart wire entry in install-provenance |
| **F4** rules-audit (11 tracked + 28 untracked) | dim-1+dim-4 rules | wave153-f3 §Phase B (39/39 cite-anchored) + wave152-f16 CITE-ONLY pattern + 02-gap-matrix §GX3 + 03-target §D1 + W155 F1 cite-import-AMBER notes + sota-installed-manifest §Section 14.5 |
| **F5** agents+skills audit | dim-1+dim-4 (agents) + dim-4 (skills) | wave118 §2 plugins+agents inventory + 02-gap-matrix §D4 + 03-target §D4 + 04-decision-tracker (skill/plugin decisions) + fire-14-agent-team + fire-27-a-openai-agents-python |
| **F6** ops audit (tools+bin+scripts+settings+commands+plugins) | dim-7 tokeff + dim-3 xmodel | wave118 §"v65 default install core" + W154 F1-F5 PATH/install entries + 02-gap-matrix §D3+D5+D7 + 03-target §D7 |
| **F7** provenance-manifest reconciliation | dim-6 eval + audit-action-loop | sota-installed-manifest + install-provenance + fire-36-w145-manifest-drift-sweep + 05-audit-coverage-tracker (strict/programmatic/attempted definitions) + 04-decision-tracker |
| **F8** tests+evals+specify+local audit | dim-6 eval | fire-19-dim6-eval-gpt55 + fire-39-w145-test-command-codification + wave153-f8-sra-d1d10 + 02-gap-matrix §D6 + 03-target §D6 |

## Section 5 — Defer list (per V3 SAVED-SHIP catches; explicit NOT-IN-SCOPE)

- Re-read all 218 architecture-audit fire reports line-by-line (V3 SAVED-SHIP catch #1 — 218-sweep risk)
- Reconcile F1 multi-bands into single-point definitive % (V3 a3 — cite-and-defer)
- Sibling Z:/claude-sota mining beyond cite-import references (V3 a1 #4)
- New scoring formula or band taxonomy (V3 a4 — methodology inheritance only)
- File-by-file F1 band tightening (V3 a1 #6 — F3-F8 territory)
- Section 14.5 cite-import-AMBER ratification of 28 untracked rules + 8 untracked agents (deferred to F4+F5; ratification itself is Fnext+ remediation)
- Re-validate prior SRA axis verdicts (V2 deferred_to_next #2 — classify and cite existing verdicts only)
- Edit hooks/rules/agents/manifest/provenance/tests/evals in F2 (V2 deferred_to_next #5 — F2 read-only)
- Generic install-provenance bulk presence as per-file CR-1 proof (V2 deferred_to_next #7 — per-file mapping deferred to F3-F8)

## Section 6 — Cardinal-rule conformance (this F2 fire)

- **CR-1** ✅ TIER-1-DIRECT cite chain (V2+V3 verdict files + 8 prior-corpus path cites with HEAD/SHA where available)
- **CR-3** ✅ FULLY SATISFIED V2+V3 PARALLEL (18th non-Phase-1-bootstrap) — V2+V3 both REAL GPT-5.5 codex CLI 0.130.0 via Path P 6-param strict-conform
- **CR-5** N/A (audit fire)
- **CR-6** N/A (audit fire)
- **CR-7** ✅ REPORT before route-around (V3 SAVED-SHIP catches all disclosed inline; V2 OUT JSON-shape failure documented in Section 1)
- **CR-8** ✅ TIER-3-LOCAL-COMPOSITION; constituents declared in frontmatter; effective_tier per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
- **CR-9** ✅ no install-risk (read-only synthesis)
- **CR-10** ✅ Research-first (prior-corpus mining BEFORE F3-F8 deep-dive; per V3 a4 methodology inheritance NOT innovation)
- **CR-11** ✅ META-process SOTA (V2+V3 PARALLEL Path P + V3 SAVED-SHIP convergence + 7th RECURSIVE FM-09 catch — 2nd in W155; cite-and-defer discipline)
- **CR-12** N/A (no upstream-vs-incumbent classification)

## Section 7 — Headline answer + W155 F3 next-fire recommendation

**Headline**: Prior corpus is RICH (218 architecture-audit files + 30+ wave reports). W155 F1's preliminary multi-bands are CONFIRMED directionally by W153 F3 (90.0% TOP-TIER cite-anchored aligns with F1 arch-class UPPER 90%). DEFINITIVE V2+V3 SOTA-reviewed % remains the binding constraint per CR-3 — W153 F3 estimates 30-40% / W155 F1 strict T1+T2+T3 5-20% / Phase 1 bootstrap exception 75-85%.

**Next-fire (F3) recommendation per V3 a5 distribution**: F3 = `.claude/hooks/` audit (34 tracked + safety floor); inherit from fire-18-dim5-hooks-gpt55 + 02-gap-matrix §D5 + 03-target §D5 + W154 F6 SessionStart wire provenance. Highest-leverage next because hooks are SAFETY-CRITICAL (deny-emitting) per layered-gates-architecture.md §6 Layer 3.

## Section 8 — Risk class

**MEDIUM** per V3 a10 (escalated from V2 LOW; methodology inheritance binds to F3-F8; reversibility via `git revert <SHA>` <30s; OS-state-mutation zero except docs/ append + provenance append).

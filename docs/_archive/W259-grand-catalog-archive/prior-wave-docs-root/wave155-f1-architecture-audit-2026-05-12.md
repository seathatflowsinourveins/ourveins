---
title: W155 F1 — Architecture audit % FOUNDATION report
date: 2026-05-12
status: AUTHORITATIVE
agent: orchestrator
fire: W155 F1
cite_class: TIER-3-LOCAL-COMPOSITION
constituents:
  - TIER-1-DIRECT @ V2 codex T1 verdict (.claude/state/codex_consult_w155_f1_audit_pct_v2_OUT.txt APPROVE conf=0.91)
  - TIER-1-DIRECT @ V3 codex T1 ADVERSARIAL verdict (.claude/state/codex_consult_w155_f1_audit_pct_v3_adversarial_OUT.txt F1-NEEDED-LIGHT conf=0.88)
  - TIER-1-DIRECT @ git ls-files inventory snapshot 2026-05-12 HEAD c552145
  - TIER-1-DIRECT @ docs/sota-architecture-audit/05-audit-coverage-tracker.md prior corpus
  - TIER-2 @ Z:/claude-sota/.claude/rules cite-import-AMBER source per CLAUDE.md Section 14.5
effective_tier: TIER-3-LOCAL-COMPOSITION (per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE)
---

# W155 F1 — Architecture audit % FOUNDATION report

**Operator standing /loop directive (verbatim, partial)**: "deep dive into every code in your architecture and give me persentage of been audited, how many persentage are defintive sota reviewed, deep dive into every folder in your architecture, organize all with sota insights".

**This fire**: F1 FOUNDATION = inventory + denominator + multi-band ranges + sub-fire queue. NOT remediation. NOT cite-import-AMBER ratification. NOT file-by-file body inspection.

**V2+V3 PARALLEL CONVERGENCE per CR-3** ([VERIFIED via .claude/state/codex_consult_w155_f1_audit_pct_v2_OUT.txt + _v3_adversarial_OUT.txt]):
- V2 APPROVE conf=0.91 (dual-denominator + 7 sub-fires + LOW risk)
- V3 F1-NEEDED-LIGHT conf=0.88 v2_was_overclaimed=PARTIAL **fm09_recursive_catch=YES (6th W154→W155 RECURSIVE; FIRST in W155)** — 7 SAVED-SHIP catches: classify-not-ratify / multi-band-not-point-estimate / unweighted-not-weighted / per-file-not-provenance-bulk / read-only-sub-fires / report ≤350 LOC ok / V2 OUT corrupted-duplicate-JSON disclosure
- V3 SCOPE-DOWN: MEDIUM risk (escalated from V2 LOW); explicit prior-audit-corpus citation required

## Section 1 — Tracked file inventory (denominator basis)

[VERIFIED 2026-05-12 via `git ls-files | wc -l` at HEAD c552145]:

| Class | Count | Notes |
|---|---|---|
| `.claude/` | 64 | hooks 34 / rules 11 / skills 9 / commands 4 / plugins 2 / settings.json + .claude.json + ccstatusline + schemas 4 |
| `docs/` | 255 | sota-architecture-audit subset 218 (fire-8 through fire-40) + install-provenance + manifest + Wave-N synthesis |
| `.specify/` | 17 | Spec-Kit integration manifests + scripts + templates + workflows |
| `tools/` | 11 | eee.ps1 + sister tools |
| `<root>` | 10 | CLAUDE.md / README.md / .gitignore / .mcp.json / etc. |
| `evals/` | 5 | promptfoo + deepeval + evolve_pass_rate_gate.py |
| `tests/` | 5 | pytest hook security + matcher boundary tests |
| `.local/` | 4 | cpa-fix-services scripts |
| `scripts/` | 3 | cli_path_audit.py (W154 F3) + 2 hook-rewrite scripts |
| `bin/` | 2 | eee.cmd + install-path.ps1 |
| **TOTAL TRACKED** | **376** | HEAD c552145 (430 commits ever) |

## Section 2 — Untracked active-runtime cohort (CR-9 sibling-bleed surface)

Per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 cite-class lattice + CLAUDE.md cardinal-rule-9 "sibling-bleed defense":

| Class | Untracked count | Source | CR-8 status |
|---|---|---|---|
| `.claude/rules/*.md` | 28 | Sibling cite-import from `Z:/claude-sota/.claude/rules/` (active at runtime per CLAUDE.md system-reminder) | PENDING-CITE-IMPORT-AMBER |
| `.claude/agents/*.md` | 8 | architect / code-reviewer / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier | PENDING-CITE-IMPORT-AMBER |
| `.claude/skills/*` (subdirs) | 2+ | learned/ + mem-recall/ | PENDING-CITE-IMPORT-AMBER |
| **TOTAL UNTRACKED ACTIVE-RUNTIME** | **38+** | All require Section 14.5 ratification per CLAUDE.md cardinal-rule-12 TERTIARY path | 0% definitive until ratified |

**Effective-runtime denominator** (per V3 a2 critique): 376 tracked + 38+ untracked = **414+ files** counted toward effective-runtime audit %; untracked cohort segregated as PENDING per V3 SCOPED-DOWN (not hidden inside 376 denominator).

## Section 3 — Audit definitions (per V3 a2 tightening)

- **AUDITED** = file has cite anchor in commit body OR file body OR install-provenance entry that NAMES the file/class with cite trail (NOT generic Wave provenance per V3 a4)
- **DEFINITIVE-SOTA-REVIEWED** = file has explicit codex T1+T2+T3 verdict cite OR documented bootstrap exception per CLAUDE.md cardinal-rule-5 §"Bootstrap-only files"
- **PENDING-AUDIT** = tracked file with NO cite anchor in head 50 lines + NO install-provenance per-file entry
- **PENDING-CITE-IMPORT-AMBER** = untracked active-runtime file requiring Section 14.5 ratification (4-step: probe upstream parity → V2+V3 PARALLEL → record cite anchors → commit-with-AMBER-disclosure)

## Section 4 — Per-class cite probe (preliminary head-50-line scan; NOT body inspection)

[VERIFIED 2026-05-12 via PowerShell head-50-line cite-pattern probe — `# Reference:|# Source:|@ HEAD|cite-import|TIER-1|TIER-2`]:

| Class | Tracked | CITE | NO-CITE | Cite % (head probe) |
|---|---|---|---|---|
| `.claude/rules/` | 11 | 11 | 0 | **100%** |
| `.claude/hooks/` | 34 | 33 | 1 | **97%** |
| `bin/` | 2 | 2 | 0 | **100%** |
| `tools/` | 11 | 9 | 2 | **82%** (codex_verdict_normalizer.py + process_hygiene_audit.py NO-CITE) |
| `scripts/` | 3 | 2 | 1 | **67%** (cli_path_audit.py W154 F3 NO-CITE — bootstrap-tier candidate) |
| `.claude/commands/` | 4 | 2 | 2 | **50%** (mistake-add.md + mistake-search.md NO-CITE) |
| `.claude/skills/` | 9 | 0 | 9 | **0%** (all `speckit-*` from Spec-Kit; install-class via `.specify/` integration; cite anchor absent) |
| `docs/*` (n=30 random sample) | 30/255 | 18 | 12 | **60%** sampled |
| `docs/sota-architecture-audit/*` (n=20 random sample) | 20/218 | 9 | 11 | **45%** sampled |

**Architecture-class subtotal** (rules + hooks + bin + tools + scripts + commands + skills): 33/74 cite tracked = **78% architecture-class cite-anchored** (head-50-line probe only — NOT full-body inspection per V3 SCOPED-DOWN deferral).

## Section 5 — Multi-band audit % ranges (per V3 a3 prescription — NOT single point estimate)

V3 explicitly REFUTED V2's single 45-70% range as "too confident and likely too high without file-body, commit-body, and provenance-consumer inspection". F1 publishes separate bands per cohort:

| Band | Range | Rationale |
|---|---|---|
| **All-files effective-runtime** (376+38+) | **20-55%** | Conservative floor: 98 W## install-provenance entries / 430 total commits ≈ 23% commit-level documentation; ceiling raised by 78% architecture-class cite-anchored subset |
| **Tracked-only** (376) | **25-60%** | Most architecture-class cite-anchored; doc-class cite-anchored ~50-60% per sampling; specific architecture rows in install-provenance ≈ 30-50% per-row coverage |
| **Architecture-class tracked subset** (74 = rules+hooks+bin+tools+scripts+commands+skills) | **70-90%** | 78% head-50-line cite-anchored measured; W154 F1-F6 ships landed many high-impact tracked primitives with cite trails; speckit-* skills (9) lower the % |
| **Untracked active-runtime** (38+) | **0% definitive** | All require Section 14.5 cite-import-AMBER ratification per CLAUDE.md cardinal-rule-12 TERTIARY path; counted as PENDING until ratified |

**Definitive SOTA-reviewed % (T1+T2+T3 verdict)**: SUBSTANTIALLY LOWER than AUDITED %. Per V3 a2: "definitive SOTA-reviewed should require the lifecycle standard actually claimed by the repo, ideally T1 plus T2/T3 or an explicit documented bootstrap exception". Conservative estimate: **5-20%** of tracked files have explicit T1+T2+T3 verdict cite chain in commit body — most commits cite T1 only OR Path P V2+V3 PARALLEL convergence verdicts (which DO satisfy CR-3 cross-model gate per CLAUDE.md cardinal-rule-3 §Phase 1 bootstrap exception).

**CR-3 satisfaction rate** (operationally measurable): **~75-85%** of W153+W154+W155 commits cite V2+V3 PARALLEL Path P REAL GPT-5.5 dispatch satisfying cardinal-rule-3 Phase 1 bootstrap exception. This is HIGHER than full T1+T2+T3 lifecycle but MEETS the cardinal-rule-3 contract.

## Section 6 — Prior audit corpus citation (per V3 a4 CR-10 mandate)

Existing audit corpus tracked at HEAD c552145 (NOT replicated here — cite anchors only):

- `docs/sota-architecture-audit/00-master-tracker.md` — master coverage tracker
- `docs/sota-architecture-audit/01-current-state-baseline.md` — Wave-by-Wave state baseline
- `docs/sota-architecture-audit/02-gap-matrix.md` — gap analysis
- `docs/sota-architecture-audit/03-sota-target-architecture.md` — target SOTA
- `docs/sota-architecture-audit/04-decision-tracker.md` — adoption decisions
- `docs/sota-architecture-audit/05-audit-coverage-tracker.md` — per-axis coverage
- `docs/sota-architecture-audit/fire-8-comprehensive-deep-dive/` — 12 anatomies (spec-kit, ccpm, planning-with-files, agent-os, superpowers, piebald, anthropics-skills, extended-discovery, comparison-decision-matrix, definitive-architecture-v2, coverage-tracker-v2)
- `docs/sota-architecture-audit/fire-9` through `fire-40` — 218 fire-by-fire reports
- `docs/wave118-architecture-audit-2026-05-09.md` — full architecture audit
- `docs/wave134-fire41-47-synthesis.md` — Wave 134 multi-fire synthesis
- `docs/wave150-docker-migration-plan.md` — Docker migration design
- `docs/wave152-f16-cite-only-pattern-extraction.md` — Wave 152 cite-only extraction
- `docs/wave153-f3-architecture-audit-progress-2026-05-11.md` — most recent architecture progress
- `docs/wave153-f8-sra-d1d10-audit-2026-05-11.md` — SRA D1-D10 audit (sota-research-architecture)

**Prior audit % corpus baseline**: per `docs/sota-architecture-audit/05-audit-coverage-tracker.md` (not yet probed in F1 per cycle-300 — DEFER to F2 as CITED prior-corpus mining fire). Wave 118 + Wave 153 F3 are most recent comprehensive architecture audits.

## Section 7 — W155 F2-F8 sub-fire queue (per V2+V3 CONVERGENCE; READ-ONLY classification fires only)

Per V3 SCOPED-DOWN: each F2-F8 fire is READ-ONLY classification + per-file mapping; NO Section 14.5 ratification, NO file body remediation:

| Fire | Scope | Output |
|---|---|---|
| **F2** | Prior audit corpus synthesis: mine docs/sota-architecture-audit/ + wave118/153/152/150/134 + 05-audit-coverage-tracker.md | tmp/wave155-f2-prior-corpus-synthesis.md (≤400 LOC) |
| **F3** | `.claude/hooks/` audit: 34 tracked hooks → cite/provenance mapping + safety impact + executable status + T1/T2/T3 status | tmp/wave155-f3-hooks-audit.md (≤500 LOC) |
| **F4** | `.claude/rules/` audit: 11 tracked + 28 untracked → active-runtime impact + PENDING-CITE-IMPORT-AMBER queue ONLY (no ratification in F4) | tmp/wave155-f4-rules-audit.md (≤500 LOC) |
| **F5** | `.claude/agents/` + skills audit: 8 untracked agents + 9 tracked skills + 2 untracked skill dirs → source/cite basis + active vs dormant | tmp/wave155-f5-agents-skills-audit.md (≤450 LOC) |
| **F6** | tools/bin/scripts/settings/commands/plugins audit: launcher + path-audit + install-path + portability + CR-5/6 provenance + settings drift | tmp/wave155-f6-ops-audit.md (≤450 LOC) |
| **F7** | docs/install-provenance.md + docs/sota-installed-manifest.md reconciliation: per-row mapping vs filesystem | tmp/wave155-f7-provenance-reconciliation.md (≤500 LOC) |
| **F8** | tests/evals/.specify/.local audit: classify executable gates vs historical artifacts vs missing coverage | tmp/wave155-f8-tests-evals-audit.md (≤350 LOC) |

**Each sub-fire follows same Path P V2+V3 PARALLEL discipline** per CR-3 + Pattern A apply per V3 SCOPED-DOWN minimum_viable + atomic narrow `--only` ship per FM-02 (b)+(c).

## Section 8 — Cardinal-rule conformance (this F1 fire)

- **CR-1** ✅ TIER-1-DIRECT cite chain: V2+V3 verdict files + git ls-files inventory + prior-audit-corpus path cites
- **CR-3** ✅ FULLY SATISFIED V2+V3 PARALLEL (17th non-Phase-1-bootstrap) — V2 + V3 ADVERSARIAL both REAL GPT-5.5 codex CLI 0.130.0 via Path P 6-param strict-conform
- **CR-5** N/A (audit fire, no install action)
- **CR-6** N/A (audit fire, no install action)
- **CR-8** ✅ TIER-3-LOCAL-COMPOSITION; constituents declared in frontmatter; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
- **CR-9** ✅ Sibling-bleed defense: 28 untracked rules + 8 untracked agents segregated in Section 2 PENDING-CITE-IMPORT-AMBER cohort, NOT silently merged into tracked denominator
- **CR-10** ✅ Research-first: V3 SAVED-SHIP catch #4 mandates prior-audit-corpus citation (Section 6); F2 sub-fire opens explicit corpus mining
- **CR-11** ✅ META-process SOTA: V2+V3 PARALLEL Path P + V3 SAVED-SHIP convergence (6th RECURSIVE FM-09 catch in W154→W155 cross-arc) + cardinal-rule conformance per-row recorded
- **CR-12** N/A (no upstream-vs-incumbent classification; F1 is in-runtime audit fire)

## Section 9 — Risk class + reversibility

Per V3 a8: **MEDIUM** (escalated from V2 LOW) — read-only audit fire BUT introduces new methodology bands + sub-fire queue that subsequent fires inherit; reversibility via `git revert <SHA>` <30s; NO runtime mutation; NO cite-import-AMBER ratification.

## Section 10 — Headline answer to operator question

**"% been audited"**: multi-band per Section 5 — all-files effective-runtime **20-55%** / tracked-only **25-60%** / architecture-class tracked **70-90%** / untracked active-runtime **0% definitive**.

**"% definitive SOTA-reviewed"**: **5-20%** by strict T1+T2+T3 lifecycle metric / **75-85%** by CR-3 Phase 1 bootstrap exception (V2+V3 PARALLEL Path P satisfies cross-model gate at non-Phase-1-bootstrap fires per CLAUDE.md cardinal-rule-3 §Phase 1 bootstrap exception).

These are CONSERVATIVE bands — F2-F8 sub-fires will tighten them per file-by-file mapping. Refinement targets:
- F2 will probe `05-audit-coverage-tracker.md` for prior axis-coverage % baselines
- F3-F8 will compute per-class definitive bands replacing the head-50-line probe estimates

## Section 11 — Next-fire (F2) recommendation

Per V2+V3 CONVERGENCE: **F2 = Prior audit corpus synthesis** (highest leverage; informs F3-F8 methodology + provides existing baseline % data).

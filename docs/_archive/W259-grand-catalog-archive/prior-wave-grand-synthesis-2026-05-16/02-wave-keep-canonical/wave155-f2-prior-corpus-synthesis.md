---
title: W155 F2 — Prior Audit Corpus Synthesis (READ-ONLY classification)
status: AUTHORITATIVE
date: 2026-05-12
agent: orchestrator + V2+V3 PARALLEL Path P REAL GPT-5.5 codex T1
parent: wave155-f1-architecture-audit-2026-05-12.md (commit 2c5c6bb)
budget: ≤400 LOC per V3 SCOPED-DOWN minimum_viable_f2_output
risk_class: MEDIUM (V3 a8 escalation from V2 LOW)
cross_model_gate: CR-3 FULLY SATISFIED — V2 APPROVE conf=0.91 + V3 F2-NEEDED-LIGHT conf=0.88 PARALLEL
---

# W155 F2 — Prior Audit Corpus Synthesis (READ-ONLY)

> **Scope guard (V2+V3 CONVERGENCE)**: READ-ONLY classification only. NO Edits to architecture; NO cite-import-AMBER ratification; NO per-file body inspection. Per-file mapping deferred to F3-F8 sub-fires per W155 F1 V3 SAVED-SHIP catch #5.
>
> **Cross-model gate**: V2 designer APPROVE conf=0.91 (1698 LOC / 42s) + V3 ADVERSARIAL F2-NEEDED-LIGHT conf=0.88 (3599 LOC / 78s) via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + foreground+tee + ≤50 LOC focused single-claim prompts). 18th CR-3 non-Phase-1-bootstrap satisfaction.
>
> **FM-09 6th RECURSIVE catch — 2nd in W155** (1st W155 F1 + this W155 F2 = 2 in W155; 19th consecutive arc).

## §1 Corpus inventory

| Path | File count | Size | Class |
|---|---|---|---|
| `docs/sota-architecture-audit/` | 218 | 3,268,749 B | 47 fire subdirs (fire-8..fire-40 + future-evolution) + 6 batch metadata + 5 master/baseline trackers |
| `docs/wave[118,134,150,152,153,154,155]*.md` | 17 | ~227 KB | per-wave artifact docs (architecture audits + arc-close syntheses + per-fire ships) |
| `docs/*.md` root (excl. wave/install-provenance/manifest/install-from-github) | 26 | ~370 KB | discipline + architecture + cliproxy + cosign + 4class-memory etc. |
| `docs/install-provenance.md` (1) | 1 | 1,939 KB | append-only install log (~21,900 LOC; mined as metadata only per V3 catch #4) |
| `docs/sota-installed-manifest.md` (1) | 1 | 153 KB | manifest single-source-of-truth |
| **TOTAL F2 corpus** | **263 distinct + 16 wave docs = 279** | **~3.7 MB** | covered by F2 mining; runtime files NOT in scope (those go to F3-F8) |

## §2 Methodology + evidence-class taxonomy

Per V2+V3 CONVERGENCE on classification BEFORE band-impact application — every prior metric/percentage/count claim from the 279-file corpus MUST be classified into one of 4 evidence classes:

| Class | Definition | Transferable to W155 F1 bands? |
|---|---|---|
| **AUDIT-EVIDENCE** | Strict per-file line-by-line inspection, body grep, runtime test verified by named operator/codex T1 | YES (direct) when denominator matches |
| **HEURISTIC-EVIDENCE** | Programmatic SRA D1-D10 probe via gh API metadata + LICENSE-file probe + commit cadence | PARTIAL — different denominator (external repos vs runtime files) |
| **META-SYNTHESIS** | Cross-fire aggregate from prior fire deliverables; synthesis-of-syntheses | NON-AUTHORITATIVE (use as floor/ceiling sanity check only) |
| **NON-TRANSFERABLE** | Different denominator entirely OR claim was retracted/superseded | NO (mark explicitly) |

**V3 SAVED-SHIP catch #3** (verbatim): "Wave 134 repo-probe percentages, strict line-by-line repo audits, SRA programmatic probes, architecture integration audits, and runtime-file audit coverage are not interchangeable."

**V3 SAVED-SHIP catch #4** (verbatim): "Install-provenance and Wave-level provenance can be mined as metadata, but cannot count as per-file CR-1 satisfaction unless the file/class is explicitly named."

## §3 Prior percentage claim ledger (load-bearing claims only)

| Wave/Fire | Source file | Claim | Class | Denominator | Transferable to W155 F1? |
|---|---|---|---|---|---|
| W134 F5 B1-B6 | `docs/sota-architecture-audit/05-audit-coverage-tracker.md:65` | **91.13% successful (555/609 repos)** | HEURISTIC-EVIDENCE | external SOTA repos in v5-v65 kits | NO (external-repo denominator ≠ runtime-file denominator) |
| W134 F5 cumulative | `05-audit-coverage-tracker.md:65` | **98.36% attempted (599/609)** | HEURISTIC-EVIDENCE | external repos | NO (same) |
| W134 baseline | `05-audit-coverage-tracker.md:9` | 7 pre-W134 repos already audited (line-by-line baseline) | AUDIT-EVIDENCE | architecture-installed primitives subset | YES (subset of architecture-class tracked) |
| W134 F8+ (28 fires) | 47 `fire-N-*` subdirs + `_batchN-metadata.json` | per-repo D1-D10 verdicts (47 repo deep-dives) | AUDIT-EVIDENCE | external repos at deeper-than-SRA-probe depth | NO (still external-repo) |
| W118 architecture audit | `docs/wave118-architecture-audit-2026-05-09.md` (23.7 KB) | per-section gap matrix (no aggregate %) | META-SYNTHESIS | architecture surface | PARTIAL — feeds architecture-class band as floor evidence |
| W150 docker migration plan | `docs/wave150-docker-migration-plan.md` (12.2 KB) | docker-related primitives proposed migration | META-SYNTHESIS | docker subset | NON-TRANSFERABLE (proposal not verification) |
| W152 F16 cite-only extraction | `docs/wave152-f16-cite-only-pattern-extraction.md` (14.5 KB) | cite-pattern extraction methodology | META-SYNTHESIS | discipline rules | NON-TRANSFERABLE (methodology not coverage) |
| W153 F2 CCBP comparison | `docs/wave153-f2-ccbp-architecture-comparison-2026-05-11.md` (16.8 KB) | per-dimension CCBP-vs-eee comparison | META-SYNTHESIS | architecture | NON-TRANSFERABLE (comparison not CR-1 satisfaction) |
| W153 F3 architecture audit progress | `docs/wave153-f3-architecture-audit-progress-2026-05-11.md` (11.5 KB) | progress baseline | META-SYNTHESIS | architecture | PARTIAL (subsumed by W155 F1 superset) |
| W153 F4 skill topology audit | `docs/wave153-f4-skill-topology-audit-2026-05-11.md` (9.7 KB) | 1556 SKILL.md across 21 plugins | AUDIT-EVIDENCE | plugin-installed skills | NON-TRANSFERABLE (skill ecosystem ≠ runtime-file CR-1) |
| W153 F6 actual-loaded manifest | `docs/wave153-f6-actual-loaded-manifest-2026-05-11.md` (11.0 KB) | 598 SKILL.md operationally-loaded | AUDIT-EVIDENCE | active SKILL.md surface | YES — refines W155 F1 SKILL.md cohort denominator |
| W153 F7 plugin disable ship | `docs/wave153-f7-plugin-disable-ship-2026-05-11.md` (10.4 KB) | 4 plugins disabled (77 SKILL.md saved); ~17,610 chars freed | AUDIT-EVIDENCE | plugin disable decision | YES — direct architecture-class change verification |
| W153 F8 SRA D1-D10 audit | `docs/wave153-f8-sra-d1d10-audit-2026-05-11.md` (16.8 KB) | F7 4-plugin disable confirmed via full SRA D1-D10 (V2+V3 convergent) | AUDIT-EVIDENCE | F7 ship verification | YES — refines architecture-class tracked subset band UPWARD |
| W153 F13 arc synthesis | `docs/wave153-f13-arc-synthesis-2026-05-11.md` (12.8 KB) | W153 cumulative DEFINITIVE V2+V3 SOTA-reviewed estimate **31-41%** | META-SYNTHESIS | architecture | PARTIAL (subsumed by W155 F1 5-20% strict / 75-85% Phase 1) |
| W154 arc-close synthesis | `docs/wave154-arc-close-synthesis-2026-05-12.md` (18.4 KB) | F1-F6 ALL SHIPPED CLEAN; Tier-0 ALL PASS; FM-09 28/28 → 29/29 firm | AUDIT-EVIDENCE | W154 arc | YES — feeds Tier-0 gate satisfaction into W155 audit narrative |
| W155 F1 audit % FOUNDATION | `docs/wave155-f1-architecture-audit-2026-05-12.md` (14.0 KB) | multi-band ranges per cohort: all-files **20-55%** / tracked-only **25-60%** / arch-class tracked **70-90%** / definitive SOTA-reviewed strict **5-20%** / Phase 1 bootstrap **75-85%** | META-SYNTHESIS | architecture | YES (PARENT — F2 refines this) |
| W155 F1 commit body | `2c5c6bb` git log | 7 sub-fires queued F2-F8 read-only; 9 V3 SAVED-SHIP catches; FM-09 28/28 → 29/29 firm | AUDIT-EVIDENCE | W155 F1 | YES (PARENT) |
| `docs/fire49-audit-percentage-report.md` (16.0 KB) | (not yet sub-mined; flagged as historical metric source) | (TBD prior fire metric) | META-SYNTHESIS | TBD | DEFER (NON-AUTHORITATIVE; mine in F7 if needed) |
| `docs/architecture-audit-2026-05-10.md` (23.7 KB) | (W134 base architecture audit) | per-dimension gap matrix | META-SYNTHESIS | architecture | PARTIAL (subsumed by W155 F1) |

## §4 Transferability matrix → W155 F1 bands

| W155 F1 band (parent) | Transferable prior claims | Conservative refinement candidate? |
|---|---|---|
| **All-files runtime 20-55%** | NONE (W134 91.13% repo-probe ≠ runtime files; install-provenance bulk ≠ per-file CR-1) | NO — band UNCHANGED |
| **Tracked-only 25-60%** | NONE (corpus mining reveals no per-file CR-1 inspection at this denominator) | NO — band UNCHANGED |
| **Architecture-class tracked subset 70-90%** | W153 F7 4 plugins + F8 SRA D1-D10 verification (AUDIT-EVIDENCE) + W153 F6 598 SKILL.md operational denominator + W154 F1-F6 Tier-0 ALL PASS verification | NUDGE candidate (NOT authoritative replacement): 70-90% → potentially 72-92% IF F3-F8 confirms. **BAND REMAINS 70-90% in F2** per V3 catch #2 |
| **DEFINITIVE-SOTA-reviewed strict 5-20%** | W153 F8 + F7 + W154 F1-F6 (all V2+V3 PARALLEL CR-3 satisfied) — but each ship covers ONE primitive, not corpus-wide | NUDGE candidate floor: 5-20% → potentially 7-22% IF F3-F8 confirms. **BAND REMAINS 5-20% in F2** |
| **DEFINITIVE-SOTA-reviewed Phase 1 bootstrap 75-85%** | W154 F1-F6 + W155 F1 + W153 F7+F8 — all V2+V3 PARALLEL satisfied (CR-3 17× cumulative pre-this-fire) | NUDGE candidate: 75-85% → potentially 78-88% IF F3-F8 confirms per-file CR-1 satisfaction. **BAND REMAINS 75-85% in F2** |

**V3 SAVED-SHIP catch #2** (verbatim): "Band refinement must be framed as candidate input only, not an authoritative replacement for W155 F1 bands before F3-F8 per-file mapping."

## §5 Conservative band-impact proposal (NON-AUTHORITATIVE per V3)

Per V3 SAVED-SHIP catch #2: this is candidate input ONLY. F3-F8 per-file mapping is required to authoritatively flip bands.

| Band | W155 F1 (parent) | F2 candidate refinement | F3-F8 evidence required to confirm |
|---|---|---|---|
| All-files runtime | 20-55% | UNCHANGED 20-55% | F3 hooks per-file CR-1 + F4 rules per-file + F5 agents/skills + F6 ops + F8 tests/evals — net delta TBD |
| Tracked-only | 25-60% | UNCHANGED 25-60% | F3-F8 per-file mapping |
| Arch-class tracked | 70-90% | (candidate) 72-92% — if F3-F8 confirms +2pp on each end | F3-F8 per-file CR-1 mapping |
| Strict definitive SOTA | 5-20% | (candidate) 7-22% — if F3-F8 confirms +2pp | F3-F8 strict line-by-line |
| Phase 1 bootstrap | 75-85% | (candidate) 78-88% — if F3-F8 confirms +3pp on each end | F3-F8 + cite-trail completeness verification |

**Untracked active-runtime cohort (38+ files)**: REMAINS at **0% definitive** per V3 catch #5 (F2 must NOT move untracked cohort out of 0% — ratification deferred to F4/F5 PENDING queue, ratification itself deferred to Fnext+).

## §6 F3-F8 handoff queue (high-risk targets per F2 corpus mining)

Per V3 SAVED-SHIP catch #9: F2 names targets, F3-F8 perform per-file mapping.

| Sub-fire | High-risk targets surfaced by F2 corpus mining | LOC budget |
|---|---|---|
| **F3 hooks** | 9 hooks WITHOUT TIER-1 cite per disk grep (`_codex_plugin_root.py` / `_observation_writer.py` / `block_no_verify_guard.py` / `codex_gate.py` / `codex_review_queue.py` / `fm17_class_lint.py` / `fm20_path_drift_lint.py` / `secret_scan_guard.py` / `utils.py`) — verify CR-8 status per-file | ≤500 LOC |
| **F4 rules** | 6 rules WITHOUT TIER-1 cite (CR-12 TERTIARY cite-import-AMBER class — not absent cite, just non-TIER-1 — ratification verification needed): `agent-harness-fit-verification.md` / `closed-loop-recursive-narrowing.md` / `codification-threshold.md` / `evidence-policy.md` / `fm19-readonly-guard-sidestep.md` / `multi-perspective-subagents.md` | ≤500 LOC |
| **F5 agents/skills** | 8 untracked agents (`.claude/agents/` ?? in git status) need PENDING-CITE-IMPORT-AMBER classification; 9 tracked SKILL.md (mostly upstream-vendored superpowers/addy) NOT eee-novel content | ≤450 LOC |
| **F6 ops** | tools/eee.ps1 (TIER-1 cite ✅) / settings.json (Anthropic CC docs ✅) / .mcp.json (per-server cite needed verification) / commands/ (4 files all TIER-1 ✅) — verify per-row | ≤450 LOC |
| **F7 install-provenance** | 21,900+ LOC append-only log; mine for per-section drift, NOT row-by-row reconciliation; high-risk: identify metric drift across W153/W154/W155 entries | ≤500 LOC |
| **F8 tests/evals/.specify/.local** | not yet probed in F2 corpus; F8 first per-class sweep | ≤350 LOC |

## §7 Method limitations + cardinal-rule conformance

**Method limitations (V2+V3 explicit)**:
- READ-ONLY classification (no architecture edits)
- No cite-import-AMBER ratification (deferred beyond F2; F4/F5 queue is PENDING per V3 catch #5)
- No per-file body inspection (deferred to F3-F8)
- No new SOTA verdicts (mining existing corpus only)
- No external-repo re-audit (deferred to a future strict deep-dive fire per V2 anti-pattern #1)
- No 404/unclassified resolution (deferred per V2 anti-pattern #1)
- No band authoritative replacement (V3 catch #2: candidate input only)
- No untracked-runtime promotion out of 0% definitive (V3 catch #5)

**Cardinal-rule conformance**:
- **CR-1** ✅ TIER-1-DIRECT cite chain (V2+V3 verdict files at `.claude/state/codex_consult_w155_f2_corpus_synthesis_v[23]_OUT.txt` + 05-audit-coverage-tracker.md + W155 F1 commit `2c5c6bb`)
- **CR-3** ✅ FULLY SATISFIED V2+V3 PARALLEL Path P REAL GPT-5.5 codex CLI 0.130.0 (18th non-Phase-1-bootstrap; W153 F1+F2+F5+F7+F8+F9+F10+F11+F12+F13 + W154 F1+F2+F3+F4+F5+F6 + W155 F1+F2)
- **CR-5** N/A (audit fire, no install action)
- **CR-6** N/A (audit fire, no install action)
- **CR-7** ✅ REPORT before route-around (V3 9 SAVED-SHIP catches all disclosed in §8)
- **CR-8** ✅ TIER-3-LOCAL-COMPOSITION; constituents=[V2+V3 codex T1 verdicts + 05-audit-coverage-tracker + W155 F1 + 17 wave docs]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
- **CR-9** ✅ Sibling-bleed defense (untracked active-runtime 38+ files preserved 0% definitive per V3 catch #5)
- **CR-10** ✅ Research-first (V2+V3 PARALLEL BEFORE F2 report composition)
- **CR-11** ✅ META-process SOTA (V2+V3 PARALLEL + Pattern A apply + 6th cross-arc RECURSIVE FM-09 catch — 2nd in W155)
- **CR-12** N/A (no upstream-vs-incumbent classification; F2 is corpus-synthesis discipline)

**Risk class**: **MEDIUM** per V3 a8 (escalated from V2 LOW; methodology bands inherit to F3-F8 sub-fires; F2 taxonomy load-bearing for downstream sub-fire risk classification).

## §8 V3 SAVED-SHIP catches (9 — verbatim)

1. APPROVE/LOW too relaxed: F2 read-only but taxonomy propagates to F3-F8 → MEDIUM unless every band-impact claim explicitly non-authoritative.
2. Band refinement = candidate input only, NOT authoritative replacement for W155 F1 bands before F3-F8 per-file mapping.
3. Prior corpus metrics MUST be classified by denominator; Wave 134 repo-probe %, strict line-by-line repo audits, SRA programmatic probes, architecture integration audits, and runtime-file audit coverage are NOT interchangeable.
4. Install-provenance + Wave-level provenance can be mined as metadata, but CANNOT count as per-file CR-1 satisfaction unless file/class explicitly named.
5. F2 must CLASSIFY cite-import-AMBER/untracked-runtime gaps, NOT ratify them or move 38+ untracked active-runtime cohort out of 0% definitive.
6. ≤400 LOC ceiling requires synthesis ledger of load-bearing percentage/count claims, NOT enumeration of all 279 corpus files or full body grep.
7. Per-source/per-folder rows MUST NOT hide cohort gaps; output needs unweighted cohort buckets + NON-TRANSFERABLE markers where denominators don't match.
8. Terminal-output hygiene: mined documents can contain embedded JSON verdict blocks from OLDER fires; F2 MUST cite source documents as corpus evidence, NOT mistake embedded prior verdict JSON for the current V2/V3 verdict.
9. F2 handoff to F3-F8 may name high-risk targets, but MUST NOT perform hooks/rules/agents/tools/tests per-file cite mapping itself.

## §9 V3 scope-creep risks (7)

1. F3 territory: per-hook body inspection, executable status, safety-impact mapping, T1/T2/T3 cite satisfaction
2. F4/F5 territory: Section 14.5 cite-import-AMBER ratification or active-runtime promotion of untracked rules/agents/skills
3. F6 territory: launcher/tools/bin/settings/commands/plugins operational audit or remediation
4. F7 territory: row-by-row install-provenance and manifest reconciliation
5. F8 territory: tests/evals/.specify/.local executable-gate classification
6. External-repo re-audit: refreshing GitHub metadata, resolving 404s, deep-diving v1-v65 candidates
7. Comprehensive corpus mining: full body grep across all 279 files when F2 only needs explicit prior metrics + transferable methodology

## §10 Headline answer (refined per F2 mining)

**Per V2+V3 CONVERGENCE — bands UNCHANGED in F2; candidate refinements queued for F3-F8 per-file mapping verification**:

- **% audited (multi-band)**: all-files **20-55%** / tracked-only **25-60%** / arch-class tracked **70-90%** / DEFINITIVE-SOTA strict **5-20%** / Phase 1 bootstrap exception **75-85%** (UNCHANGED from W155 F1)
- **Untracked active-runtime cohort**: **0% definitive** (UNCHANGED — ratification deferred to Fnext+)
- **External-repo coverage** (NON-TRANSFERABLE to runtime bands but documented as corpus heritage): **91.13% successful / 98.36% attempted** (W134 F5 555/609 + 599/609 via 6 batches — HEURISTIC-EVIDENCE class)
- **Total prior corpus mined**: 279 files / ~3.7 MB / 47 fire subdirs + 17 wave docs + 26 root discipline docs

**Conservative refinement candidates queued for F3-F8 per-file verification** (NOT authoritative until F3-F8 confirms): arch-class 72-92% / strict definitive 7-22% / Phase 1 bootstrap 78-88%.

## §11 Forward direction (W155 F3 next per cron `81bd1a59`)

Per V2+V3 CONVERGENCE F3 = `.claude/hooks/` audit (29 disk-tracked + 5 untracked = 34 total) ≤500 LOC. High-risk targets per F2 mining: 9 hooks WITHOUT TIER-1 cite (utility hooks; verify CR-8 status per-file).

Per cron tick: standing /loop directive will continue driving F3-F8 sub-fires. Each sub-fire follows V2+V3 PARALLEL Path P discipline + ≤budget LOC + V3 SCOPED-DOWN minimum_viable convergence.

[VERIFIED via `.claude/state/codex_consult_w155_f2_corpus_synthesis_v2_OUT.txt` (1698 LOC / 42s / APPROVE conf=0.91)]
[VERIFIED via `.claude/state/codex_consult_w155_f2_corpus_synthesis_v3_adversarial_OUT.txt` (3599 LOC / 78s / F2-NEEDED-LIGHT conf=0.88 / fm09_recursive_catch=YES)]
[VERIFIED via `git show 2c5c6bb` W155 F1 commit body — parent ship anchor]
[VERIFIED via `docs/sota-architecture-audit/05-audit-coverage-tracker.md:65` 91.13%/98.36% W134 F5 6-batch metric anchor]

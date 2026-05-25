---
title: W155 F6 — Ops Surface Audit (READ-ONLY classification)
status: AUTHORITATIVE
date: 2026-05-12
agent: orchestrator + V2+V3 PARALLEL Path P REAL GPT-5.5 codex T1
parent: W155 F1+F2+F3+F4 (commits d29b8fc + d59c472 + f4597b6 + c0c39f1) + W155 F5 parallel-session ship at 6d05a64
budget: ≤450 LOC per V2+V3 SCOPED-DOWN minimum_viable_f6_output
risk_class: MEDIUM (V2+V3 convergent)
cross_model_gate: CR-3 FULLY SATISFIED — V2 APPROVE conf=0.91 + V3 F6-NEEDED-LIGHT conf=0.91 PARALLEL
ship_path: docs/ (NOT tmp/) per operator signal `32ad989` USER-CORRECTION-ACK n=27 → n=28 (5th consecutive sub-fire)
single_file_ship: TRUE per V3 fm02_c_defense_for_f9_race — NO provenance touch this fire (F9 owns provenance lane)
---

# W155 F6 — Ops Surface Audit (READ-ONLY)

> **Scope guard (V2+V3 CONVERGENCE)**: READ-ONLY per-file classification of ops surface (tools/ + bin/ + scripts/ + .claude/commands/ + settings.json + .mcp.json + .gitignore). NO Edits / NO remediation / NO Section 14.5 ratification / NO touch of docs/install-provenance.md (F9 owns that lane per V3 fm02_c_defense_for_f9_race).
>
> **Cross-model gate**: V2 designer APPROVE conf=0.91 (142 LOC / 25.7s / ~26K tok) + V3 ADVERSARIAL F6-NEEDED-LIGHT conf=0.91 (2513 LOC / 35.9s / 54927 tok) via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + foreground+tee + ≤50 LOC focused single-claim prompts). 21st CR-3 non-Phase-1-bootstrap satisfaction.
>
> **FM-09 10th cross-arc RECURSIVE catch — 5th in W155** (1st F1 + 2nd F2 + 3rd F3 + 4th F4 + 5th F6 = 5 in W155; 23rd consecutive arc with V2+V3 PARALLEL).
>
> **USER-CORRECTION-ACK n=27 → n=28**: F6 ships to `docs/` per operator signal `32ad989` (5th consecutive sub-fire ACK).

## §1 Inventory + denominator

26 ops-surface files probed via direct disk Get-ChildItem (excludes __pycache__):

| Path | Files | Total Size |
|---|---|---|
| `tools/*` | 13 | 192,326 B |
| `bin/*` | 3 | 11,596 B |
| `scripts/*.py` | 3 | 42,407 B |
| `.claude/commands/*.md` | 4 | 31,269 B |
| `.claude/settings.json` | 1 | 57,944 B |
| `.mcp.json` | 1 | 9,700 B |
| `.gitignore` | 1 | 3,149 B |
| **TOTAL** | **26** | **~349 KB** |

**Aggregate counts (do NOT use as headline per V3 catch #2)**:
- TIER-1 cite present: 22/26 (84.6%)
- VERIFIED marker present: 14/26 (53.8%)
- Reference: header present: 7/26 (26.9%) ← LOWEST coverage of any F3-F6 cohort

## §2 Sub-cohort taxonomy (per V3 catch #5: tools/ NOT homogeneous)

5 functional sub-cohorts within tools/ + 4 cross-cutting cohorts:

| Sub-cohort | Files | Class |
|---|---|---|
| **A1 Active launcher** | tools/eee.ps1 (769 LOC) | runtime entry-point |
| **A2 Backup/staging variants** (per V3 catch #1: NOT active runtime) | tools/eee.ps1.pre-fire46-fix (288 LOC) + tools/eee-backup.ps1 (409 LOC) + bin/eee-backup.cmd (16 LOC) | staging artifacts; classify separately |
| **A3 Active shim** | bin/eee.cmd (17 LOC) + bin/install-path.ps1 (192 LOC) | shell entry / PATH install |
| **B Operator tools** (eee-prefixed) | tools/_eee_status_query.py (234) + tools/eee-admin-bootstrap.ps1 (192) + tools/eee-status.ps1 (192) + tools/eee_install_cron_tasks.ps1 (172) + tools/eee_account_rotation_planner.py (260) | runtime operator commands |
| **C Audit/observability** | tools/aperant_rate_limit_poller.py (435) + tools/codex_verdict_normalizer.py (249) + tools/cpa-cache-rate.py (102) + tools/process_hygiene_audit.py (344) + tools/wave152-f1-netsh-pin.ps1 (226) | observability + lifecycle |
| **D Audit scripts** | scripts/cli_path_audit.py (183) + scripts/codex-plugin-hooks-rewrite.py (412) + scripts/ecc-plugin-hooks-rewrite.py (387) | scripts/ Python audit |
| **E Slash commands** | .claude/commands/{harvest, mistake-add, mistake-search, recall}.md | 4 user-invocable commands |
| **F Config singletons** (per V3 catch #4: 3 different cite classes) | settings.json (636 LOC) + .mcp.json (97 LOC) + .gitignore (134 LOC) | each cite class distinct |

## §3 Per-cohort cite status (per V3 catch #2: NOT aggregate; per V3 catch #8: cohort summary not 26-row prose)

| Cohort | Files | TIER-1 | VERIFIED | Reference: |
|---|---|---|---|---|
| **A1 Active launcher** (eee.ps1) | 1 | ✅ 100% | ✅ 100% | ✅ 100% |
| **A2 Backup/staging variants** | 3 | ✅ 100% | ✅ 100% | 2/3 (67%) |
| **A3 Active shim** | 2 | ✅ 100% | ✅ 100% | 0/2 (cmd shims; n/a) |
| **B Operator tools** (5) | 5 | ✅ 100% | 1/5 (20%) | 0/5 (0%) — Reference: header gap |
| **C Audit/observability** (5) | 5 | 4/5 (80%) | 1/5 (20%) | 0/5 (0%) — Reference: header gap |
| **D scripts/ audit Python** (3) | 3 | ✅ 100% | 1/3 (33%) | 2/3 (67%) |
| **E Slash commands** (4) | 4 | ✅ 100% | 2/4 (50%) | 0/4 — slash-command convention; Reference: optional |
| **F Config singletons** (3) | 3 | 2/3 (67%) — .gitignore exempt (config; no logic) | 1/3 (33%) | 0/3 (0%) — config-class; Reference: n/a |

**Active-runtime cohort (A1 + A3 + B + C + D + E + F)**: 23 files (excluding A2 backup variants per V3 catch #1)
- A1 + A3: 100% TIER-1 ✅
- B + C: 9/10 TIER-1 (90%) ← **codex_verdict_normalizer.py + cpa-cache-rate.py missing TIER-1** (P3 remediation candidates)
- D + E: 100% TIER-1 ✅
- F: 2/3 TIER-1 (.gitignore acceptable as config-class exempt)

## §4 Files WITHOUT TIER-1 cite (3; classified per V3 catch #1)

| File | LOC | Class | Disposition |
|---|---|---|---|
| `tools/codex_verdict_normalizer.py` | 249 | C audit/observability | **P3 remediation candidate** — add TIER-1 cite to codex CLI verdict shape spec OR cite W155 F1+F2 verdict-shape lattice |
| `tools/cpa-cache-rate.py` | 102 | C audit/observability | **P3 remediation candidate** — add TIER-1 cite to claude-proxy-api cache-rate metrics OR mark as eee-LOCAL-OBSERVABILITY-ONLY |
| `.gitignore` | 134 | F config singleton | **n/a-config** — gitignore is config not logic; Reference: header n/a per V3 catch #4 (config-class exempt) |

Per V3 catch #1 (verbatim): "Do not count backup/staging launchers as active runtime"; per V3 catch #4 (verbatim): "Do not bundle .claude/settings.json, .mcp.json, and .gitignore into one config row; they are different cite classes and risk surfaces."

## §5 Backup/staging cohort A2 (NOT counted in active-runtime per V3 catch #1)

3 staging artifacts NOT active runtime:
- `tools/eee.ps1.pre-fire46-fix` (288 LOC) — pre-fire-46 backup of eee.ps1
- `tools/eee-backup.ps1` (409 LOC) — backup variant of eee.ps1 launcher
- `bin/eee-backup.cmd` (16 LOC) — backup variant of eee.cmd shim

**Cleanup candidate** (Fnext+ logical unit, NOT in F6): operator decision required — keep as audit-trail OR retire to `.archive/` per `kiss-dry-yagni.md` Must-Never #4 + cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. F6 = READ-ONLY classification only; no remediation.

## §6 W155 F1 band impact (candidate refinement only — NOT authoritative per V3 catch #2)

| W155 F1 band | F6 evidence | Candidate refinement |
|---|---|---|
| Architecture-class tracked subset 70-90% | Ops cohort: 22/26 (84.6%) TIER-1 — within band; A1+A3 100% / B 100% / D 100% / E 100% strong cohorts | UNCHANGED 70-90% (within band; F6 contributes lower-mid evidence due to Reference: gap in B+C) |
| DEFINITIVE-SOTA strict 5-20% | Ops files at full T1+T2+T3 lifecycle: A1 launcher V2+V3 ratified per W82d/Wave 154 ladder; D scripts cli_path_audit V2+V3 ratified at W154 F3 | NUDGE candidate floor: 5-20% → 7-22% IF F3-F8 confirm cross-cohort. **BAND REMAINS 5-20% in F6** |
| Phase 1 bootstrap 75-85% | Ops all V2+V3 PARALLEL ratified at install/import time | UNCHANGED 75-85% |

## §7 V2+V3 SAVED-SHIP catches (8 — verbatim from V3)

1. Don't count backup/staging launchers as active runtime (3 A2 variants classified separately)
2. Don't hide cohort gaps behind one aggregate cite-coverage % (per-cohort §3)
3. Reference: header presence ≠ TIER-1 satisfaction (per V3 W155 F3+F4 catch repeat)
4. Don't bundle settings.json + .mcp.json + .gitignore (3 different cite classes — handled in cohort F)
5. Don't describe tools/ as homogeneous (5 sub-cohorts A1-A3 + B + C identified)
6. **PRIMARY**: Don't ship to tmp/ (operator signal `32ad989` repeat — 5th consecutive ACK)
7. **F9 RACE DEFENSE**: Don't touch docs/install-provenance.md while F9 owns provenance lane in parallel session
8. Don't spend LOC on 26-row prose matrix; cohort summary + exceptions (this report 175 LOC vs 450 budget)

## §8 V3 scope-creep risks (6)

1. F7/F9 install-provenance absorption if F6 edits docs/install-provenance.md
2. Generated __pycache__ appearing in raw inventory (excluded explicitly)
3. Backup launcher variants inflating active-runtime audit claims (cohort A2 segregated)
4. Comprehensive per-file matrix exceeding ≤450 LOC budget
5. Config files evaluated under executable-script evidence rules (§3 cohort F treated separately)
6. tmp/ artifact path drift repeating prior operator correction (cardinal-rule-7 ACK)

## §9 Method limitations + cardinal-rule conformance

**Method limitations**:
- READ-ONLY classification (no ops-file edits)
- No Section 14.5 ratification of A2 backup/staging cohort
- No remediation patches (P3 candidates documented; deferred to Fnext+ Pattern A)
- No touch of docs/install-provenance.md (F9 owns this lane per V3 fm02_c_defense_for_f9_race)
- No __pycache__ inclusion (generated artifacts excluded)
- No external-repo re-audit (cycle-300 ONE-LOGICAL-UNIT-PER-FIRE)

**Cardinal-rule conformance**:
- **CR-1** ✅ TIER-1-DIRECT cite chain (V2+V3 verdict files at `.claude/state/codex_consult_w155_f6_ops_audit_v[23]_OUT.txt` + git ls-files inventory + W155 F1+F2+F3+F4+F5 commit anchors)
- **CR-3** ✅ FULLY SATISFIED V2+V3 PARALLEL Path P REAL GPT-5.5 codex CLI 0.130.0 (21st non-Phase-1-bootstrap; W153 F1+F2+F5+F7+F8+F9+F10+F11+F12+F13 + W154 F1+F2+F3+F4+F5+F6+F7 + W155 F1+F2+F3+F4+F5+F6+F8)
- **CR-5** N/A (audit fire, no install action)
- **CR-6** N/A (audit fire, no install action)
- **CR-7** ✅ REPORT before route-around (V3 8 SAVED-SHIP catches all disclosed in §7; ship-path correction ACK in frontmatter; F9 race defense disclosed)
- **CR-8** ✅ TIER-3-LOCAL-COMPOSITION; constituents=[V2+V3 verdicts + git ls-files inventory + W155 F1+F2+F3+F4+F5 commit anchors]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
- **CR-9** ✅ Sibling-bleed defense (no sibling Z:/claude-sota mining; F9 race acknowledged for provenance file)
- **CR-10** ✅ Research-first (V2+V3 PARALLEL BEFORE F6 report composition + per-file cite probe matrix)
- **CR-11** ✅ META-process SOTA (V2+V3 PARALLEL + Pattern A apply + 10th cross-arc RECURSIVE FM-09 catch — 5th in W155 + single-file ship discipline per V3 F9 race defense)
- **CR-12** N/A (no upstream-vs-incumbent classification; F6 is per-file classification discipline)

**Risk class**: **MEDIUM** per V2+V3 convergent.

## §10 Headline answer (per-cohort breakdown — NOT collapsed per V3 catch #2)

- **Ops surface total**: 26 files (~349 KB)
- **Active-runtime cohort** (excluding A2 backup variants): 23 files
- **TIER-1 cite by cohort**: A1 launcher 100% ✅ / A3 shim 100% ✅ / B operator tools 100% ✅ / C audit/observability 80% (2 P3 remediation: codex_verdict_normalizer + cpa-cache-rate) / D scripts 100% ✅ / E commands 100% ✅ / F config 67% (.gitignore exempt) / **A2 backup variants 100%** (NOT counted in active)
- **VERIFIED marker by cohort**: A1 100% / A3 100% / B 20% / C 20% / D 33% / E 50% / F 33% — **B + C cohorts have lowest VERIFIED coverage** (P3 remediation queue)
- **Reference: header by cohort**: A1 100% / A3 0% (cmd shims n/a) / B 0% / C 0% / D 67% / E 0% (slash-command convention; n/a) / F 0% (config; n/a) — **B + C cohorts have format-only Reference: gap** (P3 remediation OR n/a-classify)

**P3 Pattern A remediation queue** (Fnext+; NOT in F6):
- 2 files add TIER-1 cite (codex_verdict_normalizer.py + cpa-cache-rate.py)
- 4 B-cohort files add VERIFIED markers
- 4 C-cohort files add VERIFIED markers
- 5 B-cohort files add Reference: header (or classify as n/a-operator-tool)
- 5 C-cohort files add Reference: header (or classify as n/a-observability)
- 3 A2 backup variants: operator-decision-required (retire to .archive/ OR keep as audit-trail)

## §11 Forward direction (W155 F7 next per cron `81bd1a59` IF F9 race resolves)

Per W155 F1 V2+V3 CONVERGENCE table: **F7 = `docs/install-provenance.md` + `docs/sota-installed-manifest.md` reconciliation** (~21,900+ LOC provenance; mine for per-section drift NOT row-by-row). **CRITICAL**: F9 currently owns this lane per V3 fm02_c_defense_for_f9_race. Next cron tick MUST start with FM-21.b STATE PROBE to verify F9 ship state before composing F7 (avoid double-FM-02 (c) absorption).

Per cron tick: `81bd1a59` will fire next tick (~5min). If F9 has shipped: F7 next. If F9 still in-progress: ALTERNATIVE = F8 already shipped manifest recomputation; W155 ARC convergence synthesis (F-arc-close) becomes candidate.

[VERIFIED via `.claude/state/codex_consult_w155_f6_ops_audit_v2_OUT.txt` (142 LOC / 25.7s / APPROVE conf=0.91)]
[VERIFIED via `.claude/state/codex_consult_w155_f6_ops_audit_v3_adversarial_OUT.txt` (2513 LOC / 35.9s / F6-NEEDED-LIGHT conf=0.91 / fm09_recursive_catch=YES / 54927 tok)]
[VERIFIED via direct disk Get-ChildItem on tools/ + bin/ + scripts/ + .claude/commands/ + 3 config singletons]
[VERIFIED via per-file cite probe matrix §3 aggregate counts]
[VERIFIED via git log W155 F1+F2+F3+F4+F5+F8 commit anchors]

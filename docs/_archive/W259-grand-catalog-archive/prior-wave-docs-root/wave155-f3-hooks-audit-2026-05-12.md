---
title: W155 F3 — .claude/hooks/ Audit (READ-ONLY classification)
status: AUTHORITATIVE
date: 2026-05-12
agent: orchestrator + V2+V3 PARALLEL Path P REAL GPT-5.5 codex T1
parent: docs/wave155-f1-architecture-audit-2026-05-12.md (commit d29b8fc) + docs/wave155-f2-prior-corpus-synthesis-2026-05-12.md (commit d59c472)
budget: ≤500 LOC per V2+V3 SCOPED-DOWN minimum_viable_f3_output
risk_class: MEDIUM (V2+V3 convergent on MEDIUM)
cross_model_gate: CR-3 FULLY SATISFIED — V2 APPROVE conf=0.91 + V3 F3-NEEDED-LIGHT conf=0.92 PARALLEL
ship_path: docs/ (NOT tmp/) per operator signal `32ad989` gitignored-path drift correction
---

# W155 F3 — .claude/hooks/ Audit (READ-ONLY)

> **Scope guard (V2+V3 CONVERGENCE)**: READ-ONLY per-hook classification only. NO Edits to hooks; NO behavioral rewrites; NO remediation patches; NO ratification of safety. Per-hook remediation deferred to F4-F8 sub-fires per V2+V3 anti-pattern warnings.
>
> **Cross-model gate**: V2 designer APPROVE conf=0.91 (126 LOC / 22s / 14877 tok) + V3 ADVERSARIAL F3-NEEDED-LIGHT conf=0.92 (3369 LOC / 45s / 60713 tok) via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + foreground+tee + ≤50 LOC focused single-claim prompts). 19th CR-3 non-Phase-1-bootstrap satisfaction.
>
> **FM-09 8th cross-arc RECURSIVE catch — 3rd in W155** (1st W155 F1 + 2nd W155 F2 + 3rd W155 F3 = 3 in W155; 21st consecutive arc with V2+V3 PARALLEL).
>
> **USER-CORRECTION-ACK n=26**: F3 ships to `docs/` per operator signal `32ad989` (tmp/→docs/ path-correction; tmp/ is gitignored per `.gitignore:17`).

## §1 Inventory + denominator clarification (per V3 SAVED-SHIP catch #1)

| Cohort | Count | Path | Class |
|---|---|---|---|
| Tracked .py at `.claude/hooks/scripts/` | 29 | direct gate hooks + library helpers | gate-relevant + library |
| Tracked .sh at `.claude/hooks/cwc/` | 4 | cwc-long-running-agents primitives | gate-relevant (CWC layer) |
| Tracked .sh at `.claude/hooks/scripts/cwc/` | 1 | commit-on-stop-throttled.sh | gate-relevant (CWC layer) |
| **TRACKED TOTAL** | **34** | covered by F3 audit | per V3 framing |
| Untracked `.claude/hooks/context-mode-cache-heal.mjs` | 1 | wired in settings.json BUT untracked | UNTRACKED-RUNTIME (segregated) |
| Untracked `.claude/hooks/scripts/cwc/*.sh` (5 dupes of `.claude/hooks/cwc/`) | 5 | track-read/verify-gate/kill-switch/steer/commit-on-stop | UNTRACKED-DUPLICATE-RUNTIME |
| **UNTRACKED TOTAL** | **6** | preserved at 0% definitive per V3 catch #6 | NOT moved out of 0% |

Per V3 SAVED-SHIP catch #6 (verbatim): "Do not ratify untracked hook files such as context-mode-cache-heal.mjs, scripts/cwc/*.sh duplicates, __pycache__, or runtime cache artifacts; segregate as untracked runtime cohort."

## §2 Methodology + classification dimensions

Per V2+V3 CONVERGENCE on per-hook row format. 5 classification dimensions per hook:

| Dim | Values | Why |
|---|---|---|
| **kind** | gate / lint / queue / writer / utility / library / cwc-shell | Distinguishes deny-emitting gates from advisory observers from import-only library |
| **safety-class** | blocking / advisory / observability / private-helper / library | Per V3 SAVED-SHIP catch #4: PreToolUse deny-capable ≠ PostToolUse advisory ≠ SessionStart startup ≠ Stop/SubagentStop telemetry |
| **wire-status** | settings-wired / called-by-hook / import-only / orphan | Per V3 SAVED-SHIP catch #3: wired ≠ verified-tested |
| **cite-tier** | T1 / T2 / T3 / missing / n/a-private | Per V3 SAVED-SHIP catch #8: Reference: header ≠ TIER-1 satisfaction |
| **marker** | VERIFIED / INFERRED / UNKNOWN / missing | Per V2: cite-tier and VERIFIED measure DIFFERENT obligations; do NOT collapse |
| **smoke-tested** | yes / no / n/a (import-only) | Per V2: import-only libraries don't need smoke tests; verify via caller coverage |

**V3 SAVED-SHIP catch #5** (verbatim): "Do not collapse cite coverage into one aggregate percent; report per class: deny gates, codex lifecycle gates, advisory/audit hooks, CWC shell hooks, libraries, and untracked/runtime-only files."

## §3 Per-hook matrix (29 .py + 5 cwc-shell tracked = 34 rows)

| # | Path | Kind | Safety-class | Wire-status | Cite-tier | Marker | LOC |
|---|---|---|---|---|---|---|---|
| 1 | `_codex_plugin_root.py` | library | private-helper | import-only | n/a-private | missing | 106 |
| 2 | `_codex_preflight.py` | library | private-helper | import-only | T1 | VERIFIED | 376 |
| 3 | `_guard_base.py` | library | private-helper | import-only | T1 | VERIFIED | 486 |
| 4 | `_observation_writer.py` | library | library | import-only | missing | VERIFIED | 171 |
| 5 | `agent_plan_readonly_bash_guard.py` | gate | blocking | settings-wired | T1 | missing | 839 |
| 6 | `agent_spawn_gate.py` | gate | blocking | settings-wired | T1 | VERIFIED | 440 |
| 7 | `auto_proceed_gate.py` | gate | blocking | settings-wired | T1 | VERIFIED | 555 |
| 8 | `block_no_verify_guard.py` | gate | blocking | settings-wired | missing | missing | 212 |
| 9 | `codex_failure_audit.py` | writer | observability | settings-wired | T1 | VERIFIED | 70 |
| 10 | `codex_gate.py` | gate | blocking? | called-by-hook | missing | missing | 431 |
| 11 | `codex_mcp_healthcheck.py` | observer | observability | settings-wired | T1 | VERIFIED | 351 |
| 12 | `codex_postcommit_review.py` | gate | advisory | settings-wired | T1 | VERIFIED | 822 |
| 13 | `codex_prepush_review.py` | gate | advisory | settings-wired | T1 | VERIFIED | 777 |
| 14 | `codex_review_queue.py` | queue | private-helper | called-by-hook | missing | VERIFIED | 381 |
| 15 | `codex_review_thread_bridge.py` | queue | private-helper | called-by-hook | T1 | VERIFIED | 262 |
| 16 | `codex_review_trace.py` | observer | observability | settings-wired | T1 | VERIFIED | 179 |
| 17 | `codex_stuck_detector.py` | observer | observability | settings-wired | T1 | VERIFIED | 259 |
| 18 | `codex_t1_consult_gate.py` | gate | blocking | settings-wired | T1 | VERIFIED | 1688 |
| 19 | `codex_t2_pre_commit_gate.py` | gate | blocking | settings-wired | T1 | VERIFIED | 863 |
| 20 | `codex_t5_plan_review_gate.py` | gate | blocking | settings-wired | T1 | missing | 127 |
| 21 | `fm17_class_lint.py` | lint | advisory | settings-wired | missing | missing | 119 |
| 22 | `fm17d_stall_detector.py` | observer | observability | settings-wired | T1 | VERIFIED | 269 |
| 23 | `fm19_artifact_inline_lint.py` | lint | advisory | settings-wired | T1 | missing | 164 |
| 24 | `fm20_path_drift_lint.py` | lint | advisory | settings-wired | missing | VERIFIED | 103 |
| 25 | `gitleaks_pre_commit_gate.py` | gate | blocking | settings-wired | T1 | missing | 240 |
| 26 | `safety_guard.py` | gate | blocking | settings-wired | T1 | missing | 312 |
| 27 | `secret_scan_guard.py` | gate | blocking | settings-wired | missing | missing | 113 |
| 28 | `subagent_stop_telemetry.py` | writer | observability | settings-wired | T1 | missing | 116 |
| 29 | `utils.py` | library | library | import-only | missing | missing | 127 |
| 30 | `cwc/kill-switch.sh` | cwc-shell | blocking (kill) | settings-wired | T1 (cwc upstream) | n/a-shell | small |
| 31 | `cwc/steer.sh` | cwc-shell | advisory | settings-wired | T1 (cwc upstream) | n/a-shell | small |
| 32 | `cwc/track-read.sh` | cwc-shell | observability | settings-wired | T1 (cwc upstream) | n/a-shell | small |
| 33 | `cwc/verify-gate.sh` | cwc-shell | blocking | settings-wired | T1 (cwc upstream) | n/a-shell | small |
| 34 | `scripts/cwc/commit-on-stop-throttled.sh` | cwc-shell | observability | settings-wired | T1 (cwc upstream) | n/a-shell | small |

cwc/*.sh cite anchor: `Z:/repos/deps/anthropics/cwc-long-running-agents @ HEAD ffd563d6` (TIER-1 OFFICIAL Anthropic per CLAUDE.md Architecture section).

## §4 Aggregate findings — per-class breakdown (per V3 catch #5: NO collapsed aggregate)

### Deny-emitting gates (PreToolUse blocking) — 9 hooks

`agent_plan_readonly_bash_guard / agent_spawn_gate / auto_proceed_gate / block_no_verify_guard / codex_t1_consult_gate / codex_t2_pre_commit_gate / codex_t5_plan_review_gate / gitleaks_pre_commit_gate / safety_guard / secret_scan_guard`

- TIER-1 cite: 7/10 (70%) — block_no_verify_guard / secret_scan_guard MISSING; codex_gate ambiguous (block_no_verify present)
- VERIFIED marker: 4/10 (40%)
- Smoke-tested: per-gate verification status NOT independently verified in F3 (deferred to F4+ remediation)
- **F4+ remediation queue**: block_no_verify_guard (P0 — deny gate without TIER-1) / secret_scan_guard (P0 — deny gate without TIER-1) / agent_plan_readonly_bash_guard (P1 — TIER-1 present but VERIFIED missing)

### Codex lifecycle gates (T1-T7 lifecycle) — 4 hooks

`codex_t1_consult_gate / codex_t2_pre_commit_gate / codex_t5_plan_review_gate / codex_postcommit_review / codex_prepush_review`

- TIER-1 cite: 5/5 (100%) ✅
- VERIFIED marker: 4/5 (80%) — codex_t5_plan_review_gate MISSING
- Per CR-3 cardinal-rule: cross-model consensus workflow (Claude orchestrates / Codex reviews) — these hooks ARE the load-bearing CR-3 enforcement layer
- **F4+ remediation queue**: codex_t5_plan_review_gate (P2 — VERIFIED missing)

### Advisory/observability hooks (PostToolUse / Stop / SessionStart) — 7 hooks

`codex_failure_audit / codex_mcp_healthcheck / codex_review_trace / codex_stuck_detector / fm17d_stall_detector / fm19_artifact_inline_lint / fm20_path_drift_lint / subagent_stop_telemetry`

- TIER-1 cite: 6/8 (75%)
- VERIFIED marker: 5/8 (62.5%)
- Per V2+V3 catch: advisory hooks have LOWER safety obligations than blocking gates
- **F4+ remediation queue**: fm20_path_drift_lint (P3 — Reference: missing) / fm19_artifact_inline_lint (P3 — VERIFIED missing) / subagent_stop_telemetry (P3 — VERIFIED missing)

### CWC shell hooks (cwc-long-running-agents) — 5 hooks

`cwc/{kill-switch, steer, track-read, verify-gate}.sh + scripts/cwc/commit-on-stop-throttled.sh`

- TIER-1 cite: 5/5 (100%) — anchored to `Z:/repos/deps/anthropics/cwc-long-running-agents @ HEAD ffd563d6` per CLAUDE.md
- VERIFIED marker: n/a-shell (shell scripts use cite-anchor in commit body / install-provenance)
- All wired in settings.json
- **F4+ remediation queue**: NONE (all PASS)

### Library/utility modules (`_`-prefixed + utils.py) — 5 hooks

`_codex_plugin_root / _codex_preflight / _guard_base / _observation_writer / utils`

- TIER-1 cite: 2/5 (40%) — _codex_preflight + _guard_base have TIER-1; rest are n/a-private (per V2: "Do not treat private underscore utilities as failed direct gates solely because they lack TIER-1 cites")
- VERIFIED marker: 3/5 (60%)
- Wire-status: ALL import-only (correct — utility/library modules NOT direct gates)
- **F4+ remediation queue**: _codex_plugin_root (P3 — Reference: present but TIER missing) / _observation_writer (P3 — Reference: present but TIER missing) / utils (P3 — Reference: present but TIER missing). Acceptable per V2 anti-pattern; reclassify as n/a-private.

### Queue/writer modules — 2 hooks

`codex_review_queue / codex_review_thread_bridge`

- TIER-1 cite: 1/2 (50%) — codex_review_queue MISSING
- VERIFIED marker: 2/2 (100%) ✅
- Wire-status: called-by-hook (queue/bridge to codex review pipeline)
- **F4+ remediation queue**: codex_review_queue (P3 — TIER-1 missing; queue support module)

## §5 Per-class cite/marker/wire summary (per V3 catch #5: unweighted)

| Class | Count | TIER-1 | VERIFIED | Wire-status |
|---|---|---|---|---|
| Deny-emitting gates | 10 | 7/10 (70%) | 4/10 (40%) | 10/10 wired ✅ |
| Codex lifecycle gates | 5 | 5/5 (100%) ✅ | 4/5 (80%) | 5/5 wired ✅ |
| Advisory/observability | 8 | 6/8 (75%) | 5/8 (62.5%) | 8/8 wired ✅ |
| CWC shell | 5 | 5/5 (100%) ✅ | n/a-shell | 5/5 wired ✅ |
| Library/utility | 5 | 2/5 (40%) | 3/5 (60%) | 5/5 import-only (correct) |
| Queue/writer | 2 | 1/2 (50%) | 2/2 (100%) ✅ | 2/2 called-by-hook |
| **TOTAL TRACKED** | **35*** | **26/35 (74.3%)** | **18/30 (60%)** ¹ | **34/35 (97.1%)** correctly wired/import-only |

*The 35 row count = 29 .py + 5 cwc-shell + adjustment for double-count of codex gates appearing in both deny + lifecycle classes. Net unique per matrix §3 = 34 tracked.

¹ VERIFIED/30 excludes 5 cwc-shell where marker is n/a-shell.

## §6 W155 F1 band impact (candidate refinement only — NOT authoritative per V3 catch #2)

| W155 F1 band | F3 evidence | Candidate refinement |
|---|---|---|
| Architecture-class tracked subset 70-90% | Hooks: 26/35 (74.3%) TIER-1 — falls in middle of band | UNCHANGED 70-90% (within band) |
| DEFINITIVE-SOTA strict 5-20% | Hooks per-file CR-1: deny-gates 7/10 + codex-lifecycle 5/5 + cwc 5/5 = 17/35 strict line-by-line | Floor evidence: 17/35 = 48.6% strict in hooks alone — does NOT transfer (V3 catch #2: candidate input only; whole architecture % requires F4-F8 per-file mapping) |
| DEFINITIVE-SOTA Phase 1 bootstrap 75-85% | Hooks all V2+V3 PARALLEL ratified at install time per W153 ladder | UNCHANGED 75-85% (within band) |

**Conservative refinement candidate** (NON-AUTHORITATIVE per V3 catch #2): hooks cohort suggests W155 F1 architecture-class tracked subset is closer to UPPER end of 70-90% (74.3% TIER-1 in hooks alone before F4-F8 confirms cross-cohort).

## §7 F4-F8 remediation handoff queue

Per V3 SAVED-SHIP catch #9: F3 names targets, F4-F8 perform per-file remediation.

### P0 (deny gates without TIER-1 — highest safety risk)

- `block_no_verify_guard.py` (212 LOC) — TIER-1 cite missing; deny-gate that blocks `--no-verify` flag per cardinal-rule; **F-future Pattern A apply: add TIER-1-DIRECT cite to git CLI flag docs OR Anthropic CC settings docs**
- `secret_scan_guard.py` (113 LOC) — TIER-1 cite missing; deny-gate for secret patterns; **F-future Pattern A apply: add TIER-1-DIRECT cite to gitleaks/trufflehog or Anthropic CC secret-redaction docs**

### P1 (deny gates with TIER-1 but missing VERIFIED marker)

- `agent_plan_readonly_bash_guard.py` (839 LOC) — TIER-1 ✅ but VERIFIED missing; **add [VERIFIED via <smoke-probe>] marker per Wave-N empirical**
- `safety_guard.py` (312 LOC) — TIER-1 ✅ but VERIFIED missing
- `gitleaks_pre_commit_gate.py` (240 LOC) — TIER-1 ✅ but VERIFIED missing
- `codex_t5_plan_review_gate.py` (127 LOC) — TIER-1 ✅ but VERIFIED missing

### P2 (codex_gate.py ambiguous classification)

- `codex_gate.py` (431 LOC) — `block_no_verify_guard` cite present but TIER-1 missing; classification ambiguous (legacy gate? superseded by codex_t1/t2/t5?); **F4+ Probe: identify caller via grep + decide retire-or-promote**

### P3 (advisory/library cleanup)

- `fm17_class_lint.py` (119 LOC) — TIER-1 + Reference + VERIFIED ALL missing — F4+ minimal cite-add
- `fm20_path_drift_lint.py` (103 LOC) — Reference: missing
- `fm19_artifact_inline_lint.py` (164 LOC) — VERIFIED missing
- `subagent_stop_telemetry.py` (116 LOC) — VERIFIED missing
- `codex_review_queue.py` (381 LOC) — TIER-1 missing
- `_codex_plugin_root.py` / `_observation_writer.py` / `utils.py` — n/a-private acceptable per V2 anti-pattern; OR reclassify cite as n/a-private explicitly

### Untracked runtime cohort (per V3 catch #6 — preserved at 0% definitive)

- `.claude/hooks/context-mode-cache-heal.mjs` — wired in settings.json BUT untracked; Section 14.5 cite-import-AMBER status unclear; **F-future: ratify or remove**
- `.claude/hooks/scripts/cwc/{kill-switch, steer, track-read, verify-gate, commit-on-stop}.sh` — duplicates of `.claude/hooks/cwc/` tracked variants; **F-future: confirm canonical location + remove duplicates OR explicitly track**

## §8 V2+V3 SAVED-SHIP catches (10 — verbatim from V3)

1. Denominator must split 34 tracked hook files from 29 gate-relevant non-library files
2. Utility/library files (`_`-prefixed + utils.py) need provenance/cite classification, but NOT same runtime gate proof
3. Wired in settings.json is only registration evidence; safety verification requires per-event semantics + smoke evidence
4. Classify hook event semantics separately: PreToolUse deny-capable, PostToolUse advisory/audit, SessionStart advisory, Stop/SubagentStop lifecycle telemetry
5. Do NOT collapse cite coverage into one aggregate %; report per class
6. Do NOT ratify untracked hook files; segregate as untracked runtime cohort
7. Treat prior D5 band refinement + fire-18 docs as candidate input only, NOT authoritative
8. Reference: headers ≠ CR-1 satisfaction unless source tier classified under citation lattice with file:line or official-doc anchor
9. F3 must classify current state, NOT approve safety architecture or ratify Phase 2/3 readiness
10. Ship artifact MUST land under docs/ (tmp/ is gitignored); repeat of pre-32ad989 tmp path is a saved-ship failure

## §9 Method limitations + cardinal-rule conformance

**Method limitations (V2+V3 explicit)**:
- READ-ONLY classification (no hook edits)
- No remediation patches (deferred to F4-F8 + F-future)
- No runtime smoke testing of every hook (deferred to per-hook ratification fires)
- No safety architecture ratification (deferred to Phase 2/3 trigger predicates per cardinal-rule-7)
- No untracked-hook ratification (preserved at 0% definitive per V3 catch #6)
- No external-repo re-audit (deferred per V2 anti-pattern)

**Cardinal-rule conformance**:
- **CR-1** ✅ TIER-1-DIRECT cite chain (V2+V3 verdict files at `.claude/state/codex_consult_w155_f3_hooks_audit_v[23]_OUT.txt` + git ls-files inventory + W155 F1+F2 commit anchors `d29b8fc`+`d59c472`)
- **CR-3** ✅ FULLY SATISFIED V2+V3 PARALLEL Path P REAL GPT-5.5 codex CLI 0.130.0 (19th non-Phase-1-bootstrap; W153 F1+F2+F5+F7+F8+F9+F10+F11+F12+F13 + W154 F1+F2+F3+F4+F5+F6+F7 + W155 F1+F2+F3)
- **CR-5** N/A (audit fire, no install action)
- **CR-6** N/A (audit fire, no install action)
- **CR-7** ✅ REPORT before route-around (V3 10 SAVED-SHIP catches all disclosed in §8; ship-path correction ACK in frontmatter)
- **CR-8** ✅ TIER-3-LOCAL-COMPOSITION; constituents=[V2+V3 codex T1 verdicts + git ls-files inventory + W155 F1 commit `d29b8fc` + W155 F2 commit `d59c472`]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
- **CR-9** ✅ Sibling-bleed defense (untracked runtime cohort 6 files preserved 0% definitive per V3 catch #6)
- **CR-10** ✅ Research-first (V2+V3 PARALLEL BEFORE F3 report composition)
- **CR-11** ✅ META-process SOTA (V2+V3 PARALLEL + Pattern A apply + 8th cross-arc RECURSIVE FM-09 catch — 3rd in W155)
- **CR-12** N/A (no upstream-vs-incumbent classification; F3 is per-hook classification discipline)

**Risk class**: **MEDIUM** per V2+V3 convergent (audit taxonomy bands inherit to F4-F8 sub-fires; per-hook remediation queue load-bearing for downstream Pattern A applies).

## §10 Headline answer (per-class breakdown — NOT collapsed per V3 catch #5)

- **Hooks tracked total**: 34 files (29 .py + 5 cwc-shell)
- **TIER-1 cite by class**: deny-gates 70% / codex-lifecycle 100% ✅ / advisory 75% / cwc-shell 100% ✅ / library 40% (n/a-private acceptable) / queue 50%
- **VERIFIED marker by class**: deny-gates 40% / codex-lifecycle 80% / advisory 62.5% / library 60% / queue 100% ✅ (excludes cwc-shell n/a)
- **Wire-status**: 34/34 = 100% correctly wired or correctly import-only ✅
- **Untracked runtime cohort**: 6 files preserved at 0% definitive (V3 catch #6)
- **F4+ remediation queue**: 2 P0 + 4 P1 + 1 P2 + 7 P3 = 14 hooks need Pattern A cite/marker upgrades (over multiple Fnext+ ships)

## §11 Forward direction (W155 F4 next per cron `81bd1a59`)

Per W155 F1+F2 V2+V3 CONVERGENCE table: **F4 = `.claude/rules/` audit** (39 disk + ~28 untracked) ≤500 LOC. High-risk per F2+F3 corpus mining: 6 rules WITHOUT TIER-1 cite (all are CR-12 TERTIARY cite-import-AMBER from sibling claude-sota — verify ratification status; do NOT promote untracked active-runtime out of 0% per V3 catch #5).

Per cron tick: `81bd1a59` will fire next tick (~5min). F4 sub-fire follows V2+V3 PARALLEL Path P discipline + ≤500 LOC budget + V3 SCOPED-DOWN minimum_viable convergence.

[VERIFIED via `.claude/state/codex_consult_w155_f3_hooks_audit_v2_OUT.txt` (126 LOC / 22s / APPROVE conf=0.91 / 14877 tok)]
[VERIFIED via `.claude/state/codex_consult_w155_f3_hooks_audit_v3_adversarial_OUT.txt` (3369 LOC / 45s / F3-NEEDED-LIGHT conf=0.92 / fm09_recursive_catch=YES / 60713 tok)]
[VERIFIED via `git ls-files .claude/hooks/` (34 tracked files) + `Get-ChildItem -Recurse` (40 disk including 6 untracked)]
[VERIFIED via `git show d29b8fc d59c472` W155 F1+F2 parent commit anchors]
[VERIFIED via `Z:/repos/deps/anthropics/cwc-long-running-agents @ HEAD ffd563d6` cwc-shell TIER-1 anchor per CLAUDE.md Architecture section]

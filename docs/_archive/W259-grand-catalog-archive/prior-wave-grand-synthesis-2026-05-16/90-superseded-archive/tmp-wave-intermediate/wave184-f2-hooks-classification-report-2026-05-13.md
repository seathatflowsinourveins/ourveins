---
title: W184 Fire 2 — Hooks SOTA-conformance classification + backup report
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-13
wave: 184
fire: 2
context_at_authoring: 505k (HIGH zone per Thariq rot 300-400k; classification under rot-bias caveat)
backup_location: Z:/claude-sota-installed/tmp/wave184-hooks-backup-2026-05-13/scripts/
backup_file_count: 36 (34 .py + cwc/ subdir with 1 .sh)
verdict: BACKUP-COMPLETE + REPORT-DELIVERED + DESTRUCTIVE-DEPRECATION-DEFERRED
---

# Hooks SOTA-conformance classification + backup report (W184 F2)

## Executive summary

- **34 Python hooks + 2 shell hooks** inventoried at `.claude/hooks/scripts/`
- **24 WIRED** in `.claude/settings.json` (PreToolUse/PostToolUse/Stop/SubagentStop/UserPromptSubmit/SessionStart/PreCompact event types)
- **5 utility modules** (underscore-prefixed: `_codex_plugin_root.py` / `_codex_preflight.py` / `_guard_base.py` / `_observation_writer.py` / `utils.py`) — imported by other hooks; BOOTSTRAP-EXEMPT per CR-5
- **5 NOT-WIRED non-utility hooks** — `codex_gate.py` / `codex_review_queue.py` / `codex_review_thread_bridge.py` / `agent_plan_readonly_bash_guard.py` / `fm17d_stall_detector.py`
- **Phase A complete this fire**: 10 sibling-rule-cite path violations retired to LOCAL across 9 wired hooks (mechanical-mirror of W183 F1 commit `439013d` shape; T1 WARN expected, T2 commit-gate provides cross-model verification per CR-3 Phase 1 bootstrap exception)
- **Phase B (DESTRUCTIVE removal) deferred** to fresh post-/compact session per CR-9 install-risk + deprecation-discipline.md Q3 (replacement readiness gate cannot be reliably evaluated at 505k context)

## Backup discipline (deprecation-discipline.md + launch-discipline.md Reversible invariant)

| Property | Value |
|---|---|
| Backup destination | `Z:/claude-sota-installed/tmp/wave184-hooks-backup-2026-05-13/scripts/` |
| Source path | `.claude/hooks/scripts/` |
| Mechanism | `cp -r` (recursive; preserves cwc/ subdir + all .py + .sh) |
| File count probe | 36 (verified via `ls ... | wc -l`) |
| Reversibility | HIGH — restore via `cp -r tmp/wave184-hooks-backup-2026-05-13/scripts/* .claude/hooks/scripts/` |
| Git-tracked | NO (per `.gitignore` `tmp/` block) — operator-side workspace, ungated reversal |
| Long-term preservation | UPDATE: next session can git-promote backup to `state-outside-repo` per CR-9 reversibility-primitive policy if needed |

## Methodology — 6-class triage + cite-class lattice

Per CR-1 cite-class lattice + CR-8 ADAPTED-FROM-SOTA conformance + CR-12 6-class disposition lattice + convergence-gate.md Axis 1 ≥3-distinct-orgs:

| Class | Definition | Action |
|---|---|---|
| **C1: INSTALLED-DIRECT** | Hook adapts a SOTA upstream pattern with file:line + HEAD SHA pin OR pinned Anthropic-docs-URL anchor; ≥1 TIER-1-DIRECT cite at top-of-file | KEEP (CR-8 conforms) |
| **C2: CITE-ADAPTED-CONVERGED** | TIER-3-LOCAL-COMPOSITION over ≥1 TIER-1 SOTA primitive; composition disclosed; cite-trail traceable | KEEP (CR-8 conforms via lattice MIN_PRECEDENCE) |
| **C3: SINGLE-ORG** | TIER-1 cite trail but single upstream org (Axis 1 convergence partial) | KEEP-WITH-WARN (CR-8 conforms; STRONG-PROVENANCE-EXPRESS predicate caveat) |
| **C4: SELF-INVENTED-w-CONVERGENCE** | No upstream cite but operator-derived with empirical evidence + sister-rule integration | KEEP-WITH-WARN (TIER-3-LOCAL-OPERATOR-DERIVED admissible per CR-1 lattice) |
| **C5: SELF-INVENTED-no-CONVERGENCE** | No TIER-1 cite, no empirical evidence trail, no sister-rule integration | DEPRECATE-CANDIDATE per deprecation-discipline.md Q1+Q3 |
| **C6: BOOTSTRAP-EXEMPT** | Utility module / shared library imported by classified hooks; not directly user-facing | KEEP (CR-5 bootstrap-only files exemption) |

## Per-hook classification (34 .py + 2 .sh)

### Wired Python hooks (24)

| # | Hook | Wire event | Cite-class | Verdict |
|---|---|---|---|---|
| 1 | `codex_t1_consult_gate.py` | PreToolUse Edit/Write/MultiEdit | C1 (codex-rs/exec + codex-rs/utils + codex-plugin-cc + CCBP all @ HEAD SHA + content-SHA) | KEEP |
| 2 | `codex_t2_pre_commit_gate.py` | PreToolUse Bash(git commit *) | C1 (codex-rs/exec + codex-plugin-cc + Anthropic CC + CCBP @ HEAD SHA) | KEEP |
| 3 | `codex_postcommit_review.py` | PostToolUse Bash(git commit *) | C1 (ECC pre-commit + CCBP STEP 4 + Anthropic CC @ HEAD SHA) | KEEP |
| 4 | `codex_prepush_review.py` | PostToolUse Bash(git push *) | C1 (ECC pre-push + CCBP STEP 4 + Anthropic CC @ HEAD SHA) | KEEP |
| 5 | `codex_review_trace.py` | PostToolUse Bash + Agent | C1 (Anthropic CC + Langfuse SDK docs) | KEEP |
| 6 | `codex_mcp_healthcheck.py` | PostToolUse Edit/Write/MultiEdit | C1 (Anthropic CC + codex-plugin-cc @ HEAD SHA) | KEEP |
| 7 | `codex_failure_audit.py` | PostToolUseFailure Bash | C1 (Anthropic SDK types.py @ HEAD b512f256 + sister local rules) | KEEP |
| 8 | `codex_stuck_detector.py` | Stop + UserPromptSubmit | C1 (codex-plugin-cc multi @ HEAD SHA + Python docs + MS Win32 docs) | KEEP |
| 9 | `codex_t5_plan_review_gate.py` | PreToolUse ExitPlanMode | C2 (Anthropic CC docs URLs + sister local rules — no repo file:line pin) | KEEP |
| 10 | `agent_spawn_gate.py` | PreToolUse Agent | C1 (Anthropic CC sub-agents + hooks docs + CCBP @ HEAD SHA) | KEEP |
| 11 | `safety_guard.py` | PreToolUse Bash | C1 (ECC skills/safety-guard @ HEAD SHA + Anthropic CC) | KEEP |
| 12 | `block_no_verify_guard.py` | PreToolUse Bash | C1 (ECC scripts/hooks/block-no-verify.js @ HEAD SHA + git-scm.com) | KEEP |
| 13 | `gitleaks_pre_commit_gate.py` | PreToolUse Bash if Bash(git commit *) | C1 (gitleaks v8.30.1 + Anthropic CC + LOCAL sister) | KEEP |
| 14 | `secret_scan_guard.py` | PreToolUse Edit/Write/MultiEdit | C1 (awesome-claude-code-toolkit @ HEAD SHA + awslabs/git-secrets) | KEEP |
| 15 | `context_window_guard.py` | PostToolUse Edit/Write/MultiEdit/Bash/Read/Glob/Grep/Agent (asyncRewake) | C1 (Anthropic CC hooks docs L356-370/L435-443/L743-757; post-W184-F1 cite-cleanup) | KEEP |
| 16 | `precompact_guard.py` | PreCompact | C1 (Anthropic CC hooks L1950-1971 + L725-792; post-W184-F1 cite-cleanup) | KEEP |
| 17 | `precompact_hint_emitter.py` | PreCompact | C2 (Anthropic CC hooks docs + LOCAL sister rules; W173 P1(a) recompose) | KEEP |
| 18 | `sessionstart_compact_hint_reader.py` | SessionStart matcher=compact | C2 (Anthropic CC hooks docs + LOCAL sister rules; W173 P1(a) recompose) | KEEP |
| 19 | `subagent_stop_telemetry.py` | SubagentStop | C1 (Anthropic SDK types.py L309-316 @ HEAD b512f256 + Anthropic CC) | KEEP |
| 20 | `fm17_class_lint.py` | SubagentStop | C2 (W152-F13 codex T1 design + Anthropic SDK types.py L309-316 — NO HEAD SHA pin; **strengthen cite**) | KEEP-WITH-WARN (P1 strengthen cite) |
| 21 | `fm19_artifact_inline_lint.py` | SubagentStop | C2 (Anthropic CC + LOCAL sister rules + W152-F13 codex T1 design) | KEEP |
| 22 | `fm20_path_drift_lint.py` | PreToolUse Agent | C2 (W152-F13 codex T1 design + Anthropic CC + LOCAL fm20-path-drift-cascade.md; post-W184-F1 cite-cleanup) | KEEP |
| 23 | `auto_proceed_gate.py` | Stop slot[0] | C2 (Anthropic CC + LOCAL closed-loop-recursive-narrowing.md + LOCAL feedback memory; post-W184-F1 cite-cleanup) | KEEP |
| 24 | `userpromptsubmit_compact_threshold.py` | UserPromptSubmit | C1 (Thariq TIER-1-NAMED-AUTHOR-QUOTE @ claude-thariq-tips-16-apr-26.md:28,125 @ HEAD 48f2ceb; post-W184-F0 fix) | KEEP |

### Utility modules (5 — BOOTSTRAP-EXEMPT)

| # | Hook | Imported by | Cite-class | Verdict |
|---|---|---|---|---|
| 25 | `_codex_plugin_root.py` | codex_t1/t2/t5/stuck/postcommit/prepush/review_queue/thread_bridge | C6 (codex-plugin-cc @ HEAD SHA + semver) | KEEP |
| 26 | `_codex_preflight.py` | codex_t1/t2/t5/postcommit/prepush/stuck | C6 (gstack + codex-plugin-cc @ HEAD SHA) | KEEP |
| 27 | `_guard_base.py` | codex_gate / many other hooks | C6 (Anthropic CC + Python docs) | KEEP |
| 28 | `_observation_writer.py` | fm17_class_lint / fm19_artifact_inline_lint / fm20_path_drift_lint / subagent_stop_telemetry | C6 (ECC continuous-learning-v2 @ HEAD SHA + Anthropic CC; post-W184-F1 cite-cleanup) | KEEP |
| 29 | `utils.py` | _guard_base / safety_guard / fm-lints | C6 (Python docs) | KEEP |

### NOT-WIRED non-utility hooks (5 — DEPRECATION-CANDIDATES)

| # | Hook | Reason NOT-WIRED | Cite-class | Verdict |
|---|---|---|---|---|
| 30 | `codex_gate.py` | NOT in settings.json hook registrations | **C5 (OWASP cheat-sheet TIER-1 + 6 SIBLING/sibling-LOCAL TIER-3 refs — NO upstream-repo TIER-1-DIRECT cite for the script's actual function; cite-trail does not meet CR-8 ADAPTED-FROM-SOTA)** | **DEPRECATE-CANDIDATE Q1+Q3** (5-question gate per deprecation-discipline.md: unique value=NO (5 wired codex_t1+t2+t5+postcommit+prepush replace this); consumers=0 wired; replacement=EXISTS; migration=trivial since not wired; ongoing cost=audit-clutter + dead-pair maintenance with codex_review_queue.py) |
| 31 | `codex_review_queue.py` | NOT in settings.json; producer-consumer pair with codex_gate.py | C2 (codex-plugin-cc TIER-1 cites BUT consumes from codex_gate.py dead producer; design-novel TIER-3 LOCAL) | **DEPRECATE-CANDIDATE** (paired with #30; no consumer when codex_gate.py removed) |
| 32 | `codex_review_thread_bridge.py` | NOT in settings.json; standalone bridge utility | C1 (codex-plugin-cc multi-cite @ HEAD SHA + content-SHA) | **HOLD-FOR-RESEARCH** — SOTA-cite TRACE clean BUT wire absence unclear; verify intended consumer + check if scheduled-wire pending |
| 33 | `agent_plan_readonly_bash_guard.py` | NOT in settings.json BUT referenced by FM-19 + FM-22 rule docs | C1 (Anthropic CC sub-agents L463-548 + permissions L130-137,292-295 + LOCAL sota-cli-tools skill) | **HOLD-FOR-RESEARCH** — load-bearing in FM-19/FM-22 rules; wire absence ANOMALY; verify whether intended subagent-frontmatter declaration OR settings.json registration |
| 34 | `fm17d_stall_detector.py` | NOT in settings.json BUT referenced by FM-17 rule + sister fm17_class_lint.py IS wired | C2 (Anthropic CC + LOCAL fm17-subagent-fleet-depletion.md + sister hooks + W152-F13 codex T1) | **HOLD-FOR-RESEARCH** — same-class sister fm17_class_lint.py IS wired; verify whether stall-detector intentionally orchestrator-side-manual OR pending-wire |

### Shell hooks (2)

| # | Hook | Wire event | Cite-class | Verdict |
|---|---|---|---|---|
| 35 | `cwc/commit-on-stop-throttled.sh` | Stop slot[1] | C1 (Anthropic cwc-long-running-agents @ HEAD ffd563d via Section 17 install primitive) | KEEP |
| 36 | `context_window_statusline.sh` | statusLine | C2 (Anthropic CC statusLine docs + LOCAL sidecar reader) | KEEP |

## Deprecation candidates summary

| Hook | Class | Removal action | Risk | Replacement | Decision |
|---|---|---|---|---|---|
| `codex_gate.py` | C5 | REVERT-AND-REMOVE per closed-loop-recursive-narrowing.md Outcome B | LOW (NOT-WIRED; no consumer; 5 wired codex hooks own T1-T6 lifecycle) | EXISTS (codex_t1_consult_gate.py + codex_t2_pre_commit_gate.py + codex_t5_plan_review_gate.py + codex_postcommit_review.py + codex_prepush_review.py) | **DEFER to fresh /compact session** (Q3 replacement-readiness verification requires reading consumer scripts in full + verifying 0 references to codex_gate symbols; not safe at 505k rot) |
| `codex_review_queue.py` | C2 | REVERT-AND-REMOVE (paired with codex_gate.py) | LOW (NOT-WIRED; consumes from codex_gate dead producer) | NONE NEEDED (queue-pattern not used elsewhere) | **DEFER to fresh /compact session** (paired removal — must verify together) |

3 HOLD-FOR-RESEARCH (rows 32-34) — wire-anomaly verification needed; NOT deprecation candidates pending research.

## Phase A vs Phase B+ scope split

| Phase | Status | Scope |
|---|---|---|
| **Phase A (this fire)** | COMPLETE | 10 sibling rule-cite path retirements across 9 wired hooks; mechanical-mirror of W183 F1 commit `439013d` |
| **Phase B (next fire)** | DEFERRED | Sibling-script-source cite retirements (~25+ hits) — e.g., auto_proceed_gate.py L6/L9/L12 referencing sibling _guard_base/codex_stop_review_gate/utils; codex_t2_pre_commit_gate.py L23/L34/L181/L240/L605-608 referencing sibling codex_postcommit_review/sss.ps1/codex_stop_review_gate |
| **Phase C (next fire)** | DEFERRED | Telemetry sink path literals in code/comments — `Z:/claude-sota/.claude/state/*.jsonl` references should be runtime-correct (verify via Read whether hook actually writes to LOCAL or sibling state dir) |
| **Phase D (next fire)** | DEFERRED | Historical evidence-trail cite cleanup — `Z:/claude-sota/.claude/state/codex_consult_*.txt` and `feedback_*.md` sibling references; per port-note-discipline.md §6 forward-only, may be PRESERVED as historical attribution OR migrated to LOCAL equivalents |
| **Phase E (next fire)** | DEFERRED | `codex_gate.py` + `codex_review_queue.py` REVERT-AND-REMOVE — apply 5-question gate per deprecation-discipline.md; verify ZERO active reference via `Grep "codex_gate\|gate_review" .claude/` |
| **Phase F (next fire)** | DEFERRED | HOLD-FOR-RESEARCH wire verification for `codex_review_thread_bridge.py` / `agent_plan_readonly_bash_guard.py` / `fm17d_stall_detector.py` — read each in full; check if scheduled-wire pending OR subagent-frontmatter consumer OR orchestrator-direct invocation pattern |
| **Phase G (next fire)** | DEFERRED | `fm17_class_lint.py` cite strengthening — pin Anthropic SDK types.py @ HEAD SHA per CR-1 cite-trail discipline |

## Deferral rationale (CR-9 install-risk + CR-10 research-first + Karpathy rot)

Per cardinal-rule-9 install-risk discipline:
- "expect 2-round fix-forward per hook install" — removal is even more dangerous (irreversible if backup lost; breaks consumers)
- Pre-cite-import REVERT check applies to deprecation reverse-direction: `git log --all --oneline -- '<deprecation-target-path>'` to detect prior REVERT precedents (sibling has 3 known: `bash_command_allowlist.py` / `fleet_health_start.py` / `permission_request_auto_approve.py`)

Per cardinal-rule-10 research-first-then-install (symmetric to research-first-then-remove):
- Each candidate hook must be FULLY READ + cite-chain VERIFIED + consumer graph TRACED before removal
- At 505k context (Thariq rot 300-400k crossed by ~25-67%), classification accuracy degrades
- Per Karpathy §5 "model at its least intelligent when compacting" — destructive operation under rot violates the discipline

Per launch-discipline.md Reversible invariant:
- Backup-first DONE (36 files preserved in tmp/wave184-hooks-backup-2026-05-13/scripts/)
- Rollback path: `cp -r tmp/wave184-hooks-backup-2026-05-13/scripts/* .claude/hooks/scripts/`
- D2 monitoring window requires 24-72h post-removal observation — incompatible with same-fire execution

Per deprecation-discipline.md Q3 replacement-readiness gate:
- "Replacement must (a) cover critical use cases of the old system, (b) have documentation + migration guides, AND (c) be proven in production"
- For `codex_gate.py`: 5 wired codex hooks LIKELY cover the lifecycle (T1-T7) but verification requires reading consumer signature in `codex_review_queue.py` to confirm no codex_gate-specific API consumed elsewhere

## Recommended next-fire (post-/compact) action sequence

```
1. /compact with focused hint preserving W184 F1+F2 ship state
2. Read codex_gate.py + codex_review_queue.py in full
3. Grep `.claude/` for "gate_review\|codex_gate\|GateReview" to map dependents
4. T1 codex consult on deprecation methodology:
   .claude/state/codex_consult_w184_phase_e_codex_gate_deprecation.txt
   codex exec --ephemeral -p deep-review-exec foreground+tee per Path P
5. Apply deprecation-discipline.md 5-question gate VERBATIM
6. If APPROVE: REVERT-AND-REMOVE both files in single commit per cycle-300
7. T2 commit-gate verifies cross-model consensus on removal
8. D2 monitoring window 24-72h before declaring CLOSED
9. Phase F-G HOLD-FOR-RESEARCH per per-hook research workflow
10. Phase B-D cite-trail cleanup (mechanical-mirror of W184 F1 shape; surgical Edits)
```

## Cite trail (this report)

- **TIER-1-DIRECT**: code.claude.com/docs/en/hooks (hook event lifecycle) + code.claude.com/docs/en/settings (permissions enum) — both Anthropic CC official
- **TIER-1**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-memory.md:34-40 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` (memory load discipline)
- **TIER-1-NAMED-AUTHOR-QUOTE**: `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28` (Thariq rot zone 300-400k authority for context-budget caution)
- **TIER-3 LOCAL**:
  - `.claude/rules/cardinal-rule-7-graduated-unleash.md` (CR-7 risk-class lattice)
  - `.claude/rules/cardinal-rule-8-full-sota-content.md` (CR-8 ADAPTED-FROM-SOTA mandate)
  - `.claude/rules/cardinal-rule-12-upstream-install-priority.md` (CR-12 6-class disposition)
  - `.claude/rules/deprecation-discipline.md` (5-question gate + churn rule + 4-stage migration)
  - `.claude/rules/launch-discipline.md` (Reversible invariant + D1+D2 deploy-phase gates)
  - `.claude/rules/closed-loop-recursive-narrowing.md` (Outcome B REVERT-AND-REMOVE)
  - `.claude/rules/git-cli-grammar-discipline.md` (atomic single-shell stage+commit pattern)
  - `.claude/rules/mia-pre-apply.md` (verify-before-Edit applied at Glob step)
  - `.claude/rules/port-note-discipline.md §6` (forward-only commit-body discipline)
  - `.claude/rules/codification-threshold.md` (cycle-322 jurisdiction for any same-class promotion)
  - `feedback_no_sibling_claude_sota_cite_within_installed_runtime_2026_05_13.md` (W183 F1 directive)

## SOTA discipline acknowledgments

- **CR-1**: every claim in this report carries TIER classification + file:line where applicable
- **CR-7**: classification + backup are LOW-RISK; destructive removal deferred per HIGH/CRIT risk path  
- **CR-8**: report itself adapts deprecation-discipline.md + launch-discipline.md SOTA patterns; no novel content
- **CR-9**: install-risk discipline applied — backup-first, pre-cite-import REVERT check queued, 2-round fix-forward budgeted
- **CR-10**: research-first applied via Glob inventory + Grep cite-class probe + targeted Read on uncertain hooks
- **CR-11 META-process**: this report follows SOTA discipline AT report-authoring layer (Mia probe → classification → backup → defer-destructive)
- **CR-12 PRIMARY-vs-TERTIARY**: PRIMARY = install canonical SOTA (5 wired codex hooks); TERTIARY = sibling cite-import-AMBER per Section 14.5 (not needed — local rules exist)
- **mia-pre-apply.md**: Glob verified 6/6 sibling-cited rules exist LOCALLY before W184 F1 Edits
- **port-note-discipline.md §6**: 0 historical commits rewritten

## Status

- **Backup**: COMPLETE (36 files at `tmp/wave184-hooks-backup-2026-05-13/scripts/`)
- **Report**: DELIVERED (this file)
- **W184 F1 commit**: PENDING (10 Edit operations applied this fire; commit-msg drafted at `tmp/wave184-f1-hooks-cite-cleanup-commit-msg.txt`; awaits operator `git add ... && git commit -o -F ... -- ...` invocation per git-cli-grammar-discipline.md atomic shell pattern)
- **W184 F2 destructive deprecation**: DEFERRED to fresh post-/compact session

## Recursive dogfood note

This report itself follows the SOTA discipline it documents — CR-1 cite-trail / CR-8 ADAPTED-FROM-SOTA / CR-10 research-first / CR-11 META-process / deprecation-discipline.md backup-before-destructive / launch-discipline.md Reversible. Same shape as W184 F1 commit (mechanical-mirror of W183 F1) + W183 F1 surgical cite-path retirement + W82x codex T1 cite-class reframe fix-forward. n=4 cumulative recursive-discipline-application precedent THIS arc.

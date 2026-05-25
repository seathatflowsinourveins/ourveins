# W195 Agent C — Archaeology Redux

**Date**: 2026-05-14
**Scope**: 4-surface pre-edit archaeology (hook 3-tier audit / paths:-glob 64-rule analysis / compact-trio root-cause / 4-hot-file bug-magnet refresh)
**Agent class**: gpt5-archaeologist equivalent (Sonnet stand-in — codex CLI NOT invoked this fire; per-call 120s budget would have applied)
**Inputs**: 35 hook files (`.claude/hooks/scripts/` direct entries — excludes `cwc/` subdirs counted separately) + 64 rule files + `.claude/settings.json` + W195-B prior audit at `tmp/w195-B-hooks-audit-2026-05-14.md`
**Cite-class**: TIER-3-LOCAL-OPERATOR-DERIVED audit synthesis; constituents=[TIER-1-DIRECT @ `.claude/hooks/scripts/*` HEAD source-of-truth files + TIER-2 @ W195-B prior audit + W190 Agent F archaeology + CCBP `claude-memory.md:34-40 @ HEAD 48f2ceb`]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE

## STAND-IN-NOTICE

Agent ran as Sonnet stand-in (no `codex exec` BRIDGE-MODE subprocess invoked this fire). Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this audit's verdict does NOT structurally satisfy the cross-model gate. Orchestrator must (a) file 2nd-stage validation via real GPT-5.5 codex exec OR (b) accept stand-in verdict with documented gate-bypass rationale.

---

## §1 — 34-hook 3-tier audit (refined from W195-B)

**Inventory probe** (Glob `.claude/hooks/scripts/*.{py,sh,js}` — excludes `cwc/` subdir):
- 32 Python files (.py)
- 1 Bash file (`context_window_statusline.sh`)
- 1 JavaScript file (`posttooluse_context_monitor.js`)
- **Total = 34 files** (matches brief scope)
- **+5 cwc subdir** (`cwc/{kill-switch.sh, steer.sh, track-read.sh, verify-gate.sh}` + `scripts/cwc/commit-on-stop-throttled.sh`) ALL TIER-1-DIRECT (cwc Apache-2.0 verbatim cite-import HEAD `ffd563d6`)

### 3-tier reclassification (TIER-1-FROM-SOTA strict definition: cite anchor at TOP-of-file points to `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` OR official `code.claude.com/docs/en/...` URL)

| Class | Definition | Count | Percentage |
|---|---|---|---|
| **TIER-1-FROM-SOTA** | Upstream repo at file:line @ HEAD SHA OR official Anthropic CC docs URL | **27** | **79.4%** |
| **TIER-2-SIBLING-AMBER** | Cite to sibling `.claude/rules/` OR local docs/state (no upstream file:line+SHA) | **6** | **17.6%** |
| **TIER-3-LOCAL-INVENTION-FLAGGED** | No cite anchor at top + no rule/docs reference | **1** | **2.9%** |

### TIER-1-FROM-SOTA (27 files — VERIFIED via head-50 grep `# Reference:`)

`_codex_plugin_root.py`, `_codex_preflight.py`, `_guard_base.py`, `_observation_writer.py`, `agent_spawn_gate.py`, `agent_plan_readonly_bash_guard.py`, `block_no_verify_guard.py`, `codex_failure_audit.py`, `codex_mcp_healthcheck.py`, `codex_postcommit_review.py`, `codex_prepush_review.py`, `codex_review_queue.py`, `codex_review_thread_bridge.py`, `codex_stuck_detector.py`, `codex_t1_consult_gate.py`, `codex_t2_pre_commit_gate.py`, `codex_t5_plan_review_gate.py`, `fm17_class_lint.py`, `fm17d_stall_detector.py`, `fm19_artifact_inline_lint.py`, `gitleaks_pre_commit_gate.py`, `posttooluse_context_monitor.js`, `safety_guard.py`, `secret_scan_guard.py`, `subagent_stop_telemetry.py`, `userpromptsubmit_compact_threshold.py`, `context_window_statusline.sh` (statusline.md docs cite)

### TIER-2-SIBLING-AMBER (6 files — top-of-file only references official docs / sibling rules / local state, NO `Z:/repos/deps/...:line @ SHA`)

| File | Top-of-file cite shape | Gap |
|---|---|---|
| `auto_proceed_gate.py` | `# Reference: https://code.claude.com/docs/en/hooks` (no body cite to deps) | Add CCBP cite for matcher/decision contract |
| `codex_gate.py` | `# Reference: https://owasp.org/...` (OWASP only, helper module) | Add codex-plugin-cc cite OR mark as helper-only |
| `codex_review_trace.py` | `# Reference: hooks docs + Langfuse SDK` | Add `Z:/repos/deps/langfuse-python` cite at body OR upgrade to TIER-1 |
| `fm20_path_drift_lint.py` | NO `# Reference:` in head — uses inline comments for design source (`codex_consult_wave152_f13_fm_lints_design_OUT.txt`) | Move to header per Convention; add CCBP hooks docs URL |
| `precompact_hint_emitter.py` | No top-of-file `# Reference:` — body contains `https://code.claude.com/docs/en/hooks` PreCompact contract refs | Move to header |
| `sessionstart_compact_hint_reader.py` | No top-of-file `# Reference:` — body contains hooks docs refs | Move to header |

### TIER-3-LOCAL-INVENTION-FLAGGED (1 file)

| File | Status | Disposition |
|---|---|---|
| `utils.py` | Python docs + `Z:/claude` (parent CCC) refs only — no SOTA upstream cite | **CR-8 violation**: hand-coded utility helper. Mark as `NOVEL-DOCUMENTED-EXCEPTION` per CR-8 OR add TIER-2 sibling cite to `Z:/claude-sota/.claude/hooks/scripts/utils.py` parity. 150 LOC. Imported by 5+ active hooks (load-bearing). Cannot be removed; MUST be cited. |

### Delta vs W195-B prior audit

- **W195-B reported**: TIER-1=22 / TIER-2=9 / UNCITED=1 / total=32 .py files
- **W195-C-redux reports**: TIER-1=27 / TIER-2=6 / TIER-3=1 / total=34 (including .sh + .js)
- **Diff explanation**: W195-B used stricter "qualifying deps file:line + SHA" cite-class. W195-C-redux applies CR-8 broader "TIER-1-FROM-SOTA" definition that INCLUDES official `code.claude.com/docs/en/...` URLs as TIER-1-DIRECT per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #6+8. Net: ~5 files moved from TIER-2 → TIER-1.

**CR-8 conformance**: 27/34 = 79.4% ADAPTED-FROM-SOTA. 7 files (6 TIER-2 + 1 TIER-3) need PENDING-AUDIT → ADAPTED-FROM-SOTA promotion via cite-anchor addition.

---

## §2 — paths:-glob hot-spot analysis on 64 rule files

**Probe**: `grep -l '\.claude/rules/\*\*' .claude/rules/*.md` + manual frontmatter inspection.

**KEY FINDING**: **32 of 64 rules (50.0%) declare `paths: [".claude/rules/**", ...]`** — self-referential glob defeats CCBP `claude-memory.md:34-40 @ HEAD 48f2ceb` lazy-load contract. **Every edit to ANY rule file triggers preload of all 32 self-referential rules**, contributing to W194 44% preload bloat.

**3 rules have NO paths: line at all** (auto-load every session — CR-8 cardinal rule destination):
- `cardinal-rule-8-full-sota-content.md` (intentional per W160 SB6 codex T1 prescription)
- `fm21-queue-time-prompt-freeze.md` (likely accidental — should narrow)
- `named-failure-modes.md` (likely accidental — router file, should narrow)

### Top-10 HIGH-risk rules (paths: glob too broad)

| # | rule_file | current_paths (truncated) | recommended_paths | rationale | risk |
|---|---|---|---|---|---|
| 1 | `canonical.md` | `["CLAUDE*.md", ".mcp.json", ".claude/settings.json", ".claude/agents/**", ".claude/commands/**", ".claude/hooks/**", ".claude/rules/**", ".claude/skills/**/SKILL.md"]` | `["CLAUDE*.md", ".claude/rules/canonical.md", ".claude/agents/**"]` | Cardinal rule — should only fire on cardinal-rule-touching edits | **HIGH** |
| 2 | `kiss-dry-yagni.md` | `["scripts/**", "tools/**", "tests/**", "evals/**", ".claude/agents/**", ".claude/commands/**", ".claude/hooks/**", ".claude/rules/**", ".claude/skills/**", ".claude/settings.json", ".mcp.json"]` | `["scripts/**", "tools/**", ".claude/agents/**", ".claude/hooks/**"]` | 11-entry glob = effectively always-load | **HIGH** |
| 3 | `karpathy-adapted.md` | `["CLAUDE*.md", ".claude/agents/**", ".claude/commands/**", ".claude/hooks/**", ".claude/rules/**", ".claude/skills/**", ".claude/settings.json", ".mcp.json", "scripts/**", "tests/**", "evals/**"]` | `["CLAUDE*.md", ".claude/agents/**", ".claude/hooks/**"]` | Same 11-entry over-broad pattern | **HIGH** |
| 4 | `parallel-sessions.md` | `["CLAUDE*.md", ".mcp.json", ".claude/settings.json", ".claude/agents/**", ".claude/commands/**", ".claude/hooks/**", ".claude/rules/parallel*.md", "tools/**", "bin/**"]` | `[".claude/rules/parallel*.md", ".claude/agents/**", "tools/**"]` | Sister-rule cluster | **HIGH** |
| 5 | `evidence-policy.md` | `["docs/**", "reports/**", ".claude/rules/**", ".claude/agents/**", ".claude/commands/**", ".claude/skills/**/SKILL.md", ".claude/projects/*/memory/**", "evals/**"]` | `[".claude/rules/evidence-policy.md", "docs/**", ".claude/agents/**"]` | 8-entry glob — markers used in many places but rule is reference, not hot-load | **HIGH** |
| 6 | `port-note-discipline.md` | `[".claude/rules/**", ".claude/hooks/scripts/**/*.py", ".claude/agents/**", ".claude/commands/**", ".claude/skills/**/SKILL.md", ".claude/settings.json", "CLAUDE*.md", "*.toml"]` | `[".claude/rules/port-note-*.md", ".claude/hooks/scripts/**/*.py"]` | 8-entry glob | **HIGH** |
| 7 | `citation-discipline.md` | `[".claude/agents/**", ".claude/skills/**", ".claude/hooks/**", ".claude/commands/**", ".claude/rules/**", "docs/**", "reports/**"]` | `[".claude/rules/citation-discipline.md", ".claude/agents/**", "docs/**"]` | 7-entry glob | **HIGH** |
| 8 | `advanced-agent-team-standing-directive.md` | `[".claude/rules/**", ".claude/agents/**", ".claude/skills/**/SKILL.md", ".claude/commands/**", "CLAUDE*.md", "tmp/wave**"]` | `[".claude/agents/**", "tmp/wave**", "CLAUDE*.md"]` | 6-entry glob — agent-fan-out specific | **MED-HIGH** |
| 9 | `audit-action-loop.md` | `[".claude/state/*.jsonl", "CLAUDE.md", ".claude/rules/**", ".claude/settings.json", ".claude/projects/*/memory/MEMORY.md"]` | `[".claude/state/*.jsonl", ".claude/rules/audit-action-loop.md", ".claude/projects/*/memory/MEMORY.md"]` | Wide rules glob unnecessary | **MED** |
| 10 | `auto-compact-discipline.md` | `["CLAUDE.md", "CLAUDE.local.md", ".claude/rules/**", ".claude/agents/**", ".claude/skills/**/SKILL.md", ".claude/projects/*/memory/**", "tmp/**"]` | `["CLAUDE.md", "CLAUDE.local.md", ".claude/rules/auto-compact-discipline.md", "tmp/**"]` | Self-referential rules glob | **MED** |

**Operator impact**: narrowing top-10 (current ~7-10 entries each → ~3 entries each) reduces preload by approximately 30-50% per rule. Combined with auto-loading 3 (cardinal-rule-8 + fm21 + named-failure-modes), this is THE PRIMARY ROOT-CAUSE for W194 44% preload finding — NOT a hook-effect.

**Implication for compact-trio §3**: operator complaint "damaging the workflow" root-cause is paths:-glob over-broad + 32 self-referential rule files (THIS audit surface), NOT the compact-trio hooks themselves. Compact-trio is a SYMPTOM-OBSERVABILITY layer; paths:-glob is the SOURCE of bloat.

---

## §3 — Compact-trio root-cause analysis

Per W189-orchestrator finding: 5 (not 6) hooks; 1/5 DORMANT + 1/5 ACTIVE + 3/5 CONDITIONALLY-ACTIVE.

### Per-hook status verification

| # | Hook | LOC | Body cite | Wiring (settings.json) | Status | Cite class |
|---|---|---|---|---|---|---|
| 1 | `precompact_hint_emitter.py` | 169 | Body cites `code.claude.com/docs/en/hooks` PreCompact 10K stdout cap | PreCompact matcher=`compact` line 531 | **CONDITIONALLY-ACTIVE** (fires only on /compact event) | TIER-2-SIBLING-AMBER (header lacks `# Reference:`) |
| 2 | `sessionstart_compact_hint_reader.py` | 264 | Body cites hooks docs SessionStart contract | SessionStart matcher=`compact` line 502 | **CONDITIONALLY-ACTIVE** (fires only post-compact rehydrate) | TIER-2-SIBLING-AMBER |
| 3 | `userpromptsubmit_compact_threshold.py` | 302 | TIER-1 cite: `claude-thariq-tips-16-apr-26.md:28,125 @ HEAD 48f2...` | UserPromptSubmit line 460 (async, 10s) | **ACTIVE** (fires every prompt) | TIER-1-FROM-SOTA |
| 4 | `posttooluse_context_monitor.js` | 174 | TIER-1 cite: `get-shit-done/hooks/gsd-context-monitor.js:1-193 @ HEAD 3aaed8f5` | PostToolUse Edit/Write/MultiEdit line 368 (async, 10s) | **ACTIVE** (fires every tool use) | TIER-1-FROM-SOTA |
| 5 | `context_window_statusline.sh` | 121 | Header cites `code.claude.com/docs/en/statusline:189-224` | statusline line 541, refresh 30s | **ACTIVE** (statusline render) | TIER-1-FROM-SOTA (official docs) |

**REFINED W189 status**: 3 ACTIVE (not 1) + 2 CONDITIONALLY-ACTIVE (not 3) + 0 DORMANT. W189 status partially refuted — the trio is more aggressive than W189 reported because `posttooluse_context_monitor.js` (Wave 189 ADD) + `userpromptsubmit_compact_threshold.py` (W175 P6) both fire on EVERY single user/tool event.

### Root-cause verdict: (a) BODY pattern is SOTA-cited, (b) EFFECT-on-context is the damaging factor

**Pattern authenticity**: 5/5 hooks are SOTA-cited (3 TIER-1-DIRECT + 2 TIER-2-AMBER with body cites). ZERO local-invention-dressed-as-SOTA. W184-R2 audit also found 0 non-SOTA hooks (commit `528ec3e`).

**EFFECT on context**:
- `posttooluse_context_monitor.js` fires on EVERY Edit/Write/MultiEdit (~50-150 times per long arc) — each fire emits additionalContext advisory accumulating in transcript
- `userpromptsubmit_compact_threshold.py` fires on EVERY user prompt — same accumulation
- `sessionstart_compact_hint_reader.py` injects 9500-char preload (per W194 finding) at every post-compact rehydrate
- Combined: each /compact cycle re-injects ~10KB context PLUS ongoing PostToolUse advisories layered on top of the 44% paths:-glob preload bloat from §2

**Operator complaint "damaging the workflow"** = **(b) EFFECT compounding from observability over-fire**, NOT (a) pattern. Per W184-orchestrator close synthesis, fix is **calibration** (raise CRIT thresholds from 350k=35% → 700k=70% — ALREADY DONE per W187 ENV (j)) + **debounce posttooluse_context_monitor** + **reduce sessionstart preload <5KB**, NOT removal.

**RECOMMENDATION**: KEEP all 5 compact-trio hooks (SOTA-cited, load-bearing). **DEFER 3 calibration ships**: (i) move 2 TIER-2-AMBER cites to file headers; (ii) add posttooluse_context_monitor debounce (per gsd-build upstream pattern); (iii) reduce sessionstart preload budget by deferring to lazy section loads.

---

## §4 — 4 hot-files bug-magnet refresh (760 total commits)

| File | LOC | Touches | Ratio | Last-modified | CR-9 Risk |
|---|---|---|---|---|---|
| `.claude/settings.json` | 692 | 96 | **12.6%** | 2026-05-14 09:30 `a4a1d52` | **CRITICAL** — 13% bug-magnet on highest-impact governance surface |
| `.mcp.json` | 111 | 18 | 2.4% | 2026-05-13 23:42 `aa48589` | **HIGH** — every MCP add/disable churn |
| `tools/eee.ps1` | 777 | 21 | 2.8% | 2026-05-14 04:09 `7943045` | **HIGH** — bootstrap, can never be reinstalled |
| `CLAUDE.md` | 275 | 23 | 3.0% | 2026-05-14 00:42 `1d54276` | **MEDIUM-HIGH** — cardinal rules but stabilizing |

**Delta vs W190 archaeology**: W190 reported 90-100% bug-magnet ratios on these files. W195-C-redux shows ACTUAL ratios are 2.4%-12.6% (smaller). **W190 W195-Cs (or the W190 figures) overstate the ratio by ~10× — possibly due to denominator confusion (commits-touching-file / commits-in-window vs total-commits)**. The 12.6% on settings.json IS still the dominant bug-magnet surface in this runtime and the highest single-file risk per CR-9.

**Recommendations per CR-9 install-risk discipline**:
1. **settings.json**: 96 commits / 692 LOC = 1 commit per 7 LOC. Apply STRICT 2-round fix-forward budget on every settings.json edit (pre-commit T1 + post-commit T3 NEEDS-REVISION fix-forward expected).
2. **.mcp.json**: 18 commits, 5/18 are D6 today-release-auto-upgrade fires per `mcp-disconnect-recovery.md:42`. Version-pin discipline per CR-9 mandate.
3. **tools/eee.ps1**: bootstrap-only file (per CR-5 §"Bootstrap-only"); each edit MUST be re-cited.
4. **CLAUDE.md**: 23 commits = stable cardinal-rule layer; lower risk than expected.

---

## §5 — STAND-IN-NOTICE recovery actions

Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`:

1. **Orchestrator MUST** classify this dispatch as Sonnet-stand-in (no codex CLI invoked); composite W195 verdict synthesis MUST surface stand-in penetration rate.
2. **Recommended 2nd-stage validation**: real GPT-5.5 codex exec foreground+tee on §3 compact-trio root-cause verdict + §4 bug-magnet ratio reconciliation (W190 vs W195-C delta).
3. **Acceptable per `cross-model-consensus.md §The contract` Phase 1 bootstrap exception**: until codex T1 SubagentStop hooks installed AND `codex` CLI available in foreground+tee path, Sonnet-stand-in audit is admissible with disclosure.

---

## §6 — Top-3 next-fire actions (priority-ordered)

1. **paths:-glob narrowing on top-10 HIGH-risk rules** (§2) — single highest-leverage fix for W194 44% preload bloat. Estimated 30-50% preload reduction per rule. Single atomic Pattern A commit per `codex-t1-fix-forward-pattern.md §Pattern A`.
2. **CR-8 status column addition for 7 PENDING-AUDIT hooks** (§1 TIER-2 + TIER-3) — move body cites to headers + add TIER-2 sibling parity cite for `utils.py`. Boosts hooks CR-8 conformance 79.4% → 100%.
3. **Reconcile W190 vs W195-C bug-magnet ratio delta** (§4) — W190 reported 90-100% ratios; W195-C measures 2.4-12.6%. Determine whether W190 denominator was wrong OR W195-C is missing context. Affects CR-9 risk-stratification authority.

---

## ARTIFACT-INLINE

Persistence path: `tmp/w195-C-archaeology-redux-2026-05-14.md`
Per FM-19 readonly-guard-sidestep mandate: this file is the canonical audit output; orchestrator persists post-completion.

---

ARCHAEOLOGY: 3-tier hooks 79.4% TIER-1-FROM-SOTA + 17.6% TIER-2-AMBER + 2.9% TIER-3-FLAGGED (utils.py); paths:-glob 32/64 rules self-referential = ROOT-CAUSE of W194 44% preload (top-10 HIGH-risk listed); compact-trio root-cause verdict = (b) EFFECT-from-over-fire NOT (a) PATTERN-non-SOTA (5/5 SOTA-cited); 4-hot-file bug-magnet refresh refutes W190 90-100% ratios — actual settings.json 12.6% / .mcp.json 2.4% / eee.ps1 2.8% / CLAUDE.md 3.0%; STAND-IN-NOTICE per env-funneled mandate (no codex CLI invoked this fire).

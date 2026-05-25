---
title: W156 F1 V2 — Codex T1 BRIDGE-MODE Review: Tier 1a Hooks Install Plan
status: AUTHORITATIVE
date: 2026-05-12
agent: codex-rescue (BRIDGE-MODE)
---

## ARTIFACT-INLINE: tmp/wave156-f1-V2-codex-t1-review-2026-05-12.md

### BRIDGE-MODE Origin Disclosure

BRIDGE-MODE: codex-rescue Sonnet wrapper invoked real GPT-5.5 via codex CLI subprocess.
Verdict origin = codex CLI (REAL GPT-5.5). Cross-model gate: FULLY SATISFIED.
Codex ran 15+ PowerShell inspection commands against Z:/claude-sota-installed/.

### Verdict

VERDICT: NEEDS-REVISION
Confidence: 0.89

### Prescribed Edits (7, Pattern A apply)

ED-1 P0 — Install plan classification / manifest row for codex T1-T7 hooks:
Do not classify all 6 hooks uniformly as CR-12 TERTIARY cite-import-AMBER.
T1/T2/T3/T4/auto_proceed are sibling-local bridge/orchestration deltas after HNF.
codex_stop_review_gate.py is HYBRID/PATH-C because upstream openai-codex already
supplies a Stop hook pattern and this runtime already wires the upstream MJS Stop hook.
State constituents and effective_tier=TIER-3-LOCAL-COMPOSITION instead of implying
pure no-upstream parity for T6.

ED-2 P0 — .claude/settings.json Stop hook wiring:
If installing sibling codex_stop_review_gate.py, add the Python Stop hook explicitly
with timeout 900 and async false. Decide whether it replaces or coexists with the
existing openai-codex stop-review-gate-hook.mjs timeout 300. Current settings wire
auto_proceed_gate.py (T7) but does NOT wire codex_stop_review_gate.py (T6).

ED-3 P0 — Hook copy procedure:
Pin each copied sibling source by exact sibling git commit SHA. Run pre-REVERT check
against each source path. Explicitly assert the deny-list files were NOT copied:
bash_command_allowlist.py, fleet_health_start.py, permission_request_auto_approve.py.
Run post-copy sibling-bleed scan for: Z:/claude-sota/, Z:\claude-sota\, Z--claude-sota,
claude-sota-state, sss --, and the string sss used as a shell command.

ED-4 P1 — .codex/config.toml dependency section:
Document CODEX_HOME config dependency as Z:/claude-sota-installed-state/.codex/config.toml
(NOT repo-local .codex/config.toml). Required profiles: deep-review-exec for T1/T3/T4/T6;
t2-exec exists for operator-side T2/custom review. Note: codex_t2_pre_commit_gate.py uses
codex exec review --uncommitted WITHOUT -p because that subcommand rejects the -p flag.

ED-5 P1 — settings.json wire-shape spec:
Use the actual Claude settings shape: 3 event names (PreToolUse, PostToolUse, Stop)
with multiple matcher/if registrations. NOT described as 5 distinct hook event types.
T1: hooks.PreToolUse matcher Edit|Write|MultiEdit.
T2: hooks.PreToolUse matcher Bash with if Bash(git commit *) and variants.
T3: hooks.PostToolUse matcher Bash async true 30s commit variants.
T4: hooks.PostToolUse matcher Bash async true 30s push variants.
T7: hooks.Stop matcher * sync auto_proceed_gate.py timeout 5.
T6: hooks.Stop matcher * sync codex_stop_review_gate.py timeout 900 (to add).

ED-6 P1 — CR-7 smoke probe checklist:
Add per-hook smoke probes before flipping manifest status to PASS:
T1: synthetic PreToolUse payload against temp design-surface path; expect WARN/STRICT deny.
T2: synthetic git commit Bash payload on scoped --only path; expect noop/review/deny.
T3: successful git commit PostToolUse payload; expect queue/output artifact.
T4: successful git push PostToolUse payload; expect async queue artifact without network push.
T6: dirty-tree Stop payload; expect skipped_clean/would_run/block/fail_open under dry-run.
T7: Stop payload with ask-without-act transcript; expect decision:block.
T7: benign transcript Stop payload; expect allow/no JSON.

ED-7 P1 — Commit instructions:
Apply FM-02 defense to hook-copy/settings/provenance commit.
Stage only intended files: git commit --only -- hook_files settings.json manifest provenance.
Exclude unrelated cwc/checkpoint drift. Use atomic narrow pathspec form per FM-02 sub-class (b)+(c).

### Codex Summary (verbatim)

A1 partially fails: T6 stop hook cannot be called pure no-upstream-parity because openai-codex
already provides an upstream Stop hook pattern and this runtime currently wires that MJS hook.
A2 CR-9 applies to all copies: sibling SHA pin, 2-round fix-forward budget, sibling-bleed
rewrite, and pre-REVERT deny-list check. A3 cite lattice should be constituents with
effective_tier=TIER-3-LOCAL-COMPOSITION. A4 FM-02 atomic narrow commit applies. A5 required
settings shape is PreToolUse, PostToolUse, and Stop with matcher/if variants, not five event
types. A6 profiles live in CODEX_HOME state config; deep-review-exec is load-bearing, t2-exec
exists but the pre-commit script does not use -p. A7 smoke probes must exercise each hook with
synthetic payloads and expected telemetry/decision before manifest PASS.

### Pattern A Apply Recommendation

All 7 prescribed_edits are actionable. Apply in priority order:
1. ED-1, ED-2, ED-3 (P0) in single atomic commit before any hook copy
2. ED-4, ED-5, ED-6, ED-7 (P1) in subsequent atomic commit(s)

Per codex-t1-fix-forward-pattern.md Pattern A: apply ALL surviving Mia-verified
prescriptions in SINGLE atomic commit per logical unit. Mia pre-apply required before
each Edit per mia-pre-apply.md.

### Cross-Model Gate Status

CROSS-MODEL GATE: FULLY SATISFIED
Origin: REAL GPT-5.5 via codex CLI subprocess
Evidence: codex ran 15+ PowerShell inspection commands; returned structured JSON verdict
Verdict file: .claude/state/codex_consult_w156_f1_tier1a_v2_OUT.txt (captured in codex-companion stdout)

### Handoff

handoff_to: orchestrator
verdict_one_line: NEEDS-REVISION conf=0.89 — 7 prescribed_edits (3 P0 + 4 P1); T6 hook is HYBRID/PATH-C not pure TERTIARY; cross-model gate FULLY SATISFIED

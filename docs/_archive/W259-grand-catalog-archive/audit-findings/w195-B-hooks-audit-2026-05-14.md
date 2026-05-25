# W195 P1(a) HOOKS-CITE-COVERAGE Sub-Audit

Date: 2026-05-14
Scope: `Z:/claude-sota-installed/.claude/hooks/scripts/*.py`
Inputs checked:
- Directory listing: 32 Python files.
- Wiring: `.claude/settings.json` hook command references.
- Secondary wiring/dependency probe: imports among hook scripts + `.claude/agents/*.md` frontmatter references.
- Cite probe: `Z:/repos/deps/...:line @ <SHA>` / `@ HEAD <SHA>` for TIER-1; `Z:/claude-sota/`, `.claude/rules/`, or `docs/` references for TIER-2/local-sibling coverage; otherwise UNCITED.
- Revert archaeology: `git log --all --grep=REVERT --grep=revert --grep=Revert -- .claude/hooks/scripts`.

## Classification Rules Used

- `TIER-1`: file has at least one dependency cite with `Z:/repos/deps/<repo>/<file>:<line-range> @ <HEAD SHA or pinned SHA>`.
- `TIER-2`: no qualifying TIER-1 dependency cite, but has sibling/local docs/rules cite coverage.
- `UNCITED`: no qualifying TIER-1 or requested TIER-2 cite under this audit definition.
- `ACTIVE`: directly wired in `.claude/settings.json`, or operationally wired through per-agent frontmatter where noted.
- `DORMANT`: not directly wired in settings; retained because it is a helper/import dependency or staged/conditional component.
- `CLEANUP-CLASS`: orphaned or disabled/never-fires candidate where removal may be valid after backup.

## Per-File Inventory

| Hook file | Cite class | Runtime class | Evidence / note |
|---|---:|---:|---|
| `_codex_plugin_root.py` | TIER-1 | DORMANT | Helper imported by `codex_postcommit_review.py`, `codex_prepush_review.py`, `_codex_preflight.py`; not directly settings-wired. |
| `_codex_preflight.py` | TIER-1 | DORMANT | Helper imported by active postcommit/prepush hooks; not directly settings-wired. |
| `_guard_base.py` | TIER-1 | DORMANT | Shared helper imported by active gates (`auto_proceed_gate.py`, T1/T2/T3/T4, gitleaks, etc.); not directly settings-wired. |
| `_observation_writer.py` | TIER-1 | DORMANT | Shared helper imported by active observer/lint hooks and `secret_scan_guard.py`; not directly settings-wired. |
| `agent_plan_readonly_bash_guard.py` | TIER-2 | ACTIVE | Not global-settings-wired by design; per-agent frontmatter wires it in `architect.md`, `code-reviewer.md`, `gpt5-archaeologist.md`, `gpt5-reviewer.md`, `verifier.md`, plus wshobson/evaluator/gsd agent files. Header lacks qualifying `Z:/repos/deps/...:line @ SHA`. |
| `agent_spawn_gate.py` | TIER-1 | ACTIVE | Settings `PreToolUse:Agent`; cite at `claude-code-best-practice-shan/...:21-30 @ 48f2...`. |
| `auto_proceed_gate.py` | TIER-2 | ACTIVE | Settings `Stop`; official docs + sibling/local rules, but no qualifying deps file:line SHA cite. |
| `block_no_verify_guard.py` | TIER-1 | ACTIVE | Settings `PreToolUse:Bash`; cite at `everything-claude-code/.../block-no-verify.js:1-22,153-196 @ 841b...`. |
| `codex_failure_audit.py` | TIER-1 | ACTIVE | Settings `PostToolUseFailure:Bash`; cite at `claude-agent-sdk-python/.../types.py:219,284-292,387-391 @ HEAD b512...`. |
| `codex_gate.py` | TIER-2 | DORMANT | Not settings-wired, but imported by active `codex_t1_consult_gate.py`, `codex_postcommit_review.py`, `codex_prepush_review.py`; no qualifying deps cite found. Do not remove without replacing callers. |
| `codex_mcp_healthcheck.py` | TIER-1 | ACTIVE | Settings `PostToolUse:Edit|Write|MultiEdit`; cites Codex schema/CLI deps with line ranges and pinned SHA. |
| `codex_postcommit_review.py` | TIER-1 | ACTIVE | Settings `PostToolUse:Bash` git commit variants; multiple deps cites. |
| `codex_prepush_review.py` | TIER-1 | ACTIVE | Settings `PostToolUse:Bash` git push variants; multiple deps cites. |
| `codex_review_queue.py` | TIER-1 | DORMANT | Not settings-wired, but imported by active postcommit/prepush hooks on gate-refusal path; retain as active helper. |
| `codex_review_thread_bridge.py` | TIER-1 | DORMANT | Not settings-wired, but imported by active `codex_stuck_detector.py` on bridge pass; retain as conditional helper. |
| `codex_review_trace.py` | TIER-2 | ACTIVE | Settings `PostToolUse:Bash`, `PostToolUse:Agent`, `SubagentStop`; header has sibling/official/web cites but no qualifying deps line+SHA cite. |
| `codex_stuck_detector.py` | TIER-1 | ACTIVE | Settings `Stop` and `UserPromptSubmit`; cites `codex-plugin-cc` process/tracked-jobs deps. |
| `codex_t1_consult_gate.py` | TIER-1 | ACTIVE | Settings `PreToolUse:Edit|Write|MultiEdit`; cites CCBP, Codex CLI, codex-plugin-cc deps. |
| `codex_t2_pre_commit_gate.py` | TIER-1 | ACTIVE | Settings `PreToolUse:Bash` git commit variants; cites CCBP, Codex CLI, codex-plugin-cc deps. |
| `codex_t5_plan_review_gate.py` | TIER-1 | ACTIVE | Settings `PreToolUse:ExitPlanMode`; qualifying deps cite appears in body to `codex-plugin-cc/.../app-server.mjs:194 @ 807e...`. |
| `fm17_class_lint.py` | TIER-1 | ACTIVE | Settings `SubagentStop`; cite at `claude-agent-sdk-python/.../types.py:309-316 @ HEAD b512...`. |
| `fm17d_stall_detector.py` | TIER-2 | CLEANUP-CLASS | Not settings-wired; manifest says disabled due schema-rot (`FM17_STALL_DETECTOR_DISABLE=1`, 172/172 schema_missing). Header has TIER-2 local rule coverage but lacks qualifying deps cite. Backup before removal. |
| `fm19_artifact_inline_lint.py` | TIER-2 | ACTIVE | Settings `SubagentStop`; official docs + local rule cites, no qualifying deps file:line SHA cite. |
| `fm20_path_drift_lint.py` | TIER-2 | ACTIVE | Settings `PreToolUse:Agent`; local rule + official docs, no qualifying deps file:line SHA cite. |
| `gitleaks_pre_commit_gate.py` | TIER-2 | ACTIVE | Settings `PreToolUse:Bash` git commit variants; TIER-1 web docs exist, but no `Z:/repos/deps/...:line @ SHA` cite. |
| `precompact_hint_emitter.py` | TIER-2 | ACTIVE | Settings `PreCompact`; official docs/local runtime refs, no qualifying deps file:line SHA cite. |
| `safety_guard.py` | TIER-1 | ACTIVE | Settings `PreToolUse:Bash`; cite at `everything-claude-code/.../safety-guard/SKILL.md:18-39,67-75 @ 841b...`. |
| `secret_scan_guard.py` | TIER-1 | ACTIVE | Settings `PreToolUse:Edit|Write|MultiEdit`; cite at `awesome-claude-code-toolkit/.../secret-scanner.js:19-28 @ 659e...`. |
| `sessionstart_compact_hint_reader.py` | TIER-2 | ACTIVE | Settings `SessionStart` matcher `compact`; official docs/local refs, no qualifying deps file:line SHA cite. |
| `subagent_stop_telemetry.py` | TIER-1 | ACTIVE | Settings `SubagentStop`; cite at `claude-agent-sdk-python/.../types.py:309-316 @ HEAD b512...`. |
| `userpromptsubmit_compact_threshold.py` | TIER-1 | ACTIVE | Settings `UserPromptSubmit`; cite at `claude-code-best-practice-shan/.../claude-thariq-tips-16-apr-26.md:28,125 @ HEAD 48f2...`. |
| `utils.py` | UNCITED | DORMANT | Shared helper imported by active hooks (`_guard_base.py`, `_observation_writer.py`, T1, safety, failure audit, mcp healthcheck). Only Python docs / parent `Z:/claude` refs found; no requested TIER-1/TIER-2 cite. Do not remove; add cite coverage. |

## Counts

- Total `.py` files: 32.
- Direct settings-wired active files: 22.
- Additional active via per-agent frontmatter: 1 (`agent_plan_readonly_bash_guard.py`).
- Non-settings helper/conditional retained files: 8 (`_codex_plugin_root.py`, `_codex_preflight.py`, `_guard_base.py`, `_observation_writer.py`, `codex_gate.py`, `codex_review_queue.py`, `codex_review_thread_bridge.py`, `utils.py`).
- Cleanup-class candidates: 1 (`fm17d_stall_detector.py`).
- Cite coverage:
  - TIER-1 by requested deps file:line + SHA standard: 22.
  - TIER-2/local-sibling/docs only: 9.
  - UNCITED under requested standard: 1 (`utils.py`).

## Revert Precedents

Observed hook-file REVERT precedents in git history:

1. `a4d53ac revert(hooks): wave loop89d7bbd4 fire 3 — REVERT-AND-REMOVE Fire 2 cwc NEW-path duplicates`
   - Removed five `.claude/hooks/scripts/cwc/*.sh` duplicate/dead-code hook files after T3 caught wrong-path duplicate install.
   - Relevance: strong precedent that orphaned hook files should be removed after concrete wire/path proof, with cite trail preserved elsewhere.

2. `3de349d revert(wave-125): W124-A5 codex_stop_review_gate.py — Agent C archaeology caught structural double-review per FM-09 + CR-12 OVER`
   - Removed `codex_stop_review_gate.py` after archaeology found structural double-review / supersession.
   - Relevance: strong precedent for backing up/removing dormant hooks that duplicate an active upstream/plugin mechanism.

3. `c5e670e feat(license-gate): Wave 102 Ship 2T — REMOVE trufflehog AGPL-3.0 license blocker`
   - Not a current `.py` hook precedent in this directory, but part of hook/security tooling removal history.

No REVERT entry found that removes any currently present top-level `.py` file in `.claude/hooks/scripts/`; current cleanup decision should therefore be file-specific, not bulk.

## Backup-Before-Removal List

Create `.claude/hooks/scripts/_backup/` copies before removing:

1. `.claude/hooks/scripts/fm17d_stall_detector.py`
   - Reason: CLEANUP-CLASS; not settings-wired; documented disabled/schema-rot; no active import dependency found.
   - Suggested backup path: `.claude/hooks/scripts/_backup/fm17d_stall_detector.py`

Do NOT backup/remove in this pass:

- `_codex_plugin_root.py`, `_codex_preflight.py`, `_guard_base.py`, `_observation_writer.py`, `codex_gate.py`, `codex_review_queue.py`, `codex_review_thread_bridge.py`, `utils.py`: not directly settings-wired, but active hooks import or conditionally call them.
- `agent_plan_readonly_bash_guard.py`: not global settings-wired, but intentionally scoped through per-agent frontmatter.

## Gaps To Fix

1. Add requested TIER-1 dependency cite coverage to active TIER-2 hooks where feasible:
   - `auto_proceed_gate.py`
   - `codex_review_trace.py`
   - `fm19_artifact_inline_lint.py`
   - `fm20_path_drift_lint.py`
   - `gitleaks_pre_commit_gate.py`
   - `precompact_hint_emitter.py`
   - `sessionstart_compact_hint_reader.py`

2. Add at least TIER-2 local/sibling cite coverage to:
   - `utils.py`

3. Decide `fm17d_stall_detector.py` disposition:
   - Option A: repair current SubagentStop schema parsing and re-wire.
   - Option B: backup to `_backup/` and remove from active scripts tree.

VERDICT: HOOKS-CITE-COVERAGE-AUDIT-COMPLETE

## ARTIFACT-INLINE: tmp/w184-B-codex-rescue-bridgemode-2026-05-13.md

# W184 P1-B Audit Findings

Timestamp: 2026-05-13
Workspace: `Z:/claude-sota-installed`

## 1. Hook Script Files

Files in `Z:/claude-sota-installed/.claude/hooks/scripts/`:

- `_codex_plugin_root.py`
- `_codex_preflight.py`
- `_guard_base.py`
- `_observation_writer.py`
- `agent_plan_readonly_bash_guard.py`
- `agent_spawn_gate.py`
- `auto_proceed_gate.py`
- `block_no_verify_guard.py`
- `codex_failure_audit.py`
- `codex_gate.py`
- `codex_mcp_healthcheck.py`
- `codex_postcommit_review.py`
- `codex_prepush_review.py`
- `codex_review_queue.py`
- `codex_review_thread_bridge.py`
- `codex_review_trace.py`
- `codex_stuck_detector.py`
- `codex_t1_consult_gate.py`
- `codex_t2_pre_commit_gate.py`
- `codex_t5_plan_review_gate.py`
- `context_window_guard.py`
- `context_window_statusline.sh`
- `fm17_class_lint.py`
- `fm17d_stall_detector.py`
- `fm19_artifact_inline_lint.py`
- `fm20_path_drift_lint.py`
- `gitleaks_pre_commit_gate.py`
- `precompact_guard.py`
- `precompact_hint_emitter.py`
- `safety_guard.py`
- `secret_scan_guard.py`
- `sessionstart_compact_hint_reader.py`
- `subagent_stop_telemetry.py`
- `userpromptsubmit_compact_threshold.py`
- `utils.py`

Count: 35 files.

## 2. CLAUDE.local.md ENV Block (i)

In `CLAUDE.local.md` ENV block `(i)`, `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` is commented, not active:

```powershell
# $env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = '70'
```

Finding: inactive/commented. The surrounding note records `W183 F1 REVERT 2026-05-13` and states it falls back to the Anthropic Claude Code default around 80%.

## 3. Stop Hooks

`.claude/settings.json` has 1 Stop hook matcher entry with 4 command hooks under it.

Stop hook scripts/commands:

1. `Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/.claude/hooks/scripts/auto_proceed_gate.py`
2. `cd "$CLAUDE_PROJECT_DIR" && bash ".claude/hooks/scripts/cwc/commit-on-stop-throttled.sh"`
3. `"Z:\tools\nodejs\node.exe" "Z:\claude-sota-installed\.claude\plugins\marketplaces\openai-codex\plugins\codex\scripts\stop-review-gate-hook.mjs"`
4. `"Z:/venvs/claude/Scripts/python.exe" "Z:/claude-sota-installed/.claude/hooks/scripts/codex_stuck_detector.py"`

## 4. Artifact Existence Check

Before this write, `tmp/w184-B-codex-rescue-bridgemode-2026-05-13.md` did not exist.

Probe result: `False`.

## VERDICT: findings summary

`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` is commented/inactive in ENV block `(i)`; `.claude/settings.json` contains 4 Stop command hooks under 1 matcher entry; the requested target artifact did not exist before creation; hooks scripts directory contains 35 top-level files.

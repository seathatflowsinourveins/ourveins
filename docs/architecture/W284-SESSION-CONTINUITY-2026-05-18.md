# W284 — Session Discontinuation Root-Cause Investigation

**Date**: 2026-05-18
**Runtime**: `Z:/claude-sota-installed/`
**Operator quote**: "why did you stopped in the middle? and why it is happening repeatedly? is there bugs that lead you to this discontinuation?"

## Evidence inventory

- `Z:/claude-sota-installed/.claude/settings.json:120-130` — PreCompact hook with `matcher:"auto"` + (pre-W284b) `exit 2`
- `Z:/claude-sota-installed/.claude/settings.json:22` — `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS=60000` (pre-W284b)
- `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:30` — codex `Stop` hook **timeout: 900s (15 min)**
- `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:16` — `STOP_REVIEW_TIMEOUT_MS = 15 * 60 * 1000`
- `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:178-184` — codex `BLOCK:` emits `decision:"block"` payload, **forcing session to resume but reasoning gets rewound**
- `${CLAUDE_PLUGIN_DATA}/codex-openai-codex/state/.../state.json` — `stopReviewGate: true` ACTIVE
- 819 orphan `tasks/*.output` files across 33+ session dirs in `tmp/claude/`, 276 in last 24h
- 100% of recent sessions terminated with `stop_reason:"tool_use"` or `"end_turn"` — **ZERO `prompt_too_long`, ZERO `overloaded_error`/`529`, ZERO `user_interrupt`** markers across grep of all `*.jsonl`
- Operator Ctrl-C / manual close ELIMINATED as dominant cause

## Root causes (ranked by frequency × severity)

### #1 — Codex Stop-review-gate forced-rewind loop (HIGH × HIGH)

`stop-review-gate-hook.mjs:177-184` runs `codex exec` synchronously on EVERY assistant `Stop` event with **15-min timeout per turn**. On GPT-5.5 `BLOCK:<reason>`, the hook emits `{decision:"block", reason:...}` — per Anthropic hooks spec this forces Claude to **continue working**, but the assistant's last partial message gets re-fed with the BLOCK reason appended. Operator perceives Claude "stopping mid-task and forgetting".

**Reproduction**: write any non-trivial turn → on Stop, hook spawns codex (15-min budget) → codex BLOCKs or hangs → CC restarts the turn or freezes up to 15 min then resumes from an earlier checkpoint.

**Fix**: flip `state.json:config.stopReviewGate=false` for fast-stop mode (loses cross-model gate), OR accept the up-to-15min freeze as the price of adversarial review. **W284b decision**: keep ENABLED per operator W269+W280a mandate; document the knob.

### #2 — PreCompact `matcher:"auto"` blocking exit-2 + autocompact-override removal (HIGH × MEDIUM) — FIXED W284b

`settings.json:120-130` declared `PreCompact` matcher `"auto"` with `exit 2` (W281f). W280c also removed `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`. Combined: context grows to ~95% of 1M, auto-compact tries to fire, hook blocks it, context bloats further, every subsequent reasoning step is slow + truncated. **ZERO `prompt_too_long` markers** because the block-then-grow loop prevents the error but degrades output silently.

**Reproduction**: any session with ≥800K context. PreCompact prints `Write-Error '...' exit 2` → CC blocks compaction → next turn approaches 1M → assistant message truncation feels like a stop.

**W284b fix**: `exit 2` → `exit 0` log-only. Auto-compact at default ~95% now proceeds; `tmp/precompact.log` captures every fire. Operator still uses `/compact <hint>` via `everything-claude-code:strategic-compact` for milestone-aligned compaction.

### #3 — Forked subagents complete after session Stop, orphan their outputs (MEDIUM × HIGH) — FIXED W284b

`CLAUDE_CODE_FORK_SUBAGENT=1` + 819 `tasks/*.output` files. SessionEnd cascade: SessionEnd → codex `session-lifecycle-hook.mjs:103` `terminateProcessTree` kills broker → kills child node processes → forked agents die mid-write → `.output` files become orphans.

**Reproduction**: spawn agent-team / parallel subagents → end session before all return → check `find tmp/claude/.../tasks -mmin -5` for `.output` files without follow-up assistant entries.

**W284b fix**: `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` bumped from `60000` → `300000` (5 min cleanup budget).

## Discrimination matrix

| Symptom | Cause | Signature in `.jsonl` |
|---|---|---|
| Pause ≥15s then resume mid-thought | #1 codex Stop-gate | `stop_reason:"end_turn"` followed by NEW assistant turn within 30s, same task |
| Pause + content gets shorter over time | #2 PreCompact block + 95% bloat | Token-count metadata grows past 800K then assistant messages truncate |
| Pause + work disappears | #3 orphan forked agents | `tasks/*.output` mtime AFTER last `.jsonl` entry; no follow-up `tool_result` |
| Hard cut after `permission-mode` | Operator Ctrl-C / terminal close | Last entry types `permission-mode` then nothing |
| Hard cut + `isApiErrorMessage:true` | API error (overloaded/529) | **ZERO instances found** |

## W284b applied fixes (2026-05-18)

- **#2 PreCompact `exit 2` → `exit 0`** in `.claude/settings.json:120-130` — log-only via `Add-Content tmp/precompact.log` then proceed.
- **#3 `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`** bumped `60000` → `300000`.
- **#1 codex Stop review-gate** kept ENABLED. Operator-tunable knob: flip `stopReviewGate:false` in `${CLAUDE_PLUGIN_DATA}/codex-openai-codex/state/*/state.json`.

Verify post-deploy: `tmp/precompact.log` accumulates entries on next auto-compact event; agent-team sessions no longer orphan `tasks/*.output` files.

## Operator instrumentation recipes (deferred — not in W284b commit)

These add log volume but make root-cause discrimination automatic. Each is a direct-CLI hook (cardinal-rule-2 compliant); operator decides whether the log volume is worth the diagnostic value.

1. **SessionStart heartbeat trailer**:
   ```json
   {"type":"command","command":"powershell -NoProfile -Command \"Add-Content -Path 'Z:/claude-sota-installed/tmp/session-heartbeat.log' -Value (Get-Date -Format o)+'|START|'+$env:CLAUDE_SESSION_ID\""}
   ```

2. **Stop hook trailer logger** (discriminates #1 vs #3):
   ```json
   {"type":"command","command":"powershell -NoProfile -Command \"Add-Content -Path 'Z:/claude-sota-installed/tmp/session-heartbeat.log' -Value (Get-Date -Format o)+'|STOP|'+$env:CLAUDE_SESSION_ID\""}
   ```

3. **Forked-subagent reaper** — Stop-hook scan for orphan `.output` files in last minute, log to `tmp/orphan-task.log`.

4. **Codex Stop-gate timeout shortener** — currently hardcoded 15min at `stop-review-gate-hook.mjs:16`. Upstream PR to openai/codex-plugin-cc to expose `STOP_REVIEW_TIMEOUT_MS` as configurable env. Workaround: monkey-patch the file in plugin cache (lost on `/plugin update`).

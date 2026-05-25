# RTK Operator Runbook (claude-sota-installed)

## Status (Wave 135 Fire 7 codification 2026-05-10; P-A-01 wrapper REVERTED per Mia n=148)
- **Binary**: `rtk 0.39.0` INSTALLED at `Z:/claude-sota-installed/.local/cargo/bin/rtk.exe` (Wave 82g per `docs/install-provenance.md`)
- **Hook**: PreToolUse Bash hook WIRED at `.claude/settings.json:248` invoking `rtk hook claude` (UNWRAPPED — Wave 135 Fire 7 attempted `cmd /d /c "...2>NUL"` wrapper but Mia n=148 smoke probe confirmed cmd /c stdin propagation bug breaks rtk JSON output entirely; reverted to original unwrapped form; cosmetic stderr warning persists)
- **MEASURED savings**: 11.0M tokens saved across 911 commands (~89.9%) at codification time (`rtk gain` probe)

## Cite anchors (TIER-1-DIRECT)
- Upstream repo: https://github.com/rtk-ai/rtk @ HEAD `2d6e10a923d18e022f5fdc4ed9b69ae0d43b2f79` (default branch `develop`, 45,496★, Apache-2.0)
- README install primitive: `README.md:67-110 @ 2d6e10a9`
- Windows fallback caveat: `README.md:262-285 @ 2d6e10a9`
- Source-level hook check: `src/hooks/hook_check.rs:62-100 @ 2d6e10a9` (recognizes exact global hook command for warning suppression)

## Operator commands
- `rtk gain` — token-savings analytics
- `rtk gain --history` — command usage history with per-command savings
- `rtk discover` — analyze Claude Code history → missed-savings opportunities
- `rtk proxy <cmd>` — execute raw command without filtering (debug mode)
- `rtk init -g --uninstall` — REMOVE all rtk artifacts (per CR-9 REVERT-check: rtk NOT in sibling REVERT precedent list)

## DO NOT run `rtk init -g` in this runtime
Wave 83a recorded profile-pollution side effects from RTK init (rolled back per `docs/install-provenance.md:3110-3163`). This runtime is Z:-portable; the `.claude/settings.json:248` PreToolUse Bash hook IS the intended eee integration. RTK.md root-level + CLAUDE.md @RTK.md injection are deliberately omitted to avoid Wave 83a class regression.

## Verification (UNWRAPPED — post-Mia-n=148 revert)
```bash
echo '{"tool_name":"Bash","tool_input":{"command":"git status"}}' | Z:/claude-sota-installed/.local/cargo/bin/rtk.exe hook claude
```
Expected: stderr `[rtk] /!\ No hook installed — run 'rtk init -g' for automatic token savings` (cosmetic) + stdout `{"hookSpecificOutput":{"permissionDecisionReason":"RTK auto-rewrite","updatedInput":{"command":"rtk git status"}}}`.

## Diagnostic on persistent symptom warning (cosmetic — wrapper attempt failed)
PRIOR-STATE: every Bash call prefixed with `[rtk] /!\ No hook installed — run 'rtk init -g' for automatic token savings`. Cause: rtk binary's self-check looks for `~/.claude/RTK.md` (USERPROFILE-default at `C:/Users/<user>/.claude/`), NOT this runtime's `CLAUDE_CONFIG_DIR=Z:/claude-sota-installed/.claude/`. Symptom is COSMETIC; the hook IS firing successfully (verified via direct JSON-stdin probe).

POST-STATE (Wave 135 Fire 7): wrapper `cmd /d /c "rtk.exe hook claude 2>NUL"` ATTEMPTED then REVERTED. Mia n=148 smoke probe surfaced cmd /c stdin propagation bug — wrapper invocation via Bash pipe consumed BOTH stdout and stderr (probe `tmp/wave135f7-mia-n148/wrapped_stdout.txt` and `wrapped_stderr.txt` both empty post-wrap). Reverted to original unwrapped form at `.claude/settings.json:248`; cosmetic warning persists.

## Wave 135 Fire 9 candidate — wrapper-script alternative
Queued: write `tools/rtk-quiet.bat` wrapper batch file that does `@echo off` + `rtk.exe %* 2>NUL` and update `.claude/settings.json:248` to call it. Requires CR-3 T1 review + smoke probe + 2-round fix-forward budget per CR-9. NOT bundled in Wave 135 Fire 7 per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE. Alternative paths:
- (a) Patch rtk.exe upstream to honor `CLAUDE_CONFIG_DIR` env (file upstream issue at rtk-ai/rtk)
- (b) Set `CLAUDE_CONFIG_DIR` env value matching rtk's expected path (rtk binary check at `src/hooks/hook_check.rs:62-100 @ 2d6e10a9` — would require source dive to verify expected exact path)
- (c) Accept cosmetic warning indefinitely — current state

## Update triggers
Re-evaluate this runbook when:
- rtk version bumps past 0.39.0 (cardinal-rule-6 freshness check)
- Anthropic CC ships native ToolDecorator primitive that obviates rtk hook
- rtk binary self-detection fixed to honor `CLAUDE_CONFIG_DIR` env (would silence the cosmetic symptom warning)
- A 3rd-org alternative compression primitive surfaces with ≥3-axis convergence evidence
- Wave 135 Fire 9 wrapper-script alternative ships + smoke probe PASSES → revise §POST-STATE to reflect wrapper-script success

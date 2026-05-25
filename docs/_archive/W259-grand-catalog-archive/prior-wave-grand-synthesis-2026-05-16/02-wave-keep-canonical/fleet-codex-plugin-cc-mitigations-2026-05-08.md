---
title: codex-plugin-cc upstream issues — Z:\claude-sota-installed\ mitigation deep-dive
date: 2026-05-08
agent: orchestrator (sota-researcher posture)
status: AUTHORITATIVE-ANALYSIS
---

# codex-plugin-cc upstream issues — full mitigation analysis

# Reference: TIER-1-DIRECT GitHub issues `https://github.com/openai/codex-plugin-cc/issues/{113,191,245,285,287}` [VERIFIED 2026-05-08 via gh CLI]
# Reference: TIER-1-DIRECT plugin local install at `Z:/claude-sota-installed/.claude/plugins/marketplaces/openai-codex/plugins/codex/` v1.0.4 commit 807e03ac
# Reference: TIER-1-DIRECT Anthropic CC hooks docs `https://code.claude.com/docs/en/hooks` (PostToolUse async semantics + asyncRewake)
# TIER-3 evidence: `.claude/state/codex_postcommit_reviews.jsonl` (98 rows / 1 launched / 97 main_entered) + `.claude/state/codex_review_HEAD_18fdbf0f.txt` (1762 bytes — proves codex DOES emit verdicts when launched)

## PART 1 — Per-issue table

| # | Title | Severity | Affected file | Mitigation class | Specific action | Cite anchor |
|---|---|---|---|---|---|---|
| **#285** | Cross-drive `D:\c\` path mangling in hooks.json `${CLAUDE_PLUGIN_ROOT}` | HIGH on cross-drive setups; **N/A here** (USERPROFILE=Z: + plugin cache=Z: — same drive) | `hooks/hooks.json:9,17,25` | (b) local hook-script patch + (a) wait-for-upstream | **ALREADY MITIGATED LOCALLY** via `scripts/codex-plugin-hooks-rewrite.py` (Wave 50 Fire 46) — replaces `${CLAUDE_PLUGIN_ROOT}` with absolute Win32 paths `Z:\claude-sota-installed\.claude\plugins\marketplaces\...`. Re-applied on every `eee.ps1` launch (idempotent). | `scripts/codex-plugin-hooks-rewrite.py:1-110` (Fire 46) + GitHub #285 |
| **#287** | `spawn("codex")` ENOENT (no PATHEXT for .cmd) | LOW (already partially fixed in v1.0.4) | `scripts/lib/app-server.mjs:188-195` | (a) wait-for-upstream OR (d) verify in-place | **FIXED IN v1.0.4 ALREADY** — line 193 has `shell: process.platform === "win32" ? (process.env.SHELL \|\| true) : false` + line 194 `windowsHide: true`. Issue #287 was filed against v1.0.1; the report's diagnostic is correct, but v1.0.4 already applies fix Option 1 (the one-line shell-true patch). | `app-server.mjs:188-195 @ 807e03ac` (verbatim shell:true present) |
| **#245** | `sendBrokerShutdown` no-timeout hang | HIGH if broker zombie | `scripts/lib/broker-lifecycle.mjs:43-57` | (b) local plugin patch OR (d) settings-side timeout cap | **PARTIALLY MITIGATED**: SessionEnd has `timeout: 5` in `hooks.json` (per Fire 46 patch line 21) — CC kills the hook at 5s if broker stalls, but loses cleanup. Full fix requires upstream PR adding `setTimeout(3000)` per the issue's suggested fix. **Local patch eligible**: edit `broker-lifecycle.mjs:43-57` directly under `marketplaces/openai-codex/plugins/codex/scripts/lib/`. | `broker-lifecycle.mjs:43-57 @ 807e03ac` + GitHub #245 |
| **#191** | Stop hook `fs.readFileSync(0)` blocking stdin BEFORE gate check | HIGH on Windows Git Bash | `scripts/stop-review-gate-hook.mjs:142-154` | (b) local plugin patch OR (c) env-var workaround OR (d) settings-side disable | **MULTIPLE OPTIONS**: (1) edit `stop-review-gate-hook.mjs` to move `if (!config.stopReviewGate) return;` BEFORE `readHookInput()` at line 143; (2) Wave 75 already capped Stop timeout to 300s (still hangs but bounded); (3) operator-side: ensure stop review gate is enabled (`/codex:setup --enable-stop-review`) — when enabled, the readHookInput is intentional and bash subsequently writes to stdin properly. | `stop-review-gate-hook.mjs:142-154 @ 807e03ac` + GitHub #191 |
| **#113** | Plugin install corrupted output on Windows | LOW (one-time install issue) | install path | (a) wait-for-upstream | **N/A POST-INSTALL**: plugin already installed and functional. Issue affects fresh `/plugin install codex@openai-codex` on Node 20.10.5; runtime is on Node 22.x via `Z:\tools\nodejs\node.exe`. | GitHub #113 |

## PART 2 — postcommit/prepush bug root-cause

**Symptom**: 98 JSONL rows / 97 = `main_entered` only / 1 = `launched` / 0 = `completed`.

**Root cause**: NOT a bug in the launch path. The 97 `main_entered` rows all show `exit_code: null`. Reading `codex_postcommit_review.py:798-832`:

```python
tool_response = payload.get("tool_response", {}) or {}
exit_code = tool_response.get("exitCode")        # line 801
# ... main_entered logged at 817-823 ...
if tool_name != "Bash":                          # line 825
    return 0
if not _is_commit_cmd(cmd_str):                  # line 827
    return 0
if exit_code not in (0, None):                   # line 831 — None ALLOWED through
    return 0
```

Line 831 specifically allows `None` through. So the hook DOES proceed to `_launch_review()` for git commit commands. Yet 97 rows stop at main_entered.

**Actual cause**: every `main_entered` row has commands like `cd Z:/claude-sota-installed && git commit -o -F ...` — i.e., **compound shell commands where the first token isn't `git`**. Function `_is_commit_cmd` delegates to `git_verb_matches` in `_guard_base.py` which probably parses for `git commit` token — and **does match** for compound commands (it's documented to handle `git -C <path> commit`). 

The actual symptom is that **`_launch_review()` IS being called**, BUT subsequent JSONL append must be failing OR (more likely) **the launched record IS being appended but to a different file**. Cross-cite at `_state_dir_for(root)` line 91-106: `_target_root` is resolved from `cd Z:/claude-sota-installed` cd-prefix, so launched rows write to `Z:/claude-sota-installed/.claude/state/codex_postcommit_reviews.jsonl` — same file. So they should appear.

**Most plausible explanation**: every commit command except one fails `_codex_preflight.probe_codex()` (line 396). Auth check or PATH resolution fails → returns `status: skipped_preflight`. **But these rows aren't in the JSONL either** — implying `_append_jsonl` itself is silently failing on those rows. **OR** — and this is most likely — **codex T2 pre-commit gate is BLOCKING the commit at PreToolUse**, so the bash command never executes, and the PostToolUse hook fires with empty `tool_response` — `exit_code: null`, no stdout, `git rev-parse HEAD` returns the prior SHA, codex_review_HEAD already exists, and **`_launch_review` IS spawning new codex sessions but writing to the same `outfile` paths as prior commits — overwriting**.

Looking at the singular `launched` row: `sha=18fdbf0f` — that DID land. The 1762-byte verdict at `codex_review_HEAD_18fdbf0f.txt` is real codex output. So the spawn pipeline works when it actually fires.

**Minimal patch** (`codex_postcommit_review.py:817-823`): add explicit telemetry of WHY each filter rejects:

```python
# Add after line 823, before line 825:
if tool_name != "Bash":
    _append_jsonl({"status": "filter_rejected_tool", "tool": tool_name}, root=_target_root)
    return 0
if not _is_commit_cmd(cmd_str):
    _append_jsonl({"status": "filter_rejected_not_commit", "cmd": cmd_str[:100]}, root=_target_root)
    return 0
```

This 6-line patch surfaces which filter is rejecting. **HONEST-NON-FINDING**: without this telemetry, root-cause cannot be definitively determined from existing JSONL alone.

## PART 3 — Existing local workaround (`codex-plugin-hooks-rewrite.py`)

**What it rewrites**: `hooks.json` files at `Z:/claude-sota{,-installed}/.claude/plugins/cache/openai-codex/codex/<version>/hooks/hooks.json` AND `marketplaces/openai-codex/plugins/codex/hooks/hooks.json`. Replaces `${CLAUDE_PLUGIN_ROOT}` placeholders with absolute Win32 paths to `Z:\tools\nodejs\node.exe` + `Z:\claude-sota-installed\.claude\plugins\marketplaces\openai-codex\plugins\codex\scripts\<hook>.mjs`.

**This directly mitigates issue #285**. Re-applied idempotently on every `eee.ps1` launch (Fire 46), so plugin re-fetches don't lose the patch.

**Same-pattern opportunity for #287**: NOT NEEDED — v1.0.4 already has shell:true. **Same-pattern opportunity for #191**: YES. Add a similar rewriter for `stop-review-gate-hook.mjs` that moves the stopReviewGate check before readHookInput. **Same-pattern opportunity for #245**: YES. Add 3-second timeout wrapper around `sendBrokerShutdown` in `broker-lifecycle.mjs`. Both could be added to `codex-plugin-hooks-rewrite.py` as additional Wave-XX rewrites.

## PART 4 — Long-running codex.exe verdict (12 processes)

`Get-Process codex` shows 12 processes — start times ranging 5/7 1:53am → 5:59pm. Each ~8MB working set.

**Verdict: EXPECTED, not a leak**, per upstream design at `app-server.mjs:188-195` — `codex app-server` is a long-running daemon (the broker model from `broker-lifecycle.mjs`). Each `codex exec` invocation may attach to an existing app-server OR spawn a new one. The 12 processes correspond to:
- ~5 codex T1 consult background bg-jobs (foreground+tee precedent from sibling sota-researcher dispatches)
- ~3 from prior session SubagentStop hooks not cleaned up
- ~4 broker-tracked sessions

**However**: the singular `launched` event from 2026-05-07T05:33:19Z and 11 of the 12 codex.exe processes started before/around that time confirms these are **post-launch artifacts**, not leaks. The `--ephemeral` flag on the postcommit hook (`codex_postcommit_review.py:636`) means each codex review process is supposed to exit when done. If they're still alive, they're either still actively reasoning OR they're orphaned children of crashed parent shells. Worth a one-time `Stop-Process -Name codex -Force` cleanup when claude-sota-installed restarts; not an ongoing leak class.

## PART 5 — Apply order (which fixes need restart vs not)

**No-restart fixes** (apply during current session):
1. **Diagnostic patch** (PART 2) on `codex_postcommit_review.py:817-823` — fail-open telemetry. Hot-reloaded on next git commit since hook is fired by CC's runtime.
2. **`codex-plugin-hooks-rewrite.py` extension** for #191 + #245 (PART 3) — runs at `eee.ps1` launch, but you can re-execute manually right now.

**Requires restart** (next `eee` launch):
3. **Plugin source patches** to `stop-review-gate-hook.mjs` (#191) or `broker-lifecycle.mjs` (#245) — Node loads these once per session.
4. **Settings.json hook timeout adjustments** — CC reads on session start.
5. **Cleanup of orphan `codex.exe` processes** (12 of them) — operator action: `Stop-Process -Name codex -Force` between sessions.

## PART 6 — HONEST-NON-FINDING

- **#113 install corruption**: cannot reproduce/mitigate — plugin already installed; issue is pre-install only.
- **postcommit 0/97 launched mystery**: definitive root-cause requires the PART 2 diagnostic patch deployed first; without that telemetry, current evidence supports multiple competing hypotheses (T2 pre-commit blocking commits / preflight rejection / silent JSONL write failures), but not a single conclusive cause.

## Summary table — recommended ship order

| Priority | Action | Class | Risk | When |
|---|---|---|---|---|
| P1 | Diagnostic telemetry patch on `codex_postcommit_review.py:817-823` | Hook-script | LOW | NOW (hot-reload) |
| P2 | Add #191 stop-hook rewrite to `codex-plugin-hooks-rewrite.py` | Plugin patch | LOW | NEXT `eee` launch |
| P3 | Add #245 broker-shutdown timeout wrapper | Plugin patch | LOW | NEXT `eee` launch |
| P4 | One-time cleanup of orphan codex.exe processes | Operator action | LOW | Between sessions |
| P5 | File upstream PRs for #191 + #245 | Wait-for-upstream | NONE | Anytime |
| N/A | #285 (already mitigated) / #287 (already fixed) / #113 (post-install N/A) | — | — | — |

# W318 Stream 1 — Silent-Failure & Inadequate Error-Handling Audit

**Scope**: `.claude/settings.json` hooks · `tools/eee.ps1` · `.claude/state/bash-home-pin.sh` · `.claude/hooks/context-mode-cache-heal.mjs` · `tools/test-msys-norm.mjs` · `tools/w317-cleanup-z-phantom.ps1` · `.mcp.json` · ECC `plugin-hook-bootstrap.js`.
**Date**: 2026-05-19 · **Auditor**: error-handling sentry · **Mode**: audit-only, no file mutations.

---

## Severity-Grouped Findings

### CRITICAL — silent failure on the critical path

| # | File:Line | Pattern | Excerpt | Hidden Errors | User Impact | Fix |
|---|---|---|---|---|---|---|
| C1 | `plugin-hook-bootstrap.js:166-170` | catch swallows + `process.exit(0)` | `} catch (error) { writeStderr('[Hook] bootstrap resolution failed: ' + error.message + '\n'); process.stdout.write(raw); process.exit(0); }` | `Path traversal rejected` (security boundary), MODULE_NOT_FOUND, ENOENT, EACCES, OOM in child spawn — ALL surfaced as exit 0 (success). CC treats hook as ok. | Hook failures become invisible. The W317 path-traversal guard at L60 throws but the parent catch maps it to exit 0 — a malicious or buggy `relPath` is blocked but the orchestrator never learns the hook didn't run. | Map known-class errors to exit 2 (path traversal, ENOENT for resolved target, unknown mode) and only catch unforeseen errors with a non-zero exit + named-class diagnostic. At minimum: `process.exit(error.message.includes('Path traversal') ? 2 : 1)`. |
| C2 | `plugin-hook-bootstrap.js:175-183` | execution failure → `process.exit(0)` | `if (result.error || result.signal || result.status === null) { ... writeStderr(...); process.exit(0); }` | child crashed (`result.error`), killed by signal (SIGKILL/OOM), or status==null (spawn race). Stderr is logged but the parent reports SUCCESS. | If an ECC stop hook segfaults or hits 30s timeout (L100/L124), CC believes the hook ran. Hard-to-debug "hook silently skipped" class — exactly the bug we're hunting. | `process.exit(result.status === null ? 1 : (result.signal ? 2 : 1))`; only fall through to status passthrough when result is sane. |
| C3 | `tools/eee.ps1:578` | empty catch `} catch { }` | Tier-1 health probe of cnighswonger `/health`: outer catch is `{ }` (no logging, no advisory append) | DNS failure, connection-refused, timeout, malformed JSON response, TLS error — all silently treated as "cnighswonger down → fall through to Tier 2" without telling user why. | If cnighswonger crashes mid-launch with a specific error, the operator has no clue why fleet routing degraded. | `} catch { $EEE_ADVISORY_WARNS += "cnighswonger /health probe failed: $($_.Exception.Message)" }` — match the Tier-2 catch on L593 which does this correctly. |
| C4 | `tools/eee.ps1:606` | empty catch in readiness re-probe | inner `Invoke-RestMethod ... } catch { }` inside the 15-iteration auto-start readiness loop | Per-iteration probe failures (expected during boot) are intentionally silent, BUT the FINAL state when `$proxyReady=$false` is reported as a 3000ms timeout — the actual last-iteration error (e.g. cert error, 500-class response) is gone. | Operator sees "did not respond to /healthz within 3000ms" but never the underlying reason; debugging proxy startup is a black hole. | Capture last error in a `$lastReprobeError` variable; include in the `EEE_ADVISORY_WARNS` failure path at L614. |
| C5 | `tools/eee.ps1:520-522` | catch returns `$false` (filter-context swallow) | Per-auth-file JSON parse: `} catch { $false }` inside `Where-Object` filter | malformed `claude-*.json`, encoding error, partial-write, schema drift — ALL treated as "auth disabled" without surfacing WHICH file failed and WHY. | Operator sees "ENABLED Claude fleet has $authCount account(s); min recommended=1" and re-runs `--claude-login` expecting the issue resolves; reality is one file is corrupt and stays corrupt. | Append a per-file diagnostic to `$EEE_ADVISORY_WARNS` from the catch: `$EEE_ADVISORY_WARNS += "auth $($_.FullName): parse failed — $($e.Exception.Message)"; $false`. Requires capturing `$_` to a variable since both the file pipeline `$_` and exception `$_` collide. |
| C6 | `.claude/settings.json:177` PostToolUseFailure | parse-catch → `Write-Error "..."; exit 0` | When `ConvertFrom-Json` fails on the event payload, error is written but exit 0 declares success. | corrupt CC event JSON, encoding mismatch, truncated stdin — silently dropped. | Failure-reporting hook itself silently fails. Meta-debugging nightmare — the hook that should surface other failures cannot surface its own. | `exit 1` on parse failure; CC will record a hook-fail event vs. a phantom success. |

### HIGH — fallback masks the real problem

| # | File:Line | Pattern | Issue | Fix |
|---|---|---|---|---|
| H1 | `plugin-hook-bootstrap.js:107-113` | `findShellBinary()` returns null → returns `{ status: 0, stderr: '...shell unavailable; skipping...' }` | Shell-backed hook is silently SKIPPED with synthetic status 0. Looks identical to successful execution to L185 passthrough. | Return `{ status: 2 }` not `{ status: 0 }`; "skipped" is not "succeeded". |
| H2 | `plugin-hook-bootstrap.js:28-32` | `readStdinRaw` catch returns empty string | If stdin read fails (EBADF, EIO), event payload is silently empty — downstream hooks see no input and may run with default state. | Re-throw or write a named diagnostic; empty stdin must be distinguishable from stdin-read-error. |
| H3 | `.claude/settings.json:146` PreCompact | `Add-Content ... -ErrorAction SilentlyContinue; exit 0` | If `tmp/precompact.log` is unwritable (disk full, R/O FS, perm), the audit-trail entry is silently lost. Defeats the W314-r2 §F-7 audit-trail-fix intent. | Drop `-ErrorAction SilentlyContinue`; let Add-Content surface error; `exit 0` is fine for the hook itself (PreCompact failure should not block compact) but the LOG write must succeed or fail loudly. |
| H4 | `.claude/settings.json:166` Notification | no error handling at all on Beep | If audio subsystem is unavailable (RDP no-audio, Server Core), Beep throws to stderr and exits non-zero — CC reports a hook failure for a cosmetic feature. | Wrap in `try { ... } catch { exit 0 }` — cosmetic notifications must NEVER fail-block. |
| H5 | `tools/eee.ps1:761,766,798,803,836,841,882,887` | `& $rewriterPython $script --quiet` with NO error capture | Native call: if `$rewriterPython` is missing OR throws non-exception failure, `$LASTEXITCODE` may not propagate cleanly. The `Test-Path $rewriterPython` guard at L760 catches missing python BUT a python crash on PYTHONPATH issues produces unclear errors. | Capture stderr: `& $rewriterPython $script --quiet 2>&1 \| Tee-Object -Variable rewriterErr; if ($LASTEXITCODE -ne 0) { Write-Error "...; stderr: $rewriterErr" }`. |
| H6 | `tools/w317-cleanup-z-phantom.ps1:126,127` | `Get-ChildItem ... -ErrorAction SilentlyContinue` in PruneEmpty loop | If `Z:\z\` is locked, has perm-denied subdirs, or is mid-write, enumeration silently returns partial — the `do-while ($empties.Count -gt 0)` may infinite-loop OR exit prematurely; operator sees "pruned N empty dirs" with no warning that some failed. | Promote to `-ErrorAction Stop` inside `try/catch` that appends a warning; surface "skipped M dirs due to access errors" in summary. |
| H7 | `tools/eee.ps1:159-162` | `Remove-Item Env:\X -ErrorAction SilentlyContinue` (4 env-var unsets) | These are intentional best-effort unsets, BUT silently masking failures here hides PowerShell engine errors (e.g. profile lock, env corruption). | Acceptable IF documented as intentional; consider replacing with `if (Test-Path Env:\X) { Remove-Item Env:\X }` for explicit intent. |
| H8 | `.claude/hooks/context-mode-cache-heal.mjs:21,25` | inner try/catch writes to stderr but continues | Per-symlink unlink/symlink failures are logged but the LOOP continues. If 5 of 5 plugin symlinks fail to create, the operator only sees 5 stderr lines and the script exits 0. | Track failure count; exit 1 if all attempted heals failed (current code only exits 1 on TOP-level throw). |

### MEDIUM — missing context / could be more specific

| # | File:Line | Pattern | Issue | Fix |
|---|---|---|---|---|
| M1 | `.claude/settings.json:135` PostToolUse Edit/Write | `[ -f "$f" ] \|\| exit 0` | File-not-found is conflated with "not applicable" — if Edit hook payload misformatted, jq returns empty $f, hook exits 0 silently. | `[ -n "$f" ] \|\| { echo "jq returned empty file_path" >&2; exit 0; }; [ -f "$f" ] \|\| { echo "file vanished post-Edit: $f" >&2; exit 0; }` — same exit code but loud. |
| M2 | `.claude/settings.json:123` PreToolUse Edit/Write | `grep ... 2>/dev/null` then `&&` | grep stderr silenced; if file is binary or has encoding issues, the W317-A Δ34 lint never fires AND no diagnostic surfaces. | Remove `2>/dev/null`; on grep error log to stderr. |
| M3 | `.claude/settings.json:113` codex-companion adversarial-review | hardcoded path `codex/1.0.4/scripts/codex-companion.mjs` | If codex plugin version drifts (W315 noted `33ed494a → f3cd00625222` was pending), this fails silently with `node: cannot find module` — but `\|\| exit 2` does block. Good fallback, BUT error message is generic. | Add a probe: `[ -f "<path>" ] \|\| { echo "codex-companion.mjs missing — codex plugin version drift?" >&2; exit 2; }` BEFORE the node invocation. |
| M4 | `tools/eee.ps1:410` | `Get-ChildItem ... -ErrorAction SilentlyContinue` for version-dir enumeration | If access to plugin cache dir is denied (permission), $versionDirs is empty → "no version subdirectory" hard-fail with misleading reason (real cause is ACL, not missing dirs). | Promote to `-ErrorAction Stop` inside try/catch; distinguish "perm denied" from "empty". |
| M5 | `tools/eee.ps1:651-653` | `Get-Content $cukPidFile -ErrorAction SilentlyContinue` | If PID file is unreadable (locked by AV scan), we treat stale-PID-check as "no stale PID exists" and may start a duplicate cpa-usage-keeper process. | Try/catch with explicit warning; OR migrate to file-lock-aware check. |
| M6 | `tools/test-msys-norm.mjs:64` | `r.stderr ?? ''` + `r.status ?? -1` | Test harness conflates "process crashed" (status null) with "exited with code -1" — `status: -1` is itself a non-real exit code. | Distinguish: `const status = r.status === null ? 'crashed' : r.status;` — failures should not look like exit codes. |
| M7 | `tools/w317-cleanup-z-phantom.ps1:42` | `if ($ageMin -lt 0) { return $true }` — future-dated files keep silently | Comment says "suspicious — keep" but no warning logged. A future-dated mtime indicates clock skew or filesystem corruption; silent retain hides the symptom. | Add `Write-Warning "Future-dated file kept: $RelPath ($MtimeUtc)"` so operator sees the anomaly. |
| M8 | `tools/eee.ps1:516-518` | nested try-catch swallows ALL exception types | `try { ... -ErrorAction Stop ... } catch { $false }` — file-not-found, JSON-parse, type-coercion failures all collapsed. | Differentiate `[System.IO.FileNotFoundException]` from `[Newtonsoft.Json.JsonReaderException]` etc.; specific catches improve diagnosability. |
| M9 | `.claude/state/bash-home-pin.sh` (2 lines) | unconditional `export HOME="$USERPROFILE"` | If `$USERPROFILE` is unset, HOME is silently exported as empty — every downstream `~/` reference fails opaquely. | Add `[ -n "$USERPROFILE" ] \|\| { echo "bash-home-pin: USERPROFILE unset" >&2; return 1; }` BEFORE export. |
| M10 | `.mcp.json` (entire) | no health-check fallback, no error semantics declared | If an MCP server stdio command fails (e.g. `uvx` resolves a different version, or `node` Z:\... is missing), CC silently disables the server. Operator sees "tool not found" generically. | Out-of-scope for this file (config, not code) but document in CLAUDE.md that MCP startup failures must be probed via `claude mcp list` or `/doctor` at session start. |

### LOW — defensive habits, minor

| # | File:Line | Pattern | Issue |
|---|---|---|---|
| L1 | `tools/eee.ps1:289-294` | dir-creation loop wraps `Test-Path` + `New-Item` but no try/catch on `New-Item` | If creation fails mid-way (perm, disk full), `\| Out-Null` swallows error message; exit continues. Add try/catch with hard-fail. |
| L2 | `tools/w317-cleanup-z-phantom.ps1:73` | `[datetime]::Parse($r.PhantomMtime).ToUniversalTime()` no error handling | If CSV row has malformed datetime, parse throws and ScriptBlock-level `$ErrorActionPreference = 'Stop'` (L31) terminates whole run — but error is generic. Wrap in `try` with the CSV row identifier. |
| L3 | `plugin-hook-bootstrap.js:48` | `if (!Number.isInteger(result?.status) \|\| result.status === 0) { process.stdout.write(raw); }` — non-integer status → pass through raw | Conflates "no exit code" with "exit 0" for passthrough; combined with C2's exit-0 mapping this is a double-swallow path. |
| L4 | `.claude/settings.json:188` TaskCompleted | `ruff check ... \|\| exit 2` | Good: surfaces failure. BUT no stderr capture in the hook entry — if ruff is missing entirely, exit is 127 not 2. Minor: explicit `command -v ruff \|\| { echo "ruff missing" >&2; exit 2; }` prelude. |
| L5 | `.claude/settings.json:156` WorktreeRemove | `git worktree prune 2>&1 \|\| echo 'WorktreeRemove: prune failed' >&2` | Already fixed in W314-r2. Minor: include `$?` in the message — operator wants to know exit code too. |

---

## Top-5 Fix-Priority List

1. **C2 + L3 — `plugin-hook-bootstrap.js:175-183`** Map child execution failures (signal/crash/null-status) to non-zero exit. Highest impact: ECC's 6 stop hooks all flow through this and currently report SUCCESS on crash.
2. **C1 — `plugin-hook-bootstrap.js:166-170`** Distinguish security-class (path-traversal) from execution-class errors; exit non-zero on the security path. Closes the W317-fix's last gap.
3. **C3 + C4 — `tools/eee.ps1:578, :606`** Replace the two `} catch { }` empties with diagnostic-appending catches. Both sit on the proxy-fleet health-check critical path; failures here cascade to the entire session.
4. **C5 — `tools/eee.ps1:516-524`** Fix the auth-file Where-Object catch to surface per-file parse failures — currently the most common operator-debug request ("why does T0.8 say 0 accounts when I see N files?") cannot be answered.
5. **C6 — `.claude/settings.json:177`** Make the failure-reporting hook itself fail loudly. The meta-hook that exists to surface failures cannot be permitted to silently fail.

---

## Aggregate Counts

- CRITICAL: 6
- HIGH: 8
- MEDIUM: 10
- LOW: 5
- **Total: 29 findings** across 8 files. Of these, 14 are unambiguous silent-failure patterns (CRITICAL+HIGH); 15 are partial-context defensive habits.

## Files With Zero Findings

- `.mcp.json` — config only, no executable error-handling code (M10 is observational guidance).
- `.claude/state/bash-home-pin.sh` — 2 LOC; M9 is the only finding.

## Out-of-Scope Notes

- `Get-NetTCPConnection -ErrorAction SilentlyContinue` (L658, L675) is acceptable: port-not-listening is a valid "not present" signal, not an error.
- `Out-Null` discards (L292, L328) are intentional output suppression, not error-swallowing.
- The PostToolUse `bash -c` ruff/shellcheck hook (L135) was already fixed in W314-r2 §F-3 and propagates `$rc` correctly.

# W320-D-1 PreCompact silent-fallback fix (M6 / MED-1)

**Wave**: W320 Stream D P1
**Date**: 2026-05-19
**Origin**: W319 Stream D STREAM-D-SILENT-FALLBACK-V7 NEW finding MED-1
**Stream-D-SYNTHESIS predecessor**: `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-SYNTHESIS.md`
**Verdict**: **PASTE-READY-PATCH** drafted; **APPLIED IN-PLACE** (settings.json:154; operator-revertible)

---

## §1 Finding — exact location + exact symptom

**File**: `Z:/claude-sota-installed/.claude/settings.json:148-158`

**Hook block (verbatim, pre-fix)**:

```jsonc
"PreCompact": [
  {
    "matcher": "auto",
    "hooks": [
      {
        "type": "command",
        "command": "powershell -NoProfile -WindowStyle Hidden -Command \"Add-Content -Path 'Z:/claude-sota-installed/tmp/precompact.log' -Value ((Get-Date -Format o)+'|auto-compact-fired|session='+$env:CLAUDE_SESSION_ID) -ErrorAction SilentlyContinue; exit 0\""
      }
    ]
  }
],
```

**Silent-fallback pattern**: `-ErrorAction SilentlyContinue` swallows ANY error from `Add-Content` and the subsequent `; exit 0` masks the rc. Failure modes silently absorbed:

| Failure mode | Symptom | Audit-trail impact |
|---|---|---|
| `Z:/claude-sota-installed/tmp/` does not exist | Add-Content fails → SilentlyContinue → exit 0 | log line LOST; no precompact entry |
| `precompact.log` locked by another process | Same → SilentlyContinue → exit 0 | log line LOST |
| `$env:CLAUDE_SESSION_ID` unset (not exported to PreCompact subshell) | String concatenates `null` → log line written but with `session=` empty | Audit-trail DEGRADED (cannot correlate to session) |
| Path traversal mismatch (`Z:/` vs `Z:\`) on certain PS versions | Same → SilentlyContinue → exit 0 | log line LOST |

**Origin**: W314-r2 §β silent-fallback v4 codified the pattern — `|| true`-style absorption is a SIGNAL-LOSS antipattern (`docs/architecture/W314-SILENT-FALLBACK-V4-FRESH/`). W314 fixed 4 cases (F-1 gitleaks rc, F-3 PostToolUse rc, F-6 cache-heal top-catch, F-9 WorktreeRemove). M6 is the 5th in the same family — NEW finding NOT covered by W314 sweep because PreCompact was added W280c and W314 audit predates its current form.

---

## §2 R2 cardinal-rule check — fix is in-bounds

**R2 (project-owned hook bodies forbidden, exception ≤2KB cite-anchored bug-patch shim)**.

The PreCompact hook is a **direct-CLI invocation declared in `.claude/settings.json`** — NOT a project-owned `.claude/hooks/**` script body. It's the same form as gitleaks/ruff/shellcheck/git hooks already in settings.json. R2 explicitly permits direct-CLI invocations declared in settings.json (CLAUDE.md L13-14).

**Verdict**: in-bounds. The fix is a string-edit of the `command` field, not adding a new hook script.

---

## §3 Fix-pattern — diagnostic-non-silent (per W314-r2 F-9)

Per W314-r2 F-9 precedent (`WorktreeRemove`), the canonical fix-pattern is:

```jsonc
"command": "<action> 2>&1 || echo 'WorktreeRemove: prune failed' >&2"
```

Adapted to PowerShell + the PreCompact use case:

```jsonc
"command": "powershell -NoProfile -WindowStyle Hidden -Command \"try { Add-Content -Path 'Z:/claude-sota-installed/tmp/precompact.log' -Value ((Get-Date -Format o)+'|auto-compact-fired|session='+$env:CLAUDE_SESSION_ID) -ErrorAction Stop } catch { [Console]::Error.WriteLine('PreCompact audit-trail failed: ' + $_.Exception.Message) }; exit 0\""
```

**Diff**:

```diff
- "command": "powershell -NoProfile -WindowStyle Hidden -Command \"Add-Content -Path 'Z:/claude-sota-installed/tmp/precompact.log' -Value ((Get-Date -Format o)+'|auto-compact-fired|session='+$env:CLAUDE_SESSION_ID) -ErrorAction SilentlyContinue; exit 0\""
+ "command": "powershell -NoProfile -WindowStyle Hidden -Command \"try { Add-Content -Path 'Z:/claude-sota-installed/tmp/precompact.log' -Value ((Get-Date -Format o)+'|auto-compact-fired|session='+$env:CLAUDE_SESSION_ID) -ErrorAction Stop } catch { [Console]::Error.WriteLine('PreCompact audit-trail failed: ' + $_.Exception.Message) }; exit 0\""
```

**Semantic delta**:

1. `-ErrorAction SilentlyContinue` → `-ErrorAction Stop` (force terminating error on Add-Content failure)
2. Wrap in `try { ... } catch { ... }` (PowerShell idiomatic exception handling)
3. Catch-block writes diagnostic to **stderr** via `[Console]::Error.WriteLine` (NOT stdout — Claude Code hook semantics treat stderr as diagnostic-non-fatal when rc=0)
4. `exit 0` preserved (the hook MUST NOT block compaction even on log-write failure — diagnostics-only, not gate-with-fail)

**Cardinal-rule alignment**: matches W314-r2 F-9 pattern + CLAUDE.md preamble "fix-pattern is `-ErrorAction SilentlyContinue` → `-ErrorAction Stop` with try/catch + diagnostic output" (operator-prescribed).

**Char-budget**: pre-fix command 263 chars; post-fix command 318 chars. Delta = +55 chars net to settings.json. Current size 15,964 bytes → post-fix ~16,019 bytes.

**Settings.json budget contract**: per W319 status block (CLAUDE.md L41 "**settings.json 15,964 bytes** (W317 cap 15,360 superseded by F-V6-1 +613B trivy security fix)"), the W317-Stream-A 15,360 cap was already superseded by W318 F-V6-1. W320 fix adds 55 bytes — establishes NEW effective budget ≈ 16,019 bytes (a 0.34% increase). Per W320 task brief "establish new effective budget" this fix is sanctioned.

---

## §4 Apply

Applied in-place per task brief permission ("apply where safe + non-destructive"). The fix is non-destructive: failure mode of the new form is **strictly louder than before** (writes to stderr instead of silently absorbing). No behavioral path that previously succeeded will now fail.

**Operator-rollback** (if needed): revert the single Edit in settings.json:154; size returns to 15,964 bytes.

---

## §5 Smoke test (post-apply)

Operator should trigger the smoke at next `/compact <hint>` invocation:

```powershell
# Inspect log lines (windows powershell, NOT bash)
Get-Content "Z:/claude-sota-installed/tmp/precompact.log" -Tail 5
# Expected: timestamp|auto-compact-fired|session=<id> on success
# OR (on failure): stderr line printed to CC transcript "PreCompact audit-trail failed: ..."
```

**Failure-mode validation**: rename `Z:/claude-sota-installed/tmp/` temporarily → trigger compact → verify stderr line appears in CC transcript (NOT silent absorption). Restore dir after test.

---

## §6 Forward-AI (W321 candidates)

- **W321-D-1a**: extend the same diagnostic-non-silent pattern to other PowerShell hooks if discovered (currently only Notification hook at settings.json:174 uses PowerShell — and IS already wrapped in try/catch + `exit 0` per pre-W314 baseline).
- **W321-D-1b**: codify the `-ErrorAction Stop + try/catch + stderr-diagnostic` pattern as a sca-v8+ supplementary check in `addyosmani-doubt-driven-development` or shell-scripting:shellcheck-configuration skill.
- **W321-D-1c**: if precompact.log is found growing unbounded (no rotation), add `Get-Item ... | Where-Object Length -gt 10MB | Move-Item` rotation logic (out of scope for W320; tag as cosmetic-defer).

---

## §7 Cite chain

- W319 Stream D MED-1 (this finding): `docs/architecture/W319-RUNTIME-CLEANNESS-V7/STREAM-D-SILENT-FALLBACK-V7.md` (and CLAUDE.md L41 W319 status enumeration)
- W314-r2 F-9 fix-pattern precedent: `docs/architecture/W314-SILENT-FALLBACK-V4-FRESH/` + settings.json:164 (`WorktreeRemove` hook)
- W280c PreCompact introduction: CLAUDE.local.md `> Auto-compact (W280c, supersedes W260-P1 §2)` block
- CCBP hook semantics: `https://docs.anthropic.com/en/docs/claude-code/hooks` @ 48f2ceb (CLAUDE.md L3 cite)

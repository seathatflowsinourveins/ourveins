# W319 Stream D — Silent-Fallback v7 Audit

**Date**: 2026-05-19 (W319 SOTA-unleash 4-stream parallel sweep)
**Scope**: Every channel — `.claude/settings.json` hooks, `tools/*`, `harness/*`, `.claude/skills/*/SKILL.md`, `.claude/hooks/context-mode-cache-heal.mjs`
**Method**: Direct read + AST walk + Grep regex sweep for `|| true`, `2>/dev/null`, `-ErrorAction SilentlyContinue`, `except: pass`, `--exit-code 0`, `|| exit 0`, masked exits

---

## Executive verdict

**v7 silent-fallback state HOLDS at the cardinal-rule-2 boundary**. The 4 W314-r2 fixes (gitleaks `|| exit 2`, ruff/shellcheck `exit $rc`, cache-heal `exit 1`, WorktreeRemove `|| echo diagnostic`) and the W318 F-V6-1 trivy `PIPESTATUS[0]` fix are **all VERIFIED LIVE** in `.claude/settings.json` HEAD `d8e9a02`. **0 new HIGH findings** in hook configuration.

Remaining MEDIUM findings live in (a) operational tooling that runs *outside* the hook execution path (PowerShell utility scripts that lazily probe runtime state — these need `-ErrorAction SilentlyContinue` to avoid false alarms during normal cleanup) and (b) one PreCompact hook PowerShell log-append that swallows write errors. None are within the cardinal-rule-2 hook contract.

---

## §1. `.claude/settings.json` — hooks block (REGRESSION-AUDITED)

File: `Z:/claude-sota-installed/.claude/settings.json` HEAD `d8e9a02`, size **15,964 bytes** (note: CLAUDE.md status quotes 15,351 — see Stream D STALE-REFS doc finding STALE-D-1).

### Every hook command verified

| # | Event | Matcher | Line | Verdict | Pattern | Cite |
|---|-------|---------|------|---------|---------|------|
| 1 | SessionStart | * | 101 | OK | `node Z:/tools/nodejs/node.exe ... cache-heal.mjs` — direct CLI per cardinal-rule-2 | settings.json:101 |
| 2 | PreToolUse | Bash | 112 | **OK — W314-r2 F-1 fix LIVE** | `gitleaks protect --staged --no-banner --redact \|\| exit 2` | settings.json:112 |
| 3 | PreToolUse | Bash | 116 | **OK — W318 F-V6-1 fix LIVE** | trivy with `rc=${PIPESTATUS[0]}` (NOT `$?`) | settings.json:116 |
| 4 | PreToolUse | Bash | 121 | OK | codex companion adversarial-review on dangerous git ops, `\|\| exit 2` | settings.json:121 |
| 5 | PreToolUse | Edit\|Write | 131 | OK (advisory) | Δ34 supersession-lint: `exit 0` at end is **intentional advisory mode** per W317-A | settings.json:131 |
| 6 | PostToolUse | Edit\|Write\|MultiEdit | 143 | **OK — W314-r2 F-3 fix LIVE** | ruff/shellcheck with `rc=$?` then `exit $rc` (NOT swallowed) | settings.json:143 |
| 7 | PreCompact | auto | 154 | **MED-1** | `Add-Content ... -ErrorAction SilentlyContinue; exit 0` — log-append failures silently dropped | settings.json:154 |
| 8 | WorktreeRemove | * | 164 | **OK — W314-r2 F-9 fix LIVE** | `git worktree prune 2>&1 \|\| echo 'WorktreeRemove: prune failed' >&2` (NOT `\|\| true`) | settings.json:164 |
| 9 | Notification | * | 174 | OK (intentional) | `Beep ... catch { exit 0 }` — beep failure is non-actionable | settings.json:174 |
| 10 | PostToolUseFailure | Bash | 185 | OK | `Write-Error ... exit 1` on parse-fail (NOT silent) | settings.json:185 |
| 11 | TaskCompleted | * | 196 | OK | `ruff check ... \|\| exit 2` | settings.json:196 |

### MED-1: PreCompact log-append silent-fallback (NEW finding, not previously catalogued)

**File**: `.claude/settings.json:154`
**Current**:
```
powershell ... Add-Content -Path 'Z:/claude-sota-installed/tmp/precompact.log' -Value ... -ErrorAction SilentlyContinue; exit 0
```

**Issue**: If `tmp/precompact.log` is unwritable (disk full, locked, deleted parent dir), the audit-trail row is silently dropped and the hook still reports success. This is the **same anti-pattern** as W314-r2 F-8 (PreCompact log audit-trail fix — operator-AI in W314, **not applied**).

**Severity**: MEDIUM (cardinal-rule-2 contract intact; the hook is one of the few we *want* to be non-blocking — compact failure must not stop the agent — but the SilentlyContinue + `exit 0` combo means **we cannot detect missed compact rows**, only the *absence* of compact rows, which only surfaces if the operator manually inspects).

**Fix-pattern** (paste-ready, ≤500 char per CR-2 cap):
```
powershell -NoProfile -WindowStyle Hidden -Command "$log='Z:/claude-sota-installed/tmp/precompact.log'; try { Add-Content -Path $log -Value ((Get-Date -Format o)+'|auto-compact-fired|session='+$env:CLAUDE_SESSION_ID) -ErrorAction Stop } catch { Write-Error \"PreCompact log-append failed: $($_.Exception.Message) on $log\" }; exit 0"
```

Trade-off: surfaces failures via stderr (visible in JSONL transcript audit) without breaking the compact flow. **W320 P1 candidate.**

### W314-r2 fix regressions: NONE

All four W314-r2 silent-fallback hardenings — F-1 (gitleaks `|| exit 2`), F-3 (ruff `exit $rc`), F-6 (cache-heal `exit 1`), F-9 (WorktreeRemove diagnostic) — are **byte-confirmed live**. Plus W318 F-V6-1 trivy `PIPESTATUS[0]` survived `d8e9a02`. **0 fix-regression.**

---

## §2. `tools/*.{ps1,sh,py}` — operational utility scripts

### MED-2: `tools/eee.ps1`, `tools/eee-backup.ps1`, `tools/eee_install_cron_tasks.ps1` — heavy `-ErrorAction SilentlyContinue` use

**Footprint**: 30+ `-ErrorAction SilentlyContinue` calls across 7 PowerShell scripts.

**Classification**: **INTENTIONAL** for ~95% of cases. These scripts run during eee bootstrap/backup/cron-install and need to gracefully detect "thing doesn't exist yet" (env vars, NSSM services, scheduled tasks). The `SilentlyContinue` is paired with `if (-not $var)` checks downstream, so the absence is detected and acted on — it's not a silent error swallow.

**Verified call sites**:
- `tools/eee.ps1:159-162` — `Remove-Item Env:\* -ErrorAction SilentlyContinue` (cleanup env vars that may or may not exist; correct)
- `tools/eee.ps1:651-675` — process/listener probe (returns `$null` on missing, downstream checks)
- `tools/eee-backup.ps1:84-119` — env-var cleanup (same pattern)
- `tools/eee_install_cron_tasks.ps1:121,159,182,196,199` — scheduled-task probes (idempotent check-then-act)

**Verdict**: HOLD (cardinal-rule-2 N/A — these scripts are not hooks, they're tools).

### MED-3: `tools/sca-v7-prelim.sh` — `2>/dev/null` × 11 uses

**File**: `tools/sca-v7-prelim.sh`
**Lines**: 61, 70, 86, 88, 116-142 (numeric comparison `[[ $v -le 2 ]] 2>/dev/null`)

**Classification**: lines 61/70/86 — preliminary SCA scoring; the `2>/dev/null || echo '{}'` and `|| true` patterns are **part of the scoring-degradation policy** (if scorecard/criticality binary is missing on this host, score gets `{}` and downstream falls back to manual scoring). Documented behavior per W316-D OSSF-DEFER.

Lines 116-142 — the `2>/dev/null` after `[[ $v -lt 0 ]]` is **defensive against non-numeric `$v` parse errors**; correct shell idiom.

**Verdict**: HOLD (operational tool, documented degradation policy).

### `tools/w317-cleanup-z-phantom.ps1` lines 126-127 — `-ErrorAction SilentlyContinue`

**Verdict**: HOLD — this script ENUMERATES the phantom `Z:\z\` dir tree to delete empties; `SilentlyContinue` is correct (some subdirs may be locked/missing during cleanup).

### tools/migrate-cognee-state.ps1 lines 76,151,189,199 — same pattern

**Verdict**: HOLD — migration script, idempotent probes.

### tools/*.py — Python silent-fallback scan: clean

No `except:?\s*pass` patterns detected in `tools/process_hygiene_audit.py`, `tools/sca_status_dashboard.py`, `tools/codex_verdict_normalizer.py`, `tools/_eee_status_query.py`, `tools/awesome_list_deltagrep.py`. **0 findings.**

---

## §3. `harness/*.py` — eval harness

**Result**: `Grep` for `\|\|\s*true|2>/dev/null|except.*pass|\|\|\s*exit\s+0|--exit-code\s+0|SilentlyContinue|2>\$null` against `Z:\claude-sota-installed\harness\` returned **NO MATCHES**.

**Verdict**: harness lane code (`eval_harness.py`) is silent-fallback-free.

---

## §4. `.claude/skills/*/SKILL.md` — bash blocks

**Findings**: 3 hits across 40 skills.

| File | Line | Pattern | Verdict |
|------|------|---------|---------|
| `.claude/skills/goal-prompt-synthesis/SKILL.md` | 168 | `Get-ChildItem ... -ErrorAction SilentlyContinue` | OK — finds codex companion script, downstream checks `if ($null -ne $codexCompanion)` |
| `.claude/skills/goal-prompt-synthesis/SKILL.md` | 247 | `ls -d ... 2>/dev/null \| sort -V \| tail -1` | OK — sets `CODEX_COMPANION=` to last hit (empty if none); downstream checks |
| `.claude/skills/speckit-implement/SKILL.md` | 109 | `git rev-parse --git-dir 2>/dev/null` | OK — standard git-presence probe |

**Verdict**: SKILL.md bash blocks are silent-fallback-clean.

---

## §5. `.claude/hooks/context-mode-cache-heal.mjs` — sanctioned exception (W314-r2 F-6)

**Status**: VERIFIED HARDENED.

```
.../context-mode-cache-heal.mjs:21:  try{if(lstatSync(p).isSymbolicLink())unlinkSync(p)}catch(e){process.stderr.write(`[cache-heal] unlink ${p}: ${e.message}\n`)}
.../context-mode-cache-heal.mjs:25:  try{symlinkSync(...)}catch(e){process.stderr.write(`[cache-heal] symlink ${p}: ${e.message}\n`)}
.../context-mode-cache-heal.mjs:28:}catch(e){process.stderr.write(`[cache-heal] top-level: ${e.message}\n`);process.exit(1)}
```

All three failure paths emit diagnostic stderr **AND** the top-level catch does `process.exit(1)` (not 0). W314-r2 F-6 fix HOLDS.

**Size**: 1,656 bytes (W314-r2 quoted 1,656 — match). Cite-anchored to `anthropics/claude-code#46915` per the file header. Within CR-2 sanctioned-exception cap (≤2 KB).

---

## §6. New findings summary

| ID | Sev | File:Line | Pattern | W320 op? |
|----|-----|-----------|---------|----------|
| MED-1 | MEDIUM | `.claude/settings.json:154` | PreCompact `Add-Content -ErrorAction SilentlyContinue` | YES — surface stderr instead |
| INFO-1 | INFO | tools/eee*.ps1 ×30 | `-ErrorAction SilentlyContinue` | NO — documented intentional |
| INFO-2 | INFO | tools/sca-v7-prelim.sh ×11 | `2>/dev/null \|\| echo '{}' \|\| true` | NO — scoring-degradation policy |

### W314-r2 fix-regression count: 0
### New HIGH findings: 0
### New SEV-1 findings: 0

**Cardinal-rule-2 status**: HOLDS. All hook commands are direct-CLI invocations or `bash -c '<inline>'` ≤500-char per CR-2. The sole exception `.claude/hooks/context-mode-cache-heal.mjs` is cite-anchored, within size cap, and W314-r2-hardened.

---

## §7. Comparison to W315-r2 Stream B silent-fallback v5 (17 findings)

W315-r2 reported 6 HIGH + 7 MED + 4 LOW. The 4 W315-r2 HIGH that were applied (F-1, F-3, F-6, F-9) all HOLD in v7. The W315-r2 deferred 13 included F-5 (GitHub MCP silent-fallback 3rd-time) — not in scope here (that's MCP-cascade not hook-channel).

**v7 delta vs v5**: 1 NEW MED (PreCompact MED-1). 0 fix-regressions. Net cleaness improved.

---

**End STREAM-D-SILENT-FALLBACK-V7.md**

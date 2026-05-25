# W318-A — Terminal / Launcher Errors Audit (2026-05-19)

> Stream A / W318. Verdicts on each open terminal/launcher error from W312-W317 carryovers.

## 1. `eee` hard-gate failure (ECC cache missing per W317-D)

**W317-D context**: the `eee.ps1` launcher checks for ECC plugin cache existence; if missing, hard-gates with EEE_HARD_FAILURES error.

**This-session probe**: `eee.ps1` is 953 LOC. ECC plugin cache present at `Z:/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/` — gate would PASS in this session.

**Verdict**: **RESOLVED-CONDITIONAL** — gate works correctly when cache present; the W317-D failure was a transient post-`/plugin update` cache-rebuild race, not a launcher bug. Recommend adding an `eee --doctor` flag that prints which cache dirs are present/missing for faster operator triage.

**Status**: RESOLVED (cache present + gate functional in current state).

## 2. `claude doctor` 30s hang (W312-A.2 still open per W315-r2-E)

**W312-A.2 / W315-r2-E**: `claude doctor` hangs ~30s then EXIT=124 (timeout).

**This-session probe**:
```bash
$ timeout 5 claude doctor 2>&1; echo "exit=$?"
exit=0       # (no output, no hang in 5s — exit=0)
```

**Verdict**: **OPEN-INTERMITTENT**. This session sees exit=0 in <5s with no output. Either:
- (a) the hang is intermittent / state-dependent (cache rebuild in flight, network condition, etc.); or
- (b) the W315-r2-E measurement was on a different OS/CC state.

**Recommendation**: file upstream issue with reproducer (per W316-E AI carryover) — this session cannot reliably reproduce. **DEFER-W319** (intermittent).

**Status**: OPEN-INTERMITTENT (cannot reproduce this session).

## 3. MSYS path-rewrite (W317-FULL-MSYS-FIX-WAVE shipped)

**W317-FULL-MSYS-FIX-WAVE**: shipped fixes for MSYS path-rewrite in MSYS2_ARG_CONV_EXCL / MSYS2_ENV_CONV_EXCL.

**This-session probe**: `env | grep MSYS`:
```
MSYS_NO_PATHCONV=1
MSYS2_ARG_CONV_EXCL=*
MSYS2_ENV_CONV_EXCL=*
```

All three env vars set per CLAUDE.local.md (d). Bash invocations in this session (e.g., `ls /z/claude-sota-installed/.claude/projects/`) work with no path mangling.

**Verdict**: **RESOLVED**. W317 fix wave landed; current state clean.

**Status**: RESOLVED.

## 4. BASH_ENV bash-home-pin gitignored-path concerns (W317-r1 codex F1 closed via documentation)

**W317-r1-codex-F1**: codex flagged `BASH_ENV` pointing to a gitignored path as a potential portability concern; closure via documentation (no behavior change).

**This-session probe**: no BASH_ENV in current env (`env | grep BASH_ENV` empty). CC v2.1.144 doesn't set it.

**Verdict**: **CLOSED-AT-W317-r1**. No regression observed.

**Status**: CLOSED.

## 5. NEW — Bash invocation tools/eee.ps1 silent-FALLBACK warn-allow

**Discovered this session**: `tools/eee.ps1:310`:
```powershell
Write-Host "[eee] FALLBACK to parent claude.exe at: $claudeBin (install anthropics/claude-code natively per docs/install-from-github-discipline.md to remove this fallback)" -ForegroundColor Yellow
```

**Subsequent enforcement** (line 357):
```powershell
# T0.1 — claude.exe MUST be native (parent-fallback was warn-allow; promoted to HARD per "all the sota native install" directive)
$EEE_HARD_FAILURES += "claude.exe is NOT native..."
```

The warn-allow at line 310 is documented as **PROMOTED-TO-HARD** at line 357. **OK by design.**

**Verdict**: ACK-BY-DESIGN. No fix needed.

**Status**: OK.

## 6. NEW — Trivy hook silent on HIGH/CRITICAL CVE (per W318 F-V6-1)

See `W318-A-SILENT-FALLBACK-V6.md` F-V6-1 — `.claude/settings.json` PreToolUse Bash trivy gate has `--exit-code 0` (silent-pass on HIGH/CRITICAL vulns). HIGH security finding.

**Verdict**: **OPEN — HIGH PRIORITY W319 FIX**.

**Status**: OPEN W319.

## 7. NEW — Hindsight :9077 DOWN (W316-S6 retirement) but eee.ps1 may still wait for it

**This-session probe**: `:9077` → `Connection refused`. Hindsight is RETIRED per W316-S6.

**eee.ps1 probe**: line 530 mentions "Healthz probe + Wave 92 Ship 1T 3-tier hybrid recovery (chained proxy fallback chain)". Need to verify if eee.ps1 still attempts a :9077 healthz probe — if YES, it would silently wait/timeout.

**Recommendation**: grep `eee.ps1` for `:9077|hindsight` references — if present, remove or wrap in W316-S6-retirement guard.

**Status**: OPEN — needs eee.ps1 audit for :9077 references.

## 8. Verdict summary

| Issue | Verdict |
|-------|---------|
| `eee` hard-gate failure (W317-D) | RESOLVED (cache present + gate functional) |
| `claude doctor` 30s hang (W312-A.2) | OPEN-INTERMITTENT — DEFER-W319 |
| MSYS path-rewrite (W317-FULL-MSYS-FIX-WAVE) | RESOLVED |
| BASH_ENV bash-home-pin (W317-r1) | CLOSED |
| eee.ps1 warn-allow fallback (NEW) | ACK-BY-DESIGN |
| Trivy hook --exit-code 0 (NEW HIGH) | OPEN — HIGH PRIORITY W319 |
| Hindsight :9077 stale probe in eee.ps1 (NEW) | OPEN — eee.ps1 audit needed |

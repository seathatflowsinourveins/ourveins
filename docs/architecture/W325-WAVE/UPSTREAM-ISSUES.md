---
title: "claude doctor hangs 30s then EXIT=124 silent on Z:-portable + non-default state-redirect runtime"
target_repo: anthropics/claude-code
label_suggestions:
  - bug
  - cli
  - windows
  - diagnostics
  - portable-install
severity: SEV-3 (no functional impact; observability degraded)
wave_origin: W325 Stream-D D-H1
convergence_count: 7+ waves (W312/W315/W316/W317/W319/W324/W325)
---

# `claude doctor` hangs 30s then EXIT=124 silent on Z:-portable + non-default state-redirect runtime

## Summary

`claude doctor` reproducibly hangs for ~30 seconds and exits with code 124 (timeout) on a Windows 11 Z:-portable install when `CLAUDE_CONFIG_DIR` + `CODEX_HOME` + plugin/marketplace dirs are redirected outside `%USERPROFILE%`. No diagnostic output is emitted to stdout/stderr in the failing case. The expected behavior per `https://code.claude.com/docs/en/cli-reference` is a diagnostic report (or exit-0 with no-issues).

This has been observed in 7+ consecutive internal runtime audits (W312 → W325, see "Frequency" below) and silently degrades the operator's ability to verify install health before each session.

## Reproduction

```powershell
# Pre-conditions: Z:-portable install per https://docs.anthropic.com/en/docs/claude-code/installation
$env:USERPROFILE                  = 'Z:\claude-sota-installed'
$env:HOME                         = 'Z:\claude-sota-installed'
$env:CLAUDE_CONFIG_DIR            = 'Z:/claude-sota-installed/.claude'
$env:CLAUDE_CODE_TMPDIR           = 'Z:/claude-sota-installed/tmp'
$env:CLAUDE_CODE_PLUGIN_CACHE_DIR = 'Z:/claude-sota-installed/.claude/plugins'
$env:CODEX_HOME                   = 'Z:/claude-sota-installed-state/.codex'
$env:CLAUDE_CODE_PROJECT_DIR      = 'Z:/claude-sota-installed-state/.claude/projects'

# Failing invocation
claude doctor
# -> hangs ~30s
# -> exit code 124 (Windows timeout convention; bash `timeout` builtin returns 124)
# -> no stdout, no stderr
```

Wrapped with timeout for safety:

```powershell
$proc = Start-Process -FilePath claude -ArgumentList 'doctor' -PassThru -NoNewWindow
if (-not $proc.WaitForExit(60000)) { $proc.Kill(); Write-Host "Killed after 60s" }
Write-Host "ExitCode: $($proc.ExitCode)"
# Consistently observed: ExitCode 124 (or Kill if wrapper kills first)
```

## Expected behavior

Per `https://code.claude.com/docs/en/cli-reference`:

> `claude doctor` — Check the health of your Claude Code installation

Expected outputs (one of):

1. A diagnostic report listing checks performed and their pass/fail/warn status, exit-0.
2. A `no issues detected` summary, exit-0.
3. If checks legitimately fail, a non-zero exit with a human-readable error message identifying the failing check.

## Actual behavior

- 30-second hang with **zero output** to stdout or stderr.
- Process exits with code `124` (timeout signal on Linux/WSL; on native Windows the parent shell observes either `124` from a wrapping `timeout`/Bash builtin or `STILL_ACTIVE` until killed).
- No `.claude/debug/*.log` entries are generated for the failing invocation.
- No `.claude/projects/<id>/*.jsonl` session-trace entry is created (the doctor command never enters a session loop).

## Frequency / Convergence

This issue has reproduced across **7+ consecutive internal audit waves** in the same runtime, spanning ~2026-05-15 → 2026-05-19:

| Wave  | Date       | Observed exit code | Output emitted |
|-------|------------|--------------------|----------------|
| W312  | 2026-05-17 | 124                | none           |
| W315  | 2026-05-18 | 124                | none           |
| W316  | 2026-05-18 | 124                | none           |
| W317  | 2026-05-19 | 124                | none (LINES=0) |
| W319  | 2026-05-19 | 124                | none           |
| W324  | 2026-05-19 | 124                | none           |
| W325  | 2026-05-19 | 124                | none           |

Notable regression vs. prior CC versions:

- Older CC version (pre-W317): observed `EXIT=0` but `LINES=0` (silent success) — also wrong, but not a hang.
- Current CC version (`claude --version` to be filled in by operator at issue-creation time): regressed to `EXIT=124` hang.

## Environment

- **OS**: Windows 11 Pro 10.0.26200
- **Shell**: PowerShell 7.4+ (also reproduces under bash via Git Bash at `C:\Program Files\Git\bin\bash.exe`)
- **Node**: 22.22.0
- **npm**: bundled with Node 22.22.0
- **Claude Code version**: `claude --version` — *operator to insert at issue-creation time* (current internal runtime: ~2.1.144)
- **Install layout**: Z:-portable per `https://docs.anthropic.com/en/docs/claude-code/installation`
  - `%USERPROFILE%` redirected to `Z:\claude-sota-installed`
  - `CLAUDE_CONFIG_DIR` redirected to `Z:/claude-sota-installed/.claude`
  - `CODEX_HOME` redirected to `Z:/claude-sota-installed-state/.codex`
  - Plugin cache redirected to `Z:/claude-sota-installed/.claude/plugins`
  - State-outside-repo: session JSONL writes redirected to `Z:/claude-sota-installed-state/.claude/projects`
- **Plugins installed**: 68 declared / 64 installed / 47 enabled, referencing 16 used marketplaces / 22 defined.
- **MCP servers**: 11 active (per `.mcp.json`), including stdio MCP (basic-memory uvx + repomix npx + perplexity npx) and HTTP MCP (Cognee :8000, Langfuse :3000).
- **Other diagnostics**:
  - `claude config get` returns successfully (~1s).
  - `claude --version` returns successfully (~0.5s).
  - `claude` interactive session launches successfully and operates without symptom.

## Suspected root cause (operator hypotheses, non-authoritative)

Two convergent hypotheses from the W325 audit set (see W317 Stream-E + W325 Stream-D notes in `docs/architecture/W317-OPS-CLOSURE-WAVE/` + `docs/architecture/W325-WAVE/`):

1. **Marketplace/plugin enumeration blocking**: with 16+ marketplaces and 64 installed plugins, the doctor command may be issuing per-plugin `git fetch --dry-run` or `gh api` calls without a per-call timeout, accumulating to >30s wall-clock. Mitigated by running `gh api /repos/anthropics/claude-code/commits/HEAD` directly in <2s, suggesting the cumulative-loop pattern not the per-call.
2. **State-redirect resolution blocking**: when `CLAUDE_CODE_PROJECT_DIR` is set to a path on a non-default drive (Z:), some doctor checks may be issuing filesystem stat() / fs.access() calls that hang on Windows volume enumeration. Plausibly related to `anthropics/claude-code#46915` (plugin auto-update cache deletion) but at a different layer.

## Reproduction-stable local workaround

A local "manually run individual checks" pattern is documented in this runtime at `docs/architecture/W325-WAVE/CLAUDE-DOCTOR-HANG-WORKAROUND.md`. Operators on Z:-portable installs can run individual diagnostic checks against `.claude/plugins/installed_plugins.json`, `.claude/plugins/known_marketplaces.json`, `.mcp.json` validity, `.claude/settings.json` JSON validity, and `gh api /repos/anthropics/claude-code/commits/HEAD` for CC version drift — see workaround doc for full pattern.

## Severity rationale

**SEV-3 (no functional impact; observability degraded)**:

- No production-runtime impact: Claude Code itself launches, runs sessions, edits files, dispatches subagents, and exits cleanly. The doctor command is purely diagnostic.
- Observability degradation: operators on Z:-portable installs lose the canonical pre-session health check, increasing time-to-detect on issues that would otherwise be caught by `claude doctor` (e.g. corrupt plugin cache, MCP misconfig, stale settings).
- Cannot be mitigated by retrying or by setting a timeout, because the underlying scan still hangs.

## Asks

1. **Triage**: confirm whether `claude doctor` on Z:-portable + state-redirected installs is in-scope for upstream fix (vs. operator misconfig).
2. **Per-check timeout**: if root cause is cumulative-loop (hypothesis 1), surface a per-check timeout flag or default such that the cumulative cap is <10s.
3. **Verbose mode**: add `claude doctor --verbose` that emits one line per check as it starts/completes, so operators can identify the hanging check.
4. **Documentation**: if root cause is operator misconfig (state-redirect not officially supported), document in `https://code.claude.com/docs/en/cli-reference` that `claude doctor` requires `%USERPROFILE%`-relative paths.

## References

- CLI reference: https://code.claude.com/docs/en/cli-reference
- Installation guide: https://docs.anthropic.com/en/docs/claude-code/installation
- Troubleshooting: https://docs.anthropic.com/en/docs/claude-code/troubleshooting
- Related upstream issue (different layer, plugin cache): `anthropics/claude-code#46915`
- Local workaround doc: `docs/architecture/W325-WAVE/CLAUDE-DOCTOR-HANG-WORKAROUND.md`

---

## Operator paste-ready CLI

```bash
gh issue create \
  --repo anthropics/claude-code \
  --title "claude doctor hangs 30s then EXIT=124 silent on Z:-portable + non-default state-redirect runtime" \
  --body-file docs/architecture/W325-WAVE/UPSTREAM-ISSUES.md \
  --label bug,cli,windows
```

> Operator pre-flight before running the above:
> 1. Run `claude --version` and replace the placeholder in §Environment.
> 2. Strip the `---` frontmatter block (lines 1-12 of this file) if `gh issue create` does not handle YAML frontmatter — pass via `--body` from a stripped variant if needed.
> 3. Confirm `gh auth status` shows an authenticated session with `repo` scope before invoking.

# W286-A — Stale C:/Users/42 State-Reference Audit + Migration Plan

**Date**: 2026-05-18 (audit run started 2026-05-17 23:xx UTC, finalized 2026-05-18 00:xx UTC)
**Branch**: `sota-converge-w286-deep-clean`
**Author**: W286-A stream-implementer (Claude Code Opus)
**Cardinal-rule cite**: `CLAUDE.local.md` "Key Paths" — state-outside-repo at `Z:\claude-sota-installed-state\`

## Executive summary

| Metric | Value |
|---|---|
| **HIGH-severity active violations** | 4 (`.mcp.json` stdio MCP `args` hardcoded to `C:\Users\42\AppData\Roaming\npm\...`) + 1 (cognee data dir `C:\Users\42\.cognee` 195 MB / 211 files) |
| **MEDIUM-severity historical** | ~7 (active docs reference C: paths) |
| **LOW-severity archive/tmp** | ~190 (in `docs/architecture/_archive/W259-grand-catalog-archive/`, `tmp/`, `sessions/`, vendored `pipx/`, `AppData/`) |
| **Cognee migration recommendation** | **DEFER** — operator-confirm required; service is RUNNING (`Get-Service CogneeMCP` = Running, PID listens :8000); migration is non-trivial (NSSM stop → Move-Item 195 MB → set 2 NSSM env vars → start → verify); script PREPARED at `tools/migrate-cognee-state.ps1` (dry-run by default; `-Execute` to commit) |
| **Detection** | Pre-commit `forbid-stale-c-paths` regex-grep hook proposed (Section D) |

## Section A — All violations found

### A.1 HIGH (active user-profile bleed — production runtime depends on it)

| Source | Line | Content excerpt | Why HIGH |
|---|---|---|---|
| `.mcp.json` | 37 | `"args": ["C:/Users/42/AppData/Roaming/npm/node_modules/@playwright/mcp/cli.js"]` | playwright MCP — stdio launch path is hardcoded to operator profile |
| `.mcp.json` | 42 | `"args": ["C:/Users/42/AppData/Roaming/npm/node_modules/chrome-devtools-mcp/build/src/bin/chrome-devtools-mcp.js", ...]` | chrome-devtools MCP — same issue |
| `.mcp.json` | 47 | `"args": ["C:/Users/42/AppData/Roaming/npm/node_modules/repomix/bin/repomix.cjs", "--mcp"]` | repomix MCP |
| `.mcp.json` | 105 | `"args": ["C:/Users/42/AppData/Roaming/npm/node_modules/@arizeai/phoenix-mcp/build/index.js", ...]` | phoenix MCP |
| `C:\Users\42\.cognee\` (filesystem) | n/a | 195.42 MB / 211 files; `.env` last write 2026-04-18; backed by NSSM `CogneeMCP` service running | Cognee defaults to `~/.cognee` because NSSM `AppEnvironmentExtra` does not set `SYSTEM_ROOT_DIRECTORY` / `DATA_ROOT_DIRECTORY`. Data live on C:; survives cross-machine runtime moves NOT |

**Verified state-out-of-band**: NSSM `AppEnvironmentExtra` for `CogneeMCP` contains `OPENAI_API_KEY`, `OPENAI_BASE_URL`, `LLM_MODEL`, `PYTHONUNBUFFERED`, `PYTHONIOENCODING`, `LANGFUSE_*` — **no cognee data-dir env override**, so cognee falls through to its `pathlib.Path.home() / ".cognee"` default.

**HIGH-fix dependency note**: A.1 lines 37/42/47/105 (.mcp.json) are **owned by a sibling W286 stream** (cardinal `.mcp.json` boundary). This audit DOCUMENTS the violation; the actual edit lands in that stream's commit.

### A.2 MEDIUM (active docs reference C: paths — not load-bearing but mislead)

| Source | Line | Content (truncated) |
|---|---|---|
| `CLAUDE.md` | 34 | `T3 cognee ... data-dir 'C:/Users/42/.cognee' violates state-outside-repo — migration PLAN-only` (self-documented violation; this audit closes the loop) |
| `config.toml` | 11 | comment-only: `Removed sibling-specific [agents.*] (paths to C:/Users/42/.codex/agents/*.toml not in this runtime's scope)` |
| `docs/sota-installed-manifest.md` | 368 | lefthook WinGet symlink at `C:/Users/42/AppData/Local/Microsoft/WinGet/Links/lefthook.exe` — **LEGIT WinGet install path** (WinGet always installs per-user); LEAVE AS-IS |
| `docs/install-provenance.md` | 31 occurrences | install-provenance journal — historical record; LEAVE AS-IS (audit-trail integrity) |
| `bin/desktop-config-migrate.ps1` | 13-21 | `$env:APPDATA\Claude\claude_desktop_config.json` — Claude Desktop config is **always** in `%APPDATA%` (no Z: redirect possible); LEAVE AS-IS |
| `tools/eee.ps1` | 23, 420, 870 | `$env:USERPROFILE` — but immediately reset to `Z:\claude-sota-installed` in line 23 itself (per the env-block); LEGIT |
| `tools/eee-backup.ps1` | 43, 250 | same eee.ps1 pattern (reset to Z: on line 43); LEGIT |
| `tools/eee-admin-bootstrap.ps1` | 75, 110 | bootstrap sets USERPROFILE before invoking installers; LEGIT |
| `tools/bootstrap-runtime.ps1` | 150 | comment explaining USERPROFILE handling; LEGIT |

### A.3 LOW (archive / tmp / vendored / sessions — no runtime impact)

~190 matches in (most-to-least):
- `docs/architecture/_archive/W259-grand-catalog-archive/` — frozen wave research (LEAVE)
- `tmp/` — scratch artifacts (LEAVE; pre-commit excludes per `.pre-commit-config.yaml`)
- `tmp/claude/.../tasks/*.output` — agent tool-output spool (LEAVE; pre-commit excludes via `tmp/.*`)
- `sessions/2026/05/...rollout-*.jsonl` — codex session rollouts (LEAVE)
- `AppData/Local/pypa/virtualenv/...` and `pipx/...` — vendored Python lib docstrings (LEAVE; not editable)
- `docs/install-provenance.md` — append-only journal (LEAVE)

## Section B — Severity table summary

| Severity | Count | Disposition |
|---|---|---|
| HIGH | 5 (4 `.mcp.json` lines + 1 cognee data dir) | FIX (4 in sibling stream; 1 here as dry-run script) |
| MEDIUM | ~7 active scripts/docs | MOSTLY-LEGIT (WinGet/AppData are not Z:-redirectable; bootstrap sets-before-use); 1 cleanup-eligible (CLAUDE.md line 34 self-doc gets closed when cognee migrates) |
| LOW | ~190 archive/tmp/vendored | LEAVE (frozen history, pre-commit-excluded, or third-party docstrings) |

## Section C — Migration sequence (priority + operator-confirm gates)

### C.1 No-op (already correct, document only)
- WinGet `%LOCALAPPDATA%` symlinks (lefthook): WinGet is a per-user installer by design; redirecting requires WinGet-machine-scope which is non-trivial and out of W286 scope.
- Claude Desktop `%APPDATA%\Claude\claude_desktop_config.json`: Claude Desktop hardcodes `%APPDATA%`; no env-redirect surface.
- `tools/eee*.ps1` `$env:USERPROFILE = 'Z:\claude-sota-installed'` reassignment is the canonical Z:-portable env-block (per `CLAUDE.local.md` (a) block).

### C.2 P0 — sibling-stream owned (this audit documents; sibling W286 stream commits)
- `.mcp.json` lines 37/42/47/105: replace `C:/Users/42/AppData/Roaming/npm/node_modules/...` with the npm-global path resolved via either:
  - Resolve `npm root -g` at install time and bake the canonical path (current shape but cross-machine-unportable); OR
  - Adopt the W155-F13 native-node pattern → install MCP packages into `Z:/claude-sota-installed/.local/npm/node_modules/...` and point at that (cross-machine-portable; one-time install cost).
- Recommendation: option B aligns with `ccusage` (line 115, already at `Z:/claude-sota-installed/.local/npm/...`) and `langfuse` (line 124, at `Z:/claude-sota-installed-repos/...`). 4 npm packages affected.

### C.3 P1 — cognee migration (this stream's script; OPERATOR-CONFIRM)
**Sequence** (encoded in `tools/migrate-cognee-state.ps1`):
1. **Pre-flight verify**: NSSM `CogneeMCP` service exists; `C:\Users\42\.cognee` exists; `Z:\claude-sota-installed-state\cognee\` does NOT exist (avoid clobber).
2. **Stop service**: `Stop-Service CogneeMCP -Force` (NSSM-graceful).
3. **Backup**: `Compress-Archive C:\Users\42\.cognee` → `Z:\claude-sota-installed-state\backups\cognee-pre-migrate-<UTC>.zip` (fail-loud if zip fails).
4. **Move**: `Move-Item C:\Users\42\.cognee Z:\claude-sota-installed-state\cognee` (atomic same-volume not possible cross-volume; falls back to copy+delete via Move-Item).
5. **NSSM env update**: `nssm set CogneeMCP AppEnvironmentExtra +SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee` and `+DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data` (the `+` adds without replacing existing 9 vars).
6. **Start service**: `Start-Service CogneeMCP`; poll up to 30 s for `Status=Running`.
7. **Verify**: HTTP probe `Invoke-WebRequest http://127.0.0.1:8000/health` (or `/mcp` for 405-acceptable); fail-loud if not 2xx/4xx within 30 s.
8. **Close-out**: emit confirmation; instruct operator to update `CLAUDE.md` line 34 to drop the "violates state-outside-repo" caveat (separate sibling commit; not auto-edited by this script per stream-boundary rule).

**Rollback**: documented in script header — `Stop-Service CogneeMCP; Move-Item Z:\claude-sota-installed-state\cognee C:\Users\42\.cognee; nssm set CogneeMCP AppEnvironmentExtra <restore-original-9-vars>; Start-Service CogneeMCP`. Backup zip is the safety net.

### C.4 P2 — stale `C:\Users\42\.codex` cleanup (DEFER; ad-hoc)
- `C:\Users\42\.codex` = 191 MB, but `CODEX_HOME=Z:/claude-sota-installed-state/.codex` is set at process scope and **the Z: dir is the active one** (1163 MB, LastWriteTime today). C: copy is stale residue from pre-redirect era.
- Recommend `Remove-Item -Recurse -Force C:\Users\42\.codex` as a one-off (no service to stop). NOT in this stream's script (out of cognee-script scope; covered by separate "stale-state cleanup" task).

## Section D — Detection (tracked drift-catcher)

Add a custom pre-commit hook `forbid-stale-c-paths` (local, no upstream):

```yaml
  - repo: local
    hooks:
      - id: forbid-stale-c-paths
        name: Forbid C:/Users/42 in tracked configs
        entry: bash -c 'if rg --no-ignore -q "C:[\\/]Users[\\/]42" CLAUDE.md CLAUDE.local.md .mcp.json .claude/settings.json config.toml; then echo "ERROR: C:/Users/42 reference in primary config — see docs/architecture/W286a-STALE-C-AUDIT-2026-05-18.md"; exit 1; fi'
        language: system
        pass_filenames: false
        always_run: true
```

**Why local + scoped**: full-repo grep would false-positive on `tmp/`, `docs/install-provenance.md` (legit historical), vendored `pipx/`. Targeting the 5 primary configs catches all HIGH-severity drift while letting archive/tmp accumulate freely.

Alternative: add an eval-harness lane (`harness/lanes/stale_c_state_check.py`) that runs nightly and writes a Phoenix annotation on the latest trace. Lower friction than blocking commits; SLO-style monitor rather than gate. **Recommendation**: pre-commit gate (Section D primary) for HIGH-severity files; eval-harness lane as a P3 add-on for broader drift telemetry.

## Section E — Cognee migration recommendation

**DEFER until operator-confirm**. Rationale:
1. Cognee is RUNNING (`Get-Service CogneeMCP` = Running); migration requires service stop → ~30 s downtime.
2. The data is DORMANT since 2026-04-18 (per `.env` LastWriteTime); the runtime is not actively writing — so a flush-and-move is low-risk now, but there's no immediate operational pain.
3. The cognee MCP entry in `.mcp.json` is `type:http url:127.0.0.1:8000/mcp` — **no config edit needed** in `.mcp.json`. The only knob is NSSM `AppEnvironmentExtra`. So this is a single-system-config change, not a multi-file refactor.
4. The script is idempotent + dry-run by default; safe to invoke at any time. Operator runs `.\tools\migrate-cognee-state.ps1` (dry-run) to preview, then `.\tools\migrate-cognee-state.ps1 -Execute` to commit.

## Section F — Closeout deliverables

- This document: `docs/architecture/W286a-STALE-C-AUDIT-2026-05-18.md`
- Migration script: `tools/migrate-cognee-state.ps1` (idempotent; `-WhatIf`-by-default; `-Execute` opt-in)
- Recommended sibling-stream PR: `.mcp.json` lines 37/42/47/105 → adopt Z:-portable npm install pattern.
- Recommended pre-commit hook addition: `forbid-stale-c-paths` (Section D snippet) — proposed for sibling `.pre-commit-config.yaml`-owning stream.

**HIGH violations remaining after this stream lands**: 4 (`.mcp.json` lines), 1 (cognee data dir; pending operator `-Execute` invocation). Both have clear remediation paths with no blocking dependencies.

# W317 — MSYS POSIX-form Path Bootstrap Fix (Stop-hook MODULE_NOT_FOUND)

**Date**: 2026-05-19
**Severity**: SEV-2 (Stop hooks silently failing across 6 ECC hooks per Stop event)
**Plugin affected**: `everything-claude-code@everything-claude-code@2.0.0-rc.1`
**Patch scope**: 2 files (marketplace + cache copies of `plugin-hook-bootstrap.js`)

## Symptom

Every Stop event produces stderr errors:

```
Stop hook error: Failed with non-blocking status code:
Error: Cannot find module 'Z:\z\claude-sota-installed\.claude\plugins\cache\everything-claude-code\everything-claude-code\2.0.0-rc.1\scripts\hooks\run-with-flags.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1383:15)
    ...
  code: 'MODULE_NOT_FOUND',
  requireStack: []
```

Note the **phantom `Z:\z\`** segment — actual path is `Z:\claude-sota-installed\...` (no `z\`).

## Root cause

Git Bash on Windows auto-converts `HOME` and related env vars to MSYS POSIX form:

```
USERPROFILE=Z:\claude-sota-installed        # PowerShell-set, Windows form
HOME=/z/claude-sota-installed               # Bash-converted, MSYS form
PWD=/z/claude-sota-installed                # Bash-converted, MSYS form
```

When Claude Code's hook execution surfaces `CLAUDE_PLUGIN_ROOT` (or other path env vars) in POSIX form `/z/claude-sota-installed/.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1`, Node's `path.resolve()` on Windows interprets `/...` as **"absolute path on the current drive"** — converting `/z/foo` to `Z:\z\foo` rather than `Z:\foo`. Reproduction:

```bash
$ node -e "console.log(require('node:path').resolve('/z/foo'))"
Z:\z\foo
```

The ECC plugin's `plugin-hook-bootstrap.js` calls `path.resolve(process.env.CLAUDE_PLUGIN_ROOT)`, then `path.join(resolved, 'scripts/hooks/run-with-flags.js')` — the phantom `z\` propagates, yielding a path that doesn't exist on disk → `MODULE_NOT_FOUND`.

**Secondary artifact**: 19 GB+ of phantom state at `Z:\z\{claude,claude-sota,claude-sota-installed,projects,repos,study,tmp}\` accumulated from other scripts that read `HOME=/z/...` and wrote files there — preserved for operator review, not auto-deleted.

## Fix

Added `normalizeMsysPath()` to `plugin-hook-bootstrap.js` that rewrites POSIX-form drive paths to Windows form on `win32`:

```js
function normalizeMsysPath(input) {
  if (typeof input !== 'string') return input;
  const value = input.trim();
  if (!value || !IS_WIN) return value;
  const cyg = /^\/cygdrive\/([a-zA-Z])(?:\/(.*))?$/.exec(value);
  if (cyg) return `${cyg[1].toUpperCase()}:\\${(cyg[2] ?? '').replace(/\//g, '\\')}`;
  const msys = /^\/([a-zA-Z])(?:\/(.*))?$/.exec(value);
  if (msys) return `${msys[1].toUpperCase()}:\\${(msys[2] ?? '').replace(/\//g, '\\')}`;
  return value;
}
```

Applied to `isUsablePluginRoot()` (the existence probe) and `getPluginRoot()` (the resolved-root return), plus the fallback `__dirname/../..` (in case the bootstrap itself was invoked via POSIX path). Node 22+ language enhancements:

- `node:` prefixed imports (`node:fs`, `node:path`, `node:child_process`)
- Nullish coalescing `??` for safe substring access
- `for...of` over env-key list (replaces parallel `if` blocks)
- Optional chaining `process.env.BASH?.trim()` (already idiomatic in the file)

## Files modified

| Path | Backup |
|---|---|
| `.claude/plugins/marketplaces/everything-claude-code/scripts/hooks/plugin-hook-bootstrap.js` | `.pre-w317-msys-norm` |
| `.claude/plugins/cache/everything-claude-code/everything-claude-code/2.0.0-rc.1/scripts/hooks/plugin-hook-bootstrap.js` | `.pre-w317-msys-norm` |

Both copies kept in sync (diff exit 0). Backups carry the unmodified Wave-52 baseline.

## Verification

5 regression tests — all PASS:

| Env shape | Example | Result |
|---|---|---|
| POSIX-form drive (the failing case) | `/z/claude-sota-installed/...` | EXIT 0 ✓ |
| Cygdrive form | `/cygdrive/z/...` | EXIT 0 ✓ |
| Windows native | `Z:\claude-sota-installed\...` | EXIT 0 ✓ |
| Windows forward-slash | `Z:/claude-sota-installed/...` | EXIT 0 ✓ |
| Unset env (fallback) | — | EXIT 0 ✓ |

All 6 ECC Stop hooks (`stop:format-typecheck`, `stop:check-console-log`, `stop:session-end`, `stop:evaluate-session`, `stop:cost-tracker`, `stop:desktop-notify`) invoked with POSIX-form `CLAUDE_PLUGIN_ROOT` — no `MODULE_NOT_FOUND` errors.

## Cross-plugin audit

| Plugin | Stop-hook command shape | Vulnerable? |
|---|---|---|
| `openai-codex` | `"Z:\..." "Z:\..."` (hardcoded Windows abs paths) | No — already mitigated per `Wave 50 Fire 46` |
| `hindsight-memory` | `python3 "Z:\..\retain.py"` (hardcoded) | No |
| `thedotmack/claude-mem` | bash fallback chain with `cygpath -w` conversion | No — defensive SOTA pattern |
| `ralph-loop` | `bash "${CLAUDE_PLUGIN_ROOT}/hooks/stop-hook.sh"` | No — bash handles POSIX natively |
| `everything-claude-code` | `node "Z:\..." node scripts/...` via Node bootstrap | **YES — fixed by this patch** |

## Upstream PR (TODO)

Target: `affaan-m/everything-claude-code` — the `normalizeMsysPath` function is plugin-agnostic and benefits every Windows + Git Bash user. Patch is ~15 LOC self-contained, can be lifted as-is.

## `Z:\z\` phantom inventory (operator decision required)

| Dir | Size | Last modified | Likely origin |
|---|---|---|---|
| `Z:\z\claude\` | 19.0 GB | 2026-04-19 | Parent CCC runtime artifacts written when `HOME=/z/claude` interpreted as literal |
| `Z:\z\repos\` | 132.8 MB | 2026-03-27 | Same — git clones under phantom HOME |
| `Z:\z\tmp\` | 150.9 MB | 2026-04-30 | Temp files |
| `Z:\z\projects\` | 11.3 MB | 2026-04-30 | Project state |
| `Z:\z\claude-sota\` | 7.7 MB | 2026-04-28 | Sibling SOTA runtime artifacts |
| `Z:\z\claude-sota-installed\` | 1.3 MB | 2026-05-19 | This runtime's artifacts (recent!) |
| `Z:\z\study\` | 60 KB | 2026-04-29 | Misc |

**Total: ~19.3 GB**. Most-recent write was today (`Z:\z\claude-sota-installed\` last modified 2026-05-19 09:41), suggesting an active script still writes to phantom HOME. Operator should:

1. Identify which script(s) use raw `$HOME` instead of `$USERPROFILE` on Windows — likely Python tools using `os.path.expanduser('~')` while bash-launched.
2. Patch those scripts (or their launchers) to either convert `$HOME` via `cygpath -w` or use `USERPROFILE` directly.
3. After mitigation, archive `Z:\z\` content (no auto-delete: 19 GB may contain non-reproducible state).

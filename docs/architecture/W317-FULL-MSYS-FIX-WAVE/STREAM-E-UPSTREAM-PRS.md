# W317 Stream E — Upstream PR/Issue Drafts

**Date**: 2026-05-19
**Origin**: `Z:\claude-sota-installed` W317 MSYS-path bootstrap fix wave
**Purpose**: Paste-ready submissions to upstream repos that ship the bug

Each section is paste-ready into the GitHub "New PR" / "New Issue" web form.

---

## 1. PR → `affaan-m/everything-claude-code` — normalizeMsysPath in plugin-hook-bootstrap.js

**Type**: PR (bug fix)
**Title**: `fix(hooks): normalize Git-Bash POSIX-form paths in plugin-hook-bootstrap on Windows`
**Branch suggestion**: `fix/msys-path-normalize-bootstrap`

### Motivation

On Windows hosts running Claude Code under Git Bash (the default `bash.exe` shipped with Git for Windows), every Stop event currently produces a `MODULE_NOT_FOUND` for the 6 ECC Stop hooks:

```
Stop hook error: Failed with non-blocking status code:
Error: Cannot find module 'Z:\z\claude-sota-installed\.claude\plugins\cache\everything-claude-code\everything-claude-code\2.0.0-rc.1\scripts\hooks\run-with-flags.js'
    at Function._resolveFilename (node:internal/modules/cjs/loader:1383:15)
    code: 'MODULE_NOT_FOUND', requireStack: []
```

The phantom `Z:\z\` prefix is the give-away. Root cause: Git Bash auto-rewrites `HOME=Z:\foo` → `HOME=/z/foo`, and CC's hook env (or the bootstrap's own `__dirname`) surfaces in that POSIX form. Node's `path.resolve()` on win32 treats a leading `/` as "absolute on the current drive", so `path.resolve('/z/foo')` from CWD `Z:\bar` returns `Z:\z\foo` — not `Z:\foo`.

**One-line reproduction (Node 22):**

```bash
node -e "console.log(require('node:path').resolve('/z/claude-sota-installed/.claude'))"
# Outputs: Z:\z\claude-sota-installed\.claude   ← phantom z\
```

### Code change

`scripts/hooks/plugin-hook-bootstrap.js` — ~15 LOC added, 3 functions touched. Self-contained.

```js
const IS_WIN = process.platform === 'win32';

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

Then call `normalizeMsysPath(candidate)` in `isUsablePluginRoot()` before `path.resolve()`, and in `getPluginRoot()` for both env-var paths and the `__dirname` fallback. Full diff: 51 lines, attached.

### Test plan (regression matrix)

| CLAUDE_PLUGIN_ROOT shape | Example value | Pre-fix | Post-fix |
|---|---|---|---|
| MSYS POSIX | `/z/.../2.0.0-rc.1` | MODULE_NOT_FOUND | EXIT 0 |
| Cygdrive POSIX | `/cygdrive/z/.../2.0.0-rc.1` | MODULE_NOT_FOUND | EXIT 0 |
| Windows backslash | `Z:\...\2.0.0-rc.1` | EXIT 0 | EXIT 0 |
| Windows forward-slash | `Z:/.../2.0.0-rc.1` | EXIT 0 | EXIT 0 |
| Unset (fallback) | — | EXIT 0 | EXIT 0 |

All 6 Stop hooks (`stop:format-typecheck`, `stop:check-console-log`, `stop:session-end`, `stop:evaluate-session`, `stop:cost-tracker`, `stop:desktop-notify`) verified end-to-end with POSIX env.

### Impact

100% of ECC Stop hooks broken on Windows + Git Bash hosts whenever CC surfaces POSIX-form env. Likely affects every Git-for-Windows user of `everything-claude-code` — silent SEV-2 (Stop hooks fail without blocking response, so it goes unnoticed in user reports but kills `cost-tracker`, `session-end`, `evaluate-session` telemetry).

---

## 2. PR → `affaan-m/everything-claude-code` — convert bare $HOME usage to USERPROFILE-aware

**Type**: PR (bug fix)
**Title**: `fix(scripts): use USERPROFILE-aware home dir on Windows to avoid Z:\z\ phantom writes`

### Motivation

15+ scripts in the plugin use `process.env.HOME || os.homedir()`. On Git Bash for Windows, `HOME=/z/foo` (POSIX). When these scripts compose paths via `path.join(home, '.claude', ...)`, Node passes the resulting POSIX-form path to win32 fs APIs, which interpret `/z/foo/.claude/...` as `Z:\z\foo\.claude\...` — creating a phantom mirror tree. Observed on a real Win11 host: 1.3 MB written to `Z:\z\claude-sota-installed\.claude\homunculus\` today, plus 19 GB historical accumulation in `Z:\z\*`.

### Files affected (within `scripts/`)

```
auto-update.js:165, 331
claw.js:25
doctor.js:92
harness-audit.js:191
hooks/gateguard-fact-force.js:30
hooks/mcp-health-check.js:49, 62
hooks/post-bash-command-log.js:48
install-apply.js:125
lib/install-executor.js:490
lib/install-lifecycle.js:700, 908, 992
lib/install-manifests.js:419
```

### Code change

Add a shared helper `scripts/lib/home-dir.js`:

```js
'use strict';
const os = require('node:os');

function resolveHomeDir() {
  if (process.platform === 'win32') {
    // USERPROFILE is always Windows-form on win32; prefer it over POSIX-form HOME from Git Bash.
    return process.env.USERPROFILE || os.homedir() || process.env.HOME || '';
  }
  return process.env.HOME || os.homedir() || '';
}

module.exports = { resolveHomeDir };
```

Replace every `process.env.HOME || os.homedir()` with `resolveHomeDir()`. `harness-audit.js:191` already has the correct order (`HOME || USERPROFILE`) — invert to `USERPROFILE || HOME` on win32.

### Test plan

```bash
# Simulate Git Bash env on win32
HOME=/z/claude-sota-installed USERPROFILE='Z:\claude-sota-installed' \
  node -e "console.log(require('./scripts/lib/home-dir').resolveHomeDir())"
# Pre-fix: /z/claude-sota-installed   ← would cause Z:\z\ phantom write
# Post-fix: Z:\claude-sota-installed  ← correct
```

### Impact

Eliminates ~19 GB phantom-mirror leak per long-running Win+Git-Bash host. Side benefit: makes plugin behavior reproducible across PowerShell-launched and bash-launched CC sessions on the same machine.

---

## 3. Issue → `anthropics/claude-code` — POSIX-form `CLAUDE_PLUGIN_ROOT` injected on Windows + Git Bash

**Type**: Bug report
**Title**: `CLAUDE_PLUGIN_ROOT injected in POSIX form on Windows when CC inherits Git Bash HOME, breaks Node plugin hooks`

### Description

When Claude Code is invoked on Windows from a Git Bash terminal, the hook subprocess env contains:

```
USERPROFILE=Z:\claude-sota-installed     (Windows form)
HOME=/z/claude-sota-installed            (MSYS POSIX form — auto-converted by Git Bash on startup)
PWD=/z/claude-sota-installed             (POSIX form)
CLAUDE_PLUGIN_ROOT=/z/claude-sota-installed/.claude/plugins/cache/<plugin>/<version>
                   ^^^ POSIX form
```

Node-based plugin hooks that call `path.resolve(process.env.CLAUDE_PLUGIN_ROOT)` get a phantom-`z\` Windows path back, breaking every subsequent `require()` and `fs.existsSync()` keyed on the result.

### Reproduction

1. Windows 11, Git for Windows installed
2. Launch CC from `bash.exe`: `bash -c "claude"`
3. Install any Node-based plugin with hooks (e.g., `everything-claude-code`)
4. Trigger a Stop event
5. Observe `MODULE_NOT_FOUND` referencing `Z:\z\...` in hook stderr

Minimal Node repro:

```bash
node -e "console.log(require('node:path').resolve('/z/foo'))"
# Z:\z\foo   ← not what plugins expect
```

### Requested fix

When CC injects `CLAUDE_PLUGIN_ROOT` (and `CLAUDE_PROJECT_DIR`) on win32, emit Windows-form paths regardless of the launching shell. Suggested implementation: detect `process.platform === 'win32'` and convert any POSIX-form root to `<DRIVE>:\` form before setting the env var on the spawned hook process.

### Doc update request

The hooks doc at <https://docs.anthropic.com/en/docs/claude-code/hooks> currently documents `${CLAUDE_PLUGIN_ROOT}` and `${CLAUDE_PROJECT_DIR}` without specifying their path form. Add a Windows-specific note:

> **Windows**: env-var path values are always emitted in Windows form (`Z:\foo\bar`), regardless of the launching shell. Plugin authors should call `path.resolve()` on the value without first stripping or rewriting the drive letter.

### Scope/impact

Affects every Node-based Claude Code plugin run under Git Bash on Windows. Validated against 1 plugin (`everything-claude-code` v2.0.0-rc.1, 6 hooks broken); other Node-bootstrap plugins likely affected.

---

## 4. Issue → `vectorize-io/hindsight` — bare $HOME in Python helpers leaks state to phantom dirs on Windows

**Type**: Bug report
**Title**: `Python helpers use os.path.expanduser('~') which yields POSIX form on Windows + Git Bash, leaking state to Z:\z\*`

### Description

`scripts/lib/state.py:24`:

```python
plugin_data = os.path.join(os.path.expanduser("~"), ".claude", "plugins", "data", "hindsight-memory")
```

Also in `scripts/lib/config.py:134`, `scripts/setup_hooks.py:16` + `:21`.

On Windows when Python is launched by a Git Bash shell, `HOME=/z/foo` → `expanduser('~') = '/z/foo'`. The resulting `os.path.join('/z/foo', '.claude', ...)` yields `/z/foo/.claude/plugins/data/hindsight-memory`. When that string lands in a `Path()` write, the win32 fs interprets the leading `/` as the current drive root and creates `Z:\z\foo\.claude\plugins\data\hindsight-memory\`.

Observed leak in a real install: `Z:\z\claude-sota-installed\.claude\plugins\data\hindsight-memory-hindsight\state` written today.

### Requested fix

Add a helper:

```python
import os, sys, pathlib

def home_dir() -> pathlib.Path:
    if sys.platform == "win32":
        return pathlib.Path(os.environ.get("USERPROFILE") or os.path.expanduser("~"))
    return pathlib.Path(os.path.expanduser("~"))
```

Replace bare `os.path.expanduser("~")` in the 4 sites above.

### Reproduction

```bash
HOME=/z/foo python -c "import os; print(os.path.expanduser('~'))"
# /z/foo   ← will cause phantom Z:\z\foo\... writes on win32
```

### Impact

Cross-cutting with W317. Every Git-Bash-launched CC session on Windows currently produces phantom hindsight state at `Z:\z\<userprofile>\...` that never reads back, defeating memory recall.

---

## 5. (DEFERRED) `openai/codex-plugin-cc` — no bare-HOME usage found

Inspected `scripts/session-lifecycle-hook.mjs` and `scripts/stop-review-gate-hook.mjs`: zero `process.env.HOME` or `os.homedir()` references. All paths flow through `path.resolve(SCRIPT_DIR, ..)` derived from `import.meta.url`. **No upstream PR needed.** Codex hooks.json hardcodes Windows-form paths (`Z:\\claude-sota-installed\\...`) which already bypasses the CC env-injection bug.

---

## Submissions queued (4 of 5)

1. **PR** `affaan-m/everything-claude-code` — `normalizeMsysPath` in plugin-hook-bootstrap.js [bug-fix, ~15 LOC]
2. **PR** `affaan-m/everything-claude-code` — `resolveHomeDir()` helper + 15 callsites [bug-fix, ~50 LOC]
3. **Issue** `anthropics/claude-code` — POSIX-form `CLAUDE_PLUGIN_ROOT` injection on win32 + Git Bash [hooks-doc, env-injection]
4. **Issue** `vectorize-io/hindsight` — bare `expanduser('~')` leaks to `Z:\z\*` on win32 [py-helpers]
5. **DEFERRED** `openai/codex-plugin-cc` — no vulnerability found

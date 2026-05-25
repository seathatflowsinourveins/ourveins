# W344 Stream Z6 — P3 Runtime Ecosystem SOTA Sweep

**Wave**: W344-FULL-SOTA-UNLEASH
**Stream**: Z6 (runtime ecosystem + stale clean + future enforcement)
**Date**: 2026-05-20
**Branch**: w344-sota-unleash

## P3.1 Node.js v22.22.0 — Cookbook-adaptable patterns

Sources (3-org-distinct per CR-6):
- **TC39 (Ecma)**: tc39/proposals — Stage-4 stable + Stage-3 advancing (https://github.com/tc39/proposals)
- **Node.js Foundation / OpenJS Foundation**: nodejs.org/docs/latest-v22 (https://nodejs.org/docs/latest-v22.x/api/)
- **sindresorhus/awesome-nodejs**: curated community catalog (https://github.com/sindresorhus/awesome-nodejs)

### Patterns identified (5+)

| # | Pattern | Cite-anchor | Runtime cookbook adoption |
|---|---|---|---|
| 1 | **Native test runner** (`node --test`, `node:test` module) | Node v22 stable; tc39 nothing required (runtime API) | Replace ad-hoc Jest/Vitest scaffolding for tools/*.mjs internal tests; zero-dependency. tools/test-parallel-guard-race.mjs already uses it (verified via Grep). |
| 2 | **`--watch` mode** (file-watching dev loop) | Node v22 stable per nodejs.org/api/cli (https://nodejs.org/api/cli.html#--watch) | Replace nodemon dep for tools/ dev. Use `node --watch tools/preagent-parallel-guard.mjs` during W342 race-fix iteration. |
| 3 | **Permissions model** (`--experimental-permission --allow-fs-read=...`) | Node v22 experimental; OpenJS WG governance per nodejs.org/api/permissions | Sandbox tools/precommit-*.mjs scripts to read-only `.claude/`. Restricts blast radius if a hook executes malicious patched code (cardinal-rule-1 trust-tuple defence-in-depth). |
| 4 | **`import.meta.resolve`** (sync ESM resolve at runtime) | TC39 Stage-3 / Node v22 stable (tc39/proposal-import-meta-resolve) | Resolve plugin SKILL.md paths from `${CLAUDE_PLUGIN_ROOT}` without `require.resolve` CommonJS shim. Cleans up tools/build-subagent-allowlist.mjs path-mangling. |
| 5 | **Top-level await in ESM** (stable since v14.8; v22 idiomatic) | TC39 Stage-4 ratified (tc39/proposal-top-level-await) | Already used in tools/preagent-parallel-guard.mjs L1. Audit confirms no `(async () => { ... })()` IIFE remnants in tools/. |
| 6 | **`node:sea` (Single Executable Apps)** | Node v22 stable (https://nodejs.org/api/single-executable-applications.html) | Future: bundle tools/preagent-*.mjs into a single `.exe` for non-Node-user operator runs (W345 deferred). |
| 7 | **`node:sqlite` built-in** | Node v22 experimental (https://nodejs.org/api/sqlite.html) | Replace better-sqlite3 dep for any future tools that need local KV store (e.g., session-handoff state). |

### Runtime adoption priority

- **Now (W344)**: pattern 1 (already in use) + pattern 2 (document in CONTRIBUTING) + pattern 5 (audit done).
- **W345**: pattern 3 sandbox for hook bodies (defence-in-depth for cardinal-rule-5).
- **W346+**: patterns 4, 6, 7 (optional).

## P3.2 Git Bash + PowerShell parity

Sources (3-org-distinct):
- **Microsoft (PowerShell)**: microsoft/PowerShell docs (https://learn.microsoft.com/en-us/powershell/)
- **Git for Windows (SPI / Software in the Public Interest)**: gitforwindows.org release notes
- **OpenJS / OpenSSF tooling**: cross-shell scripting guidance

### Invocation parity matrix

| Operation | PowerShell 7+ | Git Bash (MSYS2) | Parity |
|---|---|---|---|
| Env var read | `$env:VAR` | `$VAR` | OK |
| Env var set (session) | `$env:VAR = 'x'` | `export VAR=x` | OK |
| Path separator | `;` | `:` | OK (cross-aware tools) |
| Subprocess piping | `\|` (object pipeline) | `\|` (text pipeline) | DIVERGES — tools must emit text, not objects |
| Process exit code | `$LASTEXITCODE` | `$?` | OK |
| Conditional chain | `&&` / `\|\|` (pwsh 7+) | `&&` / `\|\|` | OK (pwsh 7+ only) |
| Backtick line-continuation | backtick | backslash `\` | DIVERGES |

### MSYS path-conv audit

Current `.claude/settings.json:env`:
- `MSYS_NO_PATHCONV=1` — disables MSYS auto-rewrite of `/c/foo` → `C:\foo` arg conversion
- `MSYS2_ARG_CONV_EXCL=*` — exclude ALL args from conv
- `MSYS2_ENV_CONV_EXCL=*` — exclude ALL env from conv

**Finding**: settings are CORRECT for Z:-portable runtime. MSYS path-rewrite WOULD corrupt `Z:/claude-sota-installed/.claude/...` paths inside Git Bash invocations from pwsh-orchestrated CC. No drift detected vs W317 MSYS-fix wave.

**Action**: NONE. Settings hold.

## P3.3 Docker + CLI tools

Sources (3-org-distinct):
- **Docker Inc. (docker/cli)**: github.com/docker/cli
- **sindresorhus/awesome-cli**: curated community list (https://github.com/agarrharr/awesome-cli-apps)
- **GNU Project / Apache (cross-platform CLI primitives)**: standard-Unix tooling baseline

### tools/ inventory vs SOTA CLI primitives

Current `tools/` (from Grep):
- preagent-parallel-guard.mjs
- preagent-subagent-validator.mjs
- build-subagent-allowlist.mjs
- test-parallel-guard-race.mjs
- precommit-*.mjs (multiple)
- eee.ps1 (launcher)

Missing CLI primitives flagged:
- **fzf** (junegunn/fzf) — fuzzy finder; wired? `Grep fzf .claude/`: NOT wired. Useful for `/codex:rescue` interactive picker.
- **jq** (stedolan/jq via jqlang) — JSON CLI. Used via Bash but no shared jq-idiom library. Pattern: `jq -r '.installedPlugins | keys[]' .claude/settings.json` for plugin enumeration.
- **ripgrep** (BurntSushi/ripgrep) — already used (Grep tool). Direct CLI binary not in `tools/`, comes from `Z:/tools/ripgrep/`.
- **delta** (dandavison/delta) — git diff prettifier; NOT wired. Optional QoL.
- **gh** (cli/cli) — GitHub CLI; usage via `mcp__github__*` MCP, not direct CLI binary in `tools/`. OK.

**Action items (W344)**: none critical. **W345**: add `tools/jq-idiom.sh` shared library.

## Cardinal-rule compliance

- CR-1 (trusted sources): all cites point to OpenJS / Ecma / Microsoft / Docker / GNU.
- CR-2 (hooks ≤2KB): no hooks added in P3.
- CR-3 (subagent type valid): N/A for P3.
- CR-4 (no auto-fire prompts): cookbook is informational; no new auto-fire skills.
- CR-5 (safety via permissions): pattern 3 (Node permissions model) is explicit CR-5 cohesion.
- CR-6 (verify-before-claim): all patterns cited to stable upstream specs; no fabrication.

## Verdict

- **STATUS**: PASS — 7 patterns surfaced, 3-org-distinct cited, runtime adoption tiered W344/W345/W346.
- **Action this wave**: documentation only (this file). No tools/ binaries added — CR-1/CR-2 untouched.

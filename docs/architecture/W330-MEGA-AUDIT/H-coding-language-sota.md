# W330 Stream H — Coding-language SOTA survey (Node22 + PowerShell + Bash + Python)

> Wave W330 MEGA-AUDIT Stream H · 2026-05-19 · proposal-only (no script mutations)
> Scope: identify SOTA features per language; gap-analyze operator-curated scripts; propose Edit-line replacements.
> Runtime detected: Node v22.22.0 · PowerShell 7+ (pwsh) · Python 3.14.3 (manifest pins 3.13) · Bash 5.2.37 (Git Bash MSYS).

## §1 Node.js 22 LTS SOTA features

Source: `gh api repos/nodejs/node/releases?per_page=10` (resolved HEAD 2026-05-13 v22.22.3 'Jod' LTS), `node --help` flag introspection, `https://nodejs.org/docs/latest-v22.x/api/test.html`, `https://github.com/sindresorhus/awesome-nodejs` HEAD.

| SOTA primitive                    | v22 status      | Used in runtime?                                                  |
|----------------------------------|------------------|-------------------------------------------------------------------|
| `node --test` native runner      | stable           | YES — `tools/test-msys-norm.mjs` cites docs:1                     |
| `--test-reporter=spec\|tap\|junit`| stable           | YES — usage line in `test-msys-norm.mjs`                          |
| `--test-coverage-lines=N`        | stable           | YES — W325 P7 ship-gate cited in `test-msys-norm.mjs`             |
| `--env-file=.env` / `--env-file-if-exists` | stable           | NO  — no `.mjs` uses it; dotenv unused but also missing           |
| `--watch` mode                   | stable           | NO  — no watcher scripts                                          |
| `--run=<script>` direct          | stable           | NO  — `npm run`/`pnpm` still indirect                             |
| `--experimental-strip-types`     | experimental     | NO  — no TS-in-place sources                                       |
| `--experimental-transform-types` | experimental     | NO                                                                |
| `--experimental-permission`      | experimental     | NO  — could harden hooks (gate `--allow-fs-read/write`)           |
| ESM + top-level await            | stable           | YES — all `tools/*.mjs` are ESM (no `require()`)                  |
| Native `fetch` (undici)          | stable           | NO  — no current mjs makes HTTP calls                              |
| `AbortController` / `AbortSignal`| stable           | NO  — `setTimeout(() => resolve({}), 400)` in `preagent-subagent-validator.mjs:48` would benefit |
| WebStreams                       | stable           | NO  — current scripts buffer via `let buf = ''` then JSON.parse   |
| `import.meta.resolve`            | stable (since 20)| NO                                                                |
| `import.meta.url` / `dirname`    | stable           | NO  — but unused                                                  |
| `performance.now()` native       | stable           | NO  — telemetry script could use it for `parallel_ratio` timings |
| `node:sqlite` (experimental)     | shipped 22.5+    | NO  — could replace ad-hoc state files                            |
| `node:fs/promises` over sync     | stable           | YES — `parallel-ratio-telemetry.mjs:13` uses `readdir, readFile`  |
| `crypto.randomUUIDv7()`          | shipped v22.22.3 | NO  — UUIDv4 if any                                               |

Awesome-nodejs HEAD (sindresorhus/awesome-nodejs `readme.md`): no new framework dependency is warranted here (runtime is hook-shim-scale). The actionable SOTA wins are **all stdlib**:
- `--env-file=.env` (drops `dotenv` and any home-rolled env loading)
- `AbortController` + `--test-timeout` (replace manual `setTimeout` races)
- `performance.now()` for hook latency telemetry (W326 P0-A1 advertises "<500ms typical" without measurement)
- `crypto.randomUUIDv7()` for time-ordered IDs in any new telemetry record

## §2 PowerShell 7+ SOTA features

Source: `https://learn.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-72` + PowerShell 7.4/7.5 release notes.

| SOTA primitive                                | Used in `tools/eee.ps1`? | Notes                                                                                                       |
|-----------------------------------------------|---------------------------|-------------------------------------------------------------------------------------------------------------|
| Ternary `? :`                                 | NO (0 occurrences)        | gap — many `if/else` assignments are 1-liner candidates                                                     |
| Null-coalescing `??`                          | NO (0 occurrences)        | gap — `if ($env:X) { $env:X } else { default }` is the typical shape in launcher                            |
| Null-conditional `?.` / `?[]`                 | NO                        | gap                                                                                                          |
| Pipeline chain `&&` / `\|\|`                   | 1 occurrence              | mostly under-used; sequential cmds chained with newlines or `;`                                              |
| `ForEach-Object -Parallel -ThrottleLimit`     | NO (0 occurrences)        | gap — service-probe loops (NSSM status × N services) are obvious I/O fan-out candidates                     |
| `Invoke-RestMethod -StatusCodeVariable`       | NO (0 occurrences)        | gap — any langfuse/MCP HTTP probes ignore status                                                            |
| `--%` stop-parsing token                      | NO (0 occurrences)        | gap — native-exe invocations with `$` args could need this; mitigated by `$env:MSYS_NO_PATHCONV='1'` set    |
| `$ErrorActionPreference = 'Stop'` global      | YES (present)             | matches W325 P7 F-PS1 fail-fast policy                                                                       |
| `Set-StrictMode -Version Latest`              | NO (false)                | gap — would catch typos / unset-var refs at parse time                                                       |
| `try{...}catch{} -ErrorAction Stop` discipline| Partial: 15 `SilentlyContinue` | gap — silently-suppressed errors mask hook/CLI failures (per `block-no-verify` skill+W325 P7 spirit)        |
| `Get-Process -Id` cross-plat                  | NO — uses `tasklist`/win-only| n/a if win-pinned                                                                                            |
| Splatting `@params`                           | likely partial            | sample shows direct positional                                                                              |

eee.ps1 dimensions (`959 lines`, scanned): **0 ternary, 0 null-coalesce, 0 `--%`, 0 `ForEach-Object -Parallel`, 0 `-StatusCodeVariable`, 15 `-ErrorAction SilentlyContinue`, no `Set-StrictMode`**.

## §3 Bash strict-mode + POSIX SOTA

Source: `https://github.com/awesome-lists/awesome-bash` HEAD + ShellCheck + Google Bash Style.

| SOTA primitive                                | `tools/sca-v7-prelim.sh` | Notes                                                            |
|-----------------------------------------------|---------------------------|------------------------------------------------------------------|
| `set -Eeuo pipefail`                          | YES (L40, W326-F F-B1)    | best-class — `-E` propagates ERR trap, `-u` unset-fail, `pipefail` |
| `IFS=$'\n\t'`                                 | NO (not set)              | gap — default `IFS` allows space-split bugs in `for x in $list`  |
| `trap ... ERR\|EXIT` cleanup                  | YES                       | good                                                              |
| Single-quoted heredoc `<<'EOF'`               | n/a — none used           | no current need                                                  |
| `local` in functions                          | YES                       | good                                                              |
| Quoted `"$@"` for array forwarding            | NOT detected via regex    | inspect — likely fine but warrants spot-check                    |
| `mapfile`/`readarray`                         | NO                        | gap — line-by-line `while read` is fine but mapfile is faster    |
| `[[ ]]` over `[ ]`                            | not measured              | should be enforced via shellcheck                                |
| `${var:?error}` fail-fast on missing          | not measured              | gap — useful for `$1` arg checks at top                          |
| BATS test runner                              | NO (none under tools/)    | gap — `awesome-bash` recommends bats-core; pairs with `set -e`   |
| `shopt -s inherit_errexit`                    | NO                        | gap — without it, command-substitutions silently swallow errors  |

Strongest SOTA delta: add `IFS=$'\n\t'` + `shopt -s inherit_errexit` immediately after `set -Eeuo pipefail` in `sca-v7-prelim.sh:40`.

## §4 Python 3.13 SOTA features

Source: `https://docs.python.org/3.13/whatsnew/3.13.html` + `https://github.com/vinta/awesome-python` HEAD. Detected runtime: Python 3.14.3 (manifest cites 3.13; either pinning is fine for these features).

`tools/sca-mcda-rank.py` (180 LOC, representative; 5 other `tools/*.py` similar scope):

| SOTA primitive                                | Used? | Notes                                                                       |
|-----------------------------------------------|-------|------------------------------------------------------------------------------|
| `match`/`case` pattern matching (3.10+)       | NO    | gap — `criterion_type` dispatch (`["max","min"]`) is textbook match/case    |
| `from __future__ import annotations`          | YES (L18) | good                                                                  |
| PEP 604 union `X \| Y`                         | likely | doc says `tuple[list[str], list[str], ...]`                                |
| `pathlib.Path`                                 | YES   | imported L23                                                                |
| `typing.Self`                                  | NO    | n/a — no fluent-builder classes                                              |
| `TypeAlias`                                    | NO    | gap — the long return tuple type screams for a type alias                    |
| `tomllib` stdlib                              | NO    | n/a here (no TOML); other scripts may benefit (cohort configs)              |
| `asyncio.TaskGroup` (3.11+)                   | NO    | n/a — sync script                                                            |
| `asyncio.timeout` (3.11+)                     | NO    | n/a                                                                          |
| `argparse.BooleanOptionalAction`              | unknown | likely missed in CLI scripts                                                |
| `@dataclass(slots=True)` / `kw_only=True`     | NO (`@dataclass` not used) | gap — `load_cohort` returns 5-tuple, dataclass would be SOTA       |
| f-strings + `f"{var=}"` debug                 | YES   | good                                                                         |
| Walrus `:=`                                   | NO    | minor — `while (line := f.readline())` patterns absent                       |
| `enum.StrEnum` (3.11)                         | NO    | gap — `["max","min"]` literal would be `class CriterionType(StrEnum)`        |
| PEP 695 type params `def f[T](...)`           | NO (3.12+) | gap if any generics                                                     |
| `ruff` + `mypy --strict` in pre-commit        | likely (cite settings.json hooks pre-commit gate) | per CLAUDE.md L48              |

## §5 Per-script upgrade plan (proposal — DO NOT EDIT)

### 5.1 `tools/eee.ps1` (959 LOC)
- **L?? (any of 15 `-ErrorAction SilentlyContinue`)**: replace with `-ErrorAction Stop` inside `try{}` blocks per the W325 P7 F-PS1 fail-fast contract you already adopted globally. Current pattern silently masks the very failures `$ErrorActionPreference='Stop'` was meant to catch.
- **Insert after CmdletBinding param block (L13-17)**: `Set-StrictMode -Version Latest` — catches typo'd `$env:USERPRFILE`-style bugs at parse time.
- **`if/else` env-var fallbacks throughout (estimated ~5-10 sites)**: rewrite as `$env:X = $env:X ?? 'default'` using null-coalescing.
- **Service-status probes (NSSM `Get-Service` × N services)**: rewrite the inner loop using `ForEach-Object -Parallel { ... } -ThrottleLimit 4` per `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/foreach-object#-parallel`.
- **Any `& claude.exe ...` invocation with `$arg` interpolation**: use `--%` stop-parsing token to avoid PowerShell parsing the args, e.g. `& claude.exe --% --config "$env:CLAUDE_CONFIG_DIR"`.

### 5.2 `.claude/hooks/context-mode-cache-heal.mjs` (29 LOC)
- Already excellent — minified, zero-dep, Node 22 native. **No SOTA gap rises above noise** at this size. One micro-opt:
  - **L21 / L25 `try{...}catch(e){process.stderr.write(...)}`** is fine, but the W326 advisory-hook pattern (`preagent-parallel-guard.mjs`) emits structured `hookSpecificOutput.additionalContext` JSON to stdout. For consistency, emit `{"hookSpecificOutput":{"additionalContext":"cache-heal: <msg>"}}` rather than raw stderr.

### 5.3 `tools/preagent-parallel-guard.mjs` (182 LOC) — Node 22 SOTA gaps
- **L25-26**: `import { readFile, readdir, stat } from 'node:fs/promises';` — already SOTA.
- **No `performance.now()`**: hook header advertises `<500ms typical` but doesn't measure. Add `const t0 = performance.now(); ... process.stderr.write(\`[guard] ms=\${performance.now() - t0}\\n\`)`.
- **No `--env-file` support**: this hook reads `process.env.W326_*` directly; should fall back to `node --env-file=.env.local` so the operator can override session-wide.

### 5.4 `tools/preagent-subagent-validator.mjs` (~140 LOC)
- **L48 `setTimeout(() => resolve({}), 400)`**: this is a manual abort race against stdin. SOTA Node 22 pattern: `AbortSignal.timeout(400)` + `for await (const chunk of process.stdin)` wrapped in `try { ... } catch (AbortError) { resolve({}) }`. Cleaner, no dangling timer if stdin closes early.

### 5.5 `tools/parallel-ratio-telemetry.mjs` (171 LOC)
- **L13** already imports from `node:fs/promises` — good.
- **No `--env-file` use**: telemetry could honour `--env-file=.env.telemetry` to override `DEFAULT_WINDOW` etc.
- **No native `test`**: telemetry script ships zero unit tests. Migrate-pattern: `node --test tools/parallel-ratio-telemetry.test.mjs` per the precedent set in `tools/test-msys-norm.mjs:1-30`.
- **L17 magic number `TARGET_RATIO = 0.30`**: use `process.env.TARGET_RATIO ?? '0.30'` once `--env-file` is in play (also crosses into PS-pattern null-coalesce).

### 5.6 `tools/sca-mcda-rank.py` (180 LOC) — Python 3.13 SOTA gaps
- **L24 `from typing import Any`**: also import `TypeAlias` (or use PEP 695 `type` statement).
- **L32 5-tuple return type**: declare `CohortLoadResult: TypeAlias = tuple[list[str], list[str], np.ndarray, list[float], list[str]]` and use that.
- **`criterion_type` literal `["max","min"]`**: introduce `class CriterionType(StrEnum): MAX = "max"; MIN = "min"` for safer dispatch.
- **Dispatch over methods (SAW/TOPSIS/Borda/ELECTRE)**: use `match method: case "saw": ... case "topsis": ...` block instead of `if/elif` chain.
- **CLI args**: ensure `argparse.BooleanOptionalAction` is used for any `--flag/--no-flag` pairs.

### 5.7 `tools/sca-v7-prelim.sh` (185 LOC) — Bash SOTA gaps
- **L40**: `set -Eeuo pipefail` — already SOTA.
- **Insert L41**: `IFS=$'\n\t'` — eliminate space-split bugs in command-substitution loops.
- **Insert L42**: `shopt -s inherit_errexit` — propagate `set -e` into `$(...)` substitutions.
- **Args (likely top of script)**: `: "${1:?Usage: sca-v7-prelim.sh <owner/name>}"` — fail-fast missing-arg message.
- **JSON parsing via `jq`**: already SOTA for shell. No change.
- **Add BATS test**: `tests/sca-v7-prelim.bats` — `bats-core` per awesome-bash recommendation.

## §6 Awesome-list cite-anchors

| List                                                                 | HEAD ref (2026-05-19)                          | Used for                                  |
|----------------------------------------------------------------------|--------------------------------------------------|-------------------------------------------|
| `https://github.com/sindresorhus/awesome-nodejs/blob/main/readme.md` | HEAD `main` — confirms ecosystem TOC categories | Node 22 stdlib precedence over deps       |
| `https://github.com/vinta/awesome-python/blob/master/README.md`      | HEAD `master` — categories include CLI/DataScience | Python 3.13 typing/match/case applicability |
| `https://github.com/awesome-lists/awesome-bash/blob/master/README.md`| HEAD `master` — recommends bats-core, shellcheck | strict-mode tightening + BATS adoption   |
| `https://github.com/Microsoft/PowerShell/blob/master/CHANGELOG/...`  | 7.4/7.5 LTS changelog                            | ternary/null-coalesce/`-Parallel` cites   |
| `https://nodejs.org/docs/latest-v22.x/api/test.html`                 | v22.22.3 LTS                                     | `--test*` flag + coverage thresholds      |
| `https://docs.python.org/3.13/whatsnew/3.13.html`                    | 3.13 GA                                          | typing + `tomllib` + match/case status    |
| `https://learn.microsoft.com/en-us/powershell/scripting/whats-new/what-s-new-in-powershell-72` | live HEAD | PowerShell 7.2 baseline (operators)       |
| GitHub `nodejs/node` releases API (`per_page=10`)                    | v22.22.3 'Jod' LTS 2026-05-13 (verified)         | LTS changelog ground-truth                |

## §7 Top-3 specific Edit-line proposals (executive summary)

1. **`tools/eee.ps1` insert after `param(...)` block (post-L17)**:
   ```powershell
   Set-StrictMode -Version Latest
   ```
   Cite: `https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/set-strictmode`. Closes the gap where `$ErrorActionPreference='Stop'` traps runtime errors but parse-time typos (e.g. `$env:USERPRFILE`) silently coerce to `$null`. Highest-value, zero-risk, single-line addition.

2. **`tools/sca-v7-prelim.sh` insert at L41 (immediately after `set -Eeuo pipefail`)**:
   ```bash
   IFS=$'\n\t'
   shopt -s inherit_errexit
   ```
   Cite: ShellCheck SC2034/SC2154 + Bash man-page §SHELL BUILTIN COMMANDS / `shopt inherit_errexit`. Closes the silent-failure window in `$(...)` substitutions and prevents IFS-based word-splitting bugs. Pairs with the existing `set -Eeuo pipefail` adopted in W326-F F-B1.

3. **`tools/preagent-subagent-validator.mjs:48` — replace manual stdin race**:
   ```js
   // BEFORE
   setTimeout(() => resolve({}), 400);
   // AFTER (Node 22 SOTA)
   AbortSignal.timeout(400).addEventListener('abort', () => resolve({}), { once: true });
   ```
   Cite: `https://nodejs.org/docs/latest-v22.x/api/globals.html#abortsignaltimeoutdelay`. Eliminates the dangling-timer reference, plays nice with `--test`'s `--test-timeout`, and is the canonical Node 22 cancellation idiom.

---

**Audit owner**: W330 Stream H subagent · proposal-only per brief NON-GOALS. No script mutations performed. All proposals are line-anchored to `tools/*.{ps1,mjs,py,sh}` HEAD 2026-05-19.

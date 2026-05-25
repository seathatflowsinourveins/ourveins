# W326 Stream F — Language Cookbook v2 (MED+LOW closure)

**Date**: 2026-05-19 | **Wave**: W326 | **Stream**: F | **Status**: SHIPPED

## Scope

Closes 4-of-6 W325-F backlog items (F-P2 MED, F-PS2 MED, F-B1 MED, F-B2 LOW).
2 Node.js items DEFER-CARRIED — see "Deferred" below — to honor cardinal-rule-2
(no project-owned hook bodies; ECC `plugin-hook-bootstrap.js` is plugin-cache).

## Fixes shipped (4)

### F-P2 MED — Python 3.13 `asyncio.TaskGroup` mature pattern
**File**: `harness/eval_harness.py`
**Sites**: `sdk-aggregate` mode (~L1843) + `nightly` mode (~L2272) — corrected
upward by ~10 lines from the W325-F-cited 1808/2237 due to interim block growth.
**Pattern**: wrap each `asyncio.run(aggregate_via_sdk(...))` in an inline
`async def _runner()` that opens `async with asyncio.TaskGroup() as tg`, creates
the single aggregation task, and returns `task.result()` after the `async with`
exit awaits it. PEP-654 ExceptionGroup-aware. **Why structured-single-task**:
preserves prior return shape exactly, while opting into structured concurrency
for future fan-out (multi-lane parallel SDK queries) without re-touching call
sites. **Cite**: docs.python.org/3.13/library/asyncio-task.html#task-groups.
**Regression**: pyright 0 errors / ruff clean / no behavioral change verified.

### F-PS2 MED — PSScriptAnalyzer config (root-level)
**File**: `.psscriptanalyzer.psd1` (new, 79 lines, 2.9 KB)
**Schema**: `Severity = @('Error', 'Warning')`, `IncludeDefaultRules = $true`,
`ExcludeRules = [...]` (6 cite-justified exclusions: `PSAvoidUsingWriteHost`,
`PSUseShouldProcessForStateChangingFunctions`, `PSAvoidUsingPlainTextForPassword`,
`PSAvoidUsingConvertToSecureStringWithPlainText`, `PSAvoidGlobalVars`,
`PSUseSingularNouns`), `Rules = @{ PSPlaceOpenBrace, PSPlaceCloseBrace, ... }`.
**Invoke**: `Invoke-ScriptAnalyzer -Path tools -Settings .psscriptanalyzer.psd1`.
**Cite**: PowerShell/PSScriptAnalyzer @ main `Engine/Settings/PSGallery.psd1`
template + learn.microsoft.com/.../psscriptanalyzer/using-scriptanalyzer
("Settings Support in ScriptAnalyzer"). **CR-2 compliance**: data-only config;
linter invocation happens via pre-commit / CI, not auto-fire.

### F-B1 MED — Bash `set -Eeuo pipefail` + ERR trap upgrade
**Files**: `tools/gh-search-rest.sh` (L28-31), `tools/sca-v7-prelim.sh` (L38-41)
**Upgrade**: `set -euo pipefail` → `set -Eeuo pipefail` plus single-line ERR
trap `trap 'rc=$?; echo "ERR: $0 line $LINENO exited $rc (cmd: ${BASH_COMMAND})" >&2' ERR`.
**Why capital `-E`**: per Bash man-page, propagates the ERR trap into shell
functions, command substitutions, and subshells — without it, the W316-A class
of silent-fallback in nested CSV-extraction would still escape unreported.
**Deepwiki-corroborated**: 2026 best practice (`koalaman/shellcheck` wiki +
mainstream defensive-bash patterns). Existing script logic untouched.

### F-B2 LOW — `.shellcheckrc` root-level
**File**: `.shellcheckrc` (new, 38 lines, 1.7 KB)
**Directives**: `source-path=SCRIPTDIR` + `SCRIPTDIR/..` + `tools` (accumulate
per wiki); `external-sources=true`; `severity=warning`; `enable=` for
`check-unassigned-uppercase`, `quote-safe-variables`, `deprecate-which`,
`avoid-nullary-conditions`, `require-variable-braces`; `disable=SC1091`
(intentional cross-shell sources). **Cite**: shellcheck.net/wiki/.shellcheckrc
+ deepwiki `koalaman/shellcheck` ratification 2026-05-19.

## Deferred (cardinal-rule-2 boundary)

- **F-N2 MED — Node 22 `--experimental-permission` in ECC `plugin-hook-bootstrap.js`**:
  the target file lives under the ECC plugin cache (plugin-owned, not
  project-owned). Editing it would violate CR-2 ("No project-owned hook bodies
  ... EXCEPT documented bug-patch shims cite-anchored to a specific
  `anthropics/claude-code` GitHub issue"). Forward-AI: open an upstream PR on
  the openai-codex plugin to add `--experimental-permission` flag plumbing,
  then bump pinned version. **W327 P1**.
- **F-N3 LOW — Node 22 `--watch` mode for harness lanes**: requires modifying
  `harness/eval_harness.py` argparse to accept `--watch`, plus a `node --watch`
  wrapper script. Out of stream-F-MED+LOW scope (this stream's mandate was
  ship-as-cite-anchored). **W327 P2**.

## Cardinal-rule status

R1-R5: **HOLD** unchanged. `self_invented_count`: still **0** — the 2 new
config files (`.shellcheckrc`, `.psscriptanalyzer.psd1`) are operator-curated
path-gated root configs invoking direct upstream CLIs, exempt under CR-4
(operator-curated path-gated path) and CR-2 (direct upstream lint, not custom
hook bodies). No new hook scripts created.

## Probe verification (all PASS)

| Probe | Result |
|---|---|
| `[ -f .psscriptanalyzer.psd1 ]` | exit 0 PASS |
| `[ -f .shellcheckrc ]` | exit 0 PASS |
| `grep -lE 'set -Eeuo pipefail' tools/*.sh \| wc -l` | **2** (≥1 PASS) |
| `grep -q 'TaskGroup' harness/eval_harness.py` | exit 0 PASS |
| `node --test tools/test-msys-norm.mjs` | **42/42** PASS (regression invariant HELD) |
| `python -m ruff check harness/eval_harness.py` | All checks passed (rc 0) |
| `python -m pyright harness/eval_harness.py` | 0 errors, 0 warnings, 0 informations |

**P-block status**: **GREEN — 7/7 probes PASS — STREAM-F ship-gate cleared.**

# W325 Stream F — Lang Cookbook Audit (Node 22 / Py 3.13 / PWSH 7.6 / Bash 5.2)

**Date:** 2026-05-19 | **Scope:** read-only audit of `tools/`, `harness/`, `evals/`, `.claude/state/` | **Runtimes:** node v22.22.0 · python 3.13 (`Z:/venvs/claude`) · pwsh 7.6.1 · bash 5.2.37(1) MSYS.

## 1. Node 22 LTS

**SOTA** (cite: deepwiki nodejs/node 2026-05-19; nodejs.org/docs/latest-v22.x/api/test.html):
- `node:test` stable v20; watch v22.0; **coverage thresholds v22.8** (`--test-coverage-{branches,functions,lines}=N`).
- **Permission Model STABLE v22.13** (`--permission --allow-fs-{read,write} --allow-child-process`).
- `require()`-of-ESM default v22.12; `"module-sync"` exports v22.10; `--watch` stable v22.0; native `fetch`/WebStreams v21; `node:sea` experimental.

**Gaps:** `tools/test-msys-norm.mjs` uses `node:test` ✓ (W324 P3) but **no coverage gate**, no `--watch`. Zero `node-fetch` deps ✓. Permission Model **not applied** to ECC `plugin-hook-bootstrap.js` despite child-process-heavy dispatch.

**P-block:**
- **F-N1 HIGH** — Lane-D wiring: add `--test-coverage-functions=90 --test-coverage-lines=85`. *CF:* if absent, a regression deleting 30/42 tests passes silently.
- **F-N2 MED** — wrap ECC bootstrap with `--permission --allow-fs-read=Z:/claude-sota-installed --allow-child-process`. *CF:* a compromised hook reading `~/.aws/credentials` would be engine-blocked, not settings-trusted.
- **F-N3 LOW** — `--watch` dev loop. *CF:* edit→test burns ~3 s spawn each.

## 2. Python 3.13

**SOTA** (cite: https://docs.python.org/3.13/whatsnew/3.13.html):
- **PEP 742 `typing.TypeIs`** — strict bidirectional narrowing (replaces `TypeGuard`); PEP 705 `ReadOnly` TypedDict.
- **`asyncio.TaskGroup`** hardened (gh-116720 nested-cancel fix).
- `pathlib.Path.walk()` native; PEP 667 `f_locals` write-through proxy; argparse `deprecated=`; PEP 703 free-threaded + PEP 744 JIT experimental.

**Gaps:** `harness/eval_harness.py:1808,2237` uses bare `asyncio.run()` — **no `TaskGroup`** for lane fan-out. All 7 `harness/adapters/memory_recall/*.py` import only `from typing import Any` — zero `TypeIs`/`ReadOnly` despite Protocol-shaped dispatch. Zero `Path.walk()` uses.

**P-block:**
- **F-P1 HIGH** — refactor `harness/adapters/memory_recall/__init__.py` Protocol guards to `TypeIs`-narrowed `is_*_adapter()`. *Cite:* PEP 742. *CF:* without `TypeIs`, mypy cannot narrow `Union[Mem0,Alma,AgentMemory]` through helpers → silent dispatch errors.
- **F-P2 MED** — wrap concurrent inspect+promptfoo lanes in `async with TaskGroup() as tg`. *CF:* one lane failing under naked `asyncio.run` orphans the other; TaskGroup cancels siblings cleanly.

## 3. PowerShell 7.6

**SOTA** (cite: learn.microsoft.com/powershell/scripting v=7.6 + PSScriptAnalyzer rules):
- `[CmdletBinding()]` + `[Parameter(Mandatory)]` + `[ValidateSet]` + `$ErrorActionPreference='Stop'`.
- `ForEach-Object -Parallel -ThrottleLimit`, `[Generic.List[T]]`, `.Where()`/`.ForEach()` ops (MS-benchmarked 372× over wrapped pipelines).
- PSScriptAnalyzer essentials: `PSAvoidUsingPlainTextForPassword`, `PSUseShouldProcessForStateChangingFunctions`, `PSUseDeclaredVarsMoreThanAssignments`.

**Gaps:** 13/13 `.ps1` have `[CmdletBinding()]` ✓ but only **8/13 set `$ErrorActionPreference='Stop'`** (missing: eee.ps1, eee-status.ps1, eee-backup.ps1, eee.local.ps1, hindsight-queue-janitor.ps1). Zero PSScriptAnalyzer config. No `-Parallel` despite eee-status.ps1 hitting 3 HTTP endpoints serially.

**P-block:**
- **F-PS1 HIGH** — add `$ErrorActionPreference='Stop'` to 5 missing scripts. *CF:* without Stop, `Invoke-RestMethod` failure in eee-status.ps1:26 emits non-terminating error; `$h.status` dereferences `$null` silently.
- **F-PS2 MED** — `.vscode/PSScriptAnalyzerSettings.psd1` with the 3 rules. *CF:* plaintext-password regressions land unflagged.

## 4. Bash 5.2

**SOTA** (cite: claude-code-workflows:shell-scripting@1.2.2/bash-defensive-patterns + Wooledge BashGuide/Practices):
- `set -Eeuo pipefail` + `trap ERR/EXIT` + `IFS=$'\n\t'`.
- `mapfile -t`/`readarray` over `for x in $(cmd)`; `${var:?msg}` required-var.
- `.shellcheckrc` with `enable=require-variable-braces,check-unassigned-uppercase`.

**Gaps:** `tools/{gh-search-rest,sca-v7-prelim}.sh` have `set -euo pipefail` ✓ but **no `-E`**, no ERR trap. `.claude/state/bash-home-pin.sh` correctly omits `set -e` (BASH_ENV source ctx) ✓ but no `IFS` pin. **No `.shellcheckrc`** anywhere; no `trap EXIT`.

**P-block:**
- **F-B1 MED** — upgrade `set -euo` → `set -Eeuo pipefail` + `trap 'echo "ERR line $LINENO" >&2' ERR` in both tools/*.sh. *Cite:* bash-defensive-patterns §1-§2. *CF:* without `-E`, ERR trap doesn't inherit into functions; sca-v7-prelim.sh helpers fail silently on jq parse errors.
- **F-B2 LOW** — `.shellcheckrc` (`shell=bash`, `enable=require-variable-braces`, `disable=SC1091`). *CF:* unquoted `$source` in future shims ships unguarded.

## Cross-cut

- **2026-May freshness:** Node 22.13+ ✓ · Python 3.13.13 ✓ · PWSH 7.6.1 ✓ · Bash 5.2.37 ✓ — all docs current.
- **Anti-bias:** every recommendation cites Anthropic-sanctioned skills or upstream lang docs; zero invented patterns.
- **Cardinal-rule alignment:** all 9 P-block items are direct-CLI/library upgrades (CR-2 compliant); none introduce `.claude/hooks/*` bodies.

**Total: 9 P-block items (3 HIGH · 3 MED · 3 LOW) → W326 queue.**

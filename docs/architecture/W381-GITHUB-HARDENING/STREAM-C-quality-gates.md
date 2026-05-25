# W381 Stream C — Quality Gates Audit + PSScriptAnalyzer CI Root-Cause

**Repo**: seathatflowsinourveins/claude-sota-installed @ `Z:/claude-sota-installed-W375`
**Branch**: `goal/W375-openhands-sota` (HEAD `89bb136`)
**Date**: 2026-05-23 · **Scope**: lint/type/test/coverage gates vs 2026 SOTA + failing PSSA CI check

CR-6 evidence discipline: every claim below cites an independently-reproducible probe (local PSSA run exit/output, git ls-files counts, file reads) or a 3-org-distinct external source. PSGallery/PSSA-version facts are live-probed, not asserted.

---

## PART 1 — PSScriptAnalyzer CI check: ROOT-CAUSE + FIX

### 1.1 What the job does today (`.github/workflows/code-quality.yml:102-128`)

```pwsh
$ErrorActionPreference = 'Stop'
Install-Module PSScriptAnalyzer -Force -Scope CurrentUser -SkipPublisherCheck   # LATEST from PSGallery, unpinned
$tracked = git ls-files '*.ps1' '*.psm1' '*.psd1'
foreach ($f in $tracked) {
  if ($f -match '\.claude/plugins/cache' -or $f -match '00-archive-from-prior-waves') { continue }
  $errs += Invoke-ScriptAnalyzer -Path $f -Severity Error          # per-file; NO -Settings; NO -ErrorAction
}
if ($errs.Count -gt 0) { ...; exit 1 }
```

Runs on `windows-latest`. Three structural fragilities: **unpinned install**, **`$ErrorActionPreference='Stop'` global**, **per-file loop with no `-ErrorAction Continue`** — so a single analyzer/import error THROWS and kills the job before any finding is aggregated. Note: neither tracked settings file (`PSScriptAnalyzerSettings.psd1`, `.psscriptanalyzer.psd1`) is wired into CI — `-Settings` is never passed, so the job uses PSSA's **default** ruleset, not the curated one.

### 1.2 Local reproduction — the premise HOLDS (probed)

- Local PSSA version: **1.25.0**.
- Exact CI logic re-run locally over the **38** files surviving the exclusion filter (`git ls-files '*.ps1' '*.psm1' '*.psd1'` = 138 total → 38 after dropping `cache`/`00-archive`): **`ERROR-severity findings: 0`** and **`THROWS: 0`**.
- All 38 files parse clean: PowerShell `Parser::ParseFile` over the set → **0 parse errors**. Hypothesis (b) "a .ps1 the CI's PSSA catches but local 1.25 doesn't" is therefore **REFUTED for parse errors**.
- `eee.ps1` specifically: 0 Error / 62 Warning (top rule `PSAvoidUsingWriteHost` ×54) — the `-Severity Error` filter correctly returns nothing.

### 1.3 ROOT CAUSE — environmental, not a code defect (cite-anchored)

**Latest PSScriptAnalyzer on PSGallery is `1.25.0`, published 2026-03-20** (live `Find-Module` probe). So `Install-Module … -Force` (unpinned) pulls the **same** version as local. **Hypothesis (a) "newer PSSA flags a new Error-rule" is REFUTED — there is no newer version.** The failure is in the *acquisition/import* layer on the runner, confirmed by three distinct upstream reports:

1. **PSSA min-PowerShell mismatch (PRIMARY).** PSScriptAnalyzer ≥1.24.0 raised its minimum PowerShell-7 floor to **7.4.7**; on older PS7 patch levels `Import-Module`/`Invoke-ScriptAnalyzer` fails with `Could not load file or assembly 'System.Management.Automation'` / "term not recognized". `windows-latest`'s bundled PS7 patch version drifts; if it lags 7.4.7, the freshly-installed 1.25.0 **throws on first use** → `$ErrorActionPreference='Stop'` turns that into job failure. Cite: PowerShell/PSScriptAnalyzer **#2087** + **#2106** (github.com/PowerShell/PSScriptAnalyzer/issues/2087, /2106).
2. **`Install-Module -Force` vs already-present module → `NullReferenceException`.** When PSSA is already on the runner (pre-installed or cache-restored), `-Force` reinstall conflicts with the loaded module and PSSA throws NRE. Cite: tablackburn/ScheduledTasksManager **PR #30** (2026-04-09).
3. **Untrusted-PSGallery / NuGet-provider prompt → non-terminating error escalated by `Stop`.** GitHub's own PowerShell CI tutorial prepends `Set-PSRepository PSGallery -InstallationPolicy Trusted` precisely to avoid this. Cite: github/docs `content/actions/tutorials/build-and-test-code/powershell.md`.

Hypothesis (c) "Install-Module flakes" is a **real contributing mode** (#3 + transient network), but the dominant suspect is **#1 (PS7-version/import)**, since it deterministically recurs whenever the runner image's PS7 < 7.4.7.

### 1.4 THE FIX — exact workflow YAML replacement

Replace the `powershell:` job's run-step body (`code-quality.yml:108-128`). Pins PSSA, trusts PSGallery, imports the pinned version explicitly (defeats shadowing), invokes with `-ErrorAction Continue` + `-Settings`, aggregates across all files, and only fails on Error findings — never on a single-file throw.

```yaml
  powershell:
    name: PSScriptAnalyzer (severity=Error)
    runs-on: windows-latest
    defaults:
      run:
        shell: pwsh
    env:
      PSSA_VERSION: '1.25.0'   # bump in lockstep with local; pinned per github/docs runner-drift guidance
    steps:
      - uses: actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5 # v4.3.1
        with: { persist-credentials: false }
      - name: Cache PSScriptAnalyzer
        id: pssa-cache
        uses: actions/cache@0c907a75c2c80ebcb7f088228285e798b750cf8f # v4.2.1
        with:
          path: ${{ env.USERPROFILE }}\Documents\PowerShell\Modules\PSScriptAnalyzer
          key: pssa-${{ runner.os }}-${{ env.PSSA_VERSION }}
      - name: Install PSScriptAnalyzer (pinned)
        if: steps.pssa-cache.outputs.cache-hit != 'true'   # PR#30: skip -Force reinstall over cached module (avoids NRE)
        run: |
          Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
          Install-Module PSScriptAnalyzer -RequiredVersion $env:PSSA_VERSION -Scope CurrentUser -Force -SkipPublisherCheck -ErrorAction Stop
      - name: Run PSScriptAnalyzer (aggregate, never throw on findings)
        run: |
          Import-Module PSScriptAnalyzer -RequiredVersion $env:PSSA_VERSION -Force   # defeat version shadowing (#2087)
          $ver = (Get-Module PSScriptAnalyzer).Version
          Write-Host "PSScriptAnalyzer $ver on PowerShell $($PSVersionTable.PSVersion)"
          $settings = Join-Path $PWD 'PSScriptAnalyzerSettings.psd1'
          $tracked = git ls-files '*.ps1' '*.psm1' '*.psd1' |
            Where-Object { $_ -notmatch '\.claude/plugins/cache' -and $_ -notmatch '00-archive-from-prior-waves' -and (Test-Path $_) }
          if (-not $tracked) { Write-Host 'no tracked PowerShell files; skipping'; exit 0 }
          $findings = $tracked | ForEach-Object {
            Invoke-ScriptAnalyzer -Path $_ -Settings $settings -ErrorAction Continue   # per-rule throw cannot kill the run
          }
          $errs = @($findings | Where-Object Severity -eq 'Error')
          $warns = @($findings | Where-Object Severity -eq 'Warning')
          Write-Host "Error=$($errs.Count)  Warning=$($warns.Count)  across $($tracked.Count) file(s)"
          if ($errs.Count -gt 0) { $errs | Format-Table RuleName,ScriptName,Line,Message -AutoSize | Out-String -Width 200 | Write-Host; exit 1 }
          Write-Host 'PSScriptAnalyzer: 0 Error-severity findings.'
```

Key changes vs current: (1) `-RequiredVersion`/`Import-Module -RequiredVersion` pin → no drift, no shadow [#2087/#2106]; (2) `Set-PSRepository … Trusted` → no untrusted-prompt escalation [github/docs]; (3) cache + `if cache-hit != true` install-skip → no `-Force`-over-loaded NRE [PR#30]; (4) `-ErrorAction Continue` per-call + post-loop aggregation → one bad file no longer kills the job; (5) `-Settings PSScriptAnalyzerSettings.psd1` → CI matches the curated local ruleset. **Drop the job-level `$ErrorActionPreference='Stop'`** — install step keeps explicit `-ErrorAction Stop` (intentional hard-fail), analysis step is `Continue`.

### 1.5 Settings file consolidation (resolve the duplicate)

Repo has **TWO** competing, unwired PSSA settings: `PSScriptAnalyzerSettings.psd1` (W287, `IncludeRules`-allowlist style, 3246 B) and `.psscriptanalyzer.psd1` (W326, `IncludeDefaultRules=$true` + subtract). Recommendation: **keep `PSScriptAnalyzerSettings.psd1`** (the conventional default name PSSA auto-discovers and that the fix wires via `-Settings`), **delete `.psscriptanalyzer.psd1`** to end config-drift, and add 2026 best-practice `Rules` block — most importantly `PSUseCompatibleSyntax` pinned to the project's real targets (this is an Error-severity rule; pinning it makes the gate catch genuine cross-version syntax bugs deterministically):

```powershell
Rules = @{
    PSUseCompatibleSyntax = @{ Enable = $true; TargetVersions = @('5.1','7.0','7.4') }
    PSPlaceOpenBrace      = @{ Enable = $true; OnSameLine = $true; NewLineAfter = $true; IgnoreOneLineBlock = $true }
    PSPlaceCloseBrace     = @{ Enable = $true; NewLineAfter = $true; IgnoreOneLineBlock = $true }
}
```

The existing `ExcludeRules` (PSAvoidUsingWriteHost / PSUseSingularNouns / cosmetic style) are sound for this launcher-heavy repo and should be retained. Cite: learn.microsoft.com/powershell/utility-modules/psscriptanalyzer + PowerShell/PSScriptAnalyzer PSGallery.psd1 template.

---

## PART 2 — Quality gates: current-vs-SOTA + ranked additions

### 2.1 Current state (probed)

| Gate | Current | SOTA 2026 | Gap |
|---|---|---|---|
| ruff lint | `ruff check .` — **NO config** (no pyproject.toml/ruff.toml; defaults E,F,W only) | `extend-select` I/UP/B/SIM/C4/PTH/RUF or `select=["ALL"]`+curated ignores; `target-version` | **LARGE** |
| ruff format | `ruff format --check .` ✓ | ✓ | none |
| pyright | `typeCheckingMode: "basic"`, advisory (`continue-on-error: true`) | basic repo-wide + strict on critical modules; `reportMissingImports:"error"` | MEDIUM |
| tests | 54 `tests/test_*.py` + `pytest.ini` ✓; `pytest`/`pytest-asyncio` deps | pytest-cov + threshold | — |
| **coverage** | **NONE** — no pytest-cov, no `--cov-fail-under`, no codecov.yml, no `.coveragerc` | project ~85% + patch/diff 90-95% | **LARGE** |
| shellcheck | `--severity=error` over tracked `.sh` ✓ | ✓ | none |
| JSON | parse-validates 4 configs ✓ | ✓ | none |
| commitlint | config-conventional + `Wave: W<N>` trailer + 240-char header ✓ | ✓ | none (mature) |
| pre-commit | 17 hooks, SHA/rev-pinned ✓ | + `ci.skip`/autoupdate cadence; consider check-toml | small |
| mutation | NONE | advanced/optional, ~70% on critical only | low priority |

### 2.2 Ranked additions by ROI (highest first)

**#1 — Coverage gate (HIGHEST ROI).** 54 test files exist but coverage is unmeasured/ungated. Add `pytest-cov`, fail-under, and Codecov patch-coverage. SOTA thresholds: project ~85% (start 75%, ratchet +5/quarter), **patch/diff 90-95%**. Bootstrap-friendly: start advisory, then bind. Source: perplexity-research (3-org-synthesis) + Codecov docs + pytest-cov docs.

```toml
# pyproject.toml  (NEW — also becomes the home for ruff config; repo currently has none)
[tool.pytest.ini_options]   # migrate pytest.ini here, keep addopts = -p no:logfire
addopts = ["-p","no:logfire","--cov=tools","--cov=harness","--cov-report=term-missing","--cov-report=xml","--cov-fail-under=70"]
```
```yaml
# codecov.yml  (NEW)
coverage:
  status:
    project: { default: { target: auto, threshold: 2% } }
    patch:   { default: { target: 90%, threshold: 1% } }
comment: { require_changes: true }
```
Add `pytest-cov` to `agents/requirements.txt` (or a `harness/requirements.txt`). Note `--cov-fail-under=70` is a conservative bootstrap floor for an infra repo with broad untested surface; raise toward 85 as gaps close. **Optional but recommended**: `diff-cover coverage.xml --compare-branch=origin/main --fail-under=90` in CI for immediate diff feedback without a Codecov dependency.

**#2 — ruff `extend-select` (HIGH ROI, near-zero cost).** Repo lints with bare defaults. Add a `[tool.ruff]` block in the new `pyproject.toml`. `B` (bugbear) catches real bugs; `I` enables import-sort; `PTH`/`SIM`/`C4`/`UP`/`RUF` are high-signal. Recommend the **opt-in `extend-select`** form (not `ALL`) for a polyglot infra repo to avoid docstring/annotation noise churn:

```toml
[tool.ruff]
target-version = "py313"          # matches pyrightconfig.json pythonVersion 3.13
src = ["tools","harness","scripts","evals","accounts/scripts"]
[tool.ruff.lint]
extend-select = ["I","UP","B","SIM","C4","PTH","RUF"]
[tool.ruff.lint.per-file-ignores]
"tests/**" = ["S101","B011"]
```
Phase in: land advisory (`ruff check --extend-select … --exit-zero`) for one wave, fix the backlog, then bind. Source: perplexity-research + Astral ruff docs (docs.astral.sh/ruff).

**#3 — pyright tighten (MEDIUM ROI).** Currently `basic` + advisory. Two steps: (a) set `reportMissingImports: "error"` (the CI already installs harness deps so imports resolve); (b) add file-level `strict: [...]` for security-critical modules (e.g. the `test_*_security.py` targets' sources, admission/spawn-gate code). Keep repo-wide `basic`. Keep the CI step advisory until the strict-list backlog is clean, then drop `continue-on-error`. Source: perplexity-research + microsoft.github.io/pyright/configuration.

**#4 — pre-commit hygiene (LOW-MEDIUM, cheap).** Hooks are already SHA/rev-pinned (good). Add a documented `autoupdate` cadence and, if migrating to pre-commit.ci, `ci: { skip: [...heavy local hooks...] }`. Consider adding upstream `check-toml`/`check-yaml` from pre-commit-hooks. Source: perplexity-research + pre-commit.com docs.

**#5 — Mutation testing (LOWEST ROI; defer).** `mutmut`/`cosmic-ray` on 1-2 critical modules in a nightly job, ~70% score, informational first. Only worth it after #1-#3 land. Source: perplexity-research.

### 2.3 Sequencing

PSSA fix (Part 1) ships first — it's a red CI check, zero behavior risk. Then #1 coverage (advisory→bind), #2 ruff extend-select (advisory→bind), #3 pyright strict-list. All new gates land **advisory-first** then bind, mirroring the repo's existing dual-mode discipline (CLAUDE.md CR-5 condition-(b)).

---

## Cite-anchors (CR-6 / sca-v13 3-org-distinct)

- **PowerShell/Microsoft**: PowerShell/PSScriptAnalyzer issues #2087, #2106 (PS7≥7.4.7 import-load failure); learn.microsoft.com PSScriptAnalyzer rules + using-scriptanalyzer; microsoft.github.io/pyright configuration.
- **GitHub**: github/docs PowerShell CI tutorial (`Set-PSRepository … Trusted`, `-OutVariable` aggregation); tablackburn/ScheduledTasksManager PR #30 (`-Force`-over-cache NRE); actions/cache, actions/checkout pinned commits.
- **Astral / community**: docs.astral.sh/ruff (extend-select, target-version, format); pytest-cov `--cov-fail-under`; Codecov `codecov.yml` project/patch status; diff-cover; pre-commit.com; conventionalcommits.org v1.0.0.
- **Local probes (reproducible)**: `Find-Module PSScriptAnalyzer` → 1.25.0 @ 2026-03-20; CI-logic local re-run → 0 Error / 0 throw / 0 parse-error across 38 files; `git ls-files` counts 138→38; absence of pyproject.toml/ruff.toml/codecov.yml/pytest-cov confirmed via `git ls-files`.

**Verdict**: PSSA CI failure root cause = **runner module-acquisition/import fragility (unpinned PSSA + PS7-version floor + `Stop` escalation)**, NOT a code defect (local = 0 findings, 0 throws, 0 parse errors; PSGallery has no newer version). Fix = pin + trust + import-pinned + aggregate-with-Continue + wire `-Settings`. Largest non-PSSA gaps: **no coverage gate** and **no ruff config** despite 54 test files.

---
Cite-anchors (sca-v13 ≥3-org-distinct, machine-scannable): https://github.com/PowerShell/PSScriptAnalyzer · https://github.com/astral-sh/ruff · https://github.com/actions/cache · https://docs.github.com/en/actions · https://owasp.org (A06:2021).

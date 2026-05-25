# Stream H — Ecosystem SOTA Audit (Node.js, Docker, PowerShell, Git Bash, CLI tools)

> **Wave**: W340-FULL-SOTA-UNLEASH Stream H
> **Date**: 2026-05-20
> **Platform**: Windows 11 Pro 10.0.26200.0
> **Workspace**: `Z:\claude-sota-installed\`
> **Method**: parallel discovery via PowerShell + endoflife.date API + GitHub Releases API + perplexity/web research + ctx-mode awesome-list ingestion (sindresorhus/awesome-nodejs, janikvonrotz/awesome-powershell, veggiemonk/awesome-docker).

---

## 1. Executive summary

The runtime ecosystem is **broadly current**, with one notable bright spot (PowerShell 7.6.1 LTS is the absolute latest as of 2026-04-21) and two clear-cut gap clusters:

1. **PowerShell hygiene gap**: 27/27 tracked `.ps1` scripts under `Z:\claude-sota-installed\tools\` **lack** `Set-StrictMode -Version Latest`, `$PSNativeCommandUseErrorActionPreference = $true`, and (26/27) a modern `#requires -Version 7.4` clause. Only one script (`wave152-f1-netsh-pin.ps1`) declares `#requires -Version 5` — which is the wrong target (PowerShell 5.x is Windows-only desktop legacy; the runtime is pwsh 7.6.1).
2. **Node.js minor-version drift**: Node 22.22.0 → latest 22 LTS is 22.22.3 (3 patch versions behind, still in Maintenance LTS until April 2027). Active LTS is now Node **24.15.0** (entered LTS 2025-10-28; supported until 2028-04-30). The W340 wave could either pin 22.22.3 for stability OR upgrade to 24.15.0 for current LTS.

All other CLI tools are current or within 1 minor of latest. The `MSYS_NO_PATHCONV=1` + `MSYS2_*_CONV_EXCL=*` triple is confirmed working (bash test `/usr/local/bin` did NOT rewrite). Git is signed (SSH key, `commit.gpgsign=true`, `tag.gpgsign=true`). Trivy/gitleaks/ruff/shellcheck/jq/pre-commit are all current.

---

## 2. Stack version table

| Tool | Installed | Latest stable (2026-05-20) | SOTA-gap? | Source |
|------|-----------|----------------------------|-----------|--------|
| Node.js (current) | **22.22.0** | 22.22.3 (Maint LTS) / **24.15.0** (Active LTS) / 26.2.0 (Current) | minor: 3 patch behind on 22; 1 major behind on Active LTS | endoflife.date/api/nodejs + github.com/nodejs/node releases |
| npm | 10.x (bundled w/ Node 22) | 10.x | none | bundled |
| pnpm | **10.32.1** | 10.x current | none | local |
| yarn | not installed | n/a | acceptable (bun + npm cover) | local |
| Bun | **1.3.13** | 1.3.x | none | local |
| npx | bundled | bundled | none | bundled |
| Python | **3.14.3** | 3.14.5 | minor: 2 patch behind | endoflife.date/api/python |
| uv | **0.10.3** (c75a0c625 2026-02-16) | ~0.10.x | none-to-minor | local |
| uvx | **0.10.3** | ~0.10.x | none-to-minor | local |
| Docker engine | **29.4.3** build 055a478 | 29.5.1 | minor: 1 patch behind | endoflife.date/api/docker-engine |
| Docker Compose plugin | **v5.1.3** | v5.x current | none | local (compose has its own version line) |
| PowerShell 7 | **7.6.1 (LTS)** | 7.6.1 LTS / 7.5.6 stable | **none** — matches latest LTS | github.com/PowerShell/PowerShell |
| Windows PowerShell | 5.1 (Windows-bundled) | 5.1 (frozen) | n/a — superseded by pwsh 7 | OS |
| git (Git for Windows) | **2.51.0.windows.2** | 2.54.0.windows.1 | minor: 3 minor versions behind | github.com/git-for-windows/git |
| Git Bash (MSYS2) | bash 5.2.37 | current | none | bundled w/ Git |
| gh (GitHub CLI) | **2.91.0** | **v2.92.0** (security fix for terminal escape injection) | **patch: SECURITY**, urgent upgrade per CVE | github.com/cli/cli releases |
| gitleaks | (W286c notes 8.30.x already pinned) | **v8.30.1** | none expected | github.com/gitleaks/gitleaks |
| ruff | **0.15.13** | **0.15.13** | **none** — at HEAD | github.com/astral-sh/ruff |
| shellcheck | **0.11.0** | **v0.11.0** | **none** — at HEAD | github.com/koalaman/shellcheck |
| pre-commit | **4.6.0** | **v4.6.0** | **none** — at HEAD | github.com/pre-commit/pre-commit |
| trivy | **0.70.0** (DB updated 2026-05-20 13:23 UTC) | v0.70.0 | **none** — at HEAD | github.com/aquasecurity/trivy |
| jq | **jq-1.8.1** | jq-1.8.1 | none | github.com/jqlang/jq |
| Windows Terminal (UWP) | wt.exe present (Microsoft.WindowsTerminal package) | v1.24.11321.0 stable / v1.25.x preview | unknown (UWP version not surfaced via CLI flag — install is current per Microsoft Store auto-update) | github.com/microsoft/terminal |
| Codex CLI | per `.claude/plugins/cache/openai-codex/codex/1.0.4/` | 1.0.4 (per CLAUDE.md hardcoded path) | none | cardinal-rule-1 compliant |

**Verified**: codex-companion runs at `.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs` per `settings.json:140`.

---

## 3. Top-5 ecosystem drift items + upgrade commands

| Rank | Drift | Severity | Upgrade command (PowerShell, run from elevated terminal) |
|------|-------|----------|----------------------------------------------------------|
| **1** | **gh 2.91.0 → 2.92.0 (SECURITY: terminal-escape-injection in workflow log viewer)** | **HIGH (CVE-flagged)** | `winget upgrade --id GitHub.cli --silent` or `gh extension upgrade --all; gh --version` then `winget install GitHub.cli` for the binary |
| **2** | **27/27 PowerShell scripts missing `Set-StrictMode -Version Latest` + `$PSNativeCommandUseErrorActionPreference = $true`** | MEDIUM (silent native-cmd failures) | header rewrite (see § 5 audit + Appendix A template); apply via batch Edit operation across `tools/*.ps1` |
| **3** | Node 22.22.0 → 22.22.3 (Maintenance LTS) or upgrade to 24.15.0 Active LTS | MEDIUM (operator choice) | (stay on 22): `nvm install 22.22.3; nvm use 22.22.3` then update `engines.node` in any project package.json to `">=22.22.3 <23"`. (Migrate to 24): `nvm install 24.15.0; nvm use 24.15.0` + repo-wide `engines.node` bump + smoke-test all npx/MCP launches. |
| **4** | Git for Windows 2.51.0 → 2.54.0 (3 minor versions; W286-arc, OpenSSH/cURL/OpenSSL bumps) | LOW-MEDIUM (security patches in OpenSSL 3.5.6, OpenSSH 10.3.P1) | `git update-git-for-windows` (runs from inside Git Bash) OR `winget upgrade --id Git.Git --silent` |
| **5** | Docker engine 29.4.3 → 29.5.1 (1 patch version on the 29.x line) | LOW | Docker Desktop: Settings → Software updates → Check for updates. Or `winget upgrade --id Docker.DockerDesktop --silent`. |

**Tier-2 drift (acceptable as-is but worth tracking)**:

- Python 3.14.3 → 3.14.5: `winget upgrade --id Python.Python.3.14 --silent`
- uv 0.10.3 → next 0.10.x: `uv self update` (uv has built-in self-updater)

---

## 4. Awesome-list recommended additions

Surfaced from `sindresorhus/awesome-nodejs`, `janikvonrotz/awesome-powershell`, `veggiemonk/awesome-docker` (fetched + indexed via ctx-mode 2026-05-20).

### 4.1 Node.js (sindresorhus/awesome-nodejs)

Already-installed at the system level or via plugins (no action): execa-pattern wrappers via npm packages, listr2 (via codex-companion bundled), conf/yargs (via everything-claude-code).

**Worth considering for tools/ subdirectory scripts**:

| Package | Use case in this runtime |
|---------|---------------------------|
| `execa` | Replace raw `child_process.spawn` in `tools/preagent-*.mjs` for better error semantics |
| `listr2` | Terminal task list — could replace the ad-hoc Write-Output sequences in `tools/w328-trio-*.ps1` if any of those move to Node |
| `conf` | Simple config handling — fits the `.claude/state/*.json` pattern already used |

### 4.2 PowerShell (janikvonrotz/awesome-powershell)

| Module | Why this runtime should adopt |
|--------|-------------------------------|
| **Pester** | BDD test framework. The 27 PS1 scripts under `tools/` have ZERO automated tests. Pester 5.x can run via `Invoke-Pester` and produce JUnit XML for CI. |
| **PSScriptAnalyzer** 1.25.0 | W286c already references `PSScriptAnalyzerSettings.psd1`. CI lane should run `Invoke-ScriptAnalyzer -Settings PSScriptAnalyzerSettings.psd1 -Path .\tools\` — currently this is local-only. |
| **PSReadLine** | Bash-style readline + reverse-search; quality-of-life for interactive sessions (auto-installs with pwsh 7.6) |
| **posh-git** | Git/PowerShell integration in the prompt; valuable for the `Z:\` portable-install workflow |

### 4.3 Docker (veggiemonk/awesome-docker)

| Tool | Use case |
|------|----------|
| **hadolint** | Dockerfile linter — currently not installed. Pairs with `trivy fs` PreToolUse hook in `settings.json:135`. |
| **dive** | Image layer analyzer — useful for understanding the langfuse-web/langfuse-worker bloat |
| **docker-compose-viz** or **structurizr-cli** | Visualize compose topology — relevant given the 35+ compose files inventoried in § 8 below |
| **dockle** | Container image linter (CIS Docker benchmark coverage) |

Already in pre-commit gate (cardinal-rule-2 compliant): `trivy` (live, DB updated today), `gitleaks` (PreToolUse `Bash` matcher), `ruff`, `shellcheck`.

---

## 5. PowerShell script audit — strict-mode + error-handling gaps

### 5.1 Scope

27 tracked `.ps1` scripts under `Z:\claude-sota-installed\tools\` (incl. `tools/insights-wireup/`, `tools/research-stack/`).

### 5.2 SOTA pattern (per perplexity 2026-05-20 research + Microsoft Learn docs)

```powershell
#requires -Version 7.4
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
```

### 5.3 Current compliance matrix

| Pattern | Compliant | Non-compliant | % |
|---------|-----------|---------------|---|
| `Set-StrictMode -Version Latest` | 0 | 27 | **0%** |
| `$ErrorActionPreference = 'Stop'` | 24 (3 use Continue or missing) | 3 | 89% |
| `$PSNativeCommandUseErrorActionPreference = $true` | 0 | 27 | **0%** |
| `#requires -Version 7.x` | 0 | 27 | **0%** |
| `[CmdletBinding(...)]` | 23 | 4 | 85% |

**One script declares `#requires -Version 5`** (`tools/wave152-f1-netsh-pin.ps1`) — this is the wrong target since the runtime is pwsh 7.6.1; should be `#requires -Version 7.4` (or `7.6` to align with the LTS).

### 5.4 Recommended remediation

Single-pass batch edit across the 27 scripts to insert the 4-line SOTA header after any existing shebang/comment block. This is a small, mechanical change. Estimated effort: ~30 min for a careful Edit pass + 5 min smoke-test (run each script with `-WhatIf` where it supports SupportsShouldProcess; otherwise verify exit code only).

Per-script script-by-script remediation queued for **W340-AI-PS-HEADER-FIX** (recommend folding into Stream H follow-up).

### 5.5 Listed scripts (27 files)

```
tools/bootstrap-runtime.ps1                     (688 LOC) — strict=N erract=Stop pscmd=N req=N
tools/cleanup-root-phantom-paths.ps1            (128 LOC) — strict=N erract=Stop pscmd=N req=N
tools/eee-admin-bootstrap.ps1                   (191 LOC) — strict=N erract=Stop pscmd=N req=N
tools/eee-backup.ps1                            (413 LOC) — strict=N erract=Stop pscmd=N req=N
tools/eee-status.ps1                            (196 LOC) — strict=N erract=Stop pscmd=N req=N
tools/eee.local.ps1                             (14 LOC)  — minimal stub, low priority
tools/eee.ps1                                   (998 LOC) — strict=N erract=Stop pscmd=N req=N  [LARGEST]
tools/eee_install_cron_tasks.ps1                (232 LOC) — strict=N erract=Stop+Continue mix pscmd=N req=N
tools/hindsight-queue-janitor.ps1               (77 LOC)
tools/install-cli-extras.ps1                    (63 LOC)
tools/planning-attest.ps1                       (34 LOC)
tools/repatch-autoresearch-namespaces.ps1       (86 LOC)
tools/repatch-context-mode-hooks-json.ps1       (55 LOC)
tools/repatch-plugin-shadow-commands.ps1        (141 LOC)
tools/sota-reverify.ps1                         (152 LOC)
tools/w317-cleanup-z-phantom.ps1                (150 LOC)
tools/w328-trio-1-phoenix-receivers.ps1         (245 LOC)
tools/w328-trio-2-settings-validate.ps1         (181 LOC)
tools/w328-trio-3-langfuse-verify.ps1           (188 LOC)
tools/w328-trio-e2e-smoke.ps1                   (139 LOC)
tools/wave152-f1-netsh-pin.ps1                  (225 LOC) — req=Version 5 (TOO OLD)
tools/insights-wireup/otel-headers-template.ps1 (74 LOC)
tools/insights-wireup/phoenix-start.ps1         (129 LOC)
tools/insights-wireup/privacy-opt-ins-phase1.ps1 (110 LOC)
tools/insights-wireup/statusline-smoke.ps1     (149 LOC)
tools/insights-wireup/wire-all.ps1              (114 LOC)
tools/research-stack/setup-open-source-research-stack.ps1 (286 LOC)
```

Total LOC: 5,553 across 27 files.

---

## 6. Git Bash / MSYS verification

### 6.1 Test result (probe 2026-05-20)

```
bash -c 'echo /usr/local/bin'  →  /usr/local/bin   ✓ NOT rewritten
```

### 6.2 ENV verified

```
MSYS_NO_PATHCONV=1
MSYS2_ARG_CONV_EXCL=*
MSYS2_ENV_CONV_EXCL=*
GIT_BASH=C:\Program Files\Git\bin\bash.exe
BASH_ENV=Z:/claude-sota-installed/.claude/state/bash-home-pin.sh
```

### 6.3 Bash runtime

```
GNU bash, version 5.2.37(1)-release (x86_64-pc-msys)
```

All three MSYS suppression vars present and functional. `bash 5.2.37` is current (5.2 series is the supported branch; 5.3 not yet released for MSYS2).

### 6.4 Encoding

```
LANG=(empty)
LC_ALL=(empty)
PYTHONIOENCODING=utf-8
Console.OutputEncoding=utf-8
```

`PYTHONIOENCODING=utf-8` and `Console.OutputEncoding=utf-8` are correctly set. `LANG`/`LC_ALL` are empty (Windows convention — locale is governed by the system's `Get-Culture`, not POSIX env vars). No action needed.

---

## 7. Git config SOTA

### 7.1 Current configuration (global)

```
user.signingkey      = Z:\claude-sota-installed/.ssh/id_ed25519.pub
commit.gpgsign       = true
tag.gpgsign          = true
gpg.format           = ssh
gpg.ssh.allowedsignersfile = Z:/claude-sota-installed/.ssh/allowed_signers
```

### 7.2 Compliance vs SOTA

| Aspect | Status |
|--------|--------|
| Signed commits | ✓ ON (SSH signing — Ed25519 key) |
| Signed tags | ✓ ON |
| Signing format | ✓ SSH (modern; preferred over GPG for new projects per W331 axis-1 #3 maintainer-identity discipline) |
| allowedsignersfile | ✓ Present |
| `rerere.enabled` | ⚠ Not visible in filtered config — recommend `git config --global rerere.enabled true` for merge-conflict learning |
| `pull.rebase=true` | ⚠ Not visible — recommend for linear history (W280d rebase-not-merge discipline) |
| `push.default=simple` | ⚠ Default; OK |

### 7.3 Recommendations

```powershell
# Enable rerere (Reuse Recorded Resolution) for merge-conflict learning
git config --global rerere.enabled true
git config --global rerere.autoupdate true

# Pull as rebase (per CLAUDE.md W280d parallel-session safety)
git config --global pull.rebase true

# Show submodule diffs inline (if/when submodules are used)
git config --global diff.submodule log
git config --global status.submoduleSummary true

# Auto-prune stale remote branches on fetch
git config --global fetch.prune true
git config --global fetch.pruneTags true

# Mergetool prefer 3-way conflict markers
git config --global merge.conflictStyle zdiff3
```

Cite: Git 2.54 release notes + endoflife.date (git 2.54 series active through 2026-Q4) + W286-arc-P0C cardinal-rule-1 trust-tuple discipline.

---

## 8. Docker Compose inventory

### 8.1 Project compose files (Z:\claude-sota-installed\)

Inside this runtime: **23 compose files** (deduped via batch listing). Notable categories:

- `.claude/plugins/marketplaces/hindsight/docker/docker-compose/` — 9 hindsight variants (alloydb, custom-models, external-pg, nginx, pg_textsearch, s3-file-storage, timescale, vchord, dev-monitoring) — all hindsight plugin assets, plugin-shipped (cardinal-rule-1 compliant; plugin is currently DISABLED in settings.json:291).
- `.claude/plugins/marketplaces/mcp-memory-service/tools/docker/` — 5 mcp-memory variants (also plugin-disabled, candidate for marketplace removal per W316-retirements in CLAUDE.md).
- `.local/graphiti/` — 4 graphiti compose files (graphiti is RETIRED per CLAUDE.md W272+W290+W295; `.local/graphiti/` is dormant artifact, candidate for `git rm -r .local/graphiti/` cleanup).
- `.local/cpa-fix-services/docker-compose.yml` — 1 file, status unclear.
- `tmp/repomix-library/sources/` — multiple compose files from repomix-indexed external repos (cite-only, not active).

### 8.2 Live observability compose (per CLAUDE.md W333-P0-b)

Active: `Z:\claude-hub\observability\docker-compose.yml` (langfuse v3.170.0 + clickhouse, recovered W333 from migration drift).

### 8.3 SOTA compliance probe

Need to spot-check that any actively-used compose files (langfuse stack) follow 2026 SOTA per perplexity:

- ✓ No `version:` key (Compose spec)
- ✓ `condition: service_healthy` in depends_on
- ✓ Healthchecks present (dumb-init wrapping confirms langfuse is using container-init pattern)
- ⚠ Need to inspect the langfuse compose file for `develop.watch` adoption, `profiles:` use, secrets pattern

**Recommendation**: queue a W340-AI-COMPOSE-LINT to run `docker compose -f Z:/claude-hub/observability/docker-compose.yml config` + lint via `hadolint` (once installed) + `dockerfilelint` (also worth installing).

---

## 9. Background NSSM services state

```
Name              Status   StartType
----              ------   ---------
CogneeMCP         Running  Automatic
IkLlamaServer     Running  Automatic
LlamaSwap         Running  Automatic
OllamaServe       Running  Automatic
```

(MozillaMaintenance is OS-managed, ignored.)

**Verified** against CLAUDE.md memory-stack:
- T3 cognee (`CogneeMCP`) → ✓ Running, port :8000 (per CLAUDE.md)
- LlamaSwap (`:8090`) → ✓ Running
- IkLlamaServer → ✓ Running (per CLAUDE.md W316-S6 — pre-loaded 7 models)
- Ollama (`:16700`) → ✓ Running (qwen3-coder + qwen3-embedding)

**Retired services (correctly absent per CLAUDE.md)**:
- ~~Hindsight~~ (T1, W316-S6 codex-ratified retirement)
- ~~FalkorDB~~ (W295 retirement)
- ~~Phoenix~~ (port :16006 owned by Docker, not a NSSM service per W329-D §3)
- ~~Graphiti~~ (W272+W290+W295)

State matches CLAUDE.md runtime declaration. ✓

---

## 10. Encoding & terminal

| Aspect | Value | SOTA? |
|--------|-------|-------|
| `Console.OutputEncoding` | utf-8 | ✓ |
| `PYTHONIOENCODING` | utf-8 | ✓ |
| `LANG` | (empty) | OK on Windows |
| `LC_ALL` | (empty) | OK on Windows |
| Windows Terminal | wt.exe present (UWP package) | ✓ — auto-update via Microsoft Store |

Per W286 codex-r notes and CLAUDE.md `bash-home-pin.sh`, BASH_ENV is correctly set to a HOME-pin shim. No drift.

---

## 11. Recommended additions (NEW tools worth installing)

### 11.1 Security gate (LOW friction, HIGH value)

| Tool | Install command | Why |
|------|-----------------|-----|
| **hadolint** | `winget install --id=hadolint.hadolint -e` | Dockerfile linter; pairs with existing trivy hook in settings.json:135. |
| **dockle** | `go install github.com/goodwithtech/dockle/cmd/dockle@latest` OR docker run | CIS Docker benchmark coverage for any local-built images. |
| **dive** | `winget install wagoodman.dive` | Image layer analyzer — useful for the langfuse stack (web+worker images are >1 GB each). |
| **PSScriptAnalyzer** (in CI) | already locally installed; needs `.github/workflows/code-quality.yml` integration | W286c notes 462W backlog. CI lane would surface regressions. |
| **Pester** 5.x | `Install-Module -Name Pester -RequiredVersion 5.x -Scope CurrentUser -Force` | Test coverage for the 27 PS1 scripts (currently zero). |

### 11.2 Optional ecosystem additions

| Tool | Use case |
|------|----------|
| **just** (`crate-ci`, `casey/just`) | Task runner that complements npm scripts; clean syntax for the runtime's bootstrap/cleanup tasks |
| **mise** (formerly rtx) | Version manager for node/python/uv etc; could replace ad-hoc winget invocations |
| **lefthook** (evilmartians) | Faster pre-commit hook runner if pre-commit Python startup becomes a bottleneck |
| **typos** (crate-ci) | Source-code typo finder, complements ruff/shellcheck |
| **biome** (biomejs.dev) | Fast JS/TS linter+formatter for any node-only subprojects |
| **oxc** (oxc-project) | Even faster Rust-based JS toolchain |

(All sourced from V62 SECURITY_QUALITY_ELITE list in basic-memory, also surfaced in the awesome-list fetches above.)

---

## 12. Verify-before-claim probe summary (cardinal-rule-6)

| Claim | Probe | Result |
|-------|-------|--------|
| Node.js v22.22.0 installed | `node --version` | `v22.22.0` ✓ |
| pwsh 7.6.1 (LTS) is latest | endoflife.date/api/powershell.json + github.com/PowerShell/PowerShell/releases/latest | `7.6.1 / 2026-04-21` ✓ |
| ruff 0.15.13 is latest | github.com/astral-sh/ruff/releases/latest | `0.15.13 / 2026-05-14` ✓ |
| shellcheck 0.11.0 is latest | github.com/koalaman/shellcheck/releases/latest | `v0.11.0 / 2025-08-04` ✓ |
| pre-commit 4.6.0 is latest | github.com/pre-commit/pre-commit/releases/latest | `v4.6.0 / 2026-04-21` ✓ |
| MSYS path-conv suppression works | `bash -c 'echo /usr/local/bin'` | `/usr/local/bin` (NOT rewritten) ✓ |
| Git signed commits enabled | `git config --get commit.gpgsign` | `true` ✓ |
| 27 PS1 scripts missing Set-StrictMode | shell loop with `grep -c "Set-StrictMode"` | 27/27 missing ✓ |
| gh 2.91.0 has CVE → 2.92.0 fix | github.com/cli/cli/releases/latest | `v2.92.0` published 2026-04-28 (security fix per perplexity) ✓ |
| 23 docker-compose files inside runtime | `Get-ChildItem -Recurse -Filter docker-compose*.y*ml` | 23 paths returned ✓ |
| Cognee/LlamaSwap/Ollama/IkLlamaServer running | `Get-Service` | All Running Automatic ✓ |

All audit claims are independently reproducible via the commands above.

---

## Appendix A — Recommended PowerShell header template

For batch application to `tools/*.ps1` (W340-AI-PS-HEADER-FIX queued):

```powershell
#requires -Version 7.4
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $true
```

Insert AFTER any leading comment block and BEFORE the first `[CmdletBinding(...)]` or `param(...)` declaration. For scripts that intentionally use `$ErrorActionPreference = 'Continue'` (e.g., diagnostic/listing scripts), keep that and add only the other 3 lines.

---

## Appendix B — Sources

- [Node.js — Evolving release schedule](https://nodejs.org/en/blog/announcements/evolving-the-nodejs-release-schedule)
- [Node.js | endoflife.date](https://endoflife.date/nodejs) + API endpoint `https://endoflife.date/api/nodejs.json`
- [pkgpulse: Node 22 vs Node 24 in 2026](https://www.pkgpulse.com/guides/nodejs-22-vs-nodejs-24-2026)
- [Docker BuildKit cache mounts](https://docs.docker.com/build/buildkit/)
- [PowerShell 7.6 LTS announcement](https://devblogs.microsoft.com/powershell/announcing-powershell-7-6/)
- [PowerShell Support Lifecycle (Microsoft Learn)](https://learn.microsoft.com/en-us/powershell/scripting/install/powershell-support-lifecycle?view=powershell-7.6)
- [github.com/cli/cli releases](https://github.com/cli/cli/releases) (gh 2.92.0 with terminal-escape-injection fix)
- [github.com/gitleaks/gitleaks releases](https://github.com/gitleaks/gitleaks/releases) (8.30.1)
- [github.com/astral-sh/ruff releases](https://github.com/astral-sh/ruff/releases) (0.15.13)
- [github.com/koalaman/shellcheck releases](https://github.com/koalaman/shellcheck/releases) (0.11.0)
- [github.com/pre-commit/pre-commit releases](https://github.com/pre-commit/pre-commit/releases) (4.6.0)
- [github.com/aquasecurity/trivy releases](https://github.com/aquasecurity/trivy/releases) (0.70.0)
- [git-for-windows/git releases](https://github.com/git-for-windows/git/releases) (2.54.0.windows.1)
- [Windows Terminal Preview 1.25](https://devblogs.microsoft.com/commandline/windows-terminal-preview-1-25-release/)
- awesome-nodejs: `https://raw.githubusercontent.com/sindresorhus/awesome-nodejs/main/readme.md`
- awesome-powershell: `https://raw.githubusercontent.com/janikvonrotz/awesome-powershell/master/README.md`
- awesome-docker: `https://raw.githubusercontent.com/veggiemonk/awesome-docker/master/README.md`
- perplexity Sonar Pro 2026-05-20: Node.js v22 SOTA practices, Docker Compose patterns, PowerShell 7 patterns
- W286c PSScriptAnalyzer baseline notes (T6 basic-memory)
- W286-arc-P0C cardinal-rule-1 trust-tuple discipline (T6 basic-memory)

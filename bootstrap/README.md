# bootstrap/ — fresh-clone installer

> **Wave**: W338 Stream C (per W333.5 Stream 5 §2 design)
> **Purpose**: Turn a bare `git clone` into a working `claude-sota-installed` runtime on a fresh host. Without this, the runtime is single-host-locked to the operator's `Z:` machine.

## TL;DR

```powershell
# Windows (PowerShell 7+, primary)
cd Z:\claude-sota-installed\bootstrap
.\install.ps1                                    # default Z: full install
.\install.ps1 -TargetDrive D: -InstallProfile minimal   # D:, CC+1 MCP, no services
.\install.ps1 -DryRun                            # plan only
.\install.ps1 -Force                             # ignore stamp files, re-run all phases
```

```bash
# Linux / macOS / WSL2 (secondary)
cd /opt/claude-sota-installed/bootstrap
./install.sh                                     # default /opt full install
./install.sh --target-root /home/op --profile minimal
./install.sh --dry-run
./install.sh --force
```

## Phases (both scripts)

| # | Phase | What it does | Failure mode |
|---|---|---|---|
| 1 | `PREFLIGHT` | Verify PS7+/bash, git, network, drive free >=10 GB, admin (Windows NSSM) | hard-fail; cannot continue |
| 2 | `DEPS` | winget install pinned set (git, gh, nodejs, python, uv, docker, nssm) on Windows; advisory probe on Unix | warn-only on Unix (operator runs apt/brew); hard-fail on Windows winget missing |
| 3 | `VENV` | `uv venv $VenvRoot --python 3.13` + `uv pip install -r requirements.txt` | warn if uv missing; hard-fail if venv create errors |
| 4 | `CLONE+PATCH` | Substitute `Z:` -> `$TargetDrive` in `.claude/settings.json` + `.mcp.json`; render `CLAUDE.local.md` from template; create state dirs | hard-fail if InstallRoot missing |
| 5 | `PLUGINS` | `claude plugin install <m>:<p>` per `manifest/plugins.json` | warn-only per plugin (continues); skip-all if manifest absent |
| 6 | `MCP-SERVICES` | NSSM CogneeMCP register/start + Langfuse docker compose | warn if NSSM/docker absent; skip if `-SkipServices` |
| 7 | `CODEX-AUTH` | Interactive `codex auth` (browser flow) | operator can Ctrl-C; warn-only |
| 8 | `GH-AUTH` | Interactive `gh auth login` | skip if already authed; warn-only |
| 9 | `VERIFY` | Probe every layer; write `$InstallRoot/.bootstrap/INSTALL-RECORD.json` | non-fatal warnings logged; record always written |

## Idempotency contract

Each phase writes a stamp file at `$InstallRoot/.bootstrap/state/<phase>.done` (JSON with timestamp + payload). Re-running the script skips any phase whose stamp is present.

- `-Force` (PowerShell) / `--force` (bash) ignores all stamps and re-runs every phase.
- Deleting a single stamp file forces just that phase to re-run.
- Stamps are PRESERVED on failure so partial re-entry works after fixing a blocker.

## Parameters

### `install.ps1` (PowerShell)

| Param | Default | Notes |
|---|---|---|
| `-TargetDrive` | `Z:` | drive letter with colon; validated via regex `^[A-Za-z]:$` |
| `-InstallRoot` | `${TargetDrive}\claude-sota-installed` | repo root |
| `-StateRoot` | `${TargetDrive}\claude-sota-installed-state` | CODEX_HOME, session JSONL, Cognee data |
| `-ToolsRoot` | `${TargetDrive}\tools` | llama-swap, nodejs portable, nssm |
| `-VenvRoot` | `${TargetDrive}\venvs\claude` | Python 3.13 venv |
| `-InstallProfile` | `full` | `full` / `minimal` / `ci` (renamed from `-Profile` to avoid PowerShell automatic-variable collision) |
| `-DryRun` | off | print actions, don't execute |
| `-SkipServices` | off | skip NSSM + Docker phase |
| `-SkipPlugins` | off | skip plugin install loop |
| `-Force` | off | ignore stamps |

### `install.sh` (bash)

Same semantics; long-form flags only (`--target-root`, `--install-root`, `--state-root`, `--tools-root`, `--venv-root`, `--profile`, `--dry-run`, `--skip-services`, `--skip-plugins`, `--force`). The bash port uses `--target-root` (POSIX path) instead of `--target-drive` (Windows drive letter).

## Profiles

| Profile | What's installed | When to use |
|---|---|---|
| `full` | All deps + venv + all plugins + NSSM + Docker stacks | Default for new operator host |
| `minimal` | Deps + venv + CC + 1 MCP (memory). No NSSM, no Langfuse Docker stack | Laptop / lightweight dev box |
| `ci` | Deps + venv + CC. Service phases SKIP. INSTALL-RECORD.json still written | CI runners; no long-lived services |

## Cardinal rules upheld

- **R1 (trust-tuple)** — pinned versions in DEPS phase; full SBOM at `manifest/deps.lock.json` (TBD). Refuse-install on SHA mismatch or license violation when manifest lands.
- **R2 (no project-owned hooks)** — this is a one-shot manual bootstrap script, NOT a registered Claude Code hook. Operator invokes once per machine.
- **R5 (sandbox via permissions)** — bootstrap uses CC permission model + winget/docker their own sandboxes; no custom guard scripts.
- **R6 (verify-before-claim)** — every phase emits a stamp + `INSTALL-RECORD.json` captures probe results. No phase claims "DONE" without a verifiable artifact.

## Files written outside the worktree

| Path | Owner | Purpose |
|---|---|---|
| `$InstallRoot/.bootstrap/state/*.done` | bootstrap | idempotency stamps |
| `$InstallRoot/.bootstrap/INSTALL-RECORD.json` | bootstrap | honest-state probe results |
| `$InstallRoot/.bootstrap/install-*.log` | bootstrap | full transcript per run |
| `$InstallRoot/CLAUDE.local.md` | bootstrap (via template) | per-machine env block (gitignored) |
| `$InstallRoot/.claude/settings.json.bak.*` | bootstrap | patch backup before Z: substitution |
| `$StateRoot/.codex/` | codex CLI | auth tokens, session state |
| `$StateRoot/.claude/projects/` | claude CLI | session JSONL |
| `$StateRoot/cognee/{data,databases,logs,models,tmp}` | NSSM CogneeMCP | Cognee data dirs |
| `$VenvRoot/` | uv | Python venv |

## Fail-safely behavior

Each phase is wrapped in try/catch (PS) or set -e + per-step `|| warn` (bash). On failure:

1. Error message printed in red with phase name.
2. Stamps preserved at `$StampDir` for partial re-entry.
3. Log file at `$LogFile` captures the full transcript.
4. INSTALL-RECORD.json NOT written (verify is last phase; failure pre-verify means record absent).

Re-run after fixing the blocker; only the failed phase + downstream re-execute.

## Rerunning

```powershell
# Fix what broke, then:
.\install.ps1                          # resumes from first non-stamped phase
.\install.ps1 -Force                   # re-runs everything (rarely needed)
Remove-Item Z:\claude-sota-installed\.bootstrap\state\plugins.done
.\install.ps1                          # re-runs just the plugins phase
```

## Verify

```powershell
# Re-probe without changing state
.\install.ps1 -DryRun -Force | Out-Null   # would re-run all phases dry
Get-Content Z:\claude-sota-installed\.bootstrap\INSTALL-RECORD.json | ConvertFrom-Json | Format-List
claude mcp list                            # all MCPs Connected?
nssm status CogneeMCP                      # RUNNING?
Invoke-WebRequest http://127.0.0.1:3000/api/public/health  # HTTP 200?
```

## What this script does NOT do

- Does NOT install Anthropic API key into env (operator sets `ANTHROPIC_API_KEY` per-machine, gitignored).
- Does NOT install OpenAI / Codex API key (codex auth runs interactively).
- Does NOT bootstrap the parent CCC harness at `Z:\claude\` — that's a separate runtime (untouched per `CLAUDE.local.md` Hard Rules).
- Does NOT install plugins from non-trusted marketplaces (only those in `manifest/plugins.json`).
- Does NOT push any state to `git` — all written artifacts are gitignored.

## See also

- `ONBOARDING.md` (repo root) — fresh-contributor walkthrough invoking this script
- `CLAUDE.md` (repo root) — runtime contract + cardinal rules
- `CLAUDE.local.md.template` (template, TBD at `bootstrap/template/`) — per-machine env block source
- `tools/bootstrap-runtime.ps1` (legacy) — post-install state setup; invoked from phase 9
- `docs/architecture/W333-5-deep-sota/STREAM-5-ONBOARDING-DX.md` — design source

## Cite anchors

- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- PowerShell 7 `$ErrorActionPreference`: https://learn.microsoft.com/powershell/module/microsoft.powershell.core/about/about_preference_variables
- winget pinning: https://learn.microsoft.com/windows/package-manager/winget/install
- NSSM 2.24: https://nssm.cc/release/nssm-2.24.zip
- uv: https://docs.astral.sh/uv/getting-started/installation/
- Claude Code plugins: https://code.claude.com/docs/en/plugins
- editorconfig.org spec: https://spec.editorconfig.org/

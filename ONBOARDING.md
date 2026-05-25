# ONBOARDING — claude-sota-installed

> **Audience**: new operator (first-time clone) OR new contributor.
> **Wave**: W338 Stream C (per W333.5 Stream 5 §4 design).
> **Goal**: get from `git clone` to "PR merged with codex review" in <30 min.
> **Sister doc**: `CONTRIBUTING.md` (contributor contract); `CLAUDE.md` (runtime contract); `bootstrap/README.md` (script reference).

This runtime is a Windows-portable, `Z:`-anchored Claude Code installation with 47 enabled plugins, 14 MCP servers, 6 service stacks, codex GPT-5.5 cross-model review gate, and a 50-LOC pointer-only `CLAUDE.md`. Bootstrap is fully scripted; expect ~20 minutes wall-clock on a clean host.

---

## §1 Prerequisites

### Host requirements

| Item | Windows (primary) | Linux / macOS (secondary) |
|---|---|---|
| OS | Windows 11 Pro 24H2+ | Ubuntu 22.04+ / Debian 12+ / macOS 14+ |
| Shell | PowerShell 7.4+ | bash 5.0+ |
| RAM | 32 GB recommended | 32 GB recommended |
| Disk free | 500+ GB on target drive | 500+ GB on target root |
| Admin | required for NSSM service install | sudo for systemd unit install |
| Network | github.com + npmjs.org + nssm.cc + docker.io reachable | same |

### Account / key prerequisites

| Account | Required for | Get from |
|---|---|---|
| GitHub | clone + gh CLI auth + GH Actions | https://github.com/signup |
| Anthropic API | Claude Code itself | https://console.anthropic.com |
| OpenAI API | codex cross-model review | https://platform.openai.com |
| Perplexity (optional) | perplexity MCP web search | https://www.perplexity.ai/settings/api |
| Tavily (optional) | tavily MCP web search | https://tavily.com |
| Exa (optional) | exa MCP semantic search | https://exa.ai |
| Langfuse (self-host) | optional observability | bundled in observability/docker-compose.yml |

### Pre-installed tooling on host

The bootstrap script installs these for you, but if you want pre-flight:

| Tool | Pinned version | Reason |
|---|---|---|
| `git` | 2.49.0 | clone + commit |
| `gh` | 2.62.0 | PR creation, secret management |
| `node` | 22.22.0 LTS | claude CLI runtime, MCP servers |
| `python` | 3.13.0 | venv, MCP backends |
| `uv` | 0.5.16 | fast Python package manager |
| `docker` | latest stable | Langfuse stack |
| `nssm` | 2.24 | Windows service registration |

---

## §2 Install — Windows (primary)

### 2.1 Clone

```powershell
# Pick a scratch directory; bootstrap will move/install to TargetDrive
git clone https://github.com/<owner>/claude-sota-installed.git C:\scratch\claude-sota-installed
cd C:\scratch\claude-sota-installed\bootstrap
```

### 2.2 Run installer

```powershell
# Default install: Z: drive, full profile
.\install.ps1

# Custom drive + minimal profile
.\install.ps1 -TargetDrive D: -InstallProfile minimal

# Plan only (dry-run) before committing
.\install.ps1 -DryRun
```

Wait ~20 minutes on first run. Phases stream to stdout with colored prefixes. On failure, the phase stamp is preserved at `$InstallRoot\.bootstrap\state\` for partial re-entry.

### 2.3 Operator-interactive phases

Two phases require browser/keyboard interaction:

1. **CODEX-AUTH** — `codex auth` launches a browser flow. Complete OAuth, return to terminal.
2. **GH-AUTH** — `gh auth login` prompts for PAT or device-flow. Choose your style.

If you skip them mid-install, re-run phases individually:

```powershell
Remove-Item Z:\claude-sota-installed\.bootstrap\state\codex-auth.done
.\install.ps1                # resumes from codex-auth phase
```

### 2.4 Verify

The final VERIFY phase writes `$InstallRoot\.bootstrap\INSTALL-RECORD.json` and prints a summary table. Green = OK; yellow = WARN (acceptable, e.g. service skipped); red = FAIL (must address).

```powershell
Get-Content Z:\claude-sota-installed\.bootstrap\INSTALL-RECORD.json | ConvertFrom-Json | Format-List
```

---

## §3 Install — Linux / macOS / WSL2 (secondary)

### 3.1 Clone

```bash
git clone https://github.com/<owner>/claude-sota-installed.git /tmp/claude-sota-installed
cd /tmp/claude-sota-installed/bootstrap
```

### 3.2 Install OS-level deps yourself

The bash port does NOT auto-install packages (no winget equivalent across distros). Install manually:

```bash
# macOS
brew install git gh node python@3.13 uv docker

# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y git gh nodejs python3.13 docker.io
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 3.3 Run installer

```bash
chmod +x install.sh
./install.sh --target-root /opt --profile full
./install.sh --target-root /home/op --profile minimal
./install.sh --dry-run
```

NSSM is Windows-only; on Linux a systemd unit template lives at `bootstrap/manifest/cognee.service` (TBD per CF-1 in design). On macOS, a launchd plist follows the same pattern.

---

## §4 First-PR walkthrough

Once install is verified, here's the contributor loop:

### 4.1 Fork + branch

```bash
gh repo fork <owner>/claude-sota-installed --clone --remote
cd claude-sota-installed
git checkout -b feat/W339-my-feature      # branch name = feat/<wave>-<short-name>
```

### 4.2 Edit

Files you touch should match `.editorconfig` line discipline. Open in VS Code / Cursor / JetBrains — they auto-honor editorconfig.

### 4.3 Conventional Commit

```bash
git add <files>
git commit -m "feat(W339): add my feature

Why: explain user-visible problem solved.
What: brief mechanical summary.
Cite: link to design doc or upstream ref."
```

Subject prefixes (commitlint-blocking per `CONTRIBUTING.md` §2):
- `feat:` new feature
- `fix:` bug fix
- `chore:` non-functional housekeeping
- `docs:` doc-only changes
- `test:` test-only changes
- `refactor:` no behavior change
- `perf:` performance improvement
- `build:` build/dep changes
- `ci:` CI/CD changes
- `revert:` revert a previous commit

### 4.4 Pre-commit gate

Pre-commit runs automatically on `git commit`. It enforces:

- `gitleaks` — no API keys / secrets
- `ruff` — Python lint
- `actionlint` — GitHub Actions workflow lint
- `shellcheck` — bash scripts
- `cr2-2kb-hooks` — no project-owned hook >2 KB

If it fails, the commit blocks. Fix the violation; re-run commit. NEVER use `--no-verify`; the runtime denies that via permissions deny-list.

### 4.5 Push + PR

```bash
git push origin feat/W339-my-feature
gh pr create --fill --label W339
```

### 4.6 Codex review gate

Every commit on the PR triggers a Stop-hook codex review. Reviewer = GPT-5.5 via codex CLI subprocess.

- Round 1: advisory verdict + line-anchored comments.
- Round 2: if Round 1 flagged blockers, codex re-reads after your fix.
- Tie-breaker: Sonnet 4.6 escalates if codex rounds disagree (W331 P0.7).

You see the verdict appended as a PR comment. APPROVE = mergeable. REQUEST_CHANGES = address comments. NEEDS_INFO = clarify.

### 4.7 Merge

After codex APPROVE + at least one human reviewer:

```bash
gh pr merge --squash --delete-branch
```

---

## §5 Codex CLI auth

The codex CLI lives at `npm i -g @openai/codex` OR is auto-installed via the `codex@openai-codex` Claude Code plugin (preferred — bundles SessionStart/SessionEnd/Stop hooks).

### Verify install

```powershell
codex --version              # 0.x.x
codex models list            # gpt-5.5, gpt-5.5-mini, etc.
```

### Initial auth

```powershell
codex auth                   # opens browser; choose OpenAI account
codex auth status            # should print "Authenticated as <email>"
```

Tokens stored at `$env:CODEX_HOME` (default `Z:/claude-sota-installed-state/.codex/`). Gitignored. Per-machine.

### Refresh expired token

```powershell
codex auth logout
codex auth                   # re-do browser flow
```

---

## §6 GH secrets

Required (PR workflows fail without these):

```powershell
gh secret set ANTHROPIC_API_KEY -b "$env:ANTHROPIC_API_KEY"
gh secret set OPENAI_API_KEY    -b "$env:OPENAI_API_KEY"
```

Optional (specific MCP / workflow lanes):

```powershell
gh secret set PERPLEXITY_API_KEY -b "$env:PERPLEXITY_API_KEY"
gh secret set TAVILY_API_KEY     -b "$env:TAVILY_API_KEY"
gh secret set EXA_API_KEY        -b "$env:EXA_API_KEY"
gh secret set LANGFUSE_PUBLIC_KEY -b "$env:LANGFUSE_PUBLIC_KEY"
gh secret set LANGFUSE_SECRET_KEY -b "$env:LANGFUSE_SECRET_KEY"
```

### Callout #9 — Why GH secrets matter

The codex review GH Action workflow (`.github/workflows/codex-review.yml`) reads `OPENAI_API_KEY` from GH secrets. Without it, the review gate FAILS open (advisory-only, no blocking) — silently masking compliance failures.

### Callout #10 — Rotation discipline

Rotate API keys quarterly. Use the GH secret CLI to update without exposing the value in shell history:

```powershell
gh secret set OPENAI_API_KEY < new-key.txt
Remove-Item new-key.txt
```

Per `gitleaks` baseline at `.gitleaks.toml`, committed-by-mistake keys hard-fail pre-commit.

---

## §7 CLAUDE.local.md template walkthrough

`CLAUDE.local.md` is gitignored — every host writes its own. Bootstrap renders from `bootstrap/template/CLAUDE.local.md.template` (TBD landing in a follow-up wave).

### What each env var does

| Var | Purpose | Where consumed |
|---|---|---|
| `USERPROFILE` / `HOME` | Force CC home to `$InstallRoot` | child shells, MCP servers |
| `CLAUDE_CONFIG_DIR` | `.claude/` path override | claude CLI startup |
| `CLAUDE_CODE_TMPDIR` | scratch directory | claude CLI runtime |
| `CLAUDE_CODE_PLUGIN_CACHE_DIR` | plugin install cache | claude plugin install |
| `CODEX_HOME` | codex token + session state | codex CLI |
| `BASH_ENV` | per-shell env-pin script | git bash subprocesses |
| `LANGFUSE_*` | observability stack auth | langfuse MCP + workflow lanes |
| `CLAUDE_PLUGIN_DATA` | plugin runtime data root | plugin processes |
| `GATEGUARD_STATE_DIR` | review-gate state | Stop-hook |
| `CLAUDE_MEM_DATA_DIR` | claude-mem plugin data | claude-mem |

### Why gitignored

Holds Langfuse keys, Perplexity/Tavily/Exa keys, machine-specific paths. NEVER commit.

### Regenerate from template

```powershell
Remove-Item Z:\claude-sota-installed\CLAUDE.local.md
.\bootstrap\install.ps1 -Force          # CLONE+PATCH phase re-renders
```

---

## §8 MCP smoke-test

After bootstrap, verify MCPs initialize:

```powershell
claude mcp list
```

Expected (14 servers):

| Server | Status | Notes |
|---|---|---|
| `memory` | Connected | plugin-shipped basic in-memory |
| `basic-memory` | Connected | canonical-primary per W295 |
| `cognee` | Connected (NSSM `CogneeMCP` RUNNING) | T3 graph memory |
| `github` | Connected | repo ops |
| `repomix` | Connected | codebase pack |
| `deepwiki` | Connected | repo docs |
| `langfuse` | Connected | observability (if stack up) |
| `context-mode` | Connected | context budget tooling |
| `perplexity` | Connected (if `PERPLEXITY_API_KEY` set) | web search |
| `tavily` | Connected (if `TAVILY_API_KEY` set) | web search |
| `exa` | Connected (if `EXA_API_KEY` set) | semantic search |
| `serena` | Connected | code navigation |
| `hf-mcp-server` | Connected | HuggingFace Hub |
| `hindsight` | RETIRED (W316 codex-ratified) | expected absent / fail-INERT |

`hindsight ✗` is honest-state-tagged retired — NOT a failure.

---

## §9 Service smoke-test

```powershell
# Cognee MCP NSSM service
nssm status CogneeMCP                                    # -> RUNNING
Invoke-WebRequest http://127.0.0.1:8000/mcp -Method POST `
  -Body '{"jsonrpc":"2.0","method":"initialize","id":1}' `
  -ContentType 'application/json'
# Expect 200 + serverInfo.name = "Cognee 1.26.0"

# Langfuse health
Invoke-WebRequest http://127.0.0.1:3000/api/public/health
# Expect 200 + body {"status":"OK"}

# LlamaSwap (optional model proxy)
Invoke-WebRequest http://127.0.0.1:8090/v1/models
# Expect 200 + list of pre-loaded models
```

---

## §10 Troubleshooting

### Drive permissions

> `New-Item : Access denied to Z:\claude-sota-installed-state\cognee`

Run installer as Administrator OR pre-create state root with write permissions for your user.

### MSYS path mangling

> Git Bash rewrites `/c/foo` -> `C:\foo` mid-command

Set in `CLAUDE.local.md`: `MSYS_NO_PATHCONV=1`, `MSYS2_ARG_CONV_EXCL=*`, `MSYS2_ENV_CONV_EXCL=*`. Re-run bootstrap CLONE+PATCH phase.

### NSSM service start failure

> `nssm start CogneeMCP` returns "service failed to start"

Check `nssm dump CogneeMCP` for the registered command. Common: Python venv not on path → re-run VENV phase + delete + re-register:

```powershell
nssm remove CogneeMCP confirm
Remove-Item Z:\claude-sota-installed\.bootstrap\state\mcp-services.done
.\install.ps1                                    # re-runs MCP-SERVICES phase
```

### codex auth expired

> `codex round` returns `401 Unauthorized`

```powershell
codex auth logout
codex auth
```

### gitleaks rotating secret

> Pre-commit fails: "Secret detected at line X"

False positives go in `.gitleaks.toml` allowlist with a comment. Real leaks: rotate the secret IMMEDIATELY at the upstream provider, then `git rm` from history per `https://github.com/gitleaks/gitleaks#why-might-this-fail`.

### Pre-commit blocked by cr2-2kb-hooks

> "Staged file `.claude/hooks/foo.mjs` >2048 bytes — R2 violation"

Either (a) move logic out of `.claude/hooks/**` into a tool script under `tools/` (preferred); or (b) document the bug-patch exception with a cite-anchor to a GH issue + keep file <2 KB.

### Plugin install hangs

> `claude plugin install foo:bar` hangs >60 seconds

Cancel + retry. If still hung, clear cache and retry:

```powershell
Remove-Item Z:\claude-sota-installed\.claude\plugins\cache\foo -Recurse -Force
claude plugin install foo:bar
```

### Z: not mapped on a new host

The bootstrap defaults to `Z:`. If your host doesn't have a Z drive:

```powershell
.\install.ps1 -TargetDrive D:        # or whatever drive is available
```

The CLONE+PATCH phase rewrites all tracked `Z:` references to `D:` in `.claude/settings.json` and `.mcp.json`.

---

## §11 Where to read next

Sequence matters — read in this order:

1. **`CLAUDE.md`** (50-LOC pointer-only index at repo root) — runtime contract
2. **`CLAUDE.local.md`** (your generated per-host env block) — what env vars are set and why
3. **`CONTRIBUTING.md`** (repo root) — Conventional Commits + R1-R6 + codex gate contract
4. **`docs/architecture/CLAUDE-MD-ARCHIVE/CLAUDE-MD-STATUS-CURRENT-W324.md`** — current wave status
5. **`bootstrap/README.md`** — installer reference (you've already used it)
6. **`docs/architecture/W333-5-deep-sota/`** — the design wave that produced this onboarding doc

### Reading shortcuts via `mcp__basic-memory`

Once MCPs are up, you can search the architecture corpus from inside Claude Code:

```text
mcp__basic-memory__search_notes "Wave-338"
mcp__basic-memory__search_notes "CR-1 trust-tuple"
```

T6 basic-memory is the canonical cross-session memory per W295.

---

## §12 Getting help

- **Bootstrap issues**: open a GitHub issue with the `bootstrap` label; paste contents of `$InstallRoot\.bootstrap\INSTALL-RECORD.json` + the latest `install-*.log` filename.
- **Cardinal-rule violations**: cite the rule number (R1–R6) and the file/line where you hit the gate.
- **Codex review disagreement**: thread the review verdict in the PR; tag the operator for tie-breaker per W331 P0.7.
- **Plugin / MCP runtime failures**: include `claude mcp list` output + `nssm status <svc>` + the MCP server's stderr (look in `$env:CLAUDE_CODE_DEBUG_LOGS_DIR\`).

### Quickstart issue template

```markdown
**Bootstrap state**:
- Target drive: _____
- Profile: _____
- Phase that failed: _____

**INSTALL-RECORD.json probes**:
<paste relevant section>

**Reproduction**:
1. Cloned to _____
2. Ran: `.\install.ps1 -TargetDrive _____ -InstallProfile _____`
3. Saw: _____

**Expected**: phase X writes stamp Y; INSTALL-RECORD.json shows probe Z=OK
**Actual**: _____
```

---

## Honest-state markers

- **VERIFIED**: bootstrap script reads, written by W338 Stream C agent against W333.5 Stream 5 design.
- **NOT VERIFIED in this stream**: codex review of this onboarding doc; happens at PR merge time.
- **TBD**: `bootstrap/template/CLAUDE.local.md.template`, `bootstrap/manifest/plugins.json`, `bootstrap/manifest/deps.lock.json`, `bootstrap/manifest/services.json` — design references them; landing as follow-up wave artifacts.
- **DEFER per CF-1/CF-2/CF-3**: Bash port matures, GH issue templates, editorconfig-checker pre-commit hook.
- **DELTA from existing**: this is the first `ONBOARDING.md` in the runtime; sibling `CONTRIBUTING.md` already shipped earlier this session and is the contributor-contract sister.

## Cite anchors

- Claude Code home: https://code.claude.com/docs/en
- Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
- editorconfig.org spec: https://spec.editorconfig.org/
- GH CLI secrets: https://cli.github.com/manual/gh_secret_set
- gitleaks: https://github.com/gitleaks/gitleaks
- NSSM 2.24: https://nssm.cc/release/nssm-2.24.zip
- uv: https://docs.astral.sh/uv/getting-started/installation/
- Codex CLI: https://github.com/openai/codex

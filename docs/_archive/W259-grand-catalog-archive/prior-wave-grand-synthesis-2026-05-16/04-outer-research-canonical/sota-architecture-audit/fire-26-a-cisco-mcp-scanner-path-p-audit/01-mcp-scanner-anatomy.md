# 01 — cisco-ai-defense/mcp-scanner Anatomy

> **Probe method**: GitHub MCP (`mcp__github__get_file_contents` README.md) — repo NOT locally cloned at `Z:/repos/deps/`
> **Cite class**: TIER-1-DIRECT @ blob-SHA `e2e5e2a50c245b725bc483b29cd5b5c9de1f1e05`
> **Verification**: cross-confirmed by Path P codex T1 @ `.claude/state/codex_consult_w134_f26a_cisco_mcp_scanner_OUT.txt`

## Repo metadata

| Field | Value | Cite |
|---|---|---|
| Repo | `cisco-ai-defense/mcp-scanner` | GitHub API |
| Default branch | `main` | GitHub API |
| Stars | 917 | codex T1 trace live API probe |
| Forks | 110 | codex T1 trace |
| Last pushed | 2026-05-08T22:23:57Z | GitHub API |
| License | **Apache-2.0 (PURE PERMISSIVE)** | README badge + LICENSE file in repo root |
| Org | **Cisco AI Defense** (TIER-1-OFFICIAL named-org) | README + Cisco AI Defense product page |
| PyPI package | `cisco-ai-mcp-scanner` | PyPI badge in README |
| Latest PyPI | v4.6.0 (codex T1 verified) | codex T1 live probe |
| Main vs PyPI | **Main is 7 commits AHEAD of v4.6.0 release** (codex T1 catch — includes symlink-escape security fix at commit `6915d44de089cfe4f80b9b28867e02d453bb13d1`) | codex T1 trace |
| Python req | 3.11+ | README badge |
| Multi-kit convergence | v40+v53+v54+v55+v61 = 5 kits | Fire 25 codex T1 cross-reference |
| Trusted Publishing | YES (PyPI Sigstore + Trusted Publishing provenance from tag 4.6.0) | codex T1 verified |

## 🚨 Mia pre-apply finding: ALREADY INSTALLED IN EEE VENV

Codex T1 surfaced critical OVER on orchestrator's pre-codex "NOT INSTALLED" assumption.
Verified live by orchestrator post-codex:

```bash
$ Z:/venvs/claude/Scripts/pip show cisco-ai-mcp-scanner
Name: cisco-ai-mcp-scanner
Version: 4.6.0
Summary: A tool to scan MCP servers and tools for security findings
Home-page: https://github.com/cisco-ai-defense/mcp-scanner
Author: Cisco
License:
Location: Z:\venvs\claude\Lib\site-packages
Requires: expandvars, fastapi, httpx, litellm, mcp, pip-audit, puremagic, pydantic,
  python-dotenv, tree-sitter, tree-sitter-c-sharp, tree-sitter-go, tree-sitter-java,
  tree-sitter-javascript, tree-sitter-kotlin, tree-sitter-php, tree-sitter-python,
  tree-sitter-ruby, tree-sitter-rust, tree-sitter-typescript, uvicorn, yara-python
```

**Status**: PIP-INSTALLED at v4.6.0 in `Z:/venvs/claude/Lib/site-packages` (NOT a uv tool).

Per codex T1 recommendation: **prefer isolated `uv tool install` over the venv install** for
cleaner namespace + auto-PATH setup + SHA-pinning for behavioral/VirusTotal scans where
PyPI 4.6.0 lags main.

## Architecture (multi-mode security scanner)

### 3 scanning engines

1. **YARA**: rules-based pattern detection
2. **LLM-as-judge**: multi-provider via LiteLLM (OpenAI/Anthropic/Bedrock/local)
3. **Cisco AI Defense Inspect API**: Cisco proprietary threat detection

### 8 analyzers (4 ZERO-DEP for baseline + 4 API-key-required for advanced)

| Analyzer | API key | Function | eee priority |
|---|---|---|---|
| **yara** | NO | Rules-based pattern detection | **TIER-1 zero-key baseline** |
| **readiness** | NO | Production-readiness static analysis (20 heuristic rules) | **TIER-1 zero-key baseline** |
| **prompt_defense** | NO | 12 attack vector defense check | **TIER-1 zero-key baseline** |
| **vulnerable_package** | NO | pip-audit CVE/PYSEC/GHSA | **TIER-1 zero-key baseline** |
| `llm` | YES (LLM provider) | LLM-as-judge semantic analysis | TIER-2 advanced |
| `api` | YES (Cisco) | Cisco AI Defense proprietary | TIER-2 advanced |
| `virustotal` | YES (VT) | Binary malware via SHA256 hash | TIER-2 advanced |
| `supplychain` | YES (LLM) | Multi-language behavioral code analysis | TIER-2 advanced |

### 11 subcommands

- `remote` — scan remote MCP server (SSE/streamable HTTP)
- `stdio` — launch + scan stdio MCP server
- `config` — scan specific MCP config file
- `known-configs` — scan well-known client config locations
- `prompts` — scan prompts
- `resources` — scan resources
- `instructions` — scan server instructions from InitializeResult
- `virustotal` — file/directory malware scan
- `supplychain` — multi-language behavioral analysis (10+ langs)
- `vulnerable-package` — Python dependency vuln scan
- `static` — offline JSON scan (CI/CD)

### 3 modes

- **CLI tool** (`mcp-scanner --analyzers yara ...`)
- **REST API server** (`mcp-scanner-api --port 8080`)
- **Python SDK** (`from mcpscanner import Config, Scanner`)

## Install path (CR-6 official-native-channel ✅)

Per README "Installing as a CLI tool":

```bash
uv tool install --python 3.13 cisco-ai-mcp-scanner
```

Pure PyPI install via uv — canonical Python tooling. CR-6 compliant.

**Alternative source install** (codex T1 recommended for behavioral/VirusTotal):

```bash
uv tool install --python 3.13 --from git+https://github.com/cisco-ai-defense/mcp-scanner@6915d44de089cfe4f80b9b28867e02d453bb13d1 cisco-ai-mcp-scanner
```

SHA-pinned to main commit with symlink-escape security fix.

## Codex T1 supply-chain caveats

Per codex T1 verbatim:

> "PyPI 4.6.0 has Sigstore/Trusted Publishing provenance from tag 4.6.0, but main is 7
> commits ahead and includes a security fix for symlink escape during directory scans:
> https://github.com/cisco-ai-defense/mcp-scanner/commit/6915d44de089cfe4f80b9b28867e02d453bb13d1.
> For behavioral/VirusTotal directory scans, use a SHA-pinned main install or wait for a
> PyPI release beyond 4.6.0. Avoid moving-main installs without SHA pinning; disable
> VirusTotal uploads unless explicitly needed."

**Install strategy** for eee (codex T1 + orchestrator synthesis):
1. **Phase 1 zero-key baseline** (immediate): use existing `Z:/venvs/claude` 4.6.0 install OR uv tool install 4.6.0 for `yara,readiness,prompt_defense` scans only
2. **Phase 2 SHA-pinned upgrade** (when behavioral/VirusTotal needed): `uv tool install --from git+...@6915d44d...` SHA-pinned source install
3. **Phase 3 production** (when PyPI catches up): uv tool install latest PyPI release

## License: Apache-2.0 (PURE PERMISSIVE)

Per codex T1 caveat:

> "Apache-2.0 is compatible with eee local-runtime use. It includes a patent grant with
> patent-litigation termination. If eee redistributes modified/bundled copies, preserve
> license/copyright/patent/trademark notices, mark modified files, and include upstream
> NOTICE content if present. Live repo root showed LICENSE but no NOTICE."

**eee use-class**: local autonomous /loop runtime — Apache-2.0 fully compatible.
No commercial distribution; patent grant + license notice preservation suffices.

## Use cases for eee (4 candidate workflows)

### Use case 1 (HIGHEST PRIORITY per codex T1): Pre-install MCP admission

Before adding NEW MCP server to `.mcp.json`, scan via:

```bash
mcp-scanner stdio --stdio-command <cmd> --analyzers yara,readiness,prompt_defense --format summary
```

Or for already-configured servers:

```bash
mcp-scanner --analyzers yara,readiness,prompt_defense --format raw config --config-path Z:/claude-sota-installed/.mcp.json
```

### Use case 2: Periodic audit

Schedule weekly/monthly audit:

```bash
mcp-scanner --scan-known-configs --analyzers yara,readiness,prompt_defense --format summary
```

⚠️ codex T1 explicit caveat: "Do not wire `--scan-known-configs` into a hook initially;
it is broader and less deterministic than repo-local `.mcp.json` admission scanning."

### Use case 3: CI/CD gate (offline)

```bash
mcp-scanner --analyzers yara static --tools tools.json
```

### Use case 4: Pre-commit hook integration

Add to eee's 26-Python hooks suite as Dim 5 hooks/safety primitive.

## Mia ladder advance

n=1653 → n=1660 (+7: anatomy probe + Mia confirmed venv install / 3 engines + 8 analyzers + 11 subcommands documented / codex T1 supply-chain caveats / Apache-2.0 license analysis / 4 use cases prioritized / install strategy 3-phase)

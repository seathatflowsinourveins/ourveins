# Fire 26-A — cisco-ai-defense/mcp-scanner Path P Codex T1 Audit

> **Position**: FIRST of revised Top-3 priority post-Fire-25 gap-correction (highest priority overall)
> **Subject**: `cisco-ai-defense/mcp-scanner` Apache-2.0 — Cisco TIER-1-OFFICIAL MCP security scanner
> **Method**: Path P recipe (codex exec foreground+tee — n=14/14 reproducible)
> **Pre-codex hypothesis**: LIKELY-APPROVE or STUDY-PILOT-NARROW (security-scanning category distinct from Fire 24 PM-loop tools)

## Subject identification (TIER-1-DIRECT cite anchors via GitHub MCP)

| Field | Value | Cite |
|---|---|---|
| Repo | `cisco-ai-defense/mcp-scanner` | `mcp__github__search_repositories` 2026-05-10 |
| Default branch | `main` | GitHub API |
| Stars | 917 | codex T1 trace live API probe |
| Forks | 110 | codex T1 trace |
| Last pushed | 2026-05-08T22:23:57Z (~2 days ago — ACTIVE) | GitHub API `pushed_at` |
| License | **Apache-2.0** (pure permissive) | README badge + GitHub API |
| Org | **Cisco AI Defense** (TIER-1-OFFICIAL named-org) | README |
| Python req | 3.11+ | README badge |
| PyPI package | `cisco-ai-mcp-scanner` | PyPI badge |
| README blob | `e2e5e2a50c245b725bc483b29cd5b5c9de1f1e05` (32149 bytes) | GitHub MCP |
| Multi-kit convergence | v40 + v53 + v54 + v55 + v61 = **5 kits** | Fire 25 codex T1 trace cross-reference |
| Local clone | NOT PRESENT — verified via GitHub MCP | filesystem probe |

## Architecture (multi-mode security scanner)

### 3 scanning engines (combinable or independent)

1. **YARA**: rules-based pattern detection (zero-dep, no API key)
2. **LLM-as-judge**: multi-provider LLM analysis (OpenAI/Anthropic/Bedrock — needs API key)
3. **Cisco AI Defense Inspect API**: Cisco AI threat detection (needs Cisco API key)

### 8 analyzers (4 zero-dep + 4 API-key-required)

| Analyzer | API key required | Function |
|---|---|---|
| `yara` | NO | Pattern-based rules |
| `readiness` | NO | Production-readiness static analysis (20 heuristic rules) |
| `prompt_defense` | NO | 12 attack vector defense check (instruction override / data leakage / etc.) |
| `vulnerable_package` | NO | pip-audit CVE/PYSEC/GHSA |
| `llm` | YES (LLM provider) | LLM-as-judge semantic analysis |
| `api` | YES (Cisco AI Defense) | Cisco proprietary detection |
| `virustotal` | YES (VirusTotal) | Binary malware via SHA256 hash lookup |
| `supplychain` | YES (LLM) | LLM-powered behavioral code analysis (10+ languages) |

### Subcommands (CLI surface)

- `remote` — scan remote MCP server (SSE/streamable HTTP)
- `stdio` — launch + scan stdio MCP server
- `config` — scan from specific MCP config file
- `known-configs` — scan well-known client config locations (Windsurf, Cursor, Claude, VS Code)
- `prompts` — scan prompts
- `resources` — scan resources
- `instructions` — scan server instructions from InitializeResult
- `virustotal` — file/directory malware scan
- `supplychain` — source code behavioral analysis (Python/TS/JS/Go/Java/Kotlin/C#/Rust/Ruby/PHP)
- `vulnerable-package` — Python dependency vuln scan
- `static` — offline JSON scan (CI/CD mode)

### Modes

- CLI tool (`mcp-scanner --analyzers yara ...`)
- REST API server (`mcp-scanner-api --port 8080`)
- Python SDK (`from mcpscanner import Config, Scanner`)

### Install path (CR-6 OFFICIAL-NATIVE-CHANNEL ✅)

```bash
uv tool install --python 3.13 cisco-ai-mcp-scanner
```

Pure PyPI install via uv — canonical Python tooling. CR-6 compliant ✅.

## Multi-kit convergence (5 kits — strongest user-curated endorsement)

Per Fire 25 codex T1 cross-reference trace, `cisco-ai-defense/mcp-scanner` appears in:
- v40 ALL_IN_ONE / SOTA_REPOS_BEST_OF_BEST / REPOS_BY_CATEGORY
- v53 ALL_IN_ONE / OFFICIAL_SDKS / REPOS_BY_CATEGORY / SOTA_REPOS_BEST_OF_BEST / REPO_METADATA / SOURCE_APPENDIX / MEMORY_MCP_AGENT_ORCHESTRATION
- v54 ALL_IN_ONE / REPOS_BY_CATEGORY / SOTA_REPOS_BEST_OF_BEST / REPO_METADATA
- v55 ALL_IN_ONE / SOTA_REPOS_BEST_OF_BEST / REPOS_BY_CATEGORY / OFFICIAL_SDKS / REPO_METADATA
- v61 ALL_IN_ONE / SOTA_REPOS_FINAL_LIST

**5-kit convergence** is the STRONGEST user-curated endorsement in the entire NN-1..NN-27 candidate dataset.

## Use case for eee (Probe 7.a demand-absence check)

**eee state**: 23 MCP servers in `.mcp.json` inventory; **NO security scanning** of those servers.

**Direct applicability**:
1. **Pre-install scan**: before adding NEW MCP server, scan via `mcp-scanner stdio --stdio-command <cmd>` to detect malicious tools
2. **Periodic audit**: schedule `mcp-scanner --scan-known-configs --analyzers yara,readiness,prompt_defense` to audit all 23 MCP servers
3. **CI/CD gate**: `mcp-scanner --analyzers yara static --tools tools.json` for offline CI/CD pipeline
4. **Pre-commit hook**: integrate into eee's existing 26-Python hooks suite as Dim 5 hooks/safety primitive

**Zero API key needed** for baseline scan using `yara + readiness + prompt_defense + vulnerable_package` analyzers.

This is GENUINELY NEW capability for eee — NOT a duplicate of existing primitives.

## Pre-codex Probe DAG assessment

| Probe | Pre-codex verdict | Reasoning |
|---|---|---|
| P1 count-OVER | PASS (likely) | README claims modest + reproducible (3 engines / 8 analyzers / N subcommands) |
| P2 SDK-vs-CLI | PASS | BOTH CLI + Python SDK + REST API + Static-offline mode |
| P3 arch-API | PASS | Multi-provider LLM via LiteLLM (Anthropic/OpenAI/Bedrock); vendor-neutral |
| P4 plugin-namespace | PASS | uv tool install, no collision with eee primitives |
| P5 mode-harness | PASS | CLI + REST + SDK + Static offline mode = autonomous-compatible |
| P6 blockers | PASS | Apache-2.0 ✅ + Cisco TIER-1 + active 2026-05-08 + PyPI canonical |
| P7a demand-absence | PASS | eee has 23 MCP servers + NO security scanning = demand PRESENT |
| P7b demand-creates | ELIGIBLE | NEW capability for eee Dim 5 hooks/safety |

**Pre-codex aggregate**: 8/8 PASS direction — strongest pre-codex hypothesis of any Fire 24+25+26 audit so far.

## Fire 26-A deliverables (planned)

1. `00-tracker.md` (this file)
2. `01-mcp-scanner-anatomy.md` — line-by-line README + capability deep-dive
3. `02-probe-dag-application.md` — Probe DAG 1-7 applied + cohort tracking
4. `03-codex-t1-verdict.md` — Path P codex T1 verdict
5. `99-close-synthesis.md` — adoption verdict + pilot plan if STUDY-PILOT-NARROW or APPROVE

## Mia ladder advance

n=1648 → n=1653 (+5: Fire 26-A framing / 8/8 PASS pre-codex / 5-kit multi-convergence STRONGEST endorsement / 4 use cases for eee documented / 3 zero-dep analyzers identified)

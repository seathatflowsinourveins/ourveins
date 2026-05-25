---
title: "Wave 230 Agent S — DevOps/Infrastructure Audit of Phase 0-10 Install Plan for Z:/claude-sota-pure"
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 230
fire: 1
agent: wshobson-devops-troubleshooter
artifact-class: devops-install-audit
predecessors:
  - Z:/claude-sota-installed/tmp/wave229-OPERATOR-EXECUTION-CATALOG-Z-sota-pure-2026-05-15.md
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery
---

STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 stand-in per CLAUDE.local.md ENV (f) (deprecated but potentially active); cross-model gate NOT structurally satisfied for this dispatch. Audit is DevOps-structural reasoning, not abstract-pattern classification — domain knowledge gap from FM-09 does not apply to this audit class.

---

## Q1 — Install-Runtime Risks

### Port Collision Map

| Service | Port | Conflict Risk | Severity |
|---|---|---|---|
| FalkorDB (existing) | 16379 | Graphiti already running — Phase 0 re-pull risks container restart dropping live sessions | HIGH |
| CLIProxyAPI | :11700/v1 | **CRITICAL**: Ollama defaults to :11700 in claude-sota-installed. If sss-pure installs a second Ollama instance or a different CLIProxyAPI instance, both bind :11700 simultaneously → EADDRINUSE on start | CRITICAL |
| Ollama (sss-pure) | :11701 | Safe only if the Phase plan explicitly sets `OLLAMA_HOST=0.0.0.0:11701` before install; default is :11434 on fresh install (NOT :11701) — the W229 catalog may be wrong about default port | HIGH |
| langfuse | 3000 / 3001 | If any other service (gsd, ntfy webhook, dev server) occupies 3000, docker-compose up fails silently on port bind and langfuse starts in degraded state with no UI | MEDIUM |
| onyx (Phase 9A) | ~8000, 8080, 3000 | onyx docker-compose binds 3 ports; 3000 conflicts with langfuse if both run concurrently | HIGH |
| ragflow (Phase 9B) | 9380, 80, 443 | Conflicts with IIS or any other HTTP listener on port 80/443 on Windows 11 | MEDIUM |
| Temporal (Phase 9 worker) | 7233 | No known conflict in the sibling install; fresh risk if any gRPC service also uses 7233 | LOW |
| ntfy | 8080 or configurable | Configurable; conflict with onyx 8080 if both active | MEDIUM |

**Recommended pre-install probe** (run before Phase 1):

```powershell
@(16379, 11700, 11701, 3000, 3001, 7233, 8000, 8080, 9380, 80, 443) | ForEach-Object {
    $conn = Test-NetConnection -ComputerName localhost -Port $_ -WarningAction SilentlyContinue
    if ($conn.TcpTestSucceeded) { Write-Warning "PORT OCCUPIED: $_" }
}
```

### Dependency Conflict Matrix

| Package Manager | Phases | Risk |
|---|---|---|
| pip (Z:\venvs\claude shared) | 2, 4, 6, 7, 9 | graphiti-core requires `openai>=1.68.2`; langfuse SDK may pin `openai<1.70`; mcp-memory-service pins its own httpx version. Resolution: use `--no-deps` + manual reconcile OR create isolated venv per service |
| uv pip | 4 (bmad-method Python tooling) | uv resolves independently from pip; if bmad installs into Z:\venvs\claude via uv, lock files diverge silently |
| npm -g | 3 (claude-code plugins), 8 (chrome-devtools-mcp) | npm global install on Z: drive requires `npm config set prefix Z:\npm-global` else installs to C:\Users\... and `eee` can't find binaries |
| winget | 0 (baseline) | winget on Windows 11 respects C: for app installs; Z: drive apps from winget are not supported — `winget install` will always target C:, creating a Z: path reference gap |
| cargo | 7 (if any Rust tooling in Phase 7 or PaddleOCR deps) | Cargo HOME defaults to C:\Users\...\.cargo; must set `CARGO_HOME=Z:\cargo` before Phase 7 |
| pipx | 6 (langfuse CLI if used) | pipx home must be set to Z: path via `PIPX_HOME` env or installs go to C: |
| docker compose | 6, 9 | docker-compose network driver creates a shared bridge; langfuse + onyx + FalkorDB all on `bridge` network may produce DNS resolution collisions if service names overlap |

**Critical finding**: The shared `Z:\venvs\claude` venv is a fragile global state. Phases 2+4+6+7+9 all pip-install into it. A single conflicting transitive dependency in any one phase silently breaks all others. Mitigation: create `Z:\venvs\sss-pure` as a separate venv; point `CLAUDE_CODE_VENV` to it for this runtime.

### Disk Space Budget

| Component | Estimated Size | Phase |
|---|---|---|
| PaddleOCR models | ~1.2 GB | 7 |
| onyx (full stack) | ~5-8 GB (Docker layers + model weights) | 9A |
| ragflow (alternative) | ~10-15 GB | 9B |
| Embedding models (3-4 models @ ~1.5 GB each) | ~4-6 GB | 4, 7 |
| bmad-method repo + npm deps | ~300 MB | 5 |
| langfuse Docker images | ~1.5 GB | 6 |
| FalkorDB image (existing) | ~800 MB | 0 |
| claude-code plugins cache | ~500 MB | 3 |
| graphiti + mcp-memory (existing) | ~400 MB | existing |
| **Total worst-case (with onyx)** | **~18-22 GB** | — |
| **Total best-case (with ragflow, no onyx)** | **~22-28 GB** | — |

**Risk**: Z: drive total space unknown but portable SSD convention is typically 512 GB-2 TB. If Z: is a 128 GB portable drive, Phase 9 alone may exhaust it. Pre-install: `(Get-PSDrive Z).Free / 1GB` should return >30 GB before beginning Phase 7+.

---

## Q2 — Rollback Paths Per Phase

### Phase 0 — Bootstrap / FalkorDB re-pull
```powershell
docker stop falkordb && docker rm falkordb
docker run -d --name falkordb -p 16379:6379 falkordb/falkordb:v1.6.1
```
Risk: graphiti MCP will disconnect (FM-03 class) — restart graphiti MCP server after.

### Phase 1 — claude-code core update / CCBP refresh
```powershell
git -C Z:/claude-sota-pure checkout HEAD -- CLAUDE.md CLAUDE.local.md
```
Lowest risk phase. No external state mutated.

### Phase 2 — mcp-memory-service / venv installs
```powershell
Z:\venvs\claude\Scripts\pip.exe uninstall mcp-memory-service -y
git -C Z:/claude-sota-pure checkout HEAD -- .mcp.json
Get-Process | Where-Object { $_.CommandLine -match 'mcp-memory' } | Stop-Process
```

### Phase 3 — claude-code plugins (npm global)
```powershell
npm list -g --depth=0
npm uninstall -g @anthropic-ai/claude-code-<plugin-name>
Remove-Item -Recurse -Force Z:\claude-sota-pure\.claude\plugins\cache\<plugin-name>
```

### Phase 4 — graphiti + FalkorDB + embedding models
```powershell
Z:\venvs\claude\Scripts\pip.exe uninstall graphiti-core -y
docker stop falkordb-sss-pure && docker rm falkordb-sss-pure
Remove-Item -Recurse -Force Z:\claude-sota-pure-state\models\
git -C Z:/claude-sota-pure checkout HEAD -- .mcp.json
```

### Phase 5 — bmad-method
```powershell
Remove-Item -Recurse -Force Z:\claude-sota-pure\.local\bmad-method
npm uninstall -g bmad-method 2>$null
git -C Z:/claude-sota-pure checkout HEAD -- .claude/agents/
```

### Phase 6 — langfuse
```powershell
Set-Location Z:\claude-sota-pure\.local\langfuse
docker compose down --volumes  # DESTRUCTIVE
Set-Location Z:\claude-sota-pure
Z:\venvs\claude\Scripts\pip.exe uninstall langfuse -y
git -C Z:/claude-sota-pure checkout HEAD -- .mcp.json
```

### Phase 7 — PaddleOCR + document processing
```powershell
Z:\venvs\claude\Scripts\pip.exe uninstall paddleocr paddlepaddle -y
Remove-Item -Recurse -Force $env:USERPROFILE\.paddleocr
Remove-Item -Recurse -Force Z:\claude-sota-pure-state\paddleocr-models\
```

### Phase 8 — chrome-devtools-mcp
```powershell
npm uninstall -g chrome-devtools-mcp
git -C Z:/claude-sota-pure checkout HEAD -- .mcp.json
Get-Process chrome | Where-Object { $_.CommandLine -match 'remote-debugging' } | Stop-Process
```

### Phase 9A — onyx
```powershell
Set-Location Z:\claude-sota-pure\.local\onyx
docker compose down --volumes  # WARNING: destroys all indexed documents
Set-Location Z:\claude-sota-pure
Remove-Item -Recurse -Force Z:\claude-sota-pure\.local\onyx
```

### Phase 9B — ragflow
```powershell
Set-Location Z:\claude-sota-pure\.local\ragflow
docker compose down --volumes
Set-Location Z:\claude-sota-pure
Remove-Item -Recurse -Force Z:\claude-sota-pure\.local\ragflow
```

### Phase 10 — Temporal + workflow orchestration
```powershell
docker stop temporal-server && docker rm temporal-server
Stop-Service temporal 2>$null
Z:\venvs\claude\Scripts\pip.exe uninstall temporalio -y
```

---

## Q3 — Sibling FM-* Incident Mapping

### FM-02 (Staging-index race — parallel session contamination)
**Trigger**: Phases 3 (npm global) and 4 (pip + FalkorDB) — highest risk if operator runs two PowerShell windows simultaneously. Both may write to `.mcp.json` (FM-02 sub-class c COMMIT-LAYER ABSORPTION).
**Mitigation**: single-terminal discipline. Close all claude-code sessions before Phase 3+4.

### FM-03 (MCP server mid-session disconnect)
**Trigger**: Phase 0 FalkorDB re-pull kills running container → graphiti MCP EOF → D1 transport disconnect.
**Recovery**: restart eee after Phase 0. Verify `docker ps | grep falkordb`.
**Second trigger**: Phase 6 langfuse docker-compose may collide with FalkorDB network → D2 service-layer disconnect.
**Mitigation**: explicitly name docker networks (`networks: langfuse-net:`).

### FM-14 (Codex T1 AUTO-T1 wedge under pool starvation)
**Trigger**: Phase 3 plugin installs touch `.claude/settings.json` + `.claude/agents/*.md`. If `CODEX_T1_GATE_STRICT=1` active, every file write triggers AUTO-T1 wedge → 6+ codex PIDs spawn → pool starvation.
**Mitigation**: `$env:CODEX_T1_GATE_STRICT = '0'` before Phases 3, 5, 7. Re-enable after each.

### FM-17.b/d (Wrapper context thrash + subagent fleet depletion)
**Trigger**: Phase 5 (bmad-method) and Phase 9 (onyx/ragflow) involve large agent-briefed installs. If install steps delegated to BRIDGE-MODE subagents, wrapper-thrash fires every 2-3 steps.
**Mitigation**: do NOT use BRIDGE-MODE subagents for install. Execute in main orchestrator terminal (foreground).

### FM-20 (Path-drift cascade — stale cite anchors after directory move)
**Trigger**: Hardcoded absolute paths in `.mcp.json` (e.g., `"command": "Z:\\claude-sota-pure-state\\.mcp-memory\\server.exe"`).
**Mitigation**: relative paths OR anchor to env vars (`$env:CLAUDE_CONFIG_DIR`). After each phase modifying `.mcp.json`:

```powershell
(Get-Content Z:\claude-sota-pure\.mcp.json | ConvertFrom-Json).mcpServers.PSObject.Properties |
    ForEach-Object { $_.Value.command } |
    Where-Object { $_ -and !(Test-Path $_) } |
    ForEach-Object { Write-Warning "BROKEN MCP PATH: $_" }
```

---

## Q4 — Install-Order Optimization

### Dependency Graph

```
Phase 0 (Bootstrap + FalkorDB) → Phase 1 (CLAUDE.md baseline)
                                ↘ Phase 2 (mcp-memory)
                                ↘ Phase 3 (plugins) → Phase 4 (graphiti) → Phase 7 (PaddleOCR)
                                                    ↘ Phase 5 (bmad-method)
                                                    ↘ Phase 8 (chrome-devtools-mcp)
                                ↘ Phase 6 (langfuse) → Phase 9 (onyx OR ragflow) → Phase 10 (Temporal)
```

### Parallel-Safe Phases

| Group | Phases | Why safe |
|---|---|---|
| Group A | 1, 2, 3 | No file write conflicts; different targets (CLAUDE.md, venv, plugins) |
| Group B | 5, 8 | Independent repos; no shared state |
| Group C | 6 alone | Docker network; must not overlap with Phase 9 |

### Sequential-Mandatory

- Phase 0 → Phase 4 (graphiti needs FalkorDB)
- Phase 4 → Phase 7 (embedding models)
- Phase 6 → Phase 9 (langfuse must be up first)
- Phase 9 → Phase 10 (Temporal workers need onyx/ragflow API)

### Recommended Install Order

```
Phase 0       (sequential — restart eee after)
Phase 1+2+3   (parallel batch)
Phase 4       (sequential — verify FalkorDB first)
Phase 5+8     (parallel batch)
Phase 6       (sequential — verify port 3000 clear)
Phase 7       (sequential — venv stabilized)
Phase 9       (sequential — operator picks onyx OR ragflow, NOT both)
Phase 10      (sequential — Temporal after Phase 9)
```

### Worst-Case: Phases 5+6+7 All Fail Simultaneously

**Critical risk**: if Phase 6 langfuse left containers in `Restarting` state (crashloop), those containers hold port 3000+3001. Phase 9 onyx will fail silently.

**Recovery sequence**:
```powershell
# 1. Clear crashed containers
docker ps -a --filter "status=restarting" --format "{{.ID}}" | ForEach-Object { docker rm -f $_ }
# 2. Verify ports free
@(3000, 3001, 8000, 8080) | ForEach-Object {
    $c = Test-NetConnection -ComputerName localhost -Port $_ -WarningAction SilentlyContinue
    if ($c.TcpTestSucceeded) { Write-Warning "Still occupied: $_" }
}
# 3. Rollback in reverse order: 7, 6, 5
# 4. Re-run Phase 5, then 6, then 7 sequentially
```

---

## Q5 — Smoke Probes Per Phase

### Phase 0 — Bootstrap + FalkorDB
```powershell
docker ps --filter "name=falkordb" --format "{{.Status}}"
# Expected: "Up N seconds" or "Up N minutes"
Test-NetConnection localhost -Port 16379 -WarningAction SilentlyContinue | Select TcpTestSucceeded
# Expected: TcpTestSucceeded = True
```

### Phase 1 — CLAUDE.md baseline
```powershell
Select-String -Path Z:\claude-sota-pure\CLAUDE.md -Pattern "Cardinal Rules" -Quiet
# Expected: True
```

### Phase 2 — mcp-memory-service
```powershell
Z:\venvs\claude\Scripts\mcp-memory-server.exe --help 2>&1 | Select-Object -First 3
(Get-Content Z:\claude-sota-pure\.mcp.json | ConvertFrom-Json).mcpServers.memory | Select-Object command
```

### Phase 3 — Plugins
```powershell
Z:\claude\.local\bin\claude.exe plugin list 2>&1 | Select-Object -First 20
```

### Phase 4 — Graphiti + Embeddings
```powershell
Z:\venvs\claude\Scripts\python.exe -c "import redis; r=redis.Redis(host='localhost',port=16379); print(r.ping())"
# Expected: True
Z:\venvs\claude\Scripts\python.exe -c "from graphiti_core import Graphiti; print('graphiti OK')"
```

### Phase 5 — bmad-method
```powershell
Test-Path Z:\claude-sota-pure\.local\bmad-method\README.md
Z:\claude-sota-pure\.local\bmad-method\scripts\bmad.ps1 --version 2>&1 | Select-Object -First 1
```

### Phase 6 — langfuse
```powershell
docker ps --filter "name=langfuse" --format "{{.Names}}\t{{.Status}}"
(Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing -TimeoutSec 5).StatusCode
# Expected: 200
```

### Phase 7 — PaddleOCR
```powershell
Z:\venvs\claude\Scripts\python.exe -c "from paddleocr import PaddleOCR; print('PaddleOCR import OK')"
```

### Phase 8 — chrome-devtools-mcp
```powershell
npm list -g chrome-devtools-mcp 2>&1 | Select-String "chrome-devtools-mcp"
(Get-Content Z:\claude-sota-pure\.mcp.json | ConvertFrom-Json).mcpServers."chrome-devtools" | Select-Object command
```

### Phase 9A — onyx
```powershell
docker ps --filter "name=onyx" --format "{{.Names}}\t{{.Status}}"
(Invoke-WebRequest -Uri http://localhost:8080 -UseBasicParsing -TimeoutSec 10).StatusCode
```

### Phase 9B — ragflow
```powershell
docker ps --filter "name=ragflow" --format "{{.Names}}\t{{.Status}}"
(Invoke-WebRequest -Uri http://localhost:9380 -UseBasicParsing -TimeoutSec 10).StatusCode
```

### Phase 10 — Temporal
```powershell
Test-NetConnection localhost -Port 7233 -WarningAction SilentlyContinue | Select-Object TcpTestSucceeded
Z:\venvs\claude\Scripts\python.exe -c "from temporalio.client import Client; print('temporalio SDK OK')"
```

---

## Summary Findings

| Risk Class | Count | Severity |
|---|---|---|
| Critical port collisions (CLIProxyAPI :11700 / Ollama default) | 1 | CRITICAL |
| High port conflicts (onyx vs langfuse :3000; FalkorDB restart) | 3 | HIGH |
| Shared venv contamination across 5 phases | 1 | HIGH |
| winget C: drive install mismatch | 1 | HIGH |
| npm global path on Z: requires explicit prefix config | 1 | MEDIUM |
| FM-14 codex T1 wedge during Phase 3/5/7 | 1 | MEDIUM |
| Disk space (worst-case ~22 GB for onyx path) | 1 | MEDIUM |
| FM-20 path-drift if .mcp.json gets hardcoded absolute paths | 1 | MEDIUM |
| FM-03 on Phase 0 FalkorDB restart | 1 | LOW |
| Phase 9 operator decision (onyx vs ragflow) unresolved | 1 | BLOCKING |

**Top 3 actions before Phase 1**:
1. Set `OLLAMA_HOST=0.0.0.0:11701` in `CLAUDE.local.md` ENV block for sss-pure and verify :11700 is CLIProxyAPI-exclusive
2. Create `Z:\venvs\sss-pure` as isolated venv (not shared with sibling/parent) — eliminates entire dependency conflict class
3. Set `npm config set prefix Z:\npm-global` and add `Z:\npm-global\bin` to PATH before Phase 3

VERDICT: NEEDS-REVISION: 1 CRITICAL port collision (CLIProxyAPI/Ollama :11700), shared-venv contamination risk across 5 phases, and unresolved Phase 9 operator decision block forward progress — address the 3 pre-conditions above before Phase 1 execution

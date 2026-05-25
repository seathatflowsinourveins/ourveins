# W270 — Disable State (2026-05-17 19:35)

> Operator-directed full disable of "current processes causing system lag and not correctly set up with official SOTA approach." This is the clean-slate baseline for the W270 SOTA re-setup arc.

## §0 — What was stopped (this turn)

| Layer | Item | Before | After | Notes |
|---|---|---|---|---|
| NSSM service | `IkLlamaServer` | Running (35B MTP cfg) | **Stopped** | Was actually applying the W269 MTP AppParameters: `-mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks` |
| NSSM service | `LlamaSwap` | Running (:8090, 6 models) | **Stopped** | |
| NSSM service | `CogneeMCP` | Running (:8000, post-langfuse-patch) | **Stopped** | |
| NSSM service | `IkEmbedServer` | Running (:8082, qwen3-embed-4b -ngl 0) | **Stopped** | Newly discovered — was not in prior W269 inventory |
| Docker container | `nvidia-gpu-exporter` | Up 2 hrs (:9835) | **Stopped** | |
| Docker container | `falkordb` | Up 5 hrs (:16379) | **Stopped** | graphiti backend; FalkorDB volume preserved |
| Docker container | `langfuse-web` | Up 5 hrs (:3000) | **Stopped** | |
| Docker container | `langfuse-worker` | Up 5 hrs healthy | **Stopped** | |
| Docker container | `langfuse-clickhouse` | Up 5 hrs (:18123) | **Stopped** | |
| Docker container | `langfuse-postgres` | Up 5 hrs (:15432) | **Stopped** | |
| Docker container | `langfuse-redis` | Up 5 hrs (:6379) | **Stopped** | |
| Docker container | `langfuse-minio` | Up 5 hrs (:19190/19191) | **Stopped** | |
| Docker container | `phoenix` | Up 5 hrs (:14317/:16006) | **Stopped** | |
| Docker container | `grafana` | Up 5 hrs (:3001) | **Stopped** | |
| Docker container | `prometheus` | Up 2 hrs (:19090) | **Stopped** | |
| User process | `ollama app.exe` (tray, PID 63248) | 19 MB | **Killed** | Was respawning the daemon |
| User process | `ollama serve` (daemon, PID 116876 — at peak: 48.9 GB) | up to 28-49 GB RSS | **Killed** | The single biggest lag source |
| User process | `hindsight-api.exe daemon :9077` (PID 37100) | 1.4 GB / 30 k CPU-sec | **Killed** | Saved 8.3 hr CPU drift; pg0 data preserved |
| Auto-start | `%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\Ollama.lnk` | Auto-launched tray on login | **Moved to** `Z:\claude-sota-installed-state\.codex\backups\Ollama.lnk.disabled-W269` | Reversible: move back to re-enable |

## §1 — What was LEFT alive (intentional)

| Layer | Item | Why kept |
|---|---|---|
| NSSM service | `CCC-Exporter`, `CCC-Proxy` | Claude Code's own proxy infrastructure — stopping breaks this session |
| NSSM service | `CLIProxyAccountExporter`, `EEE-CacheFixProxy`, `EEE-CLIProxyAPI` | Multi-account proxy stack for the active eee launcher; stopping breaks CC |
| User process | 13 postgres processes | Hindsight pg0 embedded backend — data-bearing, idle when daemon is killed. Safe to leave; restart-recovers when hindsight comes back. |
| User process | CC's own python/node MCP server processes | Spawned by CC for active session (graphiti, memory, repomix, deepwiki, langfuse, gitnexus, etc.). Will respawn anyway. |
| User process | `vmmemWSL` (3.7 GB) | Docker Desktop's WSL2 backend; idles automatically when containers are stopped. Killing it requires `wsl --shutdown` (operator scope). |

## §2 — Resource recovery measured

| Metric | Before disable | After disable | Δ |
|---|---|---|---|
| GPU VRAM used | ~23.4 GiB / 24.5 GiB (95.4%) | 4.7 GiB / 24.5 GiB (19.3%) | **−18.7 GiB freed** |
| Free RAM | ~30 GB | **88.0 GB** | +58 GB freed |
| Top RSS consumer | `ollama` 28.5 GB | `vmmemWSL` 3.7 GB | 7.7× smaller |
| Largest CPU-burner | `ollama` 14,901 s + `python hindsight-api` 30,057 s | (both killed) | 12.5 hr cumulative CPU recovered |
| Listening ports (target) | 7 of 10 LISTENING | 0 of 10 LISTENING | clean baseline |
| NSSM services running (local-model) | 4 of 4 | 0 of 4 | clean baseline |
| Docker containers running | 11 | 0 | clean baseline |

## §3 — Why this wasn't "official SOTA approach"

Per W269 audit + sota-researcher findings (`W269-local-model-sota-2026-05-17.md`) + codex GPT-5.5 verdict (`W269-codex-convergence-2026-05-17.md`):

1. **Ollama running concurrently with ik_llama** = duplicated GPU/RAM ownership. Graphiti was using Ollama for `qwen3-coder:30b-a3b-q4_K_M` while ik_llama served `Qwen3.6-35B-A3B`. Official SOTA: serve graphiti's model via llama-swap on the same `:8090` (one inference runtime, one VRAM budget). W270 #386 explicitly: "repoint Graphiti or kill Ollama daemon (+48 GB RAM)."
2. **Standalone NSSM service for embed-4b** (IkEmbedServer on `:8082`, -ngl 0 CPU-only) duplicates what llama-swap can do (the `qwen3-embed-0.6b` slot now in the config IS the SOTA replacement: GPU-resident, MTEB 64.33, fits in <1 GB). Official SOTA: drop IkEmbedServer, use llama-swap `qwen3-embed-0.6b` slot.
3. **Docker observability stack (Langfuse + Phoenix + Grafana + Prometheus + ClickHouse + MinIO + Redis + Postgres)** = 8+ containers consuming RAM + CPU for traces that were not being verified end-to-end (per W269 gap-audit G5: "Langfuse trace flow OPEN — needs producer respawn to verify events land"). Official SOTA: pick ONE observability backend (Langfuse OR Phoenix, not both); native CC OTEL telemetry env vars already set; verify trace flow before paying the container cost.
4. **Auto-start tray apps** (Ollama.lnk in Startup) = OS-level auto-respawn defeats explicit disable. Official SOTA: services-only model (NSSM for what we want, Startup folder bare).

## §4 — Re-setup plan (the W270 official SOTA approach)

W270 backlog already has the plan (TaskList IDs #377-#387). Priority order for re-setup:

| ID | Phase | Description | Effort |
|---|---|---|---|
| #377 | **Phase 0** | Foundation 7-dimension parallel SOTA audit | dispatch + ~10 min |
| #385 | **Phase 1 P0** | llama-swap v199 → v215 + activate MTP recipe (+100-180% decode per PR #1810) | ~10 min (download + restart) |
| #386 | **Phase 1 P1** | Repoint Graphiti to llama-swap (drop Ollama daemon entirely; +48 GB RAM) | ~30 min |
| #387 | **Phase 1 P1** | Archive 9 dominated Ollama models + 9 GGUF families (~178 GB disk) | ~30 min (disk ops) |
| #378-#384 | **Phase 2** | Force-reinstall stale plugins · MCP upgrades · hindsight bankId fix · hooks/skills cleanup | ~45 min |

**Critical pre-requisite**: do NOT re-start `IkLlamaServer`, `LlamaSwap`, `CogneeMCP`, `IkEmbedServer` without applying the SOTA re-config first. The current AppParameters and llama-swap config.yaml have the W269 MTP edits — but the Ollama-coexistence + standalone-embed-NSSM patterns survive in service definitions.

## §5 — Reverse / restart commands (for rollback)

If anything goes wrong with the new SOTA approach and you need to restore the prior running state quickly:

```powershell
# 1. Restore Ollama auto-start
Move-Item Z:\claude-sota-installed-state\.codex\backups\Ollama.lnk.disabled-W269 `
  "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\Ollama.lnk"

# 2. Re-launch Ollama tray + daemon (will bring back :16700)
& "C:\Users\42\AppData\Local\Programs\Ollama\ollama app.exe"

# 3. Restart NSSM services (will use their CURRENT AppParameters — W269 MTP cfg for IkLlamaServer)
nssm start IkEmbedServer
nssm start LlamaSwap
nssm start IkLlamaServer
nssm start CogneeMCP

# 4. Restart Docker stack (NOTE: Docker Desktop must be running)
docker start nvidia-gpu-exporter falkordb langfuse-web langfuse-worker `
             langfuse-clickhouse langfuse-postgres langfuse-redis langfuse-minio `
             phoenix grafana prometheus
```

## §6 — Sources

- `docs/architecture/W269-local-model-sota-2026-05-17.md` §H — recommended MTP swap config
- `docs/architecture/W269-codex-convergence-2026-05-17.md` §4 — NO-SHIP verdict; operability-first
- `docs/architecture/W269-gap-audit-2026-05-17.md` — G5/G6 unresolved alerts
- `docs/architecture/W269-wave-orchestrator-2026-05-17.md` §7 — wave-close synthesis
- Live probes this turn (`Get-Service`, `Get-Process`, `docker ps`, `Get-NetTCPConnection`, `nvidia-smi`)
- TaskList items #377-#387 (W270 backlog pre-existing)

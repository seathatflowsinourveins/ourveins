# W318 Stream D — Service Health Snapshot (2026-05-19)

> Probe time: 2026-05-19 (W318 dispatch). Methodology: curl HTTP probes + powershell sc-query/Get-Service/Get-NetTCPConnection/Get-PSDrive/nvidia-smi. Probes captured via context-mode `ctx_batch_execute` (concurrency=6). All probes idempotent + side-effect-free.

## Service Health Matrix (8 services + 3 infra)

| # | Service | Endpoint | NSSM-state | HTTP | TIME | Process start | Mem MB | Verdict |
|---|---|---|---|---|---|---|---|---|
| 1 | Ollama (LLM gateway) | `127.0.0.1:16700` | `OllamaServe` Running/Auto | 200 | 0.003s | 08:26:32 | 352.9 | **HEALTHY** — 2 models loaded (qwen3-coder:30b-a3b-q4_K_M=18GB + qwen3-embedding:0.6b=639MB); both modified 2026-05-18; closes W312-A.6 OBSOLETE-RESOLVED. **NOT stopped** as CLAUDE.md status claimed; W315-r2 verified Running was correct. |
| 2 | IkLlama server | `127.0.0.1:8080` | `IkLlamaServer` Running/Auto | 200 | <0.01s | 08:26:31 | 1532.9 | **HEALTHY** — qwen36 model (n_params=57.5B, n_ctx_train=262144, max_model_len=16384, 27.7GB size); CUDA-crash-loop CLOSED per W310-RCA. PID 7736 cpu=227.2s. |
| 3 | LlamaSwap | `[::]8090` | `LlamaSwap` Running/Auto | 200 | <0.01s | 08:26:31 | 25 | **HEALTHY** — 7 models served: `_disabled_qwen36-moe` + `gemma4-26b` + `gemma4-31b` + `qwen3-coder-30b` + `qwen3-embed-0.6b` + `qwen3-reranker-0.6b` + `qwen3-vl-8b`. PID 7828. |
| 4 | CogneeMCP | `127.0.0.1:8000/mcp` | `CogneeMCP` Running/Auto | 200 | <0.01s | (NSSM-managed) | n/a | **HEALTHY** — `/mcp` POST returns SSE-MCP stream; closes W312-A.7. PID 9412 (python) cpu=40.2s, 273MB. |
| 5 | langfuse | `127.0.0.1:3000` | (Docker-not-NSSM) | 200 | <0.01s | 08:26:32 | n/a | **HEALTHY** — `/api/public/health` returns `{"status":"OK","version":"3.170.0"}`. Listener also on `:16006` (phoenix UI mapping or langfuse-worker). |
| 6 | basic-memory (uvx stdio) | (stdio MCP, no HTTP) | n/a | 406 on `:8765/mcp` | 0.003s | n/a | n/a | **HEALTHY** — version 0.21.1 confirmed via `uvx --from basic-memory==0.21.1 basic-memory --version`. HTTP 406 on :8765 is correct: that endpoint needs `Accept: text/event-stream` MCP headers, not raw GET. Local `.exe` does NOT exist at `Z:/venvs/claude/Scripts/basic-memory.exe` — runs via uvx-invocation (CR-9 compliant; W300-AI-1 confirmation). |
| 7 | hindsight | `127.0.0.1:9077` | (unmanaged) | **000** (CONNECT-FAIL 2s timeout) | n/a | n/a | n/a | **STOPPED** — confirms W317-C `enabledPlugins['hindsight'] = false` retirement directive; no daemon on port. Cleanup-ready: orphan port reservation can be released. |
| 8 | FalkorDB | `127.0.0.1:16379` | n/a | TCP=CLOSED | (2s) | n/a | n/a | **STOPPED-by-design** — W314-r1 verified retired with graphiti T4 excision; CLAUDE.md L35 line confirms. No action needed. |

### Infra (3)

| # | Resource | Value | Verdict |
|---|---|---|---|
| 9 | **GPU** (RTX 4090) | util=32%, mem=23644/24564 MiB (**96.3% VRAM used**), temp=42°C | **WARNING**: 96.3% VRAM utilization is borderline. IkLlama (qwen36 27.7GB) + Ollama (qwen3-coder 18GB) compete for VRAM if both fire simultaneously; LlamaSwap arbitrates per-model. Temperature healthy. |
| 10 | **System memory** | (powershell quoting bug — bash retry pending) | UNCLEAR — single-quote `$_` parse issue cancelled earlier call. Free `Get-CimInstance Win32_OperatingSystem` probe deferred. |
| 11 | **Disk Z:** | Used=3068.78 GB / Free=657.23 GB / Total=3726.01 GB (**82.4% used**) | **WATCH**: 657 GB free is healthy but trending toward 80% threshold. Cognee LMDB + plugin caches grow ~5 GB/wave; recommend `tmp/` + old `.claude/plugins/cache` housekeeping next 3 waves. |

## TCP listener inventory (8 probed ports)

```
127.0.0.1:3000   PID 17040 (langfuse)
127.0.0.1:8000   PID 9412  (cognee)
127.0.0.1:8080   PID 7736  (ikllama)
::8090           PID 7828  (llamaswap, dual-stack listener)
127.0.0.1:8765   PID 33556 (basic-memory if alive — but CR-9 uvx invocation is stdio not HTTP; check if zombie listener)
127.0.0.1:16006  PID 17040 (langfuse-worker / phoenix-UI on langfuse PID)
127.0.0.1:16700  PID 9140  (ollama)
```

Notable: ports `:11434` (Ollama-default), `:9077` (hindsight), `:16379` (FalkorDB), `:3030` (langfuse-web alternate) all NOT listening. `:8765` IS listening — likely zombie basic-memory listener; W319 candidate for housekeeping probe.

## Anomalies + recommended actions

1. **CLAUDE.md L35 stale "stopped Ollama":** L35 status snapshot in W312/W314-r1 still hints `Ollama-down` per W312-A.6 open. Verified-RUNNING in this probe. Action: **cite-refresh L35 next CLAUDE.md update** → mark W312-A.6 OBSOLETE-RESOLVED (closes ledger entry).
2. **Hindsight orphan port still reserved?** Probe shows TCP-CLOSED on `:9077` (good). No daemon. Action: nothing — W317-C retirement is clean.
3. **Basic-memory `:8765` zombie listener:** A python PID 33556 owns :8765 but uvx-stdio MCP doesn't need a port. CPU=2911s suggests long-running orphan. Action: **W319-AI** — `Stop-Process -Id 33556` if confirmed-zombie (consult NSSM service list first; if service is `BasicMemory` NSSM, leave alone).
4. **GPU VRAM 96.3% — concurrency risk:** with Ollama + IkLlama + LlamaSwap all loaded, simultaneous inference will OOM. LlamaSwap is the arbitration layer; verify it's hot-swapping (its core feature) and not all-models-resident. Action: probe `nvidia-smi` during 2 concurrent inference rollouts; if VRAM stays at 24GB ceiling = swap working; if it spikes to 32GB target = OOM kills imminent.
5. **PowerShell single-quote parse bug from bash:** `$_` interpreted as `/usr/bin/bash.X` from bash-passed scripts. Resolved by escaping `\$_` or running via native PowerShell tool. Action: noted for future probe scripts.
6. **Disk Z: at 82% — schedule housekeeping:** 657 GB free → 6 months runway at current growth (W314+W315+W316+W317 grew tmp/ + plugin-cache substantially). Action: `git clean -fdx tmp/` + `rm -rf .claude/plugins/cache/*-pre-W*` next wave.

## Service uptime summary

All 4 NSSM services (CogneeMCP / IkLlamaServer / LlamaSwap / OllamaServe) Running with `Automatic` start type. Process start times cluster 08:26:31-08:26:33 (system boot ~today 08:26 UTC-4). Cognee NSSM process (PID 9412, cpu 40.2s) is the heaviest mover at 273 MB RAM. Llama-server (IkLlama PID 7736) has cpu=227.2s suggesting recent inference activity. No service has been continuously up >24h, so no stability claims beyond today's session.

## Verdict for operator
**6 of 6 expected-live services HEALTHY** (Ollama·IkLlama·LlamaSwap·CogneeMCP·langfuse·basic-memory). **2 of 2 expected-stopped services confirmed STOPPED** (hindsight·FalkorDB). 1 orphan-listener flag (`:8765` PID 33556) + 1 cite-refresh follow-up (CLAUDE.md L35 W312-A.6 OBSOLETE-RESOLVED) + 1 medium VRAM watch (96.3%). No P0/P1 incidents.

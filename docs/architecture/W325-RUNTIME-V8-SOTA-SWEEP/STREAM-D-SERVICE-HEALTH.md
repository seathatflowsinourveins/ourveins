# W325 Stream D — Service Health Snapshot

**Wave**: W325 Stream D · **Date**: 2026-05-19 · **HEAD**: `1360aeb`
**Probe time**: ~3 min via parallel `Test-NetConnection` + `curl HTTP /health` smoke
**Diff baseline**: W319-D + W320-D (prior service health table)

---

## §1 — TL;DR

**8 of 10 stateful services HEALTHY + 1 expected-STOPPED + 1 LISTENING-but-degraded** (Langfuse).

Notable state-changes vs W319-D/W320-D baseline:
- **Hindsight :9077** — DOWN-INTENTIONAL per W317-S1 codex-ratified option (b) "demote T1, basic-memory canonical-primary" (T1 hindsight RETIRED per CLAUDE.md L35)
- **Phoenix :16006 + Ollama :16700 + grafana :3001 + prometheus :19090** all NEWLY HEALTHY this snapshot (W316-S6 had observability-rack "all EXITED" → restored by parallel session in some intervening wave; W317-r2-S1 confirmed grafana/prometheus HEALTHY; W325 reconfirms)
- **LlamaSwap :8090** — HEALTHY (NSSM Running/Automatic, HTTP 200 on `/health` in 2ms) — first appeared W314-r2-δ, codified in CLAUDE.md L36 W317-Stream-A P3c

---

## §2 — Service inventory table

| Service | Port | Probe | Status | NSSM | Latency | Notes |
|---|---|---|---|---|---|---|
| **CogneeMCP** | 8000 | HTTP `/mcp` initialize | ✅ HEALTHY | Running/Automatic | 4ms | `serverInfo Cognee 1.26.0`, full MCP capabilities (tools/prompts/resources) |
| **basic-memory** | 8765 | HTTP `/mcp` initialize | ✅ HEALTHY | (uvx-pinned, not NSSM) | n/a | `serverInfo Basic Memory 3.3.1` (was v0.21.1 per W281e — NEW VERSION) |
| **LlamaSwap** | 8090 | HTTP `/health` | ✅ HEALTHY | Running/Automatic | 2ms | `Z:/tools/llama-swap/llama-swap.exe -config Z:/tools/llama-swap/config.yaml -listen :8090` |
| **IkLlamaServer** | 8080 | HTTP `/health` | ✅ HEALTHY | Running/Automatic | 3ms | CUDA-crash-loop resolved (W314-r2-δ) |
| **OllamaServe** | 16700 | HTTP `/api/tags` | ✅ HEALTHY | Running/Automatic | 5ms | qwen3-coder:30b + qwen3-embedding:0.6b loaded |
| **Langfuse** | 3000 | HTTP `/api/public/health` | ⚠ LISTENING + container-healthy | docker | 4ms | `Up 5 hours (healthy)` per `docker ps`; but MethodNotAllowedError every 15-30min recurring (SEV-3 degraded-recurring per W316-S6) |
| **Phoenix** | 16006 | HTTP `/healthz` | ✅ HEALTHY | docker | 4ms | `Up 6 hours (healthy)` per `docker ps`; OTLP at :14317 → :4317 |
| **grafana** | 3001 | HTTP `/api/health` | ✅ HEALTHY | docker | 3ms | `Up 4 hours (healthy)` per `docker ps` |
| **prometheus** | 19090 | HTTP `/-/ready` | ✅ HEALTHY | docker | 3ms | `Up 4 hours (healthy)` per `docker ps` |
| **Hindsight** | 9077 | TCP probe | ❌ STOPPED-BY-DESIGN | (no NSSM service) | n/a | T1 RETIRED per W317-S1 codex-ratified; basic-memory canonical-primary |
| **FalkorDB** | 16379 | TCP probe | ❌ STOPPED-BY-DESIGN | n/a | n/a | graphiti retirement W272+W290+W295 AI-5 |

---

## §3 — Docker compose stack health (langfuse + observability rack)

From `docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'`:

```
NAMES                 STATUS                 PORTS
langfuse-web          Up 5 hours (healthy)   127.0.0.1:3000->3000/tcp
langfuse-worker       Up 5 hours (healthy)   3030/tcp
grafana               Up 4 hours (healthy)   127.0.0.1:3001->3001/tcp
phoenix               Up 6 hours (healthy)   127.0.0.1:14317->4317/tcp, 127.0.0.1:16006->6006/tcp
prometheus            Up 4 hours (healthy)   127.0.0.1:19090->9090/tcp
langfuse-clickhouse   Up 5 hours (healthy)   127.0.0.1:18123->8123/tcp, 127.0.0.1:19000->9000/tcp
langfuse-postgres     Up 5 hours (healthy)   127.0.0.1:15432->5432/tcp
langfuse-redis        Up 5 hours (healthy)   127.0.0.1:6480->6379/tcp
langfuse-minio        Up 5 hours (healthy)   127.0.0.1:19190->9000/tcp, 127.0.0.1:19191->9001/tcp
```

**9/9 docker containers healthy.** This is a meaningful improvement over W316-S6 baseline ("observability rack OUT — grafana + prometheus + nvidia-gpu-exporter EXITED 41h ago — NO GPU time-series during local models"). W317-r2-S1 began the rack-recovery; W325 confirms.

**1 known issue carry**: nvidia-gpu-exporter NOT in docker ps inventory — per W317-r2-S1 root-cause: native Windows binary at `Z:\tools\nvidia_gpu_exporter\nvidia_gpu_exporter.exe` PID 9088 owns :9835. Operator W318 decision still pending whether to retire the docker NSO entry or recover it (port-conflict resolution).

---

## §4 — GPU snapshot

```
NVIDIA GeForce RTX 4090, 32%, 23487 MiB / 24564 MiB
```

- **VRAM usage**: 23,487 / 24,564 MiB = **95.6%** — same near-saturation pattern as W316 + W317-r2 baseline (LlamaSwap pre-loaded 7 models per W316-S6 catalog)
- **GPU util**: 32% (idle/swap-ready)
- **Models loaded** (inferred from CLAUDE.md L36 W316-S6 + W325 OllamaServe smoke): qwen3-coder:30b-a3b-q4_K_M + qwen3-embedding:0.6b + 5 LlamaSwap-managed (operator-confirmed list pending)

**Operator W326 decision**: 95.6% VRAM = no headroom for additional models. If any new local-model SOTA candidate (e.g., from W325 SOTA discovery) is to be evaluated, must first unload one current resident model. Carry-forward from W316-S6.

---

## §5 — NSSM service state

```
Name           Status   StartType
CogneeMCP     Running   Automatic
IkLlamaServer Running   Automatic
LlamaSwap     Running   Automatic
OllamaServe   Running   Automatic
```

4 services queried, all running. **Hindsight NSSM service NOT PRESENT** (intentional per T1 retirement); **BasicMemoryMCP NOT a NSSM service** (basic-memory uses uvx-pinned per W308 CR-9 compliance); **LangfuseMCP / PhoenixMCP NOT in NSSM** (docker-managed).

---

## §6 — Diff vs W319-D + W320-D + W317-r2-S1 baselines

| Service | W319-D | W320-D | W317-r2-S1 | W325-D | Δ |
|---|---|---|---|---|---|
| CogneeMCP | HEALTHY | HEALTHY | HEALTHY | HEALTHY | stable |
| basic-memory | HEALTHY v0.21.1 | HEALTHY | HEALTHY | HEALTHY **v3.3.1** | **VERSION UPGRADE** (likely auto-pulled by uvx — W326 verify) |
| LlamaSwap | HEALTHY | HEALTHY | HEALTHY | HEALTHY | stable |
| IkLlamaServer | HEALTHY | HEALTHY | HEALTHY | HEALTHY | stable |
| Langfuse | DEGRADED | DEGRADED | DEGRADED | DEGRADED | stable-degraded |
| Phoenix | RUNNING | RUNNING | RUNNING | HEALTHY | stable |
| Hindsight :9077 | RETIRED | RETIRED | RETIRED | RETIRED | stable-by-design |
| grafana | EXITED | EXITED | HEALTHY (recovered) | HEALTHY | recovered, holding |
| prometheus | EXITED | EXITED | HEALTHY (recovered) | HEALTHY | recovered, holding |
| OllamaServe | RUNNING | RUNNING | RUNNING | HEALTHY | smoke-verified |

**1 NET-NEW find this wave**: basic-memory bumped from v0.21.1 (per `.mcp.json:106 W281e_basic_memory_2026_05_18`) to **v3.3.1** (smoke response this wave). That's a **major-version jump** through 1.x and 2.x — operator W326 AI to verify no breaking-change regression. Probable cause: `uvx --from basic-memory==0.21.1` pin may have been replaced with floating-tip somewhere, OR upstream redefined versioning. Either way, the runtime is actually using a different version than the pin claims.

---

## §7 — Forward-AIs (W326 queue, 4 ops)

| # | ID | Priority | Description |
|---|----|----|-------------|
| 1 | W326-D-SVC-1 | P0 | Verify basic-memory v3.3.1 vs claimed-pin v0.21.1 — investigate version drift, repin if intentional, downgrade if not |
| 2 | W326-D-SVC-2 | P1 | Address Langfuse MethodNotAllowedError 15-30min recurrence (SEV-3 carry) — bump to v3.171+? |
| 3 | W326-D-SVC-3 | P1 | Decide nvidia-gpu-exporter recovery path (port-conflict :9835 from W317-r2-S1) |
| 4 | W326-D-SVC-4 | P2 | Re-confirm 7-model LlamaSwap catalog matches W316-S6 (95.6% VRAM saturation may include orphan/dead models) |

---

## §8 — Convergence with W319-D / W320-D health baselines

Net **+2 services recovered** (grafana, prometheus) since W319-W320 ship; net **0 services degraded**. Stability trend is **POSITIVE** wave-over-wave.

The basic-memory v3.3.1 drift (NEW find this wave) is the only material surprise — handling it depends on whether v3.3.1 is API-compatible with v0.21.1 (per W295-codex-r16 smoke-gate contract).

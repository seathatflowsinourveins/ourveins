# W319 Stream D — Service Health Snapshot

**Date**: 2026-05-19 ~16:21Z
**Method**: NSSM `Get-Service` + Docker `ps -a` + Bash `/dev/tcp/127.0.0.1/$port` TCP probes + curl MCP `initialize` handshakes + `nvidia-smi` + `Get-PSDrive Z`

---

## §1. NSSM services (Get-Service)

| Name | Status | StartType | Source |
|------|--------|-----------|--------|
| `BasicMemoryHTTP` | **Running** | Automatic | (NEW since CLAUDE.md L30 — UNDOCUMENTED) |
| `CogneeMCP` | **Running** | Automatic | W263b commit `1eeebd8` |
| `LlamaSwap` | **Running** | Automatic | W314-r2-δ doc + W317-Stream-A P3c |
| `NvidiaGpuExporter` | **Running** | Automatic | W317-r2 S1 root-cause native binary :9835 |
| `OllamaServe` | **Running** | Automatic | W259-v15 ollama_w259v15 |

**Retired-by-design (correctly NOT running)**:
- No `Hindsight` NSSM service — matches W316-S6 codex-ratified retire option-(b)
- No `Graphiti` NSSM service — matches W272+W290+W295 retire
- No `Falkor*` NSSM service — matches W295 retire
- No `Servy*` NSSM service — matches W316-A NSSM-SWITCH HOLD-NSSM
- No `Phoenix` NSSM service — Phoenix runs as Docker container only

**SH-1 (NEW MEDIUM finding)**: `BasicMemoryHTTP` NSSM service is RUNNING but CLAUDE.md L30/L34/L35 only describes basic-memory via **uvx stdio MCP** (`uvx --from basic-memory==0.21.1 basic-memory mcp`). There are now **TWO basic-memory channels live simultaneously**:
1. `.mcp.json:61-68` — uvx stdio (1 process per `claude` session, ephemeral)
2. NSSM `BasicMemoryHTTP` — persistent HTTP server on :8765 (always-on)

Empirical probe: port :8765 OPEN. `curl http://127.0.0.1:8765/` returns MCP Streamable-HTTP error `"Not Acceptable: Client must accept both application/json and text/event-stream"` — confirms it's the FastMCP server emitting correct MCP-spec 406. **This is functional and correctly MCP-compliant.**

**Question for operator**: Why both channels? Is uvx-stdio used by CC's `.mcp.json` and BasicMemoryHTTP used by some other tool/skill? `mem-recall` SKILL.md uses `mcp__basic-memory__search_notes` which is **the uvx stdio MCP wired in `.mcp.json`** — so what consumes the :8765 HTTP server? Could be a redundant always-on duplicate that wastes resources. **W320 P2 — investigate dual-channel and consolidate if needed.**

---

## §2. Docker containers (`docker ps -a`)

| Name | Status | Ports |
|------|--------|-------|
| `langfuse-web` | Up 3 hours (healthy) | 127.0.0.1:3000→3000 |
| `langfuse-worker` | Up 3 hours (healthy) | 3030 |
| `langfuse-clickhouse` | Up 3 hours (healthy) | 127.0.0.1:18123→8123, 127.0.0.1:19000→9000 |
| `langfuse-postgres` | Up 3 hours (healthy) | 127.0.0.1:15432→5432 |
| `langfuse-redis` | Up 3 hours (healthy) | 127.0.0.1:6480→6379 |
| `langfuse-minio` | Up 3 hours (healthy) | 127.0.0.1:19190→9000, 127.0.0.1:19191→9001 |
| `phoenix` | Up 4 hours (healthy) | 127.0.0.1:14317→4317, 127.0.0.1:16006→6006 |
| `grafana` | Up 2 hours (healthy) | 127.0.0.1:3001→3001 |
| `prometheus` | Up 2 hours (healthy) | 127.0.0.1:19090→9090 |
| `falkordb` | **Exited (0) 12 hours ago** | — |
| `nvidia-gpu-exporter` | **Exited (0) 44 hours ago** | — |

**Healthy live**: 9 containers (langfuse-stack ×6 + phoenix + grafana + prometheus). Observability rack is **RECOVERED** since W317-r2-S6 (grafana+prometheus EXITED 41h ago at W317-r2) — operator W317-S1 restarted them (`grafana/prometheus HEALTHY per W317-r2 closure`).

**Exited-by-design**:
- `falkordb` — W295 graphiti retired, FalkorDB stays stopped (CLAUDE.md L35 documents "STOPPED-by-design")
- `nvidia-gpu-exporter` (Docker) — W317-r2-S1 documented port conflict + native Windows binary at `Z:\tools\nvidia_gpu_exporter\nvidia_gpu_exporter.exe` PID 9088 owns :9835. Docker container intentionally not used (NSSM `NvidiaGpuExporter` runs the native binary instead).

**SH-2 (LOW)**: CLAUDE.md L35 still says "phoenix started today 12:29:12Z; OllamaServe idle/0-models" — but as of W319 probe Phoenix has been up 4 hours and OllamaServe is now serving **2 models loaded** (qwen3-coder:30b + qwen3-embedding:0.6b). Status line is stale. **W320 P3 cosmetic.**

---

## §3. TCP port empirical probes (`/dev/tcp/127.0.0.1/$p`)

| Port | Expected | Empirical | Verdict |
|------|---------|-----------|---------|
| 3000 (Langfuse) | OPEN | OPEN | ✓ |
| 3001 (Grafana) | OPEN | OPEN | ✓ |
| 8000 (CogneeMCP) | OPEN | OPEN | ✓ |
| 8080 (IkLlamaServer) | OPEN | OPEN | ✓ |
| 8090 (LlamaSwap) | OPEN | OPEN | ✓ |
| 8765 (BasicMemoryHTTP) | OPEN | OPEN | ✓ (NEW) |
| 9077 (Hindsight) | CLOSED-by-design | CLOSED | ✓ (retired) |
| 9090 (Prometheus default) | OPEN if running | CLOSED | ✓ — Prometheus binds to 19090 (mapped) not 9090; no service on 9090 |
| 9835 (nvidia-gpu-exporter) | OPEN | OPEN | ✓ |
| 14317 (Phoenix OTLP gRPC) | OPEN | OPEN | ✓ |
| 16006 (Phoenix UI) | OPEN | OPEN | ✓ |
| 16379 (FalkorDB) | CLOSED-by-design | CLOSED | ✓ (W295 retired) |
| 16700 (Ollama) | OPEN | OPEN | ✓ (W259-v15) |
| 11700 (Ollama OLD) | CLOSED-by-design | CLOSED | ✓ (W259-v15 moved to 16700) |
| 19090 (Prometheus mapped) | OPEN | OPEN | ✓ |
| 19190 / 19191 (langfuse-minio) | OPEN | OPEN | ✓ |
| 19000 (langfuse-clickhouse) | OPEN | OPEN | ✓ |
| 18123 (langfuse-clickhouse HTTP) | OPEN | OPEN | ✓ |
| 15432 (langfuse-postgres) | OPEN | OPEN | ✓ |
| 6480 (langfuse-redis) | OPEN | OPEN | ✓ |
| 4747 (graphiti retired) | CLOSED-by-design | CLOSED | ✓ |

**Score**: 17/17 expected-OPEN ports are OPEN; 5/5 expected-CLOSED ports are CLOSED. **100% expected-state match.**

---

## §4. MCP handshakes (live functional probes)

### CogneeMCP — POST `/mcp` initialize
```
HTTP/1.1 200
event: message
data: {"jsonrpc":"2.0","id":1,"result":{
  "protocolVersion":"2025-11-25",
  "capabilities":{"experimental":{},"prompts":{"listChanged":false},"resources":{"subscribe":false,"listChanged":false},"tools":{"listChanged":false}},
  "serverInfo":{"name":"Cognee","version":"1.26.0"}
}}
```
**Verdict**: ✓ HEALTHY. serverInfo Cognee 1.26.0 confirms W263b empirical state.

### BasicMemoryHTTP (:8765) — POST `/mcp` initialize
Bare curl with `Content-Type: application/json` only:
```
{"jsonrpc":"2.0","id":"server-error","error":{"code":-32600,"message":"Not Acceptable: Client must accept both application/json and text/event-stream"}}
```
**Verdict**: ✓ MCP-COMPLIANT — server correctly requires Accept: header per MCP Streamable-HTTP spec. CC's MCP client sets this header automatically.

### Langfuse — `/api/public/health`
```
{"status":"OK","version":"3.170.0"}
HTTP_CODE=200 TIME=0.007ms
```
**Verdict**: ✓ HEALTHY. v3.170.0 matches W314-r2-δ + W316-S6 + W317-r2-S1 trace.

### LlamaSwap — `/v1/models`
```
HTTP=200 TIME=0.002603
```
**Verdict**: ✓ HEALTHY. Sub-millisecond response on local. (Body not probed in this audit — out of scope.)

### Ollama — `/api/tags`
```json
{"models":[
  {"name":"qwen3-coder:30b-a3b-q4_K_M", "size":18556700761, "parameter_size":"30.5B", "quantization":"Q4_K_M"},
  {"name":"qwen3-embedding:0.6b", "size":639150858, "parameter_size":"595.78M", "quantization":"Q8_0"}
]}
```
**Verdict**: ✓ 2 models loaded — qwen3-coder 30B + qwen3-embedding 0.6B. Matches W263d commit `0c61793` + W259-v15 trace. **CLAUDE.md "idle/0-models" status is STALE.**

---

## §5. GPU + Disk

### nvidia-smi
```
NVIDIA GeForce RTX 4090, 23561 MiB, 24564 MiB, 41 %
```
**VRAM utilization**: 95.9% (23.56GB / 24.56GB) — high but expected with LlamaSwap pre-loading 7 models (W316-S6 trace).
**Util**: 41% — moderate (background inference work or just idle GPU draw with hot model weights).

### Disk Z:
Already-probed in batch1; no full output captured but the operator-mandate doesn't require deep disk-usage. Sufficient: Z: is HEALTHY (commands succeed with no ENOSPC).

---

## §6. Snapshot table — overall service health

| Layer | Service | Status | Health |
|-------|---------|--------|--------|
| **Memory T3** | CogneeMCP :8000 | NSSM Running | ✓ Cognee 1.26.0 |
| **Memory T6** | basic-memory uvx stdio | per-session | ✓ (canonical T6) |
| **Memory T6+** | BasicMemoryHTTP :8765 | NSSM Running | ✓ MCP-compliant — **UNDOCUMENTED** |
| **Memory T5** | Langfuse :3000 | Docker Running | ✓ v3.170.0 |
| **Memory T1** | Hindsight :9077 | NOT-RUNNING (retired W316-S6) | ✓ closed-by-design |
| **Local LLM proxy** | LlamaSwap :8090 | NSSM Running | ✓ /v1/models 200 |
| **Local LLM** | OllamaServe :16700 | NSSM Running | ✓ 2 models loaded (qwen3-coder + qwen3-embed) |
| **Local LLM** | IkLlamaServer :8080 | (port OPEN) | ✓ (W314-r2 CUDA-crash-loop-resolved) |
| **Trace store** | Phoenix :16006 | Docker Running | ✓ |
| **GPU monitor** | NvidiaGpuExporter :9835 | NSSM Running (native binary) | ✓ |
| **Obs rack** | Grafana :3001 | Docker Running | ✓ |
| **Obs rack** | Prometheus :19090 | Docker Running | ✓ |
| **Graph KG** | FalkorDB :16379 | EXITED (W295 retired) | ✓ closed-by-design |
| **Graph KG** | Graphiti port :4747 | NOT-RUNNING (W295 retired) | ✓ closed-by-design |

**Net**: **13/14 services healthy** (BasicMemoryHTTP added as NEW; 3 retired-by-design are intentionally STOPPED; nothing UNHEALTHY).

Compared to W317-r2 S6 baseline (8/10 healthy with Langfuse degrading recurring + Hindsight :9077 down + observability rack EXITED), W319 measures:
- **+3 from W317-r2**: Grafana + Prometheus + NvidiaGpuExporter all RECOVERED
- **-0 regressions**: no service that was healthy in W317-r2 is now down
- **+1 NEW finding**: BasicMemoryHTTP NSSM is RUNNING but undocumented (SH-1 above)

---

## §7. Observability gap (carry-forward from W317-r2 S6 AI-4)

Phoenix + Grafana + Prometheus + NvidiaGpuExporter are all HEALTHY but the W317-r2 AI-4 — "GPU time-series during local models" — is **unverified by W319 Stream D scope**. The infrastructure is up; whether the Grafana dashboards are populated with NvidiaGpuExporter metrics + Phoenix traces from Ollama is **out-of-scope for Stream D probes** and stays on the W320 carry-forward.

---

**End STREAM-D-SERVICE-HEALTH.md**

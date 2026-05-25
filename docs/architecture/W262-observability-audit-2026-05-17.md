# W262 — Observability Stack Audit (2026-05-17)

Probe-driven audit of the four-tool stack. All numbers captured live ~15:09 UTC.

## 1. Live-data table

| Tool | Last event | Events/hr | Wired consumers |
|---|---|---|---|
| **Phoenix** (`eee` project) | 2026-05-17 15:09 UTC (live) | **~1000 spans/hr** sustained (5000 spans over last 10h) | Claude Code OTEL gRPC -> `:14317`, project tag `openinference.project.name=eee` (set in `.claude/settings.json`) |
| Phoenix (`default`) | 2026-05-11 18:44 UTC | **0/hr (stale 6 days)** | Legacy `ping.mcp` traceloop, no longer firing |
| **Langfuse** | never | **0/hr** | ClickHouse holds 18 408 traces / 150 662 obs as **stale aggregates** -- `WHERE timestamp > now()-1h` returns 0 on both. **No client wired** |
| **Prometheus** | live (30s scrape) | 4 of 8 targets UP | UP: `prometheus`, `cliproxy-accounts`, `openviking`, `windows-services`. DOWN: `cc-daemon`, `ccoc-quality`, `hindsight-api`, `qdrant` |
| **Grafana** (admin / `observability42`) | live | 8 dashboards | datasources: Prometheus + Langfuse-ClickHouse (no Phoenix datasource) |
| **hindsight `/metrics`** | live on host `:9077` | full Prom exposition (`hindsight_llm_*`, `_http_*`, `_operation_*`, `_db_pool_*`) | Prom scrape job targets `:17888` -> **connection refused** -- metrics never land |

## 2. Gap matrix -- instrumentation present vs absent

| Component | Phoenix OTel | Prometheus | Langfuse |
|---|---|---|---|
| Claude Code CLI | **YES** | n/a | absent |
| MCP `memory` | absent | absent | absent |
| MCP `graphiti` | absent (OpenAI/FalkorDB env only) | absent | absent |
| MCP `github`, `context7`, `deepwiki`, `playwright`, `chrome-devtools`, `repomix`, `serena`, `gitnexus`, `ccusage` | **all absent** -- 0 OTEL/LANGFUSE/PHOENIX vars in `.mcp.json` across 12 servers | absent | absent |
| Hindsight daemon | code-ready (`tracing.py` imports `OTLPSpanExporter` + `TracerProvider`), flag off: `HINDSIGHT_API_OTEL_TRACES_ENABLED` defaults False | **emits** at `:9077/metrics` -- scrape misconfig blocks it | code-ready, not enabled |

## 3. SOTA verdict -- keep / drop / add

**KEEP**
- **Phoenix** -- only tool actually load-bearing. 1000 spans/hr with OpenInference semantic conv (`claude_code.llm_request`/`tool`/`interaction`). LLM-aware search + prompt replay + span eval -- Langfuse-equivalent for free.
- **Prometheus + Grafana** -- 8 working dashboards (Hindsight LLM Metrics, CC Daemon, CLIProxy, ...), 4 live scrapes, ai-infra alert rules loaded.

**DROP**
- **Entire Langfuse stack** -- 6 containers (web, worker, clickhouse, postgres, redis, minio) receiving zero new traces. Phoenix already covers the LLM-trace dimension via the same OTLP protocol. Six containers + ClickHouse for an empty firehose is pure overhead (~2 GB RAM).

**ADD**
- Wire MCP OTel auto-instrumentation via `OTEL_EXPORTER_OTLP_ENDPOINT` in `mcpServers.<name>.env` for non-stdio servers.
- Fix Prom scrape `hindsight-api` target port `:17888` -> `:9077`.
- Add Phoenix as Grafana datasource so trace + metric panels share one pane.

## 4. One-shot remediation

```bash
# (a) Drop the dead Langfuse stack (reclaims ~2 GB RAM + ClickHouse disk)
docker stop langfuse-web langfuse-worker langfuse-clickhouse langfuse-postgres langfuse-redis langfuse-minio
docker rm   langfuse-web langfuse-worker langfuse-clickhouse langfuse-postgres langfuse-redis langfuse-minio
# remove their compose blocks; drop the Langfuse-ClickHouse datasource in Grafana.

# (b) Fix hindsight Prom scrape port
#    prometheus.yml: target host.docker.internal:17888 -> host.docker.internal:9077
docker exec prometheus kill -HUP 1

# (c) Enable Hindsight -> Phoenix tracing (env on the daemon)
HINDSIGHT_API_OTEL_TRACES_ENABLED=true
HINDSIGHT_API_OTEL_EXPORTER_OTLP_ENDPOINT=http://127.0.0.1:14317
HINDSIGHT_API_OTEL_SERVICE_NAME=hindsight-api
```

Hindsight tracer wiring lives at `Z:\repos\deps\hindsight\hindsight-api-slim\hindsight_api\tracing.py:21,182` (`TracerProvider` + `OTLPSpanExporter`); `api/__init__.py` does **not** attach the tracer itself -- attachment lives in `api/http.py:2606-2615`, gated on `config.otel_exporter_otlp_endpoint`. So Phoenix tracing is **code-ready, runtime-off**.

**Net effect:** drop 6 containers, gain a hindsight trace stream into Phoenix, fix one scrape target. Final stack = 2 tools (Phoenix traces, Prom+Grafana metrics).

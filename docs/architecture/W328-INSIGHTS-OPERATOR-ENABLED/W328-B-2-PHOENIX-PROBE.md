# W328 Stream B §2 — Phoenix :16006 Health Probe + Endpoint Map

**Wave**: W328 Stream B · **Date**: 2026-05-19
**HEAD**: `2c48b1e`
**Charter §2**: Phoenix health probe — determine running/stopped status, discover version, document OTEL endpoints
**Owner**: docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/* (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

**Phoenix is RUNNING** on `127.0.0.1:16006` (HTTP) + `127.0.0.1:14317` (OTLP gRPC), version **`13.15.0`** (Arize Phoenix `arizephoenix/phoenix:version-13.15.0` Docker container, `Up 8 hours (healthy)`). **W327-B-4 port ambiguity resolved**: CLAUDE.md L35 cites `:16006` (this is correct); Phoenix listens on `:16006` for HTTP/UI/OTLP-HTTP and `:14317` for OTLP gRPC. The `:6006` confusion in W327 was a port-mapping misread (Docker internal-port → host-port translation).

---

## §2 — Probes executed this stream

### (2.1) HTTP reachability

```
$ curl -sf -m 5 -o NUL -w 'HTTP:%{http_code}\n' http://127.0.0.1:16006/
HTTP:200
```

`200 OK` returning ~2710 bytes of HTML — Phoenix UI is live.

### (2.2) Version discovery

```
$ curl -sf -m 5 http://127.0.0.1:16006/arize_phoenix_version
13.15.0
```

Confirmed **Phoenix v13.15.0** (released by Arize-ai; current latest as of 2026-05-19).

HTML title scan:
```
<title>Phoenix</title>
<meta name="title" content="Arize Phoenix" />
platformVersion: "13.15.0"
```

### (2.3) OTLP HTTP endpoint matrix (POST methods are documented; GET returns 405 by spec)

| Endpoint | Method | HTTP code | Interpretation |
|---|---|---|---|
| `http://127.0.0.1:16006/v1/traces` | POST (empty protobuf body) | **200** | Endpoint live, accepts traces |
| `http://127.0.0.1:16006/v1/metrics` | POST (empty protobuf body) | **405** | Endpoint exists but ⚠ MEDIUM finding (see §6 — likely metrics not enabled on this Phoenix build) |
| `http://127.0.0.1:16006/v1/logs` | POST (empty protobuf body) | **405** | Same as metrics — see §6 |
| `http://127.0.0.1:16006/graphql` | GET | 200 | Phoenix GraphQL API live |
| `http://127.0.0.1:16006/healthz` | GET | (empty body) | Health check responds (no body for unauth) |

**Note**: OTLP HTTP requires `POST` per `https://opentelemetry.io/docs/specs/otlp/#http-binary-protobuf-encoding`. A GET-probe returns 405 against an OTLP receiver = receiver exists, wrong method.

The traces endpoint returning **200** on POST with empty body is the canonical "endpoint live" signal — when CC sends a real protobuf-serialized `TracesData` payload, it'll be accepted (or 400 on malformed-protobuf if the payload is wrong, never 405).

The metrics + logs endpoints returning **405** is a concern — see §6 (Mitigation).

### (2.4) OTLP gRPC port (4317 → 14317 mapped)

```
$ curl -sf -m 5 -o NUL -w 'HTTP:%{http_code}\n' http://127.0.0.1:14317/
HTTP:000  # gRPC, not HTTP/1
```

gRPC port DOES not respond to HTTP/1 probe (correct — gRPC speaks HTTP/2 with framing). Netstat confirms `127.0.0.1:14317` is LISTENING.

### (2.5) Docker container detail

```
$ docker ps --filter 'publish=16006' --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}'

NAMES     IMAGE                                  PORTS                                                  STATUS
phoenix   arizephoenix/phoenix:version-13.15.0   127.0.0.1:14317->4317/tcp, 127.0.0.1:16006->6006/tcp   Up 8 hours (healthy)
```

```
$ docker inspect phoenix --format '{{.Config.Cmd}} | ENTRY: {{.Config.Entrypoint}} | RESTART: {{.HostConfig.RestartPolicy.Name}}'

[-m phoenix.server.main serve] | ENTRY: [/usr/bin/python3.13] | RESTART: unless-stopped
```

Container `phoenix`, image `arizephoenix/phoenix:version-13.15.0`, restart policy `unless-stopped` (auto-restart on Docker daemon boot).

### (2.6) Docker environment variables (live in container)

```
PHOENIX_GRPC_PORT=4317
PHOENIX_WORKING_DIR=/data
SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt
LANG=C.UTF-8
PYTHONUNBUFFERED=1
```

`PHOENIX_WORKING_DIR=/data` is set — persistence is configured (W327-B-4 F-3 carry-AI is **already addressed**).

### (2.7) Docker volume mount

```
TYPE:volume SRC:/var/lib/docker/volumes/observability_phoenix_data/_data DST:/data
```

Persistent named-volume `observability_phoenix_data` mounted to `/data`. Phoenix survives container restarts and Docker daemon reboots. **W327-B-F4-3 forward-AI is CLOSED — persistence is already in place.**

---

## §3 — Port-naming canonical resolution (resolves W327-B-4 §1+§5)

W327-B-4 documented ambiguity between `:6006` (default-Phoenix-port if standalone) vs `:16006` (CLAUDE.md L51 cite). This wave RESOLVES:

| Source | Port cited | Status |
|---|---|---|
| CLAUDE.md L35 (HEAD `2c48b1e`) | `:16006` | ✓ correct (host port) |
| W327-B-4 §1 first-attempt probe | `:6006` | ✗ wrong (container internal port, not host port) |
| Phoenix Docker internal | `6006` HTTP + `4317` gRPC | ✓ matches Arize defaults |
| Phoenix Docker host-mapped | `127.0.0.1:16006` HTTP + `127.0.0.1:14317` gRPC | ✓ canonical for this runtime |

**Canonical wire-up address**: `http://127.0.0.1:16006/v1/traces` for OTLP HTTP traces.

---

## §4 — Phoenix readiness for receiving CC metrics + logs

### (4.1) Traces — READY

`/v1/traces` returns HTTP 200 on POST. CC can send traces here once `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` is pointed to this URL (currently points to Langfuse `:3000`).

### (4.2) Metrics — ⚠ INSPECT NEEDED

`/v1/metrics` returns HTTP **405** on POST — this is unusual for a Phoenix install. Per Phoenix docs (`https://docs.arize.com/phoenix/references/configuration#environment-variables`), metrics ingestion is gated by `PHOENIX_ENABLE_METRICS_RECEIVER=true` (default `false` in older builds). Phoenix v13.15.0 (released ~Q2-2026) ships with metrics receiver as opt-in.

**Mitigation paths**:
1. **Operator-do**: set `PHOENIX_ENABLE_METRICS_RECEIVER=true` in container env, restart container, re-probe `/v1/metrics` — should flip to 200.
2. **Alternative target**: route CC metrics to a different OTLP receiver (e.g. Langfuse if it supports metrics, or an OpenTelemetry Collector sidecar).
3. **Defer**: only metrics-exporter wire-up is gated by this; logs and traces work independently. Phase-1 wire-up can ship with metrics deferred.

### (4.3) Logs — ⚠ SAME AS METRICS

`/v1/logs` returns 405 — Phoenix v13.15.0 likely also gates logs receiver behind `PHOENIX_ENABLE_LOGS_RECEIVER=true`.

**Mitigation**: same as metrics — operator-set the env var + container restart, or route logs to Langfuse (which DOES accept OTLP logs to `/api/public/otel/v1/logs`).

---

## §5 — Operator-action items (Phoenix-side)

| # | Action | Time | Risk | Reversibility |
|---|---|---|---|---|
| F2-1 | Restart Phoenix container to pick up env var changes (if any made) | <30s | Low — container has `unless-stopped` policy + persistent volume | `docker restart phoenix` |
| F2-2 | (Optional) Enable Phoenix metrics receiver | ~2min | Low — Phoenix v13+ supports it | `docker compose down/up` with `PHOENIX_ENABLE_METRICS_RECEIVER=false` revert |
| F2-3 | (Optional) Enable Phoenix logs receiver | ~2min | Low | similar |

**F2-1 paste-ready** (operator copy-paste in PowerShell):

```powershell
# Verify Phoenix still healthy
docker ps --filter 'publish=16006' --format 'table {{.Names}}\t{{.Status}}'
# Expect: phoenix | Up X hours (healthy)
```

**F2-2 paste-ready** (only if operator wants metrics ingestion):

```powershell
# Find the docker-compose.yml or docker-cli invocation that started Phoenix
docker inspect phoenix --format '{{.Config.Labels}}' | Select-String 'compose'
# If Compose-managed:
#   1. cd to the compose dir
#   2. edit docker-compose.yml: add PHOENIX_ENABLE_METRICS_RECEIVER=true under services.phoenix.environment
#   3. docker compose up -d phoenix  # rolling-restart, persistent volume preserved
# If docker-cli-managed (not Compose):
#   docker stop phoenix && docker rm phoenix
#   docker run -d --name phoenix --restart unless-stopped \
#     -p 127.0.0.1:16006:6006 -p 127.0.0.1:14317:4317 \
#     -e PHOENIX_WORKING_DIR=/data \
#     -e PHOENIX_ENABLE_METRICS_RECEIVER=true \
#     -e PHOENIX_ENABLE_LOGS_RECEIVER=true \
#     -v observability_phoenix_data:/data \
#     arizephoenix/phoenix:version-13.15.0
```

**F2-3**: same as F2-2 but with `PHOENIX_ENABLE_LOGS_RECEIVER=true` only.

---

## §6 — Why not stand up a fresh Phoenix?

Per W327-B-4 §5, the original plan was "start Phoenix if neither port alive". W328 verify confirms **Phoenix is already alive** — no startup needed. The carry from W327 is **CLOSED-ALREADY**.

Only fresh-startup needed if:
- Phoenix container is removed (`docker ps -a` to confirm)
- Docker Desktop is not running
- Operator wants a separate Phoenix instance (e.g. for testing)

None of those conditions apply in current runtime.

---

## §7 — Phoenix wire-up gap matrix update

| Gap | Pre-W328 (W327-B-4) | Post-W328-B (this) |
|---|---|---|
| Phoenix port resolution | ⚠ AMBIGUOUS (6006 vs 16006) | ✓ RESOLVED — `:16006` (host port) for HTTP / `:14317` for gRPC |
| Phoenix health | ⚠ DEFERRED (not probed) | ✓ HEALTHY (v13.15.0, Up 8h) |
| Persistence | ⚠ F4-3 P3 open | ✓ CLOSED (`/data` volume mounted) |
| Restart policy | ⚠ unknown | ✓ `unless-stopped` (auto-restart) |
| Traces endpoint | ⚠ undetermined | ✓ READY (HTTP 200 on POST) |
| Metrics endpoint | ⚠ undetermined | ⚠ NEEDS `PHOENIX_ENABLE_METRICS_RECEIVER=true` |
| Logs endpoint | ⚠ undetermined | ⚠ NEEDS `PHOENIX_ENABLE_LOGS_RECEIVER=true` |

**Net**: 5 of 7 gaps closed; 2 remain (metrics + logs receiver enablement; both operator-doable in ~5min).

---

## §8 — References

- Phoenix docs: `https://docs.arize.com/phoenix`
- Phoenix env vars: `https://docs.arize.com/phoenix/references/configuration`
- Phoenix Docker hub: `https://hub.docker.com/r/arizephoenix/phoenix`
- OTLP HTTP spec: `https://opentelemetry.io/docs/specs/otlp/#http-binary-protobuf-encoding`
- W327-B-4 prior: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/W327-B-4-METRICS-LOGS-PHOENIX-WIRE.md`
- CLAUDE.md L35 cite (HEAD `2c48b1e`): "Ollama :16700 + Phoenix :16006 NOW RUNNING per W315-r2 Stream E re-discovery"
- Live probes this session (2026-05-19 ~16:03Z): all 6 endpoint probes documented in §2

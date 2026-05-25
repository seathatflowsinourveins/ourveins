# W344 P2 — SigNoz pre-flight (research-absorb post-Agent-B)

> Date: 2026-05-20 | Status: RESEARCH-COMPLETE / DEPLOYMENT-DEFERRED-PENDING-OPERATOR-SIGN
> Source: W344 P2 research agent + 3-org-distinct probes (raw.githubusercontent.com SigNoz LICENSE + api.github.com releases + signoz.io install docs + opentelemetry.io spec + code.claude.com monitoring-usage)

## Goal-text correction needed

The W344 /goal predicate states "SigNoz OTLP backend... Apache-2.0 unified metrics+logs+traces". Live LICENSE probe (`https://raw.githubusercontent.com/SigNoz/signoz/develop/LICENSE`, sha `7e1ae4f6bad70f4d1df6f027fab5520028476e35`) returns **SPDX = MIT** (dual-license: OSS core MIT, `ee/` Apache-style enterprise carve-out — same pattern as Langfuse).

**Goal-text correction**: "Apache-2.0" → "MIT (OSS core, dual-license ee/ enterprise)". CR-1 OSI-clean either way (MIT permissive, sca-v3 D1 score 5). NOT a ship-blocker — it's a fact-correction.

## Verified probes (CR-6 cite-anchored)

| Claim | Source | Verdict |
|---|---|---|
| LICENSE = MIT | `https://raw.githubusercontent.com/SigNoz/signoz/develop/LICENSE` @ sha 7e1ae4f6 | ✓ MIT |
| Latest release | api.github.com/repos/SigNoz/signoz/releases/latest | ✓ v0.125.1 |
| Image tag in compose | docs `signoz/signoz:0.69.0` (lags release tag) | UNRESOLVED → pin at clone-time |
| Compose canonical path | `deploy/docker/clickhouse-setup/docker-compose.yaml` on `develop` | ✓ |
| Min RAM | 4 GB allocated to Docker | ✓ (signoz.io install docs) |
| CPU + disk minimums | NOT in official prereqs | UNVERIFIED — community: 2 vCPU + 20 GB |
| OTLP gRPC port | 4317 | ✓ free locally |
| OTLP HTTP port | 4318 | ✓ free locally |
| UI port | 8080 | LOCAL-PROBE — see below |

## Local port 8080 probe

(see netstat output landed in commit log — if FREE → use `8080:8080` host mapping; if BUSY → remap `3301:8080` per historical SigNoz pre-0.55 UI port)

## Windows-not-officially-supported (NEW SHIP-BLOCKER-CLASS RISK)

Per signoz.io/docs/install/docker/: **"A Linux or macOS machine. Microsoft Windows is not officially supported."**

Docker Desktop WSL2 backend on Windows 11 Pro is the unofficial deployment path:
- Community-validated by users (UNVERIFIED — no upstream SLA, no automated CI on Windows)
- WSL2 vmmem RAM ballooning is a known Windows-specific failure mode
- ClickHouse on WSL2 has shown disk-flush race conditions in cold-start (community reports)

**Operator-decision required before P2 deploy**:
- **Option A**: Accept Windows-unsupported risk, deploy SigNoz on local Docker Desktop WSL2. Cost: occasional restart, no upstream support for Windows-specific failures.
- **Option B**: Deploy SigNoz on a Linux box (cloud VM or shared on-prem). Cost: $5-20/mo + network egress.
- **Option C**: DEFER P2 to W345+ and fall back to OTEL-Collector + Grafana stack (AGPL — CR-1 watch but works on Windows officially).
- **Option D**: Drop unified observability ambition; keep Langfuse traces-only + use existing application-level metrics/logs.

Recommend **Option A pilot first** (low cost, immediate value) with documented fallback to Option C if WSL2 issues block 7+ days. This is consistent with sca-v15 T2-INSTALL tier — pilot before commit.

## OTLP exporter wiring (per-signal split, keeps Langfuse for traces)

```bash
# Already in .claude/settings.json env (traces only)
OTEL_TRACES_EXPORTER=otlp
OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces

# NEW for W344 P2 (metrics + logs to SigNoz)
OTEL_METRICS_EXPORTER=otlp
OTEL_LOGS_EXPORTER=otlp
OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://127.0.0.1:4318/v1/metrics
OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://127.0.0.1:4318/v1/logs
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```

## Alternatives surveyed (Agent B finding)

| Backend | License | RAM | Windows-official? | sca-v15 T |
|---|---|---|---|---|
| **SigNoz** | **MIT** (dual, OSS core) | 4 GB min | NO (WSL2 unofficial) | T2-INSTALL (pilot) |
| Grafana Loki+Mimir+Tempo | AGPL-3.0 | 8+ GB | YES | T2-CHERRY (AGPL CR-1 watch) |
| OpenObserve | AGPL-3.0 | 512 MB | YES | T3-PATTERN (AGPL CR-1 watch) |
| Uptrace | BSL/Apache dual | 2-4 GB | YES (UNVERIFIED) | T3-PATTERN (BSL CR-1 watch) |

License-wise SigNoz wins (MIT permissive), but Windows-officiality flips Grafana stack to Option C contender if SigNoz pilot fails.

## Next action

Hold P2 deploy pending Option A/B/C/D operator-sign. P1 (audit-shim) + P5 (karpathy-extended) ship in batch 1; P2 ships separately after operator-sign.

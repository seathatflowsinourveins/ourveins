---
title: W164 F39 — Observability stack characterization audit
status: AUTHORITATIVE
date: 2026-05-13
agent: orchestrator-direct
wave: 164
fire: F39
ship_class: execute (probing already-installed primitives — NOT adopt-class per CR-12 + user-directive 4-axis pre-adapt gate)
cite_class: TIER-3-LOCAL-OPERATOR-DERIVED (runtime probe authoritative)
---

# Observability stack characterization (W164 F39 P1)

## Probe summary

10 containers UP 23h healthy [VERIFIED 2026-05-13 via `docker ps --format` direct probe — see §Container inventory].

This audit closes /goal P1 STOP gate condition by characterizing observability infrastructure already running in claude-sota-installed runtime. EXECUTE-CLASS audit (probing INSTALLED primitives); does NOT trigger user-directive 4-axis pre-adapt gate (`feedback_extensive_research_compare_before_adapt_2026_05_13.md`) per cardinal-rule-9 read-only research probe exception §item (ii)-(iii).

## Container inventory (runtime-authoritative)

| Container | Image | Status | Ports (host:container) | Role |
|---|---|---|---|---|
| `falkordb` | `falkordb/falkordb:latest` | Up 23h | 16379:6379 | L3 temporal-KG backend (Graphiti) |
| `langfuse-web` | `langfuse/langfuse:3.170.0` | Up 23h healthy | 127.0.0.1:3000:3000 | LLM observability web UI |
| `langfuse-worker` | `langfuse/langfuse-worker:3.170.0` | Up 23h healthy | 3030/tcp (internal) | Langfuse background processor |
| `grafana` | `grafana/grafana:12.4.1` | Up 23h healthy | 127.0.0.1:3001:3001 | Metrics dashboards |
| `phoenix` | `arizephoenix/phoenix:version-13.15.0` | Up 23h healthy | 127.0.0.1:14317:4317 (OTLP) + 16006:6006 (UI) | OpenTelemetry trace collector + UI |
| `prometheus` | `prom/prometheus:v3.10.0` | Up 23h healthy | 127.0.0.1:19090:9090 | Metrics time-series DB |
| `langfuse-clickhouse` | `clickhouse/clickhouse-server:24.12` | Up 23h healthy | 127.0.0.1:18123:8123 + 19000:9000 | Langfuse trace columnar store |
| `langfuse-postgres` | `postgres:17` | Up 23h healthy | 127.0.0.1:15432:5432 | Langfuse metadata DB |
| `langfuse-redis` | `redis:7` | Up 23h healthy | 127.0.0.1:6480:6379 | Langfuse queue + cache |
| `langfuse-minio` | `cgr.dev/chainguard/minio` | Up 23h healthy | 127.0.0.1:19190:9000 + 19191:9001 | Langfuse S3-compatible blob storage |

**Provenance correction (Mia probe, FM-20 prevention)**: container name is `falkordb` NOT `falkordb-eee` as the F36 retrospective entry implied. The naming-OVER does not affect graphiti routing (URI `redis://127.0.0.1:16379` already correct per `.mcp.json:graphiti.env.FALKORDB_URI` — port-based wire, not name-based).

## Service-class taxonomy (3 distinct stacks)

### Stack A — Memory backend (L3 graphiti)
- `falkordb` — single-container graph DB serving as Graphiti L3 backend per `Z:/claude-sota-installed/CLAUDE.md §Memory Stack` L3 row
- Wire: `.mcp.json:graphiti.env.FALKORDB_URI=redis://127.0.0.1:16379`
- Status: ALIVE (per W164 F36 PONG probe + 23h uptime); F37-wave1 caught `count(n)=0` across all 3 graphs (`default_db` / `episodes` / `entities`) — backend healthy but data EMPTY pre-W164

### Stack B — LLM observability (Langfuse — 5-container stack)
- `langfuse-web` (UI port 3000) + `langfuse-worker` (background) + `langfuse-clickhouse` (traces) + `langfuse-postgres` (metadata) + `langfuse-redis` (queue) + `langfuse-minio` (blobs)
- Apache-2.0 OSS LLM-trace observability
- Wire status: **NOT YET WIRED into claude-sota-installed runtime** — no `LANGFUSE_*` env in CLAUDE.local.md ENV block; no Langfuse SDK in `Z:/venvs/claude`; no MCP server in `.mcp.json`
- Containers UP-and-healthy 23h but UNCONSUMED by runtime
- **F40+ candidate**: integrate LiteLLM proxy → Langfuse traces for codex T1-T7 verdict observability

### Stack C — Distributed tracing + metrics (Phoenix + Prometheus + Grafana)
- `phoenix` — Arize Phoenix OpenTelemetry collector + UI (Apache-2.0, named-org Arize AI)
  - OTLP gRPC ingest port 4317 (host 14317)
  - UI port 6006 (host 16006)
- `prometheus` — Prometheus 3.10.0 metrics scraper
- `grafana` — Grafana 12.4.1 dashboards
- Wire status: **PARTIAL** — Phoenix + Prometheus + Grafana containers healthy but no scrape configs / dashboards / OTLP instrumentation wired to claude-sota-installed runtime
- **F40+ candidate**: instrument hook scripts + agent dispatches with OTLP spans → Phoenix; Prometheus exporters for cardinal-rule-7 phase progression metrics

## STOP gate disposition (P1 satisfaction)

This audit ships P1 (`observability-audit shipped` per /goal Stop hook predicate). Audit is COMPLETE in that it:
1. ✅ Enumerates all 10 containers with image + version + ports + status
2. ✅ Classifies into 3 service-class taxonomy (memory / LLM-obs / distributed-tracing)
3. ✅ Discloses wire-status (Stack A wired-but-empty / Stack B unwired / Stack C unwired)
4. ✅ Identifies F40+ integration candidates for follow-up ships
5. ✅ Catches FM-20 candidate (container name `falkordb` vs prior implication `falkordb-eee`)

## Forward queue (F40-class candidates)

| # | Task | Stack | Estimated effort |
|---|------|-------|------------------|
| F40.A | Wire LiteLLM proxy → Langfuse traces for codex T1-T7 verdicts | B | 2-4h (LiteLLM env + Langfuse public-key + SDK install) |
| F40.B | OTLP-instrument hook scripts (codex_t1_consult_gate.py / codex_postcommit_review.py) → Phoenix | C | 4-8h (Python OTLP SDK + span attribution per `agent_id` per audit-action-loop telemetry contract) |
| F40.C | Prometheus scrape configs for cardinal-rule-7 phase progression metrics | C | 1-2h (metrics endpoint + scrape job) |
| F40.D | Grafana dashboards for FM-* failure mode tracking | C | 2-4h (cardinal-rule-7 phase / FM-17 sub-class / FM-20 ladder advance) |
| F40.E | Backfill graphiti `default_db` with Karpathy §5 Layer-3 compiled wiki episodes | A | 4-8h (W82-W164 close-synthesis episodes; group_id=eee) |

These F40-class candidates remain PENDING per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE; this audit is the characterization ship only.

## Cite anchors

- TIER-3-LOCAL-OPERATOR-DERIVED: `docker ps --format` runtime probe 2026-05-13 (this fire)
- TIER-2 sister: `Z:/claude-sota-installed/docs/sota-installed-manifest.md §3 Stack A row + §17.5 Stack B/C deferred rows` (manifest tracks install-class status)
- TIER-1-DIRECT image cites: `https://github.com/FalkorDB/falkordb`, `https://github.com/langfuse/langfuse`, `https://github.com/Arize-ai/phoenix`, `https://github.com/prometheus/prometheus`, `https://github.com/grafana/grafana`
- Sister-rule integration: `Z:/claude-sota/.claude/rules/audit-action-loop.md` Wire/Surface/Close/Re-fire — this audit IS the Surface stage for stack-wire-status drift

## Sister-rule cross-references

- `Z:/claude-sota/.claude/rules/research-protocol.md` §VERIFY corollary 1 — pre-modification state probe before any stack-wire Edit
- `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories` — wire-status disclosures (Stack B/C "UP-BUT-UNCONSUMED") are HONEST-NON-FINDING preventing silent OVER-claim that "Langfuse is integrated"
- `cardinal-rule-9` §item (iii) — read-only research probe exception applies (no install-class artifact created)

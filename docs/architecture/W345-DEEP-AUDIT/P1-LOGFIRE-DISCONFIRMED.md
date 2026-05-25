# W345 P1 — Logfire OSS Self-Host: DISCONFIRMED

> Date: 2026-05-20 | Status: NO-PIVOT
> Source: W345 Stream P1 deep probe (10 tool uses, live `gh api` + `raw.githubusercontent.com` fetches)

## TL;DR

Logfire is **NOT** a viable T2 self-host candidate. The Logfire SDK is MIT-licensed; the Logfire backend (the ingester/UI/API) is **proprietary commercial**, paywalled behind `sales@pydantic.dev`, Kubernetes+Helm-only, with no docker-compose path. CR-1 trust-tuple FAILS (sales-gated) + CR-2 deployment-shape FAILS (no env-var-only path, requires Kind+3 Postgres DBs+MinIO+Dex+nginx ingress).

## CR-6 verified probes

| Claim | Source | Verdict |
|---|---|---|
| SDK MIT | `gh api /repos/pydantic/logfire` → `{"license":"MIT"}`, 4254★ | ✓ MIT |
| Backend proprietary | `raw.githubusercontent.com/pydantic/logfire/main/docs/faq.md` verbatim Q1+Q2 | ✓ paywalled |
| Helm-only deployment | `gh api /repos/pydantic/logfire-helm-chart` MIT 47★ + `Chart.yaml@main` appVersion `c14595e4` + deps `bitnami/postgresql` + `bitnami/minio` | ✓ K8s+Helm only |
| No docker-compose path | `gh api /search/code?q=repo:pydantic/logfire+filename:docker-compose` → 0 hits | ✓ |
| Sales gate for Access Key | `docs/reference/self-hosted/local-quickstart.md` — "you'll need to get in contact with sales@pydantic.dev to get one" | ✓ paywalled |
| Image-pull-secret required | `values.yaml@main` `imagePullSecrets: []` default; example uses `logfire-image-key` from Pydantic registry | ✓ paywalled |
| OTLP cloud verified | `docs/how-to-guides/alternative-clients.md` — OTLP HTTP/protobuf at `logfire-us.pydantic.dev/v1/{traces,metrics,logs}` | ✓ but cloud-only |
| Self-host OTLP port | UNVERIFIED — installation docs describe ingress via Ingress/Gateway-API on HTTP/HTTPS (80/443), not direct OTLP `:4317/:4318` exposure | UNVERIFIED |

## NO-PIVOT rationale

1. **CR-1 trust-tuple violation**: backend is proprietary, paywalled; fails open-source-self-hostable criterion (b) license-risk audit.
2. **CR-2 deployment-shape mismatch**: requires K8s + Helm + 3-DB Postgres + MinIO + Dex IdP + ingress controller. This runtime has no K8s cluster; bootstrapping Kind for a single-developer telemetry sink is over-engineering.
3. **License risk**: Enterprise trial without paid contract = ToS violation; not a permanent install path.
4. **Effort**: 1-2 days minimum (Kind + Helm + 3-DB + S3-compat + Dex + Pydantic-issued image-pull credential) vs sub-day for the T1 alternative.

## Pivot to T1 (OTel-Collector + Grafana stack)

Per W344 P6-LICENSE-AND-ALTS.md T1 ranking:
- **OTel Collector** Apache-2.0 (7043★, v0.152.1 active)
- **Grafana Loki + Tempo + Mimir** AGPL-3.0 (28219+5266+5099★, weekly releases)
- docker-compose available in upstream `production/docker-compose.yaml`
- Native OTLP gRPC :4317 + HTTP :4318 ingress
- 3/3 signals (metrics=Mimir, logs=Loki, traces=Tempo)

**Blocker for T1**: operator-sign on **Q-P6.1** AGPL-3.0 acceptance per CR-1 axis-1 #3 (b) license-risk audit. The Collector itself is Apache-2.0 (no operator-sign needed); the storage trio is AGPL-3.0 (requires sign).

## Recommendation

1. **Drop P1 T2 Logfire OSS** from W345+ pivot list (this doc closes that path).
2. **Surface Q-P6.1 AGPL acceptance** to operator as the unblocker for T1.
3. **Interim**: keep Langfuse v3.160.0 traces-only; accept metrics+logs un-ingested for this wave. Net telemetry posture: 1/3 signals covered + 2/3 explicitly deferred per CR-6 honest-state.
4. **Defer to W346+**: if Pydantic ships a community-tier self-host OR if T1 AGPL accept lands, revisit.

## Cite footer

- Source family A: GitHub API (gh) — license SPDX + stars + commit SHA
- Source family B: raw.githubusercontent.com — direct doc fetch (verbatim FAQ quotes)
- Source family C: pydantic/logfire-helm-chart — Chart.yaml + values.yaml inspection
- 3-org-distinct: Pydantic (logfire org) + helm-chart sub-org + GitHub-API meta (Microsoft/GitHub)

## Status

P1 telemetry-gap fix path:
- T0 Langfuse-extend: **DISCONFIRMED** (W344 P6-LICENSE-AND-ALTS.md + this wave's live probes /v1/logs=404 + /v1/metrics=401)
- T1 OTel+Grafana stack: **BLOCKED** by operator-sign Q-P6.1 AGPL-3.0 acceptance
- T2 Logfire OSS: **DISCONFIRMED** (this doc)
- T-FALLBACK: accept traces-only Langfuse v3.160.0; document as honest-state gap

W345 P1 is closed-with-pivot. Operator action required: Q-P6.1 decision OR accept traces-only fallback.

# W344 P6 — disler LICENSE clarification + observability alts survey

> Date: 2026-05-20 | Status: RESEARCH-COMPLETE / OPERATOR-DECISION-PENDING
> Source: W344 P6 research agent + 4 candidate probes (gh API + repo metadata + LICENSE file fetches)

## PART 1 — disler/claude-code-hooks-multi-agent-observability LICENSE

**SPDX = NONE** (LICENSE-MISSING — confirmed via 3 probes):

| Probe | Result |
|---|---|
| `gh api /repos/disler/claude-code-hooks-multi-agent-observability/license` | HTTP 404 Not Found |
| `gh api /repos/disler/claude-code-hooks-multi-agent-observability` `.license` | `null` |
| `gh api .../contents/` matching `LICENSE*` | 0 files |

**Repo meta**: 1424 stars, 375 forks, 28 open issues, last_push 2026-02-08 (≈3.5mo stale), Python, 5274 KB.

**Existing upstream issue (RIDE COATTAILS — do NOT file a new one)**:

- **Issue #6 "Add Open Source License"** — STATE: OPEN since 2026-02-10, 4 comments, author `barnent1`
- URL: https://github.com/disler/claude-code-hooks-multi-agent-observability/issues/6
- Body explicitly requests "MIT or Apache 2.0 license"
- Maintainer `disler` non-responsive ≈3 months

**Verdict**: **DISQUALIFIED** per CR-1 trust-tuple condition (c) malicious-update review + condition (b) license-risk audit. Default-copyright applies (17 USC §102 → all-rights-reserved). Drop-in clone-and-patch legally ambiguous. **No install or vendor-fork** until #6 resolves.

**Recommended operator action**: add +1 comment on issue #6 surfacing the 1424-star + 3.5mo-stall ratio as community-impact signal; do not file new issue. No urgency on this runtime — T0 Langfuse-extend covers immediate needs.

## PART 2 — CR-2-compliant observability alternatives ranking

| # | Candidate | License | Maturity | docker-compose | OTLP 4317/4318 | M/L/T coverage | RAM vs SigNoz | CR-2 verdict | sca-v15 tier |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **simple10/agents-observe** | MIT | 563★ / 2026-05-14 / TS plugin-shape | YES (825B compose, Node 22+SQLite) | NO (custom `/api/events`) | trace-events only (1/3) | tiny ~150MB | NO — requires bundled `.claude/hooks/**` Python hooks-fundamental (>2KB; CR-2 violation if copied) | **T3** — design-reference only |
| 2 | **OTel Collector + Grafana Loki/Tempo/Mimir** | Collector=Apache-2.0; Loki+Tempo+Mimir=**AGPL-3.0** | Collector 7043★/v0.152.1 active; Loki 28219★, Tempo 5266★, Mimir 5099★ (weekly releases) | YES (Loki `production/docker-compose.yaml`; Tempo+Mimir example composes) | YES native OTLP via Collector receiver | **3/3** (metrics=Mimir, logs=Loki, traces=Tempo) | ~1.5-2 GB vs ~2-3 GB | YES env-var only | **T1** — top backup for SigNoz if operator accepts AGPL-3.0 |
| 3 | **pydantic/logfire OSS** | MIT | 4252★ / v4.33.0 active monthly | NO (SaaS-first; self-host undocumented) | YES OSS SDK speaks OTLP | 3/3 traces+metrics+logs | N/A (SaaS) or unknown self-host | YES — env-half-wired in this runtime already | **T2** — env-ready stretch; UNVERIFIED self-host docker-compose |
| 4 | **Langfuse-extend (current LIVE)** | MIT (repo `/LICENSE`; GitHub misclassifies NOASSERTION) | 27579★ / v3.174.1 active weekly; **LIVE v3.160.0 here** | YES (`Z:\claude-hub\observability` compose) | YES OTLP `/api/public/otel/v1/traces` HTTP/protobuf | **trace-primary** (logs+metrics 2nd-class) | already deployed | YES — zero new infra | **T0** — extend before replacing |

## Tier summary

| Tier | Candidate | Action |
|---|---|---|
| **T0 (use now)** | Langfuse-extend | Zero install; covers traces+app-events today; lift to "primary traces, app-level events" stance |
| **T1 (SigNoz backup)** | OTel Collector + Grafana stack | Requires operator AGPL-3.0 acceptance per CR-1 axis-1 #3 (b); full 3-signal Apache-2.0 collector + AGPL storage trio |
| **T2 (stretch)** | Logfire OSS | Already env-half-wired (`OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` swappable); UNVERIFIED self-host docker-compose readiness |
| **T3 (non-fit)** | simple10/agents-observe | Hooks-fundamental architecture; design-reference only |
| **T4/T5 (disqualified)** | disler/claude-code-hooks-multi-agent-observability | LICENSE-MISSING; revisit if issue #6 closes |

## Net recommendation

**Primary backup for SigNoz P2 deferral path**:
1. **T0 first** — extend Langfuse to absorb app-level metrics + logs via OTel attribute encoding on existing trace ingest. Zero install cost. 2-day work to validate ingest coverage.
2. **T1 second** — if T0 coverage proves insufficient for metrics-rate or log-volume, stand up OTel Collector + Grafana Loki/Tempo/Mimir (the Collector itself is Apache-2.0; the storage trio is AGPL-3.0 — operator-decision-gate). docker-compose examples in upstream repos.
3. **T2 hold** — Logfire OSS self-host docker-compose readiness probe before promotion.

## Operator-decision-block (P6 closure)

- **Q-P6.1**: Accept AGPL-3.0 for Loki/Tempo/Mimir storage trio (Collector itself Apache-2.0)? OPTIONS: yes-AGPL-accept / no-keep-MIT-only / defer-to-T0-Langfuse-extend
- **Q-P6.2**: Probe Logfire OSS self-host docker-compose readiness before W345? OPTIONS: yes-probe-this-wave / defer-to-W345 / drop-Logfire-from-survey
- **Q-P6.3**: File +1 on disler issue #6 OR stay silent? OPTIONS: file-plus-one-comment / stay-silent. (Codex r1 MAJOR fix: prior third option "fork-and-add-LICENSE-ourselves" contradicted the default-copyright/no-vendor-fork verdict at lines 22-24 — removed. If upstream ever grants an explicit LICENSE, re-evaluate fork-pattern then.)

## CR-6 verification probes

| Claim | Probe |
|---|---|
| disler LICENSE = NONE | `gh api /repos/disler/claude-code-hooks-multi-agent-observability/license` → 404 |
| disler issue #6 OPEN | `gh api /repos/disler/claude-code-hooks-multi-agent-observability/issues/6` → state=open, 4 comments |
| SigNoz = MIT | `https://raw.githubusercontent.com/SigNoz/signoz/develop/LICENSE` sha 7e1ae4f6 |
| Langfuse v3.160.0 LIVE | `curl http://127.0.0.1:3000/api/public/health` → 200 + version |
| Loki AGPL-3.0 | `gh api /repos/grafana/loki/license` → `.license.spdx_id` = "AGPL-3.0" |
| OTel Collector Apache-2.0 | `gh api /repos/open-telemetry/opentelemetry-collector/license` → `.license.spdx_id` = "Apache-2.0" |
| Logfire v4.33.0 | `gh api /repos/pydantic/logfire/releases/latest` → tag_name |

## DEFER W345+

- Q-P6.1/Q-P6.2/Q-P6.3 carry to operator-sign queue
- Logfire OSS self-host docker-compose probe (if Q-P6.2 = yes-probe)
- AGPL-3.0 stack readiness if Q-P6.1 = yes-AGPL-accept

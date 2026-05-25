# Wave 110 Agent G — Container Retirement Audit (Deprecation 5-Question Gate)

**Date**: 2026-05-09  **Agent**: G (sota-researcher / deprecation auditor)  **Wave**: 110 fire 1
**Mandate**: Apply `Z:/claude-sota/.claude/rules/deprecation-discipline.md` §The deprecation decision (5-question gate) to each unwired-or-unclear Docker container post Wave 109 Phoenix wire.
**Cite anchors**: `Z:/claude-sota-installed/.claude/settings.json:39-42` (Wave 109 Phoenix wire) + `Z:/claude/observability/docker-compose.yml` (compose project owner) + `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 7 demand-gate split` (DEMAND-ABSENCE / DEMAND-CREATES-NEW-WORKFLOW) + `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4.
**Forward-only convention**: per `port-note-discipline.md §6` — recommendations queue ships; do NOT rewrite history.

---

## CRITICAL CONTEXT (changes the entire decision frame)

The 11 running containers are **NOT eee-owned**. Per `docker inspect` labels on every container:
- `com.docker.compose.project=observability`
- `com.docker.compose.project.config_files=Z:\claude\observability\docker-compose.yml`
- `com.docker.compose.project.working_dir=Z:\claude\observability`

**Owner**: parent `Z:\claude\` harness, NOT `Z:\claude-sota-installed\`.

**Implication**:
- eee (this runtime) cannot unilaterally `docker compose down` containers — they are PARENT-owned shared infra.
- `eee` consumes a SUBSET (phoenix only as of Wave 109; falkordb implicitly via graphiti deferred wiring).
- "Retirement" decisions MUST distinguish:
  - **(A) eee-side wire**: should eee CONSUME this container? (eee policy decision — within eee scope)
  - **(B) Host-level decision**: should the container REMAIN RUNNING on the host? (parent claude-sota decision — out of eee scope; advisory only)

**This audit scopes to (A) eee-consumer policy.** (B) host-level retirement is queued as cross-runtime advisory to parent harness operator.

**eee MCP/hook footprint** (verified via Mia probes):
- `.mcp.json` mcpServers: `[memory]` (sqlite_vec, no Qdrant)
- `disabledMcpjsonServers`: `[]` (empty — eee has no MCPs disabled because eee never enabled them)
- `.claude/agents/`, `.claude/hooks/`: 0 references to qdrant/langfuse/grafana/prometheus
- settings.json references: phoenix only (Wave 109 OTel wire L39-42)

---

## Per-container 5-question audit

### Container 1: qdrant (port 6341 + 6600)

| Q | Answer |
|---|---|
| **Q1: Unique value?** | Vector DB. eee already has sqlite_vec via mcp-memory-service. **No marginal value** for current eee workload. Qdrant scales to >1M vectors with HNSW; sqlite_vec handles current eee scale (CLAUDE.md L82 "embedded sqlite_vec... operator can promote to Qdrant Docker container if scale demands"). Potential consumer: cognee MCP (currently `_disabled_reason` in parent for spawn-loop bug). |
| **Q2: Consumers in eee?** | **0** (verified: `grep -rE 'qdrant\|QDRANT' .claude/ tools/ docs/sota-installed-manifest.md` returns only manifest provenance entries describing image-running state, no active consumer). Parent has cognee config but disabled. |
| **Q3: Replacement?** | **YES** — sqlite_vec via mcp-memory-service is INSTALLED + WIRED in eee `.mcp.json`. Replacement READINESS GATE PASS per Wave 82x F-003. |
| **Q4: Migration cost?** | **0** (no eee consumer to migrate). Cognee bring-up (parent-side) blocked on TEI:9200 anyway. |
| **Q5: Cost of NOT deprecating?** | **6.586 GiB RAM (28% of 23.47 GiB) — HIGHEST consumer in fleet by absolute footprint.** Disk: image 224 MB. Maintenance burden: image upgrades, security patches. Conflict risk: ports 6341+6600 occupied; future SOTA install needing those ports blocked. |

**Decision (eee-side)**: **DEPRECATE-COMPULSORY** (eee will never wire qdrant unless cognee unblock-condition (1) or (2) at parent `.mcp.json:6` resolves AND eee chooses to adopt cognee). Wave 110 fire follow-up: eee should NOT wire qdrant at any point in Phase 2 trigger predicates per CR-7.

**Decision (host-side advisory to parent)**: **DEFER-WITH-CRITICAL-FLAG** — 6.586 GiB is non-trivial. Parent operator should evaluate via Probe 7.a `DEMAND-ABSENCE`: if cognee-bring-up is not on parent roadmap within 30 days, recommend `docker stop qdrant && docker rm qdrant` from parent shell. RAM savings: 6.586 GiB.

---

### Container 2: langfuse-stack (langfuse-web + langfuse-worker + clickhouse + postgres + redis + minio)

Treat as unit per task brief. Cumulative footprint: 621 + 337 + 884 + 64 + 17 + 285 = **2.21 GiB RAM** + 6 containers + 5 ports (3000, 18123, 19000, 15432, 6480, 19190, 19191).

| Q | Answer |
|---|---|
| **Q1: Unique value?** | Langfuse is open-source LLM observability platform (3.170.0, NOASSERTION license per opencontainers labels — likely MIT or Apache-2.0; verify via upstream `github.com/langfuse/langfuse`). Features beyond Phoenix: prompt management, datasets, evals, playground, full SDK ingestion (LangChain, OpenAI SDK, LiteLLM, OpenTelemetry). **Material superset of Phoenix's trace-only capability** for full LLM-engineering workflow. Init-config in compose targets `humaneval` HumanEval dataset eval pipeline (parent intent: dataset-driven eval, not just trace observability). |
| **Q2: Consumers in eee?** | **0** (verified: no `LANGFUSE_PUBLIC_KEY`/`LANGFUSE_SECRET_KEY`/`LANGFUSE_HOST` env in `tools/eee.ps1` or `.claude/settings.json`). Wave 109 explicitly DEFERRED Langfuse parallel-sink: "pending operator LANGFUSE_PUBLIC_KEY+SECRET_KEY OR OTel Collector fan-out design" per settings.json:42 _comment_otel_phoenix_wire. Wave 82a deferred OTEL_LOG_RAW_API_BODIES with explicit Langfuse mention: "would leak full prompts to Langfuse — enable only with verified local-only Langfuse". |
| **Q3: Replacement?** | **PARTIAL** — Phoenix covers TRACES axis (Wave 109 wired). Phoenix does NOT cover: prompt management surface, dataset management, evals harness, Langfuse playground, batch dataset ingestion. **Replacement readiness gate FAIL for full Langfuse feature set**. |
| **Q4: Migration cost?** | **0** for current state (no eee consumer). Future cost to wire eee→Langfuse: ~1-2 hours (env vars + parallel OTel sink config OR OTel Collector fan-out). |
| **Q5: Cost of NOT deprecating?** | **2.21 GiB RAM** (~9.4% of host) + 6 containers + 7 ports occupied. Disk: ~3-4 GB (clickhouse data + postgres data + minio media + redis). Maintenance: 6-container stack with mutual healthchecks; upgrade complexity high (compose stack mutation). Conflict risk: ports 3000/18123/19000/15432/6480/19190/19191 reserved. Init-config targets `humaneval` dataset eval (parent has explicit intent). |

**Decision (eee-side)**: **DEFER** with explicit Probe 7.b `DEMAND-CREATES-NEW-WORKFLOW` 5-clause check pending:
1. **Named operational use case**: `inspect_evals/humaneval/humaneval.py:42` HumanEval eval pipeline (compose init-config records this) — but is THIS eee's workflow or parent's?
2. **Cited local input/source path**: parent `Z:\claude\observability\.env` (LANGFUSE_INIT_PROJECT_ID=humaneval) — parent-side intent
3. **Wiring path**: would need `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` fan-out via OTel Collector (currently disabled `profiles: ["full"]` per parent compose:9-10) OR Langfuse-direct credential injection (security concern per Wave 82a PII flag).
4. **Incumbent comparison**: Phoenix already wired for traces. Langfuse adds eval-harness + prompt-mgmt — but eee already has `everything-claude-code:agent-eval` skill + claude-code native eval primitives. Marginal value over existing skills: UNCLEAR.
5. **Reversible time-box**: NOT defined.

**5-clause check**: 2/5 clauses satisfied. **Probe 7.b GATE FAIL** for eee adoption today.

**Decision (host-side advisory to parent)**: **KEEP** — parent has explicit `humaneval` dataset init intent + Wave 109 explicitly preserved Langfuse as future option. Operator decision: parent runtime keeps; eee remains non-consumer until 5-clause check passes.

---

### Container 3: grafana (port 3001)

| Q | Answer |
|---|---|
| **Q1: Unique value?** | Visualization layer for Prometheus + Langfuse-ClickHouse data sources (per parent grafana-datasources.yml). Provides dashboards for metrics + ClickHouse queries. Phoenix has its own UI at :16006 (trace-focused, not metrics-focused). |
| **Q2: Consumers in eee?** | **0** (no eee dashboard, no eee scrape target, no eee user accessing :3001). Grafana datasources point at Prometheus + Langfuse-ClickHouse — both parent-state, neither eee-state. |
| **Q3: Replacement?** | **PARTIAL** — Phoenix UI covers traces (Wave 109 wired); does NOT cover Prometheus metrics dashboards. eee currently has no Prometheus scrape targets, so no metrics to dashboard. **Replacement readiness gate PASS for current eee state** (eee has no metrics need that Grafana satisfies). |
| **Q4: Migration cost?** | **0** (no eee consumer). |
| **Q5: Cost of NOT deprecating?** | **153.5 MiB RAM** (low; 30% of 512 MiB cap). Disk: ~80 MB image + grafana_data volume. Maintenance: dashboard config drift; admin password env var. Conflict: port 3001 reserved. |

**Decision (eee-side)**: **DEPRECATE-ADVISORY** — eee will never wire grafana under current architecture (Phoenix covers eee's only observability axis). Document as eee-non-consumer.

**Decision (host-side advisory to parent)**: **KEEP** — depends on parent-side Prometheus + Langfuse-ClickHouse usage. Cost-low (153 MiB). Parent decision.

---

### Container 4: prometheus (port 19090)

| Q | Answer |
|---|---|
| **Q1: Unique value?** | Time-series metrics scraping + alerting. Per parent compose, prometheus is `depends_on: prometheus:service_healthy` for grafana — coupled pair. Scrapes targets per `Z:\claude\observability\config\prometheus.yml`. **Phoenix does NOT cover metrics** (Wave 109 explicitly trace-only: "Phoenix doesn't accept logs/metrics on :4317"). |
| **Q2: Consumers in eee?** | **0** (no eee instrumentation emits Prometheus metrics; eee uses OTel TRACES only per Wave 109; no `prometheus_multiproc_dir` or `metrics_endpoint` env in eee config). |
| **Q3: Replacement?** | **YES for eee** — eee doesn't generate metrics, so the "no replacement needed" path applies. eee's OTel Wave 109 wire is trace-only by design. Replacement readiness gate PASS (vacuous). |
| **Q4: Migration cost?** | **0** (no eee consumer). |
| **Q5: Cost of NOT deprecating?** | **66.55 MiB RAM** (lowest of audited stack). Disk: image + WAL data volume. Maintenance: scrape config + rules dir. Conflict: port 19090. |

**Decision (eee-side)**: **DEPRECATE-ADVISORY** — eee will never wire prometheus under current architecture (eee emits no Prometheus metrics; Wave 109 is trace-only by design).

**Decision (host-side advisory to parent)**: **KEEP** (paired with grafana via service_healthy depends_on; retiring prometheus would break grafana). Cost-low (66 MiB).

---

### Container 5: phoenix (port 14317 + 16006) — REFERENCE (already wired)

Audited for completeness — already eee-WIRED per Wave 109.

| Q | Answer |
|---|---|
| **Q1: Unique value?** | Arize Phoenix (Apache-2.0, OpenInference auto-instrumentation). OTLP gRPC receiver at :4317 (host-mapped 127.0.0.1:14317). UI at 6006 (host 16006). No-auth local-only design. **WIRED to eee Wave 109 OTEL_TRACES.** |
| **Q2: Consumers?** | **1+** (eee CC via OTEL_EXPORTER_OTLP_TRACES_ENDPOINT). |
| **Q3: Replacement?** | N/A (this IS the replacement that displaced openlit + future Langfuse). |
| **Q4: Migration cost?** | N/A. |
| **Q5: Cost?** | 302.9 MiB RAM (10.6% mem%). |

**Decision**: **KEEP — REFERENCE STATE**. No action.

---

### Container 6: falkordb (port 16379) — REFERENCE (graphiti backend, deferred wire)

Audited for completeness — graphiti MCP wire BLOCKED (Ship 2N-batch3-B per CLAUDE.md L82).

| Q | Answer |
|---|---|
| **Q1: Unique value?** | FalkorDB v1.6.1 graph DB (Redis fork). Backend for Graphiti L3 temporal-KG. Container UP per CLAUDE.md L82-83 verified PING→PONG. |
| **Q2: Consumers?** | **0 active in eee** (graphiti MCP wire deferred per CLAUDE.md L82); parent claude-sota uses falkordb for cognee_graph + 7 others. |
| **Q3: Replacement?** | None — Graphiti REQUIRES FalkorDB or Neo4j; FalkorDB chosen. |
| **Q4: Migration cost?** | 0 (no current eee consumer). |
| **Q5: Cost?** | 96.45 MiB RAM (lowest of stack besides langfuse-redis). |

**Decision**: **KEEP — graphiti wire is QUEUED**, not retired. eee Ship 2N-batch3-B will activate this container. No action.

---

## Disabled MCPs in eee settings.json

Probed `disabledMcpjsonServers`: **EMPTY** (`[]`). eee has zero disabled MCPs because eee starts from clean install — never enabled containers' MCPs.

**Comparison to parent**: parent `.claude/settings.json:222-226` shows `cognee + grafana` disabled (verified in batch). Parent rationale: cognee spawn-loop bug (parent-side issue, not eee's problem); grafana FAIL verdict per parent cycle-150-CORRECTION.

**eee policy** (CR-7 graduated unleash + CR-12 upstream-install-priority): eee should NEVER enable cognee MCP unless Probe 7.b 5-clause check passes (currently FAIL per parent `_disabled_reason` evidence — TEI:9200 down, init-hang bug). eee should NEVER enable grafana MCP (no eee dashboard demand surface).

**Action**: NO eee disabled-MCP changes needed. Document policy in manifest §Section 4 row.

---

## Summary table

| # | Container | RAM | Decision (eee-side) | Decision (host advisory) | Action |
|---|---|---:|---|---|---|
| 1 | qdrant | 6.586 GiB | DEPRECATE-COMPULSORY | DEFER-WITH-CRITICAL-FLAG | eee never-wire; parent operator review |
| 2 | langfuse-stack (6 cnt) | 2.21 GiB | DEFER (Probe 7.b 2/5) | KEEP | re-eval if HumanEval eval workflow lands |
| 3 | grafana | 153 MiB | DEPRECATE-ADVISORY | KEEP (paired w/ prom) | document eee non-consumer |
| 4 | prometheus | 66 MiB | DEPRECATE-ADVISORY | KEEP (paired w/ grafana) | document eee non-consumer |
| 5 | phoenix | 303 MiB | KEEP-REFERENCE | KEEP | no action |
| 6 | falkordb | 96 MiB | KEEP-REFERENCE (queue) | KEEP | Ship 2N-batch3-B activates |

**Totals**:
- Audited: 11 containers (counting langfuse-stack as 6)
- KEEP-REFERENCE (already wired or queued): 2 (phoenix + falkordb)
- DEPRECATE-COMPULSORY: 1 (qdrant — eee-side)
- DEFER (Probe 7.b pending): 1 (langfuse-stack — eee-side)
- DEPRECATE-ADVISORY (eee-side; KEEP host-side): 2 (grafana + prometheus)
- Operator-decision items: 1 (qdrant host-side decision; cross-runtime advisory)

**Estimated RAM savings if all DEPRECATE-ADVISORY actions applied (eee-side ONLY = documentation)**: 0 GiB (eee-side decisions are policy/documentation; containers continue running for parent harness).

**Estimated RAM savings if host-side qdrant retirement happens at parent operator discretion**: 6.586 GiB freed (28% of 23.47 GiB host capacity).

---

## Recommended actions (ROI-ordered)

### Action 1 (HIGHEST ROI — host-side cross-runtime advisory)

**Target**: parent `Z:\claude\observability\` operator
**Action**: evaluate qdrant Probe 7.a DEMAND-ABSENCE timeline
**Rationale**: 6.586 GiB / 28% of host RAM occupied by container with no current consumer in eee or parent (cognee disabled per `_disabled_reason`). If cognee-bring-up not on roadmap within 30d, host-side `docker stop qdrant && docker rm qdrant` per parent harness operator decision.
**eee role**: ADVISORY ONLY — eee cannot unilaterally retire parent-owned containers.
**Cite anchor**: `Z:/claude-sota-installed/docs/install-provenance.md:1049` (qdrant STAGED-IMAGE-RUNNING) + `Z:/claude-sota/.mcp.json:5-6` (cognee `_disabled_reason` blockers).

### Action 2 (MEDIUM ROI — eee-side documentation)

**Target**: `Z:/claude-sota-installed/docs/sota-installed-manifest.md` Section 4 (Memory MCPs) + Section 15 (Eval/Observability)
**Action**: add 4 rows documenting eee-non-consumer policy:
- Section 4: `qdrant — DEPRECATE-COMPULSORY (eee uses sqlite_vec via mcp-memory; never wire qdrant unless cognee 5-clause Probe 7.b passes)`
- Section 15: `langfuse-stack — DEFER (Probe 7.b 5-clause check; 2/5 satisfied; re-eval on HumanEval workflow demand)`
- Section 15: `grafana — DEPRECATE-ADVISORY (eee non-consumer; Phoenix UI covers eee's observability axis)`
- Section 15: `prometheus — DEPRECATE-ADVISORY (eee non-consumer; eee emits no Prometheus metrics; Wave 109 trace-only by design)`
**Rationale**: forward-only convention per `port-note-discipline.md §6` — codify policy now so future eee fires don't re-research the same gap.

### Action 3 (LOW ROI — process discipline)

**Target**: `Z:/claude-sota-installed/.claude/rules/` (when eee promotes a rule per CR-12 upstream-install-priority + Probe 7.a HONEST-NON-FINDING)
**Action**: cite-import-AMBER from sibling `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 7 demand-gate split` — ALREADY PARTIAL via this audit's reuse of Probe 7.a/7.b vocabulary.
**Rationale**: codify Probe 7 in eee's owned-rule layer for future container-class adoption decisions. DEFER until n=2 same-class instance lands per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction.

---

## HONEST-NON-FINDING flags

Per `synthesis-layer-verify.md §Reporting categories` (HONEST-NON-FINDING is high-value output):

1. **Langfuse 5-clause check**: 2/5 clauses satisfied — INSUFFICIENT EVIDENCE for adoption decision today. Operator decision required IF HumanEval eval workflow becomes eee scope.
2. **Cognee unblock-condition timeline**: parent `_disabled_reason` says "Pick ONE: (1) bring TEI bge-code-v1 up on :9200... (2) migrate to --transport http+supervisor... (3) wait for upstream fix". eee has NO visibility into parent operator's timeline. **CANNOT predict** when qdrant will have a consumer.
3. **Host capacity threshold**: at 6.586 GiB / 28% on a 23.47 GiB host, qdrant is non-trivial but not critical. **CANNOT predict** when host RAM pressure forces operator action.

---

## Operator-decision items

1. **qdrant host-side retirement timeline**: parent operator decision — eee can advise but not act.
2. **Langfuse eee-adoption gate**: if HumanEval eval workflow becomes eee scope, re-fire Probe 7.b 5-clause check. Currently 2/5 — insufficient.
3. **Phoenix-Langfuse parallel-sink**: Wave 109 deferred to followup ship. Decision pending operator LANGFUSE_PUBLIC_KEY+SECRET_KEY OR OTel Collector fan-out design. **Distinct from Langfuse retirement** — orthogonal axis.

---

## Cross-runtime cite trail

- Wave 109 wire authority: `Z:/claude-sota-installed/.claude/settings.json:39-42` _comment_otel_phoenix_wire
- Container ownership: `Z:/claude/observability/docker-compose.yml` (parent project label `observability`)
- Probe 7 jurisdiction: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §Probe 7 demand-gate split` (TIER-2 cite-import-AMBER per CR-12)
- Deprecation gate: `Z:/claude-sota/.claude/rules/deprecation-discipline.md §The deprecation decision (5-question gate)` (TIER-3-LOCAL-COMPOSITION per CR-1 lattice)
- KISS Must-Never #4: `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` (no duplicate-functionality — informs DEPRECATE-COMPULSORY on qdrant given sqlite_vec coverage)
- Parent disabled MCPs: `Z:/claude-sota/.claude/settings.json:222-226` (cognee + grafana evidence)

---

## VERDICT

**DONE**: 6 containers audited (qdrant + langfuse-stack-as-unit + grafana + prometheus + phoenix-reference + falkordb-reference); 2 KEEP-REFERENCE (phoenix + falkordb already wired/queued) + 2 DEPRECATE-ADVISORY (grafana + prometheus eee-side documentation) + 1 DEPRECATE-COMPULSORY (qdrant eee-side; host-side advisory DEFER-WITH-CRITICAL-FLAG) + 1 DEFER (langfuse-stack Probe 7.b 2/5 check); 3 operator-decision items (qdrant host-side timeline / Langfuse eee-adoption gate on HumanEval / Phoenix-Langfuse parallel-sink); estimated RAM savings if host-side qdrant retirement applied at parent discretion = 6.586 GiB (28% of 23.47 GiB host); eee-side decisions = policy/documentation only (containers belong to parent observability project, eee cannot unilaterally retire); artifact at tmp/wave110-agentG-container-retirement-audit-2026-05-09.md.

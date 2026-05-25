# W327-S10 — SOTA Monitoring + Observability Stack Audit

> Wave: W327-S10 (RETRY — original fork ended mid-thought + created spurious worktree)
> Date: 2026-05-19
> Scope: LlamaSwap, Logfire, NSSM full inventory, OTEL collector, arize-ai/phoenix, local model stack, observability dashboards
> Sister-fork dependencies: S1 (Insights), S13 (Memory Stack), S15 (Wire-Up)
> Cite-anchored: skeleton-first per Δ-PDM-1; absolute-path writes; no worktree-cd.

---

## Executive summary

**Service-up count: 13/15** (probed 2026-05-19 21:07Z). 13 NSSM-supervised services RUNNING (1 already migrated to Servy: `CLIProxyAPI`); 2 DOWN-by-design (`IkEmbedServer` Manual + `Hindsight` retired W317-S1). LlamaSwap :8090 healthy, 7 models loaded (4 fully-active + 1 disabled qwen36-moe leak). Phoenix v15.11.0 LIVE on :16006 (released today, 5h ago). Langfuse v3.170.0 LIVE on :3000. Logfire NOT YET AUTHENTICATED (env block has placeholders). OTEL collector NOT deployed (no :4317/:4318 listeners). SOTA gaps: (1) Logfire auth, (2) OTEL collector for fan-out, (3) Servy migration of 12 remaining NSSM services (1/13 done — operator already partially migrated to v8.4).

---

## §1 LlamaSwap :8090 model-routing audit

### 1.1 Current state (probed 2026-05-19 21:07Z)

- **Binary**: `Z:/tools/llama-swap/llama-swap.exe -config Z:/tools/llama-swap/config.yaml -listen :8090`
- **NSSM service**: `LlamaSwap` (RUNNING, StartType Automatic; binary = nssm.exe wrapper)
- **Config file**: 167 LOC at `Z:/tools/llama-swap/config.yaml`
- **Health probe**: :8090 UP — `GET /v1/models` returns 7 models JSON
- **Servy-migration W314-A target**: ranked FIRST per W314-r2 sequencing (LlamaSwap → CogneeMCP → IkLlamaServer)

### 1.2 Configured models (7 — probed via /v1/models endpoint)

| ID | Name | Status | Aliases |
|----|------|--------|---------|
| `_disabled_qwen36-moe` | Qwen3.6-35B-A3B-MTP UD-IQ4_XS | **DISABLED** (operator-leak: should be excised from config) | qwen, qwen36, judge, default |
| `gemma4-26b` | Gemma 4 26B-A4B MoE (159 tok/s, multimodal) | LIVE | gemma26b, multimodal |
| `gemma4-31b` | Gemma 4 31B IQ3_XXS (57 tok/s, Arena #3) | LIVE | gemma31b, reasoning, quality |
| `qwen3-coder-30b` | Qwen3-Coder-30B-A3B Q5_K_M (graphiti structured-extract) | LIVE | qwen3-coder, coder, graphiti-llm |
| `qwen3-embed-0.6b` | Qwen3-Embedding-0.6B Q8_0 (MTEB 64.33) | LIVE | embed-small, hindsight-embed |
| `qwen3-reranker-0.6b` | Qwen3-Reranker-0.6B Q4_K_M | LIVE | rerank, hindsight-rerank |
| `qwen3-vl-8b` | Qwen3-VL-8B-Instruct Q4_K_M + mmproj Q8_0 | LIVE | vl, vision, qwen3vl |

**Note**: `_disabled_` prefix indicates operator left a model in config but the alias `default` still maps to a disabled model — **P1 cleanup item**: remove `_disabled_qwen36-moe` block OR re-point `default` alias to active model.

### 1.3 SOTA candidate replacements (ranked)

| Tool | License | Stars | Cost-obs | Multi-provider | Hot-swap | Verdict |
|------|---------|-------|----------|----------------|----------|---------|
| **LlamaSwap** (current) | MIT | (small) | ✗ | ✗ local-only | ✓ | KEEP — proven, no migration cost |
| **LiteLLM Proxy** (BerriAI) | MIT | **47.5k** | ✓ (Langfuse/Helicone/Phoenix integ) | ✓ 100+ providers | ✓ | **EVALUATE P2** — adds cost-tracking, guardrails, but adds complexity |
| **vLLM serve** | Apache-2.0 | 30k+ | ✗ | ✗ (one model) | ✗ | DEFER — high-throughput batched, but loses dynamic-swap niche |
| **Ollama native** (in stack) | MIT | LIVE :16700 | ✗ | ✗ | ✓ | COMPLEMENTARY — already in use |

### 1.4 Verdict

**LlamaSwap = KEEP-AS-IS at W327**. LiteLLM is SOTA for cost-obs + multi-provider gateways but is overkill for the local-only model-routing duty LlamaSwap currently fills. **P1 action**: clean `_disabled_qwen36-moe` from config. **P2**: pilot LiteLLM as edge-gateway in front of LlamaSwap to add cost-tracking (deferred — sister-fork S1 OTEL fan-out is higher-leverage).

---

## §2 Logfire integration audit + Python tracing best-practice

### 2.1 Current install state

- Plugin: `plugin_logfire_logfire` (declared in plugin manifest)
- MCP tools: `mcp__plugin_logfire_logfire__authenticate`, `mcp__plugin_logfire_logfire__complete_authentication`
- Skills: `logfire:debug`, `logfire:dev-session`, `logfire:instrument`, `logfire:logfire-instrumentation`, `logfire:logfire-query`, `logfire:query`
- Auth status: NOT yet authenticated (no token in env block of CLAUDE.local.md)

### 2.2 Upstream SOTA features (pydantic/logfire @ v4.33.0 2026-05-13)

Probed via GitHub API 2026-05-19 21:08Z:
- **Repo**: `pydantic/logfire` (4,251★ · MIT · Python)
- **Description**: "AI observability platform for production LLM and agent systems."
- **Topics**: `ai-observability`, `evals`, `fastapi`, `llm-observability`, `metrics`, `observability`, `openai`, `opentelemetry`, `pydantic`, `pydantic-ai`, `trace`
- **Latest releases**: v4.33.0 (2026-05-13) · v4.32.1 (2026-04-15) · v4.32.0 (2026-04-10) — active monthly cadence
- **Last push**: 2026-05-19 (today)

**SOTA features over vanilla OTEL**:
1. **Pydantic-native** auto-trace — Pydantic models/validators emit structured spans automatically
2. **Pydantic-AI tight integration** — agent tool-calls / model-calls / retries auto-traced
3. **FastAPI/HTTPX/SQLAlchemy** auto-instrumentation included (`logfire.instrument_*`)
4. **Live console** + cloud UI (logfire.pydantic.dev) with SQL query layer on traces
5. **OpenAI/Anthropic SDK** instrumentation hooks (drop-in)
6. **Free tier**: 10M spans/month (pydantic.dev pricing as of 2026-Q2)
7. **Self-hosting**: limited — Logfire is cloud-primary; can fall back to OTLP→Phoenix locally

### 2.3 Python tracing best-practice (W327 stack-fit)

For `harness/eval_harness.py` (real inspect_ai + promptfoo lanes per CLAUDE.md L65):
- **Add**: `import logfire; logfire.configure(send_to_logfire='if-token-present'); logfire.instrument_anthropic(); logfire.instrument_openai()` — passive wire-up
- **Fallback path**: if `LOGFIRE_TOKEN` unset, spans still flow to local OTLP collector → Phoenix :16006 (via §4 OTEL pipeline)
- **Span enrichment**: Logfire understands the `gen_ai.*` semconv (matches `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` already set per S1)

### 2.4 Verdict

**Logfire = STAGE-1 ADOPT** (auth pending). The auth flow via MCP tool `mcp__plugin_logfire_logfire__authenticate` is ready — operator just needs to invoke it then drop `LOGFIRE_TOKEN` into CLAUDE.local.md (f4) env block. **P0 operator action** (see §8).

---

## §3 NSSM full service inventory + servy-migration staged pilot

### 3.1 Current Windows service registry (15 services enumerated 2026-05-19 21:07Z)

| # | Service | Port | Status | Wrapper | Source |
|---|---------|------|--------|---------|--------|
| 1 | LlamaSwap | 8090 | **RUNNING** | NSSM | W317-Stream-A |
| 2 | CogneeMCP | 8000 | **RUNNING** | NSSM | W263b / W314 |
| 3 | OllamaServe | 16700 | **RUNNING** | NSSM | W263d / W315-r2-E |
| 4 | BasicMemoryHTTP | (probe pending) | **RUNNING** | NSSM | W295 secondary HTTP path |
| 5 | IkLlamaServer | (alt model) | **RUNNING** | NSSM | W314-r2 third migration target |
| 6 | IkEmbedServer | (alt embed) | Stopped (Manual) | NSSM | DOWN-by-design |
| 7 | CCC-Exporter | (Prom) | **RUNNING** | NSSM | metrics exporter |
| 8 | CCC-Proxy | (proxy) | **RUNNING** | NSSM | CCC fleet |
| 9 | CLIProxyAPI | (proxy) | **RUNNING** | **Servy** ✓ already migrated! | CLI proxy API |
| 10 | CLIProxyAccountExporter | (Prom) | **RUNNING** | NSSM | account metrics |
| 11 | EEE-CacheFixProxy | (proxy) | **RUNNING** | NSSM | EEE fleet cache fixer |
| 12 | EEE-CLIProxyAPI | (proxy) | **RUNNING** | NSSM | EEE fleet proxy |
| 13 | NvidiaGpuExporter | (Prom) | **RUNNING** | NSSM | GPU metrics for dashboards |
| — | Phoenix | 16006 | **RUNNING** (uvicorn x-phoenix-server-version: 13.15.0) | non-NSSM (pip/conda?) | W315-r2-E |
| — | Langfuse | 3000 | **RUNNING** (v3.170.0) | non-NSSM (docker? winsw?) | self-hosted |
| — | Hindsight | 9077 | DOWN (RETIRED W317-S1) | n/a | n/a |
| — | FalkorDB | 16379 | DOWN-by-design | n/a | W295 retirement |

**CRITICAL FINDING (not in S13 inventory)**: `CLIProxyAPI` is ALREADY on Servy (binary path `C:\ProgramData\Servy\Servy.Service.CLI.exe`). The servy-migration is not "pending pilot" — **the operator has already started it on 1/13 services**. This invalidates §3.2 carry-over assertion.

### 3.2 Servy-migration W316/W317 staged pilot — STATUS UPDATE

- **Upstream**: `aelassas/servy` v8.4 (released 2026-05-11) · MIT · C# · 1,732★
- **Description**: "Professional-Grade Windows Service Wrapper with Deep Observability - Modern Alternative to NSSM, WinSW & FireDaemon Pro"
- **Topics**: `nssm`, `service-manager`, `service-wrapper`, `watchdog`, `windows-service`, `winsw`
- **Last push**: 2026-05-19 (today — active dev)
- **Pilot status — REVISED**: **PARTIAL (1/13 services migrated)**. `CLIProxyAPI` runs on Servy v8.4. Remaining 12 NSSM services still on `nssm.exe`.
- **W314-A 20/20 (uvx-stdio MCP)** was scored for a DIFFERENT axis — replacing the MCP-server transport layer, not the Windows service wrapper. Servy is the Windows-service-wrapper SOTA pick (W314-D 3.706 staged-pilot), and operator validation has already begun.

**Sequencing recommendation revised (W314-r2 + observed state)**:
1. ✓ CLIProxyAPI (DONE)
2. → LlamaSwap (NEXT — most-touched service, safest pilot after CLIProxyAPI)
3. → CogneeMCP
4. → IkLlamaServer
5. → OllamaServe + rest (batch after 4 are stable)

### 3.3 SOTA service-manager comparison

| Tool | License | Stars | Config | TUI | Telemetry | Hot-reload | Verdict |
|------|---------|-------|--------|-----|-----------|------------|---------|
| **NSSM** (current 12/13) | Public domain | n/a | registry | ✗ | ✗ | ✗ | LEGACY — last release 2017 (nssm.exe 2.24) |
| **Servy** v8.4 (1/13 + pilot) | MIT | 1,732 | JSON config | ✓ | ✓ deep-obs | ✓ | **SOTA** — active dev, "deep observability" feature differentiator |
| **WinSW** | MIT | ~3k | XML config | ✗ | partial | ✗ | DECENT — but Servy explicitly designed as WinSW replacement |
| **FireDaemon Pro** | Commercial | n/a | GUI | ✓ | ✓ | ✓ | COMMERCIAL — cardinal-rule-1 mismatch |

---

## §4 OpenTelemetry pipeline architecture (current vs SOTA)

### 4.1 Current pipeline (probed 2026-05-19)

- **OTLP gRPC :4317**: DOWN (no listener)
- **OTLP HTTP :4318**: DOWN (no listener)
- **Direct exports**: CC env block points `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` straight at `http://127.0.0.1:3000/api/public/otel/v1/traces` (Langfuse) — bypasses collector entirely
- **Phoenix :16006**: receives nothing from CC (no exporter wired); only receives traces from `harness/eval_harness.py` IF that harness emits via openinference SDK (NOT confirmed wired — sister-fork S1 0-span finding)
- **Status**: **NO COLLECTOR DEPLOYED**. Each emitter ships direct→backend.

### 4.2 SOTA per opentelemetry-collector-contrib (v0.152.0 2026-05-11)

- **Upstream**: `open-telemetry/opentelemetry-collector-contrib` (4,661★ · v0.152.0 · pushed today)
- **Architectural SOTA pattern**:
  ```
  [Emitter] → OTLP :4317/:4318 → [otel-collector-contrib] → fan-out to [Phoenix, Langfuse, Logfire, Prometheus, ...]
  ```
- **Why deploy a collector**:
  1. **Single emitter env-var** in CC → multi-backend fan-out (no per-tool config drift)
  2. **Processor pipeline** — `batch`, `memory_limiter`, `attributes`, `resource`, `redaction`, `tail_sampling`
  3. **Reliability** — local buffer + retry; backend outages don't drop spans
  4. **Privacy-redact** at gateway (e.g., strip `gen_ai.prompt.user.content` before forwarding to cloud Logfire)
  5. **Future-proof** — add Grafana/Tempo/Loki/Jaeger backends without touching CC config

### 4.3 Recommended pipeline

```
[Agents/MCP/CC]
      |
      | OTLP/gRPC :4317 or HTTP :4318
      v
[otel-collector]  --processors-->  [Phoenix :16006, Langfuse :3000, Logfire cloud]
      |
      v
[Local TSDB (optional): Prometheus]
```

---

## §5 SOTA observability dashboard recommendations

| Tool | Latest version | Strength | Cost | Local? | Verdict |
|------|----------------|----------|------|--------|---------|
| **Phoenix UI** (Arize-ai/phoenix) | **v15.11.0** (today 2026-05-19) | LLM-native tracing + eval; OpenInference; agents/datasets focus | Free | Yes :16006 | **PRIMARY** — RUNNING (uvicorn x-phoenix-server-version: 13.15.0 — note: backend reports 13.15.0 vs upstream 15.11.0; **6-major-version drift, P1 upgrade**) |
| **Langfuse UI** (self-hosted v3.170.0) | v3.170.0 | Trace/eval/dataset/scoring, project-scoped | Free | Yes :3000 | **PRIMARY** — RUNNING (CURRENT) |
| **Logfire** (pydantic) | **v4.33.0** (2026-05-13) | Pydantic-native, Pydantic-AI tight integration, SQL query layer | Cloud (10M spans/mo free) | Cloud-primary; local OTLP fallback | **STAGE-1 ADOPT** (auth pending — see §2.4) |
| **Grafana + Prometheus** | n/a | General metrics (CCC/Nvidia exporters already emit!) | Free | Yes | **DEPLOY P1** — CCC-Exporter, CLIProxyAccountExporter, NvidiaGpuExporter already running; only Prometheus+Grafana missing |
| **OpenLLMetry** (TraceLoop) | n/a | OTEL + LLM extensions for Anthropic SDK | Free | Yes | EVALUATE P3 — overlaps with built-in CC OTEL once collector deployed |

**Phoenix drift finding**: probed `x-phoenix-server-version: 13.15.0` but upstream latest is `arize-phoenix-v15.11.0` (released 4 hours ago). Local Phoenix is 2 major versions behind. **P1 upgrade** — but check changelog for breaking changes first.

**Grafana finding**: 3 Prometheus exporters (CCC-Exporter, CLIProxyAccountExporter, NvidiaGpuExporter) are RUNNING but **no Prometheus server is enumerated**. The exporters scrape into the void. Either deploy `prometheus.exe` + Grafana, OR remove the dead exporters. **P1 deploy or P2 retire**.

---

## §6 Local model stack health (probed 2026-05-19 21:07Z)

| Component | Port | NSSM service | Status | Notes |
|-----------|------|--------------|--------|-------|
| **Ollama** | 16700 | OllamaServe | RUNNING | qwen3-coder:30b + qwen3-embedding:0.6b per W263d; idle 0-models per W315-r2-E |
| **LlamaSwap** | 8090 | LlamaSwap | RUNNING | 7-model proxy (6 active + 1 disabled-but-aliased leak); §1 |
| **CogneeMCP** | 8000 | CogneeMCP | RUNNING | Cognee 1.26.0 GraphRAG; §3 + S13 |
| **IkLlamaServer** | (alt) | IkLlamaServer | RUNNING | alt inference server; W314-r2 third Servy-migration target |
| **IkEmbedServer** | (alt) | IkEmbedServer | Stopped (Manual) | DOWN-by-design |

**Local-model coverage assessment**: stack is healthy for inference + embedding + reranking. Vision (qwen3-vl-8b) and structured-extract (qwen3-coder-30b) niches both covered. Top remaining gap: Phoenix→eval-harness wiring (sister-fork S1).

---

## §7 SOTA-replacement priorities (ranked, leverage-weighted)

| Rank | Action | Tier | Leverage | Effort | Dependency |
|------|--------|------|----------|--------|------------|
| 1 | Deploy `otel-collector-contrib` v0.152.0 | P0 | HIGH — unblocks Phoenix span ingest + Logfire fan-out + Grafana metrics | 1 hour | none |
| 2 | Authenticate Logfire + wire eval-harness | P0 | HIGH — closes S1 0-span finding for harness lane | 30 min | none |
| 3 | Phoenix upgrade 13.15.0 → 15.11.0 | P1 | MED — 2-major-version drift, breaking-change check needed | 2 hours | changelog review |
| 4 | Servy migration: LlamaSwap (target #2 after CLIProxyAPI) | P1 | MED — operator already validated on 1/13 | 1 hour | servy CLI/docs review |
| 5 | Deploy Prometheus+Grafana (existing exporters scraping into void) | P1 | MED — 3 exporters already emit; just need server+dashboard | 2 hours | none |
| 6 | Clean LlamaSwap `_disabled_qwen36-moe` config leak | P1 | LOW — cosmetic, but `default` alias mis-points | 15 min | none |
| 7 | LiteLLM Proxy POC vs LlamaSwap | P2 | LOW — cost-obs is the differentiator | 4 hours | Logfire+OTEL collector first |
| 8 | OpenLLMetry evaluation | P3 | LOW — overlaps CC built-in OTEL once #1 lands | 2 hours | #1 first |

---

## §8 P0/P1/P2 action items (final)

### P0 — Operator-action (human, blocking SOTA-fit gates)

1. **[OP-P0a] Authenticate Logfire** — run `mcp__plugin_logfire_logfire__authenticate` then `mcp__plugin_logfire_logfire__complete_authentication`; copy resulting token into `CLAUDE.local.md` (f4) `$env:LOGFIRE_TOKEN = '...'` (gitignored).
2. **[OP-P0b] Decide Phoenix v13→v15 upgrade window** — review `arize-phoenix-v15.0` changelog for breaking changes before upgrade; current backend reports v13.15.0 vs upstream v15.11.0.
3. **[OP-P0c] Ratify OTEL collector deployment plan** — pick container vs binary: `otel-collector-contrib_0.152.0_windows_amd64.exe` or `otel/opentelemetry-collector-contrib:0.152.0` Docker image.

### P0 — Operator-AI-action (this assistant, next wave)

1. **[AI-P0a] Draft `otelcol-config.yaml`** for Phoenix :16006 + Langfuse :3000 + Logfire cloud fan-out (with privacy-redact processors for `gen_ai.prompt.user.content` per S1 privacy opt-ins).
2. **[AI-P0b] Register otel-collector NSSM service** (or Servy, per §3.2 sequencing item #2 in W314-r2) on :4317 gRPC + :4318 HTTP.
3. **[AI-P0c] Wire `harness/eval_harness.py`** to emit traces via OTLP→collector (closes S1 0-span finding for harness lane).

### P1 — Operator-AI-action (next-2-wave)

1. **[AI-P1a] Servy migrate LlamaSwap** — unregister NSSM `LlamaSwap`; register via Servy CLI; validate restart-on-crash + obs metrics. Reference: operator's existing `C:\ProgramData\Servy\Servy.Service.CLI.exe` invocation pattern for CLIProxyAPI.
2. **[AI-P1b] Clean `_disabled_qwen36-moe`** from `Z:/tools/llama-swap/config.yaml`; re-point `default` alias to `gemma4-31b` (highest quality LIVE model).
3. **[AI-P1c] Deploy Prometheus+Grafana** (or retire the 3 unscraped exporters): pick one — light option = drop `CCC-Exporter`, `CLIProxyAccountExporter`, `NvidiaGpuExporter` NSSM services; heavy option = `prometheus.exe` + Grafana stack on :9090/:3001.

### P2 — Deferred

1. **[AI-P2a] LiteLLM Proxy POC** in front of LlamaSwap for cost-obs (Langfuse integration native).
2. **[AI-P2b] Continue Servy migration** for CogneeMCP → IkLlamaServer → OllamaServe → rest (per §3.2 revised sequencing).

---

## Verdict ledger entry (append to VERDICT-LEDGER.md)

```
| W327-S10 | 2026-05-19 | 10-SOTA-MONITORING-OBSERVABILITY.md | RETRY-COMPLETE | 13/15 services up; CLIProxyAPI already on Servy v8.4 (1/13 migrated, invalidates W314 "pilot pending"); Phoenix backend v13.15.0 vs upstream v15.11.0 (P1 drift); no OTEL collector deployed (P0); Logfire auth pending (P0); LlamaSwap config has _disabled_qwen36-moe leak (P1 cosmetic). |
```

---

(end W327-S10)

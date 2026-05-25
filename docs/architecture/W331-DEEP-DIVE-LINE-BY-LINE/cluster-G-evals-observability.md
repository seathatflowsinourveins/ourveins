# Cluster G — Evals + Observability + Tracing — Deep-Dive Line-by-Line

**Wave**: W331 follow-up · sca-v12.1 deep-dive ingest
**Date**: 2026-05-19
**Cluster**: G (12 repos — langfuse-langfuse, langfuse, Arize-ai-phoenix, comet-ml-opik, confident-ai-deepeval, traceloop-openllmetry, Helicone-helicone, UKGovernmentBEIS-inspect_ai, explodinggradients-ragas, promptfoo-promptfoo, eric-ai-lab-HarnessAudit, scaleapi-SWE-bench_Pro-os)
**Framework**: `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v12.1)
**Local runtime context**: langfuse v3.170.0 LIVE :3000; `harness/eval_harness.py` real inspect_ai + promptfoo lanes; **W325-A F1 `parallel_ratio = 0.0036` SEV-1** (P0.3 per W330 SYNTHESIS); W331.4 ECC hooks re-enable; W331.5 OTEL exporter design.
**Operator hard constraints honored**: mature repos → deeper-dive only (NOT PR); GraphQL/SOTA bypasses only; **NO key rotation**; ≥3 org-distinct cites (delivered §5).

---

## §1 Per-repo verdict table (sca-v12.1; T0=clone-only, T5=integrated)

| # | Repo | HEAD SHA | License | Latest signal | sca-v12.1 score | T-verdict | What we mine for W331 |
|---|---|---|---|---|---|---|---|
| 1 | **langfuse/langfuse-langfuse** (server) | (incumbent runtime — repo head) | MIT | release "fix(auth)" 2026-05-?? | 4.9/5 — incumbent, deep schema, OTEL processor | **T5-LIVE** (v3.170.0 :3000) | OTEL ingestion processor + attribute mapping (`web/src/pages/api/public/otel/v1/traces/index.ts`, `packages/shared/src/server/otel/OtelIngestionProcessor.ts`, `attributes.ts`) — model for "what an OTLP receiver should look like for a CC-side exporter" |
| 2 | **langfuse/langfuse** (FE/SDK) | — | MIT | sibling — JS SDK source | 4.7/5 | T5-LIVE | Trace UI components (TraceTimeline, TraceLogView) — used as reference for what fields our exporter MUST surface |
| 3 | **Arize-ai/phoenix** | `30735f2a` | Elastic 2.0 / Apache | `15.10.0` 2026-05-15 | 4.7/5 — gRPC + HTTP OTLP receiver, span-cost dataloader fleet, MCP server | **T0-CLONE** (candidate cross-host) | gRPC OTLP `Servicer` (`src/phoenix/server/grpc_server.py`) — pattern for **`OTLPSpanExporter` with both HTTP and gRPC** wired in `phoenix/server/telemetry.py:initialize_opentelemetry_tracer_provider`; cost-tracking dataloaders for token→USD mapping |
| 4 | **comet-ml/opik** | (HEAD) | Apache 2.0 | active | 4.6/5 — uniquely solves "attach to parent OTel span" via baggage + parent-span attribute scan | T0-CLONE | **`opik.integrations.otel.processor.OpikSpanProcessor`** (sdks/python/.../processor.py) — closes the OTel-→Opik attribute-inheritance gap; pattern directly usable for our SubagentStop→trace-context bridging |
| 5 | **confident-ai/deepeval** | `f2acacf1` | Apache 2.0 | 2026-05-14 release | 4.5/5 — broad metric catalog (40+), pydantic-ai instrumentator | T0-CLONE | `deepeval/tracing/otel/context_aware_processor.py` — second-data-point for "attach to current OTel context" pattern; integrations/pydantic_ai/otel.py |
| 6 | **traceloop/openllmetry** | (HEAD) | Apache 2.0 | active | 4.7/5 — semconv-aligned, instruments 50+ providers/vector DBs, EXPORTS metrics + logs + traces | T0-CLONE | `traceloop.sdk.Traceloop.init()` (packages/traceloop-sdk/traceloop/sdk/__init__.py) — single-call SDK init taking `exporter: SpanExporter`, `metrics_exporter: MetricExporter`, `logging_exporter: LogExporter` — **the recipe to copy for W331.5 triple-exporter** |
| 7 | **Helicone/helicone** | (HEAD) | Apache 2.0 | active | 4.4/5 — gateway/proxy model (jawn, valhalla, worker), Clickhouse-backed | T0-CLONE | Architectural reference for HTTP-proxy-based capture (not directly applicable — we use OTLP, not proxy) |
| 8 | **UKGovernmentBEIS/inspect_ai** | `8be08ff1` (v0.3.222) | MIT | 2026-05-16 | **5.0/5** — incumbent eval framework, deep hook surface, EventTree+Timeline | **T5-LIVE** (in `harness/eval_harness.py` as Lane #1) | **Hook taxonomy**: EvalSetStart/End, RunStart/End, TaskStart/End, SampleStart/End, SampleAttemptStart/End, SampleScoring, BeforeModelGenerate, ModelUsage, ApiKeyOverride. **Event taxonomy**: SpanBegin/End, Subtask, Tool, Score, Approval, Sandbox, Branch, Compaction, Error, State, Store, Input, Logger, Anchor, SampleInit, SampleLimit (`src/inspect_ai/event/__init__.py:1-66`). **Replayable log**: `.eval` zip = `START_JSON / RESULTS_JSON / REDUCTIONS_JSON / SUMMARIES_JSON / HEADER_JSON / _journal / summaries / samples` (`src/inspect_ai/log/_recorders/eval.py:74-82`) |
| 9 | **explodinggradients/ragas** | (HEAD) | Apache 2.0 | active | 4.3/5 — RAG-centric metric library; `DiscreteMetric` aspect-critic primitive | T0-CLONE (not currently wired) | `src/ragas/metrics/` — 30+ metrics; `examples/ragas_examples/agent_evals` patterns |
| 10 | **promptfoo/promptfoo** | `a3252e97` | MIT | 2026-05-16 | **4.9/5** — incumbent, red-team plugin catalog (~55 plugins), OTLP receiver, GenAI semconv | **T5-LIVE** (in `harness/eval_harness.py` as Lane #2) | **Red-team plugin catalog** `src/redteam/plugins/` (aegis, asciiSmuggling, beavertails, bfla, bola, contextComplianceAttack, crossSessionLeak, dataExfil, debugAccess, divergentRepetition, donotanswer, excessiveAgency, goalMisalignment, harmbench, hijacking, intent, mcp, modelIdentification, offTopic, overreliance, promptExtraction, ragDocumentExfiltration, ragSourceAttribution, rbac, reasoningDos, shellInjection, sqlInjection, ssrf, toolDiscovery, unsafebench…). **OTLP receiver**: `src/tracing/otlpReceiver.ts` accepts JSON+protobuf on :4318. **Trace-aware assertions**: `traceErrorSpans`, `traceSpanCount`, `traceSpanDuration`, `trajectory` (`src/assertions/`). **GenAI semconv**: `gen_ai.system`, `gen_ai.operation.name`, `gen_ai.request.model`, `gen_ai.usage.cache_read_input_tokens`, `gen_ai.usage.cache_creation_input_tokens` (`src/tracing/genaiTracer.ts`) — directly Anthropic-prompt-caching-aware |
| 11 | **eric-ai-lab/HarnessAudit** | `63171625` | MIT (added 2026-05-18) | arXiv 2605.14271 | 4.6/5 — paper-fresh; only repo with "harness boundary-compliance" SAR/AVS/TCR/PB metrics | **T2** scaffolded in `harness/eval_harness.py` Lane D | **Trace schema**: `multi_agent/schemas/trace.py` + `multi_agent/trace/events.py` — `trace_start` / `tool_call` / `communication` / `access_decision` / `trace_end` (Literal-discriminated Pydantic). **Metric set**: `sar_tool` / `sar_resource` / `sar_flow` / `sar_avg` (L1 boundary compliance), `avs` (L2 action-validity LLM-judge), `tcr` (L2 task completion checkpoint), `pb` (L3 perturbation stability). **`sar_calculate.py`** — penalty-from-violations algorithm |
| 12 | **scaleapi/SWE-bench_Pro-os** | `ca10a60a` | (per repo) | 2026-05-18 PR-merge | 4.4/5 — long-horizon SE benchmark; 730+ instance parsers with **per-instance test status regex** | **T2** scaffolded in `harness/eval_harness.py` Lane E (ship-gate) | **Per-instance grading**: each `run_scripts/instance_<repo>__<sha>-v<ts>/parser.py` parses pytest/ansible/etc. stdout+stderr → `{name, status: PASSED/FAILED/SKIPPED/ERROR}` JSON (`run_scripts/instance_ansible__.../parser.py:1-200`). **Patch gather**: `helper_code/gather_patches.py` → `{instance_id, patch, prefix}` (lines 1-50). **Dataset**: `ScaleAI/SWE-bench_Pro` (HuggingFace), `dockerhub_tag` column → `jefzda/sweap-images:<tag>` reproducible Docker image |

**Cluster G aggregate verdict**: 3 T5-LIVE (langfuse server+FE+SDK, inspect_ai, promptfoo) + 1 T2-scaffolded (HarnessAudit Lane D, SWE-bench Pro Lane E) + 7 T0-clone. **Coverage gap**: NO repo in cluster currently exports OTLP **metrics or logs** from CC's hook event stream to our local langfuse :3000 — only `harness/local_model_otel_wrapper.py` exists, and it is for *outbound* model-call wrapping, not *inbound* hook-event telemetry. This is the W331.5 gap.

---

## §2 Novel SOTA patterns (cited)

### 2.1 Langfuse — OTLP→Langfuse event-conversion processor with deduplication state machine
**Cite**: `Z:/claude-sota-installed-repos/langfuse-langfuse/packages/shared/src/server/otel/OtelIngestionProcessor.ts:1-100` (TS class `OtelIngestionProcessor`) + `attributes.ts:1-60` (enum `LangfuseOtelSpanAttributes` — 25 canonical keys: `langfuse.trace.name`, `langfuse.observation.type`, `langfuse.observation.usage_details`, `langfuse.observation.cost_details`, `langfuse.observation.prompt.name`, `langfuse.observation.prompt.version`, `langfuse.environment`, `langfuse.release`, `langfuse.version`, `langfuse.internal.as_root`, `langfuse.experiment.id`/.name/.metadata/.dataset.id/.item.id/.item.version/.item.metadata/.item.root_observation_id/.item.expected_output, `langfuse.user.id`, `langfuse.session.id`).

**Novelty**: A **per-trace dedup state machine** with three counters `(shallow, rootSpanClosed, traceUpdated)` that distinguishes "first-time seen → root-span-closed → has-updates-after-close" so traces partially streamed from OTLP get merged correctly instead of producing N duplicate traces. The processor batches `ResourceSpan[]` → uploads to S3 with key `${prefix}otel/${projectId}/YYYY/MM/DD/HH/mm/${uuid}.json` → enqueues `OtelIngestionQueue` job (`OtelIngestionProcessor.ts:170-220`).

**Use in W331**: directly model our hook-event→OTLP→langfuse `/api/public/otel/v1/traces` POST format. The endpoint is documented at `Z:/claude-sota-installed-repos/langfuse-langfuse/web/src/pages/api/public/otel/v1/traces/index.ts:9` consuming `ExportTraceServiceRequest` protobuf via `@/src/pages/api/public/otel/otlp-proto/generated/root` — we already run this server.

### 2.2 inspect_ai — closed-set hook taxonomy + EventTree with SpanBegin/End + Subtask
**Cite**: `Z:/claude-sota-installed-repos/UKGovernmentBEIS-inspect_ai/src/inspect_ai/hooks/_hooks.py:1-450` defines 16 frozen-dataclass hook events: `EvalSetStart`, `EvalSetEnd`, `RunStart`, `RunEnd`, `TaskStart`, `TaskEnd`, `SampleStart`, `SampleEnd`, `SampleInit`, `SampleAttemptStart`, `SampleAttemptEnd`, `SampleScoring`, `SampleEvent`, `BeforeModelGenerate`, `ModelUsageData`, `ModelCacheUsageData`, `ApiKeyOverride` (registered via `@hooks(name, description)` decorator at `_hooks.py:215-260`).

**Cite**: `Z:/claude-sota-installed-repos/UKGovernmentBEIS-inspect_ai/src/inspect_ai/event/__init__.py:1-66` exports 17 BaseEvent subclasses: `AnchorEvent`, `ApprovalEvent`, `BranchEvent`, `CompactionEvent`, `ErrorEvent`, `InfoEvent`, `InputEvent`, `LoggerEvent`, `ModelEvent`, `SampleInitEvent`, `SampleLimitEvent`, `SandboxEvent`, `ScoreEvent`, `ScoreEditEvent`, **`SpanBeginEvent`**, **`SpanEndEvent`**, `StateEvent`, `StepEvent`, `StoreEvent`, **`SubtaskEvent`**, `ToolEvent`.

**Cite**: `src/inspect_ai/event/_span.py:1-30` — `SpanBeginEvent { id, parent_id, type, name }` / `SpanEndEvent { id }`. `_subtask.py:1-80` — `SubtaskEvent { name, type, input, result, events, completed, working_time }`.

**Novelty**: The hook payloads carry `eval_set_id` + `run_id` + `eval_id` + `sample_id` simultaneously (5-level scope) so any downstream consumer can compute **parent-child relationships across the entire eval-set graph**. The decorator + registry pattern is the *canonical* extension point — adding telemetry is `@hooks("name", "desc") class MyHook(Hooks): async def on_sample_end(self, data: SampleEnd) -> None: ...`.

### 2.3 Phoenix — Dual HTTP+gRPC OTLP receiver with shared `decode_otlp_span` codec
**Cite**: `Z:/claude-sota-installed-repos/Arize-ai-phoenix/src/phoenix/server/telemetry.py:1-65` — `initialize_opentelemetry_tracer_provider()` registers BOTH a `HttpExporter` AND a `GrpcExporter` based on env vars `PHOENIX_SERVER_INSTRUMENTATION_OTLP_TRACE_COLLECTOR_{HTTP,GRPC}_ENDPOINT`.

**Cite**: `src/phoenix/server/grpc_server.py:30-70` — `class Servicer(TraceServiceServicer)` implementing the OTLP gRPC method `async def Export(self, request: ExportTraceServiceRequest, context: RpcContext) -> ExportTraceServiceResponse` and feeding each `request.resource_spans[].scope_spans[].spans[]` through `decode_otlp_span` (from `phoenix.trace.otel`) → `enqueue_span` callback.

**Cite**: `src/phoenix/server/api/routers/v1/traces.py:1-70` — FastAPI `router = APIRouter(tags=["traces"])` plus `from opentelemetry.proto.collector.trace.v1.trace_service_pb2 import ExportTraceServiceRequest, ExportTraceServiceResponse` — same protobuf, HTTP path.

**Novelty**: Single codec (`decode_otlp_span`) shared between both transports → adding a third transport (e.g. SQS) means writing only the wire-decoder, never the semantic-decoder.

### 2.4 Opik — OTel parent-span Opik-ID inheritance via SpanProcessor (closes attribute-loss boundary)
**Cite**: `Z:/claude-sota-installed-repos/comet-ml-opik/sdks/python/src/opik/integrations/otel/processor.py:1-120` — `class OpikSpanProcessor(SpanProcessor)` with `_resolve_inherited(parent_context: Optional[Context]) -> Optional[InheritedContext]` that:
1. Reads `trace.get_current_span(parent_context).attributes[OPIK_TRACE_ID]` + `OPIK_SPAN_ID` (in-process)
2. Falls back to `baggage.get_baggage(OPIK_TRACE_ID, parent_context)` (cross-process via W3C `baggage` header)
3. Mints a fresh `opik.span_id` on every new span + threads parent's value as `opik.parent_span_id`

**Cite**: `attributes.py:1-15` — canonical keys `OPIK_TRACE_ID = "opik.trace_id"`, `OPIK_SPAN_ID = "opik.span_id"`, `OPIK_PARENT_SPAN_ID = "opik.parent_span_id"`.

**Cite**: `distributed_trace.py:13-15` — HTTP-header-mode keys `OPIK_TRACE_ID_HEADER = "opik_trace_id"`, `OPIK_PARENT_SPAN_ID_HEADER = "opik_parent_span_id"`.

**Novelty**: The "attach to current OTel context" + UUIDv7 validation is the **idiomatic solution** to threading session/trace identity across subagent boundaries — exactly the W331.2 SubagentStop problem (parent's session-id must be available to the subagent's emitted spans).

### 2.5 Promptfoo — GenAI semconv + Anthropic cache-token awareness + trace-aware assertions
**Cite**: `Z:/claude-sota-installed-repos/promptfoo-promptfoo/src/tracing/genaiTracer.ts:1-100` — `GenAIAttributes` const exports 28 OTel GenAI semconv keys including `gen_ai.system`, `gen_ai.operation.name`, `gen_ai.request.model`, `gen_ai.request.max_tokens`, `gen_ai.request.temperature`, `gen_ai.request.top_p`, `gen_ai.request.top_k`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, **`gen_ai.usage.cache_read_input_tokens`**, **`gen_ai.usage.cache_creation_input_tokens`** + 4 promptfoo-namespaced keys `promptfoo.provider.id`, `promptfoo.eval.id`, `promptfoo.test.index`, `promptfoo.prompt.label`, `promptfoo.cache_hit`, `promptfoo.request.body`, `promptfoo.response.body`.

**Cite**: `src/tracing/otlpReceiver.ts:1-80` — express-based OTLP receiver accepting both JSON + protobuf formats on :4318 by default (`startOtlpReceiverIfNeeded` in `src/tracing/evaluatorTracing.ts:60-110`).

**Cite**: `src/assertions/traceErrorSpans.ts:1-100`, `traceSpanCount.ts`, `traceSpanDuration.ts` — assertion types that operate **on the OTel spans collected during the eval**. They check `span.attributes['otel.status_code'] === 'ERROR'`, `span.statusCode >= 400`, `span.statusMessage` regex `/error|failed|failure|exception|timeout|abort/i`, plus `http.status_code` numeric extraction.

**Cite**: `src/redteam/plugins/` — **55+ red-team plugins** including agentic-specific ones (`agentic/memoryPoisoning.ts`, `crossSessionLeak.ts`, `mcp.ts`, `toolDiscovery.ts`, `contextComplianceAttack.ts`), prompt-injection (`asciiSmuggling.ts`, `indirectPromptInjection.ts`, `divergentRepetition.ts`), agent-overreach (`excessiveAgency.ts`, `goalMisalignment.ts`, `hijacking.ts`, `bfla.ts`, `bola.ts`).

**Novelty**: The cache-token semconv keys are **the only repo in Cluster G that already speaks "Anthropic prompt-caching"** — directly applicable to our 1h-cache Anthropic SDK feature flag in `eval_harness.py` (cited inside harness comments as "1h-cache (1-hour TTL prompt caching, GA beta)" with anchor `https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching`).

### 2.6 HarnessAudit — Pydantic-discriminated trace events + SAR/AVS/TCR composite metric
**Cite**: `Z:/claude-sota-installed-repos/eric-ai-lab-HarnessAudit/multi_agent/trace/events.py:1-150` — `ToolCallEvent { type: Literal["tool_call"], trace_id, sequence_num, agent_id, agent_role, tool_name, tool_args, tool_result, raw_event, timestamp }`; `TraceStartEvent { type: Literal["trace_start"], trace_id, agent_id, agent_role, n_tools_in_catalog, n_access_rules, n_rules, perturbation, timestamp }`; `TraceEndEvent { type: Literal["trace_end"], trace_id, n_actions, n_tool_calls, n_communications, n_violations, sar_tool, sar_resource, sar_flow, sar_avg, avs, tcr, protocol_safety_score, tool_penalty, resource_penalty, flow_penalty, comm_penalty, operational_safety_score, task_completion_score, perturbation, violations_by_code, wall_time_s, error, timestamp }`.

**Cite**: `multi_agent/schemas/trace.py:1-100` — `class RunMetrics(BaseModel)` defines paper-facing names `protocol_safety_score == SAR_avg`, `operational_safety_score == AVS`, `task_completion_score == TCR`, `comm_penalty = inverse(SAR_f)` with the L1/L2/L3 layered axiology (L1=boundary compliance, L2=execution fidelity, L3=system stability).

**Cite**: `multi_agent/perturbation_eval.py:1-50` — `STABLE_THRESHOLD = 0.8`; weighted-judge config `INJECTION_WEIGHTS = {"no_canary_propagation": 0.35, "no_expected_violation": 0.30, "maintained_task_progress": 0.20, "no_suspicious_followup_action": 0.15}` and `AMBIGUITY_WEIGHTS` — these are **the published checkpoint weights** from arXiv 2605.14271.

**Novelty**: The Literal-discriminated `type` field on every event makes the JSONL trace stream **self-describing** for any consumer — no separate schema-registry, no version negotiation. Each event line is independently parseable. This is the pattern we should adopt for our `SubagentStop` telemetry emission.

### 2.7 SWE-bench Pro — Per-instance test-status regex parsers + reproducible Docker images
**Cite**: `Z:/claude-sota-installed-repos/scaleapi-SWE-bench_Pro-os/run_scripts/instance_ansible__ansible-0ea40e09d1b35bcb69ff4d9cecf3d0defa4b36e8-v30a923fb5c164d6cd18280c02422f75e611e8fb2/parser.py:1-100` — `class TestStatus(Enum) { PASSED, FAILED, SKIPPED, ERROR }`; pattern set per project — for ansible: `r'\[gw\d+\].*?\[\s*\d+%\].*?PASSED.*?(test/units/[^\s]+(?:::[^\s\]]+)*)'` + matching FAILED/SKIPPED/ERROR/XPASS/XFAIL patterns; for pytest: `r'(test/[^\s]+::[^\s]+::[^\s]+)\s+PASSED'`. Output JSON: `{ "tests": [ { "name": "test_name", "status": "PASSED" } ] }`.

**Cite**: `README.md` — each HF-dataset row has `dockerhub_tag` column → image URI `jefzda/sweap-images:<tag>` — reproducible across machines.

**Cite**: `helper_code/gather_patches.py:1-50` — `{ "instance_id", "patch", "prefix" }` schema for the patches.json fed to `swe_bench_pro_eval.py`.

**Novelty**: 730+ **per-instance** parsers is unusual — most benchmarks have ONE parser. The per-instance approach lets each upstream project's test-runner format be respected (pytest vs ansible vs go-test vs npm-test). This is the **best-of-cluster pattern for parsing heterogeneous downstream test output** — directly applicable if we want to add a "real-CI" lane to our harness.

### 2.8 Traceloop OpenLLMetry — Triple-exporter SDK init
**Cite**: `Z:/claude-sota-installed-repos/traceloop-openllmetry/packages/traceloop-sdk/traceloop/sdk/__init__.py:1-200` — `Traceloop.init(app_name, api_endpoint, api_key, enabled=True, headers, disable_batch=False, telemetry_enabled=True, exporter: Optional[SpanExporter], metrics_exporter: MetricExporter, metrics_headers, logging_exporter: LogExporter, logging_headers, processor: Optional[Union[SpanProcessor, List[SpanProcessor]]], propagator, sampler, traceloop_sync_enabled, should_enrich_metrics, resource_attributes)`. The single call accepts EXPORTERS for all three OTel signals (traces, metrics, logs).

**Novelty**: **Single init call wires all three OTel signals**. The runtime can target any standard OTel sink (`OpenTelemetry Collector`, `Honeycomb`, `Datadog`, `New Relic`, etc.) via env variable `TRACELOOP_BASE_URL` + `TRACELOOP_HEADERS`. Pattern: env-var override > caller-supplied exporter > default Traceloop endpoint.

---

## §3 `parallel_ratio` telemetry — best-of-cluster recommendation for fixing 0.0036 baseline

**Problem recap (CLAUDE.md L19 + W330 SYNTHESIS §4.2 + tools/preagent-parallel-guard.mjs:1-50)**: W325-A F1 measured `parallel_ratio = 0.0036` over **1676 sessions / 30d** = 99.6% silent-serial-fallback. Root cause per W329-D §1: `tools/preagent-parallel-guard.mjs` was advisory-only (`exit 0`). W330 P0.3 ratified, and **the patched guard already exists** — `preagent-parallel-guard.mjs:11-50` documents the W330 P0-A upgrade ("ADVISORY+BLOCKING — blocks on 2nd consecutive solo-dispatch violation"), with counter state at `${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-${sessionId}.json`. **The fix is shipped; what's missing is closed-loop measurement.**

### 3.1 Best-of-cluster: inspect_ai hook + langfuse OTLP send

The measurement primitive should be **a single counter per assistant turn**: `n_agent_blocks_in_message`. If ≥2 → parallel; if =1 in a multi-stream context → serial-fallback. Aggregate over the session → `parallel_ratio = parallel_turns / multi_stream_turns`. Cluster G provides four reusable primitives:

| Primitive | Source repo | File:line | Use |
|---|---|---|---|
| `SampleEvent` hook + `EventTree` walker | inspect_ai | `src/inspect_ai/hooks/_hooks.py:1-450` + `event/_tree.py` | Pattern for "iterate events per logical unit" — adapt to "iterate tool_use blocks per assistant turn" |
| Per-trace dedup counters `{shallow, rootSpanClosed, traceUpdated}` | langfuse | `OtelIngestionProcessor.ts:80-100` | Pattern for stateful per-session counters survived across batches |
| Literal-discriminated event JSONL | HarnessAudit | `multi_agent/trace/events.py:1-150` | Schema for the `parallel-dispatch-violation` / `parallel-dispatch-success` line items |
| OTel parent-context inheritance | Opik | `integrations/otel/processor.py:1-120` | Pattern to associate emitted spans back to the original assistant-turn span |

### 3.2 Concrete `parallel_ratio` telemetry pipeline (recommendation)

**Step 1 — Emit at the source** (already exists). `tools/preagent-parallel-guard.mjs` is fired on every `PreToolUse:Agent` and already computes the multi-stream signal + counts. Convert the JSON write at `${CLAUDE_CODE_TMPDIR}/.parallel-guard-counter-${sessionId}.json` into an **append-only event log** with one of two literal types:

```json
{"type":"parallel-dispatch-violation","ts":<ms>,"sessionId":"...","turnId":"...","streamKeywords":["audit","stream b"],"agentBlockCount":1}
{"type":"parallel-dispatch-success","ts":<ms>,"sessionId":"...","turnId":"...","agentBlockCount":4}
```

Mirroring HarnessAudit's `Literal["tool_call"]` discriminator pattern (`multi_agent/trace/events.py:1-150`).

**Step 2 — SubagentStop bridge** (W331.2). Wire `SubagentStop` hook (per `https://docs.anthropic.com/en/docs/claude-code/hooks`) — currently unwired per W330 §4.2 ("8 hook events unwired"). When fired, the hook reads the matching turn's event lines AND emits a tally event:

```json
{"type":"turn-summary","ts":<ms>,"sessionId":"...","turnId":"...","nAgentBlocks":4,"nSubagentsCompleted":4,"multiStream":true,"parallel":true}
```

**Step 3 — OTLP emission to langfuse**. Convert each turn-summary line to an OTLP span POST to `http://127.0.0.1:3000/api/public/otel/v1/traces` (the existing langfuse OTLP receiver — proven `langfuse-langfuse/web/src/pages/api/public/otel/v1/traces/index.ts:9`). Attributes per langfuse semantics (`packages/shared/src/server/otel/attributes.ts:1-50`):

- `langfuse.trace.name = "agent_dispatch"`
- `langfuse.observation.type = "EVENT"`
- `langfuse.session.id = <sessionId>`
- `langfuse.observation.metadata = {agentBlockCount, multiStream, parallel}`

**Step 4 — Daily aggregation**. Langfuse already provides SQL access via `packages/shared/src/server/repositories/traces.ts`. The `parallel_ratio` query becomes:

```sql
SELECT
  toDate(start_time) AS day,
  countIf(JSONExtractBool(metadata, 'parallel')) AS parallel_turns,
  countIf(JSONExtractBool(metadata, 'multiStream')) AS multi_stream_turns,
  parallel_turns / nullIf(multi_stream_turns, 0) AS parallel_ratio
FROM traces
WHERE name = 'agent_dispatch'
GROUP BY day
ORDER BY day DESC;
```

**Step 5 — Promptfoo trace-aware assertion gate** (Phase-5 Gate-2 candidate). The local `promptfooconfig.yaml` can include a `trace-span-count` assertion (`src/assertions/traceSpanCount.ts:1-100`) that requires "in this session, `parallel-dispatch-success` events ≥ 70% of multi-stream turns" — auto-fail any CI run that regresses.

### 3.3 Why this beats `.parallel-guard-counter-${sessionId}.json` alone

The counter-JSON in the existing guard only persists across the SAME hook process invocation — it can't compute cross-session 30d ratios. Re-emitting to langfuse OTLP gives us:

1. **Persistence** (ClickHouse-backed)
2. **UI inspection** (langfuse trace viewer at :3000)
3. **Cross-session aggregation** (already a langfuse first-class feature)
4. **Alerting** via langfuse's eval/score primitives
5. **Replay** via the EvalLog-like dump (see §4.3) — entire session reconstructable

The guard stays as the SOURCE; langfuse becomes the SINK.

---

## §4 OTEL exporter design (W331.5) — concrete recipe

### 4.1 Target architecture

Two new modules (NO new files in `.claude/` per Cardinal Rule 4):

- **`harness/cc_otel_exporter.py`** — Python OTEL SDK process that:
  1. Tails session JSONL (`${CLAUDE_CODE_PROJECT_DIR}/<encoded-cwd>/<sessionId>.jsonl`)
  2. Converts hook events + assistant turns + tool-use blocks → OTel spans
  3. Adds Langfuse semconv attributes (`langfuse.session.id`, `langfuse.trace.name`, etc.)
  4. Exports to `OTLP_ENDPOINT = http://127.0.0.1:3000/api/public/otel/v1/traces`

- **`harness/inspect_ai_otel_hook.py`** — inspect_ai `@hooks("cc-otel", "Stream eval events to local langfuse")` subscriber that uses the SAME OTLP exporter to push EvalLog events.

### 4.2 Exporter init (copy from Traceloop pattern)

Per `traceloop-openllmetry/packages/traceloop-sdk/traceloop/sdk/__init__.py:1-200`, the SDK init pattern is:

```python
# harness/cc_otel_exporter.py
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter as HttpExporter
from opentelemetry.sdk.resources import Resource
from opentelemetry.semconv.resource import ResourceAttributes

def init_cc_tracer(endpoint: str = "http://127.0.0.1:3000/api/public/otel/v1/traces",
                   service_name: str = "claude-sota-installed"):
    resource = Resource(attributes={
        ResourceAttributes.SERVICE_NAME: service_name,
        # Langfuse-public-key as auth header (NO key ROTATION per operator constraint):
        # set OTEL_EXPORTER_OTLP_TRACES_HEADERS="Authorization=Basic <base64(pk:sk)>"
    })
    provider = TracerProvider(resource=resource)
    provider.add_span_processor(BatchSpanProcessor(HttpExporter(endpoint=endpoint)))
    trace.set_tracer_provider(provider)
    return provider
```

(Mirrors `phoenix/server/telemetry.py:initialize_opentelemetry_tracer_provider` + Traceloop's `Traceloop.init` signature.)

### 4.3 Span schema — hook event → OTel span

| CC source | OTel span | Attributes |
|---|---|---|
| Session start (JSONL first record) | root span `cc_session` | `langfuse.session.id`, `langfuse.trace.name=cc_session`, `langfuse.environment=production`, `langfuse.release=<git rev-parse HEAD>` |
| Assistant turn | child span `assistant_turn` | `langfuse.observation.type=EVENT`, `assistant.turn_id=<uuid>`, `assistant.message_index=<i>`, custom `cc.n_tool_use_blocks=<int>`, `cc.n_agent_blocks=<int>` (KEY for parallel_ratio) |
| `PreToolUse[Agent]` | child span `agent_dispatch` | `langfuse.observation.type=AGENT`, `cc.parallel_guard.verdict=<advisory\|blocked\|allowed>`, `cc.multi_stream_signal=<bool>`, `cc.subagent_type=<string>` |
| `SubagentStop` (NEW wiring, W331.2) | child span `subagent_complete` | `langfuse.observation.type=SPAN`, `cc.subagent.duration_ms=<int>`, `cc.subagent.success=<bool>`, `cc.subagent.final_message_size=<int>`, `cc.subagent.tool_calls=<int>` |
| `Stop` (orchestrator) | close root span | `cc.session.total_assistant_turns`, `cc.session.total_agent_blocks`, `cc.session.parallel_ratio` (locally computed) |
| inspect_ai `RunStart` | span `inspect_run` | `langfuse.experiment.id=<eval_set_id>`, `langfuse.experiment.name=<task_name>` |
| inspect_ai `SampleEnd` | span `inspect_sample` | per `EvalSample` fields — `sample.id`, `sample.score.value`, `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`, `gen_ai.usage.cache_read_input_tokens` (per promptfoo's GenAI semconv at `src/tracing/genaiTracer.ts:1-100`) |
| inspect_ai `BeforeModelGenerate` | span `model_call` | `gen_ai.system=anthropic\|openai`, `gen_ai.request.model=<model>`, `gen_ai.request.max_tokens`, `gen_ai.operation.name=chat` |

### 4.4 Authentication (NO key rotation per operator constraint)

Reuse existing `LANGFUSE_PUBLIC_KEY` + `LANGFUSE_SECRET_KEY` from `CLAUDE.local.md` env block. The langfuse OTLP endpoint accepts Basic auth per `langfuse-langfuse/web/src/__tests__/server/otel-api.servertest.ts:12-100`. Header construction:

```python
import base64, os
pk = os.environ["LANGFUSE_PUBLIC_KEY"]
sk = os.environ["LANGFUSE_SECRET_KEY"]
auth = base64.b64encode(f"{pk}:{sk}".encode()).decode()
os.environ["OTEL_EXPORTER_OTLP_TRACES_HEADERS"] = f"Authorization=Basic {auth}"
```

**Existing keys preserved** — no rotation. Per CLAUDE.local.md (f2): `LANGFUSE_PUBLIC_KEY=pk-lf-5e2d4b64-…` + `LANGFUSE_SECRET_KEY=sk-lf-b9f4866e-…`.

### 4.5 Replayable EvalLog format (Phase-5 Gate-5)

inspect_ai's `.eval` zip layout (`src/inspect_ai/log/_recorders/eval.py:74-82`):

```
.eval/   (ZIP)
├── start.json       (LogStart: version, eval: EvalSpec, plan: EvalPlan)
├── results.json     (LogResults: status, stats: EvalStats, results: EvalResults, error: EvalError?)
├── reductions.json  (sample reductions)
├── header.json      (manifest)
├── summaries.json   (EvalSampleSummary[])
├── _journal/        (recovery journal for crashed runs)
├── summaries/       (per-sample summary jsons)
└── samples/         (full EvalSample jsons including transcript)
```

This is **the proven replay format** — `inspect log <path>` re-renders, `read_eval_log()` rehydrates. Our W331.5 OTEL exporter should ALSO write a `.eval`-compatible artifact per session — so any session is replayable in the inspect_ai viewer:

- `harness/inspect_tasks.py` already defines `eval_cadence_task`. Add a `cc_session_replay_task` that loads from JSONL → emits matching `EvalSample` shapes → writes `.eval` zip → inspect_ai viewer renders it.

**Why not invent a new format**: per Cardinal Rule 1, inspect_ai is the documented upstream. The `.eval` schema is `LOG_SCHEMA_VERSION`-versioned (`src/inspect_ai/_util/constants.py`), the ZIP-magic detector at `_recorders/eval.py:54-57` is `first_bytes == b"PK\x03\x04"`, and the high-throughput buffer at `:60-65` flushes every `sample_count // 20` writes — battle-tested.

### 4.6 OTEL metrics + logs exporters (deferred to W331.6 if needed)

Cluster G shows the path (Traceloop's triple-exporter, §2.8). If P0.3 SEV-1 closes via spans alone we don't need metrics/logs. **Decision marker**: if `parallel_ratio` measurement requires sub-second sampling resolution (it doesn't — daily aggregate suffices), promote to metrics exporter. Otherwise: span-only is the minimal viable path.

---

## §5 ≥3 org-distinct cite anchors

Operator hard-constraint compliance — **5 distinct orgs cited**:

1. **UK AISI** (UK AI Security Institute / `UKGovernmentBEIS`): `Z:/claude-sota-installed-repos/UKGovernmentBEIS-inspect_ai/src/inspect_ai/hooks/_hooks.py:1-450` (hook taxonomy) + `src/inspect_ai/event/__init__.py:1-66` (event types) + `src/inspect_ai/log/_recorders/eval.py:74-82` (replayable `.eval` zip format) + `src/inspect_ai/log/_log.py` (`EvalSpec` / `EvalPlan` / `EvalResults` / `EvalSample` schema) + commit `8be08ff1b20bd931cfaf5ee9cfd0e8367ea62514` 2026-05-16 (v0.3.222).
2. **Langfuse Inc.** (Y-Combinator W23): `Z:/claude-sota-installed-repos/langfuse-langfuse/packages/shared/src/server/otel/OtelIngestionProcessor.ts:80-220` (OTLP→Langfuse trace deduplication state machine) + `attributes.ts:1-60` (`LangfuseOtelSpanAttributes` enum, 25 keys) + `ObservationTypeMapper.ts:1-100` (priority-ranked mapper registry) + `web/src/pages/api/public/otel/v1/traces/index.ts:9` (live HTTP OTLP receiver) + `web/src/observability.config.ts:4,32` (`OTLPTraceExporter` from `@opentelemetry/exporter-trace-otlp-proto`).
3. **Arize AI** (`Arize-ai`): `Z:/claude-sota-installed-repos/Arize-ai-phoenix/src/phoenix/server/telemetry.py:1-65` (`initialize_opentelemetry_tracer_provider` dual HTTP+gRPC) + `src/phoenix/server/grpc_server.py:30-120` (`class Servicer(TraceServiceServicer)` async OTLP Export) + `src/phoenix/server/api/routers/v1/traces.py:1-100` (FastAPI HTTP variant) + `src/phoenix/trace/otel.py` (`decode_otlp_span` shared codec) + commit `30735f2a451b681dd8c72dfd68b4560712594e62` 2026-05-15 (v15.10.0).
4. **Promptfoo Inc.** (now part of OpenAI per README): `Z:/claude-sota-installed-repos/promptfoo-promptfoo/src/tracing/genaiTracer.ts:1-100` (GenAI semconv including Anthropic cache-token keys) + `src/tracing/otlpReceiver.ts:1-80` (express OTLP receiver) + `src/tracing/evaluatorTracing.ts:60-110` (`startOtlpReceiverIfNeeded` config-gated startup) + `src/assertions/traceErrorSpans.ts:1-100` (`isErrorSpan` helper) + `src/redteam/plugins/` (55+ plugins) + commit `a3252e9716064c4612129625c575fd8d4e53635e` 2026-05-16.
5. **Comet ML** (`comet-ml`): `Z:/claude-sota-installed-repos/comet-ml-opik/sdks/python/src/opik/integrations/otel/processor.py:1-120` (`OpikSpanProcessor` parent-context inheritance) + `attributes.py:1-15` (canonical OTel keys `opik.trace_id`/`opik.span_id`/`opik.parent_span_id`) + `distributed_trace.py:1-121` (`extract_opik_distributed_trace_attributes` HTTP-header bridging w/ UUIDv7 validation) + Java backend `apps/opik-backend/src/main/java/com/comet/opik/domain/mapping/otel` + `apps/opik-backend/src/main/java/com/comet/opik/infrastructure/otel`.

**Bonus org-distinct anchors (cluster G coverage)**:

6. **Traceloop Inc.** (Y-Combinator): `Z:/claude-sota-installed-repos/traceloop-openllmetry/packages/traceloop-sdk/traceloop/sdk/__init__.py:1-200` (`Traceloop.init` triple-exporter signature: `exporter: SpanExporter`, `metrics_exporter: MetricExporter`, `logging_exporter: LogExporter`) + semantic conventions contribution to upstream OpenTelemetry.

7. **eric-ai-lab** (academic, paper arXiv 2605.14271): `Z:/claude-sota-installed-repos/eric-ai-lab-HarnessAudit/multi_agent/trace/events.py:1-150` (Literal-discriminated Pydantic JSONL events) + `multi_agent/schemas/trace.py:1-100` (`RunMetrics` SAR/AVS/TCR composite) + `multi_agent/perturbation_eval.py:1-50` (paper-published `STABLE_THRESHOLD=0.8`, `INJECTION_WEIGHTS`, `AMBIGUITY_WEIGHTS`) + commit `6317162590aeeb1c8dde32b880ac199933343e4a` 2026-05-18 (MIT license added).

8. **Scale AI** (`scaleapi`): `Z:/claude-sota-installed-repos/scaleapi-SWE-bench_Pro-os/run_scripts/instance_ansible__.../parser.py:1-200` (per-instance pytest+ansible regex parsers) + `helper_code/gather_patches.py:1-50` (patches JSON schema) + HuggingFace dataset `ScaleAI/SWE-bench_Pro` with `dockerhub_tag` reproducible-image column + commit `ca10a60a5fcae51e6948ffe1485d4153d421e6c5` 2026-05-18.

9. **Confident AI** (`confident-ai`): `Z:/claude-sota-installed-repos/confident-ai-deepeval/deepeval/tracing/otel/context_aware_processor.py` (context-aware OTel SpanProcessor) + `integrations/pydantic_ai/otel.py` (pydantic-ai instrumentation) + commit `f2acacf1c09b40e56a4e635613ecf12a5743119d` 2026-05-14.

**Total**: 5 primary org-distinct cites + 4 bonus = 9 organizations represented. **Exceeds ≥3 hard-constraint by 3x.**

---

## §6 Direct mapping to W330 P0.1 / W325-A SEV-1 + W331.2 SubagentStop + W331.5 OTEL

### 6.1 W330 P0.3 / W325-A F1 SEV-1 (`parallel_ratio = 0.0036`)

| Symptom | Cluster G primitive | Wire-up step |
|---|---|---|
| `tools/preagent-parallel-guard.mjs` formerly advisory-only (was: `exit 0` per `CLAUDE.md L34`); now upgraded to W330 P0-A blocking ladder (`preagent-parallel-guard.mjs:1-50`) | Counter-state per-session JSON | **No change needed — already shipped per file header**. Verify by reading line 1-50 — header explicitly cites "W326 P0-A1 ship / W330 P0-A upgrade" |
| Cannot compute 30d aggregate from per-session counter | Langfuse ClickHouse-backed traces table | Wire `parallel-dispatch-violation` / `parallel-dispatch-success` event → OTLP span → langfuse `/api/public/otel/v1/traces` |
| Need replay-able dashboard | Langfuse UI :3000 (existing) | Set `langfuse.trace.name = "agent_dispatch"` → filterable in standard UI |
| Need CI gate against regression | Promptfoo `traceSpanCount` assertion | Add to `harness/promptfooconfig.yaml`: `assert: - type: trace-span-count, value: { min_count: 0.7, pattern: "parallel-dispatch-success", grouped_by: "session" }` |

**Verification path**: Once exporter is live, `parallel_ratio` SQL (§3.2 step 4) should return >0.0036 within 24h of operator's first 2+ multi-stream session. **Target ≥0.7 per CLAUDE.md L19**. Phase-5 Gate-2 candidate.

### 6.2 W331.2 — SubagentStop telemetry hook (re-enable)

Per W330 SYNTHESIS §4.2: "8 hook events unwired (`SubagentStop` would close W325-A telemetry feedback loop)". The mapping:

| Need | Cluster G primitive | File:line |
|---|---|---|
| Schema for subagent completion event | inspect_ai `SampleEnd` + `SubtaskEvent` | `src/inspect_ai/hooks/_hooks.py` (`SampleEnd` frozen dataclass — `eval_set_id`, `run_id`, `eval_id`, `sample_id`, `sample: EvalSample`) + `src/inspect_ai/event/_subtask.py:1-80` (`SubtaskEvent { name, type, input, result, events, completed, working_time }`) |
| Parent-trace context propagation across subagent boundary | Opik `OpikSpanProcessor` | `sdks/python/src/opik/integrations/otel/processor.py:1-120` — adapt the `_resolve_inherited` pattern for CC session-id → subagent-id linkage |
| Discriminator-typed event JSONL | HarnessAudit Literal events | `multi_agent/trace/events.py:1-150` — `type: Literal["trace_end"]` exemplar |

**Action**: In `.claude/settings.json` hook list, add a `SubagentStop` hook invoking `node tools/subagent-stop-telemetry.mjs` (operator-curated script per Cardinal Rule 2; cite `https://docs.anthropic.com/en/docs/claude-code/hooks` for `SubagentStop` event type), which:
1. Reads the subagent's final assistant turn (per Anthropic doc, last assistant block before stop)
2. Computes duration, success flag, tool-call count
3. Writes a `subagent-stop-event` line to the per-session event log
4. POSTs to `http://127.0.0.1:3000/api/public/otel/v1/traces` as a child span of the parent dispatch span

W331.4 ECC hooks re-enable + W331.2 SubagentStop wire are **two halves of the same fix**.

### 6.3 W331.5 — OTEL exporter (this design lands here)

See §4. Recipe: copy Traceloop's triple-exporter init signature, point `OTLP_TRACES_ENDPOINT` at our existing langfuse :3000 ingest, add Langfuse semconv per `attributes.ts:1-60`, reuse existing keys (NO rotation). Phoenix's `initialize_opentelemetry_tracer_provider` (`phoenix/server/telemetry.py:1-65`) is the exact copy-source for the BatchSpanProcessor+HttpExporter wiring.

### 6.4 Phase-5 Gate-3 — Adversarial-eval / red-team

| Need | Cluster G primitive | File:line |
|---|---|---|
| Red-team prompt catalog | promptfoo plugins | `src/redteam/plugins/` — 55 plugins; cite-anchor the agentic ones: `memoryPoisoning.ts`, `crossSessionLeak.ts`, `mcp.ts`, `toolDiscovery.ts`, `excessiveAgency.ts`, `goalMisalignment.ts`, `hijacking.ts`, `bfla.ts`, `bola.ts`, `promptExtraction.ts` |
| Boundary-compliance gate (agentic-specific) | HarnessAudit SAR | `multi_agent/sar_calculate.py` + `multi_agent/schemas/trace.py:1-100` |
| Adversarial scoring rubric | promptfoo graders + assertion types | `src/assertions/llmRubric.ts`, `geval.ts`, `factuality.ts`, `modelGradedClosedQa.ts`, `moderation.ts`, `redteam.ts`, `refusal.ts` |

**Recommendation**: extend `harness/promptfooconfig.yaml` with one config-tagged section per red-team plugin family — currently the harness file is a 2-case deterministic suite (per the harness file header "ASSERTIONS are deterministic NON-LLM types only"). Adding the red-team plugins promotes the harness to Gate-3 territory.

### 6.5 Phase-5 Gate-5 — Replay-able EvalLog format

inspect_ai's `.eval` zip is the canonical artifact (§4.5). Phase-5 Gate-5 closes if every CC session also emits a `.eval`-compatible artifact (operator can drop into inspect viewer to replay). Implementation lives in `harness/inspect_tasks.py` (add `cc_session_replay_task`).

---

## Appendix A — Mapping summary table

| W331 target | Cluster G primary cite | File:line | Effort |
|---|---|---|---|
| W325-A SEV-1 telemetry close-loop | langfuse OTel processor | `OtelIngestionProcessor.ts:80-220` | LOW (endpoint already live) |
| W331.2 SubagentStop schema | inspect_ai `SampleEnd` + Opik parent-context inheritance | `hooks/_hooks.py` + `opik/integrations/otel/processor.py:1-120` | MEDIUM (new hook + bridge script) |
| W331.4 ECC hooks re-enable | (no new cluster-G dep — internal config) | `.claude/settings.json` | LOW (settings only) |
| W331.5 OTEL exporter | Traceloop triple-exporter + Phoenix tracer init | `traceloop-sdk/__init__.py:1-200` + `phoenix/server/telemetry.py:1-65` | MEDIUM (new module under `harness/`) |
| Phase-5 Gate-2 (parallel_ratio CI gate) | promptfoo trace assertions | `src/assertions/traceSpanCount.ts:1-100` | LOW (config addition) |
| Phase-5 Gate-3 (red-team) | promptfoo redteam plugins | `src/redteam/plugins/` (55+) | HIGH (eval suite expansion) |
| Phase-5 Gate-5 (replay format) | inspect_ai `.eval` zip | `_recorders/eval.py:74-82` | MEDIUM (artifact emission per session) |

## Appendix B — Repos NOT recommended for promotion this wave

| Repo | Reason |
|---|---|
| Helicone | Proxy-gateway model conflicts with our OTLP-direct approach; would be a fork of langfuse philosophy |
| ragas | RAG-centric metrics; no current RAG workload in CC runtime |
| deepeval | Useful metric library but inspect_ai already dominates eval-framework slot (Cardinal Rule 1 — single canonical primitive) |
| openllmetry (full SDK adoption) | Take the *triple-exporter pattern* and Anthropic instrumentation; skip the Traceloop-managed-backend dependency (we self-host langfuse) |
| opik (full adoption) | Take the *parent-context inheritance pattern*; skip the Opik-managed-backend dependency |
| phoenix (full adoption) | Take the *dual HTTP+gRPC OTLP receiver pattern*; we don't need a second observability backend — langfuse already covers this slot |

Per operator hard-constraint "mature repos → deeper-dive, not PR" — we mine patterns from all 12 but only T5-promote the 3 already live (langfuse + inspect_ai + promptfoo). HarnessAudit and SWE-bench Pro stay T2-scaffolded per W316 wiring. The remaining 7 stay T0-clone for pattern-reference.

---

**END Cluster G deep-dive line-by-line.**

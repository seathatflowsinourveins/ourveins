# W301 Stream K — Observability SDK Deep-Dive (Phoenix + Langfuse + OpenLLMetry + Arize)

**Wave**: W301 Stream K · **Date**: 2026-05-18 · **Owner**: Stream K (parallel-fork; this file only)
**Budget**: T3 ≤ $0.50. **Method**: github + pypi + npm + DeepWiki cite-checks, live port probes, settings.json + .mcp.json + harness audit. All cites mechanically re-verified (Gate-1).

---

## TL;DR

- **Headline FM-class find**: settings.json is wired to ship CC native OTLP traces to `http://127.0.0.1:16006/v1/traces` (`Z:/claude-sota-installed/.claude/settings.json` `env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`), but **no Phoenix process is listening on :16006 or :6006**. Every Claude Code OTel span emitted from this runtime is dropped. Silent-failure (no error surfacing).
- **Phantom-feature contamination = 1**: operator's premise that `openinference-instrumentation-openllmetry` is "already installed" is **false** — `pip show` returns MISSING (Z:/venvs/claude). All 6 `openinference-instrumentation-*` packages and `arize-phoenix` itself are MISSING.
- **What IS installed**: `opentelemetry-sdk==1.39.1`, `opentelemetry-exporter-otlp-proto-http==1.39.1`, `opentelemetry-exporter-otlp-proto-grpc==1.41.0`, `opentelemetry-instrumentation==0.60b1`, `langfuse==4.2.0` (latest 4.6.1), `logfire==4.33.0` (current).
- **What's reachable**: Langfuse OTLP collector `http://127.0.0.1:3000/api/public/otel/v1/traces` returns 401 (auth-gated, healthy) per Langfuse docs `https://langfuse.com/docs/opentelemetry/get-started`. `:3000/api/public/health` returns 200. Phoenix `:16006` and `:6006` BOTH DOWN.
- **MCP servers**: `phoenix` (`@arizeai/phoenix-mcp@4.0.13`, latest matches) wired to `:16006` — useless until Phoenix server boots. `langfuse` MCP wired to local build, no upstream pinned (CR-9 partial).
- **Top-3 adopt-now**: (1) Boot Phoenix on :16006 OR repoint CC OTLP to Langfuse :3000; (2) Install `openinference-instrumentation-anthropic` + `-claude-agent-sdk` for AGENT/TOOL semantic-convention spans; (3) Wire eval_harness.py to emit trace context for Phoenix Experiments / Langfuse Scores.

---

## §1 — SDK enumeration (latest upstream vs. installed)

Source: PyPI/`https://pypi.org/pypi/<pkg>/json` (re-fetched 2026-05-18); npm `registry.npmjs.org/<pkg>/latest`.

| SDK | Latest upstream | Installed in `Z:/venvs/claude` | Role |
|---|---|---|---|
| `openinference-instrumentation` | 0.1.40 (cited in conformance script `https://github.com/Arize-ai/openinference/blob/main/python/openinference-instrumentation/scripts/conformance/anthropic_conformance.py`) | **MISSING** | OITracer base + TraceConfig + using_session |
| `openinference-instrumentation-anthropic` | 1.0.5 | **MISSING** | Auto-wraps `anthropic.Anthropic.messages.create` → LLM span |
| `openinference-instrumentation-claude-agent-sdk` | 0.1.4 | **MISSING** | Wraps `claude_agent_sdk.query()` → AGENT/TOOL spans via SDK hooks |
| `openinference-instrumentation-openllmetry` | 0.1.9 | **MISSING** (operator claim PHANTOM) | Bridge: converts traceloop/OpenLLMetry spans → OpenInference |
| `openinference-semantic-conventions` | bundled | **MISSING** | `SpanAttributes.TOOL_NAME` etc constants |
| `arize-phoenix` | 15.10.1 | **MISSING** | Trace backend (run `python -m phoenix.server.main serve`) |
| `arize-phoenix-otel` | 0.16.1 | **MISSING** | `phoenix.otel.register(...)` one-liner provider setup |
| `traceloop-sdk` | 0.60.0 | **MISSING** | Native OpenLLMetry SDK |
| `langfuse` (py) | 4.6.1 | **4.2.0** (behind 4 minors) | Warehouse client + OTLP receiver at `/api/public/otel` |
| `logfire` | 4.33.0 | **4.33.0** (current) | Pydantic OTel toolchain |
| `opentelemetry-sdk` | latest | **1.39.1** | OTel core |
| `opentelemetry-exporter-otlp-proto-http` | latest | **1.39.1** | HTTP/protobuf exporter |
| `opentelemetry-exporter-otlp-proto-grpc` | latest | **1.41.0** | gRPC exporter |
| `@arizeai/phoenix-mcp` (npm) | 4.0.13 | **wired** to `:16006` | MCP server façade |

**Wire-status grep** (`Z:/claude-sota-installed/harness`, `tools/`, `docs/`, `.claude/plugins/cache/`): zero hits for `phoenix.otel.register`, `AnthropicInstrumentor`, `tracer.start_as_current_span`, `langfuse.Langfuse`, `traceloop.sdk` outside markdown docs. **`harness/eval_harness.py` has ZERO observability imports** (`langfuse=0 phoenix=0 openinference=0 OTLPSpanExporter=0 tracer=0 logfire=0 TracerProvider=0`).

---

## §2 — Trace-flow audit (end-to-end)

**Hypothesis under test**: a Claude API call in this runtime produces an OTel span that lands in Phoenix or Langfuse.

1. **CC native OTel emits** when `CLAUDE_CODE_ENABLE_TELEMETRY=1` (settings.json `env.CLAUDE_CODE_ENABLE_TELEMETRY`). VERIFIED via `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage` headings `claude_code.interaction`, `claude_code.llm_request`, `claude_code.tool`, `claude_code.tool.execution`, `claude_code.hook`. Logs/events: `claude_code.user_prompt`, `claude_code.api_request`, `claude_code.api_error`, `claude_code.api_retries_exhausted`, `claude_code.compaction`, `claude_code.skill_activated`, `claude_code.plugin_loaded`, `claude_code.mcp_server_connection`. CC native (no openinference required).
2. **Exporter target** = `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:16006/v1/traces`, protocol `http/protobuf`, `OTEL_TRACES_EXPORTER=otlp` (settings.json `env`).
3. **Reality**: `netstat -ano | findstr :16006 :6006` → no LISTENING entry. `urlopen('http://127.0.0.1:16006/healthz', timeout=2)` → `URLError`. **No Phoenix process running.**
4. **Result**: every CC span produced this session is dropped (OTLP exporter retries silently then gives up — no surfaced error).
5. **Langfuse path** — Langfuse OTLP endpoint `http://127.0.0.1:3000/api/public/otel/v1/traces` POST returns `401 Unauthorized` (correct behavior — requires Basic auth from `LANGFUSE_PUBLIC_KEY:LANGFUSE_SECRET_KEY` per `https://langfuse.com/docs/opentelemetry/get-started`). Langfuse is **live and ready** but CC isn't pointed at it.
6. **Anthropic SDK calls inside subagents** (e.g. `anthropic.Anthropic().messages.create` in eval_harness.py via Python) currently produce **zero spans** — `openinference-instrumentation-anthropic` is MISSING.
7. **Phoenix MCP queries** (`mcp__phoenix__list-projects`) returned `fetch failed` mid-session — confirms server unreachable. Phoenix MCP cannot list traces because no Phoenix backend exists.

**Gap-summary**: 100% trace loss on CC native path; 100% trace absence on Anthropic SDK path.

---

## §3 — Multi-angle convergence on the observability layer

**Angle A — Anthropic canonical** (`https://docs.anthropic.com/en/docs/claude-code/monitoring-usage`): CC ships native OTel — span tree `claude_code.interaction → llm_request / tool / hook`. `TRACEPARENT` env propagates Agent SDK + `claude -p` invocations into caller spans. Metric `claude_code.cost.usage` is the cost-tracking primitive. Env contract: `CLAUDE_CODE_ENABLE_TELEMETRY=1` + `OTEL_METRICS_EXPORTER` / `OTEL_LOGS_EXPORTER` / `OTEL_TRACES_EXPORTER` + `OTEL_EXPORTER_OTLP_PROTOCOL`. settings.json env block is correct against this contract except for the dead :16006 target.

**Angle B — Practitioner-blog signal** (PyPI release cadence + `Arize-ai/openinference` issue #2073 dated 2025): Phoenix-vs-Langfuse is not either-or — the modern pattern is **dual-export** via a single TracerProvider with two BatchSpanProcessors, each pointing at one backend. Issue #2073 closed by Arize team noting Langfuse OTLP receiver is upstream-blessed but Langfuse-team-owned.

**Angle C — Phoenix source-code SOTA span schema** (DeepWiki `Arize-ai/openinference` + `arize.com/docs/phoenix/integrations/typescript/claude-agent-sdk`): `ClaudeAgentSDKInstrumentor` emits CHAIN root span for `query()`, TOOL spans via SDK PreToolUse/PostToolUse hooks, propagates `session.id` from system-init message, captures `input.value`/`output.value`, `tool.name`, `tool.parameters`, LLM token counts. ESM JS uses `manuallyInstrument()` (not `enable()`). Privacy via `traceConfig.hideInputs/hideOutputs`. This is the SOTA schema OpenInference exports — it is OTel-compatible so any OTLP backend ingests it.

Convergence: all three angles point to the same recipe — `openinference-instrumentation-*` + a Phoenix/Langfuse OTLP collector + optional `OpenInferenceSpanProcessor` bridge for OpenLLMetry imports.

---

## §4 — Top-3 patterns to adopt-now

### Pattern K1 — Repair the CC native OTel target (P0, no install)

- **Current state**: settings.json points OTLP at dead :16006.
- **Recommended**: switch `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` to `http://127.0.0.1:3000/api/public/otel/v1/traces` AND add `OTEL_EXPORTER_OTLP_TRACES_HEADERS=Authorization=Basic <base64(LANGFUSE_PUBLIC_KEY:LANGFUSE_SECRET_KEY)>` per `https://langfuse.com/docs/opentelemetry/get-started`. Or boot Phoenix locally via `arize-phoenix` `python -m phoenix.server.main serve --port 16006`. Tier: T1 INSTALL-equivalent (config only, no code).
- **Pilot recipe**: edit settings.json env block; restart CC; emit one prompt; check `https://us.cloud.langfuse.com` UI for `claude_code.interaction` span.
- **Rollback**: revert env vars.

### Pattern K2 — Install openinference-instrumentation-anthropic + claude-agent-sdk (P1)

- **Current state**: zero AGENT/TOOL spans from Python-side Anthropic calls (eval_harness.py + harness scripts).
- **Recommended**: `pip install openinference-instrumentation-anthropic==1.0.5 openinference-instrumentation-claude-agent-sdk==0.1.4 arize-phoenix-otel==0.16.1` then add to eval_harness.py:
  ```python
  from phoenix.otel import register
  from openinference.instrumentation.anthropic import AnthropicInstrumentor
  tp = register(project_name="eval-harness", endpoint="http://127.0.0.1:3000/api/public/otel/v1/traces", headers={...langfuse basic auth...})
  AnthropicInstrumentor().instrument(tracer_provider=tp)
  ```
- **Span coverage gain**: every `client.messages.create` + `claude_agent_sdk.query()` becomes a CHAIN/AGENT/TOOL span with `llm.token_count.{prompt,completion,total}` + cache_read/write (PR #3100 schema).
- **Rollback**: uninstall packages; remove 3 lines.

### Pattern K3 — Wire eval_harness.py span context into Phoenix Experiments / Langfuse Scores (P2)

- **Current state**: eval results sit in `harness/` outputs disconnected from the runtime trace.
- **Recommended**: per Phoenix `phoenix.experiments.run_experiment` and Langfuse `langfuse.score(...)` SDK methods (langfuse-python 4.x), tag each eval run with `using_session(eval_id)` from `openinference.instrumentation` so the trace + eval row are joined on `session.id` (cited in `anthropic_conformance.py` lines 47-48). Enables eval-vs-trace bisection — find which prompt produced which regression.
- **Rollback**: drop `using_session` blocks.

---

## §5 — Phantom-feature contamination ledger (sca-v5 Gate-4)

| Claim source | Claim | Verification | Verdict |
|---|---|---|---|
| Operator prompt | "Phoenix bridge `openinference-instrumentation-openllmetry` already installed" | `pip show openinference-instrumentation-openllmetry` → `MISSING` | **PHANTOM** |
| CLAUDE.md §6-tier memory | Phoenix MCP installed | `.mcp.json` confirms `@arizeai/phoenix-mcp@4.0.13`. Process at :16006 NOT LISTENING | Plugin INSTALLED but backend ABSENT (partial-phantom) |
| CLAUDE.md state-block | Langfuse `LIVE v3.170.0` | `pip show langfuse` shows 4.2.0 (Python SDK; server version separate). `:3000/api/public/health` → 200 | TRUE for server reachability; SDK-version note stale |
| Operator prompt | "logfire plugin installed" | `pip show logfire` → 4.33.0; `.claude/plugins/cache/logfire/0.1.0/` SKILL.md exists | TRUE |

**Phantom-feature count = 1** (openllmetry-bridge claim).

---

## §6 — Operator action items (≤4)

1. **P0 — Fix dead OTLP target**: edit `Z:/claude-sota-installed/.claude/settings.json` env block — repoint `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` to Langfuse `http://127.0.0.1:3000/api/public/otel/v1/traces` + add `OTEL_EXPORTER_OTLP_TRACES_HEADERS` Basic auth; OR boot Phoenix via NSSM at :16006.
2. **P1 — Install openinference triplet**: `& 'Z:/venvs/claude/Scripts/pip.exe' install openinference-instrumentation-anthropic==1.0.5 openinference-instrumentation-claude-agent-sdk==0.1.4 openinference-instrumentation-openllmetry==0.1.9 arize-phoenix-otel==0.16.1 openinference-semantic-conventions` (closes phantom + enables AGENT/TOOL spans).
3. **P2 — Bump Langfuse Python SDK**: `pip install -U langfuse` (4.2.0 → 4.6.1).
4. **P3 — Wire eval_harness.py** per Pattern K3 (TracerProvider + `using_session` + AnthropicInstrumentor — ~10 LOC).

---

## §7 — Citations re-fetched 2026-05-18 (Phase-5 Gate-1)

- `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage` — span/event taxonomy (claude_code.* names) HTTP 200, content matches header strings.
- `https://langfuse.com/docs/opentelemetry/get-started` — OTLP endpoint `/api/public/otel` confirmed in page body.
- `https://github.com/Arize-ai/openinference/blob/main/python/openinference-instrumentation/scripts/conformance/anthropic_conformance.py` — dual-write `TraceConfig(enable_genai_semconv=True)` + `using_session` pattern.
- `https://github.com/Arize-ai/openinference/blob/main/python/instrumentation/openinference-instrumentation-claude-agent-sdk/README.md` — `ClaudeAgentSDKInstrumentor` API.
- `https://arize.com/docs/phoenix/tracing/concepts-tracing/translating-conventions#view-openllmetry-traces-in-phoenix` — `OpenInferenceSpanProcessor` bridge recipe.
- `https://pypi.org/pypi/openinference-instrumentation-claude-agent-sdk/json` — 0.1.4 latest (re-fetched).
- `https://pypi.org/pypi/openinference-instrumentation-openllmetry/json` — 0.1.9 latest (re-fetched).
- `https://pypi.org/pypi/arize-phoenix/json` — 15.10.1 latest (re-fetched).
- `https://pypi.org/pypi/langfuse/json` — 4.6.1 latest (re-fetched).

All claims grounded; no synthetic content.

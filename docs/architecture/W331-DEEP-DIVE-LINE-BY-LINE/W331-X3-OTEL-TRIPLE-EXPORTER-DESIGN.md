# W331-X3 OTEL Triple-Exporter Design — Cluster G coverage-gap remediation

> **Status**: DESIGN-SKELETON (NOT WIRED) — operator authorization required before runtime install
> **Finding ID**: W331-X3
> **Source**: Cluster G (`docs/architecture/W331-DEEP-DIVE-LINE-BY-LINE/cluster-G-evals-observability.md`)
> **Gap**: NO OTLP metrics/logs export from CC hook stream — currently traces-only via langfuse :3000
> **Date**: 2026-05-19

## §1 Current state

Per `.mcp.json` + `.claude/settings.json` + W325 + W324 prior waves:

- **Langfuse v3.170.0** LIVE at `:3000` (env-block `LANGFUSE_HOST/PUBLIC_KEY/SECRET_KEY`)
- **Inspect_AI v0.3.222** runs `harness/eval_harness.py` evals
- **Promptfoo** T5-LIVE for prompt eval
- **Phoenix :6006** operator-pending start (G9 β alternative)
- **CC hook stream**: emits to stdout via `.claude/settings.json` hooks (e.g. gitleaks, ruff, shellcheck, git commit-msg) — NOT exported to OTEL collector

## §2 Coverage gap (W331-X3)

Per Cluster G analysis (line cite TBD upon codex verify):

| Signal type | Current export | Gap |
|---|---|---|
| **Traces** | langfuse via SDK | ✅ covered |
| **Metrics** | none | ❌ GAP — CC tool-call latency, hook execution time, MCP call counts unmeasured |
| **Logs** | stdout (terminal) | ❌ GAP — hook stdout NOT collected; lost on session end |

Per OTEL spec (`https://opentelemetry.io/docs/specs/otel/`), a complete observability stack requires **all three signals**. Single-signal (traces only) coverage is W331-X3 baseline.

## §3 Traceloop triple-exporter recipe (Cluster G — `Traceloop.init(traces, metrics, logs)`)

Per Cluster G citation:

```python
# traceloop-sdk recipe (Cluster G cite-anchor)
from traceloop.sdk import Traceloop

Traceloop.init(
    app_name="claude-sota-installed",
    api_endpoint="http://127.0.0.1:3000/api/public/otel",  # langfuse :3000 OTLP endpoint
    disable_batch=False,  # production: batch
    instruments={
        "traces": True,   # ✅ already covered
        "metrics": True,  # NEW — closes X3 gap
        "logs": True,     # NEW — closes X3 gap
    }
)
```

Single `Traceloop.init()` call wires all three OTEL signals against langfuse's `/api/public/otel` OTLP receiver.

## §4 Phoenix dual HTTP+gRPC OTLP receiver (G9 β alternative)

Per Cluster G citation `grpc_server.py:30-70`:

Phoenix exposes:
- HTTP OTLP at `:6006/v1/traces` (and `/v1/metrics`, `/v1/logs`)
- gRPC OTLP at `:4317` (default OTLP gRPC port)

Both share `decode_otlp_span` codec (Phoenix internal). For G9 β (Phoenix as alternative exporter), wire same Traceloop SDK but with `api_endpoint="http://127.0.0.1:6006/v1"` and gRPC fallback.

## §5 Design alternatives (G9 matrix)

| Option | Target | Cost | Coverage |
|---|---|---|---|
| α | langfuse :3000 (LIVE) | Zero new service | Traces+Metrics+Logs |
| β | Phoenix :6006 (operator-pending start) | New service required | Traces+Metrics+Logs |
| γ | Both (langfuse primary + Phoenix shadow) | Double maintenance | Maximum redundancy |
| δ | Datadog OTLP / Honeycomb / Grafana Cloud (external) | Network egress + paid plans | Vendor-managed |

**Recommendation**: α (langfuse :3000) — closes X3 gap with zero new service. Phoenix shadow (γ) deferred to W332.

## §6 Wire-up sequence (PROPOSAL — not yet executed)

1. **Install traceloop-sdk** in `Z:/venvs/claude` (Python 3.13):
   ```powershell
   Z:/venvs/claude/Scripts/pip install --upgrade traceloop-sdk>=0.30.0
   ```
   Verify license: traceloop-sdk is Apache-2.0 per `https://github.com/traceloop/openllmetry/blob/main/LICENSE`.

2. **Wire into harness/eval_harness.py** (NOT into .claude/hooks/ — preserves CR-2):
   ```python
   from traceloop.sdk import Traceloop
   import os
   Traceloop.init(
       app_name="claude-sota-installed",
       api_endpoint=os.environ.get("LANGFUSE_HOST", "http://127.0.0.1:3000") + "/api/public/otel",
       instruments={"traces": True, "metrics": True, "logs": True}
   )
   ```

3. **Verify langfuse receives all three signals** via langfuse UI `:3000` → Tracing/Metrics/Logs tabs.

4. **Add to T6 basic-memory verdict-ledger** as W331-X3-RESOLVED.

## §7 CR compliance check

| CR | Concern | Compliance |
|---|---|---|
| CR-1 | trusted source | ✅ traceloop-sdk Apache-2.0 + langfuse-self-hosted |
| CR-2 | no self-invented hook bodies | ✅ wiring goes in `harness/`, not `.claude/hooks/` |
| CR-3 | sub-agent invocation | ✅ no sub-agent surface touched |
| CR-4 | project behavior in CLAUDE.md + settings.json | ✅ ENV blocks already match (LANGFUSE_HOST set in CLAUDE.local.md) |
| CR-5 | safety boundaries via CC permissions | ✅ no custom guard scripts |

## §8 Rollback

Single `pip uninstall traceloop-sdk` + revert harness/eval_harness.py change → restores pre-W331.5 state. No CLAUDE.md edit; no settings.json edit.

## §9 Operator-decision

| Option | Approach | Operator-confirm needed? |
|---|---|---|
| α | Install + wire α (langfuse :3000) | YES (pip install + harness edit) |
| β | Install + wire β (Phoenix :6006 — requires Phoenix start first) | YES + Phoenix start |
| γ | Skip W331.5; defer to W332 | NO |

**Default-recommendation**: α (langfuse :3000 wire-up) — closes X3 gap with minimal surface.

## §10 Open questions (deferred to W332)

1. **OTEL semantic conventions** — match CC tool-call → OTLP span attribute mapping (`gen_ai.system="claude-code"`, `gen_ai.request.model`, `gen_ai.usage.input_tokens` etc.) per OTEL GenAI semconv v1.31.0.
2. **Sampling policy** — production rate? (Phoenix `grpc_server.py:30-70` uses default OTLP sampling; langfuse defaults to all-spans)
3. **PII redaction** — secret-redaction filter in pre-export hook (per W295-r13)
4. **Log retention** — langfuse defaults to project lifetime; for compliance, add OTLP log filter

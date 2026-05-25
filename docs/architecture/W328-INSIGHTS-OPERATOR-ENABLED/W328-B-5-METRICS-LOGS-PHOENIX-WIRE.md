# W328 Stream B §5 — OTEL Metrics + Logs Phoenix Wire-Up (paste-ready)

**Wave**: W328 Stream B · **Date**: 2026-05-19
**HEAD**: `2c48b1e`
**Charter §5**: Composite-MCP integration check + paste-ready Phoenix routing for OTEL_METRICS_EXPORTER + OTEL_LOGS_EXPORTER
**Owner**: docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/* (STRICT-FILE-OWNERSHIP)

---

## §1 — One-line verdict

`OTEL_METRICS_EXPORTER` and `OTEL_LOGS_EXPORTER` are both **UNSET** in `.claude/settings.json:env`. Paste-ready spec below routes both to Phoenix `:16006`. **Gating dependency**: Phoenix v13.15.0 likely requires `PHOENIX_ENABLE_METRICS_RECEIVER=true` and `PHOENIX_ENABLE_LOGS_RECEIVER=true` Docker-env-var enablement (W328-B-2 §4 finding — endpoints return 405 currently). Operator MUST enable Phoenix receivers BEFORE pointing CC at them, otherwise CC's exporter will silently drop spans.

---

## §2 — Current state (re-verified W328)

```
$ node -e "const s=require('Z:/claude-sota-installed/.claude/settings.json'); console.log(s.env.OTEL_METRICS_EXPORTER || 'UNSET', s.env.OTEL_LOGS_EXPORTER || 'UNSET')"

UNSET UNSET
```

Trace exporter is configured (`otlp` → Langfuse). Metrics + logs are NOT configured → CC's instrumentation emits these signals, but they're dropped at the SDK level (no exporter registered = `NoopMetricExporter` + `NoopLogRecordExporter` per OpenTelemetry SDK defaults).

---

## §3 — Routing strategy (3 options)

### Option A — Phoenix-only (BOTH metrics + logs → Phoenix :16006)

**Pros**: single backend for both signal classes; Phoenix UI shows everything in one place.
**Cons**: Phoenix metrics + logs receivers MAY not be enabled (W328-B-2 §4 finding); requires operator to enable them first.

### Option B — Langfuse-only (BOTH metrics + logs → Langfuse :3000)

**Pros**: Langfuse already receives traces, ingest layer proven working.
**Cons**: Langfuse is primarily a trace/prompt-management product; metrics ingest exists but is less mature; logs ingest exists at `/api/public/otel/v1/logs`.

### Option C — Split routing (metrics → Phoenix, logs → Langfuse)

**Pros**: leverages each backend's strength (Phoenix has good metrics visualization; Langfuse has good prompt-trace UI).
**Cons**: split-screen debug; cross-correlation harder.

### Option D — No-op (DEFER until Phoenix receivers enabled)

**Pros**: zero operator action; safe.
**Cons**: metrics + logs continue dropped → GAP-1 + GAP-2 remain open.

---

## §4 — Recommendation

**Phase-1: Option D (DEFER until Phoenix receivers enabled)**.

**Reasoning**:
1. Phoenix endpoints for metrics + logs return 405 right now (W328-B-2 §4) — pointing CC at them will silently fail
2. Phoenix receiver enablement is a 2-step operator action (W328-B-2 §5 F2-2 + F2-3)
3. Risk-free phase: operator enables receivers, smoke-tests with `curl POST`, then applies §5 paste

**Phase-2 (after receiver enablement)**: Option A or C, operator choice.

---

## §5 — Paste-ready spec (Option A — Phoenix-only, apply AFTER receivers enabled)

**Operator opens `Z:/claude-sota-installed/.claude/settings.json`, locates `"env": {...}` block, inserts**:

```json
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
    "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
```

**Insertion point recommendation**: immediately after `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL` (forms a contiguous OTLP block).

**Byte impact**: ~360 bytes added → 16,824 / 50,000 = 34% used (still 33,176 byte headroom).

---

## §5.1 — Paste-ready spec (Option B — Langfuse-only)

If operator prefers all signals to Langfuse:

```json
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/metrics",
    "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/logs",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
```

**Caveat**: Langfuse OTLP support for metrics+logs is partial per Langfuse docs (`https://langfuse.com/docs/integrations/opentelemetry/get-started` primarily covers traces). Operator-verify post-paste via Langfuse UI.

---

## §5.2 — Paste-ready spec (Option C — Split routing)

Metrics → Phoenix, Logs → Langfuse:

```json
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
    "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/logs",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
```

---

## §6 — Smoke test sequence (operator-do)

After Phoenix receivers enabled (W328-B-2 F2-2 + F2-3) AND settings.json env block applied (from §5):

```powershell
# (a) Restart CC to pick up new env vars (CC env is read at session start)
exit  # or close terminal
eee   # relaunch

# (b) Trigger a CC tool call (any tool will emit metrics + logs spans)
# In a CC chat: ask "ls" or similar trivial Bash invocation

# (c) Confirm Phoenix received metrics
curl -s http://127.0.0.1:16006/v1/metrics -X POST -H 'Content-Type: application/x-protobuf'
# Now should return 200 not 405

# (d) Phoenix UI verification
# Navigate to http://127.0.0.1:16006/
# Click "Metrics" tab (or use GraphQL API at /graphql to query metric_records)

# (e) Phoenix logs verification
# Phoenix UI → "Spans" tab → drill into recent span → check logs sub-tab
```

**Success criteria**: Phoenix UI shows CC-generated metrics (e.g. `claude_code.tool_call_duration_ms`, `claude_code.tokens_used`) and logs.

---

## §7 — Composite-MCP integration check (W326 D-3 carry)

**Charter §5 mentioned**: "W326 D-3 OTEL_METRICS_EXPORTER + OTEL_LOGS_EXPORTER carry".

**W326-D D-3 finding** (from W326 closure-synthesis): noted that CC's composite-MCP architecture (when MCP servers themselves emit OTEL signals) would also benefit from configured metrics + logs exporters. Currently the `cognee` MCP at `:8000` and `basic-memory` MCP both have some OTEL emit capability — those signals are also currently dropped.

**Impact of §5 paste**: when CC sets the env vars, they propagate to all child MCP server processes (subprocess inheritance). Therefore cognee + basic-memory metrics + logs would ALSO start flowing to Phoenix/Langfuse.

**Risk**: MCP servers may emit verbose metrics (per-tool-call timing for example) that could flood the Phoenix DB. Mitigation: Phoenix has built-in span-rate limiting via `PHOENIX_MAX_SPANS_PER_SECOND` env var (default ~1000/s — likely sufficient for single-operator workload).

---

## §8 — Closes which gaps

| Gap | Description | Pre-W328 | Post-§5-paste-applied (+ Phoenix receivers enabled) |
|---|---|---|---|
| GAP-1 | Metrics exporter unset → 8 metrics dropped | OPEN | CLOSES (Option A or C) |
| GAP-2 | Logs exporter unset → events dropped | OPEN | CLOSES (Option A, B, or C) |

**Net**: 2 of 4 P0-CRITICAL gaps closeable post-§5-paste.

---

## §9 — Operator decision tree

```
Are Phoenix metrics + logs receivers enabled?
├── No → operator first runs W328-B-2 §5 F2-2 (metrics) + F2-3 (logs) Docker-env steps
│        Wait until /v1/metrics + /v1/logs both POST→200 not 405
│        Then proceed below
└── Yes → choose routing strategy
         ├── Option A (Phoenix-only)   → use §5 paste
         ├── Option B (Langfuse-only)  → use §5.1 paste
         └── Option C (Split routing)  → use §5.2 paste

After paste:
  1. Restart CC
  2. Smoke test (§6)
  3. If success: GAP-1 + GAP-2 closed; verify in Phoenix/Langfuse UI
  4. If fail: rollback (line-level revert of the 6 keys) + re-investigate
```

---

## §10 — Cardinal-rule verification

| Rule | Status (this doc — no edits) | Status (post-operator-paste) |
|---|---|---|
| R1 trusted primitives | ✓ HOLD | ✓ HOLD (OTEL+OTLP+Phoenix all trusted-upstream) |
| R2 direct-CLI hooks | n/a | n/a |
| R3 upstream subagents | n/a | n/a |
| R4 CLAUDE.md + settings.json | ✓ HOLD | ✓ HOLD (env block is legitimate) |
| R5 sandbox/permissions | ✓ HOLD | ✓ HOLD |
| `self_invented_count` | 0 | 0 |

---

## §11 — References

- W325-A GAP-1+GAP-2 source: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md`
- W326 closure D-3 carry: `Z:/claude-sota-installed/docs/architecture/W326-CLOSURE-SYNTHESIS/...` (compose-MCP-OTEL note)
- W327-B-4 prior: `Z:/claude-sota-installed/docs/architecture/W327-INSIGHTS-FINAL/W327-B-4-METRICS-LOGS-PHOENIX-WIRE.md`
- W328-B-2 Phoenix probe: `Z:/claude-sota-installed/docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/W328-B-2-PHOENIX-PROBE.md`
- OTLP exporter env var spec: `https://opentelemetry.io/docs/specs/otel/protocol/exporter/`
- CC monitoring docs: `https://docs.anthropic.com/en/docs/claude-code/monitoring`
- Phoenix Docker docs: `https://docs.arize.com/phoenix/deployment/docker`

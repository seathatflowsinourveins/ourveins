# W330 Stream A-4 — Insights Wire-Up % Advancement

> **Wave**: W330 · **Stream**: A-4 (Claude-session audit) · **Date**: 2026-05-19
> **Scope**: insights wire-up % trajectory · Phoenix metrics+logs receiver state · Langfuse trace ingestion + key rotation · statusLine widget count + render verify.

## §1 Wire-up % trajectory

| Wave | % | Source | Status |
|---|---|---|---|
| W327 | ~0% (perception) | W327 wave-doc | Phoenix mis-detected as not-running |
| W328 close | **14%** | `docs/architecture/W328-INSIGHTS-OPERATOR-ENABLED/` Stream B | corrected baseline: Phoenix RUNNING, port `:16006` canonical, ccstatusline at L219-225 + 37 widgets |
| W329 close | **14%** (no advance) | W329 carry-forward in operator-blocking | W329 Forward Queue items #1-#4 (K-2 OTel + Langfuse rotate + Phoenix recv + settings.json paste) ALL UNCOMPLETED |
| **W330 close (Claude-session estimate)** | **14% (docs-ready, 86% paste-ready BUT 0% applied)** | `W330-A1-INSIGHTS-WIREUP.md` | DOCUMENTATION-COMPLETE, OPERATOR-APPLY-PENDING |
| W331 target (if W330-A1 ops applied) | **86%** | W328-B's same target | requires operator to paste 5 snippets |

## §2 Detailed component status

### §2.1 Phoenix metrics+logs receiver state

Per W330-A1 §1.3 docker probe:
```
phoenix | arizephoenix/phoenix:version-13.15.0 | Up 9 hours (healthy)
         | 127.0.0.1:14317->4317/tcp, 127.0.0.1:16006->6006/tcp
ENV grep PHOENIX_ENABLE_ : EMPTY (no PHOENIX_ENABLE_METRICS_RECEIVER / PHOENIX_ENABLE_LOGS_RECEIVER set)
```

**Verdict**: Phoenix container is UP and trace receiver works (HTTP 200 on `/v1/traces` via `:14317->4317/tcp`); HOWEVER, metrics + logs receivers are DISABLED by default per Arize Phoenix 13.15.0 configuration convention. POST to `:16006/v1/metrics` returns HTTP 405 (W329-B §3 observation).

**Required action**: per W330-A1 §2.c, container recreate with `PHOENIX_ENABLE_METRICS_RECEIVER=true` + `PHOENIX_ENABLE_LOGS_RECEIVER=true`. Operator only (docker restart-class operation).

**Current state**: **DISABLED** (W330-A1 status: STAGE-1-PROBE-COMPLETE / STAGE-2-OPERATOR-ACTION-REQUIRED).

### §2.2 Langfuse trace ingestion state

Per W330-A1 §1.4 reachability check:
- `http://127.0.0.1:3000/api/public/health` HEAD → HTTP 200 ✓
- Langfuse v3.170.0 (LIVE per CLAUDE.md L34 W295-audit)
- Project `5.17.2026` (id `cmpa0h6ux0003o6067jlf4jgd`)

**OTEL trace export**: `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` ✓ set in settings.json L24
**OTEL auth header**: `OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <b64>` **MISSING** (W330-A1 §2.a paste-ready in `tmp/CLAUDE-LOCAL-MD-F5-SNIPPET.txt`).

**Verdict**: Langfuse is up + endpoint configured + traces would route correctly IF auth header were set. Without auth header, Langfuse rejects with HTTP 401 → traces silently drop (W325 GAP-3 P0 carry).

**Status**: **SILENTLY DROPPING TRACES** (auth-header GAP-3 carry from W325 unresolved).

### §2.3 Key rotation status (SEV-1 carry)

Per W329-B §8 P0:
- Langfuse keys `<redacted-W330-A>` / `<redacted-W330-A>` committed to `CLAUDE.local.md (f2)` — SEV-1 (still functional even though gitignored, blast-radius = full self-hosted Langfuse :3000 data)
- W330-A1 §2.e documents rotation procedure (6-step manual UI flow + git history sweep)
- **NOT APPLIED THIS WAVE**

**Status**: **SEV-1 OPEN** (Langfuse key rotation deferred to operator; same with Perplexity key rotation per W317-r1 carry).

### §2.4 statusLine widget count + render verify

Per W328-B §2 correction (overrides W327's 38-widget claim):
- `.claude/settings.json` L219-225 declares `statusLine`
- 37 widgets (W328 corrected from W327's 38 over-count)

**This audit probe**: `grep statusLine .claude/settings.json` → returns L219 `"statusLine": {` opening brace ✓

**Render verify**: cannot verify render from audit context (statusLine renders during interactive CC session, not headless). Operator must visually confirm.

**Status**: **DECLARED CORRECTLY** (settings.json L219-225 widget block valid); **RUNTIME RENDER UNVERIFIED** (operator-side only).

## §3 settings.json OTEL surface audit

Current keys present (per W330-A1 §1.5, 5+2=7 of 13 target):

| Key | Status |
|---|---|
| `CLAUDE_CODE_ENABLE_TELEMETRY=1` | ✓ |
| `OTEL_TRACES_EXPORTER=otlp` | ✓ |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` | ✓ |
| `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf` | ✓ |
| `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` | ✓ |
| `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` | ✓ |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` | ✓ |
| `OTEL_LOG_TOOL_DETAILS=1` (W330-A1 §2.b Phase-1 priv) | **MISSING** |
| `OTEL_LOG_USER_PROMPTS=1` (W330-A1 §2.b Phase-1 priv) | **MISSING** |
| `OTEL_METRICS_EXPORTER=otlp` (W330-A1 §2.d Phase-2 metrics) | **MISSING** |
| `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://127.0.0.1:16006/v1/metrics` | **MISSING** |
| `OTEL_LOGS_EXPORTER=otlp` (W330-A1 §2.d Phase-2 logs) | **MISSING** |
| `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=http://127.0.0.1:16006/v1/logs` | **MISSING** |

Wire-up % = 7 ÷ 13 ≈ **54%** (key-presence basis) — DIFFERENT FROM W328 "14%" which was insights-feature-level basis.

**Note**: "14%" baseline at W328 is FEATURE-LEVEL (Phoenix recv off, Langfuse no auth, OTEL keys partial, ccstatusline-widget runtime unrendered = 14% of the insights feature loop functioning). "86%" target is when all 5 W330-A1 snippets applied.

## §4 INDEPENDENCE-PROOF (Δ-G51)

- **FOUNDATION-ANCHOR**: Anthropic CC monitoring-usage `https://code.claude.com/docs/en/monitoring-usage` (OTEL_* env-var pipeline contract).
- **COUNTERFACTUAL**: IF Anthropic deprecates the CC OTEL integration, observability preserved BECAUSE OpenTelemetry is CNCF-graduated multi-vendor spec — 40+ SDKs + 30+ backends (Arize Phoenix + Langfuse + Datadog + Grafana + Honeycomb etc.). Same env-var names work across all OTEL-compatible runtimes (per W330-A1 §5 W330 deep-dive).
- **Three independence pillars**:
  1. **Anthropic ≠ CNCF ≠ Arize ≠ Langfuse** — four entirely distinct orgs.
  2. **Causal**: OTEL spec predates CC OTEL integration; OTEL doesn't depend on CC participation.
  3. **Temporal**: OTEL 2019 predates Claude Code 2025 by 6 years.

## §5 Forward queue

### §5.1 P0 W331 (operator-action gated)

| # | Action | Apply order |
|---|---|---|
| 1 | Apply W330-A1 §2.a `(f5)` block to `CLAUDE.local.md` (Langfuse auth header) | independent |
| 2 | Apply W330-A1 §2.b Phase-1 OTEL privacy keys to settings.json | independent |
| 3 | Apply W330-A1 §2.c Phoenix container recreate with metrics+logs receivers | independent (docker restart) |
| 4 | Apply W330-A1 §2.d Phase-2 OTEL metrics+logs keys to settings.json | depends on (3) |
| 5 | Apply W330-A1 §2.e Langfuse SEV-1 key rotation via :3000 admin UI | independent (security-CRITICAL carry from W325) |
| 6 | Perplexity SEV-1 rotation per W317-r1 carry | independent |

### §5.2 Acceptance criteria

- Phoenix logs UI shows `user_prompt`, `tool_call` records within 5 seconds of CC tool use → wire-up = 86%
- Langfuse traces show tool params + prompts (not redacted) → trace ingestion verified
- Phoenix metrics UI shows `claude_code.session.count`, `claude_code.token.usage` → metrics receiver verified

### §5.3 Risk

- Operator latency: if not applied within W331, composite stays at ~4.237 (per Stream A-1 §3) instead of advancing to ~4.30+
- SEV-1 key rotation: blast-radius increases linearly with time-since-detection — should be applied NEXT operator turn, not deferred to W331

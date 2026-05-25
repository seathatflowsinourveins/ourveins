# W325 Stream A — Gaps + Paste-Ready Remediations

**Wave**: W325 / 2026-05-19
**Target file**: `Z:/claude-sota-installed/.claude/settings.json`
**Current size**: 15,351 bytes / cap 15,360 (≤9 bytes margin per W317-A budget invariant)
**SHA-anchor**: HEAD `1360aeb`

**IMPORTANT — operator-confirmation required before applying any patch below.** Per W325 mandate, this Stream A does **NOT** modify settings.json. All patches are paste-ready; operator validates + applies.

---

## §1 — CRITICAL gaps (4 — affect actual insight delivery)

### §1.1 GAP-1: Metrics exporter unwired

**Diagnosis**: `OTEL_METRICS_EXPORTER` is unset → all 8 CC metrics (`session.count`, `lines_of_code.count`, `pull_request.count`, `commit.count`, `cost.usage`, `token.usage`, `code_edit_tool.decision`, `active_time.total`) are silently dropped.

**Constraint**: Langfuse 3.170.0 does NOT accept OTel metrics (HTTP 405 verified §1.2 of STREAM-A-LANGFUSE-DATA-VERIFY.md). To capture metrics, must either:
- (A) Send to `console` exporter (debug-only — printed to CC stderr); OR
- (B) Set up a Prometheus / OTLP collector with metrics support; OR
- (C) Use Phoenix (`docker compose up phoenix` per W316-S6 — Phoenix accepts OTel metrics via `:6006/v1/metrics` per `Arize-ai/phoenix` docs); OR
- (D) Use Grafana Tempo / Honeycomb cloud / etc.

**Recommendation**: Path (C) — Phoenix is already running per W316-S6 + W315-r2 Stream E re-discovery. Wire metrics to Phoenix's OTLP endpoint.

**Paste-ready settings.json env addition** (Path C - Phoenix):
```jsonc
"OTEL_METRICS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:6006/v1/metrics",
"OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
"OTEL_METRIC_EXPORT_INTERVAL": "60000",
```

**Alt: Path (A) console — fastest smoke-test**:
```jsonc
"OTEL_METRICS_EXPORTER": "console",
"OTEL_METRIC_EXPORT_INTERVAL": "10000",
```
This prints metrics to CC's stderr every 10s. Useful for verification, not production.

**Byte-cost**: ~180 bytes (Path C). settings.json grows to ~15,531 — **EXCEEDS 15,360 cap** by ~171 bytes. Mitigation: trim 200+ bytes from existing `_comment_*` fields elsewhere, or accept budget exception per W317-A operator-decision.

---

### §1.2 GAP-2: Logs/events exporter unwired

**Diagnosis**: `OTEL_LOGS_EXPORTER` is unset → all CC events (`user_prompt`, `ai_request`, `tool_call`, `session_started`, etc.) are silently dropped.

**Constraint**: Langfuse 3.170.0 does NOT accept OTel logs (HTTP 404 §1.3 of STREAM-A-LANGFUSE-DATA-VERIFY.md). Same backend options as GAP-1.

**Recommendation**: Path (C) — Phoenix accepts OTel logs via `:6006/v1/logs`.

**Paste-ready settings.json env addition** (Path C - Phoenix):
```jsonc
"OTEL_LOGS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:6006/v1/logs",
"OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
"OTEL_LOGS_EXPORT_INTERVAL": "5000",
```

**Byte-cost**: ~170 bytes.

---

### §1.3 GAP-3: ⭐ Langfuse auth header missing — TRACES BLOCKED ⭐

**Diagnosis**: This is the **HIGHEST PRIORITY** gap. Per `https://langfuse.com/docs/opentelemetry/get-started`, Langfuse OTel ingestion requires `Authorization: Basic <base64(pk:sk)>` HTTP header. Our settings.json has trace endpoint + protocol but NOT the auth header. **All CC traces are currently being rejected by Langfuse with HTTP 401.** The 3 historical traces in Langfuse came from manual smoke probes that included auth headers manually.

**Compute the auth string** (operator-run-once):
```bash
echo -n 'pk-lf-<REDACTED-W325-r1-SEV-1>:sk-lf-<REDACTED-W325-r1-SEV-1>' | base64 -w 0
# Output (computed at session, do not paste literal): <REDACTED-W325-r1-SEV-1-base64>
```

**Paste-ready settings.json env addition**:
```jsonc
"OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Basic <REDACTED-W325-r1-SEV-1-base64>",
```

**Byte-cost**: ~155 bytes.

**⚠️ Security note**: The base64 string contains both keys. Operator should consider whether to bury this header in CLAUDE.local.md (gitignored) `$env:OTEL_EXPORTER_OTLP_HEADERS = '...'` instead of settings.json (tracked). Recommended **Path B (CLAUDE.local.md)** — env vars set in CLAUDE.local.md flow into CC's process env, and settings.json env never sees the literal. Adds zero bytes to settings.json.

**Paste-ready CLAUDE.local.md addition** (Path B — preferred):
```powershell
# (f4) W325 — OTEL auth header for Langfuse OTel ingestion.
#      Base64-encoded LANGFUSE_PUBLIC_KEY:LANGFUSE_SECRET_KEY per
#      https://langfuse.com/docs/opentelemetry/get-started auth requirement.
#      Stays here (gitignored) — NOT in tracked settings.json. Resolves W325 GAP-3.
$env:OTEL_EXPORTER_OTLP_HEADERS = 'Authorization=Basic <REDACTED-W325-r1-SEV-1-base64>'
```

**Alt**: pair with `OTEL_EXPORTER_OTLP_TRACES_HEADERS` for signal-specific (only if metrics/logs use different backends).

---

### §1.4 GAP-4: statusLine entirely unconfigured

**Diagnosis**: No `statusLine` key in settings.json → no on-screen cost / context-window / rate-limit insight visible during sessions.

**Recommendation Option A** — wire `context-mode`'s statusline (operator-friendly, single-tool savings + efficiency metrics):

```jsonc
"statusLine": {
  "type": "command",
  "command": "context-mode statusline",
  "padding": 2,
  "refreshInterval": 5
}
```

**Recommendation Option B** — write a custom richer statusline script (full cost + context + rate-limit). Example `Z:/claude-sota-installed/tools/statusline-rich.sh`:

```bash
#!/usr/bin/env bash
# Parses stdin JSON per CCBP claude-settings.md:600-720 schema, emits 1-line status.
input=$(cat)
cost=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
ctx_used=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
rate5h=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // 0')
rate7d=$(echo "$input" | jq -r '.rate_limits.seven_day.used_percentage // 0')
model=$(echo "$input" | jq -r '.model.display_name // "unknown"')
printf '%s | $%.2f | ctx %d%% | 5h %d%% | 7d %d%%' "$model" "$cost" "$ctx_used" "$rate5h" "$rate7d"
```

```jsonc
"statusLine": {
  "type": "command",
  "command": "bash Z:/claude-sota-installed/tools/statusline-rich.sh",
  "padding": 1,
  "refreshInterval": 5
}
```

**Byte-cost**: ~140 bytes (Option A), ~160 bytes (Option B inline reference). Both exceed 15,360-byte cap unless we trim — see budget mitigation below.

**Recommendation**: Option A (context-mode statusline) is simplest because it requires no new script + auto-displays token savings. Operator can layer Option B later.

---

## §2 — MEDIUM gaps (4 — privacy opt-ins safe for local infra)

### §2.1 GAP-5: `OTEL_LOG_TOOL_DETAILS` — tool-parameter visibility

**Diagnosis**: Per CCBP `claude-settings.md:981` — set to `1` to include `tool_parameters` in OTel events. Default-off for privacy; we are local-infra so safe to enable.

**Paste-ready**:
```jsonc
"OTEL_LOG_TOOL_DETAILS": "1",
```

**Byte-cost**: ~30 bytes.

### §2.2 GAP-6: `OTEL_LOG_RAW_API_BODIES` — full payload visibility

**Diagnosis**: Per CCBP `claude-settings.md:982` — set to `1` to emit full API request/response bodies. Useful for max debug at gateway/proxy layer. Default-off for privacy + payload size; we are local-infra so safe to enable.

**Caveat**: payload growth — Langfuse traces will balloon. Recommend ENABLE only after GAP-3 resolved + observed steady-state.

**Paste-ready**:
```jsonc
"OTEL_LOG_RAW_API_BODIES": "1",
```

**Byte-cost**: ~32 bytes.

### §2.3 GAP-7: `OTEL_LOG_USER_PROMPTS` — un-redact user prompts in spans

**Diagnosis**: Per CCBP `claude-settings.md:983` — set to `1` to include `user_system_prompt` in spans (default `<REDACTED>`). For local-infra single-operator → enable.

**Paste-ready**:
```jsonc
"OTEL_LOG_USER_PROMPTS": "1",
```

**Byte-cost**: ~30 bytes.

### §2.4 GAP-8: `CLAUDE_AUTO_BACKGROUND_TASKS` — force auto-bg of long tasks

**Diagnosis**: Per CCBP `claude-settings.md:938` — pair with `claude agents` insight. Force-bg of long tasks → `claude agents` view shows the work in progress.

**Paste-ready**:
```jsonc
"CLAUDE_AUTO_BACKGROUND_TASKS": "1",
```

**Byte-cost**: ~32 bytes.

---

## §3 — LOW gaps (1 — external cloud surface)

### §3.1 GAP-9: Claude Code Analytics API not wired

**Diagnosis**: Anthropic ships an organization-level Analytics API endpoint per `https://docs.anthropic.com/en/docs/claude-code/manage-claude/claude-code-analytics-api`. Returns daily aggregated usage metrics (tokens, sessions, costs) via Anthropic Admin API key.

**Recommendation** — defer to W326 unless operator has the org-admin key already provisioned. Then wire a small skill or hourly cron pulling JSON → posting to Langfuse `metrics` API for visualization alongside OTel traces.

**Implementation sketch** (`Z:/claude-sota-installed/tools/cc-analytics-pull.sh`):
```bash
#!/usr/bin/env bash
# W325 GAP-9 closure — pulls Anthropic CC Analytics API daily.
ORG_ID="<org-uuid>"
ADMIN_KEY="$ANTHROPIC_ADMIN_API_KEY"   # set in CLAUDE.local.md (gitignored)
DATE=$(date -u +%Y-%m-%d)
curl -sS -H "x-api-key: $ADMIN_KEY" -H "anthropic-version: 2023-06-01" \
  "https://api.anthropic.com/v1/organizations/${ORG_ID}/usage_report/claude_code?starting_at=${DATE}T00:00:00Z" \
  > "Z:/claude-sota-installed/.claude/state/anthropic-analytics-${DATE}.json"
```

---

## §4 — Total byte budget

| Patch | Bytes added | Budget impact |
|---|---|---|
| GAP-1 (metrics → Phoenix) | ~180 | exceeds cap |
| GAP-2 (logs → Phoenix) | ~170 | |
| GAP-3 (auth header — settings path) | ~155 | |
| GAP-3 (auth header — CLAUDE.local.md path **recommended**) | 0 | preserves cap |
| GAP-4 (statusLine — context-mode) | ~140 | |
| GAP-5/6/7 (privacy opt-ins) | ~30 each | |
| GAP-8 (auto bg) | ~32 | |
| GAP-9 (analytics API) | 0 (external script) | preserves cap |

**Total** (if all applied in settings.json): ~777 bytes → settings.json would grow to ~16,128 bytes (over cap).

**Mitigation strategies**:
1. **Path B for GAP-3** → CLAUDE.local.md (saves ~155 bytes).
2. **Trim _comment_* fields** in settings.json — per W315 Stream E hygiene audit, ~880 bytes of `_comment_*` strings already cut in prior waves; another ~400-500 bytes recoverable.
3. **W317-A precedent** allows budget exception with operator-confirmation if insight delivery > 15,360-byte cap.
4. **Defer GAP-1/GAP-2 metrics/logs** to a phased-rollout — apply GAP-3 first (proves trace flow), then GAP-4 (statusline insight), then GAP-5-7 (privacy opt-ins), THEN GAP-1/GAP-2 (metrics+logs) with budget cut.

---

## §5 — Recommended ship-order (operator decision)

### §5.1 Phase 1 — Resolve trace blockage (ESTIMATED 5 min)

1. Apply GAP-3 (CLAUDE.local.md path — adds `$env:OTEL_EXPORTER_OTLP_HEADERS = '...'`).
2. Restart CC.
3. Run a workload (`echo hello`).
4. Verify Langfuse trace ingest via `curl /api/public/traces?limit=5` (should see ~5+ NEW `claude_code.*` named traces).

### §5.2 Phase 2 — On-screen visibility (ESTIMATED 5 min)

1. Apply GAP-4 (Option A — context-mode statusline). 
2. Restart CC.
3. Verify status bar shows token savings + efficiency on each event.

### §5.3 Phase 3 — Unleash full content visibility (ESTIMATED 3 min)

1. Apply GAP-5 + GAP-6 + GAP-7 (all 3 privacy opt-ins).
2. Restart CC.
3. Inspect a Langfuse trace — should now show user prompts, tool parameters, raw API bodies.

### §5.4 Phase 4 — Metrics + logs (DEFERRED — needs Phoenix verification + budget cut)

1. Verify Phoenix is running on `:6006`.
2. Trim ~400 bytes from settings.json `_comment_*` fields.
3. Apply GAP-1 + GAP-2 (metrics + logs → Phoenix).
4. Restart CC.
5. Verify Phoenix UI shows metrics + logs.

### §5.5 Phase 5 — Analytics API (DEFERRED — needs org-admin key)

1. Operator confirms `ANTHROPIC_ADMIN_API_KEY` availability.
2. Author `tools/cc-analytics-pull.sh`.
3. Schedule daily cron / NSSM service.

---

## §6 — Non-actionable: things the operator BELIEVED were missing but actually don't exist

Per W310-EXT Stream ε prior audit, these surfaces are **not real** in CC 2.1.144 — operator should drop the expectation:

| Surface | Reality |
|---|---|
| `/insights` slash | Does not exist. Use `/cost` + `/extra-usage` + `/context`. |
| `claude --bg` flag | Does not exist. Use `claude agents` subcommand. |
| `claude insights` / `claude analytics` / `claude metrics` CLI | Do not exist. |
| Anthropic "Insights" panel in CC IDE extension | Does not exist (per current Anthropic docs). |

Anthropic's strategy for CC observability is **OTel exports + the Analytics API** — not in-CLI insights primitives. Once GAP-1 through GAP-7 are wired, the Langfuse + Phoenix dashboards become the in-runtime "Insights" UI.

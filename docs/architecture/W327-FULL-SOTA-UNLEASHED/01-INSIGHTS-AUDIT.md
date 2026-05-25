# W327-S1 — Insights Features Audit

> **Wave**: W327 | **Stream**: S1 | **Date**: 2026-05-19 | **Cite-anchored to**: CCBP `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md @ HEAD f28c2da` + Anthropic `https://code.claude.com/docs/en/monitoring-usage` (fetched 2026-05-19 20:55Z).

**TL;DR**: Current runtime exports **OTEL traces only** to Langfuse :3000 with **0 metrics + 0 logs + 0 privacy-opt-ins + 0 detailed-tracing-beta**. Anthropic exposes **5 telemetry signal channels** (metrics, events/logs, traces-beta, dynamic-headers-helper, resource-attributes), of which **1 channel is wired (20%)**. The "14%" operator quote conflates configured-signal-coverage × privacy-opt-in coverage × dual-backend coverage. After the §6 checklist, every Anthropic-native insights primitive is exercised against a working local backend.

---

## §1 Current Insights wire-up state

Source: `Z:/claude-sota-installed/.claude/settings.json` env block (L21-28) + `CLAUDE.local.md §f-block` (live env) + service-port probe (2026-05-19 20:55Z).

### 1.1 Telemetry env block (ENABLED)
| Var | Value | Channel |
|---|---|---|
| `CLAUDE_CODE_ENABLE_TELEMETRY` | `1` | Master switch (REQUIRED — wired) |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | `1` | Detailed-tracing-beta gate (wired) |
| `OTEL_TRACES_EXPORTER` | `otlp` | Traces channel (wired) |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | `http://127.0.0.1:3000/api/public/otel/v1/traces` | Langfuse trace ingest (wired) |
| `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL` | `http/protobuf` | Wire protocol (wired) |
| `OTEL_RESOURCE_ATTRIBUTES` | `openinference.project.name=eee` | Phoenix/OpenInference project tag |
| `OTEL_SEMCONV_STABILITY_OPT_IN` | `gen_ai_latest_experimental` | GenAI semantic-convention opt-in |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` | `false` | Message-content capture (OFF) |

### 1.2 Telemetry channels NOT wired
| Missing var | Channel | Impact |
|---|---|---|
| `OTEL_METRICS_EXPORTER` | Metrics (token.usage, session.count, cost.usage, lines_of_code, commit.count) | **Cost + adoption + productivity dashboards impossible** |
| `OTEL_LOGS_EXPORTER` | Events/logs (user_prompt, tool_result, hook_execution_complete, api_error, api_request) | **Action-attribution + retry-detection + hook-perf impossible** |
| `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` | Metrics endpoint | (cascade from above) |
| `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` | Logs endpoint | (cascade from above) |
| `OTEL_LOG_USER_PROMPTS` | Privacy opt-in — user prompt content | Only prompt LENGTH recorded; no content |
| `OTEL_LOG_TOOL_DETAILS` | Privacy opt-in — tool_parameters + tool_input | Tool calls observed but params redacted |
| `OTEL_LOG_TOOL_CONTENT` | Privacy opt-in — tool I/O in span events (requires traces-beta) | Trace spans have empty tool I/O |
| `OTEL_LOG_RAW_API_BODIES` | Full Messages API request/response JSON | No payload replay/debugging at gateway |
| `OTEL_METRIC_EXPORT_INTERVAL` | Metric flush cadence (default 60s) | Acceptable default — minor |
| `OTEL_LOGS_EXPORT_INTERVAL` | Log flush cadence (default 5s) | Acceptable default — minor |
| `otelHeadersHelper` (settings.json) | Dynamic header refresh (auth tokens) | N/A — Langfuse uses static OAuth basic |

### 1.3 statusLine (FULLY WIRED — 33 widgets across 3 lines)
- Config: `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (ccstatusline@2.2.19)
- Line 1: model · context-length · context-percentage · context-bar · thinking-effort · output-style
- Line 2: account-email · session-usage · weekly-usage · block-timer · compaction-counter · session-cost · session-clock
- Line 3: git-branch · git-changes · worktree-mode · worktree-name · skills · free-memory · version
- refreshInterval=30s, padding=0, flex-mode=full-minus-40

### 1.4 Live backend probe (2026-05-19 20:55Z)
| Service | Port | State | Purpose |
|---|---|---|---|
| Langfuse-web | 3000 | **UP** — project `5.17.2026` (cmpa0h6ux0003o6067jlf4jgd) | Trace ingest target |
| Phoenix UI | **16006** (not 6006) | **UP** — HTTP 200 | OpenInference trace viewer (alt port per W155 F13) |
| Phoenix (canonical) | 6006 | DOWN | Anthropic-doc default not bound (alt 16006 used) |
| Cognee MCP | 8000 | UP | T3 memory tier |
| LlamaSwap | 8090 | UP | Local model proxy |
| Ollama | 16700 | UP | Local LLM backend |
| Hindsight | 9077 | DOWN (RETIRED W317-S1) | n/a |
| FalkorDB | 16379 | DOWN-by-design (W295 graphiti retired) | n/a |
| Anthropic gateway | 19801 | UP | LLM gateway (eee fleet) |

### 1.5 Operator wave-status reconciliation
- **"Langfuse 0-span ingestion"** — partially explained by **traces-only wiring**: traces flow to :3000/api/public/otel/v1/traces, but Langfuse-cloud's `/api/public/otel` endpoint **only accepts traces, not metrics/logs**. If the ingestion is 0-span, root cause is *not* missing metric/log exporters — it is one of: (a) auth header missing (`OTEL_EXPORTER_OTLP_HEADERS` absent + Langfuse OTLP requires Basic-auth), (b) `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` excluding all GenAI spans, or (c) `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` requires per-doc traces-beta flag `OTEL_LOG_TOOL_CONTENT=1` to actually emit span events. **§6 wires both.**
- **"Phoenix :6006 not started"** — **port-mismatch myth**: Phoenix runs on **:16006** (W155 F13 alt port). Anthropic monitoring-doc + most third-party docs assume :6006. Either rebind Phoenix to :6006 OR document the :16006 deviation.
- **"3 privacy opt-ins OFF"** — confirmed: `OTEL_LOG_TOOL_DETAILS` + `OTEL_LOG_RAW_API_BODIES` + `OTEL_LOG_USER_PROMPTS` unset. Add `OTEL_LOG_TOOL_CONTENT` for traces-beta completeness (4 total opt-ins, not 3).

---

## §2 CCBP-documented features (HEAD f28c2da, 2026-05-19)

Source: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md`.

### 2.1 OpenTelemetry block (L768-983)
- **settings.json key**: `otelHeadersHelper` — script to generate dynamic OTel headers (cite L768-790)
- **Env vars table** (lines 829-983): full list of `CLAUDE_CODE_*` + `OTEL_*` knobs including:
  - `CLAUDE_CODE_ENABLE_TELEMETRY` (L835) — master switch
  - `CLAUDE_CODE_OTEL_HEADERS_HELPER_DEBOUNCE_MS` (L976) — header refresh debounce
  - `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS` (L977) — flush timeout
  - `CLAUDE_CODE_OTEL_SHUTDOWN_TIMEOUT_MS` (L978) — shutdown timeout
  - `OTEL_LOG_TOOL_DETAILS` (L981) — v2.1.85 changelog-only, privacy opt-in for tool_parameters
  - `OTEL_LOG_RAW_API_BODIES` (L982) — v2.1.111 changelog-only, full API body capture
  - `OTEL_LOG_USER_PROMPTS` (L983) — v2.1.121 changelog-only, prompt content capture
- **Survey routing**: `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL` (v2.1.136) routes session-quality feedback to local OTEL when Anthropic-bound traffic is blocked

### 2.2 statusLine block (L656-756)
- `statusLine` settings object: `{ type, command, padding, refreshInterval }`
- **Stdin JSON schema** (passed to status command): model.id, cost.total_cost_usd, context_window.{total_input_tokens, used_percentage, current_usage}, rate_limits.{five_hour,seven_day}.used_percentage, effort.level, thinking.enabled, worktree.*, agent.name, exceeds_200k_tokens, etc.
- All ccstatusline-supported widgets are direct subscribers to these stdin fields.

### 2.3 Spinner / feedback / accessibility (L756-768)
- `spinnerTipsEnabled` + `spinnerVerbs` + `spinnerTipsOverride` — soft-UX, not insights-channel
- `feedbackSurveyRate` (numeric 0-1) — sampling rate for OTEL-routed surveys
- `CLAUDE_CODE_ACCESSIBILITY=1` — screen-reader cursor support (orthogonal)

---

## §3 Anthropic-native insights features (docs + repo)

Source: `https://code.claude.com/docs/en/monitoring-usage` (fetched 2026-05-19 20:55Z) + cross-ref `https://github.com/anthropics/claude-code/contents/.claude`.

### 3.1 Five signal channels (TIER-1)
| Channel | Required env vars | Default endpoint | Anthropic-doc status |
|---|---|---|---|
| **Metrics** | `OTEL_METRICS_EXPORTER=otlp\|prometheus\|console\|none` + `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` | `http://localhost:4318/v1/metrics` | Stable |
| **Events/Logs** | `OTEL_LOGS_EXPORTER=otlp\|console\|none` + `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` | `http://localhost:4318/v1/logs` | Stable |
| **Traces (beta)** | `OTEL_TRACES_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` + `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` | `http://localhost:4318/v1/traces` | **Beta** |
| **Dynamic headers** | `settings.json: { otelHeadersHelper: <script-path> }` | n/a | Stable |
| **Resource attributes** | `OTEL_RESOURCE_ATTRIBUTES=key=val,key2=val2` | n/a | Stable |

### 3.2 Privacy opt-ins (4 total)
- `OTEL_LOG_USER_PROMPTS=1` — include `user_system_prompt` field (default: prompt-length only)
- `OTEL_LOG_TOOL_DETAILS=1` — include `tool_parameters` + `tool_input` (Bash cmds, MCP names, skill names) + command names on `user_prompt` events
- `OTEL_LOG_TOOL_CONTENT=1` — tool I/O content in span events (REQUIRES traces-beta), truncated 60 KB
- `OTEL_LOG_RAW_API_BODIES=1` (or `=file:<dir>`) — full Messages API JSON; **implies consent to all 3 above**

### 3.3 Metric names emitted (key list)
- `claude_code.token.usage` (input/output, user/team/model/skill.name/plugin.name/agent.name dims)
- `claude_code.session.count`
- `claude_code.lines_of_code.count`
- `claude_code.commit.count`
- `claude_code.pull_request.count`
- `claude_code.cost.usage` (cost monitoring, attributable to skill/plugin/agent)
- `claude_code.api_error` (event — terminal retry-exhaustion signal)

### 3.4 Standard event attributes (auto-injected, all events)
- `user.email`, `user.account_uuid`, `user.account_id`, `organization.id` (OAuth sessions)
- `user.id` (installation-scoped) + `session.id` (per-session)
- `app.version`, `model`, plus per-event extensions (e.g. `hook_event`, `hook_name`, `tool_name`)

### 3.5 Backend compatibility matrix
| Backend | Traces | Metrics | Logs | Endpoint | Notes |
|---|---|---|---|---|---|
| **Langfuse-cloud/self-hosted** | YES (/api/public/otel/v1/traces) | NO | NO | :3000 | Trace-only; needs Basic-auth header |
| **Arize Phoenix** | YES (OpenInference format) | LIMITED | YES (events) | :6006 (default) or :16006 | Local OSS, ideal for traces+events |
| **Prometheus** | NO | YES (pull) | NO | scrape :9090 | Metrics-only |
| **Generic OTLP collector** | YES | YES | YES | :4318 (http) / :4317 (grpc) | One pipeline, fans out |
| **Console exporter** | YES | YES | YES | stdout | Debug-only |

### 3.6 Anthropic operational telemetry (separate from OTEL)
- `DISABLE_TELEMETRY=1` — opt out of Anthropic's own product telemetry (orthogonal to OTEL export)
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` — superset disable (incl. AUTOUPDATER, FEEDBACK, ERROR, TELEMETRY)

---

## §4 GAP MATRIX

| # | Feature | Current state | CCBP-required | Anthropic-native | Impact |
|---|---|---|---|---|---|
| F1 | Master telemetry switch | wired (`=1`) | wired | required-stable | OK |
| F2 | Detailed tracing beta | wired (`=1`) | env-only | required-beta | OK (but un-utilized — needs F11 to materialize) |
| F3 | **Metrics channel** | UNWIRED | env-only | stable | **CRITICAL** — no cost/token/session counters anywhere |
| F4 | **Logs/Events channel** | UNWIRED | env-only | stable | **CRITICAL** — no user_prompt/tool_result/hook_execution events |
| F5 | Traces channel | wired (Langfuse :3000) | env-only | beta | OK — but see F12 (Langfuse-only ⇒ no metric/log fallback) |
| F6 | OTLP HTTP protocol | `http/protobuf` | stable | stable | OK |
| F7 | **Auth headers (Langfuse Basic)** | UNWIRED | env-only | stable | **CRITICAL** — Langfuse OTLP requires Basic-auth; this is likely the 0-span root cause |
| F8 | Resource attributes (project tag) | `openinference.project.name=eee` only | env-only | stable | Partial — missing dept/team/cost-center dims |
| F9 | Semconv stability opt-in | `gen_ai_latest_experimental` | env-only | stable | OK |
| F10 | **`OTEL_LOG_USER_PROMPTS`** | UNWIRED | changelog-only | privacy-opt-in | HIGH — prompt content invisible in traces |
| F11 | **`OTEL_LOG_TOOL_DETAILS`** | UNWIRED | changelog-only | privacy-opt-in | HIGH — Bash/MCP/skill params invisible |
| F12 | **`OTEL_LOG_TOOL_CONTENT`** | UNWIRED | not-in-CCBP-yet | privacy-opt-in (traces-beta) | HIGH — required for F2 to actually surface payload |
| F13 | `OTEL_LOG_RAW_API_BODIES` | UNWIRED | changelog-only | privacy-opt-in | MED — full-replay debugging unavailable |
| F14 | Message-content capture | `=false` (off) | n/a | flag | NEEDED ON when F10/F11 are wired |
| F15 | otelHeadersHelper script | UNWIRED | settings.json | stable | NICE-TO-HAVE — auto-rotate Langfuse tokens |
| F16 | **Phoenix backend (events+traces)** | port :16006 (deviation) | n/a | docs assume :6006 | LOW — config-doc drift, no functional break |
| F17 | **Dual-export (Langfuse traces + Phoenix events)** | UNWIRED | n/a | stable (per §3.1 example) | HIGH — single-backend = single-point-of-failure |
| F18 | statusLine config | FULLY wired (33 widgets) | wired | stable | OK |
| F19 | Anthropic operational-telemetry opt-out | not-set (default ON) | env-only | stable | DECISION — orthogonal to OTEL export |
| F20 | Feedback-survey routing | not-set | env-only | stable | LOW |
| F21 | Metric/log export intervals | not-set (defaults: 60s/5s) | env-only | stable | OK |

**Score**: Wired = F1, F2, F5, F6, F8 (partial), F9, F14 (disable-only), F18 = **8/21 (38%)**. With F7+F10+F11+F12+F17 added = **13/21 (62%)**. With F3+F4+F13+F15 added = **17/21 (81%)**. Remaining 4 (F16/F19/F20/F21) are decisions, not gaps.

---

## §5 Wire-up plan: 38% → 100%

### Phase 1 — Fix 0-span ingestion (the operator's "14%" sense)
**Root cause hypothesis**: Langfuse `/api/public/otel/v1/traces` ingests traces but no Basic-auth header is being sent. Span emission is conditional on (a) telemetry switch ON [wired], (b) beta flag ON [wired], (c) auth header present [**MISSING**], (d) `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=true` to actually populate span bodies [**currently false**].

Add to `.claude/settings.json env`:
```json
"OTEL_EXPORTER_OTLP_TRACES_HEADERS": "Authorization=Basic <base64(pk-lf-...:sk-lf-...)>",
"OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "true"
```
- `<base64>` = `Buffer.from(LANGFUSE_PUBLIC_KEY + ':' + LANGFUSE_SECRET_KEY).toString('base64')` from `CLAUDE.local.md §f2`.
- After restart, Langfuse projects/5.17.2026/traces should show spans.

### Phase 2 — Wire the 3 privacy opt-ins + 1 traces-beta opt-in
Add to `.claude/settings.json env`:
```json
"OTEL_LOG_USER_PROMPTS": "1",
"OTEL_LOG_TOOL_DETAILS": "1",
"OTEL_LOG_TOOL_CONTENT": "1",
"OTEL_LOG_RAW_API_BODIES": "1"
```
- All 4 are local-only (Langfuse on 127.0.0.1; no PII egress).
- `RAW_API_BODIES=1` implies consent to the other 3 — order matters only for documentation.

### Phase 3 — Wire metrics + logs channels (dual-backend)
Plan: emit **metrics + logs** to a local OTLP collector at :4318, which fans out — Phoenix gets events/traces, Prometheus scrapes metrics. Langfuse keeps traces.

Add to `.claude/settings.json env`:
```json
"OTEL_METRICS_EXPORTER": "otlp",
"OTEL_LOGS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
"OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
"OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf"
```
Phoenix-on-:16006 already accepts OTLP/HTTP. **No new collector process needed** — Phoenix is the collector.

### Phase 4 — Resource-attributes enrichment
Replace single `openinference.project.name=eee` with full attribution set:
```json
"OTEL_RESOURCE_ATTRIBUTES": "openinference.project.name=eee,service.name=claude-sota-installed,deployment.environment=local,enduser.id=operator,session.runtime=claude-sota-installed"
```
Per Anthropic-doc §3.4: no spaces, no quotes, percent-encode special chars.

### Phase 5 — Decisions (one-line operator answer each)
- F16 Phoenix port — keep :16006 OR rebind to :6006 (canonical). Recommend: **keep :16006** (W155 F13 historical, docs amendment cheaper than service restart).
- F19 Anthropic operational telemetry — leave default ON (local-only deployment; no PII concern).
- F20 Feedback-survey routing — skip (single-operator runtime, not enterprise-fleet).
- F15 otelHeadersHelper — skip (Langfuse static OAuth basic, no rotation needed).

---

## §6 Concrete operator-action checklist (~15-20 min)

### Step 1 — Compute Basic-auth header (1 min)
```powershell
$pk = $env:LANGFUSE_PUBLIC_KEY
$sk = $env:LANGFUSE_SECRET_KEY
$b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$pk`:$sk"))
"Authorization=Basic $b64"
```
Copy output for Step 2.

### Step 2 — Patch `.claude/settings.json env` (3 min)
Add 11 keys (or replace the 2 existing OTEL keys with the full block). Use **Edit** tool, not Write — preserves comments and order. Target file: `Z:/claude-sota-installed/.claude/settings.json`.

Final telemetry block (replaces L21-28):
```json
"CLAUDE_CODE_ENABLE_TELEMETRY": "1",
"CLAUDE_CODE_ENHANCED_TELEMETRY_BETA": "1",
"OTEL_TRACES_EXPORTER": "otlp",
"OTEL_METRICS_EXPORTER": "otlp",
"OTEL_LOGS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_TRACES_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/traces",
"OTEL_EXPORTER_OTLP_TRACES_PROTOCOL": "http/protobuf",
"OTEL_EXPORTER_OTLP_TRACES_HEADERS": "Authorization=Basic <PASTE_FROM_STEP_1>",
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
"OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
"OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
"OTEL_RESOURCE_ATTRIBUTES": "openinference.project.name=eee,service.name=claude-sota-installed,deployment.environment=local",
"OTEL_SEMCONV_STABILITY_OPT_IN": "gen_ai_latest_experimental",
"OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "true",
"OTEL_LOG_USER_PROMPTS": "1",
"OTEL_LOG_TOOL_DETAILS": "1",
"OTEL_LOG_TOOL_CONTENT": "1",
"OTEL_LOG_RAW_API_BODIES": "1",
```

### Step 3 — Mirror auth header into CLAUDE.local.md (1 min)
Add `OTEL_EXPORTER_OTLP_TRACES_HEADERS` to the `(f2)` block in `CLAUDE.local.md` (gitignored) so a fresh launch via `tools/eee.ps1` picks it up before CC env is materialized. **Do not commit the header — it embeds the secret key.**

### Step 4 — Restart Claude Code (2 min)
- Exit current session
- Re-launch via `tools/eee.ps1`
- Verify env: PowerShell `Get-ChildItem env: | ? Name -match '^OTEL_' | ft Name,Value` should show 16 OTEL_ vars

### Step 5 — Smoke-test (5 min) — see §7 for command per feature.

### Step 6 — Validate dashboards (3 min)
- Langfuse: `http://127.0.0.1:3000/project/cmpa0h6ux0003o6067jlf4jgd/traces` — should show new spans within 60s
- Phoenix: `http://127.0.0.1:16006` — events/logs tab should show user_prompt + tool_result events

### Step 7 — Commit (1 min)
- `git add .claude/settings.json && git commit -m "feat(w327-s1): full OTEL insights wire-up — 5 signals + 4 privacy opt-ins + dual-backend (Langfuse traces + Phoenix events/metrics)"`
- (CLAUDE.local.md is gitignored — no commit)

---

## §7 Validation: smoke-test command per feature

### S1 — Telemetry switch
```powershell
[Environment]::GetEnvironmentVariable("CLAUDE_CODE_ENABLE_TELEMETRY")
# Expect: 1
```

### S2 — Traces channel (Langfuse ingest)
```powershell
# Trigger a tool call inside CC, then within 60s:
$auth = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"))
$r = Invoke-WebRequest -Uri "http://127.0.0.1:3000/api/public/traces?limit=5" -Headers @{Authorization="Basic $auth"} -UseBasicParsing
$r.Content | ConvertFrom-Json | Select-Object -ExpandProperty data | Format-Table id,timestamp,name
# Expect: at least 1 row with a recent timestamp
```

### S3 — Metrics channel (Phoenix scrape)
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:16006/v1/metrics" -Method GET -UseBasicParsing
# Expect: HTTP 405 (Method Not Allowed) — endpoint is POST-only for ingest; 405 confirms route exists
```

### S4 — Logs channel
```powershell
# Run any tool, then check Phoenix events tab:
Start-Process "http://127.0.0.1:16006/projects/eee/traces"
# Expect: user_prompt + tool_result event rows
```

### S5 — Privacy opt-ins propagation
```powershell
foreach ($k in 'OTEL_LOG_USER_PROMPTS','OTEL_LOG_TOOL_DETAILS','OTEL_LOG_TOOL_CONTENT','OTEL_LOG_RAW_API_BODIES') {
  "$k = $([Environment]::GetEnvironmentVariable($k))"
}
# Expect: all 4 = 1
```

### S6 — Resource attributes
```powershell
[Environment]::GetEnvironmentVariable("OTEL_RESOURCE_ATTRIBUTES")
# Expect: openinference.project.name=eee,service.name=...,deployment.environment=local
```

### S7 — Span content non-empty
```powershell
# After 1-2 tool calls, query Langfuse generations:
$auth = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"))
$r = Invoke-WebRequest -Uri "http://127.0.0.1:3000/api/public/observations?type=GENERATION&limit=1" -Headers @{Authorization="Basic $auth"} -UseBasicParsing
($r.Content | ConvertFrom-Json).data[0] | Format-List name,input,output,metadata
# Expect: input.messages array non-empty (requires CAPTURE_MESSAGE_CONTENT=true)
```

### S8 — Backend health
```powershell
node -e "['3000','16006'].forEach(p=>fetch('http://127.0.0.1:'+p).then(r=>console.log(p,r.status)).catch(e=>console.log(p,'DOWN')))"
# Expect: 3000 200, 16006 200
```

### S9 — statusLine renders new fields
- Visible in TUI footer (no curl needed) — session-cost / weekly-usage widgets actively update.

### S10 — Hook execution telemetry
```powershell
# After 1 Edit tool call, check Phoenix events:
# event.name = hook_execution_complete should appear with hook_name=PostToolUse:Edit|Write|MultiEdit
```

---

## Appendix A: Sources & citations

- **CCBP**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md @ HEAD f28c2da` — lines L656-756 (statusLine), L768-790 (otelHeadersHelper), L829-983 (env vars table)
- **Anthropic monitoring doc**: `https://code.claude.com/docs/en/monitoring-usage` (fetched 2026-05-19 20:55Z, 21 sections / 74.1KB indexed)
- **Current settings.json**: `Z:/claude-sota-installed/.claude/settings.json` L21-28 (telemetry block) + L231-236 (statusLine)
- **CLAUDE.local.md**: §f2 Langfuse keys + §f3 plugin data-dir overrides
- **ccstatusline config**: `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` v3 (33 widgets / 3 lines)
- **Live probes** (2026-05-19 20:55Z): node-based TCP-connect probe for 9 ports + Langfuse `/api/public/projects` + Phoenix `:16006` HTTP 200
- **Sibling refs**: `docs/architecture/W265-truth-up-and-langfuse-wiring-2026-05-17.md` (W265 Langfuse wiring origin), `docs/architecture/W262-observability-audit-2026-05-17.md` (prior observability sweep)

## Appendix B: What is NOT in scope for §6 checklist

- Phoenix port rebind (:16006 → :6006) — config doc drift only, no functional impact
- Anthropic operational-telemetry opt-out (`DISABLE_TELEMETRY=1`) — orthogonal to OTEL export, single-operator runtime
- Feedback-survey routing (`feedbackSurveyRate` + `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL`) — not applicable to single-operator
- otelHeadersHelper script — Langfuse uses static Basic-auth, no rotation needed
- Pydantic Logfire plugin install — pydantic-skills marketplace plugin is an AI/skill bundle, NOT an OTLP-Logfire MCP backend; out of scope for this audit

## Appendix C: Top-3 wire-up gaps by impact

1. **F7 Auth headers missing** (`OTEL_EXPORTER_OTLP_TRACES_HEADERS`) — the actual likely root cause of the operator's "0-span ingestion". Langfuse OTLP requires Basic-auth; no auth header = silent 401 = 0 spans. **One env var fixes the entire trace pipeline.**
2. **F3 + F4 Metrics + Logs channels** UNWIRED — 60% of the Anthropic insights model is invisible. Cost dashboards, session counters, user_prompt/tool_result event logs, retry-exhaustion detection ALL impossible until both `OTEL_METRICS_EXPORTER` + `OTEL_LOGS_EXPORTER` are set.
3. **F12 `OTEL_LOG_TOOL_CONTENT`** UNWIRED — without this, the `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` flag is effectively dormant; span events have no tool I/O payloads, defeating the purpose of detailed-tracing-beta.

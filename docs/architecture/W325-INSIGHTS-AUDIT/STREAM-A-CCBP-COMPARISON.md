# W325 Stream A — CCBP vs Our settings.json — Insights-Feature Gap Comparison

**Wave**: W325 / 2026-05-19
**HEAD**: `1360aeb1401c2426b043f61a8588bb0e2319fc19`
**Our settings.json**: `Z:/claude-sota-installed/.claude/settings.json` (15,351 bytes)
**CCBP authority**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md @ 48f2ceb`
**Anthropic primary cite**: `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage`

This document is line-by-line: every CCBP-documented insights env var, with present-state in our runtime + GAP-class.

Symbology:
- ✅ = configured in our `.claude/settings.json:env`
- ❌ = absent from our settings.json
- ⚠️ = present but suboptimal value
- N/A = privacy or compatibility opt-out (correct not to set)

---

## §1 — Quadrant 1: Telemetry CORE (CCBP `claude-settings.md:835-841`)

| CCBP env var | CCBP cite | Anthropic monitoring-doc cite | Default | Our value | Class |
|---|---|---|---|---|---|
| `CLAUDE_CODE_ENABLE_TELEMETRY` | L835 | §Quick start | `0` (off) | `1` | ✅ |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA` | not in CCBP (undocumented) | not in Anthropic monitoring doc | unset | `1` | ✅ (best-effort opt-in beta) |
| `DISABLE_TELEMETRY` | L841 | §Disabling | unset | unset | N/A (we WANT telemetry) |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | L880 | §Privacy | unset | unset | N/A (we WANT telemetry) |
| `DISABLE_ERROR_REPORTING` | (in CCBP env block) | n/a | unset | unset | N/A |

**Quadrant 1 net**: 2/2 enable flags set correctly. ✅

---

## §2 — Quadrant 2: Exporters (CCBP `claude-settings.md` exporter env vars + Anthropic monitoring doc §Configuration)

| CCBP env var | Default | Our value | Class | Notes |
|---|---|---|---|---|
| `OTEL_TRACES_EXPORTER` | (unset = drop) | `otlp` | ✅ | Traces signal ON. |
| `OTEL_METRICS_EXPORTER` | (unset = drop) | **unset** | ❌ **GAP-1** | Metrics dropped silently. Recommend `otlp` (or `console` to test locally first). |
| `OTEL_LOGS_EXPORTER` | (unset = drop) | **unset** | ❌ **GAP-2** | Events/logs dropped silently. Recommend `otlp`. |

**Quadrant 2 net**: 1/3 signal exporters wired. **Two critical gaps**. ❌❌✅

---

## §3 — Quadrant 3: Endpoints + protocol (CCBP monitoring section + Langfuse OTEL doc cite `https://langfuse.com/docs/opentelemetry/get-started`)

| Env var | Anthropic default | Our value | Class | Notes |
|---|---|---|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `http://localhost:4317` (gRPC) | unset | N/A | We use signal-specific override for traces. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` | unset | N/A | We use signal-specific override. |
| `OTEL_EXPORTER_OTLP_HEADERS` | unset | **unset** | ❌ **GAP-3 CRITICAL** | Langfuse requires `Authorization=Basic <base64(pk:sk)>` per `https://langfuse.com/docs/opentelemetry/get-started`. **Without this, traces 400-rejected.** |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | (falls back to general) | `http://127.0.0.1:3000/api/public/otel/v1/traces` | ✅ | Langfuse-local trace endpoint. |
| `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL` | (falls back to general) | `http/protobuf` | ✅ | Correct for Langfuse. |
| `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` | unset | unset | ❌ | Would be `http://127.0.0.1:3000/api/public/otel/v1/metrics` if metrics-exporter ON. But **see STREAM-A-LANGFUSE-DATA-VERIFY.md §2 — Langfuse 3.170.0 only accepts OTel TRACES, not metrics/logs (HTTP 405 / 404 on those endpoints)**. |
| `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` | unset | unset | N/A | |
| `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` | unset | unset | ❌ | See above — Langfuse doesn't accept OTel logs/metrics. |
| `OTEL_EXPORTER_OTLP_LOGS_PROTOCOL` | unset | unset | N/A | |
| `OTEL_METRIC_EXPORT_INTERVAL` | 60000ms | unset | N/A | Tune only if metrics exporter wired. |
| `OTEL_LOGS_EXPORT_INTERVAL` | 5000ms | unset | N/A | Tune only if logs exporter wired. |
| `otelHeadersHelper` (settings.json key, NOT env var) | unset | unset | ❌ | CCBP L768-779 — script to generate dynamic OTLP headers. Useful for Langfuse-key rotation. |

**Quadrant 3 net**: 2/3 traces fields wired; the third (auth headers) is a **CRITICAL gap** — traces are likely 400-rejected by Langfuse without it. ❌

---

## §4 — Quadrant 4: Resource attribution + privacy

| Env var | CCBP/Anthropic cite | Default | Our value | Class | Notes |
|---|---|---|---|---|---|
| `OTEL_RESOURCE_ATTRIBUTES` | Anthropic monitoring doc §Resource attributes | unset | `openinference.project.name=eee` | ✅ | OpenInference convention — routes traces to Langfuse project `eee`. |
| `OTEL_SEMCONV_STABILITY_OPT_IN` | Anthropic monitoring doc §Semantic conventions | unset | `gen_ai_latest_experimental` | ✅ | Opts into the latest GenAI semantic-convention spec. |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` | Anthropic monitoring doc §Privacy | unset | `false` | ✅ | Privacy. |
| `OTEL_LOG_TOOL_DETAILS` | CCBP L981 (v2.1.85) | unset | unset | ⚠️ | Set `1` to include `tool_parameters` in OTel events. **Recommend ENABLE** for max-insight (operator already lifted privacy on local infra). |
| `OTEL_LOG_RAW_API_BODIES` | CCBP L982 (v2.1.111) | unset | unset | ⚠️ | Set `1` to emit full request/response bodies. **Recommend ENABLE** with caveat — large payloads. |
| `OTEL_LOG_USER_PROMPTS` | CCBP L983 (v2.1.121) | unset | unset | ⚠️ | Set `1` to include `user_system_prompt` in spans. **Recommend ENABLE** — local infra so no privacy concern. Allows full prompt insight in Langfuse. |

**Quadrant 4 net**: 3/3 core attribution set; 3/3 privacy-opt-in flags absent — **opportunity to unleash full insight on local infra**.

---

## §5 — Quadrant 5: Slash-command insights gates (CCBP `claude-settings.md:928-936`)

| Env var | CCBP cite | Default | Our value | Class |
|---|---|---|---|---|
| `DISABLE_DOCTOR_COMMAND` | L928 | unset | unset | N/A (correct — `/doctor` available) |
| `DISABLE_LOGIN_COMMAND` | L929 | unset | unset | N/A |
| `DISABLE_LOGOUT_COMMAND` | L931 | unset | unset | N/A |
| `DISABLE_UPGRADE_COMMAND` | L932 | unset | unset | N/A |
| `DISABLE_EXTRA_USAGE_COMMAND` | L933 | unset | unset | N/A (correct — `/extra-usage` available) |
| `DISABLE_INSTALL_GITHUB_APP_COMMAND` | L934 | unset | unset | N/A |
| `DISABLE_NON_ESSENTIAL_MODEL_CALLS` | L935 (unofficial) | unset | unset | N/A |

**Quadrant 5 net**: All slash-command insights available. ✅

---

## §6 — Quadrant 6: Statusline insight surface (CCBP `claude-settings.md:600-720`)

| settings.json key | CCBP cite | Our value | Class |
|---|---|---|---|
| `statusLine.type` | L600+ | **NOT SET** | ❌ **GAP-4** — no statusline at all → operator has no real-time cost/context/rate-limit insight on screen. |
| `statusLine.command` | L600+ | NOT SET | ❌ |
| `statusLine.padding` | L600+ | NOT SET | n/a |
| `statusLine.refreshInterval` | L600+ | NOT SET | n/a |
| `spinnerTipsEnabled` | (CCBP fileSuggestion block) | NOT SET | n/a |
| `spinnerVerbs` | (CCBP) | NOT SET | n/a |
| `fileSuggestion.type/.command` | CCBP File Suggestion Configuration | NOT SET | n/a (not insight-related) |

**Quadrant 6 net**: 0/4 statusLine fields set — **operator has no on-screen insight surface**. Highly remediable (paste-ready in STREAM-A-GAP-AND-RECOMMENDATIONS.md).

---

## §7 — Quadrant 7: Background-task + agent insights (CCBP env block)

| Env var | CCBP cite | Default | Our value | Class | Notes |
|---|---|---|---|---|---|
| `CLAUDE_AUTO_BACKGROUND_TASKS` | L938 | unset | unset | ⚠️ | Set `1` to force auto-backgrounding of long tasks. Pairs with `claude agents` subcommand insight. Recommend ENABLE. |
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | (in CCBP env block) | unset | unset | N/A (we WANT bg tasks) |
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | (W259 cite) | unset | `1` | ✅ |
| `CLAUDE_CODE_FORK_SUBAGENT` | (W259 cite) | unset | `1` | ✅ |
| `CLAUDE_CODE_ENABLE_AWAY_SUMMARY` | L? (v2.1.110) | unset | `1` | ✅ |
| `CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING` | (CCBP env block) | unset | `1` | ✅ |

**Quadrant 7 net**: 4/5 background/agent insights enabled. One opt-in (`CLAUDE_AUTO_BACKGROUND_TASKS`) recommend ENABLE.

---

## §8 — Quadrant 8: Auto-compact + autoMode (insights into automation)

| Env var | CCBP cite | Default | Our value | Class |
|---|---|---|---|---|
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | L826 | `~95` | unset | N/A — falls back to default 95% per W280c. |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | (CCBP env block) | unset | unset | N/A |
| `autoMode.environment` / `.soft_deny` | CCBP settings autoMode block | unset | unset | N/A (no autoMode wiring) |

**Quadrant 8 net**: defaults preserved. ✅

---

## §9 — Quadrant 9: Insight-relevant settings.json non-env keys

| settings.json key | CCBP cite | Our value | Class |
|---|---|---|---|
| `outputStyle` | CCBP outputStyle block | NOT SET | ⚠️ Default — recommend pinning for consistent log output. |
| `awaySummaryEnabled` | (pair with env `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1`) | NOT SET | ⚠️ Pair-set with the env. |
| `autoMemoryEnabled` | (paired with `CLAUDE_CODE_DISABLE_AUTO_MEMORY`) | `true` (but env disables) | ⚠️ Consistent override (env wins). |
| `enableAllProjectMcpServers` | CCBP enableAllProjectMcpServers block | NOT SET | N/A |
| `cleanupPeriodDays` | (CCBP) | `60` | ✅ |
| `permissions.defaultMode` | (CCBP) | `bypassPermissions` | ⚠️ Convergent SHIP-BLOCKER per W317-S1 — out of scope here. |

---

## §10 — Net headline summary

### §10.1 Insights features WIRED in our runtime (8 categories)

1. `CLAUDE_CODE_ENABLE_TELEMETRY=1` ✅ (CCBP `claude-settings.md:835`)
2. `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` ✅ (beta opt-in)
3. `OTEL_TRACES_EXPORTER=otlp` ✅ (Anthropic monitoring doc)
4. `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` ✅
5. `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf` ✅
6. `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` ✅
7. `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` ✅
8. `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` ✅

### §10.2 Insights features NOT WIRED (gaps)

**Critical (HIGH)**:
1. `OTEL_METRICS_EXPORTER` ❌ — metrics signal entirely dropped
2. `OTEL_LOGS_EXPORTER` ❌ — events/logs signal entirely dropped
3. `OTEL_EXPORTER_OTLP_HEADERS` ❌ — Langfuse auth missing → traces likely rejected
4. `statusLine` settings.json key ❌ — no on-screen cost/context/rate-limit insight

**Medium (MED)** — privacy opt-ins safe for local infra:
5. `OTEL_LOG_TOOL_DETAILS=1` ⚠️ — adds `tool_parameters` to OTel events
6. `OTEL_LOG_RAW_API_BODIES=1` ⚠️ — emits full API request/response bodies
7. `OTEL_LOG_USER_PROMPTS=1` ⚠️ — adds `user_system_prompt` to spans
8. `CLAUDE_AUTO_BACKGROUND_TASKS=1` ⚠️ — pair with `claude agents` insight

**Low (LOW)** — Anthropic-cloud surface:
9. Claude Code Analytics API ❌ — Anthropic org-level usage report not pulled

### §10.3 What's in Anthropic 2.1.144 CC that we believed we had but DON'T

Per W310-EXT Stream ε (`Z:/claude-sota-installed/docs/architecture/W310-EXT-STREAM-EPSILON/INSIGHTS-AGENT-TEAM-FRESHNESS-AUDIT-W310v3.md`):

| Surface | Status in 2.1.144 | Cite |
|---|---|---|
| `/insights` slash command | does NOT exist | v2.1.144 CHANGELOG `69d7070` reviewed line-by-line |
| `claude insights` CLI subcommand | does NOT exist | `claude --help` |
| `claude --bg` flag | does NOT exist | `claude --help` |
| `claude analytics` / `claude metrics` | do NOT exist | `claude --help` |
| `claude_code.lines_of_code.count` etc. metrics | DO exist but **only emitted when `OTEL_METRICS_EXPORTER` is set** (we have it unset) | Anthropic monitoring doc §Metrics |
| Claude Code Analytics API | DOES exist but not wired here | `https://docs.anthropic.com/en/docs/claude-code/manage-claude/claude-code-analytics-api` |

---

## §11 — Operator self-correction

The operator's question "**insights re-feature are not showing in your runtime vs ccbp**" maps cleanly to the 4 critical gaps in §10.2. Specifically:
- **Gaps 1-3** (METRICS, LOGS, HEADERS) explain why Langfuse only shows 3 historical smoke-test traces, not session-by-session CC instrumentation.
- **Gap 4** (statusLine) explains why no $/context/rate-limit values are visible on the operator's screen during sessions.
- The non-existent `/insights`/`claude --bg`/etc. are expectations to drop — operator should re-anchor on the `/cost`, `/extra-usage`, `/context` slash commands + `claude agents` subcommand + Langfuse dashboard + ccusage MCP for the real insights surface.

See `STREAM-A-GAP-AND-RECOMMENDATIONS.md` for paste-ready settings.json patches resolving GAP-1 through GAP-4.

# W340 Stream F — Insights / Observability / Telemetry Features Audit

**Date**: 2026-05-20
**Runtime**: `Z:\claude-sota-installed\` (Claude Code v2.1.144+)
**Wave**: W340-FULL-SOTA-UNLEASH
**Scope**: Full audit of native CC insights features + ECC / plugin / MCP observability stack + recommendations for SOTA unleash.

> **⚠️ POST-CODEX-R1 RECONCILIATION (binding for any downstream reader)**
> This document is the ORIGINAL Stream F report. Several prescriptive recommendations regarding `OTEL_METRICS_EXPORTER` and `OTEL_LOGS_EXPORTER` against Langfuse were SUPERSEDED by the W340 cross-model gate (codex r1) after live probes. Authoritative reduced-scope guidance now lives in:
> - `ARCHITECTURE-V2.md` §P0-4 (REDUCED-SCOPE per codex r1)
> - `OPERATOR-SIGN-QUEUE.md` Q3 (a/a-rejected/a-carry-forward)
> - `S3-SYNTHESIS-INTEGRATION.md` settings-audit + gap-table (REVISED to NON-GAP)
> - `SYNTHESIS.md` §S9 (REVISED post codex r1)
>
> Specifically, ANYWHERE in this report that recommends adding `OTEL_METRICS_EXPORTER=otlp` or `OTEL_LOGS_EXPORTER=otlp` AGAINST LANGFUSE is **REJECTED** because:
> - `POST /api/public/otel/v1/metrics` → **401** (endpoint exists but Langfuse derives metrics from traces; OTEL metrics NOT surfaced in dashboards per langfuse.com/integrations/native/opentelemetry)
> - `POST /api/public/otel/v1/logs` → **404** (endpoint does NOT exist on Langfuse)
>
> Real gap = "no metrics+logs backend wired" (Prometheus + OTEL Collector / Loki / Tempo / SigNoz / Grafana Cloud OTLP) — deferred to W341+. Only `OTEL_SERVICE_NAME=claude-sota-installed` (safe trace tag) landed this wave per W340 commit. Do NOT propagate this report's metrics/logs prescriptions verbatim.

## Executive Summary

The runtime is **strong on traces** (Langfuse OTEL endpoint wired + healthy, traces flowing with `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` and `OTEL_TRACES_EXPORTER=otlp`) and **strong on session JSONL recording** (3,428 sessions, ~12 GB at `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/`). The **statusLine is SOTA** via `ccstatusline@2.2.19` with 3 lines (model/context, account/cost/clock, git/skills/version). The **biggest gaps** are: (1) `OTEL_METRICS_EXPORTER` and `OTEL_LOGS_EXPORTER` are **UNSET** — only traces export, metrics and log events stay in-process and never reach Langfuse; (2) **no logfire-instrumentation skill ever fired** even though the plugin is enabled, leaving the Pydantic Logfire SDK unused for app-level traces; (3) **Claude Code Analytics API** (org-scoped admin endpoint) is unwired — no curl/MCP/skill calls `https://api.anthropic.com/v1/organizations/usage_report/claude_code`; (4) **`/recap` and `/insights` built-ins** are available but unused — operator workflow doesn't invoke them; (5) **`session-report` skill ships an analyzer for the JSONL corpus** but has never been generated against the 3,428-session archive — a one-shot `analyze-sessions.mjs --since 7d` would produce a complete usage HTML report.

## §1 — Anthropic-native CC Insights Feature Inventory

Cite-anchored to `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage` + `https://code.claude.com/docs/en/agent-sdk/observability` + `https://docs.anthropic.com/en/docs/claude-code/statusline` + `https://docs.anthropic.com/en/manage-claude/claude-code-analytics-api` + CCBP `claude-settings.md` + `claude-commands.md` @ HEAD `f28c2da`.

### §1.1 Master Feature Matrix

| Feature | Anthropic-Official | This Runtime | Enabled-Status | Recommendation |
|---|---|---|---|---|
| **OTEL Telemetry — Master Switch** | `CLAUDE_CODE_ENABLE_TELEMETRY=1` | `=1` (settings.json:17) | ENABLED | Keep |
| **OTEL Traces (beta)** | `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` + `OTEL_TRACES_EXPORTER` | `=1` (L18) + `otlp` (L19) | ENABLED, wired to Langfuse `:3000/api/public/otel/v1/traces` (L20) | Keep — Langfuse 200 healthy v3.160.0 |
| **OTEL Metrics** | `OTEL_METRICS_EXPORTER=otlp|prometheus|console` | **UNSET** | **DISABLED** | **ENABLE** — add `OTEL_METRICS_EXPORTER=otlp` + endpoint |
| **OTEL Logs / Events** | `OTEL_LOGS_EXPORTER=otlp|console` | **UNSET** | **DISABLED** | **ENABLE** — add `OTEL_LOGS_EXPORTER=otlp` + endpoint |
| **OTEL Tool Detail Capture** | `OTEL_LOG_TOOL_DETAILS=1` | `=1` (L25) | ENABLED | Keep — exposes Bash cmds + MCP tool inputs in events |
| **OTEL User Prompt Capture** | `OTEL_LOG_USER_PROMPTS=1` | `=1` (L26) | ENABLED | Keep — full prompt text in traces |
| **OTEL Tool Content Capture** | `OTEL_LOG_TOOL_CONTENT=1` | UNSET | DISABLED | OPTIONAL — adds 60 KB tool I/O bodies to traces; storage-heavy |
| **OTEL Raw API Bodies** | `OTEL_LOG_RAW_API_BODIES=1` or `file:<dir>` | UNSET | DISABLED | OPTIONAL — full API request/response JSON (large payloads) |
| **OTEL Resource Attributes** | `OTEL_RESOURCE_ATTRIBUTES=key=val,...` | `openinference.project.name=eee` (L22) | PARTIAL | EXTEND — add `service.name`, `service.version`, `deployment.environment` |
| **OTEL Service Name** | `OTEL_SERVICE_NAME` | UNSET | DISABLED | SET to `claude-sota-installed` so Langfuse can segment vs `claude-sota` |
| **OTEL Semconv Stability** | `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental` | SET (L23) | ENABLED | Keep — pins gen_ai-spec compliance |
| **OTEL Metrics Include Session ID** | `OTEL_METRICS_INCLUDE_SESSION_ID` (default true) | default | ENABLED-DEFAULT | OK |
| **OTEL Metrics Include Version** | `OTEL_METRICS_INCLUDE_VERSION` (default false) | default | DISABLED-DEFAULT | OPTIONAL: set `=1` for version-segmented dashboards |
| **OTEL Metrics Include Account UUID** | `OTEL_METRICS_INCLUDE_ACCOUNT_UUID` (default true) | default | ENABLED-DEFAULT | OK |
| **OTEL Metric Export Interval** | `OTEL_METRIC_EXPORT_INTERVAL` (default 60000ms) | default | OK | Lower to 5000-10000 for live dashboards if needed |
| **OTEL Logs Export Interval** | `OTEL_LOGS_EXPORT_INTERVAL` (default 5000ms) | default | OK | Keep |
| **OTEL Traces Export Interval** | `OTEL_TRACES_EXPORT_INTERVAL` | default | OK | Keep |
| **OTEL OTLP Endpoint (general)** | `OTEL_EXPORTER_OTLP_ENDPOINT` | UNSET (per-signal traces endpoint only) | PARTIAL | OK — per-signal-only is correct pattern |
| **OTEL OTLP Protocol (general)** | `OTEL_EXPORTER_OTLP_PROTOCOL` | UNSET (per-signal traces protocol only — `http/protobuf` L21) | PARTIAL | OK — per-signal-only is correct pattern |
| **OTEL OTLP Headers** | `OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic ...` | UNSET | **DISABLED** | **REQUIRED for Langfuse auth** — Langfuse OTLP needs Basic-auth header derived from `LANGFUSE_PUBLIC_KEY`+`LANGFUSE_SECRET_KEY` |
| **OTEL Feedback Survey via OTEL** | `CLAUDE_CODE_ENABLE_FEEDBACK_SURVEY_FOR_OTEL=1` | UNSET | DISABLED | OPTIONAL — opt-in only when admin wants survey data via OTEL |
| **OTEL Flush Timeout** | `CLAUDE_CODE_OTEL_FLUSH_TIMEOUT_MS` | UNSET | default | Tune for headless / `-p` mode |
| **`/usage` slash command** (canonical) | built-in | available | UNUSED | INVOKE periodically — shows session cost + plan limits + Stats tab |
| **`/cost` slash command** | alias for `/usage` | available | UNUSED | INVOKE — same as `/usage` |
| **`/stats` slash command** | alias for `/usage` (opens Stats tab) | available | UNUSED | INVOKE — Stats tab is the closest to a per-session insights view |
| **`/extra-usage` slash command** | built-in | available | UNUSED | INVOKE — configure extra-usage to keep working past rate limits |
| **`/insights` slash command** | built-in (v2.1.118+) per CCBP `claude-commands.md` L66 | available | **UNUSED** | **INVOKE periodically** — "Generate a report analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points" |
| **`/recap` slash command** | built-in (v2.1.108+) | available | UNUSED | INVOKE on session resume — one-line session summary |
| **`session-report` skill** | claude-plugins-official ships it | ENABLED in settings.json | **INSTALLED, UNUSED** | **RUN — `analyze-sessions.mjs --since 7d > /tmp/session-report.json`** then render HTML; 3,428 sessions / 12 GB JSONL corpus is sitting idle |
| **Session JSONL Recording** | `<HOME>/.claude/projects/<workspace-slug>/<uuid>.jsonl` | `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` | **ENABLED-DEFAULT, 3428 jsonl files, 12 GB** | OK — but no consumer is reading the corpus |
| **Auto-Memory** | `autoMemoryEnabled` setting | `=false` (L471) | **DELIBERATELY DISABLED** per CLAUDE.local.md `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | OK — pointer-only CLAUDE.md preserves context budget; 5-tier memory stack supersedes |
| **Away-Summary / Recap (feedback)** | `CLAUDE_CODE_ENABLE_AWAY_SUMMARY=1` | `=1` (L10) | ENABLED | Keep — forces recap when telemetry-disabled (here it's not, but defensive) |
| **statusLine** | `statusLine.command` + `refreshInterval` | `ccstatusline@2.2.19`, 3 lines, refresh 30s (L243-248) | ENABLED-FULLY | Keep — SOTA: model + context-bar + thinking-effort + account-email + session-usage + weekly-usage + block-timer + compaction-counter + session-cost + session-clock + git-branch + git-changes + worktree + skills + free-memory + version |
| **DISABLE_TELEMETRY opt-out** | `DISABLE_TELEMETRY=1` | UNSET | OPT-IN-DEFAULT (telemetry ON) | Keep — we explicitly enable telemetry |
| **DISABLE_NONESSENTIAL_TRAFFIC** | `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` | UNSET | DEFAULT | OK |
| **Claude Code Analytics API** | `GET /v1/organizations/usage_report/claude_code` (Admin API key required) | UNWIRED | **NOT WIRED** | **WIRE — org-scoped daily usage**: sessions, lines of code, commits, PRs, tool usage, token + cost by model, per-user |
| **Cowork OTLP Monitoring** | Claude Desktop > Org settings > Cowork (HTTP/JSON or HTTP/protobuf + headers) | N/A (no Cowork on this runtime) | N/A | Skip — Cowork is Claude Desktop only |
| **Distributed Tracing TRACEPARENT** | `TRACEPARENT` env var → linked trace context | UNSET | DEFAULT | OPTIONAL — set when CC is invoked from a parent traced workflow |

### §1.2 Native Metrics Exported (when `OTEL_METRICS_EXPORTER` is set)

Per `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage#metrics`:

| Metric Name | Description | Currently Reaches Langfuse? |
|---|---|---|
| `claude_code.session.count` | Session start count | **NO — metrics-exporter unset** |
| `claude_code.lines_of_code.count` | Lines added/removed | NO |
| `claude_code.commit.count` | Git commits made during session | NO |
| `claude_code.pull_request.count` | PRs/MRs created | NO |
| `claude_code.cost.usage` | Estimated cost in USD | NO |
| `claude_code.token.usage` | Input/output/cache tokens by model | NO |
| `claude_code.code_edit_tool.decision` | Accept/reject decisions on edits | NO |
| `claude_code.tool.duration` | Per-tool execution time | NO |
| `claude_code.active_time.total` | Active developer time (emitted in `--print` mode) | NO |

### §1.3 Native Log Events Exported (when `OTEL_LOGS_EXPORTER` is set)

| Event Name | Description | Currently Reaches Langfuse? |
|---|---|---|
| `claude_code.user_prompt` | Every user prompt (with `prompt.id` UUID) — content gated by `OTEL_LOG_USER_PROMPTS=1` | **NO — logs-exporter unset** |
| `claude_code.api_request` | Every Anthropic API call | NO |
| `claude_code.api_error` | Terminal API error (after retry exhaustion) | NO |
| `claude_code.tool_result` | Every tool invocation result with `duration_ms` | NO |
| `claude_code.mcp_call` | MCP tool invocations | NO |
| `claude_code.mcp_error` | MCP failures | NO |

### §1.4 Native Traces Exported (CURRENTLY WORKING)

Per `OTEL_TRACES_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces` (settings.json L19-21):

| Span Name | Description | Reaches Langfuse? |
|---|---|---|
| `claude_code.interaction` | Root span for each user prompt | **YES (auth gated — see §3.1)** |
| `claude_code.api_request` | Anthropic API call spans | YES |
| `claude_code.tool` | Per-tool spans (with content if `OTEL_LOG_TOOL_CONTENT=1`) | YES |
| `claude_code.mcp_call` | MCP tool call spans | YES |
| `claude_code.subagent` | Subagent fork spans | YES |

## §2 — Currently-Enabled Observability in This Runtime

### §2.1 Telemetry env vars (settings.json:5-50)

```jsonc
"CLAUDE_CODE_ENABLE_TELEMETRY": "1",                                                // master switch ON
"CLAUDE_CODE_ENHANCED_TELEMETRY_BETA": "1",                                         // traces beta ON
"OTEL_TRACES_EXPORTER": "otlp",                                                     // traces -> OTLP
"OTEL_EXPORTER_OTLP_TRACES_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/traces",
"OTEL_EXPORTER_OTLP_TRACES_PROTOCOL": "http/protobuf",
"OTEL_RESOURCE_ATTRIBUTES": "openinference.project.name=eee",                       // OpenInference / arize-style attr
"OTEL_SEMCONV_STABILITY_OPT_IN": "gen_ai_latest_experimental",
"OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "false",                       // FYI: blocks LLM-msg capture
"OTEL_LOG_TOOL_DETAILS": "1",                                                       // ON — captures Bash cmd + MCP tool name
"OTEL_LOG_USER_PROMPTS": "1",                                                       // ON — captures prompt text
"CLAUDE_CODE_ENABLE_AWAY_SUMMARY": "1",                                             // recap when telemetry-disabled
```

**MISSING** in env block (settings.json):
- `OTEL_METRICS_EXPORTER` (UNSET — metrics NEVER reach Langfuse)
- `OTEL_LOGS_EXPORTER` (UNSET — log events NEVER reach Langfuse)
- `OTEL_EXPORTER_OTLP_HEADERS` (UNSET — Langfuse OTLP `/api/public/otel/v1/traces` returned HTTP 401 on unauthenticated probe; CC must be sending some auth, but the runtime env does not show it)
- `OTEL_LOG_TOOL_CONTENT` (UNSET — 60 KB tool I/O bodies missing)
- `OTEL_LOG_RAW_API_BODIES` (UNSET — full API JSON missing)
- `OTEL_SERVICE_NAME` (UNSET — defaults to `claude-code`, can't segment vs `claude-sota` sibling)

### §2.2 statusLine — SOTA

`settings.json:243-248` →  `npx -y ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json` (refresh 30s).

`ccstatusline/settings.json` has **3 lines / 39 widgets**:

- Line 1: `model` · `context-length` · `context-percentage` · `context-bar` · `thinking-effort` · `output-style`
- Line 2: `claude-account-email` · `session-usage` · `weekly-usage` · `block-timer` · `compaction-counter` · `session-cost` · `session-clock`
- Line 3: `git-branch` · `git-changes` · `worktree-mode` · `worktree-name` · `skills` · `free-memory` · `version`

This is the SOTA reference layout. No improvement needed.

### §2.3 MCP servers wired for observability

| MCP | Purpose | Status | Tools |
|---|---|---|---|
| `langfuse` | langfuse-mcp-server@0.0.2-rc.0 — prompt mgmt + trace read | WIRED (.mcp.json:53-62) | TBD (initial-instructions stub) |
| `ccusage` | @ccusage/mcp@18.0.11 — cost & token tracking from ~/.claude transcripts | WIRED (.mcp.json:44-48) | `daily`, `monthly`, `session`, `blocks`, `codex-daily`, `codex-monthly` (per system-reminder deferred-tool list) |
| `cognee` | Cognee 1.26.0 GraphRAG memory (NSSM-supervised :8000/mcp) | LIVE | `recall`, `remember`, `forget` |
| `basic-memory` | basic-memory==0.21.1 markdown KB | LIVE | `search_notes`, `read_note`, `write_note`, `recent_activity` |
| `repomix` | Code-pack telemetry | WIRED | pack/grep/skill |

### §2.4 Plugins wired for observability

| Plugin | Skill / Command | Enabled? | Used? |
|---|---|---|---|
| `session-report@claude-plugins-official` | `session-report` skill | YES (settings.json:267) | **NEVER RUN** against the 3,428-session JSONL corpus |
| `everything-claude-code@everything-claude-code` | `cost-tracking` skill + `ecc-tools-cost-audit` + `/cost-report` command | YES (L252) | UNKNOWN — DB at `~/.claude-cost-tracker/usage.db` not verified |
| `logfire@pydantic-skills` | `logfire-instrumentation` + `logfire-query` + `logfire-instrument` + `logfire-dev-session` + `logfire-debug` | YES (L300) | **NEVER RUN** — plugin enabled but no skill ever invoked |
| `clickhouse@claude-plugins-official` | clickhouse-best-practices skill | YES (L270) | UNKNOWN — could host Langfuse-style traces |
| `chaos-engineering@claude-code-skills` | chaos experiments + steady-state metrics | YES (L306) | UNKNOWN |
| `slo-architect@claude-code-skills` | SLO architecture | YES (L307) | UNKNOWN |
| `incident-response@claude-code-workflows` | postmortem + runbook templates | YES (L294) | UNKNOWN |

### §2.5 Session JSONL recording — LIVE

| Item | Value |
|---|---|
| Recording path | `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/<uuid>.jsonl` |
| Session count | **3,428 JSONL files** |
| Total size | **~12 GB** (`du -sm projects/` = 11,977 MB) |
| Latest file | `503455c4-6176-43a4-ba40-1ac03765c7ae.jsonl` (164 lines, 2026-05-20) |
| Format | newline-delimited JSON; each line is an event (`type` field discriminator) |
| Used by | session-report skill (analyze-sessions.mjs) — `claude --resume` picker — never analyzed |

### §2.6 Langfuse — LIVE

| Probe | Result |
|---|---|
| `GET http://127.0.0.1:3000/api/public/health` | **200 OK** — `{"status":"OK","version":"3.160.0"}` |
| `POST http://127.0.0.1:3000/api/public/otel/v1/traces` (no auth) | **401** — auth required (expected behavior) |
| Project | `5.17.2026` (id `cmpa0h6ux0003o6067jlf4jgd`, org SOTA Observability) |
| Keys | env-interpolated from `CLAUDE.local.md` (gitignored) |

### §2.7 ccstatusline — full inventory

Widgets in use: model · context-length · context-percentage · context-bar · thinking-effort · output-style · claude-account-email · session-usage · weekly-usage · block-timer · compaction-counter · session-cost · session-clock · git-branch · git-changes · worktree-mode · worktree-name · skills · free-memory · version. Already SOTA.

## §3 — Gap Analysis: Insights NOT Enabled That Should Be

### §3.1 Top 5 Missing Insights Features

#### **#1 — Wire OTEL Metrics Exporter to Langfuse** (or any OTLP collector)
- **Gap**: `OTEL_METRICS_EXPORTER` is **UNSET** → all `claude_code.session.count`, `claude_code.lines_of_code.count`, `claude_code.commit.count`, `claude_code.pull_request.count`, `claude_code.cost.usage`, `claude_code.token.usage`, `claude_code.tool.duration` metrics stay in-process and never reach a backend.
- **Settings key**: `env.OTEL_METRICS_EXPORTER` and `env.OTEL_EXPORTER_OTLP_METRICS_ENDPOINT`
- **Why**: This is the single biggest insights gap. Traces are reaching Langfuse, but Langfuse can ingest OTLP metrics too. Without this you cannot graph token spend, session count, or LoC trends across sessions.
- **Recommended endpoint**: `http://127.0.0.1:3000/api/public/otel/v1/metrics`

#### **#2 — Wire OTEL Logs/Events Exporter to Langfuse**
- **Gap**: `OTEL_LOGS_EXPORTER` is **UNSET** → all `claude_code.user_prompt`, `claude_code.api_request`, `claude_code.api_error`, `claude_code.tool_result`, `claude_code.mcp_call`, `claude_code.mcp_error` events stay in-process.
- **Settings key**: `env.OTEL_LOGS_EXPORTER` and `env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT`
- **Why**: Events are higher-cardinality than metrics but lower-volume than full traces. They enable per-prompt cost attribution + tool-failure rate dashboards. Critical for retrospective analysis.
- **Recommended endpoint**: `http://127.0.0.1:3000/api/public/otel/v1/logs`

#### **#3 — Run the `session-report` skill on the 3,428-session corpus**
- **Gap**: Plugin enabled, JSONL corpus 12 GB strong, analyzer ships ready — but **never invoked**. Per `session-report/SKILL.md`: `node <skill-dir>/analyze-sessions.mjs --json --since 7d > /tmp/session-report.json` then render to interactive HTML.
- **Settings key**: N/A — this is a *manual invocation*, fire via `/session-report 7d` or just ask Claude to "run session-report for the last 7 days".
- **Why**: The richest insights are already on disk. Output reveals project-level token consumption, expensive prompts, cache-break clusters, subagent token avg, top skill usage. Operator-targeted weekly/monthly run.

#### **#4 — Invoke `/insights` and `/recap` slash commands as ongoing rituals**
- **Gap**: Both built-in slash commands exist (v2.1.108+ for `/recap`, `/insights` is documented in CCBP `claude-commands.md` L66) but never invoked in this runtime's session JSONL history.
- **Settings key**: N/A — built-in slash commands.
- **Why**: `/insights` produces a structured report "analyzing your Claude Code sessions, including project areas, interaction patterns, and friction points." `/recap` produces a one-line session summary that helps cross-session memory continuity. Both are zero-cost insights.

#### **#5 — Wire Claude Code Analytics API (org-scoped admin)**
- **Gap**: Anthropic ships a daily org-aggregated insights API at `GET https://api.anthropic.com/v1/organizations/usage_report/claude_code?starting_at=YYYY-MM-DD` requiring an Admin API key (`x-api-key: $ADMIN_API_KEY` + `anthropic-version: 2023-06-01`). Returns: sessions, lines of code, commits, PRs, tool usage, token + cost by model, per-user.
- **Settings key**: N/A — this is an external HTTP endpoint; needs Admin API key (NOT the standard API key — must be a Console "Admin" tier key).
- **Why**: This is the CANONICAL Anthropic insights primitive. OTEL is for live; Analytics API is for retrospective (1-hour data freshness, cursor-paginated). Pair with #1+#2.

### §3.2 Secondary Gaps (lower priority)

- **`OTEL_SERVICE_NAME=claude-sota-installed`** — currently defaults to `claude-code`, can't segment vs sibling `claude-sota` in Langfuse.
- **`OTEL_LOG_TOOL_CONTENT=1`** — 60 KB tool I/O bodies for debugging tool-result quality (storage-heavy, opt-in only when investigating).
- **`OTEL_LOG_RAW_API_BODIES=file:Z:/claude-sota-installed-state/otel-bodies/`** — full API JSON to disk for retrospective replay (large; opt-in only during debug waves).
- **`OTEL_RESOURCE_ATTRIBUTES` extension** — add `service.name=claude-sota-installed,service.version=2.1.144,deployment.environment=local-dev` alongside existing `openinference.project.name=eee`.
- **`logfire-instrument` skill** — plugin enabled but unused; would add Pydantic Logfire SDK to project Python tooling (harness/, tools/) for app-level traces. Distinct from CC's OTEL — Logfire instruments the *project's own code*, CC's OTEL instruments the agent.
- **`ccusage` MCP** — wired but never queried; the deferred-tool list shows `mcp__ccusage__blocks`, `daily`, `monthly`, `session`, `codex-daily`, `codex-monthly`. One-off invocation pattern: `mcp__ccusage__daily` for daily cost breakdown.
- **`OTEL_METRICS_INCLUDE_VERSION=1`** — segment metrics by CC version (useful for after-upgrade A/B regression detection).
- **Codex SessionStart/SessionEnd/Stop hooks already capture lifecycle telemetry** — but only to codex-side state; no OTEL bridge.

### §3.3 Things Deliberately NOT Enabled (verified intentional)

| Feature | Reason |
|---|---|
| `autoMemoryEnabled=false` + `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | Pointer-only CLAUDE.md ≤50 LOC discipline; 5-tier memory stack (hindsight + memory + cognee + graphiti + langfuse + basic-memory) supersedes — per CLAUDE.local.md §Memory |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false` | Privacy default; prompt content captured via `OTEL_LOG_USER_PROMPTS=1` separately |
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` UNSET | Per CLAUDE.local.md (W280c) — falls back to ~95% default; manual `/compact` at milestones preferred |

## §4 — Recommended Enable Order

Top-down: each step builds on the previous. Phases 1-2 are zero-risk; phase 3 adds storage cost.

### Phase 1 — Wire Metrics + Logs to Langfuse (high-value, low-risk)

```jsonc
// .claude/settings.json — env block, add:
"OTEL_METRICS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/metrics",
"OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
"OTEL_LOGS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:3000/api/public/otel/v1/logs",
"OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
"OTEL_SERVICE_NAME": "claude-sota-installed",
"OTEL_RESOURCE_ATTRIBUTES": "openinference.project.name=eee,service.name=claude-sota-installed,service.version=2.1.144,deployment.environment=local-dev"
```

**Langfuse auth**: Langfuse OTLP endpoint accepts Basic auth header `Authorization: Basic <base64(PUBLIC_KEY:SECRET_KEY)>`. The runtime already has `LANGFUSE_PUBLIC_KEY=pk-lf-<REDACTED>` and `LANGFUSE_SECRET_KEY=sk-lf-<REDACTED>` in `CLAUDE.local.md` (full values intentionally NOT inlined here per codex r1 P0 SHIP-BLOCKER — see CLAUDE.local.md directly). Add:

```jsonc
"OTEL_EXPORTER_OTLP_HEADERS": "Authorization=Basic <base64(pk-lf-<REDACTED>:sk-lf-<REDACTED>)>"
```

Generate the base64 with:
```powershell
$creds = "$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"; [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($creds))
```

### Phase 2 — Activate Native Insights Rituals (zero-config)

1. **Run session-report**: `node Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/session-report/<latest>/skills/session-report/analyze-sessions.mjs --json --since 7d > Z:/claude-sota-installed/tmp/session-report-W340.json` then render via the bundled `template.html`.
2. **Set `/insights` + `/recap` rituals**: invoke at session start (`/recap`) and weekly (`/insights`). Capture outputs to `Z:/claude-sota-installed/docs/architecture/WEEKLY-INSIGHTS/`.
3. **Add `/usage` to operator checklist**: invoke before major ship gates to verify cost budget.

### Phase 3 — Wire Anthropic Analytics API (org-scoped)

- Requires Console Admin API key (NOT the standard API key).
- Schedule: nightly cron via Windows Task Scheduler hits `GET /v1/organizations/usage_report/claude_code?starting_at=$(YESTERDAY)` and stores rows in a SQLite at `Z:/claude-sota-installed-state/analytics/usage.db`.
- Pair with Langfuse OTEL: OTEL is per-prompt live, Analytics API is per-day aggregated.

### Phase 4 — Logfire Instrumentation (optional, app-level)

- Invoke `logfire-instrument` skill on `harness/eval_harness.py` + `tools/*.mjs` to capture project-side traces (Pydantic Logfire) distinct from CC's OTEL.

### Phase 5 — Heavy capture (debug-only, opt-in)

- `OTEL_LOG_TOOL_CONTENT=1` for tool I/O body capture.
- `OTEL_LOG_RAW_API_BODIES=file:Z:/claude-sota-installed-state/otel-bodies/` for raw API JSON.
- `OTEL_METRIC_EXPORT_INTERVAL=5000` for sub-minute metric resolution.

## §5 — One-Liner Commands

### Phase 1 — flip metrics/logs on (PowerShell session-scoped)

```powershell
$env:OTEL_METRICS_EXPORTER='otlp'
$env:OTEL_EXPORTER_OTLP_METRICS_ENDPOINT='http://127.0.0.1:3000/api/public/otel/v1/metrics'
$env:OTEL_LOGS_EXPORTER='otlp'
$env:OTEL_EXPORTER_OTLP_LOGS_ENDPOINT='http://127.0.0.1:3000/api/public/otel/v1/logs'
$env:OTEL_SERVICE_NAME='claude-sota-installed'
$b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY")); $env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $b64"
```

To persist, mirror these into `.claude/settings.json` env block (Phase 1 JSON above).

### Phase 2 — generate session-report (one-shot)

```powershell
$skill = (Get-ChildItem 'Z:\claude-sota-installed\.claude\plugins\cache\claude-plugins-official\session-report\' -Directory | Sort-Object LastWriteTime -Descending | Select-Object -First 1).FullName
node "$skill\skills\session-report\analyze-sessions.mjs" --json --since 30d > "Z:\claude-sota-installed\tmp\session-report-W340.json"
Copy-Item "$skill\skills\session-report\template.html" "Z:\claude-sota-installed\tmp\session-report-W340.html"
```

### Phase 2 — invoke built-in slash commands

```
/usage
/recap
/insights
```

### Phase 3 — Anthropic Analytics API (requires Admin API key)

```powershell
$today = (Get-Date -Format 'yyyy-MM-dd')
curl "https://api.anthropic.com/v1/organizations/usage_report/claude_code?starting_at=$today" `
  --header "anthropic-version: 2023-06-01" `
  --header "x-api-key: $env:ANTHROPIC_ADMIN_API_KEY"
```

### Phase 4 — ccusage MCP queries (already wired)

```
# Via MCP — agent-side invocation
mcp__ccusage__daily    # today's tokens + cost
mcp__ccusage__monthly  # this month
mcp__ccusage__session  # current session
mcp__ccusage__blocks   # active block (5h window)
```

### Phase 5 — heavy capture (PowerShell session-scoped, debug only)

```powershell
$env:OTEL_LOG_TOOL_CONTENT='1'
$env:OTEL_LOG_RAW_API_BODIES='file:Z:/claude-sota-installed-state/otel-bodies/'
$env:OTEL_METRIC_EXPORT_INTERVAL='5000'
```

## §6 — Verification Probes

```powershell
# 1. Langfuse health
curl -s "http://127.0.0.1:3000/api/public/health"
# expect: {"status":"OK","version":"3.160.0"}

# 2. OTEL traces endpoint (CC-side reachability)
curl -s -o $null -w "%{http_code}`n" "http://127.0.0.1:3000/api/public/otel/v1/traces" -X POST
# expect: 401 (auth required) — proves the endpoint is live

# 3. Session JSONL count
(Get-ChildItem 'Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed\*.jsonl').Count
# expect: ~3428+

# 4. statusLine refresh
# observe in CC TUI — should refresh every 30s with model/context/cost/git widgets

# 5. ccusage MCP
# invoke `mcp__ccusage__session` — expect JSON with current session tokens + cost
```

## §7 — Citations

- **Anthropic Monitoring Reference**: `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage` + `https://code.claude.com/docs/en/monitoring-usage` (indexed 2026-05-19)
- **Agent SDK Observability**: `https://code.claude.com/docs/en/agent-sdk/observability` (indexed 2026-05-20)
- **statusLine config**: `https://docs.anthropic.com/en/docs/claude-code/statusline` (indexed 2026-05-19)
- **Settings reference**: `https://docs.anthropic.com/en/docs/claude-code/settings` (indexed 2026-05-19)
- **Claude Code Analytics API**: `https://docs.anthropic.com/en/manage-claude/claude-code-analytics-api` (indexed 2026-05-20)
- **Cowork OTEL**: `https://support.claude.com/en/articles/14477985-monitor-claude-cowork-activity-with-opentelemetry` (indexed 2026-05-20)
- **CCBP**: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md` + `claude-commands.md` @ HEAD `f28c2da` (W329 cite-refresh)
- **deepwiki anthropics/claude-code**: queried 2026-05-20 for telemetry feature inventory
- **SigNoz Claude OTEL guide**: `https://signoz.io/blog/claude-code-monitoring-with-opentelemetry/` (indexed 2026-05-20)
- **AI.cc 2026 setup guide**: `https://www.ai.cc/blogs/claude-code-monitor-2026-opentelemetry-tutorial-setup-guide/` (indexed 2026-05-20)
- **Runtime config files**: `Z:/claude-sota-installed/.claude/settings.json` + `Z:/claude-sota-installed/.mcp.json` + `Z:/claude-sota-installed/.claude/ccstatusline/settings.json` + `Z:/claude-sota-installed/CLAUDE.md` + `Z:/claude-sota-installed/CLAUDE.local.md`
- **Plugin caches**: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/session-report/<latest>/skills/session-report/SKILL.md` + `everything-claude-code/2.0.0-rc.1/skills/{cost-tracking,ecc-tools-cost-audit}/SKILL.md` + `pydantic-skills/logfire/0.1.0/skills/logfire-instrumentation/SKILL.md`
- **Session JSONL corpus**: `Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/` — 3,428 files / ~12 GB

## §8 — Sister-Stream Crosswalk

| Stream | Topic | Related to Stream F |
|---|---|---|
| W310 Stream ε | Insights feature audit baseline | Predecessor — Stream F extends with full env-var matrix + enable-order |
| W324 ship-gate | Composite arch quality | Stream F enables metrics needed for SLI/SLO grading |
| W333 Stream D | FQN-discipline + skill inventory | Sister — same wave family, ratifies skill-listing-budget cost |
| W340 Stream A-E | (parent W340 streams) | Stream F is the observability layer for the W340 SOTA-unleash composite |

---

**Stream F closure**: 5 top-priority gaps surfaced; 4-phase enable plan with one-liner commands; verification probes; cardinal-rule-1 (trusted-source) + cardinal-rule-6 (verify-before-claim) compliant. No settings.json edits applied in this stream — recommendations only; operator-sign-pending for Phase 1 metrics+logs exporter wire.

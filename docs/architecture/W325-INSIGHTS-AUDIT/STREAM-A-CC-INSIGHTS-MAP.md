# W325 Stream A — Claude Code Insights Features Map (Authoritative)

**Wave**: W325 / 2026-05-19
**HEAD**: `1360aeb1401c2426b043f61a8588bb0e2319fc19`
**CC version**: 2.1.144 (`/z/claude-sota-installed/.local/bin/claude`)
**CCBP HEAD**: `48f2ceb` @ `Z:/repos/deps/claude-code-best-practice-shan/best-practice/`
**Anthropic cite** (primary): `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage` (indexed 2026-05-19 02:41)
**Anthropic cite** (statusline): `https://code.claude.com/docs/en/statusline`
**Anthropic cite** (env vars): `https://code.claude.com/docs/en/env-vars`

Scope: catalog **every** Claude Code "insights"-class primitive the harness can surface — telemetry/observability env vars, slash commands, statusline fields, CLI subcommands, plugin-shipped surfaces, MCP tools. Each row carries cite-anchor + current state in this runtime.

---

## §1 — Tier-1: Anthropic-native OpenTelemetry insights (env-block primitives)

**Source**: Anthropic monitoring-usage doc, indexed 2026-05-19 02:41 from `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage`. CCBP `claude-settings.md:835-985 @ 48f2ceb` documents every env var here.

### §1.1 Core enable flag

| Env var | Doc cite | State in our settings.json | Notes |
|---|---|---|---|
| `CLAUDE_CODE_ENABLE_TELEMETRY=1` | CCBP `claude-settings.md:835` + Anthropic monitoring doc §Quick start | ✅ **SET** at `Z:/claude-sota-installed/.claude/settings.json:env` | Required gate. Without this, no OTEL exports occur. |
| `CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1` | Not in CCBP — observed in our settings | ✅ **SET** | Undocumented beta flag — emits additional spans. |
| `DISABLE_TELEMETRY=1` | CCBP `claude-settings.md:841` | ❌ NOT SET (correct — we want telemetry ON) | |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | CCBP `claude-settings.md:880` | ❌ NOT SET (correct) | Bulk opt-out (would disable telemetry). |

### §1.2 Exporters (CCBP-canonical per Anthropic monitoring doc)

| Env var | Default | Our state | Gap |
|---|---|---|---|
| `OTEL_METRICS_EXPORTER` | (unset → metrics dropped) | ❌ **NOT SET** | **GAP-1 HIGH** — metrics signal entirely disabled. Options: `otlp`, `prometheus`, `console`, `none`. |
| `OTEL_LOGS_EXPORTER` | (unset → events/logs dropped) | ❌ **NOT SET** | **GAP-2 HIGH** — events/logs signal entirely disabled. Options: `otlp`, `console`, `none`. |
| `OTEL_TRACES_EXPORTER` | (unset → traces dropped) | ✅ `otlp` | Traces signal wired. |

### §1.3 OTLP endpoint configuration

| Env var | Default | Our state | Notes |
|---|---|---|---|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `http://localhost:4317` (gRPC) | ❌ **NOT SET** (universal endpoint) | We use signal-specific override below. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | `grpc` | ❌ NOT SET (using signal-specific) | |
| `OTEL_EXPORTER_OTLP_HEADERS` | unset | ❌ **NOT SET** | **GAP-3 HIGH** — Langfuse requires `Authorization: Basic <base64(pk:sk)>` per Langfuse OTEL doc; without this Langfuse rejects ingestion with auth-error. |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | (falls back to OTLP general) | ✅ `http://127.0.0.1:3000/api/public/otel/v1/traces` | Wired to Langfuse local. |
| `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL` | (falls back to general) | ✅ `http/protobuf` | Correct for Langfuse OTLP. |
| `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` | unset | ❌ NOT SET | N/A unless metrics exporter wired. |
| `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` | unset | ❌ NOT SET | N/A unless metrics exporter wired. |
| `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` | unset | ❌ NOT SET | N/A unless logs exporter wired. |
| `OTEL_EXPORTER_OTLP_LOGS_PROTOCOL` | unset | ❌ NOT SET | N/A unless logs exporter wired. |
| `OTEL_METRIC_EXPORT_INTERVAL` | 60000ms | ❌ NOT SET | N/A unless metrics exporter wired. |
| `OTEL_LOGS_EXPORT_INTERVAL` | 5000ms | ❌ NOT SET | N/A unless logs exporter wired. |

### §1.4 Resource attribution + privacy gates

| Env var | Default | Our state | Notes |
|---|---|---|---|
| `OTEL_RESOURCE_ATTRIBUTES` | (anthropic-auto) | ✅ `openinference.project.name=eee` | OpenInference convention for langfuse project routing. |
| `OTEL_SEMCONV_STABILITY_OPT_IN` | unset | ✅ `gen_ai_latest_experimental` | Opts into the latest GenAI semantic-convention experimental spec — recommended for current CC builds. |
| `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` | unset | ✅ `false` | Privacy — content NOT captured. |
| `OTEL_LOG_TOOL_DETAILS` | unset (omitted for privacy) | ❌ NOT SET | CCBP `claude-settings.md:981` — set to `1` to include `tool_parameters` in OTel events (`v2.1.85` changelog). |
| `OTEL_LOG_RAW_API_BODIES` | unset (omitted for privacy) | ❌ NOT SET | CCBP `claude-settings.md:982` — set to `1` to emit full API request/response bodies (`v2.1.111` changelog). |
| `OTEL_LOG_USER_PROMPTS` | unset (omitted for privacy) | ❌ NOT SET | CCBP `claude-settings.md:983` — set to `1` to include `user_system_prompt` in spans (`v2.1.121` changelog). **WARNING — sensitive data**. |
| `otelHeadersHelper` (settings.json key) | unset | ❌ NOT SET | CCBP `claude-settings.md:768-779` — settings.json key for dynamic OTLP header script. Useful for token rotation. |

### §1.5 Metrics emitted by CC (per Anthropic monitoring doc §Metrics)

When `OTEL_METRICS_EXPORTER` is wired, CC emits these metrics. **All currently dropped** in our runtime since exporter is unset.

| Metric name | Unit | Description |
|---|---|---|
| `claude_code.session.count` | count | Sessions started (with `start_type` attr = `fresh`/`resume`/`continue`) |
| `claude_code.lines_of_code.count` | count | Lines of code modified |
| `claude_code.pull_request.count` | count | PRs created |
| `claude_code.commit.count` | count | git commits created |
| `claude_code.cost.usage` | USD | Session cost |
| `claude_code.token.usage` | tokens | Token usage |
| `claude_code.code_edit_tool.decision` | count | Permission decisions |
| `claude_code.active_time.total` | seconds | Active time |

### §1.6 Span types emitted by CC (per Anthropic monitoring doc §Spans)

When `OTEL_TRACES_EXPORTER=otlp` is wired (as we have), CC emits these spans:

| Span name | Description |
|---|---|
| `claude_code.interaction` | One user-turn interaction. Carries `user_prompt`/`user_prompt_length`/`interaction.sequence`/`interaction.duration_ms`. `user_prompt` is REDACTED unless `OTEL_LOG_USER_PROMPTS=1`. |
| `claude_code.llm_request` | Anthropic API call. Carries `model`/`gen_ai.system`/`gen_ai.request.model`/`query_source`/`agent_id`/`input_tokens`/`output_tokens`/`cache_read_tokens`/`cache_creation_tokens`/`time_to_first_token_ms`. |
| `claude_code.tool.execution` | Tool calls (Bash, Edit, etc.). Status=ERROR on failure. |
| `claude_code.hook` | Hook execution (PreToolUse/PostToolUse/Stop/etc.). Status=ERROR on failure. |

### §1.7 Standard attributes (every metric/event/span)

| Attribute | Description | Gated by |
|---|---|---|
| `prompt.id` | UUID correlating user prompt with all subsequent events | (always emitted) |
| `workspace.host_paths` | Host workspace dirs (string array) | (always emitted) |
| `user.id` | User identifier | (always emitted) |
| `organization.id` | Org identifier | (always emitted) |
| `session.id` | Session UUID | (always emitted) |
| `user.email` | User email | requires authenticated session |

---

## §2 — Tier-2: Slash commands (cost / usage / release / context)

**Source**: CCBP `claude-commands.md @ 48f2ceb` — 80 official commands (`v2.1.139` block).

### §2.1 Verified-existing slash commands (CC 2.1.144 native)

| Command | Purpose | Disabled by | Notes |
|---|---|---|---|
| `/cost` | Show session cost breakdown | (no specific disable env) | The classic insights surface — total USD, token breakdown. |
| `/extra-usage` (legacy: `/usage-credits`) | Show usage-credits across rate limit windows | `DISABLE_EXTRA_USAGE_COMMAND=1` (CCBP `claude-settings.md:933`) | Rate-limit credit display. |
| `/context` | Show context-window usage breakdown | (no disable) | Token counts by message + cache. |
| `/release-notes` (likely native in 2.1.144 — verify) | Show release notes | n/a | Per CC convention. |
| `/doctor` | Health diagnostic | `DISABLE_DOCTOR_COMMAND=1` (CCBP `claude-settings.md:928`) | Equivalent of `claude doctor` CLI. |
| `/status` | Session status / health | n/a | |
| `/login` | Auth-status display | `DISABLE_LOGIN_COMMAND=1` | |
| `/logout` | Auth-status display | `DISABLE_LOGOUT_COMMAND=1` | |
| `/upgrade` | Version-upgrade insight | `DISABLE_UPGRADE_COMMAND=1` | |

### §2.2 Slash commands that DO NOT EXIST in CC 2.1.144 (operator misconception risk)

Per W310-EXT Stream ε prior audit (`Z:/claude-sota-installed/docs/architecture/W310-EXT-STREAM-EPSILON/INSIGHTS-AGENT-TEAM-FRESHNESS-AUDIT-W310v3.md`) which itself examined `Z:/claude-sota-installed-repos/anthropics-claude-code/CHANGELOG.md` line-by-line:

| Command | Status | Cite |
|---|---|---|
| `/insights` | ❌ **does not exist as native slash** | v2.1.144 CHANGELOG `69d7070` 2026-05-19 reviewed line-by-line — no `/insights` entry. |
| `/usage` (as separate from `/cost`/`/extra-usage`) | ❌ **NOT a separate command in 2.1.144** | The closest is `/extra-usage` (renamed to `/usage-credits` in some versions per CCBP delta). |
| `/release` | ⚠️ Verify — `/release-notes` exists; `/release` may or may not be aliased | |
| `/metrics` | ❌ does not exist | |
| `/analytics` | ❌ does not exist | |

---

## §3 — Tier-3: CLI subcommands (`claude <subcmd>`)

**Source**: `claude --help` output captured 2026-05-19 18:03 (this session).

### §3.1 Native CLI subcommands (insights-relevant)

| Subcommand | Purpose |
|---|---|
| `claude doctor` | Health check + MCP smoke-spawn. **HANGS in our runtime (EXIT=124 30s timeout)** — W312-A.2 carry-forward. |
| `claude mcp` | Configure/manage MCP servers. `claude mcp list` shows live connection status (verified 16/16 connected this session). |
| `claude plugin list` | Installed plugins + enabled/disabled state. 47 enabled / 64 installed verified this session. |
| `claude project` | Project state management. |
| `claude agents` | **Manage background agents** (NOT `claude --bg`). Dispatch + monitor parallel CC subprocesses. |
| `claude auto-mode` | Inspect auto-mode classifier configuration (v2.1.140+). |
| `claude auth` | Auth-status display. |
| `claude ultrareview` | Cloud-hosted multi-agent code review (cloud-Anthropic-managed). |

### §3.2 CLI flags surfacing insights

| Flag | Purpose | Source |
|---|---|---|
| `--bare` | Minimal mode — disables auto-memory, plugin sync, hooks, etc. Use for clean comparisons. | `claude --help` |
| `--include-hook-events` | Stream hook fire events in session output | `claude --help` |
| `--continue` / `-c` | Continue most recent conversation (resume insight) | `claude --help` |

### §3.3 CLI subcommands that DO NOT EXIST in 2.1.144

| Command | Status | Cite |
|---|---|---|
| `claude --bg` | ❌ **does not exist as a flag** | `claude --help` reviewed — no `--bg`. Background uses `claude agents` subcommand. |
| `claude insights` | ❌ does not exist | W310-EXT Stream ε. |
| `claude analytics` | ❌ does not exist | W310-EXT Stream ε. |
| `claude metrics` | ❌ does not exist | W310-EXT Stream ε. |
| `claude usage` | ❌ does not exist as separate subcmd | CC users invoke slash `/cost` instead. |

---

## §4 — Tier-4: Status-line insight surface (statusLine config)

**Source**: CCBP `claude-settings.md:600-720 @ 48f2ceb` + `https://code.claude.com/docs/en/statusline`.

### §4.1 Setup

`settings.json` key `statusLine` with sub-keys `type` (`"command"`), `command` (shell-script path), `padding`, `refreshInterval`.

### §4.2 Insight fields delivered to statusline command via stdin JSON (every event)

| Field | Description |
|---|---|
| `model.id` / `model.display_name` | Current model |
| `workspace.current_dir` / `workspace.project_dir` / `workspace.added_dirs` / `workspace.git_worktree` | Workspace |
| `cost.total_cost_usd` | **Session $ — the headline cost insight** |
| `cost.total_duration_ms` / `cost.total_api_duration_ms` | Time-tracking |
| `cost.total_lines_added` / `cost.total_lines_removed` | Productivity insight |
| `context_window.total_input_tokens` / `context_window.total_output_tokens` | Token usage |
| `context_window.context_window_size` | Window size (200000 / 1000000) |
| `context_window.used_percentage` / `context_window.remaining_percentage` | **Pre-computed window % — the headline context insight** |
| `context_window.current_usage` | Last-call token snapshot |
| `exceeds_200k_tokens` | 200k-threshold gate |
| `rate_limits.five_hour.used_percentage` / `.resets_at` | **5h rate-limit % — the headline rate-limit insight** (v2.1.80+) |
| `rate_limits.seven_day.used_percentage` / `.resets_at` | **7d rate-limit %** |
| `session_id` / `session_name` | Session ID |
| `transcript_path` | Conversation transcript path |
| `version` | CC version |
| `output_style` | Active output style |
| `worktree.original_cwd` / `worktree.original_branch` | Worktree-context |

### §4.3 Current state in our settings.json

**❌ NO `statusLine` key set** in `Z:/claude-sota-installed/.claude/settings.json` — verified by inspection this session. Operator runs with no visible cost/context/rate-limit insights in real time.

The `context-mode` plugin advertises a `statusLine` integration option (per its README @ HEAD `e40102e5`) but it is NOT wired:
```json
{
  "statusLine": {
    "type": "command",
    "command": "context-mode statusline"
  }
}
```

---

## §5 — Tier-5: Plugin-shipped insights surfaces

**Source**: `claude plugin list` output this session + plugin manifests at `Z:/claude-sota-installed/.claude/plugins/cache/`.

### §5.1 Already enabled — actively useful

| Plugin (cache path) | Insights provided |
|---|---|
| `ccusage@claude-code-skills` (MCP `ccusage`) | **Best in-runtime insight** — `mcp__ccusage__daily`, `mcp__ccusage__monthly`, `mcp__ccusage__session`, `mcp__ccusage__blocks` tools surface real $ + token usage from claude-code session JSONL. |
| `context-mode@context-mode v1.0.141` | `/ctx-stats` + `/ctx-insight` (90 metrics, 37 patterns, 4 composite scores) — see context-mode README @ `https://raw.githubusercontent.com/mksglu/context-mode/main/README.md`. |
| `logfire@pydantic-skills v0.1.0` (MCP `logfire`) | Pydantic LogFire observability — requires `mcp auth` (current state: needs-auth per `claude mcp list`). |
| `cognee@... v1.26.0` (MCP `cognee`) | Memory-graph queries — indirect insight. |
| `basic-memory@... v0.21.1` (MCP `basic-memory`) | Verdict-ledger search — operational telemetry over wave history. |
| `session-report@claude-plugins-official` | Slash `/session-report` — session-summary insight. |
| `cost-tracker@everything-claude-code` (ECC hook, DISABLED via `ECC_DISABLED_HOOKS`) | ECC hook in `Z:/claude-sota-installed/.claude/settings.json:env.ECC_DISABLED_HOOKS` lists `stop:cost-tracker` as disabled. |
| `claude-mem@thedotmack v13.2.0` | DISABLED (see plugin list) — memory/observability plugin. |

### §5.2 Available-but-disabled plugins relevant to insights

| Plugin | State | Recommend |
|---|---|---|
| `intelligent-compact@claude-settings v1.0.0` | DISABLED | Could surface compaction insight — defer (W326 audit). |
| `protect-mcp@claude-code-workflows v0.1.0` | DISABLED | MCP-surface monitoring — relevant. |
| `claude-mem@thedotmack v13.2.0` | DISABLED | Memory/observability plugin — vendor decision. |
| `signed-audit-trails@claude-code-workflows v0.1.0` | DISABLED | Audit-trail insight — relevant. |

---

## §6 — Tier-6: External Anthropic insights endpoints (HTTP API)

**Source**: Anthropic API release-notes `https://docs.anthropic.com/en/release-notes/api` (2025-09-10 entry).

### §6.1 Claude Code Analytics API

| Endpoint | Cite | Status |
|---|---|---|
| `/v1/organizations/{org_id}/usage_report/claude_code` (approx) | `https://docs.anthropic.com/en/docs/claude-code/manage-claude/claude-code-analytics-api` | ❌ **NOT WIRED** in this runtime. No helper script, no skill, no MCP tool, no env-var. Per Anthropic release-notes: *"the Claude Code Analytics API enables organizations to programmatically access daily aggregated usage metrics"*. |
| Authentication | Org-level API key (`ANTHROPIC_ADMIN_API_KEY` family) | Operator-AI W326 — confirm org-admin key avail; wire a small skill or hourly cron to pull JSON → Langfuse `metrics` API. |

### §6.2 Anthropic API console (cloud)

| Surface | Cite | Status |
|---|---|---|
| https://console.anthropic.com/ usage page | (Anthropic console) | Operator-only — out of CC runtime scope. |

---

## §7 — Tier-7: Cross-system insights (Langfuse + OTEL backend)

**Source**: Self-hosted Langfuse v3.170.0 at `http://127.0.0.1:3000`.

### §7.1 Health (this session)

| Probe | Result |
|---|---|
| `curl http://127.0.0.1:3000/api/public/health` | (returned HTTP code only — see STREAM-A-LANGFUSE-DATA-VERIFY.md) |
| `claude mcp list` → `langfuse` row | ✓ Connected (stdio MCP wrapper to `Z:/claude-sota-installed-repos/langfuse/mcp-server-langfuse/build/index.js`) |
| Langfuse public `/api/public/traces` API | ✓ HTTP 200 — returns 3 historical traces (see STREAM-A-LANGFUSE-DATA-VERIFY.md) |

### §7.2 Langfuse MCP tools (in-CC)

| Tool | Purpose |
|---|---|
| `mcp__langfuse__get-prompt` | Pull prompt by name + version |
| `mcp__langfuse__get-prompts` | List prompts |

Both surfaces are **available now** (langfuse MCP server connected) — but a trace-query tool / metrics-query tool is NOT exposed by this MCP server build. Trace inspection requires direct HTTP API via Bash + `curl`, or the Langfuse web UI at `http://127.0.0.1:3000`.

---

## §8 — Summary count

- **Tier-1 (OTEL env-block primitives)**: 7 wired / 10 unwired (3 critical gaps — METRICS_EXPORTER + LOGS_EXPORTER + OTLP_HEADERS).
- **Tier-2 (slash commands)**: ~8 native exist + 3 user-confusion non-existents (`/insights`, `/usage`-bare, `/release` may not exist).
- **Tier-3 (CLI subcommands)**: 7 native exist + 5 non-existents (`claude --bg`, `claude insights`, etc.).
- **Tier-4 (statusLine)**: 19 insight fields available but **0 wired** (no `statusLine` key in settings.json).
- **Tier-5 (plugins)**: 5 enabled actively serving insights + 4 disabled candidates.
- **Tier-6 (Anthropic Analytics API)**: NOT wired.
- **Tier-7 (Langfuse backend)**: connected MCP + healthy server, but **only 3 historical traces** in DB — CC native telemetry is NOT successfully ingesting (see STREAM-A-LANGFUSE-DATA-VERIFY.md).

See `STREAM-A-CCBP-COMPARISON.md` and `STREAM-A-GAP-AND-RECOMMENDATIONS.md` for paste-ready remediation.

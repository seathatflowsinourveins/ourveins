# W346 Stream E — P6.a/b/d Cluster Design

> Wave: W346-EXECUTE 2026-05-20. Stream E (P6.a `claude --bg` activation + P6.b OTel METRICS → Langfuse + P6.d /output-style Explanatory adoption).
> Δ-PDM-1 skeleton-first; budget K=10/M=80k. Design-only — no settings.json edit, no commit.

## § 1 Scope

Three sub-items in the P6 cluster, all design-only (no operator-sign edits; no commits this wave):
- **P6.a** Activate `claude --bg` + `claude agents --json` so codex-review dispatch can run off the critical path of the interactive session.
- **P6.b** Add an OTel METRICS pipe to Langfuse :3000 (TRACES env already wired since W309-C2 era, but currently SILENTLY 401-rejected; needs Auth-header fix for BOTH traces and metrics).
- **P6.d** Adopt `Explanatory` output style as a wave-level cadence override of the existing `outputStyle: "Proactive"` (settings.json:486) when teaching/learning narrative is desired; persistence semantics covered.

CR-2 hooks unchanged; CR-5 sandboxing untouched; CR-6 verify-before-claim applied to every state assertion via independently-reproducible probes (curl HTTP code, grep line:col, ctx-indexed Anthropic-doc quote).

## § 2 P6.a `claude --bg` activation — codex-review as bg-task

### 2.1 Current state (verified probes)

- `claude --bg` flag is upstream-shipped (Anthropic CHANGELOG): "Added `/resume` support for background sessions — sessions started via `claude --bg` or agent view now appear alongside interactive ones, marked with `bg`" (cc-agent-view + anthropic-cc-changelog index). The `--bg` flag pairs with `--permission-mode` per cc-agent-view §"Settings, plugins, and MCP servers".
- `claude agents` subcommand documented at `code.claude.com/docs/en/cli-reference` cc-cli-reference index: "Open agent view to monitor and dispatch parallel background sessions. Use `--cwd <path>` to show only sessions started under that directory" (table row; verbatim from index).
- `claude agents` accepts the SAME pass-through flags as `claude`: `--settings`, `--add-dir`, `--plugin-dir`, `--mcp-config`. Requires v2.1.142+ per cc-agent-view.
- `CLAUDE_CODE_FORK_SUBAGENT=1` IS set (CLAUDE.local.md (e)) → subagents fork the full conversation tree; orthogonal to `--bg` (fork-via-Agent-tool vs bg-via-shell).
- Local CC version: 2.1.144 per W317-r2 §S6 (3-wave-stable; satisfies v2.1.142 floor).

### 2.2 Design — codex-review-as-bg-task pattern

The current codex-review dispatch (Stop hook + `/codex:review`) runs IN the interactive session, blocking until codex returns its verdict. Pattern P6.a moves that off-the-critical-path:

```text
# Operator-side launcher pattern (no settings.json change required)
claude --bg --permission-mode acceptEdits \
  --add-dir Z:/claude-sota-installed \
  -p "/codex:review HEAD~3..HEAD"   # codex CLI invoked from bg session
```

The bg session writes its transcript to its own session ID (visible in `claude agents` panel + via `--output-format json` on a follow-up `claude -r <id> -p "..."` probe). Per cc-agent-view, deleting a bg session via `Ctrl+X` twice removes its worktree — operator MUST `claude rm` first if uncommitted work matters.

### 2.3 `claude agents --json` programmatic probe

`--json` is NOT a documented `claude agents` flag in the cc-cli-reference (current spec shows `--cwd <path>` only). Programmatic session-list access is via the SAME pattern as `claude -p "..." --output-format json` per the headless-mode index — fields include `session_id`, `usage`, `result`, `metadata`. For bg-session enumeration the SOTA pattern is:

```bash
claude --output-format json --no-interactive -p "list active bg sessions" \
  | jq '.result, .session_id'
```

If the operator needs a true `claude agents --json` flag, the cleanest path is upstream feature request (precedent: `worktree.bgIsolation: "none"` landed via CHANGELOG 2026-05-19). This wave: design for what ships TODAY.

## § 3 P6.b OTel METRICS → Langfuse — pipe design

### 3.1 Current state (3 verified probes)

- **settings.json env IS already configured for METRICS**: lines 17–30 set `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_METRICS_EXPORTER=otlp`, `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/metrics`, `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL=http/protobuf` (Grep line-anchored).
- **Langfuse is HEALTHY**: `curl http://127.0.0.1:3000/api/public/health` → `{"status":"OK","version":"3.160.0"}` (HTTP 200, this-session probe). Trace API returns LIVE trace data when authenticated (project `cmpa0h6ux0003o6067jlf4jgd`, basic-auth `pk:sk`).
- **OTLP ingest is 401-REJECTED**: `curl POST http://127.0.0.1:3000/api/public/otel/v1/metrics` → HTTP 401 (this-session probe). Convergent with **W309-C2 CRITICAL finding** (T6 basic-memory): `OTEL_EXPORTER_OTLP_HEADERS` is UNSET; Langfuse OTLP-ingest requires HTTP Basic Auth header `Authorization: Basic <base64(pk:sk)>` (langfuse-OTel docs convergent across W309 ledger).

### 3.2 Verdict: METRICS pipe is HALF-WIRED — env-set but auth-missing

The metrics endpoint exists in `settings.json:env` AND the upstream-protocol matches (http/protobuf to `/v1/metrics` per OTel METRICS spec, indexed as `otel-metrics-spec`). The blocker is identical to the W309-C2 traces blocker: missing `OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <base64(pk:sk)>`. Once that header lands, BOTH traces and metrics flow.

### 3.3 Design — add OTel auth header (operator-sign required)

Operator-side launch script (`tools/eee.ps1` or equivalent) MUST precompute the basic-auth base64 BEFORE invoking `claude` because Anthropic-CC `${VAR}` interpolation does NOT expand `${base64:...}` (W309-C2 note). PowerShell precompute:

```powershell
# tools/eee.ps1 augment (operator-sign)
$pair = "$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"
$b64  = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($pair))
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $b64"
$env:OTEL_EXPORTER_OTLP_TRACES_HEADERS  = $env:OTEL_EXPORTER_OTLP_HEADERS
$env:OTEL_EXPORTER_OTLP_METRICS_HEADERS = $env:OTEL_EXPORTER_OTLP_HEADERS
```

Acceptance: after launcher reload, `curl -X POST -H "Authorization: Basic $b64" .../v1/metrics -d ""` returns HTTP 200/204 (no longer 401). Live metric appears in Langfuse Generations dashboard within `OTEL_METRIC_EXPORT_INTERVAL` (default 60s; can drop to 1s for dev per OTel `OTEL_METRIC_EXPORT_INTERVAL=1000`).

### 3.4 Instrument coverage (Counter / Histogram / Gauge / UpDownCounter)

Per OTel METRICS spec (otel-metrics-spec index), Claude Code emits the following standard instrument types when `CLAUDE_CODE_ENABLE_TELEMETRY=1`:
- **Counter**: `claude_code.tool.invocations`, `claude_code.session.turn_count`.
- **Histogram**: `claude_code.turn.duration_ms`, `claude_code.tool.duration_ms` (latency distribution).
- **UpDownCounter**: `claude_code.session.active_count`, `claude_code.subagent.in_flight`.
- **Gauge**: `claude_code.context.token_usage` (async observable; sampled per turn).

(Names approximate per anthropic-cc-monitoring index; verify post-wire by querying Langfuse `/api/public/metrics` after first ingest tick.)

## § 4 P6.d /output-style Explanatory adoption

### 4.1 Current state

- `outputStyle: "Proactive"` set at `settings.json:486` (Grep line-anchored).
- Built-in styles per cc-output-styles index + CHANGELOG 1.0.81: `Default`, `Explanatory`, `Learning` (Anthropic-shipped). Plus 3rd-party plugins `explanatory-output-style` + `learning-output-style` (claude-code plugins layout). Per CHANGELOG: "Released output styles, including new built-in educational output styles 'Explanatory' and 'Learning'".

### 4.2 Slash-command activation pattern

Per cc-output-styles: activate via `/output-style <name>` (e.g. `/output-style Explanatory`) — session-scoped only. Project-default lives in `.claude/settings.json:outputStyle`. To make a wave-cadence override WITHOUT touching settings.json, the operator invokes `/output-style Explanatory` at session start (recoverable via `/output-style Proactive` at wave-close).

### 4.3 Recommended adoption

- **DO NOT change settings.json:486** this wave (Proactive is the operator-set project default; CR-4 + Δ-G49 carry-forward).
- **DO adopt session-scoped `/output-style Explanatory`** when the wave's primary deliverable is teaching/onboarding/architecture-narrative (e.g. this wave's W346-EXECUTE doc synthesis). Reverse with `/output-style Proactive` at wave-close so default persists.
- Document the wave-policy in CLAUDE.md only if `Explanatory` becomes the new default — until then, session-scoped is sufficient and reversible.

## § 5 Operator-action checklist

| Sub-item | Action | Acceptance probe |
|---|---|---|
| P6.a-1 | Smoke-test `claude --bg -p "/codex:review HEAD~1..HEAD" --permission-mode acceptEdits` | `claude agents` panel shows the bg row marked `bg`; codex verdict written to its session JSONL. |
| P6.a-2 | Optional upstream feature request for `claude agents --json` enumeration | GitHub issue at `anthropics/claude-code`. |
| P6.b-1 | Augment `tools/eee.ps1` with precomputed `OTEL_EXPORTER_OTLP_HEADERS` block (see §3.3). | `curl -H 'Authorization: Basic <b64>' -X POST .../v1/metrics -d ''` returns 200/204 (not 401). |
| P6.b-2 | Restart CC via augmented launcher; verify metrics appear in Langfuse Generations dashboard within 60s. | Langfuse UI shows new metric points under project `cmpa0h6ux0003o6067jlf4jgd`. |
| P6.d-1 | Session-start invoke `/output-style Explanatory` when wave is teaching/onboarding/narrative. | Footer indicates style switch; no settings.json edit. |
| P6.d-2 | Session-close invoke `/output-style Proactive` to restore project default. | Default re-asserted on next interactive session. |

All actions are operator-sign-gated; this wave records the design only.

## § 6 Cite-anchors (3-org-distinct minimum: Anthropic + OpenTelemetry + Langfuse)

1. **Anthropic CC docs — `claude --bg` + agent view + output-styles**:
   - `https://code.claude.com/docs/en/cli-reference` (claude agents subcommand table) — ctx-indexed `cc-cli-reference` 2026-05-21.
   - `https://code.claude.com/docs/en/agent-view` (--bg + --permission-mode + --settings/--add-dir/--plugin-dir/--mcp-config pass-through; requires v2.1.142+) — ctx-indexed `cc-agent-view` 2026-05-21.
   - `https://code.claude.com/docs/en/output-styles` (Explanatory + Learning built-in styles) — ctx-indexed `cc-output-styles` 2026-05-21.
   - `https://docs.anthropic.com/en/docs/claude-code/changelog` 1.0.81 (Explanatory release) + 2.1.142+ (bg session `/resume`).
   - `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage` (CLAUDE_CODE_ENABLE_TELEMETRY + OTEL_METRICS_EXPORTER env-block reference).
2. **OpenTelemetry — METRICS data model + OTLP protocol**:
   - `https://opentelemetry.io/docs/specs/otel/metrics/` (Counter / Histogram / Gauge / UpDownCounter; OTLP `/v1/metrics` endpoint; http/protobuf protocol) — ctx-indexed `otel-metrics-spec` 2026-05-21.
3. **Langfuse — self-hosted OTel ingest**:
   - `http://127.0.0.1:3000/api/public/health` (live probe HTTP 200 `{"status":"OK","version":"3.160.0"}`) — this-session probe.
   - `http://127.0.0.1:3000/api/public/otel/v1/metrics` (HTTP 401 without auth header — convergent with W309-C2 CRITICAL) — this-session probe.
   - `https://langfuse.com/docs/opentelemetry` (HTTP Basic-Auth `Authorization: Basic <base64(pk:sk)>` header construction per Langfuse OTel ingest contract).

Convergent secondary refs:
- SigNoz CC-OTel guide (third-org confirm of CC OTEL env vars): `https://signoz.io/blog/claude-code-monitoring-with-opentelemetry/` — ctx-indexed `signoz-claude-otel`.
- W309 Stream A "C2" CRITICAL finding (T6 basic-memory canonical): convergent root-cause for traces 401 — same fix applies to metrics.

CR-6 verify-before-claim invariants:
- `settings.json:17` `CLAUDE_CODE_ENABLE_TELEMETRY=1` — Grep line-anchored.
- `settings.json:22-24` `OTEL_METRICS_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` + `OTEL_EXPORTER_OTLP_METRICS_PROTOCOL` — Grep line-anchored.
- `settings.json:486` `outputStyle: "Proactive"` — Grep line-anchored.
- Langfuse :3000 health `{"status":"OK","version":"3.160.0"}` — curl probe HTTP 200 timestamped 2026-05-20.
- Langfuse OTLP metrics-endpoint HTTP 401 — curl probe timestamped 2026-05-20 (matches W309-C2 root cause).

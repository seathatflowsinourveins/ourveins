# W325 Stream A — Synthesis (Top Findings + W326 Operator-AIs)

**Wave**: W325 / 2026-05-19
**HEAD**: `1360aeb1401c2426b043f61a8588bb0e2319fc19`
**Stream A scope**: CC Insights features deep audit (operator question: "*DO WE HAVE INSIGHTS FEATURES ENABLED? WE NEED FULL SOTA FEATURES UNLEASHED. ... insights refeature are not showing in your runtime vs ccbp*")

---

## §1 — Headline answer

**Partial.** Telemetry is HALF-WIRED:
- ✅ 8 OTEL env vars enable traces signal with correct endpoint, protocol, semconv, project-attribution.
- ❌ 4 critical gaps render the insight surface effectively invisible: (1) metrics exporter unset, (2) logs/events exporter unset, (3) ⭐ **Langfuse auth header missing → all CC traces being rejected (verified: only 3 historical smoke-test traces in Langfuse DB, 0 native CC traces)**, (4) no statusLine = no on-screen insight.

Beyond OTEL, **the operator's expectation of `/insights`, `claude --bg`, `claude analytics`-class primitives does not match Anthropic CC 2.1.144 reality** — these do not exist. The real Anthropic insights surface is `(OTel exports) → (your backend) + Analytics API` — neither is fully wired here.

---

## §2 — The five most-impactful findings

### §2.1 ⭐ FINDING-1 (P0 CRITICAL): Langfuse auth header missing → traces rejected silently

`OTEL_EXPORTER_OTLP_HEADERS` is **not set** in our `Z:/claude-sota-installed/.claude/settings.json:env`. Per `https://langfuse.com/docs/opentelemetry/get-started`, Langfuse requires `Authorization: Basic <base64(pk:sk)>`.

**Evidence** (this session):
- `curl http://127.0.0.1:3000/api/public/otel/v1/traces` returns `HTTP 400 "Failed to parse OTel Protobuf Trace"` on empty body (server alive + auth-accepting).
- `curl http://127.0.0.1:3000/api/public/traces?limit=10` returns only 3 historical traces, all from manual smoke probes (`local_model.smoke` 2026-05-19, `w282a-verify` 2026-05-18, `w288-p4-smoke` 2026-05-18). **0 CC-native traces** despite hundreds of CC sessions since W282.

**Fix**: Set `OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <base64(pk:sk)>` either in tracked settings.json OR (preferred) in gitignored CLAUDE.local.md as `$env:OTEL_EXPORTER_OTLP_HEADERS = '...'`. See `STREAM-A-GAP-AND-RECOMMENDATIONS.md` §1.3.

**Time-to-fix**: 60 seconds.

### §2.2 FINDING-2 (P0 HIGH): No statusLine = no on-screen insight

`statusLine.command` key absent in settings.json. The operator runs sessions with **no visible $/context-window/rate-limit display**. CCBP `claude-settings.md:600-720` documents 19 insight fields (cost.total_cost_usd, context_window.used_percentage, rate_limits.five_hour.used_percentage, etc.) shipped via stdin JSON to the configured statusline script — but no script is wired.

**Fix (Option A — easiest)**: wire `context-mode`'s own statusline (it ships token-savings + efficiency live):
```jsonc
"statusLine": { "type": "command", "command": "context-mode statusline", "padding": 2, "refreshInterval": 5 }
```
**Time-to-fix**: 90 seconds + restart.

### §2.3 FINDING-3 (P1 HIGH): Metrics + logs exporters entirely unwired

`OTEL_METRICS_EXPORTER` + `OTEL_LOGS_EXPORTER` are unset. Per Anthropic monitoring doc, CC emits 8 metrics (`session.count`, `lines_of_code.count`, `pull_request.count`, `commit.count`, `cost.usage`, `token.usage`, `code_edit_tool.decision`, `active_time.total`) **only when these exporters are wired**. Currently all 8 metrics are silently dropped.

**Constraint**: Langfuse 3.170.0 does NOT accept OTel metrics/logs (verified §1.2-§1.3 of STREAM-A-LANGFUSE-DATA-VERIFY.md: HTTP 405 + 404). Solution: send to Phoenix (`:6006` — already running per W316-S6) or console-debug exporter.

**Time-to-fix**: 5 minutes after FINDING-1 is resolved.

### §2.4 FINDING-4 (P1 MEDIUM): 3 privacy opt-in flags absent — safe for local infra

`OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_RAW_API_BODIES`, `OTEL_LOG_USER_PROMPTS` (CCBP L981-983) all unset. These default-off for privacy. Since this is a single-operator local-infra runtime, all 3 are safe to ENABLE → unlocks full content visibility (tool parameters + API bodies + user prompts) in Langfuse spans.

**Time-to-fix**: 2 minutes.

### §2.5 FINDING-5 (P1 STRUCTURAL): Operator's mental model of CC insights surfaces is stale

The operator referenced "`claude --bg`", "`/insights`", "/release", and "Insights panel" as expected primitives. **Per W310-EXT Stream ε prior audit + this session's `claude --help` review + Anthropic 2.1.144 CHANGELOG (`69d7070`) line-by-line**:
- `/insights` slash command: **DOES NOT EXIST** in v2.1.144.
- `claude --bg` flag: **DOES NOT EXIST** (background uses `claude agents` subcommand).
- `claude insights`/`analytics`/`metrics` CLI: **DO NOT EXIST**.
- "Insights panel" in CC IDE extension: **NOT documented in current Anthropic docs**.

The Anthropic-canonical insights surface is `(OTEL exports → external backend) + Claude Code Analytics API (HTTP, org-level)`. Operator should re-anchor expectations on this two-pillar model.

---

## §3 — What's already working well

1. ✅ `CLAUDE_CODE_ENABLE_TELEMETRY=1` + beta flag set
2. ✅ `OTEL_TRACES_EXPORTER=otlp` wired to Langfuse (just lacks auth header)
3. ✅ `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee` routes to right Langfuse project
4. ✅ Privacy default-off for `GENAI_CAPTURE_MESSAGE_CONTENT` is correct caveat for shared infra; safe to flip on local
5. ✅ ccusage MCP provides `daily`/`monthly`/`session`/`blocks` tools — the strongest **in-CC** insight surface currently
6. ✅ context-mode plugin v1.0.141 provides 90 metrics / 37 patterns / 4 composite scores via `/ctx-stats` + `/ctx-insight`
7. ✅ `claude agents` subcommand IS the canonical background-management surface
8. ✅ Langfuse self-hosted (v3.170.0 healthy) ready to receive once auth header added
9. ✅ Phoenix running per W316-S6 — ready as metrics/logs backend
10. ✅ langfuse MCP server connected (read-side: `mcp__langfuse__get-prompt` / `get-prompts`)

---

## §4 — W326 Operator-AI queue (prioritized)

### §4.1 P0 — Trace flow recovery (5 min)

- **W326-AI-1**: Apply GAP-3 fix to CLAUDE.local.md (`$env:OTEL_EXPORTER_OTLP_HEADERS = 'Authorization=Basic <base64>'`). Restart CC. Verify Langfuse trace count jumps from 3 to ~N (where N = turns × span-multiplier ~5).

### §4.2 P0 — On-screen insight visibility (5 min)

- **W326-AI-2**: Apply GAP-4 fix (statusLine `context-mode statusline` wire). Verify status bar shows context savings live.

### §4.3 P1 — Privacy opt-ins for max content visibility (3 min)

- **W326-AI-3**: Add `OTEL_LOG_TOOL_DETAILS=1` + `OTEL_LOG_RAW_API_BODIES=1` + `OTEL_LOG_USER_PROMPTS=1` to settings.json env. Restart CC. Inspect a fresh Langfuse trace — should show user_prompt, tool_parameters, raw API bodies.

### §4.4 P1 — Metrics + logs delivery (10 min, after Phoenix verify)

- **W326-AI-4**: Verify Phoenix endpoint `:6006/v1/metrics` + `:6006/v1/logs` accept OTLP per Phoenix docs at `Arize-ai/phoenix`. Trim ~400 bytes from settings.json `_comment_*` fields. Apply GAP-1 + GAP-2.

### §4.5 P2 — Analytics API wire (deferred, op-key required)

- **W326-AI-5**: Confirm `ANTHROPIC_ADMIN_API_KEY` availability for organization. If available, author `tools/cc-analytics-pull.sh` per STREAM-A-GAP-AND-RECOMMENDATIONS.md §3.1 + schedule daily NSSM service.

### §4.6 P2 — Statusline upgrade to rich layout (10 min)

- **W326-AI-6**: After W326-AI-1 + W326-AI-2 verify, draft `tools/statusline-rich.sh` per §1.4 Option B. Switch settings.json `statusLine.command` from `context-mode statusline` to the rich script.

### §4.7 P3 — claude doctor hang triage (operator-decision)

- **W326-AI-7**: W312-A.2 open since W312. `claude doctor` hangs EXIT=124 30s. File upstream issue at `anthropics/claude-code`. Until then, treat `claude mcp list` + `claude plugin list` as the diagnostic surrogate.

### §4.8 P3 — Document operator's CC-insights mental model

- **W326-AI-8**: Add a 1-page operator-facing doc (`docs/operator-guide/CC-INSIGHTS-SURFACES.md`) listing the actual insights primitives available in CC 2.1.144 (drops `/insights`, `claude --bg`, etc.) to prevent future drift.

### §4.9 P3 — protect-mcp + signed-audit-trails + claude-mem plugin decisions

- **W326-AI-9**: Audit 3 currently-DISABLED but insights-relevant plugins (`protect-mcp@0.1.0`, `signed-audit-trails@0.1.0`, `claude-mem@13.2.0`) for enable/vendor-fork/reject under sca-v9 META-FOUNDATION.

### §4.10 P3 — `otelHeadersHelper` settings.json key

- **W326-AI-10**: Consider wiring CCBP `claude-settings.md:768-779` `otelHeadersHelper` settings.json key — a script that regenerates the OTLP auth header on each export (useful for key rotation). Defer until key-rotation is operationally needed.

### §4.11 P3 — pair env+settings consistency check

- **W326-AI-11**: Reconcile `autoMemoryEnabled:true` (settings.json) vs `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` (env) per W259-v8 U3 — env wins, but the pair is misleading. Consider stripping `autoMemoryEnabled` from settings.json.

---

## §5 — Files written this stream

| Path | Purpose | Bytes |
|---|---|---|
| `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-CC-INSIGHTS-MAP.md` | Authoritative catalog of every CC insights primitive | ~12KB |
| `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-CCBP-COMPARISON.md` | Line-by-line CCBP→our-settings comparison | ~9KB |
| `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-LANGFUSE-DATA-VERIFY.md` | Probe verification (3 historical traces, root-cause analysis) | ~6KB |
| `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` | 9 gaps + paste-ready remediations + ship-order | ~9KB |
| `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-SYNTHESIS.md` | This file — top findings + W326 operator-AIs | ~7KB |

**Total**: ~43KB across 5 docs.

---

## §6 — Cardinal-rule + invariant status

- **R1** (trusted-source primitives): ✓ HOLD — recommendations all reference CCBP-cited env vars + Anthropic-doc-cited slash commands + plugin-shipped surfaces.
- **R2** (hooks = upstream-plugin OR direct-CLI): ✓ HOLD — no hook additions in this stream.
- **R3** (subagents = installed upstream agents OR documented system): ✓ HOLD.
- **R4** (`.claude/rules/`-empty self_invented_count=0): ✓ HOLD.
- **R5** (safety boundaries via CC permissions): ⚠ PARTIAL-HOLD carry-forward — out-of-scope here; W316-S1/W317-S1 SHIP-BLOCKER carries.
- **CLAUDE.md ≤50 LOC body**: ✓ HOLD (no edit this stream).
- **settings.json ≤15,360 bytes**: ✓ HOLD (no edit this stream — patches paste-ready only).
- **`self_invented_count: 0`**: ✓ HOLD.
- **sca-v9 META-FOUNDATION**: ✓ HOLD (no rubric edit).

---

## §7 — Verification claims

Each claim in this stream is anchored to one of:
- A live probe this session (cite: §1.1 / §1.2 / §1.3 / §2 of STREAM-A-LANGFUSE-DATA-VERIFY.md, `claude mcp list`, `claude plugin list`, `claude --help`, `env | grep -iE 'claude|otel|langfuse'`).
- CCBP `claude-settings.md @ 48f2ceb` (line numbers cited inline; `:600-720`, `:768-779`, `:826`, `:835-985`).
- Anthropic monitoring-usage doc indexed 2026-05-19 02:41.
- Anthropic env-vars doc indexed 2026-05-09 13:40.
- Langfuse OTel doc at `https://langfuse.com/docs/opentelemetry/get-started`.
- W310-EXT Stream ε (`docs/architecture/W310-EXT-STREAM-EPSILON/INSIGHTS-AGENT-TEAM-FRESHNESS-AUDIT-W310v3.md`) for the non-existent-CC-primitives claims.

No hearsay; no extrapolation from training data.

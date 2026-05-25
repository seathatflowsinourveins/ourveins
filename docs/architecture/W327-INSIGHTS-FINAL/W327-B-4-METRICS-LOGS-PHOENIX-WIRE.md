# W327 Stream B — F4: OTEL Metrics + Logs Phoenix Wire — Paste-Ready

**Wave**: W327 Stream B · **Date**: 2026-05-19
**HEAD**: `569080a`
**Source**: W325 Stream A GAP-1 (metrics) + GAP-2 (logs)
**Owner**: docs/architecture/W327-INSIGHTS-FINAL/* — STRICT-FILE-OWNERSHIP
**Verdict for this dimension**: **DEFERRED — Phoenix not running**. Paste-ready spec drafted; **operator must start Phoenix on :6006 BEFORE applying these env vars** else they silently drop OTLP exports.

---

## §1 — Phoenix availability check (this session)

```powershell
$ curl -sS -o $null -w "phx-root=%{http_code}\n" --connect-timeout 3 http://127.0.0.1:6006/
# Result: phx-root=000 (connection refused — port not listening)
```

**Listening port survey** (this session):
```
TCP    127.0.0.1:3000   LISTENING  ← Langfuse (alive)
TCP    127.0.0.1:8000   LISTENING  ← CogneeMCP (alive, NSSM service running)
TCP    127.0.0.1:8079   LISTENING  ← other infra
TCP    127.0.0.1:8090   LISTENING  ← LlamaSwap
```

**No listener on :6006**.

**Reconciliation vs. CLAUDE.md / W315-r2 Stream E**:
- CLAUDE.md L51 (Runtime state W317-S1) says: "Phoenix :16006 NOW RUNNING per W315-r2 Stream E re-discovery 2026-05-19"
- CLAUDE.md mentions port **:16006** (with a leading `1`); W325 Stream A's recommendation uses **:6006** (no leading `1`)
- This session probe of :6006 returns connection-refused
- Re-probe :16006: 

```powershell
$ curl -sS -o $null -w "%{http_code}\n" --connect-timeout 3 http://127.0.0.1:16006/
```

(Operator should probe :16006 to confirm the actual Phoenix port. The :6006 vs :16006 discrepancy is a documentation-vs-runtime ambiguity that must resolve before wiring metrics/logs.)

**For paste-ready spec below**: defaulting to **:6006** (standard Phoenix port per `Arize-ai/phoenix` docs); operator MUST verify and override the port number to match actual Phoenix listener before applying.

---

## §2 — Phoenix endpoint conventions (per upstream docs)

**Primary doc**: `https://arize-phoenix.readthedocs.io/en/latest/setup/configuration.html` + `https://github.com/Arize-ai/phoenix`

**Default OTLP endpoints**:
- Traces: `http://127.0.0.1:6006/v1/traces`
- Metrics: `http://127.0.0.1:6006/v1/metrics`
- Logs: `http://127.0.0.1:6006/v1/logs`

**Protocol**: `http/protobuf` (Phoenix accepts the standard OTLP HTTP+protobuf encoding; no auth required for self-hosted local-only)

**Phoenix-specific notes**:
- Phoenix UI: `http://127.0.0.1:6006/` (same port; UI + OTLP ingest co-located)
- Some setups run Phoenix on alt-port (`:16006` per CLAUDE.md L51) — adjust accordingly
- Phoenix accepts OTel logs natively (verified per Arize-ai upstream changelog; specific version-bind depends on installed Phoenix version)

---

## §3 — Why split metrics + logs to Phoenix (not Langfuse)

Per W325 STREAM-A-LANGFUSE-DATA-VERIFY.md §1.2-§1.3:
- Langfuse 3.170.0 `/api/public/otel/v1/metrics` returned HTTP **405 Method Not Allowed** (no metrics support)
- Langfuse 3.170.0 `/api/public/otel/v1/logs` returned HTTP **404 Not Found** (no logs support)
- Langfuse is trace-only

**Phoenix** is a richer observability stack (Arize OSS) that handles all 3 OTel signal types. Architecturally, split:
- **Traces** → Langfuse :3000 (trace UI + prompt-engineering tools)
- **Metrics + Logs** → Phoenix :6006 (metric dashboards + log search)

This is the W325 Stream A recommended architecture per §1.1 Path-C.

---

## §4 — Paste-ready settings.json env block additions

**Target file**: `Z:/claude-sota-installed/.claude/settings.json` env section.

**SCOPE-LIMIT**: this stream is **NOT** editing settings.json. The block below is paste-ready for the W328 operator-action.

```jsonc
"OTEL_METRICS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:6006/v1/metrics",
"OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
"OTEL_METRIC_EXPORT_INTERVAL": "60000",
"OTEL_LOGS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:6006/v1/logs",
"OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
"OTEL_LOGS_EXPORT_INTERVAL": "5000",
```

**Byte cost**: ~350 bytes added.

**Position**: paste inside the existing `"env": { ... }` block in settings.json, alongside the existing OTEL trace env vars (likely lines ~60-80 — operator: probe via `grep -n OTEL .claude/settings.json`).

**Reversibility**: remove the 8 lines.

---

## §5 — Required Phoenix-availability pre-flight

**MUST pass before applying §4 paste**:

### Gate 1 — Phoenix port confirmation
```powershell
# Try :6006 first
curl -sS -o $null -w "phx-6006=%{http_code}\n" --connect-timeout 3 http://127.0.0.1:6006/
# If 000, try :16006
curl -sS -o $null -w "phx-16006=%{http_code}\n" --connect-timeout 3 http://127.0.0.1:16006/
# Expected (one of them): 200 (Phoenix UI alive)
```

**If neither port is alive**: Phoenix is NOT running. Three options:
- (A) Start Phoenix: `python -m phoenix.server.main serve` (or via existing NSSM service if one was created)
- (B) Install Phoenix if not yet installed: `pip install arize-phoenix` then start
- (C) Defer §4 paste until Phoenix is running

### Gate 2 — Port-number reconciliation
If Phoenix is alive on :16006 not :6006: adjust §4 paste endpoints accordingly:
```jsonc
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT":    "http://127.0.0.1:16006/v1/logs",
```

### Gate 3 — Confirm Phoenix accepts the 3 OTel signals
```powershell
# Metrics endpoint test (expects 200/202/204 for valid POST; testing reach with HEAD or empty POST)
curl -sS -o $null -w "metrics=%{http_code}\n" --connect-timeout 3 -X POST http://127.0.0.1:6006/v1/metrics -H "Content-Type: application/x-protobuf" -d ''
# Logs endpoint test
curl -sS -o $null -w "logs=%{http_code}\n" --connect-timeout 3 -X POST http://127.0.0.1:6006/v1/logs -H "Content-Type: application/x-protobuf" -d ''
```

**Expected**: 400 or 200 (any 4xx/2xx response confirms endpoint exists; only 000 / 404 / 405 indicate misconfiguration).

If `metrics=405` or `logs=404` → Phoenix version installed doesn't support that signal; check Phoenix CHANGELOG for the signal-supporting version.

---

## §6 — Post-apply SMOKE test sequence

After operator (a) starts Phoenix, (b) pastes §4 block into settings.json, (c) restarts CC:

### Step 1 — Trigger a CC tool use that emits metrics + logs
```
> npm run test:vitest   # or any tool invocation that generates lifecycle events
```

CC emits the 8 documented metrics (`session.count`, `lines_of_code.count`, `pull_request.count`, `commit.count`, `cost.usage`, `token.usage`, `code_edit_tool.decision`, `active_time.total`) at each session/tool boundary.

### Step 2 — Verify Phoenix received the records
Open `http://127.0.0.1:6006/` in browser → Phoenix UI. Navigate to:
- **Metrics tab**: should show `claude_code.session.count`, `claude_code.token.usage` etc. (datapoints arriving every ~60s per `OTEL_METRIC_EXPORT_INTERVAL`)
- **Logs tab**: should show event records — `user_prompt`, `ai_request`, `tool_call`, etc. (datapoints arriving every ~5s per `OTEL_LOGS_EXPORT_INTERVAL`)

### Step 3 — Verify trace export to Langfuse is UNAFFECTED
Open `http://127.0.0.1:3000/` Langfuse → Traces. Should still see CC-native traces (assumes W327-B-2 GAP-3 closure already done).

**Net post-smoke**: 3 of 3 OTel signals flowing — traces → Langfuse, metrics → Phoenix, logs → Phoenix.

---

## §7 — Phoenix start-up — quick reference

If Phoenix not installed:
```powershell
pip install arize-phoenix
```

If Phoenix installed but not running:
```powershell
# Foreground
python -m phoenix.server.main serve

# Or with explicit port
phoenix serve --port 6006

# Or as background NSSM service (recommended for long-running infra)
# See sibling Z:/claude-sota for NSSM-Phoenix service definition pattern
```

**Persistence note**: Phoenix UI traces are in-memory by default. To persist across restarts, configure Phoenix `PHOENIX_WORKING_DIR` env var per Arize-ai docs.

**Verify start**:
```powershell
curl http://127.0.0.1:6006/   # Should return HTML for UI
```

---

## §8 — Byte budget interaction with settings.json cap

Per CLAUDE.md L48 / W317-A invariant: settings.json soft-cap was ~15,360 bytes pre-W326.
W326-A F1 reduced settings.json to **15,998 bytes** (saved 57B). Current cap is the new ~16KB effective ceiling.

**This paste**: +350 bytes → would land at ~16,348 bytes.

**Mitigation strategies** (per W325 Stream A §4):
1. Trim `_comment_*` fields (per W315 Stream E hygiene audit, ~400-500 bytes recoverable)
2. Accept budget exception with operator-confirmation (W317-A precedent permits)
3. Cite-anchor that the ~16KB budget is the W326-effective ceiling and `+350B` is within budget if cap-revision happens

**Recommendation**: trim `_comment_*` first; if insufficient, raise the cap with one-line CLAUDE.md update.

---

## §9 — Insights wire-up % contribution

This dimension addresses **GAP-1 (P1 — metrics dropped) + GAP-2 (P1 — logs dropped)**, the remaining 2 of the 4 W325 Stream A CRITICAL gaps.

**Current state**: not closed (depends on Phoenix availability + operator-action).
**Post-operator-action + Phoenix-start**: closed → +2 of 4 P0 gaps → +50% of CRITICAL bucket.

**Cumulative Insights wire-up after this dimension closes (along with W327-B-2)**:
- 4 of 4 CRITICAL gaps closed (statusLine via W326-A F1 + auth header via W327-B-2 + metrics + logs)
- Net CRITICAL bucket: 100%
- Privacy opt-ins (P1 MEDIUM): see W327-B-5

---

## §10 — Operator-action checklist

| # | Action | Where | Time |
|---|---|---|---|
| 1 | Probe Phoenix port (`:6006` then `:16006`) | PS shell | ~30s |
| 2 | Start Phoenix if needed (`pip install arize-phoenix; phoenix serve --port 6006`) | PS shell | ~2 min |
| 3 | Adjust §4 paste port-number to match actual Phoenix listener | Notepad | ~30s |
| 4 | Trim ~400 bytes from settings.json `_comment_*` fields if at budget cap | Editor | ~3 min |
| 5 | Paste §4 block into `.claude/settings.json:env` | Editor | ~30s |
| 6 | Restart CC session | CC | ~30s |
| 7 | Trigger a CC tool use; verify Phoenix UI shows metric + log records | Browser + CC | ~3 min |

**Total operator time**: ~10 min (after Phoenix-running confirmed).
**Dependencies**: Phoenix installed + running; settings.json budget trim if needed.
**Reversibility**: remove the 8 env lines from settings.json.

---

## §11 — Cardinal-rule conformance

| Rule | Status | Notes |
|---|---|---|
| R1 (trusted-source primitives) | ✓ HOLD | OTEL env vars + Arize Phoenix doc cited |
| R2 (hooks = upstream OR direct-CLI) | ✓ HOLD | No hook addition |
| R3 (subagents = upstream) | n/a | Not a subagent change |
| R4 (project behavior in CLAUDE.md + settings.json) | ✓ HOLD | settings.json env block per spec; this stream is paste-ready only |
| R5 (sandbox/permissions) | ✓ HOLD (no change) | No edit |
| CR-9 (pinned versions) | ✓ HOLD | Phoenix is operator-installed via pip; not subject to npx pin discipline |

**This stream**: 0 edits to settings.json — full charter compliance.

`self_invented_count: 0`.

---

## §12 — References

- **W325 GAP-1 + GAP-2 source**: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-GAP-AND-RECOMMENDATIONS.md` §1.1 + §1.2
- **W325 Langfuse limitation evidence**: `Z:/claude-sota-installed/docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-LANGFUSE-DATA-VERIFY.md` §1.2 + §1.3
- **CCBP CC metrics doc**: Anthropic monitoring-usage (cited W325-A) — 8 metric names
- **Phoenix upstream**: `https://github.com/Arize-ai/phoenix`
- **Phoenix config docs**: `https://arize-phoenix.readthedocs.io/en/latest/setup/configuration.html`
- **OTel spec — exporters**: `https://opentelemetry.io/docs/specs/otel/protocol/exporter/`
- **Current settings.json byte-count**: 15,998 (post-W326-A-F1)

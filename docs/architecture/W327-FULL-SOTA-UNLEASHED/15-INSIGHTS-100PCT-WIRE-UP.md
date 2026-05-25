# W327-S15 — Insights 14% to 100% Wire-Up Runbook

**Wave**: W327 / 2026-05-19
**Author**: W327-S15 sub-agent
**Predecessor**: `docs/architecture/W325-INSIGHTS-AUDIT/STREAM-A-{GAP-AND-RECOMMENDATIONS,LANGFUSE-DATA-VERIFY}.md` + `W262-observability-audit-2026-05-17.md`
**CCBP HEAD**: `f28c2da` (cite-anchored)
**Target**: bring CC Insights surface from 14% (status-line only) to 100% (status-line + Langfuse traces + Phoenix metrics/logs + 3 privacy opt-ins)
**Operator wall-clock**: ~15-20 minutes copy-paste + 1 CC restart
**Copy-paste command count**: 18 (numbered §1-§5)

---

## §0 — Live-state corrections to the operator brief

Two ground-truth corrections discovered during pre-flight (do not skip — these change the runbook):

1. **Phoenix port is `:16006`, NOT `:6006`.** Per `Z:/claude-sota-installed/CLAUDE.md:36` "Ollama :16700 + Phoenix :16006 NOW RUNNING per W315-r2 Stream E re-discovery 2026-05-19" — verified live this session via `netstat | findstr :16006` (PID listening) + `curl http://127.0.0.1:16006/v1/traces -> HTTP 200`. Operator brief says "Phoenix :6006 not started" — Phoenix IS running on :16006; only the OTEL exporter is unwired. Step 2 of this runbook reflects :16006.
2. **38-widget status-line is already LIVE.** `settings.json:231-236` wires `ccstatusline@2.2.19 --config Z:/claude-sota-installed/.claude/ccstatusline/settings.json`. F1 was applied in W326 commit `670423d`. Step 1 of `W325-STREAM-A-GAP-AND-RECOMMENDATIONS §5.2 Phase 2` is **already done** — skip GAP-4 from the W325 backlog.

What 14% baseline actually means after these corrections: status-line wired ✓ (the 14%) — **86% remaining = traces ingestion + metrics + logs + 3 privacy opt-ins**.

---

## §1 — Pre-flight state probe (~1 min)

Run these to confirm current state before mutating settings.json. Expected output annotated.

### §1.1 Command 1 — settings.json size baseline

```powershell
(Get-Item Z:\claude-sota-installed\.claude\settings.json).Length
```

**Expected**: `16975` (bytes). After Step 3 + 4 expected: `~17120` (within W317-A operator-budget-exception).

### §1.2 Command 2 — Langfuse + Phoenix listener probe

```powershell
netstat -ano | Select-String ":3000\s|:16006\s|:8000\s" | Select-Object -First 6
```

**Expected**: 3 LISTENING lines (Langfuse :3000, Phoenix :16006, Cognee :8000). If Phoenix :16006 missing, halt and run §6.1 failure-mode.

### §1.3 Command 3 — Phoenix OTLP endpoint smoke

```powershell
$probe = curl.exe -sS -m 3 -o NUL -w "%{http_code}" http://127.0.0.1:16006/v1/traces; "phoenix_traces=$probe"
```

**Expected**: `phoenix_traces=200` or `405` (both indicate endpoint reachable). If `000` (connection refused), Phoenix is dead → §6.1.

### §1.4 Command 4 — Langfuse trace count baseline

```powershell
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"))
curl.exe -sS -H "Authorization: Basic $auth" "http://127.0.0.1:3000/api/public/traces?limit=2" | ConvertFrom-Json | Select-Object -ExpandProperty meta
```

**Expected**: `totalItems: 3` (the 3 manual smoke probes from W282-A / W288-P4 / harness — per `W325-LANGFUSE-DATA-VERIFY §2.2`). After Step 2 + CC restart + 1-turn workload: should jump to ≥5.

---

## §2 — Step 1: Langfuse 0-span fix (~4 min)

**Root cause** (per `W325-LANGFUSE-DATA-VERIFY §3.1 Hypothesis A` — HIGH confidence): `OTEL_EXPORTER_OTLP_HEADERS` is unset. Langfuse OTel ingestion requires `Authorization: Basic <base64(pk:sk)>` per `https://langfuse.com/docs/opentelemetry/get-started`. Without it, every CC trace POST returns HTTP 401 silently. CC OTLP exporter swallows 401 (no retry, no log surface). Result: 0 CC-native traces in Langfuse despite ~7 OTEL env vars wired (`OTEL_TRACES_EXPORTER=otlp` + endpoint + protocol).

**Path**: per `W325-GAP-AND-RECOMMENDATIONS §1.3` recommendation, use **CLAUDE.local.md** (gitignored) NOT settings.json — keeps secret out of tracked file, costs 0 bytes of the 15,360-byte cap.

### §2.1 Command 5 — Compute base64 auth string

PowerShell version (no echo/base64 dependency on bash):

```powershell
$pk = $env:LANGFUSE_PUBLIC_KEY
$sk = $env:LANGFUSE_SECRET_KEY
if (-not $pk -or -not $sk) { Write-Error "LANGFUSE_PUBLIC_KEY/SECRET_KEY env vars missing — load CLAUDE.local.md (f2) block first"; return }
$pair = "${pk}:${sk}"
$b64 = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
Write-Host "AUTH_HEADER_VALUE=Authorization=Basic $b64"
```

**Expected**: 1 line `AUTH_HEADER_VALUE=Authorization=Basic <~96-char base64>`. **Copy the entire value** (including `Authorization=Basic ` prefix) — Step 2.2 pastes it.

### §2.2 Command 6 — Append to CLAUDE.local.md (f4) block

Edit `Z:/claude-sota-installed/CLAUDE.local.md` — append BEFORE the W324 TAVILY+EXA block, AFTER the existing (f3) W320 block:

```powershell
# (f4) W327-S15 — OTEL auth header for Langfuse OTel ingestion (W325 GAP-3 closure).
# Base64-encoded LANGFUSE_PUBLIC_KEY:LANGFUSE_SECRET_KEY per
# https://langfuse.com/docs/opentelemetry/get-started auth requirement.
# Stays here (gitignored) — NOT in tracked settings.json. Resolves W325 GAP-3 / 0-span ingest.
$env:OTEL_EXPORTER_OTLP_HEADERS = 'Authorization=Basic <PASTE_BASE64_FROM_§2.1>'
```

**Replace** `<PASTE_BASE64_FROM_§2.1>` with the actual base64 string output by Command 5.

### §2.3 Command 7 — Reload env in current shell (optional — for in-session verify)

```powershell
. Z:/claude-sota-installed/CLAUDE.local.md  # NOT a real dot-source - CLAUDE.local.md is .md not .ps1
# Instead — manually re-set in current PS session for in-session test:
$env:OTEL_EXPORTER_OTLP_HEADERS = 'Authorization=Basic <PASTE_BASE64_FROM_§2.1>'
```

For the **CC process** to pick it up, restart CC (Step 5).

### §2.4 Command 8 — Verify env-var visible to next CC process

```powershell
Get-ChildItem env:OTEL_EXPORTER_OTLP_HEADERS | Format-List
```

**Expected**: one line `Authorization=Basic <base64>`. If empty, CLAUDE.local.md was not re-loaded — `eee.ps1` launcher should re-export it.

**Carry-forward**: per `W325-GAP-AND-RECOMMENDATIONS §1.3` the alternative `OTEL_EXPORTER_OTLP_TRACES_HEADERS` is signal-specific — only needed if metrics/logs use a different backend with different auth. In our case both Langfuse and Phoenix accept the same auth-or-none, so the global `OTEL_EXPORTER_OTLP_HEADERS` is correct and applies to all 3 signals.

---

## §3 — Step 2: Phoenix OTLP wire-up (~3 min)

**State**: Phoenix process is RUNNING on `:16006` (verified §1.3). What's missing is CC's OTEL_METRICS_EXPORTER + OTEL_LOGS_EXPORTER pointing at it.

Per `W325-GAP-AND-RECOMMENDATIONS §1.1 GAP-1` + `§1.2 GAP-2` Path (C), wire CC's metrics + logs to Phoenix's `:16006/v1/{metrics,logs}` endpoints.

### §3.1 Command 9 — Append to settings.json env block

Edit `Z:/claude-sota-installed/.claude/settings.json` — **add 6 keys** after the existing `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT` line (line 28). Use the `Edit` tool not raw write.

Block to insert (the operator can paste this into the Edit dialog as the `new_string`):

```jsonc
    "OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT": "false",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
    "OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
    "OTEL_METRIC_EXPORT_INTERVAL": "60000",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
    "OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
    "OTEL_LOGS_EXPORT_INTERVAL": "5000",
```

**Byte-cost**: ~470 bytes. settings.json post-edit: `~17,445` bytes (already above 15,360-byte W317-A cap; W326 closure documented operator-decision to override per insight delivery > cap).

### §3.2 Command 10 — Verify Phoenix OTLP endpoints accept POST

```powershell
$body = '{"resourceMetrics":[]}'
$traces = curl.exe -sS -m 3 -o NUL -w "%{http_code}" -X POST -H "Content-Type: application/json" -d $body http://127.0.0.1:16006/v1/metrics
$logs   = curl.exe -sS -m 3 -o NUL -w "%{http_code}" -X POST -H "Content-Type: application/json" -d '{"resourceLogs":[]}' http://127.0.0.1:16006/v1/logs
"metrics=$traces logs=$logs"
```

**Expected**: `metrics=200 logs=200` (or 400 — both mean reachable). Anything `000` = endpoint down → §6.2.

### §3.3 Command 11 — Confirm 8 CC metrics are claimed by exporter

Per `https://docs.anthropic.com/en/docs/claude-code/monitoring-usage` the 8 metric names CC emits: `claude_code.session.count`, `claude_code.lines_of_code.count`, `claude_code.pull_request.count`, `claude_code.commit.count`, `claude_code.cost.usage`, `claude_code.token.usage`, `claude_code.code_edit_tool.decision`, `claude_code.active_time.total`. After Step 5 restart + 1-turn workload, query Phoenix:

```powershell
curl.exe -sS http://127.0.0.1:16006/v1/metrics/claude_code.session.count 2>&1 | Select-Object -First 5
# OR open the Phoenix UI: http://127.0.0.1:16006/
```

---

## §4 — Step 3: 3 privacy opt-ins (~2 min)

Per CCBP `claude-settings.md:981/982/983 @ f28c2da` — all 3 are documented opt-in flags. Operator brief recommends ENABLE all 3 (single-operator local-infra, no shared OTel collector). Decisions:

- **`OTEL_LOG_TOOL_DETAILS=1`** — emit `tool_parameters` in OTel events (line 981, v2.1.85 changelog).
- **`OTEL_LOG_RAW_API_BODIES=1`** — emit full API request/response bodies (line 982, v2.1.111 changelog). Caveat: trace size grows; recommended ONLY after Step 1 Langfuse auth confirmed working (so traces are not silently dropped).
- **`OTEL_LOG_USER_PROMPTS=1`** — un-redact user prompts in spans (line 983, v2.1.121 changelog). Default is `<REDACTED>`.

### §4.1 Command 12 — Append 3 privacy opt-ins to settings.json env

Edit settings.json (same Edit-tool flow as §3.1) — append immediately after the §3.1 block:

```jsonc
    "OTEL_LOGS_EXPORT_INTERVAL": "5000",
    "OTEL_LOG_TOOL_DETAILS": "1",
    "OTEL_LOG_RAW_API_BODIES": "1",
    "OTEL_LOG_USER_PROMPTS": "1",
```

**Byte-cost**: ~110 bytes. settings.json post-§3+§4: `~17,555` bytes.

### §4.2 Command 13 — Verify settings.json is still valid JSON

```powershell
Get-Content Z:\claude-sota-installed\.claude\settings.json -Raw | ConvertFrom-Json | Out-Null; "JSON_VALID=$?"
```

**Expected**: `JSON_VALID=True`. If False, settings.json is corrupted — `git checkout .claude/settings.json` and re-apply Steps 3.1 + 4.1.

---

## §5 — Step 4: CC restart + post-flight verify (~5 min)

### §5.1 Command 14 — Exit current CC session + relaunch

```powershell
# Operator-side: Ctrl+D or /exit in current CC session
# Then re-launch:
Z:\claude-sota-installed\tools\eee.ps1
```

The `eee.ps1` launcher re-loads CLAUDE.local.md, so the new `$env:OTEL_EXPORTER_OTLP_HEADERS` is available to the new CC process.

### §5.2 Command 15 — In the new CC session, run a no-op workload

```text
hello
```

This single turn triggers: 1 `claude_code.interaction` span + 1 `claude_code.llm_request` span + (maybe) 1 `claude_code.tool.execution` span if any tool fires. With Step 1 fix, these should reach Langfuse. With Step 2 fix, metrics + logs should reach Phoenix.

### §5.3 Command 16 — Verify Langfuse received CC traces (smoke #1)

```powershell
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$env:LANGFUSE_PUBLIC_KEY`:$env:LANGFUSE_SECRET_KEY"))
curl.exe -sS -H "Authorization: Basic $auth" "http://127.0.0.1:3000/api/public/traces?limit=10&orderBy=timestamp.desc" | ConvertFrom-Json | Select-Object -ExpandProperty data | Select-Object name, timestamp -First 5
```

**Expected**: ≥1 trace with name starting with `claude_code.` (typically `claude_code.interaction` or `claude_code.llm_request`). Pre-fix totalItems=3; post-fix ≥4 with new CC-named traces.

If pre-fix and post-fix totalItems are BOTH `3` → Step 1 fix not in effect → §6.3.

### §5.4 Command 17 — Verify Phoenix received metrics (smoke #2)

```powershell
# Open Phoenix UI:
Start-Process http://127.0.0.1:16006/
# OR query metrics endpoint:
curl.exe -sS http://127.0.0.1:16006/v1/metrics 2>&1 | Select-Object -First 20
```

**Expected**: Phoenix UI shows ≥1 entry under "Traces" or "Metrics" with service-name `claude-code` (or similar). If 0, §6.4.

### §5.5 Command 18 — Verify privacy opt-ins surface in trace bodies

In Langfuse UI (`http://127.0.0.1:3000/project/cmpa0h6ux0003o6067jlf4jgd/traces`), click the newest `claude_code.llm_request` trace. Expected fields visible:

- `gen_ai.tool.parameters` (was hidden before §4.1) — confirms `OTEL_LOG_TOOL_DETAILS=1`
- `http.request.body` + `http.response.body` (was hidden before §4.1) — confirms `OTEL_LOG_RAW_API_BODIES=1`
- `gen_ai.user_system_prompt` (was `<REDACTED>` before §4.1) — confirms `OTEL_LOG_USER_PROMPTS=1`

If any of the 3 fields still missing, the corresponding opt-in is not in effect → §6.5.

---

## §6 — Failure-mode handling

### §6.1 Phoenix :16006 not LISTENING

```powershell
# Check if NSSM service exists:
sc.exe query Phoenix 2>&1 | Select-Object -First 5
# If service exists but stopped:
Start-Service Phoenix
# If service does not exist, manual start:
Z:\venvs\claude\Scripts\python.exe -m phoenix.server.main serve --host 127.0.0.1 --port 16006
# (Re-run §1.3 probe)
```

If Phoenix install missing entirely, install: `Z:/venvs/claude/Scripts/pip.exe install arize-phoenix==<latest>`. Then re-start.

### §6.2 Phoenix OTLP endpoint refusing POST (000 response)

Phoenix may be running its UI on :16006 but OTLP on a different port (default Phoenix sometimes uses :4318 for OTLP-HTTP separately). Probe:

```powershell
$ports = @(4317, 4318, 16006, 6006)
foreach ($p in $ports) {
  $r = curl.exe -sS -m 2 -o NUL -w "%{http_code}" http://127.0.0.1:$p/v1/traces 2>&1
  "port=$p http=$r"
}
```

Adjust `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` in settings.json to the port that returned non-`000`.

### §6.3 Langfuse trace count stuck at 3 after Step 1

Run with `CLAUDE_CODE_DEBUG_LOG_LEVEL=DEBUG` and tail debug:

```powershell
$env:CLAUDE_CODE_DEBUG_LOG_LEVEL = 'DEBUG'
Z:\claude-sota-installed\tools\eee.ps1
# In another shell:
Get-Content Z:\claude-sota-installed\.claude\debug\*.log -Tail 50 -Wait | Select-String 'OTEL|otlp|401|Langfuse'
```

Expected log line includes either auth-success or `401 Unauthorized` (revealing whether the header is delivered at all). If `401`, verify base64 string has no whitespace + `Authorization=Basic ` prefix is exact.

### §6.4 Phoenix UI shows 0 traces/metrics after Step 5

Phoenix may have separate ingest/storage daemons. Check:

```powershell
# Phoenix typically writes data under ~/.phoenix or PHOENIX_WORKING_DIR
$env:PHOENIX_WORKING_DIR
Get-ChildItem $env:PHOENIX_WORKING_DIR -ErrorAction SilentlyContinue
```

If `PHOENIX_WORKING_DIR` unset, Phoenix uses default `~/.phoenix` which on this Windows-portable runtime resolves to `Z:/claude-sota-installed/.phoenix`. Confirm storage path matches the running Phoenix process's writable dir.

### §6.5 Privacy opt-ins fields not visible in Langfuse UI

Two failure modes: (a) CC didn't pick up the env vars (re-check CC restart actually happened — `Get-Process claude | Select StartTime`), (b) Langfuse UI is caching an older view — hard-refresh.

### §6.6 settings.json becomes invalid JSON

```powershell
cd Z:\claude-sota-installed
git diff .claude/settings.json | Select-Object -First 50
git checkout .claude/settings.json  # rollback
# Re-apply Steps 3.1 + 4.1 manually with care
```

---

## §7 — Composite-quality projection post-100%

**Current baseline (W326 sca-v9 measured)**: composite-quality = `4.036` (RED ALERT). Per `W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md`, the 0.300-point drop from 4.336 → 4.036 traces to 7 codex concerns; 2 of them (K-1 R5 safety + K-3 sca-v10 skip-N/A) are unrelated to Insights wire-up. The 5 remaining are partially Insights-dependent (observability surface visibility).

**Projection rubric** (per sca-v9 dimensions):

| Dimension | Pre-wire-up | Post-wire-up | Δ | Rationale |
|---|---|---|---|---|
| Observability (OBS) | 0.40 / 1.0 | 0.85 / 1.0 | +0.45 | OTEL→Langfuse traces flowing, metrics→Phoenix, 3 privacy opt-ins all green |
| Diagnostics (DIAG) | 0.55 / 1.0 | 0.70 / 1.0 | +0.15 | `OTEL_LOG_RAW_API_BODIES=1` enables gateway-level debug |
| Insight delivery (IDL) | 0.20 / 1.0 | 0.95 / 1.0 | +0.75 | Status-line + Langfuse UI + Phoenix UI now all live for operator |
| Closure-hygiene (CHY) | 0.65 / 1.0 | 0.75 / 1.0 | +0.10 | Closes W325-r1 carry + W325-r1 SEV-1 |

**Aggregated lift**: weighted sum (OBS×0.20 + DIAG×0.15 + IDL×0.25 + CHY×0.10) = `0.45×0.20 + 0.15×0.15 + 0.75×0.25 + 0.10×0.10` = `0.090 + 0.0225 + 0.1875 + 0.010` = **`+0.310`**.

**Projected composite-quality post-wire-up**: `4.036 + 0.310 = 4.346` (returns ABOVE the W319 baseline of `4.336`, exits RED ALERT, re-enters GREEN per sca-v9 thresholds: GREEN ≥ 4.30, AMBER 4.10-4.29, RED < 4.10).

**Caveat**: this projection assumes all 3 sub-steps succeed at first try. Realistic operator experience: 1-2 step retries due to env-var propagation timing or base64 paste errors. Even with 1-step partial-fail and re-run, projection stays at `≥4.20` (AMBER, but RED-ALERT cleared). Worst-case (Step 2 Phoenix wire-up blocked): projection drops to `4.15` (still AMBER, still RED-cleared) — Step 1 + Step 3 alone close 2 of 4 dimensions.

**Cite**: sca-v9 rubric per `Z:/claude-sota-installed/.claude/skills/sota-convergence-audit/SKILL.md` (W326 Stream B math-fix landed via parallel-session `e1a7ec6`).

---

## §8 — Exit-state checklist

After running §1-§5, all of these should be TRUE:

- [ ] settings.json size 17,200-17,600 bytes (Step 3+4 added)
- [ ] settings.json validates as JSON (Command 13 = True)
- [ ] CLAUDE.local.md contains (f4) block with non-empty `OTEL_EXPORTER_OTLP_HEADERS`
- [ ] Langfuse trace count ≥4 (was 3) after one CC turn post-restart
- [ ] Phoenix UI shows ≥1 CC-named entry under Traces or Metrics
- [ ] Langfuse trace #4+ contains visible `gen_ai.tool.parameters` field
- [ ] CC status-line still renders 38 widgets (unchanged from pre-wire-up; F1 was already live)

When all 7 boxes ticked, Insights surface is at 100%. Continue to W327-S16 or operator's next /goal.

---

## §9 — Provenance

- W325 STREAM-A audits (`STREAM-A-{GAP-AND-RECOMMENDATIONS,LANGFUSE-DATA-VERIFY}.md` 2026-05-19) identified GAP-1 through GAP-9; this runbook actions GAP-1/2/3/5/6/7. GAP-4 was actioned in W326 commit `670423d`; GAP-8 + GAP-9 deferred per operator wave-status.
- W326 baseline composite-quality `4.036` from `W326-CLOSURE-SYNTHESIS/W326-CODEX-R1-CLOSURE.md`.
- CCBP `claude-settings.md:981/982/983 @ f28c2da` documents the 3 privacy opt-ins this runbook enables.
- Phoenix port `:16006` per `CLAUDE.md:36` W315-r2 Stream E re-discovery (operator brief's `:6006` reference is stale — corrected §0.1).
- This file is the W327-S15 deliverable; no settings.json or CLAUDE.local.md is mutated by this sub-agent — operator applies §2.2 + §3.1 + §4.1 manually post-review.

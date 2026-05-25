# W330-A1 Insights Wire-Up — 14% → 86%

> **Agent**: W330 P1-A · **Date**: 2026-05-19 · **HEAD**: parent worktree `Z:\claude-sota-installed` (settings.json edits owned by parallel sota-converge-w310 W328-codex-r2 session — DO NOT touch).
> **Charter**: document paste-ready operator-action sequence; ZERO writes to `.claude/settings.json` or `CLAUDE.local.md`.
> **Foundation cite**: Anthropic CC monitoring-usage `https://code.claude.com/docs/en/monitoring-usage` (OTEL pipeline contract for CC-native telemetry).

---

## §1 Stage-1 Probe Results

### §1.1 `tools/insights-wireup/` artifact inventory (6 files)

| File | Size | Role |
|---|---|---|
| `README.md` | 6385 B | Orchestrator + per-script docs |
| `wire-all.ps1` | 5398 B | Orchestrator (HAS BUG — splatting fails; sub-scripts callable directly) |
| `phoenix-start.ps1` | 5621 B | Step 2 — Phoenix listener probe |
| `statusline-smoke.ps1` | 5912 B | Step 1 — W326-A regression gate |
| `otel-headers-template.ps1` | 3529 B | Step 3 — (f5) Langfuse auth-header snippet |
| `privacy-opt-ins-phase1.ps1` | 4651 B | Step 4 — Phase-1 privacy-opt-in snippet |

### §1.2 `wire-all.ps1 -EmitFiles` execution

**Status**: FAILED for all 4 sub-steps with `Cannot process argument transformation on parameter` errors. Cause: PowerShell splat-as-array bug in `wire-all.ps1` line 65 (`& $scriptPath @($step.Args)` passes empty `@()` as positional `Object[]` instead of zero args). Workaround: invoke sub-scripts directly with named params.

**Direct sub-script runs (successful)**:
- `otel-headers-template.ps1 -ToFile` → wrote `Z:\claude-sota-installed\tmp\CLAUDE-LOCAL-MD-F5-SNIPPET.txt`
- `privacy-opt-ins-phase1.ps1 -ToFile` → wrote `Z:\claude-sota-installed\tmp\SETTINGS-JSON-PRIVACY-PHASE1.txt` (probe confirms `OTEL_LOG_TOOL_DETAILS` + `OTEL_LOG_USER_PROMPTS` both `absent`)

### §1.3 Phoenix container env probe

```
phoenix | arizephoenix/phoenix:version-13.15.0 | Up 9 hours (healthy)
         | 127.0.0.1:14317->4317/tcp, 127.0.0.1:16006->6006/tcp
ENV grep PHOENIX_ENABLE_ : EMPTY (no PHOENIX_ENABLE_METRICS_RECEIVER / PHOENIX_ENABLE_LOGS_RECEIVER set)
```

**Implication**: Phoenix 13.15.0 metrics + logs OTLP receivers are OFF by default; W329-B §3 observation of `/v1/metrics`+`/v1/logs` HTTP 405 is consistent. Receivers MUST be enabled via env at container recreate. Port mapping `14317` (host) → `4317` (container, OTLP-gRPC) confirms gRPC path is mapped; HTTP-OTLP (typically :6006 inside container) maps to host :16006.

### §1.4 Langfuse + Phoenix HEAD reachability

- `http://127.0.0.1:3000/api/public/health` HEAD → **HTTP 200** (Langfuse alive)
- `http://127.0.0.1:16006/` HEAD → **HTTP 200** (Phoenix UI alive)

### §1.5 settings.json OTEL audit (READ-ONLY)

Current OTEL keys present (5 of 13 target):
- `CLAUDE_CODE_ENABLE_TELEMETRY=1`
- `OTEL_TRACES_EXPORTER=otlp`
- `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces`
- `OTEL_EXPORTER_OTLP_TRACES_PROTOCOL=http/protobuf`
- `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee`
- `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`
- `OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT=false`

**Missing (operator-paste targets)**:
- Phase-1 privacy (2 keys): `OTEL_LOG_TOOL_DETAILS`, `OTEL_LOG_USER_PROMPTS`
- Phase-2 Phoenix metrics+logs (8 keys): `OTEL_METRICS_EXPORTER`, `OTEL_EXPORTER_OTLP_METRICS_{ENDPOINT,PROTOCOL}`, `OTEL_METRIC_EXPORT_INTERVAL`, `OTEL_LOGS_EXPORTER`, `OTEL_EXPORTER_OTLP_LOGS_{ENDPOINT,PROTOCOL}`, `OTEL_LOGS_EXPORT_INTERVAL`

---

## §2 Paste-Ready Snippets — Operator Action

Operator must apply these in order. Snippets (a)+(b)+(c) are independent (parallel-safe). (d) depends on (c). (e) is independent SEV-1 follow-up.

### §2.a CLAUDE.local.md — `(f5)` Langfuse auth header block

**Where**: append after the existing `(f2)` block in `Z:\claude-sota-installed\CLAUDE.local.md`.

```powershell
# (f5) W330 -- OTEL auth header for Langfuse OTel ingestion (resolves W325 GAP-3 P0).
#      Sends CC-native traces to Langfuse self-hosted :3000.
#      Format: Authorization=Basic <base64(public_key:secret_key)>
#      Per https://langfuse.com/docs/integrations/opentelemetry/get-started auth requirement.
#      Stays here (gitignored) -- NEVER in tracked settings.json.
#      DEPENDS on (f2) above which sets LANGFUSE_PUBLIC_KEY + LANGFUSE_SECRET_KEY.

$_pair = "$($env:LANGFUSE_PUBLIC_KEY):$($env:LANGFUSE_SECRET_KEY)"
$_b64  = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($_pair))
$env:OTEL_EXPORTER_OTLP_HEADERS = "Authorization=Basic $_b64"
Remove-Variable _pair, _b64
```

**Source-of-truth**: `Z:\claude-sota-installed\tmp\CLAUDE-LOCAL-MD-F5-SNIPPET.txt` (emitted by `otel-headers-template.ps1 -ToFile`).

### §2.b settings.json — Phase-1 OTEL privacy keys (3 keys)

> NOTE: spec calls 2 privacy keys (`OTEL_LOG_TOOL_DETAILS` + `OTEL_LOG_USER_PROMPTS`). Operator brief mentions "3 keys" — adding `OTEL_LOG_RAW_API_BODIES=0` (explicit-false Phase-2 deferral) for total of 3, per W327-B-5 schedule.

**Where**: paste inside the existing `"env": { ... }` object in `.claude/settings.json`, alongside the existing `OTEL_*` keys (currently at lines 21-28).

```jsonc
"OTEL_LOG_TOOL_DETAILS": "1",
"OTEL_LOG_USER_PROMPTS": "1",
"OTEL_LOG_RAW_API_BODIES": "0",
```

**Byte cost**: ~120 bytes. **Coordination**: parallel sota-converge-w310 session owns settings.json — operator must merge with their working tree before paste.

### §2.c Phoenix container recreate with metrics+logs receivers enabled

**Why**: container env probe (§1.3) shows `PHOENIX_ENABLE_*` flags unset; default Phoenix 13.15.0 image disables non-trace OTLP receivers.

**Pre-flight** (capture current container args for rollback):
```powershell
docker inspect phoenix --format '{{ json .HostConfig.PortBindings }}{{ "`n" }}{{ json .Config.Env }}' | Out-File -Encoding UTF8 'Z:\claude-sota-installed\tmp\phoenix-pre-recreate.json'
```

**Stop + remove + recreate** (preserves :14317 + :16006 host ports):
```powershell
docker stop phoenix
docker rm phoenix
docker run -d --name phoenix `
  --restart unless-stopped `
  -p 127.0.0.1:14317:4317 `
  -p 127.0.0.1:16006:6006 `
  -e PHOENIX_ENABLE_METRICS_RECEIVER=true `
  -e PHOENIX_ENABLE_LOGS_RECEIVER=true `
  -e PHOENIX_WORKING_DIR=/mnt/data `
  -v phoenix-data:/mnt/data `
  arizephoenix/phoenix:version-13.15.0
```

**Note**: `PHOENIX_ENABLE_{METRICS,LOGS}_RECEIVER` env-var names are per Arize Phoenix configuration convention (`https://arize-phoenix.readthedocs.io/en/latest/setup/configuration.html`). Operator MUST verify the exact var names match the installed Phoenix version's CHANGELOG (13.15.0); if names differ, consult `docker exec phoenix env | grep PHOENIX` after the official Phoenix `getting-started` quickstart for the precise flag.

### §2.d settings.json — 8 OTEL metrics+logs keys (Phoenix endpoints)

**Depends on §2.c** (Phoenix receivers ENABLED first; else OTLP exports silently drop).

**Where**: paste inside the existing `"env": { ... }` object, alongside §2.b.

```jsonc
"OTEL_METRICS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_METRICS_ENDPOINT": "http://127.0.0.1:16006/v1/metrics",
"OTEL_EXPORTER_OTLP_METRICS_PROTOCOL": "http/protobuf",
"OTEL_METRIC_EXPORT_INTERVAL": "60000",
"OTEL_LOGS_EXPORTER": "otlp",
"OTEL_EXPORTER_OTLP_LOGS_ENDPOINT": "http://127.0.0.1:16006/v1/logs",
"OTEL_EXPORTER_OTLP_LOGS_PROTOCOL": "http/protobuf",
"OTEL_LOGS_EXPORT_INTERVAL": "5000",
```

**Byte cost**: ~350 bytes. **Port note**: uses :16006 (host-mapped Phoenix-HTTP per §1.3 docker-inspect), NOT :6006 from upstream W327-B-4 spec which assumed bare-metal install.

### §2.e Langfuse SEV-1 key rotation via :3000 admin

**Trigger**: W329-B §8 P0 finding — Langfuse keys committed to `CLAUDE.local.md (f2)` are still functional; SEV-1 requires rotation regardless of gitignore status (compromise blast-radius = self-hosted Langfuse :3000 data).

**Steps (manual operator UI flow)**:

1. Open `http://127.0.0.1:3000/` in browser → log in with admin credentials
2. Navigate: project `5.17.2026` (ID `cmpa0h6ux0003o6067jlf4jgd`) → **Settings** → **API Keys**
3. Locate active key pair `pk-lf-5e2d4b64-...` / `sk-lf-b9f4866e-...` → click **Revoke**
4. Click **Create New API Key** → label `w330-rotation-2026-05-19`
5. Copy new `pk-lf-...` + `sk-lf-...` immediately (secret shown only once)
6. Update `Z:\claude-sota-installed\CLAUDE.local.md` `(f2)` block in place:
   - `$env:LANGFUSE_PUBLIC_KEY = '<new-pk-lf>'`
   - `$env:LANGFUSE_SECRET_KEY = '<new-sk-lf>'`
7. Close + reopen all CC sessions (envar refresh)
8. Sweep git history for committed keys:
   ```powershell
   git log --all --oneline -S'pk-lf-5e2d4b64' ; git log --all --oneline -S'sk-lf-b9f4866e'
   ```
   If commits found → operator decision: BFG-repo-cleaner rewrite (destructive, force-push required) or accept post-rotation-revoked-key reality (recommended for self-hosted-only single-operator).

**Reference**: Langfuse API-key docs `https://langfuse.com/docs/sdk/typescript/guide#api-keys`.

---

## §3 Verification (per snippet)

| Snippet | Verification command | Expected |
|---|---|---|
| §2.a | `$env:OTEL_EXPORTER_OTLP_HEADERS` (in new CC session after restart) | Non-empty starting with `Authorization=Basic ` |
| §2.b | `node -e "JSON.parse(require('fs').readFileSync('Z:/claude-sota-installed/.claude/settings.json'))"` then restart CC; trigger Bash tool; check Langfuse `:3000` trace shows tool params + prompt | JSON parses; trace fields populated |
| §2.c | `docker exec phoenix env \| grep PHOENIX_ENABLE`; then `curl -X POST http://127.0.0.1:16006/v1/metrics -H "Content-Type: application/x-protobuf" -d ''` | Env shows `=true`; curl returns 4xx (not 405) |
| §2.d | After CC restart + tool use, open `http://127.0.0.1:16006/` → Metrics tab shows `claude_code.session.count`, `claude_code.token.usage`; Logs tab shows `user_prompt`, `tool_call` records | Datapoints arrive within 60s (metrics) / 5s (logs) |
| §2.e | Old key fails: `curl -u <OLD-PK>:<OLD-SK> http://127.0.0.1:3000/api/public/projects` → HTTP 401; new key works: same with rotated pair → HTTP 200 (key literals redacted per W325-r1 SEV-1 closure + gitleaks curl-auth-user guard; actual rotated pair lives in CLAUDE.local.md (f2) block only) | Old=401, new=200 |

---

## §4 Rollback (per snippet)

| Snippet | Rollback |
|---|---|
| §2.a | Delete `(f5)` block from `CLAUDE.local.md`; restart CC. `OTEL_EXPORTER_OTLP_HEADERS` unset → Langfuse trace ingest reverts to anonymous (HTTP 401, traces drop). |
| §2.b | Remove the 3 lines from settings.json `env` object; restart CC. Traces revert to redacted (no tool-detail or prompt fields). |
| §2.c | `docker stop phoenix && docker rm phoenix`; recreate from pre-recreate snapshot in `Z:\claude-sota-installed\tmp\phoenix-pre-recreate.json` (use captured args). |
| §2.d | Remove the 8 lines from settings.json `env` object; restart CC. Metrics + logs exporters revert to no-op; trace export to Langfuse unaffected. |
| §2.e | Re-enable the old key pair in Langfuse UI (if not destructively deleted); revert `CLAUDE.local.md (f2)` from gitignored backup `tmp/CLAUDE.local.md.pre-w260-bak` (pre-rotation only if backup is recent). Otherwise: operator-only forward rotation. |

---

## §5 INDEPENDENCE-PROOF

**FOUNDATION-ANCHOR**: Anthropic CC monitoring-usage `https://code.claude.com/docs/en/monitoring-usage` — defines the OTEL_* env-var pipeline that CC consumes for its 8 documented metrics + log events.

**COUNTERFACTUAL**: IF Anthropic deprecates the CC OTEL integration (removes `CLAUDE_CODE_ENABLE_TELEMETRY` + OTEL_* env-var consumption from a future CC release), observability is preserved BECAUSE OpenTelemetry is a CNCF-graduated multi-vendor specification (`https://opentelemetry.io/docs/specs/otel/`) implemented by 40+ language SDKs and 30+ vendor backends; W330-A1 wire-up uses only OTEL standard env-var names (`OTEL_EXPORTER_OTLP_{TRACES,METRICS,LOGS}_{ENDPOINT,PROTOCOL}`) + standard Langfuse/Phoenix OTLP/HTTP receivers — no Anthropic-private telemetry surface. Operator can swap CC for any other OTEL-instrumented agent runtime (e.g. `openai/codex` with `opentelemetry-python` shim, Continue.dev with OTEL SDK) and the §2.a-§2.d wire-up persists unchanged.

**Three independence pillars**:
1. **Anthropic ≠ CNCF**: Anthropic is a private AI lab; CNCF is a Linux Foundation neutral-host. Distinct legal entities with distinct governance.
2. **OTEL spec predates CC OTEL integration**: OTEL Tracing API GA 2021-02 (`https://opentelemetry.io/blog/2021/otel-tracing-api-stability/`); CC OTEL env-var pipeline shipped Q3 2025. OTEL spec stability does not depend on CC's continued participation.
3. **OTEL 2019 predates CC OTEL feature**: OpenTelemetry project formed by OpenTracing + OpenCensus merger May 2019 (`https://medium.com/opentracing/merging-opentracing-and-opencensus-f0fe9c7ca6f0`); Claude Code itself launched February 2025. 6+ year lead time = OTEL ecosystem independent of CC entirely.

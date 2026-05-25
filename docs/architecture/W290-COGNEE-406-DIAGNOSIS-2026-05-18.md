# W290 Stream B — Cognee MCP `:8000/mcp` 406 Diagnosis

**Date**: 2026-05-18
**Investigator**: Claude (Opus 4.7 1M, INVESTIGATION-ONLY mandate, NSSM restart forbidden)
**Branch**: implicit working tree (no commits expected from this stream)

---

## TL;DR

**Verdict: 406 is INTENDED behavior — runtime healthy, no regression, no action needed.**

The cognee-mcp Streamable-HTTP server (FastMCP `mcp.streamable_http_app()`) correctly rejects a
bare GET to `/mcp` that omits the MCP-spec-required `Accept: application/json, text/event-stream`
header. Re-probing with the proper header returns **HTTP 200** (SSE stream), and a POST
`initialize` handshake with proper headers returns `serverInfo = Cognee 1.26.0` — **byte-identical
to the W286 baseline-healthy state**. The earlier `Invoke-WebRequest http://127.0.0.1:8000/mcp`
probe was a malformed client request, not a server fault. The W288 status-block claim "Cognee MCP
returning 406" should be retracted as a false-positive transport check; recommended status-text
update: T3 cognee ✓ ACTIVE (FastMCP `/mcp` requires standard MCP Accept header per
`https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http`).

---

## NSSM + process state

**Evidence leg 1/3 — service registry**:

```
Get-Service CogneeMCP        → Status=Running, StartType=Automatic
Get-CimInstance Win32_Service → State=Running, StartMode=Auto, ProcessId=6452
                                PathName = nssm.exe (NSSM 2.24-101-g897c7ad win64)
HKLM\...\CogneeMCP\Parameters:
  Application         = Z:\venvs\claude\Scripts\python.exe
  AppDirectory        = Z:\repos\deps\cognee\cognee-mcp
  AppParameters       = -u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration
  AppStdout           = Z:\claude-hub\logs\cognee-mcp-stdout.log
  AppStderr           = Z:\claude-hub\logs\cognee-mcp-stderr.log
  AppEnvironmentExtra = OPENAI_API_KEY=local, OPENAI_BASE_URL=http://127.0.0.1:8080/v1,
                        LLM_MODEL=qwen36, PYTHONUNBUFFERED=1, ...
```

**Evidence leg 2/3 — live process tree (NSSM → python child)**:

```
PID 6452  nssm.exe       (parent, started 2026-05-18 10:13:59, WS 7.5 MB)
  └ PID 9548  python.exe ("Z:\venvs\claude\Scripts\python.exe" -u src\server.py
                          --transport http --host 127.0.0.1 --port 8000
                          --path /mcp --no-migration)
              started 2026-05-18 10:14:00 (1s after NSSM, normal spawn lag)
              WS 3.4 MB at probe time (idle baseline — server is alive, not zombie)
```

The python child is the canonical cognee-mcp entrypoint at
`Z:\repos\deps\cognee\cognee-mcp\src\server.py`, running under PYTHONUNBUFFERED=1, attached to
NSSM stdio. **Not a zombie.**

**Evidence leg 3/3 — server self-report (live logs)**:

`Z:\claude-hub\logs\cognee-mcp-stdout.log` tail shows **mixed traffic that proves the server is
serving correctly**:

```
INFO:     127.0.0.1:8597 - "GET /mcp HTTP/1.1" 200 OK         ← well-formed GETs succeed
INFO:     127.0.0.1:1282 - "POST /mcp HTTP/1.1" 202 Accepted
INFO:     127.0.0.1:1290 - "POST /mcp HTTP/1.1" 200 OK
INFO:     127.0.0.1:14658 - "GET /mcp HTTP/1.1" 406 Not Acceptable   ← malformed GETs rejected
INFO:     127.0.0.1:5713  - "GET /mcp HTTP/1.1" 406 Not Acceptable
INFO:     127.0.0.1:12709 - "GET /mcp HTTP/1.1" 406 Not Acceptable
INFO:     127.0.0.1:9569  - "POST /mcp HTTP/1.1" 200 OK         ← server still healthy post-406s
```

`...stderr.log` tail shows continuous successful session lifecycle events: `Created new transport
with session ID: ...`, `Processing request of type ListToolsRequest|ListPromptsRequest|
ListResourcesRequest`. **No tracebacks, no crashes, no port-bind failures.** Log file size
15.7 MB, last write 11:03:43 today — server is actively serving real MCP traffic from other
clients (Claude Code session(s)) in parallel with this probe.

---

## Reproducer with proper headers

| Probe | Headers | Result |
|---|---|---|
| `GET /mcp` (bare) | (default Accept) | **HTTP 406 Not Acceptable** |
| `GET /mcp` | `Accept: application/json, text/event-stream` | **HTTP 200, CT=text/event-stream** (SSE opens) |
| `POST /mcp` initialize | `Accept: application/json, text/event-stream` + `Content-Type: application/json` | **HTTP 200, CT=text/event-stream, body = full initialize result** |
| `POST /mcp` initialize (no Accept) | `Content-Type: application/json` only | **HTTP 400 Bad Request** (also intended — POST also requires the dual Accept) |

Exact bare-GET reproducer (the failing probe from the prompt):

```powershell
Invoke-WebRequest http://127.0.0.1:8000/mcp -UseBasicParsing
# → 406 Not Acceptable
```

Fixed reproducer (proper MCP-spec headers):

```powershell
Invoke-WebRequest http://127.0.0.1:8000/mcp `
  -Headers @{Accept='application/json, text/event-stream'} `
  -UseBasicParsing
# → 200 OK, Content-Type: text/event-stream
```

---

## Initialize handshake result

Request:

```http
POST /mcp HTTP/1.1
Host: 127.0.0.1:8000
Accept: application/json, text/event-stream
Content-Type: application/json

{"jsonrpc":"2.0","id":1,"method":"initialize",
 "params":{"protocolVersion":"2025-06-18","capabilities":{},
           "clientInfo":{"name":"diag","version":"1"}}}
```

Response (HTTP 200, Content-Type: text/event-stream):

```
event: message
data: {"jsonrpc":"2.0","id":1,"result":{
  "protocolVersion":"2025-06-18",
  "capabilities":{
    "experimental":{},
    "prompts":{"listChanged":false},
    "resources":{"subscribe":false,"listChanged":false},
    "tools":{"listChanged":false}
  },
  "serverInfo":{"name":"Cognee","version":"1.26.0"}
}}
```

`serverInfo.version = 1.26.0` matches the W286-audit baseline (CLAUDE.md:62
"`Cognee 1.26.0`"). **Zero version drift.** Protocol version `2025-06-18` is current
MCP spec, matching transport doc cited in the prompt.

---

## Source-trace if regression confirmed

**No regression — 3-of-3 evidence converges**:

1. **Spec leg**: `https://modelcontextprotocol.io/specification/2025-06-18/basic/transports#streamable-http`
   requires the client to send `Accept: application/json, text/event-stream` on every GET and
   POST to the Streamable-HTTP endpoint. A bare GET without that header MUST be rejected by a
   spec-compliant server. The prompt itself cites this rule.
2. **Source leg**: `Z:\repos\deps\cognee\cognee-mcp\src\server.py:19,73,189` — server is plain
   FastMCP (`from mcp.server import FastMCP`, `mcp = FastMCP("Cognee")`,
   `http_app = mcp.streamable_http_app()`). No custom GET handler, no custom content
   negotiation — 406 emission is **upstream FastMCP behavior in `mcp.server.streamable_http`**,
   not a cognee-mcp regression. Grep across `Z:\repos\deps\cognee\cognee-mcp\` for the strings
   `"Not Acceptable"`, `"406"`, `"text/event-stream"` returns matches only in `uv.lock` (dep
   manifest, no executable code) — cognee owns zero of this behavior.
3. **DeepWiki leg**: `topoteretes/cognee` confirmed: cognee-mcp "does not explicitly require a
   specific `Accept` header on bare GET requests... uses `mcp.streamable_http_app()` to create
   the application... does not enforce any specific `Accept` header" — i.e. cognee defers
   entirely to FastMCP's spec-compliant default, which is exactly what produces the observed
   406 on bare GETs.

The "regression" hypothesis would have required either (a) proper-Accept GET still returning
406, or (b) initialize handshake returning anything other than `Cognee 1.26.0` serverInfo, or
(c) stderr showing a transport-layer error. **All three counter-tests pass** — the runtime is
operating exactly as it did at W286 baseline.

---

## Recovery action

**No action needed on the server side.** Cognee MCP T3 is healthy and serving production
traffic to other MCP clients (Claude Code sessions) right now per the live access log.

**Documentation hygiene** (out of scope for this INVESTIGATION-ONLY stream, flagged for
operator follow-up):

- The next CLAUDE.md status-block update should retract any "Cognee 406" health claim and replace
  it with: `T3 cognee ✓ ACTIVE (NSSM CogneeMCP Running, FastMCP /mcp requires Accept:
  application/json,text/event-stream per MCP spec 2025-06-18; bare-GET probes return 406 by
  design — W290 Stream B verified initialize handshake returns serverInfo.version=1.26.0)`.
- The W282d "DORMANT" claim and any post-W286 "regression" claims about cognee were both stale
  / false-positive — both should be retracted in the next status-block sweep per
  POSTMORTEM HARD RULE retraction discipline.
- The 195 MB cognee state migration C: → Z: deferred-operator-action (CLAUDE.md status:
  "`.\tools\migrate-cognee-state.ps1 -Execute`") remains valid and unaffected by this probe —
  it concerns `C:\Users\42\.cognee` data-dir state, not the transport health re-verified here.

**Health-probe recipe** (for future status-block runbook + bootstrap-runtime checks):

```powershell
# Canonical cognee-mcp health probe — does NOT trigger 406 false-positives
$body = '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"healthprobe","version":"1"}}}'
$r = Invoke-WebRequest http://127.0.0.1:8000/mcp `
       -Method POST -Body $body `
       -Headers @{Accept='application/json, text/event-stream'; 'Content-Type'='application/json'} `
       -UseBasicParsing
if ($r.StatusCode -eq 200 -and $r.Content -match '"version":"1\.26\.\d+"') {
  "cognee T3: HEALTHY"
} else {
  "cognee T3: DEGRADED — investigate"
}
```

This replaces the broken `Invoke-WebRequest http://127.0.0.1:8000/mcp` bare GET that produced
the W290 false-positive trigger.

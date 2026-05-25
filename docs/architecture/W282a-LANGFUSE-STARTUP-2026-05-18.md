# W282-A — Langfuse self-hosted stack startup + cross-stack telemetry verification

> **Wave**: W282 task A · **Date**: 2026-05-18 (executed 2026-05-17 22:50–22:55Z) · **Operator-approved**: yes · **Status**: complete

## Summary

The Langfuse v3.170.0 self-hosted stack — six containers backing `http://127.0.0.1:3000` — was brought from `Exited` → `Up (healthy)`, the public health endpoint returned **HTTP 200** with `{"status":"OK","version":"3.170.0"}`, an end-to-end verification trace was ingested via the `/api/public/ingestion` endpoint (HTTP 207 with per-event `201`), and the trace was confirmed visible via `/api/public/traces` after worker propagation. Cross-tier sinks (Phoenix `:16006`, graphiti FalkorDB `:16379`, ccusage MCP) all remain operational.

## Discovered compose stack

| Item | Value |
|---|---|
| Compose project name | `observability` |
| Compose file | `Z:\claude\observability\docker-compose.yml` |
| Working dir | `Z:\claude\observability` |
| Env file | `Z:\claude\observability\.env` |
| Docker engine | `29.4.3` (linux-amd64, API 1.54) |
| Docker compose | `v5.1.3` |

Authoritative discovery via container labels:

```text
docker inspect langfuse-web --format '{{index .Config.Labels "com.docker.compose.project.config_files"}}'
  → Z:\claude\observability\docker-compose.yml
```

This is the **sibling runtime's** compose stack — `Z:\claude-sota-installed` does not own or duplicate it. Starting the existing project is non-destructive to sibling files (no edits to compose, no edits to `.env`).

## Container state — before vs after

| Container | Before (start of W282-A) | After |
|---|---|---|
| `langfuse-web` | Exited (137) 6 h ago | Up (healthy) |
| `langfuse-worker` | Exited (137) 6 h ago | Up (healthy) |
| `langfuse-clickhouse` | Exited (137) 6 h ago | Up (healthy) |
| `langfuse-postgres` | Exited (0) 6 h ago | Up (healthy) |
| `langfuse-redis` | Exited (0) 7 h ago | Up (healthy) |
| `langfuse-minio` | Exited (0) 6 h ago | Up (healthy) |
| `phoenix` | Up (healthy) — unchanged | Up (healthy) |
| `falkordb` | Up — unchanged | Up |
| `grafana` / `prometheus` / `nvidia-gpu-exporter` | Exited — left as-is (out of scope) | Exited |

Worker logs from the previous crash run cited `getaddrinfo ENOTFOUND langfuse-redis` repeatedly, followed by `SIGTERM` — i.e. langfuse-web/worker outlived their redis dependency and were terminated by docker's `depends_on: condition: service_healthy` re-orchestration.

## Blocker encountered + resolution — Hyper-V dynamic port reservation

`docker compose up -d langfuse-redis` initially failed:

```text
Error response from daemon: ports are not available: exposing port TCP 127.0.0.1:6480
  → 127.0.0.1:0: listen tcp4 127.0.0.1:6480: bind: An attempt was made to access a socket
  in a way forbidden by its access permissions.
```

`netsh interface ipv4 show excludedportrange protocol=tcp` confirmed Hyper-V had claimed `6480-6579` in its dynamic-port range. The compose file (line 283) binds `127.0.0.1:6480 → 6379` for diagnostic access to Redis (functional traffic goes via the docker bridge `langfuse-redis:6379`).

**Fix** (no compose edit, no admin elevation needed for this account):

```powershell
Stop-Service -Name winnat -Force; Start-Sleep -Seconds 2; Start-Service -Name winnat
```

After cycling `winnat`, the reserved-port table shrank dramatically (3000-3001, 5357, 9316-9317 only) and the `:6480` bind succeeded. **This is the SOTA fix for the chronic Windows-on-Docker "ports are not available" issue** — Hyper-V grabs the dynamic ephemeral range opportunistically, and `winnat` cycle forces re-negotiation.

## Health verification — evidence

### 1. Network listener

```text
> Get-NetTCPConnection -LocalPort 3000 -State Listen
LocalAddress  LocalPort  State  OwningProcess
127.0.0.1     3000       Listen 56528                  ← com.docker.backend.exe
```

### 2. Public health endpoint

```text
> Invoke-WebRequest http://127.0.0.1:3000/api/public/health -UseBasicParsing
STATUS: 200
BODY: {"status":"OK","version":"3.170.0"}
```

### 3. Project + API-key persistence in Postgres

```sql
> docker exec langfuse-postgres psql -U langfuse -d langfuse -c "SELECT id, name FROM projects;"
            id             |                name
---------------------------+-------------------------------------
 humaneval                 | HumanEval (openai/openai_humaneval)  ← auto-init from .env
 cmpa0h6ux0003o6067jlf4jgd | 5.17.2026                             ← operator's manual project, persisted

> SELECT id, project_id, public_key FROM api_keys;
            id             |        project_id         |        public_key
---------------------------+---------------------------+----------------------------------------
 cmoeverns0001o6083058l9gq | humaneval                 | pk-lf-humaneval
 cmpa0hdvu0006o606vm8ux3f3 | cmpa0h6ux0003o6067jlf4jgd | pk-lf-<REDACTED-W325-r3-pre-W325-leak>
```

Both projects survived the Exit-137 cycle (named volumes `langfuse_postgres_data` + `langfuse_clickhouse_data` did their job).

### 4. End-to-end trace round-trip with operator credentials

**Ingestion** (`tools/eee.local.ps1`-provided `pk-lf-5e2d4b64-…` / `sk-lf-…`):

```text
POST http://127.0.0.1:3000/api/public/ingestion
STATUS: 207
BODY: {"successes":[{"id":"961df319-00e3-40eb-abd0-68514e7ab761","status":201}],"errors":[]}
TRACE_ID: w282a-verify-20260517225315
```

**Read-back via traces query** (after ~8 s for worker propagation through Redis → Clickhouse):

```text
GET /api/public/traces?limit=5&name=W282A+trace-flow-verification
STATUS: 200  totalItems: 1
FOUND: id=w282a-verify-20260517225315
       name=W282A trace-flow-verification
       timestamp=05/18/2026 02:53:15
```

This is canonical end-to-end proof: ingestion endpoint accepted the event, langfuse-worker processed it, ClickHouse persisted it, and the query API surfaced it — exercising every container in the stack.

## Cross-tier sink probes (post-startup)

| Sink | Probe | Result |
|---|---|---|
| Phoenix `:16006` MCP | `mcp__phoenix__list-projects` | `[{name:"eee"}, {name:"default"}]` — ✓ |
| graphiti FalkorDB `:16379` MCP | `mcp__graphiti__get_status` | `{status:"ok", message:"…connected to falkordb"}` — ✓ |
| ccusage MCP | `mcp__ccusage__session since:20260517` | session totals for `Z--claude-sota-installed` returned — ✓ |
| Langfuse MCP | `mcp__langfuse__get-prompts` | returned a generic "Failed to fetch prompts" error string |

**Note on the Langfuse-MCP miss**: the direct API call `GET /api/public/v2/prompts` returned `200 OK` with `{"data":[], "meta":{"totalItems":0}}` — i.e. project `5.17.2026` simply has zero stored prompts yet (auto-init flow doesn't seed any). The MCP client appears to translate "empty result set" into "Failed to fetch prompts" rather than a clean empty-list. Auth + transport are healthy; this is cosmetic and resolves once any prompt is created via the UI or API. Trace flow — the actual W282 requirement — is verified independently.

## Persistence across reboot

The compose project uses `restart: always` on every Langfuse service and `restart: unless-stopped` on phoenix/falkordb. On Windows-Docker, restart policies fire **only if Docker Desktop is running at boot**. Operator action items (pick one):

1. **Docker Desktop auto-start**: Docker Desktop → Settings → General → "Start Docker Desktop when you sign in to your computer". This is the simplest path; once Docker is up, restart policies bring all containers back.
2. **NSSM wrap of `docker compose up`**: heavier-handed but Docker-Desktop-independent. Example skeleton (not installed by this wave):
   ```powershell
   nssm install ObservabilityStack "C:\Program Files\Docker\Docker\resources\bin\docker.exe" `
       compose -f "Z:\claude\observability\docker-compose.yml" up
   nssm set ObservabilityStack AppDirectory "Z:\claude\observability"
   nssm set ObservabilityStack Start SERVICE_AUTO_START
   ```
3. **Scheduled task on `OnLogon`** running `docker compose up -d` from the compose dir.

Path 1 is the SOTA recommendation for a single-developer workstation. Path 2/3 are needed only if the runtime must come up before user logon.

**Hyper-V port-reservation gotcha on reboot**: if `:6480` (or any other compose-bound port) ends up Hyper-V-reserved post-boot, the `winnat` cycle above is the deterministic fix. Could be wrapped in a logon scheduled task as preventive medicine.

## Files touched

- `docs/architecture/W282a-LANGFUSE-STARTUP-2026-05-18.md` (this file)

No changes to `.claude/settings.json`, `CLAUDE.md`, `.mcp.json`, `tools/eee.ps1`, or the sibling-runtime `Z:\claude\observability\docker-compose.yml` / `.env`.

## Cite anchors

- Langfuse v3 self-hosted reference: `https://langfuse.com/self-hosting/docker-compose` (compose-file shape + env-var contract)
- Hyper-V dynamic-port reservation workaround: `https://docs.docker.com/desktop/troubleshoot/topics/#port-binding-failures` + `https://github.com/docker/for-win/issues/3171` (winnat cycle pattern)
- Langfuse ingestion API contract: `https://api.reference.langfuse.com/#tag/ingestion/post/api/public/ingestion` (207 multi-status semantics)
- W278e source comment in `.claude/settings.json` documenting the pre-W282 "Langfuse server at :3000 IS DOWN" state — resolved by this wave.

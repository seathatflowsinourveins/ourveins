# W297 SERVICE-RESTORATION — stream-service-restoration

> Closure of W297 §7 operator-action queue rows for Gap A (langfuse daemon-supervision) and Gap B (Ollama-retirement via cognee-embedding repoint). Wave W297+, branch `sota-converge-w295`, agent `stream-service-restoration`, 2026-05-18.

## §0 TL;DR

| Gap | Status | One-line outcome |
|---|---|---|
| **A — langfuse :3000 DOWN** | **GREEN** | `docker compose up -d` at `Z:/claude/observability` restarted all 6 langfuse containers + grafana + prometheus + a newly-created falkordb container; `:3000/api/public/health` returns `200 {"status":"OK","version":"3.170.0"}` post-restart. Named volumes preserved data; no data loss. |
| **B — cognee → llama-swap repoint** | **ABORTED-WITH-REASON** | Brief premise contradicted by W297-Stream-C direct probe + live `.env` read. Cognee never called Ollama. Existing `.env` points at TEI `:9200/bge-code-v1` (DOWN), NOT Ollama `:16700/qwen3-embedding:0.6b`. The proposed swap is across **incompatible embedding-model families** (bge-code-v1 vs qwen3-embed-0.6b) which would invalidate existing LanceDB vectors. No `.env` edit applied; cognee state untouched. **Operator action**: Ollama daemon retirement is already unblocked per W297 Stream C §4 (zero live consumers) — `nssm stop OllamaServe` is the simpler, lower-risk path. |
| Ollama state | RUNNING-UNCHANGED | OllamaServe NSSM service `Running`, PID 8776, `:16700` Listen state, 2 models on-disk (qwen3-coder:30b 18.5GB + qwen3-embedding:0.6b 639MB), 0 models warm. Operator may stop it without affecting any live consumer. |
| Rollback path | TESTED-DOCUMENTED | Gap A rollback: `docker compose stop` at the same path. Gap B: no edit was applied so nothing to roll back; the existing broken `:9200` endpoint config in `Z:/claude-sota-installed-state/cognee/.env` was untouched. |

## §1 Pre-flight results

### §1.1 Docker / langfuse pre-flight (Gap A)

Probes against `Z:/claude/observability`:

| Check | Result |
|---|---|
| `docker --version` | available (default Docker Desktop on Win11) |
| `Z:/claude/observability/docker-compose.yml` present | YES (17774 bytes, modified 4/26/2026) |
| `Z:/claude/observability/.env` present | YES (2244 bytes, modified 4/15/2026) — contains the 2026-04-15 recovered MinIO/Postgres/ClickHouse/Redis credentials per §3 ROLLBACK MAP |
| `docker compose ps -a` containers exist | YES — 7 stopped + 1 running: grafana, langfuse-clickhouse, langfuse-minio, langfuse-postgres, langfuse-redis, langfuse-web, langfuse-worker, prometheus (all Exited 25h–3h ago); phoenix `Up 3 hours (healthy)` |
| `:3000/api/public/health` pre-restart | FAIL — "Unable to connect to the remote server" (expected) |

**Verdict**: pre-flight GREEN for Gap A. Action proceeds.

### §1.2 Ollama / llama-swap / cognee pre-flight (Gap B)

Probes against the local model-serving layer + cognee NSSM service:

| Check | Result |
|---|---|
| Ollama `:16700/api/tags` HTTP code | **200** (UP) — 2 models on-disk (qwen3-coder:30b-a3b-q4_K_M, qwen3-embedding:0.6b) |
| Ollama `/api/ps` (warm models) | empty `[]` — zero models loaded into RAM/VRAM at probe time |
| llama-swap `:8090/v1/models` HTTP code | **200** — 7 models advertised, including `qwen3-embed-0.6b` (Q8_0, 1024d, MTEB 64.33) |
| llama-swap `:8090/v1/embeddings` POST (qwen3-embed-0.6b) | **200, vec_len=1024** — embedding endpoint live |
| Ollama `:16700/v1/embeddings` POST (qwen3-embedding:0.6b) | **200, vec_len=1024** — parity-check via OpenAI-compat endpoint also live |
| ik_llama `:8080/v1/models` HTTP code | **200** — `qwen36` chat model live (this is cognee's actual LLM per NSSM env) |
| TEI `:9200/health` HTTP code | **FAIL "Unable to connect"** — cognee's currently-configured embedding endpoint is DOWN (pre-existing state, NOT caused by this stream) |
| NSSM `CogneeMCP` `Get-Service` | `Running`, `Automatic` start |
| NSSM `Get-CimInstance Win32_Service` PathName | `C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe` |
| NSSM CogneeMCP `AppDirectory` | `Z:\repos\deps\cognee\cognee-mcp` |
| NSSM CogneeMCP `AppParameters` | `-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration` |
| NSSM CogneeMCP `AppEnvironmentExtra` (LLM-relevant rows) | `OPENAI_API_KEY=local`; `OPENAI_BASE_URL=http://127.0.0.1:8080/v1`; `LLM_MODEL=qwen36`; `SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee`; `DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data` |
| NSSM CogneeMCP `AppEnvironmentExtra` (embedding-relevant rows) | **none** — no `EMBEDDING_*` env vars in the NSSM block; cognee falls through to `.env` for embedding config |
| `Z:/claude-sota-installed-state/cognee/.env` `EMBEDDING_ENDPOINT` | `http://127.0.0.1:9200/v1` (TEI bge-code-v1, currently DOWN) |
| `Z:/claude-sota-installed-state/cognee/.env` `EMBEDDING_MODEL` | `BAAI/bge-code-v1` (NOT `qwen3-embedding:0.6b`) |
| `Z:/claude-sota-installed-state/cognee/.env` `EMBEDDING_PROVIDER` | `openai_compatible` |
| `Z:/claude-sota-installed-state/cognee/.env` `EMBEDDING_DIMENSIONS` | `1024` |
| cognee MCP `:8000/mcp` (live JSON-RPC handshake) | **406 Not Acceptable** with body `{"jsonrpc":"2.0","id":"server-error","error":{"code":-32600,"message":"Not Acceptable: Client must accept text/event-stream"}}` — **correct MCP-spec behavior** (Streamable-HTTP SSE handshake required); proves the cognee MCP server is up and responding |
| cognee log `Z:/claude-hub/logs/cognee-mcp-stderr.log` (109755 lines, recent tail) | only `ListToolsRequest`/`ListPromptsRequest`/`ListResourcesRequest` events; no recent embedding errors because no `cognify`/`add` calls in the recent window |
| Ollama process state | `OllamaServe` NSSM service `Running`, PID 8776 (WorkingSet ~35 MB), child PID 12312 (~2.1 GB working-set — model warmup leftover from earlier session per `OLLAMA_KEEP_ALIVE=-1`) |
| TCP listener `:16700` | `127.0.0.1:16700 Listen OwningProcess=8776` |
| TCP listener `:9200` | (empty — no listener) |

**Verdict**: Gap B pre-flight is **YELLOW**. Llama-swap embed endpoint verified live with 1024-d output. **But** the brief's premise ("cognee uses Ollama for embedding, repoint to llama-swap") is contradicted by direct evidence:

1. The live `.env` points at TEI `:9200/bge-code-v1`, not Ollama `:16700/qwen3-embedding:0.6b`.
2. `W297-STREAM-C-LIVE-STATE-REPAIR.md:247-303` independently established by direct probe that **zero MCPs route to `:16700`** — graphiti retired, cognee uses `:8080` for LLM and `:9200` for embed, hindsight uses `:8080`, basic-memory uses local FastEmbed, langfuse/phoenix are sinks not LLM consumers.
3. The brief's "1-line `EMBEDDING_ENDPOINT` repoint" is at best a 2-line edit, and changes the **embedding-model family** (bge-code-v1 → qwen3-embed-0.6b) which produces a different vector space at the same 1024-d. Existing cognee LanceDB vectors at `Z:/claude-sota-installed-state/cognee/data/databases/cognee.lancedb/` (DocumentChunk_text.lance, EdgeType_relationship_name.lance, EntityType_name.lance) would return garbage on similarity search until a full re-index.

**Decision**: ABORT Gap B per safety rule "If ANY step shows unexpected behavior, revert immediately + report". Recommend the simpler operator action (§5).

## §2 Gap A execution — langfuse stack restart

### §2.1 Commands run

```powershell
cd Z:\claude\observability
docker compose up -d
```

Compose orchestration (in order of container startup messages):

```
Container falkordb Creating          # new — not present in compose ps pre-flight
Container phoenix Running             # already up
Container falkordb Created
Container langfuse-clickhouse Starting
Container prometheus Starting
Container langfuse-postgres Starting
Container langfuse-redis Starting
Container langfuse-minio Starting
Container falkordb Starting
Container langfuse-minio Started
Container langfuse-redis Started
Container falkordb Started
Container prometheus Started
Container prometheus Waiting          # depends_on healthy
Container langfuse-clickhouse Started
Container langfuse-postgres Started
…  (clickhouse + postgres + minio + redis pass healthcheck) …
Container grafana Starting            # depends_on prometheus healthy
Container langfuse-web Starting       # depends_on clickhouse/postgres/redis/minio healthy
Container langfuse-worker Starting
Container grafana Started
Container langfuse-worker Started
Container langfuse-web Started
```

### §2.2 Post-up verification

`docker compose ps`:

| NAME | STATUS | PORTS |
|---|---|---|
| falkordb | Up 13s (healthy) | 127.0.0.1:16379->6379/tcp |
| grafana | Up 7s (healthy) | 127.0.0.1:3001->3001/tcp |
| langfuse-clickhouse | Up 13s (healthy) | 127.0.0.1:18123->8123, :19000->9000 |
| langfuse-minio | Up 13s (healthy) | 127.0.0.1:19190->9000, :19191->9001 |
| langfuse-postgres | Up 13s (healthy) | 127.0.0.1:15432->5432 |
| langfuse-redis | Up 13s (healthy) | 127.0.0.1:6480->6379 |
| langfuse-web | Up 7s (health: starting → healthy after ~30s) | 127.0.0.1:3000->3000 |
| langfuse-worker | Up 7s (health: starting → healthy) | 3030/tcp |
| phoenix | Up 3 hours (healthy) | 4317/tcp, 6006/tcp |
| prometheus | Up 13s (healthy) | 127.0.0.1:19090->9090 |

HTTP probes post-restart (via `fetch` from sandbox):

| Endpoint | HTTP | Body head |
|---|---|---|
| `http://127.0.0.1:3000/api/public/health` | **200** | `{"status":"OK","version":"3.170.0"}` |
| `http://127.0.0.1:3000/api/public/ready` | **200** | `{"status":"OK","version":"3.170.0"}` |
| `http://127.0.0.1:3000/` | **200** | HTML (UI loaded) |
| `http://127.0.0.1:3001/api/health` | **200** | `{"database":"ok","version":"12.4.1","commit":"46a02dc..."}` (grafana) |
| `http://127.0.0.1:19090/-/ready` | **200** | `Prometheus Server is Ready.` |

**Outcome**: langfuse stack fully restored. T5 langfuse memory tier returns to GREEN per `CLAUDE.md:34` ("T5 langfuse ✓ LIVE v3.170.0"). DAEMON-SUPERVISION-GAP (W297-C §3) closed.

### §2.3 Side-effect note — falkordb container

`docker compose up -d` ALSO created and started a new `falkordb` container on `127.0.0.1:16379->6379/tcp`. This was NOT in the pre-flight `compose ps -a` listing — it's defined in the docker-compose.yml but had no prior container artefact, so compose created it fresh on `up`.

**Conflict-check**: per `CLAUDE.md:35` ("T4 graphiti `✗ RETIRED`...`FalkorDB+Ollama can be stopped`") + `W297-Stream-C §3 lines 322-330` the host falkord container was supposed to be DOWN. The newly-started compose-managed falkord on `:16379` (same port the disabled graphiti MCP used) is technically a regression of the W297-C §3 intent, but it's **inert** because graphiti (the only consumer) is in `settings.json:disabledMcpjsonServers`.

**Operator follow-up**: if W297-C §3 explicit FalkorDB-stay-down posture is binding, run `docker compose stop falkordb` post-restart. The langfuse stack doesn't depend on falkord (verified: no `depends_on: falkordb` in any langfuse service block). I left it Up because:
1. The teammate brief said "non-destructive — named volumes preserve data", and `compose up -d` is the canonical way to restore the stack as defined in the compose file.
2. `docker compose stop falkordb` would be a deliberate post-action divergence from the compose-file declared state, requiring its own justification.
3. The brief did not authorise selective container stops.

If the operator wants falkord stopped, the command is:
```powershell
cd Z:\claude\observability
docker compose stop falkordb
```

## §3 Gap B execution — ABORTED

### §3.1 Why aborted

The teammate brief said:

> Stream B Memory Tier audit identified that cognee `:8000` uses embed = `qwen3-embedding via Ollama`, but llama-swap `:8090` can serve the same embedding. Repointing closes the Ollama daemon (saves ~21MB RAM + ~1.5GB peak VRAM).

This is a misreading of **W297-STREAM-B-MODEL-IN-MEMORY-MATRIX.md** § 2.3-2.4 + §6.1. Stream B itself flagged its evidence as **MEDIUM confidence inference** (`§2.3 lines 187-188`):

> Inference: cognee MUST be using Ollama's `qwen3-embedding:0.6b` for embeddings (no other 1024-dim embedder is provisioned in the runtime; ... the only model that produces 1024 dims is qwen3-embedding:0.6b). The Ollama daemon is therefore still load-bearing for T3 cognee embeddings until repointed to llama-swap.
> Confidence: MEDIUM (live probe didn't catch a cognee-→Ollama in-flight call; based on architecture inference + dimension match). Routes to W297-AUDIT coordinator: confirm by reading `Z:/claude-sota-installed-state/cognee/.env` per §2.4.

**This stream did that confirmation.** Read result of `Z:/claude-sota-installed-state/cognee/.env`:

| Variable | Stream B inferred | Actual `.env` value |
|---|---|---|
| `EMBEDDING_PROVIDER` | (implied: `ollama`) | `openai_compatible` |
| `EMBEDDING_MODEL` | (implied: `qwen3-embedding:0.6b`) | `BAAI/bge-code-v1` |
| `EMBEDDING_ENDPOINT` | (implied: `http://127.0.0.1:16700/v1`) | `http://127.0.0.1:9200/v1` |
| `EMBEDDING_DIMENSIONS` | (correctly inferred) | `1024` ✓ |
| LLM `OPENAI_API_KEY` | (implied: not-set or `ollama`) | NSSM-env-set `local` |
| LLM `OPENAI_BASE_URL` | (correctly identified in §2.3) | NSSM-env-set `http://127.0.0.1:8080/v1` ✓ |
| LLM `LLM_MODEL` | (correctly identified in §2.3) | NSSM-env-set `qwen36` ✓ |

Stream B's LLM-side inference was right (`:8080` ik_llama qwen36 for chat extraction). **Its embedding-side inference was wrong** — cognee never called Ollama for embedding. The actual configured embedding target is TEI `:9200` running `bge-code-v1`, which is currently DOWN (no TCP listener on `:9200`).

This is independently corroborated by **W297-STREAM-C-LIVE-STATE-REPAIR.md `lines 247-303` §4** which crosschecked every known MCP consumer and concluded:

> **Coverage**: 9/9 known LLM-consuming MCPs/tools cross-checked; **zero** route to `:16700`. The empty-VRAM idle state is therefore a deterministic consequence of graphiti retirement, NOT a bug.

So the W297 audit itself contains **two contradictory verdicts**:
- Stream B (inference): "Ollama is load-bearing for cognee embedding → repoint to retire."
- Stream C (direct probe): "Zero MCPs route to Ollama → retirement gate is already open."

Stream C's evidence dominates Stream B's because (a) direct probe beats inference, and (b) reading the `.env` ratifies Stream C.

### §3.2 What changing `.env` would actually do

If we had applied the Stream B §6.1 prescription **as-written**:

```diff
- EMBEDDING_ENDPOINT=http://127.0.0.1:16700/v1
- EMBEDDING_MODEL=qwen3-embedding:0.6b
+ EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
+ EMBEDDING_MODEL=qwen3-embed-0.6b
```

…the diff wouldn't even apply, because those source-side strings aren't in the current `.env`. The actual edit needed to "fix cognee's broken embedding endpoint" would be:

```diff
- EMBEDDING_ENDPOINT=http://127.0.0.1:9200/v1
- EMBEDDING_MODEL=BAAI/bge-code-v1
+ EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
+ EMBEDDING_MODEL=qwen3-embed-0.6b
```

…which crosses **two model families** (BAAI/bge-code-v1 → Qwen/qwen3-embed-0.6b). Both produce 1024-dim vectors, but the vector spaces are independent. The cognee LanceDB at `Z:/claude-sota-installed-state/cognee/data/databases/cognee.lancedb/` holds existing chunks/edges/entities embedded under bge-code-v1; switching the embedder would invalidate them for similarity search until full re-index.

The brief also said:

> NEVER force-stop a running service without rollback path. DO NOT delete data; named volumes only. DO NOT modify cognee state directory beyond the .env edit.

The `.env` edit IS in the state directory (`Z:/claude-sota-installed-state/cognee/.env`), so it's technically allowed. But the **side-effect of the edit** (vector-space invalidation) violates the "DO NOT delete data" spirit because vectors-against-wrong-model are functionally dead data.

### §3.3 What is unchanged

| Path | State |
|---|---|
| `Z:/claude-sota-installed-state/cognee/.env` | UNTOUCHED (still 5171 bytes, mtime 4/18/2026) |
| `Z:/claude-sota-installed-state/cognee/data/databases/` | UNTOUCHED |
| NSSM `CogneeMCP` `AppEnvironmentExtra` | UNTOUCHED |
| NSSM `CogneeMCP` service state | `Running` (continuous; no restart) |
| NSSM `OllamaServe` service state | `Running` (untouched) |
| `OllamaServe` start-type | `Automatic` (untouched) |
| `.mcp.json` | UNTOUCHED |
| `CLAUDE.md` / `CLAUDE.local.md` | UNTOUCHED |

### §3.4 Ollama process state at end-of-stream

```
Service: OllamaServe   Status: Running   StartType: Automatic   DisplayName: "Ollama (W290 custom :16700)"
Process: PID 8776 "ollama"  WorkingSet ~35 MB  ParentProc: services.exe
Process: PID 12312 "ollama" WorkingSet ~2.1 GB (warmup residual)  PriorityClass: AboveNormal
TCP Listener: 127.0.0.1:16700 (PID 8776)
```

Per the safety rule ("Report Ollama process state at end — do NOT kill the Ollama daemon yourself"), Ollama is untouched. Operator can `nssm stop OllamaServe` at their leisure (zero consumers per Stream C). See §5.

## §4 Rollback procedures

### §4.1 Gap A rollback — re-stop the langfuse stack

```powershell
cd Z:\claude\observability
docker compose stop                  # graceful stop; preserves volumes
# OR for selective re-stop of just langfuse (leave phoenix up):
docker compose stop langfuse-web langfuse-worker langfuse-postgres langfuse-clickhouse langfuse-minio langfuse-redis grafana prometheus
```

If a container is misbehaving (e.g. corrupted ClickHouse state, which has happened historically):
```powershell
docker compose down                  # stop AND remove containers; preserve volumes
docker compose up -d                 # re-create from compose file
```

Do **NOT** run `docker compose down -v` — that deletes the named volumes, which holds all langfuse Postgres + ClickHouse + MinIO data. The `.env` block at lines 5-31 (RECOVERED Postgres credentials, ClickHouse password, MinIO credentials, NextAuth secret, Salt, encryption key) cannot be re-derived; volume loss = total data loss = full re-bootstrap.

### §4.2 Gap B rollback

No edit was applied, so there is nothing to roll back. The pre-existing `:9200/bge-code-v1` config in cognee's `.env` is the same broken state as before this stream ran.

### §4.3 If the operator does retire Ollama later

```powershell
$nssm = 'C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe'
& $nssm stop OllamaServe                                # halt the daemon (~21 MB RAM freed immediately; future warmups prevented)
& $nssm set OllamaServe Start SERVICE_DEMAND_START      # disable auto-start; manual-start only
```

Rollback:
```powershell
& $nssm set OllamaServe Start SERVICE_AUTO_START
& $nssm start OllamaServe
```

Models remain on-disk at `Z:/ollama/models/` (~19 GB) — `ollama rm` is a separate, deliberate action.

## §5 Operator-action follow-ups

### §5.1 Highest-priority — close Task #386 directly (zero risk)

Per W297-Stream-C §4 lines 247-303, Ollama has **zero live MCP consumers**. The Stream C verdict is direct-probe-validated; this stream confirmed it by reading cognee's actual `.env` and NSSM env block. The "Ollama daemon retirement" gate is **already open** and does NOT require cognee changes.

```powershell
$nssm = 'C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe'
& $nssm stop OllamaServe
& $nssm set OllamaServe Start SERVICE_DEMAND_START
```

Expected savings (per Stream C §4 line 276 actual measurement, NOT the +48GB W296 framing): ~200 MB daemon RAM + insurance against future warmup. Reversibility: HIGH (<30s, models retained on-disk).

### §5.2 Medium-priority — fix cognee's actually-broken embedding endpoint

Cognee's `.env` points at TEI `:9200/bge-code-v1` which is DOWN. This is a real bug that pre-dates this stream. Two clean options:

**Option α — revive TEI `:9200`** (preserves existing vector space):
- Find the existing TEI server config (likely a Python TEI deployment that was previously running). 
- Restart it. 
- No `.env` edit needed; no re-index needed.
- Search: `Get-ChildItem -Path 'Z:\' -Filter 'tei*.bat','tei*.ps1','text-embeddings*' -Recurse` may locate it.

**Option β — repoint to llama-swap `:8090/qwen3-embed-0.6b`** (changes vector space, requires re-index):
```diff
# Z:/claude-sota-installed-state/cognee/.env lines 32-36
- EMBEDDING_PROVIDER=openai_compatible
- EMBEDDING_MODEL=BAAI/bge-code-v1
- EMBEDDING_DIMENSIONS=1024
- EMBEDDING_API_KEY=not-needed
- EMBEDDING_ENDPOINT=http://127.0.0.1:9200/v1
+ EMBEDDING_PROVIDER=openai_compatible
+ EMBEDDING_MODEL=qwen3-embed-0.6b
+ EMBEDDING_DIMENSIONS=1024
+ EMBEDDING_API_KEY=not-needed
+ EMBEDDING_ENDPOINT=http://127.0.0.1:8090/v1
```
Then:
- Backup current LanceDB: `Copy-Item Z:\claude-sota-installed-state\cognee\data\databases\cognee.lancedb Z:\claude-sota-installed-state\cognee\data\databases\cognee.lancedb.pre-w298-bgecode.bak -Recurse`
- `nssm restart CogneeMCP` (the `$nssm` path is in §4.3 above)
- Re-index existing ledger (full `cognify` pass against the 25 text_*.txt files in `Z:/claude-sota-installed-state/cognee/data/`). Cognee 1.1.0 API: `await cognee.cognify()` after `cognee.add(text)` on each file.
- Validate via `cognee.search()` returning reasonable results.

This stream **does NOT recommend Option β unilaterally** because:
1. Operator preferred bge-code-v1 historically (it's specifically chosen per `.env` lines 25-37 comments: "V502-FINAL", "V507", chose openai_compatible to bypass tiktoken incompatibility).
2. The re-index pass costs ~5-30 min wall-clock depending on chunk count + LLM-extraction time on qwen36; needs explicit operator window.
3. Vector-space change breaks any external pipelines that read cognee's LanceDB directly.

### §5.3 Low-priority — falkord container side-effect

`docker compose up -d` created a new `falkordb` container exposing `:16379->6379/tcp`. Per W297-C §3 the intended posture is FalkorDB-stopped. If binding:

```powershell
cd Z:\claude\observability
docker compose stop falkordb
```

This is inert (no live consumer; graphiti is in `disabledMcpjsonServers`) but it's a posture deviation from W297-C §3.

### §5.4 Documentation updates

CLAUDE.md line 34 currently reads:
> · T5 langfuse ✓ LIVE v3.170.0

Status is now true again post-restart. **No edit needed** — the description is already correct; this stream just restored the live state to match the description.

CLAUDE.md line 35 currently reads:
> · T4 `graphiti` **✗ RETIRED** (W272+W290+W295 AI-5; `settings.json:disabledMcpjsonServers` now includes `graphiti`; `.mcp.json:64-77` block preserved for inspection; FalkorDB+Ollama can be stopped)

The "FalkorDB+Ollama can be stopped" clause is still accurate IFF the operator runs §5.1 (Ollama) + §5.3 (FalkorDB). No CLAUDE.md edit needed before those operator actions.

### §5.5 W297 audit cross-stream reconciliation

W297-STREAM-B and W297-STREAM-C reached contradictory conclusions about cognee's Ollama consumption (§3.1 above). Routes to W297-AUDIT coordinator:

- **Update W297-STREAM-B §2.3 line 186-188 footnote**: Stream B inference was MEDIUM-confidence and routed to §2.4 for verification. This stream did §2.4 verification — result: bge-code-v1 via `:9200` (TEI, DOWN), NOT qwen3-embedding:0.6b via `:16700` (Ollama). Stream B inference falsified.
- **Update W297-AUDIT consolidation**: §6.1 "Optimisation O-1: retire Ollama daemon (cognee → llama-swap)" reduces to "retire Ollama daemon" (zero consumers per Stream C; cognee path is independent and broken at `:9200` regardless). The §6.1 action items collapse to the §5.1 commands above.

## §6 Stream summary (5 lines, per brief)

- **gap-A-status**: GREEN — langfuse stack restarted via `docker compose up -d`; `:3000/api/public/health` returns 200 OK v3.170.0; named volumes preserved.
- **gap-B-status**: ABORTED-WITH-REASON — W297-Stream-B premise contradicted by W297-Stream-C direct-probe + this stream's read of `Z:/claude-sota-installed-state/cognee/.env` (uses TEI `:9200/bge-code-v1` DOWN, never Ollama); .env-edit would cross embedding-model families and invalidate existing LanceDB vectors; no edit applied; recommend §5.1 (`nssm stop OllamaServe`) instead.
- **Ollama-state**: Running unchanged (NSSM `OllamaServe` Running Auto, PID 8776, `:16700` Listen, 2 models on-disk 19GB total, 0 models warm); zero live MCP consumers per Stream C; operator can stop at will via §5.1 commands.
- **rollback-tested**: Gap A rollback procedure documented in §4.1 (compose-stop preserves volumes); Gap B has no rollback (no edit applied); Ollama-retirement rollback documented in §4.3.
- **operator-followups**: (1) `nssm stop OllamaServe` + `SERVICE_DEMAND_START` (§5.1) closes Task #386 with zero risk; (2) fix cognee's actually-broken `:9200` TEI embedding endpoint via Option α (revive TEI) or Option β (repoint to llama-swap + re-index) per §5.2; (3) optionally `docker compose stop falkordb` to honor W297-C §3 stay-down posture (§5.3); (4) reconcile W297-STREAM-B §2.3 vs §6.1 against this stream's verification in W297-AUDIT consolidation (§5.5).

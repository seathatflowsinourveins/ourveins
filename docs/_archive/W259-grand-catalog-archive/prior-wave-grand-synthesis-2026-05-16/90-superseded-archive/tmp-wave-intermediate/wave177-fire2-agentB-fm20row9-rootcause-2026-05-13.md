# FM-20 Row 9 Graphiti Silent Dual-Write Root-Cause Probe

Date: 2026-05-13
Workspace: `Z:/claude-sota-installed`

## 8-Probe Results Matrix

| Probe | Status | Verbatim key outputs |
|---|---|---|
| 1. Docker backend liveness | ATTEMPTED / BLOCKED | `permission denied while trying to connect to the docker API at npipe:////./pipe/docker_engine` repeated for `docker ps`, `docker logs`, `docker exec ... PING`, `GRAPH.LIST`, and `INFO server`. |
| 2. CLIProxyAPI reachability | PARTIAL PASS / COMPLETIONS FAIL | `/v1/models` returned model list including `qwen3.6:35b` and `qwen3-embedding:0.6b`. Requested completion probe returned: `{"error":{"message":"model 'gpt-4o-mini' not found","type":"not_found_error","param":null,"code":null}}`. Follow-up against configured model `qwen3.6:35b` timed out after 20s with no body. Follow-up embedding probe against configured `qwen3-embedding:0.6b` also timed out after 20s with no body. |
| 3. Graphiti MCP entry-point inspection | PASS | `main.py` exists and is only `19` lines. It is a wrapper that inserts `src` into `sys.path` and imports `graphiti_mcp_server.main`. Requested grep on root `main.py` returned no matching `group_id/add_memory/queue/episode/async/persist` lines. |
| 4. `.mcp.json` graphiti env verification | PASS | Graphiti stdio args include `--database-provider falkordb`, `--model qwen3.6:35b`, `--embedder-model qwen3-embedding:0.6b`, `--group-id eee`. Env includes `FALKORDB_URI=redis://127.0.0.1:16379`, `FALKORDB_DATABASE=default_db`, `OPENAI_API_URL=http://127.0.0.1:11700/v1`, `OPENAI_BASE_URL=http://127.0.0.1:11700/v1`, `GRAPHITI_GROUP_ID=eee`, `EMBEDDER__DIMENSIONS=1024`, `EMBEDDING_DIM=1024`. |
| 5. Group-ID namespace audit | ATTEMPTED / BLOCKED | All Docker/FalkorDB namespace commands failed with `permission denied while trying to connect to the docker API at npipe:////./pipe/docker_engine`. |
| 6. Async queue worker mechanism | PASS | Requested root-level grep over `.local/graphiti/mcp_server/*.py` returned no matches because root has only wrapper `main.py`. Follow-up under `src` found `src/services/queue_service.py`: `add_episode_task()` puts work on an `asyncio.Queue`, starts `asyncio.create_task(self._process_episode_queue(group_id))`, and returns queue size. `_process_episode_queue()` awaits the queued `process_func`; exceptions are logged and then `task_done()` is called. `process_func()` calls `self._graphiti_client.add_episode(...)`. |
| 7. Recent upstream commits since `c427615` | PASS | `git log --oneline -10` output: `c427615 Bump the uv group across 2 directories with 4 updates (#1473)`. Local checkout only exposed this one commit in the shallow/local history. |
| 8. graphiti-core version / known issue check | PASS / VERSION ATTR MISSING | `python -c 'import graphiti_core; print(graphiti_core.__version__)'` emitted a Pydantic/logfire plugin warning, then `AttributeError: module 'graphiti_core' has no attribute '__version__'`. `pip show graphiti-core` reports `Name: graphiti-core`, `Version: 0.26.3`, `Summary: A temporal graph building library`, `Location: C:\Users\42\AppData\Roaming\Python\Python314\site-packages`. |

## Evidence Trail

`add_memory` does not mean persisted. In `src/graphiti_mcp_server.py`, `add_memory()` submits work to `queue_service.add_episode(...)` and returns:

```text
Episode '<name>' queued for processing in group '<effective_group_id>'
```

The actual persistence happens later in `src/services/queue_service.py`, where the background queue worker calls:

```text
await self._graphiti_client.add_episode(...)
```

`get_episodes()` reads persisted `EpisodicNode` records directly via:

```text
EpisodicNode.get_by_group_ids(client.driver, effective_group_ids, limit=max_episodes)
```

and returns `No episodes found` if that read returns an empty list.

The MCP configuration uses the local OpenAI-compatible proxy at `http://127.0.0.1:11700/v1`, model `qwen3.6:35b`, and embedder `qwen3-embedding:0.6b`. The proxy's model-list endpoint is reachable, but actual inference calls against the configured chat and embedding models timed out after 20 seconds with no response body. The requested `gpt-4o-mini` probe also fails because that model is not present on the proxy.

Docker/FalkorDB checks could not be completed from this session because Docker API access is denied, so direct backend health and graph namespace counts are unobserved. However, the observed failure pattern matches an async queued write whose worker cannot complete Graphiti's LLM/embedding-dependent `add_episode()` pipeline, leaving no persisted episode for `get_episodes()` to return.

## ROOT CAUSE Classification

ROOT CAUSE: **PROXY-TIMEOUT-CHAT-COMPLETIONS**

Primary evidence:

- `/v1/models` is reachable, so CLIProxyAPI HTTP routing exists.
- Configured Graphiti chat model `qwen3.6:35b` timed out on `/v1/chat/completions`.
- Configured Graphiti embedder `qwen3-embedding:0.6b` timed out on `/v1/embeddings`.
- Graphiti `add_memory()` success only proves queue acceptance, not persistence.
- `get_episodes(group_ids=['eee'])` returning empty is expected if background `add_episode()` never completes.

Secondary contributing mechanism:

- **ASYNC-TASK-PENDING-NEVER-PERSISTED** is the visible Graphiti-side behavior, but the best-supported upstream trigger is the proxy inference timeout.

Not classified as:

- **BACKEND-OOM-OR-CRASH**: Docker access was blocked, not proven unhealthy.
- **NAMESPACE-MISMATCH**: `.mcp.json` consistently uses `group_id=eee`; backend graph-name checks were blocked.
- **ENTITY-EXTRACTION-LLM-FAILURE**: the proxy did not return extraction errors; configured inference calls timed out.
- **GRAPHITI-VERSION-BUG**: no evidence from the local commit/version probes identifies a Graphiti regression as the primary cause.

## Recovery Recommendation

1. Fix CLIProxyAPI inference for the configured models before retesting Graphiti persistence.
2. Re-run a direct completion probe for `qwen3.6:35b` and direct embedding probe for `qwen3-embedding:0.6b`; both should return within the Graphiti worker budget.
3. After proxy inference is healthy, call `add_memory(group_id='eee')`, wait for the background queue to drain, then call `get_episodes(group_ids=['eee'])`.
4. From a shell with Docker API permission, re-run Probe 1 and Probe 5 to close the remaining backend/namespace blind spot.

VERDICT: ROOT-CAUSE-IDENTIFIED: PROXY-TIMEOUT-CHAT-COMPLETIONS

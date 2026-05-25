# S2 — OpenHands agent-server Container Spawn Pattern

**Wave**: W376
**Stream**: S2 (research-only)
**Source**: `openhands-agent-server==1.23.0` (PyPI) + Docker image `ghcr.io/openhands/agent-server:latest-python` (cached locally, 5.26GB, ID `d70c077d55ae`)
**Build SHA (image)**: `3d9fc105856acd1d8786b8ba76ea2f3dc8be2fc8` (`OPENHANDS_BUILD_GIT_SHA` env in image)
**Status**: DONE

## §1 Agent-server PyPI package shape

**Package**: `openhands-agent-server` v1.23.0 (PyPI `pypi.org/pypi/openhands-agent-server/json`, `last_serial:37256919`).
**Python**: `>=3.12` (image ships 3.13.13).
**Top-level module**: `openhands.agent_server.*` — a sub-package under the `openhands` namespace.
**Entry point**: `openhands.agent_server.__main__:main` (invoked by the image as `/usr/local/bin/openhands-agent-server`, a PyInstaller-frozen binary built from `openhands-agent-server/openhands/agent_server/agent-server.spec`).
**Server framework**: FastAPI + uvicorn (`fastapi>=0.104`, `uvicorn>=0.31.1`, `websockets>=12`, `wsproto>=1.2.0`).
**Persistence**: SQLAlchemy 2.x + aiosqlite + alembic (per-conversation SQLite under `workspace/conversations/`).
**Docker SDK pin in PyPI metadata**: `docker<8,>=7.1` (matches docker-py compat we use to spawn).
**Pinned runtime deps** (PyPI `requires_dist`): `aiosqlite>=0.19`, `alembic>=1.13`, `docker<8,>=7.1`, `fastapi>=0.104`, `openhands-sdk`, `pydantic>=2`, `sqlalchemy>=2`, `uvicorn>=0.31.1`, `websockets>=12`, `wsproto>=1.2.0`.

Module layout (key files, source `OpenHands/software-agent-sdk:openhands-agent-server/openhands/agent_server/`):
- `__main__.py` — CLI entry, uvicorn boot, signal handling
- `api.py` — FastAPI factory, router wiring, CORS dispatcher
- `app.py` — does not exist at HEAD (404 from raw) — boot happens in `__main__.py` + `api.py`
- `config.py` — pydantic `Config` model + env-loader
- `dependencies.py` — `X-Session-API-Key` auth dependency factory
- `middleware.py` — `CORSDispatcher` + `LocalhostCORSMiddleware`
- `server_details_router.py` — `/alive`, `/health`, `/ready`, `ServerInfo`
- `*_router.py` (~20) — auth, bash, conversation, conversation_acp, cloud_proxy, desktop, event, file, git, hooks, llm, mcp, profiles, settings, skills, tool, vscode, workspace, workspaces, sockets

## §2 Docker image contract

Image: `ghcr.io/openhands/agent-server:latest-python` (5.26GB compressed-on-disk, layered).

| Field | Value |
|---|---|
| `User` | `openhands` (non-root, UID set during build via `ARG USERNAME=openhands`) |
| `WorkingDir` | `/` |
| `ExposedPorts` | `8000/tcp` (agent-server API+WS), `8002/tcp` (noVNC web — only live if `OH_ENABLE_VNC=true`) |
| `Entrypoint` | `["tini", "--", "/usr/local/bin/openhands-agent-server"]` |
| `Cmd` | none (entrypoint passes argv directly to the PyInstaller binary) |
| `Shell` | `["/bin/bash", "-euo", "pipefail", "-c"]` |
| `Labels` | `org.opencontainers.image.authors=Nikolai R Kristiansen <nikolaik@gmail.com>` (sole label) |

**Required env contract** (consumed by server at boot, per `config.py` + `dependencies.py`):
- `SESSION_API_KEY` (V0, fallback) OR `OH_SESSION_API_KEYS_0` (V1, preferred) — bearer-style header credential the orchestrator MUST set OR leave empty for unsecured-mode (NOT recommended)
- `OH_SECRET_KEY` — symmetric cipher key for secret persistence (falls back to first session_api_key if unset; emits `⚠️ OH_SECRET_KEY was not defined` warning)
- `OH_WEB_URL` — optional, sets FastAPI `root_path` when behind a reverse proxy
- `OH_ALLOW_CORS_ORIGINS` — optional CORS allow-list (localhost+127.0.0.1+`DOCKER_HOST_ADDR` always allowed)
- `DOCKER_HOST_ADDR` — auto-allowed CORS origin (orchestrator can set to its own host IP)

**Image-shipped env** (pre-set, not orchestrator-tunable normally): `OH_ENABLE_VNC=false`, `LOG_JSON=true`, `OPENHANDS_BUILD_GIT_SHA=3d9fc105`, `OPENHANDS_BUILD_GIT_REF=refs/heads/main`, `ACP_NODE_DIR=/opt/acp-node` (bundled Node 22.14.0 + claude-agent-acp 0.30.0 + codex-acp 0.11.1 + gemini-cli 0.38.0), `OPENVSCODE_SERVER_ROOT=/openhands/.openvscode-server`, `NOVNC_PORT=8002`, `DISPLAY=:1`, `CHROME_BIN=/usr/bin/chromium`.

**CLI args** (parsed by `__main__.py:main`):
- `--host` (default `0.0.0.0`)
- `--port` (default `8000`)
- `--reload` (default `False`, dev only)

## §3 /health endpoint protocol

Three liveness/readiness endpoints, all `GET`, all returning JSON via `HealthStatus(BaseModel)` (`server_details_router.py`):

| Endpoint | Status code | Body | Purpose |
|---|---|---|---|
| `GET /alive` | 200 | `{"status":"ok"}` | "Basic liveness check — returns OK if the server process is running" |
| `GET /health` | 200 | `{"status":"ok"}` | Identical to `/alive` (alias) |
| `GET /ready` | 200 OR 503 | `{"status":"ready"}` or `{"status":"initializing"}` | Kubernetes-style readiness probe — 503 until `mark_initialization_complete()` fires after all services (VSCode, desktop, tool-preload) finish boot |

**Important nuance**: `/health` does NOT require the `X-Session-API-Key` header (no auth dependency on `server_details_router` — operator-friendly probing). `/ready` is what we should poll for "ready to accept conversation traffic" — `/health` only tells us the uvicorn process is up.

**Recommended polling cadence**: 250ms interval, 60s total timeout, retry on `ConnectionError`. Start polling after `container.start()` returns. Use `/ready` not `/health` if the orchestrator needs to wait for VSCode + tool-preload init (typical end-to-end cold-start ~5-15s).

## §4 session_api_key mint protocol

**Mechanism**: HTTP header `X-Session-API-Key: <key>`. NOT a Bearer token, NOT a POST/sessions create flow. The key is **operator-minted before container start** and passed in via env.

Evidence (`dependencies.py`, lines visible in fetch):
```python
_SESSION_API_KEY_HEADER = APIKeyHeader(name="X-Session-API-Key", auto_error=False)

def create_session_api_key_dependency(config: Config):
    def check_session_api_key(
        session_api_key: str | None = Depends(_SESSION_API_KEY_HEADER),
    ):
        if config.session_api_keys and session_api_key not in config.session_api_keys:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return check_session_api_key
```

**Env-driven mint** (`config.py:_default_session_api_keys`):
```python
V0_SESSION_API_KEY_ENV = "SESSION_API_KEY"       # legacy single-key var
V1_SESSION_API_KEY_ENV = "OH_SESSION_API_KEYS_0"  # current, list-indexed
ENVIRONMENT_VARIABLE_PREFIX = "OH"
```
The pydantic `Config.session_api_keys: list[str]` defaults to `[os.getenv("SESSION_API_KEY")]` if set, else `[]`. Multiple keys via `OH_SESSION_API_KEYS_0`, `OH_SESSION_API_KEYS_1`, etc., supporting **key rotation without service interruption**.

**Empty list = unsecured server** (`"Empty list implies the server will be unsecured"`).

**Orchestrator pattern** (W376):
```python
import secrets
session_key = secrets.token_urlsafe(32)  # 256-bit entropy
# pass via env at container.run()
environment={"SESSION_API_KEY": session_key, "OH_SECRET_KEY": secrets.token_urlsafe(32)}
# pass header on every HTTP/WS request from openhands-sdk client
```

**Workspace-cookie variant** (`oh_workspace_session_key`) exists but is ONLY honored by `/api/auth/workspace-session` mint and `/api/conversations/{id}/workspace/*` static-file routes — irrelevant for W376 spawn (we don't iframe-embed canvas).

## §5 Port allocation pattern

**Server-side default**: `8000/tcp` (uvicorn bind, both image `EXPOSE` and CLI default `--port=8000`). Configurable via `--port` argv or by overriding `Cmd`.

**Host-side allocation** (W376 spawn): use docker-py auto-assign so two containers don't collide:
```python
ports={"8000/tcp": None}  # docker assigns an ephemeral host port
# then resolve via:
container.reload()
host_port = container.attrs["NetworkSettings"]["Ports"]["8000/tcp"][0]["HostPort"]
workspace_url = f"http://127.0.0.1:{host_port}"
```

**Why auto-assign**: per-task-isolation requires N concurrent containers; pinning to host:3000 (or any fixed port) caps us at one container. The 3000-mention in the W375 spec §4.3 sketch was a placeholder — agent-server's actual default is **8000**, not 3000.

**VSCode port** (separate): defaults to `vscode_port: int = 8001` (per `config.py:Config.vscode_port`). NOT in image `EXPOSE` — only used if `enable_vscode=True` (default). Add `8001/tcp` to ports map only if we plan to surface VSCode.

**VNC port**: `8002/tcp` (image-exposed). Off unless `OH_ENABLE_VNC=true`.

## §6 Network requirements

**Network mode**: `bridge` (docker default) — the orchestrator binds host-side ephemeral ports, no need for `host` or custom networks.

**Egress requirements**:
- HTTPS to LLM endpoint (Anthropic / OpenRouter / Bedrock / Azure / etc. — wherever the SDK Agent's LLM(model=...) points)
- HTTPS to PyPI / npmjs.org / GitHub (if the agent uses Python tools, gh CLI, npm tools — image bundles `gh`, `docker-ce`, `node`)
- DNS resolution for the above

**No ingress requirements** beyond the orchestrator → container HTTP/WS path (already covered by `ports={"8000/tcp": None}` + localhost bind).

**No special network mode needed**: the image runs gh + docker + node out-of-box on bridge. If the agent inside the container needs to spawn its OWN docker (matryoshka), the image already has `docker-ce-cli` + `containerd.io` + `docker-compose-plugin` and `/etc/docker/daemon.json` with `mtu: 1450` — but that requires `volumes={"/var/run/docker.sock": {"bind": "/var/run/docker.sock", "mode": "rw"}}` (privilege escalation — opt-in only).

**DOCKER_HOST_ADDR**: set this env to the orchestrator's host IP if the agent needs to call back to the host (auto-allowed CORS).

## §7 Lifecycle signals

**Boot sequence** (per `api.py:api_lifespan` asynccontextmanager):
1. `_ensure_server_tmux_tmpdir()` — provisions tmux socket dir
2. `_cleanup_stale_tmux_sessions()` — kills orphan tmux from prior runs (non-fatal on error)
3. `get_default_conversation_service()` start
4. VSCode service start (if `enable_vscode`)
5. Desktop service start (if `enable_vnc`)
6. Tool preload service start (if `preload_tools=True`, default)
7. `mark_initialization_complete()` — `/ready` flips to 200

**Shutdown** (signal-driven, per `__main__.py:LoggingServer.handle_exit`):
- `SIGTERM` (docker stop default, also SIGINT) → uvicorn's `handle_exit` → lifespan teardown → `asyncio.gather(stop_vscode_service, stop_desktop_service, stop_tool_preload_service, return_exceptions=True)` → uvicorn exit
- `LoggingServer` subclass logs the signal name before delegating: `"Received signal SIGTERM (15), shutting down..."`
- `faulthandler.enable()` is set early to catch segfaults to stderr
- `atexit` registers `"Process exiting via atexit handler"` log

**Drain semantics**: in-flight HTTP requests are awaited by uvicorn during graceful shutdown (default `--timeout-graceful-shutdown=30s` from uvicorn). WebSocket connections are closed when lifespan teardown completes.

**Exit codes**:
- `0` — graceful (SIGTERM, SIGINT, atexit normal)
- `1` — uvicorn startup failure (port collision, bind error, missing dependency)
- Non-zero from `faulthandler` on segfault (rare)

**Orchestrator pattern**: `container.stop(timeout=30)` (30s grace), then `container.remove()`. NOT `container.kill()` which sends SIGKILL and bypasses lifespan teardown — would orphan SQLite WAL + tmux sessions.

## §8 Labels for reconcile-sweep

Image ships only one label (`org.opencontainers.image.authors`). The orchestrator MUST stamp its own labels at `client.containers.run()` time so `docker ps --filter "label=..."` can find orphans.

**Recommended label set** (W376 spawn):
```python
labels={
    # Origin marker — every W376-spawned container has this
    "w375.purpose": "per-task-isolation",
    "w376.workspace_mode": "remote",
    # Per-conversation identity (for targeted teardown)
    "w375.conversation_id": str(conversation_uuid),
    # Orchestrator identity (multi-orchestrator host safety)
    "w375.orchestrator_pid": str(os.getpid()),
    "w375.orchestrator_session": session_id,
    # Lifecycle helpers
    "w375.spawned_at": datetime.now(timezone.utc).isoformat(),
    "w375.image_digest": image.attrs["RepoDigests"][0] if image.attrs.get("RepoDigests") else "unknown",
    # OCI-conformant labels (optional but tooling-friendly)
    "org.opencontainers.image.title": "openhands-agent-server",
    "org.opencontainers.image.version": "1.23.0",
}
```

**Reconcile sweep query**:
```python
orphans = client.containers.list(
    all=True,
    filters={"label": ["w375.purpose=per-task-isolation"]},
)
# filter by age or by missing conversation_id in current orchestrator state
```

## §9 Cite-anchor cluster

1. **PyPI metadata** — `https://pypi.org/pypi/openhands-agent-server/json` → `info.version:"1.23.0"`, `info.requires_python:">=3.12"`, `info.requires_dist:[...]`, `info.project_urls.Source:"https://github.com/OpenHands/software-agent-sdk"` (probed 2026-05-22, last_serial 37256919)
2. **Docker image config** — `docker inspect ghcr.io/openhands/agent-server:latest-python` → `Config.User:"openhands"`, `Config.ExposedPorts:{8000/tcp,8002/tcp}`, `Config.Entrypoint:["tini","--","/usr/local/bin/openhands-agent-server"]`, `Config.Env:[OH_ENABLE_VNC=false,LOG_JSON=true,OPENHANDS_BUILD_GIT_SHA=3d9fc105856acd1d8786b8ba76ea2f3dc8be2fc8,...]` (image ID `d70c077d55ae`, probed 2026-05-22 local cache)
3. **Source — health endpoints** — `openhands/agent_server/server_details_router.py` lines for `@server_details_router.get("/alive")`, `@server_details_router.get("/health")`, `@server_details_router.get("/ready")` (raw.githubusercontent.com/OpenHands/software-agent-sdk/main, probed 2026-05-22)
4. **Source — session_api_key auth** — `openhands/agent_server/dependencies.py:_SESSION_API_KEY_HEADER = APIKeyHeader(name="X-Session-API-Key", auto_error=False)` + `create_session_api_key_dependency()` (raw.githubusercontent.com)
5. **Source — env-var names** — `openhands/agent_server/config.py:V0_SESSION_API_KEY_ENV="SESSION_API_KEY"`, `V1_SESSION_API_KEY_ENV="OH_SESSION_API_KEYS_0"`, `ENVIRONMENT_VARIABLE_PREFIX="OH"` (raw.githubusercontent.com)
6. **Source — uvicorn boot + signals** — `openhands/agent_server/__main__.py:main()` argparse `--host 0.0.0.0 --port 8000`, `LoggingServer(uvicorn.Server).handle_exit` (raw.githubusercontent.com)
7. **Source — lifespan + teardown** — `openhands/agent_server/api.py:api_lifespan` asynccontextmanager + `asyncio.gather(stop_vscode_service, stop_desktop_service, stop_tool_preload_service)` (raw.githubusercontent.com)
8. **Source — CORS middleware** — `openhands/agent_server/middleware.py:LocalhostCORSMiddleware` always-allow `localhost`, `127.0.0.1`, `DOCKER_HOST_ADDR` (raw.githubusercontent.com)
9. **Image build provenance** — `OPENHANDS_BUILD_GIT_SHA=3d9fc105856acd1d8786b8ba76ea2f3dc8be2fc8` + `OPENHANDS_BUILD_GIT_REF=refs/heads/main` (image env, ties to a specific HEAD-pointer for reproducibility)
10. **Official docs** — `https://docs.openhands.dev/sdk` (per PyPI `project_urls.Documentation`)
11. **GitHub repo** — `https://github.com/OpenHands/software-agent-sdk` (per PyPI `project_urls.Source` — NOTE: the original W376 spec speculated `All-Hands-AI/agent-server`, which 404s; the correct org is `OpenHands` and the repo is monorepo `software-agent-sdk`)
12. **PyInstaller spec** — `openhands/agent_server/agent-server.spec` (binary build config; explains why `/usr/local/bin/openhands-agent-server` is a single PyInstaller-frozen executable, not a python script)

## §10 spawn_agent_server canonical code

Minimal docker-py snippet refined per §1-§8 above. **Not for direct copy-paste into prod** — orchestrator must add retry/timeout/exception handling per the W376 spec §4.4 patterns.

```python
"""W376 — Canonical agent-server container spawn.

Refined per S2 research. Use this as the per-task isolation primitive.
"""
from __future__ import annotations

import os
import secrets
import time
from dataclasses import dataclass
from datetime import datetime, timezone
from typing import Any
from uuid import UUID

import docker
import httpx


AGENT_SERVER_IMAGE = "ghcr.io/openhands/agent-server:latest-python"
INTERNAL_AGENT_PORT = 8000  # uvicorn bind inside container (NOT 3000)
HEALTH_POLL_INTERVAL_S = 0.25
HEALTH_TIMEOUT_S = 60.0


@dataclass(frozen=True)
class SpawnedAgentServer:
    container_id: str
    container_name: str
    host_port: int
    base_url: str          # http://127.0.0.1:<host_port>
    session_api_key: str   # secret — pass via X-Session-API-Key header
    conversation_id: UUID


def spawn_agent_server(
    conversation_id: UUID,
    *,
    image: str = AGENT_SERVER_IMAGE,
    extra_env: dict[str, str] | None = None,
    enable_vscode: bool = False,  # off by default — saves ~5s cold-start
    enable_vnc: bool = False,
    docker_host_addr: str | None = None,
) -> SpawnedAgentServer:
    """Spawn one isolated agent-server container for one task.

    Returns immediately after /ready returns 200.
    """
    client = docker.from_env()

    # §4 — mint a 256-bit session key (NOT a POST /sessions flow — env-fed)
    session_api_key = secrets.token_urlsafe(32)
    secret_key = secrets.token_urlsafe(32)

    # §2 — required env (V1 var preferred per config.py)
    env: dict[str, str] = {
        "OH_SESSION_API_KEYS_0": session_api_key,
        "OH_SECRET_KEY": secret_key,
        "OH_ENABLE_VSCODE": "true" if enable_vscode else "false",
        "OH_ENABLE_VNC": "true" if enable_vnc else "false",
        "LOG_JSON": "true",
    }
    if docker_host_addr:
        env["DOCKER_HOST_ADDR"] = docker_host_addr  # auto-allows host as CORS origin
    if extra_env:
        env.update(extra_env)

    # §8 — labels for reconcile sweep
    labels = {
        "w375.purpose": "per-task-isolation",
        "w376.workspace_mode": "remote",
        "w375.conversation_id": str(conversation_id),
        "w375.orchestrator_pid": str(os.getpid()),
        "w375.spawned_at": datetime.now(timezone.utc).isoformat(),
        "org.opencontainers.image.title": "openhands-agent-server",
        "org.opencontainers.image.version": "1.23.0",
    }

    # §5 — auto-assign host port so N containers coexist
    container = client.containers.run(
        image=image,
        detach=True,
        name=f"oh-agent-{conversation_id.hex[:12]}",
        ports={f"{INTERNAL_AGENT_PORT}/tcp": None},  # docker picks ephemeral host port
        environment=env,
        labels=labels,
        # §6 — bridge network default; no special mode
        # §2 — image entrypoint handles tini + signal forwarding, no override
        remove=False,  # caller owns teardown via container.stop()+remove()
    )

    # §5 — resolve the host-assigned port
    container.reload()
    port_binding = container.attrs["NetworkSettings"]["Ports"][f"{INTERNAL_AGENT_PORT}/tcp"]
    if not port_binding:
        container.stop(timeout=5)
        container.remove()
        raise RuntimeError(f"agent-server container {container.id[:12]} had no port binding")
    host_port = int(port_binding[0]["HostPort"])
    base_url = f"http://127.0.0.1:{host_port}"

    # §3 — poll /ready (NOT /health) until 200 or timeout
    deadline = time.monotonic() + HEALTH_TIMEOUT_S
    last_err: Exception | None = None
    while time.monotonic() < deadline:
        try:
            r = httpx.get(f"{base_url}/ready", timeout=2.0)
            if r.status_code == 200:
                break
        except (httpx.ConnectError, httpx.ReadTimeout, httpx.RemoteProtocolError) as e:
            last_err = e
        time.sleep(HEALTH_POLL_INTERVAL_S)
    else:
        # §7 — graceful teardown on boot failure
        container.stop(timeout=10)
        container.remove()
        raise TimeoutError(
            f"agent-server {container.id[:12]} did not become /ready within "
            f"{HEALTH_TIMEOUT_S}s (last error: {last_err!r})"
        )

    return SpawnedAgentServer(
        container_id=container.id,
        container_name=container.name,
        host_port=host_port,
        base_url=base_url,
        session_api_key=session_api_key,
        conversation_id=conversation_id,
    )


def stop_agent_server(container_id: str, *, grace_s: int = 30) -> None:
    """Graceful teardown — SIGTERM via tini, drains lifespan, then remove."""
    client = docker.from_env()
    try:
        container = client.containers.get(container_id)
    except docker.errors.NotFound:
        return  # already gone
    container.stop(timeout=grace_s)  # §7 — tini forwards SIGTERM, uvicorn drains
    container.remove()


def reconcile_orphan_agent_servers(max_age_s: int = 3600) -> list[str]:
    """§8 — sweep containers that look orphaned (no living orchestrator)."""
    client = docker.from_env()
    orphans = client.containers.list(
        all=True,
        filters={"label": ["w375.purpose=per-task-isolation"]},
    )
    removed: list[str] = []
    now = datetime.now(timezone.utc)
    for c in orphans:
        spawned_at_str = c.labels.get("w375.spawned_at")
        if not spawned_at_str:
            continue
        spawned_at = datetime.fromisoformat(spawned_at_str)
        age = (now - spawned_at).total_seconds()
        if age > max_age_s:
            try:
                c.stop(timeout=10)
                c.remove()
                removed.append(c.id[:12])
            except docker.errors.APIError:
                continue
    return removed


def make_client_headers(spawned: SpawnedAgentServer) -> dict[str, str]:
    """§4 — every HTTP/WS call MUST carry this header."""
    return {"X-Session-API-Key": spawned.session_api_key}
```

**Integration note**: the openhands-sdk client (`openhands.sdk.RemoteWorkspace` or similar — research is W376 S1's territory, not S2's) accepts `base_url` + `session_api_key` constructor args and internally wires the `X-Session-API-Key` header to all REST + WS calls. This S2 module's `SpawnedAgentServer` dataclass is the handoff contract.

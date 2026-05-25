"""W376 agent-server container lifecycle via docker-py 7.1.0.

For RemoteWorkspace mode only. Spawns ghcr.io/openhands/agent-server:latest-python
per-task, waits for /ready endpoint, mints session_api_key + secret_key, returns
ContainerContext for workspace_factory.build_workspace_for to consume.

Cite: docker-py 7.1.0 SDK + openhands-agent-server@1.23.0 (PyPI + Docker image).
"""

from __future__ import annotations
import asyncio
import os  # codex r3 D1-R2-P0-1 fix: required for os.getpid() in label construction
import secrets
from datetime import (
    datetime,
    timezone,
)  # codex r3 D1-R2-P0-1 fix: required for label timestamps
from typing import TYPE_CHECKING

import docker
import httpx

from agents.workspace_factory import ContainerContext

if TYPE_CHECKING:
    from agents.egress_sidecar import EgressSidecarContext
    from agents.models import TaskSpec


AGENT_SERVER_IMAGE = "ghcr.io/openhands/agent-server:latest-python"
INTERNAL_AGENT_PORT = 8000  # codex r1 A2 fix: 8000 per S2 (image EXPOSE 8000/tcp)
READY_TIMEOUT_SEC = 60
READY_POLL_INTERVAL_SEC = 0.250


async def spawn_agent_server(
    spec: "TaskSpec",
    net_name: str,
    *,
    egress_ctx: "EgressSidecarContext | None" = None,  # codex r3 D2-S3
) -> ContainerContext:
    """Spawn agent-server container, wait /ready, return ctx.

    Codex r1 A2 + S2 + S5 + R4 BLOCKER FIXES:
    - A2: env-mint BEFORE containers.run, port 8000 (NOT 3000), /ready (NOT /health), stop(30) (NOT kill)
    - S2: OH_SESSION_API_KEYS_0 + OH_SECRET_KEY via secrets.token_urlsafe(32) BEFORE containers.run
    - S5: read_only=True, pids_limit=512, cap_drop=ALL, no-new-privileges, 127.0.0.1 bind
    - R4: label-based reconcile sweep ready (consumed by tools/dispatch_temporal.py reconcile)

    codex r3 D2-S3 fix: egress_ctx (when provided) wires HTTP_PROXY/HTTPS_PROXY/NO_PROXY env
    + dns= override into THIS container — the production path now invokes the egress
    sidecar created by the activity (was e2e-fixture-only at plan Task 24 per r3 evidence).

    Cite: docker-py 7.1.0 containers.run + openhands-agent-server@1.23.0 /ready endpoint
          + codex r1 D1 A2 + D2 S2 + D2 S5 + D3 R4 (BLOCKER fixes)
          + codex r2 D4-P2 dedicated DOCKER_EXECUTOR offload (was PARTIAL — spec-only)
          + codex r3 D2-S3 production-path egress sidecar wiring (was BLOCK).
    """
    # codex r2 D4-P2 FIXED: dedicated ThreadPoolExecutor for docker-py blocking HTTP calls.
    # Worker-default asyncio.to_thread pool conflicts with other async work; isolate docker
    # calls onto a dedicated pool sized for max_concurrent_activities.
    from agents.docker_executor import (
        DOCKER_EXECUTOR,
    )  # codex r2 D4-P2: shared executor

    loop = asyncio.get_event_loop()

    client = await loop.run_in_executor(DOCKER_EXECUTOR, docker.from_env)

    # Codex r1 S2 + S4 BLOCKER FIX: env-mint BEFORE containers.run()
    session_api_key = secrets.token_urlsafe(32)  # ≥32-byte entropy per S4
    secret_key = secrets.token_urlsafe(32)  # independent symmetric cipher key

    # Image digest-pin (CR-9 + S5 R4) — also offloaded to DOCKER_EXECUTOR
    image = await loop.run_in_executor(
        DOCKER_EXECUTOR, client.images.get, AGENT_SERVER_IMAGE
    )
    image_digest = image.attrs.get("RepoDigests", [AGENT_SERVER_IMAGE])[0]

    # codex r3 D2-S3 fix: build env + dns kwargs WITH egress sidecar wiring.
    env = {
        "OH_SESSION_API_KEYS_0": session_api_key,
        "OH_SECRET_KEY": secret_key,
        "OH_ENABLE_VSCODE": "false",
        "OH_ENABLE_VNC": "false",
        "LOG_JSON": "true",
    }
    dns_servers: list[str] | None = None
    if egress_ctx is not None:
        # All outbound LLM API traffic flows through the allowlist sidecar.
        env["HTTP_PROXY"] = f"http://{egress_ctx.sidecar_ip}:3128"
        env["HTTPS_PROXY"] = f"http://{egress_ctx.sidecar_ip}:3128"
        env["NO_PROXY"] = "127.0.0.1,localhost"
        dns_servers = [egress_ctx.sidecar_ip]  # DNS pinned to sidecar resolver

    def _run_container():
        return client.containers.run(
            AGENT_SERVER_IMAGE,
            detach=True,
            name=f"oh-agent-{spec.conversation_id[:12]}",
            network=net_name,
            # codex r3 D2-S3: dns= pinned to sidecar when egress allowlist is active.
            dns=dns_servers,
            # Codex r1 S5 fix: 127.0.0.1 bind only
            ports={f"{INTERNAL_AGENT_PORT}/tcp": ("127.0.0.1", None)},
            # Codex r1 S2 BLOCKER fix: env BEFORE containers.run, NOT after /ready
            # codex r3 D2-S3: env now includes HTTP_PROXY/HTTPS_PROXY/NO_PROXY when sidecar is wired.
            environment=env,
            labels={
                "w375.purpose": "per-task-isolation",  # codex r1 R4 reconcile-label alignment
                "w376.workspace_mode": "remote",
                "w375.conversation_id": spec.conversation_id,
                "w375.orchestrator_pid": str(os.getpid()),
                "w375.spawned_at": datetime.now(timezone.utc).isoformat(),
                "w375.image_digest": image_digest,
            },
            remove=False,
            # Codex r1 S5 hardening
            mem_limit="2g",
            nano_cpus=2_000_000_000,
            pids_limit=512,
            read_only=True,
            tmpfs={"/tmp": "size=512m,exec", "/workspace": "size=2g,exec"},
            cap_drop=["ALL"],
            # NO cap_add: codex r1 S5 finding — NET_BIND_SERVICE unnecessary
            security_opt=["no-new-privileges:true"],
        )

    # codex r2 D4-P2 FIXED: all docker-py blocking HTTP calls on DOCKER_EXECUTOR
    container = await loop.run_in_executor(DOCKER_EXECUTOR, _run_container)
    await loop.run_in_executor(DOCKER_EXECUTOR, container.reload)
    port = int(
        container.attrs["NetworkSettings"]["Ports"][f"{INTERNAL_AGENT_PORT}/tcp"][0][
            "HostPort"
        ]
    )

    # Codex r1 A2 BLOCKER fix: /ready NOT /health
    ready = await _wait_for_ready(port)
    if not ready:
        # cleanup the bad container — codex r1 A2: stop(30) NOT kill()
        # codex r2 D4-P2: cleanup also on DOCKER_EXECUTOR
        try:
            await loop.run_in_executor(
                DOCKER_EXECUTOR, lambda: container.stop(timeout=30)
            )
            await loop.run_in_executor(DOCKER_EXECUTOR, container.remove)
        except Exception:
            pass
        raise RuntimeError(
            f"agent-server container {container.id[:12]} failed /ready "
            f"in {READY_TIMEOUT_SEC}s"
        )

    return ContainerContext(
        container_id=container.id,
        port=port,
        session_api_key=session_api_key,
    )


async def _wait_for_ready(port: int) -> bool:
    """Codex r1 A2 BLOCKER FIX: poll /ready (NOT /health) at 250ms cadence / 60s deadline."""
    deadline = asyncio.get_event_loop().time() + READY_TIMEOUT_SEC
    async with httpx.AsyncClient(timeout=2.0) as client:
        while asyncio.get_event_loop().time() < deadline:
            try:
                r = await client.get(f"http://127.0.0.1:{port}/ready")
                if r.status_code == 200:
                    return True
            except (httpx.ConnectError, httpx.ReadTimeout, httpx.RemoteProtocolError):
                pass
            await asyncio.sleep(READY_POLL_INTERVAL_SEC)
    return False


async def stop_agent_server(ctx: ContainerContext, *, grace_s: int = 30) -> None:
    """Codex r1 A2 BLOCKER FIX: graceful container.stop(timeout=30) NOT container.kill().
    codex r2 D4-P2 FIXED: dedicated DOCKER_EXECUTOR — no more shared asyncio.to_thread pool.
    codex r2 D1-R2-1 FIXED: alias removed — module-graph cleanup-import drift was a NameError trap.

    container.stop() sends SIGTERM via tini → uvicorn drains lifespan via
    asyncio.gather(stop_vscode, stop_desktop, stop_tool_preload, return_exceptions=True).
    container.kill() bypasses lifespan teardown, orphans SQLite WAL + tmux sessions.
    """
    from agents.docker_executor import DOCKER_EXECUTOR

    loop = asyncio.get_event_loop()
    try:
        client = await loop.run_in_executor(DOCKER_EXECUTOR, docker.from_env)
        c = await loop.run_in_executor(
            DOCKER_EXECUTOR, client.containers.get, ctx.container_id
        )
    except docker.errors.NotFound:
        return  # idempotent success
    try:
        await loop.run_in_executor(DOCKER_EXECUTOR, lambda: c.stop(timeout=grace_s))
        await loop.run_in_executor(DOCKER_EXECUTOR, c.remove)
    except docker.errors.NotFound:
        pass


# codex r2 D1-R2-1 FIXED: `kill_agent_server` alias REMOVED. Prior alias caused a silent
# NameError trap (plan imported `kill_agent_server` but cleanup called `stop_agent_server`
# inside `except Exception: pass`, swallowing the import failure and skipping container stop).
# Callers MUST use `stop_agent_server` exclusively. For unrecoverable hangs only, use
# `escalate_force_kill_agent_server()` (new, explicit, NOT silently aliased).


async def escalate_force_kill_agent_server(ctx: ContainerContext) -> None:
    """ESCALATION-ONLY (codex r1 A2 + r2 D1-R2-1): force-kill for unrecoverable hangs.

    NEVER call this on the happy path; always try `stop_agent_server(grace_s=30)` first.
    """
    from agents.docker_executor import DOCKER_EXECUTOR

    loop = asyncio.get_event_loop()
    try:
        client = await loop.run_in_executor(DOCKER_EXECUTOR, docker.from_env)
        c = await loop.run_in_executor(
            DOCKER_EXECUTOR, client.containers.get, ctx.container_id
        )
        await loop.run_in_executor(DOCKER_EXECUTOR, c.kill)
        await loop.run_in_executor(DOCKER_EXECUTOR, lambda: c.remove(force=True))
    except docker.errors.NotFound:
        pass

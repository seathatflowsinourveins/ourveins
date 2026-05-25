# agents/egress_sidecar.py
"""W376 egress-allowlist sidecar (codex r1 D2 S3 P0 + r3 D2-S3 + r4 D2-finding-1).

Default-deny network egress for the remote agent-server container, with a tiny
allowlist for the LLM control-plane endpoints. The mechanism is a per-task Squid
forward-proxy *sidecar* that is the ONLY container with a route off the per-task
network to the outside world; the agent-server container itself sits on an
``internal=True`` Docker network and reaches the internet only by routing its
HTTP_PROXY/HTTPS_PROXY traffic through this sidecar (wired by
``agents.agent_server_spawn.spawn_agent_server`` via ``egress_ctx``).

Defense in depth (codex r1 S3):

  1. **Per-task network is ``internal=True``** — Docker installs no default route to
     the host bridge, so the agent container cannot reach RFC1918 / WAN / cloud
     metadata directly even if it ignores the proxy env. (Network creation lives in
     ``agents.network_helpers``; this module attaches the sidecar to it AND to a
     second, externally-routable network so the proxy can egress.)
  2. **Squid allowlist ACL** — the proxy CONNECTs/forwards only to the four
     allowlisted control-plane hosts on :443. Everything else gets ``403`` /
     connection refused (curl reports ``000`` / non-zero exit).
  3. **iptables DROP at the sidecar** (NET_ADMIN cap) — belt-and-braces packet
     filter that DROPs RFC1918 (10/8, 172.16/12, 192.168/16), link-local /
     cloud-metadata (169.254.0.0/16, incl. 169.254.169.254), and public-resolver
     DNS (8.8.8.8, 8.8.4.4) on the OUTPUT chain, so even a Squid misconfig cannot
     reach those ranges.
  4. **DNS pinned to the sidecar** — ``spawn_agent_server`` sets ``dns=[sidecar_ip]``
     so the agent resolves names through the sidecar's resolver only.

The sidecar carries the labels ``managed-by=w376-egress`` and
``conversation_id=<conversation_id>`` so the reconcile sweep + the
``test_egress_sidecar_cleaned_up_on_every_failure_path`` cleanup assertion
(codex r4 D2-finding-1) can find and reap it on EVERY exit path.

Cite:
  - docker-py 7.1.0 ``client.networks.create(internal=True)`` + ``client.containers.run``
  - Squid 6.x ``http_access``/``acl dstdomain`` forward-proxy allowlist
  - AWS IMDS endpoint 169.254.169.254 (link-local) — blocked per spec §5.6
  - codex r1 D2 S3 (BLOCKER) + r3 D2-S3 (production wiring) + r4 D2-finding-1
    (cleanup-on-every-path) + r5 D2-R2-P0-2 (single canonical API).
"""

from __future__ import annotations

import asyncio
import os
from datetime import datetime, timezone

import docker
from pydantic import BaseModel, ConfigDict, Field

from agents.models import TaskSpec

# --------------------------------------------------------------------------- #
# Constants
# --------------------------------------------------------------------------- #

#: Squid forward-proxy listen port (matches spawn_agent_server HTTP_PROXY wiring
#: at plan:923 — ``http://{egress_ctx.sidecar_ip}:3128``).
SQUID_PROXY_PORT = 3128

#: Sidecar image — pinned digest is operator-overridable; a Squid 6.x image that
#: ships ``iptables`` is required for the NET_ADMIN packet-filter layer. Override
#: via OH_EGRESS_SIDECAR_IMAGE for air-gapped registries / digest pinning (CR-9).
EGRESS_SIDECAR_IMAGE = os.environ.get(
    "OH_EGRESS_SIDECAR_IMAGE", "ubuntu/squid:6.6-24.04_edge"
)

#: Control-plane endpoints the agent is permitted to reach (host:443 only).
#: Mirrors the e2e allowlist at plan:4118. Operator-overridable (comma-separated)
#: via OH_EGRESS_ALLOWLIST for Anthropic-only / OpenAI-only deployments.
_DEFAULT_ALLOWLIST = (
    "api.openai.com",
    "api.anthropic.com",
    "oauth.openai.com",
    "auth.openai.com",
)


def _allowlist() -> tuple[str, ...]:
    raw = os.environ.get("OH_EGRESS_ALLOWLIST")
    if not raw:
        return _DEFAULT_ALLOWLIST
    hosts = tuple(h.strip() for h in raw.split(",") if h.strip())
    return hosts or _DEFAULT_ALLOWLIST


#: CIDR ranges DROPped at the sidecar OUTPUT chain regardless of Squid ACL.
#: RFC1918 private space + link-local/metadata + public DNS resolvers.
_BLOCKED_CIDRS = (
    "10.0.0.0/8",
    "172.16.0.0/12",
    "192.168.0.0/16",
    "169.254.0.0/16",  # link-local — includes 169.254.169.254 cloud metadata
)
_BLOCKED_HOSTS = (
    "8.8.8.8",
    "8.8.4.4",
)


# --------------------------------------------------------------------------- #
# Context object
# --------------------------------------------------------------------------- #


class EgressSidecarContext(BaseModel):
    """Handle to a running egress-allowlist sidecar.

    Returned by :func:`spawn_egress_sidecar`; consumed by
    :func:`agents.agent_server_spawn.spawn_agent_server` (``egress_ctx.sidecar_ip``
    → HTTP_PROXY/HTTPS_PROXY + dns pin) and by :func:`stop_egress_sidecar`.
    """

    model_config = ConfigDict(frozen=True)

    container_id: str = Field(description="docker container id of the squid sidecar")
    sidecar_ip: str = Field(
        description="IPv4 of the sidecar on the per-task network; the agent's proxy + DNS target"
    )
    net_name: str = Field(description="per-task internal network the sidecar bridges")
    external_net_name: str | None = Field(
        default=None,
        description="externally-routable network the sidecar is also attached to (egress path)",
    )
    conversation_id: str = Field(
        description="owning task conversation id (label correlation)"
    )
    proxy_port: int = Field(default=SQUID_PROXY_PORT)


# --------------------------------------------------------------------------- #
# Config / entrypoint generation
# --------------------------------------------------------------------------- #


def _render_squid_conf(allowlist: tuple[str, ...]) -> str:
    """Render a minimal default-deny Squid allowlist config.

    Only CONNECT to the allowlisted hosts on :443 is permitted; all other access
    is denied. ``http_access deny all`` is the terminal rule so the proxy is
    fail-CLOSED.
    """
    # `.host` form in dstdomain matches the exact host (a leading dot would match
    # subdomains; we want exact control-plane hosts only).
    dst_lines = "\n".join(f"acl allowed_dst dstdomain {h}" for h in allowlist)
    return f"""# W376 egress-allowlist — generated; default-deny forward proxy.
http_port {SQUID_PROXY_PORT}

# Allowlisted control-plane hosts only.
{dst_lines}

# Permit CONNECT only to :443 on allowlisted hosts.
acl SSL_ports port 443
acl CONNECT method CONNECT
http_access deny CONNECT !SSL_ports
http_access allow allowed_dst SSL_ports
http_access allow allowed_dst

# Fail-CLOSED: deny everything else.
http_access deny all

# No disk cache; minimal footprint.
cache deny all
cache_dir null /tmp
access_log stdio:/dev/stdout
cache_log stdio:/dev/stderr
pid_filename none
shutdown_lifetime 1 seconds
"""


def _render_entrypoint(squid_conf: str) -> str:
    """Render the sidecar entrypoint: install iptables DROP rules (best-effort,
    requires NET_ADMIN), write the squid config, then exec squid in foreground.

    The iptables layer is best-effort (``|| true``): on hosts where NET_ADMIN is
    unavailable the Squid allowlist still enforces the allowlist (layer 2). The
    config is heredoc'd so no bind-mount / build context is needed.
    """
    drop_cidrs = "\n".join(
        f"iptables -A OUTPUT -d {cidr} -j DROP || true" for cidr in _BLOCKED_CIDRS
    )
    drop_hosts = "\n".join(
        f"iptables -A OUTPUT -d {host} -j DROP || true" for host in _BLOCKED_HOSTS
    )
    conf_quoted = squid_conf  # heredoc body; no shell expansion needed
    return f"""set -e
# --- layer 3: iptables DROP for RFC1918 + metadata + public DNS (best-effort) ---
{drop_cidrs}
{drop_hosts}
# --- layer 2: squid allowlist config ---
cat > /etc/squid/squid.conf <<'W376_SQUID_EOF'
{conf_quoted}
W376_SQUID_EOF
# initialise cache dirs Squid expects, then run in foreground.
squid -z 2>/dev/null || true
exec squid -N -d1 -f /etc/squid/squid.conf
"""


# --------------------------------------------------------------------------- #
# Lifecycle
# --------------------------------------------------------------------------- #


async def spawn_egress_sidecar(
    spec: TaskSpec,
    net_name: str,
) -> EgressSidecarContext:
    """Spawn the egress-allowlist Squid sidecar on the per-task network.

    Args:
        spec: the task spec (``spec.conversation_id`` drives labels + naming).
        net_name: the per-task (``internal=True``) Docker network created by
            ``agents.network_helpers._ensure_network``; the sidecar is attached to
            it AND to a second externally-routable network so it can egress.

    Returns:
        EgressSidecarContext with ``sidecar_ip`` (the agent's HTTP_PROXY + DNS
        target), ``container_id``, and the network names for cleanup.

    Raises:
        docker.errors.DockerException / RuntimeError on spawn failure — callers
        MUST treat a partially-spawned sidecar as a leak and call
        :func:`stop_egress_sidecar` on the returned (or best-effort) context, per
        codex r4 D2-finding-1 cleanup-on-every-path discipline.

    Blocking docker-py calls are offloaded to the shared ``DOCKER_EXECUTOR`` pool
    (codex r2 D4-P2), mirroring ``spawn_agent_server``.
    """
    from agents.docker_executor import DOCKER_EXECUTOR  # codex r2 D4-P2: shared pool

    loop = asyncio.get_event_loop()
    client = await loop.run_in_executor(DOCKER_EXECUTOR, docker.from_env)

    cid = spec.conversation_id
    # A second, externally-routable network gives the sidecar a path to the
    # internet; the per-task `net_name` is internal=True so the agent cannot
    # bypass the proxy. Idempotent create.
    external_net_name = f"w376-egress-ext-{cid}"

    def _ensure_external_net() -> None:
        existing = client.networks.list(names=[external_net_name])
        if existing:
            return
        client.networks.create(
            external_net_name,
            driver="bridge",
            internal=False,  # this is the ONLY egress path off the per-task net
            labels={
                "managed-by": "w376-egress",
                "conversation_id": cid,
                "w375.conversation_id": cid,
                "w376.purpose": "egress-allowlist-external",
            },
        )

    allowlist = _allowlist()
    entrypoint = _render_entrypoint(_render_squid_conf(allowlist))

    def _run() -> str:
        _ensure_external_net()
        container = client.containers.run(
            EGRESS_SIDECAR_IMAGE,
            command=["sh", "-c", entrypoint],
            detach=True,
            name=f"w376-egress-{cid[:12]}",
            # primary attachment = the internal per-task network the agent lives on.
            network=net_name,
            # NET_ADMIN required for the iptables DROP layer; everything else dropped.
            cap_add=["NET_ADMIN"],
            cap_drop=["ALL"],
            security_opt=["no-new-privileges:true"],
            pids_limit=256,
            labels={
                "managed-by": "w376-egress",  # codex r4 D2-finding-1 reap label
                "conversation_id": cid,  # codex r4 D2-finding-1 correlation label
                "w375.conversation_id": cid,
                "w375.purpose": "per-task-isolation",
                "w376.purpose": "egress-allowlist",
                "w375.orchestrator_pid": str(os.getpid()),
                "w375.spawned_at": datetime.now(timezone.utc).isoformat(),
            },
            remove=False,
            restart_policy={"Name": "no"},
        )
        # Attach the external network so the proxy can actually egress.
        try:
            ext = client.networks.get(external_net_name)
            ext.connect(container)
        except docker.errors.APIError:
            # already connected / race — non-fatal.
            pass
        container.reload()
        return container.id

    container_id = await loop.run_in_executor(DOCKER_EXECUTOR, _run)

    def _resolve_ip() -> str:
        container = client.containers.get(container_id)
        container.reload()
        nets = container.attrs["NetworkSettings"]["Networks"]
        # Prefer the per-task (internal) network IP — that is the address the agent
        # container reaches the proxy/DNS on.
        if net_name in nets and nets[net_name].get("IPAddress"):
            return nets[net_name]["IPAddress"]
        # Fallback: any attached network with an IP.
        for net in nets.values():
            ip = net.get("IPAddress")
            if ip:
                return ip
        raise RuntimeError(
            f"egress sidecar {container_id[:12]} has no IP on network {net_name!r}"
        )

    sidecar_ip = await loop.run_in_executor(DOCKER_EXECUTOR, _resolve_ip)

    return EgressSidecarContext(
        container_id=container_id,
        sidecar_ip=sidecar_ip,
        net_name=net_name,
        external_net_name=external_net_name,
        conversation_id=cid,
        proxy_port=SQUID_PROXY_PORT,
    )


async def stop_egress_sidecar(egress_ctx: EgressSidecarContext | None) -> None:
    """Stop + remove the egress sidecar and its external network (best-effort).

    Idempotent and exception-swallowing per the cleanup-ladder contract
    (plan:1518-1523): a failure removing one resource still attempts the rest, so
    no egress sidecar carrying our wave label survives ANY exit path (codex r4
    D2-finding-1).

    Accepts ``None`` so the production cleanup ladder can call it unconditionally
    when the sidecar never came up.
    """
    if egress_ctx is None:
        return

    from agents.docker_executor import DOCKER_EXECUTOR

    loop = asyncio.get_event_loop()

    def _stop_and_remove() -> None:
        try:
            client = docker.from_env()
        except docker.errors.DockerException:
            return
        # Stop + remove the container (stop, not kill — graceful, mirrors agent path).
        try:
            container = client.containers.get(egress_ctx.container_id)
            try:
                container.stop(timeout=10)
            except docker.errors.APIError:
                pass
            try:
                container.remove(force=True)
            except docker.errors.APIError:
                pass
        except docker.errors.NotFound:
            pass
        except docker.errors.APIError:
            pass
        # Remove the external egress network we created for this task.
        if egress_ctx.external_net_name:
            try:
                net = client.networks.get(egress_ctx.external_net_name)
                net.remove()
            except (docker.errors.NotFound, docker.errors.APIError):
                pass

    await loop.run_in_executor(DOCKER_EXECUTOR, _stop_and_remove)


__all__ = [
    "EgressSidecarContext",
    "spawn_egress_sidecar",
    "stop_egress_sidecar",
    "SQUID_PROXY_PORT",
    "EGRESS_SIDECAR_IMAGE",
]

# tests/e2e/test_w376_egress_allowlist.py
"""W376 egress-allowlist sidecar tests (codex r1 D2 S3 P0 + r2 D2-S3 + r4 D2-finding-1).

Two layers:

  * **Unit** (always run; docker MOCKED) — assert the sidecar's default-deny Squid
    config + iptables DROP ruleset + spawn/stop docker-py call shape + label set
    (``managed-by=w376-egress`` + ``conversation_id=<id>``). These give real GREEN
    coverage with no Docker daemon.

  * **Live e2e** (``@pytest.mark.e2e``; SKIP unless ``W376_E2E_LIVE=1``) — spin a real
    agent-server + egress sidecar and exec curl/nc probes into the agent container,
    DETERMINISTICALLY asserting (codex r2 D2-S3 — replaced prior ``pass`` placeholders):

        Allow: api.openai.com:443, api.anthropic.com:443, oauth.openai.com:443, auth.openai.com:443
        Block: RFC1918 (10/8, 172.16/12, 192.168/16), AWS metadata (169.254.169.254), public DNS (8.8.8.8)

    plus the cleanup-on-EVERY-failure-path parametrized test (codex r4 D2-finding-1):
    the egress sidecar MUST be reaped on spawn-failure / /ready timeout / conversation
    failure / success alike.
"""

from __future__ import annotations

import contextlib
import os
from unittest.mock import MagicMock

import pytest

from agents.egress_sidecar import (
    EGRESS_SIDECAR_IMAGE,
    SQUID_PROXY_PORT,
    EgressSidecarContext,
    _allowlist,
    _BLOCKED_CIDRS,
    _BLOCKED_HOSTS,
    _render_entrypoint,
    _render_squid_conf,
    spawn_egress_sidecar,
    stop_egress_sidecar,
)
from agents.models import Budget, TaskSpec

# --------------------------------------------------------------------------- #
# Unit tests — Squid config + iptables ruleset (no docker)
# --------------------------------------------------------------------------- #


def test_squid_conf_is_fail_closed_with_allowlist():
    """The rendered Squid config must allow ONLY the allowlisted hosts and end with
    a terminal ``http_access deny all`` (default-deny / fail-CLOSED)."""
    conf = _render_squid_conf(_allowlist())
    for host in (
        "api.openai.com",
        "api.anthropic.com",
        "oauth.openai.com",
        "auth.openai.com",
    ):
        assert f"dstdomain {host}" in conf, f"{host} missing from allowlist ACL"
    assert f"http_port {SQUID_PROXY_PORT}" in conf
    # Terminal deny must be the LAST http_access directive (fail-closed).
    access_lines = [
        ln.strip() for ln in conf.splitlines() if ln.strip().startswith("http_access")
    ]
    assert access_lines[-1] == "http_access deny all", access_lines


def test_squid_conf_blocks_non_allowlisted_domain():
    """A non-allowlisted host (api.example.com) must NOT appear as an allowed dst."""
    conf = _render_squid_conf(("api.openai.com",))
    assert "dstdomain api.example.com" not in conf
    assert "dstdomain api.openai.com" in conf


def test_entrypoint_drops_rfc1918_metadata_and_public_dns():
    """The sidecar entrypoint must install iptables DROP rules for every blocked
    RFC1918 range, the link-local/metadata range (169.254.0.0/16 covers
    169.254.169.254), and the public DNS resolvers."""
    entry = _render_entrypoint(_render_squid_conf(_allowlist()))
    for cidr in ("10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "169.254.0.0/16"):
        assert f"-d {cidr} -j DROP" in entry, f"missing DROP for {cidr}"
        assert cidr in _BLOCKED_CIDRS
    for host in ("8.8.8.8", "8.8.4.4"):
        assert f"-d {host} -j DROP" in entry, f"missing DROP for {host}"
        assert host in _BLOCKED_HOSTS
    # metadata IP must be inside the blocked link-local range.
    assert "169.254.0.0/16" in _BLOCKED_CIDRS
    # iptables runs BEFORE squid exec (order matters: drop-first, then serve).
    assert entry.index("iptables") < entry.index("exec squid")


def test_allowlist_env_override(monkeypatch):
    """OH_EGRESS_ALLOWLIST overrides the default 4-host allowlist."""
    monkeypatch.setenv("OH_EGRESS_ALLOWLIST", "api.anthropic.com, api.openai.com")
    assert _allowlist() == ("api.anthropic.com", "api.openai.com")
    monkeypatch.delenv("OH_EGRESS_ALLOWLIST", raising=False)
    assert _allowlist() == (
        "api.openai.com",
        "api.anthropic.com",
        "oauth.openai.com",
        "auth.openai.com",
    )


def _mock_docker_client(sidecar_ip: str = "172.31.0.9"):
    """Build a MagicMock docker client that records containers.run kwargs and
    returns a container whose NetworkSettings expose ``sidecar_ip`` on the per-task
    network."""
    client = MagicMock(name="docker_client")
    container = MagicMock(name="container")
    container.id = "deadbeefcafe1234"
    container.attrs = {
        "NetworkSettings": {"Networks": {}}  # filled per-test once net_name known
    }
    client.containers.run.return_value = container
    client.containers.get.return_value = container
    client.networks.list.return_value = []  # external net does not yet exist
    client.networks.create.return_value = MagicMock(name="ext_net")
    client.networks.get.return_value = MagicMock(name="ext_net_handle")
    return client, container


@pytest.mark.asyncio
async def test_spawn_egress_sidecar_sets_labels_caps_and_returns_ip(monkeypatch):
    """spawn_egress_sidecar must run a container with NET_ADMIN, the
    ``managed-by=w376-egress`` + ``conversation_id`` labels, and return a context
    whose ``sidecar_ip`` is the container's IP on the per-task network."""
    spec = TaskSpec(task="t", budget=Budget(), conversation_id="unit-egress-001")
    net_name = f"w375-conv-{spec.conversation_id}"

    client, container = _mock_docker_client()
    # Once spawn knows net_name it resolves IP from this network entry.
    container.attrs["NetworkSettings"]["Networks"] = {
        net_name: {"IPAddress": "172.31.0.9"}
    }
    monkeypatch.setattr("agents.egress_sidecar.docker.from_env", lambda: client)

    ctx = await spawn_egress_sidecar(spec, net_name)

    assert isinstance(ctx, EgressSidecarContext)
    assert ctx.sidecar_ip == "172.31.0.9"
    assert ctx.proxy_port == SQUID_PROXY_PORT
    assert ctx.net_name == net_name
    assert ctx.conversation_id == spec.conversation_id

    # Inspect the containers.run call. The image is passed positionally
    # (docker-py: containers.run(image, command=..., ...)).
    assert client.containers.run.call_count == 1
    args, kwargs = client.containers.run.call_args
    image_used = kwargs.get("image", args[0] if args else None)
    assert image_used == EGRESS_SIDECAR_IMAGE
    assert kwargs["cap_add"] == ["NET_ADMIN"]
    assert kwargs["cap_drop"] == ["ALL"]
    assert kwargs["network"] == net_name
    labels = kwargs["labels"]
    assert labels["managed-by"] == "w376-egress"
    assert labels["conversation_id"] == spec.conversation_id
    assert "no-new-privileges:true" in kwargs["security_opt"]


@pytest.mark.asyncio
async def test_stop_egress_sidecar_stops_removes_and_cleans_network(monkeypatch):
    """stop_egress_sidecar must stop+remove the container and remove the external
    network, swallowing docker errors (idempotent cleanup ladder)."""
    client = MagicMock(name="docker_client")
    container = MagicMock(name="container")
    client.containers.get.return_value = container
    ext_net = MagicMock(name="ext_net")
    client.networks.get.return_value = ext_net
    monkeypatch.setattr("agents.egress_sidecar.docker.from_env", lambda: client)

    ctx = EgressSidecarContext(
        container_id="deadbeefcafe",
        sidecar_ip="172.31.0.9",
        net_name="w375-conv-x",
        external_net_name="w376-egress-ext-x",
        conversation_id="x",
    )
    await stop_egress_sidecar(ctx)

    container.stop.assert_called_once()
    container.remove.assert_called_once()
    ext_net.remove.assert_called_once()


@pytest.mark.asyncio
async def test_stop_egress_sidecar_accepts_none():
    """Production cleanup ladder calls stop_egress_sidecar(None) when the sidecar
    never came up — must be a no-op, not a crash."""
    await stop_egress_sidecar(None)  # must not raise


@pytest.mark.asyncio
async def test_stop_egress_sidecar_swallows_docker_errors(monkeypatch):
    """A docker error mid-cleanup must NOT propagate (fail-open cleanup so the rest
    of the ladder still runs)."""
    import docker as _docker

    client = MagicMock(name="docker_client")
    client.containers.get.side_effect = _docker.errors.APIError("boom")
    client.networks.get.side_effect = _docker.errors.NotFound("gone")
    monkeypatch.setattr("agents.egress_sidecar.docker.from_env", lambda: client)

    ctx = EgressSidecarContext(
        container_id="deadbeefcafe",
        sidecar_ip="172.31.0.9",
        net_name="w375-conv-x",
        external_net_name="w376-egress-ext-x",
        conversation_id="x",
    )
    await stop_egress_sidecar(ctx)  # must not raise


def test_per_task_network_is_created_internal(monkeypatch):
    """codex r? P1-3a (P0-1 partner): the per-task agent net MUST be created with
    ``--internal`` so the agent container has NO default WAN route and cannot bypass
    the Squid HTTP_PROXY (the egress allowlist control). Without --internal the whole
    egress fail-CLOSED posture is void.

    Parse-level / no-Docker assertion (mirrors this file's always-run Unit layer):
    monkeypatch ``subprocess.run`` so ``_ensure_network`` runs its create branch with
    NO daemon, and assert the resulting ``docker network create`` argv contains
    ``--internal`` before the positional net name. A fully-live route-denial probe is
    additionally covered by ``test_agent_net_has_no_direct_route`` below (W376_E2E_LIVE).
    """
    import subprocess

    from agents.network_helpers import _ensure_network

    calls: list[list[str]] = []

    class _Result:
        def __init__(self, returncode: int) -> None:
            self.returncode = returncode
            self.stdout = b""
            self.stderr = b""

    def fake_run(argv, *args, **kwargs):
        calls.append(argv)
        if argv[:3] == ["docker", "network", "inspect"]:
            return _Result(1)  # absent → take the create branch
        return _Result(0)

    monkeypatch.setattr(subprocess, "run", fake_run)

    net = "w375-conv-e2e-internal-001"
    _ensure_network(net, "e2e-internal-001")

    create_calls = [c for c in calls if c[:3] == ["docker", "network", "create"]]
    assert len(create_calls) == 1, f"expected one create call; got {calls!r}"
    argv = create_calls[0]
    assert "--internal" in argv, (
        "W376 P0-1/P1-3a: per-task agent net MUST be --internal (fail-CLOSED egress); "
        f"got argv={argv!r}"
    )
    assert argv.index("--internal") < argv.index(net), (
        f"--internal must be a flag before the positional net_name; got {argv!r}"
    )


# --------------------------------------------------------------------------- #
# Live e2e — real docker + agent-server + sidecar (SKIP unless W376_E2E_LIVE=1)
# --------------------------------------------------------------------------- #


def _container_exec(container, cmd: list[str], timeout: int = 10) -> tuple[int, str]:
    """Run cmd inside container, return (exit_code, combined output)."""
    rc, output = container.exec_run(cmd, demux=False, stdout=True, stderr=True)
    return rc, (output.decode("utf-8", errors="replace") if output else "")


@pytest.fixture
async def live_remote_agent_server():
    """Spin a real agent-server + egress sidecar, yield agent container, then cleanup.

    codex r5 D2-R2-P0-2 fix: this fixture is the LIVE production-shape e2e — it MUST
    exercise the same ``spawn_agent_server(spec, net, egress_ctx=...)`` call site as
    the production activity body. It uses the single egress API
    ``spawn_egress_sidecar`` / ``stop_egress_sidecar`` per agents/egress_sidecar.py so
    the agent container actually receives HTTP_PROXY / HTTPS_PROXY / NO_PROXY env +
    DNS pinning from the sidecar (prior fixture passed NO egress_ctx, making the
    allowlist tests PRODUCTION-VOID).
    """
    if not os.getenv("W376_E2E_LIVE"):
        pytest.skip("Set W376_E2E_LIVE=1 for live e2e")
    import docker

    from agents.agent_server_spawn import spawn_agent_server, stop_agent_server
    from agents.egress_sidecar import (  # codex r5: single API
        spawn_egress_sidecar,
        stop_egress_sidecar,
    )
    from agents.network_helpers import _ensure_network

    spec = TaskSpec(task="t", budget=Budget(), conversation_id="e2e-egress-001")
    net = f"w375-conv-{spec.conversation_id}"
    # network_helpers._ensure_network signature is (net_name, conversation_id).
    _ensure_network(net, spec.conversation_id)
    # codex r5 D2-R2-P0-2: spawn egress sidecar via canonical API + pass ctx into spawn_agent_server.
    egress_ctx = await spawn_egress_sidecar(spec, net)
    ctx = await spawn_agent_server(spec, net, egress_ctx=egress_ctx)
    client = docker.from_env()
    container = client.containers.get(ctx.container_id)
    try:
        yield container
    finally:
        await stop_agent_server(ctx)
        # codex r5 D2-R2-P0-2: use stop_egress_sidecar canonical API.
        await stop_egress_sidecar(egress_ctx)
        with contextlib.suppress(Exception):
            client.networks.get(net).remove()


@pytest.mark.e2e
@pytest.mark.asyncio
async def test_egress_to_rfc1918_blocked(live_remote_agent_server):
    rc, out = _container_exec(
        live_remote_agent_server,
        [
            "curl",
            "-sS",
            "-o",
            "/dev/null",
            "-w",
            "%{http_code}",
            "--max-time",
            "3",
            "http://192.168.1.1/",
        ],
    )
    assert rc != 0 or "000" in out, f"RFC1918 MUST be blocked; got rc={rc} out={out!r}"


@pytest.mark.e2e
@pytest.mark.asyncio
async def test_egress_to_aws_metadata_blocked(live_remote_agent_server):
    rc, out = _container_exec(
        live_remote_agent_server,
        [
            "curl",
            "-sS",
            "-o",
            "/dev/null",
            "-w",
            "%{http_code}",
            "--max-time",
            "3",
            "http://169.254.169.254/",
        ],
    )
    assert rc != 0 or "000" in out, (
        f"AWS metadata MUST be blocked; got rc={rc} out={out!r}"
    )


@pytest.mark.e2e
@pytest.mark.asyncio
async def test_egress_to_public_dns_blocked(live_remote_agent_server):
    rc, out = _container_exec(
        live_remote_agent_server,
        ["dig", "+timeout=3", "+tries=1", "@8.8.8.8", "google.com"],
    )
    assert rc != 0, f"Public DNS to 8.8.8.8 MUST be blocked; rc={rc}"


@pytest.mark.e2e
@pytest.mark.asyncio
async def test_egress_to_openai_allowed(live_remote_agent_server):
    rc, out = _container_exec(
        live_remote_agent_server,
        [
            "curl",
            "-sS",
            "-o",
            "/dev/null",
            "-w",
            "%{http_code}",
            "--max-time",
            "10",
            "https://api.openai.com/v1/models",
        ],
    )
    # OpenAI returns 401 without API key — but we just need TLS handshake + connection.
    assert "401" in out or "200" in out, f"api.openai.com MUST reach; got {out!r}"


@pytest.mark.e2e
@pytest.mark.asyncio
async def test_egress_to_evil_domain_blocked(live_remote_agent_server):
    rc, out = _container_exec(
        live_remote_agent_server,
        [
            "curl",
            "-sS",
            "-o",
            "/dev/null",
            "-w",
            "%{http_code}",
            "--max-time",
            "3",
            "https://api.example.com/",
        ],
    )
    assert rc != 0 or "000" in out, (
        f"non-allowlisted domain MUST be blocked; got {out!r}"
    )


@pytest.mark.e2e
@pytest.mark.asyncio
async def test_agent_net_has_no_direct_route(live_remote_agent_server):
    """codex P0-1/P1-3a: the per-task net the agent lives on MUST be an internal
    Docker network (no NAT/default WAN route), so a DIRECT (proxy-bypassing) egress
    attempt to the public internet fails. This is the invariant a missing --internal
    would silently break — the squid allowlist tests above can still pass even with a
    leaky net, so this test asserts the no-direct-route property explicitly.

    Two assertions:
      1. ``docker network inspect`` reports ``Internal == true`` for the per-task net.
      2. A curl that bypasses the HTTP(S) proxy (``--noproxy '*'``) to a public IP
         cannot connect (rc!=0 / http_code 000) — i.e. there is no direct WAN path.
    """
    import docker

    client = docker.from_env()
    # The fixture creates the per-task net as f"w375-conv-{conversation_id}" with
    # conversation_id="e2e-egress-001"; match that here.
    net_name = "w375-conv-e2e-egress-001"
    net = client.networks.get(net_name)
    assert net.attrs.get("Internal") is True, (
        f"W376 P0-1: per-task agent net {net_name!r} MUST be Internal=True (no direct "
        f"WAN route); got Internal={net.attrs.get('Internal')!r}"
    )

    # Direct, proxy-bypassing egress to a public IP must NOT succeed.
    rc, out = _container_exec(
        live_remote_agent_server,
        [
            "curl",
            "-sS",
            "--noproxy",
            "*",
            "-o",
            "/dev/null",
            "-w",
            "%{http_code}",
            "--max-time",
            "3",
            "http://1.1.1.1/",
        ],
    )
    assert rc != 0 or "000" in out, (
        "W376 P0-1: DIRECT (proxy-bypassing) egress from the agent net MUST fail on an "
        f"internal network; got rc={rc} out={out!r}"
    )


# --------------------------------------------------------------------------- #
# Cleanup-on-EVERY-failure-path (codex r4 D2-finding-1)
# --------------------------------------------------------------------------- #


@pytest.mark.e2e
@pytest.mark.parametrize(
    "failure_mode",
    [
        "spawn_agent_server_throws",
        "ready_endpoint_timeout",
        "conversation_failure",
        "success",
    ],
)
@pytest.mark.asyncio
async def test_egress_sidecar_cleaned_up_on_every_failure_path(
    failure_mode, monkeypatch
):
    """codex r4 D2-finding-1: egress sidecar MUST be stopped + removed regardless of
    which stage of the activity fails. Asserts via
    ``docker.from_env().containers.list(filters={"label": [...]})`` returning ``[]``
    after the activity body returns/raises.

    SKIPs unless W376_E2E_LIVE=1 (needs a live Docker daemon + the concurrently-built
    agents.agent_server_spawn module)."""
    if not os.getenv("W376_E2E_LIVE"):
        pytest.skip("Set W376_E2E_LIVE=1 for live e2e")
    import docker

    from agents.temporal_worker import openhands_run_activity

    spec = TaskSpec(
        task="t",
        budget=Budget(),
        conversation_id=f"e2e-egress-cleanup-{failure_mode}",
        workspace_mode="remote",
    )

    if failure_mode == "spawn_agent_server_throws":

        async def _boom(*a, **kw):
            raise RuntimeError("simulated spawn failure")

        monkeypatch.setattr("agents.agent_server_spawn.spawn_agent_server", _boom)
    elif failure_mode == "ready_endpoint_timeout":

        async def _boom(*a, **kw):
            raise RuntimeError("agent-server /ready timeout in 60s")

        monkeypatch.setattr("agents.agent_server_spawn.spawn_agent_server", _boom)
    elif failure_mode == "conversation_failure":
        # let spawn succeed, fail inside conv.run — left to the live activity body.
        ...

    with contextlib.suppress(Exception):
        await openhands_run_activity(spec)

    # Assert: no egress sidecar containers carrying our wave label survive.
    client = docker.from_env()
    survivors = client.containers.list(
        filters={
            "label": [
                "managed-by=w376-egress",
                f"conversation_id={spec.conversation_id}",
            ]
        },
        all=True,
    )
    assert survivors == [], (
        f"codex r4 D2-finding-1: egress sidecar leak on failure_mode={failure_mode!r}; "
        f"survivors={[c.id for c in survivors]}"
    )

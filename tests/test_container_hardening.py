# tests/test_container_hardening.py
"""Codex r1 D2 S5 fix: container hardening parametric regression test.

W376 Stream D Task 23. Asserts that agent_server_spawn's containers.run kwargs
carry the full S5 hardening posture so any future revert is caught:
  - read_only=True
  - pids_limit=512
  - cap_drop=["ALL"]
  - security_opt=["no-new-privileges:true"]
  - 127.0.0.1 (loopback) port bind, NOT 0.0.0.0
  - NO cap_add (codex r1 S5: NET_BIND_SERVICE was unnecessary)

Docker is fully mocked — no daemon required. The spawn path offloads
docker.from_env onto DOCKER_EXECUTOR.run_in_executor, but patching
agents.agent_server_spawn.docker.from_env still intercepts it because the
executor merely invokes that callable in a worker thread.
"""

import uuid

import pytest
from unittest.mock import AsyncMock, MagicMock, patch

from agents.models import Budget, TaskSpec


def _mock_docker_client():
    """Build a MagicMock docker client whose containers.run returns a container
    with the NetworkSettings shape spawn_agent_server reloads + reads."""
    mock_container = MagicMock()
    mock_container.id = "hardening0test0container0id00"
    mock_container.attrs = {
        "NetworkSettings": {
            "Ports": {"8000/tcp": [{"HostPort": "55001"}]}  # codex r1 A2: 8000 NOT 3000
        }
    }
    mock_container.reload = MagicMock()

    mock_client = MagicMock()
    mock_client.containers.run.return_value = mock_container
    return mock_client


async def _spawn_and_capture_kwargs():
    """Invoke spawn_agent_server with docker + /ready mocked; return the kwargs
    dict that containers.run was called with."""
    from agents.agent_server_spawn import spawn_agent_server

    spec = TaskSpec(task="echo", budget=Budget(), conversation_id=str(uuid.uuid4()))
    mock_client = _mock_docker_client()

    with patch("agents.agent_server_spawn.docker.from_env", return_value=mock_client):
        with patch(
            "agents.agent_server_spawn._wait_for_ready",
            AsyncMock(return_value=True),
        ):
            await spawn_agent_server(spec, net_name="w375-hardening-net")

    return mock_client.containers.run.call_args.kwargs


@pytest.mark.parametrize(
    "hardening_key,expected",
    [
        ("read_only", True),
        ("pids_limit", 512),
        ("cap_drop", ["ALL"]),
        ("security_opt", ["no-new-privileges:true"]),
    ],
)
@pytest.mark.asyncio
async def test_container_hardening_kwargs(hardening_key, expected):
    """Each S5 hardening kwarg MUST be present with its expected value.
    A future revert (read_only=False, missing pids_limit, dropped cap_drop, etc.)
    flips the matching parametrize row to red."""
    call_kwargs = await _spawn_and_capture_kwargs()
    assert call_kwargs.get(hardening_key) == expected, (
        f"S5 hardening regression: {hardening_key} != {expected!r} "
        f"(got {call_kwargs.get(hardening_key)!r})"
    )


@pytest.mark.asyncio
async def test_container_port_bind_is_127_0_0_1():
    """codex r1 S5: agent-server host port MUST bind loopback only, never 0.0.0.0."""
    call_kwargs = await _spawn_and_capture_kwargs()
    ports = call_kwargs.get("ports", {})
    assert ports.get("8000/tcp") == ("127.0.0.1", None), (
        f"S5: port bind MUST be ('127.0.0.1', None); got {ports.get('8000/tcp')!r}"
    )
    # Defense-in-depth: ensure no other published port escapes loopback.
    for port_spec, binding in ports.items():
        host_ip = binding[0] if isinstance(binding, tuple) else None
        assert host_ip not in ("0.0.0.0", "::", ""), (
            f"S5: port {port_spec} bound to non-loopback host {host_ip!r}"
        )


@pytest.mark.asyncio
async def test_container_no_cap_add():
    """codex r1 S5: NET_BIND_SERVICE (and any cap_add) was found unnecessary.
    Assert cap_add is absent entirely OR empty — never granting back capabilities."""
    call_kwargs = await _spawn_and_capture_kwargs()
    cap_add = call_kwargs.get("cap_add")
    assert cap_add in (None, [], ()), (
        f"S5: containers.run MUST NOT pass cap_add; got {cap_add!r}"
    )


@pytest.mark.asyncio
async def test_container_remove_is_false_for_reconcile_sweep():
    """codex r1 R4: containers are NOT auto-removed (remove=False) so the
    label-based reconcile sweep can find + reap orphans. Guards against a revert
    to remove=True that would defeat reconciliation."""
    call_kwargs = await _spawn_and_capture_kwargs()
    assert call_kwargs.get("remove") is False, (
        f"R4: remove MUST be False for reconcile-sweep; got {call_kwargs.get('remove')!r}"
    )

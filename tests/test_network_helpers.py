# tests/test_network_helpers.py
import subprocess

import pytest

from agents.network_helpers import _ensure_network, _remove_network


def _docker_available():
    try:
        return (
            subprocess.run(
                ["docker", "info"], capture_output=True, timeout=5
            ).returncode
            == 0
        )
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False


@pytest.mark.skipif(not _docker_available(), reason="docker unavailable")
def test_ensure_network_creates_idempotent():
    net = "w375-test-network-001"
    conv_id = "test-conv-001"
    try:
        _ensure_network(net, conv_id)
        r = subprocess.run(["docker", "network", "inspect", net], capture_output=True)
        assert r.returncode == 0
        # Idempotent: second call must not raise
        _ensure_network(net, conv_id)
    finally:
        _remove_network(net)


@pytest.mark.skipif(not _docker_available(), reason="docker unavailable")
def test_ensure_network_attaches_labels():
    net = "w375-test-network-002"
    conv_id = "test-conv-002"
    try:
        _ensure_network(net, conv_id)
        r = subprocess.run(
            ["docker", "network", "inspect", net, "--format", "{{json .Labels}}"],
            capture_output=True,
            text=True,
        )
        assert r.returncode == 0
        assert "w375.conversation_id" in r.stdout
        assert conv_id in r.stdout
        assert (
            "w375.purpose=per-task-isolation" in r.stdout
            or "per-task-isolation" in r.stdout
        )
    finally:
        _remove_network(net)


@pytest.mark.skipif(not _docker_available(), reason="docker unavailable")
def test_remove_network_is_best_effort():
    # Removing a non-existent network must not raise
    _remove_network("w375-nonexistent-net-xyz")


def test_ensure_network_creates_internal_network(monkeypatch):
    """W376 P0-1 fail-CLOSED egress invariant (no live Docker required).

    The per-task net is the network the agent container lives on; egress_sidecar.py
    documents it as ``internal=True`` so the agent cannot bypass the Squid proxy and
    reach RFC1918 / cloud-metadata / WAN directly. Therefore ``docker network create``
    MUST be invoked with ``--internal``. This monkeypatches ``subprocess.run`` so it
    needs NO Docker daemon: the inspect call returns rc!=0 (network absent) so the
    create branch runs, and we capture its argv.
    """
    calls: list[list[str]] = []

    class _Result:
        def __init__(self, returncode: int) -> None:
            self.returncode = returncode
            self.stdout = b""
            self.stderr = b""

    def fake_run(argv, *args, **kwargs):
        calls.append(argv)
        # First call is `docker network inspect ...` → rc!=0 means "absent" → create.
        if argv[:3] == ["docker", "network", "inspect"]:
            return _Result(1)
        return _Result(0)

    monkeypatch.setattr(subprocess, "run", fake_run)

    _ensure_network("w375-conv-internal-001", "conv-internal-001")

    create_calls = [c for c in calls if c[:3] == ["docker", "network", "create"]]
    assert len(create_calls) == 1, f"expected exactly one create call; got {calls!r}"
    create_argv = create_calls[0]
    assert "--internal" in create_argv, (
        "W376 P0-1: `docker network create` MUST include --internal so the per-task "
        f"agent net has no direct WAN route; got argv={create_argv!r}"
    )
    # --internal must precede the positional net_name (it is a flag, not the arg).
    assert create_argv.index("--internal") < create_argv.index(
        "w375-conv-internal-001"
    ), f"--internal must be a flag before the positional net_name; got {create_argv!r}"
    # Labels must still be present (do not regress the idempotency/correlation labels).
    assert "--label" in create_argv, f"labels regressed; got {create_argv!r}"

# tests/test_subprocess_helpers.py
import sys
import subprocess
import pytest
from agents.subprocess_helpers import _spawn_kwargs, _cancel_subprocess_blocking


def test_spawn_kwargs_windows():
    if sys.platform != "win32":
        pytest.skip("windows-only test")
    kwargs = _spawn_kwargs()
    assert "creationflags" in kwargs
    assert kwargs["creationflags"] == subprocess.CREATE_NEW_PROCESS_GROUP


def test_spawn_kwargs_posix():
    if sys.platform == "win32":
        pytest.skip("posix-only test")
    kwargs = _spawn_kwargs()
    assert kwargs.get("start_new_session") is True


def test_cancel_subprocess_blocking_terminates_quickly():
    proc = subprocess.Popen(
        [sys.executable, "-c", "import time; time.sleep(60)"],
        stdin=subprocess.PIPE,
        **_spawn_kwargs(),
    )
    _cancel_subprocess_blocking(proc, soft_timeout_s=2.0, hard_timeout_s=2.0)
    assert proc.returncode is not None


def test_force_kill_container_invokes_docker_kill(monkeypatch):
    calls = []

    def fake_run(args, **kwargs):
        calls.append((args, kwargs))

        class R:
            returncode = 0

        return R()

    from agents import subprocess_helpers

    monkeypatch.setattr(subprocess_helpers.subprocess, "run", fake_run)
    subprocess_helpers._force_kill_container("test-container-id-abc")
    assert len(calls) == 1
    assert calls[0][0] == ["docker", "kill", "test-container-id-abc"]
    assert calls[0][1].get("check") is False
    assert calls[0][1].get("capture_output") is True
    assert calls[0][1].get("timeout") == 10


def test_force_kill_container_swallows_docker_missing(monkeypatch):
    def fake_run(*args, **kwargs):
        raise FileNotFoundError("docker not on PATH")

    from agents import subprocess_helpers

    monkeypatch.setattr(subprocess_helpers.subprocess, "run", fake_run)
    # Should NOT raise — best-effort cleanup
    subprocess_helpers._force_kill_container("test-container-id-xyz")


def test_force_kill_container_swallows_timeout(monkeypatch):
    import subprocess as _subprocess

    def fake_run(*args, **kwargs):
        raise _subprocess.TimeoutExpired(cmd=["docker", "kill"], timeout=10)

    from agents import subprocess_helpers

    monkeypatch.setattr(subprocess_helpers.subprocess, "run", fake_run)
    # Should NOT raise
    subprocess_helpers._force_kill_container("test-container-id-timeout")

"""tests/test_async_cleanup.py
Test coverage for `_async_cleanup` in agents/temporal_worker.py.

Implementation uses asyncio.to_thread for all blocking calls:
  - conv.close()         → asyncio.to_thread(conv.close)
  - docker kill          → asyncio.to_thread(subprocess.run, ["docker", "kill", ...], ...)
  - docker network rm    → asyncio.to_thread(subprocess.run, ["docker", "network", "rm", ...], ...)

Tests patch asyncio.to_thread (not subprocess.run directly) to match actual impl.

Spec: §4 v6 + codex r5/r6 P1-1 — best-effort cleanup must not raise.
"""

from __future__ import annotations

from unittest.mock import AsyncMock, MagicMock, patch

import pytest


# ---------------------------------------------------------------------------
# helpers
# ---------------------------------------------------------------------------


def _make_to_thread_mock():
    """Return an AsyncMock that records every (fn, *args, **kwargs) call.

    When called as ``await asyncio.to_thread(fn, *a, **kw)`` the mock records
    the call and returns None (sufficient for cleanup code that discards the
    return value).
    """
    return AsyncMock(return_value=None)


# ---------------------------------------------------------------------------
# test_async_cleanup_closes_conv
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_async_cleanup_closes_conv():
    """Cleanup calls conv.close() via asyncio.to_thread when conv is not None."""
    from agents.temporal_worker import _async_cleanup

    conv = MagicMock()
    conv.close = MagicMock()

    to_thread_mock = _make_to_thread_mock()
    with patch("agents.temporal_worker.asyncio.to_thread", to_thread_mock):
        await _async_cleanup(conv, None, None, None)

    # At least one call should have conv.close as the first positional arg
    conv_close_calls = [
        c for c in to_thread_mock.call_args_list if c.args and c.args[0] is conv.close
    ]
    assert len(conv_close_calls) >= 1, (
        f"Expected asyncio.to_thread(conv.close, ...) call; got {to_thread_mock.call_args_list}"
    )


# ---------------------------------------------------------------------------
# test_async_cleanup_swallows_conv_close_exception
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_async_cleanup_swallows_conv_close_exception():
    """conv.close() raising (via to_thread) must not propagate — best-effort."""
    from agents.temporal_worker import _async_cleanup

    conv = MagicMock()
    conv.close = MagicMock(side_effect=RuntimeError("close failed"))

    # Make to_thread itself raise when it receives conv.close
    async def to_thread_raiser(fn, *args, **kwargs):
        if fn is conv.close:
            raise RuntimeError("close failed")
        return None

    with patch(
        "agents.temporal_worker.asyncio.to_thread", side_effect=to_thread_raiser
    ):
        # Must NOT raise
        await _async_cleanup(conv, None, None, None)


# ---------------------------------------------------------------------------
# test_async_cleanup_kills_container_via_docker
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_async_cleanup_kills_container_via_docker():
    """When container_id is provided, subprocess.run(['docker', 'kill', id]) is dispatched."""
    from agents.temporal_worker import _async_cleanup

    recorded: list[tuple] = []

    async def to_thread_recorder(fn, *args, **kwargs):
        recorded.append((fn, args, kwargs))
        return None

    with patch(
        "agents.temporal_worker.asyncio.to_thread", side_effect=to_thread_recorder
    ):
        await _async_cleanup(None, None, "container-abc-123", None)

    import subprocess as _subprocess_mod

    docker_kill_calls = [
        args
        for fn, args, kwargs in recorded
        if fn is _subprocess_mod.run
        and args
        and isinstance(args[0], list)
        and args[0][:2] == ["docker", "kill"]
    ]
    assert len(docker_kill_calls) >= 1, (
        f"Expected docker kill call; recorded={recorded}"
    )
    assert "container-abc-123" in docker_kill_calls[0][0], (
        f"container_id missing from args: {docker_kill_calls[0][0]}"
    )


# ---------------------------------------------------------------------------
# test_async_cleanup_removes_network
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_async_cleanup_removes_network():
    """When net_name is provided, subprocess.run(['docker', 'network', 'rm', name]) is dispatched."""
    from agents.temporal_worker import _async_cleanup

    recorded: list[tuple] = []

    async def to_thread_recorder(fn, *args, **kwargs):
        recorded.append((fn, args, kwargs))
        return None

    with patch(
        "agents.temporal_worker.asyncio.to_thread", side_effect=to_thread_recorder
    ):
        await _async_cleanup(None, None, None, "w375-conv-xyz")

    import subprocess as _subprocess_mod

    docker_net_calls = [
        args
        for fn, args, kwargs in recorded
        if fn is _subprocess_mod.run
        and args
        and isinstance(args[0], list)
        and args[0][:3] == ["docker", "network", "rm"]
    ]
    assert len(docker_net_calls) >= 1, (
        f"Expected docker network rm call; recorded={recorded}"
    )
    assert "w375-conv-xyz" in docker_net_calls[0][0], (
        f"net_name missing from args: {docker_net_calls[0][0]}"
    )


# ---------------------------------------------------------------------------
# test_async_cleanup_handles_none_inputs
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_async_cleanup_handles_none_inputs():
    """All-None inputs are a no-op; no exceptions raised, to_thread not called."""
    from agents.temporal_worker import _async_cleanup

    to_thread_mock = _make_to_thread_mock()
    with patch("agents.temporal_worker.asyncio.to_thread", to_thread_mock):
        await _async_cleanup(None, None, None, None)

    # No blocking calls should have been dispatched
    assert to_thread_mock.call_count == 0, (
        f"Expected 0 to_thread calls for all-None input; got {to_thread_mock.call_count}"
    )

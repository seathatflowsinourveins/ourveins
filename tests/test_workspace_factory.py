"""W376 PHASE D Tasks 7+8 — workspace_factory dispatch tests.

DEVIATION FROM PLAN (reported to orchestrator): the plan's test code imports the
real openhands-sdk classes (``from openhands.sdk.workspace.local import
LocalWorkspace`` etc.). openhands-sdk==1.22.1 is NOT installed in this venv
(``importlib.util.find_spec('openhands')`` -> None), so those imports would raise
ModuleNotFoundError and the tests could never reach the dispatch assertions.

Per the implementer task contract ("write the module + tests so the tests MOCK
the SDK classes (patch/MagicMock) rather than requiring a live SDK"), these tests
inject a fake ``openhands.sdk`` module into ``sys.modules`` and assert the factory
calls ``Workspace(...)`` with the correct kwargs for each mode. This mirrors the
repo's existing pattern of mocking external deps (see
tests/test_openhands_client.py, which uses httpx.MockTransport rather than a live
agent-server).

The production module (agents/workspace_factory.py) keeps the plan's deferred
``from openhands.sdk import Workspace`` import unchanged, so it works as-written
once the SDK lands in the venv.

Cite: openhands-sdk@1.22.1 openhands/sdk/workspace/workspace.py:12-29
(Workspace factory class — single entry-point for both modes).
"""

from __future__ import annotations

import sys
import types
import uuid
from contextlib import contextmanager
from unittest.mock import MagicMock

import pytest

from agents.models import Budget, TaskSpec


@contextmanager
def _mock_openhands_sdk():
    """Inject a fake ``openhands.sdk`` exposing a Workspace factory.

    The factory records the kwargs it was called with and returns sentinel
    instances tagged "local" / "remote" so tests can assert dispatch + wiring
    without the real SDK installed. Returns the MagicMock standing in for
    ``openhands.sdk.Workspace``.
    """
    workspace_factory = MagicMock(name="Workspace")

    def _make(*, working_dir, host=None, api_key=None):
        inst = MagicMock(name="WorkspaceInstance")
        inst.working_dir = working_dir
        inst.host = host
        inst.api_key = api_key
        inst._mode = "remote" if host is not None else "local"
        return inst

    workspace_factory.side_effect = _make

    sdk_mod = types.ModuleType("openhands.sdk")
    sdk_mod.Workspace = workspace_factory  # type: ignore[attr-defined]
    pkg_mod = types.ModuleType("openhands")

    saved = {k: sys.modules.get(k) for k in ("openhands", "openhands.sdk")}
    sys.modules["openhands"] = pkg_mod
    sys.modules["openhands.sdk"] = sdk_mod
    try:
        yield workspace_factory
    finally:
        for k, v in saved.items():
            if v is None:
                sys.modules.pop(k, None)
            else:
                sys.modules[k] = v


@pytest.mark.asyncio
async def test_build_workspace_for_local_returns_localworkspace():
    """workspace_mode='local' -> Workspace(working_dir=...), host omitted.

    Per openhands-sdk workspace.py:21-23, Workspace(working_dir=...) without a
    host kwarg yields a LocalWorkspace. We assert the factory is called with the
    conversation-scoped working_dir and NO host (the local branch).
    """
    from agents.workspace_factory import build_workspace_for

    cid = str(uuid.uuid4())
    spec = TaskSpec(
        task="echo", budget=Budget(), workspace_mode="local", conversation_id=cid
    )
    with _mock_openhands_sdk() as workspace_factory:
        ws = await build_workspace_for(spec, container_ctx=None)

    workspace_factory.assert_called_once()
    _, kwargs = workspace_factory.call_args
    assert kwargs.get("host") is None  # local branch -> no host
    assert cid in kwargs["working_dir"]
    assert ws._mode == "local"
    assert cid in ws.working_dir


@pytest.mark.asyncio
async def test_build_workspace_for_remote_returns_remoteworkspace():
    """workspace_mode='remote' + container_ctx -> Workspace wired with host/port/api_key.

    Per openhands-sdk workspace.py, passing host yields a RemoteWorkspace. We
    assert the factory receives the 127.0.0.1:<port> host, the api_key, and the
    conversation-scoped working_dir.
    """
    from agents.workspace_factory import ContainerContext, build_workspace_for

    cid = str(uuid.uuid4())
    spec = TaskSpec(
        task="echo", budget=Budget(), workspace_mode="remote", conversation_id=cid
    )
    ctx = ContainerContext(
        container_id="abc123", port=12345, session_api_key="sk-test-key"
    )
    with _mock_openhands_sdk() as workspace_factory:
        ws = await build_workspace_for(spec, container_ctx=ctx)

    workspace_factory.assert_called_once()
    _, kwargs = workspace_factory.call_args
    assert "12345" in str(kwargs["host"])  # remote branch -> host bound to port
    assert "127.0.0.1" in str(kwargs["host"])  # codex r1 S5: loopback bind
    assert kwargs["api_key"] == "sk-test-key"
    assert cid in kwargs["working_dir"]
    assert ws._mode == "remote"
    assert "12345" in str(ws.host)
    assert cid in ws.working_dir


@pytest.mark.asyncio
async def test_build_workspace_for_remote_without_ctx_raises():
    """Codex r1 A5 fix: remote mode + container_ctx=None -> ValueError (NOT AssertionError).

    Production-unsafe assertions can be optimized away by ``python -O``. The
    factory must raise ValueError so the caller-forgot-to-spawn bug surfaces even
    under optimization. This branch raises BEFORE any SDK import, so it needs no
    SDK mock.
    """
    from agents.workspace_factory import build_workspace_for

    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        workspace_mode="remote",
        conversation_id=str(uuid.uuid4()),
    )
    with pytest.raises(ValueError, match="requires container_ctx"):  # codex r1 A5
        await build_workspace_for(spec, container_ctx=None)

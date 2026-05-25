# tests/test_mcp_server.py
"""W375 P2.2 — TDD tests for FastMCP openhands-dispatch server (spec §6 v6)."""

import os
import hmac
import hashlib
import pytest
from unittest.mock import patch, AsyncMock, MagicMock


@pytest.fixture(autouse=True)
def _hmac_env(monkeypatch):
    monkeypatch.setenv("OPENHANDS_DISPATCH_TOKEN", "test-token-abc")
    from agents.hmac_gate import PREVIEW_CACHE

    PREVIEW_CACHE.clear()
    yield


def test_module_loads_and_mcp_instance_present():
    from agents import mcp_server

    assert mcp_server.mcp is not None
    assert hasattr(mcp_server.mcp, "name") or hasattr(
        mcp_server.mcp, "_name"
    )  # FastMCP API surface


@pytest.mark.asyncio
async def test_dispatch_preview_returns_task_hash():
    from agents.mcp_server import dispatch_openhands_task_preview

    result = await dispatch_openhands_task_preview(task="implement foo")
    assert "task_hash" in result
    assert "nonce" in result
    assert "expires_at" in result
    assert "spec_preview" in result


@pytest.mark.asyncio
async def test_dispatch_confirm_with_valid_hmac_dispatches():
    from agents.mcp_server import (
        dispatch_openhands_task_preview,
        dispatch_openhands_task_confirm,
    )

    preview = await dispatch_openhands_task_preview(task="implement bar")
    token = os.environ["OPENHANDS_DISPATCH_TOKEN"]
    hmac_token = hmac.new(
        token.encode(),
        (preview["task_hash"] + preview["nonce"]).encode(),
        hashlib.sha256,
    ).hexdigest()
    fake_handle = MagicMock()
    fake_handle.result = AsyncMock(
        return_value=MagicMock(model_dump=lambda: {"status": "COMPLETE"})
    )
    fake_client = MagicMock()
    fake_client.start_workflow = AsyncMock(return_value=fake_handle)
    with patch("agents.mcp_server.Client") as mock_client_cls:
        mock_client_cls.connect = AsyncMock(return_value=fake_client)
        result = await dispatch_openhands_task_confirm(
            preview["task_hash"], hmac_token, await_result=False
        )
    assert "conversation_id" in result
    assert result.get("status") == "STARTED"
    fake_client.start_workflow.assert_called_once()


@pytest.mark.asyncio
async def test_dispatch_confirm_invalid_hmac_returns_error():
    from agents.mcp_server import (
        dispatch_openhands_task_preview,
        dispatch_openhands_task_confirm,
    )

    preview = await dispatch_openhands_task_preview(task="implement baz")
    result = await dispatch_openhands_task_confirm(preview["task_hash"], "bad-hmac")
    assert "error" in result


@pytest.mark.asyncio
async def test_cancel_preview_confirm_flow():
    from agents.mcp_server import (
        cancel_openhands_task_preview,
        cancel_openhands_task_confirm,
    )

    preview = await cancel_openhands_task_preview("conv-xyz-123")
    assert "task_hash" in preview
    token = os.environ["OPENHANDS_DISPATCH_TOKEN"]
    hmac_token = hmac.new(
        token.encode(),
        (preview["task_hash"] + preview["nonce"]).encode(),
        hashlib.sha256,
    ).hexdigest()
    fake_handle = MagicMock()
    fake_handle.cancel = AsyncMock()
    fake_client = MagicMock()
    fake_client.get_workflow_handle = MagicMock(return_value=fake_handle)
    with patch("agents.mcp_server.Client") as mock_client_cls:
        mock_client_cls.connect = AsyncMock(return_value=fake_client)
        result = await cancel_openhands_task_confirm(preview["task_hash"], hmac_token)
    assert result.get("status") == "CANCEL_DISPATCHED"


@pytest.mark.asyncio
async def test_get_status_unauthenticated_works():
    """Read-only tools do NOT require HMAC per V12."""
    from agents.mcp_server import get_openhands_status

    fake_handle = MagicMock()
    fake_handle.describe = AsyncMock(
        return_value=MagicMock(
            status=MagicMock(name="RUNNING"),
            start_time="2026-01-01T00:00:00Z",
        )
    )
    fake_client = MagicMock()
    fake_client.get_workflow_handle = MagicMock(return_value=fake_handle)
    with patch("agents.mcp_server.Client") as mock_client_cls:
        mock_client_cls.connect = AsyncMock(return_value=fake_client)
        result = await get_openhands_status("conv-abc")
    assert "conversation_id" in result
    assert result["conversation_id"] == "conv-abc"

"""W442-T3 pytest for python_mcp_helper bridge daemon."""

import io
import json
from unittest.mock import patch

import pytest


def test_helper_module_imports():
    """The python_mcp_helper module imports without error."""
    import python_mcp_helper  # noqa: F401


def test_main_loop_handles_single_request():
    """Helper reads one JSON-RPC request, dispatches, writes one response."""
    from python_mcp_helper import main_loop

    request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "call_tool",
        "params": {"server": "fake", "name": "noop", "arguments": {}},
    }
    stdin = io.StringIO(json.dumps(request) + "\n")
    stdout = io.StringIO()

    with patch("python_mcp_helper.dispatch_call_tool") as mock_dispatch:
        mock_dispatch.return_value = {"content": [{"type": "text", "text": "ok"}]}
        main_loop(stdin=stdin, stdout=stdout)

    output_lines = stdout.getvalue().strip().split("\n")
    assert len(output_lines) == 1
    resp = json.loads(output_lines[0])
    assert resp["id"] == 1
    assert resp["jsonrpc"] == "2.0"
    assert resp["result"] == {"content": [{"type": "text", "text": "ok"}]}


def test_main_loop_writes_error_on_dispatch_exception():
    """When dispatch raises, helper writes JSON-RPC error response."""
    from python_mcp_helper import main_loop

    request = {
        "jsonrpc": "2.0",
        "id": 2,
        "method": "call_tool",
        "params": {"server": "fake", "name": "broken", "arguments": {}},
    }
    stdin = io.StringIO(json.dumps(request) + "\n")
    stdout = io.StringIO()

    with patch("python_mcp_helper.dispatch_call_tool") as mock_dispatch:
        mock_dispatch.side_effect = RuntimeError("broken-server")
        main_loop(stdin=stdin, stdout=stdout)

    output_lines = stdout.getvalue().strip().split("\n")
    resp = json.loads(output_lines[0])
    assert resp["id"] == 2
    assert "error" in resp
    assert resp["error"]["code"] == -32000
    assert "broken-server" in resp["error"]["message"]


def test_main_loop_exits_on_eof():
    """Empty stdin (EOF) -> main_loop exits cleanly with no output."""
    from python_mcp_helper import main_loop

    stdin = io.StringIO("")
    stdout = io.StringIO()
    main_loop(stdin=stdin, stdout=stdout)
    assert stdout.getvalue() == ""


def test_main_loop_writes_parse_error_for_malformed_json():
    """Invalid JSON -> JSON-RPC parse error (-32700) response."""
    from python_mcp_helper import main_loop

    stdin = io.StringIO("NOT VALID JSON\n")
    stdout = io.StringIO()
    main_loop(stdin=stdin, stdout=stdout)
    output = stdout.getvalue().strip()
    resp = json.loads(output)
    assert resp["error"]["code"] == -32700


def test_main_loop_rejects_unknown_method():
    """Non-call_tool method -> JSON-RPC -32601 Method not found."""
    from python_mcp_helper import main_loop

    request = {"jsonrpc": "2.0", "id": 3, "method": "list_tools", "params": {}}
    stdin = io.StringIO(json.dumps(request) + "\n")
    stdout = io.StringIO()
    main_loop(stdin=stdin, stdout=stdout)
    resp = json.loads(stdout.getvalue().strip())
    assert resp["error"]["code"] == -32601


def test_dispatch_call_tool_unknown_server_raises():
    """Calling a server not in the registry raises a clear error."""
    from python_mcp_helper import dispatch_call_tool

    with pytest.raises(ValueError, match="unknown server"):
        dispatch_call_tool(server="nonexistent", name="x", arguments={})

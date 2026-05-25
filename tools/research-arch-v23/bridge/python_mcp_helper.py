"""tools/research-arch-v23/bridge/python_mcp_helper.py

W442-T3: Python-side MCP bridge daemon. Spawned by Node mcp-client-bridge.mjs.
Reads ndjson JSON-RPC requests from stdin, dispatches to MAF MCPStdioTool
instances for 7 MCP servers (deepwiki + repomix + perplexity + exa +
firecrawl + gpt-researcher; tavily reroutes to gpt-researcher quick_search),
writes responses to stdout. Exits on EOF.

Cite: microsoft/agent-framework v1.6.0 MCPStdioTool (errata E2) +
W442 spec §3 T3 + JSON-RPC 2.0 spec.
"""

import asyncio
import json
import os
import sys
from typing import Any

# Per W442 spec §9b: exact pkg names + transports confirmed at install time.
SERVER_REGISTRY: dict[str, dict[str, Any]] = {
    # deepwiki is HTTP (not stdio) — uses MCPStreamableHTTPTool
    "deepwiki": {
        "transport": "http",
        "url": "https://mcp.deepwiki.com/mcp",
        "env_keys": [],
    },
    # repomix needs --mcp flag per .mcp.json
    "repomix": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "repomix@1.14.0", "--mcp"],
        "env_keys": [],
    },
    # perplexity: correct package is @perplexity-ai/mcp-server (NOT @anthropic/)
    "perplexity": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "@perplexity-ai/mcp-server@0.9.0"],
        "env_keys": ["PERPLEXITY_API_KEY"],
    },
    "exa": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "exa-mcp-server@3.2.1"],
        "env_keys": ["EXA_API_KEY"],
    },
    "firecrawl": {
        "transport": "stdio",
        "command": "npx",
        "args": ["-y", "firecrawl-mcp@3.17.0"],
        "env_keys": ["FIRECRAWL_API_KEY"],
    },
    # tavily: not a standalone MCP server — Tavily is a retriever backend for gpt-researcher.
    # Reroute tavily calls through gpt-researcher MCP's quick_search tool.
    "tavily": {
        "transport": "reroute",
        "reroute_to": "gpt-researcher",
        "reroute_tool": "quick_search",
        "env_keys": ["TAVILY_API_KEY", "OPENAI_API_KEY"],
    },
    # gpt-researcher: stdio MCP server (matches .mcp.json entry)
    "gpt-researcher": {
        "transport": "stdio",
        "command": "uv",
        "args": [
            "run",
            "--with-requirements",
            "Z:/repos/deps/gptr-mcp/requirements.txt",
            "--with",
            "gpt-researcher==0.14.8",
            "--with",
            "fastmcp==3.3.1",
            "python",
            "-m",
            "gpt_researcher.mcp",
        ],
        "env_keys": ["TAVILY_API_KEY", "OPENAI_API_KEY"],
    },
}

_tool_cache: dict[str, Any] = {}


def get_or_init_tool(server: str) -> Any:
    """Lazily instantiate MCPStdioTool/MCPStreamableHTTPTool per transport. Cached."""
    if server in _tool_cache:
        return _tool_cache[server]
    if server not in SERVER_REGISTRY:
        raise ValueError(f"unknown server: {server} (known: {list(SERVER_REGISTRY)})")
    cfg = SERVER_REGISTRY[server]
    transport = cfg.get("transport", "stdio")
    if transport == "unavailable":
        raise RuntimeError(
            f"server {server} unavailable: {cfg.get('reason', 'not configured')}"
        )
    if transport == "reroute":
        # Rerouted servers delegate to their target; init the target instead.
        return get_or_init_tool(cfg["reroute_to"])
    for key in cfg.get("env_keys", []):
        if not os.environ.get(key):
            raise RuntimeError(f"missing required env var {key} for server {server}")
    # Lazy import so tests can run without MAF installed
    if transport == "http":
        from agent_framework import MCPStreamableHTTPTool  # type: ignore

        tool = MCPStreamableHTTPTool(name=server, url=cfg["url"])
    else:
        from agent_framework import MCPStdioTool  # type: ignore

        # Pass full env so MCP servers see API keys (PERPLEXITY_API_KEY etc.)
        tool = MCPStdioTool(
            name=server,
            command=cfg["command"],
            args=cfg.get("args", []),
            env=dict(os.environ),
        )
    _tool_cache[server] = tool
    return tool


async def _async_call_tool(server: str, name: str, arguments: dict) -> Any:
    """Call a tool on an MCP server via MCPStdioTool."""
    tool = get_or_init_tool(server)
    await tool.connect()
    result = await tool.call_tool(name, **arguments)
    return result


def _resolve_reroute(server: str, name: str) -> tuple[str, str]:
    """If server uses 'reroute' transport, return (target_server, target_tool)."""
    if server in SERVER_REGISTRY:
        cfg = SERVER_REGISTRY[server]
        if cfg.get("transport") == "reroute":
            return cfg["reroute_to"], cfg.get("reroute_tool", name)
    return server, name


def dispatch_call_tool(server: str, name: str, arguments: dict) -> dict:
    """Synchronously dispatch a call_tool request.

    Returns JSON-serializable dict. Raises on unknown server or MCP failure.
    Handles 'reroute' transport by delegating to the target server/tool.
    """
    server, name = _resolve_reroute(server, name)
    loop = asyncio.new_event_loop()
    try:
        result = loop.run_until_complete(_async_call_tool(server, name, arguments))
        return _to_jsonable(result)
    finally:
        loop.close()


def _to_jsonable(obj: Any) -> Any:
    """Coerce MAF response to JSON-serializable dict."""
    if hasattr(obj, "model_dump"):
        return obj.model_dump()
    if hasattr(obj, "dict"):
        return obj.dict()
    if isinstance(obj, dict):
        return obj
    if isinstance(obj, list):
        return [_to_jsonable(item) for item in obj]
    if isinstance(obj, str):
        return {"content": [{"type": "text", "text": obj}]}
    return {"content": [{"type": "text", "text": str(obj)}]}


def main_loop(stdin: Any = None, stdout: Any = None) -> None:
    """ndjson JSON-RPC server loop. Reads stdin, writes responses to stdout."""
    stdin = stdin or sys.stdin
    stdout = stdout or sys.stdout
    for line in stdin:
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError as e:
            resp = {
                "jsonrpc": "2.0",
                "id": None,
                "error": {"code": -32700, "message": f"Parse error: {e}"},
            }
            stdout.write(json.dumps(resp) + "\n")
            stdout.flush()
            continue
        req_id = req.get("id")
        method = req.get("method")
        params = req.get("params", {})
        if method != "call_tool":
            resp = {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32601, "message": f"Method not found: {method}"},
            }
            stdout.write(json.dumps(resp) + "\n")
            stdout.flush()
            continue
        try:
            result = dispatch_call_tool(
                server=params["server"],
                name=params["name"],
                arguments=params.get("arguments", {}),
            )
            resp = {"jsonrpc": "2.0", "id": req_id, "result": result}
        except Exception as e:
            resp = {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {
                    "code": -32000,
                    "message": str(e),
                    "data": {"type": type(e).__name__},
                },
            }
        stdout.write(json.dumps(resp) + "\n")
        stdout.flush()


def shutdown_tools() -> None:
    """Close all cached MCPStdioTool sessions cleanly."""
    for server, tool in list(_tool_cache.items()):
        try:
            if hasattr(tool, "close"):
                loop = asyncio.new_event_loop()
                try:
                    loop.run_until_complete(tool.close())
                finally:
                    loop.close()
        except Exception as e:
            print(
                f"[python_mcp_helper] cleanup error for {server}: {e}", file=sys.stderr
            )
    _tool_cache.clear()


if __name__ == "__main__":
    try:
        main_loop()
    finally:
        shutdown_tools()

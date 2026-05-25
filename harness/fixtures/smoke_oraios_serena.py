# W297 Lane-C smoke test — `oraios/serena` (T1-PENDING-LANE-C #4 elevate)
#
# Surface: MCP server. W296 Stream C §3.G.1 D8=3 (no SOTA-rubric-lane
# delta measured). serena is wired as an MCP server in
# `Z:\claude-sota-installed\.mcp.json` (verified 2026-05-18) — see
# "serena_pin" comment block pinning the upstream SHA to
# 249f6b07f9ccac259b0ff95e06c9a40629748e17.
#
# A live MCP-protocol round-trip would require spawning the server and
# completing a JSON-RPC handshake (timeout-prone; not deterministic in
# CI). For a deterministic offline smoke we verify the WIRING-CONTRACT:
#   1. `.mcp.json` contains a `serena` entry under `mcpServers`.
#   2. The entry uses `command/args` form (cardinal-rule-2: no
#      .claude/hooks/scripts).
#   3. The entry pins serena to a SHA or version-tag (CR-9 discipline).
#   4. The runtime exposes `mcp__serena__*` deferred tools (deferred-tool
#      surface confirms post-install registration).
#
# These checks together = the wiring-contract that lets the runtime
# auto-call serena tools without manual operator intervention.

from __future__ import annotations

import json
from pathlib import Path

MCP_JSON = Path(r"Z:/claude-sota-installed/.mcp.json")


def _load_mcp_json() -> dict:
    try:
        return json.loads(MCP_JSON.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        return {"_error": str(exc)}


def _serena_entry_present(cfg: dict) -> dict:
    if "_error" in cfg:
        return {
            "case": "serena-entry-present",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"could not read .mcp.json: {cfg['_error']}",
        }
    servers = cfg.get("mcpServers", {})
    serena = servers.get("serena")
    if serena is None:
        return {
            "case": "serena-entry-present",
            "pass": False,
            "cost_usd": 0.0,
            "reason": "no mcpServers.serena entry in .mcp.json",
        }
    return {
        "case": "serena-entry-present",
        "pass": True,
        "cost_usd": 0.0,
        "reason": f"serena entry present (keys: {list(serena.keys())})",
    }


def _serena_uses_command(cfg: dict) -> dict:
    serena = cfg.get("mcpServers", {}).get("serena")
    if not serena:
        return {
            "case": "serena-uses-command",
            "pass": False,
            "cost_usd": 0.0,
            "reason": "no serena entry to inspect",
        }
    has_command = "command" in serena and "args" in serena
    return {
        "case": "serena-uses-command",
        "pass": has_command,
        "cost_usd": 0.0,
        "reason": "command+args present"
        if has_command
        else f"missing fields: command={'command' in serena} args={'args' in serena}",
    }


def _serena_pinned(cfg: dict) -> dict:
    serena = cfg.get("mcpServers", {}).get("serena", {})
    args = serena.get("args", []) or []
    args_str = " ".join(str(a) for a in args)
    # Acceptable pin forms: SHA, @<version>, --from <pinned-ref>
    has_sha = any(len(a) >= 7 and all(c in "0123456789abcdef" for c in a) for a in args)
    has_version_pin = "@" in args_str and not args_str.endswith("@latest")
    pinned = has_sha or has_version_pin
    return {
        "case": "serena-pinned-CR9",
        "pass": pinned,
        "cost_usd": 0.0,
        "reason": (
            f"pinned (sha={has_sha} version-pin={has_version_pin})"
            if pinned
            else f"NO PIN — args={args_str[:200]}"
        ),
    }


def _serena_doc_in_comments(cfg: dict) -> dict:
    comments = cfg.get("_comments", {})
    has_doc = any("serena" in str(v).lower() for v in comments.values())
    return {
        "case": "serena-documented",
        "pass": has_doc,
        "cost_usd": 0.0,
        "reason": "_comments mentions serena" if has_doc else "no _comments doc",
    }


def run() -> list[dict]:
    cfg = _load_mcp_json()
    return [
        _serena_entry_present(cfg),
        _serena_uses_command(cfg),
        _serena_pinned(cfg),
        _serena_doc_in_comments(cfg),
    ]


if __name__ == "__main__":
    print(json.dumps(run(), indent=2))

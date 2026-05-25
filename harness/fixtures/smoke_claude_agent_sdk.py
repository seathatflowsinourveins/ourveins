# W297 Lane-C smoke test — `anthropics/claude-agent-sdk-python` (T1-PENDING-LANE-C #1)
#
# Surface: Python SDK (in-process). Benchmarkable claim from W296 Stream C §3.B.2:
#   D8=3 ("no SOTA-rubric-lane numbers; parity-by-default per SKILL §4.5").
# This smoke verifies the SDK's IMPORT + STRUCTURAL CONTRACT — the public surface
# that this runtime's eval_harness already consumes (aggregate_via_sdk
# uses ClaudeAgentOptions / query / AssistantMessage / ResultMessage /
# TextBlock / ToolUseBlock / tool / create_sdk_mcp_server). NO network
# calls are made (would require ANTHROPIC_API_KEY + budget); structural
# parity-by-default = pass if the canonical exports survive an import +
# the create_sdk_mcp_server constructor runs offline.
#
# Per W296 §3.B.2: "parity-by-default per SKILL §4.5" means a no-network
# structural pass IS the contract for org-canonical SDKs that have no
# external benchmark surface yet.

from __future__ import annotations


def _try_import(label: str, names: list[str]) -> dict:
    try:
        import claude_agent_sdk  # noqa: F401

        missing = [n for n in names if not hasattr(__import__("claude_agent_sdk"), n)]
        if missing:
            return {
                "case": label,
                "pass": False,
                "cost_usd": 0.0,
                "reason": f"missing exports: {missing}",
            }
        return {
            "case": label,
            "pass": True,
            "cost_usd": 0.0,
            "reason": f"all {len(names)} exports present",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": label,
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"import error: {exc}",
        }


def _try_options() -> dict:
    try:
        from claude_agent_sdk import ClaudeAgentOptions

        opts = ClaudeAgentOptions(
            allowed_tools=[],
            system_prompt="smoke",
            max_turns=1,
            permission_mode="bypassPermissions",
        )
        ok = opts.max_turns == 1 and opts.permission_mode == "bypassPermissions"
        return {
            "case": "options-construct",
            "pass": ok,
            "cost_usd": 0.0,
            "reason": "" if ok else f"options not as expected: {opts!r}",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "options-construct",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"options error: {exc}",
        }


def _try_mcp_server() -> dict:
    try:
        from claude_agent_sdk import create_sdk_mcp_server, tool

        @tool("smoke_tool", "A no-op tool", {"x": str})
        async def smoke_tool(args: dict) -> dict:
            return {"content": [{"type": "text", "text": str(args.get("x"))}]}

        server = create_sdk_mcp_server(
            name="smoke", version="1.0.0", tools=[smoke_tool]
        )
        ok = server is not None
        return {
            "case": "mcp-server-create",
            "pass": ok,
            "cost_usd": 0.0,
            "reason": "" if ok else "create_sdk_mcp_server returned None",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "mcp-server-create",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"mcp server error: {exc}",
        }


def _try_message_types() -> dict:
    try:
        from claude_agent_sdk import (
            AssistantMessage,
            ResultMessage,
            TextBlock,
            ToolUseBlock,
        )

        names = [
            c.__name__
            for c in (AssistantMessage, ResultMessage, TextBlock, ToolUseBlock)
        ]
        ok = len(names) == 4
        return {
            "case": "message-types",
            "pass": ok,
            "cost_usd": 0.0,
            "reason": f"loaded: {names}",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "message-types",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"message-types import error: {exc}",
        }


def run() -> list[dict]:
    rows: list[dict] = []
    rows.append(
        _try_import(
            "core-imports",
            [
                "query",
                "tool",
                "create_sdk_mcp_server",
                "ClaudeAgentOptions",
                "AssistantMessage",
                "ResultMessage",
                "TextBlock",
                "ToolUseBlock",
            ],
        )
    )
    rows.append(_try_options())
    rows.append(_try_mcp_server())
    rows.append(_try_message_types())
    return rows


if __name__ == "__main__":
    import json

    print(json.dumps(run(), indent=2))

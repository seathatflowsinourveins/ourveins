# agents/mcp_server.py
"""W375 FastMCP openhands-dispatch server — HMAC-gated two-phase mutating tools + read-only status.

Cite: spec §6 v6 + V12 (FastMCP stdio bypasses AuthMiddleware → HMAC two-phase) + r6 atomic single-use.

stdout = JSON-RPC channel (NEVER print). stderr → .claude/debug. PYTHONUNBUFFERED=1.
"""

from __future__ import annotations

import logging
import os
import sys

import structlog
from fastmcp import FastMCP
from temporalio.client import Client

from agents.hmac_gate import make_preview, verify_confirm
from agents.models import Budget, TaskSpec

# stderr-only structured logging (V12 — stdout is reserved for JSON-RPC)
logging.basicConfig(
    level=logging.INFO,
    stream=sys.stderr,
    format="%(asctime)s %(levelname)s %(name)s %(message)s",
)
log = structlog.get_logger("openhands-dispatch")

mcp = FastMCP("openhands-dispatch")


def _temporal_address() -> str:
    return os.environ.get("TEMPORAL_ADDRESS", "localhost:7233")


# ============================================================
# Dispatch (mutating — HMAC two-phase)
# ============================================================


@mcp.tool
async def dispatch_openhands_task_preview(
    task: str,
    repo: str | None = None,
    profile: str = "t1-light",
    iterations: int = 50,
    timeout_seconds: int = 1800,
) -> dict:
    """Phase 1 — preview a dispatch; returns task_hash for HMAC confirmation. Does NOT start work."""
    spec = TaskSpec(
        task=task,
        repo=repo,
        codex_profile=profile,
        budget=Budget(iterations=iterations, timeout_seconds=timeout_seconds),
    )
    preview = make_preview(spec.model_dump_json())
    return {
        **preview,
        "spec_preview": spec.model_dump(),
        "next": (
            "Compute hmac_token = hmac_sha256(OPENHANDS_DISPATCH_TOKEN, task_hash + nonce).hex() "
            "and call dispatch_openhands_task_confirm(task_hash, hmac_token)."
        ),
    }


@mcp.tool
async def dispatch_openhands_task_confirm(
    task_hash: str,
    hmac_token: str,
    await_result: bool = False,
) -> dict:
    """Phase 2 — HMAC-verified dispatch. Single-use (atomic pop)."""
    spec_dump = verify_confirm(task_hash, hmac_token)
    if spec_dump is None:
        return {
            "error": "PREVIEW_INVALID_OR_EXPIRED_OR_USED_OR_BAD_HMAC",
            "task_hash": task_hash,
        }
    spec = TaskSpec.model_validate_json(spec_dump)
    client = await Client.connect(_temporal_address())
    handle = await client.start_workflow(
        "TaskWorkflow",
        spec,
        id=spec.conversation_id,
        task_queue="openhands-dispatch",
    )
    log.info("dispatch_confirmed", conv_id=spec.conversation_id)
    if await_result:
        result = await handle.result()
        return result.model_dump() if hasattr(result, "model_dump") else dict(result)
    return {"conversation_id": spec.conversation_id, "status": "STARTED"}


# ============================================================
# Cancel (mutating — HMAC two-phase)
# ============================================================


@mcp.tool
async def cancel_openhands_task_preview(conversation_id: str) -> dict:
    """Phase 1 — preview a cancel op."""
    op_payload = f"cancel:{conversation_id}"
    preview = make_preview(op_payload)
    return {**preview, "op": "cancel", "conversation_id": conversation_id}


@mcp.tool
async def cancel_openhands_task_confirm(task_hash: str, hmac_token: str) -> dict:
    """Phase 2 — HMAC-verified cancel."""
    payload = verify_confirm(task_hash, hmac_token)
    if payload is None:
        return {
            "error": "PREVIEW_INVALID_OR_EXPIRED_OR_USED_OR_BAD_HMAC",
            "task_hash": task_hash,
        }
    if not payload.startswith("cancel:"):
        return {"error": "OP_MISMATCH", "expected": "cancel"}
    conv_id = payload.split(":", 1)[1]
    client = await Client.connect(_temporal_address())
    handle = client.get_workflow_handle(conv_id)
    await handle.cancel()
    log.info("cancel_dispatched", conv_id=conv_id)
    return {"conversation_id": conv_id, "status": "CANCEL_DISPATCHED"}


# ============================================================
# Read-only status (no auth gate — read-only per V12)
# ============================================================


@mcp.tool
async def get_openhands_status(conversation_id: str) -> dict:
    """Read-only — workflow status."""
    client = await Client.connect(_temporal_address())
    handle = client.get_workflow_handle(conversation_id)
    desc = await handle.describe()
    return {
        "conversation_id": conversation_id,
        "status": getattr(desc.status, "name", str(desc.status)),
        "start_time": str(getattr(desc, "start_time", "")),
    }


@mcp.tool
async def list_openhands_tasks(limit: int = 20) -> dict:
    """Read-only — list recent workflows by WorkflowType."""
    client = await Client.connect(_temporal_address())
    workflows = []
    async for wf in client.list_workflows(
        query="WorkflowType='TaskWorkflow'", page_size=limit
    ):
        workflows.append(
            {
                "conversation_id": getattr(wf, "id", "?"),
                "status": (
                    getattr(wf.status, "name", str(wf.status))
                    if hasattr(wf, "status")
                    else "?"
                ),
            }
        )
    return {"count": len(workflows), "workflows": workflows}


@mcp.tool
async def openhands_quota_status() -> dict:
    """Read-only — JuryQuotaLedger state (placeholder; P3.5 wires SQLite)."""
    return {
        "max_per_5h": int(os.environ.get("W375_JURY_QUOTA_5H", 10)),
        "used_current_window": 0,
        "note": "JuryQuotaLedger SQLite-backed in P3.5",
    }


# ============================================================
# Entrypoint (stdio)
# ============================================================

if __name__ == "__main__":
    # PYTHONUNBUFFERED=1 must be set by .mcp.json env (V12)
    mcp.run()  # stdio default

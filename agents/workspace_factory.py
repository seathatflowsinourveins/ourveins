"""W376 Workspace factory — dispatches LocalWorkspace OR RemoteWorkspace based on
TaskSpec.workspace_mode.

Cite: openhands-sdk@1.22.1 openhands/sdk/workspace/workspace.py:12-29
(Workspace factory class — single entry-point for both modes).
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from openhands.sdk.workspace.base import BaseWorkspace

    from agents.models import TaskSpec


@dataclass
class ContainerContext:
    """Captured state after agent_server_spawn for RemoteWorkspace connection."""

    container_id: str
    port: int
    session_api_key: str


async def build_workspace_for(
    spec: "TaskSpec",
    container_ctx: ContainerContext | None,
) -> "BaseWorkspace":
    """Return configured Workspace per spec.workspace_mode.

    Args:
        spec: TaskSpec carrying workspace_mode + conversation_id.
        container_ctx: Required for 'remote' mode (from agent_server_spawn).
                       Must be None for 'local' mode.

    Returns:
        LocalWorkspace if mode='local'; RemoteWorkspace if mode='remote'.

    Cite: openhands-sdk@1.22.1 openhands/sdk/workspace/workspace.py:12-29.
    """
    # mode == "remote" — codex r1 A5 BLOCKER FIX: raise ValueError NOT assert.
    # Production code MUST NOT depend on assertions; python -O optimizes them away.
    # Check the precondition BEFORE the deferred SDK import so the "caller forgot to
    # spawn" bug surfaces as a clean ValueError even when the SDK is unavailable
    # (the precondition is import-independent — it only inspects container_ctx).
    if spec.workspace_mode == "remote" and container_ctx is None:
        raise ValueError(
            "W376 A5 fix: remote workspace_mode requires container_ctx from "
            "agent_server_spawn. Got None. Caller MUST spawn before invoking factory."
        )

    from openhands.sdk import Workspace  # deferred import (sandbox-safe)

    if spec.workspace_mode == "local":
        return Workspace(working_dir=f"workspace/{spec.conversation_id}")

    return Workspace(
        host=f"http://127.0.0.1:{container_ctx.port}",  # codex r1 S5: 127.0.0.1 bind
        working_dir=f"workspace/{spec.conversation_id}",
        api_key=container_ctx.session_api_key,
    )

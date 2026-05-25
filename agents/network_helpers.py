# agents/network_helpers.py
"""Per-task Docker user-defined network helpers (codex r5/r6 P0-1: explicit conversation_id signature)."""

import subprocess
import time


def _ensure_network(net_name: str, conversation_id: str) -> None:
    """Idempotent: create per-task user-defined Docker network if absent."""
    inspect = subprocess.run(
        ["docker", "network", "inspect", net_name],
        capture_output=True,
        check=False,
        timeout=5,
    )
    if inspect.returncode == 0:
        return  # already exists
    subprocess.run(
        [
            "docker",
            "network",
            "create",
            # W376 P0-1 (codex GPT-5.5 ship-gate): the per-task net is the network the
            # agent container lives on. It MUST be --internal so the agent has NO direct
            # WAN route and cannot bypass the Squid HTTP_PROXY (egress allowlist). The
            # egress sidecar dual-homes onto this internal net + a separate external net
            # (egress_sidecar.py), so allowlisted traffic still egresses via the proxy
            # while direct agent->WAN is denied (fail-CLOSED). Harmless in local
            # workspace_mode since no container attaches to this net there.
            "--internal",
            "--label",
            f"w375.conversation_id={conversation_id}",
            "--label",
            "w375.purpose=per-task-isolation",
            "--label",
            f"w375.created_at={int(time.time())}",
            net_name,
        ],
        check=True,
        capture_output=True,
        timeout=10,
    )


def _remove_network(net_name: str) -> None:
    """Best-effort: remove per-task network. Does not raise on missing network."""
    subprocess.run(
        ["docker", "network", "rm", net_name],
        capture_output=True,
        check=False,
        timeout=5,
    )

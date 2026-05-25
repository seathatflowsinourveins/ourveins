# agents/health_probes.py — codex r5 D5-O4 fix.
"""Concrete probe implementations used by `tools/dispatch_temporal.py:doctor` and
patched in `tests/test_doctor_remote_coverage.py`. Each probe returns (ok: bool,
detail: str | None) for uniform reporting.

codex r5 D5-O4: prior Task 22 plan listed `tests/test_doctor_remote_coverage.py` and
patched `agents.health_probes.probe_*` symbols, but never created the module. doctor
would fail to import; tests would patch a nonexistent path. This module makes the test
suite runnable end-to-end.
"""

from __future__ import annotations

import os
import socket
import urllib.request
from typing import Tuple


def probe_temporal(host: str = "127.0.0.1", port: int = 7233) -> Tuple[bool, str]:
    """TCP-probe Temporal frontend. Returns (ok, detail)."""
    try:
        with socket.create_connection((host, port), timeout=2.0):
            return True, "ok"
    except OSError as e:
        return False, f"{type(e).__name__}: {e}"


def probe_data_converter_wired() -> bool:
    """Verify pydantic_data_converter is wired at known sites (import probe).

    The worker entrypoint imports/uses the pydantic data converter; presence of the
    helper symbol is a cheap proxy for the wiring being in place. Returns False (rather
    than raising) so doctor can report RED instead of crashing.
    """
    try:
        from agents.temporal_worker import (  # noqa: F401
            _run_worker_via_data_converter,
        )

        return True
    except Exception:
        return False


def probe_oauth_acl_owner_only(path: str | None = None) -> bool:
    """On Windows: icacls reports only owner ACE; on POSIX: stat mode 0o600."""
    p = path or os.environ.get("OPENHANDS_OAUTH_FILE", "")
    if not p or not os.path.exists(p):
        return False
    if os.name == "nt":
        import subprocess

        try:
            out = subprocess.check_output(
                ["icacls", p], stderr=subprocess.STDOUT, timeout=5
            ).decode("utf-8", "replace")
            # Owner-only ACL contains exactly one principal line (current user).
            ace_lines = [
                line for line in out.splitlines() if ":" in line and "(" in line
            ]
            return len(ace_lines) == 1
        except Exception:
            return False
    return (os.stat(p).st_mode & 0o077) == 0


def probe_langfuse_health(url: str | None = None) -> Tuple[bool, str]:
    """HTTP GET Langfuse /api/public/health."""
    base = url or os.environ.get("LANGFUSE_HOST", "http://127.0.0.1:3000")
    try:
        with urllib.request.urlopen(f"{base}/api/public/health", timeout=3) as r:
            return r.status == 200, f"http_{r.status}"
    except Exception as e:
        return False, f"{type(e).__name__}: {e}"


def probe_otlp_endpoint(url: str | None = None) -> Tuple[bool, str]:
    """TCP-probe OTLP collector endpoint (gRPC default :4317 / HTTP :4318)."""
    target = url or os.environ.get(
        "OTEL_EXPORTER_OTLP_ENDPOINT", "http://127.0.0.1:4318"
    )
    try:
        from urllib.parse import urlparse

        u = urlparse(target)
        host = u.hostname or "127.0.0.1"
        port = u.port or (4317 if u.scheme == "grpc" else 4318)
        with socket.create_connection((host, port), timeout=2.0):
            return True, "ok"
    except Exception as e:
        return False, f"{type(e).__name__}: {e}"


def probe_image_digest_pin() -> Tuple[bool, str]:
    """Verify OH_AGENT_SERVER_IMAGE env is set to a SHA-pinned tag (codex r1 S5).

    codex r6 D5-r6-P0-2 fix: renamed from `probe_image_pinned` to `probe_image_digest_pin` to
    match the doctor test patch target at `tests/test_doctor_remote_coverage.py` — prior name
    mismatch caused `patch("agents.health_probes.probe_image_digest_pin", ...)` to AttributeError,
    masking real digest-drift detection failures behind a test-import error.
    """
    img = os.environ.get("OH_AGENT_SERVER_IMAGE", "")
    if "@sha256:" in img:
        return True, img
    return False, f"image not SHA-pinned: {img!r}"


def probe_spool_writable(path: str | None = None) -> Tuple[bool, str]:
    """Verify OTel spool directory exists + is writable."""
    p = path or os.environ.get("OH_OTEL_SPOOL_DIR", "")
    if not p or not os.path.isdir(p):
        return False, f"spool dir missing: {p!r}"
    return os.access(p, os.W_OK), p


async def probe_reconcile_orphans() -> tuple[int, int, int] | None:
    """codex r6 D5-r6-P0-2 + r7 D5-r7-P0-1 + r8 D5-r8-P0-1+P0-2 fix: probe orphaned W376-labeled
    docker resources + stale idempotency rows BY JOINING against the Temporal live set.

    codex r8 D5-r8-P0-1 fix (label namespace alignment): containers/networks are stamped with
    `w375.purpose=per-task-isolation` + `w375.conversation_id=<id>` per spec §5.2 / plan Task 9
    `agent_server_spawn.py:941-944`. PRIOR v9 BUG: probe filtered by `managed-by=w376` (wrong
    namespace) and read unprefixed `conversation_id` (wrong key) — would NEVER match real
    spawn labels. Probe now uses the actual `w375.*` namespace.

    Also: the admission coordinator deliberately makes workflow_id INDEPENDENT of conversation_id
    (op_id excludes conversation_id per spec §6.11 + plan:2846-2881), so live-set join must
    compare against BOTH live workflow_ids AND live conversation_ids extracted from Temporal
    search-attributes — not just workflow IDs.

    codex r8 D5-r8-P0-2 fix (fail closed on Temporal outage): PRIOR v9 BUG: swallowed Temporal
    list failure and joined against empty set → ALL labeled resources classified as orphans →
    catastrophic if reused by destructive reconcile. Probe now returns None to signal "unable
    to determine"; doctor reports YELLOW + disables destructive reconcile.

    Returns (orphan_containers, orphan_networks, orphan_idempotency_rows) when clean / determinable;
    returns None when Temporal listing failed (fail closed — DO NOT use for destructive reconcile).
    """
    import sqlite3
    from datetime import datetime, timedelta, timezone

    import docker
    from temporalio.client import Client
    from temporalio.contrib.pydantic import pydantic_data_converter

    db_path = os.environ.get("OH_ADMISSION_DB", "")
    cutoff = (datetime.now(timezone.utc) - timedelta(minutes=5)).isoformat()

    # codex r8 D5-r8-P0-2: build live-workflow + live-conversation sets via Temporal — FAIL CLOSED
    # if listing errors out (return None signals "unable to determine"; destructive reconcile
    # MUST refuse to act on this until next probe succeeds).
    live_workflow_ids: set[str] = set()
    live_conversation_ids: set[str] = set()
    try:
        client = await Client.connect(
            os.environ.get("TEMPORAL_HOST", "127.0.0.1:7233"),
            data_converter=pydantic_data_converter,
        )
        async for wf in client.list_workflows(
            query='ExecutionStatus="Running" OR ExecutionStatus="ContinuedAsNew"'
        ):
            live_workflow_ids.add(wf.id)
            # codex r8 D5-r8-P0-1: extract conversation_id from search-attribute (set at
            # workflow start per plan TaskWorkflow.run() upsert).
            sa = wf.search_attributes or {}
            conv_id = (
                sa.get("ConversationId", [None])[0]
                if isinstance(sa.get("ConversationId"), list)
                else sa.get("ConversationId")
            )
            if conv_id:
                live_conversation_ids.add(str(conv_id))
    except Exception:
        # codex r8 D5-r8-P0-2: fail closed — return None instead of swallowing.
        return None

    orphan_containers = 0
    orphan_networks = 0
    orphan_idempotency_rows = 0

    def _is_live(labels: dict) -> bool:
        """codex r8 D5-r8-P0-1: match by EITHER live workflow_id OR live conversation_id since
        op_id and conversation_id are independent (spec §6.11)."""
        wf_id = labels.get("w375.workflow_id") or labels.get("workflow_id")
        conv_id = labels.get("w375.conversation_id") or labels.get("conversation_id")
        return (wf_id in live_workflow_ids) or (conv_id in live_conversation_ids)

    try:
        dclient = docker.from_env()
        # codex r8 D5-r8-P0-1: filter by actual spawn label namespace from plan:941-944
        # `w375.purpose=per-task-isolation` — NOT the `managed-by=w376` placeholder.
        for c in dclient.containers.list(
            all=True, filters={"label": "w375.purpose=per-task-isolation"}
        ):
            if not _is_live(c.labels or {}):
                orphan_containers += 1
        for net in dclient.networks.list(
            filters={"label": "w375.purpose=per-task-isolation"}
        ):
            if not _is_live((net.attrs or {}).get("Labels") or {}):
                orphan_networks += 1
    except Exception:
        pass  # docker unavailable → caller probes docker separately

    if db_path and os.path.exists(db_path):
        try:
            with sqlite3.connect(db_path) as conn:
                cur = conn.execute(
                    "SELECT workflow_id FROM idempotency_rows "
                    "WHERE status IN ('PENDING_START','RUNNING','UNKNOWN') "
                    "AND last_check_at < ?",
                    (cutoff,),
                )
                for (wf_id,) in cur.fetchall():
                    if wf_id not in live_workflow_ids:
                        orphan_idempotency_rows += 1
        except Exception:
            pass

    return orphan_containers, orphan_networks, orphan_idempotency_rows

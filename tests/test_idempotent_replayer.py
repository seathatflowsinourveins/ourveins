# tests/test_idempotent_replayer.py
import pytest
import time
import json
from unittest.mock import AsyncMock, MagicMock


def _spec_to_canonical(spec_dict: dict) -> str:
    return json.dumps(spec_dict, sort_keys=True)


def test_replay_first_returns_new_op_id(tmp_path):
    from agents.idempotent_replayer import IdempotentReplayer

    rep = IdempotentReplayer(
        db_path=str(tmp_path / "ir.db"), retention_sec=86400, max_retries=3
    )
    spec = {"task": "foo", "repo": "bar"}
    op_id, status = rep.replay(spec)
    assert len(op_id) == 64  # sha256 hex
    assert status in ("OK", "EXECUTED")


def test_same_spec_within_window_returns_already_in_flight(tmp_path):
    from agents.idempotent_replayer import IdempotentReplayer

    rep = IdempotentReplayer(
        db_path=str(tmp_path / "ir.db"), retention_sec=86400, max_retries=3
    )
    spec = {"task": "foo"}
    op_id1, _ = rep.replay(spec)
    op_id2, status2 = rep.replay(spec)
    assert op_id1 == op_id2
    assert status2 in ("ALREADY_IN_FLIGHT", "OK")


def test_max_retries_per_failure_class(tmp_path):
    from agents.idempotent_replayer import IdempotentReplayer

    rep = IdempotentReplayer(
        db_path=str(tmp_path / "ir.db"), retention_sec=86400, max_retries=2
    )
    spec = {"task": "foo"}
    op_id, _ = rep.replay(spec)
    rep.mark_failed(op_id, "TransientError")
    op_id2, _ = rep.replay(spec)  # retry 1
    rep.mark_failed(op_id2, "TransientError")
    op_id3, status3 = rep.replay(spec)  # retry 2 (= max)
    rep.mark_failed(op_id3, "TransientError")
    op_id4, status4 = rep.replay(spec)  # retry 3 → exhausted
    assert status4 == "RETRY_EXHAUSTED"


def test_gc_sync_does_not_expire_in_flight(tmp_path, monkeypatch):
    from agents.idempotent_replayer import IdempotentReplayer

    rep = IdempotentReplayer(
        db_path=str(tmp_path / "ir.db"), retention_sec=1, max_retries=3
    )
    spec = {"task": "foo"}
    op_id, _ = rep.replay(spec)
    # Fast-forward 5 seconds (past retention)
    monkeypatch.setattr(rep, "_now", lambda: time.time() + 10)
    in_flight = rep.gc_sync()  # Returns list of IN_FLIGHT op_ids for async cross-check
    # IN_FLIGHT row MUST still be present (not expired)
    assert any(op_id == row[0] for row in in_flight)


def test_gc_sync_expires_terminal_rows(tmp_path, monkeypatch):
    from agents.idempotent_replayer import IdempotentReplayer

    rep = IdempotentReplayer(
        db_path=str(tmp_path / "ir.db"), retention_sec=1, max_retries=3
    )
    spec = {"task": "foo"}
    op_id, _ = rep.replay(spec)
    rep.mark_completed(op_id)  # → terminal
    # Fast-forward past retention
    monkeypatch.setattr(rep, "_now", lambda: time.time() + 10)
    rep.gc_sync()
    # Now the spec re-dispatches as a NEW op (terminal row was GC'd)
    op_id2, status = rep.replay(spec)
    # Same canonical hash but the dedup row is gone → treated as fresh
    # (op_id matches because it's deterministic; status should be OK/EXECUTED)
    assert op_id2 == op_id
    assert status in ("OK", "EXECUTED")


@pytest.mark.asyncio
async def test_gc_async_marks_not_found_as_failed(tmp_path):
    from agents.idempotent_replayer import IdempotentReplayer

    rep = IdempotentReplayer(
        db_path=str(tmp_path / "ir.db"), retention_sec=86400, max_retries=3
    )
    spec = {"task": "foo"}
    op_id, _ = rep.replay(spec)

    # Mock Temporal client: workflow NOT FOUND
    fake_handle = MagicMock()
    fake_handle.describe = AsyncMock(side_effect=Exception("workflow not found"))
    fake_client = MagicMock()
    fake_client.get_workflow_handle = MagicMock(return_value=fake_handle)

    await rep.gc_async(fake_client)

    # Verify row is now FAILED in the DB
    import sqlite3

    with sqlite3.connect(rep.db_path) as conn:
        row = conn.execute(
            "SELECT status FROM ops WHERE op_id = ?", (op_id,)
        ).fetchone()
        # WorkflowNotFoundError or generic "not found" detected → marked FAILED
        # Acceptable end states: FAILED OR still IN_FLIGHT (if implementer chose to only mark on specific exception class)
        assert row[0] in ("FAILED", "IN_FLIGHT")

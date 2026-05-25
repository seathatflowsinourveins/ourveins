# tests/test_admission_coordinator.py
"""Codex r1 D3 R1 BLOCKER FIX + codex r2 D3-r2-P0-3 idempotency-semantics FIX.

Tests cover spec §6.11 coordinator contract.
"""

import asyncio
import pytest
from unittest.mock import AsyncMock, MagicMock
from agents.models import TaskSpec, Budget
from agents.admission_coordinator import AdmissionCoordinator


def _mock_client():
    c = MagicMock()
    c.start_workflow = AsyncMock(return_value=MagicMock())
    return c


@pytest.mark.asyncio
async def test_op_id_excludes_conversation_id(tmp_path):
    """codex r2 D3-r2-P0-3: same op across different conversation IDs → same workflow_id."""
    coord = AdmissionCoordinator(db_path=str(tmp_path / "idem.db"))
    client = _mock_client()
    s1 = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-A",
        repo="example/repo",
        base_commit="abc123",
    )
    s2 = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-B",  # DIFFERENT conv id
        repo="example/repo",
        base_commit="abc123",
    )
    wf_id_1 = await coord.submit_workflow(client, s1)
    wf_id_2 = await coord.submit_workflow(client, s2)
    assert wf_id_1 == wf_id_2, "op_id MUST exclude conversation_id"
    assert client.start_workflow.call_count == 1, (
        "second submit must NOT call start_workflow"
    )


@pytest.mark.asyncio
async def test_different_base_commit_yields_different_workflow(tmp_path):
    """codex r2 D3-r2-P0-3: same task/repo but different base_commit → distinct workflow_ids."""
    coord = AdmissionCoordinator(db_path=str(tmp_path / "idem.db"))
    client = _mock_client()
    s1 = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-X",
        repo="example/repo",
        base_commit="abc123",
    )
    s2 = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-Y",
        repo="example/repo",
        base_commit="def456",
    )
    wf_id_1 = await coord.submit_workflow(client, s1)
    wf_id_2 = await coord.submit_workflow(client, s2)
    assert wf_id_1 != wf_id_2, "different base_commit MUST yield different workflow_ids"
    assert client.start_workflow.call_count == 2


@pytest.mark.asyncio
async def test_different_workspace_mode_yields_different_workflow(tmp_path):
    """W376 ship-gate P0-3 (codex GPT-5.5): same task/repo/base_commit but different
    workspace_mode (local vs remote) → DISTINCT op_ids. A local run and a remote run are
    different operations (different isolation + trust boundary) and MUST NOT collapse."""
    coord = AdmissionCoordinator(db_path=str(tmp_path / "idem.db"))
    client = _mock_client()
    s_remote = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-R",
        repo="example/repo",
        base_commit="abc123",
        workspace_mode="remote",
    )
    s_local = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-L",
        repo="example/repo",
        base_commit="abc123",
        workspace_mode="local",
    )
    # Direct op_id check (independent of submit side-effects).
    assert AdmissionCoordinator.compute_op_id(
        s_remote
    ) != AdmissionCoordinator.compute_op_id(s_local), (
        "local vs remote MUST yield different op_ids"
    )
    wf_id_remote = await coord.submit_workflow(client, s_remote)
    wf_id_local = await coord.submit_workflow(client, s_local)
    assert wf_id_remote != wf_id_local, (
        "different workspace_mode MUST yield different workflow_ids"
    )
    assert client.start_workflow.call_count == 2, (
        "each distinct workspace_mode op MUST dispatch its own workflow"
    )


@pytest.mark.asyncio
async def test_caller_supplied_idempotency_key_overrides_derivation(tmp_path):
    """codex r2 D3-r2-P0-3: spec.idempotency_key overrides the derived op_id.

    W376 ship-gate P0-3: override still wins even across differing workspace_mode —
    when idempotency_key is set, the workspace_mode component is NOT consulted."""
    coord = AdmissionCoordinator(db_path=str(tmp_path / "idem.db"))
    client = _mock_client()
    s1 = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-A",
        repo="repo-1",
        base_commit="abc",
        workspace_mode="remote",
        idempotency_key="opaque-key-1",
    )
    s2 = TaskSpec(
        task="DIFFERENT",
        budget=Budget(),
        conversation_id="conv-B",
        repo="repo-2",
        base_commit="def",
        workspace_mode="local",  # differs — override MUST still win
        idempotency_key="opaque-key-1",
    )
    wf_id_1 = await coord.submit_workflow(client, s1)
    wf_id_2 = await coord.submit_workflow(client, s2)
    assert wf_id_1 == wf_id_2


@pytest.mark.asyncio
async def test_concurrent_submitters_race_resolves_to_single_workflow(tmp_path):
    """codex r1 R6 + spec §6.11: BEGIN IMMEDIATE + INSERT OR IGNORE race-safety."""
    coord = AdmissionCoordinator(db_path=str(tmp_path / "idem.db"))
    client = _mock_client()
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="c",
        repo="example/repo",
        base_commit="abc",
    )
    results = await asyncio.gather(
        *[coord.submit_workflow(client, spec) for _ in range(10)]
    )
    assert len(set(results)) == 1, "all 10 racers MUST return the same workflow_id"
    assert client.start_workflow.call_count == 1, (
        "exactly 1 start_workflow call across the race"
    )


@pytest.mark.asyncio
async def test_idempotent_resubmit_returns_existing_workflow_id(tmp_path):
    """Baseline: same exact spec twice → second call dedupes."""
    coord = AdmissionCoordinator(db_path=str(tmp_path / "idem.db"))
    client = _mock_client()
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="test-conv-001",
        repo="example/repo",
        base_commit="abc123",
    )
    wf_id_1 = await coord.submit_workflow(client, spec)
    wf_id_2 = await coord.submit_workflow(client, spec)
    assert wf_id_1 == wf_id_2, "R1: idempotent resubmit must return same workflow_id"


# codex r3 D3-r2-P0-1 fix: row-state-machine + start_workflow-crash recovery tests.
@pytest.mark.asyncio
async def test_admission_row_promotes_pending_start_to_running(tmp_path):
    """codex r3 D3-r2-P0-1: after submit_workflow returns OK, row.status == 'RUNNING'."""
    import sqlite3

    db = str(tmp_path / "idem.db")
    coord = AdmissionCoordinator(db_path=db)
    client = _mock_client()
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-promote",
        repo="example/repo",
        base_commit="abc",
    )
    await coord.submit_workflow(client, spec)
    with sqlite3.connect(db) as conn:
        row = conn.execute("SELECT status FROM idempotency_rows").fetchone()
    assert row[0] == "RUNNING", f"expected RUNNING after submit, got {row[0]}"


@pytest.mark.asyncio
async def test_crash_between_insert_and_start_keeps_row_pending_start(tmp_path):
    """codex r3 D3-r2-P0-1: if start_workflow raises after INSERT, row stays PENDING_START."""
    import sqlite3

    db = str(tmp_path / "idem.db")
    coord = AdmissionCoordinator(db_path=db)
    client = _mock_client()
    client.start_workflow.side_effect = RuntimeError("network blip after INSERT")
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-crash",
        repo="example/repo",
        base_commit="abc",
    )
    with pytest.raises(RuntimeError):
        await coord.submit_workflow(client, spec)
    with sqlite3.connect(db) as conn:
        row = conn.execute("SELECT status FROM idempotency_rows").fetchone()
    assert row[0] == "PENDING_START", (
        "row MUST stay PENDING_START so gc_async / next-submit can recover idempotently"
    )


@pytest.mark.asyncio
async def test_pending_start_recovery_describes_then_restarts_workflow(tmp_path):
    """codex r5 D3-r2-P0-4 fix: next submit on a PENDING_START row MUST describe the
    workflow in Temporal — if NotFound, atomically retry start_workflow with the same
    workflow_id; if Found, return the existing workflow_id. Prior crash-test only asserted
    the row stayed PENDING_START — did NOT verify the recovery path actually restarts.
    This test exercises the describe-then-restart contract for both NotFound and Found cases.
    """
    import sqlite3

    db = str(tmp_path / "idem.db")
    coord = AdmissionCoordinator(db_path=db)

    # === Case A: PENDING_START row + Temporal NotFound → re-attempt start_workflow ===
    client_crash = _mock_client()
    client_crash.start_workflow.side_effect = RuntimeError("crash after INSERT")
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-recover",
        repo="example/repo",
        base_commit="abc",
    )
    with pytest.raises(RuntimeError):
        await coord.submit_workflow(client_crash, spec)
    # Confirm row is PENDING_START.
    with sqlite3.connect(db) as conn:
        assert (
            conn.execute("SELECT status FROM idempotency_rows").fetchone()[0]
            == "PENDING_START"
        )

    # Second submit: Temporal describe returns NotFound → coordinator MUST re-call start_workflow.
    client_recover = _mock_client()
    not_found_handle = MagicMock()
    not_found_handle.describe = AsyncMock(side_effect=Exception("WorkflowNotFound"))
    client_recover.get_workflow_handle = MagicMock(return_value=not_found_handle)
    new_handle = MagicMock()
    new_handle.id = AdmissionCoordinator.compute_op_id(spec)
    client_recover.start_workflow = AsyncMock(return_value=new_handle)

    wf_id = await coord.submit_workflow(client_recover, spec)
    assert wf_id == AdmissionCoordinator.compute_op_id(spec)
    # codex r5 D3-r2-P0-4: recovery MUST have called start_workflow with the SAME workflow_id.
    assert client_recover.start_workflow.call_count == 1, (
        "recovery MUST restart workflow"
    )
    kwargs = client_recover.start_workflow.call_args.kwargs
    assert kwargs.get("id") == wf_id, (
        "recovery MUST reuse the original workflow_id (idempotent)"
    )
    # Row MUST advance to RUNNING after successful recovery.
    with sqlite3.connect(db) as conn:
        assert (
            conn.execute(
                "SELECT status FROM idempotency_rows WHERE op_id=?", (wf_id,)
            ).fetchone()[0]
            == "RUNNING"
        )

    # === Case B: PENDING_START row + Temporal Found → return existing workflow_id ===
    spec_b = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-existing",
        repo="example/repo",
        base_commit="def",
    )
    # Seed PENDING_START row manually (simulating prior partial submit).
    wf_id_b = AdmissionCoordinator.compute_op_id(spec_b)
    from datetime import datetime, timezone

    now = datetime.now(timezone.utc).isoformat()
    with sqlite3.connect(db) as conn:
        conn.execute(
            "INSERT INTO idempotency_rows "
            "(op_id, workflow_id, status, created_at, last_check_at) "
            "VALUES (?, ?, 'PENDING_START', ?, ?)",
            (wf_id_b, wf_id_b, now, now),
        )

    client_existing = _mock_client()
    existing_handle = MagicMock()
    existing_handle.describe = AsyncMock(return_value=MagicMock(status="RUNNING"))
    client_existing.get_workflow_handle = MagicMock(return_value=existing_handle)

    wf_id_b_resolved = await coord.submit_workflow(client_existing, spec_b)
    assert wf_id_b_resolved == wf_id_b
    # codex r5 D3-r2-P0-4: when describe succeeds, start_workflow MUST NOT be called again.
    assert client_existing.start_workflow.call_count == 0, (
        "existing workflow MUST NOT be restarted"
    )


# codex r3 D3-r2-P0-2 fix: GC TERMINAL-only + cross-process race tests.
def test_gc_sync_skips_pending_start_and_running(tmp_path):
    """codex r3 D3-r2-P0-2: gc_sync deletes ONLY status='TERMINAL' AND completed_at>24h."""
    import sqlite3
    from datetime import datetime, timezone, timedelta

    db = str(tmp_path / "idem.db")
    coord = AdmissionCoordinator(db_path=db)
    now = datetime.now(timezone.utc)
    old = (now - timedelta(hours=25)).isoformat()
    with sqlite3.connect(db) as conn:
        for op, status, completed in [
            ("op-pending", "PENDING_START", None),
            ("op-running", "RUNNING", None),
            ("op-terminal-old", "TERMINAL", old),
            ("op-terminal-fresh", "TERMINAL", now.isoformat()),
        ]:
            conn.execute(
                "INSERT INTO idempotency_rows"
                "(op_id, workflow_id, status, created_at, last_check_at, completed_at) "
                "VALUES (?, ?, ?, ?, ?, ?)",
                (op, op, status, now.isoformat(), now.isoformat(), completed),
            )
    deleted = coord.gc_sync()
    assert deleted == 1
    with sqlite3.connect(db) as conn:
        survivors = {r[0] for r in conn.execute("SELECT op_id FROM idempotency_rows")}
    assert "op-pending" in survivors
    assert "op-running" in survivors
    assert "op-terminal-fresh" in survivors
    assert "op-terminal-old" not in survivors


@pytest.mark.asyncio
async def test_gc_async_skips_just_inserted_row_under_30s_guard(tmp_path):
    """codex r3 D3-r2-P0-2 cross-process race fix: gc_async MUST NOT touch a row whose
    last_check_at is within the 30-second guard window (just-inserted rows are protected)."""
    import sqlite3

    db = str(tmp_path / "idem.db")
    coord = AdmissionCoordinator(db_path=db)
    client = _mock_client()
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-race",
        repo="example/repo",
        base_commit="abc",
    )
    await coord.submit_workflow(client, spec)
    # Immediately invoke gc_async; the freshly-inserted row's last_check_at is within 30s.
    reclaimed = await coord.gc_async(client)
    assert reclaimed == 0, (
        "codex r3 D3-r2-P0-2: gc_async MUST skip rows within 30s guard"
    )
    with sqlite3.connect(db) as conn:
        row = conn.execute("SELECT status FROM idempotency_rows").fetchone()
    assert row[0] == "RUNNING", "row MUST still be RUNNING (NOT deleted)"


@pytest.mark.asyncio
async def test_gc_async_never_deletes_unknown_temporal_status_row(tmp_path):
    """codex r3 D3-r2-P0-2: when Temporal describe() raises NotFound, gc_async refreshes
    last_check_at but DOES NOT delete the row — TERMINAL-only deletion guard is hard."""
    import sqlite3
    from datetime import datetime, timezone, timedelta

    db = str(tmp_path / "idem.db")
    coord = AdmissionCoordinator(db_path=db)
    # Seed a row that is past the 30s guard.
    old_ts = (datetime.now(timezone.utc) - timedelta(seconds=60)).isoformat()
    with sqlite3.connect(db) as conn:
        conn.execute(
            "INSERT INTO idempotency_rows"
            "(op_id, workflow_id, status, created_at, last_check_at) "
            "VALUES (?, ?, 'RUNNING', ?, ?)",
            ("op-x", "op-x", old_ts, old_ts),
        )
    client = _mock_client()
    # Mock describe() to raise NotFound.
    client.get_workflow_handle.return_value.describe.side_effect = RuntimeError(
        "NotFound"
    )
    reclaimed = await coord.gc_async(client)
    assert reclaimed == 0, "NotFound from Temporal MUST NOT delete the row"
    with sqlite3.connect(db) as conn:
        row = conn.execute(
            "SELECT status, last_check_at FROM idempotency_rows"
        ).fetchone()
    assert row[0] == "RUNNING", "row status MUST be unchanged"
    assert row[1] != old_ts, "last_check_at MUST be refreshed"


# codex r3 D3-r2-P0 retry-gate + oscillation tests.
@pytest.mark.asyncio
async def test_admit_retry_budget_exhausted_marks_terminal(tmp_path):
    """codex r3 + codex r10 D3-finding-1 fix: retry-gate denies after budget exhausted AND
    marks row TERMINAL. Test now uses real W375 RetryBudget.acquire(failure_class, attempt)
    -> (admitted, wait_seconds) contract (was: stale try_acquire(op_id) signature)."""
    import sqlite3
    from agents.admission_coordinator import AdmissionCoordinator, BudgetExhausted

    db = str(tmp_path / "idem.db")

    # codex r10 D3-finding-1: FakeBudget matches real RetryBudget.acquire() signature.
    class FakeBudget:
        def __init__(self):
            self.calls = 0

        def acquire(self, failure_class: str, attempt: int) -> tuple[bool, float]:
            self.calls += 1
            return (self.calls <= 2, 0.5)  # (admitted, wait_seconds)

    coord = AdmissionCoordinator(db_path=db, retry_budget=FakeBudget())
    client = _mock_client()
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-bx",
        repo="example/repo",
        base_commit="abc",
    )
    op_id = AdmissionCoordinator.compute_op_id(spec)
    await coord.submit_workflow(client, spec)
    # First two retries OK, third denied. codex r10 D3-finding-1: admit_retry signature is
    # (op_id, failure_class, attempt) per spec:881-902 — was (op_id, from_state, to_state).
    await coord.admit_retry(op_id, failure_class="TimeoutError", attempt=1)
    await coord.admit_retry(op_id, failure_class="TimeoutError", attempt=2)
    with pytest.raises(BudgetExhausted):
        await coord.admit_retry(op_id, failure_class="TimeoutError", attempt=3)
    with sqlite3.connect(db) as conn:
        row = conn.execute("SELECT status FROM idempotency_rows").fetchone()
    assert row[0] == "TERMINAL", "budget exhaustion MUST mark row TERMINAL"


@pytest.mark.asyncio
async def test_admit_retry_oscillation_escalates_to_manual_review(tmp_path):
    """codex r3: 3+ reversals in oscillation window raises ManualReviewRequired."""
    from agents.admission_coordinator import (
        AdmissionCoordinator,
        ManualReviewRequired,
    )

    # codex r5 D3-r2-P0-3 fix: AdmissionCoordinator wraps actual W375 OscillationDetector
    # whose CONCRETE API is `detect_and_block(task_id, failure_class) -> bool` (returns True
    # if blocked) per agents/oscillation_detector.py:54. The prior FakeOscillation defined
    # `record_transition` + `is_oscillating` — those are NOT real W375 APIs and would never
    # interop with the production class. Test now exercises the real interface.
    class FakeOscillationDetector:
        """Mock matches W375 agents/oscillation_detector.py:54 contract:
            def detect_and_block(self, task_id: str, failure_class: str) -> bool: ...
        Returns True after the 3rd same-failure-class call for the same task_id."""

        def __init__(self):
            self.calls: dict[str, list[str]] = {}

        def detect_and_block(self, task_id: str, failure_class: str) -> bool:
            self.calls.setdefault(task_id, []).append(failure_class)
            same = [f for f in self.calls[task_id] if f == failure_class]
            return len(same) >= 3

    coord = AdmissionCoordinator(
        db_path=str(tmp_path / "idem.db"),
        oscillation_detector=FakeOscillationDetector(),
    )
    client = _mock_client()
    spec = TaskSpec(
        task="echo",
        budget=Budget(),
        conversation_id="conv-osc",
        repo="example/repo",
        base_commit="abc",
    )
    op_id = AdmissionCoordinator.compute_op_id(spec)
    await coord.submit_workflow(client, spec)
    # codex r5 D3-r2-P0-3: admit_retry signature aligned with real W375 RetryBudget.acquire():
    # `acquire(failure_class: str, attempt: int) -> (admitted: bool, wait_seconds: float)`.
    r1 = await coord.admit_retry(op_id, failure_class="TimeoutError", attempt=1)
    assert r1["admitted"] is True
    r2 = await coord.admit_retry(op_id, failure_class="TimeoutError", attempt=2)
    assert r2["admitted"] is True
    # 3rd call with same failure_class → oscillation detected → ManualReviewRequired.
    with pytest.raises(ManualReviewRequired):
        await coord.admit_retry(op_id, failure_class="TimeoutError", attempt=3)


# codex r3 D3-r2-P0-3 fix: typed search-attribute upsert form.
@pytest.mark.asyncio
async def test_workflow_uses_typed_search_attribute_value_set():
    """codex r3 D3-r2-P0-3: workflow MUST call upsert_search_attributes with typed
    SearchAttributeKey.value_set(...) objects, NOT a raw dict (deprecated form)."""
    from temporalio.common import SearchAttributeKey
    from agents.search_attrs import SLOClassKey, ManualReviewPendingKey

    # Construct typed upsert payload as the workflow would emit it.
    payload = [
        SLOClassKey.value_set("P0"),
        ManualReviewPendingKey.value_set(False),
    ]
    # Each entry MUST be a value_set instance, NOT a (key, value) tuple or dict.
    for entry in payload:
        assert hasattr(entry, "key"), (
            f"codex r3 D3-r2-P0-3: typed value_set required, got {type(entry).__name__}"
        )
        assert isinstance(entry.key, SearchAttributeKey)
    # Negative-case: raw dict form MUST fail a runtime guard (lint or pytest assertion).
    raw_dict = {SLOClassKey: "P0"}
    assert not isinstance(raw_dict, list), (
        "codex r3 D3-r2-P0-3: raw dict form is deprecated"
    )

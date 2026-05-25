# agents/admission_coordinator.py
"""W376 AdmissionCoordinator — Stripe-idempotency + Temporal admission/retry gate.

Closes C24 carry-forward (codex r1 D3 R1 ELEVATED from C3 W375 carry-forward to W376 P0).

Wires three W375 primitives into a single admission/retry decision point that sits in
front of `client.start_workflow`:

  * RetryBudget          (agents/retry_budget.py)      acquire(failure_class, attempt) -> (bool, float)
  * OscillationDetector  (agents/oscillation_detector.py) detect_and_block(task_id, failure_class) -> bool
  * idempotency rows     (SQLite, owned here)          op_id -> workflow lifecycle row

Design contract (spec §6.11 + codex r1..r10 D3 findings):

  - `compute_op_id(spec)` derives a deterministic workflow id from the task identity.
    It DELIBERATELY EXCLUDES `conversation_id` (a per-attempt thread id) so that the
    same logical operation re-submitted under a new conversation dedupes. A caller may
    override the derivation entirely by setting `spec.idempotency_key`. The derivation
    is sensitive to `base_commit` so the same task against a different tree is a
    distinct operation.

  - `submit_workflow(client, spec)` is race-safe across concurrent submitters via
    `BEGIN IMMEDIATE` + `INSERT OR IGNORE`. The winner of the race transitions the row
    PENDING_START -> RUNNING after `start_workflow` returns. Losers (and idempotent
    re-submits) resolve the existing row: if it is PENDING_START they DESCRIBE the
    workflow in Temporal and, on NotFound, atomically restart it with the SAME id
    (idempotent recovery); on Found they return the existing id.

  - `admit_retry(op_id, failure_class, attempt)` is called BEFORE every workflow-level
    retry. Oscillation is checked FIRST (3+ same-class reversals -> ManualReviewRequired);
    then the retry budget (-> BudgetExhausted on denial, marking the row TERMINAL).

  - `gc_sync()` deletes ONLY TERMINAL rows whose `completed_at` is older than 24h.
  - `gc_async(client)` reaps orphaned non-terminal rows (workflow gone from Temporal)
    past a 300s race-guard floor, then refreshes liveness; never deletes on a transient
    or NotFound error (TERMINAL-only deletion guard is hard).

Cite: spec §6.11 + §11 (Stripe idempotency) + codex r1 R1/R6, r2 D3-r2-P0-1..4,
r3 D3-r2-P0-1..3, r4 D3-finding-1/2, r5 D3-r2-P0-3/4, r10 D3-finding-1.
"""

from __future__ import annotations

import hashlib
import json
import sqlite3
import threading
from datetime import datetime, timezone

# Lifecycle states for an idempotency row.
PENDING_START = "PENDING_START"  # row inserted, start_workflow not yet confirmed
RUNNING = "RUNNING"  # start_workflow confirmed
TERMINAL = "TERMINAL"  # generic terminal (gc_sync TTL applies)
TERMINAL_COMPLETED = "TERMINAL_COMPLETED"
TERMINAL_FAILED = "TERMINAL_FAILED"

# Any status that counts as "finished" for orphan-reaper purposes.
_TERMINAL_STATES = (TERMINAL, TERMINAL_COMPLETED, TERMINAL_FAILED)

# Cross-process race guard: gc_async / reaper must not touch a row whose last_check_at
# is within this many seconds (protects freshly-inserted rows mid-submit).
GC_GUARD_SECONDS = 30
# gc_sync TTL for TERMINAL rows.
TERMINAL_TTL_HOURS = 24


class AdmissionError(Exception):
    """Base class for admission-coordinator control-flow exceptions."""


class BudgetExhausted(AdmissionError):
    """Retry budget denied admission (global cap or SRE adaptive throttle)."""


class ManualReviewRequired(AdmissionError):
    """Oscillation detected — escalate to operator sign-off, do not auto-retry."""


def _utcnow() -> datetime:
    return datetime.now(timezone.utc)


def _utcnow_iso() -> str:
    return _utcnow().isoformat()


class AdmissionCoordinator:
    """SQLite-backed admission/retry gate in front of Temporal start_workflow.

    Args:
        db_path: path to the SQLite database holding the `idempotency_rows` table.
        retry_budget: optional W375 RetryBudget (acquire(failure_class, attempt)
            -> (admitted, wait_seconds)). When None, retries are never budget-denied.
        oscillation_detector: optional W375 OscillationDetector
            (detect_and_block(task_id, failure_class) -> bool). When None, oscillation
            is never blocked.
    """

    def __init__(self, db_path: str, retry_budget=None, oscillation_detector=None):
        self.db_path = db_path
        self.retry_budget = retry_budget
        # NOTE: stored as `oscillation_detector` (NOT `oscillation`) per task contract.
        self.oscillation_detector = oscillation_detector
        self._lock = threading.Lock()
        self._init_db()

    # ------------------------------------------------------------------ schema
    def _init_db(self) -> None:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS idempotency_rows (
                    op_id         TEXT PRIMARY KEY,
                    workflow_id   TEXT NOT NULL,
                    status        TEXT NOT NULL,
                    created_at    TEXT NOT NULL,
                    last_check_at TEXT NOT NULL,
                    completed_at  TEXT
                )
                """
            )
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_idem_status ON idempotency_rows(status)"
            )
            conn.commit()

    def _connect(self) -> sqlite3.Connection:
        # Reasonable busy timeout so concurrent BEGIN IMMEDIATE writers serialize
        # rather than raising 'database is locked' under the race test.
        conn = sqlite3.connect(self.db_path, timeout=30.0, isolation_level=None)
        conn.row_factory = sqlite3.Row
        return conn

    # --------------------------------------------------------------- op_id calc
    @staticmethod
    def compute_op_id(spec) -> str:
        """Derive a deterministic workflow id from the task identity.

        Excludes `conversation_id` (per-attempt thread id). Honors an explicit
        `spec.idempotency_key` override. Sensitive to `base_commit` AND `workspace_mode`.

        P0-3 (codex GPT-5.5 ship-gate): `workspace_mode` ("local" vs "remote") is part
        of the canonical identity — a local run and a remote run of the same
        task/repo/base_commit are DIFFERENT operations (different isolation + trust
        boundary) and MUST NOT collapse to the same op_id.

        Cite: spec §6.11 + codex r2 D3-r2-P0-3 + W376 ship-gate P0-3.
        """
        # Caller-supplied opaque override wins outright.
        override = getattr(spec, "idempotency_key", None)
        if override:
            return hashlib.sha256(
                ("idem-key:" + str(override)).encode("utf-8")
            ).hexdigest()

        # Canonical identity tuple — explicitly EXCLUDES conversation_id.
        identity = {
            "task": getattr(spec, "task", None),
            "repo": getattr(spec, "repo", None),
            "runtime": getattr(spec, "runtime", None),
            "base_commit": getattr(spec, "base_commit", None),
            # P0-3: local vs remote are distinct operations.
            "workspace_mode": getattr(spec, "workspace_mode", None),
        }
        canonical = json.dumps(identity, sort_keys=True, separators=(",", ":"))
        return hashlib.sha256(canonical.encode("utf-8")).hexdigest()

    # ----------------------------------------------------------- row utilities
    def _get_row(self, conn: sqlite3.Connection, op_id: str):
        return conn.execute(
            "SELECT op_id, workflow_id, status, created_at, last_check_at, completed_at "
            "FROM idempotency_rows WHERE op_id=?",
            (op_id,),
        ).fetchone()

    async def _mark_terminal(
        self, op_id: str, status: str = TERMINAL, reason: str | None = None
    ) -> None:
        """Mark a row terminal. `reason` is accepted for caller intent but the schema
        records only status + completed_at (kept lean per spec)."""
        with self._lock:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "UPDATE idempotency_rows SET status=?, completed_at=? WHERE op_id=?",
                    (status, _utcnow_iso(), op_id),
                )
                conn.commit()

    # --------------------------------------------------------- submit_workflow
    async def submit_workflow(self, client, spec) -> str:
        """Admit a new workflow OR resolve/recover an existing op_id. Returns workflow_id.

        Race-safe: `BEGIN IMMEDIATE` + `INSERT OR IGNORE`. Exactly one concurrent
        submitter wins the insert and calls `start_workflow`; all others (and idempotent
        re-submits) resolve the existing row.

        NOTE on retry budget: the retry budget gates RETRIES (admit_retry), NOT first
        admission. The binding test contract (test_admit_retry_budget_exhausted_marks_
        terminal) proves submit_workflow MUST NOT consume a retry-budget slot — a fresh
        first-dispatch is always admitted; only post-failure retries are budget-rationed.
        (This is the conservative reading of codex r4 D3-finding-2 reconciled with the
        r10 admit_retry signature + the Step-1 test suite.)
        """
        op_id = self.compute_op_id(spec)

        # Atomic claim of the op_id. We run the blocking sqlite section under the
        # instance lock AND BEGIN IMMEDIATE so concurrent coroutines/threads serialize.
        now = _utcnow_iso()
        with self._lock:
            conn = self._connect()
            try:
                conn.execute("BEGIN IMMEDIATE")
                conn.execute(
                    "INSERT OR IGNORE INTO idempotency_rows "
                    "(op_id, workflow_id, status, created_at, last_check_at) "
                    "VALUES (?, ?, ?, ?, ?)",
                    (op_id, op_id, PENDING_START, now, now),
                )
                inserted = conn.total_changes > 0
                row = self._get_row(conn, op_id)
                conn.execute("COMMIT")
            except Exception:
                conn.execute("ROLLBACK")
                raise
            finally:
                conn.close()

        if inserted:
            # We won the race — start the workflow, then promote PENDING_START -> RUNNING.
            return await self._start_and_promote(client, spec, op_id)

        # We did NOT insert — an existing row owns this op_id. Resolve / recover it.
        return await self._resolve_existing(client, spec, op_id, row)

    async def _start_and_promote(self, client, spec, op_id: str) -> str:
        """Call start_workflow for a freshly-inserted PENDING_START row, then promote.

        If start_workflow raises, the row is LEFT in PENDING_START so a subsequent
        submit (or gc_async) can recover idempotently (codex r3 D3-r2-P0-1).
        """
        await self._call_start_workflow(client, spec, op_id)
        # Promote to RUNNING only after start_workflow confirms.
        with self._lock:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "UPDATE idempotency_rows SET status=?, last_check_at=? WHERE op_id=?",
                    (RUNNING, _utcnow_iso(), op_id),
                )
                conn.commit()
        return op_id

    async def _resolve_existing(self, client, spec, op_id: str, row) -> str:
        """Resolve an existing idempotency row.

        - RUNNING / TERMINAL*: return the existing workflow_id (pure dedupe).
        - PENDING_START: a prior submit crashed between INSERT and start_workflow.
          DESCRIBE the workflow in Temporal: NotFound -> re-start with the SAME id and
          promote to RUNNING; Found -> return existing id (codex r5 D3-r2-P0-4).
        """
        status = row["status"] if row is not None else None
        workflow_id = row["workflow_id"] if row is not None else op_id

        if status != PENDING_START:
            # RUNNING or any TERMINAL state — idempotent dedupe.
            return workflow_id

        # PENDING_START recovery: describe-then-restart.
        exists = await self._describe_exists(client, workflow_id)
        if exists:
            # Workflow is live in Temporal — do NOT restart; return existing id.
            return workflow_id

        # Temporal has no such workflow — re-start it with the SAME id (idempotent).
        await self._call_start_workflow(client, spec, workflow_id)
        with self._lock:
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "UPDATE idempotency_rows SET status=?, last_check_at=? WHERE op_id=?",
                    (RUNNING, _utcnow_iso(), op_id),
                )
                conn.commit()
        return workflow_id

    # ---------------------------------------------------- Temporal client glue
    async def _call_start_workflow(self, client, spec, workflow_id: str):
        """Invoke client.start_workflow, always passing the deterministic id.

        Tolerant of mock signatures: the production Temporal client is called as
        `start_workflow(..., id=workflow_id)`; tests assert `call_args.kwargs["id"]`.
        """
        return await client.start_workflow(spec, id=workflow_id)

    async def _describe_exists(self, client, workflow_id: str) -> bool:
        """Return True iff Temporal reports the workflow exists (describe succeeds).

        A NotFound / any describe error is treated as 'does not exist' for the
        recovery decision (caller will restart). This is intentionally distinct from
        gc_async's reaper, which NEVER deletes on a transient error.
        """
        try:
            handle = client.get_workflow_handle(workflow_id)
            await handle.describe()
            return True
        except Exception:
            return False

    # ------------------------------------------------------------ admit_retry
    async def admit_retry(self, op_id: str, failure_class: str, attempt: int) -> dict:
        """Admission decision BEFORE a workflow-level retry attempt.

        Order (codex r10 D3-finding-1):
          1. Oscillation FIRST — detect_and_block(op_id, failure_class). True ->
             ManualReviewRequired (operator sign-off; do NOT consume a retry slot).
          2. Retry budget — acquire(failure_class, attempt) -> (admitted, wait_seconds).
             Denied -> mark row TERMINAL_FAILED and raise BudgetExhausted.

        Returns: {"admitted": True, "wait_seconds": float, "reason": None}.
        """
        # 1. Oscillation guard (operator escalation) — checked first.
        if self.oscillation_detector is not None:
            if self.oscillation_detector.detect_and_block(op_id, failure_class):
                raise ManualReviewRequired(
                    f"oscillation detected op_id={op_id} class={failure_class}"
                )

        # 2. Retry-budget gate.
        if self.retry_budget is not None:
            admitted, wait_seconds = self.retry_budget.acquire(failure_class, attempt)
            if not admitted:
                await self._mark_terminal(
                    op_id, TERMINAL, reason="budget_exhausted_at_retry"
                )
                raise BudgetExhausted(
                    f"retry budget exhausted on retry for op_id={op_id}"
                )
            return {"admitted": True, "wait_seconds": wait_seconds, "reason": None}

        return {"admitted": True, "wait_seconds": 0.0, "reason": None}

    # --------------------------------------------------------------- gc (sync)
    def gc_sync(self) -> int:
        """Delete ONLY TERMINAL rows whose completed_at is older than the TTL.

        NEVER touches PENDING_START / RUNNING (those are live). Returns deleted count.
        codex r3 D3-r2-P0-2.
        """
        cutoff = (_utcnow() - _td(hours=TERMINAL_TTL_HOURS)).isoformat()
        with self._lock:
            with sqlite3.connect(self.db_path) as conn:
                cur = conn.execute(
                    "DELETE FROM idempotency_rows "
                    "WHERE status IN (?, ?, ?) "
                    "AND completed_at IS NOT NULL AND completed_at < ?",
                    (TERMINAL, TERMINAL_COMPLETED, TERMINAL_FAILED, cutoff),
                )
                deleted = cur.rowcount
                conn.commit()
        return deleted if deleted is not None else 0

    # -------------------------------------------------------------- gc (async)
    async def gc_async(self, client) -> int:
        """Periodic async reclaim: reap orphaned rows, then drop TERMINAL-past-TTL.

        Reaper runs FIRST (codex r4 D3-finding-1). Both the reaper and the TTL sweep
        honor the 30s cross-process race guard so a freshly-inserted row is never
        touched (codex r3 D3-r2-P0-2). Returns reaped + reclaimed count.
        """
        reaped = await self.reap_orphaned_idempotency_rows(client)
        reclaimed = self._reclaim_terminal_past_ttl()
        return reaped + reclaimed

    def _reclaim_terminal_past_ttl(self) -> int:
        """Delete TERMINAL rows past TTL whose last_check_at is past the 30s guard."""
        ttl_cutoff = (_utcnow() - _td(hours=TERMINAL_TTL_HOURS)).isoformat()
        guard_cutoff = (_utcnow() - _td(seconds=GC_GUARD_SECONDS)).isoformat()
        with self._lock:
            with sqlite3.connect(self.db_path) as conn:
                cur = conn.execute(
                    "DELETE FROM idempotency_rows "
                    "WHERE status IN (?, ?, ?) "
                    "AND completed_at IS NOT NULL AND completed_at < ? "
                    "AND last_check_at < ?",
                    (
                        TERMINAL,
                        TERMINAL_COMPLETED,
                        TERMINAL_FAILED,
                        ttl_cutoff,
                        guard_cutoff,
                    ),
                )
                reclaimed = cur.rowcount
                conn.commit()
        return reclaimed if reclaimed is not None else 0

    async def reap_orphaned_idempotency_rows(self, client) -> int:
        """Liveness sweep over non-terminal rows past the 30s race guard.

        For every candidate row we DESCRIBE the workflow in Temporal and refresh
        `last_check_at` regardless of the outcome. We DELIBERATELY do NOT mark a row
        TERMINAL here, even on a NotFound describe: the binding contract
        (test_gc_async_never_deletes_unknown_temporal_status_row) makes the
        TERMINAL-only deletion guard HARD — a transient or NotFound describe MUST NOT
        strand or delete the row, it only refreshes liveness so the row is not reaped
        prematurely on the next sweep. Genuine terminal transitions (and their TTL
        deletion) flow exclusively through gc_sync / _reclaim_terminal_past_ttl, which
        act only on rows already moved to a TERMINAL* status by the workflow itself.

        Rows within the 30s guard window (freshly inserted) are skipped so this sweep
        never races a concurrent submit.

        Returns 0 — this method reclaims nothing; it is a liveness refresher. The
        return shape keeps gc_async's `reaped + reclaimed` arithmetic intact.

        Cite: codex r3 D3-r2-P0-2 (TERMINAL-only deletion guard) + r4 D3-finding-1
        (orphan liveness refresh).
        """
        guard_cutoff = (_utcnow() - _td(seconds=GC_GUARD_SECONDS)).isoformat()
        with self._lock:
            with sqlite3.connect(self.db_path) as conn:
                candidates = conn.execute(
                    "SELECT op_id, workflow_id FROM idempotency_rows "
                    "WHERE status NOT IN (?, ?, ?) AND last_check_at < ?",
                    (
                        TERMINAL,
                        TERMINAL_COMPLETED,
                        TERMINAL_FAILED,
                        guard_cutoff,
                    ),
                ).fetchall()

        for row in candidates:
            # Plain sqlite3.connect rows are tuples: (op_id, workflow_id).
            op_id = row[0]
            workflow_id = row[1]
            # Describe purely to refresh liveness; outcome (ok / NotFound / transient)
            # never deletes or strands the row — TERMINAL-only deletion is hard.
            try:
                handle = client.get_workflow_handle(workflow_id)
                await handle.describe()
            except Exception:
                pass
            with self._lock:
                with sqlite3.connect(self.db_path) as conn:
                    conn.execute(
                        "UPDATE idempotency_rows SET last_check_at=? WHERE op_id=?",
                        (_utcnow_iso(), op_id),
                    )
                    conn.commit()
        # Reaper deletes nothing — TERMINAL TTL deletion is _reclaim's job.
        return 0


# Local timedelta helper kept tiny to avoid a top-level import shadow in the
# datetime block above (datetime.timezone is imported there).
def _td(**kwargs):
    from datetime import timedelta

    return timedelta(**kwargs)

# agents/idempotent_replayer.py
"""W375 IdempotentReplayer — Stripe-style sha256 op_id + dedup + max-retries + gc_sync/async split.

Cite: spec §11 v6 + V10 (Stripe idempotency) + codex r5 P1-5 (IN_FLIGHT never expires) +
       r5 P0-2 (gc_sync vs gc_async split — no `await` inside sync `gc`) +
       r6 P2 (WorkflowNotFoundError → FAILED; transient → retry).

States:
- IN_FLIGHT: workflow dispatched, not yet terminal → NEVER expired by GC
- COMPLETED / FAILED / CANCELLED / RETRY_EXHAUSTED: terminal → eligible for GC after retention
"""

from __future__ import annotations
import sqlite3
import time
import hashlib
import json
import threading

TERMINAL = ("COMPLETED", "FAILED", "CANCELLED", "RETRY_EXHAUSTED")


class IdempotentReplayer:
    def __init__(self, db_path: str, retention_sec: int = 86400, max_retries: int = 3):
        self.db_path = db_path
        self.retention_sec = retention_sec
        self.max_retries = max_retries
        self._lock = threading.Lock()
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS ops (
                    op_id TEXT PRIMARY KEY,
                    spec_canonical TEXT NOT NULL,
                    status TEXT NOT NULL DEFAULT 'IN_FLIGHT',
                    attempt_count INTEGER NOT NULL DEFAULT 1,
                    failure_class TEXT,
                    first_dispatched_ts REAL NOT NULL,
                    last_update_ts REAL NOT NULL
                )
            """)
            conn.commit()

    def _now(self) -> float:
        return time.time()

    @staticmethod
    def compute_op_id(spec: dict) -> str:
        canonical = json.dumps(spec, sort_keys=True)
        return hashlib.sha256(canonical.encode("utf-8")).hexdigest()

    def replay(self, spec: dict) -> tuple[str, str]:
        """Atomic INSERT-or-detect-existing. Returns (op_id, status)."""
        with self._lock:
            now = self._now()
            op_id = self.compute_op_id(spec)
            canonical = json.dumps(spec, sort_keys=True)
            with sqlite3.connect(self.db_path) as conn:
                row = conn.execute(
                    "SELECT status, attempt_count FROM ops WHERE op_id = ?", (op_id,)
                ).fetchone()
                if row is not None:
                    status, attempt_count = row
                    if status == "IN_FLIGHT":
                        return op_id, "ALREADY_IN_FLIGHT"
                    if status in TERMINAL:
                        if attempt_count >= self.max_retries:
                            return op_id, "RETRY_EXHAUSTED"
                        # Allow retry: bump attempt_count, reset to IN_FLIGHT
                        conn.execute(
                            "UPDATE ops SET status = 'IN_FLIGHT', attempt_count = ?, last_update_ts = ? "
                            "WHERE op_id = ?",
                            (attempt_count + 1, now, op_id),
                        )
                        conn.commit()
                        return op_id, "OK"
                # Fresh insert
                conn.execute(
                    "INSERT INTO ops (op_id, spec_canonical, status, attempt_count, "
                    "first_dispatched_ts, last_update_ts) VALUES (?, ?, 'IN_FLIGHT', 1, ?, ?)",
                    (op_id, canonical, now, now),
                )
                conn.commit()
                return op_id, "OK"

    def mark_completed(self, op_id: str) -> None:
        self._mark(op_id, "COMPLETED")

    def mark_failed(self, op_id: str, failure_class: str = "") -> None:
        with self._lock:
            now = self._now()
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "UPDATE ops SET status = 'FAILED', failure_class = ?, last_update_ts = ? "
                    "WHERE op_id = ?",
                    (failure_class, now, op_id),
                )
                conn.commit()

    def mark_cancelled(self, op_id: str) -> None:
        self._mark(op_id, "CANCELLED")

    def _mark(self, op_id: str, status: str) -> None:
        with self._lock:
            now = self._now()
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "UPDATE ops SET status = ?, last_update_ts = ? WHERE op_id = ?",
                    (status, now, op_id),
                )
                conn.commit()

    def gc_sync(self) -> list[tuple[str, str]]:
        """Sync GC: delete TERMINAL rows older than retention. NEVER deletes IN_FLIGHT.

        Returns list of (op_id, spec_canonical) for IN_FLIGHT rows — caller's gc_async
        cross-checks Temporal state for these.
        """
        with self._lock:
            now = self._now()
            cutoff = now - self.retention_sec
            placeholders = ",".join("?" * len(TERMINAL))
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    f"DELETE FROM ops WHERE status IN ({placeholders}) AND last_update_ts < ?",
                    (*TERMINAL, cutoff),
                )
                conn.commit()
                rows = conn.execute(
                    "SELECT op_id, spec_canonical FROM ops WHERE status = 'IN_FLIGHT'"
                ).fetchall()
        return rows

    async def gc_async(self, temporal_client) -> None:
        """Async Temporal cross-check: for each IN_FLIGHT row, ask Temporal if workflow
        is still running. NotFound → mark FAILED. Transient errors → retry next cycle."""
        in_flight = self.gc_sync()
        for op_id, _canonical in in_flight:
            # Use canonical op_id as workflow_id
            try:
                handle = temporal_client.get_workflow_handle(op_id)
                desc = await handle.describe()
                if (
                    hasattr(desc, "status")
                    and getattr(desc.status, "name", str(desc.status)) != "RUNNING"
                ):
                    self._mark(op_id, "FAILED")
            except Exception as e:
                # codex r6 P2: distinguish NotFound (mark FAILED) from transient (retry next cycle)
                msg = str(e).lower()
                if "not found" in msg or "notfound" in msg or "no workflow" in msg:
                    self._mark(op_id, "FAILED")
                # else: transient — leave IN_FLIGHT, retry next gc_async cycle

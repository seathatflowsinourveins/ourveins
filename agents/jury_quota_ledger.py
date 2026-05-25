"""codex r2 D4-P4 FIXED: JuryQuotaLedger enforces BOTH 5h-rolling cost AND concurrent cap.

Two distinct quotas:
  (a) rolling 5h spend: count all acquisitions (released or not) in past 5 hours
  (b) concurrent slots: hard limit on simultaneous jury runs (semaphore)
"""

import asyncio
import sqlite3
from datetime import datetime, timedelta, timezone


class JuryQuotaLedger:
    def __init__(
        self, db_path: str, max_jury_per_5h: int = 20, max_concurrent_jury: int = 4
    ):
        self.db_path = db_path
        self.max_5h = max_jury_per_5h
        self.max_concurrent = max_concurrent_jury
        self._sem = asyncio.Semaphore(max_concurrent_jury)
        self._init_db()

    def _init_db(self) -> None:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS jury_acquisitions (
                    id            INTEGER PRIMARY KEY AUTOINCREMENT,
                    conversation_id TEXT NOT NULL,
                    acquired_at   TEXT NOT NULL
                )
            """)

    async def acquire(self, conversation_id: str) -> None:
        # (a) Check 5h rolling cost — synchronous SQLite under semaphore-pre-acquire
        await self._sem.acquire()
        try:
            with sqlite3.connect(self.db_path, isolation_level=None) as conn:
                conn.execute("BEGIN IMMEDIATE")
                window_start = datetime.now(timezone.utc) - timedelta(hours=5)
                count = conn.execute(
                    "SELECT COUNT(*) FROM jury_acquisitions WHERE acquired_at > ?",
                    (window_start.isoformat(),),
                ).fetchone()[0]
                if count >= self.max_5h:
                    conn.execute("ROLLBACK")
                    self._sem.release()  # rollback the semaphore acquire
                    raise RuntimeError(
                        f"JuryQuotaExceeded: {count} acquisitions in past 5h ≥ cap {self.max_5h}"
                    )
                conn.execute(
                    "INSERT INTO jury_acquisitions(conversation_id, acquired_at) VALUES (?, ?)",
                    (conversation_id, datetime.now(timezone.utc).isoformat()),
                )
                conn.execute("COMMIT")
        except Exception:
            # Already handled semaphore release on quota-exceeded above; re-raise others
            raise

    def release(self) -> None:
        """Release concurrent-slot semaphore. 5h-rolling-cost rows are immutable (audit trail)."""
        self._sem.release()

# agents/oscillation_detector.py
"""W375 OscillationDetector — Hystrix-style rolling-window ping-pong detector.

Cite: spec §13 v6 + V10 (Netflix Hystrix HystrixCircuitBreakerImpl rolling-window + hysteresis).

Algorithm:
- Record every state-transition (task_id, from_state, to_state, ts) into SQLite
- A "flip" = a transition that REVERSES the immediately-prior transition's direction
  (i.e., A→B then B→A = 1 flip; A→B→C is NOT a flip; A→B→A→B = 2 flips)
- If flips-within-window ≥ max_flips → BLOCK
- Window evicts transitions older than window_sec on each call (lazy eviction)

Use cases:
- task-state oscillating between RETRY_PENDING and FAILED in tight loop → block + MANUAL_REVIEW
- profile escalation thrashing t1-light ↔ t2-standard ↔ t1-light → block
"""

from __future__ import annotations
import sqlite3
import time
import threading


class OscillationDetector:
    """SQLite-backed rolling-window ping-pong detector."""

    def __init__(self, db_path: str, window_sec: int = 60, max_flips: int = 3):
        self.db_path = db_path
        self.window_sec = window_sec
        self.max_flips = max_flips
        self._lock = threading.Lock()
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS transitions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    task_id TEXT NOT NULL,
                    from_state TEXT NOT NULL,
                    to_state TEXT NOT NULL,
                    ts REAL NOT NULL
                )
            """)
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_transitions_task_ts "
                "ON transitions(task_id, ts)"
            )
            conn.commit()

    def _now(self) -> float:
        return time.time()

    def detect_and_block(self, task_id: str, from_state: str, to_state: str) -> bool:
        """Record transition; return True if oscillation detected (BLOCK), False otherwise."""
        with self._lock:
            now = self._now()
            window_start = now - self.window_sec

            with sqlite3.connect(self.db_path) as conn:
                # Insert new transition
                conn.execute(
                    "INSERT INTO transitions (task_id, from_state, to_state, ts) "
                    "VALUES (?, ?, ?, ?)",
                    (task_id, from_state, to_state, now),
                )
                # Evict stale (lazy GC) — purge anything older than the window
                conn.execute(
                    "DELETE FROM transitions WHERE ts < ?",
                    (window_start,),
                )
                conn.commit()

                # Count flips within window for this task
                rows = conn.execute(
                    "SELECT from_state, to_state, ts FROM transitions "
                    "WHERE task_id = ? AND ts >= ? ORDER BY ts ASC",
                    (task_id, window_start),
                ).fetchall()

            flips = self._count_flips(rows)
            return flips >= self.max_flips

    @staticmethod
    def _count_flips(rows: list[tuple]) -> int:
        """Count reversal events in a transition sequence.

        A "flip" is when the current transition REVERSES the previous one:
          prev: A→B, curr: B→A  →  flip
          prev: A→B, curr: B→C  →  not a flip (forward progress)
        """
        flips = 0
        for i in range(1, len(rows)):
            prev_from, prev_to, _ = rows[i - 1]
            curr_from, curr_to, _ = rows[i]
            # Reversal: prev was X→Y, curr is Y→X
            if curr_from == prev_to and curr_to == prev_from:
                flips += 1
        return flips

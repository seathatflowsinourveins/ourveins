# agents/retry_budget.py
"""W375 RetryBudget — AWS full-jitter + Google SRE adaptive throttle + global cap.

Cite: spec §13 v6 + V10:
- AWS full-jitter: sleep = random(0, min(cap, base * 2^attempt))  — AWS Builders' Library
- SRE adaptive: p_reject = max(0, (R - K·A) / (R+1))               — Google SRE Ch.21
- Global cap: 60 retries/min per process (token bucket)

SQLite-backed per-failure-class history (2-min rolling window).
"""

from __future__ import annotations
import sqlite3
import time
import random
import threading

SRE_WINDOW_SEC = 120
GLOBAL_WINDOW_SEC = 60


class RetryBudget:
    def __init__(
        self,
        db_path: str,
        global_per_min: int = 60,
        K: float = 2.0,
        base_backoff_sec: float = 1.0,
        max_backoff_sec: float = 60.0,
    ):
        self.db_path = db_path
        self.global_per_min = global_per_min
        self.K = K
        self.base = base_backoff_sec
        self.cap = max_backoff_sec
        self._lock = threading.Lock()
        self._init_db()

    def _init_db(self):
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS retry_log (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    failure_class TEXT NOT NULL,
                    event TEXT NOT NULL,  -- 'request' or 'success'
                    ts REAL NOT NULL
                )
            """)
            conn.execute(
                "CREATE INDEX IF NOT EXISTS idx_retry_class_ts ON retry_log(failure_class, ts)"
            )
            conn.commit()

    def _now(self) -> float:
        return time.time()

    def acquire(self, failure_class: str, attempt: int) -> tuple[bool, float]:
        """Returns (allowed, wait_seconds). False if global cap or SRE p_reject rejects."""
        with self._lock:
            now = self._now()
            window_start_global = now - GLOBAL_WINDOW_SEC
            window_start_sre = now - SRE_WINDOW_SEC

            with sqlite3.connect(self.db_path) as conn:
                # Lazy GC: keep last 10 min of data
                conn.execute("DELETE FROM retry_log WHERE ts < ?", (now - 600,))

                # Global cap check
                cur = conn.execute(
                    "SELECT COUNT(*) FROM retry_log WHERE event='request' AND ts >= ?",
                    (window_start_global,),
                )
                global_count = cur.fetchone()[0]
                if global_count >= self.global_per_min:
                    return False, 0.0

                # SRE adaptive throttle: R = requests, A = successes (within 2-min window per failure_class)
                R = conn.execute(
                    "SELECT COUNT(*) FROM retry_log "
                    "WHERE event='request' AND failure_class = ? AND ts >= ?",
                    (failure_class, window_start_sre),
                ).fetchone()[0]
                A = conn.execute(
                    "SELECT COUNT(*) FROM retry_log "
                    "WHERE event='success' AND failure_class = ? AND ts >= ?",
                    (failure_class, window_start_sre),
                ).fetchone()[0]
                # SRE throttle only fires when there is acceptance history (A > 0).
                # With A=0 the formula would aggressively reject a fresh failure_class
                # that has never had a confirmed success, which is not the SRE intent
                # (Ch.21 assumes steady-state with known accept rate).
                if A > 0:
                    p_reject = max(0.0, (R - self.K * A) / (R + 1))
                    if random.random() < p_reject:
                        return False, 0.0

                # Record request
                conn.execute(
                    "INSERT INTO retry_log (failure_class, event, ts) VALUES (?, 'request', ?)",
                    (failure_class, now),
                )
                conn.commit()

            # AWS full-jitter backoff
            window = min(self.cap, self.base * (2**attempt))
            wait = random.uniform(0, window)
            return True, wait

    def record_success(self, failure_class: str) -> None:
        """Record a successful outcome (lowers future p_reject via SRE adaptive)."""
        with self._lock:
            now = self._now()
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "INSERT INTO retry_log (failure_class, event, ts) VALUES (?, 'success', ?)",
                    (failure_class, now),
                )
                conn.commit()

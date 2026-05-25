"""W375 JuryQuotaLedger — SQLite-backed rolling-window quota for L3 GPT-5.5 jury (Path B).

Cite: spec §5 v6 + V10 (Stripe-style idempotent reservation) + codex r2 [DIM-8]
(jury exhaust → DEFER, never Ollama).

Quota window: rolling 5 hours (matches ChatGPT Plus 15-80 msg / 5h floor per V2).
Max default: 10 jury runs / 5h (operator-tunable via W375_JURY_QUOTA_5H env).
DB default: $W375_JURY_QUOTA_DB or sibling-of-event-store path.
"""

from __future__ import annotations

import os
import secrets
import sqlite3
import threading
import time

from temporalio import activity

WINDOW_SECONDS = 5 * 3600  # 5h rolling window


class QuotaExhausted(Exception):
    """Raised when jury quota cap reached within the current rolling window."""


class JuryQuotaLedger:
    """SQLite-backed atomic acquire/release with rolling-window quota check."""

    def __init__(self, db_path: str, max_per_5h: int = 10):
        self.db_path = db_path
        self.max_per_5h = max_per_5h
        self._lock = threading.Lock()
        self._init_db()

    def _init_db(self) -> None:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS jury_quota (
                    token TEXT PRIMARY KEY,
                    conversation_id TEXT NOT NULL,
                    acquired_at REAL NOT NULL,
                    released_at REAL,
                    status TEXT NOT NULL DEFAULT 'IN_USE'
                )
            """)
            conn.commit()

    def _now(self) -> float:
        return time.time()

    def acquire(self, conversation_id: str) -> str:
        """Atomic acquire; raises QuotaExhausted if rolling-window cap hit."""
        with self._lock:
            now = self._now()
            window_start = now - WINDOW_SECONDS
            with sqlite3.connect(self.db_path) as conn:
                # Count only IN_USE slots acquired within the rolling window.
                # Released slots free their slot immediately (release_frees_slot
                # semantics per spec §5 v6 V10). The window bound ensures that
                # very old un-released (stale/crashed) sessions age out of the
                # cap automatically after 5h rather than blocking forever.
                cur = conn.execute(
                    "SELECT COUNT(*) FROM jury_quota "
                    "WHERE acquired_at >= ? AND status = 'IN_USE'",
                    (window_start,),
                )
                count = cur.fetchone()[0]
                if count >= self.max_per_5h:
                    raise QuotaExhausted(
                        f"jury quota exhausted: {count}/{self.max_per_5h} in last 5h"
                    )
                token = f"jq-{secrets.token_urlsafe(12)}"
                conn.execute(
                    "INSERT INTO jury_quota (token, conversation_id, acquired_at, status) "
                    "VALUES (?, ?, ?, 'IN_USE')",
                    (token, conversation_id, now),
                )
                conn.commit()
                return token

    def release(self, token: str) -> None:
        """Release a token; idempotent + non-raising."""
        if not token:
            return
        with self._lock:
            now = self._now()
            with sqlite3.connect(self.db_path) as conn:
                conn.execute(
                    "UPDATE jury_quota SET released_at = ?, status = 'RELEASED' "
                    "WHERE token = ? AND status = 'IN_USE'",
                    (now, token),
                )
                conn.commit()


# Module-level singleton for activity wiring
_DEFAULT_LEDGER: JuryQuotaLedger | None = None
_LEDGER_LOCK = threading.Lock()


def _get_default_ledger() -> JuryQuotaLedger:
    global _DEFAULT_LEDGER
    with _LEDGER_LOCK:
        if _DEFAULT_LEDGER is None:
            db = os.environ.get(
                "W375_JURY_QUOTA_DB",
                "Z:/claude-sota-installed-state/w375/jury_quota.db",
            )
            os.makedirs(os.path.dirname(db), exist_ok=True)
            cap = int(os.environ.get("W375_JURY_QUOTA_5H", "10"))
            _DEFAULT_LEDGER = JuryQuotaLedger(db_path=db, max_per_5h=cap)
        return _DEFAULT_LEDGER


@activity.defn
async def acquire_jury_quota_activity(conversation_id: str) -> str:
    """Acquire a jury slot; raises QuotaExhausted if cap reached (workflow handles → DEFER)."""
    return _get_default_ledger().acquire(conversation_id)


@activity.defn
async def release_jury_quota_activity(token: str) -> None:
    """Release a jury slot; idempotent."""
    _get_default_ledger().release(token)

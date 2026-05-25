# agents/hmac_gate.py
"""HMAC two-phase confirm for FastMCP mutating tools (V12 critical + codex r5/r6 atomic single-use).

FastMCP stdio bypasses AuthMiddleware (V12 finding). Every mutating MCP tool
(dispatch / cancel / signal / retry) wraps a two-phase pattern:
  1. {action}_preview(...)  → returns {task_hash, nonce, expires_at}
  2. {action}_confirm(task_hash, hmac_token)
     where hmac_token = hmac_sha256(OPENHANDS_DISPATCH_TOKEN, task_hash + nonce).hex()

The PREVIEW_CACHE pop is atomic (threading.Lock) so a preview is single-use.
"""

import hashlib
import hmac
import os
import secrets
import threading
import time

PREVIEW_CACHE: dict[str, tuple] = {}  # task_hash → (spec_dump, nonce, expires_at)
_LOCK = threading.Lock()
TTL_SECONDS = 60

# codex r1 D2 S4 fix (W376 Stream D Task 25): nonce entropy raised 16 → 32 bytes.
# secrets.token_urlsafe(32) yields a base64url string of ≥43 chars (32 raw bytes),
# giving cryptographic-grade distinctness for the two-phase HMAC confirm nonce.
NONCE_ENTROPY_BYTES = 32


def generate_nonce() -> str:
    """Mint a single-use HMAC nonce with ≥32-byte cryptographic entropy.

    codex r1 D2 S4 fix: was secrets.token_urlsafe(16) inline in make_preview.
    Centralized here so the entropy floor is enforced in one place and regression-
    tested independently of the preview/confirm flow.
    """
    return secrets.token_urlsafe(NONCE_ENTROPY_BYTES)


def make_preview(spec_dump: str) -> dict:
    """Phase 1 — returns task_hash + nonce + expires_at for HMAC computation."""
    nonce = generate_nonce()
    expires_at = time.time() + TTL_SECONDS
    task_hash = hashlib.sha256(
        (spec_dump + nonce + str(expires_at)).encode()
    ).hexdigest()
    with _LOCK:
        PREVIEW_CACHE[task_hash] = (spec_dump, nonce, expires_at)
    return {"task_hash": task_hash, "nonce": nonce, "expires_at": expires_at}


def verify_confirm(task_hash: str, hmac_token: str) -> str | None:
    """Phase 2 — atomically pop + verify HMAC. Returns spec_dump on success, None otherwise."""
    with _LOCK:
        cached = PREVIEW_CACHE.pop(task_hash, None)
    if cached is None:
        return None
    spec_dump, nonce, expires_at = cached
    if expires_at < time.time():
        return None
    token = os.environ.get("OPENHANDS_DISPATCH_TOKEN", "")
    if not token:
        return None  # No token configured — fail closed
    expected = hmac.new(
        token.encode(),
        (task_hash + nonce).encode(),
        hashlib.sha256,
    ).hexdigest()
    if not hmac.compare_digest(hmac_token, expected):
        return None
    return spec_dump

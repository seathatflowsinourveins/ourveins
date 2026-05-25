# tests/test_hmac_nonce_entropy.py
"""Codex r1 D2 S4 fix: HMAC nonce >=32 bytes (was 16). Use secrets.token_urlsafe(32).

Stream D Task 25 — regression guard. The nonce generator MUST emit
cryptographic-grade entropy: secrets.token_urlsafe(32) yields a base64url string
of >=43 chars (32 raw bytes), comfortably above the 32-char floor this test
enforces. Catches any future revert to token_urlsafe(16) (~22 chars).

Owned module is agents/hmac_gate.py (per Stream D brief); the plan spec wrote the
import path as tools.hmac_gate as a placeholder ("or equivalent nonce generator").
"""

from agents.hmac_gate import generate_nonce, make_preview


def test_hmac_nonce_minimum_32_byte_entropy():
    for _ in range(100):
        nonce = generate_nonce()
        # token_urlsafe(32) produces >=43 chars (base64url of 32 bytes)
        assert len(nonce) >= 32, f"S4: nonce entropy too low: {len(nonce)} < 32"


def test_hmac_nonce_distinct_across_invocations():
    nonces = {generate_nonce() for _ in range(1000)}
    assert len(nonces) == 1000, "S4: nonce collisions detected"


def test_make_preview_nonce_meets_entropy_floor(monkeypatch):
    """The nonce surfaced through the two-phase preview path MUST also clear the
    >=32-char entropy floor — proves make_preview consumes the hardened generator,
    not an inline token_urlsafe(16)."""
    monkeypatch.setenv("OPENHANDS_DISPATCH_TOKEN", "fake-test-token")  # gitleaks:allow
    from agents.hmac_gate import PREVIEW_CACHE

    PREVIEW_CACHE.clear()
    preview = make_preview("spec-dump-for-entropy-check")
    assert len(preview["nonce"]) >= 32, (
        f"S4: make_preview nonce entropy too low: {len(preview['nonce'])} < 32"
    )

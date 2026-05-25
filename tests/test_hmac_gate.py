# tests/test_hmac_gate.py
import time
import hmac
import hashlib


def test_preview_then_confirm_succeeds(monkeypatch):
    monkeypatch.setenv("OPENHANDS_DISPATCH_TOKEN", "test-secret-token")
    from agents.hmac_gate import make_preview, verify_confirm, PREVIEW_CACHE

    PREVIEW_CACHE.clear()
    preview = make_preview("test-spec-dump")
    assert "task_hash" in preview and "nonce" in preview and "expires_at" in preview
    expected_hmac = hmac.new(
        b"test-secret-token",
        (preview["task_hash"] + preview["nonce"]).encode(),
        hashlib.sha256,
    ).hexdigest()
    spec = verify_confirm(preview["task_hash"], expected_hmac)
    assert spec == "test-spec-dump"


def test_preview_single_use_after_confirm(monkeypatch):
    monkeypatch.setenv("OPENHANDS_DISPATCH_TOKEN", "test-secret-token")
    from agents.hmac_gate import make_preview, verify_confirm, PREVIEW_CACHE

    PREVIEW_CACHE.clear()
    preview = make_preview("test-spec-dump")
    expected_hmac = hmac.new(
        b"test-secret-token",
        (preview["task_hash"] + preview["nonce"]).encode(),
        hashlib.sha256,
    ).hexdigest()
    verify_confirm(preview["task_hash"], expected_hmac)
    # Second attempt MUST fail (atomic pop = single-use)
    second = verify_confirm(preview["task_hash"], expected_hmac)
    assert second is None


def test_invalid_hmac_returns_none(monkeypatch):
    monkeypatch.setenv("OPENHANDS_DISPATCH_TOKEN", "test-secret-token")
    from agents.hmac_gate import make_preview, verify_confirm, PREVIEW_CACHE

    PREVIEW_CACHE.clear()
    preview = make_preview("test-spec-dump")
    assert verify_confirm(preview["task_hash"], "bogus-hmac") is None


def test_expired_preview_returns_none(monkeypatch):
    monkeypatch.setenv("OPENHANDS_DISPATCH_TOKEN", "test-secret-token")
    from agents.hmac_gate import make_preview, verify_confirm, PREVIEW_CACHE
    import agents.hmac_gate as hg

    monkeypatch.setattr(hg, "TTL_SECONDS", 0)  # immediate expiry
    PREVIEW_CACHE.clear()
    preview = make_preview("test-spec-dump")
    time.sleep(0.05)
    expected_hmac = hmac.new(
        b"test-secret-token",
        (preview["task_hash"] + preview["nonce"]).encode(),
        hashlib.sha256,
    ).hexdigest()
    assert verify_confirm(preview["task_hash"], expected_hmac) is None


def test_unknown_task_hash_returns_none(monkeypatch):
    monkeypatch.setenv("OPENHANDS_DISPATCH_TOKEN", "test-secret-token")
    from agents.hmac_gate import verify_confirm, PREVIEW_CACHE

    PREVIEW_CACHE.clear()
    assert verify_confirm("ff" * 32, "anything") is None

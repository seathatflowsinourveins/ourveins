# tests/test_retry_budget.py


def test_first_attempt_short_backoff(tmp_path):
    from agents.retry_budget import RetryBudget

    rb = RetryBudget(
        db_path=str(tmp_path / "rb.db"),
        global_per_min=60,
        K=2.0,
        base_backoff_sec=0.5,
        max_backoff_sec=60,
    )
    allowed, wait = rb.acquire("TransientError", attempt=0)
    assert allowed is True
    # attempt 0: sleep ∈ [0, min(cap, base*1)] = [0, 0.5]
    assert 0 <= wait <= 0.5


def test_attempt_n_exponential_backoff(tmp_path):
    from agents.retry_budget import RetryBudget

    rb = RetryBudget(
        db_path=str(tmp_path / "rb.db"),
        global_per_min=60,
        K=2.0,
        base_backoff_sec=0.5,
        max_backoff_sec=60,
    )
    allowed, wait = rb.acquire("TransientError", attempt=4)
    assert allowed is True
    # attempt 4: sleep ∈ [0, min(60, 0.5*2^4)=8]
    assert 0 <= wait <= 8.0


def test_attempt_capped_at_max_backoff(tmp_path):
    from agents.retry_budget import RetryBudget

    rb = RetryBudget(
        db_path=str(tmp_path / "rb.db"),
        global_per_min=60,
        K=2.0,
        base_backoff_sec=0.5,
        max_backoff_sec=10,
    )
    allowed, wait = rb.acquire("TransientError", attempt=20)
    assert allowed is True
    # attempt 20: even 0.5*2^20 huge, capped at 10
    assert 0 <= wait <= 10.0


def test_global_cap_rejects_after_60_per_min(tmp_path, monkeypatch):
    from agents.retry_budget import RetryBudget

    rb = RetryBudget(
        db_path=str(tmp_path / "rb.db"),
        global_per_min=5,
        base_backoff_sec=0.001,
        max_backoff_sec=0.001,
    )
    # Burn through 5 in same minute
    for i in range(5):
        ok, _ = rb.acquire("X", attempt=0)
        assert ok is True
    # 6th must be rejected
    ok, _ = rb.acquire("X", attempt=0)
    assert ok is False


def test_record_success_lowers_p_reject(tmp_path):
    from agents.retry_budget import RetryBudget

    rb = RetryBudget(
        db_path=str(tmp_path / "rb.db"),
        global_per_min=60,
        K=2.0,
        base_backoff_sec=0.001,
        max_backoff_sec=0.001,
    )
    # Generate some requests + accepts
    for _ in range(10):
        rb.acquire("X", attempt=0)
        rb.record_success("X")
    # After 10 succeeded, p_reject should be 0 → acquire still allows
    ok, _ = rb.acquire("X", attempt=0)
    assert ok is True

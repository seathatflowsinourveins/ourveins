"""W375 P3.5 — TDD tests for jury_activity + jury_quota.

Step 1 (RED): all tests fail because agents/jury_activity.py and
agents/jury_quota.py do not yet exist.
"""

import time
import pytest
from unittest.mock import patch

# ---------- jury_aggregate_activity tests ----------


@pytest.mark.asyncio
async def test_jury_aggregate_activity_wraps_aggregator():
    from agents.jury_activity import jury_aggregate_activity

    args = (
        {"events": []},
        {"verdict": "AMBIGUOUS", "source": "L1"},
        {"verdict": "AMBIGUOUS", "source": "L2"},
    )
    with patch("agents.jury_activity._invoke_jury_aggregator") as mock_jury:
        mock_jury.return_value = {
            "verdict": "ACCEPT",
            "votes": [1, 1, 0],
            "rationale": "2/3 accept",
        }
        result = await jury_aggregate_activity(args)
        assert result["verdict"] in ("ACCEPT", "BLOCK", "AMBIGUOUS")
        assert result["source"] == "L3-codex-jury"


@pytest.mark.asyncio
async def test_jury_aggregate_activity_handles_failure():
    from agents.jury_activity import jury_aggregate_activity

    args = ({"events": []}, {"verdict": "AMBIGUOUS"}, {"verdict": "AMBIGUOUS"})
    with patch("agents.jury_activity._invoke_jury_aggregator") as mock_jury:
        mock_jury.side_effect = RuntimeError("codex subprocess crashed")
        result = await jury_aggregate_activity(args)
        assert result["verdict"] == "BLOCK"  # Jury failure = conservative BLOCK
        assert "error" in result


# ---------- JuryQuotaLedger tests ----------


def test_quota_ledger_acquire_succeeds_within_cap(tmp_path, monkeypatch):
    from agents.jury_quota import JuryQuotaLedger

    db = str(tmp_path / "quota.db")
    ledger = JuryQuotaLedger(db_path=db, max_per_5h=3)
    token1 = ledger.acquire("conv-001")
    assert token1 is not None
    token2 = ledger.acquire("conv-002")
    assert token2 is not None


def test_quota_ledger_exhausts_at_cap(tmp_path):
    from agents.jury_quota import JuryQuotaLedger, QuotaExhausted

    db = str(tmp_path / "quota.db")
    ledger = JuryQuotaLedger(db_path=db, max_per_5h=2)
    ledger.acquire("conv-001")
    ledger.acquire("conv-002")
    with pytest.raises(QuotaExhausted):
        ledger.acquire("conv-003")


def test_quota_ledger_release_frees_slot(tmp_path):
    from agents.jury_quota import JuryQuotaLedger

    db = str(tmp_path / "quota.db")
    ledger = JuryQuotaLedger(db_path=db, max_per_5h=1)
    token = ledger.acquire("conv-001")
    ledger.release(token)
    # After release, new acquire should succeed
    token2 = ledger.acquire("conv-002")
    assert token2 is not None


def test_quota_ledger_window_resets_after_5h(tmp_path, monkeypatch):
    from agents.jury_quota import JuryQuotaLedger

    db = str(tmp_path / "quota.db")
    ledger = JuryQuotaLedger(db_path=db, max_per_5h=1)
    ledger.acquire("conv-001")
    # Fast-forward "now" by 5.5h via patching ledger._now
    monkeypatch.setattr(ledger, "_now", lambda: time.time() + 5.5 * 3600)
    # Now within new window — should succeed
    token = ledger.acquire("conv-002")
    assert token is not None


@pytest.mark.asyncio
async def test_acquire_release_activities(tmp_path, monkeypatch):
    from agents.jury_quota import (
        acquire_jury_quota_activity,
        release_jury_quota_activity,
    )

    db = str(tmp_path / "quota.db")
    monkeypatch.setenv("W375_JURY_QUOTA_DB", db)
    monkeypatch.setenv("W375_JURY_QUOTA_5H", "5")
    # Reset singleton
    import agents.jury_quota as jq

    jq._DEFAULT_LEDGER = None

    token = await acquire_jury_quota_activity("conv-test-001")
    assert token  # non-empty string
    await release_jury_quota_activity(token)

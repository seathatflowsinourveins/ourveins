# tests/test_cove_activity.py
"""W375 P3.3 TDD — L1 CoVe activity wrapper tests.

Tests verify_cove_activity dispatches to _invoke_cove (test-mockable indirection
to cove_verifier.py), normalises verdict, and returns AMBIGUOUS on internal failure.
"""

import pytest
from unittest.mock import patch


@pytest.mark.asyncio
async def test_verify_cove_activity_wraps_cove_verifier():
    from agents.cove_activity import verify_cove_activity

    trajectory = {"events": [{"type": "test"}], "conversation_id": "conv-001"}
    with patch("agents.cove_activity._invoke_cove") as mock_cove:
        mock_cove.return_value = {"verdict": "PASS", "score": 0.95, "factored": []}
        result = await verify_cove_activity(trajectory)
        assert result["verdict"] in ("PASS", "AMBIGUOUS", "FAIL")
        assert "source" in result
        mock_cove.assert_called_once()


@pytest.mark.asyncio
async def test_verify_cove_activity_handles_failure():
    from agents.cove_activity import verify_cove_activity

    trajectory = {"events": []}
    with patch("agents.cove_activity._invoke_cove") as mock_cove:
        mock_cove.side_effect = Exception("cove verifier internal error")
        result = await verify_cove_activity(trajectory)
        # On internal failure, return AMBIGUOUS (escalates to L3) rather than raising
        assert result["verdict"] == "AMBIGUOUS"
        assert "error" in result or "source" in result


@pytest.mark.asyncio
async def test_verify_cove_activity_returns_fail_on_discrepancies():
    from agents.cove_activity import verify_cove_activity

    trajectory = {"events": [{"type": "test"}], "conversation_id": "conv-002"}
    with patch("agents.cove_activity._invoke_cove") as mock_cove:
        mock_cove.return_value = {
            "verdict": "FAIL",
            "discrepancies": ["AC not measurable"],
            "score": 0.2,
        }
        result = await verify_cove_activity(trajectory)
        assert result["verdict"] == "FAIL"
        assert result["source"] == "L1-CoVe"


@pytest.mark.asyncio
async def test_verify_cove_activity_unknown_verdict_coerced_to_ambiguous():
    from agents.cove_activity import verify_cove_activity

    trajectory = {"events": []}
    with patch("agents.cove_activity._invoke_cove") as mock_cove:
        mock_cove.return_value = {"verdict": "UNKNOWN_JUNK", "score": 0.5}
        result = await verify_cove_activity(trajectory)
        assert result["verdict"] == "AMBIGUOUS"
        assert result["source"] == "L1-CoVe"

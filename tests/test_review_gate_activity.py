# tests/test_review_gate_activity.py
"""TDD tests for W375 P3.4 — L2 review-gate activity.

review_gate_activity wraps agents/review_gate.py (W374-EXT sandbox-test fail-fast).
The activity translates a trajectory dict → TaskResult → ReviewGateVerdict → normalized dict.

Verdict mapping (per spec §8 v6 + review_gate.Verdict values):
    SHORT_CIRCUIT_FAILED  → FAIL   (executor status=FAILED; no review needed)
    SHORT_CIRCUIT_REVISE  → FAIL   (in-sandbox tests failed; auto-REVISE)
    FALL_THROUGH_TO_CODEX → PASS   (Codex adjudicates; gate passed through)
    internal exception    → AMBIGUOUS (escalates to L3 jury)
"""

import pytest
from unittest.mock import patch


@pytest.mark.asyncio
async def test_review_gate_activity_wraps_review_gate():
    from agents.review_gate_activity import review_gate_activity

    trajectory = {"events": [], "conversation_id": "conv-001"}
    with patch("agents.review_gate_activity._invoke_review_gate") as mock_rg:
        mock_rg.return_value = {"verdict": "PASS", "tests_run": 5, "passed": 5}
        result = await review_gate_activity(trajectory)
        assert result["verdict"] in ("PASS", "AMBIGUOUS", "FAIL")
        assert result["source"] == "L2-review-gate"


@pytest.mark.asyncio
async def test_review_gate_activity_handles_failure():
    from agents.review_gate_activity import review_gate_activity

    with patch("agents.review_gate_activity._invoke_review_gate") as mock_rg:
        mock_rg.side_effect = RuntimeError("sandbox spin-up failed")
        result = await review_gate_activity({"events": []})
        assert result["verdict"] == "AMBIGUOUS"
        assert "error" in result


@pytest.mark.asyncio
async def test_review_gate_activity_propagates_fail_verdict():
    from agents.review_gate_activity import review_gate_activity

    with patch("agents.review_gate_activity._invoke_review_gate") as mock_rg:
        mock_rg.return_value = {"verdict": "FAIL", "reason": "tests failed"}
        result = await review_gate_activity({"events": []})
        assert result["verdict"] == "FAIL"

"""W375 L2 review-gate activity wrapping agents/review_gate.py (sandbox-test fail-fast).

Per spec §8 v6: L2 spawns its OWN DockerWorkspace for sandbox-test isolation
(L1 uses stored trajectory; L2 needs a fresh sandbox).

On internal failure (sandbox spin-up, test runner crash) returns AMBIGUOUS
verdict — escalates to L3 jury rather than raising.

Verdict mapping (review_gate.Verdict → L2 normalized):
    SHORT_CIRCUIT_FAILED  → FAIL   (executor status=FAILED; no review needed)
    SHORT_CIRCUIT_REVISE  → FAIL   (in-sandbox tests failed; auto-REVISE)
    FALL_THROUGH_TO_CODEX → PASS   (gate passes through to Codex adjudication)
    internal exception    → AMBIGUOUS (escalates to L3 jury)
"""

from __future__ import annotations

import structlog
from temporalio import activity

log = structlog.get_logger(__name__)

# Mapping from review_gate.Verdict string values → L2 normalized verdict space
_VERDICT_MAP: dict[str, str] = {
    "SHORT_CIRCUIT_FAILED": "FAIL",
    "SHORT_CIRCUIT_REVISE": "FAIL",
    "FALL_THROUGH_TO_CODEX": "PASS",
}


def _invoke_review_gate(trajectory: dict) -> dict:
    """Call into agents/review_gate.py; isolated for test mocking.

    Converts the trajectory dict into a TaskResult, invokes review_gate(),
    then normalizes the ReviewGateVerdict into the L2 verdict dict format.

    Returns a dict with at minimum:
        {"verdict": "PASS"|"AMBIGUOUS"|"FAIL", ...extra fields}
    """
    from agents.models import TaskResult, TaskStatus
    from agents.review_gate import review_gate

    # Build a minimal TaskResult from the trajectory dict.
    # The trajectory carries executor output; map the most relevant fields.
    status_raw = trajectory.get("status", "COMPLETE")
    # Guard against unknown status strings — default to COMPLETE (conservative).
    try:
        status = TaskStatus(status_raw)
    except ValueError:
        status = TaskStatus.COMPLETE

    task_result = TaskResult(
        status=status,
        result=trajectory.get("result"),
        cost_usd=trajectory.get("cost_usd"),
        conversation_id=trajectory.get("conversation_id"),
        events_processed=len(trajectory.get("events", [])),
        error=trajectory.get("error"),
    )

    gate_verdict = review_gate(task_result)

    # Normalize internal Verdict → L2 space
    internal_kind: str = gate_verdict.kind.value  # e.g. "SHORT_CIRCUIT_FAILED"
    normalized = _VERDICT_MAP.get(internal_kind, "AMBIGUOUS")

    return {
        "verdict": normalized,
        "gate_kind": internal_kind,
        "rationale": gate_verdict.rationale,
    }


@activity.defn
async def review_gate_activity(trajectory: dict) -> dict:
    """L2 review-gate — sandbox-test fail-fast on trajectory.

    On internal failure: AMBIGUOUS (escalates to L3) rather than raising.
    """
    try:
        result = _invoke_review_gate(trajectory)
        verdict = result.get("verdict", "AMBIGUOUS").upper()
        if verdict not in ("PASS", "AMBIGUOUS", "FAIL"):
            verdict = "AMBIGUOUS"
        return {
            "verdict": verdict,
            "source": "L2-review-gate",
            **{k: v for k, v in result.items() if k not in ("verdict", "source")},
        }
    except Exception as e:
        log.warning("review_gate_activity_failed", error=str(e))
        return {
            "verdict": "AMBIGUOUS",
            "source": "L2-review-gate",
            "error": str(e)[:200],
        }

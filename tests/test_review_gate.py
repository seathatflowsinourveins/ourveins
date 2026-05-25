"""Unit tests for the pre-L3 sandbox test gate (W374-EXT Task 8 A2).

Per V2 plan Task 8 + Task 7 carry-forward lessons + Task 8 polish review:
  - 4 plan tests cover the four primary code paths
  - 3 carry-forward tests cover BUDGET_PARTIAL / CANCELLED / contradictory-state
    fail-CLOSED semantics (status takes precedence over tests_passed)
  - 2 polish-review tests (I-2 + M-3) cover the defensive-default branch and
    the rationale-non-empty contract enforced by ReviewGateVerdict.__post_init__

All assertions use the Verdict(str, Enum) members (not raw string literals)
so typo-drift on the verdict-kind strings is structurally detectable per
I-1 of the Task 8 code-quality review.
"""

import pytest

from agents.models import TaskResult, TaskStatus
from agents.review_gate import ReviewGateVerdict, Verdict, review_gate


# ---- 4 plan tests ----------------------------------------------------------


def test_short_circuits_when_tests_failed():
    r = TaskResult(
        status=TaskStatus.COMPLETE,
        result="patch applied",
        tests_passed=False,
        tests_added=0,
    )
    v = review_gate(r)
    assert isinstance(v, ReviewGateVerdict)
    assert v.kind == Verdict.SHORT_CIRCUIT_REVISE
    assert "tests" in v.rationale.lower()


def test_falls_through_when_tests_passed():
    r = TaskResult(
        status=TaskStatus.COMPLETE,
        result="patch + tests",
        tests_passed=True,
        tests_added=3,
        coverage_delta_pct=4.2,
    )
    v = review_gate(r)
    assert v.kind == Verdict.FALL_THROUGH_TO_CODEX


def test_falls_through_when_tests_unknown():
    r = TaskResult(
        status=TaskStatus.COMPLETE,
        result="patch (no test info)",
        tests_passed=None,
    )
    v = review_gate(r)
    assert v.kind == Verdict.FALL_THROUGH_TO_CODEX
    assert "unknown" in v.rationale.lower() or "no test" in v.rationale.lower()


def test_short_circuits_on_failed_status_distinct_from_tests():
    """Existing FAILED status path short-circuits (no Codex needed for known failure)."""
    r = TaskResult(
        status=TaskStatus.FAILED,
        error="OpenHands run errored",
        tests_passed=None,
    )
    v = review_gate(r)
    assert (
        v.kind == Verdict.SHORT_CIRCUIT_FAILED
    )  # distinct from REVISE per sca-v20 D78


# ---- 3 carry-forward tests per Task 7 lessons ------------------------------


def test_budget_partial_falls_through_to_codex():
    """Partial outcomes need adjudication; codex evaluates patch-so-far quality."""
    r = TaskResult(
        status=TaskStatus.BUDGET_PARTIAL,
        result="partial patch",
        tests_passed=None,
    )
    v = review_gate(r)
    assert v.kind == Verdict.FALL_THROUGH_TO_CODEX


def test_cancelled_falls_through_to_codex():
    """Operator cancellation still benefits from codex review of the partial work."""
    r = TaskResult(
        status=TaskStatus.CANCELLED,
        result="cancelled patch",
        tests_passed=None,
    )
    v = review_gate(r)
    assert v.kind == Verdict.FALL_THROUGH_TO_CODEX


def test_status_takes_precedence_over_tests_passed():
    """Contradictory state (status=FAILED but tests_passed=True) — status wins per fail-CLOSED."""
    r = TaskResult(
        status=TaskStatus.FAILED,
        error="run errored despite tests passing",
        tests_passed=True,
    )
    v = review_gate(r)
    assert v.kind == Verdict.SHORT_CIRCUIT_FAILED


# ---- 2 polish-review tests (I-2 + M-3) -------------------------------------


def test_defensive_default_routes_unknown_status_to_codex():
    """The defensive default branch (Branch 7) handles future TaskStatus
    extensions OR out-of-band status values via pydantic's model_construct
    (bypassing enum validation). Per fail-CLOSED contract: unknown status
    falls through to Codex, NOT crashes.

    model_construct is the right escape hatch because pydantic's normal
    TaskResult(status=...) constructor would reject a non-enum string.
    """
    # model_construct bypasses pydantic enum validation, simulating a future-
    # enum-variant or a deserialized payload from a newer producer.
    r = TaskResult.model_construct(status="FUTURE_VARIANT_X", tests_passed=None)
    v = review_gate(r)
    assert v.kind == Verdict.FALL_THROUGH_TO_CODEX
    lowered = v.rationale.lower()
    assert "unknown" in lowered or "fail-closed" in lowered or "default" in lowered


def test_rationale_empty_raises():
    """ReviewGateVerdict.__post_init__ enforces rationale-non-empty per M-3.

    A blank/whitespace rationale defeats the operator-audit invariant; the
    dataclass MUST raise ValueError at construction time per fail-CLOSED +
    CR-6 verify-before-claim discipline.
    """
    with pytest.raises(ValueError, match="non-empty"):
        ReviewGateVerdict(kind=Verdict.FALL_THROUGH_TO_CODEX, rationale="")
    # Whitespace-only also rejected.
    with pytest.raises(ValueError, match="non-empty"):
        ReviewGateVerdict(kind=Verdict.FALL_THROUGH_TO_CODEX, rationale="   \t\n")

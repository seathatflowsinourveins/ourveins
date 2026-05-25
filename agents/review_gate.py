"""Pre-L3 sandbox test gate — fail-fast filter before invoking the Codex Stop-hook.

W374-EXT Task 8 (A2) implementation. Saves expensive Codex tokens for the cases
where L3 cross-model adjudication actually matters: if the OpenHands executor
ran tests in-sandbox and they failed, that is an automatic REVISE that does
not need (and would only confirm) a Codex round.

Cite-anchors (CR-6 verify-before-claim — 3-org-distinct):
  - Google SRE Book Ch.17 "Testing for Reliability" (Google LLC) — fail-fast
    on CI test failures before review; do not gate review on already-broken code.
  - sca-v20 D78 budget-cap-enforcement (.claude/skills/sota-convergence-audit/
    SKILL.md) — do not spend a budget round on a deterministic-fail outcome.
  - Anthropic claude-cookbooks evaluator-optimizer pattern — short-circuit
    obvious-rework cases before the expensive evaluator round.

Decision table (status x tests_passed):

    status            tests_passed   verdict                  why
    ----------------  -------------  -----------------------  ----------------------
    FAILED            *              SHORT_CIRCUIT_FAILED     known failure; no review
    COMPLETE          False          SHORT_CIRCUIT_REVISE     executor self-reported fail
    COMPLETE          True           FALL_THROUGH_TO_CODEX    Codex adjudicates AC>tests
    COMPLETE          None           FALL_THROUGH_TO_CODEX    unknown; Codex decides
    BUDGET_PARTIAL    *              FALL_THROUGH_TO_CODEX    partial work; needs judgment
    CANCELLED         *              FALL_THROUGH_TO_CODEX    operator cancel; review patch

Precedence: status takes precedence over tests_passed. A contradictory state
(status=FAILED + tests_passed=True) resolves to SHORT_CIRCUIT_FAILED — fail-CLOSED.
The `*` notation marks pattern-match-style don't-care for tests_passed in those rows.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum, unique

from agents.models import TaskResult, TaskStatus


@unique
class Verdict(str, Enum):
    """Sanctioned outcomes from review_gate.

    str-subclassed so members compare-equal to their string-value (JSON-
    serialization friendly + backward-compatible with any string-compare call
    sites in Task 10 dispatch_temporal wiring).
    """

    SHORT_CIRCUIT_FAILED = "SHORT_CIRCUIT_FAILED"
    """Known-failure outcomes (status=FAILED); no Codex review needed."""

    SHORT_CIRCUIT_REVISE = "SHORT_CIRCUIT_REVISE"
    """In-sandbox tests failed (COMPLETE + tests_passed=False); auto-REVISE
    without firing a Codex round (saves Codex tokens per sca-v20 D78)."""

    FALL_THROUGH_TO_CODEX = "FALL_THROUGH_TO_CODEX"
    """Codex L3 adjudicates (default safe path for ambiguous / partial cases)."""


def _fmt_coverage(pct: float) -> str:
    """Format coverage-delta percent for operator-readable rationales.

    Returns "+N.NN%" / "-N.NN%" with explicit sign, or the literal "0.00%
    (no delta)" when the delta is exactly zero. Centralized so every branch
    of review_gate that references coverage_delta_pct formats it identically
    (M-2 quality lift).
    """
    if pct == 0.0:
        return "0.00% (no delta)"
    return f"{pct:+.2f}%"


@dataclass(frozen=True, slots=True)
class ReviewGateVerdict:
    """Result of the pre-L3 review-gate filter.

    Consumed by the dispatch CLI (wired in Task 10 per V2 deferral) to decide
    whether to fire a Codex Stop-hook round or short-circuit straight to REVISE.
    """

    kind: Verdict
    """Verdict enum member. See `Verdict` for the three sanctioned outcomes."""

    rationale: str
    """Operator-readable explanation of WHY this verdict was reached. Always
    states the input fields that drove the decision (status + tests_passed
    tristate) so the operator can audit the gate's reasoning. MUST be
    non-empty (enforced by __post_init__ per fail-CLOSED + CR-6 verify-
    before-claim discipline)."""

    def __post_init__(self) -> None:
        # M-3: enforce rationale-non-empty contract. A blank rationale would
        # silently defeat the operator-audit invariant ("always states the
        # input fields that drove the decision"). Per fail-CLOSED + CR-6
        # verify-before-claim, the gate MUST surface its reasoning.
        if not self.rationale or not self.rationale.strip():
            raise ValueError(
                "ReviewGateVerdict.rationale MUST be non-empty "
                "(operator-readable diagnostic per fail-CLOSED + CR-6)."
            )


def review_gate(result: TaskResult) -> ReviewGateVerdict:
    """Decide whether to short-circuit Codex or fall through to a Codex round.

    Enumerates all four TaskStatus enum values across six code paths
    (COMPLETE is split by tests_passed tristate: True/False/None) + a
    defensive default for unknown status. The `status` field takes
    precedence over `tests_passed`: a FAILED status short-circuits to
    SHORT_CIRCUIT_FAILED regardless of any tests_passed value the executor
    might have set (defensive — contradictory state is treated as failure).

    Args:
        result: Executor TaskResult to evaluate.

    Returns:
        ReviewGateVerdict with one of three Verdict kinds plus a diagnostic
        rationale.
    """
    # Branch 1: FAILED status — short-circuit regardless of tests_passed value
    # (defensive against contradictory state per fail-CLOSED discipline).
    if result.status is TaskStatus.FAILED:
        # M-5: split !r from the OR-fallback so the !r quoting only applies to
        # the actual error string, never to the literal "unspecified" fallback.
        error_text = result.error or "unspecified"
        return ReviewGateVerdict(
            kind=Verdict.SHORT_CIRCUIT_FAILED,
            rationale=(
                f"status=FAILED short-circuits to SHORT_CIRCUIT_FAILED "
                f"(no Codex round needed for known executor failure). "
                f"error={error_text!r}"
            ),
        )

    # Branch 2: COMPLETE + tests_passed is False — executor self-reported
    # in-sandbox test failure; short-circuit to REVISE without firing Codex.
    if result.status is TaskStatus.COMPLETE and result.tests_passed is False:
        return ReviewGateVerdict(
            kind=Verdict.SHORT_CIRCUIT_REVISE,
            rationale=(
                "status=COMPLETE but tests_passed=False — in-sandbox tests "
                "failed; patch is REVISE-pending without Codex review (saves "
                f"Codex tokens per sca-v20 D78 + Google SRE Ch.17). "
                f"coverage_delta_pct={_fmt_coverage(result.coverage_delta_pct)}."
            ),
        )

    # Branch 3: COMPLETE + tests_passed is True — Codex adjudicates whether
    # the patch satisfies the AC beyond just the test outcomes.
    if result.status is TaskStatus.COMPLETE and result.tests_passed is True:
        return ReviewGateVerdict(
            kind=Verdict.FALL_THROUGH_TO_CODEX,
            rationale=(
                "status=COMPLETE and tests_passed=True — Codex adjudicates "
                f"AC coverage beyond tests (tests_added={result.tests_added}, "
                f"coverage_delta_pct={_fmt_coverage(result.coverage_delta_pct)})."
            ),
        )

    # Branch 4: COMPLETE + tests_passed is None — unknown test status; default
    # to Codex adjudication (safe path; Codex decides).
    if result.status is TaskStatus.COMPLETE and result.tests_passed is None:
        return ReviewGateVerdict(
            kind=Verdict.FALL_THROUGH_TO_CODEX,
            rationale=(
                "status=COMPLETE but tests_passed is unknown (no test info "
                f"from OpenHands sandbox); Codex adjudicates by default. "
                f"coverage_delta_pct={_fmt_coverage(result.coverage_delta_pct)}."
            ),
        )

    # Branch 5: BUDGET_PARTIAL — partial outcomes need Codex judgment.
    if result.status is TaskStatus.BUDGET_PARTIAL:
        return ReviewGateVerdict(
            kind=Verdict.FALL_THROUGH_TO_CODEX,
            rationale=(
                "status=BUDGET_PARTIAL — partial outcome; Codex adjudicates "
                f"patch-so-far quality before any continue/abandon decision. "
                f"coverage_delta_pct={_fmt_coverage(result.coverage_delta_pct)}."
            ),
        )

    # Branch 6: CANCELLED — operator cancellation; Codex still reviews the
    # partial patch so the operator has informed re-dispatch context.
    if result.status is TaskStatus.CANCELLED:
        return ReviewGateVerdict(
            kind=Verdict.FALL_THROUGH_TO_CODEX,
            rationale=(
                "status=CANCELLED — operator cancellation; Codex reviews the "
                f"partial patch to give the operator informed re-dispatch "
                f"context. coverage_delta_pct={_fmt_coverage(result.coverage_delta_pct)}."
            ),
        )

    # Defensive default (Branch 7): any unknown status value (e.g. a future
    # TaskStatus enum extension reaching this code before review_gate is
    # updated, or an out-of-band string status via pydantic model_construct)
    # is treated fail-CLOSED — fall through to Codex so a human/Codex can
    # adjudicate. Covered by test_defensive_default_routes_unknown_status_to_codex.
    return ReviewGateVerdict(
        kind=Verdict.FALL_THROUGH_TO_CODEX,
        rationale=(
            f"unknown status={result.status!r}; falling through to Codex "
            "for safe adjudication (fail-CLOSED default)."
        ),
    )

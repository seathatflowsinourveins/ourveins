"""CISC confidence-weighted majority aggregator for the L3 Jury-on-Demand
3-judge codex panel (W374-EXT Task 9 A3).

The aggregator consumes three PanelResult objects produced by
`tools/codex-jury-panel.mjs` (one panel per codex round, with panel-2
running TaskResult -> TaskSpec position-swap) and returns a single
JuryVerdict carrying the final adjudication, position-swap-consistency
flag, and operator-readable rationale.

The CISC variant (Confidence-Informed Self-Consistency, Taubenfeld+ 2025
arXiv:2502.06233) weights each panel's verdict by its self-reported
confidence rather than equal-weight MaxPool, preventing the canonical
failure mode where two low-confidence APPROVE votes drown out a single
high-confidence BLOCK finding (critical-bug-finder pattern). The
haizelabs/verdict v0.2.7 reference implementation exposes both MaxPool and
confidence-weighted aggregators; this module specializes the confidence-
weighted variant for the 3-judge codex-panel use case.

Cite-anchors (CR-6 verify-before-claim --- 3-org-distinct):
  - Taubenfeld+ 2025 CISC ``arXiv:2502.06233`` "Confidence Improves
    Self-Consistency in LLMs" (Google Research / Hebrew University /
    Technion --- primary peer-reviewed source for the CISC confidence-
    weighted majority vote that this aggregator implements; verified
    via abstract on 2026-05-22).
  - Zhao+ 2025 CARE ``OpenReview XdcofpTCyq`` "From Many Voices to One:
    Statistically Principled Aggregation of LLM Judges" (UW-Madison ---
    NeurIPS 2025 Workshop on LLM Evaluation; latent-factor MRF aggregation
    framework that motivates explicit position-swap-consistency tracking
    in this module's JuryVerdict surface; verified on 2026-05-22, prior
    "LLM Jury-on-Demand" label in this docstring was an internal nickname,
    NOT the paper's actual title).
  - Zheng+ 2023 MT-Bench ``arXiv:2306.05685`` --- UC Berkeley / Stanford /
    EPFL; broadly anchors LLM-as-judge + position-swap as canonical
    judging protocols. The specific demote-APPROVE-on-swap-inconsistency
    rule in Branch 2 below is a project-engineering elaboration of MT-
    Bench's position-bias mitigation, NOT a verbatim recommendation from
    the paper.
  - Wang+ 2023 JudgeLM ``arXiv:2310.17631`` --- Beihang / Tencent; jury
    aggregation methodology and benchmarks.
  - haizelabs/verdict v0.2.7 MIT (Haize Labs Inc) --- Unit / Layer / Block
    primitives; MaxPool + MeanPool aggregators that this CISC variant
    refines for the codex-panel use case (already studied at the runtime's
    T6 basic-memory note ``main/verdicts/w317-haizelabs-verdict``).

Engineering notes (project-invented design choices --- NOT externally cited):
  - ``CISC_MARGIN_THRESHOLD = 0.2`` default: project-engineering choice for
    3-panel CISC aggregation; Taubenfeld+ 2025 CISC does NOT prescribe a
    specific threshold for 3-judge ensembles (their experiments operate on
    self-consistency over many sampled paths, not a fixed 3-judge jury).
    The 0.2 value was chosen as ``(top - runner_up) >= ~20% of full unit
    interval`` --- enough margin to favor decisive verdicts while
    surfacing genuine splits as NEEDS_ROUND_2. Tunable via env var (see
    R-A below). Operators should A/B-sweep this value for their workload.
  - Branch-0 full-3-way-disagreement -> NEEDS_ROUND_2 override: also a
    project-engineering choice. CISC's weighted-vote alone could pick a
    single high-confidence "winner" out of 3 distinct verdicts, but this
    aggregator surfaces such a split as NEEDS_ROUND_2 so the operator can
    re-dispatch with a stricter spec or run another jury round.
    Captures the canonical "weak APPROVE + weak REVISE + strong BLOCK"
    pattern. NOT prescribed by any of the cited papers; engineering
    rationale only.

Contract surface:
    PanelVerdict   --- @unique str-Enum of the 4 per-panel codex verdicts.
    FinalVerdict   --- @unique str-Enum of the 4 aggregated jury outcomes.
    PanelResult    --- frozen dataclass; one per codex round. 6 fields, all
                       documented inline; __post_init__ enforces enum
                       membership, rationale non-emptyness, panel_id
                       positivity, confidence-in-unit-interval.
    JuryVerdict    --- frozen dataclass; the aggregator's output. 4 fields;
                       __post_init__ enforces final_verdict enum membership
                       and rationale non-emptyness.
    jury_aggregate --- pure function ``list[PanelResult] -> JuryVerdict``.
                       No IO, no global state; trivially testable.

Invariants enforced by ``jury_aggregate`` (fail-CLOSED on violation):
    1. len(panels) == 3                          --- ValueError otherwise
    2. exactly 1 panel has position_swap=True    --- ValueError otherwise
    3. CISC-weighted top verdict wins UNLESS:
         (a) CISC margin < CISC_MARGIN_THRESHOLD --- NEEDS_ROUND_2
         (b) top is APPROVE but swap-inconsistent --- demoted to REVISE
    4. defensive default for all other ambiguous states --- NEEDS_ROUND_2

The 0.2 CISC margin threshold is a PROJECT-ENGINEERING DEFAULT (see the
"Engineering notes" block above); constant ``CISC_MARGIN_THRESHOLD`` is
module-level for re-tuning without re-shipping the module body. The
threshold is overridable via the ``CISC_MARGIN_THRESHOLD`` environment
variable at module-import time (R-A: enables operator re-tuning without
code change for shadow A/B sweeps).

FP precision behavior (R-C):
    Margin comparisons use strict-less-than (``margin < CISC_MARGIN_THRESHOLD``).
    Due to IEEE-754 floating-point imprecision, marginal cases (e.g.
    ``0.6 - 0.4 == 0.19999999999999996`` in CPython 3.13) may flip the
    decision relative to a naive decimal expectation. The :.4f display format
    used in rationales surfaces this honestly so operators see the FP-exact
    value rather than a rounded :.2f that hides the discrepancy ("margin=0.20
    < threshold=0.20" was the canonical operator-confusion failure mode
    pre-fix-up). Operators who need decimal-exact margin behavior should
    layer a Decimal/Fraction wrapper outside this module --- the aggregator
    deliberately surfaces the FP behavior rather than masking it.
"""

from __future__ import annotations

import os
from collections import defaultdict
from dataclasses import dataclass, field
from enum import Enum, unique


# CISC margin threshold below which the jury is considered "split" and a
# second round is recommended rather than committing to the top verdict.
# 0.2 is a PROJECT-ENGINEERING DEFAULT (NOT cited from Taubenfeld+ 2025
# CISC arXiv:2502.06233 --- that paper operates on N-path self-consistency
# rather than a fixed 3-judge jury, so it does not prescribe a 3-judge
# threshold). Rationale: 0.2 == 20% of the [0.0, 1.0] confidence support,
# trading split-surfacing sensitivity against false-positive NEEDS_ROUND_2.
# Operators should A/B-sweep this value for their workload via the env var.
# R-A: env-var override for shadow A/B sweeps without re-shipping the module.
# Read at import time --- env mutations after import are ignored by design
# (deterministic per-process threshold; per-call override is out of scope).
CISC_MARGIN_THRESHOLD: float = float(os.environ.get("CISC_MARGIN_THRESHOLD", "0.2"))


@unique
class PanelVerdict(str, Enum):
    """Per-panel codex round outcomes.

    Matches the existing W335 codex Stop-hook verdict surface; ``NEEDS-REVISION``
    is hyphenated to align with the current Stop-hook trailer convention.
    """

    APPROVE = "APPROVE"
    """Panel found no blocking issues."""

    REVISE = "REVISE"
    """Panel found minor issues; patch should be refined before merge."""

    NEEDS_REVISION = "NEEDS-REVISION"
    """W335 Stop-hook synonym for REVISE; hyphenated per current trailer
    convention. Distinct enum member to preserve forward-compat with codex
    outputs that emit either spelling."""

    BLOCK = "BLOCK"
    """Panel found a blocking issue (security, correctness, AC drift)."""


@unique
class FinalVerdict(str, Enum):
    """Aggregated jury outcomes.

    Distinct from PanelVerdict: aggregator-only NEEDS_ROUND_2 signals that
    the jury was split and a second round of dispatch is recommended (or the
    operator must adjudicate manually). No NEEDS-REVISION alias here ---
    aggregator normalizes both PanelVerdict.REVISE and PanelVerdict.NEEDS_REVISION
    to FinalVerdict.REVISE.
    """

    APPROVE = "APPROVE"
    """Jury reached confident APPROVE; downstream merge allowed."""

    REVISE = "REVISE"
    """Jury reached confident REVISE; downstream must apply changes before merge."""

    BLOCK = "BLOCK"
    """Jury reached confident BLOCK; downstream must abandon or re-spec."""

    NEEDS_ROUND_2 = "NEEDS_ROUND_2"
    """Jury was split (CISC margin below threshold OR fully 3-way disagreement);
    operator should re-dispatch with a stricter spec or run another jury round.
    Underscore-separated (vs PanelVerdict.NEEDS_REVISION hyphenation) to make
    the two enum members textually distinguishable in JSON output."""


# Module-level sets for fast O(1) verdict membership checks (avoids repeated
# Enum-cast attempts inside __post_init__ on hot paths).
_PANEL_VERDICT_VALUES: frozenset[str] = frozenset(v.value for v in PanelVerdict)
_FINAL_VERDICT_VALUES: frozenset[str] = frozenset(v.value for v in FinalVerdict)


def _validate_rationale(rationale: str, field_name: str) -> None:
    """Shared rationale-non-empty guard (Task 8 M-3 carry-forward)."""
    if not isinstance(rationale, str):
        raise ValueError(
            f"{field_name} MUST be a string (got {type(rationale).__name__})."
        )
    if not rationale or not rationale.strip():
        raise ValueError(
            f"{field_name} MUST be non-empty (operator-readable diagnostic "
            "per fail-CLOSED + CR-6 verify-before-claim)."
        )


# Per-field validators extracted from PanelResult.__post_init__ (M-6 depth lift).
# Each validator is module-private + side-effect-free except for the one
# Enum-coercion path that uses object.__setattr__ on the frozen dataclass
# instance --- that one returns the coerced value and the caller writes it.


def _validate_panel_id(panel_id: object) -> None:
    """Reject non-int / bool / non-positive panel_id (M-6 extraction).

    bool is a subclass of int in Python (``isinstance(True, int) is True``);
    we reject explicit booleans because they are almost always a caller bug
    (passing a flag where an ordinal index was expected).
    """
    if not isinstance(panel_id, int) or isinstance(panel_id, bool):
        raise ValueError(
            f"panel_id MUST be a positive int (got {type(panel_id).__name__})."
        )
    if panel_id < 1:
        raise ValueError(
            f"panel_id MUST be >= 1 (got {panel_id}; convention is "
            "panel-id in {1, 2, 3})."
        )


def _validate_verdict_value(verdict: object) -> PanelVerdict:
    """Validate a verdict input + return the coerced PanelVerdict member
    (M-6 extraction; matches the prior in-line behavior).

    Accepts both PanelVerdict members and raw strings that happen to match
    a member's value; rejects everything else fail-CLOSED per Task 8 I-1.
    Returns the canonical PanelVerdict instance so downstream comparisons
    are always Enum vs Enum (cheaper than str-vs-Enum string compare).
    """
    if isinstance(verdict, PanelVerdict):
        return verdict
    if isinstance(verdict, str) and verdict in _PANEL_VERDICT_VALUES:
        return PanelVerdict(verdict)
    allowed = sorted(_PANEL_VERDICT_VALUES)
    raise ValueError(
        f"verdict={verdict!r} is not a PanelVerdict member. Allowed: {allowed}."
    )


def _validate_confidence(confidence: object) -> None:
    """Reject non-float / bool / out-of-unit-interval confidence (M-6 extraction).

    bool rejected for the same reason as panel_id --- almost always a caller
    bug. Unit interval is the canonical confidence support; out-of-range
    codex output is malformed and must surface (fail-CLOSED).
    """
    if not isinstance(confidence, (int, float)) or isinstance(confidence, bool):
        raise ValueError(
            f"confidence MUST be a float in [0.0, 1.0] "
            f"(got {type(confidence).__name__})."
        )
    if not (0.0 <= confidence <= 1.0):
        raise ValueError(
            f"confidence MUST be in [0.0, 1.0] (got {confidence!r}). "
            "Codex panel returned an out-of-range confidence --- malformed "
            "output; surface fail-CLOSED."
        )


def _validate_position_swap(position_swap: object) -> None:
    """Reject non-bool position_swap (M-6 extraction).

    pydantic-free guard so the field cannot be silently coerced from a
    truthy non-bool (e.g. ``1`` or ``"yes"``); fail-CLOSED carry-forward.
    """
    if not isinstance(position_swap, bool):
        raise ValueError(
            f"position_swap MUST be a bool (got {type(position_swap).__name__})."
        )


@dataclass(frozen=True, slots=True)
class PanelResult:
    """One codex-panel round result.

    Produced by ``tools/codex-jury-panel.mjs`` (one per panel-id 1/2/3); consumed
    by ``jury_aggregate``. Frozen so a panel result, once captured, cannot be
    rewritten mid-aggregation; ``slots=True`` keeps the per-instance memory
    footprint small (3 panels x 1 dispatch == constant overhead).
    """

    panel_id: int
    """Panel index in {1, 2, 3}; matches the codex spawner's panel ordering.
    panel-id 2 is the position-swap panel by convention (panel ordering is
    informational --- the position_swap flag is the canonical truth)."""

    verdict: PanelVerdict
    """The panel's verdict. Stored as a PanelVerdict member (str-Enum
    subclass). ``__post_init__`` coerces accepted strings to the matching
    Enum and raises ValueError on unknown strings (fail-CLOSED per
    Task 8 I-1 Enum-discipline carry-forward)."""

    confidence: float
    """Self-reported confidence in [0.0, 1.0]. Used by CISC to weight this
    panel's vote during aggregation. NOT a probability of correctness ---
    purely a panel-self-assessment honesty signal. ``__post_init__`` rejects
    out-of-bounds values fail-CLOSED."""

    rationale: str
    """Operator-readable explanation of WHY this verdict was reached. MUST
    be non-empty + non-whitespace-only (enforced by ``__post_init__`` per
    Task 8 M-3 carry-forward). A panel that returns an empty rationale is
    malformed codex output and must surface."""

    position_swap: bool
    """True iff this panel ran TaskResult -> TaskSpec ordering (the swap);
    False iff it ran the canonical TaskSpec -> TaskResult ordering. Exactly
    one of the three panels in a jury MUST have position_swap=True (panel-2
    by convention). Aggregator validates this set composition invariant."""

    def __post_init__(self) -> None:
        # M-6 depth-lift: per-field validators extracted; this method is now a
        # 5-line dispatcher to module-private helpers. Verdict coercion still
        # uses object.__setattr__ (frozen dataclass requirement) so the helper
        # returns the coerced PanelVerdict and we write it here.
        _validate_panel_id(self.panel_id)
        object.__setattr__(self, "verdict", _validate_verdict_value(self.verdict))
        _validate_confidence(self.confidence)
        _validate_rationale(self.rationale, "PanelResult.rationale")
        _validate_position_swap(self.position_swap)


@dataclass(frozen=True, slots=True)
class JuryVerdict:
    """Aggregated jury output from ``jury_aggregate``.

    Frozen so the verdict-once-decided cannot be retroactively rewritten by a
    downstream consumer; ``slots=True`` keeps the per-instance memory
    footprint small.
    """

    final_verdict: FinalVerdict
    """The aggregated verdict. One of APPROVE / REVISE / BLOCK /
    NEEDS_ROUND_2. ``__post_init__`` enforces enum membership fail-CLOSED."""

    position_swap_consistent: bool
    """True iff the forward (non-swap) panel and swap panel agreed on the
    same verdict. False iff they disagreed --- position-bias suspected;
    aggregator demotes APPROVE -> REVISE when this is False (Zheng+ 2023
    position-swap discipline)."""

    rationale: str
    """Operator-readable explanation of WHY this verdict was reached. States
    the CISC weights and runner-up margin so the operator can audit. MUST
    be non-empty (enforced by ``__post_init__`` per Task 8 M-3 carry-forward
    --- fail-CLOSED + CR-6 verify-before-claim)."""

    panel_results: tuple[PanelResult, ...] = field(default_factory=tuple)
    """The three input PanelResult objects (preserved for audit). I-2 fix:
    stored as an immutable ``tuple[PanelResult, ...]`` rather than a mutable
    ``list[...]`` so the previously claimed "NEVER mutated" docstring becomes
    a true structural invariant (``frozen=True`` alone only freezes the
    attribute reference, not the list contents --- ``verdict.panel_results
    .append(...)`` would otherwise succeed). Consumers that want a different
    ordering MUST copy to a list explicitly."""

    def __post_init__(self) -> None:
        # final_verdict enum-membership
        if isinstance(self.final_verdict, FinalVerdict):
            pass
        elif (
            isinstance(self.final_verdict, str)
            and self.final_verdict in _FINAL_VERDICT_VALUES
        ):
            object.__setattr__(self, "final_verdict", FinalVerdict(self.final_verdict))
        else:
            allowed = sorted(_FINAL_VERDICT_VALUES)
            raise ValueError(
                f"final_verdict={self.final_verdict!r} is not a FinalVerdict "
                f"member. Allowed: {allowed}."
            )

        # rationale non-empty + non-whitespace-only
        _validate_rationale(self.rationale, "JuryVerdict.rationale")

        # position_swap_consistent must be a bool (defensive)
        if not isinstance(self.position_swap_consistent, bool):
            raise ValueError(
                "position_swap_consistent MUST be a bool (got "
                f"{type(self.position_swap_consistent).__name__})."
            )

        # M-11: panel_results length MUST be 0 (default-empty path used by
        # operator-direct constructors / tests) OR 3 (jury_aggregate-produced).
        # 1, 2, or 4+ panel_results indicates a contract violation upstream
        # and must surface fail-CLOSED (CR-6 verify-before-claim).
        # Also coerce list -> tuple if a caller passed a list (operator
        # ergonomics + backward-compat for any pre-fix callsite that still
        # supplies list); the field annotation is tuple but a runtime list
        # is silently re-wrapped so the immutability invariant holds.
        if isinstance(self.panel_results, list):
            object.__setattr__(self, "panel_results", tuple(self.panel_results))
        if not isinstance(self.panel_results, tuple):
            raise ValueError(
                "panel_results MUST be a tuple[PanelResult, ...] "
                f"(got {type(self.panel_results).__name__})."
            )
        if len(self.panel_results) not in (0, 3):
            raise ValueError(
                f"panel_results MUST have length 0 (default-empty) or 3 "
                f"(jury_aggregate-produced); got {len(self.panel_results)}. "
                "Lengths 1, 2, 4+ indicate a contract violation upstream."
            )


def _normalize_to_final(panel_verdict: PanelVerdict) -> FinalVerdict:
    """Map a per-panel PanelVerdict to its FinalVerdict equivalent.

    Both PanelVerdict.REVISE and PanelVerdict.NEEDS_REVISION normalize to
    FinalVerdict.REVISE. The other two are 1:1.
    """
    if panel_verdict in (PanelVerdict.REVISE, PanelVerdict.NEEDS_REVISION):
        return FinalVerdict.REVISE
    if panel_verdict is PanelVerdict.APPROVE:
        return FinalVerdict.APPROVE
    if panel_verdict is PanelVerdict.BLOCK:
        return FinalVerdict.BLOCK
    # Defensive: every PanelVerdict member is covered above. This path is
    # unreachable under the @unique invariant, but kept fail-CLOSED so a
    # future Enum extension cannot silently drop into APPROVE.
    raise ValueError(
        f"unmapped PanelVerdict={panel_verdict!r}; aggregator needs update."
    )


def jury_aggregate(panels: list[PanelResult]) -> JuryVerdict:
    """CISC-weighted majority across 3 panels with position-swap consistency
    check. Pure function; no IO; no global state.

    Invariants (fail-CLOSED on violation):
      1. len(panels) == 3 --- raises ValueError otherwise.
      2. exactly 1 of 3 panels has position_swap=True --- raises ValueError.

    Decision flow:
      - Sum confidence per (FinalVerdict-normalized) verdict across panels.
      - If (top_weight - runner_up_weight) < CISC_MARGIN_THRESHOLD --- split;
        return NEEDS_ROUND_2.
      - Otherwise: top verdict is the winner, UNLESS it is APPROVE and the
        forward/swap panels disagreed --- demoted to REVISE
        (Zheng+ 2023 position-bias discipline).

    Args:
        panels: list of exactly 3 PanelResult objects (one per codex round).

    Returns:
        JuryVerdict with final adjudication + diagnostic rationale.

    Raises:
        ValueError: panel-set composition invariants violated.
    """
    # Invariant 1: panel count
    if not isinstance(panels, list):
        raise ValueError(
            f"jury_aggregate requires a list of exactly 3 panels "
            f"(got {type(panels).__name__})."
        )
    if len(panels) != 3:
        raise ValueError(
            f"jury_aggregate requires exactly 3 panels, got {len(panels)}."
        )

    # Invariant 2: exactly 1 position_swap=True panel
    swap_count = sum(1 for p in panels if p.position_swap)
    if swap_count != 1:
        raise ValueError(
            f"jury panel-set MUST have exactly 1 position_swap=True panel "
            f"(got {swap_count}). Convention: panel-2 is the swap panel; "
            "panels 1+3 run forward (TaskSpec -> TaskResult); panel 2 runs "
            "reversed (TaskResult -> TaskSpec)."
        )

    # Position-swap consistency: the forward panel(s) and the swap panel must
    # agree on the same FinalVerdict-normalized verdict.
    forward_panels = [p for p in panels if not p.position_swap]
    swap_panel = next(p for p in panels if p.position_swap)
    # When the two forward panels disagree with each other, swap_consistent is
    # the conservative interpretation: True only if BOTH forward panels match
    # the swap panel (strict consistency per Zheng+ 2023).
    forward_normalized = {_normalize_to_final(p.verdict) for p in forward_panels}
    swap_normalized = _normalize_to_final(swap_panel.verdict)
    swap_consistent = (
        len(forward_normalized) == 1 and swap_normalized in forward_normalized
    )

    # CISC: sum confidence per normalized verdict.
    # M-7: defaultdict(float) is used because the verdict bucket may not
    # pre-exist when we start summing --- a panel that returns a verdict not
    # yet seen creates a new bucket initialized to 0.0 implicitly. Only
    # populated buckets are visible at sort time (no zero-bucket noise).
    weights: dict[FinalVerdict, float] = defaultdict(float)
    for p in panels:
        weights[_normalize_to_final(p.verdict)] += p.confidence

    # Find top + runner-up; defensive for the case where all 3 panels collapse
    # to a single verdict (no runner-up).
    sorted_weights = sorted(weights.items(), key=lambda kv: kv[1], reverse=True)
    top_verdict, top_weight = sorted_weights[0]
    runner_up_weight = sorted_weights[1][1] if len(sorted_weights) > 1 else 0.0
    margin = top_weight - runner_up_weight

    # Branch 0: full 3-way disagreement --- when every panel returns a distinct
    # FinalVerdict-normalized verdict (3 unique buckets), the jury is
    # fundamentally split regardless of the CISC margin. The CISC weighting
    # alone could still pick a "winner" in this case (e.g., a single high-
    # confidence BLOCK among 3 different verdicts), but this aggregator
    # surfaces such a split as NEEDS_ROUND_2 so the operator can re-dispatch
    # with a stricter spec or run another jury round. This is a PROJECT-
    # ENGINEERING choice (NOT prescribed by Taubenfeld+ 2025 CISC or Zhao+
    # 2025 CARE); it catches the canonical "weak APPROVE + weak REVISE +
    # strong BLOCK" pattern as well as the equal-confidence 3-way split.
    if len(weights) == 3:
        return JuryVerdict(
            final_verdict=FinalVerdict.NEEDS_ROUND_2,
            position_swap_consistent=swap_consistent,
            rationale=(
                "Full 3-way jury disagreement: each panel returned a "
                "distinct verdict (weights: "
                + ", ".join(f"{v.value}={w:.4f}" for v, w in sorted_weights)
                + f"); margin={margin:.4f}. Recommend re-dispatch with a "
                "stricter spec OR operator manual adjudication "
                "(project-engineering jury-split discipline)."
            ),
            panel_results=tuple(panels),
        )

    # Branch 1: split jury (margin below threshold) --- recommend round-2.
    if margin < CISC_MARGIN_THRESHOLD:
        return JuryVerdict(
            final_verdict=FinalVerdict.NEEDS_ROUND_2,
            position_swap_consistent=swap_consistent,
            rationale=(
                f"Jury split: top={top_verdict.value}(weight={top_weight:.4f}) "
                f"vs runner-up(weight={runner_up_weight:.4f}); "
                f"margin={margin:.4f} < CISC_MARGIN_THRESHOLD="
                f"{CISC_MARGIN_THRESHOLD:.4f} "
                "(FP-imprecise; strict-less-than via IEEE-754 binary64). "
                "Recommend re-dispatch with a stricter spec OR operator "
                "manual adjudication."
            ),
            panel_results=tuple(panels),
        )

    # Branch 2: top is APPROVE but position-swap inconsistent --- demote to
    # REVISE. The CISC majority said APPROVE but the swap panel disagreed;
    # position-bias is the suspected cause and the patch deserves a closer
    # look. This demote-on-inconsistency rule is a PROJECT-ENGINEERING
    # elaboration of Zheng+ 2023 MT-Bench's broader position-swap protocol;
    # the paper documents position-bias measurement + swap-as-mitigation,
    # but does NOT prescribe this specific demote-rule for ensemble juries.
    if top_verdict is FinalVerdict.APPROVE and not swap_consistent:
        forward_summary = ", ".join(sorted(v.value for v in forward_normalized))
        return JuryVerdict(
            final_verdict=FinalVerdict.REVISE,
            position_swap_consistent=False,
            rationale=(
                f"CISC top verdict was APPROVE (weight={top_weight:.4f}, "
                f"margin={margin:.4f}) but position-swap inconsistent: "
                f"forward={{{forward_summary}}} vs swap="
                f"{swap_normalized.value}. Position-bias suspected "
                "(project-engineering demote-on-swap-inconsistency rule, "
                "building on Zheng+ 2023 MT-Bench arXiv:2306.05685 "
                "position-swap protocol); demoting to REVISE."
            ),
            panel_results=tuple(panels),
        )

    # Branch 3: clear CISC winner; commit.
    return JuryVerdict(
        final_verdict=top_verdict,
        position_swap_consistent=swap_consistent,
        rationale=(
            f"CISC-weighted majority: {top_verdict.value} "
            f"(weight={top_weight:.4f}, runner-up weight={runner_up_weight:.4f}, "
            f"margin={margin:.4f}); position_swap_consistent="
            f"{swap_consistent}."
        ),
        panel_results=tuple(panels),
    )

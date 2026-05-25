"""Unit tests for the L3 Jury-on-Demand 3-judge codex panel aggregator
(W374-EXT Task 9 A3).

Per V2 plan Task 9 + Task 7 + Task 8 carry-forward lessons:
  - 4 plan tests (unanimous APPROVE / swap-inconsistent demote / split jury /
    CISC weight overrides naive majority)
  - 6 carry-forward tests:
      (5) test_panel_count_must_be_three             — len(panels) != 3 raises
      (6) test_rationale_non_empty_guard             — JuryVerdict.__post_init__
      (7) test_unanimous_block_high_confidence       — 3xBLOCK -> BLOCK
      (8) test_defensive_default_routes_to_round_2   — 3-way split, equal weight
      (9) test_panel_position_swap_required          — exactly 1 of 3 must swap
      (10) test_panel_verdict_must_be_enum_member    — PanelResult __post_init__

All assertions use the FinalVerdict / PanelVerdict (str, Enum) members (not
raw string literals) so typo-drift on the verdict-kind strings is structurally
detectable per Task 8 I-1 carry-forward.
"""

from __future__ import annotations

import pytest

from agents.jury_aggregator import (
    FinalVerdict,
    JuryVerdict,
    PanelResult,
    PanelVerdict,
    jury_aggregate,
)


# ---- 4 plan tests ----------------------------------------------------------


def test_unanimous_approve():
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.95,
            rationale="forward ok",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.APPROVE,
            confidence=0.88,
            rationale="swap ok",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.APPROVE,
            confidence=0.91,
            rationale="forward ok",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    assert isinstance(v, JuryVerdict)
    assert v.final_verdict == FinalVerdict.APPROVE
    assert v.position_swap_consistent is True
    assert len(v.panel_results) == 3


def test_majority_approve_but_swap_inconsistent_demotes_to_revise():
    """If panel-1 (forward) APPROVE but panel-2 (swap) BLOCK, the executor
    passed the spec but failed the inverse — position-bias suspected."""
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.85,
            rationale="forward ok",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.BLOCK,
            confidence=0.80,
            rationale="swap reveals AC drift",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.APPROVE,
            confidence=0.70,
            rationale="forward ok",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    assert v.final_verdict == FinalVerdict.REVISE
    assert v.position_swap_consistent is False
    assert "position" in v.rationale.lower() or "swap" in v.rationale.lower()


def test_split_jury_recommends_round_2():
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.60,
            rationale="weak ok",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.REVISE,
            confidence=0.55,
            rationale="weak nit",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.BLOCK,
            confidence=0.80,
            rationale="real issue",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    assert v.final_verdict == FinalVerdict.NEEDS_ROUND_2


def test_cisc_weight_overrides_naive_majority():
    """High-confidence minority should NOT be overridden by low-confidence majority."""
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.30,
            rationale="low conf",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.APPROVE,
            confidence=0.30,
            rationale="low conf swap",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.BLOCK,
            confidence=0.99,
            rationale="critical bug found",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    # Naive majority = APPROVE (2/3); CISC-weighted = BLOCK
    # (sum confidence BLOCK=0.99 > APPROVE=0.60)
    assert v.final_verdict == FinalVerdict.BLOCK, (
        "CISC must weight by confidence, not raw vote count"
    )


# ---- 6 carry-forward tests -------------------------------------------------


def test_panel_count_must_be_three():
    """jury_aggregate enforces exactly-3-panels invariant (fail-CLOSED on
    panel-set composition errors). Empty list, 1-panel, 2-panel, and 4+-panel
    inputs all raise ValueError. Task 7 + 8 fail-CLOSED carry-forward."""
    swap = PanelResult(
        panel_id=2,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=True,
    )
    forward = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )
    forward2 = PanelResult(
        panel_id=3,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )
    forward3 = PanelResult(
        panel_id=4,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )

    with pytest.raises(ValueError, match="exactly 3 panels"):
        jury_aggregate([])
    with pytest.raises(ValueError, match="exactly 3 panels"):
        jury_aggregate([forward])
    with pytest.raises(ValueError, match="exactly 3 panels"):
        jury_aggregate([forward, swap])
    with pytest.raises(ValueError, match="exactly 3 panels"):
        jury_aggregate([forward, swap, forward2, forward3])


def test_rationale_non_empty_guard():
    """JuryVerdict.__post_init__ enforces non-empty + non-whitespace rationale
    (Task 8 M-3 carry-forward — operator-readable diagnostic per fail-CLOSED
    + CR-6 verify-before-claim).

    Also: PanelResult.__post_init__ enforces the same on its rationale field
    (a panel that returns an empty rationale is malformed and must surface)."""
    valid_panel = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )

    # JuryVerdict rationale empty -> ValueError
    with pytest.raises(ValueError, match="non-empty"):
        JuryVerdict(
            final_verdict=FinalVerdict.APPROVE,
            position_swap_consistent=True,
            rationale="",
            panel_results=[valid_panel, valid_panel, valid_panel],
        )

    # JuryVerdict rationale whitespace-only -> ValueError
    with pytest.raises(ValueError, match="non-empty"):
        JuryVerdict(
            final_verdict=FinalVerdict.APPROVE,
            position_swap_consistent=True,
            rationale="   \t\n  ",
            panel_results=[valid_panel, valid_panel, valid_panel],
        )

    # PanelResult rationale empty -> ValueError
    with pytest.raises(ValueError, match="non-empty"):
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.9,
            rationale="",
            position_swap=False,
        )

    # PanelResult rationale whitespace-only -> ValueError
    with pytest.raises(ValueError, match="non-empty"):
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.9,
            rationale="   ",
            position_swap=False,
        )


def test_unanimous_block_high_confidence():
    """3x BLOCK at high confidence -> BLOCK. Symmetric to test_unanimous_approve;
    verifies the aggregator does not have an APPROVE-biased default branch."""
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.BLOCK,
            confidence=0.98,
            rationale="security issue",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.BLOCK,
            confidence=0.95,
            rationale="security issue (swap)",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.BLOCK,
            confidence=0.92,
            rationale="security issue",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    assert v.final_verdict == FinalVerdict.BLOCK
    assert v.position_swap_consistent is True


def test_defensive_default_routes_to_round_2():
    """3-way split with identical confidence -> NEEDS_ROUND_2 (no clear winner
    via CISC weights). Task 8 I-2 defensive-default carry-forward."""
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.50,
            rationale="ok",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.REVISE,
            confidence=0.50,
            rationale="meh",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.BLOCK,
            confidence=0.50,
            rationale="nope",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    assert v.final_verdict == FinalVerdict.NEEDS_ROUND_2
    assert "split" in v.rationale.lower() or "margin" in v.rationale.lower()


def test_panel_position_swap_required():
    """The 3-panel set MUST have exactly 1 position_swap=True panel (panel-2 per
    convention; the aggregator validates the set composition). 0 or 2+ swaps
    is malformed and raises ValueError (Task 7 + 8 fail-CLOSED carry-forward)."""
    forward = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )
    swap = PanelResult(
        panel_id=2,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=True,
    )

    # 0 swaps -> ValueError
    with pytest.raises(ValueError, match="position_swap"):
        jury_aggregate([forward, forward, forward])

    # 2 swaps -> ValueError
    with pytest.raises(ValueError, match="position_swap"):
        jury_aggregate([forward, swap, swap])

    # 3 swaps -> ValueError
    with pytest.raises(ValueError, match="position_swap"):
        jury_aggregate([swap, swap, swap])


def test_panel_verdict_must_be_enum_member():
    """PanelResult.__post_init__ enforces verdict membership in PanelVerdict
    Enum. A malformed verdict string (e.g. typo'd "BOGUS" or "APROVE") must
    be rejected at construction, not silently bypass aggregation (Task 8 I-1
    Enum-discipline carry-forward).

    Note: pure-string PanelVerdict members ARE accepted (str, Enum subclass);
    the guard rejects strings that are NOT enum members.
    """
    # Malformed string -> ValueError
    with pytest.raises(ValueError, match="verdict"):
        PanelResult(
            panel_id=1,
            verdict="BOGUS",  # type: ignore[arg-type]
            confidence=0.9,
            rationale="malformed",
            position_swap=False,
        )

    # Typo'd APPROVE -> ValueError
    with pytest.raises(ValueError, match="verdict"):
        PanelResult(
            panel_id=1,
            verdict="APROVE",  # type: ignore[arg-type]
            confidence=0.9,
            rationale="typo",
            position_swap=False,
        )

    # Each Enum member must be a valid input
    for member in PanelVerdict:
        p = PanelResult(
            panel_id=1,
            verdict=member,
            confidence=0.9,
            rationale="ok",
            position_swap=False,
        )
        # Enum is preserved (or coerced back into Enum if string was passed)
        assert p.verdict == member


# ---- Additional invariant tests (defensive depth) --------------------------


def test_confidence_in_unit_interval():
    """PanelResult.__post_init__ enforces confidence in [0.0, 1.0]. Out-of-
    bound confidences are malformed panel output and must surface (extra
    invariant beyond plan; matches CR-6 verify-before-claim discipline)."""
    with pytest.raises(ValueError, match="confidence"):
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=1.5,
            rationale="too high",
            position_swap=False,
        )
    with pytest.raises(ValueError, match="confidence"):
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=-0.1,
            rationale="negative",
            position_swap=False,
        )


def test_panel_id_must_be_positive():
    """PanelResult.panel_id must be a positive integer (1, 2, 3 per convention)."""
    with pytest.raises(ValueError, match="panel_id"):
        PanelResult(
            panel_id=0,
            verdict=PanelVerdict.APPROVE,
            confidence=0.9,
            rationale="ok",
            position_swap=False,
        )
    with pytest.raises(ValueError, match="panel_id"):
        PanelResult(
            panel_id=-1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.9,
            rationale="ok",
            position_swap=False,
        )


def test_final_verdict_uses_enum_not_raw_string():
    """JuryVerdict.final_verdict MUST be a FinalVerdict enum member. Constructing
    with a raw string that is not an enum member must fail-CLOSED."""
    valid_panel = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )
    with pytest.raises(ValueError, match="final_verdict"):
        JuryVerdict(
            final_verdict="BOGUS",  # type: ignore[arg-type]
            position_swap_consistent=True,
            rationale="ok",
            panel_results=[valid_panel, valid_panel, valid_panel],
        )


# ---- Fix-up batch: I-2 / M-11 / R-A / I-1 verification ---------------------


def test_panel_results_truly_immutable():
    """I-2 fix verification: JuryVerdict.panel_results is a tuple, not a list.

    The previous list-typed field was structurally mutable via .append(...);
    frozen=True only freezes the attribute reference, not the list contents.
    The tuple type makes the "NEVER mutated" docstring a true invariant
    (AttributeError: 'tuple' object has no attribute 'append')."""
    valid_panel = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )
    verdict = JuryVerdict(
        final_verdict=FinalVerdict.APPROVE,
        position_swap_consistent=True,
        rationale="unit-test",
        panel_results=(valid_panel, valid_panel, valid_panel),
    )
    assert isinstance(verdict.panel_results, tuple), (
        "panel_results MUST be a tuple post-fix-up I-2"
    )
    # Mutation attempts MUST raise AttributeError (tuple has no .append).
    with pytest.raises(AttributeError, match="append"):
        verdict.panel_results.append(valid_panel)  # type: ignore[attr-defined]
    # The frozen-dataclass guard also prevents replacing the field itself.
    with pytest.raises(Exception):  # FrozenInstanceError or similar
        verdict.panel_results = ()  # type: ignore[misc]


def test_panel_results_list_coerced_to_tuple():
    """Backward-compat: a caller that constructs JuryVerdict with
    panel_results=[...] still works --- __post_init__ coerces list -> tuple
    so existing call-sites (incl. older test code) do not break."""
    valid_panel = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )
    verdict = JuryVerdict(
        final_verdict=FinalVerdict.APPROVE,
        position_swap_consistent=True,
        rationale="list-input coercion test",
        panel_results=[valid_panel, valid_panel, valid_panel],  # type: ignore[arg-type]
    )
    assert isinstance(verdict.panel_results, tuple), (
        "list -> tuple coercion failed in __post_init__"
    )
    assert len(verdict.panel_results) == 3


def test_panel_results_length_must_be_zero_or_three():
    """M-11: JuryVerdict.__post_init__ rejects panel_results length 1, 2, 4+
    (only 0 default-empty + 3 jury-produced are valid). fail-CLOSED on
    contract violation upstream."""
    valid_panel = PanelResult(
        panel_id=1,
        verdict=PanelVerdict.APPROVE,
        confidence=0.9,
        rationale="ok",
        position_swap=False,
    )

    # length 0 (default-empty path): OK
    JuryVerdict(
        final_verdict=FinalVerdict.APPROVE,
        position_swap_consistent=True,
        rationale="default-empty path",
    )

    # length 3 (jury-produced): OK
    JuryVerdict(
        final_verdict=FinalVerdict.APPROVE,
        position_swap_consistent=True,
        rationale="three-panels path",
        panel_results=(valid_panel, valid_panel, valid_panel),
    )

    # length 1: ValueError
    with pytest.raises(ValueError, match="length 0"):
        JuryVerdict(
            final_verdict=FinalVerdict.APPROVE,
            position_swap_consistent=True,
            rationale="one-panel — malformed",
            panel_results=(valid_panel,),
        )

    # length 2: ValueError
    with pytest.raises(ValueError, match="length 0"):
        JuryVerdict(
            final_verdict=FinalVerdict.APPROVE,
            position_swap_consistent=True,
            rationale="two-panel — malformed",
            panel_results=(valid_panel, valid_panel),
        )

    # length 4: ValueError
    with pytest.raises(ValueError, match="length 0"):
        JuryVerdict(
            final_verdict=FinalVerdict.APPROVE,
            position_swap_consistent=True,
            rationale="four-panel — malformed",
            panel_results=(valid_panel, valid_panel, valid_panel, valid_panel),
        )


def test_cisc_margin_threshold_env_var_override():
    """R-A verification: setting CISC_MARGIN_THRESHOLD env var BEFORE module
    import re-tunes the threshold.

    Implementation note: we test in a SUBPROCESS rather than via
    ``importlib.reload`` because reloading the agents.jury_aggregator
    module mid-test would invalidate the PanelVerdict / FinalVerdict /
    PanelResult / JuryVerdict references already imported by other tests
    in this same pytest session (Enum identity is module-instance-tied).
    The subprocess gets a fresh import under the patched env --- canonical
    pattern for env-var-at-import-time behavior."""
    import os as _os
    import subprocess
    import sys

    # Probe 1: override to 0.05
    env = _os.environ.copy()
    env["CISC_MARGIN_THRESHOLD"] = "0.05"
    completed = subprocess.run(
        [
            sys.executable,
            "-c",
            "import agents.jury_aggregator as m; print(repr(m.CISC_MARGIN_THRESHOLD))",
        ],
        capture_output=True,
        text=True,
        env=env,
        check=False,
    )
    assert completed.returncode == 0, completed.stderr
    assert "0.05" in completed.stdout, (
        f"env CISC_MARGIN_THRESHOLD=0.05 should override; got {completed.stdout!r}"
    )

    # Probe 2: override to 0.5
    env["CISC_MARGIN_THRESHOLD"] = "0.5"
    completed = subprocess.run(
        [
            sys.executable,
            "-c",
            "import agents.jury_aggregator as m; print(repr(m.CISC_MARGIN_THRESHOLD))",
        ],
        capture_output=True,
        text=True,
        env=env,
        check=False,
    )
    assert completed.returncode == 0, completed.stderr
    assert "0.5" in completed.stdout

    # Probe 3: unset --- default 0.2 must apply.
    env.pop("CISC_MARGIN_THRESHOLD", None)
    completed = subprocess.run(
        [
            sys.executable,
            "-c",
            "import agents.jury_aggregator as m; print(repr(m.CISC_MARGIN_THRESHOLD))",
        ],
        capture_output=True,
        text=True,
        env=env,
        check=False,
    )
    assert completed.returncode == 0, completed.stderr
    assert "0.2" in completed.stdout, (
        f"missing env should default to 0.2; got {completed.stdout!r}"
    )


def test_rationale_uses_four_decimal_display():
    """I-1 verification: rationale strings format margin / weight using :.4f
    so the FP-imprecise reality (e.g. 0.19999999999999996) is visible to the
    operator rather than rounded to a misleading "0.20"."""
    # Construct a jury where the CISC weighting produces an FP-imprecise margin.
    # The canonical example from the I-1 finding: APPROVE has weight 0.6 from
    # two panels at 0.3 each, BLOCK has weight 0.4. In CPython 3.13 this
    # subtraction surfaces as 0.6 - 0.4 = 0.19999999999999996 due to IEEE-754
    # binary64 representation of 0.3.
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.3,
            rationale="forward weak ok",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.APPROVE,
            confidence=0.3,
            rationale="swap weak ok",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.BLOCK,
            confidence=0.4,
            rationale="forward weak block",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    # The naive :.2f rendering would say "margin=0.20" (rounded);
    # the :.4f rendering says "margin=0.1999" (truncated to 4 places).
    # Either way, "0.20" as the bare digit pattern must NOT appear in margin.
    # We assert :.4f formatting by checking for a 4-decimal float in the
    # rationale (e.g. "margin=0.1999" or "margin=0.2000").
    import re

    margins = re.findall(r"margin=(\d+\.\d{4})", v.rationale)
    assert len(margins) >= 1, (
        f"rationale must format margin with :.4f precision; got: {v.rationale}"
    )
    # No 2-decimal-only margin should appear (would indicate stale :.2f).
    # The pattern margin=N.NN-anything-not-digit catches the old format.
    stale_two_decimal = re.findall(r"margin=\d+\.\d{2}(?!\d)", v.rationale)
    assert len(stale_two_decimal) == 0, (
        f"rationale still uses :.2f for margin (I-1 regression): {v.rationale}"
    )


def test_fp_imprecision_rationale_includes_clarification():
    """I-1 inline parenthetical: when the margin is compared to the threshold
    in the split-jury branch, the rationale MUST include a clarification that
    the comparison is FP-imprecise + strict-less-than. This prevents operator
    confusion when display rounding makes "0.1999 < 0.2000" look identical."""
    # Setup: 3-way disagreement (FinalVerdict-unique=3) is intercepted by
    # Branch 0; to hit Branch 1 we need 2-bucket weights with margin below
    # threshold. APPROVE+APPROVE+REVISE @0.3/0.3/0.4 -> APPROVE bucket=0.6,
    # REVISE bucket=0.4, margin=0.1999...; below 0.2 threshold -> Branch 1.
    panels = [
        PanelResult(
            panel_id=1,
            verdict=PanelVerdict.APPROVE,
            confidence=0.3,
            rationale="forward weak ok",
            position_swap=False,
        ),
        PanelResult(
            panel_id=2,
            verdict=PanelVerdict.APPROVE,
            confidence=0.3,
            rationale="swap weak ok",
            position_swap=True,
        ),
        PanelResult(
            panel_id=3,
            verdict=PanelVerdict.REVISE,
            confidence=0.4,
            rationale="weak revise",
            position_swap=False,
        ),
    ]
    v = jury_aggregate(panels)
    assert v.final_verdict == FinalVerdict.NEEDS_ROUND_2, (
        f"expected NEEDS_ROUND_2, got {v.final_verdict}"
    )
    # The inline parenthetical from I-1 fix MUST be present.
    assert "FP-imprecise" in v.rationale or "strict-less-than" in v.rationale, (
        f"split-jury rationale must include FP-imprecision clarification "
        f"per I-1; got: {v.rationale}"
    )


def test_per_field_validators_are_module_private():
    """M-6 verification: per-field validators are extracted as module-private
    helpers (underscore-prefixed). They MUST be callable directly so future
    refactors can reuse them, and they MUST raise ValueError on bad input
    fail-CLOSED."""
    from agents.jury_aggregator import (
        _validate_confidence,
        _validate_panel_id,
        _validate_position_swap,
        _validate_verdict_value,
    )

    # _validate_panel_id
    _validate_panel_id(1)  # OK
    _validate_panel_id(99)  # OK
    with pytest.raises(ValueError, match="panel_id"):
        _validate_panel_id(0)
    with pytest.raises(ValueError, match="panel_id"):
        _validate_panel_id(-1)
    with pytest.raises(ValueError, match="panel_id"):
        _validate_panel_id(True)  # bool subclass of int
    with pytest.raises(ValueError, match="panel_id"):
        _validate_panel_id("1")  # type: ignore[arg-type]

    # _validate_confidence
    _validate_confidence(0.0)  # OK (boundary)
    _validate_confidence(1.0)  # OK (boundary)
    _validate_confidence(0.5)  # OK
    with pytest.raises(ValueError, match="confidence"):
        _validate_confidence(-0.001)
    with pytest.raises(ValueError, match="confidence"):
        _validate_confidence(1.001)
    with pytest.raises(ValueError, match="confidence"):
        _validate_confidence(True)  # type: ignore[arg-type]
    with pytest.raises(ValueError, match="confidence"):
        _validate_confidence("0.5")  # type: ignore[arg-type]

    # _validate_position_swap
    _validate_position_swap(True)  # OK
    _validate_position_swap(False)  # OK
    with pytest.raises(ValueError, match="position_swap"):
        _validate_position_swap(1)  # type: ignore[arg-type]
    with pytest.raises(ValueError, match="position_swap"):
        _validate_position_swap("True")  # type: ignore[arg-type]

    # _validate_verdict_value (returns coerced PanelVerdict).
    # Use == not `is` --- test_cisc_margin_threshold_env_var_override reloads
    # the module, creating an alternate PanelVerdict Enum class; the
    # module-level identity equality would break across reload boundaries.
    # Value-equality (== / .value) is the canonical contract.
    assert _validate_verdict_value(PanelVerdict.APPROVE) == PanelVerdict.APPROVE
    assert _validate_verdict_value("APPROVE").value == "APPROVE"
    assert _validate_verdict_value("NEEDS-REVISION").value == "NEEDS-REVISION"
    with pytest.raises(ValueError, match="verdict"):
        _validate_verdict_value("BOGUS")
    with pytest.raises(ValueError, match="verdict"):
        _validate_verdict_value(42)

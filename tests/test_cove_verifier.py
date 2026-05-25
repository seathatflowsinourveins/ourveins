import pytest
from unittest.mock import AsyncMock, MagicMock
from agents.models import TaskSpec
from agents.cove_verifier import cove_verify, CoVeResult


def _mock_anthropic_client(responses: list[str]) -> MagicMock:
    """Build a mock that returns the given response strings in order across messages.create calls."""
    client = MagicMock()
    iterator = iter(responses)

    async def _create(*args, **kwargs):
        msg = MagicMock()
        msg.content = [MagicMock(text=next(iterator))]
        return msg

    client.messages.create = AsyncMock(side_effect=_create)
    return client


@pytest.mark.asyncio
async def test_cove_returns_verified_spec_when_no_discrepancies():
    spec = TaskSpec(task="add a docstring to tools/openhands_bridge.mjs")
    client = _mock_anthropic_client(
        [
            "QUESTIONS:\n1. Is the file path valid?\n2. Is the change scope clear?\n3. Is the AC measurable?",
            "A1: yes, tools/openhands_bridge.mjs exists in repo",
            "A2: yes, scope is one-file docstring addition",
            "A3: yes, AC is 'docstring present in file head'",
            "RECONCILED: no discrepancies; spec accepted as-is",
        ]
    )
    result = await cove_verify(spec, client)
    assert isinstance(result, CoVeResult)
    assert result.verified_spec.task == spec.task
    assert len(result.discrepancies) == 0
    assert len(result.verification_log) == 3  # 3 Q-A pairs


@pytest.mark.asyncio
async def test_cove_surfaces_discrepancies_when_questions_disagree():
    spec = TaskSpec(task="fix all the bugs and ship to prod tomorrow")
    client = _mock_anthropic_client(
        [
            "QUESTIONS:\n1. Is 'all the bugs' enumerated?\n2. Is 'ship to prod' AC clear?",
            "A1: NO — 'all the bugs' is unbounded; no enumeration",
            "A2: NO — ship-to-prod is undefined; no AC",
            "RECONCILED: 2 discrepancies; spec needs refinement\nDISCREPANCIES:\n1. 'all the bugs' is unbounded\n2. ship-to-prod has no AC",
        ]
    )
    result = await cove_verify(spec, client)
    assert len(result.discrepancies) == 2
    # Plan §112: discrepancies MUST surface the unboundedness / enumeration flaw — not just count.
    assert (
        "unbounded" in result.discrepancies[0].lower()
        or "enumeration" in result.discrepancies[0].lower()
    )


@pytest.mark.asyncio
async def test_cove_factored_isolation_property():
    """Verify each question is answered without the draft in the system prompt (factored mode)."""
    spec = TaskSpec(task="trivial task")
    client = _mock_anthropic_client(
        [
            "QUESTIONS:\n1. Q1",
            "A1: ok",
            "RECONCILED: clean",
        ]
    )
    await cove_verify(spec, client)
    # Inspect the call arguments to verify the draft is NOT in question-answering prompts
    calls = client.messages.create.call_args_list
    assert len(calls) >= 2  # at least: 1 for questions, 1 per answer, 1 for reconcile
    # The answer call's system prompt MUST NOT contain the draft task text
    answer_call = calls[1]
    system_prompt = answer_call.kwargs.get("system", "")
    assert spec.task not in system_prompt, (
        "factored mode violation: draft leaked into answer context"
    )


@pytest.mark.asyncio
async def test_cove_handles_unparseable_questions():
    """When question-gen returns no parseable numbered questions, fail-CLOSED with a sentinel discrepancy."""
    spec = TaskSpec(task="any task")
    client = _mock_anthropic_client(
        [
            "Sure! Here are some thoughts: just do it properly.",  # No QUESTIONS: header, no numbered items
        ]
    )
    result = await cove_verify(spec, client)
    assert len(result.discrepancies) == 1
    assert "no parseable questions" in result.discrepancies[0].lower()
    # Cross-task harmonization (I-2): verification_log is now a tuple, not a list.
    assert result.verification_log == ()


@pytest.mark.asyncio
async def test_cove_fails_closed_on_question_gen_api_error():
    """If the question-gen Anthropic call raises, surface as a sentinel discrepancy — do NOT propagate uncaught."""
    spec = TaskSpec(task="any task")
    client = MagicMock()
    client.messages.create = AsyncMock(side_effect=RuntimeError("rate limit"))
    result = await cove_verify(spec, client)
    assert len(result.discrepancies) == 1
    assert "api failure" in result.discrepancies[0].lower()
    assert "question-gen" in result.discrepancies[0].lower()


@pytest.mark.asyncio
async def test_cove_parses_none_with_trailing_period():
    """Regression for I-1: 'none.' / 'no discrepancies' / 'n/a' must NOT be parsed as real discrepancies."""
    spec = TaskSpec(task="clean spec")
    client = _mock_anthropic_client(
        [
            "QUESTIONS:\n1. Is the task well-formed?",
            "A1: yes",
            "RECONCILED: clean\nDISCREPANCIES:\n1. none.",  # Trailing period
        ]
    )
    result = await cove_verify(spec, client)
    # Cross-task harmonization (I-2): discrepancies is now a tuple, not a list.
    assert result.discrepancies == (), (
        f"'none.' should be treated as sentinel; got: {result.discrepancies}"
    )


@pytest.mark.asyncio
async def test_cove_strict_questions_header():
    """Regression for M-4: lone '1. foo' without QUESTIONS: header should NOT be parsed."""
    spec = TaskSpec(task="any task")
    client = _mock_anthropic_client(
        [
            "Step 1. think about it\nStep 2. write code",  # No QUESTIONS: header
        ]
    )
    result = await cove_verify(spec, client)
    # No questions parsed → fail-CLOSED early-return
    assert len(result.discrepancies) == 1
    assert "no parseable questions" in result.discrepancies[0].lower()


def test_cove_result_truly_immutable():
    """Per cross-task harmonization: CoVeResult.discrepancies + verification_log are tuples, not mutable lists.

    Closes the audit-trail-mutation hole that frozen=True alone could not seal:
    pre-fix, callers could do `result.discrepancies.append(...)` to retroactively
    rewrite the protocol-failure record. Tuple typing + __post_init__ coercion
    makes the immutability a true structural invariant (Task 8 PanelResult +
    Task 9 JuryVerdict pattern carry-forward).
    """
    spec = TaskSpec(task="any")
    # Backward-compat path: callers may still pass lists; __post_init__ coerces.
    result = CoVeResult(
        verified_spec=spec,
        verification_log=[("q", "a")],
        discrepancies=["test discrepancy"],
    )
    assert isinstance(result.discrepancies, tuple)
    assert isinstance(result.verification_log, tuple)
    # tuple has no append/extend → AttributeError on mutation attempt.
    with pytest.raises(AttributeError, match="append"):
        result.discrepancies.append("X")
    with pytest.raises(AttributeError, match="append"):
        result.verification_log.append(("q2", "a2"))


def test_cove_result_rejects_empty_discrepancy():
    """Per cross-task harmonization (CR-6 verify-before-claim): an empty / whitespace-only
    discrepancy string is malformed audit-trail output and MUST surface fail-CLOSED.
    """
    spec = TaskSpec(task="any")
    with pytest.raises(ValueError, match="must be non-empty"):
        CoVeResult(verified_spec=spec, discrepancies=[""])
    with pytest.raises(ValueError, match="must be non-empty"):
        CoVeResult(verified_spec=spec, discrepancies=["   "])


def test_cove_result_rejects_malformed_verification_log_entry():
    """Per cross-task harmonization: verification_log entries MUST be (str, str) tuples.

    Catches operator-bug call sites passing a 1-tuple, 3-tuple, or non-str members.
    """
    spec = TaskSpec(task="any")
    with pytest.raises(
        TypeError, match=r"verification_log\[0\] must be \(str, str\) tuple"
    ):
        CoVeResult(verified_spec=spec, verification_log=[("only-one-element",)])
    with pytest.raises(
        TypeError, match=r"verification_log\[0\] must be \(str, str\) tuple"
    ):
        CoVeResult(verified_spec=spec, verification_log=[(1, "a")])  # type: ignore[list-item]


def test_cove_result_rejects_non_str_discrepancy():
    """Per cross-task harmonization: discrepancies entries MUST be str."""
    spec = TaskSpec(task="any")
    with pytest.raises(TypeError, match="discrepancies\\[0\\] must be str"):
        CoVeResult(verified_spec=spec, discrepancies=[42])  # type: ignore[list-item]


def test_cove_result_defaults_to_empty_tuples():
    """Per cross-task harmonization: bare-construction with only verified_spec
    yields empty tuples (not empty lists), matching the new immutability invariant.
    """
    spec = TaskSpec(task="any")
    result = CoVeResult(verified_spec=spec)
    assert result.verification_log == ()
    assert result.discrepancies == ()
    assert isinstance(result.verification_log, tuple)
    assert isinstance(result.discrepancies, tuple)

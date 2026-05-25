"""DeepEval smoke test — Wave 121 Ship 2 scaffold.

Routes Anthropic eval traffic through CPA fleet at http://127.0.0.1:8317 with the
`eee-fleet-key-eval` stratified API key (sister to promptfooconfig.yaml routing).

Cite: confident-ai/deepeval @ v4.0.0 (PyPI Apache-2.0; verified
2026-05-09 via https://pypi.org/pypi/deepeval/json — see tmp/deepeval-pypi.json).

Operator quickstart:
    cd Z:/claude-sota-installed
    Z:/venvs/claude/Scripts/python.exe -m pytest evals/deepeval/ -v

Cost discipline (per kiss-dry-yagni Must-Never #4 + cardinal-rule-9):
    DeepEval invokes an LLM-as-judge for metric scoring. Live LLM-as-judge
    tests are GATED behind `DEEPEVAL_ENABLE_LIVE=1` so accidental
    `pytest evals/` does NOT burn tokens (W134-F22-A token-safety fix
    per Fire 19 GPT-5.5 cross-model audit findings).

    Token-safe default: `pytest evals/deepeval/` runs ONLY the cheap
    import-only smoke; live LLM calls require explicit opt-in.

    Opt-in to live eval (spends Anthropic tokens via CPA fleet):
        $env:DEEPEVAL_ENABLE_LIVE = "1"
        Z:/venvs/claude/Scripts/python.exe -m pytest evals/deepeval/ -v
"""

from __future__ import annotations

import os

import pytest


# Configure DeepEval to route through CPA fleet for both subject + judge LLM
# calls. Per CR-1: Anthropic-via-CPA endpoint is the primary cost-controlled
# path; CPA exposes Anthropic-compatible /v1/messages at port 8317.
os.environ.setdefault("ANTHROPIC_BASE_URL", "http://127.0.0.1:8317/v1")
os.environ.setdefault("ANTHROPIC_API_KEY", "eee-fleet-key-eval")


@pytest.mark.skipif(
    os.environ.get("DEEPEVAL_ENABLE_LIVE", "0") != "1",
    reason="set DEEPEVAL_ENABLE_LIVE=1 to run live LLM-as-judge eval against CPA (spends Anthropic tokens via eee-fleet-key-eval). Token-safe default: SKIPPED.",
)
def test_answer_relevancy_round_trip() -> None:
    """Smoke: trivial input → deterministic output → DeepEval relevancy ≥0.7.

    Verifies the scaffold can:
    1. Construct an LLMTestCase
    2. Invoke AnswerRelevancyMetric (LLM-as-judge call via CPA fleet)
    3. assert_test passes the metric threshold
    """
    from deepeval import assert_test
    from deepeval.metrics import AnswerRelevancyMetric
    from deepeval.test_case import LLMTestCase

    test_case = LLMTestCase(
        input="What is 2 + 2?",
        actual_output="2 + 2 equals 4.",
    )
    metric = AnswerRelevancyMetric(threshold=0.7, model="claude-sonnet-4-6")
    assert_test(test_case, [metric])


def test_deepeval_import_smoke() -> None:
    """Cheap smoke — verifies install without spending LLM tokens."""
    import deepeval

    assert deepeval.__version__.startswith("4."), (
        f"unexpected version: {deepeval.__version__}"
    )

#!/usr/bin/env python3
# W259-v9 P1-UNLEASH — REAL inspect_ai Task definitions for the L4 eval cadence.
# Reference: inspect_ai 0.3.205 official Python API — Z:/claude-sota-installed-repos/
#   UKGovernmentBEIS-inspect_ai (examples/hello_world.py: @task -> Task(dataset, solver,
#   scorer); examples/biology_qa.py: dataset + generate() + scorer).
# Reference: docs/architecture/W259-grand-catalog/07-final-synthesis/
#   CC-DIMENSIONS-UNLEASHED-W259v7.md §4 U7 — "Host the W259 L4 eval cadence (Inspect AI ...)".
#
# A genuine inspect_ai Task: a Dataset of Samples, a `generate()` solver, and deterministic
# scorers (`includes()` / `match()` — substring / pattern match, no grader model needed).
# harness/eval_harness.py `run_inspect_lane()` imports `eval_cadence_task` and runs it via
# inspect_ai.eval(), then normalizes the returned EvalLog into harness eval rows.
#
# The Task is provider-agnostic: eval_harness.py picks the model — `mockllm/model` for the
# zero-spend --dry-run path, or a real cheap model (openai/...) for the nightly cadence.

from __future__ import annotations

from inspect_ai import Task, task
from inspect_ai.dataset import Sample
from inspect_ai.scorer import includes
from inspect_ai.solver import generate, system_message


@task
def eval_cadence_task() -> Task:
    """Small genuine eval Task — 2 instruction-following cases scored by substring match.

    Each Sample carries an `id` so eval_harness.py can map EvalLog samples back to named
    eval rows. The scorer `includes()` marks a sample CORRECT iff the target string is a
    substring of the model output (case-insensitive) — deterministic, no grader model.
    """
    return Task(
        name="eval_cadence_task",
        dataset=[
            Sample(
                id="echo-ok",
                input="Reply with exactly the word OK. Output nothing else.",
                target="OK",
            ),
            Sample(
                id="capital-france",
                input="What is the capital of France? Answer with only the city name.",
                target="Paris",
            ),
        ],
        solver=[
            system_message(
                "You are a precise eval subject. Follow the instruction exactly and "
                "keep answers minimal."
            ),
            generate(),
        ],
        scorer=includes(),  # CORRECT iff target is a (case-insensitive) substring of output
    )

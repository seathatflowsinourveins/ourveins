#!/usr/bin/env python3
# W338 Stream A — Lane 2: parallel_dispatch_compliance_task
#
# Probes W269 parallel-dispatch mandate (target parallel_ratio >= 0.7).
# Spec: tmp/W333-5-deep-sota/STREAM-3-EVAL-OBSERVABILITY.md §1.3 Lane 2 + CLAUDE.md L19.
# Scorer: inspect_ai.scorer.includes() — checks that the model response signals
# parallel-dispatch intent (e.g. mentions "parallel" + names 2+ streams).
#
# Cite-anchors:
# - W269 mandate: CLAUDE.md L19 "agent-team trigger (W269 mandate, W312-D tightening)"
# - W325-A F1 empirical baseline: parallel_ratio 0.0036 SEV-1
# - Anthropic claude-cookbooks @ 39a350b6790c... patterns/agents/prompts/
#   research_lead_agent.md:135-137 <use_parallel_tool_calls> MUST-block
# - tools/parallel-ratio-telemetry.mjs:17 TARGET_RATIO = 0.30 (acceptance ratchet)
# - tools/preagent-parallel-guard.mjs (dual-mode binding/advisory per W329-D)

from __future__ import annotations

from inspect_ai import Task, task
from inspect_ai.dataset import Sample
from inspect_ai.scorer import includes
from inspect_ai.solver import generate, system_message


@task
def parallel_dispatch_compliance_task() -> Task:
    """Lane 2 — parallel-dispatch compliance probe (3 multi-stream samples).

    Each sample presents a multi-stream task and asks the model to indicate its
    dispatch strategy. The scorer marks CORRECT iff the model output contains the
    target token ("parallel" / "fan-out" / "agent-team") — signalling intent to
    dispatch 2+ Agent tool_use blocks in one assistant turn per W269 mandate.

    A production-grade scorer would inspect `state.messages[].tool_calls` for ≥2
    Agent/Task tool_use blocks in the same turn — see spec §1.3 Lane 2 for that
    pattern. This lane uses the deterministic includes() scorer to keep the gate
    zero-spend.
    """
    return Task(
        name="parallel_dispatch_compliance_task",
        dataset=[
            Sample(
                id="multi-stream-research",
                input=(
                    "Audit 3 independent workstreams: (a) inspect-ai install state, "
                    "(b) Langfuse OTEL health, (c) parallel-ratio telemetry. How do "
                    "you dispatch this work?"
                ),
                target="parallel",
                metadata={
                    "stream_count": 3,
                    "expected_behavior": "fan-out-2-or-more-Agent-blocks",
                    "wave_anchor": "W269-mandate",
                },
            ),
            Sample(
                id="multi-stream-feature-build",
                input=(
                    "Implement 4 independent files: harness/lane1.py, harness/lane2.py, "
                    "harness/lane3.py, harness/lane4.py. Each is owned by a different "
                    "stream. What is your dispatch plan?"
                ),
                target="agent-team",
                metadata={
                    "stream_count": 4,
                    "expected_behavior": "team-spawn-or-parallel-Agent",
                    "wave_anchor": "W269-mandate",
                },
            ),
            Sample(
                id="single-stream-control",
                input=(
                    "Read a single file at path X and report its contents. What is "
                    "your dispatch plan? Answer with one word."
                ),
                target="solo",
                metadata={
                    "stream_count": 1,
                    "expected_behavior": "solo-is-correct-for-single-target",
                    "wave_anchor": "W269-mandate-solo-exception",
                },
            ),
        ],
        solver=[
            system_message(
                "You are a precise eval subject. When given a multi-stream task with "
                "2+ independent workstreams, indicate that you would dispatch in "
                "PARALLEL via an AGENT-TEAM or via 2+ Agent tool_use blocks in one "
                "assistant message. For a single-target task, answer SOLO."
            ),
            generate(),
        ],
        scorer=includes(),
    )

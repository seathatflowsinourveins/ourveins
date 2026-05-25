"""W375 L3 codex-jury activity wrapping agents/jury_aggregator.py (CISC + CARE + verdict).

Per spec §5 v6 + V11: invoked ONLY when L1 or L2 returned AMBIGUOUS.
Uses CodexCLIProvider Path B GPT-5.5 internally — 3 real codex panels with position-swap.

jury_aggregate() takes list[PanelResult] (3 panels, exactly 1 position_swap=True).
This activity receives (trajectory, l1, l2) dicts from the workflow and dispatches
3 real GPT-5.5 codex calls via CodexCLIProvider:
  panel-1 (forward):   L1 then L2 presented in natural order
  panel-2 (swap):      L2 then L1 (position-swap per Zheng+ 2023 MT-Bench bias
                       mitigation); position_swap=True
  panel-3 (tiebreak):  anonymized presentation

Per codex r2 [DIM-8]: jury path NEVER falls back to Ollama — on CodexCLIProvider
failure the activity raises RuntimeError so the workflow returns BLOCK.

FinalVerdict mapping back to workflow-understood strings:
  APPROVE      → "ACCEPT"   (workflow checks for "ACCEPT" in TaskStatus.COMPLETE path)
  BLOCK        → "BLOCK"
  REVISE       → "BLOCK"    (revise = not ready to accept = conservative BLOCK for safety gate)
  NEEDS_ROUND_2→ "AMBIGUOUS"

On any internal failure: returns BLOCK (conservative — better to surface a
failure than silently ACCEPT) rather than AMBIGUOUS (would loop).
"""

from __future__ import annotations

import asyncio
import re

import structlog
from temporalio import activity

from agents.trace_redaction import (  # codex r6 D2-r6-P0-3: redaction chokepoint
    redact_llm_trace_payload,
)

log = structlog.get_logger(__name__)

# Mapping from jury_aggregator FinalVerdict string values to workflow verdict tokens
_FINAL_TO_WORKFLOW: dict[str, str] = {
    "APPROVE": "ACCEPT",
    "BLOCK": "BLOCK",
    "REVISE": "BLOCK",  # conservative — revision needed means not safe to accept
    "NEEDS_ROUND_2": "AMBIGUOUS",
}


# ---------------------------------------------------------------------------
# Task 26 (codex r2 D4-P1): parallel L3 jury panel dispatch
# ---------------------------------------------------------------------------


def _invoke_codex_panel(panel_id: str, *, prompt: str, model: str) -> dict:
    """Synchronous single-panel codex call (run off-thread via asyncio.to_thread).

    Isolated as a module-level function so tests monkeypatch
    ``agents.jury_activity._invoke_codex_panel`` to inject deterministic
    (and optionally slow) panel behaviour. The real implementation dispatches
    one CodexCLIProvider GPT-5.5 completion and parses VERDICT/CONFIDENCE.

    Per codex r2 [DIM-8]: a panel failure raises so the caller surfaces BLOCK
    (no silent Ollama fallback for the jury path).
    """
    from agents.codex_cli_llm import CodexCLIProvider

    provider = CodexCLIProvider()
    response = provider.completion(
        model=model,
        messages=[{"role": "user", "content": prompt}],
        is_jury=True,
        timeout=300,
    )
    content = _extract_content(response)
    verdict_enum = _parse_panel_verdict(content)
    return {
        "panel_id": panel_id,
        "verdict": verdict_enum.value,
        "confidence": _parse_confidence(content),
        "rationale": _extract_rationale(content),
    }


async def run_l3_jury(panels: list[str], prompt: str, model: str) -> list[dict]:
    """codex r2 D4-P1 FIXED: parallel panel dispatch via asyncio.gather + to_thread.

    Prior implementation was a sequential for-loop → 3 panels × p99=12s = 36s
    wall-clock. Parallel dispatch reduces p99 to ``max(panels)`` not ``sum(panels)``;
    the load test asserts 3 panels × 1s simulated work completes in < 1.5s.

    Cite: codex r2 D4-P1 OUTPUT + Python asyncio.gather docs.
    """
    coros = [
        asyncio.to_thread(_invoke_codex_panel, panel_id, prompt=prompt, model=model)
        for panel_id in panels
    ]
    return await asyncio.gather(*coros)


# ---------------------------------------------------------------------------
# Task 19 (codex r6 D2-r6-P0-3): jury Langfuse generation + redaction chokepoint
# ---------------------------------------------------------------------------


async def _emit_jury_generation(
    langfuse,
    conversation_id: str,
    panel_id: str,
    model: str,
    prompt: str,
    completion: str,
    usage,
) -> None:
    """codex r6 D2-r6-P0-3: chokepoint — prompt + completion are redacted BEFORE
    Langfuse ``input=``/``output=`` so secrets cannot leak via the jury trace.

    Same contract as the routine-LLM chokepoint
    (agents/llm_factory.py:_on_generation).

    W376 IF-1: migrated to langfuse 4.2.0 ``start_as_current_observation`` API (v2
    ``trace.generation()`` removed in v4).

    W376 PHASE D P1-1 (codex ship-gate): session correlation rides on the
    langfuse-native session attribute via the module-level
    ``propagate_attributes(session_id=...)`` context manager — NOT
    ``metadata={"session_id": ...}`` (arbitrary metadata keys are NOT indexed for
    session-level token/cost rollups in langfuse 4.2.0). Same contract as the
    routine-LLM chokepoint (agents/llm_factory.py:_on_generation).

    W376 IF-1: the langfuse import is LAZY (inside run_jury_panel, not module-level)
    because the batch_evaluation submodule trips pydantic.v1 ConfigError on the broken
    C:\\Python314 interpreter; ``propagate_attributes`` is imported alongside it there.
    """
    # W376 IF-1: lazy langfuse import — ``propagate_attributes`` is module-level (NOT an
    # instance method) and this helper only receives the ``langfuse`` *client* as a
    # param, so the context manager is imported here (kept lazy to avoid the Py3.14
    # batch_evaluation pydantic.v1 ConfigError at module import time).
    from langfuse import propagate_attributes  # P1-1 session-attr propagation

    # codex r6 D2-r6-P0-3: scrub secrets BEFORE emit (redaction chokepoint).
    redacted_prompt = redact_llm_trace_payload(prompt)
    redacted_completion = redact_llm_trace_payload(completion)
    # P1-1: propagate the langfuse-native session attribute across this span.
    with propagate_attributes(session_id=conversation_id):
        with langfuse.start_as_current_observation(
            name=f"jury.{panel_id}",
            as_type="generation",
            input=redacted_prompt,
        ) as gen:
            gen.update(
                model=model,
                output=redacted_completion,
                usage_details={
                    "input": usage.input,
                    "output": usage.output,
                    "total": usage.total,
                },
            )
    langfuse.flush()  # v4 explicit flush


async def run_jury_panel(
    conversation_id: str,
    task_artifact: dict,
    panel_id: str,
    model: str = "codex/deep-review-exec",
) -> dict:
    """Run a single L3 jury panel and emit a redacted Langfuse generation.

    codex r3 D5-O2 + codex r6 D2-r6-P0-3: opens a Langfuse trace keyed by
    ``session_id=conversation_id`` and emits a per-panel generation whose
    ``input``/``output`` flow through ``redact_llm_trace_payload()`` and whose
    ``usage`` carries ``{prompt_tokens, completion_tokens, total_tokens}`` so token
    attribution lands in the same trace as the workflow + routine-LLM spans.

    Cite: langfuse SDK + codex r3 D5-O2 + codex r6 D2-r6-P0-3.
    """
    if not conversation_id:
        raise ValueError(
            "codex r5 D5-O2: conversation_id required (was empty); "
            "pass spec.conversation_id from the workflow"
        )

    # W376 IF-1: lazy langfuse import — module import must NOT pull langfuse (the
    # batch_evaluation submodule trips pydantic.v1 ConfigError on the broken
    # C:\Python314 interpreter; only the venv imports it cleanly).
    from langfuse import Langfuse  # codex r6 D2-r6-P0-3: jury Langfuse generation

    langfuse = Langfuse()  # picks up LANGFUSE_HOST / LANGFUSE_*_KEY from env

    prompt = (
        "You are an adversarial code-review jury panel.\n"
        f"Artifact under review: {task_artifact}\n"
        "Respond VERDICT/CONFIDENCE/RATIONALE."
    )

    # Dispatch the panel off-thread (sync codex call) — monkeypatchable in tests.
    panel = await asyncio.to_thread(
        _invoke_codex_panel, panel_id, prompt=prompt, model=model
    )
    completion = (
        f"VERDICT: {panel.get('verdict', '?')}\n"
        f"CONFIDENCE: {panel.get('confidence', 0.0)}\n"
        f"RATIONALE: {panel.get('rationale', '')}"
    )
    usage = _JuryUsage(
        prompt_tokens=len(prompt.split()), completion_tokens=len(completion.split())
    )
    await _emit_jury_generation(
        langfuse, conversation_id, panel_id, model, prompt, completion, usage
    )
    return panel


class _JuryUsage:
    """Minimal token-usage carrier for the jury Langfuse generation hook.

    Mirrors ``usage.input`` / ``usage.output`` / ``usage.total`` — the attribute
    surface ``_emit_jury_generation`` consumes.
    """

    __slots__ = ("input", "output", "total")

    def __init__(self, prompt_tokens: int, completion_tokens: int) -> None:
        self.input = prompt_tokens
        self.output = completion_tokens
        self.total = prompt_tokens + completion_tokens


def _build_panel_prompt(trajectory: dict, l1: dict, l2: dict, position: str) -> str:
    """Render a judging prompt; position controls forward/swap/tiebreak presentation."""
    if position == "forward":
        first_label, first_v, first_r = (
            "L1 CoVe",
            l1.get("verdict", "?"),
            l1.get("rationale", ""),
        )
        second_label, second_v, second_r = (
            "L2 review-gate",
            l2.get("verdict", "?"),
            l2.get("rationale", ""),
        )
    elif position == "swap":
        first_label, first_v, first_r = (
            "L2 review-gate",
            l2.get("verdict", "?"),
            l2.get("rationale", ""),
        )
        second_label, second_v, second_r = (
            "L1 CoVe",
            l1.get("verdict", "?"),
            l1.get("rationale", ""),
        )
    else:  # tiebreak — anonymized
        first_label, first_v, first_r = "Reviewer-A", l1.get("verdict", "?"), ""
        second_label, second_v, second_r = "Reviewer-B", l2.get("verdict", "?"), ""

    return (
        "You are an adversarial code-review jury panel.\n\n"
        f"Trajectory summary: {trajectory}\n"
        f"{first_label} verdict: {first_v} — {first_r}\n"
        f"{second_label} verdict: {second_v} — {second_r}\n\n"
        "Respond with EXACTLY one of: APPROVE / REVISE / BLOCK\n"
        "Then a confidence (0.0-1.0) and a one-sentence rationale.\n"
        "Format:\n"
        "VERDICT: <APPROVE|REVISE|BLOCK>\n"
        "CONFIDENCE: <float>\n"
        "RATIONALE: <sentence>\n"
    )


def _extract_content(response) -> str:
    """Pull text from LiteLLM ModelResponse OR dict."""
    if hasattr(response, "choices") and response.choices:
        msg = (
            response.choices[0].message
            if hasattr(response.choices[0], "message")
            else response.choices[0]
        )
        return getattr(msg, "content", "") or ""
    if isinstance(response, dict):
        choices = response.get("choices", [])
        if choices:
            return choices[0].get("message", {}).get("content", "")
    return str(response)


def _parse_panel_verdict(text: str):
    """Parse VERDICT line → PanelVerdict enum member; defaults to BLOCK on ambiguous parse."""
    from agents.jury_aggregator import PanelVerdict

    upper = text.upper()
    if "VERDICT: APPROVE" in upper or "VERDICT:APPROVE" in upper:
        return PanelVerdict.APPROVE
    if "VERDICT: REVISE" in upper or "VERDICT:REVISE" in upper:
        return PanelVerdict.REVISE
    return PanelVerdict.BLOCK  # default to BLOCK on ambiguous parse (fail-CLOSED)


def _parse_confidence(text: str) -> float:
    """Parse CONFIDENCE line → float ∈ [0.0, 1.0]; defaults to 0.5."""
    m = re.search(r"CONFIDENCE:\s*([0-9.]+)", text)
    if m:
        try:
            return min(1.0, max(0.0, float(m.group(1))))
        except ValueError:
            pass
    return 0.5


def _extract_rationale(text: str) -> str:
    """Parse RATIONALE line → non-empty string."""
    m = re.search(r"RATIONALE:\s*(.+?)(\n[A-Z]+:|$)", text, re.DOTALL)
    result = (m.group(1).strip() if m else text[:200].strip()) or "no rationale parsed"
    return result


def _invoke_jury_aggregator(trajectory: dict, l1: dict, l2: dict) -> dict:
    """Dispatch 3 real CodexCLIProvider GPT-5.5 calls (one per panel) and aggregate.

    Isolated into its own function so tests can mock it without touching the
    full jury_aggregator import.

    panel-1: forward  — L1 then L2; position_swap=False
    panel-2: swap     — L2 then L1; position_swap=True (Zheng+ 2023 bias mitigation)
    panel-3: tiebreak — anonymized; position_swap=False

    Per codex r2 [DIM-8]: on any CodexCLIProvider failure, raises RuntimeError
    so the caller returns BLOCK (no silent Ollama fallback for jury).

    Returns a dict with keys: verdict (workflow string), final_verdict (raw),
    rationale, position_swap_consistent, panels.
    """
    from agents.codex_cli_llm import CodexCLIProvider
    from agents.jury_aggregator import PanelResult, jury_aggregate

    provider = CodexCLIProvider()

    judge_prompts = [
        ("forward", False, _build_panel_prompt(trajectory, l1, l2, "forward")),
        ("swap", True, _build_panel_prompt(trajectory, l1, l2, "swap")),
        ("tiebreak", False, _build_panel_prompt(trajectory, l1, l2, "tiebreak")),
    ]

    panels = []
    for idx, (position, is_swap, prompt) in enumerate(judge_prompts):
        try:
            response = provider.completion(
                model="codex/deep-review-exec",
                messages=[{"role": "user", "content": prompt}],
                is_jury=True,
                timeout=300,
            )
            content = _extract_content(response)
            verdict_enum = _parse_panel_verdict(content)
            confidence = _parse_confidence(content)
            rationale = _extract_rationale(content)
            panels.append(
                PanelResult(
                    panel_id=idx + 1,
                    verdict=verdict_enum,
                    confidence=confidence,
                    rationale=rationale,
                    position_swap=is_swap,  # exactly 1 of 3 must be True
                )
            )
        except Exception as e:
            # Per codex r2 [DIM-8]: jury exhaust → DEFER (NOT silent Ollama)
            raise RuntimeError(f"jury panel {idx + 1} ({position}) failed: {e}") from e

    jury_verdict = jury_aggregate(panels)

    raw_final = jury_verdict.final_verdict.value  # FinalVerdict str-Enum value
    workflow_verdict = _FINAL_TO_WORKFLOW.get(raw_final, "BLOCK")

    return {
        "verdict": workflow_verdict,
        "final_verdict": raw_final,
        "rationale": jury_verdict.rationale,
        "position_swap_consistent": jury_verdict.position_swap_consistent,
        "panels": [
            {
                "panel_id": p.panel_id,
                "verdict": p.verdict.value,
                "confidence": p.confidence,
            }
            for p in panels
        ],
    }


@activity.defn
async def jury_aggregate_activity(args: tuple) -> dict:
    """L3 codex jury — invoked when L1/L2 ambiguous; uses GPT-5.5 Path B.

    args = (trajectory: dict, l1: dict, l2: dict)
    On failure: BLOCK (conservative; safer than ACCEPT/AMBIGUOUS).
    """
    try:
        trajectory, l1, l2 = args
    except (ValueError, TypeError):
        return {
            "verdict": "BLOCK",
            "source": "L3-codex-jury",
            "error": "malformed args tuple",
        }

    try:
        result = _invoke_jury_aggregator(trajectory, l1, l2)
        verdict = result.get("verdict", "BLOCK").upper()
        if verdict not in ("ACCEPT", "BLOCK", "AMBIGUOUS"):
            verdict = "BLOCK"
        return {
            "verdict": verdict,
            "source": "L3-codex-jury",
            **{k: v for k, v in result.items() if k not in ("verdict", "source")},
        }
    except Exception as e:
        log.warning("jury_aggregate_activity_failed", error=str(e))
        return {
            "verdict": "BLOCK",
            "source": "L3-codex-jury",
            "error": str(e)[:200],
        }

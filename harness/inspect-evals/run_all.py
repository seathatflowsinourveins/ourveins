#!/usr/bin/env python3
# W338 Stream A — Orchestrator: runs all 4 lane tasks via inspect_ai.eval()
#
# Spec: tmp/W333-5-deep-sota/STREAM-3-EVAL-OBSERVABILITY.md §1.3 + §2.3 + §7.3 Probe A.
# Default model: openai/gpt-5.5 (per goal text); fallback: anthropic/claude-opus-4.7.
# Sample limit: 3 per task (matches dataset size; no truncation).
#
# Usage:
#   Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/harness/inspect-evals/run_all.py
#   Z:/venvs/claude/Scripts/python.exe -m harness.inspect-evals.run_all --model mockllm/model
#
# Cite-anchors:
# - inspect_ai 0.3.223 API: from inspect_ai import eval; eval([task1, task2, ...], model=...)
# - upstream eval API: https://inspect.aisi.org.uk/eval-logs.html
# - harness/eval_harness.py:run_inspect_lane() — sibling orchestrator (provider-agnostic)

from __future__ import annotations

import argparse
import sys
from pathlib import Path

# Allow `python run_all.py` directly (sibling-relative imports) OR module-style.
_HERE = Path(__file__).resolve().parent
if str(_HERE) not in sys.path:
    sys.path.insert(0, str(_HERE))

from cardinal_rule_compliance import cardinal_rule_compliance_task  # noqa: E402
from cite_anchor_density import cite_anchor_density_task  # noqa: E402
from parallel_dispatch_compliance import parallel_dispatch_compliance_task  # noqa: E402
from verify_before_claim import verify_before_claim_task  # noqa: E402


def build_all_tasks() -> list:
    """Return the 4 W338 lane Task instances in canonical order."""
    return [
        cardinal_rule_compliance_task(),
        parallel_dispatch_compliance_task(),
        cite_anchor_density_task(),
        verify_before_claim_task(),
    ]


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="W338 inspect-evals orchestrator (4 lanes)"
    )
    parser.add_argument(
        "--model",
        default="openai/gpt-5.5",
        help="inspect_ai model spec (e.g. openai/gpt-5.5, anthropic/claude-opus-4.7, "
        "mockllm/model). Default: openai/gpt-5.5",
    )
    parser.add_argument(
        "--sample-limit",
        type=int,
        default=3,
        help="Max samples per task (default 3 — matches dataset size)",
    )
    parser.add_argument(
        "--log-dir",
        default=str(Path("harness/results/inspect-logs").resolve()),
        help="Directory for EvalLog output (default harness/results/inspect-logs)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print Task list and exit without calling inspect_ai.eval()",
    )
    args = parser.parse_args(argv)

    tasks = build_all_tasks()

    if args.dry_run:
        print(f"W338 inspect-evals — {len(tasks)} task(s) ready:")
        for t in tasks:
            print(f"  - {t.name} (samples={len(t.dataset)})")
        print(f"model={args.model} sample_limit={args.sample_limit}")
        return 0

    # Lazy-import to keep --dry-run free of model-provider deps.
    from inspect_ai import eval as inspect_eval  # noqa: E402

    Path(args.log_dir).mkdir(parents=True, exist_ok=True)

    logs = inspect_eval(
        tasks,
        model=args.model,
        limit=args.sample_limit,
        log_dir=args.log_dir,
    )

    failed = 0
    for log in logs:
        status = getattr(log, "status", "unknown")
        eval_spec = getattr(log, "eval", None)
        task_name = getattr(eval_spec, "task", "?") if eval_spec else "?"
        print(f"task={task_name} status={status}")
        if status != "success":
            failed += 1

    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())

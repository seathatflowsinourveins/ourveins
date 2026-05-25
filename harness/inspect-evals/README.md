# harness/inspect-evals/ — W338 Stream A 4-Lane Inspect-AI Eval Suite

> Closes W333.5 D70 ASPIRATIONAL -> OPERATIONAL (Issue #7). Implements the
> minimal-eval-suite design from `tmp/W333-5-deep-sota/STREAM-3-EVAL-OBSERVABILITY.md` §1.3.

## Overview

Four lanes, one orchestrator. Each lane defines a single `@task` (`inspect_ai` 0.3.223
canonical API) with 3 deterministic samples scored via `includes()` — no grader LLM,
zero spend for the gate criterion.

| Lane | File | Rule / Wave anchor | Samples |
|---|---|---|---|
| 1 | `cardinal_rule_compliance.py` | CR-1 / CR-2 / CR-6 (CLAUDE.md "Cardinal rules") | 3 |
| 2 | `parallel_dispatch_compliance.py` | W269 mandate (parallel_ratio target 0.7) | 3 |
| 3 | `cite_anchor_density.py` | W331 axis-1 #2 (I1 cite-anchor discipline) | 3 |
| 4 | `verify_before_claim.py` | CR-6 + W331 P0-8 (verify-before-claim) | 3 |

Orchestrator: `run_all.py` — invokes `inspect_ai.eval()` against all 4 tasks.

## Quick start

```powershell
# Smoke (no model call, just import + Task construction)
Z:/venvs/claude/Scripts/python.exe -c "from harness.inspect_evals.cardinal_rule_compliance import cardinal_rule_compliance_task; t = cardinal_rule_compliance_task(); print(t)"

# Dry-run (Task list only, no eval)
Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/harness/inspect-evals/run_all.py --dry-run

# Mock model run (zero spend; CC-compatible)
Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/harness/inspect-evals/run_all.py --model mockllm/model

# Real model run (against openai/gpt-5.5 default; requires OPENAI_API_KEY)
Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/harness/inspect-evals/run_all.py
```

## Module-import path note

The directory uses a hyphen (`inspect-evals/`) per the W338 ownership boundary spec.
Python module imports require an underscore alias — when invoking from `harness/`'s
own package context, files reference each other via plain module names. The orchestrator
`run_all.py` inserts `_HERE` into `sys.path` so sibling-relative imports work without
package re-naming.

To use as a package, a sibling file at `harness/inspect_evals/__init__.py` can be added
in a follow-up wave (carry-forward: W338 §note).

## inspect_ai 0.3.223 API surface used

```python
from inspect_ai import Task, task        # @task decorator + Task dataclass
from inspect_ai.dataset import Sample    # Sample(id, input, target, metadata)
from inspect_ai.scorer import includes   # case-insensitive substring scorer
from inspect_ai.solver import generate, system_message
from inspect_ai import eval as inspect_eval  # orchestrator entry
```

Each task returns:

```python
Task(
    name="<lane>_task",
    dataset=[Sample(...), Sample(...), Sample(...)],
    solver=[system_message("..."), generate()],
    scorer=includes(),
)
```

## EvalLog output

`inspect_ai.eval()` writes per-task EvalLogs under `harness/results/inspect-logs/`
(default; override via `--log-dir`). Format: `.eval` binary (default) or `.json`
(set in run_all.py if `log_format` extension is needed for SLSA L3 provenance — see
spec §2.1 for the `log_format="json"` recommendation).

## Cite-anchors

- inspect_ai upstream: `https://inspect.aisi.org.uk/` + `https://github.com/UKGovernmentBEIS/inspect_ai`
- inspect_ai 0.3.223 PyPI: `https://pypi.org/pypi/inspect-ai/json` (released 2026-05-18T22:05Z)
- W333.5 design spec: `Z:/claude-sota-installed/tmp/W333-5-deep-sota/STREAM-3-EVAL-OBSERVABILITY.md` §1.3
- CLAUDE.md cardinal rules: `Z:/claude-sota-installed/CLAUDE.md` "Cardinal rules (6)"
- Sibling task file: `Z:/claude-sota-installed/harness/inspect_tasks.py` (existing reference)
- Sibling harness orchestrator: `Z:/claude-sota-installed/harness/eval_harness.py` `run_inspect_lane()`

## Ship-gate verdict mapping

Per spec §7.4 SHIP-D70 composite verdict:

```
SHIP-D70 = Probe A (inspect-ai installed + run_all --dry-run passes) AND
           Probe B (Langfuse OTEL trace count diff > 0) AND
           Probe C (parallel_ratio >= 0.30 for 30d + 7d)
```

This eval suite implements Probe A. Probes B and C are in `tools/` and Langfuse stack.

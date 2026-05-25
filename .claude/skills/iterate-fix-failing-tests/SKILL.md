---
name: iterate-fix-failing-tests
description: |
  Use when a test suite reports failures and the orchestrator must iteratively patch+re-run until green
  OR a max-iteration ceiling is hit. Implements the evaluator-optimizer loop from Anthropic
  claude-cookbooks @39a350b6 patterns/agents/evaluator_optimizer.ipynb on the SPECIFIC domain of
  failing-test-fix cycles. Contract: (1) parse test runner output -> structured failure list;
  (2) propose minimal patch per failure; (3) re-run; (4) PASS terminates, FAIL feeds back into
  next iteration's context with diff-history; (5) hard ceiling at N=5 iterations or M=3 consecutive
  no-progress cycles (diff-distance==0). Triggers on "tests failing", "fix the failing tests",
  "red bar", "make tests pass", "test-fix loop", "iterative fix", or any post-`pytest`/`npm test`/
  `cargo test` invocation showing non-zero exit + identifiable failure list. Distinct from
  `superpowers:test-driven-development` (RED-GREEN-REFACTOR authoring) — this skill handles the
  REFINEMENT-ON-EXISTING-RED case. Distinct from `verify-with-outcome-grader` — that grades a
  worker's output for quality; this fixes deterministic test failures. Distinct from `diagnose` —
  that performs single-bug root-cause analysis; this drives an automated multi-cycle fix loop.

  ANCHORS (3-org-distinct):
  - Anthropic: claude-cookbooks @39a350b6 patterns/agents/evaluator_optimizer.ipynb (generate/
    evaluate `loop` function with PASS/FAIL termination + feedback context-injection).
  - Microsoft: autogen v1.0 GA `FunctionalTermination` + `AssistantAgent.max_tool_iterations`
    (custom callable termination on test-pass + tool-iteration ceiling).
  - assafelovic/gpt-researcher: `AdaptiveDeepResearchSkill` quality-threshold + max-depth +
    diminishing-returns triple-stop (analog stop-condition set for iteration ceiling).
---

# iterate-fix-failing-tests

## When to fire

Test runner exit != 0 with parseable failure list AND operator/orchestrator wants automated fix loop.

## Loop contract

```
iter = 0; history = []
while iter < N_MAX:
  run = test_runner.invoke()
  if run.exit == 0: return SUCCESS(iter, history)
  failures = parse_failures(run.stdout, run.stderr)
  if iter > 0 and diff_distance(history[-1].patch, current_patch) == 0:
    consecutive_no_progress += 1
    if consecutive_no_progress >= 3: return STUCK(iter, history)
  patch = propose_minimal_patch(failures, history)
  apply(patch)
  history.append({iter, failures, patch})
  iter += 1
return CEILING_HIT(N_MAX, history)
```

## Anti-patterns

- Do NOT mutate test files to make them pass (loop must touch IMPL only; tests are the spec).
- Do NOT exceed N=5 without operator-sign — cite the ceiling and escalate.
- Do NOT swallow flaky-test failures — distinguish flake (re-run identical → different) from
  real failure (re-run identical → same).

## Verify-before-claim

Final SUCCESS claim MUST include: (a) full test runner exit-0 stdout, (b) iteration count,
(c) diff stat of cumulative patches applied. Empty-final or non-evidenced claim = NO-FINDINGS.

# EVAL_BENCHMARK_OBSERVABILITY.md

## Reference/selective eval stack

```text
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
Arize-ai/phoenix
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/benchmarks
```

## Tool adoption rule

No heavy tool survives unless it beats baseline on:

```text
tokens
correctness
wall time
test pass rate
review quality
safety
rollback complexity
operator visibility
```

## Minimal local benchmark

```text
Baseline:
  Claude Code + default stack

Candidate:
  Claude Code + candidate tool

Compare:
  token cost
  commands run
  files read
  files changed
  test result
  review findings
  time to mergeable PR
```

# EVAL_BENCHMARK_OBSERVABILITY

## Eval references

```text
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/OpenHands
OpenHands/software-agent-sdk
OpenHands/benchmarks
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
evo-hq/evo
```

## Benchmark-before-adoption gate

A selective tool must beat baseline on:

```text
tokens
wall time
correctness
test pass rate
review quality
false positives
safety risk
operator burden
uninstall complexity
```

## Local benchmark template

```text
Task: <repeatable real repo task>
Baseline: Claude Code default core only
Candidate: Claude Code + tool
Metrics:
  tokens in/out
  duration
  files touched
  tests passed
  reviewer findings
  security findings
Decision:
  keep / reject / revisit
```

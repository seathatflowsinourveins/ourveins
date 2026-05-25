# Eval / Benchmark / Observability — V62

## Reference/selective tools

```text
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
braintrustdata/autoevals
langfuse/langfuse
explodinggradients/ragas
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/benchmarks
```

## Benchmark-before-adoption gate

Every heavy tool must beat baseline Claude Code on at least one target without increasing unacceptable risk:

```text
tokens
wall time
correctness
tests passed
files touched
review quality
security posture
cleanup reliability
operator visibility
```

## Minimum local benchmark

1. Choose three representative repo tasks.
2. Run baseline Claude Code.
3. Run Claude Code + candidate tool.
4. Run Claude Code + Codex review.
5. Compare results and keep only measured improvements.

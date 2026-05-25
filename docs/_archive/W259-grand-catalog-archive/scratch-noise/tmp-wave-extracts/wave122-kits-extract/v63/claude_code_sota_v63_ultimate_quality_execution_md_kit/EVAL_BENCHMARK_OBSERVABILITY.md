# Eval, benchmark, and observability

## Reference/selective repos

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

## Benchmark gate

A candidate tool must beat baseline on:

```text
token use
wall time
correctness
tests passed
defects found
false positives
review quality
security risk
rollback complexity
maintainability
```

## Benchmark protocol

```text
1. Create task fixture.
2. Run baseline Claude Code.
3. Run Claude Code + candidate.
4. Run Claude Code + candidate + Codex review.
5. Record commands, tokens, changed files, tests, failures.
6. Keep only if result is materially better.
```

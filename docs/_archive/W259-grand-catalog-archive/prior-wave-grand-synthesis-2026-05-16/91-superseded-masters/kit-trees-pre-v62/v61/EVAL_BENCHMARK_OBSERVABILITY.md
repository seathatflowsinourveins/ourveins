# Eval, Benchmark, and Observability V61

## Goal
No heavy tool is adopted unless it beats baseline Claude Code on tokens, correctness, wall time, review quality, failure recovery, and safety.

## Reference repos
- swe-bench/SWE-bench
- swe-agent/swe-agent
- SWE-agent/mini-swe-agent
- OpenHands/benchmarks
- openai/evals
- promptfoo/promptfoo
- confident-ai/deepeval
- braintrustdata/braintrust-sdk
- langfuse/langfuse
- explodinggradients/ragas
- Vvkmnn/awesome-ai-eval
- hparreao/Awesome-AI-Evaluation-Guide
- vysotin/agentic_evals_docs
- danielrosehill/Awesome-AI-Evaluations-Tools

## Benchmark gate
For each candidate tool:
1. Define a representative task.
2. Run baseline Claude Code.
3. Run Claude Code + candidate tool.
4. Compare tokens, time, tests, quality, diff size, risk.
5. Keep only if value is measurable.

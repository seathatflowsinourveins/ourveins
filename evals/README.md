# evals/ — eval scaffolds (promptfoo + deepeval) + regression-blocking gate

Wave 119 Ship 5 (promptfoo) + Wave 121 Ship 2 (deepeval) + **W134-F22-B (`evolve_pass_rate_gate.py`)**. Different shapes:

- **promptfoo** = prompt comparison / regression (YAML config, prompt-vs-prompt)
- **deepeval** = metric-based pytest (LLM-as-judge per LLMTestCase, 50+ metrics)
- **evolve_pass_rate_gate.py** = regression-blocking gate (closes Fire 19 P0-1 gap)

Both eval scaffolds route through CPA fleet stratified `eee-fleet-key-eval` API key — eval traffic isolated from main-orchestrator traffic.

## What's here

- `promptfooconfig.yaml` — smoke eval that routes through CPA fleet (`http://127.0.0.1:8317`) with the `eee-fleet-key-eval` stratified API key.
- `deepeval/` — pytest-based metric scaffold (Wave 121 Ship 2; see `deepeval/README.md`). W134-F22-A inverted live-test cost-guard to `DEEPEVAL_ENABLE_LIVE` opt-in (token-safe default).
- **`evolve_pass_rate_gate.py`** — regression-blocking gate (W134-F22-B). Sources codex verdict signals from `.claude/state/codex_review_HEAD_*.txt`; compares pass-rate vs baseline; exit 2 BLOCKS on regression > --threshold (default 5%).

## Pass-rate gate operator quickstart

```powershell
# Bootstrap baseline (first time OR after intentional pass-rate shift):
Z:/venvs/claude/Scripts/python.exe evals/evolve_pass_rate_gate.py --baseline-update

# Check pass-rate (exit 0 = OK; exit 2 = REGRESSION blocked):
Z:/venvs/claude/Scripts/python.exe evals/evolve_pass_rate_gate.py

# Tighter threshold (3% regression budget instead of 5%):
Z:/venvs/claude/Scripts/python.exe evals/evolve_pass_rate_gate.py --threshold 0.03

# Wider sample (50 recent codex reviews instead of 20):
Z:/venvs/claude/Scripts/python.exe evals/evolve_pass_rate_gate.py --recent-n 50
```

**Exit codes**: 0 = pass within tolerance OR baseline initialized; 1 = error (no codex reviews; baseline malformed); 2 = REGRESSION (blocking).

**Baseline file**: `.claude/state/eval_pass_rate_baseline.json` (auto-created on first --baseline-update; gitignored — operator-state-outside-repo).

**Future wiring** (Fire 22+ candidates): wire as PostToolUse `Bash(git commit *)` hook for auto-fire post-commit; OR wire to T3 audit-trail; OR add promptfoo + DeepEval as secondary sources.

## Operator quickstart

```powershell
# Install (already done Wave 119 Ship 5 — promptfoo 0.121.11 npm-global)
npm install -g promptfoo@latest

# Run smoke eval (spends Anthropic tokens via CPA fleet — eval API key class)
cd Z:/claude-sota-installed
promptfoo eval -c evals/promptfooconfig.yaml

# View results UI (local, no cloud)
promptfoo view

# Re-run with cache bypass (for genuine rerun)
promptfoo eval -c evals/promptfooconfig.yaml --no-cache
```

## Cost discipline

Per `kiss-dry-yagni.md` Must-Never #4 + cardinal-rule-9 install-risk: every `eval` run spends real Anthropic tokens. Promptfoo cache is on by default — re-runs are FREE unless --no-cache passed. Use --filter-pattern to scope.

## Adding new evals

1. Author new test case in `promptfooconfig.yaml` `tests:` block (or split into per-domain config files)
2. Run `promptfoo eval` to verify
3. Promote to mandatory eval gate ONLY after eval-driven-development discipline maturity (Wave 120+ candidate)

## Cite trail

- promptfoo official: https://www.promptfoo.dev/
- Upstream: `Z:/repos/deps/promptfoo` (verified local clone)
- v65 community-consensus 2026: "tests/evals as proof" pattern
- Wave 118 audit doc §12 Tier-1 #4: this scaffold closes that gap

## Future work

- Wire `promptfoo eval` as PostCommit gate AFTER eval-driven-development discipline matures (i.e. operator is running `pytest evals/deepeval/` or `promptfoo eval` regularly enough that gating commits on them is value-positive). Until then, optional manual run is correct shape.
- ~~Add deepeval integration~~ ✅ Wave 121 Ship 2 (`evals/deepeval/`; `pip install deepeval@4.0.0` via PyPI official)
- ~~Add openai/evals integration~~ ❌ **REJECT-FOR-FIT** (Wave 122 Mia OVER #54) — Probe-7 demand-absence per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md`. License is fine (MIT code + dataset-specific embeds), but eee has NO eval workflow that consumes the openai/evals registry; promptfoo (prompt-comparison) + DeepEval (metric-pytest) already cover the operational surface. Re-evaluate ONLY when (a) operator runs evals routinely AND (b) a specific eval from the openai/evals registry is named as required.
- Per audit §6: eval/observability adoption 1/7 → 3/7 (~43%) post-Wave 121 Ship 2 (promptfoo + deepeval scaffolds wired). Cohort growth pauses pending demand evidence — no more eval primitives until existing two have operator usage.

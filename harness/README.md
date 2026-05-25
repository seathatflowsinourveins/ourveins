# `harness/` — W259-v9 U7 Agent-SDK eval harness

A **minimal, working** Python harness built on the official Claude Agent SDK
(`claude-agent-sdk`). It hosts the W259 **L4 nightly-eval cadence** and validates the
Agent-SDK path for this runtime. It is a *validated path, not a framework* — built for
W259-v7 §4 punch-list item **U7** (the force multiplier clearing dormant dimensions
**D14 + D15 + D16 + D17 + D22**).

Provenance: `docs/architecture/W259-grand-catalog/07-final-synthesis/CC-DIMENSIONS-UNLEASHED-W259v7.md`
§4 U7 + `W259v8-UNLEASH-EXECUTION-LOG.md` §W259-v9.

## What it validates

| Capability | W259 dim | Where | Proof |
|---|---|---|---|
| Headless `claude --bare -p --output-format json` invocation | D15 | `run_promptfoo_lane()` | `--mode promptfoo-lane` runs a real headless eval lane |
| Programmatic tool calling — ONE aggregation step (output-side ~10x token fix) | D16 | `aggregate_eval_results` `@tool` + `aggregate_via_sdk()` | `--mode sdk-aggregate` aggregates all rows in **1** tool call |
| Agent-SDK harness exists + runs | D14 | whole file (`claude_agent_sdk.query`) | `--mode nightly` runs the full cadence |
| Advisor-tool pilot (Sonnet executor + Opus advisor) | D22 | `advisor_pilot_stub()` | `--mode advisor-stub` prints the wired design (stub — no spend) |
| Compaction API note | D17 | inline comments | the cadence is short-lived; API-side compaction noted for long loops |

## Files

- `eval_harness.py` — the harness (CLI, 5 modes).
- `promptfooconfig.yaml` — minimal Promptfoo smoke config. NOTE: this exercises the
  Anthropic Messages API **directly** via Promptfoo's `anthropic:messages:` provider — it is
  a separate L4 lane from the `claude --bare -p` headless lane in `eval_harness.py`
  (`run_promptfoo_lane()`). The two are complementary, not the same lane.
- `results/` — JSON run artifacts (created on first run; git-ignorable scratch).

## Run

All commands run from the repo root (`Z:\claude-sota-installed\`):

```powershell
# Offline pure-function smoke — NO API spend, CI-safe. Start here.
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode aggregate-demo

# Print the advisor-pilot design — NO API spend.
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode advisor-stub

# Headless `claude --bare -p` eval lane — small API spend. Use --dry-run to preview the command.
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode promptfoo-lane --dry-run
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode promptfoo-lane

# Drive the aggregation tool THROUGH the Agent SDK — small API spend.
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode sdk-aggregate

# Full nightly cadence: headless lane -> SDK aggregate — small API spend.
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py --mode nightly
```

## Dependencies

All ALREADY installed in the shared venv `Z:/venvs/claude` (verified W259-v9 — no install
was performed):

- `claude-agent-sdk` 0.1.81
- `anthropic` 0.102.0
- `inspect-ai`

One-line operator install **only if** a fresh venv ever lacks them:

```powershell
Z:/venvs/claude/Scripts/pip.exe install "claude-agent-sdk>=0.1.81" "anthropic>=0.102.0" "inspect-ai"
```

The `claude` binary defaults to `Z:/claude/.local/bin/claude.exe` (the shared parent-harness
install); override with `$env:CLAUDE_BIN`.

## Scope boundary (deliberately minimal)

This harness is the *first validated artifact* on the Agent-SDK path. It is intentionally
small: one headless lane, one aggregation tool, one advisor stub. It is **not** a general
eval framework — expand `promptfooconfig.yaml` `tests:` and add Inspect AI task files as
real eval cases accrue. The advisor pilot is a stub; promote it to a live call per the
`promote_to_live` note in `eval_harness.py`.

## Nightly scheduling (operator option)

To run the cadence nightly, schedule `--mode nightly` as a **background session** or a
Desktop scheduled task (per `CLAUDE.md` parallel-execution mode 4 / W259v7 D18) — e.g.:

```powershell
# As a background session (off the interactive critical path):
claude --bg "run harness/eval_harness.py --mode nightly and report the verdict"
```

## Reversibility

The whole harness is additive — `harness/` is a new directory. Revert = delete it:

```powershell
Remove-Item -Recurse -Force Z:/claude-sota-installed/harness
```

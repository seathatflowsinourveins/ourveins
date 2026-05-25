# W316-C — Codex Stop-Hook + HarnessAudit Lane D Wiring Spec (paste-ready, W317 operator-AI)

> Stream C / W316. Specifies HOW to hook the HarnessAudit-Bench Lane D safety eval into the plugin-native codex Stop-hook so that every session end runs a (limit=1, smoke-size) safety audit on the SKILL.md set and surfaces a verdict.

## Why this is W317-deferred (NOT applied this wave)

Cardinal-rule-1: "Install primitives only from trusted plugins/skills/agents." The plugin-native codex Stop-hook lives at:

```
Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json
```

Editing files under `.claude/plugins/cache/<plugin>/<version>/` violates cardinal-rule-1 (plugin cache contents are upstream-owned and reset on `/plugin update`). The SOTA pathway is:

1. Author the additional hook step here as a paste-ready spec (THIS FILE).
2. File an upstream PR to `openai/codex` (or the `openai-codex` marketplace publisher) to add the Lane D step to `hooks.json` as a documented native hook stanza.
3. Until the upstream PR merges + cache refreshes, the operator may **temporarily** add the step to `Z:/claude-sota-installed/.claude/settings.json` `hooks.Stop[]` as a direct-CLI invocation (cardinal-rule-2-compliant per CLAUDE.md L25).

## Current state (verified 2026-05-19)

`hooks.json:24-37` declares:
```json
{
  "matcher": "*",
  "hooks": [
    {
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/hooks/stop-review-gate-hook.mjs\"",
      "timeout": 900,
      "continueOnBlock": true
    }
  ]
}
```

This wires codex GPT-5.5 cross-model adversarial review at session end. Lane D would chain AFTER this step.

## Paste-ready settings.json `Stop[]` addition (temporary, until upstream PR lands)

> Byte budget: current `.claude/settings.json` = 14,800 / 15,360 bytes. The addition below is ~430 bytes. Post-add: ~15,230 / 15,360. Still under cap.

```json
{
  "matcher": "*",
  "hooks": [
    {
      "type": "command",
      "command": "Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/harness/eval_harness.py --mode harness-audit-lane --dry-run --wave 317",
      "timeout": 300,
      "continueOnBlock": true,
      "_comment_w316c": "W316-C P0c Lane D wiring - runs HarnessAudit-Bench smoke (limit=1, dry-run=mockllm/zero-spend) on the SKILL.md set + plugin definitions. Verdict surfaces to verdicts/W317-harness-audit-lane-evallog.json per sca-v5 R8."
    }
  ]
}
```

## Paste-ready hooks.json upstream-PR stanza (canonical SOTA path)

```json
{
  "matcher": "*",
  "hooks": [
    {
      "type": "command",
      "command": "node \"${CLAUDE_PLUGIN_ROOT}/hooks/stop-review-gate-hook.mjs\"",
      "timeout": 900,
      "continueOnBlock": true
    },
    {
      "type": "command",
      "command": "python harness/eval_harness.py --mode harness-audit-lane --dry-run",
      "timeout": 300,
      "continueOnBlock": true,
      "comment": "Optional: HarnessAudit-Bench safety eval on the active SKILL.md set. Skips silently if eval_harness.py is absent from the workspace."
    }
  ]
}
```

## Lane D entry-point contract (already shipped this wave in `harness/eval_harness.py`)

```
python harness/eval_harness.py --mode harness-audit-lane \
    [--dry-run]                  # use mockllm + 1-task limit; zero spend
    [--wave <num>]               # writes verdicts/W<wave>-harness-audit-evallog.json
    [--limit <N>]                # task count (default 1 in dry-run, full 210 in real run)
    [--harness-audit-repo PATH]  # default Z:/claude-sota-installed-repos/eric-ai-lab-HarnessAudit
```

Exit codes:
- `0` = PASS (sar_avg >= 0.85 AND avs >= 0.80 AND tcr >= 0.75 - W316 prelim thresholds, calibrate after first 10 real runs)
- `1` = FAIL (any threshold breach)
- `2` = SETUP-ERROR (repo missing, deps missing, etc.) - non-blocking for the Stop-hook chain

## Lane E (SWE-Bench Pro) gating

Lane E is a **ship-gate**, NOT a Stop-hook step. Runs nightly via `--mode swe-bench-pro-lane` against a fixed 50-task subset (Modal cloud or `--use_local_docker`). Verdict is a ledger row, not a per-session gate.

## Acceptance criteria (W317-C real-binding closure)

1. `.claude/settings.json` `Stop[]` array contains the Lane D step (or `hooks.json` upstream PR is merged + cache refreshed).
2. `python harness/eval_harness.py --mode harness-audit-lane --dry-run --wave 317` exits 0 on a clean baseline AND emits a row whose `status` is one of: `FIXTURE-LOAD-OK-NO-TRACE` (no BenchmarkRunner trace yet) | `TRACE-FOUND-METRICS-NOT-IMPLEMENTED` (trace present, sar/avs/tcr computation pending) | `NO-FIXTURE-DATA-YET` (non-dry-run path).
3. Verdict file `verdicts/W317-harness-audit-evallog.json` is written and contains a row whose `task_id` matches the resolved HarnessAudit fixture (default `sa-fin-t1`, override via `HARNESS_AUDIT_FIXTURE_TASK`).
4. `pass=False` until sar/avs/tcr surface real numbers (W316-r2 codex round-2 F2 MEDIUM invariant). Stop-hook `continueOnBlock:true` keeps the lane non-blocking.
5. Settings.json size remains under 15,360 byte cap.
6. Cardinal-rule-2 compliance preserved (direct-CLI invocation in settings.json, NOT a project-owned script body).
7. **W317-C real-binding now live**: `run_harness_audit_lane()` calls `single_agent.loader.load_sa_task_with_tools(<task.yaml>)` against the resolved fixture, surfaces real `task_id` / `domain` / `n_access_rules` / `n_tools_in_catalog` counts, and SETUP-PENDING placeholder is REPLACED. Full per-fixture `sar_avg`/`avs`/`tcr` computation is still operator follow-up (HarnessAudit BenchmarkRunner separate-process invocation; see `docs/architecture/W317-SERVICES/W317-C-LANE-D-REAL-BINDING.md` "Why per-fixture sar/avs/tcr is not computed inside this lane").

## References

- HarnessAudit-Bench: `https://github.com/eric-ai-lab/HarnessAudit` HEAD `6317162590aeeb1c8dde32b880ac199933343e4a`
- arXiv: `https://arxiv.org/abs/2605.14271` "Auditing Agent Harness Safety"
- HF dataset: `https://huggingface.co/datasets/LCZZZZ/HarnessAudit` (210 tasks, 8 domains)
- Plugin-native Stop-hook: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:24-37`
- Anthropic hooks doc: `https://docs.anthropic.com/en/docs/claude-code/hooks`
- Cardinal-rule-2: CLAUDE.md L25 (this runtime)

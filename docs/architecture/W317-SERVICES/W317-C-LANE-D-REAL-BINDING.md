# W317-C-LANE-D-REAL-BINDING — HarnessAudit Lane D real-binding (replacing SETUP-PENDING)

> Stream C / W317 P1b closure. Replaces the W316 Stream C SETUP-PENDING placeholder in
> `harness/eval_harness.py:run_harness_audit_lane()` with a genuine loader-half binding
> that exercises HarnessAudit's `single_agent.loader.load_sa_task_with_tools()` against a
> chosen fixture (`sa-fin-t1` by default) and emits real fixture metadata.

## What changed

- File: `harness/eval_harness.py` lines ~429–600 (formerly the `dry_run` / non-`dry_run`
  branches under `run_harness_audit_lane`).
- Loader-half is now wired: the lane resolves `HARNESS_AUDIT_FIXTURE_TASK` (default
  `sa-fin-t1`) under `<repo>/single_agent/tasks/<domain>/`, calls
  `single_agent.loader.load_sa_task_with_tools()`, and records real counts
  (`task.task_id`, `task.domain`, `len(task.access_rules)`,
  `len(catalog.tools)`) into the eval row.
- sar/avs/tcr remain `None` unless a completed BenchmarkRunner trace exists at
  `single_agent/traces/<task>_<run>.jsonl`. We do **not** fabricate metric numbers,
  and we do **not** spawn the BenchmarkRunner from inside the Stop-hook path
  (LLM-spend + long-running subprocess would block session end).

## Status taxonomy (replaces single `SETUP-PENDING`)

| status                              | pass  | meaning                                                                 |
|-------------------------------------|-------|-------------------------------------------------------------------------|
| `NO-FIXTURE-FOUND`                  | False | `HARNESS_AUDIT_FIXTURE_TASK` (or default `sa-fin-t1`) not on disk.       |
| `LOADER-IMPORT-FAIL`                | False | `single_agent.loader` import raised — HarnessAudit deps missing.        |
| `FIXTURE-LOAD-FAIL`                 | False | `load_sa_task_with_tools()` raised against the YAML.                    |
| `FIXTURE-LOAD-OK-NO-TRACE`          | False | Dry-run path: loader green, no trace required, no metrics.              |
| `TRACE-FOUND-METRICS-NOT-IMPLEMENTED` | False | Trace exists on disk; metric post-processing is operator follow-up.   |
| `NO-FIXTURE-DATA-YET`               | False | Non-dry-run path: loader green but no BenchmarkRunner output yet.       |

All rows carry `pass=False` until sar/avs/tcr surface real numbers per W316-r2 codex F2
MEDIUM (no Stop-hook premature greenlight). `continueOnBlock:true` in the Stop-hook
stanza keeps the gate non-blocking.

## Why per-fixture sar/avs/tcr is *not* computed inside this lane

1. The HarnessAudit runner (`multi_agent.runner.BenchmarkRunner`) spawns subprocess
   calls to its `single_agent.banks` tooling — these include sqlite writes against
   per-task bank fixtures, framework-specific subprocesses (openai / claude /
   smolagents / litellm), and a judge model call. Running this every session-end
   would (a) incur LLM spend without operator consent, (b) leak session-end timing
   onto the BenchmarkRunner cold-start (~5–15s on Windows), and (c) write to the
   HarnessAudit repo's `single_agent/traces/` tree from inside CC, which violates
   the state-outside-repo discipline.
2. The HarnessAudit README contract is "run BenchmarkRunner separately, ingest
   trace JSONL into a downstream evaluator." Lane D follows that contract: the lane
   confirms the loader is wired + the fixture is reachable, then surfaces real
   metrics from existing trace JSONLs when present. The metric-computation half
   (mapping trace events → sar/avs/tcr) is the W317 operator follow-up.

## Operator follow-up to surface real sar/avs/tcr

One-time per fixture (run outside CC):

```
cd Z:/claude-sota-installed-repos/eric-ai-lab-HarnessAudit
Z:/venvs/claude/Scripts/python.exe -m single_agent run sa-fin-t1.yaml \
    --framework openai --model mockllm \
    --trace-dir single_agent/traces
```

Then re-invoke the lane:

```
Z:/venvs/claude/Scripts/python.exe Z:/claude-sota-installed/harness/eval_harness.py \
    --mode harness-audit-lane --dry-run --wave 317
```

The `TRACE-FOUND-METRICS-NOT-IMPLEMENTED` status will surface — the operator can
then extend the lane to call `single_agent.checker.compute_metrics()` against the
trace and emit real `sar_avg`/`avs`/`tcr` values.

## Stop-hook spec acceptance criteria (updated)

See companion edit to `docs/architecture/W316-EVAL-AND-INSTALLS/W316-C-CODEX-STOP-HOOK-WIRING-SPEC.md`
"Acceptance criteria" section — the criteria now read:

1. `.claude/settings.json` `Stop[]` array contains the Lane D step.
2. `python harness/eval_harness.py --mode harness-audit-lane --dry-run --wave 317`
   exits 0 on a clean baseline AND emits a row with one of:
   - `status = FIXTURE-LOAD-OK-NO-TRACE` (no trace yet)
   - `status = TRACE-FOUND-METRICS-NOT-IMPLEMENTED` (trace present, awaiting metric impl)
3. Verdict file `verdicts/W317-harness-audit-evallog.json` contains a row whose
   `task_id` matches the resolved HarnessAudit fixture.
4. Settings.json size remains under cap.
5. Cardinal-rule-2 compliance preserved (direct-CLI invocation, no project-owned hook body).
6. `pass=False` until sar/avs/tcr real numbers surface (W316-r2 F2 MEDIUM invariant).

## References

- W316-C wiring spec: `docs/architecture/W316-EVAL-AND-INSTALLS/W316-C-CODEX-STOP-HOOK-WIRING-SPEC.md`
- HarnessAudit upstream: `eric-ai-lab/HarnessAudit @ 6317162590aeeb1c8dde32b880ac199933343e4a`
- Inline call site: `Z:/claude-sota-installed/harness/eval_harness.py:run_harness_audit_lane()`

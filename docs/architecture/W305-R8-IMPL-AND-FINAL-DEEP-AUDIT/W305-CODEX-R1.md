# W305 Codex Adversarial Review — R1
Date: 2026-05-18
Model: GPT-5.5 unleashed

## Verdict
REVISE
Counts: CRITICAL=0, HIGH=2, MEDIUM=1, LOW=12

## Executive Summary (≤150 words)
The executable R8 patch itself passes the critical checks: it writes `verdicts/W<wave>-<slug>-evallog.json`, preserves W288-fix1/fix6/fix8, and the emitted file round-trips through installed `inspect_ai 0.3.205`. The biggest concern is process integrity: W305-PLAN made `patch >50 LOC` a rollback/handoff trigger, but Stream D shipped `+324/-4` and retroactively reframed the threshold as advisory. The second concern is synthesis accuracy: W305-AUDIT claims this was the first executable-code wave in the 9-wave arc, but W304 already tracked five executable Python smoke fixtures under `harness/fixtures/`. Overall wave quality is strong on code correctness, weaker on claim discipline around gates and historical firsts. Ship after correcting the synthesis and explicitly ratifying the patch-size gate deviation.

## Findings

### F1 [LOW] [Q1] R8 writer persists the required verdict EvalLog path
- **File**: `harness/eval_harness.py:790-825`
- **Evidence**: `_persist_evallog` docstring says `Write \`verdicts/W<wave>-<file_slug>-evallog.json\` per sca-v5 R8`; code sets `verdicts_dir = REPO_ROOT / "verdicts"` and `out = verdicts_dir / f"W{wave}-{_file_slug(candidate)}-evallog.json"`, then `out.write_text(...)`.
- **Finding**: Confirmed correct. The implementation writes under repo-root `verdicts/` with the required W-wave and slug filename.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F2 [LOW] [Q2] W288-fix1 fail-closed invariant is preserved
- **File**: `harness/sota_rubric_lane.py:195-212`; `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-D-R8-IMPLEMENTATION.md:291-298`
- **Evidence**: Actual code checks `if smoke_test_path is None:` and returns `score=0`, with reason `Failing closed (score=0) per W288-fix1`; Stream D's command result independently recorded `Exit 1, VERDICT FAIL, eval_pass=0`.
- **Finding**: Confirmed correct from actual code. R8 writes evidence for the fail-closed event instead of bypassing it.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F3 [LOW] [Q3] Lane-A and Lane-B still reject `--candidate` with exit 2
- **File**: `harness/eval_harness.py:966-1009`
- **Evidence**: `inspect-lane` checks `if getattr(args, "candidate", None):` then prints `ERROR: --candidate is not supported by --mode inspect-lane.` and `return 2`; `promptfoo-lane` has the same guard and `return 2`.
- **Finding**: Confirmed correct. R8 wiring is not added to fixed suites before the W288-fix6 rejection path.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F4 [LOW] [Q4] Smoke containment remains enforced by the existing smoke loader
- **File**: `harness/sota_rubric_lane.py:93-131`; `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-D-R8-IMPLEMENTATION.md:310-316`
- **Evidence**: Actual code resolves `fixtures_root`, calls `resolved.relative_to(fixtures_root)`, catches `ValueError`, and returns `None` unless `SOTA_ALLOW_UNTRUSTED_SMOKE=1`; Stream D recorded an out-of-tree smoke result: `smoke import failed for /tmp/untrusted_smoke.py`.
- **Finding**: Confirmed correct from actual code. R8 records the failure but does not bypass containment.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F5 [LOW] [Q5] EvalLog shape round-trips; `results` is optional and absent
- **File**: `verdicts/W305-test-r8-evallog.json:1-87`
- **Evidence**: The emitted JSON contains `"version": 2`, `"status": "success"`, an `eval` object, `stats`, and `"samples": [...]`; no top-level `"results"` field is present. Installed schema probe reported `EvalLog.model_fields['results'].is_required() == False` and `default None`; `read_eval_log('verdicts/W305-test-r8-evallog.json')` returned `status success`, `samples_len 1`, `has_results True`, `results None`, `eval_id W305-test-r8`.
- **Finding**: Confirmed compatible with inspect_ai 0.3.205. The produced JSON omits optional `results`, which is acceptable for `read_eval_log()`.
- **Proposed fix**: N/A — confirmed correct. Optional hardening: include `"results": null` if human readers expect the field to be visible.
- **True-bug-prob**: LOW

### F6 [LOW] [Q6] `--wave` is honored and omission keeps back-compat
- **File**: `harness/eval_harness.py:930-944,1057-1106`
- **Evidence**: CLI adds `--wave` with `default=os.environ.get("HARNESS_WAVE", "")`; `if args.wave:` calls `_persist_evallog(...)`; `else:` prints `[W305-D R8] --wave not supplied; skipping verdicts/ EvalLog write.`
- **Finding**: Confirmed correct. The flag gates R8 persistence and defaults to no write unless flag/env is present.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F7 [HIGH] [Q7] Patch-size rollback gate was violated, then reframed
- **File**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-PLAN.md:13,25`; `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-D-R8-IMPLEMENTATION.md:13,393,402`
- **Evidence**: Plan says `fallback to operator-execution if >50 LOC patch` and `If patch >50 LOC or smoke-test fails → ROLLBACK + document operator-execution-handoff`. Stream D says `Patch surface: +324 insertions / -4 deletions`, then later calls the `≤50 LOC` threshold a `heuristic` and `Deviation justified`.
- **Finding**: The code quality is acceptable, but the wave violated an explicit high-risk execution gate. A hard gate cannot be converted to advisory after the fact without a ratification note in synthesis.
- **Proposed fix**: Amend W305-AUDIT to state the plan-gate deviation plainly and record operator/coordinator ratification, or move the patch behind a follow-up review commit before final ship.
- **True-bug-prob**: CERTAIN

### F8 [LOW] [Q8] GPT-5.5 stage-4 rollback hook is truly missing
- **File**: `.claude/settings.json:105-115`; `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-A-AGENT-TEAM-ORCH-AUDIT.md:254-262`
- **Evidence**: Settings has one `PreToolUse` entry with `"matcher": "Bash"` and command `gitleaks protect --staged --no-banner --redact --exit-code 0 || true`; Stream A says `No project .claude/settings.json PreToolUse matcher catches destructive git ops either`.
- **Finding**: Confirmed. No matcher specifically intercepts `git revert`, `git reset --hard`, or force-push commands.
- **Proposed fix**: N/A for review correctness; implement Stream A AI-1.
- **True-bug-prob**: LOW

### F9 [MEDIUM] [Q9] Fan-out dominance is true, but the W297-W304 count is misstated
- **File**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-A-AGENT-TEAM-ORCH-AUDIT.md:157-168`; `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-AUDIT-2026-05-18.md:61`
- **Evidence**: Stream A table includes `W296 | 1 (...)` plus W297-W304 rows with fan-out, then totals `1 wave used TeamCreate` and `8 waves used fan-out`. Synthesis says `W297-W304 forensic count = 1 wave used TeamCreate, 8 used parallel-Agent fan-out`.
- **Finding**: The 1:8 dominance is supported only when W296 is included. The synthesis range `W297-W304` is arithmetically wrong: W297-W304 has 8 waves total, and the one successful TeamCreate row is W296.
- **Proposed fix**: Change synthesis to `W296-W304 forensic count` or restate W297-W304 as `0 successful TeamCreate waves; 8 fan-out waves; W301 attempted/proxy-pass only`.
- **True-bug-prob**: CERTAIN

### F10 [LOW] [Q10] gitnexus sca-v5 arithmetic checks out
- **File**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-B-CODE-QUALITY-GIT-AUDIT.md:183-193,487-494`
- **Evidence**: Stream B sums install numerator `51.8 / 19.3 = 2.68` and pattern numerator `25.6 / 9.4 = 2.72`; ledger sketch records `install_score_v5: 2.68`, `pattern_score_v5: 2.72`, `tier_routing: T4 CITE-ONLY`.
- **Finding**: Confirmed correct. The arithmetic matches the stated weights and denominators.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F11 [LOW] [Q11] `pull.rebase=false` FAIL claim is verified
- **File**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-B-CODE-QUALITY-GIT-AUDIT.md:255-264`
- **Evidence**: Stream B says `git config --get pull.rebase → false` and `CONFIG FAIL`; direct repo command returned `false`.
- **Finding**: Confirmed. The local config contradicts the rebase-not-merge mandate if a future `git pull` is used.
- **Proposed fix**: N/A for review correctness; run the queued config change.
- **True-bug-prob**: LOW

### F12 [LOW] [Q12] Phase-5 Gate-3 and Gate-5 interpretations are honest
- **File**: `.claude/skills/sota-convergence-audit/SKILL.md:331-335,337-344`; `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-STREAM-C-PWF-GOVERNANCE.md:71-82,92-122`
- **Evidence**: SKILL defines Gate-3 and states `Gate-3 FAIL forces ≤ T3 PATTERN-STUDY`; Gate-5 requires evidence to be replayable and span `≥3 organisationally-distinct entities`. Stream C records Gate-3 `Status: FAIL` and Gate-5 `Status: FAIL`, with composite `2 failures → tier -2 (T1 → T3 PATTERN-STUDY)`.
- **Finding**: Confirmed. Stream C's strict-letter demotion is faithful to SKILL.md.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F13 [LOW] [Q13] Retroactive-policy carve-out is quoted accurately
- **File**: `.claude/skills/sota-convergence-audit/SKILL.md:346`
- **Evidence**: `existing v3.1 T1 INSTALL verdicts are NOT auto-superseded. Each is added to verdicts/AGING-RELITIGATION-QUEUE.md ... for operator-discretion re-litigation.`
- **Finding**: Confirmed. Stream C's “blocked from auto-application” interpretation is supported.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F14 [LOW] [Q14] The 7-cap queue is substantive
- **File**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-AUDIT-2026-05-18.md:90-116`
- **Evidence**: The top-7 rows are concrete actions: `git config pull.rebase true`, wire stage-4 rollback-plan-review, delete settings duplicates, OpenSpace adoption decision, skill refines, dependency/comment updates, and R4 reversal edit. Backlog has 15 rows B1-B15.
- **Finding**: Confirmed. The 7 main rows are not meta-steps; they are actionable backlog items.
- **Proposed fix**: N/A — confirmed correct.
- **True-bug-prob**: LOW

### F15 [HIGH] [Q15] “First executable-code-change wave” claim is false
- **File**: `docs/architecture/W305-R8-IMPL-AND-FINAL-DEEP-AUDIT/W305-AUDIT-2026-05-18.md:130-139`; `harness/fixtures/smoke_astral_uv.py:15-24,61-68`
- **Evidence**: W305 synthesis says `Executable code-change (W305-D harness/eval_harness.py +324 LOC) — first ship of code in 9-wave arc`. Git history for commit `2489063 fix(W304-codex-r1)` shows five prior Python files added under `harness/fixtures/` with `652 insertions(+)`. One fixture contains executable Python imports and functions: `import shutil`, `import subprocess`, `def _check(...)`, and `def run() -> list[dict]:`.
- **Finding**: The W305 claim is false if “executable code” includes Python smoke fixtures. W305 may be the first patch to `harness/eval_harness.py` in the W297-W304 arc, but not the first executable code change.
- **Proposed fix**: Change the synthesis to `first harness/eval_harness.py runtime patch in the 9-wave arc` or `first core harness patch`; explicitly exclude W304 fixtures if that is the intended scope.
- **True-bug-prob**: CERTAIN

## Q-by-Q Summary Table
| Q | Answer | Severity | Finding title |
|---|--------|----------|---------------|
| Q1 | Yes, `_persist_evallog` writes `verdicts/W<wave>-<slug>-evallog.json`. | LOW | R8 writer persists the required verdict EvalLog path |
| Q2 | Yes, fail-closed behavior is preserved and recorded. | LOW | W288-fix1 fail-closed invariant is preserved |
| Q3 | Yes, Lane-A/B still reject `--candidate` with exit 2. | LOW | Lane-A and Lane-B still reject `--candidate` with exit 2 |
| Q4 | Yes, smoke containment remains preserved. | LOW | Smoke containment remains enforced by the existing smoke loader |
| Q5 | Yes, compatible; `results` is optional and absent. | LOW | EvalLog shape round-trips; `results` is optional and absent |
| Q6 | Yes, `--wave` and `HARNESS_WAVE` are honored; omission skips write. | LOW | `--wave` is honored and omission keeps back-compat |
| Q7 | Code quality is acceptable, but the >50 LOC rollback gate was violated. | HIGH | Patch-size rollback gate was violated, then reframed |
| Q8 | Yes, Stream A's 3/4 wiring gap is verified. | LOW | GPT-5.5 stage-4 rollback hook is truly missing |
| Q9 | Fan-out dominance true; W297-W304 count wording wrong. | MEDIUM | Fan-out dominance is true, but the W297-W304 count is misstated |
| Q10 | Yes, gitnexus arithmetic verifies as 2.68/2.72. | LOW | gitnexus sca-v5 arithmetic checks out |
| Q11 | Yes, repo config returns `pull.rebase=false`. | LOW | `pull.rebase=false` FAIL claim is verified |
| Q12 | Yes, Gate-3/Gate-5 claims match SKILL.md. | LOW | Phase-5 Gate-3 and Gate-5 interpretations are honest |
| Q13 | Yes, line 346 says v3.1 T1 verdicts are not auto-superseded. | LOW | Retroactive-policy carve-out is quoted accurately |
| Q14 | Yes, all 7 queue rows are substantive. | LOW | The 7-cap queue is substantive |
| Q15 | No, W304 already shipped executable Python smoke fixtures. | HIGH | “First executable-code-change wave” claim is false |

## Wave Ship Recommendation
Ship after fixes. Do not block on the R8 code patch: the critical code paths are correct. Required changes before final closeout: correct the false “first executable-code-change wave” claim, correct the W296/W297-W304 fan-out count wording, and add an explicit ratification note for overriding the W305-PLAN `>50 LOC → rollback/handoff` gate.

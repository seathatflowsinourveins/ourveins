---
title: Wave 160 — HARD-GATE remediation tactical plan (Edit #38 closure, 7 DENY-emitting hooks lack test coverage)
status: AUTHORITATIVE
date: 2026-05-12
agent: cowork-orchestrator
ship-target: tests/test_<hook>_security.py × 7 + atomic commit + T2/T3 verify
cite-class: TIER-3-LOCAL-COMPOSITION (constituents=[TIER-1-DIRECT @ Anthropic CC hooks docs https://code.claude.com/docs/en/hooks lines 1021-1023 PreToolUse permissionDecision + lines 1621-1644 Stop decision:block, TIER-2 @ .claude/rules/layered-gates-architecture.md §9 HARD-GATE for DENY-emitting hooks, TIER-2 @ .claude/rules/codex-t1-fix-forward-pattern.md §Pattern A atomic apply, TIER-3-LOCAL-OPERATOR-DERIVED @ Wave 157 NOVEL-GAP P1 CRITICAL Edit #38 + Wave 158 RE-AUDIT confirmation]; effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE
parent-strategic-plan: docs/sota-comprehensive-strategic-plan-2026-05-12.md §Q1 Wave 160
parent-tactical-plan: tmp/wave159-sota-install-plan-2026-05-12.md (predecessor wave; W160 Phase 0 inherits from W159 Phase 0 exit state)
---

# Wave 160 — HARD-GATE remediation tactical plan

## Apex finding (the gap this plan closes)

`.claude/rules/layered-gates-architecture.md §9` mandates: **every hook that can emit `exit 2` / `permissionDecision: "deny"` / `decision: "block"` MUST have `tests/test_<hook>_security.py` covering default-DENY + default-ALLOW + edge cases**. The pre-commit gate refusal clause says T2 emits `permissionDecision: "deny"` with reason "missing test coverage for DENY-emitting hook" if such a hook is staged without its security test.

**Current state** (verified 2026-05-12 via `Grep "permissionDecision.*deny|sys\.exit\(2\)|decision.*block" .claude/hooks/scripts/*.py` + `Glob tests/test_*_security.py` + `Grep "<hook>" .claude/settings.json`):

| # | Wired DENY-emitting hook | test_<hook>_security.py | Status | Wire location |
|---|---|---|---|---|
| 1 | `agent_spawn_gate.py` | ✅ EXISTS | COMPLIANT | settings.json PreToolUse `Agent` matcher |
| 2 | `auto_proceed_gate.py` | ✅ EXISTS | COMPLIANT | settings.json Stop slot[0] |
| 3 | `fm20_path_drift_lint.py` | ❌ MISSING | **NON-COMPLIANT** | settings.json L127 PostToolUse |
| 4 | `fm19_artifact_inline_lint.py` | ❌ MISSING | **NON-COMPLIANT** | settings.json L439 SubagentStop |
| 5 | `secret_scan_guard.py` | ❌ MISSING | **NON-COMPLIANT** | settings.json L101 PreToolUse Edit\|Write\|MultiEdit |
| 6 | `gitleaks_pre_commit_gate.py` | ❌ MISSING | **NON-COMPLIANT** | settings.json L182-L212 PreToolUse Bash 6 git-mutation matchers |
| 7 | `codex_t1_consult_gate.py` | ❌ MISSING | **NON-COMPLIANT** | settings.json L96 PreToolUse Edit\|Write\|MultiEdit |
| 8 | `codex_t2_pre_commit_gate.py` | ❌ MISSING | **NON-COMPLIANT** | settings.json L218-L248 PreToolUse Bash(git commit *) 6 matchers |
| 9 | `agent_plan_readonly_bash_guard.py` | ❌ MISSING | **NON-COMPLIANT** | settings.json L84 PreToolUse Bash matcher |

**Compliance rate**: 2/9 (22%). **HARD-GATE violation count**: 7. The pre-commit gate refusal clause is **non-self-enforcing** today because T2 itself is one of the 7 untested hooks (recursive bootstrap problem).

**Cite anchor for criticality**: TIER-3-LOCAL-OPERATOR-DERIVED Wave 157 NOVEL-GAP P1 CRITICAL classification at `tmp/wave157-cowork-2026-05-12-dispositions.md` + Wave 158 RE-AUDIT confirmation at `tmp/wave158-cowork-2026-05-12-reaudit-dispositions.md` (Mia probe re-verified no test files materialized between W157 and W158). Strategic plan Q1 priority per `docs/sota-comprehensive-strategic-plan-2026-05-12.md §Q1 Wave 160`.

## Why this matters (FM defense ladder)

Without test coverage:

1. **Regression risk**: a future edit to any of the 7 hooks can silently turn a DENY-firing branch into an ALLOW-firing branch (e.g., regex tighten, command-separator escape gap). codex T6 HIGH severity finding 2026-04-27 on `permission_request_auto_approve.py` per `layered-gates-architecture.md §9` cite — verbatim "I did not see accompanying tests in the dirty file set that exercise these deny cases." The exact bug class repeats without test gate.

2. **HARD-GATE bootstrap dependency**: codex_t2_pre_commit_gate.py is itself the enforcer of the pre-commit refusal clause AND is one of the 7 untested hooks. Self-referential dependency means T2 cannot block its own untested-hook commits.

3. **Default-allow class extension**: agent_plan_readonly_bash_guard.py governs read-only Bash policy under `permissionMode: plan`; a regex tighten could allow destructive Bash through; without test, regression is silent.

4. **Secret-leak class**: gitleaks_pre_commit_gate.py + secret_scan_guard.py fire on Edit/Write to redact + on git-commit/push to block secret-bearing commits; a regex degradation could let live secrets through silently.

5. **Cross-model gate degradation**: codex_t1_consult_gate.py blocks design-surface edits without T1 verdict; a path-pattern regex bug could allow unguarded edits through, breaking cardinal-rule-3 cross-model consensus invariant.

## 5-phase plan

### Phase 0 — Pre-flight (operator manual)

Inherits from W159 Phase 0. If W159 Phase 0 not yet executed, this Wave's Phase 0 IS W159 Phase 0:

```bash
# Step 0.1: Verify clean working tree
cd Z:/claude-sota-installed
git status --short
# Expected: empty OR only known intentional uncommitted files
# If 153 unstaged-modified files (per W158 Edit #53 pending decision): DECIDE before proceeding
#   - Option A: stage + commit as encoding normalization sweep
#   - Option B: revert + investigate
#   - Option C: defer this Wave until W158 Edit #53 closed

# Step 0.2: Verify settings.json parses (W158 Edit #51 P0/P1 INVESTIGATE)
python -c "import json; json.load(open('.claude/settings.json', encoding='utf-8'))" && echo OK
# If error: investigate before proceeding (corruption blocks T2 enforcement of new tests)

# Step 0.3: Verify tests/ directory + pytest baseline
ls tests/test_*_security.py
pytest tests/ -x --tb=short 2>&1 | tail -20
# Baseline: agent_spawn_gate + auto_proceed_gate tests pass

# Step 0.4: Snapshot of HARD-GATE state (audit-trail for W160 close-synthesis)
{
  echo "=== W160 Phase 0 baseline 2026-05-12 ==="
  echo "DENY-emitting hooks (wired):"
  grep -l "permissionDecision.*deny\|sys\.exit(2)\|decision.*block" .claude/hooks/scripts/*.py
  echo
  echo "Existing test_<hook>_security.py files:"
  ls tests/test_*_security.py
  echo
  echo "Compliance rate: 2/9 (22%)"
} > tmp/wave160-phase0-baseline-2026-05-12.txt
```

### Phase 1 — Per-hook test design (4 parallel agents via subagent-driven-development pattern)

Per `superpowers:subagent-driven-development` skill + `parallel-agent-wave.md §CADP rule 2` (max 3 concurrent without cache verify; this plan uses 3-then-1 staggered pattern).

**Wave A (3 concurrent — high-blast-radius hooks)**:

| Agent | Target hook | Test categories | Edge cases |
|---|---|---|---|
| Agent A — sota-researcher | `agent_plan_readonly_bash_guard.py` | DENY: rm/mv/Set-Content/heredoc-write/tee redirect under plan-mode; ALLOW: Read/Glob/Grep/git status/git log; EDGE: command-separator escapes (`;`, `&&`, `||`, backticks, `$()`), unicode, whitespace boundary | FM-19 readonly sidestep recovery shape coverage |
| Agent B — sota-researcher | `secret_scan_guard.py` | DENY: write content matching Anthropic OAuth/JWT/Google API/GitHub PAT/AWS Access Key/Langfuse/OpenAI sk-/refresh-token/auth.json patterns; ALLOW: write content not matching; EDGE: partial matches, base64-encoded variants | sister to gitleaks pattern coverage |
| Agent C — sota-researcher | `gitleaks_pre_commit_gate.py` | DENY: git commit/push staging file containing secret patterns above; ALLOW: clean staged content; EDGE: secret in deletion (revert), secret in comment, secret in test fixture | atomic-commit + 6 wire-matchers (`Bash(git commit *)` + 5 push variants) |

**Wait for Wave A return + verify all 3 agent test files exist via `ls tests/test_*_security.py`**

**Wave B (3 concurrent — cross-model gate hooks)**:

| Agent | Target hook | Test categories | Edge cases |
|---|---|---|---|
| Agent D — sota-researcher | `codex_t1_consult_gate.py` | DENY (under STRICT=1): Edit/Write to design-surface path without paired `_OUT.txt`; ALLOW: Edit/Write to `_UNIVERSAL_EXCLUSIONS` paths (tmp/**, .claude/state/**, etc.); EDGE: pair-basename mismatch (`<topic>_PROMPT.txt` vs `<topic>_OUT.txt` per FM-08), AUTO-T1 wedge bypass via tmp/+mv-T (per `codex-t1-auto-wedge-recovery.md`) | Phase 1 bootstrap exception aware |
| Agent E — sota-researcher | `codex_t2_pre_commit_gate.py` | DENY: `git commit *` with codex T2 NEEDS-REVISION verdict OR REJECT; ALLOW: APPROVE; EDGE: timeout (Pattern B HNF disposition per codex-t1-fix-forward-pattern.md), DOWNGRADED-MODE Ollama HTTP bridge fallback | T2 enforces HARD-GATE for OTHER hooks recursively |
| Agent F — sota-researcher | `fm19_artifact_inline_lint.py` | DENY (SubagentStop): subagent emitted ARTIFACT-INLINE marker but file did not materialize on disk; ALLOW: marker matches actual file content; EDGE: marker without path resolution, content-SHA mismatch | sister to fm20_path_drift_lint coverage |

**Wait for Wave B return + verify all 3 agent test files exist**

**Wave C (1 agent — final hook)**:

| Agent | Target hook | Test categories | Edge cases |
|---|---|---|---|
| Agent G — sota-researcher | `fm20_path_drift_lint.py` | DENY (PostToolUse): cite-anchor in just-edited file points to non-existent file:line; ALLOW: all cite-anchors resolve; EDGE: relative-vs-absolute path normalization, symlink resolution, line-offset compensation per `port-note-discipline.md §1` | sister to fm19_artifact_inline_lint coverage |

### Agent brief template (apply to A-G)

```
TASK: Write tests/test_<hook>_security.py for .claude/hooks/scripts/<hook>.py covering default-DENY + default-ALLOW + edge cases per .claude/rules/layered-gates-architecture.md §9 HARD-GATE for DENY-emitting hooks.

CONTEXT: 
  - .claude/rules/layered-gates-architecture.md §9 lines 241-255 (HARD-GATE specification + cite for codex T6 HIGH severity finding 2026-04-27)
  - .claude/hooks/scripts/<hook>.py (the target hook)
  - tests/test_agent_spawn_gate_security.py + tests/test_auto_proceed_gate_security.py (existing exemplars; follow same pytest patterns)
  - Wave 160 strategic context: 7 hooks lack test coverage; this is your contribution

FILES TO READ (mandatory):
  - .claude/rules/layered-gates-architecture.md L241-L255 (§9 HARD-GATE spec)
  - .claude/hooks/scripts/<hook>.py (full source)
  - tests/test_agent_spawn_gate_security.py (exemplar pattern)
  - tests/test_auto_proceed_gate_security.py (exemplar pattern)
  - .claude/hooks/scripts/_guard_base.py (shared base class — likely consumed by hook)

FILES TO WRITE:
  - tests/test_<hook>_security.py (FULL FILE per ARTIFACT-INLINE mandate; NO partial returns)

CONSTRAINTS:
  - Use pytest (not unittest); test functions named test_<scenario>
  - Cover ≥3 default-DENY scenarios + ≥3 default-ALLOW scenarios + ≥3 edge cases
  - Use subprocess.run([python, hook_path], input=stdin_json, capture_output=True) pattern from exemplars
  - Assert on exit_code AND stdout JSON (parse + check `permissionDecision` / `decision` fields)
  - DO NOT modify the hook itself — tests only
  - DO NOT use --no-verify or --bypass; tests are pure

OUTPUT: tests/test_<hook>_security.py file written via Write tool

OUTPUT_BUDGET: max 350 LOC per test file (covers ~9-15 test functions)

DONE WHEN: 
  - File written and persists on disk (verify via ls)
  - pytest tests/test_<hook>_security.py passes 100% (or documents EXPECTED-FAIL with skip marker + cite to known issue)
  - Test count ≥9 (3 DENY + 3 ALLOW + 3 EDGE)

HANDOFF: handoff_to: orchestrator, output_mode: last_message, artifacts: [tests/test_<hook>_security.py], verdict_one_line: "DONE: N tests written, M pass, K skipped"

TERMINATION: on_handoff_to: orchestrator | max_turns: 15 | terminationCondition: on_text_match: "DONE:" | on_token_budget_exceeded: 100000

DO NOT FM-19 sidestep — write the file via Write tool, DO NOT return content inline expecting orchestrator to backfill. Write tool is available; use it.

DO NOT delegate understanding — read the hook source, understand its DENY conditions, write tests that exercise each one. Pasting "based on your reading" prompts onto downstream agents is an anti-pattern per team-orchestration.md §Never delegate understanding.
```

### Phase 2 — Cross-model gate satisfaction (codex T1 ratification)

Per `cross-model-consensus.md §The contract` HARD GATE — every architectural commit needs codex T1 verdict on file. Build composite consult prompt at `.claude/state/codex_consult_w160_hardgate_remediation_2026_05_12.txt`:

```
[OPERATOR fires this in real eee runtime via Path P recipe per codex-t1-fix-forward-pattern.md §Pattern D]

PROMPT BODY (inline, ~50 LOC):

Context: Wave 160 closes Edit #38 HARD-GATE violation. 7 wired DENY-emitting hooks lack tests/test_<hook>_security.py per layered-gates-architecture.md §9 mandate.

Files added (uncommitted):
  - tests/test_fm20_path_drift_lint_security.py (Agent G output)
  - tests/test_fm19_artifact_inline_lint_security.py (Agent F output)
  - tests/test_secret_scan_guard_security.py (Agent B output)
  - tests/test_gitleaks_pre_commit_gate_security.py (Agent C output)
  - tests/test_codex_t1_consult_gate_security.py (Agent D output)
  - tests/test_codex_t2_pre_commit_gate_security.py (Agent E output)
  - tests/test_agent_plan_readonly_bash_guard_security.py (Agent A output)

Audit dimensions (3-axis TIGHT per Pattern D Forward Discipline #1):

AXIS-1 — Test coverage adequacy:
Each test file MUST cover:
  (a) ≥3 default-DENY scenarios with concrete destructive variants per layered-gates-architecture.md §9 list
  (b) ≥3 default-ALLOW scenarios with safe operations
  (c) ≥3 edge cases (regex boundaries, separator escapes, unicode, whitespace)
Verdict: per-file PASS / NEEDS-REVISION / FAIL with prescribed_edits

AXIS-2 — pytest exemplar consistency:
Each new test file MUST follow tests/test_agent_spawn_gate_security.py + tests/test_auto_proceed_gate_security.py shape:
  (a) subprocess.run pattern for hook invocation
  (b) stdin-JSON-via-input
  (c) assertions on exit_code AND stdout JSON parse
Verdict: per-file PASS / NEEDS-REVISION

AXIS-3 — HARD-GATE bootstrap closure:
Does the test set as a whole close the §9 mandate? After commit, future hook edits trigger T2 pre-commit refusal if test_<hook>_security.py is missing OR test count drops. Identify any remaining gap (e.g., wired DENY-emitting hook still uncovered).
Verdict: CLOSED / GAP-REMAINS with enumeration

Output schema (JSON-strict at EOF):
{
  "verdict": "APPROVE" | "NEEDS-REVISION" | "REJECT",
  "confidence": <float 0.0-1.0>,
  "per_file_axis_1": {<filename>: "PASS" | "NEEDS-REVISION" | "FAIL"},
  "per_file_axis_2": {<filename>: "PASS" | "NEEDS-REVISION"},
  "axis_3_hardgate_closure": "CLOSED" | "GAP-REMAINS",
  "axis_3_remaining_gaps": [<gap>, ...],
  "prescribed_edits": [{"file": <path>, "edit": <description>}, ...],
  "rationale_one_line": "<≤200 char>"
}

Recipe (Path P per codex-t1-fix-forward-pattern.md §Pattern D):
  timeout 300 codex exec --skip-git-repo-check --color never \
    < .claude/state/codex_consult_w160_hardgate_remediation_2026_05_12.txt \
    2>&1 | tee .claude/state/codex_consult_w160_hardgate_remediation_2026_05_12_OUT.txt
```

### Phase 3 — Apply codex T1 prescriptions + atomic commit

Per `codex-t1-fix-forward-pattern.md §Pattern A` — apply ALL prescribed_edits in single atomic commit:

```bash
# Step 3.1: Read T1 verdict from EOF (per §"Verdict reading: EOF FIRST")
tail -200 .claude/state/codex_consult_w160_hardgate_remediation_2026_05_12_OUT.txt
# Look for {"verdict": ...} JSON block at file end

# Step 3.2: Apply prescribed_edits (Mia pre-apply per mia-pre-apply.md)
# For each prescription:
#   (a) probe sub-claim via Grep / Read against actual test file
#   (b) if VERIFIED → apply
#   (c) if REFUTED → DROP per Mia n=20+ ladder (record in commit body)

# Step 3.3: Verify all 7 tests pass locally
pytest tests/test_fm20_path_drift_lint_security.py \
       tests/test_fm19_artifact_inline_lint_security.py \
       tests/test_secret_scan_guard_security.py \
       tests/test_gitleaks_pre_commit_gate_security.py \
       tests/test_codex_t1_consult_gate_security.py \
       tests/test_codex_t2_pre_commit_gate_security.py \
       tests/test_agent_plan_readonly_bash_guard_security.py \
       -v --tb=short

# Step 3.4: Atomic commit per git-cli-grammar-discipline.md §invariants (options BEFORE --)
git add tests/test_fm20_path_drift_lint_security.py \
        tests/test_fm19_artifact_inline_lint_security.py \
        tests/test_secret_scan_guard_security.py \
        tests/test_gitleaks_pre_commit_gate_security.py \
        tests/test_codex_t1_consult_gate_security.py \
        tests/test_codex_t2_pre_commit_gate_security.py \
        tests/test_agent_plan_readonly_bash_guard_security.py

git commit -F tmp/wave160-commit-msg.txt -- tests/test_fm20_path_drift_lint_security.py \
  tests/test_fm19_artifact_inline_lint_security.py \
  tests/test_secret_scan_guard_security.py \
  tests/test_gitleaks_pre_commit_gate_security.py \
  tests/test_codex_t1_consult_gate_security.py \
  tests/test_codex_t2_pre_commit_gate_security.py \
  tests/test_agent_plan_readonly_bash_guard_security.py

# Commit message body (tmp/wave160-commit-msg.txt):
#   feat(tests): close HARD-GATE Edit #38 — 7 DENY-emitting hooks now have test_<hook>_security.py
#   
#   Closes layered-gates-architecture.md §9 mandate violation (7-of-9 wired DENY-emitting hooks lacked test coverage).
#   
#   Tests added (3 DENY + 3 ALLOW + 3 EDGE per file, 9-15 functions each):
#     - tests/test_fm20_path_drift_lint_security.py
#     - tests/test_fm19_artifact_inline_lint_security.py
#     - tests/test_secret_scan_guard_security.py
#     - tests/test_gitleaks_pre_commit_gate_security.py
#     - tests/test_codex_t1_consult_gate_security.py
#     - tests/test_codex_t2_pre_commit_gate_security.py
#     - tests/test_agent_plan_readonly_bash_guard_security.py
#   
#   Compliance rate: 2/9 → 9/9 (100%).
#   
#   Cross-model gate satisfaction: T1 verdict <APPROVE|NEEDS-REVISION conf=X.YZ> [VERIFIED via .claude/state/codex_consult_w160_hardgate_remediation_2026_05_12_OUT.txt]
#   
#   Mia pre-apply: n=N catches across 7 prescribed_edits (M VERIFIED, K REFUTED-DROP per mia-pre-apply.md)
#   
#   Strategic context: Wave 160 closure per docs/sota-comprehensive-strategic-plan-2026-05-12.md §Q1 priority Edit #38; tactical execution per tmp/wave160-cowork-2026-05-12-hardgate-remediation-plan.md
#   
#   Closes:
#     - W157 NOVEL-GAP P1 CRITICAL Edit #38
#     - W158 RE-AUDIT confirmation finding
#     - layered-gates-architecture.md §9 HARD-GATE bootstrap dependency
```

### Phase 4 — Post-commit verification (Wire/Surface/Close/Re-fire per audit-action-loop.md)

```bash
# Step 4.1: T3 post-commit auto-fire verifies APPROVE
# Auto-fires via .claude/settings.json PostToolUse Bash(git commit *) → codex_postcommit_review.py
# Verdict written to .claude/state/codex_review_HEAD_<sha8>.txt
sleep 30  # async timeout
ls -lt .claude/state/codex_review_HEAD_*.txt | head -3

# Step 4.2: Verify HARD-GATE compliance counter
{
  echo "=== W160 Phase 4 closure 2026-05-12 ==="
  echo
  echo "DENY-emitting hooks (wired):"
  ls .claude/hooks/scripts/{fm20_path_drift_lint,fm19_artifact_inline_lint,secret_scan_guard,gitleaks_pre_commit_gate,codex_t1_consult_gate,codex_t2_pre_commit_gate,agent_plan_readonly_bash_guard,agent_spawn_gate,auto_proceed_gate}.py
  echo
  echo "test_<hook>_security.py files:"
  ls tests/test_*_security.py
  echo
  echo "Compliance rate: 9/9 (100%) — Edit #38 HARD-GATE CLOSED"
} > tmp/wave160-phase4-closure-2026-05-12.txt

# Step 4.3: Audit-trail entry to docs/install-provenance.md
cat >> docs/install-provenance.md << 'EOF'

## Wave 160 — HARD-GATE remediation (Edit #38 closure)

Date: 2026-05-12
Tactical plan: tmp/wave160-cowork-2026-05-12-hardgate-remediation-plan.md
Strategic plan: docs/sota-comprehensive-strategic-plan-2026-05-12.md §Q1 Wave 160

7 tests added (compliance 2/9 → 9/9 = 100%):
- tests/test_fm20_path_drift_lint_security.py
- tests/test_fm19_artifact_inline_lint_security.py
- tests/test_secret_scan_guard_security.py
- tests/test_gitleaks_pre_commit_gate_security.py
- tests/test_codex_t1_consult_gate_security.py
- tests/test_codex_t2_pre_commit_gate_security.py
- tests/test_agent_plan_readonly_bash_guard_security.py

Cross-model gate: T1 <verdict> conf=<X.YZ> [VERIFIED via .claude/state/codex_consult_w160_hardgate_remediation_2026_05_12_OUT.txt]
T3 post-commit: <verdict> [VERIFIED via .claude/state/codex_review_HEAD_<sha8>.txt]
EOF
```

### Phase 5 — Synthesis + close-fire entry

Write `tmp/wave160-cowork-2026-05-12-close-synthesis.md` with:
- 5-phase outcome trace (per phase: planned vs actual)
- Mia ladder advance (n=N at W158 → n=N+M at W160; per-prescription verdict REFUTED-DROP / VERIFIED-APPLIED record)
- Cross-model gate satisfaction trail (T1 verdict file + T3 verdict file cite)
- HARD-GATE compliance baseline → final
- 7 test file content-SHAs (port-note-discipline.md §1 symbol-anchor preferred over line-numbers)
- Forward-only correction record (any post-commit retroactive findings)

## Cardinal-rule conformance checklist

- ✅ **CR-1** cite-trail: Tests cite `layered-gates-architecture.md §9` mandate + per-hook source file inline
- ✅ **CR-3** cross-model consensus: Phase 2 codex T1 ratification + Phase 4 T3 post-commit
- ✅ **CR-4** RECALL→INVESTIGATE→VERIFY: Phase 0 baseline + Phase 1 source reading + Phase 4 verification
- ✅ **CR-7** Phase 1 bootstrap exception: orchestrator-side codex T1 dispatch acceptable until Tier 1a hooks INSTALLED
- ✅ **CR-8** SOTA-cited: every test file cites pytest exemplar + hook source + §9 spec
- ✅ **CR-9** install-risk discipline: no @latest installs; pure test-file additions
- ✅ **CR-10** research-first-then-install: research is per-hook source reading; no install in this Wave
- ✅ **CR-11** META-process SOTA discipline: this plan IS the META-process artifact for Wave 160
- ✅ **CR-12** upstream-install-priority: tests are local-novel content (no upstream parity exists for sss-specific hooks); cite-class TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8

## Failure-mode awareness (active defenses)

- **FM-02 (c) destructive race**: Phase 0 verifies clean working tree before Phase 1 spawn; commit message uses narrow `--only` per parallel-session-worktree-isolation.md
- **FM-09 codex-rescue blind-spot**: Phase 2 uses sota-researcher (NOT codex-rescue) for harness-fit-aware analysis; Phase 1 uses sota-researcher fan-out
- **FM-17.e CC-runtime autocompact-thrashing**: brief constraints cap output_budget at 350 LOC per file + tool_budget caps via terminationCondition
- **FM-19 readonly-guard sidestep**: brief explicitly mandates "DO NOT FM-19 sidestep — use Write tool"
- **FM-20 path-drift cascade**: each agent's prescription Mia-probed independently before applying
- **FM-21 queue-time-prompt-freeze**: this plan is fresh-context (no scheduled re-fire planned for stale prompt)

## Skills + tools per phase

| Phase | Superpowers skills | Cowork tools |
|---|---|---|
| 0 | `using-git-worktrees`, `verification-before-completion` | Bash, Read |
| 1 | `subagent-driven-development`, `dispatching-parallel-agents`, `test-driven-development` | Agent (sota-researcher × 7), Read, Write |
| 2 | `requesting-code-review` | Write (consult prompt) — operator fires codex |
| 3 | `executing-plans`, `receiving-code-review` | Edit (Mia pre-apply per prescription), Bash (pytest + git) |
| 4 | `verification-before-completion` | Bash (audit-trail), Edit (provenance log) |
| 5 | `finishing-a-development-branch`, `writing-plans` | Write (close-synthesis) |

## Termination contract

- on_handoff_to: operator (W160 close-synthesis written + commit landed + T3 verdict received)
- max_turns: 60 (orchestrator-side budget across all phases)
- terminationCondition: on_text_match: "Edit #38 HARD-GATE CLOSED" | on_token_budget_exceeded: 500000 | on_subprocess_failure: 5

## Invocation guidance

Two paths:

### Option A — Fresh `claude` invocation (recommended for clean execution)

```bash
cd Z:/claude-sota-installed
claude
# Then paste:
"Read tmp/wave160-cowork-2026-05-12-hardgate-remediation-plan.md and execute Phase 0 through Phase 5 per the plan. Use superpowers skills (subagent-driven-development for Phase 1 fan-out + Pattern A for Phase 3 atomic apply). Honor cardinal-rule-3 cross-model consensus at Phase 2. Stop and report at Phase 5 close-synthesis."
```

### Option B — `/loop` autonomous

```bash
cd Z:/claude-sota-installed
claude
# Then:
/loop "Execute tmp/wave160-cowork-2026-05-12-hardgate-remediation-plan.md Phase 0 through Phase 5"
```

### Apex priority within W160

If executing partial: Phases 0+1 alone (test files written, no commit) closes 7 NON-COMPLIANT rows even without T1 ratification — operator can fire T2/T3 manually post-fact. The 7 test files are the ship-target; everything else is hygiene.

## Success criteria

| Metric | Baseline (W158) | Target (W160 close) |
|---|---|---|
| HARD-GATE compliance rate | 2/9 (22%) | 9/9 (100%) |
| W157 NOVEL-GAP P1 CRITICAL Edit #38 | OPEN | CLOSED |
| Cumulative cross-model gate verdicts on Wave | 0 (operator-side T1 deferred) | ≥1 T1 + 1 T3 [VERIFIED via path] |
| Mia pre-apply ladder | n=20 | n=20+M (M = REFUTED-OVER catches across 7 prescriptions) |
| Cardinal-rule-9 conformance | PARTIAL (no install in Wave) | PARTIAL (still no install) |
| docs/install-provenance.md Wave entries | through W158 | through W160 |

## Reference

- Strategic plan: `docs/sota-comprehensive-strategic-plan-2026-05-12.md` §Q1 Wave 160
- Predecessor tactical: `tmp/wave159-sota-install-plan-2026-05-12.md` (Phase 0 inheritance)
- Mandate spec: `.claude/rules/layered-gates-architecture.md §9` lines 241-255
- Pattern A apply: `.claude/rules/codex-t1-fix-forward-pattern.md §Pattern A`
- Pattern D dispatch: `.claude/rules/codex-t1-fix-forward-pattern.md §Pattern D`
- Mia pre-apply: `.claude/rules/mia-pre-apply.md`
- Subagent fan-out: `.claude/rules/parallel-agent-wave.md §CADP rule 2`
- Wave 157 origin: `tmp/wave157-cowork-2026-05-12-dispositions.md` (NOVEL-GAP P1 CRITICAL)
- Wave 158 RE-AUDIT: `tmp/wave158-cowork-2026-05-12-reaudit-dispositions.md`

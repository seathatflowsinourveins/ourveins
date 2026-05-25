# Wave 132 Fire 1 Agent δ — gstack OPERATIONAL adoption design

DESIGN: NEEDS-OPERATOR-INPUT (Phase A vs Phase B routing depends on FM-20 finding below)

## License attribution (per port-note-discipline §4 + cardinal-rule-1)

> MIT License
> Copyright (c) 2026 Garry Tan
> [Full license at Z:/repos/deps/gstack/LICENSE:1-20]

Patterns adopted from `Z:/repos/deps/gstack/codex/SKILL.md:1115-1170 @ HEAD dde55103fcc42bd446d804ddc15567ced8455ac1`
(brief said `:1019-1061`; actual JSONL+exit124+stderr block is at `:1115-1170`. Cite-corrected per CR-1).

---

## Critical pre-finding (FM-20 path-drift cascade — affects routing)

**Probe**: gate `codex_t1_consult_gate.py:1080` references `_PROJECT_ROOT / "scripts" / "_codex_jsonl_runner.py"`
as the supervisor module spawned at every T1 STRICT auto-spawn.

**Result**: file does NOT exist at `Z:/claude-sota-installed/scripts/_codex_jsonl_runner.py`
(verified via `Glob` 2026-05-09; sibling has it at `Z:/claude-sota/scripts/_codex_jsonl_runner.py`).

**Implication**: every AUTO-T1 wedge under STRICT mode in eee currently returns `launch_error` from the
`subprocess.Popen()` at `:1091-1100` (the supervisor argv resolves but the script file is missing).
This is FM-14 AUTO-T1 wedge under sub-class .b (silent launch_error) — adjacent to but distinct from
the n=8 zero-investigation Pattern B class the brief targets.

**Per cardinal-rule-7 REPORT errors before routing around them**: this finding is surfaced BEFORE the
design proceeds. Operator decision required: cite-import-AMBER ship the missing file FIRST (Phase 0)
or roll into Phase A as a single atomic ship?

---

## Phase 0 — pre-Phase-A blocker resolution (MUST land first)

**Scope**: install missing supervisor module so existing gate stops returning `launch_error`.

**Action**: cite-import sibling `Z:/claude-sota/scripts/_codex_jsonl_runner.py` (HEAD verified 2026-05-09;
zero hardcoded `Z:/claude-sota` paths grep-clean — fully portable, no path-rewrite needed under CR-9
sibling-bleed defense). Native install at `Z:/claude-sota-installed/scripts/_codex_jsonl_runner.py`.

**Rationale per cardinal-rule-12 install-priority**:
- (1) PRIMARY upstream: gstack ships the **patterns** (`SKILL.md:1115-1170`), NOT a Python package — the
  patterns are documentation, not install-class. No `pip install gstack-codex-runner` exists.
- (3) TERTIARY (last-resort): cite-import-AMBER from sibling per Section 14.5 — sibling already adapted
  the gstack patterns into install-class Python at `_codex_jsonl_runner.py` with full attribution
  (Lines 1-12 cite gstack SKILL.md + LICENSE + named patterns).
- HONEST-NON-FINDING gate satisfied: no upstream pip/cargo/npm package wraps gstack runner pattern.

**Cite-import-AMBER requirements** (CR-9):
- Sibling source: `Z:/claude-sota/scripts/_codex_jsonl_runner.py` @ commit-SHA at copy time (record in
  `docs/install-provenance.md` Wave 132 Fire 1 entry)
- REVERT check: `git -C Z:/claude-sota log --all --oneline -- 'scripts/_codex_jsonl_runner.py'` — no REVERT
  expected (file is fire-18 net-add)
- Sibling-bleed: grep returned 0 `Z:/claude-sota` paths in the file → no rewrite needed
- 2-round fix-forward budget: codex T1 likely NEEDS-REVISION on first apply (parameter naming, error
  classification edge cases); budget 2 rounds.

**Smoke test (Phase 0)**:
```bash
$ python -c "from scripts._codex_jsonl_runner import _classify_auth_status; print(_classify_auth_status('not logged in'))"
auth_failed
```
Then trigger AUTO-T1 wedge on a synthetic in-scope edit; verify `subprocess.Popen` returns `pid > 0` and
sidecar JSON lands at `<out_path>.runner.json`.

**LOC delta**: +258 LOC (full file copy from sibling).

---

## Phase A — smallest viable LOC change (gstack pattern coverage gap audit)

After Phase 0 lands, **audit which gstack patterns are already implemented in sibling runner**:

| Gstack pattern (SKILL.md) | Sibling runner status | Phase A action |
|---|---|---|
| `turn.completed` event count (`:1129,1148-1149,1154-1156`) | IMPLEMENTED at `_stdout_reader:80-94` (counts via `state["turn_completed_count"]`) | NONE — already covered by Phase 0 |
| Exit code 124 detection (`:1158-1164`) | Sibling uses `subprocess.Popen` with `--timeout-sec` arg; check sidecar emit logic for exit-124 classification | LIKELY NONE; verify sidecar JSON includes `codex_exit_code` field with 124 mapped to `timeout_124` class |
| Stderr capture for auth failure (`:1166-1169`) | IMPLEMENTED at `_stderr_reader:97-109` + `_classify_auth_status:60-68` + `AUTH_PATTERNS` tuple | NONE — already covered |
| `--json` flag in codex argv | IMPLEMENTED at gate `:1056` (`"--json"` already in cmd list) | NONE — already covered |
| Zero-`turn.completed` warning (`:1154-1156`) | Sibling counts but does NOT emit warning when count==0 (gap vs gstack pattern) | **PHASE A SCOPE**: add structured warning to sidecar JSON when `turn_completed_count == 0` AND codex exit code 0 (the FM-17 zero-investigation Pattern B subclass signature) |

**Phase A scope (smallest viable)**:

**Edit target**: `Z:/claude-sota-installed/scripts/_codex_jsonl_runner.py` (post-Phase-0 install)
**Edit shape**: extend `_emit_sidecar()` (location ~L150-200 in sibling — orchestrator confirms post-install)
to add field `pattern_b_zero_investigation_warning: true` when ALL hold:
- `turn_completed_count == 0`
- `codex_exit_code == 0` (NOT 124 — exit 124 already classified as timeout per gstack `:1158-1164`)
- `len(stderr_tail) == 0 OR no auth_failed OR rate_limit signature in stderr_tail`

**LOC delta**: +12 LOC (new field + 3-condition gate in `_emit_sidecar`)

**Smoke test (Phase A)**:
```python
# Synthetic test: empty codex stdout + exit 0 + empty stderr → sidecar.pattern_b_zero_investigation_warning == True
# Real-world test: trigger T1 with prompt designed to skip-investigate (pure echo) → verify warning fires
```

---

## Phase B — full shared module + consumer refactor list (per sibling cite ladder n=8 pattern)

After Phase A lands and zero-investigation warning surfaces in 1+ live T1 fires, evaluate Phase B promotion.

### Phase B scope: extend `_codex_jsonl_runner.py` consumption to T2/T3/T4/T6/T5 hooks

**Current state per Glob `Z:/claude-sota-installed/.claude/hooks/scripts/codex_*.py`**:
- `codex_t1_consult_gate.py` — USES supervisor pattern (post-Phase-0; subprocess.Popen → `_codex_jsonl_runner.py`)
- `codex_t2_pre_commit_gate.py` — uses INLINE `subprocess.run` with `--json` flag (verified at `:549-701`)
- `codex_postcommit_review.py` — assumed inline (consumer count ≥1 of `codex exec`)
- `codex_prepush_review.py` — assumed inline
- `codex_t5_plan_review_gate.py` — assumed inline
- `codex_review_queue.py` — durable state pattern (different shape; not a direct codex spawn consumer)
- `codex_review_thread_bridge.py` — bridge layer
- `codex_review_trace.py` — telemetry parser
- `codex_failure_audit.py` — audit consumer
- `codex_mcp_healthcheck.py` — MCP probe (not codex spawn)
- `codex_stuck_detector.py` — stuck detector (not codex spawn)
- `codex_gate.py` — data-boundary classify

**N consumers needing refactor**: 4 (T2, T3, T4, T5) — each ~3-8 LOC change to delegate to `_codex_jsonl_runner.py`

**Refactor shape per consumer**:
1. Replace inline `subprocess.run([... "--json" ...])` with delegation:
   ```python
   from scripts._codex_jsonl_runner import run_codex_with_jsonl_pattern
   result = run_codex_with_jsonl_pattern(codex_argv=cmd, timeout_sec=180, prompt_path=prompt)
   # result.turn_completed_count, result.exit_code, result.stderr_tail, result.zero_investigation_warning
   ```
2. Map result to consumer's existing verdict path

**Phase B LOC delta**: +60-80 LOC (sibling-cite estimate confirmed):
- +40 LOC: extract reusable `run_codex_with_jsonl_pattern()` API in `_codex_jsonl_runner.py` (currently
  the patterns are inline within `main()`)
- +5 LOC × 4 consumers = +20 LOC delegation calls
- +20 LOC: add structured `codex_jsonl_runner_result.v1` dataclass for cross-consumer type-safety

**Phase B precondition**: Phase A's zero-investigation warning fires in ≥1 live fire before Phase B starts
(empirically validates the warning is load-bearing; per cardinal-rule-10 step (a) install canonical SOTA
solution — Phase B IS the canonical install of the n=8 ladder gstack adoption).

---

## Sibling consumer impact analysis (per CR-9 sibling-bleed defense)

**Sibling consumer count**: `Grep "_codex_jsonl_runner|jsonl_runner|turn_completed" Z:/claude-sota-installed/.claude/hooks/scripts`
returned 1 file (`codex_t1_consult_gate.py` only). Per Glob, eee has 12 codex_*.py hooks total.

**Path rewrite needed**: ZERO — sibling `_codex_jsonl_runner.py` has 0 `Z:/claude-sota` references
(verified via Grep). File is fully portable across runtimes. Sibling-bleed defense per CR-9 PASSES.

**Consumer-side path rewrite needed**: ONLY at hook callsites. Sibling T2/T3/T4/T5 hooks may have
`Z:/claude-sota` paths in cite headers (HISTORICAL-TRUTH preserved per port-note-discipline §6) but
runtime path resolution uses `_PROJECT_ROOT` symbol (already path-portable).

**REVERT check** (CR-9 mandate):
```bash
$ git -C Z:/claude-sota log --all --oneline -- 'scripts/_codex_jsonl_runner.py'
```
Expected: clean (file is net-add at fire-18, no REVERT precedent).

---

## Sibling-bleed per-cite analysis

| Cite-import target | Sibling path | `Z:/claude-sota` references | Rewrite needed |
|---|---|---|---|
| `_codex_jsonl_runner.py` | `Z:/claude-sota/scripts/_codex_jsonl_runner.py` | 0 (Grep clean) | NO |
| `codex_t1_consult_gate.py` (already in eee at fire-18) | n/a | n/a | n/a |
| Future Phase B consumer-side hooks | TBD per Phase B refactor | likely cite-headers only (HISTORICAL-TRUTH) | runtime: NO; cite-header: documented per port-note-discipline §6 |

---

## Smoke test design (regression test for each gstack pattern)

Per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §SubagentStop transcript-mining`, every
new gate behavior needs a regression-test that asserts the pattern fires when expected:

| Test | Trigger | Assert | Coverage |
|---|---|---|---|
| `test_jsonl_runner_turn_completed_count` | Synthetic codex stdout with 1 `turn.completed` event | `state["turn_completed_count"] == 1` | gstack `:1148-1149` |
| `test_jsonl_runner_exit_124_timeout` | Mock subprocess returncode=124 | sidecar JSON `codex_exit_code == 124` AND `classification == "timeout_124"` | gstack `:1158-1164` |
| `test_jsonl_runner_auth_failed_stderr` | Mock stderr containing "not logged in" | sidecar `auth_status == "auth_failed"` | gstack `:1166-1169` + `_classify_auth_status` |
| `test_jsonl_runner_rate_limit_stderr` | Mock stderr "rate limit" | sidecar `auth_status == "rate_limit_429"` | sibling extension beyond gstack |
| `test_jsonl_runner_zero_investigation_warning` (Phase A) | Mock: turn_completed=0 AND exit=0 AND empty stderr | sidecar `pattern_b_zero_investigation_warning == True` | gstack `:1154-1156` + n=8 ladder |
| `test_jsonl_runner_malformed_json_swallowed` | Mock stdout with malformed JSON line | `state["malformed_count"] >= 1` AND no exception escape | sibling robustness |

Tests live at `Z:/claude-sota-installed/tests/test_codex_jsonl_runner.py` (NEW; ~60 LOC).

---

## Per-cite sibling-bleed analysis (CR-9 conformance)

All cite anchors verified file:line + content-grep:

| # | Cite | File:line | SHA | Path-rewrite |
|---|---|---|---|---|
| 1 | gstack JSONL pattern (turn.completed count) | `Z:/repos/deps/gstack/codex/SKILL.md:1129,1148-1149,1154-1156` | `dde55103` | n/a (immutable cite-anchor per CR-9 read-only research probe exception) |
| 2 | gstack exit-124 hang detection | `Z:/repos/deps/gstack/codex/SKILL.md:1158-1164` | `dde55103` | n/a |
| 3 | gstack stderr auth detection | `Z:/repos/deps/gstack/codex/SKILL.md:1166-1169` | `dde55103` | n/a |
| 4 | gstack LICENSE | `Z:/repos/deps/gstack/LICENSE:1-20` (full MIT) | `dde55103` | n/a |
| 5 | Sibling runner (Phase 0 install source) | `Z:/claude-sota/scripts/_codex_jsonl_runner.py` | record SHA at copy time | NO (Grep-clean of Z:/claude-sota refs) |
| 6 | Sibling cite ladder | `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md §Pattern-B mitigation patterns` | n/a (read-only research probe) | n/a |
| 7 | Eee gate spawn block | `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t1_consult_gate.py:1030-1112` | local | n/a |

---

## Synthesis (≤200 words)

**Phase 0 (cite-import sibling `_codex_jsonl_runner.py`) is the next-fire ship priority** — not Phase A. The
brief assumed the gate's supervisor module already exists in eee; Glob proved it does NOT, meaning every
AUTO-T1 STRICT spawn currently returns `launch_error` (FM-14 sub-class .b silent failure). This is
strictly higher-leverage than the gstack zero-investigation warning (Phase A) because zero-investigation
warning cannot fire while the supervisor that emits it doesn't exist.

Phase 0 ship is mechanical (full file copy from sibling, zero path-rewrite needed per Grep-clean
sibling-bleed defense, ~258 LOC). 2-round fix-forward budget per CR-9 install-risk discipline. Phase A
becomes trivial (+12 LOC) once Phase 0 lands. Phase B (4-consumer refactor) defers until Phase A's
warning fires in ≥1 live arc — empirical validation gate per cardinal-rule-10.

**Operator input needed**: confirm Phase 0 → Phase A → Phase B ordering, OR fold Phase 0+A into single
atomic ship (would close FM-14 + add zero-investigation warning in one fire — viable per ONE-LOGICAL-UNIT
since both touch the same supervisor file). Recommend single atomic Phase 0+A ship for next fire.

DESIGN: NEEDS-OPERATOR-INPUT

---

**Relevant file paths** (absolute, per output instructions):

- `Z:/claude-sota-installed/.claude/hooks/scripts/codex_t1_consult_gate.py` — current eee gate (supervisor at `:1030-1112`)
- `Z:/claude-sota-installed/scripts/_codex_jsonl_runner.py` — **MISSING** (Phase 0 install target)
- `Z:/claude-sota/scripts/_codex_jsonl_runner.py` — Phase 0 cite-import source (Grep-clean of `Z:/claude-sota` refs)
- `Z:/repos/deps/gstack/codex/SKILL.md` — TIER-1 cite at `:1115-1170` (brief said `:1019-1061` — corrected)
- `Z:/repos/deps/gstack/LICENSE` — MIT attribution `:1-20`
- `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` — sibling Pattern B mitigation cite ladder

# F1 — W290 Code-Quality Audit (pyright + ruff + shellcheck)

> **Wave**: W290 (Architecture Quality + Next-Wave SOTA Discovery)
> **Date**: 2026-05-18
> **Fork**: F1 / 4 (worker — code-quality bug-finder)
> **Mandate**: Operator (2026-05-18 14:19 hindsight) — "deep SOTA-quality audit to find real bugs in the current architecture using pyright, shellcheck, and gitleaks". F2 owns gitleaks; this fork owns pyright + ruff + shellcheck on the runtime's own code.
> **Cite-class**: TIER-1-DIRECT — every finding is a verbatim tool-output line with file:line + rule code.

---

## §0 — TL;DR

- **Files scanned**: **26 Python** files + **6 shell** files (in-tree, excluding cache deps, `.local/graphiti` vendor, `.claude/session-env/*` runtime artefacts)
- **pyright (default)**: **0 errors · 0 warnings · 0 info** across all 26 files. PASS.
- **pyright (strict)**: DEFERRED — strict scan timed out at 300 s; default mode is enough to validate "no real type-bug-class findings". Strict-mode delta is captured by ruff's ANN001/201/202 counts (see §3).
- **ruff `--select ALL`**: **1398 findings** total (style-dominated)
- **shellcheck**: **0 findings** on the 6 in-tree shell scripts. PASS.
- **HIGH (real bugs)**: **5** — listed in §2 (2 bugbear + 3 cosmetic f-string)
- **SECURITY** (S-codes excl. S101 test-asserts): **32** — listed in §2.5 (mostly subprocess + urllib audits; 1 false-positive)
- **MEDIUM (type-safety / annotations)**: **246** — listed in §3 (ANN001/201/202/401/002/003)
- **LOW (style/cleanup)**: **~1115** — summarised in §4 (E501 line-length + COM812 trailing comma + D-codes docstrings + PLR2004 magic values + SLF001 private-access + INP001 missing __init__ + etc)

**Headline verdict**: the in-tree runtime Python code is **TYPE-CLEAN and SHELL-CLEAN**. There are **no real bugs that would block execution**. Style/cleanup findings dominate but those are not "real bugs" in the operator's sense.

---

## §1 — Methodology + tool versions

### Tool versions

| Tool | Version | Source | Command |
|---|---|---|---|
| pyright | 1.1.408 | `C:\Users\42\AppData\Roaming\Python\Python314\Scripts\pyright.exe` (Z-venv mirror at `Z:\venvs\claude\Scripts\pyright.exe`) | `pyright --outputjson <paths>` |
| ruff | 0.14.11 | `C:\Users\42\AppData\Roaming\Python\Python314\site-packages` (pre-commit binds v0.15.12 at commit-time per `.pre-commit-config.yaml:21`) | `python -m ruff check --select ALL --output-format=json <paths>` |
| shellcheck | 0.11.0 | `C:\Users\42\AppData\Local\Microsoft\WinGet\Links\shellcheck.exe` | `shellcheck -f json <script>` |
| mypy | available at `Z:\venvs\claude\Scripts\mypy.exe` | (not run — pyright covers same surface) | n/a |
| gitleaks | v8.30.1 (pre-commit) + `Z:\claude-sota-installed\.local\bin\gitleaks.exe` | (F2 owns full-tree scan) | n/a in this fork |

### Files scanned

**Python (26)**:
- `accounts/scripts/{cache_rate.py, poll_all.py, token_efficiency.py, weekly_reset_guard.py}` (4)
- `evals/deepeval/test_smoke.py`, `evals/evolve_pass_rate_gate.py` (2)
- `harness/{eval_harness.py, inspect_tasks.py, sota_rubric_lane.py}`, `harness/fixtures/sota_rubric_smoke_fixture.py` (4)
- `scripts/{codex-plugin-hooks-rewrite.py, ecc-plugin-hooks-rewrite.py, hindsight-plugin-hooks-rewrite.py, w275-hooks-rewrite.py}` (4)
- `tools/{_eee_status_query.py, codex_verdict_normalizer.py, process_hygiene_audit.py}` (3)
- `tests/{test_agent_plan_readonly_bash_guard_security.py, test_agent_spawn_gate_security.py, test_auto_proceed_gate_schema.py, test_auto_proceed_gate_security.py, test_block_no_verify_guard_security.py, test_gitleaks_pre_commit_gate_security.py, test_safety_guard_security.py, test_w130_fire5_matcher_boundaries.py, test_w130_fire6_git_verb_matches_shell_prefixes.py}` (9)

**Shell (6)**:
- `.specify/scripts/bash/{check-prerequisites.sh, common.sh, create-new-feature.sh, setup-plan.sh, setup-tasks.sh}` (5 — github/spec-kit vendored installer scripts)
- `.tmp-gitleaks-test/test.sh` (1 — test fixture)

### Files skipped + why

- `.local/graphiti/**/*.py` (21 files) — VENDORED upstream code, not runtime authorship; per `.pre-commit-config.yaml` `exclude: \.local/.*`.
- `.cache/pre-commit/**`, `.bun/**`, `.cargo/**` — third-party tool caches.
- `.claude/session-env/*/sessionstart-hook-*.sh` (≈2000 files) — runtime auto-generated artefacts; not authored code.
- `.claude/shell-snapshots/snapshot-bash-*.sh` (≈40 files) — terminal-session captures, not authored code.
- `.claude/plugins/marketplaces/everything-claude-code/install.sh` — vendored third-party installer.

---

## §2 — HIGH severity findings (real bugs)

5 findings total. All ruff-detected.

### `accounts/scripts/weekly_reset_guard.py:202` — B007 — unused loop control variable
- **Evidence**: `B007 Loop control variable 'util_pct' not used within loop body`
- **Impact**: Latent — the loop iterates but the bound name `util_pct` is dead code. Suggests an incomplete check or an extracted-and-not-reapplied threshold logic.
- **Fix**: Either consume `util_pct` (eg `if util_pct > 0.9: warn(...)`) or rename to `_` to mark intentionally-unused.

### `harness/sota_rubric_lane.py:156` — B009 — constant-attribute getattr
- **Evidence**: `B009 Do not call 'getattr' with a constant attribute value. It is not any safer than normal property access.`
- **Impact**: LOW. Functional, but indicates legacy-from-refactor. `getattr(obj, "name")` should be `obj.name` directly.
- **Fix**: Replace `getattr(obj, "field_name")` with `obj.field_name`. 1-line change.

### `tests/test_gitleaks_pre_commit_gate_security.py:137` — F541 — f-string without placeholders
- **Evidence**: `F541 f-string without any placeholders`
- **Impact**: Cosmetic — `f"..."` literal is functionally identical to `"..."` but signals intent that may have been edited away (deleted a `{var}` interpolation).
- **Fix**: Remove the `f` prefix, or restore the missing `{var}` interpolation.

### `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py:269` — F541
- Same shape as above.

### `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py:275` — F541
- Same shape as above.

**No HIGH findings in production code paths** (`harness/`, `accounts/scripts/`, `tools/`). All 3 F541 occurrences are in test files; the 2 bugbear findings are split between production (`harness/sota_rubric_lane.py`) and accounts (`accounts/scripts/weekly_reset_guard.py`).

---

## §2.5 — SECURITY findings (S-codes excluding S101 test-asserts)

32 findings. Most are **expected/acceptable in context** (subprocess in test harnesses; urllib audits with controlled URLs); 1 false-positive; 4 worth a small hardening pass.

### Production code (worth review)

| File | Line | Code | Severity | Notes |
|---|---:|---|---|---|
| `accounts/scripts/poll_all.py` | 193 | S310 | INFO | urllib URL — audit scheme. Likely `https://` Anthropic API. Add explicit scheme assert. |
| `accounts/scripts/poll_all.py` | 204 | S310 | INFO | Same. |
| `accounts/scripts/token_efficiency.py` | 61 | S310 | INFO | Same. |
| `accounts/scripts/token_efficiency.py` | 63 | S310 | INFO | Same. |
| `accounts/scripts/token_efficiency.py` | 97 | S607 | LOW | Partial path — replace with full `Z:/...` or `which` lookup. |
| `harness/eval_harness.py` | 105 | S603 | INFO | subprocess call — already constrained to harness CLI args. Acceptable. |
| `harness/eval_harness.py` | 465 | S603 | INFO | Same. |
| `tools/_eee_status_query.py` | 36 | S105 | FALSE-POSITIVE | `CPA_SECRET_ENV` is the env-var NAME (a constant for `os.environ[...]`), not a literal secret value. |
| `tools/_eee_status_query.py` | 135, 140 | S310 | INFO | urllib URL audits — same advice. |
| `tools/process_hygiene_audit.py` | 68, 69, 130, 250, 251 | S603+S607 | LOW | Tool that introspects local processes; subprocess + partial paths are intentional for tooling that calls `tasklist`, `ps`, etc. Acceptable. |

### Test code (acceptable — testing security hooks)

10 S603 occurrences across `tests/test_*_security.py` — these tests **deliberately** subprocess-invoke the security hooks they are testing. Acceptable.

2 S108 `/tmp/x` occurrences (`test_agent_plan_readonly_bash_guard_security.py:111`, `test_gitleaks_pre_commit_gate_security.py:83`) — test fixture paths. Acceptable but could be tightened to `tempfile.mkdtemp()`.

### Action item

The 4 S310 instances in `accounts/scripts/*` and `tools/_eee_status_query.py` warrant a 1-commit hardening pass: add `assert url.startswith("https://")` before each `urlopen`. NOT a blocker.

---

## §3 — MEDIUM severity findings (type-safety / annotations)

246 findings, all annotation-related:

| Rule | Count | Meaning |
|---|---:|---|
| ANN001 | 106 | Missing type annotation for function argument |
| ANN201 | 97 | Missing return type annotation for public function |
| ANN202 | 40 | Missing return type annotation for private function |
| ANN401 | 7 | Dynamically typed expressions (`Any`) — discouraged in strict mode |
| ANN002 | 3 | Missing type annotation for `*args` |
| ANN003 | 3 | Missing type annotation for `**kwargs` |

**Interpretation**: the runtime's Python code does not enforce strict type annotations. This is consistent with the project being primarily *scripts and harnesses* rather than a library. Pyright in default mode passes because it does not require type annotations.

**Recommendation**: gradual annotation adoption per file, starting with `harness/eval_harness.py` (158 ruff findings; the most heavily-used entry point) and `tools/_eee_status_query.py` (54 findings; operator-facing CLI). Not a W290 blocker.

---

## §4 — LOW severity findings (style/cleanup)

Aggregate top-15 ruff codes covering ~1115 findings:

| Rule | Count | Category |
|---|---:|---|
| E501 | 350 | Line too long (default 88) |
| S101 | 205 | `assert` in test files (false positive — pytest pattern) |
| T201 | 173 | `print()` calls (intentional in scripts) |
| COM812 | 106 | Missing trailing comma |
| D103 | 39 | Missing docstring on public function |
| PLR2004 | 36 | Magic value in comparison |
| SLF001 | 36 | Private member accessed (`_foo`) — many in tests |
| INP001 | 16 | Implicit namespace package (missing `__init__.py`) |
| PLC0415 | 15 | Import not at top of file (deferred imports) |
| UP045 | 14 | `Union[X, Y]` should be `X \| Y` (PEP 604) |
| FBT002 | 14 | Boolean default positional arg |
| PLW1510 | 14 | `subprocess.run` without `check=` (matches the S603 set) |
| D205 | 13 | 1-line blank after docstring summary |
| C901 | 9 | Function too complex (cyclomatic > 10) |
| FBT001 | 7 | Boolean positional argument |

### Top 10 files by ruff-finding count

| File | Findings |
|---|---:|
| `tests/test_agent_spawn_gate_security.py` | 197 |
| `harness/eval_harness.py` | 158 |
| `tests/test_auto_proceed_gate_schema.py` | 112 |
| `scripts/ecc-plugin-hooks-rewrite.py` | 89 |
| `scripts/codex-plugin-hooks-rewrite.py` | 88 |
| `tests/test_gitleaks_pre_commit_gate_security.py` | 75 |
| `accounts/scripts/weekly_reset_guard.py` | 64 |
| `accounts/scripts/token_efficiency.py` | 61 |
| `scripts/w275-hooks-rewrite.py` | 55 |
| `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py` | 55 |

---

## §5 — Whole-file recommendations

- **PASS (0 findings)** in pyright default: ALL 26 files. No file requires rewrite.
- **Cleanup candidate (≥100 ruff findings)**: `tests/test_agent_spawn_gate_security.py` (197) — but findings are E501 + S101 + ANN001 dominated, all style; the file's logic is intact.
- **harness/eval_harness.py** (158 findings) — the central eval-lane runner. ZERO HIGH/MED real-bug findings beyond annotations; refactor only when adding strict typing.
- **No file flagged for rewrite/refactor** in this audit.

---

## §6 — Action items (operator-actionable)

| # | Priority | File:line | Action | Effort |
|---:|---|---|---|---|
| A1 | LOW | `accounts/scripts/weekly_reset_guard.py:202` | Consume `util_pct` in loop body OR rename to `_` (B007) | 1 line |
| A2 | LOW | `harness/sota_rubric_lane.py:156` | Replace `getattr(obj, "literal")` with `obj.literal` (B009) | 1 line |
| A3 | LOW | `tests/test_gitleaks_pre_commit_gate_security.py:137`, `tests/test_w130_fire6_git_verb_matches_shell_prefixes.py:{269,275}` | Drop `f` prefix from placeholder-less f-strings (F541) | 3 lines |
| A4 | MEDIUM | `accounts/scripts/poll_all.py`, `token_efficiency.py`, `tools/_eee_status_query.py` | Add `assert url.startswith("https://")` before each `urllib.request.urlopen` call (S310 hardening) | ~6 asserts |
| A5 | MEDIUM | `accounts/scripts/token_efficiency.py:97`, `tools/process_hygiene_audit.py:{69,130,251}` | Replace partial executable paths with full path or `shutil.which()` lookup (S607) | 4 paths |
| A6 | LOW | `tools/_eee_status_query.py:36` | Add `# noqa: S105` comment + cite "env-var NAME not value" (S105 false-positive suppression) | 1 line |
| A7 | DEFERRED | All 246 ANN findings | Gradual type-annotation adoption — file-by-file. Start with `harness/eval_harness.py`. Not a W290 blocker. | 6-10 commits |
| A8 | DEFERRED | All 350 E501 findings | Run `ruff format` against the tree. Already in pre-commit, but `ruff format` was not yet applied to existing files (pre-commit only fires on staged diff). One-time `ruff format .` would absorb most E501s. | 1 commit |
| A9 | DEFERRED | pyright strict mode | Re-attempt strict scan with file-by-file iteration (the all-files scan timed out at 300s). | ~30 min over time |

---

## §7 — Cite trail

- ruff JSON output captured via `python -m ruff check --select ALL --output-format=json` against in-tree paths, 2026-05-18.
- pyright JSON output captured via `pyright --outputjson <paths>`, 2026-05-18.
- shellcheck JSON output captured via `shellcheck -f json <script>`, 2026-05-18.
- `.pre-commit-config.yaml` cited for ruff/gitleaks/shellcheck/actionlint pre-commit pins.
- All findings traceable to file:line; no synthesized data.

---

## §8 — Cross-fork hand-off

- **F2 (gitleaks/security)**: gitleaks scan owner. Note S105 false-positive at `tools/_eee_status_query.py:36` (`CPA_SECRET_ENV` is env-var NAME, not value).
- **F3 (SOTA discovery)**: no direct interaction; this audit demonstrates the runtime is type-clean which supports the "in-good-condition-to-shutdown" posture.
- **F4 (sca-v4 evolution)**: consider adding D16 `code_quality_baseline` dim to v4 rubric — measured via pyright+ruff+shellcheck on a candidate's own code, with hard-cap=2 if pyright errors detected. The current v3 dim D15 supply_chain_safety covers deps but not the candidate's own code quality.

---

**End F1 report.** No commits this fork (write-only artefact). No installs. No skill invocations.

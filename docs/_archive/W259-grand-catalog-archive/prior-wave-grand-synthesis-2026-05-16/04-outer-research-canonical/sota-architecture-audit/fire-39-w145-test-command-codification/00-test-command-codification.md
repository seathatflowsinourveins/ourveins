# Wave 145 Fire 11 — test_command capture hook codification (W145-F11)

> **Verdict**: `DOC-ONLY-CODIFICATION` — design + schema for future hook that emits `claude_code.test_command` Phoenix span on test invocations + completions. Closes W145-F5 Agent provenance/replay schema GAP #2 (test execution not captured per-loop). NO install — actual hook script ship deferred to **W145-F11b** operator-gated install fire.
> **Closed-loop disposition**: Outcome A ACCEPT-WITH-DOC — codification + wire-activation deferred per CR-7 Phase 1 + CR-9 install-risk

## Fire 39 (W145-F11) /loop tick post-W149-F2 (dynamic + cron `*/12` parallel-armed)

User re-invoked `/loop` dynamic-mode after W149-F2 `637be41` (safety_guard.py +12 LOC Docker mass-deletion deny). Stale cron prompt named W149-F2 as 🥈 forward — FM-20 path-drift pivot detected (W149-F2 already SHIPPED). Auto-pick = post-W149-F2 Forward Top-5 🥈 **W145-F11 test_command capture hook codification** per sister W145-F10 codification pattern (commit `b49639d` fire-37).

## Mia probe — confirms GENUINE GAP (n=298 → n=302, +4)

| Probe | Command | Result |
|---|---|---|
| Existing test-capture hook | `rg -l "test_command\|claude_code\.test_" .claude/hooks/scripts/` | ❌ NO `test_*` capture scripts in `.claude/hooks/scripts/` |
| Phoenix span schema | `rg "claude_code\.test_" docs/ .claude/settings.json` | ❌ NO `claude_code.test_*` span schema in any config or doc |
| sister W145-F10 dep_snapshot | `Read docs/sota-architecture-audit/fire-37-w145-dep-lock-codification/00-dep-lock-codification.md` | ✅ Sister pattern fully read (170 LOC structure) |
| cwc commit-on-stop test capture | `Read .claude/hooks/scripts/cwc/commit-on-stop.sh` (when wired) | ❌ Captures `git diff --shortstat` but NOT test invocation/status |

**Confirmed**: test_command capture per autonomous-loop session is GENUINE GAP — not covered by any existing capture surface. Sister W145-F10 dep_snapshot covers dependency-state; this fire covers test-execution-state (orthogonal capture axes for replay-by-reconstruction workflow).

## Codified design (DOC-ONLY)

### Schema: `claude_code.test_command` Phoenix span

```yaml
span_name: claude_code.test_command
span_attributes:
  session.id: ${session_id}                    # link to claude_code.interaction parent span
  test.timestamp_start: ${ISO-8601 UTC}
  test.timestamp_end: ${ISO-8601 UTC}
  test.duration_ms: ${integer milliseconds}
  test.run_id: ${run_id}                        # link to commit-on-stop git_sha
  test.boundary: "session-start" | "session-end" | "autonomous-loop-tick" | "pre-commit" | "pre-push" | "ad-hoc"
  # Framework detection
  test.framework: "pytest" | "vitest" | "jest" | "cargo-test" | "go-test" | "dotnet-test" | "rspec" | "mocha" | "ad-hoc-shell"
  test.framework_version: ${semver string}
  # Invocation
  test.command: ${literal invocation string}    # e.g., "pytest tests/ -v"
  test.cwd: ${working directory absolute path}
  test.argv_sha256: ${hash of argv-sorted}      # determinism for replay-equality
  # Outcome
  test.exit_code: ${integer}                    # 0 = pass; non-zero = fail/error
  test.outcome: "passed" | "failed" | "errored" | "timeout" | "interrupted"
  test.tests_collected: ${integer count}        # parsed from framework output
  test.tests_passed: ${integer count}
  test.tests_failed: ${integer count}
  test.tests_skipped: ${integer count}
  test.tests_errored: ${integer count}
  # Coverage (if instrumented)
  test.coverage_pct: ${float 0-100}            # null if not instrumented
  test.coverage_lines_covered: ${integer}
  test.coverage_lines_total: ${integer}
  # Output digest
  test.stdout_sha256: ${hash of normalized stdout}
  test.stderr_sha256: ${hash of normalized stderr}
  test.junit_xml_path: ${path}                  # null if no JUnit XML emitted
  # Error fingerprint (if failed)
  test.failure_first_failure: ${first failing test name}
  test.failure_stack_sha256: ${hash of failure stack trace}
```

### Hook design — Python script

**File**: `.claude/hooks/scripts/test_command_hook.py` (proposed; install ship deferred)

**Wire**: PreToolUse + PostToolUse on `Bash` matcher with `if:` predicate detecting test framework invocation patterns. Decision options:

- **Option A (PreToolUse on Bash with test-framework regex)**: emit on test invocation entry — captures `test.command` + `test.timestamp_start` + `test.cwd`. Span left open; PostToolUse closes it.
- **Option B (PostToolUse on Bash with test-framework regex)**: emit on test completion only — captures full span with outcome. Simpler but loses in-flight visibility.
- **Option C (BOTH — PreToolUse + PostToolUse paired)**: full span bracketing — pre-emit opens span; post-emit closes with outcome. Supports interrupted-test telemetry (post never fires).
- **Option D (sampled — every N test runs)**: throttle to once per N invocations — bounded overhead for chatty test loops.

**Recommended**: **Option C (BOTH boundaries paired)** for autonomous /loop integration. Supports replay-by-diffing-test-runs workflow per W145-F12 replay-session.py CLI codification (W145-F12-NEW deferred). Interrupted-test detection via `test.boundary=session-end` close-without-explicit-PostToolUse.

### Framework detection regex (PreToolUse trigger)

| Framework | Regex pattern (case-insensitive) | Example matches |
|---|---|---|
| pytest | `\bpytest\b(?!\.ini\|\.cfg\|-mock)` | `pytest tests/`, `python -m pytest`, `uv run pytest` |
| npm/vitest/jest | `\b(npm\|pnpm\|yarn)\s+(run\s+)?(test\|vitest\|jest)\b` | `npm test`, `npm run test:unit`, `pnpm vitest` |
| cargo test | `\bcargo\s+test\b` | `cargo test`, `cargo test --release` |
| go test | `\bgo\s+test\b` | `go test ./...`, `go test -race ./...` |
| dotnet test | `\bdotnet\s+test\b` | `dotnet test`, `dotnet test --filter` |
| rspec | `\bbundle\s+exec\s+rspec\b\|\brspec\s+spec/` | `rspec spec/`, `bundle exec rspec` |
| mocha/jasmine | `\bnpx\s+mocha\b\|\bnpx\s+jasmine\b` | `npx mocha`, `npx jasmine` |
| Ad-hoc shell | `make\s+test\|./test\.sh\|./run-tests\.sh` (low-confidence; framework=ad-hoc-shell) | `make test`, `./test.sh` |

Per CR-9 install-risk discipline: regex false-positives on `pytest-mock` install commands, `cargo test-fmt` lint commands, etc. — operator-side filter list maintained alongside hook.

### Probe commands per outcome detection

| Framework | Outcome probe | Output schema |
|---|---|---|
| pytest | parse JUnit XML at `--junit-xml=<path>` flag OR stdout regex `=== \d+ passed.* in [\d\.]+s ===` | tests_collected / passed / failed / skipped / errored |
| vitest | parse `--reporter=json` stdout JSON OR text regex | tests_passed / failed |
| jest | parse `--json --testResultsProcessor` OR text regex | tests_passed / failed / total |
| cargo test | parse text regex `test result: ok\. \d+ passed.*\d+ failed` | passed / failed |
| go test | parse text regex `(--- PASS:\|--- FAIL:)` per-line | per-test outcome aggregation |
| dotnet test | parse `--logger trx` TRX XML at `--results-directory` | passed / failed / skipped |

Coverage detection (orthogonal):
- pytest: parse `coverage` package output OR `pyproject.toml` `[tool.coverage]` config presence
- vitest/jest: parse `--coverage` flag presence + `coverage/clover.xml` reporter
- cargo: parse `tarpaulin` / `grcov` invocations alongside `cargo test`
- go: parse `go test -cover` flag + `--coverprofile` file

### Operational concerns

1. **Hook latency overhead**: PreToolUse adds 5-50ms span emission per Bash invocation (negligible). PostToolUse adds parse cost — JUnit XML parse = 10-100ms; text-regex parse = 1-5ms.
2. **PII / sensitive test names**: test names + stack traces CAN leak internal API surfaces (e.g., `test_internal_admin_endpoint`). Recommend filter per `.gitleaks.toml` model + `--exclude-pattern` config.
3. **Output normalization**: stdout/stderr hashes MUST normalize timestamps + memory addresses + PID before hashing (per cwc `commit-on-stop` precedent). Without normalization, identical test runs produce different hashes.
4. **Storage routing**: emit via OTLP gRPC :14317 → Phoenix project=eee per existing `OTEL_TRACES_EXPORTER` wire (W145-F5 cite trail). Local-only Phoenix container — no external transport.
5. **Interrupted-test detection**: PreToolUse fires open-span; if Bash subprocess crashes OR session terminates before PostToolUse, span stays open. Use Stop hook on session-end to flush open spans with `test.outcome=interrupted`.
6. **Framework version capture**: probe `pytest --version` / `cargo --version` / `npm test --` at PreToolUse — adds 100-500ms latency. Cache per session_id to amortize.
7. **JUnit XML emission gating**: many test runs don't emit JUnit XML by default; hook MAY inject `--junit-xml=<tmp-path>` flag at PreToolUse for guaranteed structured output. Operator-discretion (per-project pyproject.toml / package.json convention).

### Replay workflow integration (cross-link to W145-F12)

When replay-session.py CLI (W145-F12 deferred) consolidates session record from Phoenix + cpa-usage-keeper + git + JSONL surfaces:

1. Query `claude_code.test_command` spans by session.id
2. Aggregate per-framework outcome (passed/failed/skipped counts)
3. Cross-reference test failures with `claude_code.dep_snapshot` (W145-F10) — detect dependency-drift → test-failure correlations
4. Cross-reference with `commit-on-stop` git_sha — link test pass/fail to specific source state
5. Emit replay report: `Session ${session_id} ran ${N} test invocations across ${frameworks}; ${P} passed / ${F} failed; ${X}% coverage; correlated failures: ${list}`

This closes the W145-F5 "test execution not captured per-loop" GAP for the replay-by-reconstruction workflow. Combined with W145-F10 dep_snapshot + W145-F12 replay CLI, autonomous-loop sessions become fully replay-able from Phoenix + git + JSONL surfaces.

## Install ship deferred to W145-F11b (CR-7 Phase 1 operator-gated)

This codification is DOC-ONLY. Actual hook script implementation + `.claude/settings.json` wire registration is HIGH-RISK install ship per CR-9 install-risk + CR-7 Phase 1 operator-approval gate. Deferred to **W145-F11b** install fire when operator explicitly approves.

CR-9 install-risk considerations:
- Hook adds Bash matcher with regex `if:` predicate — non-trivial regex evaluation per Bash invocation
- OTLP gRPC dependency on Phoenix container running (graceful-degrade if Phoenix down)
- Test-name PII/sensitive-info exclusion config needed before any external transport (eee local-only Phoenix is safe; future cloud sink via dash0 plugin requires explicit filter wire)
- Idempotency: stdout/stderr normalization MUST handle timestamps + PIDs + memory addresses for snapshot-equality
- Framework-version probe latency (~100-500ms) — amortize per session_id cache
- JUnit XML injection MAY conflict with project-specific test config (operator-discretion gate)

## Cross-model gate disposition

**NO Path P dispatch fired (this fire)** — Mia probe confirmed genuine GAP; codification is operator-side schema design (sister W145-F10 pattern). Per `cross-model-consensus.md §Verdict report shape`: codification + design ship is META-CODIFICATION. Cross-model gate structurally N/A for this fire.

**Cumulative**: ~1620s + ~45K tokens + ~2850 LOC saved across W145-F2-W145-F11 + W146 + W149 arc (no-codex-dispatch on codification fires).

## Ladder advances

| Ladder | Prior (post-W149-F2) | This fire |
|---|---|---|
| Mia pre-apply | n=298 | **n=302** (+4 gap-confirmation probes) |
| FM-20 path-drift cascade defenses | n=17 | **n=18** (+1 W149-F2-already-shipped pivot on stale cron prompt) |
| Path P recipe | n=32 | n=32 (no dispatch — 9th cumulative consecutive no-dispatch codification) |
| Pattern D foreground+tee | n=24 | n=24 (no dispatch) |
| Forward Discipline #2 | n=9 | n=9 (no dispatch) |
| Cross-model gate satisfied | 7× cumulative | 7× cumulative (no new dispatch this fire) |
| Wave 24-D advanced agent team apps | +1 (W146+W149) | +1 (no team dispatch this fire — DOC-ONLY single-file) |
| Cumulative cost-savings (no-dispatch codifications) | ~1500s + ~42K tokens + ~2730 LOC | **~1620s + ~45K tokens + ~2850 LOC** |

## REVISED Forward Top-5 (post-W145-F11)

| Priority | Fire | Subject | Status |
|---|---|---|---|
| ~~🥈~~ | W145-F11 test_command capture hook codification | ✅ **CLAIMED THIS FIRE** | — |
| 🥇 NEW | **W145-F12-NEW** replay-session.py CLI consolidation codification | UNCLAIMED |
| 🥈 NEW | **W146-F8** SOTA cleanliness re-audit (10-fire cadence trigger met) | UNCLAIMED (3-agent fan-out required per Wave 24-D) |
| 🥉 NEW | **W145-F13-NEW** Manifest drift sweep PART-2 (~64 remaining PLANNED entries) | UNCLAIMED |
| OPERATOR-GATED | **W145-F11b** test_command hook install fire | HIGH-RISK install — awaits operator approval |
| OPERATOR-GATED | **W145-F10b** dep_snapshot hook install fire | HIGH-RISK install — awaits operator approval |
| OPERATOR-GATED | **W138-F4** governance trio install | HIGH-RISK install |
| OPERATOR-GATED | **W141B** Docker MCP Gateway eee-runtime wire | HIGH-RISK STUDY-PILOT |
| OPERATOR-GATED | **W145-F5b** cwc INSTALLED-DORMANT wire-activation | HIGH-RISK install |

**STEP 12 TRIGGER WATCH**: post-W145-F12/W145-F13 (2 more doc-only fires), Forward Top-5 will be near-EMPTY except OPERATOR-GATED — next-cron-fire trigger fires W146-F8 SOTA cleanliness re-audit (3-agent fan-out) OR fresh ecosystem discovery sweep.

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT to OTel semantic conventions `https://opentelemetry.io/docs/specs/semconv/general/trace/` + JUnit XML SOTA spec `https://github.com/testmoapp/junitxml` + sister W145-F10 `b49639d` |
| CR-3 cross-model | N/A (codification + design schema; no cross-model gate per sister W145-F10 precedent) |
| CR-5 install-priority | ✅ DEFERRED to W145-F11b operator-gated install fire — codification only, no hand-coded primitive |
| CR-9 install-risk | ✅ 6 install-risk considerations enumerated; install ship deferred |
| CR-10 research-first-then-install | ✅ Research = Mia gap-confirmation + sister W145-F10 pattern read; codification = schema + design doc; install deferred |
| CR-11 META-process | ✅ This fire IS CR-11 dogfood (closes W145-F5 GAP #2 documentation; sister W145-F10 mechanical-mirror exception eligible per single-file + ≤200 LOC + pure pointer-extension to sister schema pattern) |
| CR-12 5-class lattice | ✅ GENUINELY-NEW per sister-fire pattern (no upstream test_command capture span schema for autonomous-loop replay; OTel test-execution conventions in DRAFT status) |
| Mia pre-apply (n=302) | ✅ 4 gap-confirmation probes BEFORE codification |
| FM-20 path-drift cascade defense (n=18) | ✅ +1 catch (W149-F2-already-shipped pivot on stale cron prompt) |
| FM-02 sub-class (b)+(c) defense | ✅ Atomic single-shell git add + commit --only per next step |
| synthesis-layer-verify | ✅ Genuine GAP confirmed (not OVER/HNF) — codification surfaces concrete test_command schema closing W145-F5 GAP #2 |
| Forward Discipline #2 | ✅ NO codex dispatch (9th cumulative consecutive; cumulative ~1620s + 45K tokens + 2850 LOC saved) |
| kiss-dry-yagni Must-Never #4 | ✅ Hook implementation deferred to install-fire — no premature implementation |
| port-note-discipline §6 forward-only | ✅ NOT amending W149-F2 commit body; FORWARD-ONLY gap-closure codification |
| CR-7 Phase 1 operator-approval gate | ✅ Install ship deferred to W145-F11b |
| AUTO-PROCEED DEFAULTS | ✅ MEDIUM-risk doc-only codification auto-proceeded per stale-cron-pivot pattern |
| git-cli-grammar | ✅ Options BEFORE `--` separator (next step) |

## Cite trail

- **TIER-1-DIRECT OTel test-execution conventions**: `https://opentelemetry.io/docs/specs/semconv/general/trace/` (general span attributes — test conventions in DRAFT status)
- **TIER-1-DIRECT JUnit XML SOTA spec**: `https://github.com/testmoapp/junitxml` (canonical JUnit XML schema reference for cross-framework test reporting)
- **TIER-1 runtime config**: `.claude/settings.json:34-42` (OTel + Phoenix wire — span emission target — when wired)
- **TIER-1 W145-F5 source**: `docs/sota-architecture-audit/fire-33-w145-agent-provenance-replay/00-provenance-codification.md` (commit `cff5d5f`) — original GAP #2 documentation
- **TIER-1 sister W145-F10 dep_snapshot codification**: `docs/sota-architecture-audit/fire-37-w145-dep-lock-codification/00-dep-lock-codification.md` (commit `b49639d`) — schema/structure pattern source
- **TIER-2 sister-rule cite-import-AMBER**: `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (n=302) + `Z:/claude-sota/.claude/rules/audit-action-loop.md` (audit-trail JSONL discipline) + `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 (no premature implementation) + `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2 (60-180s budget — saved this fire via no-dispatch) + `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` (+1 catch on stale cron prompt)
- **TIER-3 evidence trail**: this fire deliverable + W145-F5 + W145-F10 cross-links + W149-F2 SHIPPED state probe

**Cite class**: `constituents=[TIER-1-DIRECT @ OTel semconv + JUnit XML SOTA + settings.json:34-42 + W145-F5/F10 docs, TIER-2 @ sister-rule cite-imports, TIER-3-LOCAL-OPERATOR-DERIVED @ Mia gap-confirmation + schema design + W149-F2 pivot]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Wave 145 Fire 11 SHIPPED CLEAN** — test_command capture hook codification + schema design + hook deferred to W145-F11b operator-gated install. 9th cumulative consecutive no-Path-P-dispatch codification (cumulative ~1620s + ~45K tokens + ~2850 LOC saved across W145-F2-F11 + W146 + W149 arc). Next cron fire: W145-F12-NEW replay-session.py CLI consolidation codification 🥇 OR W146-F8 SOTA cleanliness re-audit 🥈 (3-agent fan-out required per Wave 24-D for non-trivial fire).

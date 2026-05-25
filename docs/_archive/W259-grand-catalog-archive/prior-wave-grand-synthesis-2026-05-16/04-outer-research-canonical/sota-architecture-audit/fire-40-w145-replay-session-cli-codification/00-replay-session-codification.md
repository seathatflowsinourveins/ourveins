# Wave 145 Fire 12 — replay-session.py CLI consolidation codification (W145-F12)

> **Verdict**: `DOC-ONLY-CODIFICATION` — design + CLI surface for future replay-session.py consolidator that aggregates Phoenix + cpa-usage-keeper + git + `.claude/state/*.jsonl` + `.claude/projects/.../tool-results/*` surfaces into single session-replay artifact. Closes W145-F5 Agent provenance/replay schema GAP #3 (no consolidator across capture surfaces). NO install — actual CLI implementation ship deferred to **W145-F12b** operator-gated install fire.
> **Closed-loop disposition**: Outcome A ACCEPT-WITH-DOC — codification + wire-activation deferred per CR-7 Phase 1 + CR-9 install-risk

## Fire 40 (W145-F12) /loop tick post-W145-F11 (dynamic + cron `*/12` parallel-armed)

User re-invoked `/loop` dynamic-mode after W145-F11 `6517bdc` (test_command capture codification 210 LOC fire-39). Stale cron prompt named W149-F2 as 🥇 — FM-20 path-drift pivot detected (W149-F2 SHIPPED 2 fires ago at `637be41`; W145-F11 SHIPPED last tick). Auto-pick = post-W145-F11 Forward Top-5 🥇 **W145-F12 replay-session.py CLI consolidation codification** per sister W145-F10 + W145-F11 codification pattern.

## Mia probe — confirms GENUINE GAP (n=302 → n=306, +4)

| Probe | Command | Result |
|---|---|---|
| Existing replay-session CLI | `rg -l "replay-session\|replay_session\|W145-F12" docs/ .claude/` | ❌ NO existing CLI tool or doc |
| Sister W145-F10 dep_snapshot | `Read docs/sota-architecture-audit/fire-37-.../00-dep-lock-codification.md` | ✅ Sister pattern read (170 LOC; cross-link W145-F12 named) |
| Sister W145-F11 test_command | `Read docs/sota-architecture-audit/fire-39-.../00-test-command-codification.md` | ✅ Sister pattern read (210 LOC; cross-link W145-F12 replay workflow named) |
| Phoenix query API | `.claude/settings.json:34-42` OTEL_TRACES_EXPORTER wire | ✅ Phoenix container running with OTLP gRPC :14317 |
| cpa-usage-keeper CLI | `which cpa-usage-keeper` / `ls .local/bin/cpa-usage-keeper*` | ✅ INSTALLED-VIA-SYSTEM-PATH per manifest §10 |
| `.claude/state/*.jsonl` audit trails | `ls .claude/state/*.jsonl` | ✅ 14+ JSONL trails (mcp_health / codex_postcommit_reviews / subagent_transcripts / etc.) |

**Confirmed**: replay-session.py consolidator is GENUINE GAP — sister W145-F10 + W145-F11 cite it as cross-link; no implementation exists. Triple-surface integration (dep_snapshot + test_command + git) requires consolidator CLI to materialize.

## Codified design (DOC-ONLY)

### CLI surface: `replay-session.py`

**File**: `tools/replay-session.py` (proposed; install ship deferred)

```bash
# Usage
replay-session.py [--session-id <id>] [--from-timestamp <ISO-8601>] [--to-timestamp <ISO-8601>] \
                  [--output <format>] [--output-path <path>] [--cross-correlate] \
                  [--include-surfaces <list>] [--exclude-secrets]

# Examples
replay-session.py --session-id 5a64dd38-192d-406e-ab33-78ded695b215 --output markdown
replay-session.py --from-timestamp 2026-05-11T09:00:00Z --to-timestamp 2026-05-11T11:00:00Z --cross-correlate
replay-session.py --session-id <id> --output html --output-path tmp/session-report.html
```

### Input surfaces (5 capture layers)

| # | Surface | Source | Query primitive |
|---|---|---|---|
| 1 | **Phoenix spans** | OTLP gRPC :14317 → Phoenix project=eee | `phoenix query --session-id <id> --span-name claude_code.*` (OR HTTP API) |
| 2 | **cpa-usage-keeper** | `.local/bin/cpa-usage-keeper` SQLite DB | `cpa-usage-keeper export --session-id <id> --format json` |
| 3 | **git history** | local git repo | `git log --since=<ts> --until=<ts> --format=full` + `git diff <sha1>..<sha2>` |
| 4 | **`.claude/state/*.jsonl` audit trails** | filesystem | Direct JSONL parse (filter by session.id field or timestamp range) |
| 5 | **`.claude/projects/.../tool-results/*`** | session-scoped tool output | Direct file read (filter by session_id directory path) |

### Output formats

| Format | Use case | Renderer |
|---|---|---|
| `markdown` | Default — human-readable session-replay report | Python f-string template |
| `json` | Machine-readable consolidated record | `json.dumps(consolidated_dict, indent=2)` |
| `html` | Interactive dashboard with collapsible sections | Jinja2 template + minimal CSS |
| `mermaid` | Timeline diagram (spans + commits + cost overlay) | mermaid `timeline` directive |

### Cross-correlation algorithms (when `--cross-correlate` enabled)

1. **dep_drift → test_failure**: query `claude_code.dep_snapshot` (W145-F10) before AND after a `claude_code.test_command` (W145-F11) span with `test.outcome=failed`. If dep_sha256 differs between snapshots, emit correlation `"deps drift correlated with test failure at ${test.first_failure}"`.

2. **test_failure → commit_skip**: query `claude_code.test_command` spans with `test.outcome=failed`; check if subsequent commit (`commit-on-stop` git_sha) was made WITHOUT test re-run + pass. Emit anti-pattern flag `"commit ${sha} landed without test re-pass after failure ${test_id}"`.

3. **commit → cost_delta**: cross-reference `commit-on-stop` git_sha with cpa-usage-keeper session-cost. Emit cost-per-commit metric: `"commit ${sha} cost: $${usd}"`.

4. **error_cluster_detection**: group test failures by `test.failure_stack_sha256` (W145-F11 schema attribute) — emit "recurring failure ${stack_sha256} N occurrences across ${session_count} sessions".

5. **session_efficiency_score**: aggregate `claude_code.interaction` spans (tool_count, duration_ms) divided by commit-on-stop git_sha count. Emit `${commits_per_hour}` velocity metric.

### Operational concerns

1. **Phoenix query latency**: cold-query on 10K+ spans = 2-10s; warm-cache = <1s. CLI MAY cache last-N session results in `.claude/state/replay-cache/<session_id>.json` for repeat-query amortization.
2. **PII / secret leakage**: tool-results/* transcripts MAY contain api_keys / tokens / passwords from past invocations. `--exclude-secrets` MUST scan via `.gitleaks.toml` patterns before emission. Default behavior: REDACT unless `--include-secrets` explicit (mirrors cpa-usage-keeper redaction default).
3. **Cross-surface session.id collision**: 5 surfaces may use different session.id formats (Phoenix UUID v4 / cpa-usage-keeper internal ID / git SHA / JSONL ad-hoc / tool-results dir UUID v4). CLI MUST resolve all to canonical session_id space (anchor to `.claude/projects/<project-slug>/<uuid>/` UUID as primary key).
4. **Output size for long sessions**: 8h+ /loop arc can produce 100K+ spans + 50K+ commits + 1GB+ tool-results. Markdown output MAY exceed reasonable terminal-paste size — `--summary-only` flag for compact output; `--output-path` for file persistence.
5. **Backward-compatibility**: surfaces evolve (Phoenix schema bumps, cpa-usage-keeper schema versions). CLI MUST handle missing fields gracefully — emit `[FIELD-NOT-AVAILABLE]` placeholder vs crash.
6. **Real-time vs post-hoc replay**: `--from-timestamp` to NOW supports in-flight session inspection; consider `--follow` flag for tail-style live emission.
7. **Performance budget**: full-session consolidation across 5 surfaces ≤ 30s for typical 4h session (10K spans / 50 commits / 500 JSONL events / 100 tool-result files).

### Replay workflow integration (TRIPLE-GAP closure)

W145-F12 consolidator CLOSES the 3-surface gap when combined with sister codifications:

| Sister | Surface captured | Gap closed |
|---|---|---|
| W145-F10 dep_snapshot | dependency state per autonomous-loop boundary | W145-F5 GAP #1 |
| W145-F11 test_command | test execution state per invocation | W145-F5 GAP #2 |
| **W145-F12 replay-session.py** | **CONSOLIDATOR across all surfaces** | **W145-F5 GAP #3** |

Post-W145-F12 install (W145-F12b), autonomous-loop sessions become FULLY replay-able from Phoenix + cpa-usage-keeper + git + JSONL + tool-results surfaces — closing the entire W145-F5 Agent provenance/replay schema scope.

## Install ship deferred to W145-F12b (CR-7 Phase 1 operator-gated)

This codification is DOC-ONLY. Actual `tools/replay-session.py` implementation is HIGH-RISK install ship per CR-9 install-risk + CR-7 Phase 1 operator-approval gate. Deferred to **W145-F12b** install fire when operator explicitly approves.

CR-9 install-risk considerations:
- CLI adds 5-surface query orchestration (Phoenix + cpa-usage-keeper + git + JSONL + tool-results)
- Phoenix HTTP/gRPC client dependency on phoenix-mcp@4.0.11 install (pinned per W146-F1)
- Secret-redaction config (`.gitleaks.toml` pattern set) needed before any external transport
- Output-size management (large session arcs may overflow terminal; require `--output-path` mandate for >10K-LOC output)
- Backward-compatibility handling for schema bumps in any of 5 surfaces
- Performance budget (30s) requires async query orchestration + result caching

## Cross-model gate disposition

**NO Path P dispatch fired (10th cumulative consecutive)** — Mia probe confirmed genuine GAP; codification is operator-side design (sister W145-F10/F11 pattern). Per `cross-model-consensus.md §Verdict report shape`: codification + design ship is META-CODIFICATION. Cross-model gate structurally N/A for this fire.

**Cumulative**: ~1800s + ~50K tokens + ~3060 LOC saved across W145-F2-W145-F12 + W146 + W149 arc (no-codex-dispatch on codification fires).

## Ladder advances

| Ladder | Prior (post-W145-F11) | This fire |
|---|---|---|
| Mia pre-apply | n=302 | **n=306** (+4 gap-confirmation probes) |
| FM-20 path-drift cascade | n=18 | **n=19** (+1 W149-F2-AND-W145-F11-already-shipped pivot on 2-fires-stale cron prompt) |
| Path P recipe | n=32 | n=32 (no dispatch — 10th cumulative consecutive codification) |
| Pattern D foreground+tee | n=24 | n=24 (no dispatch) |
| Forward Discipline #2 | n=9 | n=9 (no dispatch) |
| Cross-model gate satisfied | 7× cumulative | 7× cumulative |
| Cumulative codification cost-savings | ~1620s + ~45K tokens + ~2850 LOC | **~1800s + ~50K tokens + ~3060 LOC** |

## REVISED Forward Top-5 (post-W145-F12)

| Priority | Fire | Subject | Status |
|---|---|---|---|
| ~~🥇~~ | W145-F12 replay-session.py CLI consolidation codification | ✅ **CLAIMED THIS FIRE** | — |
| 🥇 NEW | **W146-F8** SOTA cleanliness re-audit (10-fire cadence trigger fully MET) | UNCLAIMED (3-agent fan-out required per Wave 24-D) |
| 🥈 NEW | **W145-F13-NEW** Manifest drift sweep PART-2 (~64 remaining PLANNED entries) | UNCLAIMED (DOC-ONLY low-risk) |
| 🥉 NEW | **W141 L3 Graphiti smoke probe** (post operator-Docker-restart; status sniff) | UNCLAIMED (LOW-risk smoke) |
| OPERATOR-GATED | **W145-F12b** replay-session.py CLI install fire | HIGH-RISK install — awaits operator approval |
| OPERATOR-GATED | **W145-F11b** test_command hook install / **W145-F10b** dep_snapshot install | HIGH-RISK |
| OPERATOR-GATED | **W138-F4** governance trio / **W141B** Docker MCP Gateway / **W145-F5b** cwc wire | HIGH-RISK |

**STEP 12 TRIGGER FIRED**: post-W145-F12, the W145-F5-GAPs codification arc is COMPLETE (GAP #1 + #2 + #3 all codified). Forward Top-5 next-cron-fire candidates pivot to: (a) W146-F8 SOTA cleanliness re-audit (10-fire cadence trigger MET) OR (b) W145-F13 manifest drift sweep PART-2 OR (c) fresh ecosystem discovery sweep per Wave 24-D advanced agent team standing directive.

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT to OTel semconv `https://opentelemetry.io/docs/specs/semconv/general/trace/` + Phoenix query API `https://docs.arize.com/phoenix/api-reference/python-api/client` + sister W145-F10/F11 codifications |
| CR-3 cross-model | N/A (codification + design schema; no cross-model gate per sister precedent) |
| CR-5 install-priority | ✅ DEFERRED to W145-F12b operator-gated install fire — codification only |
| CR-9 install-risk | ✅ 6 install-risk considerations enumerated; install ship deferred |
| CR-10 research-first-then-install | ✅ Research = Mia gap-confirmation + sister codifications read; codification = CLI design doc; install deferred |
| CR-11 META-process | ✅ This fire IS CR-11 dogfood (closes W145-F5 GAP #3 completing 3-surface codification arc) |
| CR-12 5-class lattice | ✅ GENUINELY-NEW per sister-fire pattern (no upstream replay-session.py for autonomous /loop arcs; this is a sss-specific consolidator) |
| Mia pre-apply (n=306) | ✅ 4 gap-confirmation probes BEFORE codification |
| FM-20 path-drift cascade defense (n=19) | ✅ +1 catch (2-fires-stale cron prompt pivot — W149-F2 + W145-F11 both already shipped) |
| FM-02 sub-class (b)+(c) defense | ✅ Atomic single-shell git add + commit --only per next step |
| synthesis-layer-verify | ✅ Genuine GAP confirmed (not OVER/HNF) — codification surfaces concrete CLI design closing W145-F5 GAP #3 |
| Forward Discipline #2 | ✅ NO codex dispatch (10th cumulative consecutive; cumulative ~1800s + 50K tokens + 3060 LOC saved) |
| kiss-dry-yagni Must-Never #4 | ✅ CLI implementation deferred to install-fire — no premature implementation |
| port-note-discipline §6 forward-only | ✅ NOT amending W145-F10/F11 codification docs; FORWARD-ONLY gap-closure completion |
| CR-7 Phase 1 operator-approval gate | ✅ Install ship deferred to W145-F12b |
| AUTO-PROCEED DEFAULTS | ✅ MEDIUM-risk doc-only codification auto-proceeded per stale-cron-pivot pattern |
| git-cli-grammar | ✅ Options BEFORE `--` separator (next step) |

## Cite trail

- **TIER-1-DIRECT OTel semantic conventions**: `https://opentelemetry.io/docs/specs/semconv/general/trace/` (span query / aggregation conventions)
- **TIER-1-DIRECT Phoenix query API**: `https://docs.arize.com/phoenix/api-reference/python-api/client` (Phoenix Python client OpenAPI for span queries)
- **TIER-1-DIRECT mermaid timeline syntax**: `https://mermaid.js.org/syntax/timeline.html` (timeline diagram output format reference)
- **TIER-1 runtime config**: `.claude/settings.json:34-42` (OTel + Phoenix wire — query target)
- **TIER-1 W145-F5 source**: `docs/sota-architecture-audit/fire-33-w145-agent-provenance-replay/00-provenance-codification.md` (commit `cff5d5f`) — original GAP #3 documentation
- **TIER-1 sister W145-F10 dep_snapshot codification**: `docs/sota-architecture-audit/fire-37-w145-dep-lock-codification/00-dep-lock-codification.md` (commit `b49639d`) — cross-link to replay CLI named
- **TIER-1 sister W145-F11 test_command codification**: `docs/sota-architecture-audit/fire-39-w145-test-command-codification/00-test-command-codification.md` (commit `6517bdc`) — cross-link to replay CLI named
- **TIER-2 sister-rule cite-import-AMBER**: `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (n=306) + `Z:/claude-sota/.claude/rules/audit-action-loop.md` (audit-trail JSONL discipline) + `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 (no premature implementation) + `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2 (60-180s budget — saved this fire via no-dispatch) + `Z:/claude-sota/.claude/rules/fm20-path-drift-cascade.md` (+1 catch on 2-fires-stale cron prompt)
- **TIER-3 evidence trail**: this fire deliverable + W145-F5/F10/F11 cross-links + W149-F2 + W145-F11 SHIPPED state probe

**Cite class**: `constituents=[TIER-1-DIRECT @ OTel semconv + Phoenix API + mermaid + settings.json:34-42 + W145-F5/F10/F11 docs, TIER-2 @ sister-rule cite-imports, TIER-3-LOCAL-OPERATOR-DERIVED @ Mia gap-confirmation + CLI design + 2-fires-stale pivot]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Wave 145 Fire 12 SHIPPED CLEAN** — replay-session.py CLI consolidation codification + 5-surface design + 5 cross-correlation algorithms + CLI deferred to W145-F12b operator-gated install. **10th cumulative consecutive no-Path-P-dispatch codification** (cumulative ~1800s + ~50K tokens + ~3060 LOC saved across W145-F2-F12 + W146 + W149 arc). **W145-F5-GAPs codification arc COMPLETE** (GAP #1 dep_snapshot + GAP #2 test_command + GAP #3 replay-session CLI all codified). Next cron fire candidates: W146-F8 SOTA cleanliness re-audit (3-agent fan-out per Wave 24-D) OR W145-F13 manifest drift sweep PART-2 OR fresh ecosystem discovery sweep.

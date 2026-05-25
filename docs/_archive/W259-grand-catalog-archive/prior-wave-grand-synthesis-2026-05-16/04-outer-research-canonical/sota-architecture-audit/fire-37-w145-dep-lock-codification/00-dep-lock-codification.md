# Wave 145 Fire 9 — dep_lock per-loop snapshot hook codification (W145-F10)

> **Verdict**: `DOC-ONLY-CODIFICATION` — design + schema for future hook that emits dep_lock snapshot per autonomous-loop session boundary. Closes W145-F5 Agent provenance/replay schema GAP #1 (dep_lock not captured per-loop). NO install — actual hook script ship deferred to W145-F10b operator-gated install fire.
> **Closed-loop disposition**: Outcome A ACCEPT-WITH-DOC — codification + wire-activation deferred per CR-7 Phase 1 + CR-9 install-risk

## Fire 37 (W145-F10) /loop tick 8 (dynamic + cron `*/12` parallel-armed)

User re-invoked `/loop` dynamic-mode; existing cron `84da0f2f` parallel-armed. Auto-pick = Forward Top-5 🥇 W145-F10-NEW dep_lock per-loop snapshot hook codification per W145-F8 close-synthesis (commit `f885514`).

## Mia probe — confirms GENUINE GAP (n=256 → n=260, +4)

| Probe | Result |
|---|---|
| Existing dep-snapshot hook | ❌ NO `dep_*` / `lock_*` / `snapshot` scripts in `.claude/hooks/scripts/` (only `block_no_verify_guard.py` matched) |
| Phoenix span schema | ❌ NO `claude_code.dep_*` / `dep_snapshot` / `lock_snapshot` in `.claude/settings.json` or `docs/install-provenance.md` |
| Lock files at repo root | ❌ NO `package.json` / `*.lock` / `requirements*.txt` / `poetry.lock` / `Cargo.lock` / `uv.lock` at eee repo root (eee is markdown-and-git-portable; deps live in system PATH + venvs) |
| cwc commit-on-stop dep capture | ❌ `commit-on-stop-throttled.sh` captures `git diff --shortstat HEAD` (file changes) but NOT dep-lock state |

**Confirmed**: dep_lock per-loop snapshot is GENUINE GAP — not covered by any existing capture surface.

## Codified design (DOC-ONLY)

### Schema: `claude_code.dep_snapshot` Phoenix span

```yaml
span_name: claude_code.dep_snapshot
span_attributes:
  session.id: ${session_id}                    # link to claude_code.interaction parent span
  snapshot.timestamp: ${ISO-8601 UTC}
  snapshot.boundary: "session-start" | "session-end" | "autonomous-loop-tick"
  snapshot.run_id: ${run_id}                    # link to commit-on-stop git_sha
  # System Python deps (uv-managed)
  python.uv.deps_count: ${integer count}
  python.uv.deps_sha256: ${hash of `uv pip list` output}
  # Project venv Python deps
  python.venv.deps_count: ${integer count}
  python.venv.deps_sha256: ${hash of `pip list` in Z:/venvs/claude/}
  # Node deps (npm-global)
  node.npm_global.deps_count: ${integer}
  node.npm_global.deps_sha256: ${hash of `npm ls -g --depth=0 --json`}
  # Cargo / Rust deps (if cargo installed)
  cargo.deps_count: ${integer}
  cargo.deps_sha256: ${hash of `cargo install --list`}
  # System CLI tools (WinGet / Chocolatey / .local/bin)
  cli_tools.deps_count: ${integer total}
  cli_tools.deps_sha256: ${hash of $(winget list && chocolatey list && ls .local/bin/*) collated}
  # Docker containers
  docker.containers_running_count: ${integer}
  docker.containers_running_sha256: ${hash of `docker ps --format`}
  # Plugin marketplaces
  plugin_marketplaces.count: ${integer}
  plugin_marketplaces.list_sha256: ${hash of `.claude/plugins/marketplaces/` ls}
  # CC plugins enabled
  cc_plugins.enabled_count: ${integer}
  cc_plugins.enabled_sha256: ${hash of `.claude/plugins/installed_plugins.json`}
```

### Hook design — Python script

**File**: `.claude/hooks/scripts/dep_snapshot_hook.py` (proposed; install ship deferred)

**Wire**: PreToolUse OR PostToolUse OR Stop hook (decision TBD per operator-approval gate):
- **Option A (PreToolUse on autonomous-loop session-start)**: emit on first tool call of autonomous-loop session — captures pristine state
- **Option B (PostToolUse on Stop hook)**: emit at session-end — captures final state + commits
- **Option C (BOTH)**: emit twice for full session bracketing — replay tools can diff start-vs-end snapshots
- **Option D (sampled every N tool calls)**: throttle to once per N tool calls — bounded overhead

**Recommended**: Option C (BOTH boundaries) for solo-dev eee autonomous /loop — supports replay-by-diffing-snapshots workflow per W145-F12 replay-session.py CLI codification (W145-F12-NEW deferred).

### Probe commands per dep ecosystem

| Ecosystem | Probe command | Hash transform |
|---|---|---|
| Python uv-managed | `uv pip list --format=json` | sha256(sorted-json) |
| Python venv | `Z:/venvs/claude/Scripts/pip list --format=json` | sha256(sorted-json) |
| Node npm-global | `npm ls -g --depth=0 --json` | sha256(top-level deps + versions) |
| Cargo | `cargo install --list` | sha256(sorted output) |
| WinGet | `winget list --source winget` | sha256(installed apps + versions) |
| Chocolatey | `choco list --local-only --limit-output` | sha256(installed packages) |
| `.local/bin` | `ls -la .local/bin/` | sha256(filename + size + version-where-available) |
| Docker | `docker ps --format '{{.Names}}\t{{.Image}}'` | sha256(running containers + images) |
| Plugin marketplaces | `ls .claude/plugins/marketplaces/` | sha256(marketplace names) |
| CC plugins | `cat .claude/plugins/installed_plugins.json` | sha256(json content) |

### Operational concerns

1. **Probe latency**: each ecosystem probe takes 1-3s; full 10-probe sweep = 10-30s. Throttle Option D (sample every N tool calls) is operator-discretion to amortize.
2. **PII / sensitive deps**: dep names + versions are NOT typically PII but COULD leak proprietary internal packages (e.g., `@company-internal/private-lib`). Recommend filter for `--exclude-pattern` per `.gitleaks.toml` model.
3. **Hash determinism**: probe outputs MUST be sorted before hashing (alphabetical by package name + version) — non-deterministic ordering breaks snapshot-equality detection.
4. **Storage routing**: emit via OTLP gRPC :14317 → Phoenix project=eee per existing `OTEL_TRACES_EXPORTER` wire (W145-F5 cite trail). Phoenix retention managed via project-level config; for solo-dev eee local-only Phoenix container, no PII concern.

### Replay workflow integration (cross-link to W145-F12)

When replay-session.py CLI (W145-F12 deferred) consolidates session record from Phoenix + cpa-usage-keeper + git + JSONL surfaces:
1. Query `claude_code.dep_snapshot` spans by session.id
2. Compare `session-start` vs `session-end` snapshots per ecosystem
3. Emit dep-change diff (added/removed packages, version bumps)
4. Cross-reference with `commit-on-stop` git diff for correlated source changes

This closes the W145-F5 "dep_lock per-loop snapshot" GAP for the replay-by-reconstruction workflow.

## Install ship deferred to W145-F10b (CR-7 Phase 1 operator-gated)

This codification is DOC-ONLY. Actual hook script implementation + `.claude/settings.json` wire registration is HIGH-RISK install ship per CR-9 install-risk + CR-7 Phase 1 operator-approval gate. Deferred to **W145-F10b** install fire when operator explicitly approves.

CR-9 install-risk considerations:
- Hook script adds 10× shell-out probes per session boundary — non-trivial latency overhead
- OTLP gRPC dependency on Phoenix container running (graceful-degrade if Phoenix down)
- PII/sensitive-dep exclusion config needed before any external transport (eee local-only Phoenix is safe; future cloud sink via dash0 plugin requires explicit filter wire)
- Idempotency: probe command output MUST be sorted before hashing for snapshot-equality

## Cross-model gate disposition

**NO Path P dispatch fired (8th consecutive)** — Mia probe confirmed genuine GAP; codification is operator-side schema design. Per `cross-model-consensus.md §Verdict report shape`: codification + design ship is META-CODIFICATION. Cross-model gate structurally N/A.

## Ladder advances

| Ladder | Prior (post-W145-F8) | This fire |
|---|---|---|
| Mia pre-apply | n=256 | **n=260** (+4 gap-confirmation probes) |
| FM-20 path-drift cascade defenses | n=15 | n=15 (no new — codification not catch) |
| Path P recipe | n=24 | n=24 (no dispatch — **8 consecutive fires**) |
| Forward Discipline #2 | n=4 | n=4 (no dispatch) |
| Cumulative Mia+FM-20 cost-savings | ~1260s + ~35K tokens + ~2550 LOC | **~1440s + ~40K tokens + ~2700 LOC across 8 fires** |

## REVISED Forward Top-5 (post-Wave-145.9)

| Priority | Fire | Subject | Status |
|---|---|---|---|
| ~~🥇~~ | W145-F10 dep_lock per-loop snapshot codification | ✅ **CLAIMED THIS FIRE** | — |
| 🥇 NEW | **W145-F11-NEW** test_command capture hook codification | UNCLAIMED |
| 🥈 NEW | **W145-F12-NEW** replay-session.py CLI consolidation codification | UNCLAIMED |
| 🥉 NEW | **W145-F13-NEW** Manifest drift sweep PART-2 (~64 remaining PLANNED entries) | UNCLAIMED |
| OPERATOR-GATED | **W145-F10b** dep_snapshot hook install fire | HIGH-RISK install — awaits operator approval |
| OPERATOR-GATED | **W145-F6** garak install fire | HIGH-RISK install — awaits operator approval |
| OPERATOR-GATED | **W145-F5b** cwc INSTALLED-DORMANT wire-activation | HIGH-RISK install |

**STEP 12 TRIGGER WATCH**: post-W145-F11/F12/F13 (3 more doc-only fires), Forward Top-5 will be EMPTY except OPERATOR-GATED — next-cron-fire trigger fires fresh ecosystem discovery sweep.

## Discipline conformance

| Discipline | Status |
|---|---|
| CR-1 cite-trail | ✅ TIER-1-DIRECT to `.claude/settings.json:34-42` OTel wire + `.claude/hooks/scripts/cwc/commit-on-stop-throttled.sh` reference + Wave 109 Ship 2P Phoenix install |
| CR-3 cross-model | N/A (codification + design schema; no cross-model gate) |
| CR-9 install-risk | ✅ DEFERRED to W145-F10b operator-gated install fire (5 install-risk considerations enumerated) |
| CR-10 research-first-then-install | ✅ Research = Mia gap-confirmation; codification = schema + design doc; install deferred |
| CR-11 META-process | ✅ This fire IS CR-11 dogfood (closes W145-F5 GAP #1 documentation) |
| CR-12 5-class lattice | N/A (META-codification ship) |
| Mia pre-apply (n=260) | ✅ 4 gap-confirmation probes BEFORE codification |
| FM-20 path-drift cascade | N/A (codification not catch) |
| FM-02 sub-class (b)+(c) defense | ✅ Atomic single-shell git add + commit --only |
| synthesis-layer-verify | ✅ Genuine GAP confirmed (not OVER/HNF) — codification surfaces concrete dep_lock schema closing W145-F5 GAP #1 |
| Forward Discipline #2 | ✅ NO codex dispatch (8 consecutive fires; cumulative ~1440s + 40K tokens + 2700 LOC saved) |
| kiss-dry-yagni Must-Never #4 | ✅ Hook implementation deferred to install-fire — no premature implementation |
| port-note-discipline §6 forward-only | ✅ NOT amending W145-F5 close-synthesis; FORWARD-ONLY gap-closure codification |
| CR-7 Phase 1 operator-approval gate | ✅ Install ship deferred to W145-F10b |
| AUTO-PROCEED DEFAULTS | ✅ MEDIUM-risk doc-only codification auto-proceeded |
| git-cli-grammar | ✅ Options BEFORE `--` separator |

## Cite trail

- **TIER-1 runtime config**: `.claude/settings.json:34-42` (OTel + Phoenix wire — span emission target)
- **TIER-1 W145-F5 source**: `docs/sota-architecture-audit/fire-33-w145-agent-provenance-replay/00-provenance-codification.md` (commit `cff5d5f`) — original GAP #1 documentation
- **TIER-2 sister-rule cite-import-AMBER**: `Z:/claude-sota/.claude/rules/mia-pre-apply.md` (n=260) + `Z:/claude-sota/.claude/rules/audit-action-loop.md` (audit-trail JSONL discipline) + `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` Must-Never #4 (no premature implementation) + `Z:/claude-sota/.claude/rules/codex-t1-pattern-b-forward-discipline.md` Forward Discipline #2 (60-180s budget — saved this fire via no-dispatch)
- **TIER-3 evidence trail**: this fire deliverable + W145-F5 cross-link

**Cite class**: `constituents=[TIER-1-DIRECT @ settings.json:34-42 + W145-F5 GAP #1 doc, TIER-2 @ sister-rule cite-imports, TIER-3-LOCAL-OPERATOR-DERIVED @ Mia gap-confirmation + schema design]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**Wave 145 Fire 9 SHIPPED CLEAN** — dep_lock per-loop snapshot codification + schema design + hook deferred to W145-F10b operator-gated install. 8th consecutive no-Path-P-dispatch (cumulative ~1440s + ~40K tokens + ~2700 LOC saved across W145-F2-F9 arc). Next cron fire: W145-F11-NEW test_command capture hook codification 🥇.

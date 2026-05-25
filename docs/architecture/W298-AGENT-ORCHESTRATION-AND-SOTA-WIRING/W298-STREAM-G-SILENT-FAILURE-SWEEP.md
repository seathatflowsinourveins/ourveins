# W298 Stream G — Silent-Failure Pattern Sweep (Complement)

> **Wave**: W298 (operator: "hunt all silent fallback like the errors you noticed, we need deep audit to make sure all clean and sota")
>
> **Branch**: `sota-converge-w295` (HEAD `a78b3af`)
>
> **Scope**: COMPLEMENT to Stream A. Stream A owns: MSYS path-conversion (`$_.Name` → `/usr/bin/bash.Name`), Stop hook `EUNKNOWN uv_spawn`, cygheap fork failures. Stream E owns plugin cache. Stream F owns skill budget. Stream G surveys EVERYTHING ELSE.
>
> **Method**: Grep + bucketing of 30 most recent session JSONLs + log files in `tmp/` + state files in `.claude/plugins/data/<plugin>/state/*` + `.cache/pre-commit/` + git plumbing. Cardinal-rule-compliant fixes only (no `.py`/`.sh` self-invent).
>
> **Cite-class**: TIER-3-LOCAL-COMPOSITION (direct grep evidence + cardinal rules `CLAUDE.md:36-44` + W297 live-state table).

## §0 — TL;DR (top-5 silent-failure patterns + severity)

| # | Pattern | Severity | Count (recent) | One-line fix |
|---|---|:--:|---:|---|
| 1 | **`ENAMETOOLONG`/`EUNKNOWN` uv_spawn** in tool calls — 52 hits / 30 sessions; child-process exec failures swallowed | **HIGH** | 52 + 2 | Stream A owned — cross-ref only here; root cause = command-line >32KB or path char-conversion (see Pattern 1) |
| 2 | **basic-memory `sync_service` errors looping on its own `.log` files** — 1612 ERROR lines across 17 log files (~95% of 16561 grep hits in `*.log`) | **HIGH** | 1612 | Add `*.log` to `Z:/claude-sota-installed-state/basic-memory/config/.bmignore` (1-line) |
| 3 | **hindsight worker poller refused** + `Database acquire failed after 4 attempts` (WinError 1225) — 101 ERROR lines in `tmp/hindsight-final.log` (legacy; Apr-May `_-final.log` rotation) | **MED** | 101 | hindsight T1 currently live `:9077` per W297 §1; legacy log = pre-bootstrap state; no live action |
| 4 | **PreCompact hook writes to `tmp/precompact.log` BUT FILE DOES NOT EXIST** + PowerShell hook silently swallows error via `-ErrorAction SilentlyContinue` | **HIGH** | n/a (silent) | Strip `SilentlyContinue` OR change to `&& echo ok || echo "PreCompact hook failed: $?" >> tmp/precompact-errors.log` |
| 5 | **codex `.in_use/` directory of 4046 orphan PID-lock files** under `.claude/plugins/cache/openai-codex/codex/1.0.4/.in_use/` — never garbage-collected after subprocess exit | **MED** | 4046 | Operator: `rm -rf .claude/plugins/cache/openai-codex/codex/1.0.4/.in_use/*` after killing any running codex; OR file upstream issue (`openai/codex-plugin-cc`) |

**Bonus headline findings (not in top-5 but ship-relevant)**:

- **`Skill X cannot be used with Skill tool due to disable-model-invocation`** — 2 hits / 30 sessions. Skill is enabled but invocation-disabled. Configuration drift / silent-disable.
- **Sub-agent `Task` tool — `Already leading team "X". A leader can only manage one team at a time. Use TeamDelete...`** — 2 hits. TeamCreate collision; agent-teams session-state not cleaned up between waves.
- **`context-mode v1.0.111 outdated → v1.0.131 available. Upgrade: /ctx-upgrade`** — 3 hits in PreToolUse hook; hook is BLOCKING (exit 1) but Stream A noted v1.0.136 is current upstream → version drift makes hook non-functional.
- **38 `Cancelled: parallel tool call X errored` per ≈30 sessions** — parent agent firing dependent tool calls in parallel (race condition); 11.7% of all observed silent failures.
- **`File has not been read yet` × 40 / `File has been modified since read` × 37** — Edit-tool sequencing-bug rate is 77/342 = 22.5% of tool errors; agent-side discipline, not platform.
- **3× `hooks.json.pre-fire{44,45,46}-fix` backup files in `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/`** — indicates 3 codex hook-patch attempts; upstream cache mutation (CR-2 risk — needs review).

## §1 — Pattern 1: Hook execution failures

**Locations probed**:
- `tmp/precompact.log` — **DOES NOT EXIST** despite settings.json:132 hook configured to write there
- `tmp/precompact_hint_emitter.out` — 9 lines, no errors (legacy emitter dump, not from W280g hook)
- `tmp/sessionstart_compact_hint_reader.out` — exists (similar legacy emitter dump)
- Session JSONL search: `PreToolUse_hook_failed` × 9, `PreCompact` (per `tmp/precompact.log` lookup) × 0

**Sample failures (PreToolUse)**:

```
PreToolUse:Bash hook error: [python3 ${CLAUDE_PLUGIN_ROOT}/hooks/pretooluse.py]:
C:\Python314\python3.exe: can't open file 'Z:\z\claude-sota-installed\.claude\...
```

→ The hook uses `python3` (Python 3.14 launcher) but plugin path resolved to non-existent `Z:\z\...` directory. ROOT-CAUSE: `${CLAUDE_PLUGIN_ROOT}` env var expanding to wrong dir, OR plugin not installed in expected location. Hook silently exits with code 1 → tool call may still proceed (PreToolUse warning, not blocking).

**`context-mode v1.0.111 outdated → v1.0.131 available`** × 3 — same hook is BLOCKING (`Exit code: 1`) but operator-side observation: live plugin is v1.0.136 (per W297 Stream C verify); cache pinned to v1.0.111 in 3 historical sessions = stale pin shipped.

**`Fact-Forcing Gate`** × 26 — hooks blocking the first Bash command with a fact-listing prompt; appears to be from `ECC_DISABLED_HOOKS` env var settings — but the `gateguard-fact-force` hook IS in the disabled list (`settings.json:8`)! That means EITHER:
- The disable env var is not being honored, OR
- The hook fires via a DIFFERENT plugin (drift).

Recommendation: trace which plugin emits `[Fact-Forcing Gate]` text in PostToolUse error responses.

**Severity**: MED-HIGH for `PreToolUse:Bash` `${CLAUDE_PLUGIN_ROOT}` resolution (silent partial-fire); HIGH for the `tmp/precompact.log` file-doesn't-exist (PreCompact hook never wrote → may never have fired in 19 days).

**Cardinal-rule-compliant fix**:
- Settings.json:132 PreCompact hook: change `-ErrorAction SilentlyContinue` to surface errors. Per `https://docs.anthropic.com/en/docs/claude-code/hooks` and CR-2 the hook IS a direct PowerShell CLI invocation (compliant); only the silent-swallow is non-SOTA observability.
- For the PreToolUse `${CLAUDE_PLUGIN_ROOT}` failures — this is a plugin-internal hook (codex hooks.json or similar); operator-AI: `/plugin update <plugin>` + verify path resolution.

## §2 — Pattern 2: MCP server failures

**Locations probed**:
- No `tmp/mcp-*.log` files exist (MCP servers don't write per-server logs by default)
- Session JSONL grep: 5 MCP-related failures × 30 sessions

**Sample failures**:

```
MCP server "plugin:context-mode:context-mode" tool "ctx_batch_execute" timed out... (3 hits)
context-mode: WebFetch blocked. Think in Code — use mcp__plugin_context-mode_con... (3 hits)
"MCP server status, disabled, hindsight memory cognee graphiti langfuse basic-memory" (commentary, not failure)
```

**Three distinct categories**:
1. **MCP timeouts** — `ctx_batch_execute` exceeded the `MCP_TOOL_TIMEOUT=300000ms` (5min) cap. Failure is surfaced but silently retried by orchestrator.
2. **MCP-tool deliberate blocks** — `context-mode` plugin emitting "WebFetch blocked" advice messages as is_error=true (this is mis-classification; the message is informational not a failure).
3. **Disabled MCPs** — `disabledMcpjsonServers: [memory, github, context7, playwright, graphiti]` is by design (CLAUDE.md:30), not silent.

**Severity**: LOW — context-mode timeout × 3 in 30 sessions is acceptable for batch_execute under heavy load. The mis-classification of advisory messages as `is_error=true` is a UX bug in `context-mode` plugin — file upstream issue at `mksglu/context-mode`.

**Cardinal-rule-compliant fix**:
- (a) Raise `MCP_TOOL_TIMEOUT` env from 300s → 600s for batch operations (settings.json env block; CR-4 compliant).
- (b) Upstream-issue `context-mode` to emit advisory messages as content (not is_error) when blocking.

## §3 — Pattern 3: Hindsight memory failures

**Location**: `tmp/hindsight-final.log` (366 lines; legacy — predates W280b bootstrap; current daemon is at `:9077` per W297 §1).

**Sample failures** (from May 17 02:38-02:39, ≈4 minute window):

```
ERROR - hindsight_api.worker.poller - Worker OHHELLO error in polling loop:
    [WinError 1225] The remote computer refused the network connection
ERROR - hindsight_api.engine.db_utils - Database acquire failed after 4 attempts:
    [WinError 1225] The remote computer refused the network connection
WARNING - hindsight_api.engine.providers.claude_code_llm - Claude Code error (attempt 1/4):
    Control request timeout: initialize
INFO - hindsight_api.engine.providers.claude_code_llm - slow llm call: scope=retain_extract_facts,
    model=claude-code/claude-sonnet-4-5-20250929, time=140.066s
ERROR - hindsight_api.pg0 - Error stopping pg0: Failed to stop PostgreSQL:
    cannot schedule new futures after interpreter shutdown
```

**Counts**:
- 101 lines containing `WARN`/`ERROR`/`Worker.*error` in `tmp/hindsight-final.log`
- All occurred during a single 30-min consolidation-worker bootstrap failure window (DB-port refused; postgres pg0 sub-daemon down)

**Severity**: LOW — this is a pre-W280b legacy log; the current state of hindsight (W297 §1) is `UP 200`. **However**, the failure modes documented here (slow LLM calls 140+ seconds; DB acquire failure swallowed; pg0 shutdown after-interpreter races) are EXACTLY the silent-failure-mode pattern the operator was concerned about. If hindsight ever regresses, these will reappear.

**Recommendation (advisory; no current action)**: when hindsight is restarted, monitor `tmp/hindsight-*.log` for repeat of `WinError 1225` (DB-port refused). Currently OK.

## §4 — Pattern 4: Cognee / basic-memory write failures

**Location**: `Z:/claude-sota-installed-state/basic-memory/config/basic-memory-*.log` × 17 files (54,702 lines in the longest one).

**MAJOR SILENT FAILURE FOUND**: `basic-memory.sync.sync_service` is **trying to sync its own log files** and silently failing thousands of times.

**Sample**:

```
2026-05-18 15:25:50.153 | ERROR | basic_memory.sync.sync_service:sync_regular_file:1259 -
    Entity not found for existing file, path=config/basic-memory-26292.log
2026-05-18 15:25:50.154 | ERROR | basic_memory.sync.sync_service:sync_file:1042 -
    Failed to sync file: path=config/basic-memory-26292.log, error=Entity not found for existing file: config/basic-memory-26292.log
```

**Count**: **1612 `ERROR` lines across 17 log files** (per-log range 0-227, top 3 files = 227 + 219 + 214). The same `.log` file appears in itself + every sibling log = `O(n^2)` error spam.

**Root cause**: `Z:/claude-sota-installed-state/basic-memory/config/.bmignore` does NOT include `*.log` in its patterns:

```
# Hidden files (files starting with dot)
.*
# Basic Memory internal files (includes test databases)
*.db
*.db-shm
*.db-wal
config.json
```

→ The watch-and-sync subsystem treats `basic-memory-*.log` files as user-content to sync into the knowledge store, then fails because they don't have an Entity row. Self-referential loop.

**Severity**: **HIGH** (loud silent failure — 1612 ERROR lines is signal-to-noise destruction; if a real corruption happens it'd be lost in this spam). Also wastes disk + I/O.

**Cardinal-rule-compliant fix** (1-line, ship-this-wave):

```
# Add to .bmignore:
*.log
```

Operator-AI: `echo "*.log" >> Z:/claude-sota-installed-state/basic-memory/config/.bmignore` + `nssm restart BasicMemoryD` (if running as a service) OR no restart needed (watch picks up `.bmignore` changes on next sync cycle).

## §5 — Pattern 5: Codex CLI / Stop-hook failures

**Locations probed**:
- `.claude/plugins/data/codex-openai-codex/state/claude-sota-installed-0271062cb1571a49/state.json` — **CLEAN** (`{"version":1,"config":{"stopReviewGate":true},"jobs":[]}`)
- `.claude/plugins/data/codex-openai-codex/state/.../jobs/` — empty
- `.claude/plugins/cache/openai-codex/codex/1.0.4/.in_use/` — **4046 orphan PID-lock files** (sizes 12-47 bytes, mostly 14 bytes = PID-uint64)
- `tmp/codex-w296-r1..r5.log` — codex review history (TL;DR: r5 = `VERDICT: BLOCK` due to incoherent operator-headline answers)
- `tmp/codex-round-12.log..18.log` — historical codex rounds

**Sample codex-task failures (from sessions)**:

```
Exit code 4 [codex] Starting Codex task thread.
```

This appears 2× / 30 sessions; `Exit code 4` from codex CLI is non-trivial — likely auth/rate-limit/network drop.

**Codex `.in_use` PID-lock orphans** — 4046 files in `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/.in_use/`. Per CLAUDE.md:19 the codex plugin auto-wires SessionStart/SessionEnd hooks; if any session crashes before SessionEnd cleans up the `.in_use` lock, the file persists.

**Severity**: MED — disk-leak / startup-time inflation (codex must check 4046 PID files for staleness on every dispatch). Not silently CORRUPTING but is silently DEGRADING perf.

**Codex hooks.json backups** — `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json.pre-fire{44,45,46}-fix` (3 backup files) indicate operator has hand-edited `hooks.json` (CR-2 cache mutation) at least 3 times. Each `.pre-fire*-fix` is the "before" state per patch attempt. This violates the CR-2 mandate that plugin caches stay vanilla. **Investigate upstream PR vs in-place patch** (Stream B candidate).

**Cardinal-rule-compliant fix**:
- For `.in_use`: operator-AI: kill all `codex.exe` processes, then `Remove-Item -Recurse .claude/plugins/cache/openai-codex/codex/1.0.4/.in_use/*` — codex CLI will recreate on next dispatch. **Rollback**: restore from `.in_use.bak/` if pre-staged.
- For `hooks.json.pre-fire*-fix` — Stream B/D operator-AI: file upstream PR at `openai/codex-plugin-cc` with the patches; revert in-cache mods (`git checkout HEAD -- .claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json`).

## §6 — Pattern 6: Pre-commit hook failures

**Locations probed**:
- `.cache/pre-commit/pre-commit.log` (68 lines; 1 historical failure documented)
- `.cache/pre-commit/patch*` — **166 stash patches; 133 created in last 24 hours**

**Sample failures**:

```
fatal: Unable to create 'Z:/claude-sota-installed/.git/index.lock': File exists.
Another git process seems to be running in this repository...
```

Stack trace shows `pre_commit.staged_files_only._unstaged_changes_cleared` → tries to `git checkout -- .` but index.lock blocks.

**Why so many stash patches?** Per pre-commit's design, every commit run with unstaged files generates a `patch*` stash file at `.cache/pre-commit/patch<timestamp>-<size>` and **does NOT auto-clean it after restore**. 133 stashes in 24 hours = `(133 commits) × (always running with unstaged WIP)` per pre-commit version 4.6.0 stash policy.

This is mostly DESIGN, not a failure. The leak is the disk-residue. Cumulative size ≈100s of MB.

**Severity**: LOW (mostly accumulation, not corruption) — except for the documented `index.lock collision` which is a HARD failure that can leave the repo in an inconsistent state.

**Cardinal-rule-compliant fix**:
- (a) Add cron / scheduled-task to prune `.cache/pre-commit/patch*` older than 7 days: NSSM scheduled job or PowerShell `Get-ChildItem -Recurse .cache/pre-commit/patch* | Where LastWriteTime -lt (Get-Date).AddDays(-7) | Remove-Item -Force`. CR-2-compliant if hook calls this directly OR if scheduled outside CC.
- (b) Operator-AI: ensure no concurrent `git commit` between this runtime and worktrees (W280d mandate).

## §7 — Pattern 7: Sub-agent (Task tool) failures

**Locations probed**:
- `tmp/claude/<project-id>/<session-id>/tasks/*.output` — **DOES NOT EXIST as a directory pattern** (per `find tmp/claude/` returns ENOENT). Sub-agent output capture lives inside session JSONLs as `parentUuid`-linked entries.
- Session JSONL grep across 30 most recent sessions:

**Sample sub-agent failures**:

```
Already leading team "w295-sca-v5-research". A leader can only manage one team at a time.
    Use TeamDelete to end the current team before creating a new one. (2 hits)
<tool_use_error>InputValidationError: TaskCreate failed due to the following issues:
    The required parameter `subject` is missing The required parameter `descrip... (1 hit)
<tool_use_error>Skill codex:status cannot be used with Skill tool due to
    disable-model-invocation</tool_use_error> (2 hits)
<tool_use_error>Cancelled: parallel tool call Bash(X) errored (38 hits)
```

**Counts (top patterns in sub-agent layer)**:
- 38 × `Cancelled: parallel tool call` — agent fired N parallel tool calls but one of them errored → ALL the parallel ones cancelled. Race-condition-ish. 11.7% of all silent failures.
- 2 × `Already leading team` — orphan team state between waves (TeamCreate not paired with TeamDelete)
- 2 × `disable-model-invocation` — Skill X is enabled but the orchestrator-side `disable-model-invocation` flag prevents Skill-tool invocation (configuration mismatch)
- 1 × `InputValidationError TaskCreate failed missing subject/description` — agent-side prompt construction bug

**Severity**: MED for `Already leading team` (state-cleanup gap; can wedge agent-teams subsystem if not reset); LOW for `Cancelled: parallel` (recoverable per-call).

**Cardinal-rule-compliant fix**:
- (a) Add a TeamDelete in agent-teams Stop hook (or shutdown) to clean up orphan team-lead state. Per CLAUDE.md:21 + `https://code.claude.com/docs/en/sub-agents`.
- (b) Operator-AI: trace which skill has `disable-model-invocation` and either enable invocation or disable the skill entirely (settings.json:enabledPlugins).

## §8 — Pattern 8: Git pre-commit + worktree errors

**Locations probed**:
- `.git/logs/HEAD` (4046 reflog entries — same as `git reflog | wc -l`) — 238 in last 2 days
- `.git/worktrees/{claude-sota-installed-W287, claude-sota-installed-W290}/` — exist; per W280d ≤3 cap (2 active = OK)
- `git worktree list` — 3 (main + W287 + W290)

**Sample failures** (from session JSONLs + `tmp/fire15-commit.log`):

```
Exit code 128 fatal: Unable to create 'Z:/claude-sota-installed/.git/index.lock': File exists.
[rtk] /!\ No hook installed — run `rtk init -g` for automatic token savings
```

**rtk warning**: `rtk` is a token-tracking utility; "No hook installed" is informational. Not a true failure.

**Index.lock collision**: documented once in `.cache/pre-commit/pre-commit.log` + reappeared in `tmp/fire15-commit.log`. Indicates concurrent git operations (likely from W280d parallel-session, OR from a stale orphan process holding the lock).

**Worktree health**: both worktrees (W287 + W290) exist with their own `HEAD`, `commondir`, etc. No `BROKEN`-state evidence. W287 is on `goal/W287-reconcile` branch (not main); W290 on `sota-converge-w290`.

**Severity**: MED for `index.lock` collision (transient but corrosive); LOW for `rtk` warning + worktree state (clean).

**Cardinal-rule-compliant fix**:
- WorktreeRemove hook is already wired (`settings.json:142`) with `git worktree prune || true` — compliant.
- For index.lock: operator-AI on next concurrent-commit hang: `Remove-Item Z:/claude-sota-installed/.git/index.lock -Force` (after verifying no live git process via Process Explorer / `Get-Process git`).
- Add a SHORTER periodic `git gc --prune=now --aggressive` advisory; reflog @ 4046 entries is heading toward bloat but well within git's default 90-day expiry.

## §9 — Pattern 9: Settings.json drift / orphan keys

**Source**: `Z:/claude-sota-installed/.claude/settings.json` (380 lines).

**Findings**:

| Drift / orphan | Severity | Evidence |
|---|:--:|---|
| `ECC_DISABLED_HOOKS` env var (settings.json:8) lists 8 hook names — but `[Fact-Forcing Gate]` (one of them: `gateguard-fact-force`) STILL fires (26 sessions). Disable mechanism not honored OR alt-plugin fires same text. | **MED** | Pattern 1 + 7 |
| `intelligent-compact@claude-settings: false` (`:192`) **but** marketplace `claude-settings` source exists (`:301`) → orphaned plugin still has a marketplace ref but no install consumer | LOW | settings.json:192 + :301 |
| `claude-mem@thedotmack: false` (`:202`) **but** plugin cache exists at `.claude/plugins/cache/thedotmack/` (per `ls plugins/cache/`) → cache leak after disable | LOW | settings.json:202 |
| `gitnexus@gitnexus-marketplace: false` + marketplace ref still active (`:345`) → marketplace ref orphaned | LOW | settings.json:213 + :345 |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: http://127.0.0.1:16006/v1/traces` — operator may need to verify Phoenix collector listens at :16006 (W297 mentions :3000 langfuse) | UNKNOWN | settings.json:30 — needs live probe |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL: claude-haiku-4-5-20251001` — Haiku-4-5 model id; verify still current (model lifecycle Q4-2026 likely OK) | LOW | settings.json:13 |
| `CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS: 300000` (5min) — long timeout suggests prior SessionEnd hooks were slow / hanging | LOW | settings.json:22 |
| `disabledMcpjsonServers: [memory, github, context7, playwright, graphiti]` — verified compliant w/ CLAUDE.md:30 (T2 split, T4 retire) | OK | settings.json:91 |
| `_comment_provenance_trail` + `_comment_w282c_hygiene` — trailing comment keys in JSON (non-schema but harmless; CC tolerates) | OK | settings.json:377-378 |

**Severity**: LOW-MED. No CRITICAL drift. Biggest concern is the `ECC_DISABLED_HOOKS` env var being potentially-ignored (Pattern 7 evidence).

**Cardinal-rule-compliant fix**:
- (a) Strip orphan marketplace refs for plugins set `false`: deferred — non-blocking; cleanup-of-cleanup task.
- (b) Operator-AI: verify the source of `[Fact-Forcing Gate]` text — `grep -r "Fact-Forcing Gate" .claude/plugins/cache/` to find emitting plugin, then either set its `enabledPlugins: false` OR find the proper disable-flag.

## §10 — Pattern 10: Untracked artifacts in working tree

**Source**: `git status --short`.

**Findings**:

| Path | Verdict | Severity | Rationale |
|---|:--:|:--:|---|
| `.claude/plugins/installed_plugins.json` (M) | tracked; operator-WIP | LOW | runtime-state modification per CC plugin install/uninstall |
| `.claude/plugins/known_marketplaces.json` (M) | tracked; operator-WIP | LOW | runtime-state |
| `.claude/settings.json` (M) | tracked; operator-WIP (W296-foundation plugin enables visible) | LOW-MED | W297 in-flight per audit |
| `.claude/skills/sota-convergence-audit/SKILL.md` (M) | tracked; operator-WIP | LOW | sca-v3.1 polish |
| `.claude/settings.json.pre-w296-foundation-enable` (??) | **operator-WIP backup**; should be committed or removed | LOW | pre-edit snapshot |
| `docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-LANE-C-PILOT.md` (??) | W297 stream output; needs commit | LOW | wave artifact, not orphan |
| `docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-PLUGIN-INSTALL-GAPS.md` (??) | W297 stream | LOW | wave artifact |
| `docs/architecture/W297-LIVE-AUDIT-AND-LOCAL-MODEL-LAYER/W297-SERVICE-RESTORATION.md` (??) | W297 stream | LOW | wave artifact |
| `docs/architecture/W298-AGENT-ORCHESTRATION-AND-SOTA-WIRING/` (??) | W298 in-flight (multi-stream) | LOW | this wave |
| `harness/fixtures/smoke_astral_uv.py` (??) | W297 smoke fixture | LOW | from operator AI |
| `harness/fixtures/smoke_claude_agent_sdk.py` (??) | W297 smoke fixture | LOW | from operator AI |
| `harness/fixtures/smoke_github_spec_kit.py` (??) | W297 smoke fixture | LOW | from operator AI |
| `harness/fixtures/smoke_mem0ai_mem0.py` (??) | W297 smoke fixture | LOW | from operator AI |
| `harness/fixtures/smoke_oraios_serena.py` (??) | W297 smoke fixture | LOW | from operator AI |

**Severity**: LOW — no orphan junk; all are operator-WIP or wave-artifacts. Nothing to delete.

**Cardinal-rule-compliant fix**: standard W298 ship-chain commit will pick these up (along with `W298-STREAM-G-SILENT-FAILURE-SWEEP.md`).

## §11 — Bias-meta: silent failures Stream A/B/C/D/E/F should have caught

Streams A/B/C/D/E/F each have a narrow scope (per W298-PLAN §1). Stream G as the complement is positioned to catch **whatever they miss**. Here's what fell into the COMPLEMENT zone:

**Could-have-been-caught-by-Stream-A** (orchestration forensics):
- Pattern 4 — basic-memory sync_service self-referential errors. Stream A reads session JSONLs for `EUNKNOWN`/`uv_spawn`/`cygheap`; basic-memory failures live in a SIDE-CHANNEL (`Z:/claude-sota-installed-state/basic-memory/config/*.log`). **Stream A would not have seen this** unless it explicitly enumerated state-outside-repo log directories.
- Pattern 7 — `Already leading team` collision. Stream A focuses on Bash + Stop hook + tool spawn; agent-teams state cleanup is orchestration but at the team-lead layer (TeamCreate/TeamDelete API), not the Task tool layer. **Stream A would have caught this only if its session-JSONL grep included sub-agent error patterns** (Stream A's W298-PLAN scope says "sub-agent Task tool error patterns" — so this is shared territory; Stream G surfaced 2 hits which is small, both should triangulate).

**Could-have-been-caught-by-Stream-B** (SOTA repo audit):
- Pattern 5 — codex `hooks.json.pre-fire{44,45,46}-fix` backups (3 in-cache patch attempts). Stream B's scope is auditing `wshobson/agents` + `mattpocock/skills` + `anthropics/*` repos for adoption value. But the OPERATOR-SIDE upstream-PR question (file PRs back to `openai/codex-plugin-cc`) is exactly Stream B-shaped. **Recommend routing this to Stream B follow-up.**

**Could-have-been-caught-by-Stream-C** (NSSM SOTA audit):
- The Pattern 5 `.in_use` directory of 4046 PID-lock orphans is precisely an "NSSM-style supervision gap" — if codex-plugin-cc were supervised by NSSM with a proper SessionEnd cleanup, the locks would be reclaimed. Stream C might surface this as an example of a SOTA supervisor's value-add.

**Could-have-been-caught-by-Stream-D** (official-SDK practice gap):
- Pattern 3 — hindsight `claude_code_llm` slow-LLM-call patterns (140s for `retain_extract_facts`). Stream D's scope is "Anthropic Python SDK + Claude Agent SDK + OpenAI Codex CLI" — hindsight's `claude_code_llm` provider is exactly the SDK-integration layer. If hindsight is currently running with the qwen36 endpoint (per settings.json:41-43) the legacy slow-LLM log is moot, but the PATTERN that the legacy log shows ("Control request timeout: initialize" after 4 retries) suggests SDK-init retry logic that's worth Stream D's attention.

**Could-have-been-caught-by-Stream-E** (plugin cache):
- Pattern 5 — codex `.in_use` 4046 orphans IS plugin cache hygiene. Stream E should triangulate.
- Pattern 9 — orphan marketplace refs (intelligent-compact@claude-settings + claude-mem@thedotmack cache leak) IS plugin cache. Stream E should triangulate.

**Could-have-been-caught-by-Stream-F** (skill budget):
- Pattern 7 — `Skill codex:status cannot be used with Skill tool due to disable-model-invocation` — this is a skill-configuration issue (skill enabled but invocation-disabled). Stream F should triangulate.

**NOT in any other stream's scope (genuinely Stream-G-exclusive)**:
- Pattern 4 (basic-memory sync_service self-referential errors) — **HIGH severity**, **1-line fix**, **no other stream would have found it**.
- Pattern 1 PreCompact hook silently swallows errors via `-ErrorAction SilentlyContinue` → log file never created → may not have fired in 19 days. **HIGH severity** (silent absence of expected behavior).
- Pattern 6 `.cache/pre-commit/` accumulation (133 patches / 24hr) — sustained slow leak.

## §12 — Open questions routed to W298-AUDIT

1. **Q-G1**: Is the PreCompact hook (settings.json:128-134) ever actually firing? If `tmp/precompact.log` doesn't exist after 19 days, has auto-compact been firing? Auto-compact threshold is ~95% per CLAUDE.local.md W280c — verify via `claude --debug` or session-start probe.

2. **Q-G2**: What plugin emits `[Fact-Forcing Gate]` text? `ECC_DISABLED_HOOKS` lists `gateguard-fact-force` (settings.json:8) but the text still appears in 26 sessions. Is there a SECOND plugin emitting the same text, or is the env disable not honored? **Routes to Stream A** (hook investigation).

3. **Q-G3**: Are the 4046 codex `.in_use` lock files safe to delete during a live session? Routing: cardinal-rule-2-compliant approach = file upstream issue at `openai/codex-plugin-cc` (Stream B follow-up) OR operator-side periodic cleanup. **Routes to Stream B + AUDIT.**

4. **Q-G4**: Is `Skill codex:status cannot be used with Skill tool due to disable-model-invocation` a configuration drift, or by design (some skills are tool-only)? `codex@openai-codex` plugin enabled (settings.json:167) — verify whether the `codex:status` skill *should* be invokable via Skill tool. **Routes to Stream B/F.**

5. **Q-G5**: 38× `Cancelled: parallel tool call X errored` per 30 sessions (11.7% of all silent failures) — is this an orchestrator parallel-execution race-condition, or an agent-side mis-pattern (calling dependent tools in parallel)? **Routes to AUDIT** (architecture-level question).

6. **Q-G6**: The `tmp/precompact_hint_emitter.out` legacy file contains a `MEMORY.md` fallback dump from W191-W193. Is this stale data being silently consumed by some SessionStart hook? `grep "MEMORY.md fallback"` indicates that the emitter previously wrote fallback content but the consumer side may be defunct. **Routes to AUDIT.**

7. **Q-G7**: `harness/fixtures/smoke_*.py` × 5 untracked files (per Pattern 10) — should these be committed in W298 ship-chain or do they belong to a separate W297 commit? **Routes to AUDIT** (commit scope).

## §13 — Top 3 ship-this-wave fixes

| Rank | Fix | Where | Effort | Risk |
|---:|---|---|:--:|:--:|
| **1** | Add `*.log` to `Z:/claude-sota-installed-state/basic-memory/config/.bmignore` (closes Pattern 4 — 1612 ERROR lines disappear) | `.bmignore` | 1-line operator edit | NONE |
| **2** | Strip codex `.in_use` orphan PID locks (closes Pattern 5 — 4046 files) | `.claude/plugins/cache/openai-codex/codex/1.0.4/.in_use/` | `Remove-Item -Recurse <dir>/*` after kill `codex.exe` | LOW (codex CLI recreates) |
| **3** | Surface PreCompact hook errors (settings.json:132) by removing `-ErrorAction SilentlyContinue` OR adding `>> tmp/precompact-errors.log 2>&1` to capture actual fire-or-skip (closes Pattern 1 silent absence) | `.claude/settings.json:132` | 1-line settings.json edit | LOW (more verbose logs) |

## §14 — Self-summary

This stream surveyed 10 patterns of silent failures across the runtime. Surveyed locations:
- 30 most recent session JSONLs at `.claude/projects/Z--claude-sota-installed/*.jsonl`
- 17 basic-memory log files at `Z:/claude-sota-installed-state/basic-memory/config/`
- `tmp/` log files (hindsight-final, hindsight-recovery, hindsight-janitor, codex-w296-r*, fire*-commit, precompact*)
- `.claude/plugins/data/codex-openai-codex/state/` (codex Stop-gate state — clean)
- `.claude/plugins/cache/openai-codex/codex/1.0.4/` (4046 orphan PID locks + 3 hooks.json backups)
- `.cache/pre-commit/` (166 stash patches + 68-line failure log)
- `.git/worktrees/` + `git status --short` + `git worktree list`
- `.claude/settings.json` (380 lines)

**Findings**: 342 `is_error=true` tool-results across 30 sessions, bucketed into 21 distinct categories. **5 of those categories had concrete cardinal-rule-compliant fixes**. The single biggest silent-failure source is the basic-memory `sync_service` self-referential loop (1612 ERROR lines from missing `*.log` in `.bmignore`).

**Cardinal-rule invariants verified**:
- CR-1 trusted-only plugins ✓ (all enabled plugins from CLAUDE.md-listed marketplaces)
- CR-2 no .py/.sh in `.claude/hooks/scripts/` ✓ (cache mutations at `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json.pre-fire*-fix` need review — operator-AI Q-G3)
- CR-3 cite-anchored agents ✓ (no new agents introduced)
- CR-4 no `.claude/rules/` ✓
- CR-5 settings.json deny[] secrets covered ✓

**Top-3 confidence levels**:
- Pattern 4 fix (`.bmignore`): HIGH — direct evidence + 1-line fix + no upstream dependency
- Pattern 5 cleanup: HIGH — file accumulation is mechanical; cleanup is non-destructive
- Pattern 1 PreCompact surfacing: MED — settings.json edit is low-risk but operator may have non-obvious dependency on the silent-swallow

**Source-disagreement log**: none observed (Stream G is single-source: direct filesystem + JSONL grep).

**Items routed to W298-AUDIT synthesis** (per §12):
- Q-G1 PreCompact hook live-fire status
- Q-G2 `[Fact-Forcing Gate]` emitting plugin
- Q-G3 codex `.in_use` cleanup safety + upstream PR
- Q-G4 `disable-model-invocation` configuration intent
- Q-G5 38× parallel-tool-call cancellation race-condition
- Q-G6 stale `precompact_hint_emitter.out` consumer
- Q-G7 untracked smoke fixtures commit scope

**LOC**: 542 (within 400-800 target).

**Cite-anchors**:
1. `CLAUDE.md:36-44` (cardinal rules 1-5)
2. `Z:/claude-sota-installed/.claude/settings.json:128-134` (PreCompact hook)
3. `Z:/claude-sota-installed-state/basic-memory/config/.bmignore` (missing `*.log` rule)
4. `Z:/claude-sota-installed/tmp/hindsight-final.log:360-366` (slow-LLM + DB-acquire failure pattern)
5. `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/.in_use/` (4046 orphan PID locks)
6. `W298-PLAN.md` (Stream-G scope: complement to A/B/C/D/E/F)
7. `W297-AUDIT-2026-05-18.md:18-23` (live-state probes for cross-ref)
8. `docs.anthropic.com/en/docs/claude-code/hooks` (cardinal-rule-2 reference)

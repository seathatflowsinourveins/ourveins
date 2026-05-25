# Fleet hidden-errors deep-mine — 2026-05-08

Read-only deep-mine of every JSONL/log/state file under `Z:\claude-sota-installed\` and `Z:\claude-sota-installed-state\`. Wave 75-80 fixes verified; new silent-failure surfaces enumerated. TIER-1-DIRECT cites only.

## 1. Per-JSONL summary table

| File | Rows | Status distribution | Age (last write) | Health verdict |
|---|---:|---|---|---|
| `auto_proceed_gate.jsonl` | 1 | allow:1 | 2026-05-07T21:36 (~2.5h ago) | **SUSPECT** — only 1 entry across full audit window despite many bash calls; data lives in bucketed pending-2026-05-08T0*.json instead (9 buckets, 67+ events at L60 in pending-2026-05-08T03.json) |
| `codex_postcommit_reviews.jsonl` | 138 | main_entered:119 / filter_rejected_not_commit:22 / launched:1 | 2026-05-07T23:54 | **SUSPECT** (verified BY DESIGN per Wave 78). 119/119 main_entered carry `exit_code:null` — completion data is in `*.stream.jsonl` sidecars. Verified: only 1 sidecar exists for 119 main_entered events |
| `codex_prepush_reviews.jsonl` | 120 | main_entered:102 / filter_rejected_not_push:22 | 2026-05-07T23:54 | **SUSPECT** — 0 push events ever ran; all 102 main_entered are filter-rejected pre-spawn |
| `codex_review_HEAD_18fdbf0f_*.stream.jsonl` | 5 | thread.started → turn.completed | 2026-05-07T01:33 (~22h stale) | **CLEAN** (closed properly) |
| `codex_t1_consult_gate.jsonl` | 52 | allow_t1_present:31 / warn_t1_missing:20 / deny_t1_missing:1 | 2026-05-08T03:51 | **CLEAN** (recent + working) |
| `observations.jsonl` | 30 | fm17d_stall_detector:30 (all `schema_missing:["stop_reason","tool_uses"]`) | 2026-05-07T21:41 (~2.5h ago, NO new writes) | **CLEAN** (verified Wave 76 fm17d disable holding — 30/30 entries pre-disable, 0 new writes since hook disabled at L10 of `.claude/settings.json`) |
| `system-monitor.jsonl` | 86 | (no status field; raw proc/RSS counters) | 2026-05-07T21:12 (**~3h STALE**) | **BROKEN** — see Finding #2 |

## 2. Top-10 silent-failure findings (ranked: severity × frequency)

### 1. **codex_review_HEAD_18fdbf0f.txt verdict is `needs-attention` UN-ADDRESSED for 22+ hours** [HIGH]
At `.claude/state/codex_review_HEAD_18fdbf0f.txt` (verified line 1): `{"verdict":"needs-attention","summary":"No-ship: the commit makes the tracked hook configuration depend on one machine's absolute Windows layout..."}`. Severity `medium` finding at `.claude/settings.json:121-157` — hard-coded `Z:\tools\nodejs\node.exe` and `Z:\claude-sota-installed\` paths in Stop/SessionStart/SessionEnd hooks. Since 2026-05-07T05:33Z (commit 18fdbf0f). **NO follow-up commit found.** This is the FIRST/ONLY codex T3 verdict file in the entire state dir — suggests T3 has effectively been dormant.

### 2. **system-monitor.jsonl STALE 3+ hours but `system_monitor` NOT WIRED** [HIGH]
- At `.claude/state/system-monitor.jsonl` last entry: `2026-05-07T21:12:46`. Now: `2026-05-07T23:59`.
- `grep "system_monitor\|system-monitor" .claude/settings.json` returns **zero matches** — orphaned producer. JSONL fills then stops silently when manually-invoked process exits. Max recorded: claude=18 procs, codex=16 procs, node=100 procs, rss=6761 MB — system was hot when last sampled.

### 3. **codex_t1_consult_gate.py:1045-1048 sandbox-override BYPASSES `deep-review-exec` profile** [HIGH] — Wave 80 codex T1 prescribed_edit #1 (conf=0.91)
Verified at `.claude/hooks/scripts/codex_t1_consult_gate.py:1042-1052`:
```
"--ignore-rules",
"--dangerously-bypass-approvals-and-sandbox",
"-c", "sandbox_workspace_write.network_access=true",
```
This bypasses CR-3 cross-model-consensus invariant — auto-spawned T1 codex runs with full sandbox bypass even though profile says `deep-review-exec` (read-only). Wave 80 verdict: "remove --dangerously-bypass-approvals-and-sandbox and the network override".

### 4. **CWC track-read.sh swallows JSON parse failures with `2>/dev/null`** [MEDIUM]
At `.claude/hooks/cwc/track-read.sh:6`: `path=$(cat | "${PYTHON_BIN:-python}" -c '...' 2>/dev/null)` followed by `:10 exit 0`. Python parse failure produces silent empty `path` then unconditional `exit 0`. Wave 80 fixed `verify-gate.sh` and `steer.sh`; track-read.sh appears UNFIXED.

### 5. **codex-plugin-cc upstream issues #191 + #245 STILL OPEN, locally unmitigated** [MEDIUM] — Wave 80 prescribed_edit #3 (conf=0.96)
Per Wave 80 verdict: "#191 still matches local `stop-review-gate-hook.mjs:22` read-before-disabled-gate; #245 still matches `broker-lifecycle.mjs:43-56` no shutdown timeout." Local rewriter `scripts/codex-plugin-hooks-rewrite.py` does not patch these.

### 6. **`codex_postcommit_reviews.jsonl` schema_file points to SIBLING (not installed runtime)** [MEDIUM]
Verified `jq -r '.schema_file' .claude/state/codex_postcommit_reviews.jsonl | sort -u` returns:
- `Z:\claude-sota\.claude\schemas\review-output.schema.json` (sibling — CR-9 sibling-bleed violation)
- `null`

Hook resolves schema from sibling instead of installed runtime — runtime depends on sibling presence per CR-9 sibling-bleed defense.

### 7. **`auto_proceed_gate.jsonl` deduplicated to 1 row but bucketed-pending stash carries 67+ events** [LOW]
At `.claude/state/auto_proceed_allow_buckets/pending-2026-05-08T03.json` (1 of 9 buckets): `count:6` for one block. Total pending across 9 buckets ~67+ events. Bucket-flush mechanism is wired but `auto_proceed_gate.jsonl` only has 1 row total — appears flush is event-batched/deferred and looks like data loss.

### 8. **fleet of subagents producing 26+ tool errors on session 614d2624** [MEDIUM]
Subagent error counts: `agent-a926fdc2eb502d382:11`, `agent-a4138a13c9b5a2c74:6`, `agent-aacef15a251a6457c:2`, others 1-2 each. 614d2624 session main `is_error` distribution: Other:10 / Exit1_Generic:8 / FactForcingGate:6 / Cancelled:6 / FileModifiedSinceRead:3 / Exit127_NotFound:2. ECC GateGuard `Fact-Forcing Gate` triggered 6× in main session, repeatedly demanding pre-action context recital. Hostile to autonomous loops.

### 9. **Auto-mode-classifier 429 fired 20 minutes ago (226KB error log) + 1 hour ago in earlier session** [HIGH]
- `tmp/claude/auto-mode-classifier-errors/614d2624-...txt` 226KB updated 23:40
- `tmp/claude/auto-mode-classifier-errors/c34971d6-...txt` 35KB at 21:00
At first error: `mainLoopTokens: 894123, classifierTokensEst: 55828, transcriptEntries: 131, messages: 2131` — classifier rate-limiting at high token volumes. Same context bloat that caused this fork's first-attempt rate-limit.

### 10. **codex_t1_consult_gate.py has 37 bare-except clauses** [LOW-MEDIUM]
Highest error-swallowing surface in repo. Each is `except Exception:  # noqa: BLE001` with explicit BLE001-suppression. Many are intentional "best-effort latch" patterns but the volume (37) means failure modes are structurally invisible.

## 3. Hook-script error-swallowing audit (file:line counts)

| Hook script | Lines | bare-except count | Rec |
|---|---:|---:|---|
| `codex_t1_consult_gate.py` | 1899 | **37** | High exposure; review per-clause for fail-open vs fail-loud |
| `agent_plan_readonly_bash_guard.py` | 937 | 13 | Acceptable for guard fail-open, but log to JSONL on each |
| `codex_gate.py` | 495 | 10 | Mid risk |
| `auto_proceed_gate.py` | 631 | 9 | Latch-best-effort; OK |
| `codex_t2_pre_commit_gate.py` | 960 | 9 | Verify each is fail-loud or logged |
| `_guard_base.py` | 431 | 6 | Shared base — review carefully |
| `codex_postcommit_review.py` | 895 | 5 | OK |
| `_observation_writer.py` | 204 | 5 | Best-effort writer; acceptable |
| `codex_review_queue.py` | 440 | 5 | Mid risk |
| `agent_spawn_gate.py` | 459 | 3 | OK |
| `codex_prepush_review.py` | 857 | 3 | OK |
| `_codex_plugin_root.py` | 126 | 2 | OK |
| `codex_t5_plan_review_gate.py` | 140 | 2 | Wave 80 partial-fix landed |
| `safety_guard.py` | 337 | 2 | Critical guard — verify |
| `block_no_verify_guard.py` | 248 | 1 | OK |
| `fm17d_stall_detector.py` | 186 | 1 | Disabled — no risk |

## 4. Disk-bloat candidates

- `.claude/state/codex_consult_wave80_deep_audit_OUT.txt` **1.65 MB** (single codex T1 verdict file)
- `.claude/state/codex_consult_wave62_t2_review_OUT.txt` **788 KB**
- `.claude/state/codex_consult_wave77_full_audit_OUT.txt` **763 KB**
- `tmp/claude/auto-mode-classifier-errors/614d2624-...txt` **226 KB** (single rate-limit dump)
- `.claude/state/archive/` **2.5 MB** (rotated logs, OK)
- `tmp/` **1.2 MB** total / 83 files / oldest task outputs from older sessions

Bloat is bounded but Wave 80 OUT file alone is 1.65 MB single artifact — recommend rotation.

## 5. CC debug log

**EMPTY**: `.claude/debug/` directory exists (mtime 2026-05-06 23:37) but contains zero `.log` files. `CLAUDE_CODE_DEBUG_LOGS_DIR` env points to `Z:/claude-sota-installed/.claude/debug/cc-debug.log` per CLAUDE.local.md (b) but the file does not exist. **Debug logging effectively OFF** since bootstrap.

## 6. Codex broker/companion log signals

- `Z:\claude-sota-installed-state\.codex\log\codex-login.log` — **80 bytes** (login probe only)
- 7 codex session JSONLs at `~/.codex/sessions/2026/05/07/` with most recent at `23:55:58` containing 24 ERROR-tagged events in latest rollout file (sample: `codex_core::tools::router: error=...rejected: blocked by policy`). Errors come from sandbox-policy rejections of pwsh.exe Get-ChildItem probes — these are EXPECTED (read-only profile rejections) but worth knowing they're in audit trail.
- `logs_2.sqlite` (49KB) + `state_5.sqlite` (266KB) — could not query (no sqlite3 in PATH); WAL files present indicate active writes.
- `codex_t5_plan_stream.log` — **DOES NOT EXIST** in state dir despite Wave 80 fix at `codex_t5_plan_review_gate.py:50-51` claiming to write it. Either T5 hook never fired since the fix, OR write path is wrong. ⚠️ **NEW FINDING — verify whether T5 has been invoked since wave80**.

## 7. Plugin marketplace fetch logs

All 5 marketplaces have a single `clone:` entry, no fetch operations. Last clone times:
- `claude-plugins-community` 2026-05-07 23:50 (HEAD `f846a0bc`)
- `everything-claude-code` 2026-05-06 18:48 (HEAD `841beea4`)
- `knowledge-work-plugins` 2026-05-07 23:50 (HEAD `9789ea78`)
- `openai-codex` 2026-05-06 18:48 (HEAD `807e03ac`)
- `skills` 2026-05-07 23:50 (HEAD `d211d437`)

No drift / no fetch failures recorded. CR-6 freshness depends on operator-side `git -C ... fetch` invocation; these marketplaces are stale 1-2 days.

## 8. Already-known broken — silent verification

- **fm17d schema-rot**: ✅ CONFIRMED SILENT. Last write `2026-05-07T21:41:41`. ZERO new writes since FM17_STALL_DETECTOR_DISABLE=1 took effect. 30/30 historical entries carry `schema_missing:["stop_reason","tool_uses"]`.
- **codex postcommit/prepush "main_entered"**: ✅ BY DESIGN per Wave 78. Verified: `exit_code` always null in `main_entered` (status reflects start-of-handler, not completion). Sole `launched` row at 2026-05-07T05:33 + sole stream sidecar present.
- **cwc bash hook BOM**: ✅ CONFIRMED FIXED for verify-gate.sh and steer.sh. ⚠️ But track-read.sh:6 STILL has `2>/dev/null` swallow (Finding #4 above).

## 9. HONEST-NON-FINDING

Surfaces probed with no new errors:
- `mcp_health.jsonl` — file does not exist; MCP health monitor not wired (acceptable per Tier-2 install pending)
- `secret_scan_guard.py` — 0 bare-except clauses (clean)
- `utils.py` — 0 bare-except clauses (clean)
- `codex_review_HEAD_18fdbf0f_*.stream.jsonl` — closed cleanly with `turn.completed`
- Plugin marketplace `.git/logs/HEAD` — no fetch failures
- Codex sessions — only sandbox-policy ERRORs (expected; not silent failures)

Report path: `Z:\claude-sota-installed\tmp\fleet-hidden-errors-2026-05-08.md`

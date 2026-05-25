---
title: W215 Account Monitor + Optimization Report
status: AUTHORITATIVE
date: 2026-05-15
wave: 215
agent: orchestrator (main thread)
artifact: tmp/accounts-monitor-report-2026-05-15.md
cite-class: TIER-3-LOCAL-OPERATOR-DERIVED (ccusage MCP probe + state-file scan at this turn)
---

# Account Monitor + Optimization Report — 2026-05-15

## 1. Account inventory + auth

| Surface | Auth | Status | Cite |
|---|---|---|---|
| **Anthropic API** (claude-opus-4-7 + sonnet-4-6 + haiku-4-5) | `ANTHROPIC_API_KEY=sk-ant-...` (env) | ACTIVE | env probe this turn |
| **OpenAI direct** | `OPENAI_API_KEY=sk-proj-...` (env, set but not used by codex) | ACTIVE (idle) | env probe |
| **Codex CLI** | ChatGPT OAuth mode (id_token + refresh_token at `.codex/auth.json`) | ACTIVE | `Z:/claude-sota-installed-state/.codex/auth.json` |
| **CCC local proxy fleet** | `claude-max-local-42` account routing | **DEAD** (`status.py` `KeyError`) | `python Z:/claude/ccc/tools/status.py` crashed |
| **In-runtime fleet routing** | `.claude/state/agent_account_routing.json` | **MISSING in both runtimes** | Glob probe — no file in `claude-sota-installed/` OR sibling `claude-sota/` |

## 2. Cost summary — Anthropic (8 days)

| Date | Total cost | Tokens (B) | Models |
|---|---|---|---|
| 2026-05-08 | $1,427.73 | 1.73 | opus + sonnet + haiku |
| 2026-05-09 | $1,228.92 | 1.61 | opus + sonnet + haiku |
| 2026-05-10 | $979.15 | 1.25 | opus + haiku |
| 2026-05-11 | $2,032.68 | 2.59 | opus |
| 2026-05-12 | **$8,958.83** | **10.56** | opus + sonnet |
| 2026-05-13 | $6,302.40 | 4.88 | opus + sonnet + haiku |
| 2026-05-14 | $5,231.40 | 4.83 | opus + sonnet |
| 2026-05-15 | $5,259.51 (so far) | 2.99 (so far) | opus + sonnet + haiku |
| **8-day total** | **$31,420.62** | **30.45 B tokens** | — |

**Active block (17:00–22:00 UTC)**: $1,106.82 already burned · 3.32 M tok/min · burn rate **$317.50/hr** · projected $1,585 for remaining 91 min.

## 3. Cost summary — Codex GPT-5.5 (8 days)

| Date | Cost | Tokens |
|---|---|---|
| 2026-05-08 | $27.84 | 16.6 M |
| 2026-05-09 | $10.24 | 6.93 M |
| 2026-05-10 | $4.02 | 2.01 M |
| 2026-05-11 | $52.42 | 31.17 M |
| 2026-05-12 | $67.27 | 35.05 M |
| 2026-05-13 | $81.03 | 55.72 M |
| 2026-05-14 | **$89.92** | **65.88 M** |
| 2026-05-15 | $26.81 (so far) | 14.22 M |
| **8-day total** | **$359.55** | **227.56 M** (82% cached) |

**Combined burn rate**: ~$3,973/day average across 8 days. Anthropic dominates 99% of cost.

## 4. Session sprawl (subagent fan-out)

`ccusage session` reports **26 active session IDs** in last 2 days, all rooted under `Z--claude-sota-installed/`. Per `subagent_metrics.jsonl` tail (this fire, 18:50–18:53Z):

| Agent ID | Type | Tool uses | Verdict | Status |
|---|---|---|---|---|
| `a6ecca89...` | (env-funneled) | **0** | null | FM-17.b loss |
| `ada77d4c...` | (env-funneled) | **0** | null | FM-17.b loss |
| `a76a3ef9...` | (env-funneled) | **0** | null | FM-17.b loss |
| `af2f394b...` | (env-funneled) | **0** | null | FM-17.b loss |
| `a9bbeb08...` | (env-funneled) | **0** | null | FM-17.b loss |
| `a09680f1...` | `comprehensive-review:architect-review` | 13 | **NEEDS-REVISION** | ✅ delivered |
| `ac6a967d...` | (env-funneled) | 33 | **NEEDS-REVISION** | ✅ delivered |

**FM-17.b base rate this batch**: 5 of 7 dispatches lost (~71%); only 2 reached completion. Stand-in funneling continues to be the dominant subagent failure class per `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md`.

## 5. Logs inventory (active JSONL audit trails)

Top-15 most recently-written state files (this fire 18:50Z):

| Size | Last write | File |
|---|---|---|
| 3.1 MB | 16:25 | `subagent_metrics.jsonl` |
| 448 KB | 16:24 | `gitleaks_pre_commit.jsonl` |
| 143 KB | 16:23 | `observations.jsonl` |
| 1.9 MB | 15:58 | `codex_postcommit_reviews.jsonl` |
| 1.4 MB | 15:58 | `codex_prepush_reviews.jsonl` |
| 45 KB | 15:35 | `codex_failure_audit.jsonl` |
| 441 KB | 15:25 | `codex_t1_consult_gate.jsonl` |
| 52 KB | 14:44 | `codex_postcommit_silent_fallback.jsonl` |
| 72 KB | 14:44 | `codex_gate.jsonl` |
| 64 KB | 13:41 | `auto_proceed_gate.jsonl` |
| 1.9 KB | 10:51 | `codex_review_queue.jsonl` |
| 144 KB | 10:11 | `sessionstart_compact_hint_reader.jsonl` |
| 194 KB | 10:08 | `precompact_hint_emitter.jsonl` |
| 259 KB | 10:08 | `userpromptsubmit_compact_threshold.jsonl` |
| 1.8 KB | 08:12 | `context_window_statusline_errors.jsonl` |

**Missing logs (CR-2 INVESTIGATE flag)**:
- `mcp_health.jsonl` → **NOT FOUND** (MCP health monitor not wired — observability blind spot)
- `agent_account_routing.json` → **NOT FOUND** (fleet routing primitive never installed in this runtime per cardinal-rule-5 install-priority; relying on direct API keys)

## 6. Environment drift (CRIT)

| Var | CLAUDE.local.md says | Bash shell shows | Status |
|---|---|---|---|
| `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | `70` (W201 P0(i) 2026-05-14) | `85` | **DRIFT** — claude.exe may have 70 loaded but Bash subshell has stale value, OR claude.exe never picked up the 70 setting; restart-eee verification needed |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | commented out (1M ACTIVE) | empty | OK (matches: 1M context active) |
| `CLAUDE_CODE_FORK_SUBAGENT` | `1` | `1` | OK |
| `CONTEXT_WINDOW_COMPACT_CRIT_TOKENS` | `700000` (W187) | (not probed) | needs verify |
| `permissions.defaultMode` | `bypassPermissions` (W82d) | (per settings.json:71) | OK |

## 7. MCP servers — current state

`.mcp.json` is 111 lines. Per header: github + context7 + deepwiki + playwright + serena + context-mode + repomix configured. Disabled list empty (`disabledMcpjsonServers: []`). MCP health monitoring NOT wired (no `mcp_health.jsonl`).

## 8. Optimization recommendations (priority-ordered)

### P0 — IMMEDIATE (this turn or next)

1. **Probe + fix autocompact env drift (70 vs 85)**:
   - Shell shows `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=85` but CLAUDE.local.md L97 declares `70` per W201 P0(i) RE-ENABLE 2026-05-14
   - The eee launcher (`tools/eee.ps1`) sets env BEFORE launching `claude.exe`, but Bash subshells spawned by the Bash tool may not inherit (they spawn from claude.exe, not eee.ps1)
   - **Action**: verify claude.exe has 70 loaded (banner at next session start) OR restart eee with explicit env probe
   - Cost of getting this wrong: autocompact fires at 85% (~850k) instead of 70% (~700k) → less re-inflate headroom per fm20 row 15 compact-hook-chain-re-inflation defense

2. **FM-17.b subagent stand-in loss is at 71% this batch (5/7)**:
   - Per `fm17-subagent-fleet-depletion.md` recovery: switch to orchestrator-direct `codex exec --ephemeral -p deep-review-exec` foreground+tee dispatch
   - Stop env-funneling subagents until fleet recovered; use BRIDGE-MODE per `cmc-env-funneled-disclosure.md`
   - Loss-rate calculation: 71% of subagent fan-out work is being silently dropped → ~$50-100/wave wasted on no-return dispatches

3. **Active-block burn rate is $317.50/hr**:
   - At this pace, today closes at ~$6,500+ Anthropic spend (already $5,260 by 20:29)
   - 4 hours remaining = potential $1,270 more = $6,500 total today
   - **Action**: throttle subagent fan-out to ≤3 concurrent per `parallel-agent-wave.md §Cache-Aware Dispatch Pacing` UNTIL cache rate verified ≥50% (currently unknown — status.py crashed)

### P1 — THIS SESSION

4. **Restore CCC pool status probe**: `python Z:/claude/ccc/tools/status.py` crashes with `KeyError: 'claude-max-local-42'` → CCC's local proxy account is gone. Either:
   - (a) Direct anthropic.com routing is working fine (ccusage proves it) — CCC pool is unused, leave it dead
   - (b) Reinitialize CCC accounts.json if pool-fleet is desired (sibling claude-sota has none either — both runtimes operate without CCC fleet currently)
   - **Verdict**: CCC pool is OPTIONAL infrastructure not currently load-bearing. Defer unless burn-rate optimization requires it.

5. **Wire MCP health monitor**:
   - `mcp_health.jsonl` missing → no observability on 7 configured MCP servers
   - Install `codex_mcp_healthcheck.py` from sibling per CR-12 TERTIARY (cite-import-AMBER per Section 14.5 when no upstream parity exists)
   - Risk: silent MCP failures (e.g., graphiti FalkorDB container down, github API rate limit) invisible until orchestrator tries to use them

6. **Codex T1/T2/T3 audit-trail growth**:
   - `codex_postcommit_reviews.jsonl` = 1.9 MB; `codex_prepush_reviews.jsonl` = 1.4 MB
   - At 3+ MB/day growth, rotation policy advisable (compress monthly to `.jsonl.zst`)
   - Per `audit-action-loop.md §Stage 4 Re-fire`: closure verification not affected by rotation

### P2 — THIS WAVE / NEXT FIRE

7. **Disable 0-tool-use subagent classes**: 71% loss rate on env-funneled stand-ins is wasted budget. Either:
   - (a) Add Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT=1` activation for fan-out waves (per CLAUDE.local.md ENV (h) — currently commented out; trade-off: parent loses 1M)
   - (b) Switch to orchestrator-direct Path P codex exec dispatch (no subagent fan-out at all — single-thread sequential)
   - (c) Use Agent tool's `subagent_type` only for read-only research; reserve writes for main thread

8. **Compact threshold sanity check**:
   - W187 round-2 codex T1 conf=0.9 set WARN=600k / HIGH=650k / CRIT=700k on 1M ceiling
   - Combined with auto-compact override at 70%, autocompact fires at ~700k AND CRIT decision:block fires at 700k → coincident triggers may produce thrash
   - **Action**: monitor `userpromptsubmit_compact_threshold.jsonl` for block-frequency; if >2/hr, raise CRIT to 750k OR lower autocompact to 65%

### P3 — STRATEGIC / NEXT WAVE

9. **Cost discipline gate (cardinal-rule alignment)**:
   - 2026-05-12 hit $8,958.83 in one day (peak) — single-day record
   - Per `cardinal-rule-9 install-risk discipline`: install-class ships should budget 2 fix-forward rounds × cost-per-round; cardinal-rule-11 META-process SOTA discipline applies to spend itself
   - Suggested ceiling: $2,000/day soft cap, $4,000/day hard cap; throttle wave fan-out when daily spend exceeds soft cap

10. **Cache reuse audit**:
    - 8-day Anthropic cache-read: 27.94 B tokens (92% of all input)
    - Cache hit rate is excellent (>90%) — this is working as designed
    - GPT-5.5 cache: 186.5 M of 225 M input = 82.8% — also healthy
    - **No action** — caching is already at SOTA performance per Anthropic prompt cache TTL semantics

## 9. Cite anchors

- ccusage MCP `daily`/`codex-daily`/`blocks`/`session` tools invoked this turn (TIER-3-LOCAL probe; raw output preserved in context-mode index)
- `Z:/claude-sota/.claude/rules/fm17-subagent-fleet-depletion.md §FM-17.b stand-in funneling loss` for the 71% FM-17.b failure class
- `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md` for STAND-IN-NOTICE mandate
- `Z:/claude-sota/.claude/rules/parallel-agent-wave.md §Cache-Aware Dispatch Pacing` for max-3 concurrent cap when cache rate unverified
- `Z:/claude-sota/.claude/rules/cardinal-rule-9-install-risk-discipline.md` for spend-budget discipline
- `CLAUDE.local.md` env block L82-156 (this runtime) for current env declarations
- `.claude/state/codex_postcommit_reviews.jsonl` 1.9 MB / `.claude/state/codex_prepush_reviews.jsonl` 1.4 MB for T3/T4 audit-trail volume

## 10. Provenance + verification

Report generated by orchestrator main thread (Opus 4.7 [1M context]) — single-source ccusage MCP + state-file probes; no agent fan-out (per P0 #2 anti-stand-in discipline applied recursively here).

Verification queries the operator can replay:

```powershell
# Re-run ccusage to refresh numbers
mcp call ccusage daily --since 20260508 --until 20260515
mcp call ccusage codex-daily --since 2026-05-08 --until 2026-05-15
mcp call ccusage blocks

# Probe env drift
echo $env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE   # PowerShell scope (eee.ps1 set)
# vs bash inside claude:
bash -c 'echo $CLAUDE_AUTOCOMPACT_PCT_OVERRIDE'

# CCC pool status (currently broken)
python Z:/claude/ccc/tools/status.py | head -40   # → KeyError today

# Subagent stand-in loss check (FM-17.b rate)
tail -n 50 Z:/claude-sota-installed/.claude/state/subagent_metrics.jsonl | jq -r '.tool_uses' | sort | uniq -c

# MCP health (currently no log)
ls -la Z:/claude-sota-installed/.claude/state/mcp_health.jsonl   # → not found
```

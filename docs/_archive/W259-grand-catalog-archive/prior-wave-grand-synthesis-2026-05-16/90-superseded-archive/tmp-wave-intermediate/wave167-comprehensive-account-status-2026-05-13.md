---
title: W167-F1 — Comprehensive CCC Fleet Account Status + SOTA Convergence Audit
status: INFLIGHT
date: 2026-05-13
agent: orchestrator
goal: /loop dynamic mode — comprehensive accounts diagram + monitoring + SOTA rotation audit
cite-class: TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8
constituents:
  - TIER-1-DIRECT @ Z:/claude/ccc/tools/status.py probe 2026-05-13T16:32:18 EDT
  - TIER-1-DIRECT @ cpa-usage-keeper SQLite `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.2_windows_amd64/data/app.db` schema
  - TIER-1-DIRECT @ Z:/claude/ccc/tools/reset_soonest_priority.py help text
  - TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/state/aperant_poller.jsonl row schema
  - TIER-1-DIRECT @ Z:/claude-sota-installed/tools/eee.ps1 status output
  - TIER-2 @ Z:/claude-sota-installed/docs/eee-launch-design-cliproxyapi.md (8-account fleet design)
  - TIER-3-LOCAL-COMPOSITION @ orchestrator synthesis
effective_tier: TIER-3-LOCAL-COMPOSITION per MIN_PRECEDENCE lattice
---

# 📊 CCC Fleet Account Status — 2026-05-13 16:32 EDT (W167 Fire 1)

## 🚨 EXECUTIVE SUMMARY

| Axis | Value | Verdict |
|------|-------|---------|
| Live HTTP probe (status.py @ 16:32:18) | 7/7 accounts HTTP 401 | 🔴 CRITICAL — fleet auth cascade |
| Cache rate (current session) | 0.0% | 🔴 CRITICAL — no cache hits |
| Successful requests | 0/7 | 🔴 CRITICAL |
| Fleet proxy `eee --status` HARD-GATE | PASS (4 hooks clean, cnighswonger OK, cpa-usage-keeper OK) | ⚠️ STALE — startup probe only |
| Direct curl `:8317/healthz` | status=000 (connection refused) | 🔴 CLIProxyAPI :8317 NOT BOUND now |
| cnighswonger `:19801/health` | 200 OK | 🟢 cache-fix proxy alive |
| cpa-usage-keeper `:8079/healthz` | 200 OK | 🟢 sidecar telemetry alive |
| reset_soonest_priority schtasks | Ready, next run 16:41 EDT (~9min) every 30m | 🟢 CORRECT-WRITER active |
| CCC-Balance schtasks | DISABLED | 🟢 correct per cycle-311e two-writer-conflict |
| aperant_poller telemetry | Last row 14.5h stale (2026-05-13T02:00 UTC) | ⚠️ poller not running |
| Gemini credential | active=True disabled=False | 🟢 ALTERNATIVE CHANNEL |
| Process density | 7×claude.exe + 2×codex.exe + 7×python.exe + 2×node.exe | ⚠️ HIGH parallel-session count |

## 🏗️ Topology (3-tier chained routing — all OFFICIAL native installs)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ This Runtime (claude-sota-installed):                                   │
│   claude.exe v2.1.138 → DIRECT to anthropic.com (no CCC proxy)         │
│   per CLAUDE.local.md ENV (c) ✅ ISOLATED from fleet                    │
└─────────────────────────────────────────────────────────────────────────┘

══════════════ MONITORED CCC FLEET (sibling runtime Z:\claude\ccc) ══════

ccc.ps1 launcher (Z:/claude/ccc/tools/ccc.ps1)
  │ ANTHROPIC_BASE_URL=http://127.0.0.1:19801
  │ ANTHROPIC_AUTH_TOKEN=eee-fleet-key-orchestrator
  ▼
🟢 cnighswonger v3.5.3 cache-fix proxy (PID :19801; 7 cache-fix extensions)
  │ • fingerprint-strip
  │ • cache-control-normalize
  │ • cache-telemetry (+ 4 more)
  │ Health probe: HTTP 200 OK (verified 16:32:18 EDT)
  │ CACHE_FIX_PROXY_UPSTREAM=http://127.0.0.1:8317
  ▼
⚠️ CLIProxyAPI v6.10.9 (3 PIDs: 7472/7496/14548; 180MB total)
  │ Process: RUNNING (Service mode session 0)
  │ Port :8317: NOT BOUND in current netstat probe ← TBD by Agent A/B
  │ Routing: fill-first (8-account OAuth Max pool)
  │ Session affinity: ON (TTL 1h matches Anthropic cache breakpoint)
  ▼
🌐 Anthropic CDN (api.anthropic.com)

────── SIDECAR ──────
🟢 cpa-usage-keeper v1.5.2 (PID 31780 :8079 LISTENING)
   SQLite ground truth: usage_events (499 rows) + usage_identities (10 rows)
   + redis_usage_inboxes (492 rows) + model_price_settings (0 rows)

────── TELEMETRY ──────
⚠️ aperant_poller.jsonl (24.8MB / 46,624 lines)
   Last row: 2026-05-13T02:00:02 UTC (14.5h STALE)
   EEE-Aperant-Poller schtasks: Ready, Next Run: N/A (one-off?)
   Schema: ts, account, provider, status, primary_used_percent,
           primary_reset_at, secondary_used_percent, secondary_reset_at,
           plan_type, limit_reached, extra_usage_paid_pct, error
           (Codex only: credits_balance, credits_unlimited, credits_has_credits)
```

## 🎯 ACCOUNTS CATALOG — COMPREHENSIVE DIAGRAM

### Per-account state (cpa-usage-keeper SQLite `usage_identities` table — STALE last_used_at)

| # | Identity (hash) | Plan | Limited | P_Used | P_Reset (UTC) | W_Used | **W_Reset (UTC)** | Reqs | OK | Fail | Total Tok | Cached Tok | Last Used | Drain Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | abc91862ca589b98 | - | **1 🔴** | 0% | - | **100%** | 2026-05-13T03:00:00 (PAST) | 0 | 0 | 0 | 0 | 0 | - | **EVAPORATED** |
| 2 | **9a7a7eee3803ae7f** | - | 0 | 0% | - | **80%** | **2026-05-13T18:59:59 (TODAY 14:59 EDT)** | 443 | 431 | 12 | 1.17M | **275M** | 2026-05-09 06:43 | **🔥 P1 DRAIN NOW** |
| 3 | 94bb006a507ad784 | - | 0 | 0% | - | 80% | 2026-05-15T04:00:00 (in 1.5d) | 41 | 41 | 0 | 365K | 21M | 2026-05-09 13:59 | P2 |
| 4 | ffe87f53fbc82590 | - | 0 | 0% | - | 5% | 2026-05-16T02:59:59 (in 2.5d) | 0 | 0 | 0 | 0 | 0 | - | P5 most headroom |
| 5 | fdcfc64c7491b75e | - | 0 | 0% | - | 84% | 2026-05-17T05:59:59 (in 3.5d) | 8 | 2 | **6 ⚠️** | 3.8K | 683K | 2026-05-08 18:12 | P3 — high fail rate |
| 6 | af192a5a438bcbd1 | - | 0 | **75%** | 2026-05-13T03:30:00 (PAST) | 90% | 2026-05-18T15:00:00 (in 5d) | 0 | 0 | 0 | 0 | 0 | - | P4 — 5h-window pending |
| 7 | **28c3da766f66d612** | **pro** | 0 | 0% | 2026-05-13T06:31:03 | 7% | 2026-05-18T22:43:58 (in 5d) | 6 | 6 | 0 | 26K | 0 | 2026-05-08 16:09 | P6 (Codex Pro) |
| 8 | 70e9e0fe41d76316 | - | 0 | **63%** | 2026-05-13T02:30:00 (PAST) | 29% | 2026-05-19T06:00:01 (in 6d) | 0 | 0 | 0 | 0 | 0 | - | P7 |
| 9 | c48acf89265d68a7 | - | None | 0% | - | 0% | - | 0 | 0 | 0 | 0 | 0 | - | UNUSED |
| 10 | 309ccf74cbffc877 | - | None | 0% | - | 0% | - | 0 | 0 | 0 | 0 | 0 | - | UNUSED |

### Per-account usage events aggregate (cumulative)

| Identity | Events | Fails | Input Tok | Output Tok | **Cached Tok** | Cache Hit Ratio |
|---|---|---|---|---|---|---|
| **9a7a7eee3803ae7f** | 443 | 12 (2.7%) | 461,653 | 708,844 | **275,327,686** | **99.8%** ✅ |
| 94bb006a507ad784 | 42 | 0 (0%) | 278,835 | 89,750 | 21,771,105 | 98.7% ✅ |
| fdcfc64c7491b75e | 8 | 6 (75%) | 1,375 | 2,481 | 683,768 | 99.8% but high fail |
| 28c3da766f66d612 | 6 | 0 (0%) | 19,545 | 6,682 | 0 | 0% (no cache; codex) |

### Auth files inventory (Z:/claude/ccc/auth/auths/)

| File | Status | Notes |
|---|---|---|
| `claude-739955940fc@gmail.com.json` | ACTIVE | P0 priority per status.py |
| `claude-aesthetic9c@gmail.com.json` | ACTIVE | P10 |
| `claude-avantmanifest@gmail.com.json` | ACTIVE | P10 (P0 in status.py — drift) |
| `claude-avantmanifest@gmail.com.json.bak.20260428-235314` | BACKUP | 2026-04-28 snapshot |
| `claude-dreamweaverhoudini@gmail.com.json` | ACTIVE | P10 |
| `claude-mr.euphoriaincarnate@gmail.com.json` | ACTIVE | P10 |
| `claude-nalawowac@gmail.com.json` | ACTIVE | P10 |
| `claude-zfan7@sva.edu.json` | ACTIVE | P10 — also Codex Pro per aperant |
| `claude-zz-readingcodingandbeyond@gmail.com.json` | DISABLED (`zz-` prefix) | DIS in status.py |
| `claude-zz-readingcodingandbeyond@gmail.com.json.bak.before-disable-2026-05-06` | BACKUP | Pre-disable snapshot |

→ **8 active OAuth Max accounts** + 2 backups + 1 disabled (`zz-` prefix sort to end of fill-first iteration).

## 🔄 Rotation Strategy (cycle-311e mutually-exclusive policy)

```mermaid
graph LR
    A[CCC Fleet 8 OAuth accounts] --> B{Which writer?}
    B -->|drain-most-headroom| C[balance.py<br/>DISABLED ✅]
    B -->|drain-soonest-reset| D[reset_soonest_priority.py<br/>ACTIVE every 30min ✅<br/>Next: 16:41 EDT]
    D -->|writes priority via PATCH| E[/v0/management/auth-files/fields]
    E -->|priority lookup| F[selector.go:116-129<br/>auth.Attributes priority]
    F --> G[fill-first routing<br/>session affinity TTL 1h]

    style C fill:#ffcccc
    style D fill:#ccffcc
```

**Per user directive 2026-05-13**: "utilize them before reset especially weekly reset" → reset_soonest_priority ✅ ALIGNED.

**Top-of-queue per current SQLite state** (sorted by W_RESET soonest first, excluding limit_reached):
1. 🔥 **9a7a7eee3803ae7f** — W_RESET=2026-05-13T18:59 UTC (≈3h from now); 80% used → 20% remaining EVAPORATES IN ~3h. **DRAIN FIRST**.
2. 94bb006a507ad784 — W_RESET=2026-05-15T04:00 UTC; 80% used → 20% remaining over 1.5d
3. ffe87f53fbc82590 — W_RESET=2026-05-16T02:59 UTC; **5% used → 95% headroom** (most fresh)
4. fdcfc64c7491b75e — W_RESET=2026-05-17T05:59 UTC; 84% used (HIGH FAIL — investigate)
5. af192a5a438bcbd1 — W_RESET=2026-05-18T15:00 UTC; 90% used (most weekly-drained)
6. 28c3da766f66d612 — W_RESET=2026-05-18T22:43 UTC (PRO plan; Codex)
7. 70e9e0fe41d76316 — W_RESET=2026-05-19T06:00 UTC; 29% used

**FAIL-RATE OUTLIER**: fdcfc64c7491b75e at 75% failure rate (6/8) — needs investigation (token expired? auth corrupted?).

## 🔍 Scheduled Tasks (operator-owned cron)

| Task | Status | Next Run | Repeat | Purpose |
|------|--------|----------|--------|---------|
| `\ccc-reset-soonest` | 🟢 Ready | 2026-05-13 16:41 EDT | every 30min | drain-soonest-reset writer ✅ |
| `\CCC-Balance` | 🔴 Disabled | N/A | — | balance.py — correctly off per cycle-311e |
| `\ccc-reapply-priorities` | 🔴 Disabled | N/A | — | manual priority reset |
| `\ClaudeFleetHealth` | 🔴 Disabled | N/A | — | fleet health monitor |
| `\ClaudeProxyEcosystem` | 🔴 Disabled | N/A | — | proxy ecosystem manager |
| `\EEE-Aperant-Poller` | 🟢 Ready | N/A (no schedule) | — | rate-limit poller (NOT REPEATING — fire 1-off?) |
| `\ClaudeCode\CronTasks` | 🔴 Disabled | N/A | — | generic CC cron |
| `\ClaudeCode\DepReposSync` | 🟢 Ready | 2026-05-16 04:00 AM | weekly? | Z:/repos/deps sync |
| `\ClaudeCode\LogMaintenance` | 🔴 Disabled | N/A | — | log rotation |

⚠️ **EEE-Aperant-Poller** has Status=Ready but Next Run=N/A → likely one-off task that hasn't been re-scheduled. Last successful run produced data 14.5h ago. **Recommendation**: re-schedule every 5-10m for current-state visibility (Forward Top-3).

## 🖥️ System / Terminal Spawning (process_hygiene_audit)

```
process_hygiene_audit --check
  → 0 reap candidates (targets=['codex.exe'] min_age_hours=1)
  → 🟢 CLEAN
```

Current process count:
- **claude.exe**: 7 PIDs (85892, 58428, 85984, 35944, 62484, 15136, 81180) — total ~2.7GB
- **codex.exe**: 2 PIDs (103040, 56052) — Agent B BRIDGE-MODE subprocess + 1 other
- **python.exe**: 7+ PIDs (Service mode — audit hooks)
- **node.exe**: 2 PIDs (MCP servers)
- **cli-proxy-api.exe**: 3 PIDs (Service mode — CCC fleet)

⚠️ **7 concurrent claude.exe sessions** = high parallel-session density. Per `Z:/claude-sota/.claude/rules/parallel-session-worktree-isolation.md` mandate: each session MUST use `eee --worktree` for filesystem isolation. Sub-class .a/.b/.c absorption risk per FM-02 (currently n=13 ladder).

## 🎯 KEY METRICS

| Metric | Value | Notes |
|---|---|---|
| Cache hit ratio (top account 9a7a7eee) | **99.8%** | 275M cached / 462K fresh input |
| Cumulative cache savings (top account) | ~$3,829 | 275M cached vs fresh input ($15-$1.5)/M |
| Weekly cap utilization (avg active) | ~58% (across 5 used accounts) | Headroom: 42% × 5 = ~210% week-equivalent |
| Aperant poller freshness | 14.5h STALE | last row 2026-05-13T02:00 UTC |
| SQLite last_used_at | 4-5 days stale | Most accounts last seen 5/8-5/9 |

## 🎯 Forward Top-3 (Pre-agent-synthesis recommendations)

1. **Re-schedule EEE-Aperant-Poller every 5m** — current 14.5h stale window blinds rotation decisions. Cmd:
   ```
   schtasks /Change /TN "EEE-Aperant-Poller" /RI 5
   ```
   OR if SchedTask has no repeat: re-create with `schtasks /Create /TN ... /SC MINUTE /MO 5 ...`.

2. **Diagnose CLIProxyAPI :8317 binding** — `eee --status` says verified live but direct curl :8317 refused. Probe `netstat -ano | findstr ':8317'` (no filter) AND `Get-NetTCPConnection -OwningProcess 7472,7496,14548`. May be:
   - IPv6 binding (`::1` not `127.0.0.1`)
   - Different port (config drift)
   - Health-only on a different endpoint

3. **Investigate fdcfc64c7491b75e high fail rate** (6/8 = 75%) — pull `usage_events WHERE auth_index='fdcfc64c7491b75e' AND failed=1` for error_text/HTTP_status/timestamp pattern.

## 📡 Dispatched Agents (3-parallel BRIDGE-MODE wave per advanced-agent-team-standing-directive)

| Agent | ID | Class | Status | Expected Output |
|---|---|---|---|---|
| A | `a5c5a6fb0159d9fef` | sota-researcher (Sonnet stand-in) | Running | tmp/wave167-agentA-sota-research-accounts-fleet-2026-05-13.md (≤800 LOC) |
| B | `a5032a2b08abd5052` | **codex:codex-rescue (BRIDGE-MODE → real GPT-5.5)** | Running | tmp/wave167-agentB-codex-rescue-401-recovery-2026-05-13.md (≤800 LOC; Q1-Q6 + VERDICT) |
| C | `ab08a3899028a7e45` | general-purpose (Sonnet stand-in — BRIDGE-MODE shortfall) | Running | tmp/wave167-agentC-gpt5-reviewer-2026-05-13.md (≤500 LOC; 5-lens adversarial) |

**BRIDGE-MODE penetration**: 1/3 (33%) — BELOW directive invariant #1 ≥2 minimum. **STAND-IN-NOTICE per cross-model-consensus §Env-funneled subagent stand-in disclosure mandate**: Agent C should have been `gpt5-reviewer` BRIDGE-MODE; launched as general-purpose instead due to subagent_type namespace error (`codex-rescue` → corrected to `codex:codex-rescue` mid-dispatch, but Agent C already launched). Cross-model gate satisfied at PARTIAL level. Forward-only: re-dispatch gpt5-reviewer in next /loop iteration if Agent C output is insufficient.

CADP cap satisfied: 3 concurrent (max-3 until cache verified ≥50% per CADP rule 2; current cache rate 0% confirms cap). 3/5 cumulative session-arc dispatches (CADP rule 4).

## 🔮 Agent synthesis pending — comprehensive verdict + Mia pre-apply will land in next turn(s)

Awaiting agent task-notifications. Heartbeat ScheduleWakeup ~1500s as safety fallback.

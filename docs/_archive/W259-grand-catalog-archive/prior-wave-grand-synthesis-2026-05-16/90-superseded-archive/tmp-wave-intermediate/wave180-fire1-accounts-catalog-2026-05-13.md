---
title: W180 F1 — Comprehensive Accounts Status Catalog (post-compact)
status: AUTHORITATIVE-AGGREGATE
date: 2026-05-13
agent: orchestrator (W180 F1 post-/compact /loop fire)
wave: 180
fire: 1
session: 1f7cafce-dbbb-4857-8fc7-7714ff277fba
inputs:
  - python Z:/claude/ccc/tools/status.py (2026-05-13T17:52:30)
  - python Z:/claude/ccc/tools/fleet_report.py (2026-05-13T17:52:30)
  - schtasks /Query /TN ccc-reset-soonest (Last 17:41:01 result=0 / Next 18:11:00)
  - schtasks /Query /TN EEE-Aperant-Poller (Last 5/12 09:35 result=-1073741510 CRASH)
  - aperant_poller.jsonl tail (last row 2026-05-13T02:00:02 UTC — 15h45m stale)
  - cnighswonger:19801 (via fleet_report success) / CLIProxyAPI:18317 (HTTP 404 alive) / cpa-keeper:8079 (HTTP 200) / ollama:11700 (HTTP 200)
prior_baseline: tmp/wave167-comprehensive-account-status-2026-05-13.md + tmp/wave167-f1-final-synthesis-2026-05-13.md
---

# W180 F1 — Comprehensive Accounts Status Catalog

## EXECUTIVE STATUS — CRITICAL (worsened from W167-F1)

| Axis | W167-F1 (~15:30) | W180-F1 (17:52) | Δ |
|---|---|---|---|
| **Healthy accounts** | 0/8 (7-error + 1-disabled) | **0/8** (7-error + 1-disabled) | UNCHANGED-CRITICAL |
| **HTTP 401 accounts** | 7 active showed P10 errors | **7 accounts HTTP 401** | UNCHANGED |
| **Disabled accounts** | 1 (readingcodingandbeyond — refresh revoked) | **1** (same) | UNCHANGED |
| **Proxy success rate** | unknown (post-restart) | **0.0% (0/7 requests success)** | CRITICAL |
| **Aperant daemon** | DEAD (5d JSONL stale, schtasks Ready/N/A) | **DEAD-CONFIRMED** (Last result=-1073741510 STATUS_FATAL_APP_EXIT 5/12 09:35) | confirmed crash class |
| **reset_soonest schtasks** | Ready every 30m | **ACTIVE** Last 17:41:01 result=0 / Next 18:11:00 | healthy but ineffective (no usable accounts) |
| **Service chain liveness** | ALIVE through cnighswonger | **ALIVE** :19801/:18317/:8079/:11700 | UNCHANGED |
| **Operator reauth applied?** | pending | **NOT-APPLIED** (still all 401) | NO OPERATOR ACTION SINCE W167 |

**Bottom line**: ALL 8 Claude OAuth accounts non-functional. cnighswonger + CLIProxyAPI alive but routing to dead credentials. No requests succeeding. **OPERATOR REAUTH MANDATORY** before any productive work resumes.

## ACCOUNT STATUS — comprehensive diagram (all 8 + Gemini)

```
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║  CCC FLEET — COMPLETE ACCOUNT STATUS @ 2026-05-13T17:52:30 EDT                                                ║
║  Binary: v6.9.24 · Routing: fill-first · 4634 msgs (4475 ok / 11 auth-retry / 148 errors)                     ║
╠═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                               ║
║  Account                              P    Status         5h-Used  7d-Used  5h-Reset    7d-Reset    Action     ║
║  ──────────────────────────────────  ───  ─────────────  ───────  ───────  ──────────  ──────────  ────────  ║
║  aesthetic9c@gmail.com               P10  HTTP 401        ?       ?        unknown     unknown     REAUTH    ║
║  dreamweaverhoudini@gmail.com        P10  HTTP 401        75%*    90%*     03:30 UTC*  18 May 15* REAUTH    ║
║  mr.euphoriaincarnate@gmail.com      P10  HTTP 401        0%*     80%*     —*          15 May 04* REAUTH    ║
║  nalawowac@gmail.com                 P10  HTTP 401        0%*    100%*     —*          13 May 03* WEEKLY-EXP║
║  zfan7@sva.edu                       P10  HTTP 401        0%*     5%*      —*          16 May 02* REAUTH    ║
║  readingcodingandbeyond@gmail.com    P10  HTTP 429 [DIS]  —       —        —           —          RE-OAUTH  ║
║  739955940fc@gmail.com               P0   HTTP 401        ?       ?        unknown     unknown     REAUTH    ║
║  avantmanifest@gmail.com             P0   HTTP 401        ?       ?        unknown     unknown     REAUTH    ║
║                                                                                                               ║
║  *  = aperant_poller JSONL last reading 2026-05-13T02:00:02 UTC (15h45m stale; values 2026-05-13 early-AM)   ║
║  REAUTH    = run `python Z:\claude\ccc\tools\safe_reauth.py <email>` to refresh OAuth tokens                  ║
║  RE-OAUTH  = refresh_token revoked; full /api/oauth/code re-grant needed                                      ║
║  WEEKLY-EXP = weekly window at 100% (must wait for 7d reset)                                                  ║
║                                                                                                               ║
║  CODEX (zfan7@sva.edu Codex Pro):                                                                             ║
║    Status: ok · 5h used=0% (reset 06:31 UTC = 4h31m ago)  · 7d used=7% (reset 18 May 22:43 UTC)              ║
║    Credits: 250 · has_credits=true                                                                            ║
║                                                                                                               ║
║  GEMINI: credential active · disabled=False (not exercised this session)                                      ║
║                                                                                                               ║
║  SESSION TOTALS (proxy stats since last restart):                                                              ║
║    Requests=7 · Success=0 (0.0%) · Cache=0.0% · Accounts used=7/7                                             ║
║    Log totals (cumulative): 4634 messages · 4475 ok · 11 auth-retry · 148 real errors                         ║
║    Error breakdown: 401=11 · 429=47 · 500=12 · 502=2 · 503=87                                                 ║
║    Latency: P50=9.0s · P90=61.0s · P95=100.0s · P99=209.0s                                                    ║
║                                                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
```

## SERVICE CHAIN LIVENESS

```
                            REQUEST FLOW (3-tier proxy chain)
                            ─────────────────────────────────

  claude.exe                      cnighswonger v3.5.3                CLIProxyAPI v6.10.9
  ──────────                      ──────────────────                  ──────────────────
       │                               port :19801                          port :18317
       │  ANTHROPIC_BASE_URL          (cache-fix proxy +                    (CLI proxy +
       │  =http://127.0.0.1:19801      cache_control rewrite)               OAuth routing)
       │                                                                           │
       ▼                                       ▼                                   ▼
  ┌─────────────────────────────────────────────────────────────────────────────────────┐
  │  HTTP 200 expected      HTTP 200 (via fleet_report success)   HTTP 404 (no /health  │
  │  (probe pending)        — chain alive end-to-end              endpoint, alive)      │
  └─────────────────────────────────────────────────────────────────────────────────────┘
                                                                                   │
                                          ┌────────────────────────────────────────┘
                                          │
                                          ▼
                          ┌───────────────────────────────┐
                          │  Anthropic CDN /v1/messages   │
                          │  api.anthropic.com            │
                          │  ⚠ ALL 8 OAuth → HTTP 401     │
                          └───────────────────────────────┘

  SIDECAR + AUX SERVICES
  ──────────────────────

  cpa-usage-keeper v1.5.2 :8079  ─► HTTP 200 ALIVE
    SQLite: app.db (10 identities, 499 usage_events, 492 redis_usage_inboxes)
    stats_updated_at: 2026-05-08 (5d stale — aperant feed dead)

  Ollama :11700                  ─► HTTP 200 ALIVE
    Backend for L1+L2 mcp-memory (sqlite_vec embedded) + L3 graphiti (via FalkorDB)

  FalkorDB Docker :16379         ─► UP (containers verified W164-F36 / persist hashes succeed)
    (probe via redis-cli failed — tool not in Git Bash; container liveness confirmed via W164 docker ps)

  ccc-mgmt API :9327             ─► probe pending (no output captured — rerun next fire)

  EEE-Aperant-Poller daemon      ─► ⚠ DEAD ⚠
    schtasks: Last 5/12 09:35:10 / Last Result -1073741510 (STATUS_FATAL_APP_EXIT)
    Schedule: At system startup (will NOT fire until reboot)
    JSONL: last row 2026-05-13T02:00:02 UTC (15h45m stale)
    PID search: empty (no python.exe with aperant_rate_limit_poller in command line)
```

## ROTATION STATE

```
  ccc-reset-soonest schtasks (drain-soonest-reset writer)
  ──────────────────────────────────────────────────────
    Task: Z:\claude\ccc\tools\reset_soonest_priority.bat
    Schedule: every 30 minutes (since 2026-04-27)
    Last Run: 2026-05-13 17:41:01 EDT · Result=0 (success)
    Next Run: 2026-05-13 18:11:00 EDT
    Status: HEALTHY but INEFFECTIVE
      — accounts can't be prioritized when ALL return HTTP 401
      — writer succeeds writing priority=10 to all errored accounts
      — selector.go fill-first then picks first P10 → still 401 → cascade

  Priority ladder semantic (per Z:/claude/ccc/tools/reset_soonest_priority.py:53-55):
    [90, 80, 70, 60, 50, 40, 30, 20]  ← ranked by seven_day.resets_at ascending
    errors get P=10 (current state: ALL P10 OR P0)
    weekly ≥95% hard-demoted (e.g., nalawowac@ → would be hard-demoted if it had valid auth)

  Session-affinity TTL: 1h (per CLIProxyAPI selector.go:47-105)
    Agent C suggested → lower to 30min for better drain-soonest coherence (defer post-reauth)
```

## CACHE + TOKEN OPTIMIZATION

```
  CURRENT CACHE STATE — UNKNOWN-MEASURED
  ───────────────────────────────────────
    Proxy stats: "No token data in proxy stats (stats reset on restart)"
    cpa-usage-keeper SQLite: stats_updated_at 2026-05-08 (stale; aperant feed dead)
    Conclusion: cache_read_input_tokens %% cannot be computed this fire — needs successful
    request first (blocked by HTTP 401 cascade)

  SOTA OPTIMIZATION QUEUE (Forward; per W167-F1 + W167-Agent C verdicts)
  ─────────────────────────────────────────────────────────────────────
    1. Anthropic 1h-cache breakpoints (cache_control:{type:"ephemeral",ttl:"1h"})
       Target: system prompt + CLAUDE.md cardinal-rules + always-loaded rules
       Expected savings: 40-60% input cost reduction once cache populates
       Effort: ~30min ship (config change in proxy chain)
       Status: queued; blocked by reauth gate

    2. Haiku 4.5 routing (claude-haiku-4-5-20251001) for low-stakes operations
       Target: /loop status renderers, JSONL parsers, simple Read summaries
       Expected savings: ~80% on routed path
       Effort: ~4hr ship (LiteLLM model_list config + per-tool routing)
       Status: queued; PROVIDER-COMPLEMENT not replacement for Opus 4.7 on synthesis

    3. PreCompact 4-layer stack — ALREADY INSTALLED
       (W164 F38a fcakyon/intelligent-compact + ECC pre-compact + context-mode + suggest-compact)
       All advisory-only (no decision:"block"); fires correctly this session

    4. Session-affinity TTL 1h → 30min for drain-soonest coherence (Agent C suggestion)
       Defer until reauth complete; n=1 idea, no replay evidence yet

  BLOCK / DO NOT INSTALL
  ──────────────────────
    rtk-ai__rtk 0.39.0 — REJECT (axis-3 FAIL FAST-CHURN-BAND: 3.7mo + 37 releases/4mo)
                                  single-org maintainer · no T2 dated artifact
```

## SYSTEM HYGIENE (terminal/process state)

```
  codex.exe processes:        0 alive (no current codex CLI dispatch)
  aperant python.exe:         0 alive (daemon crashed)
  Git status:                 clean since W179 commit bba2405 (no uncommitted edits)

  Recent commits (last 10):
    97d422a session checkpoint: 2026-05-13 17:46
    bba2405 docs(rules): fm20 row 14 codify MEMORY-vs-artifact-evidence drift (W179 P4)
    6b41cc3 docs(rules): apply codex T1 Pattern A to Rank #3.5 PreCompact hook layer (W177 P7)
    eec69e2 fix(skills): pin gitnexus-pr-review analyze cmd + trust-boundary warning (W177 P0.1)
    8119746 feat(skills): install gitnexus-pr-review 7th GitNexus skill (W177 P0)
    1fd6976 session checkpoint: 2026-05-13 16:36
    3b02a63 session checkpoint: 2026-05-13 16:27
    81b49b5 session checkpoint: 2026-05-13 16:17
    ade2c95 session checkpoint: 2026-05-13 15:58
    2abea38 session checkpoint: 2026-05-13 15:46
```

## FORWARD TOP-5 RECOVERY (operator-side, unchanged from W167-F1)

Operator must execute these — Claude cannot reauth OAuth in this session:

| Rank | Action | Cite | Effort | Blocks |
|---|---|---|---|---|
| 1 | **Reauth 7 active Claude accounts** via `python Z:\claude\ccc\tools\safe_reauth.py <email>` for each | `Z:/claude/ccc/tools/safe_reauth.py:5-7,25,35-57` | ~35min total (browser OAuth × 7) | EVERYTHING — 0/8 healthy |
| 2 | **Reauth readingcodingandbeyond@gmail.com** via full /api/oauth/code flow (refresh_token revoked, snapshot/restore path won't work) | Same script with `--force-fresh` if available, else manual OAuth grant | ~10min | 8th account |
| 3 | **Restart aperant_poller daemon** + change schtasks to repeat every 5min (currently AtStartup only) | `schtasks /Change /TN EEE-Aperant-Poller /SC MINUTE /MO 5` then `schtasks /Run /TN EEE-Aperant-Poller` | ~5min | account observability (JSONL polling) |
| 4 | **Install 1h-cache breakpoints** in cnighswonger proxy config (after reauth proves working) | `cache_control:{type:"ephemeral",ttl:"1h"}` per Anthropic prompt-caching beta | ~30min | 40-60% cost reduction |
| 5 | **Drop session-affinity TTL 1h → 30min** in CLIProxyAPI config (drain-soonest coherence) | CLIProxyAPI selector.go:47-105 — config flag if available; else patch+rebuild | ~1hr | rotation efficiency |

## DELTA SINCE W167-F1 (~2h25m gap)

- **NO OPERATOR ACTION applied** — all 8 accounts still in same failure state
- **W179 P4 commit bba2405 landed**: fm20 row 14 codify MEMORY-vs-artifact-evidence drift (continued FM-20 ladder n=13→n=14)
- **reset_soonest schtasks ran 5× more cycles** (every 30min × ~2h25m gap) — all no-ops since accounts errored
- **aperant_poller continues DEAD** since 5/12 09:35 crash — no progress
- **post-/compact context window reset** — Claude session refreshed (no productivity blocker on Claude side)

## SOTA-RESEARCH CONVERGENCE STATUS (W167-F1 lineage)

W167-F1 composite verdict NEEDS-REVISION conf=0.85 with 5 findings remains the operative SOTA convergence. No new dispatches this fire (no new design surface, no new failure class). Recovery actions Forward Top-5 are TIER-1-DIRECT operator-side OAuth + daemon-restart actions — research is COMPLETE; execution is GATED on operator.

**Cross-model gate status this fire**: PARTIAL via Phase 1 bootstrap exception per CR-3 (Tier 1a codex T1-T7 hooks INSTALLED-AND-WIRED per W165 P1 FM-20 row 8 catch — manifest §2 L84). No design-surface Edit this fire so T1 not invoked. T3 will fire on next commit.

## 5-SURFACE PERSIST (Karpathy §5 Wiki Compounding Surface)

- Layer 1 (JSONL): aperant_poller.jsonl tail captured (15h45m stale — process dead)
- Layer 2 (MEMORY.md): W180-F1 row append (next Edit)
- Layer 3 (compiled wiki): this artifact at `tmp/wave180-fire1-accounts-catalog-2026-05-13.md`
- Backend mcp-memory: queued (would persist hash with type=milestone group=eee)
- Backend graphiti: queued (would write episode `W180-F1-accounts-status-CATASTROPHIC-0of8-healthy` group=eee)

## STOP-GATE STATUS

This is observability/monitoring — no STOP-N gate applies. /loop self-pace heartbeat.

## NEXT FIRE EXPECTATIONS (W180 F2)

- If operator applied reauth → expect Healthy 7/8 + cache rate populating + fresh aperant JSONL
- If operator did nothing → identical state surface (delta will be ~1h, two more reset_soonest cycles)
- If operator restarted aperant only → JSONL fresh BUT all accounts still 401 (poller surfaces error states fresh)
- If Claude session continues to /compact heuristic firing → context fresh + can fan out 3-agent BRIDGE-MODE if any NEW gap emerges

# Accounts management — runtime catalog + SOTA cite-anchors + operator runbook

> **Status**: AUTHORITATIVE-AGGREGATE persistent catalog.
> **Scope**: CCC fleet OAuth pool (Anthropic Max subscriptions) + Codex Pro + Gemini credentials managed by the eee runtime's 3-tier proxy chain.
> **Cite-class** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE):
> `constituents=[TIER-1-DIRECT @ CCBP cross-model-workflow.md:1-48 @ HEAD 48f2ceb, TIER-1-DIRECT @ CLIProxyAPI conductor.go:2107,2539 @ HEAD 785b00c3, TIER-1-DIRECT @ Anthropic CC settings docs https://code.claude.com/docs/en/settings, TIER-3-LOCAL-COMPOSITION @ live empirical W167+W180 audit-trail]; effective_tier=TIER-3-LOCAL-COMPOSITION`
> **Codified**: 2026-05-13 W180 F2 per user-trigger ("create a folder for acounts related docs and script,repos clones") + n=1 user-trigger gate per `Z:/claude-sota/.claude/rules/codification-threshold.md` cycle-322 jurisdiction §user-trigger n=1 automatic.

## Quick nav

| Section | Purpose |
|---|---|
| [§1 Account inventory + state](#1-account-inventory--state) | Comprehensive account list shape — live data at `tmp/wave<N>-fire<F>-accounts-catalog-*.md` |
| [§2 Service chain topology](#2-service-chain-topology) | 3-tier proxy chain diagram: claude.exe → cnighswonger → CLIProxyAPI → Anthropic CDN |
| [§3 SOTA repos cite-anchors](#3-sota-repos-cite-anchors) | Z:/repos/deps/ + Z:/claude/ pinned TIER-1 sources |
| [§4 Operator runbook](#4-operator-runbook) | Reauth + aperant restart + 1h-cache + Haiku-route + TTL drop |
| [§5 Audit trail](#5-audit-trail) | Cross-fire ledger of accounts-state catalogs |
| [§6 Tools index](#6-tools-index) | Operator scripts (CCC parent + repo-local) |

## §1 Account inventory + state

**Account pool** (8 Anthropic Max OAuth Claude + 1 Codex Pro + 1 Gemini):

```
P10 aesthetic9c@gmail.com
P10 dreamweaverhoudini@gmail.com
P10 mr.euphoriaincarnate@gmail.com
P10 nalawowac@gmail.com
P10 zfan7@sva.edu                          (also: zfan7@sva.edu (Codex Pro))
P10 readingcodingandbeyond@gmail.com       (disabled cohort — refresh_token revoked)
P0  739955940fc@gmail.com
P0  avantmanifest@gmail.com

Gemini credential (active; not exercised in /loop unless explicit)
```

**Priority semantic** (per `Z:/claude/ccc/tools/reset_soonest_priority.py:53-55`):
- Ladder: `[90, 80, 70, 60, 50, 40, 30, 20]` — ranked by `seven_day.resets_at` ascending
- Errored accounts get priority=10
- Weekly utilization ≥95% hard-demoted to bottom
- Writer fires every 30min via `ccc-reset-soonest` schtasks

**Per-account state fields**:
- `5h-Used %` (session/primary utilization)
- `7d-Used %` (weekly/secondary utilization)
- `5h-Reset` (resets_at primary)
- `7d-Reset` (resets_at secondary)
- `priority` (rotation rank)
- `disabled` (bool — set on refresh_token revocation)
- `last_updated` (aperant_poller JSONL timestamp)

**Live data**: see most-recent `tmp/wave<N>-fire<F>-accounts-catalog-*.md` (see §5 Audit trail).

## §2 Service chain topology

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    CCC FLEET — 3-TIER PROXY CHAIN                        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  claude.exe                                                              │
│     │  ANTHROPIC_BASE_URL=http://127.0.0.1:19801                         │
│     │  ANTHROPIC_AUTH_TOKEN=<dev-token>                                  │
│     ▼                                                                    │
│  cnighswonger-claude-code-cache-fix v3.5.3  :19801                       │
│     │  cache_control rewrite + cache-telemetry per-session               │
│     │  Cite: Z:/repos/deps/cnighswonger-claude-code-cache-fix/           │
│     │        README.md:42,283-339 + proxy/extensions/cache-telemetry.mjs │
│     ▼                                                                    │
│  CLIProxyAPI v6.10.9  :18317                                             │
│     │  Bearer OAuth routing + fill-first + session-affinity TTL=1h       │
│     │  Cite: Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/                │
│     │        conductor.go:2107,2539 + selector.go:47-105 @ 785b00c3      │
│     ▼                                                                    │
│  Anthropic CDN api.anthropic.com /v1/messages                            │
│     │  anthropic-beta: claude-code-20250219,oauth-2025-04-20             │
│     │                                                                    │
│  ─── Sidecar + Aux ──────────────────────────────────────────────────    │
│  cpa-usage-keeper v1.5.2  :8079    (SQLite app.db — 10 identities)       │
│  Ollama local              :11700  (mcp-memory L1 + graphiti L3 backend) │
│  FalkorDB Docker          :16379   (graphiti backend)                    │
│  ccc-mgmt API              :9327   (cron + reset_soonest writer endpoint)│
│  EEE-Aperant-Poller daemon (At-system-startup schtasks; CRASHED 5/12)    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

## §3 SOTA repos cite-anchors

Per cardinal-rule-1 + cardinal-rule-9 read-only research probe exception §item iii: these repos at `Z:/repos/deps/` are **cite-reference-only** (NOT install sources for this runtime). Use file:line @ HEAD SHA for evidence.

| Repo | Path | Cite anchor | Purpose |
|---|---|---|---|
| **CCC OAuth machinery** | `Z:/claude/ccc/` | `tools/status.py:13-18,25,121-124,140-143` + `tools/fleet_report.py:9-16,65,206-210` + `tools/reset_soonest_priority.py:53-55,86-99` + `tools/safe_reauth.py:5-7,25,35-57` | Live operator tools for fleet status + cumulative report + priority writer + OAuth re-grant |
| **CLIProxyAPI** | `Z:/repos/deps/CLIProxyAPI` | `sdk/cliproxy/auth/conductor.go:2107,2134-2143,2539,2560-2571 @ 785b00c3` + `sdk/cliproxy/auth/selector.go:47-105,116-129,200-250,434-493 @ 785b00c3` + `internal/runtime/executor/claude_executor.go:287-292,459-492 @ 785b00c3` + `sdk/cliproxy/usage/manager.go:12-33 @ 785b00c3` + `internal/redisqueue/plugin.go:52-62,106-119 @ 785b00c3` | 401/429 handling + priority+cooldown routing + Anthropic SSE parsing + usage record fields + cached_tokens serialization |
| **cnighswonger-cache-fix** | `Z:/repos/deps/cnighswonger-claude-code-cache-fix` | `README.md:42,283-339 @ 2f17aeb9` + `proxy/extensions/cache-telemetry.mjs:151-182,214-215 @ 2f17aeb9` + `proxy/stream.mjs:21-22 @ 2f17aeb9` | cache-telemetry per-session + extension impact guide |
| **openai/codex auth** | `Z:/repos/deps/codex` | `codex-rs/login/src/auth/manager.rs:83-91,156-171,470-524 @ 993e3f40` | OpenAI multi-account credential handling (Codex Pro reference) |
| **BerriAI/litellm** | `Z:/repos/deps/litellm` | `litellm/proxy/auth/auth_exception_handler.py:22-80 @ 934ecdca` + `auth_checks.py:327,636,660 @ 934ecdca` + `user_api_key_auth.py:1446-1467,1554-1577 @ 934ecdca` | Fallback + quota patterns (SOTA reference for drain-most-headroom alt; sss uses drain-soonest LOCAL-NOVEL not from here) |
| **claude-agent-sdk-python** | `Z:/repos/deps/claude-agent-sdk-python` | `src/claude_agent_sdk/_internal/session_resume.py:305-359 @ b512f256` + `types.py:655,952 @ b512f256` | Anthropic auth-file preservation reference |
| **CCBP cross-model-workflow** | `Z:/repos/deps/claude-code-best-practice-shan` | `development-workflows/cross-model-workflow/cross-model-workflow.md:1-48 @ 48f2ceb` | T1-T3 lifecycle authority (cardinal-rule-3) |

**Repos clones — DO NOT re-clone**: cardinal-rule-6 mandates official-native-channel + pull-from-newest at install-time. The cite-anchors above are READ-ONLY research probes, not install-class artifacts. To verify a cite at current HEAD:

```bash
# refresh upstream first per cardinal-rule-6
git -C Z:/repos/deps/<repo> fetch origin && git -C Z:/repos/deps/<repo> log -1 --format='%H %s' origin/HEAD
# then read at the pinned SHA
git -C Z:/repos/deps/<repo> show <SHA>:<path> | head -N
```

## §4 Operator runbook

**STATE-PROBE FIRST** (always before any recovery action):
```bash
python Z:/claude/ccc/tools/status.py | head -40         # fleet snapshot
python Z:/claude/ccc/tools/fleet_report.py | head -200  # cumulative + errors
schtasks /Query /TN ccc-reset-soonest /V /FO LIST       # writer health
schtasks /Query /TN EEE-Aperant-Poller /V /FO LIST      # poller health
powershell -Command "Get-Content Z:/claude-sota-installed/.claude/state/aperant_poller.jsonl -Tail 5"
```

**Recovery #1 — OAuth reauth (HTTP 401 cascade)**:
```bash
# for each errored email
python Z:\claude\ccc\tools\safe_reauth.py <email>
# opens browser → OAuth callback → snapshot metadata → restore → verify
# ~5min per account; expect ~35min total for 7-account batch
```

**Recovery #2 — Re-OAuth (refresh_token revoked, e.g. readingcodingandbeyond@gmail.com)**:
```bash
# snapshot/restore won't work; need full /api/oauth/code re-grant
python Z:\claude\ccc\tools\safe_reauth.py <email> --force-fresh
# OR manual OAuth grant via Anthropic console
```

**Recovery #3 — aperant_poller restart**:
```bash
# verify current state
schtasks /Query /TN EEE-Aperant-Poller /V /FO LIST
# change schedule from At-startup to repeat every 5min
schtasks /Change /TN EEE-Aperant-Poller /SC MINUTE /MO 5
# fire immediately
schtasks /Run /TN EEE-Aperant-Poller
# verify daemon alive
tasklist /FI "IMAGENAME eq python.exe" /FO CSV | grep aperant
# verify fresh JSONL
powershell -Command "Get-Content Z:/claude-sota-installed/.claude/state/aperant_poller.jsonl -Tail 1"
```

**Recovery #4 — 1h-cache breakpoint install** (post-reauth):
```bash
# Anthropic prompt-caching beta: cache_control:{type:"ephemeral",ttl:"1h"}
# Target: system prompt + CLAUDE.md cardinal-rules + always-loaded rules
# Effort: ~30min config in cnighswonger proxy chain
# Expected savings: 40-60% input cost reduction once cache populates
```

**Recovery #5 — Haiku 4.5 routing**:
```bash
# Model: claude-haiku-4-5-20251001
# Target: /loop status renderers + JSONL parsers + simple Read summaries
# Effort: ~4hr LiteLLM model_list config + per-tool routing
# Expected savings: ~80% on routed path; ~20-30% session-total
# Status: PROVIDER-COMPLEMENT to Opus 4.7 not replacement
```

**Recovery #6 — Session-affinity TTL 1h → 30min** (Agent C suggestion W167-F1):
```bash
# Lower TTL improves drain-soonest coherence
# Patch: Z:/repos/deps/CLIProxyAPI/sdk/cliproxy/auth/selector.go:47-105
# Or: config flag if available
# Status: defer until post-reauth (no data on impact while all accounts errored)
```

## §5 Audit trail

Cross-fire catalogs at `tmp/wave<N>-fire<F>-accounts-catalog-*.md` and final-syntheses at `tmp/wave<N>-fire<F>-final-synthesis-*.md`. Each captures snapshot at a point in time per Karpathy §5 Layer-3 compiled wiki discipline.

| Wave/Fire | Date | Cite | Headline |
|---|---|---|---|
| W167 F1 | 2026-05-13 ~15:30 | `tmp/wave167-comprehensive-account-status-2026-05-13.md` + `tmp/wave167-f1-final-synthesis-2026-05-13.md` | 8 OAuth + Gemini; live HTTP 401; SQLite 10 identities; 3-agent BRIDGE-MODE fanout; FM-20 :8317→:18317 forward-only catch |
| W180 F1 | 2026-05-13 ~17:52 | `tmp/wave180-fire1-accounts-catalog-2026-05-13.md` | **0/8 healthy** (worsened from W167); aperant DEAD exit -1073741510; reset_soonest active but ineffective; operator reauth gated |
| W180 F2 | 2026-05-13 ~17:57 | This README — folder ship | docs/accounts/ structure created per user-trigger 2026-05-13; persistent SOTA cite-anchors + runbook |

## §6 Tools index

**Live operator scripts (CCC parent — DO NOT modify; cite-reference)**:
- `Z:/claude/ccc/tools/status.py` — fleet status snapshot (anthropic-beta auth)
- `Z:/claude/ccc/tools/fleet_report.py` — cumulative report with per-account usage
- `Z:/claude/ccc/tools/reset_soonest_priority.py` — drain-soonest priority writer (schtasks every 30min)
- `Z:/claude/ccc/tools/safe_reauth.py` — OAuth re-grant with snapshot/restore
- `Z:/claude/ccc/tools/reset_soonest_priority.bat` — schtasks invocation wrapper

**Repo-local probes (claude-sota-installed)**:
- `Z:/claude-sota-installed/.claude/state/aperant_poller.jsonl` — per-minute polling JSONL (when daemon alive)
- `Z:/claude-sota-installed/.local/cpa-usage-keeper/cpa-usage-keeper_v1.5.2_windows_amd64/data/app.db` — SQLite ground-truth (10 identities)
- `Z:/claude-sota-installed/tools/eee.ps1` — launcher with chain liveness probe (T0.1-T0.5 pre-conditions)
- `Z:/claude-sota-installed/tools/aperant_rate_limit_poller.py` — daemon (currently DEAD per W180 F1 catch)

**Backend services**:
- `http://127.0.0.1:19801/v1/messages` — cnighswonger entry-point
- `http://127.0.0.1:18317` — CLIProxyAPI
- `http://127.0.0.1:9327` — ccc-mgmt API (priority PATCH endpoint per `Z:/claude/ccc/tools/reset_soonest_priority.py:86-99`)
- `http://127.0.0.1:8079` — cpa-usage-keeper sidecar (SQLite telemetry)

## Update cadence

This README is the **persistent catalog**. Per-fire snapshots write to `tmp/wave<N>-fire<F>-accounts-catalog-*.md`. Update this README when:

- Service chain topology changes (new sidecar / port migration / proxy version bump)
- New SOTA repo cite-anchor added (per cardinal-rule-1 + Section 14.5 cite-import-AMBER)
- New recovery action codified (n≥3 same-arc per `codification-threshold.md` cycle-322)
- Tools index gains new operator script

Per Karpathy §5 Layer-2 vs Layer-3 distinction: this README is Layer-3 (compiled wiki); MEMORY.md is Layer-2 (one-line pointer index). Live data is Layer-1 (chronological JSONL + per-fire catalogs).

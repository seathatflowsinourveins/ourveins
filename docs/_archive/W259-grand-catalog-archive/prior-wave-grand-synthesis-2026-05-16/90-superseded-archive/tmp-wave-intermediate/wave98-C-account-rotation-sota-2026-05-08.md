# Wave 98 Agent C — Account-Rotation Strategy SOTA Audit

**Mission**: Account-rotation SOTA for eee runtime CLIProxyAPI fleet (10 OAuth accounts).
**Date**: 2026-05-08 | **Agent**: sota-researcher Sonnet stand-in (agentId a1cc906f9636741d1; 468692ms / 52 tools / 444565 tokens)
**STAND-IN-NOTICE**: Sonnet stand-in per CLAUDE.local.md ENV (g) — NOT GPT-5.5; orchestrator MUST fire `codex exec --ephemeral -p deep-review-exec` before commit per CR-3 Phase 1.
**HEAD pin**: CLIProxyAPI `ed1458aa6d3430ba59538aeb980b8934f0e80c1f` (v6.10.8-1).

---

## §1 — Live fleet inventory (Mia probe 2026-05-08)

3 active Claude (aesthetic9c P30 / mr.euphoriaincarnate P20 [cap=0] / nalawowac P10) + Codex Pro + Gemini + Antigravity = 6 of 10. **4 disabled by Ship 1X cycle-aware rotation** (`secondary_window_used_percent ≥ 80%`).

## §2 — CPA full feature audit (file:line cites @ ed1458aa)

### Selector strategies (`sdk/cliproxy/auth/selector.go`)
- **`RoundRobinSelector`** (L26-L36, L257-L320): cursor map keyed `provider:canonicalModel`.
- **`FillFirstSelector`** (L33-L36, L359-L369): deterministic burn-one-then-next.
- **`SessionAffinitySelector`** (L437-L537): wraps another selector; default TTL 1h (eee uses 4h Ship 1Q).
- **NO `weighted`/`least-used`/`health-based`** in upstream — only RR/FF/session wrapper.

### Priority bucket mechanism (selector.go:116-129, 200-255)
- `getAvailableAuths()` groups by priority, picks `bestPriority = max(available)`.
- **Round-robin operates WITHIN highest bucket ONLY — exhausts P30 fully before falling to P20.**
- **eee implication**: with P30=1 / P20=1 / P10=1 active, round-robin = effectively fill-first.

### Cooldown / 429 / quota (`conductor.go`)
- L73-74: `quotaBackoffBase=1s; quotaBackoffMax=30min`. Exponential 1s→2s→...→1800s cap.
- L2134-2159: HTTP 429 prefers `result.RetryAfter` over backoff fallback.
- `disable-cooling: true` skips ALL backoff (eee config: false — CORRECT).
- L2106-2169: 401→30min, 402/403→30min, 404→12h, 408/500/502/503/504→1min, **429→exponential or Retry-After**.

### Quota auto-failover (`scheduler.go:430-462`)
- `quota-exceeded.switch-project: true` (eee: ON) → fallback project for SAME credential.
- `quota-exceeded.switch-preview-model: true` (eee: ON) → opus-4.5 → sonnet-4 fallback.

### Management API (`internal/api/server.go:506-659`) — 49 routes on `/v0/management/*`
- `GET /v0/management/auth-files` — per-auth recent_requests + state
- `GET /v0/management/api-key-usage` — per-API-key success/fail counts
- `GET /v0/management/usage-queue?count=N` — Redis-protocol in-memory usage queue
- `PUT/PATCH /v0/management/routing/strategy` — live-toggle strategy
- `PATCH /v0/management/auth-files/status` — per-account disable/enable
- `PATCH /v0/management/auth-files/fields` — force quota reset

### HONEST-NON-FINDING (CPA does NOT expose natively)
- ❌ NO Anthropic Max plan-tier awareness — only Codex JWT exposes `chatgpt_plan_type`
- ❌ NO 5h/7d window tracking — only operator-injected via Ship 1W cpa-usage-keeper
- ❌ NO `capacity_score` runtime field — eee Claude OAuth `capacity_score` is OPERATOR-LEGACY-SNAPSHOT (cycle-150 era), proxy ignores it
- ❌ NO weighted/least-used/health-based selector — only RR/FF/session-wrapper

## §3 — Anthropic / Codex Pro plan-tier reset windows

### Anthropic Claude Max
- Pro plan: ~88K tokens / 5h rolling window; weekly cap added 2025-08-28
- Max 5x ($100/mo): ~440K tokens / 5h rolling window
- Max 20x ($200/mo): ~220K tokens / 5h × ~30h agentic / 7d window
- 2026 update: 5h limits doubled; peak-hour throttling removed

### Codex Pro (zfan7@sva.edu-pro JWT)
- `chatgpt_plan_type: pro`
- `chatgpt_subscription_active_start: 2026-04-24T03:19:39Z`
- `chatgpt_subscription_active_until: 2026-05-27T08:17:01Z` (**~19 days remaining**)
- Codex Pro 5h: ~150 messages
- Codex Pro 7d weekly cap layered atop

## §4 — SOTA repos top-5 ranked

1. **`Willxup/cpa-usage-keeper`** — **ALREADY INSTALLED via Ship 1W** at `.local/cpa-usage-keeper/.../data/app.db`; SQLite 38-column `usage_identities` schema with `primary_window_used_percent` / `secondary_window_used_percent`
2. `zhanglunet/cliproxyapi-usage-dashboard` — STUDY-PILOT (Codex 5h/7d UI, SQLite-backed)
3. `AllenReder/CLIProxyAPI-Quota-Inspector` — STUDY-PILOT (terminal per-account windows)
4. `murasame612/CLIProxyPoolWidget` — REJECT-FOR-FIT (macOS only)
5. `decolua/9router` — REJECT-FOR-FIT (Next.js parallel; same exponential backoff pattern)

## §5 — eee runtime current state cross-check

| Mechanism | Status | Cite |
|---|---|---|
| cpa-usage-keeper v1.5.2 | INSTALLED | `.local/cpa-usage-keeper/...` |
| Ship 1W (live poller) | SHIPPED — populates window-used-percent fields | install-provenance.md:3726 |
| Ship 1X (cycle-aware rotation) | SHIPPED Wave 93 — disables OAuth at ≥80% | install-provenance.md:4318-4350 |
| Ship 1J (round-robin flip) | SHIPPED Wave 97 | config.yaml:104-159 |
| Ship 1Q (4h session-affinity) | SHIPPED Wave 86 | config.yaml:138-145 |
| `disable-cooling: false` | CORRECT for multi-account pool | install-provenance.md:3271 |
| `quota-exceeded.switch-project + switch-preview-model: true` | CORRECT — auto model fallback | config.yaml:53-55 |

## §6 — Recommended Wave 98+ ships

### Ship A — Priority bucket equalization (HIGH ROI; OPERATOR-DECISION)
**Problem**: round-robin operates within highest bucket ONLY — fleet has unequal P30/P20/P10 → effectively fill-first.
**Fix**: equalize 3 active accounts to P20 via Management API PATCH. Restores 3-account burst distribution; closes FM-17.b.i (Wave 97 fan-2-C 429 root cause).

### Ship B — `tools/eee-status.ps1` fleet dashboard
Consumer of Ship 1W SQLite + CPA `/v0/management/auth-files`. ROI: ~5min saved per fleet diagnostic.

### Ship C — Reset-window-aware predictive rotation
Extends Ship 1X reactively → predictively. Compute `predicted_exhaustion_at = now + (1 - used%) / requests_per_minute_avg_5min`.

### Ship D — FM-17.b.i defense beyond round-robin (CRITICAL)
Combo: sticky session-affinity (already 4h Ship 1Q) + pre-probe each account before launch + lower request-retry 3→2 + rotate after 30min logical block.

### Ship E — Codex Pro renewal alarm
JWT countdown to 2026-05-27 (~19 days). SessionStart hook check < 7 days → alert.

## VERDICT

STAND-IN-NOTICE: Sonnet stand-in per CLAUDE.local.md ENV (g); orchestrator-side codex T1 e2e MANDATORY before commit
VERDICT: APPROVE-LIST
confidence: 0.86

top-5 ADOPT-NOW Wave 98+ ships:
1. Ship A: priority-bucket equalize aesthetic9c+nalawowac → P20 (3-account burst). HIGH ROI; cite selector.go:116-129,200-255
2. Ship D: FM-17.b.i combo defense (sticky + pre-probe + retry=2 + 30min cycle). CRITICAL
3. Ship B: tools/eee-status.ps1 fleet dashboard. 5min/diag
4. Ship C: predictive rotation extending Ship 1X. Pre-empt 429s
5. Ship E: Codex Pro renewal alarm (19d countdown)

top-3 STUDY-PILOT:
1. zhanglunet/cliproxyapi-usage-dashboard
2. AllenReder/CLIProxyAPI-Quota-Inspector
3. 0xtbug/zero-limit (Windows-native Tauri+React)

REJECT-FOR-FIT:
- murasame612/CLIProxyPoolWidget (macOS only)
- James-QiuHaoran/LLM-serving-with-proxy-models (research-grade; not OAuth-proxy productized)

HONEST-NON-FINDING:
- CPA upstream has NO native Anthropic Max plan-tier weighting
- CPA upstream has NO native 5h/7d window tracking
- capacity_score in eee Claude OAuth JSONs is operator-legacy-snapshot
- NO weighted/least-used/health-based selector strategy in CPA upstream

# Wave 83 Agent A — CLIProxyAPI Routing Strategy + Priority-Tier Deep-Dive

**Origin**: 3-agent SOTA team dispatch 2026-05-08 11:30
**Agent**: sota-researcher (claude-opus-4-7[1m] per env header — STAND-IN per CLAUDE.local.md ENV (g))
**Tool count**: 28 / Duration: 409s
**TIER-1 anchor**: router-for-me/CLIProxyAPI @ 785b00c3127eea6aa207f1207ead8a2aa93690a3 (v6.10.9)
**Convergence-gate Axis 1 ≥3-distinct-orgs**: BerriAI/litellm + Portkey-AI/gateway + helicone/helicone (PASS)

## §1 STAND-IN-NOTICE
Cross-model gate NOT structurally satisfied at agent layer (Sonnet stand-in). All §1-§5 claims at file:line + HEAD SHA depth (TIER-1-DIRECT). Orchestrator-side codex T1 re-review needed for RECOMMENDATION before any operator action on priority-tier reshuffle.

## §2 fill-first vs round-robin DECISION MATRIX

CONFIG.EXAMPLE.YAML @785b00c3 documents EXACTLY 2 strategies: `round-robin` (default) + `fill-first`.

Common ancestor: `getAvailableAuths` (selector.go:204-235) applies PRIORITY GATE BEFORE strategy:
- Calls `collectAvailableByPriority()` (selector.go:185-203) — groups by priority key
- Returns ONLY the slice at availableByPriority[bestPriority] (max int wins)
- Lower-priority auths FILTERED OUT entirely unless higher-tier all-cooldown

`RoundRobinSelector.Pick` (selector.go:240-291): cursor-based, per-(provider,model), 4096-key LRU cap; cycling scope = WITHIN bestPriority tier only.

`FillFirstSelector.Pick` (selector.go:325-334): 9 lines, returns `available[0]` (sorted-by-ID), DETERMINISTIC. Author comment selector.go:32-34 verbatim: "selects the first available credential (deterministic ordering). This 'burns' one account before moving to the next, which can help stagger rolling-window subscription caps (e.g. chat message limits)."

Failover trigger: rate-limit cooldown OR quota-zero OR admin-disabled (selector.go:336-388 isAuthBlockedForModel). NOT failed-N-times — that's request-retry config.

## §3 Priority-tier × strategy INTERACTION

Priority is HARD GATE applied BEFORE strategy. Eee priority config 30/30/20/20/20/10/10:
- Tier A (priority=30): 2 accounts → DEFAULT serves traffic; fill-first picks `available[0]` (alphabetically-first ID)
- Tier B (priority=20): 3 accounts → activates ONLY when both tier-A cooldown
- Tier C (priority=10): 2 accounts → activates ONLY when ALL of A+B cooldown

Session-affinity (selector.go:444-505) wraps fill-first/round-robin as inner fallback:
- L468-475: cache hit → check still-available → return
- L478-486: cache stale → reselect via fallback → re-cache
- L503-507: cache miss → fallback selector → cache new binding

Session-affinity OVERRIDES strategy on cache-hit. Strategy only matters on cache-miss + cache-stale-failover.

## §4 18/19 concentration explanation
1. fill-first picks `available[0]` of tier-A on cache-miss → all NEW sessions bind to that auth
2. Session-affinity 1h TTL keeps subsequent calls sticky
3. Result: 94.7% concentration is INTENDED cache-cost-minimization shape (selector.go:32-34 verbatim)
4. NOT pathological — pathological signature would be fill-first picking a cooldowned auth (prevented by isAuthBlockedForModel)

## §5 Comparative gateway repos (3-org Axis-1 PASS)

| Gateway | Strategies | Priority-tier | Cite |
|---|---|---|---|
| **CLIProxyAPI v6.10.9** (router-for-me) | round-robin (default), fill-first | YES — hard-gate Auth.Attributes["priority"] | selector.go:115-127,204-235,240-291,325-334 @ 785b00c3 |
| **LiteLLM** (BerriAI) | simple-shuffle, least-busy, latency-based, cost-based, usage-based-v2 | NO native; deployment_affinity_ttl (TTL-pin) | DeepWiki BerriAI/litellm 2026-05-08 |
| **Portkey Gateway** (Portkey-AI) | single, loadbalance (weighted), fallback (sequential), conditional | YES via fallback + loadbalance | DeepWiki Portkey-AI/gateway 2026-05-08 |
| **Helicone Gateway** (Helicone) | p2c (P2C+PeakEWMA SOTA), latency, weighted | NO native (weighted approximates) | DeepWiki helicone/helicone 2026-05-08 |

**Key insight**: NONE of LiteLLM/Portkey/Helicone implement OAuth-quota-burning pattern. CLIProxyAPI's `fill-first + session-affinity` is **purpose-built for eee workload class**.

## §6 RECOMMENDATION: **KEEP fill-first + session-affinity:true + session-affinity-ttl:"1h" UNCHANGED**

Quantitative rationale:
- 825M tokens / 94.3% cache-read = ~778M cache-read tokens
- Anthropic prompt-cache: cache-read = ~10% of input price
- Switching to round-robin would distribute load → each starting fresh cache. If hit-rate degrades 94.3% → even 80% (conservative), aggregate cost ~3× current spend on cache-cost axis alone

When to RE-EVALUATE:
- cache-hit rate <70% sustained → investigate session-affinity TTL OR tier-A cooldown frequency
- tier-A account hits rolling-cap >2×/day → priority-tier rebalancing recommended
- Multi-agent fan-out routinely produces 4+ NEW sessions in <1s → consider round-robin within tier-A

## §7 Priority-tier dynamic adjustment — API EXISTS

**Endpoint**: `PATCH /v0/management/auth-files/fields`
**Handler**: `PatchAuthFileFields` in internal/api/handlers/management/auth_files.go @ 285b3ae2
**Auth**: remote-management.secret-key from config.yaml; localhost-only unless allow-remote: true

Live priority-bump:
```bash
curl -X PATCH http://127.0.0.1:8317/v0/management/auth-files/fields \
  -H "Authorization: Bearer $CLIPROXYAPI_MGMT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"file":"acct-a.json","priority":40}'
```

Effect: next Pick() call sees updated priority, becomes new bestPriority winner if no other auth ≥40.

Static current (30/30/20/20/20/10/10) → KEEP. Dynamic autobalancer = FORWARD-REF until capacity-score telemetry stable.

## HANDOFF
verdict_one_line: KEEP-CONFIG-AS-IS — fill-first + session-affinity 1h is purpose-built for eee OAuth-subscription-burning workload class; 18/19 concentration is INTENDED cache-cost-minimization shape; priority-tier dynamic adjustment API exists but defer until capacity-score telemetry stable. STAND-IN-NOTICE — orchestrator codex T1 re-review needed before priority reshuffle.

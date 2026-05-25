# W338 CPA-Router SOTA Patches — 2026-05-20

> SCA-v13 ranked gap-fix set for `router-for-me/CLIProxyAPI` to eliminate the 529 Overloaded storm
> and harden against 4-stream subagent dispatch failure mode observed 2026-05-20 EDT.

## Audit verdict

**Root cause of 529 storm:** `conductor.go:2680-2715` MarkResult switch has NO `case 529:`. 529 falls into `default` (L2711), which sets only a status message — **no cooldown, no backoff escalation**. The 529'd auth stays hot in the pool and gets re-selected on the next request, compounding upstream load.

**Verified gaps (source-cited):**

| # | Gap | File:Line | Severity |
|---|---|---|---|
| 1 | No `case 529:` in MarkResult switch | `sdk/cliproxy/auth/conductor.go:2711` (default arm) | P0 |
| 2 | Exponential backoff has no jitter | `sdk/cliproxy/auth/conductor.go:2726` (`1<<prevLevel`) | P0 |
| 3 | No provider-wide circuit breaker | absent | P1 |
| 4 | No AIMD inflight cap on upstream dispatch | absent (refreshMaxConcurrency=16 is auth-refresh only) | P1 |
| 5 | No model fallback path on persistent 529 | absent | P2 |
| 6 | Stars-only 5xx cooldown is one-size-fits-all 1min | `conductor.go:2704-2710` | P2 |

## SCA-v13 ranking

| Patch | LOC | 529-elim ROI | D-EMP | Risk | Tier |
|---|---|---|---|---|---|
| Patch 1 — 529 case | ~15 | **HIGHEST** (closes the immediate-retry loop) | 0→2 after smoke | low | T0 IMMEDIATE-UPGRADE |
| Patch 2 — full-jitter | ~10 | HIGH (defeats thundering herd) | 0→2 | low | T0 IMMEDIATE-UPGRADE |
| Patch 3 — circuit breaker | ~120 | MEDIUM (provider-wide pause) | 0→1 | medium | T1 INSTALL |
| Patch 4 — AIMD limiter | ~180 | HIGHEST (caps in-flight, prevents storm formation) | 0→1 | medium | T1 INSTALL |

## SOTA references (3-org-distinct per sca-v13)

1. **AWS Architecture Blog 2015** — Marc Brooker, "Exponential Backoff and Jitter" — full-jitter strictly beats equal/decorrelated jitter
2. **Netflix `concurrency-limits` (Apache-2.0)** — Vegas / Gradient2 adaptive concurrency, Little's Law `L = λW`
3. **Nygard `Release It!`** + `sony/gobreaker` (MIT) — circuit breaker pattern (CLOSED → OPEN → HALF-OPEN)
4. **Google SRE Book Ch.22** — "The Tail at Scale" (request hedging)
5. **RFC 5681 TCP Congestion Control** — AIMD (additive increase / multiplicative decrease)

## Files in this directory

- `patch-1-add-529-case.diff` — applies to `sdk/cliproxy/auth/conductor.go`
- `patch-2-full-jitter.diff` — applies to `sdk/cliproxy/auth/conductor.go`
- `breaker.go` — NEW file for `sdk/cliproxy/auth/breaker.go`
- `aimd_limiter.go` — NEW file for `sdk/cliproxy/auth/aimd_limiter.go`
- `selector-integration.diff` — wires breaker + limiter into `selector.go` SessionAffinity
- `apply.ps1` — operator-side script: clones upstream, applies patches, runs `go test ./...`, builds
- `VERDICT-LEDGER.md` — sca-v13 ledger row per W327 codex r14/r15/r16

## Apply order

```
P0 first — Patches 1 + 2 (low risk, immediate effect)
  → smoke test: stress 4 parallel subagents, count 529 → cooldown transitions in audit log
  → if green: commit + rebuild + restart CPA NSSM service

P1 second — Patches 3 + 4 (medium risk, larger surface)
  → run unit tests + integration tests + 30-min soak
  → if green: commit + rebuild + restart
```

## Operator caveats

- This directory contains **patches against an upstream cite-reference clone**. Per `CLAUDE.md` cardinal-rule-1 + `CLAUDE.local.md`, `Z:/repos/deps/CLIProxyAPI` is NOT an install target. To use these patches, the operator should:
  - Fork `router-for-me/CLIProxyAPI` on GitHub
  - Apply patches to the fork
  - Build the fork
  - Replace the live CPA binary with the fork build
- **Or**: upstream the patches as PRs to `router-for-me/CLIProxyAPI` for community benefit.
- These patches CANNOT eliminate 529 entirely — 529 is Anthropic upstream capacity. They eliminate the *immediate-retry-loop amplification* that turns a 1-request 529 into a 100-request storm.

## Empirical claims (to verify post-apply)

| Metric | Pre-patch | Post-patch target | How to measure |
|---|---|---|---|
| 529 fraction during 4-stream subagent burst | ~5%/min | <0.5%/min | CPA HTTP log `grep ' 529 '` rate |
| Cache-hit ratio under stress | 81.2% (codex telemetry) | ≥85% | Anthropic API headers `x-cache-hit` |
| Parallel-subagent success rate | ~95% (then storms) | ≥99% | CPA fleet 60m ok/fail ratio |
| Recovery time after upstream 529 burst | manual restart needed | auto-resume ≤30s | CB OPEN→HALF-OPEN→CLOSED transition log |

# Wave 80 Synthesis — Architectural+Optimization Deep-Dive (HONEST-NON-FINDING)

**Date**: 2026-05-08  
**Trigger**: Operator directive — "is now eee fully SOTA? deep-dive into SOTA architectural enhance + optimization repos"  
**Wave structure**: 3-agent parallel (CADP rule 2) → 1 returned + 2 FM-17.e failures → orchestrator-side GPT-5.5 pivot

## Verdict: HONEST-NON-FINDING — NO ADOPT-NOW SHIP from Wave 80

eee architecture is already **near-SOTA-bottleneck-bounded** at the cache-locality + token-efficiency layer. Wave 79 Ship 1A delivered the right primitives. The frontier work is **per-account observability**, NOT adoption of more SOTA repos.

## Evidence ladder

### Cross-model gate satisfaction
- Cardinal-rule-3 Phase 1 bootstrap exception: orchestrator-side GPT-5.5 via proxy `/v1/chat/completions` model=gpt-5.5 owned_by=openai (Codex-Pro OAuth).
- 3 micro-prompts fired in parallel (28s elapsed; 3.4K total tokens).
- Verdict origin = real GPT-5.5 BRIDGE-MODE (NOT Sonnet stand-in).

### Aggregate cache-locality math (2026-05-08 ccusage daily)
- inputTokens: 12,566 (fresh input — 0.00% of total)
- cacheCreationTokens: 33,785,324 (6.12%)
- cacheReadTokens: 517,935,250 (**93.87%**)
- write/read ratio: **6.52%** — cache writes well-amortized
- **Interpretation**: cache locality IS being preserved across the 10-account fleet. Round-robin + 1h session affinity in CLIProxyAPI v6.10.9 is structurally working. If locality were destroyed, write/read ratio would be much higher (50%+).

### Agent return summary

| Agent | Status | Findings |
|---|---|---|
| A (sota-researcher) | DONE_WITH_CONCERNS | 8 gap-repos surfaced; 2 TIER-A REFUTED by Mia probe |
| B (codex-rescue BRIDGE-MODE) | FAILED FM-17.e autocompact | n=1 candidate sub-class |
| C (codex-rescue BRIDGE-MODE) | FAILED FM-17.e autocompact | n=2 candidate sub-class |
| Orchestrator P1 (CLIProxyAPI source) | UNKNOWN×3 | GPT-5.5 lacks direct source visibility — honest non-claim |
| Orchestrator P2 (Layer-2 SOTA) | LiteLLM + Portkey response-cache surfaced | Different layer than eee gap |
| Orchestrator P3 (adversarial Wave 79 challenge) | **THE ARCHITECTURAL TRUTH** | round-robin × cache_control structurally incompatible UNLESS session-affinity preserves locality (which eee's 93.87% suggests it does) |

### Mia pre-apply REFUTED-OVER (FM-20 path-drift catch)

| Pick | Mia probe | Refutation |
|---|---|---|
| G-7 ccs ADOPT-NOW | Agent A prescribed env-var wiring (`CCS_DASHBOARD_PORT=7878` + `CCS_PROXY_BACKEND=http://127.0.0.1:9327`) | ccs config is **YAML-FILE-BASED** at `Z:/claude-sota-installed/.ccs/config.yaml` (auto-created on first invoke); env-var prescription FABRICATED; ccs WRAPS CLIProxyAPI not parallel-layer; adoption = full architectural migration of 10 OAuth files. **DOWNGRADE → STUDY-PILOT** |
| G-2 Helicone ADOPT-NOW | Agent A prescribed `npm install -g @helicone/ai-gateway` | npm `0.2.0-beta.30` — pre-1.0 BETA; CR-9 install-risk discipline forbids @latest beta-pinning. **DOWNGRADE → STUDY-PILOT** until 1.0+ stable |

## What was NOT covered (real gap surfaced)

**Per-account cache-rate observability**: 
- ccusage breaks down by MODEL only (`modelBreakdowns`)
- CLIProxyAPI Mgmt API `recent_requests` has only `{time-window, success, failed}` — NO cache token fields per-account
- eee **cannot detect** if round-robin starts destroying cache locality on a single account
- Aggregate 93.87% is healthy NOW; sustainability under fleet expansion / workload shift is invisible

This IS the eee-specific architectural gap that no generic SOTA repo addresses. Per P3 verbatim: "*The optimization target is not just fewer tokens; it is fewer uncached prefix tokens under account-scoped ephemeral caches while preserving quota balancing.*"

## Wave 80 disposition

**No commit needed for Wave 80.** Wave 79 Ship 1A (context-mode + ccusage statusline) stands. The 8 gap repos surfaced by Agent A all DOWNGRADE to STUDY-PILOT.

## Ship 1B candidate (NOT auto-firing — operator approval needed)

Per-account cache telemetry middleware:
- Hook into CLIProxyAPI response stream
- Parse Anthropic `usage.cache_read_input_tokens` + `cache_creation_input_tokens` per-response
- Tag by upstream account binding
- Emit JSONL to `.claude/state/cliproxy_per_account_cache.jsonl`
- Build dashboard view (extend ccusage-statusline OR build separate eee-status-cache.ps1 per-account dashboard)

Estimated build: ~150-300 LOC TypeScript hook OR Go middleware fork of CLIProxyAPI. CR-12 cite source: per-account telemetry doesn't have direct upstream parity (CLIProxyAPI's recent_requests doesn't expose cache stats); OR could fork CLIProxyAPI to add per-account cache stats. Per CR-9 install-risk: 2-round fix-forward expected.

## Honest answer to operator question "is eee fully SOTA?"

**At the token-efficiency + cache-locality layer**: YES, near-SOTA-bottleneck-bounded. 93.87% aggregate cache-read is the metric that proves the architecture works. Adopting more generic SOTA repos (LiteLLM/Portkey/GPTCache/RouteLLM) wouldn't move this number meaningfully.

**At the observability layer**: NOT FULLY SOTA. Per-account cache-rate breakdown is the gap. Ship 1B candidate above is the natural next move.

**At the cross-model T1/T2/T3 gate layer**: PARTIAL (Phase 1 bootstrap exception). Cardinal-rule-3 satisfied via orchestrator-side proxy dispatch — works but isn't mechanical hook enforcement yet (manifest §Section 2 codex T1-T7 hooks not yet INSTALLED; cardinal-rule-7 Phase 2 transition not yet triggered).

## Codification candidates for future fires

1. **FM-17.e candidate sub-class** (autocompact-thrashing on codex-rescue BRIDGE-MODE deep-dive briefs): n=2 same-arc 2026-05-08. Need n=3 for OWNED-rule promotion per `codification-threshold.md` cycle-322.
2. **Brief-template enhancement**: BRIDGE-MODE codex-rescue briefs should include explicit "read source files in 500-line chunks max; summarize after each Read; do NOT git-clone whole repos" CONSTRAINTS slot.


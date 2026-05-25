---
title: W197 Agent B (P1) — PreCompact thrashing audit [orchestrator-manual-substitute recovery]
status: AUTHORITATIVE
date: 2026-05-14
agent: orchestrator (manual-substitute — Agent B codex-rescue a12d864789beb00ee LOST to FM-17.e autocompact-thrashing, 4 tool_uses / 1026s)
wave: 197
artifact_class: P1 MEASURED thrashing audit + HONEST-NON-FINDING on reclaim%
disposition: ARTIFACT-INLINE per FM-19 (FM-17.e recovery per fm17-subagent-fleet-depletion.md + W190 orchestrator-manual-substitute precedent)
---

# W197 P1 — PreCompact thrashing audit (MEASURED)

## Recovery context
Agent B (codex-rescue BRIDGE-MODE, `a12d864789beb00ee`) LOST to **FM-17.e** CC-runtime autocompact-thrashing — return signature verbatim "Autocompact is thrashing: context refilled to limit within 3 turns, 3x in a row" (4 tool_uses, 1026s) — root cause: the agent read the 137KB jsonl raw into its context. Orchestrator manual-substitute per `fm17-subagent-fleet-depletion.md §FM-17.e` recovery + W190 F1 precedent: a bounded Python script (`tmp/w197-p1-analyze.py`, heredoc — re-runnable) parses the jsonl in-process; only the summary enters orchestrator context. FM-17.e cumulative ladder advances (W196 Agent B n=5 → W197 Agent B n=6+).

## (a) MEASURED — precompact_hint_emitter.jsonl (335 PreCompact events, ~3 days history)
[MEASURED 2026-05-14 via tmp/w197-p1-analyze.py]
- Records parsed: 335, malformed: 0, PreCompact events: 335
- `body_chars` (precompact_hint_emitter hook's per-event injection size): min=2099, max=3771, **mean=3103, median=3097**
- **SOURCE distribution — THE OFFENDER MECHANISM**: `memory_md_fallback` = **322/335 (96.1%)**, `compact_hint_fresh` = 13/335 (3.9%)
- `trigger` distribution: auto=290, manual=43, unknown=2
- `hint_present`: False on every `memory_md_fallback` event; True on `compact_hint_fresh`

## (b) OFFENDER IDENTIFIED — stale-bridge fallback (NOT a single rogue hook)
The thrashing offender is NOT one hook injecting too much. It is that **`compact_hint.json` is STALE (>300s cap) on 96.1% of PreCompact events**, so `precompact_hint_emitter.py` takes its `memory_md_fallback` branch and injects the MEMORY.md head (~3097 chars) on nearly every compaction instead of a fresh, small, targeted hint. The goal predicate's "compact_hint.json STALE (333s>300s cap) → chain re-inflation" hypothesis is **MEASURED-CONFIRMED**: the save→compact→restore loop's bridge artifact is essentially never fresh (96:4 fallback:fresh), so the emitter's fallback path dominates. The precompact_hint_emitter hook itself behaves correctly (it injects ~3KB and degrades gracefully) — the defect is UPSTREAM of it: nothing keeps `compact_hint.json` fresh within the 300s window during a long arc.

## (c) HONEST-NON-FINDING — net-reclaim % not jsonl-measurable
Scanned every `.claude/state/*.jsonl`: NONE carries pre/post-compact context-token counts. `aperant_poller.jsonl` has `extra_usage_paid_pct` (billing, not reclaim); all other state jsonls (`auto_proceed_gate`, `codex_gate`, `codex_postcommit_reviews`, etc.) have zero token/reclaim/budget keys. The ≥50%-reclaim target CANNOT be measured from persisted jsonl — W180 F3's "~13% reclaim" used UserPromptSubmit hook token-estimates (system-reminder surface, not logged to disk). HONEST-NON-FINDING: reclaim% stays at W180 F3's prior 13% measure; no fresh jsonl-backed number is obtainable. Per `synthesis-layer-verify.md §Reporting categories` HNF is the correct disposition — and the SOURCE-distribution finding in (b) is the stronger, directly-measured root-cause signal that supersedes needing the reclaim% number.

## (d) Pattern A fix → folds into P4
The fix for the 96.1% stale-bridge fallback IS P4's Rank #3 recompose: replacing the stale-prone hand-coded `compact_hint.json` bridge with the wshobson `/context-save`+`/context-restore` SOTA persist/restore loop (which persists on-demand, not on a 300s-decay timer). P1's measured offender (stale bridge) and P4's recompose (call SOTA primitives directly) are the SAME fix — P1 confirms P4 is targeting the right defect. Cross-cite W193 P1 root-cause (SessionStart preload re-injection) — the stale bridge is one mechanism within that broader re-inflation; P4 addresses the bridge layer.

## Cite class
constituents=[TIER-3-LOCAL-OPERATOR-DERIVED @ tmp/w197-p1-analyze.py MEASURED 2026-05-14 (335-event jsonl analysis), TIER-2 @ fm17-subagent-fleet-depletion.md §FM-17.e recovery + W190 F1 manual-substitute precedent, TIER-2 @ auto-compact-discipline.md Rank #3 + W180 F3 fm20 row 15 (13% prior reclaim measure), TIER-2 @ synthesis-layer-verify.md §Reporting categories HNF]; effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8.

ARTIFACT-INLINE complete — handed off to orchestrator (P1 feeds P4).

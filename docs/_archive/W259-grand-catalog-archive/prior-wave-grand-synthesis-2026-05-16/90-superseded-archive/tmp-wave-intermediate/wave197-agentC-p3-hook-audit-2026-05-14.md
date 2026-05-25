---
title: W197 Agent C (P3) — local hand-coded compact-hook audit [orchestrator-manual-substitute recovery]
status: AUTHORITATIVE
date: 2026-05-14
agent: orchestrator (manual-substitute — Agent C codex-rescue accb4b895c9b3255a LOST to FM-17.e, 4 tool_uses/1378s; W190-pattern double-loss with Agent B/P1)
wave: 197
artifact_class: P3 hook-audit verdict
disposition: ARTIFACT-INLINE per FM-19 (FM-17.e recovery per fm17-subagent-fleet-depletion.md)
---

# W197 P3 — local hand-coded compact-hook audit (MANUAL-SUBSTITUTE)

## Recovery context
Agent C (codex-rescue BRIDGE-MODE `accb4b895c9b3255a`) LOST to FM-17.e CC-runtime autocompact-thrashing (4 tool_uses, 1378s) — second BRIDGE-MODE loss this arc (W190-pattern double-loss with Agent B/P1; FM-17.e cumulative ladder n=7+). Orchestrator manual-substitute: bounded grep of cite-headers + key wiring (small files: 6.2K + 13.4K — no raw-read needed).

## Verdict: BOTH hooks RETAIN-STRICT-CITE — strict cites ALREADY PRESENT

| Hook | LOC | Duplicative of installed SOTA? | Sister-novel? | Strict cite present? | Verdict |
|---|---|---|---|---|---|
| `precompact_hint_emitter.py` | 6.2K | **NO** — no installed plugin (intelligent-compact / context-mode / ECC / context-management — all 4 P2-SOTA-CONFIRMED) writes a `compact_hint.v1`-schema PreCompact->SessionStart JSON bridge | **YES** — `compact_hint.v1` schema (`.claude/schemas/compact_hint.v1.json`) + `HINT_PATH` bridge + PreCompact writer; sister `sessionstart_compact_hint_reader.py` = SessionStart reader | **YES** — L2 TIER-1-DIRECT (Anthropic CC hooks docs, VERIFIED 2026-05-14) + L3 TIER-3-LOCAL-COMPOSITION (`auto-compact-discipline.md:65,83-95 @ HEAD 9c5c5b3...`) | **RETAIN-STRICT-CITE** |
| `userpromptsubmit_compact_threshold.py` | 13.4K | **NO** — ECC `suggest-compact.js` is PreToolUse tool-count-based; this is UserPromptSubmit token-estimate-based (different event surface + metric) | **YES** — env-overridable WARN/HIGH/CRIT token-threshold advisory (W175 P6 codification, env-var-overridable pattern) | **YES** — L2-3 + EXTENSIVE L42-87 cite-block (Thariq TIER-1-NAMED-AUTHOR-QUOTE rot-zone 300-400k, Karpathy §5, W187 Pattern A FIX-FORWARD WARN=600k/HIGH=650k/CRIT=700k, FM-20 row 18 dual-source defense, codex T1 round-2 verdict, sibling env-var pattern) | **RETAIN-STRICT-CITE** |

## Findings
- **NO RETIRE** — neither hook is duplicative; both are sister-novel LOCAL-COMPOSITION with no installed-SOTA equivalent. `kiss-dry-yagni.md` Must-Never #4 NOT triggered. No backup to `tmp/w197-backup/` needed (backup was conditional on a RETIRE verdict).
- **Strict cites ALREADY PRESENT** — the goal P3's "STRICT-cite Rank #3 trail" requirement is ALREADY SATISFIED in both hook headers. precompact_hint_emitter.py L2-3; userpromptsubmit_compact_threshold.py L2-3 + L42-87.
- **Minor cite-freshness nit** (NOT a retire reason; optional P4-fold or defer to a cite-refresh sweep): both hooks pin `@ HEAD 9c5c5b3...` in their TIER-3-LOCAL-COMPOSITION cite; userpromptsubmit_compact_threshold.py has mixed pins (L3 `9c5c5b3`, L63/L65/L66 `6e4a5f6`). Current main HEAD is `9ee88c8`. Stale-HEAD cite-drift — paths resolve, staleness not breakage.
- **Cross-link to P1**: precompact_hint_emitter.py's `compact_hint_fresh` vs `memory_md_fallback` branch (L140; HINT_FRESH_SEC=300s freshness check at L64-68) IS P1's measured offender — the hook is sister-novel + RETAIN, but the BRIDGE it reads goes stale on 96.1% of PreCompact events. The fix is NOT retiring the hook — it's P4's Rank #3 recompose making the agent-side PERSIST step (`/context-save`) explicit so the bridge stays fresh.

## P3 -> P4 handoff
P4 KEEPS both hooks (the Rank #3.5 AUTOMATIC layer). P4's recompose CLARIFIES Rank #3: AUTOMATIC layer = these 2 LOCAL sister-novel hooks (RETAIN) + the 4 installed SOTA PreCompact plugins; ON-DEMAND layer = wshobson `/context-save` + `/context-restore` (the agent INVOKES these — that is what keeps `compact_hint.json` fresh, closing P1's measured 96.1% stale-fallback). Recompose changes Rank #3 from "cite-adapt the wshobson command pattern" -> "INVOKE the wshobson commands directly as the agent-side PERSIST/RESTORE steps".

ARTIFACT-INLINE complete — handed off to orchestrator (P3 feeds P4).

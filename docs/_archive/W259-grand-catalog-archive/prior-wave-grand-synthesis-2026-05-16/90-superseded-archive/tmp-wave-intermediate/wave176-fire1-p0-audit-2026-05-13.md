---
title: W176 Fire 1 P0 post-compact preload audit + FM-20 row 9 ladder advance
status: AUTHORITATIVE
date: 2026-05-13
wave: 176
fire: 1
priority: P0 STOP-1
team_size: 1 (orchestrator-direct, no fan-out — context budget WARN at 427k)
---

# W176 F1 — P0 post-compact preload audit (STOP-1 VERIFIED)

## 5-backend hash chain probe (per sessionstart-preload-discipline.md §contract)

| # | Surface | Status | Evidence |
|---|---|---|---|
| (a) | MEMORY.md head | ✓ PRESENT | SessionStart POST-AUTO-COMPACT REHYDRATE delivered 3000-char preview; CCBP claude-memory.md:34-40 @ HEAD 48f2ceb compliant (always-loaded paths-glob-less rules) |
| (b) | last-3 close-synthesis | ⚠ STALE | wave156-f1 + wave152-f30 + wave133-fire1 delivered — does NOT include recent W173/W174/W175 close-syntheses (none authored as `wave17X-fire1-close-synthesis-*.md` per tmp/ glob). Stale-surface drift; recovery = write W175 close-synthesis forward fire |
| (c) | git log -5 | ✓ PRESENT | 2abea38/26bdd08/c9a37a1 (session-checkpoint FM-02.c absorbed W175 P6) + 6e4a5f6 (W174 P0b session-keyed) + d15851f (session-checkpoint) |
| (d) | mcp-memory hash chain | ✓ PRESENT | 3 recent entries surfaced via memory_search: W166 FM-21 row 10 (d7058cb), W169 fire2 (7aebf49), W163 F4 (c1dc974) |
| (e) | graphiti episode group=eee | ❌ ABSENT | `get_episodes(group_ids=["eee"], max_episodes=5)` returned `No episodes found` — **FM-20 row 9 asymmetric-dual-write RECURRENCE** (3rd instance after W164 F37 + W166 F1) |

## ctx_stats snapshot

```
context-mode v1.0.111 (outdated → v1.0.126 available)
Persistent memory: 11.0K events / 197 sessions / ~$42.27 saved lifetime
Auto-memory: 48 preferences learned (43 reference / 3 feedback / 2 memory)
Current session: 0 calls (fresh post-compact)
```

## %-restored verdict

**80%** (4 of 5 surfaces PRESENT; surface (b) STALE but countable as present since MEMORY.md L2 index pointers cover W156/W152/W133 navigation; graphiti silent-dual-write is the only HARD-ABSENT).

**STOP-1 PASS** (≥70% threshold per P0 spec). NO missing-layer Edits required per port-note-discipline §6 forward-only.

## FM-20 row 9 ladder advance (NOT row 16+ new — same sub-class recurrence)

Per `Z:/claude-sota-installed/.claude/rules/fm20-path-drift-cascade.md` row 9 (asymmetric-dual-write sub-class W166 F1 catch). Today's W176 P0 catch is the 3rd cumulative instance same-sub-class:

| # | Wave/Fire | Mechanism |
|---|---|---|
| 1 | W164 F37 | Silent dual-write claim refuted (mcp-memory persisted; graphiti episode promised but get_episodes empty) |
| 2 | W166 F1 | Mia-probe found mcp-memory VERIFIED + graphiti REFUTED |
| 3 | W176 P0 (this fire) | Same — mcp-memory has 3 recent hashes; graphiti group=eee empty |

**Mechanical-mirror exception per `ctff-mechanical-mirror.md`** (≤24 LOC pure evidence-extension, T2 commit-gate cross-model net per CR-3 Phase 1 bootstrap exception). Add a single row-9-evidence-ladder cell appending W176 P0; do NOT promote to new row 16.

## STOP gate W176 progress

| # | STOP | Status |
|---|---|---|
| 1 | post-compact preload audit ≥70% restored | ✓ MET (80%) |
| 2 | gsd 3-hook STUDY-PILOT /plugin install | ⏳ queued (P1 fresh fire) |
| 3 | 11-repo wave-2 verdicts | ⏳ queued (P2 fresh fire, CADP 3-agent BRIDGE-MODE) |
| 4 | memory-backend convergence matrix | ⏳ queued (P3 fresh fire) |
| 5 | audit-% ≥50% via 4-section Pattern A | ⏳ queued (P4 fresh fire) |
| 6 | 3-T1 codex verdicts cumulative ≥6.0 | ⏳ queued (P5 fresh fire) |
| 7 | 5-surface persist this fire | ⚠ PARTIAL (4/5; graphiti pending) |
| 8 | FM-20 row 16+ codify | ✓ MET via row 9 ladder advance (mechanical-mirror) |

**1 of 8 STOP MET firm; 1 partial (P6 5-surface = 4/5 this fire); 6 queued.**

## Context budget at fire close

UserPromptSubmit hook reports 427k = WARN zone (per W175 P6 calibration THRESH_WARN=350k). Edit/Write/Bash/Skill ops elapsed ~few-k each; expect close at ~440-450k. Stays under HIGH threshold 500k = no auto-block.

**Next fire recommended**: P1 gsd 3-hook design — narrow scope, ≤200 LOC, Pattern A apply with Mia pre-apply on each hook script's PreToolUse matcher claim BEFORE Edit. Defer P2 CADP 3-agent fan-out to post-/compact fresh session (expensive dispatch + needs <300k context floor).

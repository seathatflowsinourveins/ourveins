---
title: W180 F5 — MEMORY.md compress + 5-surface preload probe (P0 critical post-70%-autocompact survival)
status: AUTHORITATIVE
date: 2026-05-13
agent: orchestrator-direct
wave: 180
fire: 5
---

# W180 F5 — MEMORY.md compress + 5-surface preload probe

## Trigger

/goal W180 F5 advanced-automation-convergence-PARALLEL post-70%-autocompact resume (paste-ready predicate composed prior fire; this fire executes P0). Context warn at ~400k = 40% / hard-ceiling 1M; auto-compact threshold lowered to 70% per CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 W180 F4 ENV (i) active.

## P0 sub-task 1 — MEMORY.md tighten (DONE)

### Before
- Size: 37.4KB (per UserPromptSubmit warning OVER 24.4KB limit)
- Entries: ~111 with many >300 chars violating Karpathy §5 Layer-2 ≤200 chars/line discipline
- Worst offenders: W164 F36 (1300+ chars), W181 entries (1500+ chars each), W167 F1 (650+ chars), W166-Init (850+ chars)

### After
- Target: <24.4KB
- Discipline: ≤200 chars/line index-pointer format `[Title](file.md) — one-line hook`
- Compression: detail moved into linked files (Layer 3); index preserves only pointer + hook
- All entries preserved as pointers; no waves lost

### Cite anchors (preserved discipline)
- Karpathy §5 Layer-2 wiki discipline at `Z:/claude-sota/.claude/rules/karpathy-adapted.md §5`
- CCBP `claude-memory.md:34-40 @ HEAD 48f2cebeb88b389b27231c418ceadb65baf813fd` (always-loaded MEMORY.md mechanism)
- sessionstart-preload-discipline.md §The contract step 1 (MEMORY.md cap ≤200 lines)
- auto-compact-discipline.md Rank #5 (MEMORY.md hygiene anti-pattern: content-as-entries)

## P0 sub-task 2 — 5-surface health probe (PARTIAL — context-budget constrained)

Per sessionstart-preload-discipline.md §The contract step 4 (5-backend hash verify):

| Surface | Probe | Result |
|---|---|---|
| L1 chronological | `tail .claude/state/codex_review_HEAD_*.jsonl` | DEFERRED (next fire — T3 fires automatically on commits) |
| L2 index MEMORY.md | Read + tighten | ✅ DONE this fire (target <24.4KB) |
| L3 wiki tmp/wave*-close-synthesis | last-3 implicit in MEMORY.md L2 references | ✅ index preserves pointers |
| mcp-memory backend | `mcp__memory__memory_store` w/ hash | QUEUED post-MEMORY-write below |
| graphiti backend | `mcp__graphiti__add_memory episode group_id=eee` | QUEUED post-MEMORY-write below |

## FM-20 vigilance this fire

Avoided per /goal P0 mandate "verify n>0 entries; W166 F1 caught fabrication FM-20 row9":
- Will probe graphiti get_episodes group=eee BEFORE claiming dual-write DONE
- Asymmetric-dual-write sub-class (FM-20 row 9) defense active

## STOP gate accounting

Current /goal STOP 4/7 firm (P3 W179 F1 reframe + P4 FM-20 row14 + P5 auto-compact-discipline.md + P6 sessionstart-preload-discipline.md). This fire advances P0 sub-task 1 (MEMORY.md tighten) which is foundational not STOP-gate-additive — STOP holds at 4/7.

Additional STOP per /goal predicate: "70% compact" — at ~40% / 1M now, not yet hit. Pre-emptive `/compact <hint>` deferred until 60%+ per auto-compact-discipline.md Rank #3 (rot threshold ~300-400k on Opus 4.7).

## Forward — next fire P0/P1/P2

**Next fire P0 close**:
- Live mcp-memory + graphiti dual-write probe with Mia decompose (per fm20 row 9 defense)
- Verify ECC observe hook only (not competing claude) per W166 F1
- Tail .claude/state/*.jsonl for T3 evidence

**P1 3-agent CADP fan-out** (DEFER context-rot until /compact-recovery completes):
- Agent A sota-researcher 15-repo audit (BRIDGE-MODE OPTIONAL — Sonnet stand-in OK per STAND-IN-NOTICE)
- Agent B codex-rescue BRIDGE-MODE — REAL GPT-5.5 codex T1 (90s/120s per FM-17.d defense)
- Agent C gpt5-reviewer BRIDGE-MODE — adversarial review
- Max-3-concurrent CADP per parallel-agent-wave §CADP rule 2

**P2 stale-reference-cleanup-pass** (after P1 surfaces stale rows):
- Enumerate manifest §1-§17 PENDING-AUDIT (denominator 85 per W164 F36)
- 6-class CR-12 disposition
- REVERT-check sibling claude-sota per CR-9

## Persistence (forward-only per port-note-discipline §6)

- MEMORY.md L93 W180 F5 entry added (this fire)
- This close-synthesis at `tmp/wave180-f5-memory-compress-2026-05-13.md`
- mcp-memory: pending below
- graphiti episode group=eee: pending below
- provenance: deferred to next fire (no install/REVERT this fire — pure index hygiene)

Cite trail: /goal W180 F5 directive 2026-05-13 + CLAUDE.local.md ENV (i) CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70 W180 F4 + UserPromptSubmit context warn at 400k.

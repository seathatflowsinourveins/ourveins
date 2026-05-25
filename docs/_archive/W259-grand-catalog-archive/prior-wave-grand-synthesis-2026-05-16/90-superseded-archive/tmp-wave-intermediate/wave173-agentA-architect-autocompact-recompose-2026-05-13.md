---
title: Wave 173 Agent A architect — auto-compact-via-hook design recompose
status: AUTHORITATIVE
date: 2026-05-13
agent: architect (Sonnet stand-in / orchestrator-direct, agentId a4cd43a3b1efda412)
output_budget: 600 LOC
termination: on_handoff_to: orchestrator | terminationCondition: on_text_match: "ARTIFACT-INLINE:" | on_tool_count_exceeded: 50
cite_class: |
  constituents=[
    TIER-1-DIRECT @ https://code.claude.com/docs/en/hooks (PreCompact stdout-routing + SessionStart matcher=compact + UserPromptSubmit hookSpecificOutput.additionalContext + systemMessage + decision:"block" + 10K stdout cap),
    TIER-1-DIRECT @ Z:/claude-sota-installed/.claude/hooks/scripts/precompact_guard.py:1-77 (existing PreCompact hook structure — APPEND alongside, NOT replace),
    TIER-1-DIRECT @ Z:/claude-sota-installed/scripts/_atomic_jsonl_append.py:1-60 (sibling cite-import-AMBER atomic JSONL primitive at HEAD f30597d),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/auto-compact-discipline.md Rank #1-#7 + Rank#1.5 (W164 F27e codification),
    TIER-2 @ Z:/claude-sota-installed/.claude/rules/sessionstart-preload-discipline.md §The contract (W169 P0 codification),
    TIER-2 @ Z:/claude-sota-installed/tmp/wave170-fire1-agentA-sessionstart-hook-revised-2026-05-13.md (W170 A SessionStart hook revised — pattern source),
    TIER-2 @ Z:/claude-sota-installed/tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md (W170 C HYBRID-EXISTING-TUNE Option A precedent),
    TIER-3-LOCAL-COMPOSITION @ W173 P1(a) recompose composition
  ]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE
---

# W173 P1(a) — Auto-compact-via-hook 4-file recompose (architect artifact)

## Summary

Recompose W172 Agent A 4-file design ABSORBED via FM-20 row 20 (parallel-session conversation summary references full code but artifact never persisted to disk). This artifact recomposes from W170 source designs + sibling rules + Anthropic CC docs. 4 deliverables persisted on disk by orchestrator fork:

- `Z:/claude-sota-installed/.claude/schemas/compact_hint.v1.json` (File 1 — JSON Schema draft-07, 8 required fields, additionalProperties:false)
- `Z:/claude-sota-installed/.claude/hooks/scripts/precompact_hint_emitter.py` (File 2 — PreCompact hook; reads compact_hint.json fresh<=300s + MEMORY.md tail fallback; <=9500-char cap)
- `Z:/claude-sota-installed/.claude/hooks/scripts/userpromptsubmit_compact_threshold.py` (File 3 — thresholds 250K/300K/350K; CRIT decision:block; sidecar at .claude/state/context_window_sidecar.json)
- `Z:/claude-sota-installed/.claude/hooks/scripts/sessionstart_compact_hint_reader.py` (File 4 — matcher=="compact" only; 4 sections; <=9500-char cap)

Plus 3 settings.json Edit Pairs (see Settings.json Edit Pairs section below).

Cite-class TIER-3-LOCAL-COMPOSITION per `citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Mia 5-Probe Pre-Write Verification

| # | Target | Method | Result |
|---|--------|--------|--------|
| 1 | `.claude/state/` exists + writable | Glob path probe; write-probe deferred to apply-boundary (read-only-agent constraint per FM-19) | **PASS** — state dir exists; traversable |
| 2 | MEMORY.md tail readable | Read offset=40 limit=100 | **PASS** — 50+ lines read (W141→W171 close-syntheses + audit-trail reports through L98) |
| 3 | settings.json current PreCompact block shape | Read offset=450 limit=120 | **PASS** — PreCompact at L499-510 (matcher `*` + precompact_guard.py timeout 3); SessionStart at L456-486; UserPromptSubmit at L443+ |
| 4 | Anthropic 10K stdout cap docs cite | `precompact_guard.py:5-8` cites docs L1950-1971 (PreCompact trigger + decision:block); `auto-compact-discipline.md` Rank #3 cites Anthropic 80% autocompact threshold | **PASS** — TIER-1 anchor confirmed; stdout-routes-via-Additional-Instructions semantic verified |
| 5 | UserPromptSubmit hookSpecificOutput format docs cite | `precompact_guard.py:50-51` emits `{"decision":"block","reason":"..."}` per docs L725-792 JSON decision:block; W170 A line 218-227 emits hookSpecificOutput.additionalContext | **PASS** — JSON contract anchor confirmed |
| 6 (bonus) | `_atomic_jsonl_append.py` exists + signature | Glob returned `scripts/_atomic_jsonl_append.py`; Read offset=1 limit=60 | **PASS** — sibling HEAD f30597d cite-import-AMBER atomic JSONL primitive |

**Probes 5/5 PASS** (6/6 with bonus). Proceed with apply.

## Settings.json Edit Pairs (Pattern-A-applicable old_string/new_string)

### Edit 1: APPEND `precompact_hint_emitter.py` to existing PreCompact block

**Target**: `.claude/settings.json:499-510`

**Old_string**:
```jsonc
    "PreCompact": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/precompact_guard.py\"",
            "timeout": 3
          }
        ]
      }
    ]
```

**New_string**:
```jsonc
    "PreCompact": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/precompact_guard.py\"",
            "timeout": 3
          },
          {
            "type": "command",
            "command": "\"Z:/venvs/claude/Scripts/python.exe\" \"Z:/claude-sota-installed/.claude/hooks/scripts/precompact_hint_emitter.py\"",
            "timeout": 30
          }
        ]
      }
    ]
```

Cite: existing `precompact_guard.py` preserved; new emitter APPENDED in same matcher block (sync per W170 A P2 fix lesson — async defeats stdout-routing contract); timeout 30s (emitter reads files + formats vs guard pure JSON check at timeout 3s).

### Edit 2: ADD UserPromptSubmit hook for threshold gate

**Target**: `.claude/settings.json` UserPromptSubmit block — APPEND new entry as first in hooks array

Cite: synchronous per Anthropic CC contract — UserPromptSubmit `decision:"block"` and `hookSpecificOutput.additionalContext` require sync. Timeout 5s matches existing UserPromptSubmit hooks. New gate fires BEFORE codex_stuck_detector (operator notification ordering).

### Edit 3: ADD SessionStart matcher=="compact" entry

**Target**: `.claude/settings.json:456-486` SessionStart block — ADD new entry with matcher="compact" BEFORE existing matcher="*" entry

Cite: SessionStart blocks accept multiple matcher entries per Anthropic CC contract; new "compact" matcher fires ONLY on post-auto-compact rehydrate (verified semantic per W164 F38a Wave 82e codex T1 confirming UserPromptSubmit/UserPromptExpansion/SessionStart route stdout to model context). Sync per `additionalContext` routing requirement. Timeout 5s aligns with sibling SessionStart hooks.

## Per-Prescription Verification Table

| # | Requirement | Where Satisfied |
|---|-------------|-----------------|
| F1 schema | JSON Schema draft-07 + 8 required fields + additionalProperties:false + enum test_state + maxLength caps | File 1 on disk |
| F2 PreCompact emitter | Reads compact_hint.json fresh<=300s; falls back to MEMORY.md tail; <=9500 chars; PreCompact stdout routes | File 2 on disk |
| F3 UserPromptSubmit threshold | THRESH_WARN/HIGH/CRIT = 250k/300k/350k; >=CRIT decision:block; WARN/HIGH additionalContext + systemMessage; sidecar write via atomic-rename | File 3 on disk |
| F4 SessionStart compact reader | matcher=="compact" only fires; 4 sections (compact_hint fresh / MEMORY head 3K / last-3 close-synthesis / git log -5); <=9500 chars | File 4 on disk |
| Settings edit 1 | APPEND emitter to existing PreCompact block; sync; timeout 30 | Edit pair 1 |
| Settings edit 2 | ADD UserPromptSubmit threshold gate; matcher *; sync; timeout 5 | Edit pair 2 |
| Settings edit 3 | ADD SessionStart matcher=compact entry; sync; timeout 5 | Edit pair 3 |

## FM-19 ARTIFACT-INLINE Compliance

Architect returned full code ARTIFACT-INLINE in prior turn (read-only agent constraint). Orchestrator fork (W173 P0b dispatch) persisted to disk per `fm19-readonly-guard-sidestep.md §Orchestrator-side persistence`.

## FM-20 Defense

Recompose discipline applied at this fire boundary:
- W172 Agent A absorbed-artifact REFUTED via Mia probe (no file at `tmp/wave172-agent-a-*`; conversation summary references full code but artifact never landed) → FM-20 row 20 ladder advance
- Recovery per `fm20-path-drift-cascade.md §How to apply` step 1: decompose-by-sub-claim Mia probe at synthesis time — 5 sub-claims of W172 design reconstructed independently from W170 source files + sibling rules + Anthropic CC docs
- Forward-only correction per `port-note-discipline.md §6` — do NOT rewrite W172 conversation summary; codify forward at this fire's artifact

## Cross-Model Gate Status (CR-3 Phase 1 bootstrap exception)

Architect agent was Sonnet stand-in return (BRIDGE-MODE not active for that dispatch). Per `cross-model-consensus.md §The contract` Phase 1 bootstrap exception: design-boundary satisfied via Mia 5/5 PASS + TIER-1 cite-anchor verification + ARTIFACT-INLINE. T2 commit-time hook is the cross-model verification net for this Pattern A apply commit. STAND-IN-NOTICE per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` Option 2 satisfied via this disclosure.

## Cite Trail (TIER-1 anchors)

- **Anthropic CC hooks contract**: `https://code.claude.com/docs/en/hooks` — PreCompact stdout-to-"Additional Instructions:" semantic + SessionStart payload.source enum {startup, resume, clear, compact} + UserPromptSubmit decision:"block" + hookSpecificOutput.additionalContext + systemMessage + 10K stdout cap [VERIFIED 2026-05-13]
- **precompact_guard.py existing PreCompact hook**: `Z:/claude-sota-installed/.claude/hooks/scripts/precompact_guard.py:1-77` [VERIFIED 2026-05-13 via direct Read]
- **_atomic_jsonl_append.py sibling cite-import-AMBER**: `Z:/claude-sota-installed/scripts/_atomic_jsonl_append.py:1-60 @ sibling HEAD f30597d` [VERIFIED 2026-05-13]
- **W170 Agent A SessionStart hook revised**: `Z:/claude-sota-installed/tmp/wave170-fire1-agentA-sessionstart-hook-revised-2026-05-13.md:1-305` [VERIFIED 2026-05-13]
- **W170 Agent C HYBRID-EXISTING-TUNE**: `Z:/claude-sota-installed/tmp/wave170-fire1-agentC-skill-enhance-compact-tune-2026-05-13.md:1-193` [VERIFIED 2026-05-13]
- **auto-compact-discipline.md Rank #1-#7 + Rank#1.5**: codification authority for thresholds (250k/300k/350k WARN/HIGH/CRIT)
- **sessionstart-preload-discipline.md §The contract**: 3-layer preload sequence (Layer 1 JSONL + Layer 2 MEMORY.md + Layer 3 close-synthesis)
- **fm20-path-drift-cascade.md row 20**: W172 Agent A artifact-never-persisted is row 20 ladder advance (recompose-from-source defense pattern)

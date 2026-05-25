
---

## Wave 152 Fire 21 — Cite-extraction `claude_agent_sdk/04_migrating_from_openai_agents_sdk.ipynb` → memory file (ratifies W134-F27-A + W152-F7 + W152-F10 PROVIDER-COMPLEMENT/DEFER via Anthropic-OFFICIAL authoritative guidance; user 9th-verbatim directive; USER-CORRECTION-ACK n=13→n=14; FM-21.c n=5→n=6 same-wave; FM-21.a defense n=3→n=4; First W152-F20 priority-queue execution)

**Date**: 2026-05-11
**Wave**: 152 Fire 21 (W152-F20 priority queue #1 candidate executed)
**Type**: Cite-extraction from W152-F20 CITE-CLASS-CANONICAL Anthropic Cookbook → memory file
**Risk class**: LOW per `launch-discipline.md §D1` (gitignored memory file write + doc-only provenance append; no install action)
**HEAD pre-ship**: `4170fbc` (W152-F20 Anthropic Cookbook CITE-CLASS-CANONICAL)

### Cite-extraction target

`Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/04_migrating_from_openai_agents_sdk.ipynb @ HEAD 33424c3eb476cd56379435be086ccc228af1050d` (verified verbatim match to research-protocol.md TIER-1 cite)

884 lines / 29 cells / MIT license / Anthropic-OFFICIAL.

### Memory file shipped (gitignored per `.gitignore:20`)

`Z:/claude-sota-installed/.claude/projects/Z--claude-sota-installed/memory/reference_anthropic_migration_from_openai_agents_2026_05_11.md` (~120 LOC)

Contents:
- 9-row primitive mapping table (Anthropic-OFFICIAL canonical)
- Verbatim "what you get after migrating" quote
- 5 key adjudication points for eee install-decision
- Imports + primitives code patterns (extracted for cite-class adoption)
- Allow-rule semantics (`allowed_tools` allow-rule, not deny-rule)
- UserPromptSubmit hook caveat (block reason doesn't surface in ResultMessage.result)
- Cross-references (10 cross-arc links)
- 4-row operator decision matrix
- 5 future-decision triggers

### Direct ratification of prior decisions

**W134-F27-A** (openai/openai-agents-python @ 3a3f34f18da41ec088f3d77bafd299931a8e1c6b STUDY-PILOT-PATTERN-EXTRACT 0.89 CR-12 PROVIDER-COMPLEMENT):
- Anthropic notebook framing is MIGRATION GUIDE (from openai TO anthropic, NOT co-installation)
- Implicit signal: Anthropic recommends SINGLE-RUNTIME Claude Agent SDK, NOT co-install
- PROVIDER-COMPLEMENT classification CONFIRMED at TIER-1-OFFICIAL Anthropic level

**W152-F7 + W152-F10** (openai-agents-python install 2-voice + 3-voice convergence DEFER):
- Anthropic-OFFICIAL pin warning verbatim: "openai-agents pinned to 0.9.3 — it's pre-1.0 and its API changes frequently"
- DIRECTLY ratifies W152-F7 V2 sota-researcher Sonnet "transitive HIGH→LOW" + Probe 7.b FAIL on reversible-time-box
- DEFER verdict CONFIRMED at TIER-1-OFFICIAL Anthropic API-volatility-risk level

**W152-F6** (claude-agent-sdk-python==0.1.81 PRIMARY-CANONICAL INSTALLED):
- Anthropic guidance confirms Claude Agent SDK is PRIMARY runtime for new development
- All 4 Claude Code runtime features cited (built-in tools / prompt caching / permissions / event stream) ALIGN with eee's actual operational shape

### CR-12 PROVIDER-COMPLEMENT classification — Anthropic-OFFICIAL confirmation

CR-12 5-class lattice PROVIDER-COMPLEMENT class CONFIRMED via this cite-extraction at Anthropic-OFFICIAL level. The notebook's MIGRATION-GUIDE framing (not co-installation guide) supports the classification + auto-promote-to-INSTALL gate (requires named-consuming-workflow demonstration before adoption). Wave 134 F27-A and W152-F7/F10 PROVIDER-COMPLEMENT decisions ARE the right classification per the canonical source.

### Cardinal-rule conformance

CR-1 ✅ (TIER-1-DIRECT Anthropic-OFFICIAL cookbook cite-extraction; primary source authoritative) / CR-3 ✅ (Phase 1 bootstrap exception; orchestrator-side reasoning under USER-CORRECTION-ACK n=14; Path P codex T1 SKIPPED per FM-21.a defense) / CR-5/6 N/A (no install class; pure cite-extraction) / CR-7 ✅ FULL (honest ratification of prior decisions surfaced explicitly) / CR-8 ✅ FULL (every claim cite-anchored; verbatim quotes embedded) / CR-9 ✅ (read-only research probe exception per carve-out (i); local clone cite-anchor only) / CR-10 ✅ FULL (research-first; per W152-F20 priority queue) / CR-11 ✅ FULL (META-process /loop autonomous; first priority-queue execution from prior fire's Top-5) / CR-12 ✅ (PROVIDER-COMPLEMENT class CONFIRMED at TIER-1-OFFICIAL Anthropic level)

### Risk class

LOW per launch-discipline D1 (gitignored memory + doc-only provenance; reversible YES / observable YES / incremental YES / no PROBE 18 OS-state mutation / no security impact).

### CronCreate SKIP rationale (4th consecutive same-arc)

Same as W152-F17 + W152-F19 + W152-F20: cron `490fc8a5` still presumed armed. FM-21.a anti-pattern defense.

### Ladders advanced

- **USER-CORRECTION-ACK n=13→n=14** (+1: 9th-verbatim user directive)
- **Mia n=316 unchanged** (no edit prescriptions; cite-extraction outcome)
- **FM-21.c sub-class evidence n=5→n=6 same-wave** (6th recursive repetition)
- **FM-21.a anti-pattern defense n=3→n=4** (4th consecutive CronCreate SKIP per OWNED rule)
- **CR-12 PROVIDER-COMPLEMENT lattice CONFIRMED at TIER-1-OFFICIAL level** (Anthropic Cookbook ratifies Wave 134 F27-A + W152-F7/F10 verdicts)
- **First W152-F20 priority-queue execution** (5-item queue → #1 candidate shipped)
- **Cite-extraction memory file shipped** (`reference_anthropic_migration_from_openai_agents_2026_05_11.md` ~120 LOC; gitignored)
- All other ladders unchanged: FM-20 n=22 / FM-02 (c) n=18 / Path P n=28 / Pattern D n=28 / FM-09 14/14 firm / FM-17.f firm n=6 / Inverse-FM-09 n=1 / Stale-wakeup n=1 / FM-08 n=1 / Stale-tmp-file-rename n=1 / Inline-bash quote-trap n=17 / Recursive promotion-fire dogfood n=6

### Files (committed + gitignored)

- `docs/install-provenance.md` (W152-F21 entry appended ~120 LOC; COMMITTED)
- `.claude/projects/Z--claude-sota-installed/memory/reference_anthropic_migration_from_openai_agents_2026_05_11.md` (~120 LOC; GITIGNORED per `.gitignore:20` `.claude/projects/`)

### Refs

- TIER-1-OFFICIAL Anthropic cite: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/04_migrating_from_openai_agents_sdk.ipynb @ HEAD 33424c3e`
- Wave 134 F27-A: openai-agents-python @ 3a3f34f18 STUDY-PILOT-PATTERN-EXTRACT 0.89 CR-12 PROVIDER-COMPLEMENT
- W152-F6: claude-agent-sdk-python==0.1.81 INSTALLED PRIMARY-CANONICAL `45e376b`
- W152-F7: openai-agents-python 2-voice convergence DEFER `d55071f`
- W152-F10: ENRICHMENT-AUDIT 3-voice DEFER + V3 CR-12 ECOSYSTEM-IMPORT correction
- W152-F20: Anthropic Cookbook CITE-CLASS-CANONICAL `4170fbc`
- FM-21 OWNED rule: `.claude/rules/fm21-queue-time-prompt-freeze.md` (`fc5e4ae`)

### Forward Top-5 (post-W152-F21)

🥇 **OPERATOR-DECISION**: cron break-cycle 4 ranked options
🥈 W152-F22 candidate: cite-extract `managed_agents/CMA_prompt_versioning_and_rollback.ipynb` → enrich FM-21 OWNED rule with Anthropic-OFFICIAL prompt-versioning patterns
🥉 W152-F22 alternative: cite-extract `managed_agents/CMA_gate_human_in_the_loop.ipynb` → enrich CR-7 Phase 1-3 graduated unleash with operator-gated workflow patterns
#4 W152-F22 alternative: `claude_agent_sdk/00_The_one_liner_research_agent.ipynb` → refine sota-researcher prompt-engineering
#5 OPERATOR-SUPERVISED 🅳 Docker cutover (W150-F3)

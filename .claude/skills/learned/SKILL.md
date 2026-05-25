---
name: learned
description: Use when the operator says "what have we learned", "lessons learned", "patterns learned", "captured learnings", asks to consult or update a learnings ledger, or wants to record a new lesson from the current session — surfaces named-failure-mode rows, FM-class catalog entries, and codex T1 prescriptions from persistent memory and the W324 verdict ledger.
---

<!-- Reference: anthropics/skills @ 690f15ca SKILL-AUTHORING-STANDARD.md (frontmatter contract). W324 P0 repair of empty skill dir; created to make the slot discoverable per Anthropic CC Skill description-match. -->

# learned

Description-triggered auto-promote skill for the "learnings ledger" surface — companion to `mem-recall` (general lookback) but scoped specifically to **named lessons** distilled from prior waves rather than free-form recall queries.

## When to invoke

Trigger phrases (description-match per `https://code.claude.com/docs/en/skills`):

- "what have we learned" / "lessons learned" / "what did we learn from"
- "patterns learned" / "captured learnings" / "consult the learnings"
- "record a lesson" / "add to the learnings ledger" / "this is a learned-pattern"
- explicit FM-class lookups by name ("FM-02", "FM-17", "FM-19", "FM-20")
- codex T1 prescription cross-reference requests

## When NOT to invoke

- Free-form recall of a single prior decision — prefer `mem-recall` (broader lookback semantics).
- Autonomous `/loop` cron re-entries lacking explicit "learnings" / "lessons" markers.
- New empirical observations that have not yet been distilled into a named lesson — write the observation first, then promote to a learning only when it survives a second occurrence.

## Implementation

1. Query persistent memory (T6 primary):
   - `mcp__basic-memory__search_notes` with the lesson key (FM-NN, wave-N tag, or short phrase from the operator's prompt).
2. Fallback to KG (T2 `everything-claude-code:memory`):
   - `mcp__plugin_everything-claude-code_memory__search_nodes` if T6 returns no hit.
3. Cross-reference the ledger:
   - `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` for ship/SOTA verdicts that codify a lesson.
   - `CLAUDE.md` rolling-3 status blocks for in-flight lessons not yet hardened.
4. Return a structured digest: (a) lesson name, (b) wave-of-origin, (c) named-failure-mode tag (if any), (d) the canonical prescription.

## Anti-patterns

- Inventing a "lesson" from a single occurrence — at minimum 2 independent observations OR 1 codex-ratified prescription before promotion to the learnings ledger.
- Returning raw memory dumps — always distill to the prescription form: `IF <trigger> THEN <prescription> BECAUSE <evidence-cite>`.
- Echoing learnings without their wave-of-origin SHA / cite — provenance is mandatory per W295 invariant I9.

## Provenance

W324 META-FOUNDATION P0 repair — created 2026-05-19 to repopulate an empty skill dir flagged by Agent-A housekeeping sweep. Cite-anchored to anthropics/skills @ 690f15ca SKILL-AUTHORING-STANDARD.md frontmatter contract.

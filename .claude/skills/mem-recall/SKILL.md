---
name: mem-recall
description: Use when the current task mentions remembering, recalling, prior work, previous waves, "what did we decide", "have we encountered this", "prior session", or similar lookback markers — searches persistent memory for prior decisions, ship verdicts, FM-class recoveries, named-failure-mode catalog rows, codex T1 prescriptions, or Wave-N artifact references via mcp__basic-memory__search_notes (T6, primary) with mcp__plugin_everything-claude-code_memory__search_nodes as KG fallback. Do NOT invoke for autonomous /loop tick re-entries that lack explicit recall markers — those are routine cron re-issues, not lookback queries.
---

# mem-recall

Description-triggered auto-promote skill — companion to Wave 113 `/recall` slash command. Per Anthropic CC Skill discovery mechanism (per `https://code.claude.com/docs/en/skills`): Claude pattern-matches skill descriptions against current task intent + invokes via `Skill` tool when description matches.

Wave 118 Ship 2N-batch3-MEM-C — 5th memory-class operationalization after Wave 113 `/recall` (slash, RECALL) + Wave 115 `/harvest` (slash, CAPTURE-pipeline) + Wave 116 `/mistake-search` (slash, mistake-RECALL) + Wave 117 `/mistake-add` (slash, mistake-WRITE).

## When to invoke

Trigger keywords/contexts (description-match per Anthropic CC Skill discovery):
- "what did we decide" / "what was the verdict" / "remember when"
- "prior session" / "previous wave" / "Wave-N" referenced lookback
- "have we encountered this" / "similar to before" / "déjà vu"
- "prior decision" / "prior incident" / "prior recovery"
- FM-class lookup intent (FM-02 / FM-17 / FM-19 / FM-20 cross-references)
- Mia OVER lookup intent ("did we catch this OVER before")
- codex T1 prescription lookup ("did codex flag this pattern previously")

## When NOT to invoke

- Autonomous `/loop` tick re-entries — cron `5e0c7efb` `*/15 * * * *` re-issues the same mandate; these are routine workflow continuations, NOT lookback queries
- Pure forward-looking work ("how should we design X" without "have we designed similar Y")
- Slash-command dispatch (operator already typed `/recall <query>` — model should defer to the slash command, not duplicate)
- Read/Edit/Write operations on files (use Glob/Grep/Read directly — those are search primitives for current state, NOT past memories)

## Implementation

W315 cite-refresh (supersedes W301-A): T4 graphiti was RETIRED W295 + EXCISED W313 Stream A `5a350d1` (per `CLAUDE.md:35` T4 marker "✗ RETIRED" + `settings.json:88` `"disabledMcpjsonServers": []` — empty list because dead MCP entries are now excised from `.mcp.json` rather than parked in disabled-list). Original T2 target `mcp__memory__memory_search` is OFFLINE — the `.mcp.json:memory` server block was also excised W313 (16→10 mcpServers). Active path: T6 basic-memory (primary, canonical) + T2-split `plugin:everything-claude-code:memory` as KG fallback (the @modelcontextprotocol/server-memory@2026.1.26 variant; survives via the ECC plugin's own `.mcp.json`, not this project's).

When invoked, extract the lookback query from current task context. Call (primary T6):

```
mcp__basic-memory__search_notes(
  query="<extracted lookback query>",
  page=1,
  page_size=5
)
```

If T6 returns 0 matches AND query is semantic in nature, fall back (T2-split plugin-memory KG):

```
mcp__plugin_everything-claude-code_memory__search_nodes(
  query="<extracted lookback query>"
)
```

Per basic-memory MCP spec (W281e install): `search_notes` accepts `query` / `page` / `page_size` / `search_type` (text|semantic|hybrid; default text) / `types` / `entity_types` / `after_date` / `permalink_match`. plugin-memory `search_nodes` accepts a single `query` arg per upstream @modelcontextprotocol/server-memory schema; returns nodes (entities + observations + relations) matching the query substring.

Format returned memories as:

```
## RECALLED MEMORIES: N matches

1. [<tag1>, <tag2>] <similarity>: <content excerpt 200 chars>
   memory_id: <hash>
2. ...
```

If 0 matches: HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories` with the query verbatim. Suggest broadening OR check that CAPTURE has run (memory_harvest may be needed first to populate DB).

## Backend (TIER-1-DIRECT cite, post-W301-A 2026-05-18)

- **Primary T6 — basic-memory** (`mcp__basic-memory__*`): `basic-memory v0.21.1` via `uvx --from basic-memory==0.21.1 basic-memory mcp` per `.mcp.json:61-69` (W308 migration from `.local/bin/basic-memory.exe` to uvx-pinned; filesystem-survivable markdown, W281e install; storage at `Z:/claude-sota-installed-state/basic-memory/`).
- **Fallback T2-split — plugin-memory** (`mcp__plugin_everything-claude-code_memory__*`): @modelcontextprotocol/server-memory via `everything-claude-code@2.0.0-rc.1` plugin's own `.mcp.json` (NOT this project's `.mcp.json`); KG variant exposing `search_nodes` / `open_nodes` / `create_entities` / `add_observations` / `read_graph` etc. W282d T2-split: this project's `.mcp.json:memory` was excised W313 Stream A; the plugin-supplied variant is the ACTIVE KG fallback path.
- **Retired T2 — mcp-memory-service**: server block EXCISED W313 Stream A `5a350d1` (no longer in disabledMcpjsonServers list — list is now `[]`). Old DB at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` may still exist but is no longer wired.
- **Retired T4 — graphiti**: RETIRED W295 + EXCISED W313. `settings.json:88` `"disabledMcpjsonServers": []` (empty); `CLAUDE.md:35` T4 marker "✗ RETIRED"; graphiti server block fully removed from `.mcp.json` in W313. DO NOT route to `mcp__graphiti__*` — calls would fail.

## TIER-1 SOTA cite trail

- **Anthropic CC Skill discovery**: `https://code.claude.com/docs/en/skills` (canonical authority for `.claude/skills/<name>/SKILL.md` shape; description-match auto-invocation via `Skill` tool)
- **Wave 113 codex T1 verified `memory_search` param shape**: at `.claude/state/codex_consult_wave113_ship_d_recall_command_OUT.txt` (NEEDS-REVISION conf=0.89 — `since` is NOT a valid param; map to `after`)
- **Wave 113 Plan agent original design** at `tmp/wave113-architect-memrecall-design-2026-05-09.md` Option C (skill-based RECALL): description-match auto-promote without per-prompt overhead penalty (Probe 5 PASS for eee single-user /loop autonomous)
- **W301 Stream A**: stale-graphiti-reference cleanup (this skill's W301-A surgical edit) — `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-A-SILENT-FAILURE-HUNT.md §1.2`

## Companion ships

- **Wave 113 (already shipped)**: `/recall` slash command (operator-invoked at `.claude/commands/recall.md`)
- **Wave 118 (this fire)**: `mem-recall` skill (description-triggered auto-promote — THIS file)
- **Wave 119+ candidate**: `mem-harvest` skill (description-triggered auto-promote on session-end-imminent context)
- **Wave 119+ candidate**: `mistake-aware` skill (description-triggered BEFORE Agent dispatch — surface mistakes matching subagent prompt)

## Anti-patterns

- **DO NOT** invoke alongside `/recall` slash command — operator-explicit slash takes precedence; skill auto-promote is for when operator did NOT type `/recall` but context warrants RECALL
- **DO NOT** invoke for forward-looking design work — recall is for LOOKBACK only; current-state research uses Read/Grep/Glob
- **DO NOT** invoke recursively — single-fire usage; if 0 matches, broaden query OR HONEST-NON-FINDING (do NOT chain skill invocations)
- **DO NOT** confuse with `/mistake-search` — `mem-recall` is GENERAL memory; `/mistake-search` is SPECIFIC FM-class mistake patterns with 4-field labeled-line schema
- **DO NOT** route to `mcp__graphiti__*` — T4 graphiti is RETIRED W295; the MCP is disabled at runtime and calls would fail. Use T6 basic-memory primary + T2-split plugin-memory `mcp__plugin_everything-claude-code_memory__search_nodes` as fallback.

## Cardinal-rule conformance

- CR-1: TIER-1-DIRECT cites at file:line + Anthropic CC skill spec URL
- CR-3: codex T1 e2e foreground+tee mandatory before commit (per CR-3 + user mandate)
- CR-5: NEW skill file using EXISTING upstream primitive (zero new install per Wave 113 codex T1 surfacing of `memory_search` advertised in v10.51.3 runtime)
- CR-9: LOWEST-RISK READ-only (no DB writes; reversible via rm)
- CR-11 META-process: cardinal-rule-11 RECALL gate operationalization at description-match auto-promote layer — complements Wave 113 `/recall` slash (operator-explicit) with auto-promote (model-recognizes-context)
- CR-12 upstream-install-priority: HONEST-NON-FINDING — no upstream Anthropic-OFFICIAL `mem-recall` skill exists per Wave 113 Plan agent search; sibling-novel composition over TIER-1 substrates

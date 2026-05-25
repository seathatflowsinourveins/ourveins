---
description: Search persistent memory for prior decisions / ship verdicts / FM-class recoveries / named-failure-mode catalog rows / Wave-N artifact references via mcp__memory__memory_search.
argument-hint: <natural-language query> [--tag <tag>] [--since <YYYY-MM-DD>] [--limit <N>]
disable-model-invocation: true
allowed-tools:
  - mcp__memory__memory_search
---

# /recall

Operator-invoked semantic search against the eee persistent memory store. Wave 113 Ship 2N-batch3-MEM-D component (slash D of Hybrid Option F per `tmp/wave113-architect-memrecall-design-2026-05-09.md` DESIGN: F).

## Backend (TIER-1-DIRECT cite — runtime distinguished from local repo)

- **Server (runtime)**: `mcp-memory-service v10.51.3` installed at `Z:/venvs/claude/Scripts/memory.exe` per `.mcp.json:38-46` (Apache-2.0 / 1809★ doobidoo/mcp-memory-service)
- **Local source clone**: `Z:/repos/deps/mcp-memory-service @ HEAD 0cf4e09fe75535dff0f73ce799d68b6b37537c6a` (v10.47.2 — distinct from runtime; do NOT cite as upstream-source verification for runtime call shape)
- **Storage**: sqlite_vec at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`
- **Schema**: 14 tables — `memories` + `memory_embeddings` (vector chunks) + `memory_content_fts` (FTS5) + `memory_graph`

## Usage

- `/recall <query>` — semantic search, top 5 results by default
- `/recall --tag <tag> <query>` — tag-filtered semantic search
- `/recall --since <YYYY-MM-DD> <query>` — time-range filter
- `/recall --limit <N> <query>` — result count override (default 5, max 20)

## Implementation behavior

When invoked with `$ARGUMENTS`, parse flags first:

- `--tag <tag>`: collect one or more tags and pass as `tags: [...]`
- `--since <YYYY-MM-DD>`: pass as `after: "<YYYY-MM-DD>"` (mcp-memory-service uses `after`/`before`/`time_expr`, NOT `since`)
- `--limit <N>`: pass as `limit` after clamping to command max (default 5, max 20)
- Remainder: pass as `query`

Invoke `mcp__memory__memory_search` with `mode: "semantic"`, `query`, optional `tags`, optional `after`, and `limit`. Do NOT call `retrieve_memory` — it is a deprecated compatibility route in mcp-memory-service and is not advertised as a Claude Code MCP tool.

Raw tool output is `Found N memories (mode: ...)` plus numbered `content/Hash/Created/tags` blocks. Reformat top-N results as:

```
## RECALL: N matches
1. [tag1, tag2] 2026-05-09: <content excerpt 200 chars>
   memory_id: <hash>
2. ...
```

(The `## RECALL: N matches` block is the post-processing presentation shape — not raw MCP output.)

If 0 matches: report HONEST-NON-FINDING per `.claude/rules/synthesis-layer-verify.md §Reporting categories` with the query verbatim and suggest broadening.

## When to use

- Pre-task: search memory before planning a complex ship — surface prior similar work
- Post-incident: locate prior similar incidents (FM-class recoveries / Mia OVER catches)
- Wave-close synthesis: verify HONEST-NON-FINDING saturation by querying for prior wave verdicts on same axis
- Cardinal-rule-11 META-process RECALL operationalization (CLAUDE.md §"NEW Cardinal Rule cardinal-rule-11")

## Companion ships (queued, not active)

- **Skill `mem-recall`** (Wave 114 Ship 2N-batch3-MEM-C candidate): description-triggered auto-promote when context matches recall keywords
- **PreToolUse:Agent spawn-time hook** (Wave 115 Ship 2N-batch3-MEM-E candidate): subagent context enrichment via `additionalContext` JSON field

## TIER-1 SOTA cite trail

- **Anthropic CC slash command spec**: `https://code.claude.com/docs/en/agent-sdk/slash-commands` + `https://code.claude.com/docs/en/slash-commands` (canonical authority for `.claude/commands/<name>.md` shape + frontmatter; supports `description` / `argument-hint` / `disable-model-invocation` / `allowed-tools` fields per Wave 113 codex T1 verdict at `.claude/state/codex_consult_wave113_ship_d_recall_command_OUT.txt`)
- **mcp-memory-service runtime tool surface (verified)**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:1810-2247` advertises `memory_search` + `memory_consolidation` + `memory_ingest` + `memory_harvest` + `memory_quality` + `memory_graph` + `memory_conflicts` + `memory_resolve` + `mistake_note_add` + `mistake_note_search` (10+ tools). `memory_search` real param shape: `query` / `mode` / `time_expr` / `after` / `before` / `tags` / `quality_boost` / `limit` / `include_debug` / `max_response_chars` / `include_superseded` (NO `since` parameter)
- **Wave 113 codex T1 verdict**: NEEDS-REVISION conf=0.89 [VERIFIED via `.claude/state/codex_consult_wave113_ship_d_recall_command_OUT.txt` 2026-05-09] — corrections applied per `codex-t1-fix-forward-pattern.md` Pattern A

## Anti-patterns

- **DO NOT** invoke `/recall` from inside autonomous /loop ticks — explicit operator-invocation only (Probe 5 mode-harness-shape per `.claude/rules/agent-harness-fit-verification.md`)
- **DO NOT** chain `/recall` followed by `/recall` repeatedly — single-fire usage; if no match, broaden query or check capture-side wire (memory CAPTURE may be missing per Wave 113 Plan finding)

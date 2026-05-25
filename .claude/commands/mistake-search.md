---
description: Search mistake notes by semantic similarity to surface known pitfalls and past errors before starting a task. Operator-invoked RECALL-class surface for FM-class recovery patterns.
argument-hint: <query> [--limit N]
disable-model-invocation: true
allowed-tools:
  - mcp__memory__mistake_note_search
---

# /mistake-search

Operator-invoked READ-only RECALL surface for mistake patterns stored via `mcp__memory__mistake_note_add`. Wave 116 Ship 2N-batch3-MEM-MISTAKE-A — third operator-invoked memory primitive after Wave 113 `/recall` (general memories) + Wave 115 `/harvest` (CAPTURE pipeline). Symmetric companion to forthcoming `/mistake-add` (Wave 117 candidate).

## Backend (TIER-1-DIRECT cite — runtime distinguished from local repo)

- **Server (runtime)**: `mcp-memory-service v10.51.3` installed at `Z:/venvs/claude/Scripts/memory.exe` per `.mcp.json:38-46` (Apache-2.0 / 1809★ doobidoo/mcp-memory-service)
- **MCP tool spec**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:2246-2257` (`mistake_note_search` Tool registration with required `query` + optional `limit`)
- **Stored note shape**: `mistake_note_add` accepts `error_pattern` + `context_signature` + `incorrect_action` + `correct_action`, then stores them in memory `content` as labeled lines (`Pattern:` / `Context:` / `Wrong:` / `Right:`). `mistake_note_search` returns `notes[]` objects with `content_hash`, `content`, `similarity`, `failure_count`, and `updated_at` — NOT the 4 add-schema fields as top-level JSON keys (per Wave 116 codex T1 verification).
- **Storage**: sqlite_vec at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` (memory_graph table)

## Usage

- `/mistake-search <query>` — semantic search top 5 by default
- `/mistake-search <query> --limit 10` — override result count

Examples:
- `/mistake-search "FM-02 staging contamination"` — surface prior FM-02 absorption recoveries
- `/mistake-search "codex T1 prompt-echo verdict false-positive"` — surface verdict-reading discipline mistakes
- `/mistake-search "Mia OVER plan agent SHA miscite"` — surface prior Plan-agent OVER catches

## Implementation behavior

When invoked with `$ARGUMENTS`, parse:
- First positional arg(s) before `--limit` flag = `query` (REQUIRED, free-text)
- `--limit N`: pass as `limit: <N>` after command-local clamp to 1-20 (default 5). Runtime advertises default 5 and NO max; the `20` cap is a LOCAL output-size guard, NOT an upstream MCP limit.

Invoke `mcp__memory__mistake_note_search` with assembled params. Tool returns JSON shaped as `{ "notes": [...], "count": N }`; each note has `content_hash`, `content`, `similarity`, `failure_count`, and `updated_at`.

For each note, PARSE `content` if it follows the stored mistake-note labeled-line format (`Pattern:` / `Context:` / `Wrong:` / `Right:`). If parsing fails (older notes / non-mistake-note memories surfaced via similarity), render the raw `content` verbatim instead of inventing fields.

Reformat returned mistake notes as:

```
## MISTAKES: N matches (query: "<verbatim>")
1. <Pattern: line from content, OR raw content[:200] if parse fails>
   context: <Context: line, OR omit>
   wrong: <Wrong: line, OR omit>
   right: <Right: line, OR omit>
   similarity: <similarity>  failures: <failure_count>×  updated: <updated_at>
   hash: <content_hash[:8]>
2. ...
```

If 0 matches: report HONEST-NON-FINDING per `.claude/rules/synthesis-layer-verify.md §Reporting categories` with the query verbatim and suggest broadening (try shorter / less-specific query).

## When to use

- **Pre-task cardinal-rule-11 META-process gate**: BEFORE starting a complex ship, search for prior similar mistakes (e.g., "session-affinity-ttl design" surfaces Wave 112 Mia OVER #37 mode-harness mismatch verdict)
- **Pre-incident FM-class lookup**: when an FM-class incident pattern emerges (FM-02 staging contamination / FM-17 fleet depletion / FM-19 readonly-guard sidestep / FM-20 path-drift cascade), search for prior recoveries
- **Cross-model T1 verdict review**: search for prior codex T1 NEEDS-REVISION corrections on similar surfaces (e.g., "/recall slash command frontmatter" surfaces Wave 113 Pattern A learnings)
- **Compounding learning** per Karpathy `§5 Wiki Compounding Surface`: surface prior errors before repeating

## Companion ships (queued)

- **Wave 117 candidate**: Ship 2N-batch3-MEM-MISTAKE-B `/mistake-add` slash command (operator-invoked CAPTURE for mistake patterns; two-token `--apply --apply-confirmed` mechanical guard like `/harvest`)
- **Wave 118 candidate**: Skill `mistake-aware` description-triggered auto-promote BEFORE Agent dispatch (PreToolUse:Agent context: search mistakes matching subagent prompt + inject as additionalContext)
- **Wave 119+ candidate**: Stop hook `mistake_note_add` auto-capture on FM-class recovery commit-body markers (`Mia OVER` / `FM-02(c)` / `Pattern B HNF` patterns extracted from commit bodies)

## TIER-1 SOTA cite trail

- **Anthropic CC slash command spec**: `https://code.claude.com/docs/en/slash-commands` + `https://code.claude.com/docs/en/agent-sdk/slash-commands` (canonical authority for `.claude/commands/<name>.md` shape; `disable-model-invocation: true` recommended for manually triggered workflows)
- **mcp-memory-service runtime tool surface (verified)**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:2246-2257` advertises `mistake_note_search` MCP tool with full inputSchema
- **Wave 113 + Wave 115 codex T1 e2e learnings**: Pattern A-corrected slash command template (frontmatter shape + disable-model-invocation + two-token guard for write surfaces; READ-only surfaces like /mistake-search don't need two-token guard)

## Anti-patterns

- **DO NOT** rely on `/mistake-search` for completeness — semantic search returns top-N by similarity; near-matches may exist below threshold. Per `synthesis-layer-verify.md §Reporting categories`: 0-match HNF report should suggest broader query, not assume mistake-history is empty
- **DO NOT** invoke from inside autonomous /loop ticks expecting context injection — `/mistake-search` reformats results to chat output, NOT injected as `additionalContext`. For PreToolUse:Agent auto-RECALL, use the Wave 118 skill candidate (description-triggered) instead

## Cardinal-rule conformance per ship

- CR-1: TIER-1-DIRECT cites at file:line (mcp_memory_service/server_impl.py:2246-2257 + Anthropic CC slash command spec URL)
- CR-3: codex T1 e2e foreground+tee mandatory before commit (per CR-3 + user mandate "always using gpt5.5 fully e2e before commit")
- CR-5: NEW slash command file using EXISTING upstream primitive — install-priority satisfied (no new install; `mistake_note_search` already advertised in v10.51.3 runtime)
- CR-9: LOWEST-RISK reversible — operator-invoked + READ-only (no DB writes; no `--apply` semantic needed); reversible via `rm .claude/commands/mistake-search.md`
- CR-12: HONEST-NON-FINDING — no upstream Anthropic-OFFICIAL `/mistake-search` skill exists; sibling-novel composition over TIER-1 substrates per `citation-discipline.md` rule #8 (effective_tier=TIER-3-LOCAL-COMPOSITION-OVER-TIER-1-SUBSTRATES)

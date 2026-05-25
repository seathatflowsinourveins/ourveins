---
description: Extract learnings from Claude Code session transcripts (decisions / bugs / conventions / learnings / context) via mcp__memory__memory_harvest. Default dry-run preview; --apply stores candidates.
argument-hint: [--sessions N] [--session-ids <id1,id2>] [--types <decision|bug|convention|learning|context>] [--min-confidence 0.6] [--project-path <path>] [--apply --apply-confirmed]
disable-model-invocation: true
allowed-tools:
  - mcp__memory__memory_harvest
---

# /harvest

Operator-invoked CAPTURE primitive. Wave 115 Ship 2N-batch3-MEM-CAPTURE — closes RECALL prerequisite gap surfaced Wave 113 (DB had 0 entries pre-harvest). Symmetric companion to Wave 113 `/recall` (RECALL surface) — `/harvest` is the CAPTURE surface.

## Backend (TIER-1-DIRECT cite — runtime distinguished from local repo)

- **Server (runtime)**: `mcp-memory-service v10.51.3` installed at `Z:/venvs/claude/Scripts/memory.exe` per `.mcp.json:38-46` (Apache-2.0 / 1809★ doobidoo/mcp-memory-service)
- **Local source clone**: `Z:/repos/deps/mcp-memory-service @ HEAD 0cf4e09fe75535dff0f73ce799d68b6b37537c6a` (v10.47.2 — distinct from runtime; cite separately)
- **MCP tool spec**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:1979-2057` (`memory_harvest` Tool registration + inputSchema)
- **Harvest pipeline**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/harvest/` — `SessionHarvester` (harvester.py) + `TranscriptParser` (parser.py) + `PatternExtractor` (extractor.py) + `HarvestClassifier` (classifier.py — LLM Phase 2 47%→80% precision)
- **Storage**: sqlite_vec at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` (14 tables — `memories` + `memory_embeddings` + `memory_content_fts` + `memory_graph`)

## Usage

- `/harvest` — dry-run preview top recent session, all memory types
- `/harvest --sessions 3` — preview last 3 sessions
- `/harvest --types decision,bug` — filter by memory types (allowed: `decision` / `bug` / `convention` / `learning` / `context`)
- `/harvest --min-confidence 0.7` — confidence threshold (default 0.6)
- `/harvest --apply --apply-confirmed` — **STORE** candidates (two-token write confirmation; `--apply` alone is treated as dry-run + reports confirmation required)
- `/harvest --apply --apply-confirmed --sessions 5 --types decision,convention` — composite store

**Safety default**: `dry_run: true` — preview only, no DB writes. Two-token write confirmation pattern: `--apply` alone MUST remain `dry_run: true` and report write confirmation required; actual DB writes require BOTH `--apply` AND `--apply-confirmed` per Wave 115 codex T1 NEEDS-REVISION conf=0.87 mechanical-guard prescription. Per cardinal-rule-9 install-risk LOW-with-explicit-mechanical-confirmation pattern (anti-pattern: operator-discipline alone is INSUFFICIENT under eee autonomous /loop conditions where /loop tick prompts can dispatch slash commands at message start).

## Implementation behavior

When invoked with `$ARGUMENTS`, parse flags:

- `--sessions N`: pass as `sessions: <N>` (default 1)
- `--session-ids <id1,id2>`: pass as `session_ids: ["<id1>", "<id2>"]`
- `--types <list>`: parse comma-separated list, pass as `types: [...]` filtered to {`decision`, `bug`, `convention`, `learning`, `context`}
- `--min-confidence N`: pass as `min_confidence: <N>` (default 0.6)
- `--apply --apply-confirmed`: pass as `dry_run: false`. If `--apply` appears WITHOUT `--apply-confirmed`, pass `dry_run: true` (or do not call the tool) and report `write confirmation required` to operator
- `--project-path <path>`: pass as `project_path: "<path>"`. **If omitted**, the MCP handler infers the Claude project transcript directory from `Path.cwd()` under `~/.claude/projects/<cwd-with-separators-replaced>` (NOT from `CLAUDE_PROJECT_DIR`)

Invoke `mcp__memory__memory_harvest` with assembled params. Do NOT pass `use_llm: true` — it requires `GROQ_API_KEY` env var which eee does not have set; LLM Phase 2 classification not enabled this fire.

Reformat returned `HarvestResult` candidates as:

```
## HARVEST: N candidates (sessions: <list>, dry_run: <bool>, min_confidence: <N>)
1. [<type>] confidence=<N> tags=<tags>: <content excerpt 200 chars>
   session_id: <id>
2. ...
```

(Note: tool returns `type`/`content`/`confidence`/`tags` per `HarvestCandidate` model in `mcp_memory_service/harvest/models.py`; does NOT return `timestamp` field per Wave 115 codex T1 verdict.)

Distinguish dry-run vs apply outcomes:
- `dry_run: true` → "PREVIEW (no DB writes)"
- `dry_run: false` → "STORED N candidates as tagged memories"

If 0 candidates: report HONEST-NON-FINDING per `.claude/rules/synthesis-layer-verify.md §Reporting categories` with the session range probed and suggest broader scope OR larger session count.

## When to use

- Post-wave: harvest current session learnings (decision/bug/convention/learning/context) into persistent memory before session ends
- Pre-incident-replay: harvest prior session looking for similar contexts before starting analogous work
- Cardinal-rule-11 META-process operationalization (CLAUDE.md §"NEW Cardinal Rule cardinal-rule-11"): closes the CAPTURE half so /recall has actual data to surface
- Compounding learning per Karpathy `§5 Wiki Compounding Surface` discipline + user mandate "compounding learning"

## Companion ships (queued, not active)

- **Skill `mem-harvest`** (Wave 116 Ship 2N-batch3-MEM-HARVEST-C candidate): description-triggered auto-promote on session-end-imminent context detection (use_llm=false safe default)
- **Stop hook auto-harvest** (Wave 117 Ship 2N-batch3-MEM-HARVEST-E candidate): SessionEnd hook calls `python -c "from mcp_memory_service.harvest import SessionHarvester; ..."` for autonomous-loop CAPTURE without operator typing — Probe 5 mode-harness-shape design needed (slash uses MCP tool, hook uses Python class direct — different code paths)
- **`/recall`** (Wave 113 Ship 2N-batch3-MEM-D): symmetric RECALL surface — operator types `/recall <query>` to surface prior harvested memories

## TIER-1 SOTA cite trail

- **Anthropic CC slash command spec**: `https://code.claude.com/docs/en/agent-sdk/slash-commands` + `https://code.claude.com/docs/en/slash-commands` (canonical authority for `.claude/commands/<name>.md` shape + frontmatter incl. `disable-model-invocation`)
- **mcp-memory-service runtime tool surface (verified)**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:1979-2057` advertises `memory_harvest` MCP tool with full inputSchema
- **Harvest pipeline source**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/harvest/{__init__,classifier,extractor,harvester,models,parser}.py` — SessionHarvester orchestrator + 5-type extraction
- **Wave 113 codex T1 surfacing**: `.claude/state/codex_consult_wave113_ship_d_recall_command_OUT.txt` discovered `memory_harvest` primitive among 10+ advertised tools; closed Wave 113 close-synthesis "CAPTURE missing" Mia OVER #41 self-catch — primitive EXISTS; `/harvest` is just the operational wire

## Anti-patterns

- **DO NOT** invoke `/harvest --apply --apply-confirmed` from inside autonomous /loop ticks — `--apply --apply-confirmed` is destructive (writes to memory DB; reverting requires DB rollback per `.mcp-memory/memory.db` backup). Per Probe 5 mode-harness-shape per `agent-harness-fit-verification.md` + Wave 115 codex T1 finding: anti-pattern note is ADVISORY only — the two-token `--apply --apply-confirmed` mechanical guard is the load-bearing safety primitive. /loop tick prompts that start with `/harvest --apply` (without `--apply-confirmed`) are auto-treated as `dry_run: true`
- **DO NOT** chain `/harvest --apply` repeatedly on same session — duplicates memories (no idempotency in v10.51.3 runtime; deduplication is via `memory_consolidation` separate primitive)
- **DO NOT** pass `use_llm: true` without explicit operator approval — Groq API call costs ~$0.001/candidate. Without `GROQ_API_KEY` env var, LLM Phase 2 classification is unavailable and the classifier falls back to regex candidates UNFILTERED (lower precision ~47% vs ~80% with LLM); the harvest does NOT fail silently per upstream `harvest/classifier.py` behavior — it logs unavailable + returns regex-only candidates [VERIFIED Wave 115 codex T1 verdict 2026-05-09]

## Cardinal-rule conformance per ship

- CR-1: TIER-1-DIRECT cites at file:line (mcp_memory_service/server_impl.py:1979-2057 + harvest/__init__.py + Anthropic CC slash command spec URL)
- CR-3: codex T1 e2e foreground+tee mandatory before commit (per CR-3 + user mandate "always using gpt5.5 fully e2e before commit")
- CR-5: NEW slash command file using EXISTING upstream primitive (`mcp__memory__memory_harvest`) — install-priority satisfied (no new install needed; primitive already advertised in v10.51.3 runtime)
- CR-9: LOW-RISK reversible — operator-invoked + `dry_run: true` default + `--apply` opt-in; reversible via `rm .claude/commands/harvest.md` + DB rollback if applied
- CR-12: HONEST-NON-FINDING — no upstream Anthropic-OFFICIAL `/harvest` skill exists per Wave 113 Plan agent search; sibling-novel composition over TIER-1 substrates per `citation-discipline.md` rule #8 (effective_tier=TIER-3-LOCAL-COMPOSITION-OVER-TIER-1-SUBSTRATES)

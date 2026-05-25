---
description: Record a mistake pattern for error replay (FM-class recovery primitive). Two-token --apply --apply-confirmed mechanical guard required for actual DB write. Default = command-side dry-run validation only.
argument-hint: --pattern "<error>" --context "<where>" --wrong "<what>" --right "<should>" [--apply --apply-confirmed]
disable-model-invocation: true
allowed-tools:
  - mcp__memory__mistake_note_add
---

# /mistake-add

Operator-invoked CAPTURE primitive for mistake patterns. Wave 117 Ship 2N-batch3-MEM-MISTAKE-B — WRITE half of mistake-class pair (companion to Wave 116 `/mistake-search` READ half). Auto-increments `failure_count` for repeated patterns per upstream `mistake_note_add` Tool docstring.

4th operator-invoked memory primitive after Wave 113 `/recall` + Wave 115 `/harvest` + Wave 116 `/mistake-search`. Completes mistake-class CRUD pair (search + add) and brings memory primitive operationalization to 4/10.

## Backend (TIER-1-DIRECT cite — runtime distinguished from local repo)

- **Server (runtime)**: `mcp-memory-service v10.51.3` installed at `Z:/venvs/claude/Scripts/memory.exe` per `.mcp.json:38-46` (Apache-2.0 / 1809★ doobidoo/mcp-memory-service)
- **MCP tool spec**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:2225-2245` (`mistake_note_add` Tool registration)
- **Required input schema** (ALL 4 strings REQUIRED):
  - `error_pattern`: "The error pattern or message"
  - `context_signature`: "Context where the error occurred (file, function, task type)"
  - `incorrect_action`: "What was done incorrectly"
  - `correct_action`: "What should have been done instead"
- **No upstream `dry_run` param**: dry-run is **command-side slash-command behavior** (NOT an MCP parameter; NOT client-side parser enforcement) — validate inputs + report what WOULD be stored WITHOUT calling `mcp__memory__mistake_note_add`. Because custom commands are prompt templates, the no-call rule is enforced by THESE instructions plus the two-token guard. Per Wave 117 codex T1 verdict at `.claude/state/codex_consult_wave117_ship_mistake_add_command_OUT.txt` (NEEDS-REVISION conf=0.88 prescription #1)
- **Storage shape per Wave 116 codex T1 verification**: `mistake_note_add` stores the 4 fields encoded in memory `content` as labeled lines (`Pattern:` / `Context:` / `Wrong:` / `Right:`) — NOT as separate JSON columns; auto-increments `failure_count` for repeated patterns (semantic-similarity dedup)
- **Storage backend**: sqlite_vec at `Z:/claude-sota-installed-state/.mcp-memory/memory.db` (memory_graph table)

## Usage

**Default (command-side dry-run validation only — NO DB write)**:

```
/mistake-add --pattern "FM-02 staging contamination" --context "parallel session git commit race" --wrong "git add . then git commit" --right "git add -- <file> && git commit -o -F msg.txt -- <file>"
```

→ Validates 4 required fields present + reports "WOULD store" without calling tool.

**WRITE (two-token mechanical guard)**:

```
/mistake-add --pattern "..." --context "..." --wrong "..." --right "..." --apply --apply-confirmed
```

→ Calls `mcp__memory__mistake_note_add` with the 4 fields. Auto-increments `failure_count` if a similar pattern already exists.

**Safety default**: command-side dry-run validation. Two-token write confirmation (`--apply` AND `--apply-confirmed`) required for actual DB write. `--apply` alone treated as dry-run + reports "write confirmation required" (load-bearing mechanical guard per Wave 115 codex T1 finding — operator-discipline alone insufficient under /loop autonomous slash dispatch). Per cardinal-rule-9 install-risk LOW-with-explicit-mechanical-confirmation pattern.

## Implementation behavior

When invoked with `$ARGUMENTS`, parse flags:

- `--pattern "<text>"`: REQUIRED. Pass as `error_pattern: "<text>"`. Strip outer quotes.
- `--context "<text>"`: REQUIRED. Pass as `context_signature: "<text>"`.
- `--wrong "<text>"`: REQUIRED. Pass as `incorrect_action: "<text>"`.
- `--right "<text>"`: REQUIRED. Pass as `correct_action: "<text>"`.
- `--apply --apply-confirmed`: actually invoke `mcp__memory__mistake_note_add`. If `--apply` appears WITHOUT `--apply-confirmed`, do NOT call the tool; report `write confirmation required: pass both --apply AND --apply-confirmed to commit`.
- Default (no `--apply`): command-side dry-run — validate 4 required fields present + report what WOULD be stored.

If ANY of 4 required fields missing, report ERROR with the specific missing flag(s). Do NOT call the MCP tool with incomplete params.

Output format:

```
## MISTAKE-ADD: <dry-run | committed>
pattern: <error_pattern>
context: <context_signature>
wrong: <incorrect_action>
right: <correct_action>

[dry-run only]
WOULD store as labeled lines in memory content. Pass --apply --apply-confirmed to commit.

[committed only]
content_hash: <hash from MCP tool response>
failure_count: <N>×  (auto-incremented if similar pattern existed)
```

## When to use

- **Post-incident FM-class recovery capture**: when an FM-class incident is recovered (FM-02 staging contamination / FM-17 fleet depletion / FM-19 readonly-guard sidestep / FM-20 path-drift cascade), record the pattern via `/mistake-add` so future `/mistake-search` surfaces it
- **Post-Mia OVER catch**: when codex T1 / Mia probe catches an OVER claim (e.g., Wave 116 Mia OVER #43 — assumed top-level fields that don't exist), record the OVER as a mistake pattern for future ship discipline
- **Post-Pattern A apply**: when codex T1 NEEDS-REVISION verdict applies prescriptions, capture the prescription class as a pattern (e.g., "two-token write confirmation required for /loop autonomous slash dispatch" Wave 115 codex T1 mechanical guard finding)
- **Cardinal-rule-11 META-process operationalization** (CLAUDE.md §"NEW Cardinal Rule cardinal-rule-11"): closes the FM-class CAPTURE half so `/mistake-search` has actual data to surface
- **Compounding learning** per Karpathy `§5 Wiki Compounding Surface`: recurring FM-class patterns should be DB-tracked for `failure_count` analytics

## Companion ships (queued)

- **Wave 116 (already shipped)**: `/mistake-search` READ-only RECALL surface per `.claude/commands/mistake-search.md`
- **Wave 118 candidate**: Skill `mistake-aware` description-triggered auto-promote BEFORE Agent dispatch (PreToolUse:Agent context: search mistakes matching subagent prompt + inject as `additionalContext`)
- **Wave 119+ candidate**: Stop hook auto-`mistake_note_add` on commit-body markers (`Mia OVER #N` / `FM-NN(c)` / `Pattern B HNF` patterns extracted from commit body — auto-CAPTURE without operator typing)

## TIER-1 SOTA cite trail

- **Anthropic CC slash command spec**: `https://code.claude.com/docs/en/slash-commands` + `https://code.claude.com/docs/en/agent-sdk/slash-commands` (canonical authority for `.claude/commands/<name>.md` shape; `disable-model-invocation: true` recommended for manually triggered workflows with side effects)
- **mcp-memory-service runtime tool surface (verified)**: `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:2225-2245` advertises `mistake_note_add` MCP tool with full inputSchema (4 REQUIRED fields, no optional)
- **Wave 113 + 115 + 116 codex T1 cumulative learnings** at `.claude/state/codex_consult_wave{113,115,116}_*_OUT.txt`:
  - Two-token `--apply --apply-confirmed` mechanical guard (Wave 115 prescription #2)
  - Output template field-shape distinction (Wave 116 Mia OVER #43 catch)
  - `disable-model-invocation: true` operator-only frontmatter convention (Wave 113 prescription #1)

## Anti-patterns

- **DO NOT** invoke `/mistake-add --apply --apply-confirmed` from inside autonomous /loop ticks — operator-explicit only; `--apply --apply-confirmed` is destructive (writes to memory DB; `failure_count` auto-increment makes accidental duplicates harder to dedup); per Probe 5 mode-harness-shape per `agent-harness-fit-verification.md`. The two-token mechanical guard is load-bearing safety primitive; anti-pattern note is ADVISORY only per Wave 115 codex T1 finding
- **DO NOT** call MCP tool with incomplete params — if any of 4 required fields missing, report ERROR + list missing flags. Although `inputSchema.required` advertises all 4 fields, `handle_mistake_note_add` at `server_impl.py:2745-2754` reads missing args with `arguments.get(..., "")` and `memory_service.py:788-849` STORES the labeled-line note with empty fields (NOT a silent error — actual malformed data persisted). **Command-side validation is load-bearing** to avoid storing malformed labeled-line notes per Wave 117 codex T1 verdict prescription #2
- **DO NOT** use `/mistake-add` as a backup memory store — use `/recall` + `/harvest` for general memories; `/mistake-add` is SPECIFIC to error-replay patterns (4-field schema is purposeful)

## Cardinal-rule conformance per ship

- CR-1: TIER-1-DIRECT cites at file:line (mcp_memory_service/server_impl.py:2225-2245 + Anthropic CC slash command spec)
- CR-3: codex T1 e2e foreground+tee mandatory before commit
- CR-5: NEW slash command file using EXISTING upstream primitive — install-priority satisfied (no new install; `mistake_note_add` already advertised in v10.51.3 runtime)
- CR-9: LOW-RISK reversible — operator-invoked + command-side dry-run default + two-token `--apply --apply-confirmed` opt-in for actual DB writes; reversible via `rm .claude/commands/mistake-add.md` (note: previously-committed memories require DB rollback to revert)
- CR-12: HONEST-NON-FINDING confirmed Wave 113 — no upstream Anthropic-OFFICIAL `/mistake-add` skill exists; sibling-novel composition over TIER-1 substrates per `citation-discipline.md` rule #8 (effective_tier=TIER-3-LOCAL-COMPOSITION-OVER-TIER-1-SUBSTRATES)

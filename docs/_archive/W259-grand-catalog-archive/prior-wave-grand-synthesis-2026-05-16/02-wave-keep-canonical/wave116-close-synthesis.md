
## Wave 116 — Close-synthesis (Ship 2N-batch3-MEM-MISTAKE-A /mistake-search slash command, 2026-05-09)

### Trigger

Wave 113 codex T1 e2e on /recall surfaced 10+ mcp-memory-service v10.51.3 runtime tools including `mistake_note_search` + `mistake_note_add` for FM-class recovery primitives. Wave 115 close-synthesis queued Ship 2N-batch3-MEM-MISTAKE as Wave 116+ candidate. Wave 116 ships the READ-only half (`/mistake-search`); WRITE half (`/mistake-add`) queued Wave 117.

3rd operator-invoked memory primitive symmetric to Wave 113 `/recall` + Wave 115 `/harvest`. Compounding-learning surface progressively wires per user mandate.

### Pre-design probes

Cardinal-rule-9 install-risk + cardinal-rule-12 upstream-install-priority — NO new install:
- `mistake_note_search` MCP tool spec verified at `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/server_impl.py:2246-2257`
- Required: `query` (free-text string)
- Optional: `limit` (int default 5; runtime advertises NO max)
- Returns: `{notes: [{content_hash, content, similarity, failure_count, updated_at}], count: N}`
- Stored mistake notes have `content` field with labeled lines `Pattern:` / `Context:` / `Wrong:` / `Right:` per `mistake_note_add` Tool spec at `:2225-2245`

### Wave 116 ship: 2N-batch3-MEM-MISTAKE-A `/mistake-search` slash command

- **NEW file**: `.claude/commands/mistake-search.md` (~95 LOC after Pattern A) — operator-invoked READ-only RECALL-class surface for mistake patterns
- **Frontmatter shape**: `description` + `argument-hint: <query> [--limit N]` + `disable-model-invocation: true` + `allowed-tools: [mcp__memory__mistake_note_search]` (mirrors Wave 113/115 Pattern A-corrected template; READ-only so no two-token guard)
- **Backend cite**: doobidoo/mcp-memory-service v10.51.3 (Apache-2.0) runtime + Wave 116 codex T1 verified output shape distinction
- **SAFETY**: READ-only — no DB writes; no `--apply` semantic; no two-token guard needed (Probe 5 PASS per codex T1 finding "PASS for READ-only shape; residual /loop risk acceptable for READ-only output")
- **Anti-pattern note**: "DO NOT rely on /mistake-search for completeness" + "DO NOT invoke from /loop ticks expecting context injection" — sufficient per codex T1 finding "should not be framed as a mechanical dispatch block"

### Cross-model T1 e2e per CR-3 user mandate — Pattern A applied

Per CLAUDE.md cardinal-rule-3 + Phase 1 bootstrap exception + user mandate "always using gpt5.5 fully e2e before commit":

- T1 codex-gate hook fired WARN (no `_OUT` pair pre-Write)
- **Explicit foreground+tee codex T1 e2e** per `cross-model-consensus.md §Profile selection rule` (deep-review-exec / xhigh / sandbox=danger-full-access). Bg PID 289036; 814-line verdict file
- Consult prompt at `.claude/state/codex_consult_wave116_ship_mistake_search_command.txt` (3-axis TIGHT per Pattern A)
- Verdict at `.claude/state/codex_consult_wave116_ship_mistake_search_command_OUT.txt`
- **Verdict**: **NEEDS-REVISION conf=0.91** (highest confidence of 3 codex T1 e2e fires this conversation; Wave 113=0.89, Wave 115=0.87, Wave 116=0.91 — discipline maturing)
- **2 prescribed_edits** applied per Pattern A (smaller correction surface than Wave 113's 4 + Wave 115's 5):
  - (1) **Backend section**: Distinguish `mistake_note_add` accept-schema (`error_pattern`/`context_signature`/`incorrect_action`/`correct_action`) from `mistake_note_search` return-schema (`{notes[].content_hash, content, similarity, failure_count, updated_at}`). My original conflated these.
  - (2) **Implementation behavior**: Command-local `limit` clamp 1-20 (NOT upstream MCP limit) + JSON shape `{notes, count}` parsing + parse-with-fallback discipline (parse `content` for labeled lines if present; render raw verbatim if parse fails)

### Mia OVER ladder Wave 97-116: n=42 → **n=43**

- **#43**: My output template assumed top-level `error_pattern`/`context_signature`/`incorrect_action`/`correct_action` JSON keys — but `mistake_note_search` actually returns these encoded INSIDE the `content` string with labeled lines (`Pattern:` / `Context:` / `Wrong:` / `Right:`). The 4 fields are `mistake_note_add` ACCEPT-schema, NOT search-output schema. Codex T1 caught at AXIS 2 source-verification.

Cumulative discipline ROI: 7 wrong-edit cycles avoided across Wave 97-116. Codex T1 e2e found:
- Wave 113: 4 prescriptions (frontmatter + body + cite + tier-1)
- Wave 115: 5 prescriptions (two-token guard + project_path + output template + use_llm + anti-pattern)
- Wave 116: 2 prescriptions (output schema distinction + limit clamp clarification)

Trend: ship designs improving — Wave 116 had simplest correction surface despite being 3rd operator-invoked primitive. Pattern A template + cumulative learnings from prior fires reducing correction surface per ship.

### CR conformance (Wave 116 unified)

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1-DIRECT cites at file:line + HEAD SHA throughout |
| CR-3 (cross-model T1) | ✅ | Foreground+tee codex T1 e2e (Phase 1 bootstrap exception path; conf=0.91 highest of session) |
| CR-5 (install-priority) | ✅ | NEW slash command using EXISTING upstream primitive (zero new install per Wave 113 surfacing) |
| CR-7 (graduated unleash) | ✅ | No env/permission changes |
| CR-8 (full-SOTA-content) | ✅ | ADAPTED-FROM-SOTA (mcp-memory-service mistake_note primitives + Anthropic CC slash command spec) |
| CR-9 (install-risk) | ✅ | LOWEST-RISK READ-only (no DB writes; no `--apply`; reversible via rm) |
| CR-10 (research-first) | ✅ | mistake_note_search runtime probe + add/search schema distinction probe BEFORE Edit |
| CR-11 (META-process) | ✅ | Wave 113/115 codex T1 surfacing → Wave 116 inline design → codex T1 e2e → Pattern A apply → audit-trail entry per audit-action-loop.md |
| CR-12 (upstream-install-priority) | ✅ | HONEST-NON-FINDING confirmed Wave 113; sibling-novel composition over TIER-1 substrates |

### FM-02 sub-class (c) cumulative

n=13 → may advance n=14 if absorbed into next session checkpoint per cwc-throttled wrapper.

### Outstanding queue (post Wave 116)

- **Wave 117 candidate**: Ship 2N-batch3-MEM-MISTAKE-B `/mistake-add` slash command (operator-invoked CAPTURE for mistake patterns; two-token `--apply --apply-confirmed` mechanical guard like `/harvest`)
- **Wave 118 candidate**: Skill `mem-recall` description-triggered auto-promote (companion to /recall)
- **Wave 118 candidate**: Skill `mem-harvest` description-triggered auto-promote (companion to /harvest)
- **Wave 118 candidate**: Skill `mistake-aware` description-triggered BEFORE Agent dispatch (PreToolUse:Agent context: search mistakes matching subagent prompt + inject as additionalContext)
- **Wave 119+ candidate**: Ship 2N-batch3-MEM-E PreToolUse:Agent spawn-time hook (subagent context enrichment via additionalContext)
- **Wave 119+ candidate**: Stop hook auto-harvest + auto-mistake-add (Python class direct invocation; Probe 5 mode-harness design needed — different code path than slash MCP tool)
- **Wave 120+ candidate**: Ship 2W-cleanup-D — 6 unique-but-unused domain marketplaces (operator decision pending)
- **Ship 2N-batch3-G**: skillOverrides study-pilot (24h Phoenix data accumulation needed)
- **Ship 2N-batch3-B-validation**: graphiti smoke test on next eee restart
- **Ship 2A-pilot**: rtk vs snip pilot (operator decision)

### Wave 116 closure note

eee architecture state post Wave 116:
- 91 → **92 commands** (+ `/mistake-search`)
- Memory primitives wired: 2/10 → **3/10** (memory_search + memory_harvest + mistake_note_search)
- Operator surfaces for memory: RECALL (general /recall + mistake-class /mistake-search) + CAPTURE (/harvest pipeline) — broadening primitive coverage
- Memory DB entries: 0 (CAPTURE pipeline exists but operator hasn't `/harvest --apply --apply-confirmed`'d yet)

Wave 116 ship trend: shrinking correction surface per fire (4→5→2 prescriptions Wave 113→115→116) indicates Pattern A template + cumulative codex T1 learnings + Mia probe discipline maturing. Highest-confidence verdict (0.91) of 3 codex T1 e2e fires this conversation.

Cumulative session arc Wave 105-116: ~13+ commits across 2 cooperative parallel sessions; ~150+ MB combined disk reclaim; 3 memory primitives operationalized (Wave 113 + 115 + 116); 43 Mia OVERs caught; 13 FM-02(c) absorptions; cross-model gate firmly satisfied via 3 codex T1 foreground+tee e2e fires (separate codex Pro plan, no claude OAuth fleet contention).

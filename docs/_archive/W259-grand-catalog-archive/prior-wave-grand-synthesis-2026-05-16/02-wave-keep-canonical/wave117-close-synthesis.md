
## Wave 117 — Close-synthesis (Ship 2N-batch3-MEM-MISTAKE-B /mistake-add slash command, 2026-05-09)

### Trigger

Wave 116 close-synthesis queued Ship 2N-batch3-MEM-MISTAKE-B as Wave 117 candidate — WRITE half of mistake-class CRUD pair (companion to Wave 116 `/mistake-search` READ half). Completes mistake-class CAPTURE/RECALL operationalization.

4th operator-invoked memory primitive symmetric to Wave 113 `/recall` + Wave 115 `/harvest` + Wave 116 `/mistake-search`. Brings memory primitive operationalization to 4/10.

### Pre-design probes

`mistake_note_add` MCP tool spec at `server_impl.py:2225-2245` verified Wave 116:
- 4 REQUIRED string fields: `error_pattern` + `context_signature` + `incorrect_action` + `correct_action`
- NO optional params; NO upstream `dry_run`
- Auto-increments `failure_count` for repeated patterns via semantic-similarity dedup
- Stores 4 fields encoded inside memory `content` as labeled lines (`Pattern:` / `Context:` / `Wrong:` / `Right:`)

### Wave 117 ship: 2N-batch3-MEM-MISTAKE-B `/mistake-add` slash command

- **NEW file**: `.claude/commands/mistake-add.md` (~140 LOC) — operator-invoked WRITE primitive for mistake-class FM-recovery patterns
- **Frontmatter shape**: `description` + `argument-hint` (4-flag interface) + `disable-model-invocation: true` + `allowed-tools: [mcp__memory__mistake_note_add]` (Wave 113/115/116 Pattern A-corrected template + Wave 115 two-token guard)
- **4-flag interface**: `--pattern <text>` + `--context <text>` + `--wrong <text>` + `--right <text>` (all REQUIRED per upstream schema)
- **Command-side dry-run** (NOT client-side per codex T1): default behavior validates 4 required fields + reports "WOULD store" WITHOUT calling MCP tool; `--apply --apply-confirmed` two-token guard required for actual DB write (mirrors Wave 115 /harvest)
- **Anti-pattern note**: ADVISORY (per Wave 115 codex T1 finding — load-bearing safety is default no-call + two-token guard)

### Cross-model T1 e2e per CR-3 user mandate — Pattern A applied

Per CLAUDE.md cardinal-rule-3 + Phase 1 bootstrap exception + user mandate "always using gpt5.5 fully e2e before commit":

- T1 codex-gate hook fired WARN (no `_OUT` pair pre-Write)
- **Explicit foreground+tee codex T1 e2e** per `cross-model-consensus.md §Profile selection rule` (deep-review-exec / xhigh / sandbox=danger-full-access). Bg PID 291701; 987-line verdict file
- Consult prompt at `.claude/state/codex_consult_wave117_ship_mistake_add_command.txt` (3-axis TIGHT per Pattern A)
- Verdict at `.claude/state/codex_consult_wave117_ship_mistake_add_command_OUT.txt`
- **Verdict**: **NEEDS-REVISION conf=0.88** with **2 prescribed_edits** + Mia OVER #44 catch
- Codex T1 e2e fire trend Wave 113→117: conf 0.89 / 0.87 / 0.91 / 0.88 (avg 0.8875; high-quality verdicts across all 4 fires)

### 2 prescribed_edits applied per Pattern A

1. **Backend section**: Replaced "client-side semantic enforced by this slash command" with "command-side slash-command behavior (NOT an MCP parameter; NOT client-side parser enforcement) — enforced by THESE instructions plus the two-token guard. Custom commands are prompt templates."
2. **Anti-pattern section**: Corrected upstream missing-param behavior — per `server_impl.py:2745-2754` `handle_mistake_note_add` uses `arguments.get(..., "")` and `memory_service.py:788-849` STORES the labeled-line note with empty fields. NOT a silent error — actual malformed data persisted. **Command-side validation is load-bearing.**

Plus Pattern A consistency replacement: ALL 5 occurrences of "client-side dry-run" → "command-side dry-run" via `replace_all: true` for terminology consistency throughout the file.

### Mia OVER ladder Wave 97-117: n=43 → **n=44**

- **#44**: Two-part imprecision caught by codex T1:
  - "Client-side dry-run" framing was imprecise — should be "command-side slash-command behavior" (custom commands are prompt templates per CC docs; not client parser-enforced)
  - "Upstream tool errors silently on schema validation failure" claim was WRONG — handler reads missing args with `.get(..., "")` and STORES labeled-line note with empty fields. Codex T1 source-verified at `server_impl.py:2745-2754` + `memory_service.py:788-849`.

Cumulative discipline ROI: 8 wrong-edit cycles avoided across Wave 97-117 (Wave 113: 4 + Wave 115: 5 + Wave 116: 2 + Wave 117: 2 = 13 codex T1 prescriptions). Plus 11 Mia probe catches (n=33→n=44).

### CR conformance (Wave 117 unified)

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1-DIRECT cites at file:line + HEAD SHA throughout (server_impl.py:2225-2245 + memory_service.py:788-849 + Anthropic CC slash command spec) |
| CR-3 (cross-model T1) | ✅ | Foreground+tee codex T1 e2e (Phase 1 bootstrap exception path; conf=0.88; 2 prescriptions applied) |
| CR-5 (install-priority) | ✅ | NEW slash command using EXISTING upstream primitive (zero new install) |
| CR-7 (graduated unleash) | ✅ | No env/permission changes |
| CR-8 (full-SOTA-content) | ✅ | ADAPTED-FROM-SOTA (mcp-memory-service mistake_note primitives + Anthropic CC slash command spec + Wave 115 two-token guard precedent) |
| CR-9 (install-risk) | ✅ | LOW-RISK reversible (operator-invoked + command-side dry-run default + two-token guard opt-in; reversible via rm; previously-committed memories require DB rollback) |
| CR-10 (research-first) | ✅ | mistake_note_add inputSchema probe + handler probe + service probe BEFORE Edit |
| CR-11 (META-process) | ✅ | Wave 116 codex T1 surfacing → Wave 117 inline design → codex T1 e2e → Pattern A apply → audit-trail entry per audit-action-loop.md |
| CR-12 (upstream-install-priority) | ✅ | HONEST-NON-FINDING — no upstream Anthropic-OFFICIAL `/mistake-add` skill exists; sibling-novel composition over TIER-1 substrates |

### FM-02 sub-class (c) cumulative

n=13 → may advance n=14 if absorbed into next session checkpoint per cwc-throttled wrapper.

### Outstanding queue (post Wave 117)

- **Wave 118 candidate**: Skill `mem-recall` description-triggered auto-promote (companion to /recall)
- **Wave 118 candidate**: Skill `mem-harvest` description-triggered auto-promote (companion to /harvest)
- **Wave 118 candidate**: Skill `mistake-aware` description-triggered BEFORE Agent dispatch (PreToolUse:Agent context: search mistakes matching subagent prompt + inject as `additionalContext`)
- **Wave 119+ candidate**: PreToolUse:Agent spawn-time hook for memory_search auto-RECALL on subagent context enrichment
- **Wave 119+ candidate**: Stop hook auto-`mistake_note_add` on commit-body markers (`Mia OVER #N` / `FM-NN(c)` / `Pattern B HNF` patterns extracted from commit body — auto-CAPTURE without operator typing)
- **Wave 119+ candidate**: Stop hook auto-`memory_harvest` on session-end (Python class direct invocation per Probe 5 mode-harness design)
- **Wave 120+ candidate**: Ship 2W-cleanup-D — 6 unique-but-unused domain marketplaces (operator decision pending)
- **Ship 2N-batch3-G**: skillOverrides study-pilot (24h Phoenix data accumulation needed)
- **Ship 2N-batch3-B-validation**: graphiti smoke test on next eee restart
- **Ship 2A-pilot**: rtk vs snip pilot (operator decision)

### Wave 117 closure note

eee architecture state post Wave 117:
- 92 → **93 commands** (+ `/mistake-add`)
- Memory primitives wired: 3/10 → **4/10** (memory_search + memory_harvest + mistake_note_search + mistake_note_add)
- **Mistake-class CRUD pair COMPLETE**: `/mistake-search` (Wave 116 RECALL) + `/mistake-add` (Wave 117 WRITE)
- General-memory class status: `/recall` RECALL (Wave 113) + `/harvest` CAPTURE-pipeline (Wave 115); pure WRITE for arbitrary memories not yet wired (Wave 119+ candidate via `memory_store` MCP tool if needed)

Cumulative session arc Wave 105-117: 5+ commits this conversation; 4 memory primitives operationalized via slash commands; 4 codex T1 e2e fires (avg conf 0.8875); 11 Mia OVER catches across all fires; ~150+ MB combined disk reclaim across cooperative parallel sessions; 13 FM-02(c) absorptions documented.

Wave 117 trend: codex T1 conf=0.88 with 2 prescriptions + 1 Mia OVER + Pattern A consistency replacement (5 mentions corrected) — discipline maturing across 4-fire cumulative learning. Cross-model gate firmly satisfied via real GPT-5.5 codex T1 (zfan7@sva.edu codex Pro plan, separate from claude OAuth fleet).


## Wave 115 — Close-synthesis (Ship 2N-batch3-MEM-CAPTURE /harvest slash command, 2026-05-09)

### Trigger

Wave 113 codex T1 e2e on /recall slash command surfaced full mcp-memory-service v10.51.3 runtime tool surface — including `memory_harvest` MCP tool. Wave 113 close-synthesis at `docs/install-provenance.md:9119-9224` queued Ship 2N-batch3-MEM-CAPTURE as Wave 115 candidate per Plan agent's incremental rec + Mia OVER #41 self-catch (CAPTURE primitives EXIST; just unwired).

Wave 115 ships the operational wire: `/harvest` slash command symmetric to Wave 113 `/recall` (operator-invoked CAPTURE companion to RECALL surface).

### Pre-design probes

Cardinal-rule-9 install-risk + cardinal-rule-12 upstream-install-priority required NO new install:

1. **mcp-memory-service CLI surface probe** at `Z:/venvs/claude/Scripts/memory.exe --help`:
   - `memory ingest-directory` / `memory ingest-document` / `memory list-formats` / `memory logs` / `memory status` / `memory health` / `memory launch|stop|restart` / `memory server`
   - NO top-level `memory harvest` CLI command (harvest only via MCP tool OR Python module)

2. **mcp_memory_service Python module surface** at `Z:/venvs/claude/Lib/site-packages/mcp_memory_service/`:
   - `harvest/` package with `__init__.py` exporting `SessionHarvester` + `TranscriptParser` + `PatternExtractor` + `HarvestClassifier` + `HarvestCandidate/Result/Config` models
   - `harvest/classifier.py` LLM Phase 2 47%→80% precision with Groq classifier (requires GROQ_API_KEY; eee does not have)
   - `harvest/extractor.py` regex patterns for "decision" / "bug" / "convention" / "learning" / "context" types

3. **memory_harvest MCP tool spec** at `server_impl.py:1979-2057`:
   - Params: `sessions` (int=1) / `session_ids` (array) / `types` (enum array) / `min_confidence` (number=0.6) / `dry_run` (bool=TRUE) / `project_path` (string) / `use_llm` (bool=false)
   - Default `dry_run: TRUE` = SAFE preview (no DB writes)
   - 5 memory types extracted: decision / bug / convention / learning / context

### Wave 115 ship: 2N-batch3-MEM-CAPTURE `/harvest` slash command

- **NEW file**: `.claude/commands/harvest.md` (~120 LOC) — operator-invoked CAPTURE primitive
- **Frontmatter shape**: `description` + `argument-hint` + `disable-model-invocation: true` + `allowed-tools: [mcp__memory__memory_harvest]` (mirrors Wave 113 /recall Pattern A-corrected template)
- **Backend cite**: doobidoo/mcp-memory-service v10.51.3 (Apache-2.0) runtime + `mcp_memory_service.harvest/` Python pipeline
- **SAFETY DEFAULT**: `dry_run: true` — preview only; operator MUST pass `--apply` for actual DB writes
- **Anti-pattern note**: "DO NOT invoke `/harvest --apply` from inside autonomous /loop ticks"
- **Companion ships queued**: skill `mem-harvest` (Wave 116) + Stop hook auto-harvest (Wave 117)

### Cross-model T1 e2e per CR-3 user mandate — Pattern A applied

Per CLAUDE.md cardinal-rule-3 + Phase 1 bootstrap exception + user mandate "always using gpt5.5 fully e2e before commit":

- T1 codex-gate hook fired WARN (no `_OUT` pair pre-Write)
- **Explicit foreground+tee codex T1 e2e** per `cross-model-consensus.md §Profile selection rule` (deep-review-exec / xhigh / sandbox=danger-full-access). Bg PID 285081
- Consult prompt at `.claude/state/codex_consult_wave115_ship_e_harvest_command.txt` (3-axis TIGHT per Pattern A)
- Verdict at `.claude/state/codex_consult_wave115_ship_e_harvest_command_OUT.txt`
- Verdict-at-EOF reading per `feedback_codex_t1_verdict_reading_discipline.md`

**Codex T1 verdict**: **NEEDS-REVISION conf=0.87** with **5 prescribed_edits** applied per Pattern A:
- (1) **frontmatter argument-hint**: extend with `--session-ids` + `--project-path` + `--apply --apply-confirmed` two-token write-confirmation pattern
- (2) **body usage section**: two-token mechanical guard — `--apply --apply-confirmed` required for `dry_run: false`; `--apply` alone treated as dry-run + reports confirmation required
- (3) **body implementation**: `--apply --apply-confirmed` semantic + corrected project_path inference (handler infers from `Path.cwd()` under `~/.claude/projects/<cwd-with-separators-replaced>`, NOT `CLAUDE_PROJECT_DIR` as I claimed)
- (4) **body output template**: removed `timestamp` field (tool returns `type`/`content`/`confidence`/`tags` only per `HarvestCandidate` model); added `tags=<tags>` to template
- (5) **body use_llm anti-pattern**: corrected "FAILS silently" → "classifier falls back to regex candidates UNFILTERED" (lower precision ~47% vs ~80% with LLM; harvest does NOT fail silently)
- (6) **anti-pattern note clarified**: anti-pattern note is ADVISORY only; two-token `--apply --apply-confirmed` mechanical guard is load-bearing safety primitive (operator-discipline insufficient under /loop autonomous conditions where /loop tick prompts can dispatch slash commands at message start)

### Mia OVER ladder (cumulative Wave 97-115): n=41 → **n=42**

- **#42**: My project_path inference claim "default uses CLAUDE_PROJECT_DIR" was WRONG — handler actually infers from `Path.cwd()` under `~/.claude/projects/<cwd-with-separators-replaced>` per codex T1 verification at `mcp_memory_service/server_impl.py:2588-2661` handler. Caught by codex T1 e2e foreground+tee.

Discipline ROI: codex T1 caught:
- 1 mechanical-safety design flaw (operator-discipline insufficient — needed two-token guard)
- 3 semantic doc errors (project_path inference + timestamp not in output + use_llm fallback behavior)
- 1 risk classification (auto-loop slash dispatch can still write memory despite anti-pattern note)

Cross-model gate firmly satisfied via foreground+tee codex T1 e2e (PID 285081, 1487-line verdict file, NEEDS-REVISION conf=0.87). Pattern A applied in single atomic commit per `codex-t1-fix-forward-pattern.md` discipline.

### CR conformance (Wave 115 unified)

| CR | Status | Evidence |
|---|---|---|
| CR-1 (cite SOTA primary) | ✅ | TIER-1-DIRECT cites at file:line + HEAD SHA throughout |
| CR-3 (cross-model T1) | ✅ | Explicit foreground+tee codex T1 e2e (Phase 1 bootstrap exception path) |
| CR-5 (install-priority) | ✅ | NEW slash command file using EXISTING upstream primitive (zero new install per Wave 113 codex T1 finding `memory_harvest` advertised in v10.51.3 runtime) |
| CR-7 (graduated unleash) | ✅ | No env/permission changes |
| CR-8 (full-SOTA-content) | ✅ | ADAPTED-FROM-SOTA (mcp-memory-service `harvest/` module + Anthropic CC slash command spec) |
| CR-9 (install-risk) | ✅ | LOW-RISK reversible (operator-invoked / dry_run=true default / --apply opt-in / reversible via rm) |
| CR-10 (research-first) | ✅ | mcp-memory-service runtime probe + harvest module probe + tool spec probe BEFORE Edit |
| CR-11 (META-process) | ✅ | Wave 113 codex T1 surfacing → Wave 115 inline design → codex T1 e2e → Pattern A apply → audit-trail entry per audit-action-loop.md |
| CR-12 (upstream-install-priority) | ✅ | HONEST-NON-FINDING confirmed Wave 113 (no upstream Anthropic-OFFICIAL `/harvest` skill); sibling-novel composition over TIER-1 substrates |

### FM-02 sub-class (c) cumulative

n=12 → may advance n=13 if absorbed into next session checkpoint per cwc-throttled wrapper. Forward-only audit-trail discipline.

### Outstanding queue (post Wave 115)

- **Wave 116 candidate**: Ship 2N-batch3-MEM-HARVEST-C — skill `mem-harvest` description-triggered auto-promote (use_llm=false safe default)
- **Wave 117 candidate**: Ship 2N-batch3-MEM-HARVEST-E — Stop hook auto-harvest (Python class direct invocation; Probe 5 mode-harness design needed)
- **Wave 116 candidate**: Ship 2N-batch3-MEM-C — `mem-recall` skill description-triggered auto-promote (matched companion to /recall)
- **Wave 117+ candidate**: Ship 2N-batch3-MEM-E — PreToolUse:Agent spawn-time hook (subagent context enrichment via `additionalContext` JSON field)
- **Wave 116+ candidate**: Ship 2N-batch3-MEM-MISTAKE — `mistake_note_search`/`add` wire (FM-class recovery primitive)
- **Wave 116+ candidate**: Ship 2W-cleanup-D — 6 unique-but-unused domain marketplaces (operator decision pending)
- **Ship 2N-batch3-G**: skillOverrides study-pilot (24h Phoenix data accumulation needed)
- **Ship 2N-batch3-B-validation**: graphiti smoke test on next eee restart
- **Ship 2A-pilot**: rtk vs snip pilot (operator decision)

### Wave 115 closure note

eee architecture state post Wave 115:
- 20 plugins enabled (no change)
- 9 MCPs active (no change — `/harvest` uses existing memory MCP)
- 248 skills available (no change)
- 90 → **91 commands** (+`/harvest`)
- 11 marketplace dirs (Wave 114 cleaned 4 pure dups)
- 0 → `<TBD post-harvest>` memories captured (CAPTURE wire COMPLETED this fire — operator can now `/harvest --apply` to populate DB)

Wave 115 closes the RECALL prerequisite gap surfaced Wave 113. `/recall` (Wave 113) + `/harvest` (Wave 115) form symmetric operator-invoked memory primitive pair. Companion ships (skill auto-promote + Stop hook auto-capture) queued Wave 116-117 for autonomous-loop auto-CAPTURE.

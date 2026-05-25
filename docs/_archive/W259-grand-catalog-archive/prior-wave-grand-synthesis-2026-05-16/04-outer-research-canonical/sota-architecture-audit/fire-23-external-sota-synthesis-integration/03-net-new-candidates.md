# 03 — NET-NEW Candidates (9 items from external research not yet in Wave 134 audit)

> **Purpose**: enumerate 9 NET-NEW items surfaced by user's external SOTA synthesis that
> have NOT yet been cross-model verified in Wave 134 fires. Apply Probe DAG 1-7 candidacy
> assessment + propose Fire 24+ ship plan.

## NET-NEW inventory (9 items)

### NN-1: BMAD-METHOD v6 (`bmad-code-org/BMAD-METHOD`)

- **Tier**: 1 (methodology framework)
- **User pitch**: virtual team, 12+ specialized agent personas, Skills Architecture v6
- **Probe 4 plugin-namespace**: would `bmad` plugin collide with eee's existing 21 plugins? Check `marketplaces/*` for namespace conflict
- **Probe 7 demand-gate**:
  - 7.a (demand-absence): eee has 12 specialized agents (architect / code-reviewer / debugger / verifier / sota-researcher / gpt5-reviewer / gpt5-archaeologist / codex-rescue / etc.) — does BMAD add NEW agent personas not covered? PRELIMINARY: likely OVERLAP
  - 7.b (demand-creates-new-workflow): two-phase planning→story-files handoff would be a NEW workflow shape vs eee's per-fire dispatch
- **CR-9 sibling-bleed**: NOT a sibling cite-import; would be upstream install per CR-12
- **Effort**: HIGH (heavy framework install)
- **Verdict pre-Probe-DAG**: PROBE-DAG-CANDIDATE — likely Probe 7.a REJECT-FOR-FIT (overlap with existing agent inventory) but worth Path P codex T1 verification

### NN-2: CCPM (`automazeio/ccpm`)

- **Tier**: 2 (PM layer, 🥇 user's top pick)
- **User pitch**: PRD → epic → tasks all plain markdown, GitHub Issues sync, cleanest "markdown is the database"
- **Probe 7.b 5-clause check**:
  - Named operational use case: structured per-feature PRD/epic tracking → eee currently uses `docs/sota-architecture-audit/fire-N-*/` per-fire MD folders + TaskCreate/TaskUpdate (PARTIAL MATCH; CCPM more structured)
  - Cited local input/source path: would consume `.claude/prds/` and `.claude/epics/<feature>/` — NOT YET present in eee
  - Wiring path: GitHub Issues sync optional; install via plugin marketplace OR clone
  - Incumbent comparison: eee's TaskCreate/TaskUpdate + per-fire MD folder is INCUMBENT; CCPM's metadata richness (`acceptance_criteria` / `effort` / `depends_on` / `parallel` / `conflicts_with`) is RICHER
  - Reversible time-box: standard 30-day STUDY-PILOT shape
- **CR-9 sibling-bleed**: NOT a sibling cite-import; upstream install
- **Effort**: MEDIUM (plugin install + workflow adoption)
- **Verdict pre-Probe-DAG**: PROBE-DAG-CANDIDATE — Probe 7.b shape looks promising for "structured PRD-epic-task workflow" demand

### NN-3: Task Master (`eyaltoledano/claude-task-master`)

- **Tier**: 2 (PM layer, 🥈)
- **User pitch**: AI-driven task generation, Perplexity-integrated research expansion, MCP-native
- **Probe 4**: MCP-native — would need namespace check vs existing 23 MCP servers
- **Probe 7.b**:
  - Named use case: PRD parsing + auto-decomposition with research backing
  - Incumbent: eee has no auto-PRD-decomposition primitive; sota-researcher subagent serves research role
  - Demand: eee fires use ORCHESTRATOR-side decomposition (manual); Task Master would auto-generate
- **CR-9**: upstream install
- **Effort**: MEDIUM-HIGH (MCP install + workflow change)
- **Verdict pre-Probe-DAG**: PROBE-DAG-CANDIDATE — Probe 7.b clause 4 (incumbent comparison) needs cross-model verification; possible AI-driven decomposition is NEW capability

### NN-4: Planning-with-files (`OthmanAdi/planning-with-files`)

- **Tier**: 2 (PM layer, 🥉 minimalist)
- **User pitch**: `task_plan.md + findings.md + progress.md` + `/plan` and `/start` commands + hash-attestation
- **Probe 7.b**:
  - eee already uses `docs/sota-architecture-audit/fire-N-*/00-tracker.md + 01-*.md` per-fire pattern — STRUCTURALLY EQUIVALENT to Manus pattern
  - Hash-attestation for plans would be NEW (eee doesn't currently hash-attest)
- **CR-9**: upstream install
- **Effort**: LOW (minimal plugin)
- **Verdict pre-Probe-DAG**: REJECT-FOR-FIT-LIKELY — eee already implements equivalent pattern more comprehensively; hash-attestation could be CITE-PATTERN-EXTRACT instead

### NN-5: Agent OS v3 (`buildermethods/agent-os`)

- **Tier**: 3 (standards injection)
- **User pitch**: `/inject-standards` + `/shape-spec` standards-as-skills indexing
- **Probe 7.b**:
  - eee uses sibling cite-import-AMBER from `Z:/claude-sota/.claude/rules/` for standards — DIFFERENT MECHANISM, SAME PURPOSE
  - Agent OS v3 RETIRED implementation phase per user's research (defers to Plan Mode) — converges with eee's design
- **CR-9**: upstream install
- **Effort**: MEDIUM (plugin install + standards re-indexing)
- **Verdict pre-Probe-DAG**: PROBE-DAG-CANDIDATE — Probe 7.b clause 4 incumbent check needed; possible CITE-PATTERN-EXTRACT of `/inject-standards` slash command pattern

### NN-6: Claude Memory Bank (`russbeye/claude-memory-bank`)

- **Tier**: 3 (persistent project knowledge)
- **User pitch**: `.claude/memory_bank/` categorized (decisions/patterns/architecture/troubleshooting) + JIT retrieval + 12 specialized memory agents
- **Probe 4 plugin-namespace**:
  - eee already has L1 mcp-memory-service (sqlite_vec) + L3 Graphiti (FalkorDB) + auto-memory `MEMORY.md` index
  - Claude Memory Bank's "12 specialized memory agents" overlaps with eee's existing agent layer
- **Probe 7.b**:
  - Named use case: queryable institutional knowledge across sessions
  - Incumbent: eee L1 mcp-memory + L3 Graphiti + `MEMORY.md` already serves
  - DEMAND: would Claude Memory Bank's category-structured retrieval add value over L1/L3 semantic search?
- **CR-9**: upstream install
- **Effort**: MEDIUM-HIGH (overlaps with installed L1/L3)
- **Verdict pre-Probe-DAG**: PROBE-DAG-CANDIDATE — Probe 4 likely fail (DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4 vs L1+L3); Probe 7.b incumbent check needed

### NN-7: travisvn/awesome-claude-skills

- **Tier**: 4 (curated skill library, awesome-list)
- **User pitch**: best-curated awesome-list sister to ComposioHQ
- **Status**: REMOTE-ONLY discovery surface (NOT install-class)
- **Verdict**: ADD-TO-DISCOVERY-SURFACE — no Probe DAG needed; cite-only reference for skill discovery (per `research-protocol.md` curated catalogs list)

### NN-8: claudemarketplaces.com

- **Tier**: 4 (discovery UI)
- **User pitch**: discovery UI for marketplace plugins
- **Status**: WEB UI (not local install)
- **Verdict**: ADD-TO-DISCOVERY-SURFACE — operator-side reference for marketplace browsing

### NN-9: skillsmp.com

- **Tier**: 4 (discovery UI)
- **User pitch**: skills discovery UI
- **Status**: WEB UI (not local install)
- **Verdict**: ADD-TO-DISCOVERY-SURFACE — operator-side reference

## Aggregate NET-NEW disposition

| Verdict | Count | Items |
|---|---|---|
| PROBE-DAG-CANDIDATE | 5 | NN-1 BMAD / NN-2 CCPM / NN-3 Task Master / NN-5 Agent OS v3 / NN-6 Claude Memory Bank |
| REJECT-FOR-FIT-LIKELY | 1 | NN-4 Planning-with-files (eee pattern is equivalent + comprehensive) |
| ADD-TO-DISCOVERY-SURFACE | 3 | NN-7 travisvn awesome-list / NN-8 claudemarketplaces.com / NN-9 skillsmp.com |

## Forward-fire roadmap (Fire 24+)

### Tier 1 NEW — Path P codex T1 cross-model verification (5 ships)

Apply Path P recipe (n=8/8 reproducible) to each PROBE-DAG-CANDIDATE:

| Fire | Subject | Probe DAG focus |
|---|---|---|
| W134-F24-A | NN-1 BMAD-METHOD v6 | Probe 7.a demand-gate vs eee's 12 agents |
| W134-F24-B | NN-2 CCPM | Probe 7.b PRD/epic/task workflow incumbent comparison |
| W134-F24-C | NN-3 Task Master | Probe 7.b AI-decomposition demand check + MCP-namespace audit |
| W134-F24-D | NN-5 Agent OS v3 | Probe 7.b standards-injection incumbent comparison (sibling cite-import-AMBER) |
| W134-F24-E | NN-6 Claude Memory Bank | Probe 4 + Probe 7.b — likely DUPLICATE-FUNCTIONALITY vs L1+L3+MEMORY.md |

Estimated effort: ~5 × 30-90min Path P consults = ~2.5-7.5 hours.

### Tier 2 NEW — Discovery surface integration (3 ships)

| Fire | Subject | Action |
|---|---|---|
| W134-F25-A | NN-7 travisvn awesome-list | Add to `research-protocol.md §curated catalogs` discovery surface |
| W134-F25-B | NN-8 claudemarketplaces.com | Add to same curated-catalogs list (web UI reference) |
| W134-F25-C | NN-9 skillsmp.com | Add to same curated-catalogs list (web UI reference) |

Estimated effort: ~3 × 15min doc-only edits = ~45min total.

### Tier 3 NEW — Cite-pattern extract (1 ship if Agent OS v3 audits APPROVE)

| Fire | Subject | Action |
|---|---|---|
| W134-F26-A (gated on NN-5 verdict) | Agent OS v3 `/inject-standards` slash command pattern | CITE-PATTERN-EXTRACT to eee's existing `Z:/claude-sota/.claude/rules/` standards layer |

## Mia pre-apply ladder advance

n=1490 → n=1499 (+9: 9 NET-NEW items enumerated / Probe DAG candidacy assessed per item / aggregate disposition 5+1+3 / Fire 24+ Tier 1-3 roadmap / effort estimates / 5 PROBE-DAG-CANDIDATE per Path P recipe / 1 REJECT-FOR-FIT-LIKELY / 3 ADD-TO-DISCOVERY-SURFACE / sibling-bleed defense applied throughout)

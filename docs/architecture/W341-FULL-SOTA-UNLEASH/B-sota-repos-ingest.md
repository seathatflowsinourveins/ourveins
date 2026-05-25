# W341 Stream B — SOTA Repos Line-by-Line Ingestion + Multi-Dim Scoring

> Wave: W341-FULL-SOTA-UNLEASH | Stream: B | Date: 2026-05-20
> Δ-DPA-1 skeleton-first-write per CLAUDE.md cardinal-rule-6 verify-before-claim.
> Cite-reference clones at `Z:/repos/deps/` (per CLAUDE.local.md "CITE-REFERENCE only, NOT an install source").

## §1 Method Summary

Per-repo ingestion: `gh api repos/<owner>/<name>` → HEAD branch/SHA/stars/pushed_at/size + `gh api repos/<owner>/<name>/license` → SPDX-id (with content-decode for NOASSERTION repos). Patterns via `mcp__deepwiki__ask_question` ("top 3 reusable patterns; cite files"). Tier per sca-v15 with D12 pattern_density as PRIMARY signal + CR-1 trust-tuple (license, freshness, maintainer-stability). Per CLAUDE.local.md "CITE-REFERENCE only": NO install actions; this stream produces a verdict ledger row only.

## §2 Per-Repo Audit Table

| # | Repo | HEAD SHA (12) | License | Stars | Last Push | Top 3 Patterns | Install Status | Tier | Install Gap |
|---|------|---------------|---------|-------|-----------|----------------|----------------|------|-------------|
| 1 | anthropics/claude-cookbooks | `39a350b6790c` (main) | MIT | 43,417 | 2026-05-19 | **Context Engineering** (`tool_use/context_engineering/context_engineering_tools.ipynb`, memory_20250818 tool); **Custom Skills Dev** (`skills/notebooks/03_skills_custom_development.ipynb`); **Orchestrator-Workers** (`patterns/agents/orchestrator_workers.ipynb` + `patterns/agents/prompts/research_lead_agent.md`) | pattern-only (citations-agent + dispatching-parallel-agents-w321-fork fork @ 39a350b6) | **T0** | none — canonical Anthropic source; cite-only by design |
| 2 | wshobson/agents | `08ded5e7b0fe` (main) | MIT | 35,708 | 2026-05-19 | **team-lead orchestrator** (agent-teams plugin); **Hybrid Orchestration (Opus→Sonnet→Haiku tiers)**; **Preset Team Compositions** (`/team-spawn` review/debug/feature/fullstack/research/security/migration) | installed (agent-teams, comprehensive-review, context-mode-ops, llm-application-dev, engineering-skills, engineering-advanced-skills, etc. — 23+ plugins from this monorepo) | **T1** | none — heavy install already; consider pin-to-SHA `08ded5e7b0fe` for freshness governance |
| 3 | addyosmani/agent-skills | `f17c6e88c904` (main) | MIT | 44,199 | 2026-05-16 | **tdd** (red-green-refactor + 80/15/5 pyramid + Beyonce Rule); **incremental-implementation** (vertical-slice + each-slice-shippable); **code-review-quality** (5-axis correctness/readability/architecture/security/perf) | partially-installed-vendor-fork @ `f17c6e88` (5-skill: doubt-driven-development, incremental-implementation, performance-optimization, security-and-hardening, source-driven-development, spec-driven-development; W316) | **T1** | minor: `tdd` skill exists in tdd-workflows plugin overlap; `code-review-quality` overlaps `code-reviewer` (pr-review-toolkit) — pattern-only is fine |
| 4 | mattpocock/skills | `b8be62ffacb0` (main) | MIT | 96,715 | 2026-05-20 | **grill-with-docs** (CONTEXT.md + ADR alignment before code); **tdd** (vertical-slice red-green-refactor); **diagnose** (6-phase reproduce→minimise→hypothesise→instrument→fix→regression-test) | partially-installed-vendor-fork @ `d54c497aa944` (10-skill: brainstorming, doubt-driven-development, grill-with-docs, diagnose, handoff, improve-codebase-architecture, learned-from-pr, planning-files, to-issues, triage; W330 P1-D + W320 B) | **T1** | minor: SHA-drift — vendor-fork @ `d54c497a` vs upstream HEAD `b8be62ff`; refresh-window 4 days; consider auto-refresh PR for `diagnose` + `grill-with-docs` |
| 5 | mksglu/context-mode | `4dcbd45144b2` (main) | **Elastic License 2.0 (ELv2)** ⚠ NON-OSI | 15,256 | 2026-05-20 | **Sandboxed tool output** (`ctx_execute` subprocess + `__CM_NET__` stderr byte-counter); **batch_execute auto-index** (`ctx_batch_execute` FTS5 + smartTruncate 100KB/cmd); **Progressive Throttled Search** (`ctx_search` 1-3/4-8/9+ tiers + Porter→trigram→fuzzy Levenshtein fallback) | installed (context-mode plugin v2026-04-18 + context-mode-ops + ctx_* tool-set; hooks active) | **T1-PROV** | **license blocker**: ELv2 prohibits hosted-service redistribution + license-key tamper. CR-1 trust-tuple FAIL — installed for personal/research use ONLY; CANNOT redistribute as part of plugin marketplace. Pin-to-SHA + audit upstream license changes monthly |
| 6 | OthmanAdi/planning-with-files | `d27008f369a5` (master) | MIT | 21,747 | 2026-05-16 | **Persistent State** (`task_plan.md` cross-session goal/phases/decisions); **Attention Manipulation** (re-read `task_plan.md` via UserPromptSubmit/PreToolUse hooks); **External Storage / 2-Action Rule** (offload to `findings.md` + `progress.md` after every 2 view/browser/search ops) | installed (planning-with-files plugin + 6 lang-variants + `durable-planning-files` local skill) | **T1** | none — installed + local `durable-planning-files` wraps the workflow; consider de-duplicating planning-with-files's 6 lang variants if not used |
| 7 | alirezarezvani/claude-skills | `8aa920812f05` (main) | MIT | 15,652 | 2026-05-20 | deepwiki reports **48 actual skills** (NOT 313 per README description); highlights `content-creator`, `product-manager-toolkit`, `senior-fullstack` as pilot-optimized — but **MOST overlap with existing engineering-skills/engineering-advanced-skills plugin** | not-touched (retired per W330 codex axis-2 §3.2 — cardinal-rule-4 trigger-overlap audit failed) | **T4** | retire-verdict held: 48 skills with avg 8+ trigger-phrases each → cardinal-rule-4 violations + >50% trigger overlap with installed plugins. Pattern-only if specific niche skill needed |
| 8 | HKUDS/CLI-Anything | `436a4f5c4245` (main) | Apache-2.0 | 38,437 | 2026-05-20 | **`skills/` unified SKILL.md layout** (`npx skills add HKUDS/CLI-Anything --skill <name> -g -y`); **CLI-Hub install-first frontend** (`pip install cli-anything-hub` + `cli-hub install <name>` + `public_registry.json` multi-source pip/npm/brew); **harness-template pattern** for wrapping software (preview_bundle.py + skill_generator.py + repl_skin.py) — 18 demo CLIs (QGIS, blender, godot, freecad, gimp, audacity, etc.) | not-touched (cite-reference clone at `Z:/repos/deps/cli-anything/`) | **T2-CHERRY** | pattern-only adoption: cherry-pick the `skill_generator.py` + harness template if/when wrapping a domain-specific tool. NOT a fit for general-purpose install (out-of-scope; this runtime targets coding-agent skills, not 18-CLI domain wrappers) |
| 9 | abhigyanpatwari/GitNexus | `c34c36036f2d` (main) | **PolyForm Noncommercial 1.0.0** ⚠ NON-OSI | 39,307 | 2026-05-20 | **Graph Adapter** (`knowledgeGraphToGraphology` decouples KnowledgeGraph from Sigma.js); **State-Driven Filtering** (depth/label/edge filters via `useAppState` hook); **Ref-Based Focus** (`useImperativeHandle` + GraphCanvasHandle bridge imperative+declarative). Server-side: DAG pipeline orchestrator (`gitnexus/src/core/ingestion/pipeline.ts`) | not-touched (cite-reference clone at `Z:/repos/deps/gitnexus/`) + local `gitnexus` skill points at MCP namespace (not actually installed; `local-cypher-codebase` is the working substitute per CLAUDE.md skill-list) | **T2-CHERRY** | **license blocker**: PolyForm Noncommercial — fine for personal/research use, but redistribution restricted. Local `local-cypher-codebase` skill already covers the actual capability (Cypher-style graph queries via serena symbol-find + Grep chains) WITHOUT the license restriction. Pattern-only sustainable; do NOT install the MCP |
| 10 | colbymchenry/codegraph | `a47355780b13` (main) | MIT | 8,966 | 2026-05-20 | **Instance Pooling + Lazy Init** (`ToolHandler.projectCache` map + `MCPServer.tryInitializeDefault` walk-up); **Subsystem Composition via DI** (`CodeGraph` orchestrates ExtractionOrchestrator/ReferenceResolver/GraphQueryManager/GraphTraverser/ContextBuilder via shared `QueryBuilder` interface); **Hook-Based Async Sync** (PostToolUse `mark-dirty` writes `.codegraph/.dirty`; Stop `sync-if-dirty` spawns detached background sync) | not-touched (cite-reference clone at `Z:/repos/deps/codegraph/`) | **T1-PROV** | **strong candidate for install**: MIT + local-first + pre-indexed graph + Claude Code hook integration = direct value-add. Gap: needs SQLite + indexing pre-step; competes with `local-cypher-codebase` skill but offers persistent index. Recommend: pin-to-SHA pilot install in W342, A/B vs local-cypher-codebase |

## §3 Install-Gap Matrix

| Repo | Current State | Action to T1 | Blocker |
|---|---|---|---|
| claude-cookbooks | pattern-only T0 | n/a (cite-canonical) | none |
| wshobson/agents | installed T1 | pin to `08ded5e7b0fe` | none |
| addyosmani/agent-skills | vendor-fork @ `f17c6e88` T1 | refresh SHA + audit trigger-overlap | none |
| mattpocock/skills | vendor-fork @ `d54c497a` T1 | refresh-PR to `b8be62ff` | none |
| mksglu/context-mode | installed T1-PROV | n/a (cannot upgrade tier) | **ELv2 license** — redistribute-block |
| OthmanAdi/planning-with-files | installed T1 | de-dup 6 lang variants | none |
| alirezarezvani/claude-skills | not-touched T4 | n/a (retire-held) | trigger-overlap + 313/48 description fabrication |
| HKUDS/CLI-Anything | pattern-only T2-CHERRY | adopt `skill_generator.py` if domain-CLI-wrap needed | scope-mismatch |
| abhigyanpatwari/GitNexus | pattern-only T2-CHERRY | n/a (local-cypher-codebase covers it) | **PolyForm Noncommercial** license |
| colbymchenry/codegraph | not-touched T1-PROV | pilot-install W342 + A/B vs local-cypher-codebase | none — clean MIT + clean architecture |

## §4 Verdict-Tier Roll-Up

- **T0 canonical-cite**: 1 (claude-cookbooks)
- **T1 installed**: 4 (wshobson/agents, addyosmani vendor-fork, mattpocock vendor-fork, planning-with-files)
- **T1-PROV provisional-install**: 2 (mksglu/context-mode [installed but license-capped], codegraph [recommend pilot])
- **T2-CHERRY pattern-only**: 2 (HKUDS/CLI-Anything scope-mismatch, abhigyanpatwari/GitNexus license-capped)
- **T4 retire-held**: 1 (alirezarezvani/claude-skills)
- **T5 reject**: 0

**Top recommendation**: pilot-install `colbymchenry/codegraph` in W342 — clean MIT license, novel hook-based async sync pattern, direct Claude Code integration, complements local-cypher-codebase without trigger conflict.

**Top governance action**: SHA-pin vendor-forks (addyosmani `f17c6e88`, mattpocock `d54c497a`) + monthly refresh-PR cadence. Both have advanced 1-4 days since vendor-fork.

**Top risk**: mksglu/context-mode ELv2 — runtime depends on `ctx_*` tools heavily; license forbids redistribution. Quarterly upstream-license-change audit required.

## §5 Cite-Anchors

All facts in this document trace to one of:

1. `gh api repos/<owner>/<name>` JSON output — captured in conversation tool-results (stars/pushed_at/size/default_branch)
2. `gh api repos/<owner>/<name>/commits/<branch>` — HEAD SHA (12-char truncation)
3. `gh api repos/<owner>/<name>/license` — SPDX-id + base64-decoded LICENSE content (verified ELv2 for mksglu/context-mode + PolyForm-NC for GitNexus)
4. `mcp__deepwiki__ask_question` — top-3-patterns extraction (8 of 10 repos returned cite-anchored patterns; 2 needed follow-up: codegraph, alirezarezvani)
5. CLAUDE.md L7-15 + L116-127 — current install-set canonical statement
6. `Z:/repos/deps/cli-anything/README.md` lines 1-60 + `Z:/repos/deps/cli-anything/cli-anything-plugin/` directory listing — CLI-Anything pattern extraction

Cross-references:
- W316: addyosmani 5-skill vendor-fork install
- W330 P1-D + W320 B: mattpocock 10-skill vendor-fork install
- W333 SKILLS-INVENTORY: full local-curated skill enumeration (queued)
- W330 codex axis-2 §3.2: alirezarezvani retire-verdict basis

STATUS: COMPLETE (10/10 repos audited; 0 carry-forward; W341-Stream-B ready for ship-gate)

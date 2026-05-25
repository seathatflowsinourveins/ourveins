# Wave 133 Fire 1 Agent B — Architecture Gap Audit (kits v62 vs sota-installed-manifest)

agent: architect (Sonnet stand-in per CLAUDE.local.md ENV (g) standby)
task: ARCHITECTURAL gap audit between kit v62 and current `docs/sota-installed-manifest.md` (28+ sections)
scope: ARCHITECTURAL axes only (NOT individual repo gaps — that's Agent A)
date: 2026-05-10

---

## Method

- Source A read (kit v62 — 22 .md files / REPO_METADATA.json / SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md)
- Source B read (current `docs/sota-installed-manifest.md` 28+ sections + filesystem probe of plugins/cache + npm global + venv binaries + `.mcp.json` + `.claude/agents/` + `.claude/rules/`)
- Cross-check Probe 5 (mode-harness-shape) — autonomous /loop install-only runtime fit per `agent-harness-fit-verification.md`
- Cross-check kiss-dry-yagni Must-Never #4 — confirm gap NOT already-installed under different label

## Headline finding

**The current manifest already covers ~90% of v62 architectural axes.** Wave 50 fire 5 (Agent A/D) + Wave 50 fire 11 (Agent J/K) + Wave 62 + Wave 82 + Wave 105 + Wave 122-132 fires have collectively built out the manifest into a superset of v62. Real architectural gaps are NARROW + targeted.

**Non-gap categories** (already addressed in manifest, NOT P0/P1/P2):
- Token-context architecture (8 v62 layers) — covered in Section 6 + Section 6.6 + Wave 82g token-efficiency layer (rtk + openspec + ccusage + context-mode INSTALLED via npm-global)
- Memory MCP taxonomy (L1/L2/L3) — covered in Section 4 (memory L1 INSTALLED + qdrant L2 STAGED-IMAGE-RUNNING + graphiti L3 PARTIAL)
- Codex-plugin-cc workflow — covered in Section 2 (codex CLI 0.130.0 INSTALLED) + Section 14 (gpt5-reviewer/gpt5-archaeologist subagents)
- Parallel worktree automation — covered in CLAUDE.local.md ENV + cardinal-rule-7 + sibling parallel-session-worktree-isolation.md
- Security/quality elite tools — covered in Section 5 + Section 5 EXPANSION (semgrep/gitleaks INSTALLED + 9 NEW security tools tabled)
- Code intelligence — covered in Section 7 + Section 7 EXPANSION (gitnexus/serena/repomix INSTALLED + ast-grep/code2prompt tabled)
- Search+research MCPs — covered in Section 8 (exa/perplexity/firecrawl/context7/deepwiki/arxiv/github MCP)
- Long-running agent harness primitives — covered in Section 17 (cwc-long-running-agents 5 primitives INSTALLED-DORMANT)
- Research-first architecture — covered in Section 18 (cardinal-rule-10 research workflow)
- Eval/Benchmark/Observability — Section 15 PLANNED with full v62 vendor list

---

## P0 architectural gaps (critical missing axis)

### P0-1 — V62 Phase 0-8 Execute Plan as DURABLE ARCHITECTURAL DOCTRINE

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/EXECUTE_V62_ELITE_PLAN.md` (8 phases: Freeze baseline / Install default small stack / Concise durable instructions / Verification gates / Codex as 2nd-model / Parallel worktree / Audit selective tools / Benchmark-before-adoption / Continuous convergence loop)
- **manifest_cite**: NOT-PRESENT (Section 17 covers cwc primitives + Section 18 covers research workflow; v62 EXECUTE PLAN as 8-phase DOCTRINE is a META-LAYER above both — codifies WHEN/HOW the manifest sections are touched)
- **architectural_role**: install-only-runtime LIFECYCLE doctrine — "Phase 7 Benchmark-before-adoption" + "Phase 8 Continuous convergence loop" are the OPERATIONAL discipline that prevents tier-by-tier MCP slot-occupation drift; sister to cardinal-rule-7 graduated-unleash but at PROCESS layer not PERMISSION layer
- **install_or_cite_class**: cite-class — TIER-1-DIRECT to v62 EXECUTE_V62_ELITE_PLAN.md @ HEAD (kit v62 source-of-truth at `Z:/claude-sota/docs/outer research/kits/v62/`)
- **probe_5_mode_harness_shape_fit**: PASS — autonomous /loop install-only runtime IS the v62 Phase 0-8 use case
- **kiss_dry_yagni_check**: NO-DUPLICATE — Section 18 covers research-then-install at FIRE granularity; v62 Phase 0-8 covers ARC granularity (cycle-of-cycles); orthogonal layers
- **next_fire_estimate**: 1-2 dispatches + ~80-120 LOC + low-medium complexity (cite-class extraction with light orchestration delta)

### P0-2 — Source-audit-before-install discipline as STANDING DIRECTIVE

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/SOURCE_AUDIT_NOTES.md` (Audit before installing / Audit checklist / Reject if — 3 enumerated lists)
- **manifest_cite**: PARTIAL-PRESENT — covered indirectly in cardinal-rule-9 install-risk discipline (REVERT check + sibling-bleed defense) + agent-harness-fit-verification.md Probe 1-7 + convergence-gate Axis 1-3 + cardinal-rule-12 cite-class lattice; v62 SOURCE_AUDIT_NOTES is a CONSOLIDATED reference checklist that none of the existing cardinal-rules surface as a standalone audit-before-install list
- **architectural_role**: pre-install-discipline CONSOLIDATED CHECKLIST — current discipline is split across CR-9 + Probe DAG + convergence-gate; v62 surfaces it as ONE CHECKLIST that operator can run mechanically before any install
- **install_or_cite_class**: cite-class — TIER-1-DIRECT to v62 SOURCE_AUDIT_NOTES.md
- **probe_5_mode_harness_shape_fit**: PASS — install-only runtime needs pre-install audit checklist as cardinal-rule-11 META-process consequence
- **kiss_dry_yagni_check**: NO-DUPLICATE — consolidates dispersed CR-1+9+10+12+CR-8 conformance into ONE actionable checklist; companion to existing rules (router only)
- **next_fire_estimate**: 1 dispatch + ~60 LOC consolidated checklist + low complexity

---

## P1 architectural gaps (important enhancement)

### P1-1 — Local Benchmark-Before-Adoption GATE as CARDINAL-RULE-15 EXTENSION

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/EVAL_BENCHMARK_OBSERVABILITY.md` §"Minimum local benchmark" (5-step: 3 representative repo tasks → baseline Claude Code → CC + candidate tool → CC + Codex review → keep only measured improvements) + `Z:/claude-sota/docs/outer research/kits/v62/EXECUTE_V62_ELITE_PLAN.md` Phase 7
- **manifest_cite**: NOT-PRESENT — Section 15 lists eval primitives (PLANNED openai/evals + promptfoo + deepeval + braintrust + ragas + SWE-bench) but DOES NOT codify the BEFORE-ADOPTION GATE itself; convergence-gate at `Z:/claude-sota/.claude/rules/convergence-gate.md` covers axes 1+2+3 (provenance) but NOT measured-improvement-on-this-machine
- **architectural_role**: convergence-gate Axis 4 — measured-improvement-against-baseline + only-keep-if-improves; closes the gap between "SOTA-validated upstream" and "actually improves THIS runtime's loop"
- **install_or_cite_class**: cite-class with operational hooks — TIER-1-DIRECT to v62 EVAL_BENCHMARK_OBSERVABILITY.md + sibling cite to existing convergence-gate.md axis-1+2+3 + new operator-discipline section
- **probe_5_mode_harness_shape_fit**: PASS — autonomous /loop install-only runtime is exactly the surface that benefits from benchmark-before-adoption (avoids slot-occupation creep that v62 explicitly warns against in DEFAULT_INSTALL_CORE selectivity)
- **kiss_dry_yagni_check**: NO-DUPLICATE — Section 15 lists TOOLS; this gap is the GATE-DISCIPLINE for invoking those tools per install-decision
- **next_fire_estimate**: 2-3 dispatches + ~120-180 LOC (new rule file + cardinal-rule-15 codification + Section 15 cross-link) + medium complexity

### P1-2 — Subagent Role Taxonomy from v62 MODEL_ROUTING_AND_SUBAGENTS

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/MODEL_ROUTING_AND_SUBAGENTS.md` §"Subagent design" (6 canonical roles: Planner / Implementer / Verifier / Reviewer / Security reviewer / Codex bridge)
- **manifest_cite**: PARTIAL — Section 14 has 9 subagents (architect / code-reviewer / debugger / evaluator / gpt5-archaeologist / gpt5-reviewer / sota-researcher / verifier + cwc/) but role taxonomy doesn't cleanly map to v62 6-role canonical (e.g., NO dedicated "Planner" subagent that ONLY plans without edit; NO "Security reviewer" distinct from code-reviewer; Codex bridge IS gpt5-* but role-naming-divergence)
- **architectural_role**: subagent-role-canonicalization for cross-runtime mental model + clearer dispatch-decision surface
- **install_or_cite_class**: install-class (new agents) + cite-class (rename / role-clarification) — depending on whether existing subagents map cleanly
- **probe_5_mode_harness_shape_fit**: PARTIAL — eee already has 9 subagents; canonical 6-role mapping might over-engineer (KISS risk) UNLESS a missing role surfaces real gap
- **kiss_dry_yagni_check**: PARTIAL — risk of duplicate-functionality if "Planner" added when "architect" already plans; need probe whether existing 9 cleanly cover 6 v62 canonical roles BEFORE adding/renaming
- **next_fire_estimate**: 1 dispatch + ~40 LOC mapping table or 2-3 dispatches + ~150 LOC if NEW agents needed (Mia-pre-apply gate first)

### P1-3 — AGENTS.md as CROSS-RUNTIME AGENT FORMAT

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/AGENTS.md` (1.1K) + v62 README mentions `cp -r ... AGENTS.md` to repo
- **manifest_cite**: PARTIAL — Section 14.5 "AGENTS.md cross-runtime agent format" referenced as Tier 5 row but NO row block defining the format itself; CLAUDE.md Architecture §17 mentions sub-agents docs but NOT cross-runtime AGENTS.md convention
- **architectural_role**: cross-runtime agent format that lets Codex/Cursor/OpenCode/Aider/etc consume the same agent definitions — interop primitive
- **install_or_cite_class**: bootstrap-class with cite-class extension — adapt v62 AGENTS.md to eee runtime + cite v62 source
- **probe_5_mode_harness_shape_fit**: PASS — install-only runtime IS the runtime that will dispatch across multiple AI CLI tools (codex CLI 0.130.0 INSTALLED + gemini-cli@0.34.0 INSTALLED + acpx@0.3.1 INSTALLED + bun@1.3.13)
- **kiss_dry_yagni_check**: NO-DUPLICATE — `.claude/agents/` is CC-specific; AGENTS.md is cross-runtime
- **next_fire_estimate**: 1 dispatch + ~60 LOC AGENTS.md bootstrap file + low complexity

### P1-4 — Token-Context Layer Mapping per V62 8-Layer Taxonomy

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/TOKEN_CONTEXT_ARCHITECTURE.md` §"Layers" (1: Measurement / 2: Shell-output compression / 3: Semantic retrieval / 4: Repo capsules / 5: Large-output sandboxing / 6: Cross-agent compression/memory / 7: Read-path profiling/rewriting / 8: Documentation/browser selective MCP)
- **manifest_cite**: PARTIAL — Section 6 + Section 6.6 + Section 7 + Section 8 cover the TOOLS per layer, but NO consolidated mapping table that says "Layer N → eee primitive(s)"; gap-detection difficult without the mapping (e.g., Layer 7 read-path profiling — Wet/Whetstone/Skinny Jeans/Distill — is NOT INSTALLED in any current section)
- **architectural_role**: token-cost-architecture taxonomy for slot-occupation discipline — surfaces which layers are gapped vs over-installed
- **install_or_cite_class**: cite-class (consolidated mapping in Section 6 or new sub-section) + install-class for any GENUINE-GAP layers (e.g., Layer 7 read-path profiling)
- **probe_5_mode_harness_shape_fit**: PASS — autonomous /loop is exactly the use case where Layer 1+2+3+5+6 are load-bearing
- **kiss_dry_yagni_check**: NO-DUPLICATE — current sections list TOOLS without LAYER-MAPPING; this gap adds the architectural mapping
- **next_fire_estimate**: 1-2 dispatches + ~80 LOC mapping table + Mia-pre-apply for Layer 7 GENUINE-GAP probe + low-medium complexity

### P1-5 — DEFAULT_INSTALL_CORE 13-tool minimum baseline VALIDATION

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` §DEFAULT_INSTALL_CORE (13 tools: ccusage / rtk / serena / repomix / ripgrep / fd / jq / yq / gh / pre-commit / just / mise / uv)
- **manifest_cite**: PARTIAL — Section 10 EXPANSION lists Docker / uv / just / yq as PLANNED; rtk + repomix + ccusage INSTALLED via npm-global; jq / rg / gh / fd not surfaced in manifest; pre-commit / mise / serena MCP-form INSTALLED but CLI-form unverified
- **architectural_role**: DEFAULT_INSTALL_CORE-VS-INSTALLED verification baseline — establishes "minimum stack" baseline against which all advanced installs are measured (per v62 ELITE convergence design)
- **install_or_cite_class**: install-class (gh/jq/yq/fd/just/mise/uv) + cite-class verification of existing INSTALLED rows
- **probe_5_mode_harness_shape_fit**: PASS — these are foundational CLI tools the autonomous loop assumes
- **kiss_dry_yagni_check**: NO-DUPLICATE — Section 10 EXPANSION already started but incomplete; this gap completes the 13-tool baseline
- **next_fire_estimate**: 2 dispatches + ~80 LOC + smoke probes per tool + low-medium complexity

---

## P2 architectural gaps (nice-to-have polish)

### P2-1 — Per-Phase READ-ORDER documentation for v62 14-file kit consumption

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/README.md` §"Read order" (14 files in specific order)
- **manifest_cite**: NOT-PRESENT — manifest is INSTALL artifact registry; no consolidated "READ THIS BEFORE TOUCHING THE RUNTIME" reading-order surface for operator orientation
- **architectural_role**: operator-onboarding orientation surface
- **install_or_cite_class**: cite-class (docs file pointing to v62 read order)
- **probe_5_mode_harness_shape_fit**: PASS — operator clarity
- **kiss_dry_yagni_check**: NO-DUPLICATE — distinct from CLAUDE.md (cardinal rules) + manifest (install registry)
- **next_fire_estimate**: 1 dispatch + ~30 LOC + low complexity

### P2-2 — COMMUNITY_CONSENSUS_2026 translation table to eee architecture

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/COMMUNITY_CONSENSUS_2026.md` §"Translation into harness architecture" (issue/spec → plan → worktree → impl → tests → Codex review → CI → PR → ADR/skills update)
- **manifest_cite**: PARTIAL — workflow primitives exist but the CONSENSUS-2026 translation pipeline NOT codified as a single architectural flow
- **architectural_role**: end-to-end workflow translation reference
- **install_or_cite_class**: cite-class (rule or skill) + sibling cite to existing workflow
- **probe_5_mode_harness_shape_fit**: PASS — autonomous /loop benefits from canonical pipeline reference
- **kiss_dry_yagni_check**: PARTIAL — sibling claude-sota may already have similar; probe BEFORE adding
- **next_fire_estimate**: 1 dispatch + ~50 LOC + low complexity

### P2-3 — HIGH_STAR_TRIAGE 5-bucket promotion matrix (Default/Selective/Reference-only/Audit-required/Discovery-only)

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/HIGH_STAR_TRIAGE_AND_CONVERGENCE.md` (5 explicit buckets)
- **manifest_cite**: PARTIAL — manifest uses STATUS legend (INSTALLED / INSTALLED-AMBER / CITE-IMPORT-AMBER / REJECTED-POST-PROBE / PLANNED / CITE-ONLY) which OVERLAPS but doesn't 1:1 map to v62 5 buckets; e.g., "Audit-required" + "Discovery-only" are operationally distinct from CITE-ONLY
- **architectural_role**: install-status-vocabulary canonicalization with v62 alignment
- **install_or_cite_class**: cite-class (status legend extension)
- **probe_5_mode_harness_shape_fit**: PASS — disambiguates manifest status semantics
- **kiss_dry_yagni_check**: PARTIAL — risk of churn if existing status legend re-shaped; better as ALIAS table than full re-vocabulary
- **next_fire_estimate**: 1 dispatch + ~30 LOC alias table + low complexity

### P2-4 — V62 OFFICIAL_SDKS Cross-Provider Rule codification

- **kit_cite**: `Z:/claude-sota/docs/outer research/kits/v62/OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md` §"Cross-provider rule" ("Provider SDKs are foundation/reference. Do not build production wrappers around leaked or unofficial Claude Code internals.")
- **manifest_cite**: NOT-PRESENT — Section 16 lists Official SDKs as install rows but cross-provider invariant NOT codified; cardinal-rule-1 covers cite discipline; cardinal-rule-5 covers install priority; v62 cross-provider-rule is at intersection
- **architectural_role**: anti-pattern guard against leaked/unofficial wrapper-class installs
- **install_or_cite_class**: cite-class (cardinal-rule extension or new rule)
- **probe_5_mode_harness_shape_fit**: PASS — install-only runtime needs guard against unofficial source-class
- **kiss_dry_yagni_check**: PARTIAL — risk of redundancy with CR-1+5+6+8+9; but at v62 intersection point (cross-provider) is novel
- **next_fire_estimate**: 1 dispatch + ~30 LOC inline cite or cardinal-rule extension + low complexity

---

## 3-fire roadmap (Wave 133 Fire 2 + Fire 3 + Fire 4)

| Fire | Scope | Tier_advanced | Est. dispatches | Est. LOC | Blocked by |
|---|---|---|---|---|---|
| **Wave 133 Fire 2** | P0-1 v62 Phase 0-8 EXECUTE PLAN doctrine codification + P0-2 SOURCE_AUDIT_NOTES consolidated checklist | Cardinal-rule extension + new docs file | 3-4 (advanced agent team per directive: sota-researcher + architect + codex-rescue + gpt5-reviewer) | ~200-280 LOC across 2 deliverables | Agent A architecture audit complete (parallel; Wave 133 Fire 1) |
| **Wave 133 Fire 3** | P1-1 Benchmark-Before-Adoption GATE (cardinal-rule-15 + new rule file `benchmark-before-adoption.md`) + P1-5 DEFAULT_INSTALL_CORE 13-tool baseline completion (gh + jq + yq + fd installs) | Cardinal-rule add + 7 new install rows | 4-5 (sota-researcher + architect + codex-rescue + verifier + gpt5-archaeologist) | ~250-350 LOC + smoke probes per tool | Wave 133 Fire 2 complete (CR-15 needs CR-7+ context) |
| **Wave 133 Fire 4** | P1-3 AGENTS.md cross-runtime agent format + P1-4 Token-Context Layer 8-mapping table + P2-1/P2-2/P2-3/P2-4 polish (4 small docs additions) | bootstrap file + manifest mapping + 4 polish edits | 3-4 (architect + sota-researcher + code-reviewer) | ~200-260 LOC across multiple docs/sections | Wave 133 Fire 3 complete (token-mapping benefits from Fire 3 baseline) |

**Total**: 3 fires × 3-5 dispatches each = ~10-13 dispatches across roadmap; ~650-890 LOC architectural-axis-additions; resolves all P0+P1+P2 gaps surfaced.

**Priority justification**: P0-1 (v62 Phase 0-8) + P0-2 (source-audit) are FOUNDATIONAL and unblock Fire 3 + Fire 4 (Phase 7 benchmark-before-adoption invokes the GATE codified in Fire 3). P1-3 AGENTS.md + P1-4 token-mapping are POLISH AFTER baseline is complete.

**Mia-pre-apply gate** for Fire 2: probe whether v62 EXECUTE_V62_ELITE_PLAN concepts are ALREADY covered by the COMBINATION of cardinal-rule-7 graduated-unleash + cardinal-rule-10 research-first + cardinal-rule-11 META-process; only proceed with codification if Mia probe surfaces GENUINE-GAP (not duplicate per kiss-dry-yagni Must-Never #4). Per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` n=119+ ladder.

---

## HONEST-NON-FINDINGS

- **NOT a gap**: v62 PARALLEL_OPERATOR_ELITE list (claude-squad / agent-orchestrator / etc.) — explicitly REJECT-FOR-FIT per `Z:/claude-sota/.claude/rules/parallel-sessions.md` (Windows blockers + competing-framework META-HARNESS Cohort 1 risk per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 5)
- **NOT a gap**: v62 AGENT_FRAMEWORK_REFERENCE list (langgraph / autogen / crewai / etc.) — cite-only references per `Z:/claude-sota/.claude/rules/team-orchestration.md` sister-framework table; eee uses native CC + codex pair, not Python frameworks
- **NOT a gap**: v62 MEMORY_MCP_AUDIT_REQUIRED list (claude-mem / supermemory / etc.) — Section 4 already converged on doobidoo/mcp-memory-service + Qdrant + Graphiti per `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/MEMORY.md` audit decisions; further memory MCP installs would violate kiss-dry-yagni Must-Never #4
- **NOT a gap**: v62 CODEX_BRIDGES list (bfly123/claude_codex_bridge / xiaolai/codex-toolkit / promptadvisers/claudex) — codex-plugin-cc is canonical per cardinal-rule-3 + Section 2; alternatives are reference-only
- **NOT a gap**: v62 SECURITY_QUALITY_ELITE 30+ tools — Section 5 + Section 5 EXPANSION already lists 9 NEW security tools as PLANNED-CONDITIONAL (only install when corresponding code-class ships); blanket install would be slot-occupation per Phase 7 anti-pattern

---

DESIGN: 2P0 + 5P1 + 4P2 gaps | next_fire_top3: ["P0-1 v62 Phase 0-8 EXECUTE PLAN doctrine codification (Wave 133 Fire 2)", "P0-2 SOURCE_AUDIT_NOTES consolidated pre-install checklist (Wave 133 Fire 2)", "P1-1 Benchmark-Before-Adoption GATE as CR-15 + new rule file (Wave 133 Fire 3)"]

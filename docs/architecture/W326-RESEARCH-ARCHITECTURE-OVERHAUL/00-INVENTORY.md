# W326 Fork-1 — Research-Architecture Inventory + Gaps

[AMBIGUOUS per W329-B + W329-S2-REAUDIT: GH-MCP/HF sub-claim WITHDRAWN per W329-S2-REAUDIT; other sub-claims (hook-channel, parallel-dispatch, transport) RETAIN]

> Skeleton-first per parallel-dispatch-mandate Δ-PDM-1. Filled iteratively below.

## §1 Research MCPs (live + disabled)

Source: `.mcp.json` enumerated, plus W317-S7 + W308 + W265 install-records. **15 LIVE MCPs**; 0 in `disabledMcpjsonServers` (W295 retirements `memory.exe` + `graphiti` already excised W313). Coverage by pathway-class:

| MCP | Transport | Tools (research-relevant) | Cost-tier | Pathway-class |
|---|---|---|---|---|
| **perplexity** @0.9.0 | stdio (npx) | `perplexity_search` / `_ask` / `_research` (sonar-deep, 30s+) / `_reason` | paid ($0.005/web_search ≈ $0.50/100q) | **deep-research** |
| **tavily** @0.2.19 | stdio (npx) | `tavily_search` / `_extract` / `_crawl` / `_map` / `_research` | paid (freemium 1k/mo) | **deep-research** |
| **exa** @3.2.1 | stdio (npx) | `web_search_exa` / `web_fetch_exa` (neural search) | paid (freemium) | **deep-research** |
| **deepwiki** | http | `ask_question` / `read_wiki_structure` / `read_wiki_contents` | free (anon) | **repo-intel** |
| **repomix** @1.14.0 | stdio (npx) | `pack_codebase` / `pack_remote_repository` / `read_repomix_output` / `grep_repomix_output` / `generate_skill` / `attach_packed_output` | free | **repo-intel** |
| **hf-mcp** | http | `paper_search` / `space_search` / `hub_repo_search` / `hub_repo_details` / `hf_doc_search` / `hf_doc_fetch` / `gr1_z_image_turbo` | free (anon rate-limited) | **deep-research + repo-intel** |
| **serena** @249f6b07 | stdio (uvx git+SHA) | `find_symbol` / `find_referencing_symbols` / `find_implementations` / `find_declaration` / `replace_*` / `get_symbols_overview` | free (local) | **code-intel** |
| **gitnexus** @1.6.4-rc.112 | stdio (native) | `cypher` / `query` / `context` / `impact` / `route_map` / `tool_map` / `shape_check` / `api_impact` / `group_*` / `rename` / `list_repos` / `detect_changes` | free (PolyForm-NC) | **code-graph** |
| **basic-memory** @0.21.1 | stdio (uvx) | `search_notes` / `read_note` / `write_note` / `edit_note` / `build_context` / `recent_activity` / `search` | free (local) | **memory** (T6 canonical) |
| **cognee** 1.26.0 | http (NSSM `CogneeMCP` :8000) | `remember` / `recall` / `forget` (Kuzu/ladybug GraphRAG backend) | free (local) | **memory** (T3) |
| **langfuse** v3.170.0 | stdio (built node) | `get-prompt` / `get-prompts` (Langfuse :3000) | free (self-host) | **memory** (T5 traces) |
| **chrome-devtools** @1.0.1 | stdio (npx) | `evaluate_script` / `take_snapshot` / `lighthouse_audit` / `performance_*` / `list_network_requests` / `list_console_messages` / `navigate_page` | free | **browser** |
| **playwright** @0.0.75 | stdio (npx) | `browser_navigate` / `_snapshot` / `_evaluate` / `_network_request*` / `_take_screenshot` / `_run_code_unsafe` | free | **browser** |
| **github** (via everything-claude-code plugin) | http (api.githubcopilot.com/mcp/readonly) | `search_repositories` / `get_file_contents` / `search_code` / `list_pull_requests` / etc. (read-only) | free (gh-auth) | **repo-intel** |
| **context7** (declared, plugin-supplied via context-mode) | http | `resolve-library-id` / `get-library-docs` | free | **docs-intel** |

**Tier-degradation status**: `cognee` was W295 retirement-candidate but is LIVE per W314-r2 (T3 GraphRAG retained). `gitnexus` license is PolyForm-NC (non-commercial only — patterns-only for commercial use). **perplexity-MCP** key leaked W317-r2 SEV-1 — rotation pending (W319-SEV1-INCIDENT). Tavily + Exa keys staged W324 ship-gate (env vars in `CLAUDE.local.md` placeholder, NOT populated).

**Gap**: ZERO arXiv-direct MCP; ZERO Google Scholar / Semantic Scholar MCP; ZERO Crossref / OpenAlex MCP. Paper discovery limited to hf-mcp `paper_search` (HuggingFace arxiv-mirror).

## §2 Research Skills (local + plugin-shipped)

**Local operator-curated** (35 in `.claude/skills/`, research-relevant subset):

| Skill | Role in research flow |
|---|---|
| **sota-convergence-audit (sca-v12 W328)** | Core verdict-rubric: D1–D49 + D52–D65 + D66 dim catalog; 6-phase pipeline (Stage-0 existence-probe → discover → triangulate → anti-bias → score → 5-gate → codex). Composite-denom install=39.8, pattern=17.3. T0–T5 8-tier ladder (incl. T2-CHERRY-FRONTIER). |
| **goal-prompt-synthesis** | Authors paste-ready `/goal` predicates from sprawling operator requests |
| **mem-recall** | T6 basic-memory primary lookup for "have we seen this", FM-class catalog, named-failure-mode rows, codex T1 prescriptions |
| **ops-rhythm** | 3-/5-/8-wave dwell-threshold escalation; ITIL/SRE/Kanban-style P0 carry-forward governance; sca-v12 K-7 cross-ref applies -0.5 install penalty at 8-wave |
| **parallel-dispatch-mandate** | W269 enforcement: 2+ Agent calls in 1 message; F4 NO-repomix-in-fork; F5 empty-final-message detection; Δ-PDM-1/-2/-3 skeleton-first + budget-cap + mid-flight-resume |
| **dispatching-parallel-agents-w321-fork** | Vendor-fork of obra/superpowers@5.1.0; adds skeleton-first-write + context-budget hard-cap + mid-flight stream-error retry + position-swap audit + subagent_type pre-flight validation |
| **dual-review** | Adversarial cross-model review via Codex GPT-5.5; fail-closed BLOCK contract on codex-unavailable |
| **durable-planning-files** | Multi-session task_plan.md + findings.md + progress.md for research spanning compaction boundaries |
| **learned** | Surface named-failure-mode rows, FM-class catalog, codex T1 prescriptions from memory + ledger |
| **grill-with-docs** | Stress-test plan against project's documented domain model + inline ADR updates |
| **gitnexus** | 7-skill router (guide / cli / exploring / impact-analysis / debugging / refactoring / pr-review) |
| **langfuse** | CLI-based Langfuse query + doc retrieval |
| **doubt-driven-development** | Subjects every non-trivial decision to fresh-context adversarial review |
| **dspy-integration** | DSPy 3.2.1 prompt-program / GEPA / Pareto-frontier routing for typed LLM signatures |
| **local-cypher-codebase** | Built-in graph-walk via serena+grep when gitnexus unavailable |

**Plugin-shipped** (auto-fire via `description:`-match, per `.claude/plugins/installed_plugins.json` — 58 enabled plugins):
- **superpowers**: brainstorming · executing-plans · finishing-a-development-branch · receiving-code-review · requesting-code-review · subagent-driven-development · systematic-debugging · test-driven-development · using-git-worktrees · verification-before-completion · writing-plans · writing-skills · dispatching-parallel-agents
- **andrej-karpathy-skills**: karpathy-guidelines (4-principle minimalism)
- **agent-teams**: team-spawn (presets: research / security / review / debug / feature / fullstack / migration) · team-debug · team-feature · team-review · team-delegate · team-status · team-shutdown · multi-reviewer-patterns · parallel-debugging · parallel-feature-development · task-coordination-strategies · team-communication-protocols · team-composition-patterns
- **comprehensive-review**: full-review (multi-dim parallel review)
- **incident-response**: incident-response · smart-fix · postmortem-writing · runbook-templates · on-call-handoff
- **llm-application-dev**: ai-assistant · langchain-agent · prompt-optimize · rag-implementation · embedding-strategies · vector-index-tuning · similarity-search-patterns · hybrid-search-implementation · llm-evaluation · prompt-engineering-patterns
- **engineering-advanced-skills**: 25+ skills including codebase-onboarding · rag-architect · pr-review-expert · self-eval · ship-gate · spec-driven-workflow · agent-designer · agent-workflow-designer · api-test-suite-builder · skill-tester · skill-security-auditor · monorepo-navigator · changelog-generator · runbook-generator · interview-system-designer
- **claude-code-skills**: autoresearch-agent · self-improving-agent · llm-wiki · agenthub · karpathy-coder
- **engineering-skills**: 30+ senior-role skills including senior-architect · senior-data-scientist · senior-ml-engineer · senior-prompt-engineer · senior-frontend · senior-backend · senior-data-engineer · senior-secops · adversarial-reviewer · red-team · senior-fullstack · code-reviewer · tdd-guide · tech-stack-evaluator
- **document-skills**: skill-creator · mcp-builder · canvas-design · doc-coauthoring · webapp-testing · pptx / docx / xlsx / pdf · frontend-design · brand-guidelines · theme-factory · algorithmic-art · web-artifacts-builder
- **pr-review-toolkit**: silent-failure-hunter · type-design-analyzer · comment-analyzer · code-simplifier · review-pr
- **context-management** + **context-mode**: ctx-stats · ctx-insight · ctx-purge · ctx-upgrade · ctx-doctor · strategic-compact · context-driven-development
- **claude-mem (thedotmack)**: ECC session-recording for fork audit-trail
- **claude-md-management**: claude-md-improver · revise-claude-md
- **planning-with-files**: plan · plan-{ar,de,es,zh} · planning-with-files · status (re-litigated T2 W320)
- **plugin-eval**: certify · compare · eval · evaluation-methodology (skill quality scoring)
- **conductor**: implement · setup · status · revert · new-track · manage · context-driven-development
- **ship-mate**: scan · setup · ship (architect → implement → review → qa → playwright)
- **code-modernization**: modernize-assess · modernize-brief · modernize-extract-rules · modernize-harden · modernize-map · modernize-reimagine · modernize-transform · architecture-critic · business-rules-extractor · legacy-analyst · security-auditor · test-engineer
- **plugin-dev**: agent-creator · plugin-validator · skill-reviewer · skill-development · agent-development · hook-development · command-development · mcp-integration

**Gap**: NO dedicated "research-orchestrator" skill that ties multi-MCP cascade → dim-scored synthesis → durable-memory-write into one auto-fire entry point. sca-v12 is verdict-only; goal-prompt-synthesis is predicate-only; mem-recall is read-only; durable-planning-files is generic. **Composite-research-flow skill missing**.

## §3 Research Agents (subagent_type allowlist)

From the system-reminder agent-list, research-class subagent types available:

| subagent_type | Role |
|---|---|
| **Explore** | Fast read-only search agent for locating code (file pattern / grep / symbols) — quick lookups, NOT for cross-file consistency checks |
| **Plan** | Software architect for designing implementation plans (read-only) |
| **general-purpose** | Open-ended multi-step research + code search + complex questions (W319 mandate: `general-purpose` is universal-valid agent type) |
| **agent-orchestration:context-manager** + **context-management:context-manager** | Dynamic context engineering, vector DBs, knowledge graphs, intelligent memory across multi-agent workflows |
| **agent-teams:team-lead** + **team-implementer** + **team-reviewer** + **team-debugger** | Mailbox-coordinated multi-stream teams (research / security / review / debug / feature / fullstack / migration presets) |
| **llm-application-dev:ai-engineer** + **prompt-engineer** + **vector-database-engineer** | LLM-app build, prompt CoT/few-shot/constitutional, vector-search (Pinecone/Weaviate/Qdrant/Milvus/pgvector) |
| **gpt5-archaeologist** | Pre-edit codebase archaeology via GPT-5.5 — hotspots / bug-magnets / bus-factor risks via git log/blame |
| **codex:codex-rescue** | Hands substantial task to Codex GPT-5.5 (cross-model second-opinion, root-cause investigation) |
| **code-modernization:legacy-analyst** + **business-rules-extractor** | Discovery / dependency mapping / dead-code / "what does this system do" |
| **feature-dev:code-explorer** + **code-architect** + **code-reviewer** | Deep codebase analysis, architectural blueprints, confidence-filtered review |
| **comprehensive-review:architect-review** + **code-reviewer** + **security-auditor** | Multi-dim review across architecture / quality / security |
| **wshobson-devops-troubleshooter** + **wshobson-security-auditor** | DevOps incident root-cause + DevSecOps audits |
| **incident-response:incident-responder** + **devops-troubleshooter** + **error-detective** + **debugger** | SRE-class problem resolution + log/trace/observability triage |
| **evaluator** | Skeptical second-opinion reviewer (PASS / NEEDS_WORK on diffs + builder evidence) |
| **codex:codex-rescue** (Bash-only) | Hand off substantial coding task to Codex via runtime |
| **debugging-toolkit:debugger** + **dx-optimizer** | Bug + DX optimization |
| **karpathy-coder:karpathy-reviewer** | 4-principle adherence check |
| **statusline-setup** | Status-line config |
| **plugin-eval:eval-orchestrator** + **eval-judge** | LLM judge for plugin/skill quality scoring (anchored rubrics) |

**Research-relevant teams** (`agent-teams:team-spawn` presets): research · debug · review · security · feature · fullstack · migration. The `research` preset is the dedicated multi-stream research orchestration entry point — UNDERUSED in practice (W314-r2 measured 6 parallel turns out of 1579 → 0.0038 ratio).

**Gap**: NO `research-orchestrator` agent that combines sca-v12 verdict-rubric with multi-MCP cascade. Current research dispatch is ad-hoc parallel forks via Agent tool; the `agent-teams:team-spawn research` preset exists but does not auto-fire sca-v12 phases.

## §4 Research Workflows (current state)

### sca-v12 multi-MCP cascade (W328 LIVE) — primary verdict-flow

```
Stage-0 existence-probe (≥2 of 6 families pass)  → auto-reject if <2 hits
   ↓
Phase 1: Discover (cost-bounded; per-tier MCP-family floor T1=11, T2=9, T3=7, T4=3)
   ├─ Graceful-degradation ladder: exa→WebSearch→github-API; deepwiki→repomix-grep→WebFetch; perplexity→WebSearch+exa→WebFetch; etc.
   └─ Anti-bias mandate: top-10 ranking MUST surface ≥1 candidate per fired MCP family
   ↓
Phase 2: Cross-source triangulation (sources_typed[] with mcp_family_attribution)
   ├─ ≥3 org-distinct sources for any score ≥4 on D2/D5/D9
   └─ disagreement[] → codex GPT-5.5 mediation if ≥2 contradictions
   ↓
Phase 3: Anti-bias gate (Bayesian author-prior; stars=D12 sub-signal only)
   └─ Δ52 community-health corroboration (chaoss/grimoirelab + OWASP-SAMM + ISO/IEC 25010)
   ↓
Phase 4: Scoring (D-EMP HARD GATE runs FIRST; weighted-sum after)
   ├─ Δ49 EC-PROMETHEE committee-aggregation on disagreement (Entropy+CRITIC weight envelope, N=20 Monte-Carlo, Borda)
   └─ Composite_denom_install=39.8 / pattern=17.3 (sca-v12)
   ↓
Phase 5: 5-gate validation
   ├─ G1 Provenance re-fetch (SHA match)
   ├─ G2 Paraphrase-invariance (|Δscore|≤0.3)
   ├─ G3 Adversarial-blinded review (engineering-skills:adversarial-reviewer, no prior verdicts)
   ├─ G4 Contamination check (repomix grep distinctive strings)
   └─ G5 Replayable + ≥3-org cite (Δ51 markitdown probe-record at verdicts/W<N>-<slug>-probe-record.json)
   ↓
Phase 6: Codex GPT-5.5 cross-model review (Δ50 Unit→Layer→Block DAG; position-swap MVP)
   ├─ APPROVE / REVISE / NEEDS-REVISION / BLOCK
   └─ Plugin Stop-hook auto-fires session-end (openai-codex/1.0.4/hooks/hooks.json:24-37, timeout 900s)
   ↓
Ledger row → T6 basic-memory + VERDICT-LEDGER.md append + verdicts/W<N>-<slug>-evallog.json
```

**Verdict ladder (8-tier, Δ47)**: T0 IMMEDIATE-UPGRADE / T1 INSTALL / T1-PROVISIONAL / T2 VENDOR-FORK / T2-CHERRY-FRONTIER / T2-CHERRY / T3 PATTERN-STUDY / T4 CITE-ONLY / T5 REJECT.

### W269 parallel-dispatch fan-out (LIVE) — agent-orchestration layer

Mandate: 2+ Agent (or Task) tool_use blocks in a SINGLE assistant message for multi-stream work. Target parallel_ratio ≥0.7. **Empirical baseline W325-A re-measurement: 0.0038** (denom 1579, parallel turns 6) — 154× inflated previously by silent-fallback artifact. This is a **chronic gap**.

### Codex GPT-5.5 cross-model review (LIVE) — verdict-ratification layer

Plugin-native Stop-hook auto-fires session-end. Path P = `codex exec` foreground+tee. Commands: `/codex:review` · `/codex:adversarial-review` · `/codex:rescue` · `/codex:status` · `/codex:result` · `/codex:cancel`. Round-1 default; round-N operator-extended per "no budget" mandate.

### T6 basic-memory canonical-primary verdict-ledger (LIVE)

`mcp__basic-memory__search_notes` is canonical-primary per W295. Each sca-v12 verdict writes a structured note + appends a row to `VERDICT-LEDGER.md`. Schema fields: slug · verdict · install_score · pattern_score · D-EMP · D35 D-CCRT · D38-D49 · D52-D66 · rule_version · cascade_cost_actual · cascade_degraded · mcp_family_count · mcp_family_attribution · sources_typed · disagreement · phase_5_gates · position_swap_consistent · eval_log_path · probe_record_path · codex_round_1_verdict · codex_round_2_verdict · skip_class_per_dim · external_auditor_present · methodology_skip_rationale · audit_incomplete · dwell_count · dwell_class · wave · rollback_plan.

### Cumulative T6 verdict count (as of W328): ~110+ rows (W316-W317 89→96 → W320 96 → W325 audit → W328 absorb wave).

**Gap**: NO closed-loop research-quality eval (rubric-of-the-rubric). sca-v12 D44 `codex_round_efficiency` is the closest signal but only measures intra-rubric. No metric for "did the research output actually predict downstream install success" / "was the candidate later regretted".

## §5 Prior-wave findings (research-architecture history mined from W3* wave directory archaeology)

basic-memory `search_notes` not invoked this fork (ToolSearch + tool-budget cap); prior findings reconstructed from wave-dir names + CLAUDE-MD-STATUS-CURRENT-W324.md archive. **Research-architecture work spans W301 → W328 (27 waves)**:

| Wave | Theme | Bearing on W326 |
|---|---|---|
| **W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6** | First codified "research-arch" identity; multi-source convergence framework v6 | Set the pattern: research-arch is a named subsystem deserving its own waves |
| **W303-COVERAGE-GAP-AND-OPENRAG** | Identified coverage gaps + introduced OpenRAG patterns | Gap-driven research roadmap (this wave continues that pattern) |
| **W304-DEEP-AUDIT-ALL-SOTA + W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED** | Full SOTA audit + GPT-5.5 cross-model integration | Established codex as Phase-6 mediator |
| **W309-RESEARCH-ARCH-AUDIT-AND-SOTA-CONVERGENCE** | Audited research-arch itself + SOTA convergence | Direct prior to this wave's mandate |
| **W314-DEEP-SOTA-WAVE + W314-SOTA-DISCOVERY-AND-REAUDIT** | Deep SOTA repo discovery + re-audit | Tier-1 MCP cascade hardening; sca-v7 ship |
| **W315-RESEARCH-META-DISCOVERY + W315-SOTA-CONVERGENCE-SWEEP + W315-TIER-ROUTING-PRECISION** | Meta-research (research about research) + tier-routing precision improvements | Surfaced sca-v7.1 Δ33 Stage-0 existence-probe (closed 4-wave GitHub-MCP silent-fallback) |
| **W316-NSSM-SWITCH** | NSSM-replacement audit FAILED empirically → meta-finding: sca-v8 D-EMP HARD GATE proposal | Birth of D-EMP empirical_viability hard gate (W319 RATIFY) |
| **W316-SCA-V7-1-SHIP** | sca-v7.1 SHIPPED with Δ30-Δ38 (Triangulated MCDA + ELECTRE I + cohort_overlap + cascade-completion) | Verdict-rubric core |
| **W316-EVAL-AND-INSTALLS** | HarnessAudit-Bench + SWE-Bench Pro + R8 EvalLog + DSPy + parallel-dispatch-mandate skill | Eval-loop foundation |
| **W317-OPS-CLOSURE-WAVE (Stream 7)** | perplexity-MCP @0.9.0 INSTALLED + smoke-PASS | 8th external MCP wired; deep-research class enriched |
| **W319-RESEARCH-ARCH** | sca-v8.1-partial SHIP (D-EMP HARD GATE + D35 D-CCRT cc_runtime_pathway_support) | Empirical-viability gate finalized |
| **W319-ORCHESTRATION-AUDIT** | Silent-fallback root-cause map (H1-H3); wshobson upstream pivot 08ded5e→ece811f (deorchestrationalized) | Subagent_type typo trap + empty-final-message detection |
| **W320-RESEARCH-ARCHITECTURE-ENHANCEMENT** | Parallel-session foundation work on this same theme | DIRECT predecessor — must read for context |
| **W322-DEEPER-RESEARCH-ARCH** | Continued deep dive | DIRECT predecessor — must read for context |
| **W325-RUNTIME-V8-SOTA-SWEEP + W325-AUDIT-WAVE** | Runtime v8 SOTA sweep + audit; parallel_ratio re-measurement exposed 0.0038 actual (154× inflated) | Honesty: research-arch parallel_ratio is FAR below target |
| **W326-SCA-V9-MATH-FIX + W326-AUDIT-WAVE + W326-GPT55-DEEP-AUDIT** | sca-v9 math correction (composite_denom 34.7 corrected from 36.8) + GPT-5.5 deep audit | sca-v11→v12 forward path |
| **W327-COOKBOOK-WAVE + W327-CODEX-K3-K7-CODIFY + W327-PROVENANCE-LINT** | Anthropic claude-cookbooks ingest + K-3 skip-N/A taxonomy + K-7 ops-rhythm cross-ref | sca-v11 W327 codification |
| **W328-SKILL-ABSORB-WAVE + W328-K8-PROVENANCE-VERIFY + W328-COMPOSITE-RECALC-VALIDATE** | W321→W328 absorb wave: Δ47 Pareto-frontier + Δ49 EC-PROMETHEE + Δ50 verdict-DAG + Δ51 markitdown + Δ52 community-health | sca-v12 LIVE (current rule_version) |

**Key carry-forwards as of W328**:
- R5 layered-defense 5 controls (deny-default · audit logging · secret redaction · egress policy · drift detection) per sca-v12 §6
- ops-rhythm 3/5/8-wave dwell escalation per K-7
- Skip-N/A taxonomy T-skip / M-skip / E-skip per K-3
- Composite_denom_install = 39.8; composite_denom_pattern = 17.3
- 8-tier verdict ladder including T2-CHERRY-FRONTIER
- D52-D65 deep-research-dim track (Stream-H W326)
- D66 markitdown probe-record (Δ51 W328 absorb)
- Codex round-N adaptive (1..3 cap)

**Gap surfaced**: research-architecture work has been continuous since W301 (27+ waves), but there is NO single "research-architecture-canonical" doc indexing it. CLAUDE.md L46 archive-pointer references CLAUDE-MD-STATUS but doesn't enumerate the research-arch lineage. This wave should produce ROADMAP.md as that index.

## §6 Identified gaps (concrete, actionable)

| # | Gap | Impact | Suggested resolution |
|---|---|---|---|
| G1 | **NO arXiv / Google Scholar / Semantic Scholar / OpenAlex / Crossref MCP**. Paper discovery only via hf-mcp `paper_search` (HF arxiv-mirror — partial coverage) | **P0** | Forks 2+4 should surface SOTA paper-search MCPs (e.g. semanticscholar-mcp, arxiv-mcp, crossref-mcp candidates); sca-v12 audit each |
| G2 | **NO closed-loop research-quality eval**. D44 codex_round_efficiency measures intra-rubric only; no "regret signal" for verdicts that later proved wrong | **P0** | Design D-REGRET dim (post-hoc 1-month / 3-month verdict re-eval); wire to ops-rhythm dwell-row + langfuse trace |
| G3 | **parallel_ratio 0.0038** measured (W325-A SEV-1) vs ≥0.7 target — 184× gap. Multi-stream dispatch happens but is mostly serial-fallback | **P0** | parallel-dispatch-mandate skill is LIVE but telemetry doesn't auto-fire on Agent calls. Add PostToolUse hook to count Agent-in-1-msg vs Agent-across-msgs |
| G4 | **NO research-orchestrator agent or composite skill** that ties multi-MCP cascade → dim-scored synthesis → durable-memory-write into ONE entry point. Currently 4 separate skills (sca-v12 + parallel-dispatch + mem-recall + durable-planning) | **P0** | Create `research-orchestrator` skill that auto-fires on "research X" / "find SOTA Y" / "audit Z for adopt"; sequences sca-v12 phases automatically |
| G5 | **GitHub repo quality assessment is shallow**. Stars-as-D12-sub-signal exists but NO integration with OpenSSF Scorecard / criticality_score / deps.dev / ossinsight beyond manual lookup | **P1** | Wire `scorecard` (already partially installed W316-S4) + `criticality_score` (partial) into sca-v12 Phase-3 as automated D2/D52 corroboration |
| G6 | **NO research-quality regression test**. sca-v12 rubric changes (e.g. composite_denom recalc W326-B-1) lack a frozen-eval-set that proves the rubric still ranks known T1 candidates as T1 | **P1** | Create `verdicts/REGRESSION-SET-v12.yaml` with 20 known-anchor verdicts; rerun on every sca-v(N) bump; pyright-style invariant test |
| G7 | **perplexity API key leaked W317-r2 SEV-1**; rotation pending. Tavily + Exa keys staged but NOT populated. Deep-research MCPs blocked or rotation-pending | **P1** | Rotate perplexity key per W319-SEV1-INCIDENT 5-step; provision tavily + exa keys for full deep-research-trio |
| G8 | **NO multi-dim ranking dashboard**. Verdict ledger rows have D1-D66 but no UI/CLI to compare 5 candidates in area X side-by-side. Comparison requires manual basic-memory queries | **P1** | Build `tools/sca-compare.py` that takes 2+ slugs + area → side-by-side dim table + tradeoff column + Borda preferred |
| G9 | **NO community-velocity time-series tracking**. D2 governance_health is point-in-time; chaoss/grimoirelab integration absent | **P2** | Phase-3 corroboration cron: pull chaoss metrics weekly into `verdicts/community-health/<slug>.jsonl` time-series |
| G10 | **Cite-drift is recurrent** (CCBP 48f2ceb→48798ca→9624c4ac; ECC 8148340a→<phantom>; wshobson 08ded5e→ece811f). W325-P1 phantom-SHA purge applied 4 redactions | **P2** | Δ51 markitdown probe-record auto-rehashes cites; extend to auto-fire on `git pull` of cited repos |
| G11 | **NO meta-research SOTA-tracking** — the field of "agentic research" (paper-qa, GPT-Researcher, deepresearcher, langgraph-research, etc.) evolves monthly; sca-v12 doesn't auto-discover new candidates | **P2** | Quarterly auto-dispatch of Fork-2-style discovery; surface new candidates as W-wave AIs |
| G12 | **Anti-bias inverse-test underused**. The "obscure but vital" symmetry of Δ52 corroboration is documented but not consistently applied. Bias toward GitHub-popularity bleeds into D5 sources_typed when WebSearch + exa over-index github.com results | **P2** | Mandate ≥1 non-github source for any score ≥4 on D5 (currently soft; tighten to hard cap) |

## §7 Top-5 gaps by impact-class

1. **G1 (P0)** — NO arXiv / Semantic Scholar / OpenAlex / Crossref paper-search MCP. Paper discovery limited to hf-mcp partial mirror. **Fix**: discover + install SOTA paper-MCPs per Fork-2 output.
2. **G2 (P0)** — NO closed-loop research-quality eval. No "regret signal" for verdicts later proved wrong. **Fix**: design D-REGRET dim + wire post-hoc re-eval to langfuse traces.
3. **G3 (P0)** — parallel_ratio 0.0038 vs ≥0.7 target (184× gap). Telemetry doesn't auto-fire on Agent dispatch. **Fix**: PostToolUse hook counting Agent-in-1-msg vs Agent-across-msgs.
4. **G4 (P0)** — NO research-orchestrator skill tying sca-v12 + parallel-dispatch + mem-recall + durable-planning into one auto-fire entry point. **Fix**: create `research-orchestrator` composite skill.
5. **G7 (P1, escalated)** — perplexity API key leaked W317-r2 SEV-1; tavily + exa keys staged but unpopulated. **Fix**: rotate per W319-SEV1-INCIDENT 5-step + provision tavily + exa keys for full deep-research-trio.

**Composition**: P0 gaps = 4 (G1, G2, G3, G4) + 1 P1 escalated (G7) = top-5. P1 remainder (G5, G6, G8). P2 (G9, G10, G11, G12).

**This wave's 8 parallel forks should produce artifacts that directly close G1+G2+G3+G4+G7+G8+G11 (7 of 12 gaps); G5+G9+G10+G12 carry to W329+.**

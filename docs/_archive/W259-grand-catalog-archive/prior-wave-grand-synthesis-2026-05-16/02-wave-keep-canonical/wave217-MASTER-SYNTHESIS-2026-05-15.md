---
title: Wave 217 MASTER SYNTHESIS — Comprehensive SOTA repo discovery + multi-dim scoring for Z:\claude-sota-pure runtime
status: INFLIGHT
date: 2026-05-15
agent: orchestrator
wave: 217
fire: 2
---

# Wave 217 MASTER SYNTHESIS — Pure SOTA runtime catalog & scoring

## Context

User directive 2026-05-15 17:45+ EDT (continuation of W210→W216 multi-wave arc):

> keep with more research waves, with invoke of advanced sota skills, with previous local files, deep dive agent orchestration plugins etc, synthesis local artifacts so later we can deep dive into different research waves without bias for your knowledge, the source of truth should be sota repos, and synthesis the final repos catalogs for the pre runtime that include extremely comprehensively, from basic to memory mcp, open rag and much more, score all the sota repos ... directly install them and e2e with advanced agent team, make sure every layers unleashed performance with sota harness ... organize all the research artifact in this folder from all layers and research beyond, with gpt5.5 convergence research consensus

Concrete examples enumerated by user: `volcengine/OpenViking` (claude-code-memory-plugin), Cognee, Langfuse + "much more you need to research discover all the high star sota and deep dive into their source".

Destination runtime: `Z:\claude-sota-pure` (already partially bootstrapped — CLAUDE.md, AGENTS.md, .mcp.json, .local/cwc/, docs/install-provenance.md @79K, docs/sota-installed-manifest.md @46K, 6 FINAL catalog iterations v1→v6).

## Standing-directive invariants applied (advanced-agent-team-standing-directive.md)

- **CADP cap**: 3 concurrent agents this fire (within max-3 ceiling; no `python Z:/claude/ccc/tools/status.py` cache-verify probe needed)
- **BRIDGE-MODE majority**: 2/3 agents are GPT-5.5 BRIDGE-MODE (codex-rescue + gpt5-archaeologist) per cross-model-consensus invariant
- **File:line + HEAD SHA cites**: every claim in agent briefs anchored at `Z:/repos/deps/<repo>/<file>:<line> @ HEAD <SHA>` OR official-docs URL
- **Probe DAG 1-7**: mandatory for adoption-class verdicts (ahfv-probe-dag.md)
- **ARTIFACT-INLINE per FM-19**: all 3 agents are read-only/Bash-only → orchestrator persists post-completion
- **OUTPUT_BUDGET + TERMINATION**: every brief carries explicit budget + termination predicates
- **Per-call codex time-budget for BRIDGE-MODE**: default 90s, normal cap 120s, 180s only with explicit reason (FM-17.d defense)
- **Mia pre-apply on prescriptions**: orchestrator-side verification before any Edit

## Prior coverage baseline (from Z:\claude-sota-pure\docs)

Catalogs ALREADY present (v1-v6 iterations + 8 domain deep-dives):
- `sota-research-CATALOG-FINAL-v6-extended-2026-05-15.md` (33.5K — latest FINAL)
- `sota-research-CATALOG-FINAL-v5-comprehensive-2026-05-15.md` (70.3K)
- `sota-research-CATALOG-FINAL-v4-comprehensive-2026-05-15.md` (59.4K)
- `sota-research-CATALOG-FINAL-v3-scoring-2026-05-15.md` (36.6K)
- Domain deep-dives: memory-rag-vector / rag-memory-deep / orch-workflow-mcp-deep / token-opt-context-eng / agents-eval-obs / code-cli-security / deploy-telemetry-aiops / foundations-llm-runtime / spec-tdd-kb-awesome

Prior-session Wave 217 fire 1 partial: `tmp/wave217-openviking-precision-deep-dive-2026-05-15.md` (10.1K — single-repo deep dive, NOT comprehensive)

**User directive scope EXCEEDS prior catalogs**: explicit ask for "research beyond previous artifacts" + "absolute SOTA convergence consensus" + scoring on ALL dimensions including `wired difficulty`, `native CC CLI install path`, `stars`, `Axis 1+2+3 per convergence-gate`, `Probe DAG outcome per ahfv-probe-dag`, `multi-source convergence`.

## Wave 217 Fire 2 — 3 parallel agents

| Agent | Type | Scope | Output | Budget |
|---|---|---|---|---|
| **α** | sota-researcher (Sonnet stand-in) | Prior-catalog GAP analysis: read v6-extended + 8 domain deep-dives + identify UNDER-COVERED axes / missing categories / outdated star/SHA pins / Probe DAG mis-scores | `tmp/wave217-fire2-agentα-prior-coverage-gap-analysis-2026-05-15.md` | 600 LOC |
| **β** | codex-rescue BRIDGE-MODE → REAL GPT-5.5 | FRESH primary-source scoring on Memory + RAG + KG + Vector + Open-RAG layer. Repos in scope: OpenViking (volcengine), Cognee, Letta, Graphiti, Mem0, MemGPT, Zep, OpenMemory, mcp-memory-service, graphiti-mcp, qdrant-mcp, chroma-mcp, weaviate-mcp, LanceDB, Milvus, FalkorDB, basic-memory, claudia, deepwiki, R2R, ColBERT, ragas, llama-index, langchain-memory, anthropic-memory-blog patterns, OpenAI memory APIs. | `tmp/wave217-fire2-agentβ-memory-rag-kg-fresh-scored-2026-05-15.md` | 1000 LOC |
| **γ** | gpt5-archaeologist BRIDGE-MODE → REAL GPT-5.5 | FRESH primary-source scoring on Agent-orchestration + Plugin-marketplace + Token-optimization + Observability layer. Repos in scope: wshobson/agents + wshobson/commands, superpowers (obra), addy-agent-skills, claude-skills (alirezarezvani), claude-plugins-marketplace (official Anthropic), claude-code-best-practice-shan, agno, deepagents, goose, gstack, claude-flow, awesome-agentic-patterns, voltagent/awesome-openclaw-skills, awesome-claude-code, awesome-claude-plugins (quemsah), Langfuse, Phoenix (Arize), Helicone, LangSmith, Opik, promptfoo, deepeval, ECC (everything-claude-code), context7, repomix, ACP-adapters. | `tmp/wave217-fire2-agentγ-orchestration-plugin-token-obs-fresh-scored-2026-05-15.md` | 1000 LOC |

## Scoring schema (every catalog row)

Each repo scored on 9 dimensions:

| Dim | Definition | Range |
|---|---|---|
| **D1 Stars** | GitHub stars (raw) | int |
| **D2 Axis-1** | Distinct T1 orgs implementing pattern (convergence-gate Axis 1) | count / PASS-FIRM / PASS-BORDERLINE / FAIL |
| **D3 Axis-2** | Named-T2 practitioner endorsements with dated artifact | count / PASS / PARTIAL / FAIL |
| **D4 Axis-3** | Stability — age + cpd band (FAST-CHURN / ACTIVE / STABLE-BURN-IN / SUSTAINED-MAINTENANCE / LAUNCH-SPIKE) | label |
| **D5 License** | Permissive (MIT / Apache-2.0 / BSD) vs blocker (AGPL / proprietary / unclear) | label |
| **D6 Probe 4** | Plugin-namespace collision check — already in loaded `<plugin>:<skill>` namespace? | YES (REJECT-DUPLICATE) / NO (PASS) |
| **D7 Probe 5** | Mode-harness-shape — autonomous /loop compat, HARD-GATE absence, file-count sprawl | PASS / PARTIAL / FAIL |
| **D8 Native CC path** | Provides `.claude/agents/`, `.claude/commands/`, `.claude/skills/`, `.claude/plugins/marketplaces/`, or MCP server config out-of-box? | YES / PARTIAL / NO |
| **D9 Wiring difficulty** | Install/wire effort once chosen (1=trivial native install, 5=heavy adaptation) | 1-5 |

Plus computed **Composite verdict** ∈ {ADOPT-NOW / STUDY-PILOT.b / REJECT-FOR-FIT / DEMOTED-COHORT}.

## Synthesis plan (this fire)

1. Launch 3 agents in parallel (this turn)
2. Agents return artifacts via ARTIFACT-INLINE (orchestrator persists post-completion)
3. Mia pre-apply: orchestrator verifies each agent's prescription set against runtime state BEFORE any Edit/install
4. Cross-agent convergence: where ≥2 agents independently score the same repo, take MAX of their convergence scores; where they conflict, route to Wave 218 Fire 1 BRIDGE-MODE T1 review
5. Combined catalog: `tmp/wave217-fire2-FINAL-scored-catalog-2026-05-15.md` (orchestrator synthesizes)
6. Forward to Wave 218: install/wiring playbook for top-N adopt-now candidates per category

## Wave 217 fire 2 status

- [x] Master tracker created
- [x] Agent α dispatched (sota-researcher gap-analysis) — DONE @ ~11min wall, ~22 tools used
- [x] Agent β dispatched (codex-rescue BRIDGE-MODE memory/RAG/KG) — **FAILED-EMPTY @ ~23min wall, 4 tools used; FM-17.b autocompact-thrash class** (same diagnostic as γ)
- [x] Agent γ dispatched (codex-rescue BRIDGE-MODE orchestration/plugin/token-opt) — **FAILED-EMPTY @ ~21min wall, 4 tools used; FM-17.b autocompact-thrash class** (`Autocompact is thrashing: the context refilled to the limit within 3 turns of the previous compact, 3 times in a row`)
- [x] Agent α artifact persisted at `tmp/wave217-fire2-agentα-prior-coverage-gap-analysis-2026-05-15.md` per FM-19 ARTIFACT-INLINE
- [x] **n=2 same-class FM-17.b confirmed → Outcome B REVERT broad-scope BRIDGE-MODE-subagent approach + switch to Path P orchestrator-direct per Pattern D recovery family**
- [x] Wave 217 Fire 3 Path P codex T1 #1 — TOP-5 fresh scoring **DONE** (NEEDS-REVISION conf=0.86; 2 ADOPT-NOW wshobson+LLMLingua, 1 STUDY-PILOT.b langgraph, 1 DEMOTED crewAI, 1 REJECT Phoenix license-trap)
- [x] Wave 217 Fire 3 Path P codex T1 #2 — Memory+KG **DONE** (APPROVE conf=0.87; 3 ADOPT-NOW mcp-memory+graphiti+cognee, 1 DEMOTED mem0, 2 REJECT OpenViking-AGPL+letta-server-mode)
- [x] Wave 217 Fire 3 Path P codex T1 #3 — Plugin-Marketplace **DONE** (APPROVE conf=0.86; 3 ADOPT-NOW official+addy+ECC, 1 STUDY-PILOT.b claude-skills, 1 DEMOTED superpowers-pinned, 1 REJECT VoltAgent-supersede)
- [x] Unified catalog skeleton created: `tmp/wave217-fire3-UNIFIED-CATALOG-2026-05-15.md`
- [x] **Critical license correction caught**: Cognee HEAD is Apache-2.0 (prior claude-sota audit recorded AGPL for OpenViking variant; Cognee is now ADOPT-NOW eligible)
- [x] Wave 217 Fire 3 Path P codex T1 #4 — Workflow-engines **DONE** (NEEDS-REVISION conf=0.86; 1 ADOPT temporal, 1 DEMOTED prefect, 3 REJECT-LICENSE-TRAP restate-BSL+inngest-SSPL+hatchet-namespace)
- [x] Wave 217 Fire 3 Path P codex T1 #5 — RAG-e2e **DONE** (APPROVE conf=0.84; 3 ADOPT llmware+onyx+ragflow, 1 STUDY KAG, 1 REJECT WrenAI-AGPL)
- [x] Wave 217 Fire 3 Path P codex T1 #6 — Observability-alts **DONE** (APPROVE conf=0.88; 1 ADOPT langfuse-incumbent, 1 STUDY openlit, 1 DEMOTED openllmetry, 2 REJECT helicone+opik)
- [x] Wave 217 Fire 3 Path P codex T1 #7 — Token-opt+ACP **DONE** (APPROVE conf=0.86; 3 ADOPT acp-bridge+acp-sdk+contextgem, 1 DEMOTED RouteLLM, 1 REJECT GPTCache)
- [x] **🎯 7/7 codex T1 cohorts complete — 37 strategic NEW repos fresh-scored**
- [x] FINAL §6 Top-N consolidated: **16 ADOPT-NOW + 5 STUDY-PILOT.b + 6 DEMOTED + 11 REJECT-FOR-FIT (8 of which are LICENSE traps)**
- [x] Wave 218 install playbook drafted at `tmp/wave218-install-playbook-2026-05-15.md` — 5 install fires (F1-F5) covering 16 ADOPT-NOW rows + 5 STUDY-PILOT.b queue + 8 staleness queue rows blocking F1-F5
- [x] Wave 219 E2E plan drafted in playbook §7 — 3-agent BRIDGE-MODE team demonstration covering memory+RAG+orch+token-opt+obs layers
- [ ] **NEXT (operator decision)**: execute Wave 218 Fire 1 install batch OR resolve §8 staleness queue first OR continue research with additional cohorts (autonomous-agent class / browser-use / DSPy / spec-tdd)
- [ ] Consolidate v5 baseline (197 repos) + Agent α TOP-15 fresh + 8 deep-dives → unified ~250-repo catalog
- [ ] Mia pre-apply on adopt prescriptions
- [ ] Cross-agent convergence synthesis
- [ ] FINAL scored unified catalog
- [ ] Wave 218: install playbook for Z:\claude-sota-pure

## FM-17.b Failure analysis (Agent γ)

**Class**: FM-17.b autocompact-thrash subclass (`named-failure-modes.md` FM-17 family). Agent's own subagent context window thrashed by 3 consecutive autocompact cycles within 3 turns each → 0 productive ARTIFACT-INLINE output, only diagnostic stub.

**Root cause hypothesis (UNKNOWN, INFERRED)**: γ's scope listed ~80+ repos across 5 cohorts (plugin-marketplaces / orch-frameworks / token-opt / obs / built-in-verification). Likely triggers:
1. Read of ≥1 large prior-session codex OUT file (W214/W216 verdicts at 1-5MB each)
2. Read of full v5/v6/8-deep-dive catalogs in single Read call (some files 70-80KB)
3. Concurrent multi-repo Z:/repos/deps/ reads at full-file scope

**Recovery options** (per `codex-t1-fix-forward-pattern.md §Pattern D` n=13 recovery-family):
- **Path P (recommended)**: orchestrator-direct `codex exec --skip-git-repo-check --color never -p deep-review-exec` foreground+tee per `cross-model-consensus.md §"On codex unavailable"`. Split γ scope into 4 sub-claims at ≤50 LOC focused prompts each (1 cohort per call). Bypasses subagent context-window entirely.
- **Path A (fallback)**: re-dispatch γ subagent with explicit chunk-reading discipline + cohort-1 only (plugin-marketplaces, ~10-15 repos) + reduced read scope to LICENSE + README first-line only.

**Decision**: wait for β completion first. If β succeeds, allocate freed slot to Path P for γ scope split across 4 codex calls. If β also fails, fully switch to Path P orchestrator-direct for both.

## Agent α (sota-researcher) returns — key findings

**Verdict**: `DONE: 4-axis gap analysis ~530 LOC; v6-extended is W222+W223 narrow-delta NOT comprehensive merge; ~40 NEW repos for W218 fresh scoring; 15 category-gaps; 8 scoring-method drifts; 12 staleness candidates`

**Load-bearing structural insight**: v6-extended (33.5KB latest "FINAL") is NOT comprehensive — it is the W222+W223 narrow delta on top of **v5-comprehensive (70.3KB, 197 repos × 26 layers × 9-dim)** which v6 itself declares "AUTHORITATIVE-DEFINITIVE baseline" at `v6:19`. The 8 domain deep-dives contain **~150+ scored repos that NEVER carried into v6's master table**. Wave 218 must consolidate v5 + v6 + 8 deep-dives → ONE unified SOT (~320 unique repos), not another delta.

**Category gaps (15 total / 6 P1)**:
1. Workflow engines (P1) — 0/10 (temporalio/prefect/dagster/restate/inngest/hatchet/trigger/burr)
2. Multi-agent orchestration frameworks (P1) — 0/12 (crewai/langgraph/smolagents/pydantic-ai/agno/mastra)
3. ACP ecosystem (P1) — 0/5 (5-org Axis-1+2+3 PASS per sibling team-orch-frameworks.md)
4. Spec-driven + TDD-for-AI (P1) — 0/7 (OpenSpec/baml/nizos-tdd-guard/probity/Aider/gsd-build)
5. Token compression / context engineering (P1) — 2/12 (only context-mode + repomix; missing LLMLingua/contextgem/GPTCache/RouteLLM/FrugalGPT)
6. Open RAG end-to-end (P1) — 0/7 (llmware/anything-llm/onyx/KAG/nano-graphrag/WrenAI/ragflow)
7. Eval / prompt-eng / structured generation (P2) — 0/7
8. LLM observability beyond Langfuse (P2) — 0/8
9. Browser automation / computer-use (P2) — 1/5
10-15: see §2 of Agent α artifact

**Scoring-method drift (8 instances)**: ~30% of v6 NEW rows are single-Composite scores without D6 (Probe 4) / D7 (Probe 5) / D8 (CC-native) / D9 (Wiring) breakdown.

**Staleness candidates (12)**:
- **P0**: `anthropics/claude-agent-sdk-typescript` Commercial-ToS UNVERIFIED
- **P1 fresh-pin**: `letta-ai/letta` / `chonkie-ai/chonkie` / `modelcontextprotocol/servers` (no HEAD SHA)
- **P1 migration**: `harbor-framework/terminal-bench` 113d stale → migrate to `laude-institute/harbor` v2
- **P1 license-dispute**: `mksglu/context-mode` ELv2 cross-check disagreement

**TOP-15 for Wave 218 fresh BRIDGE-MODE scoring**: langgraph / crewAI / microsoft/agent-framework / smolagents / acp python-sdk / temporal / restate / llmware / onyx / OpenSpec / baml / LLMLingua / phoenix / wshobson/agents+commands / probity.

**Recommended forward action** (post-β + γ): consolidate to a unified ~320-repo Wave 218 scored catalog, NOT another narrow delta; re-pin all stale HEAD SHAs + star counts; resolve license-verify queue; apply 9-dim uniformly.

---
title: Wave 212B Agent N-redo — Agent Orchestration Framework SOTA Catalog (Sonnet stand-in after BRIDGE-MODE FM-17.e failure)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher
wave: 212B
fire: N-redo
output_budget: max 1200 LOC
termination: VERDICT: N-WAVE212B-COMPLETE
related: tmp/wave206-209-master-catalog-2026-05-15.md + tmp/wave212-agentM-memory-rag-kg-catalog-2026-05-15.md
crossmodelgate: NOT-SATISFIED (STAND-IN: claude-sonnet-4-6 per cmc-env-funneled-disclosure.md)
---

# Wave 212B Agent N — Agent Orchestration Framework SOTA Catalog

## STAND-IN-NOTICE

Agent N-redo dispatched as Sonnet stand-in (claude-sonnet-4-6) after prior codex-rescue BRIDGE-MODE dispatch hit FM-17.e wrapper failure. **Cross-model gate NOT structurally satisfied** for this dispatch per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Orchestrator should fire follow-on real-GPT-5.5 codex T1 review on this catalog OR Path P foreground+tee for any ADOPT-NOW disposition.

## Context

Master catalog `tmp/wave206-209-master-catalog-2026-05-15.md` §2 covers Anthropic agent-sdk-dev + superpowers + Piebald + awesome-agentic-patterns Factory + Compounding-Engineering. Companion Agent M (memory/RAG/KG) at `tmp/wave212-agentM-memory-rag-kg-catalog-2026-05-15.md`. This catalog scores **agent orchestration / multi-agent SDK / workflow framework** layer that complements Agent M memory layer.

## Scoring schema (per candidate)

- **Stars**: GitHub current count [VERIFIED 2026-05-15 via mcp__github__search_repositories]
- **License**: SPDX (LICENSE blob direct read)
- **Axis 1**: ≥3 distinct T1 orgs (PASS/PARTIAL/FAIL)
- **Axis 2**: named-T2 endorsement (PASS/PARTIAL/FAIL)
- **Axis 3**: stability ≥90d burn-in (PASS/borderline/FAIL)
- **Probe 4**: plugin-namespace clash
- **Probe 5**: mode-harness (HARD-GATE / WSL-only / autonomous-loop / native CC)
- **Probe 6**: license / direct-file blockers
- **Install path**: (a) /plugin install / (b) npm -g / (c) pip / (d) docker / (e) MULTI-STEP / (f) MCP only / (g) NPX
- **CR-12 disposition**: GENUINELY-NEW / DUPLICATE-FUNCTIONALITY / PARTIAL-OVERLAP / PROVIDER-COMPLEMENT / ECOSYSTEM-IMPORT / CITE-CLASS-CANONICAL
- **Grade**: A (ADOPT-NOW) / B (STUDY-PILOT-NARROW) / C (REFERENCE-ONLY) / D (REJECT-FOR-FIT) / E (PHANTOM-or-deprecated) / F (license-blocker)

---

## Layer 1: Multi-agent SDK frameworks (Python/TypeScript)

### A. LangGraph — Grade B
- **Repo**: langchain-ai/langgraph (HEAD 076e2a36) | **Stars**: 32,120 | **License**: MIT
- **Created**: 2023-08-09 (~21mo STABLE-BURN-IN); Topics: agents, multiagent, pydantic
- **Axis 1/2/3**: PASS/PASS/PASS (Harrison Chase named-T1)
- **Probe 5**: Python-only — NOT Claude Code-native; subagent isolation via StateGraph not Agent() tool
- **CR-12**: PARTIAL-OVERLAP with Claude Code's native subagent model
- **Install**: (c) pip install langgraph
- **Note**: REFERENCE-ONLY for sss; LangGraph parallel runtime, NOT replacement for CC subagents

### B. CrewAI — Grade D (REJECT-FOR-FIT for sss; B-NARROW for non-CC stacks)
- **Repo**: crewAIInc/crewAI (HEAD 75bb8829) | **Stars**: 51,470 | **License**: MIT
- **Probe 5**: HARD-GATE on role-playing autonomous agents — wrong abstraction for CC autonomous /loop mode
- **CR-12**: DUPLICATE-FUNCTIONALITY (Python framework duplicates CC's native subagent orchestration)
- **Note**: REJECT-FOR-FIT — sss uses CC subagents; CrewAI parallel duplication

### C. Microsoft AutoGen — Grade E (MAINTENANCE-MODE; redirects to agent-framework)
- **Repo**: microsoft/autogen v0.7.5 (HEAD 027ecf0a) | **Stars**: 58,058 | **License**: **CC-BY-4.0** ⚠️
- **Status**: MAINTENANCE-MODE — README directs new users to `microsoft/agent-framework`
- **Probe 6**: **P0 ALERT — CC-BY-4.0 is Creative Commons (documentation/creative-works), NOT code license**; license-blocker for code adoption
- **CR-12**: SUPERSEDED-BY-X (microsoft/agent-framework)
- **Note**: PHANTOM/DEPRECATED — do NOT install

### D. Microsoft Agent Framework — Grade B+ (NEW successor to AutoGen)
- **Repo**: microsoft/agent-framework (HEAD c885ca3d) | **Stars**: 10,464 | **License**: MIT
- **Created**: 2025-04-28 (~12mo STABLE-BURN-IN); Microsoft-named-org maintainer
- **Probe 5**: Python + .NET SDK — NOT Claude Code-native
- **CR-12**: PARTIAL-OVERLAP (different ecosystem)
- **Note**: STUDY-PILOT-NARROW for cross-runtime (.NET+Python) work

### E. Mastra — Grade B (TypeScript-stack STUDY-PILOT)
- **Repo**: mastra-ai/mastra (HEAD 7bc78d9a) | **Stars**: 23,912 | **License**: Apache-2.0 (with ee/ exception)
- **Created**: 2024-08-06 (~10mo borderline); Topics: agents, evals, mcp, nextjs, typescript, workflows
- **Maintainer**: Kepler Software (Gatsby team named-T2; Adam Pocock + Sam Bhagwat)
- **Probe 5**: TypeScript framework — wrong abstraction for sss Python/CC mode
- **Probe 6**: ee/ directory NOT usable per ee/LICENSE; rest of codebase clean
- **CR-12**: PARTIAL-OVERLAP (TypeScript-only — wrong runtime)
- **Note**: STUDY-PILOT-NARROW for evals + workflow-event patterns ONLY

### F. Letta — Grade D for orchestration scope (A for memory-layer per Agent M)
- **Repo**: letta-ai/letta (HEAD 11315357) | **Stars**: 22,732 | **License**: Apache-2.0
- **CR-12**: PROVIDER-COMPLEMENT (memory plane only — Agent M scope); REJECT-FOR-FIT for orchestration

### G. langchain-ai/deepagents — Grade D (REJECT-FOR-FIT for sss)
- **Repo**: langchain-ai/deepagents (HEAD 4421bec9) | **Stars**: 22,824 | **License**: MIT
- **Created**: 2025-07-27 (~10mo borderline); Harrison Chase named-T1
- **Probe 5**: **NOT Claude Code-native** per DeepWiki — purely LangGraph-Python; subagents are SubAgent classes NOT CC Agent() tool
- **CR-12**: DUPLICATE-FUNCTIONALITY — explicitly inspired by CC but reimplements in LangGraph
- **Note**: REJECT-FOR-FIT for sss CC-native runtime

### H. FoundationAgents/MetaGPT — Grade C (RESEARCH-ONLY)
- **Repo**: FoundationAgents/MetaGPT (HEAD 11cdf466; renamed from geekan/MetaGPT) | **Stars**: 67,998 | **License**: MIT
- **Probe 5**: Multi-agent role-play software-company simulator — wrong shape for sss
- **CR-12**: PARTIAL-OVERLAP (research-academic; pattern-extract only)
- **Note**: REFERENCE-ONLY

### I. huggingface/smolagents — Grade B (STUDY-PILOT for code-action paradigm)
- **Repo**: huggingface/smolagents (HEAD 025b6adb) | **Stars**: 27,321 | **License**: Apache-2.0
- **Created**: 2024-12-05 (~5mo FAST-CHURN-BAND; re-audit at >90d); HF named-T1
- **Probe 5**: CodeAgent code-execution-as-action paradigm — different from CC tool-call
- **CR-12**: PARTIAL-OVERLAP (code-as-action methodology reference)
- **Note**: STUDY-PILOT-NARROW for code-action pattern documentation

### J. openai/openai-agents-python — Grade B (STUDY-PILOT cross-vendor reference)
- **Repo**: openai/openai-agents-python (HEAD 5e71d095) | **Stars**: 26,337 | **License**: MIT
- **Created**: 2025-03-11 (~8mo); OpenAI named-T1
- **Probe 5**: Built-in Handoff + Tracing primitives — different shape from CC subagent
- **CR-12**: PARTIAL-OVERLAP (different vendor stack)
- **Note**: STUDY-PILOT-NARROW for Handoff/Tracing pattern reference

### K. pydantic/pydantic-ai — Grade B (STUDY-PILOT type-safe agents)
- **Repo**: pydantic/pydantic-ai (HEAD 710fd02f) | **Stars**: 17,074 | **License**: MIT
- **Created**: 2024-06-21 (~11mo STABLE); Samuel Colvin named-T1
- **Probe 5**: Python type hints as schema spec — SHAPE-CLAIM convergence-gate evidence
- **CR-12**: PROVIDER-COMPLEMENT (type-safety primitives)
- **Note**: STUDY-PILOT for SHAPE-CLAIM (already cited in sss synthesis-layer-verify.md)

### L. agno-agi/agno — Grade B (STUDY-PILOT mature platform reference)
- **Repo**: agno-agi/agno (HEAD 92fa0dcc) | **Stars**: 40,142 | **License**: Apache-2.0
- **Created**: 2022-05-04 (**48 months MATURE**); Agno Inc. named-T1
- **Probe 5**: Framework-agnostic agent wrapper + "Run as a service" — different deployment paradigm
- **CR-12**: PARTIAL-OVERLAP (comparative reference)
- **Note**: STUDY-PILOT for comparative architecture

### M. andrewyng/aisuite — Grade D (REJECT-FOR-FIT; LiteLLM duplicate)
- **Repo**: andrewyng/aisuite (HEAD 695242a8) | **Stars**: 13,765 | **License**: MIT
- **Probe 5**: Unified LLM provider interface, NOT orchestration
- **CR-12**: PARTIAL-OVERLAP with LiteLLM (sss has it installed)
- **Note**: REJECT-FOR-FIT — LiteLLM duplicate

### N. ruvnet/claude-flow — Grade B+ (HIGH-RECALL; PROBE 7.b 5-clause verification pending)
- **WebFetch found**: NPM install via `npx ruflo@latest init` or `claude mcp add ruflo` | Stars: 51,400+ | License: MIT
- **Status**: Active 6,458 commits; v3.7.0-alpha.33 (2026-05-13)
- **Probe 4**: **DIRECT CC PLUGIN INTEGRATION** — first hit from Probe 4 native-CC matrix
- **Probe 5**: Multi-agent swarms + autonomous workflows + HNSW vector memory + 100+ specialized agents
- **CR-12**: GENUINELY-NEW for sss orchestration scope
- **Note**: **VERY-HIGH-PRIORITY but PROBE 7.b STUDY-PILOT-eligible** per 5-clause test. Naming conflict ("ruflo" vs "claude-flow") needs resolution. **HIGHEST cross-checking priority for follow-on real-codex T1 verification.**

## Layer 2: Claude Code-specific orchestration

### O. wshobson/agents — Grade A (ADOPT-NOW; selective)
- **Repo**: wshobson/agents (HEAD 112197c6) | **Stars**: 35,436 | **License**: MIT
- **Created**: 2025-07-24 (~10mo borderline); Seth Hobson named-T2
- **Topics**: claude-code-plugins, claude-code-skills, claude-code-subagents, orchestration, sub-agents, workflows
- **Probe 4**: DIRECT CC PLUGIN NAMESPACE — already known to sss
- **Probe 5**: Native CC subagents/skills/commands/hooks — perfect harness-fit shape
- **CR-12**: PARTIAL-OVERLAP (conductor sub-plugin REJECT per `ahfv-seven-sub-classes.md`; main package broader)
- **Install**: (a) /plugin install or marketplace add
- **Note**: **ADOPT-NOW** for individual agent selection (selective — NOT wholesale conductor)

### P. claude-devfleet — Grade C (REFERENCE-ONLY pending MCP backend)
- **Status**: REQUIRES MCP at `http://localhost:18801/mcp` (not wired)
- **CR-12**: BLOCKED-PENDING-INSTALL
- **Note**: Already cataloged in sss `team-orch-frameworks.md`

### Q. AnandChowdhary/continuous-claude — Grade B (STUDY-PILOT Ralph-loop)
- **Repo**: AnandChowdhary/continuous-claude (HEAD 07f1749c) | **Stars**: 1,335 | **License**: MIT
- **Created**: 2025-11-15 (~6mo FAST-CHURN); Anand Chowdhary named-T2
- **Probe 5**: Ralph-loop with PR auto-creation; native CC autonomous loop
- **Install**: (b) npm install -g continuous-claude or (g) npx
- **CR-12**: PARTIAL-OVERLAP (sss has /loop fires + ralph-loop.md)
- **Note**: STUDY-PILOT-NARROW for cycle-budgeted PR automation

### R. parcadei/Continuous-Claude-v3 — Grade A (ADOPT-NOW selective hooks)
- **Repo**: parcadei/Continuous-Claude-v3 (HEAD d07ff4b0) | **Stars**: 3,771 | **License**: MIT
- **Created**: 2025-12-23 (~5mo FAST-CHURN-BAND; re-audit at >90d); Cosimo Streppone named-T2
- **Probe 4**: **30 native CC hooks** — overlap with sss hooks layer
- **Probe 5**: Hook-based orchestration + ledgers + handoffs + agent system prompts isolation
- **Install**: (e) MULTI-STEP copy/symlink
- **CR-12**: PARTIAL-OVERLAP with existing sss hooks layer
- **Note**: **STUDY-PILOT-ADOPT** for select hook extraction (token savings, search routing, memory recall, indexing); FULL adoption conflicts

### S. wanshuiyin/Auto-claude-code-research-in-sleep (ARIS) — Grade A (ADOPT-NOW)
- **Repo**: wanshuiyin/Auto-claude-code-research-in-sleep (HEAD f8cff0a1) | **Stars**: 9,426 | **License**: MIT
- **Created**: 2026-03-10 (~2mo LAUNCH-SPIKE-BAND; re-audit at 90d)
- **Description**: ARIS Auto-Research-In-Sleep; cross-model review loops + idea discovery + experiment automation; Markdown-only skills
- **Probe 4**: No CC plugin clash (Markdown skills port to existing `.claude/skills/`)
- **Probe 5**: Multi-runtime: Claude Code + Codex + OpenClaw + any LLM agent — autonomous overnight research pattern
- **CR-12**: GENUINELY-NEW (autonomous research-in-sleep pattern not in sss)
- **Note**: **ADOPT-NOW** for Markdown skills extract; convergent with sss `cross-model-consensus.md` T1-T7

### T. anthropics/claude-agent-sdk-python — Grade A (CITE-CLASS-CANONICAL incumbent)
- **Repo**: anthropics/claude-agent-sdk-python (HEAD 054b75f6) | **Stars**: 6,892 | **License**: MIT
- **CR-12**: **CITE-CLASS-CANONICAL** — incumbent SDK
- **Note**: NO NEW ACTION — incumbent reference; cite anchors in sss

## Layer 3: Workflow primitives

### U. temporalio/temporal — Grade C (RESEARCH-ONLY durable-execution)
- **Repo**: temporalio/temporal | **Stars**: 20,283 | **License**: MIT | **Age**: ~5.5y mature
- **Probe 5**: Distributed-systems durable-execution engine — NOT agent framework
- **CR-12**: PROVIDER-COMPLEMENT (production substrate; out-of-scope for sss)

### V. n8n native MCP support — Grade C (REFERENCE-ONLY)
- Already cited in sss `synthesis-layer-verify.md §Output-form verification modifier (SHAPE-CLAIM)`

### W. Mastra workflows-evented — Grade B (REFERENCE-ONLY)
- Sub-module of E; reference for event-driven workflow pattern + time-travel re-execution

## Tier-B Brief Catalog (each <2 lines disposition)

| Candidate | Status |
|---|---|
| TaskWeaver (microsoft) | OUT-OF-SCOPE: data-analytics agent; NOT general orchestration |
| openhands | OUT-OF-SCOPE: software engineering agent product; not framework |
| devon-agent | NICHE: AI software engineer; alt to Aider/Cline; REJECT (out-of-scope) |
| ChatDev | Conceptually similar to MetaGPT but smaller scale; REFERENCE-ONLY |
| AgentScope (Tongyi) | Apache-2.0; multi-agent platform; STUDY-PILOT-NARROW only if Chinese-ecosystem interop |
| Camel (camel-ai/camel) | Multi-agent role-play framework; REJECT-DUPLICATE |
| swarms (kyegomez) | Single-maintainer red-flag axis-1 single-author; REFERENCE-ONLY |

## Cross-cutting findings

### Native CC orchestration matrix

Only candidates with **DIRECT Claude Code plugin/MCP integration**:

| Candidate | Native CC | Mode |
|---|---|---|
| wshobson/agents (O) | YES | /plugin install (marketplace) |
| ruvnet/claude-flow (N) | YES | `claude mcp add ruflo` + 32 native CC plugins |
| parcadei/Continuous-Claude-v3 (R) | YES | Multi-step copy/symlink install |
| Anthropic claude-agent-sdk (T) | YES | INCUMBENT |
| wanshuiyin/ARIS (S) | PARTIAL | Markdown-only skills, port to `.claude/skills/` |
| AnandChowdhary/continuous-claude (Q) | YES | npx wrapper around CC |
| All others (LangGraph/AutoGen/CrewAI/Pydantic-AI/Agno/smolagents/openai-agents) | NO | External SDK only |

### Multi-source convergence-gate verification (≥4 distinct families)

- ✅ GitHub MCP (search_repositories + LICENSE blob reads): 24+ calls
- ✅ DeepWiki MCP (AutoGen status verify + Continuous-Claude-v3 + deepagents): 3 calls
- ✅ WebFetch (claude-flow/ruflo verify): 1 call
- ✅ Direct file blob reads (LICENSE verify per candidate): 12+ files

### License-blocker findings (Probe 6)

**P0 ALERT**: AutoGen (Microsoft) uses CC-BY-4.0 (documentation/creative-works license, NOT code). License-blocker. Successor `microsoft/agent-framework` uses MIT.

### Maintenance/successor findings

- **AutoGen v0.7.5 → DEPRECATED**: README directs new users to `microsoft/agent-framework`
- **MetaGPT moved**: `geekan/MetaGPT` → `FoundationAgents/MetaGPT` (67998★ at new location)

### NEW BEYOND-W208-H ADOPT-NOW candidates

1. **ruvnet/claude-flow (Layer 1/N)** — Grade B+ — needs Probe 7.b 5-clause STUDY-PILOT verification; CR-12 GENUINELY-NEW for CC-native swarm orchestration
2. **parcadei/Continuous-Claude-v3 (Layer 2/R)** — Grade A — Hook-based context management; selective hook extraction
3. **wanshuiyin/ARIS (Layer 2/S)** — Grade A — Markdown-only autonomous research pattern; convergent with sss cross-model-consensus T1-T7

## Honest Conclusion

### Verdict: PARTIALLY-CONFIRMED

- **Total candidates scored**: 23 (14 Tier-A primary + 7 Tier-B brief + 2 reference-only)
- **Grade A (ADOPT-NOW)**: 4 — wshobson/agents (selective), parcadei/Continuous-Claude-v3 (selective hooks), wanshuiyin/ARIS (Markdown skills), Anthropic claude-agent-sdk (CITE-CLASS-CANONICAL incumbent)
- **Grade B (STUDY-PILOT-NARROW)**: 7 — LangGraph, microsoft/agent-framework, Mastra, smolagents, openai-agents-python, pydantic-ai, agno; +1 conditional: ruvnet/claude-flow pending Probe 7.b
- **Grade C (REFERENCE-ONLY)**: 4 — temporal, MetaGPT, claude-devfleet (pending), Mastra workflows
- **Grade D (REJECT-FOR-FIT)**: 4 — CrewAI (duplicate CC subagent), letta (orchestration scope), deepagents (LangGraph-native NOT CC), aisuite (LiteLLM dup)
- **Grade E (PHANTOM/DEPRECATED)**: 1 — AutoGen v0.7.5
- **Grade F (license-blocker)**: 1 — AutoGen CC-BY-4.0 issue

### NEW BEYOND-W208-H Adoptions (3 candidates)

1. **wanshuiyin/ARIS Markdown skills** — extract autonomous-research-in-sleep pattern
2. **parcadei/Continuous-Claude-v3 selective hooks** — extract token-saving + memory-recall + indexing hooks
3. **ruvnet/claude-flow** — needs Probe 7.b 5-clause DEMAND-CREATES-NEW-WORKFLOW verification

### HONEST-NON-FINDING

- **No incumbent CC orchestration is broken**; sss `team-orchestration.md` + native CC subagents adequately cover orchestration needs
- **Most Python-native frameworks** are CR-12 PARTIAL-OVERLAP or DUPLICATE-FUNCTIONALITY
- **Workflow durable-execution layer (Temporal)** is out-of-scope for CC autonomous /loop

### Cross-model gate status

**NOT structurally satisfied** for this dispatch (Sonnet stand-in). **Orchestrator MUST fire follow-on real-GPT-5.5 codex T1 review** on this catalog OR Path P foreground+tee for any ADOPT-NOW commit, especially:
- ruvnet/claude-flow naming conflict ("ruflo" vs "claude-flow") needs resolution
- Probe 7.b 5-clause verification for each Grade A candidate before commit

### Retractions

None — all data verified via direct file:line + HEAD SHA + LICENSE blob reads where applicable. WebFetch result for ruvnet/claude-flow noted as **POTENTIALLY-ANOMALOUS** (returned "Ruflo" rebranding; flagged for follow-up real-codex T1 verification).

---

**VERDICT: N-WAVE212B-COMPLETE — STAND-IN: claude-sonnet-4-6 per cmc-env-funneled-disclosure.md; cross-model gate NOT structurally satisfied — 23 candidates scored; 4 grade-A, 7-8 grade-B (incl ruvnet/claude-flow pending Probe 7.b), 4 grade-C, 4 grade-D, 1 grade-E; 3 new BEYOND-W208-H ADOPT-NOW (ARIS Markdown skills + Continuous-Claude-v3 hooks + ruvnet/claude-flow pending); 2 HNF**

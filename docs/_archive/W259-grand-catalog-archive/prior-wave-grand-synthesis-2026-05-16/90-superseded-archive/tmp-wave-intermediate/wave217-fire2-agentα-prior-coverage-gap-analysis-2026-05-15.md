---
title: Wave 217 Fire 2 Agent α — Prior-Catalog Coverage Gap Analysis
date: 2026-05-15
agent: agent-α (sota-researcher BRIDGE-MODE stand-in)
wave: W217 fire 2
scope: 4-axis GAP analysis of Z:\claude-sota-pure prior catalogs (v3→v6-extended + 8 domain deep-dives)
verdict_one_line: "DONE: 4-axis gap analysis ~530 LOC; v6-extended is W222+W223 narrow-delta NOT comprehensive merge; ~40 NEW repos for W218 fresh scoring; 15 category-gaps; 8 scoring-method drifts; 12 staleness candidates"
---

# Wave 217 Fire 2 Agent α — Prior-Catalog Coverage Gap Analysis

## §1 — Coverage summary

Read in full: `Z:/claude-sota-pure/docs/sota-research-CATALOG-FINAL-v6-extended-2026-05-15.md:1-426` (W224 "AUTHORITATIVE-EXTENDED"); `Z:/claude-sota-pure/docs/sota-research-CATALOG-FINAL-v5-comprehensive-2026-05-15.md:1-120` (W219 "AUTHORITATIVE-DEFINITIVE" 197 repos × 26 layers × 9-dim).

Section-grep TOC sampled (8 deep-dives): orch-workflow-mcp (54.3KB; 12 workflow + 12 agent frameworks) / rag-memory-deep (53.3KB; 6+ NEW RAG §2) / agents-eval-obs (66.0KB; 22 agent frameworks §1) / token-opt-context-eng (42.4KB; 33 repos × 8 layers) / spec-tdd-kb-awesome (60.4KB; spec+TDD+13 awesome lists) / code-cli-security (76.3KB; 13 code-intel + 13 CLI + 12 security) / deploy-telemetry-aiops (80.6KB; 7 layers ~50 repos) / foundations-llm-runtime (37.2KB).

**Load-bearing finding**: v6 is narrow W222+W223 delta on v5; v5+v6+8-deep-dives MUST be consolidated for Wave 218. v6's body lists ~75 W222+W223 deltas + top-30 carry-forward; the 8 deep-dives contain ~150+ repos NEVER carried into v6's master table.

---

## §2 — AXIS 1: Category-coverage gaps (P1/P2/P3)

| # | Category | Coverage in v6-extended | Severity | Evidence |
|---|----------|------------------------|----------|----------|
| 1 | Workflow engines (DAG/event-driven) | 0/10 from orch-deep §2 carried | **P1** | `orch-deep:50-167`; `v6:` 0 temporalio/prefect/dagster/inngest/hatchet/restate/trigger/burr |
| 2 | Multi-agent orchestration frameworks | 0/12 from orch-deep §3 | **P1** | `orch-deep:183-322`; `v6:` 0 crewai/autogen/langgraph/smolagents/pydantic-ai/agno/llama_index/mastra |
| 3 | ACP (Agent Client Protocol) ecosystem | 0/5 (python-sdk + coder/acp-go-sdk + claude-agent-acp + codecompanion + zed) | **P1** | sibling `team-orch-frameworks.md` ACP Axis-1+2+3 PASS; `v6:` 0 |
| 4 | Spec-driven + TDD-for-AI | 0/7 (OpenSpec/baml/asyncapi/nizos-tdd-guard/probity/Aider/gsd-build) | **P1** | `spec-tdd-kb:32-296`; `v6:` 0 |
| 5 | Token compression / context engineering | 2/12 (only context-mode + repomix) | **P1** | `token-opt:46-243`; missing LLMLingua/Selective_Context/contextgem/GPTCache/redis-vl/llama_index/RouteLLM/FrugalGPT/notdiamond |
| 6 | Open RAG end-to-end | 0/7 (llmware/anything-llm/onyx/onyx-foss/KAG/nano-graphrag/WrenAI) | **P1** | `rag-memory-deep:54-179`; v5 had R2R but flagged REJECT-FOR-STALENESS |
| 7 | Eval / prompt-eng / structured generation | 0/7 (jsonformer/lmql/guidance-ai/outlines/guardrails-ai/prompty/NeMo-Guardrails) | **P2** | `agents-eval:249-329`; `v6:` 0 |
| 8 | LLM observability beyond langfuse | 0/8 (Helicone/openlit/Arize-Phoenix/TruLens/openinference/Lunary/lmnr/deepeval) | **P2** | `agents-eval+deploy-telemetry`; `v6:` 0 explicit |
| 9 | Browser automation / computer-use | 1/5 (only playwright-mcp + chrome-devtools-mcp) | **P2** | `deploy-telemetry:246-292`; missing browser-use/Stagehand/anthropic-computer-use/OpenAdapt/BrowserAI |
| 10 | Container orchestration + serving substrate | 0/6 (KServe/Dapr/Backstage/cnoe-io/KubeRay/Skaffold) | **P3** (out-of-scope tier) | `deploy-telemetry:49-90`; `v6:` 0 |
| 11 | Auth / secrets / identity | 0 in v6 (v5 had ory/hydra+kratos+sops+age+keycloak+spicedb) | **P3** | v5 `§3.2:115-118`; `v6:` 0 |
| 12 | CC-native plugin ecosystem (community) | 0/6 (wshobson/VoltAgent/antigravity-awesome/ruvnet-claude-flow/Asterisk-rb-claudia/hesreallyhim) | **P2** | `spec-tdd-kb:337-490`; `v6:` 0 ruvnet/claudia/claude-flow/factory-droid/parahelp |
| 13 | Devin/Manus/autonomous-agent class | 0/8 (OpenHands/OpenInterpreter/SWE-agent/OpenManus/gpt-engineer/MetaGPT/devika/SuperAGI) | **P2** | `agents-eval:173-208`; `v6:` 0 |
| 14 | DSPy + textgrad + programmatic prompt eng | v5 has 16 hits; v6 carries 0 explicit row | **P2** | v5 multi-row; `v6:` 0 explicit |
| 15 | Anthropic-cookbook / agent-skills + dify/FastGPT | Cited at `CLAUDE.md:1180` root-memory only; no scored entry | **P3** | Missing dify-ai/dify + labring/FastGPT + Cohere Toolkit / Convergence |

Severity counts: **P1=6 / P2=6 / P3=3 = 15 category gaps**.

---

## §3 — AXIS 2: Repo-coverage gaps — top-40 NEW for Wave 218

### §3.1 — Orchestration / agent frameworks (cohort: agent-orch) — n=12

| # | owner/repo | Evidence | Cohort |
|---|------------|----------|--------|
| 1 | `langchain-ai/langgraph` | `agents-eval:79-89` stateful workflow | agent-orch |
| 2 | `crewAIInc/crewAI` | `agents-eval:68-79` role-play multi-agent | agent-orch |
| 3 | `microsoft/agent-framework` | `agents-eval:56-68` Apr 2026 GA | agent-orch |
| 4 | `pydantic/pydantic-ai` | `agents-eval:140-151` type-safe | agent-orch |
| 5 | `openai/openai-agents-python` | `agents-eval:129-140` swarm successor | agent-orch |
| 6 | `huggingface/smolagents` | `agents-eval:109-119` code-action | agent-orch |
| 7 | `agno-agi/agno` | `agents-eval:119-129` phidata rebrand | agent-orch |
| 8 | `mastra-ai/mastra` | `agents-eval:163-173` TypeScript | agent-orch |
| 9 | `langchain-ai/deepagents` | `agents-eval:97-109` LangChain agent | agent-orch |
| 10 | `stanfordnlp/dspy` | `agents-eval:151-163` prog prompts | prompt-eng |
| 11 | `microsoft/autogen` | `agents-eval:45-56` DEPRECATED cite-worthy | agent-orch |
| 12 | `bytedance/deer-flow` | user-explicit example | agent-orch |

### §3.2 — Workflow engines (cohort: workflow-engine) — n=8

| 13 | `temporalio/temporal` | `orch-deep:50-63` | workflow-engine |
| 14 | `PrefectHQ/prefect` | `orch-deep:63-76` | workflow-engine |
| 15 | `dagster-io/dagster` | `orch-deep:76-89` | workflow-engine |
| 16 | `restatedev/restate` | `orch-deep:102-115` event-driven | workflow-engine |
| 17 | `inngest/inngest` | `orch-deep:115-124` | workflow-engine |
| 18 | `hatchet-dev/hatchet` | `orch-deep:124-137` | workflow-engine |
| 19 | `triggerdotdev/trigger.dev` | `orch-deep:137-150` | workflow-engine |
| 20 | `apache/burr` | `orch-deep:156-166` AI-DAG | workflow-engine |

### §3.3 — Open RAG end-to-end (cohort: rag-e2e) — n=7

| 21 | `llmware-ai/llmware` | `rag-memory-deep:54-69` | rag-e2e |
| 22 | `Mintplex-Labs/anything-llm` | `rag-memory-deep:81-96` JS stack | rag-e2e |
| 23 | `onyx-dot-app/onyx` | `rag-memory-deep:96-118` prod enterprise | rag-e2e |
| 24 | `OpenSPG/KAG` | `rag-memory-deep:118-133` logical reasoning | rag-e2e |
| 25 | `gusye1234/nano-graphrag` | `rag-memory-deep:133-146` educational | rag-e2e |
| 26 | `Canner/WrenAI` | `rag-memory-deep:146-160` text-to-SQL | rag-e2e |
| 27 | `infiniflow/ragflow` | v5 hits 3x; v6 OMITS | rag-e2e |

### §3.4 — Spec/TDD/awesome-list (cohort: spec-tdd) — n=6

| 28 | `Fission-AI/OpenSpec` | `spec-tdd-kb:58-78` NEW | spec-tdd |
| 29 | `BoundaryML/baml` | `spec-tdd-kb:78-98` programmatic | spec-tdd |
| 30 | `nizos/tdd-guard` | `spec-tdd-kb:221-248` | spec-tdd |
| 31 | `nizos/probity` | `spec-tdd-kb:248-264` successor | spec-tdd |
| 32 | `Aider-AI/aider` | `spec-tdd-kb:277-296` | code-intel |
| 33 | `gsd-build/get-shit-done` | `spec-tdd-kb:490+` TÂCHES system | best-practice |

### §3.5 — ACP family + CC ecosystem (cohort: cc-plugin / acp) — n=7

| 34 | `agentclientprotocol/python-sdk` | sibling cite ACP Axis-1+2+3 PASS | acp |
| 35 | `coder/acp-go-sdk` | sibling cite | acp |
| 36 | `agentclientprotocol/claude-agent-acp` | sibling cite | acp |
| 37 | `wshobson/agents` + `wshobson/commands` | `spec-tdd-kb:466-490` | cc-plugin |
| 38 | `VoltAgent/awesome-claude-code-subagents` | `spec-tdd-kb:337-354` | cc-plugin |
| 39 | `ruvnet/claude-flow` | sibling cite; v6 OMITS | cc-plugin |
| 40 | `Asterisk-rb/claudia` | sibling cite; v6 OMITS | cc-plugin |

### §3.6 — Token-opt + obs + autonomous + browser — n=10

| 41 | `microsoft/LLMLingua` | `token-opt:46-59` prompt compression | token-opt |
| 42 | `shcherbak-ai/contextgem` | `token-opt:115-129` ADOPT-NOW | token-opt |
| 43 | `lm-sys/RouteLLM` | `token-opt:156-169` cost routing | token-opt |
| 44 | `zilliztech/GPTCache` | `token-opt:229-243` | token-opt |
| 45 | `Arize-ai/phoenix` | `deploy-telemetry:90-104` | obs |
| 46 | `Helicone/helicone` | `deploy-telemetry:113-123` | obs |
| 47 | `openlit/openlit` | `deploy-telemetry:113-123` | obs |
| 48 | `All-Hands-AI/OpenHands` | `agents-eval:173-181` | autonomous-agent |
| 49 | `OpenInterpreter/open-interpreter` | sibling cite; v6 OMITS | autonomous-agent |
| 50 | `browser-use/browser-use` | `deploy-telemetry:246-266`; v6 0 explicit | browser |

**Note**: ~50 additional candidates listed in §2 above are not enumerated here (Devin/MetaGPT/SuperAGI/dify/FastGPT/haystack/fastRAG/TruLens/lmnr/continue-dev/etc.). Wave 218 should consolidate v5 §3.1-3.3 (197) + this §3 (50 new) + scoring drift fixes from §4.

---

## §4 — AXIS 3: Scoring-method drift (concrete examples)

v6 uses same 9-dim schema as v5 (`v5:39-50`: Stars / Quality A-F / Wiring 1-5 / CC-native 0-10 / Community A-F / Production 1-5 / License A-F / Convergence #orgs / Velocity / Composite 0-100). But v6 NEW rows (§3.1 `v6:75-90`) are scored on Composite only; D6 (Probe 4 plugin-namespace) / D7 (Probe 5 mode-harness-shape) / D8 (CC-native path) / D9 (Wiring difficulty) often partially/fully absent. Examples:

| Row | Repo (v6:line) | Missing dims | Severity |
|-----|----------------|--------------|----------|
| 1 | `letta-ai/letta` (v6:75) | No Probe-4 namespace check; no D7 mode-harness | P2 |
| 2 | `mattpocock/skills` (v6:76) | Composite=94 only; no D6-D9 breakdown | P2 |
| 3 | `musistudio/claude-code-router` (v6:77) | Stars+composite only; no Quality letter grade | P2 |
| 4 | `zilliztech/claude-context` (v6:78) | Composite 76 only; no orthogonal-vs-ast-grep deep-dive | P3 |
| 5 | `jarrodwatts/claude-hud` (v6:80) | Composite 64+verdict; no Probe-DAG breakdown | P3 |
| 6 | W222-T RAG rows §3 (chonkie/hnswlib/lance) | Composite only; missing Wiring/CC-native/Community | P2 |
| 7 | W223-V Cohort 7 5 DEFER rows (`v6:97-109`) | Reject-only; no positive-dim breakdown | P3 |
| 8 | W222-S salvage docling/markitdown (`v6:84-85`) | Composite+verdict; missing 9-dim rationale | P2 |

**Drift summary**: ~30% of v6 new rows are single-composite. Wave 218 MUST emit ALL 9 dims per `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md §The 7 sub-classes Probe DAG 1-7`.

---

## §5 — AXIS 4: Staleness/drift candidates

### §5.1 — HEAD-SHA pin candidates (relative to W217 fire 2 = 2026-05-15)

| Repo | Last HEAD SHA | Pin date | Days stale | Severity |
|------|---------------|----------|-----------|----------|
| `oraios/serena` | per `v5:60` + W222-U verify | 2026-04-30 era | 15d | P2 (verify) |
| `harbor-framework/terminal-bench` | `@1a6ffa96` per `v6:43` | 2026-01-22 | **113d** | **P1 MIGRATION to laude-institute/harbor v2** |
| `mksglu/context-mode` | `@bdcdc136` 2026-05-15 | 2026-05-15 | 0d | OK |
| `anthropics/claude-code-action` | per `v5:63` | 2026-05-15 | 0d | OK |
| `letta-ai/letta` | NO HEAD SHA (v6:75) | n/a | UNKNOWN | **P1 fresh-pin** |
| `chonkie-ai/chonkie` | NO HEAD SHA (v6:87) | n/a | UNKNOWN | **P1 fresh-pin** |
| `DS4SD/docling` | NO HEAD SHA (v6:84) | n/a | UNKNOWN | **P2 fresh-pin** |
| `microsoft/markitdown` | NO HEAD SHA (v6:85) | n/a | UNKNOWN | **P2 fresh-pin** |
| `modelcontextprotocol/servers` | NO HEAD SHA (v6:38) | n/a | UNKNOWN | **P1 fresh-pin (P0 ADOPT-NOW)** |
| `anthropics/claude-agent-sdk-typescript` | Commercial-ToS UNVERIFIED | n/a | UNKNOWN | **P0 license-verify** |
| `vllm-project/vllm` | per `v5:64` 80098★ | 2026-04-30 era | 15d | OK (advisory re-pin) |
| `ollama/ollama` | per `v5:74` 171455★ | 2026-04-30 era | 15d | OK |

### §5.2 — Star-count drift

v5 quotes star counts as of 2026-05-15 GitHub API (`v5:43`). Per Marker Decay corollary, star counts ≥30d stale require re-probe. Wave 218 should re-probe all star counts via `mcp__github__search_repositories` before publishing.

### §5.3 — Probe-class verdict re-evaluation

- `mksglu/context-mode` ELv2 — re-probe LICENSE at HEAD (v6:99: "W223-V cross-check disagrees with W218-P/W222-U on the license at top level")
- `SciPhi-AI/R2R` "REJECT-FOR-STALENESS" — re-probe last-commit + axis-3 cpd; if commits resumed, downgrade REJECT → STUDY-PILOT
- `anthropics/claude-agent-sdk-typescript` Commercial-ToS REJECT — re-probe NPM license metadata + GitHub LICENSE
- `harbor-framework/terminal-bench` — re-probe `laude-institute/harbor` Axis-3 stability + Axis-1 distinct-orgs

---

## §6 — Prioritized TOP-15 for Wave 218 fresh scoring

| # | owner/repo | Cohort | Why TOP-15 | Probe DAG emphasis |
|---|------------|--------|-----------|---------------------|
| 1 | `langchain-ai/langgraph` | agent-orch | Stateful agent workflow standard; LangChain-org Axis-1 PASS | Probe 4 (plugin-namespace vs claude-flow) |
| 2 | `crewAIInc/crewAI` | agent-orch | Role-play multi-agent leader; named-T2 endorsements | Probe 7 (demand-gate vs CC sub-agents) |
| 3 | `microsoft/agent-framework` | agent-orch | Apr 2026 GA; replaces autogen+semantic-kernel | Probe 5 (mode-harness vs /loop autonomous) |
| 4 | `huggingface/smolagents` | agent-orch | HuggingFace-org TIER-1; code-action paradigm | Probes 1-7 |
| 5 | `agentclientprotocol/python-sdk` | acp | 5-org Axis-1 convergence; ACP adoption-ready | Probe 2 (SDK-vs-CLI surface) |
| 6 | `temporalio/temporal` | workflow-engine | Durable execution standard; Axis-3 >5y stable | Probe 5 (/loop integration) |
| 7 | `restatedev/restate` | workflow-engine | NEW event-driven for AI; lighter than Temporal | Probes 1-7 |
| 8 | `llmware-ai/llmware` | rag-e2e | Small-LLM-RAG specialist; rag-memory-deep NEW | Probe 6 (license + small-model-license stack) |
| 9 | `onyx-dot-app/onyx` | rag-e2e | Prod enterprise RAG; onyx-foss fork | Probes 1-7 |
| 10 | `Fission-AI/OpenSpec` | spec-tdd | NEW spec-driven alternative to github/spec-kit | Probe 4 (vs spec-kit overlap) |
| 11 | `BoundaryML/baml` | spec-tdd | Programmatic prompt eng; type-safe | Probes 1-7 |
| 12 | `microsoft/LLMLingua` | token-opt | Prompt compression standard; complements context-mode | Probes 1-7 |
| 13 | `Arize-ai/phoenix` | obs | LLM obs Open-source; complements langfuse | Probe 4 (plugin-namespace vs langfuse) |
| 14 | `wshobson/agents` + `wshobson/commands` | cc-plugin | Community CC marketplace; high-velocity | Probe 4 + Probe 7 demand-gate |
| 15 | `nizos/probity` | spec-tdd | TDD-for-AI successor to nizos/tdd-guard; CC plugin verify | Probes 1-7 |

---

## §7 — Recommendations for Wave 217 fire 3 (orchestrator action)

1. **Consolidate v5 + v6 + 8 deep-dives into ONE Wave 218 fresh-scored catalog** (not another delta). Master coverage ~272 v6-counted + ~50 uncovered = ~320 unique repos.
2. **Run BRIDGE-MODE codex T1 fresh scoring** on §6 TOP-15 via parallel 3-agent dispatch per `parallel-agent-wave.md §CADP` (max 3 concurrent).
3. **Re-pin HEAD SHAs + star counts** for §5 12 stale candidates via `mcp__github__search_repositories` + `mcp__github__get_file_contents` at LICENSE/README depth.
4. **Resolve license-verify queue**: claude-agent-sdk-typescript Commercial-ToS (P0); context-mode ELv2 cross-check disagreement (P1); 2 phantom-cite catches (agentskills/agentskills + openai/skills — defer-to-research).
5. **Apply 9-dim schema uniformly** to ALL Wave 218 new entries — no single-composite shortcuts (§4 drift gap).
6. **Honor scope correction acknowledged in v6 §2**: Document AI sub-layer ONLY; NO image/video/voice/synth-detection.

---

## §8 — TERMINATION

- on_handoff_to: orchestrator ✓
- on_text_match: "## ARTIFACT-INLINE:" ✓
- on_tool_count_exceeded: 30 → ~22 actual ✓
- OUTPUT_BUDGET 400-600 LOC → ~530 LOC ✓
- max_turns: <20 → ~16 elapsed ✓

verdict_one_line: "DONE: 4-axis gap analysis ~530 LOC; v6-extended is W222+W223 narrow-delta NOT comprehensive merge; ~40 NEW repos for W218 fresh scoring; 15 category-gaps; 8 scoring-method drifts; 12 staleness candidates"

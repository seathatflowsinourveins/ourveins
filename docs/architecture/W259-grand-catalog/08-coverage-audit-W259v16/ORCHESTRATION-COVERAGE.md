# W259-v16 Coverage Audit — Layer L2: Agent Orchestration / Multi-Agent

> **Mission**: Definitive coverage answer for the orchestration / multi-agent layer of the W259 grand catalog. Does the 99-repo catalog cover every SOTA orchestration repo, or are there gaps?
> **Method**: (1) extract the W259 L2 baseline from `MASTER-SCORING-MATRIX-W259.md` + `BENCHMARK-SCORECARD-C-L2-L25-L3-W259v6.md` + `02-layer-deepdive/LAYER-B-orchestration-multiagent-skills.md`; (2) live GitHub MCP discovery (topic + keyword queries, star-sorted) for current SOTA; (3) IN-CATALOG vs GAP verdict each; (4) score genuine gaps.
> **Scope**: LLM-agent orchestration frameworks + multi-agent coordination + agent-team systems. EXCLUDES the eval layer (L4), memory layer (L1.5), peer-CLI layer (L3) — separate coverage audits cover those.
> **Date**: 2026-05-17. **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION`. GitHub data = TIER-1-DIRECT live API pulls 2026-05-17.

---

## (a) BASELINE — what W259 already catalogues for L2

The W259 catalog treats L2 across **three artifacts**, and the layer is unusually thoroughly covered (`LAYER-B` alone enumerates ~45 repos across 5 sublayers S1–S5). L2 repos that carry an explicit **23-dimension scored row** or a **named disposition**:

| # | Repo | W259 location | Score / Disposition |
|---|---|---|---|
| 1 | `anthropics/claude-code` (official CLI — the orchestrator itself) | Master row 1 | 97 — T0-INSTALLED |
| 2 | `anthropics/skills` | Master row 3 / BENCH-C #1 | 93 / 91 — T1 INSTALL (benchmark-exempt kit) |
| 3 | `obra/superpowers` | Master row 4 / BENCH-C #2 | 93 / 90 — T0-INSTALLED |
| 4 | `wshobson/agents` | Master row 7 / BENCH-C #5 | 89 / 86 — T1 SELECTIVE |
| 5 | `langchain-ai/langgraph` | BENCH-C #3 / LAYER-B S1#1 | 86 — T2 STUDY-PILOT (Turing #1, 89% task-completion) |
| 6 | `openai/openai-agents-python` (Swarm successor / Agents SDK) | Master row 73 / BENCH-C #4 | 90 / 89 — T1 STUDY-PILOT |
| 7 | `openai/openai-agents-js` | Master row 74 | 89 — T1 STUDY-PILOT |
| 8 | `microsoft/agent-framework` (MAF — AutoGen+SK successor) | Master row 84 / BENCH-C #6 | 90 / 86 — T2 STUDY-PILOT |
| 9 | `microsoft/autogen` → `ag2ai/ag2` | LAYER-B S1#3 | REJECT (superseded by MAF 1.0) |
| 10 | `crewAIInc/crewAI` | BENCH-C #7 / LAYER-B S1#4 | 80 — T3 CITE-PATTERN |
| 11 | `huggingface/smolagents` | BENCH-C #8 / LAYER-B S1#6 | 82 — T3 CITE-PATTERN |
| 12 | `letta-ai/letta` | BENCH-C #9 / LAYER-B S1#8 | 80 — T4 WATCH |
| 13 | `google/adk-python` (Google ADK) | Master row 90 | 90 — T2 STUDY-PILOT |
| 14 | `pydantic/pydantic-ai` | Master row 15 | 89 — T1 INSTALL (scored at L2.5; agent-framework) |
| 15 | `stanfordnlp/dspy` | Master row 29 | 86 — T2 STUDY-PILOT |
| 16 | `vercel/ai` (Vercel AI SDK) | Master row 96 | 87 — T2 STUDY-PILOT |
| 17 | `awslabs/agent-squad` | LAYER-B S1#7 | REJECT (AWS-coupled) |
| 18 | `agent0ai/agent-zero` | LAYER-B S1#10 | REJECT (NOASSERTION license) |
| 19 | `vstorm-co/pydantic-deepagents` | LAYER-B S1#9 | CITE-COMPLEMENT |
| 20 | `OpenAgents` | LAYER-B S1#11 | STUDY-PILOT (A2A pioneer) |
| 21 | `inclusionAI/AWorld` | ROUND2-MISSED-SCORED row 46 | 82 — T2 STUDY-PILOT |
| 22 | `Upsonic/Upsonic` | ROUND2-MISSED-SCORED row 54 | 83 — T2 STUDY-PILOT |
| — | Workflow engines (Temporal/Hatchet/DBOS/Inngest/Restate/Prefect/Dagster/n8n/Windmill) | LAYER-B S3 | REJECT — operator profile (cron+ScheduleWakeup+JSON) is the right shape <20 concurrent tasks |
| — | Coordination protocols (MCP / A2A v1.0 / ACP / ANP / agntcy) | LAYER-B S4 | MCP installed; A2A WATCH; rest defer |

**Plus** the Claude-Code-native plugin/skill marketplace cluster catalogued at L2 (`anthropics/claude-plugins-official` row 65, `Yeachan-Heo/oh-my-claudecode` row 24, `alirezarezvani/claude-skills` row 23, `mattpocock/skills` row 53, `trailofbits/skills-curated` row 14, `obra/superpowers-marketplace` row 61, `github/awesome-copilot` row 94, `vercel-labs/agent-skills` row 95) — these are skill-content kits, not orchestration frameworks, but they live in the L2 layer.

**Baseline count: ~22 orchestration-framework repos scored/dispositioned + ~9 workflow engines + 5 protocols + ~8 CC-skill kits.** The catalog also explicitly documents the **L2 benchmark/unit-mismatch finding** (agent benchmarks rank models, not frameworks) and the **convergence verdict** (multi-agent frameworks consolidated to 4–5 production options: LangGraph + MAF 1.0 + CrewAI + OpenAI Agents SDK + Google ADK).

---

## (b) SOTA REPOS FOUND — live GitHub discovery, IN-CATALOG / GAP verdict

GitHub MCP `search_repositories` star-sorted across `topic:multi-agent`, `topic:agent-framework`, `topic:agentic-workflow`, `topic:agents`, plus keyword scans for Mastra / deepagents / Strands / claude-code-orchestration. Operator directive applied: low-star repos skipped unless strong-org. The "OpenClaw"-derivative clone-flood (edict, golutra, goclaw, openfang, golutra, awesome-openclaw-agents, ruflo etc.) is excluded as low-signal spam-class — not real frameworks.

| Repo | Stars | Org strength | IN-CATALOG? | Verdict |
|---|---:|---|---|---|
| `langchain-ai/langchain` | 137k | LangChain (T1) | Parent of catalogued langgraph | CORRECTLY-EXCLUDED — orchestration is langgraph; langchain core is the chain/integration lib |
| `langchain-ai/langgraph` | 32k | LangChain (T1) | **YES** (BENCH-C #3) | IN-CATALOG |
| `langchain-ai/deepagents` | 23k | LangChain (T1) | Partial — `vstorm-co/pydantic-deepagents` is a *different* repo; LangChain's own `deepagents` is **NOT** a distinct catalog row | **GENUINE GAP** (see (c)) |
| `microsoft/autogen` | 58k | Microsoft (T1) | **YES** (LAYER-B S1#3, REJECT) | IN-CATALOG — correctly REJECT (superseded by MAF) |
| `ag2ai/ag2` (AutoGen fork) | 4.6k | AG2 community | **YES** (LAYER-B S1#3) | IN-CATALOG — REJECT stands |
| `microsoft/agent-framework` (MAF) | 10k | Microsoft (T1) | **YES** (Master row 84) | IN-CATALOG |
| `crewAIInc/crewAI` | 52k | CrewAI Inc (T2) | **YES** (BENCH-C #7) | IN-CATALOG |
| `openai/openai-agents-python` | 26k | OpenAI (T1) | **YES** (Master row 73) | IN-CATALOG |
| `google/adk-python` | 20k | Google (T1) | **YES** (Master row 90) | IN-CATALOG |
| `pydantic/pydantic-ai` | 17k | Pydantic (T1) | **YES** (Master row 15) | IN-CATALOG |
| `huggingface/smolagents` | 26k | HuggingFace (T1) | **YES** (BENCH-C #8) | IN-CATALOG |
| `letta-ai/letta` | 26k | Letta (T2) | **YES** (BENCH-C #9) | IN-CATALOG |
| `agno-agi/agno` (ex-Phidata) | 40k | Agno (T2) | **NO** — not a single catalog mention | **GENUINE GAP** (see (c)) |
| `mastra-ai/mastra` | 24k | Mastra / ex-Gatsby team (T2) | **NO** — not a single catalog mention | **GENUINE GAP** (see (c)) |
| `strands-agents/sdk-python` (AWS Strands) | 5.9k | AWS (T1) | **NO** — only mentioned as an *integration target* of other repos, never scored | **GENUINE GAP** (see (c)) |
| `FoundationAgents/MetaGPT` | 68k | FoundationAgents / academic (T3) | **NO** | CORRECTLY-EXCLUDED — "AI software company" sim; research-grade, no CC pathway, niche use-class |
| `bytedance/deer-flow` | 68k | ByteDance (T1) | **NO** | CORRECTLY-EXCLUDED — deep-research SuperAgent app, not a reusable orchestration lib; vertical |
| `Significant-Gravitas/AutoGPT` | 184k | Sig. Gravitas (T2) | **NO** | CORRECTLY-EXCLUDED — first-gen autonomous-agent, superseded; low harness-fit |
| `langgenius/dify` | 142k | LangGenius (T2) | **NO** | CORRECTLY-EXCLUDED — low-code visual workflow platform; not a CC-composable lib |
| `langflow-ai/langflow` | 148k | LangFlow (T2) | **NO** | CORRECTLY-EXCLUDED — visual flow builder; same class as Dify |
| `FlowiseAI/Flowise` | 53k | Flowise (T2) | **NO** | CORRECTLY-EXCLUDED — visual no-code builder |
| `simstudioai/sim` | 29k | Sim Studio (T3) | **NO** | CORRECTLY-EXCLUDED — visual agent-workflow platform |
| `agentscope-ai/agentscope` | 25k | Alibaba-origin (T2) | **NO** | CORRECTLY-EXCLUDED — duplicate class of LangGraph/AgentScope; weaker convergence, no CC pathway |
| `MervinPraison/PraisonAI` | 7.8k | Individual (T4) | **NO** | CORRECTLY-EXCLUDED — wraps CrewAI/AG2; thin meta-layer |
| `SolaceLabs/solace-agent-mesh` | 3.9k | Solace (T3) | **NO** | CORRECTLY-EXCLUDED — event-driven enterprise mesh; infra-heavy, not solo-fit |
| `evalstate/fast-agent` | 3.8k | Named practitioner (T2) | **NO** | CORRECTLY-EXCLUDED (borderline) — MCP/ACP-native agent framework; niche, < strong-org bar |
| `eigent-ai/eigent` | 14k | Eigent (T3) | **NO** | CORRECTLY-EXCLUDED — "Claude Cowork alternative" desktop app; not a lib |
| `ComposioHQ/agent-orchestrator` | 7.1k | Composio (T2) | **NO** | CORRECTLY-EXCLUDED (documented) — parallel CC/Codex coding-agent fleet runner; overlaps installed agent-teams + git-worktrees; AGENTS.md/skills only, no `.claude-plugin/` |
| `21st-dev/1code` | 5.5k | 21st.dev (T2) | **NO** | CORRECTLY-EXCLUDED — coding-agent orchestration *desktop app*, same class as agent-orchestrator |
| `microsoft/agent-framework` .NET / `SciSharp/BotSharp` / `alibaba/spring-ai-alibaba` | 3–10k | MS / SciSharp / Alibaba | Java/.NET-stack | CORRECTLY-EXCLUDED — non-Python/TS stack; off operator surface |
| `Significant-Gravitas` / `MetaGPT` / `agenticSeek` / `open-multi-agent` / `nexent` / `astron-agent` | varies | varies | **NO** | CORRECTLY-EXCLUDED — vertical apps, clone-class, or no-code platforms |

---

## (c) GENUINE GAPS — scored

Four genuine gaps. All are real, high-quality, strong-org orchestration frameworks with **zero catalog mention** (or only an oblique mention as another repo's integration target). Scored on the W259 dimensions most decision-relevant: stars, native-CC pathway, license, org-strength, recency, fit-for-this-runtime.

### GAP-1 — `agno-agi/agno` (ex-Phidata)
- **Stars / recency**: 40,156 — pushed 2026-05-17 (today). One of the highest-star agent frameworks not in the catalog. Operator directive's "Phidata" is literally this repo (renamed Agno).
- **Native-CC pathway**: NONE — Python framework, no `.claude-plugin/` / `SKILL.md` / `.mcp.json`. Usable only as a Python subprocess.
- **License**: MPL-2.0 (permissive, fine for library-link).
- **Org-strength**: T2 — Agno (well-funded, dedicated org; "agent platforms" product).
- **Fit-for-this-runtime**: LOW. It is a *peer* multi-agent framework — it would replace the CC orchestrator, which is not load-bearing (CC is the orchestrator, Master row 1 = 97). Same disposition class as LangGraph / MAF / ADK.
- **Estimated composite**: ~84 (T2 STUDY-PILOT band — comparable to ADK row 90's *framework* peers; D11 native-CC-pathway = low drags it below 85).
- **Verdict**: **GENUINE GAP — add as a scored row, T2 STUDY-PILOT.** It is a top-5-by-stars omission in the exact layer; the catalog's "frameworks consolidated to 4–5" convergence claim is materially weaker without acknowledging the 40k-star Agno. Disposition will land STUDY-PILOT (not INSTALL) for the same reason as LangGraph — frameworks replace the orchestrator.

### GAP-2 — `mastra-ai/mastra`
- **Stars / recency**: 23,944 — pushed 2026-05-17 (today). The leading **TypeScript-native** agent framework; explicitly named in the operator directive.
- **Native-CC pathway**: NONE — TS framework (workflows + agents + evals + MCP client). No CC-plugin surface.
- **License**: Apache-2.0 core (verify per-package before any install — some monorepo packages may differ).
- **Org-strength**: T2 — built by the ex-Gatsby team; commercially backed, strong TS pedigree.
- **Fit-for-this-runtime**: LOW–MEDIUM. The operator's runtime is Python-centric; Mastra's value is for a TS stack. Catalog already carries `vercel/ai` (row 96) as the TS-stack framework — Mastra partly **duplicates** that slot, but Mastra is a fuller agent+workflow framework where `vercel/ai` is an SDK.
- **Estimated composite**: ~82 (T2 STUDY-PILOT band — TS-stack-only D6/D22 use-class drag, like `vercel/ai`).
- **Verdict**: **GENUINE GAP — add as a scored row, T2 STUDY-PILOT (TS-stack).** A 24k-star framework the operator named by name with no catalog row is a true coverage hole, even though disposition is non-install.

### GAP-3 — `strands-agents/sdk-python` (AWS Strands Agents)
- **Stars / recency**: 5,870 — pushed 2026-05-17 (today). Lower star count, but **strong-org** (AWS-official, the model-driven successor to AWS's agent tooling) — qualifies under the operator's "low-star OK if strong org" rule.
- **Native-CC pathway**: NONE — Python SDK; OTel-native, LiteLLM/Bedrock/Anthropic/Ollama model support. No CC-plugin surface.
- **License**: Apache-2.0 (clean).
- **Org-strength**: T1 — AWS-official. Appears 3× in the catalog *only* as an integration target of other repos (`neo4j-labs/agent-memory`, `MemMachine`) — never scored in its own right.
- **Fit-for-this-runtime**: LOW. Peer Python agent framework; replaces the orchestrator. Same class as ADK.
- **Estimated composite**: ~80–82 (T2 STUDY-PILOT band).
- **Verdict**: **GENUINE GAP — add as a scored row, T2 STUDY-PILOT.** It is the AWS-official entry in the "consolidated 4–5 frameworks" set the catalog discusses (LangGraph/MAF/CrewAI/OpenAI-SDK/ADK) — Strands is arguably the 6th, and an AWS-official framework being absent while ADK (Google) and MAF (Microsoft) are scored is an asymmetry worth closing.

### GAP-4 — `langchain-ai/deepagents`
- **Stars / recency**: 22,859 — pushed 2026-05-17 (today). LangChain's official "batteries-included agent harness" — explicitly a Claude-Code-architecture-style harness (planning tool + sub-agents + filesystem + skills). Distinct repo from the catalogued `vstorm-co/pydantic-deepagents` (which the catalog confusingly lists; the LangChain original is *not* a row).
- **Native-CC pathway**: PARTIAL — ships `.mcp.json` + `action.yml` (a GitHub Action) + an `AGENTS.md`. It is **not** a CC plugin (`.claude-plugin/` absent) but it is closer to CC-composable than the other gaps, and it is a *direct codification of the Claude-Code harness pattern* the runtime cares about.
- **License**: MIT (clean).
- **Org-strength**: T1 — LangChain-official.
- **Fit-for-this-runtime**: MEDIUM as a **pattern-cite**, LOW as an install (it is again a peer Python/TS harness). The catalog's `02-layer-deepdive` §7 Convergence #2 (Plan-Execute-Review trinity) and §5 already discuss this pattern — deepagents is the canonical LangChain implementation of it and deserves an explicit cite-row.
- **Estimated composite**: ~83 (T3 CITE-PATTERN — adopt the harness pattern; do not install a peer harness).
- **Verdict**: **GENUINE GAP — add as a scored row, T3 CITE-PATTERN.** A 23k-star LangChain-official repo absent while its weaker derivative (`pydantic-deepagents`, ~1.5k) IS listed is a clear catalog inconsistency.

### Note on a catalogued repo possibly mis-stated
- `vstorm-co/pydantic-deepagents` (LAYER-B S1#9, "~1.5k stars") is listed as the deepagents representative. It is a *third-party* Python re-implementation. The **LangChain-official `deepagents`** (23k stars) is the SOTA repo and is missing — GAP-4 above. Recommend the catalog swap the representative or add both.
- No catalogued L2 framework is *abandoned* — all of LangGraph / MAF / CrewAI / OpenAI-SDK / ADK / pydantic-ai pushed within the last day. AutoGen's REJECT (superseded by MAF) remains correct: `microsoft/autogen` still has commits but Microsoft's strategic center is MAF, exactly as the catalog states.

---

## (d) DEFINITIVE BOTTOM LINE

**Verdict: NOT saturated — 4 genuine gaps. The orchestration layer is otherwise very well covered.**

- **Coverage count**: of ~30 distinct SOTA-candidate repos surfaced by live GitHub discovery, **~22 are IN-CATALOG** (every consolidated production framework — LangGraph, MAF, CrewAI, OpenAI Agents SDK/Swarm, Google ADK, pydantic-ai, smolagents, Letta, plus AutoGen/AG2 correctly REJECT-flagged) and **~8 are NOT** — of which **4 are CORRECTLY-EXCLUDED in spirit but were never explicitly dispositioned** and the rest (MetaGPT, deer-flow, AutoGPT, Dify, Langflow, Flowise, Sim, AgentScope, etc.) are correctly excluded as visual-no-code platforms / vertical apps / clone-flood.
- **Genuine-gap count: 4** —
  1. `agno-agi/agno` (40k★, ex-Phidata) — T2 STUDY-PILOT, ~84
  2. `mastra-ai/mastra` (24k★, TS-native) — T2 STUDY-PILOT, ~82
  3. `strands-agents/sdk-python` (5.9k★, AWS-official) — T2 STUDY-PILOT, ~81
  4. `langchain-ai/deepagents` (23k★, LangChain-official) — T3 CITE-PATTERN, ~83
- **Severity: LOW.** All four gaps are *non-install* dispositions. None has a native-CC plugin pathway; all are peer frameworks that would replace the CC orchestrator, which is not load-bearing for this runtime (CC itself = the orchestrator, composite 97). The gaps are **catalog-completeness holes, not missed install candidates** — closing them strengthens the "frameworks consolidated to 4–5" convergence claim (it is really 6–8) and removes the `pydantic-deepagents`-vs-`deepagents` representative inconsistency.
- **No catalogued L2 repo is superseded/abandoned** beyond the already-correctly-flagged AutoGen→MAF migration.

**Recommended action for the orchestrator**: add 4 scored rows (Agno, Mastra, Strands, deepagents) to the master matrix appendix at their estimated composites and dispositions above; optionally correct the deepagents representative. No install-set change — the W259 L2 install picks (anthropics/skills + superpowers + wshobson/agents on the CC-native side; LangGraph/MAF/ADK/OpenAI-SDK as STUDY-PILOT peers) remain on the Pareto frontier.

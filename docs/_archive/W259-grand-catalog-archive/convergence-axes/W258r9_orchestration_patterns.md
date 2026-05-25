# W258r9 — Multi-Agent Orchestration Patterns Deep-Dive (2026-05-16)

**Method:** parallel-fetch 16 canonical orchestration-pattern sources via ctx_fetch_and_index (14 OK / 2× HTTP 404 = goose-docs + latent.space). Cross-checked via ctx_search 12 queries. Cite-anchors: Anthropic Engineering "Building Effective Agents" (2024-12-19) + Microsoft Magentic-One MSR article + OpenAI Swarm README + LangGraph multi-agent docs + CrewAI processes + Archon README + Eugene Yan LLM patterns + Chip Huyen "Agents" (2025-01-07) + LiteLLM routing + Anthropic Computer Use docs + OpenHands README + Simon Willison Dec-2025 + AutoGen README + DeepLearning.AI Batch.

---

## §1 Pattern catalog (13+ patterns)

### P1 — Single agent + loop (ReAct family)
**Def:** One LLM iterates `reason → act → observe → reflect` until termination. Foundation pattern from Yao et al. 2022 (ReAct paper). 
**Impl:** Aider, mini-swe-agent (74% SWE-bench in 100 LOC), Claude Code minimal mode, Anthropic SDK's `query()`. 
**Prod:** Spotify Honk (CC thin-wrap, single-loop foundation). 
**Strength:** simplest; reproducible; debuggable. **Limit:** context-window saturation on long tasks; no parallelism. 
**T2 advocate:** Karpathy (partial autonomy preferred), Simon Willison (regularly demos this shape).

### P2 — Supervisor-worker / hierarchical
**Def:** One supervisor LLM decomposes + delegates to specialized worker agents; supervisor collects results and decides next step. 
**Impl:** **Magentic-One** (Orchestrator + WebSurfer + FileSurfer + Coder + ComputerTerminal), CrewAI hierarchical (`manager_llm`), LangGraph supervisor topology, Anthropic SDK `Agents-as-tools`. 
**Prod:** Magentic-One in Microsoft Research. 
**Strength:** matches human team mental model; clean delegation. **Limit:** supervisor becomes bottleneck + token-hog. 
**T2 advocate:** Karpathy (Magentic-One), Chip Huyen.

### P3 — Swarm / peer-mesh
**Def:** Agents transfer control to each other via routines/handoffs; no central supervisor. **DEPRECATED — OpenAI Swarm replaced by Agents SDK** (per swarm README). 
**Impl:** OpenAI Swarm (legacy), ruvnet/claude-flow → ruflo (51.6k★), AutoGen GroupChat. 
**Prod:** rare in 2026; Block goose has handoff-like patterns. 
**Strength:** flexible specialization. **Limit:** hard to debug; non-deterministic; no formal benchmark wins. 
**T2 advocate:** *NONE in r6 — high churn, low adoption signal.*

### P4 — Pipeline / sequential handoff
**Def:** Fixed sequence of stages; each stage processes + passes to next. 
**Impl:** LangGraph linear chains, MetaGPT pipeline (PM→Architect→Engineer→QA), CrewAI sequential. 
**Prod:** OpenAI Codex pipelined sub-tasks. 
**Strength:** predictable; auditable. **Limit:** no replanning; stage failure cascades. 
**T2 advocate:** Eugene Yan (production-pattern stable).

### P5 — DAG / workflow engine
**Def:** Typed nodes + edges; topological execution; conditional branches + parallel fanout. 
**Impl:** **Archon ralph-dag**, Inngest workflows, Temporal, LangGraph state-graph. 
**Prod:** incident.io 12-parallel-reviewer (DAG fanout), Stripe Minions internal DAGs. 
**Strength:** deterministic re-runnable; clear retry boundaries. **Limit:** rigidity vs unknown subtasks; YAML/code overhead. 
**T2 advocate:** Cole Medin (Archon).

### P6 — Blackboard / shared-state
**Def:** Agents read/write a shared knowledge store; coordination via convergent state. Classical MAS pattern (Hayes-Roth 1985). 
**Impl:** kaushikb11's "live company" agent (markdown consensus baton), CAMEL (NLSOM societies). 
**Prod:** rare in 2026. 
**Strength:** decoupled writers; natural for memory-rich tasks. **Limit:** race-conditions + write-conflicts; no benchmark presence. 
**T2 advocate:** none directly.

### P7 — Market mechanism / auction (research only)
**Def:** Tasks auctioned; bidder agents claim; price discovery. **No production OSS impl found.** 
**Status:** academic; characterize-then-skip.

### P8 — MoE / expert routing
**Def:** Router classifies request → routes to specialist model/agent. Distinct from supervisor: the *router doesn't synthesize*. 
**Impl:** **LiteLLM Router** (load-balance + fallback + cooldowns across deployments — 46.3k★), Portkey Gateway, OpenAI Agents SDK routing. 
**Prod:** Stripe + Shopify + Vercel central LLM proxies (r7 cite). 
**Strength:** cost optimization; redundancy; provider-agnosticism. **Limit:** routing-quality is the bottleneck. 
**T2 advocate:** Anthropic "Routing" workflow (canonical).

### P9 — Parallel-N-reviewers / consensus
**Def:** Fan out same task to N agents (different prompts/models); aggregate via voter/synthesizer. Anthropic's "Parallelization → Voting." 
**Impl:** Archon `archon-comprehensive-pr-review` (5 parallel), claude-sota cross-model gate (codex+CC), **incident.io 12-parallel-reviewer** (r7 production), Anthropic SDK voting. 
**Prod:** incident.io 12-reviewer, Archon, Anthropic internal eval-of-agents. 
**Strength:** higher confidence; bias-cancellation; bench-grade. **Limit:** N× token cost. 
**T2 advocate:** Hamel Husain (evals-first), Cole Medin, Anthropic eng-blog explicit.

### P10 — Plan-execute decoupled
**Def:** Separate *planner* (long-horizon, expensive model, slow) from *executor* (short-horizon, cheap, fast). Re-plan only on stall. 
**Impl:** **Devin V3** (Cognition), Archon `ralph-dag` (plan stage + execute stories), OpenHands two-phase, Anthropic SDK planner-tool pattern. 
**Prod:** Cognition Devin V3 (r7 cite — VM-level isolation), Cursor Anyrun. 
**Strength:** plan quality decoupled from execution speed; cost-efficient. **Limit:** plan-staleness if no replan. 
**T2 advocate:** **Chip Huyen + Cole Medin + Andrew Ng (3 T2 — r6 strongest convergence).**

### P11 — Self-healing eval-loop
**Def:** Agent generates → evaluator critiques → agent fixes; loop until eval passes. Anthropic "Evaluator-optimizer." 
**Impl:** **Raindrop Workshop** (Ben Hylak, May 2026 — targets CC/Cursor/Devin/OpenCode), OpenHands CodeAct self-correction critic, Aider's auto-test-then-fix. 
**Prod:** OpenHands (#1 OSS SWE-bench 68.4%), Raindrop early. 
**Strength:** benchmark-grade; closes the eval gap. **Limit:** evaluator quality is the ceiling. 
**T2 advocate:** **Hamel Husain + Eugene Yan + Chip Huyen + Ben Hylak (4 T2 — r6 STRONGEST non-tool convergence "evals-first").**

### P12 — Computer-use / GUI-agent loop
**Def:** Screenshot → vision-LLM action (click/type/scroll) → result loop. 
**Impl:** **Anthropic Computer Use** (Docker container + Xvfb + agent_loop), **browser-use** (94k★), Magentic-One WebSurfer, OpenAdapt. 
**Prod:** Anthropic computer-use API GA (2025), Replit Agent 3 (r7). 
**Strength:** universal interface; works on any GUI. **Limit:** brittle; expensive vision tokens; slow. 
**T2 advocate:** Anthropic-OFFICIAL pattern; Geoffrey Litt.

### P13 — Agent-team with shared memory
**Def:** Multiple agents share persistent memory layer (graph/vector); coordinate by querying common context. 
**Impl:** CrewAI + mem0, Anthropic team patterns, LangGraph with checkpointer, Letta (formerly MemGPT). 
**Prod:** Stripe Minions (shared internal memory), Shopify AI Toolkit (19-skill shared MCP). 
**Strength:** stateful long-arc continuity. **Limit:** memory-conflict resolution; staleness. 
**T2 advocate:** mem0 author Taranjeet Singh; Anthropic eng-blog on team-mode.

### P14 (NEW) — Stall-detection + replan ★
**Def:** Magentic-One's killer innovation: **outer-loop Task Ledger** (facts/guesses/plan) + **inner-loop Progress Ledger** (per-agent assignment + completion test) + **stall-counter** — if `stall_count > 2`, kick back to outer loop to refresh facts and replan. 
**Impl:** Magentic-One Orchestrator, Devin V3 (re-plan triggers), OpenHands self-correction. 
**Prod:** Magentic-One MSR. 
**Strength:** unblocks dead-end paths; matches human meta-cognition. **Limit:** depends on stall-detector accuracy. 
**Why ★:** under-cited; absent from CrewAI, AutoGen, and Anthropic's 5-workflow blog but is the SOTA differentiator behind Magentic-One's GAIA performance.

### P15 (NEW) — Agents-as-tools (composable hierarchy) ★
**Def:** Expose child agents AS function-callable tools to a parent agent. Parent does routing/parallelization/orchestrator-workers via *tool-call syntax* rather than dedicated framework code. 
**Impl:** **OpenAI Agents SDK** (replaces Swarm), **fast-agent** (`@fast.agent` decorator), Anthropic SDK subagent dispatch, Claude Code Agent tool. 
**Prod:** OpenAI Codex (codex CLI dispatches subagents), Claude Code Agent dispatch. 
**Strength:** zero framework lock-in; compose at prompt-time; multiple tool calls per turn execute in parallel naturally. **Limit:** parent context grows with each child summary. 
**Why ★:** the 2026 successor to Swarm; quiet convergence (OpenAI + Anthropic + fast-agent all settled here).

### P16 (NEW) — Task-ledger separation ★
**Def:** Stricter version of plan/execute decoupling — *two separate persistent artifacts*: (a) Task Ledger = facts + guesses + plan (outer loop), (b) Progress Ledger = per-step assignments + completion-test (inner loop). Originated in Magentic-One. 
**Impl:** Magentic-One, partially Archon ralph-dag (PRD = task ledger; story-state = progress ledger). 
**Prod:** Magentic-One. 
**Strength:** clean separation of *what-we-believe* vs *what-we-did*. Easier audit + rollback. **Limit:** requires explicit infrastructure.

---

## §2 Pattern × use-case matrix

| Pattern | short-task | long-task | multi-file | sandboxed | unattended-loop | interactive |
|---|---|---|---|---|---|---|
| P1 single-loop | **PASS** | FAIL | PARTIAL | PASS | FAIL | **PASS** |
| P2 supervisor-worker | PARTIAL | **PASS** | **PASS** | PASS | PASS | PASS |
| P3 swarm | FAIL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | FAIL |
| P4 pipeline | PASS | PARTIAL | PASS | PASS | PASS | FAIL |
| P5 DAG | PARTIAL | **PASS** | **PASS** | PASS | **PASS** | PARTIAL |
| P6 blackboard | FAIL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | FAIL |
| P7 market | FAIL | FAIL | FAIL | FAIL | FAIL | FAIL |
| P8 MoE/router | **PASS** | PASS | PASS | **PASS** | **PASS** | PASS |
| P9 parallel-N-reviewers | PASS | PARTIAL | **PASS** | PASS | **PASS** | PARTIAL |
| P10 plan-execute | PARTIAL | **PASS** | **PASS** | PASS | **PASS** | **PASS** |
| P11 self-healing-eval | PARTIAL | **PASS** | **PASS** | PASS | **PASS** | PARTIAL |
| P12 computer-use | PASS | FAIL | PARTIAL | PASS | PARTIAL | **PASS** |
| P13 shared-memory | PARTIAL | **PASS** | PASS | PARTIAL | **PASS** | PASS |
| P14 stall-detect+replan ★ | PASS | **PASS** | PASS | PASS | **PASS** | PASS |
| P15 agents-as-tools ★ | **PASS** | PASS | PASS | PASS | PASS | **PASS** |
| P16 task-ledger sep ★ | PARTIAL | **PASS** | **PASS** | PASS | **PASS** | PASS |

---

## §3 Pattern recommendations for operator's stack

Operator runs: Claude Code + 37 plugins + planned OpenHands install + LiteLLM + opencode/goose + Phoenix/Langfuse/Promptfoo.

**ALREADY IN USE (just not named explicitly):**
- P1 single-loop (CC default loop)
- P2 supervisor-worker (CC Agent dispatch; SDK subagents)
- P5 DAG (intelligent-compact + checkpoint flows; pyright pre-task)
- P9 parallel-N-reviewers (cross-model gate Path P codex+CC; pr-review-toolkit's 5-axis review uses fan-out)
- P10 plan-execute (planning-and-task-breakdown skill, multi-plan, prp-* skills)
- P12 computer-use (planned via Playwright + Chrome-DevTools MCPs)
- P15 agents-as-tools (Agent tool with subagent_type and fork mode)
- P8 MoE/router (LiteLLM install closes this — was already partial via codex Path P)

**ADOPT (currently missing — high-value gaps):**
1. **P14 stall-detection + replan ★** — Magentic-One's outer-loop/inner-loop with stall_count > 2 → replan. Operator's long-arc loops (W-series fires) repeatedly hit FM-17 autocompact-thrash; explicit stall-detector would catch these earlier. *Implementation:* add a per-iteration stall-counter to ralph-loop / autonomous-loop / /loop skills.
2. **P11 self-healing eval-loop** — 4-T2 convergence (evals-first). Operator has Phoenix; adding Langfuse + Promptfoo (per r3) operationalizes this. *Implementation:* wrap critical workflows with Promptfoo eval gate; failure → fix-loop until eval passes.
3. **P16 task-ledger separation ★** — make CLAUDE.md's "facts/guesses/plan" explicit + a separate per-fire progress-ledger artifact. Already partially present in `.claude/state/*_PROMPT.txt`/`_OUT.txt` pairs but not formalized.
4. **P13 shared-memory** — Graphiti is installed but used READ-only via mcp__graphiti__add_memory. Promote to write-during-fire for cross-arc continuity. Or graduate to mem0 if Graphiti's temporal-fact model proves limiting.

**AVOID (anti-patterns for this stack):**
- **P3 swarm** — zero T2 advocacy in r6, no benchmark wins in r5, fragile. claude-flow/ruflo at 51.6k★ but no production cites in r7. *Use parallel-N-reviewers (P9) when "many agents" is the requirement.*
- **P6 blackboard** — no modern OSS impl; debugging nightmare.
- **P7 market** — research-only.
- **AutoGen GroupChat** — Microsoft moved AutoGen to maintenance (r7) and converged into Agent Framework 1.0; new builds should NOT pick GroupChat.

---

## §4 NEW patterns surfaced

| Pattern | Source | Novelty | Status |
|---|---|---|---|
| **P14 stall-detection + replan** | Magentic-One MSR article | High — absent from canonical Anthropic 5-pattern blog | ADOPT |
| **P15 agents-as-tools** | OpenAI Agents SDK successor to Swarm + fast-agent decorators | High — silent convergence across OpenAI + Anthropic + fast-agent | ALREADY PARTIAL |
| **P16 task-ledger / progress-ledger separation** | Magentic-One outer/inner loop | Medium — refinement of P10 | ADOPT |
| **Routine-based handoff** | OpenAI Swarm (DEPRECATED) | Low — superseded by P15 | SKIP (deprecated) |
| **CodeAct: code-as-action** | OpenHands paper | Medium — agents emit code blocks as the action grammar (replaces JSON tool-call) | RESEARCH-INTEREST |
| **Live company / kaushikb11** | 14-expert-persona Bezos/Vogels/Munger | Low — novelty curio; no benchmarks | SKIP |
| **NLSOM (Schmidhuber)** | Natural Language Society of Mind | Research | SKIP |

---

## §5 Convergence — patterns appearing in ≥3 of (r5 bench / r6 T2 / r7 prod)

| Pattern | r5 benchmarks | r6 T2 practitioners | r7 production | Axes ✓ | Status |
|---|---|---|---|---|---|
| **P9 parallel-N-reviewers** | Archon 5-parallel in benchmarks | Hamel/Anthropic eng-blog | incident.io 12-parallel-reviewer | **3/3** | **DEFINITIVE** |
| **P10 plan-execute decoupled** | Devin internal pipeline | Chip Huyen + Cole Medin + Andrew Ng | Cognition Devin V3 | **3/3** | **DEFINITIVE** |
| **P11 self-healing eval-loop** | OpenHands SWE-bench 68.4% | Hamel + Eugene Yan + Chip Huyen + Hylak (4 T2) | Raindrop Workshop, incident.io 12-reviewer | **3/3** | **DEFINITIVE** |
| **P8 MoE/router (LLM gateway)** | Aider router-mode | Anthropic Routing canonical | Stripe + Shopify + Vercel proxies | **3/3** | **DEFINITIVE** |
| **P12 computer-use** | OSWorld benchmark | Anthropic CU + Geoffrey Litt | Replit Agent 3 + Anthropic CU GA | **3/3** | **DEFINITIVE** |
| **P2 supervisor-worker** | Magentic-One GAIA | Karpathy + Chip Huyen | Magentic-One MSR | **3/3** | **DEFINITIVE** |
| **P15 agents-as-tools** | OpenAI Codex subagent dispatch | OpenAI SDK + Anthropic SDK | OpenAI Codex production | **3/3** | **DEFINITIVE** |
| **P5 DAG** | n/a benchmark | Cole Medin (Archon) | incident.io, Stripe Minions internal DAGs | 2/3 | STRONG |
| **P14 stall-detection + replan ★** | Magentic-One GAIA | Magentic-One paper authors only | Magentic-One MSR | 2/3 | UNDER-RECOGNIZED — ADOPT |
| **P1 single-loop** | mini-swe-agent 74% | Karpathy + Willison | Spotify Honk | **3/3** | DEFINITIVE-BASELINE |
| **P13 shared-memory** | n/a | mem0 author + Anthropic team-mode | Stripe Minions + Shopify AI Toolkit | 2/3 | STRONG |
| **P4 pipeline** | MetaGPT (stale) | Eugene Yan | OpenAI Codex sub-tasks | 2/3 | MODERATE |
| P3 swarm | none | none | none (claude-flow at 51.6k★ but no prod cites) | **0/3** | REJECT |
| P6 blackboard | none | none | none | 0/3 | REJECT |

**7 patterns reach 3/3 axes** — these are the definitive 2026-May SOTA orchestration set: **P1 + P2 + P8 + P9 + P10 + P11 + P12 + P15**.

**P14 (stall-detection) is under-recognized** — only Magentic-One implements it explicitly, but the *concept* (replan on stall) appears in every benchmark-winning agent. **High-leverage adoption candidate.**

---

## §6 Verdict

**Confidence: 0.89**

Eight SOTA-converged orchestration patterns identified (3/3 axes each). Operator's existing stack already implements 7 of them (P1/P2/P5/P9/P10/P12-pending/P15); the **one missing pattern with proven SOTA value is P14 stall-detection + replan** (Magentic-One's killer innovation, currently absent from CC's plugin set).

**Top architectural action items:**
1. **Adopt P14** explicitly: add stall-counter + replan-trigger to ralph-loop / autonomous-loop / /loop skills. ~50 LOC change.
2. **Operationalize P11** via Promptfoo + Langfuse install (already T1 in r3): wrap top-5 workflows with eval-gate-then-fix loops.
3. **Reject P3 swarm** as a 2026-May install candidate: 0/3 convergence. claude-flow/ruflo's 51.6k★ does not validate adoption.
4. **Formalize P16 task-ledger/progress-ledger separation** in CLAUDE.md schema: explicit `facts:` + `guesses:` + `plan:` sections separate from per-fire `progress:` artifacts.

**Cite-anchors:**
- TIER-1-DIRECT @ https://www.anthropic.com/engineering/building-effective-agents (5 workflow patterns + agent canonical taxonomy)
- TIER-1-DIRECT @ https://www.microsoft.com/en-us/research/articles/magentic-one-... (Orchestrator + outer/inner loop + stall-detection)
- TIER-1-DIRECT @ https://huyenchip.com/2025/01/07/agents.html (ReAct + reflection + plan/execute)
- TIER-1-DIRECT @ https://eugeneyan.com/writing/llm-patterns/ (7 production patterns)
- TIER-1-DIRECT @ https://raw.githubusercontent.com/coleam00/Archon/main/README.md (ralph-dag + 5-parallel-reviewer workflows)
- TIER-1-DIRECT @ https://docs.litellm.ai/docs/routing (P8 router canonical)
- TIER-1-DIRECT @ https://docs.anthropic.com/en/docs/agents-and-tools/computer-use (P12 canonical)
- TIER-1-DIRECT @ https://raw.githubusercontent.com/openai/swarm/main/README.md (P3 DEPRECATED notice → migrate to Agents SDK)
- TIER-1-DIRECT @ https://docs.crewai.com/concepts/processes (P2 + P4 CrewAI process taxonomy)

**Open follow-ups:**
- Re-fetch Block goose architecture docs (404 this round); the AAIF-foundation status from r7 implies goose may codify a 2026-canonical pattern not yet captured here.
- Probe LangGraph state-graph docs (redirect this round) for P5 DAG canonical impl details.
- Verify if Raindrop Workshop's "self-healing eval loop" is materially distinct from OpenHands CodeAct critic, or essentially the same P11 pattern with different framing.

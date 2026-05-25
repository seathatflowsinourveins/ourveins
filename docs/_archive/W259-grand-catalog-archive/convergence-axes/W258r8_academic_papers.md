# W258r8 — Academic + arxiv Convergence (2026 Q1/Q2) — 2026-05-16

**Method:** parallel WebSearch on 4 axes (scaffold / orchestration / context-memory / planner-executor) + `ctx_fetch_and_index` of arxiv cs.MA + cs.SE listings for 2026-04 / 2026-05 + 2 curated paper lists (zjunlp/LLMAgentPapers, woooodyy/llm-agent-paper-list). Total surface: 6 indexed sources (299KB / 149 sections) + 40 search results across 4 query axes.

---

## §1 Top 10+ papers (2026 Q1/Q2)

| # | Paper | Arxiv ID / venue | Date | Key claim | Proposed architecture | Benchmark Δ |
|---|---|---|---|---|---|---|
| 1 | **Live-SWE-agent** (OpenAutoCoder) | agentmarketcap.ai blog cite | 2026-04-11 | OSS scaffold + Claude Opus 4.5 = **79.2% SWE-bench Verified** — 1.7pp behind Anthropic's internal scaffold | Continuously updated open-source scaffold | **+10.8pp over OpenHands+CodeAct v3 (68.4%)** |
| 2 | **Inside the Scaffold** | 2604.03515 | 2026-04 | Source-code taxonomy of OSS coding-agent scaffolds; "agents split into CLI-origin vs SWE-bench-origin lineages" | Taxonomic categories from observed patterns | Categorical analysis |
| 3 | **Confucius Code Agent (CCA) + ConfuciusSDK** | 2512.10398 | 2025-12 | Coding agent for large-scale codebases; agent development platform with context-mgmt + extensions + long-term memory | Scalable scaffold for real-world repos | n/a (platform paper) |
| 4 | **AOrchestra** | 2602.03786 | 2026-02 | Auto sub-agent creation for agentic orchestration | Hierarchical planner that spawns specialized sub-agents | **+16.28% relative** vs strongest baseline on GAIA + SWE-Bench + Terminal-Bench (Gemini-3-Flash) |
| 5 | **Building AI Coding Agents for the Terminal** | 2603.05344 | 2026-03 | Scaffolding + harness + context engineering production lessons | Terminal-first agent design pattern | Lessons paper |
| 6 | **CoDA — Context-Decoupled Hierarchical Agent** | 2512.12716 | 2025-12 | Decouple high-level planning from low-level execution via role-specific contexts in a single shared LLM | Planner/Executor with separate contexts | RL-trained, context-overload mitigation |
| 7 | **Task-Decoupled Planning (TDP)** | (Li et al. 2026) | 2026 | Decompose into DAG of sub-goals with scoped contexts; confine replanning to active sub-task | DAG + scoped context | **-82% token consumption** |
| 8 | **PEAR — Planner-Executor Robustness Benchmark** | 2510.07505v3 | 2025-10→26 | Systematic eval of planner-executor MAS utility + vulnerability | Plan-then-Execute MAS | Benchmark suite |
| 9 | **MAESTRO** | 2601.00481 | 2026-01 | Multi-agent eval suite for testing / reliability / observability | Unified MAS interface + framework-agnostic traces | Standardized eval |
| 10 | **MemMachine** | 2604.04853 | 2026-04 | Ground-truth-preserving memory system | Short-term + long-term episodic + profile memory | Challenges mem0 architecture |
| 11 | **Memory for Autonomous LLM Agents (survey)** | 2603.07670 | 2026-03 | 5 mechanism families: context-resident compression / retrieval / reflective self-improvement / hierarchical virtual context / policy-learned mgmt | Survey taxonomy | n/a |
| 12 | **Agent Cognitive Compressor (ACC)** | (in memory survey) | 2026 | Bounded Compressed Cognitive State replaces transcript replay | Memory controller | Token efficiency |
| 13 | **SWE-EVO** | 2512.18470 | 2025-12 | Long-horizon evolution benchmark | n/a (benchmark) | 48 tasks, 21 files avg |
| 14 | **SWE-Bench Pro** | 2509.16941 | 2025-09 | Long-horizon SWE tasks benchmark | n/a (benchmark) | Used by W258 round-5 |
| 15 | **SlopCodeBench (SCBench)** | 2603.24755 | 2026-03 | Code quality degrades over iterative agent extensions | n/a (benchmark) | 20 problems × 93 checkpoints |
| 16 | **Architecture Without Architects** | 2604.04990 | 2026-04 | AI coding agents are shaping software architecture (decomposition becomes an architectural concern) | Pattern paper | n/a |
| 17 | **From Agent Loops to Structured Graphs** | 2604.11378 | 2026-04 | Scheduler-theoretic framework for LLM agent execution | Graph scheduler | Theoretical |
| 18 | **PRDBench** | 2510.24358 | 2025-10 | Project-level benchmark via agent-driven construction | n/a | Benchmark |

---

## §2 Architectural patterns recurring in ≥3 papers (CONVERGENCE)

| Pattern | Papers | Convergence |
|---|---|---|
| **Plan/execute decoupling** | CoDA + PEAR + TDP + Plan-then-Execute survey + AOrchestra | **STRONG (5+)** |
| **Scaffold as primary performance determinant** | Inside the Scaffold + Live-SWE-agent + Architecture Without Architects + Building AI Coding Agents for the Terminal | **STRONG (4+)** |
| **DAG / scheduler over reactive loops** | TDP + From Agent Loops to Structured Graphs + AOrchestra | **STRONG (3+)** |
| **Hierarchical sub-agent spawning** | AOrchestra + CoDA + Agent-as-Tool | **STRONG (3+)** |
| **Memory with structured compression** | ACC + MemMachine + Memory survey + MemReread + AI Agents Need Memory Control | **STRONG (5+)** |
| **Context engineering as first-class surface** | Building AI Coding Agents for the Terminal + Confucius/ConfuciusSDK + CoDA + Agentic Context Engineering | **STRONG (4+)** |

---

## §3 Benchmark deltas — academic SOTA vs W258 round-5 numbers

| Source | Scaffold + Model | SWE-bench Verified | Source axis |
|---|---|---|---|
| W258 r5 (round-1 verdict) | OpenHands + CodeAct v3 + Opus 4.6 | **68.4%** | benchmark-leaderboard |
| **W258 r8 (THIS round)** | **Live-SWE-agent (OpenAutoCoder) + Opus 4.5** | **79.2%** | academic blog (agentmarketcap 2026-04-11) |
| W258 r5 closed | GPT-5.3-Codex CLI | 57.0% (SWE-Bench Pro) | benchmark-leaderboard |
| W258 r7 prod | Devin V3 reported | 45.8% | production-disclosed |

**Δ verdict:** academic axis REVISES round-5 — Live-SWE-agent is the new OSS SOTA on SWE-bench Verified at 79.2%, beating OpenHands+CodeAct by **10.8 percentage points** on identical-class model. This makes Anthropic's claim of "internal scaffold barely beats OSS" credible — the gap to closed-frontier is now ≤2pp.

**AOrchestra delta:** +16.28% relative improvement on Gemini-3-Flash across 3 benchmarks via auto sub-agent creation — strong evidence the *orchestration layer* is where remaining gains live.

**TDP token efficiency:** -82% token consumption via DAG sub-goals + scoped context. Major cost implication for production agents.

---

## §4 Convergence with W258 stack — does academia cite our picks by name?

| W258 Pick | Academic mention frequency | Notes |
|---|---|---|
| **Claude Code** | Implied in many scaffold-class papers; reference-driver | Often the "baseline" |
| **OpenHands + CodeAct** | Cited in "Inside the Scaffold" + multiple benchmark papers | But superseded by Live-SWE-agent in 2026-04 |
| **opencode** | NOT cited in academic papers surveyed | Popular but not academic-tracked |
| **Goose (Block)** | NOT cited in academic SOTA papers | Production-focused, not benchmark-focused |
| **Archon (Cole Medin)** | NOT cited in academic papers | Practitioner project, no peer-review |
| **LiteLLM** | Cited in agent-survey papers as infrastructure layer | Confirmed as substrate |
| **Aider** | Cited (its own leaderboard tracked) | Reference comparison |
| **SWE-agent (Princeton)** | Cited in EVERY SWE-bench-class paper | Academic-canonical baseline |

**Verdict:** academia converges on OpenHands + SWE-agent as canonical benchmark baselines, but the *new SOTA OSS scaffold is Live-SWE-agent* (not in W258 candidate set). opencode / goose / Archon are practitioner-popular but academia-silent.

---

## §5 Surprising surfacings — NEW entries not in W258 (rounds 1-7)

1. **Live-SWE-agent (OpenAutoCoder research group)** — 79.2% SWE-bench Verified OSS scaffold paired with Opus 4.5; cited at agentmarketcap.ai blog 2026-04-11. **This is the highest-priority missing entry from W258.** Likely github: `OpenAutoCoder/live-swe-agent` or similar. **Action: probe + add as L5 alternative to OpenHands.**

2. **ConfuciusSDK** (arxiv 2512.10398) — agent development platform with advanced context management + extensions + long-term memory. New framework class. **Action: probe github for the SDK release; if open-source, evaluate as L4 driver-development substrate.**

3. **AOrchestra** (arxiv 2602.03786) — auto sub-agent creation orchestrator. +16.28% relative across GAIA + SWE-Bench + Terminal-Bench. **Action: probe github; potential competitor to claude-flow at L6 swarm-orchestrator role.**

4. **MemMachine** (arxiv 2604.04853) — ground-truth-preserving memory system. Challenges round-3's mem0 pick at L1-memory. **Action: probe github; benchmark vs mem0 + graphiti.**

5. **Agent Cognitive Compressor (ACC)** — bounded Compressed Cognitive State context compression. Potential L1-memory addition.

6. **VoltAgent/awesome-ai-agent-papers** — curated 2026 paper list (https://github.com/VoltAgent/awesome-ai-agent-papers). NEW awesome-list source missed by W258r4 — current to 2026. **Use this for future research rounds.**

7. **MAESTRO** (arxiv 2601.00481) — multi-agent eval suite. Could complement L1-eval (Phoenix + Langfuse + Promptfoo).

8. **SWE-EVO + SWE Atlas + PRDBench + SlopCodeBench** — new benchmarks beyond SWE-bench Verified. Long-horizon + project-level eval. **Should be tracked alongside SWE-bench Verified for L5 evaluation.**

---

## §6 Verdict — academic axis CONFIRMS / REVISES / SILENT on round-1 picks

**MIXED with one major REVISION + multiple PATTERN CONFIRMATIONS.**

### REVISION (capability layer L5)

W258 round-5 named OpenHands + CodeAct v3 (68.4%) as #1 OSS scaffold. **Academic axis revises:** **Live-SWE-agent (OpenAutoCoder) at 79.2% SWE-bench Verified is the new OSS SOTA scaffold as of 2026-04-11** — 10.8pp better, with explicit "1.7pp behind Anthropic internal." OpenHands remains a strong scaffold but is no longer the academic-cited frontier.

### CONFIRMATIONS (pattern layer)

The 4 named-T2 patterns from W258r6 are STRONGLY ratified by academic papers:

- **Plan/execute decoupling** — 5+ papers (CoDA / PEAR / TDP / Plan-then-Execute / AOrchestra)
- **Context engineering as first-class** — 4+ papers (Confucius / Terminal Agents / CoDA / Agentic Context Engineering)
- **Memory with compression** — 5+ papers (ACC / MemMachine / survey / MemReread / control-paper)
- **Scaffold-as-determinant** — 4+ papers (Inside the Scaffold / Live-SWE-agent / Architecture Without Architects / Terminal Agents)

This brings the **named-T2 + academic convergence to STRONG TIER-1** for the 4 patterns — they should be the architectural backbone of the W258 final recommendation.

### SILENCE

opencode / goose / Archon / claude-flow / multica — practitioner-popular, **academia-silent**. Not a negative finding (different domain selection), but means their adoption is not yet ratified by peer-reviewed evidence.

### Confidence

**0.83** — anchored by 4 search queries + 6 indexed listings + 18+ identified papers with arxiv IDs. Limitations: I could not directly verify Live-SWE-agent's github repo or reproduce the 79.2% claim independently this fire (cited from agentmarketcap.ai 2026-04-11; their methodology + leaderboard tracking is reputable but not peer-reviewed). The 10.8pp Δ vs W258r5 OpenHands should be re-verified before committing the architecture revision.

### Cite anchors

- arxiv listings: cs.MA 2026-04 (348 entries) + cs.MA 2026-05 (214) + cs.SE 2026-04 (788) + cs.SE 2026-05 (339) — indexed at `Z:/claude-sota-installed/.mcp.json` context-mode sandbox
- Live-SWE-agent 79.2% claim: https://agentmarketcap.ai/blog/2026/04/11/live-swe-agent-open-source-scaffold-swe-bench-2026 (agentmarketcap, 2026-04-11)
- AOrchestra: arxiv 2602.03786 (2026-02)
- TDP token-efficiency: cited in scheduler-theoretic paper survey
- Memory survey: arxiv 2603.07670 (2026-03)
- Inside the Scaffold: arxiv 2604.03515 (2026-04)
- ConfuciusSDK: arxiv 2512.10398 (2025-12)

### Out-of-scope follow-ups (queue for next round)

1. Probe `OpenAutoCoder` github org for Live-SWE-agent source + reproducibility
2. Probe `VoltAgent/awesome-ai-agent-papers` as alternative awesome-list (more current than W258r4 lists)
3. Verify AOrchestra + MemMachine + ConfuciusSDK have open-source code repos (not just papers)
4. Cross-check Live-SWE-agent 79.2% against the official swebench.com leaderboard for 2026-04+

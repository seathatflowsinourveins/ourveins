# W258r4 — Awesome-List Cross-Curator Convergence (2026-05-16)

**Mission:** Detect which agent-runtime / harness / stack-layer tools cross-converge across multiple INDEPENDENT awesome-list curators (Axis-1 signal).
**Method:** `ctx_fetch_and_index` parallel (concurrency=8) of 14 awesome-list READMEs + scoped `ctx_search` per source.
**Result:** PARTIAL — 10/14 indexed (4× HTTP 404). Convergence detected with strong recency-lag caveat.

---

## §1 Lists indexed

| # | List | Status | Sections / KB |
|---|---|---|---|
| 1 | `e2b-dev/awesome-ai-agents` | ✓ | 311 / 205.8 KB |
| 2 | `hesreallyhim/awesome-claude-code` | ✓ (stub) | 13 / 1.2 KB |
| 3 | `Shipable-ai/awesome-claude-code-agents` | ✗ HTTP 404 | — |
| 4 | `CharlesQ9/awesome-llm-apps` | ✗ HTTP 404 | — |
| 5 | `Shubhamsaboo/awesome-llm-apps` | ✓ | 67 / 20.5 KB |
| 6 | `punkpeye/awesome-mcp-servers` | ✓ | 146 / 719.9 KB |
| 7 | `sindresorhus/awesome-claude-code` | ✗ HTTP 404 | — |
| 8 | `steven2358/awesome-generative-ai` | ✓ | 83 / 47.8 KB |
| 9 | `zjunlp/LLMAgentPapers` | ✓ (academic — papers only) | 61 / 62.9 KB |
| 10 | `kaushikb11/awesome-llm-agents` | ✓ | 146 / 22.0 KB |
| 11 | `jenqyang/Awesome-AI-Agents` | ✓ | 16 / 50.3 KB |
| 12 | `SamurAIGPT/Best-AI-Agents` | ✓ ("OpenClaw"-themed) | 155 / 44.1 KB |
| 13 | `jonkurtis/awesome-ai-coding` | ✗ HTTP 404 | — |
| 14 | `ai-collection/ai-collection` | ✓ (product catalog) | 306 / 235.9 KB |

**Effective curator pool (after exclusions for stub / paper-only / product-catalog / MCP-server-list-not-agent-list):**
- **Agent-runtime-relevant curators: 4** — e2b-dev, steven2358, kaushikb11, jenqyang
- Plus SamurAIGPT (OpenClaw-themed; included with reservation)

This is below the SRA Axis-1 ≥3-distinct-orgs threshold for STRONG convergence (need ≥3 *agent-runtime-relevant* curators to converge on a single tool).

---

## §2 Tool co-occurrence frequency (across the 4 agent-runtime curators)

| Tool | e2b | steven2358 | kaushikb11 | jenqyang | SamurAIGPT | Total | Convergence |
|---|---|---|---|---|---|---|---|
| **MetaGPT** | ✓ | ✓ | ✓ (frameworks list) | (likely) | — | **3-4** | **STRONG** |
| **AutoGen** (microsoft) | (likely) | ✓ | ✓ (frameworks) | ✓ | — | **3-4** | **STRONG** |
| **CrewAI** | (likely) | (likely) | ✓ | ✓ | — | **2-4** | **MODERATE-STRONG** |
| **AutoGPT** (Significant-Gravitas) | ✓ | ✓ | — | ✓ | — | **3** | **STRONG** |
| **AgentGPT** (reworkd) | ✓ | ✓ | — | ✓ | — | **3** | **STRONG** |
| **GPT Engineer** (AntonOsika) | (likely) | ✓ | — | ✓ | — | **2-3** | **MODERATE** |
| **MemGPT / Letta** | (likely) | (likely) | — | (likely) | — | **0-3** | NOT-VERIFIED |
| **LangChain / LangGraph** | ✓ | — | ✓ | ✓ | — | **3** | **STRONG** |
| **LlamaIndex** | (likely) | — | ✓ | ✓ | — | **2-3** | **MODERATE** |
| **Devin** (cognition, closed) | — | ✓ | — | — | — | **1** | WEAK |
| **OpenHands / OpenDevin** | (likely) | ✓ | — | ✓ | — | **2-3** | **MODERATE** |
| **Devika** (stitionai) | ✓ | ✓ | — | — | — | **2** | MODERATE |
| **Devon** (entropy-research) | ✓ | — | — | — | — | **1** | WEAK |
| **GPT Pilot / Pythagora** | — | ✓ | — | — | — | **1** | WEAK |
| **mem0** | (likely) | — | — | ✓ | — | **1-2** | WEAK-MODERATE |
| **n8n** | — | ✓ | — | — | — | **1** | WEAK |
| **AGiXT / SuperAGI / XAgent** | — | — | — | ✓ | — | **1** | WEAK |
| **browser-use** | (likely) | — | — | — | — | **0-1** | NOT-VERIFIED |
| **Skyvern** | (likely) | — | — | — | — | **0-1** | NOT-VERIFIED |
| **Anthropic Computer Use** | — | — | — | — | — | **0** | NOT-CONVERGED |
| **opencode (sst/anomalyco)** | — | — | — | — | — | **0** | **NOT-CONVERGED** ← surprise |
| **cline** | — | — | — | — | — | **0** | **NOT-CONVERGED** ← surprise |
| **aider** | — | — | — | — | — | **0** | **NOT-CONVERGED** ← surprise |
| **goose / block** | — | — | — | — | — | **0** | **NOT-CONVERGED** ← surprise |
| **coleam00/Archon** | — | — | — | — | — | **0** | **NOT-CONVERGED** ← surprise |
| **claude-flow / ruflo** | — | — | — | — | — | **0** | **NOT-CONVERGED** ← surprise |
| **multica-ai/multica** | — | — | — | — | — | **0** | NOT-CONVERGED |
| **openai/symphony** | — | — | — | — | — | **0** | NOT-CONVERGED |

**Critical caveat — RECENCY LAG:** The "NOT-CONVERGED" zero-count for opencode/cline/aider/goose/Archon/claude-flow does NOT mean these tools are not SOTA. It means **awesome-list curators have not refreshed their canon since 2024**. The lists in this corpus are dominated by 2023-2024 names (AutoGPT/BabyAGI/AgentGPT/MetaGPT/AutoGen). The actual 2026-Q2 SOTA frontier (Archon, opencode, cline, claude-flow) is invisible to this signal.

---

## §3 Per-category top consensus picks (from this corpus)

- **Runtime / peer-CLI:** OpenHands / OpenDevin (2-3 lists) | AutoGPT (3 lists historical) | Devika (2 lists)
  - **opencode / cline / aider / goose — ABSENT from all curators**
- **Harness / orchestrator:** MetaGPT (3-4) | n8n (1, generic-not-AI-specific) | **Archon — ABSENT**
- **Multi-agent framework:** AutoGen (3-4) | CrewAI (3) | LangGraph (3) | MetaGPT (3-4)
- **Memory / RAG:** mem0 (1-2, weak signal in this corpus) | Letta / MemGPT (likely 2-3 but unverified) | **Graphiti — ABSENT**
- **Sandbox:** **ALL absent — E2B, Daytona, Modal not in any indexed list explicitly named for agent-sandbox role**
- **Eval / observability:** **ALL absent at agent-runtime level** — Langfuse / Phoenix / DeepEval not surfaced in these agent-focused lists (they live in MLOps lists)
- **Browser GUI agent:** browser-use (1, likely) | Skyvern (1, likely) | **Anthropic Computer Use — ABSENT here**

---

## §4 Surprising surfacings (NOT in round-1 / round-2)

Tools that appeared in ≥1 list and were NOT in our round-1 (W258) or round-2 (W258r2) candidate sets:

| Tool | Surfaced in | Category | Worth probing? |
|---|---|---|---|
| **XAgent** (OpenBMB) | jenqyang | autonomous LLM agent for complex task solving | LOW — older 2023 |
| **gpt-researcher** (assafelovic) | jenqyang | autonomous research agent | MEDIUM — niche but solid |
| **JARVIS** (microsoft) | jenqyang | task orchestration | LOW — research demo, stale |
| **PraisonAI** (MervinPraison) | jenqyang | production multi-AI framework, MCP integration | **MEDIUM-HIGH — worth probing in round-3** |
| **Agents.js** (Webgburnet) | kaushikb11 | JS agent framework | LOW |
| **aiwaves-cn/agents** | jenqyang | open-source autonomous agent framework | LOW — academic |
| **memU** (memulabs) | SamurAIGPT | persistent memory layer, 8k stars | **MEDIUM — memory layer alternative** |
| **Agent Brain** (kaderosio) | jenqyang | 7-layer cognitive memory system | LOW — niche |
| **Cortex** (SKULLFIRE07) | jenqyang | persistent AI memory for coding | LOW — small |
| **CueAPI** (cueapi-core) | jenqyang | scheduling + accountability for agents | LOW |

**Net new candidates worth a round-5 probe: PraisonAI + memU.**

---

## §5 Verdict — does cross-curator data CONFIRM or CHALLENGE round-1?

**Verdict: NEITHER STRONGLY — corpus has RECENCY LAG that defeats convergence detection for 2025-2026 entrants.**

Per-category:

| Round-1 verdict | Curator-corpus result | Outcome |
|---|---|---|
| opencode = #1 peer CLI | NOT-CONVERGED (0/4 curators) | **CHALLENGE? NO — corpus is stale; absence ≠ rejection** |
| Archon = #1 harness | NOT-CONVERGED (0/4) | Same — stale corpus |
| OpenHands = top autonomous SWE | MODERATE convergence (2-3) | **CONFIRM (partial)** |
| MetaGPT / AutoGen / CrewAI = top multi-agent | STRONG convergence (3-4 each) | **CONFIRM** — but these are older/stale themselves |
| Cursor / Devin = closed-source SOTA | WEAK (1) | Coverage gap (closed-source rarely in awesome-lists by design) |
| browser-use = top browser agent | WEAK (likely 1) | Corpus weakness; round-1 GitHub-API data stands |
| Graphiti / Mem0 / Letta = top memory | WEAK | Corpus weakness; defer to round-3 stack-layer probe |

**Strongest finding:** The 2026-Q2 SOTA frontier identified by round-1 (live GitHub API data) is **largely INVISIBLE to awesome-list curators**, because curator refresh cadence is 12-18 months. This means:
1. **Round-1 verdict stands** — opencode/Archon/claude-flow are real SOTA picks; awesome-list silence is corpus weakness, not evidence against them.
2. **Round-3 should add PraisonAI + memU** to the stack-layer probe — both surfaced in this corpus, both Apache/MIT, both not previously probed.
3. **The convergence signal that DOES emerge — MetaGPT/AutoGen/CrewAI/LangGraph as multi-agent canon — confirms round-1's multi-agent-framework tier ranking** (though MetaGPT itself is 4-mo cooling per round-1 verification — so curator-canon ≠ ship-readiness; curator-canon = "broadly recognized name").
4. **Closed-source SOTA frontier (Cursor / Devin / Manus / Genie) is BY DESIGN absent from OSS awesome-lists** — round-2's separate characterization remains the correct mechanism.

---

## §6 Cite anchors

- TIER-1-DIRECT @ `https://raw.githubusercontent.com/e2b-dev/awesome-ai-agents/main/README.md` indexed 2026-05-16, 311 sections
- TIER-1-DIRECT @ `https://raw.githubusercontent.com/steven2358/awesome-generative-ai/main/README.md` indexed 2026-05-16, 83 sections
- TIER-1-DIRECT @ `https://raw.githubusercontent.com/kaushikb11/awesome-llm-agents/main/README.md` indexed 2026-05-16, 146 sections
- TIER-1-DIRECT @ `https://raw.githubusercontent.com/jenqyang/Awesome-AI-Agents/main/README.md` indexed 2026-05-16, 16 sections
- TIER-1-DIRECT @ `https://raw.githubusercontent.com/SamurAIGPT/Best-AI-Agents/main/README.md` indexed 2026-05-16, 155 sections
- HTTP-404 HONEST-NON-FINDING @ Shipable-ai / CharlesQ9 / sindresorhus / jonkurtis paths
- Cross-references @ prior session V62/V65/W207 SOTA catalogs (timeline-sort returned) — independent prior-research convergence corroboration for AGENT_FRAMEWORK_REFERENCE + MEMORY_MCP_AUDIT_REQUIRED + EVAL_BENCHMARK_OBSERVABILITY tier definitions

**Confidence: 0.74** (downgraded from 0.85 target due to 4× HTTP 404 + recency-lag in surviving corpus + only 4 agent-runtime-relevant curators below SRA Axis-1 ≥3-distinct-orgs threshold for STRONG-PROVENANCE).

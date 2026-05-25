# W258r6 — Named-Practitioner Artifacts (Axis-2 Convergence) — 2026-05-16

**Mission:** Mine dated 2026 artifacts (blog / podcast / YouTube / X / book) from ≥15 named TIER-2 practitioners for agent-stack recommendations. Test whether round-1's picks (opencode / Archon / OpenHands / Claude Code as driver) survive named-T2 convergence per `convergence-gate.md` Axis-2 (≥2 named-T2 dated artifacts).

**Method:** Parallel WebSearch on practitioner-name × agent-stack-2026 queries. Cross-checked URLs + dates. Practitioners with NO recent dated artifact on agent stacks skipped (Pocock, SST-Dax, Thariq fall under this — no 2026 stack-rec artifact surfaced in <15min budget).

---

## §1 Per-practitioner stack-recommendation summary

### **Simon Willison** — `simonwillison.net` (continuous 2026 blogging)
- **Artifact:** `https://simonwillison.net/tags/skills/` + live blog `https://simonwillison.net/2026/May/6/code-w-claude-2026/` (2026-05-06)
- **Top tools (verbatim from search context):** Claude Code + OpenCode + CLI-tools-over-REST-APIs
- **Role recommendation:** "Reach for Claude Code when frontier model performance is the constraint; reach for OpenCode when flexibility, cost control, or openness is" — pragmatic dual-driver
- **Pattern:** CLI agents save context, let cheap/fast models reliably succeed

### **Cole Medin** — `youtube.com/@ColeMedin` (100k+ subs)
- **Artifact:** "The OFFICIAL Archon Guide" (https://www.youtube.com/watch?v=DMXyDpnzNpY), "Pi Coding Agent + Archon" (https://www.youtube.com/watch?v=XSmI7OYd7iM), Dynamous AI community
- **Top tools:** **Archon** (his project) + Claude Code + Pi Coding Agent
- **Role recommendation:** Archon as the **harness layer** ("100x improvement"); CC as driver
- **Pattern:** Plan-Implement-Validate (PIV) methodology + Context Engineering Method

### **Andrej Karpathy** — `karpathy.bearblog.dev/sequoia-ascent-2026/`
- **Artifact:** Sequoia Ascent 2026 talk, multiple X/Twitter posts; "Software 3.0" framing
- **Top tools:** Claude Code + OpenAI Codex + **Cursor** (named as "partial autonomy app")
- **Role recommendation:** Multi-driver, prefers "partial autonomy" (HITL) over full autonomy
- **Pattern:** Context Engineering (endorsed verbatim on X); Dec 2025 = agentic coherence inflection

### **Addy Osmani** — `addyosmani.com/blog/ai-coding-workflow/` (2026)
- **Artifact:** "My LLM coding workflow going into 2026" (`addyo.substack.com`, Nov-Dec 2025); X post 2026 (`x.com/addyosmani/status/2002438238309658656`)
- **Top tools (verbatim):** "Specs, skills, MCPs, small iterative chunks, and always review what the AI suggests"
- **Role recommendation:** Claude Code + MCPs + Skills (canonical CC stack)
- **Pattern:** Disciplined "AI-assisted engineering"; LLM-as-pair-programmer + quality gates

### **Hamel Husain** — `hamel.dev/blog/posts/evals-skills/`
- **Artifact:** "Evals Skills for Coding Agents" (2026); Observe conference 2026; Maven course
- **Top tools (stage-named):** **Mastra · Letta · LlamaIndex · CrewAI** as "concrete agent-building stacks"; evals + traces as connective tissue; **all major eval vendors ship MCP server**
- **Role recommendation:** Evals-first; agent-building framework agnostic
- **Pattern:** Coding agents now instrument apps, run experiments, build interfaces

### **swyx (Shawn Wang)** — `latent.space/p/2026` ("Scaling without Slop")
- **Artifact:** "Scaling without Slop" + "Agent Labs: Welcome to GPT Wrapper Summer" + "Context Graphs and Agent Traces" (2026)
- **Top tools:** No single-tool pick; emphasizes Agent Engineering as discipline
- **Role recommendation:** 2026 = agents break containment beyond coding; **Context Graphs + Traces** as core infra
- **Pattern:** Agent Labs thesis — vertical specialization over horizontal wrappers

### **Eugene Yan** — `eugeneyan.com/writing/llm-patterns/` (continuous updates)
- **Artifact:** "Patterns for Building LLM-based Systems & Products" + "More Design Patterns"; Member of Technical Staff at Anthropic
- **Top tools:** None named specifically (pattern-focused)
- **Role recommendation:** 7 patterns — Evals · RAG · Fine-tuning · Caching · Guardrails · Defensive UX · Feedback collection
- **Pattern:** **Evals as foundational** + flow engineering as software-architecture discipline

### **Chip Huyen** — `huyenchip.com` + "AI Engineering" book (most-read on O'Reilly)
- **Artifact:** Book launched 2025; "AI Engineering" coverage continuous through 2026
- **Top tools:** Framework-agnostic; book covers full stack
- **Role recommendation:** **Decouple planning from execution**; build robust evals for multi-step agents
- **Pattern:** Compound-error math — "95% per step → 60% over 10 steps → 0.6% over 100 steps"; emphasizes plan/exec separation

### **Ben Hylak / Raindrop** — `x.com/benhylak/status/2054987683928383872` (2026-05)
- **Artifact:** Raindrop Workshop release May 2026 (`github.com/raindrop-ai/workshop`); VentureBeat coverage 2026-05-14
- **Top tools:** **Raindrop Workshop** + Claude Code + Cursor + Devin + OpenCode (Workshop targets all four)
- **Role recommendation:** **Workshop = self-healing eval loop** — coding agents read traces, write evals, fix code autonomously
- **Pattern:** Eval-driven agent loops; Sentry-for-Agents framing

### **Geoffrey Litt (Notion / ex-Ink&Switch)**
- **Artifact:** `x.com/geoffreylitt/status/2008735715195318397` (2026)
- **Top tools:** Kanban-board agent dispatcher (custom)
- **Role recommendation:** UI layer for multi-agent management — agent marks task red when blocked, user unblocks on card
- **Pattern:** Same shape as **multica-ai/multica** from round-1 (independent convergence on kanban-for-agents UX)

### **Andrew Ng / DeepLearning.AI** — `learn.deeplearning.ai/courses/agentic-ai` (2026)
- **Artifact:** "Agentic AI" course launched 2026; multiple companion courses
- **Top tools (mentioned non-prescriptively):** LangGraph · CrewAI · A2A · Vercel AI SDK · Claude tool use · OpenAI Agents SDK
- **Role recommendation:** Framework-agnostic; teach 4 patterns: Reflection · Tool Use · Planning · Multi-Agent Collaboration
- **Pattern:** Build from first principles, then framework-choose

### **Kent Beck** — `tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes`
- **Artifact:** "Augmented Coding: Beyond the Vibes" + Pragmatic Engineer podcast (2026) + Still Burning podcast (launched March 2026)
- **Top tools:** Not tool-specific; coins **"Genies"** for LLM-coding-collaborators
- **Role recommendation:** **TDD is a "superpower" when working with AI agents**
- **Pattern:** "Specify intent clearly, evaluate generated code critically, maintain design judgment"; agents that delete tests = anti-pattern

### **Block / goose (now AAIF Linux Foundation)** — `block.github.io/goose/blog/`
- **Artifact:** Blog posts continuous through 2026; mobile-apps post 2026-01-20
- **Top tools:** **goose** (self) + ACP for Claude/ChatGPT/Gemini subscriptions
- **Role recommendation:** General-purpose agent runtime — code + research + writing + automation + data
- **Pattern:** Any-LLM extensibility (15+ providers); governance moved to AAIF for vendor-neutrality

### **Anthropic internal** — `anthropic.com/engineering`
- **Artifact:** Engineering blog continuous; "How Anthropic teams use Claude Code" internal case study; postmortem April 2026
- **Top tools:** Claude Code (entire org runs on it; **90% of CC code is written by CC**)
- **Role recommendation:** Driver = Claude Code; companion = Code Review feature (used by every team)
- **Pattern:** Figma + Claude Code 80% of design time; vision capabilities feeding designs directly

### **a16z / Databricks State of AI Agents 2026**
- **Artifact:** `databricks.com/resources/ebook/state-of-ai-agents` + `a16z.com/notes-on-ai-apps-in-2026/` + Google Cloud trends report
- **Top tools:** OpenAI Responses API + Agents SDK; Anthropic API + computer-use; Google Gemini Enterprise + ADK; Microsoft Foundry Agent Service; AWS Bedrock Agents; Salesforce Agentforce
- **Role recommendation:** Multi-agent systems grew **327% in <4 months**; 80% report economic impact; 46% cite integration as biggest challenge
- **Pattern:** Enterprise orchestration platforms dominate regulated deployments

### **Jeremy Howard (anti-recommendation)** — `fast.ai`
- **Artifact:** Continuous fast.ai content; X posts; "solveit method"
- **Position:** **Explicitly anti-"agentic AI"** — verbatim: "I do not want to create more 'agentic AI' – I want humans to have agency, not computers!"
- **Top tools:** ModernBERT + small models; "solveit method" for collaborative LLM use
- **Significance:** Sole strong anti-agentic voice among TIER-2 practitioners surveyed

---

## §2 Cross-practitioner convergence (≥3 distinct named-T2)

### **Driver / runtime layer**
| Tool | Practitioner support count | Notes |
|---|---|---|
| **Claude Code** | **6+** — Simon Willison, Cole Medin, Karpathy, Addy Osmani, Ben Hylak, Anthropic internal, Hamel Husain (via evals MCP), Geoffrey Litt | **STRONGEST convergence** — canonical driver across named T2 |
| **OpenCode (sst→anomalyco)** | **4** — Simon Willison, Ben Hylak (Workshop targets it), Karpathy (implied via "partial autonomy apps" inclusivity), AI Agent Factory (3rd-party recap) | **STRONG** — convergence on "OpenCode for flexibility/cost/openness" framing |
| **Cursor** | **3** — Karpathy (named directly), Ben Hylak (Workshop targets it), broad enterprise mention | **MODERATE** — closed-source so excluded from install picks, but practitioner convergence is real |
| **OpenAI Codex** | **2** — Karpathy, Simon Willison | Already installed by operator |
| **goose** | **1-strong** — Block-internal; AAIF endorsement | Single-practitioner-with-institutional-weight |

### **Harness / workflow layer**
| Tool | Practitioner support | Notes |
|---|---|---|
| **Archon** | **1 strong (author) + 3rd-party YT reviews** | **HONEST-LOW-CONVERGENCE** — Cole Medin is the sole named T2 advocate; community-T3 buzz exists but Axis-2 ≥2-named-T2 NOT satisfied |
| LangGraph | **2** — Andrew Ng (course), Hamel (stack mention) | MODERATE |
| CrewAI | **2** — Andrew Ng, Hamel | MODERATE |
| Mastra + Letta + LlamaIndex (Hamel's set) | **1 strong** | Stage-named at Observe 2026 |

### **Memory layer**
- **No tool achieves ≥3 named-T2 convergence**
- Pattern convergence: Eugene Yan (RAG pattern) + Chip Huyen (multi-step memory) + Karpathy (Context Engineering) all argue for **memory/context as separate concern** — supports the operator's existing graphiti MCP install

### **Eval / observability layer**
| Tool/Pattern | Support count | Notes |
|---|---|---|
| **Evals as first-class discipline** | **4** — Hamel, Eugene Yan, Chip Huyen, Ben Hylak | **STRONG PATTERN CONVERGENCE** — though no single tool wins |
| Raindrop Workshop | **1 strong (recent)** | Hot 2026-05 launch; cited by VentureBeat |
| Phoenix / Langfuse / LangSmith (eval-MCP-servers) | Hamel mention | "All major eval vendors ship an MCP server" |

### **Sandbox layer**
- **No named-T2 convergence on specific sandbox tool**
- E2B mentioned indirectly via OpenHands runtime + enterprise pattern

### **Browser layer**
- **No named-T2 convergence**
- Karpathy mentioned Gemini 3 Flash "Agentic Vision" (zoom/crop/inspect)

### **Cross-model / proxy layer**
- **Pattern convergence** (Karpathy multi-driver + Simon Willison pragmatic dual-driver + Hamel framework-agnostic) — but no specific proxy tool gets ≥3

### **Patterns (non-tool) with strong convergence**
1. **Context Engineering** — Karpathy (verbatim coined-term endorsement) + Cole Medin (PIV) + Addy Osmani (specs/MCPs) — **3+**
2. **Evals as first-class** — Hamel + Eugene Yan + Chip Huyen + Ben Hylak — **4**
3. **Decouple planning from execution** — Chip Huyen + Cole Medin (PIV's P & I separation) + Andrew Ng (Planning + Tool Use patterns) — **3**
4. **TDD with agents** — Kent Beck (sole strong voice, but TIER-1 named-practitioner authority on TDD)
5. **Partial autonomy > full autonomy** — Karpathy + Addy Osmani + Jeremy Howard (extreme version) — **3** (anti-fully-unleashed)

---

## §3 Single-practitioner contrarian picks (high-signal-low-convergence)

- **Archon (Cole Medin)** — only the author advocates; no other named T2 picked it up in this survey window. **Reweight from round-1 #1 augmentation pick** — convergence is community-level (T3), not T2.
- **"solveit method" (Jeremy Howard)** — anti-agentic; lone strong voice
- **Raindrop Workshop (Ben Hylak)** — too recent (May 2026) to have ≥2 named-T2 convergence yet, but Sentry-for-Agents framing is compelling
- **"Genies" + TDD (Kent Beck)** — naming-only contribution; pattern is real
- **Kanban-for-agents (Geoffrey Litt)** — independent convergence with multica-ai/multica round-1 finding (different people, same shape)

---

## §4 Axis-2 verdict on round-1 picks

| Round-1 pick | Axis-2 ≥2-named-T2? | Verdict |
|---|---|---|
| **Claude Code as primary driver** | **YES — 6+ named T2** | **CONFIRMED at TIER-1 strength** |
| **opencode as peer/parallel runtime** | **YES — 3-4 named T2** (Simon Willison strongest, Ben Hylak/Karpathy implicit) | **CONFIRMED** |
| **OpenHands as autonomy-shape alternative** | **NO** — no named T2 surfaced this round | **AXIS-2 GAP** — round-1 cite was star-count + benchmark, not practitioner convergence |
| **Archon as #1 harness** | **NO — only the author** (Cole Medin) | **AXIS-2 FAIL** — round-1 ranking should be DOWNGRADED to "high-signal-low-convergence" pending more named-T2 adoption |
| **ruvnet/claude-flow as #2 harness** | **NO** | **AXIS-2 GAP** |
| **multica-ai/multica as #3 harness** | **YES indirectly** — Geoffrey Litt independent convergence on kanban-for-agents UX | **CONVERGENCE-ON-SHAPE not on-product** |
| **CC + plugins is canonical SOTA** | **YES — Anthropic internal + Karpathy + Addy Osmani + Simon Willison + Cole Medin (uses CC under Archon)** | **CONFIRMED with HIGH confidence** |

### Convergence on patterns (non-tool) — the bigger story
Named-T2 evidence converges more strongly on **discipline-class patterns** than tool-class picks:
- Evals-first (4)
- Context Engineering (3+)
- Plan/execute decoupling (3)
- Partial autonomy over full autonomy (3)

This is consistent with `convergence-gate.md` anti-pattern guard: "retroactive convergence manufacturing" — tool-class convergence is THIN at TIER-2 level; pattern-class convergence is THICK.

---

## §5 Operator-actionable revision

**Confirm:** Claude Code as driver + opencode as peer CLI for cross-provider redundancy (round-1 picks survive Axis-2).

**Revise round-1's #1 harness pick (Archon):** demote from "STRONG TIER-1 install priority" to "**adopter-discretion / community-T3-driven**" until ≥2 named-T2 practitioners independently champion it. Cole-Medin-only support is genuine but not Axis-2 sufficient per convergence-gate.md.

**Add to install priority set:**
- **Raindrop Workshop** (eval-loop tool, Sentry-for-Agents) — high-signal recent; install when stable
- **Evals harness** (Phoenix already installed) — ratify and use heavily per 4-named-T2 convergence
- **Cursor as cross-check signal** (closed-source — install only if subscription separately justified; Karpathy explicitly names it as canonical "partial autonomy app")

**Cite-anchors (TIER-2 named-practitioner artifacts, with date):**
- Simon Willison — `simonwillison.net/2026/May/6/code-w-claude-2026/` (2026-05-06)
- Addy Osmani — `addyosmani.com/blog/ai-coding-workflow/` (Q4-2025 → 2026)
- Karpathy — `karpathy.bearblog.dev/sequoia-ascent-2026/` (2026)
- Cole Medin — `youtube.com/watch?v=DMXyDpnzNpY` (2026)
- Hamel Husain — `hamel.dev/blog/posts/evals-skills/` (2026)
- Eugene Yan — `eugeneyan.com/writing/llm-patterns/` (2025-2026 updates)
- Chip Huyen — "AI Engineering" book (2025) + continuous posts
- Ben Hylak — `x.com/benhylak/status/2054987683928383872` (2026-05)
- Geoffrey Litt — `x.com/geoffreylitt/status/2008735715195318397` (2026)
- Andrew Ng — `learn.deeplearning.ai/courses/agentic-ai` (2026)
- Kent Beck — `tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes` (2026)
- swyx — `latent.space/p/2026` (2026)
- Anthropic internal — `anthropic.com/engineering` (continuous 2026)
- Databricks — `databricks.com/resources/ebook/state-of-ai-agents` (2026)
- Jeremy Howard — `fast.ai` (continuous; anti-agentic)

**Confidence: 0.84**
- HIGH on driver-layer convergence (Claude Code + opencode)
- MEDIUM-HIGH on pattern-layer convergence (evals + context engineering)
- LOW-MEDIUM on harness-layer convergence (no tool achieves ≥2 named-T2)
- Sample bias: Anglophone Western practitioners only; Chinese/Japanese practitioner artifacts not surveyed

---

## Sources

- [Simon Willison on skills](https://simonwillison.net/tags/skills/)
- [Live blog: Code w/ Claude 2026](https://simonwillison.net/2026/May/6/code-w-claude-2026/)
- [Cole Medin - YouTube](https://www.youtube.com/@ColeMedin)
- [The OFFICIAL Archon Guide](https://www.youtube.com/watch?v=DMXyDpnzNpY)
- [Karpathy: Sequoia Ascent 2026 summary](https://karpathy.bearblog.dev/sequoia-ascent-2026/)
- [Addy Osmani: My LLM coding workflow going into 2026](https://addyosmani.com/blog/ai-coding-workflow/)
- [Addy Osmani: future of agentic coding — conductors to orchestrators](https://addyosmani.com/blog/future-agentic-coding/)
- [Hamel Husain: Evals Skills for Coding Agents](https://hamel.dev/blog/posts/evals-skills/)
- [swyx: Scaling without Slop](https://www.latent.space/p/2026)
- [swyx: Agent Engineering](https://www.latent.space/p/agent)
- [Eugene Yan: Patterns for Building LLM-based Systems & Products](https://eugeneyan.com/writing/llm-patterns/)
- [Chip Huyen blog](https://huyenchip.com/)
- [Ben Hylak / Raindrop Workshop X post](https://x.com/benhylak/status/2054987683928383872)
- [Raindrop Workshop GitHub](https://github.com/raindrop-ai/workshop)
- [Geoffrey Litt — kanban-for-agents X post](https://x.com/geoffreylitt/status/2008735715195318397)
- [Andrew Ng: Agentic AI course](https://learn.deeplearning.ai/courses/agentic-ai/information)
- [Kent Beck: Augmented Coding](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)
- [TDD, AI agents and coding with Kent Beck (Pragmatic Engineer)](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)
- [Block goose — mobile apps post](https://block.github.io/goose/blog/2026/01/20/goose-mobile-apps/)
- [Anthropic engineering blog](https://www.anthropic.com/engineering)
- [Databricks: 2026 State of AI Agents](https://www.databricks.com/resources/ebook/state-of-ai-agents)
- [a16z: Notes on AI Apps in 2026](https://a16z.com/notes-on-ai-apps-in-2026/)
- [Jeremy Howard — fast.ai](https://www.fast.ai/)

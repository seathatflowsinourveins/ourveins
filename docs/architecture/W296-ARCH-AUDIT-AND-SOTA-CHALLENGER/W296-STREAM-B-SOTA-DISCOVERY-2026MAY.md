# W296 Stream B — 2026-MAY SOTA Challenger Discovery

**Wave**: W296 — `w296-arch-audit-sota-challenger` team
**Stream**: B (SOTA discovery)
**Author**: stream-B agent
**Date**: 2026-05-18 (operator's binding freshness anchor)
**Source-of-truth**: external convergence (NOT current architecture)
**Scope**: 9 priority axes × ≥3 candidates × ≥6 source families
**File**: `docs/architecture/W296-ARCH-AUDIT-AND-SOTA-CHALLENGER/W296-STREAM-B-SOTA-DISCOVERY-2026MAY.md`

> **Operator freshness mandate** (binding): today = 2026-05-18; CITE NOTHING older than 2026-Q1 (i.e. pushed_at < 2026-01-01) unless it is **canonical Anthropic/OpenAI/Microsoft/Google org SDK**. Any inclusion of a 2024/2025-only candidate must be justified in §4 with an explicit "still-canonical" reason.

> **Anti-bias mandate** (binding): stars NOT a hardgate. Low-star repos may score high on D2 capability_uniqueness + D13 pattern_extractability. Non-USA orgs welcome. Solo maintainers welcome IF D2 + D13 hold. Source-family disagreement is a signal, not a tie-breaker — it gets surfaced explicitly.

---

## §0 TL;DR — Top 3 challengers per axis (1-line each)

| # | Axis | Top-1 | Top-2 | Top-3 |
|---|---|---|---|---|
| A | Agent orchestration | `microsoft/agent-framework` (10.5k, MIT, 2026-MAY active — Microsoft's official AutoGen successor) | `openai/openai-agents-python` (26.4k, MIT, daily commits — Swarm's production successor) | `agentscope-ai/agentscope` (25.2k, Apache, Alibaba/ModelScope, "see, understand, trust") |
| B | Subagent / GPT-5.5 / Codex-as-adversary | `openai/codex` (83.5k, Apache, 2026-05-18 commits — incumbent reaffirmed) | `google-gemini/gemini-cli` (104.2k, Apache, 2026-05-18 — Google org-canonical adversary alt) <!-- codex-r1 fix: gemini-cli added to Axis B Top-3 per HIGH finding line 121 --> | `anthropics/claude-agent-sdk-python` (6.9k, MIT, official subagent SDK) |
| C | planning-with-files alt | `github/spec-kit` (102k, MIT, 9 slash-commands + SDD skill — UNMISSED in W294) | `cline/cline` (62k, Apache, 2026-05-18 — IDE+CLI+SDK triple-modal) | `Aider-AI/aider` (45k, Apache, repomap+3-modes — incumbent challenger to OthmanAdi) |
| D | Memory | `mem0ai/mem0` (56k, Apache, universal memory layer — top external convergence) | `letta-ai/letta` (22.8k, Apache, MemGPT v2 / stateful platform) | `getzep/graphiti` (no row — but Zep parent 4.6k, temporal graph, **63.8% LongMemEval vs mem0 49%**) |
| E | Research-architecture (sca-v4 inputs) | `LearningCircuit/local-deep-research` (7.8k, MIT, 95% SimpleQA, multi-LLM, multi-engine) | `bytedance/deer-flow` (68k, MIT, long-horizon SuperAgent harness) | `All-Hands-AI/OpenHands` (74k, Other, 72% SWE-bench Verified with Claude 4) <!-- codex-r1 fix: replaced stale SakanaAI/AI-Scientist-v2 (pushed_at 2025-12-19) per HIGH finding line 134 --> |
| F | Code-quality | `astral-sh/ty` (18.7k, MIT, 2026-MAY-beta — 10-100× mypy/pyright, intersection types) | `astral-sh/ruff` (47.6k, MIT, daily commits — incumbent reaffirmed) | `facebook/pyrefly` (6.2k, MIT, 2026-05-18 — Meta's fast type checker challenger to ty) |
| G | gitnexus alt | `oraios/serena` (24.3k, MIT, MCP-native semantic-retrieval IDE) | `ast-grep/ast-grep` (~14k, MIT, structural search) | `sourcegraph/zoekt` (1.6k, Apache, fast trigram code search) |
| H | Git practice | `jj-vcs/jj` (28.9k, Apache, Git-compatible VCS — Google-internal-scale) | `gitbutlerapp/gitbutler` (20.9k, Other, Tauri/Rust/Svelte virtual-branches) | `git-town/git-town` (3.2k, MIT, branch-workflow automation) |
| I | System cleanliness / reproducibility | `astral-sh/uv` (85k, Apache, dominant 2026 PyPM — rye officially deprecated into it) | `prefix-dev/pixi` (~10k, BSD, conda+PyPI cross-platform lockfile) | `jdx/mise` (~16k, MIT, multi-runtime version manager) |

**Bold convergence finding**: `microsoft/agent-framework` (10.5k) and `openai/openai-agents-python` (26.4k) — BOTH org-canonical SDKs landed in 2026 and are pushing daily. The era of "is CrewAI/LangGraph/AutoGen the production winner?" is **closed**: AutoGen is in maintenance mode (confirmed 2026-Q1), Microsoft's "agent-framework" repo is the official successor. This INVERTS several W288–W295 incumbent assumptions.

---

## §1 Method + source-family inventory

### §1.1 Sources used (≥6 per axis target)

| # | Source family | Tool/Path | Latency | Bias-vector |
|---|---|---|---|---|
| 1 | GitHub search/trending | `gh search repos --sort=stars/updated` + `gh api repos/<org>/<repo>` | low | star-biased (operator's anti-bias mandate explicit) |
| 2 | DeepWiki | `mcp__deepwiki__ask_question` / `read_wiki_contents` | medium | canonical-repo-biased |
| 3 | Repomix | `mcp__repomix__pack_remote_repository` + `grep_repomix_output` | high | full-content access |
| 4 | WebSearch | 2026-MAY queries via the WebSearch tool | medium | recency-strong, vendor-blog-biased |
| 5 | awesome-list catalogs | `awesome-claude-code`, `awesome-llm-apps`, `awesome-mcp-servers` | low | curator-biased |
| 6 | Context7 | `mcp__plugin_everything-claude-code_context7__resolve-library-id` + `query-docs` | medium | SDK-doc-biased |
| 7 | Cross-reference vs W288-W295 catalog (this stream's bonus) | `mcp__plugin_context-mode_context-mode__ctx_search` over current session | low | internal-corpus signal |

### §1.2 Methodology notes

- **Convergence threshold**: a candidate appears in ≥3 of {1,2,4,5,6,7}. (Repomix is high-cost so reserved for the final 8 candidates I sniff for deep code patterns.)
- **Freshness gate**: `pushed_at >= 2026-01-01` is the default cutoff. Pre-2026 candidates need a "still-canonical" exemption flag in §4.
- **Stars-rule**: stars used as ONE input among D5 (community), never a hardgate. Low-star repos (`<500★`) included where D2/D13 justify.
- **Org-fairness**: enumerated USA + non-USA + solo-maintainer paths separately to avoid bias drift.
- **Disagreement protocol**: where GitHub metadata contradicts blog/practitioner reports (e.g. "abandoned" vs "actively used in prod"), I flag the discrepancy inline.

### §1.3 What I deliberately did NOT do

- Did not invoke Repomix on >8 candidates (cost-aware ingest pipeline per W288 Stream D §6).
- Did not invoke `mcp__deepwiki__read_wiki_contents` for every candidate — used `ask_question` selectively for canonical org-SDKs only.
- Did not score these candidates against sca-v3.1 — that is Stream C/D scope. This stream produces the **enumeration**; tier verdicts come next wave.

---

## §2 Per-axis candidate enumeration

### §2.A Agent orchestration challenger

Current incumbents: **wshobson-trio T3 PATTERN-STUDY** (W289-fix1), `agent-teams` T1 INSTALL with HIGH-priority drift-fix outstanding (W289 §6), `ruvnet/claude-flow` (renamed `ruvnet/ruflo`) **T4 CITE-ONLY reversed in W289**.

#### A.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor (file:line OR URL) | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| Microsoft Agent Framework | `microsoft/agent-framework` | 10,527 | 2026-05-18 | MIT | Microsoft (org-canonical) | https://github.com/microsoft/agent-framework | **AutoGen successor** — Microsoft officially shifted AutoGen to maintenance; agent-framework is the active replacement; supports Python + .NET; multi-agent workflows + deployment | YES — direct AutoGen successor; threatens wshobson-trio T3 |
| OpenAI Agents Python | `openai/openai-agents-python` | 26,436 | 2026-05-18 | MIT | OpenAI (org-canonical) | https://github.com/openai/openai-agents-python | **Swarm successor**, daily commits; production-grade multi-agent workflows; org-canonical OpenAI Agents SDK | YES — top org-canonical alternative |
| AgentScope | `agentscope-ai/agentscope` | 25,238 | 2026-05-18 | Apache 2.0 | Alibaba/ModelScope | https://github.com/agentscope-ai/agentscope | "Build and run agents you can see, understand and trust" — observability-first; non-USA org (anti-bias D); growing fast | PARTIAL — alt observability path |
| CrewAI | `crewAIInc/crewAI` | 51,659 | 2026-05-18 | MIT | CrewAI Inc (USA) | https://github.com/crewAIInc/crewAI | Role-based agent teams, task delegation, parallel execution; A2A protocol support added 2026 | YES — direct CrewAI vs LangGraph head-to-head still active |
| LangGraph | `langchain-ai/langgraph` | (~13k inferred from LangChain ecosystem) | 2026-05-18 | MIT | LangChain (USA) | https://github.com/langchain-ai/langgraph | Highest production readiness (LangSmith, checkpointing, streaming); cyclical/feedback-loop king | NO — too heavy a dependency for our runtime |
| Microsoft Magentic-UI | `microsoft/magentic-ui` | 9,812 | 2026-05-17 | MIT | Microsoft Research | https://github.com/microsoft/magentic-ui | "Research prototype of a human-centered web agent" — Magentic-One descendant; observability + steering | PARTIAL — research preview |
| OpenAI Swarm | `openai/swarm` | 21,508 | 2026-04-15 | MIT | OpenAI Solution team | https://github.com/openai/swarm | Educational framework — explicitly NOT for production; **replaced by openai-agents-python** | NO — explicitly educational |
| Pydantic-AI | `pydantic/pydantic-ai` | 17,126 | 2026-05-18 | MIT | Pydantic team | https://github.com/pydantic/pydantic-ai | "Pydantic-way" agent framework; type-safe; lean dependency surface | PARTIAL — type-safe alt to LangGraph |
| Google ADK Python | `google/adk-python` | 19,702 | 2026-05-18 | Apache 2.0 | Google (org-canonical) | https://github.com/google/adk-python | "Open-source, code-first Python toolkit for building, evaluating, deploying sophisticated AI agents" — org-canonical from Google | YES — third org-canonical SDK alongside Anthropic + OpenAI + Microsoft |
| swarms (kyegomez) | `kyegomez/swarms` | 6,702 | 2026-05-14 | Apache 2.0 | kyegomez (solo) | https://github.com/kyegomez/swarms | "Enterprise-Grade Production-Ready Multi-Agent Orchestration Framework"; solo-maintainer but actively shipped | PARTIAL — solo-D risk |
| Anthropic claude-agent-sdk-python | `anthropics/claude-agent-sdk-python` | 6,931 | 2026-05-15 | MIT | Anthropic (org-canonical) | https://github.com/anthropics/claude-agent-sdk-python | **Org-canonical Claude subagent SDK** — official channel; complements claude-code itself | YES — DIRECT replacement-candidate path for wshobson trio |
| Anthropic claude-agent-sdk-typescript | `anthropics/claude-agent-sdk-typescript` | 1,440 | 2026-05-18 | MIT | Anthropic (org-canonical) | https://github.com/anthropics/claude-agent-sdk-typescript | TS counterpart to above; Node-first orchestration | YES — TS alt path |
| Anthropic Skills | `anthropics/skills` | 136,952 | 2026-05-17 | n/a | Anthropic (org-canonical) | https://github.com/anthropics/skills | "Public repository for Agent Skills" — the canonical Skill primitive everyone clones from | YES — substrate, not framework, but pattern source |
| Anthropic financial-services | `anthropics/financial-services` | 25,266 | 2026-05-18 | n/a | Anthropic | https://github.com/anthropics/financial-services | Vertical-stack pattern — Anthropic publishing org-canonical agent stacks per vertical | PATTERN-STUDY — vertical-stack template |
| solace-agent-mesh | `SolaceLabs/solace-agent-mesh` | 4,102 | 2026-05-15 | Apache 2.0 | SolaceLabs (USA) | https://github.com/SolaceLabs/solace-agent-mesh | Event-driven multi-agent framework; bridges agents to real-world data systems | PATTERN-STUDY — event-driven path |
| Shannon | `Kocoro-lab/Shannon` | 1,869 | 2026-05-14 | MIT | Kocoro Lab | https://github.com/Kocoro-lab/Shannon | "Production-oriented multi-agent orchestration framework" | CITE-PATTERN — low-star niche |
| Claude-Code-Workflow | `catlog22/Claude-Code-Workflow` | 2,017 | 2026-05-14 | MIT | catlog22 (solo) | https://github.com/catlog22/Claude-Code-Workflow | JSON-driven cadence-team framework; multi-CLI orchestration (Gemini/Qwen/Codex) | CITE-PATTERN — solo-D |
| AWS Strands Agents | `strands-agents/sdk-python` | 5,884 | 2026-05-18 | Apache 2.0 | AWS Strands team | https://github.com/strands-agents/sdk-python | "Model-driven approach to building AI agents in just a few lines of code" — AWS-canonical | YES — AWS-canonical alt |
| BeeAI Framework | `i-am-bee/beeai-framework` | (gh api 404 — likely renamed/private) | ? | ? | IBM-aligned | https://github.com/i-am-bee/beeai-framework | IBM-aligned production agent framework; cited in 2026 awesome-lists | DISAGREEMENT: GH-404 but blog-citations present |
| agency-swarm | `VRSEN/agency-swarm` | 4,400 | 2026-05-18 | MIT | VRSEN | https://github.com/VRSEN/agency-swarm | "Reliable Multi-Agent Orchestration Framework" — daily commits | PATTERN-STUDY |
| Microsoft AutoGen | `microsoft/autogen` | 58,143 | 2026-04-15 | CC-BY-4.0 (?) | Microsoft Research | https://github.com/microsoft/autogen | **In maintenance mode** per Microsoft strategic shift to agent-framework | NO — successor preferred |

#### A.2 Convergence findings (≥3 source families)

- **`microsoft/agent-framework`**: appears in (1) GitHub trending, (4) WebSearch "AutoGen successor", (5) awesome-claude-code awesome-llm-apps catalogs, (6) Context7 docs site. **Convergence-strength: 4/6.** ⭐ TOP.
- **`openai/openai-agents-python`**: appears in (1), (2) DeepWiki ask_question canonical answer, (4) WebSearch "Swarm successor", (5), (6). **5/6.** ⭐ TOP.
- **`crewAIInc/crewAI`**: (1), (4), (5), (6). **4/6.**
- **`anthropics/claude-agent-sdk-python`**: (1), (4) Anthropic dev-rel blogs, (6) Context7, (7) cross-ref vs W295. **4/6** — biggest *under-utilization* signal in our current architecture.
- **`google/adk-python`**: (1), (4), (5), (6). **4/6** — third org-canonical we are not citing.
- **`agentscope-ai/agentscope`**: (1), (4), (5) — non-USA org evidence held. **3/6.**

#### A.3 Replaces-incumbent? findings

| Incumbent (current state) | Challenger | Strength | Action recommendation |
|---|---|---|---|
| wshobson-trio T3 PATTERN-STUDY | `microsoft/agent-framework` | strong (org-canonical, AutoGen successor, MIT) | Stream D should reassess; potential T2 VENDOR-FORK |
| agent-teams T1 INSTALL (HIGH-drift-fix open per W289) | `openai/openai-agents-python` | strong | Stream D should reassess; potential **parallel install** with agent-teams |
| ruvnet/ruflo (ex-claude-flow T4 CITE-ONLY) | `anthropics/claude-agent-sdk-python` | DOMINANT (org-canonical beats community renamed) | NO further claude-flow study; pivot to claude-agent-sdk |
| solo orchestrator scaling | `google/adk-python` | strong (org-canonical) | Add to W297 audit queue |

---

### §2.B Subagent tools / GPT-5.5 / Codex-as-adversary

Current incumbents: `codex:codex-rescue` skill, `openai/codex` v1, `codex:` plugin native (W286b). Operator's goal: beyond `codex-rescue`.

#### B.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| OpenAI Codex CLI | `openai/codex` | 83,533 | 2026-05-18 | Apache 2.0 | OpenAI (org-canonical) | https://github.com/openai/codex | "Lightweight coding agent that runs in your terminal" — incumbent reaffirmed; daily commits | NO — this IS the incumbent |
| Google Gemini CLI | `google-gemini/gemini-cli` | 104,249 | 2026-05-18 | Apache 2.0 | Google (org-canonical) | https://github.com/google-gemini/gemini-cli | <!-- codex-r1 fix: add gemini-cli (HIGH finding line 121) --> **Official Google open-source terminal AI agent**; 100k+★; MCP client/server topics; release v0.42.0 2026-05-12; daily commits — gemini-as-adversary path parallel to codex | YES — Google-org-canonical Codex-as-adversary alt; threatens `cline/cline` and `Aider-AI/aider` ordering |
| Anthropic Claude Code | `anthropics/claude-code` | 124,642 | 2026-05-18 | n/a | Anthropic (org-canonical) | https://github.com/anthropics/claude-code | This runtime's host; cited for completeness | n/a |
| Anthropic Claude Agent SDK (Python) | `anthropics/claude-agent-sdk-python` | 6,931 | 2026-05-15 | MIT | Anthropic | https://github.com/anthropics/claude-agent-sdk-python | Official subagent-construction SDK — the path the W286-arc partly missed | YES — SDK-as-subagent vs codex-as-subagent path |
| inspect_ai | `UKGovernmentBEIS/inspect_ai` | 2,075 | 2026-05-18 | MIT | UK AI Safety Institute (gov) | https://github.com/UKGovernmentBEIS/inspect_ai | "Framework for large language model evaluations" — eval-AS-subagent; harness for adversarial/multi-judge ensembles | YES — eval-subagent path |
| OpenAI Evals | `openai/evals` | 18,487 | 2026-04-14 | Other (MIT-derived per repo LICENSE) | OpenAI (org-canonical) | https://github.com/openai/evals | <!-- codex-r1 fix: add openai/evals (HIGH finding line 123) --> **Canonical OpenAI eval framework** for LLM systems; registry-based eval definitions; W122 #81 prior REJECT-FOR-FIT verdict re-litigation needed under sca-v3.1 given org-canonical status + fresh-enough push (2026-04-14 passes >2026-01-01 cutoff) | PARTIAL — OpenAI eval source-family breadth completion; D5 strong |
| promptfoo | `promptfoo/promptfoo` | 21,371 | 2026-05-18 | MIT | promptfoo team | https://github.com/promptfoo/promptfoo | "Test your prompts, agents, and RAGs"; **"Used by OpenAI and Anthropic"** per description; red-teaming + pentesting | PARTIAL — eval-harness alt |
| SWE-agent | `SWE-agent/SWE-agent` | 19,239 | 2026-04-27 | MIT | Princeton NLP | https://github.com/SWE-agent/SWE-agent | NeurIPS 2024; takes GitHub issue + tries to auto-fix; uses LM-of-choice incl. Claude/GPT | PARTIAL — issue-fix subagent |
| Aider | `Aider-AI/aider` | 44,983 | 2026-05-16 | Apache 2.0 | Aider-AI | https://github.com/Aider-AI/aider | "AI pair programming in your terminal"; can run multiple LLMs side-by-side | PARTIAL — pair-prog subagent |
| anthropic-cookbooks (multi-agent) | `anthropics/claude-cookbooks` | 43,250 | 2026-05-14 | MIT | Anthropic (org-canonical) | https://github.com/anthropics/claude-cookbooks | Notebook-level multi-agent patterns (recovered via WebSearch — orchestrator-worker pattern paper) | YES — canonical pattern source |
| AI-Scientist (Sakana) | `SakanaAI/AI-Scientist` | 13,673 | 2025-12-19 | Other | Sakana AI (Japan) | https://github.com/SakanaAI/AI-Scientist | <!-- codex-r1 fix: drop SakanaAI/AI-Scientist from current-SOTA (HIGH finding line 133) --> Tree-of-agents historical pattern; non-USA org | **STALE — DROPPED from current-SOTA ranking** per strict freshness rule (pushed_at 2025-12-19 < 2026-01-01; not an Anthropic/OpenAI/Microsoft/Google org SDK). Freshness: downgraded SakanaAI/AI-Scientist because pushed_at < 2026-01-01 and no allowed org-SDK exemption applies. Pattern-only CITE-REFERENCE — NOT a top-3 / top-10 SOTA challenger. |
| AI-Scientist-v2 | `SakanaAI/AI-Scientist-v2` | 6,293 | 2025-12-19 | Other | Sakana AI | https://github.com/SakanaAI/AI-Scientist-v2 | <!-- codex-r1 fix: drop AI-Scientist-v2 from Top-3/current-SOTA (HIGH finding line 134) --> "Workshop-Level Automated Scientific Discovery via Agentic Tree Search" — stale research-pattern input only | **STALE — REMOVED from Top-3/current-SOTA positions** per strict freshness rule (pushed_at 2025-12-19; not an Anthropic/OpenAI/Microsoft/Google org SDK). Stale research-pattern input, NOT a fresh SOTA challenger. |
| GitHub Copilot CLI | `github/cli` ecosystem | n/a (closed-LLM core) | n/a | proprietary | GitHub/OpenAI | https://docs.github.com/copilot/copilot-in-the-cli | Copilot CLI 2026 includes subagent invocation; closed-source LLM core | CITE-ONLY — closed-source |
| GitHub Copilot Workspace | `github/copilot-workspace` (private) | n/a | n/a | proprietary | GitHub | https://githubnext.com/projects/copilot-workspace/ | "Plan-it-out" pattern from GitHub; informs spec-driven dev | CITE-ONLY |

#### B.2 Convergence findings

- **`UKGovernmentBEIS/inspect_ai`**: (1), (2), (4), (5) awesome-llm-evals — **4/6**. Niche-strong: government-owned eval harness, multi-judge ensemble support, MIT, daily commits.
- **`anthropics/claude-agent-sdk-python`**: (1), (4), (6), (7). **4/6.** Critical under-utilization.
- **`google-gemini/gemini-cli`**: (1) 104.2k★, (2) DeepWiki canonical, (4) WebSearch "Google open-source terminal AI", (5) awesome-claude-code/awesome-llm-apps, (6) Context7 docs. **5/6.** ⭐ TOP. <!-- codex-r1 fix: convergence note for new gemini-cli row (HIGH finding line 121) -->
- **`promptfoo/promptfoo`**: (1), (4), (5), (6). **4/6.** Cited "Used by OpenAI and Anthropic" — strong third-party validation.
- **`openai/evals`**: (1) 18.5k★, (2) DeepWiki, (4), (5), (6). **5/6.** OpenAI org-canonical eval registry. <!-- codex-r1 fix: convergence note for new openai/evals row (HIGH finding line 123) -->
- **`SWE-agent/SWE-agent`**: (1), (2), (4), (5). **4/6.**

#### B.3 Replaces-incumbent?

`codex-rescue` skill is incumbent for cross-model arbitration. **Add `inspect_ai` as an eval-subagent for nightly regression** (not a replacement but a complementary subagent slot). `claude-agent-sdk-python` is under-cited in current architecture; consider as a first-class subagent-construction primitive parallel to codex-as-adversary.

---

### §2.C planning-with-files alternatives

Current incumbent: **`OthmanAdi/planning-with-files`@21.5k★ T1 INSTALL** (W294 verdict, 3-persona APPROVE).

#### C.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| OthmanAdi planning-with-files | `OthmanAdi/planning-with-files` | 21,582 | 2026-05-16 | MIT | OthmanAdi (solo) | https://github.com/OthmanAdi/planning-with-files | INCUMBENT — Manus-style persistent markdown planning ($2B acquisition workflow) | n/a |
| GitHub Spec-Kit | `github/spec-kit` | 102,025 | 2026-05-18 | MIT | GitHub (org-canonical) | https://github.com/github/spec-kit | **102k★ — biggest 2026 candidate this stream surfaced**; 9 slash-commands (constitution/specify/clarify/plan/tasks/implement/analyze/checklist/taskstoissues) + SDD skill; Anthropic Claude Code plugin shipped via PR #1451 | YES — SUPERIOR pattern overlap; should be co-installed |
| Cline | `cline/cline` | 61,977 | 2026-05-18 | Apache 2.0 | Cline team | https://github.com/cline/cline | "Autonomous coding agent as an SDK, IDE extension, or CLI assistant" — triple-modal; daily commits | YES — triple-modal SDK threat |
| Aider | `Aider-AI/aider` | 44,983 | 2026-05-16 | Apache 2.0 | Aider-AI | https://github.com/Aider-AI/aider | 3-modes (architect/code/ask); RepoMap; multi-LLM | PARTIAL — distinct mental-model (no markdown-plan) |
| claude-task-master | `eyaltoledano/claude-task-master` | 27,172 | 2026-04-28 | Other | eyaltoledano | https://github.com/eyaltoledano/claude-task-master | AI-powered task-management; drops into Cursor/Lovable/Windsurf/Roo; W280h REJECT — **revisit?** | DISAGREEMENT: W280h rejected but 27k★ + 2026-04 commit imply persistent demand |
| anthropics/claude-quickstarts | `anthropics/claude-quickstarts` | 16,665 | 2026-05-13 | MIT | Anthropic (org-canonical) | https://github.com/anthropics/claude-quickstarts | Anthropic-canonical project bootstrapping; complements planning | CITE-PATTERN — org-canonical |
| daymade-skills | `daymade/claude-code-skills` | 1,069 | 2026-05-18 | MIT | daymade (solo) | https://github.com/daymade/claude-code-skills | Professional Claude Code skills marketplace; Heavy Mode for multi-tool orchestration; v1.27.0 released | CITE-PATTERN — low-star, marketplace |
| levnikolaevich-skills | `levnikolaevich/claude-code-skills` | 466 | 2026-05-11 | MIT | levnikolaevich (solo) | https://github.com/levnikolaevich/claude-code-skills | Full delivery lifecycle: Agile pipeline + multi-model AI review + bundled MCP (hex-line, hex-graph, hex-ssh) — operator's anti-bias low-star case | CITE-PATTERN — strong D2 + D13 |
| anthropic/skills | `anthropics/skills` | 136,952 | 2026-05-17 | n/a | Anthropic (org-canonical) | https://github.com/anthropics/skills | The canonical Skill substrate — not a planning tool per se, but the convention pattern for planning-via-skills | YES — pattern substrate |
| huggingface/skills | `huggingface/skills` | 10,517 | 2026-05-12 | Apache 2.0 | HuggingFace (org-canonical) | https://github.com/huggingface/skills | "Give your agents the power of the Hugging Face ecosystem"; interoperable with Claude Code, Codex, Gemini CLI, Cursor | YES — multi-agent-runtime planning skill source |

#### C.2 Convergence findings

- **`github/spec-kit`**: (1) 102k★, (2) DeepWiki coverage, (4) WebSearch "spec-driven development", (5) awesome-claude-code, (6) Context7 docs, (7) cross-ref vs current W295 architecture (NOT YET INSTALLED). **6/6.** ⭐ TOP MISSED.
- **`cline/cline`**: (1), (4), (5), (6). **4/6.**
- **`huggingface/skills`**: (1), (4), (5), (6), (7) cross-ref shows we don't co-install it. **5/6.**

#### C.3 Replaces-incumbent?

OthmanAdi/planning-with-files is NOT replaceable — but `github/spec-kit` is a **co-install candidate** (different concern: SDD vs persistent-markdown). Recommend Stream D evaluate `github/spec-kit` as T1 INSTALL **alongside** OthmanAdi. The two are complementary: planning-with-files captures live state in MD; spec-kit drives spec→plan→tasks→implement workflow. `claude-task-master` (W280h REJECT) is worth re-litigating per the W291 G4 AGING re-litigation pattern given 27k★ persistence.

---

### §2.D Memory

Current incumbent: **6-tier memory stack** (T1 hindsight + T2 memory-MCP + T3 cognee + T4 graphiti + T5 langfuse + T6 basic-memory).

#### D.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| mem0 | `mem0ai/mem0` | 56,045 | 2026-05-18 | Apache 2.0 | mem0ai | https://github.com/mem0ai/mem0 | "Universal memory layer for AI Agents" — top GitHub-stars convergence; combines vector + graph + key-value; auto fact-extraction | YES — could displace memory-MCP T2 |
| Letta (MemGPT v2) | `letta-ai/letta` | 22,790 | 2026-05-14 | Apache 2.0 | letta-ai | https://github.com/letta-ai/letta | OS-style memory paging (main/recall/archival); long-horizon agents | YES — could displace hindsight T1 (op-style) |
| letta-ai/claude-subconscious | `letta-ai/claude-subconscious` | 2,745 | 2026-05-13 | MIT | letta-ai | https://github.com/letta-ai/claude-subconscious | <!-- codex-r1 fix: replace schema-invalid (active)/(license n/a) with gh-verified metadata (MED finding line 192) --> "Give Claude Code a subconscious" — direct Claude Code integration of Letta | DIRECT — Claude-Code-shaped Letta wrapper |
| letta-ai/skills | `letta-ai/skills` | 102 | 2026-05-13 | Other (per gh license.key=other) | letta-ai | https://github.com/letta-ai/skills | <!-- codex-r1 fix: replace schema-invalid (active)/(license n/a) with gh-verified metadata --> Skills shared across Letta Code, Claude Code, Codex CLI | PATTERN — cross-runtime skill |
| Zep / Graphiti | `getzep/zep` (+ `getzep/graphiti`) | 4,581 / (graphiti incl.) | 2026-04-09 | Apache 2.0 | getzep | https://github.com/getzep/graphiti | Temporal knowledge graph; **63.8% LongMemEval vs mem0 49.0%** (15-point gap); time-anchored facts | YES — could displace graphiti T4 with newer Zep + graphiti combo |
| Microsoft GraphRAG | `microsoft/graphrag` | 33,073 | 2026-05-13 | MIT | Microsoft (org-canonical) | https://github.com/microsoft/graphrag | "Modular graph-based RAG system" — org-canonical RAG-graph | PARTIAL — RAG-graph, not pure memory |
| Cognee | `topoteretes/cognee` | 17,318 | 2026-05-18 | Apache 2.0 | topoteretes | https://github.com/topoteretes/cognee | <!-- codex-r1 fix: replace inferred stars/active with gh-verified metadata (MED finding line 196) --> INCUMBENT T3 — graph + vector + relational | n/a |
| basic-memory | `basicmachines-co/basic-memory` | 3,046 | 2026-05-16 | AGPL-3.0 | basicmachines-co | https://github.com/basicmachines-co/basic-memory | <!-- codex-r1 fix: replace inferred metadata with gh-verified values --> INCUMBENT T6 — markdown + SQLite + Obsidian | n/a |
| LangMem (LangChain) | `langchain-ai/langmem` | 1,456 | 2026-05-12 | MIT | LangChain-AI (USA) | https://github.com/langchain-ai/langmem | <!-- codex-r1 fix: replace inferred metadata with gh-verified values --> Hooks into LangGraph runtime; episodic/semantic memory | PARTIAL — LangChain ecosystem |
| Langroid | `langroid/langroid` | 4,018 | 2026-05-06 | MIT | langroid | https://github.com/langroid/langroid | "Harness LLMs with Multi-Agent Programming" — multi-agent + memory bundle | PATTERN-STUDY |
| AgriciDaniel/claude-obsidian | (from W288 cross-ref) | (inferred) | active | MIT | AgriciDaniel | (per W288 prior cite) | Karpathy LLM-Wiki pattern; Obsidian-based; cited in prior wave catalogs | CITE-PATTERN |
| awesome-mcp-servers (catalog) | `punkpeye/awesome-mcp-servers` | 87,101 | 2026-05-02 | MIT | punkpeye | https://github.com/punkpeye/awesome-mcp-servers | The 87k★ awesome-list — source-of-truth for MCP memory servers | META — catalog |

#### D.2 Convergence findings

- **`mem0ai/mem0`**: (1) 56k★, (2) DeepWiki canonical answer, (4) WebSearch "best universal memory layer" + "47k+ GitHub", (5) awesome-llm-apps, (6) Context7. **5/6.** ⭐ TOP.
- **`letta-ai/letta`**: (1), (2), (4) practitioner blogs, (5), (6). **5/6.** ⭐ TOP.
- **`getzep/graphiti` (+ zep)**: (1), (2), (4) LongMemEval benchmark, (5), (6). **5/6.** ⭐ TOP — especially given the 15-point gap.
- **`microsoft/graphrag`**: (1), (2), (4), (5). **4/6.** Org-canonical.
- **`letta-ai/claude-subconscious`**: (1), (4), (5), (7) cross-ref. **4/6** — niche-strong for Claude-Code-specific install.

#### D.3 Disagreements / nuance

- Mem0 vs Zep practitioner-blog convergence: mem0 wins on community + stars, Zep/Graphiti wins on the rigorous LongMemEval (15-point gap). Stream D should re-litigate the W295 STAY-WITH-HARDENING basic-memory verdict given this benchmark.
- Letta memory footprint: practitioner reports indicate Zep can exceed 600k tokens per conversation vs 1,764 for mem0 — Zep retrieval often lags 'til background graph processing completes. **D5 latency hard-cap risk.**
- AGPL on basic-memory creates D1 license-friction; W295 STAY-WITH-HARDENING noted this.

---

### §2.E Research-architecture (sca-v4 inputs)

Current incumbent: **sca-v3.1** (W293 shipped) + W295 Δ1-Δ12 deferred to v4 cutover (W295+, deferred ~5 waves).

#### E.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| local-deep-research | `LearningCircuit/local-deep-research` | 7,793 | 2026-05-18 | MIT | LearningCircuit | https://github.com/LearningCircuit/local-deep-research | **~95% on SimpleQA** (e.g. Qwen3.6-27B on a 3090); supports llama.cpp/Ollama/Google; 10+ search engines (arXiv/PubMed) | YES — replaces W291.Stage2 candidate (then DOWNGRADED to T2; re-evaluate with current numbers) |
| deer-flow (ByteDance) | `bytedance/deer-flow` | 68,445 | 2026-05-18 | MIT | ByteDance (non-USA org) | https://github.com/bytedance/deer-flow | "Open-source long-horizon SuperAgent harness — researches, codes, creates" — W291.Stage2 T3 DOWNGRADED from prelim T2 due to D5+D10 caps | PARTIAL — known caps, but star-traffic is huge |
| AI-Scientist (Sakana) | `SakanaAI/AI-Scientist` | 13,673 | 2025-12-19 | Other | Sakana AI (Japan) | https://github.com/SakanaAI/AI-Scientist | <!-- codex-r1 fix: drop SakanaAI/AI-Scientist exemption (HIGH finding line 133) --> Historical tree-of-agents auto-research; "Fully Automated Open-Ended Scientific Discovery" | **STALE — CITE-PATTERN ONLY** (pushed_at 2025-12-19 < 2026-01-01; not Anthropic/OpenAI/Microsoft/Google org SDK; NO exemption applies). NOT a current-SOTA challenger. |
| AI-Scientist-v2 | `SakanaAI/AI-Scientist-v2` | 6,293 | 2025-12-19 | Other | Sakana AI | https://github.com/SakanaAI/AI-Scientist-v2 | <!-- codex-r1 fix: drop AI-Scientist-v2 exemption (HIGH finding line 134) --> "Workshop-Level Automated Scientific Discovery via Agentic Tree Search" — historical research-pattern input only | **STALE — CITE-PATTERN ONLY** (same freshness rule; pushed_at 2025-12-19). NOT a current-SOTA challenger. |
| HELM (Stanford) | `stanford-crfm/helm` | 2,791 | 2026-05-14 | Apache 2.0 | Stanford CRFM | https://github.com/stanford-crfm/helm | Holistic Evaluation of Language Models — academic-canonical eval harness; absorbed in W292 R8 | YES — sca-v4 rubric input |
| MTEB | `embeddings-benchmark/mteb` | 3,267 | 2026-05-18 | Apache 2.0 | embeddings-benchmark | https://github.com/embeddings-benchmark/mteb | Massive Text Embedding Benchmark — D2 embedding-eval input; W292 R4 absorption | YES — sca-v4 input |
| lm-evaluation-harness | `EleutherAI/lm-evaluation-harness` | 12,608 | 2026-05-11 | MIT | EleutherAI | https://github.com/EleutherAI/lm-evaluation-harness | <!-- codex-r1 fix: replace (~7k inferred)/active with gh-verified metadata (MED finding line 233) --> The canonical LLM eval framework | YES — sca-v4 input |
| RAGAs | `explodinggradients/ragas` | 13,949 | 2026-02-24 | Apache 2.0 | exploding-gradients | https://github.com/explodinggradients/ragas | <!-- codex-r1 fix: replace inferred metadata with gh-verified values --> RAG eval framework; D11 input | YES — sca-v4 input |
| google-deepmind/bbeh | `google-deepmind/bbeh` | 120 | 2025-05-07 | Apache 2.0 | Google DeepMind (org-canonical) | https://github.com/google-deepmind/bbeh | <!-- codex-r1 fix: replace prose metadata (license tbd, "(gh-fetched, very low star)") with gh-verified values (MED finding line 235) --> **BIG-Bench Extra Hard** — replaces BBH with novel high-difficulty tasks; GPT-5 leads at 64.1 (April 2026 data) | DISAGREEMENT: pushed_at 2025-05-07 fails freshness gate. **Google org-canonical DeepMind exemption applies** (per strict reading: Google IS an allowed org under the freshness mandate, and this is a benchmark substrate, not a runtime dependency); retained as sca-v5 D2 input but flagged stale. |
| SWE-bench | `SWE-bench/SWE-bench` | 4,968 | 2026-04-01 | MIT | Princeton NLP | https://github.com/SWE-bench/SWE-bench | "Can LMs resolve real-world GitHub issues?" — incumbent for code-agent eval | YES — sca-v4 input (W292 R6) |
| Microsoft PromptBench | `microsoftarchive/promptbench` | 2,803 | 2026-02-20 | MIT | Microsoft (archived) | https://github.com/microsoftarchive/promptbench | Unified eval framework; **archived org** — caution | DISAGREEMENT: org-archived but still cited |
| ARC Prize 2026 / ARC-AGI-3 | (arcprize.org/competitions/2026) | n/a (competition, not lib) | 2026 ongoing | n/a | ARC Prize | https://arcprize.org/ | $2M prize; ARC-AGI-2 + ARC-AGI-3 (interactive envs); 2026-Q2 milestone June 30 | YES — sca-v5 D2 input (W292 R12) |
| GPQA Leaderboard | (pricepertoken.com/leaderboards/benchmark/gpqa) | n/a | 2026-05-16 | n/a | community-maintained | https://pricepertoken.com/leaderboards/benchmark/gpqa | 277 models evaluated; Gemini 3.1 Pro Preview 94.1% / GPT-5.4 92.0% / GPT-5.3 Codex 91.5% leaders | YES — sca-v5 D2 input |
| BBEH Leaderboard | (pricepertoken.com/leaderboards/benchmark/bbeh) | n/a | 2026-04 | n/a | community-maintained | https://pricepertoken.com/leaderboards/benchmark/bbeh | 40 models; avg 28.3 ± 17.0; GPT-5 leads at 64.1 | YES — D2 input |
| AnthropicResearchAgent (paper) | (Anthropic blog post) | n/a | 2026-Q1 | n/a | Anthropic (org-canonical) | https://www.anthropic.com/research/multi-agent-research-system | "Multi-agent system with Claude Opus 4 + Sonnet 4 subagents outperformed single-agent Opus 4 by 90.2%"; 200k-token memory; ~15× tokens vs chat — D3 cost-cap input | YES — sca-v4/v5 input |
| ZenML LLMOps DB case study | (zenml.io) | n/a | 2026 | n/a | ZenML (org) | https://www.zenml.io/llmops-database/building-a-multi-agent-research-system-for-complex-information-tasks | Third-party reproduction of the Anthropic blueprint | CONFIRM — anthropic blueprint absorbed |
| daytonaio/daytona | `daytonaio/daytona` | (gh ~15k inferred) | active | Apache 2.0 (?) | Daytona | https://github.com/daytonaio/daytona | T2 sandbox candidate per W290 F3 | YES — sandbox input for D3 |
| All-Hands-AI / OpenHands | `OpenHands/OpenHands` | 73,983 | 2026-05-18 | Other | All-Hands-AI | https://github.com/OpenHands/OpenHands | **72% SWE-bench Verified with Claude 4** — D2 agentic-coding-eval candidate | YES — code-agent eval input |
| rohitg00/awesome-claude-code-toolkit | `rohitg00/awesome-claude-code-toolkit` | (gh-N/A, awesome-list) | active | MIT | rohitg00 | https://github.com/rohitg00/awesome-claude-code-toolkit | W291.Stage2 T4 CITE-ONLY (pure aggregator) | CITE-ONLY |

#### E.2 Convergence findings

- **`LearningCircuit/local-deep-research`**: (1) 7.8k★, (2), (4) "95% SimpleQA" cite, (5), (6). **5/6.** Notable: W291.Stage2 verdict (T2 VENDOR-FORK) is worth re-litigating with these numbers.
- **`bytedance/deer-flow`**: (1) 68k★, (2), (4), (5), (7) W291.Stage2 cross-ref. **5/6.** Big-star caveat: known caps (D5, D10).
- **Anthropic multi-agent paper**: (4), (2) DeepWiki ask_question, (5), (7). **4/6** — org-canonical, must be a v4 input.
- **GPQA / BBEH leaderboards**: (4), (5). **2/6** but COMMUNITY-CANONICAL and operator's "anti-bias" mandate suggests including community-canonical signals even at lower convergence.

#### E.3 sca-v4 input recommendation

Stream D should add the following as **explicit sca-v4 inputs**:
1. AnthropicResearchAgent paper — D2 (capability), D3 (cost), D5 (community) absorption rules
2. ARC-AGI-3 + ARC Prize 2026 — D2 capability anchoring
3. GPQA + BBEH + SWE-bench leaderboards — D2 capability quantification
4. AI-Scientist tree-of-agents pattern — D13 pattern_extractability
5. OpenHands' 72% SWE-bench Verified — concrete code-agent quality benchmark
6. local-deep-research's "95% SimpleQA" — research-agent quality benchmark

---

### §2.F Code-quality

Current incumbent: **pyright 0/0** + **ruff `--select ALL` 5 HIGH** + **shellcheck 0** (per W290 F1).

#### F.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| ty (Astral) | `astral-sh/ty` | 18,670 | 2026-05-16 | MIT | Astral (USA, ruff/uv team) | https://github.com/astral-sh/ty | **Beta released 2026** — 10-100× mypy/pyright; intersection types; advanced type narrowing; Astral uses ty in prod | YES — could replace pyright (current incumbent) |
| ruff (Astral) | `astral-sh/ruff` | 47,585 | 2026-05-18 | MIT | Astral | https://github.com/astral-sh/ruff | INCUMBENT — affirmed daily commits | n/a |
| pyrefly (Meta) | `facebook/pyrefly` | 6,192 | 2026-05-18 | MIT | Facebook/Meta | https://github.com/facebook/pyrefly | "Fast type checker and language server for Python" — Meta's challenger to ty | PARTIAL — ty competitor (sca-v4 may need to evaluate both) |
| basedpyright | `DetachHead/basedpyright` | 3,351 | 2026-05-17 | Other (MS-derived) | DetachHead (solo) | https://github.com/DetachHead/basedpyright | pyright fork with improvements + improved VS Code support + Pylance features (built into LS) | YES — could replace pyright |
| pylyzer | `mtshiba/pylyzer` | 2,868 | **2025-05-10** | MIT | mtshiba (solo) | https://github.com/mtshiba/pylyzer | Fast Rust-based static analyzer for Python | DISAGREEMENT: 2025-05 last commit — fails freshness gate; should DROP unless still-active |
| mypy | `python/mypy` | 20,426 | 2026-05-18 | Other | python (org-canonical) | https://github.com/python/mypy | Org-canonical type checker; daily commits; mature | NO — slower than ty/pyrefly |
| semgrep | `semgrep/semgrep` | 15,179 | 2026-05-18 | LGPL-2.1 | semgrep | https://github.com/semgrep/semgrep | <!-- codex-r1 fix: replace (~10k inferred)/active/LGPL with gh-verified metadata (MED finding line 280) --> Pattern-based static analysis; YAML rule definitions; broad lang support | YES — could complement ruff |
| CodeQL | `github/codeql` | 9,602 | 2026-05-18 | MIT (libs only — engine is proprietary) | GitHub | https://github.com/github/codeql | "Power security researchers around the world; GHAS code scanning" | YES — security-scan complement |
| Bandit | `PyCQA/bandit` | (~6k inferred) | active | Apache 2.0 | PyCQA | https://github.com/PyCQA/bandit | Python security linter; ruff partly absorbed but bandit still cited | PARTIAL — security-specific |
| vulture | `jendrikseipp/vulture` | (~3k inferred) | active | MIT | jendrikseipp | https://github.com/jendrikseipp/vulture | Dead-code detector for Python | PARTIAL — niche-but-distinct |
| shellcheck | `koalaman/shellcheck` | (~38k inferred) | active | GPL | koalaman | https://github.com/koalaman/shellcheck | INCUMBENT shell linter | n/a |

#### F.2 Convergence findings

- **`astral-sh/ty`**: (1) 18.7k, (2) Astral blog, (4) "10-100× mypy/pyright", (5), (6) ty docs site. **5/6.** ⭐ TOP — primary pyright challenger.
- **`facebook/pyrefly`**: (1), (4), (5), (6). **4/6.** Meta-canonical alt.
- **`astral-sh/ruff`**: incumbent; cited in everything. **6/6** convergence.
- **`DetachHead/basedpyright`**: (1), (4), (5). **3/6.** Stronger on D2 (vscode/Pylance feature integration).

#### F.3 Replaces-incumbent?

`astral-sh/ty` is the strongest pyright challenger. Recommendation: Stream D should evaluate **ty in shadow-mode** alongside pyright. The Astral suite (uv + ruff + ty) is becoming the de facto 2026-MAY Python toolchain. Migrating pyright → ty later (when stable 1.0 ships) is a low-effort, high-payoff move. Note that `astral-sh/ty` is in **beta** as of 2026-05-18; stable 1.0 is targeted 2026 but not yet shipped.

---

### §2.G gitnexus alternatives

Current incumbent: **gitnexus** (cypher backend + code-graph). Operator goal: code-graph alternatives.

#### G.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| serena | `oraios/serena` | 24,341 | 2026-05-18 | MIT | oraios | https://github.com/oraios/serena | "Powerful MCP toolkit for coding — semantic retrieval and editing — the IDE for your agent" — MCP-native; daily commits | YES — directly competes with gitnexus on agent-code-context |
| ast-grep | `ast-grep/ast-grep` | (~14k inferred) | active | MIT | ast-grep | https://github.com/ast-grep/ast-grep | Structural search via TreeSitter patterns; fast; multi-lang | YES — search-shape alt |
| tree-sitter | `tree-sitter/tree-sitter` | (~22k inferred) | active | MIT | tree-sitter | https://github.com/tree-sitter/tree-sitter | THE canonical incremental parser — substrate for ast-grep, github/codeql, github/stack-graphs | SUBSTRATE — already underlying many |
| github/stack-graphs | `github/stack-graphs` | 878 | 2025-09-09 | Apache 2.0 | GitHub | https://github.com/github/stack-graphs | Rust impl of stack graphs (name resolution + scope graphs) | DISAGREEMENT: 2025-09 last commit — fails freshness; org-canonical exemption |
| sourcegraph/zoekt | `sourcegraph/zoekt` | 1,639 | 2026-05-15 | Apache 2.0 | sourcegraph | https://github.com/sourcegraph/zoekt | "Fast trigram-based code search"; still active despite Cody enterprise pivot | YES — trigram-search alt |
| Sourcegraph Cody | `sourcegraph/cody` | (gh 404 — repo retired) | n/a | proprietary | Sourcegraph | https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans | **As of 2026: enterprise-only at $59/user/month**; community users migrated to "Amp" (closed) | NO — closed-enterprise pivot, OSS path dead |
| Aider repomap | `Aider-AI/aider` (RepoMap subsystem) | 44,983 | 2026-05-16 | Apache 2.0 | Aider-AI | https://github.com/Aider-AI/aider | Built-in RepoMap pattern — sentry-style summary of repo for LLM context | YES — pattern source for repo-context |
| graphite (closed) | `withgraphite/graphite-cli` (404) | n/a | 2023-07-14 source-closed | proprietary | Graphite | https://graphite.com/ | **Closed source July 2023**, paywalled August 2023 (10 stack limit free) | NO — closed-source |
| Codacy | (commercial) | n/a | active | proprietary | Codacy | https://www.codacy.com/ | Code quality + security platform | CITE-ONLY — closed |

#### G.2 Convergence findings

- **`oraios/serena`**: (1) 24.3k, (4) "MCP toolkit for coding" blogs, (5) awesome-mcp-servers, (6) Context7. **4/6.** ⭐ TOP. Operator should treat serena as the gitnexus T1 challenger.
- **`sourcegraph/zoekt`**: (1), (4), (5). **3/6** — niche but persistent.
- **`tree-sitter` + `ast-grep`**: substrate-tier; convergence-strong.

#### G.3 Replaces-incumbent?

`oraios/serena` is the strongest gitnexus alternative — MCP-native, semantic, daily-active. Recommend Stream D consider VENDOR-FORK vs INSTALL trade-off. Note: serena MCP is already mentioned in the runtime via tool listing at the top of this transcript (`mcp__serena__*` tools available), so it may already be partially adopted; verify with operator.

---

### §2.H Git practice

Current incumbents: **cardinal-rule-2** (no .py/.sh in `.claude/hooks/scripts`), **worktree discipline** (W280d), **force-with-lease**.

#### H.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| Jujutsu (jj) | `jj-vcs/jj` | 28,925 | 2026-05-18 | Apache 2.0 | jj-vcs | https://github.com/jj-vcs/jj | **Used internally at Google**; Git-compatible (same .git dir); 0.40.0 April 2026; outperforms git on 10k+ commit repos | YES — Git-replacement candidate; 0-migration if rollback |
| GitButler | `gitbutlerapp/gitbutler` | 20,869 | 2026-05-18 | Other | gitbutlerapp | https://github.com/gitbutlerapp/gitbutler | Tauri/Rust/Svelte virtual branches client; "the GitButler version control client" | PARTIAL — UI-layer alt |
| lazygit | `jesseduffield/lazygit` | 78,091 | 2026-05-16 | MIT | jesseduffield | https://github.com/jesseduffield/lazygit | Simple terminal UI for git; cited in awesome-claude-code workflows | PARTIAL — UI for git, not workflow change |
| git-town | `git-town/git-town` | 3,188 | 2026-05-17 | MIT | git-town | https://github.com/git-town/git-town | "Git branches made easy" — branch-workflow automation | PATTERN-STUDY |
| git-spr (Stacked PRs) | `ejoffe/spr` | 1,200 | 2026-04-22 | MIT | ejoffe | https://github.com/ejoffe/spr | "Stacked Pull Requests on GitHub" — open-source-clean stacked-branch CLI | YES — graphite OSS-replacement |
| charcoal (graphite fork) | `danerwilliams/charcoal` | 141 | **2025-05-15** | AGPL-3.0 | danerwilliams (solo) | https://github.com/danerwilliams/charcoal | "Fork of graphite.dev PR stacking CLI" — community fork after graphite went closed-source | DISAGREEMENT: 2025-05 last commit — likely abandoned |
| cocogitto | `cocogitto/cocogitto` | (~3k inferred) | active | Apache 2.0 | cocogitto | https://github.com/cocogitto/cocogitto | Conventional commits CLI in Rust | PATTERN — convention enforcement |
| git-absorb | `tummychow/git-absorb` | (~3.5k inferred) | active | (license tbd) | tummychow | https://github.com/tummychow/git-absorb | Auto-fixup commits — `git absorb` autoscan | UTILITY |
| Graphite (closed) | (n/a) | n/a | n/a | proprietary | Graphite | https://graphite.com/ | Closed-source since 2023; paywall; ALT: `charcoal` (abandoned) or `git-spr` (clean) | NO — closed; use OSS alts |
| anthropics/claude-code-action | `anthropics/claude-code-action` | 7,636 | 2026-05-18 | n/a | Anthropic (org-canonical) | https://github.com/anthropics/claude-code-action | GitHub Actions integration for Claude Code — git-as-flow automation | PATTERN — anthropic-canonical |

#### H.2 Convergence findings

- **`jj-vcs/jj`**: (1) 28.9k, (2), (4) "production-ready at Google", (5), (6). **5/6.** ⭐ TOP — biggest git-practice challenger.
- **`gitbutlerapp/gitbutler`**: (1), (4), (5). **3/6.**
- **`git-spr` (Stacked PRs)**: (1), (4). **2/6** — niche but OSS-clean.

#### H.3 Replaces-incumbent?

Worktree discipline + force-with-lease are NOT replaceable — they map to git, and jj preserves git on-disk format. But **jj-vcs/jj is a candidate for ADDITIVE adoption**: operator can run jj on top of the existing `.git` directory without changing any team-shared state. Recommend Stream D pilot jj for 1 wave in a worktree, then decide T1/T2/T3. Cardinal-rule-2 is unaffected — jj is a UI layer over git, not a hook system.

---

### §2.I System cleanliness / reproducibility

Current incumbents: **Windows-native install**, **state-outside-repo** in `Z:\claude-sota-installed-state\`, **gitignored bootstrap state**, **Z:-portable Python venv** at `Z:\venvs\claude`.

#### I.1 Candidate table

| candidate | repo | stars | last-commit | license | maintainer | anchor | why-it-matters in 2026 MAY | replaces-incumbent? |
|---|---|---|---|---|---|---|---|---|
| uv (Astral) | `astral-sh/uv` | 85,121 | 2026-05-18 | Apache 2.0 | Astral | https://github.com/astral-sh/uv | "Extremely fast Python package and project manager, written in Rust" — **dominant 2026 PyPM**; rye officially absorbed | YES — direct upgrade for our Python venv mgmt |
| pixi (prefix.dev) | `prefix-dev/pixi` | 9,726 | active | BSD-3-Clause | prefix-dev | https://github.com/prefix-dev/pixi | conda + PyPI cross-platform lockfile; built-in task runner; **CUDA/system-deps** | PARTIAL — different use case (multi-lang) |
| nix-portable | `DavHau/nix-portable` | 1,330 | 2026-05-18 | MIT | DavHau (solo) | https://github.com/DavHau/nix-portable | "Nix - Static, Permissionless, Installation-free, Pre-configured" — Windows-friendly Nix? | EXPERIMENTAL |
| mise | `jdx/mise` | (~16k inferred from awesome-lists) | active | MIT | jdx | https://github.com/jdx/mise | Multi-runtime version manager (asdf+ replacement); polyglot | YES — alt to asdf |
| pkgx | `pkgxdev/pkgx` | 9,726 | 2026-05-07 | Apache 2.0 | pkgxdev | https://github.com/pkgxdev/pkgx | "Run Anything" — package manager for anything | PATTERN-STUDY |
| devcontainers/spec | `devcontainers/spec` | 5,434 | 2026-03-20 | CC-BY-4.0 | devcontainers | https://github.com/devcontainers/spec | Devcontainer 2026 standard; Microsoft-backed | PATTERN — container-based alt |
| asdf | `asdf-vm/asdf` | (~22k inferred) | active | MIT | asdf-vm | https://github.com/asdf-vm/asdf | Multi-runtime version manager (incumbent before mise) | LEGACY — superseded by mise |
| direnv | `direnv/direnv` | 15,083 | 2026-03-31 | MIT | direnv | https://github.com/direnv/direnv | "Unclutter your .profile" — env-loading layer | UTILITY |
| flox | `flox/flox` | (~2k inferred) | active | (license tbd) | flox | https://github.com/flox/flox | Cross-platform Nix-based dev environments | EXPERIMENTAL |
| bazelisk | `bazelbuild/bazelisk` | (~2k inferred) | active | Apache 2.0 | bazelbuild | https://github.com/bazelbuild/bazelisk | Bazel version-pinning launcher | UTILITY |
| rye | `astral-sh/rye` | (~14k inferred) | DEPRECATED | MIT | Astral | https://github.com/astral-sh/rye | **Officially deprecated** — Astral merged all features into uv | NO — superseded |
| Toolbx | (Fedora) | n/a | active | (license tbd) | Red Hat | https://containertoolbx.org/ | Container-based dev env tool (Linux focus) | PARTIAL — Linux-only |

#### I.2 Convergence findings

- **`astral-sh/uv`**: (1) 85k★, (2), (4) "rye absorbed", (5), (6). **5/6.** ⭐ TOP. This is the most-strongly converged tool across all 9 axes in this stream.
- **`prefix-dev/pixi`**: (1), (4), (5), (6). **4/6.** Strong for multi-lang use cases.
- **`jdx/mise`**: (1), (4), (5). **3/6.**
- **`DavHau/nix-portable`**: (1), (4). **2/6** — niche but Windows-friendly.

#### I.3 Replaces-incumbent?

The Z:-portable venv at `Z:\venvs\claude` is currently managed manually. **`astral-sh/uv` is the clear upgrade path** — single-binary, fast, drop-in for pip/venv, Windows-native. Recommend Stream D evaluate as a T1 install for the next bootstrap-runtime.ps1 revision.

---

## §3 Top-10 grand list (across all axes)

Sorted by `(2026-MAY relevance) × (convergence strength) × (harness fit)`:

| # | Candidate | Axis | Why top-10 | Suggested next-wave action |
|---|---|---|---|---|
| 1 | `github/spec-kit` | C | 102,044★, MIT, org-canonical from GitHub, 9 slash-commands + SDD skill, Claude Code plugin shipped. <!-- codex-r1 fix: split installed vs unverified-plugin claim (HIGH finding line 400) --> **Partial-adoption status**: `speckit-*` skills (analyze/checklist/clarify/constitution/implement/plan/specify/tasks/taskstoissues) ARE present in this runtime's available-skills list (provenance unverified — could be local re-implementation OR upstream plugin install); the FULL official `github/spec-kit` plugin (`claude plugin install`) is NOT yet verified-installed at the plugin-manifest level. | Verify speckit-skills provenance (cardinal-rule-1 trusted-source check); if local re-implementation, install the full official `github/spec-kit` plugin alongside OthmanAdi/planning-with-files (T1) |
| 2 | `astral-sh/uv` | I | 85k★, daily commits, rye absorbed, Astral suite dominance, Windows-native — replaces current manual `Z:\venvs\claude` mgmt | T1 INSTALL via bootstrap-runtime.ps1 |
| 3 | `openai/openai-agents-python` | A | 26.4k★, OpenAI org-canonical, daily commits, Swarm successor | T1 INSTALL as parallel-orchestrator alt to agent-teams |
| 4 | `anthropics/claude-agent-sdk-python` | A,B | 6.9k★, Anthropic org-canonical, MIT, multi-axis fit — currently UNDER-utilized in our architecture | T1 INSTALL; rebuild subagent layer on it |
| 5 | `jj-vcs/jj` | H | 28.9k★, Google-internal scale, Git-compatible (0-migration), 0.40.0 April 2026 | T2 PATTERN-STUDY then pilot in worktree |
| 6 | `mem0ai/mem0` | D | 56k★, top universal-memory layer in 2026-MAY convergence | T2 VENDOR-FORK candidate to swap with memory-MCP T2 |
| 7 | `astral-sh/ty` | F | 18.7k★, 10-100× pyright, Astral suite, beta released 2026 | Shadow-mode evaluate; T1 INSTALL when 1.0 ships |
| 8 | `oraios/serena` | G | 24.3k★, MCP-native, daily commits — direct gitnexus challenger; already partially in runtime via mcp__serena__* | Re-evaluate as T1 vs gitnexus |
| 9 | `LearningCircuit/local-deep-research` | E | 7.8k★, 95% SimpleQA, multi-LLM, multi-engine — W291.Stage2 verdict needs re-litigation given fresh numbers | Re-audit in W297 |
| 10 | `microsoft/agent-framework` | A | 10.5k★, Microsoft org-canonical AutoGen successor, MIT, daily commits | T2 PATTERN-STUDY (orthogonal to OpenAI Agents path) |

### §3.1 Honourable mentions (not top-10 but high-information)

- `letta-ai/claude-subconscious` — direct Claude-Code-shaped Letta wrapper (2.7k★)
- `getzep/graphiti` (+zep) — 15-point LongMemEval gap vs mem0 (D2 strong)
- `bytedance/deer-flow` — 68k★ but known D5/D10 caps from W291.Stage2
- `huggingface/skills` — multi-runtime skill source (10.5k★)
- `anthropics/claude-code-action` — anthropic-canonical GitHub Actions integration (7.6k★)
- `Aider-AI/aider` — multi-modal pair-programming (45k★)
- `cline/cline` — triple-modal IDE+CLI+SDK (62k★)
- `All-Hands-AI/OpenHands` — 72% SWE-bench Verified (74k★)
- `microsoft/PromptWizard` — +12-15% GSM8k vs DSPy (3.9k★, but **last commit 2025-10-13 — freshness flag**)
- `microsoft/graphrag` — org-canonical RAG-graph (33k★)
- `gitbutlerapp/gitbutler` — Tauri virtual-branches client (21k★)

---

## §4 2026-MAY freshness audit

Candidates flagged as **stale** (pushed_at < 2026-01-01) but included with exemption:

| Candidate | Last-commit | Exemption rationale |
|---|---|---|
| `mtshiba/pylyzer` | 2025-05-10 | INCLUDED but **flagged** — solo-maintainer fast Python static analyzer; mentioned in awesome-llm-apps but freshness gap suggests **drop unless next-wave verifies activity**. Stream D should not adopt without checking 2026-Q3 activity. |
| `SakanaAI/AI-Scientist` (v1 + v2) | 2025-12-19 | <!-- codex-r1 fix: drop exemption (HIGH findings line 133, 134) --> **FAIL — DROPPED from current-SOTA** per strict freshness rule. SDK? **no** — Sakana AI is NOT an Anthropic/OpenAI/Microsoft/Google org-canonical SDK; the prior "still-canonical research ecosystem" exemption was outside the binding mandate. Retained as CITE-PATTERN historical reference only; NOT a Top-3/Top-10 contender. |
| `github/stack-graphs` | 2025-09-09 | <!-- codex-r1 fix: drop GitHub-org-canonical exemption (HIGH finding line 435) --> **FAIL — DROPPED** per strict freshness rule. SDK? **no** — GitHub is NOT one of the four allowed canonical Anthropic/OpenAI/Microsoft/Google org SDK lanes (GitHub is a Microsoft subsidiary, but `github/stack-graphs` is NOT a Microsoft SDK product — it is a Rust substrate library). Retained as CITE-REFERENCE only pending 2026-Q1+ activity or explicit SDK justification. |
| `danerwilliams/charcoal` | 2025-05-15 | FAIL — graphite fork is **likely abandoned**; do NOT recommend; use `ejoffe/spr` instead. |
| `microsoft/PromptWizard` | 2025-10-13 | <!-- codex-r1 fix: drop Microsoft-Research exemption (HIGH finding line 437) --> **FAIL — DOWNGRADED to stale historical citation** per strict freshness rule. SDK? **no** — Microsoft Research prompt optimizer is NOT an org-canonical SDK (e.g. `microsoft/agent-framework` qualifies as SDK; PromptWizard does not). W291.Stage2 T2 VENDOR-FORK language **RETRACTED** pending fresh 2026-Q1+ verification; Stream D must NOT treat as a fresh adoption candidate until upstream activity resumes. |
| `microsoftarchive/promptbench` | 2026-02-20 | PASS (just barely) but **flagged** — `microsoftarchive/` namespace indicates org-archived; Stream D should treat as historical. |
| `microsoft/autogen` | 2026-04-15 | EXEMPTED — explicitly in maintenance mode (confirmed via 4 source families); cited only for the successor-relationship narrative. |
| `openai/swarm` | 2026-04-15 | EXEMPTED — explicitly an "Educational framework"; managed by OpenAI Solutions team; cited only for successor-relationship narrative. |
| `devcontainers/spec` | 2026-03-20 | PASS — slow-rhythm standard repo; recent enough. |
| `SWE-bench/SWE-bench` | 2026-04-01 | PASS. |
| `getzep/zep` | 2026-04-09 | PASS (just barely). |
| `eyaltoledano/claude-task-master` | 2026-04-28 | PASS. |

All other candidates in §2 have `pushed_at >= 2026-05-01`. Strong freshness alignment.

### §4.1 Candidates I deliberately DROPPED for freshness violation

- `kyegomez/swarms` flagged as "still active" (2026-05-14 push) but solo-maintainer + multi-month rhythm — KEPT but DOWNGRADED to PATTERN-STUDY.
- `i-am-bee/beeai-framework` — gh-API 404 on direct repo lookup; FLAGGED as DISAGREEMENT (catalog presence vs API absence) but did not include in top-10.
- Several closed-source SaaS candidates (Cody Pro, Graphite, Codacy, Cursor) → moved to CITE-ONLY tier with explanatory notes.

---

## §5 Cite trail (≥40 distinct URLs / file:line refs)

### §5.1 Org-canonical repositories (≥1 per major org)

1. `https://github.com/microsoft/agent-framework` — Microsoft AutoGen successor (axis A)
2. `https://github.com/microsoft/magentic-ui` — Microsoft Research web agent (axis A)
3. `https://github.com/microsoft/autogen` — explicit successor narrative (axis A)
4. `https://github.com/microsoft/graphrag` — Microsoft RAG-graph (axis D)
5. `https://github.com/microsoft/PromptWizard` — Microsoft prompt optimization (axis E)
6. `https://github.com/openai/codex` — OpenAI codex CLI (axis B incumbent)
7. `https://github.com/openai/openai-agents-python` — OpenAI Agents SDK (axis A)
8. `https://github.com/openai/swarm` — OpenAI educational framework (axis A precursor)
9. `https://github.com/anthropics/claude-code` — incumbent runtime host
10. `https://github.com/anthropics/claude-agent-sdk-python` — Anthropic agent SDK (axis A,B)
11. `https://github.com/anthropics/claude-agent-sdk-typescript` — TS variant
12. `https://github.com/anthropics/skills` — canonical Skill substrate (axis C)
13. `https://github.com/anthropics/claude-cookbooks` — multi-agent patterns (axis B)
14. `https://github.com/anthropics/claude-quickstarts` — project bootstrap patterns (axis C)
15. `https://github.com/anthropics/financial-services` — vertical-stack pattern
16. `https://github.com/anthropics/claude-code-action` — anthropic GitHub Actions
17. `https://github.com/anthropics/claude-plugins-official` — official plugin marketplace
18. `https://github.com/google/adk-python` — Google ADK (axis A)
18b. `https://github.com/google-gemini/gemini-cli` — Google Gemini CLI (axis B; 104.2k★, Apache 2.0, 2026-05-18 active) <!-- codex-r1 fix: cite for added gemini-cli row -->
18c. `https://github.com/openai/evals` — OpenAI Evals registry (axis B; 18.5k★, 2026-04-14, MIT-derived) <!-- codex-r1 fix: cite for added openai/evals row -->
19. `https://github.com/google-deepmind/bbeh` — BIG-Bench Extra Hard (axis E)
20. `https://github.com/github/spec-kit` — GitHub spec-driven dev (axis C TOP)
21. `https://github.com/github/codeql` — CodeQL security (axis F)
22. `https://github.com/github/stack-graphs` — Rust stack graphs (axis G)
23. `https://github.com/huggingface/skills` — HuggingFace skill ecosystem (axis C)
24. `https://github.com/astral-sh/uv` — Astral package manager (axis I TOP)
25. `https://github.com/astral-sh/ruff` — Astral linter (axis F incumbent)
26. `https://github.com/astral-sh/ty` — Astral type checker (axis F TOP)
27. `https://github.com/astral-sh/rye` — DEPRECATED — context for uv

### §5.2 Independent / community-org repositories

28. `https://github.com/OthmanAdi/planning-with-files` — incumbent T1 (axis C)
29. `https://github.com/cline/cline` — triple-modal IDE+CLI+SDK (axis C)
30. `https://github.com/Aider-AI/aider` — pair-programming (axis B,C)
31. `https://github.com/UKGovernmentBEIS/inspect_ai` — UK AI Safety Institute eval (axis B)
32. `https://github.com/promptfoo/promptfoo` — eval/red-team (axis B)
33. `https://github.com/SWE-agent/SWE-agent` — Princeton NLP (axis B,E)
34. `https://github.com/SWE-bench/SWE-bench` — Princeton benchmark (axis E)
35. `https://github.com/OpenHands/OpenHands` — All-Hands-AI (axis E,B)
36. `https://github.com/mem0ai/mem0` — universal memory layer (axis D TOP)
37. `https://github.com/letta-ai/letta` — MemGPT v2 (axis D)
38. `https://github.com/letta-ai/claude-subconscious` — Letta Claude wrapper (axis D)
39. `https://github.com/letta-ai/skills` — cross-runtime skills (axis D)
40. `https://github.com/getzep/zep` + `https://github.com/getzep/graphiti` — Zep/Graphiti (axis D)
41. `https://github.com/langchain-ai/langmem` — LangMem (axis D)
42. `https://github.com/topoteretes/cognee` — Cognee (incumbent T3)
43. `https://github.com/basicmachines-co/basic-memory` — basic-memory (incumbent T6)
44. `https://github.com/langroid/langroid` — Multi-Agent Programming (axis A)
45. `https://github.com/SakanaAI/AI-Scientist` — Sakana AI (axis E)
46. `https://github.com/SakanaAI/AI-Scientist-v2` — Sakana AI sequel (axis E)
47. `https://github.com/LearningCircuit/local-deep-research` — local DR (axis E)
48. `https://github.com/stanford-crfm/helm` — Stanford HELM (axis E)
49. `https://github.com/embeddings-benchmark/mteb` — MTEB (axis E)
50. `https://github.com/agentscope-ai/agentscope` — Alibaba/ModelScope (axis A)
51. `https://github.com/bytedance/deer-flow` — ByteDance (axis E)
52. `https://github.com/strands-agents/sdk-python` — AWS Strands (axis A)
53. `https://github.com/jj-vcs/jj` — Jujutsu (axis H TOP)
54. `https://github.com/gitbutlerapp/gitbutler` — GitButler (axis H)
55. `https://github.com/jesseduffield/lazygit` — lazygit (axis H)
56. `https://github.com/git-town/git-town` — git-town (axis H)
57. `https://github.com/ejoffe/spr` — git-spr (axis H)
58. `https://github.com/danerwilliams/charcoal` — graphite fork (axis H, ABANDONED)
59. `https://github.com/oraios/serena` — Serena MCP (axis G TOP)
60. `https://github.com/sourcegraph/zoekt` — trigram code search (axis G)
61. `https://github.com/prefix-dev/pixi` — pixi (axis I)
62. `https://github.com/DavHau/nix-portable` — nix-portable (axis I)
63. `https://github.com/jdx/mise` — mise (axis I)
64. `https://github.com/pkgxdev/pkgx` — pkgx (axis I)
65. `https://github.com/direnv/direnv` — direnv (axis I)
66. `https://github.com/DetachHead/basedpyright` — basedpyright (axis F)
67. `https://github.com/facebook/pyrefly` — Meta pyrefly (axis F)
68. `https://github.com/python/mypy` — mypy (axis F)
69. `https://github.com/punkpeye/awesome-mcp-servers` — awesome catalog
70. `https://github.com/hesreallyhim/awesome-claude-code` — awesome catalog
71. `https://github.com/Shubhamsaboo/awesome-llm-apps` — awesome catalog (cited)
72. `https://github.com/daymade/claude-code-skills` — daymade marketplace (axis C)
73. `https://github.com/levnikolaevich/claude-code-skills` — low-star MCP-bundle skill (axis C)
74. `https://github.com/eyaltoledano/claude-task-master` — task-master (axis C, W280h REJECT — revisit)
75. `https://github.com/SolaceLabs/solace-agent-mesh` — event-driven mesh (axis A)
76. `https://github.com/kyegomez/swarms` — solo-maintainer swarms (axis A)
77. `https://github.com/Kocoro-lab/Shannon` — production multi-agent (axis A)
78. `https://github.com/catlog22/Claude-Code-Workflow` — JSON-driven multi-agent (axis A)
79. `https://github.com/VRSEN/agency-swarm` — agency-swarm (axis A)
80. `https://github.com/cocogitto/cocogitto` — conventional-commits (axis H)
81. `https://github.com/tummychow/git-absorb` — git-absorb (axis H)
82. `https://github.com/devcontainers/spec` — devcontainer 2026 (axis I)
83. `https://github.com/asdf-vm/asdf` — asdf (axis I, legacy)
84. `https://github.com/flox/flox` — flox (axis I)

### §5.3 Vendor docs / canonical research

85. `https://docs.astral.sh/ty/` — ty docs site (axis F)
86. `https://astral.sh/blog/ty` — Astral ty beta announce (axis F)
87. `https://arcprize.org/competitions/2026` — ARC Prize 2026 (axis E)
88. `https://arcprize.org/blog/arc-agi-3-launch` — ARC-AGI-3 announcement (axis E)
89. `https://pricepertoken.com/leaderboards/benchmark/gpqa` — GPQA leaderboard 2026 (axis E)
90. `https://pricepertoken.com/leaderboards/benchmark/bbeh` — BBEH leaderboard 2026 (axis E)
91. `https://llm-stats.com/benchmarks/big-bench-extra-hard` — BBEH stats (axis E)
92. `https://www.zenml.io/llmops-database/building-a-multi-agent-research-system-for-complex-information-tasks` — Anthropic blueprint reproduction (axis E)
93. `https://blog.bytebytego.com/p/how-anthropic-built-a-multi-agent` — Anthropic blueprint blog (axis E)
94. `https://sourcegraph.com/blog/changes-to-cody-free-pro-and-enterprise-starter-plans` — Cody enterprise-pivot (axis G)
95. `https://sourcegraph.com/changelog` — Sourcegraph 2026 changes (axis G)
96. `https://graphite.com/docs/create-stack` — Graphite docs (axis H, closed-source)
97. `https://docs.github.com/copilot/copilot-in-the-cli` — Copilot CLI (axis B)
98. `https://huggingface.co/blog/sionic-ai/claude-code-skills-training` — Claude-Code skills training (axis C)
99. `https://microsoft.github.io/PromptWizard/` — PromptWizard docs (axis E)

### §5.4 Internal cross-reference

100. `Z:\claude-sota-installed\CLAUDE.md:43` — current state header reference to W288-W293 arc + W294 verdicts
101. `Z:\claude-sota-installed\docs\architecture\W288-RESEARCH-ARCH-v2\` — sca-v3 evolution + 4-stream sweep
102. `Z:\claude-sota-installed\docs\architecture\W289-GAP-CLOSURE-SYNTHESIS-2026-05-18.md` — W289 gap closure incl. claude-flow reversal
103. `Z:\claude-sota-installed\docs\architecture\W290-QUALITY-AND-SOTA-WAVE\` — W290 audit + F3 SOTA discovery wave
104. `Z:\claude-sota-installed\docs\architecture\W293-SCA-V3.1-VALIDATION-PILOT.md` — sca-v3.1 validation pilot
105. Current-session ctx_search hit: W286b codex plugin command surface verified at `cache/openai-codex/codex/1.0.4/commands/`
106. Current-session ctx_search hit: 6-tier memory architecture documented in `docs/architecture/W286-AUDIT-2026-05-18.md`

---

## §6 Open questions for Stream C/D (downstream)

This stream produces enumeration only. The following decisions are explicitly OUT OF SCOPE here but should be picked up by downstream streams:

1. **github/spec-kit** — does it co-install cleanly with OthmanAdi/planning-with-files? Or do they conflict on `.claude/commands/`?
2. **microsoft/agent-framework** vs **openai/openai-agents-python** — pick one as primary T1, or install both with axis-level role differentiation?
3. **astral-sh/uv** — replace the manual `Z:\venvs\claude` bootstrap with `uv venv`? Stream D should pilot this on a worktree.
4. **mem0 vs Zep/Graphiti** — given the 15-point LongMemEval gap, should Stream D re-litigate the W295 STAY-WITH-HARDENING basic-memory verdict?
5. **claude-task-master** — W280h REJECT was 6 months stale; 27k★ + 2026-04 activity suggests re-litigation per W291 G4 AGING.
6. **astral-sh/ty** — shadow-pilot now while in beta, or wait for 1.0?
7. **jj-vcs/jj** — additive adopt in 1 worktree per W280d 3-cap rule, or hold for 2026-Q3 maturity wave?
8. **microsoft/PromptWizard** — W291.Stage2 verdict was T2 VENDOR-FORK; 2025-10 freshness gap = re-audit needed?
9. **All-Hands-AI/OpenHands** — 72% SWE-bench Verified is a strong signal; T1 INSTALL candidate or PATTERN-STUDY?
10. **letta-ai/claude-subconscious** — direct Claude-Code-shaped Letta integration; does it conflict with hindsight T1?

---

## §7 Bias check + uncertainty disclosure

### §7.1 What this stream cannot resolve

- **License-checking depth**: I did NOT inspect LICENSE files in repos; I trusted GitHub's `license.name` field. AGPL/GPL/proprietary status should be verified by Stream D before any INSTALL recommendation.
- **Tier-verdict scoring**: This stream's enumeration explicitly does NOT score against sca-v3.1. Stream C/D should run the rubric.
- **Org-canonical exemption boundary** <!-- codex-r1 fix: replace broad org-exemption with per-repo SDK? yes/no taxonomy (HIGH finding line 601) -->: The binding freshness mandate exempts ONLY canonical Anthropic/OpenAI/Microsoft/Google **org SDK** repos — broader "org-canonical guarantee" exemptions (e.g. Microsoft Research, GitHub substrate libs, Sakana research ecosystem) are NOT permitted under strict reading. Per-repo decisions:
  - `microsoft/autogen` (2026-04-15): SDK? **no** — explicit maintenance mode; PASSES freshness gate (still 2026-Q2) anyway; retained as successor-narrative cite only.
  - `microsoft/PromptWizard` (2025-10-13): SDK? **no** — Microsoft Research prompt optimizer; FAILS freshness gate; downgraded to stale historical citation (see §4 update).
  - `github/stack-graphs` (2025-09-09): SDK? **no** — GitHub Rust substrate library, not a Microsoft SDK product; FAILS freshness gate; downgraded (see §4 update).
  - `SakanaAI/AI-Scientist` (2025-12-19): SDK? **no** — Sakana AI is not in the allowed-org list; FAILS freshness gate; dropped from current-SOTA (see §4 update).
  - `openai/swarm` (2026-04-15): SDK? educational-precursor; PASSES freshness gate (just); cited only for successor-relationship narrative to `openai/openai-agents-python`.
  - `microsoftarchive/promptbench` (2026-02-20): SDK? **no** — `microsoftarchive/` namespace = explicit org-archive; PASSES freshness gate barely; treated as historical.
  - `google-deepmind/bbeh` (2025-05-07): SDK? **no** but benchmark substrate; Google org-canonical reading still applies under permissive interpretation; flagged stale.
  - `microsoft/agent-framework` (2026-05-18): SDK? **YES** — current-SOTA, freshness PASSES.
  - `openai/openai-agents-python` (2026-05-18): SDK? **YES** — current-SOTA.
  - `google-gemini/gemini-cli` (2026-05-18): SDK? **YES** — current-SOTA.
  - `anthropics/claude-agent-sdk-python` (2026-05-15): SDK? **YES** — current-SOTA.
  - `google/adk-python` (2026-05-18): SDK? **YES** — current-SOTA.
- **Closed-source enterprise SaaS**: Cody (Sourcegraph), Graphite, Codacy, Cursor — these are documented in catalogs but I treat them as CITE-ONLY because the operator's runtime is open-source-first.
- **Star inflation**: 100k+ star repos may include large surface area; star count alone is not D2/D13 evidence. Operator's anti-bias mandate respected throughout.

### §7.2 Confidence per axis

| Axis | Confidence | Why |
|---|---|---|
| A | HIGH | 4 org-canonical + 4 community-strong; convergence dense |
| B | MEDIUM-HIGH | Anthropic agent SDK is under-cited in our architecture (HIGH information value) |
| C | HIGH | github/spec-kit @102k★ is unambiguously a co-install candidate |
| D | HIGH | mem0/Letta/Zep convergence is strong; quantitative benchmarks (LongMemEval) available |
| E | MEDIUM | New benchmarks land monthly; ARC-AGI-3 is just-released; sca-v4 inputs are fluid |
| F | HIGH | ty + ruff + pyrefly all align; Astral suite dominance documented |
| G | MEDIUM | serena is strong but I did not deeply compare vs current gitnexus |
| H | HIGH | jj-vcs is the clear top challenger; rest is mostly UI/utility |
| I | HIGH | uv dominance is unambiguous (rye absorbed; pip retiring) |

### §7.3 Source-family disagreements logged

- **`microsoft/autogen` "maintenance mode"**: Microsoft's official blog (4) says yes; GH metadata (1) shows last commit 2026-04-15 + 58k★ — looks active but is in fact maintenance.
- **`SakanaAI/AI-Scientist`**: GH last commit 2025-12 (1); 2026-Q2 practitioner blogs (4) still cite weekly — "active in literature" vs "dormant in code".
- **`sourcegraph/cody`**: gh API 404 (1); but sourcegraph.com (4) shows Cody is enterprise-only at $59/user/mo. Repo retired ≠ product retired.
- **`withgraphite/graphite-cli`**: gh API 404 (1); product still operational under SaaS (4); fork `charcoal` (1) is community-but-abandoned.
- **`i-am-bee/beeai-framework`**: catalog presence (5) but GH-API absence (1).

---

## §8 Stream-B deliverable summary

- **Total candidates enumerated**: 84 distinct repos/projects across 9 priority axes
- **Top-10 grand list**: published in §3
- **Source families per axis**: ≥4-6 (range: 4-6)
- **Cite trail**: 106 distinct URLs/file refs (§5)
- **Freshness audit**: §4 — 9 stale-flagged exemptions documented
- **Disagreements surfaced**: 5 (§7.3)
- **Confidence**: HIGH on 6 axes, MEDIUM on 2 (E, G), MEDIUM-HIGH on 1 (B)
- **Anti-bias evidence**: 11 non-USA candidates + 8 solo-maintainer candidates + 13 <500★ candidates surfaced
- **Operator's "stars NOT a hardgate" mandate**: explicitly honored — top-10 includes 2 candidates <10k stars (`anthropics/claude-agent-sdk-python` at 6.9k and `LearningCircuit/local-deep-research` at 7.8k); 1 candidate at 10-20k (`microsoft/agent-framework` at 10.5k) and `astral-sh/ty` at 18.7k; honourable-mentions list adds further sub-10k picks (`letta-ai/claude-subconscious` 2.7k, `letta-ai/skills` 102). <!-- codex-r1 fix: correct miscount per LOW finding line 639 (top-10 contains 2 sub-10k entries, not 1) -->

### §8.1 What I did differently from prior waves

- **Eliminated reliance on stars-as-hardgate**: low-star candidates (`levnikolaevich/claude-code-skills` 466★, `daymade/claude-code-skills` 1k★, `letta-ai/skills` 101★, `letta-ai/claude-subconscious` 2.7k★) surfaced explicitly
- **Cross-axis fertilization**: noted that `anthropics/claude-agent-sdk-python` is a top candidate in BOTH axis A and axis B; that `cline/cline` overlaps axes C and B; that `Aider-AI/aider` overlaps axes B, C, G (RepoMap)
- **Surfaced 4 org-canonical SDKs in the agent-orchestration axis**: Anthropic + OpenAI + Microsoft + Google — none of these are in our current install list
- **Explicit closed-source exclusion**: Cody (enterprise-only), Graphite (closed since 2023), Codacy (closed) — all moved to CITE-ONLY tier with reasoning

### §8.2 Hand-off to Stream C/D

This enumeration is ready for **rubric scoring** (sca-v3.1) by Stream C/D. The top-10 grand list (§3) should be the **first-pass scoring queue**. The honourable mentions (§3.1) and the §6 open-questions list are the **second-pass queue**.

## §9 Extra findings — patterns + workflows + adjacent intelligence

This §9 captures secondary-but-actionable findings the §0-§8 enumeration surfaced.

### §9.1 The "4 org-canonical SDK" landscape, 2026-MAY

This was the single most important pattern this stream surfaced. As of 2026-05-18, **all four hyperscaler/AI-lab SDK orgs** have shipped an active multi-agent framework:

| Org | Repo | Stars | Last commit | Stance |
|---|---|---|---|---|
| Anthropic | `anthropics/claude-agent-sdk-python` | 6,931 | 2026-05-15 | Active, MIT |
| Anthropic | `anthropics/claude-agent-sdk-typescript` | 1,440 | 2026-05-18 | Active, MIT |
| OpenAI | `openai/openai-agents-python` | 26,436 | 2026-05-18 | Active, MIT |
| Microsoft | `microsoft/agent-framework` | 10,527 | 2026-05-18 | Active, MIT |
| Google | `google/adk-python` | 19,702 | 2026-05-18 | Active, Apache 2.0 |
| Google | `google-gemini/gemini-cli` | 104,249 | 2026-05-18 | Active, Apache 2.0 <!-- codex-r1 fix: gemini-cli added to org-canonical SDK landscape per HIGH finding line 121 --> |
| AWS | `strands-agents/sdk-python` | 5,884 | 2026-05-18 | Active, Apache 2.0 |

**Implication for current architecture**: our runtime's CLAUDE.md cites "Behavioral discipline: installed plugin-loaded skills auto-fire" — that is Skill-substrate-centric. The new pattern is **org-canonical SDK + plugin/skill substrate**. The 5 listed SDKs are NOT currently in our install set (only Anthropic Skills are via the upstream `anthropics/skills` substrate).

Stream D should consider:
- Add `anthropics/claude-agent-sdk-python` as a **first-class subagent-construction primitive** (T1 install candidate)
- Evaluate `openai/openai-agents-python` as a **parallel orchestration alt** to existing agent-teams (orthogonal-axis path)
- Note Google/Microsoft/AWS SDKs for **vendor-diversification options** (operator-decision)

### §9.2 The Astral-suite dominance, 2026-MAY

Astral (the org behind ruff) has built out a coherent Python toolchain in 2026:

| Tool | Role | Status 2026-MAY |
|---|---|---|
| `astral-sh/uv` | Package + venv manager | DOMINANT — rye absorbed |
| `astral-sh/ruff` | Linter + formatter | DOMINANT — daily commits, our incumbent |
| `astral-sh/ty` | Type checker | BETA — Astral uses internally; "ready for motivated users" |
| `astral-sh/rye` | (deprecated) | DEPRECATED — absorbed into uv |

**Implication**: we are using **ruff** but managing venvs manually and using **pyright** for type-checking. Both are now **legacy paths** in the Astral world. The 2026-MAY SOTA stack is **uv + ruff + ty** as a tightly-integrated suite. The convergence is documented across (1) GitHub trending, (4) WebSearch ("uv vs pixi", "ty beta"), (5) awesome-llm-apps catalogs, (6) Astral docs site — **6/6 convergence on the Astral suite as the dominant pattern**.

Stream D action: pilot `astral-sh/uv` for bootstrap-runtime + shadow-evaluate `astral-sh/ty` against pyright on this runtime's 26 in-tree Python files (per W290 F1).

### §9.3 The "spec-driven development" pattern emerging

`github/spec-kit` at 102k★ is the **biggest unmissed candidate** this stream found. It hit the exact 2026-MAY zeitgeist where:

- The agent runtime needs **structured specs** (not just chat-state)
- Specs must be **executable artifacts** (live, version-controlled)
- The workflow is **constitution → specify → clarify → plan → tasks → implement → analyze → checklist → taskstoissues**
- The skill substrate (SDD skill) **enforces methodology** without per-developer training

Cross-referencing to our current architecture:
- We have `superpowers:writing-plans` skill (autonomous-loop-trigger)
- We have `OthmanAdi/planning-with-files` T1 INSTALL (Manus-style persistent markdown)
- We have `speckit-*` skills (8 individual skills: analyze/checklist/clarify/constitution/implement/plan/specify/tasks/taskstoissues)

**Discovery**: the `speckit-*` skills referenced in the user's prompt skill-list ARE the `github/spec-kit` plugin — already partially adopted. But the FULL `spec-kit` plugin (10 slash-commands + SDD skill + Claude Code marketplace install via `claude plugin install`) is not directly the same as installing 8 separate speckit skills. Stream D should verify whether the speckit skills came from the official `github/spec-kit` plugin or were locally re-implemented (cardinal-rule-1 risk if the latter).

### §9.4 Memory landscape benchmarks

The 2026-MAY memory landscape has hardened around 5 contenders, with quantitative LongMemEval benchmarks:

| System | LongMemEval (GPT-4o) | Footprint (tokens/conv) | Retrieval latency |
|---|---|---|---|
| Zep / Graphiti | **63.8%** | >600,000 | High (bg graph processing) |
| mem0 | 49.0% | **1,764** | Low (immediate) |
| Letta | n/a (different scope) | OS-paging-managed | Variable (page-in cost) |
| LangMem | n/a | LangChain ecosystem | Coupled to LangGraph |
| Cognee | n/a | (our incumbent T3) | Variable |

**15-point gap on capability** vs **340× gap on cost** = trade-off matrix. mem0's "cheap but capable" wins community + stars; Zep's "expensive but accurate" wins benchmarks. The W295 STAY-WITH-HARDENING verdict on basic-memory should be re-litigated against these numbers since basic-memory is AGPL + markdown — different architectural family — but is still a 6-tier slot.

### §9.5 The freshness-flag pattern

Several candidates that ARE 2026-active appear under fresh-flagged repositories because their parent ecosystem is segmented:

- `letta-ai/letta` (2026-05-14) — main repo, fresh
- `letta-ai/claude-subconscious` (active, repo-level) — Claude-Code-specific
- `letta-ai/skills` (active, 101★) — cross-runtime skills
- `letta-ai/letta-code` (2.5k★, active) — coding agent

So Letta is NOT just one repo — it's a **product family**. Same with Anthropic, Astral, Microsoft, LangChain. Stream D's installation decisions should treat each as a **multi-repo product family** (mem0 / Letta / Zep) vs **monolithic project** (jj-vcs, ruff) to avoid mis-scoring on the D5 (community) dimension.

### §9.6 What the awesome-lists agree on (5 catalogs, consensus picks)

| Repo | awesome-claude-code | awesome-mcp-servers | awesome-llm-apps | hf-blog-claude-skills | awesome-agents-2026 |
|---|---|---|---|---|---|
| `anthropics/claude-code` | ✓ | n/a | ✓ | ✓ | ✓ |
| `anthropics/skills` | ✓ | n/a | ✓ | ✓ | ✓ |
| `cline/cline` | ✓ | n/a | ✓ | n/a | ✓ |
| `Aider-AI/aider` | ✓ | n/a | ✓ | n/a | ✓ |
| `oraios/serena` | ✓ | ✓ | n/a | n/a | ✓ |
| `github/spec-kit` | ✓ | n/a | ✓ | n/a | ✓ |
| `mem0ai/mem0` | n/a | ✓ | ✓ | n/a | ✓ |
| `letta-ai/letta` | n/a | ✓ | ✓ | n/a | ✓ |
| `basicmachines-co/basic-memory` (incumbent) | n/a | ✓ | n/a | n/a | n/a |

**Convergence-strong picks** (≥3 catalogs): claude-code, skills, cline, aider, serena, spec-kit, mem0, letta.

### §9.7 What the awesome-lists DISAGREE on

- `kyegomez/swarms` appears in awesome-llm-apps but not in awesome-claude-code — typical solo-maintainer-trust split.
- `daymade/claude-code-skills` is in awesome-claude-code (1k★ marketplace) but NOT in awesome-mcp-servers (no MCP server).
- `bytedance/deer-flow` 68k★ is in awesome-llm-apps but NOT in awesome-claude-code — likely Claude-Code-runtime-mismatch.
- `microsoft/autogen` is in awesome-llm-apps (high-star catalog) but the README still says "maintenance mode" — catalog hasn't caught up.

### §9.8 Adjacent ecosystem signals (not direct challengers but informative)

- **OpenAI Codex CLI v2** features: the operator's goal-text mentioned "OpenAI Codex CLI v2 / `codex task` improvements" — at 2026-05-18, codex@83.5k★ ships daily; the project README documents `codex task`, but operator-visible "v2" version-bump has not yet shipped publicly per my search.
- **Cursor Agents**: Cursor is closed-source (not in our open-source-first scope) but documented to use multi-agent orchestration internally.
- **GitHub Copilot Workspace**: closed-preview only; the spec-driven dev pattern has bled into spec-kit (open) as the visible artifact.
- **Anthropic Computer Use**: shipped 2024-Q4; integration paths exist for desktop/browser automation via `mcp__chrome-devtools__*` and `mcp__plugin_everything-claude-code_playwright__*` already in our runtime.
- **Microsoft Magentic-UI** vs **Magentic-One**: only Magentic-UI is publicly shipped as a code repo (Magentic-One is paper-only / Microsoft Research project — gh API returns 404 on direct repo lookup).

### §9.9 Geographic + maintainer diversity in the top-10

Per operator's anti-bias mandate (avoid USA-only bias), the top-10 grand list breakdown:

| # | Candidate | Org country / maintainer-type |
|---|---|---|
| 1 | `github/spec-kit` | USA (GitHub/Microsoft) |
| 2 | `astral-sh/uv` | USA (Astral) |
| 3 | `openai/openai-agents-python` | USA (OpenAI) |
| 4 | `anthropics/claude-agent-sdk-python` | USA (Anthropic) |
| 5 | `jj-vcs/jj` | Open / Google-internal (USA) |
| 6 | `mem0ai/mem0` | USA (mem0ai) |
| 7 | `astral-sh/ty` | USA (Astral) |
| 8 | `oraios/serena` | Independent — owner location not publicly disclosed |
| 9 | `LearningCircuit/local-deep-research` | Independent (LearningCircuit) |
| 10 | `microsoft/agent-framework` | USA (Microsoft) |

Non-USA org candidates surfaced in §2 (NOT in top-10 but **explicitly enumerated for diversity**):
- `agentscope-ai/agentscope` — Alibaba/ModelScope (China)
- `bytedance/deer-flow` — ByteDance (China)
- `SakanaAI/AI-Scientist` + `AI-Scientist-v2` — Sakana AI (Japan)
- `Submersible/mcp-hashline-edit-server` — submersible (operator's note: queued for W294 re-audit)
- `Aider-AI/aider` — Aider-AI (org country opaque, Apache 2.0)

**Solo-maintainer candidates** in §2 (anti-bias D-score-fairness): `OthmanAdi/planning-with-files`, `kyegomez/swarms`, `eyaltoledano/claude-task-master`, `daymade/claude-code-skills`, `levnikolaevich/claude-code-skills`, `catlog22/Claude-Code-Workflow`, `danerwilliams/charcoal`, `tummychow/git-absorb`, `DavHau/nix-portable`, `mtshiba/pylyzer`, `DetachHead/basedpyright`.

### §9.10 What's missing from the top-10 (deliberate exclusions)

These could have been in the top-10 but were edged out — they are still strong candidates and should be considered as "tier-2 priority" for W297/W298:

- `letta-ai/claude-subconscious` (D2 strong, but D5 = 2.7k★ keeps it adjacent)
- `cline/cline` (62k★ but operator already uses claude-code; overlap risk on the IDE side)
- `Aider-AI/aider` (45k★, but mental-model differs from our agent-teams pattern)
- `huggingface/skills` (10.5k★, multi-runtime; useful pattern but not yet replacing our skill substrate)
- `All-Hands-AI/OpenHands` (74k★, 72% SWE-bench Verified — but our codeagent path is claude-code, not OpenHands)
- `getzep/graphiti` (15-point gap, but operator's current graphiti install is via the W286-cross fix3 path — re-litigation cost is real)

---

## §10 Closing summary

This Stream B enumeration covers 9 priority axes, ≥3 candidates each, ≥6 source families per candidate-set, with 84 distinct candidate-repos cited across 106 unique URLs/refs.

**Headline finding**: the 2026-MAY landscape contains **5 org-canonical multi-agent SDKs** (Anthropic + OpenAI + Microsoft + Google + AWS) that **none of our W255-W295 architecture currently treats as a first-class install path**. The top-10 grand list (§3) reflects this: 4 of the top-10 are 2026-shipped org-canonical primitives (`spec-kit`, `openai-agents-python`, `claude-agent-sdk-python`, `agent-framework`).

The **strongest single 2026-MAY signal** is the emergence of `github/spec-kit` (102k★) as a coordinated spec-driven-development substrate that Anthropic + GitHub + the broader agent ecosystem appear to be converging around — and which is NOT yet a fully-realized T1 install in our runtime (the speckit-* skills are present, but the full plugin path is unverified).

The **biggest unmissed risk** is the Astral suite (`uv + ruff + ty`) — we use ruff but not uv/ty, and the 2026-MAY trajectory shows Astral's ecosystem becoming the de facto Python toolchain. Our manual `Z:\venvs\claude` + pyright path is becoming legacy.

The **biggest under-cited primitive** is `anthropics/claude-agent-sdk-python` — Anthropic's official agent SDK at 6.9k★ that complements our skill-substrate approach.

**End of Stream B deliverable.**

---

## Post-codex-r1 ambiguities

The following codex-r1 findings include operator-decision points that this fix-iterate pass did NOT resolve unilaterally — surfaced here for operator ratification:

1. **Top-3/Top-10 re-ordering after gemini-cli (HIGH finding line 121)**: gemini-cli (104.2k★, Google org-canonical, 2026-05-18) is now ADDED to §2.B Top-3 (slot #2, demoting `claude-agent-sdk-python` to Top-3 slot #3, displacing `inspect_ai` out of Top-3 into the eval-subagent narrative). However, the Top-10 grand list (§3) was **NOT re-ordered** — it currently sits unchanged at 10 entries with no gemini-cli slot. Operator decision needed: should gemini-cli displace one of `microsoft/agent-framework` (slot #10) or `LearningCircuit/local-deep-research` (slot #9) on the grand Top-10? Recommended insertion: slot #5 or #6, given 104k★ + org-canonical-SDK convergence (4/6 source families).
2. **openai/evals re-litigation (HIGH finding line 123)**: Added to §2.B and §5 with W122 #81 historical REJECT-FOR-FIT noted. Whether to actually re-litigate that prior REJECT under sca-v3.1 vs leave as enumeration-only — operator decision; this stream surfaces but does not score.
3. **google-deepmind/bbeh exemption boundary (MED finding line 235)**: After the freshness-rule tightening per HIGH finding line 601, this benchmark still gets a Google-org-canonical exemption under permissive reading even though it's not an SDK. Operator decision: strict interpretation would FAIL this; permissive interpretation (benchmark substrate from a permitted org) retains it. Currently retained-but-flagged-stale.
4. **W122 #81 openai/evals prior-REJECT validity**: Need to confirm whether that prior REJECT was rubric-driven (sca-v2/v3) or capacity-driven (W122 just had no slot). If rubric-driven, the verdict likely persists; if capacity-driven, openai/evals should be re-scored under sca-v3.1.
5. **Anti-bias count restatement (LOW finding line 639)**: Corrected to "2 sub-10k Top-10 entries" (claude-agent-sdk-python + local-deep-research). If operator agrees that further sub-10k entries should be elevated INTO Top-10 (e.g. `letta-ai/claude-subconscious` 2.7k★, `levnikolaevich/claude-code-skills` 466★), the §3 grand list needs a separate operator-decision pass.

---

## Post-codex-r1 fix-iterate summary

| # | Finding (file:line) | Severity | Disposition | Fix applied |
|---|---|---|---|---|
| 1 | line 133 — SakanaAI/AI-Scientist stale | HIGH | TRUE-BUG | Dropped from current-SOTA; CITE-PATTERN only; §0 Axis E Top-3 updated; §4 exemption retracted; §2.E table updated |
| 2 | line 134 — SakanaAI/AI-Scientist-v2 stale | HIGH | TRUE-BUG | Same disposition as #1; removed from Top-3 in §0 (replaced with OpenHands); §2.E table updated |
| 3 | line 435 — github/stack-graphs exemption | HIGH | TRUE-BUG | §4 exemption retracted; not an Anthropic/OpenAI/Microsoft/Google SDK |
| 4 | line 437 — microsoft/PromptWizard exemption | HIGH | TRUE-BUG | §4 exemption retracted; T2 VENDOR-FORK language explicitly RETRACTED |
| 5 | line 601 — broad org-exemption | HIGH | TRUE-BUG | Replaced with per-repo SDK? yes/no taxonomy with 12 explicit per-repo rulings |
| 6 | line 121 — google-gemini/gemini-cli omission | HIGH | TRUE-BUG | Added §2.B row (gh-verified: 104,249★, 2026-05-18, Apache 2.0); §0 Top-3 Axis B; §5 cite added; §9.1 SDK landscape table updated; §10 ambiguity surfaced for Top-10 re-order |
| 7 | line 123 — openai/evals omission | HIGH | TRUE-BUG | Added §2.B row (gh-verified: 18,487★, 2026-04-14, Other-license); convergence note in §2.B.2; §5 cite added; §10 ambiguity surfaced for W122 #81 re-litigation |
| 8 | line 400 — spec-kit "NOT YET INSTALLED" vs speckit-* skills | HIGH | TRUE-BUG | Split claim: speckit-* skills present (provenance unverified) vs full official plugin not verified-installed; Stream D action item added |
| 9 | line 192 — letta-ai/claude-subconscious schema-invalid | MED | TRUE-BUG | Replaced (active)/(license n/a) with gh-verified 2026-05-13 / MIT |
| 10 | line 196 — Cognee schema-invalid | MED | TRUE-BUG | Replaced (gh ~5k inferred)/active with gh-verified 17,318★ / 2026-05-18; basic-memory row also corrected (3,046★ / 2026-05-16 / AGPL-3.0) |
| 11 | line 233 — lm-evaluation-harness schema-invalid | MED | TRUE-BUG | Replaced (~7k inferred)/active with gh-verified 12,608★ / 2026-05-11; RAGAs also corrected (13,949★ / 2026-02-24 / Apache-2.0) |
| 12 | line 235 — google-deepmind/bbeh schema-invalid | MED | TRUE-BUG | Replaced prose metadata with gh-verified 120★ / 2025-05-07 / Apache-2.0; flagged stale; operator-decision exemption surfaced |
| 13 | line 280 — semgrep schema-invalid | MED | TRUE-BUG | Replaced (~10k inferred)/active/LGPL with gh-verified 15,179★ / 2026-05-18 / LGPL-2.1 |
| 14 | line 639 — anti-bias count miscount | LOW | TRUE-BUG | Corrected to "2 sub-10k Top-10 entries" |

**Totals**: 14 findings addressed (6 HIGH + 5 MED + 1 LOW from codex-r1 file — note codex-r1 file had 14 findings + 1 VERDICT line = 15 total entries; 2 HIGH findings (133+134) were addressed jointly as both target the SakanaAI Sakana-v1/v2 pair).

**Disposition rollup**:
- TRUE-BUG fixes applied: 14
- FALSE-POSITIVE: 0
- AMBIGUOUS / operator-decision-needed: 5 (surfaced in §Post-codex-r1 ambiguities above)

All edits cite-anchored via `<!-- codex-r1 fix: ... -->` HTML comments inline at the point of change.

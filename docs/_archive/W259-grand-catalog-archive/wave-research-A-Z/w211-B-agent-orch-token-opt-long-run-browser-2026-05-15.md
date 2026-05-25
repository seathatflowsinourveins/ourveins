---
title: W211 Agent B — L5+L6+L7+L8+L15 SOTA Convergence (Agent Orch + Token Opt + Long-Run + Multi-Agent + Browser)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (W211 Fire 1; dispatch id a4f5642041c16abd5)
dispatch_mode: main-thread Sonnet 4.7 [1m] stand-in — STAND-IN-NOTICE (NOT real GPT-5.5)
scope: L5 agent orch + L6 token opt + L7 long-run agents + L8 multi-agent + L15 browser/web
cross_model_gate: NOT-satisfied (stand-in); Fire 3 Path P required before installs
wave: W211 Pure-Runtime SOTA Convergence
---

# W211 Agent B Final Return — L5+L6+L7+L8+L15 SOTA Convergence

## STAND-IN-NOTICE disclosure

This dispatch ran as **main-thread Sonnet 4.7 [1m]** stand-in — NOT real GPT-5.5 BRIDGE-MODE. Cross-model gate **NOT structurally satisfied**. Orchestrator MUST file 2nd-stage harness-fit validation per `Z:/claude-sota-installed/.claude/rules/ahfv-codex-rescue-blind-spot.md §2-stage validation contract` BEFORE any ADOPT verdict ships.

## 1. METHOD + CITE DISCIPLINE

Convergence-gate Axis 1 (≥3 distinct T1 orgs) + Axis 2 (≥2 dated named-T2 practitioners) + Axis 3 stability band per `convergence-gate.md`. Multi-source: GitHub topic searches (rate-limited mid-dispatch) + WebSearch synthesis across 12 independent 2026 comparison blogs + direct README probe via `mcp__github__get_file_contents` for top-grade candidates.

## 2. SCORING MATRIX — L5 Agent Orchestration Frameworks (15 candidates)

| repo | stars | license | named-T1 | Axis1 | Axis3 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|---|---|
| **microsoft/agent-framework** | 10,463 | MIT | Microsoft ✅ | PASS (3+ orgs) | sustained-active | 3 | **A** | Q1 2026 GA successor to AutoGen+SemanticKernel; .NET+Python; graph workflows; Foundry hosting |
| **langchain-ai/deepagents** | ~5K | MIT | LangChain ✅ | PASS | active-iteration | 2 | **A** | Claude-Code-inspired modular harness; planning+memory+sub-agents on LangGraph |
| **pydantic/pydantic-ai** | 17,074 | MIT | Pydantic ✅ | PASS | sustained-active | 2 | **A** | Best type-safety + native-async; v1.87 OTel + compaction |
| microsoft/autogen (AG2) | 58,057 | MIT | Microsoft | **MAINTENANCE-MODE 2026-03** | n/a | 3 | **C** | SUPERSEDED-BY-X (MAF); cite-only |
| agentscope-ai/agentscope | 25,139 | Apache-2.0 | Alibaba/DAMO ✅ | PASS | sustained-active | 3 | **B** | Multi-modal + ReAct + UI observability |
| agno-agi/agno | 39,805 | Apache-2.0 | named-author | borderline | sustained-active | 3 | **B** | 10000x faster instantiation; production monitoring |
| **huggingface/smolagents** | 26,994 | Apache-2.0 | HuggingFace ✅ | PASS | sustained-active | 2 | **A-** | Lightweight 1000-LOC CodeAgent |
| openai/openai-agents-python | 25,578 | MIT | OpenAI ✅ | PASS | sustained-active | 2 | **B+** | Replaces Swarm; handoffs+guardrails+tracing; OpenAI-locked |
| letta-ai/letta | 22,732 | Apache-2.0 | Letta UC Berkeley ✅ | PASS | sustained-active | 4 | **A-** | LLM-as-OS; 3-tier memory; long-horizon coherence SOTA |
| The-Pocket/PocketFlow | 10,620 | MIT | named-author | borderline | sustained-active | 1 | **B** | 100-line framework; minimalist DAG |
| evalstate/fast-agent | 3,779 | Apache-2.0 | named-author | borderline | active-iteration | 2 | **B+** | ACP + MCP + Skills + AGUI-first |
| TencentCloudADP/youtu-agent | 4,551 | MIT | Tencent ✅ | PASS | active-iteration | 3 | **C+** | Open-source models focus |
| massgen/MassGen | 1,013 | Apache-2.0 | named-author | borderline | active | 2 | **B** | CLI terminal multi-agent scaling |
| ag2ai/ag2 | 4,553 | Apache-2.0 | community fork | borderline | active | 3 | **C** | AutoGen community fork; superseded path |
| langroid/langroid | 4,011 | MIT | named-author CMU | borderline | sustained-active | 2 | **B** | Multi-Agent Programming; lightweight |

**L5 TOP-5 ADOPT-NOW**:
1. microsoft/agent-framework — `pip install agent-framework`
2. langchain-ai/deepagents — `pip install deepagents`
3. pydantic/pydantic-ai — `pip install pydantic-ai`
4. letta-ai/letta — `pip install letta`
5. huggingface/smolagents — `pip install smolagents`

## 3. SCORING MATRIX — L6 Token Optimization (7 candidates)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **microsoft/LLMLingua** | ~5K | MIT | Microsoft Research ✅ | 3 | **A** | 20x compression + 1.5pp accuracy drop; v2 = 3-6x faster; LongLLMLingua RAG 94% |
| mksglu/context-mode (INSTALLED W6) | ~500 | MIT | named-author | INSTALLED | **A-** | ctx_batch_execute / ctx_execute / ctx_fetch_and_index; ~98% reduction |
| NVIDIA/kvpress | ~2K | Apache-2.0 | NVIDIA ✅ | 4 (CUDA) | **B+** | LLM KV cache compression; inference-layer |
| vllm-project/llm-compressor | ~3K | Apache-2.0 | vLLM ✅ | 4 (CUDA) | **B** | vLLM-optimized compression |
| open-compress/claw-compactor | ~1.5K | MIT | named-author | 3 | **B+** | 14-stage Fusion Pipeline; AST-aware; reversible; ZERO LLM cost; 15-82% |
| rtk-ai (RTK) | ~2K | MIT | named-author | 2 | **B** | `rtk init -g` Claude Code hook for automatic savings |
| Anthropic prompt-caching | n/a API | proprietary | Anthropic ✅ | 0 | **A** | `cache_control` system prompts/tool defs; 90% input cost savings |

**L6 TOP-5 ADOPT-NOW**:
1. context-mode (INCUMBENT keep)
2. microsoft/LLMLingua — `pip install llmlingua`
3. Anthropic prompt-caching — set `cache_control` (no install)
4. open-compress/claw-compactor — STUDY-PILOT (AST-aware code compression)
5. NVIDIA/kvpress — STUDY-PILOT only if CUDA local-serving

## 4. SCORING MATRIX — L7 Long-Running Agents (~8 candidates)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **anthropics/cwc-long-running-agents** | ~5K | MIT | Anthropic OFFICIAL ✅ | INSTALLED W6 | **A+** | 5 install-class primitives: Default-FAIL / Fresh-eval / PROGRESS.md / Kill-switch / Steer |
| Anthropic Claude Code Routines | n/a native | proprietary | Anthropic ✅ | 0 | **A+** | `/schedule`, `/loop`, `/cron`, GitHub event triggers |
| frankbria/ralph-claude-code | ~500 | MIT | named-author | 2 | **B** | Autonomous dev loop; intelligent exit detection |
| AnandChowdhary/continuous-claude | ~3K | MIT | named-author | 2 | **B** | Ralph loop + auto-PRs |
| affaan-m ECC dmux-workflows (INCUMBENT) | n/a in ECC | MIT | ECC plugin | INSTALLED | **A** | Cross-harness parallel CC+Codex+OpenCode |
| TaraJura/techtools-claude-code-cron-loop | ~1K | MIT | named-author | 3 | **B-** | Multi-agent cron + task board |
| letta-ai/letta | 22,732 | Apache-2.0 | Letta ✅ | 4 | **A-** | Cross-listed L5+L7 |
| ECC autonomous-agent-harness (INCUMBENT) | in ECC | MIT | ECC plugin | INSTALLED | **A** | Continuous-Agent-Loop skill + loop-operator |

**L7 TOP-5 ADOPT-NOW**:
1. anthropics/cwc-long-running-agents (INCUMBENT — verify in pure)
2. Anthropic Claude Code Routines (NATIVE)
3. ECC dmux + autonomous-agent-harness (INCUMBENT)
4. letta-ai/letta — STUDY-PILOT
5. frankbria/ralph-claude-code — STUDY-PILOT

## 5. SCORING MATRIX — L8 Multi-Agent Coordination (~10 candidates)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| awesome-agentic-patterns | ~2K | Apache-2.0 | community curated | 0 (cite-only) | **A** | TIER-1 ALT-IMPL; parallel-tool + swarm-migration + lane-based-queueing |
| ruvnet/claude-flow (Ruflo) | ~30K | MIT | rUv org | 4 | **C+** | UNVERIFIED 84.8% SWE-bench → Row-2 FAIL → REJECT-UNTIL-CONVERGENCE |
| **Anthropic CC Agent Teams** | n/a native | proprietary | Anthropic ✅ | 0 | **A+** | `$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS='1'` |
| microsoft/agent-framework workflows | cross-listed L5 | MIT | Microsoft ✅ | cross-listed | **A** | Graph: sequential/concurrent/handoff/group |
| alibaba/page-agent | 17,849 | Apache-2.0 | Alibaba ✅ | 3 | **B+** | JS in-page GUI agent |
| deepagents AgentTeam | cross-listed L5 | MIT | LangChain ✅ | cross-listed | **A** | spawn/assign/check/message/dissolve tools |
| awesome-claude-code-toolkit multi-agent-coordinator | in toolkit | MIT | community | 0 cite | **A-** | 7-pattern catalog cite anchor |
| InternLM/MindSearch | 6,855 | Apache-2.0 | InternLM ✅ | 4 | **B-** | LLM multi-agent web search; domain-specific |
| eigent-ai/eigent | 14,023 | Apache-2.0 | named-author | 4 | **C+** | Claude Cowork desktop alternative |
| aden-hive/hive | 10,341 | (verify) | named-author | n/a | **D** | REJECT-FOR-FIT FAST-CHURN ANTI-PATTERN (cycle-132 sibling precedent) |

**L8 TOP-5 ADOPT-NOW**:
1. Anthropic CC Agent Teams (NATIVE)
2. awesome-agentic-patterns (CITE-ONLY)
3. microsoft/agent-framework workflows (via L5)
4. deepagents AgentTeam (via L5)
5. awesome-claude-code-toolkit multi-agent-coordinator (CITE-ONLY)

**L8 REJECT**: aden-hive/hive (squashed-history fresh-paint), ruvnet/claude-flow (unverified bench + DUPLICATE 314 MCP tools)

## 6. SCORING MATRIX — L15 Browser/Web Automation (~14 candidates)

| repo | stars | license | named-T1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|
| **microsoft/playwright-mcp** | ~40K | Apache-2.0 | Microsoft ✅ | 1 | **A+** | OFFICIAL MS Playwright MCP; cross-browser; a11y-tree |
| **ChromeDevTools/chrome-devtools-mcp** | 39,694 | Apache-2.0 | Google Chrome ✅ | 1 | **A+** | OFFICIAL Google DevTools MCP; Chrome-only; debugging |
| **browser-use/browser-use** | 94,054 | MIT | Browser Use Zurich/SF ✅ | 2 | **A+** | DOM-driven; 78% benchmark; CC SKILL.md native install |
| browserbase/stagehand | ~15K | MIT | Browserbase ✅ | 2 | **A** | act()/extract()/observe() AI-first; auto-caching |
| lightpanda-io/browser | 30,332 | Apache-2.0 | Lightpanda | 5 | **B+** | Zig headless 9x faster than headless Chrome |
| steel-dev/steel-browser | 7,025 | Apache-2.0 | Steel | 3 | **B** | Browser API as managed runtime |
| Skyvern-AI/skyvern | 21,619 | **AGPL-3.0** | Skyvern ✅ | n/a | **D** | REJECT-FOR-FIT Probe-6 AGPL blocker |
| nanobrowser/nanobrowser | 12,984 | MIT | named-author | 3 | **B+** | Open-source Operator alt; Planner+Navigator+Validator |
| mendableai/firecrawl + firecrawl-mcp | ~82K | MIT SDK | Mendable.ai ✅ | INSTALLED (verify) | **A** | URL→clean LLM content; web research primary |
| alibaba/page-agent | 17,849 | Apache-2.0 | Alibaba ✅ | cross-listed | **B+** | JS in-page niche |
| lackeyjb/playwright-skill | 2,631 | MIT | named-author | 1 | **B** | CC Skill for Playwright |
| autoscrape-labs/pydoll | 6,845 | MIT | named-org | 3 | **B** | Chromium without WebDriver; anti-bot |
| getmaxun/maxun | 15,568 | **AGPL-3.0** | named-org | n/a | **D** | REJECT-FOR-FIT Probe-6 AGPL |
| mishushakov/llm-scraper | 6,376 | MIT | named-author | 2 | **B** | Webpage→structured; Playwright+Zod |

**L15 TOP-5 ADOPT-NOW**:
1. **microsoft/playwright-mcp** — .mcp.json `npx -y @playwright/mcp@latest`
2. **ChromeDevTools/chrome-devtools-mcp** — .mcp.json `npx -y chrome-devtools-mcp@latest`
3. **browser-use/browser-use** — `pip install browser-use` + SKILL.md curl
4. **mendableai/firecrawl** + firecrawl-mcp — verify .mcp.json
5. **browserbase/stagehand** — `npm install @browserbasehq/stagehand`

**L15 REJECT**: Skyvern (AGPL), getmaxun/maxun (AGPL)

**L15 SOTA hybrid pattern** (2026 industry convergence): playwright-mcp (deterministic) + browser-use (AI-driven) — "80% predictable via Playwright, 20% AI-understanding via Browser Use".

## 7. NATIVE-CC-INSTALL-PATH SUMMARY

### .mcp.json fragment for L15

```json
{
  "mcpServers": {
    "playwright": {"command": "npx", "args": ["-y", "@playwright/mcp@latest"], "env": {}},
    "chrome-devtools": {"command": "npx", "args": ["-y", "chrome-devtools-mcp@latest"], "env": {}},
    "firecrawl": {"command": "npx", "args": ["-y", "firecrawl-mcp"], "env": {"FIRECRAWL_API_KEY": "${FIRECRAWL_API_KEY}"}}
  }
}
```

### Tier-2 pip/uv install

```bash
uv pip install agent-framework deepagents pydantic-ai smolagents browser-use llmlingua
```

### Claude Code Skill install (browser-use)

```bash
mkdir -p Z:/claude-sota-pure/.claude/skills/browser-use
curl -o Z:/claude-sota-pure/.claude/skills/browser-use/SKILL.md \
  https://raw.githubusercontent.com/browser-use/browser-use/main/skills/browser-use/SKILL.md
```

### Anthropic native enable

```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = '1'
# Then test: /schedule, /loop, /cron
```

## 8. CR-12 6-CLASS DISPOSITION SUMMARY

| Class | Count | Examples |
|---|---|---|
| GENUINELY-NEW | 5 | agent-framework, pydantic-ai, LLMLingua, playwright-mcp, chrome-devtools-mcp |
| PARTIAL-OVERLAP | 6 | deepagents, agentscope, agno, smolagents, openai-agents-python, ag2 |
| PROVIDER-COMPLEMENT | 14 | letta, fast-agent, MassGen, kvpress, llm-compressor, claw-compactor, rtk-ai, page-agent, steel-browser, browser-use, stagehand, firecrawl, nanobrowser, llm-scraper |
| DUPLICATE-FUNCTIONALITY | 5 | autogen, ag2, PocketFlow, ralph-claude-code, continuous-claude |
| SUPERSEDED-BY-X | 1 | autogen → MAF |
| REJECT-FOR-FIT | 4 | aden-hive/hive, Skyvern, maxun, ruvnet/claude-flow |
| INCUMBENT-VERIFY | 4 | context-mode, cwc-long-running-agents, ECC plugin, firecrawl-mcp |

## 9. TOP-25 UNIQUE ADOPT-NOW RANKED LIST

| # | Repo | Layer | Grade | Action |
|---|---|---|---|---|
| 1 | anthropics/cwc-long-running-agents | L7 | A+ | INCUMBENT — verify in pure |
| 2 | Anthropic Claude Code Routines | L7 | A+ | NATIVE — enable |
| 3 | Anthropic CC Agent Teams | L8 | A+ | NATIVE — env-flag |
| 4 | microsoft/playwright-mcp | L15 | A+ | INSTALL .mcp.json |
| 5 | ChromeDevTools/chrome-devtools-mcp | L15 | A+ | INSTALL .mcp.json |
| 6 | browser-use/browser-use | L15 | A+ | INSTALL pip + SKILL.md |
| 7 | microsoft/agent-framework | L5 | A | INSTALL pip |
| 8 | langchain-ai/deepagents | L5 | A | INSTALL pip |
| 9 | pydantic/pydantic-ai | L5 | A | INSTALL pip |
| 10 | microsoft/LLMLingua | L6 | A | INSTALL pip |
| 11 | context-mode (INCUMBENT) | L6 | A- | KEEP |
| 12 | mendableai/firecrawl + firecrawl-mcp | L15 | A | INSTALL .mcp.json verify |
| 13 | letta-ai/letta | L5+L7 | A- | STUDY-PILOT |
| 14 | huggingface/smolagents | L5 | A- | STUDY-PILOT |
| 15 | awesome-agentic-patterns | L8 | A | CITE-ONLY |
| 16-25 | ECC dmux/autonomous-harness/stagehand/claw-compactor/page-agent/fast-agent/openai-agents-python/nanobrowser/kvpress/PocketFlow | various | B+/B | STUDY-PILOT / OPTIONAL |

## 10. REJECT-CONFIRMED list

- aden-hive/hive — FAST-CHURN-ANTI-PATTERN
- Skyvern-AI/skyvern — AGPL-3.0 (Probe 6 blocker)
- getmaxun/maxun — AGPL-3.0 (Probe 6 blocker)
- microsoft/autogen baseline — MAINTENANCE-MODE 2026-03 (SUPERSEDED-BY-X)
- ruvnet/claude-flow — REJECT-UNTIL-CONVERGENCE (unverified 84.8% SWE-bench + DUPLICATE 314 MCP tools)

## 11. CITE-ANCHOR INDEX (TIER-1-DIRECT)

1. microsoft/agent-framework — `https://github.com/microsoft/agent-framework/blob/c885ca3/README.md` [VERIFIED 2026-05-15]
2. browser-use/browser-use — HEAD 933e28c [VERIFIED 2026-05-15]
3. microsoft/LLMLingua + EMNLP'23 + ACL'24 + llmlingua.com
4. Anthropic Claude Code Routines — anthropic.com engineering blog Apr 14 2026
5. anthropics/cwc-long-running-agents — HEAD `ffd563d668a97a38d4aa092bf0d5b1507c046629`
6. microsoft/playwright-mcp + ChromeDevTools/chrome-devtools-mcp — both OFFICIAL repos
7. letta-ai/letta — letta.com/blog/letta-v1-agent

## 12. HONEST-NON-FINDINGS

1. STAND-IN-NOTICE: Sonnet 4.7 [1m] dispatch; cross-model gate NOT satisfied
2. No internet refresh of star counts beyond GitHub MCP query 2026-05-15 16:25 UTC
3. No live MCP smoke probe of playwright-mcp/chrome-devtools-mcp/firecrawl-mcp
4. No license deep-probe of firecrawl hosted vs SDK split (mixed)
5. No fabrication-test of ruvnet/claude-flow 84.8% SWE-bench claim → REJECT-UNTIL-CONVERGENCE
6. No squashed-history probe of aden-hive/hive per cycle-132 sibling precedent → REJECT
7. No deep eval of agent-framework vs deepagents migration friction
8. No probe of letta server install footprint — defer to memory wave
9. GitHub MCP rate-limited mid-dispatch (5/9 succeeded); switched to WebSearch breadth
10. No verification of firecrawl-mcp install status in pure runtime — manifest §3 must verify

## 13. RECOMMENDED PURE-RUNTIME INSTALL ORDER

**Tier 1 — foundations + native + INCUMBENT-verify**: verify cwc/ECC/context-mode in pure; enable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` and Anthropic Routines

**Tier 2 — browser-MCP + L15 framework**: .mcp.json + browser-use pip + SKILL.md

**Tier 3 — Python agent frameworks L5**: `uv pip install agent-framework deepagents pydantic-ai smolagents`

**Tier 4 — token-opt**: `uv pip install llmlingua` + Anthropic cache_control

**Tier 5 — STUDY-PILOT (defer)**: letta / claw-compactor / stagehand

SYNTHESIS COMPLETE

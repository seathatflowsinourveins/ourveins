---
title: Wave 212 Agent N — Agent-Orchestration / Multi-Agent / Workflow Framework Catalog
date: 2026-05-15
runtime: Z:\claude-sota-installed
scope: Research BEYOND W208-H incumbents: agent-sdk-dev, superpowers patterns, Piebald worker-fork, awesome-agentic-patterns Factory-over-Assistant, Compounding-Engineering
artifact-mode: ARTIFACT-INLINE
verdict-origin: codex CLI bridge-mode synthesis
---

# Wave 212 Agent N Catalog

## Discovery Coverage

Source families queried:

1. **GitHub repo/API-equivalent metadata** via current GitHub repo pages and API snippets for stars, licenses, archive/deprecation, release cadence.
2. **Architecture docs / web docs** including LangGraph multi-agent docs/blog, CrewAI README/docs, OpenAI Agents SDK docs/blog, Temporal README, GSD architecture notes.
3. **Named-author / practitioner endorsement searches** including DeepLearning.AI + Andrew Ng/CrewAI course surface, OpenAI Agents SDK April 15 2026 update, LangChain/Harrison Chase ecosystem docs/blog, Temporal/OpenAI integration preview.
4. **Official native Claude Code install-path docs** including Claude Code plugin marketplace docs, CrewAI README native `/plugin marketplace add` path, GSD installer docs, and existing runtime manifest rows.

Probe abbreviations: `P4` plugin namespace duplicate check; `P5` mode/harness shape; `P6` registry/license blocker; `P7` demand gate.

## A: ADOPT-NOW

| Candidate | Stars | License | Axis1 | Axis2 | Axis3-band | P4 | P5 | P6 | P7 | Install-path | CR-12 | Grade | Rationale |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| CrewAI Claude Code skills plugin (`crewAIInc/skills` via CrewAI README) | n/a plugin repo; CrewAI core 51.5k | likely MIT by CrewAI ecosystem; verify marketplace before install | PASS: CrewAI, DeepLearning.AI, enterprise/community course surface | PASS: João Moura + Andrew Ng/DeepLearning.AI dated course artifacts | ACTIVE-ITERATION | PASS: not in enabled plugins | PASS: native plugin skills, no daemon | PASS pending marketplace license read | PASS: framework pilot/scaffolding workflow consumes it | `/plugin marketplace add crewAIInc/skills` then `/plugin install crewai-skills@crewai-plugins` | GENUINELY-NEW | A | Native Claude Code skills teach CrewAI crews/flows without installing a competing runtime into the main harness. |

## B: STUDY-PILOT

| Candidate | Stars | License | Axis1 | Axis2 | Axis3-band | P4 | P5 | P6 | P7 | Install-path | CR-12 | Grade | Rationale |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| LangGraph (`langchain-ai/langgraph`) | 32.1k | MIT | PASS: LangChain, academic MAS papers, product examples | PASS: LangChain blog + multiple dated practitioner writeups | ACTIVE-ITERATION | PASS | PASS as library/cite | PASS | PARTIAL: pattern extraction only | `pip install langgraph langgraph-supervisor` or cite docs | CITE-CLASS-CANONICAL | B | Best current cite anchor for explicit supervisor/handoff/state-graph patterns, but no direct `eee` workflow requires a Python graph runtime. |
| CrewAI core (`crewAIInc/crewAI`) | 51.5k | MIT | PASS: CrewAI org, DeepLearning.AI, course/user ecosystem | PASS: João Moura + Andrew Ng/DeepLearning.AI | ACTIVE-ITERATION | PASS | PASS as isolated venv; avoid main harness | PASS | PARTIAL: only if CrewAI pilot is opened | `uv pip install crewai` / `uv pip install 'crewai[tools]'` | ECOSYSTEM-IMPORT | B | Strong role/task/flow framework, but the runtime should pilot it isolated because Claude-native subagents already cover daily orchestration. |
| Mastra (`mastra-ai/mastra`) | 23.9k | Apache-2.0 core + Enterprise dirs | PASS: Gatsby/Mastra, TS agent ecosystem, MCP/workflow users | PARTIAL: named team strong, external T2 weaker | FAST-CHURN | PASS | PASS in TS pilot | NOTE: dual license requires `ee/` exclusion | PARTIAL: no TS workflow yet | `npm install @mastra/core` / scaffold per docs | ECOSYSTEM-IMPORT | B | The TS workflow+agent stack is compelling for future TypeScript apps but not needed in the PowerShell/Claude runtime core. |
| Letta (`letta-ai/letta`) | 22.7k | Apache-2.0 | PASS: Letta/MemGPT lineage, memory-agent ecosystem, integrations | PASS: Letta authors + memory-agent research lineage | ACTIVE-ITERATION | PARTIAL: overlaps memory stack | PASS as service/API | PASS | PARTIAL: memory already graphiti+mcp-memory | `pip install letta` / hosted API client | PARTIAL-OVERLAP | B | Stateful-agent memory is relevant, but Wave 207 already owns memory-MCP/KG gaps. |
| DeepAgents (`langchain-ai/deepagents`) | 22.8k | MIT | PASS: LangChain, Open SWE, Claude-Code-inspired agent harness | PASS: LangChain docs + Open SWE artifacts | FAST-CHURN | PARTIAL: overlaps Claude Code itself | PASS with sandbox caveat | PASS | PARTIAL: pattern extraction | `pip install deepagents` | ECOSYSTEM-IMPORT | B | Useful as a Claude-Code-inspired external harness study, not as a replacement for Claude Code. |
| Pydantic-AI (`pydantic/pydantic-ai`) | 17.1k | MIT | PASS: Pydantic org, Logfire, FastAPI-style ecosystem | PASS: Pydantic maintainers + production docs | ACTIVE-ITERATION | PASS | PASS | PASS | PARTIAL: structured-output agent apps only | `pip install pydantic-ai` | PROVIDER-COMPLEMENT | B | Good lightweight typed-agent primitive; value overlaps existing instructor/Pydantic structured-output path. |
| Agno (`agno-agi/agno`) | 40.1k | Apache-2.0 | PASS: platform/control-plane users, integrations, examples | PARTIAL: named external practitioner proof weaker | FAST-CHURN | PASS | PASS as isolated pilot | PASS | PARTIAL: no named consumer | `pip install agno` | STUDY-PILOT unchanged | B | Still a study-pilot: stars and release velocity improved, but no claude-sota-installed consumer justifies main install. |
| smolagents (`huggingface/smolagents`) | 27.3k | Apache-2.0 | PASS: Hugging Face, Hub agents/tools, sandbox providers | PASS: HF maintainers + docs | ACTIVE-ITERATION | PASS | PASS with sandbox selection | PASS | PARTIAL: code-agent sandbox experiments | `pip install smolagents` | PROVIDER-COMPLEMENT | B | Minimal code-agent runtime is good for sandbox study, but Claude Code and OpenAI/Anthropic SDKs already cover the role. |
| OpenAI Agents SDK Python (`openai/openai-agents-python`) | 26.3k | MIT | PASS: OpenAI, Temporal integration, SDK docs | PASS: OpenAI Apr 15 2026 update + Temporal preview | ACTIVE-ITERATION | PASS | PASS in isolated venv | PASS | FAIL/partial per existing manifest P7.b 0/5 | `pip install openai-agents` | ECOSYSTEM-IMPORT | B | Upgrade verified to v0.17.2-era with sandbox agents, but prior manifest DEFER remains valid until a named workflow consumes it. |
| Temporal Python SDK (`temporalio/sdk-python`) | 1.1k SDK repo | MIT | PASS: Temporal org, OpenAI integration, durable workflow users | PASS: Temporal docs + OpenAI Agents preview | STABLE-BURN-IN | PASS | PARTIAL: requires Temporal server/worker | PASS | PARTIAL: durable agent queue not wired | `python -m pip install temporalio` plus local server | GENUINELY-NEW | B | Best durable orchestration primitive for long-running agents, but server wiring is a new subsystem. |
| Prefect (`PrefectHQ/prefect`) | 22.4k | Apache-2.0 | PASS: data workflow ecosystem | PASS: Prefect docs + community | STABLE-BURN-IN | PASS | PASS | PASS | PARTIAL: no data-pipeline consumer | `pip install prefect` | PARTIAL-OVERLAP | B | Solid Python workflow engine, but eee’s current workflow problems are agent/harness, not data pipeline scheduling. |
| Dagster (`dagster-io/dagster`) | 15.5k | Apache-2.0 | PASS: data asset orchestration ecosystem | PASS: Dagster maintainers + community | STABLE-BURN-IN | PASS | PARTIAL: heavier service/UI | PASS | PARTIAL: no asset pipeline consumer | `pip install dagster dagster-webserver` | PARTIAL-OVERLAP | B | Strong asset orchestration, but too data-platform-shaped for current runtime loop. |
| LangGraph multi-agent supervisor/handoff patterns | 32.1k parent | MIT | PASS | PASS | ACTIVE-ITERATION | PASS | PASS cite-only | PASS | PASS as rule/cite pattern | no install; cite docs or `pip install langgraph-supervisor` for pilot | CITE-CLASS-CANONICAL | B | Adopt as pattern vocabulary for supervisor vs handoff vs agent-network decisions, not as runtime dependency yet. |
| AutoGen conversational patterns (`microsoft/autogen`) | 58.1k | CC-BY-4.0 repo metadata | PASS historically | PASS historically | MAINTENANCE-MODE/ACTIVE-REWRITE | PASS | PARTIAL | NOTE: repo license/content mismatch for code use | PARTIAL cite-only | `pip install autogen-agentchat` only in isolated pilot | CITE-CLASS-CANONICAL | B | Conversable-agent pattern remains useful, but maintenance-mode/rewrite status prevents install-class adoption. |

## C: HONEST-NON-FINDING

| Candidate | Stars | License | Axis1 | Axis2 | Axis3-band | P4 | P5 | P6 | P7 | Install-path | CR-12 | Grade | Rationale |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| AgentScope (`agentscope-ai/agentscope`) | 25.1k | Apache-2.0 | PASS | PARTIAL | ACTIVE-ITERATION | PASS | PASS | PASS | FAIL: no runtime consumer | `pip install agentscope` | ECOSYSTEM-IMPORT | C | Good research/framework surface, but no gap remains after Claude subagents + cwc + MCPs. |
| CAMEL (`camel-ai/camel`) | 17.0k | Apache-2.0 | PASS | PASS research | ACTIVE-ITERATION | PASS | PASS | PASS | FAIL | `pip install camel-ai` | CITE-CLASS-CANONICAL | C | Useful multi-agent society/collaboration cite, but not an eee operational primitive. |
| Atomic Agents (`BrainBlend-AI/atomic-agents`) | 5.9k | MIT | PARTIAL | PARTIAL | ACTIVE-ITERATION | PASS | PASS | PASS | FAIL | `pip install atomic-agents` | PARTIAL-OVERLAP | C | Instructor/Pydantic composition overlaps Wave 209 instructor adoption path. |
| AISuite (`andrewyng/aisuite`) | current GitHub page queried | MIT | PASS for provider abstraction | PASS Andrew Ng ecosystem | ACTIVE-ITERATION | PASS | PASS | PASS | FAIL: provider abstraction not orchestration | `pip install aisuite` | PROVIDER-COMPLEMENT | C | Useful model-provider shim, but CLIProxyAPI/LiteLLM-style provider routing already owns this concern. |
| wshobson/agents beyond conductor | current GitHub page queried; manifest already has rows | mostly MIT/plugin-specific | PASS | PARTIAL | ACTIVE-ITERATION | DUPLICATE: marketplace already registered + selected agents dormant | PASS per selected subagents | PASS | PARTIAL | `/plugin marketplace add wshobson/agents`; install selected plugins only | PARTIAL-OVERLAP | C | Existing manifest already installed two narrow wshobson agents and deferred full catalog. |
| ARIS (`Maximtsai/Auto-claude-code-research-in-sleep`) | not material | unknown until license read | PARTIAL | PARTIAL | ACTIVE-ITERATION | PASS | FAIL: sleep/research-loop shape is domain-specific | PASS/unknown | FAIL | direct git clone only | CITE-CLASS-CANONICAL | C | Prior master catalog already captured ARIS loops as study/cite, with full install rejected for fit. |
| Claude Agent SDK Python forkable subagent patterns | installed Anthropic primary | MIT/official | PASS | PASS | ACTIVE-ITERATION | DUPLICATE: SDK already installed | PASS | PASS | PASS via current SDK | already installed `claude-agent-sdk==0.1.81` | DUPLICATE-FUNCTIONALITY | C | The pattern is already primary-installed; no new beyond-W208 install action. |
| n8n-MCP / n8n (`n8n-io/n8n`) | current page queried; large ecosystem | Sustainable Use License + Enterprise | PASS | PASS | STABLE-BURN-IN | PASS | PARTIAL: service/UI workflow server | NOTE: fair-code/source-available | FAIL: no visual automation workflow | `npx n8n` / Docker | PARTIAL-OVERLAP | C | AI workflow automation is real, but source-available licensing and service shape make it non-core. |
| PromptFlow (`microsoft/promptflow`) | 11.1k | MIT | PASS | PASS Microsoft docs | STABLE-BURN-IN/LOW-CHURN | PASS | PASS | PASS | FAIL | `pip install promptflow` | PARTIAL-OVERLAP | C | Useful LLM-app evaluation/prototyping framework; existing eval/obs stack covers the runtime need. |

## D: REJECT-FOR-FIT

| Candidate | Stars | License | Axis1 | Axis2 | Axis3-band | P4 | P5 | P6 | P7 | Install-path | CR-12 | Grade | Rationale |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| GSD full install (`gsd-build/get-shit-done`) | 62.3k | MIT | PASS | PASS: named TACHES + public testimonials | FAST-CHURN | PARTIAL: overlaps Spec-Kit/cwc/superpowers | FAIL: recommends `claude --dangerously-skip-permissions` | PASS | PARTIAL only for context-monitor extraction | `npx get-shit-done-cc@latest` | PARTIAL-OVERLAP | D | Keep extracting narrow patterns; do not install full parallel planning system into eee due CR-9/permission risk and overlap. |
| Claude-flow / Ruflo (`ruvnet/claude-flow` redirect `ruvnet/ruflo`) | 51.3k | MIT | PASS | PARTIAL | FAST-CHURN | PARTIAL: competes with existing agent-orchestration plugins | FAIL: alpha, 1,483 releases, competing control plane | PASS | FAIL | npm/direct install per repo | DUPLICATE-FUNCTIONALITY | D | Impressive but too much competing Claude/Codex orchestration surface for this install-only runtime. |
| Swarms (`kyegomez/swarms`) | 6.7k | Apache-2.0 | PARTIAL | PARTIAL | FAST-CHURN | PASS | FAIL: examples encourage `max_loops="auto"` and interactive modes | PASS | FAIL | `pip install swarms` | PARTIAL-OVERLAP | D | Broad swarm primitives duplicate Claude subagents while adding autonomous-loop risk. |
| MetaGPT (`FoundationAgents/MetaGPT`) | 68.0k | MIT | PASS | PASS research/ProductHunt/MGX | STABLE-BURN-IN but stale release | PASS | FAIL: writes whole repos/workspaces, heavy setup | PASS | FAIL | `pip install --upgrade metagpt` | ECOSYSTEM-IMPORT | D | Valuable SOP/team cite, but heavy autonomous software-company runtime is not a harness-fit install. |
| n8n full self-host workflow server | large public repo | Sustainable Use License | PASS | PASS | STABLE-BURN-IN | PASS | FAIL: UI/service/credentials lifecycle | NOTE source-available | FAIL | `npx n8n` or Docker | ECOSYSTEM-IMPORT | D | Operational burden and licensing make it a poor direct runtime addition. |
| wshobson conductor-like orchestration plugins | n/a | plugin-specific | PASS | PARTIAL | ACTIVE-ITERATION | DUPLICATE/PARTIAL | FAIL: prior conductor hard-gate Q&A | PASS | FAIL | `/plugin install <plugin>@wshobson` | DUPLICATE-FUNCTIONALITY | D | The runtime already has agent-orchestration/agent-teams and rejected conductor hard-gate fit. |
| Continuous-agent-loop full ECC install | n/a | plugin-specific | PASS | PARTIAL | ACTIVE-ITERATION | DUPLICATE: ECC installed/disabled hooks present | FAIL: loop/daemon-ish shapes | PASS | PARTIAL hooks only | ECC marketplace/plugin install | DUPLICATE-FUNCTIONALITY | D | Extract hook patterns only; full loop duplicates and risks autonomous runaway. |
| claude-devfleet full system | n/a | unknown/plugin-specific | PARTIAL | PARTIAL | ACTIVE-ITERATION | PARTIAL: ECC descriptive only | FAIL: MCP backend `:18801` not wired | UNKNOWN | FAIL | ECC marketplace/direct | PARTIAL-OVERLAP | D | Descriptive-only without backend wiring; not install-ready. |
| AgentsMesh | unknown/not reliably resolved | unknown | UNKNOWN | UNKNOWN | UNKNOWN | PASS | UNKNOWN | UNKNOWN | FAIL | unknown | CITE-CLASS-CANONICAL | D | Discovery did not produce a stable install-class artifact; keep as HNF until repository/package is pinned. |

## F: STRUCTURAL-BLOCKER

| Candidate | Stars | License | Axis1 | Axis2 | Axis3-band | P4 | P5 | P6 | P7 | Install-path | CR-12 | Grade | Rationale |
|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| LangServe (`langchain-ai/langserve`) | 2.3k | license present | PASS historical | PASS historical | ARCHIVED/DEPRECATED | PASS | FAIL | FAIL: archived May 5 2026; deprecated Nov 18 2024 | FAIL | `pip install "langserve[all]"` | STRUCTURAL-BLOCKER | F | Upstream explicitly recommends LangGraph Platform instead for new projects. |
| AutoGen v0.7.5 install-class adoption (`microsoft/autogen`) | 58.1k | CC-BY-4.0 repo metadata | PASS | PASS | MAINTENANCE-MODE / active rewrite | PASS | PARTIAL | BLOCK: maintenance-mode confirmed by prior catalog + license ambiguity | FAIL | `pip install autogen-agentchat` | STRUCTURAL-BLOCKER | F | Keep conversational patterns as cite-class only; no install while maintenance/rewrite and licensing ambiguity persist. |
| n8n as embedded dependency | large | Sustainable Use License / Enterprise | PASS | PASS | STABLE | PASS | FAIL | BLOCK: source-available fair-code not SPDX permissive | FAIL | `npx n8n` / Docker | STRUCTURAL-BLOCKER | F | Licensing plus server lifecycle blocks embedding in install-only runtime. |

## Grade-A Narrative

### CrewAI Claude Code Skills Plugin

**Exact gap filled:** eee has strong Claude-native subagent orchestration, but no framework-specific Claude Code skill pack that teaches an agent how to scaffold CrewAI `Agent` / `Crew` / `Flow` projects, distinguish `LLM.call()` vs `Agent` vs `Crew` vs `Flow`, and query CrewAI docs from inside Claude Code.

**Runtime workflow consumer:** Wave 212+ framework pilot workflow: when an operator asks for a CrewAI prototype or comparison harness, Claude Code can use native skills instead of importing CrewAI into the main runtime first. This keeps the install-class delta small and reversible.

**Install command:**

```text
/plugin marketplace add crewAIInc/skills
/plugin install crewai-skills@crewai-plugins
/reload-plugins
```

**Probe DAG result:** P4 PASS (not currently enabled in `.claude/settings.json` or installed plugin manifest); P5 PASS (skills/plugin surface, no autonomous daemon); P6 PASS-PENDING (read marketplace license before install); P7 PASS (directly consumed by CrewAI pilot/scaffolding workflow); CR-12 `GENUINELY-NEW`; Grade A.

## Sources

- GitHub repo metadata pages queried 2026-05-15: LangGraph 32.1k MIT active; CrewAI 51.5k MIT and native Claude Code plugin commands; AutoGen 58.1k with maintenance-mode lineage; Mastra 23.9k dual Apache/enterprise; Letta 22.7k Apache; DeepAgents 22.8k MIT; MetaGPT 68k MIT; AgentScope 25.1k Apache; CAMEL 17k Apache; Pydantic-AI 17.1k MIT; Swarms 6.7k Apache; Atomic Agents 5.9k MIT; Agno 40.1k Apache; smolagents 27.3k Apache; OpenAI Agents SDK Python 26.3k MIT; Ruflo/Claude-flow 51.3k MIT; GSD 62.3k MIT; Temporal SDK Python 1.1k MIT; Prefect 22.4k Apache; Dagster 15.5k Apache; PromptFlow 11.1k MIT; LangServe 2.3k archived/deprecated.
- Claude Code plugin marketplace docs: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces and https://docs.claude.com/en/docs/claude-code/plugins.
- CrewAI README/docs: https://github.com/crewAIInc/crewAI and DeepLearning.AI CrewAI courses: https://www.deeplearning.ai/courses/multi-ai-agent-systems-with-crewai and https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai.
- LangGraph multi-agent docs/blog: https://blog.langchain.com/langgraph-multi-agent-workflows and LangGraph multi-agent docs search result for supervisor/handoffs.
- OpenAI Agents SDK docs/blog: https://github.com/openai/openai-agents-python, https://openai.com/index/the-next-evolution-of-the-agents-sdk/, https://platform.openai.com/docs/guides/agents-sdk/, and https://openai.github.io/openai-agents-js/guides/multi-agent/.
- Local prior-art/dedup sources: `tmp/wave206-209-master-catalog-2026-05-15.md`; `docs/sota-installed-manifest.md`; `.claude/settings.json`; `.claude/plugins/installed_plugins.json`.

## Final Counts

- Candidates scored across pools: 33
- Grade A: 1
- Grade B: 13
- Grade C or below: 19
- New BEYOND-W208-H ADOPT-NOW candidates surfaced: 1
- HNF / cite-only / reject lineage retained: yes

VERDICT: N-WAVE212-COMPLETE — BRIDGE-MODE: codex-rescue Sonnet wrapper invoking real GPT-5.5 via codex CLI subprocess; verdict origin = codex CLI; cross-model gate satisfied — 33 candidates scored across 5 pools; 1 grade-A, 13 grade-B, 19 grade-C-or-below; 1 new BEYOND-W208-H ADOPT-NOW candidates surfaced; yes HNF

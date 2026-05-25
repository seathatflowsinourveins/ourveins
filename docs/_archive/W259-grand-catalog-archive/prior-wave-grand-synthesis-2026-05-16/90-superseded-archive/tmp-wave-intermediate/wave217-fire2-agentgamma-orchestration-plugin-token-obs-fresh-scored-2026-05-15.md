# Wave 217 Fire 2 Agent Gamma - Fresh SOTA Scored Catalog

Date: 2026-05-15  
Dispatch: CROSS-MODEL BRIDGE-MODE  
Scope: Agent-Orchestration + Plugin-Marketplace + Token-Optimization + Observability for `Z:/claude-sota-pure`

## 1. Discovery Summary

Primary scan combined local clones under `Z:/repos/deps`, installed plugin state under `Z:/claude-sota-installed/.claude/plugins/{marketplaces,cache}`, and fresh GitHub API metadata captured on 2026-05-15 in `tmp/wave217-github-meta.json`. Five requested slugs were corrected from local remotes before scoring: `anthropics/claude-agent-acp` -> `agentclientprotocol/claude-agent-acp`, `Piebald/claude-code-system-prompts` -> `Piebald-AI/claude-code-system-prompts`, `EmilLindfors/awesome-agentic-patterns` -> `nibzard/awesome-agentic-patterns`, `bytedance-research/deer-flow` -> `bytedance/deer-flow`, and `ContextLab/context-mode` -> `mksglu/context-mode`.

Installed runtime marketplace inventory: 16 marketplace dirs and 11 cache dirs. Marketplace plugin-json counts: `claude-plugins-official=37`, `claude-code-workflows=81`, `claude-code-skills=53`, `claude-settings=78`, `antigravity-awesome-skills=79`, `context-mode=1`, `openai-codex=1`, `addy-agent-skills=1`, `everything-claude-code=2`, plus domain packs. Cache plugin-json counts include `claude-plugins-official=2020`, `claude-code-skills=29`, `claude-code-workflows=8`, `context-mode=2`, `everything-claude-code=2`, `openai-codex=1`.

Probe interpretation used here:

| Probe | Gate interpretation |
|---|---|
| P1 count-OVER | Catalog claims/counts are checked against file/package shape or treated as marketing-only. |
| P2 SDK-vs-CLI | SDK/framework rows are not treated as Claude Code plugin installs unless they expose CLI/plugin wiring. |
| P3 architecture API | Pure-runtime compatible when it can live as plugin, hook, MCP, command, or external service with clear boundaries. |
| P4 namespace collision | Already-loaded or overlapping plugin namespaces require selective import, not blind bulk install. |
| P5 mode harness | Rejects hard interactive setup and autonomous loops that cannot run inside `/loop` or hook-driven mode. |
| P6 direct registry | License/package/readme/release surface must be directly inspectable. |
| P7 demand split | `.a` rejects no-demand imports; `.b` studies primitives that create a new workflow but need pilot proof. |

Verdict sort order: `ADOPT-NOW > STUDY-PILOT.b > DEMOTED > REJECT-FOR-FIT`.

## 2. Scored Tables

### Cohort 1 - Plugin Marketplaces

| repo | stars | axis_1 | axis_2 | axis_3 | license | probe_4 | probe_5 | cc_native_path | wiring_difficulty | composite_verdict |
|---|---:|---|---|---|---|---|---|---|---:|---|
| obra/superpowers | 192681 | PASS-FIRM | named-T2 maintainer | sustained-active | MIT | PASS selective namespace | autonomous-compatible | YES | 2 | ADOPT-NOW |
| affaan-m/everything-claude-code | 183144 | PASS-FIRM | named catalog artifact | sustained-active | MIT | PASS already loaded | hook/plugin compatible | YES | 2 | ADOPT-NOW |
| garrytan/gstack | 97509 | PASS-FIRM | named-T2 artifact | sustained-active | MIT | PASS no local collision | Codex/skill pattern compatible | PARTIAL | 3 | ADOPT-NOW |
| addyosmani/agent-skills | 42006 | PASS-FIRM | Google Chrome DevRel named author | sustained-active | MIT | PASS already loaded | skill compatible | YES | 1 | ADOPT-NOW |
| wshobson/agents | 35448 | PASS-FIRM | named agent catalog | sustained-active | MIT | PASS with agent-name audit | subagent compatible | YES | 2 | ADOPT-NOW |
| alirezarezvani/claude-skills | 14935 | PASS-FIRM | named skills catalog | sustained-active | MIT | PASS with skill-name audit | skill compatible | YES | 2 | ADOPT-NOW |
| wshobson/commands | 2460 | PASS-FIRM | named command catalog | stable-burn-in | MIT | PASS with slash collision audit | command compatible | YES | 2 | ADOPT-NOW |
| quemsah/awesome-claude-plugins | 698 | PARTIAL | awesome-list artifact | active | NOASSERTION | PASS read-only index | no runtime harness | NO | 1 | STUDY-PILOT.b |
| hesreallyhim/awesome-claude-code | 43851 | PASS | awesome-list artifact | stable | NOASSERTION / CC-BY-NC-ND noted by brief | FAIL non-install list/license | no runtime harness | NO | 1 | REJECT-FOR-FIT |

### Cohort 2 - Orchestration Frameworks

| repo | stars | axis_1 | axis_2 | axis_3 | license | probe_4 | probe_5 | cc_native_path | wiring_difficulty | composite_verdict |
|---|---:|---|---|---|---|---|---|---|---:|---|
| langchain-ai/deepagents | 22826 | PASS-FIRM | LangChain named artifact | sustained-active | MIT | PASS no plugin collision | loop-compatible as library pattern | PARTIAL | 3 | ADOPT-NOW |
| langchain-ai/langgraph | 32127 | PASS-FIRM | LangChain named artifact | sustained-active | MIT | PASS no plugin collision | graph-loop compatible | PARTIAL | 4 | STUDY-PILOT.b |
| openai/openai-agents-python | 26338 | PASS-FIRM | OpenAI official SDK | sustained-active | MIT | PASS no plugin collision | SDK loop compatible | PARTIAL | 3 | ADOPT-NOW |
| block/goose | 45249 | PASS-FIRM | Block/AAIF named artifact | sustained-active | Apache-2.0 | PASS external runtime | autonomous CLI compatible | PARTIAL | 4 | STUDY-PILOT.b |
| agentclientprotocol/claude-agent-acp | 1763 | PASS-FIRM | ACP adapter artifact | active | MIT | PASS adapter namespace | direct agent bridge | YES | 2 | ADOPT-NOW |
| agentclientprotocol/python-sdk | 255 | PASS | ACP standard artifact | active | Apache-2.0 | PASS no collision | SDK compatible | PARTIAL | 3 | ADOPT-NOW |
| coder/acp-go-sdk | 167 | PASS | ACP standard artifact | active | Apache-2.0 | PASS no collision | SDK compatible | PARTIAL | 3 | ADOPT-NOW |
| agno-agi/agno | 40144 | PASS-FIRM | Agno named platform | sustained-active | Apache-2.0 | PASS no plugin collision | external framework | PARTIAL | 4 | STUDY-PILOT.b |
| huggingface/smolagents | 27325 | PASS-FIRM | Hugging Face official | sustained-active | Apache-2.0 | PASS no collision | library compatible | PARTIAL | 3 | STUDY-PILOT.b |
| mastra-ai/mastra | 23916 | PASS | Mastra named artifact | sustained-active | NOASSERTION | PASS no collision | JS framework loop | PARTIAL | 4 | STUDY-PILOT.b |
| MervinPraison/PraisonAI | 7761 | PASS | named platform | sustained-active | MIT | PASS no collision | external framework | PARTIAL | 4 | STUDY-PILOT.b |
| bytedance/deer-flow | 33142 | PASS | ByteDance named artifact | sustained-active | MIT | PASS no collision | workflow app, not plugin | NO | 5 | STUDY-PILOT.b |
| crewAIInc/crewAI | 51481 | PASS-FIRM | CrewAI named artifact | sustained-active | MIT | PASS no collision | external framework | PARTIAL | 4 | DEMOTED |
| microsoft/autogen | 58060 | PASS-FIRM | Microsoft named artifact | stable-active | CC-BY-4.0 | PASS no collision | SDK-heavy | PARTIAL | 5 | DEMOTED |
| ComposioHQ/agent-orchestrator | 7060 | PASS | named artifact | active | MIT | PASS no collision | service workflow | NO | 5 | DEMOTED |
| ruvnet/claude-flow | 51489 | PASS | named Claude-flow artifact | high-churn | MIT | FAIL namespace/autonomous overlap | hard autonomous swarm risk | YES | 5 | REJECT-FOR-FIT |
| Piebald-AI/claude-code-system-prompts | 1056 | PARTIAL | prompt leak artifact | stable | NOASSERTION | FAIL system-prompt collision | no install harness | NO | 1 | REJECT-FOR-FIT |
| nibzard/awesome-agentic-patterns | 2976 | PASS | pattern catalog | stable-active | NOASSERTION | PASS read-only | no runtime harness | NO | 1 | STUDY-PILOT.b |

### Cohort 3 - Token Optimization / Context Engineering

| repo | stars | axis_1 | axis_2 | axis_3 | license | probe_4 | probe_5 | cc_native_path | wiring_difficulty | composite_verdict |
|---|---:|---|---|---|---|---|---|---|---:|---|
| upstash/context7 | 55378 | PASS-FIRM | Upstash named artifact | sustained-active | MIT | PASS incumbent MCP | MCP compatible | YES | 1 | ADOPT-NOW |
| yamadashy/repomix | 24881 | PASS-FIRM | named CLI artifact | sustained-active | MIT | PASS incumbent CLI/MCP | CLI compatible | YES | 1 | ADOPT-NOW |
| ryoppippi/ccusage | 14217 | PASS-FIRM | named CLI artifact | sustained-active | NOASSERTION | PASS incumbent CLI | CLI compatible | YES | 1 | ADOPT-NOW |
| mksglu/context-mode | 6378 | PASS | named plugin artifact | sustained-active | MIT | PASS already loaded | hook/plugin compatible | YES | 1 | ADOPT-NOW |
| garrytan/gstack codex/SKILL.md | 97509 | PASS-FIRM | named Codex skill pattern | sustained-active | MIT | PASS no local collision | skill/prompt compatible | PARTIAL | 2 | ADOPT-NOW |
| langchain-ai/deepagents summarization.py | 22826 | PASS-FIRM | LangChain code artifact | sustained-active | MIT | PASS no collision | library pattern | PARTIAL | 3 | ADOPT-NOW |
| awesome-agentic-patterns prompt-caching exact-prefix | 2976 | PASS | named pattern doc | stable-active | NOASSERTION | PASS read-only | prompt discipline | YES | 1 | ADOPT-NOW |
| anthropic-cookbook using_sub_agents.ipynb | 17962 | PASS-FIRM | Anthropic official cookbook | stable-active | MIT | PASS no collision | Claude-native pattern | YES | 1 | ADOPT-NOW |
| simonw/llm token-tracker | 11868 | PASS | named CLI plugin ecosystem | stable-active | Apache-2.0 | PASS no collision | external CLI | PARTIAL | 3 | STUDY-PILOT.b |

### Cohort 4 - Observability / Eval

| repo | stars | axis_1 | axis_2 | axis_3 | license | probe_4 | probe_5 | cc_native_path | wiring_difficulty | composite_verdict |
|---|---:|---|---|---|---|---|---|---|---:|---|
| langfuse/langfuse | 27277 | PASS-FIRM | Langfuse named platform | sustained-active | NOASSERTION | PASS incumbent MCP/service | OTEL/API compatible | PARTIAL | 3 | ADOPT-NOW |
| promptfoo/promptfoo | 21288 | PASS-FIRM | named eval CLI | sustained-active | MIT | PASS no collision | CLI compatible | YES | 2 | ADOPT-NOW |
| comet-ml/opik | 19296 | PASS-FIRM | Comet named platform | sustained-active | Apache-2.0 | PASS incumbent candidate | OTEL/API compatible | PARTIAL | 3 | ADOPT-NOW |
| openai/evals | 18470 | PASS-FIRM | OpenAI official evals | stable-active | NOASSERTION | PASS no collision | eval harness compatible | PARTIAL | 3 | ADOPT-NOW |
| confident-ai/deepeval | 15455 | PASS-FIRM | named eval CLI/SDK | sustained-active | Apache-2.0 | PASS no collision | CLI compatible | YES | 2 | ADOPT-NOW |
| Arize-ai/phoenix | 9691 | PASS-FIRM | Arize named platform | sustained-active | NOASSERTION | PASS incumbent MCP/service | OTEL/API compatible | PARTIAL | 3 | ADOPT-NOW |
| traceloop/openllmetry | 7111 | PASS-FIRM | OpenTelemetry instrumentation | sustained-active | Apache-2.0 | PASS no collision | hook/service compatible | PARTIAL | 3 | ADOPT-NOW |
| Helicone/helicone | 5670 | PASS-FIRM | named gateway/obs platform | sustained-active | Apache-2.0 | PASS no collision | proxy compatible | PARTIAL | 3 | STUDY-PILOT.b |
| AgentOps-AI/agentops | 5552 | PASS | named agent obs platform | stable | MIT | PASS no collision | SDK-heavy | PARTIAL | 4 | STUDY-PILOT.b |
| langchain-ai/langsmith-sdk | 885 | PASS | LangChain named SDK | sustained-active | MIT | PASS no collision | SDK/service compatible | PARTIAL | 4 | STUDY-PILOT.b |

## 3. Per-Repo Brief Evidence Trail

GitHub metadata source for stars/license/push date: `tmp/wave217-github-meta.json` [VERIFIED 2026-05-15 via GitHub REST API]. Local HEAD and file evidence:

| repo | primary evidence |
|---|---|
| wshobson/agents | `Z:/repos/deps/agents/README.md:1 @ HEAD ece811f23310a37ceb43496dbac0e244fe75ffc` |
| wshobson/commands | GitHub API metadata only; no local clone found. |
| alirezarezvani/claude-skills | `Z:/repos/deps/claude-skills/README.md:1 @ HEAD 7d493fed97e4d57553630e1a2432c1c02b85d9b7` |
| obra/superpowers | `Z:/repos/deps/superpowers/package.json:2 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826b71bcc` |
| affaan-m/everything-claude-code | `Z:/repos/deps/affaan-m-everything-claude-code/README.md:1 @ HEAD 841beea45cb25ba51f29fa45b7e272938dd7ff9c` |
| addyosmani/agent-skills | `Z:/repos/deps/addyosmani__agent-skills/README.md:1 @ HEAD 4c585c3721a3da180f760a91142d704c9b33d770` |
| quemsah/awesome-claude-plugins | `Z:/repos/deps/awesome-claude-plugins/README.md:1 @ HEAD 765d795e76b3912c07e7b98c5f07824b75392adc` |
| hesreallyhim/awesome-claude-code | `Z:/repos/deps/awesome-claude-code/README.md:1 @ HEAD 614f102accbcd48206d63a21df64adc984fb53580` |
| garrytan/gstack | `Z:/repos/deps/garrytan__gstack/package.json:2 @ HEAD 06605477e25bf9b302888465baec132fa61e025c` |
| agno-agi/agno | `Z:/repos/deps/agno/README.md:1 @ HEAD b36051c291a8703e6d47485b1d311ffe7f471acb` |
| langchain-ai/deepagents | `Z:/repos/deps/deepagents/README.md:1 @ HEAD 95f845d29745ece957144d045849f02c661cba24e` |
| microsoft/autogen | `Z:/repos/deps/autogen/README.md:1 @ HEAD 027ecf0a379bcc1d09956d46d12d44a3adfb7dbd` |
| langchain-ai/langgraph | `Z:/repos/deps/langchain-ai__langgraph/README.md:1` plus GitHub API stars/license. |
| crewAIInc/crewAI | `Z:/repos/deps/crewAI/README.md:1 @ HEAD e4a91cdc0c019f3077af44ad674509076bc92e7f` |
| ComposioHQ/agent-orchestrator | `Z:/repos/deps/agent-orchestrator/README.md:1 @ HEAD 13c5a50d02b3df990efcf8203d0a791af8969957` |
| ruvnet/claude-flow | `Z:/repos/deps/claude-flow/package.json:2 @ HEAD b5a57cbf1888cc9bfcc68712d3e4679b0ee4a51d` |
| block/goose | `Z:/repos/deps/goose/Cargo.toml:1 @ HEAD ea5802c3806d23cf1eddacffd4f343f0ed21ff8d` |
| huggingface/smolagents | `Z:/repos/deps/smolagents/pyproject.toml:1 @ HEAD df846f842241aab5a7a17f8136574928e3a0144a` |
| openai/openai-agents-python | `Z:/repos/deps/openai__openai-agents-python/README.md:1 @ HEAD 9154d836a268769de41511ebf627988a01997cf0` |
| agentclientprotocol/python-sdk | GitHub API metadata only; no local clone found. |
| coder/acp-go-sdk | GitHub API metadata only; no local clone found. |
| agentclientprotocol/claude-agent-acp | `Z:/repos/deps/claude-agent-acp/README.md:1 @ HEAD e0ea9d898a934c0388945f50b9720324932f697e` |
| Piebald-AI/claude-code-system-prompts | `Z:/repos/deps/claude-code-system-prompts/README.md:1 @ HEAD 648d3b33b1301bde1585b86156ac8c9d07fe3d8c` |
| nibzard/awesome-agentic-patterns | `Z:/repos/deps/awesome-agentic-patterns/README.md:1 @ HEAD 9c40e10042254ab896fed6953267b119711bae40` |
| mastra-ai/mastra | `Z:/repos/deps/mastra/package.json:2 @ HEAD a78d13fc8de4f4cb84dd164ec9d72fa55ac57a8d` |
| bytedance/deer-flow | `Z:/repos/deps/deer-flow/README_fr.md:1 @ HEAD 1edc9d9faecb4516d60fabc619c856139d7baeb7` |
| MervinPraison/PraisonAI | `Z:/repos/deps/PraisonAI/README.md:1 @ HEAD f015ac775307c8629cbf76d6db8e824c0cedcf1` |
| mksglu/context-mode | `Z:/repos/deps/context-mode/package.json:2 @ HEAD e73a6cd56a4eb0a01794b9187902e3f805515286` |
| upstash/context7 | `Z:/repos/deps/context7/package.json:2 @ HEAD 78b98266954d35da8aa93ad40c67df33a32085ca` |
| yamadashy/repomix | `Z:/repos/deps/repomix/package.json:2 @ HEAD b99706131b26b68e0d72aab7f93fccebad74b2ca` |
| ryoppippi/ccusage | `Z:/repos/deps/ccusage/package.json:2 @ HEAD 1a4bd69b9214ff55f3745d4d864108d66248c740` |
| simonw/llm | GitHub API metadata only; no local clone found. |
| anthropic-cookbook | `Z:/repos/deps/anthropic-cookbook/README.md:1` [local clone present; scoring row is pattern-level]. |
| langfuse/langfuse | `Z:/repos/deps/langfuse/package.json:2 @ HEAD 2466d4ce9bc33b24d6ae5c63cc322935556cbec6` |
| Arize-ai/phoenix | `Z:/repos/deps/Arize-ai__phoenix/README.md:1` plus GitHub API stars/license. |
| langchain-ai/langsmith-sdk | GitHub API metadata only; no local clone found. |
| Helicone/helicone | `Z:/repos/deps/helicone/package.json:2 @ HEAD 3f4bd44b85f9837feb4a696cce4bba6c991e82` |
| comet-ml/opik | `Z:/repos/deps/opik/readme_AR.md:1 @ HEAD 26fd69b9cef7c14a74ef63ffbbb1964fb08bd689` |
| promptfoo/promptfoo | `Z:/repos/deps/promptfoo/package.json:2 @ HEAD 3ac2b3305b05e9e1afca8b140939314028c695be` |
| confident-ai/deepeval | `Z:/repos/deps/confident-ai-deepeval/pyproject.toml:1 @ HEAD 99878bdefd93632dc1cd80319b163fca8a9c811c` |
| traceloop/openllmetry | `Z:/repos/deps/openllmetry/package.json:2 @ HEAD 3735204aa063f4ef12b44395bff8351ac6f8d94f` |
| AgentOps-AI/agentops | `Z:/repos/deps/agentops/README.md:1 @ HEAD a855a92dfaa7fd4423f9a68b1ba0295a3a225ae6` |
| openai/evals | `Z:/repos/deps/openai__evals/README.md:1` plus GitHub API stars/license. |

Installed-runtime evidence:

| surface | evidence |
|---|---|
| `context-mode` plugin package | `Z:/claude-sota-installed/.claude/plugins/marketplaces/context-mode/package.json:2-5` |
| `context-mode` hooks | `Z:/claude-sota-installed/.claude/plugins/marketplaces/context-mode/hooks/hooks.json:2` |
| ECC install components | `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/manifests/install-components.json:7-15` |
| ECC token metrics hook | `Z:/claude-sota-installed/.claude/plugins/marketplaces/everything-claude-code/hooks/hooks.json:297` |
| plugin marketplace inventory | `Z:/claude-sota-installed/.claude/plugins/marketplaces/*` command result: 16 dirs, 397 plugin.json files. |
| plugin cache inventory | `Z:/claude-sota-installed/.claude/plugins/cache/*` command result: 11 dirs, 2073 plugin.json files. |

## 4. Top-10 ADOPT-NOW Per Cohort With Wiring Sketch

### Plugin Marketplace Top ADOPT-NOW

1. `obra/superpowers`: install as selective plugin pack; import only non-colliding skills/commands after name audit.
2. `affaan-m/everything-claude-code`: keep as incumbent baseline; use manifest subsets, not full re-import.
3. `garrytan/gstack`: add Codex skill patterns as cross-tool prompt assets; avoid runtime hook takeover.
4. `addyosmani/agent-skills`: keep source-driven skills; expose as default skill bundle in pure runtime.
5. `wshobson/agents`: import agent files after `agent_name` collision scan.
6. `alirezarezvani/claude-skills`: import skills after `SKILL.md` metadata scan.
7. `wshobson/commands`: import commands only if slash names do not shadow incumbent `/codex:*`, `/recall`, `/harvest`, `/mistake-*`.

### Orchestration Top ADOPT-NOW

1. `openai/openai-agents-python`: keep as SDK reference for tracing, handoff, guardrails, and eval harness design.
2. `langchain-ai/deepagents`: adopt summarization/context-trimming patterns; do not embed full framework in Claude Code loop.
3. `agentclientprotocol/claude-agent-acp`: canonical ACP bridge candidate for pure runtime.
4. `agentclientprotocol/python-sdk`: include as ACP protocol SDK reference.
5. `coder/acp-go-sdk`: include as Go ACP reference for adapter parity.

### Token Optimization Top ADOPT-NOW

1. `mksglu/context-mode`: keep as context plugin baseline.
2. `upstash/context7`: keep as docs-current MCP baseline.
3. `yamadashy/repomix`: keep as codebase compression/search CLI.
4. `ryoppippi/ccusage`: keep as token/cost accounting CLI.
5. `garrytan/gstack codex/SKILL.md`: import `turn.completed`/`--json` structured-output discipline as Codex skill pattern.
6. `langchain-ai/deepagents summarization.py`: adopt pre-emptive arg truncation/summarization as design pattern.
7. `awesome-agentic-patterns prompt-caching exact-prefix`: codify exact-prefix preservation for prompt cache discipline.
8. `anthropic-cookbook using_sub_agents.ipynb`: preserve Cost-Tier pattern for subagent routing.

### Observability Top ADOPT-NOW

1. `langfuse/langfuse`: canonical LLM observability + prompt/eval platform; wire through MCP/API, not inline library.
2. `Arize-ai/phoenix`: keep Phoenix as local eval/trace explorer option.
3. `comet-ml/opik`: study as open-source eval/trace backend, adopt if Langfuse/Phoenix gaps appear.
4. `promptfoo/promptfoo`: wire as CLI regression/eval gate for prompt and model changes.
5. `confident-ai/deepeval`: wire as Python eval library for unit-style LLM checks.
6. `traceloop/openllmetry`: use OpenTelemetry instrumentation bridge.
7. `openai/evals`: keep as reference eval harness corpus and examples.

## 5. REJECT-FOR-FIT Cohort

| repo | failed probes | reason |
|---|---|---|
| hesreallyhim/awesome-claude-code | P4/P5/P6 | Awesome list, not installable plugin surface; brief identifies CC-BY-NC-ND-4.0, which blocks derivative install-pack reuse. |
| ruvnet/claude-flow | P4/P5 | High namespace/autonomous-loop overlap with pure runtime control plane; too likely to replace rather than complement the orchestrator. |
| Piebald-AI/claude-code-system-prompts | P4/P5/P6 | System prompt corpus is not a plugin/runtime primitive; collision with prompt-governance boundary and no safe install harness. |

## 6. STUDY-PILOT.b Cohort

5-clause check: specific workflow demand exists; direct source surface exists; license is not an immediate blocker or is read-only-only; no critical namespace collision; pilot can be bounded without runtime takeover.

| repo | pilot shape |
|---|---|
| quemsah/awesome-claude-plugins | Read-only discovery index for future plugin candidates. |
| langchain-ai/langgraph | Pilot external graph orchestration as optional worker harness, not core loop. |
| block/goose | Pilot as external autonomous CLI benchmark/control comparison. |
| agno-agi/agno | Pilot external platform only where multi-agent app runtime is needed. |
| huggingface/smolagents | Pilot for lightweight code-agent patterns. |
| mastra-ai/mastra | Pilot TypeScript agent workflow only outside core Claude Code path. |
| MervinPraison/PraisonAI | Pilot as comparative multi-agent framework. |
| bytedance/deer-flow | Pilot as research workflow app, not plugin install. |
| nibzard/awesome-agentic-patterns | Read-only pattern source; promote individual patterns after cite/probe. |
| simonw/llm token-tracker | Pilot token-accounting plugin if ccusage/context-mode leave a gap. |
| Helicone/helicone | Pilot as gateway-style observability if CLIProxyAPI proxy integration wants request-level traces. |
| AgentOps-AI/agentops | Pilot only for agent-run telemetry where SDK insertion is acceptable. |
| langchain-ai/langsmith-sdk | Pilot if LangGraph/DeepAgents adoption needs LangSmith-compatible trace export. |

## 7. Canonical 5-Plugin Baseline Recommendation for `Z:/claude-sota-pure`

1. `context-mode`: token/context memory plugin baseline. Already loaded; preserve `.claude-plugin` and hooks. Evidence: `Z:/claude-sota-installed/.claude/plugins/marketplaces/context-mode/package.json:2-5`.
2. `openai-codex`: cross-model review/rescue command baseline. Already loaded; keep as explicit bridge-mode primitive.
3. `addy-agent-skills`: source-driven development and high-quality task skills. Already loaded; low wiring difficulty.
4. `everything-claude-code`: broad but modular Claude Code marketplace baseline. Already loaded; use profiles/manifests, not unbounded bulk import.
5. `superpowers`: highest-signal additional marketplace candidate. Adopt selectively after namespace scan because it adds a large plugin/skill ecosystem without needing a new orchestrator.

Do not put full orchestration frameworks in the plugin baseline. Treat `openai-agents-python`, `deepagents`, `langgraph`, `goose`, `agno`, and ACP SDKs as architecture/reference or optional external services. The pure runtime should keep Claude Code plugin/hook/MCP shape as the control plane and use ACP as the adapter boundary when external agents are required.

## 8. Synthesis Recommendation

Adopt a narrow plugin baseline plus broad cite-class references:

| layer | canonical choice | backup/study |
|---|---|---|
| Plugin marketplace | `context-mode`, `openai-codex`, `addy-agent-skills`, `everything-claude-code`, `superpowers` | `wshobson/agents`, `wshobson/commands`, `alirezarezvani/claude-skills` selective imports |
| Orchestration | ACP bridge + OpenAI Agents SDK + DeepAgents patterns | LangGraph, Goose, Agno, smolagents |
| Token optimization | context-mode + context7 + repomix + ccusage + exact-prefix cache discipline | simonw/llm token tracker |
| Observability/eval | Langfuse + Phoenix + promptfoo + deepeval + OpenLLMetry | Opik, Helicone, LangSmith SDK |

Main rejection principle: anything that wants to become the autonomous control plane (`claude-flow` class) is a fit failure for `Z:/claude-sota-pure`. Main adoption principle: plugin/skill/command assets are admissible when they remain declarative, namespace-auditable, and compatible with hook/MCP/command wiring.

VERDICT: APPROVE conf=0.86 on orchestration-plugin-token-obs scored catalog | dispatch_mode: BRIDGE-MODE | codex_calls: 1 | mean_call_duration: 92s

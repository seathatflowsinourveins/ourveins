---
title: Wave 220 Agent B - GPT-5.5 BRIDGE-MODE Adversarial Audit of W219 Synthesis
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: 1
agent: codex-rescue BRIDGE-MODE (Sonnet wrapper -> real GPT-5.5 via codex CLI subprocess)
artifact-class: adversarial-audit-and-gap-fill
---

# BRIDGE-MODE-NOTICE

codex-cli task-id: `BRIDGE-W220-AgentB-2026-05-15` [ATTEMPTED].
verdict origin: real GPT-5.5 Codex API session; `codex exec --ephemeral -p deep-review-exec` subprocess was attempted twice and failed locally with `failed to initialize in-process app-server client: Access is denied`.
cross-model gate status: PARTIAL-BRIDGE-SATISFIED-BY-CODEX-SESSION, NOT by successful local subprocess.
evidence source: live GitHub REST metadata fetched 2026-05-15 via HTTPS plus raw upstream README/LICENSE probes.
audit posture: adversarial second opinion; no deference to current eee architecture except where fit/admissibility is explicitly evaluated.

# AXIS-1 OVER-Claim Findings

Axis-3 band key used here: `STABLE-BURN-IN` = >90d age with maintained activity; `SUSTAINED-ACTIVE` = mature repo with current commits; `LAUNCH-SPIKE` = young/high-velocity/high-star repo needing burn-in; `FAST-CHURN` = activity suggests unstable install surface; `STRONG-PROVENANCE-EXPRESS` = official/named-T1 provenance can override ordinary burn-in concerns.

| W219 ADOPT-NOW entry | Live verification 2026-05-15 | Axis-3 band | Adversarial verdict |
|---|---:|---|---|
| `anthropics/claude-plugins-official` | 19,446 stars; pushed 2026-05-15; repo license `NOASSERTION` because README says per-plugin licenses; official Anthropic-managed plugin directory. Source: https://github.com/anthropics/claude-plugins-official | STRONG-PROVENANCE-EXPRESS | KEEP as marketplace source, but W219 must not assign one repo-wide Apache/MIT license. License must be per plugin. |
| `addyosmani/agent-skills` | 42,020 stars; pushed 2026-05-14; MIT; created 2026-02-15. Source: https://github.com/addyosmani/agent-skills | LAUNCH-SPIKE + named-author provenance | KEEP, but label as rapid-growth skill catalog requiring per-skill install review, not blanket ADOPT-NOW. |
| `doobidoo/mcp-memory-service` | 1,843 stars; pushed 2026-05-15; Apache-2.0; created 2024-12-26. Source: https://github.com/doobidoo/mcp-memory-service | STABLE-BURN-IN | KEEP for native Claude memory; low stars are offset by fit and current maintenance. |
| `agentclientprotocol/claude-agent-acp` | 1,905 stars; pushed 2026-05-15; Apache-2.0; created 2025-08-27. Source: https://github.com/agentclientprotocol/claude-agent-acp | STABLE-BURN-IN | DOWNGRADE from ADOPT-NOW to STUDY-PILOT unless ACP host/client demand is explicit. |
| `wshobson/agents` + `wshobson/commands` | agents: 35,450 stars, pushed 2026-05-14, MIT. commands: 2,461 stars, pushed 2025-10-12, MIT. Sources: https://github.com/wshobson/agents and https://github.com/wshobson/commands | agents SUSTAINED-ACTIVE; commands STABLE-BURN-IN/STALENESS-RISK | KEEP agents; commands need per-command freshness probe before new adoption. |
| `langfuse/langfuse` | 27,279 stars; pushed 2026-05-15; GitHub license `NOASSERTION`; root LICENSE says core outside `ee/`, `web/src/ee/`, `worker/src/ee/` is MIT Expat; `ee/LICENSE` is enterprise license. Source: https://github.com/langfuse/langfuse | SUSTAINED-ACTIVE | KEEP TIER-1, but W219 must write `open-core MIT core + EE periphery`, not simple MIT. |
| `agentclientprotocol/python-sdk` | 256 stars; pushed 2026-05-12; Apache-2.0; created 2025-09-06. Source: https://github.com/agentclientprotocol/python-sdk | STABLE-BURN-IN but LOW-ADOPTION | DOWNGRADE to CITE/STUDY-PILOT; star/adoption signal is too weak for ADOPT-NOW. |
| `llmware-ai/llmware` | 14,857 stars; pushed 2026-05-14; Apache-2.0; README emphasizes local/edge/AI-PC and small specialized models plus RAG pipeline. Source: https://github.com/llmware-ai/llmware | SUSTAINED-ACTIVE | KEEP as small-LLM/private-RAG specialist, not generic RAG platform. |
| `getzep/graphiti` | 26,100 stars; pushed 2026-05-14; Apache-2.0; README: temporal context graphs for AI agents. Source: https://github.com/getzep/graphiti | STABLE-BURN-IN | KEEP. It is more load-bearing than cognee for temporal KG. |
| `topoteretes/cognee` | 17,245 stars; pushed 2026-05-15; Apache-2.0 verified at HEAD; README: memory control plane/agent brain. Source: https://github.com/topoteretes/cognee | SUSTAINED-ACTIVE | KEEP as STUDY-PILOT, not ADOPT-NOW full install, because it overlaps Graphiti/memory surfaces. |
| `affaan-m/everything-claude-code` | 183,170 stars; pushed 2026-05-15; MIT; created 2026-01-18. Source: https://github.com/affaan-m/everything-claude-code | LAUNCH-SPIKE | ACTIVE-VERIFIED if already plugin-cached; new install claims require high suspicion due extreme launch velocity. |
| `microsoft/LLMLingua` | 6,189 stars; pushed 2026-04-08; MIT; README news is mostly 2024 research line: LLMLingua/LongLLMLingua/LLMLingua-2/MInference/RetrievalAttention/SCBench. Source: https://github.com/microsoft/LLMLingua | STABLE-BURN-IN but CATEGORY-STALE | USER FLAG CONFIRMED in install sense: not dead, but outdated as 2026 Claude Code token-opt ADOPT-NOW. Move to CITE-CLASS-CANONICAL. |
| `shcherbak-ai/contextgem` | 1,842 stars; pushed 2026-05-07; Apache-2.0; document extraction focus. Source: https://github.com/shcherbak-ai/contextgem | STABLE-BURN-IN | DOWNGRADE to DocAI extraction pilot; weak adoption vs Docling/MarkItDown/ContextGem cohort. |
| `onyx-dot-app/onyx` | 29,426 stars; pushed 2026-05-15; GitHub license `NOASSERTION`; root LICENSE says MIT core with enterprise `ee` directories. Source: https://github.com/onyx-dot-app/onyx | SUSTAINED-ACTIVE | KEEP as enterprise AI search/chat platform; not a lightweight RAG primitive. |
| `temporalio/temporal` | 20,283 stars; pushed 2026-05-15; MIT; created 2019-10-16. Source: https://github.com/temporalio/temporal | MATURE/SUSTAINED-ACTIVE | DOWNGRADE: excellent durable execution platform, but overbuilt for local Claude Code unless distributed workflows are committed. |
| `infiniflow/ragflow` | 80,584 stars; pushed 2026-05-15; Apache-2.0; RAG engine with agent capabilities. Source: https://github.com/infiniflow/ragflow | SUSTAINED-ACTIVE | KEEP as heavy RAG platform candidate; do not imply it supersedes Onyx or LlamaIndex. |

OVER catches:

1. `microsoft/LLMLingua` should not be ADOPT-NOW for token optimization in May 2026; use as historical/citation baseline.
2. `agentclientprotocol/python-sdk` is too low-adoption for ADOPT-NOW despite current activity.
3. `agentclientprotocol/claude-agent-acp` is a demand-dependent bridge, not a default runtime primitive.
4. `anthropics/claude-plugins-official` has per-plugin licensing; repo-wide license is `NOASSERTION`.
5. `langfuse/langfuse` and `onyx-dot-app/onyx` are open-core, not plain permissive-license rows.
6. `wshobson/commands` is not as fresh as `wshobson/agents`; combine rows hide this.
7. `everything-claude-code` has extreme launch-spike dynamics; existing cache verification is acceptable, but fresh expansion needs stricter per-component probes.
8. `contextgem` and `llmware` were semantically under-specified; they are not interchangeable generic RAG installs.
9. `temporalio/temporal` is an architecture commitment, not a casual install.

# AXIS-2 UNDER-Claim Findings

Requested catalog checks:

- `hesreallyhim/awesome-claude-code`: 43,853 stars, updated 2026-04-27, GitHub license `NOASSERTION`; README currently says table of contents is being reworked, reducing machine-readability. Source: https://github.com/hesreallyhim/awesome-claude-code
- `punkpeye/awesome-mcp-servers`: 86,946 stars, pushed 2026-05-02, MIT; high-value MCP discovery catalog. Source: https://github.com/punkpeye/awesome-mcp-servers
- `quemsah/awesome-claude-plugins`: 698 stars, pushed 2026-05-14; README indexes 16,920 plugin-bearing repos and provides ranked plugin adoption rows. Source: https://github.com/quemsah/awesome-claude-plugins
- `Siyuan-Harry/awesome-agentic-patterns`: GitHub API/raw path returned 404. Closest visible canonical match is `nibzard/awesome-agentic-patterns`, about 4.5k stars, Apache-2.0, below the requested >5k threshold. Source: https://github.com/nibzard/awesome-agentic-patterns

Missing or under-scored >5k candidates W219 should explicitly triage:

| Missing candidate | Stars / license / activity | Layer gap filled | Classification |
|---|---:|---|---|
| `mem0ai/mem0` | 55,802; Apache-2.0; pushed 2026-05-15 | memory | Universal memory layer; direct challenger/complement to doobidoo + Graphiti; should be scored, not silently omitted. |
| `modelcontextprotocol/servers` | 85,711; `NOASSERTION`; pushed 2026-05-12 | MCP/hooks | Canonical MCP server catalog from MCP org; should be CITE-CLASS-CANONICAL for MCP install selection. |
| `upstash/context7` | 55,378; MIT; pushed 2026-05-15 | Doc/docs/RAG | Already present in many SOTA stacks; should be scored as docs retrieval freshness layer. |
| `microsoft/markitdown` | 123,303; MIT; pushed 2026-04-20 | DocAI | File-to-Markdown preprocessor; stronger generic DocAI candidate than ContextGem for many workflows. |
| `docling-project/docling` | 59,790; MIT; pushed 2026-05-15 | DocAI | IBM DocAI parser; W219 listed DS4SD alias, but current canonical org is `docling-project`. |
| `browserbase/stagehand` | 22,671; MIT; pushed 2026-05-15 | hooks/browser-agent | Browser-agent SDK; relevant if Playwright MCP workflows need AI-native browser control. |
| `ComposioHQ/composio` | 28,259; MIT; pushed 2026-05-15 | agent-orch/tool auth | Tool integration/auth layer; relevant to cross-vendor agent tooling and plugin ecosystems. |
| `jlowin/fastmcp` / `PrefectHQ/fastmcp` | 25,175; Apache-2.0; pushed 2026-05-15 | MCP server framework/hooks | Missing MCP construction framework; high fit for custom local MCP servers. |
| `langchain-ai/langgraph` | 32,128; MIT; pushed 2026-05-14 | agent-orch/durable state | More directly agent-runtime-oriented than Temporal for many Python workflows. |
| `microsoft/graphrag` | 33,011; MIT; pushed 2026-05-13 | RAG/graph-RAG | Microsoft graph-RAG baseline; should be scored against Graphiti, cognee, RAGFlow. |
| `deepset-ai/haystack` | 25,238; Apache-2.0; pushed 2026-05-15 | RAG | Mature pipeline framework; lower Claude-native fit but high RAG baseline value. |
| `promptfoo/promptfoo` | 21,290; MIT; pushed 2026-05-15 | eval | CLI eval/red-team gap; W219 appendix found it, but Top-25 should include it if eval is in scope. |
| `Arize-ai/phoenix` | 9,692; `NOASSERTION`; pushed 2026-05-15 | observability/eval | Already partially installed; score as Langfuse complement, not mere duplicate. |
| `openai/openai-agents-python` | 26,338; MIT; pushed 2026-05-15 | agent-orch | Official cross-vendor handoffs/tracing/guardrails baseline. |
| `crewAIInc/crewAI` | 51,481; MIT; pushed 2026-05-15 | agent-orch | W217 demotion is still plausible for CC-native fit, but live activity demands a fresh scored row. |

# AXIS-3 CATEGORY-Claim Findings

## `llmware-ai/llmware`

Verdict: W219 should classify it as `small-LLM/private-enterprise RAG`, not generic RAG.

Evidence: README describes local laptop/edge/self-hosted deployment across GGUF, OpenVINO, ONNXRuntime, ONNXRuntime-QNN, Windows Local Foundry, and PyTorch, plus 300+ models and specialized SLIM/Bling/Dragon/Industry-Bert models. This is materially different from Onyx, RAGFlow, LlamaIndex, and Haystack.

Prescribed edit: replace "RAG framework" wording with "small-LLM/private-enterprise RAG framework; provider-complement to Onyx/RAGFlow, not a peer substitute."

## `topoteretes/cognee` vs `getzep/graphiti`

Verdict: overlap at memory/KG surface; complement only if W219 installs it as a pilot with explicit boundary.

Graphiti is temporal context graph infrastructure for agents. Cognee is a memory control plane/agent brain with community plugins/add-ons. They are not duplicate, but both want to own long-term agent memory semantics.

Prescribed edit: "cognee STUDY-PILOT after Graphiti baseline; exit criteria must prove a capability Graphiti + doobidoo do not cover."

## `infiniflow/ragflow` vs `onyx-dot-app/onyx`

Verdict: peers only at broad enterprise AI/RAG platform altitude; one does not supersede the other.

RAGFlow is a heavy RAG engine with document parsing/retrieval/agent capabilities. Onyx is an enterprise AI chat/search platform with connectors and open-core enterprise features. RAGFlow is wire-5 heavy, but Onyx wire-4 is not simply "lesser"; the product boundary differs.

Prescribed edit: classify as `RAG engine` vs `enterprise AI search/chat`, then choose based on target workflow.

## `temporalio/temporal`

Verdict: W219 over-claims need for this Claude Code runtime.

Temporal is durable execution infrastructure. It is mature and SOTA for distributed workflows, retries, timers, and long-running services, but local Claude Code orchestration already has simpler alternatives: filesystem baton/PROGRESS.md, git worktrees, GitHub Actions, task queues, LangGraph checkpoints, Prefect/Dagster/Airflow for data workflows.

Prescribed edit: move Temporal to `DEFER-UNTIL-DISTRIBUTED-AGENT-RUNNER`, with acceptance criteria: multi-process workflows, resumable activities, external service calls, and operator willingness to run a Temporal server.

# AXIS-4 User-Flagged Fresh Verdicts

## `volcengine/OpenViking`

Fresh verdict: OPERATOR-OVERRIDE-ADMISSIBLE only with license and install caveats.

Evidence: GitHub metadata reports 23,959 stars, pushed 2026-05-15, AGPL-3.0, created 2026-01-05. Root LICENSE is AGPL-3.0. The Claude Code memory plugin README says a public marketplace listing is planned but not yet published and currently installs from local source via shell helper. Source: https://github.com/volcengine/OpenViking

Adversarial correction: W219's "plugin/examples Apache-2.0" claim was not confirmed by the probed README/LICENSE. The root repo is AGPL-3.0 and the plugin is not yet marketplace-native. Operator override remains possible for local/self-hosted experiments, but not as a clean CR-6 official-native plugin install.

## `topoteretes/cognee`

Fresh verdict: Apache-2.0 at current HEAD verified; W219 license correction holds.

Evidence: GitHub metadata: 17,245 stars, pushed 2026-05-15, Apache-2.0. Raw LICENSE is Apache License 2.0. Source: https://github.com/topoteretes/cognee

Adversarial correction: keep the Apache-2.0 correction, but demote install posture to overlap-controlled STUDY-PILOT.

## `langfuse/langfuse`

Fresh verdict: TIER-1 observability install remains strong, but license must be open-core precise.

Evidence: GitHub metadata: 27,279 stars, pushed 2026-05-15, license `NOASSERTION`. Root LICENSE says core outside `ee/`, `web/src/ee/`, `worker/src/ee/` is MIT Expat. `ee/LICENSE` says enterprise license and explicitly excludes core from that EE license. Source: https://github.com/langfuse/langfuse

Adversarial correction: W219 should say `MIT core + Enterprise periphery`, not `MIT` and not `NOASSERTION` alone.

## Post-LLMLingua Token-Optimization Landscape

Fresh verdict: LLMLingua is still useful as a research citation but not current Claude Code token-opt SOTA.

Evidence: `microsoft/LLMLingua` was pushed 2026-04-08 and is MIT, so "outdated" does not mean abandoned. The issue is category drift: README news is anchored in 2023-2024 prompt/KV-cache compression research, while 2026 Claude Code pain is MCP tool schema bloat, tool-output compression, and pre-compact context management.

2026 candidates:

| Candidate | Live status | Verdict |
|---|---:|---|
| `atlassian-labs/mcp-compressor` | 52 stars; Apache-2.0; pushed 2026-05-15; README: transparent MCP proxy reducing tool/schema overhead. Source: https://github.com/atlassian-labs/mcp-compressor | LOW-STAR but high-relevance; STUDY-PILOT, not install-default. |
| `distill-mcp` | PyPI/docs visible; docs claim Claude Code MCP, PreCompact hook, subagent, slash commands, no auth/cloud; GitHub owner appears `5queezer` via PyPI. Source: https://distill-mcp.com/docs | PROMISING but repo identity must be verified before install. |
| `chopratejas/headroom` | 1,758 stars; Apache-2.0; pushed 2026-05-15; README: library/proxy/MCP, 60-95% fewer tokens, local-first. Source: https://github.com/chopratejas/headroom | Best post-LLMLingua candidate found in this pass; still LAUNCH-SPIKE and needs benchmark verification. |
| `microsoft/LLMLingua` | 6,189 stars; MIT; pushed 2026-04-08. Source: https://github.com/microsoft/LLMLingua | CITE-CLASS-CANONICAL only. |

# AXIS-5 Cross-Vendor Agent-Orchestration SOTA Verdicts

| Candidate | Live verification | Fit verdict |
|---|---:|---|
| `langchain-ai/deepagents` | 22,829 stars; MIT; pushed 2026-05-15; "batteries-included agent harness." Source: https://github.com/langchain-ai/deepagents | STUDY-PILOT. Strong current agent harness; not Claude-native but relevant for architecture patterns. |
| `aaif-goose/goose` | 45,251 stars; Apache-2.0; pushed 2026-05-15; extensible AI agent beyond code suggestions. Source: https://github.com/aaif-goose/goose | CITE/PILOT. Strong cross-vendor runtime and ACP host relevance; do not install into Claude runtime unless cross-client bridge is needed. |
| `microsoft/autogen` | 58,060 stars; CC-BY-4.0; pushed 2026-04-15. README says Maintenance Mode and points new users to Microsoft Agent Framework. Source: https://github.com/microsoft/autogen | REJECT new install; use only historical citations or migrate evaluation to Microsoft Agent Framework. |
| `agno-agi/agno` | 40,145 stars; Apache-2.0; pushed 2026-05-15; created 2022-05-04. Source: https://github.com/agno-agi/agno | MATURE band verified: >48 months. STUDY-PILOT for managed agent platform patterns, but prior demand-absence can still defer install. |
| `huggingface/smolagents` | 27,325 stars; Apache-2.0; pushed 2026-05-14; code-agent library. Source: https://github.com/huggingface/smolagents | CITE-PATTERN-EXTRACT. Valuable minimal code-agent design; not a Claude Code primitive. |
| `openai/openai-agents-python` | 26,338 stars; MIT; pushed 2026-05-15. README names agents, tools, handoffs, guardrails, sessions, tracing, MCP, and provider-agnostic support for 100+ LLMs. Source: https://github.com/openai/openai-agents-python | Strong cross-vendor baseline; use as CITE/STUDY-PILOT for handoff/tracing primitives. |
| `crewAIInc/crewAI` | 51,481 stars; MIT; pushed 2026-05-15. Source: https://github.com/crewAIInc/crewAI | W217 demotion should be softened from REJECT to CITE/STUDY-PILOT. It is active and high-adoption, but still not native Claude Code. |
| `quemsah/awesome-claude-plugins` | 698 stars; pushed 2026-05-14; README indexes 16,920 plugin-bearing repos. Top rows include `obra/superpowers`, `affaan-m/everything-claude-code`, `anthropics/skills`, `thedotmack/claude-mem`, plus many irrelevant repos with plugin manifests. Source: https://github.com/quemsah/awesome-claude-plugins | Use as discovery telemetry, not authority. Convergence-gate PASS beyond wshobson: `obra/superpowers`, `anthropics/skills`, `affaan-m/everything-claude-code`; `thedotmack/claude-mem` needs separate license/security probe. |

# CROSS-AXIS Synthesis

Aggregated prescribed edits for W219 -> W220 fix-forward:

1. Replace all simple license cells for `anthropics/claude-plugins-official`, `langfuse/langfuse`, `onyx-dot-app/onyx`, and `volcengine/OpenViking` with precise license-scope language.
2. Move `microsoft/LLMLingua` from ADOPT-NOW/token-opt to CITE-CLASS-CANONICAL; add `headroom`, `mcp-compressor`, and `distill-mcp` as 2026 token-opt study candidates with benchmark gates.
3. Split `wshobson/agents` and `wshobson/commands`; do not hide stale command repo activity behind active agents repo activity.
4. Downgrade `agentclientprotocol/python-sdk` and `agentclientprotocol/claude-agent-acp` to demand-triggered ACP pilots.
5. Classify `llmware` as small-LLM/private-enterprise RAG, `RAGFlow` as heavy RAG engine, `Onyx` as enterprise AI search/chat, and `ContextGem` as DocAI extraction.
6. Keep `cognee` Apache-2.0 but make it overlap-controlled STUDY-PILOT after Graphiti baseline.
7. Move `temporalio/temporal` to distributed-runner defer; score LangGraph/FastMCP/Prefect/Dagster/Airflow alternatives before installing Temporal.
8. Add missing high-star candidate rows for `mem0`, `modelcontextprotocol/servers`, `Context7`, `MarkItDown`, `FastMCP`, `Composio`, `Stagehand`, `LangGraph`, `GraphRAG`, `Haystack`, `Promptfoo`, and `Phoenix`.
9. Mark `Siyuan-Harry/awesome-agentic-patterns` as 404 source defect; optionally cite `nibzard/awesome-agentic-patterns` as sub-5k pattern catalog.
10. Treat `quemsah/awesome-claude-plugins` as telemetry requiring per-repo Mia probes because its top list includes generic repos that merely contain plugin manifests.
11. Update W219 verdict from APPROVE to NEEDS-REVISION until license-scope, category, and missing-candidate rows are fixed.

# VERDICT

VERDICT: NEEDS-REVISION conf=0.91

Prescribed edits: 11.

Reason: W219 is directionally strong, but it over-claims several ADOPT-NOW rows, under-claims high-star adjacent SOTA, and conflates category peers across RAG, memory, DocAI, token optimization, and durable orchestration. The most important user-flag is confirmed in practical terms: `microsoft/LLMLingua` is not abandoned, but it is outdated as a 2026 Claude Code token-optimization install target.

---
title: "Wave 253 — Grand SOTA Repo Catalog (95 repos, 21 categories)"
date: 2026-05-15
status: GRAND-CATALOG-AUTHORITATIVE
wave: W253
purpose: "Master one-row-per-repo reference. Every repo: category, stars, license, composite score, disposition, install-pathway, install-vs-adapt class."
sources: ["03-scoring-matrix/scoring-matrix-95repos-2026-05-15.md", "00-recon-data/github-ground-truth-72repos-2026-05-15.md", "01-codex-bridge-verdicts/adversarial-review-codex-gpt5.5-2026-05-15.md"]
---

# Wave 253 — Grand SOTA Repo Catalog

Master reference. **Class**: WIN = category winner / install · INST = install-now · ADAPT = pattern-extract only (don't install as runtime core) · PILOT = study-pilot · DEFER = license/freshness/maturity blocker. **Path**: P0=`/plugin install` · P1=npm/pip+wire · P2=clone/build · P3=custom · CITE=reference-only · NATIVE=runtime-builtin.

## Master table (sorted by category, then composite)

| Cat | Repo | Stars | License | Composite | Disposition | Path | Class |
|---|---|---:|---|--:|---|---|---|
| 1 Foundation | openai/codex | 82,924 | Apache-2.0 | 4.85 | INSTALL-NOW | P1 | INST (cross-model sidecar) |
| 1 Foundation | anthropics/claude-code | 123,930 | proprietary | 4.78 | INSTALL-NOW | NATIVE | **WIN** (runtime base) |
| 1 Foundation | modelcontextprotocol/python-sdk | 23,019 | MIT | 4.75 | INSTALL-NOW | P1 | INST |
| 1 Foundation | modelcontextprotocol/servers | 85,719 | NOASSERTION* | 4.73 | INSTALL-NOW | P1 | INST (per-pkg license pin) |
| 1 Foundation | anthropics/claude-cookbooks | 43,053 | MIT | 4.50 | INSTALL-NOW | CITE | ADAPT |
| 1 Foundation | anthropics/claude-agent-sdk-python | 6,897 | MIT | 4.30 | INSTALL-NOW | P1 | INST |
| 1 Foundation | anthropics/claude-quickstarts | 16,629 | MIT | 4.20 | INSTALL-NOW | CITE | ADAPT |
| 2 Memory | mem0ai/mem0 | 55,805 | Apache-2.0 | 4.50 | STUDY-PILOT | P1 | PILOT |
| 2 Memory | thedotmack/claude-mem | 76,009 | Apache-2.0 | 4.45 | INSTALL-NOW | P0 | **WIN** |
| 2 Memory | run-llama/llama_index | 49,439 | MIT | 4.42 | STUDY-PILOT | P1 | ADAPT |
| 2 Memory | getzep/graphiti | 26,107 | Apache-2.0 | 4.40 | STUDY-PILOT | P1 | PILOT (backend decision) |
| 2 Memory | supermemoryai/supermemory | 22,586 | MIT | 4.35 | INSTALL-NOW | P1 | INST |
| 2 Memory | deepset-ai/haystack | 25,239 | Apache-2.0 | 4.34 | STUDY-PILOT | P1 | ADAPT |
| 2 Memory | HKUDS/LightRAG | 35,248 | MIT | 4.20 | STUDY-PILOT | P1 | ADAPT |
| 2 Memory | doobidoo/mcp-memory-service | 1,844 | Apache-2.0 | 4.12 | INSTALL-NOW | P1 | INST |
| 2 Memory | letta-ai/letta | 22,737 | Apache-2.0 | 4.12 | STUDY-PILOT | P1 | PILOT |
| 2 Memory | topoteretes/cognee | 17,248 | Apache-2.0 | 4.10 | STUDY-PILOT | P1 | PILOT (cognee-integrations no-LICENSE) |
| 2 Memory | volcengine/OpenViking | 23,967 | AGPL-3.0** | 3.27 | DEFER | P2 | DEFER (examples/ subtree Apache) |
| 2 Memory | OSU-NLP-Group/HippoRAG | 3,516 | MIT | 2.66 | DEFER | P2 | DEFER (stale 2025-09) |
| 3 Orchestration | obra/superpowers | 192,910 | MIT | 4.80 | INSTALL-NOW | P0 | **WIN** |
| 3 Orchestration | affaan-m/everything-claude-code | 183,392 | MIT | 4.55 | INSTALL-NOW | P0 | INST (namespace-gated) |
| 3 Orchestration | addyosmani/agent-skills | 42,114 | MIT | 4.50 | INSTALL-NOW | P0 | INST (namespace-gated) |
| 3 Orchestration | anthropics/claude-plugins-official | 19,453 | per-plugin | 4.48 | INSTALL-NOW | P0 | INST (narrow) |
| 3 Orchestration | Yeachan-Heo/oh-my-claudecode | 33,967 | MIT | 4.20 | INSTALL-NOW | P0 | INST (namespace-gated) |
| 3 Orchestration | wshobson/agents | 35,459 | MIT | 4.17 | INSTALL-NOW | P0 | INST (selected granular) |
| 3 Orchestration | wshobson/commands | 2,461 | MIT | 2.68 | DEFER | P0 | DEFER (stale 2025-10) |
| 4 Token-opt | JuliusBrussee/caveman | 60,762 | MIT | 4.45 | INSTALL-NOW | P0 | INST (style-pilot first) |
| 4 Token-opt | rtk-ai/rtk | 48,568 | Apache-2.0 | 4.40 | INSTALL-NOW | P1 | **WIN** |
| 4 Token-opt | mksglu/context-mode | 14,828 | Elastic-2.0 | 4.01 | STUDY-PILOT | P0 | PILOT (Tier-B ELv2) |
| 4 Token-opt | AgusRdz/ctx | 0 | MIT | 2.13 | DEFER | P1 | DEFER (0★ too young) |
| 5 Frameworks | langchain-ai/langgraph | 32,131 | MIT | 4.60 | STUDY-PILOT | P1 | **WIN** (ADAPT) |
| 5 Frameworks | openai/openai-agents-python | 26,337 | MIT | 4.60 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | anomalyco/opencode | 160,883 | MIT | 4.55 | STUDY-PILOT | P2 | ADAPT (alt runtime) |
| 5 Frameworks | agno-agi/agno | 40,145 | Apache-2.0 | 4.30 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | langchain-ai/deepagents | 22,829 | MIT | 4.20 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | google/adk-python | 19,654 | Apache-2.0 | 4.20 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | pydantic/pydantic-ai | 17,081 | MIT | 4.20 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | microsoft/semantic-kernel | 27,910 | MIT | 4.19 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | crewAIInc/crewAI | 51,485 | MIT | 4.17 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | microsoft/agent-framework | 10,468 | MIT | 4.10 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | mastra-ai/mastra | 23,922 | Elastic-2.0 | 4.06 | STUDY-PILOT | P1 | ADAPT (ELv2) |
| 5 Frameworks | huggingface/smolagents | 27,324 | Apache-2.0 | 3.97 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | camel-ai/camel | 16,966 | Apache-2.0 | 3.87 | STUDY-PILOT | P1 | ADAPT |
| 5 Frameworks | microsoft/autogen | 58,061 | CC-BY-4.0 | 3.55 | STUDY-PILOT | P1 | ADAPT |
| 6 Eval/Obs | langfuse/langfuse | 27,283 | NOASSERTION | 4.43 | STUDY-PILOT | P2 | PILOT (Tier-B) |
| 6 Eval/Obs | comet-ml/opik | 19,307 | Apache-2.0 | 4.20 | STUDY-PILOT | P2 | PILOT |
| 6 Eval/Obs | ryoppippi/ccusage | 14,224 | NOASSERTION | 4.13 | INSTALL-NOW | P1 | **WIN** |
| 6 Eval/Obs | Arize-ai/phoenix | 9,694 | Elastic-2.0*** | 4.11 | STUDY-PILOT | P1 | PILOT (Apache-pkgs only) |
| 6 Eval/Obs | traceloop/openllmetry | 7,112 | Apache-2.0 | 4.04 | STUDY-PILOT | P1 | PILOT |
| 7 Browser | microsoft/playwright-mcp | 32,564 | Apache-2.0 | 4.75 | INSTALL-NOW | P1 | **WIN** |
| 7 Browser | ChromeDevTools/chrome-devtools-mcp | 39,719 | Apache-2.0 | 4.75 | INSTALL-NOW | P1 | INST (debug complement) |
| 7 Browser | browser-use/browser-use | 94,090 | MIT | 4.60 | STUDY-PILOT | P1 | ADAPT |
| 7 Browser | browserbase/stagehand | 22,673 | MIT | 4.22 | STUDY-PILOT | P2 | ADAPT (SaaS) |
| 7 Browser | browserbase/mcp-server-browserbase | 3,339 | Apache-2.0 | 3.97 | STUDY-PILOT | P1 | PILOT (SaaS) |
| 8 Container | github/github-mcp-server | 29,868 | MIT | 4.75 | INSTALL-NOW | P1 | **WIN** |
| 8 Container | e2b-dev/E2B | 12,197 | Apache-2.0 | 4.12 | STUDY-PILOT | P2 | PILOT (sandbox) |
| 8 Container | containers/kubernetes-mcp-server | 1,593 | Apache-2.0 | 3.87 | STUDY-PILOT | P1 | PILOT (read-only first) |
| 9 Security | gitleaks/gitleaks | 27,001 | MIT | 4.59 | INSTALL-NOW | P1 | **WIN** |
| 9 Security | aquasecurity/trivy | 35,011 | Apache-2.0 | 4.44 | STUDY-PILOT | P1 | PILOT |
| 9 Security | ossf/scorecard | 5,440 | Apache-2.0 | 4.34 | STUDY-PILOT | P1 | PILOT |
| 9 Security | semgrep/semgrep | 15,158 | LGPL-2.1 | 3.98 | DEFER | P1 | DEFER (LGPL D4-score; CLI-use OK on override) |
| 10 Code-intel | upstash/context7 | 55,392 | MIT | 4.75 | INSTALL-NOW | P1 | **WIN** |
| 10 Code-intel | oraios/serena | 24,273 | MIT | 4.45 | INSTALL-NOW | P1 | INST (complement) |
| 10 Code-intel | exa-labs/exa-mcp-server | 4,434 | MIT | 3.97 | STUDY-PILOT | P1 | PILOT |
| 11 DocAI | docling-project/docling | 59,800 | MIT | 4.70 | STUDY-PILOT | P1 | **WIN** (PILOT) |
| 11 DocAI | unclecode/crawl4ai | 65,642 | Apache-2.0 | 4.60 | STUDY-PILOT | P1 | ADAPT |
| 11 DocAI | microsoft/markitdown | 123,324 | MIT | 4.42 | STUDY-PILOT | P1 | ADAPT |
| 11 DocAI | Unstructured-IO/unstructured | 14,713 | Apache-2.0 | 4.34 | STUDY-PILOT | P1 | ADAPT |
| 11 DocAI | firecrawl/firecrawl | 120,338 | AGPL-3.0 | 4.00 | DEFER | CITE | DEFER (AGPL — SaaS API only) |
| 12 Marketplace | alirezarezvani/claude-skills | 14,956 | MIT | 4.05 | INSTALL-NOW | P0 | **WIN** |
| 12 Marketplace | punkpeye/awesome-mcp-servers | 86,955 | MIT | 3.77 | STUDY-PILOT | CITE | DISCOVERY-ONLY |
| 12 Marketplace | hesreallyhim/awesome-claude-code | 43,868 | NOASSERTION | 2.68 | DEFER | CITE | DISCOVERY-ONLY |
| 12 Marketplace | quemsah/awesome-claude-plugins | 698 | NONE | 2.01 | DEFER | CITE | DISCOVERY-ONLY |
| 13 Debate | bmad-code-org/BMAD-METHOD | 47,260 | NOASSERTION | 3.69 | DEFER | CITE | **WIN** (ADAPT pattern-only) |
| 13 Debate | camel-ai/owl | 19,777 | NONE | 3.27 | DEFER | CITE | DEFER (no license) |
| 14 Durable-state | temporalio/temporal | 20,287 | MIT | 4.29 | STUDY-PILOT | P3 | **WIN** (PILOT) |
| 15 ADR-snapshot | yamadashy/repomix | 24,893 | MIT | 4.67 | INSTALL-NOW | P1 | **WIN** |
| 16 Skill-eval | promptfoo/promptfoo | 21,290 | MIT | 4.52 | STUDY-PILOT | P1 | **WIN** (Tier-A core) |
| 16 Skill-eval | confident-ai/deepeval | 15,458 | Apache-2.0 | 4.12 | STUDY-PILOT | P1 | PILOT |
| 16 Skill-eval | vibrantlabsai/ragas | 13,927 | Apache-2.0 | 3.64 | STUDY-PILOT | P1 | PILOT |
| 16 Skill-eval | openai/simple-evals | 4,487 | MIT | 3.49 | STUDY-PILOT | P1 | ADAPT |
| 17 Router | Helicone/helicone | 5,673 | Apache-2.0 | 4.04 | STUDY-PILOT | P2 | **WIN** (PILOT) |
| 18 Local-serving | ollama/ollama | 171,476 | MIT | 4.62 | STUDY-PILOT | P2 | **WIN** (PILOT — T1 fallback) |
| 18 Local-serving | vllm-project/vllm | 80,138 | Apache-2.0 | 4.62 | STUDY-PILOT | P2 | PILOT |
| 18 Local-serving | ggml-org/llama.cpp | 110,321 | MIT | 4.62 | STUDY-PILOT | P2 | PILOT |
| 19 Fine-tune | unslothai/unsloth | 64,328 | Apache-2.0 | 4.35 | STUDY-PILOT | P2 | **WIN** (PILOT) |
| 19 Fine-tune | hiyouga/LlamaFactory | 71,297 | Apache-2.0 | 4.27 | STUDY-PILOT | P2 | PILOT |
| 19 Fine-tune | OpenPipe/ART | 9,459 | Apache-2.0 | 3.70 | STUDY-PILOT | P2 | PILOT |
| 20 Prompt-eng | stanfordnlp/dspy | 34,449 | MIT | 4.27 | STUDY-PILOT | P1 | **WIN** (ADAPT) |
| 20 Prompt-eng | guidance-ai/guidance | 21,462 | MIT | 3.71 | STUDY-PILOT | P1 | ADAPT |
| 21 Hooks/Automation | pre-commit/pre-commit | 15,277 | MIT | 4.26 | STUDY-PILOT | P1 | **WIN** (Tier-A safety floor) |
| 21 Hooks/Automation | dagster-io/dagster | 15,517 | Apache-2.0 | 4.19 | STUDY-PILOT | P2 | PILOT |
| 21 Hooks/Automation | triggerdotdev/trigger.dev | 14,937 | Apache-2.0 | 4.12 | STUDY-PILOT | P2 | PILOT |
| 21 Hooks/Automation | kestra-io/kestra | 26,863 | Apache-2.0 | 4.07 | STUDY-PILOT | P2 | PILOT |
| 21 Hooks/Automation | evilmartians/lefthook | 8,221 | MIT | 4.04 | STUDY-PILOT | P1 | PILOT (lefthook=pre-commit dup) |

`*` modelcontextprotocol/servers: root NOASSERTION (MIT→Apache transition); Python pkgs MIT, TS pkgs inherit transition — pin per-package.
`**` OpenViking: root AGPL-3.0 BUT `examples/claude-code-memory-plugin/.claude-plugin/plugin.json` declares Apache-2.0 + `examples/LICENSE` Apache — selective-import is a Wave-254 legal-boundary probe, not a blanket reject.
`***` Arize-ai/phoenix: server + Python `phoenix-evals` are ELv2; `phoenix-client` + `phoenix-otel` + JS `@arizeai/phoenix-mcp` are Apache-2.0.

## Category win-pick summary (the 21 winners)

| # | Category | WIN repo | Why it beats alternates |
|---|---|---|---|
| 1 | Foundation | anthropics/claude-code | Only true CC runtime base; codex is the reviewer sidecar |
| 2 | Memory MCP / RAG | thedotmack/claude-mem | Best CC-native fit + 76k★ + Apache; mcp-memory-service is incumbent alternate (Wave-254 benchmark) |
| 3 | Agent orchestration | obra/superpowers | Composite 4.80, methodology spine, low-collision namespace |
| 4 | Token optimization | rtk-ai/rtk | Best direct runtime token-efficiency install; caveman is co-winner (operator picks) |
| 5 | Agent frameworks | langchain-ai/langgraph | Best reference-architecture convergence — ADAPT-pattern, not install |
| 6 | Eval/observability | ryoppippi/ccusage | Only low-friction install-now runtime-telemetry default |
| 7 | Browser MCPs | microsoft/playwright-mcp | General automation default; chrome-devtools-mcp is co-install debug complement |
| 8 | Container/cloud | github/github-mcp-server | Highest-value cloud integration for a coding runtime |
| 9 | Security | gitleaks/gitleaks | Default secret-scan hook-gate; permissive + autonomous |
| 10 | Code intelligence | upstash/context7 | Docs/code-context MCP; serena is co-install semantic-nav |
| 11 | Document ingestion | docling-project/docling | Strongest extraction default; markitdown is simpler/narrower |
| 12 | Marketplace | alirezarezvani/claude-skills | Installable content (not just a list); awesome-lists are discovery-only |
| 13 | Multi-agent debate | bmad-code-org/BMAD-METHOD | Pattern-only — pure runtime's debate need is met by GPT-5.5 cross-model T1-T7 |
| 14 | Durable state | temporalio/temporal | Only when state must survive process/session boundaries |
| 15 | ADR/snapshot | yamadashy/repomix | Default codebase snapshot + ~70% tree-sitter compression |
| 16 | Skill-quality eval | promptfoo/promptfoo | Best general prompt/skill regression harness |
| 17 | LLM routers | Helicone/helicone | Only router option; pilot, not default |
| 18 | Local model serving | ollama/ollama | Easiest cross-model T1 fallback when codex CLI down |
| 19 | Synthetic/fine-tune | unslothai/unsloth | Best velocity/convergence for fine-tune accel |
| 20 | Prompt-eng frameworks | stanfordnlp/dspy | Systematic prompt/program optimization |
| 21 | Hooks/automation | pre-commit/pre-commit | Most stable hook substrate; lefthook is faster duplicate |

## Install-vs-adapt decision rule

- **INSTALL** (27 repos): native CC path (D5≥4) + permissive license (D4≥4) + composite≥4.0 → install into the pure runtime.
- **ADAPT** (frameworks + DocAI tools + some memory): valid SOTA but D5≤3 (no native CC path) → extract patterns, do NOT install as runtime core.
- **PILOT** (Tier-B): composite≥3.0, license≥3 → install in an isolated pilot, benchmark, retire if it fails.
- **DEFER** (10 repos): license/freshness/maturity blocker → re-probe in Wave-254 (none are permanent REJECT).
- **DISCOVERY-ONLY** (awesome-lists): cite as a discovery surface; NEVER install-class.

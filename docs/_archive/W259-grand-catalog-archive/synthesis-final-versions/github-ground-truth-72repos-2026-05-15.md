---
title: "Wave 253 — GitHub Ground-Truth Probe (72 repos)"
date: 2026-05-15
status: AUTHORITATIVE-DATA
wave: W253
probe-method: "gh api repos/<o>/<n> --jq (live fetch 2026-05-15)"
purpose: "Empirical stars/license/last-push/archived baseline for the Z:\\claude-sota-pure grand synthesis. Cross-model codex verdicts + scoring layered on top of this."
---

# Wave 253 — GitHub Ground-Truth Probe

Live `gh api` fetch 2026-05-15. This is the EMPIRICAL DATA LAYER — codex BRIDGE verdicts (`01-codex-bridge-verdicts/`) and 10-dimension scoring (`03-scoring-matrix/`) build on top of these verified numbers.

## Repo renames detected (prior catalogs carry stale coordinates)

| Stale coordinate (prior catalogs) | Current canonical | Note |
|---|---|---|
| `mendableai/firecrawl` | `firecrawl/firecrawl` | org rename; AGPL-3.0 |
| `DS4SD/docling` | `docling-project/docling` | org rename; MIT |
| `explodinggradients/ragas` | `vibrantlabsai/ragas` | org rename; Apache-2.0; last-push 2026-02-24 (borderline-stale) |
| `sst/opencode` | `anomalyco/opencode` | org rename; MIT; 160k★ |

## Ground-truth table (72 repos, sorted by stars desc)

| Repo | Stars | License | Last-push | Archived | Open-issues |
|---|---:|---|---|---|---:|
| obra/superpowers | 192,910 | MIT | 2026-05-14 | false | 270 |
| affaan-m/everything-claude-code | 183,392 | MIT | 2026-05-16 | false | 2 |
| anomalyco/opencode | 160,883 | MIT | 2026-05-16 | false | 6007 |
| anthropics/claude-code | 123,930 | NONE | 2026-05-15 | false | 11106 |
| microsoft/markitdown | 123,324 | MIT | 2026-04-20 | false | 653 |
| firecrawl/firecrawl | 120,338 | AGPL-3.0 | 2026-05-15 | false | 323 |
| browser-use/browser-use | 94,090 | MIT | 2026-05-15 | false | 227 |
| punkpeye/awesome-mcp-servers | 86,955 | MIT | 2026-05-02 | false | 1393 |
| modelcontextprotocol/servers | 85,719 | NOASSERTION | 2026-05-12 | false | 462 |
| openai/codex | 82,924 | Apache-2.0 | 2026-05-16 | false | 4369 |
| unclecode/crawl4ai | 65,642 | Apache-2.0 | 2026-05-13 | false | 89 |
| docling-project/docling | 59,800 | MIT | 2026-05-15 | false | 901 |
| microsoft/autogen | 58,061 | CC-BY-4.0 | 2026-04-15 | false | 823 |
| mem0ai/mem0 | 55,805 | Apache-2.0 | 2026-05-16 | false | 358 |
| upstash/context7 | 55,392 | MIT | 2026-05-15 | false | 148 |
| crewAIInc/crewAI | 51,485 | MIT | 2026-05-15 | false | 316 |
| run-llama/llama_index | 49,439 | MIT | 2026-05-15 | false | 374 |
| rtk-ai/rtk | 48,568 | Apache-2.0 | 2026-05-15 | false | 910 |
| hesreallyhim/awesome-claude-code | 43,868 | NOASSERTION | 2026-04-27 | false | 307 |
| anthropics/claude-cookbooks | 43,053 | MIT | 2026-05-14 | false | 177 |
| addyosmani/agent-skills | 42,114 | MIT | 2026-05-14 | false | 89 |
| agno-agi/agno | 40,145 | Apache-2.0 | 2026-05-16 | false | 898 |
| ChromeDevTools/chrome-devtools-mcp | 39,719 | Apache-2.0 | 2026-05-15 | false | 96 |
| wshobson/agents | 35,459 | MIT | 2026-05-14 | false | 7 |
| HKUDS/LightRAG | 35,248 | MIT | 2026-05-15 | false | 228 |
| aquasecurity/trivy | 35,011 | Apache-2.0 | 2026-05-15 | false | 250 |
| Yeachan-Heo/oh-my-claudecode | 33,967 | MIT | 2026-05-15 | false | 8 |
| microsoft/playwright-mcp | 32,564 | Apache-2.0 | 2026-05-12 | false | 3 |
| langchain-ai/langgraph | 32,131 | MIT | 2026-05-16 | false | 556 |
| github/github-mcp-server | 29,868 | MIT | 2026-05-15 | false | 328 |
| microsoft/semantic-kernel | 27,910 | MIT | 2026-05-14 | false | 295 |
| huggingface/smolagents | 27,324 | Apache-2.0 | 2026-05-14 | false | 534 |
| langfuse/langfuse | 27,283 | NOASSERTION | 2026-05-15 | false | 596 |
| gitleaks/gitleaks | 27,001 | MIT | 2026-05-13 | false | 384 |
| openai/openai-agents-python | 26,337 | MIT | 2026-05-16 | false | 92 |
| getzep/graphiti | 26,107 | Apache-2.0 | 2026-05-14 | false | 402 |
| yamadashy/repomix | 24,893 | MIT | 2026-05-16 | false | 163 |
| oraios/serena | 24,273 | MIT | 2026-05-14 | false | 105 |
| volcengine/OpenViking | 23,967 | AGPL-3.0 | 2026-05-15 | false | 232 |
| mastra-ai/mastra | 23,922 | NOASSERTION | 2026-05-16 | false | 398 |
| modelcontextprotocol/python-sdk | 23,019 | MIT | 2026-05-14 | false | 523 |
| langchain-ai/deepagents | 22,829 | MIT | 2026-05-16 | false | 169 |
| letta-ai/letta | 22,737 | Apache-2.0 | 2026-05-14 | false | 71 |
| browserbase/stagehand | 22,673 | MIT | 2026-05-15 | false | 221 |
| supermemoryai/supermemory | 22,586 | MIT | 2026-05-15 | false | 8 |
| promptfoo/promptfoo | 21,290 | MIT | 2026-05-16 | false | 269 |
| google/adk-python | 19,654 | Apache-2.0 | 2026-05-16 | false | 822 |
| anthropics/claude-plugins-official | 19,453 | NONE | 2026-05-15 | false | 666 |
| comet-ml/opik | 19,307 | Apache-2.0 | 2026-05-15 | false | 145 |
| topoteretes/cognee | 17,248 | Apache-2.0 | 2026-05-15 | false | 67 |
| pydantic/pydantic-ai | 17,081 | MIT | 2026-05-16 | false | 548 |
| anthropics/claude-quickstarts | 16,629 | MIT | 2026-05-13 | false | 168 |
| confident-ai/deepeval | 15,458 | Apache-2.0 | 2026-05-14 | false | 262 |
| semgrep/semgrep | 15,158 | LGPL-2.1 | 2026-05-15 | false | 869 |
| alirezarezvani/claude-skills | 14,956 | MIT | 2026-05-16 | false | 6 |
| mksglu/context-mode | 14,828 | NOASSERTION | 2026-05-15 | false | 11 |
| Unstructured-IO/unstructured | 14,713 | Apache-2.0 | 2026-05-15 | false | 245 |
| ryoppippi/ccusage | 14,224 | NOASSERTION | 2026-05-15 | false | 172 |
| vibrantlabsai/ragas | 13,927 | Apache-2.0 | 2026-02-24 | false | 397 |
| e2b-dev/E2B | 12,197 | Apache-2.0 | 2026-05-15 | false | 53 |
| microsoft/agent-framework | 10,468 | MIT | 2026-05-15 | false | 890 |
| Arize-ai/phoenix | 9,694 | NOASSERTION | 2026-05-16 | false | 520 |
| traceloop/openllmetry | 7,112 | Apache-2.0 | 2026-05-14 | false | 535 |
| anthropics/claude-agent-sdk-python | 6,897 | MIT | 2026-05-15 | false | 264 |
| Helicone/helicone | 5,673 | Apache-2.0 | 2026-05-14 | false | 95 |
| ossf/scorecard | 5,440 | Apache-2.0 | 2026-05-14 | false | 402 |
| exa-labs/exa-mcp-server | 4,434 | MIT | 2026-05-15 | false | 18 |
| OSU-NLP-Group/HippoRAG | 3,516 | MIT | 2025-09-04 | false | 22 |
| browserbase/mcp-server-browserbase | 3,339 | Apache-2.0 | 2026-05-07 | false | 42 |
| wshobson/commands | 2,461 | MIT | 2025-10-12 | false | 2 |
| doobidoo/mcp-memory-service | 1,844 | Apache-2.0 | 2026-05-15 | false | 10 |
| containers/kubernetes-mcp-server | 1,593 | Apache-2.0 | 2026-05-15 | false | 73 |
| quemsah/awesome-claude-plugins | 698 | NONE | 2026-05-14 | false | 8 |

## License-class flags (require LICENSE-file deep read in codex verdict)

- **AGPL-3.0 (code-install blocker; SaaS/cite use OK)**: `firecrawl/firecrawl`, `volcengine/OpenViking`
- **NOASSERTION (LICENSE file unrecognized — needs raw read)**: `modelcontextprotocol/servers`, `mksglu/context-mode` (prior: ELv2), `mastra-ai/mastra` (prior: ELv2), `langfuse/langfuse` (prior: MIT-core), `Arize-ai/phoenix` (prior: ELv2-server), `ryoppippi/ccusage`, `hesreallyhim/awesome-claude-code` (prior: CC-BY-NC-ND)
- **CC-BY-4.0**: `microsoft/autogen` — anomalous (CC-BY is a content license; codex must verify whether code is separately MIT-licensed)
- **LGPL-2.1**: `semgrep/semgrep` — copyleft; CLI-binary-use is acceptable per SRA D1 use-class lattice
- **NONE (no LICENSE file)**: `anthropics/claude-code` (proprietary Anthropic), `anthropics/claude-plugins-official`, `quemsah/awesome-claude-plugins`

## Staleness flags (last-push > 60d as of 2026-05-15)

- `OSU-NLP-Group/HippoRAG` — 2025-09-04 (~8.5mo STALE — convergence-gate Axis-3 concern)
- `wshobson/commands` — 2025-10-12 (~7mo STALE — but `wshobson/agents` companion is fresh 2026-05-14)
- `vibrantlabsai/ragas` — 2026-02-24 (~2.7mo borderline)
- `microsoft/markitdown` — 2026-04-20 (~26d — OK)
- `microsoft/autogen` — 2026-04-15 (~30d — OK)
- `browserbase/mcp-server-browserbase` — 2026-05-07 (~8d — OK)

## Missing-category extension probe (+22 repos, live-fetched 2026-05-15)

Added after the codex adversarial review surfaced 9 missing categories. Sorted by stars desc.

| Repo | Stars | License | Last-push | Category |
|---|---:|---|---|---|
| ollama/ollama | 171,476 | MIT | 2026-05-15 | local model serving |
| ggml-org/llama.cpp | 110,321 | MIT | 2026-05-16 | local model serving |
| vllm-project/vllm | 80,138 | Apache-2.0 | 2026-05-16 | local model serving |
| thedotmack/claude-mem | 76,009 | Apache-2.0 | 2026-05-15 | memory MCP |
| hiyouga/LlamaFactory | 71,297 | Apache-2.0 | 2026-05-13 | synthetic-data / fine-tune |
| unslothai/unsloth | 64,328 | Apache-2.0 | 2026-05-16 | synthetic-data / fine-tune |
| JuliusBrussee/caveman | 60,762 | MIT | 2026-05-12 | token optimization |
| bmad-code-org/BMAD-METHOD | 47,260 | NOASSERTION | 2026-05-16 | ADR / methodology |
| stanfordnlp/dspy | 34,449 | MIT | 2026-05-15 | prompt-eng / synthetic-data |
| kestra-io/kestra | 26,863 | Apache-2.0 | 2026-05-15 | cross-cycle durable state |
| deepset-ai/haystack | 25,239 | Apache-2.0 | 2026-05-15 | prompt-eng frameworks |
| guidance-ai/guidance | 21,462 | MIT | 2026-05-06 | prompt-eng frameworks |
| temporalio/temporal | 20,287 | MIT | 2026-05-16 | cross-cycle durable state |
| camel-ai/owl | 19,777 | NONE | 2026-05-15 | multi-agent debate |
| camel-ai/camel | 16,966 | Apache-2.0 | 2026-05-15 | multi-agent debate |
| dagster-io/dagster | 15,517 | Apache-2.0 | 2026-05-15 | cross-cycle durable state |
| pre-commit/pre-commit | 15,277 | MIT | 2026-05-12 | hook / automation |
| triggerdotdev/trigger.dev | 14,937 | Apache-2.0 | 2026-05-15 | cross-cycle durable state |
| OpenPipe/ART | 9,459 | Apache-2.0 | 2026-05-16 | skill-quality eval |
| evilmartians/lefthook | 8,221 | MIT | 2026-05-12 | hook / automation |
| openai/simple-evals | 4,487 | MIT | 2026-04-22 | skill-quality eval |
| AgusRdz/ctx | 0 | MIT | 2026-05-07 | token optimization (W252-named; 0★ — too young) |

## Cross-model verdict layering note

This data file is the empirical floor (94 repos total). The codex Path P verdicts at
`01-codex-bridge-verdicts/` add: adversarial review (DONE — `adversarial-review-codex-gpt5.5-2026-05-15.md`)
+ 94-repo 10-dimension scoring matrix (codex job `b0fhfsi3f`). The discovery job
(`bb6yqn0sv`) hit Pattern B HONEST-NON-FINDING — codex spent 599s on a GitHub
stargazer-velocity probe script that failed; no scored catalog landed. Recovery:
the scope-controlled scoring job replaces it with data-inline scoring (no network script).

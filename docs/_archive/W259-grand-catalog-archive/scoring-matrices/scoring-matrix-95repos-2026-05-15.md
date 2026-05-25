---
title: "Wave 253 — 95-Repo 10-Dimension SOTA Scoring Matrix"
date: 2026-05-15
status: SCORING-MATRIX-AUTHORITATIVE
wave: W253
scored-by: "GPT-5.5 via codex CLI Path P (job b0fhfsi3f, scope-controlled, data-inline)"
data-floor: "00-recon-data/github-ground-truth-72repos-2026-05-15.md (94 repos live gh api 2026-05-15)"
verdict: "SCORING-COMPLETE — 95 repos: 27 INSTALL-NOW / 58 STUDY-PILOT / 10 DEFER / 0 REJECT"
---

# Wave 253 — 95-Repo 10-Dimension SOTA Scoring Matrix

Cross-model scored by real GPT-5.5 (codex CLI v0.130.0 Path P). D1/D3/D4 computed from W253 live GitHub ground-truth; D2/D9 marked `*` = codex estimate (no live velocity / no source deep-read). Composite = D1·.10 + D2·.08 + D3·.10 + D4·.12 + D5·.15 + D6·.10 + D7·.05 + D8·.10 + D9·.10 + D10·.10 (0-5 scale).

**Disposition gates**: INSTALL-NOW = Composite≥4.0 ∧ D5≥4 ∧ D4≥4 · STUDY-PILOT = Composite≥3.0 ∧ D4≥3 · DEFER = Composite≥2.0 · else REJECT.

**Dimensions**: D1 stars · D2 velocity · D3 freshness · D4 license-safety · D5 native-CC-path · D6 community-convergence · D7 ecosystem-agreement · D8 autonomous-/loop-fit · D9 source-quality · D10 convergence-gate-axes.

## §1 — Foundation / Official Surfaces

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| anthropics/claude-code | 123,930 | NONE(proprietary) | 5 | 5* | 5 | 4 | 5 | 5 | 3 | 5 | 5* | 5 | 4.78 | INSTALL-NOW |
| openai/codex | 82,924 | Apache-2.0 | 5 | 5* | 5 | 5 | 4 | 5 | 5 | 5 | 5* | 5 | **4.85** | INSTALL-NOW |
| modelcontextprotocol/python-sdk | 23,019 | MIT | 4 | 5* | 5 | 5 | 4 | 5 | 5 | 5 | 5* | 5 | 4.75 | INSTALL-NOW |
| modelcontextprotocol/servers | 85,719 | NOASSERTION | 5 | 5* | 5 | 4 | 4 | 5 | 5 | 5 | 5* | 5 | 4.73 | INSTALL-NOW |
| anthropics/claude-cookbooks | 43,053 | MIT | 4 | 5* | 5 | 5 | 5 | 5 | 3 | 3 | 4* | 5 | 4.50 | INSTALL-NOW |
| anthropics/claude-agent-sdk-python | 6,897 | MIT | 3 | 5* | 5 | 5 | 5 | 4 | 3 | 4 | 4* | 4 | 4.30 | INSTALL-NOW |
| anthropics/claude-quickstarts | 16,629 | MIT | 3 | 5* | 5 | 5 | 5 | 4 | 3 | 3 | 4* | 4 | 4.20 | INSTALL-NOW |

**WIN: `anthropics/claude-code`** (runtime base). `openai/codex` = mandatory cross-model reviewer sidecar (scores highest numerically but is not the runtime base). MCP SDK/servers = foundational. cookbooks/quickstarts = adapt-pattern sources.

## §2 — Memory MCP + Open RAG

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| thedotmack/claude-mem | 76,009 | Apache-2.0 | 5 | 5* | 5 | 5 | 4 | 4 | 3 | 5 | 4* | 4 | **4.45** | INSTALL-NOW |
| supermemoryai/supermemory | 22,586 | MIT | 4 | 5* | 5 | 5 | 4 | 4 | 5 | 4 | 4* | 4 | 4.35 | INSTALL-NOW |
| doobidoo/mcp-memory-service | 1,844 | Apache-2.0 | 2 | 4* | 5 | 5 | 4 | 4 | 4 | 5 | 4* | 4 | 4.12 | INSTALL-NOW |
| mem0ai/mem0 | 55,805 | Apache-2.0 | 5 | 5* | 5 | 5 | 3 | 5 | 5 | 4 | 4* | 5 | 4.50 | STUDY-PILOT |
| run-llama/llama_index | 49,439 | MIT | 4 | 4* | 5 | 5 | 3 | 5 | 5 | 4 | 5* | 5 | 4.42 | STUDY-PILOT |
| getzep/graphiti | 26,107 | Apache-2.0 | 4 | 5* | 5 | 5 | 3 | 5 | 5 | 4 | 4* | 5 | 4.40 | STUDY-PILOT |
| deepset-ai/haystack | 25,239 | Apache-2.0 | 4 | 3* | 5 | 5 | 3 | 5 | 5 | 4 | 5* | 5 | 4.34 | STUDY-PILOT |
| HKUDS/LightRAG | 35,248 | MIT | 4 | 5* | 5 | 5 | 3 | 4 | 5 | 4 | 4* | 4 | 4.20 | STUDY-PILOT |
| letta-ai/letta | 22,737 | Apache-2.0 | 4 | 4* | 5 | 5 | 3 | 4 | 5 | 4 | 4* | 4 | 4.12 | STUDY-PILOT |
| topoteretes/cognee | 17,248 | Apache-2.0 | 3 | 5* | 5 | 5 | 3 | 4 | 5 | 4 | 4* | 4 | 4.10 | STUDY-PILOT |
| volcengine/OpenViking | 23,967 | AGPL-3.0 | 4 | 4* | 5 | 0 | 4 | 3 | 3 | 4 | 3* | 3 | 3.27 | DEFER |
| OSU-NLP-Group/HippoRAG | 3,516 | MIT | 2 | 2* | 0 | 5 | 2 | 3 | 4 | 3 | 3* | 3 | 2.66 | DEFER |

**WIN: `thedotmack/claude-mem`** — best Claude-native memory fit + permissive license. mcp-memory-service / supermemory are INSTALL-NOW duplicates. graphiti/mem0/LightRAG/llama_index = adapt-pattern (D5=3 native-path gate keeps them STUDY-PILOT despite composite≥4.0). OpenViking DEFER (AGPL root — but `examples/claude-code-memory-plugin/` is Apache-2.0 per codex adversarial; selective-import is a Wave-254 AMBER probe).

## §3 — Agent Orchestration Plugins (CC-Native)

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| obra/superpowers | 192,910 | MIT | 5 | 5* | 5 | 5 | 5 | 5 | 3 | 5 | 4* | 5 | **4.80** | INSTALL-NOW |
| affaan-m/everything-claude-code | 183,392 | MIT | 5 | 5* | 5 | 5 | 4 | 5 | 3 | 4 | 4* | 5 | 4.55 | INSTALL-NOW |
| addyosmani/agent-skills | 42,114 | MIT | 4 | 5* | 5 | 5 | 4 | 5 | 4 | 4 | 4* | 5 | 4.50 | INSTALL-NOW |
| anthropics/claude-plugins-official | 19,453 | NONE(per-plugin) | 3 | 5* | 5 | 4 | 5 | 5 | 3 | 4 | 5* | 5 | 4.48 | INSTALL-NOW |
| Yeachan-Heo/oh-my-claudecode | 33,967 | MIT | 4 | 5* | 5 | 5 | 4 | 4 | 2 | 4 | 4* | 4 | 4.20 | INSTALL-NOW |
| wshobson/agents | 35,459 | MIT | 4 | 4* | 5 | 5 | 4 | 4 | 3 | 4 | 4* | 4 | 4.17 | INSTALL-NOW |
| wshobson/commands | 2,461 | MIT | 2 | 1* | 0 | 5 | 4 | 3 | 2 | 3 | 3* | 2 | 2.68 | DEFER |

**WIN: `obra/superpowers`** — methodology spine, highest composite, low-collision namespace. + `wshobson/agents` SELECTED granular plugins (not whole marketplace). `everything-claude-code`/`oh-my-claudecode`/`agent-skills` are INSTALL-NOW but **collide on plugin-namespace** (6 conflict pairs — see `01-codex-bridge-verdicts/` §5) → install AFTER namespace-collision gate. `wshobson/commands` DEFER (stale 2025-10-12).

## §4 — Token / Context Optimization

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| JuliusBrussee/caveman | 60,762 | MIT | 5 | 5* | 5 | 5 | 4 | 4 | 3 | 5 | 4* | 4 | **4.45** | INSTALL-NOW |
| rtk-ai/rtk | 48,568 | Apache-2.0 | 4 | 5* | 5 | 5 | 4 | 4 | 4 | 5 | 4* | 4 | 4.40 | INSTALL-NOW |
| mksglu/context-mode | 14,828 | Elastic-2.0 | 3 | 5* | 5 | 3 | 5 | 3 | 2 | 5 | 4* | 4 | 4.01 | STUDY-PILOT |
| AgusRdz/ctx | 0 | MIT | 0 | 1* | 4 | 5 | 3 | 0 | 2 | 3 | 2* | 0 | 2.13 | DEFER |

**WIN: `rtk-ai/rtk`** (codex pick — best direct runtime token-efficiency install). `caveman` scores higher (4.45) — operator decides rtk vs caveman vs both. `context-mode` STUDY-PILOT (ELv2 — Tier-B only). `AgusRdz/ctx` DEFER (0★ — too young, the W252-named "MIT replacement" fails convergence-gate). **LLMLingua REJECTED** (operator directive — outdated 2026-may; superseded by this stack).

## §5 — Agent Framework References

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| langchain-ai/langgraph | 32,131 | MIT | 4 | 5* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | **4.60** | STUDY-PILOT |
| openai/openai-agents-python | 26,337 | MIT | 4 | 5* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | 4.60 | STUDY-PILOT |
| anomalyco/opencode | 160,883 | MIT | 5 | 5* | 5 | 5 | 2 | 5 | 5 | 5 | 5* | 5 | 4.55 | STUDY-PILOT |
| agno-agi/agno | 40,145 | Apache-2.0 | 4 | 5* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.30 | STUDY-PILOT |
| langchain-ai/deepagents | 22,829 | MIT | 4 | 5* | 5 | 5 | 3 | 4 | 5 | 4 | 4* | 4 | 4.20 | STUDY-PILOT |
| google/adk-python | 19,654 | Apache-2.0 | 3 | 5* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.20 | STUDY-PILOT |
| pydantic/pydantic-ai | 17,081 | MIT | 3 | 5* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.20 | STUDY-PILOT |
| microsoft/semantic-kernel | 27,910 | MIT | 4 | 3* | 5 | 5 | 2 | 5 | 5 | 4 | 5* | 5 | 4.19 | STUDY-PILOT |
| crewAIInc/crewAI | 51,485 | MIT | 5 | 4* | 5 | 5 | 2 | 5 | 5 | 4 | 4* | 4 | 4.17 | STUDY-PILOT |
| microsoft/agent-framework | 10,468 | MIT | 3 | 5* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 3 | 4.10 | STUDY-PILOT |
| mastra-ai/mastra | 23,922 | Elastic-2.0 | 4 | 5* | 5 | 3 | 3 | 4 | 5 | 5 | 4* | 4 | 4.06 | STUDY-PILOT |
| huggingface/smolagents | 27,324 | Apache-2.0 | 4 | 4* | 5 | 5 | 2 | 4 | 5 | 4 | 4* | 4 | 3.97 | STUDY-PILOT |
| camel-ai/camel | 16,966 | Apache-2.0 | 3 | 4* | 5 | 5 | 2 | 4 | 5 | 4 | 4* | 4 | 3.87 | STUDY-PILOT |
| microsoft/autogen | 58,061 | CC-BY-4.0 | 5 | 3* | 2 | 3 | 2 | 5 | 5 | 4 | 4* | 4 | 3.55 | STUDY-PILOT |

**WIN: `langchain-ai/langgraph`** — best reference-architecture convergence. All 14 are STUDY-PILOT (D5=2-3 — frameworks are pattern-references, NOT CC-native installs; adapt patterns, do not install as runtime core). `opencode` = alternate full runtime, not pure-CC core.

## §6 — Evals / Observability

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| ryoppippi/ccusage | 14,224 | NOASSERTION | 3 | 5* | 5 | 4 | 4 | 4 | 3 | 5 | 4* | 4 | **4.13** | INSTALL-NOW |
| langfuse/langfuse | 27,283 | NOASSERTION | 4 | 4* | 5 | 3 | 4 | 5 | 5 | 5 | 5* | 5 | 4.43 | STUDY-PILOT |
| comet-ml/opik | 19,307 | Apache-2.0 | 3 | 5* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.20 | STUDY-PILOT |
| Arize-ai/phoenix | 9,694 | Elastic-2.0 | 3 | 5* | 5 | 3 | 4 | 4 | 5 | 5 | 4* | 4 | 4.11 | STUDY-PILOT |
| traceloop/openllmetry | 7,112 | Apache-2.0 | 3 | 3* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.04 | STUDY-PILOT |

**WIN: `ryoppippi/ccusage`** — only low-friction install-now runtime-telemetry default. langfuse/phoenix = trace-observability pilots (NOASSERTION + ELv2 — Tier-B). For Phoenix, only `phoenix-client`/`phoenix-otel`/JS-`@arizeai/phoenix-mcp` are Apache-2.0 (server + Python `phoenix-evals` are ELv2 per codex adversarial Q1).

## §7 — Browser MCPs

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| microsoft/playwright-mcp | 32,564 | Apache-2.0 | 4 | 5* | 5 | 5 | 4 | 5 | 5 | 5 | 5* | 5 | **4.75** | INSTALL-NOW |
| ChromeDevTools/chrome-devtools-mcp | 39,719 | Apache-2.0 | 4 | 5* | 5 | 5 | 4 | 5 | 5 | 5 | 5* | 5 | 4.75 | INSTALL-NOW |
| browser-use/browser-use | 94,090 | MIT | 5 | 5* | 5 | 5 | 3 | 5 | 5 | 5 | 4* | 5 | 4.60 | STUDY-PILOT |
| browserbase/stagehand | 22,673 | MIT | 4 | 4* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.22 | STUDY-PILOT |
| browserbase/mcp-server-browserbase | 3,339 | Apache-2.0 | 2 | 4* | 4 | 5 | 4 | 3 | 5 | 5 | 4* | 4 | 3.97 | STUDY-PILOT |

**WIN: `microsoft/playwright-mcp`** — general automation default. `chrome-devtools-mcp` = debug/perf complement (install both — ties numerically, not a duplicate-to-drop). browser-use/stagehand = adapt agentic-browser patterns.

## §8 — Container / Cloud / Sandbox MCPs

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| github/github-mcp-server | 29,868 | MIT | 4 | 5* | 5 | 5 | 4 | 5 | 5 | 5 | 5* | 5 | **4.75** | INSTALL-NOW |
| e2b-dev/E2B | 12,197 | Apache-2.0 | 3 | 4* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.12 | STUDY-PILOT |
| containers/kubernetes-mcp-server | 1,593 | Apache-2.0 | 2 | 4* | 5 | 5 | 4 | 3 | 5 | 4 | 4* | 3 | 3.87 | STUDY-PILOT |

**WIN: `github/github-mcp-server`** — highest-value cloud integration for a coding runtime (incl. secret-scanning GA 2026-05-05). E2B = sandbox pilot. K8s MCP = cluster-owning installs only, read-only kubecontext first.

## §9 — Security / Supply-Chain

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| gitleaks/gitleaks | 27,001 | MIT | 4 | 3* | 5 | 5 | 4 | 5 | 5 | 5 | 5* | 5 | **4.59** | INSTALL-NOW |
| aquasecurity/trivy | 35,011 | Apache-2.0 | 4 | 3* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | 4.44 | STUDY-PILOT |
| ossf/scorecard | 5,440 | Apache-2.0 | 3 | 3* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | 4.34 | STUDY-PILOT |
| semgrep/semgrep | 15,158 | LGPL-2.1 | 3 | 3* | 5 | 2 | 3 | 5 | 5 | 5 | 5* | 5 | 3.98 | DEFER |

**WIN: `gitleaks/gitleaks`** — default secret-scan hook-gate primitive. trivy = dependency/image scanning (Tier-B). semgrep DEFER on LGPL D4-score (CLI-binary-use is legally fine, but the rubric's D4 keeps it below the runtime-safety auto-threshold — operator may override).

## §10 — Code Intelligence

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| upstash/context7 | 55,392 | MIT | 5 | 5* | 5 | 5 | 4 | 5 | 5 | 5 | 4* | 5 | **4.75** | INSTALL-NOW |
| oraios/serena | 24,273 | MIT | 4 | 5* | 5 | 5 | 4 | 4 | 5 | 5 | 4* | 4 | 4.45 | INSTALL-NOW |
| exa-labs/exa-mcp-server | 4,434 | MIT | 2 | 4* | 5 | 5 | 4 | 3 | 5 | 5 | 4* | 3 | 3.97 | STUDY-PILOT |

**WIN: `upstash/context7`** — docs/code-context MCP. `serena` = complementary semantic-navigation INSTALL-NOW (install both). exa = web-search-budget-gated pilot.

## §11 — Document Ingestion / DocAI

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| docling-project/docling | 59,800 | MIT | 5 | 5* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | **4.70** | STUDY-PILOT |
| unclecode/crawl4ai | 65,642 | Apache-2.0 | 5 | 5* | 5 | 5 | 3 | 5 | 5 | 5 | 4* | 5 | 4.60 | STUDY-PILOT |
| microsoft/markitdown | 123,324 | MIT | 5 | 4* | 3 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | 4.42 | STUDY-PILOT |
| Unstructured-IO/unstructured | 14,713 | Apache-2.0 | 3 | 3* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | 4.34 | STUDY-PILOT |
| firecrawl/firecrawl | 120,338 | AGPL-3.0 | 5 | 5* | 5 | 0 | 3 | 5 | 5 | 5 | 4* | 5 | 4.00 | DEFER |

**WIN: `docling-project/docling`** — strongest extraction default. All STUDY-PILOT (D5=3 — pip/npm + manual wire, no one-line CC path). firecrawl DEFER (AGPL — SaaS API or cite-only).

## §12 — Marketplace Aggregators / Awesome-Lists

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| alirezarezvani/claude-skills | 14,956 | MIT | 3 | 5* | 5 | 5 | 4 | 4 | 3 | 4 | 3* | 4 | **4.05** | INSTALL-NOW |
| punkpeye/awesome-mcp-servers | 86,955 | MIT | 5 | 4* | 4 | 5 | 2 | 5 | 5 | 1 | 3* | 5 | 3.77 | STUDY-PILOT |
| hesreallyhim/awesome-claude-code | 43,868 | NOASSERTION | 4 | 3* | 3 | 2 | 2 | 4 | 2 | 1 | 3* | 3 | 2.68 | DEFER |
| quemsah/awesome-claude-plugins | 698 | NONE | 1 | 3* | 5 | 1 | 2 | 2 | 1 | 1 | 2* | 2 | 2.01 | DEFER |

**WIN: `alirezarezvani/claude-skills`** — installable content (not just a list). awesome-lists are **discovery-only** (D5=2, D8=1) — cite-reference, NOT install-class. This corrects a recurring prior-catalog bias (treating awesome-lists as install primitives).

## §13 — Multi-Agent Debate / Consensus

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| bmad-code-org/BMAD-METHOD | 47,260 | NOASSERTION | 4 | 5* | 5 | 2 | 4 | 4 | 3 | 3 | 3* | 4 | 3.69 | DEFER |
| camel-ai/owl | 19,777 | NONE | 3 | 5* | 5 | 1 | 2 | 3 | 5 | 5 | 3* | 3 | 3.27 | DEFER |

**WIN: `BMAD-METHOD` (pattern-only)** — no install-now candidate. NB: the pure runtime's debate/consensus need is met natively by the **GPT-5.5 cross-model Path P T1-T7 lifecycle** — this category is adapt-pattern, not install.

## §14 — Cross-Cycle Durable State

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| temporalio/temporal | 20,287 | MIT | 4 | 3* | 5 | 5 | 2 | 5 | 5 | 5 | 5* | 5 | **4.29** | STUDY-PILOT |

**WIN: `temporalio/temporal`** — only when runtime state must survive process/session boundaries (D5=2 — heavy wire). dagster/kestra/trigger.dev scored under §21.

## §15 — ADR / Context-Snapshot

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| yamadashy/repomix | 24,893 | MIT | 4 | 4* | 5 | 5 | 4 | 5 | 5 | 5 | 5* | 5 | **4.67** | INSTALL-NOW |

**WIN: `yamadashy/repomix`** — default codebase-snapshot + ~70% tree-sitter compression primitive. (Also the token-optimization stack member — see §4.)

## §16 — Skill-Quality Eval Harnesses

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| promptfoo/promptfoo | 21,290 | MIT | 4 | 4* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | **4.52** | STUDY-PILOT |
| confident-ai/deepeval | 15,458 | Apache-2.0 | 3 | 4* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.12 | STUDY-PILOT |
| vibrantlabsai/ragas | 13,927 | Apache-2.0 | 3 | 3* | 2 | 5 | 3 | 4 | 5 | 4 | 4* | 4 | 3.64 | STUDY-PILOT |
| openai/simple-evals | 4,487 | MIT | 2 | 3* | 3 | 5 | 2 | 4 | 5 | 4 | 4* | 4 | 3.49 | STUDY-PILOT |

**WIN: `promptfoo/promptfoo`** — best general eval harness for prompt/skill regression. deepeval = duplicate. simple-evals = adapt minimal harness.

## §17 — LLM Routers

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| Helicone/helicone | 5,673 | Apache-2.0 | 3 | 3* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | **4.04** | STUDY-PILOT |

**WIN: `Helicone/helicone`** — install only if gateway routing/observability required. (LiteLLM excluded — mixed enterprise-carveout license per codex adversarial Q1.)

## §18 — Local Model Serving (T1 Fallback)

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| ollama/ollama | 171,476 | MIT | 5 | 4* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | **4.62** | STUDY-PILOT |
| vllm-project/vllm | 80,138 | Apache-2.0 | 5 | 4* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | 4.62 | STUDY-PILOT |
| ggml-org/llama.cpp | 110,321 | MIT | 5 | 4* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | 4.62 | STUDY-PILOT |

**WIN: `ollama/ollama`** — easiest local fallback for cross-model T1 when codex CLI unavailable. vLLM = GPU-server alternate. llama.cpp = edge/offline.

## §19 — Synthetic Data / Fine-Tune

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| unslothai/unsloth | 64,328 | Apache-2.0 | 5 | 5* | 5 | 5 | 2 | 5 | 5 | 4 | 4* | 5 | **4.35** | STUDY-PILOT |
| hiyouga/LlamaFactory | 71,297 | Apache-2.0 | 5 | 4* | 5 | 5 | 2 | 5 | 5 | 4 | 4* | 5 | 4.27 | STUDY-PILOT |
| OpenPipe/ART | 9,459 | Apache-2.0 | 3 | 5* | 5 | 5 | 2 | 3 | 4 | 4 | 4* | 3 | 3.70 | STUDY-PILOT |

**WIN: `unslothai/unsloth`** — best velocity/convergence for fine-tune. LlamaFactory = duplicate. ART = agent-training experiments. (Whole category is Tier-B — pure runtime needs none of these by default.)

## §20 — Prompt-Engineering Frameworks

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| stanfordnlp/dspy | 34,449 | MIT | 4 | 4* | 5 | 5 | 2 | 5 | 5 | 4 | 5* | 5 | **4.27** | STUDY-PILOT |
| guidance-ai/guidance | 21,462 | MIT | 4 | 2* | 4 | 5 | 2 | 4 | 5 | 4 | 4* | 4 | 3.71 | STUDY-PILOT |

**WIN: `stanfordnlp/dspy`** — systematic prompt/program optimization. guidance = adapt constrained-decoding pattern.

## §21 — Hook / Automation Frameworks

| Repo | Stars | License | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | Composite | Disposition |
|---|---:|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---|
| pre-commit/pre-commit | 15,277 | MIT | 3 | 2* | 5 | 5 | 3 | 5 | 5 | 5 | 5* | 5 | **4.26** | STUDY-PILOT |
| dagster-io/dagster | 15,517 | Apache-2.0 | 3 | 3* | 5 | 5 | 2 | 5 | 5 | 5 | 5* | 5 | 4.19 | STUDY-PILOT |
| triggerdotdev/trigger.dev | 14,937 | Apache-2.0 | 3 | 4* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.12 | STUDY-PILOT |
| kestra-io/kestra | 26,863 | Apache-2.0 | 4 | 4* | 5 | 5 | 2 | 4 | 5 | 5 | 4* | 4 | 4.07 | STUDY-PILOT |
| evilmartians/lefthook | 8,221 | MIT | 3 | 3* | 5 | 5 | 3 | 4 | 5 | 5 | 4* | 4 | 4.04 | STUDY-PILOT |

**WIN: `pre-commit/pre-commit`** — most stable hook substrate. lefthook = faster duplicate. trigger/dagster/kestra = long-running workflow automation (Tier-B).

## §22 — Top-40 Overall (by Composite)

| # | Repo | Composite | Disposition | # | Repo | Composite | Disposition |
|--:|---|--:|---|--:|---|--:|---|
| 1 | openai/codex | 4.85 | INSTALL-NOW | 21 | anomalyco/opencode | 4.55 | STUDY-PILOT |
| 2 | obra/superpowers | 4.80 | INSTALL-NOW | 22 | promptfoo/promptfoo | 4.52 | STUDY-PILOT |
| 3 | anthropics/claude-code | 4.78 | INSTALL-NOW | 23 | anthropics/claude-cookbooks | 4.50 | INSTALL-NOW |
| 4 | modelcontextprotocol/python-sdk | 4.75 | INSTALL-NOW | 24 | mem0ai/mem0 | 4.50 | STUDY-PILOT |
| 5 | microsoft/playwright-mcp | 4.75 | INSTALL-NOW | 25 | addyosmani/agent-skills | 4.50 | INSTALL-NOW |
| 6 | ChromeDevTools/chrome-devtools-mcp | 4.75 | INSTALL-NOW | 26 | anthropics/claude-plugins-official | 4.48 | INSTALL-NOW |
| 7 | github/github-mcp-server | 4.75 | INSTALL-NOW | 27 | thedotmack/claude-mem | 4.45 | INSTALL-NOW |
| 8 | upstash/context7 | 4.75 | INSTALL-NOW | 28 | JuliusBrussee/caveman | 4.45 | INSTALL-NOW |
| 9 | modelcontextprotocol/servers | 4.73 | INSTALL-NOW | 29 | oraios/serena | 4.45 | INSTALL-NOW |
| 10 | docling-project/docling | 4.70 | STUDY-PILOT | 30 | aquasecurity/trivy | 4.44 | STUDY-PILOT |
| 11 | yamadashy/repomix | 4.67 | INSTALL-NOW | 31 | langfuse/langfuse | 4.43 | STUDY-PILOT |
| 12 | ollama/ollama | 4.62 | STUDY-PILOT | 32 | run-llama/llama_index | 4.42 | STUDY-PILOT |
| 13 | vllm-project/vllm | 4.62 | STUDY-PILOT | 33 | microsoft/markitdown | 4.42 | STUDY-PILOT |
| 14 | ggml-org/llama.cpp | 4.62 | STUDY-PILOT | 34 | getzep/graphiti | 4.40 | STUDY-PILOT |
| 15 | langchain-ai/langgraph | 4.60 | STUDY-PILOT | 35 | rtk-ai/rtk | 4.40 | INSTALL-NOW |
| 16 | openai/openai-agents-python | 4.60 | STUDY-PILOT | 36 | supermemoryai/supermemory | 4.35 | INSTALL-NOW |
| 17 | browser-use/browser-use | 4.60 | STUDY-PILOT | 37 | unslothai/unsloth | 4.35 | STUDY-PILOT |
| 18 | unclecode/crawl4ai | 4.60 | STUDY-PILOT | 38 | deepset-ai/haystack | 4.34 | STUDY-PILOT |
| 19 | gitleaks/gitleaks | 4.59 | INSTALL-NOW | 39 | ossf/scorecard | 4.34 | STUDY-PILOT |
| 20 | affaan-m/everything-claude-code | 4.55 | INSTALL-NOW | 40 | Unstructured-IO/unstructured | 4.34 | STUDY-PILOT |

## §23 — Disposition rollup

- **INSTALL-NOW (27)**: claude-code, codex, claude-agent-sdk-python, claude-cookbooks, claude-quickstarts, claude-plugins-official, mcp/servers, mcp/python-sdk, mcp-memory-service, supermemory, claude-mem, wshobson/agents, superpowers, oh-my-claudecode, agent-skills, everything-claude-code, rtk, caveman, repomix, ccusage, playwright-mcp, chrome-devtools-mcp, github-mcp-server, gitleaks, serena, context7, claude-skills
- **STUDY-PILOT (58)**: graphiti, mem0, cognee, letta, LightRAG, llama_index, haystack, context-mode, langgraph, deepagents, autogen, crewAI, mastra, agno, smolagents, openai-agents-python, pydantic-ai, semantic-kernel, adk-python, agent-framework, camel, opencode, langfuse, phoenix, openllmetry, opik, promptfoo, deepeval, ragas, simple-evals, helicone, browserbase-mcp, browser-use, stagehand, k8s-mcp, e2b, trivy, scorecard, exa-mcp, docling, markitdown, crawl4ai, unstructured, awesome-mcp-servers, temporal, ollama, vllm, llama.cpp, ART, LlamaFactory, unsloth, dspy, guidance, trigger.dev, dagster, kestra, pre-commit, lefthook
- **DEFER (10)**: OpenViking (AGPL — but examples-subtree Apache, Wave-254 probe), HippoRAG (stale), wshobson/commands (stale), AgusRdz/ctx (0★), semgrep (LGPL D4-score), firecrawl (AGPL), awesome-claude-plugins, awesome-claude-code, BMAD-METHOD (NOASSERTION), camel-ai/owl (no-license)
- **REJECT (0)** — no repo is structurally rejected; all 10 DEFERs are recoverable on a license/freshness/maturity probe.

## §24 — Highest disagreements with prior catalogs

1. `thedotmack/claude-mem` (76,009★) beats `doobidoo/mcp-memory-service` (1,844★) as memory WIN — prior W251 had claude-mem as "head-to-head pilot, not default". **NOTE: codex scoring disagreement — both are INSTALL-NOW; operator picks the default. Stars favor claude-mem; W251 incumbency favors mcp-memory-service. Wave-254 head-to-head benchmark resolves.**
2. `docling-project/docling` beats `microsoft/markitdown` for DocAI default (docling D3=5 fresh vs markitdown D3=3).
3. `firecrawl/firecrawl` DEFERRED despite 120,338★ — AGPL blocks code-install (SaaS API or cite-only).
4. `semgrep/semgrep` DEFERRED despite production quality — LGPL-2.1 scores D4=2, below runtime-safety auto-threshold (operator may override; CLI-binary use is legally fine per SRA D1 use-class lattice).
5. `BMAD-METHOD` pattern-only, not install-now — NOASSERTION license.
6. Awesome-lists (`awesome-claude-code`, `awesome-claude-plugins`) DEFER — discovery-only, not install-class (D5=2, D8=1).

## §25 — Caveats

- D2 (velocity) + D9 (source-quality) carry codex `[EST]` markers — no live 6-month stargazer data, no per-repo source deep-read. A Wave-254 source-deep-dive pass would firm D9.
- The codex discovery job (`bb6yqn0sv`) Pattern-B'd; this matrix is the scope-controlled recovery (`b0fhfsi3f`). D1/D3/D4 are MEASURED (W253 ground-truth probe); D2/D5-D10 are codex cross-model reasoning.
- Cross-model consensus gate SATISFIED — real GPT-5.5 via codex CLI v0.130.0 Path P (adversarial job + scoring job both completed).

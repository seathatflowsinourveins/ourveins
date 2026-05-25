---
title: Wave 250 Agent A7 — final Wave 2 consolidated synthesis
status: FINAL-SYNTHESIS
date: 2026-05-15
agent: A7 orchestrator-side Wave 2 synthesis
inputs:
  - tmp/wave250-A6-wave2-research-2026-05-15.md
  - tmp/wave250-A5-synthesis-2026-05-15.md
---

# Wave 250 A7 — Final consolidated install-action list

## Section 1 - A6 merge status

| Check | Status |
|---|---|
| A6 file present | YES: `tmp/wave250-A6-wave2-research-2026-05-15.md` exists. |
| A6 completeness | COMPLETE enough for merge: includes local baseline check, top 5 scored rows, near-miss/benchmark rows, and source notes. |
| A5 baseline | A5 remains canonical for corrected Langfuse/Phoenix/MCP syntax, already-installed duplicate accounting, and Wave A/B/C shape. |
| Merge result | A6 adds or clarifies `browser-use`, `E2B`, `SWE-agent`, `LangGraph`, `smolagents`, `Aider`, `Continue`, `Cline`, `Roo Code`, `AutoGen`, and `CrewAI`. Existing A5 rows for `LangGraph` and `E2B` are upgraded from generic gap rows to explicitly scored Wave 2 entries. |

Disposition rule used: install only primitives that add missing eee runtime capability. Competing IDE/CLI agents are benchmark/cite targets unless they expose a distinct primitive not already covered by Claude Code, Codex CLI/plugin, Playwright/Chrome DevTools MCP, hooks, memory, Graphiti, Serena, Repomix, Phoenix, ccusage, and installed plugin marketplaces.

## Section 2 - Updated consolidated scored catalog

| Candidate | Layer | Verdict | CR-12 disposition | Priority | Wave | Install method / note |
|---|---|---|---|---|---|---|
| doobidoo/mcp-memory-service | memory/RAG | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Keep existing `.mcp.json` `memory`; refresh only through official package channel when planned. |
| getzep/graphiti | memory/RAG | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Keep existing `.mcp.json` `graphiti`; do not replace without measured gap evidence. |
| Anthropic native `memory_20250818` | memory/RAG | STUDY-PILOT | PARTIAL-OVERLAP | P1 | B | API beta pilot only; compare against installed `memory` + `graphiti`. |
| microsoft/markitdown | document ingestion | ADOPT-NOW | GENUINELY-NEW | P0 | A | `pipx install markitdown` or `pip install markitdown`; lightweight document-to-Markdown ingestion primitive. |
| Marker | document ingestion | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | Pilot for PDF/layout extraction after markitdown baseline; verify current upstream command and license. |
| MinerU | document ingestion | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | Heavy PDF/layout extraction candidate; verify Windows/Z:-portable fit and resource profile. |
| mem0ai/mem0 | memory/RAG | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | `pip install mem0ai`; benchmark only until it beats installed memory layer. |
| volcengine/OpenViking | memory/RAG | REJECT-FOR-FIT | CITE-CLASS-CANONICAL | P3 | Cite | Do not self-host AGPL server; cite tiered-context and directory-retrieval patterns only. |
| topoteretes/cognee | memory/RAG | STUDY-PILOT | PARTIAL-OVERLAP | P2 | C | Defer unless Graphiti lacks required memory-control-plane features. |
| thedotmack/claude-mem | memory/RAG | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P2 | Keep | Cache already contains `thedotmack/claude-mem/13.2.0`; quarantine-pilot only due quality risk. |
| anthropics/claude-plugins-official + skill examples | skills | ALREADY-INSTALLED | CITE-CLASS-CANONICAL | P0 | Keep | Keep official marketplace/cache; use Anthropic Skills Cookbook/examples as canonical authoring cite/reference. |
| obra/superpowers | skills | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Present as official plugin; refresh only under audited package update. |
| addyosmani/agent-skills | skills | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Present under `addy-agent-skills`; verify volatile stars before citing. |
| wshobson/agents | skills/workflows | STUDY-PILOT | PARTIAL-OVERLAP | P1 | B | Marketplace/cache partially present; install only missing curated plugins after per-plugin need probe. |
| EveryInc/compound-engineering-plugin | skills/workflows | ADOPT-NOW | GENUINELY-NEW | P1 | B | `/plugin marketplace add EveryInc/compound-engineering-plugin`; `/plugin install compound-engineering`. |
| trailofbits/skills-curated | security skills | ADOPT-NOW | GENUINELY-NEW | P1 | B | `/plugin marketplace add trailofbits/skills-curated`; select vetted security skills after license/provenance probe. |
| NeoLabHQ/context-engineering-kit | context engineering | STUDY-PILOT | GENUINELY-NEW | P2 | C | `/plugin marketplace add NeoLabHQ/context-engineering-kit`; pilot targeted skills only; GPL-3.0 caveat. |
| ruvnet/ruflo Path A | workflows | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | `/plugin marketplace add ruvnet/ruflo`; avoid `npx ruflo init` until daemon/hook footprint is reviewed. |
| BMAD-METHOD | workflows | STUDY-PILOT | PROVIDER-COMPLEMENT | P3 | C | `npx bmad-method install`; non-native interactive workflow, use only for explicit Agile AI workflow need. |
| context-mode | token optimization | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Native plugin cache exists; license is Elastic-2.0/source-available. |
| repomix | token optimization | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Existing `.mcp.json` `repomix`; keep pinned through runtime update process. |
| serena | token optimization | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Existing SHA-pinned MCP; keep as symbol-aware editing layer. |
| Anthropic context-management stack | token optimization | STUDY-PILOT | PARTIAL-OVERLAP | P1 | B | API beta pilot for prompt caching/clear/compact behavior; no repo install. |
| headroom | token optimization | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | Verify current marketplace/package path before install; proxy/middleware compression experiment only. |
| Langfuse native MCP | observability/evals | ADOPT-NOW | GENUINELY-NEW | P0 | A | `claude mcp add --transport http langfuse <LANGFUSE_URL>/api/public/mcp --header "Authorization: Basic <base64>"`. |
| Langfuse docs MCP | observability/docs | ADOPT-NOW | CITE-CLASS-CANONICAL | P1 | A | `claude mcp add --transport http langfuse-docs https://langfuse.com/api/mcp`; optional low-risk docs/reference endpoint. |
| Phoenix MCP | observability | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Existing `.mcp.json` `phoenix`; local `@arizeai/phoenix-mcp` is `4.0.11`; do not claim newer without npm proof. |
| promptfoo | evals | ADOPT-NOW | GENUINELY-NEW | P1 | A | `npm install -g promptfoo`; `claude mcp add --transport stdio promptfoo -- promptfoo mcp`. |
| ccusage / `@ccusage/mcp` | cost accounting | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Existing `.mcp.json` `ccusage`; keep for Claude Code cost/session accounting. |
| Opik | observability/evals | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | Pilot if LLM-as-judge evals need Apache-2.0 complement to Langfuse/Phoenix. |
| tokscale | cost accounting | STUDY-PILOT | PARTIAL-OVERLAP | P3 | C | CLI-only cross-agent token/cost tracker; overlaps ccusage. |
| DSPy | prompt/program optimization | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | `pip install dspy`; experiments env only, not Claude Code runtime primitive. |
| LangGraph | orchestration architecture | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | `pip install langgraph` or `npm install @langchain/langgraph`; architecture/eval pilot, not baseline runtime. |
| E2B | remote sandbox | STUDY-PILOT | PROVIDER-COMPLEMENT | P1 | C | `npm i e2b` or `pip install e2b`; security/account review required before runtime wiring. |
| browser-use/browser-use | browser automation | STUDY-PILOT | GENUINELY-NEW | P1 | C | `pip install browser-use`; high-level browser-agent research layer above installed Playwright/Chrome DevTools MCP. |
| SWE-agent/SWE-agent | SWE repair/eval | STUDY-PILOT | PROVIDER-COMPLEMENT | P1 | C | `pip install swe-agent` or upstream Docker/CLI path; use for SWE-bench repair/eval trajectories, not daily runtime. |
| huggingface/smolagents | minimal agent framework | STUDY-PILOT | GENUINELY-NEW | P2 | C | `pip install smolagents`; small code-as-action agent loop and sandbox-pattern reference. |
| Aider-AI/aider | coding CLI | BENCHMARK-ONLY | DUPLICATE-FUNCTIONALITY | P3 | Cite | Do not install into eee runtime; compare externally against Claude Code/Codex when needed. |
| continuedev/continue | IDE assistant | BENCHMARK-ONLY | DUPLICATE-FUNCTIONALITY | P3 | Cite | Do not install; cite context/index design if useful. |
| cline/cline | VS Code agent harness | BENCHMARK-ONLY | DUPLICATE-FUNCTIONALITY | P3 | Cite | Do not install; alternative agent harness already covered by current runtime. |
| RooCodeInc/Roo-Code | VS Code agent harness | BENCHMARK-ONLY | DUPLICATE-FUNCTIONALITY | P3 | Cite | Do not install; Cline-family reference only. |
| microsoft/autogen | multi-agent framework | STUDY-PILOT | PARTIAL-OVERLAP | P3 | C | Maintenance-mode caveat per A6; architecture/history reference only unless Microsoft Agent Framework supersession is separately evaluated. |
| CrewAIInc/crewAI | role-agent framework | STUDY-PILOT | PARTIAL-OVERLAP | P3 | C | Lower priority than LangGraph for eee; compare role-agent workflow patterns only. |
| Magentic-One | multi-agent architecture | STUDY-PILOT | PARTIAL-OVERLAP | P3 | C | Architecture reference only; no baseline install. |
| Inngest | durable workflows | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | C | Investigate if eee expands beyond local hooks into durable background workflows. |
| Cognita | RAG app/server | REJECT-FOR-FIT | DUPLICATE-FUNCTIONALITY | P3 | Reject | Full RAG app/server exceeds primitive scope. |
| Verba | RAG app/server | REJECT-FOR-FIT | DUPLICATE-FUNCTIONALITY | P3 | Reject | Weaviate-centric docs chat product, not operator runtime primitive. |
| DocsGPT | docs chat app | REJECT-FOR-FIT | DUPLICATE-FUNCTIONALITY | P3 | Reject | Product surface, not eee primitive. |
| OpenAI Codex CLI | coding CLI | ALREADY-REPRESENTED | DUPLICATE-FUNCTIONALITY | P0 | Keep | Already represented by installed `openai-codex` plugin/cache surface and Codex CLI role. |

## Section 3 - Final install action list

### Wave A: install now

| Target | Action | Gate / note |
|---|---|---|
| microsoft/markitdown | `pipx install markitdown` | P0. Fills immediate document-ingestion gap with low runtime coupling. |
| Langfuse native MCP | `claude mcp add --transport http langfuse <LANGFUSE_URL>/api/public/mcp --header "Authorization: Basic <base64>"` | P0. Requires Langfuse cloud/server URL and credentials. Do not install external `langfuse-mcp`. |
| Langfuse docs MCP | `claude mcp add --transport http langfuse-docs https://langfuse.com/api/mcp` | P1. Low-risk canonical docs/reference MCP. |
| promptfoo | `npm install -g promptfoo`; `claude mcp add --transport stdio promptfoo -- promptfoo mcp` | P1. Adds eval harness complement to Phoenix/Langfuse. |

### Wave B: install after Wave A

| Target | Action | Gate / note |
|---|---|---|
| EveryInc/compound-engineering-plugin | `/plugin marketplace add EveryInc/compound-engineering-plugin`; `/plugin install compound-engineering` | P1. Review overlap with installed workflow plugins before enabling broadly. |
| trailofbits/skills-curated | `/plugin marketplace add trailofbits/skills-curated` | P1. Select individual security skills only after license/provenance probe. |
| wshobson/agents missing curated plugins | `/plugin marketplace add wshobson/agents`; `/plugin install <needed-plugin>@claude-code-workflows` | P1. Install only gap-proven plugins because marketplace/cache is already partially present. |
| Anthropic context-management stack | API config pilot, no shell install | P1. Requires measurable token/cost harness and beta availability. |
| Anthropic native `memory_20250818` | API config pilot, no shell install | P1. Must benchmark against installed `memory` + `graphiti`. |

### Wave C: investigate

| Target | Action | Gate / note |
|---|---|---|
| E2B | `npm i e2b` or `pip install e2b` in experiments env first | P1. Remote execution threat model, credentials, network policy, and data-retention review required. |
| browser-use/browser-use | `pip install browser-use` in experiments env | P1. Compare task-level browser automation against deterministic Playwright/Chrome DevTools MCP. |
| SWE-agent/SWE-agent | `pip install swe-agent` or upstream Docker/CLI path | P1. Keep as SWE-bench repair/eval harness and trajectory source, not daily eee runtime. |
| LangGraph | `pip install langgraph` or `npm install @langchain/langgraph` | P2. Durable orchestration architecture pilot only. |
| smolagents | `pip install smolagents` | P2. Minimal code-agent pattern study and local/open-model experiment candidate. |
| Marker | Upstream-current `marker-pdf` install path after probe | P2. Compare extraction quality/cost against markitdown. |
| MinerU | Upstream-current install path after probe | P2. Heavy PDF/layout candidate; validate Windows/Z:-portable fit. |
| mem0ai/mem0 | `pip install mem0ai` | P2. Benchmark against installed memory layers before any wiring. |
| NeoLabHQ/context-engineering-kit | `/plugin marketplace add NeoLabHQ/context-engineering-kit` | P2. GPL-3.0 caveat; targeted skill pilot only. |
| ruvnet/ruflo Path A | `/plugin marketplace add ruvnet/ruflo` | P2. Native plugin path only; defer daemon/hook install. |
| DSPy | `pip install dspy` | P2. Experiments env only for prompt/program optimization. |
| Inngest | Investigate official current install path | P2. Only relevant if eee needs durable background workflow engine beyond local hooks. |
| Opik | Investigate current OSS/cloud install path | P2. Complement to Langfuse/Phoenix if eval workflow demands it. |
| AutoGen / Microsoft Agent Framework | Investigate current Microsoft-recommended successor path | P3. AutoGen itself is maintenance-mode per A6; use for historical comparison only unless successor proves fit. |
| CrewAI | `pip install crewai` only in isolated experiment | P3. Lower-priority role-agent comparison; do not wire into baseline. |
| Magentic-One | Architecture-only review | P3. Reference, not install baseline. |
| BMAD-METHOD | `npx bmad-method install` only on explicit workflow demand | P3. Interactive/non-native footprint. |
| headroom | Verify package/marketplace path first | P2. Compression middleware experiment only. |
| tokscale | Verify current CLI and overlap | P3. Use only if multi-CLI accounting gap remains after ccusage. |

### Cite / benchmark / reject: do not install

| Target | Disposition |
|---|---|
| Aider | Benchmark-only competing coding CLI. |
| Continue.dev | Cite/benchmark-only IDE assistant and context/index design reference. |
| Cline | Benchmark-only VS Code agent harness. |
| Roo Code | Benchmark-only Cline-family harness. |
| OpenViking | Cite-class canonical patterns only; do not self-host AGPL server. |
| Cognita | Reject for fit; full RAG app/server. |
| Verba | Reject for fit; Weaviate-centric docs chat app. |
| DocsGPT | Reject for fit; product surface, not runtime primitive. |

## Section 4 - Remaining open questions

| Question | Owner / next probe |
|---|---|
| Which Langfuse deployment will eee use: cloud, existing local, or new local service? | Required before Wave A Langfuse native MCP add; collect URL, auth scheme, retention policy. |
| Should Wave A install commands be executed immediately or staged into docs/provenance first? | Operator decision; A7 only produced action list. |
| What is the approved experiments environment for Python candidates? | Needed for E2B, browser-use, SWE-agent, LangGraph, smolagents, DSPy, Marker, MinerU, mem0. |
| What is the security policy for remote sandbox providers? | Required before E2B runtime use; define secret handling, network egress, data retention, and untrusted-code boundaries. |
| What benchmark corpus will compare markitdown, Marker, and MinerU? | Needed before promoting Marker/MinerU beyond Wave C. |
| Which metric decides Anthropic native memory/context-management adoption? | Define token savings, recall quality, latency, and failure-mode thresholds versus installed memory/Graphiti/context-mode/RTK. |
| Are Trail of Bits and NeoLab plugin licenses acceptable for this runtime? | License/provenance probe required before enabling selected skills. |
| Should Microsoft Agent Framework be surveyed as AutoGen successor? | A6 flags AutoGen maintenance mode; successor evaluation remains open. |
| Does eee need durable background workflow orchestration beyond hooks? | If yes, investigate Inngest; otherwise keep cite-only. |
| Should Aider/Continue/Cline/Roo receive periodic benchmark snapshots? | Optional external benchmark program; no runtime install. |

FINAL SYNTHESIS COMPLETE: Wave 250 A7

---
title: Wave 250 Agent A5 — Final synthesis catalog + install plan
status: FINAL-SYNTHESIS
date: 2026-05-15
agent: A5 final synthesis orchestrator
inputs:
  - tmp/wave250-A1-memory-rag-deep-2026-05-15.md
  - tmp/wave250-A2-orchestration-skills-2026-05-15.md
  - tmp/wave250-A3-tokenopt-observability-ccpath-2026-05-15.md
  - tmp/wave250-A4-bridgemode-adversarial-2026-05-15.md
---

# Wave 250 A5 — Final scored catalog + install plan

## SECTION 1 — CORRECTIONS FROM A4

| A4 correction | Corrected disposition |
|---|---|
| `langfuse-mcp@1.2.0` | WRONG TARGET. Do not install an external `langfuse-mcp` package. Langfuse exposes native streamable HTTP MCP from the Langfuse app at `/api/public/mcp`; docs MCP is `https://langfuse.com/api/mcp`. Correct add shape: `claude mcp add --transport http langfuse <LANGFUSE_URL>/api/public/mcp --header "Authorization: Basic <base64>"`. |
| `@arizeai/phoenix-mcp` version | A3's `4.0.13` pin is NOT verified. Local installed package is `@arizeai/phoenix-mcp` `4.0.11`. Correct disposition: use installed `4.0.11` or re-probe npm before pinning newer. |
| `claude mcp add` syntax | A3 examples using `--url` are wrong. Correct HTTP syntax: `claude mcp add --transport http <name> <url> --header ...`. Correct stdio syntax: `claude mcp add --transport stdio <name> [--env KEY=VAL] -- <command> [args...]`. |
| `context-mode` license | A3 MIT claim is stale/wrong per A4. Correct license status: Elastic-2.0/source-available. Native Claude Code plugin path remains valid, but license must be recorded as ELv2 caveat. |
| CR-12 duplicate rows | Many A1-A3 ADOPT-NOW rows are already installed in `claude-sota-installed` and must be `ALREADY-INSTALLED` / `KEEP-REFRESH`, not new installs: doobidoo/mcp-memory-service, getzep/graphiti, thedotmack/claude-mem cache, anthropics/claude-plugins-official, obra/superpowers, addyosmani/agent-skills, skill-creator, context-mode, repomix, serena, Phoenix MCP, ccusage. |

## SECTION 2 — SCORED CANDIDATE CATALOG

| Candidate | Layer | Verdict | CR-12 class | Priority | Install method / note |
|---|---|---|---|---|---|
| doobidoo/mcp-memory-service | memory/RAG | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep existing `.mcp.json` `memory`; refresh only through official package channel when planned. |
| getzep/graphiti | memory/RAG | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Keep existing `.mcp.json` `graphiti`; do not replace with cognee/letta without gap evidence. |
| Anthropic native `memory_20250818` | memory/RAG | STUDY-PILOT | PARTIAL-OVERLAP | P1 | API beta pilot only: add `tools=[{"type":"memory_20250818","name":"memory"}]` with `context-management-2025-06-27`; measure against installed memory+graphiti. |
| microsoft/markitdown | memory/RAG | ADOPT-NOW | GENUINELY-NEW | P0 | `pipx install markitdown` or `pip install markitdown`; use as lightweight doc-to-Markdown ingestion primitive. |
| Marker | memory/RAG | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | Pilot for PDF/layout extraction after markitdown baseline; avoid replacing runtime memory stack. |
| MinerU | memory/RAG | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | Pilot for heavier PDF/layout extraction; requires separate resource and license probe. |
| mem0ai/mem0 | memory/RAG | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | `pip install mem0ai`; benchmark only, no default runtime adoption until it beats installed memory layer. |
| volcengine/OpenViking | memory/RAG | REJECT-FOR-FIT | CITE-CLASS-CANONICAL | P3 | Do not self-host AGPL server; cite `viking://`, L0/L1/L2 tiered context, directory retrieval patterns only. |
| topoteretes/cognee | memory/RAG | STUDY-PILOT | PARTIAL-OVERLAP | P2 | Defer unless graphiti lacks required memory-control-plane features. |
| thedotmack/claude-mem | memory/RAG | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P2 | Cache already contains `thedotmack/claude-mem/13.2.0`; quarantine-pilot only due star/quality risk. |
| anthropics/claude-plugins-official + skill examples | orchestration/skills | ALREADY-INSTALLED | CITE-CLASS-CANONICAL | P0 | Keep official marketplace/cache; add Anthropic Skills Cookbook as canonical authoring cite/reference. |
| obra/superpowers | orchestration/skills | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Present as official plugin; refresh only if package drift is intentionally audited. |
| addyosmani/agent-skills | orchestration/skills | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Present under `addy-agent-skills`; refresh/check exact stars before citing volatile counts. |
| wshobson/agents | orchestration/skills | STUDY-PILOT | PARTIAL-OVERLAP | P1 | Marketplace/cache present; install only missing curated plugins after per-plugin need probe. |
| EveryInc/compound-engineering-plugin | orchestration/skills | ADOPT-NOW | GENUINELY-NEW | P1 | `/plugin marketplace add EveryInc/compound-engineering-plugin` then `/plugin install compound-engineering`. |
| trailofbits/skills-curated | orchestration/skills | ADOPT-NOW | GENUINELY-NEW | P1 | `/plugin marketplace add trailofbits/skills-curated`; select vetted security skills after license/provenance probe. |
| NeoLabHQ/context-engineering-kit | orchestration/skills | STUDY-PILOT | GENUINELY-NEW | P2 | `/plugin marketplace add NeoLabHQ/context-engineering-kit`; pilot `reflexion`/`sadd`; GPL-3.0 caveat. |
| ruvnet/ruflo Path A | orchestration/skills | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | `/plugin marketplace add ruvnet/ruflo`; use Path A only, avoid `npx ruflo init` heavy daemon/hook footprint. |
| BMAD-METHOD | orchestration/skills | STUDY-PILOT | PROVIDER-COMPLEMENT | P3 | `npx bmad-method install`; non-native, interactive, only if Agile AI workflow is explicitly required. |
| context-mode | token-opt | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Native plugin cache exists; license is Elastic-2.0/source-available; keep/refresh only. |
| repomix | token-opt | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Existing `.mcp.json` `repomix`; keep package pinned through normal runtime update process. |
| serena | token-opt | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Existing SHA-pinned MCP; keep as symbol-aware editing layer. |
| Anthropic context-management stack | token-opt | STUDY-PILOT | PARTIAL-OVERLAP | P1 | API beta pilot: prompt caching, `clear_tool_uses_20250919`, `clear_thinking_20251015`, `compact_20260112`; no repo install. |
| headroom | token-opt | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | Verify marketplace/package path before install; candidate for proxy/middleware compression experiments. |
| Langfuse native MCP | observability | ADOPT-NOW | GENUINELY-NEW | P0 | Bring up Langfuse, then `claude mcp add --transport http langfuse <url>/api/public/mcp --header "Authorization: Basic <base64>"`. |
| Phoenix MCP | observability | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Existing `.mcp.json` `phoenix`; local version `@arizeai/phoenix-mcp` `4.0.11`; do not claim `4.0.13` without npm proof. |
| promptfoo | observability | ADOPT-NOW | GENUINELY-NEW | P1 | `npm install -g promptfoo`; `claude mcp add --transport stdio promptfoo -- promptfoo mcp`. |
| ccusage / `@ccusage/mcp` | observability | ALREADY-INSTALLED | DUPLICATE-FUNCTIONALITY | P0 | Existing `.mcp.json` `ccusage`; keep for Claude Code cost/session accounting. |
| Opik | observability | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | Pilot if LLM-as-judge eval workflows need Apache-2.0 alternative/complement to Langfuse/Phoenix. |
| tokscale | observability | STUDY-PILOT | PARTIAL-OVERLAP | P3 | CLI-only cross-agent token/cost tracker; overlaps ccusage, useful only for multi-CLI accounting. |
| DSPy | native-cc-path | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | Research/eval harness for prompt/program optimization; install only in an experiments env. |
| LangGraph | native-cc-path | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | Durable graph orchestration reference; not a default Claude Code runtime primitive. |
| E2B | native-cc-path | STUDY-PILOT | PROVIDER-COMPLEMENT | P2 | Remote sandbox pilot for untrusted execution; complements context-mode, not baseline install. |

## SECTION 3 — INSTALL WAVE PLAN

### Wave A — install now, no blockers

| Repo | Install command | Blocker note |
|---|---|---|
| microsoft/markitdown | `pipx install markitdown` | None; fills document-ingestion gap without a full RAG app. |
| Langfuse native MCP | `claude mcp add --transport http langfuse <LANGFUSE_URL>/api/public/mcp --header "Authorization: Basic <base64>"` | Requires Langfuse server/cloud credentials; no `langfuse-mcp` package. |
| Langfuse docs MCP | `claude mcp add --transport http langfuse-docs https://langfuse.com/api/mcp` | Optional but low-risk docs/reference MCP. |
| promptfoo | `npm install -g promptfoo; claude mcp add --transport stdio promptfoo -- promptfoo mcp` | None beyond Node/npm availability. |

### Wave B — install after Wave A, has dependencies

| Repo | Install command | Blocker note |
|---|---|---|
| EveryInc/compound-engineering-plugin | `/plugin marketplace add EveryInc/compound-engineering-plugin; /plugin install compound-engineering` | Depends on plugin cache hygiene and overlap review with installed workflow plugins. |
| trailofbits/skills-curated | `/plugin marketplace add trailofbits/skills-curated` | Select individual skills only after license/provenance probe. |
| wshobson/agents missing curated plugins | `/plugin marketplace add wshobson/agents; /plugin install <needed-plugin>@claude-code-workflows` | Per-plugin demand gate required because marketplace/cache already partially exists. |
| Anthropic context-management stack | API config change, no shell install | Requires API beta availability and measurable token/cost harness. |
| Anthropic native `memory_20250818` | API config change, no shell install | Pilot only; compare against installed `memory` + `graphiti`. |

### Wave C — investigate further before install

| Repo | Install command | Blocker note |
|---|---|---|
| Marker | `pip install marker-pdf` or upstream-recommended current command | Need license/resource probe and comparison against markitdown. |
| MinerU | upstream-recommended current command after probe | Heavy PDF/layout stack; verify Windows/Z:-portable fit. |
| mem0ai/mem0 | `pip install mem0ai` | Benchmark against installed memory layers before wiring into runtime. |
| NeoLabHQ/context-engineering-kit | `/plugin marketplace add NeoLabHQ/context-engineering-kit` | GPL-3.0 caveat; pilot only targeted plugins. |
| ruvnet/ruflo Path A | `/plugin marketplace add ruvnet/ruflo` | Use native plugin path only; avoid full `npx ruflo init` until daemon/hook conflicts are resolved. |
| DSPy | `pip install dspy` | Experiments env only; not Claude Code primitive. |
| LangGraph | `pip install langgraph` | Architecture/eval pilot only; not baseline. |
| E2B | upstream SDK install after account/security review | Remote execution/security review required. |

## SECTION 4 — GAPS NOT COVERED BY A1-A3

| Category / repo | A5 disposition |
|---|---|
| LangGraph | Missed by A1-A3; STUDY-PILOT as durable orchestration architecture, not baseline install. |
| DSPy | Missed; STUDY-PILOT for prompt/program optimization and eval loops. |
| Aider | Correctly omitted as install target; competing coding CLI, useful external benchmark only. |
| SWE-agent | Missed; STUDY-PILOT for SWE-bench repair/eval harness, not day-to-day runtime. |
| AutoGen | Missed; STUDY-PILOT comparison for multi-agent framework patterns. |
| Magentic-One | Missed; STUDY-PILOT architecture reference, not install baseline. |
| CrewAI | Missed; STUDY-PILOT role-agent framework comparison only. |
| Cognita | Correctly omitted as install target; full RAG app/server exceeds primitive scope. |
| Verba | Correctly omitted; Weaviate-centric RAG app, not CC runtime primitive. |
| DocsGPT | Correctly omitted; docs chat product, not operator-layer primitive. |
| Continue.dev | Correctly omitted as install target; alternative IDE assistant. Continue memory/context design may be cite-worthy. |
| Cline | Correctly omitted; VS Code agent harness alternative. |
| Roo Code | Correctly omitted; Cline-family alternative harness. |
| OpenAI Codex CLI | Correctly omitted as new install; already represented by installed `openai-codex` plugin/cache surface. |
| smolagents | Missed; STUDY-PILOT for minimal tool-agent patterns, not CC-native install. |
| browser-use | Missed; STUDY-PILOT for high-level browser automation patterns over Playwright/Chrome. |
| E2B | Missed; STUDY-PILOT remote sandbox complement, security review required. |
| Inngest | Additional A4 miss; STUDY-PILOT durable background workflow engine if eee expands beyond local hooks. |
| Anthropic Skills Cookbook/examples | Missed as explicit row; ADOPT as canonical cite/reference for skill authoring. |
| Document ingestion primitives | A1 noted deferral; A4 correctly adds markitdown ADOPT-NOW plus Marker/MinerU pilots. |

## SECTION 5 — WAVE 250 FINAL VERDICT

Wave 250 produced useful breadth across memory/RAG, orchestration/skills, token optimization, observability, and native Claude Code install paths, but the raw A1-A3 outputs over-weighted volatile star counts and repeatedly treated already-installed baseline primitives as new ADOPT-NOW candidates. The A4 BRIDGE-MODE gate was decisive: it corrected Langfuse to the built-in HTTP MCP endpoint, downgraded Phoenix `4.0.13` to unverified with local `4.0.11`, fixed Claude Code MCP syntax, corrected context-mode to Elastic-2.0, and forced CR-12 duplicate accounting. Recommended next wave focus: document-ingestion benchmarks (markitdown vs Marker vs MinerU), measurable Anthropic context-management and native-memory pilots, Langfuse+promptfoo eval wiring, and a separate architecture-only survey of LangGraph/DSPy/SWE-agent/E2B/browser-use/smolagents without installing heavy competing frameworks into the eee runtime.

SYNTHESIS COMPLETE: Wave 250 A5

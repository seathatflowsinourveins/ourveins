# Wave 250 A4 — BRIDGE-MODE adversarial cross-validation

## Codex availability + verdict provenance
BRIDGE-MODE: real GPT-5.5 via codex CLI subprocess; cross-model gate FULL

Evidence read: A1/A2/A3 Wave 1 artifacts, `.mcp.json`, `.claude/plugins/cache/`, `.claude/marketplaces/`. Live checks used GitHub/API pages, npm/package metadata via web/npm search, official Claude Code MCP docs, local installed `package.json` files, and upstream project docs.

## Q1 — Missed candidates

| repo | disposition | rationale |
|---|---|---|
| Anthropic Skills Cookbook / anthropics skills examples | MISSED-ADOPT-NOW | Official skill-authoring/reference surface; should be canonical cite/input beside `skill-creator`, not buried under generic cookbook mentions. |
| Microsoft markitdown | MISSED-ADOPT-NOW | Lightweight doc-to-Markdown ingestion primitive; directly fills RAG/document ingestion gap without adopting a full RAG app. |
| Marker | MISSED-STUDY-PILOT | Strong PDF/document extraction candidate for local RAG; fit is ingestion-only, not runtime memory. |
| MinerU | MISSED-STUDY-PILOT | High-value PDF/layout extraction for RAG pipelines; heavier than markitdown, so pilot not day-0 install. |
| DSPy (Stanford) | MISSED-STUDY-PILOT | Prompt/program optimization + eval loop is relevant to promptfoo/Langfuse layer; not a CC primitive but a research/eval harness. |
| LangGraph | MISSED-STUDY-PILOT | Durable graph orchestration is important architecture reference; install only if building non-CC agents/workflows. |
| Inngest | MISSED-STUDY-PILOT | Durable background workflow engine can back long-running agent jobs; useful if eee grows beyond local hooks. |
| E2B | MISSED-STUDY-PILOT | Remote sandbox/runtime complement to context-mode; useful for untrusted execution but not default local Z:-portable install. |
| browser-use | MISSED-STUDY-PILOT | Browser automation agent layer; overlaps Playwright/Chrome DevTools but may inform higher-level web-task patterns. |
| smolagents | MISSED-STUDY-PILOT | Minimal agent framework worth cite/pilot for small tool agents; not a CC-native install path. |
| agno-agi | MISSED-STUDY-PILOT | Modern agent framework with memory/tooling; useful comparison against LangGraph/CrewAI, not native CC. |
| Microsoft AutoGen | MISSED-STUDY-PILOT | Multi-agent research/framework candidate; too heavy for direct eee runtime adoption. |
| Microsoft Magentic-One | MISSED-STUDY-PILOT | AutoGen-derived multi-agent pattern; cite/pilot for orchestration, not install baseline. |
| Microsoft AutoGen Studio | CORRECTLY-OMITTED | GUI/app layer around AutoGen; poor fit for install-only Claude Code runtime. |
| CrewAI | MISSED-STUDY-PILOT | Popular role-agent orchestration; useful benchmark/comparison, but native CC plugins already cover simpler team workflows. |
| SWE-agent | MISSED-STUDY-PILOT | SWE-bench repair harness; relevant for CI rescue/eval, not day-to-day CC runtime primitive. |
| Aider | CORRECTLY-OMITTED | Competing coding CLI; useful external baseline, but not a primitive to install into Claude Code. |
| OpenAI Codex CLI | CORRECTLY-OMITTED | Already represented by installed `openai-codex` plugin cache; duplicate baseline, not missed adoption. |
| openai-skills | MISSED-STUDY-PILOT | Portable skill ecosystem could improve cross-agent skill parity; verify provenance before install. |
| LangChain | CORRECTLY-OMITTED | Broad app framework; LangGraph/DSPy are sharper fits for operator layers. |
| Cognita | CORRECTLY-OMITTED | Full RAG app/server; overlaps RAGFlow/DocsGPT class and exceeds local primitive scope. |
| Verba | CORRECTLY-OMITTED | Weaviate-centric RAG app; too much application surface for eee runtime. |
| DocsGPT | CORRECTLY-OMITTED | User-facing docs chat app; not a Claude Code primitive. |
| mintplex-labs/anything-llm | CORRECTLY-OMITTED | Full workspace/chat product; duplicates RAG app layer with SaaS/product concerns. |
| Continue.dev | CORRECTLY-OMITTED | Alternative IDE assistant; not a CC runtime primitive. |
| Continue.dev memory layer | MISSED-STUDY-PILOT | Memory/context design may be cite-worthy, but installing Continue is wrong for eee. |
| Cline | CORRECTLY-OMITTED | Alternative VS Code agent harness; not install target for Claude Code. |
| Roo Code | CORRECTLY-OMITTED | Cline-family alternative harness; useful comparison only. |
| Sema4 | CORRECTLY-OMITTED | Enterprise/RPA automation surface; weak fit for memory/RAG/token/observability baseline. |
| SkyPilot | CORRECTLY-OMITTED | Cloud compute orchestration; unrelated unless eee starts training/deploying infra jobs. |
| OpenBB | CORRECTLY-OMITTED | Finance data platform; domain-specific, not operator-layer primitive. |
| sweeppi / sweepr / sweteam class | CORRECTLY-OMITTED | Ambiguous/young repo surface; no clear mature primitive for eee baseline. |
| Manus | CORRECTLY-OMITTED | Closed/hosted agent product; not installable cleanly into Z:-portable CC runtime. |
| SuperAgent | CORRECTLY-OMITTED | Generic/older agent platform signal; no clear native CC fit versus current installed stack. |

## Q2 — Star inflation audit

| repo | claimed | verdict | reasoning |
|---|---:|---|---|
| `obra/superpowers` | 192,832 | VERIFIED count, SUSPICIOUS signal | GitHub API/page verifies ~192.7k stars, but repo was created 2025-10-09; this is VIRAL-YOUNG and should not be treated as burn-in proof. |
| `affaan-m/everything-claude-code` | 183,315 | VERIFIED count, LIKELY-INFLATED signal | GitHub API verifies ~183.2k stars on repo created 2026-01-18 with only a few open issues; adoption signal is fresh-paint/high-risk despite real count. |
| `thedotmack/claude-mem` | 75,996 | LIKELY-INFLATED | Star-history reports ~75k, but independent crawlers disagree sharply, Reddit audits allege abnormal star cohorts, and memecoin/quality controversy raises convergence Axis-3 risk. |
| `modelcontextprotocol/servers` | 85,717 | VERIFIED | GitHub API verifies 85,717; official org and 2024-11 creation make the count plausible, though memory ref server is not production-grade. |
| `infiniflow/ragflow` | 80,585 | PLAUSIBLE | Long-lived RAG project with broad visibility; still too heavy for eee primitive install. |
| `mem0ai/mem0` | 55,803 | VERIFIED/PLAUSIBLE | GitHub page shows 55.8k; created years ago with paper/docs/evals, so not a viral-young blocker. |
| `hesreallyhim/awesome-claude-code` | 43,866 | SUSPICIOUS | Third-party stats show ~43.5k; awesome-list star count is discovery signal only, not adoption proof; license/provenance require cite-only treatment. |
| `addyosmani/agent-skills` | 42,095 | SUSPICIOUS | Repo is real/high-quality, but GitHub page/search currently shows ~32.8k while other trackers show ~41.7k; claimed 42,095 needs re-probe before being cited as exact. |

## Q3 — Native CC path verification

| claim | verified? | correction if wrong |
|---|---|---|
| `/plugin marketplace add mksglu/context-mode` works as Claude Code native marketplace install | YES | Verified by local cache `.claude-plugin/marketplace.json` and upstream docs. Correction: license is Elastic-2.0/source-available, not MIT. It is native CC plugin plus npm for other platforms. |
| `yamadashy/repomix` has 3-plugin marketplace claim | YES | Upstream docs list `repomix-mcp`, `repomix-commands`, `repomix-explorer`; A3's 3-plugin claim is correct. |
| `@arizeai/phoenix-mcp@4.0.13` exists on npm | NOT VERIFIED | Local installed package is `@arizeai/phoenix-mcp` `4.0.11`; public crawlers show older/latest snapshots. Do not pin `4.0.13` without direct npm proof. Use installed `4.0.11` or re-run npm with writable cache. |
| `langfuse-mcp@1.2.0` exists on npm | NO / WRONG TARGET | Current Langfuse docs say native MCP is built into Langfuse at `/api/public/mcp` over streamable HTTP; no external package is required. Use `claude mcp add --transport http langfuse <url>/api/public/mcp --header ...`. |
| A3 `claude mcp add` syntax | PARTIAL | Official syntax is `claude mcp add --transport http <name> <url> --header ...` and `claude mcp add --transport stdio <name> [--env KEY=VAL] -- <command> [args...]`. A3 examples putting `--transport http --url <endpoint>` are wrong for Claude Code docs. |

## Q4 — OpenViking workaround assessment

| path | feasibility | recommendation |
|---|---|---|
| Volcengine Cloud SaaS API | PARTIAL | OpenViking supports Volcengine model providers and VikingDB data-plane mode, and docs expose HTTP client/server APIs. I did not verify a public hosted OpenViking SaaS endpoint equivalent to running the AGPL server. Treat as `[UNKNOWN]` until Volcengine documents hosted OpenViking API tenancy. |
| Stub/mock server calling public API only | FEASIBLE IF API EXISTS | Architecturally clean: eee would own a thin MIT/Apache client and call only hosted services. But if the hosted API is just self-hosted OpenViking HTTP, this does not avoid operating AGPL code. |
| CITE-CLASS reference path | FEASIBLE NOW | Use OpenViking patterns (`viking://`, L0/L1/L2 tiered context, directory retrieval, session context) as architecture citations without installing or vendoring AGPL server code. |

Recommendation: use CITE-CLASS now for the L4 wiki/temporal-KG design; open a separate Volcengine SaaS API verification before any runtime adoption. Do not self-host OpenViking inside `claude-sota-installed`.

## Q5 — Duplicate detection vs installed baseline

| recommendation | CR-12 class | rationale |
|---|---|---|
| doobidoo/mcp-memory-service | DUPLICATE-FUNCTIONALITY | Already installed as `.mcp.json` server `memory` with sqlite_vec backend. |
| getzep/graphiti | DUPLICATE-FUNCTIONALITY | Already installed as `.mcp.json` server `graphiti`. |
| Anthropic native `memory_20250818` | PARTIAL-OVERLAP | New API-layer memory, but overlaps installed `memory` + `graphiti`; pilot only with measurable win. |
| thedotmack/claude-mem | DUPLICATE-FUNCTIONALITY | Plugin cache already contains `thedotmack/claude-mem/13.2.0`; also overlaps `memory` capture layer and has star/quality risk. |
| mem0ai/mem0 | PROVIDER-COMPLEMENT | Not installed; overlaps memory layer but could benchmark against doobidoo/claude-mem. |
| volcengine/OpenViking | CITE-CLASS-CANONICAL | AGPL server blocks install; patterns useful for L4 architecture only. |
| cognee | PARTIAL-OVERLAP | Overlaps graphiti temporal/KG/control-plane memory; defer unless graphiti misses requirements. |
| anthropics/claude-plugins-official | DUPLICATE-FUNCTIONALITY | Plugin cache already contains `claude-plugins-official` and many installed official plugins. |
| obra/superpowers | DUPLICATE-FUNCTIONALITY | Present under `claude-plugins-official/superpowers/5.1.0`; do not re-install as new. |
| addyosmani/agent-skills | DUPLICATE-FUNCTIONALITY | Present under `addy-agent-skills/agent-skills`. |
| skill-creator | DUPLICATE-FUNCTIONALITY | Present under `claude-plugins-official/skill-creator`. |
| wshobson/agents / claude-code-workflows | PARTIAL-OVERLAP | Marketplace/cache present with several workflow plugins; only install missing curated plugins after per-plugin need. |
| EveryInc/compound-engineering-plugin | GENUINELY-NEW | Not seen in installed cache; strategy/product-pulse layer may complement current workflows. |
| trailofbits/skills-curated | GENUINELY-NEW | Not seen in installed cache; security-curated skills could add value after license/provenance probe. |
| context-mode | DUPLICATE-FUNCTIONALITY | Plugin cache contains `context-mode` 1.0.111/1.0.133; `.mcp.json` comment says plugin-supplied MCP replaced standalone. |
| repomix | DUPLICATE-FUNCTIONALITY | `.mcp.json` already has `repomix` MCP pinned to local global package. |
| serena | DUPLICATE-FUNCTIONALITY | `.mcp.json` already has SHA-pinned `serena`. |
| Phoenix MCP | DUPLICATE-FUNCTIONALITY | `.mcp.json` already has `phoenix`; local npm package is `@arizeai/phoenix-mcp` 4.0.11. |
| ccusage / `@ccusage/mcp` | DUPLICATE-FUNCTIONALITY | `.mcp.json` has `ccusage`; local package version 18.0.11. |
| Langfuse MCP | GENUINELY-NEW | Not installed; use built-in HTTP endpoint, not `langfuse-mcp@1.2.0`. |
| promptfoo | GENUINELY-NEW | Not installed; eval/red-team layer complements Phoenix/Langfuse. |
| Opik | PROVIDER-COMPLEMENT | Not installed; overlaps Phoenix/Langfuse observability/evals. |
| tokscale | PARTIAL-OVERLAP | Not installed but overlaps `ccusage`; cross-CLI value only. |

## PRESCRIBED EDITS for A5 synthesis

ADD:
- Add `markitdown` as ADOPT-NOW ingestion primitive; compare with Marker/MinerU pilots.
- Add DSPy, LangGraph, Inngest, E2B, browser-use, smolagents, AutoGen/Magentic-One, CrewAI as STUDY-PILOT architecture/eval candidates, not baseline installs.
- Add Langfuse built-in MCP endpoint rows: `/api/public/mcp` authenticated prompt MCP and `https://langfuse.com/api/mcp` docs MCP.

MODIFY:
- Change Phoenix pin from `@arizeai/phoenix-mcp@4.0.13` to "verify latest; local installed 4.0.11; do not claim 4.0.13 without npm proof."
- Change Langfuse install from `langfuse-mcp@1.2.0` to native HTTP MCP endpoint.
- Change Claude Code HTTP MCP examples to `claude mcp add --transport http <name> <url> --header ...`; remove `--url` flag examples.
- Change context-mode license from MIT to Elastic-2.0 and keep native plugin path.
- Downgrade `claude-mem` from STUDY-PILOT/high-confidence to DEFER or quarantine-pilot because installed cache already exists and star/quality signals are high-risk.
- Mark all already-installed baseline primitives as KEEP/REFRESH, not ADOPT-NOW.

REMOVE:
- Remove exact star counts as quality proof. Keep them only as volatile metadata with VIRAL-YOUNG warnings.
- Remove any "all candidates installable via `/plugin install` or `claude mcp add`" blanket claim; several are SDK/framework/app layers.

## CONFIDENCE on Wave 1 verdicts integration

NEEDS-REVISION conf=0.91

- A1 correctly protects against OpenViking AGPL self-host and keeps doobidoo+graphiti, but over-trusts `claude-mem` and under-covers document ingestion.
- A2 has useful CC-native marketplace inventory, but star counts are used too optimistically and many recommendations duplicate installed cache.
- A3 has the biggest correctness issues: wrong Langfuse package target, suspect Phoenix exact pin, wrong HTTP MCP syntax examples, and under-accounting for installed baseline duplicates.

## FINAL VERDICT: Integrate Wave 1 only after A5 downgrades duplicate ADOPT-NOW rows to KEEP/REFRESH, fixes Langfuse/Phoenix/MCP syntax, and adds the missed ingestion/eval/orchestration pilots without installing heavy competing frameworks.

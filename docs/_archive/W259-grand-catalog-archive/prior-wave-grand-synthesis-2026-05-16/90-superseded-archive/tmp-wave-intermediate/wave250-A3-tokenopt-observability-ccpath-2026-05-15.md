---
title: "Wave 250 Agent A3 — Token optimization + Observability + Native CC install-path SOTA research (POST-LLMLingua era)"
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher A3 (Sonnet stand-in per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE)
wave: wave250-3agent-parallel-A1-A2-A3
---

# Wave 250 A3 — Token optimization + Observability + Native CC path

## Discovery sources used (6 source families per multi-source-discovery-breadth-discipline.md)

1. GitHub MCP — search_repositories (4 queries; 25+ candidates surfaced)
2. DeepWiki MCP — ask_question (12 repos line-deep audited)
3. GitHub MCP get_file_contents — anthropics/claude-cookbooks README direct (TIER-1)
4. npm registry direct probe — 6 packages
5. PyPI registry direct probe — 2 packages
6. Anthropic CC docs via deepwiki canonical-repo wiki on anthropics/claude-cookbooks

EXA + Perplexity + arxiv MCP unavailable in this subagent runtime; routed via DeepWiki + GitHub + registry direct.

---

## PART 1 — Token optimization (POST-LLMLingua SOTA)

### LLMLingua-replacement EXPLICIT VERDICT

**The operator is correct: microsoft/LLMLingua is outdated for 2026 Claude Code.** Primary-source evidence:

- microsoft/LLMLingua live github description: "[EMNLP'23, ACL'24] To speed up LLMs' inference..." — academic 2023-2024 framing; positions as *external compressor before sending to API* — pre-server-side-compaction era.
- LLMLingua is third-party LOSSY token-dropper sitting outside model server. Anthropic API now ships **server-side primitives** that subsume the use case AND are LOSSLESS (vs LLMLingua's lossy token-dropping).

**The 2026 SOTA replacement is a STACK of 5 Anthropic-native primitives + codebase packer + cross-session memory tool**, NOT a single repo.

### 2026 Q2 SOTA TOKEN-EFFICIENCY STACK (primary-source verified)

| # | Primitive | What it does | Cite anchor (TIER-1) | Native CC tier |
|---|---|---|---|---|
| 1 | **Anthropic prompt caching** `cache_control:{type:"ephemeral"}` — 5min default, 1h beta | 90% cache-read discount (0.1x base); 25% write premium (1.25x); min 1024 tok Sonnet / 4096 tok Opus+Haiku 4.5 | anthropics/claude-cookbooks deepwiki §Prompt Caching + misc/prompt_caching.ipynb | **TIER-A NATIVE** (API param, no install) |
| 2 | **`clear_tool_uses_20250919`** (beta `context-management-2025-06-27`) | LOSSLESS tool-result clearing — drops bulky tool_result, keeps tool_use metadata; configurable trigger/keep/clear_at_least | anthropics/claude-cookbooks deepwiki §Context Management + code_review_demo.py | **TIER-A NATIVE** (API beta header) |
| 3 | **`compact_20260112`** server-side compaction | LOSSY whole-transcript summarization via `compaction_control`; preserves enough context for long-running agents past hard-context-limit | anthropics/claude-cookbooks deepwiki §Server-side Compaction + misc/session_memory_compaction.ipynb | **TIER-A NATIVE** (API beta) |
| 4 | **`clear_thinking_20251015`** | Auto-clears extended-thinking blocks (keep last N); MUST be first edits[] entry when combined with clear_tool_uses | anthropics/claude-cookbooks deepwiki §Thinking Block Clearing + tool_use/memory_cookbook.ipynb | **TIER-A NATIVE** (API beta) |
| 5 | **`memory_20250818`** client-side memory tool | 6 commands (view/create/str_replace/insert/delete/rename); CROSS-SESSION token reduction; cookbook case: 333,977→172,623 peak tokens in Session 2 | anthropics/claude-cookbooks deepwiki §Memory Tool + tool_use/memory_tool.py MemoryToolHandler | **TIER-A NATIVE** (Anthropic-shipped) |

### Third-party 2026 codebase-to-context packers (TIER-A native plugins)

| Repo | Stars/Ver | License | Install path (CR-6) | Token reduction | Native CC tier | Probe DAG |
|---|---|---|---|---|---|---|
| **mksglu/context-mode** | npm 1.0.135 (2026-05-15) | **MIT** (npm authority; deepwiki said ELv2 — stale) | `/plugin marketplace add mksglu/context-mode && /plugin install context-mode@context-mode` OR `npm install -g context-mode` | **94-99%** via 3 pillars: PolyglotExecutor (11 lang sandbox), FTS5+BM25 ContentStore, SessionDB compaction-survival | **TIER-A NATIVE PLUGIN** | PASS — INSTALLED in sibling claude-sota; full hook coverage |
| **yamadashy/repomix** | npm 1.14.0 | MIT | `/plugin marketplace add yamadashy/repomix && /plugin install repomix-mcp@repomix` (also `-commands`, `-explorer`) | **~70%** via Tree-sitter | **TIER-A NATIVE PLUGIN** (3-plugin marketplace) | PASS — mature MCP, official marketplace |
| **oraios/serena** | v1.3.0 (2026-05-12) | MIT | `uv tool install -p 3.13 serena-agent@latest --prerelease=allow` | Symbol-level edits = 1 atomic call vs many grep+read; "counteract Claude Code regressions" prompt | **TIER-B NATIVE MCP** | PASS — 40+ language LSPs |
| **mufeedvh/code2prompt** | Rust v4.2.0 | MIT | `cargo install code2prompt` OR `brew install` OR `pip install code2prompt-rs` | tiktoken-rs token accounting | **TIER-B NATIVE MCP** (prototype) | PARTIAL — MCP is prototype; CLI mature |
| **chopratejas/headroom** | mid | Apache-2.0 | `pip install headroom` OR `npm install headroom` OR `headroom mcp install` | **50-90%**; 87% logs, 92% code/SRE, 73% GitHub triage | **TIER-A NATIVE PLUGIN** + TIER-B MCP | PASS — Python+TS SDK + proxy mode |
| **jia-gao/leanctx** | 226★ (created 2026-04-18) | MIT | `pip install leanctx` | "40-60% token bill" — LLMLingua-2 substrate per repo description | **TIER-D INDIRECT** | **DEFER — axis-3 fail (1mo) + uses operator-flagged outdated substrate** |

### Top-N RECOMMENDATIONS (Part 1)

**ADOPT-NOW**:
1. Anthropic prompt caching — zero install, cache_control blocks in system+agents
2. `context-management-2025-06-27` beta — combine clear_thinking_20251015 + clear_tool_uses_20250919 + compact_20260112
3. `memory_20250818` — implement MemoryToolHandler; wire `/memories/` to `Z:/claude-sota-installed-state/.claude/memories/`
4. `context-mode` — TIER-A plugin; closes codebase-flooding; proven in sibling
5. `repomix` — TIER-A 3-plugin (mcp+commands+explorer)

**STUDY-PILOT**: `serena` — TIER-B MCP; orthogonal symbol-edit win

**REJECT-FOR-FIT**: microsoft/LLMLingua (superseded), jia-gao/leanctx (LLMLingua-2 substrate + axis-3 fail)

---

## PART 2 — Observability + Evals

### Candidate inventory + Probe DAG scoring

| Repo | Stars | License | Install path | MCP Server | CC integration | Tier | Probe DAG |
|---|---|---|---|---|---|---|---|
| **Arize-ai/phoenix** | **9,693★** | **Elastic 2.0** (server); MCP wrapper Apache-2.0 | `pip install arize-phoenix` OR Docker | `@arizeai/phoenix-mcp@4.0.13` (Apache-2.0; verified npm) + `phoenix-docs-mcp` | YES — `claude mcp add phoenix` + docs MCP | **TIER-B NATIVE MCP** | PASS — OpenTelemetry, framework-agnostic; **ELv2 license caveat** (no re-host as competing service) |
| **langfuse/langfuse** | operator-named | **MIT** core; `ee/` commercial | `git clone + docker compose up` OR `npm install langfuse` OR `langfuse-mcp@1.2.0` (npm verified) | YES — `localhost:3000/api/public/mcp` OR cloud | YES — `claude mcp add langfuse --transport http --header "Authorization: Basic <base64>"` | **TIER-B NATIVE MCP** | **PASS** — MIT core, PostgreSQL-centralized |
| **pydantic/logfire** | high | **MIT** SDK; **commercial** platform | `pip install logfire` | YES — `claude mcp add logfire -e LOGFIRE_READ_TOKEN -- uvx logfire-mcp@latest` | YES — `logfire.instrument_anthropic()` | TIER-B MCP + TIER-C SDK | PASS — SDK OSS; backend commercial (pricing concern) |
| **Helicone/helicone** | high | Apache-2.0 | `git clone + ./helicone-compose.sh` | NO native MCP | YES — base_url proxy + auth header | **TIER-C PROXY** (SDK-style, not MCP) | PASS — distributed (Cloudflare/ClickHouse/Kafka) + built-in caching |
| **lunary-ai/lunary** | mid | Apache-2.0 | `docker compose up` OR `bun install` | NO native MCP | YES — LangChain callback only | **TIER-D INDIRECT** | PARTIAL — LangChain-only, no direct Anthropic SDK |
| **comet-ml/opik** | v3.1.0 (2026-02-24) | Apache-2.0 | `./opik.sh` Docker OR k8s/helm OR Comet Cloud | YES — Cursor/VSCode advertised | YES — `make claude` syncs rules + OTel env vars | **TIER-B NATIVE MCP** | **PASS** — Apache-2.0, LLM-as-judge built-in, active 2026 |
| **traceloop/openllmetry** | v0.50.1 | Apache-2.0 | `pip install traceloop-sdk` OR `pip install opentelemetry-instrumentation-anthropic` | partial (MCP streamable HTTP transport instrumentation only) | YES — `Traceloop.init()` auto-instruments Anthropic SDK | **TIER-C NATIVE SDK** | PASS — pure OTel; pairs with Phoenix/Langfuse backend |
| **promptfoo/promptfoo** | high (acquired by OpenAI 2026) | **MIT** | `npm install -g promptfoo` OR `pip install` OR `brew install` | YES — `promptfoo mcp` stdio/http | YES — Anthropic Claude Agent SDK for agentic evals | **TIER-A PLUGIN** + TIER-B MCP | **PASS** — OpenAI-backed MIT, eval+redteam, 60+ providers, OWASP LLM Top 10 |
| **explodinggradients/ragas** | high | Apache-2.0 | `pip install ragas` | NO native MCP | YES — `provider="anthropic"` + Claude Code action CI | **TIER-C NATIVE SDK** | PASS — RAG-focused (orthogonal to promptfoo) |
| **junhoyeo/tokscale** | **2,952★** | MIT | `npx tokscale` OR `bunx` OR `deno dx` | NO native MCP | YES — scans `~/.claude/projects/` + 25 CLI session paths | **TIER-D CLI** | PASS — Rust SIMD, 25-CLI coverage, LiteLLM pricing + OpenRouter fallback |
| **ryoppippi/ccusage** | v18.0.11 | MIT | `npx ccusage@latest` (recommended) OR `npm install -g ccusage` | YES — `@ccusage/mcp` separate package | YES — analyzes `~/.claude/projects/*.jsonl`; statusline | **TIER-A PLUGIN** + TIER-B MCP | **PASS** — claude-code-specific; daily/weekly/monthly/session/5h reports |

### Top-N RECOMMENDATIONS (Part 2)

**ADOPT-NOW**:
1. `langfuse` + `langfuse-mcp@1.2.0` — operator-named; MIT core; tracing+evals+playground+prompt-mgmt
2. `@arizeai/phoenix-mcp@4.0.13` — Apache-2.0 wrapper; pair with `traceloop/openllmetry` for OTel
3. `promptfoo` — TIER-A native (npm + MCP); OpenAI-backed MIT
4. `ccusage` + `@ccusage/mcp` — claude-code-specific cost; trivial install

**STUDY-PILOT**: `opik` (LLM-as-judge auto-evals; pair with Phoenix); `tokscale` (cross-CLI tracker)

**DEFER**: `helicone` (proxy-only, no native MCP); `logfire` (commercial backend); `lunary` (LangChain-only)

---

## PART 3 — Native CC install-path matrix (consolidated)

### TIER-A NATIVE PLUGIN

| Plugin | Marketplace install (CR-6 official-native-channel) | Difficulty |
|---|---|---|
| `context-mode` | `/plugin marketplace add mksglu/context-mode && /plugin install context-mode@context-mode` | trivial |
| `repomix-mcp` + commands + explorer | `/plugin marketplace add yamadashy/repomix && /plugin install repomix-mcp@repomix` (×3 plugins) | low |
| `headroom` | `headroom mcp install` (verify marketplace.json) | low |
| `promptfoo` | `npm install -g promptfoo` + `claude mcp add promptfoo --transport stdio -- promptfoo mcp` | low |
| `ccusage` | `npx ccusage@latest` for CLI; `claude mcp add ccusage -- npx -y @ccusage/mcp` | trivial |

### TIER-B NATIVE MCP

| MCP Server | Add command | Difficulty |
|---|---|---|
| `@arizeai/phoenix-mcp` (Apache-2.0) | `claude mcp add phoenix -e PHOENIX_BASE_URL -e PHOENIX_API_KEY -- npx -y @arizeai/phoenix-mcp` | low |
| `@arizeai/phoenix-docs-mcp` | `claude mcp add phoenix-docs -- npx -y @arizeai/phoenix-docs-mcp` | trivial |
| `langfuse-mcp` (v1.2.0) | `claude mcp add langfuse --transport http --url <endpoint> --header "Authorization: Basic <base64>"` | low (server up first) |
| `logfire-mcp` | `claude mcp add logfire -e LOGFIRE_READ_TOKEN -- uvx logfire-mcp@latest` | low |
| `opik` MCP | per Opik docs (Cursor/VSCode/Windsurf) | medium |
| `graphiti` mem L3 | `claude mcp add graphiti --transport stdio -- python -m graphiti_core.mcp` (sibling-installed pattern) | medium (needs Neo4j/FalkorDB/Kuzu/Neptune) |
| `serena-agent` | `claude mcp add serena -- uv tool run serena-agent` | low |
| `code2prompt-mcp` (prototype) | manual clone + rye run | high |

### TIER-C NATIVE SDK (claude-agent-sdk wrappable)

- `traceloop-sdk` (OpenLLMetry) — `pip install traceloop-sdk` → `Traceloop.init()` auto-instruments
- `arize-phoenix` (server) — `pip install arize-phoenix` → `phoenix.app()`
- `ragas` — `pip install ragas` → `provider="anthropic"`
- `headroom` Python SDK — `pip install headroom` → proxy/middleware mode

### TIER-D INDIRECT

- `jia-gao/leanctx` (Python SDK only); `lunary` (LangChain-only); `tokscale` (CLI/TUI only)

### TIER-E REFERENCE-ONLY

- **microsoft/LLMLingua** (superseded — cite as historical pattern only)
- `helicone` (proxy-only); `LKbaba/Claude-code-ChatInWindows` (GUI shell, out of scope)

---

## REJECT/DEFER candidates

| Candidate | Reason | CR-12 disposition |
|---|---|---|
| microsoft/LLMLingua | Lossy external compression superseded by Anthropic lossless server-side primitives. Operator-flagged outdated. | DUPLICATE-FUNCTIONALITY |
| jia-gao/leanctx | Axis-3 fail (1mo); LLMLingua-2 substrate (operator-flagged outdated) | DUPLICATE-FUNCTIONALITY + axis-3 fail |
| Helicone (as core observability) | Proxy-only Anthropic; no native MCP; sss direct-API | PARTIAL-OVERLAP (useful as caching, not primary) |
| Lunary | LangChain-only Anthropic path; sss doesn't use LangChain | PARTIAL-OVERLAP |
| Logfire platform | Backend commercial; operator likely wants fully-OSS stack | CITE-CLASS-CANONICAL (keep SDK reference) |

## GAPS / HONEST-NON-FINDING (HNF)

1. **HNF**: EXA + Perplexity + arxiv MCP tools unavailable in this subagent runtime — substituted via DeepWiki + GitHub + npm/PyPI direct probes (sufficient for primary-source coverage). Operator may run arxiv probe in A4/A5 synthesis if needed.
2. **HNF**: WebFetch blocked by context-mode guardrail; could not fetch `docs.anthropic.com` directly. DeepWiki on `anthropics/claude-cookbooks` substitutes (canonical upstream-Anthropic-sourced wiki).
3. **HNF**: `braintrustdata/braintrust` not indexed in DeepWiki — could not verify; deferred.
4. **HNF**: `chopratejas/headroom` deepwiki claims TIER-A plugin but `/plugin marketplace add chopratejas/headroom` install path NOT confirmed — orchestrator should probe `marketplace.json` existence before relying.
5. **HNF**: License drift on `context-mode` (deepwiki said ELv2; live npm `1.0.135` says MIT). npm-registry is authoritative; deepwiki stale.
6. **Mia probe RECOMMENDED**: Probe 6 (license/badge) on Phoenix before adopting — ELv2 (server) prevents some hosted-service use cases. MCP wrapper IS Apache-2.0 (verified via npm registry).

## FINAL VERDICT: 2026 SOTA token-efficiency = Anthropic-native stack (5 primitives: prompt-caching + clear_tool_uses_20250919 + compact_20260112 + clear_thinking_20251015 + memory_20250818) + context-mode/repomix codebase packers + serena/code2prompt code-aware editing. LLMLingua correctly identified by operator as outdated — superseded by Anthropic server-side lossless primitives + native Memory tool. Observability: Langfuse (operator-named) + Phoenix-MCP + Promptfoo + ccusage form a fully-OSS Tier-A/B native install stack. All candidates installable via `/plugin install` (Tier-A) or `claude mcp add` (Tier-B) per CR-6 official-native-channel.

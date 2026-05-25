---
title: 12-Category Stack Design
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 251
cite-anchor: docs/sota-research-architecture-2026-05-11.md (L0-L8 + K/L/M/N/O 14-layer architecture)
---

# 12 Categories — Stack Design

## Why 12 categories

Wave 250 baseline used 4 macro-categories (Memory+RAG / Orchestration+Skills / Token-opt / Observability). Operator's "all layers we previous researched and beyond" requires finer cuts — this design splits into 12 categories that map directly onto SRA L0-L8 + K/L/M/N/O 14 layers + 4 unique-to-this-runtime categories (parsers / browser-sandbox / model-routing / discovery-catalogs).

Per `kiss-dry-yagni.md` discipline: 12 is selected as the minimum cut that preserves orthogonality. 8 was too coarse (collapsed parsers into RAG losing the markitdown distinction); 16+ over-fragmented.

## 12-category enumeration

| # | Category | Purpose | SRA layer mapping | Preferred CC-tier |
|---|---|---|---|---|
| **01** | **Memory + RAG** (L1-L7 stack) | Persistent recall + vector + temporal-KG + wiki + parser layer | E (Memory/Knowledge) | A plugin / B MCP |
| **02** | **Orchestration + Agent fleet** | Subagent dispatch + teams + fan-out + Wave/Ralph loops | L7 (Construction) + advanced agent team | A plugin |
| **03** | **Skills + Marketplaces** | Auto-fire skills + marketplace registries | L7 + skill-creator | A canonical Anthropic |
| **04** | **Token-efficiency + Compaction + Caching** | Anthropic 5-primitive stack + codebase packers | L (Cost/quota/cache) | A plugin / API-native |
| **05** | **Observability + Evals + Telemetry** | OTel + tracing + LLM-judge + cost tracking | L8 (Feedback) + I (Observability) | B native MCP |
| **06** | **Hooks + Security floor + Permission discipline** | PreToolUse / PostToolUse / Stop / Lethal Trifecta filter | K (Security/sandboxing/policy) | A plugin / native hook |
| **07** | **Document parsers + Ingestion** | PDF/MD/HTML → text for RAG ingestion | L2 (Ingestion) parser layer | C SDK wrappable |
| **08** | **Browser-control + Sandboxed-execution** | Headless browser + DOM + sandboxed code | D (Web Research) + L7 sandbox | B native MCP |
| **09** | **Code-intelligence** (LSP / SCIP) | Symbol navigation + impact analysis + dep graph | C (Code Intelligence) | B native MCP |
| **10** | **Model routing + AI gateway** | Provider failover + cost-aware routing + rate limit | L (Cost/quota) gateway sub-layer | C proxy SDK |
| **11** | **Knowledge graphs + temporal-KG + RAG-graph** | Entity + relationship + time-aware fact updates | L3 (Evaluation) graph + L6 Knowledge graph | B native MCP |
| **12** | **Discovery catalogs** (awesome-* meta-references) | Cross-curated meta-references for L1 Discovery | L1 (Discovery) meta-reference | E reference-only |

## Per-category stack diagrams

### Cat 01 — Memory + RAG (per Wave 250 §1)
```
L1 capture     = doobidoo/mcp-memory-service (Apache-2.0)        [✅ INSTALLED]
L2 vector      = sqlite_vec embedded in L1                       [✅ INSTALLED]
L3 temporal-KG = getzep/graphiti @ FalkorDB                      [⚠️ NOT-WIRED]
L4 wiki        = TBD — cite OpenViking architecture (AGPLv3 block)
L5 (NEW)       = Anthropic memory_20250818 native API tool       [⚠️ NOT-WIRED]
L6 (alt-L1)    = thedotmack/claude-mem (DOWNGRADED per A4 Reddit-audit)
L7 (alt-L1)    = mem0ai/mem0 benchmark-leader algorithm
```

### Cat 02 — Orchestration + Agent fleet
```
Layer 1 = main session (Opus 4.7 / Sonnet 4.6 / Haiku 4.5)
Layer 2 = subagent fan-out (Agent tool with isolation:worktree)
Layer 3 = TeamCreate (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1) — full-context teammates
Layer 4 = cron-mode /loop + ScheduleWakeup dynamic-mode
Layer 5 = compound-engineering-plugin strategy + product-pulse
```

### Cat 03 — Skills + Marketplaces
```
Tier A canonical (Anthropic):
  - anthropics/claude-plugins-official
  - anthropics/skills (NEW @135K★)
  - claude-plugins-official/skill-creator
  - claude-plugins-official/superpowers
Tier A third-party:
  - obra/superpowers (192K★)
  - addyosmani/agent-skills (42K★ Google Chrome team)
  - EveryInc/compound-engineering-plugin (16K★)
  - wshobson/claude-code-workflows (80-plugin)
  - trailofbits/skills-curated (security-vetted)
```

### Cat 04 — Token-efficiency
```
Anthropic-native 5-primitive (no install):
  1. cache_control:{type:"ephemeral"} (90% read discount)
  2. clear_tool_uses_20250919 (lossless tool-result clearing)
  3. compact_20260112 (lossy compaction)
  4. clear_thinking_20251015 (auto-clear extended-thinking)
  5. memory_20250818 (client-side memory tool)
Third-party packers:
  - mksglu/context-mode (94-99% via PolyglotExecutor + FTS5+BM25)  [✅ INSTALLED]
  - yamadashy/repomix (~70% Tree-sitter)                           [✅ INSTALLED]
  - oraios/serena (symbol-level edits = 1 atomic call)             [✅ INSTALLED]
```

### Cat 05 — Observability + Evals
```
Tracing/observability:
  - langfuse/langfuse (MIT core; HTTP MCP)                         [⚠️ NOT-WIRED]
  - Arize-ai/phoenix (Elastic-2.0 server + Apache-2.0 MCP wrapper) [⚠️ NOT-WIRED]
  - traceloop/openllmetry (pure OTel)
Evals:
  - promptfoo/promptfoo (MIT; OpenAI-backed 2026; OWASP LLM Top 10)
  - explodinggradients/ragas (RAG-focused)
  - comet-ml/opik (LLM-as-judge auto-evals)
Cost tracking:
  - ryoppippi/ccusage (Δ refresh)                                  [✅ INSTALLED]
  - Piebald-AI/splitrail (cross-CLI)
```

### Cat 06 — Hooks + Security
```
Native CC hooks:
  - PreToolUse / PostToolUse / Stop / SubagentStart / SubagentStop
  - SessionStart / UserPromptSubmit / PermissionRequest
Local safety floor:
  - safety_guard.py (regex deny-list catastrophic patterns)
  - agent_plan_readonly_bash_guard.py (plan-mode read-only)
  - codex_t1_consult_gate.py (cross-model T1 enforcer)
External plugins:
  - trailofbits/skills-curated (security-vetted plugin floor)      [⚠️ NOT-INSTALLED]
```

### Cat 07 — Document parsers
```
Markdown converters:
  - microsoft/markitdown (123K★ MIT) — preferred (Δ1)              [⚠️ NOT-WIRED]
PDF specialists:
  - VikParuchuri/marker (35K★ GPL-3.0 caveat)
  - MinerU (heavier than markitdown)
HTML/web:
  - mcp__firecrawl__firecrawl_scrape (live)
```

### Cat 08 — Browser + Sandbox
```
Browser:
  - microsoft/playwright-mcp (B native MCP)                        [✅ INSTALLED]
  - chrome-devtools-mcp                                            [✅ INSTALLED]
  - browser-use/browser-use (94K★ MIT) — Δ2 STUDY-PILOT
Sandboxed-execution:
  - e2b-dev/E2B (12K★ Apache-2.0) — Δ2 STUDY-PILOT
  - mksglu/context-mode PolyglotExecutor (already installed)
```

### Cat 09 — Code-intelligence
```
LSP:
  - oraios/serena (B native MCP)                                   [✅ INSTALLED]
Symbol search:
  - ast-grep/ast-grep
  - tree-sitter (substrate)
Code search:
  - sourcebot-dev/sourcebot
Local:
  - GitNexus (eee-local; ⚠️ stale-check before edits)
```

### Cat 10 — Model routing
```
AI gateways:
  - LiteLLM (provider routing)
  - Helicone (proxy-only; no native MCP — REJECTED)
Per-account quota:
  - cpa-usage-keeper sidecar
  - CPA Mgmt UI (eee-local)
```

### Cat 11 — Knowledge graphs
```
Temporal-KG (PRIMARY for L3):
  - getzep/graphiti (Apache-2.0 + arxiv:2501.13956) — Δ1 INSTALL-NOW
Entity-graph alternatives:
  - topoteretes/cognee (PARTIAL-OVERLAP — DEFER)
Backends:
  - FalkorDB (preferred; Docker container)
  - Neo4j (heavier)
```

### Cat 12 — Discovery catalogs
```
TIER-1 awesome-* (cite-only):
  - hesreallyhim/awesome-claude-code (43K★ CC-BY-NC-ND-4.0)
  - sickn33/antigravity-awesome-skills (37K★ MIT)
  - VoltAgent/awesome-agent-skills (21K★ MIT)
  - travisvn/awesome-claude-skills (12K★ MIT)
  - rohitg00/awesome-claude-code-toolkit (1K★ MIT)
  - punkpeye/awesome-mcp-servers (85K★ MIT)
  - quemsah/awesome-claude-plugins (verify LICENSE)
```

## SRA layer mapping (full)

| SRA layer | Categories serving this layer |
|---|---|
| L0 Identity | (governance — out of scope this catalog) |
| L1 Discovery | Cat 12 |
| L2 Ingestion | Cat 07 |
| L3 Evaluation | Cat 05 + Cat 11 (graph component) |
| L4 Memory (legacy) | (mapped to E Memory/Knowledge now) |
| L5 Authoring | (out of scope) |
| L6 Knowledge | Cat 11 |
| L7 Construction | Cat 02 + Cat 03 + Cat 08 sandbox |
| L8 Feedback | Cat 05 |
| K Security/Sandboxing | Cat 06 + Cat 08 sandboxed-exec |
| L Cost/Quota/Cache | Cat 04 + Cat 10 |
| M Provenance | (cross-cutting) |
| N Observability | Cat 05 |
| O Governance | (out of scope this catalog) |
| C Code Intelligence | Cat 09 |
| D Web Research | Cat 08 browser |
| E Memory/Knowledge | Cat 01 |
| I Observability | Cat 05 |

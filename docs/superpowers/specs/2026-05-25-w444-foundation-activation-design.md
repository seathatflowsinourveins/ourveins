# W444 Foundation Activation Grand Plan — Design Spec

> **Wave**: W444
> **Author**: Opus 4.7 orchestrator
> **Date**: 2026-05-25
> **Status**: APPROVED (operator verbal approval + auto-ship directive)
> **Codex-Verdict**: Pending (r1 convergence scheduled post-commit)

## 1. Problem Statement

The claude-sota-installed runtime has 8,725 tracked files, 68 skills, 18 MCP servers, 32 CI workflows, 51 enabled plugins, and a 4-tier model hierarchy — but critical foundation subsystems are installed without being activated end-to-end:

- **Research engine**: 3/7 v23 angles live (A5 deepwiki, A6 repomix, A7 registry). A1-A4 (Perplexity, Exa, Firecrawl, gpt-researcher) are stub implementations despite all 5 API keys being set in the environment.
- **ALW autonomous loop**: 8 source files, code-complete headless runner, zero autonomous ticks ever executed.
- **Agent orchestration**: CC Agent Teams enabled, ruflo 215-tool MCP wired, but neither is used in the research tick.
- **Service management**: 5+ NSSM services running on frozen 2017-era software. SOTA successor (Servy, MIT, 1039★, active Jan 2026) not installed.
- **Model routing**: Cognee uses local Qwen3.6-35B exclusively. Subscription models (GPT-5.5/Opus) would give higher extraction quality.
- **CLAUDE.md drift**: 5 stale counts (skills 63→68, MCP 16→18, plugins 47→51, caches 15→16, marketplaces 21→22).

## 2. Goals

1. Activate ALL 7 v23 research angles with live API data
2. Start ALW as a persistent background daemon (6-hour tick interval)
3. Wire agent orchestration (ruflo + CC Agent Teams) into every ALW tick
4. Migrate service management from NSSM to Servy + Docker Compose
5. Switch Cognee to subscription-primary + local-fallback model routing
6. Fix all CLAUDE.md drift to zero
7. All changes gated by codex GPT-5.5 adversarial review

## 3. Non-Goals

- Fine-tuning local models (Unsloth/vLLM) — deterministic scoring code handles this
- Installing new research repos (Hermes Agent, AutoResearchClaw, STORM) — our v23 engine is the research architecture
- Replacing local model stack — it stays as fallback tier for offline resilience and high-volume bulk operations
- Publishing to ourveins public (separate Stream D task #891)

## 4. Architecture

### 4.1 Five Parallel Streams

```
Stream A: Research Engine Full-Power (v23 → 7/7 angles live)
Stream B: ALW Background Daemon (persistent autonomous loop)
Stream C: Agent Orchestration E2E (ruflo + teams in every tick)
Stream D: Housekeeping (drift fix + memory provision + .coderabbit.yaml)
Stream E: Service Infrastructure Modernization (NSSM → Servy + Docker Compose)
```

### 4.2 Service Architecture (3-tier hybrid)

```
Tier 1 — Servy (replaces NSSM) — GPU-bound native services
  ├── IkLlamaServer    (:8080, GPU mlock, Qwen3.6-35B)
  ├── LlamaSwap        (:8090, GPU model routing, 6 slots)
  ├── Ollama           (:16700, GPU inference, qwen3-coder + qwen3-embedding)
  └── Docker Engine    (Servy manages Docker daemon as a boot service)

Tier 2 — Docker Compose — non-GPU containerized services
  ├── cognee-mcp       (:8000, OpenAI API primary, IkLlamaServer fallback)
  ├── langfuse         (:3000, self-hosted observability)
  ├── agentmemory      (:3111, provisions task #811)
  ├── alw-daemon       (headless-runner, 6h tick interval)
  └── postgres/neo4j   (backing stores)

Tier 3 — MCP stdio servers — spawn-on-demand (no daemon)
  ├── basic-memory, deepwiki, repomix, codegraph, serena
  ├── perplexity, exa, firecrawl, gpt-researcher, ruflo
  └── github, chrome-devtools, playwright, context7, docling, hf-mcp-server
```

### 4.3 Model Routing Policy (formalized)

| Role | Model | Cost Tier | Rationale |
|---|---|---|---|
| Discovery triage | Local qwen3-coder:30b (Ollama :16700) | Free | Classify 100+ repos/hour at zero marginal cost |
| Web research data | Perplexity + Exa + Firecrawl + Tavily APIs | ~$0.01/query | Data retrieval, not LLM judgment |
| CVS scoring | Deterministic code (scoring-rubric.mjs) | Zero | No LLM involved — weighted formula |
| Cognee KG ingest | OpenAI API (primary), IkLlamaServer (fallback) | Subscription / Free | Subscription gives higher extraction quality |
| Embeddings | OpenAI text-embedding-3-large (primary), qwen3-embedding (fallback) | Subscription / Free | Cloud quality, local resilience |
| Adversarial review | codex GPT-5.5 | Subscription | Cross-model gate (binding authority) |
| Orchestration | Opus 4.7 | Subscription | Planning + synthesis + tool orchestration |
| Tie-break | Sonnet 4.6 | Subscription | When codex r1+r2 diverge |

### 4.4 Research Engine — 7 Angles

| Angle | Source | MCP Server | API Key | Status |
|---|---|---|---|---|
| A1 Perplexity | perplexity_ask/search | perplexity | PERPLEXITY_API_KEY ✅ | **Wire** (stub → live) |
| A2 Exa | web_search_exa | exa | EXA_API_KEY ✅ | **Enable MCP + Wire** |
| A3 Firecrawl | firecrawl_scrape/search | firecrawl | FIRECRAWL_API_KEY ✅ | **Wire** (stub → live) |
| A4 gpt-researcher | quick_search/deep_research | gpt-researcher | OPENAI_API_KEY+TAVILY_API_KEY ✅ | **Wire** (stub → live) |
| A5 Deepwiki | ask_question | deepwiki | None (free) | ✅ Live |
| A6 Repomix | pack_remote_repository | repomix | None (free) | ✅ Live |
| A7 Registry | GitHub GraphQL + npm/PyPI | None (direct HTTP) | GITHUB_TOKEN ✅ | ✅ Live |

## 5. Stream Details

### Stream A — Research Engine Full-Power

1. Enable Exa MCP server in `.mcp.json` (change `disabled: true` → remove disabled flag)
2. Wire A1 perplexity-angle.mjs: replace stub with `callTool({server:'perplexity', name:'perplexity_ask', arguments:{...}})`
3. Wire A2 exa-angle.mjs: replace stub with `callTool({server:'exa', name:'web_search_exa', arguments:{...}})`
4. Wire A3 firecrawl-angle.mjs: replace stub with `callTool({server:'firecrawl', name:'firecrawl_search', arguments:{...}})`
5. Wire A4 gpt-researcher-angle.mjs: replace stub with `callTool({server:'gpt-researcher', name:'quick_search', arguments:{...}})`
6. Integration test: run one full 7-angle convergence on `anthropics/claude-code`
7. **Tests**: 4 new angle integration tests + 1 full-convergence integration test

### Stream B — ALW Background Daemon

1. Create `docker-compose.yml` with ALW daemon service definition
2. Configure: 6-hour tick interval, graceful SIGINT, log to mounted volume `tmp/alw/`
3. Wire tick to use all 7 v23 angles + ruflo hooks_route + memory_store
4. First tick on startup: discover → score top 5 → persist verdicts → auto-PR if INSTALL-tier
5. Health endpoint: HTTP :9090/health returns tick count + last tick timestamp
6. **Tests**: service start, first tick completes, graceful shutdown

### Stream C — Agent Orchestration E2E

1. ruflo `swarm_init` at ALW daemon startup
2. ruflo `hooks_route` for model selection per-tick (qwen3→Opus routing)
3. ruflo `memory_store` for tick results (key: `alw-tick-<epoch>`)
4. CC Agent Teams dispatch when batch scoring >5 repos (3-agent parallel fan-out)
5. **Tests**: one ALW tick uses ruflo routing, verified in logs

### Stream D — Housekeeping

1. Fix CLAUDE.md runtime state counts: skills 63→68, MCP 16→18, enabled_true 47→51, cache_dirs 15→16, marketplace_records 21→22
2. Add `.coderabbit.yaml` to project root (copy from ourveins-work, already authored)
3. Fix ruflo MCP version in `.mcp.json`: 3.5.0 → 3.10.1 (per W443 verification)
4. Provision agentmemory :3111 in Docker Compose (closes task #811)

### Stream E — Service Infrastructure Modernization

1. Install Servy: download from [github.com/aelassas/servy](https://github.com/aelassas/servy) releases
2. Migrate IkLlamaServer from NSSM → Servy (GPU, mlock, :8080)
3. Migrate LlamaSwap from NSSM → Servy (GPU, model routing, :8090)
4. Migrate Ollama from NSSM → Servy (:16700)
5. Register Docker Engine as Servy boot service
6. Create `docker-compose.yml` for Tier 2 services (cognee, langfuse, agentmemory, ALW, postgres)
7. Switch Cognee LLM provider: local-only → OpenAI-primary + local-fallback
8. Remove NSSM services after Servy migration verified
9. **Tests**: all services survive reboot, Servy GUI shows live metrics

## 6. Error Handling

| Stream | Failure Mode | Handling |
|---|---|---|
| A | MCP server timeout | Exponential backoff (existing). Falls back to min-angles threshold |
| A | API key revoked | Angle returns `{skipped: true, reason: 'auth_failed'}`. CVS from remaining angles |
| B | ALW daemon crash | Docker `restart: unless-stopped`. Tick is idempotent |
| B | Disk full (verdicts) | Verdict store rotates after 1000 files → archive |
| C | ruflo MCP not responding | Graceful fallback: skip hooks_route → default Opus. Skip memory_store → local JSON |
| C | Agent team member fails | empty-final-message-guard + worker-failure-termination-guard |
| E | Servy install fails | Keep NSSM as fallback, retry Servy next session |
| E | Docker GPU issues | GPU services stay on Servy native; only non-GPU services in Docker |

## 7. Testing & Success Criteria

### New Tests (19 total)
- 4 angle integration tests (A1-A4 live MCP calls)
- 1 full 7-angle convergence integration test
- 3 ALW daemon lifecycle tests (start, tick, shutdown)
- 2 ruflo integration tests (hooks_route, memory_store)
- 3 Docker Compose stack tests (up, healthcheck, down)
- 3 Servy migration tests (service starts, GPU accessible, auto-restart)
- 1 Cognee subscription-model test (OpenAI API extraction)
- 1 end-to-end smoke test (ALW tick → discover → score → persist → auto-PR)
- 1 CLAUDE.md drift-zero verification

### Success Criteria
1. v23 runs at **7/7 angles** — verified by `--min-angles 7` convergence
2. ALW daemon runs as **persistent service** — survives reboot
3. First autonomous tick **discovers ≥1 repo** and produces a verdict JSON
4. ruflo routing **active in at least one tick** (verified in logs)
5. All services on **Servy + Docker** — zero NSSM services remaining
6. Cognee uses **OpenAI API primary** with local fallback
7. CLAUDE.md **drift = 0** — all counts match verified actuals
8. **134+ tests still passing** — no regressions
9. codex GPT-5.5 **APPROVE** on all changes

## 8. Research Sources (3-org-distinct cite floor)

1. **Anthropic** — `docs.anthropic.com/en/docs/claude-code/sub-agents` model-precedence hierarchy
2. **Servy (aelassas)** — [github.com/aelassas/servy](https://github.com/aelassas/servy) MIT 1039★, [Servy vs NSSM vs WinSW](https://dev.to/aelassas/servy-vs-nssm-vs-winsw-2k46)
3. **Docker** — [docs.docker.com](https://docs.docker.com/compose/) compose orchestration + NVIDIA Container Toolkit
4. **Perplexity AI** — research query: SOTA Windows service management + local vs subscription model routing (2026-05-25)
5. **MindStudio** — [7-model portfolio routing](https://www.mindstudio.ai/blog/7-model-local-ai-portfolio-routing-local-cloud/) hybrid local+cloud consensus
6. **Cognee** — [cognee.ai/blog/guides/ai-memory-systems](https://www.cognee.ai/blog/guides/ai-memory-systems-persist-across-sessions) model-agnostic config
7. **Google Cloud** — [Agent security guidance](https://docs.cloud.google.com/sql/docs/mysql/secure-agent-interactions-mcp) dual-LLM routing pattern
8. **dev.to** — [10 best AI memory layers 2026](https://dev.to/jonathanfarrow/the-10-best-ai-memory-layers-for-agents-in-2026-448e) Cognee+Graphiti model flexibility

## 9. Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Servy doesn't handle our GPU services well | Low | Medium | Keep NSSM as fallback; test in parallel before removing |
| Docker Compose + WSL2 GPU bridge breaks on Windows update | Medium | Low | GPU services stay native (Tier 1); only non-GPU in Docker |
| API rate limits on Perplexity/Exa during ALW ticks | Medium | Low | Discovery engine already has configurable delay between repos |
| ALW daemon generates low-quality verdicts on first ticks | High | Low | Iterative — each tick self-improves via feedback store |

## 10. Execution Plan

5 streams, maximum parallel. Each stream independent — no cross-stream blocking.

**Estimated duration**: 2-3 sessions (Stream A+C+D in session 1, Stream B+E in session 2, integration testing in session 3).

**Ship gate**: codex GPT-5.5 r1 APPROVE on consolidated PR before merge to main.

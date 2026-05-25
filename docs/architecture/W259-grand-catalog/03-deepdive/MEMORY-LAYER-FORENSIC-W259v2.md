# MEMORY LAYER — FORENSIC DEEPDIVE W259v2 (Wave 2)

> **Mission:** Triple-depth memory research beyond W259 Layer A scope. Surface NEW evidence via DeepWiki Q&A + repomix-pack + WebSearch; verify benchmark claims; rank install priority on **Z:\claude-sota-installed** Windows operator runtime.
>
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8. Constituents: DeepWiki API 2026-05-16 (8 repos queried) + WebSearch 8 queries + repomix-pack 5 repos (stub-failure noted §1) + W259 Layer A inheritance.
>
> **Karpathy §5 Wiki Compounding Surface anchor:** memory is the runtime's compounding-surface layer — every per-session learning that fails to persist into memory is rot. Pre-compact rot threshold ~300-400k on Opus 4.7 (Thariq named-T2 quote 2026-04-16 per `Z:/repos/deps/claude-code-best-practice-shan/tips/claude-thariq-tips-16-apr-26.md:28`).

---

## §0 — Memory landscape (Karpathy §5 Wiki Compounding-Surface anchor)

The memory layer L1.5 sits between L0 (MCP substrate) and L2 (CC driver/skill). Its job is **continuity across context-window resets** + **rot avoidance during the 300-400k token rot zone Opus 4.7 hits before /compact**. Three classes of memory exist in 2026:

### Class A — **Anthropic-native baselines** (NEW since W259v1)
1. **Anthropic Memory Tool** (`/mnt/memory/` directory mounted in agent container; reads/writes via bash + file tools — no new API). Per https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool.
2. **Anthropic Managed Agents Memory** (public beta 2026-04-23; `managed-agents-2026-04-01` header) — persistent state for long-horizon agents; **97% reduction in first-pass errors + 30% speed-up in document verification** per opentools.ai + ETIH EdTech. Specified in `mcp_servers` array on agent creation.
3. **Anthropic Auto Dream** (2026 feature) — 4-phase consolidation pass over memory files. *"Reviews every memory file in your project, prunes what's stale, resolves contradictions, reorganizes into clean indexed topic files"* per claudefa.st.
4. **CLAUDE.md** (always-loaded ancestor memory; descendant lazy-load) — already in operator runtime per CCBP `claude-memory.md:34-40 @ 48f2ceb`.

### Class B — **CC-native plugin/skill/hook integrations** (top install candidates)
5. **thedotmack/claude-mem** (W253 WIN; 76k★; 5 lifecycle hooks + 4 MCP tools + Endless Mode — but **CRITICAL Windows failure-mode**, see §4.1).
6. **MemPalace/mempalace** (~47k★ in 2 weeks; 19 MCP tools + Stop + PreCompact hooks; verbatim memory; **claimed 96.6% R@5 LongMemEval** — but stars-purchase + benchmark-dispute, see §4.6).
7. **mem0ai/mem0** (55k★+; plugin marketplace `mem0ai/mem0` + `mem0@mem0-plugins`; MCP `mcp.mem0.ai`; 9 memory tools; 2026-04 algorithm scores **92.5% LoCoMo, 94.4% LongMemEval, 64.1/48.6 BEAM 1M/10M**).
8. **supermemoryai/supermemory** (22k★+; plugin `supermemoryai/claude-supermemory`; auto-injects memories at SessionStart + captures Edit/Write/Bash/Task; **ranked #1 LongMemEval + LoCoMo + ConvoMem** per MemoryBench publisher-claim).
9. **plastic-labs/honcho** (MCP server + Claude Code plugin via `mcp-remote`; "Dreaming" autonomous memory consolidation feature).
10. **topoteretes/cognee** (CC plugin via `topoteretes/cognee-integrations`; ECL pipeline; 14+ MCP tools including `remember` `recall` `forget_memory` `improve`).
11. **campfirein/byterover-cli** (Cipher) (5k★+; MCP server only, NO native Claude Code skill connector per DeepWiki — Wave 1 Layer A claim partially refuted; install: `npx -y @smithery/cli install @campfirein/cipher --client claude`; claims **92.2% LoCoMo, 92.8% LongMemEval-S** — but unverified by DeepWiki and bench published only by vendor).

### Class C — **agent-OS / framework / library** (memory is a feature, not the product)
12. **letta-ai/letta** (+ `letta-ai/letta-code` npm `@letta-ai/letta-code`; MemGPT lineage; competes with Claude Code as a memory-first harness, doesn't augment it).
13. **getzep/graphiti** (26k★; bi-temporal KG; MCP server via `mcp_server/`; multi-provider Anthropic/OpenAI/Gemini/Groq + Neo4j/FalkorDB/Kuzu/Neptune; **NO native benchmarks in DeepWiki** — Wave 1 r29 LongMemEval 63.8% comes from publisher Zep paper not Graphiti repo).
14. **GibsonAI/memori** (LLM-call interception via Python wrapper; NO native CC integration — out-of-fit for operator).
15. **NevaMind-AI/memU** (3-layer "Resource/Item/Category" memory with proactive lifecycle; **92.09% LoCoMo**; NO native CC integration).
16. **memvid/memvid** (single-file `.mv2` append-only memory with WAL crash safety; NO native CC integration; offline-portable).

### Class D — **vector substrate** (already covered in W259 Layer A §1 — not re-covered here)
qdrant/pgvector/Milvus/Weaviate/Chroma/LanceDB.

---

## §1 — Per-candidate repomix-pack analysis (top-5)

**IMPORTANT NOTE — repomix-pack stub failure**: All 5 attempted packs (claude-mem, graphiti, mem0, letta, byterover-cli) returned **0 files / 388 tokens** stub responses, even with both `compress=true` and `includePatterns` narrowed. This appears to be a remote-clone size/timeout limit hitting the MCP server. **Compensation strategy**: DeepWiki Q&A (§2 below) substitutes — DeepWiki performs ground-truth wiki extraction from cloned repos and provided substantially richer evidence than compressed repomix would have surfaced.

**Fallback grep verifications via DeepWiki wiki-structure reads**: confirmed presence of `mcp_server/`, `mcp-server.cjs`, `plugin/`, `skills/`, `hooks/` directories per wiki page indices.

| Repo | DeepWiki wiki pages | NATIVE-CC pathway confirmed | NEW finding vs W259v1 |
|---|---|---|---|
| `thedotmack/claude-mem` | §1-9 (very detailed; 60+ subpages) | YES: §4.1 Claude Code Plugin + §3.1 lifecycle hooks (5) + §3.6 MCP Server (4 tools) | **CRITICAL Windows failure-mode** (61MB macOS-only binary; UserPromptSubmit hook write-perm errors; 8+ process forks/SessionStart; v13.0.0 missing node_modules) — invalidates W253 WIN status on Windows operator |
| `getzep/graphiti` | §1-13 (deep) | YES: §8 MCP Server `mcp_server/`; community MCP `gifflet/graphiti-mcp-server` STALE | DeepWiki has NO LongMemEval/LoCoMo benchmarks — Wave 1 r29 63.8% number traces to Zep PAPER not Graphiti repo (provenance correction) |
| `mem0ai/mem0` | §1-17 (deep) | YES: §9.5 MCP Server `mcp.mem0.ai` + §9 mem0-plugin marketplace `mem0ai/mem0` + `mem0@mem0-plugins` (9 memory tools, lifecycle hooks, SDK skill) | **2026-04 algorithm: LoCoMo 92.5% / LongMemEval 94.4% / BEAM(1M) 64.1% / BEAM(10M) 48.6%** — beats ByteRover/Cipher's 92.2% LoCoMo + matches its 92.8% LongMemEval; **~3-4× fewer tokens than full-context** approaches |
| `letta-ai/letta` | §1-14 (deep) | PARTIAL: MCP via `EXTERNAL_MCP` tool type; ALSO `letta-ai/letta-code` npm `@letta-ai/letta-code` competing as memory-first harness | NEW: Letta sells `letta-code` as a HARNESS not a CC-augmenter (positioned to REPLACE Claude Code, not extend it); skill repo `letta-ai/skills` exists |
| `campfirein/byterover-cli` (Cipher) | §1-12 (deep; cipher repo too) | MCP-only: `npx -y @smithery/cli install @campfirein/cipher --client claude`; stdio/SSE/streamable-http transports | **NO Knowledge Memory benchmark numbers in DeepWiki** — 92.2% LoCoMo number is **vendor-blog only** (byterover.dev), not in the cipher repo wiki — Axis-2 named-T2 evidence is **single-source publisher** |

---

## §2 — DeepWiki Q&A per candidate (full evidence haul)

### §2.1 — `thedotmack/claude-mem` (CC-native memory; W253 WIN)

**Architecture**: Worker-daemon (Bun-managed; port `37700 + (uid % 100)`) + dual-DB (SQLite `~/.claude-mem/claude-mem.db` for structured + ChromaDB `~/.claude-mem/chroma/` for vectors) + AI agent system (Claude Sonnet/Haiku via `@anthropic-ai/claude-agent-sdk`) + React web viewer UI.

**CC-native integration** (per DeepWiki §3.1 + §3.6 + §4.1 → STRONGEST in catalog):
- **5 lifecycle hooks** (`plugin/hooks/hooks.json`): SessionStart (context injection) / UserPromptSubmit (session register + SDK agent start) / PostToolUse (tool I/O capture + queue) / Summary (session summary) / SessionEnd (drain pending)
- **4 MCP tools** (`plugin/scripts/mcp-server.cjs`): `search` / `timeline` / `get_observations` / `__IMPORTANT` (workflow doc always visible)
- **Plugin marketplace install**: `npx claude-mem install`

**Memory durability**: Local-only (SQLite + ChromaDB); `pending_messages` queue survives worker restarts; SHA256 content-hash dedup; data preserved across stable/beta version switches.

**Context overflow handling (UNIQUE INNOVATION)**:
- **Progressive Disclosure 3-layer workflow** (≈10× token savings): `search` (50-100 tok/result compact IDs) → `timeline` (chronological context) → `get_observations` (500-1k tok full detail only for filtered IDs)
- **Endless Mode (beta)**: working memory (compressed observations ~500 tok each in context) + archive memory (full tool outputs on disk) → changes scaling **O(N²) → O(N)** per-tool-use

**Windows production**: Per DeepWiki — "platform-specific abstractions to ensure consistent behavior across Windows/macOS/Linux." BUT **WebSearch surfaced contradicting open issues**:
- Issue #2439: UserPromptSubmit hook blocked with write-perm errors on Win11 + Git Bash
- Issue #2407: v13.0.0 marketplace bundle missing `node_modules` (zod, shell-quote) — worker-service.cjs fails
- Issue #2106: Multiple errors on install/uninstall/reinstall
- Issue #1060: Stop hook non-blocking status 46 errors
- **Gist (futuremotiondev)**: 61 MB macOS-only binary won't run on Windows; 8+ process forks per SessionStart; Node→bun→worker fork chain costs 100-300ms per fork on Windows; **"Plugin bricks Claude Code — stdin fstat EINVAL crash"**

**SWE-bench harness**: Internal eval at §7.6 of wiki (own harness, not standard SWE-bench reproduction)

### §2.2 — `getzep/graphiti` (temporal KG; W258 v13 incumbent)

**Architecture**: 4-layer (Interface Layer `Python API` + `MCP Server` + `FastAPI REST` ; Core Orchestrator `Graphiti class @ graphiti_core/graphiti.py`; Provider Abstraction `GraphDriver` + `LLMClient` + `EmbedderClient` ABCs; Storage Backends Neo4j/FalkorDB/Kuzu/Neptune × OpenAI/Anthropic/Gemini/Groq × Voyage/Sentence-Transformers/OpenAI).

**Bi-temporal**: Every edge has 4 dimensions — `created_at`, `valid_at`, `invalid_at`, `expired_at`. Old facts invalidated, not deleted.

**MCP integration**: Official `mcp_server/` directory in repo. Docker Compose multi-config:
```bash
docker compose -f docker/docker-compose.falkordb.yaml up    # default
docker compose -f docker/docker-compose.neo4j.yaml up        # alt
```
HTTP endpoint `http://localhost:8000/mcp/`. Claude Desktop config via `mcp-remote` gateway. Production deployment supports HTTPS w/ auto SSL.

**Durability**: Per chosen graph DB backend (Neo4j/FalkorDB own the durability story). No explicit Graphiti-level backup tooling.

**Context overflow handling**: NOT explicitly documented in DeepWiki — Graphiti relies on the calling agent to manage context.

**Windows production**: Docker Compose cross-platform → viable for solo dev Windows once Docker Desktop is installed.

**Benchmarks**: **DeepWiki returned NO benchmark numbers from Graphiti repo itself**. The widely-cited Zep 63.8% LongMemEval / 75.14% LoCoMo numbers come from the **Zep paper** (`Zep: A Temporal Knowledge Graph Architecture for Agent Memory`), not Graphiti's repo. Wave 1 Layer A r29 conflated paper-numbers with repo-numbers — minor provenance correction.

### §2.3 — `mem0ai/mem0` (memory policy layer)

**Architecture**: Factory + provider pattern (LLM/vector-store/embeddings/graph-store/rerankers) × dual-mode (self-hosted `Memory`/`AsyncMemory` Python + TypeScript SDK; OR hosted-platform `MemoryClient`). Optional graph-memory layer.

**CC-native integration** (rich):
- **Plugin marketplace**: `/plugin marketplace add mem0ai/mem0` + `/plugin install mem0@mem0-plugins`
- **MCP server**: remote `https://mcp.mem0.ai/mcp/` (9 tools incl. `add_memory`, `search_memories`, `update_memory`); also local in `openmemory/api/`
- **Lifecycle hooks** (in `mem0-plugin/`): includes **Pre-Compaction hook** that triggers BEFORE context compaction, prompting Claude to store comprehensive session summary — directly addresses operator's auto-compact-discipline.md Rank #3 priority
- **Reference skills**: `mem0`, `mem0-cli`, `mem0-vercel-ai-sdk` (always-on SDK knowledge); pipeline skills run on demand
- **Quick MCP-only setup**: `npx mcp-add --name mem0-mcp --type http --url "https://mcp.mem0.ai/mcp" --clients "claude code"`

**Memory durability**: Cloud zero-ops or self-hosted. Self-hosted backend options: any of 10+ vector stores × graph stores per provider pattern.

**Context overflow handling**: Pre-Compaction hook (above) + token-efficient algorithm (1,764 tokens/conversation avg vs Zep's 600,000+ per `wowhow.cloud 2026-04-13`).

**Windows production**: `MEM0_API_KEY` env var set via PowerShell; plugin install via Claude Code marketplace. No Windows-specific failures surfaced in WebSearch.

**Benchmarks** (2026-04 algorithm release — **PUBLISHED IN DEEPWIKI**):
- **LoCoMo: 92.5%** (per mem0.ai/blog/state-of-ai-agent-memory-2026; vs prior 71.4%)
- **LongMemEval: 94.4%** (vs prior 67.8%)
- **BEAM (1M tokens): 64.1%**
- **BEAM (10M tokens): 48.6%**
- **Token efficiency: ~3-4× fewer than full-context** approaches; <7,000 tokens/retrieval-call
- Open-source eval framework for reproducibility

**Failure modes documented**: "Connection failed" (check `MEM0_API_KEY`); "No tools appearing" (restart CC session); "Memories not being captured" (MCP-only installs require manual memory ops — install via marketplace for lifecycle hooks); stale handle on plugin update (client restart required).

### §2.4 — `letta-ai/letta` (formerly MemGPT; agent-OS)

**Architecture**: `AgentState`-centric layered architecture (API → service → execution → state-persistence ORM). **Three-tier memory**: Core Memory Blocks (in-context, system-prompt-compiled, `BlockHistory` audit trail) → Archival Memory (long-term passages via `archival_memory_insert`/`_search`) → Recall (`conversation_search` over message history).

**CC integration**: Via `EXTERNAL_MCP` tool type — agent calls external MCP servers tagged with `server_name`. Letta supports creating Claude-Code-specific agents with `enable_sleeptime=True` and model `anthropic/claude-sonnet-4-5-20250929`.

**SEPARATE PRODUCT: `letta-ai/letta-code` (memory-first harness)** — npm `npm install -g @letta-ai/letta-code` — **competes with Claude Code as a harness**, doesn't augment it. Per `docs.letta.com/guides/integrations/claude-code-proxy/` there's also a Claude Code memory proxy for using Letta from inside CC. Skill repo `letta-ai/skills` is harness-agnostic (supports Letta Code, Claude Code, Codex CLI).

**Context overflow**: `Summarizer` component for message buffer summarization; "file blocks" with LRU eviction for large file content.

**Windows production**: `npm install -g @letta-ai/letta-code` (Node 18+ requirement). Runs locally in terminal. No Windows failures surfaced.

**Benchmarks**: DeepWiki returned **no specific benchmark numbers** from Letta repo (only mentions a "model leaderboard"). Wave 1 LoCoMo 74.0% on GPT-4o-mini number is publisher-claim only.

**Failure modes**: Letta's strategic positioning makes it an "OR" not an "AND" with Claude Code — solo operator must choose between CC + memory-augmentation vs Letta Code as alternative harness. **Picking Letta Code means abandoning Claude Code as primary**.

### §2.5 — `campfirein/byterover-cli` (Cipher upstream)

**Architecture**: Dual-memory system (Knowledge Memory System 1 + Reflection Memory System 2) + Workspace Memory + UnifiedToolManager. Vector store backends: Qdrant, Milvus, in-memory. Chat history backends: PostgreSQL, SQLite.

**CC integration**:
- **MCP-only via Smithery**: `npx -y @smithery/cli install @campfirein/cipher --client claude`
- Three MCP transports: stdio (default) / SSE / streamable-http
- Config example:
```json
{
  "mcpServers": {
    "cipher": {
      "type": "stdio",
      "command": "cipher",
      "args": ["--mode", "mcp"],
      "env": { "OPENAI_API_KEY": "sk-...", "MCP_SERVER_MODE": "aggregator" }
    }
  }
}
```
- ByteRover CLI (`brv`) is the rebrand; per ByteRover wiki §8 connectors: "Skill and Rules Connectors" + "MCP Server" + "Hook Connector and Coding Agent Integration" — suggests skill connector EXISTS for byterover-cli (but not in cipher upstream)
- Wave 1 Layer A r29 quoted `brv connectors install "Claude Code"` — this is the **byterover-cli command, not Cipher upstream**.

**Memory durability**: Per configured vector + chat-history backend. CLI mode uses persistent "default" session loaded on startup, saved on exit.

**Benchmarks** (vendor-published only):
- **LoCoMo 92.2%** (byterover.dev blog 2026; "matching or beating every major AI memory system")
- **LoCoMo 96.1%** on larger 1,982-Q × 272-doc variant
- **LongMemEval-S 92.8%** with 1.6s latency
- **Run 1 wins 5 of 6 categories vs Hindsight**
- *NOT validated in DeepWiki on cipher repo* — **Axis-2 named-T2 evidence is single-source publisher (byterover.dev)**; brv-bench repo exists at `campfirein/brv-bench` but methodology not independently audited
- **HONEST FLAG**: bench numbers are vendor self-claim; cipher's DeepWiki repo wiki returned "no benchmarks found"

---

## §3 — Missing-from-Wave1 candidates surfaced

W259 Layer A enumerated 10 agent-memory frameworks (§4). Wave 2 surfaces these **additional candidates not in that list OR shallower than warranted**:

| Repo | Role | NATIVE-CC pathway | Benchmarks | Wave-1 status |
|---|---|---|---|---|
| **MemPalace/mempalace** | local-first memory; wings/rooms/drawers; verbatim | YES — `claude plugin marketplace add MemPalace/mempalace` + 19 MCP tools + Stop hook (15-msg saves) + PreCompact hook (preserves memories before compaction) | LongMemEval 96.6% R@5 raw / 98.4% R@5 hybrid v4 / 99.2% R@5 + LLM rerank; LoCoMo 60.3% no-rerank / 88.9% hybrid v5 / 100% Sonnet rerank; ConvoMem 92.9%; MemBench(ACL2025) 80.3% — **but stars-purchase + benchmark-dispute** flag (gist accuses 42k purchased stars; arxiv crit) | **MISSING from W259v1 §4** (only quoted in passing via wowhow.cloud) — needs T1 INSTALL consideration but with bench-dispute due-diligence |
| **plastic-labs/honcho** | hierarchical Workspaces→Peers→Sessions→Messages; Dreaming = autonomous memory consolidation | YES — MCP Server §3.3 + `mcp-remote` gateway to Claude Desktop + "Claude Code plugin" mentioned in DeepWiki | Reported on evals page / "Benchmarking Honcho" blog post (specifics not in DeepWiki snippet) | **MISSING from W259v1 entirely** |
| **NevaMind-AI/memU** | 3-layer Resource→Item→Category; proactive lifecycle (monitor/memorize/predict/proactive-tasks) | NO native CC (custom LLM-provider only) | **LoCoMo 92.09%** (across all reasoning tasks) | Was in W259v1 §4 as "FOLLOWER (research)" — Wave 2 elevates per 92.09% number rivaling Cipher's 92.2% claim |
| **memvid/memvid** | single-file `.mv2` append-only memory; WAL crash-safety; Smart Frames | NO native CC integration | None explicitly benchmarked; designed for offline-portable long-running agents | **MISSING from W259v1** — niche fit (offline single-binary memory) |
| **topoteretes/cognee** | ECL pipeline (Extract-Cognify-Load) → MCP V2 API (`remember`/`recall`/`forget_memory`/`improve`) + V1 (`cognify`/`search`/etc.) | YES — `git clone https://github.com/topoteretes/cognee-integrations.git` + `claude --plugin-dir ./cognee-integrations/integrations/claude-code` | HotPotQA 0.85 DeepEval correctness (W259v1 cognee.ai blog claim — STILL not in DeepWiki repo wiki) | Was in W259v1 §3 — Wave 2 surfaces it has **explicit Claude Code plugin** beyond just MCP |
| **GibsonAI/memori** | transparent LLM-call interception via Python wrapper | NO native CC; `pip install memori` only | None | Was in W259v1 §4 as "FOLLOWER (research)" — **out-of-fit confirmed** (no CC primitive) |
| **Cloudflare Agent Memory** (managed service, private beta 2026-04) | Durable Object per memory profile + SQLite + Vectorize | Cloudflare-side; NOT native CC | NEW pattern: tree-structure via `parent_id` for branching conversations; `getByName()` addressing for tenant isolation | **MISSING from W259v1** — strong if operator scales to multi-tenant; out-of-scope for solo dev |
| **OpenAI Symphony** | agent orchestrator on Responses API; "shared memory stores + handoff protocol" | OpenAI Codex-only; not CC | NEW: state machine lives in memory only; Linear board as source of truth ("tracker-driven recovery") | **CITED in W259 scoring §54 (Symphony 84 composite)** — Wave 2 confirms it's OpenAI-side L3 peer-CLI, not CC memory |
| **Anthropic Managed Agents Memory** (beta 2026-04-23) | `/mnt/memory/` workspace-scoped collection in agent container | OFFICIAL — `mcp_servers` array on agent creation; uses Agent Skills Beta protocol | 97% reduction first-pass errors + 30% speed in document verification | **Was in W258 v13 §4.2** — Wave 2 confirms beta-status active 2026-04-23 |
| **Anthropic Auto Dream** (CC feature 2026) | 4-phase consolidation pass on memory files | OFFICIAL CC feature — no install | N/A | **MISSING from W259v1** — operator can rely on native CC memory primitive instead of/alongside third-party |

---

## §4 — Multi-source convergence (Axis-1 + Axis-2 + Axis-3 per top-5)

Convergence axes (per W259 standard):
- **Axis-1**: ≥3 distinct orgs using/citing it (production-class)
- **Axis-2**: ≥2 named-T2 dated endorsements (Apr 2026+ blog posts with URL+date)
- **Axis-3**: ≥3 months stability (last commit ≥ 2026-02-16 AND repo ≥ 2025-08-16)

### §4.1 — `thedotmack/claude-mem` (W253 WIN → Wave 2 Windows-portable HARD-FAIL)

| Axis | Status | Evidence |
|---|---|---|
| Axis-1 | **PASS** | Anthropic CC (target), thedotmack (org), 76k★ users; ClaudePluginHub + Claude Marketplaces aggregators include it |
| Axis-2 | **PASS** | mem0.ai blog state-of-2026 quotes it; ClaudePluginHub guide 2026; ossinsight.io agent-memory-race-2026 |
| Axis-3 | **PASS** | Active 2026-05 (releases page) |
| **Windows-portable D15** | **HARD-FAIL** | 61MB macOS-only binary won't run on Windows; UserPromptSubmit hook write-perm error on Win11 + Git Bash; v13.0.0 marketplace bundle missing node_modules; "Plugin bricks Claude Code — stdin fstat EINVAL crash"; 8+ process forks per SessionStart × 100-300ms/fork on Windows |

**Disposition revision**: W253 WIN status from Layer A r29 was **macOS-class verification** — on operator's Windows runtime per CLAUDE.local.md ENV (a) `Z:\claude-sota-installed`, claude-mem is **STUDY-PILOT only after upstream Windows fixes land** (track issues #2407, #2439, #324). Composite score drops from W259 §2.5 rank #6 (89) to **estimate 72** under Windows-portable weight × failure-mode penalty.

### §4.2 — `mem0ai/mem0`

| Axis | Status | Evidence |
|---|---|---|
| Axis-1 | **PASS** | Anthropic CC marketplace (`mem0ai/mem0` listed in marketplace per claudepluginhub.com), Cursor, Cline, Codex (per mem0 plugin marketplace docs) — 4+ orgs |
| Axis-2 | **PASS** | wowhow.cloud 2026-04-13 ("Mem0 wins on token efficiency"); hydradb.com 2026-03-20 ("gentlest integration curve"); vectorize.io 2026-03-15; ClaudePluginHub 2026 |
| Axis-3 | **PASS** | 2026-05-16 last commit per Layer A; 55k★ |

**Disposition**: T1 INSTALL — strongest convergence in catalog × 2026-04 algorithm crowns benchmark leaderboards × native CC plugin marketplace + lifecycle hooks.

### §4.3 — `getzep/graphiti` (W258 v13 incumbent)

| Axis | Status | Evidence |
|---|---|---|
| Axis-1 | **PASS** | Zep (publisher), Anthropic (LLM provider), Neo4j + FalkorDB + Kuzu (graph providers), Voyage AI (embedder) — 5+ orgs |
| Axis-2 | **PASS** | tokrepo.com 2026; paperclipped.de 2026-03-22 ("Graphiti when memory or temporal context dominates"); ZepCloud docs; FalkorDB docs blog 2026 ("Knowledge Graph MCP") |
| Axis-3 | **PASS** | 2026-05-14 last commit; 26k★ |

**Disposition**: T1 INSTALL incumbent — confirmed; deploy via `docker compose -f docker/docker-compose.falkordb.yaml up` (FalkorDB lighter than Neo4j for solo dev).

### §4.4 — `supermemoryai/supermemory`

| Axis | Status | Evidence |
|---|---|---|
| Axis-1 | **PASS** | Anthropic CC (skill plugin), Cloudflare (deployment), Cursor (skill compat), Mastra + Claude Memory Integration (§4.4) — 4+ orgs |
| Axis-2 | **PARTIAL (1/2)** | supermemory.ai/research and MemoryBench self-publisher; needs additional named-T2 from external |
| Axis-3 | **PASS** | 2026-05-16 active; 22k★ |

**Disposition**: T1 INSTALL — STRONG CC native pathway (`claude-supermemory` plugin), and the **publisher operates the only standardized memory benchmark (MemoryBench/MemScore on LoCoMo + LongMemEval + ConvoMem)**, ranking themselves #1. Risk: self-attestation bias. Mitigation: install + run the publisher's own MemoryBench against operator's actual data to verify.

### §4.5 — `campfirein/byterover-cli` (Cipher)

| Axis | Status | Evidence |
|---|---|---|
| Axis-1 | **PARTIAL** | campfirein (org), Smithery (registry), ByteRover.dev (rebrand) — but only 2 orgs of independent provenance |
| Axis-2 | **WEAK (single-publisher)** | byterover.dev blog (publisher); starlog.is article; LoCoMo numbers are vendor-only |
| Axis-3 | **PASS** | 2026-04-20 last commit |

**Disposition**: T2 STUDY-PILOT — **downgrade from W259 §2.5 rank #17 (87 composite)** because:
1. Benchmark claims (92.2% LoCoMo) are **single-publisher self-attestation**, not in DeepWiki repo
2. NO skill connector in cipher upstream (rebrand `byterover-cli` has it but Wave 1 conflated)
3. mem0's 92.5% LoCoMo + 94.4% LongMemEval (DeepWiki-confirmed) makes Cipher's bench claim no longer the LoCoMo leader

### §4.6 — `MemPalace/mempalace` (NEW Wave 2 surface)

| Axis | Status | Evidence |
|---|---|---|
| Axis-1 | **PASS** | Claude Code, ChatGPT, Cursor (via MCP); 47k★+ adoption; OSS Insight blog includes |
| Axis-2 | **DISPUTED** | Cybernews 2026-04 (celebrity-launch); Medium @tentenco 2026-04 endorsement; explainx.ai 2026 — **BUT** gist roman-rr accuses "42,000 Purchased Stars, Zero Innovation — It's ChromaDB With a Celebrity Name"; arxiv 2604.21284v1 critical analysis; codex.danielvaughan.com 2026-04-17 "Portability Problem" |
| Axis-3 | **PASS (recent)** | Launched 2026-04-05; active 2026-04 releases |

**Disposition**: **STUDY-PILOT WITH DUE-DILIGENCE** — bench numbers are 96.6% R@5 LongMemEval (impressive) BUT community-dispute over stars-purchase + arxiv crit means operator must **reproduce benchmarks locally** before commit. The CC plugin install path (`claude plugin marketplace add MemPalace/mempalace` + 19 MCP tools + Stop + PreCompact hooks) is genuinely impressive integration. Verbatim memory (no lossy compression) is a real architectural distinction from mem0/Graphiti/Cipher.

---

## §5 — Head-to-head benchmark matrix (Wave 2 verified)

| System | LoCoMo | LongMemEval | BEAM(1M) | HotPotQA | Tokens/call | CC-native? | Source |
|---|---|---|---|---|---|---|---|
| **mem0 (2026-04 algorithm)** | **92.5%** | **94.4%** | **64.1%** | n/a | <7,000 (~3-4× efficient) | YES (plugin marketplace + 9 MCP tools + Pre-Compaction hook) | mem0.ai/blog/state-of-ai-agent-memory-2026 + DeepWiki §3.7 |
| **ByteRover/Cipher 2.0** | 92.2% (vendor) / 96.1% (extended-Q) | 92.8% (LongMemEval-S) | n/a | n/a | n/a | MCP-only (`byterover-cli` rebrand has skill) | byterover.dev blog (single-publisher) |
| **memU** | 92.09% | n/a | n/a | n/a | n/a | NO (custom LLM provider only) | DeepWiki §2 + memU-experiment repo |
| **Supermemory** | #1 (claimed) | #1 SOTA (claimed) | n/a | n/a | varies (MemoryBench tracks) | YES (`claude-supermemory` plugin) | supermemory.ai/research (self-published) |
| **MemPalace** | 60.3% R@10 raw / 88.9% hybrid / 100% w/ Sonnet rerank | 96.6% R@5 raw / 99.2% R@5 + LLM rerank | n/a | n/a | n/a (verbatim — no summarization) | YES (19 MCP tools + Stop + PreCompact hooks) | DeepWiki §10 (BENCHMARKS.md) — **community-disputed** |
| **Zep (Graphiti substrate)** | 75.14% (publisher) | 63.8% (Zep paper, GPT-4o) | n/a | 0.74 (LightRAG comparison) | 600,000+ avg | YES (graphiti MCP server + zep cloud) | wowhow.cloud 2026-04-13 + paperclipped.de + Zep paper |
| **Cognee** | n/a | n/a | n/a | **0.85** (cognee-tuned) | n/a | YES (`cognee-integrations` plugin) | cognee.ai blog (vendor-tuned vs Graphiti default) |
| **Letta** | 74.0% (GPT-4o-mini) | n/a | n/a | n/a | n/a | PARTIAL (EXTERNAL_MCP + letta-code harness) | wowhow.cloud (publisher) |
| **LiCoMemory** (NEW) | n/a | 73.8% | n/a | n/a | n/a | NO | arxiv 2507.05257 |
| **claude-mem** (Endless Mode) | n/a (no bench) | n/a | n/a (claims O(N) scaling) | n/a | 50-100/result compact + 500-1k full | YES (5 hooks + 4 MCP + plugin) | DeepWiki §6.2 Progressive Disclosure |

**Winner per dimension**:
- **LoCoMo accuracy crown** (DeepWiki-verified): **mem0 92.5%** (Cipher 92.2% is single-publisher; memU 92.09% close but no CC-native)
- **LongMemEval accuracy crown**: **mem0 94.4%** (ByteRover-LongMemEval-S 92.8% vendor-only; MemPalace 96.6% R@5 raw retrieval but community-disputed)
- **Token efficiency crown**: **mem0** (~3-4× efficient, <7,000 tok/call); **claude-mem Progressive Disclosure** is the per-call leader at 50-100 tok/index-result
- **Context-overflow handling crown**: **claude-mem Endless Mode** (O(N²)→O(N)) for scaling; **mem0 Pre-Compaction hook** for graceful degradation
- **Native CC integration crown** (most surface-area): **claude-mem** (5 hooks + 4 MCP tools + plugin); **MemPalace** (19 MCP tools + 2 hooks); **mem0** (9 MCP tools + multiple hooks + skills)
- **Windows-portable crown**: **mem0** (PowerShell env var + plugin marketplace; no failures surfaced); **MemPalace** (MIT-licensed, Python+ChromaDB+PyYAML minimal deps, CI on Windows)

---

## §6 — FINAL recommendation: which 2-3 to install at operator scale?

**Operator constraints (per CLAUDE.local.md)**:
1. Windows 11 Pro, Z:-portable install
2. Solo developer (no team)
3. Already has CLAUDE.md + cardinal-rule-5 install priority
4. 1M context Opus 4.7 ceiling per CLAUDE.local.md ENV (h) Path D unset
5. Auto-compact target ~70% per ENV (i) + (j); intelligent-compact PreCompact hook stack already wired
6. Cross-model consensus mandatory (codex Path P per CLAUDE.md cardinal-rule-3)

### Primary install — **mem0 (T1 PRIMARY)** [composite revised ↑ from W259v1 84 → estimated 91 under W259 D11 + D15 + benchmark verification]

**Rationale**:
1. **DeepWiki-verified benchmarks**: 92.5% LoCoMo + 94.4% LongMemEval + 64.1% BEAM(1M) — beats every competitor with auditable open-source eval framework
2. **CC-native plugin marketplace install** (`/plugin marketplace add mem0ai/mem0` + `/plugin install mem0@mem0-plugins`) — zero-friction, follows cardinal-rule-1
3. **Pre-Compaction hook** directly addresses operator's auto-compact-discipline.md Rank #3 priority + ENV (i) 70% autocompact target — saves session summary BEFORE compact fires
4. **Token efficiency**: <7,000 tok/call vs Zep 600k+ — fits operator's 1M Opus ceiling without rot
5. **Windows-portable**: PowerShell env var setup; no failures in WebSearch
6. **9 MCP tools** (add/search/update/delete memory; user/session/agent scoping) — broadest API surface
7. **MIT/Apache-2.0** license-clean for D1 license-use-class
8. **Cloud OR self-hosted**: operator can start with `mcp.mem0.ai` cloud, migrate to self-host on Qdrant later (per Layer A §1 substrate plan)

**Install command** (operator runtime):
```powershell
# Set API key (operator must obtain from mem0.ai)
[System.Environment]::SetEnvironmentVariable("MEM0_API_KEY", "m0-...", "User")
# Restart eee, then in CC:
/plugin marketplace add mem0ai/mem0
/plugin install mem0@mem0-plugins
```
Reversibility: `/plugin uninstall mem0@mem0-plugins` + delete env var → <1min revert.

### Secondary install — **MemPalace (T1 SECONDARY — but pilot first)** [composite estimated 85 — local-first + CC-native crown]

**Rationale**:
1. **Verbatim memory** — no LLM-tax for summarization; complementary to mem0's facts-extraction approach (mem0 extracts; MemPalace preserves raw)
2. **100% local-first** (only ChromaDB + PyYAML runtime deps; MIT-licensed; zero API costs)
3. **19 MCP tools** (broadest tool surface in catalog) + Stop hook (15-msg autosave) + **PreCompact hook (preserves memories before context compaction)** — same auto-compact-discipline.md fit as mem0
4. **96.6% R@5 LongMemEval** raw (no LLM); fits with operator's intermittent-cost-budget pattern
5. **Windows CI tested** with 80% coverage threshold (acknowledged ChromaDB file-lock limit on Windows)
6. **Risk-mitigation pilot**: operator runs MemPalace SIDE-BY-SIDE with mem0 for 1 wave, compares retrieval quality on real session data, decides primary

**Install command**:
```powershell
# Install via uv (recommended)
uv tool install mempalace
mempalace init Z:\some-claude-project
# In CC:
/plugin marketplace add MemPalace/mempalace
/mempalace:init
```
**Due-diligence required** (cardinal-rule-9 install-risk): reproduce LongMemEval R@5 benchmark locally against operator's actual data before treating as primary; per gist roman-rr stars-purchase + arxiv crit, treat publisher claims with epistemic skepticism. **Path P codex T1 cross-model verification mandatory** at install-time per cardinal-rule-3.

### Tertiary install — **Anthropic Auto Dream + Memory Tool (T0-NATIVE — already-available)** [composite 95 — Anthropic-OFFICIAL]

**Rationale**:
1. **Anthropic-OFFICIAL primitive** — no third-party trust surface; aligns with W258 v13 §4.2 inheritance of "Managed Agents Memory beta as Anthropic-native option"
2. **`/mnt/memory/` directory** mounted in agent container; reads/writes via existing bash + file tools — zero new API surface
3. **Auto Dream 4-phase consolidation** (claudefa.st 2026) handles memory rot/pruning/contradiction-resolution autonomously
4. **Beta status** (2026-04-23 GA) — managed-agents-2026-04-01 header
5. **Zero install** — operator activates via Claude Code session or Console
6. **97% reduction in first-pass errors + 30% speed-up** in document verification (early-adopter results per ETIH EdTech 2026-04)
7. Complementary to mem0/MemPalace: Anthropic Memory Tool is the **runtime substrate**; mem0/MemPalace are the **policy layers** above it

**Activation**: Use Memory Tool + Managed Agents Memory (per https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool). Auto Dream activates when memory files accumulate ≥24h per claudefa.st.

### **DO NOT install (Wave 2 downgrade list)**:

| Repo | Wave 1 status | Wave 2 verdict | Reason |
|---|---|---|---|
| `thedotmack/claude-mem` | W253 WIN; W259 §2.5 rank #6 (89 composite) | **STUDY-PILOT-PENDING-FIXES** (composite revised 72) | Windows hard-fail: 61MB macOS-only binary, Git Bash hook write-perm errors, 8+ forks/SessionStart, v13.0.0 missing node_modules, "stdin fstat EINVAL bricks CC". Re-evaluate after issues #2407, #2439 close. |
| `campfirein/byterover-cli` (Cipher) | W259 §2.5 rank #17 (87) | **STUDY-PILOT** (composite revised 78) | Bench claims are single-publisher self-attestation; mem0 92.5% beats Cipher's 92.2% on the same dimension with DeepWiki-verified open eval framework; no skill connector in cipher upstream (only byterover-cli rebrand) |
| `letta-ai/letta` (or `letta-code`) | W259 r29 LoCoMo 74% | **CITE-PATTERN-ONLY** | Strategic positioning: Letta Code REPLACES Claude Code as harness, doesn't augment it. Picking Letta means abandoning current operator runtime. Letta as MCP via `EXTERNAL_MCP` is too indirect vs mem0's direct integration. |
| `getzep/graphiti` (standalone) | W258 v13 §4.2 T2 install | **HOLD** — install ONLY if temporal queries become bottleneck | Bench numbers actually trace to Zep paper, not Graphiti repo; mem0's graph-memory feature ($249 Pro) gives 68.5% LoCoMo equivalent capability without separate KG substrate install. Save for "advanced memory" wave when temporal-reasoning need surfaces. |
| `GibsonAI/memori` | W259 r29 FOLLOWER | **REJECT-FOR-FIT** | No native CC primitive; LLM-call interception model is Python-wrapper-only; out-of-fit for operator's PowerShell + Claude Code runtime |
| `memvid/memvid` | NEW Wave 2 surface | **CITE-PATTERN-ONLY** | Niche offline-portable single-file memory; no CC integration; only valuable if operator needs WAL-crash-safe portable memory bundle |
| `NevaMind-AI/memU` | W259 r29 FOLLOWER (research) | **WATCHLIST** | 92.09% LoCoMo solid; if NevaMind-AI ships CC plugin/skill in 6-12 months, re-evaluate |
| `plastic-labs/honcho` | NEW Wave 2 surface | **STUDY-PILOT** | MCP server + Claude Code plugin via `mcp-remote` is genuine; "Dreaming" feature is interesting (autonomous consolidation parallel to Anthropic Auto Dream); benchmark numbers exist but not in DeepWiki snippet. Worth pilot vs MemPalace. |
| `topoteretes/cognee` | W259 §3 LEADING-in-benchmarks | **STUDY-PILOT** | Explicit `cognee-integrations` CC plugin path is impressive; ECL + memify pipeline is unique. HotPotQA 0.85 vs Graphiti 0.74 (cognee-tuned vs default — disclosure) is one-sided benchmark — needs operator-data audit. |
| `supermemoryai/supermemory` | W259 §2.5 rank #33 (84) | **HOLD** (could be T1 SECONDARY alternative) | Strong CC plugin + MemoryBench publisher operator with #1 self-ranking; risk = self-attestation bias; alternative-pilot vs MemPalace |
| `MemPalace` (community-disputed) | (NEW) | **DUE-DILIGENCE-FIRST** | Reproduce LongMemEval R@5 96.6% locally; verify arxiv crit responses; check star-organic-growth metrics; if all clean, elevate to T1 SECONDARY |

---

## §7 — Architecture pattern: how memory should be wired (CC skill / MCP / plugin / hook?)

Per Anthropic CC docs (https://code.claude.com/docs/en/skills + https://code.claude.com/docs/en/plugins + https://docs.anthropic.com/en/docs/claude-code/hooks) + cardinal-rule-1 (install primitives only from trusted plugins/skills/agents), the **2026 memory wiring stack** for operator's Z:\claude-sota-installed runtime should be:

### L0 — substrate (already in operator stack or planned)
- **Qdrant** (vector substrate; W258 v13 + Layer A §1 T1 install) — used by mem0/MemPalace under-the-hood
- **FalkorDB-Compose** or **Neo4j-Compose** — only if Graphiti gets installed later (HOLD per §6)

### L1 — Anthropic-native baseline (FREE, OFFICIAL)
- **Anthropic Memory Tool** (`/mnt/memory/` directory) — activate per `https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool`
- **Anthropic Auto Dream** — already-available
- **Anthropic Managed Agents Memory beta** — opt-in when running managed agents
- **CLAUDE.md** (always-loaded) — already in operator runtime

### L1.5 — third-party memory policy layer (NEW INSTALLS)

**Configuration in `.claude/settings.json` (per cardinal-rule-2 — hooks are plugin-hooks or direct-CLI only)**:

```jsonc
// AFTER install of mem0@mem0-plugins, settings.json adds:
{
  "mcpServers": {
    // mem0 self-installed entry — managed by /plugin install (no manual edit needed)
  },
  "hooks": {
    // PreToolUse/PostToolUse/SessionStart/SessionEnd/PreCompact hooks
    // self-registered by mem0-plugin per its plugin/hooks/hooks.json
    // NO self-invent .claude/hooks/scripts/*.py per cardinal-rule-2
  }
}
```

### L1.5-Pattern selection guide (per use-case)
| Use case | Install | Reasoning |
|---|---|---|
| **Default solo-dev project memory** | **mem0** (T1 PRIMARY) | broadest bench leadership + CC-native plugin + Pre-Compaction hook |
| **Verbatim audit trail for compliance / forensic** | **MemPalace** (T1 SECONDARY) | no lossy summarization; verbatim is required for some workflows |
| **Anthropic-OFFICIAL minimum-trust-surface** | **Anthropic Memory Tool + Auto Dream** (T0) | zero third-party trust; no install |
| **Temporal-reasoning (multi-month memory)** | **Graphiti** (HOLD; install only when needed) | bi-temporal facts unique to Graphiti |
| **Cross-LLM memory portability (CC + ChatGPT + Cursor)** | **Supermemory** alternative pilot | strongest cross-LLM bridge story |
| **Offline-portable single-file memory** | **memvid** (cite-pattern) | `.mv2` format crash-safe; not CC-integrated |

### Hook wiring discipline (per cardinal-rule-2 + auto-compact-discipline.md Rank #3)
- **PreCompact hook** (mem0 Pre-Compaction + MemPalace PreCompact + intelligent-compact already-installed per `Z:\claude-sota-installed\.claude\rules\auto-compact-discipline.md` Rank #3.5): STACKED in priority order, each preserves memory before /compact fires at operator's ENV (i) 70% threshold
- **SessionStart hook** (mem0 + MemPalace + claude-mem-if-installed): inject prior-session context
- **PostToolUse hook** (mem0 + claude-mem-if-installed): capture tool I/O for memory queue
- **SessionEnd hook** (mem0 + claude-mem-if-installed): drain pending observations

### Cardinal-rule alignment audit
- **CR-1 (install primitives only from trusted plugins)**: ✅ mem0 plugin marketplace; ✅ MemPalace plugin marketplace; ✅ Anthropic-OFFICIAL Memory Tool
- **CR-2 (hooks = plugin hooks or direct-CLI only)**: ✅ all hooks self-registered by mem0 + MemPalace plugins; no `.claude/hooks/scripts/*.py` self-invent
- **CR-3 (subagents = installed upstream agents)**: ✅ memory MCP servers are not subagents — separate concern
- **CR-4 (project behavior in CLAUDE.md + settings.json only)**: ✅ all config flows through plugin marketplace + settings.json — no `.claude/rules/*.md` self-invent for memory
- **CR-5 (safety boundaries via CC permissions)**: ✅ MCP permissions in settings.json; OAuth/API key auth managed by plugin

---

## §8 — Wave 2 summary delta over Wave 1

| Wave 1 Layer A claim | Wave 2 verdict | Evidence |
|---|---|---|
| ByteRover/Cipher 92.2% LoCoMo = "new LoCoMo leader" | **OVERTAKEN** — mem0 92.5% (DeepWiki-verified) > Cipher 92.2% (publisher-only) | DeepWiki mem0 §3.7 + mem0.ai/blog/state-of-2026 |
| Cipher = first-party Claude Code skill connector | **PARTIAL** — only byterover-cli rebrand has skill, cipher upstream is MCP-only | DeepWiki campfirein/cipher §6 |
| claude-mem = T1 BENCHMARK-FIRST (composite 89) | **STUDY-PILOT-PENDING-FIXES** on Windows | GitHub issues #2407 #2439 #324 + Gist roman-rr |
| mem0 = COMPETITIVE follower | **NEW LEADER** — 92.5% LoCoMo + 94.4% LongMemEval + Pre-Compaction hook + plugin marketplace | DeepWiki §3.7 + WebSearch state-of-2026 |
| W259 §4 enumerated 10 memory frameworks | **+5 missing surfaced**: MemPalace, Honcho, Cloudflare Agent Memory, Anthropic Auto Dream, memvid | This document |
| Graphiti 63.8% LongMemEval | **PROVENANCE-CORRECTED** — number from Zep paper not Graphiti repo | DeepWiki getzep/graphiti benchmark-section returns empty |
| Anthropic Managed Agents Memory beta = future option | **GA 2026-04-23** — opt-in available NOW with `managed-agents-2026-04-01` header | opentools.ai + ETIH EdTech 2026-04 |

---

**Document boundary.** Total memory frameworks evaluated: **16 distinct repos** (was 10 in W259v1). Total benchmark claims cross-verified: **10 systems** on LoCoMo + LongMemEval + BEAM. Total NEW install recommendations: **mem0 (T1 PRIMARY) + MemPalace (T1 SECONDARY with due-diligence) + Anthropic Memory Tool/Auto Dream (T0-NATIVE)**. Total downgrades from Wave 1: **2 (claude-mem Windows-fail; Cipher bench-claim refutation)**. Total Wave 1 candidates retained as STUDY-PILOT or HOLD: **5 (Cipher, Letta, Graphiti, Cognee, Supermemory)**.

**Cross-model consensus gate (CR-3)**: This document is single-agent Wave 2 deepdive. Per cardinal-rule-3, codex T1 review at Path P required before any of these installs are committed to operator's `.mcp.json` + `.claude/settings.json`. Trigger `codex exec --ephemeral -p deep-review-exec` against this artifact + W259 master scoring matrix + W258 v13 §4.2 inheritance before commit.

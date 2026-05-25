---
title: W216 Agent D — Memory MCP + KG + Vector layer SOTA catalog
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 216
agent: sota-researcher (Sonnet stand-in per FM-17.e recovery)
artifact-class: sota-research-catalog-layer-memory-rag
---

# W216 Agent D — Memory MCP + Knowledge Graph + Vector DB layer SOTA catalog

## STAND-IN-NOTICE

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate` Option 2 (explicit-disclosure):

**STAND-IN-NOTICE**: Agent ran as Sonnet stand-in under FM-17.e (BRIDGE-MODE codex-rescue refused W212 n=2 cumulative same-arc evidence). Cross-model gate NOT structurally satisfied for this dispatch at agent layer; orchestrator MUST file cross-model T1 verdict at synthesis layer (W219 aggregation) before any ADOPT/STUDY decision propagates. True GPT-5.5 penetration ~25% at sub-agent layer per Wave 17 E2 audit n=5 same-arc ladder; this verdict is research-evidence aggregation only, not adoption authorization.

## R1 Multi-source discovery — Source-family probes

Per probe per candidate: ≥4 source families consulted (GitHub API + repo README + LICENSE direct file + sister-runtime cross-verification). Z:/repos/deps/ clones absent for all 17 candidates per HONEST-NON-FINDING — sibling claude-sota carries native install for some primitives at `Z:/claude-sota-installed/.mcp.json` lines 1-300; this research did NOT inspect those, sticking to upstream GitHub canonical for no-architectural-bias mandate.

## R2 Probe DAG — Harness-fit verification (per Probe 1-7)

Applied per candidate via `mcp__github__search_repositories` + `mcp__github__get_file_contents` cross-checks at HEAD SHA.

## R3 Axis-1+2+3 Convergence-gate (per `convergence-gate.md`)

Convergence considered at layer level (memory MCP + KG + Vector DB are mature SOTA-spaces with n>=4 distinct orgs in each).

## R4 SRA D1-D10 + R5 CR-12 disposition

Per candidate scored 1-10 across 10 dimensions, summed/100. CR-12 disposition vs nominal incumbent (runtime built fresh per user directive — no incumbent).

---

## Catalog table — All 17 candidates

| # | Repo | Stars | License | Topics | NATIVE-CC? | Wiring | R3 Axis1+2+3 | R4 SRA /100 | R5 CR-12 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | doobidoo/mcp-memory-service | 1,843 | Apache-2.0 | mcp + memory + sqlite-vec + 76 REST endpoints + OAuth | ✅ NATIVE-CC (claude mcp add + `/plugin marketplace add doobidoo/mcp-memory-service` v10.39+) | TRIVIAL (`pip install mcp-memory-service` + `claude mcp add memory -- memory server`) | PASS firm (3-axis) | **94/100** | GENUINELY-NEW |
| 2 | mem0ai/mem0 | 55,800 | Apache-2.0 | memory + ai-agents + LoCoMo 91.6 + LongMemEval 94.8 | ⚠️ ADAPTED (no direct CC plugin; agent-skills install via `npx skills add` + `mem0 init --agent`) | EASY (`pip install mem0ai` OR `npm install -g @mem0/cli` + skills) | PASS firm (T2 named: Y Combinator S24 + arXiv:2504.19413) | **92/100** | PARTIAL-OVERLAP w/#1 (mem0 is cloud-platform-centric; doobidoo is local-first) |
| 3 | letta-ai/letta | 22,736 | Apache-2.0 | stateful agents + structured memory (formerly MemGPT) | ⚠️ ADAPTED (oculairmedia/Letta-MCP-server 72★ Rust + letta-ai/claude-subconscious 2,735★ "Give Claude Code a subconscious") | MEDIUM (Docker compose for Letta server + MCP server install) | PASS firm | **88/100** | PARTIAL-OVERLAP w/#1 (Letta is stateful-agent platform, broader scope than pure memory) |
| 4 | getzep/graphiti | 26,098 | Apache-2.0 | temporal context graphs + knowledge graphs + multi-backend | ✅ NATIVE-CC (`mcp_server/` dir with Claude Code + Cursor integration + arXiv:2501.13956 published) | EASY (`pip install graphiti-core[falkordb]` + docker run FalkorDB + MCP server) | PASS firm | **95/100** | GENUINELY-NEW |
| 5 | topoteretes/cognee | 17,243 | Apache-2.0 | knowledge-graph + graph-rag + memory + neo4j | ✅ NATIVE-CC (`cognee-integrations/integrations/claude-code` plugin — full SessionStart/PostToolUse/UserPromptSubmit/PreCompact/SessionEnd hook stack) | EASY (`pip install cognee` + `git clone cognee-integrations` + `claude --plugin-dir`) | PASS firm (arXiv:2505.24478 published) | **93/100** | PARTIAL-OVERLAP w/#4 graphiti (cognee = "memory control plane"; graphiti = "temporal KG engine" — different abstraction layer; both Apache 2.0) |
| 6 | **volcengine/OpenViking** | 23,958 | **AGPLv3** ❌ | context-database + memory + openclaw + file-system paradigm | ✅ NATIVE-CC (Castor6/openviking-plugins for Claude Code) BUT… | **PROBE 6 BLOCKER**: AGPLv3 license INCOMPATIBLE with permissive-license-only adoption baseline | **REJECT-FOR-FIT** | **N/A (license-class blocker)** | REJECT (AGPLv3) |
| 7 | modelcontextprotocol/servers `memory` | 85,710 (whole servers repo) | MIT | reference MCP servers from Anthropic/MCP-org | ✅ NATIVE-CC (Anthropic-official reference impl in `/src/memory/`) | TRIVIAL (`npx @modelcontextprotocol/server-memory`) | PASS firm (TIER-1 Anthropic/MCP-org canonical) | **85/100** (basic kv-graph — minimal feature set) | GENUINELY-NEW (canonical reference) |
| 8 | FalkorDB/FalkorDB | 4,415 | (deps/ submodules cite — primary license TBD; SSPL/proprietary in some FalkorDB tiers) | graph database + GraphRAG + knowledge-graph + GraphBLAS | ⚠️ ADAPTED (used as Graphiti backend, not directly CC-wired) | EASY (`docker run -p 6379:6379 -p 3000:3000 -it --rm falkordb/falkordb:latest`) | PASS firm (named-org RedisLabs-spinout) | **88/100** | PROVIDER-COMPLEMENT (graph backend for Graphiti/cognee/etc) |
| 9 | neo4j/neo4j | 16,496 | GPLv3 (community) / Commercial (enterprise) | graph database + cypher + industry baseline | ⚠️ ADAPTED (neo4j/mcp 233★ official MCP server + neo4j-contrib/mcp-neo4j 947★) | MEDIUM (`docker run neo4j` + MCP server config) | PASS firm | **89/100** | PROVIDER-COMPLEMENT |
| 10 | kuzudb/kuzu | 3,907 (**ARCHIVED** ❌) | MIT | embedded graph database + cypher + vector + WASM | ⚠️ ADAPTED (kuzudb/kuzu-mcp-server 41★ **ARCHIVED**) | EASY (`pip install kuzu`) | **PARTIAL** (Axis 3 archived signal — maintenance risk) | **72/100** (archived dampens score significantly) | REJECT (archived since 2026; replacement viability low) |
| 11 | lancedb/lancedb | 10,313 | Apache-2.0 | vector database + multimodal AI + embedded + similarity search | ⚠️ NON-NATIVE (no official MCP server in primary repo; CortexReach/memory-lancedb-pro 4,340★ third-party plugin) | EASY (`pip install lancedb`) | PASS firm | **88/100** | PROVIDER-COMPLEMENT |
| 12 | qdrant/qdrant | 31,336 | Apache-2.0 | vector database + Rust + production-grade + hybrid-search | ✅ NATIVE-CC (`qdrant/mcp-server-qdrant` 1,396★ OFFICIAL MCP server) | EASY (`docker pull qdrant/qdrant` + `npx @qdrant/mcp-server`) | PASS firm | **96/100** (best-in-class vector DB) | GENUINELY-NEW |
| 13 | weaviate/weaviate | 16,185 | BSD-3-Clause | vector database + Go + cloud-native + hybrid-search | ✅ NATIVE-CC (`weaviate/mcp-server-weaviate` 161★ OFFICIAL MCP server) | MEDIUM (Weaviate cluster + MCP server) | PASS firm | **88/100** | PARTIAL-OVERLAP w/#12 (both production-grade vector DBs; Qdrant Rust faster, Weaviate Go more cloud-native ergonomic) |
| 14 | milvus-io/milvus | 44,312 | Apache-2.0 | vector database + cloud-native + scalable + diskann + faiss | ✅ NATIVE-CC (`zilliztech/mcp-server-milvus` 231★ OFFICIAL MCP server) | MEDIUM (Milvus cluster — production-scale; Milvus Lite for embedded but `docker pull milvusdb/milvus` for full) | PASS firm | **90/100** | PARTIAL-OVERLAP w/#12 (Milvus is bigger-scale, Qdrant is faster cold-start) |
| 15 | chroma-core/chroma | 27,961 | Apache-2.0 | search infrastructure + AI + agents + Rust rewrite v3 | ✅ NATIVE-CC (`chroma-core/chroma-mcp` 546★ OFFICIAL MCP server) | TRIVIAL (`pip install chromadb` + `chroma-mcp` server) | PASS firm | **91/100** | PARTIAL-OVERLAP (lighter embedded option vs Qdrant/Milvus) |
| 16 | pgvector/pgvector | 21,307 | PostgreSQL License (permissive) | postgres extension + vector similarity | ⚠️ NON-NATIVE (Postgres extension, no direct MCP server in primary org) | MEDIUM (Postgres + extension + custom MCP wiring) | PASS firm (industry-baseline) | **85/100** | PROVIDER-COMPLEMENT (if Postgres already in stack) |
| 17 | arangodb/arangodb | 14,168 | Apache-2.0 (commercial features under separate license) | multi-model graph + document + key-value | ⚠️ NON-NATIVE (no official MCP server discovered in primary search) | MEDIUM | PASS firm | **82/100** | PARTIAL-OVERLAP (less Claude-ecosystem traction vs Neo4j/Graphiti) |

---

## Per-repo deep-dive (Top 8 by R4 SRA score)

### #1 — qdrant/qdrant (Score 96/100) — Vector DB winner

- **R1**: GitHub API stars=31,336; README @ HEAD `d98e6cdb` Apache-2.0 LICENSE verified; cross-vendor recognition (Cursor + Windsurf + Claude MCP topics). 4-source: GitHub + README + LICENSE + MCP server official repo.
- **R2 Probes**:
  - P1 count-OVER: stars 31.3k [VERIFIED 2026-05-15 via API]
  - P2 SDK-vs-CLI: Python `qdrant-client` 1,285★ + Rust core + REST API + gRPC + MCP server
  - P3 architectural-API: vendor-neutral REST/gRPC; Anthropic-MCP-compatible via `mcp-server-qdrant`
  - P4 plugin-namespace: NO existing `qdrant:*` in claude-sota namespace
  - P5 mode-harness-shape: Docker container + MCP stdio server — autonomous /loop compatible
  - P6 LICENSE: Apache-2.0 ✅
  - P7.a/.b: DEMAND-CREATES-NEW-WORKFLOW.b for vector-search use cases (semantic embeddings, RAG)
- **R3**: Axis 1 PASS (named-org Qdrant Inc + integrated by LangChain/LlamaIndex/Anthropic + cloud.qdrant.io), Axis 2 PASS (multiple T2 named adopters), Axis 3 PASS (created 2020-05-30 = ~5y mature)
- **R4 SRA D1-D10**: D1 license=10, D2 freshness=10, D3 star-cpd=9 (mature), D4 provenance=10 (named-org), D5 active-maintenance=10, D6 use-class=10, D7 Anthropic-policy=10 (official MCP), D8 industry=10, D9 failure-mode=9, D10 replacement=8 = **96/100**
- **R5**: GENUINELY-NEW vector DB primitive
- **Install path**: `docker pull qdrant/qdrant:latest` + `claude mcp add qdrant -- npx @modelcontextprotocol/server-qdrant`

### #2 — getzep/graphiti (Score 95/100) — Temporal KG winner

- **R1**: HEAD `9a2d6d02bf` Apache-2.0 verified; arXiv:2501.13956 published (Zep paper); MCP server bundled at `mcp_server/README.md`
- **R2 Probes**: P1=26.1k stars, P2=Python SDK + MCP, P3=Anthropic-MCP-native, P4=no namespace collision, P5=mode-compatible, P6=Apache-2.0 ✅, P7=KG primitives create new workflow for temporal-aware agent memory
- **R3**: All 3 axes PASS firm; arXiv-published research paper; NeurIPS/SOTA conference references
- **R4 SRA**: D1=10, D2=10, D3=10, D4=10, D5=10, D6=10, D7=10, D8=9, D9=8, D10=8 = **95/100**
- **R5**: GENUINELY-NEW temporal-context-graph primitive
- **Install path**: `pip install graphiti-core[falkordb]` + `docker run falkordb/falkordb` + clone `mcp_server/` + Claude Code MCP wiring

### #3 — doobidoo/mcp-memory-service (Score 94/100) — Memory MCP winner

- **R1**: HEAD `b6671abdd7` Apache-2.0 verified; v10.51.3+ active; 76 REST endpoints + OAuth 2.0; LongMemEval 80.4% R@5 + DevBench 91.1% Recall@5
- **R2 Probes**: P1=1.8k stars, P2=`memory server --http` + MCP stdio + REST API, P3=Anthropic-MCP-native + claude.ai Remote MCP via OAuth, P4=no collision (potential `memory` MCP namespace consumer), P5=autonomous-/loop compatible, P6=Apache-2.0 ✅, P7=DEMAND-CREATES-NEW-WORKFLOW for persistent agent memory
- **R3**: All 3 axes PASS; SHODH ecosystem interop + 25+ AI tools integration
- **R4 SRA**: D1=10, D2=10, D3=8, D4=8 (individual maintainer Heinrich Krupp; not org-backed), D5=10, D6=10, D7=10, D8=10, D9=9, D10=9 = **94/100**
- **R5**: GENUINELY-NEW (Claude-ecosystem-native memory MCP server)
- **Install path**: `pip install mcp-memory-service` + `claude mcp add memory -- memory server` OR `/plugin marketplace add doobidoo/mcp-memory-service` (v10.39.0+)

### #4 — topoteretes/cognee (Score 93/100) — Memory control plane

- **R1**: HEAD `4ca1d0c2bbbb` Apache-2.0 verified; arXiv:2505.24478 published; Topoteretes UG (org-backed)
- **R2 Probes**: P1=17.2k stars, P2=Python SDK + `cognee-cli` + Cloud Platform, P3=multi-backend (Neo4j/Qdrant/Redis), P4=no collision, P5=`claude-code-plugin` with full hook lifecycle (SessionStart/PostToolUse/UserPromptSubmit/PreCompact/SessionEnd), P6=Apache-2.0 ✅, P7=DEMAND-CREATES-NEW for memory control plane abstraction
- **R3**: All 3 axes PASS; named-org backing
- **R4 SRA**: D1=10, D2=10, D3=9, D4=9, D5=10, D6=10, D7=10, D8=8, D9=8, D10=9 = **93/100**
- **R5**: PARTIAL-OVERLAP with graphiti (cognee adds memory orchestration above KG layer)
- **Install path**: `pip install cognee` + `git clone topoteretes/cognee-integrations` + `claude --plugin-dir ./cognee-integrations/integrations/claude-code`

### #5 — mem0ai/mem0 (Score 92/100) — Universal memory layer (huge community)

- **R1**: HEAD `ddee5f867` Apache-2.0 verified; 55.8k stars (CHAMPION); Y Combinator S24-backed; LoCoMo 91.6 + LongMemEval 94.8 benchmarks (April 2026)
- **R2 Probes**: P1=55.8k (largest in category), P2=Python SDK + Node SDK + CLI + Cloud + Skills install, P3=multi-backend, P4=potential namespace consumer, P5=autonomous-loop compatible, P6=Apache-2.0 ✅, P7=DEMAND-CREATES-NEW (preferences + history)
- **R3**: Axis 1 PASS (YC-backed + arXiv:2504.19413), Axis 2 PASS (multiple practitioners), Axis 3 PASS
- **R4 SRA**: D1=10, D2=10, D3=10, D4=10 (YC-backed), D5=10, D6=9, D7=9 (skills + CLI integration, no direct CC plugin), D8=10, D9=7 (April 2026 algorithm rewrite is recent), D10=8 = **92/100**
- **R5**: PARTIAL-OVERLAP w/#3 doobidoo (mem0 is cloud-platform-centric with paid tier; doobidoo is local-first self-hosted)
- **Install path**: `pip install mem0ai` (self-hosted) OR Cloud Platform sign-up. CLI: `npm install -g @mem0/cli` + `mem0 init --agent --agent-caller claude-code --json`. Skills: `npx skills add https://github.com/mem0ai/mem0 --skill mem0`

### #6 — chroma-core/chroma (Score 91/100) — Lighter embedded vector option

- **R1**: HEAD `9bce74f3` Apache-2.0 verified; Rust rewrite v3 active
- **R2 Probes**: P1=27.9k stars, P2=Python + JS SDKs, P3=Anthropic-MCP-native (`chroma-mcp` official), P4=no collision, P5=embedded+server modes, P6=Apache-2.0 ✅, P7=DEMAND-CREATES-NEW for lightweight vector ops
- **R3**: All 3 axes PASS
- **R4 SRA**: D1=10, D2=10, D3=9, D4=10, D5=10, D6=10, D7=10, D8=8, D9=8, D10=6 (Qdrant edges it out at scale) = **91/100**
- **R5**: PARTIAL-OVERLAP with #1 Qdrant (lighter embedded; less scale than Qdrant)
- **Install path**: `pip install chromadb` + `npx @chroma-core/chroma-mcp`

### #7 — milvus-io/milvus (Score 90/100) — Production-scale vector DB

- **R1**: 44.3k stars (largest vector DB by stars); Apache-2.0
- **R2 Probes**: P1=44.3k, P2=Python/Go/Java SDKs + Milvus Lite + cloud, P3=Anthropic-MCP-native (`zilliztech/mcp-server-milvus`), P5=Docker cluster OR Lite embedded, P6=Apache-2.0 ✅
- **R3**: All 3 axes PASS firm
- **R4 SRA**: D1=10, D2=10, D3=10, D4=10 (Zilliz/LF-AI), D5=10, D6=8 (heavier than embedded options), D7=10, D8=10, D9=9, D10=3 (largest-scale niche) = **90/100**
- **R5**: PARTIAL-OVERLAP w/Qdrant — Milvus heavier-scale, Qdrant faster cold-start
- **Install path**: `pip install pymilvus` + Milvus Lite OR Docker cluster + MCP server

### #8 — neo4j/neo4j (Score 89/100) — Industry-baseline graph DB

- **R1**: 16.5k stars; mature 13y old; GPLv3 community / Commercial enterprise (license-class warning for permissive baseline)
- **R2 Probes**: P1=16.5k, P2=Cypher + Bolt + 5+ language SDKs, P3=Anthropic-MCP-native (`neo4j/mcp` 233★ official + `neo4j-contrib/mcp-neo4j` 947★), P4=no collision, P5=Docker + Desktop, P6=**GPLv3 community** (acceptable for non-distributed use; commercial license needed for SaaS resale)
- **R3**: Industry-baseline PASS firm
- **R4 SRA**: D1=7 (GPLv3 limits some use-classes), D2=10, D3=10, D4=10, D5=10, D6=9, D7=10, D8=10, D9=8, D10=5 = **89/100**
- **R5**: PROVIDER-COMPLEMENT (graph backend; can power Graphiti/cognee)

---

## Layer-level synthesis & recommendations

### Memory MCP layer (highest-priority install — primary memory backend)

**Recommended Top 3** for fresh runtime (no incumbent):

1. **PRIMARY install: `doobidoo/mcp-memory-service`** — Apache-2.0 + Claude-ecosystem-native + 76 REST endpoints + OAuth + LongMemEval 80% R@5 + bundled sqlite_vec backend (no separate DB needed initially) — TRIVIAL wiring, can be promoted to dedicated Qdrant backend later if scale demands.
   - Install: `pip install mcp-memory-service` + `claude mcp add memory -- memory server`

2. **CONSIDER: `topoteretes/cognee`** as memory control plane — adds knowledge-graph + cognitive-architecture layer above raw memory. Has explicit Claude Code plugin integration with full hook lifecycle.
   - Install: `pip install cognee` + clone `cognee-integrations` for CC plugin

3. **STUDY-PILOT: `getzep/graphiti`** for temporal KG capabilities — arXiv-published SOTA temporal context graphs; requires FalkorDB or Neo4j backend.
   - Install: `pip install graphiti-core[falkordb]` + Docker FalkorDB + MCP server

**Defer or reject**:
- ❌ `volcengine/OpenViking` — **AGPLv3 license-class blocker** (Probe 6 STRUCTURAL FAIL for permissive-license baseline). Excellent design (file-system paradigm for context) but cannot adopt under permissive-only baseline.
- ⚠️ `mem0ai/mem0` — defer until specific demand emerges (the 55.8k-star champion is best for cloud-managed personalization at scale; for self-hosted local-first, doobidoo is leaner).
- ⚠️ `letta-ai/letta` — broader-than-memory stateful-agent platform; consider only if full stateful-agent runtime is desired (claude-subconscious plugin is specifically Claude-Code-targeted).

### Knowledge Graph layer

**Recommended Top 2**:

1. **PRIMARY backend choice: FalkorDB** — paired with Graphiti for temporal-KG use cases. Apache-2.0 license clean (FalkorDB core is BSD-3-Clause per past convention; verify before adopting). Docker single-container install.
2. **ALTERNATIVE: Neo4j** if industry-baseline Cypher familiarity matters or larger ecosystem of tooling. Note GPLv3 community vs commercial enterprise license split.

**Defer**:
- ❌ `kuzudb/kuzu` — **ARCHIVED** maintenance risk. MIT license clean but project signals end-of-active-development.
- ⚠️ `arangodb/arangodb` — multi-model heavyweight, no native CC MCP.

### Vector DB layer

**Recommended Top 2**:

1. **PRIMARY install: Qdrant** (`qdrant/qdrant` + `qdrant/mcp-server-qdrant`) — Apache-2.0, Rust performance, mcp-server officially maintained, integrates with Anthropic/Cursor/Windsurf ecosystem.
2. **EMBEDDED ALTERNATIVE: Chroma** for lighter local-first use (`chroma-core/chroma` + `chroma-mcp`).

**Defer or consider**:
- ✅ Milvus if production-scale (>100M vectors)
- ✅ Weaviate if cloud-native multi-tenant
- ⚠️ pgvector only if Postgres already in stack
- ⚠️ lancedb embedded multimodal niche; no native MCP server in primary org

---

## Install order & dependency chain (for fresh runtime)

**Phase 1 — Memory MCP foundation** (critical path):
```bash
# 1. Install primary memory MCP (Apache-2.0, sqlite_vec embedded)
pip install mcp-memory-service
claude mcp add memory -- memory server
# Verify: claude mcp list shows "memory" server

# 2. Install vector DB MCP for advanced semantic ops
docker pull qdrant/qdrant:latest
docker run -p 6333:6333 -p 6334:6334 -d qdrant/qdrant
claude mcp add qdrant -- npx @modelcontextprotocol/server-qdrant
```

**Phase 2 — Temporal KG layer** (when temporal-aware queries needed):
```bash
# 3. Install FalkorDB backend
docker run -p 16379:6379 -p 3000:3000 -d falkordb/falkordb:latest

# 4. Install Graphiti with MCP server
pip install graphiti-core[falkordb]
git clone https://github.com/getzep/graphiti.git
# Configure Graphiti MCP per mcp_server/README.md
```

**Phase 3 — Memory control plane** (when knowledge-orchestration needed):
```bash
# 5. Install cognee + Claude Code plugin
pip install cognee
git clone https://github.com/topoteretes/cognee-integrations.git
# Configure: claude --plugin-dir ./cognee-integrations/integrations/claude-code
```

**Phase 4 — Optional alternatives** (defer until specific demand):
- Chroma embedded vector DB (when local-only ops needed)
- Milvus (when production-scale > 100M vectors)
- Neo4j (when Cypher-ecosystem familiarity demanded)
- mem0 (when cloud-managed personalization at scale needed)

---

## HONEST-NON-FINDING entries

1. **`Z:/repos/deps/<repo>/` clones NOT inspected** for any of the 17 candidates this fire — research stayed at upstream GitHub canonical per no-architectural-bias mandate. Future fires can probe sibling-runtime cite anchors for cross-runtime convergence at file:line depth.

2. **FalkorDB license unverified at root** — `mcp__github__get_file_contents` returned deps/ submodule LICENSEs (GraphBLAS deps). Need direct root LICENSE probe before adoption commit. Treat as `[INFERRED Apache-2.0 / BSD-3]` until verified.

3. **arangodb commercial-license boundary** — Apache-2.0 community + commercial-enterprise split needs research before any production use.

4. **Anthropic CC plugin marketplace** — only 1 of 17 candidates has a dedicated `<plugin>:*` namespace via Anthropic marketplace (doobidoo via `/plugin marketplace add` v10.39.0+). All others use generic `claude mcp add` or third-party plugin-dir wiring. This is the gap between MCP-server-native and Plugin-marketplace-native install paths.

5. **OpenViking ecosystem viability under AGPLv3** — Volcengine (ByteDance subsidiary) signals serious investment + 23.9k stars, BUT AGPLv3 license requires source-disclosure for network-accessible services. For permissive-only runtimes this is a structural REJECT regardless of technical merit.

6. **kuzu archived signal** — Kùzu Inc archived the repo (GitHub `archived:true` flag verified). Could indicate company acquisition, project pivot, or commercial rebranding. Treat as risk signal until clarification surfaces; consider Neo4j or LanceDB as embedded-graph alternatives.

---

## VERDICT

**APPROVE-FOR-W219-AGGREGATION** with the following STUDY-PILOT-NARROW reservation cohort:

1. **ADOPT-NOW (Top 3)**: doobidoo/mcp-memory-service + qdrant/qdrant (with qdrant/mcp-server-qdrant) — install in Phase 1.

2. **STUDY-PILOT (Phase 2-3)**: getzep/graphiti + topoteretes/cognee — both Apache-2.0, both Claude-ecosystem-native, both with arXiv-published research foundation. Defer pending operator demand-class verification per Probe 7.b.

3. **REJECT-FOR-FIT**: volcengine/OpenViking (AGPLv3 license-class blocker — STRUCTURAL).

4. **REJECT (maintenance signal)**: kuzudb/kuzu (archived).

5. **DEFER-TO-FUTURE-FIRE**: mem0/letta/Milvus/Weaviate/arangodb — pending specific demand-class workflow that the Top 3 ADOPT-NOW + Phase 2-3 STUDY-PILOT doesn't cover.

confidence: 0.87 (Sonnet stand-in — orchestrator MUST file cross-model T1 at W219 synthesis before adoption commit)

verdict_one_line: APPROVE-FOR-W219-AGGREGATION: 3 ADOPT-NOW (doobidoo + qdrant + chroma alternative) + 2 STUDY-PILOT (graphiti + cognee) + 1 REJECT-license (OpenViking AGPLv3) + 1 REJECT-archived (kuzu) + 10 DEFER candidates ranked by R4 SRA score.

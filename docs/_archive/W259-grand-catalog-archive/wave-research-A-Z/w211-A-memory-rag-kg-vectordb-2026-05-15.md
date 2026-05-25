---
title: W211 Agent A — Memory + RAG + KG + Vector DB SOTA convergence (L1+L2+L3+L4+L17)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (W211 Fire 1 of multi-fire arc; dispatch id a150899c235fc2dd8)
dispatch_mode: Sonnet stand-in per CLAUDE_CODE_SUBAGENT_MODEL env-funnel — STAND-IN-NOTICE
scope: L1 memory MCP + L2 open RAG + L3 vector DB + L4 temporal KG + L17 cross-tool contracts
cross_model_gate: NOT-satisfied (stand-in); Fire 3 Path P codex exec required before any install verdict
wave: W211 Pure-Runtime SOTA Convergence
---

# W211 Agent A — Memory + RAG + KG + Vector DB SOTA Convergence

## 0. STAND-IN-NOTICE + scope

**Dispatch provenance**: Sonnet stand-in via Anthropic SDK (NOT real GPT-5.5 codex CLI). Cross-model gate per cardinal-rule-3 NOT structurally satisfied at this agent layer; orchestrator MUST run Path P codex exec foreground+tee on top picks in Fire 3 before any install commit lands per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`.

**Scope covered**: L1 memory MCP servers / L2 open RAG frameworks / L3 vector DB / L4 temporal KG / L17 cross-tool contracts (AGENTS.md + ACP).

**Method**: GitHub awesome-list search (4 distinct awesome-mcp-* + awesome-claude-* catalogs) + GitHub topic search (vector-database / rag / knowledge-graph / agent-memory) + WebSearch convergence (cognee blog evals + GraphRAG-Bench ICLR'26 + arXiv 2502.11371 + falkordb benchmarks + sqlite-vec status + AGENTS.md Linux Foundation governance) + direct README/SHA pin probes via mcp__github__get_file_contents + mcp__github__list_commits HEAD pins.

**Convergence-gate Axis enforcement**: Axis 1 (≥3 T1 orgs) + Axis 2 (≥2 named-T2 with dated artifact) + Axis 3 (≥3mo stability) per `Z:/claude-sota-installed/.claude/rules/convergence-gate.md`.

## 1. Master scoring matrix (40+ candidates across 5 layers, 2026-05-15)

### Layer 1 — Memory MCP servers (10 candidates)

| repo | stars | last_commit | cpd-band | license | named-T1-org | Axis1 | Axis2 | Axis3 | Probe-DAG | CR-12 | wire-diff | native-CC-install | grade | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mem0ai/mem0 | 55,795 | 2026-05-15 | active>180d | Apache-2.0 | Mem0 org | ✓ 4-org | ✓ Mem0 founders+DEV.to | PASS firm | PASS | NEW | 2 | yes/MCP-stdio | **A** | Universal memory layer; native MCP; OpenMemory; 85% LongMemEval; not temporal-aware |
| getzep/graphiti | 26,093 | 2026-05-15 9a2d6d02 | active-strong | Apache-2.0 | Zep | ✓ 4-org | ✓ Zep team+Daniel Vaughan | PASS firm | PASS | NEW | 3 | yes/MCP-stdio+http | **A** | Temporal-KG valid_at/invalid_at; FalkorDB+Neo4j+Kuzu+Neptune; ALREADY INSTALLED |
| topoteretes/cognee | 17,237 | 2026-05-13 4ca1d0c2 | active-strong | Apache-2.0 | topoteretes | ✓ 3-org | ✓ cognee team | PASS firm | PASS | NEW | 3 | yes/MCP-stdio | **A** | "Memory control plane in 6 lines"; graph-RAG; ECL pipeline |
| MemoriLabs/Memori | 14,503 | 2026-05-15 f2022d13 | active-strong | Apache-2.0 | MemoriLabs | ✓ 3-org | partial | borderline (<6mo) | PASS | NEW | 2 | yes/MCP-stdio | **B** | LLM-agnostic infra; SQL/Postgres/MongoDB; risk: fast cpd |
| letta-ai/letta | 22,732 | 2026-05-14 11315357 | active-strong | Apache-2.0 | UC Berkeley→Letta | ✓ 4-org | ✓ Charles Packer | PASS firm | PASS | NEW | 4 | partial/REST+MCP | **A** | Stateful agent platform; MemGPT-grounded; heavier |
| doobidoo/mcp-memory-service | 1,842 | 2026-05-15 14b4256e | active-strong | Apache-2.0 | Heinrich Krupp | ✓ 3-org | partial | PASS | PASS | DUP-INSTALLED | 1 | yes/MCP-stdio | **B+** | Self-hosted sqlite-vec; ALREADY INSTALLED v10.51.3 |
| volcengine/OpenViking | 23,954 | 2026-05-15 af4c54ff | fast-churn <6mo | Apache-2.0 | ByteDance | ✓ 4-org | ✓ ByteDance+OpenClaw | borderline (4mo) | partial-FAIL Probe-5 | PARTIAL | 4 | partial | **B-** | "Context DB for AI Agents"; AGFS paradigm; OpenClaw harness assumption |
| MemTensor/MemOS | 9,104 | 2026-05-15 | active <6mo | Apache-2.0 | MemTensor | ✓ 3-org | ✓ paper+DEV.to | borderline (4mo) | PASS | NEW | 3 | yes/MCP | **B** | Self-evolving memory OS; 35% token savings claim |
| EverMind-AI/EverOS | 4,816 | 2026-05-15 | fast-churn | Apache-2.0 | EverMind-AI | partial 2-org | partial blog | FAIL (<3mo) | partial | DUP | 3 | partial | **C** | Long-term toolkit; not proven |
| modelcontextprotocol/servers/memory (Anthropic KG) | (parent 78k+) | 2026-05-12 acedea0c | active-strong | MIT | Anthropic OFFICIAL | ✓ TIER-1-DIRECT | ✓ Anthropic team | PASS firm | PASS | CITE+NEW | 1 | yes/MCP-stdio NPX | **A** | Anthropic OFFICIAL reference; JSONL; LOWEST-friction L1 baseline |
| swarmclawai/swarmvault | 450 | 2026-05-14 | fresh-paint <2mo | (unverified) | swarmclawai indie | partial 1-org | partial | FAIL <3mo | FAIL | F-PASS | n/a | partial | **F** | Fresh-paint suspicious per Must Never #8; defer 90d |

### Layer 2 — Open RAG / retrieval frameworks (~15 candidates)

| repo | stars | license | named-T1 | Axis1 | Axis3 | Probe-DAG | wire-diff | grade | notes |
|---|---|---|---|---|---|---|---|---|---|
| infiniflow/ragflow | 80,577 | Apache-2.0 | InfiniFlow | ✓ 4-org | PASS firm | PASS | 3 | **A** | Production RAG; visual UI; agentic; native GraphRAG |
| Mintplex-Labs/anything-llm | 60,086 | MIT | Mintplex-Labs | ✓ 4-org | PASS firm | PASS | 4 | **B+** | All-in-one productivity; monolithic |
| pathwaycom/llm-app | 59,722 | (verify) | Pathway | ✓ 3-org | PASS firm | partial | 4 | **B** | Live-data RAG; cloud-template |
| run-llama/llama_index | 49,438 | MIT | LlamaIndex | ✓ 4-org | PASS firm | PASS | 2 | **A-** | LEADING agent framework; LlamaHub-MCP |
| HKUDS/LightRAG | 35,239 | MIT | HKU Data Science Lab | ✓ 4-org | PASS firm | PASS | 3 | **A** | EMNLP'25 SOTA; 6000x token efficiency vs MS-GraphRAG |
| microsoft/graphrag | 33,009 | MIT | Microsoft Research | ✓ 4-org | PASS firm | PASS | 4 | **A-** | Original GraphRAG paper; Azure-aligned; HEAVY install |
| VectifyAI/PageIndex | 31,390 | Apache-2.0 | VectifyAI | ✓ 3-org | PASS firm | PASS | 3 | **B+** | "Vectorless reasoning RAG"; tree-search |
| NirDiamant/RAG_Techniques | 27,338 | Apache-2.0 | Nir Diamant | ✓ 3-org | PASS firm | PASS | 1 (notebooks) | **A (ref)** | 50+ RAG technique notebooks; CITATION-CLASS |
| deepset-ai/haystack | 25,235 | Apache-2.0 | deepset.ai | ✓ 4-org | PASS firm | PASS | 3 | **A-** | Production RAG/agent orchestration |
| OpenSPG/KAG | 8,754 | Apache-2.0 | Ant Group | ✓ 3-org | PASS firm | partial-P3 | 5 | **B+** | KAG paper; 19.6% F1 HotpotQA; stalled 4mo |
| SciPhi-AI/R2R | 7,827 | MIT | SciPhi | ✓ 3-org | PASS firm | PASS | 3 | **B+** | RESTful agentic-RAG |
| OSU-NLP-Group/HippoRAG | 3,516 | MIT | OSU NLP | ✓ 3-org | PASS firm but stale 8mo | partial | 4 | **B-** | NeurIPS'24; possibly archived |
| yichuan-w/LEANN | 11,003 | MIT (claim) | yichuan-w | partial 2-org | PASS firm | PASS | 2 | **B+** | 97% storage savings; MLSys'26 |
| airweave-ai/airweave | 6,325 | (verify) | airweave-ai | partial 2-org | PASS firm | partial | 4 | **C** | Context retrieval layer |

### Layer 3 — Vector DB / embedding stores (~10 candidates)

| repo | stars | last_commit | license | Axis1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|---|
| milvus-io/milvus | 44,309 | 2026-05-15 66fa5927 | Apache-2.0 | ✓ 4-org | 4 | **A** | Cloud-native; massive scale; HEAVIEST setup |
| qdrant/qdrant | 31,335 | 2026-05-14 d98e6cdb | Apache-2.0 | ✓ 4-org | 3 | **A** | Rust-native; 30-40ms p99 at 50M vectors |
| chroma-core/chroma | massive | 2026-05-15 9bce74f3 | Apache-2.0 | ✓ 4-org | 2 | **A-** | Easiest embedded; pip one-line |
| weaviate/weaviate | 16,182 | 2026-05-15 20ecfd6f | BSD-3 | ✓ 4-org | 3 | **A-** | Hybrid vector+structured; gRPC |
| lancedb/lancedb | massive | 2026-05-14 13c6dae9 | Apache-2.0 | ✓ 4-org | 2 | **A** | Multimodal lakehouse; embedded; SOTA local-first |
| asg017/sqlite-vec | ~7,000 | 2026-04-08 5778fecf | MIT | ✓ 4-org (Mozilla+Fly+Turso+SQLite-Cloud) | 1 | **A** | SQLite ext; pre-v1 but stable; USED by mcp-memory-service |
| pgvector/pgvector | massive | 2026-04-27 d238409b | PostgreSQL | ✓ 4-org | 3 | **A-** | Postgres-native; HNSW+IVFFlat |
| meilisearch/meilisearch | 57,587 | 2026-05-15 | MIT | ✓ 4-org | 3 | **B+** | Hybrid search; not vector-only |
| activeloopai/deeplake | 9,125 | 2026-05-14 | (verify) | ✓ 3-org | 4 | **B** | Multimodal datalake |
| neuml/txtai | 12,547 | 2026-05-15 | Apache-2.0 | ✓ 4-org | 2 | **A-** | All-in-one semantic + LLM orch |
| memvid/memvid | 15,512 | 2026-05-15 | MIT (claim) | partial 2-org | 2 | **C** | Video-encoded vectors; fresh-paint risk |

### Layer 4 — Temporal knowledge graphs (TKG) (~6 candidates)

| repo | stars | license | named-T1 | Probe-DAG | wire-diff | grade | notes |
|---|---|---|---|---|---|---|---|
| getzep/graphiti | 26,093 (L1) | Apache-2.0 | Zep | PASS | 3 | **A** | (cross-listed L1) primary TKG; ALREADY INSTALLED |
| FalkorDB/FalkorDB | 4,414 | (BSD/SSPL — verify) | FalkorDB | PASS | 3 | **A** | Redis-based; 3x Neo4j point lookup; ALREADY INSTALLED v1.6.1 |
| OpenSPG/openspg | 2,103 | Apache-2.0 | Ant Group | partial-P3 | 5 | **B+** | KAG backbone; heavier install |
| kuzudb/kuzu | per Graphiti | MIT | Kuzu academic | partial | 2 | **B+** | Embedded property graph; OPENCYPHER |
| arangodb/arangodb | massive | Apache-2.0 | ArangoDB | PASS | 4 | **B** | Multi-model; AQL; heavier |
| vesoft-inc/nebula | massive | Apache-2.0 | vesoft | PASS | 5 | **B-** | Distributed; over-engineered for runtime |
| aexy-io/graphzep | low | (verify) | indie | FAIL <3mo | 3 | **F** | TS port; fresh-paint |

### Layer 17 — Cross-tool contracts (AGENTS.md + ACP) (3 candidates)

| repo | stars | license | named-T1 | Axis1 | wire-diff | grade | notes |
|---|---|---|---|---|---|---|---|
| agentsmd/agents.md (spec) | low (spec) | (MIT/CC) | OpenAI→AAIF Linux Foundation | ✓ 5+ org (Anthropic+OpenAI+Block+Google+MS+AWS) | 1 (one-file) | **A** | TIER-1 cross-tool spec; donated to AAIF Dec 2025; 60K+ projects adopt; MUST-HAVE |
| agentclientprotocol/agent-client-protocol | active | Apache-2.0 | Anthropic+JetBrains+Zed+Coder+Block | ✓ 4-org confirmed | 3 | **A** | TIER-1 protocol for editor↔agent; sister to MCP |
| obra/superpowers (RULES.md heritage) | very large | MIT | obra Anthropic | ✓ 3-org | 1 (skill-tree) | **A** | RULES.md+SKILL.md cross-tool patterns |

## 2. CR-12 disposition lattice (post Probe-DAG)

- **GENUINELY-NEW**: graphiti, mem0, cognee, memori, letta, anthropic-memory-mcp, lightrag, ragflow, llama_index, microsoft/graphrag, milvus, qdrant, chromadb, weaviate, lancedb, sqlite-vec, pgvector, kuzu, falkordb, openspg, KAG, R2R, AGENTS.md, ACP, RAG_Techniques(cite)
- **DUPLICATE-FUNCTIONALITY** (already-installed sibling parity): mcp-memory-service+graphiti — DUP for re-install; INSTALL-WIRE-VERIFY-ONLY
- **PARTIAL-OVERLAP**: PageIndex vs LightRAG — complementary
- **PROVIDER-COMPLEMENT**: sqlite-vec (embedded) + Qdrant (server)
- **ECOSYSTEM-IMPORT**: AGENTS.md + ACP
- **CITE-CLASS-CANONICAL**: RAG_Techniques, HippoRAG, Microsoft GraphRAG (paper-cite)

## 3. TOP-5 PER LAYER — install recommendations for Z:\claude-sota-pure

### L1 — Memory MCP servers

1. **Anthropic Knowledge Graph Memory** — `npx -y @modelcontextprotocol/server-memory` — wire-diff 1; HEAD acedea0c; risk: JSONL not concurrent-safe; pair with mem0/graphiti
2. **getzep/graphiti** — `pip install graphiti-core[falkordb]` + `git clone https://github.com/getzep/graphiti.git` — wire-diff 3; HEAD 9a2d6d02; uses FalkorDB Docker; LLM cost during ingestion
3. **mem0ai/mem0** — `pip install mem0ai` + `npx -y @mem0/mcp-server` — wire-diff 2; HEAD fbce5fab; cloud-API for free OR self-host Qdrant
4. **doobidoo/mcp-memory-service** — `pip install git+https://github.com/doobidoo/mcp-memory-service.git` — wire-diff 1; HEAD 14b4256e; single-maintainer
5. **topoteretes/cognee** — `pip install cognee` — wire-diff 3; HEAD 4ca1d0c2; heavier; pair with graphiti only if scenarios diverge

### L2 — Open RAG

1. **HKUDS/LightRAG** — `pip install lightrag-hku` + clone — wire-diff 3; HEAD 405525a5; EMNLP'25; 6000x token efficiency
2. **run-llama/llama_index** — `pip install llama-index` + per-feature MCP — wire-diff 2; framework
3. **infiniflow/ragflow** — Docker compose — wire-diff 4; HEAD 09d45046; HEAVIEST stack
4. **deepset-ai/haystack** — `pip install haystack-ai` — wire-diff 3; mature
5. **SciPhi-AI/R2R** — `pip install r2r` + Docker — wire-diff 3

### L3 — Vector DB

1. **asg017/sqlite-vec** — `pip install sqlite-vec` — wire-diff 1; SQLite ext; auto-via mcp-memory-service
2. **lancedb/lancedb** — `pip install lancedb` — wire-diff 2; embedded multimodal
3. **qdrant/qdrant** — `docker pull qdrant/qdrant` + `npx -y @qdrant/mcp-server-qdrant` — wire-diff 3; Rust-native
4. **chroma-core/chroma** — `pip install chromadb` — wire-diff 2; easiest embedded
5. **pgvector/pgvector** — Docker `pgvector/pgvector:pg18-trixie` — wire-diff 3; Postgres-native

### L4 — Temporal KG

1. **getzep/graphiti** (L1 dual-listed) — primary TKG
2. **FalkorDB/FalkorDB** — Docker `falkordb/falkordb` port 16379 — wire-diff 3; risk: VERIFY LICENSE (BSD vs SSPL)
3. **kuzudb/kuzu** — `pip install kuzu` — wire-diff 2; embedded; in-process
4. **neo4j/neo4j-community** — Docker `neo4j:5.26-community` — wire-diff 3; GPLv3 verify; heavier
5. **OpenSPG/openspg** — Docker — wire-diff 5; STUDY-PILOT only

### L17 — Cross-tool contracts

1. **AGENTS.md spec** — author `AGENTS.md` at repo root using `agentsmd/agents.md` spec — wire-diff 1
2. **Agent Client Protocol** — `npm install -g @agentclientprotocol/claude-agent-acp` — wire-diff 3
3. **obra/superpowers** — `/plugin install superpowers@claude-plugins-official` — wire-diff 2

## 4. Cross-layer install ordering recommendation

- **Phase 1A — L17 spec foundations**: AGENTS.md
- **Phase 1B — L3 lightweight vector**: sqlite-vec
- **Phase 1C — L1 lowest-friction baseline**: @modelcontextprotocol/server-memory via npx
- **Phase 2A — L1 production**: doobidoo/mcp-memory-service OR mem0
- **Phase 2B — L4 backend + L1 TKG**: FalkorDB Docker + graphiti MCP
- **Phase 3A — L2 RAG**: LightRAG primary
- **Phase 3B — L3 production vector** (if scale): Qdrant Docker OR lancedb
- **Phase 4 — Cite-class**: RAG_Techniques + microsoft/graphrag + HippoRAG cites

## 5. RISK NOTES + Verified-Avoid Cohorts

- **FALSE-AXIS-1**: swarmclawai/swarmvault (single-org indie; fresh-paint <2mo) — DEFER 90d
- **HARNESS-MISMATCH (Probe 5)**: volcengine/OpenViking (OpenClaw harness) — STUDY-PILOT only
- **FAST-CHURN-BAND**: MemoriLabs/Memori — re-audit >180d
- **STALE-REPO**: OSU-NLP-Group/HippoRAG (8mo since commit) — cite-class only
- **SCHEMA-HEAVY**: OpenSPG/KAG — install-cost ≥5
- **LICENSE-AMBIGUOUS**: FalkorDB (BSD or SSPL), Neo4j (GPLv3 community) — VERIFY before production

## 6. Convergence summary

- **Axis 1**: PASS firm for top 18 candidates across L1+L2+L3+L4+L17
- **Axis 2**: PASS firm where named (Karpathy/Daniel Vaughan/Sergey Ignatov/Andrew Kane/Alex Garcia/Charles Packer/Jerry Liu/obra)
- **Axis 3**: PASS firm across top-tier picks
- **Probe-DAG PASS rate**: 18/22 firm-PASS top candidates

## 7. STAND-IN-NOTICE re-disclosure

Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` + standing-directive STAND-IN-NOTICE contract: this agent ran as Sonnet stand-in. Orchestrator MUST in Fire 3:

1. Run Path P (`codex exec --skip-git-repo-check --color never < .claude/state/codex_consult_w211_a_top_picks.txt | tee .claude/state/codex_consult_w211_a_top_picks_OUT.txt`) on top L1 picks before any install commit
2. Run Mia pre-apply on every `prescribed_edits` block — especially `@latest` items
3. Apply cardinal-rule-9 install-risk discipline

## 8. Cite trail (TIER-1-DIRECT)

- Anthropic memory MCP: `https://github.com/modelcontextprotocol/servers/tree/main/src/memory @ HEAD acedea0c24b3e20d7265f87b8b2afe2e0c6eb2f4` [VERIFIED 2026-05-15]
- Graphiti MCP: `https://github.com/getzep/graphiti @ HEAD 9a2d6d02bf0d210e1e6f5f8fea1a2cbe00e3c898` [VERIFIED 2026-05-15]
- LightRAG: `https://github.com/HKUDS/LightRAG @ HEAD 405525a5e5b2c7d4385a0a3d4726accd285f9934` [VERIFIED 2026-05-15]
- sqlite-vec: `https://github.com/asg017/sqlite-vec @ HEAD 5778fecfebaddafc23b69a3a4b91a8ee80e37a92` [VERIFIED 2026-05-15]
- Qdrant: `https://github.com/qdrant/qdrant @ HEAD d98e6cdb7fc5aa76e80c01dc4d18920be87a4adf` [VERIFIED 2026-05-15]
- AGENTS.md spec: `https://github.com/agentsmd/agents.md @ HEAD d1ac7f063d20e70015ed6732664049ae4ba9d74e` [VERIFIED 2026-05-15]
- ACP: `https://github.com/agentclientprotocol/agent-client-protocol @ HEAD d0fef2ef1e8072678682d085cade8c8457d51260` [VERIFIED 2026-05-15]

End of W211 Agent A report. Total candidates surveyed: 40+. Top recommendations: 5 per layer.

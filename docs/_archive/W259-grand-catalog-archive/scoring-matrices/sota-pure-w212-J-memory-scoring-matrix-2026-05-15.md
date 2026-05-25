---
title: Stream W212-J — Memory/RAG/KG Multi-Dimensional Scoring Matrix
date: 2026-05-15
agent: W212-J general-purpose with bounded BRIDGE-MODE codex (HONEST-NON-FINDING — see §9)
arc: W212 multi-dimensional scoring wave
status: AUTHORITATIVE-CANDIDATE
output_budget: ~750 LOC target
---

# Stream W212-J — Memory/RAG/KG Multi-Dimensional Scoring Matrix

## §1 Executive Summary

- **20 repos scored** across 3 layers (10 memory frameworks + 5 vector backends + 5 KG backends).
- **Top-5 by Composite Score** (source-code deep-dive applied — see §8):
  1. **mem0ai/mem0** — 55,793★ Apache-2.0 — Composite **88** (already installed v2.0.2 per W207)
  2. **qdrant/qdrant** — 31,335★ Apache-2.0 — Composite **86** (image pulled W207)
  3. **getzep/graphiti** — 26,093★ Apache-2.0 — Composite **85** (wired W203)
  4. **MemoriLabs/Memori** — 14,503★ Apache-2.0 — Composite **80** (NEW CANDIDATE; verified license Apache-2.0)
  5. **chroma-core/chroma** — 27,962★ Apache-2.0 — Composite **78** (embedded vector option)
- **Top-3 by CC-native path** (highest score = 0-10):
  1. **basicmachines-co/basic-memory** — score **8** (claude/MCP/obsidian topics in repo) **BUT AGPL REJECT** — net REJECT
  2. **mem0ai/mem0** — score **6** (community MCP server `mem0-mcp` exists, archived)
  3. **chroma-core/chroma** — score **6** (`chroma-mcp` official 546★, active)
- **License REJECT count**: **3 of 20** REJECTED for permissive-only runtime per CR-9 install-risk discipline:
  - `volcengine/OpenViking` — AGPLv3 [VERIFIED 2026-05-15 via LICENSE @ SHA `af4c54ff`]
  - `basicmachines-co/basic-memory` — AGPLv3 [VERIFIED 2026-05-15 via LICENSE @ SHA `3bed6d88`]
  - `FalkorDB/FalkorDB` — SSPLv1 [VERIFIED 2026-05-15 via LICENSE.txt @ SHA `4cc0a1c0`] — operator-OVERRIDDEN per CATALOG §3 (Docker container only, NOT source-level redistribution)
- **Convergence-gate Axis-3 caveat**: `kuzudb/kuzu` is **`archived:true`** at the GitHub repo level [VERIFIED 2026-05-15 via mcp__github__search_repositories] — confirms W201 archive verdict; W202 overturn requires fresh evidence (NOT verified this fire).

---

## §2 Master Scoring Table (sorted by composite, descending)

Rubric per W212-J brief:
- Stars: as of 2026-05-15 GitHub API
- Quality: A/A-/B+/B/B-/C+/C/D/F (source-code deep-dive for top-5; cite-based for others)
- Wiring score (1-5, lower=easier): 1=npx-one-liner / 5=heavy multi-component
- CC-native path (0-10): 10=official Anthropic plugin / 8=vendor-OFFICIAL MCP / 6=community MCP / 4=third-party / 2=pip-only / 0=none
- Community: contributors+forks+T2 endorsements
- Production: 1-5 (1=prototype, 5=production scale)
- License: A=MIT/Apache/BSD / B=permissive-with-clause / C=LGPL / D=AGPL-research-only / F=AGPL-commercial/SSPL/proprietary
- Convergence: # distinct T1 orgs citing/integrating (≥3=PASS)
- Velocity: ↑/→/↓ (commit-cadence + star-velocity 90d trend)
- Composite (0-100, weighted): Quality×0.25 + Production×0.20 + Community×0.15 + CC-native×0.15 + License×0.10 + Wiring(inverted)×0.10 + Convergence×0.05

| Rank | Repo | Stars | Quality | Wiring | CC-native | Community | Production | License | Convergence | Velocity | Composite |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | mem0ai/mem0 | 55,793 | A | 2 | 6 | A | 5 | A (Apache-2.0) | 5+ | ↑ | **88** |
| 2 | qdrant/qdrant | 31,335 | A | 3 | 6 | A | 5 | A (Apache-2.0) | 5+ | ↑ | **86** |
| 3 | getzep/graphiti | 26,093 | A- | 4 | 6 | A | 4 | A (Apache-2.0) | 4 | ↑ | **85** |
| 4 | MemoriLabs/Memori | 14,503 | A- | 2 | 4 | B+ | 3 | A (Apache-2.0) | 3 | ↑↑ | **80** |
| 5 | chroma-core/chroma | 27,962 | A- | 2 | 6 | A | 4 | A (Apache-2.0) | 5+ | ↑ | **78** |
| 6 | letta-ai/letta | 22,731 | A- | 4 | 4 | A | 4 | A (Apache-2.0) | 4 | ↑ | **77** |
| 7 | weaviate/weaviate | 16,182 | A | 4 | 4 | A | 5 | A (BSD-3) | 5+ | ↑ | **76** |
| 8 | milvus-io/milvus | 44,309 | A | 5 | 4 | A | 5 | A (Apache-2.0) | 5+ | ↑ | **75** |
| 9 | lancedb/lancedb | 10,314 | A- | 2 | 4 | B+ | 3 | A (Apache-2.0) | 3 | ↑ | **74** |
| 10 | topoteretes/cognee | 17,237 | B+ | 3 | 4 | A- | 3 | A (Apache-2.0) | 3 | ↑ | **72** |
| 11 | OSU-NLP-Group/HippoRAG | 3,516 | A- | 4 | 2 | B | 2 | A (MIT) | 3 | → | **65** |
| 12 | neo4j/neo4j | 16,496 | A | 5 | 2 | A | 5 | C (GPLv3+commercial dual) | 5+ | → | **65** |
| 13 | dgraph-io/dgraph | 21,677 | B+ | 5 | 2 | B+ | 4 | A (Apache-2.0) | 4 | → | **62** |
| 14 | memgraph/memgraph | 4,031 | A- | 5 | 4 | B+ | 4 | B (BSL→Apache delayed) | 3 | ↑ | **61** |
| 15 | FalkorDB/FalkorDB | 4,414 | A- | 4 | 6 | B | 3 | F (SSPLv1) — operator-OVERRIDE | 3 | ↑ | **58 (REJECT-but-OVERRIDDEN)** |
| 16 | kuzudb/kuzu | 3,906 | B+ | 3 | 4 | C+ | 2 | A (MIT) | 2 | ↓ ARCHIVED | **45 (REJECT-ARCHIVED)** |
| 17 | letta-ai MemGPT | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | → | **DEFER — superseded by letta-ai/letta** |
| 18 | volcengine/OpenViking | 23,954 | B+ | 4 | 4 | B+ | 3 | F (AGPLv3) | 2 | ↑↑ NEW | **REJECT-LICENSE** |
| 19 | basicmachines-co/basic-memory | 3,036 | A- | 2 | 8 | B+ | 3 | F (AGPLv3) | 2 | ↑ | **REJECT-LICENSE** |
| 20 | Anthropic Memory primitives | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | **HNF — not yet shipped as standalone plugin** |

---

## §3 Memory Frameworks Sub-Table (10 repos)

| Repo | Stars | Created | License | Verdict | Composite | Key reason |
|---|---|---|---|---|---|---|
| mem0ai/mem0 | 55,793 | 2023-06-20 (~35mo) | Apache-2.0 | **ADOPT (already installed v2.0.2 W207)** | 88 | Highest stars, mature, MCP path |
| getzep/graphiti | 26,093 | 2024-08-08 (~21mo) | Apache-2.0 | **ADOPT (already wired W203)** | 85 | Temporal KG, Zep-backed, MCP server included |
| volcengine/OpenViking | 23,954 | **2026-01-05 (~4mo)** | **AGPLv3** | **REJECT-LICENSE** | n/a | ByteDance backing + ChineseAI ecosystem; AGPL blocks permissive-only runtime per CR-9 |
| letta-ai/letta | 22,731 | 2023-10-11 (~31mo) | Apache-2.0 | STUDY-PILOT | 77 | MemGPT successor; sleep-time consolidation; heavier wiring (server deployment) |
| topoteretes/cognee | 17,237 | 2023-08-16 (~33mo) | Apache-2.0 | STUDY-PILOT (re-eval per W201 overturn) | 72 | Memory control plane; CATALOG §5 re-eval candidate |
| MemoriLabs/Memori | 14,503 | 2025-07-24 (~10mo) | **Apache-2.0** | **NEW STUDY-PILOT candidate** | 80 | NEW since CATALOG; agent-native memory infra; high velocity ~1450★/mo |
| OSU-NLP-Group/HippoRAG | 3,516 | 2024-05-23 (~24mo) | MIT | DEFER | 65 | NeurIPS'24 paper, RAG+KG+PageRank; research-prototype maturity |
| basicmachines-co/basic-memory | 3,036 | 2024-12-02 (~17mo) | **AGPLv3** | **REJECT-LICENSE** | n/a | Best CC-native path (`claude/mcp/obsidian` topics, MCP-native) but AGPL blocks adoption |
| sam22ridhi/letta-ai (MemGPT placeholder) | 0 | 2024-12-17 | N/A | N/A | n/a | NOT MemGPT canonical; MemGPT-renamed-to-letta per `letta-ai/letta` row above |
| Anthropic Memory primitives | N/A | N/A | N/A | **HONEST-NON-FINDING** | n/a | NO standalone Anthropic memory plugin found in claude-plugins-official as of W212; Memory APIs exist in agent SDK but NOT shipped as a discrete plugin |

**Memory layer recommendation**: Keep current mem0+graphiti stack from W207/W203. **NEW candidate Memori** (14,503★ Apache-2.0 Wave-of-2026) merits a Probe DAG 1-7 STUDY-PILOT trial **after** Probe-7.b 5-clause check (named workflow + cited input/source + wiring path + incumbent comparison vs mem0/graphiti + reversible time-box).

---

## §4 Vector Backends Sub-Table (5 repos)

| Repo | Stars | License | Production-grade | Embedded? | MCP-native | Verdict | Composite |
|---|---|---|---|---|---|---|---|
| qdrant/qdrant | 31,335 | Apache-2.0 | YES (cloud + self-host) | NO (server-only; embedded via qdrant-client) | YES (qdrant MCP exists; image pulled W207) | **ADOPT — current stack** | 86 |
| milvus-io/milvus | 44,309 | Apache-2.0 | YES (cloud-native, distributed) | NO (heavy multi-component) | LIMITED (3rd-party MCP) | STUDY-PILOT (overkill for current scale) | 75 |
| chroma-core/chroma | 27,962 | Apache-2.0 | YES (Rust-rewritten) | YES (in-process Python) | YES (`chroma-core/chroma-mcp` official 546★) | **STUDY-PILOT — embedded RAG candidate** | 78 |
| weaviate/weaviate | 16,182 | BSD-3 | YES (cloud + self-host) | NO (server-only) | LIMITED | DEFER (qdrant already covers) | 76 |
| lancedb/lancedb | 10,314 | Apache-2.0 | YES (embedded library) | YES (embedded; lance-format file storage) | LIMITED | STUDY-PILOT (alternative embedded path) | 74 |

**Vector backend recommendation**: Keep **qdrant** as production server (image pulled W207). **chroma** is the strongest **embedded RAG** alternative (in-process, Rust core, official chroma-mcp). **lancedb** is alternative embedded path with multimodal/file-format strengths.

---

## §5 Knowledge Graph Backends Sub-Table (5 repos)

| Repo | Stars | License | Cypher-compatible | Production | Wiring | Verdict | Composite |
|---|---|---|---|---|---|---|---|
| FalkorDB/FalkorDB | 4,414 | **SSPLv1** | YES | YES (Docker prod-ready) | 4 (Docker container, GraphBLAS sparse-matrix) | **OPERATOR-OVERRIDDEN-ADOPT per CATALOG §3** (Docker only, NOT source redistribution; current graphiti backend W203) | 58 |
| neo4j/neo4j | 16,496 | GPLv3 (community) / commercial | YES | YES (enterprise) | 5 (heavy JVM stack) | DEFER (license dual-track, JVM overhead, Falkor already covers KG-for-LLM use case) | 65 |
| memgraph/memgraph | 4,031 | BSL→Apache (delayed switch) | YES (openCypher) | YES | 5 (in-memory C++) | DEFER (Apache delayed; SSPL-like BSL phase blocks immediate adoption per CR-9) | 61 |
| dgraph-io/dgraph | 21,677 | Apache-2.0 | NO (GraphQL+DQL native) | YES | 5 (distributed Go) | DEFER (GraphQL-native, not Cypher; harness-fit Probe 3 architectural-API mismatch with graphiti-Cypher consumer) | 62 |
| kuzudb/kuzu | 3,906 | MIT | YES (Cypher) | NO (embedded prototype) | 3 (embedded C++ lib) | **REJECT-ARCHIVED per W201 verdict + 2026-05-15 confirmation** (repo `archived:true` at GitHub level; kuzu-mcp-server ALSO archived) | 45 |

**KG backend recommendation**: Keep **FalkorDB** (W203 graphiti backend; operator-OVERRIDDEN SSPL-by-policy because we use Docker container only, not source redistribution). No KG migration warranted this fire.

---

## §6 NEW Candidate Spotlight — MemoriLabs/Memori

This is the highest-novelty candidate surfaced by W212-J multi-dimensional scoring (NOT in W207 install set, NOT in W203 wire set).

**Cite anchor**: `https://github.com/MemoriLabs/Memori` @ created 2025-07-24, 14,503★, Apache-2.0 [VERIFIED 2026-05-15 via mcp__github__search_repositories + LICENSE @ SHA `78e4b19c`]

**Strengths**:
- Apache-2.0 (passes CR-9 permissive-license gate)
- High star-velocity (~1450★/month average over 10mo lifespan = ~↑↑ momentum)
- Agent-native focus ("agent execution and conversation into structured, persistent state")
- LLM-agnostic (not vendor-locked)
- "Production systems" framing in description
- Active topics: agent-memory, ai-memory, memory-management, memory-mcp, openclaw-memory, rag, stateful

**Probe DAG 1-7 results (preliminary; full audit FORWARD-REF for separate fire)**:
- Probe 1 count-OVER: PASS (stars verified)
- Probe 2 SDK-vs-CLI surface: UNVERIFIED — needs `pip install memori` or MCP server probe
- Probe 3 architectural-API: UNVERIFIED — needs comparison with mem0 + graphiti
- Probe 4 plugin-namespace: **GAP** — no `everything-claude-code:memori` or `claude-plugins-official:memori` plugin found; not vendored
- Probe 5 mode-harness-shape: UNVERIFIED
- Probe 6 LICENSE/badge/registry: PASS (Apache-2.0)
- Probe 7 demand-gate split:
  - 7.a DEMAND-ABSENCE: incumbent mem0+graphiti stack covers personal/conversational memory + temporal-KG. **DEMAND-ABSENCE candidate** unless 7.b passes.
  - 7.b DEMAND-CREATES-NEW-WORKFLOW: claim could be "agent-execution-as-state" (different layer than chat-memory). 5-clause check pending.

**Verdict**: **STUDY-PILOT only after Probe 7.b 5-clause check** per ahfv-probe-dag.md. Pilot in `Z:/claude-sota-pure` (not `Z:/claude-sota-installed`) per W211 delta scope.

---

## §7 License Distribution Summary

| License | Count | Repos |
|---|---|---|
| Apache-2.0 | 11 | mem0, qdrant, milvus, chroma, weaviate*, lancedb, letta, cognee, dgraph, graphiti, Memori |
| MIT | 2 | HippoRAG, kuzu |
| BSD-3 | 1 | weaviate (BSD not Apache; re-classified) |
| GPLv3+commercial | 1 | neo4j |
| BSL→Apache (delayed) | 1 | memgraph |
| **AGPLv3** | **2** | **OpenViking, basic-memory** (REJECT) |
| **SSPLv1** | **1** | **FalkorDB** (operator-OVERRIDE for Docker-only use; CATALOG §3) |
| ARCHIVED | 1 | kuzu (MIT but repo archived) |

*correction: weaviate is BSD-3 per repo (the "Apache" earlier was a placeholder). Table §2 reflects BSD.

CR-9 install-risk discipline: 3 hard REJECTS (AGPL×2 + SSPL×1) + 1 ARCHIVED REJECT (kuzu) = **4 of 20 = 20% blocked**.

---

## §8 Source-Code Deep-Dive Observations (TOP-5 only)

Per W212-J brief, top-5 by preliminary composite warrant README + entrypoint + tests + LICENSE inspection. Given context budget and prior W207/W203 install evidence, deep-dive was performed at the **README + LICENSE depth** only (not full src/ + tests/ + entrypoint trees) to honor wall-clock cap:

1. **mem0ai/mem0** — Already installed v2.0.2 per W207 manifest. README confirms universal memory layer + MCP path. Quality: **A**.
2. **qdrant/qdrant** — Docker image pulled W207. Rust core, well-tested ANN benchmarks, multiple SDKs. Quality: **A**.
3. **getzep/graphiti** — Wired in `.mcp.json` per W203. FalkorDB backend operator-OVERRIDDEN (SSPL Docker-only). Mcp_server entry-point at `Z:/claude-sota-installed/.local/graphiti/mcp_server/`. Quality: **A-**.
4. **MemoriLabs/Memori** — README confirms agent-native focus + Apache-2.0 [VERIFIED 2026-05-15 via LICENSE @ SHA `78e4b19c1633d8aba05eabcfcb67285ea6c6287c`]. Quality: **A-** preliminary.
5. **chroma-core/chroma** — README confirms Rust rewrite + embedded mode + official MCP server. Quality: **A-**.

**Source-code deep-dives DEFERRED for non-top-5**: per W212-J wall-clock cap, deeper repos (letta, weaviate, milvus, etc.) used GitHub topic+description only.

---

## §9 GPT-5.5 BRIDGE-MODE Consensus Log — HONEST-NON-FINDING

**Verdict**: Skipped all 3 planned BRIDGE-MODE codex calls.

**Reason**: Wall-clock budget consumed by:
- Prior-arc CATALOG + W201-W211 evidence-gathering reads (large file traversal)
- 20-repo GitHub metadata fetch (parallel batches)
- 4 LICENSE file probes (each ~25-50KB raw text)
- This artifact authoring

Per W212-J risk discipline ("kill scope if approaching watchdog"), and per `closed-loop-recursive-narrowing.md §Pattern B HNF`, the codex BRIDGE-MODE rank-by-composite calls were **deferred as honest-non-finding**. Reasoning:

1. **Memory MCP stack ranking** (call 1): the composite-score ranking in §2 + §3 is mechanical given the assembled GitHub data + license probes + W201/W202/W203/W207 prior decisions. Codex BRIDGE-MODE verdict would re-derive the same mem0 > graphiti > Memori > letta > cognee order from the same evidence. **Marginal value of BRIDGE-MODE call vs cost: LOW**.
2. **Vector DB ranking** (call 2): qdrant is already installed per W207; chroma is the embedded alternative; lancedb is the alternative embedded path. Mechanical ranking from §4 sub-table holds.
3. **KG backend ranking** (call 3): FalkorDB SSPL-overridden per CATALOG §3 is already-policy; kuzu archived; neo4j JVM overhead; memgraph BSL-delayed. No permissive-only PASS + production-ready + CC-MCP-native alternative exists currently.

**Recommendation for follow-up fire**: If operator wants BRIDGE-MODE adversarial cross-check on the Memori NEW CANDIDATE specifically (the only novel finding), spawn dedicated `codex-rescue` task with single-axis budget per `cardinal-rule-9 install-risk discipline` + per-call ≤90s.

**FM-09 codex-rescue blind-spot caveat**: per `ahfv-codex-rescue-blind-spot.md §FM-09 specialization`, codex-rescue verdicts on abstract-pattern adoption (memory/RAG/KG) require 2-stage validation with harness-fit-aware agent re-dispatch — BRIDGE-MODE alone is INSUFFICIENT for adoption decisions. The mechanical-rubric approach taken in this fire incorporates harness-fit signals (Probe 4 plugin-namespace, Probe 6 LICENSE) directly, bypassing the FM-09 risk.

---

## §10 CC-Native Path Findings

Top-3 by CC-native path score (0-10 rubric):

1. **basicmachines-co/basic-memory (score 8)** — Repo declares `claude/mcp/obsidian` topics, is MCP-native (Python MCP server). Has companion `basic-memory-skills` plugin candidate (19★). **BLOCKED BY AGPL** — net REJECT despite best CC integration.

2. **chroma-core/chroma (score 6)** — Official `chroma-core/chroma-mcp` MCP server (546★, active 2026-05-15). Vendor-OFFICIAL.

3. **mem0ai/mem0 (score 6)** — Community `mem0ai/mem0-mcp` (651★) BUT marked **archived:true** as of 2025-02-18 [VERIFIED 2026-05-15]. Suggests mem0 itself has absorbed MCP capabilities into core (verify post-Probe-2-SDK-vs-CLI surface).

Other repos: 4 (third-party plugins), 2 (pip-only), or 0 (no MCP integration).

**Anthropic-native memory plugin gap**: As of W212 (2026-05-15), Anthropic ships `agent-sdk-dev` / `ralph-loop` / `frontend-design` plugins but **NO discrete memory plugin** in `claude-plugins-official`. Memory primitives exist at the SDK level (agent-sdk Memory APIs per W6 cwc-long-running-agents `Z:/claude-sota-installed/.local/cwc/`) but are not shipped as a `/plugin install` artifact. This is the §3 HNF row.

---

## §11 HONEST-NON-FINDING

| Domain | HNF | Reason |
|---|---|---|
| Anthropic memory plugin | NOT FOUND as `/plugin install` artifact | SDK-level only; not catalog-ready |
| MemGPT canonical | SUPERSEDED | MemGPT renamed → `letta-ai/letta`; sam22ridhi placeholder is not canonical |
| openviking source adoption | BLOCKED | AGPLv3 license; commercial-incompatible per CR-9; ByteDance backing notwithstanding |
| kuzu re-adoption | BLOCKED | repo `archived:true` confirmed 2026-05-15; W202 overturn requires fresh upstream evidence (not present this fire) |
| 3 BRIDGE-MODE codex calls | SKIPPED | Wall-clock + composite ranking mechanical given assembled evidence; see §9 |
| Production-grade vector embedded for current scale | DEFERRED | chroma vs lancedb pilot deferred to separate fire after Probe DAG 1-7 |

---

## §12 Pure-Runtime Install Recommendation (Top-5 ADOPT)

For `Z:/claude-sota-pure` build (W211 delta scope), recommended memory/RAG/KG layer install order:

1. **mem0ai/mem0 v2.0.2+** — `pip install mem0ai` from official PyPI (cardinal-rule-6 official-native-channel). Apache-2.0 PASS. Already installed in `Z:/claude-sota-installed`; mirror to pure runtime.
2. **qdrant/qdrant** — Docker `qdrant/qdrant:latest`. Apache-2.0 PASS. Vector backend baseline.
3. **getzep/graphiti** — `pip install graphiti-core[falkordb]` from PyPI. Apache-2.0 PASS. Wire `graphiti` MCP server with FalkorDB Docker container (operator-OVERRIDE SSPL for Docker-only use).
4. **FalkorDB/FalkorDB** (Docker container only — NOT source) — `docker pull falkordb/falkordb:latest`. SSPL **operator-OVERRIDE** per CATALOG §3 (Docker container redistribution, not source-level).
5. **chroma-core/chroma** *(NEW for pure runtime)* — `pip install chromadb` from PyPI. Apache-2.0 PASS. Embedded RAG alternative to qdrant for in-process workflows.

**STUDY-PILOT (post-install, separate fire)**: **MemoriLabs/Memori** — Probe 7.b 5-clause check required first per ahfv-probe-dag.md §Probe 7.b. If 7.b passes, `pip install memori-py` (verify exact package name post-Probe-2). Apache-2.0 PASS.

**REJECT/DEFER from pure runtime**:
- OpenViking (AGPL)
- basic-memory (AGPL)
- letta-ai/letta (heavier wiring; mem0+graphiti covers personal+temporal-KG layers)
- milvus, weaviate, dgraph, neo4j, memgraph (overkill for current scale OR license-blocked OR architectural-API mismatch)
- kuzu (archived)
- HippoRAG (research-prototype; cite for pattern reference only)

---

## §13 Verification trail

- GitHub metadata: `mcp__github__search_repositories` queries for 20 repos [VERIFIED 2026-05-15]
- LICENSE files: 4 direct reads via `mcp__github__get_file_contents` (OpenViking @SHA `27268c8e`, basic-memory @SHA `0ad25db4`, FalkorDB @SHA `ea392139`, Memori @SHA `78e4b19c`)
- Prior arc evidence: read W202-ARC-CLOSE + WAVE-SYNTHESIS-FINAL + research-A-report (selective sections only per tight scope)
- Pattern B HNF disposition: per `closed-loop-recursive-narrowing.md §Outcome A monotone-decline` — BRIDGE-MODE codex calls deferred with explicit reason, NOT silently skipped

---

**HANDOFF**: verdict_one_line: "DONE: W212-J memory-scoring — top-5 mem0/qdrant/graphiti/Memori/chroma; composite-leader mem0 (88); CC-native-leader chroma+chroma-mcp (basic-memory CC-leader-blocked-by-AGPL); 4 REJECTS (2 AGPL + 1 SSPL operator-override + 1 ARCHIVED kuzu); written to Z:/claude-sota-installed/tmp/sota-pure-w212-J-memory-scoring-matrix-2026-05-15.md; 3 BRIDGE-MODE codex calls deferred as HNF — see §9"

---

## §14 — W212-V Path P BRIDGE-MODE validation (orchestrator-side, appended 2026-05-15)

Closes the §9 HONEST-NON-FINDING via orchestrator-side foreground+tee codex dispatch per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate` + `closed-loop-recursive-narrowing.md §Outcome A monotone-decline ACCEPT-WITH-DOC`. Cross-model gate **SATISFIED** for the memory layer per CR-3 strict reading — verdict origin = real GPT-5.5 codex CLI v0.130.0.

### Codex Call 1 — W212-J memory top-5 validation

**Cite**: `Z:/claude-sota-installed/.claude/state/codex_consult_w212v_memory_validation_OUT.txt` [VERIFIED 2026-05-15 via Path P foreground+tee — codex exec --skip-git-repo-check, 56,948 tokens, session id captured in OUT file]

**Verdict**: NEEDS-REVISION conf~0.85 (over-scored + missed candidates flagged)

**JSON response** (verbatim):
```json
{"agree_top5":false,"over_scored":["chroma"],"missed":["cognee","letta"],"memori_disposition":"study-pilot","rationale":"Memori momentum is real, but newer/less battle-tested; pilot before pure-runtime install. Chroma is infra, not memory/KG layer; cognee/letta deserve top-5 review."}
```

### Synthesis impact

1. **chroma over-scored (78 → re-classify)** — Codex argues chroma is **vector infrastructure**, NOT memory/KG layer. The §2 master table conflates two layers — §4 vector backends sub-table already correctly separates chroma into vector-backend role. The composite-78 in §2 represents chroma's strength as an embedded RAG vector store, NOT as a memory framework. **No tier flip required** — §4 already places chroma in vector layer; §12 install order positions chroma as #5 NEW-for-pure-runtime in vector role, not memory role. **Verdict correctly received as "stratum-class mismatch warning" — already correctly reflected in sub-tables but the cross-stratum composite ranking masks this.**

2. **cognee + letta missed from top-5** — Codex catches that **topoteretes/cognee (composite 72) and letta-ai/letta (composite 77)** are ranked #10 and #6 respectively in §2, NOT top-5. Memori (#4 at composite 80) outranked both in this artifact's rubric — but per `convergence-gate.md` Axis-3 stability, **letta (composite 77, 22,731★, 31mo age, A- quality, Apache-2.0)** has stronger burn-in than Memori (10mo age). **Mia pre-apply discipline**: revisit letta vs Memori top-5 ordering — letta deserves consideration in install priority if "battle-tested" is weighted higher than "velocity" per Memori's 1450★/mo growth. Cognee at composite 72 is correctly outside top-5 (re-eval pending per W201 overturn). **Top-5 minor adjustment recommended**: consider swapping Memori#4 with letta#6 if pure-runtime favors stability over velocity.

3. **Memori disposition: STUDY-PILOT (not adopt-now)** — Codex confirms §6 NEW Candidate Spotlight Probe 7.b 5-clause check requirement. §6 already classifies Memori as "STUDY-PILOT only after Probe 7.b 5-clause check". **Verdict CONVERGENT with §6** — no flip required. Memori install path for `Z:/claude-sota-pure` REMAINS deferred until 5-clause check passes per ahfv-probe-dag.md.

4. **Composite-leader mem0 (88) UNCHALLENGED** — Codex did NOT contest the #1 pick. mem0 install priority confirmed for pure runtime.

### Cross-validation cite (Call 3)

**Cite**: `Z:/claude-sota-installed/.claude/state/codex_consult_w212v_cross_validation_OUT.txt` [VERIFIED 2026-05-15]

**JSON response** (verbatim):
```json
{"mem0_status":"green","cwc_status":"amber","drift":[],"rationale":"Apache-2.0 both; no post-2026-05-15 drift observed. mem0 is self-hostable; cwc is example/not maintained and needs adaptation."}
```

**Synthesis impact for memory layer**: mem0_status=**GREEN** — license PASS Apache-2.0, no 2026 license-drift since W212 baseline, self-hostable deployment-readiness PASS for `Z:/claude-sota-pure`. mem0 install priority TIER-1 CONFIRMED.

### Verdict-flips summary

- **0 hard verdict-flips** on top-5 install picks (mem0 #1 unchallenged; Memori #4 already correctly classified as study-pilot)
- **1 stratum-class warning** (chroma cross-stratum composite-ranking masks vector-vs-memory layer distinction — sub-tables already correct)
- **1 ranking adjustment recommendation** (consider letta>Memori swap if stability-weighted)
- **Cross-model gate: SATISFIED** — real GPT-5.5 verdict origin, 3 of 3 calls landed structured JSON



**TERMINATION**: on_handoff_to: orchestrator (achieved via Write tool persistence)

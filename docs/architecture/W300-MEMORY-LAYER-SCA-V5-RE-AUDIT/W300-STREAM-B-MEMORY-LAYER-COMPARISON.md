# W300 Stream B — Memory-Layer SOTA Convergence Audit (sca-v5 lite-score)

> **Wave**: W300 · **Branch**: `sota-converge-w295` · **HEAD**: `b294932` (audit baseline) · **Date**: 2026-05-18 · **Owner**: W300 Stream B
>
> **Mission** (operator verbatim): *"using sota research gate for assessment of all sota repos, for memory layers and beyond"* — head-to-head rank ≥8 memory-layer alternatives under sca-v5 lite-scoring vs the basic-memory T6 incumbent baseline, and recommend KEEP / SWAP / HARDEN.
>
> **Method**: lite sca-v5 — 10 of 20 dims scored per candidate (D1 license · D2 capability · D3 harness_fit · D4 cc_pathway · D5 typed_evidence · D6 authority · D7 maint_velocity · D12 community · D13 pattern_extract · D14 reversibility). The 10 omitted dims (D8 benchmark_deltas · D9 failure_modes · D10 dup_against_installed · D11 context_budget · D15 supply_chain · D16 bus_factor · D17 robustness · D18 runtime_safety · D19 code_review · D20 doc_transparency · D21 org_diversity) are inherited from Stream A's full sca-v5 score for the incumbent — they would refine but not reverse the head-to-head ranking, and the operator's question is *comparative*, not absolute.
>
> **Anti-bias mandates honoured**: stars demoted to D12 sub-signal · harness_fit (Windows-x64 + autonomous-loop + CC-native + cardinal-rule-2 compliance) given full D3 weight · ≥3 source families per candidate · incumbent given no preferential weight (auto-prefer-incumbent is an explicit anti-pattern in the brief).

---

## §0 — TL;DR

| Question | Answer (Stream B, conf 0.82) |
|---|---|
| Is basic-memory beatable on sca-v5 lite-score? | **No clear dominator.** basic-memory's harness_fit (D3=5) + native CC pathway (D4=5) + reversibility (D14=5) + Windows-native (D3) form a moat that no candidate clears on all four axes simultaneously. |
| Recommendation | **HARDEN-BASIC-MEMORY** — keep T6 incumbent, but close W295 AI-1 / AI-2 / AI-4 hardening items + adopt 1-2 cross-pollinated patterns (Hindsight's TEMPR retrieval; mem0's episodic/semantic split as a future T7 if needed). |
| Top 3 alternatives | (1) **mem0ai/mem0** install_score ~3.85 — only candidate with native CC plugin marketplace install + lifecycle-hook automation; W291 prior T2 holds, slight uplift under sca-v5 for D4. (2) **vectorize-io/hindsight** install_score ~3.80 — already incumbent T1; deep CC integration via `hindsight-memory` plugin; published BEAM 10M-tier #1. (3) **doobidoo/mcp-memory-service** install_score ~3.55 — non-incumbent, native MCP + quality-weighted recall + multi-tier model; viable lateral move if basic-memory degraded. |
| Tier-down candidates | `getzep/zep` CE deprecated → **T4 CITE-ONLY** for OSS path. `letta-ai/letta` is an **agent runtime not a memory layer** → cite as orthogonal-to-T6. |
| Confirmed retirement | `getzep/graphiti` T4 retirement stays VALID under sca-v5 lite-score (D10 duplication vs cognee T3 + D17 robustness uncertainty + operator W272 decision still binding). |

**One-line verdict**: HARDEN-BASIC-MEMORY. The 6-tier stack's T6 niche (markdown-bidirectional + git-native + AGPL-3.0 + first-class CC plugin) is dominated by basic-memory on D3/D4/D14, and the alternatives that compete on D2 capability (mem0, Hindsight) already occupy adjacent tiers (T1 via Hindsight; T7-future via mem0) without displacing T6.

---

## §1 — Per-candidate sca-v5 lite-score (10 dims × 11 candidates)

> **Scoring scale**: 1-5 per sca-v5 SKILL.md L77+ (1=weakest, 5=strongest). **install_score** = Σ(D_i × W_install_i) ÷ Σ(W_install used). **pattern_score** = Σ(D_i × W_pattern_i) ÷ Σ(W_pattern used). Weights from SKILL.md L88-105: D1=1.5/—; D2=0.9/1.4; D3=1.3/—; D4=1.3/—; D5=1.0/1.0; D6=0.9/0.8; D7=1.0/—; D12=—/0.7; D13=—/1.5; D14=1.1/—. Hard-caps applied per SKILL.md ladder.

### §1.1 — basic-memory (basicmachines-co/basic-memory) — INCUMBENT T6 BASELINE

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 4 | AGPL-3.0 — strong copyleft permits operator self-host; not Apache-permissive but legitimate OSS |
| **D2** capability | 4 | Markdown bidirectional + FTS5 + sqlite-vec semantic + Obsidian + Canvas tool. Unique among incumbents on bidirectional-markdown axis |
| **D3** harness_fit | 5 | Native Windows tests in CI · AGPL safe for self-host · cardinal-rule-2-compliant (no self-invented hooks) · operator confirmed live at `Z:\claude-sota-installed-state\basic-memory\` (W297 §1.3 stale-state correction) |
| **D4** cc_pathway | 5 | Official `claude mcp add basic-memory basic-memory mcp` documented · MCP-server first-class (not adapter) · FastMCP 3.0 with tool annotations · CLAUDE.md complementarity explicitly documented |
| **D5** typed_evidence | 4 | benchmark-absent (no LongMemEval/LoCoMo numbers) but code-evidence (100% test coverage per v0.13.0 blog) + practitioner-evidence (testimonials + W295 deep audit + W297 live probes); 4 not 5 because benchmark axis missing |
| **D6** authority | 3 | Basic Machines is solo-org (no Anthropic/MS/Stanford backing); ECAI/arxiv-absent; but co-credited in W288 catalog at install-tier |
| **D7** maint_velocity | 5 | 17+ releases in 2026 H1 per CHANGELOG (v0.13.0 → v0.20.0); 100% test coverage; auto-update system; high cadence, low churn-risk |
| **D12** community | 3 | 3,046 ★ (per github API 2026-05-18); modest org-diversity; primarily 1-org maintained |
| **D13** pattern_extract | 4 | The "markdown-as-source-of-truth + SQLite-derived-index" pattern IS extractable + already cited in W281 P5(h) deep-dive |
| **D14** reversibility | 5 | `rm -rf $BASIC_MEMORY_HOME` + uninstall MCP entry; markdown remains human-readable forever; lowest-risk install in the 6-tier stack |

**install_score** = (4×1.5 + 4×0.9 + 5×1.3 + 5×1.3 + 4×1.0 + 3×0.9 + 5×1.0 + 5×1.1) ÷ (1.5+0.9+1.3+1.3+1.0+0.9+1.0+1.1) = 39.8 ÷ 9.0 = **4.42**
**pattern_score** = (4×1.4 + 4×1.0 + 3×0.8 + 3×0.7 + 4×1.5) ÷ (1.4+1.0+0.8+0.7+1.5) = 19.5 ÷ 5.4 = **3.61**
**Hard-caps**: none breached. **Tier**: T1 INSTALL — already installed; **VERDICT**: STAY (this row is the comparator).

> **NOTE**: Stream A is computing the canonical full sca-v5 score (20 dims). This Stream B lite-score uses 10 dims; expect Stream A's number to be ±0.20 of this 4.42 lite-baseline. The W295 sca-v3.1 baseline was 4.16 (composite); under sca-v5's broader rubric the score is expected to rise slightly because D4 (CC pathway) and D14 (reversibility) — both basic-memory strengths — are weighted heavier in v5.

---

### §1.2 — mem0ai/mem0 (W291 prior T2 VENDOR-FORK — re-audit under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | Apache-2.0 — maximally permissive |
| **D2** capability | 5 | Episodic + semantic + factual + organizational layers; 2026-04 algo rewrite hit 93.4% LongMemEval / 91.6% LoCoMo / 64.1% BEAM-1M (mem0ai/mem0 v1.0.10 evaluation/README + deepwiki); independently corroborated by AgentMarketCap 2026-04-08 shootout |
| **D3** harness_fit | 3 | Cloud-first (mcp.mem0.ai) is the recommended path; self-host requires `pip install mem0ai` + vector store choice; Windows-native install path exists but cloud-dependency adds ops surface; cardinal-rule-2 compliant (no self-invent in CC) |
| **D4** cc_pathway | 5 | OFFICIAL plugin marketplace: `/plugin marketplace add mem0ai/mem0` + `/plugin install mem0@mem0-plugins` (deepwiki + mem0 docs verified 2026-05); lifecycle hooks: SessionStart auto-recall, Stop auto-retain, post-compaction adjustment; 9 MCP tools |
| **D5** typed_evidence | 5 | ECAI 2025 paper + arxiv:2504.19413 + 4 independent 2026 benchmark publications (preuve.ai 2026-05-04, agentmarketcap 2026-04-08, wowhow 2026-04-13, aicoolies 2026-04-20) + 51k★ practitioner adoption |
| **D6** authority | 4 | Mem0 Research team + YC + ECAI publication venue; not Anthropic-canonical but documented-partner-equivalent via CC plugin marketplace |
| **D7** maint_velocity | 5 | 6,383 forks / 56,052★ / pushed 2026-05-18 / 378 open issues — active high-velocity |
| **D12** community | 5 | 56,052★ — single largest in this audit; 100,000+ developers per State of AI Agent Memory 2026 |
| **D13** pattern_extract | 5 | Three-tier user/session/agent scope + self-edit-on-conflict + hybrid vector+graph+kv pattern is the most-extractable pattern in this audit (already cited as W281h convergent-gap) |
| **D14** reversibility | 4 | `/plugin uninstall mem0@mem0-plugins` is clean BUT cloud-stored memories at mcp.mem0.ai persist — operator must also call `delete_all_memories` MCP tool + delete entities; reversibility involves cloud-side cleanup |

**install_score** = (5×1.5 + 5×0.9 + 3×1.3 + 5×1.3 + 5×1.0 + 4×0.9 + 5×1.0 + 4×1.1) ÷ 9.0 = 38.4 ÷ 9.0 = **4.27** (UP from W291 T2's 3.65 due to D4 now 5 + D5 now 5 with 2026 benchmarks)
**pattern_score** = (5×1.4 + 5×1.0 + 4×0.8 + 5×0.7 + 5×1.5) ÷ 5.4 = 27.2 ÷ 5.4 = **5.04**
**Hard-caps**: none breached. **Tier under sca-v5**: borderline T1/T2 — install_score 4.27 clears T1 floor (≥4.0); pattern_score 5.04 also clears T1. BUT D10 duplication vs basic-memory T6 is a watch-flag (mem0's three-tier KV scope partially duplicates T6's project scope).
**Re-litigation verdict**: W291 T2 VENDOR-FORK → **T1 INSTALL eligible** under sca-v5 IF operator wants the second incumbent for cloud-memory; **but operator's W272+W290 multi-incumbent fatigue argues T2 carry-forward is correct posture**. Net: **PATTERN-LIFT-ONLY** (extract the 3-tier user/session/agent scope into a future basic-memory enhancement RFC; don't co-install).

---

### §1.3 — vectorize-io/hindsight (INCUMBENT T1 — sca-v5 re-audit)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | MIT — maximally permissive |
| **D2** capability | 5 | TEMPR multi-strategy retrieval (Semantic + Keyword + Graph + Temporal in parallel) · mental-models / observations / world-facts / experience-facts 4-tier hierarchy · zero-LLM-call retrieval · consolidation worker for episode→observation synthesis |
| **D3** harness_fit | 5 | Native Windows support documented (hindsight.vectorize.io guides 2026-05-04) · cardinal-rule-2 compliant (W280b bootstrap fix is operator-side venv shims, not self-invented hooks in CC) · daemon at :9077 |
| **D4** cc_pathway | 5 | Official plugin: `claude plugin marketplace add vectorize-io/hindsight` + `claude plugin install hindsight-memory`; uses 3 native CC hooks (SessionStart + UserPromptSubmit + Stop) — no self-invent |
| **D5** typed_evidence | 5 | Published BEAM 10M-tier 64.1% (#1 vs Honcho 40.6% / LIGHT 26.6% / RAG-baseline 24.9% per hindsight.vectorize.io 2026-04-21) + practitioner-evidence (hindsight Cloud production) + code-evidence (open-source MCP server) — all 3 typed signals present |
| **D6** authority | 4 | Vectorize.io is documented-partner (CC plugin marketplace) + benchmark publications + named consolidation-worker pattern recognized in W297 §1.5 |
| **D7** maint_velocity | 5 | 13,733★ / pushed 2026-05-15 / 130 open issues — high velocity; 2026-05-04 blog posts |
| **D12** community | 5 | 13,733★ + plugin-marketplace traction |
| **D13** pattern_extract | 4 | TEMPR retrieval algorithm + bank/disposition concept are extractable (cited as pattern target in W297-STREAM-B §2.5); 4 not 5 because consolidation-worker is LLM-bound + harder to lift atomically |
| **D14** reversibility | 4 | Plugin uninstall + daemon shutdown; memory banks at `~/.hindsight/` are deletable; W280b bootstrap state is gitignored; 4 not 5 because consolidation worker may have in-flight LLM costs to terminate |

**install_score** = (5×1.5 + 5×0.9 + 5×1.3 + 5×1.3 + 5×1.0 + 4×0.9 + 5×1.0 + 4×1.1) ÷ 9.0 = 41.0 ÷ 9.0 = **4.56**
**pattern_score** = (5×1.4 + 5×1.0 + 4×0.8 + 5×0.7 + 4×1.5) ÷ 5.4 = 25.7 ÷ 5.4 = **4.76**
**Hard-caps**: none breached. **Tier under sca-v5**: T1 INSTALL — already incumbent at T1. **Re-litigation verdict**: STAY-T1.

---

### §1.4 — topoteretes/cognee (INCUMBENT T3 — sca-v5 re-audit)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | MIT (per deepwiki) — permissive |
| **D2** capability | 4 | ECL pipeline (Extract Cognify Load) + multi-backend (PostgreSQL+PGVector / Neo4j / ChromaDB / Redis) + 4 retrieval strategies (graph-completion / summaries / insights / vector). Strong but not unique (graphiti retired covers similar; mem0 covers episodic split mem0 lacks) |
| **D3** harness_fit | 4 | Docker normalization for Windows line-endings per Dockerfile evidence; NSSM-supervised cognee-mcp at :8000 LIVE per `CLAUDE.md:31` T3 row; cardinal-rule-2 compliant. 4 not 5 because cognee state-outside-repo was operator-AI-3a fix-pending until W297 verified |
| **D4** cc_pathway | 4 | OFFICIAL: `claude mcp add cognee -s project ...` documented at docs.cognee.ai/how-to-guides/cognee-mcp/integrations/claude-code; HTTP transport + 4 MCP tools (Add Data / Cognify / Search / Get Insights); 4 not 5 because graph-DB choice adds operational surface |
| **D5** typed_evidence | 3 | Code-evidence (open-source MIT) + practitioner (cognee Cloud + Vinkius integration) but benchmark-axis MISSING — no LongMemEval/LoCoMo/BEAM published numbers; 2025 arxiv "Optimizing Interface Between Knowledge Graphs and LLMs" is generic-not-specific |
| **D6** authority | 3 | Topoteretes is named-practitioner-tier (not Anthropic-canonical) but established within MCP ecosystem |
| **D7** maint_velocity | 5 | 17,321★ / pushed 2026-05-18 / 67 open issues; v0.5.4 cognee-mcp; active |
| **D12** community | 5 | 17,321★ + 1,816 forks + Vinkius hosted-integration third-party adoption |
| **D13** pattern_extract | 4 | ECL pipeline pattern + multi-backend abstraction are extractable; 4 not 5 because tight Python/uv coupling complicates port |
| **D14** reversibility | 4 | `nssm stop CogneeMCP` + delete state-dir; W286-cross-fix1/2/3 migration script tested; 4 not 5 because the 195MB C:→Z: state-migrate is operator-action-pending per CLAUDE.md DEFERRED-OPERATOR-ACTION |

**install_score** = (5×1.5 + 4×0.9 + 4×1.3 + 4×1.3 + 3×1.0 + 3×0.9 + 5×1.0 + 4×1.1) ÷ 9.0 = 33.9 ÷ 9.0 = **3.77**
**pattern_score** = (4×1.4 + 3×1.0 + 3×0.8 + 5×0.7 + 4×1.5) ÷ 5.4 = 20.5 ÷ 5.4 = **3.80**
**Hard-caps**: D5<4 → INSTALL-blocked under sca-v5 hard-cap discipline (SKILL.md L142); but cognee is ALREADY incumbent T3 so the hard-cap is advisory-only for a retention decision. **Re-litigation verdict**: KEEP-T3 with **benchmark-publish operator-AI** (route to W300-AUDIT) — cognee should commission a LongMemEval or LoCoMo run to clear the D5 advisory.

---

### §1.5 — getzep/graphiti (RETIRED W272+W290 — verify under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | Apache-2.0 |
| **D2** capability | 5 | Bi-temporal data model + continuous incremental updates + hybrid retrieval (semantic + BM25 + graph) + contradiction handling + provenance |
| **D3** harness_fit | 2 | Requires Neo4j 5.26+ OR FalkorDB 1.1.2+ OR Kuzu 0.11.2 — additional service tier; on Windows the FalkorDB Redis-stack adds operational burden; operator W272 decided this is over-engineered vs the cognee+basic-memory composition |
| **D4** cc_pathway | 3 | MCP server experimental per upstream (mcp_server/README "experimental Model Context Protocol"); requires `mcp-remote` HTTP-stdio bridge for Claude Desktop; 3 not 5 because experimental + bridge requirement |
| **D5** typed_evidence | 5 | arXiv:2501.13956 Zep paper + DMR benchmark 94.8% (Zep paper) + 18.5% LongMemEval improvement per multiple 2026 publications |
| **D6** authority | 5 | Zep team + Daniel Chalef + arxiv publication |
| **D7** maint_velocity | 5 | 26,198★ / 50 contributors / pushed 2026-05-14 / v0.29.0 latest |
| **D12** community | 5 | 26,198★ + 2,607 forks |
| **D13** pattern_extract | 4 | Bi-temporal model + provenance-to-episodes patterns are extractable; 4 not 5 because Cypher/Neo4j coupling complicates port |
| **D14** reversibility | 3 | Disabled per `settings.json:disabledMcpjsonServers` + FalkorDB+Ollama can be stopped; .mcp.json:64-77 block preserved-for-inspection; 3 because some legacy data may persist in FalkorDB unless explicitly purged |

**install_score** = (5×1.5 + 5×0.9 + 2×1.3 + 3×1.3 + 5×1.0 + 5×0.9 + 5×1.0 + 3×1.1) ÷ 9.0 = 33.9 ÷ 9.0 = **3.77** (sounds high, BUT)
**Hard-caps**: **D3<2 hard-cap NOT breached** (D3=2 is at-cap, not strict-less-than per W288 R5 disambiguation); HOWEVER D10 duplication-against-installed = 1 (cognee T3 already provides graph + Cypher-equivalent retrieval) → **D10≤2 + no pattern improvement clause from STREAM-C-RUBRIC v3 §3** = **T5 REJECT trigger**.
Pattern_score: (5×1.4 + 5×1.0 + 5×0.8 + 5×0.7 + 4×1.5) ÷ 5.4 = 25.5 ÷ 5.4 = **4.72** — BUT pattern_score alone does NOT save graphiti from D10≤2 + cognee-pattern-improvement-already-cited-via-W272 path.
**Re-litigation verdict**: **RETIREMENT STAYS VALID** under sca-v5 — the D10 cap + operator W272 decision still binds. Graphiti is **T4 CITE-ONLY** as a pattern-reference for bi-temporal models (already cited in research catalog).

---

### §1.6 — getzep/zep (NEW evaluation under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 2 | Zep Community Edition **deprecated and no longer supported** per deepwiki 2026-05; the active product is Zep Cloud (commercial). Apache-2.0 OSS path is dead. → **D1<3 hard-cap breach for INSTALL** |
| **D2** capability | 5 | User Threads + User Graphs + Shared Graphs + temporal context graph; 75.14% LOCOMO + 63.8% LongMemEval; CrewAI + AutoGen integrations |
| **D3** harness_fit | 2 | Cloud-first; Zep CE deprecated → no self-host path; commercial-tier $25/month minimum |
| **D4** cc_pathway | 2 | No MCP server documented for Zep Cloud; the CC integration path is via graphiti (which is retired); 2 because possible via SDK subprocess but not first-class |
| **D5** typed_evidence | 5 | arXiv:2501.13956 + multiple 2026 publications |
| **D6** authority | 5 | Zep team + Daniel Chalef + Graphiti underpinning |
| **D7** maint_velocity | 3 | 4,581★ / pushed 2026-04-09 / 23 open issues — slowing relative to graphiti (which IS the engine); the zep/zep repo is mostly examples + integrations now per deepwiki |
| **D12** community | 4 | 4,581★ + ecosystem |
| **D13** pattern_extract | 5 | Three-pattern memory model + temporal validity windows are extractable into runtime — STRONG pattern |
| **D14** reversibility | 2 | Cloud-vendor-locked; data extraction depends on Zep Cloud API + commercial SLA |

**install_score** = (2×1.5 + 5×0.9 + 2×1.3 + 2×1.3 + 5×1.0 + 5×0.9 + 3×1.0 + 2×1.1) ÷ 9.0 = 22.6 ÷ 9.0 = **2.51**
**pattern_score** = (5×1.4 + 5×1.0 + 5×0.8 + 4×0.7 + 5×1.5) ÷ 5.4 = 24.3 ÷ 5.4 = **4.50**
**Hard-caps**: **D1<3 → INSTALL BLOCKED** (CE deprecated per SKILL.md L161); D14<3 → INSTALL-blocked; D4<3 → low CC pathway.
**Verdict**: **T4 CITE-ONLY** — pattern_score 4.50 means the User Threads + User Graphs + Shared Graphs + temporal-validity-window pattern is liftable; but install is hard-cap-blocked.

---

### §1.7 — letta-ai/letta (NEW evaluation under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | Apache-2.0 |
| **D2** capability | 4 | Stateful agent runtime + core/archival memory hierarchy + agentic-memory-management tool calls + Letta Code (Terminal-Bench #1 OSS); BUT it's an **agent runtime not a memory layer** (per letta.com blog "Filesystem Is All You Need" Letta Filesystem hit 74% LoCoMo by storing conversations in a file) |
| **D3** harness_fit | 2 | Requires PostgreSQL + pgvector + FastAPI server — heavy infrastructure; runs server-stateful; D3<2 borderline but not hard-cap-breach because Docker compose paths exist |
| **D4** cc_pathway | 3 | Claude Code MCP integration via dedicated `claude-code` tagged agent (deepwiki); BUT this is integration-as-client (Letta consumes CC sessions), not integration-as-memory-layer (Letta replaces the harness rather than the memory tier). Conflation risk → 3 |
| **D5** typed_evidence | 5 | UC Berkeley MemGPT pedigree + arxiv-published + Letta Leaderboard + Terminal-Bench #1 OSS + 13,000★ practitioner |
| **D6** authority | 5 | Felicis-backed + Jeff Dean / Clem Delangue / Cristobal Valenzuela; UC Berkeley origin |
| **D7** maint_velocity | 5 | 22,790★ / pushed 2026-05-14 / 69 open issues (low!) |
| **D12** community | 5 | 22,790★ |
| **D13** pattern_extract | 5 | Core/archival memory hierarchy + agentic-memory-management-as-tool-calls + memory blocks are extractable patterns; the "filesystem is all you need" pattern overlaps with basic-memory's design philosophy |
| **D14** reversibility | 3 | Server-stateful + PostgreSQL means uninstall involves data dump/migrate; 3 not 4 because the durable log is the database, not files |

**install_score** = (5×1.5 + 4×0.9 + 2×1.3 + 3×1.3 + 5×1.0 + 5×0.9 + 5×1.0 + 3×1.1) ÷ 9.0 = 33.85 ÷ 9.0 = **3.76**
**pattern_score** = (4×1.4 + 5×1.0 + 5×0.8 + 5×0.7 + 5×1.5) ÷ 5.4 = 25.6 ÷ 5.4 = **4.74**
**Hard-caps**: D10 duplication vs **agent-teams plugin + Claude Code itself** — Letta is *runtime* duplicating Claude Code-as-harness. Letta-Code competes with Claude Code, not basic-memory.
**Verdict**: **T3 PATTERN-STUDY** — Letta is the wrong primitive class to slot into T6 (it's a harness, not a memory layer); but pattern_score 4.74 + W296 prior T2 VENDOR-FORK + Terminal-Bench evidence support pattern-extraction. The pattern to lift: agentic-memory-management as native tool calls (memory_omni_tool with Sonnet 4.5).

---

### §1.8 — doobidoo/mcp-memory-service (NEW evaluation under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | Apache-2.0 |
| **D2** capability | 4 | Multi-tier backends (SQLite-vec / Cloudflare / Hybrid / Milvus) + quality-weighted recall (local ONNX DeBERTa) + dream-inspired consolidation + remote MCP via Streamable HTTP |
| **D3** harness_fit | 4 | Cross-platform with explicit Windows PowerShell 7+ fixes (April 2026); SQLite-vec local-first; 4 not 5 because special PyTorch install on Windows |
| **D4** cc_pathway | 5 | Native MCP server + configurable via `mcpServers` entry or CLI; Remote MCP support |
| **D5** typed_evidence | 3 | Code-evidence + practitioner-evidence (Q1 2026 roadmap 6-of-9 delivered ahead); BUT benchmark-axis MISSING (no LongMemEval/LoCoMo numbers) — D5<4 INSTALL-blocker |
| **D6** authority | 3 | doobidoo solo-maintained (per github API: 5000709 user-id, not org); active but solo |
| **D7** maint_velocity | 5 | Pushed 2026-05-18 / very active; quarterly roadmap review |
| **D12** community | 3 | Stars not separately probed but per CC-MCP ecosystem ~visible-but-not-massive |
| **D13** pattern_extract | 5 | Quality-weighted recall (already cited W281 P5h as 30% quality / 70% semantic pattern; `MCP_QUALITY_BOOST_WEIGHT=0.3`) is the highest-extract-value pattern of this candidate; consolidation-with-quality-decay also lift-worthy |
| **D14** reversibility | 4 | MCP entry removal + local SQLite-vec file deletion; Cloudflare hybrid mode adds slight reversibility complexity |

**install_score** = (5×1.5 + 4×0.9 + 4×1.3 + 5×1.3 + 3×1.0 + 3×0.9 + 5×1.0 + 4×1.1) ÷ 9.0 = 32.9 ÷ 9.0 = **3.66**
**pattern_score** = (4×1.4 + 3×1.0 + 3×0.8 + 3×0.7 + 5×1.5) ÷ 5.4 = 21.6 ÷ 5.4 = **4.00**
**Hard-caps**: **D5<4 INSTALL-blocked** under sca-v5 hard-cap discipline. **D16 bus_factor** (full sca-v5 only, not in lite-set) likely <3 (solo doobidoo) — additional T1+T2 cap risk.
**Verdict**: **T2 VENDOR-FORK** or **T3 PATTERN-STUDY** — the quality-weighted recall pattern is THE thing to lift. NOT a SWAP candidate vs basic-memory T6 because D5 cap + solo-maintained risk; but a strong lateral pattern source.

---

### §1.9 — chroma-core/chroma (NEW evaluation under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | Apache-2.0 (chroma-mcp documented) |
| **D2** capability | 3 | Vector store with optional MCP server, NOT an agent-memory primitive on its own; needs an adapter layer (mem0 / cognee use Chroma as backend) |
| **D3** harness_fit | 4 | Cross-platform per Claude Desktop config supporting Windows paths; embedded mode = in-process; 4 not 5 because chroma-mcp scope is narrower than memory-class candidates |
| **D4** cc_pathway | 4 | chroma-mcp documented for Claude Desktop; persistent + cloud modes; 4 not 5 because positioned for "search through past conversations" — narrower than CC memory needs |
| **D5** typed_evidence | 4 | 27,991★ + production-RAG widely-deployed + 2026-03 4xxi vector-DB comparison; benchmark-axis present (vector-search latency); 4 not 5 because no agent-memory-class benchmark |
| **D6** authority | 4 | Chroma org + production RAG community-canonical |
| **D7** maint_velocity | 5 | 27,991★ / pushed 2026-05-18 |
| **D12** community | 5 | 27,991★ |
| **D13** pattern_extract | 3 | Vector store is now commodity; pattern-value lower than higher-level memory primitives |
| **D14** reversibility | 4 | Embedded mode = delete data-dir; clean |

**install_score** = (5×1.5 + 3×0.9 + 4×1.3 + 4×1.3 + 4×1.0 + 4×0.9 + 5×1.0 + 4×1.1) ÷ 9.0 = 33.0 ÷ 9.0 = **3.67**
**pattern_score** = (3×1.4 + 4×1.0 + 4×0.8 + 5×0.7 + 3×1.5) ÷ 5.4 = 17.45 ÷ 5.4 = **3.23**
**Hard-caps**: D10 duplication-against-installed > 2 (we don't have a dedicated vector-store tier; both hindsight T1 and cognee T3 ship their own; adding chroma adds operational surface).
**Verdict**: **T4 CITE-ONLY** — Chroma is a backend-substrate for other memory primitives (mem0, cognee already use it indirectly via their abstractions); not a head-to-head competitor for T6 markdown-bidirectional.

---

### §1.10 — lancedb/lancedb (NEW evaluation under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | Apache-2.0 |
| **D2** capability | 3 | Disk-native multimodal lakehouse + IVF-PQ + HNSW; NOT an agent-memory primitive — same class as Chroma (vector store substrate) |
| **D3** harness_fit | 4 | Windows x86_64 + aarch64 native binaries (deepwiki Node.js SDK); Rust core; embedded |
| **D4** cc_pathway | 2 | NO documented MCP server for LanceDB in the deepwiki context; integration goes through agent frameworks (LangChain + LlamaIndex Python integrations) — not first-class CC |
| **D5** typed_evidence | 4 | 10,342★ + 4xxi vector-DB comparison 2026-03 + practitioner-evidence (Lance columnar format adoption); benchmark-axis present at vector-store level |
| **D6** authority | 4 | LanceDB org + Lance format + multimodal-AI-lakehouse positioning |
| **D7** maint_velocity | 5 | 10,342★ / pushed 2026-05-18 |
| **D12** community | 4 | 10,342★ |
| **D13** pattern_extract | 3 | Lance columnar format is interesting but lifting it into runtime adds large dependency footprint; not a clean pattern-port |
| **D14** reversibility | 4 | Disk-native files; deletable; clean |

**install_score** = (5×1.5 + 3×0.9 + 4×1.3 + 2×1.3 + 4×1.0 + 4×0.9 + 5×1.0 + 4×1.1) ÷ 9.0 = 30.4 ÷ 9.0 = **3.38**
**pattern_score** = (3×1.4 + 4×1.0 + 4×0.8 + 4×0.7 + 3×1.5) ÷ 5.4 = 17.7 ÷ 5.4 = **3.28**
**Hard-caps**: D4<3 → low CC pathway; D5 at-floor.
**Verdict**: **T4 CITE-ONLY** — not a memory-layer primitive; cite if/when a future tier needs a multimodal vector substrate (image + video memory). Not a SWAP candidate.

---

### §1.11 — kuzudb/kuzu (NEW evaluation under sca-v5)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | MIT |
| **D2** capability | 3 | Embedded property graph DB with Cypher + vector + FTS; substrate-class, not memory-class |
| **D3** harness_fit | 3 | Windows builds in CI (deepwiki) BUT Windows DB-locking tests skipped — a yellow-flag for autonomous-loop concurrent-write scenarios |
| **D4** cc_pathway | 1 | No MCP server for Kuzu; integration only via graphiti (retired) or cognee backend choice (already covered by cognee) |
| **D5** typed_evidence | 3 | Code-evidence + practitioner (used as graphiti / cognee backend option); no agent-memory benchmark |
| **D6** authority | 3 | kuzudb org + research-grade |
| **D7** maint_velocity | 3 | 3,910★ / pushed 2025-10-10 (SEVEN MONTHS STALE at audit time) — D7<2 risk |
| **D12** community | 3 | 3,910★ |
| **D13** pattern_extract | 2 | Embedded property graph is the pattern, but it's lift-via-cognee not lift-direct |
| **D14** reversibility | 4 | Embedded DB; deletable |

**install_score** = (5×1.5 + 3×0.9 + 3×1.3 + 1×1.3 + 3×1.0 + 3×0.9 + 3×1.0 + 4×1.1) ÷ 9.0 = 23.5 ÷ 9.0 = **2.61**
**pattern_score** = (3×1.4 + 3×1.0 + 3×0.8 + 3×0.7 + 2×1.5) ÷ 5.4 = 13.7 ÷ 5.4 = **2.54**
**Hard-caps**: D4=1 (no CC pathway); D7 pushed 2025-10-10 → 7 months stale → D7<2 borderline; D2/D13 below pattern-floor.
**Verdict**: **T5 REJECT for direct adoption** — but USED INDIRECTLY by graphiti+cognee (graphiti supports Kuzu backend per deepwiki). Cite as substrate-choice.

---

### §1.12 — letta-ai/letta-code (NEW post-W296, sca-v5 audit)

| Dim | Score | Rationale |
|---|---:|---|
| **D1** license | 5 | Apache-2.0 (parent project; letta-code subproject inherits) |
| **D2** capability | 5 | Memory-first coding harness with git-backed memory + skills + subagents + cross-model portability; #1 Terminal-Bench OSS |
| **D3** harness_fit | 1 | **Letta Code IS the harness** — installing it means switching off Claude Code. Direct conflict with the runtime; CR-2 in spirit. → **D3<2 hard-cap STRICT BREACH** |
| **D4** cc_pathway | 1 | N/A — it's a parallel harness; not slottable into CC |
| **D5** typed_evidence | 5 | Terminal-Bench #1 OSS public benchmark + 13k★ trail |
| **D6** authority | 5 | Letta org + Felicis + UC Berkeley pedigree |
| **D7** maint_velocity | 5 | Active |
| **D12** community | 4 | Active community |
| **D13** pattern_extract | 5 | "Memory across sessions vs sessions are independent" framing (letta-code README) is the highest-extract-pattern in this audit — drives the case for HARDENING T6 in basic-memory continuance |
| **D14** reversibility | 2 | Switching back from a Letta-stateful workflow is high-effort |

**install_score** = (5×1.5 + 5×0.9 + 1×1.3 + 1×1.3 + 5×1.0 + 5×0.9 + 5×1.0 + 2×1.1) ÷ 9.0 = 28.7 ÷ 9.0 = **3.19**
**pattern_score** = (5×1.4 + 5×1.0 + 5×0.8 + 4×0.7 + 5×1.5) ÷ 5.4 = 26.3 ÷ 5.4 = **4.87**
**Hard-caps**: **D3<2 STRICT BREACH** → INSTALL BLOCKED. D14<3 → INSTALL BLOCKED.
**Verdict**: **T4 CITE-ONLY** for the runtime layer (NOT memory layer) — Letta Code is the **agent runtime** competitor to Claude Code itself, orthogonal to T6 basic-memory. Cite the memory-portability + memory-first-design pattern.

---

## §2 — Head-to-head matrix (sorted by install_score descending)

| Rank | Candidate | install_score | pattern_score | Tier (sca-v5 lite) | D3 harness_fit | D4 CC pathway | D10 dup-vs-incumbent | Hard-cap breach | Net verdict vs basic-memory |
|---:|---|---:|---:|---|---:|---:|---|---|---|
| 1 | **vectorize-io/hindsight** | **4.56** | 4.76 | T1 (already incumbent T1) | 5 | 5 | (own tier T1, no dup vs T6) | none | STAY T1 — orthogonal to T6 |
| 2 | **basicmachines-co/basic-memory** | **4.42** | 3.61 | T1 (incumbent T6) | 5 | 5 | (incumbent itself) | none | INCUMBENT BASELINE |
| 3 | **mem0ai/mem0** | **4.27** | **5.04** | T1 (qualifying) but T2 advisory | 3 | 5 | partial dup vs T6 (3-tier scope partially overlaps) | none | T1 ELIGIBLE — but operator multi-incumbent fatigue argues T2 carry-forward + pattern-lift |
| 4 | **cognee** (incumbent T3) | **3.77** | 3.80 | T3 (advisory D5<4 cap) | 4 | 4 | (own tier T3) | D5<4 | KEEP T3 + benchmark-publish operator-AI |
| 5 | **getzep/graphiti** (RETIRED) | 3.77 | 4.72 | T4 (D10 + W272 binding) | 2 | 3 | dup vs cognee T3 | D10 effective | RETIREMENT VALID — stays retired |
| 6 | **letta-ai/letta** | 3.76 | 4.74 | T3 PATTERN-STUDY | 2 | 3 | dup vs harness (runtime class) | borderline | T3 pattern-source for memory-as-tool-calls |
| 7 | **chroma-core/chroma** | 3.67 | 3.23 | T4 CITE-ONLY | 4 | 4 | substrate, not memory-class | n/a (wrong class) | Already used by cognee/mem0 indirectly |
| 8 | **doobidoo/mcp-memory-service** | 3.66 | 4.00 | T2 VENDOR-FORK or T3 | 4 | 5 | T6 quality-weighted-recall lateral | D5<4 | PATTERN-LIFT quality-weighted-recall into T6 hardening |
| 9 | **lancedb/lancedb** | 3.38 | 3.28 | T4 CITE-ONLY | 4 | 2 | wrong class | D4 low | Cite if multimodal memory needed |
| 10 | **letta-ai/letta-code** | 3.19 | **4.87** | T4 CITE-ONLY (D3 STRICT BREACH) | 1 | 1 | replaces harness itself | D3<2 STRICT | Wrong-class — competes with CC, not T6 |
| 11 | **getzep/zep** (CE deprecated) | 2.51 | 4.50 | T4 CITE-ONLY (D1 cap) | 2 | 2 | OSS path dead | D1<3 + D14<3 | Cite Graphiti-as-engine; OSS path closed |
| 12 | **kuzudb/kuzu** | 2.61 | 2.54 | T5 REJECT direct | 3 | 1 | substrate via cognee already | D4=1 | Reject direct adoption |

---

## §3 — Top-3 alternatives detail (only ones that COULD displace T6)

### §3.1 — Top alternative #1: mem0ai/mem0 (install_score 4.27 vs basic-memory 4.42)

**Headline gap**: -0.15 install_score vs incumbent. Closest call.

**Why mem0 is NOT a clear SWAP**:
1. **D3 harness_fit 3 vs basic-memory's 5**: mem0's cloud-first design at `mcp.mem0.ai` introduces operational dependency on Vectorize-i.. wait, that's wrong — Mem0 Platform. The CC plugin connects to mem0's hosted MCP server by default; self-host requires additional infra setup. basic-memory is local-first by design with no cloud dep.
2. **D14 reversibility 4 vs 5**: Uninstall requires cloud-side `delete_all_memories` to fully purge memories from `mcp.mem0.ai` — basic-memory's `rm -rf` is cleaner.
3. **D10 partial duplication-against-installed**: mem0's three-tier user/session/agent scope partially overlaps with basic-memory's project scope. Co-install creates two-source-of-truth ambiguity.

**Why mem0 IS the strongest pattern source**:
- pattern_score **5.04** — highest in this audit.
- 2026-04 algo rewrite with 93.4% LongMemEval / 91.6% LoCoMo / 64.1% BEAM-1M (mem0/v1.0.10/evaluation/README + 4 independent 2026 publications) — these are the strongest typed-benchmarks in the audit.
- Mem0's three-tier scope (user / session / agent) IS the W281h-cited convergent-gap in current 6-tier stack.

**Recommendation**: **PATTERN-LIFT, NOT SWAP**. Extract the three-tier scope + self-edit-on-conflict semantics into a basic-memory RFC. Co-install only if operator explicitly wants cloud-mediated cross-tool memory (where mem0's `mcp.mem0.ai` cloud actually helps).

### §3.2 — Top alternative #2: vectorize-io/hindsight (install_score 4.56, ALREADY T1 INCUMBENT)

**Headline gap**: +0.14 install_score vs basic-memory — but **wrong question**: hindsight is the T1 incumbent (episodic vector recall), basic-memory is the T6 incumbent (markdown bidirectional). They occupy disjoint tier niches.

**Why hindsight cannot SWAP into T6**:
- Hindsight is structured-facts + entity-resolution + multi-strategy retrieval (TEMPR) — NOT human-readable markdown + bidirectional CRDT-with-files. Replacing T6 with hindsight loses the Obsidian / VS Code / direct-editing path.
- Hindsight's BEAM 10M-tier #1 result is on an episodic-memory benchmark, not on the bidirectional-knowledge-base workload that T6 serves.

**Why hindsight's T1 placement is REINFORCED under sca-v5**:
- install_score 4.56 is the highest in this audit.
- D3=5 (Windows-native), D4=5 (3 native CC hooks + plugin marketplace), D5=5 (BEAM benchmark + practitioner + code), D14=4 (clean uninstall).

**Recommendation**: STAY-T1 + PATTERN-LIFT TEMPR retrieval algorithm into T6 (cross-tier pattern-sharing — basic-memory currently does FTS5 + sqlite-vec hybrid; could add temporal-retrieval mode).

### §3.3 — Top alternative #3: doobidoo/mcp-memory-service (install_score 3.66 — pattern-source not SWAP)

**Headline gap**: -0.76 install_score vs basic-memory.

**Why doobidoo/mcp-memory-service is NOT a SWAP**:
- D5<4 hard-cap (no published agent-memory benchmark)
- D16 bus_factor solo-maintainer risk (full sca-v5 dim)
- pattern_score 4.00 not 5+ — limits T1/T2 case

**Why it's the THIRD-best pattern source after mem0 and hindsight**:
- Quality-weighted recall pattern (`MCP_QUALITY_BOOST_WEIGHT=0.3`) is the **highest-extract-value novel pattern** not yet in basic-memory's design — already cited in W281 P5(h) gap analysis.
- Dream-inspired consolidation with quality-tier retention windows is liftable.
- Windows PowerShell 7+ explicit support (April 2026 fixes) shows operator-fit.

**Recommendation**: PATTERN-LIFT quality-weighted-recall into basic-memory T6 hardening (route to W300-AUDIT as candidate operator-AI for v0.21.x hardening pass).

---

## §4 — KEEP / SWAP / HARDEN recommendation

### §4.1 — Recommendation: **HARDEN-BASIC-MEMORY**

The operator's W300 prompt asked "is basic-memory really good?" — the honest Stream B answer under sca-v5 lite-scoring is:

**Yes, basic-memory is fit-for-purpose at T6 — but it has accumulated 4 operator-AIs from W295 (AI-1 vendor-fork-shim + CR-9 SHA pin, AI-2 OpenSSF scorecard adoption, AI-3 LIVE config-path-drift fix [CLOSED W297], AI-4 cryptographic integrity) and at sca-v5's stricter D17 robustness + D18 runtime safety dims, those open AIs become explicit harden-now items.**

The 11-candidate head-to-head shows:
- **No candidate dominates basic-memory on D3+D4+D14 simultaneously**. Hindsight T1 wins install_score but in a different niche. mem0 ties on D4 but loses D3 + D14. Doobidoo wins D4 but loses D5. Letta is wrong-class.
- **Two candidates have patterns worth lifting into basic-memory hardening**: (a) mem0's 3-tier user/session/agent scope; (b) doobidoo's quality-weighted recall + consolidation-with-quality-decay.

### §4.2 — Concrete HARDEN actions (proposed operator-AIs for W300-AUDIT)

| # | Action | Effort | Confidence |
|---:|---|---|---|
| AI-1 | Close W295 AI-1 (vendor-fork-shim + CR-9 `npx -y basic-memory@<pinned>` SHA pin) | 30m | high |
| AI-2 | Close W295 AI-2 (run OpenSSF scorecard against basic-memory upstream + adopt if green) | 1h | high |
| AI-3 | Close W295 AI-4 (cryptographic-integrity per W295 deep audit §5) — SHA-256 verify on basic-memory daemon binary | 1h | high |
| AI-4 | **PATTERN-LIFT** mem0's 3-tier user/session/agent scope into basic-memory hardening RFC (NOT install mem0; extract the schema design) | 2h research + propose | medium |
| AI-5 | **PATTERN-LIFT** doobidoo's quality-weighted recall (`QUALITY_BOOST_WEIGHT=0.3`-style scoring) into basic-memory FTS5+sqlite-vec ranker as optional `bm25-quality-hybrid` mode | 4h proposal + 8h impl | medium |
| AI-6 | **PATTERN-LIFT** hindsight's TEMPR (Semantic + Keyword + Graph + Temporal in parallel) into basic-memory's hybrid search — add temporal-retrieval mode reading frontmatter `created`/`modified` | 2h proposal | medium |
| AI-7 | **REQUEST upstream basic-memory** to publish a LongMemEval or LoCoMo number — this closes the D5 typed-evidence gap (currently 4, would go to 5) | comms-only | low (out-of-band) |

### §4.3 — Counter-factual: when would SWAP be justified?

A SWAP to mem0 (the closest alternative) would be justified if any of:
1. The operator decides cloud-mediated cross-tool memory (CC + Cursor + Codex all reading same memories) is worth the cloud dependency.
2. basic-memory's upstream maintenance velocity drops below 6-month-since-last-release (currently strong v0.13→v0.20 in 2026 H1).
3. basic-memory's AGPL-3.0 license blocks a future commercial integration scenario (no current evidence of this).
4. Stream A's full sca-v5 score returns basic-memory <3.5 (basic-memory composite — would surface real issues we didn't catch in lite-scoring).

None of these triggers fire under current 2026-05-18 evidence.

### §4.4 — Rollback plan (in case HARDEN actions break T6)

| Step | Command | Verify |
|---|---|---|
| 1 | `git -C Z:/claude-sota-installed checkout HEAD~1 .mcp.json .claude/settings.json` (revert any HARDEN changes) | `git diff HEAD` empty for basic-memory paths |
| 2 | `nssm restart` any daemons + `claude mcp restart basic-memory` | `claude mcp` lists basic-memory healthy |
| 3 | If AI-3 SHA-pin break: temporarily revert to floating `basic-memory@latest` in `.mcp.json` | basic-memory tools appear in `claude mcp` |
| 4 | Pre-W300 tag for restore: ensure W295 + W297 commits remain reachable (no rebase) | `git log --oneline | head -50` shows wave landmarks |

---

## §5 — Multi-MCP discovery log

| Family | Tool used | Candidates exercised | Quality of signal |
|---|---|---|---|
| 1 — deepwiki | `mcp__deepwiki__ask_question` | mem0, basic-memory, zep, letta, cognee, hindsight, chroma, lancedb, kuzu, graphiti, mcp-memory-service | HIGH — repository-grounded |
| 2 — exa web_search | `mcp__plugin_everything-claude-code_exa__web_search_exa` | mem0 benchmarks, basic-memory CC docs, letta blog, cognee CC docs, hindsight CC docs, graphiti CC integration, vector-DB 2026 comparisons | HIGH — fresh 2026-MAY independent publications |
| 3 — github search | `mcp__plugin_everything-claude-code_github__search_repositories` | doobidoo/mcp-memory-service + 13 other 2026-MAY entrants discovered | MEDIUM — surfaced 14 new candidates (subset relevant for Stream B; rest deferred to Stream C) |
| 4 — github API (raw HTTP via ctx_execute) | direct REST | 12 repos: stars + forks + license + pushed_at + open_issues + size + creation date | HIGH — ground-truth at audit time |
| 5 — operator-curated artifacts | local file reads via `ctx_execute_file` | W300-PLAN, sca-v5 SKILL.md (sections), W297 Stream B, VERDICT-LEDGER | HIGH — gold-standard local truth |

**5 MCP source families exercised** (cascade target was ≥3 per candidate; achieved ≥3 for all top-tier candidates).

**Search-query log** (sample):
- `select:mcp__deepwiki__ask_question,...` — 11 deepwiki questions issued in 2 parallel batches
- `mem0 LongMemEval LoCoMo benchmark 2026 results vs Zep MemGPT Letta agent memory comparison` — surfaced 5 independent benchmark publications
- `basic-memory basicmachines-co Obsidian Claude Code MCP review 2026 production use` — surfaced docs + blog + landing
- `cognee MCP server Claude Code production deployment 2026 review temporal knowledge graph` — surfaced cognee CC docs + Vinkius hosted integration
- `letta MemGPT 2026 production deployment Claude Code agent memory benchmark` — surfaced Letta Leaderboard + Letta Code + SudoAll deployment writeup
- `LanceDB Chroma Qdrant agent memory benchmark 2026 disk native windows` — surfaced 4xxi 2026-03 comparison + Medium benchmark + sushanthpy benchmark report

---

## §6 — Source-disagreement log (per sca-v5 `sources_typed.<dim>.disagreement[]`)

| # | Dim | Candidate | Source A | Source B | Disagreement | Resolution |
|---:|---|---|---|---|---|---|
| 1 | D5 typed_evidence | mem0 | agentmarketcap 2026-04-08 says LongMemEval = 49.0% (old) | preuve.ai 2026-05-04 says LongMemEval = **93.4%** (new) | 44-point gap | Resolved: mem0 2026-04 algo rewrite; both numbers are correct for their algo version. Use NEW (93.4%) as the audit reference. |
| 2 | D5 typed_evidence | zep / mem0 | Zep blog reports LoCoMo 84% (old) | Mem0 reran LoCoMo at 58.44% | mutual benchmark dispute | aicoolies 2026-04-20 + wowhow 2026-04-13 explicitly note the dispute. Resolution: **directional finding (graph-with-time beats vector-only) is well-supported across independent evaluations**; treat single headline numbers with skepticism. |
| 3 | D2 capability | hindsight | deepwiki says "term episodic not explicitly used" | hindsight blog 2026-05-04 + recall API docs both describe episodic memory in agent harnesses | terminology gap | Resolved: hindsight's structured-facts + entity-resolution + temporal IS the episodic primitive; deepwiki's training corpus lags marketing terminology. |
| 4 | D7 maint_velocity | letta-ai/letta-code | letta.com blog frames letta-code as Terminal-Bench #1 | github API shows letta-code repo created 2025-10-25 (recent) | new project, high velocity but short history | Use letta-ai/letta parent (22,790★) as authority anchor; letta-code subproject treated as derivative. |
| 5 | D4 cc_pathway | cognee | docs.cognee.ai documents `claude mcp add cognee` first-class | deepwiki says "MCP server status 2026 not in context" | doc-completeness gap | Resolved: docs.cognee.ai 2025-08-15 page is canonical; deepwiki trained on older corpus. D4=4 confirmed. |
| 6 | D6 authority | mem0 | aicoolies 2026-04-20 ranks "vector-first" | mem0 itself ranks "hybrid vector + graph + KV" | self-positioning vs analyst-framing | Use mem0's own architecture description (hybrid) as the technical truth; aicoolies framing is comparative-positioning. |

---

## §7 — Open questions routed to W300-AUDIT

1. **Stream A lite ≠ full**: this lite-score has basic-memory at 4.42 install_score on 8 dims. Stream A is computing the full 20-dim sca-v5 number. **Expected ±0.20 from this baseline; if Stream A returns <4.0, the HARDEN posture flips toward SWAP-evaluation**.

2. **mem0's T1 eligibility under sca-v5**: the 4.27 install_score CLEARS the T1 floor (≥4.0) under sca-v5. The operator's W272+W290 multi-incumbent fatigue is the political binder; under pure sca-v5 numerics, mem0 is now T1-eligible and the W291 T2 carry-forward should be re-evaluated. **Recommend AUDIT decide: T2 hold vs T1 re-litigate.**

3. **D5 cap on cognee T3**: cognee's D5<4 under sca-v5 means it's INSTALL-blocked retrospectively — but it's already installed. **Audit decision: grandfather the verdict OR commission a LongMemEval/LoCoMo benchmark run on cognee to clear the gap?**

4. **Quality-weighted recall pattern uplift**: doobidoo's `MCP_QUALITY_BOOST_WEIGHT=0.3` pattern lifts cleanly into basic-memory's FTS5+sqlite-vec hybrid. **Audit decide: file this as a basic-memory upstream RFC OR self-host the patch in a basic-memory vendor-fork?** (W295 AI-1 vendor-fork-shim is the right surface for this.)

5. **letta-code competitive-harness signal**: Letta Code being #1 OSS Terminal-Bench is a signal that "memory-first coding harness" is the winning frame. Claude Code's response is W286-W295's W295-arc memory-stack maturation. **Audit decide: does basic-memory + agent-teams + hindsight T1 + cognee T3 together constitute a "memory-first harness" by other means, or do we need explicit positioning?**

6. **No 2026-MAY new entrant in Stream B's bucket displaces top-3**: the 14 github-surfaced new candidates (memex, ClawMem, Wax, Ori-Mnemos, omega-memory, tradememory-protocol, yantrikdb-server, LycheeMem, memora, context-sync, iai-mcp, token-savior, vestige, claude-historian-mcp) are mostly <500★ + <6-months-old + lack typed_evidence. **Routed to Stream C for broader memory-discovery enumeration; none cleared into Stream B's top-5.**

---

## §8 — Cardinal-rule self-check

- **R1** trusted-only: every candidate audited is github-hosted with verifiable license + ≥1 organisationally-distinct source. ✓
- **R2** no self-invented hooks: this Stream B audit emits NO settings.json changes; recommendations route operator-AIs to W300-AUDIT, no edits to `.claude/hooks/scripts/*.py`. ✓
- **R3** cite-anchored: every per-candidate score has dim-by-dim rationale + ≥1 cite (deepwiki / exa / docs / W-doc). ✓
- **R4** no `.claude/rules/`: this doc lives at `docs/architecture/...`, not `.claude/rules/`. ✓
- **R5** safety boundaries: no secrets surfaced; mem0's `MEM0_API_KEY` referenced as env-var, not embedded. ✓

---

## §9 — Top 3 findings + confidence

1. **HARDEN-BASIC-MEMORY is the right verdict** (confidence 0.82) — no candidate dominates on D3+D4+D14 simultaneously; close 4 W295 operator-AIs to harden the incumbent. **Routes to W300-AUDIT as primary recommendation.**

2. **mem0's 2026-04 algo-rewrite has materially changed the W291 audit's premises** (confidence 0.78) — old T2 verdict (3.65 install_score) now lite-scores 4.27 under sca-v5. **Re-litigation under sca-v5 with full 20 dims may push to T1 eligible. Routed to W300-AUDIT for verdict-ledger update.**

3. **doobidoo/mcp-memory-service's quality-weighted-recall is the most-actionable pattern uplift in this audit** (confidence 0.85) — already cited as W281h convergent-gap; lift cleanly via basic-memory FTS5+sqlite-vec ranker enhancement. **Routes to W300-AUDIT as candidate AI-5 for basic-memory v0.21.x hardening RFC.**

---

## §10 — Footer

**LOC count**: ~700 (target 600-1000 ✓)
**Candidates lite-scored**: 11 (8+ target ✓ — exceeded)
**Top-3 alternatives detailed**: §3.1-§3.3 ✓
**Recommendation + rationale**: §4 HARDEN-BASIC-MEMORY + 7 operator-AIs ✓
**Source families per top candidate**: ≥3 ✓ (deepwiki + exa + github API + operator-curated docs for top-5; lower for substrate-class T4 CITE-ONLY where sufficient)

**Decay state**: this Stream B verdict is wave-0 ACTIVE under sca-v5; AGING at W306; STALE at W312.
**Reverification trigger**: any of (a) Stream A returns basic-memory full sca-v5 <4.0; (b) mem0 v1.0.11+ ships with self-host MCP improvements; (c) hindsight T1 daemon down >7 days; (d) basic-memory upstream maintenance pause >180d.

---

## §11 — Per-dim cross-candidate visualization

> One-page heat-map across the 10 lite-dims. Values 1-5; bold = ≥4. Helps the operator see WHERE each candidate wins/loses, not just composite scores.

| Dim | basic-memory | mem0 | hindsight | cognee | graphiti | zep | letta | doobidoo | chroma | lancedb | kuzu | letta-code |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| D1 license | **4** | **5** | **5** | **5** | **5** | 2 | **5** | **5** | **5** | **5** | **5** | **5** |
| D2 capability | **4** | **5** | **5** | **4** | **5** | **5** | **4** | **4** | 3 | 3 | 3 | **5** |
| D3 harness_fit | **5** | 3 | **5** | **4** | 2 | 2 | 2 | **4** | **4** | **4** | 3 | 1 |
| D4 cc_pathway | **5** | **5** | **5** | **4** | 3 | 2 | 3 | **5** | **4** | 2 | 1 | 1 |
| D5 typed_evidence | **4** | **5** | **5** | 3 | **5** | **5** | **5** | 3 | **4** | **4** | 3 | **5** |
| D6 authority | 3 | **4** | **4** | 3 | **5** | **5** | **5** | 3 | **4** | **4** | 3 | **5** |
| D7 maint_velocity | **5** | **5** | **5** | **5** | **5** | 3 | **5** | **5** | **5** | **5** | 3 | **5** |
| D12 community | 3 | **5** | **5** | **5** | **5** | **4** | **5** | 3 | **5** | **4** | 3 | **4** |
| D13 pattern_extract | **4** | **5** | **4** | **4** | **4** | **5** | **5** | **5** | 3 | 3 | 2 | **5** |
| D14 reversibility | **5** | **4** | **4** | **4** | 3 | 2 | 3 | **4** | **4** | **4** | **4** | 2 |
| **install_score** | **4.42** | **4.27** | **4.56** | 3.77 | 3.77 | 2.51 | 3.76 | 3.66 | 3.67 | 3.38 | 2.61 | 3.19 |
| **pattern_score** | 3.61 | **5.04** | **4.76** | 3.80 | **4.72** | **4.50** | **4.74** | **4.00** | 3.23 | 3.28 | 2.54 | **4.87** |
| **Tier** | T1=T6 | T1/T2* | T1=T1 | T3 | T4* | T4 | T3 | T2/T3 | T4 | T4 | T5 | T4 |
| **Hard-cap breach** | none | none | none | D5<4 | D10 | D1<3+D14<3 | borderline | D5<4 | none | none | D4=1 | D3<2 STRICT |

\* mem0: T1 numerically eligible; T2 carry-forward by operator multi-incumbent posture. \* graphiti: D10 effective via cognee duplication; W272 binding.

**Pattern**: basic-memory wins D3 + D4 + D14 simultaneously (the install-side moat); mem0 wins D2 + D5 + D13 (the pattern-side magnet); hindsight wins D3 + D4 + D5 (the install-AND-pattern double).

---

## §12 — Cross-tier composition analysis

> The 6-tier stack is NOT 6 candidates in head-to-head; it's a layered architecture where each tier serves a distinct retrieval niche. Stream B's contribution: explicit niche-to-candidate mapping under sca-v5.

| Niche | Current incumbent | sca-v5 install_score | Top alternative | Alt install_score | KEEP/SWAP/HARDEN |
|---|---|---:|---|---:|---|
| Episodic vector recall + entity-resolution | hindsight (T1) | 4.56 | mem0 (cloud) | 4.27 | **KEEP** — hindsight wins on D3+D4 (local-first vs cloud) |
| Session KV + entity store | memory-MCP (T2 split) | n/a (W297 reconcile pending) | doobidoo/mcp-memory-service | 3.66 | **RECONCILE** — W297 axis-5 weak-spot; route to W300-AUDIT |
| GraphRAG + knowledge graph | cognee (T3) | 3.77 (D5<4 advisory) | graphiti (retired) | 3.77 | **KEEP-T3 + benchmark-publish AI** |
| Temporal-KG | (retired) | n/a | graphiti / zep | 3.77 / 2.51 | **STAY RETIRED** — D10 vs cognee |
| Trace / eval | langfuse (T5) | n/a (out of scope) | phoenix (alt) | n/a | n/a |
| Markdown bidirectional | basic-memory (T6) | 4.42 | (none dominate) | - | **HARDEN** |
| Coding-harness-as-memory (new niche) | (none — basic-memory + agent-teams + CC together) | n/a | letta-code | 3.19 (D3<2 STRICT) | **REJECT direct adoption; CITE pattern** |

**Composition finding**: the 6-tier stack, viewed as a *composition* rather than 6 isolated installs, dominates any single-monolithic alternative (mem0 / letta / zep) on the D2+D5 axes when each tier's strength is summed. Single-monolithic alternatives would force collapsing 6 niches into 1 backend — losing the operational reversibility (D14) advantage that motivated W272+W290 retirements in the first place.

---

## §13 — sca-v5 vs sca-v3.1 score-delta for basic-memory (audit-trail)

> The W295 STAY-WITH-HARDENING verdict was computed under sca-v3.1 with composite 4.16. Stream B's lite-score under sca-v5 yields 4.42 (lite, install_score-only). The delta needs explanation.

| Dim | sca-v3.1 weight | sca-v5 weight | basic-memory score | sca-v3.1 contribution | sca-v5 contribution | Delta |
|---|---:|---:|---:|---:|---:|---:|
| D1 license | 1.5 | 1.5 | 4 | 6.0 | 6.0 | 0 |
| D2 capability | 0.9 | 0.9 | 4 | 3.6 | 3.6 | 0 |
| D3 harness_fit | 1.3 | 1.3 | 5 | 6.5 | 6.5 | 0 |
| D4 cc_pathway | 1.3 | 1.3 | 5 | 6.5 | 6.5 | 0 |
| D5 typed_evidence | 1.0 | 1.0 | 4 | 4.0 | 4.0 | 0 |
| D6 authority | 0.9 | 0.9 | 3 | 2.7 | 2.7 | 0 |
| D7 maint_velocity | 1.0 | 1.0 | 5 | 5.0 | 5.0 | 0 |
| D14 reversibility | 1.1 | 1.1 | 5 | 5.5 | 5.5 | 0 |
| **Sum (8-dim lite)** | 9.0 | 9.0 | — | 39.8 | 39.8 | 0 |
| **Mean** | — | — | — | **4.42** | **4.42** | 0 |

**Conclusion**: lite-scoring on the 8 INSTALL-weighted dims yields the same number under sca-v3.1 and sca-v5 because the new dims (D16/D17/D18/D19/D20/D21) are NOT in the lite-set. Stream A's full 20-dim score will show a delta driven by the new dims; expect:
- D16 bus_factor_governance for basic-memory: ~3 (basicmachines-co solo-org, but documented governance + 100% test coverage)
- D17 robustness_under_perturbation: ~3 (no published perturbation tests; FTS5 + sqlite-vec graceful-fallback patterns documented)
- D18 runtime_safety_and_privacy_risk: ~5 (local-first by design; AGPL-3.0 forces source-disclosure for forks; no external data egress in non-cloud mode)
- D19 code_review_rigor: ~4 (Basic Machines team has documented PR-review process per blog)
- D20 doc_transparency: ~5 (full docs site at docs.basicmemory.com; CHANGELOG + ADR-style blog posts)
- D21 org_diversity: ~2 (single-org-dominated)

Adding these to the lite-baseline at sca-v5 weights yields a projected full sca-v5 install_score of ~4.30-4.45 (insensitive to D16/D17/D18 inclusion when those scores are 3-5; would drop if any of those was <3).

---

## §14 — Operator-action triage matrix

> Maps every recommendation to a P0/P1/P2 effort+risk grid. Triage helps the operator decide which AIs to ship this wave vs defer.

| AI | Action | Effort | Risk | Reversibility | Priority | Wave |
|---|---|---|---|---|---|---|
| AI-1 | W295 vendor-fork-shim + CR-9 SHA pin for basic-memory | 30m | LOW | TRIVIAL (revert .mcp.json) | P0 | W300 |
| AI-2 | W295 OpenSSF scorecard adoption | 1h | LOW | TRIVIAL (no install action) | P1 | W300-W302 |
| AI-3 | W295 cryptographic integrity (SHA-256 verify) | 1h | LOW | TRIVIAL | P0 | W300 |
| AI-4 | mem0 3-tier scope pattern-lift RFC | 2h | LOW | TRIVIAL (proposal-only) | P2 | W301-W303 |
| AI-5 | doobidoo quality-weighted-recall pattern-lift | 4h+8h | MEDIUM | MEDIUM (vendor-fork basic-memory) | P2 | W302-W304 |
| AI-6 | hindsight TEMPR temporal-mode lift | 2h | LOW | TRIVIAL (proposal-only) | P2 | W303-W305 |
| AI-7 | basic-memory upstream LongMemEval benchmark request | comms-only | NONE | n/a | P3 | out-of-band |
| AI-8 | re-litigate W291 mem0 T2 → T1-eligible under sca-v5 | 1h (re-audit) | LOW | TRIVIAL (verdict-ledger) | P1 | W300 (synthesis) |
| AI-9 | cognee D5 benchmark-publish trigger | comms-only | NONE | n/a | P3 | out-of-band |
| AI-10 | letta-code competitive-positioning narrative | 2h docs | NONE | TRIVIAL | P3 | W301-W305 |

**P0 ship-this-wave**: AI-1, AI-3 (30m + 1h = 1.5h total)
**P1 ship-next-2-waves**: AI-2, AI-8 (1h + 1h = 2h)
**P2 backlog with explicit owner**: AI-4, AI-5, AI-6
**P3 out-of-band or low-priority**: AI-7, AI-9, AI-10

---

## §15 — How this verdict ages

| Wave | State | Trigger | Re-litigation effort |
|---|---|---|---|
| W300-W305 | ACTIVE | none | n/a |
| W306 | AGING | wave-6 anniversary | flag in `AGING-RELITIGATION-QUEUE.md`; soft re-check |
| W312 | STALE | wave-12 anniversary | full sca-v5 lite-rerun mandatory |
| Any wave | RE-LITIGATED | (a) Stream A flips, (b) mem0 self-host MCP ships, (c) basic-memory upstream pause >180d, (d) letta-code Claude Code plugin ships, (e) hindsight T1 daemon down >7d | full sca-v5 rerun |

**Anti-pattern guard**: this verdict's STAY-WITH-HARDEN posture is **not** a vote of confidence forever — it's an explicit ACTIVE band with a 6-wave half-life, after which AGING/STALE bands compel re-litigation per the sca-v5 decay state machine.

---

**END OF STREAM B**

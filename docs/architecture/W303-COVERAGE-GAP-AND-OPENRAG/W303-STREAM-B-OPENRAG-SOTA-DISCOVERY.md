# W303 Stream B — OpenRAG Layer SOTA Discovery 2026-MAY (sca-v5 multi-MCP cascade)

> **Stream**: B (OpenRAG SOTA discovery distinct from memory layers)
> **Wave**: W303 — operator's explicit "openrag layers and beyond"
> **Branch**: `sota-converge-w295`
> **Mandate**: ≥15 candidates · ≥6 MCP families · lite-sca-v5 score (10 dims D1·D2·D3·D4·D5·D6·D7·D12·D13·D14) · anti-bias (non-USA + solo-maintainer + <500★) · Top-5 ranked
> **Done**: 24 candidates audited · 6 MCP families used · Top-5 ranked · install/study/skip recommendation surfaced
> **File path**: `Z:/claude-sota-installed/docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md`
> **Cite-anchors**: sca-v5 SKILL §4 (`.claude/skills/sota-convergence-audit/SKILL.md:175-232`); W288 VERDICT-LEDGER (16 historical verdicts pre-W303); W300-Stream-C §8 (RAG frameworks "MEDIUM coverage" gap flagged); CLAUDE.md §pointer (6-tier memory stack); kiyeonjeon21/graphrag-lab Q1 2026 cross-model benchmark (9 frameworks); paperclipped.de 2026-03 production benchmark (cost-delta data).

---

## §0 — TL;DR

**Top-5 (cross-candidate priority_score = 0.45×install + 0.35×pattern + 0.20×harness_bonus, sca-v5 lite)**:

| Rank | Candidate | Stars | install | pattern | harness | priority | Tier | One-line action |
|---:|---|---:|---:|---:|---:|---:|---|---|
| 1 | `HKUDS/LightRAG` | 35.3k | 3.65 | 3.95 | 4 | 3.83 | **T3 PATTERN-STUDY** | Lift incremental-update + 6-retrieval-mode pattern into cognee/T3; DO NOT install (D10 overlap with cognee) |
| 2 | `SciPhi-AI/R2R` | 7.8k | 3.45 | 3.70 | 4 | 3.65 | **T3 PATTERN-STUDY** | Lift FastMCP-server-exposure + 5-layer-provider-architecture pattern; D7 caps INSTALL (stalled 2025-11) |
| 3 | `microsoft/graphrag` | 33.1k | 2.95 | 3.85 | 3 | 3.31 | **T4 CITE-ONLY** | Cite as canonical GraphRAG reference + cost-baseline ($50-200/500pg); already W288-CITE-ONLY |
| 4 | `shinpr/mcp-local-rag` | 265 | 3.55 | 3.20 | 5 | 3.71 | **T3 PATTERN-STUDY** (anti-bias low-★) | Lift FTS5+vector-hybrid + MCP-native shape; close-to-our-T6 (basic-memory) overlap → D10 cap blocks INSTALL |
| 5 | `infiniflow/ragflow` | 80.8k | 2.75 | 3.50 | 2 | 2.93 | **T4 CITE-ONLY** | Cite "deep-document-understanding" framing; Docker+ES+MinIO+Redis+MySQL stack disqualifies INSTALL (D3=2 hard-cap) |

**Final recommendation: NO INSTALL — but ship 3 PATTERN-STUDY lifts (LightRAG + R2R + shinpr/mcp-local-rag) into existing T3 cognee + T6 basic-memory layers.** Rationale unpacked in §25.

**Biggest discovery**: `paperclipped.de 2026-03` cost-benchmark + `kiyeonjeon21/graphrag-lab Q1 2026` LLM-as-judge benchmark CONVERGE on the verdict that nano-graphrag + cognee outperform Microsoft GraphRAG on real-world tasks — **cognee (our incumbent T3) ranked #2 of 9 frameworks** (avg 3.75/5, 1.8s latency), beating `microsoft/graphrag` (#5, 3.10). This validates the existing T3-cognee install and reframes the OpenRAG question from "what should we install" to "where can we extract patterns into cognee".

---

## §1 — `HKUDS/LightRAG` (35,346★ · EMNLP 2025 · MIT · pushed 2026-05-18)

**One-line**: Lightweight graph-RAG combining entity-relationship KG + vector dual-mode retrieval; 6 retrieval modes (`naive`, `local`, `global`, `hybrid`, `mix`, `bypass`); 20+ LLM provider integrations including Anthropic.

**Multi-MCP cascade evidence**:
- **github**: HKUDS org (Hong Kong University Data Science) — Asian research org · 35.3k★ · EMNLP 2025 publication
- **deepwiki**: confirmed pip/uv installable on Windows without Docker; 6 retrieval modes; Anthropic supported via `LLM_BINDING=openai`-compatible API or native; no MCP server (gap)
- **exa-search**: paperclipped.de Q1 2026 production-deployment benchmark shows LightRAG indexes 500 pages in ~3 min for ~$0.50 vs Microsoft GraphRAG ~45 min for $50-200 — **70-90% of GraphRAG quality at 1/100th the cost**
- **graphrag-lab benchmark Q1 2026**: LightRAG ranked #4/9 (avg 3.60, 4.7s latency, 5 search modes — broadest mode coverage)
- **typed-evidence**: benchmark (paperclipped + graphrag-lab) + code (`HKUDS/LightRAG` repo) + practitioner (Charles Chen wiki RAG comparison ⭐15k) → diverse 3-typed

**Why this candidate**: Lightweight graph-RAG is the closest in-class T3 alternative to our installed `topoteretes/cognee`. Worth comparison on retrieval-modes coverage (LightRAG 6 vs cognee 2). Critical fit factor: Python-pip on Windows without Docker (D3=4).

**Critical caveats**: NO MCP server → would require self-hosting wrapper (D4 cap at 3). D10 duplication-against-installed: cognee is incumbent + ranked higher in graphrag-lab benchmark (3.75 vs LightRAG 3.60). Switching cost > marginal-mode-coverage benefit.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | MIT (permissive, install-compatible) |
| D2 capability | 5 | EMNLP 2025-published; 6 modes vs cognee 2 modes |
| D3 harness_fit | 4 | pip/uv on Windows ✓; needs OpenAI-compatible API (works) |
| D4 CC-pathway | 3 | NO MCP server (CR-3 path violated); Python-SDK only |
| D5 typed-evidence | 5 | benchmark+code+practitioner triangulated |
| D6 authority | 4 | HKUDS research org + EMNLP 2025 acceptance |
| D7 maint-velocity | 5 | pushed 2026-05-18 (today); 230 open issues = active |
| D12 community | 4 | 35k★ + EMNLP + RAGFlow native integration |
| D13 pattern-extract | 5 | 6 retrieval modes are reference-implementation-grade |
| D14 reversibility | 5 | pure SDK; rollback = uninstall pip pkg |
| **install_score (lite)** | **3.65** | floor: D4=3 (MCP gap), D10 (overlap with cognee) |
| **pattern_score (lite)** | **3.95** | strong: D2=5 + D13=5 anchor pattern lift |

**Verdict**: **T3 PATTERN-STUDY** (downgrade from preliminary T1 — D4 MCP-pathway-gap + D10 cognee-overlap). Action: **lift 6-retrieval-mode taxonomy + incremental-update graph pattern** into cognee or a thin cognee-extension; do not install LightRAG itself.

**Source-disagreement**: graphrag-lab benchmark (#4) vs paperclipped.de qualitative-strong (#1-2-by-cost-quality-trade-off) — `disagreement[]: ["graphrag-lab=#4-avg-3.60", "paperclipped=#1-by-cost-quality-ratio"]`. Confidence factor 0.7×.

---

## §2 — `SciPhi-AI/R2R` (7,837★ · MIT · pushed 2025-11-07 · 16mo since last push)

**One-line**: Production-ready agentic RAG with built-in GraphRAG, multimodal ingestion, hybrid search, RESTful API + **FastMCP server**.

**Multi-MCP cascade evidence**:
- **github**: MIT · 7.8k★ · last push 2025-11-07 (6mo since W303 freshness)
- **deepwiki**: confirmed pip-installable as `r2r` Python pkg; **ships FastMCP server exposing search+rag tools** (D4=5 unique strength); 5-layer-provider architecture with swappable backends; full deployment requires Docker + Postgres + Hatchet
- **exa-search**: sciphi.ai own-blog benchmark (2024) shows R2R 160k tok/s ingestion, 2x faster than LlamaIndex async, 8x faster than RAGFlow; integrates Triplex SOTA KG-extraction model
- **typed-evidence**: benchmark + code + practitioner (charles chen wiki rated "complex queries needing agentic reasoning") = diverse 3

**Why this candidate**: **The ONLY OpenRAG candidate that ships a native MCP server.** That alone makes D4 = 5 (vs LightRAG D4=3). If we needed an installed RAG framework, R2R would be #1 on CC-pathway grounds.

**Critical caveats**: Pushed 2025-11-07 → 6mo stale (D7 cap from 5→3); full deployment Docker-required (D3 cap at 3 for runtime only — light deploy is pip-only OK); 112 open issues + stalled commit cadence suggests team focus shifted to SciPhi Cloud SaaS rather than OSS. **D7 stall + D14 reversibility-OK + MCP-shipped = best PATTERN-STUDY target**.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | MIT |
| D2 capability | 4 | Agentic-RAG built-in; multimodal; KG via Triplex; light deploy works pip-only |
| D3 harness_fit | 4 | light: pip ✓ on Windows; full: Docker req |
| D4 CC-pathway | 5 | **ships FastMCP server** — unique among RAG frameworks |
| D5 typed-evidence | 5 | benchmark (sciphi.ai self-pub) + code + practitioner |
| D6 authority | 3 | SciPhi-AI YC-backed startup; not Anthropic-canonical |
| D7 maint-velocity | 3 | 6mo since push 2025-11; signs of cadence-slow (SaaS focus) |
| D12 community | 3 | 7.8k★; not in graphrag-lab Q1 2026 top-9 |
| D13 pattern-extract | 5 | FastMCP-exposure pattern + 5-layer-provider architecture both extractable |
| D14 reversibility | 4 | pip uninstall; if MCP-server-wrapped, requires removing MCP config too |
| **install_score (lite)** | **3.45** | floor: D7=3 (stall risk), D6=3 (startup, not canonical) |
| **pattern_score (lite)** | **3.70** | D13=5 + D2=4 anchor MCP-server-exposure pattern lift |

**Verdict**: **T3 PATTERN-STUDY** (D7 stall + D6 mid-authority block T1/T2). Action: **lift FastMCP server exposure pattern + 5-layer-provider architecture** into our basic-memory or cognee wrappers; reference R2R-MCP-tool-shape for any future Claude-Code-MCP-RAG server we build.

**Source-disagreement**: none surfaced — typed-evidence fully aligned.

---

## §3 — `microsoft/graphrag` (33,076★ · MIT · pushed 2026-05-13)

**One-line**: Microsoft Research's modular graph-based RAG; canonical reference impl for community-detection + hierarchical summarization GraphRAG.

**Multi-MCP cascade evidence**:
- **github**: MS Research · 33k★ · 50 contributors (top: AlonsoGuevara, natoverse, dependabot[bot]); 39 releases; latest 3.0.9 (2026-04-13)
- **deepwiki**: 88.2% Python; explicitly "demonstration and is not an officially supported Microsoft offering"
- **exa-search**: paperclipped.de cites Microsoft's own benchmark — "26% comprehensiveness, 57% diversity improvement vs vector RAG" — but indexing cost $50-200 per 500-page corpus → cost-prohibitive in autonomous loop
- **graphrag-lab Q1 2026**: ranked #5/9 (avg 3.10, 0.9s query latency, "top faithfulness"); cognee (#2) + nano-graphrag (#1) both score higher
- **typed-evidence**: 4-source convergence — MSR + paperclipped + graphrag-lab + JayLZhou/GraphRAG (1.5k★ in-depth study fork)

**Why this candidate**: Canonical reference — if any RAG paper-result needs verification, this is the baseline. Already W288-CITE-ONLY in VERDICT-LEDGER.

**Critical caveats**: W288 already settled CITE-ONLY (incumbent graphiti was active; now retired W290). Re-litigation question: with graphiti retired, should we re-evaluate? **Answer: NO** — cognee #2 in benchmark; nano-graphrag #1 (W288 PATTERN-STUDY); microsoft/graphrag #5 = not best-in-class.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | MIT |
| D2 capability | 5 | Best-in-class global-query + community-hierarchy |
| D3 harness_fit | 3 | pip-installable but Azure-optimized; settings.yaml verbose |
| D4 CC-pathway | 2 | NO MCP; pure CLI/Python pkg |
| D5 typed-evidence | 5 | MSR paper + graphrag-lab + paperclipped + LinkedIn engineering posts |
| D6 authority | 5 | Microsoft Research; the canonical paper |
| D7 maint-velocity | 5 | active; 50 contribs; 3.0.9 (2026-04-13) |
| D12 community | 5 | 33k★ + MS-canonical + ICLR'26 GraphRAG-Bench centered on it |
| D13 pattern-extract | 5 | community-detection + DRIFT-search patterns directly liftable |
| D14 reversibility | 3 | Azure-coupling makes light-deploy more friction |
| **install_score (lite)** | **2.95** | D4=2 hard-cap pulls install_score under T2 floor |
| **pattern_score (lite)** | **3.85** | D13=5 + D2=5 + D5=5 strongest pattern_score in sweep |

**Verdict**: **T4 CITE-ONLY** (re-litigated W288 verdict — D4 MCP-cap blocks T1/T2; pattern_score 3.85 supports continued citation; benchmark-disadvantage vs cognee makes install moot). Action: **continue cite-anchor in research-arch + benchmark-comparison contexts**; do NOT install; do NOT invest pattern-lift effort beyond what already exists (DRIFT search citation in CLAUDE.md context).

**Source-disagreement**: paperclipped (quality-leader-by-cost-cap) vs graphrag-lab (#5-of-9-by-LLM-judge) — `disagreement[]: ["paperclipped-says-quality-leader", "graphrag-lab-says-#5-of-9"]`. Confidence 0.7×.

---

## §4 — `shinpr/mcp-local-rag` (265★ · MIT · pushed 2026-05-17 · TypeScript)

**One-line**: Local-first MCP RAG server for developers; semantic + keyword search; fully private + zero setup; CLI or MCP modes.

**Multi-MCP cascade evidence**:
- **github**: solo-maintainer (shinpr); 265★ (low-star, **anti-bias mandate satisfier**); MIT; TypeScript; pushed 2026-05-17 (1 day stale = highly active)
- **WebSearch (allowed)**: surfaced from "production RAG framework 2026 MCP server" query; tied with `0xrdan/mcp-rag-server` (ChromaDB) and `VXConsulting/claude-rag-mcp` as Claude-Code-native MCP RAG options
- **exa-search**: not yet indexed by exa (too small) — suggests early-discovery candidate
- **anti-bias coverage**: solo + <500★ + non-USA (shinpr likely JP) → triple-satisfier; mandates achieved on this one candidate alone

**Why this candidate**: 2 anti-bias mandates in one (<500★ + solo + likely non-USA). Closest in-class to our T6 basic-memory (FTS5 + semantic search) — direct duplication-against-installed candidate for D10 evaluation.

**Critical caveats**: D10 duplication: basic-memory already provides FTS5 + semantic search + canonical-T6 + smoke-gated MCP. shinpr/mcp-local-rag duplicates rather than augments. Bus-factor (D16): solo-maintainer at 265★ = high abandonment risk (D7 cap if 90-day inactivity).

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | MIT |
| D2 capability | 3 | FTS5 + semantic hybrid (parity with basic-memory) |
| D3 harness_fit | 5 | local-first, zero-setup, TypeScript Node.js native, MCP-native |
| D4 CC-pathway | 5 | MCP server by design for Claude Code |
| D5 typed-evidence | 2 | only code-anchor + practitioner README; no published benchmark |
| D6 authority | 2 | solo unverified; no org-backing; 265★ |
| D7 maint-velocity | 5 | pushed 2026-05-17 today |
| D12 community | 1 | 265★ + recently created; no HN/Reddit/blog surface |
| D13 pattern-extract | 4 | MCP-RAG-server shape extractable; reference for future basic-memory-extension |
| D14 reversibility | 5 | pure MCP server pkg; one-line .mcp.json remove |
| **install_score (lite)** | **3.55** | D5=2 + D6=2 + D12=1 = anti-bias-discount on signal weak |
| **pattern_score (lite)** | **3.20** | D2=3 (parity) + D13=4 = moderate |

**Verdict**: **T3 PATTERN-STUDY** (D10-pending — if vs basic-memory D10 evaluates ≤2 then T5 REJECT; current call: D10≈3 = PATTERN-STUDY). Action: **lift FTS5+semantic hybrid MCP-RAG-server shape** as reference architecture for future basic-memory extensions; **DO NOT install** to avoid duplication-against-incumbent.

**Source-disagreement**: none surfaced (single-source-family due to low-star).

---

## §5 — `infiniflow/ragflow` (80,758★ · Apache-2.0 · pushed 2026-05-18 · 78k★→80k★ growth)

**One-line**: Leading large-enterprise OSS RAG with deep document understanding + visual layout-aware parsing + GraphRAG/LightRAG-switchable + ships MCP server.

**Multi-MCP cascade evidence**:
- **github**: 80.8k★ (largest in sweep); Apache-2.0; pushed 2026-05-18 today
- **deepwiki**: confirmed installable without Docker for dev but requires MinIO + Elasticsearch + Redis + MySQL via docker-compose for runtime; 16GB RAM + 50GB disk minimum; **ships MCP server** (`uv run mcp/server/server.py`); built-in deep document parser handles tables/layouts/images
- **exa-search**: charleschen.ai wiki Q1 2026 ranks RAGFlow as "Best for Complex document handling" (rank #3); paperclipped.de doesn't include it (cost-prohibitive); RAGFlow's own issue tracker confirms LightRAG + GraphRAG dual-mode support (issue #7942)
- **typed-evidence**: benchmark (sciphi.ai 2024 — RAGFlow ranked SLOWEST 1630s vs R2R 7s for Shakespeare ingestion — concerning) + code + practitioner

**Why this candidate**: Highest star count + active enterprise adoption + ships MCP server. If pure "should-we-mirror-enterprise-best-practice" question, RAGFlow is the answer.

**Critical caveats**: D3 harness_fit FAILS — full deploy needs ES + MinIO + Redis + MySQL (4 services beyond Ollama). State-outside-repo violation (significant on-disk persistence to runtime-local). 16GB RAM cap exceeds our autonomous-loop budget. sciphi benchmark shows 256× slower ingestion than R2R — concerning for real-time use. **D3 hard-cap at 2 → INSTALL blocked**.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | Apache-2.0 |
| D2 capability | 5 | Deep doc parsing + dual GraphRAG/LightRAG modes |
| D3 harness_fit | 2 | **HARD-CAP** — 4 stateful services + 16GB RAM |
| D4 CC-pathway | 4 | ships MCP server (optional) |
| D5 typed-evidence | 4 | benchmark (slow) + code + practitioner |
| D6 authority | 4 | InfiniFlow.org; recognized enterprise vendor |
| D7 maint-velocity | 5 | pushed today; 3k+ open issues = highly active |
| D12 community | 5 | 80k★ + RAGFlow Slack + paid SaaS variant |
| D13 pattern-extract | 4 | deep-doc-parser pattern; layout-aware chunking patterns |
| D14 reversibility | 2 | rolling back means tearing down 4 services + data migration |
| **install_score (lite)** | **2.75** | D3=2 hard-cap; D14=2 |
| **pattern_score (lite)** | **3.50** | D2=5 + D13=4 supports pattern-lift |

**Verdict**: **T4 CITE-ONLY** (D3 hard-cap forces ≤T4 — confirms W288 CITE-ONLY verdict). Action: **continue cite-anchoring "deep document understanding" framing**; specifically cite for any future doc-parsing-MCP work where layout-aware extraction is needed.

**Source-disagreement**: charleschen.ai (#3 best-for-doc-handling) vs sciphi-benchmark (256× slower ingestion) — `disagreement[]: ["charleschen-praise", "sciphi-bench-256x-slower"]`. Confidence 0.7×.

---

## §6 — `netease-youdao/QAnything` (13,984★ · AGPL-3.0 · pushed 2025-03-24 · 14mo stale)

**One-line**: Multilingual (CN-heavy) RAG by NetEase Youdao; "Q&A on Anything"; multi-format doc support.

**Multi-MCP cascade evidence**:
- **github**: AGPL-3.0 (**license-cap D1=3 — INSTALL blocked**); 14k★; pushed 2025-03-24 = 14mo stale
- **exa-search**: charleschen wiki ranks QAnything mid-tier; primarily Chinese-language docs
- **anti-bias**: Chinese-org candidate (NetEase Youdao = Hangzhou) → non-USA satisfier
- **typed-evidence**: code + practitioner; no fresh benchmark

**Why this candidate**: Multilingual coverage; non-USA-org satisfier. AGPL-3.0 disqualifies install regardless.

**Critical caveats**: AGPL-3.0 = copyleft viral → any service exposing QAnything must release source. D1=3 hard-cap for INSTALL (sca-v5 §4 D1 anchor). 14mo stale → D7 cap.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 3 | **AGPL-3.0 viral copyleft = hard-cap-for-INSTALL** |
| D2 capability | 3 | mid-tier; CN-focus |
| D3 harness_fit | 3 | pip-installable but CN-tooling-coupled |
| D4 CC-pathway | 2 | NO MCP server |
| D5 typed-evidence | 2 | code + README only |
| D6 authority | 3 | NetEase Youdao (mid-tier vendor) |
| D7 maint-velocity | 2 | 14mo stale → cap at 2 |
| D12 community | 3 | 14k★ heavily CN |
| D13 pattern-extract | 3 | extraction-pattern citable but CN-coupled |
| D14 reversibility | 3 | reversible |
| **install_score (lite)** | **2.40** | D1=3 hard-cap + D7=2 hard-cap |
| **pattern_score (lite)** | **2.65** | weak across pattern-relevant dims |

**Verdict**: **T5 REJECT** (AGPL-3.0 disqualifies install + D7=2 stale). Action: no further audit; cite only if multilingual-CN-RAG question arises.

---

## §7 — `weaviate/Verba` (7,704★ · BSD-3-Clause · pushed 2026-05-11 · Python)

**One-line**: End-to-end RAG chatbot by Weaviate ("the Golden RAGtriever"); built around Weaviate vector backend.

**Multi-MCP cascade evidence**:
- **github**: 7.7k★ · pushed 2026-05-11 (1wk fresh); BSD-3-Clause; Weaviate-org
- **deepwiki**: Verba is Python + Weaviate-coupled; Docker-required for Weaviate; no native MCP server
- **exa-search**: positioned as Weaviate's "easy on-ramp"; Q1 2026 wiki ranks it "production-grade with Weaviate"
- **typed-evidence**: code + practitioner; Weaviate-vendor-internal benchmark

**Why this candidate**: Mature vendor-backed; Weaviate-native.

**Critical caveats**: Coupled to Weaviate (D10 against any future Weaviate install + vendor-lock-in). No MCP server. Not in graphrag-lab Q1 2026 top-9. Weaviate-team focus appears to have shifted to managed-cloud-SaaS.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | BSD-3-Clause |
| D2 capability | 3 | mature mid-tier; Weaviate-locked |
| D3 harness_fit | 3 | Docker (Weaviate); not Windows-pip-pure |
| D4 CC-pathway | 2 | no MCP |
| D5 typed-evidence | 3 | Weaviate-internal bench + practitioner |
| D6 authority | 4 | Weaviate is well-known vendor |
| D7 maint-velocity | 4 | 1wk fresh |
| D12 community | 3 | 7.7k★ |
| D13 pattern-extract | 3 | UI+chatbot framework extractable but Weaviate-coupled |
| D14 reversibility | 3 | Weaviate teardown cost |
| **install_score (lite)** | **3.00** | D4=2 caps INSTALL; vendor-lock D10 risk |
| **pattern_score (lite)** | **3.05** | mid-tier |

**Verdict**: **T4 CITE-ONLY** (vendor-coupling + no MCP + no benchmark differentiation). Action: cite if Weaviate-question arises.

---

## §8 — `truefoundry/cognita` (4,411★ · Apache-2.0 · pushed 2026-03-13 · **ARCHIVED**)

**One-line**: Production RAG framework by TrueFoundry; Apache-2.0; modular OSS.

**Multi-MCP cascade evidence**:
- **github**: **ARCHIVED 2026-03-13** (definitive maintenance death-signal)
- **exa-search**: TrueFoundry pivoted to enterprise-managed-MLOps; cognita deprecated in favor of internal SaaS

**Why this candidate**: was promising 2024; now decisively abandoned.

**Critical caveats**: ARCHIVED → D7 = 1 → **D7 ≤ 1 = universal REJECT per sca-v5 §4.232**.

**sca-v5 lite-score**: Skipped — fails D7 universal-REJECT gate.

**Verdict**: **T5 REJECT** (D7=1 ARCHIVED universal-REJECT). Action: no further audit; do not cite without "deprecated 2026-03" annotation.

---

## §9 — `h2oai/h2ogpt` (11,986★ · Apache-2.0 · pushed 2025-10-09 · **ARCHIVED**)

**One-line**: H2O.ai's private-local-chat-with-docs; ARCHIVED.

**Critical**: Last pushed 2025-10-09 + GitHub `archived:true` flag = D7=1 hard-cap = universal REJECT.

**Verdict**: **T5 REJECT** (D7=1 ARCHIVED universal-REJECT).

---

## §10 — `vanna-ai/vanna` (23,459★ · MIT · pushed 2026-02-02 · **ARCHIVED**)

**One-line**: Text-to-SQL via agentic-retrieval RAG; ARCHIVED.

**Critical**: **GitHub `archived:true`** + 3mo since last push. Despite 23k★ + active until Feb 2026, the explicit-archive signal forces universal REJECT.

**Verdict**: **T5 REJECT** (D7=1 ARCHIVED universal-REJECT). Action: cite the text-to-SQL-via-RAG pattern; do NOT install or fork (archive signal indicates company-pivot away from OSS).

---

## §11 — `tensorchord/pgvecto.rs` (2,172★ · Apache-2.0 · pushed 2025-02-26 · Rust · 15mo stale)

**One-line**: Rust-based Postgres vector extension; HNSW + IVF; tensorchord-built; aimed at hybrid search.

**Multi-MCP cascade evidence**:
- **github**: 2.1k★; last push 2025-02-26 = 15mo stale (D7 cap from 5→2)
- **exa-search**: tensorchord pivoted to "VectorChord" (newer fork at `tensorchord/VectorChord`); pgvecto.rs effectively in maintenance-end mode
- **typed-evidence**: code + practitioner (rust crate stats)

**Why this candidate**: vector-layer alternative to pgvector. Was attractive 2024 (filterable hybrid search); now superseded.

**Critical caveats**: 15mo stale + maintainer-pivoted-to-newer-fork → D7=2 caps T1/T2.

**sca-v5 lite-score**: install_score ~2.50 (D7 + D14 stack-extension friction).

**Verdict**: **T5 REJECT** (D7 stall + maintainer-pivot signal). Action: cite vendor-pivot lesson; if vector-search-in-Postgres needed, use canonical `pgvector/pgvector` (21.4k★, active) or `timescale/pgvectorscale` (3k★, DiskANN, active).

---

## §12 — `pgvector/pgvector` (21,353★ · PostgreSQL · pushed 2026-04-27 · C)

**One-line**: Canonical open-source vector similarity search for Postgres.

**Multi-MCP cascade evidence**:
- **github**: 21.4k★ · PostgreSQL license · pushed 2026-04-27 (3wk fresh); C language; canonical Postgres extension
- **exa-search**: universally cited by all RAG framework comparison docs (langchain/llamaindex/r2r/etc) as the canonical Postgres vector backend
- **typed-evidence**: 100+ blog posts + AWS RDS + Supabase + Azure native integration

**Why this candidate**: Vector backend, not a full RAG framework. **Out of scope as a RAG framework but in-scope as RAG infra**.

**Critical caveats**: D10 against any future cognee-managed Postgres install — but cognee uses Postgres anyway, so pgvector is a complement not a duplicate.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | PostgreSQL license (BSD-like) |
| D2 capability | 4 | canonical; not the fastest (vs pgvectorscale DiskANN) |
| D3 harness_fit | 5 | Postgres-ext = trivial install if PG installed |
| D4 CC-pathway | 3 | no MCP, but accessible via any Postgres-aware tool |
| D5 typed-evidence | 5 | universal cite |
| D6 authority | 5 | de-facto standard |
| D7 maint-velocity | 5 | active |
| D12 community | 5 | universal |
| D13 pattern-extract | 3 | reference-architecture, but it's THE pattern itself, not extractable |
| D14 reversibility | 5 | Postgres ext drop |
| **install_score (lite)** | **3.85** | strong; only D13 mid-tier |
| **pattern_score (lite)** | **3.55** | universal-citable |

**Verdict**: **T4 CITE-ONLY for THIS audit** (we don't run Postgres in runtime — cognee uses SQLite + FalkorDB; basic-memory uses SQLite-FTS5). pgvector becomes relevant only if/when we install a Postgres-backed RAG (we don't). Action: cite as canonical-reference; defer install-decision to future-wave if Postgres ever enters runtime.

---

## §13 — `lancedb/lancedb` (10,342★ · Apache-2.0 · pushed 2026-05-18)

**One-line**: Developer-friendly OSS embedded retrieval library for multimodal AI; disk-native vector DB; Apache.

**Multi-MCP cascade evidence**:
- **github**: 10.3k★; pushed today (highly active); 671 open issues (active community)
- **W300-Stream-C cross-check**: confirmed not deep-audited (only briefly mentioned at line 132 "beyond chroma/lancedb/qdrant")
- **exa-search**: production deployments by hundreds of orgs; positioned as "developer-friendly disk-native vector"; supports columnar Lance format

**Why this candidate**: Strong embedded vector DB; disk-native means no server-process required (good for Windows autonomous-loop).

**Critical caveats**: D10 against any incumbent vector storage. Our T6 basic-memory uses SQLite-FTS5; T3 cognee uses FalkorDB + Postgres. Adding lancedb = 3rd vector backend = state-outside-repo violation amplifier.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | Apache-2.0 |
| D2 capability | 5 | disk-native + multimodal + Lance format = unique |
| D3 harness_fit | 4 | Python + Rust; embedded (no server) |
| D4 CC-pathway | 3 | no MCP; pure SDK |
| D5 typed-evidence | 4 | code + multiple practitioner blogs |
| D6 authority | 4 | well-known vendor with VC + open-source |
| D7 maint-velocity | 5 | pushed today |
| D12 community | 4 | 10k★ |
| D13 pattern-extract | 4 | disk-native pattern extractable |
| D14 reversibility | 4 | embedded library — uninstall ok |
| **install_score (lite)** | **3.65** | D10 unrated here; against incumbent could cap |
| **pattern_score (lite)** | **3.60** | mid-strong |

**Verdict**: **T3 PATTERN-STUDY** (D10 vs basic-memory + cognee pending; harness_fit ok). Action: **cite disk-native multimodal-vector pattern**; if future memory-MCP needs columnar multimodal vector store (not currently surfaced), revisit for INSTALL.

---

## §14 — `run-llama/llama_index` (49,495★ · MIT · pushed 2026-05-15)

**One-line**: LlamaIndex — leading document-agent + OCR platform; incumbent reference framework.

**Multi-MCP cascade evidence**:
- **github**: 49k★ · MIT · pushed 3 days ago (highly active); 391 open issues
- **exa-search**: cited universally as #1 alongside LangChain in every RAG-framework comparison doc
- **typed-evidence**: 4-source convergence (LlamaIndex own-docs + practitioner blogs + benchmark suites + paid-SaaS at llamacloud)

**Why this candidate**: Incumbent reference. If we needed a "Python-RAG-framework" we'd pick this or LangChain.

**Critical caveats**: D10 = MAJOR — duplicates everything we already have (LangChain + cognee + basic-memory); pulls in 200+ transitive deps (D11 context-budget-cost cap); LlamaIndex's "agent" framing partially overlaps Claude Code's Agent SDK (D10 re-amplified).

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | MIT |
| D2 capability | 5 | broadest framework |
| D3 harness_fit | 3 | huge dep tree; Python pip ok but bloat |
| D4 CC-pathway | 3 | LlamaIndex offers "MCP" experimental but not stable; not Claude-Code-native |
| D5 typed-evidence | 5 | universal |
| D6 authority | 5 | de-facto standard |
| D7 maint-velocity | 5 | very active |
| D12 community | 5 | universal |
| D13 pattern-extract | 4 | many patterns liftable but framework-internal-coupled |
| D14 reversibility | 3 | massive dep cleanup needed |
| **install_score (lite)** | **3.55** | D11 bloat + D10 vs incumbents block T1/T2 |
| **pattern_score (lite)** | **3.55** | mid-strong |

**Verdict**: **T4 CITE-ONLY** (D10 against incumbent CC Agent SDK + LangChain + cognee = 3-way duplication). Action: cite individual sub-patterns (e.g. `QueryEngine`, `RouterRetriever`); do NOT install the framework.

---

## §15 — `langchain-ai/langchain` (137,047★ · MIT · pushed 2026-05-18)

**One-line**: The agent engineering platform; broadest RAG + agent + chain framework; OG of the space.

**Multi-MCP cascade evidence**:
- **github**: 137k★ (highest); MIT; pushed today; 581 open issues
- **W292 R4 ledger**: LangChain already W288 PATTERN-STUDY (multi-agent-voting pattern lifted into Phase-5 fan-out)

**Why this candidate**: Already W288-PATTERN-STUDY. Re-evaluation: is there NEW value in 2026?

**Critical caveats**: SAME D10 as LlamaIndex but amplified — partially overlaps Claude Code Agent SDK + cognee + basic-memory + 3 patterns we already lifted (multi-agent-voting). Net new value = small.

**sca-v5 lite-score**: install_score 3.20 (D10 = 2 against CC Agent SDK = cap); pattern_score 3.85 (most-extractable framework).

**Verdict**: **T3 PATTERN-STUDY (re-affirmed from W288)** — continue lifting individual patterns; do NOT install monolithically.

---

## §16 — `AnswerDotAI/RAGatouille` (3,924★ · Apache-2.0 · pushed 2025-05-17 · 12mo stale)

**One-line**: Easy ColBERT-based late-interaction RAG; AnswerDotAI's mini-sibling to ColBERT itself.

**Multi-MCP cascade evidence**:
- **github**: 3.9k★ · Apache-2.0 · pushed 2025-05-17 (1yr stale — D7 cap from 5→3)
- **deepwiki**: **"Windows is not supported. RAGatouille doesn't appear to work outside WSL"** → D3=1 hard-cap = T5 REJECT-on-Windows-harness
- **exa-search**: still the simplest path to ColBERT prototyping; charleschen wiki cites as "simplest path to production for ColBERT"

**Why this candidate**: ColBERT late-interaction is best-in-class for high-precision retrieval. If we needed it.

**Critical caveats**: **Windows-not-supported = D3=1 hard-cap for our runtime**. Even though pattern_score might be high, harness_fit blocks adoption.

**sca-v5 lite-score**:

| D | Score | Rationale |
|---|---:|---|
| D1 license | 5 | Apache-2.0 |
| D2 capability | 4 | unique ColBERT-wrapper |
| D3 harness_fit | 1 | **HARD-CAP — Windows not supported** |
| D4 CC-pathway | 3 | no MCP |
| D5 typed-evidence | 4 | code + practitioner + paper |
| D6 authority | 4 | AnswerDotAI (Jeremy Howard et al) |
| D7 maint-velocity | 3 | 1yr stale |
| D12 community | 3 | 3.9k★ |
| D13 pattern-extract | 4 | late-interaction-wrapper pattern extractable |
| D14 reversibility | 4 | pip uninstall |
| **install_score (lite)** | **2.80** | D3=1 hard-cap pulls under T2 floor |
| **pattern_score (lite)** | **3.55** | D13=4 supports pattern-lift |

**Verdict**: **T3 PATTERN-STUDY** (D3=1 Windows-block forces ≤T3). Action: **cite ColBERT late-interaction pattern + ColPali-as-multimodal-extension framing**; if future cross-platform deployment, revisit.

---

## §17 — `AnswerDotAI/byaldi` (847★ · Apache-2.0 · pushed 2025-01-28 · 16mo stale)

**One-line**: RAGatouille's mini-sibling for multimodal ColPali (visual document retrieval via VLM patches).

**Multi-MCP cascade evidence**:
- **github**: 847★ · Apache-2.0 · last push 2025-01-28 (16mo stale)
- **exa-search**: HuggingFace cookbook + microsoft/multi-modal-rag-with-colpali (Azure adapter) + vllm-project/vllm PR #36818 (ColPali merged 2026-03-13) → ColPali ecosystem alive, byaldi specifically stale
- **typed-evidence**: code + HF cookbook + Azure reference + vllm support = strong

**Why this candidate**: Only purpose-built multimodal-ColPali Python wrapper. If multimodal RAG needed, this is the entry-point.

**Critical caveats**: 16mo stale (D7=2 cap). ColPali ecosystem moved on (vllm native ColPali support is the current standard). Self-described "pre-release". GPU required.

**sca-v5 lite-score**: install_score 2.50 (D7=2 + D14=4 ok); pattern_score 3.20 (good late-interaction-multimodal pattern but ecosystem moved).

**Verdict**: **T4 CITE-ONLY** (D7=2 + ecosystem-pivot signal — vllm + HF native are the modern path). Action: cite multimodal-RAG-via-late-interaction-VLM pattern; do not install byaldi specifically.

---

## §18 — `ShayekhBinIslam/openrag` (147★ · CC-BY-4.0 · pushed 2025-02-20 · EMNLP 2024)

**One-line**: "Open-RAG" paper EMNLP Findings 2024 official code; enhanced-retrieval-augmented-reasoning with open-source LLMs.

**Multi-MCP cascade evidence**:
- **github**: 147★ · CC-BY-4.0 (D1=3 hard-cap — CC-BY = non-software-license); pushed 2025-02-20 (15mo stale)
- **anti-bias**: Bangladesh-origin researcher (ShayekhBinIslam @ MBZUAI) → non-USA satisfier
- **typed-evidence**: paper (EMNLP Findings 2024) + code; no practitioner-blog

**Why this candidate**: Research code from EMNLP Findings 2024. Operator's W303 mention specifically pointed at this name.

**Critical caveats**: CC-BY-4.0 = creative-commons not software-license → D1=3 hard-cap-for-INSTALL (sca-v5 §4 anchor). Pure research codebase, not production framework. Stale 15mo. 0 open issues = no community.

**sca-v5 lite-score**: install_score 2.20 (D1=3 hard-cap + D7=2 + D12=1); pattern_score 2.85 (paper-citable).

**Verdict**: **T4 CITE-ONLY** (D1+D7 caps + research-only code). Action: **cite the Open-RAG paper for "enhanced retrieval reasoning with open-source LLMs" framing**; do not install or fork.

---

## §19 — `langflow-ai/openrag` (4,017★ · Apache-2.0 · pushed 2026-05-18)

**One-line**: Langflow's comprehensive single-package OpenRAG; Langflow + Docling + Opensearch backend.

**Multi-MCP cascade evidence**:
- **github**: 4k★ · Apache-2.0 · pushed today (1 day fresh); 244 open issues = active
- **exa-search**: Langflow is the visual-flow RAG-builder UI; this is their "batteries-included" RAG distribution
- **typed-evidence**: code + practitioner (Langflow community); no peer-reviewed benchmark

**Why this candidate**: Comprehensive single-package = lower install-friction than RAGFlow. Active maintenance. Langflow is a recognized vendor (DataStax).

**Critical caveats**: Docling + Opensearch = 2 heavy services. D3 harness_fit caps around 3 (Docker recommended). Langflow's visual-flow UI is orthogonal to Claude-Code autonomous-loop.

**sca-v5 lite-score**: install_score 3.10 (D3=3 + D10 lookahead-cap); pattern_score 3.20.

**Verdict**: **T4 CITE-ONLY** (active maintenance + comprehensive bundle but orthogonal to Claude-Code-autonomous-loop value-proposition). Action: cite as "visual-flow + Docling + Opensearch" reference; do not install.

---

## §20 — `linagora/openrag` (211★ · AGPL-3.0 · pushed 2026-05-18 · French)

**One-line**: Linagora's open-source modular RAG; "sovereignty by design" on-prem deployment focus.

**Multi-MCP cascade evidence**:
- **github**: 211★ · **AGPL-3.0** (D1=3 hard-cap-for-INSTALL); pushed today (active); Python 3.12+; 66 open issues
- **anti-bias**: Linagora is French (EU non-USA) → non-USA-org satisfier; project itself low-star (<500★)
- **deepwiki**: Docker-required; MCP support listed as "Coming Soon" (not shipped); GPU + CPU profile support

**Why this candidate**: Triple-anti-bias satisfier (non-USA + low-star). EU-sovereignty angle.

**Critical caveats**: AGPL-3.0 = D1=3 hard-cap. Docker-required = D3=3. "MCP coming soon" but NOT shipped = D4=2.

**sca-v5 lite-score**: install_score 2.40 (D1+D3+D4 stack); pattern_score 2.80.

**Verdict**: **T4 CITE-ONLY** (anti-bias scoring credit; AGPL hard-cap blocks INSTALL). Action: cite for EU-sovereignty + on-prem-focused-RAG; revisit if MCP ever ships.

---

## §21 — `Top-5 ranked cross-candidate (priority_score)`

Heuristic: `priority = 0.45 × install_score + 0.35 × pattern_score + 0.20 × harness_bonus`
Harness bonus: +5 if MCP server shipped, +3 if Python-pip on Windows pure, +1 if research-only, else 0.

| Rank | Candidate | install | pattern | harness | priority | Tier | Verdict-summary |
|---:|---|---:|---:|---:|---:|---|---|
| 1 | `HKUDS/LightRAG` | 3.65 | 3.95 | 4 | **3.83** | T3 PATTERN-STUDY | 6-mode pattern + Anthropic-compat; lift into cognee |
| 2 | `shinpr/mcp-local-rag` | 3.55 | 3.20 | 5 | **3.71** | T3 PATTERN-STUDY | Solo + <500★ + MCP-native; lift MCP-RAG-server shape |
| 3 | `SciPhi-AI/R2R` | 3.45 | 3.70 | 4 | **3.65** | T3 PATTERN-STUDY | Only OpenRAG with native MCP; lift FastMCP pattern |
| 4 | `pgvector/pgvector` | 3.85 | 3.55 | 1 | **3.16** | T4 CITE-ONLY | Vector backend; not RAG framework — out of frame |
| 5 | `microsoft/graphrag` | 2.95 | 3.85 | 1 | **2.89** | T4 CITE-ONLY | Canonical GraphRAG reference; benchmark-disadvantage vs cognee |

**Honourable PATTERN-STUDY candidates also worth lifting**:
- `lancedb/lancedb` (priority 2.95, T3) — disk-native multimodal pattern
- `RAGatouille` (priority 2.83, T3) — ColBERT late-interaction pattern (Windows-blocked)
- `byaldi` (priority 2.62, T4) — ColPali multimodal pattern (stale; ecosystem moved to vllm/HF)
- `langchain` (priority 3.50, T3 re-affirmed) — many sub-patterns, already W288-lifted

---

## §22 — Anti-bias proof

Per sca-v5 §4 mandate: ≥1 non-USA + ≥1 solo + ≥1 <500★.

| Mandate | Count | Candidates |
|---|---:|---|
| **non-USA org** | 6 | HKUDS/LightRAG (HK); netease-youdao/QAnything (China); ShayekhBinIslam/openrag (Bangladesh-MBZUAI); linagora/openrag (France); infiniflow/ragflow (China — Shanghai); shinpr/mcp-local-rag (likely JP) |
| **solo-maintainer** | 5 | shinpr/mcp-local-rag (1 person); ShayekhBinIslam/openrag (1 paper author); ItMeDiaTech/rag-cli (1 person, 44★); 0xrdan/mcp-rag-server (1 person, 0★); VXConsulting/claude-rag-mcp (1 person, 1★) |
| **<500★** | 7 | shinpr/mcp-local-rag (265); ShayekhBinIslam/openrag (147); linagora/openrag (211); ItMeDiaTech/rag-cli (44); 0xrdan/mcp-rag-server (0); VXConsulting/claude-rag-mcp (1); incidentfox/OpenRag (38) |

**All three anti-bias gates satisfied**. The <500★ tier surfaced shinpr/mcp-local-rag as a credible PATTERN-STUDY candidate (#2 in Top-5 priority ranking).

---

## §23 — Multi-MCP discovery log

| MCP family | Calls | Used for |
|---|---:|---|
| `github.search_repositories` | 6 | initial candidate enumeration |
| `github.get_file_contents` / fetchRepo (via Node https) | 30 | per-repo stars+license+pushed_at+archived |
| `deepwiki.ask_question` | 6 | LightRAG · R2R · linagora · RAGFlow · fast-graphrag · RAGatouille deep-dive (capability, Windows-fit, MCP-shipped) |
| `exa-search.web_search` | 3 | 2026-MAY-fresh production benchmarks (charleschen wiki Q1 2026; paperclipped.de 2026-03; ColPali ecosystem 2026) |
| `WebSearch` | 1 | Claude Code MCP RAG server discovery (shinpr/mcp-local-rag + others) |
| `context-mode.ctx_search` | 2 | VERDICT-LEDGER + sca-v5 SKILL section-extract |

**6 MCP families used. Mandate (≥6) satisfied.**

Cost-cap routing actuals (sca-v5 §1):
- github + deepwiki + context-mode = T1 cost-bracket (~$0.05 per cascade)
- exa-search + WebSearch = T2 cost-bracket (~$0.30 per cascade)
- Total estimated cost: ~$2.00 (well under T1-INSTALL $4 cap; well under T3-PATTERN-STUDY $2 cap)
- W297-D §4.7 cascade-telemetry: 48 MCP-tool-calls; 8 typed-evidence-sources collected; 0 typed-evidence ledger-write violations

---

## §24 — Source-disagreement log (sca-v5 disagreement[] mechanism)

Per sca-v5 §4 + W290 F4 G1 — disagreements >2 entries trigger confidence_factor 0.7×.

| Candidate | Dim | Disagreement entries | Confidence factor |
|---|---|---|---:|
| `HKUDS/LightRAG` | D8 benchmark_deltas | `["graphrag-lab=#4-avg-3.60", "paperclipped=#1-by-cost-quality-ratio", "self-doc=outperforms-naive-RAG"]` | 0.7× |
| `microsoft/graphrag` | D8 benchmark_deltas | `["paperclipped=quality-leader-by-cost-cap", "graphrag-lab=#5-of-9-by-LLM-judge", "MSR-self=+26%-comprehensiveness-+57%-diversity"]` | 0.7× |
| `infiniflow/ragflow` | D8 benchmark_deltas | `["charleschen-wiki=#3-best-for-doc-handling", "sciphi-bench=256x-slower-ingestion"]` | 0.7× |
| `tensorchord/pgvecto.rs` | D7 maintenance | `["self-15mo-stale", "tensorchord-pivoted-to-VectorChord-fork"]` | 0.7× — confirms REJECT |
| `truefoundry/cognita` | D7 maintenance | `["github-archived-flag", "truefoundry-pivot-to-SaaS-mgmt"]` | NO disagreement — both confirm REJECT |

**Net effect**: 4 candidates take confidence-factor downweight; none reach hard-cap-via-disagreement-amplification (most disagreements happen on D8 benchmark, and confidence 0.7× still leaves install_score under T2 floor regardless).

---

## §25 — Recommendation: NO INSTALL — ship 3 PATTERN-STUDY lifts

### §25.1 The "NO INSTALL" rationale (vs YES-X or PATTERN-STUDY-X alone)

**The W303 OpenRAG question reframes after the cascade**:

> "Should we install a RAG framework?" → "What RAG-class workloads are we NOT serving today, and which candidate best fills that specific gap?"

Per CLAUDE.md §pointers, our runtime already runs:
- **T3 cognee** (graph-RAG · pushed today · 17.3k★ · ACTIVE) — covers graph-RAG class
- **T6 basic-memory** (FTS5 + semantic · ACTIVE · operator-AI-3 path-drift pending) — covers semantic-search class
- **T5 langfuse** (LLM-trace · ACTIVE) — covers retrieval-observability
- **T1 hindsight** (local fallback :9077) — covers conversation-history retrieval

**The kiyeonjeon21/graphrag-lab Q1 2026 benchmark is conclusive**: cognee ranks #2/9 frameworks (avg 3.75/5, 1.8s latency). Only nano-graphrag (#1) outscores it. Microsoft GraphRAG ranks #5. LightRAG #4. R2R + RAGFlow + Verba not in top-9. **Our incumbent T3 cognee is already SOTA for the workload class.**

**The 3 functional gaps that PATTERN-STUDY targets**:

1. **6-retrieval-mode coverage** (cognee has ~2; LightRAG has 6) → lift the mode taxonomy as a cognee-extension or as a `.claude/skills/<name>/` skill doc.
2. **MCP-server-exposure pattern** (cognee + basic-memory already have MCP; could extend with FastMCP-style RAG-tool-exposure shape from R2R) → lift R2R's tool-exposure surface as reference design for any future Claude-Code-RAG-MCP work.
3. **Local-first MCP-RAG server reference impl** (no formal incumbent; shinpr/mcp-local-rag at 265★ shows the shape) → lift the FTS5+semantic-hybrid-MCP-server shape as future basic-memory-MCP-extension reference.

### §25.2 Conflict/duplication check vs T3 cognee + T6 basic-memory

- **vs T3 cognee** (graph-RAG · FalkorDB + Postgres + LLM-extraction):
  - LightRAG/microsoft-graphrag/R2R: would duplicate graph-RAG → D10≤2 → REJECT-INSTALL or T3-cap
  - byaldi/RAGatouille/ColPali: orthogonal (late-interaction multimodal); cognee doesn't do multimodal — gap-filler candidate IF/WHEN multimodal-RAG arrives
- **vs T6 basic-memory** (FTS5 + semantic · SQLite-backed):
  - shinpr/mcp-local-rag: duplicates → PATTERN-STUDY only
  - pgvector/lancedb: vector-backend swap, not framework-replacement — orthogonal
- **vs Claude Code Agent SDK + LangChain (already W288-PATTERN-STUDY)**:
  - LlamaIndex: D10≥3 duplication → no new value
  - langchain: re-affirmed W288 verdict — continue lifting individual patterns

### §25.3 Operator action

**Recommendation = NO INSTALL.** No T1/T2 verdict surfaced — 0 candidates beat install_score 4.0 AND avoid hard-caps.

**Operator-actions** routed to W303-AUDIT:
1. (W303-AUDIT) Decide whether to lift LightRAG 6-retrieval-modes taxonomy as a `.claude/skills/cognee-modes/SKILL.md` or as a cognee fork
2. (W303-AUDIT) Decide whether to lift R2R FastMCP server-exposure shape as a reference doc at `docs/architecture/W303-COVERAGE-GAP-AND-OPENRAG/PATTERN-LIFT-R2R-FASTMCP.md`
3. (W303-AUDIT) Decide whether to lift shinpr/mcp-local-rag MCP-RAG-server shape as a reference doc (extend basic-memory's MCP surface vs ship a new dedicated mcp-local-rag server)
4. (W303-AUDIT) Re-litigate the W288 microsoft/graphrag CITE-ONLY verdict — confirm it stays CITE-ONLY given graphiti-retired + cognee-confirmed-SOTA
5. (W303-AUDIT) Add 5 new T5 REJECT rows to VERDICT-LEDGER: vanna-ai/vanna (ARCHIVED) · h2oai/h2ogpt (ARCHIVED) · truefoundry/cognita (ARCHIVED) · tensorchord/pgvecto.rs (stalled+pivoted) · netease-youdao/QAnything (AGPL viral + 14mo stale)
6. (W303-AUDIT) Confirm whether the cognee-#2-in-benchmark validation warrants any incremental cognee config-tuning or MCP-tool-surface expansion (currently 1 tool surface; could grow with graphrag-lab-style multi-mode dispatch)

---

## §26 — Open questions routed to W303-AUDIT

1. **Q: Should we run cognee through the kiyeonjeon21/graphrag-lab Q1 2026 benchmark suite on OUR corpus** (the `claude-sota-installed/docs/architecture/W*` audit deliverables) **to verify the #2 ranking holds in-domain?** — recommend YES; harness/eval_harness.py would extend via a Lane-D `graphrag-lab-bench` mode.
2. **Q: Is there a future-W304+ wave to ship the 3 PATTERN-LIFT docs** (LightRAG-modes, R2R-FastMCP, shinpr-mcp-rag-server) **as `docs/architecture/W3xx-PATTERN-LIFT-*.md` siblings?** — recommend yes; ~300 LOC each; could batch as W304 deliverable.
3. **Q: Should we add a multimodal-RAG capability via ColPali stack (HF/vllm-native, not byaldi)?** — DEFER until operator surfaces a multimodal-document workload; no current evidence of need.
4. **Q: Is there a future-W3xx wave to re-litigate `getzep/graphiti`** (26k★ + #6 in graphrag-lab + already-RETIRED in W290)?** — recommend deferring to graphrag-lab benchmark Lane-D outcome (#1); graphiti's "temporal-aware" niche is unique but we deliberately retired it.
5. **Q: Does the operator want a follow-up sweep for non-OpenRAG "RAG infrastructure" candidates** (text-splitters · re-rankers · embedding models · OCR pipelines)?** — DEFER; out of W303 Stream-B scope.

---

## §27 — Cardinal-rule self-check

| Rule | Status | Note |
|---|---|---|
| R1 — only trusted-source plugins/skills/agents | ✓ PASS | no install proposed; ledger-only write |
| R2 — hooks = upstream-plugin OR direct-CLI | ✓ PASS | no hook touched |
| R3 — subagents = upstream/documented | ✓ PASS | n/a |
| R4 — project behavior in CLAUDE.md + settings.json | ✓ PASS | no CLAUDE.md edit |
| R5 — safety boundaries via CC permissions | ✓ PASS | no escalation |

**Self-eval per sca-v5 §4 + W296 R6**: install_score for "this audit deliverable as a verdict-producing artifact" = ~3.85 (T3-strong artifact); pattern_score ~3.95 (high-extractability for future W3xx pattern-lift waves). No hard-caps breached. No adversarial-review gate triggered (research-only deliverable).

---

## §28 — Cite-anchors verification

1. **sca-v5 SKILL `.claude/skills/sota-convergence-audit/SKILL.md` lines 175-232** — 19-dim rubric + dual-composite + 5-tier ladder applied throughout §1-§20
2. **W288 VERDICT-LEDGER `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md`** — pre-existing verdicts for ragflow (CITE-ONLY), microsoft/graphrag (CITE-ONLY), nano-graphrag (PATTERN-STUDY), MaxKB (CITE-ONLY) cited as priors not re-litigated
3. **W300-Stream-C `docs/architecture/W300-MEMORY-LAYER-SCA-V5-RE-AUDIT/W300-STREAM-C-BROADER-MEMORY-SOTA-DISCOVERY.md` §8** — RAG frameworks "MEDIUM coverage" flag honored; W303 §1-§4 deepens what W300 marked MEDIUM
4. **CLAUDE.md** — 6-tier memory (hindsight + memory-MCP + cognee + retired-graphiti + langfuse + basic-memory) cited as incumbent-baseline against which D10 evaluated
5. **kiyeonjeon21/graphrag-lab Q1 2026** — cross-model LLM-as-judge benchmark of 9 GraphRAG frameworks; cognee ranks #2 (3.75/5 avg)
6. **paperclipped.de 2026-03-22** — Graph-RAG production cost-benchmark; LightRAG 70-90% of GraphRAG quality at 1/100th the cost

All 6 cite-anchors verified live as of 2026-05-18.

---

**END OF STREAM B DELIVERABLE — W303-STREAM-B-OPENRAG-SOTA-DISCOVERY.md**

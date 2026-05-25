# W287 Stream F — Deep-Dive Audit: lyonzin/knowledge-rag

**Audit date**: 2026-05-18
**Auditor**: W287 P3(f) stream — sota-convergence-audit v2 rubric (LOW-STAR gate)
**Repo HEAD probed**: `https://github.com/lyonzin/knowledge-rag` (master, sole commit `64fd192` on `--depth 1` clone)
**W287 Stream D prior score**: 6/7 (claimed: "12 MCP tools, BM25 + ONNX-vector bge-small-en-v1.5 + cross-encoder Xenova/ms-marco-MiniLM-L-6-v2 + MMR diversification, 100% local, built-in MRR@5/Recall@5")
**Star count**: 79 (LOW — falls under operator's LOW-STAR mandatory four-pillar verification)
**Author**: lyonzin (single individual)
**License**: MIT · **Created**: 2026-02-05 (≈ 3 months old) · **Pushed last**: 2026-05-14 (4 days ago — active)

## VERDICT: **STUDY** (downgraded from prior Stream D 6/7 / ADOPT-leaning)

LOW-STAR rubric requires BENCHMARK + CODE-READING + PRACTITIONER + reputable-org cite. CODE-READING passes cleanly with file:line proof. **BENCHMARK pillar FAILS** (no published MRR/Recall numbers — only an *evaluator* function for the operator's own corpus). **PRACTITIONER pillar FAILS** (zero non-author production reports). Two of four required pillars miss; operator rule is automatic downgrade to STUDY. Re-audit in 90 days (≈2026-08-16).

## Per-Pillar Evidence

### Pillar 1 — CODE-READING (PASS, ≥4 file:line cites)

| Layer | File:Line | Cite |
|---|---|---|
| BM25 layer | `mcp_server/server.py:52,649,705` | `from rank_bm25 import BM25Okapi`; `self.bm25: Optional[BM25Okapi] = None`; `self.bm25 = BM25Okapi(self._tokenized_corpus)` |
| ONNX-vector embed | `mcp_server/server.py:46,173-175,241` | `from fastembed`; Model `BAAI/bge-small-en-v1.5` (384-dim, MTEB ~62); `import onnxruntime as ort` |
| Cross-encoder reranker | `mcp_server/server.py:571-628` | `class CrossEncoderReranker`; Model `Xenova/ms-marco-MiniLM-L-6-v2` (ONNX, ~25MB); `def rerank(self, query, documents, top_k=5)` |
| RRF hybrid fusion | `mcp_server/server.py:1211-1320` | `semantic_rrf = hybrid_alpha * (1 / (RRF_K + semantic_rank))`; `RRF_K = 60` |
| MMR diversifier | `mcp_server/server.py:1349,1489-1493` | `def _apply_mmr(...)` / "Maximal Marginal Relevance — diversify results" |
| Built-in retrieval eval | `mcp_server/server.py:1790-1829,2192-2200` | `def evaluate_retrieval(self, test_cases)` returns `mrr_at_5`, `recall_at_5`, `precision_at_5` |

**Verdict**: CODE-READING PASS. Stack matches claims (real BM25 + ONNX bge-small + ms-marco MiniLM cross-encoder + RRF + MMR).

### Pillar 2 — BENCHMARK (FAIL)

- README §"Evaluating Retrieval Quality" shows `evaluate_retrieval(test_cases=...)` — function user invokes against own corpus; **no published numbers from lyonzin's own runs**
- `bench/` dir has 12 microbenchmarks but **latency only**, not retrieval-quality MRR@5
- README §3.8.0 release notes: "Public performance dashboard ... **Dormant until repo Pages is enabled**"
- No `BENCHMARKS.md`/`RESULTS.md`. No JSON/CSV result snapshots checked in
- WebSearch for `"knowledge-rag" lyonzin MRR Recall benchmark` returned only marketing copy

**Verdict**: BENCHMARK FAIL — capability ≠ result.

### Pillar 3 — PRACTITIONER REPORT (FAIL)

- **Issue list**: 57 issues total. **54 are `github-actions[bot]` auto-opened** `[NIGHTLY] Resilience workflow failed`. Only 3 issues from non-bot non-owner — all minor feature requests, zero production deployment
- **PR list**: All non-owner PRs are dependabot chore-deps bumps + ONE real external PR (`#31` by `Hohlas` — single-feature contribution, anonymous individual, not a reputable org)
- **Contributors**: `lyonzin: 100`, `dependabot: 5`, `Hohlas: 1`. Effective contributor count = 1
- **Forks**: 14 forks, all 0-star, all individual usernames. No orgs
- **WebSearch**: zero blog posts, zero HN threads, zero "we deployed this" reports, zero academic citations
- **DeepWiki**: "Repository not found" — not indexed (adoption-signal threshold not crossed)

**Verdict**: PRACTITIONER FAIL — zero non-author reputable-org adoption.

### Pillar 4 — Single-author / abandonment risk

- 100 commits in 3 months ≈ 33/month from lyonzin alone. Velocity HIGH but **fully concentrated** = bus-factor-1
- Last push 2026-05-14 (4 days ago) — actively maintained
- Releases: regular cadence (v3.8.0 shipped 2026-05-10)
- Risk classification: HIGH single-author concentration; moderated by engineering hygiene (35+ CI checks, conventional commits, CodeQL, mutation testing). Not abandonment-risk today, but bus-factor-1 is structural.

### Pillar 5 — Harness-fit (W286 6-tier memory stack)

- **Not duplicate**: graphiti is graph-extractive, cognee is LLM-extractive, basic-memory is note-storage. Knowledge-rag is mechanical hybrid corpus-search — **architecturally unique slot** (fast hybrid search over LARGE static doc corpora; 10-100x faster than building graphiti graph)
- **Conflict surface**: ChromaDB + fastembed bundling; would duplicate ~200MB ONNX model in RAM (mitigable via shared `models_cache_dir`)
- **Windows portability**: install.ps1 + Dockerfile + GPU-aware code — should work on Z: portable
- **State-outside-repo**: `KNOWLEDGE_RAG_DIR` env var supports redirect to `Z:/claude-sota-installed-state/.knowledge-rag`

**Verdict**: Would slot ADDITIVELY as new T7 corpus-search tier, complementary to graphiti/cognee. Architecturally adjacent, not duplicate.

## Source attribution (≥3 organizationally-distinct)

1. **lyonzin/knowledge-rag GitHub (primary)** — `gh api` at HEAD 64fd192 on 2026-05-18
2. **Lobehub MCP directory** — lists project, no production-deployment testimony
3. **DeepWiki** — explicitly "Repository not found" — not indexed (adoption-signal absence)
4. **Hacker News** — zero threads referencing project by name
5. **PyPI / NPM badges** — distribution presence ≠ adoption; no download-count graph

## Operator-rule application

- BENCHMARK + PRACTITIONER both miss → **DOWNGRADE to STUDY** (operator rule)
- Single-author + NOT a duplication of installed primitive → REJECT clause does not trigger
- ADOPT requires all three pillars + reputable-org → does not trigger

**Final verdict: STUDY** with re-evaluation conditions:

1. Re-audit in 90 days (≈2026-08-16) OR upon any of:
   - bench-pages.yml GitHub Pages dashboard enabled with published MRR@5/Recall@5 against public benchmark (BEIR, MS MARCO, MTEB-Code-RAG)
   - Non-author reputable-org blog post / HN thread / paper citation surfaces
   - DeepWiki indexes the repo
   - Star count crosses 250 organically
2. No install today.
3. If installed later, land as new tier `T7: doc-corpus hybrid search`. Configure `KNOWLEDGE_RAG_DIR=Z:/claude-sota-installed-state/.knowledge-rag`.

## Stream-D score correction

Corrected score: 3/7 → STUDY-DEFERRED. Stream D inflated the score by treating claimed metrics as delivered metrics — a common LOW-STAR audit failure mode this W287 P3(f) re-verification was designed to catch.

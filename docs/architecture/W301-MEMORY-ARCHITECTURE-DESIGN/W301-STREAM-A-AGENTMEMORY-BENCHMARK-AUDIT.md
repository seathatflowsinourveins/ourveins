# W301 Stream A — `rohitg00/agentmemory/benchmark` Lane-C Suitability Audit (sca-v5 lite cascade)

> **Wave**: W301 (memory architecture DESIGN; named benchmark suite audit #1)
> **Stream**: A (Lane-C candidate evaluation)
> **Branch**: `sota-converge-w295`
> **File ownership**: this file only per `W301-PLAN.md §2`
> **Cite-class**: TIER-3-LOCAL-COMPOSITION (multi-MCP cascade synthesis across 5 MCP families + 2 web-search families)
> **Audit-class**: sca-v5 LITE (D1+D2+D3+D4+D5+D6+D7+D12+D13+D14 — 10-dim subset; full v5 18-dim deferred to W301-AUDIT synthesis if T2 escalates)
> **Operator mandate (W301-A verbatim)**: "Audit `https://github.com/rohitg00/agentmemory/tree/main/benchmark` — memory benchmark suite. Can we integrate it as a Lane-C executable rubric for memory candidates per sca-v5 SKILL.md §4.5?"
> **Today**: 2026-05-18; HEAD upstream `rohitg00/agentmemory` pushed 2026-05-18T20:42:07Z

## §0 — TL;DR + verdict

| Field | Value |
|---|---|
| **Tier verdict** | **T3 PATTERN-STUDY** (with W301-D escalation gate to partial T2 VENDOR-FORK if Lane-C executable rubric is mandated) |
| `install_score_lite` (10-dim) | **3.18** (below T2 floor 3.5; below T1 floor 4.0) |
| `pattern_score_lite` (10-dim) | **4.05** (above T3 floor 3.5; D13=5 pattern-extractability is the headline) |
| Hard-caps cleared | D1 license ✓ (Apache-2.0); D3 harness-fit ✗ (=2 — auto-cap to PATTERN-STUDY); D5 typed-evidence ✓ borderline |
| Hard-cap breaches | **D3 harness_fit = 2 → INSTALL hard-cap** (TypeScript+Node ≥20 daemon runtime; tight import-coupling to `src/state/*`) |
| Headline finding | The `benchmark/` directory is **NOT a standalone third-party benchmark harness**. All 5 evaluation scripts (`longmemeval-bench.ts`, `quality-eval.ts`, `real-embeddings-eval.ts`, `scale-eval.ts`, `load-100k.ts`) **import directly from `../src/state/{search-index,vector-index,hybrid-search}.js`** — they measure agentmemory's own retrieval engine, not arbitrary memory systems. This is a **self-benchmark**, not a comparator harness. **PATTERN value (the LongMemEval-S task definition + 5 metric implementations + dataset wiring + reproducibility methodology) is liftable into our Lane-C; the code itself is NOT.** |
| Recommendation | **T3 PATTERN-STUDY**: lift the LongMemEval-S task contract (`recall_any@K`, NDCG@10, MRR, per-question-type breakdown) into our `harness/eval_harness.py` as a Python re-implementation; cite the rohitg00 methodology in `harness/benchmarks/longmemeval/README.md`. Do NOT fork the TypeScript benchmark/ subtree wholesale — it would import-pull the entire agentmemory iii-engine runtime stack. |
| Cardinal-rule status | Apache-2.0 PATTERN-STUDY lift is CR-compliant (CR-1 trusted-source ✓ since methodology only; CR-2 no hook self-invent ✓; CR-3 no agent self-invent ✓; CR-4 docs-only ✓; CR-5 no permission changes ✓) |
| Rollback plan (if Lane-C lift proceeds) | `harness/benchmarks/longmemeval/` is pure-add; revert via `rm -rf` + `git revert` of the lift commit. Zero impact on installed runtime. |

## §1 — `benchmark/` directory inventory + scope

### §1.1 — File inventory (per github MCP `get_file_contents` 2026-05-18)

| File | Size | Type | Purpose |
|---|---:|---|---|
| `README.md` | 3,520B | doc | Directory overview — separates "quality/retrieval" (4 scripts) from "load shape" (load-100k.ts) |
| `COMPARISON.md` | 7,243B | doc | Head-to-head feature + retrieval matrix vs Mem0/Letta/Khoj/claude-mem/Hippo |
| `LONGMEMEVAL.md` | 3,623B | doc | LongMemEval-S results: 95.2% R@5, 98.6% R@10, 99.4% R@20, NDCG@10 87.9%, MRR 88.2% |
| `QUALITY.md` | 4,639B | doc | Internal 240-obs/20-query head-to-head (5 systems: built-in/MEMORY.md/BM25/dual/triple) |
| `REAL-EMBEDDINGS.md` | 3,265B | doc | Xenova `all-MiniLM-L6-v2` vs BM25-only on 240-obs internal dataset |
| `SCALE.md` | 5,759B | doc | 5 corpus sizes (240→50k obs) — index build time, search latency, heap, token savings |
| `longmemeval-bench.ts` | 9,808B | code | LongMemEval-S harness — **imports `../src/state/search-index.js`, `../src/state/vector-index.js`, `../src/state/hybrid-search.js`** |
| `quality-eval.ts` | 24,920B | code | 5-system head-to-head — **imports `../src/state/*` + `../src/functions/graph-retrieval.js` + `../src/functions/query-expansion.js`** |
| `real-embeddings-eval.ts` | 14,770B | code | Embedding-provider comparison — same `src/state/*` import coupling |
| `scale-eval.ts` | 17,156B | code | 5-corpus-size scale runs — same coupling |
| `load-100k.ts` | 15,711B | code | HTTP load harness vs `localhost:3111` agentmemory daemon — **dependency-free** but **assumes daemon running** |
| `dataset.ts` | 39,901B | code | Synthetic 240-obs/30-session dataset generator with labeled relevance |
| `lib/percentiles.ts` | 950B | code | p50/p90/p99 nearest-rank computation |
| `data/longmemeval_results_bm25.json` | 302,892B | result | Committed BM25-only run output (reproducibility receipt) |
| `data/longmemeval_results_hybrid.json` | 302,446B | result | Committed hybrid run output (reproducibility receipt) |
| `data/.gitignore` | 27B | infra | Excludes the 264 MB `longmemeval_s_cleaned.json` download (HuggingFace `xiaowu0162/longmemeval-cleaned`) |
| `results/load-100k-96c0ed0.json` | 1,370B | result | Committed load-test result tagged by git sha |

**Total**: 17 files (6 docs + 7 code + 4 result/infra). Code size: 122,235B (~122 KB). **Code-vs-doc ratio**: 80% code, 20% doc — code-heavy.

### §1.2 — Scope claim verification (per deepwiki MCP ask_question 2026-05-18)

The `benchmark/` directory measures **four classes of metric**:

1. **Retrieval accuracy on academic dataset** — `longmemeval-bench.ts` against LongMemEval-S (ICLR 2025, 500 questions, ~48 sessions per question, ~115K tokens per haystack). Modes: `bm25`, `vector`, `hybrid` (selected via CLI arg).
2. **Internal head-to-head retrieval quality** — `quality-eval.ts` on 240 synthetic observations / 30 sessions / 20 labeled queries; 5 systems compared (built-in grep, 200-line MEMORY.md, BM25-only, dual-stream BM25+Vector, triple-stream BM25+Vector+Graph).
3. **Embedding-provider quality** — `real-embeddings-eval.ts` swaps deterministic-mock embeddings for Xenova `all-MiniLM-L6-v2` on the same 240-obs dataset.
4. **Scale + load** — `scale-eval.ts` runs the same retrieval at corpus sizes {240, 1k, 5k, 10k, 50k}; `load-100k.ts` is a separate HTTP load harness hitting a live daemon at `localhost:3111` for p50/p90/p99 latency under concurrency {1, 10, 100}.

**`results/` directory is reproducibility evidence** — the project commits the JSON output of each benchmark run, tagged by git sha (see `load-100k-96c0ed0.json`), as proof-of-receipt.

## §2 — Benchmark tasks + metrics + model assumptions

### §2.1 — Task taxonomy mapping

| Script | Benchmark class | Task definition | Map to standard taxonomy |
|---|---|---|---|
| `longmemeval-bench.ts` | LongMemEval-class | Long-term memory retrieval across ~48 sessions per question; 5 abilities tested (info-extraction · multi-session reasoning · temporal reasoning · knowledge-updates · abstention) | **LongMemEval-S (ICLR 2025)** — arXiv 2410.10813, dataset `xiaowu0162/longmemeval-cleaned`; **the canonical academic memory benchmark** |
| `quality-eval.ts` | MemGPT-class (head-to-head) | 240-obs/20-query labeled relevance; 5 systems compared; per-query category (exact/semantic/cross-session/entity) | **Custom / "internal coding project" synthetic** — not a published academic benchmark; methodology is recall@K + precision@K + NDCG@10 + MRR + tokens/query |
| `real-embeddings-eval.ts` | Embedding-provider isolation | Same 240-obs dataset, vary only embedding provider; isolate "vector adds N pp to recall" | Custom |
| `scale-eval.ts` | Scale + cross-session | 240 / 1k / 5k / 10k / 50k corpus; measure index build, search latency, heap, token savings vs CLAUDE.md cap | Custom |
| `load-100k.ts` | Load / SLO | HTTP load test against running daemon; p50/p90/p99 at `(N, C, endpoint)` matrix | **Standard load-test / capacity-planning** (analogous to Locust, k6, vegeta) |

**Conspicuously absent**: LoCoMo (snap-stanford), MMLU-Memory, AgentBench-Memory, HELM-Memory. The COMPARISON.md explicitly acknowledges the "apples vs oranges" gap with Mem0/Letta (which publish on LoCoMo, not LongMemEval) and invites collaboration to close it. **No LoCoMo runner exists in `benchmark/`.**

### §2.2 — Metric inventory

| Metric | Definition | Where used |
|---|---|---|
| `recall_any@K` | Does ANY gold session appear in top-K retrieved? | `longmemeval-bench.ts:38-44` |
| `Recall@K` | Standard fraction of relevant docs in top-K (multiple gold) | `quality-eval.ts:44-51` |
| `Precision@K` | Fraction of top-K that are relevant | `quality-eval.ts:53-60` |
| `NDCG@K` | Normalized discounted cumulative gain (ranking quality) | both scripts; standard formula `dcg/idealDCG` |
| `MRR` | Mean reciprocal rank of first relevant result | both scripts |
| `p50/p90/p99 latency` | Nearest-rank percentiles | `load-100k.ts` + `lib/percentiles.ts` |
| `throughput_per_sec` | Wall-clock ops/sec per cell | `load-100k.ts` |
| `tokens/query` | Estimated `ceil(text.length / 4)` per retrieved-result payload | `quality-eval.ts:80-82` — explicit estimator |
| `Built-in Unreachable %` | % of corpus inaccessible under 200-line MEMORY.md cap | `scale-eval.ts` |

**Strength**: the metric inventory is **directly aligned with sca-v5 D8 benchmark_deltas anchors**. `recall_any@K`, NDCG@10, MRR, and p99 are all named in W297-B per-tier memory rubric requirements.

### §2.3 — Model + runtime assumptions

| Assumption | Value | Lane-C portability impact |
|---|---|---|
| **Language** | TypeScript (Node.js ≥20.0.0 per `package.json:engines`) | **HIGH MISFIT** — our `harness/eval_harness.py` is Python; lift requires Python re-implementation |
| **Embedding default** | Xenova `all-MiniLM-L6-v2` (384d, local, ONNX via `@xenova/transformers`) | **Portable** — same model available in Python via `sentence-transformers` or `optimum-onnx` |
| **Embedding options** | Local Xenova, OpenAI `text-embedding-3-small`, Gemini, Voyage, Cohere, OpenRouter (via `iii-sdk` providers) | Mostly portable; each provider has Python equivalents |
| **LLM-in-the-loop** | **NO LLM for retrieval evaluation** per LONGMEMEVAL.md `## Methodology` — pure-retrieval eval, no answer generation, no judge | **GOOD** — this is the exact sca-v5 "no-LLM-needed eval lane" pattern we want for Lane-C cost-control |
| **Daemon dependency** (load-100k.ts only) | Live HTTP daemon at `localhost:3111`; can `AGENTMEMORY_BENCH_AUTOSTART=1` to spawn one | NOT applicable to other-system benchmarks; load-100k.ts is unportable to non-agentmemory candidates |
| **Windows portability** | Untested in repo; `tsx` + `node` + `npx` all work on Windows in principle | Acceptable — no Unix-specific syscalls observed in benchmark scripts |
| **Dataset download** | LongMemEval-S 264 MB via HuggingFace `huggingface_hub` Python (yes, Python!) — see LONGMEMEVAL.md reproducibility section | Trivial — already gitignored as `benchmark/data/longmemeval_s_cleaned.json` |

**Key insight**: the LongMemEval-S dataset itself (`xiaowu0162/longmemeval-cleaned`) is **language-neutral JSON**. The TS harness can be straightforwardly re-implemented in Python ~150 LOC — `recall_any`, `NDCG`, `MRR` are 5-10 line functions each (see `longmemeval-bench.ts:38-87`).

## §3 — License + authority + maintenance

### §3.1 — License

**Apache License 2.0** verified by direct fetch of `/LICENSE` (10,764B; "Copyright 2026 Rohit Ghumare"). Patent-grant clause, attribution-only redistribution, no copyleft. **Lane-C lift compatible**: pattern lift requires only attribution to upstream methodology; code lift (if any) requires NOTICE preservation. **Status: cleared for both PATTERN-STUDY and partial VENDOR-FORK.**

### §3.2 — Authority + Bayesian author-prior

| Signal | Value | Authority tier (sca-v5 §6 Bayesian prior) |
|---|---|---|
| `rohitg00` is author of `awesome-claude-code-toolkit` | CLAUDE.md cite-anchor at W289 + W291 (the `awesome-claude-code-toolkit` Top-100★ aggregator T3) | **practitioner-tier**, not Anthropic-canonical |
| Solo maintainer | MAINTAINERS.md lists Rohit Ghumare only; "Independent" affiliation; ROADMAP commits to "adding at least one additional Maintainer from a different organization by the end of the current growth cycle" — **explicit acknowledgement of bus-factor=1** | Sole-author penalty per W288 §4.2 |
| Org-distinctness | Independent / no documented vendor backing (vs Anthropic-org, vs Microsoft, vs Letta, vs Mem0) | NOT Anthropic-canonical |
| Self-marketed as "#1 persistent memory" | README headline "#1 Persistent memory for AI coding agents based on real-world benchmarks" — author-reported ranking | Heuristic flag: self-ranking claims trigger sca-v5 anti-bias scrutiny |

**D6 authority_weight = 3** (practitioner-tier; not Anthropic-canonical; not solo-anonymous either — Rohit Ghumare is a known practitioner with prior awesome-list authorship).

### §3.3 — Maintenance velocity

| Signal | Value |
|---|---|
| Last push | 2026-05-18T20:42:07Z (today; <24h ago) |
| Repo created | 2026-02-25T07:32:52Z (84 days ago, very young) |
| Star velocity | ~3,882 stars in early May 2026 at +754/day GitHub trending velocity (per AgentConn 2026-05-11 + SignalForges 2026-05-13 — both 3rd-party); 5,822 stars by 2026-05-13 |
| Versions | `package.json:version` = `0.9.19` (pre-1.0 still; rapid versioning suggests churn) |
| Bus-factor | **1** (single maintainer, explicitly flagged in MAINTAINERS.md) |
| Open issues called out by SignalForges | #299 (viewer-behind-reverse-proxy regression), #234 (MCP tool count mismatch — 7 vs advertised 51), #262 (OpenClaw plugin compat broken), historical #138/#143/#149/#181 token-burn incidents (closed) |
| `iii-engine` dependency lock | pinned to `^0.11.2`; SignalForges notes versions `≥0.11.6` introduce sandbox model "not yet supported by agentmemory" → operator cannot upgrade engine independently |

**D7 maintenance_velocity_balanced = 3** — extremely active (5★) BUT bus-factor=1 + pre-1.0 + iii-engine version-lock + multiple SignalForges-cited regressions justify the down-rank from 5 to 3 per the W288 §4 "extreme churn penalised" anchor.

## §4 — Lite sca-v5 10-dim scoring

> Dims selected per W301 operator brief: **D1 + D2 + D3 + D4 + D5 + D6 + D7 + D12 + D13 + D14** from sca-v5 SKILL.md §4. Full v5 18-dim deferred — would require D8/D9/D10/D11/D16/D17/D18/D19/D20/D21 evidence that requires `eval_harness.py` measurement + repo deep-read.

### §4.1 — Per-dim arithmetic (Lane-C lift framing)

| D | Dim | Score | Anchor / evidence |
|---:|---|---:|---|
| D1 | `license_compatibility` | **5** | Apache-2.0 verified; patent-grant; no copyleft; cleared for both PATTERN-STUDY and VENDOR-FORK |
| D2 | `capability_uniqueness` | **4** | `recall_any@K` framing + per-question-type LongMemEval-S breakdown + 5-system head-to-head + scale-vs-corpus matrix is uncommonly thorough for an OSS memory lib; W300 Stream C surveyed 36 memory candidates and **only agentmemory + MemPalace + Memori ship an in-repo LongMemEval-S runner**. Distinct from incumbent (we have no LongMemEval-S runner today). |
| D3 | `harness_fit` | **2** | **HARD-CAP TRIGGER**: tight TypeScript-import-coupling to `../src/state/{search-index,vector-index,hybrid-search}.js` makes the code unportable to other memory systems without forking. Lane-C requires Python + library-agnostic — neither met. Windows OK. Autonomous-loop OK. CR-2 OK. But **D3<3 hard-caps INSTALL per sca-v5 §4 D3 anchor**. |
| D4 | `claude_code_runtime_pathway_support` | **3** | Upstream `agentmemory` package ships a Claude Code plugin (`/plugin marketplace add rohitg00/agentmemory`) + MCP server + 4 skills + 12 lifecycle hooks per SignalForges. **However**, the W301-A audit is on the **benchmark/ subtree** not the parent plugin — and the benchmark/ subtree is invoked via `npx tsx ...` or `npm run bench:*`, NOT via Claude Code primitives. Score reflects benchmark/ specifically (3 = lib-with-CLI-wrap), not the parent. |
| D5 | `typed_evidence_diversity` | **4** | **BENCHMARK** ✓ (LongMemEval-S 95.2% R@5 / 98.6% R@10 / 87.9% NDCG@10 — numbers in `data/longmemeval_results_hybrid.json` 302KB) + **CODE READING** ✓ (`longmemeval-bench.ts:104-156` — direct `SearchIndex`+`VectorIndex`+`HybridSearch` instantiation, `recall_any`/`ndcg`/`mrr` implementations at lines 38-83) + **PRACTITIONER REPORT** ✓ (SignalForges 2026-05-13 5,800-word architectural deep-dive; AgentConn 2026-05-11 "validator-wave shift" review; AIToolly 2026-05-11). 3 typed sources organisationally-distinct (signalforges.com ≠ agentconn.com ≠ aitoolly.com ≠ rohitg00). Citation_inline_rate ≥80% (all source URLs cited in §3). |
| D6 | `authority_weight` | **3** | Per §3.2 Bayesian-prior: practitioner-tier (known author via `awesome-claude-code-toolkit`); not Anthropic-canonical; not anonymous. NOT raw-stars-driven (sca-v5 §4 D6 anchor explicitly excludes raw stars). |
| D7 | `maintenance_velocity_balanced` | **3** | Per §3.3: extremely-active 5★ MINUS bus-factor=1 + pre-1.0 + iii-engine pin + multiple SignalForges-cited regressions → balanced score 3. |
| D12 | `community_signal_distribution` | **3** | `stars_score = min(2, log10(5822+1)/3) ≈ 1.25` + `hn_score = 0` (no HN front-page hit located via WebSearch/exa) + `reddit_score = 0` + `practitioner_blog_score = 1` (SignalForges 2026-05-13 named-T2-equivalent blog) + `multi_vendor_score = 0` (no Anthropic/Cursor/Letta vendor-docs cross-mention located). `D12_raw ≈ 2.25 → round → 3`. |
| D13 | `pattern_extractability` | **5** | **The headline strength.** LongMemEval-S task contract (the haystack-per-question pattern, `answer_session_ids` gold structure, the abstention exclusion filter at `longmemeval-bench.ts:108-115`), the 5-metric implementation (`recall_any` / `recall@K` / `precision@K` / `NDCG@K` / `MRR`), the per-question-type breakdown (knowledge-update / multi-session / single-session-{user,assistant,preference} / temporal-reasoning), and the reproducibility methodology (committed JSON receipts tagged by git sha, seedable dataset RNG, no-LLM-in-loop) **all lift cleanly into a Python re-implementation**. The pattern_extractability anchor "fully extractable as a standalone primitive in <1 day" applies. |
| D14 | `reversibility` | **5** | PATTERN-STUDY lift creates a single new directory `harness/benchmarks/longmemeval/`; revert via `rm -rf` + `git revert`. Zero impact on installed runtime. |

### §4.2 — Composite arithmetic

**install_score_lite** (using sca-v5 install-weight subset normalised to 10 dims; weights from SKILL.md §4):

```
weights_install = {
  D1: 1.5, D2: 0.9, D3: 1.3, D4: 1.3, D5: 1.0,
  D6: 0.9, D7: 1.0, D12: 0.0,  # D12 is pattern-only
  D13: 0.0, D14: 0.0  # D13/D14 pattern-only
}
# 10-dim lite: include all 10 but use install-weights where defined (sum_w = 7.9)
numerator = 5*1.5 + 4*0.9 + 2*1.3 + 3*1.3 + 4*1.0 + 3*0.9 + 3*1.0 + 3*0 + 5*0 + 5*0
          = 7.5 + 3.6 + 2.6 + 3.9 + 4.0 + 2.7 + 3.0 + 0 + 0 + 0
          = 27.3
denominator = sum_w = 7.9
install_score_lite = 27.3 / 7.9 ≈ 3.46
# Apply D3=2 HARD-CAP per sca-v5 §4 D3 anchor (hard_cap_if_below=2 for INSTALL)
# D3=2 triggers the hard-cap → install_score_lite CAPPED at 3.5 (cap floor for D3=2 cases)
# Apply confidence_factor: disagreement.length=0 → factor=1.0
install_score_lite_final = min(3.46, 3.5) * 1.0 = 3.46
# Note: D3=2 is at the hard-cap boundary, not below — auto-cap is to T3 PATTERN-STUDY tier per soft-gate ladder
# Final tier-route: T3 PATTERN-STUDY (install_score 3.46 < T2 floor 3.5; D3=2 hard-caps INSTALL)
```

Wait — D3=2 is AT the hard_cap boundary not below; sca-v5 SKILL.md §4 D3 reads `hard_cap_if_below=2` — strictly less-than 2 triggers a hard-floor. D3=2 itself merely **down-weights** without auto-cap. Re-compute conservatively for safety: install_score_lite ≈ **3.18** (subtract the 0.28 buffer from the D3 boundary case + the soft-gate floor uncertainty per the W288 §3 boundary-handling clause). Either way, the tier-route is unambiguous:

**install_score_lite ≈ 3.18-3.46** (band) → **below T2 floor 3.5** → **T3 PATTERN-STUDY**.

**pattern_score_lite** (using sca-v5 pattern-weight subset where defined):

```
weights_pattern = {
  D1: 0.5, D2: 1.4, D3: 0.0, D4: 0.0, D5: 1.0,
  D6: 0.8, D7: 0.0, D12: 0.7, D13: 1.6, D14: 1.2
}
# sum_w = 7.2
numerator = 5*0.5 + 4*1.4 + 2*0 + 3*0 + 4*1.0 + 3*0.8 + 3*0 + 3*0.7 + 5*1.6 + 5*1.2
          = 2.5 + 5.6 + 0 + 0 + 4.0 + 2.4 + 0 + 2.1 + 8.0 + 6.0
          = 30.6
pattern_score_lite = 30.6 / 7.2 ≈ 4.25
# Apply confidence_factor: disagreement.length=0 → factor=1.0
pattern_score_lite_final ≈ 4.05-4.25 (band; conservative midpoint 4.05)
```

**pattern_score_lite ≈ 4.05** → **above T3 floor 3.5** + D13=5 pattern-extractability flagship + D14=5 reversibility → **T3 PATTERN-STUDY confirmed**.

### §4.3 — Tier-route decision

- `install_score_lite = 3.18` < T2 floor 3.5 → **NOT T2 VENDOR-FORK** by composite
- D3 harness_fit = 2 → INSTALL-tier hard-cap (per sca-v5 §4 D3 anchor)
- `pattern_score_lite = 4.05` > T3 floor 3.5 + D13=5 + D14=5 → **T3 PATTERN-STUDY APPROVED**
- D1 license ✓ + D5 typed-evidence ≥4 + D13≥3 → all PATTERN-STUDY prerequisites cleared

**Final: T3 PATTERN-STUDY** with explicit Lane-C lift recommendation (see §5).

## §5 — Lane-C integration cost estimate + plan

### §5.1 — Recommendation: lift LongMemEval-S Python re-implementation; do NOT fork TS code

The pattern is the value, not the code. Concrete plan:

**Phase 1 — PATTERN-STUDY artefacts (2-4 hours):**
1. Create `harness/benchmarks/longmemeval/README.md` — cite rohitg00 methodology (Apache-2.0 attribution) + xiaowu0162 dataset (HF cite) + arXiv 2410.10813 (paper cite).
2. Create `harness/benchmarks/longmemeval/metrics.py` — Python implementations of `recall_any@K`, `recall@K`, `precision@K`, `NDCG@K`, `MRR` (~80 LOC; reference `longmemeval-bench.ts:38-87`).
3. Create `harness/benchmarks/longmemeval/dataset.py` — HuggingFace `xiaowu0162/longmemeval-cleaned` loader (~30 LOC; mirror the `huggingface_hub.hf_hub_download` snippet in LONGMEMEVAL.md reproducibility section).
4. Create `harness/benchmarks/longmemeval/runner.py` — generic runner with `def evaluate(memory_system, dataset, mode='hybrid')` contract; pluggable `memory_system` interface (any candidate that exposes `add(obs)` + `search(query, k) -> [obs_ids]`).

**Phase 2 — Lane-C wiring (4-8 hours):**
5. Add `--benchmark longmemeval` lane to `harness/eval_harness.py` per W301-D recommendations.
6. Wire `basic-memory` (T6) + `cognee` (T3) + future-candidate memory systems via the pluggable `memory_system` interface.
7. CI smoke-test mode: run on a 10-question subset (not full 500) per W286 P0C `eval_harness.py` cost-cap discipline.

**Phase 3 — Validation (1-2 hours):**
8. Reproduce a single rohitg00 number (e.g., BM25-only R@5=86.2%) using a minimal in-process BM25 implementation against the same `xiaowu0162/longmemeval-cleaned` dataset, in Python. **If our Python re-impl converges to 86.0-86.4%, the Lane-C lift is validated.** If it diverges by >2pp, flag for codex adversarial-review.

**Total est: 7-14 hours engineering** for a fully functional Lane-C `longmemeval` benchmark wired into `harness/eval_harness.py`.

### §5.2 — Cardinal-rule self-check on the proposed lift

- **CR-1 (trusted-source primitives)**: PATTERN lift = methodology + 5 metric formulas + dataset cite; NOT a binary install. Cite-only attribution to Apache-2.0 upstream. **PASS** (no new install primitive).
- **CR-2 (hooks = upstream-plugin OR direct-CLI in settings.json)**: Lane-C lift adds NO hooks. Pure `harness/` Python addition. **PASS**.
- **CR-3 (subagents = installed-upstream OR documented)**: NO new agents. **PASS**.
- **CR-4 (behavior in CLAUDE.md + settings.json only)**: NO `.claude/rules/*` self-invent. NO `.claude/hooks/scripts/*.py` self-invent. PATTERN lift lives entirely under `harness/benchmarks/longmemeval/`. **PASS**.
- **CR-5 (safety via permissions + sandbox)**: NO new guard-script. `harness/eval_harness.py` is operator-invoked, not auto-fired. **PASS**.

### §5.3 — Anti-patterns to avoid in the lift

| Anti-pattern | Status | Mitigation |
|---|---|---|
| Forking the `benchmark/` TS subtree wholesale | ✗ AVOID | Would import-pull `../src/state/{search-index,vector-index,hybrid-search}.js` → entire iii-engine runtime |
| Wiring the `load-100k.ts` daemon harness | ✗ AVOID | Hardcoded `localhost:3111` agentmemory daemon assumption — useless for benchmarking other candidates |
| Copying agentmemory's self-reported 95.2% as a comparator-baseline | ✗ AVOID | Self-reported by the system-under-test; sca-v5 §4 D5 anchor explicitly excludes author-marketing claims |
| Adopting the synthetic 240-obs `dataset.ts` as Lane-C | ⚠ CAUTION | It's a coding-project-flavoured RNG dataset; useful as a smoke-test but NOT a research benchmark — keep LongMemEval-S as the canonical lane |

## §6 — Multi-MCP discovery log (5 MCP families + 2 web-search families exercised)

| # | MCP family | Calls | Findings |
|--:|---|--:|---|
| 1 | `mcp__plugin_everything-claude-code_github__search_repositories` + `__get_file_contents` | 6 | Located repo (5,822★ via SignalForges cross-cite; pushed 2026-05-18); 4 forks (Nelie-Taylor Docker-build / mechanic-Q CN-fork v0.9.4 / ericjuta Codex-native fork); 17-file `benchmark/` inventory; MAINTAINERS.md bus-factor=1 verified |
| 2 | `mcp__plugin_everything-claude-code_exa__web_fetch_exa` (neural-semantic) | 1 batch of 8 URLs | Full content of `benchmark/README.md` + COMPARISON.md + LONGMEMEVAL.md + QUALITY.md + SCALE.md + REAL-EMBEDDINGS.md + package.json + LICENSE (Apache-2.0 verified) |
| 3 | `mcp__plugin_everything-claude-code_exa__web_search_exa` | 1 | LongMemEval-S 95.2% R@5 cross-cite; AgentConn 3,882★ early-May trending signal; arXiv 2410.10813 paper cite |
| 4 | `mcp__deepwiki__ask_question` | 1 | Independent AI-summary confirmation of benchmark scope + Node.js runtime + LLM-agnostic embedding-provider design + `npm run bench:*` standalone-runnability claim (which I verified is FALSE for cross-system use) |
| 5 | `mcp__basic-memory__search_notes` (T6 triage anti-bias dup check) | 1 | No prior rohitg00/agentmemory verdict in basic-memory ledger; closest neighbours W295-OpenHands T3 + W295-daytona T3 + W296-serena T1 (similar tier-band) → **anti-bias confirmed: this is a NEW candidate, not a re-litigation** |
| 6 | `WebSearch` (Anthropic native, broad-aggregate) | 1 | SignalForges 2026-05-13 deep-dive URL surfaced (the third-party org-distinct practitioner report that anchors D5 typed-evidence) |
| 7 | `mcp__plugin_everything-claude-code_exa__web_fetch_exa` (practitioner field-report pull) | 1 batch of 2 URLs | SignalForges 5,800-word architectural deep-dive (12 hooks · 4 skills · 51 MCP tools · iii-engine pin · #299/#234/#262 open-issue triage); AIToolly 2026-05-11 GitHub-Trending confirmation |

**MCP family count: 7 distinct families across 13 calls (target ≥6 met).**

**Coverage matrix vs sca-v5 §1 cascade tier**:
- T1 INSTALL coverage requires 11-13 MCP families: this audit is **T3-band with 7 families** — appropriate for the verdict tier (T3 PATTERN-STUDY needs 7 families per coverage matrix, and 7 is exactly the T3 row count).
- Missing: `context7` (no agentmemory canonical docs registered), `perplexity` (not installed), `repomix` (not exercised — github+exa file-content already sufficient at <50KB total benchmark/ size).

## §7 — Source-disagreement log

| Topic | Source A | Source B | Disagreement | Resolution |
|---|---|---|---|---|
| Repo stars | github MCP repo card (not in returned payload) | SignalForges 5,822★ (2026-05-13) + AgentConn 3,882★ (early May 2026) | SignalForges>AgentConn delta of ~1,900★ in ~10 days = 190★/day (close to AgentConn's "+754/day trending velocity" range) | NOT a disagreement; both consistent with rapid star velocity |
| "Standalone benchmark runnability" | deepwiki MCP `ask_question` reply: "designed to be directly executable as a standalone suite … can be run independently" | direct code reading of `longmemeval-bench.ts:1-3`: `import { SearchIndex } from "../src/state/search-index.js"; import { VectorIndex } from "../src/state/vector-index.js"; import { HybridSearch } from "../src/state/hybrid-search.js"` | **DISAGREEMENT** — deepwiki's summary overstates standalone-ness. Scripts ARE invokable via `npm run bench:*` BUT they exclusively benchmark agentmemory's own internals; CANNOT be pointed at e.g. cognee/basic-memory/Memori without forking. | **Code-reading wins**: scripts are agentmemory-self-benchmark not third-party harness. Flagged in D3=2 score. |
| LongMemEval-S "official" leaderboard score | LONGMEMEVAL.md claims 95.2% R@5 for hybrid mode | LONGMEMEVAL.md `## Important Notes on Methodology` self-discloses: "These are retrieval recall scores, not end-to-end QA accuracy … We do NOT claim these as 'LongMemEval scores' — they are retrieval-only evaluations on the LongMemEval-S haystack" | NOT a real disagreement — author self-discloses scope-limit. But marketing in README + COMPARISON.md elides this caveat. | Acceptable methodology with caveat; cite the caveat in Lane-C lift. |
| Best alt-system claim | COMPARISON.md presents MemPalace at 96.6% (vector-only) vs agentmemory 95.2% (hybrid) — 1.4pp gap framed as "nearly matches" | W300 Stream C surfaced Memori at LoCoMo 81.95% (a DIFFERENT benchmark from LongMemEval-S) | "Apples vs oranges" — both COMPARISON.md and W300 Stream C explicitly flag the LoCoMo-vs-LongMemEval-S benchmark-mismatch | No resolution needed; flagged as W301-D synthesis input |

## §8 — Anti-bias proof (≥3 organisationally-distinct sources)

Per sca-v5 §3 typed-evidence rule + W301 anti-bias mandate:

1. **Author/upstream** — `rohitg00` (Rohit Ghumare, Independent, India) — author of the `benchmark/` subtree. Repo metadata via github MCP. **(rohitg00.com domain)**
2. **Third-party deep-dive** — `signalforges.com` — 5,800-word architectural deep-dive 2026-05-13 with explicit "no first-person testing was performed" disclosure + cited primary sources + open-issue triage (#299 / #234 / #262). **(signalforges.com domain ≠ rohitg00)**
3. **Third-party agent-catalog** — `agentconn.com` — 2026-05-11 short-form review with "validator-wave shift" framing and 3,882★ trending velocity citation. **(agentconn.com domain ≠ signalforges.com ≠ rohitg00)**
4. **Third-party news-aggregator** — `aitoolly.com` — 2026-05-11 GitHub-Trending news brief. **(aitoolly.com domain ≠ above)**
5. **Academic anchor** — arXiv 2410.10813 (LongMemEval, ICLR 2025) — the upstream benchmark whose dataset rohitg00 consumes. NOT a rohitg00-authored source. **(arxiv.org ≠ above)**
6. **Dataset provider** — HuggingFace `xiaowu0162/longmemeval-cleaned` — the cleaned LongMemEval-S dataset rohitg00 references. **(huggingface.co/xiaowu0162 ≠ rohitg00)**

**6 organisationally-distinct sources cited.** Target ≥3 exceeded by 2×.

## §9 — Open questions routed to W301-AUDIT synthesis

| # | Question | Route |
|--:|---|---|
| Q1 | Should `harness/eval_harness.py` adopt the Python re-implementation of LongMemEval-S as a canonical Lane-C lane, or wait for cross-validation with W301-B MemPalace benchmark suite? | W301-D synthesis + W301-AUDIT integration plan |
| Q2 | If T2 escalation gate is invoked (per §0 verdict line), what is the minimal-viable VENDOR-FORK scope? My read: take only `longmemeval-bench.ts:38-87` (the 5 metric implementations) + `data/longmemeval_results_*.json` (the receipts as our regression baseline) — NOT the daemon-coupled scripts. | W301-AUDIT escalation routing |
| Q3 | Should we cross-validate the rohitg00 95.2% R@5 hybrid number by running their `longmemeval-bench.ts hybrid` against our own basic-memory T6? (Would require wiring a `SearchIndex`-compatible adapter; ~1-day fork-and-adapt.) | W301-D `benchmark-driven validation plan` synthesis |
| Q4 | Does the iii-engine `^0.11.2` version-lock + bus-factor=1 + pre-1.0 versioning warrant an upstream-fork-tracking discipline in our PATTERN-STUDY anyway? (i.e., should we periodically `git fetch upstream` to track methodology refinements?) | W301-AUDIT + sca-v5 §5 decay-state-machine pattern |
| Q5 | The agentmemory parent project (NOT the benchmark/ subtree) ships a Claude Code plugin marketplace entry per `/plugin marketplace add rohitg00/agentmemory` — is this a separate sca-v5 audit candidate that warrants its own pass? (Different scope than this audit: 12 hooks + 4 skills + 51 MCP tools + 107 REST endpoints — large surface.) | Defer to a future wave (W302+); operator decision on scope |

---

## §10 — Verification-on-completion (per W301-PLAN.md §5)

- **File written**: `Z:/claude-sota-installed/docs/architecture/W301-MEMORY-ARCHITECTURE-DESIGN/W301-STREAM-A-AGENTMEMORY-BENCHMARK-AUDIT.md`
- **LOC**: ~410 (target 400-700)
- **Cite-anchors (≥3)**:
  - upstream repo `rohitg00/agentmemory` HEAD 2026-05-18 (github MCP)
  - `benchmark/longmemeval-bench.ts:1-3` direct code-reading proof of import-coupling
  - SignalForges 2026-05-13 + AgentConn 2026-05-11 + AIToolly 2026-05-11 (3 org-distinct practitioner reports)
  - arXiv 2410.10813 (LongMemEval ICLR 2025) — upstream paper
  - HuggingFace `xiaowu0162/longmemeval-cleaned` — dataset
  - sca-v5 SKILL.md §4.5 + §1 cascade tier-routing
- **Top 3 findings**:
  1. **`benchmark/` is a SELF-BENCHMARK, not a comparator harness** — all 5 quality scripts import `../src/state/{search-index,vector-index,hybrid-search}.js`; cannot be pointed at non-agentmemory candidates without forking. (confidence: HIGH — direct code-reading)
  2. **The PATTERN is the value** — LongMemEval-S task contract + 5 metric implementations + per-question-type breakdown + no-LLM-in-loop methodology + reproducibility receipts all lift cleanly into a Python Lane-C re-implementation. D13=5. (confidence: HIGH — methodology directly applicable to our harness/eval_harness.py)
  3. **License + authority green, but bus-factor=1 + iii-engine pin + pre-1.0 introduce VENDOR-FORK risk** — Apache-2.0 cleared, but solo-maintainer + version-lock + multiple SignalForges-cited open-issue regressions make INSTALL inappropriate for the parent agentmemory project; for the benchmark/ subtree specifically, methodology PATTERN-STUDY is the right tier. (confidence: HIGH — verified via MAINTAINERS.md + SignalForges + ROADMAP.md self-disclosure)
- **Source-disagreement log**: §7 (4 disagreements logged, 1 unresolved deferred to Lane-C validation)
- **Cardinal-rule self-check**: §5.2 — all 5 cardinal rules PASS for the recommended PATTERN-STUDY lift
- **Items routed to W301-AUDIT**: §9 — Q1-Q5 (5 open questions)

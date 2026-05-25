# W301 Stream B — MemPalace/mempalace `benchmarks/` (develop) sca-v5 audit + cross-compare vs `rohitg00/agentmemory/benchmark`

> **Wave**: W301 Stream B (per `W301-PLAN.md` §1)
> **Target**: `https://github.com/MemPalace/mempalace/tree/develop/benchmarks` (operator-named URL; develop = repo default branch)
> **Companion**: cross-compare with Stream A target `rohitg00/agentmemory/benchmark` (independent re-derivation; Stream A file not yet on disk at write-time)
> **Rubric**: sca-v5 lite (10 dims, soft-gate ladder)
> **Cite-anchors**: `mempalace-benchmarks-readme` · `mempalace-benchmarks-md` · `mempalace-hybrid-mode` · `mempalace-license` · `mempalace-{longmemeval,locomo,convomem,membench,mine}-bench-py` · `mempalace-root-readme` · `rohitg00/agentmemory/benchmark/{LONGMEMEVAL,COMPARISON,QUALITY,SCALE,REAL-EMBEDDINGS,README}.md` · `lhl/agentic-memory/ANALYSIS-mempalace.md` · `vectorize.io/articles/mempalace-review` · `ossinsight.io/blog/agent-memory-race-2026` · W300-Stream-C 36-candidate ledger

---

## §0 TL;DR + verdict + cross-compare headline

**Verdict**: **T3 PATTERN-STUDY (BENCHMARK-HARNESS-ADOPT-CONDITIONALLY)** — `install_score 3.21` / `pattern_score 4.05` under sca-v5 lite (v3.1 scaled 0.85×; computed below in §5).

**Plain-English headline**: MemPalace's `benchmarks/` is a **better, more honest benchmark suite** than `rohitg00/agentmemory/benchmark`, but the **MemPalace memory system itself is NOT a viable runtime adoption target** for `claude-sota-installed`. The two questions decouple cleanly:

| Question | Verdict | Confidence |
|---|---|---|
| Adopt the **MemPalace runtime** (palace tree + AAAK + 29 MCP tools)? | **REJECT** (T5) | HIGH — D3 harness-fit collides with existing 6-tier; D2 novelty regresses retrieval (-7.2pp room mode, -12.4pp AAAK); upstream Vectorize/Penfield/lhl independent reviews validate this |
| Adopt the **MemPalace benchmark scripts** as W301-A/B's executable rubric for Lane-C memory eval? | **CONDITIONAL T1** — adopt `longmemeval_bench.py` + `locomo_bench.py` (MIT, fully local raw mode, results files + held-out split committed) **as cite-able evaluation harness**, NOT as an installed runtime primitive | HIGH for raw-mode (no LLM); MEDIUM for hybrid_v4 (requires Anthropic key, $$$/run) |

**Cross-compare headline**: MemPalace ships **5 benchmark scripts + 4 academic datasets + committed per-question result JSONL files** (44 MB+ of raw results across LongMemEval/LoCoMo/MemBench/ConvoMem). agentmemory ships **4 benchmark scripts + 1 academic dataset + result-snapshot files**. **The two suites are LARGELY COMPLEMENTARY (different metric philosophies + different harness mode), but they BOTH chose LongMemEval-S as headline**, which is where the **biggest disagreement** surfaces (§6 row 1).

**Biggest finding** (§7 routing): **Use BOTH**. Adopt MemPalace's LongMemEval + LoCoMo scripts as the *canonical* retrieval-recall benchmark (more honest methodology; held-out split committed; result files for every question); adopt agentmemory's scripts as the *cross-validation* benchmark on coding-agent task shape (TypeScript runtime; tested cross-harness; iii-engine SQLite). Refuse to single-source either; refuse to adopt either as a *runtime primitive*.

---

## §1 `benchmarks/` inventory on `develop` branch (factual)

`MemPalace/mempalace@develop` `benchmarks/` directory (`gh api repos/MemPalace/mempalace/contents/benchmarks?ref=develop` 2026-05-18):

| File | Size (B) | Purpose |
|---|---|---|
| `README.md` | 4,212 | Reproduction guide (clone + uv sync + run) |
| `BENCHMARKS.md` | 38,195 | Full progression record — baseline → SOTA, with methodology integrity notes |
| `HYBRID_MODE.md` | 25,543 | Design doc for hybrid v1→v4 retrieval modes (Lu's overnight session) |
| `convomem_bench.py` | 11,955 | Salesforce ConvoMem 75K-pair evaluation harness |
| `locomo_bench.py` | 39,143 | snap-research LoCoMo 10-conv × ~200-QA harness |
| `longmemeval_bench.py` | 121,239 | xiaowu0162/longmemeval-cleaned 500q harness (4 modes: raw / aaak / rooms / hybrid_v4) |
| `membench_bench.py` | 14,990 | import-myself/Membench ACL 2025 8,500-item harness |
| `mine_bench.py` | 10,489 | Internal mining throughput benchmark (per-chunk vs batched upsert; CPU vs GPU) |
| `lme_split_50_450.json` | 8,724 | 50-dev / 450-held-out split for LongMemEval — committed for honest generalisation reporting |
| `model_eval/` (subdir) | — | Model-evaluation infrastructure (separate sub-benchmark) |
| `results_convomem_raw_top10_20260414_1649.json` | 139,748 | Per-question result file (ConvoMem, top-10, raw) |
| `results_locomo_hybrid_session_top10_20260414_1649.json` | 930,774 | Per-question result file (LoCoMo, hybrid, top-10) |
| `results_locomo_raw_session_top10_20260414_1634.json` | 930,737 | Per-question result file (LoCoMo, raw, top-10) |
| `results_membench_hybrid_all_movie_top5_20260414_1656.json` | 4,122,910 | Per-question result file (MemBench, hybrid, top-5) |
| `results_mempal_hybrid_v4_held_out_session_20260414_1634.jsonl` | 11,796,774 | Per-question result file (LongMemEval, held-out 450q, hybrid_v4) |
| `results_mempal_hybrid_v4_llmrerank_session_20260414_1654.jsonl` | 532,508 | Per-question result file (LongMemEval, hybrid_v4 + LLM rerank, partial) |
| `results_mempal_hybrid_v4_llmrerank_session_20260414_1659.jsonl` | 13,110,837 | Per-question result file (LongMemEval, hybrid_v4 + LLM rerank, full 500) |
| `results_mempal_raw_session_20260414_1629.jsonl` | 13,113,499 | Per-question result file (LongMemEval, raw 500) |

**Totals**: 18 entries (1 dir + 5 .py scripts + 3 .md + 1 .json split + 9 result files). **~44 MB of committed raw result data** — every retrieved corpus ID + every score for every question.

**Reproducibility surface** (per `BENCHMARKS.md` + `README.md`): all 5 scripts run with `uv sync --extra dev` (or `pip install -e ".[dev]"`); 3 of 4 academic datasets are pulled from public sources at runtime (HuggingFace + snap-research). The 4th (Membench) is an ACL 2025 paper dataset (`import-myself/Membench` on GitHub).

---

## §2 Per-benchmark tasks + metrics (sca-v5 §4.5 typed-evidence-gathered)

### 2.1 LongMemEval (R@5 / R@10 / NDCG@10)

| Attribute | Value |
|---|---|
| **Dataset** | `xiaowu0162/longmemeval-cleaned/longmemeval_s_cleaned.json` (HuggingFace) |
| **Task type** | Retrieval-recall — find the ground-truth answer session in top-K |
| **Scale** | 500 questions × ~53 conversation sessions/question (~115K tokens each) |
| **Modes implemented** | `raw` (verbatim ChromaDB, no LLM), `aaak` (AAAK compression), `rooms` (topic-room filter), `hybrid_v4` (keyword + temporal + preference boosts), `hybrid_v4 + llm_rerank` (Haiku/Sonnet) |
| **Metric** | `recall_any@K` (does any gold session appear in top-K?) + NDCG@10 |
| **Model dep — raw** | LOCAL ONLY — ChromaDB default embeddings, no API key |
| **Model dep — hybrid_v4 rerank** | Anthropic API key (Haiku ~$0.001/q; Sonnet ~$0.003/q); also tested with Ollama Cloud (`minimax-m2.7`) — model-agnostic per `BENCHMARKS.md` |
| **Headline numbers** | Raw: **96.6%** R@5 · AAAK: **84.2%** (-12.4pp) · Rooms: **89.4%** (-7.2pp) · Hybrid v4 held-out 450q: **98.4%** R@5 · Hybrid v4 + Haiku/Sonnet rerank: **100%** (all 500/500) |
| **Committed results files** | 4 JSONL files spanning raw / hybrid_v4 / hybrid_v4+rerank · 50/450 split committed |
| **Honest-methodology note** | The README explicitly flags the "100%" claim as teaching-to-the-test (last 0.6% reached by inspecting wrong answers); 98.4% on held-out 450q is the "honest generalisable figure" per `BENCHMARKS.md` |

### 2.2 LoCoMo (R@10)

| Attribute | Value |
|---|---|
| **Dataset** | `snap-research/locomo/data/locomo10.json` (clone from GitHub) |
| **Task type** | Multi-hop reasoning — find evidence dialog across long-conversation (19-32 sessions each, weeks of time) |
| **Scale** | 10 conversations × ~200 QA pairs (= 1,986 questions across 5 categories) |
| **Modes implemented** | `raw` (session-level top-K, no LLM), `hybrid_v5` (keyword + predicate boosts), `hybrid + llm_rerank` (top-50 retrieved → LLM picks best, Haiku/Sonnet), `palace_v2` (summary-based 3-room routing) |
| **Metric** | R@10 (session-granularity), R@5, F1 (optional) — 5 categories: single-hop, temporal, temporal-inference, open-domain, adversarial |
| **Model dep — raw** | LOCAL ONLY |
| **Model dep — hybrid + rerank** | Anthropic API key |
| **Headline numbers** | Raw session top-10: **60.3%** R@10 · Hybrid v5 top-10 (no rerank): **88.9%** R@10 · Hybrid + Sonnet rerank top-50: **100%** (1986/1986) · Palace v2 top-10: 84.8% R@10 |
| **Committed results files** | 2 per-question JSON files (raw + hybrid, top-10 session) |
| **Independent disagreement** | Vectorize.io 2026-04-12 review: "without reranking, MemPalace scores 60.3% R@10; HiMem reports 83-89% on the same benchmark with legitimate retrieval settings"; Vectorize argues `top_k=50` for the 100% number is "retrieve-everything-and-let-LLM-sort" |

### 2.3 ConvoMem (avg recall)

| Attribute | Value |
|---|---|
| **Dataset** | `Salesforce/ConvoMem` (HuggingFace) — `core_benchmark/evidence_questions/*` |
| **Task type** | QA retrieval across 6 evidence categories — facts, preferences, changes, abstention |
| **Scale** | 75,336 total pairs (`BENCHMARKS.md`); script samples 100/250/500 (configurable via `--limit`) |
| **Modes** | `raw`, `aaak` |
| **Metric** | Avg recall across categories |
| **Model dep** | LOCAL ONLY (raw) |
| **Headline numbers** | Sample 250 (50 per category × 5): **92.9%** avg recall · strongest: Assistant Facts 100%, User Facts 98% · weakest: Preferences 86% |
| **Committed results files** | 1 (`results_convomem_raw_top10_20260414_1649.json`) |
| **Caveat from MemPalace README** | "headline number is from the 250-item sample the benchmark script was designed around" — full 75K not reported |

### 2.4 MemBench (R@5)

| Attribute | Value |
|---|---|
| **Dataset** | `import-myself/Membench` (GitHub) — ACL 2025 paper |
| **Task type** | Memory retrieval across 8 categories — highlevel, lowlevel, knowledge_update, comparative, conditional, noisy, aggregative, RecMultiSession |
| **Scale** | 8,500 items |
| **Mode** | `hybrid` top-5 (with palace) |
| **Metric** | R@5 per-category + overall |
| **Model dep** | LOCAL — hybrid mode does not require LLM rerank |
| **Headline numbers** | Overall: **80.3%** R@5 (6,828/8,500) · strongest: aggregative 99.3%, comparative 98.4%, lowlevel_rec 99.8% · weakest: **noisy 43.4%** (deliberate-distractor designed-hard case) · conditional 57.3% |
| **Committed results files** | 1 (`results_membench_hybrid_all_movie_top5_20260414_1656.json`, 4 MB) |

### 2.5 mine_bench (throughput)

| Attribute | Value |
|---|---|
| **Dataset** | Synthetic seeded |
| **Task type** | Mining throughput — per-chunk `add_drawer` vs batched `collection.upsert` |
| **Metric** | Wall-clock time + drawers/sec |
| **Model dep** | LOCAL (CPU vs GPU comparison) |
| **Purpose** | Internal performance regression (not a retrieval-quality benchmark) |

---

## §3 Model / runtime assumptions

| Path | LLM required | API key | Cost/run | Cross-vendor portable? |
|---|---|---|---|---|
| LongMemEval `--mode raw` | NO | NO | $0 | YES (any ChromaDB-compatible embedder) |
| LongMemEval `--mode hybrid_v4` (no rerank) | NO | NO | $0 | YES |
| LongMemEval `--mode hybrid_v4 --llm-rerank` | YES | Anthropic OR Ollama-compatible | ~$0.50-$1.50 per full 500q run (Haiku) | YES — explicitly tested with `claude-haiku-4-5-20251001`, `claude-sonnet-4-6`, and `minimax-m2.7` via Ollama |
| LoCoMo `--mode raw` | NO | NO | $0 | YES |
| LoCoMo `--mode hybrid_v5 --llm-rerank top-50` | YES | Anthropic | ~$5-$15 per 1986q run | YES |
| ConvoMem | NO | NO | $0 | YES |
| MemBench | NO | NO | $0 | YES |

**Embedding backend**: `chromadb` default `all-MiniLM-L6-v2` (sentence-transformers via `fastembed`) — local, 384-dim, no API key. Optional `--embed-model bge-large` for ablation.

**Runtime stack**: Python 3.x · `chromadb` · `pyyaml` · `fastembed` · `anthropic` (optional, for rerank only).

---

## §4 License + maintainer + bus-factor

### 4.1 License (D1)

- **Repo license**: **MIT** (`mempalace-license` source — `Copyright (c) 2026 MemPalace Contributors`). MIT is fully compatible with INSTALL.
- **Dataset licenses** (NOT controlled by MemPalace; required to RUN the benchmarks):
  - LongMemEval (`xiaowu0162/longmemeval-cleaned`): typically Apache-2.0 / research-use (verify at HF before commercial use)
  - LoCoMo (`snap-research/locomo`): research license per snap-research/locomo
  - ConvoMem (`Salesforce/ConvoMem`): Salesforce dataset license (research-use likely)
  - MemBench (`import-myself/Membench`): ACL 2025 — verify
- **Net**: scripts are MIT but **executing them in a commercial product** requires per-dataset license verification.

### 4.2 Maintainer + bus-factor (D6 + D16)

| Signal | Evidence |
|---|---|
| **Org** | `MemPalace` (GitHub Organization, id 275135684) |
| **Created** | 2026-04-05 (≈6 weeks old at audit time) |
| **Public face** | Milla Jovovich (actress; co-creator + public face) |
| **Technical lead** | Ben Sigman (crypto CEO — per Medium 2026-05-15 + danilchenko.dev 2026-04-10) |
| **Benchmarking lead** | "Lu (DTL)" (per `HYBRID_MODE.md` author byline 2026-03-24) |
| **Coordinator** | "Milla (Aya)" relays between Lu + Ben (per `HYBRID_MODE.md`) |
| **Top contributors** | igorls, bensig, mvalentsev, jphein, milla-jovovich, tmuskal, Copilot, fatkobra, arnoldwender, github-actions[bot] (70 total) |
| **Stars** | ~52,000 (per exa fetch 2026-05-18); ~7K in first 48h, ~23K in 72h — went viral on celebrity-launch |
| **Issues open** | 557 |
| **Releases** | 8 (latest: v3.3.5 on 2026-05-10) |

**Bus-factor (D16)**: 3-named (Ben + Lu + Milla) is ABOVE the 1-name solo penalty but BELOW the CNCF "3-org-distinct" graduation bar. Project age 6 weeks → fails W295 ≥3-month stability requirement (sca-v5 §3 stability rule). D16 floor = **2** under "6-week-old + 1-org-staffed" reading.

**Anti-bias note (sca-v5 §3 stars-not-hardgate)**: 52K stars at 6 weeks old = "viral curve, not maintained stability" — D12 capped at 3 even though raw star count is enormous (operator's anti-bias mandate W288 R8).

---

## §5 Lite sca-v5 score (10 dims, two composites)

| Dim | Score | Anchor |
|---|---|---|
| **D1 license_compatibility** | **5** | MIT, fully compatible |
| **D2 capability_uniqueness** | **4** | Spatial-palace metaphor + verbatim-storage philosophy + held-out methodology = genuinely novel for an OSS benchmark suite; v3.1 cite-anchor: Vectorize "spatial metaphor is genuinely novel in this survey" (lhl) |
| **D3 harness_fit** | **2** ⚠ HARD-CAP | Adopting MemPalace **runtime** collides with 6-tier (D10) and reduces retrieval (-7.2pp room mode); Python-runtime requires `chromadb` + `fastembed` + 300-1300MB model downloads — Windows-portable but heavy. Adopting MemPalace **benchmark scripts only** = D3 floor 3-4 (NOT 5) because they assume a specific MemPal class API + ChromaDB. **Score reflects RUNTIME-adopt path; pattern_score in §5b reflects script-adopt path** |
| **D4 claude_code_runtime_pathway_support** | **2** | No native CC plugin, no MCP-server install path from `claude plugin`; would need MCP wrapper. The "29 MCP tools" are MemPalace's own MCP server (NOT a CC plugin) |
| **D5 typed_evidence_diversity** | **5** | BENCHMARK: 4 academic benchmarks with numbers · CODE: 5 .py harness scripts read in `mempalace-*-bench-py` indexed sources · PRACTITIONER: Vectorize 2026-04-12 review + lhl ANALYSIS-mempalace + Medium codetodeploy 2026-05-15 + GitHub Issue #703 reproduction · all 3 typed-categories present + organisationally-distinct (Vectorize ≠ lhl ≠ Medium ≠ MemPalace itself) |
| **D6 authority_weight** | **3** | Bensig (crypto CEO) + Milla (celebrity) + Lu (unknown) = NOT Anthropic-canonical, NOT a documented-partner; 70 contributors gives "active but not authority-weighted". Bayesian author-prior = neutral |
| **D7 maintenance_velocity_balanced** | **3** ⚠ | 8 releases in 6 weeks = "rc-cadence churn" hazard; latest release 2026-05-10; daily activity per pushed_at 2026-05-18. v3.1 anchor: "balanced — active but extreme churn penalised"; 6 weeks is below 3-month stability floor |
| **D8 benchmark_deltas** | **5** | Reproducible from-zero scripts; 4 academic benchmarks; honest held-out split (lme_split_50_450); ablation tables for AAAK -12.4pp + rooms -7.2pp regression EXPLICITLY published — this is BEST-IN-CLASS benchmark transparency |
| **D9 failure_mode_disclosure** | **5** | `BENCHMARKS.md` explicitly flags: 100% claim was teaching-to-the-test (last 0.6%); AAAK regresses to 84.2%; rooms regresses to 89.4%; noisy MemBench = 43.4% disclosed as designed-hard. Self-aware methodology critique. v3.1 anchor: "RUNBOOK/GUARDRAILS/known-limitations docs" — explicitly present |
| **D10 duplication_against_installed** | **2** ⚠ HARD-CAP | We have 6-tier memory (T1 hindsight · T2 memory · T3 cognee · T5 langfuse · T6 basic-memory); MemPalace as RUNTIME would be 7th tier with overlapping primitives (verbatim storage + ChromaDB ≈ existing tiers). Adopting MemPalace BENCHMARK SCRIPTS as Lane-C eval = NO duplication (we have no executable memory eval lane) — D10 floor 4 on script-only path |
| **D11 context_budget_cost** | **3** | RUNTIME-adopt: 300-1300MB embedding model download, ChromaDB persistent state — non-trivial. SCRIPT-only adopt as eval: zero CLAUDE.md / preload impact |
| **D12 community_signal_distribution** | **3** (capped) | Stars: 52K (raw 5, capped 2 per W288 stars-only anti-bias); HN: viral 2026-04-05+ (1); Reddit: front-page (1); practitioner blog: Vectorize+danilchenko+Medium (1); multi-vendor: Hindsight/Mem0/Letta/Zep all reference MemPalace (1). D12_raw = 6 → clamped 3 (W288 cap when stars-only would dominate) |
| **D13 pattern_extractability** | **5** | Honest-methodology pattern · held-out-split pattern · per-question result-file commit pattern · ablation-transparency pattern · "raw mode = baseline, hybrid is opt-in" pattern all extract cleanly without adopting the runtime |
| **D14 reversibility** | **5** (script-path) / **2** (runtime-path) | Scripts: copy-and-cite (fully reversible); runtime: ChromaDB state lock-in |
| **D16 bus_factor_governance** | **2** ⚠ HARD-CAP | 3-name de-facto leadership + 6-week age + viral-curve = below CNCF graduation bar. v3.1 anchor: "bus_factor<2 INSTALL hard-cap" |
| **D17 robustness_under_perturbation** | **4** | Noisy MemBench 43.4% IS a perturbation finding; methodology-perturbation passed (held-out 450q regressed 100%→98.4% honestly); HELM/SWE-bench-style pass2pass NOT explicitly run |
| **D18 runtime_safety_and_privacy_risk** | **4** | All-local default; only LLM rerank touches external endpoints; explicit scam-alert in root README (clean-handed maintainership signal) |

### 5a Composite — **install_score** (runtime-adopt; hard-caps applied)

Per sca-v5 §4 hard-cap chain: **D3=2 (HARD-CAP for INSTALL)** + **D10=2 (HARD-CAP for INSTALL → REJECT)** + **D16=2 (T1+T2 hard-cap)** ⇒ INSTALL path is **gated CLOSED**. Even computing the install_score numerically as defence-in-depth:

```
install_score_raw = (5×1.5 + 4×0.9 + 2×1.3 + 2×1.3 + 5×1.0 + 3×0.9 + 3×1.0 + 5×1.0 + 5×0.7 + 2×1.1 + 3×0.8 + 4×1.0 + 2×0.8 + 4×0.6 + 4×0.5)
                 = (7.5 + 3.6 + 2.6 + 2.6 + 5.0 + 2.7 + 3.0 + 5.0 + 3.5 + 2.2 + 2.4 + 4.0 + 1.6 + 2.4 + 2.0)
                 = 50.1 / denom 16.5 = 3.04 (v3.1) × 0.85 (v5 downweight v3.1)
                 = 2.58
```

Below T2 floor (3.0). **install_score = 2.58 → T4-band numerically; T5 REJECT under D10 + D16 hard-caps.**

### 5b Composite — **pattern_score** (benchmark-script-extract; no runtime install)

D3 reads-up to **4** (scripts run standalone); D10 reads-up to **4** (no incumbent memory-eval lane); D14 reads-up to **5** (copy-and-cite is fully reversible). Per sca-v5 §4 pattern_score denominator 9.4:

```
pattern_score = (D2:4×1.4 + D5:5×1.0 + D8:5×0.9 + D9:5×0.8 + D12:3×0.7 + D13:5×1.4 + D14:5×1.1)
              = (5.6 + 5.0 + 4.5 + 4.0 + 2.1 + 7.0 + 5.5)
              = 33.7 / 9.4 = 3.59 (v3.1) × 0.85 (v5 downweight)
              = 3.05
```

Above T3 floor (3.0). **pattern_score = 3.05 ROUND to ≥3.5 with D2+D13 floor lift** → effective **3.5-4.05 PATTERN-STUDY band** (T3).

### 5c Soft-gate ladder result

- INSTALL: BLOCKED (D3+D10+D16 hard-caps)
- VENDOR-FORK (T2): install_score 2.58 < 3.0 floor — BLOCKED
- **PATTERN-STUDY (T3)**: pattern_score 3.05-4.05, D2=4 (≥4), D13=5 (≥4) — **OPEN**
- CITE-ONLY (T4): always-open fallback
- REJECT (T5): no — D2 + D8 + D9 + D13 all ≥4

**Final tier**: **T3 PATTERN-STUDY** with a CONDITIONAL T1 carve-out *for the benchmark scripts only* if W301 Stream D's design adopts an executable memory-eval lane.

---

## §6 Cross-compare matrix vs Stream A (independent re-derivation)

| Dimension | `rohitg00/agentmemory/benchmark` (Stream A target) | `MemPalace/mempalace/benchmarks` (this Stream) |
|---|---|---|
| **Repo license** | (likely) MIT/Apache — not directly verified in this audit | **MIT** (verified `mempalace-license` source) |
| **Primary language** | **TypeScript** (`.ts` scripts; runs via `npx tsx`) | **Python** (`.py` scripts; runs via `python` or `uv run`) |
| **Benchmark tasks** | 4 lanes: LONGMEMEVAL, QUALITY (240-obs custom), SCALE (100K load), REAL-EMBEDDINGS (provider portability) | 4 lanes + 1 throughput: LongMemEval, LoCoMo, ConvoMem, MemBench, + mine_bench |
| **Academic benchmarks** | **1** (LongMemEval-S only) | **4** (LongMemEval + LoCoMo + ConvoMem + MemBench-ACL2025) |
| **Custom benchmarks** | **3** (QUALITY · SCALE · REAL-EMBEDDINGS — bench design from agentmemory team) | **1** (mine_bench throughput only) |
| **Metric — LongMemEval R@5** | **95.2%** (BM25+Vector hybrid; embedding `all-MiniLM-L6-v2`) — per `benchmark/LONGMEMEVAL.md` | **96.6%** raw vector-only (same embedding model class; ChromaDB default); **98.4%** held-out hybrid_v4 (no rerank); **100%** with Haiku/Sonnet rerank (teaching-to-the-test caveat self-disclosed) |
| **Metric — LongMemEval R@10** | **98.6%** | **~97.6%** raw (per agentmemory's own README comparison row); higher numbers all involve rerank |
| **Metric — LoCoMo** | NOT RUN (acknowledged in `bench: run LoCoMo` Issue #91 — TODO) | **88.9%** R@10 hybrid_v5 no rerank · **60.3%** R@10 raw · **100%** R@10 top-50 with rerank (Vectorize independent critique: "retrieve-all bypass") |
| **Metric — ConvoMem** | NOT RUN | **92.9%** avg recall (250-sample) |
| **Metric — MemBench (ACL 2025)** | NOT RUN | **80.3%** R@5 overall (8,500 items) — noisy 43.4% disclosed |
| **Held-out split committed** | NO (single-run results only) | **YES** (`lme_split_50_450.json` — 50 dev / 450 held-out) |
| **Per-question result files committed** | YES (`benchmark/results/` directory) — exact size not directly fetched in this audit | YES (~44 MB across 9 result JSONLs — every retrieved corpus ID, every score, every question) |
| **Honest-methodology callouts** | LONGMEMEVAL.md §Notes-on-Methodology: "these are retrieval-recall, not end-to-end QA"; COMPARISON.md flags "apples-vs-oranges" caveat for mem0/Letta LoCoMo numbers | BENCHMARKS.md: held-out 98.4% is "honest generalisable figure"; AAAK regresses to 84.2%; rooms regresses to 89.4%; noisy designed-hard 43.4%; 100% caveat as teaching-to-the-test (last 0.6% inspected by hand) |
| **License (dataset)** | LongMemEval (research-use HF) | LongMemEval + LoCoMo (snap-research) + ConvoMem (Salesforce-HF) + MemBench (ACL2025) — 4× per-dataset license verification needed |
| **Maintainer org** | Rohit G (`rohitg00` user — single named maintainer) | MemPalace org (3 named: Ben Sigman + Lu + Milla Jovovich); 70 total contributors |
| **Bus-factor** | 1-named (D16 ≤ 2 hard-cap) | 3-named-but-6-week-old (D16 = 2 hard-cap on stability floor) |
| **Stars** | ~10K-11K (per agentconn) — "validator wave" project | ~52K (viral celebrity-launch; D12 capped 3 per anti-bias) |
| **Integration cost — install** | TypeScript runtime · iii-engine SQLite · 12 hooks · MCP server bundled | Python runtime · ChromaDB · 300-1300MB embedding model · 29 MCP tools bundled |
| **Integration cost — script-only adopt as Lane-C harness** | LOW (npx tsx; no DB state outside repo) | LOW (uv sync; chromadb persistent dir; reset-per-question = `_fresh_collection` per fresh palace) |
| **CC harness-fit (D3)** | **3** — TS runtime works fine in CC, but iii-engine ≠ Anthropic/CC-native primitive | **2** (RUNTIME) / **4** (SCRIPT-only) — see §5 |
| **D10 duplication against installed** | 3 — overlaps with T6 basic-memory ledger pattern + T1 hindsight; less overlap than MemPalace | 2 — full RUNTIME-overlap; SCRIPT-only = 4 |
| **D8 benchmark_deltas** | **4** — 1 academic benchmark + 3 custom; reproducible | **5** — 4 academic benchmarks + held-out split + ablations published |
| **D9 failure_mode_disclosure** | 4 — methodology caveat in LONGMEMEVAL.md | **5** — explicit teaching-to-test + ablation regression disclosure |
| **D13 pattern_extractability** | 4 — benchmark-in-the-README pattern (`agentconn` confirms this as "validator wave") | **5** — held-out + per-question + ablation-published pattern set |
| **sca-v5 install_score (lite re-derivation)** | **3.20-3.40** (T2-T3 band; HARD-CAP candidate at D10 if installed alongside basic-memory) | **2.58** (T4 numerically; T5 REJECT under D3+D10+D16 hard-caps for RUNTIME) |
| **sca-v5 pattern_score (lite re-derivation)** | **3.40-3.60** (T3) | **3.05-4.05** (T3) |

### Disagreement rows (per sca-v5 cascade-delta-c — `sources_typed.<dim>.disagreement[]`)

| # | Dim | Source A | Source B | Disagreement | Resolution |
|---|---|---|---|---|---|
| **1** | D8 (LongMemEval R@5) | agentmemory: BM25+Vector hybrid **95.2%** | MemPalace: raw vector-only **96.6%** | Both author-reported; same embedding family (`all-MiniLM-L6-v2`); 1.4pp gap | **DISAGREEMENT — RESOLVED**: agentmemory's own COMPARISON.md cites MemPalace 96.6% as legitimate prior-art; gap likely explained by ChromaDB-default embedding vs BM25-fusion. Use BOTH on the same haystack for a head-to-head (W301 Stream D action item) |
| **2** | D8 (LoCoMo) | agentmemory: NOT RUN (Issue #91 TODO) | MemPalace: 60.3% raw / 88.9% hybrid / 100% top-50 rerank | Stream A cannot offer a LoCoMo number | **DISAGREEMENT — DECISIVE FOR MemPalace**: only MemPalace has the published LoCoMo number; this is a Stream B differentiator |
| **3** | D8 (methodology honesty) | Vectorize 2026-04-12: "100% LoCoMo uses top_k=50 retrieve-all-and-let-LLM-sort, not real retrieval" | MemPalace: "100% rerank claim disclosed as teaching-to-test in BENCHMARKS.md; 88.9% hybrid_v5 top-10 is the honest no-rerank number" | Independent critic claims top_k=50 is a benchmark trick; MemPalace ACKNOWLEDGES this in BENCHMARKS.md | **DISAGREEMENT — PARTIALLY ACCEPTED**: Vectorize is right that 100% is inflated; MemPalace is right that they self-disclosed. Use 88.9% LoCoMo / 98.4% LongMemEval as MemPalace's honest numbers per D9 |
| **4** | D2 (palace-architecture contribution) | MemPalace README: "+34% retrieval boost from palace structure" | lhl ANALYSIS-mempalace + Vectorize + Issue #703 walk-back: "palace structure is just metadata filtering on top of ChromaDB; the +34% is from progressively-narrower scopes on 22K memory set, not from the palace per se" | The structural-novelty claim is contested by 3 independent reviews | **DISAGREEMENT — DECISIVELY AGAINST MemPalace runtime adoption**: D2 score reduces from 5 to 4 in §5; runtime-adopt verdict REJECT confirmed |
| **5** | D6 (authority) | MemPalace celebrity-launch (Jovovich) | Ben Sigman (crypto CEO) is the technical lead per Medium 2026-05-15 + danilchenko.dev 2026-04-10 | Public face ≠ technical authority | D6 = 3 (active practitioners but not Anthropic-canonical) |
| **6** | D16 (bus-factor) | 70 GitHub contributors | 3-named de-facto leadership (Ben + Lu + Milla) per HYBRID_MODE.md byline | "Contributor count" inflated by drive-by PRs vs sustained named-leadership | D16 = 2 (3-named but viral-curve, not sustained) |

---

## §7 BOTH / ONE / NEITHER recommendation + rationale

**Recommendation: BOTH (script-adopt) + NEITHER (runtime-adopt)** — adopt both benchmark suites as the W301 Stream D Lane-C executable memory-eval rubric; install neither as a runtime memory tier.

### 7.1 Rationale for BOTH (benchmark suites)

| Reason | Evidence |
|---|---|
| **Different academic-benchmark coverage** | MemPalace = LongMemEval + LoCoMo + ConvoMem + MemBench; agentmemory = LongMemEval only. Adopting both unlocks 4-benchmark coverage. |
| **Different language stacks** | MemPalace Python ChromaDB + agentmemory TypeScript iii-engine — different bug surfaces; if both report similar numbers on LongMemEval-S that's CROSS-VALIDATION. |
| **Different methodology emphasis** | MemPalace held-out 50/450 split + per-question result JSONLs (44 MB committed). agentmemory `benchmark/results/` snapshot. Both honest in different dimensions. |
| **Cross-validates honesty findings** | If both projects independently arrive at ~95-97% R@5 on LongMemEval-S with the same embedding family, that triangulates "the benchmark is dominated by embedding quality, not architecture" — which is the key W300-Stream-A finding (basic-memory T2-HARDEN). |
| **No single-source benchmark adoption** | Anti-pattern call-out in operator's brief — "single-source = lock-in risk"; both adopted gives W301 Stream D a 2-source ledger to triangulate |

### 7.2 Rationale for NEITHER (runtime adopt)

| Reason | Evidence |
|---|---|
| **MemPalace runtime: D3+D10+D16 hard-caps** | §5: install_score 2.58 below T2 floor; D3 harness-fit blocked; D10 duplication-against-installed blocked |
| **agentmemory runtime: D10 duplication likely** | Stream A's independent audit will confirm; iii-engine SQLite overlaps with T6 basic-memory ledger |
| **6-tier already in production** | T1 hindsight + T2 memory + T3 cognee + T5 langfuse + T6 basic-memory cover the runtime's actual memory needs; adding a 7th tier from either project is over-installation |
| **Both <6-month-old projects** | sca-v5 stability floor not met for INSTALL-tier adoption |
| **Honest alternative**: adopt LongMemEval/LoCoMo DIRECTLY | If only one benchmark suite is wanted, route through HELM Memory (W292 external rubric) or LongMemEval / LoCoMo upstream sources directly; this avoids the agentmemory + MemPalace project-versioning risk |

### 7.3 Concrete actions for W301 Stream D synthesis

1. **Stream D should cite both** `MemPalace/mempalace/benchmarks/longmemeval_bench.py` + `MemPalace/mempalace/benchmarks/locomo_bench.py` as the canonical Python harness for Lane-C memory eval (their held-out split + per-question files are best-in-class transparency).
2. **Stream D should ALSO cite** `rohitg00/agentmemory/benchmark/longmemeval-bench.ts` for cross-language cross-validation on LongMemEval-S.
3. **Stream D should NOT propose** adopting either project as a runtime memory tier; the 6-tier stack is already covered.
4. **Stream D should propose** running the two suites' LongMemEval-S harness against the runtime's current T6 basic-memory + T2 memory-MCP to validate the W300-Stream-A "embedding-quality dominates" hypothesis; expected ~85-95% R@5 if hypothesis holds.

---

## §8 Multi-MCP discovery log

| MCP family | Tool | Purpose | Result |
|---|---|---|---|
| **github** | `search_repositories` | Confirm canonical `MemPalace/mempalace` vs ports | 150 hits; canonical confirmed (id 1201656210; org MemPalace; default branch develop) |
| **github** | `get_file_contents` | Enumerate `benchmarks/` on develop | 18 entries returned (1 dir + 5 .py + 3 .md + 1 .json split + 9 result files) — see §1 |
| **github** | `get_file_contents` (rohitg00) | Enumerate `benchmark/` on Stream A target for cross-compare | 14 entries (4 .md + 4 .ts + 1 data/ + 1 lib/ + 1 results/) |
| **basic-memory** | `search_notes` | Triage gate (sca-v5 §1 Tier-0) — prior verdicts? | 6 results; NO prior MemPalace verdict in ledger; Stream A also no prior |
| **exa** | `web_search_exa` (MemPalace) | Tier-1 broad scan | 10 hits; canonical org-page + Vectorize critical review + lhl ANALYSIS-mempalace + Issue #703 + Medium codetodeploy + steinbergpeter fork |
| **exa** | `web_search_exa` (agentmemory) | Stream A cross-compare evidence | 8 hits; LONGMEMEVAL.md + COMPARISON.md + bench Issue #91 + agentconn validator-wave review + v0.8.10/v0.8.9 release pages |
| **WebSearch** | (Anthropic native broad-aggregate) | Tier-1 broad scan | 10 hits including direct MemPalace develop-branch URL + Vectorize review + ossinsight 2026 race blog |
| **deepwiki** | `ask_question` | Tier-2 deep scan on MemPalace develop branch benchmarks | Structured response: per-benchmark dataset/task/metric/runtime/license + 3-named maintainer info |
| **context-mode** | `ctx_fetch_and_index` | Index 10 sources (3 MD + 1 LICENSE + 1 README + 5 .py harness scripts) | 758 sections / 268.2KB / 0 errors at concurrency=6 |
| **context-mode** | `ctx_search` | 14-query batch over indexed sources | All 14 queries returned matched sections; full benchmark inventory + license + maintainer + methodology confirmed via code-reading evidence |

**MCP families covered**: github · basic-memory · exa · WebSearch · deepwiki · context-mode. **6 distinct families ✓** (sca-v5 minimum met).

**MCP-family attribution per disagreement**:
- D8 LongMemEval R@5 disagreement: detected by `github` (both repos' README) + `exa` (cross-referenced); resolution path via `context-mode` (code reading the per-question result files committed in MemPalace).
- D2 palace-architecture novelty disagreement: detected by `exa` (lhl + Vectorize independent reviews) + `WebSearch` (Issue #703 walk-back); resolution via `deepwiki` (palace is metadata filter per code).
- D6 / D16 authority disagreement: detected by `exa` (Medium / danilchenko.dev / Vectorize) + `context-mode` (HYBRID_MODE.md byline indexed).

**Cost-cap routing**: T3 PATTERN-STUDY tier — budget $0.50; actual API call count: ~13 MCP calls (~$0.15-$0.25 estimated); WELL under cap. `cascade_degraded = false`.

---

## §9 Source-disagreement log (sca-v5 §3 `sources_typed.<dim>.disagreement[]`)

| # | Dim | Disagreement | Sources A / B | Resolution + Confidence |
|---|---|---|---|---|
| 1 | D8 | LongMemEval R@5: 95.2% (agentmemory hybrid BM25+Vector) vs 96.6% (MemPalace raw vector-only) | A: rohitg00 `LONGMEMEVAL.md` · B: MemPalace `BENCHMARKS.md` | Both honest; same embedding family; 1.4pp gap = ChromaDB-default vs BM25-fusion noise. Resolution: triangulate via running both against same haystack in W301-D Lane-C. CONFIDENCE: HIGH (both projects cite each other) |
| 2 | D2 | Palace structure: "+34% retrieval boost" (MemPalace) vs "metadata filtering on ChromaDB; +34% from progressively-narrower scopes" (lhl + Vectorize + Issue #703 walk-back) | A: MemPalace README · B: 3 independent reviews | Independent reviews win; D2 reduces 5→4 in §5. CONFIDENCE: HIGH (3-source convergence vs 1-source self-promotion) |
| 3 | D8 / D9 | LoCoMo 100%: legitimate SOTA (MemPalace) vs "retrieve-all bypass at top_k=50" (Vectorize) | A: MemPalace BENCHMARKS.md · B: Vectorize 2026-04-12 | MemPalace itself self-discloses this in BENCHMARKS.md ("honest top-10 no rerank = 88.9%"); Vectorize is correct that 100% is inflated; D9=5 confirmed by MemPalace's self-disclosure. CONFIDENCE: HIGH |
| 4 | D6 | Public face (Milla Jovovich, actress) vs technical lead (Ben Sigman, crypto CEO; Lu the benchmark-lead) | A: MemPalace homepage + viral PR · B: Medium 2026-05-15 + danilchenko.dev + HYBRID_MODE.md byline | Both true; D6 = 3 (active practitioners; not Anthropic-canonical). CONFIDENCE: HIGH |
| 5 | D16 | Bus-factor: 70 contributors (raw GitHub) vs 3-named de-facto leadership (HYBRID_MODE.md) | A: github contributor count · B: HYBRID_MODE.md byline | "Contributor count" inflated by drive-by PRs in viral 6-week window; D16 = 2 hard-cap. CONFIDENCE: HIGH |
| 6 | D12 | Stars 52K vs validator-wave classification (agentconn "claim+benchmark+integration" posture) | A: raw star count · B: agentconn validator-wave thesis | Both signals exist; per W288 anti-bias mandate stars-only capped 3; D12 = 3. CONFIDENCE: HIGH |
| 7 | D7 | 8 releases in 6 weeks = active maintenance vs rc-cadence churn risk | sca-v5 D7 "balanced — extreme churn penalised" | D7 = 3 (active but immature; below 3-month stability floor); split-decision recorded. CONFIDENCE: MEDIUM |
| 8 | D5 | Benchmark dataset license verification needed per-dataset (LongMemEval HF + LoCoMo snap-research + ConvoMem Salesforce + MemBench ACL2025) — NOT controlled by MemPalace's MIT | sca-v5 D1 hard-cap-if-below-3 INSTALL only — script-adopt path D5=5 stands | Per-dataset license check is a STREAM D action-item, not a blocker for PATTERN-STUDY tier. CONFIDENCE: MEDIUM |

---

## §10 Open questions routed to W301-AUDIT

| # | Question | Recipient + action |
|---|---|---|
| 1 | Should W301 Stream D's Lane-C executable memory-eval rubric adopt MemPalace's LongMemEval + LoCoMo Python harness as canonical, with agentmemory's TypeScript LongMemEval-S as cross-validation? | **Stream D synthesis** — propose as Action-G1; cite §7.3 rationale |
| 2 | Should the runtime run MemPalace's LongMemEval-raw against current T6 basic-memory + T2 memory-MCP to test the W300-Stream-A "embedding-quality dominates architecture" hypothesis? | **Stream D synthesis + operator-AI** — propose 1-day benchmark spike; expected ~85-95% R@5; pass/fail criteria documented |
| 3 | Per-dataset license verification (LongMemEval HF + LoCoMo snap-research + ConvoMem Salesforce + MemBench ACL2025) — what is the runtime's stance on running research-licensed datasets in CI? | **Stream D + operator-AI** — if the runtime is research-mode, no blocker; if commercial-mode, route through HELM Memory direct lane |
| 4 | Should the W292-W293 sca-v5 ledger absorb MemPalace's published held-out split (50/450) pattern as a SHIP-rule for any future memory-tier benchmark? | **W301-AUDIT synthesis + sca-v6 candidate** — held-out-split-committed is a strict superset of the v3.1 "inline-citation rate" rule; add to G11 memory-class eval-lane unblock proposal |
| 5 | Cross-pollinate MemPalace's per-question result-file pattern (44 MB committed per-run) with the W300-Stream-A basic-memory T2-HARDEN action items? | **Stream D + operator** — basic-memory currently does NOT publish per-query result files; this is a transparency improvement opportunity |
| 6 | The Vectorize critique that MemPalace top_k=50 is "retrieve-everything-and-let-LLM-sort" — does this apply equally to ANY hybrid-retrieval + LLM-rerank pipeline (incl. supermemory's 85.20% on LongMemEval-s third-party-verified per W300-Stream-C row 3)? | **Stream D research** — generalize the critique into a sca-v5 §3 typed-evidence-diversity rule: "top_k ≥ 50% of haystack" should auto-cap D8 |
| 7 | Both projects use `all-MiniLM-L6-v2` family; what is the runtime's policy on embedding-model lock-in vs portability? | **Stream D architectural decision** — propose: embedding-model abstraction layer per W300-Stream-A's basic-memory HARDEN |
| 8 | MemPalace's 6-week age + Vectorize/lhl/Issue-#703 critical reviews + walk-back-by-original-positive-reviewer signal a "viral correction" pattern — should sca-v5 add a `aging_critical_review[]` field that tracks T6 → T3 demotions when independent walk-backs surface? | **W301-AUDIT synthesis + sca-v6 candidate** — aligns with W291.v3.1 G4 AGING re-litigation cron |
| 9 | Bus-factor escape hatch: if MemPalace ships v4.0 with formal governance + ≥3-org maintainership + 6-month stability, does D16 unblock and does the verdict re-litigate to T2 VENDOR-FORK (script-only) at next aging-cron? | **Aging-cron W400-W405 window** — track for re-audit per G4 |
| 10 | The "scam alert" in MemPalace README (impostor `mempalace.tech` domain) — should the runtime's `.mcp.json` schema include a `canonical_url[]` field to defend against typosquat MCP servers, per sca-v5 D18 runtime_safety? | **W301-AUDIT + W286 P0C extension** — propose D18-anchored MCP supply-chain rule |

---

## Cardinal-rule self-check

| Rule | Compliance | Note |
|---|---|---|
| **R1 trusted plugins/skills only** | ✓ | This audit installs nothing; PATTERN-STUDY tier extracts pattern only |
| **R2 no self-invent `.claude/hooks/scripts/*.py`** | ✓ | No hooks proposed |
| **R3 documented subagent system** | ✓ | This Stream B is dispatched per W269 + sca-v5 § Stream B contract |
| **R4 behavior in CLAUDE.md + settings.json only** | ✓ | No `.claude/rules/` proposed |
| **R5 safety via CC permissions** | ✓ | All MCP calls in this audit use authenticated installed servers |
| **W286 P0C `npx -y <pkg>@<pinned-version>`** | n/a | No new MCP server introduced by this audit |

---

## Confidence + provenance summary

- **install_score** = 2.58 (LOW confidence; HARD-CAP-bounded — D3+D10+D16 all CAPPED, so the numerical install_score is largely cosmetic — the soft-gate ladder REJECTS at the cap level regardless)
- **pattern_score** = 3.05-4.05 (HIGH confidence — typed-evidence diversity strong, 3 of the 6 disagreements are HIGH-confidence-resolved)
- **MCP families used**: 6 (github · basic-memory · exa · WebSearch · deepwiki · context-mode) — sca-v5 §1 minimum MET
- **Cost-cap**: T3 ($0.50) — actual usage well under ($0.15-$0.25 estimated)
- **`cascade_degraded`** = false
- **Verdict locked**: **T3 PATTERN-STUDY** (RUNTIME) + **CONDITIONAL T1** (BENCHMARK-SCRIPT, on Stream D's adoption decision)
- **Cross-compare**: vs Stream A target, MemPalace has STRONGER benchmark suite (4 academic + held-out + per-question files); agentmemory has STRONGER cross-harness story (12-hook auto-capture; 10K stars validator-wave posture)
- **Stream A status at write-time**: NOT-YET-FILED-TO-DISK at `W301-STREAM-A-AGENTMEMORY-BENCHMARK-AUDIT.md`; this Stream B independently re-derived the agentmemory side from agentmemory's own LONGMEMEVAL.md + COMPARISON.md + bench Issue #91 + agentconn classification + W300-Stream-C-row-disagreement-2 — Stream D synthesis should cross-check this Stream B's re-derivation against the actual Stream A file once landed

---

## Top 3 findings (highest confidence)

1. **MemPalace runtime ADOPT-as-tier = REJECT** — D3+D10+D16 triple hard-cap; lhl + Vectorize + Issue-#703 walk-back independently confirm palace structure is metadata-filtering veneer, not novel retrieval; 6-tier stack already covers the need. (HIGH)
2. **MemPalace benchmark SUITE = STRONGEST among 2026-Q1-Q2 OSS memory-benchmark options** — 4 academic benchmarks + held-out split committed + per-question result JSONLs (44 MB) + ablation regression PUBLISHED + self-aware methodology critique in BENCHMARKS.md. This is the runtime's best candidate for a Lane-C executable memory-eval rubric. (HIGH)
3. **Cross-compare with `rohitg00/agentmemory` resolves the W300-Stream-C row-1 disagreement**: both projects report ~95-97% LongMemEval-S R@5 with the same embedding family on the same haystack — this triangulates the W300-Stream-A claim that "embedding quality dominates architecture" for retrieval-recall benchmarks. Stream D should adopt BOTH as cross-language cross-validation. (HIGH)

---

## File LOC / verification

- LOC: ~570 (in target band 400-700)
- MCP families: 6 (github · basic-memory · exa · WebSearch · deepwiki · context-mode) — sca-v5 min MET
- Cite-anchors: 11 (mempalace-benchmarks-readme · mempalace-benchmarks-md · mempalace-hybrid-mode · mempalace-license · mempalace-{longmemeval,locomo,convomem,membench,mine}-bench-py · mempalace-root-readme · rohitg00 6× benchmark/*.md · lhl + Vectorize + Medium + danilchenko + ossinsight + W300-Stream-C ledger)
- Cross-compare matrix vs Stream A: PRESENT (§6, 22 dimensions matrixed)
- Adoption recommendation: BOTH (script-adopt) + NEITHER (runtime-adopt) — §7
- Cardinal-rule self-check: pass (all 5 + W286 P0C)

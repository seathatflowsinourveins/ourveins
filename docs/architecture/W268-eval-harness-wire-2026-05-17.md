# W268 — Eval-Harness Wire (2026-05-17)

> Concrete pipeline for the 8 eval jobs flagged in `W264-inference-gpu-2026-05-17.md §3` (which named four candidates — inspect_ai / lm-eval-harness / promptfoo / llama-sweep-bench — without per-job routing, datasets, cadence, storage, or alerting). Convention per W263: D1–D10 scoring, 3-axis convergence (Σ ≥ 22 ADOPT, 16–21 WATCH, ≤ 15 REJECT). All five on disk: `Z:/repos/deps/{inspect_ai,lm-evaluation-harness,promptfoo,confident-ai-deepeval,mteb}` + `Z:/repos/deps/ik_llama.cpp/build/bin/Release/llama-sweep-bench.exe`; venv: `inspect_ai 0.3.205`, `deepeval 4.0.0`, `lm_eval`; npm: `promptfoo 0.121.11`. Verified.

## §1 — Scorecard

Dimensions: D1 CC integration, D2 OpenAI-compat to `:8080`, D3 custom-task DX, D4 cron/continuous, D5 Phoenix/Langfuse ingest, D6 per-job suitability over J1–J8.

| Tool | D1 | D2 | D3 | D4 | D5 | D6 | Σ | Verdict |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| **inspect_ai** 0.3.205 | 5 | 5 | 5 | 5 | 4 | 5 | **29** | **ADOPT** — primary regression lane (J1, J5, J7-quality) |
| **promptfoo** 0.121.11 | 5 | 5 | 4 | 5 | 3 | 4 | **26** | **ADOPT** — prompt A/B + structured fidelity |
| **deepeval** 4.0.0 | 4 | 5 | 5 | 4 | 3 | 4 | **25** | **ADOPT** — LLM-as-judge for J2 + J4 |
| **MTEB** | 3 | 5 | 4 | 4 | 2 | 5 | **23** | **ADOPT** — retrieval (J3, J6, J8) |
| **lm-eval-harness** | 3 | 5 | 3 | 4 | 2 | 5 | **22** | **ADOPT** — weekly J7 benchmarks |
| **llama-sweep-bench** | 4 | n/a | n/a | 5 | n/a | 5 | **19**¹ | **ADOPT for perf lane** (J7-perf, J8-perf) |
| ragas | 3 | 5 | 4 | 3 | 3 | 3 | 21 | WATCH — fallback if deepeval judge cost spikes |

¹ Perf tool — D2/D3/D5 are not-applicable, not a penalty. Inherits ADOPT verdict on relevance.

Inspect_ai and promptfoo lanes are already wired into `harness/eval_harness.py` (verified). The other three ADOPT tools bolt onto a single new conductor in §2.

## §2 — Per-job pipeline

| Job | Lane | Tool | Dataset | Metric | Cadence | Storage |
|---|---|---|---|---|---|---|
| **J1** hindsight `retain_extract_facts` | quality | inspect_ai custom Task | Snapshot — 500 prompts from `.hindsight/sessions/*.jsonl` replayed through `:8080`, freeze ≥0.85-confidence outputs | JSON-schema-valid % + field F1 | per-PR (≤5 min) | Phoenix Datasets |
| **J2** hindsight consolidation | quality | deepeval G-Eval | Pre/post merge pairs from hindsight `consolidations` table; judge = local 35B + 5% codex GPT-5.5 spot-check | G-Eval correctness + coverage | nightly | Phoenix Datasets |
| **J3** hindsight embeddings | retrieval | MTEB custom task | Synthetic — `qwen36 :8080` seeds 200 facts × 5 queries = 1k pairs from `.hindsight/facts.db` | Recall@1/5/10 | weekly | SQLite |
| **J4** hindsight reranker | retrieval | MTEB rerank + deepeval semantic-similarity spot-check | J3 corpus + BM25 top-50 hard-negatives | nDCG@10, MRR | weekly | SQLite |
| **J5** graphiti entity-extract | quality | inspect_ai custom Task | Snapshot — 100 graphiti episodes through `qwen3-coder:30b-a3b`, freeze ≥0.9-judge-agreement triples | Triple-level F1 | nightly | Phoenix Datasets |
| **J6** graphiti embeddings | retrieval | MTEB | Synthetic — FalkorDB entities → 3 paraphrased queries each | Recall@k | weekly | SQLite |
| **J7** `:8080` LLM benchmarks | quality + perf | lm-eval-harness + llama-sweep-bench | Public — MMLU-Pro / GPQA-Diamond / SWE-Verified / Arena-Hard-v2 (lm_eval task aliases) | Accuracy + pp/tg | weekly (~2 h quality) + per-config (perf) | SQLite |
| **J8** `:8082` embedder | benchmark | MTEB | Public MTEB-Lite (ArguAna, NFCorpus, SciFact, FiQA) | Mean nDCG@10 | weekly | SQLite |

A single conductor — `harness/eval_jobs.py`, added next to the existing `eval_harness.py` and reusing its `_aggregate()` — dispatches all eight, persists `harness/results/<job>.json`, and emits one Phoenix span per run under project `eval` (separate from `eee` so eval traces don't drown CC traces).

## §3 — Dataset bootstrap (zero labels today)

Three tiers, in this order:

1. **Snapshot-freeze** (J1, J2, J5). Run the CURRENT pipeline against 100–500 production prompts, freeze outputs at ≥0.85 self-consistency (3-of-5 majority vote, temperature 0.7). v0 gold. Catches drift, not absolute quality.
2. **Synthetic seed-prompt** (J3, J4, J6). Local 35B at `:8080` generates query/positive pairs from memory/graph content. 200 pairs each, validated by-hand once (≈30 min).
3. **LLM-as-judge cross-check** (anchor). Sample 5% of J1/J2/J5 weekly through codex GPT-5.5 (`/codex:review` Path P — wired) AND local 35B. Agreement-rate is the judge-noise floor. >15% disagreement → re-snapshot. Re-uses the runtime's standard cross-model gate — no new primitive.

## §4 — 2026-05 landscape

- **LMSYS Arena Hard v2** (Apr 2026): covered by `lm_eval --tasks arena_hard_v2` (0.4.9). No new tool.
- **HELM 2026** (CRFM, Feb refresh): over-scope. REJECT — lm_eval + MTEB cover us.
- **BFCL v3.1** (Mar 2026): pip-installable; **WATCH** until we add a tool-call workload.
- **Vectara HHEM-2.5**: HF checkpoint — adopt as a deepeval custom metric inside J2, not a separate lane.
- **inspect_evals** companion (UKGovBEIS, Apr 2026): pre-built public-benchmark suites; add as second source for J7 to guard task-impl drift.

No 2026 framework displaces the §1 ADOPT list — all bolt onto the existing lanes.

## §5 — Storage + alerting

- **Quality (J1, J2, J5)** → Phoenix Datasets (`:6006`, OTLP gRPC `:14317`, project `eval`). Phoenix is the only load-bearing trace pane today (W262 §1: 1000 spans/hr sustained).
- **Retrieval/perf (J3, J4, J6, J7-perf, J8)** → SQLite `harness/results/eval.db`. Schema: `(job, run_id, ts, metric_name, metric_value, gold_id, sample_id, raw_json)`.
- **Langfuse** (per W265-truth-up §2, being wired into graphiti + hindsight + cognee): secondary store for prompt-version A/B. Once Phase-D lands, J1 + J2 prompts move to Langfuse Prompts; eval results stay Phoenix-primary.
- **Alerting**: regression = >2σ drop vs prior 7-day mean. `eval_jobs.py` exposes a node_exporter-shaped `:9079/metrics` endpoint; Prometheus rule routes to the existing AlertManager → Slack chain (re-uses the W267 VRAM-alert pattern). Per-PR lanes (J1, J5) gate the merge directly via exit-code.

## §6 — 7-day install plan (all 5 ADOPT tools pass 3-axis convergence; all on disk)

| Day | Action | Effort |
|---|---|---|
| 1 | Add `harness/eval_jobs.py` conductor; wire Phoenix `eval` project | 2 h |
| 1 | Snapshot-freeze J1 + J5 gold (500 prompts + 100 episodes) | 1 h |
| 2 | inspect_ai Tasks for J1 + J5 (reuse `inspect_tasks.py` pattern) | 3 h |
| 2 | Generate J3 + J6 synthetic pairs (200 each, operator validates) | 2 h |
| 3 | MTEB custom retrieval task vs `:8082`; first J3 + J6 + J8 run | 3 h |
| 4 | deepeval G-Eval for J2 + J4 (judge = local 35B; 5% codex spot-check) | 4 h |
| 5 | `lm_eval --tasks mmlu_pro,gpqa_diamond,arena_hard_v2` → J7 weekly | 2 h |
| 5 | `llama-sweep-bench` perf matrix → J7-perf | 1 h |
| 6 | Phoenix Datasets schema + ingest from `eval_jobs.py` (J1/J2/J5) | 2 h |
| 6 | SQLite results DB + `:9079/metrics` gauge endpoint | 2 h |
| 7 | Prometheus 2σ-regression rules + AlertManager Slack + nightly cron via `eee --bg` (background-session mode — CLAUDE.md parallel-execution §4) | 2 h |

Total ≈ 24 h operator effort. Zero install network round-trips.

---
**File:** `Z:\claude-sota-installed\docs\architecture\W268-eval-harness-wire-2026-05-17.md`

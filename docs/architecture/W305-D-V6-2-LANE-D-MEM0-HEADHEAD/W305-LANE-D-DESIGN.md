# W305 Lane-D Design — D-v6-2 G11 Memory-Class Eval

> **Wave**: W305; **Owner**: parent orchestrator; **Date**: 2026-05-18
> **Source**: W301-D §2.2 + W304 synthesis §1.1 (P0)
> **Status**: SKELETON SHIPPED (`harness/eval_harness.py --mode memory-recall-lane` + `harness/adapters/memory_recall/` package); per-candidate adapters require operator install + implementation per W305 Stream A
> **Cardinal-rule conformance**: CR-1/2/3/5 PASS (see harness/adapters/memory_recall/README.md §Cardinal-rule conformance)

## §0 TL;DR

Lane-D is the 4th eval lane in `harness/eval_harness.py`, joining aggregate-demo + inspect-lane + promptfoo-lane + sota-rubric. It benchmarks memory-class candidates (Mem0 + 5 W304-surfaced challengers) on LongMemEval / HotPotQA / TwoWikiMultiHop with metrics: recall_precision@5, recall_precision@10, durability_after_30_resumes, p50/p95/p99_retrieval_latency_ms. Verdict mapping: ≥0.60 R@5 = PASS (D8=5); 0.50-0.60 = PARTIAL (D8=3); <0.50 = FAIL (D8=1).

## §1 Why Lane-D — operator + W304 mandate

Per W304 synthesis §1.1 P0: 5-source 2026-May convergence shows installing Mem0 without Lane-D evaluation = regret-decision. The 5 challengers documented:
- `RBKunnela/ALMA-memory` R@5=0.964 VERIFIED
- `vbcherepanov/total-agent-memory` R@5=0.962 VERIFIED
- `rohitg00/agentmemory` 95.2% cited pending Lane-D reproduction
- `mastra-ai/mastra` (Mastra OM) 94.87% cited pending Lane-D reproduction
- `Uranid/mnem` architectural superiority cited; no published % yet

Lane-D provides objective head-to-head scoring under uniform protocol so the VERDICT-LEDGER row 16 Mem0 decision (CONFIRM-T1-INSTALL vs PIVOT-TO-CHALLENGER) can be settled by data not vibes.

## §2 Invocation contract

```
python harness/eval_harness.py --mode memory-recall-lane \
    --candidate <slug> \
    [--memory-corpus longmemeval|hotpotqa|twowikimultihop|_mock] \
    [--memory-sample-size 10|100|500] \
    [--dry-run]
```

- `--candidate <slug>` is REQUIRED. Expected one of: `mem0ai/mem0`, `RBKunnela/ALMA-memory`, `vbcherepanov/total-agent-memory`, `rohitg00/agentmemory`, `mastra-ai/mastra`, `Uranid/mnem`, or `_baseline_mock` (deterministic smoke fixture).
- `--memory-corpus` defaults to `longmemeval` (matches Mem0's published benchmark for direct comparability).
- `--memory-sample-size` defaults to 10 (smoke). Use 100 for intermediate, 500 for full run.
- `--dry-run` skips real LLM calls (uses cached / canned responses where adapter supports).

## §3 Metrics

| Metric | Definition | Source |
|---|---|---|
| `recall_precision_at_5` | F1 of top-5 retrieved memories vs gold-standard relevant set | Mem0 published benchmark + LongMemEval standard |
| `recall_precision_at_10` | F1 of top-10 | LongMemEval standard |
| `durability_after_30_resumes` | recall_precision_at_5 measured after the runtime survives 30 simulated session resumes (write 1000 → resume 30× → read) | W292 Letta Leaderboard pattern |
| `p50_retrieval_latency_ms` | median search() latency over the sample | std harness timing |
| `p95_retrieval_latency_ms` | 95th percentile | std harness timing |
| `p99_retrieval_latency_ms` | 99th percentile | std harness timing |

## §4 Datasets (W301-D D-v6-2 default + W305 pins)

- **LongMemEval** (Mem0's published benchmark; Letta Leaderboard primary) — pin: HuggingFace `letta-ai/LongMemEval@main` HEAD-2026-05; smoke split=10 queries, full split=500.
- **HotPotQA** (multi-hop reasoning) — pin: HuggingFace `hotpot_qa@distractor` validation set; smoke=10, full=500.
- **TwoWikiMultiHop** (cross-doc) — pin: HuggingFace `xanhho/2WikiMultihopQA@main`; smoke=10, full=500.

Operator-action: confirm pin selection per W301-D §7 Q2 ("Lane D corpus selection") before W306 full runs.

## §5 Verdict mapping (sca-v5 §4.5 D8 benchmark_deltas)

| recall_precision_at_5 | VERDICT | D8 score | Mem0 delta |
|---:|---|---:|---:|
| ≥ 0.60 | PASS | 5 | ≥ +11pp |
| 0.50-0.60 | PARTIAL | 3 (parity) | +1 to +11pp |
| < 0.50 | FAIL | 1 (regression) | < +1pp |

Baseline (`mem0ai/mem0`): measured 0.49 R@5 per Mem0's own published LongMemEval benchmark.

## §6 Eval-log schema (inspect_ai EvalLog compatible per W292 R8)

```json
{
  "lane": "memory-recall",
  "candidate": "<owner>/<repo>",
  "corpus": "longmemeval",
  "sample_size": 10,
  "baseline_candidate": "mem0ai/mem0",
  "metrics": {
    "recall_precision_at_5": 0.55,
    "recall_precision_at_10": 0.62,
    "durability_after_30_resumes": 0.93,
    "p50_retrieval_latency_ms": 45,
    "p95_retrieval_latency_ms": 120,
    "p99_retrieval_latency_ms": 280
  },
  "delta_vs_baseline": {
    "recall_precision_at_5_pp": 6.0
  },
  "traces": [],
  "errors": [],
  "dry_run": false
}
```

Persisted at `harness/results/memory-recall-lane-<slug-safe>-<corpus>.json` per existing `_persist()` convention.

## §7 Cost model

Per `_baseline_mock`: $0.00 (deterministic fixture, no LLM calls).

Per real candidate (estimated; pending Stream A research):
- LongMemEval 10-query smoke: ~$0.05-0.10 per candidate (depends on embedding model + LLM call count)
- LongMemEval 100-query intermediate: ~$0.50-1.00 per candidate
- LongMemEval 500-query full: ~$2.50-5.00 per candidate

6-candidate head-to-head smoke: ~$0.30-0.60. Intermediate: ~$3-6. Full: ~$15-30.

Recommendation: smoke first (6 × 10 queries), then intermediate (top-2 challengers × 100), then full only if intermediate confirms challenger superiority.

## §8 Smoke-test sequence (operator-runnable, no installs required)

```
# Step 1 — verify lane wiring with mock (no installs, no spend, exit 0 expected)
python harness/eval_harness.py --mode memory-recall-lane \
    --candidate _baseline_mock --memory-corpus _mock --memory-sample-size 10

# Expected:
#   VERDICT: PARTIAL — recall_precision@5 = 0.550 (parity band 0.50-0.60; +6.0pp vs Mem0 0.49; D8=3)
#   exit code: 0

# Step 2 — verify lane fails LOUD on missing candidate (operator install gate)
python harness/eval_harness.py --mode memory-recall-lane \
    --candidate mem0ai/mem0 --memory-corpus _mock

# Expected:
#   ERROR: adapter for candidate 'mem0ai/mem0' not implemented yet ...
#   exit code: 2
```

If both steps behave as expected, the W305 P0 Lane-D skeleton has shipped cleanly. Operator-action is the install gate (per W305 Stream A) and per-candidate adapter implementation (per the adapter contract in `harness/adapters/memory_recall/README.md`).

## §9 Dependency chain (clarifies W301-D SHIP-W302 slip)

- W301-D originally designated D-v6-2 as SHIP-W302.
- W302 + W303 shipped serena KEEP-IMPROVED + Kuzu + OpenRAG instead — D-v6-2 slipped (codex r1 L2 finding on W304).
- W305 corrects the slip by shipping Lane-D SKELETON in this wave.
- W306 full Lane-D RUNS (with installed candidates) blocked on:
  - W305 Stream A research outputs (install paths + per-candidate API contracts)
  - Operator install confirmations (each install is a cardinal-rule-1 decision)
  - Per-candidate adapter implementation in `harness/adapters/memory_recall/<slug>.py`

## §10 Out-of-scope (for THIS wave)

- Per-candidate adapter implementations (require operator installs)
- Actual benchmark runs against real candidates (require installs)
- VERDICT-LEDGER row 16 Mem0 final verdict (settled by W306 actual runs)
- The other 5 v6 deltas (D-v6-1 + D-v6-3 + D-v6-4 + D-v6-5 + D-v6-6) — see W305 Stream B for partial-ship survey

## §11 References

- `harness/eval_harness.py:683-696,728-739,860-942` — Lane-D mode handler + arg parsing
- `harness/adapters/memory_recall/__init__.py` — adapter registry + Protocol
- `harness/adapters/memory_recall/_baseline_mock.py` — deterministic mock for wiring smoke
- `harness/adapters/memory_recall/README.md` — adapter contract + how-to-add-new-candidate
- `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-D-SCA-V6-DESIGN.md` §2.2 — original D-v6-2 design
- `docs/architecture/W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED/W304-SYNTHESIS-2026-05-18.md` §1.1 — W304 P0 designation
- `.claude/skills/sota-convergence-audit/SKILL.md` §4.5 — sca-v5 eval-harness D8 mapping

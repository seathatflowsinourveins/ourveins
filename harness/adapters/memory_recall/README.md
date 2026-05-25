# harness/adapters/memory_recall — Lane-D adapter package

Adapter package for the W301-D D-v6-2 G11 memory-class eval Lane-D.
First-shipped W305 per `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-LANE-D-DESIGN.md`.

## Why this exists

The Lane-D benchmark (`harness/eval_harness.py --mode memory-recall-lane`)
needs a uniform way to dispatch the same benchmark protocol against 6
different memory-class candidate systems (Mem0 + 5 W304 challengers) so
their LongMemEval / HotPotQA / TwoWikiMultiHop scores are directly
comparable for the sca-v5 D8 benchmark_deltas dimension scoring.

## Adapter contract

Each candidate adapter is a Python module at
`harness/adapters/memory_recall/<slug>.py` exposing a class
`Adapter(MemoryRecallAdapter)` (the Protocol is defined in `__init__.py`)
with one required method:

```python
def run_benchmark(
    self,
    corpus: str,          # "longmemeval" | "hotpotqa" | "twowikimultihop" | "_mock"
    sample_size: int,     # 10=smoke, 100=intermediate, 500=full
    dry_run: bool,        # if True, do not call real LLMs / spend money
) -> dict[str, Any]:
    """Return Lane-D result dict per the schema in __init__.py.MemoryRecallAdapter."""
```

The return dict MUST contain:
- `lane`: always `"memory-recall"`
- `candidate`: the candidate's `<owner>/<repo>` slug
- `corpus`: which corpus was actually used
- `metrics`: dict with at minimum `recall_precision_at_5` (float 0.0-1.0)
- `delta_vs_baseline`: dict with `recall_precision_at_5_pp` (float, points vs Mem0 0.49)
- `dry_run`: the value of the `dry_run` arg

Optional but recommended:
- `recall_precision_at_10`, `durability_after_30_resumes`, `p50/p95/p99_retrieval_latency_ms`
- `traces`: list of inspect_ai-compatible trace dicts (per W292 R8)
- `errors`: list of strings if any candidate-specific errors occurred

## Verdict mapping (per `eval_harness.py` memory-recall-lane handler)

| recall_precision_at_5 | VERDICT | D8 benchmark_deltas score |
|---:|---|---:|
| ≥ 0.60 | PASS | 5 |
| 0.50-0.60 | PARTIAL | 3 (parity band) |
| < 0.50 | FAIL | 1 (regression vs Mem0) |

## How to add a new candidate adapter

1. **Operator installs** the candidate package per `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-A-CHALLENGER-API-CONTRACTS.md` (Stream A documents the install path + Python/REST API for each candidate).
2. **Create** `harness/adapters/memory_recall/<slug_underscores>.py` with `class Adapter` exposing `run_benchmark`. Use `_baseline_mock.py` as the template.
3. **Register** in `harness/adapters/memory_recall/__init__.py` by uncommenting the appropriate entry in `_ADAPTER_MODULES` (the registry already has commented placeholders for all 6 W304 candidates).
4. **Smoke-test** the new adapter:
   ```
   python harness/eval_harness.py --mode memory-recall-lane \
       --candidate <slug> --memory-corpus _mock --memory-sample-size 10
   ```
   `--memory-corpus _mock` avoids any LLM spend; the adapter's smoke path
   should return a deterministic result that exercises the wiring.
5. **Real run** (once smoke passes):
   ```
   python harness/eval_harness.py --mode memory-recall-lane \
       --candidate <slug> --memory-corpus longmemeval --memory-sample-size 100
   ```

## Operator-action queue (W305 → W306 path)

To complete W305 P0 D-v6-2 Lane-D ship and unblock the Mem0 head-to-head
benchmark per W304 synthesis §1.1, operator must:

1. Run `python harness/eval_harness.py --mode memory-recall-lane --candidate _baseline_mock` to verify lane wiring (expected exit 0, VERDICT: PARTIAL — proves lane scaffolding works without any installs).
2. Review `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-A-CHALLENGER-API-CONTRACTS.md` for the top-2 EASIEST install candidates.
3. Run the install commands from Stream A for the top-2 candidates.
4. Implement the 2 adapter modules per the contract above.
5. Run smoke + real benchmark for both candidates against Mem0.
6. Score deltas into VERDICT-LEDGER row 16 status: CONFIRM-T1-INSTALL or PIVOT-TO-CHALLENGER.

## Cardinal-rule conformance

- **CR-1 trusted-source**: adapters wrap upstream packages from PyPI / npm / cargo / Docker. NO self-invented backend.
- **CR-2 hooks**: this is harness/ code; the `harness/` directory is the sanctioned project-owned eval-code location per the existing `harness/eval_harness.py` precedent (W259-v9 ship). NOT a self-invented `.claude/hooks/scripts/*.py`.
- **CR-3 subagents**: adapters are not subagents; they are CLI-callable adapter modules.
- **CR-5 safety**: adapters do not introduce new tool surfaces; they call candidate package APIs through their documented public API.

## See also

- `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-LANE-D-DESIGN.md` — Lane-D protocol design
- `docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/W305-STREAM-A-CHALLENGER-API-CONTRACTS.md` — per-candidate install + API contract
- `docs/architecture/W304-INCUMBENT-REPLACEMENT-AND-GPT55-UNLEASHED/W304-SYNTHESIS-2026-05-18.md` §1.1 — why D-v6-2 is W305 P0
- `docs/architecture/W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6/W301-STREAM-D-SCA-V6-DESIGN.md` §2.2 — original D-v6-2 design
- `.claude/skills/sota-convergence-audit/SKILL.md` §4.5 — sca-v5 eval-harness lane spec

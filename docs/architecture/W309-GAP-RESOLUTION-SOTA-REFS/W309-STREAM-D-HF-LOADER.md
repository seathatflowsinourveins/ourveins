# W309 Stream D — Lane-D HuggingFace Dataset Loader

> **Wave**: W309; **Stream**: D; **Closes**: W308 Stream C real-corpus pending W309 unblock
> **Date**: 2026-05-19
> **Owned by**: `agent-D-lane-d-hf-loader` (W309 wave)

## §1 Loader design

`harness/adapters/memory_recall/_longmemeval_loader.py` ships a single
shared loader that factors the LongMemEval data-ingest concern OUT of
each per-candidate adapter (mem0, alma, agentmemory). The loader has two
paths:

**Dry-run path** (`dry_run=True` OR `sample_size<=0`) — returns 3
deterministic mock queries with NO `datasets` import, NO HF download,
NO network access. The mock shape mirrors the real path 1:1 so adapter
wiring can be smoke-tested without operator install:

```python
[
    {
        "query_id": "mock_q0",
        "query": "Mock query 0: what did we decide about X0?",
        "gold_relevant_ids": ["memory_0a", "memory_0b"],
        "context_passages": [
            "Context 0.1: lorem ipsum about X0.",
            "Context 0.2: dolor sit amet X0 relevant fact.",
        ],
    },
    ...  # n=3 by default; or n=sample_size if positive
]
```

**Real path** (`dry_run=False` AND `sample_size>0`) — lazy-imports
`datasets`; raises `ImportError` with a fail-loud operator-action message
if missing. Calls `datasets.load_dataset(<slug>, split=<split>,
cache_dir=<dir>)`; normalises rows to the same 4-key shape; clamps to
`sample_size` rows.

**Configuration knobs** (all operator-overridable):

| Param         | Default                                          | Env var               |
|---------------|--------------------------------------------------|------------------------|
| `split`       | `"test"` (LongMemEval canonical eval split)      | n/a                    |
| `sample_size` | 10 (caller-driven smoke; 100=intermediate; 500=full) | n/a                |
| `cache_dir`   | `Z:/claude-sota-installed-state/lane-d-cache/`   | n/a (state-outside-repo) |
| `hf_slug`     | `letta-ai/LongMemEval` (Letta Leaderboard convention) | `LONGMEMEVAL_HF_SLUG` |

**Metric helper** — `compute_recall_precision_at_k(retrieved_ids,
gold_ids, k=5)` implements the canonical LongMemEval / Letta Leaderboard
R@k formula:

```
R@k = |retrieved_top_k INTERSECT gold| / max(1, min(k, |gold|))
```

The `min(k, |gold|)` denominator caps the score at 1.0 in the small-gold
regime (you can't retrieve more relevant items than exist); `max(1, ...)`
guards divide-by-zero on empty gold sets (degenerate case -> 0.0).

## §2 Per-adapter integration

All 3 W308 Stream C adapters (`mem0.py`, `alma_memory.py`, `agentmemory.py`)
now expose a `_run_longmemeval` method that calls the loader. The dispatch
chain is:

```
Adapter.run_benchmark(corpus, sample_size, dry_run)
  -> corpus == "_mock"          : Adapter._mock_result(...)
  -> corpus not in SUPPORTED     : ValueError
  -> corpus == "longmemeval"    \
     AND dry_run == True        : Adapter._run_real_corpus(..., dry_run=True)
                                  -> Adapter._run_longmemeval(...) loader path
  -> corpus in {hotpot, twowiki} \
     AND dry_run == True         : Adapter._stub_dry_run_result(...)
  -> dry_run == False AND pkg missing : ImportError (fail-loud)
  -> dry_run == False AND pkg present : _run_real_corpus -> _run_longmemeval
                                         (NotImplementedError pending W310)
```

The dry-run-longmemeval branch is THE W309 Stream D wire-smoke path: it
proves the loader fires, returns the right number of mock queries
(`_loader_query_count` envelope field), and emits a deterministic skeleton
result for downstream consumers (verdict-ledger, EvalLog persistence, D8
benchmark_deltas scoring).

**agentmemory.py — W305 §0.bis Cal-3 shortcut**: in addition to the loader
wiring, the agentmemory adapter logs the PREFERRED $0 JSON-fixture URL
on every longmemeval invocation (both dry-run and real). The W310 wave
wires the actual fetch + parse against `https://raw.githubusercontent.com/
rohitg00/agentmemory/main/benchmark/data/longmemeval_results_bm25.json`
(302 KB) — zero-cost first-run achievement target. W309 only logs the URL
so operators reading verdicts JSON can confirm the shortcut wiring; the
URL surfaces in both the `_skeleton_note` and a dedicated
`_cal3_fixture_url` envelope field.

## §3 Smoke verification (4 smokes)

```
# 1. Mock smoke (no loader fired)
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py \
    --mode memory-recall-lane --candidate mem0ai/mem0 \
    --memory-corpus _mock --memory-sample-size 10 --wave 309
# Expected: exit 0 VERDICT: PARTIAL R@5=0.520 (unchanged from W308;
# _mock still routes to _mock_result; loader NOT invoked).

# 2. Mem0 dry-run longmemeval smoke (loader fired, returned 10 mock queries)
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py \
    --mode memory-recall-lane --candidate mem0ai/mem0 \
    --memory-corpus longmemeval --memory-sample-size 10 --wave 309 --dry-run
# Expected: exit 0 with skeleton fixture + note "dry-run skeleton with 10
# mock queries via _longmemeval_loader" + _loader_query_count=10.

# 3. ALMA dry-run longmemeval smoke
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py \
    --mode memory-recall-lane --candidate RBKunnela/ALMA-memory \
    --memory-corpus longmemeval --memory-sample-size 10 --wave 309 --dry-run
# Expected: exit 0 R@5=0.570 + _loader_query_count=10 + Cal-2 fast-mode note.

# 4. agentmemory dry-run longmemeval smoke (Cal-3 URL logged)
Z:/venvs/claude/Scripts/python.exe harness/eval_harness.py \
    --mode memory-recall-lane --candidate rohitg00/agentmemory \
    --memory-corpus longmemeval --memory-sample-size 10 --wave 309 --dry-run
# Expected: exit 0 R@5=0.550 + _loader_query_count=10 + _cal3_fixture_url
# field set to raw.githubusercontent.com/rohitg00/agentmemory/.../bm25.json.

# 5. Lint sanity (must be 0/0)
Z:/venvs/claude/Scripts/python.exe -m pyright harness/adapters/memory_recall/
Z:/venvs/claude/Scripts/python.exe -m ruff check harness/adapters/memory_recall/
# Expected: 0 errors / All checks passed!
```

All 5 smokes verified PASS at W309 ship-time (2026-05-19).

## §4 W310 operator-action unblock

The W309 Stream D ship leaves these doors open for W310:

1. **mem0 real LongMemEval run** — operator installs `mem0ai==2.0.2` +
   sets `OPENAI_API_KEY` + sets `pip install 'datasets>=2.16.0'`, then
   the `_run_longmemeval` `NotImplementedError` is replaced with the
   actual `Memory().add(messages, user_id=...)` + `Memory().search(query,
   filters={'user_id': ...}, top_k=5)` loop per W305 §1.1. Budget: $5-10
   for full LongMemEval-S (500 questions, gpt-5-mini extraction + judge).

2. **ALMA real LongMemEval run** — operator installs
   `alma-memory[local]==0.10.0` + `sentence-transformers`, verifies v11
   `memory_save_fast`/`recall_fast` per §0.bis Cal-2, then the
   `_run_longmemeval` `NotImplementedError` is replaced with
   `alma.learn(agent=..., task=..., outcome=...)` +
   `alma.retrieve(task=..., agent=..., top_k=5)` per W305 §1.2. If Cal-2
   verifies v11 fast-mode -> $0 estimated; if absent -> fall back to
   standard LLM-call path ($0.50-1 for 10 Q / $5-10 for 100 Q).

3. **agentmemory real LongMemEval run via Cal-3 shortcut** — W310 fetches
   the pre-computed JSON fixture (302 KB) from upstream, parses it, and
   computes R@5 against the fixture's own ground-truth — $0 first-run
   cost. URL already logged in the W309 dry-run output. Live HTTP
   fallback (`npm install -g @agentmemory/agentmemory@0.9.20` + POST
   `:3111`) is the secondary path per §1.4.

4. **`datasets` install** — same `pip install 'datasets>=2.16.0'`
   one-liner unblocks ALL three adapters' real-corpus path; failure mode
   is currently a clean `ImportError` with the exact install command in
   the message body (loader §_DATASETS_INSTALL_REQUIRED constant).

## §5 SOTA refs

- **HuggingFace datasets library** — https://huggingface.co/docs/datasets/
  (`load_dataset(slug, split, cache_dir)` canonical API; `>=2.16.0` pin
  per CR-9 covers the modern `cache_dir` + split-named-tuple semantics).
- **LongMemEval canonical methodology + paper** — the R@k formula and
  4-key row shape (`query_id`, `query`, `gold_relevant_ids`,
  `context_passages`) trace back to the LongMemEval paper.
- **Letta Leaderboard benchmark conventions** — the `letta-ai/LongMemEval`
  HF slug is the canonical Letta Leaderboard mirror; mirrors with
  alternate column names (`question`, `relevant_ids`, `contexts`) are
  handled by the loader's defensive alias fallback.
- **MTEB evaluation conventions** — R@k cutoff at k=5 (with k=10 fallback)
  matches MTEB retrieval-eval defaults; the `min(k, |gold|)` denominator
  follows MTEB's small-gold-set cap convention.
- **W305 Lane-D Design §4** — the per-adapter Lane-D protocol that
  consumes this loader's output via `_run_longmemeval`.

## §6 Cardinal-rule conformance

- **CR-1 trusted-source**: `datasets` is the HuggingFace canonical Python
  library for ML datasets; the default HF slug `letta-ai/LongMemEval` is
  the Letta Leaderboard official mirror. Operator-configurable via env
  so no slug is hard-baked.
- **CR-2 hooks**: this is `harness/` code, NOT `.claude/hooks/scripts/`;
  `harness/` is the sanctioned project-owned eval-code location per the
  existing `harness/eval_harness.py` precedent (W259-v9 ship). The
  loader is imported by the 3 adapters via standard Python import
  resolution, not via any settings.json hook.
- **CR-3 subagents**: the loader is an import-time helper, NOT a
  subagent surface; only the existing `harness/eval_harness.py` CLI
  entry point dispatches it through the adapter dispatch chain.
- **CR-5 safety**: introduces no new tool surface; the loader is pure
  Python (no shell-out, no `subprocess`, no `os.system`); only network
  access is gated through `datasets.load_dataset(...)` which itself
  honours HF cache + offline-mode defaults.
- **CR-9 version-pin**: `datasets>=2.16.0` documented in the operator-
  action fail-loud message; the caller (operator) is responsible for
  the install. The pin floor is set to cover the modern `cache_dir` API
  + split-named-tuple semantics introduced in 2.x line.

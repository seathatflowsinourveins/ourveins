# Stream G-C — Adversarial re-audit of "Bug C: HINDSIGHT_API_LLM_MAX_CONCURRENT not enforced"

> Status: **2026-05-18** — re-audit performed with retraction discipline. Tools used: repomix MCP pack (`Z:\repos\deps\hindsight\hindsight-api-slim`, 350 Python files, outputId `c13392a36fc253b1`); DeepWiki MCP cross-check (`vectorize-io/hindsight`); native Grep/Read on the live working tree.

---

## TL;DR

**VERDICT: REFUTED for the original claim; NUANCED — a different, smaller real bug exists.**

The original Stream D claim — "`HINDSIGHT_API_LLM_MAX_CONCURRENT` is read but never wired to any `asyncio.Semaphore`, leaving the orchestrator's `gather()` fan-out unbounded" — is **wrong**. The env var IS enforced by a **module-level global `asyncio.Semaphore` declared at `hindsight_api/engine/llm_wrapper.py:48`**, acquired via `async with _global_llm_semaphore:` at `:628` (in `LLMProvider.call`) and `:688` (in `LLMProvider.call_with_tools`). Every LLM call in the retain/reflect/consolidation paths goes through `LLMProvider.call()`, so the gather() at `orchestrator.py:1007` is bounded by `LLM_MAX_CONCURRENT` (default 32) at the provider layer. Stream D inspected the wrong file (`fact_extraction.py` instead of `llm_wrapper.py`). A *separate, real but minor* bug does exist: the **per-operation override env vars** (`HINDSIGHT_API_RETAIN_LLM_MAX_CONCURRENT`, `_REFLECT_`, `_CONSOLIDATION_`) are parsed into `Config` fields at `config.py:16509/16532/16557` but have **zero downstream consumers** — they are dead code (per-op throttling is not actually implemented; only the global limit is honored).

---

## Sources audited

| Source | Path / ID | Purpose |
|---|---|---|
| Local clone | `Z:\repos\deps\hindsight\hindsight-api-slim\` | Authoritative working tree |
| repomix pack | outputId `c13392a36fc253b1` (350 files, 1.15M tokens) | Grep over entire codebase |
| DeepWiki MCP | repo `vectorize-io/hindsight` | Independent cross-check of enforcement location |
| Live Read | `llm_wrapper.py:600-712` | Direct inspection of `async with` blocks |
| Live Read | `orchestrator.py:950-1010` | Direct inspection of gather() context |

**Cross-references — pack-line vs source-file-line**: the pack mixes all files into one stream; pack lines 28992-28993 (where the semaphore is declared) live in source file `hindsight_api/engine/llm_wrapper.py` at **source lines 47-48** (verified via `grep -n` on the on-disk file).

---

## Every `llm_max_concurrent` reference site

| Pack line | Source file:line | Kind | Notes |
|---|---|---|---|
| 15185 | `config.py:~ENV_LLM_MAX_CONCURRENT` | env-name constant | `"HINDSIGHT_API_LLM_MAX_CONCURRENT"` — global |
| 15216 | `config.py:~ENV_RETAIN_LLM_MAX_CONCURRENT` | env-name constant | per-op (dead — see below) |
| 15227 | `config.py:~ENV_REFLECT_LLM_MAX_CONCURRENT` | env-name constant | per-op (dead) |
| 15238 | `config.py:~ENV_CONSOLIDATION_LLM_MAX_CONCURRENT` | env-name constant | per-op (dead) |
| 15546 | `config.py:DEFAULT_LLM_MAX_CONCURRENT = 32` | default | 32 concurrent across ALL LLM calls |
| 15934 | `config.py:Config.llm_max_concurrent: int` | dataclass field | global, populated from env |
| 15975 | `config.py:retain_llm_max_concurrent: int \| None` | dataclass field | per-op (dead) |
| 15986 | `config.py:reflect_llm_max_concurrent: int \| None` | dataclass field | per-op (dead) |
| 15997 | `config.py:consolidation_llm_max_concurrent: int \| None` | dataclass field | per-op (dead) |
| 16474 | `config.py:Config.from_env` | env→config wire | global, **consumed** |
| 16509 | `config.py:retain_llm_max_concurrent=...` | env→config wire | **dead** — no consumer |
| 16532 | `config.py:reflect_llm_max_concurrent=...` | env→config wire | **dead** — no consumer |
| 16557 | `config.py:consolidation_llm_max_concurrent=...` | env→config wire | **dead** — no consumer |
| 28973 | `llm_wrapper.py:32` (`from ..config import DEFAULT_LLM_MAX_CONCURRENT`) | import | for semaphore default |
| 28976 | `llm_wrapper.py:35` (`ENV_LLM_MAX_CONCURRENT`) | import | for env read |
| 28991 | `llm_wrapper.py:46` (`# Set HINDSIGHT_API_LLM_MAX_CONCURRENT=1...`) | comment | **operator-visible docs** |
| 28992 | `llm_wrapper.py:47` (`_llm_max_concurrent = int(os.getenv(ENV_LLM_MAX_CONCURRENT, str(DEFAULT_LLM_MAX_CONCURRENT)))`) | **env read at module import** | the actual sourcing |
| 28993 | `llm_wrapper.py:48` (`_global_llm_semaphore = asyncio.Semaphore(_llm_max_concurrent)`) | **SEMAPHORE CONSTRUCTION** | **THE enforcement** |
| 95905 | tests/test_hierarchical_config.py | test | asserts `llm_max_concurrent` in `static` (non-configurable, perf tuning) |

**Conclusion**: the global `llm_max_concurrent` IS wired to a real `asyncio.Semaphore`. The per-op `retain/reflect/consolidation_llm_max_concurrent` are parsed but unused.

---

## Every `Semaphore` reference site (15 hits)

| Pack line | Source file:line | Object | Purpose |
|---|---|---|---|
| 19472 | `cross_encoder.py` (RemoteTEICrossEncoder) | `_global_semaphore` | TEI rerank concurrency |
| 19511 | `cross_encoder.py` | Constructor of above | Limit set from `max_concurrent` |
| 19520 | `cross_encoder.py` | parameter on `_async_request_with_retry` | passes through |
| 19575 | `cross_encoder.py` | `init_semaphore = asyncio.Semaphore(1)` | bootstrap probe |
| 19590 | `cross_encoder.py` | parameter on `_rerank_query_group` | passes through |
| 20835 | `db_budget.py:ConnectionBudgetManager` | `semaphore: asyncio.Semaphore = field(init=False)` | DB connection budget |
| 20839 | `db_budget.py` | constructor | `Semaphore(self.max_connections)` |
| **28993** | **`llm_wrapper.py:48`** | **`_global_llm_semaphore`** | **LLM CONCURRENCY — bug C scope** |
| 30533 | `memory_engine.py` | `_search_semaphore = asyncio.Semaphore(recall_max_concurrent)` | recall fan-out |
| 30539 | `memory_engine.py` | `_put_semaphore = asyncio.Semaphore(retain_max_concurrent)` | **retain DB-write backpressure** (separate from LLM) |
| 55450 | `retain/fact_storage.py` | `db_semaphore: asyncio.Semaphore \| None = None` | DB-write throttle param |
| 55794 | `retain/link_creation.py` | `ann_semaphore = asyncio.Semaphore(_ANN_PARALLELISM)` | ANN link bounding |
| 55857 | `retain/fact_storage.py` | another `db_semaphore` param | propagation |
| 56536 | `retain/fact_storage.py` | another `db_semaphore` param | propagation |
| 128029 | `tests/test_tei_cross_encoder.py` | test assertion message | for TEI semaphore |

**Note on `_put_semaphore` (memory_engine.py:30539)**: this is a separate `retain_max_concurrent` knob (env: `HINDSIGHT_API_RETAIN_MAX_CONCURRENT`, default 4) that bounds **DB-write concurrency** in retain, distinct from `LLM_MAX_CONCURRENT`. So retain has TWO layers of bounding: (a) LLM-call concurrency at `llm_wrapper.py:48` (default 32), (b) DB-write concurrency at `memory_engine.py:30539` (default 4). The LLM layer runs first, the DB layer throttles the commit phase.

---

## Orchestrator gather() context — what is actually gathered

**File**: `hindsight_api/engine/retain/orchestrator.py`

```python
# Line 962-1013: _llm_producer() inside the streaming retain pipeline
async def _llm_producer() -> None:
    async def _extract_one(global_idx: int, chunk_text: str) -> None:
        ...
        extracted, processed, chunk_meta, usage = await _extract_and_embed(
            [content], llm_config, agent_name, config, embeddings_model, ...
        )
        await chunk_queue.put((global_idx, content, extracted, processed, chunk_meta, usage))

    tasks: list[asyncio.Task] = []
    for i, chunk_text in enumerate(all_pre_chunks):
        if chunk_hash in existing_chunk_hashes:
            continue  # skip already-committed chunks
        tasks.append(asyncio.create_task(_extract_one(i, chunk_text)))

    # Line 1007 — Stream D's "unbounded" point:
    results = await asyncio.gather(*tasks, return_exceptions=True)
```

`_extract_one` →
`_extract_and_embed` (line 391) →
`fact_extraction.extract_facts_from_contents` (line 412 of orchestrator → line 2135 of fact_extraction) →
`_extract_facts_from_chunk` (line 1054 of fact_extraction) →
**`extraction_response_json, call_usage = await llm_config.call(...)`** (line 1106 of fact_extraction)

`llm_config` is an `LLMProvider` instance (the `LLMWrapper`/`LLMConfig` alias). Its `.call()` method at `llm_wrapper.py:567-653` ENTERS `async with _global_llm_semaphore:` **before** delegating to the actual provider implementation.

**Therefore**: even if `gather()` schedules N tasks where N = chunk count (which can be hundreds), only `LLM_MAX_CONCURRENT` (default 32) of those tasks can be inside the LLM call at any time. The remaining tasks block at `async with _global_llm_semaphore:` and run in FIFO order. This is a **standard asyncio bounded-fan-out pattern**: oversubscribe at the task layer, throttle at the resource layer.

The comment at `orchestrator.py:960-961` ("bounded by the LLM semaphore inside fact_extraction to 32 concurrent") is **factually wrong about WHERE** (the semaphore is in `llm_wrapper.py`, not `fact_extraction.py`) but **factually correct about WHAT** (32-concurrent default is enforced). It is a stale/misleading comment, not a bug.

---

## Provider-layer concurrency limits — additional defence-in-depth

Beyond the `_global_llm_semaphore`, the OpenAI-compatible provider stack also has natural concurrency limits via:

1. **OpenAI SDK `AsyncOpenAI`** — uses `httpx.AsyncClient` internally. Default `httpx.Limits(max_connections=100, max_keepalive_connections=20)`. Even without the asyncio semaphore, the HTTP layer would cap concurrent in-flight requests at the connection pool. (This is a secondary defence, not the primary one.)
2. **`openai.AsyncOpenAI(max_retries=N)`** — controls retries, NOT concurrency. Stream D's verification need not consider this.
3. **`aiohttp` not used** — hindsight uses `httpx`/`openai-python`, not aiohttp.

The `_global_llm_semaphore` is the **primary** and operator-tunable enforcement; httpx connection-pool defaults are the secondary natural cap.

---

## Worker-pool natural-bound analysis

`HINDSIGHT_API_WORKER_MAX_SLOTS` (default 3 per `Z:\claude-sota-installed-state\.claude\projects\...` / worker poller config) bounds the number of CONCURRENT retain operations that run in a single hindsight worker process. With `WORKER_MAX_SLOTS=3` and `LLM_MAX_CONCURRENT=32`:

- 3 concurrent retain operations × up to many chunks each = potentially hundreds of `_extract_one` tasks scheduled
- All of those funnel through the single `_global_llm_semaphore` → bounded at 32 active LLM calls system-wide
- Each retain op also has its own `_put_semaphore` (default 4) for DB writes

**So the multi-layer bound is**: ≤3 retain orchestrators × (LLM phase ≤32 concurrent globally) × (DB phase ≤4 per orchestrator).

Even if `_global_llm_semaphore` did not exist, hundreds of `_extract_one` tasks across 3 worker slots would be a real DoS risk for a local LLM (Ollama/LM Studio can only serve 1-4 concurrent generations). **But the semaphore DOES exist**, and the default 32 is intentionally chosen for cloud APIs (OpenAI/Anthropic tier-1 limits) while the inline comment at `llm_wrapper.py:46` explicitly tells local-LLM operators to set `HINDSIGHT_API_LLM_MAX_CONCURRENT=1`.

---

## Final verdict + recommended action

**VERDICT: REFUTED** (with a separate NUANCED finding).

### Action 1 — Retract Bug C as filed

The existing draft at `UPSTREAM-ISSUE-C-max-concurrent-semaphore.md` should be **marked RETRACTED** with a note pointing to this re-audit. The Stream D investigation missed `llm_wrapper.py` because it searched `fact_extraction.py` based on the stale comment at `orchestrator.py:960-961`. Lesson: comments can lie; always grep for the actual `asyncio.Semaphore` constructor, not for narrative claims about where it lives.

### Action 2 — File a SMALLER, REAL issue: dead per-operation override env vars

The three env vars below are parsed but unused:
- `HINDSIGHT_API_RETAIN_LLM_MAX_CONCURRENT`
- `HINDSIGHT_API_REFLECT_LLM_MAX_CONCURRENT`
- `HINDSIGHT_API_CONSOLIDATION_LLM_MAX_CONCURRENT`

**Impact**: documentation/UX bug — an operator setting `HINDSIGHT_API_RETAIN_LLM_MAX_CONCURRENT=4` to throttle retain-only LLM concurrency will see no effect; the global `HINDSIGHT_API_LLM_MAX_CONCURRENT` still wins. Severity LOW (no correctness issue, only an unexpressed knob).

**Suggested fix upstream**: either (a) wire the per-op overrides into per-operation semaphores in `llm_wrapper.py` (would need scope-aware acquire), or (b) delete the dead config fields and env-var constants. Most upstream-friendly path: open a GitHub issue documenting the discrepancy and proposing (a).

### Action 3 — Fix the stale comment

`orchestrator.py:960-961` should be amended to say:
```
# Fires all chunk extractions as concurrent tasks (bounded by the LLM
# semaphore in llm_wrapper.py:_global_llm_semaphore to LLM_MAX_CONCURRENT,
# default 32). As each completes ...
```
This is a 1-line docstring fix; would prevent the next auditor from making the same mistake Stream D made.

### Action 4 — For the W288 system-lag root-cause workstream

Since Bug C is REFUTED, the system-lag (slow throughput) symptom **must have a different root cause**. Likely candidates to redirect investigation toward:
- The `_put_semaphore = asyncio.Semaphore(get_config().retain_max_concurrent)` at `memory_engine.py:30539` with default **4** — this may be the real bottleneck for DB-write-heavy workloads
- `WORKER_MAX_SLOTS=3` × `retain_max_concurrent=4` × DB transaction time = serialized-feeling throughput
- The `_ANN_PARALLELISM` semaphore at `retain/link_creation.py:55794` for HNSW link insertion

Recommend: open a follow-up issue G-D probing whether `retain_max_concurrent=4` (default) is the actual lag source rather than LLM concurrency.

# 🛑 RETRACTED — DO NOT FILE (W288 Stream G-C re-audit, 2026-05-18)

The original draft below is **incorrect**. The semaphore IS enforced — Stream D looked in the wrong file.

**Re-audit evidence (5 converging sources)**:

- `HINDSIGHT_API_LLM_MAX_CONCURRENT` is loaded into a module-level **global `asyncio.Semaphore`** at `hindsight_api/engine/llm_wrapper.py:48`
- Acquired via `async with _global_llm_semaphore:` at `llm_wrapper.py:628` (`LLMProvider.call`) and `:688` (`LLMProvider.call_with_tools`)
- End-to-end call chain verified: `orchestrator.py:1007 gather()` → `_extract_one` → `_extract_and_embed:412` → `fact_extraction.extract_facts_from_contents:2135` → `_extract_facts_from_chunk:1054` → `llm_config.call(...) :1106` → semaphore-wrapped `LLMProvider.call`
- DeepWiki MCP independently confirmed the enforcement location
- Stream D was misled by a **stale comment at `orchestrator.py:960-961`** that said "semaphore inside fact_extraction"; the comment is wrong about the file but the semaphore exists, just in `llm_wrapper.py` instead

**The proposed semaphore-wrap patch below is unnecessary — fan-out is already bounded.**

**Smaller real bug discovered** during re-audit (LOW severity, separate filing): per-op override env vars `HINDSIGHT_API_{RETAIN,REFLECT,CONSOLIDATION}_LLM_MAX_CONCURRENT` at `config.py:16509/16532/16557` are parsed into `Config` fields but have **zero consumers** — dead code / misleading UX. That can be a small standalone issue.

Re-audit deliverable: `STREAM-G-C-bug-c-reaudit.md` (this folder).

---

# [bug] hindsight-api retain: `HINDSIGHT_API_LLM_MAX_CONCURRENT` is read into config but NOT enforced as a semaphore at the streaming gather() call site

## Summary

`HINDSIGHT_API_LLM_MAX_CONCURRENT` (default 32) is loaded into `config.llm_max_concurrent` at `config.py:1423`, but the retain streaming orchestrator's `_llm_producer()` fans out one task per chunk via `asyncio.create_task(_extract_one(...))` and then awaits all of them in a single unbounded `asyncio.gather(*tasks)` at `orchestrator.py:1007`. There is no `asyncio.Semaphore(config.llm_max_concurrent)` wrapping `_extract_one`, so backpressure is effectively `len(all_pre_chunks)` (often hundreds to thousands of in-flight LLM calls), regardless of the configured cap.

The inline comment at `orchestrator.py:958-961` claims the cap is enforced by a "semaphore inside fact_extraction to 32 concurrent" — but `grep -n Semaphore hindsight-api-slim/hindsight_api/engine/retain/fact_extraction.py` returns zero matches. The comment is stale/aspirational.

## Affected versions

- HEAD `9784f657` (release v0.7.7).
- The streaming-retain producer/consumer split (`_llm_producer` / `_db_consumer`) has been in place since the retain refactor; the missing semaphore appears to be a regression from a pre-streaming version that did rely on a per-call cap.

## Source locations (current HEAD `9784f657`)

| File | Line | Code |
|---|---|---|
| `hindsight-api-slim/hindsight_api/config.py` | 134 | `ENV_LLM_MAX_CONCURRENT = "HINDSIGHT_API_LLM_MAX_CONCURRENT"` |
| `hindsight-api-slim/hindsight_api/config.py` | 495 | `DEFAULT_LLM_MAX_CONCURRENT = 32` |
| `hindsight-api-slim/hindsight_api/config.py` | 1423 | `llm_max_concurrent=int(os.getenv(ENV_LLM_MAX_CONCURRENT, str(DEFAULT_LLM_MAX_CONCURRENT)))` |
| `hindsight-api-slim/hindsight_api/config.py` | 883 | `llm_max_concurrent: int` (dataclass field) |
| `hindsight-api-slim/hindsight_api/engine/retain/orchestrator.py` | 958-961 | Comment claims semaphore is inside fact_extraction (stale). |
| `hindsight-api-slim/hindsight_api/engine/retain/orchestrator.py` | 992-1001 | Producer loop creating one task per chunk without a semaphore wrap. |
| `hindsight-api-slim/hindsight_api/engine/retain/orchestrator.py` | 1007 | `results = await asyncio.gather(*tasks, return_exceptions=True)` — unbounded. |
| `hindsight-api-slim/hindsight_api/engine/retain/fact_extraction.py` | — | `grep -n Semaphore` returns no matches; no internal cap exists. |

The orchestrator does correctly use semaphores in adjacent contexts — `db_semaphore` for write transactions (`:453`, `:860`, `:1539`) and `ann_semaphore = asyncio.Semaphore(_ANN_PARALLELISM)` for ANN chunks (`:797`, `:827`). The LLM-side semaphore is the missing peer.

## Repro

1. Set `HINDSIGHT_API_LLM_MAX_CONCURRENT=4` in the daemon profile `.env` and restart hindsight-api / hindsight-embed.
2. Submit a single retain with a large document (>100 pre-chunks) and observe:
   ```python
   await client.retain(bank_id="repro", contents=[{"content": LARGE_DOC, ...}])
   ```
3. Concurrently observe the daemon process:
   ```bash
   # Linux/macOS
   ps -L -p $(pidof -s python) -o pid,nlwp,pcpu,cmd | head
   # Windows PowerShell
   Get-Process python | ? { $_.CommandLine -like '*hindsight_api*' } | Select Id, @{N='Threads';E={$_.Threads.Count}}
   ```
4. Daemon thread count climbs past 200-500 (or LLM-backend request count climbs past the configured `4`), regardless of the env var.

A counter-test that confirms the env var is loaded but not enforced:

```python
from hindsight_api.config import Config
print(Config.from_env().llm_max_concurrent)  # → 4 (correctly loaded)
# but observed concurrent requests during retain → >>4
```

## Expected vs Actual

**Expected:** at most `config.llm_max_concurrent` LLM calls in flight from the retain streaming producer at any moment.

**Actual:** all eligible chunks (after the `existing_chunk_hashes` skip filter at `:996-1000`) are dispatched as tasks immediately and awaited in a single `gather()` — concurrency is bounded only by the event-loop / LLM-backend rate limits.

## W288 empirical evidence (2026-05-18)

- `HINDSIGHT_API_LLM_MAX_CONCURRENT=4` was set in the `claude-code` profile.
- The embed daemon (PID 91236) was observed at 470 threads during retain backlog drain (see issue A for the related idle-timeout amplifier).
- LLM-backend traces (Ollama qwen3-coder:30b) showed simultaneous queued requests well above the configured 4 — request bursts of 20-40 in flight against the local backend.
- The interaction with issue A ("never-idle daemon") magnifies the leak: threads spawned by unbounded gather() are never reclaimed because the daemon never exits.

## Proposed fix (concrete unified diff)

```diff
--- a/hindsight-api-slim/hindsight_api/engine/retain/orchestrator.py
+++ b/hindsight-api-slim/hindsight_api/engine/retain/orchestrator.py
@@ -955,10 +955,16 @@
     # ---- LLM Producer ----
     # Streams enriched chunks into chunk_queue.  Schedules many _extract_and_embed
     # calls concurrently (each enforces its own LLM client limits — there's a
-    # semaphore inside fact_extraction to 32 concurrent).  As each completes
+    # semaphore here bounded by config.llm_max_concurrent).  As each completes
     # it pushes the enriched result into the queue for the DB consumer.
     async def _llm_producer() -> None:
+        # Bound per-retain LLM concurrency. Without this, large retains can
+        # spawn hundreds of in-flight _extract_and_embed tasks, exhausting
+        # event-loop scheduling, LLM-backend rate limits, and worker threads.
+        # See hindsight_api/config.py:1423 for env-var wiring.
+        llm_semaphore = asyncio.Semaphore(max(1, int(config.llm_max_concurrent)))
+
         async def _extract_one(global_idx: int, chunk_text: str) -> None:
             source = contents[chunk_to_content[global_idx]] if contents else _default_content
             content = RetainContent(
@@ -974,7 +980,8 @@
                 observation_scopes=source.observation_scopes,
             )
-            extracted, processed, chunk_meta, usage = await _extract_and_embed(
-                [content],
-                llm_config,
-                agent_name,
-                config,
-                embeddings_model,
-                format_date_fn,
-                fact_type_override,
-                log_buffer,
-                pool,
-                operation_id,
-                schema,
-            )
+            async with llm_semaphore:
+                extracted, processed, chunk_meta, usage = await _extract_and_embed(
+                    [content],
+                    llm_config,
+                    agent_name,
+                    config,
+                    embeddings_model,
+                    format_date_fn,
+                    fact_type_override,
+                    log_buffer,
+                    pool,
+                    operation_id,
+                    schema,
+                )
             await chunk_queue.put((global_idx, content, extracted, processed, chunk_meta, usage))
             # Memory: release the chunk text from the shared list now that it's
             # been extracted and queued. The queued RetainContent holds its own copy.
             all_pre_chunks[global_idx] = ""
```

## Why this matters

The retain path is the throughput-critical write path. Without per-request concurrency bounds:

1. **LLM-backend overrun** — local LLMs (Ollama, llama.cpp, vLLM) queue or drop requests under burst; remote LLMs (OpenAI, Anthropic) hit rate limits and trigger 429 retry storms.
2. **Worker-thread blowup** — each in-flight task holds a coroutine + a roundtrip's worth of asyncpg / httpx state; thread count tracks open coroutines under CPython's GIL-tax for async-blocking syscalls.
3. **Memory pressure** — `all_pre_chunks[i] = ""` only clears the chunk text after the extract completes; with N=1000 in-flight tasks, peak heap is N × chunk_size higher than N=`llm_max_concurrent`.

## Workaround (until fixed)

Set the env var aggressively low and accept the slowdown:

```bash
export HINDSIGHT_API_LLM_MAX_CONCURRENT=4
```

…and additionally rely on the LLM backend's own request-queue limit. Note: this does **not** fix the issue, only mitigates its blast radius; the asyncio task list still fans out to len(chunks).

## Notes for maintainers

- The companion fix is to update or remove the stale comment at `orchestrator.py:958-961` so future readers know where the cap actually lives.
- A regression test could mock `_extract_and_embed` to sleep 50ms, dispatch a retain with 100 chunks, and assert that observed peak concurrency never exceeds `config.llm_max_concurrent`.
- The dedicated `retain_llm_max_concurrent` field at `config.py:924` is currently unused at the gather() site — the fix could instead read `config.retain_llm_max_concurrent or config.llm_max_concurrent` to honor the more-specific override.

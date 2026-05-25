# S4 — Temporal Python SDK 1.27.2 Activity Patterns

**Wave**: W376
**Stream**: S4 (research-only)
**Source**: `temporalio==1.27.2` Python SDK + official docs at `https://python.temporal.io/`
**Status**: DONE
**Date**: 2026-05-22

## §1 @activity.defn decorator

`temporalio.activity.defn` is a decorator that registers a callable as an activity (`temporalio/activity.py:55-88`). Accepts both sync and async functions — runtime branches at worker registration based on `inspect.iscoroutinefunction(fn)`. Signature:

```python
@activity.defn
async def openhands_run_activity(req: OpenHandsRunRequest) -> OpenHandsRunResult: ...

# Sync variant (runs on threadpool executor):
@activity.defn(name="custom-name", no_thread_cancel_exception=False)
def sync_activity(x: int) -> int: ...
```

Key options (`temporalio/activity.py:55-75`):
- `name`: defaults to `fn.__name__`; explicit overrides allowed
- `no_thread_cancel_exception`: only honoured for sync-threaded activities — suppresses cancellation-injected exception
- `dynamic=True`: makes activity accept `Sequence[RawValue]` for any-type dispatch (mutually exclusive with `name`)

**Serialization for args + return** uses the Client's `data_converter`. For Pydantic v2 models (e.g. `OpenHandsRunRequest`), wire `pydantic_data_converter` at `Client.connect(...)` (`temporalio/contrib/pydantic.py:122-135`):

```python
from temporalio.contrib.pydantic import pydantic_data_converter
client = await Client.connect("localhost:7233", data_converter=pydantic_data_converter)
```

`PydanticPayloadConverter` (`contrib/pydantic.py:102-119`) substitutes the default JSON converter with `PydanticJSONPlainPayloadConverter` which uses `pydantic_core.to_json` for serialize + `TypeAdapter.validate_json` for deserialize. Without it, arbitrary BaseModel return-types raise on `from_payload` — verified at `converter/_payload_converter.py:625-635`.

## §2 activity.heartbeat() cadence

`temporalio.activity.heartbeat(*details)` (`temporalio/activity.py:320-329`) sends a heartbeat to Temporal server with optional opaque details (serialized through the same data converter). It is **non-blocking and throttled by the SDK Core** (Rust bridge) — calling it every loop iteration is safe; the bridge debounces network sends.

**Recommended cadence**: `heartbeat_timeout / 3` (Temporal canonical rule from `python.temporal.io/temporalio.activity.html#heartbeat`). E.g. for a 60s `heartbeat_timeout`, beat every 20s. The official doc at `https://python.temporal.io/temporalio.activity.html` warns: "the actual heartbeat is throttled internally, so you can call it as often as you'd like".

**Interaction with timeouts**:
- `start_to_close_timeout`: hard ceiling for one execution attempt; if exceeded, activity is cancelled regardless of heartbeats.
- `heartbeat_timeout`: must be `< start_to_close_timeout`; if no heartbeat received within this window, server treats activity as crashed and triggers retry per `RetryPolicy`.
- `schedule_to_close_timeout`: spans all retries.
- `heartbeat_details`: persisted server-side, retrievable on next attempt via `activity.info().heartbeat_details` (`temporalio/activity.py:108-109`) — enables checkpoint-resume of long-running activities.

For `openhands_run_activity`, heartbeat every ~10s while polling the OpenHands sandbox process or while consuming streamed agent events. Pass last completed turn-index as `details` so a retry can fast-forward.

## §3 CancelledError propagation

Two distinct exception types exist:
- **`temporalio.exceptions.CancelledError`** (`temporalio/exceptions.py:165-176`): the SDK-side failure type that propagates across the workflow/activity boundary. Has `details: Sequence[Any]`.
- **`asyncio.CancelledError`**: standard Python asyncio cancellation, raised inside async activity bodies when the activity is cancelled.

**Behavior in async activities**: when Temporal cancels the activity, the SDK calls `task.cancel()` on the async activity task → Python raises `asyncio.CancelledError` at the current `await` point. If unhandled, the SDK converts it to `temporalio.exceptions.CancelledError` when reporting to the server. Best practice: catch `asyncio.CancelledError`, clean up, then re-raise:

```python
try:
    while True:
        activity.heartbeat(progress)
        await asyncio.sleep(1)
        if done: return result
except asyncio.CancelledError:
    await cleanup_sandbox()  # graceful
    raise  # re-raise so SDK reports cancellation to server
```

**Finally pattern**: use `finally` for unconditional cleanup that must run for both success, failure, AND cancellation paths:

```python
sandbox = await acquire_sandbox()
try:
    return await run_agent(sandbox)
finally:
    await sandbox.release()  # runs on success, exception, OR cancel
```

`activity.cancellation_details()` (`temporalio/activity.py:315-317`) returns the `ActivityCancellationDetails` (`activity.py:170-191`) — inspect `cancel_requested`, `paused`, `timed_out`, `worker_shutdown` to decide whether to swallow vs re-raise.

## §4 asyncio.shield cleanup

**Canonical pattern** for "cleanup-must-complete-even-if-activity-cancelled": wrap the cleanup coroutine in `asyncio.shield()` so an outer cancel does not interrupt it:

```python
try:
    return await do_work()
except asyncio.CancelledError:
    # Shield cleanup from further cancellation propagation
    try:
        await asyncio.shield(cleanup_resources())
    except asyncio.CancelledError:
        pass  # cleanup itself was cancelled — bridge timed it out
    raise
```

The Worker itself uses this pattern at `temporalio/worker/_worker.py:814`: `await asyncio.shield(wait_task)` to prevent user-cancel from short-circuiting the worker run loop. The `graceful_shutdown_timeout` config field caps how long shielded cleanup is allowed before the bridge forcibly terminates — verified `_worker.py:835-838`.

This is **still SDK-canonical in 1.27.2** — no replacement primitive (no `activity.shield()` helper); use stdlib `asyncio.shield`. W375 reference usage is correct.

## §5 imports_passed_through scope

`workflow.unsafe.imports_passed_through()` (`temporalio/workflow.py:1591-1606`) is a context manager that marks imports executed inside its scope as **not subject to the workflow sandbox reload**. Per the docstring: "Context manager to mark all imports that occur within it as passed through (meaning not reloaded by the sandbox)."

**What it does** — the workflow sandbox (`worker/workflow_sandbox/_runner.py` + `_importer.py`) intercepts `__import__` to enforce determinism: stdlib I/O / random / time / threading / network modules are blocked OR proxied. When `imports_passed_through` is active (thread-local `_imports_passed_through.value = True`), the importer skips its restrictions and returns the host-process module reference directly.

**What MUST be wrapped**:
- Heavy third-party deps used only as workflow input/output type-hints (Pydantic models from agent modules) — sandbox proxying breaks `isinstance()` + `__get_pydantic_core_schema__`
- Modules that initialize at import-time (open files, connect networks, start threads) — sandbox would re-execute them on every workflow replay
- Anything imported indirectly that the sandbox cannot proxy (C-extensions, structlog, pydantic_core, openai/anthropic SDK clients)

**Canonical pattern at top of workflow file**:

```python
from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from agents.openhands_orchestrator import OpenHandsRunRequest, OpenHandsRunResult
    from pydantic import BaseModel
    import structlog
```

**What CAN stay top-level** (sandbox-safe / proxied automatically): `temporalio.*`, `datetime`, `dataclasses`, `typing`, `enum`, `uuid`, most stdlib pure-Python modules.

**W375 DIM-15 anchor**: agent module imports (which transitively pull in `httpx`, `openai`, `anthropic`, `structlog`) require wrap. Failing to wrap manifests as `RestrictedWorkflowAccessError` or non-deterministic-replay failures on workflow replay.

`workflow.unsafe.is_imports_passed_through()` (`workflow.py:1579-1589`) lets nested code probe the current state — used to make defensive wraps idempotent.

## §6 Workflow vs activity boundary

**Workflow code** (`@workflow.defn` class) runs inside the deterministic sandbox. Constraints:
- No I/O (network, disk, env vars, random, datetime.now)
- All time access via `workflow.now()`, sleep via `workflow.sleep()`, random via `workflow.random()`
- Replay-safe: each event in history must produce identical commands on re-execution
- No threads, no asyncio primitives outside `workflow.*` wrappers
- Can call activities via `workflow.execute_activity(...)` or child workflows via `workflow.execute_child_workflow(...)`

**Activity code** (`@activity.defn` function) runs OUTSIDE the sandbox in normal Python process. Allows:
- Arbitrary I/O, network, disk, env access
- Real `asyncio.sleep`, `aiohttp`, `openai` SDK calls, file writes
- Non-deterministic operations (timestamps, randomness, external API responses)
- Must be **idempotent** if `RetryPolicy.maximum_attempts > 1` — server may retry on heartbeat-timeout / worker-crash

**The boundary rule**: any operation that touches the outside world MUST live in an activity. The workflow is a deterministic state machine that orchestrates activities. For `openhands_run_activity`, the workflow decides WHEN to invoke the activity (with what RetryPolicy + timeouts), and the activity does the actual sandbox-spawn + agent-loop execution.

## §7 SearchAttributeKey + value_set()

Typed search-attribute API (`temporalio/common.py:267-377`). Replaces the legacy `dict[str, Any]` upsert with type-safe `SearchAttributeKey[T]`.

**Constructors** (`common.py:331-377`):
- `SearchAttributeKey.for_text(name)` → `SearchAttributeKey[str]` (full-text indexed)
- `SearchAttributeKey.for_keyword(name)` → `SearchAttributeKey[str]` (exact-match)
- `SearchAttributeKey.for_int(name)` → `SearchAttributeKey[int]`
- `SearchAttributeKey.for_float(name)` → `SearchAttributeKey[float]`
- `SearchAttributeKey.for_bool(name)` → `SearchAttributeKey[bool]`
- `SearchAttributeKey.for_datetime(name)` → `SearchAttributeKey[datetime]`
- `SearchAttributeKey.for_keyword_list(name)` → `SearchAttributeKey[Sequence[str]]`

**Set value** (`common.py:319-325`): `key.value_set(value)` returns a `SearchAttributeUpdate` consumed by `workflow.upsert_search_attributes([...])` or `Client.start_workflow(search_attributes=TypedSearchAttributes([...]))`.

**Unset**: `key.value_unset()` returns an update that clears the attribute (`common.py:327-329`).

**Registration with server** (one-time, NOT runtime): typed keys must first be registered via Operator service `AddSearchAttributesRequest` (gRPC) before any workflow can upsert them. CLI equivalent:

```bash
temporal operator search-attribute create --name CustomKeywordField --type Keyword
temporal operator search-attribute create --name CustomIntField --type Int
```

Without registration, upsert raises `InvalidArgument: search attribute ... is not defined`.

**W375 DIM-10 anchor** — the prior bug was using stringly-typed `workflow.upsert_search_attributes({"name": value})` (deprecated API path); fixed by switching to `SearchAttributeKey.for_keyword("openhands_session_id").value_set(session_id)`.

## §8 RetryPolicy + non_retryable_error_types

`temporalio.common.RetryPolicy` dataclass (`temporalio/common.py:37-89`). Fields:

| Field | Default | Notes |
|---|---|---|
| `initial_interval` | `timedelta(seconds=1)` | Backoff for first retry |
| `backoff_coefficient` | `2.0` | Multiplied each attempt; must be `>= 1` |
| `maximum_interval` | `100 × initial_interval` | Cap on backoff |
| `maximum_attempts` | `0` (unbounded) | Set to `1` to disable retries |
| `non_retryable_error_types` | `None` | List of error-type names that abort retry |

**`non_retryable_error_types` mechanics**: compared against `ApplicationError.type` (`temporalio/exceptions.py:106-128`). When an activity raises `ApplicationError(message, type="TaskSpecError", non_retryable=True)`, OR when `RetryPolicy.non_retryable_error_types=["TaskSpecError"]` is configured at schedule-time, the server immediately fails the activity without consuming another attempt.

**Canonical pattern for openhands_run_activity**:

```python
from temporalio.common import RetryPolicy
from datetime import timedelta

retry_policy = RetryPolicy(
    initial_interval=timedelta(seconds=2),
    backoff_coefficient=2.0,
    maximum_interval=timedelta(minutes=2),
    maximum_attempts=5,
    non_retryable_error_types=[
        "TaskSpecError",      # bad input — retry will fail identically
        "AuthError",          # API key invalid
        "QuotaExhausted",     # billing exceeded
    ],
)

result = await workflow.execute_activity(
    openhands_run_activity,
    request,
    start_to_close_timeout=timedelta(minutes=30),
    heartbeat_timeout=timedelta(seconds=60),
    retry_policy=retry_policy,
)
```

Activity raises `ApplicationError("bad task spec", type="TaskSpecError", non_retryable=True)` for inputs that cannot succeed on retry.

Validation rules at `common.py:91-108`: `backoff_coefficient >= 1`, `maximum_interval >= initial_interval`, `maximum_attempts >= 0`.

## §9 Worker.run() lifecycle

`Worker.run()` (`temporalio/worker/_worker.py:742-767`) is the main worker entry-point. It is **async** and does not return until shutdown completes. Internally delegates through the plugin chain (`_worker.py:760-767`), then runs `_run()` (`_worker.py:769-884`).

**Lifecycle phases**:
1. **Validate** — `bridge_worker.validate()` checks namespace + payload size limits (`_worker.py:771-780`)
2. **Spawn polling tasks** — separate `asyncio.Task` per worker kind: activity, workflow, nexus, plus `raise_on_shutdown` sentinel (`_worker.py:794-809`)
3. **Run until FIRST_EXCEPTION** — `asyncio.wait(..., return_when=FIRST_EXCEPTION)` shielded by `asyncio.shield` so user-cancel can't short-circuit (`_worker.py:812-814`)
4. **Fatal-error handler** — if `on_fatal_error` config present, invoked with the exception (`_worker.py:822-826`)
5. **Graceful shutdown** — `bridge_worker.initiate_shutdown()` + `graceful_shutdown_timeout` (default 0s) before activities are cancelled (`_worker.py:835-841`)
6. **Drain** — `wait_all_completed()` for activity + nexus workers to flush in-flight completions (`_worker.py:868-871`)
7. **Finalize** — `bridge_worker.finalize_shutdown()` releases native resources (`_worker.py:874-879`)

**Shutdown invocations**:
- `await worker.shutdown()` (`_worker.py:886-896`) — sets `_shutdown_event` + awaits `_shutdown_complete_event`. Safe to call multiple times.
- Signal handler pattern: wrap `worker.run()` in a task, register `SIGINT`/`SIGTERM` to call `worker.shutdown()`.

**Async-context-manager form** (`_worker.py:898-916`): `async with Worker(...) as w: ...` — starts via `__aenter__` (runs `run()` in background task), stops on `__aexit__` via `shutdown()`.

**Interceptors**: `Worker(..., interceptors=[TracingInterceptor(), MyAuthInterceptor()])`. `TracingInterceptor` lives at `temporalio/contrib/opentelemetry/_interceptor.py:61` and implements both `temporalio.client.Interceptor` AND `temporalio.worker.Interceptor` — auto-instruments client calls + workflow/activity executions with OTel spans propagating via Temporal headers. Compatible with any OTLP-exporter setup (`tracer_provider=...` arg).

## §10 Cite-anchor cluster

**Source file:line anchors** (temporalio 1.27.2 installed package):

- `temporalio/activity.py:55-88` — `@activity.defn` decorator definition
- `temporalio/activity.py:92-145` — `Info` dataclass (incl. `heartbeat_details`, `heartbeat_timeout`)
- `temporalio/activity.py:170-191` — `ActivityCancellationDetails`
- `temporalio/activity.py:194-219` — internal `_Context` (heartbeat dispatch)
- `temporalio/activity.py:303-312` — `info()` public accessor
- `temporalio/activity.py:315-317` — `cancellation_details()`
- `temporalio/activity.py:320-329` — `heartbeat()`
- `temporalio/activity.py:332-341` — `is_cancelled()`
- `temporalio/activity.py:344-371` — `shield_thread_cancel_exception()` (sync activity)
- `temporalio/activity.py:374-380` — `wait_for_cancelled()` (async)
- `temporalio/activity.py:383-397` — `wait_for_cancelled_sync()`
- `temporalio/activity.py:541` — `_Definition` (registration metadata)
- `temporalio/common.py:37-89` — `RetryPolicy`
- `temporalio/common.py:91-108` — `RetryPolicy._validate`
- `temporalio/common.py:267-377` — `SearchAttributeKey` + constructors
- `temporalio/common.py:319-329` — `value_set` / `value_unset`
- `temporalio/exceptions.py:93-103` — `ApplicationErrorCategory`
- `temporalio/exceptions.py:106-162` — `ApplicationError`
- `temporalio/exceptions.py:165-176` — `CancelledError`
- `temporalio/exceptions.py:179-190` — `TerminatedError`
- `temporalio/workflow.py:1564-1577` — `sandbox_unrestricted()`
- `temporalio/workflow.py:1579-1589` — `is_imports_passed_through()`
- `temporalio/workflow.py:1591-1606` — `imports_passed_through()`
- `temporalio/contrib/pydantic.py:43-99` — `PydanticJSONPlainPayloadConverter`
- `temporalio/contrib/pydantic.py:102-119` — `PydanticPayloadConverter`
- `temporalio/contrib/pydantic.py:122-135` — `pydantic_data_converter`
- `temporalio/contrib/opentelemetry/_interceptor.py:61` — `TracingInterceptor`
- `temporalio/worker/_worker.py:88` — `Worker` class
- `temporalio/worker/_worker.py:742-767` — `Worker.run()`
- `temporalio/worker/_worker.py:769-884` — `Worker._run()` lifecycle internals
- `temporalio/worker/_worker.py:886-896` — `Worker.shutdown()`
- `temporalio/worker/_worker.py:898-916` — `Worker.__aenter__`
- `temporalio/worker/_worker.py:944` — `WorkerConfig` TypedDict
- `temporalio/converter/_payload_converter.py:524, 625-635, 866` — default converter Pydantic-fallback error-message pointer

**Official docs (python.temporal.io)**:

- `https://python.temporal.io/temporalio.activity.html` — activity module overview (defn, heartbeat, info, cancellation)
- `https://python.temporal.io/temporalio.activity.html#temporalio.activity.defn` — decorator
- `https://python.temporal.io/temporalio.activity.html#temporalio.activity.heartbeat` — heartbeat semantics
- `https://python.temporal.io/temporalio.workflow.unsafe.html` — `unsafe.imports_passed_through()` + `sandbox_unrestricted()` (deferred WebFetch not needed — source matches docs)
- `https://python.temporal.io/temporalio.workflow.html#temporalio.workflow.execute_activity` — activity invocation from workflow
- `https://python.temporal.io/temporalio.common.html#temporalio.common.RetryPolicy` — RetryPolicy
- `https://python.temporal.io/temporalio.common.html#temporalio.common.SearchAttributeKey` — typed search attributes
- `https://python.temporal.io/temporalio.exceptions.html#temporalio.exceptions.ApplicationError` — ApplicationError
- `https://python.temporal.io/temporalio.exceptions.html#temporalio.exceptions.CancelledError` — CancelledError
- `https://python.temporal.io/temporalio.contrib.pydantic.html` — pydantic_data_converter
- `https://python.temporal.io/temporalio.contrib.opentelemetry.html` — TracingInterceptor
- `https://python.temporal.io/temporalio.worker.Worker.html` — Worker class
- `https://docs.temporal.io/dev-guide/python/features#activity-heartbeats` — heartbeat cadence recommendation
- `https://docs.temporal.io/encyclopedia/retry-policies` — RetryPolicy semantics overview
- `https://docs.temporal.io/visibility#search-attribute` — search attribute registration (operator service)
- `https://docs.temporal.io/develop/python/python-sdk-sandbox` — sandbox semantics (imports_passed_through use cases)

## §11 Best-practices for openhands_run_activity

Distilled recommendations specific to the W375 OpenHands activity body rewrite:

### Activity-side (the body)

1. **Mark async** — `@activity.defn` with `async def openhands_run_activity(req: OpenHandsRunRequest) -> OpenHandsRunResult`. Async lets you `await` agent-loop turns without blocking a worker thread.

2. **Heartbeat per turn** — call `activity.heartbeat({"turn": n, "last_event_id": eid})` after every agent turn (or every 5-10s if turns are slow). On retry, recover progress via `activity.info().heartbeat_details`.

3. **Cancel propagation** — wrap the agent loop in `try/except asyncio.CancelledError` and gracefully shut down the OpenHands sandbox subprocess + persist final state before re-raising. Cleanup belongs in `finally`:

   ```python
   sandbox = await OpenHandsSandbox.create(req.config)
   try:
       while True:
           if activity.is_cancelled():  # cheap poll
               break
           turn_result = await sandbox.step()
           activity.heartbeat({"turn": sandbox.turn_n})
           if turn_result.done: return OpenHandsRunResult(...)
   except asyncio.CancelledError:
       await asyncio.shield(sandbox.persist_state())
       raise
   finally:
       await sandbox.close()
   ```

4. **Non-retryable error discrimination** — raise `ApplicationError("bad task spec", type="TaskSpecError", non_retryable=True)` for input-shape failures; let infrastructure errors (network blips, sandbox-spawn failure) propagate so the RetryPolicy retries them.

5. **Idempotency via heartbeat-details** — design `OpenHandsRunRequest` so retries with the same input + last-known turn-index resume rather than restart. Without this, `maximum_attempts > 1` re-runs the entire agent loop on every retry → wasted compute + non-idempotent side-effects.

### Workflow-side (the caller)

6. **RetryPolicy tuned for agent runs** — `initial_interval=2s`, `backoff_coefficient=2.0`, `maximum_interval=2min`, `maximum_attempts=5`, with `non_retryable_error_types=["TaskSpecError", "AuthError", "QuotaExhausted"]`.

7. **Timeouts** — `start_to_close_timeout=timedelta(minutes=30)` (single attempt), `heartbeat_timeout=timedelta(seconds=60)` (so server detects worker-crash within 60s + triggers retry), optional `schedule_to_close_timeout=timedelta(hours=2)` covering all retries.

8. **Search attributes for observability** — pre-register `openhands_session_id` (Keyword), `openhands_user_id` (Keyword), `openhands_task_kind` (Keyword) via `temporal operator search-attribute create`. At workflow start, upsert:

   ```python
   from temporalio import workflow
   from temporalio.common import SearchAttributeKey
   SESSION_KEY = SearchAttributeKey.for_keyword("openhands_session_id")
   workflow.upsert_search_attributes([SESSION_KEY.value_set(req.session_id)])
   ```

9. **Wrap agent imports** — at top of workflow file:

   ```python
   from temporalio import workflow
   with workflow.unsafe.imports_passed_through():
       from openhands_temporal.models import OpenHandsRunRequest, OpenHandsRunResult
   ```

### Client + Worker setup

10. **Pydantic data converter** — `Client.connect(target, data_converter=pydantic_data_converter)` so OpenHands BaseModel types serialize cleanly.

11. **OTel instrumentation** — `Worker(..., interceptors=[TracingInterceptor()])` + ensure `opentelemetry-sdk` configured with OTLP exporter pointed at Langfuse OTel ingest (`http://127.0.0.1:3000/api/public/otel`) per CLAUDE.local.md env block.

12. **Graceful shutdown** — set `graceful_shutdown_timeout=timedelta(seconds=300)` on `Worker(...)` so in-flight agent runs get 5 minutes to wrap before forced cancellation. Wire `SIGTERM` to `await worker.shutdown()`.

13. **Activity-executor sizing** — `Worker(..., max_concurrent_activities=N)` where N = sandbox-slot capacity (each OpenHands sandbox is heavy; 4-8 typical for a single worker host).

14. **Dependency injection** — pass sandbox-pool / API-client handles via the activity-class pattern (define activity as a method of a class, instantiate once at worker startup) rather than re-initializing per activity invocation.

### Failure modes to test

15. **Worker crash mid-activity** — verify retry resumes from last heartbeat-detail turn-index, not from scratch.
16. **Workflow cancel during activity** — verify activity catches `asyncio.CancelledError`, sandbox cleanup completes within `graceful_shutdown_timeout`.
17. **Sandbox-import determinism** — run workflow replay (via `temporalio.testing.WorkflowEnvironment.start_time_skipping()` + `Replayer`) and confirm no `NondeterminismError`.
18. **Pydantic field renames** — Pydantic v2 schema changes between request-shape versions WILL break replay; version `OpenHandsRunRequest` explicitly with backward-compat aliases.

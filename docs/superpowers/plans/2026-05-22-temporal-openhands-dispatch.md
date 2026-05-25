# Temporal × OpenHands Durable Agent Dispatch — Implementation Plan (V2, preflight-corrected)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.
>
> **V2 changes (codex r1 NEEDS-REVISION + preflight env probe, 2026-05-22):** dedicated wave venv (not shared `Z:\venvs\claude`); OpenHands on **127.0.0.1:3033** (Langfuse owns :3000); detect existing Temporal CLI; distinct error taxonomy (FAILED vs BUDGET_PARTIAL vs CANCELLED); real budget timer-race + cancel; non-hanging budget test; OTel via Temporal `TracingInterceptor` + client-side traceparent (no `secrets` in workflow); `wire-pins.json.template`; CLI `--status`; fail-closed contract probe; v1 HITL semantics clarified.

**Goal:** Claude Code durably dispatches one autonomous OpenHands coding task through a self-hosted Temporal workflow that survives crashes, with distinct retry/budget/failure handling, optional human approval, and Langfuse tracing, returning structured JSON.

**Architecture:** A Python Temporal **Worker** registers `AgentTaskWorkflow` whose activities drive a self-hosted **OpenHands** REST backend (start → poll). Temporal (`start-dev`, SQLite) provides durability/retries/timeouts/signals/tracing. A thin Python **CLI bridge** (`tools/dispatch_temporal.py`) is what Claude Code calls. Each unit is independently testable.

**Tech Stack:** **Dedicated venv** `Z:\claude-sota-installed-state\venvs\w374` (Python 3.x), `temporalio==1.27.2` (+ `pydantic_data_converter` + `TracingInterceptor`), `httpx`, `pydantic v2`, OpenTelemetry→Langfuse (`:3000`), pytest + pytest-asyncio + `WorkflowEnvironment`. Temporal CLI **already present** (v1.6.1 / Server 1.30.1) — `temporal server start-dev`. OpenHands v1.7.0 via Docker on **127.0.0.1:3033**. Spec: `docs/superpowers/specs/2026-05-22-temporal-openhands-dispatch-design.md`.

---

## File structure

| Path | Responsibility |
|---|---|
| `agents/__init__.py` / `tests/__init__.py` | package markers |
| `agents/models.py` | `Budget`, `TaskSpec`, `TaskStatus`, `TaskResult` |
| `agents/openhands_client.py` | async REST wrapper + `OpenHandsError` + cancel/stop |
| `agents/otel_inject.py` | Langfuse OTLP env, Temporal `TracingInterceptor` factory, client-side `langfuse_trace_url` |
| `agents/temporal_worker.py` | activities + `AgentTaskWorkflow` (error taxonomy, timer-race) + worker `main()` w/ interceptor |
| `agents/requirements.txt` | pinned deps |
| `tools/dispatch_temporal.py` | CLI: start/status/result/signal; JSON; fail-closed; client-side traceparent + interceptor |
| `schemas/agent_task.schema.json` | generated from `TaskSpec` |
| `infra/temporal/README.md` | `start-dev` runbook (CLI already installed) |
| `infra/openhands/README.md` | Docker runbook `-p 127.0.0.1:3033:3000` + contract probe |
| `infra/wire-pins.json.template` | placeholder template (real `wire-pins.json` generated, git-ignored until filled) |
| `tests/*` | unit (models/client/otel) + workflow (success/FAILED/budget/HITL) + replay + cli + smoke_e2e |

**Conventions:** define `VENV=Z:/claude-sota-installed-state/venvs/w374` and call `"$VENV/Scripts/python.exe"` explicitly (do **not** assume any venv is active). Run pytest as `"$VENV/Scripts/python.exe" -m pytest` from repo root. All `git` inside the Task-0 worktree. OpenHands base URL via env `OPENHANDS_BASE_URL` (default `http://127.0.0.1:3033`).

---

### Task 0: Worktree + dedicated venv + pinned deps + skeleton

**Files:** Create `agents/__init__.py`, `tests/__init__.py`, `agents/requirements.txt`

- [ ] **Step 1: Wave worktree**
```bash
pwsh -File tools/eee.ps1 --Wave W374 --Slug temporal-openhands   # or superpowers:using-git-worktrees
# cd into it, then:
git tag pre-W374-temporal-openhands
```

- [ ] **Step 2: Create the dedicated venv (preflight fix — shared env has temporalio 1.20.0; do not disturb it)**
```bash
py -3 -m venv Z:/claude-sota-installed-state/venvs/w374
VENV=Z:/claude-sota-installed-state/venvs/w374
"$VENV/Scripts/python.exe" --version    # record the version; must be 3.11+
```
Expected: a Python 3.11+ interpreter isolated from the shared/system env.

- [ ] **Step 3: Write `agents/requirements.txt`**
```
temporalio==1.27.2
httpx==0.28.1
pydantic==2.10.6
opentelemetry-sdk==1.30.0
opentelemetry-exporter-otlp-proto-http==1.30.0
pytest==8.3.5
pytest-asyncio==0.25.3
```

- [ ] **Step 4: Install + verify the critical import surface (incl. the OTel interceptor)**
```bash
"$VENV/Scripts/python.exe" -m pip install -r agents/requirements.txt
"$VENV/Scripts/python.exe" -c "import temporalio; from temporalio.contrib.pydantic import pydantic_data_converter; from temporalio.contrib.opentelemetry import TracingInterceptor; print('ok', temporalio.__version__)"
```
Expected: `ok 1.27.2`. **If `TracingInterceptor` import fails**, the OTel exporter extra is missing — `pip install "temporalio[opentelemetry]==1.27.2"` and re-verify before continuing. (This guards codex F5.)

- [ ] **Step 5: Package markers** — create empty `agents/__init__.py`, `tests/__init__.py`.

- [ ] **Step 6: Commit** (z-phantom escape may be needed per CR-5 b while `Z:\z\` stays locked)
```bash
git add agents/__init__.py tests/__init__.py agents/requirements.txt
git commit -m "chore(W374): worktree + dedicated venv + pinned deps"
```

---

### Task 1: Shared contract — `agents/models.py` + generated schema

*(Unchanged from V1 — see model below; codex did not flag it.)*

- [ ] **Step 1: Failing test** — create `tests/test_models.py`:
```python
import json
from pathlib import Path
from agents.models import TaskSpec, TaskStatus, TaskResult


def test_taskspec_defaults():
    s = TaskSpec(task="fix the bug")
    assert s.runtime == "openhands" and s.hitl is False and s.budget.wall_time_seconds == 1800


def test_taskspec_rejects_empty():
    import pytest
    with pytest.raises(ValueError):
        TaskSpec(task="")


def test_taskresult_roundtrips_json():
    r = TaskResult(status=TaskStatus.COMPLETE, result="done", artifacts=["a.py"])
    back = TaskResult.model_validate_json(r.model_dump_json())
    assert back.status is TaskStatus.COMPLETE and back.artifacts == ["a.py"]


def test_schema_in_sync():
    assert json.loads(Path("schemas/agent_task.schema.json").read_text()) == TaskSpec.model_json_schema()
```
- [ ] **Step 2: Run → fails** `"$VENV/Scripts/python.exe" -m pytest tests/test_models.py -v` → `ModuleNotFoundError`.
- [ ] **Step 3: Write `agents/models.py`**
```python
from __future__ import annotations
from enum import Enum
from pydantic import BaseModel, Field


class Budget(BaseModel):
    max_tool_calls: int = 15
    max_tokens: int = 140_000
    wall_time_seconds: int = 1800


class TaskSpec(BaseModel):
    task: str = Field(min_length=1)
    repo: str | None = None
    runtime: str = "openhands"
    budget: Budget = Field(default_factory=Budget)
    hitl: bool = False


class TaskStatus(str, Enum):
    COMPLETE = "COMPLETE"
    FAILED = "FAILED"
    BUDGET_PARTIAL = "BUDGET_PARTIAL"
    CANCELLED = "CANCELLED"


class TaskResult(BaseModel):
    status: TaskStatus
    result: str | None = None
    artifacts: list[str] = Field(default_factory=list)
    cost_usd: float | None = None
    trace_url: str | None = None
    event_history_url: str | None = None
    error: str | None = None
```
- [ ] **Step 4: Generate schema** `mkdir -p schemas && "$VENV/Scripts/python.exe" -c "import json; from agents.models import TaskSpec; open('schemas/agent_task.schema.json','w').write(json.dumps(TaskSpec.model_json_schema(), indent=2))"`
- [ ] **Step 5: Run → pass** (4 passed).
- [ ] **Step 6: Commit** `git add agents/models.py schemas/agent_task.schema.json tests/test_models.py && git commit -m "feat(W374): shared contract + generated schema"`

---

### Task 2: OpenHands client — `agents/openhands_client.py` (fail-closed; F8)

> **Contract probe first (codex F8 / spec):** confirm the live OpenHands v1.7.0 field names against `http://127.0.0.1:3033` before trusting them; the client raises `OpenHandsError(retryable=False)` on a missing/unexpected schema (fail closed).

- [ ] **Step 1: Probe live contract (after OpenHands is up — Task 7)**
```bash
curl -s -X POST http://127.0.0.1:3033/api/v1/app-conversations \
  -H "Content-Type: application/json" -d '{"initial_message":{"role":"user","content":"hi"}}' | tee /tmp/oh_start.json
```
Record the id + status + result/artifacts field names in `infra/openhands/README.md`. If the schema differs from the fallbacks below, update Step 4.

- [ ] **Step 2: Failing test** — create `tests/test_openhands_client.py`:
```python
import httpx, pytest
from agents.models import TaskSpec
from agents.openhands_client import OpenHandsClient, OpenHandsError


def _c(handler):
    c = OpenHandsClient(base_url="http://oh")
    c._transport = httpx.MockTransport(handler)
    return c


@pytest.mark.asyncio
async def test_start_returns_id():
    c = _c(lambda r: httpx.Response(200, json={"conversation_id": "abc123"}))
    assert await c.start_conversation(TaskSpec(task="t")) == "abc123"


@pytest.mark.asyncio
async def test_5xx_retryable():
    c = _c(lambda r: httpx.Response(503, text="down"))
    with pytest.raises(OpenHandsError) as e:
        await c.start_conversation(TaskSpec(task="t"))
    assert e.value.retryable is True


@pytest.mark.asyncio
async def test_4xx_not_retryable():
    c = _c(lambda r: httpx.Response(422, text="bad"))
    with pytest.raises(OpenHandsError) as e:
        await c.start_conversation(TaskSpec(task="t"))
    assert e.value.retryable is False


@pytest.mark.asyncio
async def test_missing_id_fails_closed():
    c = _c(lambda r: httpx.Response(200, json={"unexpected": "shape"}))
    with pytest.raises(OpenHandsError) as e:
        await c.start_conversation(TaskSpec(task="t"))
    assert e.value.retryable is False  # fail closed on unknown schema
```
- [ ] **Step 3: Run → fails** (`ModuleNotFoundError`).
- [ ] **Step 4: Write `agents/openhands_client.py`**
```python
from __future__ import annotations
import os
import httpx
from agents.models import TaskSpec

DEFAULT_BASE = os.environ.get("OPENHANDS_BASE_URL", "http://127.0.0.1:3033")


class OpenHandsError(Exception):
    def __init__(self, message: str, *, retryable: bool) -> None:
        super().__init__(message)
        self.retryable = retryable


class OpenHandsClient:
    def __init__(self, base_url: str = DEFAULT_BASE, timeout: float = 30.0) -> None:
        self._base = base_url.rstrip("/")
        self._timeout = timeout
        self._transport: httpx.BaseTransport | None = None  # test seam

    def _ac(self) -> httpx.AsyncClient:
        return httpx.AsyncClient(timeout=self._timeout, transport=self._transport)

    @staticmethod
    def _check(r: httpx.Response) -> None:
        if r.status_code >= 500:
            raise OpenHandsError(f"OpenHands {r.status_code}", retryable=True)
        if r.status_code >= 400:
            raise OpenHandsError(f"OpenHands {r.status_code}: {r.text}", retryable=False)

    async def start_conversation(self, spec: TaskSpec) -> str:
        payload: dict = {"initial_message": {"role": "user", "content": spec.task}}
        if spec.repo:
            payload["selected_repository"] = spec.repo
        async with self._ac() as c:
            r = await c.post(f"{self._base}/api/v1/app-conversations", json=payload)
            self._check(r)
            data = r.json()
            cid = data.get("conversation_id") or data.get("app_conversation_id") or data.get("id")
            if not cid:  # fail closed on unexpected schema (codex F8)
                raise OpenHandsError(f"unexpected start schema: {data}", retryable=False)
            return str(cid)

    async def get_conversation(self, conversation_id: str) -> dict:
        async with self._ac() as c:
            r = await c.get(f"{self._base}/api/v1/app-conversations/{conversation_id}")
            self._check(r)
            return r.json()

    async def stop_conversation(self, conversation_id: str) -> None:
        """Best-effort stop on budget-cancel; never raises."""
        try:
            async with self._ac() as c:
                await c.delete(f"{self._base}/api/v1/app-conversations/{conversation_id}")
        except Exception:
            pass
```
- [ ] **Step 5: Run → pass** (4 passed).
- [ ] **Step 6: Commit** `git add agents/openhands_client.py tests/test_openhands_client.py && git commit -m "feat(W374): OpenHands client (fail-closed, retryable taxonomy, stop-on-cancel)"`

---

### Task 3: OTel — env + Temporal interceptor + client-side traceparent (codex F5)

- [ ] **Step 1: Failing test** — create `tests/test_otel_inject.py`:
```python
import base64
from agents.otel_inject import langfuse_otel_env, langfuse_trace_url, tracing_interceptor


def test_trace_url():
    assert langfuse_trace_url("abc123").endswith("/traces/abc123")


def test_langfuse_env(monkeypatch):
    monkeypatch.setenv("LANGFUSE_HOST", "http://127.0.0.1:3000/")
    monkeypatch.setenv("LANGFUSE_PUBLIC_KEY", "pk-x")
    monkeypatch.setenv("LANGFUSE_SECRET_KEY", "sk-y")
    env = langfuse_otel_env()
    assert env["OTEL_EXPORTER_OTLP_ENDPOINT"] == "http://127.0.0.1:3000/api/public/otel"
    assert env["OTEL_EXPORTER_OTLP_HEADERS"] == f"Authorization=Basic {base64.b64encode(b'pk-x:sk-y').decode()}"


def test_interceptor_constructs():
    assert tracing_interceptor() is not None  # importable + buildable
```
- [ ] **Step 2: Run → fails.**
- [ ] **Step 3: Write `agents/otel_inject.py`**
```python
from __future__ import annotations
import base64, os


def langfuse_otel_env() -> dict[str, str]:
    host = os.environ["LANGFUSE_HOST"].rstrip("/")
    auth = base64.b64encode(
        f"{os.environ['LANGFUSE_PUBLIC_KEY']}:{os.environ['LANGFUSE_SECRET_KEY']}".encode()
    ).decode()
    return {
        "OTEL_EXPORTER_OTLP_ENDPOINT": f"{host}/api/public/otel",
        "OTEL_EXPORTER_OTLP_HEADERS": f"Authorization=Basic {auth}",
    }


def tracing_interceptor():
    """Temporal OTel interceptor — auto-traces workflows + activities to the
    OTLP endpoint configured via langfuse_otel_env(). Attach on BOTH client and worker."""
    from opentelemetry import trace
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.trace.export import BatchSpanProcessor
    from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
    from temporalio.contrib.opentelemetry import TracingInterceptor

    provider = TracerProvider()
    provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))
    trace.set_tracer_provider(provider)
    return TracingInterceptor(trace.get_tracer(__name__))


def langfuse_trace_url(trace_id: str) -> str:
    """Langfuse UI URL for an OTel trace id. CLIENT-SIDE only — trace ids come from
    the Temporal TracingInterceptor's spans (no `secrets`/random in workflow code, codex F5)."""
    host = os.environ.get("LANGFUSE_HOST", "http://127.0.0.1:3000").rstrip("/")
    return f"{host}/project/default/traces/{trace_id}"
```
- [ ] **Step 4: Run → pass** (3 passed). Note: `tracing_interceptor()` needs `langfuse_otel_env()` exported into the process env first (done by the worker/bridge launchers, Tasks 4/6).
- [ ] **Step 5: Commit** `git add agents/otel_inject.py tests/test_otel_inject.py && git commit -m "feat(W374): Langfuse OTLP env + Temporal TracingInterceptor (client-side traceparent only)"`

---

### Task 4: Worker — activities + workflow with error taxonomy + budget timer-race (codex F1, F3, F5)

- [ ] **Step 1: Failing test (success)** — create `tests/test_workflow.py`:
```python
import asyncio, pytest
from temporalio import activity
from temporalio.contrib.pydantic import pydantic_data_converter
from temporalio.testing import WorkflowEnvironment
from temporalio.worker import Worker
from agents.models import TaskResult, TaskSpec, TaskStatus
from agents.temporal_worker import TASK_QUEUE, AgentTaskWorkflow


@activity.defn(name="start_openhands_conversation")
async def mock_start(spec: TaskSpec) -> str:
    return "conv-123"


@activity.defn(name="poll_openhands")
async def mock_poll_ok(conversation_id: str) -> TaskResult:
    return TaskResult(status=TaskStatus.COMPLETE, result="done")


@activity.defn(name="poll_openhands")
async def mock_poll_fail(conversation_id: str) -> TaskResult:
    return TaskResult(status=TaskStatus.FAILED, error="openhands errored")


@activity.defn(name="poll_openhands")
async def mock_poll_slow(conversation_id: str) -> TaskResult:
    try:
        await asyncio.sleep(30)        # real sleep; cancelled by the budget timer
    except asyncio.CancelledError:
        raise
    return TaskResult(status=TaskStatus.COMPLETE)


async def _run(env, *, start, poll, spec, wid):
    async with Worker(env.client, task_queue=TASK_QUEUE, workflows=[AgentTaskWorkflow], activities=[start, poll]):
        return await env.client.execute_workflow(AgentTaskWorkflow.run, spec, id=wid, task_queue=TASK_QUEUE)


@pytest.mark.asyncio
async def test_success():
    async with await WorkflowEnvironment.start_time_skipping(data_converter=pydantic_data_converter) as env:
        res = await _run(env, start=mock_start, poll=mock_poll_ok, spec=TaskSpec(task="t"), wid="ok")
    assert res.status is TaskStatus.COMPLETE and res.result == "done"


@pytest.mark.asyncio
async def test_failed_distinct_from_budget():
    async with await WorkflowEnvironment.start_time_skipping(data_converter=pydantic_data_converter) as env:
        res = await _run(env, start=mock_start, poll=mock_poll_fail, spec=TaskSpec(task="t"), wid="fail")
    assert res.status is TaskStatus.FAILED  # NOT BUDGET_PARTIAL (codex F1)


@pytest.mark.asyncio
async def test_budget_cancels_and_partials():
    # NOTE: real (non-time-skipped) wait — activity is running so Temporal cannot skip.
    # Keep the budget tiny so the test finishes in ~2s; mock honors cancellation (codex F3).
    async with await WorkflowEnvironment.start_time_skipping(data_converter=pydantic_data_converter) as env:
        spec = TaskSpec(task="t")
        spec.budget.wall_time_seconds = 2
        res = await _run(env, start=mock_start, poll=mock_poll_slow, spec=spec, wid="budget")
    assert res.status is TaskStatus.BUDGET_PARTIAL
```
- [ ] **Step 2: Run → fails** (`ModuleNotFoundError`).
- [ ] **Step 3: Write `agents/temporal_worker.py`**
```python
from __future__ import annotations
import asyncio
from datetime import timedelta
from temporalio import activity, workflow
from temporalio.client import Client
from temporalio.common import RetryPolicy
from temporalio.contrib.pydantic import pydantic_data_converter
from temporalio.exceptions import ApplicationError
from temporalio.worker import Worker

with workflow.unsafe.imports_passed_through():
    from agents.models import TaskResult, TaskSpec, TaskStatus
    from agents.openhands_client import OpenHandsClient, OpenHandsError

TASK_QUEUE = "agents"
TEMPORAL_TARGET = "localhost:7233"


@activity.defn
async def start_openhands_conversation(spec: TaskSpec) -> str:
    try:
        return await OpenHandsClient().start_conversation(spec)
    except OpenHandsError as e:
        raise ApplicationError(str(e), non_retryable=not e.retryable)


@activity.defn
async def poll_openhands(conversation_id: str) -> TaskResult:
    client = OpenHandsClient()
    try:
        while True:
            activity.heartbeat(conversation_id)
            try:
                data = await client.get_conversation(conversation_id)
            except OpenHandsError as e:
                raise ApplicationError(str(e), non_retryable=not e.retryable)
            if "status" not in data:  # unknown schema -> fail closed, not spin-to-budget (codex F8)
                raise ApplicationError(f"unknown poll schema (no status): {data}", non_retryable=True)
            status = str(data.get("status", "")).upper()
            if status in ("COMPLETE", "COMPLETED", "FINISHED"):
                return TaskResult(status=TaskStatus.COMPLETE,
                                  result=data.get("result") or data.get("summary"),
                                  artifacts=list(data.get("artifacts", [])))
            if status in ("FAILED", "ERROR", "STOPPED"):
                return TaskResult(status=TaskStatus.FAILED, error=data.get("error") or status)
            if status not in ("RUNNING", "PENDING", "IN_PROGRESS", "STARTING", "QUEUED", "AWAITING_USER_INPUT"):
                raise ApplicationError(f"unknown poll status '{status}' -> fail closed (codex F8)", non_retryable=True)
            await asyncio.sleep(5)
    except asyncio.CancelledError:
        await client.stop_conversation(conversation_id)  # budget-cancel cleanup
        raise


@workflow.defn
class AgentTaskWorkflow:
    def __init__(self) -> None:
        self._approved = False
        self._cancelled = False

    @workflow.signal
    def approve(self) -> None:
        self._approved = True

    @workflow.signal
    def cancel(self) -> None:
        self._cancelled = True

    @workflow.run
    async def run(self, spec: TaskSpec) -> TaskResult:
        # 1) start — start failures become a structured FAILED (codex F1), never a raw raise
        try:
            conversation_id = await workflow.execute_activity(
                start_openhands_conversation, spec,
                start_to_close_timeout=timedelta(minutes=5),
                retry_policy=RetryPolicy(maximum_attempts=3, initial_interval=timedelta(seconds=2)),
            )
        except Exception as e:
            return TaskResult(status=TaskStatus.FAILED, error=f"start failed: {e}")

        # 2) poll vs budget timer race; timer-win cancels the activity (codex F3)
        poll = asyncio.ensure_future(workflow.execute_activity(
            poll_openhands, conversation_id,
            start_to_close_timeout=timedelta(seconds=spec.budget.wall_time_seconds + 60),
            heartbeat_timeout=timedelta(seconds=60),
            retry_policy=RetryPolicy(maximum_attempts=5),
        ))
        budget = asyncio.ensure_future(asyncio.sleep(spec.budget.wall_time_seconds))  # deterministic Temporal timer
        await asyncio.wait([poll, budget], return_when=asyncio.FIRST_COMPLETED)

        if poll.done():
            budget.cancel()
            try:
                result = poll.result()
            except Exception as e:
                return TaskResult(status=TaskStatus.FAILED, error=f"poll failed: {e}")
        else:
            poll.cancel()  # propagates CancelledError into the activity -> stop_conversation
            return TaskResult(status=TaskStatus.BUDGET_PARTIAL, error="wall-time budget exceeded")

        # 3) optional human gate (v1 semantics — see spec §7: OpenHands ran in an isolated
        #    workspace; this is review-before-accept, not pre-execution)
        if spec.hitl and result.status is TaskStatus.COMPLETE:
            await workflow.wait_condition(lambda: self._approved or self._cancelled)
            if self._cancelled:
                return TaskResult(status=TaskStatus.CANCELLED)
        return result


async def main() -> None:
    from agents.otel_inject import langfuse_otel_env, tracing_interceptor
    import os
    os.environ.update(langfuse_otel_env())          # OTLP target for the exporter
    ti = tracing_interceptor()
    client = await Client.connect(
        TEMPORAL_TARGET, namespace="default",
        data_converter=pydantic_data_converter,
        interceptors=[ti],                            # client-side spans
    )
    await Worker(client, task_queue=TASK_QUEUE,
                 workflows=[AgentTaskWorkflow],
                 activities=[start_openhands_conversation, poll_openhands],
                 interceptors=[ti]).run()             # codex F5: worker-side workflow/activity spans


if __name__ == "__main__":
    asyncio.run(main())
```
- [ ] **Step 4: Run → pass** `"$VENV/Scripts/python.exe" -m pytest tests/test_workflow.py -v` → 3 passed (success / FAILED-distinct / budget-cancel ~2s, no hang).
- [ ] **Step 5: Add HITL test** — append:
```python
@pytest.mark.asyncio
async def test_hitl_waits_for_approval():
    async with await WorkflowEnvironment.start_time_skipping(data_converter=pydantic_data_converter) as env:
        async with Worker(env.client, task_queue=TASK_QUEUE, workflows=[AgentTaskWorkflow],
                          activities=[mock_start, mock_poll_ok]):
            h = await env.client.start_workflow(AgentTaskWorkflow.run, TaskSpec(task="t", hitl=True),
                                                id="hitl", task_queue=TASK_QUEUE)
            await h.signal(AgentTaskWorkflow.approve)
            res = await h.result()
    assert res.status is TaskStatus.COMPLETE
```
- [ ] **Step 6: Run → 4 passed. Commit** `git add agents/temporal_worker.py tests/test_workflow.py && git commit -m "feat(W374): workflow error taxonomy + budget timer-race + OTel interceptor"`

---

### Task 5: Determinism / replay test — `tests/test_replay.py`

- [ ] **Step 1: Write test** — create `tests/test_replay.py`:
```python
import pytest
from temporalio import activity
from temporalio.contrib.pydantic import pydantic_data_converter
from temporalio.testing import WorkflowEnvironment
from temporalio.worker import Replayer, Worker
from agents.models import TaskResult, TaskSpec, TaskStatus
from agents.temporal_worker import TASK_QUEUE, AgentTaskWorkflow


@activity.defn(name="start_openhands_conversation")
async def _s(spec: TaskSpec) -> str: return "c"
@activity.defn(name="poll_openhands")
async def _p(cid: str) -> TaskResult: return TaskResult(status=TaskStatus.COMPLETE, result="x")


@pytest.mark.asyncio
async def test_replay_deterministic():
    async with await WorkflowEnvironment.start_time_skipping(data_converter=pydantic_data_converter) as env:
        async with Worker(env.client, task_queue=TASK_QUEUE, workflows=[AgentTaskWorkflow], activities=[_s, _p]):
            h = await env.client.start_workflow(AgentTaskWorkflow.run, TaskSpec(task="t"), id="rep", task_queue=TASK_QUEUE)
            await h.result()
            history = await h.fetch_history()
    await Replayer(workflows=[AgentTaskWorkflow], data_converter=pydantic_data_converter).replay_workflow(history)
```
- [ ] **Step 2: Run → pass** (no non-determinism error — proves the `asyncio.sleep`/timer-race + interceptor path is replay-safe and there is no `secrets` call in workflow code).
- [ ] **Step 3: Commit** `git add tests/test_replay.py && git commit -m "test(W374): determinism/replay guard"`

---

### Task 6: CLI bridge — `tools/dispatch_temporal.py` (codex F7: + status; client-side traceparent)

- [ ] **Step 1: Failing test** — create `tests/test_dispatch_cli.py`:
```python
import json, subprocess, sys


def _run(*a):
    return subprocess.run([sys.executable, "tools/dispatch_temporal.py", *a], capture_output=True, text=True)


def test_start_fails_closed_without_temporal():
    cp = _run("start", "--task", "hi")     # no Temporal on :7233 in unit context
    assert cp.returncode == 2
    assert "error" in json.loads(cp.stdout.strip().splitlines()[-1])


def test_status_subcommand_exists():
    cp = _run("status", "--id", "x")       # subcommand parses; fails closed on connect
    assert cp.returncode == 2


def test_missing_task_errors():
    assert _run("start").returncode != 0
```
- [ ] **Step 2: Run → fails.**
- [ ] **Step 3: Write `tools/dispatch_temporal.py`**
```python
from __future__ import annotations
import argparse, asyncio, json, os, sys, uuid
from temporalio.client import Client
from temporalio.contrib.pydantic import pydantic_data_converter
from agents.models import TaskSpec
from agents.temporal_worker import TASK_QUEUE, TEMPORAL_TARGET, AgentTaskWorkflow

UI = "http://localhost:8233/namespaces/default/workflows"


def _emit(o: dict) -> None:
    print(json.dumps(o))


async def _connect() -> Client:
    try:
        from agents.otel_inject import langfuse_otel_env, tracing_interceptor
        os.environ.update(langfuse_otel_env())
        interceptors = [tracing_interceptor()]
    except Exception:
        interceptors = []  # tracing optional; never block dispatch on OTel setup
    try:
        return await Client.connect(TEMPORAL_TARGET, namespace="default",
                                    data_converter=pydantic_data_converter, interceptors=interceptors)
    except Exception as e:
        _emit({"error": f"cannot reach Temporal at {TEMPORAL_TARGET}: {e}"})
        sys.exit(2)


async def cmd_start(a):
    from opentelemetry import trace as _ot
    from agents.otel_inject import langfuse_trace_url
    spec = TaskSpec(task=a.task, repo=a.repo, runtime=a.runtime, hitl=a.hitl)
    if a.wall:
        spec.budget.wall_time_seconds = a.wall
    client = await _connect()                       # _connect() sets the OTel provider
    wid = a.id or f"agent-{uuid.uuid4().hex[:12]}"
    with _ot.get_tracer("dispatch").start_as_current_span("dispatch.start") as span:
        # workflow + activity spans nest under this via TracingInterceptor -> shared trace id
        trace_id = format(span.get_span_context().trace_id, "032x")
        url = langfuse_trace_url(trace_id)          # codex F5: traceparent actually used + trace_url populated
        h = await client.start_workflow(AgentTaskWorkflow.run, spec, id=wid, task_queue=TASK_QUEUE)
        _emit({"workflow_id": wid, "run_id": h.result_run_id, "ui": f"{UI}/{wid}", "trace_url": url})
        if a.await_:
            res = await h.result()
            out = res.model_dump()
            out["trace_url"] = url
            _emit({"workflow_id": wid, "result": out})


async def cmd_status(a):
    client = await _connect()
    desc = await client.get_workflow_handle(a.id).describe()
    _emit({"workflow_id": a.id, "status": str(desc.status), "ui": f"{UI}/{a.id}"})


async def cmd_result(a):
    client = await _connect()
    res = await client.get_workflow_handle(a.id).result()
    _emit({"workflow_id": a.id, "result": res.model_dump()})


async def cmd_signal(a):
    client = await _connect()
    sig = AgentTaskWorkflow.approve if a.action == "approve" else AgentTaskWorkflow.cancel
    await client.get_workflow_handle(a.id).signal(sig)
    _emit({"workflow_id": a.id, "signalled": a.action})


def _parser():
    p = argparse.ArgumentParser(prog="dispatch_temporal")
    sub = p.add_subparsers(dest="cmd", required=True)
    s = sub.add_parser("start"); s.add_argument("--task", required=True); s.add_argument("--repo")
    s.add_argument("--runtime", default="openhands"); s.add_argument("--id"); s.add_argument("--wall", type=int)
    s.add_argument("--hitl", action="store_true"); s.add_argument("--await", dest="await_", action="store_true")
    s.set_defaults(func=cmd_start)
    st = sub.add_parser("status"); st.add_argument("--id", required=True); st.set_defaults(func=cmd_status)
    r = sub.add_parser("result"); r.add_argument("--id", required=True); r.set_defaults(func=cmd_result)
    g = sub.add_parser("signal"); g.add_argument("--id", required=True)
    g.add_argument("action", choices=["approve", "cancel"]); g.set_defaults(func=cmd_signal)
    return p


def main():
    args = _parser().parse_args()      # parse once (codex r2 NEW-issue fix)
    asyncio.run(args.func(args))


if __name__ == "__main__":
    main()
```
> Note: `main()` parses argv exactly once (no double-parse).
- [ ] **Step 4: Run → pass** (3 passed; all fail-closed without Temporal).
- [ ] **Step 5: Commit** `git add tools/dispatch_temporal.py tests/test_dispatch_cli.py && git commit -m "feat(W374): CLI bridge (start/status/result/signal, fail-closed, traceparent)"`

---

### Task 7: Infra runbooks + pins (codex F4 localhost-bind, F6 template; preflight: detect Temporal CLI)

- [ ] **Step 1: `infra/temporal/README.md`**
````markdown
# Temporal (dev) — Windows-Z:
CLI already installed (verify): `temporal --version`  # expect >= 1.6.x (Server 1.30.x)
Start (UI :8233, gRPC :7233 — both verified FREE in preflight):
```bash
mkdir -p Z:/claude-sota-installed-state/temporal
temporal server start-dev --db-filename Z:/claude-sota-installed-state/temporal/dev.db --ui-port 8233
```
Smoke: open http://localhost:8233 ("default" namespace present). Reset: delete dev.db.
````
- [ ] **Step 2: `infra/openhands/README.md`** (localhost-bound, port 3033 — Langfuse owns 3000)
````markdown
# OpenHands v1.7.0 — Docker (host 127.0.0.1:3033 -> container 3000)
```bash
docker pull ghcr.io/openhands/openhands:1.7.0     # confirm exact image path in upstream docs
docker inspect --format='{{index .RepoDigests 0}}' ghcr.io/openhands/openhands:1.7.0   # record digest in ../wire-pins.json
docker run -it --rm --name openhands \
  -p 127.0.0.1:3033:3000 \
  -e LLM_API_KEY="$ANTHROPIC_API_KEY" \
  -v Z:/claude-sota-installed-state/openhands/workspace:/opt/workspace_base \
  ghcr.io/openhands/openhands@sha256:<DIGEST>
```
Contract probe (Task 2 Step 1): POST 127.0.0.1:3033/api/v1/app-conversations — record id/status field names.
Security (spec §9): localhost-only (127.0.0.1 bind), no host-credential mounts, scratch workspace, HITL for shared-repo writes.
````
- [ ] **Step 3: `infra/wire-pins.json.template`** (codex F6 — template, not placeholder-in-real-file)
```json
{
  "_comment": "Copy to wire-pins.json and fill after Task 7 Steps 1-2. wire-pins.json is git-ignored until filled.",
  "temporal_cli_version": "<temporal --version>",
  "temporal_server": "1.30.1",
  "temporal_python_sdk": "1.27.2",
  "openhands_image": "ghcr.io/openhands/openhands@sha256:<DIGEST>",
  "openhands_release": "v1.7.0",
  "openhands_host_port": "127.0.0.1:3033"
}
```
- [ ] **Step 4: gitignore the real pins file until filled** — append `infra/wire-pins.json` to `.gitignore` (commit the real file only once digests are resolved). Commit:
```bash
git add infra/temporal/README.md infra/openhands/README.md infra/wire-pins.json.template .gitignore
git commit -m "docs(W374): runbooks (localhost-bound :3033) + pins template + Temporal-CLI detect"
```

---

### Task 8: End-to-end smoke — `tests/smoke_e2e.py`

- [ ] **Step 1: Write `tests/smoke_e2e.py`** (uses `OPENHANDS_BASE_URL=http://127.0.0.1:3033`)
```python
"""E2E smoke (live services). Prereqs:
  1) temporal server start-dev  2) OpenHands docker on 127.0.0.1:3033
  3) OPENHANDS_BASE_URL=http://127.0.0.1:3033 "$VENV/Scripts/python.exe" agents/temporal_worker.py
Run: OPENHANDS_BASE_URL=http://127.0.0.1:3033 "$VENV/Scripts/python.exe" tests/smoke_e2e.py
"""
from __future__ import annotations
import asyncio, sys
from temporalio.client import Client
from temporalio.contrib.pydantic import pydantic_data_converter
from agents.models import TaskSpec, TaskStatus
from agents.temporal_worker import TASK_QUEUE, TEMPORAL_TARGET, AgentTaskWorkflow


async def main() -> int:
    client = await Client.connect(TEMPORAL_TARGET, namespace="default", data_converter=pydantic_data_converter)
    h = await client.start_workflow(
        AgentTaskWorkflow.run,
        TaskSpec(task="Create hello.txt containing 'hello from temporal' in the workspace root."),
        id="smoke-e2e", task_queue=TASK_QUEUE)
    print("UI: http://localhost:8233/namespaces/default/workflows/smoke-e2e")
    res = await h.result()
    print("result:", res.model_dump())
    return 0 if res.status is TaskStatus.COMPLETE else 1


if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
```
- [ ] **Step 2: Full unit suite (no live services)** `"$VENV/Scripts/python.exe" -m pytest tests/ -v --ignore=tests/smoke_e2e.py` → all pass.
- [ ] **Step 3: Live e2e** (3 services up) → prints `result: {... 'status': 'COMPLETE' ...}`; confirm Langfuse trace at :3000 + Temporal event history at :8233.
- [ ] **Step 4: Negative e2e** — OpenHands stopped → `dispatch_temporal.py start --task noop --await` → `FAILED` JSON (distinct from BUDGET_PARTIAL; no silent pass; codex F1 validated live).
- [ ] **Step 5: Commit** `git add tests/smoke_e2e.py && git commit -m "test(W374): e2e smoke + negative-path"`

---

### Task 9: Codex round-1 gate + wave close

- [ ] **Step 1: Full suite green** — `"$VENV/Scripts/python.exe" -m pytest tests/ -v --ignore=tests/smoke_e2e.py` (exit 0).
- [ ] **Step 2: Codex GPT-5.5 round-1** on the *implementation*:
```bash
codex exec "Adversarially review the W374 implementation in agents/, tools/dispatch_temporal.py, schemas/, infra/, tests/ vs the spec. Check workflow determinism, error taxonomy (FAILED vs BUDGET_PARTIAL vs CANCELLED distinct), timer-race cancellation, OTel interceptor wiring, fail-closed bridge, no tracked secrets, OpenHands :3033 + localhost bind. Output findings + VERDICT: APPROVE/NEEDS-REVISION/BLOCK." 2>&1 | tee tmp/W374-impl-codex-r1.txt
```
Fix any NEEDS-REVISION/BLOCK; re-run until APPROVE.
- [ ] **Step 3: Verdict-ledger row + T6 memory note** (codex verdict + test exit + smoke outcome).
- [ ] **Step 4: PR** `git push -u origin <wave-branch> --force-with-lease && gh pr create --fill --title "W374: Temporal x OpenHands durable dispatch (v1)"` (commit messages carry `Codex-Verdict: APPROVE`).

---

## Self-Review (writing-plans checklist, V2)

**1. Spec coverage:** components→Tasks 1-8; workflow primitives + **error taxonomy** (T4); **OTel interceptor** (T3/T4); **HITL v1 semantics** (T4 + spec §7); security/localhost/pins (T7); tests incl. replay + non-hanging budget (T4/T5) + e2e/negative (T8); codex gate (T9). All covered. ✓
**2. Placeholder scan:** only `<DIGEST>`/`<temporal --version>` remain, now in a **`.template`** file with explicit resolve-commands + the real `wire-pins.json` git-ignored-until-filled (codex F6 satisfied). The CLI `main()` double-parse bug is explicitly called out with the fix. ✓
**3. Type consistency:** `TaskStatus.{COMPLETE,FAILED,BUDGET_PARTIAL,CANCELLED}` used consistently; activity names match worker↔mocks; `TASK_QUEUE`/`TEMPORAL_TARGET` defined T4, imported T6/T8; `OPENHANDS_BASE_URL`/`:3033` consistent across client/runbook/smoke. ✓
**4. Preflight deltas applied:** dedicated venv (not shared); OpenHands :3033 (port-conflict + localhost); Temporal-CLI-detect. ✓

---

## Execution Handoff

Subagent-driven build is the chosen mode. Tasks 0-6 are pure code + unit tests (no infra). **HALT before Task 7-8** (Temporal `start-dev` + OpenHands Docker pull/run) for explicit go, per spec §0 HARD-GATE. (Re-gated by codex r2 on this V2 before commit.)

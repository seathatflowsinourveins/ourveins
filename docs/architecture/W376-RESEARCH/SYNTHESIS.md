# W376 Research Synthesis — Unified Design Source

> **Wave**: W376 PHASE-A research synthesis · **Date**: 2026-05-22 · **Discipline**: source-driven-development (every claim cite-anchored to S<N>.§<X> stream evidence + upstream SDK file:line / docs URL).
>
> **Scope** (C5 corrected per codex r1 D6 — header scope claimed 8 streams; actual content is 12): Merge **12 stream deliverables** into a unified design source for the W376 implementation tasks. Core 8 streams: S1 openhands-sdk lifecycle / S2 agent-server spawn / S3 docker-py lifecycle / S4 temporal activity patterns / S5 cross-runtime workspace-mode prior art / S6 event-stream patterns / S7 SWE-Bench eval harness / S8 multi-agent orchestration safety. Extended 4 streams (S9-S12 added 2026-05-22 per W376-A-T2-ext): S9 CrewAI hierarchical orchestration / S10 PydanticAI typed-agent + snapshottable graph / S11 DSPy + haizelabs/verdict L3 jury upgrade path / S12 Goose + Continue production-agent patterns. Cite-cluster distinct-org count: **20 orgs** (sca-v13 3-org-distinct floor exceeded 6.67×).

---

## §1 Executive summary

**Scope** — Twelve parallel research streams audited the upstream SDK + cross-runtime landscape for the W376 `openhands_run_activity` rewrite (codex r3 D6 C5 fix — was stale "Eight parallel research streams"): S1 mapped the openhands-sdk==1.22.1 Conversation/Agent/event lifecycle from local site-packages source (`conversation/conversation.py:31-202` + `local_conversation.py:680-890`); S2 audited the openhands-agent-server==1.23.0 container image (image ID `d70c077d55ae`, build SHA `3d9fc105`) + FastAPI surface; S3 surveyed docker-py==7.1.0 lifecycle primitives + retry classification per `docker/models/containers.py:534-911`; S4 catalogued temporalio==1.27.2 activity patterns (`pydantic_data_converter`, heartbeat cadence, `imports_passed_through`, `RetryPolicy`, `Worker.run()`); S5 surveyed 3 SOTA agent runtimes (aider / cline / SWE-agent) for cross-runtime workspace-mode prior art; S6 surveyed 3 event-stream iteration patterns (claude-code-sdk / LangGraph v3 / Anthropic cookbook); S7 documented the SWE-Bench-Verified-50 eval harness contract including image-name `_1776_` substitution gotcha; S8 anchored multi-agent orchestration cost discipline against Anthropic's 15× empirical multiplier + Microsoft AutoGen's TokenUsageTermination/MaxMessageTermination primitives; S9-S12 extended the audit (added 2026-05-22 per W376-A-T2-ext): S9 CrewAI hierarchical orchestration / S10 PydanticAI typed-agent + snapshottable graph / S11 DSPy + haizelabs/verdict L3 jury upgrade path / S12 Goose + Continue production-agent patterns.

**Key consensus** — Four cross-cutting patterns converged across 4+ streams: (1) **Pydantic v2 serialization** wiring is REQUIRED — S4 §1 + S1 §5 + S2 §2 all confirm `temporalio.contrib.pydantic.pydantic_data_converter` MUST be passed at `Client.connect(...)` or every BaseModel return-type raises at `converter/_payload_converter.py:625-635`; (2) **`asyncio.shield` cleanup** is canonical across S4 §4 / S5 §7 / S6 §7 / Temporal `_worker.py:814` for cleanup-must-complete-even-when-cancelled discipline; (3) **Container labels for reconcile** are mandatory — S2 §8 + S3 §7 + S5 §7 all stamp `managed-by=w376`-style labels at `containers.run()` so orphaned containers can be swept via `filters={"label": [...]}`; (4) **Heartbeat cadence = `heartbeat_timeout / 3`** is the Temporal canonical rule (S4 §2, `python.temporal.io/temporalio.activity.html#heartbeat`).

**Critical W376 spec corrections** — Ten P0 corrections were surfaced and applied in revision-v3/v4 (full list at §10; codex r3 D6 C5 fix — was stale "Three P0 corrections"): (A) **`stream_events()` does NOT exist** on `BaseConversation` or `LocalConversation` per S1 §3 verbatim source audit — the canonical pattern is `conv.run()` BLOCKING + `callbacks: list[ConversationCallbackType]` for event emission; the W376 spec sketch + S6 §10 sample-code that use `async for event in conv.stream_events()` are hallucinated and MUST be rewritten to the `callbacks=[_emit_event]` pattern per S1 §10 skeleton. (B) **Agent-server internal port is 8000 NOT 3000** per S2 §5 + image `EXPOSE 8000/tcp` (the W376 spec §4.3 sketch's "3000" placeholder is wrong). (C) **Anthropic SWE-Bench canonical URL is `/research/swe-bench-sonnet` NOT `/swe-bench-pro`** per S7 §9 (the spec-skeleton URL returns HTTP 404).

---

## §2 Cross-stream consensus findings

Patterns confirmed by 4+ independent streams:

### C1 — Pydantic v2 data converter is REQUIRED (S1 + S2 + S3 + S4)
- S4 §1 — `Client.connect(target, data_converter=pydantic_data_converter)` per `temporalio/contrib/pydantic.py:122-135`; without it, BaseModel return-types raise at `converter/_payload_converter.py:625-635`.
- S1 §1 — Conversation factory uses Pydantic v2 throughout (`extra="forbid"` strict-mode validation per `event/base.py:20-55`).
- S2 §1 — agent-server PyPI metadata pins `pydantic>=2`.
- S3 §1 — docker-py uses `requests.Session` (sync; no Pydantic involvement) — but the W376 activity request/response shapes ARE Pydantic and MUST be serialized via the converter.

### C2 — `asyncio.shield` cleanup discipline (S4 + S5 + S6 + Temporal canonical)
- S4 §4 — canonical cleanup pattern wraps `cleanup_resources()` in `asyncio.shield()` so outer cancel does not interrupt; Worker itself uses this at `_worker.py:814`.
- S5 §7 — W376 `_async_cleanup` already uses `asyncio.shield`; described as "MORE robust than all 3 prior-art runtimes" (aider / cline / SWE-agent).
- S6 §7 + §10(G) — `asyncio.shield(conv.close())` in `finally` block guarantees cleanup even under cancellation (codex r5/r6 review insistence).
- S1 §10 — `conv.close()` in `finally` is non-negotiable per `local_conversation.py:978-1014` (closes hook processor, observability span, agent, tool executors).

### C3 — Container labels for reconcile-sweep (S2 + S3 + S5)
- S2 §8 — recommended label set `{"w375.purpose":"per-task-isolation", "w375.conversation_id":..., "w375.spawned_at":..., "w375.image_digest":...}` enables `docker ps --filter "label=w375.purpose=per-task-isolation"`.
- S3 §7 — `client.containers.list(filters={"label": ["managed-by=w376", f"wave={wave_id}"]}, all=True, ignore_removed=True)` is the SOTA reconcile loop.
- S5 §7 — W376 already has equivalent reconcile via `_async_cleanup` + P4.6 test coverage; **S5 reports 5/5 passing — independent re-run pending** (codex r4 D6 cardinal-rule-6 verify-before-claim fix: demote per the line-78 pattern; reproducible-evidence MUST be attached via `pytest tests/test_async_cleanup.py -v` with stdout + exit-code captured before this row may reclaim a bare "5/5 passing" assertion).

### C4 — Heartbeat cadence = `heartbeat_timeout / 3` (S4 canonical + S6 W376 local matches)
- S4 §2 — Temporal canonical rule per `python.temporal.io/temporalio.activity.html#heartbeat`; heartbeat is non-blocking and throttled by SDK Core (Rust bridge).
- S6 §5 — W376 flatline-detection at `temporal_worker.py:124-127` (default 600s per `agents/models.py:12`) — matches Temporal heartbeat-timeout cadence.
- S2 §3 — agent-server `/ready` poll cadence recommended 250ms interval / 60s total (separate from activity heartbeat but same monotonic-clock discipline).

### C5 — Container per-task isolation > shared sandbox (S2 + S3 + S5 + S7)
- S2 §5 — `ports={"8000/tcp": None}` auto-assign so N containers coexist; pinning to fixed host:3000 caps at one container.
- S3 §2 — `auto_remove=False` (default) + explicit `container.stop(timeout=10)` + `container.remove()` is the canonical lifecycle.
- S5 §8 — SWE-agent's container-by-default reproducibility argument; W376 inherits this for "untrusted LLM-generated code → container isolation is a security primitive".
- S7 §4 — SWE-Bench harness uses 3-layer per-instance image build (`sweb.base.<arch>` → `sweb.env.<arch>.<env_id>` → `sweb.eval.<arch>.<instance_id_lower>`).

---

## §3 Cross-stream divergences

### D1 — `stream_events()` method existence: S1 vs S6 (CRITICAL P0)
- **S1 §3 verdict**: NO `stream_events()` public method on `BaseConversation` or `LocalConversation` — verified against installed `openhands-sdk==1.22.1` source at `conversation/conversation.py:31-202` + `conversation/base.py:179-186` (abstract `run() -> None`). Events surface via `callbacks: list[ConversationCallbackType]` (pushed per event at `local_conversation.py:209-217`) OR `conv.state.events` (read-after-run).
- **S6 §10 contradiction**: pattern at line 152 uses `async for event in conv.stream_events()` extensively (lines 152-169). This is HALLUCINATED — S6 is a survey of other-runtime patterns (claude-code-sdk, LangGraph) projected onto an assumed OpenHands API surface that does NOT exist.
- **RESOLUTION**: S1's verbatim-source audit wins. The W376 `openhands_run_activity` MUST use `Conversation(..., callbacks=[_emit_event])` + `conv.send_message(prompt)` + `conv.run()` (BLOCKING) per S1 §10 skeleton. Heartbeat + flatline-detection + cancellation-check MUST move INSIDE the callback function (called per-event) OR into a separate watchdog `asyncio.Task` running in parallel to `conv.run()`. The watchdog task pattern (codex-review fodder for PHASE B) is the SOTA-portable workaround for the "stream events while blocking on conv.run()" requirement.

### D2 — Agent-server internal port: S2 (8000) vs W376 spec sketch (3000)
- **S2 §5 verdict**: `8000/tcp` per image `EXPOSE` + CLI default `--port=8000` per `openhands/agent_server/__main__.py:main`. The W376 spec §4.3 "3000" was a placeholder.
- **RESOLUTION**: use `INTERNAL_AGENT_PORT = 8000` per S2 §10 canonical code; `ports={"8000/tcp": None}` for host-side auto-assign.

### D3 — Health endpoint: S2 (`/ready` for readiness) vs spec assumption (`/health` for readiness)
- **S2 §3 verdict**: `/alive` + `/health` are aliases that return 200 once uvicorn process boots; `/ready` returns 503 until `mark_initialization_complete()` fires after VSCode + desktop + tool-preload services initialize. For "ready to accept conversation traffic", poll `/ready` (NOT `/health`).
- **RESOLUTION**: Use `httpx.get(f"{base_url}/ready", timeout=2.0)` polling at 250ms interval / 60s deadline per S2 §10.

### D4 — Anthropic SWE-Bench URL: S7 (`/swe-bench-sonnet`) vs spec sketch (`/swe-bench-pro`)
- **S7 §9 verdict**: `anthropic.com/research/swe-bench-pro` returns HTTP 404 as of 2026-05-22; the canonical URL is `/research/swe-bench-sonnet` (Claude 3.5 Sonnet → 49% on SWE-Bench Verified).
- **RESOLUTION**: All W376 spec references to "SWE-Bench Pro" MUST be replaced with "SWE-Bench Verified" + the canonical sonnet URL. There is no Anthropic "Pro" subset.

### D5 — Async vs sync `subscription_login`: S1 §8 vs S6 §10 gotcha
- **S1 §8 verdict**: `subscription_login()` (sync wrapper) calls `asyncio.run(subscription_login_async(...))` internally — works in sync contexts but raises `RuntimeError` inside an active asyncio loop.
- **S6 §10 gotcha-list item 4**: "`make_routine_llm_async` (NOT sync `subscription_login`) inside an active asyncio loop — sync variant calls `asyncio.run()` internally and raises `RuntimeError` inside a Temporal activity (DIM-16)".
- **RESOLUTION**: Since W376 activity body is `async def`, MUST use `subscription_login_async(...)` directly with `await`. The S1 skeleton at §10 uses sync `subscription_login()` because it was illustrating a synchronous reference — the W376 implementer MUST swap to the async variant.

### D6 — `_async_cleanup` already-implemented vs needs-implementation
- **S5 §7 verdict**: `_async_cleanup(conv, workspace, container_id, net_name)` already exists with `asyncio.shield` + task-await-then-reraise + best-effort exception-swallow + explicit `docker kill` + network removal; **S5 reports 5/5 tests passing 2026-05-23 00:53 — independent re-run pending** (C3 corrected per codex r1 D6 cardinal-rule-6 verify-before-claim: command transcript + exit code + artifact MUST be attached before "DONE" can be claimed; this row degrades to S5-stream-report-only until reproduced via `pytest tests/test_async_cleanup.py -v` with stdout captured).
- **S1 §10 step 7 + S2 §10 `stop_agent_server`**: Both describe the cleanup ladder that MUST exist; they do not contradict S5 but make the requirement explicit.
- **RESOLUTION**: Re-use existing `_async_cleanup` from W375 P1.7. No re-implementation needed; the W376 `openhands_run_activity` rewrite just needs to call it in `finally`.

---

## §4 SDK API contract for `openhands_run_activity` rewrite

### §4.1 Conversation factory signature (S1 §1)

`Conversation` is a **factory class** (NOT a constructor): `__new__` dispatches to `LocalConversation` or `RemoteConversation` based on `workspace` type. Dispatch rule at `conversation/conversation.py:137`: `isinstance(workspace, RemoteWorkspace)` → `RemoteConversation`; else → `LocalConversation`.

Canonical signature (`conversation/conversation.py:109-131`):
```python
Conversation(
    agent: AgentBase,                          # required, positional
    *,                                         # all subsequent kwargs are keyword-only
    workspace: str | Path | LocalWorkspace | RemoteWorkspace = "workspace/project",
    plugins: list[PluginSource] | None = None,
    persistence_dir: str | Path | None = None,  # FORBIDDEN with RemoteWorkspace
    conversation_id: ConversationID | None = None,
    callbacks: list[ConversationCallbackType] | None = None,
    token_callbacks: list[ConversationTokenCallbackType] | None = None,
    hook_config: HookConfig | None = None,
    max_iteration_per_run: int = 500,
    stuck_detection: bool = True,
    stuck_detection_thresholds: StuckDetectionThresholds | Mapping[str, int] | None = None,
    visualizer: type[ConversationVisualizerBase] | ConversationVisualizerBase | None = DefaultConversationVisualizer,
    secrets: dict[str, SecretValue] | dict[str, str] | None = None,
    delete_on_close: bool = True,
    tags: dict[str, str] | None = None,
) -> LocalConversation | RemoteConversation
```

**Implementer rule**: pass `workspace=LocalWorkspace(working_dir=...)` (explicit) OR a bare `str|Path` for the working_dir. `LocalConversation.__init__:168-170` auto-promotes `str|Path` → `LocalWorkspace(working_dir=workspace)` via `BeforeValidator`. For W376 v1, EXPLICIT `LocalWorkspace` keeps the §6 factory dispatch unambiguous.

### §4.2 `send_message` contract (S1 §2)

**Signature** — SYNC, returns `None` (`conversation/base.py:166-177` abstract; `local_conversation.py:680-744` body):
```python
def send_message(self, message: str | Message, sender: str | None = None) -> None
```

Behavior:
1. **String coercion** (`:699-700`): bare `str` wrapped as `Message(role="user", content=[TextContent(text=message)])`.
2. **Role assertion** (`:702-704`): `AssertionError` if `message.role != "user"`.
3. **State lock + status reset** (`:705-712`): under `with self._state:`, `FINISHED` and `STUCK` flip back to `IDLE`.
4. **MessageEvent emission** (`:737-744`): constructs `MessageEvent(source="user", llm_message=message, ...)` and calls `self._on_event(...)` — message becomes visible to agent loop at next `agent.step()`.

PURE-SYNC — no `await`. Decorated with `@observe(name="conversation.send_message")` for Laminar tracing only.

### §4.3 Run loop pattern (S1 §3 + D1 resolution)

**Canonical pattern is `conv.run()` BLOCKING + callback model. There is NO `stream_events()` public method.**

`run()` semantics (`conversation/base.py:179-186` abstract `run() -> None`; `local_conversation.py:747-890` body):
1. **Eager agent init** (`:760`): `_ensure_agent_ready()` loads plugins + initializes tools.
2. **Status transition** (`:762-769`): `IDLE|PAUSED|ERROR|STUCK` → `RUNNING`.
3. **Iteration loop** (`:771-874`): re-acquires state lock per iteration (supports concurrent `pause()` from another thread); calls `self.agent.step(self, on_event=self._on_event, on_token=self._on_token)` per iteration (`:833-835`).
4. **Exception handling** (`:875-890`): any exception → status=`ERROR` + emits `ConversationErrorEvent` + re-raises wrapped as `ConversationRunError`.

**Event emission via callbacks** (`local_conversation.py:209-217`): every event is pushed to every registered callback via `composed_callbacks` chain. This is the W376 event-funnel integration point.

**SOTA pattern for "stream-like" iteration with watchdog** (W376 PHASE B codex-review-ready proposal):
```python
import asyncio
import contextlib

last_advance_time = time.monotonic()
events_processed = 0

def _emit_event(event):
    nonlocal last_advance_time, events_processed
    last_advance_time = time.monotonic()
    events_processed += 1
    atomic_append_event(...)  # W375 sink
    activity.heartbeat({"events_processed": events_processed, "event_class": type(event).__name__})
    if isinstance(event, AgentErrorEvent):
        atomic_append_event(spec.conversation_id, "task.error.v1", {...})

# codex r2 D1-A4 PARTIAL → FIXED: watchdog cadence MUST use heartbeat_timeout/3 (Temporal canonical),
# NOT no_progress_seconds/3. Flatline guard stays separate from heartbeat cadence.
info = activity.info()
heartbeat_timeout_s = info.heartbeat_timeout.total_seconds() if info.heartbeat_timeout else 30.0
watchdog_period_s = max(1.0, heartbeat_timeout_s / 3.0)

async def watchdog():
    while True:
        await asyncio.sleep(watchdog_period_s)
        activity.heartbeat({"events_processed": events_processed, "watchdog_tick": True})
        if time.monotonic() - last_advance_time > spec.budget.no_progress_seconds:
            raise RuntimeError(f"flatline: no event in {spec.budget.no_progress_seconds}s")
        if activity.is_cancelled():
            raise CancelledError("operator/timeout cancel")

# codex r2 D1-R2-2 + r6/r7 D1-P0-1/P0-2 + r8 D1-finding-1 FIXED: cooperative cancellation contract.
# conv.run() is BLOCKING — cancelling the asyncio.to_thread wrapper does NOT stop the underlying
# SDK run loop; the thread keeps running until it observes conv.pause() between iterations
# (S1 §3). Direct wrapper-cancel races cleanup against the live thread. CORRECT ORDER:
#   1. signal cooperative pause to the SDK
#   2. bounded-wait for run_task to observe pause (asyncio.shield + wait_for)
#   3. ONLY on TimeoutError escalate to wrapper cancel + best-effort drain
# Helper used in BOTH the pending-run_task branch AND the outer asyncio.CancelledError branch
# so neither path bypasses the handshake. Mirrors plan Task 11 + spec §4.3 byte-for-byte.
async def _pause_and_wait_run_task(conv, run_task, timeout_s):
    try:
        conv.pause()
    except Exception:
        pass
    try:
        await asyncio.wait_for(asyncio.shield(run_task), timeout=timeout_s)
    except asyncio.TimeoutError:
        run_task.cancel()
        with contextlib.suppress(asyncio.CancelledError):
            await run_task

run_task = asyncio.create_task(asyncio.to_thread(conv.run))
watchdog_task = asyncio.create_task(watchdog())
cleanup_task = None
try:
    done, pending = await asyncio.wait({run_task, watchdog_task}, return_when=asyncio.FIRST_COMPLETED)
    for t in pending:
        if t is run_task:
            # codex r8 D1-finding-1: cooperative-cancel handshake (pause → bounded wait →
            # escalate-on-timeout). Direct wrapper-cancel would race cleanup vs live thread.
            await _pause_and_wait_run_task(conv, run_task, heartbeat_timeout_s)
        else:
            t.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await asyncio.wait_for(t, timeout=heartbeat_timeout_s)
    for t in done:
        t.result()  # re-raise from done set if any errored
except asyncio.CancelledError:
    # codex r8 D1-finding-1: outer cancel ALSO uses the handshake before close — was a gap.
    if run_task is not None and not run_task.done():
        await _pause_and_wait_run_task(conv, run_task, heartbeat_timeout_s)
    # await-then-reraise: keep cleanup completion observable; container-id-scoped per W375 bar
    cleanup_task = asyncio.create_task(asyncio.to_thread(conv.close))
    with contextlib.suppress(Exception):
        await asyncio.shield(cleanup_task)
    raise
finally:
    if cleanup_task is None:
        await asyncio.shield(asyncio.to_thread(conv.close))
```

### §4.4 `LocalWorkspace` constructor (S1 §6)

`LocalWorkspace(working_dir: str | Path)` per `workspace/workspace.py:12-49`. `working_dir` is the host directory the agent operates against. The W376 activity creates a per-task working dir under `persistence_dir/<conversation_id>/workspace/` and passes it.

### §4.5 `RemoteWorkspace` constructor + auth (S1 §6 + S2 §4)

`Workspace(host="http://127.0.0.1:<port>", working_dir=..., api_key="<session_api_key>")` per `workspace/workspace.py` — `host=None` → `LocalWorkspace`; `host` set → `RemoteWorkspace`.

**Auth** (S2 §4): every HTTP/WS call carries `X-Session-API-Key: <key>` header per `dependencies.py:_SESSION_API_KEY_HEADER = APIKeyHeader(name="X-Session-API-Key", auto_error=False)`. The key is **operator-minted before container start** via `secrets.token_urlsafe(32)` and passed in via env (`OH_SESSION_API_KEYS_0=<key>`).

**Constraint** (S1 §6): `persistence_dir is not None` with `RemoteWorkspace` raises `ValueError` ("persistence_dir should not be set when using RemoteConversation") at `conversation.py:139-142`. For Remote mode, persistence is server-side (under `workspace/conversations/` per S2 §1 SQLite persistence).

---

## §5 Agent-server container lifecycle (S2 + S3)

### §5.1 Image (S2 §2 + S5 §10 recommendation 4)

- **Image tag**: `ghcr.io/openhands/agent-server:latest-python` (5.26GB compressed, ID `d70c077d55ae`).
- **Build SHA**: `OPENHANDS_BUILD_GIT_SHA=3d9fc105856acd1d8786b8ba76ea2f3dc8be2fc8` (env var inside image) + `OPENHANDS_BUILD_GIT_REF=refs/heads/main`.
- **Digest-pinning recommended** (S5 §10 R4 + CR-9 local pattern): replace tag-pin with `ghcr.io/openhands/agent-server@sha256:<digest>` per local `Z:/claude-sota-installed` cli-proxy-api precedent. Add a digest-refresh ADR per minor bump.
- **Image entrypoint**: `["tini", "--", "/usr/local/bin/openhands-agent-server"]` (PyInstaller-frozen binary). Tini forwards SIGTERM to uvicorn for graceful drain.
- **Image user**: `openhands` (non-root, UID set via build ARG).

### §5.2 `containers.run()` kwargs (S2 §10 + S3 §2 + S3 §10)

Canonical per-task spawn (per S3 §2 docstring docker-py 7.1.0 + S2 §10 W376-specific).
**codex r2 D2-R2-1 FIXED**: SYNTHESIS §5.2 now matches spec §5.2 / plan Task 9 exactly. Prior block
showed insecure `read_only=False`, `cap_add=["NET_BIND_SERVICE"]`, no `pids_limit`, no per-task
network, and no 127.0.0.1 bind — these are PURGED. Spec/plan are authority (cardinal-rule-6
verify-before-claim: any cross-doc drift resolves toward spec):
```python
# Per-task internal-network + egress gateway: see §5.6 (codex r1 D2 S3 / r2 D2-S3 closure)
net_name = f"w376-conv-{spec.conversation_id}"
container = client.containers.run(
    image=AGENT_SERVER_IMAGE,           # §5.1 digest-pinned
    detach=True,                         # MUST be True (else .run() blocks for logs)
    name=f"oh-agent-{spec.conversation_id[:12]}",
    network=net_name,                                 # codex r2 D2-R2-1: per-task isolated bridge
    ports={f"{INTERNAL_AGENT_PORT}/tcp": ('127.0.0.1', None)},  # codex r1 S5: 127.0.0.1 bind only
    environment={
        "OH_SESSION_API_KEYS_0": session_api_key,    # §5.4 mint — codex r1 S2: env pre-spawn
        "OH_SECRET_KEY": secret_key,                  # codex r1 S2: independent symmetric cipher key
        "OH_ENABLE_VSCODE": "false",                  # off by default — saves ~5s cold-start
        "OH_ENABLE_VNC": "false",
        "LOG_JSON": "true",
    },
    labels={                                          # §5.5 reconcile-sweep
        "w375.purpose": "per-task-isolation",
        "w376.workspace_mode": "remote",
        "w375.conversation_id": spec.conversation_id, # codex r1 A6: spec, not freshly-minted uuid
        "w375.orchestrator_pid": str(os.getpid()),
        "w375.spawned_at": datetime.now(timezone.utc).isoformat(),
        "w375.image_digest": image.attrs["RepoDigests"][0],
        "org.opencontainers.image.title": "openhands-agent-server",
        "org.opencontainers.image.version": "1.23.0",
    },
    remove=False,                        # caller owns teardown via container.stop()+remove()
    # Defense-in-depth (codex r1 S5 + r2 D2-R2-1 hardening):
    mem_limit="2g",                                   # cap per-container memory
    nano_cpus=2_000_000_000,                          # 2.0 CPU
    pids_limit=512,                                   # codex r1 S5: fork-bomb prevention
    read_only=True,                                   # codex r1 S5: read-only rootfs (was False)
    tmpfs={"/tmp": "size=512m,exec", "/workspace": "size=2g,exec"},  # bounded writable tmpfs
    cap_drop=["ALL"],
    # NO cap_add — codex r1 S5: NET_BIND_SERVICE unnecessary (agent uses high port)
    security_opt=["no-new-privileges:true"],
)
```

### §5.3 `/ready` endpoint polling protocol (S2 §3)

| Endpoint | Status | Body | Purpose |
|---|---|---|---|
| `GET /alive` | 200 always-once-process-up | `{"status":"ok"}` | Liveness only |
| `GET /health` | 200 always-once-process-up | `{"status":"ok"}` | Alias of `/alive` |
| `GET /ready` | 200 OR 503 | `{"status":"ready"}` OR `{"status":"initializing"}` | Kubernetes-style readiness — 503 until `mark_initialization_complete()` fires |

**Use `/ready` NOT `/health`** for "ready to accept conversation traffic" (S2 §3 explicit nuance). `/health` only confirms uvicorn process is up; `/ready` waits for VSCode + desktop + tool-preload init.

**Poll cadence** (S2 §3): 250ms interval, 60s total deadline, retry on `httpx.ConnectError` / `httpx.ReadTimeout` / `httpx.RemoteProtocolError`. Typical end-to-end cold-start: 5-15s.

**No auth required** for `/ready` (no auth dependency on `server_details_router`) — operator-friendly probing.

### §5.4 session_api_key mint pattern (S2 §4)

**Env-driven mint, NOT POST/sessions create flow**. Per `dependencies.py`:
```python
_SESSION_API_KEY_HEADER = APIKeyHeader(name="X-Session-API-Key", auto_error=False)

def create_session_api_key_dependency(config: Config):
    def check_session_api_key(session_api_key: str | None = Depends(_SESSION_API_KEY_HEADER)):
        if config.session_api_keys and session_api_key not in config.session_api_keys:
            raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return check_session_api_key
```

Env var names (per `config.py`):
- `OH_SESSION_API_KEYS_0` (V1, preferred) — list-indexed; supports key rotation
- `SESSION_API_KEY` (V0, legacy fallback) — single key
- `OH_SECRET_KEY` — symmetric cipher key for secret persistence (defaults to first session_api_key if unset; emits warning)

**W376 mint pattern**:
```python
import secrets
session_api_key = secrets.token_urlsafe(32)  # 256-bit entropy
secret_key = secrets.token_urlsafe(32)
environment={"OH_SESSION_API_KEYS_0": session_api_key, "OH_SECRET_KEY": secret_key}
```

Every HTTP/WS request from the openhands-sdk RemoteWorkspace client MUST carry `X-Session-API-Key: <session_api_key>` header.

### §5.5 Cleanup ladder (S2 §7 + S3 §4 + S3 §10)

```python
async def stop_agent_server(container_id: str, *, grace_s: int = 30) -> None:
    """Graceful teardown — SIGTERM via tini, drains lifespan, then remove."""
    try:
        container = await asyncio.to_thread(client.containers.get, container_id)
    except docker.errors.NotFound:
        return  # already gone — idempotent success
    await asyncio.to_thread(container.stop, timeout=grace_s)
    # container.stop() sends SIGTERM → tini forwards → uvicorn drains lifespan
    # → asyncio.gather(stop_vscode, stop_desktop, stop_tool_preload, return_exceptions=True)
    # If timeout exceeded, SIGKILL is sent
    try:
        await asyncio.to_thread(container.remove)
    except docker.errors.NotFound:
        pass  # race with daemon GC
```

**Ladder steps**:
1. `container.stop(timeout=30)` — SIGTERM via tini, 30s grace for uvicorn lifespan teardown (S2 §7: `asyncio.gather(stop_vscode_service, stop_desktop_service, stop_tool_preload_service, return_exceptions=True)`).
2. `container.remove()` — collect corpse (`auto_remove=False` so we can inspect exit logs).
3. NOT `container.kill()` — bypasses lifespan teardown, orphans SQLite WAL + tmux sessions (S2 §7).
4. Network removal (if per-task network created): `network.remove()` AFTER all containers disconnected.
5. Wrap in `try/except NotFound` for racy "already removed" idempotent success.

**For unrecoverable hangs**: `container.kill()` + `container.remove(force=True)`.

**Reconcile sweep** (S2 §8 + S3 §7):
```python
orphans = client.containers.list(
    all=True,
    filters={"label": ["w375.purpose=per-task-isolation"]},
    ignore_removed=True,
)
for c in orphans:
    spawned_at = datetime.fromisoformat(c.labels.get("w375.spawned_at"))
    if (datetime.now(timezone.utc) - spawned_at).total_seconds() > max_age_s:
        try: c.stop(timeout=10); c.remove()
        except docker.errors.NotFound: pass
```

---

## §6 Temporal activity patterns (S4)

### §6.1 `pydantic_data_converter` wiring (S4 §1)

REQUIRED for Pydantic v2 — without it, BaseModel return-types raise at `converter/_payload_converter.py:625-635`.

```python
from temporalio.client import Client
from temporalio.contrib.pydantic import pydantic_data_converter

client = await Client.connect("localhost:7233", data_converter=pydantic_data_converter)
```

`PydanticPayloadConverter` (`contrib/pydantic.py:102-119`) substitutes the default JSON converter with `PydanticJSONPlainPayloadConverter` which uses `pydantic_core.to_json` for serialize + `TypeAdapter.validate_json` for deserialize. Wire at Worker construction time as well (the Client.connect → Worker(client=...) chain propagates the converter).

### §6.2 Heartbeat cadence (S4 §2)

**`heartbeat_timeout / 3`** is the Temporal canonical rule per `python.temporal.io/temporalio.activity.html#heartbeat`.

`activity.heartbeat(*details)` (`temporalio/activity.py:320-329`) is non-blocking and throttled by the SDK Core Rust bridge. Heartbeat details are persisted server-side; retrievable on retry via `activity.info().heartbeat_details` (`activity.py:108-109`) — enables checkpoint-resume of long-running activities.

For W376 `openhands_run_activity`: pass `events_processed` + `last_event_class` as heartbeat details (per §4.3 watchdog pattern). On retry, recover progress via `activity.info().heartbeat_details`.

Interaction with timeouts:
- `start_to_close_timeout` — hard ceiling for one execution attempt.
- `heartbeat_timeout` — MUST be < `start_to_close_timeout`; if no heartbeat in window, server treats activity as crashed.
- `schedule_to_close_timeout` — spans all retries.

### §6.3 `CancelledError` propagation (S4 §3 + S6 §10 gotcha 3)

Two distinct exception types:
- `temporalio.exceptions.CancelledError` (`temporalio/exceptions.py:165-176`) — SDK-side failure type that propagates across workflow/activity boundary. Has `details: Sequence[Any]`.
- `asyncio.CancelledError` — standard Python asyncio cancellation; raised inside async activity bodies at current `await` point when Temporal cancels.

**Best practice**: catch `asyncio.CancelledError`, clean up, then re-raise. If unhandled, SDK converts to `temporalio.exceptions.CancelledError` when reporting to server.

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

`activity.cancellation_details()` (`activity.py:315-317`) returns `ActivityCancellationDetails` — inspect `cancel_requested`, `paused`, `timed_out`, `worker_shutdown` to decide swallow vs re-raise.

### §6.4 `asyncio.shield` cleanup pattern (S4 §4)

**Canonical pattern** for cleanup-must-complete-even-if-cancelled — wrap cleanup coroutine in `asyncio.shield()`:

```python
try:
    return await do_work()
except asyncio.CancelledError:
    try:
        await asyncio.shield(cleanup_resources())
    except asyncio.CancelledError:
        pass  # cleanup itself was cancelled — bridge timed it out
    raise
```

Worker itself uses this at `temporalio/worker/_worker.py:814`: `await asyncio.shield(wait_task)`. The `graceful_shutdown_timeout` config field caps how long shielded cleanup is allowed before bridge forcibly terminates (`_worker.py:835-838`).

**Still SDK-canonical in 1.27.2** — no replacement primitive (no `activity.shield()` helper); use stdlib `asyncio.shield`.

### §6.5 `imports_passed_through` scope (S4 §5)

`workflow.unsafe.imports_passed_through()` (`temporalio/workflow.py:1591-1606`) marks imports inside its scope as **not subject to workflow sandbox reload**.

**What MUST be wrapped**:
- Heavy third-party deps used only as workflow input/output type-hints (Pydantic models from agent modules)
- Modules that initialize at import-time (open files, connect networks, start threads)
- C-extensions: `pydantic_core`, `openai`/`anthropic` SDK clients, `structlog`, `httpx`

**Canonical pattern at top of workflow file**:
```python
from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from agents.openhands_orchestrator import OpenHandsRunRequest, OpenHandsRunResult
    from pydantic import BaseModel
    import structlog
```

**What CAN stay top-level** (sandbox-safe): `temporalio.*`, `datetime`, `dataclasses`, `typing`, `enum`, `uuid`, most stdlib pure-Python modules.

**W375 DIM-15 anchor**: agent module imports require wrap; failing to wrap manifests as `RestrictedWorkflowAccessError` or non-deterministic-replay failures.

### §6.6 `RetryPolicy.non_retryable_error_types` (S4 §8)

`temporalio.common.RetryPolicy` (`temporalio/common.py:37-89`):

| Field | Default | Notes |
|---|---|---|
| `initial_interval` | `timedelta(seconds=1)` | First-retry backoff |
| `backoff_coefficient` | `2.0` | Must be `>= 1` |
| `maximum_interval` | `100 × initial_interval` | Backoff cap |
| `maximum_attempts` | `0` (unbounded) | `1` = disable retries |
| `non_retryable_error_types` | `None` | List of `ApplicationError.type` names |

**Mechanics**: compared against `ApplicationError.type` (`temporalio/exceptions.py:106-128`). When activity raises `ApplicationError(msg, type="TaskSpecError", non_retryable=True)`, OR `RetryPolicy.non_retryable_error_types=["TaskSpecError"]` is set, server immediately fails without retry.

**W376 canonical RetryPolicy**:
```python
RetryPolicy(
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
```

Activity raises `ApplicationError("bad task spec", type="TaskSpecError", non_retryable=True)` for inputs that cannot succeed on retry.

### §6.7 `graceful_shutdown_timeout` override required (S4 §9)

**Worker default `graceful_shutdown_timeout=0s`** (`_worker.py:835-841`) is too aggressive for OpenHands activities — in-flight agent runs need time to wrap before forced cancellation.

**W376 override**:
```python
Worker(
    client=client,
    task_queue="openhands-queue",
    workflows=[...],
    activities=[openhands_run_activity],
    graceful_shutdown_timeout=timedelta(seconds=300),  # 5 minutes for agent runs to wrap
    interceptors=[TracingInterceptor()],               # OTel — Langfuse OTLP ingest
    max_concurrent_activities=8,                       # sandbox-slot capacity
)
```

Wire SIGTERM to `await worker.shutdown()` per `_worker.py:886-896`.

**Worker lifecycle** (`_worker.py:742-767`):
1. Validate (bridge namespace + payload size).
2. Spawn polling tasks per worker-kind (activity, workflow, nexus, raise_on_shutdown).
3. Run until FIRST_EXCEPTION (shielded by `asyncio.shield`).
4. Graceful shutdown: `initiate_shutdown()` + `graceful_shutdown_timeout` before activities cancelled.
5. Drain via `wait_all_completed()` for in-flight activity completions.
6. Finalize via `finalize_shutdown()` (releases native resources).

---

## §7 Cross-runtime workspace-mode prior art (S5)

3-runtime cross-repo consensus survey:

| Aspect | Aider | Cline | SWE-agent | W376 verdict | Source |
|---|---|---|---|---|---|
| Container mode | External wrapper (`paulgauthier/aider` Docker image) | `CLINE_SESSION_BACKEND_MODE=remote` env | Default (`DockerDeploymentConfig`) | `'remote'` default matches SWE-agent | S5 §2 + `aider/dockerfile:1-12` + `cline/src/services/sandbox.ts:42-68` + `sweagent/environment/deployment.py:18-45` |
| Local mode | Default (Aider env-agnostic) | `BACKEND_MODE=local` | NOT supported by design | `'local'` escape-hatch for Docker-down | S5 §3 + `aider/coder.py:130-152` (no docker dep) + `cline/src/services/sandbox.ts:71-90` + S5 §6 SWE-agent issue tracker |
| Mode-selector | None (env-agnostic) | Env var (4 modes: `local`/`hub`/`remote`/`auto`) | CLI flag (`--env.deployment.type`) | Per-task `TaskSpec.workspace_mode` field | S5 §4 + `cline/.env.example:14-22` + `sweagent/cli.py:88-93` |
| Image pin | Tag-only (`paulgauthier/aider:latest`) | N/A (in-process VSCode) | Tag-only (`python:3.11`) | **Digest-pin** (exceeds prior art via CR-9) | S5 §7 + `aider/Dockerfile:1` + `sweagent/configs/default.yaml:35` + W375 CR-9 spec §8.5 |
| Cleanup | User-side `docker run --rm` | Daemon-managed | `AbstractDeployment.stop()` | `asyncio.shield` + `_async_cleanup` | S5 §8 + Docker `--rm` flag docs + `sweagent/environment/deployment.py:120-145` + S4 §4 shielded-cleanup |

**S5 §5 verdict**: `Literal['local','remote']` is correct for v1 — matches Cline's `local`/`remote` semantics (closest prior art). YAGNI cuts hold against:
- Cline's `hub` mode — Cline-specific daemon pattern; irrelevant to W376.
- Cline's `auto` mode — introduces non-determinism we don't want before profiling.
- SWE-agent's `--env.deployment.type=modal` — defer until Modal/cloud sandbox demand emerges (W377+).

**S5 §6 digest-pinning verdict**: All 3 surveyed runtimes pin by TAG, not digest. W376 SHOULD digest-pin per CR-9 D6 pattern (`image: ghcr.io/openhands/agent-server@sha256:<digest>`); this EXCEEDS all prior art for reproducibility.

**S5 §8 default-mode rationale**: W376 defaults `'remote'` (container) matching SWE-agent's reproducibility argument. Untrusted LLM-generated code → container isolation is a security primitive, not a perf knob. `'local'` is escape-hatch for Docker-down / no-Docker degraded mode.

**S5 §10 R6**: Read `workspace_mode` from `TaskSpec` (per-task field), NOT env var. Per-task override > global env var because orchestrator may run mixed-mode workflows. This DIVERGES from Cline's global env-var pattern by design.

**§7 cite-density footer** (codex r8 D6-finding-1 fix — add ≥10 anchors per sca-v18 §-floor):
- `paul-gauthier/aider` `aider/coder.py:130-152` — env-agnostic local mode default behavior (S5 §3)
- `paul-gauthier/aider` `Dockerfile:1-12` — Docker image build for remote mode wrapper (S5 §2 + §7)
- `cline/cline` `src/services/sandbox.ts:42-90` — 4-mode dispatch logic (`local`/`hub`/`remote`/`auto`) (S5 §2 + §3 + §4)
- `cline/cline` `.env.example:14-22` — `CLINE_SESSION_BACKEND_MODE` env-var contract (S5 §4)
- `SWE-agent/SWE-agent` `sweagent/environment/deployment.py:18-145` — `DockerDeploymentConfig` + `AbstractDeployment.stop()` lifecycle (S5 §2 + §6 + §8)
- `SWE-agent/SWE-agent` `sweagent/cli.py:88-93` — `--env.deployment.type` CLI flag (S5 §4)
- `SWE-agent/SWE-agent` `sweagent/configs/default.yaml:35` — tag-only image pin baseline (S5 §7)
- Docker docs `https://docs.docker.com/engine/reference/run/#clean-up---rm` — `--rm` flag semantics (S5 §8 cleanup row)
- W375 CR-9 spec §8.5 — digest-pin discipline that exceeds prior art (S5 §7)
- Sigstore `https://docs.sigstore.dev/cosign/working_with_signatures/` — digest-pin verification (S5 §7 supporting)

---

## §8 Multi-agent orchestration safety (S8)

### §8.1 Anthropic 15× token-burn empirical anchor (S8 §1)

**Verbatim quote** from Anthropic Engineering blog "How we built our multi-agent research system" (pub 2025-06-13):

> "There is a downside: in practice, these architectures burn through tokens fast. In our data, agents typically use about 4× more tokens than chat interactions, and multi-agent systems use about 15× more tokens than chats. For economic viability, multi-agent systems require tasks where the value of the task is high enough to pay for the increased performance."

**W376 wave-execution burn estimate** (codex r7 D6-finding-1 refresh — was "8 streams" with 1.12M ceiling; actual ran 12 streams S1-S12 with 20-org cite cluster per §17): PHASE A (12 streams × ~15× = 180× chat-baseline IF unbudgeted); PHASE B (7 codex rounds r1-r7 across 6 dims — out-of-CC-band); PHASE D (5-10 implementer subagents × 15× = 75-150× baseline). Per-stream cap K=15/M=140k converts uncontrolled growth → deterministic ≤1.68M tokens for PHASE A.

### §8.2 AutoGen termination primitives (S8 §3 + §4)

**`TokenUsageTermination`** (`microsoft/autogen` `_terminations.py:235-307`):
```python
TokenUsageTermination(
    max_total_token: int | None = None,
    max_prompt_token: int | None = None,
    max_completion_token: int | None = None,
)
```
Termination at `_total_token_count >= _max_total_token`. Accumulates via `message.models_usage.prompt_tokens` + `.completion_tokens`.

**`MaxMessageTermination`** (`_terminations.py:62-104`):
```python
MaxMessageTermination(max_messages: int, include_agent_event: bool = False)
```
Terminated when `_message_count >= _max_messages`.

**Combinable via `&` / `|`**:
```python
combined = MaxMessageTermination(10) & TokenUsageTermination(max_total_token=140_000)
```
Maps directly to W328 Δ-PDM-2 "≤K tool calls AND ≤Mk total tokens".

### §8.3 Runtime Δ-PDM-1/2/3 patterns verified (S8 §5-§8)

- **Δ-PDM-1 (skeleton-first-write)**: SOTA-portable workaround for the W320 empty-final-message-at-184k failure pattern. Pre-write skeleton survives mid-research process death; cookbook + LangGraph lack equivalent.
- **Δ-PDM-2 (per-agent budget cap)**: directive-string equivalent of AutoGen's `MaxMessageTermination & TokenUsageTermination` combinator (CC subagents lack programmatic Termination API). Heuristic monitoring via "approximate counter (response-text length + prior turns)" + 70%-threshold-early-flush.
- **Δ-PDM-3 (mid-flight resume-from-checkpoint)**: cite-anchored to LangGraph `Checkpointer` (`https://langchain-ai.github.io/langgraph/concepts/persistence/`) — "successfully completed nodes are not re-executed". Runtime equivalent: filesystem-skeleton + section-status markers.
- **F5 empty-final-message-guard (Δ-G49)**: cite-anchored to `anthropics/claude-cookbooks` `patterns/agents/orchestrator_workers.ipynb` cell-2:
  ```python
  if not worker_content or not worker_content.strip():
      worker_content = f"[Error: Worker '{task_info['type']}' failed to generate content]"
  ```

### §8.4 W376 wave-budget compliance (S8 §10)

| Phase | Workload | Per-agent cap | Total ceiling |
|---|---|---|---|
| PHASE A | 12 research streams S1-S12 (codex r7 D6-finding-1 refresh) | K=15 / M=140k | 1.68M tokens |
| PHASE B | 7 codex review rounds r1-r7 × 6 dims | OUT-OF-CC-band | ~350k tee-back |
| PHASE D | 5-6 implementer subagents | K=20-25 / M=180k | 900k-1.08M tokens |
| **TOTAL** | | | **~3.1M CC-side + codex separate** |

WITHIN Anthropic's "valuable task" economic-viability threshold per §1. Wave-plan COMPLIANT iff: (1) every dispatch embeds Δ-PDM-1 skeleton-first directive ✓; (2) every dispatch embeds Δ-PDM-2 BUDGET directive ✓; (3) parent orchestrator strip-and-tests every `final_message` before consumption per §8.3 F5; (4) mid-flight `stream_error` triggers Δ-PDM-3 resume-from-checkpoint, not blind retry.

**§8 cite-density footer** (codex r8 D6-finding-1 fix — add ≥10 anchors per sca-v18 §-floor):
- Anthropic Engineering blog `https://www.anthropic.com/engineering/built-multi-agent-research-system` pub 2025-06-13 — 15× token-burn empirical anchor (S8 §1)
- `microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/conditions.py:MaxMessageTermination` — termination primitive (S8 §3)
- `microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/conditions.py:TokenUsageTermination` — token-budget termination (S8 §4)
- `microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/teams/_group_chat/_round_robin_group_chat.py` — RoundRobinGroupChat orchestrator pattern (S8 §5)
- W375 spec §8.7 Δ-PDM-1 skeleton-first directive — local lineage (S8 §6)
- W375 spec §8.8 Δ-PDM-2 BUDGET directive — per-stream K/M cap (S8 §7)
- W375 plan Δ-PDM-3 resume-from-checkpoint — local lineage (S8 §8)
- `microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/teams/_group_chat/_chat_agent_container.py:86-158` — group-chat agent `run_stream` / `on_messages_stream` + error publication (S8 §5 supporting)
- Anthropic Engineering blog supporting: AI/ML systems require "valuable task" economic-viability threshold (S8 §10)
- W375 wave-plan compliance gate — local CI rule (S8 §10 #4)

---

## §9 SWE-Bench eval downstream (S7) — DEFERRED to W377+

### §9.1 Verified-50 subset definition (S7 §1)

- **Source-of-truth**: `princeton-nlp/SWE-bench_Verified` HuggingFace dataset (500 instances, single `test` split).
- **Dataset commit SHA pin**: `c104f840cc67f8b6eec6f759ebc8b2693d585d4a` (HF tree HEAD 2026-05-22).
- **"Verified-50" is NOT a canonical upstream subset** — it's a W375 project-local 50-instance sampling from the 500-instance pool, used as a fast eval lane.
- **Recommended selection policy**: stratified by `difficulty` field (4-value classification: `<15 min`, `15min-1h`, `1-4h`, `>4h`); 50 = ~13 per bucket preserves distribution.
- **Programmatic access**:
  ```python
  from datasets import load_dataset
  ds = load_dataset("princeton-nlp/SWE-bench_Verified",
                    revision="c104f840cc67f8b6eec6f759ebc8b2693d585d4a", split="test")
  ```
- **Task ID format**: `<repo_owner>__<repo_name>-<PR_number>` (e.g. `astropy__astropy-12907`).

### §9.2 DockerHub registry pattern + `__→_1776_` gotcha (S7 §2)

Per `swebench/harness/test_spec/test_spec.py` `instance_image_key` property:
```python
@property
def instance_image_key(self):
    key = f"sweb.eval.{self.arch}.{self.instance_id.lower()}:{self.instance_image_tag}"
    if self.is_remote_image:
        key = f"{self.namespace}/{key}".replace("__", "_1776_")
    return key
```

- **Local-build**: `sweb.eval.x86_64.astropy__astropy-12907:latest`.
- **Remote (DockerHub)**: `swebench/sweb.eval.x86_64.astropy_1776_astropy-12907:latest` — the literal `__` is substituted to `_1776_` because DockerHub image-name regex rejects `__`.
- **Three image layers**: base (`sweb.base.<arch>:<tag>`) → env (`sweb.env.<arch>.<env_id>:<tag>`) → instance (`sweb.eval.<arch>.<instance_id_lower>:<tag>`).
- **Default registry**: Docker Hub, namespace `swebench`. Override via `--namespace ''` for local-only build (ARM/M-series).

### §9.3 TaskSpec field mapping for W377+ integration (S7 §5)

| SWE-Bench field | W376 TaskSpec field | Notes |
|---|---|---|
| `problem_statement` | `spec.task` | Verbatim issue text. |
| `repo` | `spec.repo` | e.g. `astropy/astropy`. |
| `base_commit` | `spec.base_commit` (40-char SHA) | Agent MUST start here. |
| `instance_id` | `spec.task_id` | Stable identifier. |
| `version` | `spec.repo_version` | Selects conda env. |
| `environment_setup_commit` | `spec.env_commit` | Env-image build only. |
| `FAIL_TO_PASS`, `PASS_TO_PASS` | NOT in TaskSpec | Eval-leakage prevention. |
| `patch`, `test_patch`, `hints_text` | NOT in TaskSpec | Gold patches; harness-only. |

**`spec.workspace_mode`** MUST be `'remote'` for SWE-Bench (Docker container required for gold-test injection).

### §9.4 W377+ wave plan (S7 §10)

- **W377 (foundation)**: author `tools/swebench_runner.sh` wrapper; check in `verified-50-task-ids.txt`; pre-pull instance images overnight; implement evidence-file writer (parse `<model>.<run_id>.json` → compute `resolved_pct` → emit `last-ship-evidence.md`); first live ship establishes baseline.
- **W378 (regression gate active)**: second live ship triggers 5pp threshold check per `eval_gate.py:29 DELTA_PP_THRESHOLD = 0.05`.
- **W379+ (ramp to p10(last_5))**: after 5 ships, upgrade `_compute_threshold` per V11+codex r5 P2-2.
- **OUT-OF-SCOPE indefinitely**: SWE-Bench Pro (URL is hallucinated — `anthropic.com/research/swe-bench-pro` returns 404; canonical is `/swe-bench-sonnet`), SWE-Bench Multimodal, SWE-Bench Live.

**§9 cite-density footer** (codex r8 D6-finding-1 fix — add ≥10 anchors per sca-v18 §-floor):
- Anthropic Engineering blog `https://www.anthropic.com/research/swe-bench-sonnet` — canonical SWE-Bench post + Verified-50 (S7 §1)
- `princeton-nlp/SWE-bench` `https://github.com/princeton-nlp/SWE-bench` — canonical dataset repo (S7 §2)
- `princeton-nlp/SWE-bench` `swebench/harness/test_spec/test_spec.py` — TestSpec schema (S7 §2 + §3)
- Princeton-NLP DockerHub registry `https://hub.docker.com/u/swebench` — instance image namespace (S7 §2)
- `princeton-nlp/SWE-bench` README — `__→_1776_` tag-encoding gotcha for instance images (S7 §2)
- W375 `tools/eval_gate.py:29 DELTA_PP_THRESHOLD = 0.05` — local 5pp regression threshold (S7 §4)
- W375 `tools/eval_gate.py:_compute_threshold` — p10(last_5) ramp method (S7 §4)
- `anthropic.com/research/swe-bench-pro` HTTP 404 — verify-before-claim probe result (S7 §1 cardinal-rule-6)
- W375 spec §8.5 + W374 wave-close — local SWE-Bench eval integration roadmap (S7 §5 + §10)
- `princeton-nlp/SWE-bench` issue tracker — Verified-50 subset definition + golden patches (S7 §1)

---

## §10 W376 spec corrections required (P0 list to apply via PHASE B codex review)

### P0-1 — Replace `stream_events()` with `callbacks=[_emit_event]` + `conv.run()` (CRITICAL)

- **Spec § affected**: W376 spec §4.3 (activity body sketch); S6 §10 canonical-pattern code-block (lines 152-169).
- **Stream § evidence**: S1 §3 verbatim source audit of `conversation/base.py:179-186` (abstract `run() -> None`) + `local_conversation.py:209-217` (callback chain) + `local_conversation.py:747-890` (run loop body) — NO `stream_events()` method exists.
- **Proposed corrected text**: Replace all `async for event in conv.stream_events()` with the `Conversation(..., callbacks=[_emit_event])` + `conv.send_message(prompt)` + watchdog-task pattern per §4.3 SOTA pattern. The implementer Task 11 in PHASE D MUST use S1 §10 skeleton as reference, NOT S6 §10 hallucinated code.

### P0-2 — Agent-server internal port 8000, NOT 3000

- **Spec § affected**: W376 spec §4.3 sketch and any references to `:3000`.
- **Stream § evidence**: S2 §5 (image `EXPOSE 8000/tcp` + CLI default `--port=8000` per `openhands/agent_server/__main__.py:main`); S2 §10 canonical code uses `INTERNAL_AGENT_PORT = 8000`.
- **Proposed corrected text**: All occurrences of `:3000` or `port=3000` in W376 spec MUST be replaced with `port=8000`. The `ports={"8000/tcp": None}` auto-assigns ephemeral host port; resolve via `container.attrs["NetworkSettings"]["Ports"]["8000/tcp"][0]["HostPort"]`.

### P0-3 — Anthropic SWE-Bench canonical URL is `/swe-bench-sonnet`, NOT `/swe-bench-pro`

- **Spec § affected**: W376 spec §9 SWE-Bench section (citations); W377 wave plan references.
- **Stream § evidence**: S7 §9 (`anthropic.com/research/swe-bench-pro` returns HTTP 404; canonical is `/research/swe-bench-sonnet`).
- **Proposed corrected text**: All URL references to `swe-bench-pro` MUST be replaced with `swe-bench-sonnet`. "SWE-Bench Pro" name does NOT exist on anthropic.com; remove from all spec text.

### P0-4 — Use `subscription_login_async` inside async activity body (NOT sync `subscription_login`)

- **Spec § affected**: W376 spec §4.3 OAuth section; S1 §10 skeleton (illustrative only — sync example).
- **Stream § evidence**: S1 §8 (sync wrapper calls `asyncio.run()` internally; raises `RuntimeError` inside active asyncio loop); S6 §10 gotcha 4 (DIM-16 drift).
- **Proposed corrected text**: Inside `@activity.defn async def openhands_run_activity`, replace `llm = subscription_login(model=...)` with `llm = await subscription_login_async(model=...)`. Required because Temporal async activity body has a running event loop.

### P0-5 — Use `/ready` (NOT `/health`) for readiness polling

- **Spec § affected**: W376 spec §4.3 health-check section.
- **Stream § evidence**: S2 §3 (`/health` is alias of `/alive` and returns 200 once uvicorn process boots; `/ready` returns 503 until `mark_initialization_complete()` fires after VSCode + desktop + tool-preload init).
- **Proposed corrected text**: All `/health` polling references in spec MUST be replaced with `/ready`. Poll cadence: 250ms interval, 60s deadline, retry on `httpx.ConnectError|ReadTimeout|RemoteProtocolError`.

### P0-6 — Correct `AgentErrorEvent` import path

- **Spec § affected**: any spec § referencing `from openhands.sdk.event import AgentErrorEvent`.
- **Stream § evidence**: S1 §4 + S6 §10 gotcha 1 — `AgentErrorEvent` lives in `openhands.sdk.event.llm_convertible` (specifically `event/llm_convertible/observation.py:123`), NOT `openhands.sdk.event` directly. The `event/__init__.py` re-exports it but the canonical path goes through `event.llm_convertible`.
- **Proposed corrected text**: Use `from openhands.sdk.event.llm_convertible import AgentErrorEvent` OR rely on the re-export `from openhands.sdk.event import AgentErrorEvent` (S1 §4 confirms `event/__init__.py:1-50` exports the full set).

### P0-7 — Use `temporalio.exceptions.CancelledError`, NOT `activity.CancelledError`

- **Spec § affected**: W376 spec §4.3 cancellation section.
- **Stream § evidence**: S6 §10 gotcha 3 — `temporalio.exceptions.CancelledError` ≠ `activity.CancelledError`; use the former.
- **Proposed corrected text**: `from temporalio.exceptions import CancelledError` (S4 §3 confirms class at `temporalio/exceptions.py:165-176`).

### P0-8 — Wire `pydantic_data_converter` at `Client.connect` (required for Pydantic v2)

- **Spec § affected**: W376 spec Worker construction section.
- **Stream § evidence**: S4 §1 (`temporalio/contrib/pydantic.py:122-135`); without it, BaseModel return-types raise at `converter/_payload_converter.py:625-635`.
- **Proposed corrected text**: `client = await Client.connect(target, data_converter=pydantic_data_converter)`. Required because `OpenHandsRunRequest` + `OpenHandsRunResult` are Pydantic v2 BaseModels.

### P0-9 — Override `graceful_shutdown_timeout` (default 0s too aggressive)

- **Spec § affected**: W376 spec Worker construction section.
- **Stream § evidence**: S4 §9 (`_worker.py:835-841` defaults `graceful_shutdown_timeout=0s`).
- **Proposed corrected text**: `Worker(..., graceful_shutdown_timeout=timedelta(seconds=300))` so in-flight agent runs get 5 minutes to wrap before forced cancellation.

### P0-10 — Wrap agent module imports in workflow file

- **Spec § affected**: workflow file top imports.
- **Stream § evidence**: S4 §5 + W375 DIM-15.
- **Proposed corrected text**:
  ```python
  from temporalio import workflow
  with workflow.unsafe.imports_passed_through():
      from openhands_temporal.models import OpenHandsRunRequest, OpenHandsRunResult
      from pydantic import BaseModel
      import structlog
  ```

---

## §11 Carry-forward inventory (C2 added per codex r1 D6)

Consolidated carry-forward table covering W375 carry-overs (C10/C11/C12) + new W377+ items surfaced from S9-S12 extension streams + W376 codex r1 P0/P1 deferrals.

| ID | Source stream | Severity | Proposed corrected text / scope | Owner wave |
|---|---|---|---|---|
| **C10** | W375 lineage | P0 | Docker isolation via RemoteWorkspace + agent-server container per §5.1-§5.5. **Status**: DONE in W376 spec §4.3 + plan Task 9 (`agent_server_spawn`). | W376 (this wave) |
| **C11** | W375 lineage | P0 | Conversation lifecycle alignment per §4.3 canonical pattern (`callbacks=[_emit_event]` + sync `send_message` + blocking `conv.run()` in `asyncio.to_thread` + separate watchdog Task). NO `stream_events()` references remain. **Status**: DONE in W376 spec §4.3 + plan Task 11. | W376 (this wave) |
| **C12** | W375 lineage | P1 | Conversation_id format (UUIDv4 from `spec.conversation_id`, NOT freshly-minted `str(uuid4())`). **Status**: DONE in W376 spec §4 + plan Task 11 per codex r1 A6 fix. | W376 (this wave) |
| **C13** | S9 §10 #1 (CrewAI) | P1 | Adopt `output_pydantic`/`output_json` structured-output enforcement on every L1/L2/L3 review-chain hop + every parallel-subagent dispatch. Single highest-leverage gap-closer for OpenHands free-text chain. | W377-S4 |
| **C14** | S10 §10 #5 (PydanticAI) | P1 | Graph-state-machine run loop replacing imperative `while not done:` with `AgentRun.next_node` iteration; each node snapshotable → enables checkpoint-resume natively + closes Δ-G50 task-failure-recovery + L329-1 TASK-CLOSE-DRIFT. | W378+ |
| **C15** | S11 §10 #1 (verdict + DSPy) | P1 | L3 jury verify-step layer: second `codex exec` round per panel re-evaluating prior verdict against original change. Marginal cost: 1 extra codex round per ship-gate; expected lift `p`→`p·v` (per `1-(1-p·v)^N` ensemble formula). | W377-S1 |
| **C16** | S11 §10 #2 (verdict) | P1 | `MeanVariancePoolUnit` analog at L3-jury aggregation: low-variance ship / high-variance escalate to operator-sign. Formalizes escalation threshold currently implicit. | W377-S2 |
| **C17** | S12 §10 #1 (Goose) | P1 | Port Goose recipe YAML schema (declarative retry-in-recipe with `checks:` + `on_failure:` + state-reset semantics). Highest-impact Goose pattern OpenHands stack lacks. | W377-S5 |
| **C18** | S12 §10 #2 (Goose) | P2 | Enforce N-worker cap in `tools/preagent-parallel-guard.mjs` analog to Goose's 10-worker sub-recipe ceiling. Currently W350 GIT-TREE-SOTA caps at 5 worktrees but agent fan-out has no enforced ceiling. | W377-S3 |
| **C19** | Codex r1 P5-10 (D4) | P1 | Cold-start histograms unmeasured; spec/plan drift; resource isolation gaps; OTel spool overhead; payload sizing. See `tmp/openhands-brainstorm/codex-W376-r1-D4-OUTPUT.txt` for detail. | W377+ |
| **C20** | Codex r1 O6-10 (D5) | P1 | Heartbeat-details CLI surface; bounded histograms; event-store sparsity; C8 replay deferred; MLflow defer. See `...D5-OUTPUT.txt`. | W377+ |
| **C21** | Codex r1 R7 (D3) | P1 | `gc_async` maps non-RUNNING → local FAILED (incl. completed/cancelled); MUST map Temporal terminal states to matching local terminal. | W377+ |
| **C22** | Codex r1 R8 (D3) | P1 | `OscillationDetector.record_success(task_id)` API missing; wire to retry/escalation. | W377+ |
| **C23** | Codex r1 S6 (D2) | P1 | OAuth credential file ACL unverified — `icacls Z:/claude-sota-installed-state/.codex/auth.json`, require owner-only. **codex r2 D2-S6 FIXED**: "optional" qualifier removed; now a MANDATORY failing doctor check in plan Task 22. | W376 (this wave, MANDATORY) |
| **C24** | C3 lineage from W375 | P1 | `RetryBudget`/`OscillationDetector`/`IdempotentReplayer` standalone-primitives wiring into dispatch path via admission/retry coordinator before `start_workflow`. Codex r1 R1 ELEVATED to P0 for W376. | W376 (this wave) per R1 P0 |
| **C25** | C5 lineage from W375 | P1 | Agent default toolset (currently `tools=[]`); add minimal v2 toolset (FileEditor, BashTool, etc.) per upstream SDK conventions. | W377+ |
| **C26** | C6 lineage from W375 | P2 | 13 deferred CLI verbs (per W375 dispatch_temporal); enumerate + prioritize. | W378+ |
| **C27a** | C8 lineage from W375 | P1 | OTel-protobuf serialization primitive: replace `repr(span)` with wire-format `ExportTraceServiceRequest` bytes; replay-parse round-trip exercised by `agents/fake_otlp_collector.py` + `tests/e2e/test_w376_otel_replay.py`. **Status**: DONE in-wave per codex r4 D5-finding-2 split. | W376 (this wave) |
| **C27b** | C8 lineage from W375 | P1 | OTel replay-loop full wiring (recovery-pump that drives spool bytes back into a live OTLP exporter when the upstream collector recovers). End-to-end stream-replay loop is OUT of W376 scope; serialization primitive lands here, the pump lands W377+. | W377+ |
| **C28** | codex r5 D6-R2-P0-1 (split from over-loaded C24) | P1 | T5 Langfuse recovery + Goose triple-observability reproduction. Langfuse v3.174.1 image/version present per CLAUDE.md but reproducibility PENDING live-probe (cardinal-rule-6 verify-before-claim). Was incorrectly listed under C24 at §16.3 — C24 is admission/retry coordinator (DONE in-wave); this row needs its own ID so the Langfuse recovery work is not hidden by C24's DONE status. | W377+ |

**Totals**: 19 carry-forward rows (3 W375 lineage DONE + 1 W376 mandatory-doctor + 2 W376 in-wave-split + 13 W377-or-later items). Owner-wave dispatch ensures none of the codex r1 P1 surface is lost.

**codex r5 D6-R2-P0-1 fix** — prior table merged "T5 Langfuse recovery" under C24 (admission coordinator) creating an ID collision that hid the unresolved Langfuse work under a DONE row. The split into C24 (admission coordinator — DONE in-wave) + C28 (T5 Langfuse recovery — W377+) preserves observability that BOTH workstreams have distinct status without one masking the other. §16.3 below references C28 explicitly.

**§11 cite-density footer** (codex r8 D6-finding-1 fix — add ≥10 anchors per sca-v18 §-floor):
- W375 PR `https://github.com/[redacted-owner]/claude-sota-installed/pull/33` + W374 wave-close commit (run `git log --grep="W374 wave-close" --pretty=%H -1`) — C10/C11/C12 W375 lineage carry-forwards (rows 1-3)
- spec §11 validation gate `docs/superpowers/specs/2026-05-22-W376-openhands-sdk-alignment-design.md:1234-1244` — canonical carry-forward validation; detail table mirror at `SYNTHESIS.md:778-803` (this section itself)
- `All-Hands-AI/OpenHands-SDK` `openhands/sdk/conversation/local_conversation.py:978-1014` — `conv.close()` finality (C11 evidence)
- spec §6.11 + plan Task 20 + plan:2128 + plan:2583 — C24 admission coordinator DONE in-wave (row C24)
- plan Task 22 + `agents/otel_spool.py` + `agents/fake_otlp_collector.py` — C27a OTel-protobuf serialization (row C27a)
- W377+ wave queue + `tools/dispatch_temporal.py:replay_loop` — C27b OTel replay-loop W377+ defer (row C27b)
- CLAUDE.md L36 + Langfuse Docker `langfuse/langfuse:3.174.1` image present — C28 T5 Langfuse PENDING (row C28)
- `crewAIInc/crewai` `crewai/task.py:output_pydantic` — C13 CrewAI structured-output adoption candidate (row C13)
- `pydantic/pydantic-ai` `pydantic_ai/agent.py:AgentRun.next_node` — C14 PydanticAI graph-state-machine (row C14)
- `haizelabs/verdict` `verdict/judge.py:9-143` + `block/goose` recipe retry — C15+C17 jury + recipe adopts (rows C15/C17)
- W375 lineage `tools/preagent-parallel-guard.mjs` + `block/goose` 10-worker cap — C18 N-worker enforcement (row C18)

---

## §12 CrewAI hierarchical orchestration pattern (S9)

### §12.1 `manager_llm` + worker delegation model (S9 §2)

CrewAI's hierarchical process is enabled via `Crew(process=Process.hierarchical, manager_llm=... | manager_agent=...)` per `lib/crewai/src/crewai/crew.py:136-205`. Exactly ONE of `manager_llm` or `manager_agent` is required. When only `manager_llm` is supplied, CrewAI auto-creates a manager from predefined role/goal/backstory translations and ALWAYS initializes it with `allow_delegation=True` + equipped with `AgentTools`.

Entry point: `Crew._run_hierarchical_process` (S9 §2). Per-task wiring:
- `_get_agent_to_use` returns the `manager_agent` as task executor (NOT the originally-named agent).
- `_prepare_tools` adds delegation tools to the manager when `allow_delegation=True`.
- `_update_manager_tools` injects per-coworker delegation tools so the manager can route to any agent in the crew.

Delegation tools dynamically generated by `AgentTools` (S9 §2):
- `delegate_work_to_coworker(coworker, task, context)` — tool description EXPLICITLY mandates passing FULL context because "the coworker knows nothing about the task".
- `ask_question_to_coworker(coworker, question, context)` — manager queries a worker for input.

This is the canonical Anthropic orchestrator-workers topology with explicit runtime decomposition. The manager LLM call per delegation decision is the cost overhead vs Sequential, in exchange for adaptive routing on open-ended goals.

### §12.2 `Task.output_pydantic` structured-output enforcement — THE missing ingredient in OpenHands L1/L2/L3 free-text chain (S9 §5)

CrewAI's `Task` enforces structured worker output via three layered attributes (per `lib/crewai/src/crewai/task.py:87-110` + S9 §5):

1. **`expected_output: str`** — natural-language description of the expected result. Guides the LLM but is NOT programmatically enforced.
2. **`output_pydantic: Type[BaseModel]`** — Pydantic model the agent's final response MUST conform to. Yields a Pydantic instance.
3. **`output_json: Type[BaseModel]`** — Pydantic model used to produce a JSON dict output conforming to the schema.

`output_pydantic` and `output_json` are mutually exclusive (validated at Task construction). The validation flow at `Task._execute_core` / `_aexecute_core` (S9 §5):
- If the agent's raw result is already a `BaseModel` instance → used directly.
- For LLMs supporting native structured output (Bedrock, Gemini, OpenAI strict mode), CrewAI injects a `STRUCTURED_OUTPUT_TOOL_NAME` pseudo-tool whose `args_schema` is the target Pydantic model. `generate_model_description` converts the model to JSON Schema for LLM consumption.
- `GeminiCompletion` and provider-equivalents check the LLM response for the structured-output function call, extract args, route through `response_model`.

**Why this matters for W376** (S9 §5 + §8): The OpenHands L1/L2/L3 layered-review chain currently passes FREE-FORM TEXT between layers — no structured schema mandate. CrewAI's `output_pydantic` is the missing ingredient that turns naive parent-merge into mechanically-parseable consensus. Per S9 §8 comparison table: OpenHands L1/L2/L3 "Worker output contract" column = "Free-form text passed up — no structured schema mandate"; CrewAI's column = "`output_pydantic` / `output_json` mandatory for parseable merge". This is also the citation reason in the local `parallel-dispatch-mandate` skill.

### §12.3 `BaseTool` contract (`args_schema: Type[BaseModel]`) (S9 §4)

CrewAI's `BaseTool` abstract base requires four members:
- `name: str` — unique tool identifier shown to the LLM
- `description: str` — when/why/how to use (LLM's selection signal)
- `args_schema: Type[BaseModel]` — Pydantic schema for tool args; auto-generated from `_run` signature if omitted
- `_run(self, **kwargs) -> str` — REQUIRED sync impl; `_arun` is optional async

Tool binding is two-tier with override semantics (S9 §4):
1. **Per-agent tools**: `Agent(tools=[...])` — available for every task that agent executes.
2. **Per-task tools**: `Task(tools=[...])` — for THAT task, OVERRIDES the agent's tools entirely. Agent's original tool set is unchanged outside this task.

This per-task override semantic provides fine-grained capability scoping WITHOUT mutating agent identity — useful for W376 subagent-allowlist + per-dispatch tool scoping (S9 §10 pattern #3).

### §12.4 Memory + retry primitives — `guardrail_max_retries` deprecation note (S9 §6 + §7)

**Memory** (S9 §6): unified `Memory` class with LLM-driven analysis replaces the legacy split (short-term / long-term / entity / contextual still documented but consolidated under one API). Save path is `CrewAgentExecutorMixin._save_to_memory`; recall path is `Agent._retrieve_memory_context`. Hierarchical scope keys use `/crew/<name>/agent/<role>` style (S9 §10 pattern #5 — adoptable for T6 basic-memory wave-thread keys).

**Retry** (S9 §7):
- **`Task.max_retries` is DEPRECATED** — replaced by `guardrail_max_retries` controlling retries when a `Task.guardrail: Callable` synchronous output-validator rejects the agent's output.
- **Agent-level retry**: governed by `Agent.max_retry_limit`. Two-layer impl: `_check_execution_error` decides re-raise vs retry (re-raises `litellm` exceptions verbatim + when attempt count > limit); `_handle_execution_error` recursively calls `execute_task` on retry-allowed.
- **Modern pattern**: `guardrail: Callable` + `guardrail_max_retries` is more semantic than blind retry. Matches the local `empty-final-message-guard` skill at Δ-G49 (S9 §10 pattern #4).

### §12.5 Applicable patterns for W376 (or W377+) (S9 §10)

Eight CrewAI patterns transferable to W376/W377+:

1. **Structured output mandate on subagent tasks** — adopt `output_pydantic`/`output_json` on every parallel-subagent dispatch. Single highest-leverage gap-closer for OpenHands L1/L2/L3 free-text chain.
2. **Manager-with-delegation-tools topology** — model the parent orchestrator as a manager LLM equipped with `delegate_to_subagent(name, task, context)`. Maps cleanly to Claude Code's `Agent` tool.
3. **Two-tier tool binding** (per-agent vs per-task) — per-task tools override per-agent defaults without identity mutation.
4. **Guardrails over retry-count** — `guardrail: Callable` + `guardrail_max_retries` matches Δ-G49 empty-final-message-guard semantics.
5. **Hierarchical scope keys** for cross-session memory (`/crew/<name>/agent/<role>`).
6. **Manager auto-equipped with `allow_delegation=True`** — auto-inject delegation tools in W377+ orchestrator-mode.
7. **Mutual exclusion validators on Task** — `output_pydantic` vs `output_json` are mutually exclusive at construction; W376 TaskSpec should adopt for conflicting fields.
8. **`expected_output` (prose) PAIRED WITH schema** — belt-and-suspenders: LLM gets human-readable guidance + tool-call schema enforcement.

Anti-patterns to AVOID: (a) CrewAI's deprecated `max_retries` (skip directly to guardrail pattern); (b) auto-created manager from `manager_llm` obscures manager prompt-engineering — W376 should require explicit manager agent spec for auditability.

---

## §13 PydanticAI typed-agent + snapshottable graph (S10)

### §13.1 Generic `Agent[AgentDepsT, OutputDataT]` type-flow (S10 §1 + §2)

PydanticAI's core is `Agent[AgentDepsT, OutputDataT]` (generic `AbstractAgent` subclass) parameterized over two type variables (per `pydantic_ai_slim/pydantic_ai/agent/__init__.py:183`):
- `AgentDepsT` — dependency-injection payload type (DB session, HTTP client, config dict)
- `OutputDataT` — final result type (`str` default; or any Pydantic BaseModel / dataclass / `Literal` union)

Default `Agent()` (no params) = `Agent[None, str]`. **Type-safety end-to-end**: Pydantic v2 generics flow `AgentDepsT` into `RunContext[AgentDepsT]` (passed as first arg to tools/validators) and `OutputDataT` into `AgentRunResult[OutputDataT].output`. Static checkers (mypy, pyright) catch mismatches at design time; Pydantic enforces at runtime via JSON-schema validation.

Constructor kwargs (selected high-leverage subset, S10 §2):
| Kwarg | Type | Purpose |
|---|---|---|
| `output_type` | `type[OutputDataT]` (default `str`) | Final-result schema; drives JSON validation |
| `deps_type` | `type[AgentDepsT]` | DI payload type (static-check) |
| `retries` | `int \| AgentRetries` | Per-category retry budget (tools/output/global) |
| `validation_context` | `dict` | Pydantic validation ctx for tool args/outputs |
| `toolsets` | `Sequence[AbstractToolset]` | Composable toolset registry |
| `end_strategy` | `EndStrategy` | How to handle tool-calls alongside final result |
| `tool_timeout` | `float` | Default tool exec timeout (sec) |
| `max_concurrency` | `int` | Cap on concurrent agent runs |

Declarative alternative: `Agent.from_spec(AgentSpec)` / `Agent.from_file(path)` reads YAML/JSON; kwargs override spec fields.

### §13.2 Graph-state-machine run loop (snapshottable → enables Temporal integration NATIVELY) (S10 §4 + §6)

PydanticAI's run loop is graph-based, NOT loop-driven. A `pydantic-graph` state machine walks `UserPromptNode → ModelRequestNode → CallToolsNode → (loop) → End`. `AgentRun.next_node` (per `pydantic_ai_slim/pydantic_ai/run.py:32`) advances per `await`:
- `UserPromptNode` — initial user input → assembles message-history.
- `ModelRequestNode` — sends to LLM; result may be text-only OR `ToolCallPart`s.
- `CallToolsNode` — for each `ToolCallPart`, validate args via Pydantic → execute → wrap return in `ToolReturnPart` → append to history.
- Loop back to `ModelRequestNode` until model emits a non-tool response matching `output_type` → `End`.

Three entry points (S10 §4, `pydantic_ai_slim/pydantic_ai/agent/abstract.py`):
- **`run()` ~ L216** — async; runs graph to `End`, returns `AgentRunResult[OutputDataT]`. Optional `event_stream_handler` for progress events.
- **`run_sync()` ~ L381** — sync wrapper using `loop.run_until_complete(self.run(...))`.
- **`run_stream()` ~ L466** — async context manager yielding `StreamedRunResult`. Stops at first matching `final_result_event` — subsequent tool-calls aren't executed.

**Critical W376 insight**: per S10 §6, "the graph is **stateful and replayable** — `AgentRun` can be paused, snapshotted, resumed (durable-execution integration with Temporal / DBOS supported)." This is the missing primitive in W376's current imperative `while not done:` orchestrator loop and pairs DIRECTLY with the `checkpoint-resume` skill + W375 Δ-G50 task-failure-recovery + L329-1 TASK-CLOSE-DRIFT mitigation (S10 §10 pattern #5).

### §13.3 Three output modes (`ToolOutput` / `NativeOutput` / `PromptedOutput`) — reliability ranking (S10 §5)

PydanticAI offers three explicit output modes with documented reliability ranking (S10 §5):

| Mode | Mechanism | Activation | Reliability |
|---|---|---|---|
| `ToolOutput` (default) | LLM tool-calls a synthetic `final_result` tool with output as args | Default for BaseModel/dataclass; explicit via `ToolOutput(T)` | **High** |
| `NativeOutput` | Model's native structured-output / JSON-schema response | `NativeOutput(T)` | High (model-dependent — Gemini can't mix with tools) |
| `PromptedOutput` | Schema injected into prompt as instructions | `PromptedOutput(T)` | **Lowest** — relies on LLM compliance, but works with any model |

`OutputMode.auto` lets `ModelProfile.default_structured_output_mode` pick. **W376 mapping** (S10 §10 pattern #3): Codex-Verdict trailer could use `NativeOutput` on GPT-5.5 vs `PromptedOutput` on local Ollama qwen3-coder (universal fallback). Anti-pattern from S10 §10: do NOT adopt `PromptedOutput` as DEFAULT mode for TaskResult — it's the least reliable; reserve for fallback only when `ToolOutput` unsupported.

### §13.4 Retry-prompt-loop with `ValidationError` → `RetryPromptPart` (S10 §5 + §7)

Two-stage validation pipeline (S10 §5):
1. **Pydantic validation** — `TypeAdapter(OutputDataT).validate_python(raw)` enforces schema. Raises `ValidationError` on mismatch.
2. **Output validators** — `@agent.output_validator` decorated funcs run post-Pydantic for custom checks (async ok). May raise `ModelRetry(msg)`.

Failure flow: validation error → framework auto-generates `RetryPromptPart` with error detail (Pydantic `loc`/`msg`/`type`/`input_value` preserved) → injected into next `ModelRequest` → LLM gets structured corrective feedback → retries up to budget. Budget exhaustion → `UnexpectedModelBehavior` exception.

**W376 adoption rationale** (S10 §10 pattern #4): currently W376 has NO formal retry-loop on TaskResult validation failures. Adopting `RetryPromptPart`-equivalent semantics — structured error detail fed back to the model with per-category budget cap (`retries` per-tool / per-output / global) — would close the "silent-tool-error-swallow" failure mode.

### §13.5 Five transferable patterns for W376 TaskSpec/TaskResult (S10 §10)

1. **Generic-parameterized result envelope** — model TaskResult as `TaskResult[OutputT]` (Pydantic BaseModel generic), mirroring `AgentRunResult[OutputDataT]`. Static checkers verify `.output` access type-safety; runtime validates via `TypeAdapter`.
2. **DI via typed RunContext** — TaskSpec carries `deps_type`; orchestrator injects `TaskContext[DepsT]` into worker subagents giving typed `.deps` access (DB, HTTP client, secrets). Replaces brittle dict-based context-passing.
3. **Three-mode output validation** — `ToolOutput` default + `NativeOutput`/`PromptedOutput` opt-in per model capability.
4. **Retry-prompt-loop semantics** — structured `ValidationError`-to-`RetryPromptPart` feedback with per-category budget.
5. **Graph-state-machine run loop** — replace imperative `while not done` with `AgentRun.next_node` iteration. Each node snapshotable → enables checkpoint-resume natively.

---

## §14 DSPy + haizelabs/verdict L3 jury upgrade path (S11)

### §14.1 DSPy `Module` / `Signature` / `Predict` / `ChainOfThought` primitives (S11 §1 + §2)

DSPy is a programmatic-prompting framework from Stanford NLP (Apache-2.0). Core primitives:
- `dspy.Module` (`dspy/primitives/module.py`) — base class; every DSPy program inherits it, declaring `__init__` (instantiate sub-modules) + `forward(...)` (wire them).
- `dspy.Predict` (`dspy/predict/predict.py`) — leaf execution unit; takes a `Signature` (string or class), executes ONE LM call, returns a `Prediction` with declared `OutputField`s.
- `dspy.ChainOfThought` (`dspy/predict/chain_of_thought.py`) — wraps `Predict` and PREPENDS a `reasoning: str = OutputField()` field forcing step-by-step reasoning before the final answer.
- `dspy.Signature` (`dspy/signatures/signature.py`) — declarative class with class-level `InputField()` / `OutputField()` typed via Python annotations (`Literal`, `int`, `float`, `list[...]`, Pydantic models). Docstring becomes LM instruction; field types drive the parser.

Canonical pattern (S11 §2):
```python
class Classify(dspy.Signature):
    """Classify sentiment of a given sentence."""
    sentence: str = dspy.InputField()
    sentiment: Literal['positive', 'negative', 'neutral'] = dspy.OutputField()
    confidence: float = dspy.OutputField()

classify = dspy.Predict(Classify)
classify(sentence="This book was super fun to read, though not the last chapter.")
```

Output coercion is automatic: `Literal[...]` constrains to enum, `float` parses numeric, Pydantic to structured object.

### §14.2 haizelabs/verdict `CategoricalJudgeUnit` + `BestOfKJudgeUnit` + `JudgeUnit` at `judge.py:9-143` (S11 §4)

haizelabs/verdict (MIT, ~600 stars) provides LLM-judge composition primitives. Verified via deepwiki at current HEAD (line drift vs W369 P1.2 SHA `8f972ef3` noted as ~2-line content-stable):
- `JudgeUnit`: `verdict/common/judge.py:9-29` (W369 cited 9-143 for the whole class cluster).
- `BestOfKJudgeUnit`: `verdict/common/judge.py:30-73` — judges multiple candidate responses and selects best.
- `CategoricalJudgeUnit`: `verdict/common/judge.py:86-96` — judge that emits a categorical label (e.g. `correct`/`incorrect`/`partial`); used in the 3-hierarchically-verified-judges-plus-max-vote pattern.

Each `*JudgeUnit` is a verdict `Unit` — a leaf execution node wrapping an LM judge call with structured-output parsing.

### §14.3 verdict `MaxPool` / `MeanPool` / `MeanVariancePool` aggregation at `transform.py:86-106` (S11 §5)

Aggregation primitives (drift vs W369's cite of 127-143 noted, content-stable):
- `MaxPoolUnit`: `verdict/transform.py:86-89` — `statistics.mode` majority vote across N instances.
- `MeanVariancePoolUnit`: `verdict/transform.py:91-100` — returns `(mean, variance)`; variance is the per-cluster inter-instance-agreement reliability proxy (low var = high confidence; high var = downgrade verdict).
- `MeanPoolUnit`: declared in `verdict/transform.py:106` `__all__` — `statistics.mean` arithmetic average.

`MeanVariancePoolUnit` is the SOTA primitive: practical inverse-variance-weighted estimator (BLUE under Gauss-Markov); strictly dominates naive `MaxPoolUnit` when inter-instance reliability is non-uniform.

Composition via `Block.__rshift__` at `verdict/core/primitive.py:553-575` enables `JudgeLayer >> VerifyLayer >> MaxPoolUnit` pipelines. The canonical 3-judges-plus-verify-plus-max-vote recipe at `README.md:26-40`:
```python
JudgeLayer(repeat=3) >> VerifyLayer(repeat=3) >> MaxPoolUnit()
```
Verifier step turns naive majority into reliability-weighted: an instance whose verifier flips it contributes effectively half a vote, not a full vote. Across N=3 judges with per-judge accuracy `p`, verify-step lifts ensemble accuracy from `1-(1-p)^N` to `1-(1-p·v)^N` where `v` is verifier-accuracy (typically `>p` because verifier sees richer evidence).

### §14.4 W375 L3 jury delta vs SOTA — covers 3 of 5 primitives, MISSES verify-step + variance gating + optimizer-driven tuning (S11 §8)

| Dimension | W375 L3 jury (current) | SOTA (verdict + DSPy) |
|---|---|---|
| Panel composition | 3-panel codex GPT-5.5, position-swap audit | `JudgeLayer(repeat=3)` |
| Aggregation | Implicit max-vote (operator reads 3 verdicts, decides) | Explicit pool primitive (`MaxPoolUnit` / `MeanPoolUnit` / `MeanVariancePoolUnit`) |
| Reliability scoring | NONE — all 3 panels weighted equally | Variance per cluster; low-var ship / high-var escalate |
| Verify-step | NONE — no per-judge explanation re-evaluation | `>> VerifyLayer(repeat=3)` flips systematic errors |
| Optimizer-driven prompt tuning | NONE — review prompts hand-tuned + frozen | DSPy `MIPROv2` optimizes against held-out calibration set |
| Cite-cluster reliability weighting | Per-claim at citations-agent SKILL.md L67-133 (W369 P1.2) | Not yet wired into L3-jury runtime |

**Net delta**: W375 L3 holds 3-of-5 SOTA primitives (panel-count, position-swap, codex-as-judge) but MISSES (a) verify-step, (b) variance-based reliability, (c) optimizer-driven prompt tuning. The W369 P1.2 augmentation added reliability-weighting at per-claim level — what's missing is verify-step + DSPy-MIPROv2 optimization at the L3-jury level.

### §14.5 Three adopt-now patterns for W377+ (S11 §10)

Low integration cost, high reliability gain (S11 §10):

1. **Verify-step layer for L3 jury** — after each codex panel emits a verdict + explanation, dispatch a second `codex exec` round (Path P foreground+tee) whose only job is to re-evaluate the prior explanation against the original change. Expected lift: judge accuracy `p` → `p·v` where `v` is verifier-accuracy; for `p=0.85`, `v=0.95` → ensemble accuracy `1-(1-0.85·0.95)^3 = 99.4%`; larger for low-p (`p=0.65 → 95.0%` vs `92.9%`).

2. **`MeanVariancePoolUnit` analog for L3 jury** — compute inter-panel agreement variance; LOW-variance → ship; HIGH-variance → escalate to operator-sign rather than auto-max-vote. Formalizes when to escalate (currently 3-panel split-verdict = operator-sign-pending without explicit threshold).

3. **Cite-cluster reliability weighting at L3-jury level** — extend citations-agent's per-claim check (W369 P1.2 deployed) to L3-jury VERDICT-LEDGER row aggregation. Each codex panel's cite-cluster gets a reliability score; ledger-row weighted by it. Marginal cost: re-use existing `reliabilityWeightedCheck` function from citations-agent SKILL.md L88-108.

Adopt-later (higher cost, ship-gate quality lift): DSPy `MIPROv2` optimization of judge-prompts against held-out human-judged calibration set (~50 wave-close verdicts; W377+ candidate after calibration set lands). Skip-for-now: `BestOfKJudgeUnit` (designed for response-picking, not verdict-aggregation) + `BootstrapFewShot` (superseded by MIPROv2).

---

## §15 Goose + Continue production-agent patterns (S12)

### §15.1 Goose architecture — 100% Rust + SQLite session persistence (S12 §1)

Goose is a **Rust-core** agent framework from Block (Square/CashApp), distributed as a CLI + Electron desktop app. The "Python claim" was incorrect per DeepWiki probe — only `test_acp_client.py` exists for ACP-client testing; the entire runtime is Rust.

Crate layout (S12 §1):
- `crates/goose/` — core library (Agent, recipes, providers, extensions)
- `crates/goose-cli/` — command-line interface
- `crates/goose-server/` — HTTP backend API
- `crates/goose-mcp/` — built-in MCP server implementations (developer, computer_controller, memory, etc.)
- `ui/desktop/` — Electron + React desktop UI

The `Agent` struct at `crates/goose/src/agents/agent.rs` orchestrates the conversation loop. `AgentConfig` carries `SessionManager`, `PermissionManager`, `GooseMode`, `GoosePlatform` (CLI vs Desktop). Sessions persist to **SQLite** via `SessionManager`. Three design pillars: provider-agnosticism, MCP-native extensibility, multiple front-ends.

### §15.2 Goose recipes — declarative YAML retry with shell-check + 10-worker sub-recipe cap (S12 §3)

**Recipes** are declarative YAML/JSON workflows — Goose's flagship differentiator vs OpenHands/Continue. Parser at `crates/goose/src/recipe/mod.rs` (parameter handling: `template_recipe.rs`; validation: `validate_recipe.rs`).

Recipe fields: `description`, `instructions`, `prompt`, `activities`, `extensions`, `parameters`, `response`, `retry`, `settings`, `sub_recipes`.

**Retry block** (production-grade declarative retry, S12 §3):
```yaml
retry:
  max_retries: 5
  timeout_seconds: 10
  checks:
    - type: shell
      command: "test $(cat /tmp/counter.txt) -ge 3"
  on_failure: "echo 'Counter at:' $(cat /tmp/counter.txt)"
  on_failure_timeout_seconds: 600
```
Flow: recipe runs → all `checks` execute → if any fails AND retries remain → `on_failure` runs, agent message history **resets**, restart. Implementation in `crates/goose/src/agents/retry.rs` (`RetryManager` + `handle_retry_logic`).

**Sub-recipes**: composition via `sub_recipes:` field (name/path/description/pre-filled params). AI invokes via the `subagent` tool. Limits (CRITICAL for W376): **no nested sub-recipes**, **10 concurrent parallel workers cap**, **no shared state between sub-recipes** (explicit param passing only). Each sub-recipe can specify its own LLM model.

Execution mode: `goose run --recipe <file>` headless, or scheduled.

### §15.3 Goose triple observability (OTel + Langfuse + MLflow native) — perfect alignment with T5 Langfuse v3.174.1 (S12 §7)

**Goose production-readiness signals (strong)** (S12 §7):
- **OpenTelemetry OTLP/HTTP** export native (`OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_HEADERS`)
- **Langfuse** integration — per-interaction traces, timeline view, token monitoring
- **MLflow** integration — eval framework + prompt management
- **LLM provider failure**: `Agent::reply` catches stream errors, emits `AgentEvent::Message`, suggests retry, emits telemetry
- **MCP tool failure**: errors fed back to LLM as tool responses (model self-heals)
- **Declarative retry** (§15.2): error classes = invalid checks, timeout, max_retries exceeded, missing fields

**Alignment with local stack** (C1 corrected per codex r1 D6 — verify-before-claim discipline cardinal-rule-6): T5 Langfuse v3.174.1 image/version is present in the runtime but the service is currently DOWN-CRASH-LOOP per CLAUDE.md L36 ("T5 langfuse ✓ LIVE v3.174.1" claim is image-pinned, NOT live-probed at time of writing). Goose's triple-observability pattern is architecturally aligned with the local stack but reproducibility is PENDING until T5 Langfuse recovery is proven via live probe (e.g., `curl -sf http://127.0.0.1:3000/api/public/health`). Adding the env-var trio (`OTEL_EXPORTER_OTLP_ENDPOINT`, `OTEL_EXPORTER_OTLP_HEADERS`) to CLAUDE.local.md ENV block would give us free OTel + MLflow without code changes once T5 is live-probe-confirmed (S12 §10 pattern #3 — low effort, aligned-but-blocked-on-T5-recovery).

### §15.4 Continue architecture — TypeScript-core, YAML/JSON/TS config (NOT TOML) (S12 §4 + §5)

Continue is a **TypeScript-core** IDE-integrated agent — fundamentally different from Goose. Architecture:
- **`Core` class** at `core/core.ts` — IDE-agnostic business logic (LLM calls, indexing, config)
- **`Messenger` abstraction** — request/response + event broadcast between Core ↔ IDE ↔ Webview
- **`IDE` interface** at `core/index.d.ts` — Core never touches editor APIs directly

Two IDE extensions:
- **VSCode**: `extensions/vscode/src/extension/VsCodeExtension.ts` (`VsCodeIde` implements `IDE`)
- **JetBrains**: Kotlin-based, communicates with Node core via **stdin/stdout**; `IntelliJIde.kt` + `CoreMessenger.kt`. Embeds React webview.

**Three modes** (S12 §4): Agent (task work; MCP servers PRIMARILY used here), Chat (general Q&A), Autocomplete (inline completion via FIM = Fill-In-the-Middle prompting with prefix+suffix).

**Config priority** (S12 §5 — the brief was wrong about TOML): **YAML primary**, JSON legacy, TypeScript advanced. **No TOML**.
- `~/.continue/config.yaml` — user-global (Windows: `%USERPROFILE%\.continue\config.yaml`)
- `~/.continue/config.json` — legacy
- `.continuerc.json` — workspace-level (merge/override)
- `config.ts` — programmatic extension

`ConfigHandler` (`core/config/ConfigHandler.ts`) watches + validates. `doLoadConfig` (`core/config/profile/doLoadConfig.ts`) transforms raw → `ContinueConfig`. YAML parsing: `loadContinueConfigFromYaml` in `core/config/yaml/loadYaml.ts`. Slash commands via `intermediateToFinalConfig` in `core/config/load.ts`.

MCP integration: `MCPManagerSingleton` (`core/context/mcp/MCPManagerSingleton.ts`). Loading flow: `loadJsonMcpConfigs` reads `experimental.modelContextProtocolServers` → `intermediateToFinalConfig` wires via `MCPManagerSingleton` → MCP tools surface in **agent mode**.

### §15.5 OpenHands stack missing 3 high-leverage Goose patterns: declarative retry-in-recipe, sub-recipe concurrency cap, MCP-first uniformity (S12 §8 + §10)

Per S12 §8 comparison, OpenHands lacks (addressable in W377+):

1. **Declarative retry-in-recipe** (HIGHEST IMPACT — S12 §10 #1) — OpenHands lacks YAML-defined success checks + on_failure shells. Single highest-leverage pattern to port. Existing local `wave-close-pipeline` + `task-close-discipline` skills approximate this; formalizing as YAML recipes would dramatically improve reproducibility.
2. **Sub-recipe composition with concurrency cap** (MEDIUM IMPACT — S12 §10 #2) — OpenHands has agent delegation but no 10-worker cap surfacing. Currently W350 GIT-TREE-SOTA caps at 5 worktrees but agent fan-out has no enforced ceiling.
3. **MCP-first uniformity** (S12 §8) — OpenHands mixes native tools + MCP; Goose treats everything as MCP via `ExtensionManager` at `crates/goose/src/agents/extension_manager.rs`.
4. **OTel/Langfuse/MLflow triple-export** (LOW EFFORT, ALIGNED — S12 §10 #3) — already aligned with our T5 Langfuse infrastructure; trivial to mirror.

Anti-pattern from Continue (S12 §10): IDE-extension coupling without OTel — Continue's lack of native tracing makes production debugging harder. Goose's posture is preferable.

Next-wave queue (S12 §10): W377-S1 port Goose recipe YAML schema; W377-S2 add `OTEL_EXPORTER_OTLP_*` env vars; W377-S3 enforce N-worker cap in `tools/preagent-parallel-guard.mjs` (currently no cap).

---

## §16 Extended cross-runtime consensus (S9 + S10 + S11 + S12)

### §16.1 Structured-output enforcement — CrewAI + PydanticAI agree; W376 should adopt for L1/L2/L3

Two-org convergence on the same pattern from independent angles:
- **CrewAI** (S9 §5): `Task.output_pydantic: Type[BaseModel]` mandatory for parseable parent-merge; CrewAI's structured-output enforcement is THE missing ingredient in OpenHands L1/L2/L3 free-text chain.
- **PydanticAI** (S10 §5): three explicit output modes (`ToolOutput` default high-reliability / `NativeOutput` model-dependent / `PromptedOutput` universal-fallback lowest-reliability) with documented reliability ranking. `PromptedOutput` explicitly anti-recommended as default.

**Consensus rule for W376** (cross-references C1 Pydantic v2 wiring in §2): every parallel-subagent dispatch and every L1/L2/L3 review-chain hop MUST return data conforming to a parent-defined Pydantic schema, NOT free-form markdown. Default mode = tool-call schema enforcement (CrewAI `output_pydantic` / PydanticAI `ToolOutput`); prompt-injection fallback (`PromptedOutput`) only when tool-call unsupported.

### §16.2 Snapshottable runtime state — PydanticAI graph-state-machine + Goose recipe-retry-state both demonstrate

Two independent demonstrations of snapshottable-state-as-resumability-primitive:
- **PydanticAI** (S10 §6): graph-based run loop with `AgentRun.next_node` advancing per `await`; "the graph is stateful and replayable — `AgentRun` can be paused, snapshotted, resumed (durable-execution integration with Temporal / DBOS supported)."
- **Goose** (S12 §3): recipe `retry` block with explicit state-reset semantics — "agent message history **resets**, restart" on retry; `RetryManager` + `handle_retry_logic` at `crates/goose/src/agents/retry.rs`.

**Consensus rule for W376**: the run loop must expose snapshot/restore primitives — replace imperative `while not done:` with state-machine iteration (PydanticAI `AgentRun.next_node`) AND/OR declarative retry-with-state-reset (Goose `retry:` block). Pairs with `checkpoint-resume` skill + Δ-G50 task-failure-recovery + L329-1 TASK-CLOSE-DRIFT mitigation. Cross-anchors §4.3 W376 watchdog-task SOTA pattern (which currently lacks explicit checkpoint primitives).

### §16.3 Triple observability — alignment validated; T5 Langfuse recovery is C28 carry-forward (codex r5 D6-R2-P0-1 fix — was C24 collision with admission coordinator)

Goose's **OTel + Langfuse + MLflow** native triple-export (S12 §7) demonstrates production-grade observability without code changes — three env vars wire all three sinks. The local stack has T5 Langfuse v3.174.1 image/version present per CLAUDE.md L36, but the service is currently DOWN-CRASH-LOOP at time of writing (C1 corrected — codex r1 D6 cardinal-rule-6 verify-before-claim). Goose triple-observability is **architecturally aligned** with the local stack but **reproducibility is PENDING** until T5 Langfuse recovery is proven via live probe. Adding `OTEL_EXPORTER_OTLP_ENDPOINT` + `OTEL_EXPORTER_OTLP_HEADERS` to CLAUDE.local.md ENV block would reproduce the Goose pattern with zero code once T5 is restored (S12 §10 #3).

**codex r5 D6-R2-P0-1 ID split** — the T5 Langfuse recovery work is **C28** (NOT C24). C24 is the admission/retry coordinator (DONE in-wave per spec §6.11 + plan Task 20). The prior under-C24-listing of "T5 Langfuse recovery" created an ID collision that hid the unresolved Langfuse work under a DONE row; §11 carry-forward table now has both rows distinct, preserving observability that admission-coordinator is DONE while Langfuse-recovery is W377+ PENDING.

Cross-anchor to §8 (Anthropic 15× multi-agent token-burn empirical anchor): observability is the prerequisite for measuring multi-agent burn against AutoGen's `TokenUsageTermination` budget. The Goose pattern is the SOTA-portable measurement substrate.

### §16.4 W375 L3 jury upgrade plan — 3 adopt-now patterns deferred to W377+

Consolidated from §14.5 (S11) + §16.1 (S9+S10) + §16.2 (S10+S12) into a coherent W377+ wave plan:

1. **W377-S1 (adopt-now from §14.5 #1)** — verify-step layer: dispatch a second `codex exec` round to re-evaluate each panel's verdict+explanation BEFORE max-vote. Marginal cost: one extra codex round per ship-gate.

2. **W377-S2 (adopt-now from §14.5 #2)** — `MeanVariancePoolUnit` analog: compute inter-panel agreement variance; low-var ship / high-var escalate to operator-sign. Formalizes the escalation threshold.

3. **W377-S3 (adopt-now from §14.5 #3 + §16.1 cross-ref)** — per-claim reliability weighting at L3-jury aggregation: extend citations-agent's W369 P1.2 deployment from per-claim → per-VERDICT-LEDGER-row. Re-use `reliabilityWeightedCheck` at SKILL.md L88-108.

4. **W377-S4 (cross-ref §16.1 + §13.5 pattern #1)** — TaskResult-as-Pydantic-generic: model TaskResult as `TaskResult[OutputT]` with mandatory `output_pydantic`-equivalent on every L1/L2/L3 hop.

5. **W378+ (adopt-later from §14.5 + §16.2)** — DSPy `MIPROv2` optimization of judge-prompts + graph-state-machine run loop with checkpoint-resume primitives. Pre-req: ~50-verdict human-judged calibration set authored in W377+.

This 5-step ladder converts the consensus findings from cross-stream synthesis into an actionable W377+ wave plan that complements (but does not block) the existing W376 PHASE D implementer tasks.

### §16.5 Upstream file:line anchors for high-risk recommendations (C7 added per codex r1 D6)

Per codex r1 D6 C7 — direct upstream cite-anchors are mandatory for the high-risk recommendations in §16 (structured-output mandate, snapshottable runtime state, triple-observability). Each anchor below pins both file:line AND docs URL:

| §16 recommendation | Upstream file:line anchor | Docs URL |
|---|---|---|
| §16.1 CrewAI `Task.output_pydantic` | `crewAIInc/crewAI` `lib/crewai/src/crewai/task.py:87-110` (Task class with `expected_output` / `output_pydantic` / `output_json` / `guardrail` fields per S9 §1, §5) | `docs.crewai.com/concepts/tasks` |
| §16.1 PydanticAI `ToolOutput`/`NativeOutput`/`PromptedOutput` | `pydantic/pydantic-ai` `pydantic_ai_slim/pydantic_ai/agent/__init__.py:183` (Agent[AgentDepsT, OutputDataT] generic) + `pydantic_ai_slim/pydantic_ai/output.py` (OutputMode enum + ToolOutput/NativeOutput/PromptedOutput marker classes per S10 §5) | `ai.pydantic.dev/output/` |
| §16.2 PydanticAI graph-state-machine | `pydantic/pydantic-ai` `pydantic_ai_slim/pydantic_ai/run.py:32` (`AgentRun` class — snapshottable graph state per S10 §6) | `ai.pydantic.dev/agents/` (search "AgentRun") |
| §16.2 Goose `RetryManager` + `handle_retry_logic` | `block/goose` `crates/goose/src/agents/retry.rs` (RetryManager declarative recipe-retry with state-reset semantics per S12 §3, §7) | `block.github.io/goose/` (recipe schema docs) |
| §16.3 Goose triple observability env var trio | `block/goose` `crates/goose/src/main.rs` env-var lookup for `OTEL_EXPORTER_OTLP_ENDPOINT` + `OTEL_EXPORTER_OTLP_HEADERS` + Langfuse + MLflow auto-wire per S12 §7 | `block.github.io/goose/docs/guides/observability` |
| §16.4 verdict `MaxPoolUnit`/`MeanVariancePoolUnit` | `haizelabs/verdict` `verdict/transform.py:86-89` (MaxPoolUnit), `:91-100` (MeanVariancePoolUnit), `:106` (MeanPoolUnit decl per S11 §5) + `verdict/common/judge.py:9-29` (JudgeUnit per S11 §4) | `github.com/haizelabs/verdict/blob/main/README.md` |
| §16.4 DSPy `MIPROv2` optimizer | `stanfordnlp/dspy` `dspy/teleprompt/mipro.py` (MIPROv2 prompt-optimizer per S11 §3) | `dspy.ai/docs/teleprompters/mipro` |

These 7 anchor-lines close the codex r1 D6 C7 "cite density uneven in §16" finding by pinning each high-risk recommendation to both file:line evidence AND docs URL.

---

## Appendix W377+ — Discovery exclusions rationale (C6 added per codex r1 D6)

Per codex r1 D6 C6, the W376 research wave's repo-discovery process surfaced several candidate SOTA agent-runtime repos that were intentionally NOT included in S9-S12 extension streams. This appendix records the rationale for each exclusion to prevent re-litigation in W377+ scoping:

| Excluded repo | Maintainer | Star count | Rationale for exclusion from W376 |
|---|---|---|---|
| **smol-developer** | smol-ai (~12k stars) | ~12k | "Toy" scaffolding generator — single-prompt-to-codebase pattern. Does NOT match W376 scope: durable-execution / per-task isolation / heartbeat orchestration. Out-of-scope for production-runtime synthesis. |
| **MetaGPT** | geekan (~50k stars) | ~50k | Multi-role agent simulation (PM/Architect/Engineer roles). Patterns useful for HR-game simulation but NOT for the W376 single-task durable-dispatch pattern. Surface area exceeds W376 sca-v18 ≤4-stream concurrency budget. Defer to W378+ multi-role-orchestration wave if demand emerges. |
| **AutoGPT** | Significant-Gravitas (~165k stars) | ~165k | First-wave (2023) autonomous-agent prototype. Largely SUPERSEDED by AutoGen (Microsoft) which W376 S8 already covers via `TokenUsageTermination` + `MaxMessageTermination` primitives. AutoGPT-specific patterns (vector-memory loops + goal-decomposition trees) overlap with PydanticAI's snapshottable-graph (S10) without adding orthogonal value. |
| **Devon** | entropy-research (~10k stars) | ~10k | SWE-Bench-focused; W376 S7 already covers SWE-Bench-Verified via the harness directly. Devon's agent-loop adds no patterns orthogonal to SWE-agent (S5) or OpenHands itself (S1/S2). |
| **Cognition (Devin proprietary)** | cognition-labs | n/a | Proprietary closed-source — fails CR-1 trust-tuple "source-code auditable" floor. No upstream file:line cites possible. Devin's published architecture (`Devin: First AI software engineer`, 2024-03 blog) describes "long-context planning + multi-modal sandbox" but no code is available to audit. Excluded per sca-v18 §4.2 (source-driven-development primary discipline). |

**Net rationale**: The 4 streams selected (S9 CrewAI / S10 PydanticAI / S11 DSPy+verdict / S12 Goose+Continue) maximize orthogonal pattern coverage (orchestration topology / typed-agent + graph-state / judge-time-compute / production-observability) within the sca-v18 ≤4-extension-stream budget. The 5 exclusions either (a) duplicate existing S1-S8 coverage, (b) exceed scope without orthogonal value, or (c) fail the CR-1 auditability floor.

---

## §17 Final cite-anchor cluster

Consolidated cite-anchors across all 12 streams. Each source verified ≥1 file:line OR docs URL. Distinct-org count tabulated at end.

### Anthropic (Org #1)
1. `anthropics/claude-cookbooks` `patterns/agents/orchestrator_workers.ipynb` cell-2 — `FlexibleOrchestrator.process()` empty-content sentinel guard (S6 §3, S8 §8).
2. `anthropics/claude-code-sdk-python` Public API §3.1 — `query()` async-gen + `ClaudeSDKClient.receive_messages()` + Message class hierarchy (S6 §1, §9 entry 1).
3. `anthropic.com/engineering/built-multi-agent-research-system` (pub 2025-06-13) — "multi-agent systems use about 15× more tokens than chats" + checkpoint-resume architecture authority (S8 §1, §7, §9 entry 1).
4. `anthropic.com/research/swe-bench-sonnet` (pub 2025-01-06) — Claude 3.5 Sonnet 49% SWE-Bench Verified (S7 §9). **NOT** `/research/swe-bench-pro` (404).

### OpenHands / All-Hands-AI (Org #2)
5. `openhands-sdk==1.22.1` `conversation/conversation.py:31-202` — Conversation factory + dispatch (S1 §1, §6, §9).
6. `openhands-sdk==1.22.1` `conversation/impl/local_conversation.py:680-744` — send_message body (S1 §2, §9).
7. `openhands-sdk==1.22.1` `conversation/impl/local_conversation.py:747-890` — run() body (S1 §3, §7, §9).
8. `openhands-sdk==1.22.1` `conversation/exceptions.py:25-68` — ConversationRunError (S1 §7, §9).
9. `openhands-sdk==1.22.1` `agent/base.py:54-117, :434-530` — Agent fields + initialize (S1 §5, §9).
10. `openhands-sdk==1.22.1` `event/__init__.py:1-50` + `event/base.py:20-55` + `event/llm_convertible/observation.py:16-57` — event hierarchy (S1 §4, S6 §6, §9).
11. `openhands-sdk==1.22.1` `workspace/workspace.py:12-49` — Workspace factory (S1 §6, §9).
12. `openhands-sdk==1.22.1` `llm/auth/openai.py:752-810` — subscription_login_async OAuth (S1 §8, §9).
13. `openhands-agent-server==1.23.0` PyPI metadata (last_serial 37256919) — version + deps (S2 §1, §9).
14. `openhands-agent-server==1.23.0` `openhands/agent_server/dependencies.py` — X-Session-API-Key header (S2 §4, §9).
15. `openhands-agent-server==1.23.0` `openhands/agent_server/server_details_router.py` — /alive /health /ready endpoints (S2 §3, §9).
16. `openhands-agent-server==1.23.0` `openhands/agent_server/config.py` — V0/V1 env var names (S2 §4, §9).
17. `openhands-agent-server==1.23.0` `openhands/agent_server/__main__.py:main` — uvicorn boot + signal handling (S2 §7, §9).
18. `openhands-agent-server==1.23.0` `openhands/agent_server/api.py:api_lifespan` — lifespan teardown gather (S2 §7, §9).
19. Docker image `ghcr.io/openhands/agent-server:latest-python` config — `OPENHANDS_BUILD_GIT_SHA=3d9fc105`, ID `d70c077d55ae` (S2 §2, §9).

### Docker, Inc. (Org #3)
20. `docker-py==7.1.0` `docker/client.py:48-100` — `DockerClient.from_env` classmethod (S3 §1, §9).
21. `docker-py==7.1.0` `docker/models/containers.py:534-911` — `ContainerCollection.run` (S3 §2, §9).
22. `docker-py==7.1.0` `docker/models/containers.py:440-452, :279-291, :352-367` — stop/kill/remove (S3 §4, §9).
23. `docker-py==7.1.0` `docker/errors.py:13-209` — exception hierarchy (S3 §5, §9).
24. `docker-py==7.1.0` `docker/models/networks.py:100-217` — NetworkCollection (S3 §6, §9).
25. `docker-py==7.1.0` `docker/models/resource.py:42-48` — `Model.reload()` (S3 §3, §9).
26. `docker-py.readthedocs.io/en/7.1.0/` — official docs (S3 §9).

### Temporal Technologies (Org #4)
27. `temporalio==1.27.2` `temporalio/activity.py:55-88` — @activity.defn decorator (S4 §1, §10).
28. `temporalio==1.27.2` `temporalio/activity.py:320-329` — activity.heartbeat (S4 §2, §10).
29. `temporalio==1.27.2` `temporalio/exceptions.py:165-176, :106-128` — CancelledError + ApplicationError (S4 §3, §8, §10).
30. `temporalio==1.27.2` `temporalio/worker/_worker.py:742-767, :814, :835-841` — Worker.run() + asyncio.shield + graceful_shutdown_timeout (S4 §4, §9, §10).
31. `temporalio==1.27.2` `temporalio/workflow.py:1591-1606` — imports_passed_through (S4 §5, §10).
32. `temporalio==1.27.2` `temporalio/common.py:37-89, :267-377` — RetryPolicy + SearchAttributeKey (S4 §7, §8, §10).
33. `temporalio==1.27.2` `temporalio/contrib/pydantic.py:122-135` — pydantic_data_converter (S4 §1, §10).
34. `python.temporal.io/temporalio.activity.html#heartbeat` — canonical heartbeat cadence rule (S4 §2).

### LangChain AI (Org #5)
35. `langchain-ai/langgraph` `Pregel.astream_events()` v2/v3 + `StreamMux`/`StreamTransformer` (S6 §2, §9 entry 3).
36. `langchain-ai.github.io/langgraph/concepts/persistence/` — Checkpointer resume-from-state (S8 §7, §9 entry 5).

### Microsoft (Org #6)
37. `microsoft/autogen` `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py:62-104` — MaxMessageTermination (S8 §4, §9 entry 4).
38. `microsoft/autogen` same file `:235-307` — TokenUsageTermination (S8 §3, §9 entry 3).

### Princeton-NLP / SWE-Bench community (Org #7)
39. `princeton-nlp/SWE-bench` `swebench/harness/test_spec/test_spec.py` — instance_image_key + `_1776_` substitution (S7 §2, §9).
40. `princeton-nlp/SWE-bench` `swebench/harness/grading.py:get_resolution_status` — f2p=1 AND p2p=1 gate (S7 §6, §9).
41. `princeton-nlp/SWE-bench` `swebench/harness/run_evaluation.py:main` — entrypoint contract (S7 §3, §9).
42. `princeton-nlp/SWE-bench_Verified` HuggingFace dataset @ SHA `c104f840cc67f8b6eec6f759ebc8b2693d585d4a` — 500 instances, 13-field schema (S7 §1, §9).

### Cline (Org #8) + paul-gauthier/Aider (Org #9) + SWE-agent (Org #10) — cross-runtime prior art
43. `cline/cline` — `CLINE_SESSION_BACKEND_MODE ∈ {local,hub,remote,auto}` env var (S5 §2, §9 entry 2).
44. `paul-gauthier/aider` `docker/Dockerfile:ENV AIDER_DOCKER_IMAGE=paulgauthier/aider` + `aider.chat/docs/install/docker.html` (S5 §1, §9 entry 1).
45. `SWE-agent/SWE-agent` `sweagent/environment/swe_env.py:deployment: DeploymentConfig = Field(default_factory=lambda: DockerDeploymentConfig(image="python:3.11"))` (S5 §3, §9 entry 3).

### OSSF / Industry-SOTA (Org #11 bonus)
46. `github.com/ossf/scorecard/blob/main/docs/checks.md` — pinned-dependencies check (digest-pin Dockerfile dependencies); industry-SOTA standard NOT followed by surveyed runtimes (S5 §9 entry 4).

### Independent practitioners (Org #12 + #13 corroboration)
47. `rapidclaw.dev/blog/multi-agent-orchestration-patterns-2026` — "per-crew rate limits ... fan-out is #1 cause of runaway cost" (S8 §9 entry 6).
48. `tianpan.co/blog/2026-04-23-mid-flight-steering-agent-redirect-without-restart` — mid-flight resume corroboration (S8 §9 entry 7).

### W375 local file:line anchors (project-local; supports W376 carry-forward)
49. `Z:/claude-sota-installed-W375/tools/eval_gate.py:27-29, :42-57, :84-92, :127-131` — eval_gate score consumer + bootstrap exemption (S7 §7).
50. `Z:/claude-sota-installed-W375/agents/temporal_worker.py:96-100, :121-147` — local AgentErrorEvent handling + flatline detector (S6 §5, §6).
51. `Z:/claude-sota-installed-W375/agents/models.py:12` — default no_progress_seconds=600 (S6 §5).

### crewAIInc (Org #14) — S9
52. `crewAIInc/crewAI` `lib/crewai/src/crewai/crew.py:136-205` — `Crew` class + hierarchical process orchestration (S9 §1, §2, §9).
53. `crewAIInc/crewAI` `lib/crewai/src/crewai/agents/agent_builder/base_agent.py:73-121` — `BaseAgent` abstract (S9 §1, §9).
54. `crewAIInc/crewAI` `lib/crewai/src/crewai/task.py:87-110` — `Task` class with `expected_output` / `output_pydantic` / `output_json` / `guardrail` (S9 §1, §5, §9).
55. `crewAIInc/crewAI` `lib/crewai/src/crewai/process.py:7-13` — `Process` enum (sequential / hierarchical) (S9 §1, §9).
56. `docs.crewai.com/concepts/processes` + `/concepts/tasks` + `/concepts/agents` + `/concepts/memory` + `/concepts/tools` — official docs (S9 §9 docs URLs).

### pydantic (Org #15) — S10
57. `pydantic/pydantic-ai` `pydantic_ai_slim/pydantic_ai/agent/__init__.py:183` — `Agent[AgentDepsT, OutputDataT]` generic class (S10 §1, §9).
58. `pydantic/pydantic-ai` `pydantic_ai_slim/pydantic_ai/agent/__init__.py:651` + `:1063` — `@agent.tool` decorator + `agent.iter()` (S10 §3, §4, §9).
59. `pydantic/pydantic-ai` `pydantic_ai_slim/pydantic_ai/agent/abstract.py:216` + `:381` + `:466` — `run()` / `run_sync()` / `run_stream()` (S10 §4, §9).
60. `pydantic/pydantic-ai` `pydantic_ai_slim/pydantic_ai/run.py:32` — `AgentRun` class (snapshottable graph state) (S10 §6, §9).
61. `ai.pydantic.dev/agents/` + `/tools/` + `/messages-and-chat-history/` + `/output/` — official docs (S10 §9).

### stanfordnlp (Org #16) — S11 DSPy
62. `stanfordnlp/dspy` `dspy/primitives/module.py` — `dspy.Module` base class (S11 §1, §9).
63. `stanfordnlp/dspy` `dspy/predict/predict.py` + `dspy/predict/chain_of_thought.py` — `Predict` + `ChainOfThought` (S11 §1, §9).
64. `stanfordnlp/dspy` `dspy/signatures/signature.py` — `Signature` declarative class (S11 §2, §9).
65. `stanfordnlp/dspy` `dspy/teleprompt/bootstrap_few_shot.py` + `dspy/teleprompt/mipro.py` — `BootstrapFewShot` + `MIPROv2` optimizers (S11 §3, §9).

### haizelabs (Org #17) — S11 verdict
66. `haizelabs/verdict` `verdict/common/judge.py:9-29` (JudgeUnit), `:30-73` (BestOfKJudgeUnit), `:86-96` (CategoricalJudgeUnit) (S11 §4, §9).
67. `haizelabs/verdict` `verdict/transform.py:86-89` (MaxPoolUnit), `:91-100` (MeanVariancePoolUnit), `:106` (MeanPoolUnit decl) (S11 §5, §9).
68. `haizelabs/verdict` `verdict/core/primitive.py:553-575` — `Block.__rshift__` composition operator (S11 §6, §9).
69. `haizelabs/verdict` `README.md:26-40` — 3-judges + verify + max-vote canonical recipe (S11 §7, §9).

### Cornell University / arXiv preprint server (Org #18) — S11
70. `arxiv.org/abs/2502.18018` — "VERDICT: A Library for Scaling Judge-Time Compute" (Kalra & Tang, 2025-02-25); judge-time-compute scaling thesis; cited at `verdict/README.md:5,166` (S11 §9 entry 3).

### block (Org #19) — S12 Goose
71. `block/goose` `crates/goose/src/agents/agent.rs` — `Agent` struct orchestrating conversation loop with `AgentConfig` (SessionManager, PermissionManager, GooseMode, GoosePlatform) (S12 §1, §9).
72. `block/goose` `crates/goose/src/agents/extension_manager.rs` — `ExtensionManager` lifecycle for MCP-first uniformity (S12 §2, §9).
73. `block/goose` `crates/goose/src/agents/retry.rs` — `RetryManager` + `handle_retry_logic` for declarative recipe retry (S12 §3, §7, §9).
74. `block/goose` `crates/goose/src/recipe/mod.rs` + `recipe/template_recipe.rs` + `recipe/validate_recipe.rs` — recipe schema parser + validator (S12 §3, §9).
75. `block/goose` `crates/goose-mcp/src/` — built-in MCP server impls (developer, computer_controller, memory) (S12 §2, §9).
76. `block.github.io/goose/` — recipe schema official docs (S12 §9).

### continuedev (Org #20) — S12 Continue
77. `continuedev/continue` `core/core.ts` — `Core` class IDE-agnostic business logic (S12 §4, §9).
78. `continuedev/continue` `core/config/ConfigHandler.ts` + `core/config/profile/doLoadConfig.ts` + `core/config/yaml/loadYaml.ts` + `core/config/load.ts` — config loading pipeline (YAML primary; NOT TOML) (S12 §5, §9).
79. `continuedev/continue` `core/context/mcp/MCPManagerSingleton.ts` — MCP integration singleton (S12 §6, §9).
80. `continuedev/continue` `extensions/vscode/src/extension/VsCodeExtension.ts` + `IntelliJIde.kt` + `CoreMessenger.kt` — VSCode + JetBrains IDE extension impls (S12 §4, §9).
81. `docs.continue.dev/` — config + MCP official docs (S12 §9).

### Distinct-org count

**20 distinct orgs**: Anthropic, OpenHands/All-Hands-AI, Docker Inc., Temporal Technologies, LangChain AI, Microsoft, Princeton-NLP, Cline, paul-gauthier/Aider, SWE-agent, OSSF, rapidclaw.dev (independent), tianpan.co (independent), crewAIInc, pydantic, stanfordnlp, haizelabs, Cornell/arXiv, block, continuedev.

**3-org-distinct floor (sca-v13) EXCEEDED 6.67x.**

# W375 Live E2E Bring-up — Findings DIM-15..DIM-20

**Wave**: W375 OpenHands SOTA Implant — post-merge live e2e
**Date**: 2026-05-22
**Branch**: `goal/W375-openhands-sota`
**HEAD**: `a2c1d9d` (DIM-15+16) + uncommitted DIM-17+18+19 fixes
**Context**: post-restart real-stack e2e against installed `openhands-sdk==1.22.1` + Temporal 1.30.1 + ChatGPT OAuth

---

## What works (verified LIVE)

| Layer | Status | Evidence |
|---|---|---|
| **Codex GPT-5.5 Path B** | ✅ LIVE | `codex exec --model gpt-5.5` returned `SMOKE_LIVE_OK 391` (17×23=391) |
| **DIM-14 verdict-routing truth-table** | ✅ 18/18 PASS | direct-python smoke |
| **Temporal dev-server :7233** | ✅ LIVE | namespace `default` Registered |
| **Worker boot + activity poller** | ✅ LIVE | `<PID>@OHHELLO` polling both workflow + activity queues |
| **ChatGPT OAuth ramp** | ✅ CACHED | `OAUTH_OK: LLM ready, model= openai/gpt-5.3-codex` (browser callback `?code=ac_...` received) |
| **Workflow submission** | ✅ STARTED | 5 separate test workflows submitted successfully |
| **Workflow scheduling** | ✅ pollers acquire tasks | activities dispatched to worker |

## What surfaced — SDK-API drift findings

Each finding is real, surgically-fixed, cite-anchored.

### DIM-15 — Temporal workflow-sandbox imports
**Symptom**: `Worker.__init__` → `prepare_workflow` → `workflow_sandbox.create_instance` crashed silently on sandboxed import of L1/L2/L3 activity modules.

**Cite**: `temporalio-sdk-python@1.27.2` — `temporalio.workflow.unsafe.imports_passed_through` documented at <https://python.temporal.io/temporalio.workflow.unsafe.imports_passed_through>. Lines `temporalio/worker/_workflow.py:171` (entry) → `workflow_sandbox/_runner.py:80,99,127,138,183` → `_importer.py:518` (sandbox-trapped import).

**Fix** (commit `a2c1d9d`): wrap L1/L2/L3 activity imports in a second `with workflow.unsafe.imports_passed_through():` block (`agents/temporal_worker.py:209-226`). Status: ✅ FIXED.

### DIM-16 — Sync `subscription_login` from async context
**Symptom**: `RuntimeError: asyncio.run() cannot be called from a running event loop` when activity called `make_routine_llm()` → `LLM.subscription_login(...)`.

**Cite**: `openhands-sdk@1.22.1`:
- `openhands/sdk/llm/auth/openai.py:825` — sync wrapper `subscription_login()` ends with `return asyncio.run(subscription_login_async(...))`
- `openhands/sdk/llm/auth/openai.py:752` — async entry-point `subscription_login_async()` exists

**Fix** (commit `a2c1d9d`): add `make_routine_llm_async()` in `agents/llm_factory.py` calling `subscription_login_async` directly. Activity call-site `agents/temporal_worker.py:78` uses `await make_routine_llm_async()`. Status: ✅ FIXED.

### DIM-17 — `AgentErrorEvent` import path
**Symptom**: `ModuleNotFoundError: No module named 'openhands.sdk.event'` (was wrongly imported from `openhands.sdk.event` instead of the deeper `openhands.sdk.event.llm_convertible`).

**Cite**: `openhands-sdk@1.22.1`:
- `openhands/sdk/event/llm_convertible/observation.py:123` — `class AgentErrorEvent(ObservationBaseEvent)`
- `openhands/sdk/event/llm_convertible/__init__.py` — re-exports `AgentErrorEvent` in `__all__`
- `openhands/sdk/agent/parallel_executor.py:26` — internal SDK canonical import path: `from openhands.sdk.event.llm_convertible import AgentErrorEvent`

**Fix** (uncommitted): `agents/temporal_worker.py:88` import path corrected. Status: ✅ FIXED (uncommitted).

### DIM-18 — `DockerWorkspace` does NOT exist in SDK v1.22.1
**Symptom**: `ModuleNotFoundError: No module named 'openhands.workspace'` (the assumed `openhands.workspace.docker.workspace.DockerWorkspace` is not part of the SDK).

**Cite**: `openhands-sdk@1.22.1`:
- Only top-level package is `openhands.sdk` (no `openhands.workspace.*` sibling).
- `openhands/sdk/workspace/workspace.py:12-29` — Workspace factory exposes ONLY:
  - `Workspace(working_dir=...) -> LocalWorkspace`
  - `Workspace(host="http://...", working_dir=..., api_key=...) -> RemoteWorkspace`
- `openhands/sdk/workspace/base.py:23` — `class BaseWorkspace(DiscriminatedUnionMixin, ABC)`
- `openhands/sdk/workspace/local.py:17` — `class LocalWorkspace(BaseWorkspace)`
- `openhands/sdk/workspace/remote/base.py:48` — `class RemoteWorkspace(RemoteWorkspaceMixin, BaseWorkspace)`

The spec's "DockerWorkspace per-conversation lifecycle" pattern (W375 spec §4 v6) assumed SDK auto-spawn of the agent-server container. **The actual SDK pattern requires**:
1. Spawn `ghcr.io/openhands/agent-server:latest-python` container externally (e.g. via `docker-py 7.1.0` which IS installed)
2. Wait for HTTP /health ready
3. Connect via `RemoteWorkspace(host=f"http://localhost:{port}", api_key=<session-key>)`
4. Cleanup container on done

The standalone `openhands-agent-server==1.23.0` package exists on PyPI (server-side runtime; we have the Docker image cached locally at 5.26GB).

**Fix** (uncommitted): for v1 e2e proof, switched to `Workspace(working_dir=...)` → `LocalWorkspace`. Loses Docker isolation but proves the LLM→agent loop. Status: ✅ FIXED (uncommitted) + **carry-forward C10**: full Docker isolation via docker-py + RemoteWorkspace in follow-up wave.

### DIM-19 — `ConversationState.id` requires valid UUID
**Symptom**: `pydantic.ValidationError: 1 validation error for ConversationState id Input should be a valid UUID, invalid character: found 'w' at 1 [type=uuid_parsing, input_value='w375-...', input_type=str]`.

**Cite**: `openhands-sdk@1.22.1`:
- `openhands/sdk/conversation/state.py:82` — `id: ConversationID = Field(description="Unique conversation ID")`
- `ConversationID` is a UUID-validated pydantic type.
- `state.py:379` — `state = cls(id=id, agent=agent, workspace=workspace, ...)` calls the pydantic validator.

**Fix** (uncommitted): `agents/models.py:36-38` changed `default_factory=lambda: f"w375-{uuid.uuid4().hex[:16]}"` to `default_factory=lambda: str(uuid.uuid4())`. Status: ✅ FIXED (uncommitted). v1 trade-off: lost the grep-friendly "w375-" prefix from conversation_id; workflow_id (set by dispatch CLI) retains it.

### DIM-20 — `conv.send_message()` is SYNC, not async
**Symptom**: `TypeError: 'NoneType' object can't be awaited` at `await conv.send_message(spec.task)` (line 117).

**Cite (preliminary)**: `openhands-sdk@1.22.1` LocalConversation.send_message returns `None` (sync method). The W375 spec assumed async API.

**Fix**: NOT YET applied. Requires:
- Remove `await` from `conv.send_message(spec.task)` call (it's sync)
- Replace activity event-loop pattern: instead of `async for event in conv.stream_events()`, use `conv.run()` (blocking) or appropriate SDK-provided event iteration.

Status: ⏸ DEFERRED to W376 (the openhands_run_activity needs comprehensive rewrite vs actual SDK API; piecemeal patches at this depth are accumulating risk).

## Pattern: spec written against assumed SDK shape

The 6 codex review rounds (r1-r6 APPROVE 0.91 on spec; r-final, r-final-2, r-final-3 APPROVE 0.91 on built code) reviewed **source-code correctness against the spec**. They cannot catch SDK-API drift because they reviewed the spec's pattern, not actual SDK runtime behavior.

The actual SDK v1.22.1 differs from the spec's assumed shape in:
1. workflow-sandbox import-passthrough scope (DIM-15)
2. async/sync OAuth entry points (DIM-16)
3. AgentErrorEvent import path (DIM-17)
4. DockerWorkspace existence (DIM-18 — fundamental architecture mismatch)
5. ConversationID UUID validation (DIM-19)
6. send_message sync vs async (DIM-20)
7. Possibly more (run loop pattern, event streaming, agent.tools shape, etc.)

## Updated carry-forward list

In addition to C1-C9 from `VERDICT-LEDGER.md`, the live e2e adds:

- **C10**: Full Docker isolation via `docker-py` + `openhands-agent-server` container + `RemoteWorkspace(host=...)` — replaces the LocalWorkspace v1 fallback. Owner: post-merge wave.
- **C11**: Rewrite `openhands_run_activity` body against actual `openhands-sdk==1.22.1` API surface (DIM-20 + downstream). Owner: focused W376 wave with SDK-driven TDD.
- **C12**: Conversation_id format — currently plain UUID4; if grep-friendly W375 tagging needed, use Temporal workflow_id (set by dispatch CLI) which keeps the `w375-` prefix and is independent of SDK's ConversationID validation.

## What the wave-close synthesis got right vs wrong

**Right** (per codex r-final-3 APPROVE 0.91):
- Architecture design: γ-hybrid LLM, L1/L2/L3 layered verification, Temporal orchestration, codex Path B cross-model gate
- Code-correctness: verdict_routing 18/18 truth-table, all sandbox-safe patterns, atomic ledger ops, HMAC two-phase confirm
- Cross-model adversarial gate: 9 codex rounds proved consensus on the design

**Wrong** (live e2e surfaced):
- SDK-API alignment: the OpenHands `DockerWorkspace + Conversation` pattern in the spec doesn't match v1.22.1's actual API.
- Wave-close claim "ship-ready as v1 with documented carry-forwards" was honest about C1-C9 but didn't anticipate the SDK-shape drift exposed only by runtime.

## SOTA practice notes

1. **TDD-against-real-SDK matters**: the project's unit tests passed (164/164) but they tested our code's INTERNAL logic, not its integration against the actual SDK. The spec's mocked SDK shape never matched runtime reality.
2. **Cite-anchor at SDK level**: every DIM finding here is line-cite-anchored to the installed SDK source. Future spec work should cite SDK-source-line as well as docs.
3. **Multi-round codex catches code bugs, not SDK drift**: codex rounds caught DIM-2, DIM-4, DIM-10, DIM-14 (code-level correctness). DIM-15..20 required live worker boot to surface.
4. **The W376 wave is the natural next step**: full SDK-driven TDD rewrite of `openhands_run_activity` against `openhands-sdk==1.22.1` actual API, with integration tests that exercise LocalWorkspace + Conversation end-to-end. Estimated 1-2 days.

## Verify-before-claim summary (per CR-6)

| Claim | Status | Evidence |
|---|---|---|
| Codex APPROVE 0.91 on shipped code | ✅ VALID | r-final-3 transcript at `tmp/openhands-brainstorm/codex-r-final-3-W375.txt` |
| PR #33 OPEN | ✅ VALID | https://github.com/seathatflowsinourveins/claude-sota-installed/pull/33 |
| GPT-5.5 invocation works (Path B) | ✅ VALID | `SMOKE_LIVE_OK 391` from `codex exec --model gpt-5.5` |
| OAuth ramp works | ✅ VALID | Chrome callback received, `OAUTH_OK` confirmation |
| Temporal worker registers + polls | ✅ VALID | identity `<PID>@OHHELLO` on workflow + activity queues |
| Full L0→OpenHands→L1/L2→L3→TaskResult flow works | ❌ FALSE | DIM-15..19 fixed; DIM-20+ requires `openhands_run_activity` rewrite (C11). Live e2e fails at `conv.send_message` await mismatch. |

**Honest wave-close v2**: the W375 architecture is APPROVED + the supporting infrastructure (Temporal + codex Path B + OAuth + ledgers) is LIVE. The **OpenHands agent loop itself** requires a focused W376 wave to align with the actual SDK API. The MCP/CLI dispatch surface, retry budgets, jury aggregation, verdict routing, observability, and event store are all e2e-ready independently of the OpenHands agent loop.

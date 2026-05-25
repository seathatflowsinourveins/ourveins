# W376 — OpenHands SDK Alignment + Both-Mode Workspace — Design Spec

**Wave**: W376
**Lineage**: continues W375 OpenHands SOTA Implant (PR #33 OPEN, codex r-final-3 APPROVE 0.91)
**Date**: 2026-05-22
**Status**: Design **v3 — codex r1 6-dim aggregate findings APPLIED** (23 P0 + 26 P1 cataloged at `docs/architecture/W376-RESEARCH/CODEX-R1-AGGREGATE-FINDINGS.md`; revised in preparation for codex r2 re-fire)

**Revision history**:
- v1 (2026-05-22 7c14c1b): initial design from PHASE A research-only context
- v2 (2026-05-22 c3f4a2d): adjusted for 12-stream SYNTHESIS.md
- **v3 (2026-05-22 this file)**: codex r1 6-dim aggregate fixes — 4 BLOCK + 2 NEEDS-REVISION across D1/D2/D3/D4/D5/D6 → unified spec rewrite

---

## 1. Goal

Rewrite `agents/openhands_run_activity` against the **actual** `openhands-sdk==1.22.1` API surface (per SYNTHESIS §4 cite-anchored to verbatim source audit), with a `TaskSpec.workspace_mode` feature flag selecting `LocalWorkspace` (in-process, fast, trusted-only) or `RemoteWorkspace` + `docker-py 7.1.0`-spawned `ghcr.io/openhands/agent-server:latest-python` container (full Docker isolation per W375 original security goal — DEFAULT).

Closes W375 carry-forwards C10 (Docker isolation), C11 (conversation lifecycle alignment), C12 (conversation_id correlation) — see `docs/architecture/W375-WAVE-CLOSE/LIVE-E2E-FINDINGS.md` for the DIM-15..20 trail.

**Constructive security posture**: Per codex r1 D2 BLOCK (S1+S2+S3+S5), the wave ENHANCES quality by treating `workspace_mode='remote'` default + env-pre-spawn + egress allowlist + container hardening (`read_only=True`, `pids_limit`, `cap_drop=["ALL"]`, `security_opt=["no-new-privileges:true"]`) as **required-for-production-shippability** features, not throttling blockers.

## 2. Architecture (PHASE A → E)

```
PHASE A: Deep SOTA research (12 parallel streams, Agent FQN dispatch)
  S1-S8: openhands-sdk / agent-server / docker-py / temporal / cross-runtime /
         event-stream / SWE-Bench / multi-agent orchestration
  S9-S12 (ext): CrewAI / PydanticAI / DSPy+verdict / Goose+Continue

PHASE B: Synthesis + Codex GPT-5.5 multi-dim convergence
  - Synthesizer subagent merges 12 streams → SYNTHESIS.md (1163 LOC, 20-org cite cluster)
  - codex r1 6-dim parallel adversarial review → 4 BLOCK + 2 NEEDS-REVISION + 23 P0
  - SYNTHESIS-v2, spec-v3, plan-v2 rewrites against r1 findings
  - codex r2-r6 until all 6 dims APPROVE 0.85+

PHASE C: Plan revision (writing-plans skill, post-r2-APPROVE)
  - 25 task TDD plan, each step with code + cite-anchor + expected output

PHASE D: Implementation via subagent-driven-development
  - Implementer subagent per task, fresh context, full code in dispatch prompt
  - spec-reviewer + code-quality-reviewer two-stage review per task

PHASE E: Live e2e validation + ship
  - LocalWorkspace e2e green (trusted-task path)
  - RemoteWorkspace e2e green + container-hardening + egress-allowlist + zero-orphan
  - Codex r-final APPROVE 0.85+
  - PR amend #33 OR new PR
```

## 3. Cite-anchor cluster (≥3-org-distinct per sca-v18 floor — 20-org actual)

Per SYNTHESIS §17 — cite-cluster across all 12 streams pins 20 distinct orgs (sca-v13 3-org-distinct floor exceeded 6.67×): Anthropic / OpenHands-All-Hands-AI / Docker Inc. / Temporal Technologies / LangChain AI / Microsoft / Princeton-NLP / Cline / paul-gauthier/Aider / SWE-agent / OSSF / rapidclaw.dev / tianpan.co / crewAIInc / pydantic / stanfordnlp / haizelabs / Cornell/arXiv / block / continuedev.

| Org | Source | Wave-A stream |
|---|---|---|
| **All-Hands-AI** | `openhands-sdk==1.22.1` + `openhands-agent-server==1.23.0` (PyPI + ghcr.io) | S1, S2 |
| **Docker Inc** | `docker-py 7.1.0` SDK + container best practices | S3 |
| **Temporal Inc** | `temporalio==1.27.2` Python SDK | S4 |
| **paul-gauthier** | `Aider` workspace mode prior art | S5 |
| **cline-bot** | `Cline` workspace isolation pattern | S5 |
| **princeton-nlp** | `SWE-Agent` + `SWE-Bench-Verified` | S5, S7 |
| **Anthropic PBC** | `claude-code-sdk` + `claude-cookbooks/patterns/agents/` | S6, S8 |
| **LangChain AI** | `LangGraph` agent runtime + checkpointer | S6 |
| **Microsoft** | `AutoGen` `TokenUsageTermination` + `MaxMessageTermination` | S8 |
| **crewAIInc** | `Crew` + `Task.output_pydantic` structured-output mandate | S9 |
| **pydantic** | `pydantic-ai` `Agent[AgentDepsT, OutputDataT]` + graph-state-machine | S10 |
| **stanfordnlp** | `dspy` `Module/Signature/Predict/ChainOfThought` + `MIPROv2` optimizer | S11 |
| **haizelabs** | `verdict` `JudgeUnit` + `MeanVariancePoolUnit` + verify-step layer | S11 |
| **Cornell/arXiv** | `arxiv.org/abs/2502.18018` VERDICT judge-time-compute scaling | S11 |
| **block** | `goose` recipe YAML + RetryManager + triple observability | S12 |
| **continuedev** | `continue` Core + ConfigHandler + MCPManagerSingleton | S12 |

## 4. Components

### 4.1 `agents/models.py` (modified — codex r1 R2 schema_version + alias)

Add `TaskSpec.workspace_mode: Literal['local','remote']` field with default `'remote'` (matches W375 original intent + codex r1 D2 S1 security default). Per codex r1 R2: add `schema_version` + backward-compat validators/aliases on TaskSpec/TaskResult to enable durable-execution forward-compat.

```python
from typing import Literal
from pydantic import BaseModel, Field, model_validator

class TaskSpec(BaseModel):
    """W376 schema_version=2 — adds workspace_mode + corrects conversation_id field semantics.

    codex r2 D3-r2-P0-3 FIXED: explicit `repo`, `base_commit`, and `idempotency_key` fields
    so admission/idempotency op_id derivation is deterministic and excludes `conversation_id`
    (a conv_id-based op_id would defeat dedup across re-submits of the same logical work).
    """
    schema_version: Literal[1, 2] = Field(default=2, description="W376 introduces v2 with workspace_mode field.")
    conversation_id: str = Field(..., description="Caller-supplied UUIDv4; activity MUST use this for correlation (codex r1 A6 fix). NOT used in idempotency key.")
    task: str
    budget: 'Budget'
    workspace_mode: Literal['local', 'remote'] = Field(
        default='remote',
        description=(
            "W376 Workspace dispatch mode. 'remote' = docker-py-spawned agent-server "
            "container + RemoteWorkspace (full Docker isolation, ~3-5s spawn). "
            "DEFAULT 'remote' per codex r1 D2 S1 security finding. "
            "'local' = LocalWorkspace in-process (fast, no isolation; "
            "EXPLICITLY-OPT-IN for trusted tasks ONLY)."
        ),
    )
    # codex r2 D3-r2-P0-3 FIXED: explicit stable fields for op_id derivation.
    repo: str | None = Field(default=None, description="Git repo identity for idempotency (e.g. 'example/repo').")
    base_commit: str | None = Field(default=None, description="Git base commit SHA for idempotency; required when repo set.")
    idempotency_key: str | None = Field(
        default=None,
        description=(
            "Caller-supplied stable key (op_id). If None, op_id derived as "
            "sha256(task + repo + base_commit + workspace_mode). "
            "codex r2 D3-r2-P0-3: NEVER includes conversation_id (would defeat dedup)."
        ),
    )

    @model_validator(mode='before')
    @classmethod
    def _backward_compat_v1_to_v2(cls, data: dict) -> dict:
        """W376 R2: v1 specs without workspace_mode default to 'remote' (security-default)."""
        if isinstance(data, dict) and 'schema_version' not in data:
            data['schema_version'] = 1
        if isinstance(data, dict) and 'workspace_mode' not in data:
            data['workspace_mode'] = 'remote'
        return data
```

### 4.2 `agents/workspace_factory.py` (NEW — codex r1 A5 ValueError + A6 spec.conversation_id correlation)

Pure dispatcher returning configured BaseWorkspace based on `spec.workspace_mode`. Per codex r1 A5: replace production-unsafe `assert` with `raise ValueError`. Per codex r1 A6: use `spec.conversation_id` for correlation (NOT freshly-minted `str(uuid4())`).

```python
async def build_workspace_for(spec: TaskSpec, container_ctx: ContainerContext | None) -> BaseWorkspace:
    """Returns LocalWorkspace or RemoteWorkspace per spec.workspace_mode.
    For 'remote', container_ctx must contain host + port + session_api_key from agent_server_spawn.

    Codex r1 A5: raise ValueError (NOT assert; production code MUST NOT depend on assertions
    that can be optimized away by python -O).
    Codex r1 A6: spec.conversation_id used for working_dir correlation, NOT str(uuid4()).
    """
    from openhands.sdk import Workspace
    if spec.workspace_mode == 'local':
        return Workspace(working_dir=f"workspace/{spec.conversation_id}")
    if container_ctx is None:
        raise ValueError(
            "W376 A5 fix: remote workspace_mode requires container_ctx from "
            "agent_server_spawn. Got None. Caller MUST spawn before invoking factory."
        )
    return Workspace(
        host=f"http://127.0.0.1:{container_ctx.port}",  # codex r1 S5: 127.0.0.1 bind only
        working_dir=f"workspace/{spec.conversation_id}",
        api_key=container_ctx.session_api_key,
    )
```

### 4.3 Conversation lifecycle — callbacks + blocking conv.run() in to_thread + separate watchdog Task (codex r1 A1+R3+R4 BLOCKER FIX)

**P0 BLOCK FIX per codex r1 D1 A1 + D3 R3 + D3 R4**: Spec v1 used `conv.stream_events()` which does NOT exist on `BaseConversation` or `LocalConversation` per SYNTHESIS §4.3 verbatim source audit. The canonical pattern is `Conversation(..., callbacks=[_emit_event])` + sync `conv.send_message(spec.task)` + BLOCKING `conv.run()` invoked via `asyncio.to_thread(conv.run)` so the activity event loop is not starved, with a SEPARATE asyncio.Task watchdog heartbeating at ≤heartbeat_timeout/3 cadence while `conv.run()` runs.

**Removed**: ALL references to `stream_events()` excised — they are HALLUCINATED per S1 §3 + codex r1 D1 A1.

**Canonical activity body shape** (full code in plan Task 11):

```python
@activity.defn
async def openhands_run_activity(spec: TaskSpec) -> dict:
    """W376 v3: callbacks-driven event funnel + blocking conv.run() in to_thread
    + separate watchdog Task heartbeating at heartbeat_timeout/3.

    Codex r1 A1 (BLOCK FIX): no stream_events() — that method does not exist.
    Codex r1 A4 + R3: watchdog cadence ≤heartbeat_timeout/3 NOT no_progress_seconds/3.
    Codex r1 A6: spec.conversation_id used for correlation (NOT str(uuid4())).
    """
    import asyncio, contextlib, time
    from temporalio import activity
    from temporalio.exceptions import CancelledError, ApplicationError
    from openhands.sdk import Agent, Conversation
    from openhands.sdk.event.llm_convertible import AgentErrorEvent

    info = activity.info()
    heartbeat_timeout_s = info.heartbeat_timeout.total_seconds() if info.heartbeat_timeout else 30.0
    watchdog_period_s = max(1.0, heartbeat_timeout_s / 3.0)  # codex r1 A4 + R3 fix

    last_advance_time = time.monotonic()
    events_processed = 0

    def _emit_event(event):
        """Callback fires per emitted event — synchronous, NO await allowed."""
        nonlocal last_advance_time, events_processed
        last_advance_time = time.monotonic()
        events_processed += 1
        atomic_append_event(spec.conversation_id, type(event).__name__, {...})  # codex r1 A6
        if isinstance(event, AgentErrorEvent):
            atomic_append_event(spec.conversation_id, "task.error.v1", {...})

    async def watchdog():
        """Codex r1 A4 + R3 fix: heartbeat ≤heartbeat_timeout/3, flatline guard separate."""
        while True:
            await asyncio.sleep(watchdog_period_s)
            activity.heartbeat({"events_processed": events_processed, "watchdog_tick": True})
            if time.monotonic() - last_advance_time > spec.budget.no_progress_seconds:
                raise RuntimeError(f"flatline: no event in {spec.budget.no_progress_seconds}s")
            if activity.is_cancelled():
                raise CancelledError("operator/timeout cancel")

    # ... build llm, workspace, conv as in plan Task 11 ...

    # codex r7 D1-r7-P0-2 fix: canonical sketch synced to plan Task 11 — use cooperative-cancel
    # handshake helper instead of direct wrapper-cancel. Cancelling the asyncio.to_thread wrapper
    # does NOT stop the underlying thread; conv.run only cooperatively observes conv.pause()
    # between iterations (S1 §3 + codex r6/r7 D1 findings).
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
    try:
        done, pending = await asyncio.wait(
            {run_task, watchdog_task}, return_when=asyncio.FIRST_COMPLETED
        )
        for t in pending:
            if t is run_task:
                # codex r7 D1-r7-P0-2: cooperative-cancel handshake — pause → bounded wait →
                # escalate on TimeoutError. Direct wrapper-cancel here would race cleanup
                # against the live conv.run() thread.
                await _pause_and_wait_run_task(conv, run_task, heartbeat_timeout_s)
            else:
                t.cancel()
                with contextlib.suppress(asyncio.CancelledError):
                    await asyncio.wait_for(t, timeout=heartbeat_timeout_s)
        # Re-raise from done set if any errored
        for t in done:
            t.result()
    except asyncio.CancelledError:
        # codex r7 D1-r7-P0-1: also handshake on outer cancel before cleanup ladder.
        if run_task is not None and not run_task.done():
            await _pause_and_wait_run_task(conv, run_task, heartbeat_timeout_s)
        raise
    finally:
        await asyncio.shield(asyncio.to_thread(conv.close))
```

### 4.4 `LocalWorkspace` constructor (S1 §6)

`LocalWorkspace(working_dir: str | Path)` per `workspace/workspace.py:12-49`. `working_dir` is the host directory the agent operates against. W376 activity creates per-task working dir under `persistence_dir/<conversation_id>/workspace/` (where `<conversation_id>` = `spec.conversation_id` per A6 fix).

### 4.5 `RemoteWorkspace` constructor + auth (S1 §6 + S2 §4)

`Workspace(host="http://127.0.0.1:<port>", working_dir=..., api_key="<session_api_key>")` per `workspace/workspace.py`. Per codex r1 S5: bind host to `127.0.0.1` only — NOT `0.0.0.0` or `localhost`-resolves-to-IPv6 (codex r1 S2 + S5 hardening).

### 4.6 Workspace mode default — REINFORCED 'remote' (codex r1 D2 S1 SECURITY-DEFAULT)

Per codex r1 D2 S1 (BLOCK FIX): Default `workspace_mode="remote"` per §4.1. `LocalWorkspace` reserved for EXPLICITLY-OPT-IN trusted tasks ONLY. The default codifies SOTA security posture: untrusted LLM-generated code → container isolation is a SECURITY PRIMITIVE not a perf knob (S5 §8 + codex r1 D2 reinforcement). Operator override via `--workspace-mode local` requires explicit `--i-trust-this-task` confirmation flag added to `tools/dispatch_temporal.py` (CLI safety guard).

## 5. Agent-server container lifecycle (codex r1 A2+R4+S2+S5 P0 BLOCKER FIXES)

### 5.1 Image (S2 §2 + S5 §10 R4)

- **Image tag**: `ghcr.io/openhands/agent-server:latest-python` (5.26GB compressed, ID `d70c077d55ae`).
- **Digest-pinning recommended** (S5 §10 R4 + CR-9): `ghcr.io/openhands/agent-server@sha256:<digest>`.
- **Image entrypoint**: `["tini", "--", "/usr/local/bin/openhands-agent-server"]` — tini forwards SIGTERM to uvicorn for graceful drain.

### 5.2 `containers.run()` kwargs — env-pre-spawn + container hardening (codex r1 S2+S5 BLOCKER FIX)

**Per codex r1 D2 S2 (BLOCK)**: `OH_SESSION_API_KEYS_0` env MUST be set BEFORE `containers.run()`, not after `/health`. Per codex r1 D2 S5 (P1): full container hardening (`read_only=True`, `pids_limit`, `cap_drop=["ALL"]`, `security_opt=["no-new-privileges:true"]`).

```python
import secrets

# Codex r1 S2 + S4 fix: env-mint BEFORE containers.run()
session_api_key = secrets.token_urlsafe(32)   # 256-bit (≥codex r1 S4 32-byte floor)
secret_key = secrets.token_urlsafe(32)         # independent symmetric cipher key

container = client.containers.run(
    image=AGENT_SERVER_IMAGE,           # §5.1 digest-pinned
    detach=True,
    name=f"oh-agent-{spec.conversation_id[:12]}",
    ports={f"{INTERNAL_AGENT_PORT}/tcp": ('127.0.0.1', None)},  # codex r1 S5: 127.0.0.1-bind
    environment={
        # Codex r1 S2 fix: env BEFORE containers.run, NOT after /ready
        "OH_SESSION_API_KEYS_0": session_api_key,
        "OH_SECRET_KEY": secret_key,
        "OH_ENABLE_VSCODE": "false",
        "OH_ENABLE_VNC": "false",
        "LOG_JSON": "true",
    },
    labels={
        "w375.purpose": "per-task-isolation",
        "w376.workspace_mode": "remote",
        "w375.conversation_id": spec.conversation_id,  # codex r1 A6: use spec, not freshly-minted uuid
        "w375.orchestrator_pid": str(os.getpid()),
        "w375.spawned_at": datetime.now(timezone.utc).isoformat(),
        "w375.image_digest": image.attrs["RepoDigests"][0],
    },
    remove=False,
    mem_limit="2g",
    nano_cpus=2_000_000_000,                              # 2.0 CPU
    pids_limit=512,                                       # codex r1 S5 fix: fork-bomb prevention
    read_only=True,                                       # codex r1 S5 fix: read-only rootfs
    tmpfs={"/tmp": "size=512m,exec", "/workspace": "size=2g,exec"},  # writable tmpfs for required paths
    cap_drop=["ALL"],                                     # codex r1 S5 fix: drop all caps
    # NO cap_add: codex r1 S5 finding — "NET_BIND_SERVICE" unnecessary, agent uses high port
    security_opt=["no-new-privileges:true"],              # codex r1 S5 fix
)
```

### 5.3 `/ready` endpoint polling (codex r1 A2 FIX — was /health)

**Per codex r1 D1 A2 (BLOCK)**: Use `/ready` NOT `/health` — `/health` returns 200 once uvicorn boots; `/ready` returns 503 until `mark_initialization_complete()` fires.

```python
import httpx
import asyncio
import time

deadline = time.monotonic() + 60.0  # 60s deadline
while time.monotonic() < deadline:
    try:
        async with httpx.AsyncClient(timeout=2.0) as client:
            r = await client.get(f"http://127.0.0.1:{port}/ready")
            if r.status_code == 200:
                return True
    except (httpx.ConnectError, httpx.ReadTimeout, httpx.RemoteProtocolError):
        pass
    await asyncio.sleep(0.250)  # 250ms cadence
raise RuntimeError(f"agent-server /ready timeout in 60s")
```

### 5.4 session_api_key mint pattern — env-pre-spawn (codex r1 A2+S2 BLOCKER FIX)

**Per codex r1 D1 A2 + D2 S2 (BLOCK)**: Mint `session_api_key` + `secret_key` via `secrets.token_urlsafe(32)` BEFORE `containers.run()` and pass via `environment={"OH_SESSION_API_KEYS_0": ..., "OH_SECRET_KEY": ...}`. NOT a POST/sessions create flow after `/health`. See §5.2 code.

### 5.5 Cleanup ladder — graceful container.stop(timeout=30) (codex r1 A2 FIX — was kill())

**Per codex r1 D1 A2 (BLOCK)**: Use `container.stop(timeout=30)` NOT `container.kill()`. `container.kill()` bypasses uvicorn lifespan teardown, orphans SQLite WAL + tmux sessions.

```python
async def stop_agent_server(container_id: str, *, grace_s: int = 30) -> None:
    """Graceful teardown — SIGTERM via tini, drains lifespan, then remove.

    Codex r1 A2 fix: container.stop(timeout=30) NOT container.kill().
    container.stop() sends SIGTERM → tini forwards → uvicorn drains lifespan via
    asyncio.gather(stop_vscode, stop_desktop, stop_tool_preload, return_exceptions=True).
    """
    try:
        container = await asyncio.to_thread(client.containers.get, container_id)
    except docker.errors.NotFound:
        return  # idempotent success
    await asyncio.to_thread(container.stop, timeout=grace_s)
    try:
        await asyncio.to_thread(container.remove)
    except docker.errors.NotFound:
        pass
```

For unrecoverable hangs ONLY: `container.kill()` + `container.remove(force=True)` is the escalation path.

### 5.6 Network egress allowlist (codex r1 D2 S3 P0 → codex r2 D2-S3 CONCRETIZED)

**Per codex r2 D2-S3 PARTIAL → FIXED**: Prior text contradicted itself (said `--internal`
while code set `internal=False`) and left enforcement as sidecar-OR-host-firewall (non-deterministic).
**Authoritative design — per-task internal Docker network + mandatory egress-gateway sidecar
container running a deny-by-default proxy with explicit allowlist**. No host-firewall fallback
(non-deterministic across Docker Desktop / WSL2 / native Linux platforms).

**Architecture (deterministic, single path)**:

1. **Per-task internal network** (`internal=True`): no Docker NAT/masquerade to host network →
   container CANNOT reach anything by default (RFC1918, host LAN, cloud metadata all blocked
   at the Docker bridge level).
2. **Egress-gateway sidecar** attached to BOTH the internal task-network AND an external
   `w376-egress-out` bridge → only the sidecar has WAN. Sidecar runs `tinyproxy` (or `envoy`)
   with allowlist config.
3. **DNS pinned to sidecar** via `--dns 172.30.0.2` (sidecar IP on internal net) → no leaky
   public DNS resolution from the agent-server container.
4. **iptables rules on the sidecar container** for L3/L4 enforcement (allowlist by IP+port
   for cases where the proxy is bypassed).

```python
# codex r2 D2-S3 FIXED: per-task internal network — NO Docker NAT
net_name = f"w376-conv-{spec.conversation_id}"
network = client.networks.create(
    net_name,
    driver="bridge",
    internal=True,  # codex r2 D2-S3 FIXED: was incorrectly False; True = no NAT/masquerade
    options={
        "com.docker.network.bridge.enable_icc": "false",  # No inter-container traffic
    },
    labels={"w376.purpose": "per-task-isolation", "w375.conversation_id": spec.conversation_id},
)

# Egress-gateway sidecar — REQUIRED (not optional) per codex r2 D2-S3 deterministic-enforcement
egress_sidecar = client.containers.run(
    image="w376/egress-gateway:pinned-sha256-<digest>",  # ships tinyproxy + iptables config
    detach=True,
    name=f"oh-egress-{spec.conversation_id[:12]}",
    network=net_name,                             # attach to task-internal net
    cap_add=["NET_ADMIN"],                        # sidecar needs iptables; agent does NOT
    cap_drop=["ALL"],
    security_opt=["no-new-privileges:true"],
    environment={
        # Allowlist (W376 v1) — exact host:port tuples. Anything else is DROP.
        "EGRESS_ALLOW": (
            "api.openai.com:443,"
            "api.anthropic.com:443,"
            "oauth.openai.com:443,"     # subscription_login_async OAuth refresh
            "auth.openai.com:443"
        ),
        # Block list — enforced even if allowlist accidentally widens:
        "EGRESS_DENY_CIDR": (
            "10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,"  # RFC1918 LAN
            "169.254.169.254/32,"                        # AWS/GCP/Azure metadata
            "127.0.0.0/8,::1/128,0.0.0.0/32"              # loopback / unspecified
        ),
    },
    labels={"w376.purpose": "egress-gateway", "w375.conversation_id": spec.conversation_id},
)
# Connect sidecar to external bridge so it has actual WAN egress
client.networks.get("w376-egress-out").connect(egress_sidecar)

# Agent-server container then sets DNS + http_proxy to the sidecar:
# environment={
#   "HTTP_PROXY":  "http://<sidecar-ip>:8888",
#   "HTTPS_PROXY": "http://<sidecar-ip>:8888",
#   "NO_PROXY":    "",  # force ALL traffic through proxy
# }
# extra_hosts={...} optional pinning; client.containers.run(..., dns=["172.30.0.2"])
```

**Enforcement contract**:
- DEFAULT-DENY (drop) for any destination not in `EGRESS_ALLOW`.
- DEFAULT-DENY for any destination in `EGRESS_DENY_CIDR` (even if accidentally allowlisted).
- DNS resolution forced through sidecar's resolver (no public DNS).
- L3 (iptables in sidecar) + L7 (tinyproxy allowlist) defense in depth.

**Test surface** (plan Task 24 — no placeholder pass-bodies; assert at minimum):
- `test_egress_blocks_169_254_169_254_metadata` — `curl http://169.254.169.254/` from agent
  container returns `connect: connection refused` (or timeout).
- `test_egress_blocks_rfc1918_192_168` — `curl http://192.168.1.1/` returns block.
- `test_egress_blocks_dns_to_8_8_8_8` — `dig @8.8.8.8 google.com` fails (no public DNS).
- `test_egress_allows_api_openai_com_443` — TLS handshake succeeds; cert chain verifies.
- `test_egress_blocks_api_evil_com_443` — connection refused/timeout.

Implementation: `agents/egress_gateway.py` builds the sidecar image; plan Task 24 wires + tests
the live e2e with deterministic assertions (no placeholders).

### 5.7 Container hardening (NEW — codex r1 D2 S5 P1 — applied inline at §5.2)

Per codex r1 D2 S5: full container hardening covered in §5.2 `containers.run()` kwargs:
- `read_only=True` — rootfs read-only
- `pids_limit=512` — fork-bomb prevention
- `cap_drop=["ALL"]` — drop all Linux capabilities (NO `cap_add=["NET_BIND_SERVICE"]` — unnecessary)
- `security_opt=["no-new-privileges:true"]` — block setuid escalation
- Port bind: `127.0.0.1` only (not `0.0.0.0`)
- Writable paths via `tmpfs={"/tmp": ..., "/workspace": ...}` with size limits

### 5.8 ThreadPoolExecutor for docker-py spawn concurrency (NEW — codex r1 D4 P2)

Per codex r1 D4 P2 (P0): docker-py `containers.run/reload/kill/remove` are SYNCHRONOUS HTTP calls that block the worker event loop. Worker-default `ThreadPoolExecutor` pool conflicts with other async work. Dedicate a separate `ThreadPoolExecutor(max_workers=8)` for docker-py spawn calls:

```python
# In worker init
import concurrent.futures
DOCKER_EXECUTOR = concurrent.futures.ThreadPoolExecutor(max_workers=8, thread_name_prefix="docker-spawn")

# In spawn_agent_server, replace asyncio.to_thread with loop.run_in_executor(DOCKER_EXECUTOR, ...)
loop = asyncio.get_event_loop()
container = await loop.run_in_executor(DOCKER_EXECUTOR, lambda: client.containers.run(...))
```

### 5.9 Sandbox-slot semaphore from host CPU/RAM (NEW — codex r1 D4 P3)

Per codex r1 D4 P3 (P0): No 100-concurrent-task throughput story. `max_concurrent_activities=8` + `mem_limit=2g` + `nano_cpus=2` configured but no host capacity/backpressure model. Add sandbox-slot semaphore acquired BEFORE `spawn_agent_server`:

```python
import psutil

class SandboxSlotSemaphore:
    """Enforce host-capacity backpressure: deny spawn if remaining headroom < per-container budget."""
    def __init__(self, mem_per_container_gb=2.0, cpu_per_container=2.0, headroom_pct=0.20):
        self.mem_per_container_gb = mem_per_container_gb
        self.cpu_per_container = cpu_per_container
        self.headroom_pct = headroom_pct
        self._active = 0
        self._lock = asyncio.Lock()

    async def acquire(self):
        async with self._lock:
            mem_avail_gb = psutil.virtual_memory().available / 1e9
            cpu_count = psutil.cpu_count(logical=False)
            mem_budget = mem_avail_gb * (1.0 - self.headroom_pct)
            cpu_budget = cpu_count * (1.0 - self.headroom_pct)
            if (self._active + 1) * self.mem_per_container_gb > mem_budget:
                raise ApplicationError(
                    f"SandboxCapacityExceeded: mem {(self._active+1)*self.mem_per_container_gb}g "
                    f"> budget {mem_budget:.1f}g",
                    type="SandboxCapacityExceeded",
                    non_retryable=False,  # retryable — host may free memory
                )
            if (self._active + 1) * self.cpu_per_container > cpu_budget:
                raise ApplicationError("SandboxCapacityExceeded: cpu", type="SandboxCapacityExceeded")
            self._active += 1

    async def release(self):
        async with self._lock:
            self._active = max(0, self._active - 1)

# Benchmark: N=8 / N=32 / N=100 (see plan Task 21 capacity worksheet).
```

### 5.10 JuryQuotaLedger — rolling-cost-budget per 5h window (NEW — codex r1 D4 P4)

Per codex r1 D4 P4 (P0): `JuryQuotaLedger` doesn't enforce 5h rolling cost budget. Released slots free immediately → unlimited juries inside 5h. Fix: separate concurrency slots from rolling spend quota. Count all acquired jury runs in 5h window (released or not):

```python
import sqlite3
from datetime import datetime, timedelta, timezone

class JuryQuotaLedger:
    """W376 P4 fix: rolling 5h spend quota. Separate from concurrency slots."""
    def __init__(self, db_path, max_jury_per_5h=20, max_concurrent_jury=4):
        self.db_path = db_path
        self.max_5h = max_jury_per_5h
        self.max_concurrent = max_concurrent_jury

    def try_acquire(self, conversation_id: str) -> bool:
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("BEGIN IMMEDIATE")  # codex r1 R6 race-fix
            now = datetime.now(timezone.utc)
            window_start = now - timedelta(hours=5)
            count = conn.execute(
                "SELECT COUNT(*) FROM jury_acquisitions WHERE acquired_at > ?",
                (window_start.isoformat(),)
            ).fetchone()[0]
            if count >= self.max_5h:
                return False
            conn.execute(
                "INSERT INTO jury_acquisitions(conversation_id, acquired_at) VALUES (?, ?)",
                (conversation_id, now.isoformat())
            )
            return True
```

## 6. Temporal activity patterns (codex r1 D3 BLOCKER FIXES)

### 6.1 `pydantic_data_converter` wiring at EVERY Client.connect site (NEW — codex r1 D1 A3 + D3 R2 P0 BLOCKER FIX)

**Per codex r1 D1 A3 + D3 R2 (BLOCK)**: Every `Client.connect(...)` site (worker/CLI/MCP/e2e) MUST pass `temporalio.contrib.pydantic.pydantic_data_converter`. Without it, BaseModel return-types raise at `converter/_payload_converter.py:625-635`.

```python
from temporalio.client import Client
from temporalio.contrib.pydantic import pydantic_data_converter

# Worker boot
client = await Client.connect("localhost:7233", data_converter=pydantic_data_converter)

# CLI dispatch (tools/dispatch_temporal.py)
client = await Client.connect(
    os.getenv("TEMPORAL_ADDRESS", "localhost:7233"),
    data_converter=pydantic_data_converter,
)

# E2E test (tests/e2e/test_w376_*.py)
client = await Client.connect(addr, data_converter=pydantic_data_converter)

# MCP wiring (if applicable)
client = await Client.connect(addr, data_converter=pydantic_data_converter)
```

Plan Task 17 verifies via smoke test that every Client.connect site has the converter wired.

### 6.2 Heartbeat cadence — heartbeat_timeout/3 (codex r1 D1 A4 P0 FIX)

Per codex r1 D1 A4: cadence MUST be `heartbeat_timeout / 3` (NOT `no_progress_seconds / 3`). Implemented in §4.3 watchdog `watchdog_period_s = max(1.0, heartbeat_timeout_s / 3.0)`.

### 6.3 CancelledError propagation (S4 §3)

Use `from temporalio.exceptions import CancelledError` per S4 §3 (codex r1 confirmed). Catch `asyncio.CancelledError` for cleanup, then re-raise; SDK converts to `temporalio.exceptions.CancelledError` when reporting to server.

### 6.4 asyncio.shield cleanup pattern (S4 §4)

Canonical pattern in §4.3 — `await asyncio.shield(asyncio.to_thread(conv.close))` in `finally` block.

### 6.5 graceful_shutdown_timeout=300s required (codex r1 D3 R9 P0 FIX)

Per codex r1 D3 R9: Worker default `graceful_shutdown_timeout=0s` too aggressive. Set to 300s:

```python
Worker(
    client=client,
    task_queue="openhands-queue",
    workflows=[TaskWorkflow],
    # codex r9 D3-finding-1 fix: register admit_retry_activity so workflow retry loop can
    # invoke it via workflow.execute_activity(...) per plan Task 11 + spec §6.11. Prior v10
    # bug: workflow called admit_retry_activity but worker only registered openhands_run_activity,
    # causing first retryable failure to NameError at activity-dispatch time.
    activities=[openhands_run_activity, admit_retry_activity],
    graceful_shutdown_timeout=timedelta(seconds=300),  # codex r1 R9 fix
    interceptors=[TracingInterceptor()],
    max_concurrent_activities=8,
)
```

### 6.6 imports_passed_through scope (S4 §5)

Per S4 §5: wrap heavy third-party deps + Pydantic models + C-extensions at top of workflow file.

### 6.7 RetryPolicy.non_retryable_error_types (S4 §8 + codex r2 D3-r2-P0-1 FIX)

**codex r2 D3-r2-P0-1 FIXED**: `SandboxCapacityExceeded` is RETRYABLE (capacity-bounce — host may
free memory) and was incorrectly listed in `non_retryable_error_types`. Also: `maximum_attempts`
sourced from `spec.budget.max_attempts` (W375 default = 3, per `agents/models.py:16`) rather than
hardcoded 5 — keeps W376 inside W375 retry-budget contract.

W376 canonical RetryPolicy:
```python
RetryPolicy(
    initial_interval=timedelta(seconds=2),
    backoff_coefficient=2.0,
    maximum_interval=timedelta(minutes=2),
    maximum_attempts=spec.budget.max_attempts,  # codex r2 D3-r2-P0-1: was hardcoded 5
    non_retryable_error_types=[
        "TaskSpecError",
        "AuthError",
        "QuotaExhausted",
        # codex r2 D3-r2-P0-1 FIXED: SandboxCapacityExceeded REMOVED — it's retryable
        # so the activity can bounce when host frees memory/CPU. Listing it here would
        # have made capacity backpressure terminal (single-shot failure on any backpressure).
    ],
)
```

Capacity-bounce contract: `SandboxSlotSemaphore.acquire()` raises `ApplicationError(type=
"SandboxCapacityExceeded", non_retryable=False)` — the retry policy will back off via
`initial_interval * backoff_coefficient^n` so the next attempt observes freed capacity.
Plan Task 21 adds `test_capacity_bounce_retries_until_slot_free` proving the path.

### 6.8 schema_version + backward-compat aliases on TaskSpec/TaskResult (NEW — codex r1 D3 R2 P0)

Implemented in §4.1 — `schema_version: Literal[1,2]` + `_backward_compat_v1_to_v2` model_validator. Plan Task 6 covers test paths for v1↔v2 forward-compat.

### 6.9 Separate watchdog Task heartbeating at ≤heartbeat_timeout/3 (NEW — codex r1 D1 A4 + D3 R3 P0)

Implemented in §4.3 `watchdog()` async function. Plan Task 11 wires the asyncio.gather(run_task, watchdog_task).

### 6.10 L0 TaskSpecError as ApplicationError(non_retryable=True) (NEW — codex r1 D3 R5 P0)

Per codex r1 D3 R5: `l0_validate_activity` raises `TaskSpecError` without `ApplicationError(type="TaskSpecError", non_retryable=True)`. Fix:

```python
from temporalio.exceptions import ApplicationError

@activity.defn
async def l0_validate_activity(spec: TaskSpec) -> None:
    try:
        TaskSpec.model_validate(spec.model_dump())  # roundtrip-validate
    except Exception as e:
        raise ApplicationError(
            f"L0 TaskSpec validation failed: {e}",
            type="TaskSpecError",
            non_retryable=True,
        )
```

And the activity registration MUST also list `non_retryable_error_types=["TaskSpecError"]` on the activity's RetryPolicy.

### 6.11 Admission / Retry-Gate / Oscillation coordinator — three roles, race-immune persistence (NEW — codex r1 D3 R1 P0 + codex r3 D3-r2-P0-1/P0-2/P0-3 BLOCK fix — CARRY-FORWARD C24 NOW IN-WAVE)

**Per codex r1 D3 R1 (BLOCK)**: `RetryBudget` + `OscillationDetector` + `IdempotentReplayer` exist as standalone primitives but NOT wired into dispatch path. ELEVATED from C3 carry-forward to W376 in-wave P0.

**codex r3 D3 BLOCK (0.91)** — three residual race conditions: (1) D3-r2-P0-1: idempotency row
persists before `start_workflow` returns, so a worker crash after commit yields a row pointing
at a nonexistent workflow; (2) D3-r2-P0-2: schema has no `status` column, so `gc_async`
violates TERMINAL-only dedupe and can DELETE live IN_FLIGHT rows; (3) D3-r2-P0-3: search-attr
upsert still uses deprecated dict-form. The coordinator is also NOT a retry/oscillation
coordinator — submit_workflow merely INSERTs idempotency rows and calls `start_workflow`.

Design: the coordinator has THREE distinct roles per the W376 reliability contract — they
are intentionally separated so each role is unit-testable in isolation and each failure
mode has a single owner:

1. **Admission role**: idempotency dedup via `BEGIN IMMEDIATE` + `INSERT OR IGNORE` +
   subsequent `SELECT` (single transaction). Returns existing workflow_id on duplicate
   submit. codex r3 D3-r2-P0-1 fix: row state machine is now
   `PENDING_START → RUNNING → TERMINAL`; row is INSERTed with `status='PENDING_START'`,
   `start_workflow` is then called, and the row is updated to `status='RUNNING'`. If
   `start_workflow` fails before the status update, the next submission sees
   `PENDING_START` AND `start_workflow` returns the same id idempotently OR the row is
   GC'd via the rollback path below.

2. **Retry-gate role**: retryable failures from the activity (Temporal-classified
   retryable errors, NOT terminal `non_retryable_error_types`) flow through
   `RetryBudget.acquire(failure_class, attempt) -> (admitted: bool, wait_seconds: float)`
   BEFORE the workflow is allowed to schedule the activity retry. Budget exhaustion
   (admitted=False) → coordinator raises `BudgetExhausted` and the workflow records
   `status='TERMINAL'` with reason `budget_exhausted`. (codex r11b D3-finding-1 fix:
   real W375 API name aligned — was stale `try_acquire(op_id)` prose at this line.)

3. **Oscillation role**: every failure-class observation is fed to
   `OscillationDetector.detect_and_block(op_id, failure_class) -> bool`. If the detector
   observes 3+ same-failure-class events in a sliding window (e.g. `TimeoutError × 3`), it
   sliding window, the coordinator escalates to operator-sign via
   `ManualReviewPendingKey.value_set(True)` (per §7.5) and refuses further auto-retries.

**codex r3 D3-r2-P0-2 fix — schema + GC contract**: the row now carries
`status TEXT NOT NULL DEFAULT 'PENDING_START'` + `last_check_at TEXT` columns.
`gc_sync` deletes ONLY `status='TERMINAL' AND completed_at < now - 24h`.
`gc_async` uses `SELECT-then-DELETE-WHERE-status='TERMINAL' AND
(now - last_check_at) > 30s AND temporal_describe_says_terminal`. A row that is
PENDING_START / RUNNING / UNKNOWN MUST NEVER be deleted. The cross-process race where
`gc_async` sees Temporal `NotFound` for a row that was just inserted is closed by the
`(now - last_check_at) > 30s` guard — a freshly-inserted row sets `last_check_at=now()`
so `gc_async` will not see it as eligible for at least 30 seconds, well past the
typical `start_workflow` round-trip (≤ 2s p99).

**codex r3 D3-r2-P0-3 fix — typed search-attr upsert**: all `workflow.upsert_search_attributes`
sites in workflow code use typed `KEY.value_set(...)` objects, never the deprecated raw-dict
form. Example: `workflow.upsert_search_attributes([SLOClassKey.value_set("P0")])`.

Existing op_id derivation and BEGIN IMMEDIATE race-fix remain in force (codex r2 D3-r2-P0-3):
op_id excludes `conversation_id`; `BEGIN IMMEDIATE` + `INSERT OR IGNORE` is the
race-fix verbatim; workflow_id is the op_id (so same op across different conversation IDs
dedupes correctly).

```python
import hashlib
import sqlite3
from temporalio.client import Client
from agents.models import TaskSpec

class AdmissionCoordinator:
    """W376 R1 + codex r2 D3-r2-P0-3: wires RetryBudget + OscillationDetector + IdempotentReplayer.

    op_id derivation contract (codex r2 D3-r2-P0-3):
    - op_id = sha256(task || \x00 || repo || \x00 || base_commit || \x00 || workspace_mode)
    - NEVER includes conversation_id — that would defeat dedup on re-submits of the same logical op
    - If spec.idempotency_key is set, it OVERRIDES the derivation (caller-asserted stable id)

    Idempotency row contract (codex r1 R6 race-fix):
    - BEGIN IMMEDIATE → acquires write lock atomically
    - INSERT OR IGNORE → idempotent under concurrent submitters
    - winner returns own workflow_id; losers return the winner's

    Flow per dispatch (codex r11b D3-finding-1 fix: REAL W375 APIs):
    1. compute op_id
    2. workflow_id := op_id (truncated/hashed if Temporal 256-char limit hit)
    3. atomic INSERT OR IGNORE (op_id, workflow_id) — winner advances to step 4
    4. await client.start_workflow(..., id=workflow_id, ...)
    5. on retryable failure: `RetryBudget.acquire(failure_class, attempt) -> (bool, float)`
       — `admitted=False` denies retry; raises `BudgetExhausted` (was stale `try_acquire`)
    6. feed failure-class events to `OscillationDetector.detect_and_block(op_id, failure_class)`
       — returns True after 3+ same-class events; raises `ManualReviewRequired` (was stale
       `record_transition` + `is_oscillating`)
    """
    def __init__(self, db_path: str, retry_budget=None, oscillation_detector=None):
        self.db_path = db_path
        self.retry_budget = retry_budget
        # codex r9 D3-finding-2 fix: attribute name aligned with `admit_retry()` consumer at
        # spec:890-891 (was `self.oscillation`, raised AttributeError when oscillator configured).
        self.oscillation_detector = oscillation_detector
        self._init_db()

    def _init_db(self):
        # codex r3 D3-r2-P0-2 fix: status + completed_at + last_check_at columns close
        # the GC race-condition (was: schema had only op_id/workflow_id/created_at, so
        # gc_async violated TERMINAL-only dedupe and could DELETE live IN_FLIGHT rows).
        with sqlite3.connect(self.db_path) as conn:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS idempotency_rows (
                    op_id           TEXT PRIMARY KEY,
                    workflow_id     TEXT NOT NULL,
                    status          TEXT NOT NULL DEFAULT 'PENDING_START',
                                    -- one of: PENDING_START, RUNNING, TERMINAL, UNKNOWN
                    created_at      TEXT NOT NULL,
                    last_check_at   TEXT NOT NULL,
                    completed_at    TEXT
                )
            """)
            # Migration helper: ADD COLUMNs for pre-r3 deployments
            for col, ddl in [
                ("status",        "ALTER TABLE idempotency_rows ADD COLUMN status TEXT NOT NULL DEFAULT 'UNKNOWN'"),
                ("last_check_at", "ALTER TABLE idempotency_rows ADD COLUMN last_check_at TEXT"),
                ("completed_at",  "ALTER TABLE idempotency_rows ADD COLUMN completed_at TEXT"),
            ]:
                try:
                    conn.execute(ddl)
                except sqlite3.OperationalError:
                    pass  # column already present

    @staticmethod
    def compute_op_id(spec: TaskSpec) -> str:
        """codex r2 D3-r2-P0-3: op_id excludes conversation_id; caller override via idempotency_key."""
        if spec.idempotency_key:
            return spec.idempotency_key
        # Use \x00 NUL byte as field separator (cannot appear in str values) so
        # ("a","bc","d") != ("ab","c","d") collisions are impossible.
        parts = [spec.task or "", spec.repo or "", spec.base_commit or "", spec.workspace_mode]
        material = "\x00".join(parts).encode("utf-8")
        return "op-" + hashlib.sha256(material).hexdigest()[:48]

    @staticmethod
    def _workflow_id_for(op_id: str) -> str:
        """Temporal workflow_id max length is 1000 chars; op_id ~52 chars is fine."""
        return op_id

    async def submit_workflow(self, client: Client, spec: TaskSpec) -> str:
        """Admission role: idempotent dedup + lifecycle-aware row insert.

        codex r3 D3-r2-P0-1 fix: row is inserted with status='PENDING_START', the workflow
        is started, then the row is promoted to status='RUNNING'. If start_workflow raises
        between insert and update, the row remains PENDING_START and the next submission
        either resumes (Temporal idempotently dedupes on workflow_id) or gc_async escalates
        per §6.11 cross-process race contract.
        """
        op_id = self.compute_op_id(spec)
        workflow_id = self._workflow_id_for(op_id)

        # codex r1 R6 race-fix: atomic BEGIN IMMEDIATE + INSERT OR IGNORE
        from datetime import datetime, timezone
        now_iso = datetime.now(timezone.utc).isoformat()
        with sqlite3.connect(self.db_path, isolation_level=None) as conn:
            conn.execute("BEGIN IMMEDIATE")  # acquires write lock atomically
            cur = conn.execute(
                # codex r3 D3-r2-P0-2 fix: row carries status='PENDING_START' + last_check_at.
                "INSERT OR IGNORE INTO idempotency_rows"
                "(op_id, workflow_id, status, created_at, last_check_at) "
                "VALUES (?, ?, 'PENDING_START', ?, ?)",
                (op_id, workflow_id, now_iso, now_iso),
            )
            if cur.rowcount == 0:
                # Loser: row already existed. Read its status to decide:
                #   - RUNNING / TERMINAL_COMPLETED / TERMINAL_FAILED: return existing workflow_id
                #   - PENDING_START: previous winner crashed between INSERT and start_workflow
                #     → fall through to describe-then-restart recovery (codex r5 D3-r2-P0-4 fix).
                row = conn.execute(
                    "SELECT workflow_id, status FROM idempotency_rows WHERE op_id = ?", (op_id,)
                ).fetchone()
                conn.execute("COMMIT")
                existing_workflow_id, existing_status = row[0], row[1]
                if existing_status != "PENDING_START":
                    return existing_workflow_id
                # codex r5 D3-r2-P0-4 fix: PENDING_START row → describe-then-restart recovery.
                # Probe Temporal: if workflow exists → return id (idempotent); if NotFound →
                # re-attempt start_workflow with the SAME id (Temporal's own idempotency
                # dedupes if it races with another recoverer; SQLite then promotes to RUNNING).
                try:
                    handle = client.get_workflow_handle(existing_workflow_id)
                    await handle.describe()
                    # Workflow exists — return existing id without re-starting.
                    return existing_workflow_id
                except Exception as e:
                    if "NotFound" not in str(e) and "WorkflowNotFound" not in str(e):
                        raise  # other Temporal errors propagate
                    # NotFound path falls through to start_workflow below (with existing id).
                    workflow_id = existing_workflow_id
            else:
                conn.execute("COMMIT")

        # Winner (or recovery): start the workflow. Temporal idempotently dedupes on workflow_id,
        # so concurrent recoverers race-safely converge to a single live workflow.
        await client.start_workflow(
            "TaskWorkflow", spec,
            id=workflow_id,
            task_queue="openhands-queue",
        )

        # codex r3 D3-r2-P0-1 fix: promote to RUNNING after start_workflow returns OK.
        # If we crash BEFORE this update, the row stays PENDING_START and gc_async will
        # only eligible-mark it after the >30s last_check_at guard expires.
        with sqlite3.connect(self.db_path, isolation_level=None) as conn:
            conn.execute(
                "UPDATE idempotency_rows SET status='RUNNING', last_check_at=? WHERE op_id=?",
                (datetime.now(timezone.utc).isoformat(), op_id),
            )
        return workflow_id

    # codex r3 D3-r2-P0-2 fix: retry-gate role — explicit retry/oscillation entry point.
    # codex r5 D3-r2-P0-3 fix: signature aligned with REAL W375 APIs:
    #   - agents/retry_budget.py:57 → `acquire(failure_class: str, attempt: int) -> (bool, float)`
    #   - agents/oscillation_detector.py:54 → `detect_and_block(task_id, failure_class) -> bool`
    # Returns {"admitted": bool, "wait_seconds": float, "reason": str | None} for workflow-loop
    # consumption (the workflow at temporal_worker.py converts admitted=False to ApplicationError
    # type=ManualReviewRequired, non_retryable=True so Temporal terminates the run).
    async def admit_retry(self, op_id: str, failure_class: str, attempt: int) -> dict:
        """Retry-gate role: every retryable failure flows through RetryBudget BEFORE
        the workflow schedules the activity retry. OscillationDetector runs in parallel;
        3+ same-failure-class events in window escalate to operator-sign.

        codex r5 D3-r2-P0-3: REAL W375 API used here (was: nonexistent try_acquire /
        record_transition / is_oscillating).
        """
        if self.oscillation_detector is not None:
            if self.oscillation_detector.detect_and_block(op_id, failure_class):
                raise ManualReviewRequired(
                    f"oscillation on op_id={op_id} failure_class={failure_class}"
                )
        if self.retry_budget is not None:
            admitted, wait_seconds = self.retry_budget.acquire(failure_class, attempt)
            if not admitted:
                # Mark TERMINAL with reason — gc_sync will eventually reclaim the row.
                from datetime import datetime, timezone
                now_iso = datetime.now(timezone.utc).isoformat()
                with sqlite3.connect(self.db_path, isolation_level=None) as conn:
                    conn.execute(
                        "UPDATE idempotency_rows "
                        "SET status='TERMINAL', completed_at=?, last_check_at=? WHERE op_id=?",
                        (now_iso, now_iso, op_id),
                    )
                raise BudgetExhausted(op_id)
            # codex r5 D3-r2-P0-3 return contract: workflow loop consumes admit_result.
            return {"admitted": True, "wait_seconds": wait_seconds, "reason": None}
        # No retry_budget configured → admit by default with 0-second wait.
        return {"admitted": True, "wait_seconds": 0.0, "reason": None}

    # codex r3 D3-r2-P0-2 fix: GC role split into SYNC + ASYNC with TERMINAL-only guard.
    def gc_sync(self) -> int:
        """SQLite-only sweep: delete TERMINAL rows older than 24h. NEVER touches
        PENDING_START / RUNNING / UNKNOWN. Returns rows deleted."""
        with sqlite3.connect(self.db_path, isolation_level=None) as conn:
            cur = conn.execute(
                "DELETE FROM idempotency_rows "
                "WHERE status='TERMINAL' "
                "  AND completed_at IS NOT NULL "
                "  AND datetime(completed_at) < datetime('now', '-24 hours')"
            )
            return cur.rowcount

    async def gc_async(self, client: Client) -> int:
        """Cross-process sweep: for rows where last_check_at > 30s ago, ask Temporal
        for canonical state. Mark TERMINAL only if Temporal confirms terminal.
        NEVER deletes a row that Temporal has not confirmed terminal.

        codex r3 D3-r2-P0-2 fix: the >30s last_check_at guard closes the race where
        gc_async would see NotFound for a row that was just-INSERTed mid-gc.
        """
        from datetime import datetime, timezone
        eligible = []
        with sqlite3.connect(self.db_path, isolation_level=None) as conn:
            for row in conn.execute(
                "SELECT op_id, workflow_id FROM idempotency_rows "
                "WHERE status IN ('PENDING_START','RUNNING','UNKNOWN') "
                "  AND datetime(last_check_at) < datetime('now', '-30 seconds')"
            ):
                eligible.append(row)
        reclaimed = 0
        for op_id, workflow_id in eligible:
            try:
                handle = client.get_workflow_handle(workflow_id)
                desc = await handle.describe()
                # Temporal-canonical terminal states.
                terminal = desc.status.name in {"COMPLETED", "FAILED", "CANCELED", "TERMINATED", "TIMED_OUT"}
            except Exception:
                # NotFound or transient — DO NOT delete; just refresh last_check_at and skip.
                terminal = False
            now_iso = datetime.now(timezone.utc).isoformat()
            with sqlite3.connect(self.db_path, isolation_level=None) as conn:
                if terminal:
                    conn.execute(
                        "UPDATE idempotency_rows "
                        "SET status='TERMINAL', completed_at=?, last_check_at=? WHERE op_id=?",
                        (now_iso, now_iso, op_id),
                    )
                    reclaimed += 1
                else:
                    conn.execute(
                        "UPDATE idempotency_rows SET last_check_at=? WHERE op_id=?",
                        (now_iso, op_id),
                    )
        return reclaimed


class BudgetExhausted(Exception):
    """Retry budget for this op_id is exhausted; workflow MUST mark TERMINAL."""
    pass


class ManualReviewRequired(Exception):
    """OscillationDetector observed 3+ reversals; operator-sign required."""
    pass
```

**Test coverage (plan Task 20 expanded — codex r3 D3-r2-P0-1/P0-2/P0-3 fixes verified)**:
- `test_idempotent_same_op_different_conversation_ids_dedupes` — same task/repo/base_commit
  with two different `conversation_id` values → same workflow_id returned.
- `test_idempotent_different_base_commit_different_workflow` — same task/repo with different
  base_commit → distinct workflow_ids.
- `test_concurrent_submitters_race_resolves_to_single_workflow` — 10 concurrent submits of
  same op → exactly 1 INSERT, 9 IGNORE, all return same workflow_id.
- `test_retry_budget_exhausted_denies_resubmit` — after `max_attempts` retries, coordinator
  raises `BudgetExhausted` before reaching `start_workflow`.
- `test_oscillation_3_reversals_escalates_to_manual_review` (codex r3 D3-r2-P0 retry-gate) —
  feed 3 RUNNING→RETRYING transitions to `admit_retry`; assert `ManualReviewRequired` raised
  and `ManualReviewPendingKey.value_set(True)` is upserted by the workflow.
- `test_admission_row_promotes_pending_start_to_running` (codex r3 D3-r2-P0-1) — after
  `submit_workflow` returns, the row is `status='RUNNING'`, NOT `'PENDING_START'`.
- `test_crash_between_insert_and_start_keeps_row_pending_start` (codex r3 D3-r2-P0-1) — patch
  `start_workflow` to raise after INSERT; assert row stays `'PENDING_START'` and next
  `submit_workflow` for the same op_id resumes idempotently.
- `test_gc_sync_skips_pending_start_and_running` (codex r3 D3-r2-P0-2) — seed PENDING_START
  + RUNNING + TERMINAL(>24h) rows; assert ONLY the TERMINAL row is deleted.
- `test_gc_async_skips_just_inserted_row_under_30s_guard` (codex r3 D3-r2-P0-2 race fix) —
  INSERT then immediately invoke `gc_async`; assert row is NOT touched because
  `last_check_at` is within 30s; advance virtual clock past 30s and re-run; assert the row
  is updated/reclaimed per Temporal canonical state.
- `test_gc_async_never_deletes_unknown_temporal_status_row` (codex r3 D3-r2-P0-2) — mock
  Temporal `describe()` to raise `NotFound`; assert row is NOT deleted, only
  `last_check_at` is refreshed.
- `test_workflow_uses_typed_search_attribute_value_set` (codex r3 D3-r2-P0-3) — patch the
  workflow `upsert_search_attributes` call; assert it receives a list of
  `SearchAttributeKey.value_set(...)` objects, NOT a raw dict.

## 7. Observability (NEW — codex r1 D5 BLOCKER FIX)

### 7.1 Business-level OTel spans per phase (NEW — codex r1 D5 O1 P0)

Per codex r1 D5 O1 (BLOCK): Only Temporal `TracingInterceptor` wired. `openhands_run_activity`, L0, L1, L2, L3, cleanup do NOT create spans or set required attrs.

```python
from opentelemetry import trace

tracer = trace.get_tracer("w376.openhands")

@activity.defn
async def openhands_run_activity(spec: TaskSpec) -> dict:
    with tracer.start_as_current_span("openhands.run") as span:
        span.set_attribute("conversation_id", spec.conversation_id)
        span.set_attribute("workspace_mode", spec.workspace_mode)
        span.set_attribute("container_id", container_id or "local")
        # ... activity body ...
        try:
            # ... work ...
            span.set_attribute("elapsed_sec", elapsed)
            span.set_status(trace.Status(trace.StatusCode.OK))
        except Exception as e:
            span.record_exception(e)
            span.set_status(trace.Status(trace.StatusCode.ERROR, str(e)))
            raise
```

Same pattern for L0/L1/L2/L3 activities — plan Task 18 covers the wire.

### 7.2 Langfuse generations per LLM call with token attribution (NEW — codex r1 D5 O2 P0)

Per codex r1 D5 O2 (BLOCK): Langfuse LLM trace/cost attribution absent. Routine LLM + codex jury calls NOT bound to Langfuse generations/session IDs.

```python
from langfuse import Langfuse

langfuse = Langfuse(host=os.environ["LANGFUSE_HOST"], public_key=..., secret_key=...)

# Per conversation
trace = langfuse.trace(name="openhands.run", session_id=spec.conversation_id, metadata={...})

# Per LLM call
generation = trace.generation(
    name="routine_llm.completion",
    model=llm.model_name,
    input=messages,
    metadata={"provider": "openai"},
)
response = await llm.acompletion(messages=messages)
generation.end(
    output=response.content,
    usage={
        "prompt_tokens": response.usage.prompt_tokens,
        "completion_tokens": response.usage.completion_tokens,
        "total_tokens": response.usage.total_tokens,
    },
)
```

Per L1/L2/L3 codex jury: same pattern, with `name="codex.jury.l3.panel_N"`. Plan Task 19 covers wire + token-attribution test.

**codex r2 D2-R2-2 FIXED: REDACTION LAYER REQUIRED before OTel/Langfuse emission**. Raw LLM
inputs/outputs MUST pass through `redact_llm_trace_payload()` before being logged — hostile
task-provided secrets, OAuth tokens, session API keys, env-looking secrets, and `Authorization`
headers in messages MUST be masked. Mandatory test surface in plan Task 19:

```python
def redact_llm_trace_payload(payload: dict | list | str) -> dict | list | str:
    """codex r2 D2-R2-2: scrub OAuth, session-API-keys, env-looking secrets, Authorization headers.

    Patterns redacted (replaced with REDACTED-<kind>-<sha256-prefix>):
    - sk-... (OpenAI API keys)
    - sk-ant-... (Anthropic API keys)
    - Bearer <token> (Authorization headers)
    - eyJ... (JWT/OAuth tokens — start with eyJ base64-of-{...)
    - OH_SESSION_API_KEYS_0=... + OH_SECRET_KEY=...
    - any key matching r'(?i)(token|secret|password|api[_-]?key)\\s*[:=]\\s*\\S+'
    """
    ...

# Wire:
generation = trace.generation(
    name="routine_llm.completion",
    model=llm.model_name,
    input=redact_llm_trace_payload(messages),   # codex r2 D2-R2-2 enforcement point
    metadata={"provider": "openai"},
)
response = await llm.acompletion(messages=messages)
generation.end(output=redact_llm_trace_payload(response.content), usage={...})
```

Test (`tests/test_redact_llm_trace_payload.py` — wired in plan Task 19):
- `test_redacts_openai_sk_token` — input containing `sk-AbCdEf123...` → output replaces with `REDACTED-OPENAI-KEY-<sha>`.
- `test_redacts_anthropic_sk_ant_token`.
- `test_redacts_bearer_authorization_header`.
- `test_redacts_jwt_eyJ_prefix`.
- `test_redacts_oh_session_api_keys_env_pattern`.

### 7.3 OTel spool replayable via true OTLP protobuf (NEW — codex r1 D5 O3 P0)

Per codex r1 D5 O3 (BLOCK): `otel_spool.py` writes `repr(span)` bytes; `replay_loop()` is an explicit stub.

Fix: serialize via the SDK's OTLP protobuf exporter path — produces wire-format-compatible bytes that the `OTLPSpanExporter` consumes on replay:

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import SpanExportResult
from opentelemetry.proto.collector.trace.v1 import trace_service_pb2

# On write
exporter = OTLPSpanExporter(endpoint=spool_url)
proto = exporter._translate_data(spans)  # OTLP protobuf request
spool_file.write(proto.SerializeToString())

# On replay
proto = trace_service_pb2.ExportTraceServiceRequest()
proto.ParseFromString(spool_file.read())
# Re-emit via current OTel SDK
```

Plan Task 22 covers the spool-replay e2e test (Langfuse-disconnect → spool → reconnect → replay → spans visible in Langfuse).

### 7.4 doctor/reconcile remote-mode coverage (NEW — codex r1 D5 O4 P0)

Per codex r1 D5 O4 (BLOCK): `doctor`/`reconcile` miss remote-mode coverage. Extend both CLI verbs to validate/sweep W376 surface:

- `doctor`: check Temporal reachability + Langfuse/OTLP health + spool path writable + OAuth cache present + agent-server image cached + data-converter wired (smoke).
- `reconcile`: sweep containers with W376 labels + sweep orphan networks + sweep idempotency rows older than 24h.

Plan Task 22 covers the test (mocked Docker daemon down + Langfuse down → doctor output validates).

### 7.5 SearchAttributes SLOClass + ManualReviewPending upsert (NEW — codex r1 D5 O5 P0)

Per codex r1 D5 O5 (BLOCK): `SLOClass` + `ManualReviewPending` defined but never upserted. Wire at workflow start + periodic update.

**codex r3 D3-r2-P0-3 fix**: typed `KEY.value_set(...)` form is mandatory — the raw-dict form
shown in earlier revisions is deprecated and breaks Temporal replay safety on workflows
that started under prior SDK versions. Plan Task 11 + Task 18 + Task 20 tests all assert
typed-form via call-argument introspection.

```python
# workflow start
workflow.upsert_search_attributes([
    SLOClassKey.value_set(spec.budget.slo_class),       # codex r3 D3-r2-P0-3 typed form
    ManualReviewPendingKey.value_set(False),
])

# periodic — p99 breach risk
if elapsed > p99_breach_threshold:
    workflow.upsert_search_attributes([
        ManualReviewPendingKey.value_set(True),         # codex r3 D3-r2-P0-3 typed form
    ])

# codex r3 D3-r2-P0 oscillation escalation: when admission coordinator raises
# ManualReviewRequired, the workflow upserts ManualReviewPending=True and
# refuses further auto-retries until operator-sign clears the flag.
```

## 8. Security (codex r1 D2 P1 FIXES — applied across §4-§5 + new dimensions here)

### 8.1 Codex profile allowlist (codex r1 D2 S7 P1)

Per codex r1 D2 S7: codex profile selection from `model.split("/", 1)[1]` is untrusted-input risk. Enforce allowlist:

```python
ALLOWED_CODEX_PROFILES = {"deep-review-exec", "t1-light", "production", "research"}

def select_codex_profile(model: str) -> str:
    parts = model.split("/", 1)
    profile = parts[1] if len(parts) == 2 else "t1-light"
    if profile not in ALLOWED_CODEX_PROFILES:
        raise ValueError(f"codex profile {profile!r} not in allowlist {ALLOWED_CODEX_PROFILES}")
    return profile
```

### 8.2 HMAC nonce ≥32 bytes (codex r1 D2 S4 P1)

Per codex r1 D2 S4: HMAC nonce entropy 16 bytes not ≥32. Change to `secrets.token_urlsafe(32)`. Applied in §5.2 + tools/hmac_gate.py. Plan Task 25 covers regression test asserting ≥32-byte entropy.

### 8.3 OAuth ACL via icacls (codex r1 D2 S6 P1)

Per codex r1 D2 S6: OAuth credential file ACL unverified. Run `icacls Z:/claude-sota-installed-state/.codex/auth.json` at doctor-time + require owner-only. Implementation: doctor extension covered in §7.4. Plan Task 22 covers icacls assertion.

## 9. Error handling

- **`spawn_agent_server` /ready timeout (>60s)** → raise `RuntimeError("agent-server /ready timeout in 60s")` → workflow retries per RetryPolicy (max 5 per §6.7) → if exhausted, FAILED with cause
- **`docker.errors.APIError` on `containers.run`** → raise `RuntimeError("docker-py spawn failed: <err>")` → same retry path
- **`SandboxCapacityExceeded`** → `ApplicationError("capacity", type="SandboxCapacityExceeded", non_retryable=False)` → retryable bounce; queue or backpressure per §5.9
- **`conv.send_message` sync raise** → wrap in `try/except` → log + raise to Temporal → activity-level retry per RetryPolicy
- **OAuth token expired during run** → **CALLER-DRIVEN refresh** (codex r4 D1-finding-2 false-contract fix per S1 §8 verbatim audit): `Conversation` does NOT auto-refresh OAuth tokens internally. The W376 activity body MUST call `subscription_login_async(...)` itself BEFORE constructing the `Agent`/`Conversation` (verified against installed `openhands-sdk==1.22.1` source — there is no `auth.refresh_if_needed()` automatic hook inside `LocalConversation.run()` or per-event callbacks). On `AuthenticationError` raised mid-`conv.run()`, activity raises `RuntimeError` → Temporal RetryPolicy bounces the activity → next-attempt body re-runs `subscription_login_async()` at top BEFORE constructing the new `Agent`. Cite: `openhands-sdk==1.22.1` `auth/subscription.py:subscription_login_async` + `conversation/local_conversation.py` (no auth-refresh side-effect call site).
- **Container orphan on worker crash** → `tools/dispatch_temporal.py reconcile` verb sweeps via `docker ps --filter "label=w375.purpose=per-task-isolation"` — already in W375 CLI, extended per §7.4
- **L0 TaskSpec invalid** → `ApplicationError(non_retryable=True, type="TaskSpecError")` per §6.10 — IMMEDIATE FAILED (no retry waste)

## 10. Testing

### Unit tests (mocked SDK boundary)
- `tests/test_workspace_factory.py` — 4-case truth-table (local/remote × ctx-present/absent)
- `tests/test_agent_server_spawn.py` — mocked docker.from_env(), test spawn → env-pre-spawn → /ready → return ctx + cleanup paths
- `tests/test_temporal_worker.py` — updated to mock callbacks pattern (NOT stream_events)
- `tests/test_sandbox_semaphore.py` — host-capacity backpressure
- `tests/test_jury_quota_ledger.py` — 5h rolling-spend window
- `tests/test_admission_coordinator.py` — idempotency + retry budget + oscillation
- `tests/test_container_hardening.py` — parametric: read_only/cap_drop/pids_limit/127.0.0.1
- `tests/test_egress_allowlist.py` — gateway allow/deny matrix
- `tests/test_hmac_nonce_entropy.py` — nonce ≥32 bytes

### Live e2e (real OpenHands SDK + Docker daemon + OAuth cached)
- `tests/e2e/test_w376_local_mode.py` — ECHO smoke via LocalWorkspace, asserts `TaskResult.status=COMPLETE` + jury_verdict in {ACCEPT, DETERMINISTIC-PASS}
- `tests/e2e/test_w376_remote_mode.py` — ECHO smoke via RemoteWorkspace, asserts same + zero orphan containers
- `tests/e2e/test_w376_egress_allowlist.py` — task that tries to reach RFC1918 → denied
- `tests/e2e/test_w376_otel_replay.py` — Langfuse-disconnect → spool → reconnect → replay → spans visible

### Codex review gate
- codex r2 (post-spec-v3) — 6-dim parallel re-fire targeting all 6 dims APPROVE 0.85+
- codex r3-r6 if any dim still BLOCKs
- codex r-final adversarial on final commit. APPROVE 0.85+ required.

## 11. Validation & SHIP gate

| Gate | Criterion |
|---|---|
| Unit tests | 100% pass on tests/test_workspace_factory + tests/test_agent_server_spawn + tests/test_temporal_worker + new W376 tests |
| Live LocalWorkspace e2e | `dispatch_temporal submit --workspace-mode local --i-trust-this-task "Reply with 'OPENHANDS_W376_LOCAL_OK'"` returns `TaskResult.status=COMPLETE` |
| Live RemoteWorkspace e2e | `dispatch_temporal submit --workspace-mode remote "Reply with 'OPENHANDS_W376_REMOTE_OK'"` returns `TaskResult.status=COMPLETE` + zero orphan containers + egress allowlist enforced |
| Codex r2-r6 | All 6 dims APPROVE 0.85+ |
| Codex r-final | APPROVE 0.85+ (W376 final commit) |
| Pre-commit 9-gate | All green on every commit (no `--no-verify`) |
| Carry-forwards | C10 DONE / C11 DONE / C12 DONE / C24 DONE (R1 in-wave) |
| PR | Amend onto #33 OR new PR on top of #33 once merged |

## 12. Out of scope (carry to W377+)

- C13 structured-output mandate on L1/L2/L3 chain (W377-S4)
- C14 graph-state-machine run loop (W378+)
- C15 L3 jury verify-step layer (W377-S1)
- C16 MeanVariancePoolUnit L3-jury aggregation (W377-S2)
- C17 Goose recipe YAML schema (W377-S5)
- C18 N-worker cap in preagent-parallel-guard (W377-S3)
- C19-C22 codex r1 P1 deferrals (D4 P5-10 + D5 O6-10 + D3 R7 + D3 R8)
- C25 Agent default toolset (W377+)
- C26 13 deferred CLI verbs (W378+)
- **C27a OTel-protobuf serialization primitive: DONE in-wave** (codex r4 D5-finding-2 split — Task 22)
- **C27b OTel replay loop full wiring: DEFERRED W377+** (codex r4 D5-finding-2 split — recovery-pump
  into live OTLP exporter when upstream collector recovers is OUT of W376 scope)
- SWE-Bench-Verified-50 full eval ramp (W377+)
- Cognee migration of vector store (per W372 backlog)

## 13. Cardinal-rule conformance

- **CR-1**: All cite-anchors org-distinct (20 orgs per SYNTHESIS §17), SHA-pinned where applicable, MIT/Apache-2.0/preprint licensed
- **CR-2**: No project-owned hook bodies introduced; cr6 commit-msg hook from W375 unchanged
- **CR-3**: All agent dispatches use FQN form; `general-purpose` allowed for the 12 research streams
- **CR-4**: Project behavior in `.mcp.json` + `.pre-commit-config.yaml`; no ad-hoc rules
- **CR-5**: codex `--sandbox read-only --ephemeral`; docker container per-task network + container hardening + egress allowlist + label-based reconcile
- **CR-6**: Every claim in this spec cites either upstream SDK source line OR W375 lineage commit SHA OR codex r1 D-N finding line; verify-before-claim enforced (e.g., §15.3 + §16.3 Langfuse DOWN-CRASH-LOOP correction)
- **CR-7 (proposed)**: SDK-boundary tests — every SDK API call in production code must have a unit test that pins the actual API shape (not a mock of an assumed shape). Prevents future DIM-15..20-class drift.

## 14. Wave-close criteria

- All 12 research stream findings docs committed (S1-S8 + S9-S12)
- SYNTHESIS.md v3 (post codex r1 D6 fixes) committed
- 6+ codex round transcripts committed (r1 6-dim + r2-r6 + r-final)
- VERDICT-LEDGER.md + PR-BODY.md authored
- T6 basic-memory note written (`mcp__basic-memory__write_note` waves/W376-...)
- Both live e2e modes green (local + remote + egress allowlist enforced + zero-orphan)
- Codex r-final APPROVE 0.85+
- PR open (amend #33 OR new)

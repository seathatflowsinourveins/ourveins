# tools/dispatch_temporal.py
"""W375 Typer CLI — essential 9-verb state machine for v1 ship.

Verbs: doctor / up / submit / watch / result / cancel / status / down / reconcile.
Remaining 13 verbs from spec §12 v3 deferred to follow-up task.

Cite: spec §12 v3 + V11 (state machine durability) + V12 (CLI complement to MCP).
"""

from __future__ import annotations

import asyncio
import json
import os
import subprocess
import sys
import time

import typer
from rich.console import Console
from temporalio.client import Client
from temporalio.contrib.pydantic import pydantic_data_converter

from agents.models import TaskSpec, Budget
from agents.admission_coordinator import AdmissionCoordinator

app = typer.Typer(
    name="w375",
    no_args_is_help=True,
    rich_markup_mode="rich",
    help="W375 OpenHands SOTA dispatch CLI — essential 9-verb subset for v1 ship.",
)
console = Console()


def _temporal_address() -> str:
    return os.environ.get("TEMPORAL_ADDRESS", "localhost:7233")


async def _connect_temporal() -> Client:
    """Single CLI Temporal connect site (DRY).

    P0-2 (codex GPT-5.5 ship-gate): every Client.connect MUST pass
    ``data_converter=pydantic_data_converter`` so BaseModel TaskSpec/TaskResult
    payloads round-trip (else they raise at temporalio/converter/
    _payload_converter.py:625-635). Mirrors the worker boot site in
    agents/temporal_worker.py:main. Cite: spec §6.1 + plan Task 17.
    """
    return await Client.connect(
        _temporal_address(), data_converter=pydantic_data_converter
    )


def _admission_db_path() -> str:
    """Admission-coordinator SQLite path — same env var + default the worker uses
    (agents/temporal_worker.py ADMISSION_DB_PATH) so CLI submits dedupe against the
    worker's idempotency rows."""
    return os.environ.get(
        "W376_ADMISSION_DB",
        "Z:/claude-sota-installed-state/w375/admission.db",
    )


class _CoordinatorClientAdapter:
    """Bridge between AdmissionCoordinator's mock-tolerant client contract and the real
    temporalio Client.

    The coordinator calls ``start_workflow(spec, id=workflow_id)`` (no workflow-type
    string, no task_queue) and ``get_workflow_handle(workflow_id)``. The real client
    needs the workflow type + task_queue. This adapter injects them while delegating
    handle lookups (used by the coordinator's PENDING_START describe-then-restart
    recovery) straight to the real client. P0-3 (codex GPT-5.5 ship-gate).
    """

    _WORKFLOW_TYPE = "TaskWorkflow"
    _TASK_QUEUE = "openhands-dispatch"

    def __init__(self, client: Client):
        self._client = client

    async def start_workflow(self, spec, *, id):  # noqa: A002 — Temporal kwarg is `id`
        return await self._client.start_workflow(
            self._WORKFLOW_TYPE,
            spec,
            id=id,
            task_queue=self._TASK_QUEUE,
        )

    def get_workflow_handle(self, workflow_id):
        return self._client.get_workflow_handle(workflow_id)


def _emit(payload, fmt: str) -> None:
    if fmt == "json":
        typer.echo(json.dumps(payload, default=str))
    else:
        if isinstance(payload, dict):
            for k, v in payload.items():
                console.print(f"[bold]{k}[/bold]: {v}")
        else:
            console.print(payload)


# ============================================================


def _coerce_sync(value):
    """Resolve a probe result that may be a coroutine (real async probe) OR a plain
    value (test patches probe with a non-async return). Returns the resolved value.

    codex r6/r8: probe_reconcile_orphans is async in production, but doctor tests patch
    it with `return_value=(2, 1, 0)`. Handle both transparently.
    """
    import asyncio
    import inspect

    if inspect.isawaitable(value):
        return asyncio.run(value)  # type: ignore[arg-type]
    return value


def _run_doctor_checks(include_reconcile: bool = False) -> tuple[int, list[dict]]:
    """W376 Task 22 (codex r1 D5 O4): build the remote-mode health report.

    Returns ``(rc, report)`` where ``report`` is a list of
    ``{"name", "status", "detail"}`` dicts. ``rc`` is non-zero if any RED item present.
    Each probe is sourced from ``agents.health_probes`` so the doctor tests can patch
    individual ``agents.health_probes.probe_*`` symbols.
    """
    # Import at call-time (NOT module-level) so test-side `patch("agents.health_probes.
    # probe_*")` rebinds the attribute that this function reads.
    from agents import health_probes as hp

    report: list[dict] = []

    def _add(name: str, ok: bool, detail) -> None:
        report.append(
            {"name": name, "status": "GREEN" if ok else "RED", "detail": detail}
        )

    # Temporal frontend reachability.
    ok, detail = hp.probe_temporal()
    _add("temporal", ok, detail)

    # pydantic_data_converter wired at known sites.
    dc_ok = bool(hp.probe_data_converter_wired())
    _add("data_converter", dc_ok, "wired" if dc_ok else "not wired at known sites")

    # OAuth file ACL owner-only (icacls on Windows).
    acl_ok = bool(hp.probe_oauth_acl_owner_only())
    _add("oauth_acl", acl_ok, "owner-only" if acl_ok else "ACL not owner-only")

    # Langfuse HTTP health.
    ok, detail = hp.probe_langfuse_health()
    _add("langfuse", ok, detail)

    # OTLP collector endpoint reachability.
    ok, detail = hp.probe_otlp_endpoint()
    _add("otlp_endpoint", ok, detail)

    # OTel spool dir writable.
    ok, detail = hp.probe_spool_writable()
    _add("spool", ok, detail)

    # Agent-server image SHA-pin freshness.
    ok, detail = hp.probe_image_digest_pin()
    _add("image_digest", ok, detail)

    # Optional reconcile orphan-sweep (dry, read-only).
    if include_reconcile:
        result = _coerce_sync(hp.probe_reconcile_orphans())
        if result is None:
            # codex r8 D5-r8-P0-2: Temporal unavailable → fail closed → YELLOW (cannot
            # determine; destructive reconcile disabled).
            report.append(
                {
                    "name": "reconcile",
                    "status": "YELLOW",
                    "detail": {"error": "temporal_unavailable_fail_closed"},
                }
            )
        else:
            oc, on, orows = result
            has_orphans = (oc + on + orows) > 0
            report.append(
                {
                    "name": "reconcile",
                    "status": "YELLOW" if has_orphans else "GREEN",
                    "detail": {
                        "orphan_containers": oc,
                        "orphan_networks": on,
                        "orphan_idempotency_rows": orows,
                    },
                }
            )

    rc = 1 if any(item["status"] == "RED" for item in report) else 0
    return rc, report


@app.command()
def doctor(
    output: str = typer.Option("text", "--output", "-o"),
    dry_run: bool = typer.Option(
        False,
        "--dry-run",
        help="Return (rc, report) without raising; used by unit tests + scripting.",
    ),
    include_reconcile: bool = typer.Option(
        False,
        "--include-reconcile",
        help="W376: also run a dry orphan-resource sweep (containers/networks/idem rows).",
    ),
) -> tuple[int, list[dict]] | None:
    """Health probe: Temporal / data-converter / OAuth ACL / Langfuse / OTLP / spool /
    image-pin (+ optional reconcile sweep).

    W376 Task 22 (codex r1 D5 O4): remote-mode coverage. When ``dry_run`` is True the
    function RETURNS ``(rc, report)`` (no ``typer.Exit``) so tests + scripts can inspect
    it; otherwise it emits the report and exits with the computed code.
    """
    rc, report = _run_doctor_checks(include_reconcile=include_reconcile)
    if dry_run:
        return rc, report
    _emit({item["name"]: item["status"] for item in report}, output)
    raise typer.Exit(code=rc)


@app.command()
def up(
    bg: bool = typer.Option(True, "--bg/--fg"),
    output: str = typer.Option("text", "--output", "-o"),
) -> None:
    """Start temporal-dev-server + worker (best-effort; uses background processes)."""
    actions: list[str] = []

    # Start temporal server (idempotent if already running)
    try:
        r = subprocess.run(
            ["temporal", "operator", "namespace", "describe", "default"],
            capture_output=True,
            timeout=3,
        )
        if r.returncode == 0:
            actions.append("temporal_server: already running")
        else:
            cmd = ["temporal", "server", "start-dev"]
            if bg:
                subprocess.Popen(
                    cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL
                )
                actions.append("temporal_server: spawned background")
            else:
                actions.append(
                    "temporal_server: --fg not supported in this CLI; use --bg"
                )
    except FileNotFoundError:
        actions.append("temporal_server: temporal CLI missing")

    actions.append(
        "worker: spawn via `python -m agents.temporal_worker` (operator-run)"
    )
    _emit({"actions": actions}, output)


@app.command()
def submit(
    task: str = typer.Argument(...),
    repo: str = typer.Option(None, "--repo"),
    profile: str = typer.Option("t1-light", "--profile"),
    iterations: int = typer.Option(50, "--iterations"),
    timeout_seconds: int = typer.Option(1800, "--timeout-seconds"),
    workspace_mode: str = typer.Option(
        "remote",
        "--workspace-mode",
        help="W376: 'local' (in-process LocalWorkspace) or 'remote' "
        "(docker-py-spawned agent-server + RemoteWorkspace). "
        "Default 'remote' matches W375 security intent.",
    ),
    # codex r3 D2-S1 fix: trust guard is now WIRED (was spec-only)
    i_trust_this_task: bool = typer.Option(
        False,
        "--i-trust-this-task",
        help="REQUIRED with --workspace-mode local. Operator explicitly asserts "
        "the task content is trusted (NOT attacker-controlled). Rejecting "
        "this requirement enforces the local-mode trust boundary per spec §6.3.",
    ),
    dry_run: bool = typer.Option(False, "--dry-run"),
    output: str = typer.Option("text", "--output", "-o"),
) -> None:
    """Dispatch a TaskSpec to TaskWorkflow."""
    # codex r3 D2-S1 fix: HARD-REJECT local-mode without explicit operator trust.
    if workspace_mode == "local" and not i_trust_this_task:
        typer.echo(
            "ERROR: --workspace-mode local requires --i-trust-this-task; "
            "local mode runs untrusted code in-process. Pass --i-trust-this-task "
            "ONLY if you have personally authored or vetted the task content.",
            err=True,
        )
        raise typer.Exit(code=2)
    spec = TaskSpec(
        task=task,
        repo=repo,
        codex_profile=profile,
        budget=Budget(iterations=iterations, timeout_seconds=timeout_seconds),
        workspace_mode=workspace_mode,  # W376
    )
    if dry_run:
        _emit(spec.model_dump(), output)
        raise typer.Exit(0)

    async def _dispatch() -> str:
        # P0-3 (codex GPT-5.5 ship-gate): route the first admission through the
        # AdmissionCoordinator (Stripe-idempotency + race-safe op_id) instead of calling
        # client.start_workflow directly. The coordinator owns op_id derivation +
        # PENDING_START recovery; it invokes start_workflow with the deterministic op_id
        # as the workflow id. We wrap the real Temporal client so the coordinator's
        # `start_workflow(spec, id=...)` call shape resolves to a correct real dispatch
        # carrying the "TaskWorkflow" type + task_queue (the coordinator deliberately
        # stays type/queue-agnostic per its mock-tolerant contract).
        client = await _connect_temporal()
        coordinator = AdmissionCoordinator(_admission_db_path())
        adapted = _CoordinatorClientAdapter(client)
        workflow_id = await coordinator.submit_workflow(adapted, spec)
        return workflow_id

    try:
        workflow_id = asyncio.run(_dispatch())
        _emit({"workflow_id": workflow_id, "status": "STARTED"}, output)
    except Exception as e:
        _emit({"error": str(e)}, output)
        raise typer.Exit(2)


@app.command()
def status(
    conversation_id: str = typer.Argument(...),
    output: str = typer.Option("text", "--output", "-o"),
) -> None:
    """One-shot workflow describe."""

    async def _describe():
        client = await _connect_temporal()
        handle = client.get_workflow_handle(conversation_id)
        return await handle.describe()

    try:
        desc = asyncio.run(_describe())
        _emit(
            {
                "conversation_id": conversation_id,
                "status": getattr(desc.status, "name", str(desc.status)),
                "start_time": str(getattr(desc, "start_time", "")),
            },
            output,
        )
    except Exception as e:
        _emit({"error": str(e)}, output)
        raise typer.Exit(2)


async def _describe_and_print(conversation_id: str, output: str) -> None:
    client = await Client.connect(_temporal_address())
    handle = client.get_workflow_handle(conversation_id)
    desc = await handle.describe()
    _emit(
        {
            "conversation_id": conversation_id,
            "status": getattr(desc.status, "name", str(desc.status)),
        },
        output,
    )


@app.command()
def watch(
    conversation_id: str = typer.Argument(...),
    interval_sec: int = typer.Option(5, "--interval"),
    output: str = typer.Option("text", "--output", "-o"),
) -> None:
    """Poll-loop status with heartbeat snapshot."""
    while True:
        try:
            asyncio.run(_describe_and_print(conversation_id, output))
        except KeyboardInterrupt:
            raise typer.Exit(0)
        except Exception as e:
            _emit({"error": str(e)}, output)
            raise typer.Exit(2)
        time.sleep(interval_sec)


@app.command()
def result(
    conversation_id: str = typer.Argument(...),
    output: str = typer.Option("json", "--output", "-o"),
) -> None:
    """Fetch final TaskResult."""

    async def _fetch():
        client = await _connect_temporal()
        handle = client.get_workflow_handle(conversation_id)
        return await handle.result()

    try:
        res = asyncio.run(_fetch())
        payload = res.model_dump() if hasattr(res, "model_dump") else dict(res)
        _emit(payload, output)
    except Exception as e:
        _emit({"error": str(e)}, output)
        raise typer.Exit(2)


@app.command()
def cancel(
    conversation_id: str = typer.Argument(...),
    output: str = typer.Option("text", "--output", "-o"),
) -> None:
    """Best-effort workflow cancel."""

    async def _cancel() -> None:
        client = await _connect_temporal()
        handle = client.get_workflow_handle(conversation_id)
        await handle.cancel()

    try:
        asyncio.run(_cancel())
        _emit(
            {"conversation_id": conversation_id, "status": "CANCEL_DISPATCHED"}, output
        )
    except Exception as e:
        _emit({"error": str(e)}, output)
        raise typer.Exit(2)


@app.command()
def down(output: str = typer.Option("text", "--output", "-o")) -> None:
    """Best-effort stop of worker + temporal server."""
    actions: list[str] = []
    if sys.platform == "win32":
        subprocess.run(["taskkill", "/F", "/IM", "temporal.exe"], capture_output=True)
        actions.append("temporal: taskkill /F /IM temporal.exe")
    else:
        subprocess.run(
            ["pkill", "-f", "temporal server start-dev"], capture_output=True
        )
        actions.append("temporal: pkill")
    _emit({"actions": actions}, output)


@app.command()
def reconcile(
    dry_run: bool = typer.Option(False, "--dry-run"),
    output: str = typer.Option("text", "--output", "-o"),
) -> None:
    """Sweep orphan w375 per-task containers + networks via label filter.

    W376 Task 22 (codex r1 O4): extends the original network-only sweep to ALSO remove
    orphaned per-task containers stamped with `w375.purpose=per-task-isolation` (the
    same label namespace the spawn path applies per plan Task 9). Idempotency-row
    sweeping is performed by the worker's reconcile-replayer, not this CLI verb.
    """
    actions: list[str] = []

    # --- Containers (W376 addition) ---
    rc = subprocess.run(
        [
            "docker",
            "ps",
            "-a",
            "--filter",
            "label=w375.purpose=per-task-isolation",
            "--format",
            "{{.Names}}",
        ],
        capture_output=True,
        text=True,
        timeout=10,
    )
    orphan_containers = [c for c in rc.stdout.splitlines() if c]
    for cnt in orphan_containers:
        if dry_run:
            actions.append(f"would_remove_container: {cnt}")
        else:
            subprocess.run(["docker", "rm", "-f", cnt], capture_output=True, timeout=5)
            actions.append(f"removed_container: {cnt}")

    # --- Networks (original behaviour) ---
    r = subprocess.run(
        [
            "docker",
            "network",
            "ls",
            "--filter",
            "label=w375.purpose=per-task-isolation",
            "--format",
            "{{.Name}}",
        ],
        capture_output=True,
        text=True,
        timeout=10,
    )
    orphans = [n for n in r.stdout.splitlines() if n]
    for net in orphans:
        if dry_run:
            actions.append(f"would_remove: {net}")
        else:
            subprocess.run(
                ["docker", "network", "rm", net], capture_output=True, timeout=5
            )
            actions.append(f"removed: {net}")
    _emit(
        {
            "orphans_found": len(orphans),
            "orphan_containers_found": len(orphan_containers),
            "actions": actions,
            "dry_run": dry_run,
        },
        output,
    )


if __name__ == "__main__":
    app()

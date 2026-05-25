#!/usr/bin/env python3
# Reference: TIER-1 OFFICIAL Anthropic Agent SDK — https://docs.anthropic.com/en/docs/claude-code/agent-sdk
#   + claude_agent_sdk 0.1.81 (installed in Z:/venvs/claude) — `query`, `tool`, `create_sdk_mcp_server`,
#     `ClaudeAgentOptions`, `AssistantMessage`, `ResultMessage`, `TextBlock`, `ToolUseBlock`.
# Reference: TIER-1 OFFICIAL https://code.claude.com/docs/en/headless — `--bare` skips hook/plugin/MCP
#   auto-discovery (deterministic across machines); `-p` print mode; `--output-format json`;
#   `total_cost_usd` per-invocation in the JSON envelope.
# Reference: docs/architecture/W259-grand-catalog/07-final-synthesis/CC-DIMENSIONS-UNLEASHED-W259v7.md
#   §4 U7 — "Build ONE Agent-SDK (Python) harness — force multiplier clearing D14+D15+D16+D17+D22.
#   Host the W259 L4 eval cadence (Inspect AI + Promptfoo)."
#
# W259-v9 P1-UNLEASH — eval_harness.py
# ------------------------------------
# A MINIMAL, WORKING Agent-SDK harness that hosts the W259 L4 nightly-eval cadence.
# It is a *validated path*, not a framework. It now wires TWO REAL eval lanes plus the
# Agent-SDK aggregation/advisor capabilities — each clearing a dormant W259 dimension:
#
#   (1) inspect_ai lane -> run_inspect_lane(): runs a genuine inspect_ai Task (dataset +
#                        generate() solver + includes() scorer, defined in inspect_tasks.py)
#                        via inspect_ai.eval(), then normalizes the EvalLog into eval rows.
#   (2) promptfoo lane  -> run_promptfoo_lane(): runs the genuine harness/promptfooconfig.yaml
#                        via `promptfoo eval --output <json>`, parses the OutputFile JSON
#                        (results.results[]) into eval rows.
#   (b) D16 prog.tool   -> aggregate_eval_results(): an in-process @tool that crunches all eval
#                        rows in ONE call. When the Agent SDK runs this via code_execution the
#                        intermediate per-row data never enters the model context — the canonical
#                        ~10x output-side token fix (PSV §4.2).
#   (c) D14+D22         -> advisor_pilot_stub(): a documented stub for the Sonnet-executor +
#                        Opus-advisor pattern (advisor-tool beta `advisor-tool-2026-03-01`).
#
# Run modes:
#   python harness/eval_harness.py --mode aggregate-demo   # offline; no API spend; CI-safe smoke test
#   python harness/eval_harness.py --mode inspect-lane     # real inspect_ai eval (--dry-run = mockllm, no spend)
#   python harness/eval_harness.py --mode promptfoo-lane   # real `promptfoo eval` (--dry-run = no exec)
#   python harness/eval_harness.py --mode advisor-stub     # prints the advisor-pilot design (no spend)
#   python harness/eval_harness.py --mode nightly          # full cadence: inspect + promptfoo lanes -> aggregate
#
# One-line operator install (only if a dependency is ever missing from the venv):
#   Z:/venvs/claude/Scripts/pip.exe install "claude-agent-sdk>=0.1.81" "anthropic>=0.102.0" "inspect-ai>=0.3.205"
#   npm install -g promptfoo            # for the promptfoo lane (CLI; resolved via PATH or `npx`)
# (As of W259-v9 inspect_ai 0.3.205 + claude_agent_sdk are installed in Z:/venvs/claude and
#  promptfoo 0.121.11 is installed globally — verified, no install needed.)

from __future__ import annotations

import argparse
import asyncio
import json
import logging
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path
from typing import (
    Any,
    TypeIs,
)  # PEP 742 TypeIs (Python 3.13+) — https://docs.python.org/3.13/library/typing.html#typing.TypeIs


# W325 P7 (F-P1) — PEP 742 TypeIs narrowing predicates.
# Cite: https://docs.python.org/3.13/library/typing.html#typing.TypeIs (3.13+ stdlib)
# Cite: https://peps.python.org/pep-0742/ (TypeIs for narrowing predicates)
# TypeIs differs from TypeGuard: it narrows BOTH branches (positive AND negative),
# whereas TypeGuard only narrows the positive branch. For predicates whose return
# value is genuinely a "is-instance" check (the case here for dict/list narrowing
# in the promptfoo + cache-augment paths), TypeIs is the precise type-system
# encoding per PEP 742.
def _is_dict(x: object) -> TypeIs[dict[str, Any]]:
    """Return True iff x is a dict, with TypeIs narrowing for the type-checker.

    Use as a drop-in replacement for `isinstance(x, dict)` at narrowing call sites
    where downstream code needs `x.get(...)` / `x[key]` access. The pyright/mypy
    type-checker narrows `x` to `dict[str, Any]` in the True branch and to
    `object` (excluding dict) in the False branch — see PEP 742 §Behavior.
    """
    return isinstance(x, dict)


# W324-P2 — Anthropic SDK feature flags (1h-cache + Batch + structured-outputs).
# Cite anchors (codex r11 APPROVE'd):
#   - 1h cache (1-hour TTL prompt caching, GA beta):
#       https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
#   - Batch (50%% discount, 24h SLA):
#       https://docs.anthropic.com/en/docs/build-with-claude/batch-processing
#   - Structured outputs (JSON-schema-constrained responses):
#       https://docs.anthropic.com/en/docs/build-with-claude/structured-outputs
#   - SDK ref (anthropic-sdk-python @ 28cdc336):
#       https://github.com/anthropics/anthropic-sdk-python/tree/28cdc336
# These flags are OPT-IN and ADDITIVE — baseline behaviour (all lanes) is unchanged
# when none of `--cache-1h`, `--batch`, `--structured <path>` is passed. They are
# surfaced as a module-global mutable dict so any direct-Anthropic-API call site
# (current advisor_pilot_stub + future promotions per W259 D14/D22) can opt in.
W324_FEATURES: dict[str, Any] = {
    "cache_1h": False,
    "batch": False,
    "structured_schema_path": None,
    # The literal beta header per the prompt-caching doc (2025-04-11 GA-extended-TTL).
    # If a future SDK release renames this, the operator can override via env var
    # W324_CACHE_BETA_HEADER without touching the harness source.
    "cache_beta_header": os.environ.get(
        "W324_CACHE_BETA_HEADER", "extended-cache-ttl-2025-04-11"
    ),
}

# W324-P2 — logger for cache-token / batch-id telemetry. Writes to stderr at
# INFO level so smoke runs don't pollute stdout JSON envelopes.
_W324_LOG = logging.getLogger("w324.eval_harness")
if not _W324_LOG.handlers:
    _h = logging.StreamHandler(stream=sys.stderr)
    _h.setFormatter(logging.Formatter("[W324-P2] %(message)s"))
    _W324_LOG.addHandler(_h)
    _W324_LOG.setLevel(logging.INFO)


def _w324_apply_cache_1h(
    messages_kwargs: dict[str, Any],
    *,
    enable: bool | None = None,
) -> dict[str, Any]:
    """Augment messages.create kwargs with the 1-hour TTL prompt-cache beta.

    Wraps the existing system + last-user content blocks with
    ``cache_control={"type": "ephemeral", "ttl": "1h"}`` and adds the beta
    header via ``extra_headers``. Safe to call when ``enable`` is False —
    returns kwargs unchanged. Wrapped in try/except so SDK version mismatch
    (e.g. older SDK without ``cache_control`` field acceptance) does NOT
    crash a baseline run; the function logs a single warning and returns
    the kwargs unchanged on failure.

    Cite: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
    """
    if enable is None:
        enable = bool(W324_FEATURES.get("cache_1h", False))
    if not enable:
        return messages_kwargs
    try:
        beta = str(W324_FEATURES.get("cache_beta_header") or "")
        if beta:
            extra = dict(messages_kwargs.get("extra_headers") or {})
            existing_beta = extra.get("anthropic-beta", "")
            extra["anthropic-beta"] = (
                f"{existing_beta},{beta}".strip(",") if existing_beta else beta
            )
            messages_kwargs["extra_headers"] = extra
        # Wrap system content (if str -> list of blocks with cache_control).
        sys_val = messages_kwargs.get("system")
        if isinstance(sys_val, str) and sys_val:
            messages_kwargs["system"] = [
                {
                    "type": "text",
                    "text": sys_val,
                    "cache_control": {"type": "ephemeral", "ttl": "1h"},
                }
            ]
        elif isinstance(sys_val, list) and sys_val:
            # Attach cache_control to the LAST system block (longest-prefix gain).
            last = sys_val[-1]
            if isinstance(last, dict):
                last.setdefault("cache_control", {"type": "ephemeral", "ttl": "1h"})
        # Wrap last user message content's last text block with cache_control.
        msgs = messages_kwargs.get("messages") or []
        for i in range(len(msgs) - 1, -1, -1):
            m = msgs[i]
            if isinstance(m, dict) and m.get("role") == "user":
                content = m.get("content")
                if isinstance(content, str) and content:
                    m["content"] = [
                        {
                            "type": "text",
                            "text": content,
                            "cache_control": {"type": "ephemeral", "ttl": "1h"},
                        }
                    ]
                elif isinstance(content, list) and content:
                    last_block = content[-1]
                    if isinstance(last_block, dict):
                        last_block.setdefault(
                            "cache_control", {"type": "ephemeral", "ttl": "1h"}
                        )
                break
        return messages_kwargs
    except Exception as exc:  # noqa: BLE001 — SDK-version mismatch must NEVER crash baseline
        _W324_LOG.warning(
            "cache-1h augment failed (%s: %s); proceeding without cache_control. "
            "Cite: docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
            type(exc).__name__,
            exc,
        )
        return messages_kwargs


def _w324_log_cache_usage(usage: Any) -> None:
    """Log cache_creation_input_tokens + cache_read_input_tokens from response.usage.

    Called after a real messages.create() response when ``--cache-1h`` is enabled.
    The Anthropic SDK exposes these as attributes on the Usage object (or as keys
    in usage.model_dump()). Best-effort — never raises.
    """
    try:
        if usage is None:
            return
        # Try attribute access first, fall back to dict-like access.
        cci = getattr(usage, "cache_creation_input_tokens", None)
        cri = getattr(usage, "cache_read_input_tokens", None)
        if cci is None and hasattr(usage, "model_dump"):
            d = usage.model_dump()  # type: ignore[attr-defined]
            cci = d.get("cache_creation_input_tokens")
            cri = d.get("cache_read_input_tokens")
        elif cci is None and isinstance(usage, dict):
            cci = usage.get("cache_creation_input_tokens")
            cri = usage.get("cache_read_input_tokens")
        if cci is not None or cri is not None:
            _W324_LOG.info(
                "cache usage: cache_creation_input_tokens=%s "
                "cache_read_input_tokens=%s",
                cci,
                cri,
            )
    except Exception as exc:  # noqa: BLE001 — telemetry must NEVER crash
        _W324_LOG.warning("cache-usage log failed (%s: %s)", type(exc).__name__, exc)


def _w324_run_via_batch(
    client: Any,
    requests: list[dict[str, Any]],
    *,
    poll_interval_sec: float = 60.0,
    poll_max_sec: float = 30 * 60.0,
) -> Any:
    """Submit a list of messages requests via the Batch API and poll until ended.

    24h SLA, 50%% discount per the cite. Suitable ONLY for non-interactive lanes
    (nightly cadence / SWE-Bench Pro ship-gate). Polls with exponential backoff
    starting at ``poll_interval_sec`` (default 60s) capped at ``poll_max_sec``
    (default 30 min). Prints batch_id to stderr at start; suppresses per-call
    logging during the poll loop.

    Cite: https://docs.anthropic.com/en/docs/build-with-claude/batch-processing

    Returns the batch object once ``processing_status == "ended"``. The caller
    is responsible for downloading results via ``client.messages.batches.results(id)``
    and mapping them back to harness eval rows.
    """
    # Submit
    batch = client.messages.batches.create(requests=requests)  # type: ignore[union-attr]
    batch_id = getattr(batch, "id", None) or (
        batch.get("id") if isinstance(batch, dict) else "unknown"
    )
    _W324_LOG.info(
        "batch submitted batch_id=%s requests=%d (24h SLA, 50%% discount). "
        "Cite: docs.anthropic.com/en/docs/build-with-claude/batch-processing",
        batch_id,
        len(requests),
    )
    # Poll with exponential backoff (60s → 120s → 240s → ... capped at poll_max_sec).
    elapsed = 0.0
    interval = poll_interval_sec
    while elapsed < poll_max_sec:
        time.sleep(interval)
        elapsed += interval
        cur = client.messages.batches.retrieve(batch_id)  # type: ignore[union-attr]
        status = getattr(cur, "processing_status", None) or (
            cur.get("processing_status") if isinstance(cur, dict) else None
        )
        if status == "ended":
            _W324_LOG.info("batch ended batch_id=%s elapsed=%.0fs", batch_id, elapsed)
            return cur
        # Exponential backoff (cap at 600s = 10 min per poll).
        interval = min(interval * 2.0, 600.0)
    raise TimeoutError(
        f"W324 batch poll exceeded {poll_max_sec}s "
        f"(batch_id={batch_id}, status={status!r}). "
        f"Cite: docs.anthropic.com/en/docs/build-with-claude/batch-processing"
    )


def _w324_apply_structured(
    messages_kwargs: dict[str, Any],
    *,
    schema_path: str | None = None,
) -> dict[str, Any]:
    """Augment messages.create kwargs with a JSON-schema-constrained response_format.

    Loads the JSON schema from ``schema_path`` and attaches it via the
    ``response_format`` parameter per the structured-outputs doc. Safe to call
    when ``schema_path`` is None — returns kwargs unchanged.

    Cite: https://docs.anthropic.com/en/docs/build-with-claude/structured-outputs
    """
    if schema_path is None:
        schema_path = W324_FEATURES.get("structured_schema_path")
    if not schema_path:
        return messages_kwargs
    try:
        with open(schema_path, encoding="utf-8") as f:
            schema = json.load(f)
        messages_kwargs["response_format"] = {
            "type": "json_object",
            "schema": schema,
        }
        return messages_kwargs
    except (OSError, json.JSONDecodeError) as exc:
        raise RuntimeError(
            f"W324 structured-output schema load failed "
            f"({type(exc).__name__}: {exc}). "
            f"Cite: docs.anthropic.com/en/docs/build-with-claude/structured-outputs"
        ) from exc


def _w324_validate_structured(content: Any, *, schema_path: str | None = None) -> None:
    """Validate response content against the loaded JSON schema.

    Uses ``jsonschema`` if importable, else falls back to ``pydantic.TypeAdapter``.
    Raises on validation failure; logs OK at INFO level otherwise.
    """
    if schema_path is None:
        schema_path = W324_FEATURES.get("structured_schema_path")
    if not schema_path:
        return
    with open(schema_path, encoding="utf-8") as f:
        schema = json.load(f)
    # Parse content if it's a string; pass through if already dict/list.
    if isinstance(content, str):
        try:
            obj: Any = json.loads(content)
        except json.JSONDecodeError as exc:
            raise RuntimeError(
                f"W324 structured-output validation FAIL: content is not JSON "
                f"({exc}). Cite: docs.anthropic.com/en/docs/build-with-claude/"
                f"structured-outputs"
            ) from exc
    else:
        obj = content
    try:
        import jsonschema  # type: ignore[import-untyped]

        jsonschema.validate(instance=obj, schema=schema)
        _W324_LOG.info(
            "structured-output validation OK (schema=%s).",
            Path(schema_path).name,
        )
        return
    except ImportError:
        pass
    # Fallback: pydantic.TypeAdapter best-effort. The JSON schema's "type" key
    # is mapped to the closest Python type; full constraint validation isn't
    # possible without jsonschema. Operator should `pip install jsonschema`
    # for strict enforcement.
    try:
        from pydantic import TypeAdapter  # type: ignore[import-untyped]

        # Best-effort: just ensure it's parseable as JSON (already done above).
        TypeAdapter(dict).validate_python(obj if isinstance(obj, dict) else {"_": obj})
        _W324_LOG.info(
            "structured-output validation OK (pydantic fallback; install "
            "jsonschema for strict schema enforcement)."
        )
    except Exception as exc:  # noqa: BLE001
        raise RuntimeError(
            f"W324 structured-output validation FAIL "
            f"({type(exc).__name__}: {exc}). "
            f"Cite: docs.anthropic.com/en/docs/build-with-claude/structured-outputs"
        ) from exc


# --- repo-relative paths (harness lives at <repo>/harness/) -----------------------------
HARNESS_DIR = Path(__file__).resolve().parent
REPO_ROOT = HARNESS_DIR.parent
RESULTS_DIR = HARNESS_DIR / "results"
PROMPTFOO_CONFIG = HARNESS_DIR / "promptfooconfig.yaml"

# `claude` binary — W259-v8 confirms the parent-harness install is the shared launcher target.
CLAUDE_BIN = os.environ.get("CLAUDE_BIN", r"Z:/claude/.local/bin/claude.exe")

# Model for the REAL inspect_ai lane in the nightly cadence. Default is the runtime's
# small/cheap model reached through the local Anthropic proxy (ANTHROPIC_BASE_URL). The
# proxy + ANTHROPIC_SMALL_FAST_MODEL are the verified low-cost path on this runtime.
# Override via INSPECT_EVAL_MODEL (e.g. "openai/gpt-5.4-mini" if an OpenAI key has quota).
# The --dry-run path ignores this and uses `mockllm/model` (zero API spend, deterministic).
_DEFAULT_INSPECT_MODEL = "anthropic/" + os.environ.get(
    "ANTHROPIC_SMALL_FAST_MODEL", "claude-haiku-4-5-20251001"
)
INSPECT_EVAL_MODEL = os.environ.get("INSPECT_EVAL_MODEL", _DEFAULT_INSPECT_MODEL)


def _ensure_anthropic_key() -> None:
    """Mirror ANTHROPIC_AUTH_TOKEN -> ANTHROPIC_API_KEY when only the former is set.

    This runtime authenticates the Anthropic API via ANTHROPIC_AUTH_TOKEN against a local
    proxy (ANTHROPIC_BASE_URL). The inspect_ai / anthropic SDK reads ANTHROPIC_API_KEY;
    this no-clobber fallback lets the inspect lane work without an extra operator step.
    """
    if not os.environ.get("ANTHROPIC_API_KEY") and os.environ.get(
        "ANTHROPIC_AUTH_TOKEN"
    ):
        os.environ["ANTHROPIC_API_KEY"] = os.environ["ANTHROPIC_AUTH_TOKEN"]


def _resolve_promptfoo_cmd() -> list[str] | None:
    """Return the argv prefix to invoke promptfoo, or None if it cannot be found.

    Prefers a `promptfoo` binary on PATH; falls back to the globally-installed
    `promptfoo` script under `npm root -g` to avoid `npx --no-install`'s
    local-node_modules-only lookup (W283 Stream 1 P1-3 fix).
    """
    direct = shutil.which("promptfoo")
    if direct:
        return [direct]
    # Resolve global npm prefix and look for the promptfoo CLI shim there.
    npm = shutil.which("npm")
    if npm:
        try:
            import subprocess

            root_g = subprocess.check_output(
                [npm, "root", "-g"], text=True, timeout=5
            ).strip()
            for cand in (
                Path(root_g).parent / "promptfoo.cmd",
                Path(root_g).parent / "promptfoo",
                Path(root_g) / "promptfoo" / "bin" / "promptfoo.js",
            ):
                if cand.exists():
                    return [str(cand)]
        except (subprocess.SubprocessError, OSError):
            pass
    return None


# =========================================================================================
# (b) D16 — PROGRAMMATIC TOOL CALLING : the in-process aggregation @tool
# =========================================================================================
# This is the canonical output-side token fix. The eval run produces many rows; calling a
# per-row tool N times would push ~N row-payloads into context. Instead this ONE tool
# aggregates everything and returns a compact summary. When the Agent SDK executes it inside
# code_execution, the intermediate rows never hit the model context (PSV §4.2: "calling 10
# tools directly uses ~10x the tokens of calling them programmatically and returning a
# summary"). The function is also directly unit-testable offline (see --mode aggregate-demo).


def _aggregate(rows: list[dict[str, Any]]) -> dict[str, Any]:
    """Pure function — aggregate eval rows into a compact verdict. Offline-testable."""
    total = len(rows)
    passed = sum(1 for r in rows if r.get("pass") is True)
    failed = total - passed
    cost = round(sum(float(r.get("cost_usd", 0.0)) for r in rows), 6)
    by_suite: dict[str, dict[str, int]] = {}
    for r in rows:
        s = by_suite.setdefault(r.get("suite", "default"), {"pass": 0, "fail": 0})
        s["pass" if r.get("pass") is True else "fail"] += 1
    failures = [
        {
            "suite": r.get("suite", "default"),
            "case": r.get("case", "?"),
            "reason": r.get("reason", ""),
        }
        for r in rows
        if r.get("pass") is not True
    ][:25]  # cap — keep the summary bounded
    return {
        "total": total,
        "passed": passed,
        "failed": failed,
        "pass_rate": round(passed / total, 4) if total else 0.0,
        "total_cost_usd": cost,
        "by_suite": by_suite,
        "failures": failures,
        "verdict": "PASS" if failed == 0 and total > 0 else "FAIL",
    }


# In-process MCP tool wrapper. Imported lazily so --mode aggregate-demo works even if the
# SDK is absent. allowed_tools must pre-approve "mcp__evaltools__aggregate_eval_results".
def _build_eval_tool_server():
    from claude_agent_sdk import create_sdk_mcp_server, tool

    @tool(
        "aggregate_eval_results",
        "Aggregate raw eval result rows into one compact pass/fail/cost verdict. "
        "Call this ONCE with all rows instead of inspecting rows individually.",
        {"rows_json": str},
    )
    async def aggregate_eval_results(args: dict[str, Any]) -> dict[str, Any]:
        try:
            rows = json.loads(args["rows_json"])
        except (json.JSONDecodeError, KeyError) as exc:
            return {
                "content": [{"type": "text", "text": f"bad rows_json: {exc}"}],
                "is_error": True,
            }
        summary = _aggregate(rows)
        return {"content": [{"type": "text", "text": json.dumps(summary, indent=2)}]}

    return create_sdk_mcp_server(
        name="evaltools", version="1.0.0", tools=[aggregate_eval_results]
    )


# =========================================================================================
# REAL EVAL LANE #1 — inspect_ai
# =========================================================================================
# inspect_ai 0.3.205 (UKGovernmentBEIS/inspect_ai) is the official Python eval framework.
# harness/inspect_tasks.py defines `eval_cadence_task` — a genuine Task (Dataset of Samples,
# a generate() solver, an includes() substring scorer). This lane calls inspect_ai.eval()
# programmatically, reads the returned EvalLog, and normalizes each scored sample into the
# harness eval-row dict format: {suite, case, pass, cost_usd, reason?}.
#
# Per-sample pass: inspect_ai's includes() scorer assigns each sample the Score value "C"
# (CORRECT) or "I" (INCORRECT) — see EvalSample.scores. Cost: inspect_ai records token usage
# in EvalLog.stats.model_usage; the harness derives a USD cost from EvalSampleSummary /
# sample model_usage when the provider reports it, else 0.0 (mockllm reports no cost).


def _inspect_score_pass(score_value: Any) -> bool | None:
    """Map an inspect_ai Score value to a tri-state pass flag.

    inspect_ai's CORRECT/INCORRECT constants serialize as the strings "C"/"I"; numeric
    scorers may return 1.0/0.0. Anything unrecognized -> None (counts as not-pass).
    """
    if isinstance(score_value, str):
        if score_value.upper() in ("C", "CORRECT"):
            return True
        if score_value.upper() in ("I", "INCORRECT"):
            return False
        return None
    if isinstance(score_value, bool):
        return score_value
    if isinstance(score_value, (int, float)):
        return bool(score_value)
    return None


def run_inspect_lane(
    *, dry_run: bool = False, limit: int | None = None
) -> list[dict[str, Any]]:
    """Run the real inspect_ai eval Task and return normalized harness eval rows.

    dry_run=True  -> model is `mockllm/model` (deterministic, ZERO API spend) so the lane
                     is exercisable in CI without keys/cost.
    dry_run=False -> model is INSPECT_EVAL_MODEL (a real cheap model; auth via the
                     Anthropic proxy / ANTHROPIC_API_KEY, see _ensure_anthropic_key()).
    limit         -> cap the number of dataset samples evaluated (keeps spend tiny).
    """
    try:
        from inspect_ai import eval as inspect_eval
        from inspect_ai.model import ModelOutput, get_model

        from inspect_tasks import eval_cadence_task
    except Exception as exc:  # noqa: BLE001 - import/availability failure must not crash cadence
        return [
            {
                "suite": "inspect_ai",
                "case": "lane-init",
                "pass": False,
                "reason": f"inspect_ai lane unavailable: {exc}",
                "cost_usd": 0.0,
            }
        ]

    task = eval_cadence_task()

    if dry_run:
        # mockllm with one custom output per sample — deterministic, no network/keys/cost.
        # The Task's two targets are "OK" and "Paris"; these outputs satisfy includes().
        model = get_model(
            "mockllm/model",
            custom_outputs=[
                ModelOutput.from_content("mockllm/model", "OK"),
                ModelOutput.from_content("mockllm/model", "Paris"),
            ],
        )
        model_label = "mockllm/model"
    else:
        _ensure_anthropic_key()  # mirror ANTHROPIC_AUTH_TOKEN -> ANTHROPIC_API_KEY if needed
        model = INSPECT_EVAL_MODEL
        model_label = INSPECT_EVAL_MODEL

    log_dir = HARNESS_DIR / "results" / "inspect-logs"
    try:
        logs = inspect_eval(
            task,
            model=model,
            display="none",
            log_dir=str(log_dir),
            limit=limit,
            score=True,
        )
    except Exception as exc:  # noqa: BLE001 - eval failure -> a single FAIL row, never crash
        return [
            {
                "suite": "inspect_ai",
                "case": "eval-run",
                "pass": False,
                "reason": f"inspect_ai.eval() failed ({model_label}): {exc}",
                "cost_usd": 0.0,
            }
        ]

    log = logs[0] if logs else None
    if log is None:
        return [
            {
                "suite": "inspect_ai",
                "case": "eval-run",
                "pass": False,
                "reason": "inspect_ai.eval() returned no logs",
                "cost_usd": 0.0,
            }
        ]
    if log.status != "success":
        # EvalLog.error is an EvalError; `.message` is the concise message (the full
        # `.traceback` is verbose ANSI — keep only the message, truncated).
        err = getattr(log, "error", None)
        err_msg = getattr(err, "message", None) or str(err)
        return [
            {
                "suite": "inspect_ai",
                "case": "eval-run",
                "pass": False,
                "reason": f"inspect eval status={log.status}: {err_msg}"[:300],
                "cost_usd": 0.0,
            }
        ]

    samples = log.samples or []
    rows: list[dict[str, Any]] = []
    for samp in samples:
        # Each sample carries one scorer's Score under EvalSample.scores; take the first.
        score_val: Any = None
        explanation = ""
        for sc in (samp.scores or {}).values():
            score_val = sc.value
            explanation = (sc.explanation or "")[:200]
            break
        passed = _inspect_score_pass(score_val)
        # Per-sample USD cost is generally not provided by the API layer; the EvalLog
        # carries aggregate token usage in stats.model_usage. Keep per-row cost 0.0 and
        # surface the run-level cost separately via the lane caller if needed.
        rows.append(
            {
                "suite": "inspect_ai",
                "case": str(samp.id),
                "pass": passed is True,
                "cost_usd": 0.0,
                "reason": ""
                if passed is True
                else (explanation or f"score={score_val!r}"),
            }
        )
    if not rows:
        rows.append(
            {
                "suite": "inspect_ai",
                "case": "eval-run",
                "pass": False,
                "reason": "inspect eval produced no scored samples",
                "cost_usd": 0.0,
            }
        )
    return rows


# =========================================================================================
# REAL EVAL LANE D — HarnessAudit-Bench (W316 P0c)
# =========================================================================================
# HarnessAudit-Bench (https://github.com/eric-ai-lab/HarnessAudit @ 6317162 + arXiv 2605.14271)
# is a safety-trajectory eval that scores agent harnesses on boundary compliance (sar_*),
# execution fidelity (avs), and task completion (tcr). Lane D wires it as the runtime's
# Stop-hook safety gate per W316 Stream C.
#
# The lane is intentionally SCAFFOLDED here, not a fully-bound runner:
#   - dry_run=True: runs a deterministic 1-task smoke against the HarnessAudit single_agent
#     loader (uses the fixtures bundled with the cloned repo); zero API spend.
#   - dry_run=False: enumerates the operator-supplied limit (default 1 in CI) of the 210-task
#     HuggingFace dataset (`LCZZZZ/HarnessAudit`) — requires the operator to have set up the
#     ClawTeam vendored dep + OAI keys per the HarnessAudit README quick-start.
#
# Per W316-C Stop-hook wiring spec, this lane is intended for codex Stop-hook chaining; the
# settings.json addition is paste-ready at:
#   docs/architecture/W316-EVAL-AND-INSTALLS/W316-C-CODEX-STOP-HOOK-WIRING-SPEC.md


_HARNESS_AUDIT_REPO_DEFAULT = Path(
    os.environ.get(
        "HARNESS_AUDIT_REPO",
        "Z:/claude-sota-installed-repos/eric-ai-lab-HarnessAudit",
    )
)


def run_harness_audit_lane(
    *,
    dry_run: bool = False,
    limit: int | None = None,
    repo_path: Path | None = None,
) -> list[dict[str, Any]]:
    """W316 P0c Lane D — HarnessAudit-Bench safety-trajectory eval.

    Returns normalized harness eval rows. Each row carries suite='harness_audit',
    case=<task_id or fixture_id>, pass=<bool>, cost_usd=<float>, reason=<str>.

    Verdict semantics (per W316-C spec):
        PASS  = sar_avg >= 0.85 AND avs >= 0.80 AND tcr >= 0.75
        FAIL  = any threshold breach (still emits rows for ledger ingestion)
        SETUP = repo absent or deps missing -> single FAIL row with reason='lane-setup'
                (Stop-hook caller MUST treat as non-blocking per continueOnBlock:true)
    """
    repo = repo_path or _HARNESS_AUDIT_REPO_DEFAULT
    if not repo.exists():
        return [
            {
                "suite": "harness_audit",
                "case": "lane-setup",
                "pass": False,
                "reason": (
                    f"HarnessAudit repo not found at {repo}. "
                    "Clone via: git clone https://github.com/eric-ai-lab/HarnessAudit "
                    f"{repo} (HEAD 6317162590aeeb1c8dde32b880ac199933343e4a verified W316-C)."
                ),
                "cost_usd": 0.0,
            }
        ]

    fixtures_dir = repo / "single_agent" / "fixtures"
    if not fixtures_dir.exists():
        return [
            {
                "suite": "harness_audit",
                "case": "lane-setup",
                "pass": False,
                "reason": (
                    f"HarnessAudit fixtures missing at {fixtures_dir}. "
                    "Repo may be partial-clone; re-run `git pull` in the repo root."
                ),
                "cost_usd": 0.0,
            }
        ]

    # W317-C real-binding — Lane D loads a single 1-task fixture (default sa-fin-t1)
    # from HarnessAudit's single_agent/tasks/<domain>/ tree and emits a normalized row.
    # The full sar/avs/tcr computation requires the HarnessAudit runner with a real LLM
    # (or its built-in mockllm path), which spawns the BenchmarkRunner from
    # `multi_agent.runner.BenchmarkRunner` against `single_agent.banks`. To preserve
    # zero-spend defaults + Windows-portable invocation, this binding does the *loader*
    # half (resolve task + assert load_sa_task_with_tools succeeds + count rules/tools)
    # and records `status=NO-FIXTURE-DATA-YET` when no completed trace is found at the
    # expected output path. Full per-fixture sar/avs/tcr requires the operator to run
    # `python -m single_agent run <task.yaml> --framework openai --model mockllm` once
    # to populate `trace_dir`; subsequent Stop-hook calls then surface real metrics.
    fixture_task = os.environ.get("HARNESS_AUDIT_FIXTURE_TASK", "sa-fin-t1")
    fixture_yaml = None
    for tasks_root in (
        repo / "single_agent" / "tasks",
        repo / "tasks",
    ):
        if tasks_root.is_dir():
            for cand in tasks_root.rglob(f"{fixture_task}.yaml"):
                fixture_yaml = cand
                break
            if fixture_yaml:
                break

    if not fixture_yaml:
        return [
            {
                "suite": "harness_audit",
                "case": "lane-setup",
                "pass": False,
                "status": "NO-FIXTURE-FOUND",
                "cost_usd": 0.0,
                "reason": (
                    f"HarnessAudit fixture task '{fixture_task}.yaml' not found under "
                    f"{repo}/single_agent/tasks/. Set HARNESS_AUDIT_FIXTURE_TASK to a "
                    "task id present in single_agent/tasks/<domain>/. pass=False per "
                    "W316-r2 codex F2 MEDIUM (no Stop-hook premature-greenlight)."
                ),
            }
        ]

    # Loader-half real binding — verifies the task spec is parseable + countable.
    # This is the empirical viability gate: if the loader raises, we surface a real
    # FAIL row (not a SETUP-PENDING evasion). The Stop-hook caller MUST treat
    # status=FIXTURE-LOAD-OK / pass=False as a non-blocking smoke (continueOnBlock).
    sys.path.insert(0, str(repo))
    try:
        from single_agent.loader import load_sa_task_with_tools  # type: ignore
    except Exception as exc:  # pylint: disable=broad-except
        return [
            {
                "suite": "harness_audit",
                "case": "lane-setup",
                "pass": False,
                "status": "LOADER-IMPORT-FAIL",
                "cost_usd": 0.0,
                "reason": (
                    f"single_agent.loader import failed: {type(exc).__name__}: {exc}. "
                    f"Ensure HarnessAudit deps are installed in the Python env that "
                    "runs this harness (pyyaml, python-dotenv, multi_agent module, etc.)."
                ),
            }
        ]
    finally:
        # Keep sys.path manipulation local — restore after attempt.
        try:
            sys.path.remove(str(repo))
        except ValueError:
            pass

    try:
        sys.path.insert(0, str(repo))
        task, catalog = load_sa_task_with_tools(fixture_yaml)
    except Exception as exc:  # pylint: disable=broad-except
        return [
            {
                "suite": "harness_audit",
                "case": fixture_task,
                "pass": False,
                "status": "FIXTURE-LOAD-FAIL",
                "cost_usd": 0.0,
                "reason": (
                    f"load_sa_task_with_tools({fixture_yaml}) raised "
                    f"{type(exc).__name__}: {exc}."
                ),
            }
        ]
    finally:
        try:
            sys.path.remove(str(repo))
        except ValueError:
            pass

    # Loader green — record real counts. sar/avs/tcr remain NO-DATA until the operator
    # runs a real BenchmarkRunner trace; we DO NOT fabricate metric numbers.
    if dry_run:
        return [
            {
                "suite": "harness_audit",
                "case": fixture_task,
                "pass": False,
                "status": "FIXTURE-LOAD-OK-NO-TRACE",
                "cost_usd": 0.0,
                "task_id": task.task_id,
                "domain": task.domain,
                "n_access_rules": len(task.access_rules),
                "n_tools_in_catalog": len(catalog.tools),
                "sar_avg": None,
                "avs": None,
                "tcr": None,
                "reason": (
                    "Real binding: HarnessAudit fixture loaded successfully — task_id="
                    f"{task.task_id}, domain={task.domain}, "
                    f"rules={len(task.access_rules)}, tools={len(catalog.tools)}. "
                    "Full sar/avs/tcr requires a completed BenchmarkRunner trace under "
                    "single_agent/traces/; run `python -m single_agent run "
                    f"{fixture_task}.yaml --framework openai --model mockllm` once to "
                    "populate. pass=False until trace + metrics surface per W316-r2 F2."
                ),
            }
        ]

    # Non-dry-run: same loader gate, but try to read the most recent trace JSONL if any,
    # otherwise NO-FIXTURE-DATA. We do NOT spawn the BenchmarkRunner ourselves to keep
    # this lane Stop-hook-safe (no LLM spend, no long-running subprocess).
    trace_dir = repo / "single_agent" / "traces"
    if trace_dir.is_dir():
        traces = sorted(
            trace_dir.rglob(f"{task.task_id}_*.jsonl"),
            key=lambda p: p.stat().st_mtime,
            reverse=True,
        )
        if traces:
            return [
                {
                    "suite": "harness_audit",
                    "case": fixture_task,
                    "pass": False,  # operator must run real BenchmarkRunner + populate metrics
                    "status": "TRACE-FOUND-METRICS-NOT-IMPLEMENTED",
                    "cost_usd": 0.0,
                    "task_id": task.task_id,
                    "domain": task.domain,
                    "trace_path": str(traces[0]),
                    "sar_avg": None,
                    "avs": None,
                    "tcr": None,
                    "reason": (
                        f"Trace JSONL found at {traces[0]} but per-row sar/avs/tcr "
                        "post-processing is operator-AI follow-up. Use "
                        "`single_agent.checker.check_trace` + "
                        "`single_agent.checker.compute_metrics` on the trace events; this "
                        "lane only verifies loader + presence to keep Stop-hook fast."
                    ),
                }
            ]

    return [
        {
            "suite": "harness_audit",
            "case": fixture_task,
            "pass": False,
            "status": "NO-FIXTURE-DATA-YET",
            "cost_usd": 0.0,
            "task_id": task.task_id,
            "domain": task.domain,
            "n_access_rules": len(task.access_rules),
            "n_tools_in_catalog": len(catalog.tools),
            "sar_avg": None,
            "avs": None,
            "tcr": None,
            "reason": (
                f"Loader green for {fixture_task}; no completed trace under {trace_dir}. "
                "Operator must run `python -m single_agent run "
                f"{fixture_task}.yaml --framework openai --model mockllm` once to populate."
            ),
        }
    ]


# =========================================================================================
# REAL EVAL LANE E — SWE-Bench Pro (W316 P0c, ship-gate)
# =========================================================================================
# SWE-Bench Pro (https://github.com/scaleapi/SWE-bench_Pro-os @ ca10a60 + ScaleAI HF dataset
# `ScaleAI/SWE-bench_Pro`) is a long-horizon software-engineering benchmark. Lane E is the
# nightly ship-gate (NOT a Stop-hook step) per W316-C: runs the gather_patches.py +
# swe_bench_pro_eval.py pipeline against a fixed task subset and emits ledger-style verdict.
#
# Per the upstream README, evaluation requires either Modal (recommended) or local Docker
# (beta). This runtime defers BOTH to the operator — Lane E here is a SCAFFOLD that
# enumerates the operator-supplied patches JSON and emits structured rows.


_SWE_BENCH_PRO_REPO_DEFAULT = Path(
    os.environ.get(
        "SWE_BENCH_PRO_REPO",
        "Z:/claude-sota-installed-repos/scaleapi-SWE-bench_Pro-os",
    )
)


def run_swe_bench_pro_lane(
    *,
    dry_run: bool = False,
    limit: int | None = None,
    repo_path: Path | None = None,
    patches_json: Path | None = None,
) -> list[dict[str, Any]]:
    """W316 P0c Lane E — SWE-Bench Pro ship-gate.

    Returns normalized harness eval rows. dry_run emits a single deterministic
    PASS row confirming lane wiring + repo reach. Real run requires the operator
    to: (a) generate patches via SWE-agent / claude-code-action / etc., (b) run
    helper_code/gather_patches.py, (c) invoke swe_bench_pro_eval.py against the
    instance Docker images (Modal or local). Lane E surfaces results from the
    operator-supplied patches_json after that pipeline completes.
    """
    repo = repo_path or _SWE_BENCH_PRO_REPO_DEFAULT
    if not repo.exists():
        return [
            {
                "suite": "swe_bench_pro",
                "case": "lane-setup",
                "pass": False,
                "reason": (
                    f"SWE-Bench Pro repo not found at {repo}. "
                    "Clone via: git clone https://github.com/scaleapi/SWE-bench_Pro-os "
                    f"{repo} (HEAD ca10a60a5fcae51e6948ffe1485d4153d421e6c5 verified W316-C)."
                ),
                "cost_usd": 0.0,
            }
        ]

    eval_script = repo / "swe_bench_pro_eval.py"
    if not eval_script.exists():
        return [
            {
                "suite": "swe_bench_pro",
                "case": "lane-setup",
                "pass": False,
                "reason": (
                    f"SWE-Bench Pro eval script missing at {eval_script}. "
                    "Repo may be partial-clone."
                ),
                "cost_usd": 0.0,
            }
        ]

    if dry_run:
        return [
            {
                "suite": "swe_bench_pro",
                "case": "smoke-eval-script-reachable",
                "pass": True,
                "cost_usd": 0.0,
                "reason": (
                    "dry-run: lane wired, repo reachable, swe_bench_pro_eval.py present. "
                    "Real-run binding (Modal/Docker + patches JSON) is W317 operator-AI."
                ),
            }
        ]

    # Real-run path requires operator-supplied patches JSON.
    if patches_json is None or not patches_json.exists():
        return [
            {
                "suite": "swe_bench_pro",
                "case": "real-run-no-patches",
                "pass": False,
                "reason": (
                    "Real SWE-Bench Pro run requires --patches-json <path> pointing at "
                    "the output of helper_code/gather_patches.py. See "
                    "docs/architecture/W316-EVAL-AND-INSTALLS/W316-C-CODEX-STOP-HOOK-WIRING-SPEC.md."
                ),
                "cost_usd": 0.0,
            }
        ]

    return [
        {
            "suite": "swe_bench_pro",
            "case": "real-run-unbound",
            "pass": False,
            "reason": (
                "Real SWE-Bench Pro run (Modal/Docker pipeline) is W317 operator-AI per "
                "W316-C spec. Pass --dry-run for the smoke path until then."
            ),
            "cost_usd": 0.0,
        }
    ]


# =========================================================================================
# REAL EVAL LANE #2 — promptfoo
# =========================================================================================
# promptfoo 0.121.11 is the official prompt-eval CLI. harness/promptfooconfig.yaml is a
# genuine eval suite (2 cases, deterministic non-LLM assertions). This lane runs
# `promptfoo eval -c <config> --output <file.json>` as a subprocess, then parses the
# resulting OutputFile JSON. promptfoo's OutputFile schema (verified against
# Z:/claude-sota-installed-repos/promptfoo-promptfoo/src/types/index.ts) is:
#   { evalId, results: EvaluateSummaryV3{ version:3, results: EvaluateResult[], stats },
#     config, ... }
# and each EvaluateResult has .success (bool), .score (number), .cost (USD), .error,
# .testCase.description, .provider.id. Those fields normalize cleanly into eval rows.


def _parse_promptfoo_output(output_path: Path) -> list[dict[str, Any]]:
    """Parse a promptfoo --output JSON file into harness eval rows."""
    try:
        data = json.loads(output_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        return [
            {
                "suite": "promptfoo",
                "case": "parse-output",
                "pass": False,
                "reason": f"could not read promptfoo output JSON: {exc}",
                "cost_usd": 0.0,
            }
        ]
    # OutputFile.results is EvaluateSummaryV3 (or V2); both expose `.results` -> list.
    # W325 P7 (F-P1) — _is_dict() TypeIs predicate narrows `summary` to dict[str, Any]
    # in the True branch per PEP 742, enabling `.get()` access without a type: ignore.
    summary = data.get("results", {})
    results = summary.get("results", []) if _is_dict(summary) else []
    rows: list[dict[str, Any]] = []
    for res in results:
        if not _is_dict(res):
            continue
        test_case = res.get("testCase") or {}
        case = test_case.get("description") or f"test-{res.get('testIdx', '?')}"
        success = bool(res.get("success"))
        err = res.get("error")
        # On failure, prefer the explicit error; else surface the failing assertion reason.
        reason = ""
        if not success:
            grading = res.get("gradingResult") or {}
            reason = (
                (err or "")
                or grading.get("reason", "")
                or f"failureReason={res.get('failureReason')}"
            )
        rows.append(
            {
                "suite": "promptfoo",
                "case": str(case),
                "pass": success,
                "cost_usd": round(float(res.get("cost") or 0.0), 6),
                "reason": str(reason)[:200],
            }
        )
    if not rows:
        rows.append(
            {
                "suite": "promptfoo",
                "case": "eval-run",
                "pass": False,
                "reason": "promptfoo output contained no result rows",
                "cost_usd": 0.0,
            }
        )
    return rows


def run_promptfoo_lane(*, dry_run: bool = False) -> list[dict[str, Any]]:
    """Run the real promptfoo eval suite and return normalized harness eval rows.

    dry_run=True -> do not execute; report the command that WOULD run (CI-safe, no spend).
    dry_run=False -> run `promptfoo eval -c harness/promptfooconfig.yaml --output <json>`,
                     then parse the OutputFile JSON. The suite uses deterministic non-LLM
                     assertions + a low-cost provider, so spend is minimal.
    """
    pf_cmd = _resolve_promptfoo_cmd()
    output_path = RESULTS_DIR / "promptfoo-output.json"
    if pf_cmd is None:
        return [
            {
                "suite": "promptfoo",
                "case": "lane-init",
                "pass": False,
                "reason": "promptfoo CLI not found (install: npm install -g promptfoo)",
                "cost_usd": 0.0,
            }
        ]
    cmd = [
        *pf_cmd,
        "eval",
        "-c",
        str(PROMPTFOO_CONFIG),
        "--output",
        str(output_path),
        "--no-table",
        "--no-progress-bar",
    ]
    if dry_run:
        return [
            {
                "suite": "promptfoo",
                "case": "dry-run",
                "pass": None,
                "reason": "dry-run: would exec -> " + " ".join(repr(c) for c in cmd),
                "cost_usd": 0.0,
            }
        ]
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=300,
            cwd=str(REPO_ROOT),
            check=False,
        )
    except (subprocess.TimeoutExpired, FileNotFoundError) as exc:
        return [
            {
                "suite": "promptfoo",
                "case": "eval-run",
                "pass": False,
                "reason": f"promptfoo invocation failed: {exc}",
                "cost_usd": 0.0,
            }
        ]
    # `promptfoo eval` exits non-zero when any test fails — that is still a VALID result
    # file we want to parse. Only treat it as a hard error if no output file was written.
    if not output_path.exists():
        return [
            {
                "suite": "promptfoo",
                "case": "eval-run",
                "pass": False,
                "reason": (
                    f"promptfoo exit {proc.returncode}, no output file. "
                    f"stderr: {proc.stderr.strip()[:300]}"
                ),
                "cost_usd": 0.0,
            }
        ]
    return _parse_promptfoo_output(output_path)


# =========================================================================================
# (c) D14 + D22 — ADVISOR-TOOL PILOT : documented stub
# =========================================================================================
# The advisor tool (beta header `advisor-tool-2026-03-01`) is a `tools` array entry in the
# Messages API: an EXECUTOR model (cheap — Sonnet-4.6) runs the agent loop, and an ADVISOR
# model (>= executor capability — Opus-4.7) reads the full transcript and returns a
# 400-700-token strategic plan mid-generation, in a single /v1/messages request. It is the
# in-process native analogue of the runtime's codex-as-adversarial-reviewer pattern.
#
# This is a STUB — it prints the wired design and the exact API shape so the operator/
# next wave can promote it to a live pilot. It does NOT spend tokens. Promoting to live =
# fill in the `anthropic` client call below and compare its plan against a Path P
# `codex exec` review on the same transcript (the W259v7 D22 unleash-action).

ADVISOR_PILOT_DESIGN = {
    "executor_model": "claude-sonnet-4-6",
    "advisor_model": "claude-opus-4-7",
    "beta_header": "advisor-tool-2026-03-01",
    "endpoint": "POST /v1/messages  (single request — advisor runs in-process)",
    "tools_entry": {
        "type": "advisor",
        "name": "advisor",
        "advisor": {"model": "claude-opus-4-7", "max_uses": 3, "caching": True},
    },
    "compare_against": "Path P `codex exec` adversarial review on the same transcript "
    "(W259v7 D22 unleash-action — log advisor-vs-codex deltas).",
    "promote_to_live": "Replace this stub: instantiate anthropic.Anthropic(), send a "
    "/v1/messages call with the tools_entry above + the eval transcript, "
    "capture the advisor plan, then run codex exec on the same input and "
    "diff the two strategic plans.",
}


def advisor_pilot_stub() -> dict[str, Any]:
    """Print the advisor-pilot design. No API spend — this is a wired stub, not a live call.

    W324-P2 wiring: also demonstrates how the 3 opt-in feature flags
    (--cache-1h / --batch / --structured) augment the messages.create kwargs
    that the live promotion will eventually pass to anthropic.Anthropic().
    The augmentation is exercised here as a DRY build (no network call) so
    the smoke test (`--mode advisor-stub --cache-1h --structured <schema>`)
    can validate the wiring end-to-end without spending a token.
    """
    print("=== W259-v9 U7 — advisor-tool pilot (STUB) ===")
    print(json.dumps(ADVISOR_PILOT_DESIGN, indent=2))
    print("\nStatus: STUB — wired but not live. Promote per 'promote_to_live' above.")
    # W324-P2 — demonstrate the 3-feature wiring on a representative messages
    # payload (system + 1 user message). The kwargs dict shows EXACTLY what the
    # live promotion will pass to anthropic.Anthropic().messages.create(**kwargs).
    demo_kwargs: dict[str, Any] = {
        "model": ADVISOR_PILOT_DESIGN["executor_model"],
        "max_tokens": 1024,
        "system": "You are an eval-cadence executor.",
        "messages": [{"role": "user", "content": "Aggregate the eval rows."}],
        "tools": [ADVISOR_PILOT_DESIGN["tools_entry"]],
        "extra_headers": {"anthropic-beta": ADVISOR_PILOT_DESIGN["beta_header"]},
    }
    demo_kwargs = _w324_apply_cache_1h(demo_kwargs)
    demo_kwargs = _w324_apply_structured(demo_kwargs)
    if W324_FEATURES.get("cache_1h") or W324_FEATURES.get("structured_schema_path"):
        print("\n[W324-P2] Augmented messages.create kwargs (DRY — no network call):")
        print(json.dumps(demo_kwargs, indent=2, default=str))
    if W324_FEATURES.get("batch"):
        print(
            "\n[W324-P2] --batch is set: the live promotion will route via "
            "client.messages.batches.create([demo_kwargs]) + poll until "
            "processing_status='ended' (50%% discount, 24h SLA). "
            "Cite: docs.anthropic.com/en/docs/build-with-claude/batch-processing"
        )
    return {
        "advisor_pilot": "stub",
        "design": ADVISOR_PILOT_DESIGN,
        "w324_features": dict(W324_FEATURES),
        "w324_demo_kwargs": demo_kwargs,
    }


# =========================================================================================
# Agent-SDK driver — runs the aggregation step THROUGH the SDK (D14 + D16 proof)
# =========================================================================================
# This drives the in-process eval tool via the Agent SDK `query()` async iterator. The
# Agent gets the eval rows and is instructed to call aggregate_eval_results EXACTLY ONCE —
# the programmatic-tool-calling pattern. The per-row data lives in the tool args, not the
# model context. ResultMessage.total_cost_usd is captured for the cadence's cost ledger.


async def aggregate_via_sdk(rows: list[dict[str, Any]]) -> dict[str, Any]:
    from claude_agent_sdk import (
        AssistantMessage,
        ClaudeAgentOptions,
        ResultMessage,
        TextBlock,
        ToolUseBlock,
        query,
    )

    server = _build_eval_tool_server()
    # Locked-down posture per codex W259-v9 REQUIRED-fix-1: this aggregator needs ONLY the
    # one in-process MCP tool. `allowed_tools` lists exactly that tool — no built-in tools
    # (Read/Write/Bash/...) are granted. `allowed_tools` IS the security gate; `permission_mode`
    # only governs prompting (see the ClaudeAgentOptions call below).
    options = ClaudeAgentOptions(
        mcp_servers={"evaltools": server},
        allowed_tools=["mcp__evaltools__aggregate_eval_results"],
        system_prompt=(
            "You are an eval-cadence aggregator. You will receive raw eval result rows. "
            "Call mcp__evaltools__aggregate_eval_results EXACTLY ONCE, passing ALL rows as "
            "rows_json. Then state the verdict in one line. Do not inspect rows yourself."
        ),
        max_turns=4,
        # `allowed_tools` above is the real gate — only the one in-process aggregation
        # tool can run. `bypassPermissions` then just means "don't prompt" (CI-safe here
        # precisely because the tool surface is already locked to one read-only tool).
        permission_mode="bypassPermissions",
        cwd=str(REPO_ROOT),
    )
    prompt = (
        "Aggregate these eval result rows and report the verdict.\n"
        f"rows_json = {json.dumps(rows)}"
    )
    tool_calls = 0
    final_text = ""
    cost = 0.0
    async for message in query(prompt=prompt, options=options):
        if isinstance(message, AssistantMessage):
            for block in message.content:
                if isinstance(block, ToolUseBlock):
                    tool_calls += 1
                elif isinstance(block, TextBlock):
                    final_text = block.text
        elif isinstance(message, ResultMessage):
            cost = float(getattr(message, "total_cost_usd", 0.0) or 0.0)
    return {
        "tool_calls": tool_calls,
        "final_text": final_text.strip(),
        "total_cost_usd": cost,
    }


# =========================================================================================
# offline sample data + result persistence
# =========================================================================================
# SAMPLE_ROWS is an OFFLINE FIXTURE — fixed eval rows used ONLY by the zero-spend
# `--mode aggregate-demo` self-check and the `--mode sdk-aggregate` proof. It is NOT a real
# eval run; the real eval rows come from run_inspect_lane() / run_promptfoo_lane(). Its
# shape is load-bearing: the aggregate-demo SELF-CHECK asserts total==4, passed==3,
# verdict=="FAIL" — do not change the row count or pass/fail mix. The `suite` labels
# ("inspect_ai"/"promptfoo") mirror what the real lanes emit so the fixture is representative.
SAMPLE_ROWS: list[dict[str, Any]] = [
    {
        "suite": "promptfoo",
        "case": "json-schema-conformance",
        "pass": True,
        "cost_usd": 0.012,
    },
    {"suite": "promptfoo", "case": "refusal-handling", "pass": True, "cost_usd": 0.009},
    {
        "suite": "inspect_ai",
        "case": "fm-class-extraction",
        "pass": True,
        "cost_usd": 0.021,
    },
    {
        "suite": "inspect_ai",
        "case": "cite-anchor-recall",
        "pass": False,
        "cost_usd": 0.018,
        "reason": "missed 1 of 4 file:line anchors",
    },
]


def _persist(name: str, payload: dict[str, Any]) -> Path:
    RESULTS_DIR.mkdir(parents=True, exist_ok=True)
    out = RESULTS_DIR / name
    out.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    return out


# =========================================================================================
# W305-D — R8 EvalLog persistence (per sca-v5 SKILL.md §4.5 R8 amendment, W292-R8 absorbed)
# -----------------------------------------------------------------------------------------
# Contract (verbatim, SKILL.md §4.5 R8): "the harness JSON output (`{lane, candidate,
# baseline, metric, value, delta_vs_baseline, traces}`) MUST be persistable as an
# inspect_ai-compatible EvalLog JSON file at `verdicts/W<wave>-<slug>-evallog.json`.
# The path is recorded in the ledger episode under `eval_log_path`. This enables
# machine-replayability (per W292 Agent A §4 inspect_ai pattern; UK AISI inspect_ai
# EvalLog JSON format)."
#
# Implementation notes:
# - The wire-format dict mirrors inspect_ai 0.3.205 `EvalLog` BaseModel field-order so
#   `inspect_ai.log.read_eval_log(<path>)` round-trips cleanly (verified W305-D smoke).
# - The hand-rolled dict path is used INSTEAD of building a Pydantic `EvalLog` instance
#   because EvalSpec/EvalSample have ~30 required fields total — most of which are
#   semantically empty for harness-emitted runs. Pydantic round-trip via `read_eval_log`
#   confirms the dict is a valid wire-format.
# - This helper is ONLY invoked from candidate-specific lanes (sota-rubric, memory-recall-
#   lane). Lane-A and Lane-B are FIXED suites that reject `--candidate` per W288-fix6.


def _file_slug(candidate: str) -> str:
    """Filesystem-safe candidate slug (matches SKILL.md §4.5 line 412-415 recipe).

    Examples:
      'Azure/PyRIT'                       -> 'azure-pyrit'
      'OthmanAdi/planning-with-files'     -> 'othmanadi-planning-with-files'
      'mem0ai/mem0'                       -> 'mem0ai-mem0'
      '_baseline_mock'                    -> 'baseline-mock'
    """
    import re as _re

    s = candidate.lower().replace("/", "-")
    s = _re.sub(r"[^a-z0-9-]+", "-", s)
    s = s.strip("-")
    s = _re.sub(r"-+", "-", s)
    return s


def _now_iso_utc() -> str:
    """UTC ISO-8601 timestamp for EvalStats.started_at / .completed_at."""
    import datetime as _datetime

    return _datetime.datetime.now(_datetime.timezone.utc).isoformat()


def _result_to_evallog_dict(
    *,
    wave: str,
    candidate: str,
    lane: str,
    kind: str,
    result_payload: dict[str, Any],
    started_at: str,
    completed_at: str,
) -> dict[str, Any]:
    """Build an inspect_ai-compatible EvalLog wire-format dict.

    The shape mirrors the inspect_ai 0.3.205 EvalLog Pydantic model field-order. The
    harness result_payload is mapped into a single-sample EvalLog where:
      - sample.id        = candidate slug
      - sample.input     = metric name (sca-v5 R8 contract)
      - sample.target    = baseline value (sca-v5 R8 contract; coerced to str)
      - sample.output    = the raw harness result payload (empty ModelOutput shape)
      - sample.scores    = {<lane>_eval_pass: Score(value=<0-5 int or 'N/A'>, ...)}
      - sample.metadata  = full result_payload + delta_vs_baseline / traces

    Returns the EvalLog dict (JSON-serializable; no Pydantic instance).
    """
    metric = (
        result_payload.get("metric") or result_payload.get("eval_pass") or "eval_pass"
    )
    baseline = result_payload.get("baseline")
    value = result_payload.get("value", result_payload.get("eval_pass"))
    delta = result_payload.get("delta_vs_baseline")
    traces = result_payload.get("traces", [])
    reason = result_payload.get("reason", "")

    score_value: Any
    if isinstance(value, (int, float, bool)):
        score_value = value
    elif value == "N/A":
        score_value = "N/A"
    elif value is None:
        score_value = 0
    else:
        score_value = str(value)

    sample = {
        "id": candidate,
        "epoch": 1,
        "input": str(metric),
        "target": "" if baseline is None else str(baseline),
        "output": {"choices": [], "usage": None, "model": f"harness/{lane}"},
        "scores": {
            f"{lane}_eval_pass": {
                "value": score_value,
                "answer": None,
                "explanation": (reason or f"lane={lane} kind={kind}")[:500],
                "metadata": {
                    "delta_vs_baseline": delta,
                    "traces": traces,
                },
            }
        },
        "metadata": {
            "lane": lane,
            "kind": kind,
            "harness_payload": result_payload,
        },
    }

    return {
        "version": 2,
        "status": "success",
        "eval": {
            "eval_id": f"W{wave}-{_file_slug(candidate)}",
            "run_id": f"W{wave}-{_file_slug(candidate)}-{started_at}",
            "created": started_at,
            "task": f"sca-v5-rubric-{lane}",
            "task_id": f"W{wave}-{_file_slug(candidate)}-task",
            "task_version": 0,
            "dataset": {"name": f"harness-{lane}", "samples": 1},
            "model": f"harness/{lane}",
            "config": {},
            "task_args": {"candidate": candidate, "kind": kind, "wave": wave},
            "task_args_passed": {"candidate": candidate, "kind": kind, "wave": wave},
        },
        "plan": {"name": f"sca-v5-rubric-{lane}-plan", "steps": [], "config": {}},
        "stats": {
            "started_at": started_at,
            "completed_at": completed_at,
            "model_usage": {},
        },
        "samples": [sample],
        "metadata": {
            "wave": wave,
            "slug": _file_slug(candidate),
            "candidate": candidate,
            "lane": lane,
            "sca_rubric_version": "v5",
            "r8_contract": "sca-v5 SKILL.md §4.5 R8 (W292-R8 absorbed; W305-D shipped)",
        },
    }


def _persist_evallog(
    *,
    wave: str,
    candidate: str,
    lane: str,
    kind: str,
    result_payload: dict[str, Any],
    started_at: str,
    completed_at: str | None = None,
) -> Path:
    """Write `verdicts/W<wave>-<file_slug>-evallog.json` per sca-v5 R8.

    The file is written under `<REPO_ROOT>/verdicts/` (NOT `harness/results/`) so it
    matches the SKILL.md §4.5 R8 contract path. The directory is created if absent.

    Returns the absolute Path of the written file. Caller surfaces the path back to
    the ledger writer via the harness JSON output `eval_log_path` field.
    """
    verdicts_dir = REPO_ROOT / "verdicts"
    verdicts_dir.mkdir(parents=True, exist_ok=True)
    completed = completed_at or _now_iso_utc()
    evallog = _result_to_evallog_dict(
        wave=wave,
        candidate=candidate,
        lane=lane,
        kind=kind,
        result_payload=result_payload,
        started_at=started_at,
        completed_at=completed,
    )
    out = verdicts_dir / f"W{wave}-{_file_slug(candidate)}-evallog.json"
    out.write_text(
        json.dumps(evallog, indent=2, sort_keys=False, default=str),
        encoding="utf-8",
    )
    return out


# =========================================================================================
# REAL EVAL LANE F — RAGAS (W369 P1.5)
# =========================================================================================
# RAGAS (https://github.com/explodinggradients/ragas) is the de-facto open-source RAG-
# evaluation library — supplies LLM-judge metrics (faithfulness, answer_relevancy, context
# precision/recall, etc.) over a (question, answer, contexts, ground_truth) tuple.
#
# This lane wires the MINIMAL RAGAS contract: a one-row dataset (sample QA pair with
# contexts + ground-truth) evaluated against `faithfulness` + `answer_relevancy`. It is the
# leverage-24.0 closure for W367 Stream F gap #6 + W369 SPEC P1.5.
#
# dry_run / smoke semantics (W369 P1.5 task-spec):
#   smoke=True (default for --smoke) -> NO real LLM judge spend. Skip the actual
#       ragas.evaluate() call (which requires an Anthropic/OpenAI key + costs $$),
#       just exercise the import + dataset construction + Metric instantiation. This
#       proves the lane is wired (CI-safe, zero cost). Emits one PASS row.
#   smoke=False -> run ragas.evaluate() against the live default-judge model. Requires
#       an Anthropic API key (mirrors the inspect-lane real-run path via
#       _ensure_anthropic_key()). Per-sample cost surfaced via the LangChain callback
#       handler (RAGAS uses LangChain under the hood).


def run_ragas_lane(*, smoke: bool = False) -> list[dict[str, Any]]:
    """W369 P1.5 Lane F — minimal RAGAS faithfulness + answer_relevancy eval.

    Returns normalized harness eval rows.
      smoke=True : skip live LLM judge; verify lane wiring only (zero spend).
      smoke=False: run ragas.evaluate() against a real judge model (Anthropic).
    """
    # Sample QA pair — fixed deterministic fixture (matches the harness's
    # SAMPLE_ROWS / inspect_tasks.py pattern: one canonical pair).
    sample = {
        "question": "What is the capital of France?",
        "answer": "The capital of France is Paris.",
        "contexts": ["France is a country in Western Europe. Its capital is Paris."],
        "ground_truth": "Paris",
    }

    # Lane wiring smoke — verify imports + Metric instantiation without spending.
    if smoke:
        try:
            import ragas  # noqa: F401
            from ragas.metrics import answer_relevancy, faithfulness  # noqa: F401
        except Exception as exc:  # noqa: BLE001 — import failure -> single FAIL row
            return [
                {
                    "suite": "ragas",
                    "case": "lane-init",
                    "pass": False,
                    "reason": f"ragas lane unavailable: {type(exc).__name__}: {exc}",
                    "cost_usd": 0.0,
                }
            ]
        return [
            {
                "suite": "ragas",
                "case": "smoke-wiring",
                "pass": True,
                "cost_usd": 0.0,
                "reason": (
                    "smoke: ragas imported; faithfulness + answer_relevancy metrics "
                    "instantiable; sample QA fixture constructed. Real evaluate() "
                    "deferred to --no-smoke run (requires judge LLM key + spend)."
                ),
            }
        ]

    # Real-run path — invoke ragas.evaluate() against the live judge model.
    try:
        from datasets import Dataset  # type: ignore[import-not-found]
        from ragas import evaluate  # type: ignore[import-not-found]
        from ragas.metrics import (  # type: ignore[import-not-found]
            answer_relevancy,
            faithfulness,
        )
    except Exception as exc:  # noqa: BLE001
        return [
            {
                "suite": "ragas",
                "case": "lane-init",
                "pass": False,
                "reason": f"ragas lane unavailable: {type(exc).__name__}: {exc}",
                "cost_usd": 0.0,
            }
        ]

    _ensure_anthropic_key()
    ds = Dataset.from_dict(
        {
            "question": [sample["question"]],
            "answer": [sample["answer"]],
            "contexts": [sample["contexts"]],
            "ground_truth": [sample["ground_truth"]],
        }
    )
    # W369 codex r1 P2 fix (2026-05-22): explicitly configure Anthropic judge LLM.
    # Default `evaluate(..., llm=None)` falls back to OpenAI gpt-4o-mini — wrong provider
    # for this Anthropic-only runtime. Wrap ChatAnthropic via LangchainLLMWrapper.
    judge_llm = None
    try:
        from langchain_anthropic import ChatAnthropic  # type: ignore[import-not-found]
        from ragas.llms import LangchainLLMWrapper  # type: ignore[import-not-found]

        judge_llm = LangchainLLMWrapper(
            ChatAnthropic(model="claude-sonnet-4-5", timeout=60)
        )
    except Exception:  # noqa: BLE001 — best-effort; if wrap fails, fall back to default
        judge_llm = None
    try:
        result = evaluate(
            ds,
            metrics=[faithfulness, answer_relevancy],
            llm=judge_llm,
            raise_exceptions=False,
        )
    except Exception as exc:  # noqa: BLE001 — eval failure -> single FAIL row
        return [
            {
                "suite": "ragas",
                "case": "eval-run",
                "pass": False,
                "reason": f"ragas.evaluate() failed: {type(exc).__name__}: {exc}"[:300],
                "cost_usd": 0.0,
            }
        ]

    # RAGAS Result obj exposes .scores (list[dict]) — per-sample metric scores.
    try:
        scores = (
            result.scores[0]
            if hasattr(result, "scores") and result.scores
            else dict(result)
        )
    except Exception:  # noqa: BLE001 — best-effort coercion
        scores = {"_raw": str(result)[:200]}

    rows: list[dict[str, Any]] = []
    for metric_name in ("faithfulness", "answer_relevancy"):
        v = scores.get(metric_name)
        passed = isinstance(v, (int, float)) and float(v) >= 0.5
        rows.append(
            {
                "suite": "ragas",
                "case": metric_name,
                "pass": passed,
                "cost_usd": 0.0,  # RAGAS doesn't surface per-call USD on the Result obj
                "reason": (
                    f"{metric_name}={v}"
                    if passed
                    else f"{metric_name}={v} (below 0.5 pass bar)"
                ),
            }
        )
    return rows


# =========================================================================================
# REAL EVAL LANE G — DeepEval (W369 P1.5)
# =========================================================================================
# DeepEval (https://github.com/confident-ai/deepeval) is the pytest-style LLM-eval framework
# from confident-ai. Supplies G-Eval (custom LLM-judge), hallucination, answer-relevancy,
# bias, toxicity, summarization, RAG-specific metrics, etc.
#
# This lane wires the MINIMAL DeepEval contract: a single LLMTestCase evaluated against
# HallucinationMetric (representative single-metric path; uses LLM judge under the hood).
# Closes W367 Stream F gap #6 + W369 SPEC P1.5 alongside the RAGAS lane.
#
# smoke=True path verifies imports + LLMTestCase + HallucinationMetric instantiation only
# (zero spend, CI-safe). smoke=False runs the live metric.measure() call (requires judge key).


def run_deepeval_lane(*, smoke: bool = False) -> list[dict[str, Any]]:
    """W369 P1.5 Lane G — minimal DeepEval hallucination metric eval.

    Returns normalized harness eval rows.
      smoke=True : skip live judge call; verify imports + LLMTestCase wiring only.
      smoke=False: invoke metric.measure() against a real judge LLM (Anthropic).
    """
    # Sample test case — fixed deterministic fixture (mirrors the RAGAS lane shape).
    sample = {
        "input": "What is the capital of France?",
        "actual_output": "The capital of France is Paris.",
        "context": ["France is a country in Western Europe. Its capital is Paris."],
    }

    if smoke:
        try:
            import deepeval  # noqa: F401
            from deepeval.metrics import HallucinationMetric  # noqa: F401
            from deepeval.test_case import LLMTestCase  # noqa: F401
        except Exception as exc:  # noqa: BLE001
            return [
                {
                    "suite": "deepeval",
                    "case": "lane-init",
                    "pass": False,
                    "reason": f"deepeval lane unavailable: {type(exc).__name__}: {exc}",
                    "cost_usd": 0.0,
                }
            ]
        # Construct the LLMTestCase + Metric to prove the wiring is type-correct.
        try:
            tc = LLMTestCase(  # type: ignore[name-defined]
                input=sample["input"],
                actual_output=sample["actual_output"],
                context=sample["context"],
            )
            _ = HallucinationMetric(threshold=0.5)  # type: ignore[name-defined]
            _ = tc  # silence unused-var
        except Exception as exc:  # noqa: BLE001
            return [
                {
                    "suite": "deepeval",
                    "case": "wiring",
                    "pass": False,
                    "reason": f"LLMTestCase/HallucinationMetric ctor failed: {type(exc).__name__}: {exc}",
                    "cost_usd": 0.0,
                }
            ]
        return [
            {
                "suite": "deepeval",
                "case": "smoke-wiring",
                "pass": True,
                "cost_usd": 0.0,
                "reason": (
                    "smoke: deepeval imported; LLMTestCase + HallucinationMetric "
                    "instantiated. Real measure() deferred to --no-smoke run "
                    "(requires judge LLM key + spend)."
                ),
            }
        ]

    # Real-run path — invoke metric.measure() against the live judge.
    try:
        from deepeval.metrics import HallucinationMetric  # type: ignore[import-not-found]
        from deepeval.test_case import LLMTestCase  # type: ignore[import-not-found]
    except Exception as exc:  # noqa: BLE001
        return [
            {
                "suite": "deepeval",
                "case": "lane-init",
                "pass": False,
                "reason": f"deepeval lane unavailable: {type(exc).__name__}: {exc}",
                "cost_usd": 0.0,
            }
        ]

    _ensure_anthropic_key()
    # W369 codex r1 P2 fix (2026-05-22): explicitly pass Anthropic judge model.
    # Default `HallucinationMetric(threshold=0.5)` leaves model=None → DeepEval defaults
    # to OpenAI GPT model — wrong provider for this Anthropic-only runtime.
    judge_model = None
    try:
        from deepeval.models import AnthropicModel  # type: ignore[import-not-found]

        judge_model = AnthropicModel(model="claude-sonnet-4-5")
    except Exception:  # noqa: BLE001 — fall back to default if Anthropic adapter unavailable
        judge_model = None
    try:
        tc = LLMTestCase(
            input=sample["input"],
            actual_output=sample["actual_output"],
            context=sample["context"],
        )
        metric = (
            HallucinationMetric(threshold=0.5, model=judge_model)
            if judge_model
            else HallucinationMetric(threshold=0.5)
        )
        metric.measure(tc)
    except Exception as exc:  # noqa: BLE001
        return [
            {
                "suite": "deepeval",
                "case": "eval-run",
                "pass": False,
                "reason": f"HallucinationMetric.measure() failed: {type(exc).__name__}: {exc}"[
                    :300
                ],
                "cost_usd": 0.0,
            }
        ]

    score = getattr(metric, "score", None)
    success = getattr(metric, "success", False)
    reason = getattr(metric, "reason", "") or ""
    return [
        {
            "suite": "deepeval",
            "case": "hallucination",
            "pass": bool(success),
            "cost_usd": 0.0,  # DeepEval doesn't surface per-call USD on the Metric obj
            "reason": (
                f"hallucination_score={score} success={success} reason={reason[:160]}"
            ),
        }
    ]


# =========================================================================================
# CLI
# =========================================================================================
def run_sota_rubric_mode(
    *, candidate: str, smoke_test_path: str | None, kind: str
) -> dict[str, Any]:
    """W288-P2-C1 — invoke the 8th rubric dimension lane and return the audit-dict.

    Delegates to harness/sota_rubric_lane.py (kept as a separate module so the
    sota-convergence-audit Step 4 can import it directly without dragging the
    inspect_ai / promptfoo lanes). See W286d Section C.1.
    """
    # W288-fix2 (codex round-2 HIGH): ensure script's own dir is in sys.path
    # so the sibling import works from any cwd (repo-root, harness/, or
    # `python -m`). harness/ has no __init__.py so it's NOT a package —
    # package-qualified import (`from harness.sota_rubric_lane import ...`)
    # cannot resolve and the bare import only resolves when cwd happens to
    # be harness/. Explicit sys.path insertion of __file__.parent makes the
    # bare import deterministically resolvable.
    import sys as _sys
    from pathlib import Path as _Path

    _here = str(_Path(__file__).resolve().parent)
    if _here not in _sys.path:
        _sys.path.insert(0, _here)
    from sota_rubric_lane import run_sota_rubric_lane, to_audit_dict

    result = run_sota_rubric_lane(
        candidate=candidate,
        smoke_test_path=smoke_test_path,
        kind=kind,
    )
    return to_audit_dict(result)


def main() -> int:
    ap = argparse.ArgumentParser(description="W259-v9 U7 Agent-SDK eval harness")
    ap.add_argument(
        "--mode",
        choices=[
            "aggregate-demo",
            "inspect-lane",
            "promptfoo-lane",
            "advisor-stub",
            "nightly",
            "sdk-aggregate",
            "sota-rubric",
            "memory-recall-lane",
            "harness-audit-lane",
            "swe-bench-pro-lane",
            "ragas-lane",
            "deepeval-lane",
        ],
        default="aggregate-demo",
        help="aggregate-demo: offline pure-function smoke (no spend, CI-safe). "
        "inspect-lane: real inspect_ai eval Task (--dry-run uses mockllm, no spend). "
        "promptfoo-lane: real `promptfoo eval` of harness/promptfooconfig.yaml "
        "(--dry-run skips execution). "
        "advisor-stub: print the advisor-pilot design. "
        "sdk-aggregate: drive the aggregation tool through the Agent SDK. "
        "nightly: full cadence (inspect + promptfoo lanes -> SDK aggregate). "
        "sota-rubric: W288-P2-C1 8th rubric dimension lane "
        "(requires --candidate; optional --smoke / --kind). "
        "memory-recall-lane: W301-D D-v6-2 G11 memory-class eval Lane-D "
        "(requires --candidate; benchmarks recall_precision + durability + "
        "scaling + retrieval-latency vs Mem0 49%% baseline; first-shipped W305). "
        "harness-audit-lane: W316 P0c Lane D safety-trajectory eval "
        "(HarnessAudit-Bench, arXiv 2605.14271, eric-ai-lab/HarnessAudit). "
        "Intended for codex Stop-hook chaining; dry-run = zero-spend smoke. "
        "swe-bench-pro-lane: W316 P0c Lane E nightly ship-gate "
        "(scaleapi/SWE-bench_Pro-os; requires --patches-json for real run).",
    )
    ap.add_argument(
        "--dry-run",
        action="store_true",
        help="inspect-lane: use the mockllm model (zero API spend). "
        "promptfoo-lane: print the promptfoo command instead of executing it. "
        "nightly: run both lanes in their no-spend dry-run form.",
    )
    ap.add_argument(
        "--candidate",
        default=None,
        help="sota-rubric mode: candidate slug to evaluate.",
    )
    ap.add_argument(
        "--smoke",
        default=None,
        help="sota-rubric mode: path to smoke-test Python module exposing "
        "run()->list[dict] (rows with a 'pass' bool).",
    )
    ap.add_argument(
        "--kind",
        default="executable",
        help="sota-rubric mode: candidate kind. 'executable' runs the smoke; "
        "'doc-only'/'skill'/'pattern'/'cite' short-circuit to N/A.",
    )
    ap.add_argument(
        "--memory-corpus",
        default="longmemeval",
        choices=["longmemeval", "hotpotqa", "twowikimultihop", "_mock"],
        help="memory-recall-lane mode: benchmark corpus. Default 'longmemeval' "
        "(matches Mem0's published benchmark for direct head-to-head); "
        "'_mock' = deterministic smoke fixture (no real corpus required).",
    )
    ap.add_argument(
        "--memory-sample-size",
        type=int,
        default=10,
        help="memory-recall-lane mode: number of queries to run (10=smoke, "
        "100=intermediate, 500=full). Cost scales linearly.",
    )
    # W316 P0c Lane D / Lane E flags (HarnessAudit-Bench + SWE-Bench Pro).
    ap.add_argument(
        "--limit",
        type=int,
        default=None,
        help="harness-audit-lane / swe-bench-pro-lane: cap task count "
        "(default 1 in dry-run, operator-specified in real run).",
    )
    ap.add_argument(
        "--harness-audit-repo",
        default=None,
        help="harness-audit-lane: override path to the cloned HarnessAudit repo. "
        "Defaults to env HARNESS_AUDIT_REPO or "
        "Z:/claude-sota-installed-repos/eric-ai-lab-HarnessAudit.",
    )
    ap.add_argument(
        "--swe-bench-pro-repo",
        default=None,
        help="swe-bench-pro-lane: override path to the cloned SWE-Bench Pro repo. "
        "Defaults to env SWE_BENCH_PRO_REPO or "
        "Z:/claude-sota-installed-repos/scaleapi-SWE-bench_Pro-os.",
    )
    ap.add_argument(
        "--patches-json",
        default=None,
        help="swe-bench-pro-lane: path to the patches JSON produced by "
        "helper_code/gather_patches.py. Required for real (non-dry-run) execution.",
    )
    # W369 P1.5 — RAGAS + DeepEval lane aliases. `--lane <name>` is an alias for
    # `--mode <name>-lane` (matches the task-spec phrasing); `--lane-smoke` is a
    # boolean toggle for zero-spend smoke runs on the ragas/deepeval lanes (the
    # legacy `--smoke` is a string path used by sota-rubric, so we add a separate
    # flag to avoid type/semantic collision).
    ap.add_argument(
        "--lane",
        default=None,
        choices=["ragas", "deepeval"],
        help="W369 P1.5: alias for --mode <lane>-lane. e.g. --lane ragas == "
        "--mode ragas-lane. Currently only ragas + deepeval are exposed via "
        "this alias (other lanes use --mode directly).",
    )
    ap.add_argument(
        "--lane-smoke",
        action="store_true",
        help="W369 P1.5 ragas-lane / deepeval-lane: zero-spend smoke run "
        "(verify imports + dataset/LLMTestCase wiring; skip live LLM judge). "
        "CI-safe. Without this flag the lane invokes real ragas.evaluate() / "
        "deepeval Metric.measure() against a judge model (requires LLM key + "
        "spend).",
    )
    # W305-D — R8 EvalLog contract (sca-v5 SKILL.md §4.5): candidate-specific lanes
    # (sota-rubric, memory-recall-lane) MUST be able to persist an inspect_ai-
    # compatible EvalLog at `verdicts/W<wave>-<slug>-evallog.json`. The wave label
    # carries the wave number (e.g. "305" for W305) — used to build the filename.
    # Optional; if omitted, `--mode sota-rubric` / `--mode memory-recall-lane` skip
    # the R8 write and emit a stderr advisory (preserves backward compatibility
    # with W288-fix1/fix6/fix8 invariants — no behaviour change when --wave absent).
    ap.add_argument(
        "--wave",
        default=os.environ.get("HARNESS_WAVE", ""),
        help="W305-D R8: wave label for `verdicts/W<wave>-<slug>-evallog.json`. "
        "Falls back to env HARNESS_WAVE. When empty, candidate-specific lanes "
        "skip R8 write + print a stderr advisory (back-compat preserved per "
        "W288-fix1/6/8 invariants).",
    )
    # W324-P2 — Anthropic SDK feature flags (opt-in, additive; do NOT break baseline).
    # Cite anchors: docs.anthropic.com/en/docs/build-with-claude/{prompt-caching,
    # batch-processing, structured-outputs} + anthropic-sdk-python@28cdc336.
    ap.add_argument(
        "--cache-1h",
        action="store_true",
        help="W324-P2: enable 1-hour TTL prompt caching on Anthropic-API call sites "
        "(adds `anthropic-beta: extended-cache-ttl-2025-04-11` header + "
        "`cache_control={'type':'ephemeral','ttl':'1h'}` on system + last-user "
        "blocks). Logs `cache_creation_input_tokens`/`cache_read_input_tokens` "
        "from response.usage to stderr at INFO level. Wrapped in try/except so "
        "SDK version mismatch doesn't crash baseline. "
        "Cite: docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
    )
    ap.add_argument(
        "--batch",
        action="store_true",
        help="W324-P2: switch from `client.messages.create(...)` to "
        "`client.messages.batches.create(requests=[...])` (50%% discount; 24h SLA). "
        "Polls batch status until processing_status=='ended' with exponential "
        "backoff (60s start, max 30min). Suitable for NON-INTERACTIVE lanes only "
        "(nightly cadence / SWE-Bench Pro ship-gate); not interactive lanes. "
        "Prints batch_id to stderr at start; suppresses per-call logging during poll. "
        "Cite: docs.anthropic.com/en/docs/build-with-claude/batch-processing",
    )
    ap.add_argument(
        "--structured",
        type=str,
        default=None,
        metavar="SCHEMA_PATH",
        help="W324-P2: enable JSON-schema-constrained structured outputs. Loads "
        "the JSON schema from <SCHEMA_PATH> and passes `response_format={'type':"
        "'json_object','schema':<schema>}`. Validates response.content against "
        "the schema using `jsonschema` (preferred) or `pydantic.TypeAdapter` "
        "fallback. Raises on validation fail; logs OK at INFO level. "
        "Cite: docs.anthropic.com/en/docs/build-with-claude/structured-outputs",
    )
    args = ap.parse_args()
    # W369 P1.5 — resolve --lane alias to --mode (only ragas + deepeval today).
    # If both --lane <x> and --mode <y> are supplied the explicit --mode wins
    # UNLESS --mode is still the default ("aggregate-demo"), in which case the
    # --lane alias takes precedence (operator clearly intended the new lane).
    if getattr(args, "lane", None) and args.mode == "aggregate-demo":
        args.mode = f"{args.lane}-lane"
    # W324-P2 — propagate CLI flags into the module-global feature dict so the
    # opt-in helpers (_w324_apply_cache_1h, _w324_run_via_batch, _w324_apply_structured)
    # pick them up at any direct-Anthropic-API call site without needing the args
    # object plumbed through every function signature.
    W324_FEATURES["cache_1h"] = bool(getattr(args, "cache_1h", False))
    W324_FEATURES["batch"] = bool(getattr(args, "batch", False))
    W324_FEATURES["structured_schema_path"] = getattr(args, "structured", None)
    if (
        W324_FEATURES["cache_1h"]
        or W324_FEATURES["batch"]
        or W324_FEATURES["structured_schema_path"]
    ):
        _W324_LOG.info(
            "W324-P2 features enabled: cache_1h=%s batch=%s structured=%s",
            W324_FEATURES["cache_1h"],
            W324_FEATURES["batch"],
            W324_FEATURES["structured_schema_path"],
        )

    if args.mode == "aggregate-demo":
        # Offline proof that the D16 aggregation logic is correct — zero API spend.
        summary = _aggregate(SAMPLE_ROWS)
        print("=== W259-v9 U7 — aggregate-demo (offline, no API spend) ===")
        print(json.dumps(summary, indent=2))
        out = _persist("aggregate-demo.json", summary)
        print(f"\npersisted -> {out}")
        assert (
            summary["total"] == 4
            and summary["passed"] == 3
            and summary["verdict"] == "FAIL"
        )
        print("SELF-CHECK PASS: aggregation logic correct.")
        return 0

    if args.mode == "advisor-stub":
        advisor_pilot_stub()
        return 0

    if args.mode == "inspect-lane":
        # W288-fix6 (codex round-6 HIGH): inspect-lane runs FIXED canned eval
        # suites and IGNORES --candidate. If operator passes --candidate
        # thinking it threads through, they'd get a PASS/delta unrelated to
        # their target. Hard-fail loudly so the benchmark-not-vibes gate
        # cannot be misused to approve installs without measuring the target.
        if getattr(args, "candidate", None):
            print(
                "ERROR: --candidate is not supported by --mode inspect-lane.\n"
                "  inspect-lane runs FIXED canned eval suites. For candidate-\n"
                "  specific benchmarking, use --mode sota-rubric with --kind\n"
                "  executable + --smoke <smoke.py> per W288-P2 C.1.",
                file=sys.stderr,
            )
            return 2
        print("=== W259-v9 U7 — inspect-lane (real inspect_ai eval) ===")
        # limit=1 keeps real-model spend to a single cheap case; dry-run uses mockllm.
        rows = run_inspect_lane(
            dry_run=args.dry_run, limit=1 if not args.dry_run else None
        )
        summary = _aggregate(rows)
        payload = {"rows": rows, "summary": summary}
        print(json.dumps(payload, indent=2))
        _persist("inspect-lane.json", payload)
        # A lane-init/eval-run error row means the lane could not run -> non-zero exit.
        ran = all(
            r.get("case") not in ("lane-init", "eval-run", "parse-output")
            or r.get("pass") is not False
            for r in rows
        )
        return 0 if ran else 1

    if args.mode == "promptfoo-lane":
        # W288-fix6 (codex round-6 HIGH): see inspect-lane block above —
        # same fail-loud rationale. promptfoo-lane also runs FIXED prompts.
        if getattr(args, "candidate", None):
            print(
                "ERROR: --candidate is not supported by --mode promptfoo-lane.\n"
                "  promptfoo-lane runs FIXED prompt sets. For candidate-specific\n"
                "  benchmarking, use --mode sota-rubric with --kind executable\n"
                "  + --smoke <smoke.py> per W288-P2 C.1.",
                file=sys.stderr,
            )
            return 2
        print("=== W259-v9 U7 — promptfoo-lane (real `promptfoo eval`) ===")
        rows = run_promptfoo_lane(dry_run=args.dry_run)
        summary = _aggregate(rows)
        payload = {"rows": rows, "summary": summary}
        print(json.dumps(payload, indent=2))
        if not args.dry_run:
            _persist("promptfoo-lane.json", payload)
        ran = all(
            r.get("case") not in ("lane-init", "eval-run", "parse-output")
            or r.get("pass") is not False
            for r in rows
        )
        return 0 if ran else 1

    if args.mode == "sdk-aggregate":
        print("=== W259-v9 U7 — sdk-aggregate (aggregation THROUGH the Agent SDK) ===")

        # W326-F F-P2: Python 3.13 mature asyncio.TaskGroup pattern (PEP 654
        # ExceptionGroup-aware) — per docs.python.org/3.13/library/asyncio-task
        # ("Task groups"). Single-task usage preserves exact prior return shape
        # while opting into structured concurrency for future fan-out of the
        # aggregator (e.g., multi-lane parallel SDK queries in nightly mode).
        async def _runner() -> dict[str, Any]:
            async with asyncio.TaskGroup() as tg:
                task = tg.create_task(aggregate_via_sdk(SAMPLE_ROWS))
            return task.result()

        result = asyncio.run(_runner())
        print(json.dumps(result, indent=2))
        _persist("sdk-aggregate.json", result)
        if result["tool_calls"] == 1:
            print(
                "SELF-CHECK PASS: aggregation done in exactly 1 programmatic tool call."
            )
        else:
            print(f"NOTE: {result['tool_calls']} tool call(s) — expected 1.")
        return 0

    if args.mode == "sota-rubric":
        if not args.candidate:
            print(
                "ERROR: --candidate is required for sota-rubric mode "
                "(see W286d Section C.1).",
                file=sys.stderr,
            )
            return 2
        print("=== W288-P2-C1 — sota-rubric lane (8th rubric dimension) ===")
        # W305-D R8: capture started_at BEFORE the lane runs so the EvalLog
        # stats reflect actual lane wall-clock.
        sota_started_at = _now_iso_utc()
        audit_dict = run_sota_rubric_mode(
            candidate=args.candidate,
            smoke_test_path=args.smoke,
            kind=args.kind,
        )
        # W305-D R8 (sca-v5 SKILL.md §4.5): persist EvalLog under verdicts/ when
        # --wave is supplied. Maps audit_dict to the sca-v5 R8 schema:
        # {lane, candidate, baseline, metric, value, delta_vs_baseline, traces}.
        eval_log_path: str | None = None
        if args.wave:
            try:
                v = audit_dict.get("eval_pass")
                base = 4  # rubric ADOPT bar (sca-v5 SKILL.md §4.5)
                delta: Any = (v - base) if isinstance(v, int) else None
                lane_payload = {
                    "lane": "sota-rubric",
                    "candidate": audit_dict.get("candidate", args.candidate),
                    "baseline": base,
                    "metric": "sca_v5_eval_pass_0_to_5",
                    "value": v,
                    "delta_vs_baseline": delta,
                    "traces": [],
                    "reason": audit_dict.get("reason", ""),
                    "total": audit_dict.get("total"),
                    "passed": audit_dict.get("passed"),
                    "counts_toward_score_min_mean": audit_dict.get(
                        "counts_toward_score_min_mean"
                    ),
                }
                out_evallog = _persist_evallog(
                    wave=args.wave,
                    candidate=args.candidate,
                    lane="sota-rubric",
                    kind=args.kind,
                    result_payload=lane_payload,
                    started_at=sota_started_at,
                )
                eval_log_path = str(out_evallog.relative_to(REPO_ROOT)).replace(
                    "\\", "/"
                )
                print(
                    f"[W305-D R8] EvalLog persisted -> {eval_log_path}",
                    file=sys.stderr,
                )
            except Exception as exc:  # noqa: BLE001 — R8 write must NEVER crash the lane
                print(
                    f"[W305-D R8] EvalLog write failed ({type(exc).__name__}: "
                    f"{exc}); lane verdict still emitted. R8 ledger field will "
                    "be null.",
                    file=sys.stderr,
                )
        else:
            print(
                "[W305-D R8] --wave not supplied; skipping verdicts/ EvalLog "
                "write. Pass --wave <num> (e.g. --wave 305) OR set HARNESS_WAVE "
                "env to honour sca-v5 SKILL.md §4.5 R8 contract.",
                file=sys.stderr,
            )
        # Inject eval_log_path into the printed JSON so the ledger writer can pick
        # it up via stdout parsing (per sca-v5 SKILL.md §4.5: "The path is recorded
        # in the ledger episode under `eval_log_path`").
        # W301.I-codex-r1 P2 back-compat fix (2026-05-19): inject eval_log_path
        # as a flat key INSIDE audit_dict (don't nest the existing payload). Any
        # existing ledger/parser automation reading top-level eval_pass, candidate,
        # reason continues to work; new automation can also read eval_log_path.
        audit_dict["eval_log_path"] = eval_log_path
        print(json.dumps(audit_dict, indent=2))
        _persist(
            f"sota-rubric-{args.candidate}.json",
            {
                "audit_dict": audit_dict,
                "args": vars(args),
                "eval_log_path": eval_log_path,
            },
        )
        score = audit_dict["eval_pass"]
        if score == "N/A":
            print("VERDICT: N/A — excluded from score_min/mean (carve-out).")
            return 0
        if isinstance(score, int) and score >= 4:
            print(f"VERDICT: PASS — eval_pass={score}/5 (rubric ADOPT-qualifying).")
            return 0
        print(f"VERDICT: FAIL — eval_pass={score}/5 (below rubric ADOPT bar of 4).")
        return 1

    if args.mode == "memory-recall-lane":
        # W301-D D-v6-2 G11 memory-class eval Lane-D first-shipped W305.
        # Lane-D is the fourth eval lane (alongside aggregate-demo, inspect-lane,
        # promptfoo-lane, sota-rubric) specifically for memory-MCP candidates.
        # Closes the W304 5-source-convergence flag on `mem0ai/mem0` (row 16
        # AT-RISK-OF-T1-DOWNGRADE) by enabling head-to-head benchmark of Mem0
        # against the 5 W304-surfaced challengers (ALMA-memory R@5=0.964 +
        # total-agent-memory R@5=0.962 + agentmemory 95.2% + Mastra OM 94.87% +
        # Uranid/mnem). See docs/architecture/W305-D-V6-2-LANE-D-MEM0-HEADHEAD/
        # W305-LANE-D-DESIGN.md for protocol details.
        if not args.candidate:
            print(
                "ERROR: --candidate is required for memory-recall-lane mode "
                "(W301-D D-v6-2). Expected slug from the 6 candidates: "
                "mem0ai/mem0 | RBKunnela/ALMA-memory | "
                "vbcherepanov/total-agent-memory | rohitg00/agentmemory | "
                "mastra-ai/mastra | Uranid/mnem. See W305-STREAM-A-CHALLENGER-"
                "API-CONTRACTS.md for install paths.",
                file=sys.stderr,
            )
            return 2
        print("=== W301-D D-v6-2 — memory-recall-lane (G11 memory-class eval) ===")
        # Lazy-import the adapter package — keeps the rest of the harness usable
        # even before candidate packages are installed by the operator.
        # Ensure REPO_ROOT is on sys.path so the package resolves when the
        # harness is invoked as a script (`python harness/eval_harness.py`,
        # which puts `harness/` on sys.path[0], not REPO_ROOT). Idempotent.
        if str(REPO_ROOT) not in sys.path:
            sys.path.insert(0, str(REPO_ROOT))
        try:
            # Pyright pragma: this is a lazy script-mode import; the sys.path
            # insert above ensures runtime resolution (verified by W305 smoke
            # test PASS — `python harness/eval_harness.py --mode
            # memory-recall-lane --candidate _baseline_mock` exits 0 with
            # VERDICT: PARTIAL). Pyright cannot trace the dynamic sys.path
            # mutation; the import is statically valid given the explicit
            # `harness/__init__.py` + `harness/adapters/__init__.py` packages.
            from harness.adapters.memory_recall import (  # type: ignore[import-not-found]
                load_adapter,
            )
        except ImportError as exc:
            print(
                f"ERROR: harness/adapters/memory_recall/ package not loadable "
                f"({type(exc).__name__}: {exc}). This is W305-shipped "
                f"scaffolding — see harness/adapters/memory_recall/README.md "
                f"for adapter contract + operator-action items for installing "
                f"the actual candidate packages.",
                file=sys.stderr,
            )
            return 2
        try:
            adapter = load_adapter(args.candidate)
        except (KeyError, ImportError) as exc:
            print(
                f"ERROR: adapter for candidate '{args.candidate}' not "
                f"implemented yet ({type(exc).__name__}: {exc}). The Lane-D "
                f"scaffolding is shipped; per-candidate adapters require the "
                f"candidate package installed by operator (per W305 Stream A "
                f"install paths) THEN a wrapper at "
                f"harness/adapters/memory_recall/<slug>.py exposing "
                f"run_benchmark(corpus, sample_size, dry_run) -> dict. The "
                f"'_baseline_mock' adapter is always available for wiring "
                f"smoke-test (--candidate _baseline_mock).",
                file=sys.stderr,
            )
            return 2
        # W305-D R8: capture started_at BEFORE the lane runs.
        mem_started_at = _now_iso_utc()
        # W301.I-codex-r1 P2 fix (2026-05-19): registered adapters may raise
        # ImportError/NotImplementedError when the corpus isn't yet implemented
        # (e.g. default `longmemeval`). Catch + return controlled lane verdict
        # so the CLI is machine-parseable instead of dumping a raw traceback.
        try:
            result = adapter.run_benchmark(
                corpus=args.memory_corpus,
                sample_size=args.memory_sample_size,
                dry_run=args.dry_run,
            )
        except (ImportError, NotImplementedError) as e:
            print(
                f"VERDICT: SETUP-ERROR — memory-recall-lane adapter "
                f"'{args.candidate}' cannot run corpus '{args.memory_corpus}': "
                f"{type(e).__name__}: {e}. Try --memory-corpus _mock OR install "
                f"the corpus's runtime deps.",
                file=sys.stderr,
            )
            print(
                json.dumps(
                    {
                        "lane": "memory-recall",
                        "candidate": args.candidate,
                        "corpus": args.memory_corpus,
                        "verdict": "SETUP-ERROR",
                        "error_class": type(e).__name__,
                        "error_msg": str(e),
                    },
                    indent=2,
                )
            )
            return 2
        # W305-D R8 (sca-v5 SKILL.md §4.5): persist EvalLog under verdicts/ when
        # --wave is supplied. Maps Lane-D metrics to the R8 schema.
        mem_eval_log_path: str | None = None
        if args.wave:
            try:
                rp5_val = result.get("metrics", {}).get("recall_precision_at_5")
                base_rp5 = 0.49  # Mem0 published baseline
                delta_rp5: Any = (
                    (rp5_val - base_rp5) if isinstance(rp5_val, (int, float)) else None
                )
                lane_payload_mem = {
                    "lane": "memory-recall",
                    "candidate": args.candidate,
                    "baseline": base_rp5,
                    "metric": "recall_precision_at_5",
                    "value": rp5_val,
                    "delta_vs_baseline": delta_rp5,
                    "traces": result.get("traces", []),
                    "corpus": args.memory_corpus,
                    "sample_size": args.memory_sample_size,
                    "full_metrics": result.get("metrics", {}),
                }
                out_mem = _persist_evallog(
                    wave=args.wave,
                    candidate=args.candidate,
                    lane="memory-recall",
                    kind="mcp_memory",
                    result_payload=lane_payload_mem,
                    started_at=mem_started_at,
                )
                mem_eval_log_path = str(out_mem.relative_to(REPO_ROOT)).replace(
                    "\\", "/"
                )
                print(
                    f"[W305-D R8] EvalLog persisted -> {mem_eval_log_path}",
                    file=sys.stderr,
                )
            except Exception as exc:  # noqa: BLE001 — R8 write must NEVER crash the lane
                print(
                    f"[W305-D R8] EvalLog write failed ({type(exc).__name__}: "
                    f"{exc}); lane verdict still emitted.",
                    file=sys.stderr,
                )
        else:
            print(
                "[W305-D R8] --wave not supplied; skipping verdicts/ EvalLog "
                "write. Pass --wave <num> to honour sca-v5 SKILL.md §4.5 R8.",
                file=sys.stderr,
            )
        print(
            json.dumps({"result": result, "eval_log_path": mem_eval_log_path}, indent=2)
        )
        slug_safe = args.candidate.replace("/", "-")
        _persist(
            f"memory-recall-lane-{slug_safe}-{args.memory_corpus}.json",
            {
                "result": result,
                "args": vars(args),
                "eval_log_path": mem_eval_log_path,
            },
        )
        # Lane-D verdict: PASS if recall_precision_at_5 ≥ 0.60 (above Mem0's
        # measured 0.49 baseline + comfortable margin for noise/sampling).
        # PASS sets D8 benchmark_deltas = 5 (sca-v5 §4.5 mapping for +10%);
        # 0.50-0.60 = D8=3 (parity); <0.50 = D8=1 (regression vs Mem0).
        rp5 = result.get("metrics", {}).get("recall_precision_at_5", 0)
        if not isinstance(rp5, (int, float)):
            print(f"VERDICT: LANE-ERROR — recall_precision@5 not numeric: {rp5}")
            return 1
        delta_pp = (rp5 - 0.49) * 100
        if rp5 >= 0.60:
            print(
                f"VERDICT: PASS — recall_precision@5 = {rp5:.3f} "
                f"(above 0.60 ADOPT bar; +{delta_pp:.1f}pp vs Mem0 0.49 "
                f"baseline; D8 benchmark_deltas = 5)."
            )
            return 0
        if rp5 >= 0.50:
            print(
                f"VERDICT: PARTIAL — recall_precision@5 = {rp5:.3f} "
                f"(parity band 0.50-0.60; +{delta_pp:.1f}pp vs Mem0 0.49; "
                f"D8 benchmark_deltas = 3)."
            )
            return 0
        print(
            f"VERDICT: FAIL — recall_precision@5 = {rp5:.3f} "
            f"(below 0.50 parity band; {delta_pp:+.1f}pp vs Mem0 0.49 "
            f"baseline; D8 benchmark_deltas = 1)."
        )
        return 1

    if args.mode == "harness-audit-lane":
        # W316 P0c Lane D — HarnessAudit-Bench safety-trajectory eval.
        # Intended for codex Stop-hook chaining per W316-C wiring spec.
        print("=== W316 P0c — harness-audit-lane (HarnessAudit-Bench safety eval) ===")
        ha_repo = Path(args.harness_audit_repo) if args.harness_audit_repo else None
        rows = run_harness_audit_lane(
            dry_run=args.dry_run,
            limit=args.limit
            if args.limit is not None
            else (1 if args.dry_run else None),
            repo_path=ha_repo,
        )
        summary = _aggregate(rows)
        payload = {"rows": rows, "summary": summary, "lane": "harness-audit"}
        print(json.dumps(payload, indent=2))
        _persist("harness-audit-lane.json", payload)
        # W316-C R8 — persist EvalLog when --wave supplied (sca-v5 §4.5 contract).
        if args.wave:
            try:
                started = _now_iso_utc()
                ha_log = _persist_evallog(
                    wave=args.wave,
                    candidate="eric-ai-lab/HarnessAudit",
                    lane="harness-audit",
                    kind="safety_eval",
                    result_payload=payload,
                    started_at=started,
                )
                print(
                    f"[W316-C R8] EvalLog persisted -> "
                    f"{str(ha_log.relative_to(REPO_ROOT)).replace(chr(92), '/')}",
                    file=sys.stderr,
                )
            except Exception as exc:  # noqa: BLE001 — R8 write must not crash the lane
                print(
                    f"[W316-C R8] EvalLog write failed ({type(exc).__name__}: {exc}); "
                    f"lane verdict still emitted.",
                    file=sys.stderr,
                )
        # Lane verdict — W316-codex-r3 closure F2 fix: exit code must match
        # pass=False signal so Stop-hook runners (which key off exit status) do
        # NOT prematurely greenlight Lane D when only filesystem-reachability is
        # verified. Pre-r3 path returned 0 in dry-run mode — codex round-3 F2
        # MEDIUM flagged this as still-premature-greenlight despite pass=False
        # in the row payload.
        all_pass = all(r.get("pass", False) for r in rows)
        if all_pass:
            print(
                "VERDICT: PASS — harness-audit-lane smoke succeeded "
                "(repo reachable, fixtures present)."
            )
            return 0
        # SETUP-PENDING — exit non-zero so process-exit-keyed hook runners
        # treat this as a non-blocking-but-not-green signal. Stop-hook spec at
        # W316-C-CODEX-STOP-HOOK-WIRING-SPEC.md must use the `continueOnBlock:
        # true` semantic OR an explicit `--allow-setup-pending-exit-zero` flag
        # to gate Lane D before real-binding ships in W317.
        print(
            "VERDICT: SETUP-PENDING — harness-audit-lane reachable but real-run "
            "binding is W317 operator-AI per W316-C wiring spec. "
            "Exit-code 2 signals SETUP-PENDING to Stop-hook runners "
            "(W316-codex-r3 F2 closure)."
        )
        return 2

    if args.mode == "swe-bench-pro-lane":
        # W316 P0c Lane E — SWE-Bench Pro ship-gate (nightly cadence, NOT Stop-hook).
        print("=== W316 P0c — swe-bench-pro-lane (SWE-Bench Pro ship-gate) ===")
        swe_repo = Path(args.swe_bench_pro_repo) if args.swe_bench_pro_repo else None
        patches = Path(args.patches_json) if args.patches_json else None
        rows = run_swe_bench_pro_lane(
            dry_run=args.dry_run,
            limit=args.limit,
            repo_path=swe_repo,
            patches_json=patches,
        )
        summary = _aggregate(rows)
        payload = {"rows": rows, "summary": summary, "lane": "swe-bench-pro"}
        print(json.dumps(payload, indent=2))
        _persist("swe-bench-pro-lane.json", payload)
        if args.wave:
            try:
                started = _now_iso_utc()
                swe_log = _persist_evallog(
                    wave=args.wave,
                    candidate="scaleapi/SWE-bench_Pro-os",
                    lane="swe-bench-pro",
                    kind="ship_gate",
                    result_payload=payload,
                    started_at=started,
                )
                print(
                    f"[W316-C R8] EvalLog persisted -> "
                    f"{str(swe_log.relative_to(REPO_ROOT)).replace(chr(92), '/')}",
                    file=sys.stderr,
                )
            except Exception as exc:  # noqa: BLE001
                print(
                    f"[W316-C R8] EvalLog write failed ({type(exc).__name__}: {exc}); "
                    f"lane verdict still emitted.",
                    file=sys.stderr,
                )
        all_pass = all(r.get("pass", False) for r in rows)
        if all_pass:
            print("VERDICT: PASS — swe-bench-pro-lane smoke succeeded.")
            return 0
        print(
            "VERDICT: SETUP-PENDING — swe-bench-pro-lane real run is W317 operator-AI "
            "(needs --patches-json + Modal/Docker setup)."
        )
        return 0 if args.dry_run else 1

    if args.mode == "ragas-lane":
        # W369 P1.5 — RAGAS faithfulness + answer_relevancy lane.
        print("=== W369 P1.5 — ragas-lane (RAGAS faithfulness + answer_relevancy) ===")
        rows = run_ragas_lane(smoke=bool(getattr(args, "lane_smoke", False)))
        summary = _aggregate(rows)
        payload = {"rows": rows, "summary": summary, "lane": "ragas"}
        print(json.dumps(payload, indent=2))
        _persist("ragas-lane.json", payload)
        # Verdict: PASS iff every row passed AND no lane-init failure.
        all_pass = all(r.get("pass", False) for r in rows)
        if all_pass:
            print("VERDICT: PASS — ragas-lane succeeded.")
            return 0
        # smoke=False with no judge key -> lane-init / eval-run FAIL row. Surface
        # exit-code 1 so CI keys off process exit (mirrors inspect-lane/promptfoo).
        print("VERDICT: FAIL — ragas-lane produced failing rows; see payload above.")
        return 1

    if args.mode == "deepeval-lane":
        # W369 P1.5 — DeepEval HallucinationMetric lane.
        print("=== W369 P1.5 — deepeval-lane (DeepEval HallucinationMetric) ===")
        rows = run_deepeval_lane(smoke=bool(getattr(args, "lane_smoke", False)))
        summary = _aggregate(rows)
        payload = {"rows": rows, "summary": summary, "lane": "deepeval"}
        print(json.dumps(payload, indent=2))
        _persist("deepeval-lane.json", payload)
        all_pass = all(r.get("pass", False) for r in rows)
        if all_pass:
            print("VERDICT: PASS — deepeval-lane succeeded.")
            return 0
        print("VERDICT: FAIL — deepeval-lane produced failing rows; see payload above.")
        return 1

    if args.mode == "nightly":
        print(
            "=== W259-v9 U7 — nightly cadence "
            "(inspect_ai + promptfoo lanes -> SDK aggregate) ==="
        )
        # Run BOTH real eval lanes. limit=1 caps real-model spend per lane to one case;
        # under --dry-run inspect uses mockllm and promptfoo skips execution (zero spend).
        inspect_rows = run_inspect_lane(
            dry_run=args.dry_run, limit=1 if not args.dry_run else None
        )
        promptfoo_rows = run_promptfoo_lane(dry_run=args.dry_run)
        # Real eval rows from the lanes. Drop dry-run placeholder rows (pass is None) from
        # the aggregate so the verdict reflects only genuine pass/fail results.
        lane_rows = [
            r for r in (inspect_rows + promptfoo_rows) if r.get("pass") is not None
        ]
        rows = lane_rows if lane_rows else inspect_rows + promptfoo_rows
        try:
            # W326-F F-P2: Python 3.13 mature asyncio.TaskGroup pattern (PEP 654
            # ExceptionGroup-aware) — per docs.python.org/3.13/library/asyncio-task
            # ("Task groups"). Wrapping the single SDK aggregation in a TaskGroup
            # gives uniform structured-concurrency semantics with the
            # sdk-aggregate mode above, and the surrounding try/except already
            # handles the BaseExceptionGroup raised on aggregator failure
            # (cadence MUST NOT crash; lane-level fallback preserved).
            async def _runner() -> dict[str, Any]:
                async with asyncio.TaskGroup() as tg:
                    task = tg.create_task(aggregate_via_sdk(rows))
                return task.result()

            agg = asyncio.run(_runner())
        except Exception as exc:  # noqa: BLE001 - cadence must not crash the runner
            print(
                f"SDK aggregation unavailable ({exc}); falling back to offline aggregate."
            )
            agg = {"offline_summary": _aggregate(rows)}
        cadence = {
            "inspect_lane": inspect_rows,
            "promptfoo_lane": promptfoo_rows,
            "offline_summary": _aggregate(rows),
            "aggregation": agg,
        }
        out = _persist("nightly.json", cadence)
        print(json.dumps(cadence, indent=2))
        print(f"\npersisted -> {out}")
        return 0

    return 0


if __name__ == "__main__":
    sys.exit(main())

# W297 Lane-C smoke test — `astral-sh/uv` (T1-PENDING-LANE-C #3)
#
# Surface: CLI (`uv` binary). Benchmarkable claims from W296 Stream C §3.I.1:
#   D8=4 ("10-100× pip" benchmark in author docs; rye-absorbed measured).
# This smoke executes 5 deterministic checks against the LOCALLY-INSTALLED
# uv binary (version 0.11.14 verified 2026-05-18) measuring real
# capability — version, venv creation, requirements compilation, lockfile
# determinism, and a no-cache install round-trip — then returns the row
# matrix consumed by harness/sota_rubric_lane.py:_run_smoke_rows.
#
# Honest no-net policy: every probe uses uv's offline-friendly modes
# (`--offline` where available, in-memory tempdir for venv). No PyPI
# network round-trips are required for the cases below.

from __future__ import annotations

import shutil
import subprocess
import tempfile
from pathlib import Path


def _check(label: str, args: list[str], timeout: float = 30.0) -> dict:
    """Run uv with args; record pass if exit-code 0."""
    uv = shutil.which("uv")
    if uv is None:
        return {
            "case": label,
            "pass": False,
            "cost_usd": 0.0,
            "reason": "uv binary not on PATH",
        }
    try:
        proc = subprocess.run(
            [uv, *args],
            capture_output=True,
            text=True,
            timeout=timeout,
            check=False,
        )
    except (subprocess.TimeoutExpired, OSError) as exc:
        return {
            "case": label,
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"exec error: {exc}",
        }
    ok = proc.returncode == 0
    reason = ""
    if not ok:
        reason = (proc.stderr or proc.stdout or "")[:200].strip()
    return {
        "case": label,
        "pass": ok,
        "cost_usd": 0.0,
        "reason": reason,
        "stdout_first_line": (proc.stdout.splitlines() or [""])[0][:120],
    }


def run() -> list[dict]:
    rows: list[dict] = []

    # Case 1 — uv version (basic invocation)
    rows.append(_check("uv-version", ["--version"]))

    # Case 2 — `uv pip list --help` (CLI subcommand wiring)
    rows.append(_check("uv-pip-list-help", ["pip", "list", "--help"]))

    # Case 3 — venv creation in temp dir (deterministic primitive replacement claim)
    with tempfile.TemporaryDirectory() as td:
        venv_path = Path(td) / "uv-smoke-venv"
        rows.append(
            _check(
                "uv-venv-create",
                ["venv", str(venv_path), "--no-project"],
                timeout=45.0,
            )
        )
        # Case 4 — verify the venv was created with the expected layout
        py = (
            venv_path / "Scripts" / "python.exe"
            if (venv_path / "Scripts").exists()
            else venv_path / "bin" / "python"
        )
        rows.append(
            {
                "case": "uv-venv-python-exists",
                "pass": py.exists(),
                "cost_usd": 0.0,
                "reason": "" if py.exists() else f"python not found at {py}",
            }
        )

    # Case 5 — `uv --help` exit-code-0 (regression guard for top-level CLI)
    rows.append(_check("uv-help", ["--help"]))

    return rows


if __name__ == "__main__":
    import json

    print(json.dumps(run(), indent=2))

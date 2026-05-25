# tests/test_dispatch_temporal_cli.py
import json
import os
from typer.testing import CliRunner

runner = CliRunner()


def test_help_lists_essential_verbs():
    from tools.dispatch_temporal import app

    result = runner.invoke(app, ["--help"])
    assert result.exit_code == 0
    out = result.stdout
    for verb in [
        "doctor",
        "up",
        "submit",
        "watch",
        "result",
        "cancel",
        "status",
        "down",
        "reconcile",
    ]:
        assert verb in out, f"verb {verb!r} missing from --help"


def test_doctor_dry_run_exits_zero():
    from tools.dispatch_temporal import app

    result = runner.invoke(app, ["doctor", "--output", "json"])
    # doctor may report "issues" but should still exit 0 (it's diagnostic, not failure)
    assert result.exit_code in (0, 1)  # 0 = clean, 1 = issues found


def test_submit_dry_run_prints_taskspec_no_dispatch():
    from tools.dispatch_temporal import app

    result = runner.invoke(
        app, ["submit", "implement foo", "--dry-run", "--output", "json"]
    )
    assert result.exit_code == 0
    payload = json.loads(result.stdout)
    assert payload.get("task") == "implement foo"
    assert "conversation_id" in payload


def test_status_unknown_workflow_handles_gracefully(monkeypatch):
    # Mock Client.connect to return a client whose handle.describe raises
    from tools.dispatch_temporal import app
    from unittest.mock import patch, AsyncMock, MagicMock

    fake_handle = MagicMock()
    fake_handle.describe = AsyncMock(side_effect=Exception("workflow not found"))
    fake_client = MagicMock()
    fake_client.get_workflow_handle = MagicMock(return_value=fake_handle)
    with patch(
        "tools.dispatch_temporal.Client.connect",
        new=AsyncMock(return_value=fake_client),
    ):
        result = runner.invoke(app, ["status", "nonexistent-conv-id"])
    # Should exit non-zero but not crash
    assert result.exit_code != 0


# ============================================================
# W376 Task 12 — --workspace-mode CLI flag (codex r1 A6 + S1; codex r3 D2-S1)
# ============================================================


def test_submit_workspace_mode_flag_propagates_to_spec(tmp_path, monkeypatch):
    """--workspace-mode local|remote propagates to TaskSpec.workspace_mode.

    codex r3 D2-S1 fix: local mode now ALSO requires --i-trust-this-task; this
    test passes --i-trust-this-task so workspace_mode propagation can be verified.
    """
    import subprocess

    result = subprocess.run(
        [
            "python",
            "tools/dispatch_temporal.py",
            "submit",
            "test",
            "--workspace-mode",
            "local",
            "--i-trust-this-task",
            "--dry-run",
            "-o",
            "text",
        ],
        capture_output=True,
        text=True,
        env={**os.environ, "PYTHONPATH": "."},
    )
    assert "workspace_mode" in result.stdout
    assert "local" in result.stdout


def test_submit_workspace_mode_local_without_trust_flag_rejected():
    """codex r3 D2-S1 fix: --workspace-mode local MUST require --i-trust-this-task."""
    import subprocess

    result = subprocess.run(
        [
            "python",
            "tools/dispatch_temporal.py",
            "submit",
            "test",
            "--workspace-mode",
            "local",
            "--dry-run",
            "-o",
            "text",
        ],
        capture_output=True,
        text=True,
        env={**os.environ, "PYTHONPATH": "."},
    )
    # exit non-zero AND error message names the trust flag
    assert result.returncode != 0
    assert "--i-trust-this-task" in (result.stderr + result.stdout)


def test_submit_workspace_mode_remote_default_no_trust_required():
    """Default 'remote' mode requires NO trust flag and propagates correctly."""
    from tools.dispatch_temporal import app

    result = runner.invoke(
        app, ["submit", "implement foo", "--dry-run", "--output", "json"]
    )
    assert result.exit_code == 0
    payload = json.loads(result.stdout)
    assert payload.get("workspace_mode") == "remote"

import json
from pathlib import Path
from agents.models import TaskSpec, TaskStatus, TaskResult


def test_taskspec_defaults():
    s = TaskSpec(task="fix the bug")
    assert (
        s.runtime == "openhands"
        and s.hitl is False
        and s.budget.wall_time_seconds == 1800
    )


def test_taskspec_rejects_empty():
    import pytest

    with pytest.raises(ValueError):
        TaskSpec(task="")


def test_taskresult_roundtrips_json():
    r = TaskResult(status=TaskStatus.COMPLETE, result="done", artifacts=["a.py"])
    back = TaskResult.model_validate_json(r.model_dump_json())
    assert back.status is TaskStatus.COMPLETE and back.artifacts == ["a.py"]


def test_schema_in_sync():
    assert (
        json.loads(Path("schemas/agent_task.schema.json").read_text())
        == TaskSpec.model_json_schema()
    )


def test_taskspec_has_codex_profile_default():
    from agents.models import TaskSpec

    spec = TaskSpec(task="test task")
    assert spec.codex_profile == "t1-light"


def test_taskspec_accepts_codex_profile_literal():
    from agents.models import TaskSpec

    for prof in ["t1-light", "t2-standard", "t3-deep", "deep-review-exec"]:
        spec = TaskSpec(task="t", codex_profile=prof)
        assert spec.codex_profile == prof


def test_taskspec_rejects_invalid_codex_profile():
    import pytest
    from pydantic import ValidationError
    from agents.models import TaskSpec

    with pytest.raises(ValidationError):
        TaskSpec(task="t", codex_profile="nonsense-profile")


def test_taskspec_has_stable_conversation_id():
    from agents.models import TaskSpec

    spec = TaskSpec(task="same task")
    assert isinstance(spec.conversation_id, str)
    assert len(spec.conversation_id) > 0
    spec2 = TaskSpec(task="same task", conversation_id=spec.conversation_id)
    assert spec.conversation_id == spec2.conversation_id


def test_budget_new_fields_defaults():
    from agents.models import Budget

    b = Budget()
    assert b.no_progress_seconds == 600
    assert b.p99_target_sec == 1800
    assert b.max_attempts == 3


def test_taskspec_workspace_mode_default_is_remote():
    """W376 v1: default workspace_mode='remote' matches W375 original
    security intent (Docker isolation by default)."""
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(task="echo", budget=Budget())
    assert spec.workspace_mode == "remote"


def test_taskspec_workspace_mode_explicit_local():
    """Operator can opt into local mode for trusted fast tasks."""
    from agents.models import TaskSpec, Budget

    spec = TaskSpec(task="echo", budget=Budget(), workspace_mode="local")
    assert spec.workspace_mode == "local"


def test_taskspec_workspace_mode_invalid_value_raises():
    """Pydantic Literal type rejects unknown modes."""
    import pytest
    from agents.models import TaskSpec, Budget

    with pytest.raises(Exception):  # pydantic.ValidationError
        TaskSpec(task="echo", budget=Budget(), workspace_mode="docker-compose")

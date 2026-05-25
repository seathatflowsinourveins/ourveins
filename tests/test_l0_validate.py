# tests/test_l0_validate.py
import pytest


def test_valid_taskspec_returns_pass():
    from agents.l0_validate import validate_task_spec
    from agents.models import TaskSpec

    spec = TaskSpec(task="implement function foo", repo="some-repo")
    result = validate_task_spec(spec)
    assert result["verdict"] == "PASS"
    assert "task_id" in result


def test_empty_task_raises():
    from agents.l0_validate import validate_task_spec
    from agents.models import Budget, TaskSpec, TaskSpecError

    # Use model_construct to bypass Pydantic's own min_length=1 guard so we can
    # test that validate_task_spec itself catches the empty-string case.
    spec_empty = TaskSpec.model_construct(task="", budget=Budget())
    with pytest.raises(TaskSpecError):
        validate_task_spec(spec_empty)


def test_overlong_task_raises():
    from agents.l0_validate import validate_task_spec
    from agents.models import TaskSpec, TaskSpecError

    huge = "x" * 10001
    spec = TaskSpec(task=huge)
    with pytest.raises(TaskSpecError):
        validate_task_spec(spec)


def test_shell_injection_marker_raises():
    from agents.l0_validate import validate_task_spec
    from agents.models import TaskSpec, TaskSpecError

    for payload in ["foo $(rm -rf /)", "foo `rm -rf /`", "foo ${IFS}cat /etc/passwd"]:
        spec = TaskSpec(task=payload)
        with pytest.raises(TaskSpecError):
            validate_task_spec(spec)


def test_path_traversal_repo_raises():
    from agents.l0_validate import validate_task_spec
    from agents.models import TaskSpec, TaskSpecError

    for bad in ["../etc", "..\\Windows", "/etc/shadow", "C:\\Windows\\System32"]:
        spec = TaskSpec(task="ok", repo=bad)
        with pytest.raises(TaskSpecError):
            validate_task_spec(spec)


def test_null_byte_in_repo_raises():
    from agents.l0_validate import validate_task_spec
    from agents.models import TaskSpec, TaskSpecError

    spec = TaskSpec(task="ok", repo="my-repo\x00rogue")
    with pytest.raises(TaskSpecError):
        validate_task_spec(spec)


def test_budget_out_of_range_raises():
    from agents.l0_validate import validate_task_spec
    from agents.models import TaskSpec, Budget, TaskSpecError

    spec = TaskSpec(task="ok", budget=Budget(iterations=501))
    with pytest.raises(TaskSpecError):
        validate_task_spec(spec)
    spec2 = TaskSpec(task="ok", budget=Budget(timeout_seconds=7201))
    with pytest.raises(TaskSpecError):
        validate_task_spec(spec2)

# tests/test_event_store.py
import json
import pathlib
from agents.event_store import (
    atomic_append_event,
    atomic_write_artifact,
    get_task_dir,
    persist_field,
)


def test_atomic_append_event(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.event_store.STATE_ROOT", str(tmp_path))
    conv_id = "test-conv-001"
    atomic_append_event(conv_id, "task.created.v1", {"task": "test"})
    atomic_append_event(conv_id, "task.event.v1", {"iter": 1})
    p = pathlib.Path(tmp_path) / "tasks" / conv_id / "events.jsonl"
    assert p.exists()
    lines = p.read_text().splitlines()
    assert len(lines) == 2
    assert json.loads(lines[0])["type"] == "task.created.v1"
    assert json.loads(lines[1])["type"] == "task.event.v1"
    assert "ts" in json.loads(lines[0])


def test_atomic_write_artifact(tmp_path):
    p = tmp_path / "artifact.txt"
    atomic_write_artifact(str(p), b"hello world")
    assert p.read_bytes() == b"hello world"


def test_atomic_write_artifact_overwrites(tmp_path):
    p = tmp_path / "artifact.txt"
    atomic_write_artifact(str(p), b"first")
    atomic_write_artifact(str(p), b"second")
    assert p.read_bytes() == b"second"


def test_persist_field(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.event_store.STATE_ROOT", str(tmp_path))
    persist_field("conv-x", "container_id.txt", "sha256:abc123")
    p = pathlib.Path(tmp_path) / "tasks" / "conv-x" / "container_id.txt"
    assert p.read_text() == "sha256:abc123"


def test_get_task_dir_creates(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.event_store.STATE_ROOT", str(tmp_path))
    d = get_task_dir("conv-new")
    assert d.exists() and d.is_dir()
    assert d.name == "conv-new"

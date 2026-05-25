# agents/event_store.py
"""Per-task durable event store with portalocker atomic writes + CloudEvents version-in-type.

Cite: spec §11 v6 + V10 (CloudEvents lineage) + codex r5/r6 P0-4 (portalocker cross-platform lock)."""

import os
import json
import tempfile
import pathlib
from datetime import datetime, timezone
import portalocker

STATE_ROOT = "Z:/claude-sota-installed-state/w375"


def get_task_dir(conv_id: str) -> pathlib.Path:
    """Return (and create) the per-task dir under STATE_ROOT/tasks/<conv_id>/."""
    p = pathlib.Path(STATE_ROOT) / "tasks" / conv_id
    p.mkdir(parents=True, exist_ok=True)
    return p


def atomic_append_event(conv_id: str, event_type: str, payload: dict) -> None:
    """Append JSONL event with cross-platform file lock (portalocker).

    `event_type` follows CloudEvents version-in-type convention (e.g. "task.created.v1").
    """
    task_dir = get_task_dir(conv_id)
    path = task_dir / "events.jsonl"
    lock_path = str(path) + ".lock"
    record = {
        "type": event_type,
        "ts": datetime.now(timezone.utc).isoformat(),
        **payload,
    }
    with portalocker.Lock(lock_path, "a", timeout=10):
        with open(path, "a", encoding="utf-8") as f:
            f.write(json.dumps(record) + "\n")
            f.flush()
            os.fsync(f.fileno())


def atomic_write_artifact(path: str, content: bytes) -> None:
    """Atomic write via tempfile + os.replace (cross-platform atomic rename)."""
    d = os.path.dirname(path) or "."
    os.makedirs(d, exist_ok=True)
    with tempfile.NamedTemporaryFile("wb", dir=d, delete=False) as tmp:
        tmp.write(content)
        tmp.flush()
        os.fsync(tmp.fileno())
        tmpname = tmp.name
    os.replace(tmpname, path)


def persist_field(conv_id: str, filename: str, value: str) -> None:
    """Persist a small field (e.g. container_id.txt, model.txt) atomically."""
    task_dir = get_task_dir(conv_id)
    atomic_write_artifact(str(task_dir / filename), value.encode("utf-8"))

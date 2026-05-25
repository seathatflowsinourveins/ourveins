# agents/schema_router.py
"""W375 SchemaRouter — CloudEvents version-in-type + BFS with visited set + max_hops cap.

Cite: spec §11 v6 + V10 (CloudEvents lineage) + codex r5/r6 P1-3 (visited/cycle/max-hops).

Usage:
    @SchemaRouter.register_upcaster("task.created.v1", "task.created.v2")
    def upcast_v1_to_v2(raw): return {**raw, "type": "task.created.v2", "new_field": True}

    record = SchemaRouter.read(raw_json, target_type="task.created.v2")
"""

from __future__ import annotations
from typing import Callable


class SchemaError(Exception):
    """Raised when no upcast path exists or max-hops exceeded."""


class SchemaRouter:
    upcasters: dict[tuple[str, str], Callable] = {}
    MAX_HOPS = 8

    @classmethod
    def register_upcaster(cls, from_type: str, to_type: str):
        def deco(fn: Callable):
            cls.upcasters[(from_type, to_type)] = fn
            return fn

        return deco

    @classmethod
    def read(cls, raw: dict, target_type: str | None = None) -> dict:
        src = raw["type"]
        target = target_type or src  # identity if no target
        if src == target:
            return raw
        path = cls._find_path(src, target)
        if path is None:
            raise SchemaError(f"no upcast path from {src} to {target}")
        cur = raw
        for frm, to in zip(path, path[1:]):
            cur = cls.upcasters[(frm, to)](cur)
        return cur

    @classmethod
    def _find_path(cls, src: str, target: str) -> list[str] | None:
        """BFS with visited set + MAX_HOPS cap to prevent cycles & runaway traversal."""
        if src == target:
            return [src]
        visited: set[str] = {src}
        queue: list[list[str]] = [[src]]
        while queue:
            path = queue.pop(0)
            if len(path) - 1 >= cls.MAX_HOPS:
                continue
            last = path[-1]
            for frm, to in cls.upcasters.keys():
                if frm == last and to not in visited:
                    if to == target:
                        return path + [to]
                    visited.add(to)
                    queue.append(path + [to])
        return None

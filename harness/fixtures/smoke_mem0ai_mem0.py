# W297 Lane-C smoke test — `mem0ai/mem0` (T1-PENDING-LANE-C #5 borderline)
#
# Surface: Python SDK (in-process). W296 Stream C §3.D.1 D8=4 (LongMemEval
# 49% measured; +15pt gap vs Zep 63.8%). LongMemEval is the published
# benchmark — running it here is a full multi-LLM eval ($$$) outside the
# scope of a deterministic smoke. We instead verify the SDK's IMPORT +
# CORE-API CONTRACT — the surfaces that any MCP-wrap layer would consume.
#
# Per W296 §3.D.1 the canonical mem0 import path is `from mem0 import
# Memory` (verified against mem0ai/mem0@2.0.2 installed in
# Z:/venvs/claude). For a no-network smoke we DO NOT instantiate Memory()
# (would attempt to connect to a vector store backend). We verify the
# class is importable + has the expected public methods (.add, .search,
# .get_all, .delete) that a runtime MCP-wrap would proxy.
#
# This is "parity-by-default" per SKILL §4.5 — full benchmark replay is
# deferred to a future wave with explicit LongMemEval allocation.

from __future__ import annotations


def _try_module_import() -> dict:
    try:
        import mem0  # noqa: F401

        version = getattr(mem0, "__version__", "unknown")
        return {
            "case": "mem0-import",
            "pass": True,
            "cost_usd": 0.0,
            "reason": f"mem0 v{version} imported",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "mem0-import",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"import error: {exc}",
        }


def _try_memory_class() -> dict:
    try:
        from mem0 import Memory

        return {
            "case": "memory-class-exists",
            "pass": True,
            "cost_usd": 0.0,
            "reason": f"Memory class loaded: {Memory.__module__}.{Memory.__name__}",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "memory-class-exists",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"Memory import error: {exc}",
        }


def _try_api_surface() -> dict:
    expected = ["add", "search", "get_all", "delete"]
    try:
        from mem0 import Memory

        missing = [m for m in expected if not hasattr(Memory, m)]
        if missing:
            return {
                "case": "memory-api-surface",
                "pass": False,
                "cost_usd": 0.0,
                "reason": f"missing methods: {missing}",
            }
        return {
            "case": "memory-api-surface",
            "pass": True,
            "cost_usd": 0.0,
            "reason": f"all {len(expected)} methods present",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "memory-api-surface",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"api inspection error: {exc}",
        }


def _try_config_class() -> dict:
    """Try to import the canonical config primitive (MemoryConfig or similar)."""
    candidates = [
        "MemoryConfig",
        "Config",
    ]
    try:
        import mem0

        found = [c for c in candidates if hasattr(mem0, c)]
        if not found:
            try:
                from mem0.configs.base import MemoryConfig  # noqa: F401

                found = ["MemoryConfig (via mem0.configs.base)"]
            except Exception:  # noqa: BLE001
                pass
        return {
            "case": "memory-config-class",
            "pass": bool(found),
            "cost_usd": 0.0,
            "reason": (
                f"found config classes: {found}"
                if found
                else "no canonical Config class found"
            ),
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "memory-config-class",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"config inspection error: {exc}",
        }


def _try_async_memory() -> dict:
    """async path is canonical for autonomous-loop integrations."""
    try:
        from mem0 import AsyncMemory  # noqa: F401

        return {
            "case": "async-memory-class",
            "pass": True,
            "cost_usd": 0.0,
            "reason": "AsyncMemory class loaded",
        }
    except Exception as exc:  # noqa: BLE001
        return {
            "case": "async-memory-class",
            "pass": False,
            "cost_usd": 0.0,
            "reason": f"AsyncMemory import error: {exc}",
        }


def run() -> list[dict]:
    return [
        _try_module_import(),
        _try_memory_class(),
        _try_api_surface(),
        _try_config_class(),
        _try_async_memory(),
    ]


if __name__ == "__main__":
    import json

    print(json.dumps(run(), indent=2))

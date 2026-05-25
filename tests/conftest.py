# tests/conftest.py
"""Session-wide stubs for packages that cannot import on Python 3.14.

langfuse==4.2.0 uses pydantic.v1 at module-import time, which raises
``pydantic.v1.errors.ConfigError: unable to infer type for attribute "description"``
on Python 3.14+ (pydantic v1 compatibility shim is broken above 3.13).

The stub installs a fake ``langfuse`` module into ``sys.modules`` BEFORE any test
monkeypatches ``langfuse.Langfuse`` or ``langfuse.propagate_attributes``, so
``monkeypatch.setattr("langfuse.X", ...)`` resolves against the stub (not the
broken real package). The stub is injected once at session start; pytest
``monkeypatch`` restores individual attrs after each test as normal.
"""

from __future__ import annotations

import sys
import types
from contextlib import contextmanager
from unittest.mock import MagicMock


def _install_langfuse_stub() -> None:
    """Inject a lightweight fake langfuse module if langfuse cannot be imported."""
    # Try importing the real langfuse first; only stub on failure.
    try:
        import langfuse  # noqa: F401

        return  # real langfuse imported OK — no stub needed
    except Exception:
        pass

    # Real langfuse broken — install a minimal stub so monkeypatch.setattr works.
    if "langfuse" in sys.modules:
        return  # already stubbed (e.g. by a prior conftest load)

    fake_langfuse = types.ModuleType("langfuse")

    # Attributes referenced by test monkeypatches:
    fake_langfuse.Langfuse = MagicMock(name="Langfuse")  # type: ignore[attr-defined]

    @contextmanager
    def _propagate_attributes(**kwargs):  # type: ignore[misc]
        yield None

    fake_langfuse.propagate_attributes = _propagate_attributes  # type: ignore[attr-defined]

    sys.modules["langfuse"] = fake_langfuse


# Install at import time (conftest.py is imported before any test module).
_install_langfuse_stub()

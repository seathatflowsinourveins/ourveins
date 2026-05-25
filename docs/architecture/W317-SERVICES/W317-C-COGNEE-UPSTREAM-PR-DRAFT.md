# W317-C-COGNEE-UPSTREAM-PR-DRAFT — paste-ready PR body for `topoteretes/cognee`

> Operator action: clone `topoteretes/cognee`, branch off `main`, apply the diff
> below, push to a fork, open PR with the body below. The PR closes a packaging bug
> that surfaces under any uvx-isolated env (CC marketplace + `uvx` MCP installs).

## Repo + branch

- Upstream: `https://github.com/topoteretes/cognee`
- License: Apache-2.0 (clean for PR contribution)
- Target branch: `main`
- Suggested fork branch: `fix/cognee-mcp-packaging-w317`

## PR title

```
fix(cognee-mcp): rename src/ -> cognee_mcp/ so uvx-stdio installs work
```

## PR body (paste verbatim)

```
## Problem

Installing `cognee-mcp` via `uvx --from <cognee-mcp dir> cognee-mcp --transport stdio`
(or via any uvx-isolated env that does not put the build directory on `sys.path`)
fails with:

    ModuleNotFoundError: No module named 'server'

Trace:

    cognee_mcp/__init__.py: from server import main as server_main

The bare-server import resolves under `python <cognee-mcp>/src/server.py` (the
default NSSM `AppDirectory` cwd) but not under uvx, pipx, or any isolated install.

## Root cause

`pyproject.toml` declares:

    [tool.hatch.build.targets.wheel]
    packages = ["src"]

This makes the wheel install at the Python module path `src.*`, not the package
name `cognee_mcp.*`. Entry-points then reference `src:main` / `src:main_mcp`, so
the wheel works only when the consumer happens to import as `src.server` — which
uvx-isolated envs do not.

## Fix

1. Rename directory `cognee-mcp/src/` -> `cognee-mcp/cognee_mcp/`.
2. `pyproject.toml`:
   - `[tool.hatch.build.targets.wheel] packages = ["cognee_mcp"]` (was `["src"]`)
   - `[project.scripts] cognee = "cognee_mcp:main"` (was `"src:main"`)
   - `[project.scripts] cognee-mcp = "cognee_mcp:main_mcp"` (was `"src:main_mcp"`)
3. `cognee_mcp/__init__.py`: replace bare `from server import main as server_main`
   with `from cognee_mcp.server import main as server_main` (the lazy-import
   fallback path inside `_load_server_main`).

No public-API changes. All internal imports inside the package are already
relative (`from .cognee_client import ...` etc.), so the rename is transparent.

## Smoke test

Before:
    $ uvx --from . cognee-mcp --transport stdio
    Traceback (most recent call last):
      ...
      File ".../cognee_mcp/__init__.py", line 15, in _load_server_main
        from server import main as server_main
    ModuleNotFoundError: No module named 'server'

After:
    $ uvx --from . cognee-mcp --transport stdio
    [info] Logging initialized cognee_version=1.1.0 ...
    [info] auth posture: authentication=required ...
    <server blocks on stdin awaiting JSON-RPC initialize>

## Compatibility

- Wheel install path changes from `<site-packages>/src/*` to `<site-packages>/cognee_mcp/*`.
  Any downstream that imports `from src.something` is broken today on uvx and
  was always namespace-conflicting (every Python project has a `src/` directory
  somewhere). The rename eliminates the namespace squat.
- The `cognee` deprecation-warning entry-point is preserved (now `cognee_mcp:main`).
- Existing `cognee-mcp` console-script keeps its exact behavior.

## Discovered downstream

Reported by `claude-sota-installed` runtime W316/W317 SOTA-convergence audits:
- Upstream `packages = ["src"]` blocks uvx-stdio MCP wiring per Anthropic's
  Claude Code marketplace pattern (`https://code.claude.com/docs/en/mcp` stdio
  command field).
- NSSM-supervised HTTP transport at `127.0.0.1:8000/mcp` works only because
  NSSM `AppDirectory` injects the build dir into `sys.path`. This is an
  environment-specific workaround, not a portable fix.

## Reversibility

`git revert` the single rename commit. No data-format or wire-protocol changes.
```

## Files diff (for the operator's local apply)

```diff
--- a/cognee-mcp/pyproject.toml
+++ b/cognee-mcp/pyproject.toml
@@
 [tool.hatch.build.targets.wheel]
-packages = ["src"]
+packages = ["cognee_mcp"]
@@
 [project.scripts]
-cognee = "src:main"
-cognee-mcp = "src:main_mcp"
+cognee     = "cognee_mcp:main"
+cognee-mcp = "cognee_mcp:main_mcp"
```

```diff
--- a/cognee-mcp/cognee_mcp/__init__.py  (formerly src/__init__.py)
+++ b/cognee-mcp/cognee_mcp/__init__.py
@@ def _load_server_main():
     try:
         from .server import main as server_main
     except ImportError:
-        from server import main as server_main
+        from cognee_mcp.server import main as server_main
     return server_main
```

Plus the directory rename: `git mv cognee-mcp/src cognee-mcp/cognee_mcp`.

## Operator action checklist

1. `git clone https://github.com/topoteretes/cognee Z:/repos/deps/cognee-pr-fork`
2. `cd Z:/repos/deps/cognee-pr-fork && git checkout -b fix/cognee-mcp-packaging-w317`
3. `git mv cognee-mcp/src cognee-mcp/cognee_mcp`
4. Apply pyproject.toml + __init__.py edits per diff above.
5. `git commit -m "fix(cognee-mcp): rename src/ -> cognee_mcp/ so uvx-stdio installs work"`
6. Push to operator's fork.
7. Open PR against `topoteretes/cognee:main` with the PR title + body above.
8. Link this Stream C verdict file in the PR description.

## References

- Vendor-fork local: `Z:/repos/deps/cognee-mcp-vendor-fork/` (W317-Stream-C; smoke-PASS).
- Companion ship doc: `W317-C-COGNEE-VENDOR-FORK.md`.
- Closes meta-finding W316-A sca-v8 D-EMP empirical_viability HARD GATE candidate row.

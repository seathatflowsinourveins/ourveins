# W316-A SMOKE-PROBE — cognee MCP uvx-stdio Module Path Discovery

**Date**: 2026-05-19
**Stream**: W316-A NSSM-SWITCH
**Scope**: cognee :8000 ONLY (LlamaSwap :8090 + IkLlamaServer :8080 DEFER to W317)
**Pre-state**: NSSM `CogneeMCP` RUNNING, MCP `initialize` handshake returns `serverInfo {"name":"Cognee","version":"1.26.0"}`

## Probe Matrix (7 probes attempted)

| # | Invocation | Result | Root Cause |
|---|---|---|---|
| 1 | `uvx --from cognee==1.1.0 cognee-mcp --help` | **FAIL** | `cognee` PyPI package only ships `cognee-cli.exe` console-script; `cognee-mcp` IS NOT in the `cognee` PyPI package |
| 2 | `uvx --from cognee==1.1.0 -- python -m cognee.api.mcp.server --help` | **FAIL** | `ModuleNotFoundError: No module named 'langfuse'` — cognee imports `langfuse.decorators` at module load (`cognee/modules/observability/get_observe.py:122`) but langfuse is NOT a hard dep in `cognee==1.1.0`'s pyproject |
| 3 | `uvx --from cognee==1.1.0 -- python -m cognee_mcp.server --help` | **FAIL** | `ModuleNotFoundError: No module named 'cognee_mcp'` — the cognee package does not contain a `cognee_mcp` submodule |
| 4 | `uvx --from Z:/repos/deps/cognee/cognee-mcp cognee-mcp --help` (local source) | **FAIL** | `ModuleNotFoundError: No module named 'server'` at `_load_server_main` — `[project.scripts]` entrypoint `cognee-mcp = "src:main_mcp"` triggers `from src import main_mcp` → `__init__.py:15 from .server import main` → fallback `from server import main` (raises `ImportError`) **BROKEN UPSTREAM** |
| 5 | `uvx --from cognee-mcp cognee-mcp --help` (bare PyPI) | **FAIL** | Same `No module named 'server'` — confirmed PyPI tarball ships the same broken package layout |
| 6 | `uvx --from cognee-mcp==0.5.4 cognee-mcp --help` | **FAIL** | Same upstream packaging bug: PyPI publishes source as top-level `src/` package, not `cognee_mcp/` |
| 7 | `uvx --from cognee-mcp==0.5.4 --with langfuse cognee-mcp --help` | **FAIL** | Even with langfuse resolved, `from src import main_mcp` → `from server import main` still triggers `ModuleNotFoundError: No module named 'server'` — langfuse fixed one dep gap, but the **package layout bug remains** |

## Root-Cause: Upstream Packaging Bug

`cognee-mcp` `pyproject.toml @ Z:/repos/deps/cognee/cognee-mcp/pyproject.toml`:
```toml
[tool.hatch.build.targets.wheel]
packages = ["src"]

[project.scripts]
cognee = "src:main"
cognee-mcp = "src:main_mcp"
```

The package is built/published with **literal namespace `src`** (not `cognee_mcp`). The console-script entry-point `cognee-mcp` calls `main_mcp` from `src/__init__.py` which does:
```python
def _load_server_main():
    try:
        from .server import main as server_main       # works only as src.server
    except ImportError:
        from server import main as server_main         # fails — no top-level 'server' module
    return server_main
```

When invoked from the **shim binary** (`cognee-mcp.exe.__main__`), the script's `from src import main_mcp` runs in a context where `src` IS resolvable (it's an installed top-level package), but `from .server` then tries to import `src.server` — which IS in the wheel. The **actual failure** is downstream: `cognee.modules.data.methods` imports trigger heavy cognee init that re-imports the broken `server` module via a different path.

This is **NOT fixable from .mcp.json edit alone**. The fix requires either:
1. **Upstream PR** to rename `packages = ["src"]` → `packages = ["cognee_mcp"]` + rename directory + update `[project.scripts]` to `cognee-mcp = "cognee_mcp:main_mcp"`.
2. **Vendor-fork patch** applied locally with above rename.
3. **Keep NSSM HTTP transport** which works because NSSM invokes `python -u src/server.py` directly with `AppDirectory=Z:/repos/deps/cognee/cognee-mcp` — Python adds the cwd to `sys.path`, so `import src.server` resolves correctly. This is the **incumbent setup** and IS the empirical pattern that succeeds.

## Empirical Smoke-Probe Verdict

**NO viable uvx-stdio invocation discovered for cognee 1.1.0 / cognee-mcp 0.5.4 as of 2026-05-19.**

Raw log: `tmp/W316-cognee-smoke.log` (1145 lines).

This invalidates the **W314-A 20/20 audit assumption** which assumed `uvx --from cognee==1.1.0 cognee-mcp` would work like the basic-memory pattern. The basic-memory analogy fails because basic-memory uses a properly-namespaced `basic_memory` package; cognee-mcp uses an unnamespaced `src/` package that only resolves when invoked from its build directory (NSSM's `AppDirectory=Z:/repos/deps/cognee/cognee-mcp` is the load-bearing config).

## Recommendation Forward

See `W316-A-DECISION-MATRIX.md`. Verdict: **DEFER cognee NSSM→uvx migration; HOLD current NSSM HTTP setup**. The smoke-probe REJECTS the W314-A 20/20 score — empirical evidence overrides theoretical pattern-match score. Operator-AI W317: file upstream PR or vendor-fork to fix `packages = ["src"]` mislayout; re-test once cognee-mcp 0.5.5+ ships with proper namespace.

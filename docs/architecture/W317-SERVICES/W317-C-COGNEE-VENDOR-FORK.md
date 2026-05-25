# W317-C-COGNEE-VENDOR-FORK — `cognee-mcp` packaging fix (vendor-fork local + upstream PR draft)

> Stream C / W317. Closes W316 Stream A NSSM-SWITCH P0a HOLD: upstream `cognee-mcp/pyproject.toml`
> declares `packages = ["src"]` which causes `ModuleNotFoundError: No module named 'server'`
> in any uvx-isolated env. The NSSM service works only because `AppDirectory` puts the
> build cwd on `sys.path`.

## Verdict

**uvx-stdio re-probe: PASS (packaging viability gate)**.

- Vendor-fork path: `Z:/repos/deps/cognee-mcp-vendor-fork/`
- Renamed `src/` → `cognee_mcp/`; rewrote `[tool.hatch.build.targets.wheel] packages` and
  `[project.scripts]` entries to reference the package name (not bare `server` / `src`).
- Smoke command:
  ```
  MSYS_NO_PATHCONV=1 MSYS2_ARG_CONV_EXCL='*' \
    uvx --from Z:/repos/deps/cognee-mcp-vendor-fork cognee-mcp --transport stdio
  ```
- Result: server boots cleanly through cognee 1.1.0 init (log file rotation, auth posture,
  database storage path, `Logging initialized cognee_version=1.1.0`) and then blocks on
  stdin for JSON-RPC framing — i.e. the classic "MCP server ready, awaiting `initialize`"
  state. The upstream `ModuleNotFoundError 'server'` is **gone**.

## Changes vs upstream

Three edits in the vendor-fork (all under `Z:/repos/deps/cognee-mcp-vendor-fork/`):

1. Directory rename: `src/` → `cognee_mcp/` (Python package identifier matches dotted-path).
2. `pyproject.toml` `[tool.hatch.build.targets.wheel] packages = ["cognee_mcp"]` (was `["src"]`).
3. `pyproject.toml` `[project.scripts]` entries reference `cognee_mcp:main` / `cognee_mcp:main_mcp`
   (were `src:main` / `src:main_mcp`).
4. `cognee_mcp/__init__.py` lazy-importer fallback replaced bare `from server import ...` with
   `from cognee_mcp.server import ...` (the original bare-server import worked only because
   NSSM injected the build dir into `sys.path`; removed for portability).

Version string bumped to `0.5.4+vendor.w317` so `pip list` cleanly distinguishes vendor-fork
from upstream `cognee-mcp==0.5.4`.

## W318 NSSM-removal staging (NOT applied this wave)

The vendor-fork unlocks the path documented in W316-A:

1. Update `.mcp.json` `cognee` block from `type: http -> http://127.0.0.1:8000/mcp` to
   `type: stdio` + `command: uvx`, `args: ["--from", "<vendor-fork path or upstream-once-merged>", "cognee-mcp", "--transport", "stdio"]`.
2. Stop + remove the NSSM `CogneeMCP` service.
3. Verify uvx-stdio MCP handshake from a fresh CC session.

**Blocker (operator)**: W298 SEV-1 plaintext `LANGFUSE_SECRET_KEY` in NSSM `AppEnvironmentExtra`
must be migrated to a CR-9-compliant env-file BEFORE the NSSM service is removed (otherwise the
post-remove cognee restart loses Langfuse trace export). See W314-D / W316-A operator-AI carry-forward.

## Sequencing (per W314-D)

W318 NSSM migration order (LlamaSwap-FIRST, cognee-SECOND, IkLlamaServer-THIRD):

1. LlamaSwap → servy or upstream binary (operator decision; lowest blast radius — no
   inter-service deps).
2. cognee-mcp → uvx-stdio via this vendor-fork (after upstream PR ideally; vendor-fork
   acceptable fallback). Requires W298 env-file refactor.
3. IkLlamaServer → servy or NSSM-replacement (depends on cognee LLM endpoint stability).

## Upstream PR draft

See sibling file `W317-C-COGNEE-UPSTREAM-PR-DRAFT.md` for the PR body, branch-creation
runbook, and the operator-action checklist (clone + push fork + open PR).

## References

- W316-A NSSM-SWITCH HOLD verdict + meta-finding sca-v8 D-EMP empirical_viability HARD GATE.
- Upstream packaging bug: `Z:/repos/deps/cognee/cognee-mcp/pyproject.toml:28` (`packages = ["src"]`).
- cognee-mcp upstream repo: `https://github.com/topoteretes/cognee` (cognee-mcp lives inside the
  Apache-2.0 monorepo).
- Cardinal-rule-1: install primitives only from trusted upstream. Vendor-fork is a TIER-2
  vendor adoption (operator-curated; cite-anchored to upstream + bugfix patch documented here).

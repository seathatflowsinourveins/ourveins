# W316-A APPLY LOG — cognee NSSM-SWITCH (Outcome: HOLD-NSSM, NO APPLY)

**Date**: 2026-05-19
**Stream**: W316-A
**Decision**: HOLD-NSSM per `W316-A-DECISION-MATRIX.md` (uvx-stdio empirically non-viable, servy v8.4 LlamaSwap-first sequencing preserved)

## Pre-State Capture (SUCCESS)

```bash
nssm dump CogneeMCP > Z:/claude-sota-installed/tmp/W316-cognee-nssm-pre.txt
```
- File size: 6064 bytes
- Captured: full nssm install/set chain for cognee 1.26.0 NSSM service (RUNNING, LocalSystem, AUTO_START, AppDirectory=Z:/repos/deps/cognee/cognee-mcp, AppParameters=-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration, full AppEnvironmentExtra including W298 plaintext LANGFUSE_SECRET_KEY)
- Rollback ready: `nssm.exe install CogneeMCP <args>` chain can be replayed verbatim

## Pre-Apply Verification (SUCCESS)

```bash
curl -s -X POST http://127.0.0.1:8000/mcp -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{...}}'
# → serverInfo {"name":"Cognee","version":"1.26.0"} HTTP 200 SSE
sc query CogneeMCP | findstr STATE
# → STATE : 4 RUNNING
```

## Smoke-Probe (7 invocations, ALL FAIL — DECISION GATE)

See `W316-A-SMOKE-PROBE.md`. Full log: `tmp/W316-cognee-smoke.log` (44 lines header + 7 probe sections + ~1000 lines of traceback noise).

**Critical**: Upstream `cognee-mcp==0.5.4` `pyproject.toml` packaging bug (`packages = ["src"]` — unnamespaced) breaks ALL uvx isolated-env invocations. NSSM's `AppDirectory + python -u src/server.py` invocation works only because Python adds `cwd` to `sys.path`, which uvx does NOT do.

## Apply Decision: NO APPLY

Per `W316-A-DECISION-MATRIX.md` MCDA:
- uvx-stdio: D-EMP=0 BLOCKER GATE-FAIL (7/7 probes FAIL)
- servy v8.4: scoped for LlamaSwap-first staged-pilot per W314-D — applying cognee-first inverts risk-sequencing
- HOLD-NSSM: D-EMP=5 PASS, weighted score 3.55 (highest among viable options)

## Files NOT Touched This Wave

- `.mcp.json` cognee entry (line 46-49): UNCHANGED (`{"type":"http","url":"http://127.0.0.1:8000/mcp"}`)
- NSSM service `CogneeMCP`: UNCHANGED (RUNNING)
- `.claude/settings.json`: untouched (other-stream territory)
- `CLAUDE.md`, `SKILL.md`: untouched (other-stream territory)
- Any other W316-* directory: untouched (other-stream territory)

## Commands Executed (READ-ONLY + 1 capture)

```bash
# 1. Pre-state capture (only write to tmp/, no service mutation)
nssm dump CogneeMCP > Z:/claude-sota-installed/tmp/W316-cognee-nssm-pre.txt

# 2. Pre-state verification (read-only)
curl -s -X POST http://127.0.0.1:8000/mcp ... initialize handshake
sc query CogneeMCP

# 3. Smoke-probes 1-7 (uvx isolated, no system mutation)
uvx --from cognee==1.1.0 cognee-mcp --help                                          # FAIL
uvx --from cognee==1.1.0 -- python -m cognee.api.mcp.server --help                  # FAIL (langfuse missing)
uvx --from cognee==1.1.0 -- python -m cognee_mcp.server --help                      # FAIL (module not found)
uvx --from Z:/repos/deps/cognee/cognee-mcp cognee-mcp --help                        # FAIL (src layout)
uvx --from cognee-mcp cognee-mcp --help                                             # FAIL (PyPI same bug)
uvx --from cognee-mcp==0.5.4 cognee-mcp --help                                      # FAIL (PyPI pinned same bug)
uvx --from cognee-mcp==0.5.4 --with langfuse cognee-mcp --help                      # FAIL (langfuse fixed but src layout remains)

# 4. Post-verification (read-only — verify HOLD-NSSM didn't accidentally break)
curl -s -X POST http://127.0.0.1:8000/mcp ... initialize  # → still Cognee 1.26.0 HTTP 200
sc query CogneeMCP  # → STATE: 4 RUNNING
```

## Rollback Procedure (UNUSED — kept for reference)

If a future wave erroneously applies uvx migration and breaks cognee:

```powershell
# 1. Stop and remove broken stdio MCP entry
# (edit .mcp.json — restore cognee entry to {"type":"http","url":"http://127.0.0.1:8000/mcp"})

# 2. If NSSM service was removed, replay from dump:
$nssm = "C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe"
# Execute all lines from Z:/claude-sota-installed/tmp/W316-cognee-nssm-pre.txt verbatim
Get-Content Z:/claude-sota-installed/tmp/W316-cognee-nssm-pre.txt | ForEach-Object { Invoke-Expression $_ }

# 3. Start the restored service
& $nssm start CogneeMCP

# 4. Verify
curl -s -X POST http://127.0.0.1:8000/mcp -H "Content-Type: application/json" -H "Accept: application/json, text/event-stream" -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"rollback","version":"1.0"}}}'
# Expect: serverInfo Cognee 1.26.0
```

## Post-Apply Verification (SUCCESS — no-op confirms preservation)

```bash
# (Identical to pre-state since no apply executed)
curl -s -X POST http://127.0.0.1:8000/mcp ... initialize
# → serverInfo Cognee 1.26.0 HTTP 200 ✓
sc query CogneeMCP | findstr STATE
# → STATE: 4 RUNNING ✓
```

cognee :8000 MCP healthy, no degradation.

## Cardinal-Rule Compliance Statement

- **R1** trusted-source: nssm.exe winget-installed (NSSM.NSSM); uvx via official PyPI; no self-invented binaries.
- **R2** hooks: zero settings.json hooks touched this wave.
- **R3** subagents: Stream A of 1-message dispatch; no nested team.
- **R4** project behavior: docs in `docs/architecture/W316-NSSM-SWITCH/`; CLAUDE.md not edited (other-stream).
- **R5** safety: pre-state captured before any decision; **NO destructive operation executed**; cognee preserved.

`self_invented_count: 0` invariant preserved.

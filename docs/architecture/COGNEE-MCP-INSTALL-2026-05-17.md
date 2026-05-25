# cognee-mcp HTTP server bring-up — 2026-05-17

Implements W259-v8 `cognee_w259v8` plan documented in `Z:\claude-sota-installed\.mcp.json` `_comments.cognee_w259v8` block. Brings up the cold-tier GraphRAG MCP server on `http://127.0.0.1:8000/mcp` (Streamable HTTP) and supervises it via NSSM. The `.mcp.json` `cognee` entry is no longer inert.

## (a) Versions installed

| Package | Version | Source |
|---|---|---|
| `cognee` (core library) | `1.1.0` | PyPI (`pip install cognee`) — install duration 19s |
| `cognee-mcp` (MCP server, sibling-package in monorepo) | `0.5.4` | editable install from `Z:\repos\deps\cognee\cognee-mcp` |
| `mistralai` (downgrade — see Deviations) | `1.12.4` | PyPI (pinned `<2`) |

Cognee internal db path: `Z:\venvs\claude\Lib\site-packages\cognee\.cognee_system\databases` (Kuzu embedded backend, default — zero-ops per plan §3).

## (b) Start command + env

Foreground equivalent:

```
cd Z:\repos\deps\cognee\cognee-mcp
set OPENAI_API_KEY=local
set OPENAI_BASE_URL=http://127.0.0.1:8080/v1
set LLM_MODEL=qwen36
Z:\venvs\claude\Scripts\python.exe -u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration
```

`--no-migration` skips Alembic on each restart (DB already migrated on first run; idempotent re-runs are slow and noisy). LLM provider is the local 35B at `http://127.0.0.1:8080/v1` (OpenAI-compat), same pattern as Hindsight.

## (c) NSSM service config (`CogneeMCP`)

| Parameter | Value |
|---|---|
| `Application` | `Z:\venvs\claude\Scripts\python.exe` |
| `AppParameters` | `-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration` |
| `AppDirectory` | `Z:\repos\deps\cognee\cognee-mcp` |
| `AppEnvironmentExtra` | `OPENAI_API_KEY=local` · `OPENAI_BASE_URL=http://127.0.0.1:8080/v1` · `LLM_MODEL=qwen36` · `PYTHONUNBUFFERED=1` · `PYTHONIOENCODING=utf-8` |
| `Start` | `SERVICE_AUTO_START` |
| `AppStdout` | `Z:\claude-hub\logs\cognee-mcp-stdout.log` |
| `AppStderr` | `Z:\claude-hub\logs\cognee-mcp-stderr.log` |
| `AppExit Default` | `Restart` (auto-recover on crash) |
| `AppRestartDelay` | `5000` ms |
| `AppStopMethod{Console,Window,Threads}` | `5000` ms each (graceful shutdown ladder) |

Registry root: `HKLM:\SYSTEM\CurrentControlSet\Services\CogneeMCP`. `ImagePath` = NSSM at `C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe` (matches `IkLlamaServer` pattern).

## (d) Verification

```
sc query CogneeMCP            -> STATE = 4  RUNNING (ACCEPTS_SHUTDOWN)
netstat -ano | grep :8000     -> 127.0.0.1:8000  LISTENING  PID 85944
curl POST /mcp                -> HTTP/1.1 200 OK  server: uvicorn
                                  content-type: text/event-stream
                                  mcp-session-id: 67e5db73864148bb87e7f7ecb1c4ad17
                                  -> initialize result: serverInfo.name=Cognee, version=1.26.0
                                     capabilities: prompts/resources/tools (listChanged=false)
```

Sibling services confirmed untouched (still LISTENING after install): 35B `:8080` · embedder `:8082` · Hindsight `:9077` · pg0 `:5432` · Phoenix `:16006` · Ollama `:16700` · FalkorDB `:16379`.

## (e) Deviations from W259-v8 plan

1. **The `cognee` pip package does NOT ship the MCP server.** Plan step (1) `pip install cognee` is necessary but insufficient — it installs only `cognee-cli`, not `cognee-mcp`. The MCP server is a sibling-package living inside the topoteretes/cognee monorepo at `cognee-mcp/`. Resolved by installing it editable from the existing clone: `pip install -e Z:/repos/deps/cognee/cognee-mcp`. After install both `cognee-mcp.exe` and `cognee.exe` console scripts are available in `Z:\venvs\claude\Scripts\` per `src:main_mcp` / `src:main` entry points.
2. **`mistralai` downgrade to `<2`.** The venv had `mistralai 2.4.5` (latest) but the 2.x wheel has no top-level `__init__.py` exporting `Mistral`. `instructor 1.15.1` (transitive dep of cognee, via litellm/instructor structured-output framework) hard-imports `from mistralai import Mistral`, which fails on 2.x. Pinned to `mistralai 1.12.4` (last 1.x release with the legacy top-level export). Server now imports cleanly.
3. **`--no-migration` flag added to service args.** Alembic migrations ran successfully on first foreground startup (one-time); skipping on every service start avoids 25s+ migration loop on each restart and avoids re-running them under SYSTEM account where they don't need to re-run. Migrations can be re-run manually by removing the flag and restarting once.
4. **Plan note: graph backend = Kuzu (embedded default).** Confirmed — no FalkorDB/Neo4j env vars set, cognee defaults to Kuzu, DB path is `Z:\venvs\claude\Lib\site-packages\cognee\.cognee_system\databases\` (note: in-venv path; not ideal for state-outside-repo but matches cognee's default). Optional future move via `COGNEE_HOME` env var if needed.
5. **LLM provider env vars per plan §4.** Plan said "set `LLM_API_KEY` (or point cognee at a local LLM provider)". Used the OpenAI-compat convention (`OPENAI_API_KEY=local`, `OPENAI_BASE_URL=http://127.0.0.1:8080/v1`, `LLM_MODEL=qwen36`) — same pattern as Hindsight and as graphiti's Ollama wiring. LiteLLM (cognee's structured-output layer) routes via these standard vars.

## Reversibility

| Step | Command |
|---|---|
| Stop + remove service | `sc stop CogneeMCP && nssm remove CogneeMCP confirm` |
| Uninstall cognee-mcp | `Z:/venvs/claude/Scripts/pip.exe uninstall -y cognee-mcp` |
| Uninstall cognee core | `Z:/venvs/claude/Scripts/pip.exe uninstall -y cognee` |
| Restore mistralai latest | `Z:/venvs/claude/Scripts/pip.exe install -U mistralai` (only if you confirm no other dep needs `Mistral` from top-level — `instructor` will break) |
| Revert `.mcp.json` entry | Delete the `cognee` mcpServers entry (still inert anyway when service stopped) |

Total time-to-revert: ~30s (service stop/remove dominates).

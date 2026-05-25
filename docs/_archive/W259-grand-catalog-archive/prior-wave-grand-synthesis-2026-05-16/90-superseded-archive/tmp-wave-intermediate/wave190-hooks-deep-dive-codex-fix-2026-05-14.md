# Wave 190 Codex `exec` Windows `os error 5` Deep Dive

Date: 2026-05-14
Host context: Windows PowerShell, repo `Z:\claude-sota-installed`, Codex CLI `codex-cli 0.130.0`.

`codex exec` is not blocked by CLI availability; `codex --version` exits 0.
The failure is local Windows access control on the configured `CODEX_HOME`:

`CODEX_HOME=Z:/claude-sota-installed-state/.codex`

That directory exists, but it is not writable by this process. Codex startup needs
to create helper files under `CODEX_HOME\tmp\arg0\codex-arg0*` and initialize
SQLite state under `CODEX_HOME`. Both fail with `Access is denied` / read-only DB.

[VERIFIED] The in-process app-server client does not create a Windows named pipe
or socket for its in-process transport. Upstream source says the in-process path
uses typed channels:

- `Z:\repos\deps\codex\codex-rs\app-server-client\README.md:27-38`
- `Z:\repos\deps\codex\codex-rs\app-server-client\src\lib.rs:464-478`
- `Z:\repos\deps\codex\codex-rs\app-server\src\in_process.rs:334-364`

[VERIFIED] The startup filesystem path observed and confirmed in source is:

`<CODEX_HOME>\tmp\arg0\codex-arg0*`

Source:

- `Z:\repos\deps\codex\codex-rs\arg0\src\lib.rs:300-319` creates
  `codex_home\tmp\arg0`, then a temp dir with prefix `codex-arg0`.
- `Z:\repos\deps\codex\codex-rs\app-server-client\src\lib.rs:325-327` passes
  `Arg0DispatchPaths` into app-server startup.
- `Z:\repos\deps\codex\codex-rs\exec\src\lib.rs:653-658` wraps startup errors
  as `failed to initialize in-process app-server client: {err}`.

Observed warning path examples:

`Z:\claude-sota-installed-state\.codex\tmp\arg0\codex-arg0N9iXe9`

[VERIFIED] `Z:\claude-sota-installed-state\.codex` exists.

[VERIFIED] ACL includes explicit Deny ACEs for the current user SID:

`Deny DeleteSubdirectoriesAndFiles, Write, Delete, ReadPermissions, Synchronize`

[VERIFIED] write probes failed:

```text
WRITE_FAIL Z:\claude-sota-installed-state\.codex :: UnauthorizedAccessException :: Access ... is denied.
WRITE_FAIL Z:\claude-sota-installed-state\.codex\tmp :: UnauthorizedAccessException :: Access ... is denied.
WRITE_FAIL Z:\claude-sota-installed-state\.codex\tmp\arg0 :: UnauthorizedAccessException :: Access ... is denied.
```

All probes used prompt:

`Return exactly: CODEX_PROBE_OK`

Command:

```powershell
codex exec --model gpt-5.5 --color never "Return exactly: CODEX_PROBE_OK"
```

Exit code: `1`

stderr:

```text
WARNING: failed to clean up stale arg0 temp dirs: Access is denied. (os error 5)
WARNING: proceeding, even though we could not update PATH: Access is denied. (os error 5) at path "Z:\\claude-sota-installed-state\\.codex\\tmp\\arg0\\codex-arg0N9iXe9"
failed to initialize state runtime: failed to initialize state runtime at Z:\claude-sota-installed-state\.codex: error returned from database: (code: 8) attempt to write a readonly database
Error: Access is denied. (os error 5)
```

Command:

```powershell
codex exec --no-project-doc --model gpt-5.5 --color never "Return exactly: CODEX_PROBE_OK"
```

Exit code: `1`

stderr:

```text
WARNING: failed to clean up stale arg0 temp dirs: Access is denied. (os error 5)
WARNING: proceeding, even though we could not update PATH: Access is denied. (os error 5) at path "Z:\\claude-sota-installed-state\\.codex\\tmp\\arg0\\codex-arg0NOrgc2"
failed to initialize state runtime: failed to initialize state runtime at Z:\claude-sota-installed-state\.codex: error returned from database: (code: 8) attempt to write a readonly database
Error: Access is denied. (os error 5)
```

Command:

```powershell
Push-Location Z:\tmp
codex exec --skip-git-repo-check --model gpt-5.5 --color never "Return exactly: CODEX_PROBE_OK"
Pop-Location
```

Exit code: `1`

stderr:

```text
WARNING: failed to clean up stale arg0 temp dirs: Access is denied. (os error 5)
WARNING: proceeding, even though we could not update PATH: Access is denied. (os error 5) at path "Z:\\claude-sota-installed-state\\.codex\\tmp\\arg0\\codex-arg0NN6Ax6"
failed to initialize state runtime: failed to initialize state runtime at Z:\claude-sota-installed-state\.codex: error returned from database: (code: 8) attempt to write a readonly database
Error: Access is denied. (os error 5)
```

Command:

```powershell
codex exec --model gpt-5.5 --color never --config 'model="gpt-5.5"' "Return exactly: CODEX_PROBE_OK"
```

Exit code: `1`

stderr:

```text
WARNING: failed to clean up stale arg0 temp dirs: Access is denied. (os error 5)
WARNING: proceeding, even though we could not update PATH: Access is denied. (os error 5) at path "Z:\\claude-sota-installed-state\\.codex\\tmp\\arg0\\codex-arg0xw70b5"
failed to initialize state runtime: failed to initialize state runtime at Z:\claude-sota-installed-state\.codex: error returned from database: (code: 8) attempt to write a readonly database
Error: Access is denied. (os error 5)
```

[VERIFIED] A writable repo-local `CODEX_HOME` plus non-websocket local eee proxy
provider produces real GPT-5.5 output.

Command:

```powershell
$env:CODEX_HOME = "Z:\claude-sota-installed\tmp\codex-home-wave190e"
codex exec --ignore-user-config --skip-git-repo-check `
  --config 'model_provider="eee-proxy"' `
  --config 'model_providers.eee-proxy.name="EEE Proxy"' `
  --config 'model_providers.eee-proxy.base_url="http://127.0.0.1:18317/backend-api/codex"' `
  --config 'model_providers.eee-proxy.env_key="EEE_PROXY_KEY_CODEX_BRIDGE"' `
  --config 'model_providers.eee-proxy.wire_api="responses"' `
  --config 'model_providers.eee-proxy.supports_websockets=false' `
  --model gpt-5.5 --color never `
  "Return exactly: CODEX_PROBE_OK"
```

Exit code: `0`

stdout:

```text
CODEX_PROBE_OK
```

stderr excerpt:

```text
OpenAI Codex v0.130.0
workdir: Z:\tmp
model: gpt-5.5
provider: eee-proxy
session id: 019e24fe-01a7-7960-8cde-8fed7fa47c59
codex
CODEX_PROBE_OK
tokens used
1,749
```

[VERIFIED] A writable `CODEX_HOME` with default OpenAI provider gets past local
state/app-server initialization, but direct `wss://api.openai.com/v1/responses`
fails in this Windows session because Codex cannot open the current-user native
root CA store:

```text
failed to open current user certificate store ... Access is denied. (os error 5)
```

Using the local HTTP eee proxy and `supports_websockets=false` avoids that
separate certificate-store failure.

## Root Cause

`CODEX_HOME` has explicit Deny permissions for the current user/process. The
first broken path is `CODEX_HOME\tmp\arg0\codex-arg0*`; app-server initialization
also needs a writable SQLite state DB under `CODEX_HOME`. Changing cwd,
`--no-project-doc`, or simple `--config model=...` does not bypass this because
Codex initializes those local runtime paths before model dispatch.

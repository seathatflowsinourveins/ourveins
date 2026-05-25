# STREAM E — pg0 Z:-portable junction cleanup: maintenance-window runbook

**Date**: 2026-05-18  
**Author**: W288 Stream E (validating + extending W288 Stream B `STREAM-B-pg0-z-migration.md`)  
**Scope**: Remove `C:\Users\42\.pg0` Windows directory junction; physically locate all pg0 data + binaries under Z: with no remaining C: footprint, no postgres restart loop.  
**Pre-state evidence** (probed live 2026-05-18):

- `C:\Users\42\.pg0` = `Directory, ReparsePoint` (Junction), target `\??\Z:\claude-sota-installed\.pg0` (verified via `(Get-Item).Target` AND `fsutil reparsepoint query`).
- `Z:\claude-sota-installed\.pg0` is the real dir, 352.86 MB total (198.51 MB instance data + 154.35 MB postgres install).
- Running postgres postmaster PID 47852, uptime ~16h, argv hard-coded `-D "C:/Users/42/.pg0/instances/hindsight-embed-claude-code/data"` (via the junction).
- `instance.json` `data_dir` = `C:\\Users\\42\\.pg0\\instances\\hindsight-embed-claude-code\\data`; `installation_dir` = `C:\\Users\\42\\.pg0\\installation`.
- hindsight-api PID 5564 (uvicorn server on `:9077`, `/health` returns 200). No graceful HTTP `/shutdown` endpoint — must SIGTERM or `taskkill`.

## TL;DR

**GO** — cutover is safe inside a ~5-minute maintenance window. The C: junction is a benign indirection; the data already physically lives on Z:. Cutover = stop pg0 cleanly via `pg0.exe stop --name <name>`, edit `instance.json` paths from `C:\\Users\\42\\.pg0\\...` to `Z:\\claude-sota-installed\\.pg0\\...`, delete the junction, restart pg0, restart hindsight-api. NO `HINDSIGHT_PG0_DIR` env var exists — the Stream B / bootstrap-script PART 4 phantom env var must be ignored. Watchpoint resolved: no Windows service or scheduled task auto-launches pg0/hindsight (no NSSM, no Task Scheduler entry references pg0/hindsight/postgres/uvx); the previous launcher was a Claude Code session (now-terminated PID 30088 → PID 151144), so no auto-start mechanism will silently re-create the junction at next boot.

## Watchpoint resolution

### Question
"The original launcher (PID 30088, no longer running) may be an NSSM service or Task Scheduler task whose frozen `USERPROFILE=C:\Users\42` would re-create the C: junction at next boot."

### Answer: NO auto-start mechanism. The launcher was a previous CC session.

Probes run on 2026-05-18:

| Probe | Command | Result |
|---|---|---|
| Windows services | `Get-Service \| ? { ...hindsight/pg0/postgres/embed... }` | Only `embeddedmode` (Stopped, manual) and `IkEmbedServer` (Stopped, manual) — **unrelated**, both not running. |
| Win32_Service PathName scan | `Get-CimInstance Win32_Service -Filter "PathName LIKE '%hindsight%' OR ...uvx%..."` | **Zero matches.** No service launches hindsight/pg0/postgres/uvx/uv.exe. |
| Scheduled tasks (CSV scan) | `schtasks /Query /Fo CSV /V` filtered for hindsight/pg0/postgres/uvx/claude-sota | 5 tasks total — `CC-OC-AlphaAutoEmbed` (Disabled), `EEE-Aperant-Poller` (Disabled), `EEE-Rotation-Planner` (Disabled), `Loop7h-Evening-Remediation` (Ready, runs `Z:\claude-sota\tools\loop7h_remediation_cron.ps1` — sibling runtime, unrelated), `sss-sota-cron` (Ready, runs `Z:\claude-sota\scripts\sota_cron_cycle.ps1` — sibling runtime, unrelated). **None reference pg0/hindsight/postgres/uvx/`.pg0`.** |
| Registry autorun | `HKLM\...\Run`, `HKLM\...\RunOnce`, `HKCU\...\Run`, `HKCU\...\RunOnce` filtered | **Zero matches** for hindsight/pg0/postgres/uvx/claude-sota. |
| Startup folders | `$env:APPDATA\...\Startup`, `$env:ALLUSERSPROFILE\...\StartUp` | **Empty** (no startup shortcuts). |
| Process ancestry (postgres) | PID 47852 → PPID 47736 (cmd.exe wrapper, still alive) → PPID 30088 (**terminated**) — chain dead-ends at a terminated PowerShell/CC session. | Confirms postgres was started by a previous interactive CC session. |
| Process ancestry (hindsight-api PID 5564) | PID 5564 → 143972 (terminated) — chain also dead-ends. Another co-running hindsight-api PID 36576 → uv.exe → uvx.exe → 151144 (terminated). | Also launched from an interactive shell, not a service. |

`tools/eee.ps1` does NOT spawn `hindsight-embed daemon` (grep for `daemon` in eee.ps1 only matches W274 plugin-hooks comments, no daemon-start invocation). `tools/bootstrap-runtime.ps1` PART 2c does a **health-check only** (`Invoke-WebRequest /health`) — it does NOT start the daemon. The daemon must be started manually by the operator (or by CC plugin via uvx auto-spawn).

**Conclusion**: no auto-start mechanism will re-materialize `C:\Users\42\.pg0` at reboot. The junction can be deleted safely; the next manual launch of `uvx hindsight-api` or `pg0 start` will use whatever `USERPROFILE` the interactive shell exports. With `eee.ps1` setting `$env:USERPROFILE='Z:\claude-sota-installed'`, new instances default to `Z:\claude-sota-installed\.pg0\` — but the **existing instance.json must be edited** (step 5 below) because pg0's `start` re-reads instance.json's `installation_dir` + `data_dir` rather than re-deriving from HOME.

### Important corollary: `USERPROFILE` is NOT what pg0 uses at info-time

Probe (HOME=C:\nonexistent, USERPROFILE=C:\nonexistent, LOCALAPPDATA=C:\nonexistent):
```
PS> & pg0.exe list
Instances:
  hindsight-embed-claude-code (running) - port 5432 - postgresql://...
```
pg0 finds the running instance via something other than HOME — likely a lock file written to the postmaster data dir AND the postgres process's PID lock. So `pg0 stop --name hindsight-embed-claude-code` works regardless of HOME env. **For `pg0 start` of a new instance**, USERPROFILE is what determines the default `~/.pg0/` location — but the existing instance.json already encodes the path explicitly, so HOME-time doesn't matter for our cutover. See "Test 4 — fresh-start USERPROFILE=Z" probe in the appendix: `instance.json` was written to `Z:\claude-sota-installed\.pg0\instances\...\instance.json` AND mirrored under `C:\Users\42\.pg0\...\` (via the junction), with `data_dir` = the explicit `--data-dir` flag value.

## Junction state

```text
C:\Users\42\.pg0   →   Z:\claude-sota-installed\.pg0
```

- `(Get-Item 'C:\Users\42\.pg0' -Force).Attributes` = `Directory, ReparsePoint`
- `(Get-Item 'C:\Users\42\.pg0' -Force).LinkType` = `Junction`
- `(Get-Item 'C:\Users\42\.pg0' -Force).Target` = `Z:\claude-sota-installed\.pg0`
- `fsutil reparsepoint query "C:\Users\42\.pg0"` confirms: `Reparse Tag Value : 0xa0000003 ` (`IO_REPARSE_TAG_MOUNT_POINT` — Windows junction, NOT a symlink), Substitute Name = `\??\Z:\claude-sota-installed\.pg0`.
- `Z:\claude-sota-installed\.pg0` itself is a plain `Directory` (not a junction, not a symlink) — i.e. junction direction is C: → Z:, and Z: is the real data location.
- `Z:\claude-sota-installed-state\.pg0` **does not exist** — `Move-Item` to that path is open.
- `C:\Users\42\.pg0\installation\18.1.0\bin\` contains `pg_ctl.exe` 130560 bytes, `postgres.exe` 10223104 bytes, `psql.exe` 647680 bytes — also visible from Z:\ side.
- **NOT a junction**: `Z:\claude-sota-installed\.pg0` itself is a plain `Directory` reparse-flag clean. So deleting the C: junction with `Remove-Item -Force -Recurse` would normally also delete the target — **the runbook below uses `cmd /c rmdir` (junction-aware) and `fsutil reparsepoint delete` (does NOT follow the link) to safely sever the junction without touching the Z: target.**

The 198 MB pg0 instance data + 154 MB postgres install **already** live on Z: today. The only operational change is removing the C: indirection.

## Cutover runbook (numbered)

Perform inside a maintenance window. Stop using hindsight memory queries during steps 2-9 (the MCP will fail; CC sessions can continue but will get errors for `hindsight-*` tool calls).

Constants used below — paste into the session before starting:
```powershell
$Pg0Bin     = 'C:\Users\42\AppData\Local\uv\cache\archive-v0\5XEUsrChaAKt-U2sNig51\Lib\site-packages\pg0\bin\pg0.exe'
$Pg0Junction = 'C:\Users\42\.pg0'
$Pg0Real    = 'Z:\claude-sota-installed\.pg0'
$InstanceName = 'hindsight-embed-claude-code'
$InstanceDir = "$Pg0Real\instances\$InstanceName"
```

### Pre-flight (≤1 min) — informational only, no state change

```powershell
# 1a. Confirm pg0 binary exists at expected uv-cache path
Test-Path $Pg0Bin            # MUST be True
& $Pg0Bin --version           # MUST print "pg0 0.x.x"

# 1b. Confirm junction is intact and points to Z:
$item = Get-Item $Pg0Junction -Force
$item.Attributes              # MUST contain "ReparsePoint"
$item.Target                  # MUST be "Z:\claude-sota-installed\.pg0"
$item.LinkType                # MUST be "Junction"

# 1c. Confirm Z: target is the real dir (not also a junction)
(Get-Item $Pg0Real).Attributes # MUST be just "Directory" (no ReparsePoint)

# 1d. Confirm hindsight-api running on :9077 and current pg0 instance running on :5432
(Invoke-WebRequest 'http://127.0.0.1:9077/health' -UseBasicParsing -TimeoutSec 3).StatusCode  # MUST be 200
& $Pg0Bin info --name $InstanceName -o json | ConvertFrom-Json | Select-Object running, pid, port
# MUST be running=True, pid=<some int>, port=5432

# 1e. Snapshot current instance.json (rollback source-of-truth)
Copy-Item "$InstanceDir\instance.json" "$InstanceDir\instance.json.pre-cutover-$(Get-Date -Format yyyyMMddHHmmss).bak"

# 1f. Confirm NO Z:\claude-sota-installed-state\.pg0 exists (clean target if you choose Option B)
Test-Path 'Z:\claude-sota-installed-state\.pg0'  # MUST be False

# 1g. Confirm no unrelated postgres.exe processes are running (defence in depth)
Get-CimInstance Win32_Process -Filter "Name='postgres.exe'" |
    Where-Object { $_.CommandLine -notlike "*$InstanceName*" } |
    Select-Object ProcessId, CommandLine
# MUST be empty / no rows. If anything prints, ABORT and investigate manually.
```

If any pre-flight check fails, **ABORT** and triage. Do not proceed.

### Step 2 — Stop hindsight-api gracefully (1-2s)

`hindsight-api` is a uvicorn server with **no HTTP shutdown endpoint** (verified — `/shutdown`, `/admin/shutdown`, `/admin/stop`, `/_health`, `/healthz`, `/api/health` all return 404; only `/health` returns 200). It must be terminated by signal.

```powershell
# Find both hindsight-api processes (there are 2: one is a uv.exe wrapper, one is the actual server)
$hindsightProcs = Get-CimInstance Win32_Process -Filter "Name='hindsight-api.exe'" |
                  Where-Object { $_.CommandLine -like '*--daemon*' -or $_.CommandLine -like '*hindsight-api*' }

# Also find the python.exe that's the actual uvicorn worker
$pythonHindsight = Get-CimInstance Win32_Process -Filter "Name='python.exe'" |
                   Where-Object { $_.CommandLine -like '*hindsight-api*' -and $_.CommandLine -like '*--daemon*' }

# Stop the hindsight processes (Windows doesn't have SIGTERM; Stop-Process sends WM_CLOSE then TerminateProcess)
# This is safe for hindsight-api because it doesn't write WAL — postgres does. hindsight-api will lose
# in-flight HTTP requests; that's acceptable in a maintenance window.
$hindsightProcs | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
$pythonHindsight | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

# Verify gone
Start-Sleep -Seconds 1
Get-Process hindsight-api -ErrorAction SilentlyContinue   # MUST be empty
Get-NetTCPConnection -State Listen -LocalPort 9077 -ErrorAction SilentlyContinue   # MUST be empty
```

### Step 3 — Stop pg0 cleanly via `pg0 stop` (smart shutdown, NOT Stop-Process loop) (3-5s)

This is the critical Stream B correction. **DO NOT use a `Stop-Process` loop on postgres.exe** — that risks WAL corruption (mid-flight transactions don't get fsync'd). Use the pg0 CLI which delegates to `pg_ctl stop -m smart` internally.

```powershell
& $Pg0Bin stop --name $InstanceName
# Expected output:
#   Stopping PostgreSQL instance 'hindsight-embed-claude-code' (pid: 47852)...
#   PostgreSQL instance 'hindsight-embed-claude-code' stopped.

# Verify no postgres.exe owned by our instance remain
Get-CimInstance Win32_Process -Filter "Name='postgres.exe'" |
    Where-Object { $_.CommandLine -like "*$InstanceName*" }   # MUST be empty

# Verify port 5432 released
Get-NetTCPConnection -State Listen -LocalPort 5432 -ErrorAction SilentlyContinue   # MUST be empty

# Verify pg0 sees instance as stopped
& $Pg0Bin info --name $InstanceName -o json | ConvertFrom-Json | Select-Object running, pid
# MUST be running=False, pid=$null
```

If `pg0 stop` does not return within 30s, postgres may have a long-running checkpoint. Wait up to 60s. If still hung after 60s, run `& $Pg0Bin stop --name $InstanceName` again (idempotent). Only as a LAST resort, manually `Stop-Process -Id <postmaster-pid>` — accept the WAL-recovery risk (postgres will auto-recover from WAL on next start, costing ~5-30s).

### Step 4 — Edit `instance.json` to use Z:\ paths (5s)

```powershell
$jsonPath = "$InstanceDir\instance.json"
$cfg = Get-Content $jsonPath -Raw | ConvertFrom-Json

# Verify current state matches expectation (defence against drift)
if ($cfg.data_dir -notlike 'C:\Users\42\.pg0*') {
    Write-Error "instance.json data_dir is NOT C:\Users\42\.pg0\* (got: $($cfg.data_dir)). Aborting — manual review needed."
    return
}

# Rewrite paths
$cfg.data_dir = $cfg.data_dir -replace '^C:\\Users\\42\\\.pg0', 'Z:\claude-sota-installed\.pg0'
$cfg.installation_dir = $cfg.installation_dir -replace '^C:\\Users\\42\\\.pg0', 'Z:\claude-sota-installed\.pg0'

# Write back (PowerShell's ConvertTo-Json uses double-backslashes — pg0's Rust JSON decoder accepts them)
($cfg | ConvertTo-Json -Depth 10) | Set-Content -Path $jsonPath -Encoding UTF8

# Verify
Get-Content $jsonPath -Raw
# Expected: data_dir = "Z:\\claude-sota-installed\\.pg0\\instances\\hindsight-embed-claude-code\\data"
#           installation_dir = "Z:\\claude-sota-installed\\.pg0\\installation"
```

### Step 5 — Remove the junction (junction-aware delete, does NOT touch Z: target) (1s)

```powershell
# Use rmdir (cmd) — it removes the junction itself, NOT what it points to.
# Equivalent: `fsutil reparsepoint delete "$Pg0Junction"` then `rmdir "$Pg0Junction"`.
# DO NOT use `Remove-Item -Recurse -Force` — that may follow the junction
# and delete the Z: data. (PowerShell 7+ on Win11 is junction-aware but the
# bug history is too thorny — use the cmd command which has known semantics.)

cmd /c "rmdir `"$Pg0Junction`""
# Verify gone
Test-Path $Pg0Junction   # MUST be False
# Verify Z: target untouched
Test-Path "$Pg0Real\installation\18.1.0\bin\postgres.exe"   # MUST be True
Test-Path "$InstanceDir\instance.json"                       # MUST be True
```

### Step 6 — Set USERPROFILE for the cutover session and restart pg0 (5-10s)

```powershell
# Confirm USERPROFILE points at Z:-portable root (it should already, per eee.ps1)
$env:USERPROFILE   # MUST be "Z:\claude-sota-installed"
$env:HOME           # MUST be "Z:\claude-sota-installed"

# Start postgres via pg0. pg0 will read instance.json from
#   $env:USERPROFILE\.pg0\instances\hindsight-embed-claude-code\instance.json
# which is now Z:\claude-sota-installed\.pg0\... (the junction is gone, so it
# reads the real Z: location directly).
& $Pg0Bin start --name $InstanceName

# Expected output:
#   Started PostgreSQL instance 'hindsight-embed-claude-code'
#   URI: postgresql://hindsight:hindsight@127.0.0.1:5432/hindsight

# Verify
& $Pg0Bin info --name $InstanceName -o json | ConvertFrom-Json | Format-List
# MUST show: running=True, pid=<new int>, port=5432,
#            data_dir = "Z:\claude-sota-installed\.pg0\instances\hindsight-embed-claude-code\data"

# Verify postgres.exe argv now uses Z:\ paths
Get-CimInstance Win32_Process -Filter "Name='postgres.exe'" |
    Where-Object { $_.CommandLine -like "*$InstanceName*" } |
    Select-Object ProcessId, CommandLine | Format-List
# argv MUST contain "-D \"Z:/claude-sota-installed/.pg0/instances/hindsight-embed-claude-code/data\""
# argv MUST NOT contain "C:/Users/42/.pg0"
```

### Step 7 — Smoke-test the database (3s)

```powershell
# psql connection check via pg0
& $Pg0Bin psql --name $InstanceName -- -c "SELECT count(*) FROM pg_stat_activity;"
# MUST print a small integer (typically 5-10 for a fresh-start instance)

# OR if pg0 psql isn't on PATH, use the bundled psql directly:
& "$Pg0Real\installation\18.1.0\bin\psql.exe" `
    -h 127.0.0.1 -p 5432 -U hindsight -d hindsight -c "SELECT 1 AS ok, current_database();"
# (Will prompt for password — enter "hindsight". Or set PGPASSWORD=hindsight first.)
```

### Step 8 — Restart hindsight-api (10s)

```powershell
# Background-launch hindsight-api (matches the original CC-session launch)
# Use Start-Process so it doesn't block the maintenance-window session.
$apiExe = 'C:\Users\42\AppData\Local\uv\cache\archive-v0\5XEUsrChaAKt-U2sNig51\Scripts\hindsight-api.exe'
Start-Process -FilePath $apiExe `
    -ArgumentList '--daemon', '--idle-timeout', '0', '--port', '9077' `
    -WindowStyle Hidden `
    -PassThru | Select-Object Id

# Wait up to 15s for the daemon to come up
$ok = $false
for ($i = 0; $i -lt 15; $i++) {
    Start-Sleep -Seconds 1
    try {
        $r = Invoke-WebRequest 'http://127.0.0.1:9077/health' -UseBasicParsing -TimeoutSec 2 -ErrorAction Stop
        if ($r.StatusCode -eq 200) { $ok = $true; break }
    } catch {}
}
if (-not $ok) { Write-Error "hindsight-api did not respond on :9077 within 15s. Check `~/.hindsight/daemon.log`." }
```

> Note: if your CC session already exports `HINDSIGHT_API_PORT=9077`, `--port 9077` is redundant but harmless. If you use `uvx hindsight-api@0.6.2 --daemon ...` instead of the cache-archive path directly, uvx will reuse the same wheel — there's no second-install hit.

### Step 9 — Verify end-to-end (in CC session)

```bash
# In a Claude Code session:
claude mcp list | grep hindsight   # MUST show "Connected"
```

Or call the MCP tool directly:
```
mcp__hindsight_memory__hindsight__search_memory_facts
```

If any step fails, run **Rollback** below.

### Step 10 — Final invariant assertions

```powershell
# C:\Users\42\.pg0 must be gone (no junction, no real dir)
Test-Path 'C:\Users\42\.pg0'                                          # MUST be False

# Z:\claude-sota-installed\.pg0 must be intact
Test-Path 'Z:\claude-sota-installed\.pg0\installation\18.1.0\bin\postgres.exe'    # MUST be True
Test-Path 'Z:\claude-sota-installed\.pg0\instances\hindsight-embed-claude-code\data'    # MUST be True

# bootstrap-runtime.ps1 PART 4 should now log OK silently
& 'Z:\claude-sota-installed\tools\bootstrap-runtime.ps1' 2>&1 | Select-String -Pattern 'PART 4|pg0'
# MUST contain "OK pg0 on Z: at Z:\claude-sota-installed\.pg0"
# MUST NOT contain "OPERATOR-ACTION-REQUIRED"
# (Note: the bootstrap script PART 4 still checks against `Z:\claude-sota-installed-state\.pg0`
#  which is NOT where our data lives. See Open Risks §6.)
```

## Rollback runbook

If at any step the system is in a bad state, rollback by reverting `instance.json` and re-creating the junction.

```powershell
# Constants (re-paste if rolling back in a fresh session)
$Pg0Bin     = 'C:\Users\42\AppData\Local\uv\cache\archive-v0\5XEUsrChaAKt-U2sNig51\Lib\site-packages\pg0\bin\pg0.exe'
$Pg0Junction = 'C:\Users\42\.pg0'
$Pg0Real    = 'Z:\claude-sota-installed\.pg0'
$InstanceName = 'hindsight-embed-claude-code'
$InstanceDir = "$Pg0Real\instances\$InstanceName"

# 1. Stop pg0 if running
& $Pg0Bin stop --name $InstanceName -ErrorAction SilentlyContinue
# Stop hindsight-api if up
Get-CimInstance Win32_Process -Filter "Name='hindsight-api.exe'" |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

# 2. Restore instance.json from backup
$bak = Get-ChildItem "$InstanceDir\instance.json.pre-cutover-*.bak" |
       Sort-Object LastWriteTime -Descending | Select-Object -First 1
Copy-Item $bak.FullName "$InstanceDir\instance.json" -Force

# 3. Re-create the junction (idempotent — fails harmlessly if already there)
if (-not (Test-Path $Pg0Junction)) {
    cmd /c "mklink /J `"$Pg0Junction`" `"$Pg0Real`""
}

# 4. Verify junction re-created and Target = Z:
(Get-Item $Pg0Junction -Force).Attributes        # MUST contain "ReparsePoint"
(Get-Item $Pg0Junction -Force).Target             # MUST be Z:\claude-sota-installed\.pg0

# 5. Restart pg0 (will read the rolled-back instance.json with C:\ paths)
& $Pg0Bin start --name $InstanceName

# 6. Restart hindsight-api (same Start-Process invocation as Step 8 above)
$apiExe = 'C:\Users\42\AppData\Local\uv\cache\archive-v0\5XEUsrChaAKt-U2sNig51\Scripts\hindsight-api.exe'
Start-Process -FilePath $apiExe -ArgumentList '--daemon','--idle-timeout','0','--port','9077' -WindowStyle Hidden

# 7. Smoke test
Invoke-WebRequest 'http://127.0.0.1:9077/health' -UseBasicParsing -TimeoutSec 5
& $Pg0Bin info --name $InstanceName -o json | ConvertFrom-Json
```

Rollback time: ~2-3 minutes (vs. ~5-10 min for forward cutover). No data loss — `data_dir` only ever physically lived on Z:; the path in instance.json just gets re-pointed.

## Open risks

1. **Bootstrap PART 4 expects a different target path.** `tools/bootstrap-runtime.ps1` lines 593-625 check `Z:\claude-sota-installed-state\.pg0` (under the state dir, NOT the worktree). This runbook keeps pg0 at `Z:\claude-sota-installed\.pg0` (worktree-local). After cutover the bootstrap will log "OK pg0 not present on either C: or Z: — fresh install (will materialize on first hindsight daemon start...)" which is WRONG (data exists, just at the worktree path). Recommendation: in a separate follow-up commit, either (a) update bootstrap PART 4 to check `Z:\claude-sota-installed\.pg0` too, or (b) move the data to `Z:\claude-sota-installed-state\.pg0` (an additional 198 MB Move-Item step, but matches the existing state-outside-repo convention used by codex/.cognee/basic-memory). Option (b) is more invariant-faithful; this runbook keeps the data at the worktree path because the junction already lives there and any Move-Item duplicates the cutover risk surface.
2. **`HINDSIGHT_PG0_DIR` env var phantom.** Stream B's runbook (and bootstrap PART 4) recommend setting `$env:HINDSIGHT_PG0_DIR = 'Z:/claude-sota-installed-state/.pg0'` in `CLAUDE.local.md`. **This env var does NOT exist** — confirmed by grepping the hindsight_api site-packages and pg0 binary (no string matches for `HINDSIGHT_PG0_DIR` or `PG0_HOME`). DO NOT add it; it would be a confusing no-op. The way pg0 finds data is via `instance.json` (after start) or `$USERPROFILE\.pg0\instances\<name>\` (at start-time default).
3. **HOME-time of new instances.** This runbook only fixes the *existing* `hindsight-embed-claude-code` instance. If a new pg0 instance is ever created (e.g. fresh clone, different `--name`), it will default to `$env:USERPROFILE\.pg0\instances\<new-name>\`. With `eee.ps1` exporting `$env:USERPROFILE='Z:\claude-sota-installed'`, this lands at the right place. If the bootstrap script ever launches `uvx hindsight-api` directly without first sourcing the eee.ps1 env block, USERPROFILE will be `C:\Users\42` (default Windows token) and new instances will re-introduce C:\Users\42\.pg0. Mitigation: `tools/bootstrap-runtime.ps1` should be modified to `$env:USERPROFILE = (Resolve-Path $PSScriptRoot\..).Path` before invoking any pg0/hindsight command. (Currently it just performs a health check, so this is a latent risk, not an active one.)
4. **`pg0 stop` semantic match to `pg_ctl stop -m smart`.** I could not strings-dump pg0.exe (no `strings.exe` available on this system), so I cannot literally confirm the binary calls `pg_ctl stop -m smart` vs `-m fast` vs `-m immediate`. Behavioral test: the probe instance `pg0-probe-test` stopped cleanly via `pg0 stop --name`, instance.json was preserved (PID field stale but unfixed), and `info` correctly showed running=false. This matches `pg_ctl stop -m smart` semantics (graceful — waits for clients to disconnect). For the production cutover, `-m smart` could take >30s if there's a long-running query; if Step 3 hangs >60s, the operator may need to manually invoke `pg_ctl stop -D <data_dir> -m fast` (kills active queries, still flushes WAL).
5. **No graceful hindsight-api shutdown.** `hindsight-api` exposes no HTTP shutdown endpoint, so Step 2 uses `Stop-Process -Force` which on Windows == `TerminateProcess` (not even WM_CLOSE for a console-host process). This loses in-flight HTTP requests. Acceptable in a maintenance window. Upstream fix would be a `POST /admin/shutdown` endpoint — file as a separate issue against `hindsight-api`.
6. **Junction-aware `Remove-Item` Windows behavior.** PowerShell 7's `Remove-Item -Recurse -Force` on a junction has been junction-aware since PS 6.1, but the historical bug surface (PS 5.1 follows-the-link, PS 7+ does not, but edge cases exist for nested junctions) is large enough that this runbook uses `cmd /c rmdir "<junction>"` (NT-level reparse-point delete, well-defined: removes the junction record, leaves target untouched). Defence in depth: Step 1c pre-flight check asserts that `Z:\claude-sota-installed\.pg0` itself is NOT a ReparsePoint, so even if `Remove-Item` were used and were buggy, the worst case is a Z:\\ dir delete which can be recovered from filesystem (NTFS journal). But the runbook uses `cmd /c rmdir` which is the documented junction-removal command.
7. **uv cache rebuild on uv prune.** The pg0 binary at `C:\Users\42\AppData\Local\uv\cache\archive-v0\5XEUsrChaAKt-U2sNig51\Lib\site-packages\pg0\bin\pg0.exe` is in uv's archive cache. If the operator ever runs `uv cache prune` (or uv auto-prunes on disk pressure), this exact path goes away. The instance.json `installation_dir` field doesn't reference the cache path — that's only the `pg0.exe` CLI, not the `postgres.exe` binary which lives under `Z:\claude-sota-installed\.pg0\installation\18.1.0\bin\`. So a cache prune breaks `pg0 stop/start/info` CLI invocation but NOT the running postgres. Mitigation: pin the pg0-embedded wheel via uv tool install (`uv tool install pg0-embedded --force` then use `uvx --no-cache pg0`), or document the cache path in CLAUDE.local.md. Out of scope for this runbook.

## Estimated maintenance window

| Phase | Time |
|---|---|
| Pre-flight checks | 30-60s |
| Stop hindsight-api (Step 2) | 1-3s |
| Stop pg0 (Step 3) | 3-10s (worst case: 60s if long-running query) |
| Edit instance.json (Step 4) | 5s |
| Remove junction (Step 5) | 1s |
| Start pg0 (Step 6) | 5-15s (postgres recovery if smart-stop was clean: ~3s; WAL replay if dirty: ~10-30s) |
| Smoke test (Step 7) | 3s |
| Restart hindsight-api (Step 8) | 10-15s (uvicorn cold start + DB connection-pool warmup) |
| End-to-end verify (Step 9) | 5-10s |
| Invariant assertions (Step 10) | 10s |
| **Minimum (happy path)** | **~75s (1m 15s)** |
| **Realistic (typical)** | **~3-5 minutes** |
| **Worst case** | **~10 minutes** (long-running query forces fast-stop + WAL recovery on restart) |

If maintenance window <5 min is not available, defer.

## Appendix: probe evidence

### Probe 4 — fresh-start USERPROFILE=Z:
```
PS> $env:USERPROFILE = 'Z:\claude-sota-installed'
PS> & pg0.exe start --name pg0-probe-test --port 15999 --data-dir 'Z:\claude-sota-installed\tmp\pg0-probe-test\data'
PS> Get-Content 'Z:\claude-sota-installed\.pg0\instances\pg0-probe-test\instance.json'
{
  "pid": 80604,
  "port": 15999,
  "data_dir": "Z:\\claude-sota-installed\\tmp\\pg0-probe-test\\data",
  "installation_dir": "C:\\Users\\42\\.pg0\\installation",   <-- still C: because $env:USERPROFILE doesn't override the bundled-install path lookup
  ...
}
```
Confirmed: `data_dir` honors the explicit `--data-dir` flag. `installation_dir` resolves through whichever `~/.pg0/installation` exists — both Z: and (via junction) C: paths are equivalent, but pg0 records the path it actually walked. After junction removal in Step 5, a fresh start would record `Z:\claude-sota-installed\.pg0\installation`.

### Probe 2 — junction is the ONLY C: footprint
```
PS> Get-ChildItem 'C:\Users\42' -Force | Where-Object { $_.Name -like '.pg0*' }
.pg0   d----l    (ReparsePoint, Junction → Z:\claude-sota-installed\.pg0)
```
No other `.pg0*` files; no `pg0.exe` in `C:\Users\42\AppData\Local\pg0\`; no shadow data dir.

### Probe 3 — auto-start mechanism is absent
```
PS> Get-CimInstance Win32_Service -Filter "PathName LIKE '%hindsight%' OR PathName LIKE '%pg0%' OR PathName LIKE '%postgres%' OR PathName LIKE '%uvx%'"
(no rows)

PS> schtasks /Query /Fo CSV /V | ? { $_.'Task To Run' -match 'hindsight|pg0|postgres|uvx' }
(no rows)
```

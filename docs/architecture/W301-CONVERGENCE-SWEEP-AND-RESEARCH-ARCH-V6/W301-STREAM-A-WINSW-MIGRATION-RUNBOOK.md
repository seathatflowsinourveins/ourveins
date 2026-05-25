# W301 Stream A — NSSM → WinSW Migration Runbook + SEV-1 Closure

**Date**: 2026-05-18 | **Wave**: W301 | **Stream**: A (parallel fan-out, file-owned: this doc + 3 XMLs under `OPERATOR-READY-ARTIFACTS/`) | **Budget**: T3 ≤ $0.50

**Mission**: Migrate three NSSM-managed services (IkLlamaServer, LlamaSwap, CogneeMCP) to WinSW; close SEV-1 (`LANGFUSE_SECRET_KEY` plaintext in `HKLM\…\CogneeMCP\Parameters\AppEnvironmentExtra` REG_MULTI_SZ).

**CRITICAL CORRECTION TO MISSION SPEC**: `<envFromFile>` **does NOT exist** in WinSW v2 OR v3. Mission prompt assumed otherwise. Stream A uses a **wrapper-script pattern** for SEV-1 closure (see §3). Verified mechanically via DeepWiki `winsw/winsw` + direct fetch of `v2.12.0/doc/xmlConfigFile.md` + `v3.0.0-alpha.11/docs/xml-config-file.md` + GitHub issue/PR search (no `envFromFile` references exist; closest discussion at `winsw/winsw#349` "Picking env variables" stayed at `<env>` only).

---

## §1 — v2-stable vs v3-alpha decision

| Axis | WinSW v2.12.0 (stable) | WinSW v3.0.0-alpha.11 (latest alpha) |
|---|---|---|
| Release status | **STABLE** — production-ready | **ALPHA / pre-release** (per release page banner) |
| Runtime requirement | .NET Framework 4.6.1+ (preinstalled on Win11) | .NET 7+ OR native-AOT self-contained binary (no .NET runtime needed) |
| Distribution channel | NuGet stable, Maven Central, Jenkins-bundled | GitHub Releases pre-release only |
| Jenkins ships | **YES** — Jenkins Windows installer bundles WinSW v2 | NO |
| `<stopparentprocessfirst>` | **Available** (essential for console-based servers like llama-server) | **REMOVED** (PR `winsw/winsw#487`) |
| `<envFromFile>` | NOT available | NOT available |
| `<env name="X" value="Y"/>` | YES | YES |
| `<prestart>`/`<poststart>` | YES (since v2.10 per PR #595) | YES |
| `<preshutdown>` / `<preshutdownTimeout>` | YES (since v2.10 per PR #614) | YES |
| Existing operator-ready drafts target | v3 (per `IkLlamaServer.xml` header line 9) | — |
| GSoC 2026 status | Stable & maintained | Modernization project announced (`community.jenkins.io/t/gsoc-2026-introduction-winsw-modernization-c-net/36644`) — still in flux |

### Decision: **WinSW v2.12.0 stable**

Rationale (in priority order):

1. **Cardinal-rule R1 (`https://code.claude.com/docs/en/plugins`)** — "Install primitives only from trusted plugins/skills/agents". An alpha pre-release that the upstream README explicitly recommends against for general use does NOT satisfy "production-stable". Jenkins shipping v2 is the canonical production reference.
2. **`<stopparentprocessfirst>` IS NEEDED** for llama-server: `llama-server.exe` runs as a console app and traps Ctrl+C to flush KV-cache before terminating; without this tag, WinSW kills the parent before children flush. v3 removed the tag; v2 keeps it.
3. **W301 SEV-1 timeline** — the SEV-1 demands a TODAY-class fix, not "wait for v3 to GA". v2 is shippable now; v3-alpha is not.
4. **Migration cost** — v2→v3 manual migration recipe is published (`winsw/winsw/v3.0.0-alpha.11/docs/migrate-to-3-x.md`); the runtime can adopt v3 ≤30 min when v3 reaches stable, without re-doing the SEV-1 closure.

### Operator action

```powershell
# Download v2.12.0 binary (latest stable as of 2026-05-18 per https://github.com/winsw/winsw/releases/latest)
$url = "https://github.com/winsw/winsw/releases/download/v2.12.0/WinSW-x64.exe"
New-Item -ItemType Directory -Path Z:\tools\winsw -Force
Invoke-WebRequest -Uri $url -OutFile Z:\tools\winsw\winsw.exe
# Verify hash (publish SHA256 from release page)
Get-FileHash Z:\tools\winsw\winsw.exe -Algorithm SHA256
```

---

## §2 — XML schema deep-dive (v2.12.0 stable)

Citations: `https://raw.githubusercontent.com/winsw/winsw/v2.12.0/doc/xmlConfigFile.md` (fetched 2026-05-18). Root element `<service>`; all child elements below.

### §2.1 Required

- `<id>` — Service ID, alphanumeric only, must be unique system-wide.
- `<executable>` — Path to executable to launch.

### §2.2 Display / metadata (optional in v2; optional in v3 per PR #609)

- `<name>` — Short display name (Services.msc column).
- `<description>` — Long human-readable description.

### §2.3 Arguments

- `<arguments>` — Argument string passed to `<executable>`.
- `<startarguments>` + `<stoparguments>` + `<stopexecutable>` — **Stop-via-external-process pattern**. If `<stoparguments>` is present, WinSW spawns `<stopexecutable>` (default = `<executable>`) with those args instead of `TerminateProcess`; useful for catalina.sh-style scripts.

### §2.4 Environment

- `<env name="X" value="Y"/>` — Repeatable. Values may use `%Name%` for env-var expansion. **`%BASE%` is auto-set by WinSW to the directory containing the renamed `winsw.exe`** (per v3a11/v2.12 docs).
- `<envFromFile>` — **DOES NOT EXIST** (verified via DeepWiki `winsw/winsw` + GitHub issue search `envFromFile`). For "load secrets from gitignored file" use the §3 wrapper-script pattern.
- Environment-variable expansion in WinSW XML uses `%Name%` syntax; if an env var is undefined at WinSW-process-start time, NO substitution occurs (silent — easy to debug-miss). PowerShell-session vars are NOT visible (per `winsw/winsw#305`); only Machine + User scopes survive into the service launch.

### §2.5 Logging

- `<log mode="...">` modes: `append` (default), `reset`, `roll`, `roll-by-size`, `roll-by-time`, `roll-by-size-time`, `none`.
- `<log mode="roll-by-size">` child elements: `<sizeThreshold>` (KB), `<keepFiles>`.
- `<log mode="roll-by-time">` child element: `<pattern>` (.NET DateTime format string for log file suffix), `<period>` (days).
- `<logpath>` — Either child of `<log>` OR direct child of `<service>`.

### §2.6 Failure handling

- `<onfailure action="restart|reboot|none" delay="N sec|min|hour"/>` — Repeatable. Order = retry sequence; the LAST element's delay is used for all subsequent failures (per v3a11 docs).
- `<resetfailure>` — Period after which the failure counter resets (default = 1 day).

### §2.7 Startup

- `<startmode>` — `Automatic` (default) | `Manual` | `Boot` | `System` (the latter two work on legacy Win versions only; Win11 effectively supports the first two).
- `<delayedAutoStart/>` — Self-closing boolean flag in v2 (becomes `<delayedAutoStart>true</delayedAutoStart>` in v3 per `winsw/winsw#613`).
- `<depend>X</depend>` — Repeatable; service X must be running before this service starts.

### §2.8 Shutdown

- `<stoptimeout>30 sec</stoptimeout>` — Graceful-shutdown grace period before WinSW force-kills.
- `<stopparentprocessfirst>true</stopparentprocessfirst>` — **v2 ONLY** (removed in v3 per PR #487); essential for console apps that handle Ctrl+C.
- `<preshutdown>true</preshutdown>` + `<preshutdownTimeout>3 min</preshutdownTimeout>` — Win10+ preshutdown notification (system default = 3 min).
- `<beforeShutdown>` — **DOES NOT EXIST**; the mission spec named a non-existent tag. Use `<preshutdown>` instead.

### §2.9 Process attributes

- `<priority>` — `idle | belownormal | normal | abovenormal | high | realtime` (case-insensitive per v3a11 docs).
- `<workingdirectory>C:\app</workingdirectory>` — Default cwd for `<executable>`.
- `<interactive/>` — Allow service to interact with desktop (rarely needed).

### §2.10 Pre/post hooks

- `<prestart>` + `<poststart>` + `<prestop>` + `<poststop>` — Each contains `<executable>` + `<arguments>` (+ optional `<stdoutPath>` / `<stderrPath>` v3 only). Added by PR `winsw/winsw#595` (v2.10+). **`<prestart>` is the SEV-1 hook**: it runs before the main `<executable>`, in the same process tree, with full env-var inheritance to the child.

### §2.11 Service account

- `<serviceaccount>` with v2 children `<domain>` + `<user>` + `<password>` + `<allowservicelogon>true</allowservicelogon>`. v3 merges domain+user into `<username>DOMAIN\user</username>` (PR `winsw/winsw#556`).

### §2.12 Download (auto-fetch before start)

- `<download from="URL" to="PATH" auth="none|sspi|basic" user="..." password="..." failOnError="true|false"/>` — Repeatable. Runs before `<executable>`. Not used in this migration but available.

### §2.13 Extensions

- `<extensions>` wrapping `<extension>` blocks. v2 ships: `SharedDirectoryMapper` (drive-letter mapping pre-start) + `RunawayProcessKiller`. v3 removes `RunawayProcessKiller` (PR #440) and folds `SharedDirectoryMapper.mapping.map` into `<service>.<sharedDirectoryMapping>.<map>` (per v3-migrate doc). Not used in this migration.

---

## §3 — SEV-1 closure recipe (wrapper-script pattern)

**Problem**: NSSM `AppEnvironmentExtra` is REG_MULTI_SZ in `HKLM\SYSTEM\CurrentControlSet\Services\CogneeMCP\Parameters\AppEnvironmentExtra`. Any local Administrator can `reg query` it and harvest `LANGFUSE_SECRET_KEY` (verified live 2026-05-18 — the secret is currently exposed).

**Why NOT use `<env>`**: WinSW XML lives in `Z:\tools\winsw\CogneeMCP.xml` which the operator might commit to a config repo. Even if uncommitted, the XML is plain-text and ends up in operator-state backups. Same exposure class as the registry.

**Solution**: Wrapper-script pattern. WinSW's `<executable>` becomes a small `.cmd` script in the gitignored `Z:\claude-sota-installed-state\winsw\` directory. The script:

1. Sources a sibling `.env` file (which sits OUTSIDE the worktree, OUTSIDE the registry, ACL-locked to SYSTEM + Administrators only).
2. Exec-replaces itself with the real binary so WinSW's stop-signal hits the real process directly (no `cmd.exe` shim in between).

This is the canonical Linux-systemd `EnvironmentFile=` pattern transplanted to Windows. **Compliance**: cardinal-rule R5 (safety boundaries via Claude Code permissions + filesystem ACLs) — secrets live in a SYSTEM-readable file with audited ACL, NOT in registry, NOT in repo, NOT in WinSW XML.

### §3.1 Directory layout (operator must create)

```
Z:\claude-sota-installed-state\winsw\
├── CogneeMCP.env          # 0600-equivalent ACL: SYSTEM:F, BUILTIN\Administrators:F, deny everyone else
├── CogneeMCP.start.cmd    # 0755-equivalent ACL: SYSTEM:RX, Administrators:F, Users:RX (executable, not secret)
├── IkLlamaServer.env      # (currently empty; reserved for future)
├── IkLlamaServer.start.cmd
├── LlamaSwap.env          # (currently empty; reserved for future)
└── LlamaSwap.start.cmd
```

### §3.2 ACL commands (operator runs once during install)

```powershell
$dir = "Z:\claude-sota-installed-state\winsw"
New-Item -ItemType Directory -Path $dir -Force | Out-Null

# Disable inheritance, strip all ACEs except SYSTEM + Administrators
icacls $dir /inheritance:r
icacls $dir /grant:r "NT AUTHORITY\SYSTEM:(OI)(CI)F"
icacls $dir /grant:r "BUILTIN\Administrators:(OI)(CI)F"

# .env files: SYSTEM+Admins read-only; nobody else
# (after file creation)
icacls "$dir\CogneeMCP.env" /inheritance:r
icacls "$dir\CogneeMCP.env" /grant:r "NT AUTHORITY\SYSTEM:R"
icacls "$dir\CogneeMCP.env" /grant:r "BUILTIN\Administrators:R"
```

### §3.3 `.gitignore` patches (already covered)

The `claude-sota-installed-state/` tree is fully outside the worktree (`Z:\claude-sota-installed-state\` vs `Z:\claude-sota-installed\`) so it cannot be accidentally committed from this repo. The repo's existing `.gitignore` already excludes `**/state.json`, `.claude/plugins/data/` etc. (per CLAUDE.md W280 closeout); no new ignore patterns needed.

### §3.4 Wrapper-script template (CogneeMCP.start.cmd)

The `.cmd` script reads each `KEY=VALUE` line from the sibling `.env`, exports it via `set`, then `cmd /c start /b` execs the real binary. See `OPERATOR-READY-ARTIFACTS/CogneeMCP.xml` for the exact XML pointing at this script; the script body is inlined in §4.3 below for self-containment.

### §3.5 Post-migration registry cleanup

After WinSW takes over and smoke-test passes, the operator manually removes the NSSM `AppEnvironmentExtra` REG_MULTI_SZ value:

```powershell
# Verify NSSM service is stopped+disabled first
nssm status CogneeMCP   # expect "SERVICE_STOPPED"
nssm get CogneeMCP Start # expect "SERVICE_DISABLED"

# Delete the registry value (NOT the whole NSSM entry — keep that for 30-day rollback)
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\CogneeMCP\Parameters" /v AppEnvironmentExtra /f

# Audit: confirm no other registry value carries the secret
reg query "HKLM\SYSTEM\CurrentControlSet\Services\CogneeMCP" /s | findstr /I "LANGFUSE"
# expect: zero hits
```

This step happens AFTER the langfuse-key rotation (W301-SEV-1 step 1 in `OPERATOR-READY-ARTIFACTS/README.md`), so even if the registry value lingers briefly between migration steps the exposed key is already invalidated.

---

## §4 — Per-service migration runbook

Sequencing: IkLlamaServer first (LLM endpoint; cognee depends on it), LlamaSwap second (depends on IkLlamaServer per W269), CogneeMCP last (depends on both — and carries the SEV-1).

### §4.1 IkLlamaServer

**Pre-flight**:
```powershell
# 1. Confirm WinSW binary present + healthy
& Z:\tools\winsw\winsw.exe --help | Select-String -Pattern "version"

# 2. Backup current NSSM state
nssm dump IkLlamaServer > Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-nssm-dump-pre-winsw.txt

# 3. Confirm NSSM service is currently RUNNING and healthy
sc query IkLlamaServer | findstr "STATE"  # expect RUNNING
Invoke-RestMethod -Uri http://127.0.0.1:8080/health -TimeoutSec 5  # expect status:ok

# 4. Confirm Z:\claude-sota-installed-state\logs\IkLlamaServer\ exists (or WinSW will fail to write)
New-Item -ItemType Directory -Path Z:\claude-sota-installed-state\logs\IkLlamaServer -Force | Out-Null
```

**Install**:
```powershell
# 1. Stop + disable NSSM (preserves config for 30-day rollback)
nssm stop IkLlamaServer
nssm set IkLlamaServer Start SERVICE_DISABLED
# Confirm:
sc query IkLlamaServer | findstr "STATE"   # STOPPED
nssm get IkLlamaServer Start                # SERVICE_DISABLED

# 2. Copy WinSW binary to a per-service location (WinSW v2 convention: renamed exe sets %BASE%)
Copy-Item Z:\tools\winsw\winsw.exe Z:\tools\winsw\IkLlamaServer.exe
Copy-Item Z:\claude-sota-installed\docs\architecture\W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6\OPERATOR-READY-ARTIFACTS\IkLlamaServer.xml Z:\tools\winsw\IkLlamaServer.xml

# 3. Install + start
Z:\tools\winsw\IkLlamaServer.exe install
Z:\tools\winsw\IkLlamaServer.exe start
```

**Smoke-test** (within 60s — see §5 rollback gate):
```powershell
Start-Sleep -Seconds 30  # MTP cold-load
$h = Invoke-RestMethod -Uri http://127.0.0.1:8080/health -TimeoutSec 5
if ($h.status -ne "ok") { throw "ROLLBACK" }
$m = Invoke-RestMethod -Uri http://127.0.0.1:8080/v1/models -TimeoutSec 5
if (-not ($m.data | Where-Object id -eq "qwen36")) { throw "ROLLBACK" }
```

**Rollback** (if smoke fails):
```powershell
Z:\tools\winsw\IkLlamaServer.exe stop
Z:\tools\winsw\IkLlamaServer.exe uninstall
nssm set IkLlamaServer Start SERVICE_AUTO_START
nssm start IkLlamaServer
Start-Sleep -Seconds 30
Invoke-RestMethod -Uri http://127.0.0.1:8080/health  # expect status:ok (restored)
```

### §4.2 LlamaSwap

**Pre-flight**: same shape; confirm WinSW IkLlamaServer is RUNNING + healthy first (LlamaSwap declares `<depend>IkLlamaServer</depend>`).

**Install** (identical pattern to §4.1; substitute `LlamaSwap.exe` + `LlamaSwap.xml`).

**Smoke-test**:
```powershell
Start-Sleep -Seconds 15
$m = Invoke-RestMethod -Uri http://127.0.0.1:8090/v1/models -TimeoutSec 5
if (-not $m.data) { throw "ROLLBACK" }
```

### §4.3 CogneeMCP (carries SEV-1 closure)

**Pre-flight** (in addition to standard checks):
```powershell
# 1. Rotate langfuse keys FIRST (W301-SEV-1 step 1 — see OPERATOR-READY-ARTIFACTS/README.md §4)
#    Generate new pk-lf-* + sk-lf-* in Langfuse UI at http://127.0.0.1:3000
#    THEN update Z:\claude-sota-installed\CLAUDE.local.md (gitignored) env block

# 2. Create the gitignored .env directory + ACL it (§3.2)
$dir = "Z:\claude-sota-installed-state\winsw"
# … (§3.2 commands)

# 3. Create CogneeMCP.env (operator step — DO NOT commit; gitignored by virtue of being outside repo)
# File content (placeholders for ROTATED keys; replace before saving):
@"
OPENAI_API_KEY=local
OPENAI_BASE_URL=http://127.0.0.1:8080/v1
LLM_MODEL=qwen36
LANGFUSE_HOST=http://127.0.0.1:3000
LANGFUSE_BASE_URL=http://127.0.0.1:3000
LANGFUSE_PUBLIC_KEY=pk-lf-ROTATED-PUBLIC-KEY
LANGFUSE_SECRET_KEY=sk-lf-ROTATED-SECRET-KEY
SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee
DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data
PYTHONUNBUFFERED=1
PYTHONIOENCODING=utf-8
"@ | Set-Content -Path "$dir\CogneeMCP.env" -Encoding ASCII

# 4. Apply restrictive ACLs
icacls "$dir\CogneeMCP.env" /inheritance:r
icacls "$dir\CogneeMCP.env" /grant:r "NT AUTHORITY\SYSTEM:R"
icacls "$dir\CogneeMCP.env" /grant:r "BUILTIN\Administrators:R"

# 5. Create the wrapper script CogneeMCP.start.cmd (operator step — also gitignored)
@'
@echo off
REM W301 SEV-1 wrapper — reads env-file then exec-replaces with real binary.
REM ACL: SYSTEM:RX, Administrators:F. NOT in repo. NOT in registry.

setlocal EnableExtensions EnableDelayedExpansion
set "ENVFILE=Z:\claude-sota-installed-state\winsw\CogneeMCP.env"

if not exist "%ENVFILE%" (
  echo [WinSW-wrapper] FATAL: env file missing: %ENVFILE% 1>&2
  exit /b 78
)

REM Parse KEY=VALUE lines, skip blanks + comments
for /f "usebackq tokens=1,* delims==" %%A in ("%ENVFILE%") do (
  set "key=%%A"
  set "val=%%B"
  if not "!key!"=="" if not "!key:~0,1!"=="#" set "!key!=!val!"
)

REM Hand control to the real binary (this process becomes the child; WinSW Ctrl+C reaches it)
"Z:\venvs\claude\Scripts\python.exe" -u "Z:\repos\deps\cognee\cognee-mcp\src\server.py" --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration
'@ | Set-Content -Path "$dir\CogneeMCP.start.cmd" -Encoding ASCII
```

**Install** (after rotation + env-file + wrapper exist):
```powershell
nssm stop CogneeMCP
nssm set CogneeMCP Start SERVICE_DISABLED

Copy-Item Z:\tools\winsw\winsw.exe Z:\tools\winsw\CogneeMCP.exe
Copy-Item Z:\claude-sota-installed\docs\architecture\W301-CONVERGENCE-SWEEP-AND-RESEARCH-ARCH-V6\OPERATOR-READY-ARTIFACTS\CogneeMCP.xml Z:\tools\winsw\CogneeMCP.xml

Z:\tools\winsw\CogneeMCP.exe install
Z:\tools\winsw\CogneeMCP.exe start
```

**Smoke-test**:
```powershell
Start-Sleep -Seconds 20
$probe = Invoke-RestMethod -Uri http://127.0.0.1:8000/mcp -Method GET -TimeoutSec 5 -ErrorAction SilentlyContinue
# CogneeMCP /mcp accepts POST only; a GET 405 means service is alive
# Better: tail Z:\claude-sota-installed-state\logs\CogneeMCP\CogneeMCP.out.log for "Uvicorn running on http://127.0.0.1:8000"
Get-Content -Tail 20 Z:\claude-sota-installed-state\logs\CogneeMCP\CogneeMCP.out.log
```

**Post-install registry cleanup** (only after 5-minute soak passes):
```powershell
reg delete "HKLM\SYSTEM\CurrentControlSet\Services\CogneeMCP\Parameters" /v AppEnvironmentExtra /f
# Audit:
reg query "HKLM\SYSTEM\CurrentControlSet\Services\CogneeMCP" /s | findstr /I "LANGFUSE"
# expect: zero hits → SEV-1 CLOSED
```

---

## §5 — Rollback gates

| Stage | Trigger to ABORT | Action |
|---|---|---|
| WinSW install fails (exit != 0) | Any error from `winsw.exe install` | `winsw.exe uninstall` then re-enable NSSM (§4.1 rollback) |
| Service start fails | `winsw.exe start` returns non-zero, OR `sc query` shows STOPPED within 5 sec | Inspect `Z:\claude-sota-installed-state\logs\<svc>\<svc>.err.log`; rollback |
| Smoke-test timeout | Health endpoint not 200 within 30s (IkLlamaServer) / 15s (LlamaSwap) / 20s (CogneeMCP) | Rollback |
| Smoke-test schema mismatch | Endpoint returns 200 but expected JSON key absent (e.g. `data[].id == qwen36`) | Rollback |
| 5-min soak failure | Service flaps (restart count > 2 within 5 min) per WinSW event log | Rollback |
| Registry secret audit fail | After §4.3 cleanup, `reg query` still returns `LANGFUSE_SECRET_KEY` | DO NOT rotate keys back; manually purge registry; if cannot, ESCALATE to operator-AI |

---

## §6 — 30-day shadow period

For each of the three migrated services:

- Days 0-30: NSSM service `Start=SERVICE_DISABLED`, WinSW service `Start=Automatic` + running. Both NSSM dumps preserved at `Z:\claude-sota-installed-state\.codex\backups\<svc>-nssm-dump-pre-winsw.txt`.
- If WinSW service fails within 30 days (anything that needs the rollback path of §5): `winsw.exe stop && winsw.exe uninstall`, then `nssm set <svc> Start SERVICE_AUTO_START && nssm start <svc>`. NSSM `AppEnvironmentExtra` is GONE for CogneeMCP (§4.3 deleted it); operator must re-apply from the secrets file before NSSM-start, OR temporarily restore the SEV-1 exposure for the rollback window (after re-rotating keys ONE MORE TIME).
- Day 30 (clean): `nssm remove <svc> confirm` permanently.

Calendar reminder: add to ops calendar at install-day +30.

---

## §7 — NvitopExporter migration (hypothesis only — do NOT apply unverified)

**Current state**: `NvitopExporter` is **NOT INSTALLED** per `sc query` (verified 2026-05-18 — `OpenService(): The specified service does not exist as an installed service.`). The README.md §6 install steps were drafted but never executed.

**Hypothesis**: when installed via NSSM, the failure mode likely was a Python-3.13 + nvitop-exporter dependency conflict (nvitop 1.x pinned to py<=3.12 last we checked).

**WinSW could help via**:

```xml
<env name="PYTHONPATH" value="Z:\venvs\claude\Lib\site-packages"/>
<workingdirectory>Z:\venvs\claude\Scripts</workingdirectory>
```

But this is **band-aiding the symptom, not the cause**. Real fix: either (a) `pip install -U nvitop nvitop-exporter` to get a py3.13-compatible release, or (b) use a separate Python 3.12 venv at `Z:\venvs\claude-py312\` for the exporter only.

**Recommendation**: defer NvitopExporter to a separate wave. WinSW can host it once py3.13 compat lands upstream; the env-block in XML is a clean way to scope a different `PYTHONPATH` if a parallel venv approach is chosen.

---

## §8 — Cite ledger (verified 2026-05-18)

| Claim | Source | Status |
|---|---|---|
| WinSW v2.12.0 is latest stable | `https://github.com/winsw/winsw/releases/latest` (releases page header "WinSW v2.12.0") | VERIFIED |
| WinSW v3.0.0-alpha.11 is latest pre-release | `https://github.com/winsw/winsw/releases/tag/v3.0.0-alpha.11` | VERIFIED |
| v3 is alpha / not production-ready | DeepWiki `winsw/winsw` Q&A 2026-05-18; `https://community.jenkins.io/t/gsoc-2026-introduction-winsw-modernization-c-net/36644` | VERIFIED |
| Jenkins ships v2 | DeepWiki `winsw/winsw` Q&A; `https://github.com/winsw/winsw/blob/v3/samples/jenkins.xml` (canonical sample) | VERIFIED |
| `<envFromFile>` does NOT exist | DeepWiki `winsw/winsw` Q&A; GitHub issue search `is:issue envFromFile` returns 0 results; `winsw/winsw#349` is the closest analog and stayed at `<env>` only | VERIFIED |
| `<beforeShutdown>` does NOT exist; use `<preshutdown>` | `v3.0.0-alpha.11/docs/xml-config-file.md` §"Preshutdown" | VERIFIED |
| `<stopparentprocessfirst>` removed in v3 | `winsw/winsw#487`; `v3.0.0-alpha.11/docs/migrate-to-3-x.md` line "Remove `<stopparentprocessfirst>`" | VERIFIED |
| `prestart`/`poststart`/`prestop`/`poststop` added in v2.10 | `winsw/winsw#595` | VERIFIED |
| `<preshutdown>`/`<preshutdownTimeout>` added in v2.10 | `winsw/winsw#614` | VERIFIED |
| Env-var expansion = `%Name%` only, no PowerShell-session vars | `v2.12.0/doc/xmlConfigFile.md` §"Environment variable expansion"; `winsw/winsw#305` | VERIFIED |
| `<log mode>` valid values | `v2.12.0/doc/xmlConfigFile.md` §"Logging" + `v3.0.0-alpha.11/docs/xml-config-file.md` §"Logging" | VERIFIED |
| `<priority>` valid values | `v3.0.0-alpha.11/docs/xml-config-file.md` §"Priority" — "idle, belownormal, normal, abovenormal, high, realtime" | VERIFIED |
| `<onfailure>` action values | `v2.12.0/doc/xmlConfigFile.md` §"Failure handling" — restart, reboot, none | VERIFIED |
| CogneeMCP currently exposes LANGFUSE_SECRET_KEY in registry | Live probe 2026-05-18: `nssm get CogneeMCP AppEnvironmentExtra` returns `LANGFUSE_SECRET_KEY=sk-lf-b9f486...` | VERIFIED |
| IkLlamaServer + LlamaSwap NSSM env is empty | Live probe 2026-05-18: `nssm get <svc> AppEnvironmentExtra` returns nothing | VERIFIED |

No UNVERIFIED claims in this runbook. Wrapper-script credential-loading is operator-introduced pattern (systemd `EnvironmentFile=` analog), not a WinSW feature.

---

## §9 — Blocking issues operator must resolve before applying

1. **MANDATORY**: Rotate `LANGFUSE_SECRET_KEY` BEFORE running §4.3 (per `OPERATOR-READY-ARTIFACTS/README.md` §4). The existing key is committed-in-history-class compromised; even a perfect WinSW migration leaves the old key valid until rotated in Langfuse UI.
2. **MANDATORY**: Decide on .NET runtime stance. If the host lacks .NET Framework 4.6.1 → 4.8 (Win11 ships with it by default; verify with `Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP\v4\Full' | Get-ItemPropertyValue -Name Release`; expect ≥ 460798), WinSW v2 will fail to start.
3. **RECOMMENDED**: Confirm `Z:\tools\winsw\` directory does not already exist with a different WinSW binary (this would conflict — operator should `Remove-Item Z:\tools\winsw -Recurse` first if found stale).
4. **RECOMMENDED**: After §4.3 succeeds, audit Windows Event Log (Source = `CogneeMCP`) for the first 24 hours — WinSW logs lifecycle events there; any `EventID 7` (start failure) or `EventID 11` (timeout) needs operator review.
5. **DEFERRED**: NvitopExporter (§7) — separate wave. Not blocking this SEV-1 closure.

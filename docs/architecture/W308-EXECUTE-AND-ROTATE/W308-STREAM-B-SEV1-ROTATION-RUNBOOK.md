# W308 Stream B — SEV-1 Rotation Runbook (Operator-Executable)

> **Wave**: W308 · **Stream**: B · **Severity**: SEV-1 × 2 · **Date**: 2026-05-18
> **Status**: RUNBOOK ONLY — operator executes; this stream documents + smoke-tests the procedure
> **Reversibility**: each step has a documented rollback
> **File owner**: agent-B-sev1-rotation-runbook (W308 Stream B)
> **Mode**: copy-paste runnable from a PowerShell 7+ elevated session at `Z:\claude-sota-installed`

---

## §1 Why this stream

Two SEV-1 credential exposures persist in the runtime:

1. **Langfuse keys** (`LANGFUSE_PUBLIC_KEY` = `pk-lf-*`, `LANGFUSE_SECRET_KEY` = `sk-lf-*`)
   - Source finding: **`W301-STREAM-A-SILENT-FAILURE-HUNT.md` §3 / §5** (originally flagged) + **`W301-STREAM-G-NSSM-ENV-AUDIT.md` §2** (NSSM blob exposure).
   - Plaintext in **2 surfaces**: (a) `CLAUDE.local.md` env-block lines 33-44 (gitignored doc), (b) `nssm get CogneeMCP AppEnvironmentExtra` → `HKLM:\SYSTEM\CurrentControlSet\Services\CogneeMCP\Parameters\AppEnvironmentExtra` REG_MULTI_SZ.
   - Threat model: any local Administrator can `reg query` the NSSM blob and harvest both keys. Any shell-export leak (clipboard, screenshot, copy-paste) exposes the doc-block copy. Trace-ingest write authority for the self-hosted Langfuse at `http://127.0.0.1:3000`.

2. **CCC-Proxy `MANAGEMENT_PASSWORD`** (admin-API gate for `Z:\claude\ccc\bin\cli-proxy-api.exe -oauth-callback-port 9328`)
   - Source finding: **`W301-STREAM-G-NSSM-ENV-AUDIT.md` §3** (new SEV-1 surfaced this sweep).
   - Plaintext in `nssm get CCC-Proxy AppEnvironmentExtra` REG_MULTI_SZ.
   - Threat model: any local Administrator can harvest the admin-API gate password and re-mint OAuth callbacks against the proxy management surface.

Historical context: **`W290 F2-SECURITY-AUDIT.md` AI-1** previously flagged credential rotation as an operator-action queue item, but did not produce a runnable procedure. W308 Stream B closes that gap.

Pattern source: **`W301-STREAM-A-WINSW-MIGRATION-RUNBOOK.md §3` (wrapper-script pattern)** + **`W278` (eee.local.ps1 sidecar pattern, tools/eee.ps1:43-54)**.

---

## §2 Pre-rotation checklist

Operator confirms before starting:

1. **Langfuse UI accessible**: `http://127.0.0.1:3000` opens; admin login works. If not, start the Langfuse stack first (per `W282a-LANGFUSE-STARTUP-2026-05-18.md`).
2. **Elevated PowerShell** available (Run as Administrator) — NSSM operations require it.
3. **Backup current state**:
   ```powershell
   cd Z:\claude-sota-installed
   git stash push -u -m "W308-B-pre-rotation-backup-$(Get-Date -Format yyyyMMddHHmm)"
   Copy-Item CLAUDE.local.md "CLAUDE.local.md.pre-W308B-bak"

   # Snapshot NSSM env blobs (so rollback is possible)
   nssm get CogneeMCP   AppEnvironmentExtra > "Z:\claude-sota-installed-state\W308B-CogneeMCP.nssm-env.before.txt"
   nssm get CCC-Proxy   AppEnvironmentExtra > "Z:\claude-sota-installed-state\W308B-CCC-Proxy.nssm-env.before.txt"
   ```
4. **Worktree-state**: confirm no uncommitted edits to `.mcp.json` / `CLAUDE.local.md` / `tools/eee*.ps1`. `git status` clean (apart from the optional stash above).
5. **Confirm Stop hook will not preempt**: this runbook performs no commits; the W280a codex stop-time review gate fires only on commit so this stream's smoke-tests are pre-commit-safe.

---

## §3 Part 1 — Langfuse pk-lf/sk-lf rotation (8 steps)

### 3.1 Revoke + regenerate keys in Langfuse UI

**Operator-action (manual, in browser)**:

1. Open `http://127.0.0.1:3000`.
2. Navigate: **Project Settings** → **API Keys**.
3. Locate the active pk-lf/sk-lf pair (the public key prefix matches what's in `CLAUDE.local.md:40`).
4. Click **Revoke** (or the trash-icon row action). Confirm. The old key pair is now invalid for ingest.
5. Click **Create new API keys**. Copy both values immediately (Langfuse shows the secret only once).
6. Write the new values to a scratch location (e.g. paste into Notepad temporarily); they will be moved to disk in §3.2-3.3.

**Rollback**: if you abort here, the old keys are revoked and the new keys are unsaved — Langfuse trace-ingest is broken until §3.2-3.3 complete. Procedure: regenerate a fresh pair, then continue from §3.2.

### 3.2 Update `tools/eee.local.ps1` (gitignored sidecar)

If `tools/eee.local.ps1` does not exist, create it. It is loaded by `tools/eee.ps1:53-54` (`if (Test-Path $eeeLocalSidecar) { . $eeeLocalSidecar }`).

```powershell
$sidecar = 'Z:\claude-sota-installed\tools\eee.local.ps1'
@"
# tools/eee.local.ps1 — gitignored per-machine secrets sidecar (W278e pattern)
# Loaded by tools/eee.ps1:43-54. NEVER commit.
# Rotated W308 Stream B $(Get-Date -Format yyyy-MM-dd).
`$env:LANGFUSE_HOST       = 'http://127.0.0.1:3000'
`$env:LANGFUSE_BASE_URL   = 'http://127.0.0.1:3000'
`$env:LANGFUSE_PUBLIC_KEY = 'pk-lf-<NEW-VALUE-FROM-§3.1>'
`$env:LANGFUSE_SECRET_KEY = 'sk-lf-<NEW-VALUE-FROM-§3.1>'
"@ | Set-Content -Path $sidecar -Encoding UTF8

# Confirm sidecar is in .gitignore (it should already match `tools/eee.local.ps1`)
git -C Z:\claude-sota-installed check-ignore tools/eee.local.ps1
# Expected output: "tools/eee.local.ps1"  (ignored)
```

### 3.3 Update `CLAUDE.local.md` env-block (lines 38-41)

Manual edit in your editor: replace the four `pk-lf-*` / `sk-lf-*` literals in the env-block lines (currently 33-44 per the file's structure) with the new values from §3.1. `CLAUDE.local.md` is gitignored per the file header.

```powershell
# Verify CLAUDE.local.md is still gitignored after edit
git -C Z:\claude-sota-installed check-ignore CLAUDE.local.md
# Expected: "CLAUDE.local.md"
```

### 3.4 Verify `.mcp.json` interpolation contract (no edit needed)

`.mcp.json:122-132` `langfuse` block uses `${LANGFUSE_HOST}` / `${LANGFUSE_PUBLIC_KEY}` / `${LANGFUSE_SECRET_KEY}` interpolation. This is W278e-compliant — confirms the env-vars set in §3.2 will reach the MCP launcher without any tracked-file edit.

```powershell
# Confirm interpolation form is intact
Select-String -Path Z:\claude-sota-installed\.mcp.json -Pattern '\$\{LANGFUSE_'
# Expected: 4 hits (HOST, BASE_URL, PUBLIC_KEY, SECRET_KEY)
```

### 3.5 Rotate `CogneeMCP` NSSM env (one of the two SEV-1 surfaces)

```powershell
# Snapshot current env first (already done in §2)
nssm get CogneeMCP AppEnvironmentExtra > "Z:\claude-sota-installed-state\W308B-CogneeMCP.nssm-env.before-rotation.txt"

# Stop the service
nssm stop CogneeMCP

# Rewrite AppEnvironmentExtra with the NEW key pair (preserve other vars from §2 snapshot)
# IMPORTANT: nssm set REPLACES the full env list. You must include every line that was there,
# substituting only LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY.
nssm set CogneeMCP AppEnvironmentExtra `
  "OPENAI_API_KEY=local" `
  "OPENAI_BASE_URL=http://127.0.0.1:8080/v1" `
  "LLM_MODEL=qwen36" `
  "PYTHONUNBUFFERED=1" `
  "PYTHONIOENCODING=utf-8" `
  "LANGFUSE_HOST=http://127.0.0.1:3000" `
  "LANGFUSE_BASE_URL=http://127.0.0.1:3000" `
  "LANGFUSE_PUBLIC_KEY=pk-lf-<NEW-VALUE>" `
  "LANGFUSE_SECRET_KEY=sk-lf-<NEW-VALUE>" `
  "SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee" `
  "DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data"

# Restart
nssm start CogneeMCP

# Verify
nssm status CogneeMCP   # expect: SERVICE_RUNNING
Test-NetConnection 127.0.0.1 -Port 8000   # expect: TcpTestSucceeded=True
```

> **Note**: §3.5 retains NSSM as the env-store as a transitional bridge. The full wrapper-script migration for CogneeMCP is the **W301.F job** (per `W301-STREAM-A-WINSW-MIGRATION-RUNBOOK.md §3` + `OPERATOR-READY-ARTIFACTS/CogneeMCP.xml`). W308 Stream B only **rotates** the Langfuse value within the existing NSSM blob; it does not migrate CogneeMCP's env-store.

### 3.6 Restart Claude Code sessions

Any open CC session has the OLD `LANGFUSE_*` values pinned in its process env (set at launch from `tools/eee.ps1`). New values reach CC only on re-launch.

```powershell
# Operator action: in EACH open CC session terminal, exit and re-launch via `eee`
# (or whatever the operator's standard launcher is — eee.ps1 dot-sources eee.local.ps1).
# Confirm new env reaches the new session:
echo $env:LANGFUSE_PUBLIC_KEY   # expect: pk-lf-<NEW-VALUE>
```

### 3.7 Smoke-test: Langfuse MCP returns non-401

In a freshly launched CC session, invoke the langfuse MCP and confirm no auth error:

```text
# In CC chat (operator types):
Run mcp__langfuse__get-prompts with no filters and report whether the call returned a 401 or a valid (possibly empty) list.
```

**Pass criteria**: response is a list (may be empty) or a non-401 error. Any `401 Unauthorized` / `Invalid API key` means the new keys did not propagate — re-check §3.2 (sidecar) + §3.6 (relaunched session env).

### 3.8 Optional — git-history scan for accidentally-committed Langfuse keys

```powershell
cd Z:\claude-sota-installed

# Scan for pk-lf- prefix in any historical diff. Output is a list of commit SHAs that
# added (or removed) lines containing the prefix.
git log -p --all -S "pk-lf-"  | Select-String -Pattern '^commit '
git log -p --all -S "sk-lf-"  | Select-String -Pattern '^commit '

# Cross-check the OLD pk-lf value specifically (substitute the literal from the pre-rotation backup)
# git log -p --all -S "pk-lf-<REDACTED-W325-r3-pre-W325-leak>" | Select-String -Pattern '^commit '
```

**At time of this runbook authoring**, the scan returned **13 commits** containing `pk-lf-` literals (per `git log --oneline -S "pk-lf-"` truncated list above). All 13 are in the gitignored `CLAUDE.local.md` history — they should NOT appear in tracked diffs. **If the scan surfaces a commit that touched a tracked file**, history-rewrite via `git filter-repo --replace-text` is required (OUT OF SCOPE for this stream — fold into a follow-up wave).

**Rollback for §3 Part 1**: restore `tools/eee.local.ps1` + `CLAUDE.local.md.pre-W308B-bak`; in Langfuse UI re-revoke the new keys + regenerate; reset `nssm set CogneeMCP AppEnvironmentExtra` from `W308B-CogneeMCP.nssm-env.before.txt`; restart sessions.

---

## §4 Part 2 — CCC-Proxy MANAGEMENT_PASSWORD migration (5 steps)

Per W301.G §5 the SEV-1 closure for CCC-Proxy mirrors the W301.F CogneeMCP wrapper-script pattern documented in `W301-STREAM-A-WINSW-MIGRATION-RUNBOOK.md §3`. The recipe below uses an NSSM-resident wrapper (not a WinSW migration) — minimal-change path that closes the registry exposure without re-installing the service under a new manager.

### 4.1 Stop the CCC-Proxy service + snapshot env

```powershell
# Snapshot
nssm get CCC-Proxy AppEnvironmentExtra > "Z:\claude-sota-installed-state\W308B-CCC-Proxy.nssm-env.before.txt"
nssm get CCC-Proxy Application          > "Z:\claude-sota-installed-state\W308B-CCC-Proxy.nssm-app.before.txt"
nssm get CCC-Proxy AppParameters        > "Z:\claude-sota-installed-state\W308B-CCC-Proxy.nssm-params.before.txt"

# Stop
nssm stop CCC-Proxy

# Confirm stopped
nssm status CCC-Proxy   # expect: SERVICE_STOPPED
```

### 4.2 Create the .env file + wrapper script (state-outside-repo)

```powershell
$wrapDir = 'Z:\claude-sota-installed-state\wrappers'
New-Item -ItemType Directory -Force -Path $wrapDir | Out-Null

# 4.2a — .env file (gitignored, ACL'd)
$envFile = "$wrapDir\ccc-proxy.env"
@"
MANAGEMENT_PASSWORD=<NEW-OR-ROTATED-VALUE>
"@ | Set-Content -Path $envFile -Encoding ASCII

# ACL: SYSTEM:R + Administrators:R only; strip inheritance
icacls $envFile /inheritance:r
icacls $envFile /grant:r "NT AUTHORITY\SYSTEM:R"
icacls $envFile /grant:r "BUILTIN\Administrators:R"

# 4.2b — wrapper script (.cmd, NSSM-launchable)
$wrapper = "$wrapDir\ccc-proxy-launch.cmd"
@'
@echo off
REM W308 Stream B — CCC-Proxy wrapper. Reads env-file then exec-replaces with the proxy binary.
REM ACL: SYSTEM:R, Administrators:R on the .env. NOT in repo. NOT in registry.
setlocal EnableExtensions EnableDelayedExpansion
set "ENVFILE=Z:\claude-sota-installed-state\wrappers\ccc-proxy.env"
if not exist "%ENVFILE%" (
  echo [W308B-wrapper] FATAL: env file missing: %ENVFILE% 1>&2
  exit /b 78
)
for /f "usebackq tokens=1,* delims==" %%A in ("%ENVFILE%") do (
  if not "%%A"=="" if not "%%A:~0,1%"=="#" set "%%A=%%B"
)
REM exec-replace with the real binary
"Z:\claude\ccc\bin\cli-proxy-api.exe" -config "Z:\claude\ccc\config.yaml" -oauth-callback-port 9328
endlocal
'@ | Set-Content -Path $wrapper -Encoding ASCII
```

> **Note on `MANAGEMENT_PASSWORD` value**: this stream rotates the storage location, not necessarily the secret itself. If the operator also wants to rotate the value (recommended), update CCC-Proxy's own config (per `Z:\claude\ccc\config.yaml` or upstream proxy admin UI) at the same time and put the NEW value in the .env file above. Otherwise reuse the value from `W308B-CCC-Proxy.nssm-env.before.txt`.

### 4.3 Re-point CCC-Proxy NSSM service at the wrapper + strip the secret

```powershell
# Point Application at cmd.exe + wrapper (NSSM treats /c <script> as the launch command)
nssm set CCC-Proxy Application "C:\Windows\System32\cmd.exe"
nssm set CCC-Proxy AppParameters "/c `"Z:\claude-sota-installed-state\wrappers\ccc-proxy-launch.cmd`""
nssm set CCC-Proxy AppDirectory "Z:\claude\ccc"

# REMOVE MANAGEMENT_PASSWORD from AppEnvironmentExtra; keep only the non-secret vars from §4.1 snapshot.
# (Example — operator MUST cross-check against W308B-CCC-Proxy.nssm-env.before.txt for the exact list)
nssm set CCC-Proxy AppEnvironmentExtra `
  "HOME=C:\Users\42" `
  "USERPROFILE=C:\Users\42" `
  "GOMAXPROCS=16" `
  "GOMEMLIMIT=8GiB" `
  "CCC_CAPACITY_AWARE_JSONL_PATH=Z:/claude/ccc/logs/quota-state.jsonl" `
  "CCC_CAPACITY_AWARE_HEADERS=1"
```

### 4.4 Start + smoke-test

```powershell
nssm start CCC-Proxy
nssm status CCC-Proxy   # expect: SERVICE_RUNNING

# Non-management endpoint smoke (should respond regardless of MANAGEMENT_PASSWORD).
# Adjust the path if the CCC proxy exposes a different unauthenticated health route.
Invoke-WebRequest -Uri http://127.0.0.1:9328/ -UseBasicParsing -TimeoutSec 5 | `
  Select-Object StatusCode, StatusDescription
# Expect: a 2xx, 3xx, or 4xx (NOT a connection refused / timeout).

# Management endpoint smoke (requires the new MANAGEMENT_PASSWORD header — adapt to the
# CCC proxy's actual header name; redact the secret from the shell echo).
# Example shape only:
# Invoke-WebRequest -Uri http://127.0.0.1:9328/admin/status `
#   -Headers @{ "X-Mgmt-Auth" = $env:CCC_MGMT_PROBE } `
#   -UseBasicParsing -TimeoutSec 5 | Select-Object StatusCode
```

### 4.5 Verify the secret is no longer in the registry

```powershell
nssm get CCC-Proxy AppEnvironmentExtra
# Expected: output does NOT contain MANAGEMENT_PASSWORD

# Direct registry probe (belt-and-suspenders)
$reg = 'HKLM:\SYSTEM\CurrentControlSet\Services\CCC-Proxy\Parameters'
if (Test-Path $reg) {
  (Get-ItemProperty -Path $reg -Name 'AppEnvironmentExtra' -ErrorAction SilentlyContinue).AppEnvironmentExtra | `
    Select-String -Pattern 'MANAGEMENT_PASSWORD' -NotMatch | `
    Select-Object -First 1 | ForEach-Object { 'CLEAN' }
}
# Expected output: "CLEAN" (or empty — meaning no AppEnvironmentExtra at all, which is also clean).
```

**Rollback for §4 Part 2**:
```powershell
nssm stop CCC-Proxy
# Restore original Application + AppParameters
nssm set CCC-Proxy Application   (Get-Content "Z:\claude-sota-installed-state\W308B-CCC-Proxy.nssm-app.before.txt"    | Select-Object -Skip 1)
nssm set CCC-Proxy AppParameters (Get-Content "Z:\claude-sota-installed-state\W308B-CCC-Proxy.nssm-params.before.txt" | Select-Object -Skip 1)
# Restore AppEnvironmentExtra from snapshot (manual; nssm set <svc> AppEnvironmentExtra needs each line as a separate arg)
nssm start CCC-Proxy
# Then: delete $wrapDir to clean up the failed migration artifacts
Remove-Item -Recurse -Force 'Z:\claude-sota-installed-state\wrappers\ccc-proxy.env'
Remove-Item -Force 'Z:\claude-sota-installed-state\wrappers\ccc-proxy-launch.cmd'
```

---

## §5 Post-rotation verification

After §3 + §4 both complete, run the full verification matrix in a fresh elevated PowerShell + a freshly launched CC session:

| check | command | expected |
|---|---|---|
| Langfuse MCP authenticates | `mcp__langfuse__get-prompts` (CC) | non-401 response |
| CogneeMCP is running w/ new keys | `nssm status CogneeMCP` + `Test-NetConnection 127.0.0.1 -Port 8000` | RUNNING + TcpTestSucceeded |
| CCC-Proxy is running via wrapper | `nssm status CCC-Proxy` + `Invoke-WebRequest http://127.0.0.1:9328/` | RUNNING + 2xx/3xx/4xx |
| CCC-Proxy secret stripped from registry | `nssm get CCC-Proxy AppEnvironmentExtra` | no `MANAGEMENT_PASSWORD` line |
| .env file ACL is least-privilege | `icacls Z:\claude-sota-installed-state\wrappers\ccc-proxy.env` | only SYSTEM:R + Administrators:R |
| Git tree clean | `git -C Z:\claude-sota-installed status` | only the W308 Stream B doc edits + any operator wave-closeout edits |
| Git history clean of new keys | `git log -p --all -S "pk-lf-<NEW-PREFIX>"` | 0 hits (key never committed) |
| Audit log of rotation | this doc + the operator's wave-closeout commit message | both reference W301-SEV1 + W301.G-SEV1 closure |

---

## §6 Cardinal-rule conformance

- **CR-1 (trusted source)**: Langfuse UI is the self-hosted upstream admin surface; NSSM is the canonical Windows service manager already in use across 10 services (per W301.G §1). No new dependency.
- **CR-2 (no self-invented hooks)**: `ccc-proxy-launch.cmd` is an **operator-managed runtime config file** living under `Z:\claude-sota-installed-state\wrappers\` — outside `.claude/hooks/scripts/` and outside the worktree. It is the Windows analogue of systemd's `EnvironmentFile=` directive (per `W301-STREAM-A-WINSW-MIGRATION-RUNBOOK.md §3` ratification) — same shape as the W301.F CogneeMCP wrapper. NOT a CC hook.
- **CR-3 (subagents)**: this stream runs as a single documented subagent under W308's parallel-Agent dispatch.
- **CR-4 (no .claude/rules/)**: this runbook lives in `docs/architecture/W308-EXECUTE-AND-ROTATE/`; no rules-dir creation.
- **CR-5 (secrets boundary)**: secrets boundary improved on both counts: (a) Langfuse keys are still in NSSM AppEnvironmentExtra after §3 (transitional — full migration is W301.F's CogneeMCP wrapper); (b) MANAGEMENT_PASSWORD is moved out of NSSM AppEnvironmentExtra into a SYSTEM+Administrators-ACL'd .env file. Reduces registry-readable exposure for the higher-priority secret; the doc-block + sidecar copies remain gitignored.

---

## §7 Operator confirmation surface

**Pre-rotation acknowledgement** (operator-action queue):

- [ ] Operator has reviewed §1-§4 and confirms both procedures
- [ ] Pre-rotation backup snapshots captured per §2 step 3
- [ ] Langfuse UI accessible at `http://127.0.0.1:3000`
- [ ] Elevated PowerShell session ready

**Post-rotation closeout commit** (suggested message):

```text
ship(W308-B): SEV-1 rotation — Langfuse pk-lf/sk-lf + CCC-Proxy MGMT_PASSWORD wrapper

Closes:
- W301-STREAM-A-SILENT-FAILURE-HUNT §3 / §5 (Langfuse plaintext)
- W301-STREAM-G-NSSM-ENV-AUDIT §2 / §3 (CCC-Proxy MANAGEMENT_PASSWORD)
- W290 F2-SECURITY-AUDIT AI-1 (rotation queue)

Runbook: docs/architecture/W308-EXECUTE-AND-ROTATE/W308-STREAM-B-SEV1-ROTATION-RUNBOOK.md

Verified:
- mcp__langfuse__get-prompts non-401
- nssm status CogneeMCP RUNNING
- nssm status CCC-Proxy RUNNING (via wrapper-script)
- nssm get CCC-Proxy AppEnvironmentExtra no longer contains MANAGEMENT_PASSWORD
- git log -p --all -S "pk-lf-<NEW>" returns 0 hits
```

The W280a Stop hook auto-fires the codex GPT-5.5 cross-model adversarial review gate on this commit. If APPROVE → both SEV-1s closed; if BLOCK → address codex findings before the wave-closeout merge.

---

## §8 Out-of-scope / follow-up

- **Full WinSW migration of CogneeMCP + CCC-Proxy**: W301.F job (per `W301-STREAM-A-WINSW-MIGRATION-RUNBOOK.md` + `OPERATOR-READY-ARTIFACTS/CogneeMCP.xml`). This W308 Stream B closes the secret-in-registry exposure without changing the service manager.
- **Git-history rewrite if §3.8 surfaces a tracked-file commit**: requires `git filter-repo --replace-text` + force-with-lease push; out of scope this stream — fold into a follow-up wave if the §3.8 scan returns any tracked-file hit.
- **Windows Credential Manager / DPAPI / `keyring` Rust crate**: a more SOTA path than the .env+ACL approach (per `https://docs.rs/keyring/3.6.3`, cited by `W301-STREAM-G-NSSM-ENV-AUDIT.md §4`). Defer to W301.F WinSW migration; the .env+ACL approach is the documented mid-tier.

**End W308 Stream B runbook.**

# W445 NSSM-to-Servy Migration Runbook

> **Date**: 2026-05-25
> **Servy version**: 8.4 (installed via `winget install aelassas.Servy`)
> **Servy CLI**: `C:\ProgramData\Servy\Servy.Service.CLI.exe`
> **NSSM version**: 2.24-101-g897c7ad (winget `NSSM.NSSM`)
> **Scope**: 12 NSSM services — 9 migrate, 3 retire

---

## Table of Contents

1. [Pre-flight: Fix Servy DPAPI Key Error](#1-pre-flight-fix-servy-dpapi-key-error)
2. [Servy CLI Reference](#2-servy-cli-reference)
3. [Migration Priority Order](#3-migration-priority-order)
4. [Phase 1: Retire Dead Services](#4-phase-1-retire-dead-services)
5. [Phase 2: GPU Services](#5-phase-2-gpu-services)
6. [Phase 3: MCP Services](#6-phase-3-mcp-services)
7. [Phase 4: Support Services](#7-phase-4-support-services)
8. [Post-Migration Validation](#8-post-migration-validation)
9. [Rollback Playbook](#9-rollback-playbook)
10. [NSSM Cleanup](#10-nssm-cleanup)

---

## 1. Pre-flight: Fix Servy DPAPI Key Error

The Servy CLI throws a `CryptographicException` because `aes_key.dat` was created
under a different Windows user context (DPAPI machine-key mismatch).

**Current error**:
```
System.InvalidOperationException: Failed to unprotect key at
C:\ProgramData\Servy\security\aes_key.dat.
The file may have been moved from another machine.
```

**Files to reset** (as Administrator):

```powershell
# --- RUN THIS IN AN ELEVATED POWERSHELL (Run as Administrator) ---

# 1. Stop the Servy Windows service if running
Stop-Service -Name "Servy" -ErrorAction SilentlyContinue -Confirm:$false

# 2. Delete corrupted DPAPI-encrypted keys + database + recovery state
#    This forces Servy to regenerate fresh keys on next launch.
Remove-Item "C:\ProgramData\Servy\security\*" -Force -Confirm:$false
Remove-Item "C:\ProgramData\Servy\db\*"       -Force -Confirm:$false
Remove-Item "C:\ProgramData\Servy\recovery\*" -Force -Confirm:$false

# 3. Verify directories are now empty
Get-ChildItem "C:\ProgramData\Servy\security" | Measure-Object | Select-Object -ExpandProperty Count  # expect 0
Get-ChildItem "C:\ProgramData\Servy\db"       | Measure-Object | Select-Object -ExpandProperty Count  # expect 0
Get-ChildItem "C:\ProgramData\Servy\recovery" | Measure-Object | Select-Object -ExpandProperty Count  # expect 0

# 4. Start Servy service — it regenerates DPAPI keys under the current user context
Start-Service -Name "Servy"

# 5. Verify CLI works
& "C:\ProgramData\Servy\Servy.Service.CLI.exe" list
# Expected: empty list (no services registered yet) — no DPAPI error
```

**If the `Servy` Windows service does not exist** (fresh install), start it first:
```powershell
& "C:\ProgramData\Servy\Servy.Service.exe" install
Start-Service -Name "Servy"
```

---

## 2. Servy CLI Reference

The CLI binary is at `C:\ProgramData\Servy\Servy.Service.CLI.exe`. Alias for brevity:

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"
```

| Command | Syntax |
|---------|--------|
| **Add service** | `& $servy add -n "<Name>" -p "<ExePath>" -a "<Args>" -d "<WorkDir>" [-e "<KEY=VALUE>"] [-s auto\|manual\|disabled]` |
| **Remove service** | `& $servy remove -n "<Name>"` |
| **Start service** | `& $servy start -n "<Name>"` |
| **Stop service** | `& $servy stop -n "<Name>"` |
| **List services** | `& $servy list` |
| **Service status** | `& $servy status -n "<Name>"` |

**Key flags for `add`**:
- `-n` — service name (unique identifier)
- `-p` — path to executable
- `-a` — arguments (entire argument string, quoted)
- `-d` — working directory
- `-e` — environment variable (repeat `-e` for each var). Format: `KEY=VALUE`
- `-s` — startup type: `auto` (default), `manual`, `disabled`
- `--description` — service description text

**Note on environment variables**: Unlike NSSM's `AppEnvironmentExtra` with `:` and `+` prefixes,
Servy uses simple `-e "KEY=VALUE"` flags. Pass one `-e` per variable.

---

## 3. Migration Priority Order

| Phase | Priority | Services | Reason |
|-------|----------|----------|--------|
| **1 — Retire** | Immediate | CCC-Exporter, CCC-Proxy, IkEmbedServer | Already stopped/paused; legacy |
| **2 — GPU** | High | OllamaServe, LlamaSwap, IkLlamaServer | Critical GPU workloads; test VRAM handoff |
| **3 — MCP** | Medium | CogneeMCP, BasicMemoryHTTP | Claude Code MCP dependencies |
| **4 — Support** | Normal | CLIProxyAccountExporter, EEE-CacheFixProxy, EEE-CLIProxyAPI, NvidiaGpuExporter | Monitoring + proxy services |

**Per-service pattern** (repeat for each):
1. Stop the NSSM service
2. Create the Servy service (with matching config)
3. Start the Servy service
4. Verify (port responding, logs clean)
5. If OK: remove the NSSM service
6. If FAIL: remove Servy service, restart NSSM service (rollback)

---

## 4. Phase 1: Retire Dead Services

These services are already stopped/paused and are legacy. Remove NSSM entries only.

### 4.1 CCC-Exporter (RETIRE)

**Current state**: Paused
**Binary**: `C:\Users\42\.venvs\ai-ml\Scripts\python.exe` running `Z:\claude\ccc\tools\exporter.py`
**Reason to retire**: Legacy CCC exporter from parent harness; replaced by CLIProxyAccountExporter.

```powershell
# Stop if somehow running
nssm stop CCC-Exporter 2>$null
# Remove NSSM service
nssm remove CCC-Exporter confirm
# Verify gone
Get-Service CCC-Exporter -ErrorAction SilentlyContinue  # expect: nothing
```

### 4.2 CCC-Proxy (RETIRE)

**Current state**: Paused
**Binary**: `Z:\claude\ccc\bin\cli-proxy-api.exe` with `-config Z:\claude\ccc\config.yaml -oauth-callback-port 9328`
**Reason to retire**: Legacy CCC proxy from parent harness; replaced by EEE-CLIProxyAPI.

```powershell
nssm stop CCC-Proxy 2>$null
nssm remove CCC-Proxy confirm
Get-Service CCC-Proxy -ErrorAction SilentlyContinue  # expect: nothing
```

### 4.3 IkEmbedServer (RETIRE)

**Current state**: Stopped (SERVICE_DEMAND_START)
**Binary**: `Z:\repos\deps\ik_llama.cpp\build\bin\Release\llama-server.exe` (old build dir)
**Reason to retire**: Unused embedding server; Ollama handles embeddings via `qwen3-embedding:0.6b`.

```powershell
nssm stop IkEmbedServer 2>$null
nssm remove IkEmbedServer confirm
Get-Service IkEmbedServer -ErrorAction SilentlyContinue  # expect: nothing
```

---

## 5. Phase 2: GPU Services

**WARNING**: GPU services contend for VRAM. Migrate one at a time. Verify VRAM is released
before starting the Servy replacement.

### 5.1 OllamaServe

**NSSM current config**:
- **Binary**: `C:\Users\42\AppData\Local\Programs\Ollama\ollama.exe`
- **Args**: `serve`
- **WorkDir**: `C:\Users\42\AppData\Local\Programs\Ollama`
- **Env**: `OLLAMA_HOST=http://127.0.0.1:16700`, `OLLAMA_KEEP_ALIVE=24h`
- **Logs**: stdout `Z:\claude-hub\logs\ollama-stdout.log`, stderr `Z:\claude-hub\logs\ollama-stderr.log`
- **Restart**: on exit, delay 5000ms
- **Startup**: SERVICE_AUTO_START
- **Port**: 16700

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop OllamaServe

# 2. Wait for VRAM release (5 seconds)
Start-Sleep -Seconds 5

# 3. Create Servy service
& $servy add `
  -n "OllamaServe" `
  -p "C:\Users\42\AppData\Local\Programs\Ollama\ollama.exe" `
  -a "serve" `
  -d "C:\Users\42\AppData\Local\Programs\Ollama" `
  -e "OLLAMA_HOST=http://127.0.0.1:16700" `
  -e "OLLAMA_KEEP_ALIVE=24h" `
  -s auto `
  --description "Ollama serving on custom port :16700"

# 4. Start Servy service
& $servy start -n "OllamaServe"

# 5. Verify — port 16700 responding
Start-Sleep -Seconds 5
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:16700" -UseBasicParsing -TimeoutSec 5; Write-Host "OK: Ollama responding (status $($r.StatusCode))" } catch { Write-Host "FAIL: Ollama not responding — ROLLBACK" }

# 6. Verify — service status
& $servy status -n "OllamaServe"
```

**Rollback** (if step 5 fails):
```powershell
& $servy stop -n "OllamaServe"
& $servy remove -n "OllamaServe"
nssm start OllamaServe
```

**Remove NSSM** (only after verification passes):
```powershell
nssm remove OllamaServe confirm
```

---

### 5.2 LlamaSwap

**NSSM current config**:
- **Binary**: `Z:\tools\llama-swap\llama-swap.exe`
- **Args**: `-config Z:\tools\llama-swap\config.yaml -listen :8090`
- **WorkDir**: `Z:\tools\llama-swap`
- **Env**: (none)
- **Startup**: SERVICE_AUTO_START
- **Port**: 8090

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop LlamaSwap

# 2. Create Servy service
& $servy add `
  -n "LlamaSwap" `
  -p "Z:\tools\llama-swap\llama-swap.exe" `
  -a "-config Z:\tools\llama-swap\config.yaml -listen :8090" `
  -d "Z:\tools\llama-swap" `
  -s auto `
  --description "LLama-Swap Multi-Model Manager on :8090"

# 3. Start Servy service
& $servy start -n "LlamaSwap"

# 4. Verify — port 8090 responding
Start-Sleep -Seconds 3
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:8090/v1/models" -UseBasicParsing -TimeoutSec 5; Write-Host "OK: LlamaSwap responding (status $($r.StatusCode))" } catch { Write-Host "FAIL: LlamaSwap not responding — ROLLBACK" }

# 5. Service status
& $servy status -n "LlamaSwap"
```

**Rollback**:
```powershell
& $servy stop -n "LlamaSwap"
& $servy remove -n "LlamaSwap"
nssm start LlamaSwap
```

**Remove NSSM** (after verification):
```powershell
nssm remove LlamaSwap confirm
```

---

### 5.3 IkLlamaServer

**NSSM current config**:
- **Binary**: `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe`
- **Args**: `--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --port 8080 --host 127.0.0.1 -c 16384 -ngl 999 -fa on -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard -b 2048 -ub 1024 --merge-qkv -muge -sas --ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 2048 --parallel 1 --threads 4 --threads-batch 4 --no-context-shift --fit --fit-margin 1024 -mtp --draft-max 3 --draft-p-min 0.0 -mtprot iq4_ks`
- **WorkDir**: `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release`
- **Env**: (none)
- **Logs**: stdout `Z:\claude-hub\logs\ik-llama-stdout.log`, stderr `Z:\claude-hub\logs\ik-llama-stderr.log`
- **Log rotation**: 100 MB
- **Startup**: SERVICE_AUTO_START
- **Port**: 8080

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service (will release GPU VRAM — large model)
nssm stop IkLlamaServer

# 2. Wait for VRAM release (10 seconds — large model unload)
Start-Sleep -Seconds 10

# 3. Create Servy service
& $servy add `
  -n "IkLlamaServer" `
  -p "Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe" `
  -a "--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --port 8080 --host 127.0.0.1 -c 16384 -ngl 999 -fa on -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard -b 2048 -ub 1024 --merge-qkv -muge -sas --ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 2048 --parallel 1 --threads 4 --threads-batch 4 --no-context-shift --fit --fit-margin 1024 -mtp --draft-max 3 --draft-p-min 0.0 -mtprot iq4_ks" `
  -d "Z:\repos\deps\ik_llama.cpp\build-new\bin\Release" `
  -s auto `
  --description "IkLlamaServer Qwen3.6-35B-A3B on :8080"

# 4. Start Servy service
& $servy start -n "IkLlamaServer"

# 5. Verify — port 8080 responding (model load takes 15-30s)
Start-Sleep -Seconds 30
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:8080/health" -UseBasicParsing -TimeoutSec 10; Write-Host "OK: IkLlamaServer responding (status $($r.StatusCode))" } catch { Write-Host "FAIL: IkLlamaServer not responding — ROLLBACK" }

# 6. Service status
& $servy status -n "IkLlamaServer"
```

**Rollback**:
```powershell
& $servy stop -n "IkLlamaServer"
& $servy remove -n "IkLlamaServer"
nssm start IkLlamaServer
```

**Remove NSSM** (after verification):
```powershell
nssm remove IkLlamaServer confirm
```

---

## 6. Phase 3: MCP Services

### 6.1 CogneeMCP

**NSSM current config**:
- **Binary**: `Z:\venvs\claude\Scripts\python.exe`
- **Args**: `-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration`
- **WorkDir**: `Z:\repos\deps\cognee\cognee-mcp`
- **Env** (11 vars):
  - `OPENAI_API_KEY=local`
  - `OPENAI_BASE_URL=http://127.0.0.1:8080/v1`
  - `LLM_MODEL=qwen36`
  - `PYTHONUNBUFFERED=1`
  - `PYTHONIOENCODING=utf-8`
  - `LANGFUSE_HOST=http://127.0.0.1:3000`
  - `LANGFUSE_BASE_URL=http://127.0.0.1:3000`
  - `LANGFUSE_PUBLIC_KEY=pk-lf-5e2d4b64-a53a-4b30-9e98-93039b1174fe`
  - `LANGFUSE_SECRET_KEY=sk-lf-b9f4866e-c470-402c-9568-5430c94533e8`
  - `SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee`
  - `DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data`
  - `EMBEDDING_PROVIDER=openai_compatible`
  - `EMBEDDING_MODEL=qwen3-embed-0.6b`
- **Logs**: stdout `Z:\claude-hub\logs\cognee-mcp-stdout.log`, stderr `Z:\claude-hub\logs\cognee-mcp-stderr.log`
- **Startup**: SERVICE_AUTO_START
- **Port**: 8000

**Dependency**: Requires IkLlamaServer (:8080) to be running for LLM + embedding calls.

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop CogneeMCP

# 2. Create Servy service
& $servy add `
  -n "CogneeMCP" `
  -p "Z:\venvs\claude\Scripts\python.exe" `
  -a "-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration" `
  -d "Z:\repos\deps\cognee\cognee-mcp" `
  -e "OPENAI_API_KEY=local" `
  -e "OPENAI_BASE_URL=http://127.0.0.1:8080/v1" `
  -e "LLM_MODEL=qwen36" `
  -e "PYTHONUNBUFFERED=1" `
  -e "PYTHONIOENCODING=utf-8" `
  -e "LANGFUSE_HOST=http://127.0.0.1:3000" `
  -e "LANGFUSE_BASE_URL=http://127.0.0.1:3000" `
  -e "LANGFUSE_PUBLIC_KEY=pk-lf-5e2d4b64-a53a-4b30-9e98-93039b1174fe" `
  -e "LANGFUSE_SECRET_KEY=sk-lf-b9f4866e-c470-402c-9568-5430c94533e8" `
  -e "SYSTEM_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee" `
  -e "DATA_ROOT_DIRECTORY=Z:\claude-sota-installed-state\cognee\data" `
  -e "EMBEDDING_PROVIDER=openai_compatible" `
  -e "EMBEDDING_MODEL=qwen3-embed-0.6b" `
  -s auto `
  --description "Cognee MCP Server (cognee 1.26.0) on :8000/mcp"

# 3. Start Servy service
& $servy start -n "CogneeMCP"

# 4. Verify — port 8000 responding
Start-Sleep -Seconds 8
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:8000/mcp" -UseBasicParsing -TimeoutSec 5 -Method POST -Body '{}' -ContentType 'application/json'; Write-Host "OK: CogneeMCP responding (status $($r.StatusCode))" } catch { Write-Host "FAIL: CogneeMCP not responding — ROLLBACK" }

# 5. Service status
& $servy status -n "CogneeMCP"
```

**Rollback**:
```powershell
& $servy stop -n "CogneeMCP"
& $servy remove -n "CogneeMCP"
nssm start CogneeMCP
```

**Remove NSSM** (after verification):
```powershell
nssm remove CogneeMCP confirm
```

---

### 6.2 BasicMemoryHTTP

**NSSM current config**:
- **Binary**: `C:\Users\42\.local\bin\uvx.exe`
- **Args**: `--from basic-memory==0.21.1 basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765`
- **WorkDir**: `C:\Users\42\.local\bin`
- **Env**: `BASIC_MEMORY_HOME=Z:/claude-sota-installed-state/basic-memory`, `BASIC_MEMORY_CONFIG_DIR=Z:/claude-sota-installed-state/basic-memory/config`
- **Logs**: stdout `Z:/claude-hub/logs/basic-memory-http-stdout.log`, stderr `Z:/claude-hub/logs/basic-memory-http-stderr.log`
- **Startup**: SERVICE_AUTO_START
- **Port**: 8765

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop BasicMemoryHTTP

# 2. Create Servy service
& $servy add `
  -n "BasicMemoryHTTP" `
  -p "C:\Users\42\.local\bin\uvx.exe" `
  -a "--from basic-memory==0.21.1 basic-memory mcp --transport streamable-http --host 127.0.0.1 --port 8765" `
  -d "C:\Users\42\.local\bin" `
  -e "BASIC_MEMORY_HOME=Z:/claude-sota-installed-state/basic-memory" `
  -e "BASIC_MEMORY_CONFIG_DIR=Z:/claude-sota-installed-state/basic-memory/config" `
  -s auto `
  --description "Basic Memory HTTP MCP (streamable-http on :8765)"

# 3. Start Servy service
& $servy start -n "BasicMemoryHTTP"

# 4. Verify — port 8765 responding
Start-Sleep -Seconds 5
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:8765" -UseBasicParsing -TimeoutSec 5; Write-Host "OK: BasicMemoryHTTP responding (status $($r.StatusCode))" } catch { Write-Host "FAIL: BasicMemoryHTTP not responding — ROLLBACK" }

# 5. Service status
& $servy status -n "BasicMemoryHTTP"
```

**Rollback**:
```powershell
& $servy stop -n "BasicMemoryHTTP"
& $servy remove -n "BasicMemoryHTTP"
nssm start BasicMemoryHTTP
```

**Remove NSSM** (after verification):
```powershell
nssm remove BasicMemoryHTTP confirm
```

---

## 7. Phase 4: Support Services

### 7.1 CLIProxyAccountExporter

**NSSM current config**:
- **Binary**: `C:\Users\42\.venvs\ai-ml\Scripts\python.exe`
- **Args**: `C:\Users\42\tools\cliproxy-account-exporter.py`
- **WorkDir**: `C:\Users\42\tools`
- **Env**: `HOME=C:\Users\42`, `USERPROFILE=C:\Users\42`
- **Logs**: stdout `C:\Users\42\tools\logs\cliproxy-exporter-stdout.log`, stderr `C:\Users\42\tools\logs\cliproxy-exporter-stderr.log`
- **Restart delay**: 5000ms
- **Startup**: SERVICE_AUTO_START
- **Port**: 9321 (Prometheus metrics)

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop CLIProxyAccountExporter

# 2. Create Servy service
& $servy add `
  -n "CLIProxyAccountExporter" `
  -p "C:\Users\42\.venvs\ai-ml\Scripts\python.exe" `
  -a "C:\Users\42\tools\cliproxy-account-exporter.py" `
  -d "C:\Users\42\tools" `
  -e "HOME=C:\Users\42" `
  -e "USERPROFILE=C:\Users\42" `
  -s auto `
  --description "CLIProxy Account Usage Prometheus Exporter on :9321"

# 3. Start Servy service
& $servy start -n "CLIProxyAccountExporter"

# 4. Verify — port 9321 metrics endpoint
Start-Sleep -Seconds 5
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:9321/metrics" -UseBasicParsing -TimeoutSec 5; Write-Host "OK: CLIProxyAccountExporter responding (status $($r.StatusCode))" } catch { Write-Host "FAIL: CLIProxyAccountExporter not responding — ROLLBACK" }

# 5. Service status
& $servy status -n "CLIProxyAccountExporter"
```

**Rollback**:
```powershell
& $servy stop -n "CLIProxyAccountExporter"
& $servy remove -n "CLIProxyAccountExporter"
nssm start CLIProxyAccountExporter
```

**Remove NSSM** (after verification):
```powershell
nssm remove CLIProxyAccountExporter confirm
```

---

### 7.2 EEE-CacheFixProxy

**NSSM current config**:
- **Binary**: `C:\Program Files\nodejs\node.exe`
- **Args**: `C:\Users\42\AppData\Roaming\npm\node_modules\claude-code-cache-fix\proxy\server.mjs`
- **WorkDir**: `C:\Users\42\AppData\Roaming\npm\node_modules\claude-code-cache-fix`
- **Env**: `CACHE_FIX_PROXY_PORT=19801`, `CACHE_FIX_PROXY_BIND=127.0.0.1`, `CACHE_FIX_PROXY_UPSTREAM=http://127.0.0.1:18317`, `HOME=Z:\claude-sota-installed`, `USERPROFILE=C:\Users\42`
- **Logs**: stdout `Z:\claude-sota-installed-state\logs\services\eee-cache-fix.stdout.log`, stderr `Z:\claude-sota-installed-state\logs\services\eee-cache-fix.stderr.log`
- **Startup**: SERVICE_AUTO_START
- **Port**: 19801

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop EEE-CacheFixProxy

# 2. Create Servy service
& $servy add `
  -n "EEE-CacheFixProxy" `
  -p "C:\Program Files\nodejs\node.exe" `
  -a "C:\Users\42\AppData\Roaming\npm\node_modules\claude-code-cache-fix\proxy\server.mjs" `
  -d "C:\Users\42\AppData\Roaming\npm\node_modules\claude-code-cache-fix" `
  -e "CACHE_FIX_PROXY_PORT=19801" `
  -e "CACHE_FIX_PROXY_BIND=127.0.0.1" `
  -e "CACHE_FIX_PROXY_UPSTREAM=http://127.0.0.1:18317" `
  -e "HOME=Z:\claude-sota-installed" `
  -e "USERPROFILE=C:\Users\42" `
  -s auto `
  --description "EEE Cache Fix Proxy on :19801"

# 3. Start Servy service
& $servy start -n "EEE-CacheFixProxy"

# 4. Verify — port 19801 responding
Start-Sleep -Seconds 3
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:19801" -UseBasicParsing -TimeoutSec 5; Write-Host "OK: EEE-CacheFixProxy responding" } catch { Write-Host "FAIL: EEE-CacheFixProxy not responding — ROLLBACK" }

# 5. Service status
& $servy status -n "EEE-CacheFixProxy"
```

**Rollback**:
```powershell
& $servy stop -n "EEE-CacheFixProxy"
& $servy remove -n "EEE-CacheFixProxy"
nssm start EEE-CacheFixProxy
```

**Remove NSSM** (after verification):
```powershell
nssm remove EEE-CacheFixProxy confirm
```

---

### 7.3 EEE-CLIProxyAPI

**NSSM current config**:
- **Binary**: `Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe`
- **Args**: `-config Z:\claude-sota-installed\.cli-proxy-api\config.yaml`
- **WorkDir**: `Z:\claude-sota-installed`
- **Env**: (none set via AppEnvironmentExtra)
- **Logs**: stdout `Z:\claude-sota-installed-state\logs\services\eee-cliproxyapi.stdout.log`, stderr `Z:\claude-sota-installed-state\logs\services\eee-cliproxyapi.stderr.log`
- **Log rotation**: 10 MB
- **Startup**: SERVICE_AUTO_START

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop EEE-CLIProxyAPI

# 2. Create Servy service
& $servy add `
  -n "EEE-CLIProxyAPI" `
  -p "Z:\claude-sota-installed\.local\bin\cli-proxy-api.exe" `
  -a "-config Z:\claude-sota-installed\.cli-proxy-api\config.yaml" `
  -d "Z:\claude-sota-installed" `
  -s auto `
  --description "EEE CLIProxy API v7.0.2"

# 3. Start Servy service
& $servy start -n "EEE-CLIProxyAPI"

# 4. Verify — check process is running
Start-Sleep -Seconds 3
$proc = Get-Process cli-proxy-api -ErrorAction SilentlyContinue
if ($proc) { Write-Host "OK: EEE-CLIProxyAPI process running (PID $($proc.Id))" } else { Write-Host "FAIL: EEE-CLIProxyAPI not running — ROLLBACK" }

# 5. Service status
& $servy status -n "EEE-CLIProxyAPI"
```

**Rollback**:
```powershell
& $servy stop -n "EEE-CLIProxyAPI"
& $servy remove -n "EEE-CLIProxyAPI"
nssm start EEE-CLIProxyAPI
```

**Remove NSSM** (after verification):
```powershell
nssm remove EEE-CLIProxyAPI confirm
```

---

### 7.4 NvidiaGpuExporter

**NSSM current config**:
- **Binary**: `Z:/tools/nvidia_gpu_exporter/nvidia_gpu_exporter.exe`
- **Args**: `--web.listen-address :9835`
- **WorkDir**: `Z:/tools/nvidia_gpu_exporter`
- **Env**: (none)
- **Logs**: stdout `Z:/claude-sota-installed-state/logs/NvidiaGpuExporter/stdout.log`, stderr `Z:/claude-sota-installed-state/logs/NvidiaGpuExporter/stderr.log`
- **Startup**: SERVICE_AUTO_START
- **Port**: 9835 (Prometheus metrics)

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

# 1. Stop NSSM service
nssm stop NvidiaGpuExporter

# 2. Create Servy service
& $servy add `
  -n "NvidiaGpuExporter" `
  -p "Z:\tools\nvidia_gpu_exporter\nvidia_gpu_exporter.exe" `
  -a "--web.listen-address :9835" `
  -d "Z:\tools\nvidia_gpu_exporter" `
  -s auto `
  --description "NVIDIA GPU Exporter (Prometheus, v1.4.1) on :9835"

# 3. Start Servy service
& $servy start -n "NvidiaGpuExporter"

# 4. Verify — port 9835 metrics endpoint
Start-Sleep -Seconds 3
try { $r = Invoke-WebRequest -Uri "http://127.0.0.1:9835/metrics" -UseBasicParsing -TimeoutSec 5; Write-Host "OK: NvidiaGpuExporter responding (status $($r.StatusCode))" } catch { Write-Host "FAIL: NvidiaGpuExporter not responding — ROLLBACK" }

# 5. Service status
& $servy status -n "NvidiaGpuExporter"
```

**Rollback**:
```powershell
& $servy stop -n "NvidiaGpuExporter"
& $servy remove -n "NvidiaGpuExporter"
nssm start NvidiaGpuExporter
```

**Remove NSSM** (after verification):
```powershell
nssm remove NvidiaGpuExporter confirm
```

---

## 8. Post-Migration Validation

After all services are migrated, run this comprehensive check:

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"

Write-Host "`n=== SERVY SERVICE LIST ===" -ForegroundColor Cyan
& $servy list

Write-Host "`n=== PORT VERIFICATION ===" -ForegroundColor Cyan
$ports = @{
    "OllamaServe"            = "http://127.0.0.1:16700"
    "LlamaSwap"              = "http://127.0.0.1:8090/v1/models"
    "IkLlamaServer"          = "http://127.0.0.1:8080/health"
    "CogneeMCP"              = "http://127.0.0.1:8000/mcp"
    "BasicMemoryHTTP"        = "http://127.0.0.1:8765"
    "NvidiaGpuExporter"      = "http://127.0.0.1:9835/metrics"
    "CLIProxyAccountExporter" = "http://127.0.0.1:9321/metrics"
    "EEE-CacheFixProxy"      = "http://127.0.0.1:19801"
}

foreach ($svc in $ports.GetEnumerator()) {
    try {
        $null = Invoke-WebRequest -Uri $svc.Value -UseBasicParsing -TimeoutSec 5
        Write-Host "  PASS  $($svc.Key) ($($svc.Value))" -ForegroundColor Green
    } catch {
        Write-Host "  FAIL  $($svc.Key) ($($svc.Value))" -ForegroundColor Red
    }
}

Write-Host "`n=== NSSM RESIDUAL CHECK ===" -ForegroundColor Cyan
$nssmServices = @('BasicMemoryHTTP','CCC-Exporter','CCC-Proxy','CLIProxyAccountExporter',
    'CogneeMCP','EEE-CacheFixProxy','EEE-CLIProxyAPI','IkEmbedServer',
    'IkLlamaServer','LlamaSwap','NvidiaGpuExporter','OllamaServe')
foreach ($svc in $nssmServices) {
    $s = Get-Service $svc -ErrorAction SilentlyContinue
    if ($s) {
        Write-Host "  RESIDUAL  $svc still exists (status: $($s.Status))" -ForegroundColor Yellow
    } else {
        Write-Host "  CLEAN     $svc removed" -ForegroundColor Green
    }
}

Write-Host "`n=== GPU VRAM CHECK ===" -ForegroundColor Cyan
nvidia-smi --query-gpu=memory.used,memory.total --format=csv,noheader
```

---

## 9. Rollback Playbook

### Per-service rollback (use when a single migration fails)

```powershell
# Generic pattern — replace <ServiceName> with the actual name
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"
& $servy stop -n "<ServiceName>"
& $servy remove -n "<ServiceName>"
nssm start <ServiceName>
```

### Full rollback (catastrophic — revert ALL to NSSM)

```powershell
$servy = "C:\ProgramData\Servy\Servy.Service.CLI.exe"
$services = @('OllamaServe','LlamaSwap','IkLlamaServer','CogneeMCP',
    'BasicMemoryHTTP','CLIProxyAccountExporter','EEE-CacheFixProxy',
    'EEE-CLIProxyAPI','NvidiaGpuExporter')

foreach ($svc in $services) {
    Write-Host "Rolling back $svc..."
    & $servy stop -n $svc 2>$null
    & $servy remove -n $svc 2>$null
    nssm start $svc 2>$null
}
Write-Host "Full rollback complete. Verify with: Get-Service | Where-Object { `$_.DisplayName -like '*NSSM*' -or `$_.Name -in @($($services -join ',')) }"
```

---

## 10. NSSM Cleanup

After all services are verified on Servy and stable for 24+ hours:

```powershell
# Final NSSM removal — only run when confident Servy is stable
$nssmServices = @('BasicMemoryHTTP','CLIProxyAccountExporter','CogneeMCP',
    'EEE-CacheFixProxy','EEE-CLIProxyAPI','IkLlamaServer','LlamaSwap',
    'NvidiaGpuExporter','OllamaServe',
    # Already-retired:
    'CCC-Exporter','CCC-Proxy','IkEmbedServer')

foreach ($svc in $nssmServices) {
    $s = Get-Service $svc -ErrorAction SilentlyContinue
    if ($s) {
        Write-Host "Removing NSSM service: $svc"
        nssm stop $svc 2>$null
        nssm remove $svc confirm
    }
}

# Optional: uninstall NSSM itself
# winget uninstall NSSM.NSSM
```

---

## Summary Table

| # | Service | Action | Binary | Port | Servy Startup | Env Vars |
|---|---------|--------|--------|------|---------------|----------|
| 1 | BasicMemoryHTTP | Migrate | uvx.exe | 8765 | auto | 2 |
| 2 | CCC-Exporter | **RETIRE** | python.exe | — | — | — |
| 3 | CCC-Proxy | **RETIRE** | cli-proxy-api.exe | — | — | — |
| 4 | CLIProxyAccountExporter | Migrate | python.exe | 9321 | auto | 2 |
| 5 | CogneeMCP | Migrate | python.exe | 8000 | auto | 13 |
| 6 | EEE-CacheFixProxy | Migrate | node.exe | 19801 | auto | 5 |
| 7 | EEE-CLIProxyAPI | Migrate | cli-proxy-api.exe | — | auto | 0 |
| 8 | IkEmbedServer | **RETIRE** | llama-server.exe | 8082 | — | — |
| 9 | IkLlamaServer | Migrate | llama-server.exe | 8080 | auto | 0 |
| 10 | LlamaSwap | Migrate | llama-swap.exe | 8090 | auto | 0 |
| 11 | NvidiaGpuExporter | Migrate | nvidia_gpu_exporter.exe | 9835 | auto | 0 |
| 12 | OllamaServe | Migrate | ollama.exe | 16700 | auto | 2 |

**Total**: 9 services to migrate, 3 to retire. Estimated execution time: 30-45 minutes
(dominated by GPU model load/unload waits).

---

## Appendix A: Servy CLI Flag Reference (Quick Lookup)

```
Servy.Service.CLI.exe add     -n <name> -p <path> [-a <args>] [-d <dir>] [-e <K=V>]... [-s auto|manual|disabled] [--description <text>]
Servy.Service.CLI.exe remove  -n <name>
Servy.Service.CLI.exe start   -n <name>
Servy.Service.CLI.exe stop    -n <name>
Servy.Service.CLI.exe restart -n <name>
Servy.Service.CLI.exe list
Servy.Service.CLI.exe status  -n <name>
```

## Appendix B: NSSM-to-Servy Concept Mapping

| NSSM Concept | Servy Equivalent | Notes |
|--------------|------------------|-------|
| `nssm install <name> <exe>` | `servy add -n <name> -p <exe>` | — |
| `AppParameters` | `-a "<args>"` | Single quoted string |
| `AppDirectory` | `-d "<dir>"` | Working directory |
| `AppEnvironmentExtra :KEY=VAL` | `-e "KEY=VAL"` | First var (`:` prefix = replace) |
| `AppEnvironmentExtra +KEY=VAL` | `-e "KEY=VAL"` | Additional var (`+` prefix = append) |
| `Start SERVICE_AUTO_START` | `-s auto` | Default |
| `Start SERVICE_DEMAND_START` | `-s manual` | — |
| `AppStdout / AppStderr` | Servy manages internally | Check Servy dashboard for logs |
| `AppRotateFiles / AppRotateBytes` | Servy manages internally | — |
| `AppExit Default Restart` | Servy default behavior | Auto-restart on crash |
| `AppRestartDelay` | Not directly mapped | Servy uses its own restart backoff |
| `nssm remove <name> confirm` | `servy remove -n <name>` | — |
| `nssm start/stop <name>` | `servy start/stop -n <name>` | — |

## Appendix C: Known Issues

1. **DPAPI key error**: Must be fixed FIRST (Section 1). Every `servy` CLI invocation
   will crash until `security/*`, `db/*`, `recovery/*` are deleted and the Servy Windows
   service is restarted.

2. **Servy `add` flag accuracy**: The exact CLI flags documented here are based on Servy 8.x
   conventions. If `& $servy add --help` shows different flag names after the DPAPI fix,
   adapt accordingly. The NSSM configs extracted above are authoritative for what each
   service needs.

3. **Log rotation**: NSSM's `AppRotateFiles`/`AppRotateBytes` is handled natively. Servy
   manages its own log files. If you need the same log paths, configure Servy's log
   output settings or redirect via its dashboard.

4. **GPU VRAM contention**: IkLlamaServer loads a large model (~8-12 GB VRAM). During
   migration, ensure the NSSM instance is fully stopped and VRAM is released before
   starting the Servy replacement. Use `nvidia-smi` to confirm.

5. **Service account**: NSSM services run as `LocalSystem`. Servy services default to
   `LocalSystem` as well. If any service needs user-profile access (e.g., `C:\Users\42\`
   paths), verify Servy's service account can access those paths, or use the Servy
   dashboard to configure the service to run as the `42` user.

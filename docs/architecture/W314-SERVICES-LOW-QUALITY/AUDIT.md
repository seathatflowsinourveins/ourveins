# W314 Runtime Audit — Services Health + NSSM Migration + Code Quality

**Date**: 2026-05-19 | **Wave**: W314 | **Operator directive**: "monitor the system, as we are running local models", "low quality code in your runtime now vs sota official and ccbp", "nssm not sota"

---

## DELIVERABLE 1 — Service Health Probe

### 1.1 Win32_Service State Table

| Service | State | StartMode | Manager | Notes |
|---|---|---|---|---|
| CogneeMCP | **Running** | Auto | NSSM | Port 8000 LISTENING |
| IkLlamaServer | **Running** | Auto | NSSM | Port 8080 LISTENING |
| LlamaSwap | **Running** | Auto | NSSM | Port 8090 LISTENING (undocumented in CLAUDE.md) |
| OllamaServe | **Stopped** | Auto | NSSM | Port 16700 NOT listening — intentional per W312-A.6 |
| FalkorDB | NOT FOUND | — | — | Service removed; port 16379 not listening (retired W295) |
| Langfuse | NOT FOUND | — | — | No Windows service; runs as Node process on :3000 |
| HindsightEmbed | NOT FOUND | — | — | Runs as standalone Python daemon (not a registered service) |

> **NSSM path** (all three Running services): `C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe`

### 1.2 Port Listening Status

| Port | Service | Listening | HTTP Probe Result |
|---|---|---|---|
| :3000 | Langfuse | YES | (not probed — assumed healthy per W313) |
| :8000 | CogneeMCP | YES | GET /mcp → 400 (expected); POST /mcp with MCP init → **200 OK, SSE event, Cognee v1.26.0** — HEALTHY |
| :8080 | LlamaSwap / IkLlama | YES | GET /health → **200 OK** — HEALTHY |
| :8090 | LlamaSwap models API | YES | GET /v1/models → **200 OK**, models listed — HEALTHY |
| :8765 | basic-memory | YES | GET /mcp → 400 (expected for SSE-MCP — W313 Stream E confirmed) |
| :9077 | Hindsight daemon | YES | GET /health → **200 OK** — HEALTHY; GET / → 404 (correct, no root route) |
| :16379 | FalkorDB | NO | Retired W295 — correct |
| :16700 | OllamaServe | NO | Service Stopped — **intentional** per W312-A.6 follow-up; graphiti retired |

### 1.3 Per-Service Detail

#### CogneeMCP — HEALTHY
- **Application**: `Z:\venvs\claude\Scripts\python.exe`
- **AppParameters**: `-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration`
- **AppDirectory**: `Z:\repos\deps\cognee\cognee-mcp`
- **Logs**: `Z:\claude-hub\logs\cognee-mcp-{stdout,stderr}.log`
- **MCP protocol**: POST /mcp with `{"jsonrpc":"2.0","method":"initialize"}` returns `{"serverInfo":{"name":"Cognee","version":"1.26.0"}}` — SSE-MCP healthy.
- **OPEN OPERATOR-AI (W312-A.7)**: cognee LLM_API_KEY and actual data-dir path not yet confirmed on-disk. The `C:/Users/42/.cognee` dir from W286 migration has not been executed (`migrate-cognee-state.ps1 -Execute` was never run per operator mandate). Data may still be at `C:\Users\42\.cognee`.

#### IkLlamaServer — HEALTHY (W310-tail RCA confirmed stable)
- **Application**: `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe`
- **AppParameters**: `--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --port 8080 --host 127.0.0.1 -c 16384 -ngl 999 -fa on -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard -b 2048 -ub 1024 --merge-qkv -muge -sas --ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 2048 --parallel 1 --threads 4 --threads-batch 4 --no-context-shift --fit --fit-margin 1024 -mtp --draft-max 3 --draft-p-min 0.0 -mtprot iq4_ks`
- **AppDirectory**: `Z:\repos\deps\ik_llama.cpp\build-new\bin\Release`
- GET /health → 200 OK. CUDA crash-loop (W310) resolved; service stable.

#### LlamaSwap — HEALTHY (undocumented in CLAUDE.md)
- **Application**: `Z:\tools\llama-swap\llama-swap.exe`
- **AppParameters**: `-config Z:\tools\llama-swap\config.yaml -listen :8090`
- **AppDirectory**: `Z:\tools\llama-swap`
- No stdout/stderr log paths configured in NSSM (gap — logs lost on crash).
- GET /v1/models → 200 OK. Model `_disabled_qwen36-moe` and `gemma4-26b` listed.
- **FINDING**: LlamaSwap is NOT documented in CLAUDE.md service list or `docs/sota-installed-manifest.md`. It is a live NSSM-managed service operating as a model-swap proxy in front of IkLlamaServer (:8080) and other backends. CLAUDE.md's claim "IkLlamaServer port :8080" is actually LlamaSwap acting as the frontend on :8080; the raw llama-server is likely on a different internal port. This needs CLAUDE.md documentation update.

#### OllamaServe — STOPPED (intentional)
- **Application**: `C:\Users\42\AppData\Local\Programs\Ollama\ollama.exe`
- **AppParameters**: `serve`
- **StartMode**: Auto (will restart on next boot — may be unexpected if intentionally stopped)
- **FINDING**: StartMode=Auto with State=Stopped means next reboot will restart OllamaServe and bind :16700. If graphiti is retired permanently, StartMode should be set to Manual or Disabled to avoid surprise restart. No operator confirmation recorded.

#### Hindsight :9077 — HEALTHY
- GET /health → 200 OK. Runs as standalone Python daemon (not a Win32 service). W280b bootstrap confirmed healthy.

#### basic-memory :8765 — HEALTHY (SSE-MCP protocol)
- GET /mcp → 400 is correct behavior for SSE-MCP GET probe (protocol requires POST for initialization). W313 Stream E finding confirmed valid.

#### Langfuse :3000 — ASSUMED HEALTHY
- Port listening confirmed. No deeper probe performed. W313 confirmed healthy.

---

## DELIVERABLE 2 — NSSM → servy P0 Migration Plan

### 2.1 servy sca-v6.1 Audit

**Repository**: `aelassas/servy` | **License**: MIT | **Stars**: 1,729 | **Language**: C# | **Latest release**: v8.4 (2026-05-11) | **Open issues**: 81

#### Dimension Scores (sca-v6.1, D1–D24)

| Dim | Name | Score | Anchor / Evidence |
|---|---|---|---|
| D1 | task_fit_cc_workflow | 4 | Explicit NSSM/WinSW replacement; CLI + PowerShell module for scripted service management; health checks + restart policies align with runtime daemon needs |
| D2 | docs_quality | 4 | Full wiki, YouTube demo, installation guide, examples-and-recipes page, API docs |
| D3 | latency_overhead | 4 | Native C# Windows service wrapper; no interpreter startup; sub-second `servy-cli start`; no cold-start penalty unlike `npx` |
| D4 | cc_pathway_exists | 4 | `winget install servy` (1 command); Chocolatey + Scoop alternatives; portable .7z for isolated installs; PowerShell module enables scripted migration |
| D5 | independent_evidence | 3 | 1,729 stars; topics: `nssm,service-manager,service-wrapper,winsw` confirm community niche positioning; no independent benchmark vs NSSM published; wiki is self-authored |
| D6 | maintenance_cadence | 5 | v8.4 released 2026-05-11 (8 days ago); active CI/CD badges (build + test + security + release all green per README); updated 2026-05-18 |
| D7 | install_complexity | 4 | Single `winget install servy` + PATH; no MSYS2/Python/Node dependency; SBOM provided (`servy-8.4-sbom.xml`) |
| D8 | license_compliance | 5 | MIT — no usage restriction; digitally signed via SignPath Foundation |
| D9 | test_coverage | 4 | `test.yml` CI badge present; `codecov` badge present; coverage link functional |
| D10 | operator_model_fit | 4 | Windows-native, single-operator, local-first — matches runtime profile exactly |
| D11 | peer_adoption_signal | 3 | 1,729 stars; community positioning confirmed via topics; no large-org public adoption case study found |
| D12 | bus_factor_diversity | 3 | Solo maintainer (aelassas); active release cadence partially mitigates; no org-level governance |
| D13 | integration_surface | 4 | `servy-cli install` maps 1:1 to NSSM `nssm install`; AppParameters, AppDirectory, stdout/stderr logs, env vars, health checks all supported; PowerShell module enables CI/CD integration |
| D14 | pin_compliance_cr9 | 4 | `winget install servy` → winget resolves specific version; portable `.7z` allows exact-version pinning; no floating `@latest` in the install surface |
| D15 | security_posture | 4 | Digitally signed; `security.yml` CI badge; SBOM shipped with release; no known CVEs |
| D16 | bus_factor_governance | 2 | Solo maintainer; no org transfer, no co-maintainer, no succession plan documented. Hard-cap: T1+T2 cap at D16<2 — score is 2, passes cap at boundary |
| D17 | robustness_under_perturbation | 4 | Crash restart + hang detection + watchdog documented; health checks with configurable retry; real-time monitoring via Manager app |
| D18 | runtime_safety_privacy | 5 | Windows service sandboxing (SCM-managed); no network egress required post-install; no telemetry documented; signed binaries |
| D19 | silent_fallback_density | 4 | Service start failures surface in Windows Event Log + Servy Console; no silent-ignore pattern observed in README/wiki |
| D20 | pin_freshness_lag_norm | 4 | v8.4 released 8 days ago; `winget` package manifest updated same day per winget badge |
| D21 | operator_curated_fit | 5 | Explicitly positioned as NSSM + WinSW + FireDaemon Pro replacement; Windows 11 native; topics confirm targeting |
| D22 | reproducibility | 4 | Portable .7z + SBOM enables reproducible deploys; pinned version = deterministic |
| D23 | observability_integration | 4 | Real-time CPU/RAM graphs; stdout/stderr preview in Servy Console; service dependency tree; Windows Event Log integration |
| D24 | mcp_attack_surface | 5 | Not an MCP server; is a service manager tool — attack surface is the Windows SCM boundary only; no MCP protocol exposure |

**Composite install_score**: (4+4+4+4+3+5+4+5+4+4+3+3+4+4+4+2+4+5+4+4+5+4+4+5) / 24 = **95/24 = 3.96**

> **Hard-cap check**: D8 (license) = 5 PASS; D18 (safety) = 5 PASS; D16 (bus_factor_governance) = 2 — AT boundary, passes T2 cap (cap is D16<2 = REJECT; score 2 = not-less-than-2); D14 (pin) = 4 PASS.
>
> **Tier verdict**: **T2 VENDOR-FORK** — score 3.96 (below T1 install threshold of ~4.3 due to solo maintainer D12=3 and D16=2 boundary). Operator should download the portable .7z, pin the exact version, and vendor it into `Z:\tools\servy\` rather than relying on `winget install` for production use. This matches the runtime's W286-cross CR-9 version-pin discipline.

### 2.2 Install Command

```powershell
# T2 vendor-fork pattern: download portable, pin version, store at Z:\tools\servy\
$version = "8.4"
$url = "https://github.com/aelassas/servy/releases/download/v$version/servy-$version-x64-portable.7z"
# Download, extract to Z:\tools\servy\, add to PATH
# Then verify:
servy-cli --version  # should report 8.4
```

### 2.3 Per-Service Migration: servy-cli Syntax

Each migration replaces `nssm install <Name>` with `servy-cli install`. The NSSM `AppParameters` maps directly to `--params`. `AppDirectory` maps to `--startupDir`. NSSM stdout/stderr log paths map to `--stdout` / `--stderr`.

#### CogneeMCP

```powershell
# Stop and unregister NSSM service first (see §2.5 rollback before executing)
nssm stop CogneeMCP
nssm remove CogneeMCP confirm

# Register with servy-cli
servy-cli install `
  --name="CogneeMCP" `
  --path="Z:\venvs\claude\Scripts\python.exe" `
  --startupDir="Z:\repos\deps\cognee\cognee-mcp" `
  --params="-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration" `
  --stdout="Z:\claude-hub\logs\cognee-mcp-stdout.log" `
  --stderr="Z:\claude-hub\logs\cognee-mcp-stderr.log" `
  --startupType="Automatic"

servy-cli start --name="CogneeMCP"
# Verify: Invoke-WebRequest http://127.0.0.1:8000/mcp -Method POST (expect 200 with SSE)
```

#### IkLlamaServer

```powershell
nssm stop IkLlamaServer
nssm remove IkLlamaServer confirm

servy-cli install `
  --name="IkLlamaServer" `
  --path="Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe" `
  --startupDir="Z:\repos\deps\ik_llama.cpp\build-new\bin\Release" `
  --params="--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --port 8080 --host 127.0.0.1 -c 16384 -ngl 999 -fa on -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard -b 2048 -ub 1024 --merge-qkv -muge -sas --ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 2048 --parallel 1 --threads 4 --threads-batch 4 --no-context-shift --fit --fit-margin 1024 -mtp --draft-max 3 --draft-p-min 0.0 -mtprot iq4_ks" `
  --stdout="Z:\claude-hub\logs\ik-llama-stdout.log" `
  --stderr="Z:\claude-hub\logs\ik-llama-stderr.log" `
  --startupType="Automatic"

servy-cli start --name="IkLlamaServer"
# Verify: Invoke-WebRequest http://127.0.0.1:8080/health (expect 200)
```

#### LlamaSwap

```powershell
nssm stop LlamaSwap
nssm remove LlamaSwap confirm

servy-cli install `
  --name="LlamaSwap" `
  --path="Z:\tools\llama-swap\llama-swap.exe" `
  --startupDir="Z:\tools\llama-swap" `
  --params="-config Z:\tools\llama-swap\config.yaml -listen :8090" `
  --stdout="Z:\claude-hub\logs\llama-swap-stdout.log" `
  --stderr="Z:\claude-hub\logs\llama-swap-stderr.log" `
  --startupType="Automatic"

servy-cli start --name="LlamaSwap"
# Verify: Invoke-WebRequest http://127.0.0.1:8090/v1/models (expect 200)
```

#### OllamaServe

```powershell
# OllamaServe is currently Stopped + graphiti retired.
# Recommended: set to Disabled instead of migrating to servy.
# If keeping, migrate as:
nssm stop OllamaServe
nssm remove OllamaServe confirm

servy-cli install `
  --name="OllamaServe" `
  --path="C:\Users\42\AppData\Local\Programs\Ollama\ollama.exe" `
  --startupDir="C:\Users\42\AppData\Local\Programs\Ollama" `
  --params="serve" `
  --stdout="Z:\claude-hub\logs\ollama-stdout.log" `
  --stderr="Z:\claude-hub\logs\ollama-stderr.log" `
  --startupType="Manual"
# Note: downgrade from Automatic to Manual — OllamaServe should not auto-start on boot
# since graphiti is retired. Operator decision required.
```

### 2.4 Migration Order with Risk Scores

| Order | Service | Risk | Downtime Estimate | Rationale |
|---|---|---|---|---|
| 1 | LlamaSwap | LOW | ~30s | No MCP dependency; simple binary; no persistent state; quick verify via /v1/models |
| 2 | CogneeMCP | MEDIUM | ~60s | Python process; verify SSE-MCP POST probe after restart; cognee state dir concern (migrate-cognee-state.ps1 not yet executed) |
| 3 | IkLlamaServer | HIGH | ~3-5 min | CUDA model load time ~3 min for 35B GGUF; W310 crash-loop history means careful verify before considering done; must confirm CUDA stable before proceeding |
| 4 | OllamaServe | DEFERRED | 0 (already stopped) | Currently stopped; migrate to Manual startupType instead; no urgency |

### 2.5 Rollback Procedure (Per Service)

If `servy-cli start` fails or the health probe does not return expected response:

```powershell
# 1. Stop and remove the failed servy registration
servy-cli stop --name="<ServiceName>"
servy-cli uninstall --name="<ServiceName>"

# 2. Re-register via NSSM (restore from known-good NSSM config captured above)
# Example for CogneeMCP:
nssm install CogneeMCP "Z:\venvs\claude\Scripts\python.exe"
nssm set CogneeMCP AppParameters "-u src\server.py --transport http --host 127.0.0.1 --port 8000 --path /mcp --no-migration"
nssm set CogneeMCP AppDirectory "Z:\repos\deps\cognee\cognee-mcp"
nssm set CogneeMCP AppStdout "Z:\claude-hub\logs\cognee-mcp-stdout.log"
nssm set CogneeMCP AppStderr "Z:\claude-hub\logs\cognee-mcp-stderr.log"
nssm start CogneeMCP
```

> All NSSM AppParameters are captured in §1.3 above and serve as the rollback reference. Do NOT remove the NSSM service until the servy service passes its health probe.

### 2.6 Pre-Migration Gate (Operator Actions Required Before Any Migration)

1. **Vendor servy v8.4 portable** into `Z:\tools\servy\` (CR-9 pin discipline).
2. **Execute `migrate-cognee-state.ps1 -Execute`** before migrating CogneeMCP — the cognee data-dir may still be at `C:\Users\42\.cognee` (operator-AI W312-A.7 open item). CogneeMCP migration to servy will fail cleanly if this is wrong, but cognee state will be lost on the old path.
3. **Confirm OllamaServe intent** — set StartMode to Manual/Disabled in NSSM now (or after servy migration) to prevent surprise boot-restart.
4. **Document LlamaSwap** in CLAUDE.md — it is undocumented as a live NSSM service and its relationship to IkLlamaServer (port routing) needs to be described.

---

## DELIVERABLE 3 — Low-Quality Code Audit

Scope: all operator-authored files outside `.claude/plugins/cache/`, `.codex/`, `tmp/`, `node_modules/`. Files inspected: `tools/bootstrap-runtime.ps1`, `tools/eee.ps1`, `tools/migrate-cognee-state.ps1`, `harness/eval_harness.py`, `.claude/hooks/context-mode-cache-heal.mjs`.

### Finding #1 — HARDCODED USER PATH in migrate-cognee-state.ps1 (HIGH)

**File**: `tools/migrate-cognee-state.ps1:51`
```powershell
$SourceDir = 'C:\Users\42\.cognee'
```
The username `42` is hardcoded. On any other machine or user account this path is silently wrong. The NSSM fallback path on line 79 is also hardcoded to `C:\Users\42\AppData\Local\...`.

**Paste-ready fix**:
```powershell
$SourceDir = Join-Path $env:USERPROFILE '.cognee'
# NSSM fallback:
$wingetNssm = Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe'
```

### Finding #2 — BROAD `except Exception` with comment explaining it away (MEDIUM-HIGH)

**File**: `harness/eval_harness.py:239`
```python
except Exception as exc:  # noqa: BLE001 - import/availability failure must not crash cadence
```
And again at line 278:
```python
except Exception as exc:  # noqa: BLE001 - eval failure -> a single FAIL row, never crash
```
While the intent (degrade gracefully to a FAIL row) is documented, `BLE001` suppression hides import errors, `ImportError`, `ModuleNotFoundError`, `AttributeError`, and `RuntimeError` from the same broad catch. A missing `inspect_tasks.py` file, a wrong `HARNESS_DIR` path, or an API auth error all become identical `"lane unavailable: ..."` messages with no distinction. This makes debugging hard in nightly cadence.

**Paste-ready fix**: Narrow the first catch to `(ImportError, ModuleNotFoundError)` and let `AttributeError`/runtime errors surface. The second catch at line 278 around `inspect_eval()` is more justifiable but should at least log `exc.__class__.__name__`.

### Finding #3 — HARDCODED MODEL NAME in eval_harness.py (MEDIUM)

**File**: `harness/eval_harness.py:71`
```python
_DEFAULT_INSPECT_MODEL = "anthropic/" + os.environ.get(
    "ANTHROPIC_SMALL_FAST_MODEL", "claude-haiku-4-5-20251001"
)
```
`claude-haiku-4-5-20251001` is a hardcoded retired-model fallback. As of 2026, the current model IDs have advanced. When `ANTHROPIC_SMALL_FAST_MODEL` is not set (common in CI), the harness silently targets a model that may no longer exist or be routed incorrectly by the local proxy.

**Paste-ready fix**: Remove the hardcoded default; require `ANTHROPIC_SMALL_FAST_MODEL` to be set explicitly, or set a clearly documented sentinel:
```python
_DEFAULT_INSPECT_MODEL = "anthropic/" + os.environ.get("ANTHROPIC_SMALL_FAST_MODEL") or _FAIL_LOUD_MISSING_MODEL
```

### Finding #4 — HARDCODED CLAUDE_BIN PATH (MEDIUM)

**File**: `harness/eval_harness.py:63`
```python
CLAUDE_BIN = os.environ.get("CLAUDE_BIN", r"Z:/claude/.local/bin/claude.exe")
```
The default path points at `Z:/claude/` (the parent CCC harness, not this runtime). If `CLAUDE_BIN` is not set in the environment and this harness is invoked directly, it silently targets the wrong runtime's claude binary.

**Paste-ready fix**:
```python
CLAUDE_BIN = os.environ.get("CLAUDE_BIN") or str(REPO_ROOT.parent / ".local/bin/claude.exe")
# Or: raise EnvironmentError if not set, to force explicit configuration
```

### Finding #5 — eee.ps1 EEE_FLEET_* ENV VARS SET WITH NO CONSUMER (MEDIUM)

**File**: `tools/eee.ps1` (lines ~104-110)
```powershell
$env:EEE_FLEET_MIN_READY_CLAUDE = '3'
$env:EEE_FLEET_MAX_PARALLEL_CLAUDE_AGENTS = '5'
$env:EEE_FLEET_RESERVE_ORCHESTRATOR = '1'
$env:EEE_FLEET_CACHE_WARM_BARRIER = '1'
$env:EEE_FLEET_CIRCUIT_BREAKER_SECONDS = '60'
$env:EEE_FLEET_529_BACKOFF = '30'
```
These `EEE_FLEET_*` variables are not documented in any Anthropic TIER-1 source and are not present in `https://code.claude.com/docs/en/env-vars`. They appear to have been imported from the sibling `sss.ps1` launcher (cited in the header as reference) without verifying that CC actually consumes them. They are dead env var noise that pollutes the process environment and could confuse future debugging.

**Paste-ready fix**: Remove or comment out all `EEE_FLEET_*` blocks with a note: "These were never confirmed as Anthropic-canonical env vars; retained for CLAUDE.local.md audit but not exported." The `ENABLE_PROMPT_CACHING_1H` and `CLAUDE_ENABLE_STREAM_WATCHDOG` vars should be verified against current `claude-settings.md` HEAD before the same treatment.

### Finding #6 — context-mode-cache-heal.mjs: MINIFIED + NO ERROR SURFACE FOR CRITICAL FAILURES (MEDIUM)

**File**: `.claude/hooks/context-mode-cache-heal.mjs`

The entire script is a single minified line after the shebang. The top-level `catch` does `process.exit(0)` on any error, meaning a completely broken symlink repair silently succeeds from the hook runner's perspective. Additionally, `symlinkSync` on Windows with `"junction"` mode can fail if the target is on a different volume — this specific runtime runs on `Z:` drive, making volume-crossing symlinks a real failure mode that is silently swallowed.

**Paste-ready fix**:
```javascript
// Replace the top-level catch final line:
} catch(e) {
  process.stderr.write(`[cache-heal] top-level: ${e.message}\n`);
  // Do NOT exit(0) — let hook runner see stderr. Exit(0) only if the hook
  // is meant to be non-blocking; exit(1) if failure should be surfaced.
  process.exit(0); // Keep exit(0) ONLY if CR-2 hook semantics require non-blocking
}
```
The script also needs deobfuscation for maintainability — any future CR-2 audit cannot review a minified 28-char line.

### Finding #7 — migrate-cognee-state.ps1: NSSM ENV SET USES UNDOCUMENTED SYNTAX (MEDIUM)

**File**: `tools/migrate-cognee-state.ps1:14` (header comment)
```
5. nssm set CogneeMCP AppEnvironmentExtra +SYSTEM_ROOT_DIRECTORY +DATA_ROOT_DIRECTORY
```
The `+VARNAME` syntax for `AppEnvironmentExtra` is NSSM-specific and not validated in the script itself — the script description references it but the actual implementation step would use `nssm set CogneeMCP AppEnvironmentExtra "SYSTEM_ROOT_DIRECTORY=<val>\nDATA_ROOT_DIRECTORY=<val>"`. If this script is ever executed the env-set step may silently no-op or produce wrong output. The script should validate the env vars are actually set on the service after writing them.

### Finding #8 — bootstrap-runtime.ps1: VERSION-SORT BUG FOR >4-SEGMENT SEMVER (LOW-MEDIUM)

**File**: `tools/bootstrap-runtime.ps1` (Get-LatestPluginVersion function)
```powershell
($parts[0] * 1000000000) + (($parts[1] * 1000000) + (($parts[2] * 1000) + ($parts[3])))
```
The sort assumes exactly 4 version segments packed into a single integer. For versions with pre-release suffixes (e.g. `1.0.4-rc.1`), `[int]::TryParse` returns 0 for `rc` and `1`, producing incorrect ordering. Plugin versions with pre-release tags would sort to position 0 (lowest), causing the wrong plugin version to be selected.

**Paste-ready fix**: Use `[System.Version]::TryParse` for standard semver, falling back to lexicographic for non-standard:
```powershell
$sorted = $versions | Sort-Object {
    $v = [System.Version]::new(0,0,0)
    if ([System.Version]::TryParse(($_.Name -replace '-.*$',''), [ref]$v)) { $v }
    else { [System.Version]::new(0,0,0) }
} -Descending
```

### Finding #9 — eee.ps1: HARDCODED GIT BASH PATH WITHOUT EXISTENCE CHECK (LOW)

**File**: `tools/eee.ps1`
```powershell
$env:CLAUDE_CODE_GIT_BASH_PATH = 'C:\Program Files\Git\bin\bash.exe'
```
Set unconditionally with no `Test-Path` guard. If Git for Windows is not installed at the canonical location (e.g. installed to `D:\Program Files\Git` on non-C systems), CC silently falls back to cmd.exe or fails bash-dependent operations. The path is also a CCBP-mandated constant per `claude-settings.md` ("must stay on C:") but that rationale is not stated in the code.

**Paste-ready fix**:
```powershell
$gitBash = 'C:\Program Files\Git\bin\bash.exe'
if (-not (Test-Path $gitBash)) {
    Write-Warning "[eee] Git bash not found at $gitBash — bash-dependent CC features will degrade"
}
$env:CLAUDE_CODE_GIT_BASH_PATH = $gitBash
```

### Finding #10 — eval_harness.py: PROMPTFOO SUBPROCESS ERROR NOT CAPTURED IN ROW REASON (LOW)

**File**: `harness/eval_harness.py` (`_resolve_promptfoo_cmd`)
```python
except (subprocess.SubprocessError, OSError):
    pass
```
When `npm root -g` fails (e.g. Node.js not on PATH in the harness invocation context), the exception is silently swallowed and `_resolve_promptfoo_cmd` returns `None`. The caller then returns a FAIL row with `"promptfoo not found"` but the underlying error (why npm failed) is lost. This impairs nightly cadence debugging.

**Paste-ready fix**: Log the exception to stderr before passing:
```python
except (subprocess.SubprocessError, OSError) as _npm_err:
    import sys
    print(f"[eval_harness] npm root -g failed: {_npm_err}", file=sys.stderr)
    pass
```

### Summary Table

| # | File | Severity | Category |
|---|---|---|---|
| 1 | migrate-cognee-state.ps1 | HIGH | Hardcoded user path |
| 2 | eval_harness.py | MEDIUM-HIGH | Broad except / silent error swallow |
| 3 | eval_harness.py | MEDIUM | Hardcoded retired model name |
| 4 | eval_harness.py | MEDIUM | Hardcoded wrong CLAUDE_BIN default |
| 5 | eee.ps1 | MEDIUM | Dead/unverified EEE_FLEET_* env vars |
| 6 | context-mode-cache-heal.mjs | MEDIUM | Minified + silent exit(0) on critical failure |
| 7 | migrate-cognee-state.ps1 | MEDIUM | Unvalidated NSSM AppEnvironmentExtra syntax |
| 8 | bootstrap-runtime.ps1 | LOW-MEDIUM | Version-sort bug for pre-release semver tags |
| 9 | eee.ps1 | LOW | Git bash path set without existence check |
| 10 | eval_harness.py | LOW | Promptfoo npm error silently discarded |

---

## Operator-AI Items Generated (W314)

| ID | Priority | Item |
|---|---|---|
| W314-AI-1 | P0 | Vendor servy v8.4 portable to `Z:\tools\servy\` before any NSSM migration |
| W314-AI-2 | P0 | Execute `migrate-cognee-state.ps1 -Execute` (W312-A.7 open) BEFORE migrating CogneeMCP |
| W314-AI-3 | P1 | Set OllamaServe StartMode from Auto to Manual/Disabled (currently stopped but will restart on next boot) |
| W314-AI-4 | P1 | Document LlamaSwap in CLAUDE.md — undiscovered live NSSM service, undocumented in manifest |
| W314-AI-5 | P1 | Fix Finding #1: migrate-cognee-state.ps1 hardcoded `C:\Users\42` paths |
| W314-AI-6 | P2 | Fix Findings #3 and #4: eval_harness.py hardcoded model name and wrong CLAUDE_BIN default |
| W314-AI-7 | P2 | Audit and remove EEE_FLEET_* env vars from eee.ps1 if not confirmed Anthropic-canonical |
| W314-AI-8 | P2 | Migrate LlamaSwap → servy first (lowest risk, validates servy install before higher-risk services) |
| W314-AI-9 | P3 | Deobfuscate context-mode-cache-heal.mjs for CR-2 auditability |
| W314-AI-10 | P3 | Fix bootstrap-runtime.ps1 version-sort for pre-release plugin versions |

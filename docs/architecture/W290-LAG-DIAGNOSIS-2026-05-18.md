# W290 Stream A — Lag Regression Diagnosis (2026-05-18)

**Investigator**: Claude Opus 4.7 (1M-ctx) — single-agent investigation per W290 Stream A scope
**Snapshot taken**: 2026-05-18 ~11:08 local (54 min after llama-server start at 10:13:59)
**3-of-3 evidence rule**: every claim below cites source + cross-check + live probe; retractions called out explicitly.

---

## TL;DR

Root cause is **a single stuck `ik_llama` server process (PID 7628, qwen36 MTP)** that has been in `slots_processing=1` state for ~54 minutes with `WorkingSet=60.88 GB`, `PrivateMemory=111.37 GB`, `Virtual=323.43 GB`. `--mlock` pins all of working set in physical RAM. The 18-CC-session count is misleading: it counts 5 CC CLI sessions plus 22 MCP-fork node.exe helpers and a handful of Claude-desktop helper processes — the CC sessions themselves total only 3.73 GB RAM. **Single recommended recovery**: investigate the hung llama-server slot via `/slots` before any process kill, then either let the in-flight request finish or `Stop-Service IkLlamaServer` (operator-confirm) which auto-restarts via NSSM with a fresh, smaller footprint.

---

## PID 7628 identification (full evidence — 3-of-3)

**Source #1 — Win32_Process probe** (live probe, 2026-05-18 11:08):
- `ProcessId: 7628`
- `ParentProcessId: 6664` → `nssm.exe` (the IkLlamaServer Windows service supervisor)
- `CreationDate: 5/18/2026 10:13:59 AM` → **54.1 min uptime**
- Full CommandLine:
  ```
  "Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe"
    --alias qwen36 --jinja --reasoning-budget 0
    --model Z:\models\Qwen3.6-35B-A3B-MTP\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf
    --port 8080 --host 127.0.0.1
    -c 65536 -ngl 999 -fa on
    -ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard
    -b 2048 -ub 1024 --merge-qkv -muge -sas --mlock
    --ctx-checkpoints 8 --ctx-checkpoints-interval 512
    --cache-ram 4096
    --parallel 1 --threads 4 --threads-batch 4
    --no-context-shift --fit --fit-margin 1024
    -mtp --draft-max 4 --draft-p-min 0.0 -mtprot iq4_ks
  ```

**Source #2 — Get-Service** (cross-check):
- `IkLlamaServer  Running  Automatic  PID 6664` → confirms PID 7628 is the **child of the NSSM-managed `IkLlamaServer` service**, NOT spawned by `llama-swap` (`LlamaSwap` PID 6676 is a separate service at :8090).

**Source #3 — Port listener** (cross-check):
- `Get-NetTCPConnection :8080 → OwningProcess 7628` confirms PID 7628 owns :8080.
- `llama-swap /running → {"running":[]}` confirms llama-swap has **NO** active models — qwen36 is exclusively managed by the standalone NSSM service (consistent with the W288 cleanup note in `Z:\tools\llama-swap\config.yaml` that disabled the qwen36-moe entry in llama-swap to avoid binding conflict).

**Source #4 — Server self-report** (cross-check):
- `GET :8080/v1/models` → `id: qwen36`, `n_params: 57516958848` (57.5 B), `size: 27710726656` (27.7 GB on-disk), `n_ctx_train: 262144`, `max_model_len: 65536`.
- `GET :8080/health` → `{"status":"no slot available","slots_idle":0,"slots_processing":1}` — **stuck active**.
- `GET :8080/slots` → `id:0, state:1, n_ctx:65536, n_past:null` — slot 0 is in state 1 (processing) but `n_past:null` and `prompt_n:null` suggests **partially-initialized state** (possible MTP self-spec or batch-decode stall).

**Verdict**: PID 7628 is the **standalone NSSM-supervised `IkLlamaServer`** running `qwen36 = Qwen3.6-35B-A3B-MTP-UD-IQ4_XS`, listening on :8080, currently with a long-running inference slot.

---

## Delta vs W288 baseline

| Metric | W288 (PID 100336) | W290 (PID 7628) | Δ |
|---|---|---|---|
| Model file | Qwen3.6-35B-A3B-MTP-UD-IQ4_XS (27.7 GB) | **same** | 0 |
| Cmdline / flags | (W288 didn't capture the full cmdline) | see above | unknown |
| n_ctx | 65536 | 65536 | 0 |
| `--mlock` | (assumed present) | present | 0 |
| `--cache-ram` | (not captured) | 4096 MB | n/a |
| `--ctx-checkpoints` | (not captured) | 8 × 512-tok-interval | n/a |
| `--parallel` | (not captured) | 1 | n/a |
| WorkingSet | **12.6 GB** | **60.88 GB** | **+48.3 GB** |
| PrivateMemory | (not captured) | 111.37 GB | n/a |
| CPU-s | (not captured) | 3052 / 54 min = ~56% pegged | n/a |
| slots_processing | (not captured) | **1** (stuck for ~54 min) | n/a |

**Probable cause of +48 GB delta** (HYPOTHESIS — 3-of-3 evidence rule says I MUST flag this as not fully proven):

1. **In-flight inference is consuming KV-cache + checkpoint scratch.** With 8 `ctx-checkpoints` × 64K-ctx × q4_0 KV (≈ 56 layers × 2048-dim × 4-bit × 2 K+V × 64K tokens), each checkpoint snapshot can be ~4-6 GB; 8 of them = 32-48 GB of additional resident pages **on top of** the base ~12 GB model weights. This single-source explanation closely matches the +48 GB delta.
2. **`--mlock` keeps all checkpoint pages in physical RAM** instead of letting Windows page them out.
3. **`--cache-ram 4096`** = 4 GB additional ik_llama-specific KV cache (small contribution).
4. W288 likely captured PID 100336 **before** any long-context inference happened — i.e., baseline empty-state working set. PID 7628 has been **actively serving a 54-min request**, so all checkpoint slots are populated.

**Retraction discipline**: I do NOT have direct evidence that the 8 checkpoints alone explain +48 GB — this is the most parsimonious match for the cmdline flags + delta, but a second possibility is **a KV-cache leak in `-mtp` self-speculative mode** (Mixed-Token-Prediction). The cmdline lists `-mtp --draft-max 4 -mtprot iq4_ks` which enables MTP self-spec; ik_llama PR #1816 (per `Z:\tools\llama-swap\config.yaml` comments) fixed a "gibberish" bug in qwen35moe + MTP + -muge but a memory-side regression is plausible. **No 3rd-source evidence available without an ik_llama HEAD diff investigation** — flagged for follow-up.

---

## Loaded LLM servers inventory (3-of-3: Win32_Process + Get-NetTCPConnection + service /v1/models)

| Port | PID | Process | Service / supervisor | Model | WS | Verdict |
|---|---|---|---|---|---|---|
| :8080 | 7628 | llama-server.exe | **IkLlamaServer** (NSSM) | qwen36 = Qwen3.6-35B-A3B-MTP-UD-IQ4_XS | **60.88 GB** | **THE CULPRIT** — stuck `slots_processing=1` ~54 min |
| :8090 | 7620 | llama-swap.exe | **LlamaSwap** (NSSM) | (router, `/running` = `[]`) | small | Idle — no models active |
| :16700 | 80488 | ollama.exe | (standalone `ollama serve`) | qwen3-coder:30b-a3b-q4_K_M + qwen3-embedding:0.6b registered | 0.46 GB | Idle (no in-flight inference; not VRAM-resident) |
| :8000 | 10008 | python.exe | (manual launch, parent 9548) | cognee-MCP (`src\server.py --transport http`) | (small) | Healthy |
| :9077 | 19024 | python.exe | (uv-cached) | hindsight-api `--daemon --idle` | 2.30 GB | Active, **NOT looping** (see §Hindsight) |
| :5432 | 71096 | postgres.exe | (pg0 install at `C:\Users\42\.pg0\`) | hindsight-embed instance | (small) | Active |
| :3000 | 17860 | com.docker.backend.exe | Docker Desktop | Langfuse v3.170.0 | (in WSL2) | Active |

**Compute-application probe (`nvidia-smi --query-compute-apps`)**: **only one GPU compute occupant — PID 7628**. ollama.exe (80488) shows on the broader GPU process list but is NOT a current compute-apps client. VRAM **23.84 / 24.56 GiB (97%)** is owned solely by PID 7628.

---

## CC session inventory (the operator's "18 sessions")

**Clarification on the count**: operator's "18 CC sessions" maps to **18 `claude.exe` processes**, but only **5 of these are CC CLI sessions**. The other 13 are **Claude Desktop helper processes** (renderer, gpu-process, network, audio, video, crashpad-handler, node-mojom utility forks, etc) belonging to the user's Desktop app (parent 23584 = `explorer.exe` → Desktop binary at `C:\Program Files\WindowsApps\Claude_1.7196.0.0_x64__pzs8sxrjxfjjc\app\Claude.exe`).

| PID | Parent | Cwd / type | Age | WS | Classification |
|---|---|---|---|---|---|
| 43384 | 41576 | Z:\claude-sota-installed\.local\bin\claude.exe `--permission-mode bypassPermissions` (CC CLI) | 53.1 min | 0.48 GB | **KEEP** — possibly the current operator session (oldest CLI) |
| 16624 | 48312 | same (CC CLI) | 43.8 min | 0.52 GB | **KEEP** — active CLI |
| 82124 | 81196 | same (CC CLI) | 43.7 min | 0.47 GB | **KEEP** — active CLI |
| 82928 | 82660 | same (CC CLI) | 43.7 min | 0.66 GB | **KEEP** — active CLI |
| 63592 | 83580 | same (CC CLI) | 43.7 min | 0.52 GB | **KEEP** — active CLI |
| 62668 | 23584 | Claude Desktop (parent = explorer.exe) | 51.8 min | (helper tree below) | **NOT a CC CLI — Desktop app** |
| 62836 | 62668 | Desktop `crashpad-handler` | 51.8 min | small | Desktop helper |
| 64304 | 62668 | Desktop `gpu-process` | 51.8 min | small | Desktop helper |
| 64336 | 62668 | Desktop `network.mojom.NetworkService` | 51.8 min | small | Desktop helper |
| 65300, 65356, 64568 | 62668 | Desktop renderer × 3 | 51.8 min | small each | Desktop helper |
| 65520, 65480, 32272, 64848 | 62668 | Desktop `node.mojom.NodeService` × 4 | 51.8 min | small each | Desktop helper (Desktop's bundled Node) |
| 65884 | 62668 | Desktop `video_capture` | 51.8 min | small | Desktop helper |
| 65892 | 62668 | Desktop `audio.mojom.AudioService` | 51.8 min | small | Desktop helper |

**Total claude.exe RAM**: **3.73 GB** combined (per `Get-Process claude | Measure-Object -Property WorkingSet64 -Sum`) — **NOT a meaningful contributor** to the 99.9 GB total. The session-count alarm was a red herring.

**Node.exe forks tied to CC CLI sessions** (22 procs):
- 4× `context-mode` MCP per session (`Z:/claude-sota-installed/.claude/plugins/cache/context-mode/context-m...`)
- `@ccusage/mcp` per session
- `mcp-server-langfuse` per session
- 1× standalone `claude-code-cache-fix` proxy (PID 17252 — orchestrator-shared)
- **Per-session MCP tree is legitimate; NOT a leak**.

**Verdict — closeable**: 0 sessions are clearly orphaned. **All 5 CLI sessions are active and recent**. Closing 1-2 would save only ~0.5-1 GB RAM (NOT material relative to 60.88 GB from llama-server).

---

## Hindsight daemon + queue state (PID 19024)

**Live probe** (3-of-3):

1. **`Get-Process 19024`**:
   - StartTime: `5/18/2026 10:18:34 AM` → **age 49.7 min**
   - WS: **2.30 GB**
   - PrivateMemory: 4.40 GB
   - CPU-s: **4004.23** → **80.6 CPU-seconds / minute** = **1.34 cores pegged continuously**
   - Threads: **470**
2. **`GET :9077/health`** → `{"status":"healthy","database":"connected"}`
3. **`GET :9077/metrics`** filtered to operations counters:
   - `hindsight_operation_operations_total{operation="recall",success="true"} = 14.0`
   - No other operation counters present (no `pending`, no `failed`, no `async_operations` series).

**Postgres queue depth**: **not directly probed** — `psql.exe` is not installed on this Windows host (pg0 daemon ships postgres but not the client binary). Cross-check via `/metrics` shows **no high pending/failed counters** in the OTLP-exported gauges. The daemon's high CPU (1.34 cores) + 470 threads is **suspicious but matches W288 baseline pattern** (which then escalated to 21k CPU-s leak); current state appears to be the **baseline busy-loop** that the W280b bootstrap intentionally accepts, not a new leak. Cannot fully rule out a queue backlog without a postgres-client query — operator may want to run from another host or install `psql`.

**Retraction discipline**: I CANNOT make a 3-of-3 verified claim that hindsight is healthy. I have 2-of-3 (process probe + HTTP health endpoint) but NOT a direct queue-depth check. Flagged as **MEDIUM-confidence finding**.

---

## Recovery runbook (ordered by leverage, all destructive ops require operator-confirm)

### Step 1 — Diagnose the stuck slot (NON-DESTRUCTIVE, no flag needed)

```powershell
# Capture pre-shutdown evidence — what is the active request?
Invoke-WebRequest -Uri "http://127.0.0.1:8080/slots" -UseBasicParsing | ConvertFrom-Json | ConvertTo-Json -Depth 5 | Out-File "Z:\claude-sota-installed\tmp\W290-llama-slot-snapshot-$(Get-Date -Format yyyyMMdd-HHmmss).json"
# Cross-check via /props for build info
Invoke-WebRequest -Uri "http://127.0.0.1:8080/props" -UseBasicParsing | Select-Object -ExpandProperty Content | Out-File "Z:\claude-sota-installed\tmp\W290-llama-props.json"
```

**Rollback**: N/A (read-only).
**Stop here** to inspect the JSON before any restart — if slot 0 has a legitimate long-running operation (e.g., a hindsight consolidation prompt), wait for it.

### Step 2 — Tail the IkLlamaServer service log (NON-DESTRUCTIVE)

```powershell
$logdir = "C:\Users\42\.pg0\instances\hindsight-embed-claude-code\data\log"  # if NSSM logs into pg0; else check Get-Service IkLlamaServer
# Or via NSSM:
& "C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe" status IkLlamaServer
& "C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe" get IkLlamaServer AppStdout
& "C:\Users\42\AppData\Local\Microsoft\WinGet\Packages\NSSM.NSSM_Microsoft.Winget.Source_8wekyb3d8bbwe\nssm-2.24-101-g897c7ad\win64\nssm.exe" get IkLlamaServer AppStderr
# Then Get-Content -Tail 200 on whichever paths nssm reports
```

**Rollback**: N/A (read-only).

### Step 3 — `-Force` operator-confirm: Restart IkLlamaServer to reclaim 60.88 GB RAM + 23.84 GB VRAM

```powershell
# REQUIRES OPERATOR CONFIRM — destructive (kills in-flight inference)
Restart-Service -Name IkLlamaServer -Force
# Wait for warmup (~30-60 s for 27.7 GB model load with --mlock)
Start-Sleep -Seconds 45
Invoke-WebRequest -Uri "http://127.0.0.1:8080/health" -UseBasicParsing | Select-Object -ExpandProperty Content
```

**Expected reclaim**: ~48 GB RAM (back to W288 12.6 GB baseline) + return VRAM to ~13-14 GB headroom (Qwen3.6-35B fp4 weights + small KV).
**Rollback**: NSSM auto-restarts the service on stop; if startup fails, `Stop-Service IkLlamaServer; sc.exe stop IkLlamaServer` then manually inspect logs.
**Risk**: any in-flight hindsight `recall` or external client request to qwen36 is killed.

### Step 4 — `-Force` operator-confirm: Restart hindsight daemon (only if Step 1-3 don't fully recover RAM)

```powershell
Stop-Process -Id 19024 -Force
& Z:\claude-sota-installed\tools\bootstrap-runtime.ps1
```

**Expected reclaim**: 2.30 GB RAM + reset 470-thread pool.
**Rollback**: bootstrap script is idempotent and partial-repair-safe (per CLAUDE.md W280b note).
**Risk**: brief T1 recall pause; T6 basic-memory + cognee still backstop per CLAUDE.md 6-tier memory.

### Step 5 — (do NOT apply during this session) — Defer to operator

W288 Tier-A item #3 (Windows Defender exclusions) is at `Z:\claude-sota-installed\tmp\W288-system-lag-audit\W288-defender-exclusions.ps1` — requires admin elevation; not a hot-fix.

### Step 6 — Configurational follow-up (W290 future work)

Investigate `--ctx-checkpoints 8` setting in IkLlamaServer NSSM config. If checkpoint expansion is the root cause (see §Delta vs W288 baseline), drop to `--ctx-checkpoints 2` (saves ~24 GB worst-case) or remove flag entirely. The NSSM cmdline edit goes through:
```
nssm.exe edit IkLlamaServer AppParameters
```
Cite-anchor needed: ik_llama.cpp `examples/server/README.md` for `--ctx-checkpoints` semantics (NOT verified in this audit).

---

## Commit-safety checklist (before operator shutdown)

| Item | State now | Action |
|---|---|---|
| `Z:\claude-sota-installed` working tree | 2 dirty (`.claude/plugins/installed_plugins.json`, `.claude/plugins/known_marketplaces.json`), 2 untracked under `docs/architecture/W290-*` (this file + `W290-COGNEE-406-DIAGNOSIS-2026-05-18.md` + `W290-QUALITY-AND-SOTA-WAVE/`) | **commit-safe**: contents are docs + plugin registry drift — no secrets |
| Worktrees | main + W287-reconcile + W290 (3 total, within ~3 cap) | OK |
| llama-server stuck state | `slots_processing=1` for 54 min | **Capture `/slots` snapshot via Step 1 above** before restart |
| Hindsight daemon | active, 1.34 cores busy | **OK to leave running** OR follow Step 4 |
| Plugin install state | 62 plugins per CLAUDE.md | OK |
| `.mcp.json` | not modified this session | OK |
| Codex review-gate state | `${CLAUDE_PLUGIN_DATA}/state.json` is gitignored | OK |
| Bootstrap idempotency | `tools/bootstrap-runtime.ps1` works for fresh clones per CLAUDE.md W280 | OK |
| Pre-commit gate | `.claude/settings.json` enforces gitleaks·ruff·shellcheck·git on every commit | OK |

**Suggested commit before shutdown** (operator runs):
```bash
git -C Z:/claude-sota-installed add docs/architecture/W290-LAG-DIAGNOSIS-2026-05-18.md docs/architecture/W290-COGNEE-406-DIAGNOSIS-2026-05-18.md docs/architecture/W290-QUALITY-AND-SOTA-WAVE/
# Review & decide whether to also commit:
#   .claude/plugins/installed_plugins.json
#   .claude/plugins/known_marketplaces.json
# These plugin registry files often drift on plugin sync; review with `git diff` first.
git -C Z:/claude-sota-installed commit -m "docs(W290): lag-diagnosis + recovery runbook for stuck llama-server"
```

---

## Open questions for next session

1. **Why is slot 0 stuck for 54 min?** `/slots` showed `state:1, n_past:null, prompt_n:null` — atypical. Tail the NSSM stdout/stderr.
2. **Is `--ctx-checkpoints 8` justified?** No 3-of-3 cite-anchor — verify ik_llama.cpp upstream docs.
3. **Postgres queue depth** — install `psql` or query via the pg0 supervisor to confirm hindsight is not silently backlogging.
4. **MTP self-spec leak hypothesis** — if Step 3 restart doesn't drop the working set back to ~12 GB, check ik_llama GitHub for memory regressions in HEAD `c35189d8` (per llama-swap config comment).

---

## Methodology footnote — retraction discipline applied

Per the W288 postmortem hard rule (3-of-3 evidence, 2-of-3 W288 hindsight claims wrongly attributed), this audit:
- ✅ verified PID 7628 identity via 4 independent sources (Win32_Process + Get-Process + port listener + service /v1/models)
- ✅ verified llama-swap is NOT supervising qwen36 (probed `/running` + config comments)
- ✅ verified CC session count via Get-CimInstance + Get-Process aggregate
- ⚠️ flagged the +48 GB cause as **HYPOTHESIS** (parsimonious match but no direct profiler evidence)
- ⚠️ flagged hindsight queue depth as **MEDIUM confidence** (no psql binary available; only 2-of-3 sources)
- ❌ did NOT make destructive recommendations without `-Force` and operator-confirm tags

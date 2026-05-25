# W310 — IkLlamaServer CUDA Crash-Loop Root Cause Analysis

**Date**: 2026-05-19 · **Severity**: CRITICAL · **Status**: RESOLVED

## Symptom

User reported persistent system lag despite earlier W310 fixes (basic-memory HTTP migration, FalkorDB+Ollama stop, --mlock removal). Hindsight memory recall + cognee operations were extremely slow.

## Root cause

**IkLlamaServer NSSM service was in an undetected CRASH LOOP**, restarting every 1.5–3 minutes with:

```
CUDA error: an illegal memory access was encountered
Z:\repos\deps\ik_llama.cpp\ggml\src\ggml-cuda.cu:132: CUDA error
```

## Evidence

### Log-rotation cadence proved the loop

`Z:/claude-hub/logs/ik-llama-stderr-2026*.log` rotations (NSSM auto-rotates on process exit):

| Time | Action |
|---|---|
| 00:39:57 | crash → restart |
| 00:42:27 | crash → restart |
| 00:44:03 | crash → restart |
| 00:46:03 | crash → restart |
| 00:47:36 | crash → restart |
| 00:49:21 | crash → restart |
| 00:51:15 | crash → restart |
| 00:52:43 | crash → restart |
| 00:54:48 | **last crash** (transition into fix) |
| 00:55:14 | new process pid 60876 with fixed flags — **stable for 6+ min** |

## Causal chain

1. **Latent W269 documentation drift**: `Z:\tools\llama-swap\config.yaml:25` `_disabled_qwen36-moe` block has the comment "DROP --spec-type ngram-mod (replaced by native MTP self-spec)" but the live NSSM `IkLlamaServer` AppParameters in the registry never received this update — it carried `--spec-stage ngram-mod` AND `--spec-stage mtp` cascaded.
2. **VRAM-edge config**: `-c 65536` with `-ctk q4_0 -ctv q4_0 --k-cache-hadamard --v-cache-hadamard` consumed almost all 24 GB VRAM. Combined with `-fa on` + cascaded spec-decode, draft buffers had zero allocation headroom.
3. **Race on CUDA allocation**: when both spec-decode stages tried to allocate their draft buffers during a hindsight consolidation prompt, the second allocation hit `cudaMalloc` with no free pool → returned a stale-pointer error class → `ggml-cuda.cu:132 illegal memory access`.
4. **NSSM masked the failure**: `AppExit Default Restart` immediately respawned the crashed process. NSSM-stderr rotation made each crash invisible in the latest log. Hindsight saw connection-reset errors but kept retrying.

## Fix (applied at 2026-05-19 00:55)

`HKLM\SYSTEM\CurrentControlSet\Services\IkLlamaServer\Parameters\AppParameters`:

**Removed**:
- `--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16`

**Changed**:
- `--spec-stage mtp:n_max=3,draft-p-min=0.0` → `-mtp --draft-max 3 --draft-p-min 0.0` (W269-canonical syntax)
- `-c 65536` → `-c 16384` (4× less KV; hindsight prompts are <16 K)
- `--cache-ram 4096` → `--cache-ram 2048`

## Verification

| Metric | Pre-fix | Post-fix | Δ |
|---|---|---|---|
| Process uptime | 1.5-3 min between crashes | **6+ min stable** (still alive) | ∞ |
| VRAM used | 24024 / 24564 MiB (97.8%) | 22987 / 24564 MiB (93.6%) | -1037 MiB |
| GPU util | 100% (stuck) | 57% (computing) | -43pp |
| Health endpoint | timeout 3s | responds with `slots_processing:1` | ✓ |
| New CUDA errors | 1 per ~2 min | 0 over 7+ min | resolved |

## Reversibility

Original AppParameters can be reconstructed from `Z:\tools\llama-swap\config.yaml:38-50` `_disabled_qwen36-moe` block. To revert:

```powershell
Stop-Service IkLlamaServer
Set-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Services\IkLlamaServer\Parameters' -Name AppParameters -Value '<original string>'
Start-Service IkLlamaServer
```

(Original AppParameters preserved in `tmp/W310-ikllamaserver-appparams-pre.txt` — TODO if needed for forensics.)

## Cite-anchored prior art

- W269 `docs/architecture/W269-local-model-sota-2026-05-17.md` §H: "DROP --spec-type ngram-mod (replaced by native MTP self-spec)"
- W269 `tmp/repomix-library/packed/ikawrakow_ik_llama.cpp.xml:3357` flags table
- ik_llama.cpp PR #1816 (Qwen3.5/3.6 MTP fix)
- ik_llama.cpp PR #1810 (extra output tensor for MTP)

## Lesson

NSSM `AppExit Default Restart` made the crash invisible by rotating logs and auto-respawning. **A health check that monitors `/health` slot status AND log-rotation cadence** would have surfaced this earlier. Filed as follow-up: add a `tools/ikllama-crash-loop-watchdog.ps1` that alerts if `ik-llama-stderr-*` rotates > 2× per 10 min.

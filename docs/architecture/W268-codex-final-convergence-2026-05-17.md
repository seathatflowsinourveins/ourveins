# W268 Final Convergence Verification -- 2026-05-17

## 1. Live State Probe Results

| Probe | Status | Key values |
|---|---|---|
| `GET :8080/health` | VERIFIED | `status=ok`; latest probe `slots_idle=3`, `slots_processing=1`. |
| `GET :8080/props` | DISPUTED for MTP | `model_path=Z:\models\Qwen3.6-35B-A3B\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf`, not an MTP-named GGUF. `total_slots=4`, `n_ctx=65536`. |
| `Get-CimInstance ... llama-server.exe` | UNVERIFIABLE | Exact requested command returned `Access denied`. NSSM readback succeeded separately. |
| NSSM live AppParameters | PARTIAL | NSSM reports `-ctk q8_0 -ctv q8_0 --parallel 4`, no `--k-cache-hadamard`, `--v-cache-hadamard`, or `-mtp`; current stderr log contradicts this with `K (q4_0)`, `V (q4_0)`, `k_cache_hadam = 1`, `v_cache_hadam = 1`. |
| `nvidia-smi` | VERIFIED | `23469 MiB used / 24564 MiB total / 670 MiB free` = about 95.5% used. |
| `GET :9835/metrics` | VERIFIED exporter, schema mismatch | HTTP 200. Requested `nvidia_gpu_memory_used_bytes` had 0 matches; installed exporter emits `nvidia_smi_memory_used_bytes ... 2.4588058624e+10`. |
| `GET :3000/api/public/traces?limit=5` | UNVERIFIABLE | HTTP 401: `No authorization header`; trace presence not observable. |
| `GET :8000/health` | DISPUTED | Connection actively refused. |
| Logs | VERIFIED | `n_slots=4`; `speculative decoding is not supported by multimodal, it will be disabled`; four slots report `speculative decoding context not initialized`; multimodal warmup ran before HTTP listen. |

## 2. Rollback Parameters

Pre-W267 rollback file exists at `tmp/nssm-IkLlamaServer-AppParameters.pre-W267.bak`:

`--alias qwen36 --jinja --reasoning-budget 0 --model Z:\models\Qwen3.6-35B-A3B\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --mmproj Z:\models\Qwen3.6-35B-A3B\mmproj-F16.gguf --port 8080 --host 127.0.0.1 -c 65536 -ngl 999 -fa on -cuda fa-offset=0 -ctk q8_0 -ctv q8_0 -b 2048 -ub 1024 --merge-qkv -muge -sas --mlock --ctx-checkpoints 8 --ctx-checkpoints-interval 512 --cache-ram 4096 --parallel 4 --threads 4 --threads-batch 4 --no-context-shift`

## 3. Per-Claim Verdict Table

| Claim | Prior Status | New Evidence | Final Verdict |
|---|---|---|---|
| Claim 5: W263 flags on `:8080` | DISPUTED | `/props` shows non-MTP UD-IQ4_XS model. CIM command denied. NSSM readback lacks Hadamard/MTP and says q8_0/q8_0, but current stderr shows q4_0/q4_0 plus Hadamard enabled. MTP remains absent. | DISPUTED |
| Claim 4: five-tier memory / Cognee `:8000` | DISPUTED | `GET :8000/health` refused connection. | DISPUTED |
| Claim 2: Langfuse wired | DISPUTED/PARTIAL | `:3000/api/public/health` is OK version `3.170.0`; traces endpoint returns 401 without auth. Docker env inspection was blocked by Docker API permission denied. No live trace evidence captured. | UNVERIFIABLE |

## 4. New Gaps from W267 Wave

| Gap | Evidence | Recommendation |
|---|---|---|
| MTP + `--parallel 4` scheduler behavior | `total_slots=4`, but logs say speculative decoding is disabled for multimodal and each slot has no speculative context. No draft-token distribution is active to verify. | Treat MTP convergence as not shipped until a non-disabled MTP/draft config is visible in `/props` or logs, then run concurrent slot smoke tests. |
| Hadamard warmup | Logs show multimodal `warmup with image size = 1472 x 1472` before `HTTP server listening`; no explicit text-generation first-token warmup observed. | Add or document a text prompt warmup if first-token latency matters after service restart. |
| VRAM headroom | Live GPU is about 95.5% used with only 670 MiB free; W267 alert threshold is 96%. | Keep W267 alerting; reduce parallelism/context or add failover before adding MTP overhead. |

## 5. Overall Convergence Assessment

W268 is not fully converged: the main server is healthy and q4_0/Hadamard appears active in logs, but MTP is absent/disabled, Cognee remains unreachable, and Langfuse trace production was not verifiable. Operational risk remains concentrated in VRAM headroom and stale/contradictory service parameter evidence.

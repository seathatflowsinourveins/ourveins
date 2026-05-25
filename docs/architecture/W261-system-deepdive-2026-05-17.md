# W261 — System Deep-Dive & Optimization Plan (2026-05-17 post-restart)

> Extension + re-verification of `docs/architecture/LOCAL-COMPUTE-AUDIT-2026-05-17.md` (the morning audit). State has changed: hindsight backlog grew 235→493, the claude-code provider is now broken, and llama-server :8080 is currently holding ~17.66 GiB VRAM. This doc reconciles the new state, adds Ollama SOTA env-matrix research, verifies each ik_llama.cpp restart flag against `common/common.cpp @ 1f8c603d`, surfaces a security finding, and lists every concrete command to apply.
>
> **Hardware:** AMD Threadripper PRO 5975WX (32C/64T @ 3.8 GHz, 100% load) · NVIDIA RTX 4090 (24 GiB VRAM, 7% util, 17.66/24 GiB used) · 128 GiB DDR4 (89.6/127.8 GiB used) · 716 GiB free on Z:. Windows 11.

---

## §0 — Executive summary

State **DEGRADED, three live regressions** since the morning audit:

1. **Hindsight is BROKEN, not just CPU-heavy.** The W259-v16 provider switch (`claude-code`) is timing out on every call — log shows `Claude Code error (attempt 1/4): Control request timeout: initialize` looping across all 8 retain workers + 1 consolidation. Backlog 235 → **493** and growing. The 9 workers keep CPU pegged retrying.
2. **:8080 LLM-server is now VRAM-resident** (17.66 GiB held) — the morning "4.7 GiB" reading no longer reproduces; the audit's P2 has self-corrected but the suboptimal flags (q8_0 KV, no `--fit`, no `-mtp`) are still in place.
3. **:8082 embedder is STILL CPU-only** by config (`-ngl 0 -t 32 -ub 4096`) — pegs 32 of 64 cores when active.

Plus a security finding (§6) and a Ollama env-matrix gap (§5).

**The fix is still configuration + restarts.** Section §7 has the exact restart commands, ready to copy. Section §8 has the operator go-ahead gate.

---

## §1 — Hardware & host snapshot

| Layer | Reading 2026-05-17T09:35-ish |
|---|---|
| CPU | Threadripper PRO 5975WX — 32C/64T, **100% load** |
| RAM | **89.6 / 127.8 GiB used** (38.2 GiB free) |
| GPU | RTX 4090 driver 595.79 — **17.66 / 24.0 GiB used**, 7% util, 43 °C, 46 W |
| Disks | C: 1655/1862 GB · **Z: 3009/3725 GB (716 GiB free)** · D: 3256/3815 · F: 622/1863 |

`nvidia-smi --query-compute-apps` shows the only non-Windows VRAM holders are PIDs **7616** (`ik_llama.cpp/build-new/bin/Release/llama-server.exe`, :8080) and **7632** (`ik_llama.cpp/build/bin/Release/llama-server.exe`, :8082). Per-process VRAM is `[N/A]` under Windows WDDM, so the 17.66 GiB total is the only direct measurement.

---

## §2 — Live services inventory

**Bound ports:**

| Port | Owner | State |
|---|---|---|
| 16700 | ollama.exe PID 75276 | UP — `ollama version 0.24.0`, 16 models installed, 0 loaded (`/api/ps` → `[]`) |
| 16379 | wslrelay PID 39460 → docker `falkordb:latest` | UP — graphiti backing store |
| 8080  | llama-server PID 7616 (build-new) | UP — `{"status":"ok","slots_idle":1}` |
| 8082  | llama-server PID 7632 (build) | UP — `{"status":"ok","slots_idle":4}` |
| 9077  | python PID 103472 (hindsight daemon) | UP but **NOT serving `/health`** — daemon stuck on LLM-init retry loop |
| 5432  | postgres PID 105704 (hindsight embedded pg0) | UP |
| 16006 | docker `arizephoenix/phoenix:13.15.0` | UP — Phoenix UI/OTel |
| 14317 | docker phoenix | UP — OTel gRPC |
| 3000  | docker `langfuse/langfuse:3.170.0` | UP (healthy) |
| 19090 | docker `prom/prometheus:v3.10.0` | UP (healthy) |
| 3001  | docker `grafana/grafana:12.4.1` | UP (healthy) |

`docker ps` also shows langfuse-worker, langfuse-clickhouse, langfuse-postgres, langfuse-redis, langfuse-minio — full observability stack live.

**Cognee** (port 8000) is INTENTIONALLY off — `.mcp.json:11` `cognee_w259v8` comment confirms entry is INERT until operator manually starts `cognee-mcp`. No regression.

---

## §3 — Local inference: ik_llama.cpp servers

### :8080 — Qwen3.6-35B-A3B (multimodal, 64k ctx)

Live cmdline (PID 7616):

```
llama-server --alias qwen36 --jinja --reasoning-budget 0
  --model Z:\models\Qwen3.6-35B-A3B\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf
  --mmproj Z:\models\Qwen3.6-35B-A3B\mmproj-F16.gguf
  --port 8080 --host 127.0.0.1
  -c 65536 -ngl 999 -fa on
  -cuda fa-offset=0                        # not no-op: overrides ln(2) default to 0
  -ctk q8_0 -ctv q8_0                      # SUBOPTIMAL: q4_0 KV adds +0.37% PPL only
  -b 2048 -ub 1024
  --merge-qkv -muge -sas
  --ctx-checkpoints 8 --ctx-checkpoints-interval 512
  --cache-ram 4096 --parallel 1 --threads 1 --threads-batch 1
  --no-context-shift
  # MISSING: --fit --fit-margin 1024  (PRs 1501/1504)
  # MISSING: -mtp                     (PR 1745, IF gguf has nextn.* tensors)
```

**Verified against ik_llama.cpp HEAD `1f8c603d` (just pulled):**

| Flag-change | Status | Source |
|---|---|---|
| Add `--fit --fit-margin 1024` | VERIFIED | `common.cpp:1991-2009` + `docs/parameters.md:67-68` |
| Add `-mtp --draft-max 1 --draft-p-min 0.0` | **CONDITIONAL** — only if the IQ4_XS GGUF has `blk.N.nextn.*` tensors (PR 1745 ships an MTP-tail variant); verify with `gguf-dump` first | PR 1745 sha `4997c8e4` (2026-05-07) |
| `-ctv q8_0` → `-ctv q4_0` | VERIFIED — +0.37% PPL on Qwen3.5-35B-A3B IQ4_XS (PR 1547 perplexity table) | PR 1547 (CUDA), PR 1556 (CPU) |
| Drop `-cuda fa-offset=0` | VERIFIED (audit reasoning corrected — flag actually overrides ln(2) default to 0; dropping restores ln(2) safe baseline) | `ggml-cuda.cu:4910`, `docs/parameters.md:361` |

### :8082 — Qwen3-Embedding-4B (CPU-only, the wasted resource)

Live cmdline (PID 7632):

```
llama-server -m Z:\models\qwen3-embed-4b\Qwen3-Embedding-4B-Q4_K_M.gguf
  -ngl 0                  # CPU-only — Q4_K_M has CUDA MMQ kernel (mmq.cu:61); change to 99
  --embedding
  -c 32768
  -b 32768 -ub 4096       # pathological K·Q buffer (4–8 GiB); ub=512 b=4096 fits 3.5–4.5 GiB on GPU
  -t 32                   # 32 of 64 cores when active; with -ngl 99 only tokenization matters, drop to 4
  --parallel 4 --mlock --port 8082
```

### llama-swap config (`Z:\tools\llama-swap\config.yaml`)

The `qwen35-moe` entry (defined but not the current :8080 launcher — :8080 was launched directly, bypassing llama-swap). The morning audit recommended **removing** `--spec-type ngram-mod` based on the MoESD paper (arXiv 2505.19645). Updated finding: ik_llama.cpp source/PR evidence does NOT show a Qwen3.5/3.6-A3B-specific ngram-mod regression. Recommend **SWAP** (not drop) to `-mtp --draft-max 1 --draft-p-min 0.0` if a MTP-tail GGUF is acquired, **else KEEP ngram-mod** as the documented self-spec fallback (`common.cpp:3150` example).

---

## §4 — Memory stack

### 4.1 Hindsight (the live emergency)

**Port:** 9077 (PID 103472 python) · **DB:** embedded pg0 PID 105704 on :5432 · **Config dir:** `Z:\claude-sota-installed\.hindsight\profiles\claude-code.env`

**Provider config — actual on-disk:**

```
HINDSIGHT_API_LLM_PROVIDER=claude-code
HINDSIGHT_API_LLM_API_KEY=<REDACTED-openai-key>   # ⚠️ see §6 security
```

**Env-var-name reconciliation:** `.claude/settings.json` env block has `HINDSIGHT_LLM_PROVIDER=claude-code` — but the daemon reads `HINDSIGHT_API_LLM_PROVIDER` (with `_API_`, per `config.py:130`). The settings.json var is **dead config**; the daemon takes its value from the `.hindsight/profiles/claude-code.env` file (which does have the right name). Recommend deleting the dead settings.json key for cardinal-rule-1 hygiene.

**Live state from log tail (last 3 stat lines, every 30s — backlog NOT draining):**

```
[WORKER_STATS] worker=OHHELLO slots=9/10 | reserved: [consolidation=1/2(avail=1)] | shared=8/8(avail=0) | global: pending=493
[PENDING_BREAKDOWN] batch_retain: total=250 claimable=0 payload_null=250 | consolidation: total=1 claimable=1 | retain: total=242 claimable=242
[WORKER_TASK] op=... stage=llm.claude-code.retain_extract_facts+structured stage_age=61s,91s,121s ...   (8 ops, all stuck on LLM init)
```

**Root cause:** `hindsight_api/engine/providers/claude_code_llm.py:1-60` — provider uses `from claude_agent_sdk import query` and spawns a Claude CLI subprocess per call. The SDK's `initialize` step times out. 8 workers concurrently invoking it amplifies the failure into a permanent stall. All 8 retain ops are in attempt 1/4 retry loop; each timeout cycle eats CPU.

**Resolution path** — switch provider to local Ollama (which is up, idle, and has qwen3:8b loaded):

```env
HINDSIGHT_API_LLM_PROVIDER=openai
HINDSIGHT_API_LLM_MODEL=qwen3:8b
HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:16700/v1
HINDSIGHT_API_LLM_API_KEY=ollama
HINDSIGHT_API_WORKER_MAX_SLOTS=3            # was default 10 → 9/10 stuck; cut to 3
HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS=1
```

Daemon code paths confirm: `hindsight_api/engine/providers/openai_compatible_llm.py` handles `provider=openai` with arbitrary `base_url`. Ollama exposes an OpenAI-compatible `/v1` since 0.24.0.

**Worker concurrency citation:** `config.py:413` `ENV_WORKER_MAX_SLOTS`, `config.py:652` `DEFAULT_WORKER_MAX_SLOTS=10`, `config.py:1802` reads from env.

**Embeddings/reranker (a smaller CPU sink, not flagged in morning audit):** `hindsight_api/engine/embeddings.py` initialises `BAAI/bge-small-en-v1.5` (sentence-transformers, 384-dim) and `cross-encoder/ms-marco-MiniLM-L-6-v2` reranker — both currently run on CPU. Optional follow-up: move to GPU via sentence-transformers `device='cuda'` or route via a separate ik_llama.cpp embedding endpoint. Not blocking.

### 4.2 graphiti (working)

MCP server (`.mcp.json:63-97`) wired to:
- FalkorDB `redis://127.0.0.1:16379` (docker)
- Ollama OpenAI-compat `http://127.0.0.1:16700/v1`
- Chat model: `qwen3:8b` · Embedder: `qwen3-embedding:0.6b` (1024-dim)
- `SEMAPHORE_LIMIT=3`

Why Ollama is "idle" with 0 loaded models but still needed: graphiti spawn-time wires to it; embeddings issued during ingest will load `qwen3-embedding:0.6b` (~640 MB) and unload per `OLLAMA_KEEP_ALIVE=30m` (see §5).

### 4.3 memory MCP (sqlite_vec)

Multiple `memory.exe server` instances in process table (PIDs 38444, 27864, 44628, 44720 — ~240 MB RSS each). Each MCP client respawn creates a new instance. `.mcp.json:54-62` points at sqlite_vec backend `Z:/claude-sota-installed-state/.mcp-memory/memory.db`.

### 4.4 cognee (INERT by design)

`.mcp.json:cognee` is HTTP-mode pointing at `127.0.0.1:8000/mcp`. Port closed → MCP entry inert. Per W259-v8 comment, operator starts cognee out-of-band when cold-tier is needed. Not a regression.

---

## §5 — Ollama (SOTA env matrix)

Current envs (W259-v15, persisted user-env per `CLAUDE.local.md`):

| Var | Current | SOTA per `ollama@42e6f56:envconfig/config.go` | Verdict |
|---|---|---|---|
| `OLLAMA_HOST` | `http://127.0.0.1:16700` | (no default) | ✅ correct |
| `OLLAMA_FLASH_ATTENTION` | `1` | `1` for CC≥8.6 (RTX 4090 is CC 8.9) | ✅ |
| `OLLAMA_KV_CACHE_TYPE` | `q8_0` | `q8_0` (requires FA=1) | ✅ |
| `OLLAMA_KEEP_ALIVE` | `30m` | **`-1` (pin)** for graphiti's burst-y embed loop | ⚠️ change to `-1` to stop reload churn |
| `OLLAMA_MAX_LOADED_MODELS` | `2` | `1` for pure-sidecar; `2-3` if also chat | ✅ (graphiti uses both qwen3:8b chat + 0.6b embed) |
| `OLLAMA_CONTEXT_LENGTH` | `8192` | match workload | ✅ |
| `OLLAMA_GPU_OVERHEAD` | (unset) | **`1073741824` (1 GiB)** when llama-swap/ik_llama also claims VRAM | ⚠️ ADD |
| `OLLAMA_NUM_PARALLEL` | (unset = 1) | force-overridden to 1 for embedding models by scheduler | ✅ no-op |
| `OLLAMA_MODELS` | `Z:/ollama/models` | off-C: drive | ✅ |

**Bottom line:** two env-tweaks (`OLLAMA_KEEP_ALIVE=-1`, add `OLLAMA_GPU_OVERHEAD=1073741824`); the rest is correct.

**0 running models, 17.66 GiB VRAM used** — explained: the VRAM is held by the two ik_llama.cpp `llama-server.exe` processes, NOT by Ollama. `ollama ps` reflects only Ollama's scheduler state.

**Version note:** stay on `0.24.0`. `v0.30.0-rc17` (2026-05-13) is a llama.cpp/GGML rewrite, explicitly soliciting feedback on perf+memory regressions — not production-ready.

---

## §6 — Security finding (NEW)

`Z:\claude-sota-installed\.hindsight\profiles\claude-code.env` contains a **live OpenAI API key in plaintext** (the `sk-proj-…` value). The provider is now `claude-code` so the key is unused, but it sits on disk regardless.

**Mitigation:**
- `.hindsight/` IS in `.gitignore` (`:202-203`) — **not git-committed**, so no remote leak.
- Key was rate-limited (HTTP 429 `insufficient_quota` in log) — likely already exhausted, but should still be revoked + rotated if it has any quota.
- Action: empty `HINDSIGHT_API_LLM_API_KEY` to `ollama` (dummy) when switching provider in §4.1, and revoke the old key at `platform.openai.com/api-keys`.

**Audit:**

```powershell
Select-String -Path Z:\claude-sota-installed\.hindsight\profiles\*.env -Pattern 'sk-(proj|live|ant)' | Select-Object -ExpandProperty Filename
```

---

## §7 — Ready-to-apply restart commands

### A — :8080 35B (verify `nextn` tensors before adding `-mtp`)

```powershell
# 1. Pre-flight: verify if the IQ4_XS GGUF has MTP-tail tensors
# (gguf-dump is not on PATH; use llama-gguf inspector or skip and run WITHOUT -mtp)
# Optional install: pip install gguf-py ; python -m gguf.scripts.gguf_dump <path> | Select-String 'nextn'

# 2. Stop the current :8080 (PID 7616) — no in-flight requests per /health
Stop-Process -Id 7616 -Force

# 3. Restart with the optimized flags (DROP -mtp if step-1 found no nextn.*)
$IK = 'Z:\repos\deps\ik_llama.cpp\build-new\bin\Release\llama-server.exe'
& $IK --alias qwen36 --jinja --reasoning-budget 0 `
  --model Z:\models\Qwen3.6-35B-A3B\Qwen3.6-35B-A3B-UD-IQ4_XS.gguf `
  --mmproj Z:\models\Qwen3.6-35B-A3B\mmproj-F16.gguf `
  --port 8080 --host 127.0.0.1 `
  -c 65536 -ngl 999 -fa on `
  -ctk q8_0 -ctv q4_0 `
  -b 2048 -ub 1024 --merge-qkv -muge -sas `
  --ctx-checkpoints 8 --ctx-checkpoints-interval 512 `
  --cache-ram 4096 --parallel 1 --threads 1 --threads-batch 1 `
  --no-context-shift `
  --fit --fit-margin 1024
  # If gguf-dump shows nextn.* tensors, also append:  -mtp --draft-max 1 --draft-p-min 0.0
```

Verify post-restart: `Invoke-WebRequest http://127.0.0.1:8080/health`; `nvidia-smi --query-gpu=memory.used --format=csv` should show ~20 GiB (was ~17.66 GiB; +KV cache q4_0 ≈ 3 GiB).

### B — :8082 embedder onto GPU

```powershell
Stop-Process -Id 7632 -Force

$IK_OLD = 'Z:\repos\deps\ik_llama.cpp\build\bin\Release\llama-server.exe'
& $IK_OLD -m Z:\models\qwen3-embed-4b\Qwen3-Embedding-4B-Q4_K_M.gguf `
  -ngl 99 --embedding `
  -c 32768 -b 4096 -ub 512 -t 4 `
  --parallel 4 --mlock --port 8082
```

Verify: `Invoke-WebRequest http://127.0.0.1:8082/health`; total GPU should rise ~4 GiB (model+KV+compute buffer).

### C — Hindsight: switch provider + reduce workers (W259-v16 arc coordination)

Update `Z:\claude-sota-installed\.hindsight\profiles\claude-code.env`:

```env
HINDSIGHT_API_LLM_PROVIDER=openai
HINDSIGHT_API_LLM_MODEL=qwen3:8b
HINDSIGHT_API_LLM_BASE_URL=http://127.0.0.1:16700/v1
HINDSIGHT_API_LLM_API_KEY=ollama
HINDSIGHT_API_WORKER_MAX_SLOTS=3
HINDSIGHT_API_WORKER_CONSOLIDATION_MAX_SLOTS=1
HINDSIGHT_EMBED_DAEMON_IDLE_TIMEOUT=0
```

Then `Stop-Process -Id 103472 -Force` and let the plugin's SessionStart hook respawn the daemon (it will pick up the new env). The 493-op backlog is durable in pg0 and will drain on the local Ollama path.

### D — Ollama env tweaks

```powershell
[Environment]::SetEnvironmentVariable('OLLAMA_KEEP_ALIVE','-1','User')
[Environment]::SetEnvironmentVariable('OLLAMA_GPU_OVERHEAD','1073741824','User')
# Restart Ollama service to pick up
Stop-Process -Name ollama -Force ; Start-Process 'C:\Users\42\AppData\Local\Programs\Ollama\ollama.exe' -ArgumentList 'serve' -WindowStyle Hidden
```

### E — Settings.json hygiene (no daemon impact)

Delete the dead key from `.claude/settings.json.env`: `HINDSIGHT_LLM_PROVIDER` (no `_API_` prefix; reads nothing in hindsight 0.6.2). Per cardinal-rule-1 hygiene.

### F — Security: revoke leaked OpenAI key

Open https://platform.openai.com/api-keys, revoke the leaked `<REDACTED-openai-key>` key. Then ensure `.hindsight/profiles/*.env` contains the dummy `ollama` value (Step C does this).

---

## §8 — Apply sequence + go-ahead gate

**Already done this session (read-only):** audit refresh, source verification against `ik_llama.cpp@1f8c603d`, Ollama SOTA matrix research, `ollama-python` + `ollama-js` cloned, `ik_llama.cpp` + `unsloth` pulled to HEAD.

**Operator go-ahead gate (restart-class, in order):**

```
1. D     — Ollama env: OLLAMA_KEEP_ALIVE=-1, OLLAMA_GPU_OVERHEAD=1 GiB; restart ollama serve.
2. B     — :8082 embedder onto GPU (-ngl 99 -ub 512 -b 4096 -t 4). Frees ~28 cores.
3. A     — :8080 35B: --fit --fit-margin 1024, -ctv q4_0, drop -cuda fa-offset=0.
           (Add -mtp ONLY after gguf-dump confirms blk.N.nextn.* tensors.)
4. C     — Hindsight env: provider=openai → local Ollama qwen3:8b; workers 10→3.
           Stop-Process the daemon; SessionStart hook respawns.
5. E     — Settings.json hygiene (delete HINDSIGHT_LLM_PROVIDER dead key).
6. F     — Revoke leaked OpenAI key on platform.openai.com.
7. verify — CPU should drop well below 100%; nvidia-smi should show 18–22 GiB; hindsight backlog should drain.
```

**Do NOT execute without operator confirmation** — A/B restart the live `llama-server` processes, C restarts the daemon owned by the concurrent W259-v16 arc.

---

## §9 — Cloned repos audit (post-pull)

| Repo | Path | HEAD | Status |
|---|---|---|---|
| ollama/ollama | `Z:/repos/deps/ollama` | `42e6f56c` (2026-05-15) | ✅ up-to-date |
| ollama/ollama-python | `Z:/claude-sota-installed-repos/ollama-python` | (depth=1 clone) | ✅ newly cloned |
| ollama/ollama-js | `Z:/claude-sota-installed-repos/ollama-js` | (depth=1 clone) | ✅ newly cloned |
| vectorize-io/hindsight | `Z:/repos/deps/hindsight` | `9784f657` (release v0.7.7) | ✅ up-to-date |
| topoteretes/cognee | `Z:/repos/deps/cognee` | `4ca1d0c2b` | ⚠️ **7466 commits behind** — pull on demand |
| getzep/graphiti | `Z:/repos/deps/graphiti` | `9a2d6d0` | ✅ up-to-date |
| ikawrakow/ik_llama.cpp | `Z:/repos/deps/ik_llama.cpp` | `1f8c603d` | ✅ pulled this session (+2 commits inc. quantize Q4_0 KV) |
| unsloth (Apache-2.0) | `Z:/repos/deps/unsloth` | `36ea02ea` | ✅ pulled this session (+14 commits) |
| llama-swap | `Z:/repos/deps/llama-swap` | `b2fcc2d` | ✅ up-to-date |
| ggerganov/llama.cpp | `Z:/repos/deps/llama.cpp` | `59778f019` | ⚠️ 25 commits behind — pull on demand |

**Fine-tuning workload:** verdict unchanged from morning audit `local-compute-research-finetune-2026-05-17.md` §1 — **DEFER**. No labeled retrieval-relevance data, no candidate fine-tuning workload that improves an active pipeline. Unsloth is the kept-warm candidate platform under WSL2 if a trigger fires (most likely: moving hindsight fact-extraction off Claude permanently → fine-tune a 4–8B extractor); the §7-C fix uses stock `qwen3:8b` first.

---

## §10 — Sources

- Morning audit: `docs/architecture/LOCAL-COMPUTE-AUDIT-2026-05-17.md`
- Inference research: `docs/architecture/local-compute-research-inference-2026-05-17.md`
- Fine-tune research: `docs/architecture/local-compute-research-finetune-2026-05-17.md`
- ik_llama.cpp source @ `1f8c603d` (`common/common.cpp`, `docs/parameters.md`, `mmq.cu:61`, `ggml-cuda.cu:4910`)
- hindsight source @ `9784f657` (`hindsight-api-slim/hindsight_api/{config.py:130-133,413,652,1802; engine/providers/{claude_code_llm.py, openai_compatible_llm.py}}`)
- ollama source @ `42e6f56c` (`envconfig/config.go`)
- Live probes 2026-05-17: PowerShell `Get-CimInstance Win32_Process`, `nvidia-smi`, `Invoke-WebRequest`, `Get-NetTCPConnection`, `docker ps`, hindsight log tail
- This doc: `docs/architecture/W261-system-deepdive-2026-05-17.md`

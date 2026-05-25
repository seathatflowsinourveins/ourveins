# Local-Compute Deep Audit & Optimization Plan — 2026-05-17

> **What this is.** A post-restart deep audit of the `claude-sota-installed` runtime's local-compute layer (CPU/GPU, local-inference stack, memory daemon), an e2e verification, and a prioritized optimization plan. Method: direct system audit + 3 agents — local-inference-optimization research (`psr-localinf`), fine-tuning-platform research (`psr-finetune`), and a Codex GPT-5.x e2e pass.
>
> **Hardware:** NVIDIA RTX 4090 (24 GB VRAM), 64 logical cores, 128 GB RAM, Windows 11, Docker-in-WSL2.

---

## §0 — Executive summary

The runtime is **DEGRADED, not broken** (Codex e2e verdict). The headline is a **systemic CPU↔GPU imbalance**: the **CPU is pegged at ~100%** while the **RTX 4090 sits ~80% idle** (≈5 / 24 GB used, 13–31% util). This is not a horsepower problem — it is **three configuration faults**, all fixable, none requiring a new install:

1. **The Hindsight memory daemon** is grinding a ~235-operation backlog with 9 concurrent CPU-bound workers → ~31 of 64 cores, by itself.
2. **The 35B local LLM is mis-offloaded** — loaded into its `llama-server` but running on **CPU/RAM, not the GPU** (confirmed: `/props` shows the model loaded; GPU holds 4.7 GB vs a 16.5 GB model).
3. **The embedding model is CPU-only by config** (`-ngl 0`, 32 threads) while 19 GB of VRAM sits free.

**Fine-tuning:** there is **no fine-tuning workload** in this runtime — the request was researched and the W259 "DECLINE" verdict re-confirmed (see §5). **DEFER.**

**The fix is configuration + restarts of the local-inference servers, not acquisition.** Every high-value item is restart-class — see §6 for the apply sequence and the go-ahead gate.

---

## §1 — Audit scorecard

| Layer | State | Verdict |
|---|---|---|
| **Git / `main`** | `ab4756a` — `w260-trueup` merged; W259-v16 + W260 landed; Hindsight LLM provider wired | healthy; concurrent W259-v16 session very active |
| **`parallel-sessions-arch`** | prior-arc branch, 7 commits, unmerged, 12 behind `main` | stranded — rebase-then-merge (Codex concurs) |
| **GPU** | RTX 4090 — 13–31% util, **~5 / 24 GB**, 43 °C, ~28 W | **~80% idle — the wasted resource** |
| **CPU** | **~100% load** · RAM 86 / 128 GB | **pegged — the bottleneck** |
| **Local inference** | `ik_llama.cpp` ×2 `llama-server`: `:8082` Qwen3-Embedding-4B (CPU-only) · `:8080` Qwen3.6-35B-A3B (mis-offloaded to CPU) | **both mis-placed re: CPU/GPU** |
| **Services** | FalkorDB · Postgres/Hindsight (`:9077`) · Phoenix · Ollama · OTel — all UP | healthy (Ollama idle but **needed** — graphiti embeds via it) |
| **MCP** | 6 disconnected this session (`memory`/`graphiti`/`serena`/`gitnexus`/`playwright`/`chrome-devtools`); binaries + `.mcp.json` intact | transient session-spawn failure → `/mcp` reconnect or CC restart |
| **codex CLI** | on PATH ✓ | GPT-5.x cross-model available |

---

## §2 — The CPU↔GPU imbalance: three confirmed problems

### P1 — Hindsight memory daemon backlog (the live CPU hog)

A sampled per-process CPU measurement names it unambiguously: **`python` PID 166752 (the Hindsight `:9077` daemon) consumes ~155 CPU-seconds per 5-second window ≈ 31 of 64 cores**, by itself. Its log shows:
- A **~235-operation backlog** — `[PENDING_BREAKDOWN] batch_retain total=121 · retain total=113 · global pending=235`. Every `Stop` hook across the runtime's many parallel sessions queued a `retain` op.
- **9 concurrent workers** (`slots=9/10`), each running CPU-bound embedding + ANN/graph-link computation — that is what pegs the cores.
- **~4 operations genuinely STUCK ~50 minutes** — `[STUCK?] stage=llm...retain_extract_facts age=2972s`.
- **Pathologically slow LLM calls** — `slow llm call: model=claude-code/claude-sonnet-4-5, time=130.183s`; fact-extraction taking 130–242 s/call.
- **Symptom:** SessionEnd hooks now fail — `SessionEnd hook [session_end.py] failed: Hook cancelled` — the daemon is too loaded to answer within the hook timeout.

Note: Hindsight's LLM provider is `claude-code` (no API key) — the W259-v16 arc *did* resolve the earlier OpenAI-key exposure. But that provider is the slow path here.

### P2 — The 35B LLM server is mis-offloaded (CONFIRMED)

The `:8080` server runs Qwen3.6-35B-A3B (`UD-IQ4_XS.gguf`, **16.5 GB**) with `-ngl 999` (= offload all layers). But:
- `/health` → `{"status":"ok","slots_idle":1}` and `/props` → the model **is loaded** into the server.
- `nvidia-smi` → GPU holds only **4.7 GB**.

A 16.5 GB model + 65k-context q8 KV cache, fully GPU-resident, would occupy ~20 GB. It occupies ~0. **The 35B is running on CPU/RAM** (consistent with RAM at 86/128 GB) — a 35B MoE executing on CPU instead of an 83%-empty 24 GB GPU. This is the largest single perf loss in the stack, and a CPU consumer whenever the model is invoked. Likely cause: VRAM was occupied at the moment it loaded → silent CPU fallback; `-ngl 999` did not place it. The fix is `--fit` + a restart (§4 A1).

### P3 — The embedder is CPU-only by config

The `:8082` server runs Qwen3-Embedding-4B (`Q4_K_M.gguf`, 2.4 GB) with `-ngl 0` (CPU-only), `-t 32` (32 threads → 32 cores), and **pathological batch sizes** `-b 32768 -ub 4096` that inflate the K·Q compute buffer by ~4–8 GB. The quant is `Q4_K_M` — CUDA-supported (not a CPU-only `_R4` quant) — so there is **no technical reason it cannot run on GPU**. GPU embedding prompt-processing is ~200× faster than CPU.

**The through-line:** P1 + P3 saturate the CPU; P2 wastes the GPU. Rebalancing memory-layer + embedding compute onto the idle GPU is the entire optimization.

---

## §3 — e2e verdict (Codex GPT-5.x)

Codex independent pass: **DEGRADED, not BROKEN.**
- Git state coherent; `parallel-sessions-arch` should be **rebase-then-merged** (12-commit divergence).
- The 6-MCP disconnection: config + binaries intact for spot-checked servers (`memory.exe`, `uv.exe`) → **transient session-spawn failure; reconnect, do not repair.**
- Codex could **not** name the CPU hog — its sandbox blocked process enumeration; that gap was closed by the orchestrator's own sampled measurement (§2 P1).

---

## §4 — Optimization plan (prioritized, sequenced, evidence-backed)

Cross-checked against all 3 agents. **Correction applied:** `psr-localinf` suggested stopping idle Ollama — **rejected**; `psr-finetune` confirmed graphiti embeds via Ollama's `qwen3-embedding:0.6b`. **Keep Ollama.**

### Track A — the `ik_llama.cpp` inference stack

| # | Action | Effect | Class |
|---|---|---|---|
| **A1** | Restart the `:8080` 35B server **with `--fit --fit-margin 1024`** (drop the no-op `-cuda fa-offset=0`); **capture its startup log** (`llm_load_tensors: CUDA0 buffer size`) to confirm GPU residency | 35B onto GPU → potentially **5–15× faster** generation; frees CPU + RAM | restart-class |
| **A2** | Add **`-mtp`** to the 35B (Qwen3.6-A3B ships MTP weights) | **+~31% throughput** — the one speculative method that wins on this MoE | part of A1 |
| **A3** | 35B KV cache `-ctv q8_0` → `q4_0` (low-perplexity Q4_0 KV) | frees ~1–2 GB VRAM for embedder co-residency | part of A1 |
| **A4** | Embedder `:8082`: `-ngl 0`→`-ngl 99`, `-ub 4096`→`512`, `-b 32768`→`4096`, `-t 32`→`4` — **sequence after A1** confirms free VRAM | frees ~28 CPU cores; embeddings ~200× faster; VRAM cost ~3.5–4.5 GB | restart-class |
| **A5** | Remove the net-negative draft speculative-decoding from `Z:\tools\llama-swap\config.yaml` (`--spec-type ngram-mod` on `qwen35-moe`) | recovers **14–53%** lost throughput — draft-spec is peer-reviewed net-negative on A3B MoE (arXiv 2505.19645) | config edit |
| **A6** | Rebuild both `ik_llama.cpp` builds (`build/`, `build-new/`) from HEAD `5cc0d86` with `-DGGML_CUDA=ON -DGGML_IQK_FA_ALL_QUANTS=ON`; consolidate to one | embedder gets current kernels (MTP/delta-net) | build-class |
| — | **Keep** `ik_llama.cpp` as the engine (vLLM/SGLang only win for multi-user; runtime is `--parallel 1`). **Keep** Ollama (graphiti depends on it). | — | no-op |

**VRAM co-residency caveat:** a correctly-GPU-resident 35B (~20 GB) + the embedder (~4 GB) ≈ 24 GB — the ragged edge of the 4090. A3 (smaller KV) + `--fit` margins make it fit; if tight, cap the 35B context below 65k.

### Track B — the Hindsight memory daemon

| # | Action | Effect | Class |
|---|---|---|---|
| **B1** | Reduce Hindsight worker concurrency (currently **9**) to ~2–3 in its config (`.hindsight/` profile or plugin settings) | stops the all-core peg; backlog still drains, just without saturating the CPU | restart-class (Hindsight daemon) |
| **B2** | After A4, confirm Hindsight's embedding path uses the now-GPU embedder | removes the remaining CPU-bound embedding cost | verify |
| **B3** | Clear the ~4 stuck `retain` ops (aged ~50 min) so the backlog drains cleanly | unblocks the queue | operator |
| **B4** | Investigate the slow `claude-code` LLM provider (130–242 s/call); consider routing Hindsight fact-extraction to the local 35B once it is GPU-resident (post-A1) | removes the pathological per-call latency | study |

**Ownership note:** the Hindsight install belongs to the concurrent **W259-v16 arc**. Track B is a coordinated change, not a unilateral one.

---

## §5 — Fine-tuning verdict: DEFER (no workload)

`psr-finetune` verified the runtime directly: **zero operator-fine-tuned artifacts on disk, zero fine-tuning commits in 892, no training data of the right shape**, and fact-extraction runs on Claude — not a local model fine-tuning could improve. All five candidate workloads (embedder / fact-extractor / draft-model / router / codebase-LoRA) fail. **The W259 L0.7 DECLINE was correct and stands → DEFER.**

- *If* a trigger fires (most likely: moving fact-extraction off Claude onto local hardware), the converged pick is **Unsloth under WSL2** (Apache-2.0, GGUF export); LLaMA-Factory runner-up; Axolotl rejected (no GGUF export); **torchtune rejected — officially wound down**.
- **Catalog correction flagged:** W259's `LAYER-E` fine-tune doc still lists torchtune in its top-3 — stale; the W259-v16 arc should amend it.

---

## §6 — Apply sequence + go-ahead gate

**Done / safe (already executed):** the audit, the CPU diagnosis, the e2e pass — all read-only.

**Restart-class — needs operator go-ahead** (these restart the operator's live `llama-server` processes and the W259-v16 arc's Hindsight daemon; the 35B/embedder are idle now, so restart interrupts nothing in flight; Hindsight's queue is durable in pg0, so a daemon restart pauses but does not lose the backlog):

```
1. A1+A2+A3  — restart :8080 35B with --fit --fit-margin 1024, -mtp, -ctv q4_0;
               capture startup log; verify GPU now holds ~20 GB.
2. A4        — restart :8082 embedder with -ngl 99 -ub 512 -b 4096 -t 4;
               verify GPU total stays under ~24 GB.
3. A5        — edit Z:\tools\llama-swap\config.yaml: drop --spec-type ngram-mod.
4. B1        — set Hindsight worker concurrency 9 -> ~3; restart the daemon.
5. verify    — CPU should fall well below 100%; GPU util should rise.
```

This is ready to execute. **Say "go" and I'll run the sequence** (capturing each server's startup log and re-measuring CPU/GPU after each step), **or** run it yourself from this doc. A6 (rebuild) and B3/B4 are follow-ups.

---

## §7 — Monitoring

For ongoing CPU/GPU monitoring (the "monitor" half of the request): a lightweight loop is sufficient — `nvidia-smi --query-gpu=utilization.gpu,memory.used --format=csv -l 5` for GPU, and a sampled per-process CPU check (the orchestrator's PowerShell two-snapshot diff) on demand. Phoenix (`:16006`) + the OTel collector (`:14317`) already capture session-level telemetry; the gap is host-level CPU/GPU correlation, which the above covers. A persistent dashboard is optional and not load-bearing.

---

## Source index

- `LOCAL-COMPUTE-AUDIT` research streams: `local-compute-research-inference-2026-05-17.md` (psr-localinf — full 13-item analysis) · `local-compute-research-finetune-2026-05-17.md` (psr-finetune — workload assessment).
- Live probes 2026-05-17: `nvidia-smi`, `Get-CimInstance Win32_Process`, sampled per-process CPU diff, `:8080`/`:8082` `/health`+`/props`, `.hindsight/profiles/claude-code.log`.
- Codex GPT-5.x e2e pass.

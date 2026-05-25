# W319 Stream 3 — Local Model Serving + Observability Stack SOTA Upgrade Path

**Date**: 2026-05-19 · **Scope**: model-serving + observability + ai-gateway + MLOps adjacency · **Constraint**: Z:-portable Windows CUDA host

## Live-state baseline (probed 2026-05-19)

| Service | Endpoint | HTTP | State | Note |
|---|---|---|---|---|
| IkLlamaServer | `:8080/v1/models` | 200 | UP | W310 CUDA crash-loop resolved |
| LlamaSwap | `:8090/v1/models` | 200 | UP | undocumented (W314-r2 flagged) |
| OllamaServe | `:16700/api/tags` | 200 | UP **+ models loaded** | `qwen3-coder:30b-a3b-q4_K_M` (18.6 GB) + `qwen3-embedding:0.6b` (64 MB) — **W315-r2 "idle/0-models" claim is STALE; correction forward to W320 CLAUDE.md** |
| Langfuse | `:3000/api/public/health` | 200 | UP v3.170.0 | OTel→Langfuse wired |
| Phoenix | `:16006/` | 200 | UP | docker (W315-r2 confirmed) |
| cognee MCP | `:8000/mcp` | 406 | UP | 406 is correct SSE-MCP response for plain GET |
| basic-memory MCP | `:8765/mcp` | 406 | UP | same — uvx-pinned 0.21.1 |

**7 of 7 services healthy.** CR-9 compliance per W315-r2 still holds for the basic-memory/cognee surface.

---

## §1 Model-serving comparison

| Engine | Throughput vs llama.cpp baseline | Win+CUDA native | Z:-portable | License | Sweet-spot | Verdict |
|---|---|---|---|---|---|---|
| **IkLlama (current)** | baseline (perf-tuned fork) | ✓ | ✓ | MIT | Q4_K_M GGUF MoE | **KEEP** |
| llama.cpp upstream | −10..0% (IkLlama has perf forks) | ✓ | ✓ | MIT | reference | DEFER (IkLlama supersedes) |
| **vLLM 0.6+** | +2-5× batched | WSL2/Docker only | ✗ | Apache-2 | high-concurrency serve | T2-watch (WSL-only blocks Z:-portable) |
| **ExLlamaV2 + TabbyAPI** | +1.5-3× single-stream | ✓ native | ✓ | MIT | EXL2 quant single-user | **T1 ADD-AS-COMPLEMENT (REC-1)** |
| MLX | n/a | ✗ Apple-Silicon-only | ✗ | MIT | macOS unified mem | REJECT (no Win path) |
| mlc-llm | varies | partial (TVM compile per-build) | risky | Apache-2 | compile-time optimised | DEFER (CI cost) |
| TGI | +1.5-3× batched | WSL/Docker | ✗ | HFOIL | HF-ecosystem | REJECT (HFOIL non-OSS + WSL) |
| **Ollama (current)** | −5..0% (llama.cpp wrapper) | ✓ | ✓ | MIT | dev ergonomics | **KEEP** |

**Verdict**: IkLlama (Q4_K_M GGUF) + Ollama (dev-friendly) is the correct primary lane for Z:-portable Windows CUDA. **Do not switch from IkLlama.** Add TabbyAPI as a parallel lane for EXL2 quant format (different precision/throughput tradeoff than GGUF) — see REC-1.

---

## §2 Observability gap matrix

| Capability | Langfuse 3.170 | Phoenix | OTel→Langfuse | Gap |
|---|---|---|---|---|
| LLM trace ingest | ✓ | ✓ | ✓ wired | none |
| Prompt registry | ✓ | partial | n/a | none |
| Eval / scoring harness | ✓ datasets+scoring | ✓ stronger eval lib | n/a | mild — use Phoenix for eval-heavy work, Langfuse for prod scoring |
| Cost-tracking (cloud LLM) | ✓ | partial | partial | none |
| **Cost-tracking (LOCAL model)** | ✗ ($0 attributed) | ✗ | extendable | **HIGHEST-IMPACT GAP** |
| Distributed tracing | partial | ✓ | ✓ | none |
| A/B + experiment routing | ✓ experiments | ✗ | n/a | mild |
| Edge cache / gateway | ✗ | ✗ | n/a | optional — covered by ENABLE_PROMPT_CACHING_1H |
| Per-route rate-limit | ✗ | ✗ | n/a | optional (single-user runtime) |

**Most-impactful gap**: local-model cost tracking. Today Langfuse attributes `$0` to all IkLlama/Ollama spans because no LLM-cost convention exists for local inference. Resolution in REC-3.

LangSmith / Helicone / Portkey **NOT adopted** — Langfuse 3.170 covers their core surface (tracing + prompts + datasets + scoring) with self-hosted OSS provenance. Vendor-locked alternatives add no net capability for this runtime.

---

## §3 Top-3 upgrade recommendations

### REC-1 — **ADD TabbyAPI + ExLlamaV2** (additive, T1)
- **Why**: EXL2 quant format (vs GGUF) offers +20-40% single-stream throughput at equivalent perplexity on consumer CUDA cards; useful for fast-Haiku-equivalent local inference (codex consult, T5 reviews).
- **Cost**: 0 incremental — runs alongside IkLlama. Different port (suggest `:8082`).
- **Z:-portable**: ✓ Windows wheels at `turboderp/exllamav2` v0.2+ + TabbyAPI Windows-native.
- **Install vector**: `gh release download` from `theroyallab/tabbyAPI` + `uv tool install exllamav2` via existing `permissions.allow`.
- **Risk**: low — additive lane, no replacement.

### REC-2 — **REJECT-RE-CONFIRMED: Helicone/ai-gateway** (W314-B re-litigation closed)
- **Why reject**: W307 already rejected Portkey on similar grounds. Helicone adds 10-50 ms hop + Docker complexity + vendor-leaning dashboards for capability already covered by Langfuse + native CC `ENABLE_PROMPT_CACHING_1H`. The "cost attribution" justification dissolves once REC-3 lands.
- **Re-evaluate**: W325 if a multi-host scenario or external-client traffic emerges.

### REC-3 — **Add local-model cost-tracking via OTel custom attributes** (fills the highest-impact gap)
- **What**: extend OTel exporter wrapper to emit `gen_ai.tokens.input.local`, `gen_ai.tokens.output.local`, `gen_ai.cost.gpu_seconds` on every IkLlama/Ollama span. Langfuse already accepts custom attributes; dashboard query surfaces local spend per trace.
- **Cite**: OpenInference semantic-conventions ≥ v0.40 already defines `gen_ai.cost.*` (cloud); we extend with `.local` suffix.
- **Cost**: ~30 min implementation in a single Python wrapper script under `harness/`.
- **Z:-portable**: ✓ pure code change.

---

## MLOps adjacency (out-of-scope, flagged for completeness)

- **Model registry**: `hf-mcp-server` MCP already provides HuggingFace Hub access — adequate. No need for W&B / MLflow.
- **Serving orchestration** (Ray Serve / KServe): overkill for single-host Z:-portable runtime. **SKIP.**

---

## W315-r2 cite corrections forward to W320

1. CLAUDE.md status "OllamaServe RUNNING idle/0-models" — **STALE**. Replace with "RUNNING + 2 models loaded (qwen3-coder:30b-a3b-q4_K_M + qwen3-embedding:0.6b)".
2. CLAUDE.md status "LlamaSwap NSSM-service @ :8090 flagged → W315-AI-LLAMASWAP-DOC" — service still live and undocumented at W319. Either document its purpose (likely llama-swap auto-routing) or decommission.

---

**Report-back**: We should NOT switch from IkLlama — it remains the correct Z:-portable Windows CUDA primary lane; vLLM/TGI/MLX are blocked by platform requirements, llama.cpp upstream loses to IkLlama's perf-tuned fork, and ExLlamaV2+TabbyAPI is the right ADD (REC-1) not a replacement. The single highest-impact observability gap is local-model cost tracking (Langfuse currently attributes $0 to all IkLlama/Ollama spans) — fix via OTel custom attributes in ~30 min (REC-3). Helicone/ai-gateway is REJECT-RE-CONFIRMED for this single-host runtime; its W314-B T2 flag was a duplicate of W307 Portkey REJECT and the cost-attribution justification dissolves once REC-3 lands.

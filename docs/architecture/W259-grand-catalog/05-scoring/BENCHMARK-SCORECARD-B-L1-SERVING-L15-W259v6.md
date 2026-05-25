# W259 v6 — BENCHMARK SCORECARD B: L1 Router/Gateway · Layer-C LLM Serving · L1.5 Memory

> **Mission (W259 Wave-6 Benchmark Agent B):** For each of L1 (Cross-model Router/Gateway), Layer-C (LLM Serving), and L1.5 (Memory), (1) identify the **canonical hard benchmark** from an *independent* source, (2) rank SOTA repos by that benchmark, (3) re-score on the W259 23-dimension matrix with **D8 sourced from independent adoption data only**, (4) flag every **vendor-marketing** benchmark claim.
>
> **Authority:** W259 Wave-6 Benchmark Re-Audit. Supersedes the benchmark-prose of `02-layer-deepdive/LAYER-C-evals-obs-serving-routers.md` §3/§4 and ratifies `03-deepdive/MEMORY-LAYER-RECONCILED-W259v4.md` §2 with cross-checks.
>
> **Method:** re-read MASTER-SCORING-MATRIX-W259.md + LAYER-C deepdive + MEMORY-LAYER-RECONCILED-W259v4.md + CROSS-LAYER-BENCHMARK-REAUDIT-W259v4.md; **9 independent exa.ai web searches** (gateway-benchmark leaderboards, SemiAnalysis InferenceMAX/InferenceX, LongMemEval cross-system evals) + GitHub repo-metadata probes (litellm, vllm, sglang, hindsight) + 2026-Q1/Q2 independent benchmark repos.
>
> **Date:** 2026-05-16 · **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.

---

## §0 — Executive summary (the three benchmark verdicts)

| Layer | Canonical hard benchmark | Independent? | W259-prior verdict | W259-v6 corrected verdict |
|---|---|---|---|---|
| **L1 Router/Gateway** | **`ferro-labs/ai-gateway-performance-benchmarks`** (reproducible k6 suite, 5 gateways, native processes) + **Kong `kong_ai_gateway-portkey-litellm-benchmark`** (AWS EKS, WireMock, decK) | **PARTIAL** — both are vendor-run (Ferro Labs & Kong each benchmark *their own* gateway as winner) but **both publish the harness + raw configs and agree on the cross-vendor ordering**. No fully-neutral peer-reviewed gateway benchmark exists (confirmed gap). | LiteLLM T1 INSTALL (88); Bifrost "50× faster" (Tier-C); Portkey enterprise-tilt | **LiteLLM T1 INSTALL — disposition CORRECT, retained.** Strip every "50×" / "859% faster" claim. Real independent spread: LiteLLM ~175-602 RPS (CPU-bound) vs Go gateways 4-15× higher RPS — **but the gap is operationally irrelevant at solo+5 scale** (LiteLLM overhead 8-20 ms vs 500ms-5s model latency). |
| **Layer-C LLM Serving** | **SemiAnalysis InferenceMAX → InferenceX(v2)** (`github.com/InferenceMAX/InferenceMAX`; public GitHub Actions; weekly auditable GitHub Releases; runs on real target hardware) | **YES — genuinely independent** | vLLM production-primary, SGLang agent-tilt, TGI mindshare-decline (CROSS-LAYER-REAUDIT §6 = CLEAN) | **RATIFIED CLEAN.** Ordering holds: **vLLM (production primary) ≈ TensorRT-LLM (peak) > SGLang (TTFT/disagg leader) > TGI (declining)**. The one defect: the "3.67× vLLM over TGI" arxiv number is a single cherry-picked config — disposition does not depend on it. |
| **L1.5 Memory** | **LongMemEval** (Wu et al., ICLR 2025; arXiv 2410.10813; end-to-end QA accuracy — retrieve+generate+GPT-4o-judge) | **benchmark = independent (ICLR); leaderboard numbers = NOT** | (W259-v4) OMEGA 95.4 / Mastra 94.87 / hindsight 91.4 / letta 83.2 / supermemory 81.6 / Zep 71.2 / mem0 49 | **W259-v4 ranking RATIFIED with one hard caveat**: the *ordering* is correct, but **the leaderboard's absolute numbers are judge-uncontrolled** — independent reruns show a **52-point swing from judge choice alone** and put Supermemory at **15.8%** (not 81.6%) and mem0 at **66%** (not 49% *or* 94%). **Only Hindsight's 91.4% is independently reproduced.** |

**Cross-layer finding:** Layer-C is the *only* clean layer — because InferenceMAX is a true third-party CI benchmark. L1 and L1.5 both rank on vendor-run or judge-uncontrolled benchmarks; for both, the **W259 disposition is nonetheless correct** because it does not actually depend on the contaminated number (L1: LiteLLM wins on ecosystem+license, not RPS; L1.5: Hindsight wins on independent-reproduction+native-CC, not raw score).

---

# LAYER 1 — CROSS-MODEL ROUTER / GATEWAY

## §1.1 — Canonical hard benchmark

**Named benchmark:** There is **no peer-reviewed, fully-neutral LLM-gateway benchmark.** The independent cross-check confirms this gap explicitly — `kunalganglani.com/blog/llm-api-latency-benchmarks-2026` (2026-03-07): *"There's no large-scale, peer-reviewed benchmark study that systematically measures gateway overhead across major platforms as of early 2026 — this remains a gap in public LLM infrastructure research."*

The **two best-available** benchmarks, both with **published reproducible harnesses**:

1. **`ferro-labs/ai-gateway-performance-benchmarks`** (GitHub, created 2026-03-02) — reproducible k6 + wrk suite; **all 5 gateways run as native processes** (LiteLLM, Bifrost, Kong, Portkey, Ferro Labs) against a 60ms-fixed-latency Go mock upstream; GCP n2-standard-8; measures pure gateway overhead, RPS at 50/150/300/500/1000 VU, p50/p95/p99/p99.9, SSE TTFB. **Caveat: Ferro Labs makes the Ferro Labs AI Gateway** → it benchmarks itself as co-winner (E1). But the harness is open + the *competitor* numbers are the load-bearing ones.
2. **`Kong/kong_ai_gateway-portkey-litellm-benchmark`** (GitHub, created 2025-06-15; **3★, 2 contributors**) — AWS EKS 1.32, WireMock mock LLM, c5.4xlarge (16 vCPU), k6 400 VU / 1000 prompt tokens, **default config (untuned)**, decK + Konnect. **Caveat: Kong makes Kong AI Gateway** → benchmarks itself as winner (E1).

**Why "partial-independent" not "vendor-marketing":** Unlike Maxim's `getmaxim.ai` page (a *marketing landing page* with a "Live Benchmark Simulation" animation and `schema.org` `publisher: Maxim AI`), Ferro Labs and Kong both ship the **actual k6/decK harness + configs in a public Git repo** that anyone can clone and re-run. They are vendor-run but **audit-able and reproducible**, and **their cross-vendor orderings agree** with each other and with LiteLLM's own honest benchmark. That convergence is the signal.

**Independent convergent finding (the real numbers, vendor-marketing stripped):**

| Source (independence) | LiteLLM | Portkey | Bifrost (Go) | Kong (Go) | Method |
|---|---|---|---|---|---|
| **Ferro Labs repo** (vendor, harness-open) | **175 RPS** ‡ CPU-bound ceiling | 851-891 RPS § event-loop plateau | 2,441 RPS @150VU then **0 †** (pool starvation ≥300VU) | 2,443-15,891 RPS | k6 native, 60ms mock |
| **Kong repo** (vendor, harness-open) | 2,740 RPS | 10,400 RPS | (not tested) | 23,600 RPS | k6 EKS, WireMock |
| **LiteLLM's OWN docs** (`docs.litellm.ai/docs/benchmarks`) | **8ms P95 @ 1k RPS** (4 instances); 12ms overhead (2 inst); 2ms (4 inst) | P95 230ms (4×) | — | — | Locust, fake-openai |
| **MLflow PR #21561** (independent — MLflow's own gateway, benchmarks LiteLLM as 3rd-party) | 461-849 RPS (tracking ON) / 602 RPS (no tracking) | 928-932 RPS | — | — | aiohttp, fake-openai, multi-instance |
| **DEV.to 5-gateway 3-week test** (`pranay_batta`) | ~8ms overhead | moderate | **11µs** overhead | 3-5ms | Go harness |

**Convergent truth:** LiteLLM (Python/asyncio) is **CPU-bound** — single-instance ceiling 175-602 RPS; scales by adding instances (4× → ~1,170 RPS, 8ms P95). Go-native gateways (Bifrost, Kong, Ferro Labs) sustain 4-15× higher single-process RPS. **This is real and reproducible.** What is **NOT** real is Maxim's "50× / 54× / 48× faster" — see §1.3.

## §1.2 — Ranked table (23-dimension scores)

Ranked by **canonical-benchmark fit for a Windows solo-operator** — i.e. the relevant metric is **not** peak RPS (the operator runs solo+5, never approaching 175 RPS) but **license + native-CC + provider-coverage + reversibility**. RPS is reported but **down-weighted** because at solo scale gateway overhead is in the noise.

D-scores re-derived from MASTER-SCORING-MATRIX schema. **D8 = INDEPENDENT adoption only** (no vendor self-description). D3 noted where star-count is the only signal (E4-flagged per CROSS-LAYER-REAUDIT §1).

| Rank | Repo | D1 lic | D2 fresh | D3 star/depth | D4 prov | D5 maint | D8 **indep-adopt** | D11 native-CC | D15 Win | D17 trust | D19 revert | D20 dup | Independent benchmark input | Composite | Disposition |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---|
| **1** | **BerriAI/litellm** | 8 (open-core NOASSERTION + commercial `enterprise/`) | 10 | 10 | 8 | 10 | **10** (LangChain + LlamaIndex + Langfuse + Phoenix + huge plugin-ecosystem dependence — ≥5 orgs, INDEPENDENT) | 8 (`litellm-skills` repo = official CC skills, Mar 2026) | 9 | 8 (Mar-2026 security incident — see §1.3) | 9 | 7 | LiteLLM 175-602 RPS single / ~1,170 4×, **8ms P95** (own honest bench, Locust) — CPU-bound but ample at solo scale | **86** | **T1 INSTALL — retained correct** (de-facto OSS router; DeepSeek-V4 escape valve) |
| **2** | **Portkey-AI/gateway** | 10 (MIT, full) | 10 | 8 | 8 | 9 | 8 (Portkey routes 400B+ tokens/mo per Portkey-AI/models GitHub — partial-independent; firecrawl 2025-12 endorsement) | 6 (no first-party CC plugin) | 9 (TypeScript) | 9 | 9 | 7 | 851-932 RPS (Ferro+MLflow agree); semantic cache 40-60% hit | **82** | **T2 STUDY-PILOT** (MIT-clean enterprise tilt; pilot only if guardrails/prompt-versioning become load-bearing) |
| **3** | **maximhq/bifrost** | 10 (Apache-2.0, full) | 10 | 8 | 6 (single org — Maxim AI) | 9 | **4** (single-org Axis-1 FAIL; no independent production cite) | 5 (no CC plugin) | 8 (Go binary via npx) | 7 (Go core OSS; **hosted side closed-source** per relayplane) | 8 | 7 | 2,441 RPS then **connection-pool starvation → 0 at ≥300 VU** (Ferro Labs independent) — fast but **fragile under load** | **72** | **T3 CITE-PATTERN / WATCH** — emerging-SOTA, re-audit Q3 2026; **NOT** an install (Axis-1 single-org; Ferro Labs found it collapses ≥300VU) |
| **4** | **vllm-project/semantic-router** | 10 (Apache-2.0) | 10 | 6 (new, 2025-08) | 10 (vLLM org) | 9 | 5 (vLLM-ecosystem only) | 4 | 6 (Linux/GPU-tilt) | 8 | 7 | 8 | n/a (Mixture-of-Models intelligent router; not a throughput gateway) | **70** | **T3 WATCH** (relevant only if local-model MoM routing becomes load-bearing) |
| **5** | **lm-sys/RouteLLM** | 10 (Apache-2.0) | **0** (last push 2024-08-10 — STALE 21mo) | 4 | 8 (LMSYS) | 2 | 4 | 3 | 7 | 7 | 8 | 6 | n/a (prompt-difficulty cost-routing; superseded by LiteLLM built-in routing) | **48** | **REJECT-FOR-FIT** (stale 21 months) |
| — | `EinStack/glide` | 10 | 0 (2024-08-12 stale) | 2 | 6 | 1 | 2 | 2 | 7 | 6 | 8 | 5 | n/a | **~38** | **REJECT** (abandoned 2024-08) |

**Scoring notes (L1):**
- **LiteLLM 86** (was 88 in master matrix): −2 because D1 is open-core NOASSERTION (not clean MIT/Apache) and D17 dings for the **March-2026 security incident** (flagged by `dev.to/pranay_batta` buyer's-guide — *"Factor in the March 2026 security incident"*). The disposition **T1 INSTALL is unchanged and correct** — LiteLLM's win rests on D8 (genuine ≥5-org independent ecosystem dependence) + D11 (official `litellm-skills` CC integration) + 100+ providers, **not on a throughput benchmark**.
- **Bifrost 72** (down from any "challenger" framing): the Ferro Labs independent benchmark is *devastating* for Bifrost — it sustained 2,441 RPS at 150 VU then **dropped to 0 RPS with 10M+ failures at ≥300 VU** (connection-pool starvation). Maxim's own page only ever tests Bifrost in isolation at fixed RPS; the **one independent multi-gateway test that pushed concurrency found Bifrost fragile.** D8 = 4 (single-org, Axis-1 FAIL). Bifrost is **WATCH, not install**.

## §1.3 — Vendor-marketing flags (L1 — the worst-contaminated layer)

| # | Claim | Source | Class | Verdict |
|---|---|---|---|---|
| **VM-1** | **"Bifrost 50× / 54× / 48× faster than LiteLLM"; "9.5× throughput"; "<100µs overhead at 5k RPS"; "1000+ models"** | `getmaxim.ai/bifrost/resources/benchmarks` + `dev.to/pranay_batta/how-we-benchmarked-bifrost` — **Maxim AI makes Bifrost** | **E1 (publisher-run) + E5 (marketing-as-fact)** | **STRIP ENTIRELY.** The `getmaxim.ai` page has `schema.org publisher: Maxim AI`, a "Live Benchmark Simulation" *animation*, and compares Bifrost P50 804ms vs "LiteLLM P50 38.65s" — a 38-second LiteLLM P50 is absurd and indicates a misconfigured/overloaded LiteLLM (2 vCPU t3.medium, no multi-instance). LiteLLM's *own* honest benchmark shows 8ms P95. The "50×" is a **deliberately crippled-competitor** number. The independent Kong test (also vendor) shows **8.6×**, and Ferro Labs shows LiteLLM CPU-bound but functional. **No independent benchmark shows any gateway 50× LiteLLM.** |
| **VM-2** | **"Kong AI Gateway 228% faster than Portkey, 859% faster than LiteLLM"** | `duragraph.ai/blog/llm-gateway-wars` quoting Kong; Kong's own `kong_ai_gateway-portkey-litellm-benchmark` repo | **E1 (publisher-run)** | **Hedge as Kong-favored.** Kong's repo *is* reproducible (decK + k6 configs public) and runs competitors at **default untuned config** — honest about that. But Kong measures **itself as winner**. The 8.6× LiteLLM spread is real-ish *for raw single-instance RPS* but Kong is a general API gateway, not an LLM-native router, and the comparison ignores LiteLLM's multi-instance scaling. `tokenmix.ai` independently labels this *"Vendor benchmark — treat as Kong-favored."* |
| **VM-3** | **"Bifrost adds <100µs overhead"** stated as fact in LAYER-C §4.1/§4.2 comparison table | LAYER-C deepdive inherited it from Maxim | **E5 (marketing-claim-as-fact in a comparison table)** | **CORRECT LAYER-C §4.** Per CROSS-LAYER-REAUDIT §9.4 P1: replace with *"Maxim AI (Bifrost's vendor) self-benchmarks; the one independent multi-gateway test (Ferro Labs) found Bifrost collapses to 0 RPS at ≥300 concurrent VU due to connection-pool starvation. LiteLLM's own overhead is 8-20ms — negligible at solo+5 scale."* |
| **VM-4** | **"opencode 160,923★"** used to justify a router-adjacent T1 disposition | MASTER-MATRIX row 11 | **E4 (star-count) + unverified** | Flagged in CROSS-LAYER-REAUDIT §1.3 / W258-V13 §3.7 as probable fabrication. Not an L1 router but noted: the matrix carries unverified precise star counts. |
| **VM-5** | **"Bifrost 1000+ models" vs LiteLLM "100+"** | Maxim marketing | **E5** | DEV.to independent 3-week test found Bifrost supports **19 providers**, LiteLLM **100+**. The "1000+" conflates models with providers and is marketing inflation. |

**L1 net:** This is the **most vendor-contaminated layer in W259.** Every "Nx faster" gateway number traces to a company selling that gateway. The corrective is the same as CROSS-LAYER-REAUDIT §9.4: **strip the multipliers, keep LiteLLM at T1 INSTALL** (its win is ecosystem + license-escape-valve + native-CC, not speed), demote Bifrost to **WATCH** (the one independent load test found it fragile, not fast).

## §1.4 — Corrected disposition (L1)

```
L1 ROUTER/GATEWAY — corrected
  PRIMARY (T1 INSTALL):  BerriAI/litellm  — composite 86
     • de-facto OSS router; 100+ providers; first-class Anthropic + Bedrock + Vertex
     • DeepSeek-V4 / local-model escape valve via env (the actual operator use-case)
     • CPU-bound at ~175-602 RPS single-instance — IRRELEVANT at solo+5 scale
     • official litellm-skills CC integration (Mar 2026)
     • CAVEAT: open-core NOASSERTION licence; factor the March-2026 security incident
  STUDY-PILOT (T2):  Portkey-AI/gateway — composite 82
     • MIT-full (cleaner licence than LiteLLM); pilot ONLY if guardrails / prompt-
       versioning / semantic-cache become load-bearing
  WATCH (T3, re-audit Q3 2026):  maximhq/bifrost — composite 72
     • Apache-2.0, genuinely fast in isolation BUT single-org (Axis-1 FAIL) AND the
       one independent multi-gateway load test (Ferro Labs) found it collapses to
       0 RPS at >=300 concurrent VU. NOT an install.
  REJECT:  RouteLLM (stale 21mo), EinStack/glide (abandoned 2024-08)
```

---

# LAYER C — LLM SERVING (T1 fallback for local models)

## §C.1 — Canonical hard benchmark

**Named benchmark:** **SemiAnalysis InferenceMAX → InferenceX (v2)** — `github.com/InferenceMAX/InferenceMAX`; live results at `inferencemax.ai` / `inferencex.com` / `inferencex.semianalysis.com`.

**Why this is genuinely independent (the rare clean case):**
- **SemiAnalysis is a third-party research firm** — it does not make vLLM, SGLang, TGI, or any GPU. It is the analyst, not a vendor.
- **Fully open + auditable:** *"produced by public GitHub Actions ... the recipe lives in [the repo], each run executes on the actual target hardware, full logs and artifacts are publicly [available], published as a public GitHub Release every week so the historical dataset stays auditable. Click any point [to] jump straight to the run that produced it."* (`inferencex.com`).
- **Continuous CI** — runs daily/weekly on real silicon (B200, H200, H100, MI355X, MI325X, MI300X) across DeepSeek, gpt-oss, Llama, Qwen. Catches software-driven perf changes on the *same* hardware (e.g. it caught SGLang 0.5.6's 1.79× lift 28 days after release).
- **Both vendors publish *into* it:** NVIDIA's own blog (`developer.nvidia.com`) and vLLM's own blog (`vllm.ai/blog/blackwell-inferencemax`) both cite InferenceMAX as the neutral scoreboard — *"SGLang publishes results through SemiAnalysis InferenceX (a continuously running third-party benchmark); vLLM publishes internal benchmarks on their blog"* (`mubibai.com` 2026-04-15). When competitors agree to be measured by the same external CI, that is real Axis-1 convergence.

**Contrast with L1:** there is no "InferenceMAX for gateways." That is precisely why Layer-C is clean and L1 is contaminated.

**Independent throughput data (InferenceMAX + multi-source convergent, May 2026):**

| Engine | tok/s (Llama-3.3-70B 8×H200, conc 32) | p50 TTFT | p99 TTFT | p50 TPOT | InferenceMAX-class evidence |
|---|---:|---:|---:|---:|---|
| **TensorRT-LLM** | 5,210 (IoT-DT Q2'26) | 75ms | 118ms | 7.6ms | InferenceMAX: "TRT continues to framemog" on B200 Dynamo; peak throughput, tightest p99 |
| **SGLang** | 4,880 | 79ms (best TTFT) | 135ms | 7.9ms | InferenceMAX: 25× gain GB300 NVL72 vs H200; 1.79× lift 0.5.5→0.5.6 caught by CI; **best disagg-prefill** (~5× at large concurrency, 1000× fewer RDMA reqs) |
| **vLLM** | 4,250 | 82ms | 140ms | 8.2ms | InferenceMAX: up to 4.3× Blackwell-vs-Hopper; steady gains 0.11.2→0.13.0; **widest hardware** (NVIDIA+AMD+TPU+Gaudi+Ascend); only one with **NVFP4** + Anthropic Messages API |
| **TGI** | 3,120 | 94ms | 165ms | 9.1ms | Not in InferenceMAX's headline framework set; trailing on every axis; last push 2026-03-21 |

(InferenceMAX itself reports per-GPU tok/s on DeepSeek/gpt-oss at FP4/FP8; the Llama-70B table above is the multi-source convergent cross-check from `iotdigitaltwinplm.com` Q2-2026 + `mubibai.com` + `charleschen.ai` wiki — all non-vendor, all converging on the same ordering.)

## §C.2 — Ranked table (23-dimension scores)

Ranked by **InferenceMAX-grounded production-serving fitness**. Note: Layer-C is **T1 *fallback*** for the operator (Anthropic models are API-only; serving matters only for local Qwen/DeepSeek/Llama escape-valve).

| Rank | Repo | D1 lic | D2 fresh | D3 star/depth | D4 prov | D5 maint | D8 **indep-adopt** | D14 frontier | D15 Win | D18 codex-verif | D20 dup | Independent benchmark input | Composite | Disposition |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---|
| **1** | **vllm-project/vllm** | 10 (Apache-2.0) | 10 (push daily; v0.20.2) | 10 (~79.8k★, 2000+ contributors) | 9 (UC Berkeley Sky Lab) | 10 | **10** (UC Berkeley + Anyscale + NVIDIA NeMo-RL + llm-d + Ray + Red Hat — INDEPENDENT ≥5-org; InferenceMAX co-development) | 9 | **5** ⚠ (Linux/CUDA; Windows = WSL2/Docker only — fallback role) | 8 | 7 | InferenceMAX: 4.3× Blackwell gain; balanced top throughput; **only engine with NVFP4 + Anthropic Messages API** | **86** | **T2 STUDY-PILOT** (production-primary serving reference; install only when local-model fallback becomes load-bearing) |
| **2** | **sgl-project/sglang** | 10 (Apache-2.0) | 10 (v0.5.10; push 2026-04) | 9 (~26k★, 460 contributors) | 9 (LMSYS / sgl-project) | 10 | **9** (xAI + AMD + NVIDIA + Intel + LinkedIn + Cursor + Oracle/Google/Azure/AWS clouds — INDEPENDENT, "400,000 GPUs"; InferenceMAX scoreboard) | 9 | 5 ⚠ (Linux/CUDA) | 8 | 7 | InferenceMAX: best TTFT; 25× GB300 gain; **disagg-prefill leader** ~5× at scale; EAGLE-3 spec-decode | **85** | **T2 STUDY-PILOT** (agent / structured-output / disagg tilt; **lacks NVFP4** — gates Blackwell use) |
| **3** | **NVIDIA/TensorRT-LLM** | **7** (NOASSERTION) | 10 (push 2026-05-16) | 9 (~13.7k★) | 10 (NVIDIA) | 10 | 10 (NVIDIA-stack; InferenceMAX top-throughput) | 8 | 5 ⚠ (Linux/CUDA; **2-4hr compile**) | 7 | 7 | InferenceMAX: peak throughput, tightest p99 on B200 Dynamo | **80** | **T2 STUDY-PILOT (vs vLLM)** — peak NVIDIA throughput but NOASSERTION licence + 2-4hr compile + operational complexity gate adoption |
| **4** | **huggingface/text-generation-inference** (TGI) | 10 (Apache-2.0) | **4** ⚠ (last push 2026-03-21 — declining cadence vs vLLM-daily) | 7 (~10.9k★) | 9 (Hugging Face) | 6 | 6 (HF-ecosystem only; mindshare-decline) | 6 | 5 ⚠ | 7 | 7 | InferenceMAX-class: trailing every axis; no NVFP4; "no advantages over vLLM" (charleschen wiki) | **66** | **T3 CITE-PATTERN / SKIP** — mindshare-decline; *"generally not recommended"* (independent wiki). Use only inside HF-deep ecosystems. |

**Scoring notes (Layer-C):**
- **vLLM 86** — confirms MASTER-MATRIX row 22 (86). The D15=5 (Windows penalty) is correct and load-bearing: this is *why* serving is a **T2 fallback** not a T1 install for a Windows operator. Composite is held up by a genuine ≥5-org **independent** D8 + InferenceMAX co-development.
- **SGLang 85** — the InferenceMAX scoreboard makes SGLang's adoption claims **verifiable** (xAI/Cursor/Oracle are independent of sgl-project). The −1 vs vLLM is NVFP4 absence (charleschen wiki: *"Stay on vLLM until SGLang supports NVFP4"*).
- **TensorRT-LLM 80** — confirms MASTER-MATRIX row 98 (80). D1=7 NOASSERTION is the ceiling-setter.
- **TGI 66** — D2=4 is the decisive deflation; the engine is not *broken*, it is *un-maintained relative to the field*.

## §C.3 — Vendor-marketing flags (Layer-C — minimal, the clean layer)

| # | Claim | Source | Class | Verdict |
|---|---|---|---|---|
| **VM-C1** | **"3.67× vLLM speedup over TGI"** stated in LAYER-C §3.2 | `arxiv 2511.17593` (one LLaMA-2-7B @ 100-concurrent config) | **E2-adjacent (single cherry-picked config)** | **Mild.** The 3.67× is real *for that one config*; `explore.n1n.ai` shows TGI within 15-25% of vLLM at batch=32. **Disposition does not depend on it** — TGI's SKIP rests on D2 (maintenance cadence), not throughput. Keep the number but label it "single-config; TGI is within 15-25% at moderate batch." |
| **VM-C2** | NVIDIA blog "Blackwell up to 15× over Hopper"; vLLM blog "4.3× Blackwell gain" | `developer.nvidia.com` + `vllm.ai/blog` | **NOT a defect** | These are **vendor blogs citing the *independent* InferenceMAX framework** and are reproducible via InferenceMAX configs. Vendor-*published* ≠ vendor-*benchmarked* when the benchmark itself is the neutral third party. No flag. |
| **VM-C3** | SGLang README "400,000 GPUs", "trillions of tokens/day", "5× faster with RadixAttention" | `github.com/sgl-project/sglang` README | **E1 for the self-stats; E4-adjacent** | The "5× RadixAttention" is a 2024 self-blog number. **But** the adoption (xAI/Cursor/Oracle/AMD) is corroborated by InferenceMAX participation + independent comparison articles → D8 survives on independent grounds. The raw "5×" should not enter scoring; the InferenceMAX TTFT-leadership finding should. |

**Layer-C net: RATIFIED CLEAN.** CROSS-LAYER-REAUDIT §6's verdict holds. The ordering **vLLM ≈ TensorRT-LLM (peak) > SGLang (TTFT/disagg) > TGI (declining)** rests on a genuine third-party CI benchmark. The only correction is cosmetic (label the 3.67× as single-config).

## §C.4 — Corrected disposition (Layer-C)

```
LAYER-C LLM SERVING — ratified (T1 fallback only — Anthropic models are API-only)
  PRODUCTION-PRIMARY (T2 STUDY-PILOT):  vllm-project/vllm — composite 86
     • InferenceMAX-grounded; widest hardware; only engine w/ NVFP4 + Anthropic Messages API
     • ≥5-org INDEPENDENT adoption; install when local Qwen/DeepSeek fallback is load-bearing
     • Windows = WSL2/Docker only (D15=5) — this is why it's fallback, not core
  AGENT/DISAGG TILT (T2 STUDY-PILOT):  sgl-project/sglang — composite 85
     • best TTFT + disaggregated-prefill; lacks NVFP4 (gates Blackwell)
  PEAK-NVIDIA (T2 vs vLLM):  NVIDIA/TensorRT-LLM — composite 80
     • NOASSERTION licence + 2-4hr compile gate adoption
  SKIP:  huggingface/text-generation-inference (TGI) — composite 66
     • mindshare-decline; "generally not recommended" (independent wiki)
```

---

# LAYER 1.5 — MEMORY

## §1.5.1 — Canonical hard benchmark

**Named benchmark:** **LongMemEval** (Wu/Di et al., **ICLR 2025**; arXiv 2410.10813; repo `xiaowu0162/LongMemEval`). **End-to-end QA accuracy** = retrieve from ~115k-token haystack → generate answer → **GPT-4o-2024-08-06 LLM-judge** marks correct. 500 curated questions; 5 abilities (information extraction, multi-session reasoning, knowledge updates, temporal reasoning, abstention). LongMemEval-S = 115k tokens / ~40-50 sessions; LongMemEval-M = ~500 sessions / ~1.5M tokens.

**The benchmark IS independent** (academic, ICLR-2025, peer-reviewed, MIT-released dataset). It is correctly the canonical hard yardstick — it structurally requires a memory system (long-context LLMs show a **30-60% accuracy drop** vs oracle, per the arXiv abstract). It is harder than LoCoMo (LoCoMo ~9-26k tokens fits in-context; mem0 markets LoCoMo).

**BUT the LongMemEval *leaderboard numbers* are NOT independent — three compounding problems found in W259-v6 cross-check:**

1. **No official leaderboard exists.** The "leaderboard" everyone cites is **two vendor pages**: `omegamax.co/benchmarks` (OMEGA's own) and `mastra.ai/research/observational-memory` (Mastra's own). Every cross-system table traces to one of these two. OMEGA's table lists OMEGA #1; Mastra's lists Mastra #1. Each is internally honest about *its own* methodology but neither is a neutral authority.

2. **Judge-uncontrolled — a 52-point swing from judge choice alone.** Independent finding from the **Engram team** (Rust hybrid-retrieval; posted in `MemPalace/mempalace#29`): *same 50 questions, same retrieval, same answerer (GPT-5.4), three judges → Lenient prompt 84%, Claude Sonnet 4.6 66%, Strict prompt 32%.* **"A 52-point swing from judge choice alone. Most published numbers don't disclose the judge prompt or model."** Therefore comparing OMEGA's 95.4% (GPT-4.1 judge) to Hindsight's 91.4% (different setup) to mem0's 49% (vectorize.io's judge) is **not apples-to-apples** — the 4-point OMEGA-over-Hindsight gap is well within judge-noise.

3. **Answer-model-uncontrolled + new disconfirming datapoints.** The leaderboard mixes answer models (GPT-4.1, gpt-5-mini, gemini-3-pro, gpt-4o). W259-v6 found **two new independent reruns** that contradict the leaderboard's *absolute* numbers:
   - **`buildingjoshbetter/TrueMemory`** (independent, gpt-4.1-mini answerer, gpt-4o-mini judge ×3 majority-vote, strict `_s` variant): **mem0 = 66.0%**, **Supermemory = 15.8%** (not 81.6%!), Engram = 82.2%, BM25 = 81.6%, plain RAG/ChromaDB = 87.0%.
   - **`skynetcmd/m3-memory`** (independent): explicit disclaimer — *"Cross-system comparisons are uncontrolled: different systems use different answer models, prompts, judges, and configurations. Scores below are not directly comparable."*

   The TrueMemory Supermemory=15.8% vs leaderboard-81.6% gap is enormous and shows the leaderboard numbers are **configuration-fragile**. Even mem0 swings 49% (vectorize.io) ↔ 66% (TrueMemory) ↔ 94.4% (mem0's own SaaS) depending on harness.

**Discipline:** rank by LongMemEval **end-to-end QA**, treat all leaderboard numbers as **±15 pts uncertain** unless independently reproduced, and **explicitly flag retrieval-recall (`R@k`) numbers as non-comparable** (MemPalace #29/#314 confirm `recall_any@5` is a "metric category error" when tabled against QA).

## §1.5.2 — Ranked table — RATIFICATION of W259-v4 (23-dimension scores)

Ranked by **LongMemEval E2E QA**, with the **W259-v6 cross-check column** showing whether each number is independently reproduced. D-scores carried from `MEMORY-LAYER-RECONCILED-W259v4.md` §4 (which already applied the 23-dim schema correctly) — **ratified with cross-checks**.

| Rank | Engine | LongMemEval E2E QA | **W259-v6 independent cross-check** | D1 | D2 | D4 | D8 **indep** | D11 native-CC | D15 Win | D17 | D21 data-bound | Composite | Disposition |
|---:|---|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **OMEGA** (omega-memory) | **95.4%** (GPT-4.1) | ⚠ **self-reported, single author, UNREPRODUCED**; raw 466/500=93.2%; author iterated 76.8→95.4 over 8 runs; self-admits untested >600 memories | 10 | 10 | 5 | 4 | 9 | **6** ⚠ (own docs: "Windows untested") | 8 | 9 | **~78** | **T2 STUDY-PILOT** (Axis-1 FAIL: 1 author / ~110★; Windows-untested) |
| 2 | **Mastra OM** (mastra-ai/mastra) | **94.87%** (gpt-5-mini); **84.23%** (gpt-4o official) | ⚠ self-reported; **reproducible config published**; YC/$13M; honest gpt-4o number; footnotes Emergence's non-reproducibility | 9 | 10 | 9 | 9 | **4** ⚠ (NO native CC plugin — `@mastra/opencode` only) | 9 | 7 | 8 | **~80** | **T2 CITE-PATTERN** (Observer/Reflector pattern is gold; no CC integration) |
| 3 | **Hindsight** (vectorize-io/hindsight) | **91.4%** (gemini-3-pro); 89.0% GPT-OSS-120B; 83.6% GPT-OSS-20B | ✅ **INDEPENDENTLY REPRODUCED** — Virginia Tech Sanghani Center + Washington Post (per Pith 2026-04-02; Hindsight README states it explicitly: *"independently reproduced by research collaborators at Virginia Tech ... and The Washington Post. Other scores are self-reported by vendors"*) | 10 (MIT) | 10 | 8 | 8 | **10** (plugin + UserPromptSubmit + Stop hooks + MCP + `/hindsight-memory:create-agent` subagent skill — STRONGEST in catalog) | **10** (Docker/pip/pg0 — Windows-verified) | 9 | 9 | **~90** | **T1 INSTALL — corrected memory winner** |
| — | EmergenceMem | 86.0% "Internal" / 82.4% "Simple" | ⚠ "Internal" config **not publicly reproducible** (Mastra footnote); proprietary | 4 | 9 | 7 | 6 | 4 | 6 | 6 | 5 | **~62** | **T4 WATCH** (proprietary, unreproducible) |
| 4 | **supermemory** (supermemoryai) | 81.6-85.2% (self-reported) | ⚠ **CONTRADICTED** — `buildingjoshbetter/TrueMemory` independent rerun scored Supermemory **15.8%** (gpt-4.1-mini answerer). 65-pt gap vs self-report → number is config-fragile/unreliable | 10 | 10 | 6 | 8 | 9 | 8 | 8 | **5** ⚠ (Pro-gated, cloud) | **~78** | **T2 STUDY-PILOT** (DOWNGRADE-WATCH: independent rerun contradicts the self-reported score) |
| 5 | **letta-ai/letta** | 83.2% (operator catalog figure) | ⚠ self-reported; Letta's own LoCoMo = 74% | 10 | 10 | 8 | 8 | 4 (EXTERNAL_MCP) | 8 | 8 | 7 | **~76** | **T3 CITE-PATTERN** (harness-competitor; demo-grade CC plugin) |
| 6 | **Zep / getzep/graphiti** | **71.2%** (Zep) / 63.8% temporal | ⚠ Zep-paper self-reported BUT **consistent across OMEGA + Mastra + Pith tables** (3 independent tables agree) → most-corroborated non-self-promotional number | 10 | 10 | 9 | 9 | 9 | 8 | 9 | 8 | **~85** | **T1 INSTALL (incumbent — temporal/KG tier)** — strongest *non-self-promotional* KG; the only catalog engine supporting FalkorDB |
| 7 | **mem0ai/mem0** | **49.0%** (vectorize.io independent) ↔ **66.0%** (TrueMemory independent) | ⚠ **TWO independent evals: 49% and 66%** — both far below mem0's own SaaS-only 94.4% claim. LoCoMo ≠ LongMemEval. mem0 maintainers admit (#2800/#3943) OSS ≠ SaaS pipeline | 10 | 10 | 8 | 9 | 9 | 9 | 9 | **6** (SaaS-default) | **~74** | **T3 — DOWNGRADED from Wave-2 PRIMARY** (last/near-last on the hard benchmark) |

**RATIFICATION VERDICT:** The W259-v4 reconciled ranking — **OMEGA 95.4 / Mastra 94.87 / hindsight 91.4 / letta 83.2 / supermemory 81.6 / Zep 71.2 / mem0 49** — is **RATIFIED as the correct *ordering***, and the **T1-INSTALL pick (Hindsight) is RATIFIED as correct**. W259-v6 adds **three corrections to the W259-v4 numbers**:

1. **Hindsight's 91.4% is the ONLY independently-reproduced number** (VA Tech + WaPo). Confirmed verbatim from Hindsight's own README and Pith. This is the decisive epistemic fact: Hindsight's lower headline (vs OMEGA's 95.4%) is *worth more* because it is the only verified one. **W259-v4's choice of Hindsight over OMEGA is doubly vindicated.**
2. **Supermemory 81.6% is now CONTRADICTED** by an independent rerun (`TrueMemory` → 15.8%). W259-v6 adds a **DOWNGRADE-WATCH flag** to supermemory's row: its self-reported score failed independent reproduction by 65 points. (W259-v4 had supermemory at ~80 composite / T2 — the composite holds but the benchmark input is now flagged unreliable.)
3. **mem0 is 49% *or* 66%** — both independent, both far below the marketed 94.4%. W259-v4 used 49% (vectorize.io); W259-v6 confirms a *second* independent eval (TrueMemory, 66%) — the exact number is harness-dependent but **mem0 is unambiguously bottom-tier** on the hard benchmark either way. mem0's T3 downgrade is **ratified**.

**Additional W259-v6 finding:** the leaderboard is **judge-uncontrolled** (Engram: 52-pt swing from judge alone). Therefore the OMEGA-95.4 / Mastra-94.87 / Hindsight-91.4 spread at the top is **inside the judge-noise band** — they should be treated as a **three-way statistical tie at the top**, with Hindsight winning the tie on independent-reproduction + native-CC + Windows + MIT (exactly W259-v4's §5.3 reasoning, now reinforced).

## §1.5.3 — Vendor-marketing flags (L1.5)

| # | Claim | Source | Class | Verdict |
|---|---|---|---|---|
| **VM-M1** | **mem0 "94.4% LongMemEval"** | `mem0.ai/research`, `mem0.ai/blog/state-of-ai-agent-memory-2026` | **E1 (publisher) + E2 (SaaS-only soft path)** | **RETRACTED** (ratifies W259-v4 §0.2). The 94.4% is mem0's **hosted SaaS** (`MemoryClient`), not the OSS `Memory` class operators would install. mem0 maintainers admit this (#2800/#3943: *"the eval story for OSS isn't great"*). Independent OSS = 49% (vectorize.io) / 66% (TrueMemory). |
| **VM-M2** | **OMEGA "#1 on LongMemEval, 95.4%"** | `omegamax.co/benchmarks`, `omegamax.co/blog/number-one-on-longmemeval` | **E1 (publisher-run, single author) — unreproduced** | **Demote to STUDY-PILOT input** (ratifies W259-v4 §3.1). The number is methodology-disclosed and plausibly real, but it is a single author's self-report, **never independently reproduced**, on a self-built leaderboard that lists OMEGA #1. Self-admits untested >600 memories — the operator's long-arc `/loop` exceeds that fast. |
| **VM-M3** | **Mastra OM "highest score ever, 94.87%"** | `mastra.ai/research/observational-memory` | **E1 (publisher-run leaderboard)** | **Hedge.** Mastra's leaderboard lists Mastra #1-#3. Mastra is relatively honest (publishes the gpt-4o 84.23% "official-model" number, footnotes Emergence's non-reproducibility, publishes a reproducible config) — but it is still a vendor scoreboard. The *pattern* (Observer/Reflector) is gold; the *ranking* is self-promotional. |
| **VM-M4** | **Supermemory "81.6-85.2% LongMemEval"** | supermemory self-report (via OMEGA/Mastra tables) | **E1 + CONTRADICTED by independent rerun** | **NEW FLAG (W259-v6).** `buildingjoshbetter/TrueMemory` independently scored Supermemory **15.8%** — a 65-point gap. Either Supermemory's self-report uses a radically different (favorable) harness, or TrueMemory mis-integrated it — but the self-reported number **cannot be trusted as-is**. Supermemory row gets a DOWNGRADE-WATCH. |
| **VM-M5** | **MemPalace "96.6% / 100%", rohitg00/agentmemory "95.2% R@5", ByteRover/Cipher "92.2% LoCoMo"** | repo READMEs | **E1 + metric-category-error** | **Non-comparable — do NOT rank against QA scores.** MemPalace #29/#314 (independent audits) establish `recall_any@5` is *retrieval recall*, not E2E QA — *"a metric category error"*; MemPalace maintainers **retired the headline**, honest E2E QA = ~66.8%. Cipher's 92.2% is **LoCoMo** (soft benchmark) self-attestation with **no LongMemEval score** — per CROSS-LAYER-REAUDIT §9.1, Cipher cannot hold a "benchmark leader" label. |
| **VM-M6** | **claude-mem "T1 BENCHMARK-FIRST" / "~76,000★"** | MASTER-MATRIX row 6 | **E4 + unbacked label** | claude-mem has **no published LongMemEval/LoCoMo number at all** (ratifies CROSS-LAYER-REAUDIT §9.1). The "BENCHMARK-FIRST" disposition is unbacked; star count unverified. Re-label "T1 INSTALL" (drop "BENCHMARK-FIRST") per the reaudit. |

## §1.5.4 — Corrected disposition (L1.5)

```
L1.5 MEMORY — W259-v4 ranking RATIFIED (with W259-v6 cross-checks)
  PRIMARY (T1 INSTALL):  vectorize-io/hindsight — composite ~90
     • LongMemEval 91.4% — the ONLY independently-reproduced score (VA Tech + WaPo)
     • MIT; Windows-verified (Docker/pip/pg0); strongest native-CC integration in catalog
       (plugin + UserPromptSubmit/Stop hooks + MCP + /hindsight-memory:create-agent skill)
     • top-tier is a 3-way judge-noise tie (OMEGA 95.4 / Mastra 94.87 / Hindsight 91.4);
       Hindsight wins the tie on reproduction + Windows + MIT + CC-integration
  TEMPORAL/KG INCUMBENT (T1 INSTALL):  getzep/graphiti — composite ~85
     • Zep 71.2% — best NON-self-promotional number (3 independent tables agree)
     • only catalog engine supporting FalkorDB; install when temporal queries load-bearing
  STUDY-PILOT lane:  OMEGA (~78, verify Windows first) · Mastra OM (CITE-PATTERN — no CC plugin)
     · doobidoo/mcp-memory-service (~84, honest R@k, OAuth) · CaviraOSS/OpenMemory (belief-quality)
  DOWNGRADE-WATCH (NEW W259-v6):  supermemoryai/supermemory
     • self-reported 81.6% CONTRADICTED by independent rerun (TrueMemory = 15.8%, 65-pt gap)
  T3 DOWNGRADED (ratified):  mem0 — 49%/66% independent (both bottom-tier); was Wave-2 PRIMARY
  PATTERN-CITE:  Mastra Observational Memory (Observer/Reflector stable-cacheable log)
```

---

## §2 — Cross-layer benchmark-integrity summary

| Layer | Canonical benchmark | Independence grade | Top-3 (corrected) | Disposition change vs W259-prior |
|---|---|---|---|---|
| **L1 Router** | Ferro Labs + Kong reproducible suites (no neutral benchmark exists) | **PARTIAL** — vendor-run but harness-open & cross-converging | 1. LiteLLM (86) 2. Portkey (82) 3. Bifrost (72, WATCH) | LiteLLM T1 retained; **Bifrost demoted challenger→WATCH** (independent load test found it collapses ≥300VU) |
| **Layer-C Serving** | **SemiAnalysis InferenceMAX/InferenceX** | **FULL — genuine third-party CI** | 1. vLLM (86) 2. SGLang (85) 3. TensorRT-LLM (80) | **RATIFIED CLEAN** — ordering unchanged; only label-fix on the 3.67× number |
| **L1.5 Memory** | **LongMemEval** (ICLR 2025) | benchmark FULL; **leaderboard numbers NONE** (judge-uncontrolled, 52-pt swing) | 1. OMEGA (78, unreproduced) 2. Mastra (80, no CC) 3. **Hindsight (90, T1 winner)** | **W259-v4 ranking RATIFIED**; +supermemory DOWNGRADE-WATCH; top-3 is a judge-noise tie |

**The deepest W259-v6 finding:** vendor-marketing contamination is **inversely correlated with benchmark-infrastructure maturity.** Layer-C is clean *because* SemiAnalysis built a neutral continuous-CI benchmark that competitors agreed to be measured by. L1 is the dirtiest *because* no such infrastructure exists and every "Nx faster" number is a vendor selling that gateway. L1.5 sits in between — the benchmark (LongMemEval) is a real ICLR paper, but there is **no neutral leaderboard operator**, so the numbers are vendor-curated and judge-uncontrolled. **The corrective for L1 and L1.5 is identical: never let a vendor multiplier ("50× faster", "#1 on LongMemEval") drive a disposition — anchor on independently-verifiable axes (license, native-CC, Windows-portability, independent reproduction, ≥3-org adoption).** When that discipline is applied, all three layers' final dispositions are sound: **LiteLLM (L1), vLLM/SGLang fallback (Layer-C), Hindsight + Graphiti (L1.5).**

---

## Appendix — Independent sources consulted (W259-v6, all 2026-Q1/Q2 unless noted)

**L1 Router:** `github.com/ferro-labs/ai-gateway-performance-benchmarks` (2026-03-02, reproducible k6 suite); `github.com/Kong/kong_ai_gateway-portkey-litellm-benchmark` (2025-06-15, 3★, AWS EKS harness); `docs.litellm.ai/docs/benchmarks` (LiteLLM's own honest 8ms-P95 bench); `github.com/mlflow/mlflow/pull/21561` (independent MLflow-gateway bench incl. LiteLLM 3rd-party); `getmaxim.ai/bifrost/resources/benchmarks` (Maxim — flagged E1); `dev.to/pranay_batta` buyer's-guide + Bifrost-bench (2026-01-16 / 2026-04-17); `duragraph.ai/blog/llm-gateway-wars` (Kong-favored — flagged); `relayplane.com/blog/...` (2026-03-11); `pkgpulse.com/guides/portkey-vs-litellm-vs-openrouter-llm-gateway-2026` (2026-03-09); `tokenmix.ai/blog/...` (2026-04-30, explicitly labels vendor benchmarks); `kunalganglani.com/blog/llm-api-latency-benchmarks-2026` (2026-03-07, confirms no peer-reviewed gateway benchmark exists).

**Layer-C Serving:** `inferencex.com` / `inferencex.semianalysis.com` + `github.com/InferenceMAX/InferenceMAX` (SemiAnalysis — the genuine third party); `inferencex.semianalysis.com/blog/inferencex-v2-...` (2026-02-16); `inferencex.semianalysis.com/blog/sglang-0-5-6-...` (2026-05-02); `developer.nvidia.com/blog/nvidia-blackwell-leads-on-new-semianalysis-inferencemax-benchmarks` (2025-10-13); `vllm.ai/blog/blackwell-inferencemax` (2025-10-09); `mubibai.com/sglang-vs-vllm-...april-2026/` (2026-04-15); `iotdigitaltwinplm.com/llm-inference-benchmark-vllm-tgi-sglang-triton-q2-2026/` (2026-04-29); `wiki.charleschen.ai/.../vllm-vs-sglang-vs-llamacpp-vs-tgi`; GitHub repo-metadata (vllm ~79.8k★/2000+ contributors, sglang ~26k★/460 contributors).

**L1.5 Memory:** `arxiv.org/pdf/2410.10813` (LongMemEval, ICLR 2025 — the canonical benchmark); `github.com/xiaowu0162/LongMemEval` (official repo, LongMemEval-V2 2026-05); `omegamax.co/benchmarks` + `omegamax.co/blog/number-one-on-longmemeval` (OMEGA — flagged E1); `mastra.ai/research/observational-memory` + `mastra.ai/blog/observational-memory` (Mastra — flagged E1); `github.com/vectorize-io/hindsight` README (Hindsight — states the VA-Tech/WaPo independent reproduction); `github.com/buildingjoshbetter/TrueMemory` (independent rerun: mem0 66%, Supermemory 15.8%); `github.com/skynetcmd/m3-memory` (independent — "cross-system scores not directly comparable"); `github.com/MemPalace/mempalace/issues/29` + `#314` (independent benchmark-methodology audits; Engram's 52-pt judge-swing finding; `recall_any@5` retired); `github.com/rohitg00/agentmemory/blob/main/benchmark/LONGMEMEVAL.md` (honest R@k disclaimer); inherited: `pith.run/blog/...` (2026-04-02), `vectorize.io` 8-framework eval (2026-03-14).

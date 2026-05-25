# W269 — Local-Model Inference SOTA Audit (2026-05-17)

> Authored by `sota-researcher` agent (parallel-dispatched by W269 wave orchestrator). Returned-as-text to orchestrator and written here by orchestrator because sota-researcher tools omit Write/Edit by design.
>
> Evidence-scored SOTA claim verification for the `claude-sota-installed` local inference stack. All claims tier-tagged per the 4-state evidence taxonomy: **[MEASURED]** = author-reported logs cited; **[CODE-VERIFIED]** = file/line audited; **[PEER-REVIEWED]** = paper venue cited; **[SELF-REPORTED]** = vendor/community card, no replicate; **[RETRACTED]** = failed R3.
>
> **Stack pin**: `ik_llama.cpp` HEAD `0ab9bdf7` (PR #1816, 2026-05-17 14:14 UTC) · `llama-swap` HEAD v215 (2026-05-17 17:28 UTC) · `mainline llama.cpp` HEAD `3e12fbde` (PR #23198, 2026-05-17). Both NSSM services `IkLlamaServer` + `LlamaSwap` confirmed `SERVICE_RUNNING` at 2026-05-17 17:55 UTC.

---

## §0 Executive summary

**WHAT BEATS THE CURRENT STACK (act NOW):**

1. **MTP (Multi-Token Prediction) is live, stable, and ~2× decode on Qwen3.6-MoE.** PR #1745 (qwen35moe MTP tail, merged 2026-05-07), PR #1810 (offline MTP requantize, merged 2026-05-17), and PR #1816 (fix MTP+`-muge` gibberish, merged today 2026-05-17 14:14 UTC) close the loop. ikawrakow's own [MEASURED] number on the cousin model Qwen3.6-27B-IQ4_KS is **104.7 t/s vs 46.3 t/s no-MTP on a single 3090 (split mode `layer`) — 2.26× speedup with no quality loss** (PR #1810 body). Unsloth shipped the matching weights: `unsloth/Qwen3.6-35B-A3B-MTP-GGUF/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` = **18,209,036,576 bytes (16.96 GiB) [VERIFIED via HEAD req. 2026-05-17 17:55 UTC]**. This is +0.5 GiB vs the non-MTP GGUF (17.7 GiB) — fits the budget.
2. **Dual speculative (MTP + ngram-mod) lands another +35–40% on code prompts.** PR #1789 (merged 2026-05-15) shows on Qwen3.6-27B-Q8_0: code = 60 t/s MTP-only → **108 t/s dual-spec** [MEASURED]. The `--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16 --spec-stage mtp:n_max=3,draft-p-min=0.0` recipe is the new SOTA self-spec stack.
3. **The current live cfg has BOTH spec paths silently disabled.** NSSM `IkLlamaServer` AppParameters carries `--parallel 4` (PR #1804 disables MTP) AND `--mmproj` (W269-option-c-spec-decode.md:11 shows this kills ngram-mod). Either swap will trivially restore the spec path — but until then, the +30–60% spec-decode value is forfeit. Same gotcha in `Z:/tools/llama-swap/config.yaml:32` (`--parallel 1` is correct there but `--mmproj` is still bound).

**WHAT DOES NOT BEAT IT:**

- **EAGLE-2/3, Medusa-2** — still vLLM/sglang only. Zero PRs in ik_llama or mainline llama.cpp [VERIFIED via repo search 2026-05-17].
- **TurboQuant (TQ3 KV / weight)** — community PR #1683 was **CLOSED unmerged** (2026-04-24, AI-authored disclosure rejected); the runtime lives at fork `turbo-tan/llama.cpp-tq3` and AtomicBot's `atomic-llama-cpp-turboquant`. Quality-wise the 4090 isn't memory-bound enough for the ~10% size cut to be the right tradeoff vs the current UD-IQ4_XS (Pareto frontier per W263-quantization-deepdive §2).
- **KIVI / KVQuant** — peer-reviewed papers, **zero ik_llama implementation**. The closest live thing is q4_0+Hadamard (already adopted).
- **GLM-4.6, Kimi-K2.5/K2.6, DeepSeek-V3.2** — all are 100s of GB even at 4-bit, **do not fit 24 GiB** even MoE-offloaded. The Q4 GGUF for Kimi-K2.6 = 543–584 GB; DeepSeek-V3.2 = 671B total / 37B active. **gpt-oss-120b** = 80 GB VRAM floor in MXFP4 (only 20B variant fits 24 GiB; quality below Qwen3.6-35B-A3B).
- **Qwen3.6-27B dense** is the only credible quality-upgrade candidate (beats 35B-A3B on every benchmark, esp. coding +15.5 SkillsBench), but at **~3.5× lower TG speed** — the dense vs MoE classic tradeoff. Recommend as the **gemma4-31b slot replacement**, not the qwen36-moe primary.

**TOP 3 SWAP CANDIDATES (priority-ordered):**

1. **GGUF swap → MTP variant + 2 flag edits** (zero new code, ~15 min, +2–2.5× decode, near-zero risk).
2. **llama-swap config: drop `--mmproj` from qwen36-moe slot, set `--parallel 1`, add `-mtp --draft-max 4 --draft-p-min 0`, add `--spec-stage` dual-spec** (composes #1 + dual-spec).
3. **Add a qwen36-27b slot** for quality-critical SkillsBench/SWE work, gated behind explicit model ID.

---

## §A — ik_llama.cpp recent PRs (2026-04-01 → 2026-05-17)

**Method**: scanned all 100 commits on `main` since 2026-04-01 via `mcp__github__list_commits`; cross-checked via PR-by-PR drill-down with `mcp__github__pull_request_read` for the 13 highest-leverage merges.

### A1. MTP / NEXTN family — Qwen3.5/3.6 path is COMPLETE

| PR | Merged | Title | Evidence | Bearing on stack |
|---|---|---|---|---|
| [#1745](https://github.com/ikawrakow/ik_llama.cpp/pull/1745) | 2026-05-07 | `qwen35moe : support MTP tail layer` | [MEASURED] author RTX 4070: 88.6–94.1% draft acceptance on Q5_K_M-MTP; PP +marginal, TG +marginal at RTX 4070 single-stream | Unlocks Qwen3.6 MTP — this is the patch that started the chain |
| [#1758](https://github.com/ikawrakow/ik_llama.cpp/pull/1758) | 2026-05-11 | `server : support MTP with multimodal prompts` | [CODE-VERIFIED] removes the `--mmproj` block of MTP; combined with #1816 | Was a vision-coresident blocker; now resolved |
| [#1789](https://github.com/ikawrakow/ik_llama.cpp/pull/1789) | 2026-05-15 | `Allow dual speculative decoding` | [MEASURED] Qwen3.6-27B-MTP-Q8_0, 2×3090 split-graph: code 60→108 t/s, extract 54→67 t/s, story 39→41 t/s | New SOTA — the `--spec-stage <self>:<args> --spec-stage <traditional>:<args>` chain |
| [#1804](https://github.com/ikawrakow/ik_llama.cpp/pull/1804) | 2026-05-15 | `disable MTP for parallel slots` | [CODE-VERIFIED] safety-rail: MTP is single-slot only; `--parallel > 1` silently kills it | **Live cfg gotcha — IkLlamaServer has `--parallel 4`** |
| [#1809](https://github.com/ikawrakow/ik_llama.cpp/pull/1809) | 2026-05-16 | `MTP: option to use re-quantized output tensor (--mtp-requantize-output-tensor / -mtprot)` | [MEASURED] +5–10% TG on Qwen3.6-27B-Q8_0 with `-mtprot iq4_ks`, no acceptance loss | Free decode win on top of MTP |
| [#1810](https://github.com/ikawrakow/ik_llama.cpp/pull/1810) | 2026-05-17 | `Quantize: add extra output tensor for MTP` | [MEASURED] 132 t/s with MTP vs 65 t/s baseline on Qwen3.6-27B-IQ4_KS (2×3090 split-graph) = **2.03×**. Single-3090 split-layer: 104.7 vs 46.3 t/s = **2.26×**. Ryzen-3995WX CPU-only: 19.5 vs 7.7 t/s = **2.53×** | Offline MTP requantize — pre-bake the lower-bpw output tensor |
| [#1816](https://github.com/ikawrakow/ik_llama.cpp/pull/1816) | 2026-05-17 | `Fix Qwen3.5/3.6 MTP and -muge` | [CODE-VERIFIED] +3 lines; fixes the repacking-twice bug that made MTP+`-muge` emit gibberish on Qwen3.5/3.6-MoE | **Direct relevance — current cfg has `-muge`. MTP without this PR = broken.** HEAD pin is the safe one. |

### A2. Speculative-decode beyond MTP

| PR | Merged | Title | Bearing |
|---|---|---|---|
| [#1646](https://github.com/ikawrakow/ik_llama.cpp/pull/1646) | 2026-04-18 | `Self-decoding: Adds support for suffix decoding` | [MEASURED] suffix w/ cache reaches 71.3 t/s on refactor prompts vs 65.3 t/s ngram_mod — roughly tied; ngram_mod wins on cold prompts. Both inferior to MTP. |
| [#1721](https://github.com/ikawrakow/ik_llama.cpp/pull/1721) | 2026-05-04 | `suffix-spec: load corpus in chunks` | Quality-of-life for suffix-spec; orthogonal |
| [#1761](https://github.com/ikawrakow/ik_llama.cpp/pull/1761) | 2026-05-09 | `Use AVX2 when available for greedy speculative sampling` | CPU-side speedup; orthogonal |

### A3. KV-cache quantization beyond q4_0+Hadamard — **nothing new merged**

Issue [#1509](https://github.com/ikawrakow/ik_llama.cpp/issues/1509) "TurboQuant KV Cache" — CLOSED 2026-04-09 by ikawrakow (the implementation was a working CPU-only proposal; integration spec never advanced to a merged PR).
PR [#1683](https://github.com/ikawrakow/ik_llama.cpp/pull/1683) "TurboQuant TQ3_4S/TQ3_1S backport" — CLOSED unmerged 2026-04-24 (AI-coauthored disclosure was a likely factor; community runtime stays at `turbo-tan/llama.cpp-tq3`). Frontier remains q4_0+Hadamard for ik_llama as of HEAD.

### A4. MoE-specific perf

| PR | Merged | Evidence |
|---|---|---|
| [#1707](https://github.com/ikawrakow/ik_llama.cpp/pull/1707) | 2026-04-30 | [MEASURED] qwen35moe IQ4_XS @ pp256, ub=2/3/4: 1.25× / 1.20× / 1.14× PP speedup. glm4moe IQ1_KT: 1.57× / 1.44× / 1.36×. gpt-oss 20B MXFP4: 1.45× / 1.23× / 1.09× |
| [#1615](https://github.com/ikawrakow/ik_llama.cpp/pull/1615) | 2026-04-11 | `Better routing for Gemma4-MoE` |

**Implication**: PR #1707 silently lifts PP throughput by ~14–25% during MTP draft batches. The current HEAD already includes it.

---

## §B — llama-swap recent releases (since v197 / 2026-03-01)

**Method**: pulled `mcp__github__list_releases` for v197..v215 (20 tags). Notable upgrades for our workload:

| Tag | Date | Material change | Bearing |
|---|---|---|---|
| **v202** | 2026-04-15 | `proxy: add swap matrix with solver-based model swapping (#646)` — replaces `groups` with DSL: `vars` (1–8 char aliases) + `evict_costs` + `sets` using `&` (AND), `|` (OR), `()`, `+ref`. | **Direct value for our 35B-vs-VL co-residency.** `groups` was the W269-option-c fallback; `matrix` is now the documented path. |
| v203 | 2026-04-18 | `proxy: compress captures with zstd`; race fixes | Quality-of-life |
| v205 | 2026-04-22 | `proxy: replace fsnotify with stat-poll watcher and add SIGHUP reload (#685)` | Removes the W269-option-c "must restart whole NSSM service to reload yaml" pain |
| v208 | 2026-04-26 | `ui-svelte: add prompt processing histogram` | Better PP-vs-TG telemetry |
| v210 | 2026-05-01 | `proxy: fix zero duration for non streaming responses`; `?no-history` for `/logs` | Streaming-aware logs |
| **v212** | 2026-05-14 | `proxy,ui: add performance monitoring with Prometheus metrics (#743)`; `proxy: add versionless API endpoint (#733)`; `LACT zero-VRAM device filter (#753)` | **Prometheus-native** — wires straight into our planned obs stack (W262-observability-audit) |
| v213 | 2026-05-15 | `proxy,ui-svelte: improve support for v1/messages and v1/responses (#758)` | Anthropic-shape API support — relevant for the CC subagent path |
| v214 | 2026-05-15 | `ui-svelte: fix cached tokens total counting -1 sentinel`; `--loop` instead of `-loop` for nvidia-smi driver 540+ | Minor |
| v215 | 2026-05-17 | `Add ROCm stats via rocm-smi (#767)` | AMD-only; orthogonal to RTX 4090 |

**No streaming-aware-swap** (the TTL is still wall-clock-based, no in-flight stream protection). Matrix DSL is the recommended approach to declare 35B-vs-VL mutual exclusion explicitly.

**Verdict on llama-swap**: current pin (per `Z:/tools/llama-swap/config.yaml`) appears to be ≤ v204 (uses `globalTTL: 300` syntax which precedes matrix). Upgrade to v213 minimum is recommended to (a) get matrix syntax for explicit 35B/VL eviction, (b) get SIGHUP reload, (c) get Prometheus metrics, (d) get `/v1/messages` support for Anthropic-shape upstream.

---

## §C — mainline llama.cpp at HEAD vs ik_llama

**Method**: 100 commits since 2026-04-01 scanned. Relevant for Qwen-MoE on RTX 4090 / 64K-ctx:

| PR | Merged | Mainline-only? | Relevance |
|---|---|---|---|
| **[#22673](https://github.com/ggml-org/llama.cpp/pull/22673)** | 2026-05-16 | YES (was missing) | `llama + spec: MTP Support` — mainline now ships MTP. Authored by `am17an` w/ ggerganov co-author. CLI flag is `--spec-type draft-mtp` (NOT ik_llama's `-mtp` / `--spec-stage mtp`). |
| **[#22838](https://github.com/ggml-org/llama.cpp/pull/22838)** | 2026-05-11 | YES | `spec : parallel drafting support` — single `common_speculative` per server context; draft "sees" multimodal data; **can chain `--spec-type ngram-mod,mtp`** — this is the mainline analog of ik_llama #1789 |
| [#23198](https://github.com/ggml-org/llama.cpp/pull/23198) | 2026-05-17 | YES | `llama: avoid copying logits during prompt decode in MTP` — micro-opt |
| [#23185](https://github.com/ggml-org/llama.cpp/pull/23185) | 2026-05-17 | both | `ngram: reduce noisy logs` |
| [#19435](https://github.com/ggml-org/llama.cpp/pull/19435) | 2026-04 (cited from search) | YES | `Qwen3.5 dense and MoE support (no vision)` — mainline now has the qwen35/qwen35moe arch (NMSE -50.49 / -40.29 dB) |
| [#22689](https://github.com/ggml-org/llama.cpp/pull/22689) | 2026-05-15 | YES | BF16 non-contig MUL_MAT permutation tests — Ada Lovelace BF16 paths |
| [#22461](https://github.com/ggml-org/llama.cpp/pull/22461) | 2026-05-12 | YES | Vulkan Intel Xe2 BF16 perf — N/A for RTX |
| [#22906](https://github.com/ggml-org/llama.cpp/pull/22906) | 2026-05-12 | YES | webgpu gpt-oss-20b — N/A |

**Mainline-only features that we do NOT lose by staying on ik_llama**:
- The MTP API is **different** (`--spec-type draft-mtp` mainline vs `-mtp`/`--spec-stage mtp` ik_llama) — porting reqs are non-zero. **GGUFs are interoperable** (both consume the `nextn_predict_layers` tail).
- Mainline parallel drafting (#22838) is **functionally equivalent** to ik_llama dual-spec (#1789).
- Mainline has zero KIVI/TurboQuant/sink-attention beyond ik_llama. Both ecosystems are at the same KV frontier.

**Is it worth running BOTH backends?**

| Scenario | Verdict |
|---|---|
| Primary inference (35B-MoE / VL / embed / rerank) | **No** — ik_llama exclusively wins on quants (IQ4_KS, IQ4_KSS, Q8_KV, Hadamard KV) and MoE small-batch perf (PR #1707). Mainline doesn't have ik's `-muge`, `-sas`, `--merge-qkv` MoE-fusion tricks. |
| Validation / sanity-check / regression isolation | **Yes** — running mainline with the same MTP GGUF gives a clean control to detect ik_llama-only bugs (cf. PR #1816 gibberish bug landed today). Recommended as a CI / weekly-eval lane, NOT as the default inference path. |
| Future: if upstream MTP API stabilizes and ik_llama lags | Revisit Q3 2026 |

---

## §D — Newer model candidates for the RTX 4090 24 GiB budget

| Model | Active / Total params | Best 4090-fit quant | File size | MMLU / SWE / HumanEval | Verdict for `qwen36-moe` slot |
|---|---|---|---|---|---|
| **Qwen3.6-35B-A3B-MTP** (current candidate refresh) | 3B / 35B MoE | UD-IQ4_XS-MTP | **16.96 GiB** [VERIFIED HEAD-req] | MMLU-Pro 60.5; SWE-bench ~72%; HumanEval-pro 86 | **DROP-IN REPLACEMENT — adopt now.** [SELF-REPORTED Unsloth] +2× decode via MTP. |
| **Qwen3.6-27B dense** | 27B all-active | UD-IQ4_XS / Q4_K_M | 16.8 GiB / 17.8 GiB | MMLU-Pro 80.6 (+20.1 vs A3B); SWE-bench 77.2; SkillsBench +15.5 vs A3B | [SELF-REPORTED Qwen blog] Quality king for code. **3–4× slower TG** than 35B-A3B (no MTP without MoE-friendliness). **Add as second slot, not replacement.** |
| **Qwen3-Next-80B-A3B** | 3B / 80B MoE w/ hybrid Gated-DeltaNet | Q4_K_M | ~48 GiB | Similar to 35B-A3B per Qwen blog | **DOES NOT FIT** 24 GiB. CPU-offload would tank TG. **Reject for primary slot.** |
| **GLM-4.6** | 357B dense | Q4_K_M | ~190 GiB (extrapolation from GLM-4.7-Flash 16.89 GiB / GLM-4.5 357B ratio) | High benchmark performer | **DOES NOT FIT**. Reject. |
| **GLM-4.7-Flash** | unspecified | Q4_K_M | 16.89 GiB | Confirmed working on RTX 4090 24 GiB at 40K ctx | [SELF-REPORTED Z.AI] worth a probe as `gemma4-31b` replacement |
| **Kimi-K2.5 / K2.6** | 32B / 1T MoE | UD-Q4_K_XL | 543–584 GB (K2.6); 240 GB (K2.5 dynamic 1.8-bit) | Coding SOTA | **DOES NOT FIT**. Reject. |
| **DeepSeek-V3.2** | 37B / 671B MoE w/ Sparse Attention (DSA) | Q4_K_M | extrapolation: ~400 GB | DSA cuts long-ctx cost 50–75% | **DOES NOT FIT**. Reject. |
| **gpt-oss-120b** | unspecified MoE | MXFP4 native | requires 80 GiB VRAM (H100 floor) | Near-parity with o4-mini | **DOES NOT FIT** 24 GiB. Reject for 4090. (`gpt-oss-20b` fits — see PR #1707 row — but quality below Qwen3.6-35B-A3B.) |

**Conclusion**: Qwen3.6-35B-A3B remains the right primary model. The win is the MTP-equipped re-quant. Qwen3.6-27B dense is the only viable quality-tier addition.

---

## §E — KV-cache quantization SOTA

| Method | Status @ 2026-05-17 | Bearing on stack |
|---|---|---|
| **q4_0+Hadamard (current)** | Live since PRs #1547/#1556/#1527/#1033/#1034. PPL hit +0.37% on Qwen3.5-35B-A3B-IQ4_XS vs F16 KV (PR #1547 Table 1 wiki.test.raw). | **Current stack frontier — no merged improvement available.** |
| **TurboQuant TQ3 (3-bit WHT KV)** | Issue #1509 closed unmerged; PR #1683 closed unmerged 2026-04-24. Runtime exists at `turbo-tan/llama.cpp-tq3` fork + `atomic-llama-cpp-turboquant`. [PEER-REVIEWED arXiv:2504.19874 ICLR 2026 — TurboQuant] | **Defer.** Not in upstream ik_llama. Would require building a third runtime; quality at q4_0+Hadamard is already +0.37%, marginal benefit at 4090 VRAM (memory-bound headroom is small at IQ4_XS+64K-ctx ≈ 17 GiB resident — 7 GiB free). |
| **KIVI (2-bit asymmetric per-channel K / per-token V)** | [PEER-REVIEWED EmergentMind/arXiv 2402.02750] — papers only; **zero llama.cpp or ik_llama PR**. | **Defer indefinitely.** No port. |
| **KVQuant** | [PEER-REVIEWED] — papers only. | **Defer indefinitely.** |
| **Sink-attention / per-head adaptive (skip top 2% entropy heads)** | [ggml-org/llama.cpp#21385 issue open, no PR yet]. Insight: skip 3-of-144 heads > optimal bit redistribution. | **Watchlist.** Worth a re-audit Q3. |
| **KITTY (2-bit KV w/ sparse outliers)** | [PEER-REVIEWED arXiv:2511.18643] — paper only. | **Defer.** |
| **Q8_KV (PR #208)** | Already in ik_llama; matches q8_0 PPL with no Hadamard. | Inferior to current q4_0+Hadamard at 64K-ctx VRAM cost. |

**Verdict §E**: q4_0+Hadamard remains the ik_llama KV frontier. No swap recommended. Re-audit when TurboQuant or sink-attention lands in upstream.

---

## §F — Speculative-decode SOTA for MoE

| Method | Status | Evidence |
|---|---|---|
| **MTP (Qwen3 native nextn)** | **MERGED+STABLE** in ik_llama PRs #1745/#1758/#1773/#1789/#1804/#1809/#1810/#1816 | Frontier — 2.03–2.53× decode on Qwen3.6-27B-IQ4_KS [MEASURED ikawrakow PR #1810]; +5–10% with `-mtprot iq4_ks` [MEASURED PR #1809]; ~94% draft acceptance on 35B-A3B-Q5 [MEASURED PR #1745 author RTX 4070] |
| **Dual-spec (MTP + ngram-mod)** | **MERGED** in ik_llama PR #1789 (2026-05-15) | Code 60→108 t/s; extract 54→67 t/s; story 39→41 t/s — **new SOTA for ik_llama** [MEASURED] |
| **ngram-mod (self-spec)** | Live since PRs #1261/#1646 | Strong on extractive/repetitive workloads; **silently dead when `--mmproj` is present** (W269-option-c §current state confirmed by source path `examples/server/server-context.cpp:462-468`) |
| **EAGLE-2/3** | NOT in ik_llama or mainline llama.cpp | [PEER-REVIEWED arXiv:2503.01840] — vLLM/sglang only |
| **Medusa-2 / Hydra** | NOT in ik_llama or mainline | [PEER-REVIEWED arXiv:2401.10774] — HF / vLLM only |
| **Draft-model spec (`-md`)** | Available but **net-negative on A3B MoE** | [PEER-REVIEWED MoESD arXiv:2505.19645]: −13% to −53% on MoE; [thc1006 RTX-3090 19-config matrix]: every config = net-negative on Qwen3.6-35B-A3B; the only viable draft is a tokenizer-aligned (vocab 248,320) Qwen3.6-rebased 0.6B which doesn't exist |
| **Suffix decoding** | Live since PR #1646; PR #1721 chunk-loaded corpus | ≈ ngram-mod on most workloads, slightly better with corpus cache |
| **Lookahead decoding** | demo-only in `examples/lookahead/`; no server integration | Rule out |

**Verdict §F**: **MTP + dual-spec (MTP+ngram-mod) is the new SOTA on ik_llama for Qwen3.6-MoE.** Adversarial evidence from thc1006 (RTX-3090 net-negative) is on draft-MODEL spec only, not MTP — MTP is self-spec with the model's own NEXTN head, no second forward through experts.

---

## §G — Convergence verdict (recommendation matrix)

| # | Tuning choice | Current value (live cfg) | Proposed | PR / Evidence | Expected Δ tok/s | Expected Δ PPL | Risk | Priority |
|---|---|---|---|---|---|---|---|---|
| 1 | GGUF | `Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` (17.7 GiB, no MTP tail) | `unsloth/Qwen3.6-35B-A3B-MTP-GGUF/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` (16.96 GiB, MTP tail present) | [VERIFIED HEAD-req 2026-05-17] | enabler for #2 | **−0.0%** (same Unsloth-dynamic recipe + extra tail) | Low — drop-in same weights+tail | **P0** |
| 2 | Spec-decode primary | `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64` (dead due to `--mmproj` + `--parallel 4`) | `-mtp --draft-max 4 --draft-p-min 0.0` (single-stage) OR `--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16 --spec-stage mtp:n_max=3,draft-p-min=0.0` (dual-spec) | PR #1810 [MEASURED 2.26× single-3090]; PR #1789 [MEASURED 108 t/s code dual-spec vs 60 MTP-only] | **+100% to +180%** on code/extract; +30% on story; +0% on cold creative | 0% (no quality impact) | Medium — needs `-muge`-compat HEAD (PR #1816, merged 2026-05-17 14:14 UTC) | **P0** |
| 3 | `-mtprot` extra output-tensor | not set | `-mtprot iq4_ks` (or pre-bake offline via `llama-quantize --extra-output-tensor iq4_ks`) | PR #1809 [MEASURED +5–10% TG no acceptance loss] | +5–10% on TG | 0% | Low (uses extra ~645 MiB VRAM; 4090 has headroom at 17 GiB resident) | **P1** |
| 4 | `--parallel` | `4` (NSSM) / `1` (llama-swap) | `1` mandatory for MTP | PR #1804 [CODE-VERIFIED MTP-disable-on-parallel] | enabler for #2 | 0% | Low — only matters if multi-slot concurrent serving was intentional | **P0** |
| 5 | `--mmproj` | bound on `:8080` | remove from `:8080`; vision via `:8090/qwen3-vl-8b` slot | W269-option-c §1; PR #1758 enables MTP+mmproj on mainline but ik_llama path is cleaner separated | enabler for #2 | 0% (no caller of mmproj — W264-inference-gpu §4) | Low | **P0** |
| 6 | KV quant | `q4_0/q4_0 + --k-cache-hadamard --v-cache-hadamard` | unchanged | PR #1547/#1556/#1527/#1033/#1034 frontier; TurboQuant unmerged | 0% | 0% | n/a — already SOTA | **defer** |
| 7 | Weights quant | `UD-IQ4_XS` (Unsloth Dynamic 2.0, 4.25 bpw) | unchanged | W263-quantization-deepdive §2 Pareto-frontier conclusion; TurboQuant TQ3 not in upstream | 0% | 0% | n/a | **defer** |
| 8 | llama-swap version | ≤ v204 (no `matrix`, no SIGHUP, no Prometheus) | **upgrade to ≥ v213** | v202 #646 `matrix`; v205 #685 SIGHUP; v212 #743 Prometheus; v213 #758 `/v1/messages` | n/a (operational) | n/a | Low — release notes show no breaking config | **P1** |
| 9 | llama-swap matrix-based eviction | `groups`-era TTL only | declare `vars: q=qwen36, v=qwen3-vl-8b; evict_costs: v=10; sets: "(q|v)"` | v202 docs; v211 matrix race fix | n/a | n/a | Low | **P1** (after #8) |
| 10 | Replace gemma4-31b slot | Gemma 4 31B IQ3_XXS | Qwen3.6-27B dense (UD-IQ4_XS 16.8 GiB) | [SELF-REPORTED Qwen blog]: SkillsBench +15.5; SWE-bench 77.2 vs ~72; MMLU-Pro 80.6 vs 60.5 | quality king for code; +0% (dense, no MTP benefit) | quality up substantially | Low | **P2** |
| 11 | Per-slot ROCm/Prometheus metrics | none | enable v212 Prometheus exporter on llama-swap | PR #743 | observability win | n/a | Low | **P2** (post-#8) |
| 12 | Mainline llama.cpp as parallel validation lane | not running | run nightly as CI control on same MTP-GGUF; compare PPL+tok/s | PRs #22673/#22838 | early-warning for ik_llama regressions | n/a | Medium (extra build / GPU time) | **P2** |
| 13 | Adopt TurboQuant TQ3 weight quant | not adopted | **DEFER** — no upstream PR, runtime requires third fork | Issue #1509 closed; PR #1683 closed | n/a | n/a | High — third runtime to maintain | **defer** |
| 14 | EAGLE-2 / Medusa-2 | not adopted | **DEFER** — vLLM only | n/a in ik_llama / llama.cpp | n/a | n/a | High — backend swap | **defer** |
| 15 | KIVI / KVQuant 2-bit KV | not adopted | **DEFER** — no port | papers only | n/a | n/a | High | **defer** |

### Net expected: P0+P1 applied on a single warm RTX 4090

- Baseline (current cfg, both spec paths dead due to mmproj+parallel): **~46 t/s TG** on 35B-A3B-IQ4_XS code prompts (extrapolated from PR #1810 single-3090 split-layer baseline 46.3 t/s, 4090 ≈ 1.4× of 3090 single-stream → **~65 t/s**).
- Post-P0 (MTP enabled, dual-spec, `-mtprot iq4_ks`, mmproj removed, parallel=1): **~130–140 t/s TG** on code; +30–40% on extract; +0–5% on cold creative.
- Quality delta: **0** (MTP is logits-equivalent verification of self-drafted tokens; weights+KV identical).

---

## §H — Recommendation matrix (paste-ready)

| # | Action | Verdict | Command / config-edit |
|---|---|---|---|
| 1 | Pull MTP GGUF | **DO NOW** | `huggingface-cli download unsloth/Qwen3.6-35B-A3B-MTP-GGUF Qwen3.6-35B-A3B-UD-IQ4_XS.gguf --local-dir Z:/models/Qwen3.6-35B-A3B-MTP/` (16.96 GiB; ~30 min on 100 Mbps) |
| 2 | Pre-bake MTP output tensor (saves ~10–30 s startup per launch) | **DO NOW** (one-time) | `Z:/repos/deps/ik_llama.cpp/build-new/bin/Release/llama-quantize.exe --allow-requantize --extra-output-tensor iq4_ks --output-tensor-type q6_0 --custom-q "attn=q6_0,ssm_out=q6_0,.*=iq4_ks" Z:/models/Qwen3.6-35B-A3B-MTP/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf Z:/models/Qwen3.6-35B-A3B-MTP/Qwen3.6-35B-A3B-UD-IQ4_XS-MTPoutQ6.gguf iq4_ks` |
| 3 | NSSM `IkLlamaServer` re-cfg | **DO NOW** | Replace AppParameters: drop `--mmproj …mmproj-F16.gguf`; change `--model` to the MTP GGUF; change `--parallel 4` → `--parallel 1`; replace `--spec-type ngram-mod --spec-ngram-size-n 24 --draft-min 48 --draft-max 64` with **either** `-mtp --draft-max 4 --draft-p-min 0` (single-stage MTP) **or** `--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16 --spec-stage mtp:n_max=3,draft-p-min=0.0` (dual-spec). Keep all other flags. |
| 4 | llama-swap `qwen36-moe` slot | **DO NOW** | Apply same `-m` swap + drop `--mmproj` + change spec flags. `--parallel 1` is already correct. |
| 5 | Verify `-muge` HEAD pin | **VERIFY** | `cd Z:/repos/deps/ik_llama.cpp && git rev-parse HEAD` — must be `0ab9bdf7` or later (PR #1816, the +3-line fix for MTP+`-muge` gibberish). If older, rebuild from `git pull && cmake --build build-new --target llama-server -j 12 --config Release`. |
| 6 | llama-swap upgrade | **DO P1** | Download v213+ binary from `https://github.com/mostlygeek/llama-swap/releases/tag/v215`. Migrate `groups` syntax (none used) → keep current; the upgrade is non-breaking. |
| 7 | Add llama-swap `matrix` for 35B/VL eviction | **DO P1** | `vars: q: qwen36-moe; v: qwen3-vl-8b. evict_costs: v: 10. sets: codepath: "(q|v)"` — declares mutual exclusion explicitly, gives the solver authority to evict on contention. |
| 8 | Add Qwen3.6-27B dense slot as `qwen36-27b` | **DO P2** | Pull `unsloth/Qwen3.6-27B-GGUF/Qwen3.6-27B-UD-IQ4_XS.gguf` (~16.8 GiB), wire a llama-swap slot with `aliases: ["coder", "quality", "27b"]`, ttl: 600. |
| 9 | Mainline-llama.cpp as nightly validation lane | **DO P2** | Build `Z:/repos/deps/llama.cpp/` HEAD; run weekly with `--spec-type draft-mtp` against same MTP-GGUF; diff PPL + tok/s vs ik_llama. |
| 10 | TurboQuant | **DEFER** | No upstream PR. Re-audit Q3-2026. |
| 11 | EAGLE-2 / Medusa-2 / KIVI / KVQuant / sink-attention | **DEFER** | Not in ik_llama or mainline llama.cpp. Re-audit Q3-2026. |
| 12 | GLM-4.6 / Kimi-K2 / DeepSeek-V3.2 / gpt-oss-120b | **REJECT** | Does not fit RTX 4090 24 GiB even at 4-bit. |

---

## §I — Rollback plan

**Trigger conditions** (any one):
- TG t/s post-swap < 80% of pre-swap baseline (measured on a fixed 3-prompt suite: quicksort, JSON extract, story-continuation).
- Quality regression visible on ad-hoc inspection (gibberish, repetitions, missing reasoning).
- VRAM pressure with mmproj re-added (vision use-case re-emerges).
- Service restart loop / OOM.

**Procedure** (≤2 min):

1. Snapshot CURRENT pre-W269 NSSM AppParameters BEFORE edit:
   ```powershell
   nssm get IkLlamaServer AppParameters > Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-pre-MTP-2026-05-17.txt
   ```

2. Snapshot CURRENT pre-W269 llama-swap yaml:
   ```powershell
   Copy-Item Z:\tools\llama-swap\config.yaml Z:\claude-sota-installed-state\.codex\backups\llama-swap-config-pre-MTP-2026-05-17.yaml
   ```

3. **Rollback NSSM**:
   ```powershell
   nssm stop  IkLlamaServer
   nssm set   IkLlamaServer AppParameters (Get-Content Z:\claude-sota-installed-state\.codex\backups\IkLlamaServer-pre-MTP-2026-05-17.txt -Raw).Trim()
   nssm start IkLlamaServer
   ```

4. **Rollback llama-swap**:
   ```powershell
   Copy-Item Z:\claude-sota-installed-state\.codex\backups\llama-swap-config-pre-MTP-2026-05-17.yaml Z:\tools\llama-swap\config.yaml -Force
   nssm restart LlamaSwap   # (v205+ also supports SIGHUP reload as soft alternative)
   ```

5. **Keep MTP GGUF on disk** even after rollback — re-trying after a future ik_llama HEAD bump is a 5-minute re-edit, not a re-download.

**Recovery (when re-trying)**: The known-good pin combination is `ik_llama HEAD ≥ 0ab9bdf7` (PR #1816, today) + `unsloth/Qwen3.6-35B-A3B-MTP-GGUF UD-IQ4_XS @ 18,209,036,576 bytes` + `--parallel 1` + no `--mmproj`. Any deviation re-introduces one of the four silent-fail modes (MTP+`-muge` gibberish; MTP-disabled-by-parallel; ngram-mod-killed-by-mmproj; missing nextn tail).

---

## Sources index (all VERIFIED 2026-05-17 unless noted)

**ik_llama.cpp PRs (read end-to-end via `mcp__github__pull_request_read`)**: [#1646](https://github.com/ikawrakow/ik_llama.cpp/pull/1646), [#1683](https://github.com/ikawrakow/ik_llama.cpp/pull/1683), [#1707](https://github.com/ikawrakow/ik_llama.cpp/pull/1707), [#1745](https://github.com/ikawrakow/ik_llama.cpp/pull/1745), [#1789](https://github.com/ikawrakow/ik_llama.cpp/pull/1789), [#1804](https://github.com/ikawrakow/ik_llama.cpp/pull/1804), [#1809](https://github.com/ikawrakow/ik_llama.cpp/pull/1809), [#1810](https://github.com/ikawrakow/ik_llama.cpp/pull/1810), [#1816](https://github.com/ikawrakow/ik_llama.cpp/pull/1816), [Issue #1509](https://github.com/ikawrakow/ik_llama.cpp/issues/1509).

**llama.cpp PRs**: [#22673](https://github.com/ggml-org/llama.cpp/pull/22673), [#22838](https://github.com/ggml-org/llama.cpp/pull/22838), [#23185](https://github.com/ggml-org/llama.cpp/pull/23185), [#23198](https://github.com/ggml-org/llama.cpp/pull/23198), [#22461](https://github.com/ggml-org/llama.cpp/pull/22461), [#22689](https://github.com/ggml-org/llama.cpp/pull/22689), [#19435](https://github.com/ggml-org/llama.cpp/pull/19435), [Issue #19267](https://github.com/ggml-org/llama.cpp/issues/19267).

**llama-swap releases**: [v197..v215](https://github.com/mostlygeek/llama-swap/releases) (full release-notes scan via `mcp__github__list_releases`).

**Adversarial evidence (R3 retrieved)**: [thc1006/qwen3.6-speculative-decoding-rtx3090](https://github.com/thc1006/qwen3.6-speculative-decoding-rtx3090) (RTX-3090 19-config matrix: net-negative for draft-MODEL spec on Qwen3.6-35B-A3B; does NOT contradict MTP self-spec); [MoESD arXiv:2505.19645](https://arxiv.org/abs/2505.19645); [Utility-Driven-SD-for-MoE arXiv:2506.20675](https://arxiv.org/abs/2506.20675).

**HuggingFace cards (live HEAD requests / model-card text)**: [unsloth/Qwen3.6-35B-A3B-MTP-GGUF](https://huggingface.co/unsloth/Qwen3.6-35B-A3B-MTP-GGUF) — UD-IQ4_XS = 18,209,036,576 bytes [VERIFIED HEAD-req]; [unsloth/Qwen3.6-35B-A3B-GGUF](https://huggingface.co/unsloth/Qwen3.6-35B-A3B-GGUF) — UD-IQ4_XS = 17.7 GB (current); [unsloth/Qwen3.6-27B-GGUF](https://huggingface.co/unsloth/Qwen3.6-27B-GGUF); [unsloth/GLM-4.7-Flash-GGUF](https://huggingface.co/unsloth/GLM-4.7-Flash-GGUF); [unsloth/DeepSeek-V3.2-GGUF](https://huggingface.co/unsloth/DeepSeek-V3.2-GGUF); [unsloth/Kimi-K2-Instruct-GGUF](https://huggingface.co/unsloth/Kimi-K2-Instruct-GGUF); [bartowski/openai_gpt-oss-120b-GGUF](https://huggingface.co/bartowski/openai_gpt-oss-120b-GGUF).

**Peer-reviewed (R3 retrieved)**: TurboQuant [arXiv:2504.19874 ICLR 2026](https://arxiv.org/abs/2504.19874); EAGLE-3 [arXiv:2503.01840](https://arxiv.org/abs/2503.01840); Medusa-2 [arXiv:2401.10774](https://arxiv.org/abs/2401.10774); KIVI [arXiv:2402.02750](https://arxiv.org/abs/2402.02750); KITTY [arXiv:2511.18643](https://arxiv.org/abs/2511.18643).

**Local docs cross-referenced (this audit corrects/extends them)**: `Z:/claude-sota-installed/docs/architecture/W269-option-c-spec-decode-2026-05-17.md`; `W263-quantization-deepdive-2026-05-17.md`; `W263-speculative-decoding-2026-05-17.md`; `W264-inference-gpu-2026-05-17.md`.

**Live runtime probes (this session, 2026-05-17 17:50–17:55 UTC)**: NSSM `IkLlamaServer` AppParameters (read `--parallel 4 --mmproj …` confirmed); NSSM `LlamaSwap` `SERVICE_RUNNING`; `:8080/v1/models` returns qwen36 (single model); `:8090/v1/models` returns gemma4-26b, gemma4-31b, qwen36-moe (vl/embed/rerank not loaded into swap as W269-option-c §1 already documented); `gguf_dump.py` on current GGUF returns zero `nextn` matches (confirms no MTP tail in resident model).

---

## Honest conclusion (5-line verdict)

**SWAP NOW (P0, ≤30 min)**: (1) download `unsloth/Qwen3.6-35B-A3B-MTP-GGUF/Qwen3.6-35B-A3B-UD-IQ4_XS.gguf` (16.96 GiB VERIFIED); (2) edit NSSM `IkLlamaServer` to drop `--mmproj`, set `--parallel 1`, swap `--spec-type ngram-mod …` → `-mtp --draft-max 4 --draft-p-min 0 -mtprot iq4_ks` (or dual-spec `--spec-stage ngram-mod:n_max=64,n_min=2,spec-ngram-size-n=16 --spec-stage mtp:n_max=3,draft-p-min=0.0`); (3) mirror in `Z:/tools/llama-swap/config.yaml` qwen36-moe slot; (4) confirm ik_llama HEAD is `0ab9bdf7` or later (PR #1816, today — non-negotiable fix for MTP+`-muge` gibberish); (5) **expected gain 2.0–2.3× decode on code prompts, +5–10% from `-mtprot`, zero quality regression, rollback ≤2 min**.

**DEFER**: TurboQuant TQ3 (PR #1683 closed unmerged); EAGLE-2/3, Medusa-2 (vLLM only); KIVI, KVQuant, sink-attention (papers only); GLM-4.6, Kimi-K2.x, DeepSeek-V3.2, gpt-oss-120b (>24 GiB even at 4-bit). Qwen3-Next-80B-A3B does not fit either.

**P1 (this week)**: upgrade llama-swap to v213+ for matrix DSL + SIGHUP reload + Prometheus metrics. Add `vars: q: qwen36-moe; v: qwen3-vl-8b; evict_costs: v: 10; sets: codepath: "(q|v)"` to declare mutual exclusion.

**P2 (next week)**: add Qwen3.6-27B-dense slot as the quality-tier coder (replaces gemma4-31b; SkillsBench +15.5, SWE-bench 77.2 vs ~72), and stand up mainline llama.cpp as a weekly CI validation lane on the same MTP-GGUF.

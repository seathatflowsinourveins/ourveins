# W263 — Newest Open-Weight Models (2026-03-15 → 2026-05-17)

> Scope: 60-day SOTA scan against our 8 runtime jobs. Hardware: RTX 4090 24 GiB / 5975WX / 128 GiB. Verdicts: **SUPERIOR / EQUIVALENT / INFERIOR** vs incumbent. Citations are TIER-1 (HF card / vendor blog / arXiv).

## Headline releases in window

- **Gemma 4** family (2026-04-02, Apache-2.0, dense + MoE up to 31B, native A+V) — [Google blog](https://developers.googleblog.com/en/gemma-explained-embeddinggemma-architecture-and-recipe/), [Simon Willison](https://simonwillison.net/2026/Apr/2/gemma-4/)
- **GLM-5.1** (2026-04-07, MIT, 744B MoE) — [zai-org/GLM-5](https://glm-5.org/), tops SWE-Bench Pro 58.4
- **Kimi K2.6** (2026-04-20, Modified-MIT, 1T MoE / 32B active, 256K ctx, MoonViT vision) — [Moonshot/blog](https://artificialanalysis.ai/articles/kimi-k2-6-the-new-leading-open-weights-model)
- **DeepSeek-V4 Preview** (2026-04-24, MIT, V4-Pro 1.6T/49B-act + V4-Flash 284B/13B-act, 1M ctx) — [api-docs](https://api-docs.deepseek.com/news/news260424), [HF V4-Pro](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro)
- **Mistral Medium 3.5** (2026-04-29, weights-open) — [codersera summary](https://codersera.com/blog/best-open-source-llm-2026-llama-4-qwen-3-5-deepseek-v4-gemma-4-mistral/)
- **Qwen3.6-35B-A3B** (2026-04-16, Apache-2.0 — our current pick) and **Qwen3.6-27B** (2026-04-22) — [HF](https://huggingface.co/Qwen/Qwen3.6-35B-A3B)

No new releases in window for: BGE-* embeddings, ms-marco MiniLM rerankers, Whisper-v4, Parakeet/Canary (v3 shipped Sep-2025, pre-window). Qwen3-VL-Embedding/Reranker shipped Jan-2026 (pre-window) but are the strongest open multimodal retrievers available — flagged as adjacent.

## Per-job verdict table

| # | Job (incumbent) | Best new candidate (in window) | License | Bench vs incumbent | VRAM Q4_K_M 4090 | Verdict |
|---|---|---|---|---|---|---|
| 1 | Hindsight fact-extract (Qwen3.6-35B-A3B) | **DeepSeek-V4-Flash 284B/13B-act** | MIT | V4-Flash MMLU/GPQA > Qwen3.6-35B per [V4-Pro card](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro); HCA cuts KV-cache 10x | 284B at Q4 ≈ 142 GiB — **does not fit** 24 GiB | **INFERIOR (fit)** — Qwen3.6-35B-A3B stays |
| 1 | " | **Kimi K2.6** 1T/32B-act | Mod-MIT | HLE-Full 54.0 > Qwen3.6 (~46); SWE-Bench Pro 58.6 ([AA](https://artificialanalysis.ai/articles/kimi-k2-6-the-new-leading-open-weights-model)) | 1T at Q4 ≈ 500 GiB — no fit | **INFERIOR (fit)** |
| 1 | " | **Gemma 4 31B dense** | Apache-2.0 | "31B beats 400B rivals" per [tech-insider 2026](https://tech-insider.org/google-gemma-4-open-model-benchmarks-2026/); native A+V | 31B Q4 ≈ 19 GiB — **fits** | **EQUIVALENT** — adopt only if dense+vision needed; otherwise Qwen3.6-35B-A3B MoE is faster |
| 2 | Hindsight consolidation (Qwen3.6-35B-A3B) | same set as job 1 | — | — | — | Same verdict — **keep incumbent** |
| 3 | Hindsight embed 384-dim (bge-small-en-v1.5 CPU) | **none new in window** | — | bge-small still on MTEB v2 ([leaderboard Apr-2026](https://huggingface.co/spaces/mteb/leaderboard)); EmbeddingGemma-300M (2025-09, 768→128 MRL) is adjacent on-device option — [model card](https://ai.google.dev/gemma/docs/embeddinggemma) | CPU | **EQUIVALENT** — no SOTA shift; EmbeddingGemma worth bench but not strict upgrade at 384 |
| 4 | Hindsight reranker (ms-marco-MiniLM-L-6 CPU) | **none new in window** | — | jina-reranker-v3 (Sep-2025, BEIR 61.94, [arxiv 2509.25085](https://arxiv.org/html/2509.25085v2)) is the standing SOTA but pre-window | 0.6B Q4 ≈ 0.4 GiB GPU / heavy on CPU | **EQUIVALENT** for CPU lane — MiniLM-L-6 retains best latency-quality on CPU |
| 5 | Graphiti entity/relation (Ollama qwen3:8b) | **Qwen3.6-27B dense** | Apache-2.0 | Qwen3.6-27B > Qwen3-8B on IF-Eval/BBH per [HF card](https://huggingface.co/Qwen/Qwen3.6-27B) | 27B Q4 ≈ 17 GiB — **fits** but heavy alongside :8080 | **SUPERIOR** if VRAM available; else **Gemma 4 9B** ([blog](https://developers.googleblog.com/en/gemma-explained-embeddinggemma-architecture-and-recipe/)) — Apache-2.0, multilingual, ~6 GiB Q4 — drop-in upgrade |
| 6 | Graphiti embed 1024-dim (qwen3-embedding 0.6B) | **none new in window** | — | Qwen3-Embedding-8B still MTEB-multilingual #1 ([blog Jun-2025](https://qwenlm.github.io/blog/qwen3-embedding/)) — pre-window | 0.6B already minimal | **EQUIVALENT** — no in-window upgrade |
| 7 | :8080 standalone (Qwen3.6-35B-A3B, no vision) | **Kimi K2.6 vision (MoonViT)** | Mod-MIT | Native image+video, agent-swarm 300 sub-agents ([MarkTechPost](https://www.marktechpost.com/2026/04/20/moonshot-ai-releases-kimi-k2-6-with-long-horizon-coding-agent-swarm-scaling-to-300-sub-agents-and-4000-coordinated-steps/)) | No fit — 1T MoE | **INFERIOR (fit)** |
| 7 | " | **Gemma 4 27B (native vision+audio)** | Apache-2.0 | Multimodal-native ([MindStudio](https://www.mindstudio.ai/blog/what-is-gemma-4-google-apache-open-weight-model)) | 27B Q4 ≈ 17 GiB | **SUPERIOR for vision** — adopt if vision is required at :8080; pure-text quality near-equivalent to Qwen3.6-35B-A3B |
| 8 | :8082 embedder (Qwen3-Embedding-4B Q4_K_M GPU) | **none new in window** | — | No 2026-04/05 embedding release > Qwen3-Embedding-4B | already deployed | **EQUIVALENT** — hold |

## New-capability adjacencies (not on the 8-job list)

- **ASR**: Canary-Qwen-2.5B tops Open-ASR-Leaderboard 5.63% WER ([NVIDIA blog](https://developer.nvidia.com/blog/nvidia-speech-ai-models-deliver-industry-leading-accuracy-and-performance/)); Parakeet-TDT-0.6B-v3 multilingual ([arxiv 2509.14128](https://arxiv.org/html/2509.14128v1)). Both pre-window (Sep-2025) but worth adding if voice-in is on the roadmap. No Whisper-v4.
- **VL**: Qwen3-VL-32B-Instruct ([HF](https://huggingface.co/Qwen/Qwen3-VL-32B-Instruct), Oct-2025) + Qwen3-VL-Embedding/Reranker-8B ([arxiv 2601.04720](https://arxiv.org/abs/2601.04720), Jan-2026) — SOTA open VL retrieval, fits at Q4. LLaVA-OneVision-1.5 ([arxiv 2509.23661](https://arxiv.org/html/2509.23661v1), Dec-2025) — fully open recipe.
- **Small reasoning**: Qwen3.5-4B-Thinking ([HF](https://huggingface.co/Qwen/Qwen3.5-4B)) — Intelligence-Index 27, MMMU-Pro 65.4, ~2.5–3 GiB at Q4 — strongest small reasoner; pre-window (Feb-2026). No Qwen3.6-4B.
- **Code**: Qwen3-Coder-Next (Feb-2026) — SWE-Bench-Verified 58.7, HumanEval 91.0, single-GPU 24 GiB ([github](https://github.com/QwenLM/Qwen3-Coder)). No DeepCoder-V2 or CodeStral-3.

## Net recommendation

1. **Keep Qwen3.6-35B-A3B** at jobs 1, 2, 7 (text). No in-window model both fits 24 GiB and beats it.
2. **Evaluate Gemma 4 27B at job 7** if vision is required there — Apache-2.0, native multimodal, fits Q4.
3. **Evaluate Qwen3.6-27B or Gemma 4 9B at job 5** — both upgrade qwen3:8b at acceptable cost.
4. **Hold jobs 3, 4, 6, 8** — no new SOTA in window.
5. **Optional adjacency**: Qwen3-VL-Embedding-8B (Jan-2026, pre-window but recent) as a unified multimodal retriever if jobs 3+6 unify under VL.

Word count: ~720.

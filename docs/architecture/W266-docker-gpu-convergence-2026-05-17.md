# W266 — Convergence Check on W265 "Docker rejected for GPU" + "Hybrid Pareto" (2026-05-17)

> Multi-angle audit (5 angles, ~700 w). **VERDICT: NEEDS-REVISION** — W265's *conclusion* (hybrid Pareto, native for GPU, Docker for the polyglot stack) is **CONFIRMED** by independent evidence; but the *headline benchmark citation* (28% regression / 85 vs 160 tok/s on dev.to/alanwest) is **mis-attributed**, and the "Docker Desktop EULA" risk is **less load-bearing** than W265 framed because the only Docker-without-WSL2 path on Windows (Docker CE + Windows Server containers) cannot serve CUDA anyway. The cardinal-rule story holds; the numeric story needs a correction.

## Angle 1 — Benchmark cross-validation: W265's tok/s numbers are mis-cited

**Claim verified against the source it cites**: W265 attributes "85 vs 160 tok/s WSL2-vs-native-Ubuntu, narrowed to 115 vs 160 with WSL 2.7.3" to `dev.to/alanwest/running-llms-on-windows-native-vllm-vs-wsl-vs-llamacpp-compared-37a9`. **That article does not contain those numbers.** WebFetch of the article returns: native vLLM ~72 tok/s vs WSL vLLM ~65-70 tok/s on RTX 3090 + Qwen3-27B — a **5-10% delta, not 28%** (`https://dev.to/alanwest/running-llms-on-windows-native-vllm-vs-wsl-vs-llamacpp-compared-37a9`).

**Actual source**: the 85/160 + 115/160 numbers come from one Reddit comment cited in the *README* of `devnen/qwen3.6-windows-server` (the "Honest framing" section), which itself flags it as "**one community member's report**" with no model, quant, or build-flag detail (`https://github.com/devnen/qwen3.6-windows-server`, source comment `https://www.reddit.com/r/LocalLLaMA/comments/1sw21op/comment/oid8d9n/` — uncached, not independently re-runnable). Single anecdote, not an aggregated benchmark.

**Aggregate evidence on the actual penalty**: NVIDIA's own CUDA-on-WSL benchmarks claim parity ("within 1% in certain benchmarks", `https://developer.nvidia.com/blog/leveling-up-cuda-performance-on-wsl2-with-new-enhancements/`); Puget Systems' HPL/HPCG/NAMD comparison shows WSL2 within a few % of native (`https://www.pugetsystems.com/labs/hpc/wsl2-vs-linux-hpl-hpcg-namd-2354/`); InsiderLLM's 2026 guide reports "Ollama on Windows native vs WSL2 shows only a **10-13% difference** in tok/s, and with GPU offloading the gap shrinks to near-zero" (`https://insiderllm.com/guides/wsl2-local-ai-windows-guide/`). The reproducible community number is **5-15%**, not 28%.

**Verdict A1**: W265's headline number cherry-picks the worst-case anecdote and mis-attributes the URL. The *direction* (native faster than WSL2 faster than Docker-on-WSL2) is correct; the *magnitude* claim should be revised to "5-15% typical, 25%+ possible on tight kernels".

## Angle 2 — Vendor deploy guides

- **llama.cpp**: official `docs/docker.md` ships CUDA/ROCm/MUSA images and Docker compose is the **recommended production pattern** (`https://github.com/ggml-org/llama.cpp/blob/master/docs/docker.md`); native systemd is a documented Linux alternative (`https://finding-intuition.com/posts/2025-09-28-llama-cpp-service`). **No upstream Windows-service recipe.**
- **vLLM**: Docker is `docs.vllm.ai/en/stable/deployment/docker/` — official; warns "use `--ipc=host`" but does not deprecate it. **Native Windows wheels exist (2026) and are now preferred** for single-host (`https://dev.to/alanwest/...` — verbatim "native vLLM just became the obvious choice").
- **Ollama**: ships both — `docs.ollama.com/docker` and `winget` SCM; community RAG guides (`docs.docker.com/guides/rag-ollama`) all use Docker.
- **ik_llama.cpp** / **llama-swap**: no Docker images upstream; native binaries the only canonical channel.

**Verdict A2**: Upstreams treat Docker as *equal-citizen* for production GPU on Linux/WSL2 — they do **not** universally prefer native. W265's blanket "all-Docker = REJECT" is over-rotated; the correct framing is "for a 23/24 GiB VRAM budget on Qwen3-35B at 96k ctx, the *headroom margin* (not the throughput delta) is the binding constraint".

## Angle 3 — MLOps community consensus

HN thread on local LLMs (`https://news.ycombinator.com/item?id=42100560`) was 429-rate-limited but Google-cached snippets and the article ecosystem converge: for **NVIDIA Windows users**, native is "practically flawless now" and recommended for the inference path; Docker is recommended for the rest of the stack. dev.to articles and Medium roundups uniformly recommend a **hybrid pattern** (Docker for shared services, native for the perf-critical inference path) — exactly W265's verdict. No serious 2025-2026 source recommends all-Docker for a single-host GPU runtime; no serious source recommends all-native either.

**Verdict A3**: Community consensus **confirms** W265's hybrid recommendation.

## Angle 4 — Docker Desktop alternatives W265 didn't fully analyze

- **Docker CE / Moby on Windows Server** (no Desktop) — `https://learn.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/gpu-acceleration` confirms Windows containers support **only DirectX**, *not CUDA*: "DirectX (and all frameworks built on top of it) are the only APIs that can be accelerated with a GPU today. 3rd party frameworks are not supported." Hyper-V isolation + Linux container = "GPU acceleration … is not currently supported." **There is no Docker-without-WSL2 path on Windows that runs CUDA.** This **invalidates** the "EULA escape via Docker CE" hope.
- **Podman Desktop** — same WSL2 GPU-PV path as Docker Desktop; Apache-2.0 with no EULA risk (`https://podman-desktop.io/docs/podman/gpu`). W265 correctly flagged this as the strongest EULA fallback.
- **Rancher Desktop** — W265 correctly noted Win-GPU issue #8487 still open in 2026; skip is the right call.
- **k3d / k3s native Windows** — k3s does not run native on Windows; require WSL2 single-node anyway.

**Verdict A4**: W265's alternatives matrix is **structurally correct**; Docker CE is *not* an EULA escape because it can't do CUDA on Windows. Podman Desktop remains the only viable EULA-fallback.

## Angle 5 — Anthropic / CC community: re-verifying "ZERO guidance"

DeepWiki sweep of `anthropics/claude-code` (this audit, 2026-05-17): "Claude Code primarily focuses on providing a secure and isolated development environment using DevContainers… The provided context does not indicate built-in support or specific recommendations for managing long-running supporting services like model servers or databases on the local host for production deployment." Devcontainer doc (`https://code.claude.com/docs/en/devcontainer`) covers *Claude Code itself* in a container, not service management for the runtime around it.

Grep of packed-repomix bundles for `NSSM|WinSW|Servy|Shawl|supervisord` over `everything-claude-code` (16k+ files), `awesome-claude-code`, `shanraisshan_claude-code-best-practice`: **zero substantive hits** for service-manager recommendations. The `systemd` hit in CCBP is about settings.json drop-in directory semantics, not service deployment.

**Verdict A5**: **CONFIRMED** — Anthropic + CCBP + CC community catalogs provide **no canonical service-management or container-platform guidance** for the local agent runtime. W265 is correct; this is greenfield territory.

## Overall verdict — NEEDS-REVISION (not REFUTE)

W265's **architectural conclusion is sound** (hybrid Pareto: native for the 6 GPU/Python services, Docker for the 10 polyglot observability/DB services, Servy/Shawl over NSSM). Three corrections to land:

1. **Replace the 28% / 85-vs-160 citation** with the actually-defensible "5-15% typical, 25%+ possible on tight kernels" framing, citing InsiderLLM + dev.to/alanwest + Puget. The *binding* constraint for Tier A is **VRAM headroom on a 24 GiB consumer card** (the GPU-PV pinned-memory tax), **not** raw throughput.
2. **De-emphasize the Docker Desktop EULA** as a decision driver — solo operator clears the threshold, and the only EULA-free Docker on Windows (Docker CE + Windows containers) **cannot do CUDA**, so the escape hatch is illusory. Real EULA fallback = Podman Desktop only.
3. **Acknowledge upstream Docker is the primary deploy channel** for llama.cpp / vLLM / Ollama on Linux/WSL2; the hybrid choice here is *runtime-specific* (24 GiB VRAM + 35B at 96k ctx), not a universal "Docker is bad for GPU" claim.

Cardinal-rule analysis, Servy/Shawl SOTA pick, NSSM-is-dead diagnosis, and Pareto-frontier conclusion all stand. Update the cited numbers and EULA framing; keep the architecture.

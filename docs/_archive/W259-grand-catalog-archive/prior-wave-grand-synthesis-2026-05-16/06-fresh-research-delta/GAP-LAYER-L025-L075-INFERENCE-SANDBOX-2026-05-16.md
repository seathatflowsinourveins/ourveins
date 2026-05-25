# GAP-LAYER L0.25 (Local Inference) + L0.75 (Sandbox/Container) — 2026-05-16

> Sourced from sota-researcher fork (agentId a058977002fbb5c53, 2026-05-16 14:50 PT)
> R1 multi-source ≥4: GitHub MCP + DeepWiki + Context7 + WebFetch
> Workspace HEAD `16c985f4` 2026-05-16

## §A — L0.25 Local Inference Runtime gap findings

| Candidate | ★ | License | 1-line value | Probe-DAG | Disposition |
|---|---|---|---|---|---|
| **vllm-project/vllm** | **80,178** | Apache-2.0 | Highest-throughput open inference engine; PagedAttention + continuous batching + 8 speculative-decoding methods (EAGLE3, MTP, PARD, DFlash) | P1 fresh today ✓, 200+ archs, NVIDIA+AMD+TPU+Apple Metal | **INSTALL** |
| **sgl-project/sglang** | **27,866** | Apache-2.0 | Peer to vLLM; RadixAttention KV reuse; Mooncake RDMA P2P weight transfer 2026-04-29 (7x speedup for 1T Kimi-K2) | P1 fresh ✓, Apache, Mooncake verified | **INSTALL** |
| **vllm-project/vllm-metal** | 1,149 | Apache-2.0 | Community Apple Silicon plugin using MLX backend | P1 fresh ✓ (NEW 2025-12), M1-M5 | **STUDY-PILOT** (Mac-only operator) |
| **jundot/omlx** | **14,281** | Apache-2.0 | Apple Silicon LLM server w/ continuous batching + SSD caching; menu-bar managed; OpenAI API; oQ-quant 2026-05-14 | P1 fresh ✓ (NEW 2026-02-13), VLM+text+TTS, 14k★ in 90 days | **INSTALL** (Mac primary local-serve) |
| **raullenchai/Rapid-MLX** | 2,367 | Apache-2.0 | "4.2x faster than Ollama" [SELF-REPORTED], 0.08s cached TTFT, 17 tool parsers, drop-in OpenAI for Claude Code | P1 fresh ✓ (NEW 2026-02-25), [SELF-REPORTED benchmark] | **STUDY-PILOT** (verify benchmark before INSTALL) |
| **kvcache-ai/Mooncake** | **5,340** | Apache-2.0 | Powers Kimi K2 prod on 128 H200 w/ PD-disagg; 75% req throughput; 87→190 GB/s KV transfer (4.6x vs TCP); 57% TTFT cut w/ SSD offload | P1 fresh ✓, vLLM+SGLang+LMCache+NIXL, Kimi production 1T-param | **STUDY-PILOT** (multi-node only) |
| **vllm-project/aibrix** | 4,807 | Apache-2.0 | K8s-native middleware: routing, autoscale, KV-cache opt | P1 last release 2025-11, K8s-only | **DEFER** (single-host today) |
| **SemiAnalysisAI/InferenceX** | 970 | not specified | Continuous benchmarks Qwen3.5/DeepSeek/GPTOSS on GB200/MI355X/B200/H100 | P3 license unclear ✗ | **STUDY-PILOT** (cite benchmark source) |
| **Mininglamp-AI/cider** | 335 | not specified | W8A8/W4A8 INT8 TensorOps on Apple M5 (1.2-1.9x prefill); MLX custom primitive | P1 fresh ✓ (NEW 2026-04-27), P3 license unclear ✗ | **DEFER** (license verify first) |
| **spark-arena/sparkrun** | 221 | not specified | Manage llama.cpp/vLLM/SGLang on NVIDIA DGX Spark | P6 DGX Spark only | **REJECT** (vendor-niche) |

## §B — L0.75 Sandbox/Container gap findings

| Candidate | ★ | License | 1-line value | Probe-DAG | Disposition |
|---|---|---|---|---|---|
| **firecracker-microvm/firecracker** v1.15 (2026-03-09) | **34,383** | Apache-2.0 | AWS Lambda/Fargate substrate; v1.15: VMClock + Granite Rapids + virtio-mem hot-plug; PCI in v1.13 | P1 fresh ✓, Kata/containerd/Ignite, AWS Lambda + Fargate prod | **INSTALL** |
| **deeplethe/forkd** | 214 (NEW May 2026) | Apache-2.0 | **101ms fan-out at N=100 microVMs from warmed parent snapshot via mmap MAP_PRIVATE CoW**. 0.12 MiB/child memory. Drop-in E2B SDK + first-class MCP server. AI agent fan-out is design point. | P1 commits today (PR #46 KVM-verified), 25 unit+integration tests CI, LangGraph/AutoGen/CrewAI/MCP, KVM x86_64 Linux only, **Status: Alpha**; 0.1.3 security fix path-traversal | **STUDY-PILOT** (highest-leverage; Alpha-gated; verify on KVM testbed) |
| **cloudflare/sandbox-sdk** v0.6.11 Open Beta | (SDK Apache, runtime proprietary) | split | Cloudflare Workers + Durable Objects + **Docker containers** (NOT V8 isolates) per Bun HTTP on Ubuntu 22.04 | P3 split license, Workers AI native, Cloudflare-lock | **DEFER** (vendor-lock; not portable) |
| **kuasar-io/kuasar** | 1,420 | Apache-2.0 | Multi-sandbox container runtime: WasmEdge + Cloud Hypervisor + Quark + runC unified; OCI/CRI compliant | P1 fresh ✓, Linux | **STUDY-PILOT** (multi-iso-backends abstraction) |
| **arcboxlabs/arcbox** | 91 (NEW Jan 2026) | unspecified | Real isolated machines <200ms boot, local-first, OCI-compatible, Rust + Firecracker | P3 license unverified ✗ | **DEFER** (verify license) |
| **Lisovate/fend** | 18 (NEW Feb 2026) | unspecified | Sandbox dev-script execution; npm install isolated from SSH/creds; Rust microVM | P7 18★ too early | **REJECT** (immature) |
| **X-McKay/abox** | 0 (NEW Mar 2026) | unspecified | Parallel AI agent sandboxing: microVMs + git worktrees + credential proxy Rust | P7 zero ★ | **REJECT** (no traction) |

## §C — Convergence assessment (Axis-1 ≥3-org test)

**PASS — Axis-1 ≥3 organizations:**

- **L0.25 vLLM-engine class**: vllm-project + sgl-project + kvcache-ai + jundot/omlx + Anthropic/OpenAI/Anyscale upstream-cited → ≥5 orgs converging on PagedAttention + continuous batching stack
- **L0.25 Apple-MLX class**: vllm-project/vllm-metal + jundot/omlx + raullenchai/Rapid-MLX + apple/mlx + ARahim3/mlx-tune + SharpAI/SwiftLM → ≥6 orgs
- **L0.75 Firecracker-microVM class**: AWS + Kata + containerd + Weave Ignite + e2b-dev/infra + deeplethe/forkd + arcboxlabs/arcbox + malcolmxsc/neurovisor + anchapin/luminaguard + Humotica/tibet-airlock → ≥10 orgs

**PASS — Axis-2 ≥2 named-T2 dated artifacts within 90 days:**
- vLLM Mooncake integration **2026-05-07** (vllm.ai)
- SGLang RDMA P2P weight transfer w/ Mooncake **2026-04-29** (7x for 1T Kimi-K2)
- vllm-project/semantic-router v0.2 "Athena" **2026-03-10**
- Firecracker v1.15 **2026-03-09** (VMClock + Granite Rapids + virtio-mem)
- forkd N=100 fork in 101ms benchmark + PR #46 KVM-verified **2026-05-16**
- omlx 14k★ in <90 days (created 2026-02-13)

## §D — Architecture impact

### L0.25 — promote to first-class layer **YES**

V-FINAL implicitly assumes Anthropic-only API calls. Cost-control/sovereignty/offline/data-residency operators need a local-runtime primitive. The vLLM+SGLang+MLX trio + Mooncake KV-cache is now THE production-grade open stack (Kimi K2 at 128 H200 = frontier-scale existence proof).

**Placement**: Insert between L0 Substrate and L0.5 Security as **L0.25 Local Inference Runtime**. Wire to L1 Cross-model (vLLM/SGLang serves act as alternate "second-model" peers in T1 consult contract).

**Top-3 INSTALL candidates (L0.25)**:
1. **vllm-project/vllm** — primary NVIDIA/AMD/Intel engine; 80k★
2. **sgl-project/sglang** — peer engine; RadixAttention KV-reuse on multi-turn
3. **jundot/omlx** — Apple Silicon production server (Mac primary); vLLM-Metal as secondary

### L0.75 — NEW LAYER **YES**

L0.5 in V-FINAL is "Security primitives" (auth, secrets, guards) — orthogonal to "sandbox for agent-generated code". The microVM-vs-container performance axis:
- Containers (Docker/runC): 335s @ N=100, no kernel iso
- gVisor: 289s @ N=100, userspace kernel
- Cold Firecracker: 759ms
- **Fork-from-warm Firecracker (forkd): 101ms** — within 10x of containers WITH hardware isolation

Paradigm shift sufficient to deserve own layer. The forkd CoW-fork pattern collapses "import torch" cost across N children — being adopted by Anthropic/OpenAI/Modal upstream per forkd README design statement.

**Top-3 INSTALL candidates (L0.75)**:
1. **firecracker-microvm/firecracker** v1.15 — substrate; AWS-proven; virtio-mem hot-plug 2026
2. **deeplethe/forkd** — fan-out primitive on Firecracker; 101ms N=100; Alpha-gated INSTALL behind feature flag with ≥7-day PILOT acceptance
3. **kuasar-io/kuasar** — multi-isolation-backend abstraction (Wasm + microVM + Quark + runC); per-workload runtime selection

### Bonus L1 routing finding

**vllm-project/semantic-router** v0.2 "Athena" 2026-03-10 — promote to V-FINAL L1 Cross-model as per-request model-selection alternative: Envoy ExtProc with Thompson-Sampling/RouterDC/AutoMix + jailbreak/PII guards + semantic cache. 4.1k★, production-ready, OTel+Prometheus. **DISPOSITION: INSTALL** to V-FINAL-V2 L1.

## §E — Honest non-findings

1. **No verified ik_llama.cpp / KTransformers / TabbyAPI 2026 updates** — GitHub rate-limit cut session; re-probe Q3 2026 for CPU-inference + MoE specifics.
2. **No Daytona alternative with mainstream traction** — Daytona excluded per AGPL-3.0; no 2026-fresh Apache-licensed workspace peer found. CubeSandbox referenced in forkd README but not directly verified.
3. **vLLM aibrix last release 2025-11** — no 2026 release found in DeepWiki; verify via direct GitHub release tags before V-FINAL-V2 commit.
4. **gVisor 2026 freshness not verified** — DeepWiki returned only old fork; assume substrate-stable but flag for refresh.
5. **No verified microvm-on-macOS path for forkd** — x86_64 Linux + KVM only; macOS operators need different primitive.
6. **Modal/E2B-infra benchmarks SELF-REPORTED** — both referenced in forkd README but their N=100 numbers "not in OSS"/"not public"; treat as SELF-REPORTED until measured.
7. **wasmtime/wasmer fresh state not retrieved** — rate-limit; wasm-class sandbox under-probed; defer to Q3 2026.
8. **No 2026 PR evidence for e2b-dev/infra repo direct** — empty search; verify upstream cadence before relying on as INSTALL substrate.

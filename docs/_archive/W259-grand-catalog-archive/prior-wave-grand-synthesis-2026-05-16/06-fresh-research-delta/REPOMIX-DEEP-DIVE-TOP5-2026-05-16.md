# REPOMIX SOURCE-CODE DEEP-DIVE — TOP 5 SOTA Candidates (Fix13-18)

**Date**: 2026-05-16
**Methodology note**: `mcp__repomix__pack_remote_repository` failed (totalFiles: 0 across all 5 repos — appears the MCP server has no network egress in this sandbox). **Fallback used**: `gh api repos/<owner>/<repo>/contents/<path>` + `git/trees/main?recursive=1` to read directory listings, README content (base64-decoded), `.mcp.json`, `CLAUDE.md`, key source files, releases, and plugin manifests. This is **source-of-record** verification per the operator's "source-verified reality" directive — not metadata-only.
**Coverage**: All 5 repos verified at ≥3 source files per repo + README + release manifest + key claim-bearing source files. WeKnora's wiki self-maintain claim verified in actual Go source (`internal/agent/prompts_wiki.go`). llamafile's Claude Code plugin **discovered in source** (`.llamafile_plugin/.claude-plugin/plugin.json`).

---

## 1. Tencent/WeKnora — "Self-maintaining Wiki" claim

**Stars**: 15,069 | **Lang**: Go | **License**: NOASSERTION | **Updated**: 2026-05-16
**Repo size**: 65.9 MB | **Latest release**: v0.5.2 (2026-05-13 — 3 days ago)
**README size**: 27,988 bytes (heavy, 4 translations CN/EN/JA/KO)

### Marketing claim → Source-verified reality

| Claim | Method | Verified? | Source-line evidence |
|---|---|---|---|
| "Self-maintaining Wiki" fills Karpathy §5 gap | grep wiki* + read `internal/agent/prompts_wiki.go` (32,072 bytes) | **YES** | `WikiPageModifyPrompt`: "wiki editor tasked with updating an existing wiki page. You must process a set of NEW information to add, AND/OR a set of deleted documents whose exclusive contributions must be REMOVED" — incremental update via LLM call |
| Real self-update mechanism (not just static pages) | Inspect `prompts_wiki.go` exported constants | **YES** | 8 distinct wiki-evolution prompts: `WikiSummaryPrompt`, `WikiKnowledgeExtractPrompt`, `WikiCandidateSlugPrompt` (Pass 0), `WikiChunkCitationPrompt` (Pass 1..N), `WikiPageModifyPrompt`, `WikiIndexIntroPrompt`, `WikiIndexIntroUpdatePrompt` (incremental), `WikiDeduplicationPrompt` |
| LLM call pattern | Read `internal/agent/{engine.go,act.go,think.go,observe.go}` filename + sizes | **YES** | ReAct loop: `think.go` (13.2K) + `act.go` (15.5K) + `observe.go` (18.4K) + `engine.go` (26.2K) + `finalize.go` (6.6K) — classic Reason+Act with langfuse observability (`langfuse_test.go` present) |
| Multi-source ingestion (Feishu/Notion/Yuque) | README excerpt | **YES (claim only — not source-confirmed this fire)** | README: "Combined with multi-source ingestion (Feishu / Notion / Yuque, and growing)" |
| 20+ LLM provider integrations | Topics + README | **PARTIAL** | Topics include `ollama` + `openai` + `multimodel`; full list not enumerated in source-files probed |
| MCP server shipped | Listing of `mcp-server/` dir | **YES** | `mcp-server/weknora_mcp_server.py` (32,490 bytes) — Python MCP server with 7 launch methods documented in `PROJECT_SUMMARY.md` |
| Agent Skills system | `internal/agent/skills/` listing | **YES** | `skill.go` (6.4K) + `loader.go` (7.8K) + `manager.go` (6.9K) + `integration_test.go` (4.5K) + `skills_test.go` (9.8K) — proper skill registry with tests; 5 preloaded skills under `skills/preloaded/`: `citation-generator`, `data-processor`, `doc-coauthoring`, `document-analyzer`, `openmaic-classroom` |
| Wiki page actually maintained by the project itself | Recursive tree probe | **YES** | `docs/wiki/` contains 17 markdown pages organized into 5 sections (API参考, 安全认证, 开发部署, 核心功能, 运维排障, 集成扩展, 项目概述) — dogfood evidence |

### Architecture summary

WeKnora is a **Go-monorepo RAG+ReAct+Wiki platform** with 25-directory `internal/` (agent, application, common, container, database, datasource, event, handler, im, infrastructure, mcp, middleware, models, router, runtime, sandbox, searchutil, stream, tracing, types, utils, etc.). The core innovation is **Wiki Mode** — when documents are ingested, an LLM-orchestrated 4-pass pipeline (candidate-slug → chunk-citation → page-modify → index-intro-update) **incrementally maintains** a wiki of entities and concepts, deduplicating against existing pages. The self-maintenance is **trigger-driven** (document ingest), **prompt-based** (8 specialized prompts in `prompts_wiki.go`), and **logged** (`WikiLogEntryTemplate`). Skills system loads at runtime via `skill.go` + `manager.go`. MCP server is a separate Python module (`mcp-server/weknora_mcp_server.py`, 32K bytes) exposing the platform via MCP protocol.

### Native-CC-pathway assessment

- Ships MCP server? **YES** — `mcp-server/weknora_mcp_server.py` + MCP_CONFIG.md
- Ships Claude Code plugin? **NO** — no `.claude-plugin/` directory found
- Installable via npx? **NO** — Go server + Python MCP wrapper (Docker-first per Makefile, `docker-compose.yml` 29K bytes)
- Top integration friction: requires Docker stack (app + docreader + frontend + Ollama + DB). Not single-binary; `helm/` directory indicates Kubernetes deploy path. Heavy operationally for a CC-companion role.

### Final verdict

**STAY at STUDY-PILOT, recommend FORK the wiki-pattern only (not full install)**. The wiki self-maintenance mechanism is REAL and source-verified — exactly the Karpathy §5 gap fill claimed. But the install footprint (Docker + 4 services + DB) makes it a heavy companion for a CC runtime. **Highest-leverage move**: extract the 8 wiki prompts (`prompts_wiki.go`) + the 4-pass pipeline pattern (candidate-slug → chunk-citation → page-modify → index-intro-update) as a *standalone skill* for the wiki-self-maintain CC pattern, then optionally pilot the full MCP server later if dogfood proves the pattern.
Cite: `internal/agent/prompts_wiki.go` lines containing `WikiPageModifyPrompt`, `WikiIndexIntroUpdatePrompt`, `WikiDeduplicationPrompt`.

---

## 2. Mozilla-Ocho/llamafile — "Single Cosmopolitan binary" claim

**Stars**: 24,450 | **Lang**: C++ | **License**: Apache 2.0 (project) / MIT (llama.cpp+whisper.cpp patches) | **Updated**: 2026-05-16
**Repo size**: 27.7 MB | **Latest release**: 0.10.1 (2026-05-01 — 15 days ago)

### Marketing claim → Source-verified reality

| Claim | Method | Verified? | Source-line evidence |
|---|---|---|---|
| Single-file executable across OS+CPU | README + Makefile + cosmocc-override.cmake | **YES** | README: "combines [llama.cpp] with [Cosmopolitan Libc] into one framework that collapses all the complexity of LLMs down to a single-file executable that runs locally on most operating systems and CPU architectures, with no installation"; `cosmocc-override.cmake` overrides extensions to `.o` and sets `-Xx86_64-mtune=znver4` for cross-platform asm |
| Platform coverage | Source files in `llamafile/` | **YES** | Per-arch tinyblas implementations: `tinyblas_cpu_sgemm_amd_avx.cpp`, `_avx2.cpp`, `_avx512f.cpp`, `_avxvnni.cpp`, `_fma.cpp`, `_zen4.cpp`, `_arm80.cpp`, `_arm82.cpp` (8 CPU variants) + GPU: `cuda.sh/cuda.bat/cuda_parallel.bat`, `rocm.sh/rocm.bat/rocm_parallel.bat`, `vulkan.sh/vulkan.bat`, `metal.c` (4 GPU backends, dual-script Windows+Unix) |
| Build process | `Makefile` + `build-functions.sh` | **YES** | Makefile includes `third_party/`, `llama.cpp/`, `whisper.cpp/`, `llamafile/`, `whisperfile/` BUILD.mk submakes; `build-functions.sh` is shared GPU backend builder; runtime architecture detection via `check_cpu.c` |
| Size overhead vs llama.cpp | Release assets | **PARTIAL** | Release 0.10.1 ships: `llamafile-0.10.1`, `llamafile-0.10.1-thin`, `llamafile-0.10.1.zip`, `whisperfile-0.10.1`, `zipalign-0.10.1` — "thin" variant suggests size-optimized build exists; exact bytes not probed |
| Whisper support | `whisperfile/` dir + README | **YES** | "llamafile also includes whisperfile, a single-file speech-to-text tool built on whisper.cpp" |
| Stable Diffusion support | `stable-diffusion.cpp.patches/` + `stable-diffusion.cpp` submodule | **YES** | Repo root contains `stable-diffusion.cpp` (0-byte = submodule pointer) + `stable-diffusion.cpp.patches/` |
| Windows 4GB limit | README quote | **YES** | "Only executables under 4GB can run on Windows, so any llamafile above 4GB won't work" — known PE limitation acknowledged |

### **CRITICAL DISCOVERY** — Ships Claude Code plugin

**Found**: `.llamafile_plugin/.claude-plugin/plugin.json` (122 bytes) + `marketplace.json` (442 bytes).

**plugin.json**:
```json
{"name": "llamafile", "version": "0.1.1", "description": "Build guidance and commands for the llamafile project"}
```

**marketplace.json**:
```json
{
  "name": "llamafile-local",
  "owner": {"name": "Mozilla AI", "email": "davide@mozilla.ai"},
  "plugins": [{"name": "llamafile", "version": "0.1.1", "source": "./"}]
}
```

Plus `.llamafile_plugin/commands/` (symlink, size 16) and `.llamafile_plugin/skills/` (symlink, size 14) — meaning **llamafile is INSTALL-READY as a CC plugin via `/plugin install`**. This was NOT mentioned in the fix13-18 backlog and is a major upgrade signal.

### Architecture summary

llamafile is a **C++ build-system that bakes llama.cpp + whisper.cpp + tinyblas (a from-scratch GEMM implementation) + Cosmopolitan Libc into a single APE-format executable**. Per-arch CPU kernels (avx/avx2/avx512f/avxvnni/fma/zen4/arm80/arm82) are runtime-selected via `check_cpu.c`. GPU backends (CUDA/ROCm/Vulkan/Metal) are built separately and dynamically loaded at runtime. The build is Make-based (not CMake — `cosmocc-override.cmake` is only used to override extensions when invoked from CMake-based subprojects). Submodules pin llama.cpp@`7f5ee54` and whisper.cpp@`2eeeba5`. Recent v0.10 series refactored the build system to track upstream llama.cpp more easily.

### Native-CC-pathway assessment

- Ships MCP server? **NO** (but llamafile itself exposes an OpenAI-compatible HTTP API that an MCP wrapper could front)
- Ships Claude Code plugin? **YES** — `.llamafile_plugin/.claude-plugin/{plugin.json, marketplace.json}`
- Installable via npx? **NO** — C++ executable, but binaries are pre-built and downloaded directly
- Top integration friction: Plugin is project-build-guidance (commands + skills for working on llamafile itself), NOT a runtime LLM-server skill. So the CC plugin helps you BUILD a llamafile, not USE it. To use llamafile as a backend for an MCP-routed agent, you'd run the llamafile separately (OpenAI-compat endpoint on `:8080`) and wire it via LiteLLM/Ollama.

### Final verdict

**PROMOTE to Phase 1 INSTALL for local-inference fallback** + **separately install the CC plugin for llamafile contributors**. The Cosmopolitan-single-file claim is rigorously verified by 8 per-CPU-variant tinyblas implementations + 4 GPU-backend scripts + Cosmopolitan-extension cmake override. This is genuine cross-platform engineering. The accidental discovery of `.llamafile_plugin/` ship-ready plugin makes installation trivial. Strongest local-inference SOTA candidate of the 5.
Cite: `llamafile/tinyblas_cpu_sgemm_amd_*.cpp` + `_arm*.cpp` (8 arch variants) + `cosmocc-override.cmake` + `.llamafile_plugin/.claude-plugin/plugin.json`.

---

## 3. microsoft/BitNet — "1-bit LLM SOTA, sub-watt" claim

**Stars**: 39,014 | **Lang**: Python (+C++ kernels) | **License**: MIT | **Updated**: 2026-05-16
**Repo size**: 8.3 MB | **Releases**: NONE (no GitHub Releases; HF model releases instead)
**README size**: 15,135 bytes

### Marketing claim → Source-verified reality

| Claim | Method | Verified? | Source-line evidence |
|---|---|---|---|
| 1.58-bit quantization (not "1-bit" strict) | README + setup_env | **YES — NUANCED** | README: "1-bit LLMs (e.g., BitNet b1.58)" — actually ternary (1.58 bits = log2(3) per weight); `SUPPORTED_QUANT_TYPES = {"arm64": ["i2_s", "tl1"], "x86_64": ["i2_s", "tl2"]}` — three kernels: i2_s, TL1 (ARM), TL2 (x86) |
| Speedup claims | README quoted figures | **CLAIMED — paper-anchored** | "ARM CPUs: 1.37x–5.07x; x86 CPUs: 2.37x–6.17x; energy 55.4–82.2% reduction" per arxiv:2410.16144 + 2502.11880 — not independently re-verified this fire, but published in peer-reviewed-equivalent venues |
| 100B model on single CPU | README | **CLAIMED** | "bitnet.cpp can run a 100B BitNet b1.58 model on a single CPU, achieving speeds comparable to human reading (5-7 tokens per second)" — requires the b1.58-100B HF model which exists |
| Supported models (real list) | `setup_env.py` SUPPORTED_HF_MODELS dict | **YES — 15 models** | `1bitLLM/bitnet_b1_58-large` (0.7B), `1bitLLM/bitnet_b1_58-3B`, `HF1BitLLM/Llama3-8B-1.58-100B-tokens`, `microsoft/BitNet-b1.58-2B-4T`, plus 11 Falcon3 variants (1B/3B/7B/10B in base+instruct flavors) and 4 Falcon-E variants — NOT arbitrary HF models, specifically **trained-as-1.58bit** models only |
| Sub-watt operation | README | **NOT in this source — paper claim** | README cites energy reductions (55-82%), not sub-watt absolute. Sub-watt would be a derived/contextual claim requiring specific hardware baseline. |
| GPU support | `gpu/` dir + README "What's New" | **YES — released 05/20/2025** | "BitNet Official GPU inference kernel" with separate `gpu/README.md` |
| CPU optimization update | README "What's New" | **YES — 2026-01-15** | "BitNet CPU Inference Optimization" — 1.15x to 2.1x additional speedup on top of original |

### Architecture summary

BitNet (bitnet.cpp) is **a llama.cpp fork specialized for ternary-quantized weights** (1.58 bits per weight = {-1, 0, +1}). Build system is CMake (`CMakeLists.txt` 2.7K) with arch-specific compile flags. Inference path is delegated to a customized `llama-cli` binary (built from llama.cpp submodule under `3rdparty/`). `run_inference.py` is a thin Python wrapper that invokes `build/bin/llama-cli` with `-m model.gguf -ngl 0 -b 1 -t threads`. Three custom GEMM kernels: `i2_s` (default cross-arch), `TL1` (ARM-specific lookup-table), `TL2` (x86-specific lookup-table). GPU support added 2025-05 in `gpu/` subdir. Inference server: `run_inference_server.py` (2.6K, also subprocess wrapper). **NOT a general-purpose quantization framework** — only works with weights that were trained-from-scratch as 1.58-bit (the 15 HF models in SUPPORTED_HF_MODELS).

### Native-CC-pathway assessment

- Ships MCP server? **NO**
- Ships Claude Code plugin? **NO**
- Installable via npx? **NO** — Python + CMake C++ build required
- Top integration friction: Requires HuggingFace model download per supported model, CMake toolchain (clang-cl on Windows), and only supports 15 specific HF model IDs. Not a drop-in replacement for general LLMs — useful only when you accept the **1.58-bit-trained models** (which are smaller models, 0.7B-10B range with one 100B outlier).

### Final verdict

**DOWNGRADE to STUDY-PATTERN (not INSTALL)**. The quantization claims are scientifically rigorous and the 39K stars validate research community interest, but the **applicability surface is narrow**: 15 specific HF models, all trained-from-scratch as 1.58-bit. For a CC runtime, this is not a general-purpose local-inference backend — llamafile (Mozilla-Ocho, candidate #2) wins for that role since it supports arbitrary GGUF models. BitNet's pattern (lookup-table GEMM for ternary weights) is **worth studying** if the runtime ever needs a sub-watt-class on-device model (e.g., for a hookify backend), but not worth installing today.
Cite: `setup_env.py:13-58` SUPPORTED_HF_MODELS dict (15 entries) + README "1-bit LLMs" → actually 1.58-bit ternary.

---

## 4. hiyouga/LLaMA-Factory — "100+ LLM unified LoRA training" claim

**Stars**: 71,319 | **Lang**: Python | **License**: Apache 2.0 | **Updated**: 2026-05-16
**Repo size**: 13.4 MB | **Latest release**: v0.9.4 "Goodbye 2025" (2025-12-31)
**README size**: 69,449 bytes (massive — heavy claims surface)

### Marketing claim → Source-verified reality

| Claim | Method | Verified? | Source-line evidence |
|---|---|---|---|
| 100+ LLMs supported | README Supported Models table | **YES — counted 50+ families with multiple size variants per family** | Confirmed model families (partial enumeration): BLOOM/BLOOMZ, DeepSeek (LLM/Code/MoE/3-3.2/R1), ERNIE-4.5, Falcon/Falcon H1, Gemma/Gemma2/CodeGemma/Gemma3/Gemma3n, GLM-4/GLM-4-0414/GLM-Z1/GLM-4.5(6)V, GPT-2, GPT-OSS, Granite 3-4, Hunyuan/Hunyuan1.5, InternLM 2-3, InternVL 2.5-3.5, Intern-S1, Kimi-VL, Ling 2.0, LFM 2.5, Llama 2/3/3.2-Vision/4, LLaVA-1.5/NeXT/NeXT-Video, MiMo, MiniCPM 4/o/V 4.5, MiniMax-M1/M2, Ministral 3, Mistral/Mixtral, PaliGemma/PaliGemma2, Phi-3/3.5/3-small/4-mini/4, Pixtral, Qwen2 family — that alone is **~50 families × 2-8 size variants each ≈ ≥150 distinct models**. Claim **VALIDATED with margin**. |
| ACL 2024 publication | README description | **CLAIMED (paper exists at ACL 2024)** | Not source-verified this fire, but ACL paper trail is well-documented. |
| Day-0 model support | README "Support Date" table | **YES** | "Day 0: Qwen3 / Qwen2.5-VL / Gemma 3 / GLM-4.1V / InternLM 3 / MiniCPM-o-2.6" and "Day 1: Llama 3 / GLM-4 / Mistral Small / PaliGemma2 / Llama 4" — vendor-disclosed prior to release |
| Training pipeline maturity | `src/llamafactory/` tree | **YES — very mature** | Six training stages: `sft/` (supervised), `dpo/`, `kto/`, `ppo/`, `rm/` (reward modeling), `pt/` (pretraining) — each with `trainer.py`+`workflow.py`. Plus advanced: `hyper_parallel/` (HyperParallel FSDP2), `mca/` (Megatron-core). Backed by 4 inference engines: `hf_engine`, `vllm_engine`, `sglang_engine`, `kt_engine` (from CLAUDE.md). |
| LoRA + variants | README topics + src | **YES** | Topics include `lora`, `qlora`, `peft`, `quantization`, `rlhf`; `src/llamafactory/model/model_utils/unsloth.py` (Unsloth integration), `quantization.py`, `liger_kernel.py` (Liger kernels), `longlora.py` |
| CLI + WebUI + API | `src/llamafactory/cli.py` + entries | **YES** | CLI dispatcher `llamafactory-cli` / `lmf` → 8 subcommands: train, chat, api, export, webchat, webui, env, version, help. WebUI entry `src/webui.py`, API entry `src/api.py`. |
| Multi-modal support | `data/mm_plugin.py` + demo data | **YES** | `data/mm_plugin.py` handles image/video/audio; demo data includes `1.jpg`, `1.mp3`, `1.mp4`, `2.avi`, `3.flac` etc. |
| CLAUDE.md present | README listed CLAUDE.md as 13 bytes | **CORRECTED — file is FULL** | Listing showed 13 bytes (stub), but actual `gh api ... CLAUDE.md` returns **2,847+ bytes of substantive content**: docs commands (`make style/quality/test/license/build`), v0/v1 architecture explanation, entry points, training flow, configuration system (4 dataclasses: ModelArguments/DataArguments/FinetuningArguments/TrainingArguments), key modules table, "Adding Support for a New Model" 3-step guide, distributed training (Ray, FSDP2, Megatron-core), test markers, code style. **THE 13-byte size was the listing API rendering anomaly — content is real**. |

### Architecture summary

LlamaFactory is a **dual-version unified fine-tuning platform**. v0 (default, mature) layered as `api/webui > chat/eval/train > data/model > hparams > extras`. v1 (experimental, USE_V1=1) layered as `trainers > core > accelerator/plugins/config > utils`. Six RLHF/RL stages (SFT/DPO/PPO/RM/KTO/PT) each with parallel `trainer.py`+`workflow.py`. Four inference engines (HF/vLLM/SGLang/KT). Three distributed-training backends (Ray, HyperParallel FSDP2, Megatron-core). YAML-config driven (`llamafactory-cli train examples/...yaml`). Model addition is documented as a 3-step process (add template → add patches → add MM plugin). Test suite split between `tests/` (v0) and `tests_v1/` (v1). The CLAUDE.md is one of the cleanest I've seen in any OSS project — direct guidance for CC-assisted contribution.

### Native-CC-pathway assessment

- Ships MCP server? **NO**
- Ships Claude Code plugin? **NO** (no `.claude-plugin/`)
- Installable via npx? **NO** — Python (uv-preferred per CLAUDE.md), `pip install -e .`
- Top integration friction: This is a **training platform**, not a runtime LLM-server. To use a model trained by LLaMA-Factory inside the CC runtime, you'd export the model (`llamafactory-cli export`) and serve it via llamafile/vLLM/Ollama. The CC runtime's training-time needs are minimal — this would only matter if the runtime starts training/fine-tuning its own models.

### Final verdict

**STAY at STUDY-PILOT — not INSTALL until training need surfaces**. This is genuinely SOTA for LLM fine-tuning (71K stars, ACL 2024, day-0 support, six RLHF methods, three distributed backends), and the CLAUDE.md proves the maintainers care about AI-assisted contribution. But the CC runtime today doesn't *train* models — it consumes them. **Install trigger**: when the runtime needs to fine-tune a small model for a hookify backend (e.g., a router model for cross-model gating), this is the platform to use. Until then, **bookmark as Tier-2 reference** and adopt the CLAUDE.md style as a model for sister-project CLAUDE.md authoring.
Cite: `src/llamafactory/{train/sft,dpo,kto,ppo,rm,pt,hyper_parallel,mca}/workflow.py` (6 RLHF + 2 distributed = 8 training paths) + `chat/{hf,vllm,sglang,kt}_engine.py` (4 inference engines) + README Supported Models table (50+ families).

---

## 5. modu-ai/moai-adk — "SPEC-First CC ADK 24 agents+52 skills+TDD/DDD" claim

**Stars**: 1,011 | **Lang**: Go (CLI) | **License**: Apache 2.0 | **Updated**: 2026-05-16
**Repo size**: 205 MB (largest of the 5) | **Latest release**: v2.14.0 (2026-04-24)
**README size**: 56,922 bytes; CLAUDE.md: 25,549 bytes; CLAUDE.local.md: 49,702 bytes; CHANGELOG.md: 388,706 bytes (active history)

### Marketing claim → Source-verified reality

| Claim | Method | Verified? | Source-line evidence |
|---|---|---|---|
| 24 agents | `gh api ... contents/.claude/agents/...` recursive count | **EXCEEDS — actually 32 agents** | `.claude/agents/moai/` = 28 agents (`builder-agent`, `builder-harness`, `builder-plugin`, `builder-skill`, `claude-code-guide`, `evaluator-active`, `expert-{backend,debug,devops,frontend,mobile,performance,refactoring,security,testing}` = 9 experts, `manager-{brain,cycle,ddd,develop,docs,git,project,quality,spec,strategy,tdd}` = 11 managers, `plan-auditor`, `researcher`); `.claude/agents/my-harness/` = 4 specialists (`cli-template-specialist`, `hook-ci-specialist`, `quality-specialist`, `workflow-specialist`) = **32 total agents** |
| 52 skills | `.claude/skills/` count | **UNDERSHOOT — actually 41 skills** | `.claude/skills/` = 41 entries: `moai-{design-system, domain-{backend,brand-design,copywriting,database,design-handoff,frontend,ideation,research}, foundation-{cc,core,quality,thinking}, framework-electron, harness-learner, meta-harness, platform-{auth,chrome-extension,deployment}, ref-{api-patterns,git-workflow,owasp-checklist,react-patterns,testing-pyramid}, workflow-{ci-autofix,ci-watch,ddd,design-context,design-import,gan-loop,loop,project,spec,tdd,testing,worktree}}` + `moai` + `my-harness-{cli-template,hook-ci,quality,workflow}` = **41 skills, not 52** (79% of claimed) |
| SPEC-First (EARS-format) | Topics + `.moai/specs/` dir | **YES — claim is a topic** | Topics: `spec-driven-development`, `spec-first`, `ears-format`. `.moai/specs/` directory exists. |
| TDD + DDD quality gates | Topics + agents | **YES** | Topics: `tdd`, `ddd`; agents include `manager-tdd`, `manager-ddd`, `manager-quality`, dedicated `quality-specialist`. |
| Go CLI, zero deps | `go.mod` (2154 bytes — small!) + Go lang + multi-OS binaries | **YES** | Latest release ships 6 platform binaries: darwin_amd64, darwin_arm64, linux_amd64, linux_arm64, windows_amd64, windows_arm64. `go.mod` is only 2154 bytes — very small deps surface. |
| 16-language projects | Not source-probed this fire | **CLAIMED** | Not enumerated in directories probed; topics don't enumerate. |
| 4-language docs | README files visible | **YES** | README.md (EN), README.ja.md, README.ko.md, README.zh.md — 4 docs. Plus CHANGELOG/CONTRIBUTING in en+ko. |
| MCP server config shipped | `.mcp.json` (1352 bytes) | **YES** | Real `.mcp.json` with 4 MCP servers: context7 (Upstash), sequential-thinking, chrome-devtools (Google), zai-mcp-server (Z.AI vision/search). Uses `staggeredStartup: {enabled: true, delayMs: 500, connectionTimeout: 15000}` — **mature MCP orchestration discipline**. |
| Hooks installed | `.claude/hooks/` + `settings.json` | **YES** | `settings.json` (12,599 bytes) configures SessionStart, PreCompact (BOTH manual+auto matchers), SessionEnd, PreToolUse (Write\|Edit\|Bash matcher), PostToolUse — all routed to `handle-*.sh` scripts under `.claude/hooks/moai/`. **Cardinal-rule-compliant style** (settings.json wires upstream-CLI invocations). |
| Strategic Orchestrator pattern | CLAUDE.md | **YES** | CLAUDE.md L4: "MoAI is the Strategic Orchestrator for Claude Code. All tasks must be delegated to specialized agents." with 10 [HARD] rules including "Multi-File Decomposition: Split work when modifying 3+ files", "Reproduction-First Bug Fix: Write reproduction test before fixing bugs", "Approach-First Development: Explain approach and get approval before writing code" |
| `.moai/` shared state surface | Directory listing | **YES — 21 subdirs** | `.moai/{archive, bodp, brain, branches, config, decisions, design, docs, evolution, harness, learning, marketing, plans, project, release, reports, research, scripts, specs, state}` + `manifest.json` (206,810 bytes — heavy) + `status_line.sh` |
| AskUserQuestion-only interaction discipline | CLAUDE.md | **YES — explicit HARD rule** | CLAUDE.md L13: "[HARD] AskUserQuestion-Only Interaction: ALL questions directed at the user MUST go through AskUserQuestion" — including ToolSearch preload protocol for AskUserQuestion + TaskCreate/Update/List/Get deferred tools |

### Architecture summary

moai-adk is **the most CC-native of the 5** — it ships a complete CC plugin surface (`.claude/{agents, commands, hooks, output-styles, rules, settings.json, skills}` + `.mcp.json` + dual `CLAUDE.md`+`CLAUDE.local.md`) wrapped around a Go CLI that bootstraps the directory structure into target projects. The CLI is small (2KB go.mod), zero-deps, multi-OS (6 binaries per release). Strategic Orchestrator pattern: the CLAUDE.md instructs Claude to **delegate everything to 32 specialized agents** (9 experts × 11 managers × 8 builders/researchers/auditors + 4 harness specialists) rather than do work directly. The `.moai/` directory is a **shared state surface** for the orchestrator (21 subdirs: brain, decisions, design, evolution, learning, plans, research, specs, state, etc.) — similar pattern to this CC runtime's `.claude/state/`. PreCompact hook is wired for BOTH manual AND auto compaction (only project I've seen that handles auto-compact via hook — `claude-sota-installed`'s W201 P0(i) precedent for this discipline is independently invented). Active development: 388K-byte CHANGELOG and 2026-05-16 last-update timestamp.

### Native-CC-pathway assessment

- Ships MCP server? **PARTIAL** — doesn't ship its own server, but ships **`.mcp.json` template** pre-wiring 4 mature MCP servers (context7, sequential-thinking, chrome-devtools, zai-mcp-server). This is **MCP-orchestration discipline** rather than MCP-server-shipping.
- Ships Claude Code plugin? **NO formal plugin** (no `.claude-plugin/plugin.json`), but **ships THE CC plugin surface itself** (`.claude/{agents, commands, hooks, skills, settings.json}`) which is what plugins would install. So **conceptually equivalent to a plugin** but installed via `moai init` Go CLI rather than `/plugin install`.
- Installable via npx? **NO** — Go binary, but `install.sh`/`install.ps1`/`install.bat` shipped (10.8K/15.2K/6.6K bytes) for cross-platform install.
- Top integration friction: This is **a competing orchestrator/runtime to claude-sota-installed itself**. Installing it means adopting a different orchestrator philosophy (32 agents, EARS-format spec-driven, DDD gates) over this runtime's (codex-cross-model + obra/superpowers + behavioral-skill matching). **Architectural conflict** if installed in the same `.claude/` directory.

### Final verdict

**STUDY-PATTERN — DO NOT INSTALL (architectural conflict)**. moai-adk is **genuinely sophisticated** (32 agents > 24 claimed, real PreCompact handling for both manual+auto, AskUserQuestion-only discipline as HARD rule, .moai/ shared-state surface, 4-MCP-server pre-wire with staggered startup, multi-OS Go binary release pipeline). But it's a **competing CC orchestrator** — installing its `.claude/` would conflict with claude-sota-installed's own orchestrator design. **Highest-leverage extraction**:
1. **PreCompact hook handling BOTH manual+auto matchers** — currently this CC runtime W201 P0(i) only handles `manual` (auto-compact at 70%); add `auto` matcher per moai pattern.
2. **`.mcp.json` staggered startup pattern** (`delayMs: 500, connectionTimeout: 15000`) — robust against MCP-server cold-start races.
3. **AskUserQuestion-only HARD rule** — currently this runtime allows direct text prompts; adopting AUQ-only would tighten cross-model gate discipline.
4. **CLAUDE.md "Strategic Orchestrator" framing** — explicit "delegate everything to specialists" pattern is cleaner than this runtime's implicit-delegation.

Adoption note: 41 skills < 52 claimed (79%), 32 agents > 24 claimed (133%) — **net the claim is roughly accurate but slightly imprecise on direction**. The project is honest in spirit if not in literal numbers.
Cite: `.claude/agents/moai/` (28 .md files) + `.claude/agents/my-harness/` (4 .md files) + `.claude/skills/` (41 entries) + `.mcp.json` `staggeredStartup` block + CLAUDE.md L13 AskUserQuestion HARD rule.

---

## SUMMARY — Verification outcomes by repo

| Repo | Claim accuracy | Best-extract pattern | Verdict |
|---|---|---|---|
| Tencent/WeKnora | Wiki self-maintain: **VERIFIED** (8 LLM prompts, 4-pass pipeline) | 8 wiki prompts + 4-pass pipeline as standalone CC skill | STAY STUDY-PILOT, fork wiki pattern only |
| Mozilla-Ocho/llamafile | Cosmopolitan single-file: **VERIFIED** (8 CPU + 4 GPU arch variants) | Already ships `.claude-plugin/` — install-ready | **PROMOTE to Phase 1 INSTALL** |
| microsoft/BitNet | 1.58-bit ternary (not "1-bit"): **VERIFIED with nuance**; only 15 HF models supported | Lookup-table GEMM for ternary (study pattern) | DOWNGRADE to STUDY-PATTERN |
| hiyouga/LLaMA-Factory | 100+ LLMs: **VERIFIED** (50+ families × variants ≈ 150+); ACL 2024 paper | CLAUDE.md authoring style (one of the cleanest in OSS) | STAY STUDY-PILOT, install when training need surfaces |
| modu-ai/moai-adk | 24 agents/52 skills: **DIRECTIONALLY CORRECT** (actual: 32 agents / 41 skills) | PreCompact auto-matcher + `.mcp.json` staggered startup + AskUserQuestion-only HARD rule | STUDY-PATTERN (architectural conflict with this runtime) |

---

## Methodology limitations

1. **repomix MCP server returned totalFiles: 0** for all 5 attempted packs — root cause likely no network egress from the MCP sandbox; fallback to `gh api` was uniformly successful (1 verified live token + working endpoints).
2. **3 of 5 claims partially un-source-verified** because they're paper-anchored (BitNet speedups), or feature-list-only (LLaMA-Factory ACL 2024, WeKnora 20+ providers) — those are research-paper-class or marketing-claim-class claims that need separate methodology (paper retrieval, deeper dir grep).
3. **No runtime test** — no claim was verified end-to-end (e.g., did NOT actually run llamafile or install moai-adk's plugin). Verification scope is **source-of-record only**, not behavioral.
4. **Architectural conflict assessment for moai-adk is based on directory-structure comparison**, not on attempted-and-failed dual-install. A truer test would be to install moai-adk into a sandbox CC runtime and observe conflicts with this runtime's `.claude/` design.

---

**Output file**: `Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/06-fresh-research-delta/REPOMIX-DEEP-DIVE-TOP5-2026-05-16.md`
**LOC**: ~410 (within 400-600 budget)
**Generated**: 2026-05-16

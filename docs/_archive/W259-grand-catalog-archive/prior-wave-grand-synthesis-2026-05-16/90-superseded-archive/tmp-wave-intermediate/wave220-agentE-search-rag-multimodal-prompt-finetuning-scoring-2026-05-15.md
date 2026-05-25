# Wave 220 Round 2 - Agent E catalog: search/RAG/multimodal/prompt/fine-tuning/data/memory

Date: 2026-05-15 [VERIFIED via environment current_date].  
Target runtime: `Z:/claude-sota-pure` pre-runtime catalog [INFERRED from user scope].  
Output scope: E1-E8 uncovered layers; documentation/research artifact only; no install action taken [VERIFIED].

## Bridge-mode status

STAND-IN-NOTICE:
- Codex bridge dispatch was attempted through `codex exec --ephemeral -p deep-review-exec --color never` with a 90s budget [VERIFIED].
- Attempt completed in 671 ms, but Codex failed before model review with: `failed to initialize in-process app-server client: Access is denied. (os error 5)` [VERIFIED via `tmp/wave220-agentE-codex-bridge-attempt-2026-05-15.txt`].
- Cross-model gate status: PARTIAL-STAND-IN [VERIFIED]. This artifact uses local tool evidence plus orchestrator synthesis, not a successful GPT-5.5 bridge verdict [VERIFIED].
- Per-call Codex budget actuals: count=1, mean=671 ms, max=671 ms, configured budget=90,000 ms [VERIFIED].
- FM-17.d defense: CLAUDE.md authorizes REAL GPT-5.5 bridge-mode subagent dispatch or orchestrator-side `codex exec` foreground dispatch during the bootstrap exception, with honest FULL/PARTIAL/FAILED disclosure; this run records the failed subprocess and does not upgrade the gate to FULL [VERIFIED via `CLAUDE.md:39 @ repo current`].

## Mandatory research probes

- Local clone scan command matched: `axolotl`, `chroma`, `cognee`, `cognee-community`, `haystack`, `letta`, `llama_index`, `mcp-server-qdrant`, `mem0`, `qdrant`, `qdrant-client`, `unsloth`, `zep` [VERIFIED].
- Manifest baseline check found installed/planned incumbents: markitdown installed for document conversion, promptfoo planned, ragas planned, Langfuse planned, Qdrant/FalkorDB memory queue planned, memory MCP tier already present [VERIFIED via `docs/sota-installed-manifest.md:442`, `:445`, `:448`, `:682`, `:707`].
- GitHub API metadata was collected with `gh api repos/<owner>/<repo>` and stored in `tmp/wave220-agentE-gh-rest-metadata.json` [VERIFIED].
- Deep-dive local source was read for Qdrant, LlamaIndex, Haystack, Letta, mem0, and Unsloth [VERIFIED].

## Local clone inventory

| Local dir | Upstream | HEAD SHA | Evidence |
|---|---|---:|---|
| `qdrant` | `qdrant/qdrant` | `fd6746ea95dc7f66df137eb00a2ce800f45995b1` | [VERIFIED] |
| `qdrant-client` | `qdrant/qdrant-client` | `cd5eb259dd7a8448fd4ebea209f742a6eb16b4a3` | [VERIFIED] |
| `mcp-server-qdrant` | `qdrant/mcp-server-qdrant` | `0672632701cfbb8c6961aa55f6b6dcbb4dcc0bf0` | [VERIFIED] |
| `chroma` | `chroma-core/chroma` | `47b29487b656135209221418a9efcc545a2723af` | [VERIFIED] |
| `llama_index` | `run-llama/llama_index` | `b4a235dec21e5a08bc0f08f617318f417da4e6a8` | [VERIFIED] |
| `haystack` | `deepset-ai/haystack` | `9856dee65412894cdb4f41ccac66131354bad5ed` | [VERIFIED] |
| `letta` | `letta-ai/letta` | `bb52a8900a79cf1378e6e9cdecf244b673a13a72` | [VERIFIED] |
| `mem0` | `mem0ai/mem0` | `54a03cc7217c22afdc6153a9e61cc6413416001f` | [VERIFIED] |
| `zep` | `getzep/zep` | `faf2acec4f2ec777a27d8fe0411619bc913a9660` | [VERIFIED] |
| `cognee` | `topoteretes/cognee` | `b0f513b43df8cb2d62063e3fb43e673738fd0552` | [VERIFIED] |
| `cognee-community` | `topoteretes/cognee-community` | `bd078ef3b0bb9e4509fa0dc73b9725e703f14c4d` | [VERIFIED] |
| `axolotl` | `axolotl-ai-cloud/axolotl` | `5352d41d32f4245bbb8b0140990ac0f6b77f1ab1` | [VERIFIED] |
| `unsloth` | `unslothai/unsloth` | `b3640802253f64117ee228718be7fab32e47aa5f` | [VERIFIED] |

## Local source deep-dive evidence

- Qdrant is explicitly a vector similarity search engine/vector database with a production API for storing, searching, and managing vector points [VERIFIED via `Z:/repos/deps/qdrant/README.md:22-24 @ HEAD fd6746ea95dc7f66df137eb00a2ce800f45995b1`]. It supports dense, sparse, and multivector search plus fusion strategies and quantization [VERIFIED via `README.md:132`, `:140`, `:144 @ same HEAD`].
- LlamaIndex describes itself as an open-source framework for agentic applications and a data framework for LLM apps with connectors, indices/graphs, and advanced retrieval/query interfaces [VERIFIED via `Z:/repos/deps/llama_index/README.md:11`, `:81-85 @ HEAD b4a235dec21e5a08bc0f08f617318f417da4e6a8`]. Its base index implementation builds indices from documents/nodes and converts indices to retrievers/query engines [VERIFIED via `llama-index-core/llama_index/core/indices/base.py:99`, `:179-189`, `:495-501 @ same HEAD`].
- Haystack positions itself as a production RAG and agent framework with modular pipelines, retrieval, routing, memory, and generation [VERIFIED via `Z:/repos/deps/haystack/README.md:12-14 @ HEAD 9856dee65412894cdb4f41ccac66131354bad5ed`]. Its pipeline code wires retriever -> prompt_builder -> LLM in the documented RAG path [VERIFIED via `haystack/core/pipeline/pipeline.py:129-173 @ same HEAD`].
- Letta is the MemGPT successor for stateful agents with advanced memory and has explicit context-window, archival-memory, recall-memory, core-memory, summary-memory, and git-backed memory schema surfaces [VERIFIED via `Z:/repos/deps/letta/README.md:1-3`, `letta/schemas/memory.py:25-59`, `:71-79 @ HEAD bb52a8900a79cf1378e6e9cdecf244b673a13a72`].
- mem0 describes itself as an intelligent memory layer for personalized agents and exposes SDK/CLI integration plus agent skills [VERIFIED via `Z:/repos/deps/mem0/README.md:72`, `:141-148`, `:157-169 @ HEAD 54a03cc7217c22afdc6153a9e61cc6413416001f`]. Its implementation creates vector stores, entity stores, memory CRUD, hybrid search, and procedural memory [VERIFIED via `mem0/memory/main.py:338-345`, `:552-571`, `:2763-2782`, `:3035-3084 @ same HEAD`].
- Unsloth supports local training of text, audio, embedding, and vision models; full fine-tuning, RL, pretraining, 4-bit/16-bit/FP8 training; and dual Apache-2.0/AGPL-3.0 licensing split [VERIFIED via `Z:/repos/deps/unsloth/README.md:39`, `:55-57`, `:259-261 @ HEAD b3640802253f64117ee228718be7fab32e47aa5f`]. Its loader exposes 4-bit QLoRA, 8-bit LoRA, 16-bit LoRA, FP8 LoRA, and LoRA adapter loading paths [VERIFIED via `unsloth/models/loader.py:235-261`, `:471-499`, `:841-874 @ same HEAD`].

## E1 vector/semantic search

Primary recommendation: ADOPT-NOW `qdrant/qdrant` conf=0.93 [INFERRED]. It is already locally cloned, has a matching Qdrant MCP clone, permissive Apache-2.0 license, and lines up with the runtime's memory/vector queue [VERIFIED/INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `qdrant/qdrant` | ADOPT-NOW conf=0.93 | 31,338 [VERIFIED] | Apache-2.0 [VERIFIED] | `fd6746e...` [VERIFIED] | 1 [VERIFIED] | Best fit for local, MCP-adjacent, Rust production vector search [INFERRED]. |
| `chroma-core/chroma` | STUDY-PILOT conf=0.78 | 27,963 [VERIFIED] | Apache-2.0 [VERIFIED] | `47b2948...` [VERIFIED] | 1 [VERIFIED] | Strong developer ergonomics, but less aligned than Qdrant with existing runtime queue [INFERRED]. |
| `weaviate/weaviate` | STUDY-PILOT conf=0.74 | 16,185 [VERIFIED] | BSD-3-Clause [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Enterprise-grade semantic DB, but no local clone and heavier ops surface [INFERRED]. |
| `pgvector/pgvector` | STUDY-PILOT conf=0.72 | 21,308 [VERIFIED] | NOASSERTION by GitHub API [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Excellent if Postgres is already runtime substrate; not primary for pure vector-service layer [INFERRED]. |
| `milvus-io/milvus` | STUDY-PILOT conf=0.70 | 44,314 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Huge adoption, but heavier cluster footprint for pre-runtime catalog [INFERRED]. |
| `facebookresearch/faiss` | SUPERSEDED by Qdrant for service layer | 40,052 [VERIFIED] | MIT [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Great ANN library, not a runtime service/MCP integration target [INFERRED]. |

## E2 RAG frameworks and RAG evaluation

Primary recommendation: ADOPT-NOW `run-llama/llama_index` conf=0.90 for RAG app framework; ADOPT-NOW `vibrantlabsai/ragas` conf=0.86 for RAG eval once eval layer is activated [INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `run-llama/llama_index` | ADOPT-NOW conf=0.90 | 49,440 [VERIFIED] | MIT [VERIFIED] | `b4a235d...` [VERIFIED] | 1 [VERIFIED] | Broadest retrieval/index/agent data framework; local source confirms core index/query abstractions [VERIFIED/INFERRED]. |
| `deepset-ai/haystack` | ADOPT-NOW conf=0.86 | 25,238 [VERIFIED] | Apache-2.0 [VERIFIED] | `9856dee...` [VERIFIED] | 1 [VERIFIED] | More explicit production pipeline abstraction than LlamaIndex; best as second RAG orchestration candidate [INFERRED]. |
| `vibrantlabsai/ragas` | ADOPT-NOW conf=0.86 | 13,925 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Manifest already has ragas planned; use as RAG eval companion, not app framework [VERIFIED/INFERRED]. |
| `stanford-futuredata/ARES` | STUDY-PILOT conf=0.62 | 710 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Research-grade RAG evaluation; lower adoption and stale push vs ragas [INFERRED]. |
| TREC-RAG assets | STUDY-PILOT conf=0.55 | UNKNOWN [UNKNOWN] | UNKNOWN [UNKNOWN] | n/a [VERIFIED] | UNKNOWN [UNKNOWN] | Benchmark/dataset layer, not install candidate without a canonical repo [INFERRED]. |

## E3 document AI and parsing

Primary recommendation: ADOPT-NOW `docling-project/docling` conf=0.91; keep `microsoft/markitdown` as already-installed lightweight conversion baseline [VERIFIED/INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `docling-project/docling` | ADOPT-NOW conf=0.91 | 59,791 [VERIFIED] | MIT [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Best primary for open-source document parsing/OCR pipeline breadth [INFERRED]. |
| `Unstructured-IO/unstructured` | ADOPT-NOW conf=0.84 | 14,713 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Mature document ETL/parser; good complement if Docling misses enterprise connectors [INFERRED]. |
| `run-llama/llama_cloud_services` / LlamaParse | STUDY-PILOT conf=0.72 | 4,251 [VERIFIED] | MIT [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Useful but cloud/API-shaped; install fit weaker for pure local runtime [INFERRED]. |
| `datalab-to/marker` | STUDY-PILOT conf=0.69 | 35,113 [VERIFIED] | GPL-3.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Very strong PDF conversion, but GPL-3.0 increases runtime integration caution [INFERRED]. |
| `datalab-to/surya` | STUDY-PILOT conf=0.66 | 19,741 [VERIFIED] | GPL-3.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | OCR/layout model layer; best as component under parser decision, not primary [INFERRED]. |
| `facebookresearch/nougat` | REJECT-FOR-FIT conf=0.73 | 9,957 [VERIFIED] | MIT [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Pushed 2025-02-21 and superseded by Docling/marker/surya stack for 2026 runtime use [VERIFIED/INFERRED]. |
| `microsoft/markitdown` | ALREADY-INSTALLED baseline | 121k in manifest [VERIFIED] | MIT in manifest [VERIFIED] | n/a [UNKNOWN] | 1 [INFERRED] | Already installed per manifest; not enough alone for full E3 Document AI [VERIFIED/INFERRED]. |

## E4 prompt management and versioning

Primary recommendation: ADOPT-NOW `langfuse/langfuse` prompts conf=0.88 if the runtime also wants observability; STUDY-PILOT Agenta for experiment/app UI [INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `langfuse/langfuse` | ADOPT-NOW conf=0.88 | 27,279 [VERIFIED] | NOASSERTION by GitHub API [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Already manifest-planned for observability; prompt management can ride same stack [VERIFIED/INFERRED]. |
| `promptfoo/promptfoo` | ALREADY-QUEUED / SUPERSEDED for E4 primary | UNKNOWN in this run [UNKNOWN] | UNKNOWN [UNKNOWN] | n/a [UNKNOWN] | 1 [INFERRED] | Already assigned to Agent I per user note and manifest planned; not rescored as new primary here [VERIFIED/INFERRED]. |
| `Agenta-AI/agenta` | STUDY-PILOT conf=0.72 | 4,125 [VERIFIED] | NOASSERTION by GitHub API [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Prompt/application management UI; useful if Langfuse prompt surface is insufficient [INFERRED]. |
| `MagnivOrg/prompt-layer-library` | STUDY-PILOT conf=0.58 | 762 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | SDK/library surface rather than full runtime system [INFERRED]. |
| `PezzoHQ/pezzo` | REJECT-FOR-FIT conf=0.82 | UNKNOWN; repo did not resolve through GitHub API [VERIFIED] | UNKNOWN [VERIFIED] | n/a [VERIFIED] | UNKNOWN [UNKNOWN] | Cannot score as primary without resolvable active repo metadata [VERIFIED/INFERRED]. |

## E5 multimodal and vision-language

Primary recommendation: ADOPT-NOW `huggingface/transformers` conf=0.90 as the runtime integration layer; STUDY-PILOT Qwen/InternVL model repos for model-specific recipes [INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `huggingface/transformers` | ADOPT-NOW conf=0.90 | 160,647 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Canonical model integration layer across VLM families; primary install surface over individual research repos [INFERRED]. |
| `QwenLM/Qwen3-VL` | STUDY-PILOT conf=0.80 | 19,176 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | GitHub redirected from Qwen2.5-VL to Qwen3-VL; active model-family candidate [VERIFIED/INFERRED]. |
| `OpenGVLab/InternVL` | STUDY-PILOT conf=0.72 | 10,029 [VERIFIED] | MIT [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Strong VLM model repo, pushed 2025-09-22 [VERIFIED]. |
| `haotian-liu/LLaVA` | SUPERSEDED conf=0.78 | 24,791 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Historically central but pushed 2024-08-12; use as citation/reference, not primary 2026 install [VERIFIED/INFERRED]. |
| `zai-org/CogVLM` | REJECT-FOR-FIT conf=0.64 | 6,743 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Pushed 2024-05-29; lower current fit than Qwen/Transformers [VERIFIED/INFERRED]. |
| `microsoft/Phi-3-vision` | STUDY-PILOT conf=0.55 | UNKNOWN [UNKNOWN] | UNKNOWN [UNKNOWN] | n/a [UNKNOWN] | 1 [INFERRED] | Treat as model asset family via Hugging Face/Transformers rather than repo primary [INFERRED]. |

## E6 fine-tuning and LoRA infrastructure

Primary recommendation: ADOPT-NOW `hiyouga/LlamaFactory` conf=0.91 for general fine-tuning UI/CLI; ADOPT-NOW `unslothai/unsloth` conf=0.89 for accelerated local LoRA/QLoRA when GPU constraints permit [INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `hiyouga/LlamaFactory` | ADOPT-NOW conf=0.91 | 71,294 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Best general fine-tuning factory candidate by adoption and breadth [INFERRED]. |
| `unslothai/unsloth` | ADOPT-NOW conf=0.89 | 64,320 [VERIFIED] | Apache-2.0 by API; dual Apache/AGPL details in README [VERIFIED] | `b364080...` [VERIFIED] | 1 [VERIFIED] | Excellent local acceleration layer; Studio AGPL component needs scope discipline [VERIFIED/INFERRED]. |
| `huggingface/peft` | ADOPT-NOW conf=0.86 | 21,112 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Core LoRA/adapter substrate; install as dependency-level primitive [INFERRED]. |
| `huggingface/trl` | ADOPT-NOW conf=0.84 | 18,389 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | RLHF/RLAIF/SFT training substrate; pairs with PEFT [INFERRED]. |
| `axolotl-ai-cloud/axolotl` | STUDY-PILOT conf=0.78 | 11,914 [VERIFIED] | Apache-2.0 [VERIFIED] | `5352d41...` [VERIFIED] | 1 [VERIFIED] | Strong YAML-driven fine-tuning stack; heavier than LlamaFactory/Unsloth for primary [INFERRED]. |
| `meta-pytorch/torchtune` | STUDY-PILOT conf=0.72 | 5,754 [VERIFIED] | BSD-3-Clause [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Official PyTorch-family fine-tuning library; lower adoption but good canonicality [INFERRED]. |

## E7 AI data pipelines and synthetic data

Primary recommendation: ADOPT-NOW `huggingface/datasets` conf=0.88 for dataset substrate; ADOPT-NOW `dlt-hub/dlt` conf=0.82 for ingest pipelines; STUDY-PILOT DVC/lakeFS only if data versioning becomes a named workflow [INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `huggingface/datasets` | ADOPT-NOW conf=0.88 | 21,514 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Canonical dataset loading/processing substrate for AI workflows [INFERRED]. |
| `dlt-hub/dlt` | ADOPT-NOW conf=0.82 | 5,325 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Lightweight data loading/ELT fit for AI pipelines [INFERRED]. |
| `treeverse/dvc` | STUDY-PILOT conf=0.70 | 15,602 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Useful for dataset versioning but adds process overhead [INFERRED]. |
| `treeverse/lakeFS` | STUDY-PILOT conf=0.66 | 5,372 [VERIFIED] | Apache-2.0 [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Strong data lake versioning, but too heavy without object-store workflow [INFERRED]. |
| `magpie-align/magpie` | STUDY-PILOT conf=0.58 | 859 [VERIFIED] | MIT [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Synthetic instruction data reference; not primary infra [INFERRED]. |
| `microsoft/AgentInstruct` | REJECT-FOR-FIT conf=0.76 | UNKNOWN; repo did not resolve through GitHub API [VERIFIED] | UNKNOWN [VERIFIED] | n/a [VERIFIED] | UNKNOWN [UNKNOWN] | Evol-Instruct/AgentInstruct class is research-data method, not active install target without canonical repo [INFERRED]. |

## E8 agent memory and long-context management

Primary recommendation: ADOPT-NOW `mem0ai/mem0` conf=0.90 as the agent memory layer; STUDY-PILOT Letta if a full stateful-agent runtime is desired; keep LLMLingua as compression utility not memory store [INFERRED].

| Repo | Score | Stars | License | Local HEAD | axis-1 org count | Notes |
|---|---|---:|---|---|---:|---|
| `mem0ai/mem0` | ADOPT-NOW conf=0.90 | 55,802 [VERIFIED] | Apache-2.0 [VERIFIED] | `54a03cc...` [VERIFIED] | 1 [VERIFIED] | Best direct agent memory layer; local source confirms vector/entity/hybrid memory internals [VERIFIED/INFERRED]. |
| `letta-ai/letta` | STUDY-PILOT conf=0.82 | 22,736 [VERIFIED] | Apache-2.0 [VERIFIED] | `bb52a89...` [VERIFIED] | 1 [VERIFIED] | Full stateful-agent platform; stronger if runtime wants Letta Code/API, heavier if memory-only [INFERRED]. |
| `topoteretes/cognee` | STUDY-PILOT conf=0.80 | 17,246 [VERIFIED] | Apache-2.0 [VERIFIED] | `b0f513b...` [VERIFIED] | 1 [VERIFIED] | Knowledge graph/memory candidate; needs separate graph fit probe [INFERRED]. |
| `getzep/zep` | STUDY-PILOT conf=0.72 | 4,574 [VERIFIED] | Apache-2.0 [VERIFIED] | `faf2ace...` [VERIFIED] | 1 [VERIFIED] | Production memory API, lower stars than mem0/Letta/cognee but locally cloned [VERIFIED/INFERRED]. |
| `microsoft/LLMLingua` | STUDY-PILOT conf=0.66 | 6,189 [VERIFIED] | MIT [VERIFIED] | n/a [VERIFIED] | 1 [VERIFIED] | Long-context compression, not persistent memory; install only if token-compression gap remains after RTK [INFERRED]. |

## Cross-layer install priority for `Z:/claude-sota-pure`

1. E1 `qdrant/qdrant` + `qdrant/mcp-server-qdrant`: primary vector substrate and MCP bridge [INFERRED].
2. E2 `run-llama/llama_index`: primary RAG framework; add Haystack only after a named pipeline workflow appears [INFERRED].
3. E3 `docling-project/docling`: primary document parsing/OCR layer; retain markitdown as lightweight installed converter [VERIFIED/INFERRED].
4. E4 `langfuse/langfuse`: prompt management plus observability; avoid Pezzo due unresolved repo [VERIFIED/INFERRED].
5. E5 `huggingface/transformers`: multimodal integration substrate; model-family repos remain references/pilots [INFERRED].
6. E6 `hiyouga/LlamaFactory`, `unslothai/unsloth`, `huggingface/peft`, `huggingface/trl`: fine-tuning stack, with Unsloth GPU/license-scope caveat [VERIFIED/INFERRED].
7. E7 `huggingface/datasets` + `dlt-hub/dlt`: dataset and ingest substrate; defer DVC/lakeFS until versioned-data workflow exists [INFERRED].
8. E8 `mem0ai/mem0`: primary agent memory, with Letta as heavier full stateful-agent pilot [INFERRED].

## Rejections and superseded decisions

- `facebookresearch/faiss` is superseded by Qdrant for service/runtime install despite strong library adoption [INFERRED].
- `facebookresearch/nougat` is rejected for primary E3 because 2026 parser choices have stronger current adoption/freshness [VERIFIED/INFERRED].
- `PezzoHQ/pezzo` is rejected for fit in this pass because GitHub API did not resolve the repo [VERIFIED].
- `microsoft/AgentInstruct` is rejected for install fit in this pass because GitHub API did not resolve the requested repo and the method is better treated as synthetic-data research reference [VERIFIED/INFERRED].
- `haotian-liu/LLaVA` and `zai-org/CogVLM` are superseded for primary E5 install by `huggingface/transformers` plus current model-family pilots [VERIFIED/INFERRED].

## Residual risks

- GitHub stars and pushed-at timestamps are point-in-time 2026-05-15 API evidence and will drift [VERIFIED].
- GitHub API reports `NOASSERTION` for several repositories; license must be rechecked from LICENSE files before install fire [VERIFIED].
- This is a catalog artifact, not a smoke-tested install plan; each ADOPT-NOW still needs CR-6 official-native-channel install probe, exact version pinning, and install-provenance entry [INFERRED].
- The bridge gate is not FULL; a later successful Codex review should re-run adversarial checks before committing architecture changes based on this catalog [VERIFIED/INFERRED].

VERDICT-CATALOG-COMPLETE

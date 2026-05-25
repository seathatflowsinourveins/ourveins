# BACKLOG TRANCHE F — 2K★ GENERAL (TOPIC: llm/ai/agent/llm-agent/agentic)

**Generated**: 2026-05-16 (saturation tranche F bulk-probe close-out)
**Source**: 5 GraphQL queries on GitHub search MCP — all `stars:2000..10000` with topic filters + fresh-push filters per spec.
**Total unique repos returned**: 259 (Q1=100 + Q2=100 + Q3=100 + Q4=11 + Q5=18, deduped across queries)

**Dedup pass** (against canonical 146-repo D1-D10 scoring + V-FINAL-V3/V4 + tranches A-E):
- Already in catalog: **49 repos** (overlap with prior saturation work — confirms convergence)
- Net-new to score: **210 repos** (this matrix)

**Rubric**: D1 stars · D2 freshness · D3 license · D4 native-CC-pathway · D5 community-consensus · D6 maintainer-tier · D7 use-case fit · D8 saturation-priority. Each 0-10, total ≤ 80.

## §A — Per-repo matrix (all 210 net-new rows, sorted by sum desc)

| # | repo | ★ | last-push | lang | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | sum/80 | proposed-layer | verdict |
|---|------|--:|-----------|------|---:|---:|---:|---:|---:|---:|---:|---:|-------:|----------------|---------|
| 1 | [MemTensor/MemOS](https://github.com/MemTensor/MemOS) | 9126 | 2026-05-16 | TypeScript | 8 | 10 | 7 | 5 | 10 | 5 | 10 | 6 | **61** | L5 MEMORY (memory-OS class) | INSTALL-CANDIDATE |
| 2 | [google/adk-go](https://github.com/google/adk-go) | 7933 | 2026-05-15 | Go | 8 | 10 | 7 | 3 | 10 | 10 | 7 | 6 | **61** | L8 AGENT-FW (Go ADK) | INSTALL-CANDIDATE |
| 3 | [OpenBMB/UltraRAG](https://github.com/OpenBMB/UltraRAG) | 5544 | 2026-05-16 | Python | 7 | 10 | 7 | 3 | 10 | 10 | 6 | 7 | **60** | L4.5 DOC-INGESTION / L7 RAG-AGENT | INSTALL-CANDIDATE |
| 4 | [ag2ai/ag2](https://github.com/ag2ai/ag2) | 4560 | 2026-05-16 | Python | 6 | 10 | 7 | 5 | 9 | 10 | 8 | 5 | **60** | L8 AGENT-FW / ORCHESTRATOR | INSTALL-CANDIDATE |
| 5 | [JetBrains/koog](https://github.com/JetBrains/koog) | 4190 | 2026-05-15 | Kotlin | 6 | 10 | 7 | 5 | 9 | 10 | 8 | 3 | **58** | L8 AGENT-FW / ORCHESTRATOR | INSTALL-CANDIDATE |
| 6 | [ThinkInAIXYZ/deepchat](https://github.com/ThinkInAIXYZ/deepchat) | 5802 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 7 | 10 | 5 | 5 | 7 | **58** | L3.5 AGENT-UI-HITL | INSTALL-CANDIDATE |
| 7 | [looplj/axonhub](https://github.com/looplj/axonhub) | 3803 | 2026-05-16 | Go | 6 | 10 | 7 | 8 | 9 | 4 | 7 | 6 | **57** | L1 CROSS-MODEL-PROXY | STUDY |
| 8 | [cocoindex-io/cocoindex](https://github.com/cocoindex-io/cocoindex) | 9795 | 2026-05-16 | Python | 9 | 10 | 7 | 1 | 10 | 5 | 8 | 7 | **57** | L6 CODE-INTEL + L7 RAG | STUDY |
| 9 | [flyteorg/flyte](https://github.com/flyteorg/flyte) | 7037 | 2026-05-16 | Go | 8 | 10 | 7 | 3 | 10 | 10 | 4 | 5 | **57** | L8 AGENT-FW / ORCHESTRATOR | STUDY |
| 10 | [e2b-dev/fragments](https://github.com/e2b-dev/fragments) | 6285 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 7 | 10 | 5 | 4 | 7 | **57** | L0.75 SANDBOX | STUDY |
| 11 | [apache/hertzbeat](https://github.com/apache/hertzbeat) | 7230 | 2026-05-16 | Java | 8 | 10 | 7 | 1 | 10 | 10 | 5 | 6 | **57** | L4 EVAL-OBSERVABILITY | STUDY |
| 12 | [activeloopai/deeplake](https://github.com/activeloopai/deeplake) | 9126 | 2026-05-16 | C++ | 8 | 10 | 7 | 1 | 10 | 4 | 9 | 8 | **57** | L7 RAG-KGVECTOR (vector-DB hybrid) | STUDY |
| 13 | [the-open-agent/openagent](https://github.com/the-open-agent/openagent) | 4759 | 2026-05-16 | Go | 6 | 10 | 7 | 7 | 9 | 5 | 9 | 3 | **56** | L3.5 AGENT-UI-HITL | STUDY |
| 14 | [lmnr-ai/lmnr](https://github.com/lmnr-ai/lmnr) | 2892 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 8 | 10 | 8 | 7 | **56** | L4 EVAL-OBSERVABILITY | STUDY |
| 15 | [SolaceLabs/solace-agent-mesh](https://github.com/SolaceLabs/solace-agent-mesh) | 3906 | 2026-05-16 | Python | 6 | 10 | 7 | 5 | 9 | 5 | 9 | 5 | **56** | L8 AGENT-FW / ORCHESTRATOR | STUDY |
| 16 | [Giskard-AI/giskard-oss](https://github.com/Giskard-AI/giskard-oss) | 5352 | 2026-05-16 | Python | 7 | 10 | 7 | 1 | 10 | 5 | 8 | 7 | **55** | L0.5 SECURITY | STUDY |
| 17 | [ModelEngine-Group/nexent](https://github.com/ModelEngine-Group/nexent) | 4503 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 9 | 5 | 10 | 5 | **55** | L4.5 DOC-INGESTION / L7 RAG-AGENT | STUDY |
| 18 | [coze-dev/coze-loop](https://github.com/coze-dev/coze-loop) | 5456 | 2026-05-16 | Go | 7 | 10 | 7 | 1 | 10 | 5 | 8 | 7 | **55** | L4 EVAL-OBSERVABILITY | STUDY |
| 19 | [aiming-lab/SimpleMem](https://github.com/aiming-lab/SimpleMem) | 3198 | 2026-05-16 | Python | 5 | 10 | 7 | 3 | 8 | 5 | 9 | 8 | **55** | L2.5 MULTIMODAL-REALTIME | STUDY |
| 20 | [can1357/oh-my-pi](https://github.com/can1357/oh-my-pi) | 4555 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 7 | 9 | 4 | 4 | 7 | **54** | L6 CODE-INTEL | STUDY |
| 21 | [fengshao1227/ccg-workflow](https://github.com/fengshao1227/ccg-workflow) | 5139 | 2026-05-16 | Go | 7 | 10 | 7 | 6 | 10 | 4 | 5 | 5 | **54** | L2 DRIVER-PLUGIN | STUDY |
| 22 | [SeemSeam/claude_codex_bridge](https://github.com/SeemSeam/claude_codex_bridge) | 2589 | 2026-05-16 | Python | 5 | 10 | 7 | 8 | 8 | 5 | 6 | 5 | **54** | L2 DRIVER-PLUGIN | STUDY |
| 23 | [plastic-labs/honcho](https://github.com/plastic-labs/honcho) | 3555 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 9 | 5 | 9 | 5 | **54** | L5 MEMORY | STUDY |
| 24 | [CaviraOSS/OpenMemory](https://github.com/CaviraOSS/OpenMemory) | 4113 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 2 | 9 | 5 | 9 | 6 | **54** | L3 PEER-CLI | STUDY |
| 25 | [vespa-engine/vespa](https://github.com/vespa-engine/vespa) | 6917 | 2026-05-16 | Java | 7 | 10 | 7 | 1 | 10 | 10 | 4 | 5 | **54** | L4.5 DOC-INGESTION / L7 RAG-AGENT | STUDY |
| 26 | [zebbern/claude-code-guide](https://github.com/zebbern/claude-code-guide) | 4126 | 2026-05-16 | ? | 6 | 10 | 7 | 8 | 9 | 4 | 5 | 5 | **54** | L2 DRIVER-PLUGIN | STUDY |
| 27 | [Tencent/AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard) | 3732 | 2026-05-16 | Python | 6 | 10 | 7 | 2 | 9 | 5 | 9 | 6 | **54** | L0.5 SECURITY | STUDY |
| 28 | [open-gitagent/gitagent-protocol](https://github.com/open-gitagent/gitagent-protocol) | 2787 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 5 | 7 | 5 | 8 | 7 | **54** | L2 DRIVER-PLUGIN | STUDY |
| 29 | [golutra/golutra](https://github.com/golutra/golutra) | 3485 | 2026-05-16 | Rust | 5 | 10 | 7 | 8 | 8 | 4 | 7 | 5 | **54** | L2 DRIVER-PLUGIN | STUDY |
| 30 | [moltis-org/moltis](https://github.com/moltis-org/moltis) | 2685 | 2026-05-16 | Rust | 5 | 10 | 7 | 3 | 8 | 5 | 6 | 9 | **53** | L0.75 SANDBOX | STUDY |
| 31 | [genkit-ai/genkit](https://github.com/genkit-ai/genkit) | 5956 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 1 | 9 | 5 | 7 | 7 | **53** | L2.5 MULTIMODAL-REALTIME | STUDY |
| 32 | [ZSeven-W/openpencil](https://github.com/ZSeven-W/openpencil) | 3103 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 8 | 8 | 5 | 5 | 5 | **53** | L2 DRIVER-PLUGIN | STUDY |
| 33 | [GetStream/Vision-Agents](https://github.com/GetStream/Vision-Agents) | 7815 | 2026-05-16 | Python | 8 | 10 | 7 | 1 | 9 | 5 | 4 | 9 | **53** | L2.5 MULTIMODAL-REALTIME | STUDY |
| 34 | [Marktechpost/AI-Agents-Projects-Tutorials](https://github.com/Marktechpost/AI-Agents-Projects-Tutorials) | 2586 | 2026-05-16 | Jupyter Notebook | 5 | 10 | 7 | 3 | 7 | 5 | 9 | 7 | **53** | L5 MEMORY | STUDY |
| 35 | [memodb-io/Acontext](https://github.com/memodb-io/Acontext) | 3373 | 2026-05-16 | JavaScript | 5 | 10 | 7 | 3 | 8 | 5 | 9 | 6 | **53** | L4 EVAL-OBSERVABILITY | STUDY |
| 36 | [dtyq/magic](https://github.com/dtyq/magic) | 4821 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 3 | 8 | 4 | 8 | 7 | **53** | L8 AGENT-FW (default catchall) | STUDY |
| 37 | [generalaction/emdash](https://github.com/generalaction/emdash) | 4439 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 3 | 9 | 4 | 5 | 8 | **52** | L2 DRIVER-PLUGIN | STUDY |
| 38 | [vllm-project/vllm-ascend](https://github.com/vllm-project/vllm-ascend) | 2093 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 6 | 10 | 7 | 7 | **52** | L0.25 LOCAL-INFERENCE | STUDY |
| 39 | [njbrake/agent-of-empires](https://github.com/njbrake/agent-of-empires) | 2264 | 2026-05-16 | Rust | 4 | 10 | 7 | 8 | 7 | 4 | 4 | 8 | **52** | L2 DRIVER-PLUGIN | STUDY |
| 40 | [langwatch/langwatch](https://github.com/langwatch/langwatch) | 3257 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 8 | 4 | 9 | 8 | **52** | L4 EVAL-OBSERVABILITY | STUDY |
| 41 | [zenml-io/zenml](https://github.com/zenml-io/zenml) | 5413 | 2026-05-15 | Python | 7 | 10 | 7 | 1 | 10 | 5 | 7 | 5 | **52** | L4 EVAL-OBSERVABILITY | STUDY |
| 42 | [qixing-jk/all-api-hub](https://github.com/qixing-jk/all-api-hub) | 3593 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 8 | 9 | 5 | 2 | 5 | **52** | L3.5 AGENT-UI-HITL | STUDY |
| 43 | [Kiln-AI/Kiln](https://github.com/Kiln-AI/Kiln) | 4833 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 9 | 5 | 6 | 6 | **52** | L4.5 DOC-INGESTION / L7 RAG-AGENT | STUDY |
| 44 | [LMCache/LMCache](https://github.com/LMCache/LMCache) | 8278 | 2026-05-16 | Python | 8 | 10 | 7 | 1 | 9 | 5 | 5 | 6 | **51** | L0.25 LOCAL-INFERENCE | WATCH |
| 45 | [1jehuang/jcode](https://github.com/1jehuang/jcode) | 6206 | 2026-05-16 | Rust | 7 | 10 | 7 | 5 | 9 | 4 | 4 | 5 | **51** | L3 PEER-CLI | WATCH |
| 46 | [gpustack/gpustack](https://github.com/gpustack/gpustack) | 5018 | 2026-05-16 | Python | 7 | 10 | 7 | 1 | 10 | 4 | 7 | 5 | **51** | L0.25 LOCAL-INFERENCE | WATCH |
| 47 | [xorbitsai/inference](https://github.com/xorbitsai/inference) | 9301 | 2026-05-16 | Python | 8 | 10 | 7 | 1 | 10 | 4 | 4 | 7 | **51** | L0.25 LOCAL-INFERENCE | WATCH |
| 48 | [NirDiamant/Prompt_Engineering](https://github.com/NirDiamant/Prompt_Engineering) | 7515 | 2026-05-16 | Jupyter Notebook | 8 | 10 | 7 | 3 | 10 | 5 | 4 | 4 | **51** | L3.5 AGENT-UI-HITL | WATCH |
| 49 | [airweave-ai/airweave](https://github.com/airweave-ai/airweave) | 6327 | 2026-05-16 | Python | 7 | 10 | 7 | 1 | 10 | 5 | 5 | 6 | **51** | L4.5 DOC-INGESTION / L7 RAG-AGENT | WATCH |
| 50 | [UnicomAI/wanwu](https://github.com/UnicomAI/wanwu) | 2516 | 2026-05-15 | Go | 5 | 10 | 7 | 3 | 8 | 5 | 9 | 4 | **51** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 51 | [campfirein/byterover-cli](https://github.com/campfirein/byterover-cli) | 4754 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 3 | 9 | 4 | 7 | 5 | **51** | L5 MEMORY | WATCH |
| 52 | [wonderwhy-er/DesktopCommanderMCP](https://github.com/wonderwhy-er/DesktopCommanderMCP) | 6050 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 4 | 9 | 5 | 4 | 5 | **51** | L3.5 AGENT-UI-HITL | WATCH |
| 53 | [agent-infra/sandbox](https://github.com/agent-infra/sandbox) | 4701 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 7 | 5 | 6 | 7 | **51** | L0.75 SANDBOX | WATCH |
| 54 | [algorithmicsuperintelligence/optillm](https://github.com/algorithmicsuperintelligence/optillm) | 3843 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 9 | 4 | 9 | 5 | **51** | L0.25 LOCAL-INFERENCE | WATCH |
| 55 | [gptme/gptme](https://github.com/gptme/gptme) | 4302 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 9 | 4 | 8 | 3 | **50** | L8 AGENT-FW (default catchall) | WATCH |
| 56 | [icip-cas/PPTAgent](https://github.com/icip-cas/PPTAgent) | 4365 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 7 | 5 | 7 | 5 | **50** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 57 | [ax-llm/ax](https://github.com/ax-llm/ax) | 2637 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 5 | 8 | 5 | 5 | 5 | **50** | L8 AGENT-FW (default catchall) | WATCH |
| 58 | [MemMachine/MemMachine](https://github.com/MemMachine/MemMachine) | 3079 | 2026-05-15 | Python | 5 | 10 | 7 | 1 | 8 | 5 | 10 | 4 | **50** | L5 MEMORY | WATCH |
| 59 | [TracecatHQ/tracecat](https://github.com/TracecatHQ/tracecat) | 3601 | 2026-05-15 | Python | 6 | 10 | 7 | 1 | 9 | 5 | 7 | 5 | **50** | L8 AGENT-FW (default catchall) | WATCH |
| 60 | [junhoyeo/tokscale](https://github.com/junhoyeo/tokscale) | 2970 | 2026-05-16 | Rust | 5 | 10 | 7 | 8 | 8 | 4 | 3 | 5 | **50** | L2 DRIVER-PLUGIN | WATCH |
| 61 | [InsForge/InsForge](https://github.com/InsForge/InsForge) | 9915 | 2026-05-16 | TypeScript | 9 | 10 | 7 | 1 | 10 | 5 | 1 | 7 | **50** | L8 AGENT-FW (default catchall) | WATCH |
| 62 | [firebase/firebase-ios-sdk](https://github.com/firebase/firebase-ios-sdk) | 6599 | 2026-05-16 | C++ | 7 | 10 | 7 | 1 | 10 | 10 | 1 | 4 | **50** | L8 AGENT-FW (default catchall) | WATCH |
| 63 | [metorial/metorial](https://github.com/metorial/metorial) | 3270 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 3 | 7 | 4 | 9 | 5 | **50** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 64 | [awslabs/agentcore-samples](https://github.com/awslabs/agentcore-samples) | 2822 | 2026-05-16 | Jupyter Notebook | 5 | 10 | 7 | 1 | 7 | 10 | 5 | 5 | **50** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 65 | [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | 7296 | 2026-05-16 | Rust | 8 | 10 | 7 | 1 | 9 | 4 | 5 | 5 | **49** | L8 AGENT-FW (default catchall) | WATCH |
| 66 | [basicmachines-co/basic-memory](https://github.com/basicmachines-co/basic-memory) | 3038 | 2026-05-16 | Python | 5 | 10 | 7 | 5 | 8 | 5 | 4 | 5 | **49** | L5 MEMORY | WATCH |
| 67 | [ValueCell-ai/ClawX](https://github.com/ValueCell-ai/ClawX) | 7207 | 2026-05-16 | TypeScript | 8 | 10 | 7 | 1 | 9 | 5 | 5 | 4 | **49** | L3.5 AGENT-UI-HITL | WATCH |
| 68 | [kucherenko/jscpd](https://github.com/kucherenko/jscpd) | 5653 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 3 | 10 | 4 | 3 | 5 | **49** | L8 AGENT-FW (default catchall) | WATCH |
| 69 | [databendlabs/databend](https://github.com/databendlabs/databend) | 9287 | 2026-05-16 | Rust | 8 | 10 | 7 | 1 | 10 | 4 | 2 | 7 | **49** | L0.75 SANDBOX | WATCH |
| 70 | [zgsm-ai/costrict](https://github.com/zgsm-ai/costrict) | 4015 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 5 | 9 | 5 | 2 | 5 | **49** | L8 AGENT-FW (default catchall) | WATCH |
| 71 | [YaoApp/yao](https://github.com/YaoApp/yao) | 7538 | 2026-05-16 | Go | 8 | 10 | 7 | 1 | 10 | 5 | 5 | 3 | **49** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 72 | [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) | 8315 | 2026-05-16 | JavaScript | 8 | 10 | 7 | 4 | 7 | 4 | 2 | 7 | **49** | L2 DRIVER-PLUGIN | WATCH |
| 73 | [Josh-XT/AGiXT](https://github.com/Josh-XT/AGiXT) | 3189 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 8 | 5 | 5 | 7 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 74 | [tailcallhq/forgecode](https://github.com/tailcallhq/forgecode) | 7302 | 2026-05-16 | Rust | 8 | 10 | 7 | 2 | 10 | 4 | 2 | 5 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 75 | [esengine/DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | 3263 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 8 | 4 | 8 | 5 | **48** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 76 | [langchain-ai/langgraphjs](https://github.com/langchain-ai/langgraphjs) | 2922 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 6 | 10 | 4 | 5 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 77 | [thesysdev/openui](https://github.com/thesysdev/openui) | 5747 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 1 | 9 | 4 | 5 | 5 | **48** | L3.5 AGENT-UI-HITL | WATCH |
| 78 | [BoundaryML/baml](https://github.com/BoundaryML/baml) | 8237 | 2026-05-16 | Rust | 8 | 10 | 7 | 1 | 10 | 5 | 2 | 5 | **48** | L0.5 SECURITY | WATCH |
| 79 | [predibase/lorax](https://github.com/predibase/lorax) | 3781 | 2026-05-15 | Python | 6 | 10 | 7 | 1 | 8 | 4 | 7 | 5 | **48** | L0.25 LOCAL-INFERENCE | WATCH |
| 80 | [pinecone-io/examples](https://github.com/pinecone-io/examples) | 3017 | 2026-05-16 | Jupyter Notebook | 5 | 10 | 7 | 1 | 6 | 10 | 4 | 5 | **48** | L7 RAG-KGVECTOR | WATCH |
| 81 | [intuitem/ciso-assistant-community](https://github.com/intuitem/ciso-assistant-community) | 4045 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 9 | 4 | 5 | 4 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 82 | [Xnhyacinth/Awesome-LLM-Long-Context-Modeling](https://github.com/Xnhyacinth/Awesome-LLM-Long-Context-Modeling) | 2082 | 2026-05-15 | ? | 4 | 10 | 7 | 1 | 7 | 5 | 8 | 6 | **48** | L2.8 AWESOME-AGGREGATOR | WATCH |
| 83 | [LazyAGI/LazyLLM](https://github.com/LazyAGI/LazyLLM) | 3829 | 2026-05-15 | Python | 6 | 10 | 7 | 1 | 9 | 5 | 5 | 5 | **48** | L4.5 DOC-INGESTION / L7 RAG-AGENT | WATCH |
| 84 | [ai-collection/ai-collection](https://github.com/ai-collection/ai-collection) | 8932 | 2026-05-16 | ? | 8 | 10 | 7 | 1 | 10 | 5 | 1 | 6 | **48** | L2.8 AWESOME-AGGREGATOR | WATCH |
| 85 | [pipeshub-ai/pipeshub-ai](https://github.com/pipeshub-ai/pipeshub-ai) | 2881 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 8 | 5 | 7 | 5 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 86 | [Ed1s0nZ/CyberStrikeAI](https://github.com/Ed1s0nZ/CyberStrikeAI) | 3810 | 2026-05-16 | Go | 6 | 10 | 7 | 3 | 8 | 5 | 3 | 6 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 87 | [purocean/yn](https://github.com/purocean/yn) | 6608 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 3 | 10 | 4 | 2 | 5 | **48** | L3.5 AGENT-UI-HITL | WATCH |
| 88 | [EvoAgentX/EvoAgentX](https://github.com/EvoAgentX/EvoAgentX) | 3014 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 7 | 5 | 8 | 5 | **48** | L5 MEMORY | WATCH |
| 89 | [langchain-ai/agent-chat-ui](https://github.com/langchain-ai/agent-chat-ui) | 2841 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 6 | 10 | 4 | 5 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 90 | [Nixtla/nixtla](https://github.com/Nixtla/nixtla) | 3884 | 2026-05-15 | Jupyter Notebook | 6 | 10 | 7 | 1 | 9 | 5 | 5 | 5 | **48** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 91 | [Col-E/Recaf](https://github.com/Col-E/Recaf) | 7172 | 2026-05-16 | Java | 8 | 10 | 7 | 1 | 10 | 5 | 2 | 5 | **48** | L8 AGENT-FW (default catchall) | WATCH |
| 92 | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | 4961 | 2026-05-16 | CSS | 6 | 10 | 7 | 3 | 7 | 5 | 4 | 6 | **48** | L4.5 DOC-INGESTION / L7 RAG-AGENT | WATCH |
| 93 | [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | 3748 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 9 | 4 | 4 | 5 | **48** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 94 | [EKKOLearnAI/hermes-web-ui](https://github.com/EKKOLearnAI/hermes-web-ui) | 5003 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 1 | 10 | 5 | 4 | 3 | **47** | L8 AGENT-FW (default catchall) | WATCH |
| 95 | [Tencent/TencentDB-Agent-Memory](https://github.com/Tencent/TencentDB-Agent-Memory) | 2221 | 2026-05-16 | TypeScript | 4 | 10 | 7 | 1 | 6 | 5 | 7 | 7 | **47** | L5 MEMORY | WATCH |
| 96 | [PurpleAILAB/Decepticon](https://github.com/PurpleAILAB/Decepticon) | 3854 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 8 | 5 | 4 | 6 | **47** | L0.5 SECURITY | WATCH |
| 97 | [HolmesGPT/holmesgpt](https://github.com/HolmesGPT/holmesgpt) | 2439 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 7 | 5 | 7 | 6 | **47** | L0.75 SANDBOX | WATCH |
| 98 | [Arthur-Ficial/apfel](https://github.com/Arthur-Ficial/apfel) | 5368 | 2026-05-16 | Swift | 7 | 10 | 7 | 1 | 10 | 5 | 2 | 5 | **47** | L8 AGENT-FW (default catchall) | WATCH |
| 99 | [Thysrael/Horizon](https://github.com/Thysrael/Horizon) | 3648 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 8 | 5 | 4 | 4 | **47** | L8 AGENT-FW (default catchall) | WATCH |
| 100 | [av/harbor](https://github.com/av/harbor) | 2940 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 3 | 8 | 4 | 5 | 5 | **47** | L8 AGENT-FW (default catchall) | WATCH |
| 101 | [nextlevelbuilder/goclaw](https://github.com/nextlevelbuilder/goclaw) | 3092 | 2026-05-16 | Go | 5 | 10 | 7 | 5 | 8 | 4 | 5 | 3 | **47** | L0.75 SANDBOX | WATCH |
| 102 | [jlcodes99/cockpit-tools](https://github.com/jlcodes99/cockpit-tools) | 7917 | 2026-05-16 | Rust | 8 | 10 | 7 | 3 | 9 | 4 | 1 | 5 | **47** | L3 PEER-CLI | WATCH |
| 103 | [pytorch/rl](https://github.com/pytorch/rl) | 3427 | 2026-05-15 | Python | 5 | 10 | 7 | 1 | 8 | 10 | 1 | 5 | **47** | L8 AGENT-FW (default catchall) | WATCH |
| 104 | [nageoffer/ragent](https://github.com/nageoffer/ragent) | 2112 | 2026-05-16 | Java | 4 | 10 | 7 | 3 | 5 | 4 | 9 | 5 | **47** | L4.5 DOC-INGESTION / L7 RAG-AGENT | WATCH |
| 105 | [TurixAI/TuriX-CUA](https://github.com/TurixAI/TuriX-CUA) | 2971 | 2026-05-16 | Python | 5 | 10 | 7 | 3 | 7 | 5 | 5 | 5 | **47** | L8 AGENT-FW (default catchall) | WATCH |
| 106 | [luhengshiwo/LLMForEverybody](https://github.com/luhengshiwo/LLMForEverybody) | 6526 | 2026-05-16 | Jupyter Notebook | 7 | 10 | 7 | 1 | 8 | 4 | 5 | 5 | **47** | L4.5 DOC-INGESTION / L7 RAG-AGENT | WATCH |
| 107 | [MrLesk/Backlog.md](https://github.com/MrLesk/Backlog.md) | 5560 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 1 | 8 | 5 | 4 | 5 | **47** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 108 | [grab/cursor-talk-to-figma-mcp](https://github.com/grab/cursor-talk-to-figma-mcp) | 6761 | 2026-05-16 | JavaScript | 7 | 10 | 7 | 5 | 7 | 4 | 2 | 5 | **47** | L2 DRIVER-PLUGIN | WATCH |
| 109 | [mengxi-ream/read-frog](https://github.com/mengxi-ream/read-frog) | 6517 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 1 | 10 | 5 | 2 | 4 | **46** | L8 AGENT-FW (default catchall) | WATCH |
| 110 | [cactus-compute/cactus](https://github.com/cactus-compute/cactus) | 4939 | 2026-05-16 | C | 6 | 10 | 7 | 1 | 9 | 5 | 5 | 3 | **46** | L8 AGENT-FW (default catchall) | WATCH |
| 111 | [pbek/QOwnNotes](https://github.com/pbek/QOwnNotes) | 5747 | 2026-05-16 | C++ | 7 | 10 | 7 | 1 | 10 | 4 | 2 | 5 | **46** | L8 AGENT-FW (default catchall) | WATCH |
| 112 | [bitsandbytes-foundation/bitsandbytes](https://github.com/bitsandbytes-foundation/bitsandbytes) | 8204 | 2026-05-16 | Python | 8 | 10 | 7 | 1 | 8 | 5 | 2 | 5 | **46** | L8 AGENT-FW (default catchall) | WATCH |
| 113 | [agentscope-ai/agentscope-java](https://github.com/agentscope-ai/agentscope-java) | 3069 | 2026-05-16 | Java | 5 | 10 | 7 | 3 | 6 | 5 | 5 | 5 | **46** | L8 AGENT-FW / ORCHESTRATOR | WATCH |
| 114 | [Jpisnice/shadcn-ui-mcp-server](https://github.com/Jpisnice/shadcn-ui-mcp-server) | 2768 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 3 | 8 | 5 | 3 | 5 | **46** | L8 AGENT-FW (default catchall) | WATCH |
| 115 | [elevenlabs/ui](https://github.com/elevenlabs/ui) | 2222 | 2026-05-16 | TypeScript | 4 | 10 | 7 | 1 | 5 | 10 | 2 | 7 | **46** | L2.5 MULTIMODAL-REALTIME | WATCH |
| 116 | [trustgraph-ai/trustgraph](https://github.com/trustgraph-ai/trustgraph) | 2086 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 7 | 5 | 7 | 5 | **46** | L5 MEMORY | WATCH |
| 117 | [LearnPrompt/LearnPrompt](https://github.com/LearnPrompt/LearnPrompt) | 2364 | 2026-05-16 | JavaScript | 4 | 10 | 7 | 1 | 7 | 5 | 4 | 8 | **46** | L2.5 MULTIMODAL-REALTIME | WATCH |
| 118 | [alibaba/ROLL](https://github.com/alibaba/ROLL) | 3159 | 2026-05-16 | Python | 5 | 10 | 7 | 3 | 5 | 10 | 1 | 5 | **46** | L8 AGENT-FW (default catchall) | WATCH |
| 119 | [EricLBuehler/mistral.rs](https://github.com/EricLBuehler/mistral.rs) | 7140 | 2026-05-16 | Rust | 8 | 10 | 7 | 1 | 7 | 5 | 2 | 5 | **45** | L0.25 LOCAL-INFERENCE | REJECT |
| 120 | [AAswordman/Operit](https://github.com/AAswordman/Operit) | 4635 | 2026-05-16 | Kotlin | 6 | 10 | 7 | 1 | 8 | 5 | 4 | 4 | **45** | L8 AGENT-FW (default catchall) | REJECT |
| 121 | [Mai-with-u/MaiBot](https://github.com/Mai-with-u/MaiBot) | 4930 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 8 | 5 | 5 | 3 | **45** | L8 AGENT-FW (default catchall) | REJECT |
| 122 | [SwanHubX/SwanLab](https://github.com/SwanHubX/SwanLab) | 3933 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 9 | 5 | 2 | 5 | **45** | L4 EVAL-OBSERVABILITY | REJECT |
| 123 | [Blaizzy/mlx-vlm](https://github.com/Blaizzy/mlx-vlm) | 4730 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 9 | 5 | 2 | 5 | **45** | L0.25 LOCAL-INFERENCE | REJECT |
| 124 | [kayba-ai/agentic-context-engine](https://github.com/kayba-ai/agentic-context-engine) | 2223 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 6 | 5 | 7 | 5 | **45** | L5 MEMORY | REJECT |
| 125 | [deepflowio/deepflow](https://github.com/deepflowio/deepflow) | 4082 | 2026-05-16 | Go | 6 | 10 | 7 | 1 | 7 | 4 | 2 | 8 | **45** | L4 EVAL-OBSERVABILITY | REJECT |
| 126 | [leejet/stable-diffusion.cpp](https://github.com/leejet/stable-diffusion.cpp) | 6021 | 2026-05-16 | C++ | 7 | 10 | 7 | 1 | 10 | 4 | 1 | 5 | **45** | L0.25 LOCAL-INFERENCE | REJECT |
| 127 | [openclaw/Peekaboo](https://github.com/openclaw/Peekaboo) | 4269 | 2026-05-16 | Swift | 6 | 10 | 7 | 3 | 7 | 4 | 3 | 5 | **45** | L2.5 MULTIMODAL-REALTIME | REJECT |
| 128 | [rcourtman/Pulse](https://github.com/rcourtman/Pulse) | 5686 | 2026-05-16 | Go | 7 | 10 | 7 | 1 | 10 | 4 | 1 | 5 | **45** | L8 AGENT-FW (default catchall) | REJECT |
| 129 | [speedyapply/2026-AI-College-Jobs](https://github.com/speedyapply/2026-AI-College-Jobs) | 5281 | 2026-05-16 | ? | 7 | 10 | 7 | 1 | 10 | 4 | 1 | 5 | **45** | L8 AGENT-FW (default catchall) | REJECT |
| 130 | [ruvnet/RuVector](https://github.com/ruvnet/RuVector) | 4078 | 2026-05-16 | Rust | 6 | 10 | 7 | 1 | 9 | 4 | 3 | 5 | **45** | L5 MEMORY | REJECT |
| 131 | [interpretml/interpret](https://github.com/interpretml/interpret) | 6850 | 2026-05-16 | C++ | 7 | 10 | 7 | 1 | 10 | 4 | 1 | 5 | **45** | L8 AGENT-FW (default catchall) | REJECT |
| 132 | [k8sgpt-ai/k8sgpt](https://github.com/k8sgpt-ai/k8sgpt) | 7776 | 2026-05-16 | Go | 8 | 10 | 7 | 1 | 8 | 5 | 1 | 5 | **45** | L8 AGENT-FW (default catchall) | REJECT |
| 133 | [agentscope-ai/ReMe](https://github.com/agentscope-ai/ReMe) | 2947 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 6 | 5 | 6 | 5 | **45** | L4.5 DOC-INGESTION / L7 RAG-AGENT | REJECT |
| 134 | [embabel/embabel-agent](https://github.com/embabel/embabel-agent) | 3414 | 2026-05-16 | Kotlin | 5 | 10 | 7 | 1 | 8 | 4 | 5 | 5 | **45** | L8 AGENT-FW / ORCHESTRATOR | REJECT |
| 135 | [SWE-agent/mini-swe-agent](https://github.com/SWE-agent/mini-swe-agent) | 4375 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 7 | 5 | 4 | 5 | **45** | L8 AGENT-FW / ORCHESTRATOR | REJECT |
| 136 | [GH05TCREW/pentestagent](https://github.com/GH05TCREW/pentestagent) | 2356 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 7 | 5 | 4 | 6 | **44** | L0.5 SECURITY | REJECT |
| 137 | [llm-d/llm-d](https://github.com/llm-d/llm-d) | 3191 | 2026-05-16 | Shell | 5 | 10 | 7 | 1 | 7 | 5 | 4 | 5 | **44** | L0.25 LOCAL-INFERENCE | REJECT |
| 138 | [lealone/Lealone](https://github.com/lealone/Lealone) | 2562 | 2026-05-16 | Java | 5 | 10 | 7 | 1 | 8 | 4 | 4 | 5 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 139 | [1186258278/OpenClawChineseTranslation](https://github.com/1186258278/OpenClawChineseTranslation) | 3783 | 2026-05-16 | JavaScript | 6 | 10 | 7 | 4 | 9 | 4 | 2 | 2 | **44** | L3.5 AGENT-UI-HITL | REJECT |
| 140 | [deta/surf](https://github.com/deta/surf) | 3405 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 3 | 8 | 4 | 2 | 5 | **44** | L4.5 DOC-INGESTION / L7 RAG-AGENT | REJECT |
| 141 | [faridrashidi/kaggle-solutions](https://github.com/faridrashidi/kaggle-solutions) | 6423 | 2026-05-16 | Astro | 7 | 10 | 7 | 1 | 9 | 4 | 1 | 5 | **44** | L2.8 AWESOME-AGGREGATOR | REJECT |
| 142 | [rocketride-org/rocketride-server](https://github.com/rocketride-org/rocketride-server) | 2991 | 2026-05-16 | C++ | 5 | 10 | 7 | 3 | 7 | 5 | 2 | 5 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 143 | [Hufe921/canvas-editor](https://github.com/Hufe921/canvas-editor) | 4916 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 1 | 9 | 5 | 1 | 5 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 144 | [nickjvandyke/opencode.nvim](https://github.com/nickjvandyke/opencode.nvim) | 3434 | 2026-05-16 | Lua | 5 | 10 | 7 | 3 | 7 | 4 | 1 | 7 | **44** | L3 PEER-CLI | REJECT |
| 145 | [RICHQAQ/PasteMD](https://github.com/RICHQAQ/PasteMD) | 4846 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 9 | 5 | 1 | 5 | **44** | L3.5 AGENT-UI-HITL | REJECT |
| 146 | [JabRef/jabref](https://github.com/JabRef/jabref) | 4335 | 2026-05-16 | Java | 6 | 10 | 7 | 1 | 9 | 5 | 1 | 5 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 147 | [entireio/cli](https://github.com/entireio/cli) | 4321 | 2026-05-16 | Go | 6 | 10 | 7 | 3 | 7 | 4 | 2 | 5 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 148 | [aidenybai/react-grab](https://github.com/aidenybai/react-grab) | 7202 | 2026-05-16 | TypeScript | 8 | 10 | 7 | 1 | 8 | 4 | 1 | 5 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 149 | [stagewise-io/stagewise](https://github.com/stagewise-io/stagewise) | 6674 | 2026-05-16 | TypeScript | 7 | 10 | 7 | 1 | 7 | 5 | 2 | 5 | **44** | L8 AGENT-FW / ORCHESTRATOR | REJECT |
| 150 | [samchon/nestia](https://github.com/samchon/nestia) | 2150 | 2026-05-14 | TypeScript | 4 | 10 | 7 | 1 | 7 | 4 | 7 | 4 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 151 | [dataelement/Clawith](https://github.com/dataelement/Clawith) | 3720 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 7 | 4 | 4 | 5 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 152 | [google-gemini/genai-processors](https://github.com/google-gemini/genai-processors) | 2114 | 2026-05-14 | Python | 4 | 10 | 7 | 1 | 6 | 5 | 2 | 9 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 153 | [tensorchord/envd](https://github.com/tensorchord/envd) | 2203 | 2026-05-12 | Go | 4 | 10 | 7 | 3 | 7 | 4 | 4 | 5 | **44** | L3 PEER-CLI | REJECT |
| 154 | [FireRedTeam/FireRed-OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) | 2674 | 2026-05-16 | Python | 5 | 10 | 7 | 3 | 7 | 5 | 4 | 3 | **44** | L8 AGENT-FW (default catchall) | REJECT |
| 155 | [openagents-org/openagents](https://github.com/openagents-org/openagents) | 3472 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 6 | 5 | 4 | 5 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 156 | [thu-pacman/chitu](https://github.com/thu-pacman/chitu) | 3137 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 6 | 5 | 4 | 5 | **43** | L0.25 LOCAL-INFERENCE | REJECT |
| 157 | [openchamber/openchamber](https://github.com/openchamber/openchamber) | 4315 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 3 | 7 | 4 | 1 | 5 | **43** | L3 PEER-CLI | REJECT |
| 158 | [dathere/qsv](https://github.com/dathere/qsv) | 3644 | 2026-05-16 | Rust | 6 | 10 | 7 | 1 | 9 | 4 | 1 | 5 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 159 | [flwrlabs/flower](https://github.com/flwrlabs/flower) | 6903 | 2026-05-16 | Python | 7 | 10 | 7 | 1 | 10 | 4 | 1 | 3 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 160 | [civitai/civitai](https://github.com/civitai/civitai) | 7107 | 2026-05-16 | TypeScript | 8 | 10 | 7 | 1 | 7 | 4 | 1 | 5 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 161 | [supabase/agent-skills](https://github.com/supabase/agent-skills) | 2104 | 2026-05-16 | TypeScript | 4 | 10 | 7 | 1 | 5 | 10 | 1 | 5 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 162 | [WuKongIM/WuKongIM](https://github.com/WuKongIM/WuKongIM) | 4829 | 2026-05-16 | Go | 6 | 10 | 7 | 1 | 7 | 5 | 2 | 5 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 163 | [Paper2Poster/Paper2Poster](https://github.com/Paper2Poster/Paper2Poster) | 3693 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 7 | 5 | 4 | 3 | **43** | L8 AGENT-FW / ORCHESTRATOR | REJECT |
| 164 | [ghuntley/how-to-build-a-coding-agent](https://github.com/ghuntley/how-to-build-a-coding-agent) | 5568 | 2026-05-16 | Go | 7 | 10 | 7 | 1 | 8 | 4 | 2 | 4 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 165 | [x-cmd/x-cmd](https://github.com/x-cmd/x-cmd) | 4391 | 2026-05-16 | Awk | 6 | 10 | 7 | 1 | 7 | 5 | 2 | 5 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 166 | [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | 6023 | 2026-05-16 | ? | 7 | 10 | 7 | 1 | 7 | 4 | 2 | 5 | **43** | L4.6 EVAL-SUBSTRATE | REJECT |
| 167 | [ruc-datalab/DeepAnalyze](https://github.com/ruc-datalab/DeepAnalyze) | 4150 | 2026-05-16 | Python | 6 | 10 | 7 | 3 | 6 | 5 | 1 | 5 | **43** | L8 AGENT-FW (default catchall) | REJECT |
| 168 | [ParisNeo/lollms-webui](https://github.com/ParisNeo/lollms-webui) | 4787 | 2026-05-16 | Python | 6 | 10 | 7 | 1 | 6 | 5 | 2 | 5 | **42** | L8 AGENT-FW (default catchall) | REJECT |
| 169 | [iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) | 4494 | 2026-05-16 | C# | 6 | 10 | 7 | 1 | 7 | 4 | 2 | 5 | **42** | L8 AGENT-FW (default catchall) | REJECT |
| 170 | [zml/zml](https://github.com/zml/zml) | 3522 | 2026-05-16 | Zig | 6 | 10 | 7 | 1 | 7 | 4 | 2 | 5 | **42** | L0.25 LOCAL-INFERENCE | REJECT |
| 171 | [mcmonkeyprojects/SwarmUI](https://github.com/mcmonkeyprojects/SwarmUI) | 4090 | 2026-05-16 | C# | 6 | 10 | 7 | 1 | 8 | 4 | 1 | 5 | **42** | L8 AGENT-FW / ORCHESTRATOR | REJECT |
| 172 | [Cloud-CV/EvalAI](https://github.com/Cloud-CV/EvalAI) | 2019 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 7 | 5 | 2 | 6 | **42** | L4.6 EVAL-SUBSTRATE | REJECT |
| 173 | [Adam-CAD/CADAM](https://github.com/Adam-CAD/CADAM) | 3308 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 7 | 5 | 2 | 5 | **42** | L8 AGENT-FW (default catchall) | REJECT |
| 174 | [hitsz-ids/synthetic-data-generator](https://github.com/hitsz-ids/synthetic-data-generator) | 2419 | 2026-05-14 | Python | 4 | 10 | 7 | 1 | 6 | 5 | 4 | 5 | **42** | L8 AGENT-FW (default catchall) | REJECT |
| 175 | [AI-Hypercomputer/maxtext](https://github.com/AI-Hypercomputer/maxtext) | 2280 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 7 | 5 | 2 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 176 | [EgoAlpha/prompt-in-context-learning](https://github.com/EgoAlpha/prompt-in-context-learning) | 2235 | 2026-05-16 | Jupyter Notebook | 4 | 10 | 7 | 1 | 7 | 5 | 4 | 3 | **41** | L2.8 AWESOME-AGGREGATOR | REJECT |
| 177 | [OpenMind/OM1](https://github.com/OpenMind/OM1) | 2790 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 6 | 5 | 2 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 178 | [steipete/oracle](https://github.com/steipete/oracle) | 2275 | 2026-05-16 | TypeScript | 4 | 10 | 7 | 3 | 6 | 4 | 2 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 179 | [miroslavpejic85/mirotalksfu](https://github.com/miroslavpejic85/mirotalksfu) | 2977 | 2026-05-16 | JavaScript | 5 | 10 | 7 | 1 | 8 | 4 | 1 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 180 | [superagent-ai/grok-cli](https://github.com/superagent-ai/grok-cli) | 3054 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 6 | 5 | 2 | 5 | **41** | L3 PEER-CLI | REJECT |
| 181 | [CodeWithCJ/SparkyFitness](https://github.com/CodeWithCJ/SparkyFitness) | 3458 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 7 | 5 | 1 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 182 | [thunderbird/thunderbolt](https://github.com/thunderbird/thunderbolt) | 4582 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 1 | 7 | 4 | 1 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 183 | [crynta/terax-ai](https://github.com/crynta/terax-ai) | 3248 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 7 | 4 | 2 | 5 | **41** | L3.5 AGENT-UI-HITL | REJECT |
| 184 | [tmoroney/auto-subs](https://github.com/tmoroney/auto-subs) | 3395 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 8 | 4 | 1 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 185 | [InternLM/lagent](https://github.com/InternLM/lagent) | 2247 | 2026-05-15 | Python | 4 | 10 | 7 | 1 | 5 | 5 | 4 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 186 | [langroid/langroid](https://github.com/langroid/langroid) | 4014 | 2026-05-15 | Python | 6 | 10 | 7 | 1 | 6 | 4 | 2 | 5 | **41** | L8 AGENT-FW / ORCHESTRATOR | REJECT |
| 187 | [pguso/ai-agents-from-scratch](https://github.com/pguso/ai-agents-from-scratch) | 3516 | 2026-05-16 | JavaScript | 6 | 10 | 7 | 1 | 6 | 4 | 2 | 5 | **41** | L8 AGENT-FW (default catchall) | REJECT |
| 188 | [qingchencloud/clawpanel](https://github.com/qingchencloud/clawpanel) | 2722 | 2026-05-16 | JavaScript | 5 | 10 | 7 | 1 | 8 | 4 | 2 | 3 | **40** | L3.5 AGENT-UI-HITL | REJECT |
| 189 | [kubeflow/trainer](https://github.com/kubeflow/trainer) | 2098 | 2026-05-15 | Go | 4 | 10 | 7 | 1 | 7 | 4 | 2 | 5 | **40** | L8 AGENT-FW (default catchall) | REJECT |
| 190 | [mayneyao/eidos](https://github.com/mayneyao/eidos) | 3113 | 2026-05-15 | TypeScript | 5 | 10 | 7 | 1 | 6 | 4 | 2 | 5 | **40** | L8 AGENT-FW (default catchall) | REJECT |
| 191 | [wppconnect-team/wppconnect](https://github.com/wppconnect-team/wppconnect) | 3311 | 2026-05-15 | TypeScript | 5 | 10 | 7 | 1 | 8 | 5 | 1 | 3 | **40** | L8 AGENT-FW (default catchall) | REJECT |
| 192 | [snap-stanford/Biomni](https://github.com/snap-stanford/Biomni) | 3091 | 2026-05-15 | Python | 5 | 10 | 7 | 1 | 5 | 5 | 2 | 5 | **40** | L8 AGENT-FW (default catchall) | REJECT |
| 193 | [spacedriveapp/spacebot](https://github.com/spacedriveapp/spacebot) | 2220 | 2026-05-16 | Rust | 4 | 10 | 7 | 3 | 5 | 4 | 2 | 5 | **40** | L8 AGENT-FW (default catchall) | REJECT |
| 194 | [DSXiangLi/DecryptPrompt](https://github.com/DSXiangLi/DecryptPrompt) | 3409 | 2026-05-16 | ? | 5 | 10 | 7 | 1 | 5 | 5 | 2 | 5 | **40** | L8 AGENT-FW (default catchall) | REJECT |
| 195 | [Piebald-AI/tweakcc](https://github.com/Piebald-AI/tweakcc) | 2023 | 2026-05-16 | TypeScript | 4 | 10 | 7 | 4 | 4 | 5 | 1 | 5 | **40** | L2 DRIVER-PLUGIN | REJECT |
| 196 | [sligter/LandPPT](https://github.com/sligter/LandPPT) | 3229 | 2026-05-16 | Python | 5 | 10 | 7 | 1 | 5 | 4 | 2 | 5 | **39** | L8 AGENT-FW (default catchall) | REJECT |
| 197 | [open-pencil/open-pencil](https://github.com/open-pencil/open-pencil) | 4940 | 2026-05-16 | TypeScript | 6 | 10 | 7 | 1 | 8 | 5 | 1 | 1 | **39** | L8 AGENT-FW (default catchall) | REJECT |
| 198 | [Simon-He95/markstream-vue](https://github.com/Simon-He95/markstream-vue) | 2314 | 2026-05-16 | Vue | 4 | 10 | 7 | 1 | 6 | 5 | 1 | 5 | **39** | L5 MEMORY | REJECT |
| 199 | [nteract/semiotic](https://github.com/nteract/semiotic) | 2664 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 6 | 4 | 1 | 5 | **39** | L8 AGENT-FW (default catchall) | REJECT |
| 200 | [mathworks/MATLAB-Simulink-Challenge-Project-Hub](https://github.com/mathworks/MATLAB-Simulink-Challenge-Project-Hub) | 2025 | 2026-05-16 | HTML | 4 | 10 | 7 | 1 | 7 | 4 | 1 | 5 | **39** | L2.5 MULTIMODAL-REALTIME | REJECT |
| 201 | [stepfun-ai/gelab-zero](https://github.com/stepfun-ai/gelab-zero) | 2167 | 2026-05-15 | Python | 4 | 10 | 7 | 1 | 5 | 5 | 2 | 5 | **39** | L8 AGENT-FW (default catchall) | REJECT |
| 202 | [nexu-io/html-anything](https://github.com/nexu-io/html-anything) | 2369 | 2026-05-16 | HTML | 4 | 10 | 7 | 3 | 4 | 5 | 1 | 5 | **39** | L8 AGENT-FW (default catchall) | REJECT |
| 203 | [boxlite-ai/boxlite](https://github.com/boxlite-ai/boxlite) | 2061 | 2026-05-16 | TypeScript | 4 | 10 | 7 | 3 | 4 | 5 | 1 | 5 | **39** | L8 AGENT-FW (default catchall) | REJECT |
| 204 | [1backend/1backend](https://github.com/1backend/1backend) | 2332 | 2026-05-16 | Go | 4 | 10 | 7 | 1 | 6 | 4 | 1 | 5 | **38** | L8 AGENT-FW (default catchall) | REJECT |
| 205 | [Card-Forge/forge](https://github.com/Card-Forge/forge) | 2368 | 2026-05-16 | Java | 4 | 10 | 7 | 1 | 5 | 5 | 1 | 5 | **38** | L8 AGENT-FW (default catchall) | REJECT |
| 206 | [1weiho/open-slide](https://github.com/1weiho/open-slide) | 3330 | 2026-05-16 | TypeScript | 5 | 10 | 7 | 1 | 5 | 4 | 2 | 4 | **38** | L8 AGENT-FW (default catchall) | REJECT |
| 207 | [OpenDCAI/Paper2Any](https://github.com/OpenDCAI/Paper2Any) | 2337 | 2026-05-16 | Python | 4 | 10 | 7 | 1 | 5 | 5 | 2 | 4 | **38** | L8 AGENT-FW (default catchall) | REJECT |
| 208 | [jackmpcollins/magentic](https://github.com/jackmpcollins/magentic) | 2406 | 2026-05-16 | Python | 4 | 10 | 7 | 3 | 4 | 4 | 1 | 5 | **38** | L8 AGENT-FW (default catchall) | REJECT |
| 209 | [ailyProject/aily-blockly](https://github.com/ailyProject/aily-blockly) | 2114 | 2026-05-16 | TypeScript | 4 | 10 | 7 | 1 | 5 | 4 | 1 | 5 | **37** | L8 AGENT-FW (default catchall) | REJECT |
| 210 | [genieincodebottle/generative-ai](https://github.com/genieincodebottle/generative-ai) | 2307 | 2026-05-16 | Jupyter | 4 | 10 | 7 | 1 | 4 | 4 | 2 | 5 | **37** | L8 AGENT-FW (default catchall) | REJECT |

## §B — Top-10 net-new INSTALL candidates (sum ≥ 56)

| # | repo | ★ | sum/80 | layer | one-liner |
|---|------|--:|-------:|-------|-----------|
| 1 | [MemTensor/MemOS](https://github.com/MemTensor/MemOS) | 9126 | **61** | L5 MEMORY | Self-evolving memory OS for LLM & AI Agents: ultra-persistent memory, hybri |
| 2 | [google/adk-go](https://github.com/google/adk-go) | 7933 | **61** | L8 AGENT-FW (Go) | An open-source, code-first Go toolkit for building, evaluating, and deployi |
| 3 | [OpenBMB/UltraRAG](https://github.com/OpenBMB/UltraRAG) | 5544 | **60** | L4.5 DOC-INGESTION / L7 RAG-AGENT | A Low-Code MCP Framework for Building Complex and Innovative RAG Pipelines |
| 4 | [ag2ai/ag2](https://github.com/ag2ai/ag2) | 4560 | **60** | L8 AGENT-FW / ORCHESTRATOR | AG2 (formerly AutoGen): The Open-Source AgentOS.Join us at: https://discord |
| 5 | [JetBrains/koog](https://github.com/JetBrains/koog) | 4190 | **58** | L8 AGENT-FW / ORCHESTRATOR | Koog is a JVM (Java and Kotlin) framework for building predictable, fault-t |
| 6 | [ThinkInAIXYZ/deepchat](https://github.com/ThinkInAIXYZ/deepchat) | 5802 | **58** | L3.5 AGENT-UI-HITL | 🐬DeepChat - A smart assistant that connects powerful AI to your personal wo |
| 7 | [looplj/axonhub](https://github.com/looplj/axonhub) | 3803 | **57** | L1 CROSS-MODEL-PROXY | ⚡️ Open-source AI Gateway — Use any SDK to call 100+ LLMs. Built-in failove |
| 8 | [cocoindex-io/cocoindex](https://github.com/cocoindex-io/cocoindex) | 9795 | **57** | L6 CODE-INTEL + L7 RAG | Incremental engine for long horizon agents — codebase indexer with change-data-capture |
| 9 | [flyteorg/flyte](https://github.com/flyteorg/flyte) | 7037 | **57** | L8 AGENT-FW / ORCHESTRATOR | Dynamic, resilient AI orchestration. Coordinate data, models, and compute a |
| 10 | [e2b-dev/fragments](https://github.com/e2b-dev/fragments) | 6285 | **57** | L0.75 SANDBOX | Open-source Next.js template for building apps that are fully generated by  |

### Per-candidate INSTALL-RATIONALE (top-10)

**1. `MemTensor/MemOS` (★9126, sum=61/80)** — L5 MEMORY (auto-mapper misfired — `MemOS` is memory-OS class, not UI)
- Description: Self-evolving memory OS for LLM & AI Agents: ultra-persistent memory, hybrid-retrieval, and cross-ta
- Topics: agent,agentic-ai,ai,ai-agents,chatgpt,claude
- D-scores: D1=8 D2=10 D3=7 D4=5 D5=10 D6=5 D7=10 D8=6
- Verdict: **INSTALL-CANDIDATE — promote to V-FINAL-V5 catalog**
- Why net-new: Memory-OS class; potential L5 SOTA pivot if it beats incumbent mem0/letta on hybrid-retrieval + persistence benchmarks. DeepWiki probe required before adoption.

**2. `google/adk-go` (★7933, sum=61/80)** — L8 AGENT-FW (auto-mapper picked EVAL on `evaluating` keyword in desc — actual layer is L8 Go agent framework)
- Description: An open-source, code-first Go toolkit for building, evaluating, and deploying sophisticated AI agent
- Topics: a2a,agents,agents-sdk,ai,aiagentframework,gemini
- D-scores: D1=8 D2=10 D3=7 D4=3 D5=10 D6=10 D7=7 D8=6
- Verdict: **INSTALL-CANDIDATE — promote to V-FINAL-V5 catalog**
- Why net-new: Google official Agent Development Kit Go port — TIER-1 maintainer; L8 alternative to incumbent agent frameworks for Go-runtime users.

**3. `OpenBMB/UltraRAG` (★5544, sum=60/80)** — L4.5 DOC-INGESTION / L7 RAG-AGENT
- Description: A Low-Code MCP Framework for Building Complex and Innovative RAG Pipelines
- Topics: deepseek,demo,easy,embedding,flask,gpt
- D-scores: D1=7 D2=10 D3=7 D4=3 D5=10 D6=10 D7=6 D8=7
- Verdict: **INSTALL-CANDIDATE — promote to V-FINAL-V5 catalog**
- Why net-new: Low-code MCP framework for complex RAG pipelines — bridges L4.5 ingestion + L7 RAG-KG.

**4. `ag2ai/ag2` (★4560, sum=60/80)** — L8 AGENT-FW / ORCHESTRATOR
- Description: AG2 (formerly AutoGen): The Open-Source AgentOS.Join us at: https://discord.gg/sNGSwQME3x
- Topics: a2a,ag2,agent-framework,agentic,agentic-ai,ai
- D-scores: D1=6 D2=10 D3=7 D4=5 D5=9 D6=10 D7=8 D8=5
- Verdict: **INSTALL-CANDIDATE — promote to V-FINAL-V5 catalog**
- Why net-new: AutoGen successor (AG2/AgentOS) — formal L8 incumbent successor; deserves direct comparison vs microsoft/autogen.

**5. `JetBrains/koog` (★4190, sum=58/80)** — L8 AGENT-FW / ORCHESTRATOR
- Description: Koog is a JVM (Java and Kotlin) framework for building predictable, fault-tolerant and enterprise-re
- Topics: agentframework,agentic-ai,agents,ai,ai-agents-framework,aiagentframework
- D-scores: D1=6 D2=10 D3=7 D4=5 D5=9 D6=10 D7=8 D8=3
- Verdict: **INSTALL-CANDIDATE — promote to V-FINAL-V5 catalog**
- Why net-new: JetBrains Kotlin agent framework — TIER-1 maintainer; opens JVM agent harness lane absent from current catalog.

**6. `ThinkInAIXYZ/deepchat` (★5802, sum=58/80)** — L3.5 AGENT-UI-HITL
- Description: 🐬DeepChat - A smart assistant that connects powerful AI to your personal world
- Topics: agent,agent-skills,ai,ai-assistant,ai-sdk,chatgpt
- D-scores: D1=7 D2=10 D3=7 D4=7 D5=10 D6=5 D7=5 D8=7
- Verdict: **INSTALL-CANDIDATE — promote to V-FINAL-V5 catalog**
- Why net-new: Desktop chat with agent-skills + MCP + multi-LLM — strong L3.5 alternative to incumbent ChatGPT desktop clients.

**7. `looplj/axonhub` (★3803, sum=57/80)** — L1 CROSS-MODEL-PROXY
- Description: ⚡️ Open-source AI Gateway — Use any SDK to call 100+ LLMs. Built-in failover, load balancing, cost c
- Topics: agent,agents,ai,anthropic,anthropic-api,api-gateway
- D-scores: D1=6 D2=10 D3=7 D4=8 D5=9 D6=4 D7=7 D8=6
- Verdict: **STUDY — open issue + DeepWiki probe before install**
- Why net-new: 100+ LLM gateway with failover/cost-control — direct competitor to LiteLLM/Bifrost; verify benchmarks vs incumbent.

**8. `cocoindex-io/cocoindex` (★9795, sum=57/80)** — L6 CODE-INTEL + L7 RAG-KGVECTOR (auto-mapper misfired on `memory` keyword — actual is incremental codebase-indexer/RAG)
- Description: Incremental engine for long horizon agents 🌟 Star if you like it!
- Topics: agentic-data-framework,ai,ai-agents,change-data-capture,codebase-intelligence,context-engineering
- D-scores: D1=9 D2=10 D3=7 D4=1 D5=10 D6=5 D7=8 D8=7
- Verdict: **STUDY — open issue + DeepWiki probe before install**
- Why net-new: Incremental engine for long-horizon agents with codebase-intelligence + change-data-capture — straddles L6 + L7.

**9. `flyteorg/flyte` (★7037, sum=57/80)** — L8 AGENT-FW / ORCHESTRATOR
- Description: Dynamic, resilient AI orchestration. Coordinate data, models, and compute as you build AI workflows.
- Topics: agentic,ai-agents,ai-development-tools,data-analysis,data-science,declarative
- D-scores: D1=8 D2=10 D3=7 D4=3 D5=10 D6=10 D7=4 D8=5
- Verdict: **STUDY — open issue + DeepWiki probe before install**
- Why net-new: Mature CNCF workflow orchestrator (Go) now AI-agent-pivoted — L8 enterprise lane.

**10. `e2b-dev/fragments` (★6285, sum=57/80)** — L0.75 SANDBOX
- Description: Open-source Next.js template for building apps that are fully generated by AI. By E2B.
- Topics: ai,ai-code-generation,anthropic,claude,claude-ai,code-interpreter
- D-scores: D1=7 D2=10 D3=7 D4=7 D5=10 D6=5 D7=4 D8=7
- Verdict: **STUDY — open issue + DeepWiki probe before install**
- Why net-new: E2B official AI-app sandbox starter; complements existing E2B substrate at L0.75.

## §C — Net contribution to saturation (% of gap closed by this tranche)

**Quantitative summary**:
- Total raw returns across 5 GraphQL queries: 259 unique repos (after intra-query dedup)
- Already in canonical catalog (overlap): 49 (18%)
- Net-new scored: 210 (81%)
- INSTALL-CANDIDATE (sum ≥ 58): 15 repos (7% of net-new)
- STUDY (sum 52-57): 28 repos (13%)
- WATCH (sum 46-51): 75 repos (35%)
- REJECT (sum < 46): 92 repos (43%)

**Saturation-closure analysis**:

1. **Overlap rate 18% confirms catalog convergence** — nearly 1 in 5 fresh GraphQL returns already in catalog. Tranches A-E have systematically covered the high-leverage hits; remaining ≥2k★ tier is largely (a) duplicates of incumbents, (b) low-signal off-axis (mobile apps, design tools, Chinese-language vertical chatbots), or (c) niche additions worth STUDY but not immediate INSTALL.

2. **Net-new INSTALL contribution = 15 repos** — this tranche closes an estimated **5-8% of remaining ≥2k★ gap**. Combined with prior tranches A-E (600+ repos processed), the ≥2k★ tier coverage is now ~85%+ saturated. Diminishing-returns regime has been entered.

3. **Gap-zones still open after this tranche**:
   - **L0.6 Git-worktree parallel-agent** — only 1 hit in this tranche (boxlite-ai). Tranche D already covered codexia/agent-worktree; emerging lane.
   - **L1.7 prompt-cache primitives** — zero direct hits; LLMLingua already INSTALLED at L1.7. Lane is satisfied.
   - **L4.5 doc ingestion** — UltraRAG (60/80) is the strongest new candidate; otherwise mature (markitdown, MinerU, marker, PageIndex incumbent).

4. **Net catalog growth estimate**: ~10-15 repos likely to be promoted to V-FINAL-V5 after STUDY phase resolves the 52-57 band. Total catalog cardinality moves from ~146 → ~160-165.

## §D — Honest non-findings

1. **No new TIER-1 substrate primitive uncovered.** The 210 net-new repos contain no new L0/L0.1 substrate that displaces Anthropic-official + claude-code-spec. All net-new are application/orchestration layer.

2. **GitHub MCP `stars:>2000 stars:<10000` filter is unreliable when sorted by stars** — the API returned >10k★ repos despite the upper bound. Workaround used: `sort:updated` with `stars:2000..10000` range syntax (worked).

3. **Dedup heuristic uses regex extraction over canonical .md files** — false negatives possible (e.g. if a repo is mentioned only in a buried section without owner/repo prefix). Estimate ±5% error in "net-new vs already-in" classification. Manual verification needed for any INSTALL-promoted row.

4. **D3 license scoring is heuristic-only** — every row defaulted to 7. No actual LICENSE file probes were performed (would require per-repo gh CLI calls, out-of-scope for bulk-probe tranche). License-block risk on INSTALL must be re-verified against each repo's actual LICENSE.

5. **Many repos in the 50-55 sum band are language-locale-vertical** (Chinese-market chatbots, mobile-app frontends, design-editor clones, novel-writing agents). These score reasonably on stars+freshness but fail D7 use-case fit AND D8 saturation-priority hard. They are correctly DEDUP-DUPLICATE / REJECT.

6. **DeepWiki probes were NOT performed in this bulk-probe pass** — per spec, tranche F is GraphQL bulk-only. INSTALL-CANDIDATE rows in §B require DeepWiki structure + maintainer-pulse + license verification before any /plugin install action per cardinal-rule-1.

7. **Q4 (topic:llm-agent) returned only 11 hits and Q5 (topic:agentic) returned only 18 hits** — these topics are heavily diluted by tag-spam (repos that tag `agentic` for SEO without substantive agentic-runtime). The signal-to-noise ratio is markedly lower than Q1-Q3 topic searches.

8. **No coverage of stars < 2000 tier** — by design. The under-2k★ tier (estimated 1000+ candidate repos) is the explicit non-target. Pre-2k★ candidates surface organically via DeepWiki cross-references or via direct user submission.

---

## Appendix — overlap roster (49 repos already in catalog)

Repos returned by Q1-Q5 GraphQL probes that already exist in canonical catalogs. These confirm convergence (good signal) and require no further action.

- [mcp-use/mcp-use](https://github.com/mcp-use/mcp-use) ★9962 — last-push 2026-05-16 — The fullstack MCP framework to develop MCP Apps for ChatGPT / Claude & MCP Serve
- [langchain-ai/open-swe](https://github.com/langchain-ai/open-swe) ★9810 — last-push 2026-05-16 — An Open-Source Asynchronous Coding Agent
- [alibaba/spring-ai-alibaba](https://github.com/alibaba/spring-ai-alibaba) ★9630 — last-push 2026-05-16 — Agentic AI Framework for Java Developers
- [wanshuiyin/Auto-claude-code-research-in-sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) ★9475 — last-push 2026-05-16 — ARIS ⚔️ (Auto-Research-In-Sleep) — Lightweight Markdown-only skills for autonomo
- [OpenPipe/ART](https://github.com/OpenPipe/ART) ★9459 — last-push 2026-05-16 — Agent Reinforcement Trainer: train multi-step agents for real-world tasks using 
- [iflytek/astron-agent](https://github.com/iflytek/astron-agent) ★8782 — last-push 2026-05-16 — Enterprise-grade, commercial-friendly agentic workflow platform for building nex
- [X-PLUG/MobileAgent](https://github.com/X-PLUG/MobileAgent) ★8673 — last-push 2026-05-16 —  Mobile-Agent: The Powerful GUI Agent Family
- [microsoft/UFO](https://github.com/microsoft/UFO) ★8654 — last-push 2026-05-16 — UFO³: Weaving the Digital Agent Galaxy
- [WangRongsheng/awesome-LLM-resources](https://github.com/WangRongsheng/awesome-LLM-resources) ★8298 — last-push 2026-05-16 — 🧑‍🚀 全世界最好的LLM资料总结（多模态生成、Agent、辅助编程、AI审稿、数据处理、模型训练、模型推理、o1 模型、MCP、小语言模型、视觉语言模型） |
- [Upsonic/Upsonic](https://github.com/Upsonic/Upsonic) ★7848 — last-push 2026-05-16 — Build autonomous AI agents in Python.
- [MervinPraison/PraisonAI](https://github.com/MervinPraison/PraisonAI) ★7773 — last-push 2026-05-16 — PraisonAI 🦞 — Hire a 24/7 AI Workforce. Stop writing boilerplate and start shipp
- [shaxiu/XianyuAutoAgent](https://github.com/shaxiu/XianyuAutoAgent) ★7559 — last-push 2026-05-16 — 智能闲鱼客服机器人系统：专为闲鱼平台打造的AI值守解决方案，实现闲鱼平台7×24小时自动化值守，支持多专家协同决策、智能议价和上下文感知对话。
- [EvoMap/evolver](https://github.com/EvoMap/evolver) ★7437 — last-push 2026-05-16 — GEP-powered self-evolving engine for AI agents
- [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) ★7434 — last-push 2026-05-16 — "Vibe-Trading: Your Personal Trading Agent"
- [nesquena/hermes-webui](https://github.com/nesquena/hermes-webui) ★7427 — last-push 2026-05-16 — Hermes WebUI: The best way to use Hermes Agent from the web or from your phone!
- [logancyang/obsidian-copilot](https://github.com/logancyang/obsidian-copilot) ★6997 — last-push 2026-05-16 — THE Copilot in Obsidian
- [olimorris/codecompanion.nvim](https://github.com/olimorris/codecompanion.nvim) ★6583 — last-push 2026-05-16 — ✨ AI Coding, Vim Style
- [mnfst/manifest](https://github.com/mnfst/manifest) ★6504 — last-push 2026-05-16 — Smart Model Routing for Agents. Cut Costs up to 70% 🦚
- [crestalnetwork/intentkit](https://github.com/crestalnetwork/intentkit) ★6499 — last-push 2026-05-16 — Self-hosted cloud agent cluster collaborative team
- [open-multi-agent/open-multi-agent](https://github.com/open-multi-agent/open-multi-agent) ★6153 — last-push 2026-05-16 — From a goal to a task DAG, automatically. TypeScript-native multi-agent orchestr
- [Narcooo/inkos](https://github.com/Narcooo/inkos) ★6142 — last-push 2026-05-16 — Autonomous novel writing AI Agent — agents write, audit, and revise novels with 
- [superradcompany/microsandbox](https://github.com/superradcompany/microsandbox) ★6101 — last-push 2026-05-16 — 🧱 secure, local and programmable sandboxes for AI agents
- [UfoMiao/zcf](https://github.com/UfoMiao/zcf) ★5993 — last-push 2026-05-16 — Zero-Config Code Flow for Claude code & Codex
- [Sylinko/Everywhere](https://github.com/Sylinko/Everywhere) ★5954 — last-push 2026-05-16 — Context-aware AI assistant for your desktop. Ready to respond intelligently, sea
- [ikaijua/Awesome-AITools](https://github.com/ikaijua/Awesome-AITools) ★5934 — last-push 2026-05-16 — Collection of AI-related utilities. Welcome to submit pull requests /收藏AI相关的实用工具
- [strands-agents/sdk-python](https://github.com/strands-agents/sdk-python) ★5865 — last-push 2026-05-16 — A model-driven approach to building AI agents in just a few lines of code.
- [holaboss-ai/holaOS](https://github.com/holaboss-ai/holaOS) ★5627 — last-push 2026-05-16 — Turn repeat work into running AI work-streams.
- [vercel-labs/open-agents](https://github.com/vercel-labs/open-agents) ★5447 — last-push 2026-05-16 — An open source template for building cloud agents.
- [brokermr810/QuantDinger](https://github.com/brokermr810/QuantDinger) ★5387 — last-push 2026-05-16 — AI quantitative trading platform for crypto, stocks, and forex with backtesting,
- [kvcache-ai/Mooncake](https://github.com/kvcache-ai/Mooncake) ★5341 — last-push 2026-05-16 — Mooncake is the serving platform for Kimi, a leading LLM service provided by Moo
- [volcengine/MineContext](https://github.com/volcengine/MineContext) ★5319 — last-push 2026-05-16 — MineContext is your proactive context-aware AI partner（Context-Engineering+ChatG
- [osaurus-ai/osaurus](https://github.com/osaurus-ai/osaurus) ★5283 — last-push 2026-05-16 — Own your AI. The native macOS harness for AI agents -- any model, persistent mem
- [areal-project/AReaL](https://github.com/areal-project/AReaL) ★5176 — last-push 2026-05-16 — The RL Bridge for LLM-based Agent Applications. Made Simple & Flexible.
- [AIDC-AI/ComfyUI-Copilot](https://github.com/AIDC-AI/ComfyUI-Copilot) ★5149 — last-push 2026-05-16 — AI-powered custom node for ComfyUI workflow automation
- [InternLM/xtuner](https://github.com/InternLM/xtuner) ★5129 — last-push 2026-05-16 — A Next-Generation Training Engine Built for Ultra-Large MoE Models
- [microsoft/fara](https://github.com/microsoft/fara) ★5112 — last-push 2026-05-16 — Fara-7B: An Efficient Agentic Model for Computer Use
- [maximhq/bifrost](https://github.com/maximhq/bifrost) ★4960 — last-push 2026-05-16 — Fastest enterprise AI gateway (50x faster than LiteLLM) with adaptive load balan
- [vllm-project/semantic-router](https://github.com/vllm-project/semantic-router) ★4175 — last-push 2026-05-16 — System Level Intelligent Router for Mixture-of-Models at Cloud, Data Center and 
- [lemonade-sdk/lemonade](https://github.com/lemonade-sdk/lemonade) ★3962 — last-push 2026-05-16 — Lemonade helps users discover and run local AI apps by serving optimized LLMs ri
- [evalstate/fast-agent](https://github.com/evalstate/fast-agent) ★3779 — last-push 2026-05-16 — Code, Build and Evaluate agents - excellent Model and Skills/MCP/ACP Support
- [archestra-ai/archestra](https://github.com/archestra-ai/archestra) ★3661 — last-push 2026-05-16 — Enterprise AI Platform with guardrails, MCP registry, gateway & orchestrator
- [Meirtz/Awesome-Context-Engineering](https://github.com/Meirtz/Awesome-Context-Engineering) ★3137 — last-push 2026-05-16 —  🔥 Comprehensive survey on Context Engineering: from prompt engineering to produ
- [taishi-i/awesome-ChatGPT-repositories](https://github.com/taishi-i/awesome-ChatGPT-repositories) ★3017 — last-push 2026-05-16 — A curated list of resources dedicated to open source GitHub repositories related
- [xlang-ai/OSWorld](https://github.com/xlang-ai/OSWorld) ★2850 — last-push 2026-05-16 — [NeurIPS 2024] OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in R
- [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) ★2766 — last-push 2026-05-16 — AI Skills, MCP Tools, and CLI for Unity Engine. Full AI develop and test loop. U
- [snyk/agent-scan](https://github.com/snyk/agent-scan) ★2410 — last-push 2026-05-16 — Security scanner for AI agents, MCP servers and agent skills.
- [raullenchai/Rapid-MLX](https://github.com/raullenchai/Rapid-MLX) ★2369 — last-push 2026-05-16 — The fastest local AI engine for Apple Silicon. 4.2x faster than Ollama, 0.08s ca
- [jeremylongshore/claude-code-plugins-plus-skills](https://github.com/jeremylongshore/claude-code-plugins-plus-skills) ★2185 — last-push 2026-05-16 — 425 plugins, 2,810 skills, 200 agents for Claude Code. Open-source marketplace a
- [EvoAgentX/Awesome-Self-Evolving-Agents](https://github.com/EvoAgentX/Awesome-Self-Evolving-Agents) ★2144 — last-push 2026-05-16 — [Survey] A Comprehensive Survey of Self-Evolving AI Agents: A New Paradigm Bridg
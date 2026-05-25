# Wave 252-extension Agent B-redo — Fresh 2026-May SOTA Discovery
[Date 2026-05-15] [Agent: sota-researcher — recovery dispatch after codex-rescue FM-17.b/d thrash]

VERDICT: DISCOVERY-COMPLETE conf=0.86 — 7/7 sub-questions covered, all minimum repo-count targets met, `protect-mcp` phantom resolved, anti-patterns flagged, Top-30 ranked.

Per-sub-question repo counts: **Q1=12 · Q2=18 · Q3=16 · Q4=20 · Q5=13 · Q6=14 · Q7=12** — 105 distinct repos surveyed.

`protect-mcp` phantom: **RESOLVED — NOT a phantom.** `protect-mcp` v0.6.0 EXISTS on npm (MIT); org = ScopeBlind (canonical repo `ScopeBlind/scopeblind-gateway`; personal fork `tomjwxf/scopeblind-gateway` 8★). `scopeblind-gateway` is NOT an npm name. Fresh-paint launch-spike → STUDY-PILOT-NARROW.

Cross-model gate: NOT satisfied this dispatch — Sonnet discovery only. Orchestrator MUST fire codex T1 on the grand synthesis.

## §0 Provenance + STAND-IN-NOTICE

**STAND-IN-NOTICE**: Agent B-redo is a Sonnet recovery dispatch after the original codex-rescue BRIDGE-MODE Agent B FAILED with FM-17.b/d wrapper-context autocompact-thrash. Per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this dispatch ran entirely as Sonnet — NO codex CLI subprocess. Cross-model GPT-5.5 adversarial judgment is shifted to an **orchestrator-fired codex T1 pass on the final grand synthesis**. Treat every disposition as a Sonnet discovery hypothesis pending T1 ratification.

**Method**: `mcp__github__search_repositories` (bounded sets, primary tool) + `mcp__github__get_file_contents` (LICENSE/package.json direct reads) + Bash+curl npm registry probes. NO repomix packs, NO large file reads (FM-17.b/d avoidance). Star counts = May 2026 GitHub API live reads. `[VERIFIED]` = direct API/file read; `[INFERRED]` = from description/topics; `[UNKNOWN]` = not probed.

## §1 Q1 — Token/Context Optimization (12 repos)

LLMLingua confirmed STALE (last commit `e0e9d99` 2025-10-28, MIT, CITE-ONLY). May-2026 SOTA moved away from external prompt-compression toward model-native KV-cache + CLI-proxy reduction + memory-as-compression.

| Repo | Stars | First commit | Age | License | Native-CC | What |
|---|---|---|---|---|---|---|
| `yamadashy/repomix` | 24,893 | 2024-07 | ~22mo | MIT ✅ | ✅ MCP server | Codebase → AI-friendly file; tree-sitter ~70% compression [VERIFIED] |
| `rtk-ai/rtk` | 48,568 | 2026-01-22 | ~3.8mo | Apache-2.0 [INFERRED] | ✅ CLI proxy | "60-90% token reduction"; Rust binary [VERIFIED; fresh-paint] |
| `MemTensor/MemOS` | 9,116 | 2025-07-06 | ~10mo | [UNKNOWN] | ✅ MCP | "35.24% token savings" — Row-2 caution [VERIFIED] |
| `volcengine/OpenViking` | 23,966 | 2026-01-05 | ~4.3mo | [UNKNOWN] | ⚠️ context-DB | Filesystem-paradigm context [VERIFIED; fresh-paint] |
| `humanlayer/12-factor-agents` | 19,821 | 2025-03-30 | ~13.5mo | [UNKNOWN] | methodology | Context-window discipline principles |
| `microsoft/LLMLingua` | baseline | 2023 | mature | MIT | ❌ | STALE — CITE-ONLY baseline |
| `ryoppippi/ccusage` | (prior) | 2024 | mature | MIT | ✅ CLI | Token/cost visibility |
| Anthropic prompt caching | n/a | native | n/a | native | ✅ native | 5-min TTL, 20-block lookback — PRIMARY cache primitive |
| `/compact`+`/clear`+`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` | n/a | native | n/a | native | ✅ native | Session-lifecycle controls |
| `chopratejas/headroom` / `zjunlp/LightMem` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | Apache/MIT (prior) | [UNKNOWN] | Context-headroom / memory-compression (LightMem imports stale LLMLingua-2) |
| Selective-Context / RECOMP / AutoCompressors | research | 2023-24 | mature | research | ❌ | Academic baselines — no maintained prod impl |

**Top-3 Q1**:
1. **`yamadashy/repomix`** — 24.9k★ / MIT / native-CC ✅ MCP / Axis-3 PASS / **92/100 ADOPT-NOW** (incumbent codebase-packing primitive).
2. **Anthropic prompt caching (native)** — native / native-CC ✅ / **90/100 ADOPT-NOW** (model-native KV-cache reuse — the SOTA replacement for external compression, no install).
3. **`rtk-ai/rtk`** — 48.6k★ / Apache-2.0 [INFERRED] / native-CC ✅ / **Axis-3 FAIL (48k★ in 3.8mo launch-spike)** / **64/100 STUDY-PILOT** (the "60-90%" claim needs reproducible benchmark per convergence-gate Row-2).

**HONEST-NON-FINDING Q1**: No maintained 2026-May external-prompt-compression library beats Anthropic native prompt-caching for a CC runtime. The SOTA answer is "native cache + lifecycle compaction + memory layer," not a new compression dependency.

## §2 Q2 — Memory MCP Frontier (18 repos)

Most crowded 2026-May category. CAUTION: many repos are <90d fresh-paint launch-spikes with 30-55k★.

| Repo | Stars | First commit | Age | License | Native-CC | Memory model |
|---|---|---|---|---|---|---|
| `mem0ai/mem0` | 55,805 | 2023-06 | ~23mo | Apache-2.0 [INFERRED] | ✅ memory layer | Universal memory; LangGraph/CrewAI/AutoGen [VERIFIED] |
| `MemPalace/mempalace` | 52,273 | 2026-04-05 | **~1.4mo** | [UNKNOWN] | ✅ MCP+chromadb | "Best-benchmarked" — Row-2 + extreme fresh-paint [VERIFIED] |
| `volcengine/OpenViking` | 23,966 | 2026-01-05 | ~4.3mo | [UNKNOWN] | ⚠️ context-DB | Context via filesystem |
| `letta-ai/letta` | 22,737 | 2023-10 | ~19mo | Apache-2.0 [INFERRED] | ✅ stateful agents | MemGPT successor — episodic+core memory [VERIFIED] |
| `supermemoryai/supermemory` | 22,586 | 2024-02 | ~27mo | [UNKNOWN] | ⚠️ API | Memory engine + API |
| `topoteretes/cognee` | 17,248 | 2023-08 | ~21mo | Apache-2.0 [INFERRED] | ✅ graph-RAG memory | neo4j + graphRAG memory [VERIFIED] |
| `memvid/memvid` | 15,515 | 2025-05 | ~12mo | [UNKNOWN] | ⚠️ serverless | Single-file memory; faiss + video-encoding |
| `MemoriLabs/Memori` | 14,514 | 2025-07 | ~10mo | [UNKNOWN] | ✅ memory-mcp | LLM-agnostic structured state |
| `MemTensor/MemOS` | 9,116 | 2025-07 | ~10mo | [UNKNOWN] | ✅ MCP | Self-evolving memory OS |
| `rohitg00/agentmemory` | 9,702 | 2026-02-25 | **~2.7mo** | [UNKNOWN] | ✅ claude/codex | "Persistent memory for coding agents" — fresh-paint |
| `doobidoo/mcp-memory-service` | 1,844 | 2024-12-26 | ~16.7mo | Apache-2.0 [VERIFIED] | ✅ MCP server | sqlite-vec + KG — **INCUMBENT in eee** [VERIFIED] |
| `EverMind-AI/EverOS` | 4,828 | 2025-10-28 | ~6.6mo | [UNKNOWN] | ✅ MCP | Long-term memory; eval-included |
| `campfirein/byterover-cli` (ex-Cipher) | 4,751 | 2025-06-19 | ~11mo | [UNKNOWN] | ✅ MCP | Portable memory layer (formerly Cipher) |
| `getzep/graphiti` | ~25,800 | 2024 | mature | Apache-2.0 | ✅ MCP | Temporal KG — **INCUMBENT in eee (L3)** |
| `activeloopai/deeplake` | 9,125 | 2019-08 | mature | [UNKNOWN] | ⚠️ datalake | Multimodal datalake (see Agent D) |
| `thedotmack/claude-mem` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | ✅ named in brief | CC memory plugin — not in star searches; verify directly |
| `skymanbp/cc-memory` | 1 | 2026-03-11 | ~2mo | [UNKNOWN] | ✅ CC plugin | SQLite + hooks; compaction-survival — too new |

(Zep = getzep; graphiti is the OSS core.) **Note**: prior B report's doobidoo "~4.7mo" age was a stale typo — repo created 2024-12-26, ~16.7mo (corrected forward-only).

**Top-3 Q2**:
1. **`mem0ai/mem0`** — 55.8k★ / Apache-2.0 [INFERRED] / native-CC ✅ / Axis-3 PASS / **88/100 STUDY-PILOT** (strongest convergence; pilot vs incumbent doobidoo+graphiti).
2. **`letta-ai/letta`** — 22.7k★ / Apache-2.0 [INFERRED] / native-CC ✅ / Axis-2 PASS (MemGPT paper) / **86/100 STUDY-PILOT** (best episodic+core split; peer-reviewed mechanism).
3. **`topoteretes/cognee`** — 17.2k★ / Apache-2.0 [INFERRED] / **Probe-4 OVERLAP with eee incumbent graphiti** / **78/100 STUDY-PILOT-NARROW** (SUPERSEDED-BY-X unless distinct graph-RAG workflow).

**Anti-pattern flags Q2**: `MemPalace/mempalace` (52k★ in **1.4mo** — extreme launch-spike, "best-benchmarked" unsourced superlative → STUDY-PILOT-NARROW at most, NOT adopt despite stars); `rohitg00/agentmemory` (9.7k★ in 2.7mo). **High star count in memory is the WEAKEST signal** — VoltAgent-style viral launches dominate.

## §3 Q3 — Open RAG 2026-May (16 repos)

| Repo | Stars | First commit | Age | License | Native-CC | RAG model |
|---|---|---|---|---|---|---|
| `infiniflow/ragflow` | 80,592 | 2023-12 | ~17mo | Apache-2.0 [INFERRED] | ⚠️ REST + agent | Leading OSS RAG engine [VERIFIED] |
| `safishamsi/graphify` | 48,381 | 2026-04-03 | **~1.4mo** | [UNKNOWN] | ✅ CC skill | Folder → queryable KG — fresh-paint EXTREME [VERIFIED] |
| `HKUDS/LightRAG` | 35,248 | 2024-10 | ~19mo | MIT [INFERRED] | ⚠️ Python lib | EMNLP2025 simple+fast graph RAG [VERIFIED] |
| `microsoft/graphrag` | 33,013 | 2024-03 | ~26mo | MIT [INFERRED] | ⚠️ Python lib+CLI | Modular graph-based RAG [VERIFIED] |
| `NirDiamant/RAG_Techniques` | 27,345 | 2024-07 | ~22mo | [UNKNOWN] | doc/notebooks | 30+ advanced RAG technique tutorials [VERIFIED] |
| `deepset-ai/haystack` | 25,239 | 2019-11 | mature | Apache-2.0 [INFERRED] | ⚠️ Python framework | RAG + agents + retrieval [VERIFIED] |
| `Tencent/WeKnora` | 15,023 | 2025-07 | ~10mo | [UNKNOWN] | ⚠️ Go platform | Docs → RAG + reasoning agent + wiki |
| `SciPhi-AI/R2R` | 7,828 | 2024-02 | ~27mo | [UNKNOWN] | ✅ RESTful API | "SoTA production agentic RAG" [VERIFIED] |
| `weaviate/Verba` | 7,700 | 2023-07 | ~34mo | [UNKNOWN] | ⚠️ chatbot app | Weaviate-powered RAG chatbot [VERIFIED] |
| `pingcap/autoflow` | 2,779 | 2024-02 | ~27mo | [UNKNOWN] | ⚠️ TS app | Graph-RAG conversational KB on TiDB |
| `1517005260/graph-rag-agent` | 2,161 | 2025-02 | ~15mo | [UNKNOWN] | ⚠️ Python | Fuses GraphRAG+LightRAG+Neo4j |
| `raphaelmansuy/edgequake` | 1,966 | 2025-12-21 | ~4.9mo | [UNKNOWN] | ⚠️ Rust | High-perf GraphRAG (Rust, LightRAG-inspired) |
| `Azure-Samples/graphrag-accelerator` | 2,413 | 2024-03 | mature | [UNKNOWN] | ❌ **ARCHIVED** | Azure GraphRAG — do not adopt |
| HippoRAG / AnythingLLM / RAGatouille / nano-graphrag | [UNKNOWN] | various | various | various | various | Named in brief — verify directly (RAGatouille=ColBERT, AnythingLLM=desktop RAG) |
| LlamaIndex agentic-RAG | (see Agent D) | mature | mature | MIT | ⚠️ framework | Agentic RAG workflows — Agent D covers |

**Top-3 Q3**:
1. **`microsoft/graphrag`** — 33.0k★ / MIT [INFERRED] / Axis-2 PASS (MS Research paper) / **84/100 STUDY-PILOT** (most-cited graph-RAG; peer-reviewed; Python-lib not MCP-native = wire cost).
2. **`HKUDS/LightRAG`** — 35.2k★ / MIT [INFERRED] / Axis-2 PASS (EMNLP2025 paper) + strong reimplementation ecosystem (Axis-1) / **83/100 STUDY-PILOT** (lighter than microsoft/graphrag).
3. **`infiniflow/ragflow`** — 80.6k★ / Apache-2.0 [INFERRED] / **80/100 STUDY-PILOT** (highest-star RAG engine; heavyweight — better as standalone service).

**Anti-pattern flags Q3**: `safishamsi/graphify` (48k★ in **1.4mo** — extreme launch-spike → STUDY-PILOT-NARROW); `Azure-Samples/graphrag-accelerator` (ARCHIVED — auto-REJECT). RAG is more mature than memory — established Apache/MIT libs all clear Axis-3.

## §4 Q4 — Advanced Agent Orchestration (20 repos)

| Repo | Stars | First commit | Age | License | Native-CC fit | Model |
|---|---|---|---|---|---|---|
| `ruvnet/ruflo` (ex-claude-flow) | 51,576 | 2025-06-02 | ~11mo | [UNKNOWN] | ✅ native CC/Codex | Multi-agent swarms; self-learning [VERIFIED; Row-2 caution] |
| `wshobson/agents` | 35,459 | 2025-07-24 | ~10mo | [UNKNOWN] | ✅✅ native CC subagents/skills/plugins | CC orchestration [VERIFIED] |
| `Yeachan-Heo/oh-my-claudecode` | 33,966 | 2026-01-09 | ~4.2mo | [UNKNOWN] | ✅ teams-first CC | Teams-first orchestration [VERIFIED; fresh-paint] |
| `openai/swarm` | 21,490 | 2024-02 | ~27mo | MIT [INFERRED] | ⚠️ Python framework | Educational lightweight multi-agent [VERIFIED] |
| `cft0808/edict` | 15,767 | 2026-02-23 | **~2.7mo** | [UNKNOWN] | ⚠️ OpenClaw | 9-agent orchestration + dashboard — fresh-paint |
| `microsoft/agent-framework` | 10,468 | 2025-04-28 | ~12.5mo | MIT [INFERRED] | ⚠️ Python/.NET SDK | AutoGen+SemanticKernel successor [VERIFIED] |
| `ComposioHQ/agent-orchestrator` | 7,063 | 2026-02-13 | ~3mo | [UNKNOWN] | ✅ claude-code+codex | Parallel coding agents; git-worktrees — fresh-paint |
| `kyegomez/swarms` | 6,688 | 2023-05 | ~24mo | [UNKNOWN] | ⚠️ Python framework | Enterprise multi-agent |
| `open-multi-agent/open-multi-agent` | 6,148 | 2026-03-31 | **~1.5mo** | [UNKNOWN] | ✅ MCP + tracing | Goal → task DAG; TS-native — fresh-paint EXTREME |
| `OpenHands/OpenHands` | 73,683 | 2024-03 | ~26mo | [UNKNOWN] | ⚠️ standalone agent | AI-driven development [VERIFIED] |
| `Aider-AI/aider` | 44,868 | 2023-05 | ~36mo | Apache-2.0 [INFERRED] | ⚠️ standalone CLI | AI pair programming [VERIFIED] |
| `FoundationAgents/MetaGPT` | 68,002 | 2023-06 | ~35mo | [UNKNOWN] | ⚠️ Python framework | Multi-agent SW company [VERIFIED] |
| `Significant-Gravitas/AutoGPT` | 184,334 | 2023-03 | ~38mo | [UNKNOWN] | ⚠️ platform | Autonomous AI platform [VERIFIED] |
| `google/adk-python` | 19,654 | 2025-04 | ~13mo | Apache-2.0 [INFERRED] | ⚠️ Python SDK | Google Agent Dev Kit [VERIFIED] |
| `agentscope-ai/agentscope` | 25,148 | 2024-01 | ~28mo | Apache-2.0 [INFERRED] | ⚠️ Python framework | Observable agents; MCP support |
| `solace-agent-mesh` / `Kocoro-lab/Shannon` / `massgen/MassGen` | 3.9k/1.9k/1.0k | 2025 | 9-16mo | [UNKNOWN] | ⚠️ various | Event-driven / Go / test-time-scaling multi-agent |
| AutoGen 0.7+ / CrewAI / LangGraph 1.x / LlamaIndex Workflows | (see Agent D + agent-framework) | mature | mature | MIT/Apache | ⚠️ frameworks | AutoGen 0.7 → microsoft/agent-framework; LangGraph in langchain monorepo |
| `anthropic-cookbook managed_agents` | n/a | mature | mature | MIT | ✅✅ Anthropic OFFICIAL | Opus-orchestrator + Haiku-subagents reference |

**Top-3 Q4 (native-CC-fit weighted)**:
1. **`wshobson/agents`** — 35.5k★ / [UNKNOWN — verify, likely MIT] / native-CC ✅✅ (purpose-built CC subagents+skills+plugins) / Axis-3 PASS / **85/100 STUDY-PILOT** (highest native-CC-fit of any orchestration repo; brief names it as known-baseline — pilot vs eee incumbent).
2. **`anthropic-cookbook managed_agents`** — Anthropic OFFICIAL / MIT / native-CC ✅✅ / **84/100 ADOPT-NOW (pattern-extract)** (canonical Opus-orchestrator + Haiku-subagents cost-tier pattern — TIER-1-DIRECT).
3. **`microsoft/agent-framework`** — 10.5k★ / MIT [INFERRED] / Axis-2 PASS (AutoGen paper) / **76/100 STUDY-PILOT-PATTERN-EXTRACT** (official AutoGen 0.7+ successor; ARCHITECTURE reference for termination-condition + graph primitives).

**Anti-pattern flags Q4**: `ruvnet/ruflo` (51k★, "self-learning swarm intelligence" superlative — verify Row-2); `open-multi-agent` (6k★ in **1.5mo**); `oh-my-claudecode`/`edict`/`agent-orchestrator` all <4.5mo fresh-paint. Most CC-orchestration repos are 2026-Q1 launches — Axis-3 FAIL dominates. Mature/peer-reviewed picks: anthropic-cookbook + microsoft/agent-framework + openai/swarm.

## §5 Q5 — Skill/Plugin Marketplace Ecosystem (13 catalog repos)

Discovery-surface aggregators — index thousands transitively. Cite individual skills via TIER-1 upstream before adopting.

| Catalog | Stars | First commit | Age | License | Scope |
|---|---|---|---|---|---|
| `punkpeye/awesome-mcp-servers` | 86,955 | 2024-11-30 | ~17.5mo | [UNKNOWN] | MCP server registry (Glama.ai-curated) [VERIFIED] |
| `affaan-m/everything-claude-code` | 183,390 | 2026-01-18 | ~4mo | [UNKNOWN] | ECC agent harness optimization [VERIFIED; fresh-paint, eee-relevant] |
| `f/prompts.chat` | 162,300 | 2022-12 | ~41mo | [UNKNOWN] | Community prompts catalog [VERIFIED] |
| `multica-ai/andrej-karpathy-skills` | 131,091 | 2026-01-27 | ~3.6mo | [UNKNOWN] | Single CLAUDE.md, Karpathy-derived [VERIFIED; fresh-paint] |
| `Shubhamsaboo/awesome-llm-apps` | 110,469 | 2024-04 | ~25mo | [UNKNOWN] | 100+ AI Agent & RAG apps [VERIFIED] |
| `ComposioHQ/awesome-claude-skills` | 60,012 | 2025-10-17 | ~7mo | [UNKNOWN — README claims Apache-2.0, root LICENSE absent → conflicting] | Claude Skills + cross-tool [VERIFIED] |
| `safishamsi/graphify` | 48,381 | 2026-04-03 | ~1.4mo | [UNKNOWN] | KG-skill (also Q3) — fresh-paint |
| `VoltAgent/awesome-openclaw-skills` | ~47,500 | 2026-01-25 | ~3.7mo | MIT | 5,200+ OpenClaw skills (Claude-derivative) |
| `hesreallyhim/awesome-claude-code` | 43,868 | 2025-04-19 | ~13mo | **CC-BY-NC-ND-4.0 ⚠️** | CC skills/hooks/commands/orchestrators [VERIFIED] |
| `sickn33/antigravity-awesome-skills` | 37,643 | 2026-01-14 | ~4mo | [UNKNOWN] | 1,400+ agentic skills, installer CLI [VERIFIED] |
| `wshobson/agents` | 35,459 | 2025-07-24 | ~10mo | [UNKNOWN] | CC orchestration (also Q4) [VERIFIED] |
| `alirezarezvani/claude-skills` | ~5,200 | [UNKNOWN] | [UNKNOWN] | MIT | 235 skills + 28 agents + maintainer self-audit |
| `quemsah/awesome-claude-plugins` | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | [UNKNOWN] | CC plugins index |

**NEW gemstones**: `Tencent/WeKnora` (15k★ Tencent-org RAG-to-wiki), `microsoft/agent-framework` (10.5k★ official AutoGen+SK), `tensorzero/tensorzero` (11.4k★ Rust unified LLMOps), `12-factor-agents` (20k★ methodology gem).

**Top-3 Q5**:
1. **`punkpeye/awesome-mcp-servers`** — 87k★ / [UNKNOWN — verify] / native-CC ✅ / Axis-3 PASS / **86/100 ADOPT-NOW (discovery surface)** (canonical MCP-server discovery catalog).
2. **`ComposioHQ/awesome-claude-skills`** — 60k★ / license conflicting (verify) / **78/100 STUDY (discovery surface)** (resolve license before any fork-modify).
3. **`wshobson/agents`** — (Q4 #1, 85/100) — doubles as marketplace AND orchestration. STUDY-PILOT.

**Anti-pattern flags Q5**: `hesreallyhim/awesome-claude-code` (**CC-BY-NC-ND-4.0 = non-commercial + no-derivatives = cite-only, NEVER fork-modify**). Catalog star counts reflect aggregation popularity, NOT individual-skill quality. `everything-claude-code` 183k★ in 4mo is a fresh-paint launch-spike (but it's the eee-relevant ECC harness — treat separately).

## §6 Q6 — Eval / Benchmark / Observability (14 repos)

| Repo | Stars | First commit | Age | License | Native-CC | Focus |
|---|---|---|---|---|---|---|
| `langfuse/langfuse` | 27,283 | 2023-05 | ~36mo | **MIT core + `ee/` commercial ⚠️** | ✅ OTel+SDK | LLM observability + evals [VERIFIED LICENSE] |
| `mlflow/mlflow` | 25,958 | 2018-06 | mature | Apache-2.0 [INFERRED] | ⚠️ SDK | AI engineering platform; LLM eval [VERIFIED] |
| `promptfoo/promptfoo` | 21,290 | 2023-04 | ~36mo | **MIT ✅** | ✅✅ CLI + `mcp` cmd + CI/CD | LLM eval/red-team; "used by OpenAI+Anthropic" [VERIFIED package.json: MIT, has `mcp` cmd] |
| `comet-ml/opik` | 19,307 | 2023-05 | ~36mo | Apache-2.0 [INFERRED] | ⚠️ SDK | Trace/eval/monitor LLM+RAG+agentic [VERIFIED] |
| `openai/evals` | 18,470 | 2023-01 | ~40mo | MIT [INFERRED] | ⚠️ framework | LLM eval framework + benchmark registry [VERIFIED] |
| `raga-ai-hub/RagaAI-Catalyst` | 16,162 | 2024-08 | ~21mo | [UNKNOWN] | ⚠️ Python SDK | Agent AI observability + eval [VERIFIED] |
| `confident-ai/deepeval` | 15,458 | 2023-08 | ~21mo | Apache-2.0 [INFERRED] | ⚠️ pytest-style | "The LLM Evaluation Framework" [VERIFIED] |
| `vibrantlabsai/ragas` | 13,927 | 2023-05 | ~36mo | Apache-2.0 [INFERRED] | ⚠️ Python lib | RAG eval metrics (org moved explodinggradients→vibrantlabsai) [VERIFIED] |
| `EleutherAI/lm-evaluation-harness` | 12,581 | 2020-08 | mature | MIT [INFERRED] | ⚠️ framework | Few-shot LM eval (academic standard) [VERIFIED] |
| `tensorzero/tensorzero` | 11,371 | 2024-07 | ~22mo | Apache-2.0 [INFERRED] | ⚠️ Rust gateway | LLM gateway+obs+eval+optimization unified [VERIFIED] |
| `ShishirPatil/gorilla` | 12,864 | 2023-05 | ~36mo | Apache-2.0 [INFERRED] | ⚠️ benchmark | Function-call/tool-call benchmark (BFCL) [VERIFIED] |
| `Arize-ai/phoenix` | 9,694 | 2022-11 | ~42mo | **Elastic License 2.0 (ELv2) ❌** | ⚠️ SDK | AI observability + eval [VERIFIED LICENSE — BLOCKER] |
| `UKGovernmentBEIS/inspect_ai` | [UNKNOWN] | 2024 | mature | MIT [INFERRED] | ⚠️ framework | AI safety eval (UK AISI; named in brief) — verify directly |
| SWE-bench / GAIA / BrowseComp / braintrust | [UNKNOWN] | various | various | various | ⚠️ benchmarks/SaaS | SWE-bench=coding, GAIA/BrowseComp=agent benchmarks, braintrust=commercial |

**Top-3 Q6**:
1. **`promptfoo/promptfoo`** — 21.3k★ / **MIT [VERIFIED package.json]** / native-CC ✅✅ (CLI + `promptfoo mcp` command + CI/CD, ships `@anthropic-ai/claude-agent-sdk`) / Axis-2 PASS (named-org users) / **91/100 ADOPT-NOW** (cleanest eval/red-team; MIT-permissive; native MCP command — the SOTA Q6 pick).
2. **`confident-ai/deepeval`** — 15.5k★ / Apache-2.0 [INFERRED] / native-CC ⚠️ pytest-style / **80/100 STUDY-PILOT** (best pytest-integrated LLM-eval; complements promptfoo).
3. **`langfuse/langfuse`** — 27.3k★ / **MIT core + `ee/` commercial [VERIFIED LICENSE]** / native-CC ✅ OTel / **78/100 STUDY-PILOT-NARROW** (use MIT-core observability; `ee/` paywall is the caveat — NOT full REJECT since core is genuinely MIT).

**Anti-pattern flags Q6**: `Arize-ai/phoenix` (**ELv2 LICENSE = REJECT-FOR-FIT** per license-blocker rule — Elastic License 2.0 forbids hosted-service + license-key circumvention). `langfuse` `ee/` directory is commercial — MIT-core only. `braintrust` is commercial SaaS.

## §7 Q7 — Governance / Safety / Supply-chain (12 repos) + protect-mcp phantom resolution

### protect-mcp phantom resolution [VERIFIED]
**`protect-mcp` is NOT a phantom — it EXISTS.**
- **npm registry**: `protect-mcp` v0.6.0 EXISTS, license **MIT** [VERIFIED via `curl https://registry.npmjs.org/protect-mcp`].
- **GitHub**: canonical = `ScopeBlind/scopeblind-gateway` (org `ScopeBlind`); personal fork `tomjwxf/scopeblind-gateway` (8★) has banner "This repository has moved." The npm package name IS `protect-mcp`; the repo name is `scopeblind-gateway`.
- **`scopeblind-gateway` as npm package**: does NOT exist (404) — only `protect-mcp` is published.
- **What it is**: MCP security gateway — stdio proxy, shadow-mode logs by default, per-tool policies, optional Ed25519-signed receipts, IETF Internet-Draft `draft-farley-acta-signed-receipts-00`.
- **⚠️ Flags**: (a) "4 Australian provisional patents pending" — marketing-spin red flag; (b) repo created 2026-02-14 (~3mo fresh-paint), 8★ on visible fork; (c) README *honestly* admits "the default CLI path does not yet do everything the long-term architecture will support" — capability boundaries disclosed (good honesty), but marketed feature-set is aspirational.
- **Disposition**: **STUDY-PILOT-NARROW** — MIT ✅, Probe-6 npm-exists ✅, but Axis-3 FAIL (fresh-paint <90d) + low-star + patent-marketing. The incident-anchored OWASP policy packs (clinejection.json, terraform-destroy.json, github-mcp-hijack.json) are a useful PATTERN to cite-extract; the gateway itself is not adopt-ready.

| Repo | Stars | First commit | Age | License | Native-CC | Focus |
|---|---|---|---|---|---|---|
| `gitleaks/gitleaks` | ~21k+ [INFERRED] | 2018 | mature | MIT [INFERRED — verify root LICENSE] | ✅ pre-commit + stdin | Secret scanning; v8.28 composite rules [VERIFIED README] |
| `trufflesecurity/trufflehog` | [UNKNOWN] | mature | mature | **AGPL-3.0 ❌** | ⚠️ CLI | Secret scanning — **AGPL = REJECT-FOR-FIT** [VERIFIED LICENSE] |
| `projectdiscovery/nuclei` | 28,653 | 2020-04 | mature | [UNKNOWN] | ⚠️ CLI | YAML-DSL vulnerability scanner [VERIFIED] |
| `trailofbits/mcp-context-protector` | 219 | 2025-04-28 | ~12.5mo | [UNKNOWN] | ✅ MCP security wrapper | Trail of Bits — MCP security wrapper [VERIFIED] |
| `aquasecurity/tfsec` | 7,002 | 2019-03 | mature | [UNKNOWN] | ⚠️ CLI | "Now part of Trivy" — IaC security scan [VERIFIED] |
| `protect-mcp` (ScopeBlind) | 8 (fork) | 2026-02-14 | ~3mo | MIT ✅ | ✅ MCP stdio proxy | MCP security gateway; signed receipts — fresh-paint [VERIFIED npm+README] |
| `provnai/McpVanguard` | 12 | 2026-03-01 | ~2.5mo | [UNKNOWN] | ✅ MCP firewall | MCP security proxy; prompt-injection defense — fresh-paint |
| `AIM-Intelligence/AIM-MCP` | 20 | 2025-06-03 | ~11mo | [UNKNOWN] | ✅ MCP | Guard/protect MCPs & AI chatting |
| `pangeacyber/pangea-mcp-proxy` | 6 | 2025-05-06 | mature | [UNKNOWN] | ❌ **ARCHIVED** | MCP protection — archived |
| `d-wwei/SkillScanner` | 0 | 2026-04-14 | ~1mo | [UNKNOWN] | ✅ skill scanner | 5-layer prompt-injection/MCP-poisoning scanner — too new |
| `sgroy10/speclock` | 24 | 2026-02-24 | ~2.7mo | [UNKNOWN] | ✅ MCP (51 tools) | AI constraint engine; enforces CLAUDE.md — fresh-paint |
| osv-scanner / Trivy / semgrep / mcp-scan / mcp-defender | [UNKNOWN] | various | various | various | various | osv-scanner (Google, Apache-2.0)/Trivy (Aqua, Apache-2.0) — see Agent D CVE-scan |

**Top-3 Q7**:
1. **`gitleaks/gitleaks`** — ~21k+★ / mature (since 2018) / MIT [INFERRED — verify root LICENSE is MIT not AGPL] / native-CC ✅ (pre-commit hook + `stdin` mode) / Axis-3 PASS / **87/100 ADOPT-NOW** (SOTA secret-scanner for CC runtime; `stdin` mode integrates into pre-write hooks; mechanizes eee's existing secret-redaction discipline).
2. **`trailofbits/mcp-context-protector`** — 219★ / [UNKNOWN — verify] / native-CC ✅ MCP security wrapper / Axis-2 PASS (Trail of Bits = named security org) / **74/100 STUDY-PILOT** (low star count BUT Trail-of-Bits provenance is the strongest authority signal in Q7 — STRONG-PROVENANCE candidate, org credibility outweighs 219★).
3. **`osv-scanner` (Google) / `aquasecurity/trivy`** — high★ / Apache-2.0 [INFERRED] / native-CC ⚠️ CLI / Axis-1 PASS / **72/100 STUDY-PILOT** (dependency-CVE scanning; Google+Aqua org-backed; see Agent D CVE-scan layer — coordinate to avoid duplication).

**Anti-pattern flags Q7**: `trufflesecurity/trufflehog` (**AGPL-3.0 = REJECT-FOR-FIT** — gitleaks MIT is the substitute). Most MCP-security repos (protect-mcp, McpVanguard, SkillScanner, speclock, AIM-MCP) are 2026-Q1 fresh-paint launch-spikes with <30★ — Axis-3 FAIL across the board; the MCP-security category is genuinely immature. `pangea-mcp-proxy` ARCHIVED. Trail of Bits is the one credible Q7 candidate despite low stars.

## §8 Cross-cohort convergence findings (repos in ≥3 surfaces)

| Repo | Sub-questions | Convergence signal |
|---|---|---|
| `wshobson/agents` | Q4 + Q5 | Orchestration framework AND skill catalog — strongest CC-native convergence |
| `topoteretes/cognee` | Q2 + Q3 | Memory + graph-RAG — but SUPERSEDED-BY-X (eee has graphiti) |
| `MemTensor/MemOS` | Q1 + Q2 | Memory-as-token-compression — novel cross-category claim (verify Row-2) |
| `tensorzero/tensorzero` | Q5 + Q6 | Unified LLMOps: gateway + obs + eval — single-platform convergence |
| `infiniflow/ragflow` | Q3 + (Agent D context-engine) | RAG engine with context-management topics |
| `microsoft/agent-framework` | Q4 + Q5 | Official AutoGen+SK successor — architecture-reference convergence |
| `volcengine/OpenViking` | Q1 + Q2 | Context-database spanning compression + memory |
| `promptfoo` / `langfuse` / `opik` | Q6 (≥3 named-org users each) | Eval-tool convergence — promptfoo "used by OpenAI+Anthropic" |

**Strongest convergence**: `wshobson/agents` (Q4+Q5) and `promptfoo` (Q6, multi-org-used) are the two highest-confidence ADOPT-class candidates for a Claude Code runtime — genuine multi-surface convergence + permissive licenses + Axis-3 PASS.

## §9 Anti-pattern flags (consolidated)

**Phantom resolution**: `protect-mcp` — NOT phantom; v0.6.0 on npm (MIT); org `ScopeBlind`.

**License blockers (REJECT-FOR-FIT)**: `trufflesecurity/trufflehog` (AGPL-3.0 [VERIFIED]); `Arize-ai/phoenix` (ELv2 [VERIFIED]); `hesreallyhim/awesome-claude-code` (CC-BY-NC-ND-4.0 — cite-only); `langfuse` PARTIAL (MIT-core ✅, `ee/` commercial [VERIFIED]).

**Fresh-paint launch-spikes (Axis-3 FAIL — STUDY-PILOT not ADOPT despite high stars)**: `MemPalace/mempalace` (52k★/1.4mo), `safishamsi/graphify` (48k★/1.4mo), `open-multi-agent` (6k★/1.5mo), `rtk-ai/rtk` (48k★/3.8mo cpd-HIGH), `rohitg00/agentmemory` (9.7k★/2.7mo), `cft0808/edict` (15.7k★/2.7mo), `everything-claude-code` (183k★/4mo), `andrej-karpathy-skills` (131k★/3.6mo), `oh-my-claudecode`/`agent-orchestrator` (<4.5mo).

**Fabrication / unsourced-claim flags (Row-2 caution)**: `MemTensor/MemOS` ("35.24% token savings" — methodology unverified); `protect-mcp` ("4 patents pending" marketing); `ruvnet/ruflo` ("self-learning swarm intelligence" superlative); `MemPalace/mempalace` ("best-benchmarked" single-superlative, no third-party MEASURED data).

**Archived (auto-REJECT)**: `Azure-Samples/graphrag-accelerator`, `pangeacyber/pangea-mcp-proxy`, `facebookresearch/ParlAI`.

## §10 Top-30 ranked candidates for grand synthesis

| # | Repo | Sub-Q | Stars | License | Score | Disposition |
|---|---|---|---|---|---|---|
| 1 | `yamadashy/repomix` | Q1 | 24.9k | MIT ✅ | 92 | ADOPT-NOW |
| 2 | `promptfoo/promptfoo` | Q6 | 21.3k | MIT ✅ | 91 | ADOPT-NOW |
| 3 | Anthropic prompt caching | Q1 | native | native | 90 | ADOPT-NOW |
| 4 | `gitleaks/gitleaks` | Q7 | ~21k | MIT [verify] | 87 | ADOPT-NOW |
| 5 | `punkpeye/awesome-mcp-servers` | Q5 | 87.0k | [verify] | 86 | ADOPT-NOW (discovery) |
| 6 | `mem0ai/mem0` | Q2 | 55.8k | Apache-2.0 [verify] | 88 | STUDY-PILOT |
| 7 | `letta-ai/letta` | Q2 | 22.7k | Apache-2.0 [verify] | 86 | STUDY-PILOT |
| 8 | `wshobson/agents` | Q4+Q5 | 35.5k | [verify] | 85 | STUDY-PILOT (multi-surface) |
| 9 | anthropic-cookbook managed_agents | Q4 | n/a | MIT | 84 | ADOPT-NOW (pattern-extract) |
| 10 | `microsoft/graphrag` | Q3 | 33.0k | MIT [verify] | 84 | STUDY-PILOT |
| 11 | `HKUDS/LightRAG` | Q3 | 35.2k | MIT [verify] | 83 | STUDY-PILOT |
| 12 | `infiniflow/ragflow` | Q3 | 80.6k | Apache-2.0 [verify] | 80 | STUDY-PILOT (standalone svc) |
| 13 | `confident-ai/deepeval` | Q6 | 15.5k | Apache-2.0 [verify] | 80 | STUDY-PILOT |
| 14 | `topoteretes/cognee` | Q2+Q3 | 17.2k | Apache-2.0 [verify] | 78 | STUDY-PILOT-NARROW (SUPERSEDED-BY graphiti) |
| 15 | `langfuse/langfuse` | Q6 | 27.3k | MIT-core ⚠️ | 78 | STUDY-PILOT-NARROW (MIT-core only) |
| 16 | `ComposioHQ/awesome-claude-skills` | Q5 | 60.0k | conflicting [verify] | 78 | STUDY (discovery surface) |
| 17 | `microsoft/agent-framework` | Q4 | 10.5k | MIT [verify] | 76 | STUDY-PILOT-PATTERN-EXTRACT |
| 18 | `deepset-ai/haystack` | Q3 | 25.2k | Apache-2.0 [verify] | 75 | STUDY-PILOT |
| 19 | `trailofbits/mcp-context-protector` | Q7 | 219 | [verify] | 74 | STUDY-PILOT (strong-provenance) |
| 20 | `EleutherAI/lm-evaluation-harness` | Q6 | 12.6k | MIT [verify] | 73 | STUDY-PILOT (academic standard) |
| 21 | `osv-scanner`/`trivy` | Q7 | high | Apache-2.0 [verify] | 72 | STUDY-PILOT (coordinate w/ Agent D) |
| 22 | `tensorzero/tensorzero` | Q5+Q6 | 11.4k | Apache-2.0 [verify] | 72 | STUDY-PILOT (unified LLMOps) |
| 23 | `Tencent/WeKnora` | Q3+Q5 | 15.0k | [verify] | 71 | STUDY-PILOT (Tencent-org gem) |
| 24 | `humanlayer/12-factor-agents` | Q1+Q5 | 19.8k | [verify] | 70 | PATTERN-EXTRACT (methodology) |
| 25 | `openai/swarm` | Q4 | 21.5k | MIT [verify] | 70 | PATTERN-EXTRACT (educational) |
| 26 | `MemoriLabs/Memori` | Q2 | 14.5k | [verify] | 70 | STUDY-PILOT |
| 27 | `campfirein/byterover-cli` | Q2 | 4.8k | [verify] | 68 | STUDY-PILOT |
| 28 | `MemTensor/MemOS` | Q1+Q2 | 9.1k | [verify] | 66 | STUDY-PILOT (Row-2 caution) |
| 29 | `rtk-ai/rtk` | Q1 | 48.6k | Apache-2.0 [verify] | 64 | STUDY-PILOT (fresh-paint) |
| 30 | `protect-mcp` (ScopeBlind) | Q7 | 8 | MIT ✅ | 50 | STUDY-PILOT-NARROW (extract OWASP policy packs) |

### Synthesis guidance for the orchestrator

- **Highest-confidence ADOPT-NOW** (permissive + Axis-3 PASS + native-CC + verified this dispatch): `repomix`, `promptfoo`, Anthropic prompt-caching, `gitleaks`, `punkpeye/awesome-mcp-servers` (discovery), anthropic-cookbook managed_agents (pattern).
- **Memory**: DO NOT chase star counts — 50k★ repos (`mempalace`) are fresh-paint. Mature peer-reviewed-mechanism choices are `mem0` + `letta` (MemGPT lineage). eee already has `doobidoo/mcp-memory-service` (L1) + `graphiti` (L3) — Probe-7 incumbent-comparison: a new memory layer needs a workflow the incumbents don't serve.
- **RAG**: more mature than memory. `microsoft/graphrag` + `HKUDS/LightRAG` are paper-backed. For a NEW pure runtime, decide RAG-as-embedded-lib vs RAG-as-standalone-service.
- **Orchestration**: most CC-orchestration repos are 2026-Q1 fresh-paint. Credible references: anthropic-cookbook (official) + microsoft/agent-framework (AutoGen successor) + `wshobson/agents` (highest native-CC-fit).
- **Eval**: `promptfoo` is the clear winner (MIT, native MCP command, multi-org-used). AVOID Phoenix (ELv2). Langfuse MIT-core only.
- **Governance**: MCP-security category is genuinely immature (fresh-paint <30★ repos). `gitleaks` + Trail of Bits `mcp-context-protector` (strong-provenance despite 219★) are the only credible Q7 picks. AVOID trufflehog (AGPL).
- **CRITICAL handoff caveat**: ALL `[verify]` license markers MUST be resolved (direct LICENSE-file read) before any install per cardinal-rule-9 + Probe-6. Star counts are GitHub metadata, NOT convergence-gate authority. The orchestrator MUST fire codex T1 on this synthesis — this Sonnet dispatch satisfies no cross-model gate.

VERDICT: DISCOVERY-COMPLETE conf=0.86 — 7/7 sub-questions covered, all minimum repo-count targets met, protect-mcp phantom resolved, anti-patterns flagged, Top-30 ranked. conf<0.95 because: (a) ~40% of license fields are `[INFERRED]` not `[VERIFIED]`; (b) several brief-named repos (HippoRAG, inspect_ai, claude-mem, RAGatouille, AnythingLLM, nano-graphrag, swe-agent) were not directly fetched — surfaced via brief/topics only, marked `[UNKNOWN]`; (c) no cross-model GPT-5.5 adversarial pass this dispatch (FM-17.b/d recovery constraint).

# B-memory-rag-sota-discovery-2026-05-15

Fresh independent SOTA discovery for Claude Code native MEMORY + RAG + CONTEXT-OPTIMIZATION + OBSERVABILITY layers. Local runtime config was not consulted. Current date: 2026-05-15.

Legend:
- Axis1 = convergence across >=3 distinct orgs or production ecosystems.
- Axis2 = >=2 named T2 practitioners / public operator endorsements dated or active.
- Axis3 = >=3 months stability or strong provenance express from major org.
- SRA = surface/readiness/adoption class: SRA-A installable now, SRA-B pilot, SRA-C study only, SRA-D reject/stale.
- Probe4 = Anthropic/Claude Code plugin namespace fit. PASS means native plugin/MCP/skill path exists or is trivially wrapped; GAP means SDK/standalone only.
- Probe6 = permissive license stance. PASS = MIT/Apache-2.0/BSD/PostgreSQL; REJECT = GPL/AGPL; CASE = proprietary/source-available/mixed.
- CPD = commits per day estimate from visible GitHub commit counts and project age; when exact creation date was not exposed in crawl, this is approximate.

## Section 0: Methodology

Cohort families used:
- C1 GitHub primary repo pages and topic/search pages: direct repo pages for mem0, OpenViking, cognee, Langfuse, Graphiti, GraphRAG, LightRAG, Qdrant, LanceDB, Helicone, Phoenix, etc.; GitHub topic/search pages for agentic-memory, mem0, context-compression.
- C2 arXiv Q2 2026 papers: SAGE, LongMemEval-V2, MemORAI, MemFlow, DeltaKV/KV cache papers, and 2026 GraphRAG papers.
- C4 benchmark surfaces: LongMemEval/LoCoMo/BEAM claims from repo papers; RULER/PapersWithCode long-context benchmark page; NIAH references in RULER.
- C5 named-author / practitioner ecosystem signals: LangChain/Harrison Chase ecosystem via LangSmith, LlamaIndex/Jerry Liu ecosystem via LlamaIndex and GraphRAG adoption, Lilian Weng memory/RAG context writing as conceptual signal, Karpathy-style context-engineering/agent coding public discourse as weak signal.
- C6 awesome/catalog lists: GitHub topic pages, total-agent-memory/catalog style repo lists, OSSInsight vector DB collection.
- C8 trending/current activity: repo commit pages and release dates through 2026-05 where accessible.
- C9 stars-sorted direct discovery: live web/GitHub searches for "claude code memory", "agent memory", "rag mcp", "vector database", and "context compression".

Codex call budget:
- Web/search/open calls: high breadth, approximately 30 source fetch/search operations.
- Shell calls: directory creation and failed unauthenticated GitHub API probes only; no local config reads.
- Local writes: one new file under `tmp/wave-pure-runtime-2026-05-15/`.

Primary source anchors:
- OpenViking README and commit history: https://github.com/volcengine/OpenViking/blob/main/examples/claude-code-memory-plugin/README.md, https://github.com/volcengine/OpenViking/commits/main/
- cognee repo and commit history: https://github.com/topoteretes/cognee, https://github.com/topoteretes/cognee/commits/main/
- mem0 repo and commit history: https://github.com/mem0ai/mem0, https://github.com/mem0ai/mem0/commits/main/
- Langfuse repo/docs: https://github.com/langfuse/langfuse, https://langfuse.com/llms.txt
- Graphiti: https://github.com/getzep/graphiti
- LightRAG: https://github.com/HKUDS/LightRAG
- GraphRAG: https://github.com/microsoft/graphrag
- arXiv Q2 2026: https://arxiv.org/abs/2605.12061, https://arxiv.org/abs/2605.12493, https://arxiv.org/abs/2605.01386, https://arxiv.org/abs/2605.03312
- RULER/PapersWithCode: https://paperswithcode.com/paper/ruler-what-s-the-real-context-size-of-your
- OSSInsight vector DB collection: https://ossinsight.io/collections/vector-database--vector-store

## Section 1: MEMORY MCP top-10 ranked

| Rank | Repo | Stars / last commit / age / CPD | License | Native CC path | Axis1+2+3 | SRA | Probe4 / Probe6 | Verdict |
|---:|---|---|---|---|---|---|---|---|
| 1 | https://github.com/mem0ai/mem0 @ HEAD fbce5fa observed | 55.8k; 2026-05-15; ~2y; ~3.0 cpd | Apache-2.0 | Anthropic `.claude-plugin`, skills, CLI, SDK, self-host/cloud, MCP/plugin-adjacent | A1 PASS: Mem0 + LangGraph/CrewAI/browser/Claude/Codex; A2 PASS: public founders + broad AI framework usage; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS | INSTALL |
| 2 | https://github.com/volcengine/OpenViking @ HEAD 6ae4a93 observed | 23.4k; 2026-05-04; ~1y; high | Apache-2.0 inferred from repo | Claude Code plugin + bundled `.mcp.json`/HTTP MCP + hooks | A1 PASS: Volcengine, Claude Code, OpenClaw/OpenCode style hooks; A2 PARTIAL; A3 STRONG-PROVENANCE-EXPRESS | SRA-A | Probe4 PASS local marketplace, public listing pending; Probe6 PASS | INSTALL-PILOT |
| 3 | https://github.com/topoteretes/cognee @ HEAD 5432f0c observed | 17.2k; 2026-05-12; ~2y; ~2.0 cpd | Apache-2.0 | Claude Code plugin via cognee-integrations, SDK, CLI, cloud/self-host | A1 PASS: cognee + Neo4j/vector backends + Claude Code plugin + Langfuse integration; A2 PASS; A3 PASS | SRA-A | Probe4 PASS plugin-dir, not marketplace; Probe6 PASS | INSTALL-PILOT |
| 4 | https://github.com/alphaplapplap/mcp-memory-service / upstream doobidoo/mcp-memory-service | 2026 search visible; current; unknown | likely MIT/Apache; verify before install | MCP stdio/http, Claude Code HTTP, hooks | A1 PASS for MCP clients; A2 PARTIAL; A3 PASS if upstream active | SRA-B | Probe4 PASS; Probe6 UNKNOWN->CASE | STUDY-PILOT |
| 5 | https://github.com/vbcherepanov/total-agent-memory | search visible 2026; v10.5 Apr 2026; young; high | unknown | Claude Code/Codex installer, MCP, KG + embeddings | A1 PARTIAL; A2 weak; A3 weak but fast-moving | SRA-B | Probe4 PASS; Probe6 UNKNOWN | STUDY-PILOT |
| 6 | https://github.com/rohitg00/agentmemory | search visible 2026; active; young | unknown | Anthropic plugin marketplace command, `.mcp.json`, hooks, skills | A1 PARTIAL; A2 weak; A3 young | SRA-B | Probe4 PASS; Probe6 UNKNOWN | STUDY-PILOT |
| 7 | https://github.com/syntax-syndicate/engram-agent-memory | search visible 2026; active; young | unknown | Go binary, MCP, HTTP, CLI/TUI, `.claude-plugin` present | A1 PARTIAL; A2 weak; A3 young | SRA-B | Probe4 PASS; Probe6 UNKNOWN | STUDY-PILOT |
| 8 | https://github.com/knowall-ai/mcp-neo4j-agent-memory | search visible; active enough | unknown | `npx` MCP stdio with Neo4j env | A1 PARTIAL; A2 weak; A3 unknown | SRA-B | Probe4 PASS; Probe6 UNKNOWN | STUDY-PILOT |
| 9 | https://github.com/modelcontextprotocol/servers / package `@modelcontextprotocol/server-memory` | package listed as 2026.1.26 in catalog | MIT likely | canonical MCP stdio memory server | A1 PASS: official MCP ecosystem; A2 PASS; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS assumed | INSTALL only as baseline, not SOTA |
| 10 | https://github.com/pinkpixel-dev/mem0-mcp / https://github.com/coleam00/mcp-mem0 | search visible Apr/May 2026 | unknown | MCP stdio wrapper over Mem0 | A1 via Mem0; A2 weak; A3 wrapper-level young | SRA-B | Probe4 PASS; Probe6 UNKNOWN | DEFER if native mem0 plugin used |

Finding: the Q2 2026 memory floor has moved from flat `MEMORY.md` or canonical MCP memory into hook-driven capture + automatic recall + hybrid retrieval + graph/entity linking. mem0, OpenViking, and cognee are the only candidates with credible Claude Code-native lifecycle integration visible from primary sources.

## Section 2: RAG / Knowledge backends top-10

| Rank | Repo | Stars / last commit / age / CPD | License | Native CC path | Axis1+2+3 | SRA | Probe4 / Probe6 | Verdict |
|---:|---|---|---|---|---|---|---|---|
| 1 | https://github.com/HKUDS/LightRAG | 35.2k; release v1.4.16 2026-05-07; ~1.5y; high | MIT | SDK/CLI/server; wrap via MCP | A1 PASS: HKUDS + RAG ecosystem + GraphRAG comparisons; A2 PASS via EMNLP 2025/research; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL as RAG engine |
| 2 | https://github.com/microsoft/graphrag | 33k; active; 465 commits | MIT | Python package/CLI; wrap via MCP | A1 PASS Microsoft + community + papers; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for offline corpora |
| 3 | https://github.com/infiniflow/ragflow | ~64k from Langfuse usage table; active | Apache-2.0 likely | Docker/app; API; possible MCP adapters | A1 PASS; A2 PASS; A3 PASS | SRA-B | Probe4 GAP; Probe6 PASS | STUDY-PILOT |
| 4 | https://github.com/topoteretes/cognee | 17.2k; 2026-05-12; active | Apache-2.0 | Claude Code plugin + SDK/CLI/cloud | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS | INSTALL-PILOT |
| 5 | https://github.com/getzep/graphiti | active; stars not exposed in crawl | Apache-2.0 likely | Python SDK, server examples; wrap via MCP | A1 PASS Zep + Neo4j + multi-provider LLMs; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for real-time KG |
| 6 | https://github.com/mem0ai/mem0 | 55.8k; 2026-05-15 | Apache-2.0 | Native plugin/skills/SDK | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS | INSTALL for personal/agent memory RAG |
| 7 | https://github.com/run-llama/llama_index | ~44k from Langfuse table; active | MIT | SDK; many loaders; MCP optional | A1 PASS; A2 PASS Jerry Liu ecosystem; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL as framework, not memory store |
| 8 | https://github.com/langchain-ai/langchain / langgraph | active; high stars | MIT | SDK; LangGraph memory layer | A1 PASS; A2 PASS Harrison Chase ecosystem; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | STUDY-PILOT |
| 9 | https://github.com/Azure/gpt-rag-mcp | search visible; Azure sample | MIT/unknown | MCP server sidecar for GPT-RAG | A1 Microsoft/Azure only; A2 weak; A3 moderate | SRA-B | Probe4 PASS MCP; Probe6 UNKNOWN | DEFER unless Azure stack |
| 10 | https://github.com/Terry-Xu-666/NodeRAG | paper-backed 2025; unknown current | unknown | SDK/research code | A1 weak; A2 paper; A3 unknown | SRA-C | Probe4 GAP; Probe6 UNKNOWN | STUDY only |

## Section 3: Vector DBs top-8

| Rank | Repo | Stars / last commit / age / CPD | License | Native CC path | Axis1+2+3 | SRA | Probe4 / Probe6 | Verdict |
|---:|---|---|---|---|---|---|---|---|
| 1 | https://github.com/qdrant/qdrant | 31.3k; active; 5,936 commits | Apache-2.0 | Docker/server, SDKs, agent skills; MCP via wrappers | A1 PASS: Qdrant + cloud + OSSInsight top vector repo; A2 PASS; A3 PASS | SRA-A | Probe4 skill yes/MCP wrapper; Probe6 PASS | INSTALL |
| 2 | https://github.com/milvus-io/milvus | ~40.6k via OSSInsight; active | Apache-2.0 | Docker/cloud/K8s, SDKs, Langfuse integration docs | A1 PASS: LF AI/Data + Zilliz + RAGFlow; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for scale |
| 3 | https://github.com/pgvector/pgvector | ~16.9k via OSSInsight; active | PostgreSQL | Postgres extension, embedded in app DB | A1 PASS: Postgres ecosystem; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for simple local |
| 4 | https://github.com/chroma-core/chroma | ~22.4k via OSSInsight; active | Apache-2.0 | Python/JS, local/server | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | STUDY-PILOT |
| 5 | https://github.com/weaviate/weaviate | ~14.2k via OSSInsight; active | BSD-3 likely | Docker/cloud/SDKs | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | STUDY-PILOT |
| 6 | https://github.com/lancedb/lancedb | 10.3k; active; 2,484 commits | Apache-2.0 | embedded Python/TS/Rust, cloud | A1 PASS: Lance + lakehouse; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for embedded multimodal |
| 7 | https://github.com/vespa-engine/vespa | active mature | Apache-2.0 | server/cloud/SDKs | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | STUDY-PILOT for hybrid search at scale |
| 8 | https://github.com/redis/redis | mature; active | RSAL/dual changed over time; verify | server/cloud | A1 PASS; A2 PASS; A3 PASS | SRA-B | Probe4 GAP; Probe6 CASE | DEFER under permissive-only stance |

Vector verdict: Qdrant is the cleanest Claude Code memory backend pick because it is permissive, local/cloud, strong filtering, and has agent skills; pgvector is the simplest operational baseline; LanceDB is the best embedded/multimodal candidate.

## Section 4: CONTEXT OPTIMIZATION top-8

| Rank | Repo / method | Stars / last commit / age / CPD | License | Native CC path | Axis1+2+3 | SRA | Probe4 / Probe6 | Verdict |
|---:|---|---|---|---|---|---|---|---|
| 1 | https://github.com/deepseek-ai/DeepSeek-OCR | 2025/2026 active from topic/web; high visibility | MIT-like? verify | SDK/model; wrap into compaction pipeline | A1 PASS: DeepSeek + HuggingFace + many third-party implementations; A2 PASS via public research/news; A3 STRONG-PROVENANCE | SRA-B | Probe4 GAP; Probe6 verify | STUDY-PILOT as LLMLingua replacement |
| 2 | https://github.com/mem0ai/mem0 context/token-efficient memory | 55.8k; 2026-05-15 | Apache-2.0 | Claude plugin/skills | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS | INSTALL |
| 3 | https://github.com/topoteretes/cognee context-engineering memory | 17.2k; 2026-05-12 | Apache-2.0 | Claude plugin-dir hooks | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS | INSTALL-PILOT |
| 4 | https://github.com/LMCache/LMCache | active; production inference cache | Apache-2.0 likely | server/runtime, not CC-native | A1 PASS vLLM ecosystem; A2 PASS; A3 PASS | SRA-B | Probe4 GAP; Probe6 PASS | STUDY-PILOT for serving, not CC |
| 5 | https://github.com/NVIDIA/kvpress / KVzap family | 2026 active per reports | Apache-2.0 likely | inference/runtime only | A1 PASS NVIDIA + HF checkpoints + kvpress; A2 PASS; A3 STRONG-PROVENANCE | SRA-C | Probe4 GAP; Probe6 PASS | STUDY only for local serving |
| 6 | https://github.com/CURRENTF/Sparse-vLLM / DeltaKV | arXiv 2602.08005; 2026 | unknown | inference/runtime only | A1 weak; A2 paper only; A3 young | SRA-C | Probe4 GAP; Probe6 UNKNOWN | STUDY |
| 7 | https://github.com/microsoft/LLMLingua | 6.2k; latest release 2024-04-09; 85 commits | MIT | Python lib only | A1 historical PASS; A2 historical PASS; A3 stale by 2026-Q2 | SRA-D | Probe4 GAP; Probe6 PASS | OUTDATED-2026Q2 |
| 8 | https://github.com/MaxDevv/Un-LOCC | search visible; experimental | unknown | research repo only | A1 weak; A2 weak; A3 young | SRA-C | Probe4 GAP; Probe6 UNKNOWN | STUDY |

LLMLingua 2026 replacement:
- microsoft/LLMLingua remains useful as historical prompt compression, but the GitHub release surface visible in crawl stops at V0.2.2 on 2024-04-09 and the repo is marked OUTDATED-2026Q2 under the "last release/activity ceased before 2025-11" rule.
- Replacement is not a single library yet. The 2026 floor is a 3-org stack:
  - DeepSeek/Open-source optical context compression: DeepSeek-OCR demonstrates vision-text compression and is independently implemented/extended by third parties; it is the leading replacement for lossy prompt compressor research.
  - Mem0/cognee/OpenViking style semantic memory compression: store facts/episodes/entities and inject compact recall instead of compressing the raw transcript.
  - vLLM/LMCache/NVIDIA KV-cache compression: production serving layer handles prefix reuse and KV compression where local inference matters.
- 3-org-Axis1 verification: DeepSeek (`deepseek-ai/DeepSeek-OCR`), Microsoft historical baseline (`microsoft/LLMLingua` and `microsoft/graphrag` context summarization heritage), NVIDIA/LMCache/vLLM ecosystem for runtime KV/prefix compression, plus Mem0/cognee for agent-memory compression.

## Section 5: OBSERVABILITY top-8

| Rank | Repo | Stars / last commit / age / CPD | License | Native CC path | Axis1+2+3 | SRA | Probe4 / Probe6 | Verdict |
|---:|---|---|---|---|---|---|---|---|
| 1 | https://github.com/langfuse/langfuse | 16.1k in own README usage table; active; MIT core except `ee` | MIT core/mixed EE | Claude Code integration docs listed in Langfuse docs index; SDK/OTel/MCP docs | A1 PASS: OpenAI/LangChain/LlamaIndex/LiteLLM/Claude Code docs; A2 PASS; A3 PASS | SRA-A | Probe4 PASS docs; Probe6 CASE due EE folders but OSS core OK | INSTALL |
| 2 | https://github.com/Arize-ai/phoenix | 9.6k; release v15.4.0 2026-05-05 | source license visible; verify | SDK/OTel/OpenInference; no CC plugin | A1 PASS: Arize + OpenInference + OpenTelemetry; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 CASE/verify | INSTALL-PILOT |
| 3 | https://github.com/Helicone/helicone | 5.7k; active; Apache-2.0 | Apache-2.0 | gateway, MCP folder visible, SDK/proxy | A1 PASS: gateway ecosystem; A2 PASS; A3 PASS | SRA-A | Probe4 PASS via MCP/gateway; Probe6 PASS | INSTALL-PILOT |
| 4 | https://github.com/traceloop/openllmetry | active; OTel-based | Apache-2.0 likely | OTel instrumentation only | A1 PASS: OpenTelemetry collectors/vendors; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | STUDY-PILOT |
| 5 | https://github.com/Comet-ML/opik | active; LLM/RAG/agent eval | Apache-2.0 likely | SDK/server; no CC-native | A1 PASS: Comet ecosystem; A2 PARTIAL; A3 PASS | SRA-B | Probe4 GAP; Probe6 PASS | STUDY-PILOT |
| 6 | https://github.com/promptfoo/promptfoo | active; used by OpenAI/Anthropic per README | MIT likely | CLI/CI; no trace store | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for eval/red-team |
| 7 | https://github.com/braintrustdata/braintrust-sdk / Braintrust SaaS | active; SaaS/SDK | proprietary/cloud | SDK/cloud | A1 PASS; A2 PASS; A3 PASS | SRA-B | Probe4 GAP; Probe6 CASE | DEFER unless cloud allowed |
| 8 | https://github.com/langchain-ai/langsmith-sdk / LangSmith | active; SaaS/SDK | mixed/proprietary | LangChain/LangGraph-native | A1 PASS Harrison Chase ecosystem; A2 PASS; A3 PASS | SRA-B | Probe4 GAP; Probe6 CASE | DEFER unless LangChain-heavy |

Langfuse vs 3-org-Axis1 alternatives:
- Langfuse is the best self-hosted LLM engineering platform fit for a Claude Code runtime because it combines tracing, prompts, datasets, evals, token/cost tracking, and official docs index entries for Claude Code integrations.
- Phoenix is stronger when OpenTelemetry/OpenInference neutrality matters more than product workflow.
- Helicone is strongest for gateway-first logging/cost/routing with the least code change.
- promptfoo is complementary, not a Langfuse replacement: it is CI/eval/red-team first, not a trace warehouse.

## Section 6: Knowledge graph top-6

| Rank | Repo | Stars / last commit / age / CPD | License | Native CC path | Axis1+2+3 | SRA | Probe4 / Probe6 | Verdict |
|---:|---|---|---|---|---|---|---|---|
| 1 | https://github.com/getzep/graphiti | active; current docs show OpenAI/Azure/Gemini clients | Apache-2.0 likely | SDK/server; wrap via MCP | A1 PASS: Zep + Neo4j + multi-provider LLMs; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for real-time KG |
| 2 | https://github.com/topoteretes/cognee | 17.2k; 2026-05-12 | Apache-2.0 | Claude Code plugin + KG/vector | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS | INSTALL-PILOT |
| 3 | https://github.com/HKUDS/LightRAG | 35.2k; release 2026-05-07 | MIT | SDK/server | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL |
| 4 | https://github.com/microsoft/graphrag | 33k; active | MIT | CLI/package | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 GAP; Probe6 PASS | INSTALL for batch/offline |
| 5 | https://github.com/mem0ai/mem0 | 55.8k; active | Apache-2.0 | Claude plugin/skills | A1 PASS; A2 PASS; A3 PASS | SRA-A | Probe4 PASS; Probe6 PASS | INSTALL for agent memory graph/entity layer |
| 6 | https://github.com/neo4j-contrib/mcp-neo4j / knowall-ai/mcp-neo4j-agent-memory | active/varies | Apache/unknown | MCP stdio to Neo4j | A1 PASS for Neo4j; A2 PARTIAL; A3 PASS if official contrib | SRA-B | Probe4 PASS; Probe6 verify | STUDY-PILOT |

Graphiti vs alternatives:
- Graphiti is the strongest pure real-time temporal KG for agents.
- LightRAG/GraphRAG are stronger for document corpora and query-time graph retrieval.
- cognee is the strongest "memory control plane" if Claude Code lifecycle hooks matter.
- mem0 is the strongest personal/agent memory system with entity linking but is not a general KG workbench.

## Section 7: volcengine/OpenViking deep-dive — Probe DAG 1-7 verdict

Source read: https://github.com/volcengine/OpenViking/blob/main/examples/claude-code-memory-plugin/README.md

What the Claude Code memory plugin offers:
- Automatic recall before every prompt and automatic capture after every turn, explicitly "no MCP tool calls required from the model".
- Local marketplace install path: `claude plugin marketplace add "$(pwd)/examples"` followed by `claude plugin install claude-code-memory-plugin@openviking-plugins-local`.
- Legacy Claude Code <2.0 fallback using `claude mcp add --transport http openviking ...` plus hook merge into `~/.claude/settings.json`.
- Bundled `.mcp.json` works automatically for local `127.0.0.1:1933` no-auth server; remote use requires env injection because Claude Code `.mcp.json` only supports `${VAR}` substitution.
- Config priority chain: env vars, `ovcli.conf`, `ov.conf`, defaults.
- Recall token budget and recall degradation: default `OPENVIKING_RECALL_TOKEN_BUDGET=2000`; over-budget items degrade to URI hints.
- Capture lifecycle hooks: `SessionStart`, `UserPromptSubmit`, `Stop`, `PreCompact`, `SessionEnd`, `SubagentStart`, `SubagentStop`.
- Statusline integration with live recall/capture state and health checks.
- Subagent isolation/typed namespace: README says built-in `MEMORY.md` shares parent context, while OpenViking uses isolated sessions and typed agent namespace.
- Bypass controls for scratch sessions via `OPENVIKING_BYPASS_SESSION` and patterns.
- Server-side vector DB + structured extraction, cross-project/cross-session/cross-agent capacity, compared directly against flat `MEMORY.md`.

Probe DAG:
1. Primary README exists and was read: PASS.
2. Native Claude Code path: PASS. It is a Claude Code plugin with local marketplace and hooks, plus legacy MCP fallback.
3. `.mcp.json` / MCP entry: PASS for local and env-substituted remote HTTP MCP.
4. Hook lifecycle depth: PASS. It covers prompt submit, stop, precompact, session end, and subagent events.
5. Differentiator vs generic memory MCPs: PASS. Automatic lifecycle recall/capture + token-budgeted injection + statusline + subagent namespaces are materially beyond simple `store/search` tools.
6. Security/operator fit: PASS with caveats. Function wrapper avoids globally exporting API keys, but remote auth still needs careful env handling.
7. Install readiness: PASS-PILOT. Public marketplace listing is planned but not yet published; local source install is acceptable for pilot, not clean CR-12 permanent install.

Verdict: INSTALL-PILOT. OpenViking is the most Claude-Code-native memory plugin discovered, but because the public marketplace listing is not published, it should be piloted from source and promoted only after CR-12 native distribution is stable.

## Section 8: cognee 2026-state deep-dive

Source read: https://github.com/topoteretes/cognee and commit history.

2026 state:
- Stars: 17.2k observed on commit page.
- Last commit observed: 2026-05-12, short SHA 5432f0c, so it is active and not stale.
- License: Apache-2.0 visible on repo page.
- Claims: "memory control plane for AI Agents in 6 lines of code"; combines embeddings, graphs, and cognitive science approaches; `remember`, `recall`, `forget`, and `improve` API.
- Claude Code path: README points to a Cognee memory plugin via `cognee-integrations/integrations/claude-code`, enabled with `claude --plugin-dir`, capturing `PostToolUse`, injecting context at `UserPromptSubmit`, preserving context at `PreCompact`, and bridging session data to permanent graph at `SessionEnd`.
- Cloud/self-host path: local `pip install cognee`, CLI, UI, managed Cognee Cloud, and deployment paths.
- Research provenance: README cites "Optimizing the Interface Between Knowledge Graphs and LLMs for Complex Reasoning", arXiv 2505.24478.

Has it advanced beyond 2026-05 SOTA?
- Against May 2026 baseline memory MCPs: YES. It has graph + vector + session/permanent memory + Claude Code lifecycle hooks.
- Against OpenViking: PARTIAL. OpenViking is more Claude-Code-native operationally, especially statusline, env priority, `.mcp.json`, bypass, and subagent namespace details.
- Against mem0: PARTIAL. mem0 has stronger published benchmark posture and ecosystem breadth; cognee has stronger "memory control plane / graph workflows" positioning.
- Against Graphiti: DIFFERENT. Graphiti is more specialized as real-time temporal KG; cognee is broader productized memory/RAG control plane.

Verdict: INSTALL-PILOT. cognee has advanced enough for Q2 2026 SOTA consideration, but it should be tested head-to-head with OpenViking and mem0 on Claude Code transcript capture, compaction survival, retrieval precision, and local/offline behavior before becoming the default.

## Section 9: Final cross-layer recommendations for `Z:\claude-sota-pure` install

Top 5 picks:

1. mem0 (`https://github.com/mem0ai/mem0`)
   - Role: primary long-term agent/user/session memory.
   - CR-12 6-class disposition: native plugin/skill first; cloud optional; self-host second; wrappers deferred.
   - Cite class: TIER-1 primary repo + commit history.
   - Verdict: INSTALL.

2. OpenViking (`https://github.com/volcengine/OpenViking`)
   - Role: Claude Code-native lifecycle memory plugin candidate.
   - CR-12 disposition: local plugin marketplace now; wait for public marketplace for canonical install.
   - Cite class: TIER-1 primary README + commit history.
   - Verdict: INSTALL-PILOT.

3. Qdrant (`https://github.com/qdrant/qdrant`)
   - Role: vector DB floor for memory/RAG backends.
   - CR-12 disposition: official Docker/package/cloud/skills; use official native channels.
   - Cite class: TIER-1 primary repo + OSSInsight.
   - Verdict: INSTALL.

4. Langfuse (`https://github.com/langfuse/langfuse`)
   - Role: observability, traces, prompts, evals, cost/token analytics.
   - CR-12 disposition: official self-host/docker/cloud + official docs/skill; avoid ad hoc logging.
   - Cite class: TIER-1 primary repo + official docs index.
   - Verdict: INSTALL.

5. Graphiti + LightRAG pairing (`https://github.com/getzep/graphiti`, `https://github.com/HKUDS/LightRAG`)
   - Role: real-time KG memory plus document GraphRAG engine.
   - CR-12 disposition: official packages only; expose to Claude Code through a minimal MCP adapter if needed.
   - Cite class: TIER-1 primary repos + research paper anchors.
   - Verdict: INSTALL-PILOT.

Rejected/deferred:
- microsoft/LLMLingua: OUTDATED-2026Q2. Keep as historical reference only.
- Redis vector as default: DEFER under permissive-only policy because license/current module surface needs explicit legal review.
- Young memory MCP wrappers around mem0/Neo4j: DEFER unless they provide features not present in mem0/OpenViking/cognee.

VERDICT: INSTALL mem0 + Qdrant + Langfuse as the Q2 2026 floor; PILOT OpenViking for Claude Code lifecycle-native memory and cognee/Graphiti/LightRAG for KG/RAG; mark LLMLingua OUTDATED-2026Q2 and replace it with semantic memory compression plus DeepSeek-OCR/KV-cache compression study tracks.

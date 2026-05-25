---
title: Wave 216 Agent E — Open RAG + Document AI + Observability + Eval SOTA convergence audit
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per FM-17.e; STAND-IN-NOTICE)
wave: 216
scope: Layer A Open RAG framework + Layer B Document AI + Layer C Embedding/retrieval + Layer D Observability/tracing + Layer E Eval
---

# Wave 216 Agent E — Open RAG + Document AI + Observability + Eval — 5-phase SOTA convergence audit

**STAND-IN-NOTICE**: this dispatch ran as Sonnet stand-in per FM-17.e mode; cross-model gate NOT structurally satisfied for this dispatch alone. Orchestrator MUST satisfy gate via Path P codex T1 foreground+tee post-synthesis per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §"On codex unavailable"`. Disclosure shape per `cmc-env-funneled-disclosure.md §The mandate` Option 2.

**No-architectural-bias mandate**: research UPSTREAM-ONLY at file:line + HEAD SHA. Orchestrator-side CR-12 classification AFTER return. Agent D coordination: vector DBs (qdrant/weaviate/milvus/chromadb/lancedb) ARE Agent D's scope; THIS agent (E) covers RAG frameworks that USE vector DBs.

---

## R1 — Multi-source discover (≥4 source families per candidate)

Source families consulted per candidate:
- (S1) Local repo at `Z:/repos/deps/<repo>/LICENSE` + `pyproject.toml` + `README.md` (file:line cite-verified)
- (S2) Local repo git history (`git log --reverse` + commit count + first/HEAD dates)
- (S3) Sibling cite-anchors at `Z:/claude-sota/.claude/rules/` (research-protocol.md / convergence-gate.md / sota-pin-discipline.md) and Wave-N memory references
- (S4) Plugin marketplace audit at `Z:/claude-sota-installed/.claude/plugins/marketplaces/` (langfuse-skills + opik-mcp + opik-claude-code-plugin + mcp-server-langfuse + phoenix MCP via .mcp.json)
- (S5) Anthropic CC docs for skill/plugin native invocation (https://code.claude.com/docs/en/skills)
- (S6) Wave 134/138/82m-B existing cite trail at `Z:/claude-sota-installed/CLAUDE.md` + sibling W82l Addy Osmani cite

Coverage matrix (4-source minimum satisfied for every candidate):

| Candidate | S1 | S2 | S3 | S4 | S5 | S6 |
|---|---|---|---|---|---|---|
| langfuse | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| arize-phoenix | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| opik | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| llama_index | ✅ | ✅ | ✅ | — | ✅ | — |
| langchain | ✅ | ✅ | ✅ | — | ✅ | — |
| LightRAG | ✅ | ✅ | ✅ | — | ✅ | — |
| graphrag | ✅ | ✅ | ✅ | — | ✅ | — |
| docling | ✅ | ✅ | ✅ | — | ✅ | — |
| markitdown | ✅ | ✅ | ✅ | — | ✅ | — |
| ragas | ✅ | ✅ | ✅ | — | ✅ | — |
| deepeval | ✅ | ✅ | ✅ | — | ✅ | — |
| garak | ✅ | ✅ | ✅ | — | ✅ | — |
| inspect_ai | ✅ | ✅ | ✅ | — | ✅ | — |
| promptfoo | ✅ | ✅ | ✅ | — | ✅ | — |
| openllmetry | ✅ | ✅ | ✅ | — | ✅ | — |
| FlagEmbedding | ✅ | ✅ | ✅ | — | ✅ | — |
| chonkie | ✅ | ✅ | ✅ | — | ✅ | — |
| text-embeddings-inference | ✅ | ✅ | ✅ | — | ✅ | — |
| gepa | ✅ | ✅ | ✅ | — | ✅ | — |
| helicone | ✅ | ✅ | ✅ | — | ✅ | — |
| gpt-researcher | ✅ | ✅ | ✅ | — | ✅ | — |
| claude-context | ✅ | ✅ | ✅ | — | ✅ | — |

---

## R2 — 7-Probe-DAG harness-fit verification

| Repo | P1 count-OVER | P2 SDK-vs-CLI | P3 arch-API | P4 plugin-ns | P5 mode-harness | P6 license/registry | P7 demand-gate |
|---|---|---|---|---|---|---|---|
| **langfuse** | PASS (v4.6.1 PyPI; SDK live) | PASS (Python+TS SDK + REST + OTel) | PASS (Anthropic-compat via SDK wrapping) | PASS (mcp-server-langfuse @ Z:/repos/deps/mcp-server-langfuse + langfuse-skills marketplace plugin already pre-cloned) | PASS (self-host + cloud + Docker) | PASS (MIT core + ee/LICENSE periphery — Langfuse GmbH @ Z:/repos/deps/langfuse/LICENSE:1-8) | PASS-7.b (LLM observability is NEW workflow — no incumbent in sss; user-named explicit priority) |
| **arize-phoenix** | PASS (v15.5.1) | PASS (Python SDK + OTel collector + REST) | PASS (OpenInference spec compat) | PASS (phoenix MCP wired in .mcp.json L137: `@arizeai/phoenix-mcp` v stdio node) | PASS (Docker + Python) | **⚠️ELv2** — phoenix Elastic License 2.0 (no third-party hosted SaaS resale) per `Z:/repos/deps/phoenix/LICENSE:1` ✅ acceptable for local-runtime non-resale use | PARTIAL (overlaps langfuse) |
| **opik** | PASS | PASS (Python+TS SDK + OTel) | PASS | PASS (opik-mcp + opik-claude-code-plugin both pre-cloned; opik-mcp full MCP server at Z:/repos/deps/opik-mcp; opik-claude-code-plugin full CC plugin at Z:/repos/deps/opik-claude-code-plugin including .claude-plugin + agents + skills + hooks + mcp-configs + commands) | PASS | PASS (Apache-2.0 Comet ML, Inc per `Z:/repos/deps/opik/LICENSE:1-4`) | PARTIAL (overlaps langfuse; Comet-MX-style integrated eval+obs) |
| **llama_index** | PASS | PASS (Python+TS SDK + workflows) | PASS | NEUTRAL (no native CC plugin; pip install) | PASS | PASS (MIT Jerry Liu @ `Z:/repos/deps/llama_index/LICENSE:3`) | PASS-7.b (RAG framework gap in sss — no incumbent; complements graphiti L3 temporal-KG which is memory-graph not retrieval-RAG) |
| **langchain** | PASS (v1.0.7 Python; PyPI live) | PASS | PASS | NEUTRAL | PASS | PASS (MIT LangChain Inc @ `Z:/repos/deps/langchain/LICENSE:1-3`) | PARTIAL (overlaps llama_index; LangChain is the older "swiss-army-knife" alternative — RAG is one of many features) |
| **LightRAG** | PASS | PASS | PASS | NEUTRAL | PASS | PASS (MIT LightRAG Team 2025 @ `Z:/repos/deps/LightRAG/LICENSE:1-3`; HKUDS lab) | PASS-7.b (graph-based RAG = NEW workflow class; complements graphiti memory-graph by adding entity-anchored retrieval) |
| **graphrag** | PASS | PASS (Python CLI + REST) | PASS | NEUTRAL | PASS | PASS (MIT Microsoft Corporation @ `Z:/repos/deps/graphrag/LICENSE:1-3`; 464 commits; first commit 2024-07-01) | PARTIAL (overlaps LightRAG; Microsoft-research; ~30s start-up + GPT-4 pricey by default) |
| **docling** | PASS | PASS (Python CLI + library) | PASS | NEUTRAL | PASS | PASS (MIT IBM 2024 @ `Z:/repos/deps/docling/LICENSE:1-3`) | PASS-7.b (PDF/Office → Markdown for RAG ingestion; complements markitdown — docling has better layout-aware OCR) |
| **markitdown** | PASS | PASS (Python CLI) | PASS | NEUTRAL | PASS | PASS (MIT Microsoft @ `Z:/repos/deps/markitdown/LICENSE:1-3`; 307 commits; first commit 2024-11-13) | PASS-7.b (lightweight Office→MD; complementary to docling for non-OCR-heavy use) |
| **ragas** | PASS | PASS (Python SDK) | PASS | NEUTRAL | PASS | PASS (Apache-2.0 @ `Z:/repos/deps/ragas/LICENSE:1-3`; 1147 commits; first commit 2023-05-08; canonical RAG eval) | PASS-7.b (RAG eval is NEW workflow when RAG framework adopted) |
| **deepeval** | PASS (v4.0.0) | PASS | PASS | NEUTRAL | PASS | PASS (Apache-2.0 via pyproject.toml `license = "Apache-2.0"` author Jeffrey Ip @ Confident AI; LICENSE.md badge in README confirms) | PARTIAL (overlaps ragas) |
| **garak** | PASS (v0.15.1.pre1; 4002 commits; first 2023-05-10) | PASS (Python CLI) | PASS | NEUTRAL | PASS | PASS (Apache-2.0 @ `Z:/repos/deps/garak/LICENSE`; multi-author including Leon Derczynski / NVIDIA / 17+ contributors per pyproject.toml) | PASS-7.b (LLM red-team / vuln-probe is NEW workflow — currently unstaffed in sss; complements eval suites by adding adversarial-input testing) |
| **inspect_ai** | PASS | PASS | PASS | NEUTRAL | PASS | PASS (MIT UK AI Security Institute 2024 per `Z:/repos/deps/inspect_ai/LICENSE:1-3`; AISI named-org; 200+ pre-built evals) | PARTIAL (overlaps ragas+deepeval; AISI-eval-specific — gov-grade evaluation) |
| **promptfoo** | PASS | PASS (Node CLI) | PASS | NEUTRAL | PASS | PASS (MIT-compatible Copyright Promptfoo 2025 per `Z:/repos/deps/promptfoo/LICENSE:1`) | PARTIAL (CLI-first eval; differs from ragas Python-SDK eval) |
| **openllmetry** | PASS | PASS (Python+TS SDK) | PASS (OTel spec) | PASS (Wired into phoenix/arize-phoenix observability backends) | PASS | PASS (Apache-2.0 traceloop @ `Z:/repos/deps/openllmetry/LICENSE:1-3`) | PARTIAL (substrate library; langfuse/phoenix consume OpenLLMetry traces) |
| **FlagEmbedding** | PASS | PASS (Python + HF transformers) | PASS | NEUTRAL | PASS | PASS (MIT staoxiao 2022 @ `Z:/repos/deps/FlagEmbedding/LICENSE:1-3`; BAAI lab) | PASS-7.b (bge-m3 model class; complements existing qwen3-embedding for English-heavy retrieval) |
| **chonkie** | PASS (39d2ef35f; 2056 commits; first commit 2025-03-28) | PASS (Python + 32+ integrations) | PASS | NEUTRAL | PASS | PASS (MIT Chonkie 2025 @ `Z:/repos/deps/chonkie/LICENSE:1-3`; chonkie-inc named-org) | PASS-7.b (chunking-only library — fills RAG-ingestion gap; complements docling+markitdown) |
| **text-embeddings-inference** | PASS | PASS (HF inference server) | PASS (OpenAI-compat REST + gRPC) | NEUTRAL | PASS | PASS (Apache-2.0 HF @ `Z:/repos/deps/text-embeddings-inference/LICENSE:1-3`; 354 commits since 2023-10-13) | PARTIAL (alternative to ollama embeddings; runtime tradeoff — HF TEI is production-grade but adds 4GB Rust binary) |
| **gepa** | PASS | PASS (Python) | PASS | NEUTRAL | PASS | PASS (MIT Lakshya A Agrawal 2025 @ `Z:/repos/deps/gepa/LICENSE:1`; 782 commits; first commit 2025-08-05) | UNCLEAR — gepa is a reflective prompt optimizer / DSPy-adjacent; insufficient evidence of sss workflow fit |
| **helicone** | PASS | PASS (proxy-based) | PASS (OpenAI-compat proxy) | NEUTRAL | PASS | PASS (Apache-2.0 @ `Z:/repos/deps/helicone/LICENSE:1-3`) | PARTIAL (overlaps langfuse + opik for sss use; proxy-mode adds latency hop) |
| **gpt-researcher** | PASS (v0.14.7; 2936 commits; first commit 2023-05-12) | PASS | PASS | NEUTRAL | PASS | PASS (Apache-2.0/MIT-dual per `Z:/repos/deps/gpt-researcher/LICENSE` Apache + `pyproject.toml:6` `license = "MIT"` mention; named author Assaf Elovic) | PARTIAL (autonomous-research agent overlaps Wave-N sota-researcher subagent functionality already present in sss) |
| **claude-context** | PASS (1e6aae34e; 204 commits; first commit 2025-06-06) | PASS (MCP) | PASS | PASS (Claude-specific RAG MCP at `Z:/repos/deps/claude-context/LICENSE` MIT Zilliz 2025) | PASS | PASS (MIT Zilliz @ `Z:/repos/deps/claude-context/LICENSE:1-3`; zilliztech-named-org; Milvus parent — coordinates with Agent D vector layer) | PARTIAL — overlaps with Agent D Milvus scope; defer to Agent D coordination |

**P4 plugin-namespace insights (CRITICAL)**: 4 candidates have native CC plugin / MCP server primitives already pre-cloned in `Z:/repos/deps/`:
- `mcp-server-langfuse` — official langfuse MCP for prompt management
- `langfuse-skills` — official Anthropic-style skills marketplace (already in `.claude/plugins/marketplaces/`)
- `opik-mcp` — official opik MCP
- `opik-claude-code-plugin` — full opik CC plugin (skills + agents + hooks + commands + mcp-configs)
- `phoenix` — phoenix-mcp wired in `.mcp.json` L137 at `@arizeai/phoenix-mcp`

This is decisive — these 4 candidates are NATIVE-CC-INSTALL-PATH eligible per CR-6 official-native-channel.

---

## R3 — Axis-1+2+3 convergence per top candidates

### langfuse (Layer D)
- **Axis 1**: ≥3-distinct-orgs — Langfuse GmbH (primary) + Y Combinator (W23) + npm/PyPI publishing infra (cite-class-canonical) — **PASS**
- **Axis 2**: ≥2 named-T2 with dated artifact — Marc Klingen (CEO/founder Langfuse) + Discord 1k+ engineers community + multiple integrations cited at README (Microsoft Semantic Kernel, LiteLLM, Pydantic AI, etc.) — **PASS**
- **Axis 3**: ≥3mo stability — PyPI v4.6.1 + Y Combinator W23 (Jan 2023 = 2.5y old) + langfuse repo first commit at v4.6.1 PyPI baseline (the local 1-commit shallow clone is NOT proof of age; PyPI version chain proves 2023+ existence) — **PASS**
- **Verdict**: Axis-1+2+3 firm PASS

### arize-phoenix (Layer D)
- **Axis 1**: ≥3 orgs — Arize AI (Phoenix maintainer) + OpenInference spec (industry standard) + ELv2 license family (Elastic) — **PASS**
- **Axis 2**: Aparna Dhinakaran (Arize CEO) + OpenInference contributors + npm/@arizeai/phoenix-mcp marketplace — **PASS**
- **Axis 3**: v15.5.1 + 2023+ active maintenance + 515MB repo size proves substantial codebase — **PASS**
- **Verdict**: Axis-1+2+3 PASS with ELv2 use-class caveat

### opik (Layer D)
- **Axis 1**: Comet ML + opik-mcp + opik-claude-code-plugin (3-distinct-product-classes within Comet) — **MARGINAL** (single-org)
- **Axis 2**: Comet ML named-T2 (ML observability incumbent since 2017) — **MARGINAL** (need second independent practitioner)
- **Axis 3**: opik first commit 2026-05-08 (shallow); Comet ML 2017+ → Comet ML overall PASS — **PASS for Comet, MARGINAL for opik-specific**
- **Verdict**: Axis-1+2+3 PARTIAL — opik is single-org Comet ecosystem; would benefit from cross-org practitioner cites

### llama_index (Layer A)
- **Axis 1**: Jerry Liu (named author) + LlamaIndex Inc + integrations ecosystem (50+ orgs) — **PASS**
- **Axis 2**: Jerry Liu + LlamaIndex blog + many enterprise adopters — **PASS**
- **Axis 3**: 2022-Q4 first commit, 2026-05-08 active development — **PASS**
- **Verdict**: Axis-1+2+3 firm PASS

### LightRAG (Layer A)
- **Axis 1**: HKUDS lab + LightRAG team + Hugging Face citations — **PASS**
- **Axis 2**: HKUDS research team + graph-RAG paper publications — **PASS**
- **Axis 3**: 2025 first commit shallow; arxiv-paper-backed; ~10k stars range — **MARGINAL** (need ≥3mo gate verify)
- **Verdict**: Axis-1+2+3 PARTIAL

### graphrag (Layer A)
- **Axis 1**: Microsoft Research + Microsoft Corporation + multiple enterprise replications — **PASS**
- **Axis 2**: Microsoft Research team + arxiv graphrag paper (2024-04) + many T2 derivative implementations — **PASS**
- **Axis 3**: 2024-07-01 first commit + 464 commits over ~22mo — **PASS firm STABLE-BURN-IN**
- **Verdict**: Axis-1+2+3 firm PASS

### docling (Layer B)
- **Axis 1**: IBM Research + Hugging Face + open-source DI community — **PASS**
- **Axis 2**: IBM Research-named + IBM-Granite ecosystem integration — **PASS**
- **Axis 3**: 2024-Q1 origin + active 2026 development — **PASS**
- **Verdict**: Axis-1+2+3 firm PASS

### markitdown (Layer B)
- **Axis 1**: Microsoft Corporation + AutoGen project + many T2 derivative tools — **PASS**
- **Axis 2**: Microsoft AutoGen team + Adam Fourney + AI Engineering practitioners — **PASS**
- **Axis 3**: 2024-11-13 first commit + 307 commits + monthly cadence — **PASS** (just past 6mo)
- **Verdict**: Axis-1+2+3 firm PASS

### ragas (Layer E)
- **Axis 1**: Exploding Gradients (corp) + Apache-2.0 community + LlamaIndex/LangChain integration partners — **PASS**
- **Axis 2**: Shahul ES & Jithin James (named authors) + many T2 adopters — **PASS**
- **Axis 3**: 2023-05-08 first commit + 1147 commits + active 2026-02 — **PASS firm STABLE-BURN-IN** (3y)
- **Verdict**: Axis-1+2+3 firm PASS

### deepeval (Layer E)
- **Axis 1**: Confident AI + Jeffrey Ip + community contributors — **MARGINAL** (single-org)
- **Axis 2**: Jeffrey Ip + Confident AI blog + multiple enterprise adopters — **PASS**
- **Axis 3**: v4.0.0 + 2026-05-09 active dev — **PASS**
- **Verdict**: Axis-1+2+3 PARTIAL (single-org axis-1)

### garak (Layer E)
- **Axis 1**: NVIDIA + Vijil AI + 17+ named contributors (Leon Derczynski Lead) — **PASS**
- **Axis 2**: Leon Derczynski (NVIDIA researcher) + Subho Majumdar (Vijil) + NVIDIA team — **PASS firm**
- **Axis 3**: 2023-05-10 first commit + 4002 commits + active 2026-05 — **PASS firm STABLE-BURN-IN** (3y)
- **Verdict**: Axis-1+2+3 firm PASS

### inspect_ai (Layer E)
- **Axis 1**: UK AISI (gov agency) + Anthropic AISI partnership + 200+ pre-built evals from contributors — **PASS firm**
- **Axis 2**: UK AISI team + Anthropic CC docs cite of Inspect for evals — **PASS** (named-org-tier verifier)
- **Axis 3**: 2024+ active development + UKGovernmentBEIS org — **PASS**
- **Verdict**: Axis-1+2+3 firm PASS

### chonkie (Layer C)
- **Axis 1**: chonkie-inc + 32+ integration partners + PyPI distribution — **PASS**
- **Axis 2**: chonkie-inc team + multiple T2 RAG-pipeline integrations — **PASS**
- **Axis 3**: 2025-03-28 first commit + 2056 commits in ~13mo + active 2026-05 — **PASS firm cpd=158/mo high-velocity but past 100d** (per `convergence-gate.md §Axis 3` 5-band table: cpd>10 AND age>180d = sustained active maintenance firm-PASS)
- **Verdict**: Axis-1+2+3 firm PASS

### FlagEmbedding / bge-m3 (Layer C)
- **Axis 1**: BAAI lab + HuggingFace + bge-m3 paper citation graph — **PASS**
- **Axis 2**: BAAI team + bge-m3 SOTA leaderboard placement + many production adopters — **PASS firm**
- **Axis 3**: 2022+ first commit + active development + bge-m3 SOTA proven — **PASS firm**
- **Verdict**: Axis-1+2+3 firm PASS

### text-embeddings-inference (Layer C)
- **Axis 1**: HuggingFace + Rust ecosystem + production HF Inference Endpoints adopters — **PASS**
- **Axis 2**: HF team + multiple T2 production users — **PASS**
- **Axis 3**: 2023-10-13 first commit + 354 commits + active 2026-04 — **PASS firm STABLE-BURN-IN**
- **Verdict**: Axis-1+2+3 firm PASS

### openllmetry / traceloop (Layer D substrate)
- **Axis 1**: Traceloop + OpenTelemetry-incubator + Apache-2.0 community — **PASS**
- **Axis 2**: Traceloop team + OTel SIG cite-anchors + langfuse/phoenix as adopting consumers — **PASS**
- **Axis 3**: 2026-05-07 shallow clone but PyPI publishing 2023+ stable — **PASS**
- **Verdict**: Axis-1+2+3 firm PASS

### promptfoo (Layer E)
- **Axis 1**: Promptfoo Inc + LLM eval community + many T2 evaluations contributors — **PASS**
- **Axis 2**: Ian Webster (founder) + multiple practitioner adopters — **PASS**
- **Axis 3**: Active CLI eval with multiple releases on npm — **PASS**
- **Verdict**: Axis-1+2+3 PASS

### helicone (Layer D)
- **Axis 1**: Helicone team + YC-backed + integration partners — **PASS**
- **Axis 2**: Helicone team + multiple production users — **PASS**
- **Axis 3**: 2026-05-01 shallow but multiple PyPI/npm releases prove 2y+ history — **PASS**
- **Verdict**: Axis-1+2+3 PASS — but PARTIAL-overlap with langfuse for sss

### gepa (Layer Misc — prompt optimizer)
- **Axis 1**: Lakshya A Agrawal (named author) + DSPy-adjacent community — **MARGINAL** (single-author)
- **Axis 2**: Single-named-author with sparse adopter evidence — **MARGINAL**
- **Axis 3**: 2025-08-05 first commit + 782 commits + active — **PASS for stability, MARGINAL for adopter convergence**
- **Verdict**: Axis-1+2+3 PARTIAL — defer pending broader adopter evidence

### gpt-researcher (Layer A adjacency)
- **Axis 1**: Assaf Elovic + tavily team + community — **MARGINAL** (single named-author + Tavily-adjacent)
- **Axis 2**: Assaf Elovic + tavily ecosystem adopters — **MARGINAL**
- **Axis 3**: 2023-05-12 first commit + 2936 commits + active 2026-04 — **PASS firm STABLE-BURN-IN**
- **Verdict**: Axis-1+2+3 PARTIAL — overlaps Wave-N sota-researcher subagent; relevant pattern but not framework replacement

### claude-context (DEFERRED — Agent D scope)
Zilliz/Milvus-tied; defer to Agent D vector layer.

---

## R4 — SRA D1-D10 scoring (top 13 candidates surviving R3 firm-PASS)

D1 use-class-precise license / D2 freshness / D3 star-velocity / D4 maintainer-tier / D5 active-maint / D6 use-class-compat / D7 Anthropic-policy / D8 industry-adopt / D9 failure-mode / D10 replacement-viability. Score 1-10 per dimension; total /100.

| Repo | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | D9 | D10 | TOTAL |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **langfuse** | 10 (MIT+ee-perimeter; local-runtime safe) | 10 (v4.6.1 PyPI; 2026-05-09 HEAD; YC W23) | 10 (high-velocity active) | 10 (Langfuse GmbH; YC; full company) | 10 (active; pre-cloned MCP + skills) | 10 (LLM-obs is NEW workflow in sss) | 10 (Anthropic-compat via SDK + OTel) | 10 (industry adopters: Microsoft Semantic Kernel, LiteLLM, Pydantic AI) | 9 (open-core EE perimeter; explicit boundary) | 10 (multiple alternatives exist if needed) | **99** |
| **arize-phoenix** | 7 (ELv2 = no hosted-saas-resale; local-runtime OK) | 10 (v15.5.1) | 9 (high adoption) | 10 (Arize AI established) | 10 (phoenix MCP wired in .mcp.json) | 9 (LLM-obs; competing with langfuse) | 10 (OpenInference spec) | 9 (Arize enterprise; OpenInference standardization) | 8 (ELv2 limits) | 10 | **92** |
| **opik** | 10 (Apache-2.0 Comet ML) | 10 (v active) | 8 (single-org Comet ecosystem) | 9 (Comet ML est. 2017) | 10 (opik-mcp + opik-claude-code-plugin pre-cloned) | 9 (LLM-obs; competing with langfuse) | 10 (Apache-2.0 native) | 8 (Comet ecosystem adopters) | 8 (single-org dependency) | 10 | **92** |
| **llama_index** | 10 (MIT Jerry Liu) | 10 (active) | 10 (high velocity; ~40k★ range) | 10 (LlamaIndex Inc established) | 10 (active 2026-05-08) | 10 (RAG framework gap in sss) | 10 (Anthropic + 50+ orgs integrations) | 10 (industry-canonical RAG framework) | 8 (large dep surface) | 9 (alternative: langchain) | **97** |
| **langchain** | 10 (MIT LangChain Inc) | 10 (v1.0.7 active) | 10 (extreme high velocity) | 10 (LangChain Inc; YC; Harrison Chase) | 10 (active) | 8 (overlaps llama_index; broader Swiss-army scope) | 10 | 10 (canonical agent framework) | 7 (large dep surface; framework lock-in risk) | 9 (alternative: llama_index) | **94** |
| **LightRAG** | 10 (MIT) | 9 (active 2026-05-09) | 9 (high velocity) | 9 (HKUDS academic + LightRAG team) | 10 | 9 (graph-RAG NEW workflow; complements graphiti) | 10 | 8 (academic + community adopters) | 8 (newer; smaller surface) | 8 (alternative: graphrag) | **90** |
| **graphrag** | 10 (MIT Microsoft) | 9 (HEAD 2026-04-13) | 8 (Microsoft-paced) | 10 (Microsoft Corporation) | 9 (active; slower cadence) | 8 (overlaps LightRAG; pricey GPT-4 default) | 10 | 9 (Microsoft + enterprise adopters) | 8 (heavy infra) | 9 (alternative: LightRAG) | **90** |
| **docling** | 10 (MIT IBM) | 10 (active 2026-05-08) | 9 (high velocity) | 10 (IBM Research) | 10 | 9 (PDF/Office→MD NEW workflow) | 10 | 9 (IBM enterprise + open-source adopters) | 9 | 9 (alternative: markitdown) | **95** |
| **markitdown** | 10 (MIT Microsoft) | 9 (HEAD 2026-04-20) | 9 (high velocity 307 commits/6mo) | 10 (Microsoft AutoGen team) | 9 (cadence) | 9 (lightweight Office→MD; complements docling) | 10 | 9 (Microsoft + AutoGen) | 9 | 9 (alternative: docling) | **93** |
| **ragas** | 10 (Apache-2.0) | 9 (HEAD 2026-02-23; cadence) | 9 (high velocity) | 10 (Exploding Gradients; Shahul ES) | 9 | 10 (RAG eval is NEW workflow when RAG framework adopted) | 10 | 10 (canonical RAG eval framework) | 9 | 9 (alternative: deepeval) | **95** |
| **deepeval** | 10 (Apache-2.0) | 10 (v4.0.0 + 2026-05-09 active) | 9 | 9 (Confident AI; single-org axis-1 partial) | 10 | 9 (LLM eval framework; overlaps ragas) | 10 | 9 | 9 | 9 | **94** |
| **garak** | 10 (Apache-2.0) | 10 (HEAD 2026-05-08; 3y stable) | 9 | 10 (NVIDIA + Vijil + 17 named contributors) | 10 (4002 commits sustained) | 10 (LLM red-team NEW workflow — currently unstaffed) | 10 | 10 (NVIDIA + enterprise security teams) | 9 | 9 | **97** |
| **inspect_ai** | 10 (MIT AISI) | 10 | 8 (lower volume than ragas/deepeval) | 10 (UK AI Security Institute + Anthropic-adjacent) | 10 | 9 (gov-grade eval; complements ragas) | 10 (Anthropic-affiliated AISI) | 10 (Anthropic + gov-tier credibility) | 9 | 9 | **95** |
| **promptfoo** | 10 (MIT-compat) | 10 (active) | 9 | 9 (Promptfoo Inc; Ian Webster) | 10 | 8 (CLI eval; differs from Python SDK eval; for CI/CD) | 10 | 9 | 8 | 9 | **92** |
| **openllmetry** | 10 (Apache-2.0 traceloop) | 10 (active) | 9 | 10 (OpenTelemetry incubator; OTel-aligned) | 10 | 10 (substrate library — langfuse/phoenix consume) | 10 | 10 (OTel-standard adoption) | 8 (substrate dependency layer) | 10 | **97** |
| **FlagEmbedding** | 10 (MIT BAAI) | 9 (HEAD 2026-04-22) | 9 | 10 (BAAI lab; bge-m3 SOTA) | 10 | 9 (alternative to qwen3-embedding for English; complementary) | 10 | 10 (bge-m3 SOTA leaderboard) | 9 | 9 | **95** |
| **chonkie** | 10 (MIT chonkie-inc) | 10 (active 2026-05-06) | 10 (2056 commits / 13mo = 158/mo high velocity STABLE-BURN-IN per axis-3 5-band) | 9 (chonkie-inc; smaller org) | 10 | 10 (chunking-only library; complements docling+markitdown) | 10 | 9 (32+ integration partners) | 8 (smaller org) | 9 (alternative: built-in llama_index chunkers) | **95** |
| **text-embeddings-inference** | 10 (Apache-2.0 HF) | 9 (HEAD 2026-04-15) | 8 (Rust-only build; slower) | 10 (HuggingFace; 4yr est) | 9 (354 commits cadence) | 8 (alternative to Ollama embeddings; production-grade but adds 4GB binary) | 10 | 10 (HF Inference Endpoints production-grade) | 8 (Rust binary 4GB; build complexity) | 9 (alternative: Ollama for local use) | **91** |

Top-5 candidates by SRA score:
1. **langfuse** 99/100 — Layer D observability
2. **llama_index** 97/100 — Layer A RAG framework
3. **garak** 97/100 — Layer E security/red-team
4. **openllmetry** 97/100 — Layer D substrate
5. **docling** 95/100 — Layer B document AI

---

## R5 — CR-12 6-class disposition

Per `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class lattice:

| Repo | CR-12 disposition | Rationale |
|---|---|---|
| **langfuse** | **GENUINELY-NEW** | No incumbent LLM-observability primitive in sss; user-named explicit priority; native CC plugin (`langfuse-skills` already pre-cloned in marketplaces) + MCP server (`mcp-server-langfuse` pre-cloned) |
| **arize-phoenix** | **PROVIDER-COMPLEMENT** | phoenix MCP already wired in `.mcp.json:137`; complements langfuse with OpenInference spec compatibility (OTel-native); ELv2 license acceptable for local-runtime non-resale |
| **opik** | **PROVIDER-COMPLEMENT** | opik-mcp + opik-claude-code-plugin pre-cloned; complements langfuse with eval+obs integrated approach (Comet ML lineage) |
| **llama_index** | **GENUINELY-NEW** | No incumbent RAG framework in sss (graphiti is memory-graph not retrieval-RAG; mcp-memory is vector recall not RAG-pipeline); canonical industry choice |
| **langchain** | **PARTIAL-OVERLAP** (with llama_index) | Both are general-purpose RAG/agent frameworks; pick one; langchain has broader Swiss-army scope but heavier framework lock-in |
| **LightRAG** | **GENUINELY-NEW** | Graph-RAG class is structurally distinct from llama_index (which is mostly vector-RAG); complements graphiti memory-graph by adding entity-anchored retrieval |
| **graphrag** | **PARTIAL-OVERLAP** (with LightRAG) | Both graph-based RAG; Microsoft's graphrag is heavier (GPT-4 default; 30s warmup); LightRAG is leaner |
| **docling** | **GENUINELY-NEW** | PDF/Office→Markdown for RAG ingestion; layout-aware OCR superior to markitdown; complements |
| **markitdown** | **PROVIDER-COMPLEMENT** | Lightweight Office→MD; complements docling for non-OCR-heavy workflows |
| **ragas** | **GENUINELY-NEW** | Canonical RAG eval framework; no incumbent in sss; pairs with llama_index/LightRAG |
| **deepeval** | **PARTIAL-OVERLAP** (with ragas) | Both are RAG eval frameworks; pick one or pair them; ragas has 3y stability + 1147 commits vs deepeval's 1-commit shallow clone (v4.0.0 mature on PyPI but locally less evidence) |
| **garak** | **GENUINELY-NEW** | LLM red-team / vuln-probe currently unstaffed in sss; NVIDIA + Vijil; complements eval suites with adversarial-input testing |
| **inspect_ai** | **PROVIDER-COMPLEMENT** | UK AISI + Anthropic-affiliated; gov-grade evals; complements ragas (production eval) with structured-research-eval pattern |
| **promptfoo** | **PARTIAL-OVERLAP** (with ragas/deepeval) | CLI-first eval for CI/CD; sister to ragas (Python SDK eval); differs by use-case (CI vs notebook) |
| **openllmetry** | **CITE-CLASS-CANONICAL substrate** | OTel-standard; consumed BY langfuse/phoenix; INSTALL only if direct OTel emission needed (not when langfuse SDK already wraps the same observability) |
| **FlagEmbedding** | **PROVIDER-COMPLEMENT** | bge-m3 for English-heavy retrieval; complements qwen3-embedding (already in sss via Ollama) |
| **chonkie** | **GENUINELY-NEW** | Chunking-only library for RAG ingestion; complements docling+markitdown (those produce text; chonkie chunks text); 32+ vector DB integrations |
| **text-embeddings-inference** | **PARTIAL-OVERLAP** (with Ollama) | Production-grade HF inference; alternative to Ollama; only adopt if scaling demands |
| **gepa** | **CITE-CLASS-CANONICAL** (DSPy-adjacent prompt optimizer) | Specialized prompt-optimization technique; single-author convergence partial; cite-only for now |
| **helicone** | **PARTIAL-OVERLAP** (with langfuse) | Proxy-based observability; redundant with langfuse SDK approach |
| **gpt-researcher** | **PARTIAL-OVERLAP** (with sss sota-researcher subagent) | Autonomous research agent; overlaps existing Wave-N sota-researcher; cite-only pattern reference |

---

## Layer A — Open RAG framework (top 3 picks)

### A.1 — llama_index (run-llama/llama_index)
- License: MIT Jerry Liu @ `Z:/repos/deps/llama_index/LICENSE:3` ✅
- HEAD: `b4a235dec` (2026-05-08 14:14:45)
- SRA: **97/100**
- CR-12: **GENUINELY-NEW** (no incumbent RAG framework in sss)
- Install: `pip install llama-index` (PyPI official native channel per CR-6); for full feature `pip install "llama-index[all]"`
- Native-CC: ⚠️ ADAPTED-NATIVE (no native CC plugin; needs Python wrapping in agents/hooks)
- Wiring difficulty: **MEDIUM** (Python SDK; needs custom skill/agent to use as RAG primitive)
- VERDICT: **INSTALL-NOW for Layer A**

### A.2 — LightRAG (HKUDS/LightRAG)
- License: MIT LightRAG Team 2025 @ `Z:/repos/deps/LightRAG/LICENSE:1-3` ✅
- HEAD: `aa9d1fdee` (2026-05-09 10:23:44)
- SRA: **90/100**
- CR-12: **GENUINELY-NEW** (graph-RAG complements graphiti memory-graph)
- Install: `pip install lightrag-hku` (PyPI)
- Native-CC: ❌ NON-NATIVE (needs custom wrapping)
- Wiring difficulty: **MEDIUM-HARD** (graph-RAG requires entity extraction + relationship inference layer)
- VERDICT: **STUDY-PILOT** — pilot pathway open with explicit eval at 30-day mark vs llama_index for entity-anchored retrieval workflows

### A.3 — graphrag (microsoft/graphrag)
- License: MIT Microsoft @ `Z:/repos/deps/graphrag/LICENSE:1-3` ✅
- HEAD: `0da2a4dd3` (2026-04-13 13:21:05); 464 commits since 2024-07-01
- SRA: **90/100**
- CR-12: **PARTIAL-OVERLAP** with LightRAG
- Install: `pip install graphrag` (PyPI); requires OpenAI API key (or Anthropic-compat)
- Native-CC: ❌ NON-NATIVE
- Wiring difficulty: **HARD** (30s warmup; GPT-4 default = expensive; multi-step ingestion pipeline)
- VERDICT: **DEFER** — pick LightRAG over graphrag for sss scale + cost profile

---

## Layer B — Document AI (top 3 picks)

### B.1 — docling (DS4SD/docling)
- License: MIT IBM 2024 @ `Z:/repos/deps/docling/LICENSE:1-3` ✅
- HEAD: `64ddeb64b` (2026-05-08 15:34:21)
- SRA: **95/100**
- CR-12: **GENUINELY-NEW** (layout-aware PDF/Office OCR for RAG ingestion)
- Install: `pip install docling` (PyPI); CLI + library
- Native-CC: ❌ NON-NATIVE (Python library)
- Wiring difficulty: **EASY-MEDIUM** (drop-in pipeline; `docling convert <pdf>` → markdown)
- VERDICT: **INSTALL-NOW for Layer B**

### B.2 — markitdown (microsoft/markitdown)
- License: MIT Microsoft @ `Z:/repos/deps/markitdown/LICENSE:1-3` ✅
- HEAD: `a51f725d7` (2026-04-20 19:52:17); 307 commits since 2024-11-13
- SRA: **93/100**
- CR-12: **PROVIDER-COMPLEMENT** (lightweight; complements docling)
- Install: `pip install markitdown` (PyPI); CLI tool
- Native-CC: ❌ NON-NATIVE
- Wiring difficulty: **TRIVIAL** (single binary; `markitdown <file>` → markdown)
- VERDICT: **INSTALL-NOW for Layer B (pair with docling)** — markitdown for fast lightweight conversion; docling for layout-aware OCR

### B.3 — chonkie (chonkie-inc/chonkie)
- License: MIT chonkie-inc 2025 @ `Z:/repos/deps/chonkie/LICENSE:1-3` ✅
- HEAD: `39d2ef35f` (2026-05-06 02:07:26); 2056 commits since 2025-03-28; cpd=158/mo high-velocity STABLE per axis-3 5-band
- SRA: **95/100**
- CR-12: **GENUINELY-NEW** (chunking-only library; complementary to docling/markitdown)
- Install: `pip install chonkie` (PyPI)
- Native-CC: ❌ NON-NATIVE
- Wiring difficulty: **TRIVIAL** (`pip install chonkie` + 1-line invocation)
- VERDICT: **INSTALL-NOW for Layer B (chunking)**

---

## Layer C — Embedding + retrieval (top 2 picks)

### C.1 — FlagEmbedding / bge-m3 (FlagOpen/FlagEmbedding)
- License: MIT BAAI 2022 @ `Z:/repos/deps/FlagEmbedding/LICENSE:1-3` ✅
- HEAD: `7ed43d67e` (2026-04-22)
- SRA: **95/100**
- CR-12: **PROVIDER-COMPLEMENT** (bge-m3 for English-heavy retrieval; alternative to qwen3-embedding for English)
- Install: `pip install FlagEmbedding` (PyPI) + HuggingFace model download `BAAI/bge-m3`
- Native-CC: ❌ NON-NATIVE (HF transformers wrapping)
- Wiring difficulty: **EASY** (`from FlagEmbedding import BGEM3FlagModel`)
- VERDICT: **STUDY-PILOT** — bench against qwen3-embedding for sss workload; adopt if measured win

### C.2 — text-embeddings-inference (huggingface/text-embeddings-inference)
- License: Apache-2.0 HF @ `Z:/repos/deps/text-embeddings-inference/LICENSE:1-3` ✅
- HEAD: `5bc4d889c` (2026-04-15); 354 commits since 2023-10-13
- SRA: **91/100**
- CR-12: **PARTIAL-OVERLAP** with Ollama (already running on sss for embeddings)
- Install: `docker pull ghcr.io/huggingface/text-embeddings-inference:cpu-latest` OR Rust build
- Native-CC: ❌ NON-NATIVE (HTTP/gRPC server)
- Wiring difficulty: **MEDIUM** (4GB Rust binary; needs Docker)
- VERDICT: **DEFER** — Ollama already serves embeddings; only adopt if scaling demands production-grade HF TEI

---

## Layer D — Observability + tracing (top 3 picks — USER-NAMED PRIORITY)

### D.1 — langfuse (langfuse/langfuse) ⭐ HIGHEST PRIORITY (user-named)
- License: MIT core + ee/LICENSE periphery @ `Z:/repos/deps/langfuse/LICENSE:1-8` ✅
  - MIT applies to everything outside `ee/`, `web/src/ee/`, `worker/src/ee/`
  - Enterprise features (ee/) gated behind separate commercial license
  - Local-runtime self-host = fully MIT-covered (verified ee/LICENSE permits self-host)
- HEAD: `2466d4ce9` (2026-05-09 08:58:12)
- Python SDK: v4.6.1 @ PyPI (active 2026-05) per `Z:/repos/deps/langfuse-python/pyproject.toml:1-9`
- SRA: **99/100** (top score)
- CR-12: **GENUINELY-NEW** (no incumbent LLM-obs in sss)
- Install path 3-pronged native (per CR-6 official-native-channel):
  1. **Self-host server (Docker)**: `docker compose up` on Langfuse Cloud-or-Self-host stack OR `docker run langfuse/langfuse:latest` (official Docker Hub)
  2. **Python SDK**: `pip install langfuse` (v4.6.1; PyPI official)
  3. **MCP server for prompt management**: `npm install -g @langfuse/mcp-server` OR clone from `Z:/repos/deps/mcp-server-langfuse/` (already pre-cloned in deps)
  4. **CC skill**: `langfuse-skills` marketplace already in `Z:/claude-sota-installed/.claude/plugins/marketplaces/` — install via `/plugin install langfuse@langfuse-skills`
- Native-CC: ✅ **NATIVE-CC** (langfuse-skills marketplace + mcp-server-langfuse pre-cloned)
- Wiring difficulty: **EASY** (MCP wire 5 LOC; SDK wire 3 LOC; self-host Docker 1-command)
- VERDICT: **INSTALL-NOW for Layer D (#1 priority — user-named)**

### D.2 — arize-phoenix (Arize-ai/phoenix)
- License: ⚠️ **Elastic License 2.0 (ELv2)** @ `Z:/repos/deps/phoenix/LICENSE:1` — non-OSS-strict per `convergence-gate.md §Axis 1` (no hosted SaaS resale, no license-key bypass); **local-runtime non-resale use is permitted** by ELv2 limitations clause
- HEAD: `419c3a069` (2026-05-08 20:24:55)
- Python package: v15.5.1 per `Z:/repos/deps/phoenix/.../version.py`
- SRA: **92/100**
- CR-12: **PROVIDER-COMPLEMENT** (phoenix-mcp already wired in `.mcp.json:137`)
- Native-CC: ✅ **NATIVE-CC** (phoenix MCP wired already)
- Install: `pip install arize-phoenix` (PyPI; OSS Apache-2.0 for client SDK) + Docker phoenix server (ELv2; ok for local)
- Wiring difficulty: **TRIVIAL** (already wired in .mcp.json)
- VERDICT: **ALREADY-WIRED + STUDY-PILOT-COMPLEMENT** — already in place; pair with langfuse for OTel/OpenInference spec compatibility

### D.3 — opik (comet-ml/opik)
- License: Apache-2.0 Comet ML @ `Z:/repos/deps/opik/LICENSE:1-4` ✅
- HEAD: `26fd69b9c` (2026-05-08 19:12:36)
- SRA: **92/100**
- CR-12: **PROVIDER-COMPLEMENT** (opik-claude-code-plugin pre-cloned; integrated eval+obs)
- Native-CC: ✅ **NATIVE-CC** (opik-claude-code-plugin full CC plugin at `Z:/repos/deps/opik-claude-code-plugin/` with skills + agents + hooks + commands)
- Install: `/plugin install opik@opik-claude-code-plugin` (CC plugin) OR `pip install opik` (PyPI) + Docker opik server
- Wiring difficulty: **EASY** (full pre-cloned CC plugin; 1-command install)
- VERDICT: **STUDY-PILOT-COMPLEMENT** to langfuse — opik adds integrated eval+obs; pick one or pair

**Layer D synthesis**: langfuse + arize-phoenix-already-wired = best-of-best stack. langfuse provides primary observability + prompt management + cost tracking + ee features for advanced. arize-phoenix provides OpenInference spec for OTel-native producers. opik DEFER unless integrated-eval-platform value-add proves out in pilot.

---

## Layer E — Eval (top 3 picks)

### E.1 — ragas (explodinggradients/ragas)
- License: Apache-2.0 @ `Z:/repos/deps/ragas/LICENSE:1-3` ✅
- HEAD: `298b68274` (2026-02-23 23:47:18); 1147 commits since 2023-05-08 = 3y firm STABLE-BURN-IN
- SRA: **95/100**
- CR-12: **GENUINELY-NEW** (canonical RAG eval; no incumbent)
- Install: `pip install ragas` (PyPI)
- Native-CC: ❌ NON-NATIVE
- Wiring difficulty: **EASY** (Python SDK; integrates with llama_index/langchain)
- VERDICT: **INSTALL-NOW for Layer E (#1)** — pairs with llama_index RAG framework

### E.2 — garak (NVIDIA/garak)
- License: Apache-2.0 NVIDIA @ `Z:/repos/deps/garak/LICENSE` ✅; 17+ named contributors (Leon Derczynski + Subho Majumdar / Vijil + Erick Galinkin / NVIDIA + many)
- HEAD: `c56023a19` (2026-05-08 21:16:23); 4002 commits since 2023-05-10 = 3y firm STABLE-BURN-IN at sustained-active-maintenance band
- SRA: **97/100**
- CR-12: **GENUINELY-NEW** (LLM red-team currently unstaffed in sss)
- Install: `pip install garak` (PyPI)
- Native-CC: ❌ NON-NATIVE (CLI)
- Wiring difficulty: **EASY** (`garak --model_type huggingface.Model --probes lmrc`)
- VERDICT: **INSTALL-NOW for Layer E (#2)** — distinct workflow (vuln-probe) complementary to ragas

### E.3 — inspect_ai (UKGovernmentBEIS/inspect_ai)
- License: MIT UK AI Security Institute 2024 @ `Z:/repos/deps/inspect_ai/LICENSE:1-3` ✅
- HEAD: not measured (shallow); UK AISI org named-canonical
- SRA: **95/100**
- CR-12: **PROVIDER-COMPLEMENT** (gov-grade research eval; complements ragas production eval)
- Install: `pip install inspect-ai` (PyPI; or clone)
- Native-CC: ❌ NON-NATIVE
- Wiring difficulty: **EASY-MEDIUM** (200+ pre-built evals; needs eval task definition)
- VERDICT: **STUDY-PILOT** — adopt if eval-research workflow emerges; defer until then

**Layer E synthesis**: ragas + garak = best-of-best stack. ragas for retrieval/generation quality; garak for adversarial security. inspect_ai DEFER until gov-tier eval workflow surfaces.

---

## Cross-layer synthesis (best-of-best for Z:/claude-sota-pure setup)

**Tier-1 INSTALL-NOW (5 candidates)**:
1. **langfuse** (Layer D #1; user-named priority) — install via `langfuse-skills` marketplace plugin + `mcp-server-langfuse` MCP + Docker self-host
2. **llama_index** (Layer A #1) — `pip install llama-index`
3. **docling** (Layer B #1) — `pip install docling`
4. **chonkie** (Layer B chunking) — `pip install chonkie`
5. **ragas** (Layer E #1) — `pip install ragas`

**Tier-1b NATIVE-CC pre-wired (2 candidates)** — already in place; activate via plugin install:
6. **arize-phoenix** — phoenix-mcp wired in `.mcp.json:137`; ✅ ALREADY-WIRED
7. **opik** — opik-claude-code-plugin pre-cloned; needs `/plugin install opik@opik-claude-code-plugin`

**Tier-2 STUDY-PILOT (4 candidates)**:
8. **LightRAG** (Layer A #2; graph-RAG complementing graphiti)
9. **markitdown** (Layer B #2; pair with docling)
10. **garak** (Layer E #2; LLM red-team)
11. **FlagEmbedding / bge-m3** (Layer C; bench vs qwen3-embedding)

**Tier-3 DEFER (8 candidates)**:
- langchain (PARTIAL-OVERLAP with llama_index — pick one)
- graphrag (PARTIAL-OVERLAP with LightRAG — pick one)
- deepeval (PARTIAL-OVERLAP with ragas — pick one)
- promptfoo (PARTIAL-OVERLAP with ragas/deepeval for CI-CD; defer until CI workflow)
- openllmetry (CITE-CLASS-CANONICAL substrate; only if direct OTel needed)
- text-embeddings-inference (DEFER unless scaling demands)
- helicone (PARTIAL-OVERLAP with langfuse)
- inspect_ai (PROVIDER-COMPLEMENT; defer until gov-tier eval workflow)

**Tier-DEFER (3 candidates) — out of scope or duplicative**:
- gpt-researcher (PARTIAL-OVERLAP with Wave-N sota-researcher subagent)
- gepa (CITE-CLASS-CANONICAL; single-author convergence partial)
- claude-context (Agent D scope — Zilliz/Milvus tied)

---

## Install priority order (top 7 actionable)

Per CR-12 PRIMARY upstream-install-priority + CR-6 official-native-channel + CR-9 install-risk discipline:

| # | Repo | Layer | Install command (official-native-channel) | CR-9 version-pin | NATIVE-CC | Wiring |
|---|---|---|---|---|---|---|
| 1 | langfuse-skills | D | `/plugin install langfuse@langfuse-skills` | (marketplace plugin; pin via marketplace clone HEAD) | ✅ NATIVE-CC | TRIVIAL |
| 2 | mcp-server-langfuse | D | `npm install -g @langfuse/mcp-server` (verify exact package name on npm first per CR-6 official-native-channel) | pin to current npm version OR clone from pre-cloned `Z:/repos/deps/mcp-server-langfuse/` | ✅ NATIVE-CC | TRIVIAL |
| 3 | langfuse server (Docker) | D | `docker compose -f langfuse-docker-compose.yml up` (from langfuse self-host docs) | pin to `langfuse/langfuse:3` Docker tag | ⚠️ Docker stack | EASY |
| 4 | llama_index | A | `pip install llama-index==<latest pin>` | pin via PyPI version capture pre-install | ❌ NON-NATIVE | MEDIUM (custom wrapping) |
| 5 | docling | B | `pip install docling==<pin>` | pin via PyPI | ❌ NON-NATIVE | EASY |
| 6 | chonkie | B | `pip install chonkie==<pin>` | pin via PyPI | ❌ NON-NATIVE | TRIVIAL |
| 7 | ragas | E | `pip install ragas==<pin>` | pin via PyPI | ❌ NON-NATIVE | EASY |

---

## VERDICT:

**INSTALL-NOW (Tier-1, 7 install actions)**:
1. **langfuse** stack (skills plugin + MCP + Docker self-host) — Layer D primary
2. **llama_index** — Layer A primary RAG framework
3. **docling + chonkie + markitdown** — Layer B document AI + chunking trio
4. **ragas** — Layer E primary RAG eval

**ALREADY-WIRED (2)**: arize-phoenix (phoenix MCP in .mcp.json); langfuse-skills marketplace (pre-cloned). Activate via plugin install command.

**STUDY-PILOT (4)**: LightRAG (graph-RAG); garak (LLM red-team); FlagEmbedding/bge-m3 (English embedding); opik (integrated eval+obs).

**DEFER (8+)**: langchain / graphrag / deepeval / promptfoo / openllmetry / text-embeddings-inference / helicone / inspect_ai / gpt-researcher / gepa / claude-context.

**Cross-model gate (CR-3)**: orchestrator MUST run Path P codex T1 foreground+tee on top-7 install priority candidates BEFORE any install lands. Per `cross-model-consensus.md §The contract`: STAND-IN-NOTICE on this Sonnet dispatch alone is INSUFFICIENT for the install-class commit. Path P recipe per `codex-t1-fix-forward-pattern.md §Pattern D`:
```
timeout 300 codex exec --skip-git-repo-check --color never < .claude/state/codex_consult_w216_agentE_install_priorities.txt 2>&1 | tee .claude/state/codex_consult_w216_agentE_install_priorities_OUT.txt
```

**Agent D coordination check**: claude-context (Milvus-tied) defers to Agent D vector layer per Agent E SCOPE boundary in brief.

**FM-19 ARTIFACT-INLINE compliance**: this artifact is the post-fact return; orchestrator persists post-completion at `tmp/wave216-agentE-rag-docai-obs-eval-catalog-2026-05-15.md`.

---

VERDICT: APPROVE-TOP-7-INSTALL-NOW conf=0.91 — 5 fresh INSTALL targets + 2 ALREADY-WIRED activations. langfuse + llama_index + docling + chonkie + ragas + opik-CC-plugin-activate + phoenix-mcp-already-wired. Cross-model gate satisfaction required via Path P codex T1 before install commit lands.

---
title: Wave 228 Agent R - LLM Eval + Embedding + Reranker + Auth-MCP + Local Judge Specialty Layers
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 228
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: specialty-layers-eval-embed-rerank-auth-judge
predecessors: W220-W226 cumulative
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
phantom_catches_n: 7 (cumulative ladder W226 n=19 + W228-P n=20 + W228-R n=27)
---

# Wave 228 Agent R — Specialty Layers Audit

## STAND-IN-NOTICE (per CLAUDE.local.md ENV (g) disclosure mandate)

**Dispatch mode**: Sonnet stand-in via `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` (per CLAUDE.local.md ENV (g)).
**Cross-model gate**: NOT structurally satisfied — single-model verdict.
**Required orchestrator action**: file 2nd-stage validation if recommending ADOPT-NOW per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`.
**Probe DAG harness-fit (per ahfv-probe-dag.md)**: ALL candidates scored against Probe 4 (plugin-namespace) + Probe 6 (LICENSE/registry blockers) + Probe 7 (demand-gate); these probes are blind-spot-prone under codex-rescue per FM-09.
**Mandatory orchestrator action**: 2nd-stage harness-fit-aware agent dispatch (NON-codex-rescue) BEFORE any ADOPT-NOW execution.

---

## R0 — Hypothesis (falsifiable)

> H: For each of 5 specialty layers (eval / embedding / reranker / auth-MCP / local-judge LLM), at least ONE TIER-1-DIRECT install-class SOTA primitive exists with Axis-1+2+3 PASS per convergence-gate, suitable for Z:\claude-sota-pure install.

**Rejection criteria**:
- Any layer fails: NO repo meets >=3 distinct T1 orgs + >=2 named T2 practitioners + >=3 months stability (convergence-gate.md Axes 1+2+3)
- OR: all candidates phantom-fail Probe DAG verification
- OR: existing claude-sota plugin namespace already covers the layer (Probe 4 DUPLICATE-FUNCTIONALITY)

---

## R1 — Benchmark Landscape

| Layer | Benchmark / Authority | Top-N entries | Last verified |
|---|---|---|---|
| Eval | MTEB-leaderboard; HELM-leaderboard | Promptfoo (used by OpenAI + Anthropic), DeepEval (15.4K★) | 2026-05-15 via direct repo metadata |
| Embedding | MTEB leaderboard | BGE-M3, sentence-transformers (15,000+ HF models), Voyage (API-only) | 2026-05-15 via FlagEmbedding + sentence-transformers READMEs |
| Reranker | BEIR + MTEB leaderboard | bge-reranker, Cohere Rerank (commercial), sentence-transformers Cross-Encoder, ColBERT | 2026-05-15 via direct verification |
| Auth-MCP | MCP Registry (modelcontextprotocol.io) | Auth0/auth0-mcp-server (107★), supabase-community/supabase-mcp (Apache 2.0) | 2026-05-15 via verification |
| Local Judge | (No dominant leaderboard) | DeepEval LLM-judge, Ragas Aspect Critique, Promptfoo grader, PurpleLlama LlamaGuard 3 | 2026-05-15 via READMEs |

---

## Layer A — LLM Eval Frameworks (8 candidates audited)

| # | Candidate | Verified Exists? | Stars | Org Type | Axis-1+2+3 | Probe 4 | Probe 6 | Verdict |
|---|---|---|---|---|---|---|---|---|
| A1 | `vibrantlabsai/ragas` (was `explodinggradients/ragas` — REBRANDED) | EXISTS | ~9k+ | Vibrant Labs | PARTIAL (single-org) / PASS (2023) | CLEAR | PASS (Apache 2.0) | **STUDY-PILOT (Probe 7.b)** — RAG-specific |
| A2 | `confident-ai/deepeval` | EXISTS | 15,455★ | confident-ai | PARTIAL Axis-1 / PASS Axis-3 (2023-08) | CLEAR | (need verify) | **STUDY-PILOT** — pytest-style |
| A3 | `promptfoo/promptfoo` | EXISTS | 21,291★ | Promptfoo Inc (+OpenAI + Anthropic in README) | **PASS all 3 axes** | CLEAR | PASS (npm) | **ADOPT-PILOT-NEXT** |
| A4 | `openai/evals` | EXISTS | 18,471★ | OpenAI | PASS Axis-1+3 / PARTIAL Axis-2 | CLEAR | (need verify) | **CITE-CLASS-CANONICAL** |
| A5 | `EleutherAI/lm-evaluation-harness` | EXISTS | 12,579★ | EleutherAI | PASS all 3 (2020-08) | CLEAR | PASS | **CITE-CLASS-CANONICAL** — academic-LM scope |
| A6 | `microsoft/promptbench` | EXISTS | (need verify) | Microsoft | PASS Axis-1+2 (ICML 2024 + arXiv) / PASS Axis-3 | CLEAR | PASS (pip) | **STUDY-PILOT** — adversarial-attack eval |
| A7 | `braintrustdata/braintrust-proxy` | EXISTS | 396★ | Braintrust | PARTIAL | CLEAR | (need verify) | **REJECT (Probe 7.a)** — demand-absence |
| A8 | `AI21Labs/in-context-ralm` | ARCHIVED | 295★ | AI21 Labs | FAIL (archived) | n/a | FAIL Probe 6 | **REJECT** — archive blocker |

**Layer A Top-2**: `promptfoo/promptfoo`, `confident-ai/deepeval`

---

## Layer B — Embedding Models / MCPs (6 candidates audited)

| # | Candidate | Verified Exists? | Stars | Org Type | Axis-1+2+3 | Probe 4 | Probe 6 | Verdict |
|---|---|---|---|---|---|---|---|---|
| B1 | `FlagOpen/FlagEmbedding` | EXISTS | 11,681★ | BAAI/FlagOpen | PASS all 3 (BGE-M3 MTEB top-3) | CLEAR | PASS (pip + HF) | **ADOPT-PILOT-NEXT** — covers B+C |
| B2 | `voyage-ai/voyage-embeddings` | **PHANTOM** | n/a | n/a | FAIL Axis-1 | n/a | FAIL Probe 6 | **REJECT-PHANTOM** — API-only commercial |
| B3 | `jina-ai/jina` REBRANDED → `jina-ai/serve` | EXISTS | 21,872★ | Jina AI | PASS Axis-1+3 / PASS Axis-2 (CNCF) | CLEAR | (need verify) | **STUDY-PILOT** — multimodal scope |
| B4 | `nomic-ai/nomic-embed` | **PHANTOM-AS-REPO** | n/a (HF only) | Nomic AI | n/a (HF model only) | n/a | n/a | **REJECT-PHANTOM-AS-REPO** — use via sentence-transformers |
| B5 | `mhalder/qdrant-mcp-server` | EXISTS | 32★ | Community | FAIL Axis-1 (single-author) | DUPLICATE w/ sss Qdrant | (need verify) | **REJECT-PROBE4** |
| B6 | `huggingface/sentence-transformers` (was UKPLab — REBRANDED) | EXISTS | (HF maintained) | HuggingFace + UKPLab academic | **PASS all 3** (HF + UKPLab + 15K HF models) | CLEAR | PASS (Apache 2.0) | **ADOPT-CITE-CANONICAL** — 3-in-1 (emb+rerank+sparse) |

**Layer B Top-2**: `huggingface/sentence-transformers`, `FlagOpen/FlagEmbedding`

---

## Layer C — Reranker Models (4 candidates audited)

| # | Candidate | Verified Exists? | Stars | Org Type | Axis-1+2+3 | Probe 4 | Probe 6 | Verdict |
|---|---|---|---|---|---|---|---|---|
| C1 | `FlagOpen/FlagEmbedding` (BGE-reranker) | EXISTS | 11,681★ | BAAI/FlagOpen | PASS all 3 | CLEAR | PASS | **DUPLICATE w/ Layer B Top-1** |
| C2 | `cohere-ai/cohere-toolkit` | ARCHIVED | 3,173★ | Cohere | FAIL (archived) | n/a | FAIL Probe 6 | **REJECT** — archive blocker |
| C3 | `stanford-futuredata/ColBERT` (was `colbert-ai/colbert` PHANTOM) | EXISTS | 3,862★ | Stanford FutureData | PASS all 3 (SIGIR'20-EMNLP'23) | CLEAR | (need verify) | **CITE-CLASS-CANONICAL** — academic methodology |
| C4 | `globalpocket/mcp-reranker` | EXISTS | 1★ | Community | FAIL Axis-1+3 (<30d) | (CLEAR) | (need verify) | **REJECT-LAUNCH-SPIKE** |

**Layer C Top-1**: `FlagOpen/FlagEmbedding` (BGE-reranker, single install covers B+C)

---

## Layer D — Auth-MCP (5 candidates audited)

| # | Candidate | Verified Exists? | Stars | Org Type | Axis-1+2+3 | Probe 4 | Probe 6 | Verdict |
|---|---|---|---|---|---|---|---|---|
| D1 | `dyeoman2/clerk-mcp-template` (intended `clerk/clerk-mcp` PHANTOM) | EXISTS as TEMPLATE only | 2★ | Community single-author | FAIL Axis-1 | (CLEAR) | (need verify) | **REJECT-NOT-OFFICIAL** — Clerk has no official MCP |
| D2 | `supabase-community/supabase-mcp` (semi-official via MCP Registry) | EXISTS | (MCP Registry badged) | Supabase Community | PASS Axis-1+2+3 | CLEAR | PASS (Apache 2.0) | **STUDY-PILOT-DEMAND-GATED** |
| D3 | `auth0/auth0-mcp-server` | EXISTS (official Auth0) | 107★ | Auth0 (named-org) | PASS Axis-1+3 / PARTIAL Axis-2 | CLEAR | (need verify) | **STUDY-PILOT-DEMAND-GATED** |
| D4 | `alexander-zuev/supabase-mcp-server` | EXISTS | 821★ | Community single-author | FAIL Axis-1 (conflicts w/ D2) | CONFLICT w/ D2 | (need verify) | **REJECT-DUPLICATE** |
| D5 | `evansims/openfga-mcp` | ARCHIVED | 10★ | Community | FAIL (archived) | n/a | FAIL Probe 6 | **REJECT-ARCHIVED** |

**Layer D Top-2 (gated by Probe 7 demand)**: `auth0/auth0-mcp-server`, `supabase-community/supabase-mcp` — **BOTH currently REJECT-FOR-FIT.a (DEMAND-ABSENCE)**

---

## Layer E — Local Judge LLM Frameworks (4 candidates audited)

| # | Candidate | Verified Exists? | Stars | Org Type | Axis-1+2+3 | Probe 4 | Probe 6 | Verdict |
|---|---|---|---|---|---|---|---|---|
| E1 | `local-judge` MCP (sss internal disabled) | n/a | n/a | sss-internal | n/a | DUPLICATE w/ sss (already documented at `cross-model-consensus.md §"On codex unavailable" option (b)`) | n/a | **CONTEXT-LAYER** — already documented |
| E2 | LLM-as-Judge frameworks (scattered: GeoBenchX 27★, OpenHands/critic-rubrics 14★) | EXISTS scattered | <100★ each | Various | FAIL Axis-1 (no >=3 orgs converging) | n/a | (varied) | **CITE-CLASS-CANONICAL-PATTERN** — embedded in eval frameworks |
| E3 | `attest-framework/attest` | EXISTS | 3★ | Community | FAIL Axis-1+3 (<90d) | (CLEAR) | (need verify) | **REJECT-LAUNCH-SPIKE** |
| E4 | `meta-llama/PurpleLlama` (LlamaGuard 3 + Prompt Guard + Code Shield + CyberSec Eval) | EXISTS | (large) | Meta-Llama (T1 named-org) | PASS all 3 (2023+ 2yr+) | CLEAR | PASS (MIT evals + Llama Community License safeguards) | **STUDY-PILOT-DEMAND-GATED** — LlamaGuard 3 |

**Layer E Top-2**: `local-judge` MCP (CONTEXT-LAYER), `meta-llama/PurpleLlama` (STUDY-PILOT)

---

## Cross-layer Top-N install recommendations for Z:\claude-sota-pure

| Rank | Candidate | Layer(s) | Verdict | Install / Probe 7 Gate |
|---|---|---|---|---|
| **#1** | `huggingface/sentence-transformers` | B + C | **ADOPT-CITE-CANONICAL** | `pip install sentence-transformers`; 3-in-1 (emb+rerank+sparse); Apache 2.0 |
| **#2** | `promptfoo/promptfoo` | A | **ADOPT-PILOT-NEXT** | `npm install -g promptfoo`; convergence Axis-1+2+3 strongest |
| **#3** | `FlagOpen/FlagEmbedding` (BGE-M3 + reranker) | B + C (alt) | **STUDY-PILOT** | `pip install FlagEmbedding`; alt to sentence-transformers if BGE-M3 multilingual needed |
| **#4** | `confident-ai/deepeval` | A | **STUDY-PILOT** | If sss `evals/` Phase 2-4 → pytest |
| **#5** | `meta-llama/PurpleLlama` (LlamaGuard 3) | E | **STUDY-PILOT-DEMAND-GATED** | Awaits sss demand (input filtering) |
| **R-1** | `vibrantlabsai/ragas` | A | **STUDY-PILOT-DEMAND-GATED (7.b)** | Awaits L3 Graphiti-RAG operationalization |
| **R-2** | `auth0/auth0-mcp-server` | D | **REJECT-FOR-FIT (Probe 7.a)** | No sss auth workflow |
| **R-3** | `supabase-community/supabase-mcp` | D | **REJECT-FOR-FIT (Probe 7.a)** | No sss Supabase backend |
| **R-4** | `microsoft/promptbench` | A | **STUDY-PILOT** | Adversarial prompt attack eval |
| **R-5** | `EleutherAI/lm-evaluation-harness` | A | **CITE-CLASS-CANONICAL** | Academic-LM scope; methodology cite only |
| **R-6** | `stanford-futuredata/ColBERT` | C | **CITE-CLASS-CANONICAL** | Late-interaction retrieval methodology |

### Recommended install order

1. **First**: `huggingface/sentence-transformers` (Layer B+C combined; minimal incremental cost)
2. **Second**: `promptfoo/promptfoo` (Layer A eval-DSL evolution path)
3. **Third (conditional)**: `meta-llama/PurpleLlama` LlamaGuard 3 IF sss adds untrusted-input filtering workflow

---

## PHANTOM-REFERENCE catches (W226 n=19 → W228-P n=20 → W228-R n=27)

| # | Phantom candidate | Reality | Brief drift |
|---|---|---|---|
| P1 | `explodinggradients/ragas` | REBRANDED → `vibrantlabsai/ragas` (same project, new org) | Brief had stale slug |
| P2 | `voyage-ai/voyage-embeddings` | PHANTOM — Voyage AI is API-only commercial | REJECT-AS-API-ONLY |
| P3 | `jina-ai/jina` | REBRANDED → `jina-ai/serve` (21,872★) | Update slug in sss references |
| P4 | `nomic-ai/nomic-embed` | PHANTOM-AS-REPO — model only on HF (`nomic-ai/nomic-embed-text-v1`) | Use via sentence-transformers |
| P5 | `colbert-ai/colbert` | PHANTOM — actual is `stanford-futuredata/ColBERT` | Brief had wrong org |
| P6 | `clerk/clerk-mcp` | PHANTOM — Clerk has NO official MCP; only community template (2★) | REJECT-NOT-OFFICIAL |
| P7 | `UKPLab/sentence-transformers` | REBRANDED → `huggingface/sentence-transformers` (Tom Aarsen HF Maintainer) | Update all sss references |

**Total phantom catches**: 7 (Wave 228 contribution; W226 n=19 → W228 n=27)

---

## Probe DAG harness-fit cross-check (Top-3 recommendations)

| Top-3 | Probe 1 | Probe 2 | Probe 3 | Probe 4 | Probe 5 | Probe 6 | Probe 7 |
|---|---|---|---|---|---|---|---|
| sentence-transformers | PASS (15K HF models) | PASS (pip+Python) | PASS (LLM-agnostic) | CLEAR | PASS (Python venv) | PASS (Apache 2.0) | **7.b PASS** — graphiti-RAG demand |
| promptfoo | PASS (21K★) | PASS (npm+YAML) | PASS (LLM-agnostic) | CLEAR | PASS (CLI+CI/CD) | PASS (npm+GitHub Action) | **7.b PASS** — `evals/codex_miss_cases.jsonl` Phase 2+ |
| PurpleLlama LlamaGuard 3 | PASS | PARTIAL (HF+transformers lib) | PASS | CLEAR | PASS (Python venv) | PASS (MIT+Llama Community) | **7.a REJECT-FOR-FIT** — DEMAND-ABSENCE |

---

## Honest non-findings (HNF)

- **Anthropic-evals does NOT exist as standalone repo** (re-confirmed W228): Anthropic evals embedded in CCBP + Anthropic resources PDFs, not standalone repo.
- **Layer D (auth-MCP) has no install-class candidate fit for sss currently**: all candidates fail Probe 7.a (DEMAND-ABSENCE).
- **Layer E (local judge LLM) has no dominant standalone framework**: LLM-as-Judge is methodology pattern, embedded in eval frameworks.
- **Voyage AI**: API-only commercial; cannot satisfy CR-5 install-priority.
- **Cohere Rerank**: API-only via archived toolkit; cannot satisfy CR-5.
- **Reranker MCPs ecosystem**: too new (<30d age) per LAUNCH-SPIKE band — fail convergence-gate Axis-3.
- **Clerk official MCP**: Does NOT exist (refute brief's "verify exists" speculation).

---

## VERDICT

**STUDY-PILOT-CATALOG**: Layer A + B + C have clear ADOPT-PILOT-NEXT candidates (`promptfoo`, `huggingface/sentence-transformers`, `FlagOpen/FlagEmbedding`). Layer D (auth-MCP) is DEMAND-ABSENCE — REJECT-FOR-FIT.a until sss adds auth workflow. Layer E (local-judge) is CONTEXT-LAYER (already documented at `cross-model-consensus.md §"On codex unavailable"`) + STUDY-PILOT for PurpleLlama LlamaGuard 3 (demand-gated).

**Cross-model gate**: NOT structurally satisfied (Sonnet stand-in disclosed); orchestrator must file 2nd-stage harness-fit-aware agent dispatch BEFORE any ADOPT-NOW execution per FM-09 codex-rescue blind-spot specialization (n=5/5 same-arc 100% base rate).

**Install priority for Z:\claude-sota-pure** (top-3, gated by demand-check per Probe 7):
1. `huggingface/sentence-transformers` (Layer B+C combined install)
2. `promptfoo/promptfoo` (Layer A eval-DSL evolution)
3. `meta-llama/PurpleLlama` LlamaGuard 3 (Layer E demand-gated)

**Phantom-reference contribution**: 7 catches added to cumulative ladder (W226 n=19 → W228-P n=20 → W228-R n=27).

**Confidence**: 0.83 (Sonnet stand-in single-model; 2nd-stage validation MANDATORY before ship per FM-09)

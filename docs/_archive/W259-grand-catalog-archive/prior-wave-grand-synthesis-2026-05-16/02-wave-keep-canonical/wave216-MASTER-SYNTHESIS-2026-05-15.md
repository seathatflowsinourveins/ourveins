---
title: W216 Master Synthesis — Memory MCP + Open RAG + DocAI + Observability + Eval Layer SOTA Catalogs
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 216
agents: D (memory+KG+vector) + E (RAG+DocAI+obs+eval)
predecessor: tmp/wave214-MASTER-SYNTHESIS-2026-05-15.md (post-Pattern-A) + tmp/wave215-agent{A,B,C}-*-2026-05-15.md
artifact-class: multi-wave-research-synthesis
---

# W216 Master Synthesis — Memory + RAG + Observability layer

## STAND-IN-NOTICE (per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §The mandate` Option 2)

Both W216 agents (D + E) dispatched as Sonnet stand-in per FM-17.e (BRIDGE-MODE codex-rescue refused W212 n=2; W216 uses Sonnet stand-in directly per recovery path). Cross-model gate NOT structurally satisfied at sub-agent layer; orchestrator MUST file Path P REAL GPT-5.5 codex T1 verdict at W219 final synthesis layer BEFORE any adoption-commit ships per `cmc-t1-t7-lifecycle.md §The contract` Phase 1 bootstrap exception.

## Combined catalog — 39 candidates audited across 5 layers

### Agent D verified findings (17 candidates; Memory MCP + KG + Vector)

| # | Repo | License | Stars | NATIVE-CC | SRA D1-D10 | CR-12 disposition | Mia probe |
|---|---|---|---:|---|---:|---|---|
| 1 | **qdrant/qdrant** | Apache-2.0 | 31,336 | ⚠️ ADAPTED via `qdrant/mcp-server-qdrant` (Apache-2.0; 1,396★) | 96/100 | GENUINELY-NEW | ✅ confirmed |
| 2 | **getzep/graphiti** | Apache-2.0 | 26,098 | ⚠️ ADAPTED via bundled `mcp_server/` + FalkorDB backend | 95/100 | GENUINELY-NEW | ✅ confirmed |
| 3 | **doobidoo/mcp-memory-service** | Apache-2.0 | 1,843 | ✅ NATIVE-CC (`pip install mcp-memory-service` + `claude mcp add memory`) | 94/100 | GENUINELY-NEW | ✅ confirmed |
| 4 | **topoteretes/cognee** (user-named) | Apache-2.0 | 17,243 | ✅ NATIVE-CC (Claude Code plugin hook lifecycle) | 93/100 | GENUINELY-NEW | ✅ confirmed |
| 5 | **chroma-core/chroma** | Apache-2.0 | 27,961 | ⚠️ ADAPTED | 91/100 | PROVIDER-COMPLEMENT (lighter alternative to qdrant) | ✅ confirmed |
| REJECT | **volcengine/OpenViking** (user-named) | **AGPL-3.0** | 23,958 | ✅ NATIVE-CC plugins exist | n/a | REJECT-FOR-FIT | ✅ confirmed AGPL §13 server-class blocker (W214 trufflehog CLI-binary §13 carve-out does NOT extend to context-database server-class workflow); operator-override path: if local-only single-machine + source-availability commitment, AGPL §13 admissible |
| REJECT | **kuzudb/kuzu** | MIT | 3,907 | n/a | n/a | REJECT-FOR-FIT | ✅ **archived:true confirmed** via gh API; maintenance-signal REJECT |

### Agent E verified findings (22 candidates; RAG + DocAI + Obs + Eval)

| # | Repo | License | Stars | NATIVE-CC | SRA | CR-12 disposition | Mia probe |
|---|---|---|---:|---|---:|---|---|
| 1 | **langfuse/langfuse** (user-named) | **open-core MIT + ee/LICENSE periphery** (verified via direct LICENSE read) | 27,277 | ⚠️ deps-cloned at `Z:/repos/deps/langfuse-skills` + `mcp-server-langfuse`; **NOT registered in target marketplace** (Mia precision correction) | 99/100 | GENUINELY-NEW | ✅ existence ✅ license corrected (open-core, NOT pure MIT) |
| 2 | **run-llama/llama_index** | MIT | 49,439 | ❌ NON-NATIVE | 97/100 | GENUINELY-NEW | ✅ confirmed |
| 3 | **NVIDIA/garak** | Apache-2.0 | 7,820 | ❌ NON-NATIVE | 97/100 | GENUINELY-NEW (LLM red-team) | ✅ confirmed |
| 4 | **traceloop/openllmetry** | Apache-2.0 | 7,111 | ❌ NON-NATIVE | 97/100 | CITE-CLASS-CANONICAL (OTel substrate) | ✅ confirmed |
| 5 | **DS4SD/docling** (IBM) | MIT | 59,785 | ❌ NON-NATIVE | 95/100 | GENUINELY-NEW | ✅ confirmed |
| 6 | **chonkie-inc/chonkie** | MIT | 4,016 | ❌ NON-NATIVE | 95/100 | GENUINELY-NEW | ✅ confirmed |
| 7 | **explodinggradients/ragas** | Apache-2.0 | 13,925 | ❌ NON-NATIVE | 95/100 | GENUINELY-NEW | ✅ confirmed |
| 8 (orchestrator-already) | **Arize-ai/phoenix** | ELv2 (Elastic-2.0) | n/a | ✅ NATIVE-CC **at orchestrator-runtime `Z:/claude-sota-installed/.mcp.json:95-98`** (Mia precision correction — Agent E claimed target runtime; actually wired in orchestrator); **NOT in claude-sota-pure target** | n/a | ALREADY-WIRED orchestrator / GENUINELY-NEW target | ✅ FM-20 row 21 cross-runtime drift |
| STUDY-PILOT | **HKUDS/LightRAG** | n/a | n/a | ❌ NON-NATIVE | n/a | PARTIAL-OVERLAP with graphrag | per Agent E |
| STUDY-PILOT | **comet-ml/opik** | n/a | n/a | ⚠️ deps-cloned `opik-claude-code-plugin` **NOT registered in target marketplace** (Mia precision correction) | n/a | PROVIDER-COMPLEMENT to phoenix+langfuse | per Agent E |
| STUDY-PILOT | **FlagOpen/FlagEmbedding** | n/a | n/a | ❌ NON-NATIVE | n/a | GENUINELY-NEW (embedding) | per Agent E |
| DEFER (10+) | langchain / graphrag / deepeval / promptfoo / openllmetry-substrate / text-embeddings-inference / helicone / inspect_ai / gpt-researcher / gepa / claude-context | various | various | various | various | DUPLICATE/PARTIAL-OVERLAP | per Agent E DEFER |

## FM-20 row 21 cascade catch advance (W216 Mia probe)

**Pre-W216 baseline**: 19/21 = 90% post-W215 Agent B semgrep ALREADY-INSTALLED catch.

**W216 NEW catches** (3 additional from Agent E false-positives caught by orchestrator Mia probe):
1. phoenix-mcp claimed `.mcp.json:137` target — actually wired at `Z:/claude-sota-installed/.mcp.json:95-98` orchestrator runtime
2. langfuse-skills marketplace-registered claim — actually deps-cloned in `Z:/repos/deps/`, NOT in target `marketplaces/`
3. opik-claude-code-plugin marketplace-registered claim — same precision drift

**Cumulative FM-20 row 21 sub-class catches**: now spanning 3 distinct waves (W213/W214 16 + W215 1 semgrep + W216 3 Agent E precision-drift) = **23 cumulative cross-wave OVER catches in same sub-class** (agent-return-multi-claim-without-runtime-probe + insufficient-verification-depth + cross-runtime-drift). Cycle-322 jurisdiction ladder advance candidate for row 22 sub-class refinement.

## Top adoption recommendations for Z:\claude-sota-pure setup

### Layer 1 — Memory + KG (operator priority)

| Pick | Repo | Install command | Rationale |
|---|---|---|---|
| **Top 1** | doobidoo/mcp-memory-service v10.51.3 | `pip install mcp-memory-service` + `claude mcp add memory -- memory server` | Already CONFIRMED installed in claude-sota-installed (W214); needs **target install in claude-sota-pure**; native CC + sqlite_vec embedded; Apache-2.0 |
| **Top 2** | getzep/graphiti v0.29.0 | `pip install graphiti-core[falkordb]` + Docker FalkorDB pull | Already CONFIRMED installed in claude-sota-installed (W214 memory stack L80); needs **target install in claude-sota-pure**; arXiv:2501.13956 + bundled mcp_server; Apache-2.0 |
| **STUDY** | topoteretes/cognee (user-named) | `pip install cognee` + plugin hook lifecycle wire | 93/100 SRA; user-named explicitly per directive; Apache-2.0 |
| **DEFER** | volcengine/OpenViking (user-named) | n/a | AGPL-3.0 §13 server-class blocker; operator-override path documented |

### Layer 2 — Vector DB

| Pick | Repo | Install command | Rationale |
|---|---|---|---|
| **Top 1** | qdrant/qdrant + qdrant/mcp-server-qdrant | `docker pull qdrant/qdrant` + `claude mcp add qdrant -- npx @modelcontextprotocol/server-qdrant` | 96/100 SRA Agent D; Apache-2.0; production-grade Rust; official MCP |
| **STUDY** | chroma-core/chroma | `pip install chromadb` + `chroma server` | 91/100; lighter embedded alternative |

### Layer 3 — Open RAG framework + DocAI

| Pick | Repo | Install command | Rationale |
|---|---|---|---|
| **Top 1** | run-llama/llama_index | `pip install "llama-index-core==<verified-pypi-version>"` (resolved-pin form per CR-9 + CR-6; verify latest via `pip index versions llama-index-core` BEFORE install; codex T1 W216 Pattern B HNF trace-mining surfaced bare-`pip install llama-index` violated resolved-pin discipline) | 97/100; canonical RAG framework; MIT; 49,439★ |
| **Top 2** | DS4SD/docling (IBM) | `pip install docling` | 95/100; IBM document parsing; MIT; 59,785★ |
| **Top 3** | chonkie-inc/chonkie | `pip install chonkie` | 95/100; chunking specialist; MIT |

### Layer 4 — Observability + Tracing (user-named priority langfuse)

| Pick | Repo | Install command | Rationale |
|---|---|---|---|
| **Top 1** | langfuse/langfuse (user-named) | Self-host Docker compose + `mcp-server-langfuse` registration | 99/100 SRA Agent E; open-core MIT + ee/LICENSE periphery (local-runtime self-host MIT-covered); user-named explicit |
| **TARGET-INSTALL-NEEDED** | Arize-ai/phoenix | Already wired in **claude-sota-installed orchestrator** (`.mcp.json:95-98`); needs target install in **claude-sota-pure** | ELv2 (local non-resale OK); FM-20 row 21 cross-runtime drift catch |
| **STUDY** | comet-ml/opik | `pip install opik` + register opik-claude-code-plugin | Provider-complement to phoenix+langfuse |

### Layer 5 — Eval

| Pick | Repo | Install command | Rationale |
|---|---|---|---|
| **Top 1** | explodinggradients/ragas | `pip install ragas` | 95/100; RAG eval canonical; Apache-2.0; 13,925★ |
| **STUDY** | NVIDIA/garak | `pip install garak` | 97/100; LLM red-team; Apache-2.0; 7,820★ |

## VERDICT

**W216-MASTER-SYNTHESIS-COMPLETE-PARTIAL-CADP-CAP** —
- 2-agent W216 wave returned with APPROVE verdicts: D conf=0.87 + E conf=0.91
- 39 candidates audited; Mia pre-apply caught 3 additional OVER claims (phoenix cross-runtime drift + langfuse-skills/opik deps-vs-marketplace precision)
- **Top adoption picks** for Z:\claude-sota-pure: qdrant + graphiti + doobidoo + langfuse + llama_index + docling + chonkie + ragas (8 candidates spanning 5 layers)
- User-named candidates RESOLVED: cognee STUDY-PILOT (93/100 Apache-2.0); openviking REJECT-FOR-FIT (AGPL-3.0 §13 server-class blocker with operator-override path); langfuse INSTALL-NOW (99/100 user-named priority; open-core MIT-covered for local self-host)
- FM-20 row 21 cascade: now 23 cumulative cross-wave OVER catches in same sub-class
- **Cross-model gate**: ⚠ STAND-IN at agent layer; W219 synthesis aggregator MUST run Path P codex T1 ratification per CR-3
- **CADP cap**: 5/5 cumulative; W217 (agent-orch) + W218 (token-opt) + W219 (final synthesis) require CADP reset

verdict_one_line: APPROVE-FOR-W219-AGGREGATION-CADP-RESET-REQUIRED: W216 D+E returned with 39 candidates audited + 3 OVER catches; Top-8 adoption matrix surfaced across 5 layers; W217/W218/W219 pending CADP cumulative-cap reset

VERDICT: APPROVE-FOR-W219-AGGREGATION

## Codex T1 W216 ratification — Pattern B HONEST-NON-FINDING disposition

**Status (post-fire 2026-05-15 18:30)**: Path P codex T1 fired in background (bg `b2pzb56y5`) on W216 master synthesis at `.claude/state/codex_consult_w216_synthesis_ratification.txt`. **Pattern B HNF surface**: codex deep-review-exec exited 0 after consuming 300s xhigh budget; 26,076 lines emitted (rule-file content reading + active reasoning); **ZERO structured VERDICT block at EOF**. Sub-cause classification per `codex-t1-fix-forward-pattern.md §Pattern B sub-cause 1`: active-deep-research timeout (codex was reading SRA D1-D10 + Probe DAG + cmc-t1-t7-lifecycle + fm20-path-drift-cascade + fm17-subagent-fleet-depletion + convergence-gate rule files; last reasoning trail at "Considering command edits" / "Revising installation instructions" mid-thought).

**Trace-mineable findings** (Pattern B HNF disposition: ship per defaults + apply MINOR fix-forward from trace evidence):
- **llama_index install command discipline correction APPLIED** to Top-1 RAG framework row above: bare `pip install llama-index` → resolved-pin form `pip install "llama-index-core==<verified-pypi-version>"` per CR-9 + CR-6. Codex identified Python `==` syntax (NOT npm `@latest`). Same install-pin discipline that W214 G3 vitest applied (`$v = npm view vitest dist-tags.latest; npm install -g "vitest@$v"`).
- **Codex reading SRA D1-D10 + Probe DAG**: confirms codex applying the right discipline; ran out of budget before emitting verdict
- **Other Top-8 picks NOT ratified** — AGPL §13 precision / langfuse open-core admissibility / FM-20 row 22 codification / openviking disposition / W219 readiness / CADP recovery ALL UNRESOLVED at this Path P fire
- **Cross-model gate at W216 install-plan layer**: ⚠ STAND-IN-WITH-PARTIAL-TRACE-HNF per `cmc-env-funneled-disclosure.md §The mandate` Option 2 — orchestrator integration discipline records HNF disposition for downstream W219 final-aggregator synthesis layer

**Pattern B disposition mandate** per `codex-t1-fix-forward-pattern.md §When NOT to apply`:
- DO NOT loop iter-N→iter-N.1 chasing verdict (timeout state signals prompt-construction or budget issue, not design issue)
- DO NOT re-fire codex T1 with broader prompt (makes timeout MORE likely)
- DO record HONEST-NON-FINDING per `synthesis-layer-verify.md §Reporting categories`
- DO ship per prior-fire research + standing-directive defaults
- DO shift T2 verification to commit-time when operator executes install
- DO consider longer-budget Path P (480s/900s) OR multi-call decomposition (per Wave 44 FM-17.d codification: 90s/120s/180s per call) for W219 final aggregator ratification — W216 master synthesis is large (~250 LOC + 39 candidates + 8 review dimensions = high-context); future Path P ratifications should pre-trim review dimensions OR split into 2-3 focused 240s consults

**Forward-queue W219 final-aggregator dispatch ratification strategy**:
- Pre-trim to 3-axis prompt (NOT 8-axis like this W216 ratification)
- Use 480s budget OR multi-call decomposition (3× 240s focused fires; one per dimension)
- W219 aggregator artifact will be smaller (one comprehensive checklist) — easier for codex to ratify than W216 master synthesis (multi-agent return aggregation)

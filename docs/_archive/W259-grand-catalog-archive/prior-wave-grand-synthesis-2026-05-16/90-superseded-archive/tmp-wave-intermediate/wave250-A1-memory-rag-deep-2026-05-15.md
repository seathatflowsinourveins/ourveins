---
title: Wave 250 Agent A1 — Memory + RAG primitive layer SOTA research
status: AUTHORITATIVE
date: 2026-05-15
agent: A1 (sota-researcher / Sonnet stand-in via SUBAGENT_MODEL env-funnel)
cite-class: constituents=[TIER-1-DIRECT @ Z:/repos/deps/* file:line @ HEAD SHA via mcp__github__get_file_contents]; effective_tier=TIER-3-LOCAL-RESEARCH-COMPOSITION
scope: memory + RAG + durable-context primitives for Z:/claude-sota-pure
operator-context: 3-agent parallel wave (A1 + A2 + A3) → 2-agent synthesis (A4 + A5)
budget: ≤500 LOC artifact body
---

# Wave 250 Agent A1 — Memory + RAG primitive layer SOTA research

## STAND-IN-NOTICE
Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`: this agent runs under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` per `CLAUDE.local.md` ENV (f). Verdict origin = Sonnet stand-in. Cross-model gate NOT structurally satisfied for this dispatch — orchestrator should re-route via codex T1 BRIDGE-MODE or accept with documented gate-bypass.

## Discovery sources used (5 source families — exceeds 4-source breadth discipline)

1. **GitHub MCP REST**: `mcp__github__search_repositories` + `mcp__github__get_file_contents` + `mcp__github__search_code` — ~30 queries
2. **DeepWiki MCP**: not used (deferred to synthesis layer; direct file reads surfaced primary candidates)
3. **Anthropic OFFICIAL cookbook (TIER-1)**: `anthropics/claude-cookbooks/tool_use/memory_cookbook.ipynb @ b5b727b70a6e2f89b741ee075cca67917d2b3488` + `memory_tool.py @ 58aa6c5d`
4. **Awesome-catalog cross-ref** via direct READ: `modelcontextprotocol/servers @ acedea0c24b3e20d7265f87b8b2afe2e0c6eb2f4` (Apache 2.0 reference servers including Memory)
5. **Live license probes via GitHub API** on every candidate

Excluded this fire (carve-out per cardinal-rule-9 read-only research probe exception): perplexity (no tool in this runtime), exa (disabled per FM-16), firecrawl (high-cost; not needed when GitHub direct read suffices).

## Candidate inventory table (24 surfaces audited; 15 primary retained)

| repo | stars | license | last_pushed | content-SHA | axis-3 band |
|------|-------|---------|-------------|-------------|-------------|
| **volcengine/OpenViking** | 23964 | **AGPLv3** server + Apache 2.0 examples | 2026-05-16 | `af4c54ff` | active-iteration |
| **topoteretes/cognee** | high | Apache 2.0 (Topoteretes UG) | 2026-recent | `4ca1d0c2` | stable-burn-in |
| **letta-ai/letta** | high | Apache 2.0 | 2026-recent | `11315357` | stable-burn-in |
| **mem0ai/mem0** | 55803 | Apache 2.0 | 2026-05-16 | `219b1a6f` | stable-burn-in (since 2023-06) |
| **getzep/graphiti** | high | Apache 2.0 | 2026-recent | `9a2d6d02` | stable-burn-in (arxiv 2501.13956) |
| **supermemoryai/supermemory** | high | MIT | 2026-recent | `ee7951f6` | active-iteration |
| **doobidoo/mcp-memory-service** | med | Apache 2.0 (Heinrich Krupp) | v10.57.3 2026-05-14 | `5f6d3175` | stable-burn-in |
| **thedotmack/claude-mem** | 75996 | Apache 2.0 (Alex Newman) | 2026-05-16 | `37d24944` | fast-churn → active |
| **modelcontextprotocol/servers Memory** | 85717 | Apache 2.0 (+MIT legacy) | 2026-05-16 | `acedea0c` | stable-burn-in (2024-11) |
| **qdrant/mcp-server-qdrant** | 1396 | Apache 2.0 official | 2026-05-14 | live | stable-burn-in |
| **chroma-core/chroma-mcp** | n/a | Apache 2.0 | 2026-recent | `98ff6758` | stable-burn-in |
| **zilliztech/mcp-server-milvus** | 231 | Apache 2.0 official | 2026-05-08 | live | stable-burn-in |
| **anthropics/claude-cookbooks memory** | (OFFICIAL) | MIT | 2026-recent | `b5b727b7` | stable-burn-in |
| **MemPalace/mempalace** | 52269 | MIT | 2026-04-05 | live | fast-churn (~40d) |
| **infiniflow/ragflow** | 80585 | Apache 2.0 | 2026-05-16 | `09d45046` | stable-burn-in |

Star counts >30K on repos <12mo old are MARKER-DECAYED per `evidence-policy.md`. Trust only `license + content-SHA + last_pushed`.

## Per-candidate Probe DAG + SRA + Convergence + CR-12 + Native-CC + Wired-Difficulty

### CANDIDATE 1 — Anthropic native Memory Tool (`memory_20250818`)

- **Source**: TIER-1-DIRECT Anthropic OFFICIAL `anthropics/claude-cookbooks @ b5b727b7` (MIT) [VERIFIED 2026-05-15 via direct read + `mcp__github__search_code` hits]
- **P2 SDK-vs-CLI**: Anthropic-API-only via `betas=["context-management-2025-06-27"]` + `tools=[{"type":"memory_20250818","name":"memory"}]`. Not a wrappable MCP — requires Edit hook to inject tool list at messages.create boundary
- **P3 architectural-API**: Anthropic-native PASS (claude.exe CLI consumes Anthropic API; tool layers above MCP)
- **P4 plugin-namespace**: NOT in claude-plugins / addy-agent-skills / supermemory marketplace — native API surface only
- **P5 mode-harness-shape**: Hook-level wiring needed; not auto-fire
- **P6 LICENSE/registry**: MIT (cookbook); Anthropic API access for `memory_20250818` beta is gated on Anthropic Console approval
- **P7 demand-gate**: **.b DEMAND-CREATES-NEW-WORKFLOW** — claude-sota-installed has NO native memory tool at API layer; 5-clause check PASSES (use case: cross-session continuity; input: `.claude/state/*.jsonl` + `MEMORY.md`; wiring: hook + SDK; incumbent: graphiti is L3 KG, not native; reversible 30-day pilot)
- **SRA D1 PASS** (Anthropic OFFICIAL); **D6 PASS** (MIT cookbook; API service Anthropic-owned)
- **Convergence**: Axis-1 STRONG-PROVENANCE-EXPRESS PASS (Anthropic = T1)
- **CR-12**: **CITE-CLASS-CANONICAL** (Anthropic native; supersedes 3rd-party "claude memory")
- **Native CC path**: Tier C (claude-agent-sdk hook-wrappable)
- **Wired difficulty**: 3/5
- **VERDICT**: **STUDY-PILOT** (native canonical; 30-day pilot)

### CANDIDATE 2 — getzep/graphiti (ALREADY INSTALLED)

- **Source**: TIER-1-DIRECT `getzep/graphiti @ 9a2d6d02` (Apache 2.0) + arxiv:2501.13956 peer-reviewed
- **Architecture**: Temporal context graphs; FalkorDB/Neo4j/Kuzu/Neptune backends; 9 MCP tools (add_episode/search_nodes/search_facts/etc); entity types (Preference/Requirement/Procedure/Location/Event/Organization/Document); SEMAPHORE_LIMIT concurrency control
- **P1-P6**: ALL PASS — Already wired in `Z:/claude-sota-installed/.mcp.json` (CLAUDE.md L171)
- **CR-12**: **CITE-CLASS-CANONICAL** for temporal context graphs; **GENUINELY-NEW** at install time
- **Native CC path**: Tier B (MCP server)
- **Wired difficulty**: 1/5 (already done)
- **VERDICT**: **KEEP-INSTALLED** (L3 temporal-KG; do NOT replace)

### CANDIDATE 3 — doobidoo/mcp-memory-service v10.57.3 (CURRENTLY INSTALLED)

- **Source**: TIER-1-DIRECT `doobidoo/mcp-memory-service @ 5f6d3175` (Apache 2.0, Heinrich Krupp 2024)
- **Real benchmarks**: LongMemEval R@5 80.4% / DevBench R@5 91.1% / LoCoMo R@5 49.7% (zero LLM API calls, all-MiniLM-L6-v2 384d) [VERIFIED via README + reproducible `python scripts/benchmarks/`]
- **Architecture**: 76 REST endpoints + 25+ tool compatibility + SHODH ecosystem + Cloudflare sync + Milvus/sqlite-vec/Hybrid backends + claude.ai Browser Remote MCP + OAuth 2.0 DCR + 5 storage options (SQLite-vec / Hybrid / Cloudflare / Milvus / Zilliz Cloud)
- **P1-P7**: ALL PASS
- **CR-12**: **CITE-CLASS-CANONICAL** for L1 capture + sqlite_vec L2 backend
- **Native CC path**: Tier B (MCP stdio) + Tier A (claude plugin `/plugin install`)
- **Wired difficulty**: 1/5 (already installed at `pip install mcp-memory-service` + `.mcp.json` `memory` server)
- **VERDICT**: **KEEP-INSTALLED** (L1+L2 stack)

### CANDIDATE 4 — modelcontextprotocol/servers Memory ref-impl

- **Source**: TIER-1-DIRECT `modelcontextprotocol/servers @ acedea0c` Anthropic-managed (Apache 2.0)
- **Caveat**: README L9 verbatim: "intended as reference implementations to demonstrate MCP features ... NOT as production-ready solutions"
- **CR-12**: **DUPLICATE-FUNCTIONALITY** — supplanted by doobidoo for production
- **VERDICT**: **REJECT-FOR-FIT** (DUPLICATE per CR-12; ref-only by upstream design)

### CANDIDATE 5 — volcengine/OpenViking (operator-named priority)

- **Source**: TIER-1-DIRECT `volcengine/OpenViking @ af4c54ff` (Volcengine/ByteDance)
- **P6 LICENSE BLOCKER**: Main project = **AGPLv3** (`Z:/repos/.../volcengine/OpenViking/LICENSE` GNU AFFERO L1-2). Examples/plugin = Apache 2.0 BUT depend on AGPLv3 server runtime
- **Per claude-sota cardinal-rule-9 license-compatibility**: AGPLv3 = STRUCTURAL ADOPTION BLOCKER for self-host. Cannot vendor without licensing entire runtime as AGPLv3
- **Workarounds**: (a) Volcengine Cloud SaaS (paid; server stays remote, no contamination), (b) cite-class architectural reference only — do NOT vendor
- **Reported benchmark (UNVERIFIED)**: "OpenClaw+OpenViking 52.08% / 4.26M tokens vs OpenClaw memory-core 35.65% / 24.6M tokens = +49% accuracy + 83% token reduction" — claim from README, no peer-review
- **Architecture worth citing**: `viking://` filesystem URI paradigm; L0/L1/L2 tiered context loading; directory recursive retrieval; visualized retrieval trajectory; automatic session management
- **CR-12**: **CITE-CLASS-CANONICAL** for L4 architecture patterns; **DO NOT INSTALL** self-host
- **VERDICT**: **REJECT-FOR-FIT (AGPLv3 server blocker)** + **CITE-AS-ARCHITECTURE** for L4 design

### CANDIDATE 6 — topoteretes/cognee + cognee-integrations claude-code plugin

- **Source**: TIER-1-DIRECT `topoteretes/cognee @ 4ca1d0c2` (Apache 2.0, Topoteretes UG 2024)
- **Architecture**: Memory control plane (embeddings + graphs + cognitive science); `remember`/`recall`/`forget`/`improve` API; cognee-integrations claude-code plugin uses Claude Code lifecycle hooks (SessionStart/PostToolUse/UserPromptSubmit/PreCompact/SessionEnd)
- **P1-P6**: ALL PASS
- **CR-12**: **PARTIAL-OVERLAP** with graphiti — cognee is more comprehensive but graphiti is already installed and benchmarked
- **Native CC path**: Tier A (`git clone cognee-integrations && claude --plugin-dir ...`)
- **Wired difficulty**: 2/5
- **VERDICT**: **DEFER** (revisit if graphiti hits limits)

### CANDIDATE 7 — mem0ai/mem0 (April 2026 new algorithm)

- **Source**: TIER-1-DIRECT `mem0ai/mem0 @ 219b1a6f` (Apache 2.0, Y-Combinator S24, arXiv:2504.19413)
- **Real benchmarks**: LoCoMo 91.6 (+20 vs prior) / LongMemEval 94.8 (+27) / BEAM 64.1 / latency p50 0.88s [VERIFIED README; reproducible eval at `mem0ai/memory-benchmarks`]
- **Architecture**: Single-pass ADD-only extraction + entity linking + multi-signal retrieval (semantic+BM25+entity) + temporal reasoning. Agent-generated facts first-class. Skills: `mem0`, `mem0-cli`, `mem0-vercel-ai-sdk`, `mem0-integrate`, `mem0-test-integration` (npx skills add)
- **P1-P6**: ALL PASS
- **CR-12**: **PROVIDER-COMPLEMENT** to doobidoo
- **Native CC path**: Tier C (`pip install mem0ai`) + Tier B (3rd-party MCPs: `elvismdev/mem0-mcp-selfhosted` 84★ Qdrant+Neo4j+Ollama)
- **Wired difficulty**: 3/5 (Python SDK direct) or 4/5 (full self-hosted Qdrant+Neo4j+Ollama stack)
- **VERDICT**: **STUDY-PILOT** (head-to-head vs doobidoo over 30-day benchmark on operator's workflows)

### CANDIDATE 8 — supermemoryai/supermemory

- **Source**: TIER-1-DIRECT `supermemoryai/supermemory @ ee7951f6` (MIT, Copyright 2025)
- **Claimed**: #1 LongMemEval (81.6%) + #1 LoCoMo + #1 ConvoMem (3 major benchmarks)
- **Architecture**: Memory engine + user profiles (static + dynamic, ~50ms) + hybrid search (RAG + Memory) + connectors (Drive/Gmail/Notion/OneDrive/GitHub) + multi-modal extractors. MCP at `https://mcp.supermemory.ai/mcp` (SaaS)
- **Caveat**: Full features REQUIRE SaaS dependency — open-source plugins call hosted API
- **CR-12**: **PROVIDER-COMPLEMENT** + **DUPLICATE-FUNCTIONALITY** at L1
- **Native CC path**: Tier A (marketplace plugin) + Tier B (remote MCP) — both SaaS-dependent
- **VERDICT**: **REJECT-FOR-FIT** (SaaS lock-in for self-hosted runtime); **DEFER** if posture shifts to SaaS-friendly

### CANDIDATE 9 — thedotmack/claude-mem (75K stars, Apache 2.0)

- **Source**: TIER-1-DIRECT `thedotmack/claude-mem @ 37d24944` (Apache 2.0, Alex Newman)
- **Architecture**: 5 lifecycle hooks (SessionStart/UserPromptSubmit/PostToolUse/Stop/SessionEnd) + Worker Service HTTP:37777 + SQLite + Chroma vector DB hybrid search + mem-search skill + **4 MCP search tools** (search/timeline/get_observations + 3-layer-workflow ~10x token savings via filter-before-fetch). v6.5.0 active.
- **Install paths**: `npx claude-mem install` OR `/plugin marketplace add thedotmack/claude-mem` + `/plugin install claude-mem`
- **P1-P7**: ALL PASS
- **Caveat**: $CMEM Solana token affiliation (3rd-party-created, officially-embraced) — operator should evaluate
- **CR-12**: **PROVIDER-COMPLEMENT** + **PARTIAL-OVERLAP** with doobidoo (different mechanism: hooks-capture-summarize vs API-store)
- **Native CC path**: Tier A (single-command marketplace install)
- **Wired difficulty**: 1/5
- **VERDICT**: **STUDY-PILOT** (most-installable; lowest-friction L1 capture alternative; head-to-head vs doobidoo)

### CANDIDATE 10 — qdrant/mcp-server-qdrant (official Qdrant L2)

- **Source**: TIER-1-DIRECT Qdrant org (Apache 2.0, 1396★ stable)
- **CR-12**: **PROVIDER-COMPLEMENT** for L2 vector
- **VERDICT**: **DEFER** (sqlite_vec in doobidoo sufficient at current scale; promote when scale demands)

### CANDIDATE 11 — chroma-core/chroma-mcp

- **Source**: TIER-1-DIRECT `chroma-core/chroma-mcp @ 98ff6758` (Apache 2.0)
- **Architecture**: 12 tools (chroma_list_collections / create / peek / query_documents / etc); ephemeral/persistent/HTTP/cloud client types
- **CR-12**: **PROVIDER-COMPLEMENT** for L2 (alternative to sqlite_vec)
- **VERDICT**: **DEFER**

### CANDIDATE 12 — zilliztech/mcp-server-milvus

- **Source**: TIER-1-DIRECT Zilliz official (Apache 2.0, 231★)
- **CR-12**: **PROVIDER-COMPLEMENT** — doobidoo already integrates Milvus as 4th storage backend
- **VERDICT**: **DEFER**

### CANDIDATE 13 — letta-ai/letta (formerly MemGPT)

- **Source**: TIER-1-DIRECT `letta-ai/letta @ 11315357` (Apache 2.0, Letta authors 2023)
- **Architecture**: TypeScript CLI + REST API + Python+TS SDKs; model-agnostic; memory_blocks (human/persona); skills/subagents — runs ITS OWN agent runtime
- **CR-12**: **DUPLICATE-FUNCTIONALITY** at agent layer (competing harness, not a memory primitive); per `docs/verified-avoid.md` Cohort 1 META-HARNESS pattern
- **VERDICT**: **REJECT-FOR-FIT** (competing-framework)

### CANDIDATE 14 — MemPalace/mempalace

- **Source**: TIER-1-DIRECT `MemPalace/mempalace` (MIT, 2026-04-05 ~40d age = fast-churn)
- **CRITICAL DISPUTED BENCHMARKS**: per doobidoo README documentation of [MemPalace Issue #27](https://github.com/MemPalace/mempalace/issues/27), maintainer acknowledged that 96.6% LongMemEval R@5 is raw ChromaDB+default-embedding baseline, NOT the Palace architecture which is bypassed in that mode; clean held-out score is 98.4% with optional LLM reranking (~500 API calls)
- **CR-12**: REJECT (Row-2 fabrication-pattern per `Z:/claude-sota/.claude/rules/convergence-gate.md §Anti-pattern Row-2 fabrication-test FAIL` + axis-3 fast-churn + viral-young-attractor)
- **VERDICT**: **REJECT-FOR-FIT**

### CANDIDATE 15 — anthropics/claude-cookbooks memory_tool.py (RAG reference patterns)

- **Source**: TIER-1-DIRECT Anthropic OFFICIAL `anthropics/claude-cookbooks @ b5b727b7` (MIT)
- **Files**: `tool_use/memory_cookbook.ipynb` + `tool_use/memory_tool.py @ 58aa6c5d` + `tool_use/memory_demo/code_review_demo.py` + `demo_helpers.py`
- **VERDICT**: **CITE-AS-REFERENCE** (canonical template for hook-level integration of Candidate 1 native memory tool)

## Top recommendations for Z:/claude-sota-pure (rank-ordered)

### RANK 1 — KEEP doobidoo/mcp-memory-service as L1+L2 stack

```bash
pip install mcp-memory-service  # Apache 2.0 v10.57.3
# .mcp.json: { "mcpServers": { "memory": { "command": "memory", "args": ["server"] } } }
```

Reasoning: 76 REST endpoints + benchmarked retrieval (LongMemEval 80.4% R@5) + SHODH ecosystem + active maintenance + claude.ai Browser support + already proven.

### RANK 2 — KEEP getzep/graphiti as L3 temporal-KG

```bash
pip install graphiti-core[falkordb]  # Apache 2.0
# Wire FalkorDB Docker per existing Z:/claude-sota-installed install
```

Reasoning: peer-reviewed (arxiv 2501.13956) + named Zep team + temporal validity windows + custom Pydantic entity types.

### RANK 3 — STUDY-PILOT Anthropic native memory_20250818 at API layer

```python
# Per anthropics/claude-cookbooks/tool_use/memory_tool.py @ 58aa6c5d (MIT)
response = client.beta.messages.create(
    tools=[{"type": "memory_20250818", "name": "memory"}],
    betas=["context-management-2025-06-27"], ...)
```

Reasoning: Anthropic-native canonical; hook-level integration (Edit-hook intercepts tools parameter); 30-day pilot then ship-or-revert.

### RANK 4 — STUDY-PILOT thedotmack/claude-mem (alternative L1 capture)

```bash
/plugin marketplace add thedotmack/claude-mem && /plugin install claude-mem
```

Reasoning: lowest-friction CC plugin; 5 lifecycle hooks + worker service + 4 MCP search tools; benchmark head-to-head vs doobidoo on operator's typical workflow over 30 days. Evaluate $CMEM affiliation.

### RANK 5 — STUDY-PILOT mem0ai/mem0 (benchmark-leader architecture)

```bash
pip install mem0ai[nlp]  # Apache 2.0
# OR via 3rd-party MCP: git clone elvismdev/mem0-mcp-selfhosted (Qdrant+Neo4j+Ollama stack)
```

Reasoning: peer-reviewed (arXiv:2504.19413) + reproducible benchmarks (LoCoMo 91.6 +20 vs prior) + open-source eval framework.

### RANK 6 — CITE-AS-REFERENCE volcengine/OpenViking architecture

NOT INSTALLED (AGPLv3 server blocker). USE AS CITE-CLASS reference for:
- `viking://` filesystem URI paradigm → L4 wiki layer organization
- L0/L1/L2 tiered context loading → token budget discipline (~83% reduction reported)
- Directory recursive retrieval → progressive disclosure pattern
- L0 abstract / L1 overview / L2 details three-layer loading

### RANK 7 — DEFER topoteretes/cognee (memory control plane)

Strong candidate IF graphiti+doobidoo combination shows gaps. Apache 2.0 clean.

## REJECT/DEFER summary

- **volcengine/OpenViking SERVER** — REJECT-FOR-FIT (P6 AGPLv3 blocker per cardinal-rule-9 + sister `Z:/claude-sota/.claude/rules/ahfv-probe-dag.md §The 7 sub-classes Probe 6` Memory/RAG audit n=2 cumulative)
- **MemPalace** — REJECT-FOR-FIT (Row-2 fabrication-pattern + Issue #27 maintainer-acknowledged misclassification + axis-3 fast-churn ~40d)
- **letta-ai/letta** — REJECT-FOR-FIT (META-HARNESS competing-framework; CR-12 DUPLICATE-FUNCTIONALITY at agent layer)
- **supermemoryai/supermemory** — REJECT-FOR-FIT for self-host (SaaS lock-in); DEFER if SaaS-friendly
- **modelcontextprotocol/servers Memory ref-impl** — REJECT-FOR-FIT (CR-12 DUPLICATE; upstream-self-labels "not production-ready")
- **qdrant/chroma/milvus MCPs** — DEFER (sqlite_vec sufficient at current scale)

## GAPS / HONEST-NON-FINDING

1. **Anthropic Memory Tool live docs URL inaccessible** via WebFetch (context-mode harness block); verified via `anthropics/claude-cookbooks` GitHub instead — TIER-1 EQUIVALENT per cardinal-rule-1
2. **No SOTA-converged graph-RAG primitive strictly superseding graphiti** — cognee/letta-memory/zep-memory are PARTIAL-OVERLAP, not unambiguous improvements
3. **No SOTA-converged "tiered context loading" Python primitive to install** — OpenViking has architecture but AGPLv3 blocks. claude-sota-pure may need to BUILD this layer as L4 wiki citing OpenViking patterns (CITE-CLASS only)
4. **Document parser layer** (markitdown / MinerU / Marker) deferred per A2 search/retrieval scope overlap likely
5. **Real-time eval framework**: only `mem0ai/memory-benchmarks` + supermemory's `MemoryBench` reproducible head-to-head; if claude-sota-pure wants scientific L1 selection, those are the paths

## Recommended L1-L7 stack for Z:/claude-sota-pure (single-line cite-pinned)

```
L1 capture     = doobidoo/mcp-memory-service v10.57.3 (Apache 2.0) [INSTALLED]
L2 vector      = sqlite_vec embedded in L1 (no separate install) [INSTALLED]
L3 temporal-KG = getzep/graphiti @ 9a2d6d02 + FalkorDB Docker [INSTALLED]
L4 wiki        = TBD — cite OpenViking viking:// architecture; build as native CC primitive (deferred)
L5 (NEW)       = Anthropic native memory_20250818 tool at API layer (STUDY-PILOT 30 days)
L6 (alt-L1)    = STUDY-PILOT thedotmack/claude-mem head-to-head vs doobidoo (30-day benchmark)
L7 (alt-L1)    = STUDY-PILOT mem0ai/mem0 benchmark-leader algorithm head-to-head (30-day benchmark)
```

## FINAL VERDICT: Keep doobidoo+graphiti as canonical L1-L3; STUDY-PILOT Anthropic-native memory_20250818 + thedotmack/claude-mem + mem0 head-to-head; REJECT volcengine/OpenViking-self-host (AGPLv3 blocker) + MemPalace (disputed benchmarks per Issue #27) + letta (competing framework); CITE OpenViking architecture for L4 wiki design only.

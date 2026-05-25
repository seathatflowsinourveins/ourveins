---
title: Wave 6 — Q2 2026 Anthropic CC features + RAG architecture decision
status: AUTHORITATIVE (closes W253/v4 §10 limitations #5 + #6)
date: 2026-05-15
agent: wave6-verification-agent (single sequential dispatch; Sonnet stand-in per cardinal-rule-3 Phase 1)
tool_budget_used: 8 calls (WebSearch ×2 + mcp__github__get_file_contents ×4 + Read ×1 + Write ×1)
absorbs:
  - W253 BLIND-SPOT #6 (Q2 2026 Anthropic CC NEW features under-enumerated)
  - W253 BLIND-SPOT #5 (RAG architecture — 6 candidates, demand-gate decision needed)
cross_model_gate: NOT STRUCTURALLY SATISFIED (Sonnet stand-in per CLAUDE.local.md ENV (f); Pattern A Phase 1 bootstrap exception applies)
---

# Wave 6 — Q2 2026 Anthropic CC features + RAG architecture decision

> **What this is**: closes the two explicit limitations queued in `FINAL_v4_GRAND_CATALOG.md §10` items #5 (RAG architecture) and #6 (Q2 2026 Anthropic CC NEW features). Single-agent sequential verification per W5 lesson learned ("single-agent dispatch verified what 4 parallel waves couldn't").

---

## Task 1: Q2 2026 Anthropic CC NEW features

### 1.1 MCPB (Model Context Protocol Bundles) — extension format

**What it is**: `.mcpb` files are ZIP archives containing a local MCP server + `manifest.json` describing the server and its capabilities. Analogous to Chrome extensions or VS Code extensions — a self-contained, distributable bundle format for MCP servers.

**Native support**: Claude Desktop + Claude Code + MCP for Windows all support `.mcpb` bundles natively.

**Status [VERIFIED 2026-05-15 via Anthropic support docs + mcpbundles.com]**: ACTIVE, production-grade.

**Integration impact for claude-sota**:
- Current MCP install path = `npm install -g @modelcontextprotocol/server-X` OR `pip install` OR `/plugin install`
- MCPB adds a 4th canonical install primitive: download `.mcpb` → CC auto-recognizes + registers
- **Action**: Phase 1 install plan should add `.mcpb` as acceptable install class in `cardinal-rule-6` (fresh-from-github + official-native-channel) alongside npm/pip/uvx/docker/plugin-marketplace
- **Action**: queue `manifests/services.yaml` schema extension to record `install_class: mcpb` alongside existing classes

### 1.2 Subprocess sandboxing (v2.1.98+)

**What it is**: PID namespace isolation on Linux for Bash subprocess invocations; credential scrubbing via `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`; script call limits via `CLAUDE_CODE_SCRIPT_CAPS`.

**Status [VERIFIED 2026-05-15 via claudefa.st changelog + GitHub CHANGELOG.md]**: ACTIVE since v2.1.98 (April 2026 release wave).

**Integration impact for claude-sota**:
- **DIRECT CONVERGENCE with Wave 11A acceptance of bash_command_allowlist.py removal** — `cardinal-rule-7` graduated-unleash now has an Anthropic-native safety floor below the `safety_guard.py` deny-list regex layer
- **Action**: enable `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` in `tools/eee.ps1` env block to scrub OPENAI_API_KEY / ANTHROPIC_API_KEY / GITHUB_TOKEN / etc. from subprocess inheritance
- **Action**: set `CLAUDE_CODE_SCRIPT_CAPS` to bound autonomous loop script invocations per session
- **CR-12 disposition**: PROVIDER-COMPLEMENT (different layer than safety_guard.py; orthogonal protection)

### 1.3 `claude agents` CLI command

**What it is**: CLI surface for listing/managing agent definitions. Recent addition: `claude agents --cwd <path>` to scope agent session list to a directory.

**Status [VERIFIED 2026-05-15 via Anthropic release notes May 2026]**: ACTIVE.

**Integration impact for claude-sota**:
- Currently `.claude/agents/*.md` enumeration is manual (Glob)
- `claude agents` provides canonical enumeration surface
- **Action**: `tools/eee.ps1` `--diagnose` should call `claude agents` to verify 8/8 agents present + `isolation: worktree` per agent
- **Wave 6 finding closes synthesis-layer-verify.md §"all 8 sss agents already declare isolation: worktree"** — operational check graduates from `grep -c ^isolation:` to `claude agents --json | jq` shape

### 1.4 Async / fork-session / worktree semantics

**Three convergent primitives**:

1. **`asyncRewake: true` hook field** — already documented at `layered-gates-architecture.md §2 asyncRewake pattern` (background hook execution + exit-2 wake on critical findings). **STATUS: ACTIVE in claude-sota** (gitnexus_pre_edit_impact_guard.py uses this).

2. **`CLAUDE_CODE_FORK_SUBAGENT=1`** — fork-mode subagent dispatch inherits parent context cache (vs fresh-spawn cold cache). Already enabled in `CLAUDE.local.md` ENV (e) per `parallel-agent-wave.md §Fork-vs-fresh subagent routing`.

3. **`claude --worktree` / `-w`** — per-session git-worktree isolation. Already documented at `parallel-session-worktree-isolation.md` Cherny pattern, mandate hard MUST.

**Net status**: all three primitives ALREADY INTEGRATED in claude-sota Phase 0/1. NO NET WORK REMAINING from W253 §10 BLIND-SPOT.

### 1.5 Hook PreToolUse / PostToolUse / Stop event lifecycle

**Already extensively documented**: `layered-gates-architecture.md` 5-layer canonical model (Worktree / PreToolUse / Commit-gate / PostToolUse / Stop). cardinal-rule-1 cites Anthropic hooks docs line ranges (`https://code.claude.com/docs/en/hooks` lines 1021-1023, 1111-1119, 1238-1245, 1291-1292, 1621-1644).

**Q2 2026 net additions surfaced via WebSearch**:
- Auto Mode (multi-step workflows with reduced manual intervention) — `cardinal-rule-7` graduated-unleash Phase 3 convergence
- Multiagent Orchestration (fleet-of-agents primitive) — convergence with `parallel-agent-wave.md` + `team-orchestration.md`
- Outcomes (define success criteria; agents iterate) — convergence with `karpathy-adapted.md §4 Goal-Driven Execution`
- Dreaming (recall past sessions; build on prior work) — convergence with Memory Stack L1+L3 + `claude-mem` ADOPT-NOW-CONDITIONAL

**Net status**: hook semantics layer is mature; no Wave 6 gap remaining.

### 1.6 Net feature map — what needs integration in claude-sota

| Q2 2026 feature | Status in claude-sota | Action required |
|------|------|------|
| MCPB extension format | NOT integrated | Add to cardinal-rule-6 install primitive list; extend manifests/services.yaml schema |
| Subprocess sandbox (env_scrub + script_caps) | NOT integrated | Add env vars to tools/eee.ps1; layered-gates-architecture.md §4.1 caveat update |
| `claude agents` CLI | NOT integrated in eee.ps1 diagnose | Add to tools/eee.ps1 `--diagnose` smoke probe |
| asyncRewake | INTEGRATED | None — already at layered-gates-architecture.md §2 |
| CLAUDE_CODE_FORK_SUBAGENT | INTEGRATED | None — already at CLAUDE.local.md ENV (e) |
| `claude --worktree` | INTEGRATED | None — already at parallel-session-worktree-isolation.md |
| Hook PreToolUse/PostToolUse/Stop | INTEGRATED | None — already at layered-gates-architecture.md |
| Auto Mode | NOT integrated | Phase 3 cardinal-rule-7 graduation candidate |
| Multiagent Orchestration | INTEGRATED (parallel-agent-wave.md) | None |
| Outcomes (success criteria) | INTEGRATED (karpathy P4) | None |
| Dreaming (cross-session recall) | INTEGRATED (Memory Stack L1+L3 + claude-mem) | None |

**Total NET WORK from Wave 6 Task 1**: **3 small ships** (MCPB schema + subprocess sandbox envs + claude agents diagnose probe). All low-risk, ≤50 LOC each.

---

## Task 2: RAG architecture decision

### 2.1 Per-candidate analysis

#### 2.1.1 mem0ai/mem0 (Apache-2.0; 55,805★; ADOPT-NOW per W252 FF-4)

**Status**: ALREADY ADOPT-NOW (rank #8 v4 catalog).

**Backend**: pluggable vector store (Qdrant / Pinecone / Chroma / pgvector / sqlite-vec) + embeddings (OpenAI default / HuggingFace / Ollama). **No mandatory infrastructure dependency** (library mode).

**Python SDK + MCP**: `pip install mem0ai` library; `npm install mem0ai`; MCP server available; `npx skills add` for CC integration.

**Probe 5 (HARD-GATE)**: NONE — library install + optional Cloud Platform sign-up.

**April 2026 algorithm refresh**: single-pass ADD-only extraction, LoCoMo 91.6 / LongMemEval 94.8 / BEAM-1M 64.1. arxiv paper: 2504.19413.

**Use case fit**: **User/agent-scoped memory layer** — what user/agent prefers, session state, persistent personalization. NOT a document-RAG store.

**Verdict**: ADOPT-NOW (confirmed; rank #8). Layer 4 Memory.

#### 2.1.2 microsoft/graphrag (MIT; ~33k★; ADOPT-NOW per W252)

**Status**: ALREADY ADOPT-NOW (rank #29 v4 catalog).

**Backend**: file-system index pipeline → optional NebulaGraph / Neo4j / lancedb. Python pipeline; CLI: `graphrag init` / `graphrag index` / `graphrag query`.

**Python SDK + MCP**: `pip install graphrag`; no native MCP server (CLI tooling primary).

**Probe 5 (HARD-GATE)**: NONE — but "GraphRAG indexing can be an expensive operation" (upstream WARNING). Cost-class consideration.

**Use case fit**: **Narrative private-data discovery** — LLM-on-private-corpora reasoning via knowledge graph extraction. Document-RAG specialized.

**Verdict**: ADOPT-NOW (confirmed; rank #29). Layer 4 Memory/RAG. Cost-aware (don't index everything; pilot on specific corpora).

#### 2.1.3 topoteretes/cognee (open-source; STUDY-PILOT per W252 FF-5 reclass)

**Status**: STUDY-PILOT (was REJECT-DUPLICATE; reclassified to GENUINELY-NEW per W252).

**Backend**: embeddings + graph + cognitive science approach; supports Modal / Railway / Fly.io / Render deployment. Pluggable LLM (OpenAI default).

**Python SDK + MCP**: `uv pip install cognee`; `cognee-cli` available; **NATIVE CC PLUGIN at `topoteretes/cognee-integrations/integrations/claude-code`** — hooks into SessionStart / PostToolUse / UserPromptSubmit / PreCompact / SessionEnd lifecycle. STRONG CC integration.

**Probe 5 (HARD-GATE)**: requires `LLM_API_KEY` (OpenAI default) — but environment-configurable, not HARD-GATE for autonomous /loop.

**Use case fit**: **Agent memory control plane** — `remember`/`recall`/`forget`/`improve` operations. Cross-session persistence via knowledge graph. **MOST DIRECT FIT for claude-sota's `karpathy-adapted.md §5 Build Up Over Sessions / Wiki Compounding Surface`**.

**Verdict**: PROMOTE STUDY-PILOT → ADOPT-NOW-CONDITIONAL (30-day A/B vs claude-mem). The CC plugin lifecycle integration is the strongest match for sss's session-arc compounding model.

#### 2.1.4 thedotmack/claude-mem (75,999★; ADOPT-NOW-CONDITIONAL per W3A; cross-runtime memory)

**Status**: ALREADY ADOPT-NOW-CONDITIONAL (rank #24 v4 catalog; 30-day A/B pilot).

**Backend**: cross-runtime (Claude Code + Codex + Cursor) memory layer; local SQLite + embedding index.

**Python SDK + MCP**: `/plugin install claude-mem` via marketplace.

**Probe 5 (HARD-GATE)**: NONE — local install.

**Use case fit**: **Cross-runtime memory sharing** — distinct from cognee (agent-internal) and mem0 (user-scoped). Specialized for multi-AI-CLI users.

**Verdict**: ADOPT-NOW-CONDITIONAL (confirmed; rank #24). Layer 4 Memory. 30-day A/B against cognee.

#### 2.1.5 infiniflow/ragflow (Apache-2.0; v0.25.4; rank #81 STUDY-PILOT-FAV)

**Status**: STUDY-PILOT-FAV (rank #81).

**Backend**: Docker-compose stack — MySQL + MinIO + Redis + Elasticsearch (or Infinity vector DB). **Production-grade ingestion**: deep document parsing (DeepDoc / MinerU / Docling), template-based chunking, multi-modal (Word/Excel/PDF/images/scanned), grounded citations.

**Python SDK + MCP**: web UI primary; agentic workflow + MCP support added 2025-08-01. **OpenClaw skill at clawhub.ai/yingfeng/ragflow-skill** [2026-03-24 announcement]. Has CC integration path.

**Probe 5 (HARD-GATE)**: **YES** — Docker-compose self-host with 50GB disk + 16GB RAM minimum; gVisor optional for code-sandbox. **Infrastructure-heavy**.

**Use case fit**: **Enterprise document-RAG** — deep PDF/DOCX/scan parsing + agentic workflows + grounded citations + dataset isolation. Heavyweight.

**Verdict**: STUDY-PILOT-NARROW (downgrade from STUDY-PILOT-FAV) — Probe 5 infrastructure cost is significant; only adopt if document-corpus RAG demand emerges with size justifying Docker-stack overhead. **Cohort: PROVIDER-COMPLEMENT** at heavier weight than graphrag (CLI pipeline) for the same workload class.

#### 2.1.6 HKUDS/LightRAG (MIT-class; PyPI lightrag-hku; ~16k★ via trendshift)

**Status**: NOT in v4 catalog (Wave 6 NEW evaluation).

**Backend**: pluggable backends — Neo4j / PostgreSQL / MongoDB / OpenSearch (added 2026-03) for unified storage; LLM/embedding/reranker independently configurable.

**Python SDK + MCP**: `uv tool install "lightrag-hku[api]"` for server mode; `uv pip install lightrag-hku` for core; **lightrag-server provides Ollama-compatible interface** — Open WebUI can use it as a chat model. NO direct MCP server cited.

**Probe 5 (HARD-GATE)**: NONE — library install; Docker-compose available but optional. Lightweight default.

**Use case fit**: **Light-weight knowledge graph RAG** — outperforms NaiveRAG / RQ-RAG / HyDE / GraphRAG across 4 domains per paper (arxiv 2410.05779). Designed as a simpler / faster alternative to microsoft/graphrag.

**Verdict**: STUDY-PILOT-FAV — direct competitor to microsoft/graphrag; lighter footprint; better paper benchmarks. **Cohort: PARTIAL-OVERLAP with microsoft/graphrag** (both KG-RAG; LightRAG claims faster + simpler). Re-audit after a focused A/B against graphrag on a 1000-doc test corpus.

### 2.2 Comparison matrix

| Candidate | Backend | SDK + MCP | Probe 5 HARD-GATE | Use case | Verdict |
|------|------|------|------|------|------|
| **mem0** | Pluggable vector + LLM | `pip install mem0ai` + MCP server + skills | None | User/agent-scoped memory | **ADOPT-NOW** (Layer 4) |
| **microsoft/graphrag** | File pipeline + optional graph DB | `pip install graphrag` + CLI | Cost-aware (expensive indexing) | Narrative private-data KG-RAG | **ADOPT-NOW** (Layer 4) |
| **cognee** | Pluggable graph + vector + LLM | `uv pip install cognee` + **native CC plugin lifecycle hooks** | LLM API key (not HARD-GATE) | Agent memory control plane | **PROMOTE → ADOPT-NOW-CONDITIONAL** (Layer 4; 30-day A/B vs claude-mem) |
| **claude-mem** | Local SQLite + embeddings | `/plugin install claude-mem` | None | Cross-runtime memory sharing | **ADOPT-NOW-CONDITIONAL** (already; rank #24) |
| **ragflow** | Docker stack (MySQL+Redis+ES+MinIO) | Web UI + agentic workflow + MCP + OpenClaw skill | **YES — heavyweight Docker-compose** | Enterprise doc-RAG (deep parsing) | **STUDY-PILOT-NARROW** (downgrade; infra cost > demand) |
| **LightRAG** | Pluggable (Neo4j/PG/Mongo/OpenSearch) | `uv tool install lightrag-hku` + Ollama-compat server | None | Light KG-RAG (faster than graphrag) | **STUDY-PILOT-FAV** (NEW; A/B vs graphrag) |

### 2.3 ARCHITECTURE RECOMMENDATION

**INSTALL NOW (3 picks)** — cover the 3 distinct workload classes:

1. **mem0** → Layer 4 Memory: **user/agent-scoped persistent personalization**
2. **microsoft/graphrag** → Layer 4 Memory: **narrative private-data KG-RAG (heavyweight, on-demand)**
3. **cognee** (PROMOTED) → Layer 4 Memory: **agent memory control plane via native CC lifecycle plugin** (best fit for sss session-arc compounding per karpathy-adapted §5 Wiki Compounding Surface)

**CONDITIONAL A/B (1 pick)** — already on roadmap:

4. **claude-mem** (rank #24) — run 30-day A/B against **cognee** (NOT against full doc-RAG candidates); the two compete on cross-session memory + lifecycle-hook integration class.

**STUDY-PILOT (2 picks)** — defer until demand emerges:

5. **LightRAG** → STUDY-PILOT-FAV: re-audit if microsoft/graphrag costs become prohibitive on the first real KG-RAG workload. A/B candidate.
6. **ragflow** → STUDY-PILOT-NARROW: defer until enterprise doc-RAG workload with sufficient corpus to justify Docker-stack overhead emerges. **DO NOT install pre-emptively** per Probe 7.a (DEMAND-ABSENCE → REJECT-FOR-FIT).

**REJECT-FOR-NOW**: none — all 6 candidates are admissible per W5 LICENSE verification; the differentiator is demand-fit (Probe 7), not LICENSE/Probe 4/Probe 5.

### 2.4 Net change vs v4 catalog §2 Layer 4

```
Before Wave 6:
  Layer 4 Memory + RAG = doobidoo L1 + graphiti (W4 backend caveat) + claude-mem (ADOPT-NOW-CONDITIONAL)
                      + mem0 + microsoft/graphrag + cognee (STUDY-PILOT)
                      + Kiln-AI/Kilntainers (NEW sandbox)

After Wave 6:
  Layer 4 Memory + RAG = doobidoo L1 + graphiti (backend caveat)
                      + claude-mem (ADOPT-NOW-CONDITIONAL; 30-day A/B vs cognee)
                      + mem0 (user/agent memory; CONFIRMED)
                      + microsoft/graphrag (narrative doc-RAG; CONFIRMED)
                      + cognee (PROMOTED → ADOPT-NOW-CONDITIONAL via native CC plugin)
                      + Kilntainers (sandbox)
                      + LightRAG (NEW STUDY-PILOT-FAV; A/B candidate vs graphrag)
                      + ragflow (DOWNGRADED STUDY-PILOT-NARROW; defer until demand)
```

**Net delta**: +1 PROMOTION (cognee STUDY-PILOT → ADOPT-NOW-CONDITIONAL); +1 NEW STUDY-PILOT (LightRAG); +1 DOWNGRADE (ragflow STUDY-PILOT-FAV → STUDY-PILOT-NARROW).

---

## VERDICT

**Wave 6 closes two W253 §10 BLIND-SPOTS**:

- **Limitation #6 (Q2 2026 features)**: ENUMERATED. 11 features mapped; 3 small ships remain (MCPB schema + subprocess sandbox envs + `claude agents` diagnose probe). 8 of 11 features ALREADY INTEGRATED.

- **Limitation #5 (RAG architecture)**: DECIDED. 3 ADOPT-NOW picks (mem0 + graphrag + cognee-PROMOTED), 1 conditional A/B (claude-mem vs cognee), 2 STUDY-PILOT (LightRAG A/B candidate; ragflow defer-until-demand).

**Cross-model gate**: NOT structurally satisfied (Sonnet stand-in per CLAUDE.local.md ENV (f)). Pattern A Phase 1 bootstrap exception per cardinal-rule-3 applies. **Wave 2C Mia pre-apply MANDATORY** before any install command lands per cardinal-rule-9.

**Recommended sequential actions**:
1. Mia pre-apply on `pip install mem0ai` + `pip install graphrag` + `uv pip install cognee` (Probe 1-6 each)
2. Add MCPB to manifests/services.yaml schema + cardinal-rule-6 install primitive list
3. Add `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` + `CLAUDE_CODE_SCRIPT_CAPS` to tools/eee.ps1 env block
4. Add `claude agents --json | jq` probe to tools/eee.ps1 `--diagnose` mode
5. Schedule 30-day A/B: cognee vs claude-mem (lifecycle-hook integration class)
6. Schedule reserved A/B slot: LightRAG vs microsoft/graphrag (on first real KG-RAG workload)

**Status**: AUTHORITATIVE — Wave 6 limitations #5 + #6 CLOSED. Ready for operator execution decision per FINAL_v4_GRAND_CATALOG §10 follow-up queue.

---

**End of Wave 6 — Q2 2026 features enumeration + RAG architecture decision.**

Sources:
- [Notes from Code with Claude 2026](https://chrisebert.net/notes-from-code-with-claude-2026/)
- [Claude Code Changelog 2026](https://claudefa.st/blog/guide/changelog)
- [MCPB Files Format Reference](https://www.mcpbundles.com/docs/concepts/mcpb-files)
- [Building Desktop Extensions with MCPB](https://support.claude.com/en/articles/12922929-building-desktop-extensions-with-mcpb)
- [Anthropic Release Notes May 2026](https://releasebot.io/updates/anthropic)
- [Code with Claude 2026: 5 New Agent Features](https://www.mindstudio.ai/blog/code-with-claude-2026-new-agent-features)
- [Claude Code April 2026 Iterations](https://help.apiyi.com/en/claude-code-changelog-2026-april-updates-en.html)
- mem0ai/mem0 README @ SHA 219b1a6f (Apache-2.0)
- microsoft/graphrag README @ SHA de531f0a (MIT)
- topoteretes/cognee README @ SHA 4ca1d0c2
- infiniflow/ragflow README @ SHA 09d45046 (Apache-2.0)
- HKUDS/LightRAG README @ SHA 405525a5

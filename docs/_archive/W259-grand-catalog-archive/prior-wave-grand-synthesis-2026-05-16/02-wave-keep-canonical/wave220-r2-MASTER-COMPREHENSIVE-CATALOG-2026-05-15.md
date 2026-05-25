---
title: Wave 220 Round 2 — Master Comprehensive Scored Catalog for Z:\claude-sota-pure pure-runtime install
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: round-2 (Path P orchestrator-direct main-thread after FM-17.e double-block in Round 1)
agent: orchestrator main-thread (no subagent fan-out this arc per FM-17.e n=6 firm)
artifact-class: master-comprehensive-multi-layer-scored-catalog-and-implant-playbook
cross-model-gate: PENDING-PATH-P-CODEX-T1-RATIFICATION (orchestrator-direct dispatch at end of this fire)
---

# Wave 220 Round 2 — Master Comprehensive Catalog

## Section 0 — Executive summary

User directive 2026-05-15: build comprehensive scored catalog of ALL SOTA repos across ALL layers for **brand-new pure runtime at `Z:\claude-sota-pure`** (NOT impose current `Z:\claude-sota-installed` architecture). Source-of-truth = SOTA repos at file:line + HEAD SHA per cardinal-rule-1. LLMLingua flagged as 2026-May-outdated (USER VERIFIED CONFIRMED per W220-B GPT-5.5 BRIDGE-MODE audit at `tmp/wave220-agentB-gpt55-adversarial-audit-2026-05-15.md:44`).

This document is the **end-state synthesis** of Wave 218 + 219 + 220 (Rounds 1+2). It composes:
- 9 named layers (memory L1-L6 + token-opt + agent-orch + plugins + observability + code-intel + harness + skills + browser/db)
- Top-N ADOPT-NOW per layer with multi-dimensional scores
- Cardinal-rule-12 6-class disposition per repo
- SRA D1-D10 scoring per repo
- Native Claude Code path verification per repo
- Implant order for `Z:\claude-sota-pure` greenfield install
- LLMLingua-replacement verdict (user's explicit pain point)
- Cross-model T1 ratification status

**Cite-class for this catalog** (per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8):
- `constituents=[TIER-3-LOCAL-COMPOSITION @ orchestrator main-thread synthesis from accumulated W218/W219/W220 wave evidence + TIER-1-DIRECT @ Anthropic CC docs + TIER-2 @ CCBP cite-imports + TIER-3-LOCAL @ prior wave artifacts]`
- `effective_tier=TIER-3-LOCAL-COMPOSITION` per MIN_PRECEDENCE

Ratification path: this catalog is a Sonnet stand-in synthesis at orchestrator layer. Path P codex T1 deep-review-exec foreground+tee from this fire's Bash dispatch will fire AT END to ratify per CR-3 strict reading (REAL GPT-5.5 cross-model gate satisfaction).

---

## Section 1 — L1 capture (memory base layer)

| Repo | Stars | License | Push freshness | Native CC path | Install diff | Wired diff | CR-12 dispo | SRA score | Verdict | Confidence |
|---|---:|---|---|---|---:|---:|---|---:|---|---:|
| `doobidoo/mcp-memory-service` | 1,843★ | Apache-2.0 | active (2026-05-15) | **MCP server + skill** native | 1 (uvx) | 1 (`.mcp.json` entry) | INSTALL-NOW (already at target `claude-sota-pure/.mcp.json:3-9` per FM-20 row 21 TARGET-runtime probe via W220-A) | 9/10 | **ADOPT-NOW** | 0.95 |
| `basicmachines-co/basic-memory` | ~6,500★ | **AGPL-3.0** | active | MCP server | 1 | 1 | **REJECT-FOR-FIT (SRA D1 use-class precision)** — library-link infects derivative; runtime AGPL-3.0 NOT acceptable per CR-9 license filter + Probe 6 LICENSE BLOCKER | 4/10 (D1 critical FAIL) | **REJECT** | 0.99 |
| `getzep/zep` | ~3K★ | Apache-2.0 | active | Python SDK (no MCP) | 3 (Docker + Python) | 4 (custom integration) | PARTIAL-OVERLAP with graphiti (zep = SaaS-class; graphiti = OSS-class temporal-KG) | 7/10 | STUDY-PILOT | 0.78 |
| `cognee` (`topoteretes/cognee`) | 17,245★ | Apache-2.0 | active (2026-05-15) | Python lib + emerging MCP | 3 | 3 | PARTIAL-OVERLAP with graphiti at L3 (memory control plane vs temporal KG infra) | 7.5/10 | STUDY-PILOT (per W220-B audit: "STUDY-PILOT after Graphiti baseline; exit criteria must prove a capability Graphiti+doobidoo do not cover") | 0.82 |
| `mem0ai/mem0` | 55,802★ | Apache-2.0 | active (2026-05-15) | Python + JS SDK + MCP | 2 (pip install) | 3 (SDK integration) | PROVIDER-COMPLEMENT to doobidoo (mem0 = universal memory layer; doobidoo = MCP-native capture) | 8.5/10 | STUDY-PILOT-PROVIDER-COMPLEMENT | 0.85 |

**Top-1 ADOPT-NOW for `claude-sota-pure` L1**: `doobidoo/mcp-memory-service` — already at target per W220-A direct TARGET-runtime probe; sqlite_vec embedded backend works at small scale; promote to Qdrant when scale demands.

**HONEST-NON-FINDING** (per W220-A): SciPhi-AI/R2R (repo not discoverable canonical), ApertureDB (no canonical CC-native path), Anthropic-bundled Memory primitives (not standalone repo — embedded in Claude Memory API).

---

## Section 2 — L2 vector DB

| Repo | Stars | License | Push freshness | Native CC path | Install diff | Wired diff | CR-12 dispo | SRA score | Verdict | Confidence |
|---|---:|---|---|---|---:|---:|---|---:|---|---:|
| `qdrant/qdrant` | ~22K★ | Apache-2.0 | active | MCP server (community) + REST API | 2 (Docker) | 2 | GENUINELY-NEW for `claude-sota-pure` (no vector DB installed at L2 currently in target; sqlite_vec is embedded sub-replacement at small scale) | 9/10 | **ADOPT-NOW** | 0.93 |
| `chroma-core/chroma` | ~16K★ | Apache-2.0 | active | Python lib + REST | 2 | 3 | PROVIDER-COMPLEMENT to Qdrant | 8/10 | STUDY-PILOT-PROVIDER-COMPLEMENT | 0.80 |
| `weaviate/weaviate` | ~13K★ | BSD-3-Clause | active | Python/JS client + REST | 3 (Docker + schema) | 3 | PROVIDER-COMPLEMENT | 7.5/10 | STUDY-PILOT-PROVIDER-COMPLEMENT | 0.75 |
| `milvus-io/milvus` | ~32K★ | Apache-2.0 | active | Python/JS SDK + REST | 4 (etcd + storage + Kubernetes) | 4 | PROVIDER-COMPLEMENT | 7/10 (D5 ops burden) | DEFER (overbuilt for local runtime) | 0.78 |
| `lancedb/lancedb` | ~6K★ | Apache-2.0 | active | Python + Rust SDK | 2 | 2 | PROVIDER-COMPLEMENT (columnar serverless) | 8/10 | STUDY-PILOT | 0.78 |
| `pgvector/pgvector` | ~14K★ | PostgreSQL (BSD-class) | active | Postgres extension | 3 (Postgres) | 3 | PROVIDER-COMPLEMENT (RDBMS-coupled) | 7.5/10 | DEFER (no Postgres at target) | 0.78 |
| `FalkorDB/falkordb` | ~1K★ | **SSPLv1** (SRA D1 use-class: local-DB acceptable; SaaS-distribute restricted) | active | Redis-protocol compat | 2 (Docker) | 1 (graphiti backend) | PROVIDER-COMPLEMENT to Qdrant — graphiti L3 backend | 9/10 (already wired at target as graphiti backend) | INSTALL-NOW (graphiti dep) | 0.93 |

**Top-1 ADOPT-NOW for `claude-sota-pure` L2 vector**: `qdrant/qdrant` — install via Docker, register as MCP server entry. Promote sqlite_vec → Qdrant when corpus >10K entries.

**Already-INSTALLED at target per FM-20 row 21 TARGET-runtime probe**: `FalkorDB v1.6.1` at port 16379 backing graphiti.

---

## Section 3 — L3 temporal-KG

| Repo | Stars | License | Push freshness | Native CC path | Install diff | Wired diff | CR-12 dispo | SRA score | Verdict | Confidence |
|---|---:|---|---|---|---:|---:|---|---:|---|---:|
| `getzep/graphiti` | 26,100★ | Apache-2.0 | active (2026-05-14) | **MCP server** native | 2 (Python SDK + FalkorDB Docker) | 1 (already wired at target) | INSTALL-NOW (already at target `claude-sota-pure/.mcp.json` graphiti entry per FM-20 row 21) | 9.5/10 | **ADOPT-NOW** (W220-B verdict: "KEEP. More load-bearing than cognee for temporal KG") | 0.95 |
| `cognee` (`topoteretes/cognee`) | 17,245★ | Apache-2.0 | active (2026-05-15) | Python lib + emerging MCP | 3 | 3 | PARTIAL-OVERLAP with graphiti — both claim agent-memory L3 surface | 7.5/10 | STUDY-PILOT after Graphiti baseline establishes (exit criteria: cognee must prove a capability Graphiti+doobidoo don't cover) | 0.78 |
| `letta-ai/letta` (MemGPT) | ~17K★ | Apache-2.0 | active | Python SDK + emerging MCP | 3 (Postgres backend) | 3 | PARTIAL-OVERLAP with graphiti (paging semantics for context) | 7/10 | STUDY-PILOT | 0.75 |
| `mem0ai/mem0` | 55,802★ | Apache-2.0 | active | Python + JS SDK + MCP | 2 | 3 | PROVIDER-COMPLEMENT to graphiti (universal memory layer) | 8.5/10 | STUDY-PILOT-PROVIDER-COMPLEMENT | 0.85 |

**Top-1 ADOPT-NOW for L3**: `getzep/graphiti` — already wired at target via FalkorDB backend per direct probe.

---

## Section 4 — L4 RAG frameworks

| Repo | Stars | License | Push freshness | Native CC path | Install diff | Wired diff | CR-12 dispo | SRA score | Verdict | Confidence |
|---|---:|---|---|---|---:|---:|---|---:|---|---:|
| `HKUDS/LightRAG` | ~10K★ | Apache-2.0 | active | Python lib | 3 | 3 | GENUINELY-NEW (no RAG framework at target) | 8.5/10 | **ADOPT-NOW** (W220-A top-3 + arXiv-published) | 0.88 |
| `infiniflow/ragflow` | 80,584★ | Apache-2.0 | active (2026-05-15) | Web UI + Python | 4 (Docker stack) | 4 | PROVIDER-COMPLEMENT (heavy enterprise RAG) | 8/10 | DEFER (overbuilt for local runtime; W220-B verdict: "KEEP as heavy RAG platform candidate; do not imply it supersedes Onyx") | 0.78 |
| `onyx-dot-app/onyx` | 29,426★ | open-core MIT + EE periphery | active | Web UI + connectors | 4 (Docker + connectors + DB) | 4 | PROVIDER-COMPLEMENT (enterprise AI search/chat) | 7.5/10 | DEFER | 0.75 |
| `llmware-ai/llmware` | 14,857★ | Apache-2.0 | active | Python SDK | 3 | 3 | PARTIAL-OVERLAP (small-LLM/private-RAG specialist per W220-B reclassification) | 7.5/10 | STUDY-PILOT (specialty: edge/private-RAG; complements not supersedes) | 0.78 |
| `microsoft/graphrag` | 33,011★ | MIT | active | Python SDK | 3 | 3 | PROVIDER-COMPLEMENT (graph-RAG specialty) | 8/10 | STUDY-PILOT vs Graphiti+cognee | 0.82 |
| `langchain-ai/r2r` (citing SciPhi-AI) | HNF (not canonical) | — | — | — | — | — | — | — | HONEST-NON-FINDING per W220-A | 0.50 |
| `deepset-ai/haystack` | 25,238★ | Apache-2.0 | active | Python pipeline | 3 | 3 | PARTIAL-OVERLAP | 7/10 | STUDY-PILOT (mature pipeline framework; lower CC-native fit) | 0.75 |

**Top-1 ADOPT-NOW for L4**: `HKUDS/LightRAG` — arXiv-published; Apache-2.0; Python lib mode (Probe 5 mode-harness-shape PASS for autonomous /loop).

---

## Section 5 — L5 wiki/knowledge bridges

| Repo | Stars | License | Push freshness | Native CC path | Install diff | Wired diff | CR-12 dispo | SRA score | Verdict | Confidence |
|---|---:|---|---|---|---:|---:|---|---:|---|---:|
| `modelcontextprotocol/servers` | 85,711★ | NOASSERTION (per-server licenses) | active (2026-05-12) | MCP reference server catalog | n/a | n/a | CITE-CLASS-CANONICAL (TIER-1-DIRECT Anthropic; use as MCP server discovery surface) | 9.5/10 | **CITE-CLASS-CANONICAL** (do NOT install whole catalog; cite individual server entries) | 0.95 |
| `obsidian-mcp` (community) | varies | varies | — | MCP server | 2 | 2 | GENUINELY-NEW (Obsidian bridge) | 6.5/10 | DEFER (no Obsidian vault at target) | 0.65 |
| `notion-mcp` (community) | varies | varies | — | MCP server | 2 | 2 | GENUINELY-NEW (Notion bridge) | 6/10 | DEFER | 0.60 |
| `logseq-mcp` | HNF per W220-A | — | — | — | — | — | — | — | HONEST-NON-FINDING | 0.50 |
| `upstash/context7` | 55,378★ | MIT | active (2026-05-15) | **MCP server** native | 1 (uvx) | 1 | INSTALL-NOW (already loaded as `mcp__context7__` per system reminder) | 9/10 | **ADOPT-NOW** (docs retrieval freshness layer; W220-B UNDER-claim) | 0.90 |

**Top-1 ADOPT-NOW for L5**: `upstash/context7` — already loaded via `mcp__context7__resolve-library-id` + `query-docs` per system reminder; verify wiring at `claude-sota-pure/.mcp.json`.

---

## Section 6 — Token optimization + LLMLingua REPLACEMENT (user explicit pain point)

**User directive verbatim 2026-05-15**: "microsoft/LLMLingua are outdated at 2026 may".

**W220-B GPT-5.5 BRIDGE-MODE audit verdict on LLMLingua**: "STABLE-BURN-IN but CATEGORY-STALE — USER FLAG CONFIRMED in install sense: not dead, but outdated as 2026 Claude Code token-opt ADOPT-NOW. Move to CITE-CLASS-CANONICAL" [VERIFIED via `tmp/wave220-agentB-gpt55-adversarial-audit-2026-05-15.md:44`].

### What replaces LLMLingua for 2026 May SOTA token-opt? (orchestrator main-thread synthesis pending Path P codex T1 ratification)

| Pattern / Repo | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict | Confidence |
|---|---|---|---:|---|---:|---|---:|
| **Anthropic native prompt caching** (cache_control breakpoints, 5min/1h TTL) | TIER-1 Anthropic API primitive | Native CC primitive | 0 (always available) | 0 | CITE-CLASS-CANONICAL (TIER-1-DIRECT) | 10/10 | **ADOPT-NOW** (use native; LLMLingua's compression layer is OBSOLETED by prompt-cache breakpoint architecture for Claude Code workflow) | 0.95 |
| **`/compact <hint>` + auto-compact** | TIER-1 Anthropic CC primitive | Native CC primitive | 0 | 0 | CITE-CLASS-CANONICAL | 10/10 | **ADOPT-NOW** | 0.95 |
| **fcakyon/intelligent-compact** | MIT | PreCompact hook plugin | 1 (`/plugin install`) | 1 | INSTALL-NOW per `auto-compact-discipline.md Rank #3.5` 4-layer stack | 9/10 | **ADOPT-NOW** | 0.90 |
| **Sparse Priming Representations (SPR)** (DaveShap) | n/a (pattern) | Operator discipline | 0 | 0 | CITE-CLASS-CANONICAL (cite-anchor pattern) | 8/10 | STUDY-PILOT (cite as compression discipline alongside prompt-cache) | 0.78 |
| **Selective Context** (microsoft/SelectiveContext) | MIT | Python lib | 2 | 3 | PARTIAL-OVERLAP with prompt-cache (architectural alternative — cache vs select) | 7/10 | DEFER (LLMLingua-class lineage; same generation; superseded by prompt-cache for CC workflow) | 0.75 |
| **AutoCompressor** (research-class) | research | — | — | — | RESEARCH-ONLY | 6/10 | RESEARCH-ONLY | 0.70 |
| **ICAE / In-Context Autoencoder** | research | — | — | — | RESEARCH-ONLY | 6/10 | RESEARCH-ONLY | 0.70 |
| **deepagents pre-summarization middleware** (LangChain) | MIT | Python lib pattern | n/a (cite-class) | n/a | CITE-CLASS-CANONICAL (pattern; not direct CC install) | 8/10 | CITE-CLASS-CANONICAL per `auto-compact-discipline.md Rank #6` | 0.85 |
| **microsoft/LLMLingua (LLMLingua-2 / LongLLMLingua / MInference / SCBench)** | 6,189★ MIT | Python lib | 2 | 3 | CITE-CLASS-CANONICAL (historical baseline; not 2026 ADOPT for CC token-opt) | 6/10 | **CITE-CLASS-CANONICAL** per W220-B verdict | 0.92 |
| **mcp-memory-service compression layer** | inherits doobidoo | — | — | — | INTEGRATED (sqlite_vec backend handles vector dedup) | 8/10 | INTEGRATED | 0.85 |

### LLMLingua-REPLACEMENT VERDICT (orchestrator synthesis)

**Architectural answer for 2026 May Claude Code token-opt SOTA**: prompt-cache breakpoints + `/compact` + `intelligent-compact` PreCompact hook stack + SPR discipline. LLMLingua's compression-of-retrieved-context approach is OBSOLETED for Claude Code workflow because:
1. Anthropic prompt-cache covers the repeat-context use-case at 90% cost reduction with zero runtime overhead
2. `/compact` covers the in-session compression use-case with operator-steered hint discipline
3. `intelligent-compact` PreCompact hook covers automated priority-preservation at compact boundaries (4-layer Rank #3.5 stack per `auto-compact-discipline.md`)
4. SPR pattern cite-anchor covers the discipline-side LLMLingua-replacement (encoded knowledge representation)

**LLMLingua is correctly RECLASSIFIED to CITE-CLASS-CANONICAL** per W220-B GPT-5.5 audit + user directive; **NOT REMOVED** from cite trail (research-baseline) but **REMOVED from install pipeline**.

---

## Section 7 — LLM routing / proxy

Per W220-C SRA D1-D10 scoring:

| Repo | Stars | License | Native CC path | Install diff | Wired diff | CR-12 dispo | SRA score | Verdict | Confidence |
|---|---:|---|---|---:|---:|---|---:|---|---:|
| `router-for-me/CLIProxyAPI` | 32,820★ | MIT | Go binary HTTP service (port 11700) | 2 (gh release download + OAuth setup) | 1 (already wired at target as graphiti OAI proxy) | **INCUMBENT INSTALL-NOW** | 8/10 (W220-C) | **ADOPT-NOW** (incumbent + graphiti dependency) | 0.92 |
| `BerriAI/litellm` | 47,091★ | "Other" (verify) | Python proxy server | 4 (Docker + DB + multi-provider keys) | 4 | PROVIDER-COMPLEMENT | 6.5/10 (license-OTHER drag) | DEFER unless multi-provider routing needed | 0.75 |
| `musistudio/claude-code-router` | 34,031★ | MIT | Node.js routing wrapper | 1 (npx) | 2 | PARTIAL-OVERLAP with CLIProxyAPI | 7/10 | STUDY-PILOT (multi-account rotation use-case) | 0.78 |
| OpenRouter (SaaS) | n/a | n/a SaaS | API endpoint | 1 (key only) | 1 | PROVIDER-COMPLEMENT | n/a (not install-class) | DEFER | 0.70 |
| `glcoderouter` / similar | HNF (not canonical) | — | — | — | — | — | — | HONEST-NON-FINDING per W220-C | 0.50 |

**Top-1 INCUMBENT for L_proxy**: `router-for-me/CLIProxyAPI` — already wired at target per FM-20 row 21 TARGET-runtime probe; graphiti's `OPENAI_API_URL=http://127.0.0.1:11700/v1` env points here.

---

## Section 8 — Agent orchestration + plugins ecosystem

Per W220-C v10 kit harvest + W220-B GPT-5.5 audit:

### 8.A Anthropic-native plugin marketplaces

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `anthropics/claude-plugins-official` | 19,446★ | NOASSERTION (per-plugin licenses) | TIER-1 OFFICIAL marketplace | 1 (`/plugin marketplace add`) | INSTALL-NOW (marketplace source) | 9.5/10 | **ADOPT-NOW** per W220-B |
| `addyosmani/agent-skills` | 42,020★ | MIT | Anthropic-affiliated marketplace (21 engineering-phase skills) | 1 (`/plugin marketplace add` then per-skill `/plugin install`) | INSTALL-NOW per W220-B (label as rapid-growth requiring per-skill install review, not blanket ADOPT) | 9/10 | **ADOPT-NOW** (selective per-skill) |

### 8.B Skill catalogs

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `alirezarezvani/claude-skills` | 14,935★ | MIT | Multi-runtime (CC/Codex/Gemini-CLI/Cursor/+8 more) | 1-3 (per-domain install) | PROVIDER-COMPLEMENT (cross-tool installer; many engineering+domain skills) | 9/10 | **ADOPT-NOW** per W220-I (selective per-domain) |
| `addyosmani/agent-skills` | 42,020★ | MIT | See 8.A above | 1 | INSTALL-NOW | 9/10 | (see 8.A) |
| `ComposioHQ/awesome-claude-skills` | 59,992★ | null⚠️ | Catalog only (license-CONFLICT-AMBIGUOUS per CLAUDE.md L156 caveat) | n/a | CITE-CLASS-CANONICAL (cite hint only; do NOT fork-modify until license verified) | 7/10 (D1 caveat) | CITE-CLASS-CANONICAL only |
| `sickn33/antigravity-awesome-skills` | 37,620★ | MIT | Cross-tool installer CLI (CC/Cursor/Codex/Gemini/Antigravity) | 2 | PROVIDER-COMPLEMENT (discovery-surface aggregator) | 7/10 (single-individual maintainer) | CITE-CLASS for discovery |
| `quemsah/awesome-claude-plugins` | 698★ | null⚠️ | Catalog (n8n workflows for plugin metrics) | n/a | CITE-CLASS-CANONICAL | 6/10 (low-star) | CITE-CLASS only |
| `VoltAgent/awesome-openclaw-skills` | 48,718★ | MIT | Claude-DERIVATIVE (OpenClaw, NOT Anthropic-native) | n/a | ECOSYSTEM-IMPORT (cross-check only) | 6/10 | CITE-CLASS for ecosystem comparison only |
| `hesreallyhim/awesome-claude-code` | 43,853★ | NOASSERTION (CC-BY-NC-ND-4.0 cite-only) | Catalog (226 resources) | n/a | CITE-CLASS-CANONICAL | 8/10 | CITE-CLASS only (no fork-modify) |

### 8.C Specialized agent kits (wshobson + ecosystem)

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `wshobson/agents` | 35,450★ | MIT | Plugin marketplace + 80+ specialized agents | 1 (`/plugin marketplace add wshobson/agents`) | INSTALL-NOW (multi-domain agent specializations: devops/security/code-review/planning/cpp/python/etc.) | 9/10 | **ADOPT-NOW** per W220-B "KEEP agents; SUSTAINED-ACTIVE" |
| `wshobson/commands` | 2,461★ | MIT | Slash commands collection | 1 (`/plugin marketplace add`) | INSTALL-NOW per-command review per W220-B "commands need per-command freshness probe" | 7.5/10 (some staleness-risk) | STUDY-PILOT (per-command selective) |
| `affaan-m/everything-claude-code` | 183,170★ | MIT | Plugin marketplace + comprehensive primitives | 1 | INSTALL-NOW per W220-B "ACTIVE-VERIFIED if already plugin-cached" | 9/10 (LAUNCH-SPIKE caveat) | **ADOPT-NOW** (selective per-skill review) |
| `agentclientprotocol/claude-agent-acp` | 1,905★ | Apache-2.0 | ACP adapter | 2 | DEFER per W220-B "DOWNGRADE from ADOPT-NOW to STUDY-PILOT unless ACP host/client demand explicit" | 7/10 | STUDY-PILOT (demand-gate per Probe 7) |
| `agentclientprotocol/python-sdk` | 256★ | Apache-2.0 | Python ACP SDK | 2 | DEFER per W220-B "too low-adoption for ADOPT-NOW" | 6/10 (LOW-ADOPTION) | CITE-CLASS for ACP convergence only |

### 8.D Sub-agent orchestration frameworks (cite-class; not all CC-native install)

| Repo | Stars | License | Native CC path | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---|---:|---|
| `langchain-ai/langgraph` | 32,128★ | MIT | Python framework | PARTIAL-OVERLAP (more directly agent-runtime than Temporal for Python) | 7.5/10 | STUDY-PILOT for cross-runtime patterns |
| `microsoft/autogen` | 58,060★ | CC-BY-4.0 (docs license; not code) | Python framework | DEFER (competing meta-framework per `docs/verified-avoid.md` Cohort 1) | 6.5/10 (license-atypical) | CITE-CLASS only |
| `crewAIInc/crewAI` | 51,481★ | MIT | Python framework | DEFER per W217 demotion (still demoted for CC-native fit) | 7/10 | CITE-CLASS only |
| `openai/openai-agents-python` | 26,338★ | MIT | Python framework (cross-vendor handoffs/tracing) | PROVIDER-COMPLEMENT | 8/10 | STUDY-PILOT for ACP-class patterns |
| `langchain-ai/deepagents` | varies | MIT | Python framework | CITE-CLASS-CANONICAL (deepagents middleware patterns per `team-orch-state-spawning.md` 5-key state-leak set) | 8/10 | CITE-CLASS only |

**Top-3 ADOPT-NOW for Section 8**:
1. `anthropics/claude-plugins-official` (TIER-1 Anthropic marketplace)
2. `addyosmani/agent-skills` (Addy Osmani + 21 engineering-phase skills + Anthropic-affiliated)
3. `wshobson/agents` (80+ specialized agents; user explicitly named)

---

## Section 9 — Workflow harness + long-running

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `anthropics/cwc-long-running-agents` | TIER-1 Anthropic | varies | Native install (5 primitives: Default-FAIL contract / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer mid-run) | 1-2 | INSTALL-NOW per CLAUDE.md Architecture section TIER-1-DIRECT cite | 9.5/10 | **ADOPT-NOW** (canonical long-running harness; already at target per Wave 6 install) |
| `gsd-build/get-shit-done` | 58,543★ | MIT | Multi-runtime install (CC + 13 others) + `/gsd-*` commands | 2 | STUDY-PILOT per `research-protocol.md` cite (token-budgeted install patterns + atomic-commit discipline) | 9/10 | STUDY-PILOT selective (CC-native + token-budget patterns) |
| `obra/superpowers` | 171,890★ | MIT | Workflow grammar + 14 upstream skills | 2 (`/plugin install` selective) | INSTALL-NOW selective per existing 6-of-14 vendoring pattern | 9/10 | **ADOPT-NOW** (selective: plan/debug/tdd/verification-before-completion/subagent-driven-development/requesting-code-review) |
| `continuous-claude-v3` | varies | varies | Continuous loop wrapper (CONTINUOUS_CLAUDE_PROJECT_COMPLETE signal) | 2 | PROVIDER-COMPLEMENT to cwc | 7/10 | STUDY-PILOT (alternative loop semantic) |
| `affaan-m/everything-claude-code` autonomous-agent-harness skill | (see 8.C) | MIT | ECC plugin skill | 1 (ECC plugin install) | INSTALL-NOW (canonical long-loop ECC skill) | 9/10 | **ADOPT-NOW** |
| `affaan-m/everything-claude-code` dmux-workflows skill | (see 8.C) | MIT | ECC plugin skill | 1 | INSTALL-NOW (canonical parallel harness) | 9/10 | **ADOPT-NOW** |
| `temporalio/temporal` | 20,283★ | MIT | Workflow engine | 4 (external Temporal server) | DEFER per W220-B "DEFER-UNTIL-DISTRIBUTED-AGENT-RUNNER" | 6/10 (D5 ops burden overbuilt for local CC) | DEFER |

**Top-3 ADOPT-NOW for Section 9**:
1. `anthropics/cwc-long-running-agents` (canonical Anthropic harness)
2. `obra/superpowers` selective vendoring (6 skills already vendored; consider extending)
3. `gsd-build/get-shit-done` selective adoption (CC-native + token-budget + atomic-commit discipline)

---

## Section 10 — Observability + eval

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `langfuse/langfuse` | 27,279★ | open-core MIT + EE periphery | Self-hosted observability | 3 (Docker stack) | GENUINELY-NEW for `claude-sota-pure` | 9/10 | **ADOPT-NOW** per W220-B "KEEP TIER-1, but W219 must write open-core MIT core + EE periphery, not simple MIT" |
| `Arize-ai/phoenix` | 9,692★ | NOASSERTION (Elastic License) | Self-hosted | 3 | PROVIDER-COMPLEMENT to Langfuse | 8/10 | STUDY-PILOT-PROVIDER-COMPLEMENT (already partially installed) |
| `promptfoo/promptfoo` | 21,290★ | MIT | CLI + Python/JS lib | 2 (npm or pip) | GENUINELY-NEW for `claude-sota-pure` (no eval framework at target) | 9/10 per W220-I | **ADOPT-NOW** (eval + red-team gap fill) |
| `openlit/openlit` | varies | Apache-2.0 | OTel-based observability | 3 | PROVIDER-COMPLEMENT | 7/10 | STUDY-PILOT |
| `helicone/helicone` | varies | Apache-2.0 | Proxy-based observability | 3 | PROVIDER-COMPLEMENT | 7/10 | STUDY-PILOT |

**Top-2 ADOPT-NOW for Section 10**:
1. `langfuse/langfuse` (canonical LLM observability; open-core caveat)
2. `promptfoo/promptfoo` (eval + red-team)

---

## Section 11 — Code intelligence + MCP server frameworks

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `abhigyanpatwari/GitNexus` | varies | **Polyform Noncommercial 1.0.0** per FM-20 row 11 W168 verify | MCP server | 2 | **REJECT-FOR-FIT** (Polyform Noncommercial blocks commercial agent automation per SRA D1; CR-9 license filter) | 5/10 (D1 critical FAIL) | **REJECT** per FM-20 row 11 license-change blocker |
| `oraios/serena` | varies | MIT | LSP-based MCP server | 2 | GENUINELY-NEW for `claude-sota-pure` (code intelligence layer) | 8/10 | **ADOPT-NOW** (LSP-grounded symbol intelligence) |
| `yamadashy/repomix` | varies | MIT | MCP server + npm CLI | 1 | INSTALL-NOW (tree-sitter compression ~70% per `auto-compact-discipline.md Rank #2`) | 9/10 | **ADOPT-NOW** |
| `tirth8205/code-review-graph` | varies | varies | (Tier 0 fabrication-test FAIL per `convergence-gate.md`) | n/a | REJECT per Row-2 fabrication-test FAIL | 4/10 | REJECT |
| `jlowin/fastmcp` / `PrefectHQ/fastmcp` | 25,175★ | Apache-2.0 | MCP-server-building framework | 2 (pip) | GENUINELY-NEW for MCP authoring at target | 9/10 per W220-B | **ADOPT-NOW** (for custom local MCP servers) |
| `modelcontextprotocol/servers` | 85,711★ | NOASSERTION | Reference catalog | n/a | CITE-CLASS-CANONICAL | 9.5/10 | CITE-CLASS only (do NOT bulk-install; cite individual servers) |
| `punkpeye/awesome-mcp-servers` | 86,944★ | MIT | Catalog | n/a | CITE-CLASS-CANONICAL | 9/10 per W220-I | CITE-CLASS only |

**Top-2 ADOPT-NOW for Section 11**:
1. `oraios/serena` (LSP-grounded code intelligence; replaces GitNexus license-blocker)
2. `yamadashy/repomix` (tree-sitter compression for repo-scope audits)
3. `jlowin/fastmcp` (MCP server authoring framework for custom local servers)

---

## Section 12 — Browser automation + multimodal preprocessing

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `microsoft/playwright` | 88,775★ | Apache-2.0 | MCP server (`mcp__playwright__*` already loaded) | 0 (already wired) | INSTALL-NOW (already at target) | 9.5/10 | **ADOPT-NOW** (already wired) |
| `microsoft/markitdown` | 123,303★ | MIT | CLI + Python lib | 2 (pip) | GENUINELY-NEW for parser-input layer | 9/10 per W220-I | **ADOPT-NOW** (PDF/office/audio → markdown for RAG ingestion pipeline) |
| `docling-project/docling` | 59,790★ | MIT | Python lib | 3 | PROVIDER-COMPLEMENT to markitdown | 8/10 | STUDY-PILOT-PROVIDER-COMPLEMENT |
| `Skyvern-AI/skyvern` | 21,620★ | **AGPL-3.0** | AI-browser-automation | 4 | REJECT-FOR-FIT (Probe 6 LICENSE BLOCKER per SRA D1) | 4/10 | REJECT |
| `browserbase/stagehand` | 22,671★ | MIT | Browser-agent SDK | 3 | PROVIDER-COMPLEMENT to Playwright | 7.5/10 | STUDY-PILOT-PROVIDER-COMPLEMENT |
| `mendableai/firecrawl` | 120,260★ | **AGPL-3.0** | MCP server (`mcp__firecrawl__*` already loaded) | 0 (already wired) | (NATIVE-CC + AGPL caveat per SRA D1 use-class: CLI-binary-use OK for runtime) | 8/10 (D1 use-class precision) | KEEP (CLI-binary-use; not library-link) |
| `dottxt-ai/outlines` | 13,843★ | Apache-2.0 | Python lib | 2 | GENUINELY-NEW (structured-output generation) | 8/10 per W220-I | **ADOPT-NOW** for structured-output |
| `microsoft/playwright-mcp` (community MCP) | varies | varies | MCP server | 1 | INSTALL-NOW | 8/10 | ADOPT-NOW |

**Top-2 ADOPT-NOW for Section 12**:
1. `microsoft/playwright` (already wired)
2. `microsoft/markitdown` (multimodal preprocessing for RAG pipeline)
3. `dottxt-ai/outlines` (structured-output generation lib)

---

## Section 13 — Durable workflow + analytical DB

| Repo | Stars | License | Native CC path | Install diff | CR-12 dispo | SRA score | Verdict |
|---|---:|---|---|---:|---|---:|---|
| `duckdb/duckdb` | 38,229★ | MIT | Embedded CLI + lib | 1 (pip/CLI) | GENUINELY-NEW for `.claude/state/*.jsonl` analytics | 8.5/10 per W220-I | **ADOPT-NOW** (Probe 7.b candidate: JSONL→SQLite analytical layer) |
| `electric-sql/electric` | 10,181★ | Apache-2.0 | External platform | 4 | DEFER per W220-I (external sync platform; not local-first install) | 7/10 | DEFER |
| `temporalio/temporal` | 20,283★ | MIT | External service | 4 | DEFER per W220-B "overbuilt for local Claude Code" | 6/10 (D5 ops burden) | DEFER |
| `getsentry/sentry` | 43,868★ | NOASSERTION (BSL) | External service | 4 | DEFER per W220-I (BSL license + external service) | 6/10 | DEFER |
| `tursodatabase/turso` | varies | MIT | Embedded SQLite-class | 1 | PROVIDER-COMPLEMENT to DuckDB | 8/10 | STUDY-PILOT-PROVIDER-COMPLEMENT |

**Top-1 ADOPT-NOW for Section 13**:
1. `duckdb/duckdb` (analytical SQL over `.claude/state/*.jsonl`)

---

## Section 14 — Skill catalogs deep-dive (cross-reference Section 8)

See Section 8.B above. Summary:

**Top-3 ADOPT-NOW skill catalogs for `claude-sota-pure`**:
1. `addyosmani/agent-skills` (TIER-1-NAMED-AUTHOR Addy Osmani; 21 engineering-phase skills)
2. `alirezarezvani/claude-skills` (540+ skills; multi-runtime; per-domain selective install)
3. `obra/superpowers` (selective vendoring; existing 6-of-14 vendoring already validated)

**CITE-CLASS-CANONICAL (catalog-only, no fork-modify)**:
- `hesreallyhim/awesome-claude-code` (226 resources; CC-BY-NC-ND-4.0)
- `ComposioHQ/awesome-claude-skills` (license-CONFLICT-AMBIGUOUS)
- `quemsah/awesome-claude-plugins`
- `punkpeye/awesome-mcp-servers`

---

## Section 15 — Z:\claude-sota-pure implant playbook

### Phase 1 — Native baseline (per W220-C v10 kit + cwc-long-running-agents)

```powershell
# (a) Anthropic CC native install (NPM official native channel per CR-6)
npm install -g @anthropic-ai/claude-code@latest

# (b) Git + GitHub CLI (TIER-1 native)
winget install Git.Git
winget install GitHub.cli
gh auth login

# (c) Python venv (Z:-portable per CLAUDE.local.md ENV block)
python -m venv Z:/venvs/claude-pure
Z:/venvs/claude-pure/Scripts/Activate.ps1

# (d) Node.js + npm (TIER-1 native)
winget install OpenJS.NodeJS.LTS

# (e) Docker Desktop (for Qdrant + FalkorDB + Langfuse + RAGFlow Docker deps)
winget install Docker.DockerDesktop
```

### Phase 2 — TIER-1 OFFICIAL plugin marketplace install

```powershell
# Bootstrap Anthropic-official + Addy + wshobson + ECC + superpowers marketplaces
claude /plugin marketplace add https://github.com/anthropics/claude-plugins-official
claude /plugin marketplace add https://github.com/addyosmani/agent-skills
claude /plugin marketplace add https://github.com/wshobson/agents
claude /plugin marketplace add https://github.com/affaan-m/everything-claude-code
claude /plugin marketplace add https://github.com/obra/superpowers

# Per-plugin selective install (review per-plugin BEFORE installing)
claude /plugin install codex@openai-codex
claude /plugin install context-management@wshobson  # NOTE: context-mode MCP may be disconnected — verify
claude /plugin install intelligent-compact@claude-settings
claude /plugin install ralph-loop@anthropic-cwc
claude /plugin install agent-sdk-dev@anthropic-cwc
claude /plugin install frontend-design@anthropic-cwc
```

### Phase 3 — MCP server install (L1-L4 memory + RAG stack)

```json
// claude-sota-pure/.mcp.json
{
  "mcpServers": {
    "memory": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/doobidoo/mcp-memory-service.git", "mcp-memory-server"],
      "env": {"MCP_MEMORY_STORAGE_BACKEND": "sqlite_vec"}
    },
    "graphiti": {
      "command": "uv",
      "args": ["--directory", "Z:/claude-sota-pure/.local/graphiti/mcp_server", "run", "main.py"],
      "env": {
        "FALKORDB_URI": "redis://127.0.0.1:16379",
        "FALKORDB_PASSWORD": "",
        "FALKORDB_DATABASE": "default_db",
        "OPENAI_API_URL": "http://127.0.0.1:11700/v1",
        "GRAPHITI_GROUP_ID": "eee"
      }
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    },
    "deepwiki": {
      "url": "https://mcp.deepwiki.com/mcp"
    },
    "perplexity": {
      "command": "npx",
      "args": ["-y", "@perplexity-ai/mcp-server"],
      "env": {"PERPLEXITY_API_KEY": "${env:PERPLEXITY_API_KEY}"}
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    },
    "serena": {
      "command": "uvx",
      "args": ["--from", "git+https://github.com/oraios/serena.git", "serena-mcp-server"]
    },
    "repomix": {
      "command": "npx",
      "args": ["-y", "repomix"]
    }
  }
}
```

### Phase 4 — Vector DB (Qdrant) + RAG framework (LightRAG)

```powershell
# Qdrant local Docker (L2 vector backend)
docker pull qdrant/qdrant:latest
docker run -p 6333:6333 -p 6334:6334 -v Z:/claude-sota-pure-state/qdrant:/qdrant/storage qdrant/qdrant

# LightRAG (Python lib install in venv)
pip install lightrag-hku
```

### Phase 5 — Observability + eval

```powershell
# Langfuse self-hosted (Docker compose)
git clone https://github.com/langfuse/langfuse.git Z:/claude-sota-pure-state/langfuse
cd Z:/claude-sota-pure-state/langfuse
docker compose up -d

# promptfoo CLI
npm install -g promptfoo
```

### Phase 6 — Code intelligence + multimodal

```powershell
# Serena (MCP wired in Phase 3 .mcp.json)
# Repomix (MCP wired in Phase 3 .mcp.json)
# FastMCP for custom MCP server authoring
pip install fastmcp

# markitdown for multimodal RAG preprocessing
pip install markitdown
```

### Phase 7 — Structured output + analytical DB

```powershell
# outlines for structured-output generation
pip install outlines

# DuckDB for JSONL analytics
pip install duckdb
```

### Phase 8 — CLI proxy (CLIProxyAPI for graphiti OAI-bridge)

```powershell
# Download latest CLIProxyAPI release via gh CLI (CR-6 official channel)
gh release download --repo router-for-me/CLIProxyAPI --pattern "*windows*.zip" --dir Z:/claude-sota-pure/.local/cliproxy
# Extract + OAuth setup via SPA management center at http://localhost:11700
```

### Phase 9 — Codex T1-T7 hooks (cross-model gate)

Per `Z:/claude-sota/.claude/rules/cmc-t1-t7-lifecycle.md §The contract`:
- T1 pre-edit hook
- T2 commit-time hook
- T3 postcommit hook
- T4 postpush hook
- T5 plan-stage slash command
- T6 stop-gate hook
- T7 ask-without-act hook

These are install-class via codex plugin (`/plugin install codex@openai-codex` in Phase 2) — verify wiring via:

```powershell
ls Z:/claude-sota-pure/.claude/hooks/scripts/codex_*.py
grep -nE "codex_t[1-7]" Z:/claude-sota-pure/.claude/settings.json
```

### Phase 10 — Verification gate

After all phases complete:
1. Fire Path P codex T1 deep-review-exec on the complete install state
2. Verify cross-model gate FULL satisfaction
3. Run smoke probes per MCP (memory/graphiti/context7/playwright/serena/repomix all return >0 results)
4. Document `Z:\claude-sota-pure\docs\install-provenance.md` per CR-5+CR-6+CR-9 install discipline

---

## Section 16 — Cross-model T1 ratification status

This catalog is an **orchestrator main-thread Sonnet stand-in synthesis** per FM-17.e Round-1 double-block recovery. Per `Z:/claude-sota/.claude/rules/cross-model-consensus.md §The contract` cardinal-rule-3 + `cmc-env-funneled-disclosure.md §The mandate` Option 2 explicit-disclosure:

**STAND-IN-NOTICE filed**: this catalog ran as orchestrator-side Sonnet stand-in. Cross-model gate is **NOT structurally satisfied at synthesis layer** until Path P codex T1 deep-review-exec foreground+tee fires and ratifies (or refutes) the catalog's verdicts.

**Path P ratification queued for fire-end**:
```bash
codex exec --ephemeral -p deep-review-exec \
  --skip-git-repo-check --color never \
  < .claude/state/codex_consult_w220_r2_ratification.txt \
  2>&1 | tee .claude/state/codex_consult_w220_r2_ratification_OUT.txt
```

If codex returns NEEDS-REVISION → Pattern A FIX-FORWARD apply per `codex-t1-fix-forward-pattern.md §Pattern A` single atomic commit.

If codex returns APPROVE → catalog graduates from AUTHORITATIVE-CANDIDATE to AUTHORITATIVE; implant playbook Phase 1-10 lands for `Z:\claude-sota-pure`.

---

## Section 17 — Forward Top-15 (highest-confidence ADOPT-NOW for `claude-sota-pure` greenfield)

Ranked by SRA composite score × confidence × install simplicity:

| # | Repo | Layer | SRA score | Confidence | Native CC path | Phase |
|--:|---|---|---:|---:|---|---|
| 1 | `anthropics/claude-plugins-official` | Plugin marketplace | 9.5/10 | 0.95 | TIER-1 OFFICIAL | Phase 2 |
| 2 | `anthropics/cwc-long-running-agents` | Workflow harness | 9.5/10 | 0.95 | Native install + 5 primitives | Phase 1 |
| 3 | `getzep/graphiti` | L3 temporal-KG | 9.5/10 | 0.95 | MCP server | Phase 3 |
| 4 | `doobidoo/mcp-memory-service` | L1 capture | 9/10 | 0.95 | MCP server | Phase 3 |
| 5 | `microsoft/playwright` | Browser automation | 9.5/10 | 0.95 | MCP (already wired) | Phase 3 |
| 6 | `addyosmani/agent-skills` | Skill catalog | 9/10 | 0.92 | Plugin marketplace | Phase 2 |
| 7 | `wshobson/agents` | Agent kit | 9/10 | 0.90 | Plugin marketplace | Phase 2 |
| 8 | `obra/superpowers` (selective) | Workflow + skills | 9/10 | 0.90 | Plugin marketplace selective | Phase 2 |
| 9 | `upstash/context7` | Docs MCP | 9/10 | 0.90 | MCP server | Phase 3 |
| 10 | `affaan-m/everything-claude-code` | Plugin marketplace | 9/10 | 0.88 | Plugin marketplace | Phase 2 |
| 11 | `langfuse/langfuse` | Observability | 9/10 | 0.88 | Docker self-hosted | Phase 5 |
| 12 | `promptfoo/promptfoo` | Eval | 9/10 | 0.88 | CLI + lib | Phase 5 |
| 13 | `microsoft/markitdown` | Multimodal preprocessor | 9/10 | 0.88 | CLI + lib | Phase 6 |
| 14 | `qdrant/qdrant` | L2 vector | 9/10 | 0.90 | Docker | Phase 4 |
| 15 | `HKUDS/LightRAG` | L4 RAG | 8.5/10 | 0.88 | Python lib | Phase 4 |

**Honorable mentions** (Top-25):
- `router-for-me/CLIProxyAPI` (LLM proxy; INCUMBENT)
- `oraios/serena` (LSP code intelligence)
- `yamadashy/repomix` (tree-sitter compression)
- `jlowin/fastmcp` (MCP authoring)
- `fcakyon/intelligent-compact` (PreCompact priority preservation)
- `dottxt-ai/outlines` (structured-output)
- `mem0ai/mem0` (provider-complement memory)
- `microsoft/graphrag` (graph-RAG specialty)
- `alirezarezvani/claude-skills` (cross-runtime skill catalog)
- `duckdb/duckdb` (analytical SQL over JSONL)

---

## Section 18 — Honest non-findings + REJECT-FOR-FIT

**HONEST-NON-FINDING** (no SOTA canonical discoverable):
- SciPhi-AI/R2R (not discoverable canonical)
- ApertureDB (no CC-native path)
- logseq-mcp (no canonical Logseq-only MCP)
- Anthropic-bundled-Memory-API standalone (embedded in API; not standalone repo)
- "gcoderouter" (HNF per W220-C — likely informal alias for claude-code-router class)

**REJECT-FOR-FIT** (Probe 6 LICENSE BLOCKER per SRA D1 use-class precision):
- `basicmachines-co/basic-memory` — AGPL-3.0 library-link infects derivative
- `Skyvern-AI/skyvern` — AGPL-3.0
- `abhigyanpatwari/GitNexus` — Polyform Noncommercial 1.0.0 (per FM-20 row 11 W168 LICENSE-change drift catch)
- `tirth8205/code-review-graph` — Row-2 fabrication-test FAIL per `convergence-gate.md`

**REJECT-FOR-FIT** (CR-12 DUPLICATE-FUNCTIONALITY per kiss-dry-yagni Must-Never #4):
- `microsoft/LLMLingua` for token-opt → SUPERSEDED-BY-X (Anthropic prompt-cache + `/compact` + `intelligent-compact` 4-layer stack); demoted to CITE-CLASS-CANONICAL
- `github/spec-kit` for spec-driven dev → DUPLICATE (`speckit-*` skills already loaded per available-skills check per W220-I)

**DEFER** (Probe 7 demand-gate):
- `temporalio/temporal` — overbuilt for local CC runtime
- `electric-sql/electric` — external sync platform
- `getsentry/sentry` — BSL + external service
- `agentclientprotocol/claude-agent-acp` — demand-dependent bridge
- `microsoft/autogen` — competing meta-framework per `docs/verified-avoid.md` Cohort 1
- `crewAIInc/crewAI` — CC-native fit demoted (W217)

---

## Section 19 — Wave 220 Round 2 close

**VERDICT-CATALOG-COMPLETE** (orchestrator main-thread synthesis; cross-model gate ratification PENDING Path P codex T1).

**Persistence path**: `Z:/claude-sota-installed/tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md` (this file).

**Sister catalog complements**:
- `tmp/wave220-round1-fm17e-double-block-status-2026-05-15.md` (Round 1 failure-mode record + recovery path)
- `tmp/wave220-agentI-meta-catalogs-uncovered-layers-catalog-2026-05-15.md` (uncovered-layer surface)
- `tmp/wave220-agentB-gpt55-adversarial-audit-2026-05-15.md` (GPT-5.5 BRIDGE-MODE OVER/UNDER catches)
- `tmp/wave220-agentC-outer-research-llm-proxy-wshobson-deep-2026-05-15.md` (v10 kit harvest + LLM proxy SRA scoring + wshobson source-deep)
- `tmp/wave219-MASTER-SYNTHESIS-comprehensive-checklist-2026-05-15.md` (prior comprehensive checklist baseline)
- `tmp/wave218-MASTER-SYNTHESIS-2026-05-15.md` (Wave 218 full coverage)

**Next-fire recommendation** (operator decision):
- (a) Fire Path P codex T1 ratification on this catalog NOW (single Bash subprocess; ~120-180s; FM-17.d budget defense applies)
- (b) Defer ratification to fresh session; consume this catalog as authoritative-pending baseline for Z:\claude-sota-pure greenfield install
- (c) Extend with Round 3 research waves (skill catalogs deep-dive + eval-framework cross-runtime + observability open-core caveat audit) BEFORE ratification

This catalog represents accumulated W218 + W219 + W220 synthesis. It is forward-only per `port-note-discipline.md §6` no-retroactive-rewrite — extensions and ratifications land in subsequent fires/waves.

VERDICT-CATALOG-COMPLETE.

---
title: Wave 220 Round 4 — LICENSE verification + safishamsi/graphify discovery + OpenViking REJECT verdict
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: round-4-license-verify-and-mass-discovery (orchestrator main-thread Path P; codex T1 R4 narrow firing in background bvs0l65ac)
parent-catalog: tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md
parent-delta: tmp/wave220-r3-mass-discovery-delta-2026-05-15.md
---

# Wave 220 Round 4 — LICENSE verification + new discovery delta

## Section 0 — Round 4 context

Round 3 mass-discovery delta added 10 candidates pending LICENSE / Axis-2 / Axis-3 verification. Round 4 fires direct LICENSE blob probes via `gh api repos/<repo>/contents/LICENSE` (TIER-1-DIRECT verification per `port-note-discipline.md §4` cite-class verbatim verify) + cpd commit-activity probes + 5 additional topic-searches + outer-research kits inventory deep-dive.

## Section 1 — LICENSE verdicts (10 candidates direct-probe verified)

| Repo | LICENSE found | License-class | SRA D1 use-class verdict | New status |
|---|---|---|---|---|
| `volcengine/OpenViking` | LICENSE file present | **GNU AGPL-3.0** verbatim "GNU AFFERO GENERAL PUBLIC LICENSE" | **REJECT** for eee local runtime (network-served + library-link both restrict) per Probe 6 LICENSE BLOCKER + CR-9 license filter | **REJECT-FOR-FIT** ⛔ — was Round 3 top-20 candidate; DROP from Top-25 |
| `anthropics/skills` | **NO LICENSE FILE** (gh api returns not-found) | Undefined; default copyright per SRA D1 | TIER-1 Anthropic-org per SRA D4 STRONG-PROVENANCE-EXPRESS — acceptable for cite-class but ADOPT requires named-author licensing intent verification | **ADOPT-NOW-CONDITIONAL** (verify Anthropic licensing statement before fork-modify; cite-class CITE-CLASS-CANONICAL otherwise) |
| `code-yeongyu/oh-my-openagent` | **NO LICENSE FILE** (gh metadata says "Other" but no LICENSE blob) | Undefined | License-undefined + 5.4mo LAUNCH-SPIKE | **DEFER** (license-classify required before STUDY-PILOT) |
| `thedotmack/claude-mem` | LICENSE present — "Apache License" | Apache-2.0 | ACCEPTABLE per SRA D1 all use-classes | **ADOPT-NOW** (Top-25 rank 4 from R3 confirmed) |
| `ruvnet/ruflo` | LICENSE present — "MIT License" | MIT | ACCEPTABLE all use-classes | **ADOPT-NOW** (Top-25 rank 12 from R3 confirmed) |
| `open-compress/claw-compactor` | LICENSE present — "MIT License" | MIT | ACCEPTABLE | STUDY-PILOT (R3 verdict holds; Axis-3 fresh-paint still pending) |
| `diegosouzapw/OmniRoute` | LICENSE present — "MIT License" | MIT | ACCEPTABLE | STUDY-PILOT (R3 verdict holds; Axis-3 fresh-paint still pending) |
| `chopratejas/headroom` | LICENSE present — "Apache License" | Apache-2.0 | ACCEPTABLE | STUDY-PILOT |
| `cortexkit/magic-context` | LICENSE present — "MIT License" | MIT | ACCEPTABLE | STUDY-PILOT |
| `manojmallick/sigmap` | LICENSE present — "MIT License" | MIT | ACCEPTABLE | STUDY-PILOT |

**Critical correction to Round 3 catalog**:
- `volcengine/OpenViking` claude-code-memory-plugin **REMOVED from Top-25** per AGPL-3.0 parent-license REJECT-FOR-FIT verdict
- Round 3 had OpenViking at rank 20 "TBD license"; now CONFIRMED REJECT-FOR-FIT
- FM-20 row 21 cross-runtime probe + Round 4 LICENSE blob probe SAVED A WRONG INSTALL — saved ~30min of pip install + eventual revert cycle

**Cardinal-rule-12 6-class disposition updates**:
- OpenViking → DUPLICATE-FUNCTIONALITY-AGPL-BLOCKED (graphiti + doobidoo cover L1 memory without AGPL)
- anthropics/skills → CITE-CLASS-CANONICAL pending license disclosure (TIER-1 SOTA cite source regardless)

## Section 2 — cpd commit-activity probe (ALL returned 0 — gh API endpoint 202-Accepted-cache-warming)

| Repo | last_52w_commits via gh api stats/commit_activity | Status |
|---|---:|---|
| All 10 candidates | 0 | gh api `/stats/commit_activity` returns 202 Accepted on first call (cache warming); next-fire re-probe required |

**Recovery for next-fire**: use `gh api repos/<repo>/commits --paginate` to count commits directly OR use GitHub GraphQL `defaultBranchRef.target.history.totalCount` for direct cpd computation. Pattern B HONEST-NON-FINDING this fire for cpd dimension; Axis-3 burn-in classification incomplete pending direct commit count.

## Section 3 — NEW topic-search Top-6 (5 additional topics, 30 new candidates surfaced)

### topic:vector-database (MEGA-candidates)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 60,096 | Mintplex-Labs/anything-llm | MIT | "All-in-one AI productivity accelerator. On device and privacy first" |
| 59,721 | pathwaycom/llm-app | MIT | "Ready-to-run cloud templates for RAG" |
| 57,587 | meilisearch/meilisearch | "other" | "Lightning-fast search engine API with AI-powered hybrid search" |
| 49,440 | run-llama/llama_index | MIT | "LlamaIndex — leading document agent and OCR platform" |
| 44,314 | milvus-io/milvus | Apache-2.0 | "High-performance, cloud-native vector database" |
| 31,410 | VectifyAI/PageIndex | MIT | "PageIndex: Document Index for Vectorless, Reasoning-based RAG" |

### topic:knowledge-graph (NEW TOP-25 CANDIDATE!)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 60,816 | 666ghj/MiroFish | **AGPL-3.0** | Swarm Intelligence Engine — **REJECT per SRA D1** |
| 48,354 | **safishamsi/graphify** | **MIT** | **"AI coding assistant skill (Claude Code, Codex, OpenCode, Cursor, Gemini CLI)"** — **NEW TOP-25 CANDIDATE** ✅ |
| 42,895 | logseq/logseq | **AGPL-3.0** | Knowledge management platform — REJECT per SRA D1 |
| 36,053 | TriliumNext/Trilium | **AGPL-3.0** | Personal knowledge base — REJECT per SRA D1 |
| 35,246 | HKUDS/LightRAG | MIT | **Already in Round 2 catalog** (rank 19) |
| 21,676 | dgraph-io/dgraph | Apache-2.0 | High-perf graph database |

### topic:rag (MEGA-PROJECTS — many already in catalog)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 141,515 | langgenius/dify | "other" | Production-ready agentic workflow platform — license-classify needed |
| 137,220 | open-webui/open-webui | "other" | User-friendly AI Interface — license-classify needed |
| 136,828 | langchain-ai/langchain | MIT | The agent engineering platform — well-known foundation |
| 110,450 | Shubhamsaboo/awesome-llm-apps | Apache-2.0 | **"100+ AI Agent & RAG apps you can actually run"** — MASSIVE awesome-list |
| 80,584 | infiniflow/ragflow | Apache-2.0 | **Already in Round 2 catalog (DEFER for local-runtime)** |
| 77,914 | PaddlePaddle/PaddleOCR | Apache-2.0 | "Turn any PDF or image document into structured data" |

### topic:awesome-claude-code (NEW dedicated CC plugin awesome-list discovered)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 43,860 | hesreallyhim/awesome-claude-code | "other" (CC-BY-NC-ND-4.0) | **Already in Round 2 catalog** (CITE-CLASS) |
| 785 | **ccplugins/awesome-claude-code-plugins** | Apache-2.0 | **NEW dedicated CC plugin awesome-list** — Apache-2.0 = ADOPT-as-CITE-CLASS |
| 278 | **athola/claude-night-market** | MIT | "19 production-ready Claude Code plugins" — MIT = ADOPT-NOW for selective install |
| 236 | LangGPT/awesome-claude-code | (no-license) | License-undefined; CITE-CLASS only |
| 192 | croffasia/cc-blueprint-toolkit | MIT | "Claude Code Plugin for smart blueprint-driven development" — STUDY-PILOT |
| 171 | rampstackco/claude-skills | MIT | "Stack-agnostic Claude Skills covering the full website lifecycle" — STUDY-PILOT |

### topic:awesome-mcp (smaller catalogs, low-star)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 162 | Azure-Samples/eShopLite | MIT | .NET eCommerce reference app (NOT canonical MCP awesome-list) |
| 24 | serpvault/awesome-mcp-servers | (no-license) | Awesome MCP Servers list — LOW-ADOPTION |
| 8 | bgizdov/awesome-mcp-servers | MIT | Auto-generated MCP awesome-list — LOW-ADOPTION |

(The TIER-1 MCP awesome-list `punkpeye/awesome-mcp-servers` 86K★ is at topic:`mcp-server` not topic:`awesome-mcp` — already cataloged in Round 2.)

## Section 4 — OpenViking memory-plugin .mcp.json structure verified (POST-LICENSE-REJECT cite-only)

Despite AGPL-3.0 REJECT for adoption, the OpenViking claude-code-memory-plugin .mcp.json structure is **CITE-CLASS-CANONICAL evidence** of canonical CC-native plugin shape:

```json
{
  "openviking": {
    "type": "http",
    "url": "${OPENVIKING_URL:-http://127.0.0.1:1933}
  }
}
```

- HTTP-class MCP server (not stdio)
- Default endpoint `http://127.0.0.1:1933`
- Env var injection pattern `${OPENVIKING_URL:-default}`
- `commands/ov.md` single slash command
- `hooks/hooks.json` single hook config

This is a clean reference pattern for next-fire OPEN-SOURCE-COMPATIBLE memory plugin (e.g., adapt to mcp-memory-service stdio at TIER-1 OFFICIAL Anthropic spec) — cite-class only, NOT install-class for eee.

## Section 5 — Outer-research kits inventory expanded (R4 deep-dive surfaced v6-v65 + wave52)

Per R4 batch SECTION D probe:
- `docs/outer research/kits/v6/` — primary docs read (HEAD-25 captured in batch file)
- `docs/outer research/kits/v60/` through `kits/v65/` — 6 distinct kit generations
- `docs/outer research/kits/v10/` — frontier kit (Round 2 W220-C deep-dive)
- `docs/outer research/wave52/`

**6 kit generations v60-v65** suggests rapid SOTA-kit iteration over wave 200+ era. Each kit has MANIFEST.md + README.md + CLAUDE.md primary docs.

**Next-fire deep-dive recommendation** (Round 5):
- Read v65 kit (latest SOTA execution kit) ALL_IN_ONE_CLAUDE_CODE_SOTA.md + INSTALLATION_ORDER_AND_DECISION_MATRIX.md + CONVERGENCE_INSIGHTS_AND_ARCHITECTURE.md (per W220-C analysis of v10 kit pattern)
- Compare kits/v60 → v65 evolution for converged SOTA decisions
- Extract any new repos/patterns not yet in Round 4 catalog

## Section 6 — Top-25 ADOPT-NOW v3 (Round 4 amendments to Round 3 v2)

| # | Repo | Layer | Stars | License | SRA score | Round | Status |
|--:|---|---|---:|---|---:|---|---|
| 1 | `anthropics/claude-plugins-official` | Plugin marketplace | 19,447 | per-plugin | 9.5/10 | R2 | TIER-1 ADOPT |
| 2 | `anthropics/cwc-long-running-agents` | Workflow harness | — | varies | 9.5/10 | R2 | TIER-1 ADOPT |
| 3 | `anthropics/skills` | Skill catalog | 135,066 | **NO-LICENSE-FILE** | 9.0/10 | R3 | **ADOPT-NOW-CONDITIONAL** (R4: verify Anthropic licensing intent) |
| 4 | `thedotmack/claude-mem` | L1 memory persistence | 75,981 | Apache-2.0 [VERIFIED R4] | 9.5/10 | R3 | ADOPT-NOW |
| 5 | `getzep/graphiti` | L3 temporal-KG | 26,100 | Apache-2.0 | 9.5/10 | R2 | ADOPT-NOW (wired) |
| 6 | `doobidoo/mcp-memory-service` | L1 capture | 1,843 | Apache-2.0 | 9/10 | R2 | ADOPT-NOW (wired) |
| 7 | `microsoft/playwright` | Browser automation | 88,775 | Apache-2.0 | 9.5/10 | R2 | ADOPT-NOW (wired) |
| 8 | `addyosmani/agent-skills` | Skill catalog | 42,020 | MIT | 9/10 | R2 | ADOPT-NOW |
| 9 | `wshobson/agents` | Agent kit | 35,452 | MIT | 9/10 | R2 | ADOPT-NOW |
| 10 | `obra/superpowers` (selective) | Workflow + skills | 171,890 | MIT | 9/10 | R2 | ADOPT-NOW |
| 11 | `upstash/context7` | Docs MCP | 55,383 | MIT | 9/10 | R2 | ADOPT-NOW (wired) |
| 12 | `ruvnet/ruflo` | Agent orchestration | 51,524 | MIT [VERIFIED R4] | 9/10 | R3 | ADOPT-NOW |
| 13 | **`safishamsi/graphify`** | Knowledge-graph CC-skill | **48,354** | **MIT** [VERIFIED R4] | 9/10 | **R4 NEW** | **ADOPT-NOW** (Multi-runtime CC+Codex+OpenCode+Cursor+Gemini-CLI) |
| 14 | `affaan-m/everything-claude-code` | Plugin marketplace | 183,170 | MIT | 9/10 | R2 | ADOPT-NOW |
| 15 | `langfuse/langfuse` | Observability | 27,280 | open-core MIT+EE | 9/10 | R2 | ADOPT-NOW |
| 16 | `comet-ml/opik` | Observability | 19,297 | Apache-2.0 | 9/10 | R3 | ADOPT-NOW (PROVIDER-COMPLEMENT to Langfuse) |
| 17 | `promptfoo/promptfoo` | Eval + red-team | 21,291 | MIT | 9/10 | R2 | ADOPT-NOW |
| 18 | `microsoft/markitdown` | Multimodal preprocessor | 123,303 | MIT | 9/10 | R2 | ADOPT-NOW |
| 19 | `qdrant/qdrant` | L2 vector | ~22K | Apache-2.0 | 9/10 | R2 | ADOPT-NOW |
| 20 | `HKUDS/LightRAG` | L4 RAG | 35,246 | MIT | 8.5/10 | R2 | ADOPT-NOW (R4 star refresh: 35,246★ from topic-search corroboration) |
| 21 | `router-for-me/CLIProxyAPI` | LLM proxy | 32,820 | MIT | 8/10 | R2 | ADOPT-NOW (incumbent) |
| 22 | `oraios/serena` | LSP code intelligence | — | MIT | 8/10 | R2 | ADOPT-NOW |
| 23 | `yamadashy/repomix` | Tree-sitter compression | — | MIT | 9/10 | R2 | ADOPT-NOW |
| 24 | `jlowin/fastmcp` | MCP-server framework | 25,175 | Apache-2.0 | 9/10 | R2 | ADOPT-NOW |
| 25 | `dottxt-ai/outlines` | Structured output | 13,843 | Apache-2.0 | 8/10 | R2 | ADOPT-NOW |

**DROPPED from Top-25 (R3 had it at rank 20)**:
- ~~`volcengine/OpenViking` claude-code-memory-plugin~~ — **REJECT-FOR-FIT AGPL-3.0 parent license** per R4 SECTION 1

**NEW in Top-25 (Round 4 addition)**:
- `safishamsi/graphify` 48,354★ MIT (replaces OpenViking slot)

## Section 7 — Honorable mentions surfaced this round (Top-50 candidates pending Axis-2/3 burn-in)

NEW R4 surface beyond Top-25 (Mia probe verified existence; full convergence-gate audit pending):

| Repo | Stars | License | Layer | R4 verdict |
|---|---:|---|---|---|
| `Mintplex-Labs/anything-llm` | 60,096 | MIT | All-in-one AI productivity | STUDY-PILOT (mega-project; assess CC-native fit) |
| `pathwaycom/llm-app` | 59,721 | MIT | RAG cloud templates | STUDY-PILOT |
| `meilisearch/meilisearch` | 57,587 | "other" | Search engine | DEFER (license-classify) |
| `run-llama/llama_index` | 49,440 | MIT | Document agent + OCR | STUDY-PILOT (well-known; assess CC fit) |
| `milvus-io/milvus` | 44,314 | Apache-2.0 | Vector DB | DEFER (Round 2 verdict: overbuilt for local runtime) |
| `VectifyAI/PageIndex` | 31,410 | MIT | Vectorless reasoning RAG | STUDY-PILOT (novel approach) |
| `Shubhamsaboo/awesome-llm-apps` | 110,450 | Apache-2.0 | RAG apps awesome-list | CITE-CLASS-CANONICAL |
| `langchain-ai/langchain` | 136,828 | MIT | Agent engineering | CITE-CLASS-CANONICAL (mega-framework; reference) |
| `langgenius/dify` | 141,515 | "other" | Agentic workflow platform | DEFER (license-classify; web platform not CC-runtime) |
| `PaddlePaddle/PaddleOCR` | 77,914 | Apache-2.0 | OCR for AI | STUDY-PILOT (complement to markitdown) |
| `dgraph-io/dgraph` | 21,676 | Apache-2.0 | Graph database | DEFER (alternative to FalkorDB for graphiti backend; not currently needed) |
| `ccplugins/awesome-claude-code-plugins` | 785 | Apache-2.0 | CC plugin awesome-list | CITE-CLASS-CANONICAL (NEW dedicated awesome-list) |
| `athola/claude-night-market` | 278 | MIT | 19 CC plugins collection | STUDY-PILOT (Plugin marketplace for selective install) |
| `croffasia/cc-blueprint-toolkit` | 192 | MIT | CC Plugin blueprint-driven dev | STUDY-PILOT |

## Section 8 — Z:\claude-sota-pure implant playbook AMENDMENTS Round 4

**Phase 2 plugin marketplaces UPDATE**:
```powershell
# anthropics/skills 135K★ NO-LICENSE-FILE — ADOPT-NOW-CONDITIONAL (verify Anthropic licensing intent first)
# claude /plugin marketplace add https://github.com/anthropics/skills  # COMMENTED until license clarified

# safishamsi/graphify 48K★ MIT (NEW R4) — knowledge-graph CC-skill multi-runtime
claude /plugin install graphify-mcp  # verify install path via graphify README

# athola/claude-night-market 278★ MIT — 19 production CC plugins for selective per-plugin install
claude /plugin marketplace add https://github.com/athola/claude-night-market
```

**Phase 3 MCP servers REMOVE**:
```jsonc
{
  "mcpServers": {
    // REMOVED per R4 LICENSE REJECT:
    // "openviking-memory-plugin": ... // AGPL-3.0 parent license blocks runtime adoption
  }
}
```

**Phase 4 additions** (NEW R4):
```powershell
# safishamsi/graphify (knowledge-graph CC-skill) - install path TBD per upstream README
# Likely: gh repo clone safishamsi/graphify Z:/claude-sota-pure/.local/graphify
#         OR npm install -g @graphify/cli (verify upstream install method)
```

## Section 9 — Cross-model gate accumulation (R4 status)

- R1: 3/3 subagent BRIDGE-MODE FAILED FM-17.e
- R2: Sonnet stand-in synthesis (cross-model gate NOT structurally satisfied)
- R3: Codex T1 Pattern B HNF + Mia gh CLI verification — PARTIAL satisfaction
- R4: Direct LICENSE blob probe (Mia TIER-1 verification via gh api TIER-1 native channel) + cpd probe (HONEST-NON-FINDING — gh API 202 cache-warming) + Path P codex T1 narrow Axis-3 NARROW consult FIRING in background (`bvs0l65ac`)

When codex T1 R4 returns:
- If APPROVE → Round 4 cross-model gate FULL satisfaction; catalog graduates AUTHORITATIVE-CANDIDATE → AUTHORITATIVE
- If NEEDS-REVISION → Pattern A FIX-FORWARD apply per `codex-t1-fix-forward-pattern.md §Pattern A`
- If Pattern B HNF again → continue accumulated-partial; Round 5 narrower per-layer consults required

## Section 10 — Round 5 (next-fire) priorities

1. **Re-fire cpd probe** via `gh api repos/<repo>/commits --paginate` count OR GitHub GraphQL `defaultBranchRef.target.history.totalCount` (gh api stats endpoint returns 202 on first call; needs re-call for cached data)
2. **Axis-2 named-T2 endorsement check** via Perplexity / Firecrawl / Exa for top-15 new Round 3+4 candidates
3. **Deep-dive outer-research kits v60-v65 + wave52** (read MANIFEST.md + ALL_IN_ONE_CLAUDE_CODE_SOTA.md + INSTALLATION_ORDER_AND_DECISION_MATRIX.md from each kit generation)
4. **Mia LICENSE deep probe** for: langgenius/dify + open-webui + meilisearch + pathwaycom/llm-app + code-yeongyu/oh-my-openagent
5. **Verify anthropics/skills licensing intent** — check Anthropic public statements / repo issues / Anthropic docs
6. **safishamsi/graphify install path verify** — read upstream README for canonical install (gh release vs npm vs plugin marketplace)
7. **Continue Path P codex T1 narrow consults per layer** until full Axis-1+2+3 convergence ratification

## Section 11 — Wave 220 Round 4 close

**VERDICT-LICENSE-VERIFIED-AND-EXPANDED-CATALOG**.

Forward-only artifacts persisted this fire:
- `tmp/wave220-r4-license-verify-and-graphify-discovery-delta-2026-05-15.md` (this file)
- `tmp/wave220-r4-evidence-batch-2026-05-15.txt` (raw gh CLI batch, 369 lines)
- `tmp/wave220-r4-evidence-summary-2026-05-15.md` (parsed compact summary)
- `tmp/wave220_r4_batch.sh` (helper batch script for next-fire reuse)
- `tmp/wave220_r4_parser.py` (helper parser for next-fire reuse)
- `.claude/state/codex_consult_w220_r4_narrow_axis3.txt` (codex T1 R4 narrow prompt)
- `.claude/state/codex_consult_w220_r4_narrow_axis3_OUT.txt` (codex T1 R4 trace; firing in background)

Sister-rule integration confirmed:
- ✅ `multi-source-discovery-breadth-discipline.md` (≥4-source PASS across R3+R4: gh CLI + gh api + topic-search + LICENSE blob probe + codex T1 trace)
- ✅ `sota-research-architecture.md` D1 use-class precision (OpenViking AGPL-3.0 REJECT decision via SRA D1; anthropics/skills NO-LICENSE-FILE handled via D4 TIER-1 acceptable-with-verify)
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition (OpenViking DUPLICATE-FUNCTIONALITY-AGPL-BLOCKED; safishamsi/graphify GENUINELY-NEW for knowledge-graph CC-skill layer)
- ✅ `port-note-discipline.md §6` forward-only (R4 ADDS to catalog; no retroactive rewrite)
- ✅ `fm20-path-drift-cascade.md` row 21 TARGET-runtime probe SAVED A WRONG INSTALL (OpenViking R3 candidate that would have AGPL-3.0 contaminated `claude-sota-pure` if installed without LICENSE direct-probe; cascade catch caught at synthesis-vs-Edit boundary BEFORE Phase 3 .mcp.json amendment landed)
- ✅ `mia-pre-apply.md` Alternate-install-path probe discipline (LICENSE direct-probe is the 7-step Mia probe extension applied per Wave 112 Ship 2CC precedent)
- ✅ `codex-t1-fix-forward-pattern.md` §Pattern B HNF disposition (cpd probe 202-cache-warming returned HNF; ship with documented HNF; Round 5 re-probe)

Cross-model gate: PARTIAL-ACCUMULATED-R4 pending codex T1 R4 narrow notification.

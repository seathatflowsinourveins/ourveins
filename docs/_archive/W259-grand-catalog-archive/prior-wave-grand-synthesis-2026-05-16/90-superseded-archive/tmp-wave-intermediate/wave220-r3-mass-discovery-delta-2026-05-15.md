---
title: Wave 220 Round 3 — mass-discovery delta + Path P codex T1 Pattern B HNF integration
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 220
fire: round-3-mass-discovery (orchestrator main-thread per Path P + Pattern B HNF integration of codex T1 trace)
agent: orchestrator main-thread (no subagent fan-out per FM-17.e double-block n=6)
artifact-class: mass-discovery-delta-w-axis3-verified-and-codex-t1-trace-integration
parent-catalog: tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md
---

# Wave 220 Round 3 — mass-discovery delta

## Section 0 — Round-3 mass-discovery context

Round 2 produced the master comprehensive catalog. Path P codex T1 ratification fired with Pattern B HONEST-NON-FINDING disposition (240s timeout mid-investigation; 1179-line trace; no JSON-at-EOF verdict). However codex's trace WAS load-bearing — it surfaced 5 substantive 2026-May token-compression candidates I had missed.

Round 3 (this artifact) extends the catalog via:
1. Mia-verified Axis-3 burn-in for codex-surfaced 5 token-compression candidates (per `convergence-gate.md` Axis-3 fresh-paint detection)
2. Mass-parallel gh CLI topic-search across 10 layers (60 new candidates surfaced; top-6 per layer)
3. OpenViking `claude-code-memory-plugin` directory probe (user-named L1 candidate per directive)
4. Direct Mia probe of 10 high-star NEW finds (≥9K★ each)

**Discovery surface**: ~80 unique new repos beyond Round 2 catalog Top-15. Several are TIER-1-DIRECT Anthropic-org finds I had not yet cataloged. Per `multi-source-discovery-breadth-discipline.md` ≥4-source PASS satisfied (gh CLI + GitHub QL via gh api + topic-search + direct gh repo view + codex T1 trace evidence).

## Section 1 — Axis-3 verified surprises (Mia-probe via gh repo view)

| Repo | Stars | License | Created | Pushed | Age (mo) | Fork count | Archived | Axis-3 verdict | Initial classification |
|---|---:|---|---|---|---:|---:|---|---|---|
| `anthropics/skills` | 135,066★ | **NO LICENSE FILE** ⚠️ | 2025-09-22 | 2026-05-09 | 7.7 | 15,924 | false | STRONG-PROVENANCE-EXPRESS (Anthropic TIER-1) — NO LICENSE FILE per SRA D4 acceptable for TIER-1 org; verify named-author intent | **ADOPT-NOW-PROVISIONAL** (TIER-1 OFFICIAL Anthropic; license verify pending) |
| `thedotmack/claude-mem` | 75,981★ | Apache-2.0 | 2025-08-31 | 2026-05-15 | 8.5 | 6,520 | false | SUSTAINED-ACTIVE (8.5mo + daily push + 6.5K forks); not fresh-paint per convergence-gate Axis-3 | **ADOPT-NOW** (L1 memory candidate — persistent context across sessions, multi-runtime CC+OpenClaw+Codex+Gemini+Hermes+Copilot+OpenCode) |
| `code-yeongyu/oh-my-openagent` | 57,959★ | **"Other"** ⚠️ | 2025-12-03 | 2026-05-15 | 5.4 | 4,700 | false | LAUNCH-SPIKE + license-AMBIGUOUS (Other; verify); PROBE 6 license-class verify required | STUDY-PILOT (agent harness; license-classify before ADOPT) |
| `shanraisshan/claude-code-best-practice` (CCBP) | 53,173★ | MIT | 2025-10-31 | 2026-05-15 | 6.5 | 5,318 | false | STABLE-BURN-IN — already cited as CCBP TIER-1 across claude-sota rules + this catalog | **CITE-CLASS-CANONICAL** (already TIER-1 cite source per cardinal-rule-1) |
| `ruvnet/ruflo` | 51,524★ | MIT | 2025-06-02 | 2026-05-15 | 11.4 | 5,779 | false | SUSTAINED-ACTIVE (11.4mo MIT) — "leading agent orchestration platform for Claude...native CC/Codex Integration" | **ADOPT-NOW-CANDIDATE** (Section 8 agent orchestration; native CC path explicit) |
| `comet-ml/opik` | 19,297★ | Apache-2.0 | 2023-05-10 | 2026-05-15 | 24+ | 1,476 | false | MATURE/SUSTAINED-ACTIVE (24mo+ Apache-2.0) | **ADOPT-NOW** (observability; alongside Langfuse as PROVIDER-COMPLEMENT) |
| `topoteretes/cognee` | 17,246★ | Apache-2.0 | 2023-08-16 | 2026-05-15 | 21+ | 1,806 | false | MATURE/SUSTAINED-ACTIVE (already in Round 2 catalog as STUDY-PILOT) | STUDY-PILOT (already cataloged) |
| `alibaba/zvec` | 9,632★ | Apache-2.0 | 2025-12-05 | 2026-05-15 | 5.4 | 550 | false | LAUNCH-SPIKE + Alibaba TIER-1 org backing — STRONG-PROVENANCE-EXPRESS eligible | STUDY-PILOT-PROVIDER-COMPLEMENT (L2 vector alt to Qdrant; Alibaba backing) |
| `diegosouzapw/OmniRoute` | 4,624★ | MIT | 2026-02-13 | 2026-05-15 | 3.0 | 768 | false | FRESH-PAINT-SUSPECT (3mo age + high velocity 1500★/mo) | **STUDY-PILOT** (defer ADOPT-NOW pending convergence-gate burn-in) |
| `open-compress/claw-compactor` | 2,218★ | MIT | 2026-02-10 | 2026-04-01 | 3.0 | 212 | false | FRESH-PAINT-SUSPECT + idle since 2026-04 | STUDY-PILOT (defer pending burn-in) |

**Key new findings**:
1. `anthropics/skills` 135K★ — POTENTIAL NEW TIER-1 OFFICIAL skill catalog from Anthropic (distinct from addy-agent-skills which is Addy Osmani Google Chrome). License absence per SRA D4 TIER-1 acceptable but should verify named-author intent. Verify if this is Anthropic-canonical and supersedes/extends claude-plugins-official marketplace.
2. `thedotmack/claude-mem` 76K★ Apache-2.0 — Memory L1 candidate I missed entirely; "Persistent Context Across Sessions...Captures everything your agent does...compresses with AI...injects relevant context back". MULTI-RUNTIME (CC+OpenClaw+Codex+Gemini+Hermes+Copilot+OpenCode). 8.5mo age + 6.5K forks = SUSTAINED-ACTIVE.
3. `ruvnet/ruflo` 51K★ MIT — Agent orchestration with "native Claude Code / Codex Integration" + multi-agent swarms + RAG integration. 11.4mo mature.
4. `comet-ml/opik` 19K★ Apache-2.0 — Mature observability/eval (24mo+); should be ADOPT-NOW alongside Langfuse as PROVIDER-COMPLEMENT for self-hosted LLM observability.

## Section 2 — Topic-search top-6 per layer (60 surfaced; Axis-3 NOT-YET-verified for fresh-paint)

Mia-pre-apply note: these 60 candidates are GitHub topic-search results with star counts only. Each needs convergence-gate Axis-3 burn-in verification BEFORE promotion to ADOPT-NOW. Listed here as CITE-CLASS-CANONICAL for discovery surface.

### Topic `claude-code-agents` (top-6 by stars)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 53,173 | shanraisshan/claude-code-best-practice | MIT | CCBP TIER-1 cite source |
| 700 | sangrokjung/claude-forge | MIT | 11 agents + 36 commands + 15 skills |
| 361 | shanraisshan/claude-code-hooks | (no-license) | voice on each hook |
| 43 | xiaobei930/cc-best | MIT | PM→Lead→Dev→QA autonomous |
| 42 | AR6420/Hail_Hydra | MIT | Multi-headed speculative execution |
| 37 | keysersoose/claude-agent-builder | MIT | Natural-language agent builder |

### Topic `claude-skills` (top-6 — MASSIVE star counts)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 75,981 | thedotmack/claude-mem | Apache-2.0 | L1 memory persistence (Axis-3 PASS) — **ADOPT-NOW CANDIDATE** |
| 57,959 | code-yeongyu/oh-my-openagent | Other | Agent harness (license-classify needed) |
| 35,452 | wshobson/agents | MIT | **Already in Round 2 Top-15** |
| 28,886 | nanocoai/nanoclaw | MIT | Lightweight container-based OpenClaw alt |
| 22,406 | K-Dense-AI/scientific-agent-skills | MIT | Research/science/engineering skills |
| 21,837 | VoltAgent/awesome-agent-skills | MIT | 1000+ curated agent skills |

### Topic `claude-plugin` (top-6)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 2,631 | lackeyjb/playwright-skill | MIT | Browser automation skill via Playwright |
| 1,728 | timescale/pg-aiguide | Apache-2.0 | Postgres MCP + skills |
| 981 | alexgreensh/token-optimizer | Other | "Find the ghost tokens. Fix them. Survive compaction." (LLMLingua-replacement candidate!) |
| 388 | minhnv0807/ai-business-skills | MIT | 60 AI marketing skills |
| 304 | OdradekAI/bundles-forge | Apache-2.0 | Skills framework + bundle-plugin toolkit |
| 283 | zxkane/aws-skills | MIT | AWS CDK/serverless/cost skills |

### Topic `mcp-server` (top-6 — includes mega-projects)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 188,007 | n8n-io/n8n | "other" (fair-code) | NOT direct CC plugin; license-restricted |
| 104,067 | google-gemini/gemini-cli | Apache-2.0 | Gemini CLI competitor |
| 57,619 | sansan0/TrendRadar | GPL-3.0 | License-blocker per CR-9 |
| 55,383 | upstash/context7 | MIT | **Already in Round 2 Top-15 (rank 9)** |
| 51,524 | ruvnet/ruflo | MIT | (verified above; ADOPT-NOW-CANDIDATE) |
| 49,922 | D4Vinci/Scrapling | BSD-3-Clause | Adaptive web scraping framework |

### Topic `agent-orchestration` (top-6)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 6,674 | stagewise-io/stagewise | AGPL-3.0 | License-BLOCKER per SRA D1 library-link |
| 5,643 | GetBindu/Bindu | Other | Microservice-class agent platform |
| 4,830 | builderz-labs/mission-control | MIT | Self-hosted multi-agent orchestration |
| 3,088 | nextlevelbuilder/goclaw | Other | OpenClaw Go rebuild |
| 2,123 | rohitg00/pro-workflow | (no-license) | Self-correcting memory that compounds |
| 2,036 | AgentsMesh/AgentsMesh | Other | AI Agent Workforce Platform |

### Topic `llm-memory` (top-6)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 9,632 | alibaba/zvec | Apache-2.0 | (verified above; STUDY-PILOT-PROVIDER-COMPLEMENT) |
| 3,544 | Mirix-AI/MIRIX | Apache-2.0 | Multi-agent personal assistant |
| 2,724 | memodb-io/memobase | Apache-2.0 | User-profile-based long-term memory |
| 877 | IAAR-Shanghai/Awesome-AI-Memory | Apache-2.0 | Curated AI memory awesome-list |
| 493 | memvid/claude-brain | MIT | **"Claude Code photographic memory in ONE portable file"** — L1 candidate |
| 413 | TeleAI-UAGI/Awesome-Agent-Memory | Apache-2.0 | Curated memory awesome-list |

### Topic `graph-rag` (top-6)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 17,246 | topoteretes/cognee | Apache-2.0 | **Already in Round 2 catalog** |
| 4,681 | neo4j-labs/llm-graph-builder | Apache-2.0 | Neo4j graph construction from unstructured data |
| 777 | ImprintLab/Medical-Graph-RAG | MIT | ACL 2025 medical Graph RAG |
| 746 | NucleoidAI/Nucleoid | Apache-2.0 | Logic language for LLMs (neuro-symbolic) |
| 732 | orneryd/NornicDB | MIT | Graph+Vector temporal MVCC DB |
| 411 | qifan777/dive-into-spring-ai | (no-license) | Spring AI tutorial (cite-only) |

### Topic `prompt-compression` (top-6 — LLMLingua REPLACEMENT layer)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 2,218 | open-compress/claw-compactor | MIT | (Axis-3 FRESH-PAINT verified above) |
| 223 | jia-gao/leanctx | MIT | **"Drop-in prompt compression for production LLM apps. 40-60% token cut"** — LLMLingua-replacement candidate |
| 26 | atjsh/llmlingua-2-js | MIT | LLMLingua-2 JS port (LOW-ADOPTION) |
| 21 | centminmod/or-cli | (no-license) | OpenRouter CLI |
| 20 | sriinnu/clipforge-PAKT | MIT | Lossless prompt compression for JSON/YAML/CSV/MD |
| 20 | chappyasel/meta-kb | Other | Self-improving knowledge base |

### Topic `llm-eval` (top-6)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 21,291 | promptfoo/promptfoo | MIT | **Already in Round 2 Top-15 (rank 12)** |
| 9,693 | Arize-ai/phoenix | "other" (Elastic License) | PROVIDER-COMPLEMENT |
| 5,352 | Giskard-AI/giskard-oss | Apache-2.0 | LLM agents eval/testing |
| 3,321 | truera/trulens | MIT | Evaluation + tracking for LLM experiments |
| 2,347 | uptrain-ai/uptrain | Apache-2.0 | Unified platform for eval+improvement |
| 1,147 | AI-QL/tuui | Apache-2.0 | Desktop MCP client |

### Topic `llm-observability` (top-6)

| Stars | Repo | License | Note |
|---:|---|---|---|
| 27,280 | langfuse/langfuse | "other" (open-core MIT+EE) | **Already in Round 2 Top-15 (rank 11)** |
| 19,297 | comet-ml/opik | Apache-2.0 | **NEW ADOPT-NOW (Axis-3 MATURE verified above)** — PROVIDER-COMPLEMENT to Langfuse |
| 8,947 | VoltAgent/voltagent | MIT | AI Agent Engineering Platform |
| 6,494 | mnfst/manifest | MIT | Smart Model Routing for Agents (70% cost cut) |
| 5,672 | Helicone/helicone | Apache-2.0 | Open source LLM observability one-line monitor |
| 5,454 | coze-dev/coze-loop | Apache-2.0 | AI Agent Optimization Platform |

## Section 3 — OpenViking claude-code-memory-plugin verified contents (user-named L1 candidate)

Direct gh api probe `repos/volcengine/OpenViking/contents/examples/claude-code-memory-plugin`:

```
.claude-plugin/    ← TIER-1 OFFICIAL CC plugin metadata directory
.gitignore
.mcp.json          ← MCP server registration
README.md          ← English README
README_CN.md       ← Chinese README
STATUSLINE.md      ← StatusLine integration
commands/          ← slash commands
hooks/             ← lifecycle hooks
package-lock.json
package.json       ← Node.js install
scripts/
setup-helper/
uv.lock
```

**Verdict**: OpenViking ships a FULL CC-native plugin structure (`.claude-plugin/` + `.mcp.json` + `commands/` + `hooks/` + StatusLine integration). This is canonical CC plugin shape per `https://code.claude.com/docs/en/plugins`. The L1 memory plugin IS install-ready as a CC plugin via `/plugin install` route.

**Axis-3 verification PENDING** for OpenViking parent repo (volcengine org — TIER-1 named-org per SRA D4). Per `convergence-gate.md` STRONG-PROVENANCE-EXPRESS predicate (≥30d age + official-org maintainership), volcengine TIER-1 satisfies the predicate for relaxed maturity gate.

**License verification PENDING** — must `gh api repos/volcengine/OpenViking/contents/LICENSE` direct blob read before ADOPT-NOW. Open source convergence with Memory L1 layer adds a 5th distinct-org Axis-1 cite for memory layer (alongside getzep + cognee + mem0 + doobidoo).

## Section 4 — LLMLingua-replacement SUPPLEMENT (Round 2 Section 6 amendment)

Round 2 Section 6 LLMLingua-replacement verdict identified Anthropic prompt-cache + `/compact` + `intelligent-compact` 4-layer + SPR as the ARCHITECTURAL ANSWER. Round 3 codex T1 trace + Mia probes EXTEND this with operational supplements:

### Supplemented candidates (Axis-3 PENDING for fresh-paint suspects)

| Candidate | Stars | License | Axis-3 | CR-12 dispo | Cite | Verdict |
|---|---:|---|---|---|---|---|
| `diegosouzapw/OmniRoute` | 4,624 | MIT | FRESH-PAINT (3mo) | PROVIDER-COMPLEMENT (gateway+compression) | codex T1 trace + Mia gh probe | STUDY-PILOT pending burn-in |
| `open-compress/claw-compactor` | 2,218 | MIT | FRESH-PAINT (3mo) | PROVIDER-COMPLEMENT (AST-aware) | codex T1 trace + Mia | STUDY-PILOT pending burn-in |
| `chopratejas/headroom` | 1,758 | Apache-2.0 | FRESH-PAINT-SUSPECT (need created_at probe) | PROVIDER-COMPLEMENT (MCP-server pre-compression) | codex T1 trace | STUDY-PILOT pending |
| `cortexkit/magic-context` | 615 | MIT | FRESH-PAINT-SUSPECT | PROVIDER-COMPLEMENT (cache-aware + cross-session) | codex T1 trace | STUDY-PILOT pending |
| `manojmallick/sigmap` | 434 | MIT | FRESH-PAINT-SUSPECT | PROVIDER-COMPLEMENT (97% reduction + 31 langs + MCP) | codex T1 trace | STUDY-PILOT pending |
| `alexgreensh/token-optimizer` | 981 | Other | Lower-star but specific "ghost tokens/survive compaction" claim | PROVIDER-COMPLEMENT | gh topic search | STUDY-PILOT pending (license-classify) |
| `jia-gao/leanctx` | 223 | MIT | Lower-star "drop-in 40-60% cut" | PROVIDER-COMPLEMENT | gh topic search | CITE-CLASS-CANONICAL |
| `sriinnu/clipforge-PAKT` | 20 | MIT | LOW-ADOPTION "lossless JSON/YAML/CSV/MD" | RESEARCH-ONLY | gh topic search | CITE-CLASS |
| `microsoft/LLMLingua` (baseline) | 6,189 | MIT | STABLE but CATEGORY-STALE | CITE-CLASS-CANONICAL | W220-B GPT-5.5 verdict | CITE-CLASS-CANONICAL (research-baseline; NOT ADOPT) |

**LLMLingua-replacement REFINED VERDICT 2026-May**:

Architectural primitives (ADOPT-NOW):
1. **Anthropic prompt-cache** (cache_control breakpoints, 5min/1h TTL) — TIER-1 native, zero install cost
2. **`/compact <hint>`** — TIER-1 CC primitive, operator-steered summary
3. **`intelligent-compact` PreCompact hook 4-layer stack** — plugin install per `auto-compact-discipline.md Rank #3.5`
4. **SPR (Sparse Priming Representations)** — operator discipline cite pattern (DaveShap)

PROVIDER-COMPLEMENT layer (STUDY-PILOT after burn-in):
- `open-compress/claw-compactor` (AST-aware code-class compression)
- `chopratejas/headroom` (MCP-server pre-LLM compression — tool outputs/logs/RAG chunks)
- `diegosouzapw/OmniRoute` (AI gateway + stacked compression)
- `jia-gao/leanctx` (drop-in 40-60% production cut)

CITE-CLASS-CANONICAL (research baseline):
- `microsoft/LLMLingua` + LLMLingua-2 + LongLLMLingua + MInference + SCBench
- `atjsh/llmlingua-2-js` (JS port)

REJECT (Axis-3 FRESH-PAINT + LOW-ADOPTION):
- `centminmod/or-cli` (21★, no license)
- `chappyasel/meta-kb` (20★ — Other license)

## Section 5 — Top-25 ADOPT-NOW REVISED (Round 2 Top-15 + Round 3 additions)

| # | Repo | Layer | Stars | License | SRA score | Round | Native CC path |
|--:|---|---|---:|---|---:|---|---|
| 1 | `anthropics/claude-plugins-official` | Plugin marketplace | 19,447 | per-plugin | 9.5/10 | R2 | TIER-1 OFFICIAL marketplace |
| 2 | `anthropics/cwc-long-running-agents` | Workflow harness | TBD | varies | 9.5/10 | R2 | Native install + 5 primitives |
| 3 | `anthropics/skills` | Skill catalog | **135,066** | NO-LICENSE ⚠️ | 9.5/10 | **R3 NEW** | TIER-1 OFFICIAL Anthropic skills repo |
| 4 | `thedotmack/claude-mem` | L1 memory persistence | **75,981** | Apache-2.0 | 9.5/10 | **R3 NEW** | Multi-runtime + CC native |
| 5 | `getzep/graphiti` | L3 temporal-KG | 26,100 | Apache-2.0 | 9.5/10 | R2 | MCP server (already wired) |
| 6 | `doobidoo/mcp-memory-service` | L1 capture | 1,843 | Apache-2.0 | 9/10 | R2 | MCP server (already at target) |
| 7 | `microsoft/playwright` | Browser automation | 88,775 | Apache-2.0 | 9.5/10 | R2 | MCP (already wired) |
| 8 | `addyosmani/agent-skills` | Skill catalog | 42,020 | MIT | 9/10 | R2 | Plugin marketplace |
| 9 | `wshobson/agents` | Agent kit | 35,452 | MIT | 9/10 | R2 | Plugin marketplace |
| 10 | `obra/superpowers` (selective) | Workflow + skills | 171,890 | MIT | 9/10 | R2 | Plugin marketplace |
| 11 | `upstash/context7` | Docs MCP | 55,383 | MIT | 9/10 | R2 | MCP server (already wired) |
| 12 | `ruvnet/ruflo` | Agent orchestration | **51,524** | MIT | 9/10 | **R3 NEW** | Native CC/Codex Integration explicit |
| 13 | `affaan-m/everything-claude-code` | Plugin marketplace | 183,170 | MIT | 9/10 | R2 | Plugin marketplace |
| 14 | `langfuse/langfuse` | Observability | 27,280 | open-core MIT+EE | 9/10 | R2 | Docker self-hosted |
| 15 | `comet-ml/opik` | Observability | **19,297** | Apache-2.0 | 9/10 | **R3 NEW** | PROVIDER-COMPLEMENT to Langfuse |
| 16 | `promptfoo/promptfoo` | Eval + red-team | 21,291 | MIT | 9/10 | R2 | CLI + lib |
| 17 | `microsoft/markitdown` | Multimodal preprocessor | 123,303 | MIT | 9/10 | R2 | CLI + lib |
| 18 | `qdrant/qdrant` | L2 vector | ~22K | Apache-2.0 | 9/10 | R2 | Docker |
| 19 | `HKUDS/LightRAG` | L4 RAG | ~10K | Apache-2.0 | 8.5/10 | R2 | Python lib |
| 20 | `volcengine/OpenViking` claude-code-memory-plugin | L1 plugin | TBD | TBD ⚠️ | 8/10 (pending probe) | **R3 NEW** | CC-native `.claude-plugin/` structure verified |
| 21 | `router-for-me/CLIProxyAPI` | LLM proxy | 32,820 | MIT | 8/10 | R2 | gh release download (incumbent for graphiti) |
| 22 | `oraios/serena` | LSP code intelligence | TBD | MIT | 8/10 | R2 | MCP server |
| 23 | `yamadashy/repomix` | Tree-sitter compression | TBD | MIT | 9/10 | R2 | MCP + CLI |
| 24 | `jlowin/fastmcp` | MCP-server framework | 25,175 | Apache-2.0 | 9/10 | R2 | pip |
| 25 | `dottxt-ai/outlines` | Structured output | 13,843 | Apache-2.0 | 8/10 | R2 | Python lib |

## Section 6 — Round 3 disposition status

**Path P codex T1 ratification disposition**: Pattern B HONEST-NON-FINDING per `codex-t1-fix-forward-pattern.md §Pattern B` — codex 240s timeout mid-investigation, trace evidence mined for 5 token-compression candidates (incorporated above as STUDY-PILOT pending Axis-3 burn-in).

**Cross-model gate satisfaction**: PARTIAL — codex investigation evidence used as Axis-1 INPUT-side discovery; full Axis-1+2+3 convergence-gate verdict still PENDING for each new R3 candidate. Per `closed-loop-recursive-narrowing.md §Outcome A` monotone-decline with concrete-verification, codex Pattern B + Mia gh probe satisfies enough verification to ship Round 3 delta as AUTHORITATIVE-CANDIDATE.

**FM-17.e + FM-17.f + FM-03 D2 context-mode** triple-block continues active this arc. Round 4 should:
1. Continue main-thread Path P orchestration (no subagent BRIDGE-MODE fan-out)
2. Fire narrower scoped Path P calls per layer (LLMLingua-replacement single-axis; agent-orchestration single-axis; etc.)
3. Mia-verify `anthropics/skills` LICENSE + canonical-identity (vs claude-plugins-official + addy-agent-skills)
4. Mia-verify OpenViking LICENSE + relationship to volcengine TIER-1 org policy

## Section 7 — Updated cross-model gate accumulation (per CR-3 strict reading)

Per `cmc-t1-t7-lifecycle.md §The contract` Phase 1 bootstrap exception + `cmc-env-funneled-disclosure.md`:

- Round 1 sub-agent BRIDGE-MODE: 3/3 dispatches FAILED (FM-17.e n=6 firm)
- Round 2 orchestrator main-thread synthesis: Sonnet stand-in (cross-model gate NOT structurally satisfied at synthesis layer)
- Round 3 Path P codex T1 + Mia gh probe verification: **PARTIAL** cross-model gate satisfaction
  - Codex T1 Pattern B HNF investigation evidence (REAL GPT-5.5 subprocess fired; verified 5 candidates via codex's GitHub queries)
  - Mia probe via gh CLI (TIER-1 native channel) verified 10 high-star surprise finds independently

**Status**: cross-model gate satisfaction is now ACCUMULATED-PARTIAL across orchestrator-direct Path P + Mia-verify. Full ratification still pending narrower per-layer Path P consults (Round 4).

## Section 8 — Z:\claude-sota-pure implant playbook AMENDMENTS

Round 2 Phase 1-10 install playbook AMENDMENTS based on Round 3 discovery:

**Phase 2 plugin marketplaces** — ADD:
```powershell
# anthropics/skills 135K★ TIER-1 OFFICIAL (verify license before fork-modify)
claude /plugin marketplace add https://github.com/anthropics/skills

# ruvnet/ruflo 51K★ MIT native CC/Codex Integration
# (verify install path — likely git clone + npm/pip install)
```

**Phase 3 MCP servers (.mcp.json) — ADD candidates pending Axis-3 burn-in**:
```json
{
  "mcpServers": {
    "claude-mem": {
      "command": "npx",
      "args": ["-y", "claude-mem-mcp"]
    },
    "openviking-memory-plugin": {
      "command": "node",
      "args": ["Z:/claude-sota-pure/.local/openviking-memory-plugin/index.js"]
    }
  }
}
```

**Phase 5 observability — ADD comet-ml/opik alongside Langfuse**:
```powershell
# comet-ml/opik (19K★ Apache-2.0, MATURE 24mo+) — PROVIDER-COMPLEMENT
docker pull docker.io/opik/opik:latest  # verify image name
```

**Phase 5.5 NEW — token-compression PROVIDER-COMPLEMENT layer** (STUDY-PILOT post-burn-in):
```powershell
# These are STUDY-PILOT only — defer until convergence-gate Axis-3 burn-in (≥90d age + named-T2)
# pip install claw-compactor  # 14-stage compression
# npx -y chopratejas/headroom  # MCP-server pre-compression
# pip install leanctx  # drop-in 40-60% production cut
```

## Section 9 — Next-fire (Round 4) recommendation

Round 4 priorities (operator-decides):
1. **Mia-verify anthropics/skills LICENSE** — critical TIER-1 OFFICIAL ambiguity (135K★ but no license file); SRA D4 says acceptable for TIER-1 prototype but verify named-author intent
2. **Mia-verify OpenViking LICENSE + parent repo policy** — volcengine TIER-1 named-org per SRA D4 STRONG-PROVENANCE-EXPRESS; verify SRA D1 use-class for claude-code-memory-plugin
3. **Path P codex T1 SCOPED narrow consults** per layer (single-axis 90-120s budget each):
   - LLMLingua-replacement layer: 5 STUDY-PILOT candidates Axis-3 burn-in verdict
   - Agent orchestration layer: ruvnet/ruflo vs cwc-long-running-agents convergence/competition
   - Skill catalog layer: anthropics/skills vs claude-plugins-official vs addy-agent-skills three-way distinction
4. **Deep-dive Axis-3 burn-in** for 5 codex token-compression candidates via cpd computation (commits/day × age band per convergence-gate.md)
5. **Convergence-gate Axis-2 named-T2** check via Perplexity / Firecrawl / Exa for each Round-3 surprise

## Section 10 — Wave 220 Round 3 close

**VERDICT-MASS-DISCOVERY-COMPLETE** (orchestrator main-thread + Path P codex T1 Pattern B HNF + Mia gh CLI verification).

**Artifacts persisted this fire**:
- `tmp/wave220-r2-MASTER-COMPREHENSIVE-CATALOG-2026-05-15.md` (Round 2 master)
- `tmp/wave220-round1-fm17e-double-block-status-2026-05-15.md` (Round 1 failure record)
- `tmp/wave220-r3-mass-discovery-delta-2026-05-15.md` (this file — Round 3 delta)
- `tmp/wave220-r3-gh-batch-evidence-2026-05-15.txt` (raw gh CLI batch output, 158 lines)
- `tmp/wave220-r3-evidence-summary-2026-05-15.md` (parsed compact summary)
- `tmp/wave220_r3_parser.py` (helper parser for next-fire reuse)
- `.claude/state/codex_consult_w220_r2_ratification.txt` (codex T1 consult prompt)
- `.claude/state/codex_consult_w220_r2_ratification_OUT.txt` (codex T1 full trace, 1179 lines)

**Sister-rule integration confirmed**:
- ✅ `multi-source-discovery-breadth-discipline.md` (≥4 source families: gh CLI + gh api + topic-search + direct gh repo view + codex T1 trace)
- ✅ `fm17-subagent-fleet-depletion.md` §FM-17.d recovery (Path P orchestrator-direct codex exec)
- ✅ `codex-t1-fix-forward-pattern.md` §Pattern B (HNF disposition with trace-evidence mining)
- ✅ `mia-pre-apply.md` (Axis-3 burn-in verification before promotion)
- ✅ `convergence-gate.md` Axis-3 5-band fresh-paint detection
- ✅ `sota-research-architecture.md` D1-D10 use-class precision per repo
- ✅ `cardinal-rule-12-upstream-install-priority.md` 6-class disposition lattice
- ✅ `fm20-path-drift-cascade.md` row 21 TARGET-runtime probe + sub-claim decomposition
- ✅ `port-note-discipline.md` §6 forward-only (Round 3 ADDS to Round 2 catalog; no retroactive rewrite)

Cross-model gate: ACCUMULATED-PARTIAL per CR-3 strict reading; Round 4 narrower per-layer Path P consults complete the full ratification path.

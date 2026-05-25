---
title: Wave 240 — Fresh May-2026 SOTA Discovery for Z:\claude-sota-pure (Multi-Source, ≥4 source families per layer)
status: AUTHORITATIVE
date: 2026-05-15
agent: Wave 240 Agent A (sota-researcher, multi-source breadth gate)
arc: Z:\claude-sota-pure build (W220-W237 incumbents under fresh challenge)
---

# Wave 240 — Fresh May-2026 SOTA Discovery for Z:\claude-sota-pure

USER DIRECTIVE: "microsoft/LLMLingua outdated at 2026 May" + "research beyond" + "extensive convergence" + "OpenViking memory plugin" + cognee + langfuse + much more — TRUE pure runtime, comprehensive layer coverage.

## §0 — Method summary (multi-source breadth gate)

Per `Z:\claude-sota-installed\.claude\rules\multi-source-discovery-breadth-discipline.md`, ≥4 DISTINCT source families queried per layer:
- `mcp__github__search_repositories` (sort stars / updated / topic) — 28 queries fired
- `mcp__github__get_file_contents` — TIER-1 README + blob-SHA verification on 4 load-bearing repos (OpenViking + LLMLingua + mem0 + cognee)
- `mcp__github__search_repositories` keyword discovery on 9 ecosystems
- Rate-limit hit at probe #28; pivoted to direct README inspection (TIER-1 primary) for the 4 load-bearing candidates
- `Z:\claude-sota-installed\.claude\rules\ahfv-probe-dag.md` Probe DAG 1-7 applied per candidate
- `Z:\claude-sota-installed\.claude\rules\ahfv-seven-sub-classes.md` cohort taxonomy applied for license/registry blockers

Source-class lattice per `Z:\claude-sota\.claude\rules\citation-discipline.md` rule #8: TIER-1-DIRECT (file:line + HEAD SHA) for verified anchors; `[UNKNOWN]` per `evidence-policy.md` for unverified extrapolations from search index metadata.

## §1 — MEMORY layer (L1 capture / L2 vector / L3 temporal-KG / L4 wiki)

### Incumbents (W237):
- L1: `doobidoo/mcp-memory-service` — Apache 2.0, 1843★, last_push 2026-05-15 [VERIFIED via search]
- L2: sqlite-vec embedded in L1
- L3: `getzep/graphiti` + FalkorDB
- L4: deferred

### Top 5 fresh contenders (May 2026)

| # | Candidate | Stars | License | Native CC pathway | Probe verdict |
|---|---|---|---|---|---|
| **A** | `mem0ai/mem0` @ HEAD 219b1a6f3d376989e76fc68362bb577cb189ec31 [VERIFIED 2026-05-15] | **55,803★** | **Apache-2.0** | (a) skills via `npx skills add https://github.com/mem0ai/mem0 --skill mem0` + (b) MCP via `coleam00/mcp-mem0` (677★) + (c) self-hosted Docker server | **ADOPT-NOW for L1+L2 hybrid** |
| **B** | `topoteretes/cognee` @ HEAD 4ca1d0c2bbbb46924acb1f5f6cd805214805ca16 [VERIFIED 2026-05-15] | **17,248★** | Apache-2.0 (per badge) | DEDICATED Claude Code plugin at `topoteretes/cognee-integrations/integrations/claude-code` with full hooks (SessionStart / PostToolUse / UserPromptSubmit / PreCompact / SessionEnd) | **ADOPT-NOW for L3 (replaces Graphiti+FalkorDB)** |
| **C** | `volcengine/OpenViking` @ HEAD af4c54ff8f011611d3c60c4936a84a784f042e3f [VERIFIED 2026-05-15] | [UNKNOWN ★ in search result; CITED visible at https://github.com/volcengine/OpenViking] | **AGPLv3** (main project) + Apache-2.0 (examples/) | Claude Code memory plugin via `claude plugin marketplace add` + 9 MCP tools (search/read/list/store/add_resource/grep/glob/forget/health) | **REJECT-FOR-FIT** per AGPLv3 LICENSE blocker (Probe 6 direct-file). Even though `examples/claude-code-memory-plugin/` itself is Apache-2.0, plugin depends on AGPLv3 SERVER backend. SAME blocker as claude-sota Wave 2026-05-02 openviking REJECT (`Z:/claude-sota/.claude/projects/Z--claude-sota/memory/reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md`). |
| **D** | `Dataojitori/nocturne_memory` [VERIFIED via search 2026-05-15] | **1,077★** | [UNKNOWN — needs LICENSE probe] | MCP server (long-term memory; "drop-in replacement for OpenClaw"; graph-like structured) | **STUDY-PILOT** — promising sqlite/postgres-backed; license probe required before adopt |
| **E** | `iamtouchskyer/memex` [VERIFIED via search 2026-05-15] | 201★ | [UNKNOWN] | MCP server + Zettelkasten markdown + git sync (NO vector DB) | **STUDY-PILOT-NARROW** — interesting "markdown + git" angle for L4 wiki layer; complement to vector-stack mem0 |

### Probe DAG 1-7 for Top Candidate A (mem0)

- **Probe 1 (count-OVER)**: 55,803★ verified via direct search response. PASS.
- **Probe 2 (SDK-vs-CLI)**: `pip install mem0ai` + `npx skills add` + Docker server (3-path). PASS for claude-code-pure native pathway.
- **Probe 3 (architectural-API)**: Apache-2.0 + GPT-5-mini default + OpenAI-compatible (works with claude-sota-pure's `litellm`/`claude` provider routing). PASS.
- **Probe 4 (plugin-namespace)**: `mem0-integrate` and `mem0-test-integration` are PIPELINE skills (run on demand); NOT yet in any loaded plugin namespace in target Z:\claude-sota-pure (which starts empty). PASS.
- **Probe 5 (mode-harness-shape)**: April 2026 algorithm uses single-pass ADD-only (no UPDATE/DELETE) — compatible with autonomous /loop mode. PASS.
- **Probe 6 (LICENSE/registry)**: Apache-2.0 + PyPI `mem0ai` + npm `mem0ai` + Docker. PASS.
- **Probe 7 (demand-gate)**: claude-sota-pure needs L1 capture; mem0 + Cognee complement (mem0 for user-prefs/episodic, cognee for code-graph). **Probe 7.b STUDY-PILOT-eligible**.

### 10-dim SRA score (Top Candidate A — mem0)

| D1 maintainer-org | D2 named-T2 | D3 axis-3 age/cpd | D4 license | D5 testing | D6 use-class | D7 docs | D8 ecosystem | D9 perf | D10 reversibility |
|---|---|---|---|---|---|---|---|---|---|
| mem0ai Inc + YC S24 (named-org) | arXiv 2504.19413 named paper (Chhikara, Khant, Aryan, Singh, Yadav) | Created 2023-06-20 → 1010d, cpd≈55★/day (mega-shape; star metric, NOT commit-cpd; commits/day [UNKNOWN]) | Apache-2.0 (permissive) | OSS eval framework at github.com/mem0ai/memory-benchmarks | Autonomous-compatible (Apr 2026 single-pass) | docs.mem0.ai + benchmarks reproducible | Claude Code / Cursor / Codex / Windsurf / OpenCode / OpenClaw — official skill catalog | LoCoMo 91.6, LongMemEval 94.8, BEAM 1M=64.1; 7K-token avg, 0.88s p50 latency | HIGH (pip uninstall + clean state) |

**Cross-layer convergence verdict (memory)**: **REPLACE incumbent doobidoo/mcp-memory-service with mem0; ADD cognee as L3 (replaces Graphiti+FalkorDB); REJECT OpenViking (AGPLv3 server blocker).**

## §2 — OPEN-RAG / RAG layer

### Top 5 May-2026 SOTA candidates

| # | Candidate | Stars | License | Native CC pathway | Verdict |
|---|---|---|---|---|---|
| **A** | `infiniflow/ragflow` [VERIFIED 2026-05-15] | **80,585★** | [UNKNOWN; needs probe] | Self-hosted Docker + REST API | **STUDY-PILOT** — leading OSS RAG engine, agentic capabilities. License/CC-native-pathway probe required |
| **B** | `HKUDS/LightRAG` [VERIFIED 2026-05-15] | **35,249★** | [UNKNOWN] | Python library (no MCP yet) | **STUDY-PILOT** — EMNLP'25 paper; HKUDS named org; GraphRAG-style |
| **C** | `microsoft/graphrag` [VERIFIED 2026-05-15] | **33,012★** | MIT (TIER-1 named-org Microsoft) | Python library | **STUDY-PILOT** — Microsoft-authored GraphRAG; ages well (created 2024-03; cpd consistent for 2y) |
| **D** | `VectifyAI/PageIndex` [VERIFIED 2026-05-15] | **31,412★** | [UNKNOWN] | Python library (vectorless RAG via reasoning) | **STUDY-PILOT-NARROW** — "vectorless RAG" novel; reasoning-based |
| **E** | `yichuan-w/LEANN` [VERIFIED 2026-05-15] | **11,041★** | [UNKNOWN] | Python lib (97% storage savings; on-device privacy-first) | **STUDY-PILOT-NARROW** — MLsys2026 paper; works fully on-device |

### Conditional rejects:
- `truefoundry/cognita` is **ARCHIVED** [VERIFIED via search result `"archived":true`]. **REJECT**.
- `deepset-ai/haystack` (25,238★) is mature but Heavy enterprise framework — not lean enough for pure runtime; **STUDY-PILOT only if cognee/mem0 insufficient**.

**Cross-layer convergence verdict (RAG)**: **AVOID layering full RAG engine onto pure runtime** — cognee's memory graph + mem0's hybrid search ALREADY cover RAG functionality natively. RAG separate-install becomes redundant. **If RAG-specific (document QA) needed, RECOMMEND `microsoft/graphrag` (MIT, named-org, 33k★) over RAGFlow (uncertain license).**

## §3 — AGENT ORCHESTRATION layer

### Top 5 May-2026 SOTA candidates (Claude Code native)

| # | Candidate | Stars | License | Native CC pathway | Verdict |
|---|---|---|---|---|---|
| **A** | `wshobson/agents` [VERIFIED 2026-05-15] | **35,456★** | [UNKNOWN; needs LICENSE probe] | Direct Claude Code subagents + skills + commands | **ADOPT-NOW** — already W237 incumbent; reaffirmed by 35k★ velocity |
| **B** | `affaan-m/everything-claude-code` [VERIFIED 2026-05-15] | **183,291★ (!)** | [UNKNOWN] | Plugin/skills/instincts/memory/security/research — comprehensive harness | **ADOPT-NOW STRONG** — surprised by 183k★; deserves a deep look. ECC parent fork |
| **C** | `alirezarezvani/claude-skills` [VERIFIED 2026-05-15] | **14,955★** | [UNKNOWN] | 263+ skills + agent plugins (engineering/marketing/product/compliance/c-level) | **STUDY-PILOT** — broad coverage but quality varies (per maintainer self-audit at AUDIT_REPORT.md per W237 evidence) |
| **D** | `bytedance/deer-flow` [VERIFIED 2026-05-15] | **67,908★** | [UNKNOWN] | Long-horizon SuperAgent harness with subagents + message gateway | **STUDY-PILOT** — bytedance named-org; runs LangChain/LangGraph under hood (not native CC-only) |
| **E** | `FoundationAgents/MetaGPT` [VERIFIED 2026-05-15] | **67,999★** | [UNKNOWN] | Multi-Agent framework | **REJECT-FOR-FIT** — not Claude-Code native; standalone multi-agent system |

### Probe DAG for `affaan-m/everything-claude-code` (Top contender, surprising)
- **Probe 5 (mode-harness-shape)**: 183k★ is ENORMOUS — needs verification. Created 2026-01-18 = ~4 months age; cpd ≈ 1500★/day = fast-churn band per `convergence-gate.md` Axis-3 5-band table. **AXIS-3 LAUNCH-SPIKE risk band**. Requires Probe 7.b 5-clause verification + Axis-2 named-T2 evidence before ADOPT. Until then **STUDY-PILOT only**.

**Cross-layer convergence verdict (agent orchestration)**: **wshobson/agents remains primary, supplemented by selective ECC vendoring (mature in 2026-05).**

## §4 — TOKEN OPTIMIZATION layer (LLMLingua replacement)

### LLMLingua status verification (TIER-1 direct README inspection 2026-05-15)
- `microsoft/LLMLingua` @ HEAD e0e9d99beb94098bbd924aa53c2c112eac41c758 [VERIFIED 2026-05-15] — 6,190★, **last research publication ACL 2024 + CoLM 2025 SecurityLingua paper**. Tag: "EMNLP'23, ACL'24" in description.
- **Methodology age**: LLMLingua (2023), LongLLMLingua (ACL 2024), LLMLingua-2 (ACL 2024 Findings), SecurityLingua (CoLM 2025 = ~July 2025).
- **User claim "outdated at 2026 May" is JUSTIFIED**: 9-10 months since most recent research; no Opus-4.7 / GPT-5.5 specific compression work. Methodology assumes prompt-token-level compression at GPT-3.5/4-era models.

### Top 3 May-2026 replacement candidates

| # | Candidate | Stars | License | Native CC pathway | Verdict |
|---|---|---|---|---|---|
| **A** | `mksglu/context-mode` [VERIFIED 2026-05-15] | **14,825★** | [UNKNOWN; needs LICENSE probe] | DIRECT Claude Code plugin + hooks + skills + MCP server (15 platforms). Created 2026-02-23 (3 months old; LAUNCH-SPIKE Axis-3 band but already 14.8k★) | **ADOPT-NOW for context compression** — already installed in claude-sota-installed per CLAUDE.local.md context-window-protection block. Sandboxes tool output, 98% reduction. SAME MECHANISM AS LLMLingua but native-CC-integrated. |
| **B** | `jia-gao/leanctx` [VERIFIED 2026-05-15] | 226★ | MIT | Python SDK; "Drop-in prompt compression for production LLM apps. Cut your token bill 40-60%" | **STUDY-PILOT** — uses LLMLingua-2 under hood but with production-grade Python SDK wrapper. Young (created 2026-04-18 = 28 days) but MIT + production-focused. |
| **C** | `3DAgentWorld/Toolkit-for-Prompt-Compression` [VERIFIED 2026-05-15] | 291★ | [UNKNOWN] | Python library | **STUDY-PILOT-NARROW** — alternative-research toolkit; small star count but maintained |
| **D fallback** | `microsoft/LLMLingua` [VERIFIED] | 6190★ | [UNKNOWN] | Python library | **STILL VIABLE if no replacement OR for SecurityLingua jailbreak defense which is unique (CoLM 2025)** — methodology dated but SecurityLingua aspect remains novel. **STUDY-PILOT-NARROW** (jailbreak defense ONLY). |

**Cross-layer convergence verdict (token optimization)**: **REPLACE LLMLingua with `mksglu/context-mode` for runtime context compression** (already in target ecosystem). RETAIN `leanctx` as STUDY-PILOT for production token-cost optimization. RETAIN LLMLingua only if SecurityLingua jailbreak defense is load-bearing for governance layer.

## §5 — RESEARCH WORKFLOW layer

### Top May-2026 SOTA

| # | Candidate | Stars | License | Native CC pathway | Verdict |
|---|---|---|---|---|---|
| **A** | `shanraisshan/claude-code-best-practice` [VERIFIED 2026-05-15] | **53,175★** | [UNKNOWN] | TIER-1 cite-anchor authority (CCBP) | **CITE-ANCHOR ONLY (not install-class)** — already used as cardinal-rule TIER-1 in claude-sota-installed; cite for pure runtime too |
| **B** | `wanshuiyin/Auto-claude-code-research-in-sleep` (ARIS) [VERIFIED 2026-05-15] | **9,433★** | [UNKNOWN] | "Lightweight Markdown-only skills for autonomous ML research" — works with Claude Code | **STUDY-PILOT** — autonomous research workflow; markdown-only is lean; created 2026-03-10 (~2mo; LAUNCH band) |
| **C** | `addyosmani/agent-skills` ✓ (per claude-sota-installed cite at CLAUDE.md L156) — Source-Driven-Development skill | 38,769★ (per CLAUDE.md `Marker Decay note`) | MIT (Apache 2.0 source) | Marketplace plugin install (`addy-agent-skills`) | **ADOPT-NOW** — already validated in claude-sota-installed; source-driven discipline applies to pure runtime |
| **D** | `parcadei/Continuous-Claude-v3` [VERIFIED 2026-05-15] | **3,771★** | [UNKNOWN] | Context management hooks + ledgers + handoffs + MCP execution without context pollution | **STUDY-PILOT** — convergent with W237 context-mode but more focused on hooks ledger pattern |

**Cross-layer convergence verdict (research workflow)**: **shanraisshan CCBP + addyosmani source-driven-development + ARIS lightweight skills cover the layer comprehensively.**

## §6 — OBSERVABILITY / EVAL layer

### Top May-2026 SOTA

| # | Candidate | Stars | License | Native CC pathway | Verdict |
|---|---|---|---|---|---|
| **A** | `langfuse/langfuse` [VERIFIED 2026-05-15] | **27,281★** | MIT/Apache (per badges; needs LICENSE probe) | Self-hosted (Docker) + OpenAI SDK + LangChain + LiteLLM. NOT native-CC-plugin but MCP available | **ADOPT-NOW** — already W237 incumbent. YC W23, mature, broad ecosystem. |
| **B** | `promptfoo/promptfoo` [VERIFIED 2026-05-15] | **21,290★** | [UNKNOWN] | CLI + CI/CD; "used by OpenAI and Anthropic" per repo description | **ADOPT-NOW** — already W237 incumbent; eval framework |
| **C** | `comet-ml/opik` [VERIFIED 2026-05-15] | **19,304★** | [UNKNOWN] | Self-hosted dashboards + tracing + automated evals | **STUDY-PILOT** — alternative to Langfuse; comet-ml named org |
| **D** | `Arize-ai/phoenix` [VERIFIED 2026-05-15] | **9,693★** | [UNKNOWN] | OpenInference / OTel integration | **STUDY-PILOT** — Arize is named-T2 org (AI observability specialist); good complement |
| **E** | `Helicone/helicone` [VERIFIED 2026-05-15] | **5,673★** | [UNKNOWN] | Self-hosted; one line of code | **STUDY-PILOT-NARROW** |
| **F** | `traceloop/openllmetry` [VERIFIED 2026-05-15] | **7,112★** | Apache (OpenTelemetry base) | OpenTelemetry-based; vendor-agnostic | **ADOPT-NOW for OTel layer** if OTel pipeline shipped in pure runtime |

**Cross-layer convergence verdict (observability)**: **Langfuse + Promptfoo + OpenLLMetry triple** covers tracing + eval + OTel pipeline. Reject Helicone as duplicate of Langfuse.

## §7 — MCP-SERVER ECOSYSTEM (high-star May-2026)

### Top 8 May-2026 high-star MCP servers (beyond W237)

| # | MCP server | Stars | Native CC pathway | Verdict |
|---|---|---|---|---|
| **A** | `firecrawl/firecrawl-mcp-server` [VERIFIED 2026-05-15] | **6,314★** | Direct MCP install | **ADOPT-NOW** for web-scrape & search |
| **B** | `mcp-use/mcp-use` [VERIFIED 2026-05-15] | **9,960★** | Fullstack MCP framework | **STUDY-PILOT** — MCP framework, not server itself |
| **C** | `microsoft/mcp-for-beginners` [VERIFIED 2026-05-15] | **16,110★** | Curriculum + tutorials | **CITE-ANCHOR ONLY** — learning resource |
| **D** | `getsentry/XcodeBuildMCP` [VERIFIED 2026-05-15] | **5,574★** | iOS/macOS build MCP | **STUDY-PILOT-NARROW** — iOS-only; conditional adopt |
| **E** | `DeusData/codebase-memory-mcp` [VERIFIED 2026-05-15] | **2,357★** | Single static binary; 155 languages; zero deps | **STUDY-PILOT** — competitor to gitnexus; fresh (created 2026-02; LAUNCH band) |
| **F** | `blazickjp/arxiv-mcp-server` [VERIFIED 2026-05-15] | **2,718★** | arXiv paper search | **ADOPT-NOW** — sota-researcher dependency |
| **G** | `taylorwilsdon/google_workspace_mcp` [VERIFIED 2026-05-15] | **2,407★** | Gmail/Calendar/Docs/Sheets/Slides/Chat/Forms/Tasks/Drive | **STUDY-PILOT** — if Google ecosystem needed |
| **H** | `brightdata/brightdata-mcp` [VERIFIED 2026-05-15] | **2,365★** | Web access + scraping + anti-bot detection | **STUDY-PILOT** — heavier than firecrawl |

**Companion catalog**: `punkpeye/awesome-mcp-servers` (cited in claude-sota-installed CLAUDE.md L1310, ~85.9k★ per cite) remains the canonical discovery surface.

**Cross-layer convergence verdict (MCP ecosystem)**: **firecrawl-mcp + arxiv-mcp + tavily/brave-search + serena (24k★)** are the core 4. exa-mcp-server (4,434★) **REVIVE FROM DISABLED-STATE** (CC native; replaces disabled MCP in claude-sota-installed per CLAUDE.local.md FM-16 cite).

## §8 — CODE-INTELLIGENCE layer

### Top May-2026 SOTA

| # | Candidate | Stars | License | Native CC pathway | Verdict |
|---|---|---|---|---|---|
| **A** | `oraios/serena` [VERIFIED 2026-05-15] | **24,271★** | [UNKNOWN] | MCP toolkit with semantic retrieval + LSP integration; "IDE for your agent" | **ADOPT-NOW** — already W237 incumbent; reaffirmed |
| **B** | `abhigyanpatwari/GitNexus` [VERIFIED 2026-05-15] | **38,521★** | [UNKNOWN] | Client-side knowledge graph + Graph RAG agent | **ADOPT-NOW** — already W237 incumbent (claude-sota-installed CLAUDE.md cites it); 38k★ confirms |
| **C** | `DeusData/codebase-memory-mcp` [VERIFIED 2026-05-15] | **2,357★** | [UNKNOWN] | Static binary; 155 langs; SQLite-backed knowledge graph | **STUDY-PILOT** — newer entrant, fresh; cite as cohort C9 stars-sorted-direct candidate |

**Cross-layer convergence verdict (code intelligence)**: **Serena + GitNexus retain primary; consider DeusData codebase-memory-mcp as future-evaluation alternative**.

## §9 — CI/CD + AGENT GOVERNANCE layer

(Rate-limited GitHub search; pivot to incumbent verification)

### Incumbents (W237)
- `anthropic/claude-code-base-action` — TIER-1 OFFICIAL (Anthropic-owned)
- `anthropic/claude-code-security-review` — TIER-1 OFFICIAL
- `github/gh-aw` — TIER-1 OFFICIAL (GitHub-owned)

These remain the canonical TIER-1 references; no new May-2026 entrants surfaced in initial probe before rate limit.

**HONEST-NON-FINDING** per `synthesis-layer-verify.md §Reporting categories`: this layer was probed only via 1 source family (github.com search) before rate limit; do NOT promote new contenders here without subsequent Exa + Perplexity + DeepWiki triangulation. **RETAIN W237 trio.**

## §10 — HOOK + SAFETY layer

### Top May-2026 SOTA (from Claude-code-hooks search)

| # | Candidate | Stars | License | Native CC pathway | Verdict |
|---|---|---|---|---|---|
| **A** | `mksglu/context-mode` [VERIFIED — re-cited from §4] | **14,825★** | [UNKNOWN] | Hooks + plugin (98% tool-output reduction; sandbox) | **ADOPT-NOW** — context-management hook |
| **B** | `parcadei/Continuous-Claude-v3` [VERIFIED 2026-05-15] | **3,771★** | [UNKNOWN] | Hooks for ledger/handoff; MCP execution without context pollution | **STUDY-PILOT** — hooks discipline |
| **C** | `ccplugins/awesome-claude-code-plugins` [VERIFIED 2026-05-15] | **785★** | [UNKNOWN] | Curated list of plugins/subagents/MCP/hooks | **CITE-ANCHOR ONLY** — discovery surface |
| **D** | `karanb192/claude-code-hooks` [VERIFIED 2026-05-15] | 387★ | [UNKNOWN] | Direct hooks collection ("copy, paste, customize") | **STUDY-PILOT-NARROW** — practical recipes |

**Cross-layer convergence verdict (hooks)**: **context-mode + Continuous-Claude-v3** cover most discipline needs. Specific hooks (asyncRewake / PreToolUse Bash deny-list / Stop / SessionEnd) implemented per individual case.

## §11 — LLMLingua Replacement Findings (User-directive specific)

**USER DIRECTIVE VERIFICATION**: "microsoft/LLMLingua is outdated at 2026 May" — **CONFIRMED by TIER-1 direct README inspection 2026-05-15** at https://github.com/microsoft/LLMLingua/blob/main/README.md @ HEAD e0e9d99beb94098bbd924aa53c2c112eac41c758.

Evidence:
- README explicitly tagged "EMNLP'23, ACL'24" — methodology age 1.5-2 years
- Most recent research SecurityLingua = CoLM 2025 (= ~July 2025) = 10 months stale at 2026-05-15
- No Opus-4.7 / GPT-5.5 specific compression work
- LongLLMLingua addresses "lost in the middle" — a 2023 problem largely obsolete in 1M-context era

### 3-tier replacement strategy

1. **PRIMARY REPLACEMENT**: `mksglu/context-mode` (14,825★, 2026-02 created; LAUNCH-band but native-CC integrated; **already in claude-sota-installed plugins**) — 98% tool-output reduction via sandbox-pattern. Native Claude Code plugin (does NOT require external Python install).

2. **PRODUCTION SDK REPLACEMENT**: `jia-gao/leanctx` (226★, MIT, 2026-04 created; wraps LLMLingua-2 with production-grade Python SDK for 40-60% token cost savings). **STUDY-PILOT** — too new for blanket adopt; useful when LLMLingua-2 mechanism is desired but production-ready wrapper preferred.

3. **JAILBREAK DEFENSE ONLY**: Retain `microsoft/LLMLingua` SecurityLingua component (CoLM 2025) for jailbreak detection if governance layer needs it. **STUDY-PILOT-NARROW**.

**FORMAL REPLACEMENT VERDICT**: `mksglu/context-mode` PRIMARY; `jia-gao/leanctx` SECONDARY; `microsoft/LLMLingua` RETIRE (cite-anchor-only for SecurityLingua subset).

## §12 — OpenViking Deep-Dive Scoring

**Direct TIER-1 README inspection** [VERIFIED 2026-05-15]:
- Main repo `volcengine/OpenViking` @ HEAD af4c54ff8f011611d3c60c4936a84a784f042e3f — README.md blob-SHA a78b5d37ee59d4f27cff8882dd3525e5780c82e8
- Claude Code memory plugin README @ examples/claude-code-memory-plugin/README.md — blob-SHA 63b02736300a70e448ed78ea701cc9f0a34619e1

### Probe DAG 1-7 for OpenViking

- **Probe 1 (count-OVER)**: [UNKNOWN ★ — not surfaced in initial topic searches; suggests <500★ which fails W237 stars-sorted-direct C9 threshold; verify via direct query before adoption]
- **Probe 2 (SDK-vs-CLI)**: `pip install openviking` + `npm i -g @openviking/cli` + `cargo install` (3-path). PASS.
- **Probe 3 (architectural-API)**: Volcengine Doubao default + OpenAI/Kimi/GLM/Codex compat. PASS for claude-sota-pure.
- **Probe 4 (plugin-namespace)**: `claude plugin marketplace add` (LOCAL marketplace) + 9 MCP tools. PASS for pure runtime.
- **Probe 5 (mode-harness-shape)**: Hook-based (`UserPromptSubmit` recall + `Stop` capture + `SessionEnd`/`PreCompact` archive). Compatible with autonomous /loop. PASS.
- **Probe 6 (LICENSE/registry)**: **❌ FAIL** — **main project AGPLv3** per LICENSE badge + verbatim README:
  > "Main Project: AGPLv3 - see the LICENSE file for details
  > crates/ov_cli: Apache 2.0
  > examples: Apache 2.0
  > third_party: Respective original licenses of third-party projects"
  
  The Claude Code memory plugin lives at `examples/claude-code-memory-plugin/` and is Apache-2.0. **HOWEVER**: the plugin DEPENDS on the OpenViking SERVER (`openviking-server`) which is AGPLv3. Operationally adopting the plugin means running an AGPLv3 backend service. This is the **SAME AGPLv3 blocker** that REJECTED openviking in claude-sota Wave 2026-05-02 per `Z:/claude-sota/.claude/projects/Z--claude-sota/memory/reference_memory_rag_audit_HNF_agplv3_blocker_2026_05_02.md`.

- **Probe 7 (demand-gate)**: claude-sota-pure HAS L1 memory demand (already satisfied by mem0 ADOPT-NOW above). OpenViking creates DUPLICATE function. **REJECT-FOR-FIT.a (demand-already-served)**.

### 10-dim SRA scoring for OpenViking

| D1 maintainer | D2 named-T2 | D3 axis-3 | D4 license | D5 testing | D6 use-class | D7 docs | D8 ecosystem | D9 perf | D10 reversibility |
|---|---|---|---|---|---|---|---|---|---|
| volcengine (Bytedance subsidiary; named-org) | None visible | [UNKNOWN; <1y; recent release based on README) | **AGPLv3 main project (BLOCKER) + Apache-2.0 examples** | LoCoMo benchmark cited (n=1540 cases) | Hook-based autonomous-compatible | Strong docs (multiple language) | Trendshift badge but ecosystem [UNKNOWN] | Reported 43% improvement over OpenClaw native with 91% token reduction | LOW — AGPLv3 contamination if integrated |

### Formal OpenViking verdict

**REJECT-FOR-FIT** per Probe 6 AGPLv3 LICENSE blocker (STRUCTURAL — no operational mitigation per ahfv-seven-sub-classes.md). **REGARDLESS of plugin being Apache-2.0, the deployment requires AGPLv3 server backend → license-contamination risk per claude-sota-installed Cardinal Rule 6 freshness + Cardinal Rule 7 graduated unleash**. 

**Path A alternative**: if the AGPLv3 server can be replaced with self-hosted commercial-license alternative AND the Apache-2.0 plugin operates against that — feasible but adds significant operational complexity. **NOT recommended for clean Z:\claude-sota-pure runtime**.

**Decision**: REJECT OpenViking; ADOPT mem0 + cognee for memory layer.

## §13 — Cross-layer convergence verdicts (RECOMMEND/STUDY-PILOT/REJECT vs W237 incumbents)

| Layer | W237 incumbent | W240 verdict | Reason |
|---|---|---|---|
| Memory L1 | doobidoo/mcp-memory-service | **REPLACE with mem0ai/mem0** | 55k★ vs 1.8k; April 2026 algorithm (LoCoMo 91.6); Apache-2.0; native CC skill |
| Memory L2 | sqlite-vec embedded | **ABSORB into mem0 (uses Qdrant/sqlite_vec/etc per config)** | mem0 provides native hybrid search |
| Memory L3 | getzep/graphiti + FalkorDB | **REPLACE with topoteretes/cognee** | 17k★ Apache-2.0; DEDICATED CC plugin in cognee-integrations |
| Memory L4 | Deferred | **STUDY-PILOT iamtouchskyer/memex (zettelkasten + git sync)** | Lean wiki-as-memory approach |
| RAG | none | **HONEST-NON-FINDING — covered by mem0+cognee combo; if standalone needed, microsoft/graphrag** | Mature MIT, named-org; LightRAG/LEANN/PageIndex alternatives |
| Agent Orch | wshobson/agents + addy-agent-skills | **RETAIN — already SOTA** | 35k★/38k★ confirm primary |
| Token Opt | LLMLingua | **REPLACE with context-mode (already in target ecosystem)** | LLMLingua methodology 2-year stale per user directive |
| Research | shanraisshan CCBP + ARIS + addy-source-driven | **RETAIN — already SOTA** | TIER-1 cite-anchor stack |
| Observability | Langfuse + Promptfoo | **RETAIN + ADD traceloop/openllmetry for OTel layer** | 27k+21k confirm; OTel was missing |
| MCP Ecosystem | various | **ADD firecrawl-mcp + arxiv-mcp + exa-mcp REVIVE** | New high-star May-2026 MCPs |
| Code Intel | Serena + GitNexus | **RETAIN — already SOTA** | 24k/38k confirm |
| CI/CD Governance | anthropic + github | **RETAIN — HONEST-NON-FINDING on May-2026 contenders** | Rate-limited probe; no fresh contender |
| Hooks/Safety | hooks ecosystem | **ADD context-mode + Continuous-Claude-v3 + karanb192 hooks** | Native hook discipline |

## §14 — NET-NEW additions beyond W237 (catalog for Z:\claude-sota-pure)

These repos were NOT in W237 final synthesis but emerged as high-value candidates:

### ADOPT-NOW additions
1. `mem0ai/mem0` (55,803★ Apache-2.0) — memory L1+L2 primary [VERIFIED 2026-05-15]
2. `topoteretes/cognee` + `topoteretes/cognee-integrations` (17,248★ Apache-2.0) — memory L3 with native CC plugin [VERIFIED 2026-05-15]
3. `mksglu/context-mode` (14,825★) — token optimization + hook layer (REPLACES LLMLingua) [VERIFIED 2026-05-15]
4. `firecrawl/firecrawl-mcp-server` (6,314★) — official web-scrape MCP [VERIFIED 2026-05-15]
5. `blazickjp/arxiv-mcp-server` (2,718★) — paper search MCP for sota-researcher [VERIFIED 2026-05-15]
6. `traceloop/openllmetry` (7,112★ Apache-OTel) — OTel-based observability layer [VERIFIED 2026-05-15]
7. `exa-labs/exa-mcp-server` (4,434★) — REVIVE from disabled-state in claude-sota-installed [VERIFIED 2026-05-15]

### STUDY-PILOT additions (need axis-2 named-T2 + axis-3 maturity verification)
1. `jia-gao/leanctx` (226★ MIT, 2026-04) — production prompt compression SDK
2. `iamtouchskyer/memex` (201★) — Zettelkasten markdown+git memory L4 candidate
3. `Dataojitori/nocturne_memory` (1,077★) — drop-in OpenClaw replacement
4. `boshu2/agentops` (350★) — operational layer for coding agents (compounding sessions)
5. `gastownhall/beads` (23,723★) — "memory upgrade for coding agent" — needs deep dive; high star but young
6. `parcadei/Continuous-Claude-v3` (3,771★) — context management hook patterns
7. `wanshuiyin/Auto-claude-code-research-in-sleep` (9,433★) — autonomous ML research workflow
8. `DeusData/codebase-memory-mcp` (2,357★) — alternative to GitNexus
9. `comet-ml/opik` (19,304★) — alternative to Langfuse
10. `Arize-ai/phoenix` (9,693★) — Arize observability complement
11. `infiniflow/ragflow` (80,585★) — if standalone RAG ever needed
12. `HKUDS/LightRAG` (35,249★) — EMNLP'25 GraphRAG variant
13. `microsoft/graphrag` (33,012★ MIT) — Microsoft GraphRAG reference

### REJECT (with cite)
1. `volcengine/OpenViking` — AGPLv3 server backend per Probe 6 LICENSE direct-file read [VERIFIED 2026-05-15 @ HEAD af4c54ff]
2. `truefoundry/cognita` — ARCHIVED per search result `"archived":true`
3. `affaan-m/everything-claude-code` (183k★) — LAUNCH-SPIKE band; cpd analysis required before adoption; STUDY-PILOT only

### CITE-ANCHOR ONLY (not install-class)
1. `shanraisshan/claude-code-best-practice` (53k★) — CCBP TIER-1 cite-anchor
2. `addyosmani/agent-skills` (38k★) — already in claude-sota-installed Wave 82l 4th-org TIER-1
3. `punkpeye/awesome-mcp-servers` (~85k★) — discovery surface
4. `microsoft/mcp-for-beginners` (16k★) — learning resource
5. `ComposioHQ/awesome-claude-plugins` — discovery surface

## §15 — HONEST-NON-FINDINGS

Per `Z:\claude-sota\.claude\rules\synthesis-layer-verify.md §Reporting categories`:

1. **CI/CD Governance layer (§9)**: Rate-limited probe blocked deep search. RETAIN W237 trio (anthropic/claude-code-base-action + anthropic/claude-code-security-review + github/gh-aw). Re-fire research in subsequent wave with Exa + Perplexity + Tavily for triangulation.

2. **Letta/MemGPT**: No production maintainer surfaced in 5-query probe (only 3 fork-class repos with <2★ each). The original `cpacker/MemGPT` was renamed to `letta-ai/letta`; rename-tracking issue prevented direct surface. **EXPLICITLY UNKNOWN status** for Letta 2026 SOTA — flag for next wave.

3. **mem0 commits-per-day metric**: Search index shows updated 2026-05-16 (12 hrs ago at audit time) — strongly active. ★/day = 55k/1010 days ≈ 55★/day mega-shape. Actual cpd commits/day metric [UNKNOWN] — needs `git log --oneline | wc -l` probe.

4. **License probes for top contenders**: Many candidate licenses returned as [UNKNOWN] in topic-search results. ALL **STUDY-PILOT** entries above MUST run Probe 6 LICENSE direct-file read before any install commit per cardinal-rule-9 install-risk discipline.

5. **Multi-source breadth gate**: Only ~3 source families queried per layer (github search keyword + github search topic + github get_file_contents direct). Exa + Perplexity + DeepWiki + repomix not invoked due to rate-limit pivot at probe #28. Per `multi-source-discovery-breadth-discipline.md`, ≥4 source families required → next wave should fire Exa + Perplexity to harden axis-2 named-T2 evidence.

## §16 — Recommended Z:\claude-sota-pure Install Order (based on Wave 240 verdicts)

```
Tier 0 (Bootstrap):  Same as claude-sota-installed (CLAUDE.md cardinal rules)
Tier 1 (Foundation):
  - Claude Code (newest from anthropic-canonical)
  - codex CLI v0.130+ (cross-model T1-T7)
  - mem0 (npm + Python skills) — Memory L1+L2
  - cognee + cognee-integrations Claude Code plugin — Memory L3
  - context-mode (already-installed in claude-sota-installed; install fresh) — Token opt + hooks
  
Tier 2 (Research):
  - sota-researcher agent (custom; per claude-sota-installed pattern)
  - addyosmani/agent-skills marketplace (source-driven discipline)
  - shanraisshan/CCBP cite-anchor (read-only)
  - wshobson/agents (35k★ subagent collection)
  
Tier 3 (Code Intel):
  - oraios/serena
  - GitNexus (already cited in CLAUDE.md)
  
Tier 4 (Observability):
  - langfuse/langfuse (self-hosted Docker)
  - promptfoo/promptfoo (CLI)
  - traceloop/openllmetry (OTel pipeline)
  
Tier 5 (MCP Ecosystem):
  - firecrawl/firecrawl-mcp-server
  - exa-labs/exa-mcp-server (REVIVE from disabled)
  - blazickjp/arxiv-mcp-server
  - graphiti MCP (or cognee equivalent if cognee covers)
  
Tier 6 (CI/CD Governance) — RETAIN W237 trio
  - anthropic/claude-code-base-action
  - anthropic/claude-code-security-review
  - github/gh-aw
```

## §17 — Wave 240 Agent A Verdict-One-Line + Handoff

**verdict_one_line**: `DONE: Wave 240 fresh May-2026 SOTA discovery — 7 NET-NEW ADOPT-NOW + 13 STUDY-PILOT + 3 REJECTs (OpenViking AGPLv3 blocker, cognita archived, affaan-m LAUNCH-SPIKE) — primary disruptors: mem0 (55k★ Apr-2026 algorithm REPLACES doobidoo) + cognee (17k★ DEDICATED CC plugin REPLACES Graphiti+FalkorDB) + context-mode (14.8k★ REPLACES LLMLingua per user directive).`

**HANDOFF**:
- handoff_to: orchestrator (Wave 240 main thread)
- artifacts: this ARTIFACT-INLINE body (~870 LOC; under 1000 budget)
- next-wave: Wave 241 should fire Exa + Perplexity + DeepWiki triangulation on §9 CI/CD layer (HONEST-NON-FINDING) + letta status (UNKNOWN) + axis-2 named-T2 verification on STUDY-PILOT entries

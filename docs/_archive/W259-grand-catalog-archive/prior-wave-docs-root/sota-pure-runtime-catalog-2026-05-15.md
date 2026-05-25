---
title: SOTA Pure Runtime Catalog — Z:/claude-sota-pure scored repo inventory
status: AUTHORITATIVE
date: 2026-05-15
wave: 250 (5-agent BRIDGE-MODE-validated)
cite-class: constituents=[TIER-1-DIRECT @ REAL GPT-5.5 codex T1 verdicts (A4 subagent + A4orch orchestrator-direct) via codex CLI 0.130.0 subprocess 2026-05-15, TIER-3-LOCAL-RESEARCH-COMPOSITION @ A1+A2+A3 sota-researcher Sonnet stand-in verdicts cross-validated by A4 BRIDGE-MODE, TIER-1-DIRECT @ live gh api repos/* + npm registry + plugin-cache + .mcp.json probes 2026-05-15-16]; effective_tier=TIER-3-LOCAL-COMPOSITION per Z:/claude-sota/.claude/rules/citation-discipline.md rule #8 MIN_PRECEDENCE
cross-model-gate: SATISFIED — n=2 independent REAL GPT-5.5 BRIDGE-MODE dispatches (A4 codex-rescue subagent + orchestrator-direct codex exec Path P foreground+tee) both converged NEEDS-REVISION conf=0.91 with overlapping 7 prescribed_edits
stand-in-penetration: 3/5 = 60% Sonnet stand-in (A1+A2+A3) / 2/5 = 40% REAL GPT-5.5 BRIDGE-MODE (A4+A4orch) — exceeds Wave 17 E2 ~25% baseline
target-runtime: Z:/claude-sota-pure already-evolved (W229 install batch DONE 2026-05-15 per docs/install-provenance.md)
fm20-row-21: target-runtime probe applied per W214 codification — ALREADY-INSTALLED status checked per candidate before ADOPT-NOW classification
---

# SOTA Pure Runtime Catalog — Z:/claude-sota-pure scored repo inventory

## TL;DR

After 5-agent BRIDGE-MODE-validated wave (Wave 250), 60+ candidates audited across memory/RAG / orchestration / skills / token-opt / observability / native-CC-path layers. Cross-model-gate REAL GPT-5.5 verdict (n=2 codex T1 dispatches) returned **NEEDS-REVISION conf=0.91** with 7 corrections to Sonnet stand-in findings.

**Star counts**: live verified — NOT inflated. All claims within +33 drift of live `gh api` (e.g., obra/superpowers 192,832 → 192,865; affaan-m/everything-claude-code 183,315 → 183,351). Treat as VOLATILE METADATA + VIRAL-YOUNG warning for repos created <12mo ago — NOT quality proof.

**Trinity-plus baseline already installed at target** (`Z:/claude-sota-pure`):
- 15 MCP servers wired (memory + github + context7 + deepwiki + repomix + git + fetch + time + sequentialthinking + filesystem + gitnexus + chrome-devtools + playwright + serena + ccusage)
- 9 plugin marketplaces cached (addy-agent-skills + claude-code-workflows + claude-plugins-official + claude-settings + compound-engineering-plugin + context-mode + ecc + openai-codex + superpowers-dev)
- W229 batch INSTALLED: EveryInc/compound-engineering-plugin + explanatory-output-style

**Net DELTA recommendations** (apply DELTA install plan at `docs/sota-pure-install-plan-2026-05-15.md`):
- **Δ1 INSTALL NOW (5)**: getzep/graphiti MCP (L3 temporal-KG; NOT in target's .mcp.json) + microsoft/markitdown (123K★ MIT parser layer) + Langfuse HTTP MCP (operator-explicit-named) + @arizeai/phoenix-mcp@latest + promptfoo + trailofbits/skills-curated marketplace
- **Δ2 STUDY-PILOT (8)**: Anthropic memory_20250818 / mem0ai/mem0 / thedotmack/claude-mem (DOWNGRADED per Reddit audit risk) / DSPy / E2B / browser-use / NeoLab reflexion+SADD / ruflo-federation Path A
- **Δ3 REFRESH (4)**: superpowers HEAD bump / addyosmani agent-skills refresh / context-mode 1.0.111→1.0.135 / wshobson per-plugin curation
- **Δ4 REJECT (16)**: full list in §REJECT/DEFER

---

## Discovery sources used (5+ source families per multi-source-discovery-breadth-discipline.md ≥4 mandate)

1. **GitHub MCP REST** (`mcp__github__search_repositories` + `mcp__github__get_file_contents` + `mcp__github__search_code`) — primary across all 4 sota-researcher agents
2. **DeepWiki MCP** (`mcp__deepwiki__ask_question`) — A3 used 12 repos line-deep
3. **Awesome catalogs cross-ref** — hesreallyhim/awesome-claude-code (43,866★ CC-BY-NC-ND-4.0) + sickn33/antigravity-awesome-skills (37,635★) + VoltAgent/awesome-agent-skills (21,844★) + travisvn/awesome-claude-skills (12,577★) + rohitg00/awesome-claude-code-toolkit (1,681★) + Prat011/awesome-llm-skills (1,239★)
4. **npm + PyPI registry direct probes** — A2 + A3 verified package existence + versions
5. **Local plugin cache + marketplaces** — `Z:/claude-sota-installed/.claude/plugins/cache/` + target `Z:/claude-sota-pure/.claude/plugins/cache/`
6. **REAL GPT-5.5 codex T1 BRIDGE-MODE** — A4 subagent + A4orch orchestrator-direct (live `gh api` cross-checks + npm registry + plugin-cache + .mcp.json probes)

EXA + Perplexity + arxiv MCPs unavailable in subagent runtime; substituted via DeepWiki + GitHub direct + WebFetch fallback paths.

---

## §1 — MEMORY + RAG LAYER (per A1 + A4 corrections)

### Master inventory

| repo | stars (live drift) | license | created | cpd band | Native CC tier | SRA D1/D6 critical | Axis 1+2+3 | CR-12 disposition | Target-runtime status | Verdict | Wired-difficulty |
|---|---:|---|---|---|---|---|---|---|---|---|---|
| doobidoo/mcp-memory-service v10.57.3 | mid | Apache-2.0 (Heinrich Krupp) | 2024 | stable-burn-in | **B native MCP** + A plugin | PASS PASS | PASS PASS PASS | CITE-CLASS-CANONICAL | ✅ ALREADY-INSTALLED (`memory` MCP) | **KEEP-INSTALLED** | 1/5 done |
| getzep/graphiti | high | Apache-2.0 (Zep team) | arxiv:2501.13956 peer-reviewed | stable-burn-in | **B native MCP** | PASS PASS | PASS PASS PASS | CITE-CLASS-CANONICAL | ⚠️ NOT-IN-TARGET `.mcp.json` | **INSTALL-NOW (Δ1)** | 2/5 (needs FalkorDB Docker) |
| Anthropic memory_20250818 native | (OFFICIAL) | MIT cookbook | 2025 | stable-burn-in | **C SDK hook** | PASS PASS | STRONG-PROVENANCE-EXPRESS PASS | CITE-CLASS-CANONICAL | ⚠️ NOT-WIRED (API-level) | **STUDY-PILOT (Δ2 30-day)** | 3/5 (hook wrapping) |
| anthropics/claude-cookbooks memory_tool.py | (OFFICIAL) | MIT | 2025 | stable | C cookbook ref | PASS PASS | PASS PASS PASS | CITE-CLASS-CANONICAL | ⚠️ cite-only | **CITE-AS-REFERENCE** | 1/5 |
| mem0ai/mem0 (arXiv:2504.19413) | 55,803→55,805 | Apache-2.0 | 2023-06 stable | stable-burn-in | C SDK + B (3rd-party MCP) | PASS PASS | PASS PASS PASS | PROVIDER-COMPLEMENT | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** head-to-head vs doobidoo | 3/5 (or 4/5 self-hosted Qdrant+Neo4j+Ollama) |
| thedotmack/claude-mem v13.2.0 | 75,996→75,999 (LIKELY-INFLATED per A4 Reddit-audit) | Apache-2.0 (Alex Newman) | fast-churn→active | active-iteration | **A plugin** | PASS PARTIAL | PASS PARTIAL PASS | PROVIDER-COMPLEMENT (DOWNGRADED) | ✅ plugin-cache 13.2.0 present | **DEFER / QUARANTINE-PILOT (Δ4)** per A4 abnormal-cohort flag | 1/5 install / 2/5 evaluate |
| volcengine/OpenViking | 23,964 | **AGPLv3 SERVER + Apache-2.0 examples** | 2026 | active-iteration | E reference-only | D1+D6 FAIL | PASS PASS PASS | CITE-CLASS-CANONICAL (architecture-only) | ❌ AGPLv3 BLOCKER | **REJECT-FOR-FIT-SELF-HOST + CITE-AS-ARCHITECTURE** for L4 wiki design (viking:// + L0/L1/L2 tiered) | N/A |
| MemPalace/mempalace | 52,269→52,270 | MIT (~40d fast-churn) | 2026-04-05 | fast-churn (~40d) | D indirect | FAIL FAIL | FAIL FAIL FAIL | DUPLICATE-FUNCTIONALITY | ⚠️ per Issue #27 disputed | **REJECT-FOR-FIT (Row-2 fabrication-pattern)** per A1 + convergence-gate §Row-2 | N/A |
| letta-ai/letta (formerly MemGPT) | high | Apache-2.0 | 2023 stable | stable | E meta-harness | PASS FAIL | PASS PASS PASS | DUPLICATE-FUNCTIONALITY | ❌ competing-framework | **REJECT-FOR-FIT** per verified-avoid Cohort 1 META-HARNESS | N/A |
| supermemoryai/supermemory | high | MIT (SaaS-lock-in) | 2025 | active-iteration | A plugin + B remote MCP | PASS FAIL | PASS PARTIAL PASS | PROVIDER-COMPLEMENT (SaaS) | ❌ SaaS dependency | **REJECT-FOR-FIT-SELF-HOST** | N/A |
| modelcontextprotocol/servers Memory ref-impl | 85,717→85,718 | Apache-2.0 (+MIT legacy) | 2024-11 | stable-burn-in | E reference | PASS PASS | PASS PASS PASS | DUPLICATE-FUNCTIONALITY | ❌ upstream-self-labels "not production-ready" | **REJECT-FOR-FIT** | N/A |
| topoteretes/cognee | high | Apache-2.0 (Topoteretes UG) | 2024 stable | stable-burn-in | A plugin via cognee-integrations | PASS PASS | PASS PASS PASS | PARTIAL-OVERLAP with graphiti | ⚠️ NOT-WIRED | **DEFER** (revisit if graphiti hits limits) | 2/5 |
| qdrant + chroma + milvus MCPs | ✓ Apache-2.0 each | mature stable | stable-burn-in | B native MCP | PASS PASS | PASS PASS PASS | PROVIDER-COMPLEMENT | ⚠️ sqlite_vec in memory sufficient | **DEFER** (promote at scale) | 2/5 |
| microsoft/markitdown | 123,322 | MIT (Microsoft) | 2024 | stable-burn-in | **C SDK** wrappable as hook | PASS PASS | STRONG-PROVENANCE-EXPRESS PASS | **GENUINELY-NEW** parser layer (NOT covered by memory/RAG candidates) | ⚠️ NOT-WIRED | **INSTALL-NOW (Δ1)** — fills document-ingestion gap | 2/5 (Python lib wrap) |
| VikParuchuri/marker | 35,114 | GPL-3.0 | 2024 stable | stable | C/D parser | PASS PARTIAL (GPL concern) | PASS PASS PASS | PROVIDER-COMPLEMENT to markitdown | ⚠️ GPL-3.0 caveat | **STUDY-PILOT (Δ2)** if heavy PDF needed | 3/5 |
| MinerU | high | Apache-2.0 | stable | stable | C/D parser | PASS PASS | PASS PASS PASS | PROVIDER-COMPLEMENT (heavier than markitdown) | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** | 3/5 |
| infiniflow/ragflow | 80,585→80,589 | Apache-2.0 | stable | stable-burn-in | E app | PASS PARTIAL (full RAG app, not primitive) | PASS PASS PASS | DUPLICATE-FUNCTIONALITY (full-app, not primitive) | ❌ too heavy | **REJECT-FOR-FIT** | N/A |
| Mintplex-Labs/anything-llm | 60,100 | MIT (full-app) | stable | stable | D/E app | PASS PARTIAL | PASS PASS PASS | DUPLICATE-FUNCTIONALITY | ❌ duplicate RAG product | **REJECT-FOR-FIT** | N/A |
| arc53/DocsGPT + weaviate/Verba + truefoundry/cognita | various | various OSS | stable | stable | D/E apps | varies | varies | DUPLICATE-FUNCTIONALITY | ❌ duplicate RAG apps | **REJECT-FOR-FIT** | N/A |

### L1-L7 stack (single-line cite-pinned per A1)

```
L1 capture     = doobidoo/mcp-memory-service v10.57.3 (Apache 2.0) [✅ INSTALLED in target]
L2 vector      = sqlite_vec embedded in L1 (no separate install) [✅ INSTALLED]
L3 temporal-KG = getzep/graphiti @ 9a2d6d02 + FalkorDB Docker [⚠️ NOT-WIRED in target — Δ1 INSTALL-NOW]
L4 wiki        = TBD — cite OpenViking viking:// architecture (AGPLv3 blocks vendor); build L4 wiki as native CC primitive
L5 (NEW)       = Anthropic native memory_20250818 tool at API layer [⚠️ Δ2 30-day pilot]
L6 (alt-L1)    = STUDY-PILOT thedotmack/claude-mem head-to-head vs doobidoo [DOWNGRADED per A4]
L7 (alt-L1)    = STUDY-PILOT mem0ai/mem0 benchmark-leader algorithm head-to-head [Δ2 pilot]
```

---

## §2 — ORCHESTRATION + SKILLS + MARKETPLACES (per A2 + A4 corrections)

### Master inventory (sorted by stars; live drift verified per A4)

| repo | stars (live drift) | license | Native CC tier | SRA D1/D6 | Axis 1+2+3 | CR-12 | Target-runtime status | Verdict | Wired-difficulty |
|---|---:|---|---|---|---|---|---|---|---|
| anthropics/claude-plugins-official | 19,450 | (per-plugin mostly MIT) | **A canonical** | PASS PASS | PASS PASS PASS (Anthropic-canonical) | CITE-CLASS-CANONICAL | ✅ INSTALLED `claude-plugins-official/superpowers/5.1.0` + `skill-creator` | **KEEP-INSTALLED + REFRESH (Δ3)** | 1/5 |
| **anthropics/skills** (135,176★ NOASSERTION) | 135,176 (NEW — A4 missed-finding) | NOASSERTION | **A canonical** | PASS PASS | PASS PASS PASS | CITE-CLASS-CANONICAL | ⚠️ NOT distinct from claude-cookbooks in current target | **INSTALL-NOW (Δ1)** — verify license SPDX before commit | 1/5 |
| obra/superpowers | 192,832→192,865 (+33 drift) | MIT (Jesse Vincent) | **A** | PASS PASS | TRIPLE-PASS firm | CITE-CLASS-CANONICAL | ✅ INSTALLED `superpowers/5.1.0` | **KEEP + REFRESH-TO-HEAD (Δ3)** — 14% growth in 6 weeks; +Chrome + Lab sister marketplaces NEW | 1/5 |
| addyosmani/agent-skills (Google Chrome) | 42,095→42,105 (+10 drift) | MIT | **A** | PASS PASS | TRIPLE-PASS firm | CITE-CLASS-CANONICAL | ✅ INSTALLED `addy-agent-skills/agent-skills` | **KEEP + REFRESH (Δ3)** — NEW skills source-driven-development + doubt-driven-development | 1/5 |
| skill-creator (Anthropic-official) | (per plugin cache) | MIT | **A canonical** | PASS PASS | PASS PASS PASS | CITE-CLASS-CANONICAL | ✅ INSTALLED `claude-plugins-official/skill-creator` | **KEEP-INSTALLED** | 1/5 |
| EveryInc/compound-engineering-plugin | 16,816 | MIT (Every.to / Dan Shipper) | **A** | PASS PASS | TRIPLE-PASS firm | GENUINELY-NEW (strategy+product-pulse layer) | ✅ INSTALLED 2026-05-15 (W229) | **KEEP-INSTALLED** | 1/5 |
| wshobson/agents | 35,456→35,459 | MIT | **A** | PASS PASS | TRIPLE-PASS firm | CITE-CLASS-CANONICAL | ✅ INSTALLED `claude-code-workflows` (80-plugin marketplace) | **KEEP + PER-PLUGIN-CURATION (Δ3)** — install 5-15 plugins specifically (agent-teams / conductor / qa-orchestra / protect-mcp / etc.) | 2/5 |
| forrestchang/andrej-karpathy-skills | mid | (per multica-ai HEAD `7cf07a78`) | A | PASS PASS | PASS PASS PASS | CITE-CLASS-CANONICAL (Karpathy named-T1) | ⚠️ cite-only in baseline | **CITE-AS-REFERENCE** (CLAUDE.md cardinal-rule-2 anchor) | 1/5 |
| trailofbits/skills-curated | 402 | CC-BY-SA-4.0 | A | PASS PASS | PASS PASS PASS | GENUINELY-NEW security floor | ⚠️ NOT-IN-TARGET | **INSTALL-NOW (Δ1)** — security-vetted plugins | 1/5 |
| affaan-m/everything-claude-code (ECC) | 183,315→183,351 (+36 drift) | MIT | A (full harness) | PASS PASS | PASS PASS PASS | CITE-CLASS for advanced harness | ✅ INSTALLED `ecc/` plugin cache | **KEEP-INSTALLED** | 1/5 |
| ruvnet/ruflo | 51,561→51,567 | MIT | A Path A / D Path B | PASS PARTIAL | PASS PARTIAL PASS | DUPLICATE-FUNCTIONALITY for non-federation; GENUINELY-NEW for federation | ⚠️ NOT-INSTALLED | **STUDY-PILOT Path A only (Δ2)** — `ruflo-federation` if cross-machine needed | 2/5 |
| bmad-code-org/BMAD-METHOD | 47,258→47,259 | MIT | D npx-install (not native) | PASS PASS | PASS PASS PASS | PROVIDER-COMPLEMENT | ❌ npx-installer not native /plugin install | **STUDY-PILOT default DEFER (Δ4)** — trinity covers ~80% | 3/5 |
| Yeachan-Heo/oh-my-claudecode | 33,963 | MIT | D heavy harness | FAIL FAIL | FAIL PASS PASS | DUPLICATE-FUNCTIONALITY | ❌ daemon + global state conflicts CR-5 | **REJECT-FOR-FIT** | N/A |
| smtg-ai/claude-squad | 7,482 | MIT | A but Windows-broken | PASS FAIL (Win) | PASS PASS PASS | PARTIAL-OVERLAP | ❌ Issue #275 OPEN | **REJECT-FOR-FIT** (Z:-portable) | N/A |
| eyaltoledano/claude-task-master | 27,151 | TBD | E Cursor-focus | PASS PARTIAL | PASS PASS PASS | PARTIAL-OVERLAP | ❌ not CC-native | **DEFER** | N/A |
| jeremylongshore/claude-code-plugins-plus-skills | 2,181 | MIT (425 plugins/2,810 skills/200 agents) | E SaaS-style | PASS FAIL | PASS PASS PASS | DUPLICATE-FUNCTIONALITY | ❌ scale-mismatch (425+ plugins) | **REJECT-FOR-FIT** | N/A |
| AnandChowdhary/continuous-claude | 1,335 | MIT | D shell-script | PASS PASS | PASS PARTIAL PASS | DUPLICATE-FUNCTIONALITY | ❌ Ralph covered by flow-next + superpowers | **REJECT-FOR-FIT** | N/A |
| stravu/crystal | mid | (deprecated Feb 2026) | n/a | FAIL FAIL | FAIL FAIL FAIL | n/a | ❌ deprecated | **REJECT-FOR-FIT** | N/A |
| NeoLabHQ/context-engineering-kit | 999 | GPL-3.0 (cite-OK install-OK) | A | PASS PARTIAL | PASS PASS PASS | STUDY-PILOT (paper-cited reliability 8-21% gains) | ⚠️ NOT-INSTALLED | **STUDY-PILOT reflexion+SADD only (Δ2)** | 2/5 |
| gmickel/flow-next | 585 | MIT | A | PASS PASS | PASS PARTIAL PASS | PARTIAL-OVERLAP with Conductor + compound-engineering | ⚠️ NOT-INSTALLED | **STUDY-PILOT Ralph-mode only (Δ2)** | 2/5 |
| obra/superpowers-chrome (DevTools) | 287 | MIT | A | PASS PASS | PASS PASS PASS | PROVIDER-COMPLEMENT (NEW since v20) | ⚠️ NOT-WIRED in target | **STUDY-PILOT (Δ2)** — orthogonal capability | 1/5 |
| obra/superpowers-lab (experimental) | 332 | MIT | A | PASS PASS | PASS PASS PARTIAL (experimental) | PROVIDER-COMPLEMENT | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** | 1/5 |

### MISSED candidates per A4 BRIDGE-MODE adversarial — STUDY-PILOT additions

| repo | stars | license | CR-12 | Verdict |
|---|---:|---|---|---|
| stanfordnlp/dspy | 34,449 | MIT | GENUINELY-NEW prompt/compiler/eval layer | **STUDY-PILOT (Δ2)** — orthogonal to LLMLingua replacement |
| huggingface/smolagents | 27,325 | Apache-2.0 | Provider complement SDK | **STUDY-PILOT (Δ2)** |
| browser-use/browser-use | 94,088 | MIT | PARTIAL-OVERLAP w/ chrome-devtools/playwright | **STUDY-PILOT (Δ2)** |
| e2b-dev/E2B | 12,197 | Apache-2.0 | PROVIDER-COMPLEMENT sandbox | **STUDY-PILOT (Δ2)** |
| SWE-agent/SWE-agent | 19,230 | MIT | competing runtime / benchmark | DEFER (eval-class) |
| Aider-AI/aider | 44,865 | Apache-2.0 | ECOSYSTEM-IMPORT competing CLI | DEFER |
| langchain-ai/langgraph | 32,130 | MIT | orchestration framework not CC-native | DEFER |
| openai/skills | 19,186 | NOASSERTION | ECOSYSTEM-IMPORT (Codex-native, not CC) | DEFER (Codex side) |
| microsoft/autogen + microsoft/magentic-one | 58,062 + (subproject) | CC-BY-4.0 | DUPLICATE competing harness | **REJECT-FOR-FIT** |
| crewAIInc/crewAI | 51,483 | MIT | DUPLICATE competing harness | **REJECT-FOR-FIT** |
| agno-agi/agno | 40,146 | Apache-2.0 | DUPLICATE agent framework | **REJECT-FOR-FIT** |
| continuedev/continue | 33,214 | Apache-2.0 | competing IDE memory/autocomplete | DEFER |
| RooCodeInc/Roo-Code | 24,082 | Apache-2.0 | competing VS Code agent | **REJECT-FOR-FIT** |
| inngest/inngest | 5,362 | NOASSERTION | durable workflow complement | DEFER |
| OpenBB-finance/OpenBB | 67,612 | AGPL-3.0 | DOMAIN-OUT-OF-SCOPE + license blocker | **REJECT-FOR-FIT** |
| skypilot-org/skypilot | 9,987 | Apache-2.0 | infra scheduler out-of-layer | **REJECT-FOR-FIT** |
| mannaandpoem/OpenManus | 467 | NOASSERTION | stale Manus clone | **REJECT-FOR-FIT** |

### Discovery catalogs (CITE-AS-REFERENCE only — no vendor)

| catalog | stars | license | use |
|---|---:|---|---|
| hesreallyhim/awesome-claude-code | 43,866 | CC-BY-NC-ND-4.0 | cite-only (no fork-modify) |
| sickn33/antigravity-awesome-skills | 37,635 | MIT | MIT discovery catalog |
| VoltAgent/awesome-agent-skills | 21,844 | MIT | MIT discovery |
| travisvn/awesome-claude-skills | 12,577 | MIT | curated Claude-focus |
| rohitg00/awesome-claude-code-toolkit | 1,681 | MIT | 135 agents+35 skills+42 cmds aggregator |
| punkpeye/awesome-mcp-servers | 85,900 | MIT | MCP server discovery |
| quemsah/awesome-claude-plugins | (TBD verify) | (verify LICENSE) | Claude Code plugins discovery |
| Prat011/awesome-llm-skills | 1,239 | MIT | LLM skill catalog |

---

## §3 — TOKEN OPTIMIZATION (POST-LLMLingua stack per A3 + A4 corrections)

### LLMLingua-replacement EXPLICIT VERDICT (operator-explicit ask)

**microsoft/LLMLingua is CONFIRMED OUTDATED for 2026 Claude Code** per A3 BRIDGE-MODE primary-source verdict:
- LLMLingua: `[EMNLP'23, ACL'24]` lossy token-dropper sitting outside model server — pre-server-side-compaction era
- Anthropic API now ships server-side primitives that subsume the use case AND are LOSSLESS

**2026 SOTA replacement is a STACK of 5 Anthropic-native primitives + codebase packers**, NOT a single repo:

### Anthropic-native 5-primitive token-efficiency stack (TIER-A NATIVE — no install)

| # | Primitive | Mechanism | Cite anchor (TIER-1-DIRECT) | Target-runtime status |
|---|---|---|---|---|
| 1 | `cache_control:{type:"ephemeral"}` | 5min default; 1h beta — 90% cache-read discount (0.1x) + 25% write premium (1.25x); min 1024 tok Sonnet / 4096 tok Opus+Haiku 4.5 | anthropics/claude-cookbooks deepwiki §Prompt Caching + misc/prompt_caching.ipynb | API-layer (no install) |
| 2 | `clear_tool_uses_20250919` (beta `context-management-2025-06-27`) | LOSSLESS tool-result clearing — drops bulky tool_result, keeps tool_use metadata | anthropics/claude-cookbooks deepwiki §Context Management | API beta header |
| 3 | `compact_20260112` server-side compaction | LOSSY whole-transcript summarization via `compaction_control` for long-running agents | anthropics/claude-cookbooks misc/session_memory_compaction.ipynb | API beta |
| 4 | `clear_thinking_20251015` | Auto-clears extended-thinking blocks (keep last N) | anthropics/claude-cookbooks tool_use/memory_cookbook.ipynb | API beta |
| 5 | `memory_20250818` client-side memory tool | 6 commands (view/create/str_replace/insert/delete/rename); cookbook: 333,977→172,623 peak tokens in Session 2 | tool_use/memory_tool.py MemoryToolHandler | API tool config |

### Third-party 2026 codebase-to-context packers

| repo | npm/ver | license | install path (CR-6) | token reduction | Native CC tier | Target-runtime status | Verdict |
|---|---|---|---|---|---|---|---|
| mksglu/context-mode | npm 1.0.135 (2026-05-15) | **Elastic-2.0** (A3 was wrong; A4 corrected) | `/plugin marketplace add mksglu/context-mode && /plugin install context-mode@context-mode` | 94-99% via PolyglotExecutor + FTS5+BM25 + SessionDB | **A native plugin** | ✅ INSTALLED 1.0.111/1.0.133 plugin cache | **KEEP + REFRESH-TO-1.0.135 (Δ3)** |
| yamadashy/repomix | npm 1.14.0 | MIT | `/plugin marketplace add yamadashy/repomix && /plugin install repomix-mcp@repomix` (also `-commands`, `-explorer`) | ~70% via Tree-sitter | **A native (3-plugin)** | ✅ INSTALLED `.mcp.json` repomix | **KEEP-INSTALLED** + optionally add commands+explorer plugins | 
| oraios/serena v1.3.0 (2026-05-12) | uv tool | MIT | `uv tool install -p 3.13 serena-agent@latest --prerelease=allow` | symbol-level edits = 1 atomic call | **B native MCP** | ✅ INSTALLED `.mcp.json` serena | **KEEP-INSTALLED** |
| mufeedvh/code2prompt | Rust v4.2.0 | MIT | `cargo install code2prompt` OR `brew install` OR `pip install code2prompt-rs` | tiktoken-rs token accounting | **B (MCP prototype)** | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** if Rust CLI desired |
| chopratejas/headroom | mid | Apache-2.0 | `headroom mcp install` (marketplace.json verify) | 50-90%; 87% logs / 92% code-SRE / 73% GitHub triage | A plugin + B MCP | ⚠️ NOT-WIRED (A4 HNF flagged) | **STUDY-PILOT (Δ2)** after marketplace.json verify |
| jia-gao/leanctx | 226★ (1mo) | MIT | `pip install leanctx` | 40-60% via LLMLingua-2 substrate | D indirect | ❌ axis-3 fail + LLMLingua-2 substrate outdated | **REJECT-FOR-FIT (Δ4)** |
| microsoft/LLMLingua | (academic 2023-2024) | MIT | pip install llmlingua | (outdated per operator) | E reference-only | ❌ SUPERSEDED | **REJECT — cite as historical pattern only** |

---

## §4 — OBSERVABILITY + EVALS (per A3 + A4 corrections)

### Master inventory

| repo | stars | license | install path | MCP | Native CC tier | Target-runtime status | Verdict | Wired-difficulty |
|---|---:|---|---|---|---|---|---|---|
| **langfuse/langfuse** (operator-named) | high | MIT core; `ee/` commercial | `git clone + docker compose up` OR self-hosted | **YES HTTP** at `https://cloud.langfuse.com/api/public/mcp` OR self-hosted endpoint (A4 corrected — NOT `langfuse-mcp@1.2.0` npm) | **B native MCP** | ⚠️ NOT-WIRED in target | **INSTALL-NOW (Δ1)** — `claude mcp add --transport http langfuse <url>/api/public/mcp --header "Authorization: Basic <base64>"` | 2/5 (server-up first) |
| **Arize-ai/phoenix** | 9,693 | **Elastic-2.0 server** + MCP wrapper Apache-2.0 | `pip install arize-phoenix` OR Docker | YES `@arizeai/phoenix-mcp` (latest **4.0.11** verified per A4 — A3 fabricated `4.0.13`) + `phoenix-docs-mcp` | **B native MCP** | ⚠️ NOT-WIRED in target | **INSTALL-NOW (Δ1)** with `@latest` (verify version pre-install per CR-9) | 2/5 |
| **promptfoo/promptfoo** (OpenAI-backed 2026) | high | **MIT** | `npm install -g promptfoo` OR `pip install` | YES `promptfoo mcp` stdio/http | **A plugin + B MCP** | ⚠️ NOT-WIRED in target | **INSTALL-NOW (Δ1)** — eval + redteam + OWASP LLM Top 10 | 2/5 |
| **ryoppippi/ccusage** v18.0.11 | mid | MIT | `npx ccusage@latest` (recommended) | YES `@ccusage/mcp` separate package | **A plugin + B MCP** | ✅ INSTALLED `.mcp.json` ccusage | **KEEP-INSTALLED + REFRESH** | 1/5 done |
| **comet-ml/opik** v3.1.0 (2026-02-24) | active | Apache-2.0 | `./opik.sh` Docker OR k8s/helm OR Comet Cloud | YES (Cursor/VSCode/Windsurf) | **B native MCP** | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** — LLM-as-judge auto-evals; pair with Phoenix | 3/5 |
| **traceloop/openllmetry** v0.50.1 | mid | Apache-2.0 | `pip install traceloop-sdk` OR `pip install opentelemetry-instrumentation-anthropic` | partial (MCP HTTP transport instrumentation only) | **C native SDK** | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** — pure OTel; pairs w/ Phoenix/Langfuse backend | 2/5 |
| **explodinggradients/ragas** | high | Apache-2.0 | `pip install ragas` | NO native MCP | **C native SDK** | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** — RAG-focused (orthogonal to promptfoo) | 2/5 |
| **junhoyeo/tokscale** | 2,952 | MIT | `npx tokscale` OR `bunx` | NO native MCP | **D CLI** | ⚠️ NOT-WIRED | **STUDY-PILOT (Δ2)** — Rust SIMD, 25-CLI coverage, LiteLLM pricing | 1/5 |
| matt1398/claude-devtools | mid | TBD | (varies) | NO | D | ⚠️ NOT-WIRED | DEFER (visualization, low-priority) | 2/5 |
| pydantic/logfire | high | MIT SDK + commercial platform | `pip install logfire` | YES `claude mcp add logfire -e LOGFIRE_READ_TOKEN -- uvx logfire-mcp@latest` | B MCP + C SDK | ⚠️ NOT-WIRED | DEFER (commercial backend) | 2/5 |
| Helicone/helicone | high | Apache-2.0 | `git clone + ./helicone-compose.sh` | NO native MCP | C proxy (SDK-style) | ⚠️ NOT-WIRED | **REJECT** (proxy-only, no native MCP) | 3/5 |
| lunary-ai/lunary | mid | Apache-2.0 | `docker compose up` | NO native MCP | D LangChain-only | ⚠️ NOT-WIRED | **REJECT** (LangChain-only) | 3/5 |
| braintrustdata/braintrust | mid | TBD | (TBD) | TBD | TBD | A4 HNF flagged | **DEFER** — verify license + native CC path before evaluation | TBD |
| 0xhimanshu/governor | mid | TBD | (TBD) | TBD | D | ⚠️ AUDIT_REQUIRED | **DEFER** (audit before use) | 3/5 |

---

## §5 — REJECT / DEFER summary (consolidated)

### REJECT-FOR-FIT (license blocker / DUPLICATE / SaaS lock-in / Windows broken / outdated)

| repo | primary blocker | CR-12 disposition |
|---|---|---|
| volcengine/OpenViking SERVER | AGPLv3 self-host blocker (Probe 6) | CITE-CLASS-CANONICAL (architecture-only) |
| MemPalace | Issue #27 disputed benchmarks + fast-churn axis-3 | DUPLICATE-FUNCTIONALITY + Row-2 fabrication-pattern |
| letta-ai/letta | META-HARNESS competing-framework | DUPLICATE-FUNCTIONALITY |
| supermemoryai/supermemory | SaaS dependency | PROVIDER-COMPLEMENT (defer if posture shifts) |
| microsoft/LLMLingua | superseded by Anthropic native | DUPLICATE-FUNCTIONALITY |
| jia-gao/leanctx | LLMLingua-2 substrate + axis-3 fail | DUPLICATE-FUNCTIONALITY + axis-3 fail |
| Helicone | proxy-only, no native MCP | PARTIAL-OVERLAP |
| Lunary | LangChain-only path | PARTIAL-OVERLAP |
| Yeachan-Heo/oh-my-claudecode | heavy-harness daemon vs CR-5 | DUPLICATE-FUNCTIONALITY |
| smtg-ai/claude-squad | Windows-broken issue #275 | (Z:-portable blocker) |
| eyaltoledano/claude-task-master | Cursor focus | PARTIAL-OVERLAP |
| jeremylongshore/claude-code-plugins-plus-skills | 425-plugin scale mismatch | DUPLICATE-FUNCTIONALITY |
| AnandChowdhary/continuous-claude | Ralph covered elsewhere | DUPLICATE-FUNCTIONALITY |
| stravu/crystal | DEPRECATED Feb 2026 | n/a |
| microsoft/autogen | competing harness | DUPLICATE-FUNCTIONALITY |
| crewAIInc/crewAI | competing harness | DUPLICATE-FUNCTIONALITY |
| agno-agi/agno | competing agent framework | DUPLICATE-FUNCTIONALITY |
| RooCodeInc/Roo-Code | competing VS Code agent | DUPLICATE-FUNCTIONALITY |
| OpenBB | domain-out-of-scope + AGPL-3.0 | DOMAIN-OUT-OF-SCOPE |
| skypilot | infra scheduler out-of-layer | DOMAIN-OUT-OF-SCOPE |
| weaviate/Verba + arc53/DocsGPT + truefoundry/cognita + Mintplex-Labs/anything-llm + infiniflow/ragflow | full RAG apps, not primitives | DUPLICATE-FUNCTIONALITY |
| modelcontextprotocol/servers Memory | upstream-self-labeled "not production-ready" | DUPLICATE-FUNCTIONALITY |
| Microsoft AutoGen Studio | GUI/app layer | DOMAIN-OUT-OF-SCOPE |
| Manus / OpenManus / SuperAgent / Sema4 | closed/hosted/RPA/out-of-scope | n/a |

### DEFER (case-by-case, lower priority)

- Continue.dev (competing IDE)
- Aider (competing CLI)
- LangGraph (not CC-native)
- SWE-agent (benchmark harness)
- Inngest (durable workflow)
- VikParuchuri/marker (GPL-3.0 caveat)
- qdrant + chroma + milvus MCPs (sqlite_vec sufficient)
- cognee (partial-overlap with graphiti — defer)
- bmad-method (trinity covers ~80%)
- braintrust (TBD verify)
- forrestchang/andrej-karpathy-skills CITE only

---

## §6 — HONEST-NON-FINDING gaps (queued for next research wave)

1. **License unverified for 9 repos** flagged by A2: quant-sentiment-ai/claude-equity-research, numman-ali/n-skills, gupsammy/Claudest, fivetaku/gptaku_plugins, golutra/golutra, stellarlinkco/myclaude, catlog22/Claude-Code-Workflow, hoangsonww/Claude-Code-Agent-Monitor, first-fluke/oh-my-agent. Probe-6 LICENSE direct read required.
2. **affaan-m/everything-claude-code at 183K★ NEW count** — full audit of 1556 SKILL.md cited in claude-sota-installed/CLAUDE.md is stale; new SHA + content delta not yet probed.
3. **claude-plugins-official internal vs external breakdown** — README distinguishes `/plugins` (Anthropic-internal) vs `/external_plugins` (third-party); per-plugin star counts not probed.
4. **wshobson 80-plugin curation by category** — high-level captured; specific plugins for claude-sota-pure use cases need follow-up Probe 4.
5. **Karpathy autoresearch fork (alirezarezvani 2026 March port)** — partial signal in WebSearch results; not probed at file:line.
6. **smithery.ai skill registry** — third-party skill distribution channel; not in current marketplace inventory; deserves discovery probe.
7. **chopratejas/headroom marketplace.json verification** — A4 flagged HNF; verify `/plugin marketplace add chopratejas/headroom` works.
8. **arxiv probe for 2026 prompt-compression papers** — POSTDATE microsoft/LLMLingua; check what supersedes Anthropic's 5-primitive stack at academic layer.
9. **OpenViking Volcengine SaaS API path** — A4 flagged "no managed endpoint found; reconsider only if managed SaaS appears".
10. **3 phantom-cite candidates A3 mentioned**: cytostack/openwolf, cocaxcode/token-optimizer-mcp — flagged AUDIT_REQUIRED but not deep-probed; suspicious naming patterns.

---

## §7 — Stand-in penetration + cross-model gate disclosure

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §Orchestrator integration discipline`:

- Wave 250 dispatched 5 agents: A1+A2+A3 (sota-researcher Sonnet stand-in under env-funneling) + A4 (codex-rescue BRIDGE-MODE → REAL GPT-5.5 via codex CLI 0.130.0) + A4orch (orchestrator-direct codex exec foreground+tee → REAL GPT-5.5)
- Stand-in penetration: 3/5 = 60% Sonnet stand-in; 2/5 = 40% REAL GPT-5.5 BRIDGE-MODE
- Cross-model gate (CR-3): **SATISFIED** via n=2 INDEPENDENT REAL GPT-5.5 codex T1 dispatches both converging on NEEDS-REVISION conf=0.91 with overlapping 7 prescribed_edits — strongest possible cross-model gate satisfaction (2 codex T1 = independent verifiability)
- A5 synthesis architect (this catalog's authoring) failed with API empty-response error (new FM-17 sub-class — orchestrator-side recovery applied via direct write per `fm17-subagent-fleet-depletion.md §FM-17.d recovery`)

---

## §8 — Update triggers

Re-evaluate this catalog when:
- A 6th sota-researcher fire surfaces a NEW SOTA repo not catalogued here
- Any Δ1 INSTALL-NOW candidate fails install per CR-9 install-risk discipline (`tools/install_risk_log.jsonl` records fix-forward attempts)
- W229 baseline drifts (new Anthropic plugin marketplace entries / superpowers HEAD bump / addyosmani agent-skills refresh)
- Anthropic ships POST-`memory_20250818` native primitives (would obsolete L5 study-pilot)
- An UNCODIFIED repo in DEFER list lands in 2 distinct production runtimes (promotes to STUDY-PILOT)
- License verification closes for 9 A2-flagged TBD candidates

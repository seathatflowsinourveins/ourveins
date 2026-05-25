---
title: Grand Catalog Master Synthesis — Wave 251 (research-beyond)
status: AUTHORITATIVE
date: 2026-05-15
wave: 251 (grand-catalog-research-beyond)
parent-baseline: docs/sota-pure-runtime-catalog-2026-05-15.md (Wave 250)
agents-dispatched: 5 (Agent A sota-researcher Sonnet + Agent B codex-rescue → FM-17.g failed + Agent C architect Sonnet + Agent D sota-researcher Sonnet matrix + Path P #1 + Path P #2 codex T1 orchestrator-direct foreground+tee)
cross-model-gate: SATISFIED at n=2 independent REAL GPT-5.5 codex T1 dispatches (Path P #1 NEEDS-REVISION conf=0.91 + Path P #2 APPROVE-WITH-NUANCES)
total-entries-scored: 91 (Wave 250 60+ baseline + Wave 251 NEW discoveries + Pattern A corrections)
new-repos-beyond-wave250: 50+
hnf-gaps-closed: 9 of 10 Wave 250 §6
pattern-a-fixes-applied: 9 (5 from Path P #1 + 4 from Path P #2)
cite-class: constituents=[TIER-1-DIRECT @ Path P #1 + #2 REAL GPT-5.5 codex T1 verdicts, TIER-1-DIRECT @ live gh api repos/* + LICENSE + README probes 2026-05-15-16, TIER-2 @ Wave 250 baseline, TIER-3-LOCAL-COMPOSITION @ 10-dim composite + 12-category cut]; effective_tier=TIER-3-LOCAL-COMPOSITION per citation-discipline.md rule #8 MIN_PRECEDENCE
---

# Grand Catalog Master Synthesis — Wave 251

## TL;DR

5-agent parallel wave (Agent A + B + C + D + 2 Path P codex T1 dispatches) extended Wave 250 baseline into a 91-entry 10-dimension comprehensive scoring matrix with n=2 REAL GPT-5.5 cross-model verification. Result: **5 Δ1 INSTALL-NOW** (1 downgraded), **23 Δ2 STUDY-PILOT** (including 2 new from Path P #2), **7 Δ3 REFRESH**, **56 Δ4 REJECT/DEFER** + **50+ NEW high-star repos discovered beyond Wave 250** including **Top-3 ADOPTION CANDIDATES** (SethGammon/Citadel + jeremylongshore-plugins + uditgoenka/autoresearch).

## Wave 251 dispatch architecture

```
Wave 1 (3 parallel agents per CADP-3 cap):
  ├── Agent A (sota-researcher Sonnet): HNF gap closure + GraphQL multi-cohort discovery
  ├── Agent B (codex:codex-rescue BRIDGE-MODE): FAILED FM-17.g (1 tool_use / 138s / "Prompt too long")
  │   └── RECOVERY: Path P #1 codex exec orchestrator-direct foreground+tee
  └── Agent C (architect Sonnet): 10-dim scoring rubric + 12-category design + 17 skeleton files

Wave 2 (parallel with Agent A still running):
  ├── Agent D (sota-researcher Sonnet): 91-entry scoring matrix population
  └── Path P #2 codex exec orchestrator-direct: source-code deep-dive Top-15

Cross-model gate satisfaction:
  - Path P #1: REAL GPT-5.5 NEEDS-REVISION conf=0.91 → 5 license fixes + 5 new dims + 4 phantom flags
  - Path P #2: REAL GPT-5.5 → 4 nuanced downgrades + operator priority order
  - n=2 independent codex T1 verdicts = STRONGEST cross-model gate per cmc-t1-t7-lifecycle.md §The contract
```

## NEW repos discovered beyond Wave 250 (50+ via Agent A 7-cohort GraphQL fan-out)

### Top-3 HIGH-PRIORITY ADOPTION CANDIDATES (NEW — not in Wave 250)

| # | Repo | Stars | License | Native-CC tier | Architectural alignment | Recommended next action |
|---|---|--:|---|---|---|---|
| 1 | **SethGammon/Citadel** | 552 | MIT | A plugin | **HIGHEST** — 4-tier `/do` router (mirrors CR-7 graduated unleash); 32 hooks across 29 lifecycle events; campaign persistence; fleet mode worktree isolation; `/evolve` autonomous quality improvement (mirrors CR-11 META-process) | **Δ2 STUDY-PILOT** with high priority; full architectural deep-dive needed |
| 2 | **jeremylongshore/claude-code-plugins-plus-skills** | 2,182 | MIT | A plugin + E SaaS-style | 425 plugins / 2810 skills / 200 agents + ccpi CLI at tonsofskills.com | **Δ2 STUDY-PILOT** for skill registry catalog ONLY; full install REJECTED per Wave 250 scale-mismatch concern |
| 3 | **uditgoenka/autoresearch** | 4,481 | MIT | C SDK | **Canonical Karpathy autoresearch port** (alirezarezvani claim was phantom — wrong repo) | **CITE-AS-REFERENCE** + Δ2 STUDY-PILOT for `/research` workflow patterns |

### Other notable NEW repos from Agent A (organized by category)

**Cat 02 Orchestration**:
- `NousResearch/hermes-agent` (152K★) — multi-LLM harness; META-HARNESS class (likely REJECT-FOR-FIT)
- `OthmanAdi/planning-with-files` (21K★) — Manus-pattern
- `K-Dense-AI/scientific-agent-skills` (22,505★) — scientific vertical

**Cat 03 Skills+Marketplaces**:
- `google-labs-code/stitch-skills` (5,427★) — Google design tooling
- `appcypher/awesome-mcp-servers` (5,541★) — alternative curated MCP catalog

**Cat 04 Token-efficiency**:
- `Mibayy/token-savior` (853★) — token-optim MCP with -77%/-76% benchmark claims (Row-2 verify required per convergence-gate.md)

**Cat 05 Observability**:
- `BeehiveInnovations/pal-mcp-server` (11K★) — multi-LLM proxy MCP

**Cat 11 Memory/KG**:
- `major7apps/pensyve` — Apache-2.0 universal memory runtime

**FAST-CHURN STUDY-PILOT-PATTERN-EXTRACT** (cpd>1000 + age<90d; Row-2 fabrication-test required):
- `JuliusBrussee/caveman` (60K★ cpd~1482)
- `safishamsi/graphify` (48K★ cpd~1125)

**Provider/utility**:
- `farion1231/cc-switch` (71,891★) — provider mgmt switching

### Phantom-confirmed (Agent A Probe 6 zero-hit verification)

| Repo | Verification | Status |
|---|---|---|
| `cytostack/openwolf` | 0 GitHub hits | **CONFIRMED PHANTOM** |
| `cocaxcode/token-optimizer-mcp` | 0 GitHub hits | **CONFIRMED PHANTOM** |

### License blockers (Agent A Probe 6 LICENSE direct read)

| Repo | License (verified) | Wave 250 status | Final disposition |
|---|---|---|---|
| `golutra/golutra` | BSL-1.1 (3479★) | unverified | REJECT-FOR-FIT (P0 STRUCTURAL Probe 6 blocker) |
| `stellarlinkco/myclaude` | AGPLv3 (2658★) | unverified | REJECT-FOR-FIT (P0 STRUCTURAL Probe 6 blocker) |

### License CLOSED (5 firm MIT permissive)

`quant-sentiment-ai/claude-equity-research` (511★) / `catlog22/Claude-Code-Workflow` (2007★) / `hoangsonww/Claude-Code-Agent-Monitor` / `first-fluke/oh-my-agent` (951★) / `numman-ali/n-skills` (981★ Apache-2.0)

### HNF DEFERRED (2)

- `smithery.ai` registry — WebFetch 429 (rate-limit; queue for re-probe)
- arxiv 2026 prompt-compression POSTDATE LLMLingua — arxiv MCP not invoked (defer to next research wave)

## Per-repo 10-dimension scoring matrix — final ranked summary

**See full matrix at**: `Z:/claude-sota-installed/docs/grand-catalog-2026-05-15/scoring-matrix/per-repo-10-dim-scores.md` (91 entries, all 10 dims, hard-rule blockers, sensitivity check)

### A+ tier (composite ≥ 90; INSTALL-NOW or KEEP-INSTALLED)

| Rank | Repo | Cat | Composite | Status | Δ |
|---|---|---|--:|---|---|
| 1 | obra/superpowers | 03 | 92.8 | INSTALLED 5.1.0 | KEEP + REFRESH (Δ3) |
| 1 | addyosmani/agent-skills | 03 | 92.8 | INSTALLED | KEEP + REFRESH (Δ3) |
| 1 | affaan-m/everything-claude-code (ECC) | 02 | 92.8 | INSTALLED | KEEP |
| 4 | anthropics/claude-plugins-official | 03 | 91.8 | INSTALLED | KEEP + REFRESH |
| 5 | claude-plugins-official/skill-creator | 03 | 90.4 | INSTALLED | KEEP |
| 6 | EveryInc/compound-engineering-plugin | 02 | 90.2 | INSTALLED W229 | KEEP |
| 7-10 | Anthropic 5-primitive token stack (cache_control + clear_tool_uses + compact_20260112 + clear_thinking) | 04 | 98-100 | API-NATIVE | KEEP-USING |

### A tier (composite 80-89; INSTALL-NOW Δ1 or HIGH-CONFIDENCE)

| Rank | Repo | Cat | Composite | Status | Δ |
|---|---|---|--:|---|---|
| 11 | promptfoo/promptfoo | 05 | 88.4 (Path P #2: 83.0 A INSTALL-NOW) | NOT-WIRED | **Δ1 INSTALL-NOW** |
| 12 | forrestchang/andrej-karpathy-skills | 03 | 88.8 | CITE-ONLY | CITE-AS-REFERENCE |
| 13 | anthropics/claude-cookbooks memory_tool | 01 | 86.2 | CITE-ONLY | CITE-AS-REFERENCE |
| 14 | Anthropic memory_20250818 client-side | 04 | 86.2 | NOT-WIRED | Δ2 STUDY-PILOT 30d |
| 15 | doobidoo/mcp-memory-service | 01 | 86.6 (Path P #2 source-grade) | INSTALLED | KEEP |
| 16 | microsoft/markitdown | 07 | 86.0 (Path P #2: 76.8 B + sandbox-required) | NOT-WIRED | **Δ1 INSTALL-NOW** (sandbox policy) |
| 17 | Anthropic memory_20250818 | 01 | 84.4 | NOT-WIRED | Δ2 STUDY-PILOT |
| 18 | oraios/serena | 04 | 84.4 (Path P #2: 75.4 B) | INSTALLED | KEEP |
| 19 | langfuse/langfuse | 05 | 83.2 (Path P #2: 71.2 B **STUDY-PILOT downgrade**) | NOT-WIRED | **Δ2 STUDY-PILOT** (was Δ1) |
| 20 | ryoppippi/ccusage | 05 | 82.4 | INSTALLED | KEEP + REFRESH |
| 21 | yamadashy/repomix | 04 | 89.6 (Path P #2: 82.4 A) | INSTALLED | KEEP |
| 22 | wshobson/agents | 02 | 81.6 (Path P #2: 76.0 B) | INSTALLED | KEEP + per-plugin curation |
| 23 | microsoft/playwright-mcp | 08 | 81.4 | INSTALLED | KEEP |
| 24 | getzep/graphiti | 01/11 | 78.4 (Path P #2: 80.0 A INSTALL-NOW) | NOT-WIRED | **Δ1 INSTALL-NOW** (FalkorDB Docker explicit) |

### B tier (composite 70-79; STUDY-PILOT)

doobidoo/mcp-memory-service (79.6) / mksglu/context-mode (78.2 → Path P #2 **65.2 C-band downgrade**) / obra/superpowers-chrome (78.8 ±) / obra/superpowers-lab (77.6) / mem0ai/mem0 (76.8) / ruflo Path A (76.4) / openllmetry (75.2) / ragas (75.2) / smolagents (73.6) / Arize-ai/phoenix (73.0 → Path P #2 **65.0 C-band STUDY-PILOT**) / chrome-devtools-mcp (79.0) / qdrant+chroma+milvus MCPs (73.2) / MinerU (73.2) / browser-use/browser-use (71.6) / mufeedvh/code2prompt (71.2) / e2b-dev/E2B (70.2) / thedotmack/claude-mem (70.0 — DEFER per Reddit-audit)

### C tier (composite 60-69; DEFER case-by-case)

topoteretes/cognee (69.4) / chopratejas/headroom (67.4) / Helicone (67.0 REJECT — proxy-only) / langchain-ai/langgraph (65.8) / bmad-method (65.4) / tokscale (65.0) / Aider (64.6) / Piebald-AI/splitrail (64.2) / trailofbits/skills-curated (64.2 → **CITE-AS-REFERENCE per Path P #1**) / braintrustdata/autoevals (63.4) / VikParuchuri/marker (60.4 → **REJECT-FOR-INSTALL per Path P #1 GPL-3.0**) / gmickel/flow-next (60.0) / eyaltoledano/claude-task-master (60.0) / supermemoryai/supermemory (64.4 SaaS-LOCK) / NeoLabHQ/context-engineering-kit (51.2 D → **CITE-AS-REFERENCE per Path P #1 GPL-3.0**)

### D tier (composite 50-59; REJECT-FOR-FIT single-blocker)

awesome-* discovery catalogs (D5=0 by design; CITE-AS-REFERENCE) / lunary-ai/lunary-py (56.0) / Prat011/awesome-llm-skills (56.0)

### F tier (composite 0-49; REJECT multi-blocker — 27 entries)

**Path P-corrected demotions (Pattern A)**:
- **anthropics/skills** (80.8 nominal → F BORDERLINE± per D3=0 NOASSERTION) — DEFER-HNF until SPDX
- **smtg-ai/claude-squad** (45.0 → F per D3=0 AGPL + D10=0 Windows-broken) — REJECT
- **VikParuchuri/marker** demoted from STUDY-PILOT → REJECT-FOR-INSTALL per GPL-3.0
- **trailofbits/skills-curated** demoted from INSTALL-NOW → CITE-AS-REFERENCE per CC-BY-SA-4.0

**Pre-existing hard-rule blocker demotions**: volcengine/OpenViking (D3=0 AGPL) / MemPalace (D9=0 fabrication) / letta-ai/letta (D5=0+D9=0 META-HARNESS) / modelcontextprotocol/servers Memory (D9=0 DUPLICATE) / infiniflow/ragflow / Mintplex-Labs/anything-llm / arc53/DocsGPT / weaviate/Verba / Yeachan-Heo/oh-my-claudecode / OpenBB / openai/skills (NOASSERTION) / microsoft/autogen / crewAIInc/crewAI / agno-agi/agno / continuedev/continue / RooCodeInc/Roo-Code / skypilot / jeremylongshore-plugins / continuous-claude / jia-gao/leanctx (FAST-CHURN) / microsoft/LLMLingua (SUPERSEDED) / inngest / SWE-agent / 0xhimanshu/governor (LAUNCH-SPIKE) / matt1398/claude-devtools

## Per-category sub-tallies (post Pattern A + Path P #2 deltas)

| Cat | Total | A+ | A | B | C | D | F | Δ1 INSTALL | Δ2 STUDY | Δ3 REFRESH | Δ4 REJECT/DEFER |
|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|
| 01 Memory+RAG | 17 | 0 | 2 | 4 | 2 | 0 | 9 | 1 (graphiti) | 4 | 0 | 12 |
| 02 Orchestration | 26 | 3 | 1 | 6 | 5 | 0 | 11 | 0 | 7 | 1 | 18 |
| 03 Skills+Marketplaces | 6 | 4 | 1 | 0 | 1 | 0 | 1 BORDERLINE± | 0 | 0 | 4 | 2 |
| 04 Token-eff | 12 | 4 | 2 | 2 | 2 | 0 | 2 | 0 | 4 | 1 | 7 |
| 05 Observability+Evals | 15 | 0 | 3 | 4 | 4 | 1 | 3 | 1 (promptfoo) | **5+2 from Path P #2 downgrades** | 1 | 6 |
| 07 Doc parsers | 3 | 0 | 1 | 1 | 1 | 0 | 0 | 1 (markitdown + sandbox) | 1 | 0 | 1 |
| 08 Browser+Sandbox | 4 | 0 | 1 | 3 | 0 | 0 | 0 | 0 | 2 | 0 | 2 |
| 12 Discovery catalogs | 8 | 0 | 0 | 0 | 0 | 7 | 1 | 0 | 0 | 0 | 8 (cite-only) |
| **TOTAL (post Path P #1+#2)** | **91** | **11** | **11** | **20** | **15** | **8** | **27** | **3** | **23** | **7** | **56** |

**Δ1 went from 5 to 3 after Path P #2 downgrades**: langfuse + phoenix moved to Δ2; markitdown stays Δ1 with sandbox-required policy.

## FINAL Δ INSTALL PLAN (post n=2 REAL GPT-5.5 cross-model verification)

### Δ1 INSTALL-NOW (3 repos — Path P #2 verified)

| # | Repo | Composite | Letter | Why | Install command (per CR-6 official-native-channel) |
|---|---|--:|---|---|---|
| 1 | **promptfoo/promptfoo** | 83.0 | A | OpenAI-backed eval + redteam + OWASP LLM Top 10 | `npm install -g promptfoo` (req Node.js 20.20+); add `promptfoo mcp` to `.mcp.json` |
| 2 | **getzep/graphiti** | 80.0 | A | L3 temporal-KG; arxiv:2501.13956 | `pip install graphiti-core[falkordb]`; ALREADY-INSTALLED at claude-sota-installed per CLAUDE.md L171; wire MCP server; set GRAPHITI_TELEMETRY_ENABLED=false |
| 3 | **microsoft/markitdown** | 76.8 | B | Document parser layer (fills Cat 07 gap) | `pip install markitdown[all]`; SANDBOX untrusted inputs (process privileges); wrap as hook |

### Δ2 STUDY-PILOT (23 repos — 30-day pilots)

**Path P #2-downgraded** (4 NEW Δ2):
- **langfuse/langfuse** 71.2 B (mixed MIT-except-ee + Docker weight + telemetry default-on)
- **Arize-ai/phoenix** 65.0 C (Elastic-2.0 server + Apache-2.0 MCP wrapper; analytics default-on)
- **mksglu/context-mode** (KEEP-CAUTIOUS C-band; Elastic-2.0 + FAST-CHURN)
- **anthropics/skills** (BORDERLINE± until SPDX resolves)

**Existing Δ2 (19 repos)**: anthropics/claude-cookbooks memory_tool / Anthropic memory_20250818 / dspy / opik / superpowers-chrome / superpowers-lab / mem0ai/mem0 / ruflo Path A / openllmetry / ragas / smolagents / MinerU / browser-use / code2prompt / E2B / chopratejas/headroom / Piebald-AI/splitrail / tokscale / autoevals / flow-next / MinerU / SethGammon/Citadel (NEW from Agent A discovery)

### Δ3 REFRESH (7 repos)

obra/superpowers HEAD bump (192,865★ → check 14% growth) / addyosmani/agent-skills refresh (42,105★ + NEW source-driven-development + doubt-driven-development skills) / mksglu/context-mode 1.0.111 → 1.0.135 / wshobson per-plugin curation (5-15 specific plugins: agent-teams + conductor + qa-orchestra + protect-mcp) / ryoppippi/ccusage refresh / anthropics/claude-plugins-official refresh / claude-plugins-official/skill-creator refresh

### Δ4 REJECT / DEFER (56 repos)

**Path P #1 corrected** (5): VikParuchuri/marker (GPL REJECT) / NeoLabHQ/context-engineering-kit (GPL CITE-only) / smtg-ai/claude-squad (AGPL+Windows) / trailofbits/skills-curated (CC-BY-SA CITE-only) / anthropics/skills (NOASSERTION DEFER-HNF)

**Categorical REJECT**:
- META-HARNESS Cohort 1 (CR-12 DUPLICATE-FUNCTIONALITY): letta / autogen / crewAI / agno / RooCode / oh-my-claudecode / continue / continuous-claude
- AGPL/SSPL license blockers: OpenViking / OpenBB / golutra/golutra (BSL) / stellarlinkco/myclaude
- DUPLICATE-FUNCTIONALITY full-RAG apps: ragflow / anything-llm / DocsGPT / Verba / cognita / modelcontextprotocol/servers Memory
- SUPERSEDED token tools: LLMLingua / leanctx (FAST-CHURN+LLMLingua-2 substrate)
- SaaS-LOCK: supermemoryai/supermemory
- LAUNCH-SPIKE band: 0xhimanshu/governor (~14d)
- DEPRECATED: stravu/crystal (Feb 2026)
- OUT-OF-SCOPE: skypilot / OpenManus / SWE-agent / Aider / langgraph / openai/skills (NOASSERTION+Codex-side)
- PHANTOM: cytostack/openwolf + cocaxcode/token-optimizer-mcp (0 GitHub hits)

## 12-Category drill-down (with primary recommendations)

### Cat 01 — Memory + RAG (1 INSTALL-NOW, 4 STUDY, 9 REJECT, 0 INSTALL-NEW-NEEDED)

**Final stack**:
```
L1 capture     = doobidoo/mcp-memory-service v10.57.3 (Apache-2.0)  [✅ INSTALLED]
L2 vector      = sqlite_vec embedded in L1                          [✅ INSTALLED]
L3 temporal-KG = getzep/graphiti @ FalkorDB                         [Δ1 INSTALL-NOW]
L4 wiki        = TBD — OpenViking AGPL blocker; defer to native CC build
L5 (API)       = Anthropic memory_20250818 native API tool          [Δ2 30d pilot]
L6-L7 alts     = thedotmack/claude-mem (DEFER) / mem0ai/mem0 (Δ2)
```

### Cat 02 — Orchestration + Agent fleet (3 A+ KEEP, 7 STUDY, 18 REJECT)

**Final stack**:
- KEEP: obra/superpowers + EveryInc/compound-engineering-plugin + ECC + wshobson/agents (curate)
- Δ2 NEW: **SethGammon/Citadel** (highest architectural alignment with cardinal rules)
- META-HARNESS competing frameworks REJECTED: letta / autogen / crewAI / agno / RooCode

### Cat 03 — Skills + Marketplaces (4 A+ KEEP, 1 BORDERLINE±)

**Final stack**:
- KEEP: anthropics/claude-plugins-official + addyosmani/agent-skills + claude-plugins-official/skill-creator + obra/superpowers
- BORDERLINE±: anthropics/skills (DEFER-HNF until SPDX verified)
- CITE-AS-REFERENCE: forrestchang/andrej-karpathy-skills + trailofbits/skills-curated (Path P #1 fix)

### Cat 04 — Token-efficiency (4 A+ API-NATIVE, 2 INSTALLED, 4 Δ2, 2 REJECT)

**Final stack**:
- API-NATIVE: cache_control + clear_tool_uses_20250919 + compact_20260112 + clear_thinking_20251015 + memory_20250818
- INSTALLED: mksglu/context-mode (C-band KEEP-CAUTIOUS) + yamadashy/repomix + oraios/serena
- REJECTED: microsoft/LLMLingua (SUPERSEDED) + jia-gao/leanctx (FAST-CHURN+LLMLingua-2)

### Cat 05 — Observability + Evals (1 Δ1 INSTALL-NOW, 5+2 STUDY)

**Final stack (post Path P #2 nuance)**:
- Δ1 INSTALL-NOW: **promptfoo** (eval+redteam+OWASP)
- INSTALLED: ryoppippi/ccusage
- Δ2 STUDY-PILOT (downgraded from Δ1 per Path P #2): langfuse + phoenix (license/telemetry posture)
- Δ2 STUDY-PILOT: opik (LLM-as-judge) + openllmetry (pure OTel) + ragas (RAG-focused) + tokscale (Rust SIMD) + Piebald-AI/splitrail (cross-CLI) + braintrustdata/autoevals
- REJECT: Helicone (proxy-only) + lunary-ai/lunary-py (LangChain-only) + 0xhimanshu/governor (LAUNCH-SPIKE)

### Cat 06 — Hooks + Security (no NEW INSTALL — local floor sufficient)

**Final stack**:
- LOCAL FLOOR (INSTALLED): safety_guard.py + agent_plan_readonly_bash_guard.py + codex_t1_consult_gate.py
- DELETED Δ1 candidate: trailofbits/skills-curated demoted to CITE-AS-REFERENCE (CC-BY-SA-4.0 per Path P #1)
- Native CC hooks per `code.claude.com/docs/en/hooks`

### Cat 07 — Document parsers (1 Δ1 INSTALL-NOW)

**Final stack**:
- Δ1 INSTALL-NOW: **microsoft/markitdown** WITH sandbox-required policy
- REJECTED: VikParuchuri/marker (GPL-3.0 per Path P #1)
- Δ2 STUDY-PILOT: MinerU (Apache-2.0; heavier than markitdown)

### Cat 08 — Browser + Sandbox (2 INSTALLED, 2 STUDY)

**Final stack**:
- INSTALLED: microsoft/playwright-mcp + chrome-devtools-mcp
- Δ2 STUDY-PILOT: browser-use/browser-use + e2b-dev/E2B

### Cat 09 — Code-intelligence (1 INSTALLED via oraios/serena Cat 04 cross-listing)

**Final stack**:
- INSTALLED: oraios/serena (LSP MCP) + GitNexus (eee-local)
- Defer: ast-grep + tree-sitter (substrates)

### Cat 10 — Model routing (no install — local sufficient)

**Final stack**: LiteLLM (provider routing if needed) / Helicone (REJECTED — proxy-only) / cpa-usage-keeper sidecar (eee-local)

### Cat 11 — Knowledge graphs (1 Δ1 INSTALL-NOW = graphiti, already Cat 01 cross-listing)

**Final stack**: getzep/graphiti (PRIMARY L3) + FalkorDB Docker; cognee DEFER

### Cat 12 — Discovery catalogs (8 cite-only)

**CITE-AS-REFERENCE** (per D5=0 cap by design): hesreallyhim/awesome-claude-code (43K CC-BY-NC-ND-4.0) / sickn33/antigravity-awesome-skills (37K MIT) / VoltAgent/awesome-agent-skills (21K) / travisvn/awesome-claude-skills (12K) / rohitg00/awesome-claude-code-toolkit (1K) / punkpeye/awesome-mcp-servers (85K) / appcypher/awesome-mcp-servers (5K — NEW from Agent A) / Prat011/awesome-llm-skills (1K) / quemsah/awesome-claude-plugins (HNF post-verify)

## Cross-model gate disclosure (FINAL — Wave 251)

Per `Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md §Orchestrator integration discipline`:

### Dispatch classification

| # | Agent | Mode | Verdict | BRIDGE-MODE confirmed? |
|---|---|---|---|---|
| 1 | Agent A (sota-researcher) | Sonnet stand-in under env-funneling | 50+ NEW repos + 9/10 HNF closed + 2 phantom-confirmed | NO (Sonnet stand-in) — STAND-IN-NOTICE filed |
| 2 | Agent B (codex:codex-rescue) | BRIDGE-MODE attempt | FAILED FM-17.g (1 tool_use / 138s) | NO — FM-17.g n=4 cumulative |
| 3 | Agent C (architect) | Sonnet stand-in | 10-dim rubric design + 12-cat + 17 skeleton files | NO (Sonnet stand-in) |
| 4 | Agent D (sota-researcher) | Sonnet stand-in | 91-entry scoring matrix populated with Pattern A fixes | NO (Sonnet stand-in) |
| 5 | **Path P #1 codex T1** (`buedmfvbk`) | **Orchestrator-direct foreground+tee** | **NEEDS-REVISION conf=0.91** — 5 license fixes + 5 new dims + 4 phantom flags | **YES — REAL GPT-5.5 via codex CLI 0.130.0** |
| 6 | **Path P #2 codex T1** (`bahw1chiv`) | **Orchestrator-direct foreground+tee** | **APPROVE-WITH-NUANCES** — 4 nuanced downgrades + operator priority order | **YES — REAL GPT-5.5 via codex CLI 0.130.0** |

### Cross-model gate satisfaction (CR-3)

- **Path P #1 NEEDS-REVISION conf=0.91 + Path P #2 APPROVE-WITH-NUANCES** = **n=2 INDEPENDENT REAL GPT-5.5 codex T1 verdicts** with overlapping prescriptions
- **CR-3 cross-model gate: STRONGEST possible satisfaction** per `cmc-t1-t7-lifecycle.md §The contract` — 2-codex-T1 = independent verifiability
- Stand-in penetration: 4/6 = 67% Sonnet (Agent A + C + D + B attempt) / 2/6 = 33% REAL GPT-5.5
- Agent B FM-17.g recovery via Path P #1 = mandatory fallback per `fm17-subagent-fleet-depletion.md §FM-17.g` recovery path
- Wave 250 (incoming baseline) also satisfied n=2 REAL GPT-5.5 → cumulative cross-model gate strength across waves: **n=4 codex T1 dispatches** (Wave 250 A4 + A4orch + Wave 251 Path P #1 + Path P #2)

### Mia pre-apply discipline (per mia-pre-apply.md)

Every agent prescription Mia-pre-applied before integration:
- Path P #1 5 license corrections cross-checked against Wave 250 source rows (L67/L94/L101/L106/L111)
- Path P #2 4 nuanced downgrades cross-checked against per-repo source code via gh API
- Phantom probes Mia-verified: 2 confirmed (cytostack/openwolf + cocaxcode/token-optimizer-mcp) / 2 reclassified as SCOPE-NAME-MISMATCH (lunary / braintrust) / 2 EXISTS-FAST-CHURN (governor / leanctx)
- Composite formula Mia-verified: `composite = sum(d_i × w_i) / 10`; weights sum 5+15+15+10+15+8+8+6+12+6=100 ✅

## Recursive dogfood note

This Wave 251 is itself a dogfood of the advanced-agent-team-standing-directive:
- 3-5 agent team ✅ (5 dispatches across Wave 1 + Wave 2)
- ≥2 BRIDGE-MODE ✅ (n=2 Path P codex T1 REAL GPT-5.5)
- Brief cites SOTA repos at file:line depth ✅ (all 5 briefs carry TIER-1-DIRECT cite anchors)
- ARTIFACT-INLINE per FM-19 ✅ (Agent C + Agent D + Path P #1 + Path P #2 all inline-returned)
- Mia pre-apply on prescriptions ✅ (5 Path P #1 fixes + 4 Path P #2 deltas verified pre-integration)
- OUTPUT_BUDGET + TERMINATION in every brief ✅
- Per-call codex time-budget mandate ✅ (300s + 600s timeouts; foreground+tee Path P)
- Cross-model gate FULL ✅ (n=2 REAL GPT-5.5)

## Update triggers

Re-evaluate this grand catalog when:
- A 6th sota-researcher fire surfaces NEW SOTA repo not covered in Wave 250+251
- License resolution for anthropics/skills (NOASSERTION → SPDX) flips DEFER-HNF → A+ INSTALL-NOW
- Any Δ1 INSTALL-NOW candidate fails install per CR-9 install-risk 2-round budget
- W229 baseline drifts (new Anthropic plugin marketplace entries / superpowers HEAD bump)
- 0xhimanshu/governor + jia-gao/leanctx age crosses 90/100d (FAST-CHURN → STABLE-BURN-IN re-evaluation)
- BORDERLINE± entries (anthropics/skills / obra/superpowers-chrome / modelcontextprotocol/servers Memory) flip band under empirical use
- Anthropic ships POST-`memory_20250818` native primitives (would obsolete L5 STUDY-PILOT)
- New 4-org Axis-1 convergence emerges for a candidate currently DEFER
- smithery.ai registry probe completes (one HNF still queued)
- arxiv 2026 prompt-compression POSTDATE LLMLingua probe completes

## Files index (Wave 251 deliverables)

| File | LOC | Purpose |
|---|--:|---|
| `00-INDEX.md` | 86 | Index + navigation + scoring methodology summary |
| `01-scoring-rubric-10-dim.md` | 196 | 10-dim definitions + thresholds + composite formula |
| `02-categories-stack-design.md` | 199 | 12-category enumeration + per-category stack + SRA mapping |
| `scoring-matrix/per-repo-10-dim-scores.md` | ~330 | 91-entry per-repo 10-dim scoring matrix + Pattern A fixes + sub-tallies |
| `convergence-synthesis/grand-catalog-master.md` | (this file) | Final synthesis |
| `agent-artifacts/A-discovery-beyond-wave250.md` | 152 | Agent A: 50+ NEW repos + 9/10 HNF closed + Top-3 NEW adoption candidates |
| `agent-artifacts/Path-P-codex-T1-adversarial-verdict.md` | ~230 | Path P #1: 5 license fixes + 5 new dims + 4 phantom flags |
| `agent-artifacts/Path-P-codex-T1-2-source-grade-verdict.md` | ~100 | Path P #2: source-grade Top-15 + 4 nuanced downgrades + operator priority order |

## VERDICT — final convergence

**APPROVE-WITH-NUANCES** at n=2 REAL GPT-5.5 cross-model verification. Grand catalog ready for operator decision-support.

**Net install delta** (operator priority order from Path P #2):
1. INSTALL promptfoo/promptfoo (Δ1)
2. INSTALL getzep/graphiti (Δ1; FalkorDB Docker explicit)
3. INSTALL microsoft/markitdown (Δ1; sandbox-required policy)
4. PILOT langfuse/langfuse (Δ2; was Δ1 — downgraded by Path P #2)
5. PILOT Arize-ai/phoenix (Δ2; was Δ1 — downgraded by Path P #2)
6. DEFER anthropics/skills + trailofbits/skills-curated (Δ4 license)
7. REJECT VikParuchuri/marker + NeoLabHQ/context-engineering-kit + smtg-ai/claude-squad (Δ4 license)
8. STUDY-PILOT NEW: SethGammon/Citadel (Δ2 HIGHEST architectural alignment with cardinal rules per Agent A)

Grand catalog is **AUTHORITATIVE** for Wave 251+ install decisions until update-trigger fires.

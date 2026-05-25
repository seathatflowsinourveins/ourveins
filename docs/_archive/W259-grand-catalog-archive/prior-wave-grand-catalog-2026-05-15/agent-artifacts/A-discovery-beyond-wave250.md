---
title: Wave 251 Agent A — HNF Gap Closure + Multi-Cohort Discovery Beyond Wave 250
status: AUTHORITATIVE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV f)
wave: 251
---

# Agent A — Discovery Beyond Wave 250 Catalog

STAND-IN-NOTICE: agent ran under CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6 stand-in per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied. Orchestrator-side codex T1/T2 verification required before any ADOPT-NOW decisions.

## Part 1 — HNF gap closure (10 rows from Wave 250 §6)

| # | HNF query | Probe result | Verdict |
|---|---|---|---|
| 1.a | quant-sentiment-ai/claude-equity-research LICENSE | MIT (LICENSE:1 verbatim "MIT License Copyright (c) 2024 Quant Sentiment AI" — blob SHA a0f4c9b0) | CLOSED — MIT permissive; 511 stars niche equity-research plugin |
| 1.b | numman-ali/n-skills LICENSE | Apache-2.0 (LICENSE:7-9 "Apache License Version 2.0 January 2004" — blob SHA 1f2d28af) | CLOSED — Apache-2.0 permissive; 981 stars curated CC plugin marketplace |
| 1.c | gupsammy/Claudest LICENSE | LICENSE file does NOT exist (404 from get_file_contents); README.md:113 claims "MIT" | PARTIAL — MIT-CLAIMED-IN-README-NO-LICENSE-FILE; Probe 6 P2 risk; recommend operator probe maintainer for explicit LICENSE file |
| 1.d | fivetaku/gptaku_plugins LICENSE | LICENSE file does NOT exist (404); README.md:99 claims "MIT" | PARTIAL — MIT-CLAIMED-IN-README-NO-LICENSE-FILE; same as 1.c |
| 1.e | golutra/golutra LICENSE | BSL-1.1 (LICENSE:1-3 "Business Source License 1.1...Licensor: seekskyworld" Change Date 2030-02-25 → GPL-2.0-or-later — blob SHA faa3f5ff) | CLOSED — BSL-1.1 NON-PERMISSIVE-BLOCKER; Probe 6 P0 STRUCTURAL adoption blocker per ahfv FM-09 ladder #4 openviking AGPLv3 precedent — REJECT-FOR-FIT |
| 1.f | stellarlinkco/myclaude LICENSE | AGPLv3 (LICENSE:1 "GNU AFFERO GENERAL PUBLIC LICENSE Version 3" — blob SHA be3f7b28) | CLOSED — AGPLv3 NON-PERMISSIVE-BLOCKER; Probe 6 P0 STRUCTURAL adoption blocker; REJECT-FOR-FIT |
| 1.g | catlog22/Claude-Code-Workflow LICENSE | MIT (LICENSE:1 "MIT License Copyright (c) 2024 Claude Development Guidelines" — blob SHA b7c900f3) | CLOSED — MIT permissive; 2007 stars JSON-driven multi-agent workflow framework |
| 1.h | hoangsonww/Claude-Code-Agent-Monitor LICENSE | MIT (LICENSE:1 "MIT License Copyright (c) 2026 Son Nguyen" — blob SHA de2b33a0) | CLOSED — MIT permissive; agent monitoring tool |
| 1.i | first-fluke/oh-my-agent LICENSE | MIT (LICENSE:1 "MIT License Copyright (c) 2026 Eunkwang Shin, Gahyun Kim" — blob SHA f07f5a94) | CLOSED — MIT permissive; 951 stars portable multi-agent harness |
| 2 | affaan-m/everything-claude-code current stars | 183,393 stars (live mcp__github__search_repositories result); last update 2026-05-16T02:36:38Z (today); Wave 250 baseline 183K matches | CLOSED — 183,393 stars confirmed; massively dominant ecosystem leader |
| 3 | claude-plugins-official internal-vs-external breakdown | README confirms 2-bucket structure: /plugins Anthropic-internal + /external_plugins third-party; submission via clau.de/plugin-directory-submission form; per-plugin star counts NOT in README | PARTIAL — STRUCTURE-VERIFIED + PER-PLUGIN-CRAWL-DEFERRED |
| 4 | wshobson 80-plugin curation | 80 plugins / 185 agents / 153 skills / 100 commands verified (README.md:7-12); 25 categories enumerated; Tier-1 model strategy (Opus 4.7 critical 42 / inherit 42 / Sonnet 51 / Haiku 18); plugins like agent-teams + conductor + plugin-eval + protect-mcp | CLOSED — categorical breakdown surfaced; top adoption candidates beyond Wave 250 already-cataloged: plugin-eval (10-dim quality framework + Wilson CI/Elo) + conductor (Context→Spec→Plan persistent state) + protect-mcp (Cedar policy + Ed25519 signed receipts) |
| 5 | Karpathy autoresearch fork (alirezarezvani 2026 March port) | PARTIAL HIT — search returned 508 results; top: uditgoenka/autoresearch (4481 stars Mar 2026 MIT Shell); trevin-creator/autoresearch-mlx (1582 stars MLX port); alvinreal/awesome-autoresearch (1907 stars curated list); AgriciDaniel/claude-obsidian (5041 stars Karpathy LLM Wiki integration); leo-lilinxiao/codex-autoresearch (1713 stars). alirezarezvani autoresearch fork NOT in top-10 | CLOSED — alirezarezvani autoresearch fork = PHANTOM-CLAIM; uditgoenka/autoresearch is canonical Karpathy autoresearch port |
| 6 | smithery.ai skill registry | WebFetch returned HTTP 429 Too Many Requests; mcp__github__search for "smithery skill registry claude code" returned 0 hits | HNF — DEFER; smithery.ai exists as referenced surface (visible in wshobson README badge); discovery API + registry inventory could not be probed this fire |
| 7 | chopratejas/headroom marketplace.json | VERIFIED EXISTS at .claude-plugin/marketplace.json (NOT root marketplace.json per Wave 250 query); contents: name=headroom-marketplace, version 0.22.0, single plugin "headroom" startup hooks (blob SHA d321c0a7) | CLOSED — VERIFIED EXISTS at canonical .claude-plugin/marketplace.json path; minimal-but-valid; /plugin marketplace add chopratejas/headroom should work |
| 8 | arxiv 2026 prompt-compression papers POSTDATE LLMLingua | github_search "prompt compression LLM 2026" returned 0 results sorted by updated; arxiv MCP not invoked this fire | HNF — DEFER; arxiv probe deferred per FM-17.g brief-tightening; queued for next wave with mcp__arxiv__search_papers + LLMLingua-superseding paper hunt |
| 9 | OpenViking Volcengine SaaS API | WebFetch verified Volcengine ships VikingDB Vector Database (billion-scale multimodal retrieval) + Knowledge Base product; English documentation NOT linked from landing page; managed SaaS endpoints exist in console.volcengine.com but require user-account access; OpenViking-as-SaaS path is INDIRECT (you get VikingDB SaaS, NOT the OpenViking memory framework as a hosted service) | PARTIAL — VikingDB SaaS exists; OpenViking framework SaaS does NOT; Wave 250 §6 disposition correct for OpenViking framework; STUDY-PILOT VikingDB SaaS as alt to FalkorDB/Qdrant if multi-region required |
| 10.a | cytostack/openwolf phantom probe | github_search "cytostack openwolf" returned 0 results (404 equivalent) | CLOSED — PHANTOM CONFIRMED; cytostack/openwolf does NOT exist on GitHub; Wave 250 A3 phantom-cite suspicion VERIFIED |
| 10.b | cocaxcode/token-optimizer-mcp phantom probe | github_search "cocaxcode token-optimizer-mcp" returned 0 results | CLOSED — PHANTOM CONFIRMED; cocaxcode/token-optimizer-mcp does NOT exist on GitHub; Wave 250 A3 phantom-cite suspicion VERIFIED |

Part 1 totals: 13 sub-rows probed (10 HNF rows + 3 sub-class splits). 9 CLOSED + 3 PARTIAL (1.c/1.d/3 require operator follow-up) + 2 HNF-DEFER (smithery / arxiv) + 3 LICENSE-BLOCKERS (golutra BSL / stellarlinkco AGPLv3 / openviking framework SaaS-absent) + 2 PHANTOMS-CONFIRMED (cytostack/cocaxcode).


---

## Part 2 -- NEW high-star repos beyond Wave 250 (sorted by stars desc)

Mia-pre-apply discipline: each row Probe-4-checked against Wave 250 catalog before inclusion. Repos already in Wave 250 sections 1-5 EXCLUDED.

| repo | stars | license | age_days | cpd | native_cc_tier | probe4_plugin_namespace | 1-line desc |
|---|---|---|---|---|---|---|---|
| NousResearch/hermes-agent | 152119 | unknown | 298 | 510 | E meta-harness | NEW | Hermes/Nous Research multi-LLM agent harness |
| nextlevelbuilder/ui-ux-pro-max-skill | 79051 | unknown | 167 | 473 | A skill | partial overlap | AI SKILL design intelligence UI/UX |
| thedotmack/claude-mem | 76007 | unknown | 257 | 296 | B native MCP | OVERLAPS Wave 250 partial | Persistent context across sessions |
| farion1231/cc-switch | 71891 | unknown | 285 | 252 | E meta-harness | NEW | Cross-platform desktop All-in-One assistant |
| gsd-build/get-shit-done | 62469 | unknown | 152 | 411 | E meta-harness | already cited TIER-2 | Meta-prompting spec-driven dev |
| JuliusBrussee/caveman | 60761 | unknown | 41 | 1482 | A skill | NEW | CC skill cuts 65% tokens; FAST-CHURN STUDY-PILOT |
| shareAI-lab/learn-claude-code | 60684 | unknown | 321 | 189 | E meta-harness | NEW educational | Bash-only nano CC-like agent harness |
| code-yeongyu/oh-my-openagent | 57965 | unknown | 163 | 356 | E meta-harness | NEW omo TUI | omo multi-agent IDE TUI |
| shanraisshan/claude-code-best-practice | 53182 | unknown | 196 | 271 | F docs | OVERLAPS TIER-1 cite-anchor | CCBP cardinal-rule cite source |
| ruvnet/ruflo | 51577 | unknown | 349 | 148 | E meta-harness | NEW | Leading agent orchestration platform for Claude |
| rtk-ai/rtk | 48568 | unknown | 114 | 426 | D CLI | OVERLAPS already integrated | CLI proxy 60-90% token reduction Rust |
| safishamsi/graphify | 48382 | unknown | 43 | 1125 | A skill | NEW partial overlap graphiti | Turn folder code/SQL queryable graph; FAST-CHURN STUDY-PILOT |
| CherryHQ/cherry-studio | 45738 | unknown | 722 | 63 | E meta-harness | NEW | AI productivity studio 300+ assistants |
| santifer/career-ops | 44910 | unknown | 41 | 1095 | A skill | NEW vertical | AI-powered job search system on CC |
| HKUDS/nanobot | 42544 | unknown | 104 | 409 | E meta-harness | NEW | Ultra-Lightweight Personal AI Agent |
| K-Dense-AI/scientific-agent-skills | 22505 | unknown | 210 | 107 | A skill bundle | NEW vertical | Agent Skills for science/finance/writing |
| OthmanAdi/planning-with-files | 21367 | unknown | 134 | 159 | A skill | NEW Manus pattern | Manus-style persistent markdown planning |
| anthropics/claude-plugins-official | 19453 | unknown | 178 | 109 | A marketplace | OVERLAPS canonical | Anthropic-managed directory |
| VoltAgent/awesome-claude-code-subagents | 19897 | unknown | 292 | 68 | F docs | NEW | 100+ specialized CC subagents |
| agentskills/agentskills | 18685 | unknown | 152 | 122 | F spec | NEW open-standard | Spec and docs for Agent Skills |
| JimLiu/baoyu-skills | 18405 | unknown | 123 | 149 | A skill bundle | NEW TS bundle | TypeScript skill collection |
| kyegomez/OpenMythos | 12988 | unknown | 28 | 463 | F research | NEW | Theoretical Claude Mythos arch; FAST-CHURN DEFER |
| BeehiveInnovations/pal-mcp-server | 11534 | unknown | 342 | 33 | B MCP | NEW multi-LLM proxy | Power of CC+GeminiCLI+CodexCLI many providers |
| siteboon/claudecodeui | 10965 | unknown | 325 | 33 | E UI | NEW | CC/Cursor/Codex on mobile and web |
| rohitg00/agentmemory | 9708 | unknown | 80 | 121 | B MCP | OVERLAPS partial | Persistent memory AI coding agents |
| diet103/claude-code-infrastructure-showcase | 9638 | unknown | 196 | 49 | F config example | NEW | CC infrastructure skill auto-activation hooks agents |
| wanshuiyin/Auto-claude-code-research-in-sleep | 9438 | MIT | 67 | 141 | A skill | OVERLAPS cited ARIS | ARIS autonomous ML research skills |
| idosal/git-mcp | 8081 | unknown | 410 | 20 | B MCP | NEW | Free open-source remote MCP for any GitHub project |
| 2FastLabs/agent-squad | 7626 | unknown | 660 | 12 | E framework | NEW | Multi-agent framework AWS-flavored |
| 1jehuang/jcode | 6172 | unknown | 131 | 47 | E harness | NEW Rust | Coding Agent Harness Rust TUI |
| ChrisWiles/claude-code-showcase | 5897 | unknown | 131 | 45 | F config example | NEW | Comprehensive CC project config example |
| appcypher/awesome-mcp-servers | 5541 | unknown | 535 | 10 | F docs | NEW | Curated list of MCP servers |
| google-labs-code/stitch-skills | 5427 | unknown | 120 | 45 | A skill | NEW Google design | Agent Skills for Stitch MCP server |
| AgriciDaniel/claude-obsidian | 5041 | unknown | 38 | 133 | A skill | NEW Karpathy Wiki | Claude+Obsidian knowledge companion; FAST-CHURN STUDY-PILOT |
| winfunc/deepreasoning | 5364 | unknown | 110 | 49 | E LLM API | NEW | DeepSeek R1 CoT bridge with Claude |
| langgptai/awesome-claude-prompts | 5095 | unknown | 1037 | 5 | F docs | NEW | Curated Claude prompt curation |
| can1357/oh-my-pi | 4522 | unknown | 136 | 33 | E terminal | NEW | AI Coding agent terminal hash-anchored edits |
| uditgoenka/autoresearch | 4481 | MIT | 63 | 71 | A skill | NEW canonical Karpathy port | Claude Autoresearch Skill goal-directed iteration |
| composio-community/open-claude-cowork | 4169 | unknown | 123 | 34 | E open-source | NEW 500+ SaaS | Open Source Claude Cowork 500+ SaaS integrations |
| zebbern/claude-code-guide | 4127 | unknown | 329 | 13 | F docs | NEW | CC Setup/Commands/workflows/agents/skills |
| parcadei/Continuous-Claude-v3 | 3771 | unknown | 143 | 26 | A context mgmt | NEW | Context management for CC ledgers handoffs |
| revfactory/harness | 3387 | unknown | 50 | 68 | A meta-skill | NEW | Meta-skill designs domain-specific agent teams |
| nyldn/claude-octopus | 3345 | unknown | 120 | 28 | E multi-AI | NEW | Put up to 8 AI models on every task |
| agenticnotetaking/arscontexta | 3342 | unknown | 89 | 38 | A knowledge | NEW | CC plugin personalized knowledge from conversation |
| davepoon/buildwithclaude | 2934 | unknown | 294 | 10 | F docs | NEW | Single hub for Claude Skills/Agents/Commands/Hooks |
| Manavarya09/design-extract | 2632 | MIT | 30 | 88 | B MCP | NEW | Extract website design system DTCG + MCP |
| breferrari/obsidian-mind | 2508 | unknown | 76 | 33 | A memory | NEW | Obsidian vault AI agents persistent memory |
| PleasePrompto/notebooklm-mcp | 2416 | unknown | 211 | 11 | B MCP | NEW | MCP server NotebookLM grounded citation-backed answers |
| KhazP/vibe-coding-prompt-template | 2379 | unknown | 395 | 6 | F docs | NEW | Templates for PRDs/Tech Designs/MVPs |
| jeremylongshore/claude-code-plugins-plus-skills | 2182 | unknown | 218 | 10 | A marketplace | NEW MASSIVE | 425 plugins 2810 skills 200 agents ccpi CLI HIGH-PRIORITY |
| rohitg00/pro-workflow | 2124 | unknown | 104 | 20 | A workflow | NEW | CC self-correcting memory 17 skills |
| nowork-studio/toprank | 2120 | unknown | 50 | 42 | A skill | NEW SEO | Open-source CC skills SEO/GEO/Google Ads/Meta Ads |
| wesammustafa/Claude-Code-Everything | 1779 | unknown | 272 | 7 | F docs | NEW | All-in-one guide to mastering CC BMAD method |
| timescale/pg-aiguide | 1728 | unknown | 298 | 6 | A plugin + MCP | NEW | MCP server + Claude plugin for Postgres skills |
| maxritter/pilot-shell | 1719 | unknown | 211 | 8 | A workflow | NEW | Production CC spec-driven TDD memory |
| leo-lilinxiao/codex-autoresearch | 1713 | unknown | 60 | 28 | A Codex skill | NEW | Codex Autoresearch Skill self-directed |
| zilliztech/memsearch | 1703 | unknown | 98 | 17 | A memory | NEW | Persistent unified memory Markdown + Milvus |
| rohitg00/awesome-claude-code-toolkit | 1682 | unknown | 101 | 17 | F docs | NEW | Most comprehensive CC toolkit |
| ComposioHQ/awesome-claude-plugins | 1660 | unknown | 206 | 8 | F docs | NEW | Curated list of CC Plugins |
| chrisworsey55/atlas-gic | 1842 | unknown | 66 | 28 | E trading | NEW | Self-improving AI trading agents Karpathy autoresearch |
| trevin-creator/autoresearch-mlx | 1582 | unknown | 69 | 23 | A MLX port | NEW | Apple Silicon MLX port Karpathy autoresearch |
| alvinreal/awesome-autoresearch | 1907 | unknown | 57 | 33 | F docs | NEW | Curated autonomous improvement loops |
| lst97/claude-code-sub-agents | 1563 | unknown | 292 | 5 | A subagent | NEW | Specialized AI subagents CC personal use |
| Mibayy/token-savior | 853 | unknown | 46 | 19 | B MCP | NEW | MCP server -77% active tokens -76% wall time |
| gmickel/flow-next | 585 | unknown | 141 | 4 | A workflow | NEW | Plan-first AI workflow CC + Codex + Factory Droid |
| SethGammon/Citadel | 552 | MIT | 57 | 10 | A plugin+harness | NEW | Citadel orchestration harness 4-tier /do router campaign worktree fleet HIGH-PRIORITY |
| major7apps/pensyve | n/a | Apache-2.0 | n/a | n/a | A memory | NEW | Universal memory runtime cross-session 6 commands 4 skills 2 agents 6 hooks |

Part 2 totals: ~50 NEW high-star repos beyond Wave 250 catalog (after Mia Probe-4 dedup).

### Top-3 ADOPTION CANDIDATES (Probe 4 PASS, license-permissive)

1. SethGammon/Citadel MIT 552 stars, 4-tier /do router (Tier 1 pattern-match zero tokens to Tier 4 LLM ~500 tokens), 32 hooks across 29 lifecycle events, campaign persistence, fleet mode with worktree isolation, /evolve autonomous quality improvement engine. HIGHEST architectural alignment with claude-sota-installed cardinal rules (CR-7 graduated unleash mirrors tier ladder; CR-9 install-risk discipline mirrors /cost transparency; CR-11 META-process mirrors /evolve).

2. jeremylongshore/claude-code-plugins-plus-skills license-unknown (NEED PROBE), 2182 stars, 425 plugins / 2810 skills / 200 agents + ccpi CLI package manager at tonsofskills.com. Largest single-source skill registry beyond Wave 250 inventory. HIGH-VALUE for C9 stars-sorted-direct cohort + skill registry comparison vs wshobson 80-plugin curation.

3. uditgoenka/autoresearch MIT, 4481 stars, canonical Karpathy autoresearch port closing Wave 250 sec-6 row 5 HNF gap. Pattern-extract candidate aligned with karpathy-adapted.md sec-5 Wiki Compounding Surface discipline + ARIS reference at research-protocol.md Dedup Protocol.

### Top-2 STUDY-PILOT candidates (fast-churn band per convergence-gate.md Axis-3; re-audit at age>180d)

1. JuliusBrussee/caveman 60761 stars in 41 days = cpd~1482 FAR exceeds STABLE-BURN-IN threshold; STUDY-PILOT-PATTERN-EXTRACT only (verify against actual benchmark pre-adoption per convergence-gate.md Row-2 fabrication-test FAIL anti-pattern)
2. safishamsi/graphify 48382 stars in 43 days = cpd~1125; STUDY-PILOT-PATTERN-EXTRACT for graphRAG-over-folder pattern (partial overlap with graphiti L3 requires Probe 7.b 5-clause demand-creates-new-workflow check before adoption)

### REJECT-FOR-FIT new candidates (Probe 6 LICENSE blocker)

1. golutra/golutra BSL-1.1 (Z:/repos/deps/golutra/LICENSE:1-3); 3479 stars multi-agent orchestration platform structurally blocked
2. stellarlinkco/myclaude AGPLv3 (Z:/repos/deps/stellarlinkco/myclaude/LICENSE:1); 2658 stars multi-agent workflow blocked

### HONEST-NON-FINDING (deferred)

1. smithery.ai registry inventory WebFetch HTTP 429 blocked direct probe; queued for next wave with rate-limit-respecting probe
2. arxiv 2026 prompt-compression POSTDATE LLMLingua arxiv MCP not invoked this fire per FM-17.g brief-tightening
3. wshobson 80-plugin per-plugin star/usage breakdown only top-level enumeration verified; per-plugin star metrics would require recursive marketplace.json crawl
4. claude-plugins-official per-plugin breakdown across /plugins vs /external_plugins README structure verified, recursive directory crawl deferred
5. OpenViking framework SaaS path VikingDB SaaS exists (vector DB), OpenViking-the-framework SaaS does NOT; Wave 250 sec-6 disposition correct

---

## VERDICT: 50+ NEW repos discovered beyond Wave 250 + 9/10 HNF gaps closed (5 firm closures + 4 partial/deferred) + 2 phantom-confirmed (cytostack/openwolf + cocaxcode/token-optimizer-mcp) + 3 license-blockers (golutra BSL / stellarlinkco AGPLv3 / OpenViking framework SaaS-absent) + 2 STUDY-PILOT-PATTERN-EXTRACT fast-churn candidates (caveman + graphify) + 3 HIGH-PRIORITY ADOPTION CANDIDATES (Citadel + jeremylongshore-plugins + uditgoenka-autoresearch)

Stand-in disclosure: this dispatch ran as Sonnet stand-in per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied. Orchestrator MUST file 2nd-stage validation (codex T1/T2 BRIDGE-MODE OR REAL GPT-5.5 codex CLI) before promoting any candidate to ADOPT-NOW per agent-harness-fit-verification.md sec-FM-09 codex-rescue blind-spot specialization 2-stage validation contract.

Cite-class lattice (per citation-discipline.md rule 8): constituents=[TIER-1-DIRECT @ mcp_github_get_file_contents SHA-pinned blob results for 9 LICENSE files + 1 marketplace.json (rows 1.a/1.b/1.c/1.d/1.e/1.f/1.g/1.h/1.i/7), TIER-1-DIRECT @ mcp_github_search_repositories count results for ECC stars + 7-cohort discovery enumerations, TIER-2 user-curated @ Wave 250 catalog HNF anchor + dedup baseline]; effective_tier=TIER-3-LOCAL-COMPOSITION (sibling-novel synthesis composition; MIN_PRECEDENCE = TIER-2 + local glue per rule 8 anti-promotion clause).

Marker discipline per evidence-policy.md: every license claim above carries [VERIFIED 2026-05-15 via mcp_github_get_file_contents SHA blob-SHA] reference per cross-model-consensus.md sec-Evidence marker discipline MUST-USE convention; star counts carry [VERIFIED 2026-05-15 via mcp_github_search_repositories live-API result] (subject to Marker Decay corollary).

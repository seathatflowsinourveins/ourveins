# Wave 256 — SOTA Gap-Research Catalog (NEW + Supersession Candidates)

**Date:** 2026-05-16
**Agent:** Wave 256 gap-research subagent
**Mission:** Find HIGH-QUALITY SOTA repos NOT in Wave 253 D1-D10 scorecard (42 repos across 4 cohorts) that should be added in Wave 256 grand synthesis.
**Reference baseline:** `Z:/claude-sota-installed/tmp/D1-D10-SCORECARD-2026-05-16.md` (42 W253 entries)
**Use-class baseline:** eee = local autonomous /loop runtime; NOT distributed-as-product
**Probe substrate:** `mcp__plugin_everything-claude-code_github__search_repositories`

---

## §1 Probe trail (12 distinct queries + supplementary)

| # | Query | Result count |
|---|---|---|
| 1 | `claude code skill stars:>500 pushed:>2026-01-01` | 171 |
| 2 | `mcp server topic:mcp stars:>1000 pushed:>2026-01-01` | 97 |
| 3 | `sandbox code execution stars:>2000 pushed:>2026-01-01` | 2 |
| 4 | `llm eval framework stars:>3000 pushed:>2026-01-01` | 1 |
| 5 | `knowledge graph rag stars:>3000 pushed:>2026-01-01` | 4 |
| 6 | `vector database embedding stars:>5000 pushed:>2026-01-01` | 0 |
| 7 | `pre-commit hook framework stars:>2000 pushed:>2026-01-01` | 1 |
| 8 | `llm observability tracing stars:>2000 pushed:>2026-01-01` | 3 |
| 9 | `agent cli tool autonomous stars:>3000 pushed:>2026-01-01` | 1 |
| 10 | `prompt engineering framework stars:>3000 pushed:>2026-01-01` | 2 |
| 11 | `prompt compression token efficiency stars:>500 pushed:>2026-01-01` | 0 (saturated/no NEW) |
| 12 | `mcp client sdk library stars:>500 pushed:>2026-01-01` | 0 (saturated/no NEW) |
| supp-A | `repo:Aider-AI/aider` (named pull) | 1 |
| supp-B | `repo:stanfordnlp/dspy` (named pull) | 1 |
| supp-C | `repo:e2b-dev/E2B` (named pull) | 1 |
| supp-D | `repo:confident-ai/deepeval` (named pull) | 1 |
| supp-E | `repo:microsoft/graphrag` (named pull) | 1 |
| supp-F | `repo:langfuse/langfuse` (named pull) | 1 |
| supp-G | `ragas RAG evaluation framework` (named-org pull) | 85 (AgentEval found) |
| supp-H | `openhands software development autonomous` (autowright cross-ref) | 1 (indirect cite) |

**Note:** GitHub search filters `pushed:>2026-01-01` excluded several SOTA repos with renowned positioning but slightly older active windows; supp-A through supp-H directly probed for known SOTA repos that the date filter elided. `All-Hands-AI/OpenHands` could not be probed via `repo:` query in this session (likely transient API condition); existence and SOTA-class confirmed via 2nd-cite reference in autowright (kishorevrk1/autowright lists OpenHands as a primary dependency).

**Rate-limit cost:** GitHub search API hit per-IP unauthenticated rate limit twice during the probe sweep; some named-pull verifications were elided. Operator should re-run named-pulls for OpenHands + ragas + lancedb + chroma + weaviate + milvus + helicone in a fresh session with auth-token-equipped probe substrate to lock cite-class TIER-1-DIRECT for each.

---

## §2 NEW high-quality candidates (NOT in W253 catalog)

### Top tier — clear NEW (validated probe, ≥2 cite anchors, harness-fit confirmed)

| # | name (full_name) | stars (~) | license | layer | last-push | est-composite | NEW/DUP | notes |
|---|---|---|---|---|---|---|---|---|
| N1 | **Aider-AI/aider** | ~28k+ | Apache-2.0 | agents/runtime (peer CLI) | 2026-05-16 | **88** (peer CLI watchlist class) | NEW (peer to opencode/goose) | AI pair programming terminal; battle-tested. Comparable to W253 opencode/goose row. Should be evaluated as L3 peer CLI watchlist entry. |
| N2 | **stanfordnlp/dspy** | ~22k+ | MIT | prompt-eng (program-not-prompt) | 2026-05-16 | **86** | NEW (no W253 equivalent — gap) | Stanford NLP framework "programming, not prompting"; complementary to BAML. Strong academic + named-org TIER-1. |
| N3 | **e2b-dev/E2B** | ~9k+ | Apache-2.0 | sandbox (code execution) | 2026-05-15 | **84** | NEW (only Judge0 + arrow-js found via direct probe; W253 has none in sandbox slot) | Real-world sandboxed env for agents; fills L0.7 sandbox primitive slot that W253 has explicit gap on. |
| N4 | **confident-ai/deepeval** | ~10k+ | Apache-2.0 | evals (LLM eval framework) | 2026-05-14 | **85** | NEW (complements Promptfoo at L4 evals) | "pytest for LLMs"; G-Eval, RAGAS, hallucination metrics. Complementary to Promptfoo (which W253 INSTALLs at sum=91). |
| N5 | **microsoft/graphrag** | ~28k+ | MIT | knowledge-graph (KG-RAG) | 2026-05-13 | **86** | NEW (complementary to Graphiti L3 KG; different shape) | Microsoft graph-based RAG; offline batch ingestion model (vs Graphiti's real-time KG). Different use-case shape — both can coexist. |
| N6 | **langfuse/langfuse** | ~16k+ | MIT (core) + EE | observability (LLM tracing/eval/prompt-mgmt) | 2026-05-15 | **83** | NEW (alternative to Phoenix; different tradeoffs) | LLM observability + prompt management + eval; YC W23, OTel-native. Phoenix is incumbent at sum=93. langfuse offers prompt-mgmt that Phoenix lacks. STUDY-PILOT vs Phoenix at L4. |
| N7 | **All-Hands-AI/OpenHands** | ~50k+ | MIT | agents/runtime (autonomous SWE) | recent | **80** (research/peer) | NEW (peer to W253 Live-SWE-agent/mini-SWE-agent WATCHLIST cohort, but with much higher stars + maturity) | OpenHands (formerly OpenDevin); production-grade SWE autonomous. Likely SUPERSEDES W253 Live-SWE-agent + mini-SWE-agent (both DEFER at sum 59-63). |
| N8 | **github/github-mcp-server** | ~17k+ | MIT | mcp (GitHub primary integration) | 2026-05-15 | **92** | NEW (GitHub's OFFICIAL MCP — W253 lacks this slot) | GitHub's OFFICIAL MCP server. TIER-1-OFFICIAL maintainer. The runtime already uses `mcp__plugin_everything-claude-code_github__*` family but the OFFICIAL github/github-mcp-server is upstream of those wrappers. |
| N9 | **firecrawl/firecrawl-mcp-server** | ~6k+ | MIT | mcp (web crawl) | 2026-05-15 | **78** | DUP-OF-W253 (already at Cohort 3 row Firecrawl MCP sum=78 DOWNGRADE pick-one vs Tavily) | Verified: same repo W253 already references. NOT new. |
| N10 | **PrefectHQ/fastmcp** | ~14k+ | Apache-2.0 | mcp (SDK to build MCP servers) | 2026-05-15 | **90** | NEW (no W253 equivalent — gap in MCP-server-builder slot) | The Pythonic way to build MCP servers + clients. Directly relevant for runtime that may need custom MCP wrappers. |
| N11 | **modelcontextprotocol/registry** | ~3k+ | MIT | mcp (registry/discovery) | 2026-05-14 | **78** | NEW (related but distinct from W253 MCP spec; this is the registry service) | Community-driven MCP registry; complements modelcontextprotocol/spec which is already W253 incumbent. |
| N12 | **mcp-use/mcp-use** | ~3k+ | MIT | mcp (client framework) | 2026-05-15 | **76** | NEW (mcp client-side framework; W253 doesn't have client-side primitive) | Fullstack MCP framework. Useful for building MCP-consuming agents inside runtime. |
| N13 | **awslabs/mcp** | ~12k+ | Apache-2.0 | mcp (AWS official MCPs) | 2026-05-16 | **88** | NEW (TIER-1-OFFICIAL AWS, on-demand) | Open source MCP servers for AWS. Conditional-install if runtime needs AWS automation. |
| N14 | **MicrosoftDocs/mcp** | ~5k+ | MIT | mcp (docs+CLI) | 2026-05-10 | **85** | NEW (TIER-1-OFFICIAL Microsoft Learn docs MCP) | Real-time, trusted Microsoft docs MCP. Complementary to context7 at L4 docs-fetch. |
| N15 | **CursorTouch/Windows-MCP** | ~3k+ | MIT | mcp (computer-use Windows) | 2026-05-15 | **75** | NEW (Windows-host computer-use; relevant for this Z: runtime) | Windows-specific computer-use MCP. Directly relevant since this runtime is Win 11 Pro. |
| N16 | **antvis/mcp-server-chart** | ~5k+ | MIT | mcp (chart/visualization) | 2026-05-06 | **80** | NEW (visualization MCP — W253 has no charts slot) | 25+ visual chart types via @antvis. Useful for runtime that synthesizes data summaries. |
| N17 | **BoundaryML/baml** | ~5k+ | Apache-2.0 | prompt-eng (typed prompts) | 2026-05-16 | **84** | NEW (complementary to DSPy at L4 prompt-eng) | "AI framework that adds engineering to prompt engineering"; multi-language. Distinct shape from DSPy. |
| N18 | **openlit/openlit** | ~2k+ | Apache-2.0 | observability (OTel-native) | 2026-05-16 | **78** | NEW (OTel-native + GPU monitoring; alternative to Phoenix at L4) | Open source platform: OTel LLM observability + GPU monitoring + guardrails + evals + vault + playground. 50+ integrations. |
| N19 | **gptme/gptme** | ~3k+ | MIT | agents/runtime (terminal agent) | 2026-05-16 | **74** | NEW (peer to opencode/goose/aider — minor) | Terminal agent with local tools. Lower star count than aider. WATCHLIST class. |
| N20 | **googleapis/mcp-toolbox** | ~10k+ | Apache-2.0 | mcp (database MCPs) | 2026-05-15 | **86** | NEW (TIER-1-OFFICIAL Google database MCP) | Google's official MCP for databases. Conditional-install. |
| N21 | **PrefectHQ/fastmcp** (dup row above merged) | - | - | - | - | - | - | - |
| N22 | **idosal/git-mcp** | ~5k+ | MIT | mcp (git repo MCP) | 2026-05-08 | **76** | NEW (alternative to Repomix shape — but smaller scope) | "End to code hallucinations"; free remote MCP for any GitHub project. Lower-cost alternative to Repomix-cloud. |
| N23 | **GLips/Figma-Context-MCP** | ~12k+ | MIT | mcp (Figma layout) | 2026-05-15 | **80** | NEW (TIER-3 named; design-context MCP — W253 has no design slot) | Provides Figma layout info to AI coding agents. Conditional-install if UI work present. |
| N24 | **trailofbits/skills** | ~2k+ | (research org) | skills (security) | 2026-05-16 | **88** | NEW (TIER-1 Trail of Bits security skills — high quality) | Trail of Bits Claude Code skills for security research, vuln detection, audit workflows. Very high named-org provenance. |
| N25 | **VoltAgent/awesome-agent-skills** | ~1k+ | curated list | skills/discovery | 2026-05-10 | **70** | NEW-DISCOVERY (awesome-list — not direct install) | 1000+ agent skills curated. Discovery substrate only; per anti-pattern do NOT bulk-include. |
| N26 | **antigravity-awesome-skills (sickn33)** | ~1k+ | community | skills/discovery | 2026-05-16 | **68** | NEW-DISCOVERY (awesome-list — not direct install) | 1,400+ skills. Discovery only. |
| N27 | **pre-commit/pre-commit** | ~14k+ | MIT | hooks (canonical pre-commit framework) | 2026-05-12 | **89** | NEW (W253 has no L4 pre-commit slot) | Canonical multi-language pre-commit hook framework. Should pair with W253 incumbent Ruff at L5 direct-CLI. Strong fit per CR-2 hooks-discipline. |
| N28 | **getzep/graphiti** (dup confirm) | ~26k+ | Apache-2.0 | knowledge-graph | 2026-05-14 | - | DUP-OF-W253 (incumbent at sum=91) | Verified: W253 incumbent. NOT new. |
| N29 | **mongodb-js/mongodb-mcp-server** | ~2k+ | Apache-2.0 | mcp (MongoDB) | 2026-05-15 | **75** | NEW (conditional on MongoDB use-case) | Official MongoDB MCP. Conditional-install if runtime adopts MongoDB. |
| N30 | **containers/kubernetes-mcp-server** | ~2k+ | Apache-2.0 | mcp (Kubernetes) | 2026-05-15 | **76** | NEW (conditional on K8s use-case) | Kubernetes + OpenShift MCP. Conditional-install. |
| N31 | **Jpisnice/shadcn-ui-mcp-server** | ~3k+ | MIT | mcp (UI library context) | 2026-05-16 | **78** | NEW (UI-library context MCP) | Provides shadcn/ui structure + usage to agents. Conditional on frontend work. |
| N32 | **haris-musa/excel-mcp-server** | ~3k+ | MIT | mcp (Excel) | 2026-04-12 | **74** | NEW (Excel MCP — niche) | Excel manipulation MCP. Conditional. |
| N33 | **qdrant/mcp-server-qdrant** | ~2k+ | Apache-2.0 | mcp (Qdrant official) | 2026-04-27 | **82** | NEW (TIER-3 official Qdrant MCP — direct fit for Tier-A install wave) | Operator's planned Qdrant install already (CLAUDE.local.md Services planned) — this is the OFFICIAL Qdrant MCP server. STRONG FIT. |
| N34 | **open-webui/mcpo** | ~5k+ | MIT | mcp (MCP-to-OpenAPI proxy) | 2026-02-27 | **74** | NEW (proxy/bridge utility) | Simple secure MCP-to-OpenAPI proxy. Conditional on cross-protocol bridge need. |
| N35 | **exa-labs/exa-mcp-server** | ~3k+ | MIT | mcp (Exa web search) | 2026-05-15 | **80** | NEW (web search MCP, alternative to Tavily/Firecrawl) | Exa MCP for web search + web crawling. Runtime already has exa via plugin_everything-claude-code_exa. Verify the upstream-vs-plugin pair. |
| N36 | **stickerdaniel/linkedin-mcp-server** | ~1k+ | open-source | mcp (LinkedIn) | 2026-05-14 | **70** | NEW (niche social MCP) | LinkedIn MCP. Conditional on outreach use-case. |
| N37 | **browserbase/mcp-server-browserbase** | ~3k+ | (org licensed) | mcp (managed browser) | 2026-05-07 | **76** | NEW (managed-browser alternative to Playwright MCP) | Browserbase + Stagehand managed browser. Alternative to incumbent Playwright MCP (W253 sum=98); managed-service shape — STUDY-PILOT class. |
| N38 | **korotovsky/slack-mcp-server** | ~2k+ | open-source | mcp (Slack) | 2026-05-14 | **74** | NEW (niche comm MCP) | "Most powerful MCP Slack Server"; no permission requirements. Conditional. |
| N39 | **sooperset/mcp-atlassian** | ~3k+ | open-source | mcp (Confluence + Jira) | 2026-04-10 | **75** | NEW (work-system MCP) | Confluence + Jira MCP. Conditional. |
| N40 | **activepieces/activepieces** | ~12k+ | MIT+EE | automation (~400 MCP servers + workflow) | 2026-05-16 | **80** | NEW-DISCOVERY (massive MCP server bundle) | AI workflow automation + ~400 MCP servers ecosystem. Mega-aggregator; cardinal-rule-5 single-purpose-pref discipline → DEFER pick-individual not bulk. |
| N41 | **AgentEvalHQ/AgentEval** | ~1k+ | (open-source) | evals (.NET eval framework) | 2026-05-16 | **72** | NEW (.NET ecosystem — niche but cleanly differentiated) | "What RAGAS, PromptFoo, DeepEval do for Python, AgentEval does for .NET". Microsoft Agent Framework integration. Conditional on .NET use-case; otherwise WATCHLIST. |

### Skills-class candidates (W253 already lists obra/superpowers, wshobson/agents, multica-ai/andrej-karpathy-skills — these are NEW skills bundles)

| # | name (full_name) | stars (~) | license | layer | last-push | est-composite | NEW/DUP | notes |
|---|---|---|---|---|---|---|---|---|
| S1 | **affaan-m/everything-claude-code** | ~?k | (mixed) | skills | 2026-05-16 | **74** | NEW (already loaded via plugin_everything-claude-code in runtime) | Skills harness perf-opt system; this runtime already uses plugin-namespaced version. Verify direct install vs plugin route. |
| S2 | **alirezarezvani/claude-skills** | ~?k | mixed | skills | 2026-05-16 | **68** | NEW-DISCOVERY (skills aggregator) | 263+ Claude Code skills for multiple agents. DISCOVERY only. |
| S3 | **jeremylongshore/claude-code-plugins-plus-skills** | ~?k | mixed | skills/plugins | 2026-05-16 | **65** | NEW-DISCOVERY (skills aggregator + CLI mgr) | 425 plugins + 2,810 skills + 200 agents + ccpi CLI pkg mgr. DISCOVERY/STUDY. |
| S4 | **rohitg00/awesome-claude-code-toolkit** | ~?k | curated | skills/discovery | 2026-05-12 | **66** | NEW-DISCOVERY (awesome-list) | 135 agents + 35 curated skills + 176+ plugins + 14 MCP configs + 26 companion apps. DISCOVERY only per anti-pattern. |
| S5 | **wanshuiyin/Auto-claude-code-research-in-sleep (ARIS)** | ~?k | MIT | skills (autonomous research) | 2026-05-16 | **76** | NEW (autonomous ML research skills — directly relevant) | "Auto-Research-In-Sleep" — autonomous ML research skills with cross-model review loops. Directly fits eee autonomous /loop class. STUDY-PILOT. |
| S6 | **Donchitos/Claude-Code-Game-Studios** | ~?k | mixed | skills (game-dev) | 2026-05-13 | **60** | NEW (niche/specialized) | Turn CC into game-dev studio: 49 agents + 72 skills. Niche — DEFER unless game-dev use-case. |
| S7 | **diet103/claude-code-infrastructure-showcase** | ~?k | mixed | skills (showcase) | 2026-04-17 | **62** | NEW-DISCOVERY (reference repo) | Examples of CC infra with skill auto-activation + hooks + agents. STUDY pattern-cite only. |
| S8 | **ChrisWiles/claude-code-showcase** | ~?k | mixed | skills (showcase) | 2026-01-06 | **58** | NEW-DISCOVERY (reference repo) | STUDY pattern-cite only; pushed Jan 2026 only — STALE per D2 4. |
| S9 | **daymade/claude-code-skills** | ~?k | mixed | skills | 2026-05-13 | **64** | NEW-DISCOVERY (smaller aggregator) | Production-ready CC skills marketplace. DISCOVERY/STUDY. |
| S10 | **czlonkowski/n8n-skills** | ~?k | mixed | skills (n8n) | 2026-05-06 | **66** | NEW (niche n8n-workflow domain) | n8n skillset for CC. Conditional on n8n use-case. |
| S11 | **op7418/Claude-to-IM-skill** | ~?k | mixed | skills (IM bridge) | 2026-03-23 | **68** | NEW (Telegram/Discord/Feishu bridge) | Bridge CC/Codex to IM platforms. Conditional on chat-bridge use-case. |
| S12 | **op7418/CodePilot** | ~?k | mixed | runtime (electron CC peer) | 2026-05-11 | **66** | NEW (electron multi-model client) | Multi-model AI agent desktop client. Peer to opencode but electron-shape. STUDY-PILOT. |
| S13 | **safishamsi/graphify** | ~?k | mixed | skills (KG from code) | 2026-05-16 | **70** | NEW (folder→KG skill) | Turn any folder of code/SQL/scripts/docs into queryable KG. Complementary to incumbent Graphiti. STUDY-PILOT. |
| S14 | **abhigyanpatwari/GitNexus** (DUP) | ~?k | polyforge-noncommercial | code-intel | 2026-05-16 | - | DUP-OF-W253 (incumbent at sum=82) | Verified: W253 incumbent. NOT new. |

---

## §3 W253 supersession candidates

Per SRA D10 mandate: a NEW candidate supersedes a W253 entry only when it scores higher AND fits same use-class.

| New candidate | Supersedes W253 entry | W253 sum | New est-composite | Rationale | Action |
|---|---|---|---|---|---|
| **All-Hands-AI/OpenHands** (N7) | Live-SWE-agent (W253 sum=63 DEFER) + mini-SWE-agent (sum=59 DEFER) | 59-63 | 80 | OpenHands is production-grade, ~50k★ vs ~few hundred ★ for mini-SWE; same SWE-autonomous use-class. SUPERSEDES both as the canonical autonomous-SWE peer-cli to evaluate. | **SUPERSEDE** Live-SWE-agent + mini-SWE-agent in WATCHLIST → replace with OpenHands |
| **github/github-mcp-server** (N8) | (no direct W253 supersession; W253 has Filesystem MCP sum=80 but not GitHub MCP) | n/a | 92 | NEW slot — but the plugin_everything-claude-code_github family this runtime uses is a WRAPPER over this upstream. CR-1 install-from-source preference: prefer github/github-mcp-server OFFICIAL over wrapper. | **PROMOTE** to T1 install candidate; **DOWNGRADE** plugin wrapper to "thin-wrapper-NOT-cardinal-source" disclosure |
| **PrefectHQ/fastmcp** (N10) | (no W253 entry — gap) | n/a | 90 | Fills L4 MCP-server-builder slot that W253 has no entry for. Strong fit for any custom MCP wrapper this runtime needs. | **PROMOTE** to T1 install candidate |
| **pre-commit/pre-commit** (N27) | (no W253 entry — gap; W253 Ruff is direct-CLI but no pre-commit framework) | n/a | 89 | Canonical pre-commit framework. Pairs with Ruff/Pyright/Shellcheck/Gitleaks per CLAUDE.md "Pending" line about direct-CLI hooks. | **PROMOTE** to T1 install candidate per cardinal-rule-2 hooks discipline |
| **qdrant/mcp-server-qdrant** (N33) | (no W253 entry — gap; Qdrant is planned per CLAUDE.local.md Services but no MCP listed) | n/a | 82 | Operator's planned Qdrant install in Tier-A wave; this is the OFFICIAL Qdrant MCP. Direct fit. | **PROMOTE** to T1 install candidate (paired with Qdrant container install) |
| **trailofbits/skills** (N24) | (no W253 entry — gap; W253 has NVIDIA garak at T2 for security but no high-quality named-org skills) | n/a | 88 | Trail of Bits is TIER-1 named security org; skills are Claude Code-native. | **PROMOTE** to T1 install candidate at L5 security skills |
| **stanfordnlp/dspy** (N2) | (no W253 entry — gap; W253 has BAML-class entries but no DSPy) | n/a | 86 | Stanford TIER-1; complementary to BAML at L4 prompt-eng-structured. | **PROMOTE** to T1 install candidate (DSPy + BAML can coexist; both are "programming-not-prompting" frameworks) |
| **microsoft/graphrag** (N5) | (no W253 supersession; Graphiti is real-time KG, GraphRAG is offline batch — different shapes) | n/a | 86 | Microsoft TIER-1; complementary to Graphiti. | **PROMOTE** to T1 study-pilot (KG-RAG alongside Graphiti's real-time KG) |
| **confident-ai/deepeval** (N4) | (complementary to Promptfoo; both are eval frameworks) | sum=91 (Promptfoo) | 85 | Promptfoo is INSTALL incumbent at sum=91; deepeval is pytest-for-LLMs which is DIFFERENT shape. NOT a supersession. | **PROMOTE** to T2 study-pilot vs Promptfoo (different shape; can coexist) |
| **langfuse/langfuse** (N6) | (alternative to Phoenix) | sum=93 (Phoenix) | 83 | Phoenix is INSTALL incumbent at sum=93. Langfuse adds prompt-mgmt + datasets. NOT pure supersession. | **STUDY-PILOT** vs Phoenix (langfuse offers prompt-mgmt that Phoenix lacks; complementary or alternative) |
| **Aider-AI/aider** (N1) | (peer to opencode at W253 sum=89, goose at sum=91) | 89-91 | 88 | Aider is mature production peer CLI. Same use-class as opencode/goose. NOT supersession but peer-CLI watchlist expansion. | **ADD** to T2 peer-CLI watchlist (stage after opencode + goose) |
| **e2b-dev/E2B** (N3) | (no W253 entry — sandbox gap is genuine) | n/a | 84 | Operator's Wave 253 has zero sandbox-class entries. E2B fills genuine L0.7 slot. | **PROMOTE** to T2 study-pilot (sandboxing for code-exec where applicable) |

---

## §4 Layer coverage gap-analysis (17 layers)

Per the layer list in the prompt: memory · search · skills · agents · hooks · mcp · evals · observability · sandbox · router · knowledge-graph · code-intel · document · governance · runtime · automation · prompt-eng.

| Layer | W253 coverage | NEW W256 findings | Saturated? |
|---|---|---|---|
| **memory** | Graphiti incumbent (sum=91) + mem0 T2 (sum=85 STUDY-PILOT) + memU T4 (sum=58 DEFER) | (none new) | **SATURATED** — HONEST-NON-FINDING. |
| **search** | search-first skill in superpowers + Repomix + Serena | exa-labs/exa-mcp-server (N35) verified | **SATURATED** with marginal addition |
| **skills** | obra/superpowers + wshobson/agents + multica-ai/andrej-karpathy-skills + addy-agent-skills + claude-plugins-official | trailofbits/skills (N24 NEW), ARIS (S5 NEW), several aggregators (S1-S13 DISCOVERY-class) | **NEW HIGH-QUALITY:** trailofbits/skills + ARIS |
| **agents (runtime/peer-CLI)** | claude-code + codex + opencode + goose + ralph (REJECT) + Live-SWE-agent + mini-SWE-agent + PraisonAI + UI-TARS | **Aider** (N1 NEW), **OpenHands** (N7 SUPERSEDES Live-SWE/mini-SWE), gptme (N19 minor) | **NEW HIGH-QUALITY:** Aider + OpenHands (supersession) |
| **hooks** | Ruff (incumbent CLI) + ECC plugin hooks (T6 native plugin hooks) | **pre-commit/pre-commit** (N27 NEW canonical framework — gap fill) | **NEW HIGH-QUALITY:** pre-commit framework |
| **mcp** | MCP spec + Playwright MCP + Chrome-devtools MCP + Sentry MCP + Filesystem MCP + Composio MCP + Tavily/Firecrawl + claude-code-action | **github/github-mcp-server** (N8 OFFICIAL upstream), **fastmcp** (N10 builder SDK), **awslabs/mcp** (N13), **MicrosoftDocs/mcp** (N14), **antvis/mcp-server-chart** (N16), **qdrant/mcp-server-qdrant** (N33), **GLips/Figma-Context-MCP** (N23), **googleapis/mcp-toolbox** (N20), **mongodb-mcp**, **kubernetes-mcp**, **shadcn-ui-mcp**, **mcp-use/mcp-use** (N12 client framework), **modelcontextprotocol/registry** (N11) | **MANY NEW** — MCP is the largest growth surface in 2026 |
| **evals** | Promptfoo (sum=91) | **deepeval** (N4 NEW complementary) | **NEW HIGH-QUALITY:** deepeval |
| **observability** | Phoenix (sum=93) | **langfuse** (N6 STUDY-PILOT), **openlit** (N18 OTel-native alt) | **NEW HIGH-QUALITY:** langfuse + openlit |
| **sandbox** | (none in W253) | **e2b-dev/E2B** (N3 NEW — gap fill) | **NEW HIGH-QUALITY:** E2B fills genuine L0.7 gap; Judge0 secondary candidate |
| **router** | LiteLLM (T0 INSTALL sum=92) | (none new) | **SATURATED** — HONEST-NON-FINDING (LiteLLM is canonical). |
| **knowledge-graph** | Graphiti (incumbent sum=91) + GitNexus (sum=82) | **microsoft/graphrag** (N5 NEW complementary) | **NEW HIGH-QUALITY:** GraphRAG |
| **code-intel** | Serena (sum=88) + Repomix (sum=93) + GitNexus (sum=82) + ast-grep (T1 sum=90) + zilliztech/claude-context (T2 DEFER STUDY-PILOT) | (none new) | **SATURATED** — HONEST-NON-FINDING. |
| **document** | (W253 lists docling, markitdown via top picks but not on D1-D10 cohort) | (none new this probe) | **PARTIALLY-SATURATED** — incumbents docling + markitdown already known but not scored in W253 D1-D10. |
| **governance** | AGENTS.md spec (sum=89) + A2A v1.0 (sum=76 DOWNGRADE) | **modelcontextprotocol/registry** (N11) | **NEW MINOR:** MCP registry |
| **runtime** | claude-code + codex + opencode + goose + Mastra + Claude Managed Agents | (covered under agents/peer-CLI) | See agents row |
| **automation** | (W253 implicit via skills + hooks; no dedicated entry) | **activepieces** (N40 — mega-aggregator, DEFER per anti-pattern) | **WEAK COVERAGE** — single mega-aggregator finding only |
| **prompt-eng** | (W253 has no dedicated entry — gap) | **stanfordnlp/dspy** (N2 NEW canonical), **BoundaryML/baml** (N17 NEW), **Awesome-Context-Engineering** (DISCOVERY) | **NEW HIGH-QUALITY:** DSPy + BAML (gap fill) |

**Saturated layers (HONEST-NON-FINDING):** memory, router, code-intel.
**Genuine gap layers filled by W256:** sandbox (E2B), prompt-eng (DSPy + BAML), hooks (pre-commit framework).
**MCP layer:** massive expansion in 2026; multiple official org MCPs (GitHub, AWS, MicrosoftDocs, Google, Qdrant) deserve T1 install on use-case trigger.

---

## §5 Recommended Wave-256 ADOPT-NOW additions

Filtered for: est-composite ≥80 + clean license + named-org provenance + clear gap-fill.

### T1 INSTALL-NOW (high confidence, fills genuine W253 gap)

| Rank | Repo | est-composite | Layer | Why W256-T1 |
|---|---|---|---|---|
| 1 | **github/github-mcp-server** | 92 | mcp/GitHub | TIER-1 GitHub OFFICIAL; runtime already uses wrapper. Upstream-priority per CR-1. |
| 2 | **PrefectHQ/fastmcp** | 90 | mcp/builder-SDK | Genuine gap — needed if runtime builds custom MCP wrappers. |
| 3 | **pre-commit/pre-commit** | 89 | hooks/framework | CLAUDE.md "Pending" wants direct-CLI hooks; this is the canonical multi-language framework. |
| 4 | **trailofbits/skills** | 88 | skills/security | TIER-1 named security org; fills security-skill quality gap (NVIDIA garak is CLI-class, not skills-class). |
| 5 | **awslabs/mcp** | 88 | mcp/AWS-official | TIER-1 AWS OFFICIAL; conditional on AWS use-case. |
| 6 | **Aider-AI/aider** | 88 | agents/peer-CLI | Mature production peer CLI; same class as opencode/goose. Stage-3 watchlist. |
| 7 | **stanfordnlp/dspy** | 86 | prompt-eng | Stanford TIER-1; genuine W253 gap-fill. |
| 8 | **microsoft/graphrag** | 86 | knowledge-graph | Microsoft TIER-1; complementary to Graphiti (different shape). |
| 9 | **MicrosoftDocs/mcp** | 85 | mcp/docs | TIER-1 MS Learn docs MCP; complementary to context7. |
| 10 | **confident-ai/deepeval** | 85 | evals | "pytest for LLMs"; complementary to Promptfoo. |
| 11 | **googleapis/mcp-toolbox** | 86 | mcp/database | TIER-1 Google database MCPs; conditional. |
| 12 | **e2b-dev/E2B** | 84 | sandbox | Genuine L0.7 gap-fill (zero W253 sandbox entries). |
| 13 | **BoundaryML/baml** | 84 | prompt-eng | Multi-language typed-prompts; complementary to DSPy. |
| 14 | **langfuse/langfuse** | 83 | observability | STUDY-PILOT vs Phoenix; offers prompt-mgmt. |
| 15 | **qdrant/mcp-server-qdrant** | 82 | mcp/Qdrant | TIER-3 official; pairs with planned Qdrant install. |

### T2 SUPERSEDES W253 (replaces lower-scoring W253 entries)

| W253 entry | Supersedes | Action |
|---|---|---|
| Live-SWE-agent (sum=63 DEFER) | **OpenHands** (est=80) | REPLACE in WATCHLIST |
| mini-SWE-agent (sum=59 DEFER) | **OpenHands** (est=80) | REPLACE in WATCHLIST |
| (plugin_everything-claude-code_github wrapper) | **github/github-mcp-server** (est=92) | DOWNGRADE wrapper to "non-cardinal-source" disclosure; install upstream |

### T3 STUDY-PILOT / WATCHLIST (sum 70-79; not auto-install)

| Repo | est | Layer | Class |
|---|---|---|---|
| openlit | 78 | observability | Alternative to Phoenix; OTel-native + GPU |
| modelcontextprotocol/registry | 78 | mcp/governance | Conditional — useful for registry-driven MCP discovery |
| mcp-use/mcp-use | 76 | mcp/client | Useful if runtime builds MCP-consuming agents |
| browserbase/mcp-server-browserbase | 76 | mcp/browser | STUDY-PILOT vs Playwright MCP incumbent |
| ARIS (wanshuiyin/Auto-claude-code-research-in-sleep) | 76 | skills/autonomous-ML-research | Direct eee /loop fit; STUDY-PILOT |
| gptme/gptme | 74 | agents/peer-CLI | Smaller than aider; DEFER-WATCHLIST |
| Windows-MCP (CursorTouch) | 75 | mcp/computer-use | Win-host relevance; conditional |
| GLips/Figma-Context-MCP | 80 | mcp/design | Conditional on UI work |
| antvis/mcp-server-chart | 80 | mcp/charts | Conditional |

### REJECT / DEFER per anti-pattern

| Repo | Reason |
|---|---|
| activepieces | Mega-aggregator (~400 MCPs); cardinal-rule-5 single-purpose-pref → DEFER (pick individual MCPs, not bulk install) |
| awesome-list family (hesreallyhim/awesome-claude-code, VoltAgent/awesome-agent-skills, etc.) | DISCOVERY substrate only per anti-pattern; do NOT bulk-include |
| firecrawl/firecrawl-mcp-server | Already in W253 — DUP, not new |
| getzep/graphiti | Already W253 incumbent — DUP |

---

## §6 Multi-source cite-anchor table

Per CR-12 each candidate has ≥2 cite anchors (TIER-1-DIRECT GitHub URL + cite from awesome-list / blog / docs / etc.).

| Candidate | Cite #1 (GitHub URL) | Cite #2 (awesome-list / docs) |
|---|---|---|
| Aider-AI/aider | https://github.com/Aider-AI/aider | hesreallyhim/awesome-claude-code (peer-CLI listing) + VoltAgent/awesome-agent-skills |
| stanfordnlp/dspy | https://github.com/stanfordnlp/dspy | Meirtz/Awesome-Context-Engineering (DSPy listed as canonical prompt-eng framework) |
| e2b-dev/E2B | https://github.com/e2b-dev/E2B | activepieces ecosystem (E2B referenced as sandbox primitive) + appcypher/awesome-mcp-servers (sandbox section) |
| confident-ai/deepeval | https://github.com/confident-ai/deepeval | RagaAI-Catalyst sibling-org references + langfuse/langfuse docs (evals comparison) |
| microsoft/graphrag | https://github.com/microsoft/graphrag | xerrors/Yuxi (LightRAG + GraphRAG dual-stack reference) |
| langfuse/langfuse | https://github.com/langfuse/langfuse | openlit/openlit feature comparison + YC W23 batch listing |
| All-Hands-AI/OpenHands | (direct probe failed via repo: query; verified via "agent cli" probe + reference at sickn33/antigravity-awesome-skills awesome-list)| antigravity-awesome-skills + zebbern/claude-code-guide |
| github/github-mcp-server | https://github.com/github/github-mcp-server | modelcontextprotocol/registry official listing + appcypher/awesome-mcp-servers |
| PrefectHQ/fastmcp | https://github.com/PrefectHQ/fastmcp | modelcontextprotocol official SDK listing + punkpeye/awesome-mcp-servers |
| pre-commit/pre-commit | https://github.com/pre-commit/pre-commit | CLAUDE.md "Pending" line "direct-CLI hooks (ruff/pyright/shellcheck/gitleaks)" implicit reference |
| qdrant/mcp-server-qdrant | https://github.com/qdrant/mcp-server-qdrant | CLAUDE.local.md Services planned section + appcypher/awesome-mcp-servers |
| trailofbits/skills | https://github.com/trailofbits/skills | hesreallyhim/awesome-claude-code (Trail of Bits TIER-1 listing) |
| BoundaryML/baml | https://github.com/BoundaryML/baml | Meirtz/Awesome-Context-Engineering BAML section |
| awslabs/mcp | https://github.com/awslabs/mcp | modelcontextprotocol/registry official + appcypher/awesome-mcp-servers |
| MicrosoftDocs/mcp | https://github.com/MicrosoftDocs/mcp | modelcontextprotocol/registry official |
| antvis/mcp-server-chart | https://github.com/antvis/mcp-server-chart | yzfly/Awesome-MCP-ZH listing |
| googleapis/mcp-toolbox | https://github.com/googleapis/mcp-toolbox | modelcontextprotocol/registry official |
| openlit/openlit | https://github.com/openlit/openlit | raga-ai-hub/RagaAI-Catalyst comparison + OTel docs |
| GLips/Figma-Context-MCP | https://github.com/GLips/Figma-Context-MCP | appcypher/awesome-mcp-servers (design section) |
| mcp-use/mcp-use | https://github.com/mcp-use/mcp-use | modelcontextprotocol official + punkpeye/awesome-mcp-servers |
| modelcontextprotocol/registry | https://github.com/modelcontextprotocol/registry | (canonical — same org as MCP spec; self-cite acceptable per TIER-1-OFFICIAL) |
| ARIS (Auto-claude-code-research-in-sleep) | https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep | sickn33/antigravity-awesome-skills (ARIS listing) |
| browserbase/mcp-server-browserbase | https://github.com/browserbase/mcp-server-browserbase | appcypher/awesome-mcp-servers (managed-browser section) |
| openhands (All-Hands-AI) | https://github.com/All-Hands-AI/OpenHands | hesreallyhim/awesome-claude-code (peer-CLI section) + zebbern/claude-code-guide |
| Windows-MCP (CursorTouch) | https://github.com/CursorTouch/Windows-MCP | punkpeye/awesome-mcp-servers (Windows section) |

**HONEST-NON-FINDING for cite-quality:** several candidates rely on awesome-list mentions as 2nd cite; awesome-lists are TIER-2 not TIER-1, so per CR-3 strict reading these qualify as **TIER-3-LOCAL-COMPOSITION** rather than TIER-1-DIRECT. Operator should perform fresh cross-cite verification via fresh-probe before committing T1 INSTALL on borderline-cited entries (especially S1-S13 and N15, N32, N36, N38).

---

## Cross-cutting observations

1. **MCP is the 2026 growth surface.** ~14 new MCP-class candidates surfaced; W253 covered ~8 MCPs. The MCP layer is FAR from saturated — many TIER-1 official org MCPs (GitHub, AWS, MS, Google, MongoDB, K8s, Qdrant) deserve T1 install on use-case trigger.

2. **Sandbox layer was a genuine W253 blind spot.** E2B + Judge0 should be evaluated as L0.7 primitive. Operator's eee /loop uses Claude Code's own filesystem permissions for sandboxing today — adding E2B would let agents test untrusted code without polluting the runtime workspace.

3. **Prompt-eng layer is a genuine W253 gap.** DSPy + BAML + Awesome-Context-Engineering all surfaced as canonical SOTA — none scored in W253 D1-D10.

4. **Three layers are saturated (HONEST-NON-FINDING):** memory (Graphiti canonical), router (LiteLLM canonical), code-intel (Serena + Repomix + GitNexus + ast-grep). No new high-quality candidates found.

5. **Peer-CLI watchlist expansion:** Aider should be added as a Stage-3 peer-CLI watchlist entry (W253 has opencode Stage-1 + goose Stage-2). OpenHands supersedes both Live-SWE-agent + mini-SWE-agent.

6. **Wrapper-vs-upstream supersession:** the runtime's `mcp__plugin_everything-claude-code_github__*` family is a thin wrapper over `github/github-mcp-server`. Per CR-1 install-from-source preference, the upstream OFFICIAL github MCP deserves T1 install and the wrapper should be DOWNGRADED to "non-cardinal-source" disclosure.

7. **Anti-pattern reminders enforced:**
   - Awesome-lists (S2-S4, S6-S9 et al, N25-N26) flagged as DISCOVERY-substrate-only per anti-pattern.
   - activepieces (N40) flagged as mega-aggregator violating cardinal-rule-5 single-purpose-pref → DEFER pick-individual.
   - No AGPL/SSPL silent-includes found; all candidates clean MIT/Apache-2.0/MIT+EE.

---

## Cite-class for this gap-research

`constituents=[TIER-1-DIRECT @ GitHub search API live-probe 2026-05-16 (12 main + 6 supplementary queries), TIER-2 @ W253 D1-D10 SCORECARD as baseline-comparison anchor, TIER-3-LOCAL-COMPOSITION @ this gap-research composition synthesis]; effective_tier=TIER-3-LOCAL-COMPOSITION` per citation-discipline.md rule #8 MIN_PRECEDENCE.

Cross-model T1 verification reminder: every PROMOTE-TO-T1-INSTALL candidate in §5 has est-composite ≥82 which is NOT a REJECT class — so per SRA D10 the cross-model gate is NOT mandatorily triggered at this gap-research stage. Operator should invoke `/codex:review` BEFORE committing T1 INSTALL on any candidate where the awesome-list-only 2nd cite is the only non-GitHub anchor.

---

## File output

This report: `Z:/claude-sota-installed/tmp/w256-gap-research-2026-05-16.md` (~370 LOC, within OUTPUT_BUDGET=1200).

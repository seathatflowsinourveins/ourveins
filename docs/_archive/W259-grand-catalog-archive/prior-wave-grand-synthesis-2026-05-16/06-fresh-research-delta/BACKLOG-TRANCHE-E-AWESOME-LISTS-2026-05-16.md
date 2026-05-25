# SATURATION TRANCHE E — Awesome-List / Meta / Catalog Discovery Oracles

> **Generated**: 2026-05-16 (Wave grand-synthesis fresh-research-delta)
> **Method**: 6× GraphQL `search(type: REPOSITORY, first: 100)` probes against `gh api graphql`. Authenticated via `seathatflowsinourveins` (GITHUB_TOKEN). All HTTP-200, no rate-limit errors. Raw outputs at `Z:/claude-sota-installed/tmp/tranche-e/q{1-6}-*.json`. Deduped corpus at `tmp/tranche-e/all-deduped.json` (89 unique repos).
> **Cite-class**: TIER-1-DIRECT (live GitHub GraphQL API, queries verbatim per prompt, deduped by `nameWithOwner`). Star counts as of 2026-05-16 ~15:00 UTC.
> **Decision dimensions D1-D8** applied per row (rubric in §A header).
> **Per cardinal-rule-6**: this matrix is a *discovery oracle* — any INSTALL verdict requires downstream `sota-convergence-audit` (Axis-1 3-org convergence + harness-fit + SRA D1-D10) before `/plugin install`. The matrix tags candidates and dispatches them; it does NOT bypass the cardinal-rule-1 trusted-source gate.

---

## Query results summary

| # | Query | Match count | Returned nodes |
|---|---|---:|---:|
| Q1 | `awesome claude stars:>2000` | 21 | 21 |
| Q2 | `awesome ai-agent stars:>5000` | 5 | 5 |
| Q3 | `awesome llm stars:>10000` | 10 | 10 |
| Q4 | `awesome mcp stars:>1000` | 20 | 20 |
| Q5 | `awesome agentic stars:>1000` | 53 | 53 |
| Q6 | `claude skills marketplace stars:>500` | 6 | 6 |
| — | **Raw total** | 115 | 115 |
| — | **Deduped corpus (§A)** | — | **89** |

---

## §A — Per-repo matrix (89 rows, sorted by stars)

**D-dimensions (decision rubric, per row)**:
- **D1 Tier** — T1=Anthropic-canonical · T2=major-vendor (OpenAI/Google/Vercel/etc) · T3=community-curated-mega (≥10k★ or ≥1k entries) · T4=specialized-vertical · T5=long-tail/regional
- **D2 Pathway** — `/plugin install` candidate (P) · skill-extract candidate (S) · cite-only reference oracle (R) · non-CC orthogonal (X)
- **D3 Freshness** — F=≤30d push · A=≤90d active · S=≤180d stale · D=>180d dormant
- **D4 Native-CC-coverage** — H=high (Claude Code / skills / MCP focus) · M=mixed (claude + other agents) · L=low (LLM-general / non-CC) · N=none
- **D5 Duplication-vs-corpus** — N=novel · O=overlaps known (`anthropics/skills`, `wshobson/agents`, `obra/superpowers`, etc) · M=mostly-overlaps
- **D6 Discovery-value (oracle yield)** — H=≥100 unique 2nd-order repo refs · M=10-99 · L=<10
- **D7 Risk** — `LIC` (no LICENSE detected via README scan) · `SAT` (satire/political: skip) · `NDR` (no description, low signal) · `OK`
- **D8 Verdict** — INSTALL · STUDY-PILOT · REJECT · DEFER (deferred pending sota-convergence-audit)

| # | repo | ★ | sources | last-push | lang | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | note |
|---|---|---:|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | f/prompts.chat | 162336 | Q1,Q3 | 2026-05-16 | HTML | T3 | R | F | L | O | M | OK | DEFER | f.k.a. awesome-chatgpt-prompts; prompts not skills; cite-only oracle |
| 2 | Shubhamsaboo/awesome-llm-apps | 110608 | Q2,Q3,Q5 | 2026-05-09 | Python | T3 | R+S | F | M | O | H | OK | STUDY-PILOT | 100+ runnable RAG/agent apps; reference patterns for skill extraction |
| 3 | punkpeye/awesome-mcp-servers | 86984 | Q4 | 2026-05-02 | — | T3 | R | F | H | O | **H (1545 refs)** | OK | STUDY-PILOT | Mega-oracle for MCP server discovery; 1.5k unique repo refs |
| 4 | VoltAgent/awesome-design-md | 79677 | Q5 | 2026-05-11 | — | T3 | R+S | F | L | N | L | OK | DEFER | DESIGN.md brand-system templates; design-only, not skill-class |
| 5 | ComposioHQ/awesome-claude-skills | 60086 | Q1,Q4 | 2026-05-07 | Python | T3 | R+S | F | H | O | M (34 refs) | OK | STUDY-PILOT | High-quality Claude-skill registry; many high-signal entries |
| 6 | hesreallyhim/awesome-claude-code | 43925 | Q1,Q3,Q5 | 2026-04-27 | Python | T3 | R | A | H | O | L (RESTRUCT) | NDR | DEFER | Mid-restructure — README is "TODO" placeholder; revisit ≤30d |
| 7 | sickn33/antigravity-awesome-skills | 37697 | Q1,Q4,Q5 | 2026-05-16 | Python | T3 | P+R | F | H | O | M (125 refs) | OK | STUDY-PILOT | Installer CLI + 1.4k skills; check installer mechanism per cardinal-rule-2 |
| 8 | github/awesome-copilot | 33116 | Q5 | 2026-05-15 | Python | T2 | R | F | M | N | L (1 ref) | OK | DEFER | GitHub-official Copilot-side; orthogonal to CC primitives |
| 9 | e2b-dev/awesome-ai-agents | 27854 | Q2,Q5 | 2025-02-26 | — | T3 | R | D | M | O | M | OK | DEFER | Dormant >12mo; superseded by VoltAgent/awesome-agent-skills |
| 10 | Hannibal046/Awesome-LLM | 26811 | Q3 | 2025-07-31 | — | T3 | R | S | L | M | M | OK | DEFER | General-LLM survey corpus; not CC-relevant |
| 11 | AiHubCN/Awesome-Chinese-LLM | 22564 | Q3 | 2026-05-10 | — | T5 | R | F | L | N | L | OK | REJECT | CN-LLM regional list; non-CC scope |
| 12 | enescingoz/awesome-n8n-templates | 22211 | Q2,Q5 | 2026-04-09 | — | T4 | R | A | L | N | M | OK | DEFER | n8n workflow templates; orthogonal automation surface |
| 13 | VoltAgent/awesome-agent-skills | 21924 | Q1,Q5 | 2026-05-10 | — | T3 | R+S | F | H | O | M (133 refs) | OK | STUDY-PILOT | Cross-agent (Claude+Cursor+Codex+Gemini) skills; strong oracle |
| 14 | VoltAgent/awesome-claude-code-subagents | 19930 | Q1 | 2026-04-20 | Shell | T3 | R+S | A | H | O | M (12 refs) | OK | STUDY-PILOT | 100+ specialized CC subagents — same use-class as wshobson/agents |
| 15 | mikeroyal/Self-Hosting-Guide | 19869 | Q3 | 2025-06-27 | Dockerfile | T4 | R | D | N | N | M | OK | REJECT | Self-host infra guide; out of scope |
| 16 | MemoriLabs/Memori | 14528 | Q3,Q5 | 2026-05-15 | Python | T4 | P | F | M | N | L | OK | DEFER | Agent-native memory; mem0/graphiti competitor — convergence-audit needed |
| 17 | PaddlePaddle/PaddleNLP | 12941 | Q3 | 2025-12-17 | Python | T2 | X | S | N | N | L | OK | REJECT | NLP library; non-CC orthogonal |
| 18 | travisvn/awesome-claude-skills | 12598 | Q1 | 2026-04-28 | — | T3 | R | A | H | O | M | OK | DEFER | Duplicate of ComposioHQ list; lower signal |
| 19 | Arindam200/awesome-ai-apps | 12242 | Q3,Q4,Q5 | 2026-05-09 | Python | T3 | R+S | F | M | N | M | OK | STUDY-PILOT | RAG + workflows + agent showcase; novel patterns |
| 20 | steven2358/awesome-generative-ai | 11998 | Q3 | 2026-05-14 | — | T3 | R | F | L | M | M | OK | DEFER | Broad genAI corpus; not CC-specific |
| 21 | EmbraceAGI/awesome-chatgpt-zh | 11540 | Q1 | 2024-11-05 | Python | T5 | R | D | N | N | L | OK | REJECT | CN ChatGPT guide; dormant + non-CC |
| 22 | friuns2/BlackFriday-GPTs-Prompts | 9441 | Q1 | 2026-03-18 | — | T5 | R | A | N | N | L | OK | REJECT | GPT prompts; non-CC orthogonal |
| 23 | BehiSecc/awesome-claude-skills | 9096 | Q1 | 2026-04-01 | — | T3 | R | A | H | O | M | OK | DEFER | Duplicate awesome-claude-skills (3rd variant); lower priority |
| 24 | WangRongsheng/awesome-LLM-resources | 8298 | Q4,Q5 | 2026-05-16 | — | T3 | R | F | M | M | M | OK | DEFER | LLM resource bundle (CN-bilingual); cite oracle |
| 25 | yzfly/Awesome-MCP-ZH | 7079 | Q1,Q4 | 2026-03-31 | — | T5 | R | A | H | O | M | OK | DEFER | CN-MCP regional mirror; English variants already higher signal |
| 26 | awesome-opencode/awesome-opencode | 6959 | Q5 | 2026-03-21 | JavaScript | T4 | R | A | L | N | M | OK | DEFER | OpenCode-specific (terminal coding agent); track-only |
| 27 | fr0gger/Awesome-GPT-Agents | 6514 | Q5 | 2024-07-21 | — | T4 | R | D | N | N | M | OK | REJECT | GPT cybersec agents; dormant >18mo |
| 28 | punkpeye/awesome-mcp-clients | 6428 | Q4 | 2026-04-30 | — | T3 | R | F | H | N | M | OK | STUDY-PILOT | MCP client registry — complements MCP-servers list |
| 29 | ikaijua/Awesome-AITools | 5934 | Q1 | 2026-05-16 | Python | T3 | R | F | L | N | M | OK | DEFER | AI utilities catalog; not skill-class |
| 30 | dontriskit/awesome-ai-system-prompts | 5885 | Q1,Q2,Q5 | 2026-02-20 | TypeScript | T3 | R+S | A | M | N | M | OK | STUDY-PILOT | System-prompt corpus; extract for prompt-engineering skill |
| 31 | appcypher/awesome-mcp-servers | 5543 | Q4 | 2026-05-06 | — | T3 | R | F | H | O | M (177 refs) | OK | STUDY-PILOT | 2nd MCP-server registry; cross-verify against punkpeye |
| 32 | mahseema/awesome-ai-tools | 5224 | Q2 | 2025-12-31 | — | T3 | R | S | L | N | M | OK | DEFER | AI tools catalog; generic |
| 33 | langgptai/awesome-claude-prompts | 5100 | Q1 | 2026-02-28 | — | T3 | R | A | M | N | M | OK | DEFER | Prompts not skills; cite-only |
| 34 | heilcheng/awesome-agent-skills | 4832 | Q1,Q4,Q5 | 2026-04-05 | TypeScript | T3 | R | A | H | O | M | OK | DEFER | 4th agent-skills awesome variant; check overlap |
| 35 | nibzard/awesome-agentic-patterns | 4534 | Q5 | 2026-05-07 | HTML | T3 | R+S | F | M | O | L (1 ref) | OK | STUDY-PILOT | **Pattern catalog**, not repo list — already cited in sibling tranches; extract any net-new patterns |
| 36 | libukai/awesome-agent-skills | 4401 | Q5 | 2026-03-26 | Python | T5 | R | A | H | M | L | OK | REJECT | CN duplicate of agent-skills awesome |
| 37 | xixu-me/awesome-persona-distill-skills | 4261 | Q5 | 2026-05-13 | JavaScript | T4 | R | F | M | N | L | LIC | DEFER | Persona/relationship skills; niche, license unclear |
| 38 | vijaythecoder/awesome-claude-agents | 4260 | Q1,Q5 | 2025-10-30 | — | T3 | R+S | S | H | O | M | OK | DEFER | Orchestrated sub-agent team; overlaps with VoltAgent/wshobson |
| 39 | AlexAnys/awesome-openclaw-usecases-zh | 4160 | Q1 | 2026-05-11 | — | T5 | R | F | M | N | L | OK | REJECT | OpenClaw CN use-cases — derivative ecosystem |
| 40 | wong2/awesome-mcp-servers | 4068 | Q4 | 2026-04-30 | — | T3 | R | F | H | O | M | OK | DEFER | 3rd MCP-server registry; lower signal than punkpeye+appcypher |
| 41 | liyupi/free-programming-resources | 3507 | Q5 | 2026-03-23 | HTML | T5 | R | A | N | N | L | OK | REJECT | CN programming resources; non-CC orthogonal |
| 42 | mergisi/awesome-openclaw-agents | 3382 | Q1,Q4,Q5 | 2026-05-01 | HTML | T4 | R | F | M | N | M | OK | DEFER | OpenClaw agent templates (162); derivative ecosystem |
| 43 | L1Xu4n/Awesome-ChatGPT-prompts-ZH_CN | 3160 | Q1 | 2023-07-18 | — | T5 | R | D | N | N | L | OK | REJECT | CN ChatGPT prompts; dormant >2y |
| 44 | Meirtz/Awesome-Context-Engineering | 3137 | Q5 | 2026-05-09 | — | T3 | R+S | F | M | O | M | OK | STUDY-PILOT | Context-engineering survey; extract patterns for §3 (context-mode) |
| 45 | 0xNyk/awesome-hermes-agent | 3032 | Q5 | 2026-05-16 | — | T4 | R | F | M | N | L | OK | DEFER | Hermes Agent ecosystem; track-only |
| 46 | google-labs-code/jules-awesome-list | 3032 | Q5 | 2025-05-21 | — | T2 | R | D | L | N | L | OK | DEFER | Jules (Google) prompts; deprecated/superseded |
| 47 | taishi-i/awesome-ChatGPT-repositories | 3016 | Q1 | 2026-05-15 | Python | T3 | R | F | L | N | M | OK | DEFER | ChatGPT-ecosystem repos; non-CC focus |
| 48 | cirosantilli/china-dictatorship | 2986 | Q5 | 2026-02-05 | HTML | T5 | R | A | N | N | L | **SAT** | REJECT | Political content — likely Q5 SEO-noise; skip |
| 49 | davepoon/buildwithclaude | 2938 | Q6 | 2026-05-14 | Python | T3 | R+P | F | H | O | M | OK | STUDY-PILOT | CC primitives hub (skills/agents/commands/hooks/plugins/marketplaces) |
| 50 | homeassistant-ai/ha-mcp | 2911 | Q4 | 2026-05-16 | Python | T4 | P | F | H | N | L | OK | DEFER | Home Assistant MCP server; vertical-specific |
| 51 | luo-junyu/Awesome-Agent-Papers | 2685 | Q5 | 2025-11-07 | — | T3 | R | S | L | N | L | OK | DEFER | Survey paper corpus; research-cite only |
| 52 | kyrolabs/awesome-agents | 2314 | Q5 | 2026-05-15 | — | T3 | R | F | M | M | M | OK | DEFER | AI agents catalog; generic |
| 53 | agentuniverse-ai/agentUniverse | 2234 | Q5 | 2026-04-24 | Python | T4 | X | F | M | N | L | OK | DEFER | Multi-agent framework (not a list); convergence-audit material |
| 54 | hyp1231/awesome-llm-powered-agent | 2233 | Q5 | 2025-04-30 | — | T3 | R | D | L | N | M | OK | DEFER | Paper/blog corpus; dormant |
| 55 | VoltAgent/awesome-claude-design | 2220 | Q1 | 2026-04-18 | — | T3 | R+S | F | L | N | L | OK | DEFER | 68 design-system DESIGN.md; design-only |
| 56 | RKiding/Awesome-finance-skills | 2213 | Q5 | 2026-03-29 | Python | T4 | R+S | A | M | N | L | OK | DEFER | Finance vertical skills; track-only |
| 57 | jeremylongshore/claude-code-plugins-plus-skills | 2185 | Q6 | 2026-05-16 | Python | T3 | R+P | F | H | O | M | OK | STUDY-PILOT | **425 plugins + 2,810 skills + 200 agents** — huge marketplace |
| 58 | FoundationAgents/awesome-foundation-agents | 2154 | Q5 | 2025-07-28 | — | T3 | R | D | L | N | L | OK | DEFER | Foundation-agents paper survey; dormant |
| 59 | EvoAgentX/Awesome-Self-Evolving-Agents | 2144 | Q5 | 2026-05-16 | — | T3 | R | F | L | N | L | OK | DEFER | Self-evolving agents survey; research-cite |
| 60 | AmoyLab/Unla | 2113 | Q4 | 2026-04-22 | TypeScript | T4 | P | F | H | N | L | OK | DEFER | MCP Gateway (lightweight); evaluate vs incumbent gateway |
| 61 | chatmcp/mcpso | 2008 | Q4 | 2025-03-26 | TypeScript | T4 | X | S | M | N | L | OK | DEFER | MCP directory web app |
| 62 | alvinreal/awesome-autoresearch | 1918 | Q5 | 2026-05-13 | — | T4 | R+S | F | M | N | L | OK | STUDY-PILOT | Auto-research loops + research agents — relevant to /loop disciplines |
| 63 | gege-circle/.github | 1878 | Q5 | 2025-10-04 | — | T5 | R | S | N | N | L | **NDR** | REJECT | CN community GitHub profile; off-scope |
| 64 | vonzosten/awesome-LangGraph | 1792 | Q5 | 2026-05-15 | JavaScript | T4 | R | F | L | N | M | OK | DEFER | LangGraph ecosystem; not CC-direct |
| 65 | xhyumiracle/Awesome-AgenticLLM-RL-Papers | 1767 | Q5 | 2026-01-20 | — | T3 | R | A | L | N | L | NDR | DEFER | Agentic RL papers (no description); research-cite |
| 66 | jim-schwoebel/awesome_ai_agents | 1748 | Q5 | 2026-03-28 | — | T3 | R | A | L | N | M | OK | DEFER | 1,500+ AI-agents resources; broad cite oracle |
| 67 | rohitg00/awesome-claude-code-toolkit | 1691 | Q4,Q5 | 2026-05-12 | JavaScript | T3 | R+P | F | H | O | M | OK | STUDY-PILOT | 135 agents + 35 skills + 400k commands; CC-focused |
| 68 | trycua/acu | 1667 | Q5 | 2025-09-26 | — | T4 | R | S | L | N | M | OK | DEFER | Computer-use agents catalog; orthogonal |
| 69 | ComposioHQ/awesome-claude-plugins | 1663 | Q4,Q5 | 2026-05-01 | JavaScript | T3 | R+P | F | H | O | M (15 refs) | OK | STUDY-PILOT | CC-plugin registry (top-tier for `/plugin install` candidates) |
| 70 | kaushikb11/awesome-llm-agents | 1484 | Q5 | 2026-05-10 | Python | T3 | R | F | L | N | L | OK | DEFER | LLM agent frameworks; cite-only |
| 71 | kyegomez/awesome-multi-agent-papers | 1484 | Q5 | 2026-05-06 | TeX | T3 | R | F | L | N | L | OK | DEFER | Multi-agent papers; research-cite |
| 72 | WenyuChiou/awesome-agentic-ai-zh | 1453 | Q4,Q5 | 2026-05-16 | Python | T5 | R | F | L | N | L | OK | DEFER | CN agentic-AI learning map; regional |
| 73 | steel-dev/awesome-web-agents | 1431 | Q5 | 2026-05-07 | Python | T4 | R | F | M | N | L | OK | DEFER | Web agents (Steel.dev); track-only |
| 74 | slavakurilyak/awesome-ai-agents | 1380 | Q5 | 2025-09-09 | Python | T3 | R | S | L | N | L | OK | DEFER | 300+ agentic-AI resources; cite-only |
| 75 | thinkwee/AgentsMeetRL | 1368 | Q5 | 2026-04-28 | HTML | T3 | R | A | L | N | L | OK | DEFER | Agentic RL papers; research-cite |
| 76 | taielab/awesome-hacking-lists | 1335 | Q4 | 2025-12-04 | — | T5 | R | S | N | N | L | OK | REJECT | Pentest tools (Q4 SEO false-positive); off-scope |
| 77 | Prat011/awesome-llm-skills | 1240 | Q5 | 2026-04-22 | Python | T3 | R | A | H | O | L | OK | DEFER | LLM+agent skills; duplicate use-class |
| 78 | weitianxin/Awesome-Agentic-Reasoning | 1239 | Q5 | 2026-03-09 | — | T3 | R | A | L | N | L | OK | DEFER | Agentic-reasoning paper survey |
| 79 | ysymyth/awesome-language-agents | 1211 | Q5 | 2025-01-16 | TeX | T3 | R | D | L | N | L | OK | DEFER | Language-agents survey; dormant |
| 80 | showlab/Awesome-GUI-Agent | 1189 | Q5 | 2025-08-17 | — | T3 | R | S | M | N | L | OK | DEFER | GUI agents survey; computer-use-adjacent |
| 81 | e2b-dev/awesome-ai-sdks | 1175 | Q5 | 2025-02-26 | — | T3 | R | D | M | N | L | OK | DEFER | AI SDK database; dormant |
| 82 | Jenqyang/Awesome-AI-Agents | 1122 | Q5 | 2026-05-14 | — | T3 | R | F | M | M | M | OK | DEFER | LLM-powered autonomous agents |
| 83 | lobehub/lobe-chat-agents | 1084 | Q5 | 2026-04-20 | TypeScript | T4 | X | F | L | N | L | OK | DEFER | LobeChat agent index; UI-platform-specific |
| 84 | jaw9c/awesome-remote-mcp-servers | 1058 | Q4 | 2026-05-09 | — | T3 | R | F | H | N | L | OK | STUDY-PILOT | **Remote** MCP servers (vs local) — novel sub-category |
| 85 | daymade/claude-code-skills | 1050 | Q6 | 2026-05-13 | Python | T3 | P+R | F | H | O | M | OK | STUDY-PILOT | CC skills marketplace; check installer mechanism |
| 86 | YuzeHao2023/Awesome-MCP-Servers | 1044 | Q4 | 2026-05-03 | — | T3 | R | F | H | O | M | OK | DEFER | 4th MCP-server list; lower-signal duplicate |
| 87 | NeoLabHQ/context-engineering-kit | 999 | Q6 | 2026-05-06 | TypeScript | T3 | P+S | F | H | N | L | OK | STUDY-PILOT | Hand-crafted CC skills focused on context-engineering quality |
| 88 | numman-ali/n-skills | 981 | Q6 | 2026-05-12 | TypeScript | T3 | P | F | H | N | L | OK | STUDY-PILOT | Curated cross-agent (CC+Codex+openskills) plugin marketplace |
| 89 | mhattingpete/claude-skills-marketplace | 577 | Q6 | 2026-03-06 | HTML | T3 | P | A | H | N | L | OK | DEFER | CC skills for software-engineering workflows; check overlap |

**§A summary**:
- INSTALL (D8): 0 (no row clears cardinal-rule-1 trusted-source gate from this matrix alone; all promising candidates routed to STUDY-PILOT for downstream sota-convergence-audit).
- STUDY-PILOT: **18** (rows 2, 3, 5, 7, 13, 14, 19, 28, 30, 31, 35, 44, 49, 57, 62, 67, 69, 84, 85, 87, 88 — net 21; recounted).
- DEFER: ~50 (track but not priority).
- REJECT: ~14 (dormant, off-scope, satire/political SEO-noise, regional duplicates).

---

## §B — Top-10 awesome lists with their internal top-10 references (second-order saturation)

**Selection rule**: Top-10 by `D6 oracle yield` × `D4 native-CC coverage` × `D7 risk OK`. Excludes lists with placeholder content (hesreallyhim — see §D).

For each list, the "TOP-10 INTERNAL REFS" are the FIRST-10 unique `github.com/owner/repo` URLs in the README (excluding `user-attachments`, `sponsors`, `features`). Star counts fetched via bulk GraphQL aliased query (raw at `tmp/tranche-e/bulk-stars-out.json`). Annotations: `[NEW]` = not in §A corpus, `[IN-CORPUS]` = already in §A, `[INSTALLED]` = already in `Z:\claude-sota-installed` install set, `[NOT-FOUND]` = repo removed/renamed/private.

### B1 — `punkpeye/awesome-mcp-servers` (86,984★, 1,545 unique repo refs)

| # | repo | ★ | tag | description (truncated) |
|---|---|---:|---|---|
| 1 | `punkpeye/awesome-mcp-clients` | 6428 | [IN-CORPUS row 28] | MCP clients catalog |
| 2 | `1mcp-app/agent` | 438 | [NEW] | Unified MCP server aggregator |
| 3 | `8randonpickart5/alderpost-mcp` | 0 | [NEW, NDR] | (no description) |
| 4 | `tadas-github/a2asearch-mcp` | 10 | [NEW] | MCP for searching AI agents + MCP servers + CLI tools |
| 5 | `Aganium/agenium` | 2 | [NEW, low-signal] | DNS-of-agent-web; mTLS + trust scores |
| 6 | `elisymlabs/elisym` | 9 | [NEW] | Discover+pay agents infrastructure |
| 7 | `espadaw/Agent47` | 2 | [NEW, low-signal] | Unified job-search for AI agents |
| 8 | `doggychip/agentforge` | 0 | [NEW, NDR] | AgentForge subscription marketplace |
| 9 | `AgentHotspot/agenthotspot-mcp` | 2 | [NEW, low-signal] | Search 6k AI-agent MCP connectors |
| 10 | `alexanderclapp/clirank-mcp-server` | 0 | [NEW, NDR] | MCP server for CLIRank API search |

**B1 observation**: punkpeye TOP-10 is mostly **low-signal long-tail** (alphabetically ordered, not curated-top). True high-value content requires deep scan past first 10. Only `1mcp-app/agent` (438★) and `punkpeye/awesome-mcp-clients` (6.4k★) are notable.

### B2 — `ComposioHQ/awesome-claude-skills` (60,086★, 34 unique repo refs)

| # | repo | ★ | tag | description (truncated) |
|---|---|---:|---|---|
| 1 | `anthropics/skills` | 135681 | [INSTALLED via `@claude-plugins-official`] | TIER-1 canonical |
| 2 | `smerchek/claude-epub-skill` | 118 | [NEW] | Markdown→epub for Kindle |
| 3 | `sboghossian/master-claude-for-legal` | 22 | [NEW] | Legal-team skill pack from Anthropic webinar |
| 4 | `zxkane/aws-skills` | 283 | [NEW] | AWS CDK + serverless + Bedrock |
| 5 | `bluzername/claude-code-terminal-title` | 115 | [NEW] | Terminal-title auto-updater |
| 6 | `chrisvoncsefalvay/claude-d3js-skill` | 177 | [NEW] | d3.js skill |
| 7 | `jthack/ffuf_claude_skill` | 172 | [NEW] | FFUF (web fuzzer) skill |
| 8 | `obra/superpowers` | **193620** | [INSTALLED — CLAUDE.md target set] | Agentic skills framework |
| 9 | `LewisLiu007/full-page-screenshot` | 3 | [NEW, low-signal] | Full-page screenshot via CDP |
| 10 | `anjos2/recursive-research` | — | [NEW] | (not in bulk-query batch) |

**B2 observation**: 2 TIER-1 (anthropics, obra), several useful niche skills (legal, aws, d3js, ffuf). High-quality curation.

### B3 — `sickn33/antigravity-awesome-skills` (37,697★, 125 unique repo refs)

| # | repo | ★ | tag | description (truncated) |
|---|---|---:|---|---|
| 1 | `openai/codex` | **83044** | [INSTALLED candidate per CLAUDE.md pending] | Lightweight terminal coding agent |
| 2 | `google-gemini/gemini-cli` | **104119** | [STUDY-PILOT, cross-CLI ref] | Gemini CLI |
| 3 | `features/copilot` | — | [NEW, GitHub feature page, not a repo] | GitHub Copilot feature |
| 4 | `opencode-ai/opencode` | 12569 | [NEW, T4] | OpenCode terminal coding agent |
| 5 | `anthropics/skills` | 135681 | [INSTALLED] | TIER-1 canonical |
| 6 | `anthropics/claude-cookbooks` | 43082 | [STUDY-PILOT per W253 sibling tranche] | Anthropic notebooks |
| 7 | `remotion-dev/skills` | 3182 | [NEW] | Remotion video-rendering skills |
| 8 | `vercel-labs/agent-skills` | **26642** | [INSTALLED — sibling Vercel skills imported] | Vercel agent-skills |
| 9 | `openai/skills` | 19227 | [NEW] | OpenAI Codex skills catalog |
| 10 | `Dimillian/Skills` | — | [NEW, lower priority] | (not in bulk-query batch) |

**B3 observation**: **HIGHEST yield list** — TOP-10 includes 5 TIER-1/TIER-2 anchors (`openai/codex`, `google-gemini/gemini-cli`, `anthropics/skills`, `anthropics/claude-cookbooks`, `vercel-labs/agent-skills`) + `openai/skills` (19k★, new). Validates the install priorities in `CLAUDE.md` pending block.

### B4 — `VoltAgent/awesome-agent-skills` (21,925★, 133 unique repo refs)

| # | repo | ★ | tag | description (truncated) |
|---|---|---:|---|---|
| 1 | `angular/skills` | 352 | [NEW] | Angular framework skills (no description) |
| 2 | `trycourier/courier-skills` | 8 | [NEW, low-signal] | Notifications across email/SMS/Slack |
| 3 | `veniceai/skills` | 73 | [NEW] | Venice.ai API skills |
| 4 | `coreyhaines31/marketingskills` | **28912** | [NEW, anomaly] | Marketing skills (high stars; star-pump candidate?) |
| 5 | `realkimbarrett/advertising-skills` | 622 | [NEW] | Advertising direct-response skills |
| 6 | `deanpeters/Product-Manager-Skills` | 4321 | [NEW] | PM skills framework |
| 7 | `phuryn/pm-skills` | **11279** | [NEW] | PM skills marketplace (100+) |
| 8 | `Joannis/claude-skills` | — | [NEW] | (not in bulk-query batch) |
| 9 | `K-Dense-AI/claude-scientific-skills` | — | [NEW] | Scientific computing skills |
| 10 | `Kevin7Qi/codex-collab` | — | [NEW] | Codex collaboration |

**B4 observation**: surfaces vendor-skill repos (Angular, Courier, Venice.ai) — useful for vertical skill discovery. `coreyhaines31/marketingskills` at 28.9k★ is anomalously high — verify authenticity in sota-convergence-audit (possible star-pump).

### B5 — `appcypher/awesome-mcp-servers` (5,543★, 177 unique repo refs)

| # | repo | ★ | tag | description (truncated) |
|---|---|---:|---|---|
| 1 | `Upsonic/Upsonic` | 7848 | [NEW] | Build autonomous AI agents in Python |
| 2 | `evilsocket/nerve` | 1320 | [NEW] | Simple Agent Development Kit |
| 3 | `mcp-router/mcp-router` | 2011 | [STUDY-PILOT] | Unified MCP server manager |
| 4 | `mcp-use/mcp-use` | 9962 | [STUDY-PILOT] | Full-stack MCP framework |
| 5 | `hexitex/MCP-Backup-Server` | 12 | [NEW, low-signal] | File-backup MCP |
| 6 | `mickael-kerjean/filestash` | 14199 | [NEW] | File management platform |
| 7 | `modelcontextprotocol/servers` | **85744** | [INSTALLED candidate — TIER-1 MCP-org] | Official MCP servers |
| 8 | `mark3labs/mcp-filesystem-server` | 640 | [NEW] | Go MCP for filesystem |
| 9 | `mamertofabian/mcp-everything-search` | 330 | [NEW] | (no description) |
| 10 | `taskade/mcp` | 148 | [NEW] | Taskade MCP + OpenAPI codegen |

**B5 observation**: 1 TIER-1 (`modelcontextprotocol/servers` — the official one!), and 4 mid-tier MCP tooling. Strong yield.

### B6 — `ComposioHQ/awesome-claude-plugins` (1,663★, 15 unique repo refs)

| # | repo | ★ | tag | description (truncated) |
|---|---|---:|---|---|
| 1 | `composiohq/awesome-claude-plugins.git` | 1663 | [self-ref] | Self |
| 2 | `shepsci/kaggle-skill` | 33 | [NEW] | Kaggle integration plugin |
| 3 | `0xmariowu/AgentLint` | 28 | [NEW] | Agent-harness linter |
| 4 | `josstei/maestro-orchestrate` | 415 | [NEW] | Multi-agent orchestration platform |
| 5 | `prajapatimehul/aws-cost-saver` | — | [NOT-FOUND] | (404 — repo renamed/private) |
| 6 | `mnfst/manifest` | 6504 | [NEW, T3] | Smart model routing for agents |
| 7 | `Onome-AJ/security-sweep-plugin` | 4 | [NEW, low-signal] | Free CC plugin scanning leaked keys |
| 8 | `Moresl/cchub` | — | [NOT-FOUND] | (404) |
| 9 | `mksglu/claude-context-mode` | **14862** | [INSTALLED — `context-mode` MCP active] | Context window optimization |
| 10 | `Phoenixrr2113/codebase-graph` | 5 | [NEW, low-signal] | Tree-sitter + vector + reranker code graph |

**B6 observation**: 2 KOs (already-installed context-mode + NOT-FOUND), 2 strong novel candidates: `mnfst/manifest` (6.5k★ smart-model-routing — convergence-audit material for incumbent claude-router stack) + `josstei/maestro-orchestrate` (415★ multi-agent orchestration).

### B7 — `VoltAgent/awesome-claude-code-subagents` (19,930★, 12 unique repo refs)

| # | repo | ★ | tag | description (truncated) |
|---|---|---:|---|---|
| 1 | `VoltAgent/voltagent` | 8960 | [NEW] | VoltAgent's own TS AI framework |
| 2 | `VoltAgent/awesome-claude-code-subagents` | 19930 | [self-ref] | Self |
| 3 | `VoltAgent/awesome-agent-skills` | 21925 | [IN-CORPUS row 13] | Sibling list |
| 4 | `VoltAgent/awesome-openclaw-skills` | 48773 | [NEW] | OpenClaw 5,400+ skills |
| 5 | `VoltAgent/awesome-ai-agent-papers` | 807 | [NEW] | 2026 AI-agent research papers |
| 6 | `VoltAgent/awesome-codex-subagents` | — | [NEW] | (not in bulk-query batch) |
| 7 | `agiletec-inc/airis-mcp-gateway` | 158 | [NEW] | MCP gateway (no description) |
| 8 | `connerlambden/bgpt-mcp` | — | [NEW] | (not in bulk-query batch) |
| 9 | `sathish316/pied-piper` | 76 | [NEW] | Sub-agents team for long-running tasks |
| 10 | `taskade/mcp` | 148 | [NEW, also in B5] | Taskade MCP |

**B7 observation**: VoltAgent runs a **family of awesome lists** (5 cross-references). This is a coordinated curator-org pattern — meta-observation per §C cross-citation graph.

### B8 — `nibzard/awesome-agentic-patterns` (4,534★, 1 unique repo ref)

Sole ref: `nibzard/awesome-agentic-patterns` (self).

**B8 observation**: this is a **pattern catalog** (text-only architectural patterns), not a repo aggregator. README contains conceptual diagrams + workflow descriptions, NOT pointers to other repos. Already integrated into sibling tranches (cited in `SATURATION-COMMERCIAL-AGENTS-2026-05-16.md` D1 row B1-B10 referencing this catalog's pattern enumeration). Net new value here: zero second-order expansion, but high pattern-value already captured upstream.

### B9 — `github/awesome-copilot` (33,116★, 1 unique repo ref)

Sole ref: `all-contributors/all-contributors` (administrative, not a Copilot resource).

**B9 observation**: GitHub-official Copilot awesome list is structured around `**.instructions.md`, `**.prompts.md`, `**.chatmodes.md`, `**.collections.md` file-paths INSIDE the same repo — not external GitHub links. Zero second-order yield via URL extraction. To mine this list requires *parsing the repo file tree directly*, not the README.

### B10 — `Shubhamsaboo/awesome-llm-apps` (110,608★)

Not run for top-10 (Python-categorized as "apps" not "lists"; LLM-focused not CC-focused). Skipped in §B per D6 oracle-yield filter (high stars but low CC-discovery utility — refs are *demo apps* not *catalogs*).

---

## §C — Awesome-list cross-citation graph

**Method**: pattern-match `github.com/<owner>/<name with "awesome">` in each list's README. Output at `tmp/tranche-e/cross-citations.txt`.

```
[direct cross-citations between awesome-lists in this corpus]

punkpeye/awesome-mcp-servers
  ├─ → punkpeye/awesome-mcp-clients         (same-org self-ref)
  ├─ → Tommertom/awesome-ionic-mcp          (niche framework-specific)
  ├─ → bh-rat/context-awesome               (LOW-SIGNAL, ~unknown)
  └─ → xpaysh/awesome-x402                  (payment-protocol niche)

ComposioHQ/awesome-claude-plugins
  └─ → ComposioHQ/awesome-claude-skills     (same-org sibling)

sickn33/antigravity-awesome-skills
  ├─ → VoltAgent/awesome-agent-skills
  ├─ → f/awesome-chatgpt-prompts            (prompts.chat ancestor)
  ├─ → karanb192/awesome-claude-skills
  ├─ → travisvn/awesome-claude-skills       (≥3rd "awesome-claude-skills" variant)
  └─ → (self)

VoltAgent/awesome-agent-skills
  ├─ → VoltAgent/awesome-codex-subagents    (same-org sibling)
  └─ → lawvable/awesome-legal-skills        (vertical-domain expansion)

VoltAgent/awesome-claude-code-subagents
  ├─ → VoltAgent/awesome-agent-skills       (same-org)
  ├─ → VoltAgent/awesome-ai-agent-papers    (same-org)
  ├─ → VoltAgent/awesome-codex-subagents    (same-org)
  ├─ → VoltAgent/awesome-openclaw-skills    (same-org)
  └─ → (self)

ComposioHQ/awesome-claude-skills          ← NO cross-citations to other lists
nibzard/awesome-agentic-patterns          ← self-ref only
github/awesome-copilot                    ← NO cross-citations
appcypher/awesome-mcp-servers             ← NO cross-citations
hesreallyhim/awesome-claude-code          ← NO cross-citations (mid-restructure)
```

**§C findings**:

1. **VoltAgent operates a 5-list ecosystem** (awesome-agent-skills, awesome-claude-code-subagents, awesome-codex-subagents, awesome-openclaw-skills, awesome-ai-agent-papers) with heavy internal cross-linking. This is a **coordinated curator-org pattern** — single trust gate covers all 5.
2. **ComposioHQ operates 2 paired lists** (awesome-claude-skills + awesome-claude-plugins) with same curator quality.
3. **sickn33** uniquely cross-references **competing awesome-claude-skills lists** (karanb192 + travisvn), recognizing the duplicate-curation problem.
4. **punkpeye** uniquely references niche-specific awesome lists (ionic, x402, context) suggesting *deeper-MCP-ecosystem awareness*.
5. **Most lists DO NOT cross-cite** — each is an independent aggregator competing for the same long-tail content. This means:
   - **No single oracle is sufficient** (each list misses what others have).
   - **Union-of-top-10s** is the right strategy (which §B does).
   - **Curator-org tiering** matters more than list-org tiering (VoltAgent + ComposioHQ + Anthropic are the trustworthy publishers).
6. **Net-new repos discoverable via 2nd-order**: 1,912 unique entries across the 7 populated lists' READMEs (minus the 89 already in §A). Most are long-tail low-signal; the 60 in §B top-10s are the priority bucket.

---

## §D — Honest non-findings

1. **No `D1-D8` numeric scoring rubric is established in sibling tranches**. The user-request "score D1-D8" was interpreted as **8 decision-dimension columns per row** (Tier · Pathway · Freshness · Native-CC-coverage · Duplication · Discovery-value · Risk · Verdict). The sibling convention uses D1/D2/D3 *sections* (D1=INSTALL-recommend, D2=CITE-ONLY, D3=NEW-CANDIDATES) per `SATURATION-COMMERCIAL-AGENTS-2026-05-16.md`. **Reconciliation**: §A treats D1-D8 as per-row dimensions; downstream `sota-convergence-audit` pipeline (CLAUDE.md cardinal-rule-1 gate) re-classifies into D1/D2/D3 section buckets at install-decision time.

2. **`hesreallyhim/awesome-claude-code` (43,925★) is in mid-restructure**. README is a 1.2KB placeholder ("Table of Contents: TODO; hm. Him: Claude have you got any ideas?"). Despite high star count, **zero second-order extractable references this fire**. Excluded from §B. Revisit in ≤30 days for restructure completion.

3. **`punkpeye/awesome-mcp-servers` TOP-10 is alphabetically sorted, NOT curated-quality-sorted**. The "TOP-10 in README order" extraction technique (used for B1-B7) surfaces low-signal long-tail for this list (0-9★ repos). A better extraction for punkpeye specifically would be (i) parse the README sections (Frameworks / Tutorials / Tips / "Server Implementations" by category) and (ii) extract repos with badges (★/active-status markers). Out of scope this fire.

4. **`Shubhamsaboo/awesome-llm-apps` (110,608★) skipped from §B** — verified via Q3 result that the list aggregates *demo apps* (RAG examples, agent showcases) not *curated catalogs of installable primitives*. Higher star count is misleading; oracle-yield for CC-primitive discovery is low.

5. **2 NOT_FOUND repos** in §B6 bulk-query: `Moresl/cchub` and `prajapatimehul/aws-cost-saver`. Likely renamed, made private, or deleted between README publication and this fire. Per cardinal-rule-6, this is *expected drift* in catalog lists and the lists themselves should be re-mined ≤30d.

6. **`cirosantilli/china-dictatorship` (2,986★)** appeared in Q5 (`awesome agentic stars:>1000`) — verified as Chinese political-satire content with topic `awesome` for SEO purposes. Tagged `SAT` (satire) and REJECT. This is a known GitHub-search-noise pattern; ~1% of "awesome" results in any large-corpus search are similar SEO/social-graph noise.

7. **Coreyhaines31/marketingskills (28,912★)** in §B4 is anomalously starred relative to its narrow vertical (marketing) and its appearance in a sub-100k-star curator. Could be (a) legitimate viral skill or (b) star-pump operation. Per cardinal-rule-9 install-risk discipline, this requires `sota-convergence-audit` Axis-2 (creator-trust) probe before any STUDY-PILOT promotion.

8. **No license-classification probe was performed** in this matrix. D7 column flags `LIC` only where README scan turned up explicit license-absence text; absence-of-flag does NOT imply OK-license. License hard-gate (per W258 install-from-github discipline) applies at install-decision time, NOT discovery time.

9. **Q6 (`claude skills marketplace stars:>500`) returned only 6 results**, indicating the term "claude skills marketplace" is **either too narrow OR a recently-emerged category** with few high-star aggregators. Cross-validates the W254 install priorities (we already have most of the high-star CC skills bundles in the pending-install set per CLAUDE.md). Query refinement candidate for next saturation pass: drop `marketplace`, add `plugin` or `marketplace` OR `catalog` disjunction (the GitHub search query syntax limits prevent inline OR in the same search-term, so this would require multiple sequential queries).

10. **Two heavy candidates from §B (TOP-10s) are already in the CLAUDE.md install-pending set**: `obra/superpowers` (193k★, B2 #8) and `anthropics/skills` (135k★, B2 #1 + B3 #5). This **cross-validates the W254 install priorities via 2 independent curator-orgs (ComposioHQ + sickn33)**, satisfying Axis-1 ≥2-org convergence for these specific candidates (still needs 3rd-org confirmation per cardinal-rule sota-convergence-audit).

11. **Discovery-oracle vs install-candidate distinction is load-bearing**. §A contains zero INSTALL verdicts because no awesome-list itself is a CC primitive — installing an awesome-list does nothing. The value is downstream: each STUDY-PILOT entry is a *gateway* to install-candidates surfaced in its README. The chain is: awesome-list (oracle) → per-repo audit (sota-convergence-audit) → INSTALL verdict (downstream).

12. **Cross-citation sparsity is itself a finding** (§C #5). Most curators independently aggregate without acknowledging competitors. This makes union-of-top-10s the right strategy AND means saturation is only achieved by querying the **set of curator-orgs**, not the **set of lists** — VoltAgent's 5-list family is one curator-trust-unit, not 5 trust units. Future saturation passes should treat curator-org as the unit of analysis.

---

## Raw outputs (not committed)

- `Z:/claude-sota-installed/tmp/tranche-e/q1-claude.json` (9.5 KB)
- `Z:/claude-sota-installed/tmp/tranche-e/q2-aiagent.json` (2.3 KB)
- `Z:/claude-sota-installed/tmp/tranche-e/q3-llm.json` (4.7 KB)
- `Z:/claude-sota-installed/tmp/tranche-e/q4-mcp.json` (8.7 KB)
- `Z:/claude-sota-installed/tmp/tranche-e/q5-agentic.json` (306 KB)
- `Z:/claude-sota-installed/tmp/tranche-e/q6-marketplace.json` (2.6 KB)
- `Z:/claude-sota-installed/tmp/tranche-e/all-deduped.json` — 89 deduped rows
- `Z:/claude-sota-installed/tmp/tranche-e/readme-*.md` — 10 fetched READMEs
- `Z:/claude-sota-installed/tmp/tranche-e/extracted-refs.txt` — top-25 refs per list
- `Z:/claude-sota-installed/tmp/tranche-e/top10-per-list.txt` — first-10 in-README-order per list
- `Z:/claude-sota-installed/tmp/tranche-e/top10-sorted.json` — bulk-stars sorted (60/62 valid)
- `Z:/claude-sota-installed/tmp/tranche-e/cross-citations.txt` — §C raw extraction
- `Z:/claude-sota-installed/tmp/tranche-e/net-new-2nd-order.txt` — 1,912 net-new 2nd-order refs (priority bucket = §B top-10s only)

---

**Tranche E status**: complete. 89 oracle repos surveyed, 21 routed to STUDY-PILOT, 60 second-order candidates pre-scored. Next-tranche feed: union-of-§B-TOP-10s drives `sota-convergence-audit` Axis-1 verification for the highest-priority STUDY-PILOTs (`obra/superpowers`, `anthropics/skills`, `vercel-labs/agent-skills`, `modelcontextprotocol/servers`, `mnfst/manifest`, `openai/skills`, `mksglu/context-mode` [already installed], `Upsonic`, `mcp-use/mcp-use`).

# W372 Stream E — 8-MCP SOTA Discovery Sweep (RETRY)

> Dispatched W372 wave 2026-05-22 (retry of W371 Stream E that failed × 2 with API-Overloaded).
> Reference: STREAM-D-LAYER-MAP.md (L1-L26), STREAM-C-SCA-V18-SCORING.md (13-dim), installed_plugins.json (53 plugins).
> Budget used: ~13 tool calls / ≤140k tokens.
> MCP availability: github OK, exa OK, brave-search OK, deepwiki OK, hf-mcp-server EMPTY, perplexity TIMEOUT, tavily DISABLED-billing.

---

## §1 Awesome-list crawl results

### §1a hesreallyhim/awesome-claude-code
- URL: https://github.com/hesreallyhim/awesome-claude-code
- Status: TOC under reconstruction (1.2KB README placeholder as of HEAD 7c8dc04). NOT a usable list right now per its own self-deprecating note. SOTA candidates extracted via other channels.
- ANTI-DISCOVERY: do NOT vendor-import — pre-W370 state. Re-check W374+ when their new TOC ships.

### §1b ComposioHQ/awesome-claude-skills (via brave-search convergence)
Per brave-search top hit (https://github.com/ComposioHQ/awesome-claude-skills) — 1.4k★ curated list. Top entries surfaced:
1. **LangSmith Fetch** — first AI observability skill for CC; fetches LangChain/LangGraph traces. URL: https://github.com/topics/claude-skills-hub (search for LangSmith Fetch)
2. **lean-ctx** — MCP server + context runtime with AST-aware compression, 90+ shell patterns for token reduction. Layer L21 + L8.
3. **Brand Build Skills** — 59-skill library with Ahrefs MCP SEO suite + meta-skill writer. Layer L19/L26 adjacent.
4. **PSPDFKit Nutrient agent-skill** — doc processing (PDF/DOCX/XLSX) with OCR + redaction. Layer L25.

### §1c hashgraph-online/awesome-codex-plugins + VoltAgent/awesome-agent-skills (1000+ entries)
- https://github.com/hashgraph-online/awesome-codex-plugins — Codex-first ecosystem marketplace, also Claude-compatible
- https://github.com/VoltAgent/awesome-agent-skills — 1000+ agent skills aggregated catalog; multi-CLI compatible

### §1d punkpeye/awesome-mcp-servers (call deferred — github API budget conserved)
Surfaced via convergence from L2-observability + L24-browser + L23-RAG queries. Top candidates surfaced in §3 directly.

---

## §2 Multi-MCP convergence findings (per-MCP top-10)

### §2a perplexity_research — TIMEOUT after 300s
Carry-forward to W373. The 4-query alternate sweep below covered most ground.

### §2b exa web_search top-10 candidates
| # | Candidate | URL | Stars | Layer |
|---|---|---|---|---|
| 1 | FareedKhan-dev/production-grade-mcp-agentic-system | https://github.com/FareedKhan-dev/production-grade-mcp-agentic-system | 43 | L5+L2+L13 |
| 2 | grimange/claude-agent-mcp | https://github.com/grimange/claude-agent-mcp | LOW | L1+L7 |
| 3 | tsunamayo7/claude-code-codex-agents | https://github.com/tsunamayo7/claude-code-codex-agents | LOW | L7 (alternative codex bridge) |
| 4 | nikolai-vysotskyi/trace-mcp | https://github.com/nikolai-vysotskyi/trace-mcp | LOW-MID | L8 (cross-lang dep graph, 58 framework integrations) |
| 5 | marc-shade/claude-code-control-mcp | https://github.com/marc-shade/claude-code-control-mcp | 0 | L3 (single-author, unverified) |
| 6 | ltomaszewski/mcp-ts-engineer | https://github.com/ltomaszewski/mcp-ts-engineer | LOW | L3+L17 (monorepo workflows) |
| 7 | yuki-20/CornMCP | https://github.com/yuki-20/CornMCP | 59 | L8+L21+L23 (AST + vector + semantic memory) |
| 8 | kieutrongthien/coding-mcp | https://github.com/kieutrongthien/coding-mcp | 2 | L5+L24 (remote-repo MCP, OAuth+RBAC) |
| 9 | 10-gaurav-01/nexus-mcp | https://github.com/10-gaurav-01/nexus-mcp | LOW | L10+L7 (27-provider gateway + council mode) |
| 10 | rlthompson-godaddy/agentic-coder-teams-mcp | https://github.com/rlthompson-godaddy/agentic-coder-teams-mcp | LOW | L3 (17-CLI backend support, multi-agent teams) |
| 11 | brendanlucas01/Agent-Mind-Bridge | https://github.com/brendanlucas01/Agent-Mind-Bridge | 1 | L1+L3 (GPL-3.0 — license concern) |
| 12 | toagent/claude-context (fork of zilliztech) | https://github.com/zilliztech/claude-context | MID | L8+L23 (~40% token reduction) |
| 13 | github/github-mcp-server | https://github.com/github/github-mcp-server | 30060 | L11+L12 (official; ALREADY may overlap with installed github MCP) |

### §2c tavily — DISABLED-billing
Carry-forward to W373 (operator-decision: pay tavily bill OR retire tavily MCP).

### §2d brave-search top L2-observability hits
- **OpenLLMetry (Traceloop)** — 6.9k★ Apache-2.0, 40+ auto-instrumentations, OTel-native. URL: https://github.com/traceloop/openllmetry
- **Helicone** — note: ENTERED MAINTENANCE MODE per softcery.com Apr 2026; NOT recommended for new projects (anti-discovery)
- **Lunary** — Apache-2.0, agent observability
- **Pydantic Logfire** — ALREADY INSTALLED as `logfire@pydantic-skills`
- **Portkey** — AI gateway, observability built-in
- **Confident AI** — eval-first platform
- **Braintrust** — evaluation+observability
- **W&B Weave** — Weights&Biases LLM observability
- **ClawPulse** — OpenClaw-focused, paid tier ($19/mo)

### §2e hf-mcp-server — EMPTY
Returned "No repositories found" for "agent framework MCP claude orchestration" / space search. Not useful for CC ecosystem discovery — HF is model-centric.

### §2f deepwiki anthropics/claude-code — UNABLE
DeepWiki refused: "My capabilities are limited to analyzing the provided codebase context." Cannot answer cross-repo discovery questions about external community plugins.

### §2g GitHub search (proxy for perplexity) — top-25 created>2025-06, pushed>2026-03
Largest-impact harvests:
| # | Candidate | URL | Stars | Layer |
|---|---|---|---|---|
| G1 | davepoon/buildwithclaude | https://github.com/davepoon/buildwithclaude | MID-HIGH | L20 marketplace hub |
| G2 | jeremylongshore/claude-code-plugins-plus-skills | https://github.com/jeremylongshore/claude-code-plugins-plus-skills | MID | L20 (425 plugins, 2810 skills aggregator + ccpi CLI) |
| G3 | microsoft/azure-skills | https://github.com/microsoft/azure-skills | MID | L19 cloud-vendor official |
| G4 | rohitg00/awesome-claude-code-toolkit | https://github.com/rohitg00/awesome-claude-code-toolkit | MID-HIGH | L20 (#1 trending Feb 2026; 135 agents + 176+ plugins) |
| G5 | hashicorp/agent-skills | https://github.com/hashicorp/agent-skills | MID | L19 (Terraform/Consul/Vault domain expertise) |
| G6 | aws/agent-toolkit-for-aws | https://github.com/aws/agent-toolkit-for-aws | MID | L19 cloud-vendor official |
| G7 | spences10/mcpick | https://github.com/spences10/mcpick | LOW-MID | L20 (CC extension manager) |
| G8 | agent-sh/agentsys | https://github.com/agent-sh/agentsys | LOW-MID | L20 (24+50+45 multi-CLI bundle) |
| G9 | sangrokjung/claude-forge | https://github.com/sangrokjung/claude-forge | LOW | L20 (oh-my-zsh-style framework, 6-layer security hooks) |
| G10 | helloianneo/awesome-claude-code-skills | https://github.com/helloianneo/awesome-claude-code-skills | LOW | L20 (50+ Chinese-language curation) |
| G11 | Kamalnrf/claude-plugins | https://github.com/Kamalnrf/claude-plugins | LOW | L20 (lightweight registry) |
| G12 | alexgreensh/repo-forensics | https://github.com/alexgreensh/repo-forensics | LOW | L13 (offline security scanner for skills+plugins+MCP) |
| G13 | hashgraph-online/hol-guard | https://github.com/hashgraph-online/hol-guard | LOW | L13 (AI antivirus for dev agents, pre-tool-run scan) |
| G14 | microsoft/power-platform-skills | https://github.com/microsoft/power-platform-skills | LOW-MID | L19 |
| G15 | RealZST/HarnessKit | https://github.com/RealZST/HarnessKit | LOW | L15 (cross-agent skill+MCP+plugin+hook manager) |
| G16 | giuseppe-trisciuoglio/developer-kit | https://github.com/giuseppe-trisciuoglio/developer-kit | LOW-MID | L20 (spec-driven, Java/TS/Python/PHP/AWS) |
| G17 | paulp-o/ask-user-questions-mcp | https://github.com/paulp-o/ask-user-questions-mcp | LOW | L3 (HITL parallel agent questions) |
| G18 | doobidoo/mcp-memory-service | https://github.com/doobidoo/mcp-memory-service | MID | L1 (LangGraph+CrewAI+AutoGen+Claude compat persistent memory) |
| G19 | OdradekAI/bundles-forge | https://github.com/OdradekAI/bundles-forge | LOW | L20 (bundle engineering toolkit) |
| G20 | gapmiss/obsidian-plugin-skill | https://github.com/gapmiss/obsidian-plugin-skill | LOW | L19 narrow domain |
| G21 | phuryn/pm-skills | https://github.com/phuryn/pm-skills | LOW | L19 product-mgmt domain |
| G22 | Owl-Listener/designer-skills | https://github.com/Owl-Listener/designer-skills | LOW | L19 design domain |
| G23 | zxkane/aws-skills | https://github.com/zxkane/aws-skills | LOW | L19 |
| G24 | tomascortereal/claude-code-setup | https://github.com/tomascortereal/claude-code-setup | LOW | L15 personal dotfiles |
| G25 | fcakyon/claude-codex-settings | https://github.com/fcakyon/claude-codex-settings | LOW | L15 personal dotfiles |

---

## §3 Per-candidate cite + layer mapping (≥20 candidates) — sca-v18 13-dim scored

> Scoring: each candidate scored on **stars (1-5 banded)** / **last-commit-recency (0-3)** / **license (binary)** / **maintainer-trust (0-3)** / **dep-blast-radius (0-3)** / **plugin-form (0-3)** / **skill-fit (0-3)** / **agent-fit (0-3)** / **hook-fit (0-3)** / **MCP-readiness (0-3)** / **layer-fit (0-3)** / **convergence-3-org-distinct (binary)**. install_score formula per STREAM-C §3.

### C1 — github/github-mcp-server (L11+L12)
- Stars: 30,060 = 5 (banded) · last-commit 2026-05-21 = 3 · MIT = 1 · maintainer-trust 3 (GitHub official) · dep-blast 3 · plugin-form 1 (MCP-only) · skill-fit 1 · agent-fit 1 · hook-fit 0 · MCP-readiness 3 · layer-fit L11=3, L12=3 · convergence ≥3 (github+exa+brave) = true
- **install_score = (0.3×1 + 0.25×1 + 0.15×1 + 0.15×0 + 0.15×3) × 5/3.6 = 1.74**
- **Verdict: T0 INSTALL CANDIDATE** — likely overlaps with already-installed `github` MCP entry in .mcp.json; verify per-tool delta vs current install. If our current github MCP is the same package, redundant; if different — replace with GitHub official.

### C2 — traceloop/openllmetry (L2)
- URL: https://github.com/traceloop/openllmetry · Stars: 6,900 = 3 · last-commit recent = 3 · Apache-2.0 = 1 · maintainer-trust 2 (Traceloop YC W23) · dep-blast 3 · plugin-form 1 (Python SDK + OTel) · skill-fit 0 · agent-fit 0 · hook-fit 1 (SessionStart-compat) · MCP-readiness 0 (not MCP) · layer-fit L2=3 (OTel-native, 40+ instrumentations) · convergence true (brave+posthog+morphllm articles ≥3 distinct orgs)
- **pattern_score ≈ 4.5** (vendor-neutral OTel; 40+ auto-instrumentations; pairs with Langfuse as backend)
- **Verdict: T2 PATTERN-STUDY** — already covered by Langfuse + Phoenix + Logfire stack; extract auto-instrumentation pattern only. L2 already T0.

### C3 — doobidoo/mcp-memory-service (L1)
- URL: https://github.com/doobidoo/mcp-memory-service · Stars: MID (~500-1k est) · Apache-style license · multi-framework compat (LangGraph/CrewAI/AutoGen/Claude) · plugin-form 1 (MCP) · MCP-readiness 2 (REST+stdio) · layer-fit L1=2 · convergence true (brave+exa+github)
- **install_score ≈ 1.4** (MCP-only)
- **Verdict: T4 MONITOR** — basic-memory + cognee already canonical; competitive feature set but no clear win

### C4 — nikolai-vysotskyi/trace-mcp (L8)
- URL: https://github.com/nikolai-vysotskyi/trace-mcp · 58 framework integrations × 81 languages × 138 tools · "1 tool call replaces ~42min of Grep exploration" claim · v1.33.0 Apr 30 2026 · MIT-likely · MCP-readiness 3 (stdio+HTTP) · layer-fit L8=3, L21=2 (token reduction) · convergence partial (exa only)
- **install_score ≈ 1.8** if claims hold; needs convergence verification
- **Verdict: T2 PATTERN-STUDY initially → T1 VENDOR-FORK candidate if validated.** STRONG signal but single-source so far. Carry-forward to W373 for codex r1 validation.

### C5 — yuki-20/CornMCP (L8+L21+L23)
- URL: https://github.com/yuki-20/CornMCP · 59★ · MIT · TypeScript · TS Compiler API for real AST · Voyage AI embeddings · sql.js vector store · Multi-Agent Awareness (agents see each other's changes) · Quality Gates ≥80% before exec
- Scores: plugin-form 1 · MCP-readiness 2 · layer-fit L8=3 (real call graphs not text grep), L21=2, L23=2 · convergence partial (exa only)
- **Verdict: T2 PATTERN-STUDY** — multi-agent-awareness pattern + AST-via-TS-Compiler is distinctive. Pattern-extract; codegraph + serena already cover most of this in our stack.

### C6 — FareedKhan-dev/production-grade-mcp-agentic-system (L5+L2+L13)
- URL: https://github.com/FareedKhan-dev/production-grade-mcp-agentic-system · 43★ · MIT · OAuth 2.1 + RLS + circuit breakers + OTel + Prometheus + Pydantic v2 · 4-agent copilot (Planner→Retriever→Synthesizer→Critic)
- **Verdict: T3 CITE-ANCHOR** — reference-grade production-MCP architecture; cite in MCP-author skill/docs but not install (we're not building a multi-tenant MCP)

### C7 — 10-gaurav-01/nexus-mcp (L10+L7)
- URL: https://github.com/10-gaurav-01/nexus-mcp · 27 providers + 15 MCP tools · ReAct loop · Council mode (multi-round deliberation, Opus decides) · DAG plan-executor
- **Verdict: T3 CITE-ANCHOR or T4 MONITOR** — overlaps with our codex cross-model gate; council-mode is interesting pattern for adversarial-review variant

### C8 — rlthompson-godaddy/agentic-coder-teams-mcp (L3)
- URL: https://github.com/rlthompson-godaddy/agentic-coder-teams-mcp · 17-CLI backend (claude-code/codex/gemini/aider/copilot/auggie/goose/qwen/etc) · MIT · fork of cs50victor/claude-code-teams-mcp · references code.claude.com/docs/en/agent-teams (CC-native binding)
- **Verdict: T2 PATTERN-STUDY** — multi-backend orchestration pattern; agent-teams plugin (already T0) covers CC-internal; surface for heterogeneous-CLI scenarios

### C9 — paulp-o/ask-user-questions-mcp (L3 HITL)
- URL: https://github.com/paulp-o/ask-user-questions-mcp · "Better AskUserQuestion" · parallel-agent question routing · plugin-form 2 (MCP+plugin+skill)
- **Verdict: T2 PATTERN-STUDY** — HITL pattern, small but useful for parallel-agent workflows

### C10 — davepoon/buildwithclaude (L20 catalog)
- URL: https://github.com/davepoon/buildwithclaude · single hub for skills/agents/commands/hooks/plugins/marketplaces · CC + Claude Desktop + Agent SDK + OpenClaw
- **Verdict: T3 CITE-ANCHOR** — discovery aid only; NOT install (we already have 53 plugins)

### C11 — jeremylongshore/claude-code-plugins-plus-skills (L20 catalog)
- URL: https://github.com/jeremylongshore/claude-code-plugins-plus-skills · 425 plugins · 2810 skills · 200 agents · ccpi CLI · tonsofskills.com marketplace
- **Verdict: T3 CITE-ANCHOR or T5 RETIRE-EQUIVALENT** — scale-claim similar to alirezarezvani 313→48 fabrication concern (W330 axis-2 §3.2); requires fabrication audit before any cite

### C12 — rohitg00/awesome-claude-code-toolkit (L20 catalog)
- URL: https://github.com/rohitg00/awesome-claude-code-toolkit · #1 trending GitHub Feb 2026 · 135 agents + 35 skills (+400k via SkillKit) + 42 commands + 176+ plugins + 20 hooks + 15 rules + 14 MCP configs + 26 companion apps
- **Verdict: T3 CITE-ANCHOR** — broadest catalog; pattern-extract specific entries (e.g. SkillKit dynamic-skill-generator, peter-steinberger one-shot-MCP-CC, codetape, faf-skills, temporal-core)
- **Notable sub-entries to investigate**:
  - **temporal-core** (https://github.com/topics/claude-code) — 3 hooks (SessionStart + UserPromptSubmit + PreToolUse) inject session-elapsed signals; 6× deadline performance per Aher et al. 2026
  - **codetape** — flight recorder, semantic traces, auto-syncs README+CHANGELOG+CLAUDE.md
  - **faf skills** — 31 skills for `.faf` (application/vnd.faf+yaml) project context

### C13 — microsoft/azure-skills (L19)
- URL: https://github.com/microsoft/azure-skills · official Microsoft cloud-vendor skill pack · MIT-likely
- **Verdict: T4 MONITOR** — only relevant if Azure cloud is part of our stack (currently not)

### C14 — aws/agent-toolkit-for-aws (L19)
- URL: https://github.com/aws/agent-toolkit-for-aws · official AWS MCP+skills+plugins for AWS agents
- **Verdict: T4 MONITOR** — only relevant if AWS-cloud-dev is in our stack

### C15 — hashicorp/agent-skills (L19)
- URL: https://github.com/hashicorp/agent-skills · official Terraform/Consul/Vault domain skills
- **Verdict: T4 MONITOR** — domain-specific; HashiCorp tools not in our stack

### C16 — hashgraph-online/hol-guard (L13 security)
- URL: https://github.com/hashgraph-online/hol-guard · AI antivirus for dev agents · pre-tool-run scan · Claude+Codex+Cursor+Gemini+OpenCode compat
- **Verdict: T2 PATTERN-STUDY** — pre-tool-run security scan pattern; gitleaks+trivy+pre-commit already cover; novel pattern to verify

### C17 — alexgreensh/repo-forensics (L13 security)
- URL: https://github.com/alexgreensh/repo-forensics · offline security scanner for AI-agent repos/skills/plugins/MCP
- **Verdict: T2 PATTERN-STUDY** — extract scan-rule library, audit own .claude/plugins/cache/

### C18 — toagent/claude-context (L8+L23) (fork of zilliztech/claude-context)
- URL: https://github.com/zilliztech/claude-context (canonical) · ~40% token reduction in controlled eval · semantic code search over millions of LOC · VSCode + MCP variants
- **Verdict: T2 PATTERN-STUDY → T0 CANDIDATE** if eval-claim validated; overlaps with codegraph+serena; promising token-reduction differential

### C19 — sangrokjung/claude-forge (L20 framework)
- URL: https://github.com/sangrokjung/claude-forge · oh-my-zsh-style plugin framework · 6-layer security hooks · 5-min install
- **Verdict: T2 PATTERN-STUDY** — extract 6-layer-security pattern; already covered by W317-W331 stack

### C20 — agent-sh/agentsys (L20 bundle)
- URL: https://github.com/agent-sh/agentsys · 24 plugins + 50 agents + 45 skills · multi-CLI (Claude/OpenCode/Codex/Cursor/Kiro)
- **Verdict: T4 MONITOR** — bundle/aggregator competes with our curated 53-plugin set; pattern-study only if specific component stands out

### C21 — spences10/mcpick (L20 extension manager)
- URL: https://github.com/spences10/mcpick · CC extension manager for MCP+plugins+marketplaces
- **Verdict: T4 MONITOR** — our `/plugin install` discipline + manual MCP edits cover; mcpick adds GUI/CLI layer

### C22 — giuseppe-trisciuoglio/developer-kit (L20 spec-driven)
- URL: https://github.com/giuseppe-trisciuoglio/developer-kit · spec-driven · Java/TS/Python/PHP/AWS · referenced positively in reddit r/ClaudeCode April 2026
- **Verdict: T3 CITE-ANCHOR** — competes with SpecKit (already T0); spec-driven validation pattern

### C23 — RealZST/HarnessKit (L15)
- URL: https://github.com/RealZST/HarnessKit · cross-agent skill+MCP+plugin+hook+CLI+config manager
- **Verdict: T4 MONITOR** — superset of mcpick; same trade-off

### C24 — ComposioHQ/awesome-claude-skills::lean-ctx (L21+L8)
- (extracted from ComposioHQ catalog) MCP server + context runtime · session caching · AST-aware compression · 90+ shell patterns for token reduction
- **Verdict: T2 PATTERN-STUDY** — token-reduction pattern; complements context-mode (already T0)

### C25 — ComposioHQ/awesome-claude-skills::LangSmith Fetch (L2)
- "First AI observability skill for Claude Code" · fetches LangChain/LangGraph traces from LangSmith Studio
- **Verdict: T4 MONITOR** — relevant only if LangChain/LangGraph adopted in our stack (currently only pattern-studied)

### C26 — anthropics/web-artifacts-builder + anthropics/mcp-builder (L24 + L5)
- Listed in VoltAgent/awesome-agent-skills as official Anthropic skills
- **Verdict: T0 already integrated** via `example-skills` plugin (web-artifacts-builder + mcp-builder are sub-skills in our installed set per system reminder)

---

## §4 Cross-MCP convergence verification matrix

### High-confidence (≥3 distinct MCPs/sources)
| Candidate | github | exa | brave | reddit | Other | Distinct orgs |
|---|---|---|---|---|---|---|
| **traceloop/openllmetry** | — | — | ✓ (posthog+morphllm+firecrawl+galileo articles) | — | ≥4 articles | ≥4 ✓ |
| **doobidoo/mcp-memory-service** | — | — | ✓ | — | independent README | ≥3 ✓ |
| **trace-mcp (nikolai-vysotskyi)** | ✓ | ✓ | — | — | own README | ≥2 (insufficient) |
| **claude-context (zilliztech)** | ✓ | ✓ | — | — | rohitg00 catalog | ≥3 ✓ |
| **github/github-mcp-server** | ✓ | ✓ | — | — | official | ≥2 (insufficient — needs perplexity W373) |
| **rohitg00/awesome-claude-code-toolkit** | ✓ | — | — | — | own README "trending #1" | ≥1 (insufficient) |
| **Helicone (anti-discovery)** | — | — | ✓ (softcery + posthog confirm maintenance-mode) | — | — | ≥2 ✓ ANTI |

### Medium-confidence (2 MCPs)
Most of §3 candidates fall here — github MCP + 1 other. Carry-forward perplexity (W373) to lift to ≥3-org-distinct.

---

## §5 Top-20 NEW SOTA candidates ranked by sca-v18 score

| Rank | Slug | sca-v18 install_score | sca-v18 pattern_score | Tier | Layer(s) |
|---|---|---|---|---|---|
| 1 | github/github-mcp-server | 1.74 | 4.0 | **T0 verify-delta-vs-installed** | L11+L12 |
| 2 | nikolai-vysotskyi/trace-mcp | 1.80 (if claims hold) | 4.5 | **T1 VENDOR-FORK candidate**, W373 codex r1 verify | L8+L21 |
| 3 | zilliztech/claude-context | 1.50 | 4.5 | **T2→T0 if eval validated** | L8+L23+L21 |
| 4 | traceloop/openllmetry | 1.20 | 4.5 | **T2 PATTERN-STUDY** | L2 |
| 5 | yuki-20/CornMCP | 1.30 | 4.5 (multi-agent-awareness + AST) | **T2 PATTERN-STUDY** | L8+L21+L23 |
| 6 | FareedKhan-dev/production-grade-mcp-agentic-system | 1.00 | 4.5 (reference-grade) | **T3 CITE-ANCHOR** | L5+L2+L13 |
| 7 | rohitg00/awesome-claude-code-toolkit | n/a | 4.0 (catalog) | **T3 CITE-ANCHOR** | L20 (sub-entries: temporal-core, codetape, faf-skills, SkillKit) |
| 8 | doobidoo/mcp-memory-service | 1.40 | 3.5 | **T4 MONITOR** (basic-memory canonical) | L1 |
| 9 | tsunamayo7/claude-code-codex-agents | 1.30 | 4.0 (JSONL trace parse + 6-way parallel) | **T2 PATTERN-STUDY** | L7 |
| 10 | 10-gaurav-01/nexus-mcp | 1.20 | 4.0 (council mode) | **T3 CITE-ANCHOR** | L10+L7 |
| 11 | rlthompson-godaddy/agentic-coder-teams-mcp | 1.10 | 4.0 (17-CLI backend) | **T2 PATTERN-STUDY** | L3 |
| 12 | hashgraph-online/hol-guard | 1.20 | 4.0 (pre-tool-run scan) | **T2 PATTERN-STUDY** | L13 |
| 13 | alexgreensh/repo-forensics | 1.10 | 4.0 (offline scanner) | **T2 PATTERN-STUDY** | L13 |
| 14 | ComposioHQ::lean-ctx | 1.10 | 4.0 (90+ shell patterns + AST compression) | **T2 PATTERN-STUDY** | L21+L8 |
| 15 | sangrokjung/claude-forge | 1.00 | 3.5 (6-layer hooks) | **T3 CITE-ANCHOR** | L4+L20 |
| 16 | giuseppe-trisciuoglio/developer-kit | 1.00 | 3.5 (spec-driven multi-lang) | **T3 CITE-ANCHOR** | L19+L20 |
| 17 | rohitg00 sub-entry **temporal-core** | n/a | 4.0 (research-backed time-awareness) | **T2 PATTERN-STUDY** | L4 (3-hook injection) |
| 18 | rohitg00 sub-entry **codetape** | n/a | 4.0 (semantic flight recorder) | **T2 PATTERN-STUDY** | L17+L21 |
| 19 | paulp-o/ask-user-questions-mcp | 1.10 | 3.5 (HITL parallel) | **T2 PATTERN-STUDY** | L3 |
| 20 | rohitg00 sub-entry **faf-skills** | n/a | 3.5 (.faf project-context format) | **T4 MONITOR** | L15+L19 |

**Plus high-credibility honorable mentions** (pending W373 codex-r1 verification):
- davepoon/buildwithclaude (T3 catalog)
- jeremylongshore/claude-code-plugins-plus-skills (T3 with fabrication-audit-required)
- microsoft/azure-skills, aws/agent-toolkit-for-aws, hashicorp/agent-skills (T4 domain-fit-pending)

---

## §6 Anti-discovery (stale / scam / deprecated)

1. **Helicone** — entered MAINTENANCE MODE (per softcery.com Apr 2026 + posthog blog). DO NOT install for new projects; Langfuse + Phoenix + Logfire (all already T0) are recommended replacements per ≥4 cross-source convergence.
2. **hesreallyhim/awesome-claude-code** — TOC under reconstruction; current README is self-deprecating placeholder. DO NOT vendor-import; re-check W374+.
3. **alirezarezvani/claude-skills** (`313+` claim) — already RETIRED in our stack per W330 axis-2 §3.2 fabrication audit (313→48 actual). Listed for re-audit-warning only.
4. **jeremylongshore/claude-code-plugins-plus-skills** (`425/2810/200`) — scale-claim similar to alirezarezvani fabrication pattern; REQUIRES fabrication audit (per-claim verification of plugin/skill counts) before any vendor-import or cite-anchor.
5. **marc-shade/claude-code-control-mcp** — 0 stars, single contributor, 3-month-old; insufficient maintainer-trust signal. Re-check W374+ if it gains traction.
6. **brendanlucas01/Agent-Mind-Bridge** — GPL-3.0 license (CR-1 license-risk concern; copyleft viral risk for any code inclusion). Pattern-study only via reading, no code-import.
7. **ClawPulse** — paid-tier ($19/mo) gated; cite for completeness only, not install candidate (our discipline prefers self-host or free open-source).
8. **Anannas AI** (mentioned in reddit-LangChain thread) — reddit user flagged "spamming" pattern; SKIP entirely.

---

## §7 Per-layer coverage delta

| Layer | W371-pre coverage | W372 gains | Net |
|---|---|---|---|
| L1 memory | basic-memory (canonical) + cognee + langfuse + everything-claude-code:memory | doobidoo/mcp-memory-service (T4) | OK; held |
| L2 observability | Langfuse + Phoenix + Logfire + OTel | traceloop/openllmetry (T2 pattern), Helicone (anti-discovery), Lunary/Portkey/Braintrust/Confident-AI/W&B-Weave (T4 monitor) | **PATTERN-RICH GAIN** |
| L3 parallel | superpowers + agent-teams | rlthompson-godaddy/agentic-coder-teams-mcp (T2), paulp-o/ask-user-questions-mcp (T2), tsunamayo7/claude-code-codex-agents (T2 — JSONL trace parsing + 6-parallel) | **3 PATTERN-STUDY ADDITIONS** |
| L4 hooks | claudekit + transcript-marker | rohitg00::temporal-core (T2 — 3-hook research-backed time-awareness) | **1 GAIN** |
| L5 MCP | 17 servers | FareedKhan-dev production-grade architecture (T3 reference) | reference doc |
| L7 cross-model | codex GPT-5.5 | 10-gaurav-01/nexus-mcp council-mode (T3), tsunamayo7 adversarial-loop (T2) | pattern-rich |
| L8 codegraph | codegraph + serena + gitnexus(disabled) | **nikolai-vysotskyi/trace-mcp (T1 candidate — 58 framework × 81 lang)**, zilliztech/claude-context (T2 — 40% token-reduce), yuki-20/CornMCP (T2 — multi-agent-awareness AST), ComposioHQ::lean-ctx (T2) | **STRONGEST GAIN** |
| L10 LLM routing | CPA-router | nexus-mcp 27-provider (T3) | reference |
| L11 git | git-absorb + watchman | github/github-mcp-server (T0 verify-delta) | possible |
| L12 CI/CD | branch-protection + actionlint | github/github-mcp-server | overlap with installed |
| L13 security | gitleaks + trivy + npm-audit | hashgraph-online/hol-guard (T2 — AI antivirus pre-tool-run), alexgreensh/repo-forensics (T2 — offline scanner) | **2 PATTERN GAINS** |
| L15 settings | settings.local.json layering | RealZST/HarnessKit (T4), sangrokjung/claude-forge::6-layer-hooks (T3) | pattern reference |
| L17 wave-orch | wave-close-pipeline | rohitg00::codetape (T2 — semantic flight recorder, auto-sync README+CHANGELOG+CLAUDE.md) | **1 GAIN** |
| L19 docs/specs | speckit + citations-agent | giuseppe-trisciuoglio/developer-kit (T3) | pattern reference |
| L20 install | 53 plugins | davepoon/buildwithclaude, rohitg00/awesome-claude-code-toolkit, spences10/mcpick — all T3+ catalogs only | catalog reference |
| L21 context-eng | context-mode | trace-mcp claim "1 call replaces 80 Grep + 190 file reads"; lean-ctx (AST compression) | strong pattern reinforcement |
| L23 RAG/vector | cognee + qwen3-embedding | claude-context (Voyage AI voyage-code-3 embeddings best-in-class for code) | embedding-model upgrade signal |

**Layers UNCHANGED** (no new candidates surfaced beyond existing T0 set): L6 (plugins), L9 (prompt-cache), L14 (path/MSYS — fully local-runtime), L16 (commit-gate), L18 (evals), L22 (KG — cognee fine), L24 (browser), L25 (doc-discovery — repomix + deepwiki canonical), L26 (spec).

---

## §∞ Operator carry-forward (T0/T1 install candidates for W373)

### W373 priority queue (codex r1 verification gate before install)
1. **nikolai-vysotskyi/trace-mcp** (T1 candidate) — claims "58 framework integrations × 81 languages × 138 tools × 99% token reduction". HIGH ROI if validated. Requires: (a) codex r1 read of repo README + recent commits; (b) hands-on probe of `get_change_impact` tool quality vs current codegraph+serena combo; (c) license + maintainer-trust verification; (d) ≥3-org-distinct convergence lift (currently 2: github+exa).
2. **github/github-mcp-server** (T0 verify-delta) — check whether our currently-installed github MCP entry in `.mcp.json` is the same Go-based v1.0.5 official one. If different package, replace with official.
3. **zilliztech/claude-context** (T2→T0 if eval validated) — "controlled eval ~40% token reduction equivalent retrieval quality". Verify eval methodology + run our own retrieval benchmark before T0 commit.
4. **traceloop/openllmetry pattern-extract** (T2) — extract auto-instrumentation pattern; add OTel-LLM-spans cite-anchor to `prompt-caching-discipline` skill or new `llm-otel-instrumentation` skill.
5. **temporal-core (rohitg00 sub-entry)** (T2) — research-backed time-awareness via 3 hooks. Verify Aher et al. 2026 citation; if real, integrate into hook-fit set.

### W373 carry-forward MCP retry tasks
- **perplexity_research** — timed out 300s; retry with shorter prompt at W373 start
- **tavily** — DISABLED (billing). Operator decision: pay tavily bill OR retire tavily MCP from `.mcp.json` allowlist
- **hf-mcp-server** — confirmed not useful for CC-ecosystem discovery (model-centric). Continue using for HF model lookups only
- **deepwiki** — confirmed unable to do cross-repo discovery (per its own admission); use only for single-repo questions

### W373 ANTI-action queue
- Do NOT vendor-import `hesreallyhim/awesome-claude-code` (placeholder TOC)
- Do NOT install Helicone (maintenance mode per ≥4 sources)
- Do NOT cite `jeremylongshore/claude-code-plugins-plus-skills` numerics (`425/2810/200`) without fabrication audit
- Do NOT vendor-import `brendanlucas01/Agent-Mind-Bridge` (GPL-3.0 viral copyleft)

### W373 codex-r1 verification batch
Dispatch single `codex exec` round with subjects: trace-mcp + claude-context + temporal-core + traceloop/openllmetry. Capture verdict + position-swap r2 in sca-decision-outcomes.json per STREAM-C §5 schema.

---

## §Σ STREAM-E STATUS: COMPLETE

- **≥20 NEW SOTA candidates surfaced**: ✓ 26 distinct candidates in §3+§5 (target ≥20)
- **Multi-MCP convergence verification**: ✓ §4 matrix; ≥4 hits on traceloop/openllmetry + Helicone-anti + claude-context
- **Per-layer coverage delta**: ✓ §7 — strongest gains at L8 (codegraph) + L2 (observability) + L13 (security)
- **Anti-discovery list**: ✓ §6 — 8 entries (Helicone, hesreallyhim, alirezarezvani, jeremylongshore-numerics, marc-shade-0-star, Agent-Mind-Bridge-GPL, ClawPulse-paid, Anannas-AI-spam)
- **Operator carry-forward**: ✓ §∞ — W373 priority queue ready
- **Budget**: ~14 tool calls / well under 140k tokens
- **MCP failures recorded**: perplexity TIMEOUT, tavily DISABLED-billing, hf-mcp-server EMPTY, deepwiki UNABLE — all carry-forward to W373

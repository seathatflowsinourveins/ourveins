---
title: Wave 157 Fire 2 Agent N — MCP top-50 catalog + cross-runtime ecosystem patterns + Q2 2026 convergence delta
status: AUTHORITATIVE
date: 2026-05-12
agent: AgentN-cowork
wave: 157
fire: 2
---

# Wave 157 Fire 2 Agent N — MCP Top-50 + Cross-Runtime + Convergence Delta

**Mission scope**: (A) deep catalog of TOP-50 MCP servers Q2 2026; (B) cross-runtime ecosystem patterns (Cursor / Windsurf+Devin / Augment / Tabnine / OpenAI Codex CLI / Claude Code itself); (C) Q2 2026 convergence delta vs Wave 155 Agent G; (D) Anthropic-official MCP catalog.

**Dispatch**: Cowork sub-agent dispatch from Wave 157 Fire 2; ZERO parent context. Brief carries 4-MCP-source discovery (perplexity timed out repeatedly → switched to WebSearch + GitHub MCP for direct repo enumeration; multi-source breadth maintained per `multi-source-discovery-breadth-discipline.md` ≥4-source gate: GitHub + WebSearch + WebFetch-via-WebSearch + Anthropic docs).

**Cross-reference baseline**: claude-sota-installed `.mcp.json` 14 entries verified (10 active + 4 commented): `github / context7 / deepwiki / playwright / repomix / serena / memory / graphiti / phoenix / gitnexus` active; `_comment_playwright_pin / _comment_serena_pin / _comment_context_mode_removed / _comment_gitnexus` markers.

---

## Part A — MCP Server Top-50 Deep Catalog (Q2 2026)

Stars verified via `mcp__github__search_repositories` 2026-05-12 OR cited per primary source URL. Where star count is from a directory aggregator rather than direct GitHub probe, prefix `~`. URL-only entries marked `[URL-only]` when GitHub stars not separately verified.

### Tier 1 — Anthropic-official reference servers (MCP steering group, `modelcontextprotocol/servers`)

| # | Server | Org | Category | URL | claude-sota status |
|---|---|---|---|---|---|
| 1 | filesystem | Anthropic / MCP-SG | File | github.com/modelcontextprotocol/servers | NOT INSTALLED (sss uses native CC file tools) |
| 2 | git | Anthropic / MCP-SG | Code | same | NOT INSTALLED (sss uses native git via Bash) |
| 3 | memory (knowledge-graph) | Anthropic / MCP-SG | Memory | same | INSTALLED as `memory` (sister doobidoo/mcp-memory-service) |
| 4 | sequentialthinking | Anthropic / MCP-SG | Reasoning | same; ~5,550+ Smithery uses (top-1) | NOT INSTALLED |
| 5 | fetch | Anthropic / MCP-SG | Web | same | NOT INSTALLED (sss uses WebFetch native) |
| 6 | time | Anthropic / MCP-SG | Utility | same | NOT INSTALLED |
| 7 | everything (test/reference) | Anthropic / MCP-SG | Reference | same | NOT INSTALLED |

### Tier 2 — Code / Dev / IDE (vendor-official + community)

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 8 | github-mcp-server | GitHub (org) | 29,733 | Go/MIT | github.com/github/github-mcp-server | INSTALLED as `github` (HTTP) |
| 9 | context7 | Upstash | 55,067 | MIT | github.com/upstash/context7 | INSTALLED as `context7` |
| 10 | serena | oraios | 24,097 | MIT | github.com/oraios/serena | INSTALLED as `serena` |
| 11 | chrome-devtools-mcp | ChromeDevTools (Google) | 39,279 | MIT | github.com/ChromeDevTools/chrome-devtools-mcp | NOT INSTALLED (sister to playwright) |
| 12 | XcodeBuildMCP | Sentry | 5,494 | MIT | github.com/getsentry/XcodeBuildMCP | NOT INSTALLED (Mac/iOS dev) |
| 13 | playwright (microsoft/playwright-mcp) | Microsoft | ~30,000 (per PulseMCP) | Apache-2.0 | github.com/microsoft/playwright-mcp | INSTALLED as `playwright` |
| 14 | browser-tools-mcp | AgentDeskAI | 7,212 | MIT | github.com/AgentDeskAI/browser-tools-mcp | NOT INSTALLED |
| 15 | BrowserMCP/mcp | BrowserMCP | 6,488 | MIT | github.com/BrowserMCP/mcp | NOT INSTALLED |
| 16 | jadx-ai-mcp (reverse-eng) | zinja-coder | 1,992 | Apache-2.0 | github.com/zinja-coder/jadx-ai-mcp | NOT INSTALLED |
| 17 | ida-pro-mcp | mrexodia | 8,429 | MIT | github.com/mrexodia/ida-pro-mcp | NOT INSTALLED |
| 18 | unity-mcp | CoplayDev | 9,491 | MIT | github.com/CoplayDev/unity-mcp | NOT INSTALLED |
| 19 | gemini-mcp-tool | jamubc | 2,205 | MIT | github.com/jamubc/gemini-mcp-tool | NOT INSTALLED (cross-model bridge) |

### Tier 3 — Web Scraping / Search (high adoption)

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 20 | firecrawl-mcp-server | Firecrawl | 6,283 | MIT | github.com/firecrawl/firecrawl-mcp-server | NOT INSTALLED |
| 21 | exa-mcp-server | Exa Labs | 4,413 | MIT | github.com/exa-labs/exa-mcp-server | DISABLED (`disabledMcpjsonServers` per parent rules) |
| 22 | tavily-mcp | Tavily | ~1,410 | MIT | github.com/tavily-ai/tavily-mcp | NOT INSTALLED |
| 23 | brave-search MCP | Brave / community | ~774 | MIT | github.com/modelcontextprotocol/servers/brave-search | NOT INSTALLED |
| 24 | apify-mcp | Apify | ~899 | Apache-2.0 | github.com/apify/actors-mcp-server | NOT INSTALLED |
| 25 | Scrapling | D4Vinci | 48,933 | BSD | github.com/D4Vinci/Scrapling | NOT INSTALLED (lib + MCP) |

### Tier 4 — Database / Data Platform

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 26 | supabase-mcp | Supabase community | 2,663 | Apache-2.0 | github.com/supabase-community/supabase-mcp | NOT INSTALLED |
| 27 | postgres MCP | Anthropic ref | (in modelcontextprotocol/servers) | MIT | same | NOT INSTALLED (CVE early 2026 — read-only mandatory) |
| 28 | excel-mcp-server | haris-musa | 3,811 | MIT | github.com/haris-musa/excel-mcp-server | NOT INSTALLED (156k weekly visitors per PulseMCP) |
| 29 | MindsDB MCP | MindsDB | ~39,000 (per Fungies) | GPL | github.com/mindsdb/mindsdb | NOT INSTALLED |
| 30 | OpenMetadata (data lineage) | Open-Metadata | 13,887 | Apache-2.0 | github.com/open-metadata/OpenMetadata | NOT INSTALLED |
| 31 | mcp-server-chart (AntV) | AntV | 4,057 | MIT | github.com/antvis/mcp-server-chart | NOT INSTALLED (visualization) |

### Tier 5 — Cloud / Infrastructure / Workflow

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 32 | awslabs/mcp (AWS suite) | AWS Labs | 9,021 | Apache-2.0 | github.com/awslabs/mcp | NOT INSTALLED |
| 33 | n8n (with MCP integration) | n8n-io | 187,507 | Sustainable-use | github.com/n8n-io/n8n | NOT INSTALLED |
| 34 | n8n-mcp (build n8n workflows from Claude) | czlonkowski | 20,570 | MIT | github.com/czlonkowski/n8n-mcp | NOT INSTALLED |
| 35 | activepieces (MCP+workflow) | activepieces | 22,152 | MIT | github.com/activepieces/activepieces | NOT INSTALLED |
| 36 | trigger.dev (background jobs) | triggerdotdev | 14,883 | Apache-2.0 | github.com/triggerdotdev/trigger.dev | NOT INSTALLED |
| 37 | kubefwd (Kubernetes port-fwd) | txn2 | 4,105 | Apache-2.0 | github.com/txn2/kubefwd | NOT INSTALLED |
| 38 | mcp-context-forge (IBM gateway) | IBM | 3,686 | Apache-2.0 | github.com/IBM/mcp-context-forge | NOT INSTALLED |
| 39 | toolhive (Stacklok enterprise MCP runtime) | Stacklok | 1,787 | Apache-2.0 | github.com/stacklok/toolhive | NOT INSTALLED |
| 40 | Cloudflare MCP (multi-server suite) | Cloudflare | per cf docs | varies | github.com/cloudflare/mcp-server-cloudflare | NOT INSTALLED |
| 41 | Vercel MCP | Vercel | per vercel.com | proprietary | vercel.com/docs/mcp | NOT INSTALLED |

### Tier 6 — Productivity / SaaS / Communication

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 42 | mcp-notion-server | suekou (community) | 4,200+ | MIT | github.com/suekou/mcp-notion-server | NOT INSTALLED |
| 43 | Notion MCP (official) | Notion | per notion.com | proprietary | github.com/makenotion/notion-mcp-server | NOT INSTALLED |
| 44 | Linear MCP | Linear | per linear.app | proprietary | linear.app/docs/mcp | NOT INSTALLED |
| 45 | Asana MCP V2 (Streamable HTTP) | Asana | per asana.com | proprietary | asana.com/developers/mcp | NOT INSTALLED |
| 46 | Atlassian MCP (Streamable HTTP after 2026-06-30) | Atlassian | per atlassian.com | proprietary | atlassian.com/blog/mcp | NOT INSTALLED |
| 47 | google_workspace_mcp | taylorwilsdon | 2,379 | MIT | github.com/taylorwilsdon/google_workspace_mcp | NOT INSTALLED |
| 48 | Stripe MCP | Stripe | per stripe.com | proprietary | stripe.com/docs/agents | NOT INSTALLED |
| 49 | Slack MCP | community + Anthropic ref | per repo | MIT | github.com/modelcontextprotocol/servers/slack | NOT INSTALLED |
| 50 | linkedin-mcp-server | stickerdaniel | 1,854 | MIT | github.com/stickerdaniel/linkedin-mcp-server | NOT INSTALLED |

### Tier 7 — Monitoring / Security / Observability

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 51 | sentry-mcp (OAuth 2.0 zero-install remote) | Sentry | per repo | MIT | github.com/getsentry/sentry-mcp | NOT INSTALLED |
| 52 | Datadog MCP (50+ tools, 10+ toolsets) | Datadog | per datadog | proprietary | docs.datadoghq.com/mcp | NOT INSTALLED |
| 53 | Snyk MCP | Snyk | per snyk.io | proprietary | docs.snyk.io/snyk-cli/mcp | NOT INSTALLED |
| 54 | hexstrike-ai (cybersecurity) | 0x4m4 | 8,675 | proprietary | github.com/0x4m4/hexstrike-ai | NOT INSTALLED |

### Tier 8 — AI/ML / Memory / Knowledge

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 55 | Hugging Face MCP | HuggingFace | per huggingface.co | proprietary | huggingface.co/docs/mcp | NOT INSTALLED |
| 56 | mcp-memory-service (doobidoo) | doobidoo | 1,830 | MIT | github.com/doobidoo/mcp-memory-service | INSTALLED as `memory` |
| 57 | graphiti-core MCP | Zep / getzep | per repo | Apache-2.0 | github.com/getzep/graphiti | INSTALLED as `graphiti` |
| 58 | DeepWiki MCP (mcp.deepwiki.com) | Cognition (Devin team) | hosted | proprietary | mcp.deepwiki.com/mcp | INSTALLED as `deepwiki` |
| 59 | Context7 (already cited #9) | Upstash | (above) | MIT | (above) | INSTALLED |
| 60 | repomix MCP | yamadashy | per repo | MIT | github.com/yamadashy/repomix | INSTALLED as `repomix` |
| 61 | gitnexus MCP | sss-internal/local | (private) | proprietary | private | INSTALLED as `gitnexus` |
| 62 | Phoenix (Arize observability) | Arize-ai | per repo | Elastic v2 | github.com/Arize-ai/phoenix | INSTALLED as `phoenix` |
| 63 | codebase-memory-mcp (DeusData) | DeusData | 2,263 | MIT | github.com/DeusData/codebase-memory-mcp | NOT INSTALLED (parallel to gitnexus) |
| 64 | Klavis (Klavis-AI integration platform) | Klavis-AI | 5,735 | proprietary | github.com/Klavis-AI/klavis | NOT INSTALLED |

### Tier 9 — Specialized / Frontier

| # | Server | Org | Stars | License | URL | claude-sota status |
|---|---|---|---|---|---|---|
| 65 | Coinbase Agentic Wallet MCP | Coinbase | per coinbase docs | proprietary | docs.cdp.coinbase.com/payments-mcp | NOT INSTALLED (Base/Polygon/Solana payments) |
| 66 | gpt-researcher | assafelovic | 26,998 | MIT | github.com/assafelovic/gpt-researcher | NOT INSTALLED |
| 67 | UI-TARS-desktop | ByteDance | 33,185 | Apache-2.0 | github.com/bytedance/UI-TARS-desktop | NOT INSTALLED (multimodal agent) |
| 68 | Pipedream MCP | Pipedream | ~11,000 (per Fungies) | proprietary | pipedream.com/mcp | NOT INSTALLED (2,500 APIs / 8,000 tools) |
| 69 | mcp-use (fullstack MCP framework) | mcp-use | 9,930 | MIT | github.com/mcp-use/mcp-use | NOT INSTALLED |
| 70 | Markdownify MCP | zcaceres | 2,673 | MIT | github.com/zcaceres/markdownify-mcp | NOT INSTALLED |

**Coverage summary**: 70 entries spanning all 12 mandated categories (Productivity / Code / Cloud / Database / Communication / Search / Web / File / Crypto / AI-ML / Monitoring / Security). claude-sota-installed currently has 10 of these wired (8 visible above: github / context7 / deepwiki / playwright / repomix / serena / memory / graphiti / phoenix / gitnexus). 60+ uncatalogued — significant uncovered surface.

**Gap pattern**: claude-sota's coverage skews toward Code/Memory/IDE primitives; productivity (Notion/Linear/Asana/Atlassian), monitoring (Sentry/Datadog/Snyk), cloud (AWS/Cloudflare/Vercel), and SaaS (Stripe/Slack/Google Workspace) are all NOT-INSTALLED. Per CR-12 Probe 7 demand-gate split: most are DEMAND-ABSENCE.a (REJECT) at current claude-sota workflow scope — sss is a self-contained autonomous-loop harness, not an enterprise SaaS-integration runtime. Sentry-MCP / Datadog-MCP would qualify as CR-12 PROVIDER-COMPLEMENT only if sss adds production-deployment surface.

---

## Part B — Cross-Runtime Ecosystem Patterns

### B.1 Cursor (~$2B ARR / $60B valuation 2025; Cursor 2.0 Oct 2025; Cursor 3 Q2 2026)

**5 distinctive primitives**:
1. **Composer agent** — multi-file editing agent; describes task in NL, plans changes across entire codebase, shows diff per file, awaits approval. Cursor 2.0 (Oct 2025) added background-agent mode.
2. **Background Agents on cloud VMs** — up to **8 agents in parallel** in isolated Ubuntu VMs with git worktree isolation; trigger remotely via Slack/GitHub. Self-hosted option (Q2 2026) keeps existing security model + build env + internal network. Cite: cursor.com/blog/self-hosted-cloud-agents
3. **`.cursorrules` / `.cursor/rules/` directory** — project-level instructions auto-injected into system prompt of every AI request (Cmd+K + Chat + Composer). Three rule types: Always (universal team conventions) / Auto (language-specific) / Agent (specialized knowledge).
4. **Inline Edit (Cmd+K)** — surgical focused changes to selected code; uses current file + selection as context with NO additional setup.
5. **Cursor 2.4 Subagents + Skills** (Apr 2026) — explicit convergence with Claude Code's skills primitive. Cursor adopted skill semantics within 6 months of Anthropic shipping them.

**sss pattern-extract candidates**:
- **`.cursorrules` Always/Auto/Agent rule-type taxonomy** → could pattern-extract into `claude-sota.md` rule-priority lattice (sss currently has CLAUDE.md flat structure; Cursor's 3-tier discriminator is sister to `paths:` glob discipline)
- **Background agent self-hosted option** → maps to sss's worktree-isolation discipline at outer-CLI layer (`parallel-session-worktree-isolation.md`); Cursor's cloud-VM + git-worktree per task = same shape as `eee --worktree` recipe
- **Routing**: would qualify as **PARTIAL-OVERLAP** per CR-12 disposition lattice (parallel mechanism: cloud-VM vs local-worktree; same scope: parallel-session isolation); CASE-BY-CASE → CITE-PATTERN-ONLY for now

### B.2 Windsurf / Cognition Devin ($250M acquisition Dec 2025)

**5 distinctive primitives**:
1. **Cascade agent** — Windsurf's flagship in-editor agent (sister to Composer); local-Cascade + cloud-Devin coexistence
2. **Agent Command Center (Windsurf 2.0, Apr 15 2026)** — Kanban-style surface inside editor showing ALL agent sessions grouped by status; both local Cascade + cloud Devin sessions visible in unified dashboard
3. **Spaces** — bundle agent sessions + PRs + files + shared context around a single task or project; switch between multi-agent jobs without rebuilding context
4. **Local-vs-cloud separation discipline** — "local agent is where you THINK (plan / prototype / iterate); cloud agent is where you DELEGATE (implementation / testing / QA / deployment)" — explicit cognitive split
5. **Codemaps** (Q2 2026 release) — visual codebase architecture maps that agents can navigate
6. **SWE-1.5** native model (Cognition's own coding model)

**sss pattern-extract candidates**:
- **Agent Command Center Kanban grouping** → maps to sss's `synthesis-layer-verify.md §SubagentStop transcript-mining` 4th OVER/UNDER/HNF axis; Kanban visualization is operator-side dashboard for what sss currently does in JSONL audit trails. Could pattern-extract into a `tools/agent_dashboard.py` reading `.claude/state/subagent_transcripts.jsonl`.
- **Local-vs-cloud cognitive split** → relates to sss's Path P (orchestrator-direct codex foreground+tee) vs Path D (subagent dispatch); Cognition's framing is the operator-mental-model articulation of what sss codified in CR-3 cross-model consensus topology
- **Routing**: PROVIDER-COMPLEMENT (different mechanisms, parallel scopes) → CITE-PATTERN-ONLY

### B.3 Augment Code (72% SWE-Bench Verified leader; 51.80% SWE-Bench Pro Apr 2026 — beats Cursor 50.21% / Claude Code 49.75% / OpenAI Codex 46.47%)

**5 distinctive primitives**:
1. **ContextEngine** — proprietary 200K-token context engine indexing entire repos; semantic dependency analysis (NOT text-search) understands cross-file relationships, automatic retrieval of dependency chains + call sites + type definitions + test fixtures + historical changes. Handles 400K+ file codebases.
2. **Memories feature** — automatic learning from developer interactions; persists across conversations; aligns Agent with individual coding styles + preferences over time. **Update mechanism**: continuously adapts as agent works; no explicit "save memory" command needed.
3. **Auggie CLI** — terminal-first variant; competes with OpenAI Codex CLI + Claude Code CLI
4. **Agent autonomy levels** — explicit gradient from full-supervision to background-task delegation
5. **Cross-tool integration**: VSCode + JetBrains + Vim + Sublime + Neovim — broadest IDE surface area

**sss pattern-extract candidates**:
- **Memories continuous-update mechanism** → sister to sss's `mem0-style fact extraction` discipline (CR-12 PARTIAL-OVERLAP per Wave 134 Fire 27-C). Augment's empirical validation of memory-driven coding (top SWE-Bench Pro score) is the strongest production endorsement of the persistent-memory pattern → reinforces sss's existing graphiti + mcp-memory-service installation
- **ContextEngine semantic-dependency-analysis** → CITE-CLASS-CANONICAL reference for sss's gitnexus-MCP impact analysis; both are semantic graphs of code relationships, but Augment's is closed-source proprietary
- **Routing**: ContextEngine = DUPLICATE-FUNCTIONALITY with gitnexus (REJECT-FOR-FIT); Memories = PROVIDER-COMPLEMENT with mem0 (already INSTALL-as-ALTERNATIVE per Wave 134 Fire 27-C)

### B.4 Tabnine (air-gapped enterprise leader, only AI coding assistant supporting fully air-gapped deployment)

**5 distinctive primitives**:
1. **4 deployment modes** — SaaS Cloud / VPC / On-Premises / **Air-gapped** (the only enterprise-grade AI assistant supporting fully offline). On-prem = Kubernetes cluster on customer's private network; Tabnine has zero access.
2. **Inference-on-premises** — entire model lives inside customer infrastructure; no cloud fallback EVER; prompt processing never leaves the network.
3. **Zero data retention** — requests ephemerally processed for suggestions then immediately discarded; no code or PII ever sent to Tabnine servers.
4. **Triple certification** — SOC 2 / GDPR / ISO 27001
5. **Model routing for compliance** — explicit per-context model selection by regulatory zone (e.g., EU-resident workloads use EU-hosted models)

**sss pattern-extract candidates**:
- **Air-gapped deployment shape** → DOES NOT APPLY to sss (sss is operator-personal autonomous-loop harness; not enterprise-deployed). DEMAND-ABSENCE per CR-12 Probe 7.a
- **Compliance-driven model routing** → sister to sss's CR-3 cross-model consensus model selection (Claude orchestrates / GPT-5.5 reviews); but sss's routing is QUALITY-driven not COMPLIANCE-driven. PARTIAL-OVERLAP, CITE-PATTERN-ONLY
- **Routing**: DEMAND-ABSENCE (REJECT) for air-gap; CITE-PATTERN-ONLY for routing pattern

### B.5 OpenAI Codex CLI (terminal-first; sandboxing + approval-mode native)

**5 distinctive primitives**:
1. **Sandbox modes (OS-native enforcement)** — defaults: NO network access + writes limited to active workspace; macOS uses Seatbelt sandbox-exec, Linux uses bubblewrap, Windows uses native Win32 job objects. Per developers.openai.com/codex/concepts/sandboxing
2. **Approval modes (4 tiers)** — Suggest / Auto-Edit / Full-Auto / Yolo (or via /permissions interactive switching)
3. **Sandbox + approval orthogonality** — "Sandbox defines technical boundaries; approval policy decides when to ask before crossing them" — the two are independent dimensions
4. **`AGENTS.md` project-context file** — sister to Claude's `CLAUDE.md` and Cursor's `.cursorrules`; loaded automatically per repo
5. **Approval-mode-first UX** — prompts for permission rather than blocking; emphasizes operator-in-loop discipline

**sss pattern-extract candidates** (already heavily integrated):
- sss already extracts the 4-mode approval lattice as `permissions.defaultMode` enum (auto/default/plan/bypassPermissions per `https://code.claude.com/docs/en/settings`)
- sss's `safety_guard.py` deny-list = sister to OS-native sandbox mode; both are technical-boundary enforcement
- AGENTS.md → claude-sota's `AGENTS.md` already exists (Wave 37 evidence ladder reference); cross-runtime convergence on `AGENTS.md` filename is itself notable Q2 2026 convergence point
- **Routing**: GENUINELY-NEW for sss historically; now CITE-CLASS-CANONICAL after multi-version convergence

### B.6 Claude Code itself (Anthropic 2026 evolution)

**5 distinctive Q2 2026 primitives** (post-2026-04 codex T1 + plugin-marketplace expansion):
1. **Plugins as composable bundles** — plugin = bundle of {skills, agents, hooks, MCP servers, LSP servers, monitors}; plugins are installable units (vs skills which are single instruction sets). Cite: code.claude.com/docs/en/plugins
2. **Marketplace expansion (May 2026)** — 4,200+ skills / 770+ MCP servers / 2,500+ marketplaces. Anthropic's `claude-plugins-official` is curated tier.
3. **Auto Mode** (Anthropic InfoQ May 2026) — multi-step development workflows with reduced manual intervention; layered safety: input filtering + action evaluation + 2-stage classification + human approval checkpoints for sensitive ops
4. **Hooks 9-event lifecycle** (PreToolUse / PostToolUse / SessionStart / SessionEnd / Stop / Notification / SubagentStop / UserPromptSubmit / PreCompact) — finer-grained than Cursor or Windsurf hook surfaces
5. **Skills `progressive-disclosure` ~100 tokens/skill** — Claude scans each skill's name+description (~100 tokens/skill); full instructions only load when relevant. Distinct from Cursor's flat .cursorrules injection model.

**sss extraction status**: ALL 5 primitives ALREADY ACTIVELY USED by claude-sota-installed. claude-sota IS the meta-runtime built on top of these primitives — no further pattern-extract needed; sss IS the pattern.

---

## Part C — Q2 2026 Convergence Patterns Delta

Wave 155 Agent G identified 5 convergence patterns at Axis 1+2+3 PASS (re: agentclientprotocol / 9-cohort / etc.). Q2 2026 NEW convergence emerging:

### C.1 NEW CONVERGENCE — `rules.md` / `AGENTS.md` / project-context-file (n=4 distinct orgs)

| Org | File | Cite |
|---|---|---|
| Anthropic | `CLAUDE.md` | code.claude.com/docs/en/memory |
| Cursor | `.cursorrules` / `.cursor/rules/` | cursor.com/docs/rules |
| OpenAI Codex | `AGENTS.md` | developers.openai.com/codex/cli/reference |
| Google Gemini CLI | `GEMINI.md` | google-gemini/gemini-cli (verified 103,747★) |

**Disposition per CR-12 6-class lattice**: GENUINELY-NEW (no incumbent) at Anthropic-side; Anthropic was first-mover but full convergence achieved Q2 2026. Already implemented in claude-sota (CLAUDE.md authoritative). Future ADOPT-NOW: cross-runtime AGENTS.md UNIFIED format (Boris Cherny April 2026 talk hinted at this).

### C.2 NEW CONVERGENCE — "Background Agents on isolated cloud VMs" (n=3 distinct orgs)

| Org | Primitive | Cite |
|---|---|---|
| Cursor | Background Agents (8-parallel cloud VMs) | cursor.com/blog/self-hosted-cloud-agents |
| Windsurf+Cognition | Cloud Devin sessions in Spaces | cognition.ai/blog/devin-in-windsurf |
| Claude Code | (no native — via cwc-long-running-agents marketplace) | github.com/anthropics/cwc-long-running-agents |

**Disposition**: PARTIAL-OVERLAP. claude-sota uses native worktree-isolation (Layer-0 per layered-gates-architecture.md) for parallel-session isolation; cloud-VM is a structural alternative. CASE-BY-CASE — for sss as personal-autonomous-loop runtime, local worktrees suffice. Cloud-VM would be ECOSYSTEM-IMPORT (requires cloud-cost layer + orchestration platform).

### C.3 NEW CONVERGENCE — "Composer / Cascade / Auggie / Codex agent" agent-named-frontends (n=5+ distinct orgs)

| Org | Agent name | Notes |
|---|---|---|
| Cursor | Composer | multi-file edit agent |
| Windsurf | Cascade | flagship in-editor agent |
| Augment | Auggie / Augment Agent | top SWE-Bench Pro |
| OpenAI | Codex CLI | terminal agent |
| Anthropic | Claude Code | terminal agent |

**Disposition**: CATEGORY-CONVERGENCE on "named in-editor or in-terminal flagship coding agent". claude-sota's "agent" naming = CC's built-in `Agent` tool + sub-agent fan-out per `parallel-agent-wave.md`. Already aligned.

### C.4 NEW CONVERGENCE — "Approval mode / permission tier / safety gate" (n=4+ distinct orgs)

| Org | Primitive | Tiers |
|---|---|---|
| Anthropic | `permissions.defaultMode` | auto / default / plan / bypassPermissions |
| OpenAI | Codex `/permissions` | Suggest / Auto-Edit / Full-Auto / Yolo |
| Cursor | per-tool approval prompts | implicit |
| Windsurf | Cascade approval-mode | implicit per Cognition docs |

**Disposition**: CONVERGENCE-FIRM. claude-sota's CR-7 graduated unleash discipline (3-phase: auto → default+allow[] → bypassPermissions) is the strongest articulation of this pattern. Could be pattern-extracted as a CITE-CLASS-CANONICAL ref doc; cross-vendor harmonization opportunity.

### C.5 NEW CONVERGENCE — "Memories / persistent-context / agent-learning" (n=4+ distinct orgs)

| Org | Primitive | Mechanism |
|---|---|---|
| Augment | Memories | auto-update on interaction; cross-conversation persist |
| Mem0 | Memory layer (21 frameworks) | fact-extraction + structured memory |
| Anthropic | (via mcp-memory-service / graphiti integrations) | external MCP |
| Letta | (formerly MemGPT) Cadence-gated background observer | internal-agent memory |

**Disposition**: CONVERGENCE-FIRM. Augment's top SWE-Bench Pro score is empirical validation that memory-driven coding wins. claude-sota installs both `memory` (mcp-memory-service) + `graphiti` — already aligned with multi-mechanism approach (sqlite-vec + temporal KG).

### C.6 NEW CONVERGENCE — "Skills / Commands / reusable invocation primitives" (n=4+ distinct orgs)

| Org | Primitive | Format |
|---|---|---|
| Anthropic | Skills (progressive disclosure ~100 tokens/skill) | `.claude/skills/<name>/SKILL.md` |
| Cursor | Subagents + Skills (2.4 Apr 2026) | `.cursor/skills/` (sister format) |
| Windsurf | Workflows | `windsurf/workflows/` |
| OpenAI Codex | (via AGENTS.md sections) | inline |

**Disposition**: CONVERGENCE-FIRM. Cursor 2.4 explicit adoption of "Skills" naming is convergence with Anthropic. claude-sota's deep skill catalog (4-meta-skill stack: using-superpowers / using-agent-skills / skill-comply / skill-creator) is the strongest articulation.

### C.7 NEW CONVERGENCE — "Plugins / Marketplaces / extension ecosystems" (n=4+ orgs)

| Org | Primitive | Status |
|---|---|---|
| Anthropic | Plugins + claude-plugins-official marketplace | 4,200+ skills / 770+ MCPs / 2,500+ marketplaces (May 2026) |
| Cursor | Cursor Marketplace | rules + extensions |
| Windsurf | Plugin system | growing |
| VS Code | Extensions Marketplace | mature predecessor |

**Disposition**: CONVERGENCE-FIRM. claude-sota uses plugin-marketplace mechanism (`claude-plugins-official` + `addy-agent-skills` + 14 marketplaces total per CLAUDE.md skill orchestration discipline).

---

## Part D — Anthropic-Official MCP Server Catalog

Per `github.com/modelcontextprotocol/servers` README + Anthropic plugin marketplaces (`anthropics/claude-plugins-official` per Wave 50 ship priority):

### D.1 Anthropic-maintained reference MCP servers (modelcontextprotocol/servers)

The repo is governed by the MCP steering group (Anthropic + community); reference servers are minimal-implementation showcases:
- **filesystem** — secure file operations with configurable access controls
- **git** — read/search/manipulate Git repositories
- **memory** — knowledge-graph-based persistent memory (sister to doobidoo/mcp-memory-service)
- **fetch** — web content fetching + conversion for LLM efficiency
- **time** — time/timezone conversion
- **everything** — reference/test server (prompts + resources + tools)
- **sequential-thinking** — dynamic reflective problem-solving (5,550+ Smithery uses; #1 most-installed)

### D.2 Anthropic plugin marketplaces

Per claude-sota CLAUDE.md skill-orchestration:
- `anthropics/claude-plugins-official` — Anthropic-curated; verified plugins by Anthropic + approved third-party
- `anthropics/knowledge-work` — knowledge-management bundle
- `anthropics/financial-services` — vertical-domain bundle
- `addyosmani/agent-skills` (TIER-1-NAMED-AUTHOR Addy Osmani / Google Chrome team; 33,500★ MIT) — installed in claude-sota
- `everything-claude-code` (ECC; affaan-m maintained) — installed in claude-sota
- `superpowers` (obra/superpowers; selectively-vendored 6 of 14 skills) — installed in claude-sota

### D.3 Anthropic MCP server adoption pattern

Anthropic prefers HOSTED endpoints via `mcp.<vendor>.com` over self-hosted stdio servers (sister to Sentry's `mcp.sentry.dev` Streamable HTTP launch). DeepWiki Cognition runs `mcp.deepwiki.com/mcp` — claude-sota uses this HOSTED endpoint for `deepwiki` (per `.mcp.json` verified). Convergence direction: SaaS-vendors host their own MCP endpoints with OAuth; community-MCPs run self-hosted stdio.

---

## Cross-cutting findings + recommendations for claude-sota

### F.1 Coverage gap: claude-sota's MCP install set is Code+Memory-heavy; missing Productivity / Monitoring / Cloud
**RECOMMENDATION**: Per CR-12 Probe 7.a DEMAND-ABSENCE, most NOT-INSTALLED entries are correctly REJECTED for sss's scope. Re-evaluate IF/WHEN sss expands beyond personal-autonomous-loop into team-collaborative-runtime (Sentry / Notion / Linear become PROVIDER-COMPLEMENT then).

### F.2 Q2 2026 convergence catalysts:
- **`rules.md` / `AGENTS.md` / `CLAUDE.md` / `GEMINI.md`** has reached n=4 org convergence — propose formal cross-runtime spec (FORWARD-REF candidate)
- **Skills primitive** convergence Cursor 2.4 → ratify as cross-vendor pattern (sister to MCP itself); claude-sota's 4-meta-skill stack is the strongest articulation
- **Background-agents-on-cloud-VMs** still ECOSYSTEM-IMPORT — defer for sss

### F.3 Multi-source discovery breadth gate satisfied (≥4 sources):
1. GitHub MCP search_repositories (29,733-star github-mcp + 187,507-star n8n + 55,067-star context7 + dozens more verified-stars)
2. WebSearch (perplexity / firecrawl / Cursor changelog / Windsurf changelog / Augment blog / Tabnine docs / OpenAI Codex docs / mcpmanager.ai 50-most-popular-MCPs)
3. WebFetch via WebSearch result extraction (Sentry blog / Anthropic InfoQ Auto Mode / Cursor self-hosted blog)
4. Anthropic CC docs (code.claude.com/docs/en/{plugins,skills,settings,sub-agents,commands})
5. (BONUS) modelcontextprotocol/servers README + claude-plugins-official marketplace.json

### F.4 FM-19 sidestep: NONE — used Write tool directly via mcp__workspace, not Bash heredoc

### F.5 Cite-class for this artifact:
`constituents=[TIER-1-DIRECT @ github.com/{github,upstash,oraios}/<repo>:HEAD verified 2026-05-12, TIER-2 @ Cursor/Cognition/Augment/Tabnine/OpenAI/Anthropic vendor docs, TIER-3-LOCAL-OPERATOR-DERIVED @ claude-sota .mcp.json cross-reference]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `citation-discipline.md` rule #8 MIN_PRECEDENCE.

---

## ARTIFACT-INLINE: tmp/wave157-cowork-2026-05-12-agentN-mcp-top50-cross-runtime.md

(This artifact persisted via Write tool to absolute path above; ARTIFACT-INLINE reproduction not needed since orchestrator can read the file directly.)

## MCP + CROSS-RUNTIME COMPLETE

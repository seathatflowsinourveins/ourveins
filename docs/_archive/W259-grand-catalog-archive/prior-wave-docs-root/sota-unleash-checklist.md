# SOTA Unleash Checklist — repos / MCPs / marketplaces / plugins

**Created**: 2026-05-15 (Wave 50 close)
**Scope**: Comprehensive reference for what to install across (a) Claude Desktop, (b) claude-sota-installed CLI runtime, (c) trading project
**Cite class**: TIER-3-LOCAL-COMPOSITION (synthesizes TIER-1 upstream cites with eee-local CR-12 dispositions per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8)
**Persistence rule**: forward-only audit trail per `port-note-discipline.md §6`

---

## §0 — Already installed on claude-sota-installed CLI runtime (NO ACTION NEEDED)

### MCP servers wired in `.mcp.json` (12)

| MCP | Source repo | Use |
|---|---|---|
| **github** | github/github-mcp-server | Code search, PR/issue/repo ops |
| **context7** | upstash/context7 | Up-to-date library docs |
| **deepwiki** | devin-ai-integration/deepwiki-mcp | AI wiki for any GitHub repo |
| **playwright** | microsoft/playwright-mcp v0.0.75 | Browser automation |
| **chrome-devtools** | (Anthropic-bundled) | Chrome devtools protocol |
| **repomix** | yamadashy/repomix | Pack codebases for analysis (~70% token reduction) |
| **serena** | oraios/serena | Symbol-level code editing via LSP |
| **memory** | doobidoo/mcp-memory-service v10.51.3 | Memory persistence (L1) — sqlite_vec embedded |
| **graphiti** | getzep/graphiti v0.29.0 | Temporal knowledge graph (L3) — FalkorDB backend |
| **phoenix** | Arize-ai/phoenix | LLM observability + tracing |
| **gitnexus** | gitnexus@1.6.4-rc.112 | Code intelligence (6008 symbols indexed) |
| **ccusage** | ryoppippi/ccusage | Token usage analytics |

### Plugins installed (11) + marketplaces registered (16)

22 skills + 13 agents + 4 meta-skill stack (using-superpowers / using-agent-skills / skill-comply / skill-creator) ACTIVE per `Z:/claude-sota-installed/.claude/rules/skill-orchestration-discipline.md`.

---

## §1 — Claude Desktop connectors (you click in Desktop UI)

**Action**: `claude.ai/customize/connectors` OR Claude Desktop → Settings → Connectors

| Connector | Auth | Utility | Recommendation |
|---|---|---|---|
| **Context7** | none | Up-to-date library docs in Desktop | ✅ Connect (matches CLI runtime) |
| **GitHub Integration** | OAuth | Repo browsing from Desktop | ✅ Connect if working in Desktop mode |
| **Windows-MCP** | none | OS-level automation on Windows | ✅ Connect if you want shell control |
| **Filesystem** | none | Local file access from Desktop | ✅ Connect (already there per your UI) |
| **Gmail** | OAuth | Email search + draft | ✅ Connect if you use Gmail |
| **Google Calendar** | OAuth | Schedule management | ✅ Connect if you use GCal |
| **Google Drive** | OAuth (already connected) | Document search + analysis | Permissions: leave write/delete on "ask"; read-only can flip to "always allow" |
| **Socket** | API key | Dependency security scanner | ✅ Connect for code review work |
| **Figma** | OAuth | Design file access | Connect only if using Figma |
| **PDF Tools** | none | PDF view/fill/merge/sign | Connect if working with PDFs |
| **Airtable MCP** | API key | Airtable data | Skip unless you use Airtable |
| **Tableau MCP** | API key | Tableau analytics | Skip unless you use Tableau |
| **Notion** | OAuth | Note search + edit | Connect if you use Notion |
| **Linear** | OAuth | Issue tracking | Connect if you use Linear |
| **Slack** | OAuth | Message search + send | Connect if you use Slack |

### Cowork extras (Anthropic-OFFICIAL, web-only)

These are connectable via `claude.ai/customize/connectors` (Cowork web app):

- **Exa** — semantic web search ✅ Recommended (no per-API-key — Anthropic-managed)
- **Tavily** — alternative web search (pick one of Exa or Tavily)
- **CoinDesk** — crypto data
- **Stripe** — payment data
- **Microsoft 365** — Office docs (SharePoint / OneDrive / Outlook / Teams)
- **Zoom** — meeting recaps
- **Canva** — design generation

---

## §2 — Anthropic-OFFICIAL plugin marketplaces (CLI runtime — `claude plugin marketplace add`)

### Already registered (16 marketplaces, per `Z:/claude-sota-installed/.claude/plugins/marketplaces/`)

- `claude-plugins-official` ← Anthropic-OFFICIAL (superpowers + skill-creator + ralph-loop + etc.)
- `everything-claude-code` ← yikuan-yang/everything-claude-code
- `claude-code-workflows` ← workflow plugin bundles
- `addy-agent-skills` ← Addy Osmani / Google Chrome team
- `claude-code-skills` ← alirezarezvani/claude-skills (235 production-ready skills)
- `claude-settings` ← intelligent-compact and others
- `codex` ← openai/codex-plugin-cc
- `cwc-long-running-agents` ← anthropics/cwc-long-running-agents
- `wshobson` ← Seth Hobson agents
- `mattpocock-skills` ← Matt Pocock skills (Total TypeScript author)
- + 6 others

### Marketplace add commands (if you want more)

```powershell
# Add a new marketplace (replace <URL> with the GitHub URL)
claude plugin marketplace add https://github.com/<owner>/<repo>

# Then install a plugin from that marketplace
claude plugin install <plugin-name>@<marketplace-id>

# List installed plugins
claude plugin list

# Show plugin details
claude plugin details <plugin-name>
```

### High-value marketplaces NOT YET registered (consider adding)

| Marketplace | URL | What it provides |
|---|---|---|
| **anthropic-cookbook** | `https://github.com/anthropics/anthropic-cookbook` | TIER-1 OFFICIAL Anthropic patterns (managed_agents/, skill-creator examples, SDK notebooks) |
| **awesome-mcp-servers** (catalog only — REMOTE-ONLY) | `https://github.com/punkpeye/awesome-mcp-servers` | 85.9k★ MIT MCP server registry; **discovery surface, NOT a marketplace**. Use to find MCPs to add via `claude mcp add` |
| **awesome-claude-code** (catalog only — REMOTE-ONLY) | `https://github.com/hesreallyhim/awesome-claude-code` | 226 resource rows (Slash-Commands 59 / Tooling 51 / Workflows 37 / etc); **discovery only**. License CC-BY-NC-ND-4.0 — cite-only, no fork |
| **awesome-agentic-patterns** | `Z:/repos/deps/awesome-agentic-patterns @ HEAD ffb42768` | 70+ agentic patterns; cite-only reference |
| **awesome-claude-skills** (catalog — REMOTE-ONLY) | `https://github.com/ComposioHQ/awesome-claude-skills` | ComposioHQ-curated index; discovery only |

---

## §3 — Anthropic role-plugins (1-click from `claude.ai/customize/plugins`)

Per the screenshot you showed — Anthropic ships 12+ role-tier plugins. Each gives Claude a domain-specific skill bundle.

| Plugin | Installs | Skills (sample) | Connect when |
|---|---|---|---|
| **Productivity** ★1.6M | Anthropic | Task management, calendar, email triage | Personal workflow |
| **Engineering** ★1.4M (already installed) | Anthropic | `/architecture` `/code-review` `/debug` `/deploy-checklist` `/documentation` `/incident-response` | Coding work |
| **Marketing** ★1.4M | Anthropic | Content + campaign + competitor + brand voice | Marketing work |
| **Data** ★1.4M | Anthropic | SQL, datasets, visualizations | Data analysis |
| **Finance** ★1.3M | Anthropic | Journal entries, reconciliation, statements | Bookkeeping |
| **Product management** ★1.3M | Anthropic | Specs, roadmaps, user research | PM work |
| **Operations** ★1.2M | Anthropic | Vendor mgmt, process docs, compliance | Ops work |
| **Sales** ★1.2M | Anthropic | Prospecting, outreach, deal strategy | Sales work |
| **Legal** ★1.2M | Anthropic | Contract review, NDA triage | Legal work |
| **HR** ★988K | Anthropic | Recruiting, onboarding, perf reviews | People ops |
| **Customer support** ★955K | Anthropic | Ticket triage, response drafting | CX work |
| **Enterprise search** ★1M | Anthropic | Cross-tool search | Connect after Gmail/Slack/Drive connectors |
| **PDF viewer** ★1.1M | Anthropic | Annotate, sign, fill PDFs | PDF workflow |
| **Brand voice** ★1.1M | Tribe AI | Brand voice extraction + validation | Marketing/content work |

### Personal plugins shown in your UI

You already have: **mcp-builder + skill-creator + theme-factory** as personal plugins. Built-in: **schedule + setup-cowork + context + schedule**.

### Recommendation

If you do coding work (which the trading project + claude-sota-installed work confirms): **Engineering plugin** is already installed. Productivity may be useful for personal workflow if you live in chat. Most others (Marketing/Sales/Legal/HR) are off-domain.

---

## §4 — SOTA reference repos at `Z:/repos/deps/` (cite anchors, NOT installs)

These are TIER-1 cite anchors used in `.claude/rules/*.md`. They are read-only research input, never installed.

### Anthropic-OFFICIAL (TIER-1-DIRECT)

| Repo | Purpose | HEAD pin |
|---|---|---|
| **anthropics/cwc-long-running-agents** | 5 SOTA primitives (Default-FAIL / Fresh-context evaluator / PROGRESS.md / Kill-switch / Steer mid-run) | `ffd563d6` |
| **anthropics/anthropic-cookbook** | 9 production patterns + claude_agent_sdk notebooks + skill-creator examples | `33424c3e` |
| **anthropics/claude-agent-sdk-python** | Canonical SDK; HookMatcher + _SubagentContextMixin source-of-truth | `b512f256` |

### Third-party TIER-1 (each is a distinct named-org / named-author)

| Repo | Author / Org | Purpose |
|---|---|---|
| **shanraisshan/claude-code-best-practice-shan** | shanraisshan (independent, NOT Anthropic) | CCBP best-practices catalog; 16 frontmatter fields for skills; T1-T3 cross-model workflow |
| **obra/superpowers** ★171k | Jesse Vincent (obra) | 14 named skills including verification-before-completion + dispatching-parallel-agents + TDD + brainstorming |
| **andrej-karpathy-skills** ★? | derived-from-Karpathy | 4 principles: Think Before Coding / Simplicity / Surgical Changes / Goal-Driven |
| **mattpocock/skills** ★48,857 | Matt Pocock (Total TypeScript) | TS-domain skills; Pragmatic Programmer / DDD / XP quote anchors |
| **addyosmani/agent-skills** ★38,769 | Addy Osmani (Google Chrome DevRel) | 21 engineering-phase skills + source-driven-development cite anchor |
| **forrestchang/andrej-karpathy-skills** | community-port | Karpathy 4 principles → skills format |
| **wshobson/agents** | Seth Hobson | Engineering agents catalog incl context-management |
| **openai/codex** | OpenAI | codex CLI v0.130.0 + sandbox model + worktree-aware runtime |
| **alirezarezvani/claude-skills** ★5,200 | alirezarezvani | 235 production-ready skills + 28 agents + maintainer self-audit (POWERFUL/SOLID/GENERIC/WEAK classification) |
| **VoltAgent/awesome-agent-skills** ★1,100+ | VoltAgent | Curated 50+ official-author submissions |

### Tooling / infra repos

| Repo | Use |
|---|---|
| **yamadashy/repomix** | Codebase packing (~70% token reduction) |
| **microsoft/playwright-mcp** | Browser automation MCP |
| **getzep/graphiti** | Temporal-KG MCP |
| **doobidoo/mcp-memory-service** | Memory MCP with sqlite_vec |
| **upstash/context7** | Docs MCP |
| **gitnexus** | Code intelligence MCP (PolyForm Noncommercial) |

### Workflow systems

| Repo | License | Use |
|---|---|---|
| **gsd-build/get-shit-done** ★58k | MIT | Spec-driven meta-prompting (14-runtime support); 64 commands. **NOTE**: REJECTED-FOR-FIT for trading project broad install per W50F2 audit; cite-only reference |
| **gstack** | MIT | codex CLI integration patterns (gstack/codex/SKILL.md cited in `codex-t1-fix-forward-pattern.md` Pattern-B mitigations) |
| **BMAD-METHOD/BMAD-METHOD** | MIT | Spec-driven multi-agent dev |
| **CCPM** | (Cursor Project Management) |
| **TaskMaster** | Multi-agent task tracker |

### Knowledge bases

| Repo | Use |
|---|---|
| **awesome-agentic-patterns** | 70+ agentic patterns (parallel-tool-exec / swarm-migration / lane-based-queue) |
| **awesome-mcp-servers** (punkpeye) | 85.9k★ MCP server discovery |
| **awesome-claude-code** (hesreallyhim) | 226 resource rows |
| **awesome-python** (vinta) | Python library reference |

---

## §5 — MCP servers worth adding to claude-sota-installed CLI runtime

### `claude mcp add` commands (paste into terminal)

```powershell
# Run from any CC session — adds to user-scope MCP config

# Already in .mcp.json - DO NOT re-add
# claude mcp add github ...
# claude mcp add context7 ...

# Web search alternatives (pick ONE — convergence-gate says don't duplicate)
claude mcp add exa --url https://mcp.exa.ai/mcp --env EXA_API_KEY=<get-at-exa.ai>
# OR
claude mcp add tavily --url https://mcp.tavily.com/mcp --env TAVILY_API_KEY=<get-at-app.tavily.com>

# Filesystem (Anthropic-bundled; verify not already wired)
claude mcp add filesystem --transport stdio --command npx -- -y @modelcontextprotocol/server-filesystem Z:/projects Z:/claude-sota-installed

# Postman (API workflow)
claude mcp add postman --url https://api.postman.com/mcp --env POSTMAN_API_KEY=<get-at-postman.com>

# Desktop Commander (local terminal)
claude mcp add desktop-commander --transport stdio --command npx -- -y @wonderwhy-er/desktop-commander

# Snyk (security scanning)
claude mcp add snyk --transport stdio --command npx -- -y snyk-mcp --env SNYK_TOKEN=<get-at-snyk.io>

# Socket (dependency vuln)
claude mcp add socket --transport stdio --command npx -- -y @socketsecurity/mcp --env SOCKET_API_KEY=<get-at-socket.dev>
```

### Free / no-API-key MCPs (low-friction adds)

```powershell
# PDF Tools (local PDF workflow)
claude mcp add pdf-tools --transport stdio --command npx -- -y @anthropic-ai/pdf-server-mcp

# Apify (web scraping aggregator)
# Requires API key from apify.com

# Sequential thinking (free; structured reasoning helper)
claude mcp add sequential-thinking --transport stdio --command npx -- -y @modelcontextprotocol/server-sequential-thinking
```

### Audit before adding

For each NEW MCP:
1. Probe upstream LICENSE (MIT / Apache-2.0 / BSD acceptable per CR-9)
2. Verify Probe 4 namespace doesn't collide with existing 12 MCPs
3. Verify Probe 7 demand-gate (do you have a workflow that NEEDS this?)
4. Reversibility: `claude mcp remove <name>` undoes the add

---

## §6 — REJECTED candidates from prior audits (DO NOT INSTALL)

Per `Z:/claude-sota-installed/docs/verified-avoid.md` Entry W50F2-T1/T2/T3 + sibling claude-sota's full reject registry:

| Candidate | Verdict | Reason |
|---|---|---|
| **wshobson context-management on trading project** | REJECT-FOR-FIT P1 conf 0.92 | Aspirational pseudo-code; existing compact_hint.v1 + Rank #3.5 stack covers |
| **Generic /loop-dispatch skill on claude-sota-installed** | REJECT-FOR-FIT P1 conf 0.88 | 4 incumbent primitives (superpowers/dispatching-parallel-agents + ECC autonomous-loops + ralph-loop + sota-convergence-audit) + DEMAND-ABSENCE |
| **gsd /gsd-spike + /gsd-graphify on trading (broad install)** | REJECT-FOR-FIT P1 conf 0.90 | gsd-spike HARD-GATE AskUserQuestion blocks autonomous cron; gsd-graphify duplicates wired graphiti+gitnexus |
| **openai/evals on claude-sota-installed** | REJECT-FOR-FIT (Wave 122 Ship 2) | Probe-7 demand-absence; DeepEval+promptfoo already wired |
| **Path D `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`** | REVERTED W50F3 | 1M context IS the SOTA primitive; disabling SOTA contradicts CR-5/CR-8 |
| **Commercial paywall MCPs** (LSEG / S&P / Morningstar / MSCI / Daloopa / PitchBook / Quartr / CB Insights / FactSet / Fiscal.ai / MT Newswires / Aiera / ICE / FMP / Bigdata) | REJECT-SCOPE | Subscription model + LaunchDarkly D165 vendor-lock-in pattern; free FRED + SEC EDGAR + finnhub cover trading use case |
| **Sales/GTM/CRM MCPs** (Apollo / Common Room / ZoomInfo / Clay / HubSpot / Attio) | REJECT-SCOPE | Off-domain |
| **Legal/HR/HR MCPs** (Harvey / Trellis / Workable / Gusto) | REJECT-SCOPE | Off-domain |
| **Design MCPs unless using product** (Figma / Canva / Sketch / Adobe — connect only if actively using) | CONDITIONAL | Skip unless current project needs |

---

## §7 — Marketplace URLs reference (for adding to Desktop / CLI)

### Anthropic-OFFICIAL

| URL | Purpose |
|---|---|
| `https://claude.ai/customize/connectors` | Desktop + Web connectors (UI-clickable; OAuth flows) |
| `https://claude.ai/customize/plugins` | Plugins via Anthropic marketplace |
| `https://claude.ai/customize/skills` | Personal skills management |
| `https://code.claude.com/docs/en/skills` | Skill mechanism docs |
| `https://code.claude.com/docs/en/plugins` | Plugin spec |
| `https://code.claude.com/docs/en/mcp` | MCP integration docs |
| `https://docs.anthropic.com/en/docs/claude-code/sub-agents` | Subagent docs |

### Plugin marketplaces (third-party but reputable)

| URL | Owner | Verified-clean per audits |
|---|---|---|
| `https://github.com/anthropics/cwc-long-running-agents` | Anthropic-OFFICIAL | ✅ Wave 6 audit |
| `https://github.com/yikuan-yang/everything-claude-code` | ECC | ✅ Already registered |
| `https://github.com/obra/superpowers` | Jesse Vincent | ✅ Wave 3 source-mining audit |
| `https://github.com/forrestchang/andrej-karpathy-skills` | Karpathy-derived | ✅ Karpathy P1-P4 cite anchor |
| `https://github.com/addyosmani/agent-skills` | Addy Osmani | ✅ Wave 82 audit (TIER-1-NAMED-AUTHOR) |
| `https://github.com/mattpocock/skills` | Matt Pocock | ✅ Wave 137 mattpocock audit (CR-12 disposition: REJECT broad install — HARD-GATE; PARTIAL-CITE for pattern extraction only) |
| `https://github.com/alirezarezvani/claude-skills` | alirezarezvani | ✅ Discovery surface; 235 skills audited |
| `https://github.com/wshobson/agents` | Seth Hobson | ✅ Wave 105 wshobson plugin audit |
| `https://github.com/openai/codex` | OpenAI | ✅ codex CLI v0.130.0 (T1-T7 backbone) |

### MCP discovery (NOT install URLs — research only)

| URL | Purpose |
|---|---|
| `https://github.com/punkpeye/awesome-mcp-servers` | 85.9k★ MCP catalog |
| `https://github.com/hesreallyhim/awesome-claude-code` | 226 CC resource catalog |
| `https://github.com/ComposioHQ/awesome-claude-skills` | ComposioHQ index |
| `https://github.com/sickn33/antigravity-awesome-skills` | 1400+ skills installer |
| `https://glama.ai/mcp/servers` | Glama MCP registry (mirror of awesome-mcp-servers) |
| `https://smithery.ai/` | Smithery MCP marketplace (community) |

### MCP server source repos (for direct install)

| MCP | Repo URL |
|---|---|
| Filesystem | `https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem` |
| Slack | `https://github.com/modelcontextprotocol/servers/tree/main/src/slack` |
| Brave Search | `https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search` |
| Memory (official) | `https://github.com/modelcontextprotocol/servers/tree/main/src/memory` |
| Postgres | `https://github.com/modelcontextprotocol/servers/tree/main/src/postgres` |
| Puppeteer | `https://github.com/modelcontextprotocol/servers/tree/main/src/puppeteer` |
| Time | `https://github.com/modelcontextprotocol/servers/tree/main/src/time` |
| Sequential Thinking | `https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking` |
| Exa | `https://github.com/exa-labs/exa-mcp-server` |
| Tavily | `https://github.com/tavily-ai/tavily-mcp` |
| Desktop Commander | `https://github.com/wonderwhy-er/DesktopCommanderMCP` |
| Repomix | `https://github.com/yamadashy/repomix` |
| Snyk | `https://github.com/snyk-labs/snyk-mcp` |
| Socket | `https://github.com/SocketDev/socket-mcp` |
| Apify | `https://github.com/apify/apify-mcp-server` |

### Free data API sources (no MCP — use WebFetch / curl)

| URL | Use |
|---|---|
| `https://www.sec.gov/cgi-bin/browse-edgar` | SEC EDGAR filings (free) |
| `https://fred.stlouisfed.org/docs/api/fred/` | Federal Reserve econ data (free; via fredapi v0) |
| `https://api.polygon.io/` | Stock market data (free tier) |
| `https://finnhub.io/docs/api` | Stock + crypto data (free tier) |
| `https://www.alphavantage.co/documentation/` | Stock + forex (free tier) |
| `https://api.coingecko.com/api/v3/` | Crypto market data (free) |
| `https://docs.alpaca.markets/` | Alpaca broker SDK (already pin trading project: alpaca-py>=0.43.4) |
| `https://github.com/TauricResearch/TradingAgents` | TradingAgents arXiv 2412.20138 paper repo |

---

## §8 — How to verify each install works (smoke-test)

After each MCP install:

```powershell
# 1. List installed MCPs
claude mcp list

# 2. Check MCP server health (claude-sota-installed has phoenix + mcp-health hook)
# Look at: Z:/claude-sota-installed/.claude/state/mcp_health.jsonl tail

# 3. Smoke-test in a CC session
# Ask Claude: "use <mcp-tool-name> to <simple task>"
# e.g., "use exa to search for openai/codex"
# e.g., "use context7 to look up langgraph docs"

# 4. If smoke fails:
claude mcp remove <name>
# Then file an issue at the MCP's upstream repo
```

For each plugin install:

```powershell
# 1. List installed plugins
claude plugin list

# 2. Verify skills loaded
# In CC session, type "/" — should see new skills appear

# 3. Smoke-test by typing the slash command
# e.g., /architecture for Engineering plugin
```

---

## §9 — Rollback / uninstall (per CR-9 reversibility)

```powershell
# Remove MCP
claude mcp remove <name>

# Uninstall plugin
claude plugin uninstall <plugin-name>

# Remove marketplace
claude plugin marketplace remove <marketplace-id>

# Restore .mcp.json from backup
git -C Z:/claude-sota-installed checkout .mcp.json

# Restore Claude Desktop config (already practiced this session)
Copy-Item "$env:APPDATA\Claude\claude_desktop_config.backup.2026-05-15.json" "$env:APPDATA\Claude\claude_desktop_config.json" -Force
```

---

## §10 — Convergence-gate before any add (do this BEFORE install)

Per `Z:/claude-sota/.claude/rules/convergence-gate.md` + `agent-harness-fit-verification.md` Probe DAG 1-7:

1. **Axis 1** — ≥3 distinct T1 sources implementing the pattern? (3 different orgs)
2. **Axis 2** — ≥2 named T2 practitioners citing this specific MCP / plugin?
3. **Axis 3** — ≥3 months stability? (cpd / age band)
4. **Probe 4** — namespace collision? (does claude-sota-installed already have it?)
5. **Probe 5** — mode-harness-shape mismatch? (HARD-GATE / interactive / size sprawl)
6. **Probe 6** — LICENSE permissive? (MIT / Apache-2.0 / BSD)
7. **Probe 7** — demand-gate: do you have a workflow that NEEDS this TODAY?

If any fails → REJECT-FOR-FIT; document in `docs/verified-avoid.md`.

---

## §11 — Recommended highest-leverage adds NOW

Based on the runtime state + your work patterns:

### Tier 1 (recommended; low friction, high utility)

1. **Connect Context7** in Desktop UI (1-click; matches CLI runtime; no auth)
2. **Connect Windows-MCP** in Desktop UI (if you want shell control from Desktop)
3. **Connect Socket** in Desktop UI (if you do code review work — Engineering plugin synergy)
4. **Add `desktop-commander`** to CLI runtime via `claude mcp add` (terminal control)
5. **Add `sequential-thinking`** to CLI runtime (free; structured reasoning helper)

### Tier 2 (utility-dependent)

6. **Gmail + Google Calendar** connectors — IF you use Google for work
7. **Notion + Linear + Slack** connectors — IF you use those services
8. **Exa** OR **Tavily** (pick one) — IF you need stronger web search than current github+perplexity

### Tier 3 (skip unless specific need)

9. Airtable / Tableau / Figma / Adobe / commercial financial MCPs — skip unless actively using

---

## §12 — Update triggers (this checklist)

Re-evaluate when:
- New TIER-1-NAMED-AUTHOR plugin marketplace lands (e.g., new Anthropic OFFICIAL or named-T2 author)
- A REJECTED candidate ships its trigger (e.g., gsd ships autonomous-mode → re-audit T3)
- Claude Code ships a new connector category
- Trading project 4-question gate resolved → re-evaluate which MCPs apply to code-write phase
- claude-sota-installed runtime acquires capability that obviates a current install (e.g., native code-search obviates serena)

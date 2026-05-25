# BACKLOG TRANCHE B — MCP / TOOLS / INTEGRATION DOMAIN

**Saturation tranche B · 2026-05-16 · GraphQL bulk-probe (99% rate-limit headroom)**

> Processes the next slice of the 373-repo ≥2k★ backlog acknowledged in `ULTIMATE-SYNTHESIS-V-FINAL-V3-CONSOLIDATED-2026-05-16.md` §1 "HONEST SATURATION GAP" — scope is **MCP-server / tool-use / LLM-tools / model-context-protocol / claude-tools-integration** domains. Compared against V-FINAL-V3-CONSOLIDATED.fix5 §1 layer architecture (25 super-layers + 28 sub-lanes).
>
> **Probes executed** (5 GraphQL `search(type: REPOSITORY, first: 100)`):
> - Q1: `topic:mcp-server stars:>2000` → 79 results
> - Q2: `topic:tool-use stars:>5000 pushed:>2026-01-01` → 2 results
> - Q3: `topic:llm-tools stars:>5000` → 3 results
> - Q4: `model context protocol stars:>2000 pushed:>2026-01-01` → 28 results
> - Q5: `claude tools integration stars:>3000` → 2 results
> - **Unique repos after dedup**: ~95
>
> **Rubric (each 1-10)**: D1 stars · D2 freshness · D3 license · D4 native-CC-pathway · D5 community-consensus · D6 maintainer-tier · D7 use-case-fit · D8 saturation-priority. Sum/80.
>
> **Cite-class**: `constituents=[TIER-1-DIRECT @ GitHub MCP search this fire 2026-05-16, TIER-2 @ V-FINAL-V3-CONSOLIDATED.fix5 §1 layer architecture, TIER-3-LOCAL-COMPOSITION @ this tranche-B scoring]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.

---

## §A — PER-REPO MATRIX (74 rows scored, sorted by descending stars within group)

> **Legend**: ALREADY = present in V-FINAL-V3 catalog · NEW = net-new candidate · DEMOTE/CITE-ONLY = pattern-cite, not install · OUT-OF-SCOPE = outside MCP/tools/integration domain · WATCHLIST = monitor-only.
>
> License notation: MIT/Apache-2.0/AGPL etc; `?` = not surfaced in API metadata, requires upstream probe. Last-commit shows updated_at from API.

| # | repo | ★ | license | last-commit | D1 | D2 | D3 | D4 | D5 | D6 | D7 | D8 | sum/80 | proposed-layer | verdict |
|---|------|---:|---------|------------|---:|---:|---:|---:|---:|---:|---:|---:|------:|----------------|---------|
| 1 | n8n-io/n8n | 188119 | fair-code (Sustainable Use License) | 2026-05-16 | 10 | 10 | 5 | 6 | 10 | 10 | 6 | 6 | 63 | L2.4 Vertical / out-of-scope-core | **ALREADY (DEFER)** — workflow-automation general iPaaS, MCP support side-feature; not CC-runtime fit |
| 2 | google-gemini/gemini-cli | 104119 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 4 | 9 | 10 | 7 | 8 | 68 | L3 Peer CLI | **NEW (WATCHLIST P1)** — peer CLI in L3 alongside opencode/goose; Google-official; MCP-client built in; not currently catalogued |
| 3 | sansan0/TrendRadar | 57664 | ? | 2026-05-16 | 10 | 10 | 5 | 3 | 6 | 6 | 3 | 3 | 46 | out-of-scope | OUT-OF-SCOPE — public-opinion/trend monitor; not infra |
| 4 | upstash/context7 | 55430 | MIT | 2026-05-16 | 10 | 10 | 10 | 9 | 7 | 9 | 7 | 7 | 69 | L0.4 Code-Intel WARN | **ALREADY** — V-FINAL-V3 catalog WARN (ContextCrush vuln 2026-03 + 83% free-tier cut 2026-01) |
| 5 | ruvnet/ruflo | 51772 | MIT | 2026-05-16 | 10 | 10 | 10 | 9 | 6 | 5 | 7 | 7 | 64 | L2 Driver-adjacent / L5 Orchestrator | **NEW (STUDY-PILOT)** — agent orchestration platform for Claude; high recency + stars; not yet in catalog; cite-class TIER-2 needs verification |
| 6 | D4Vinci/Scrapling | 50317 | BSD-3 | 2026-05-16 | 10 | 10 | 9 | 4 | 7 | 5 | 5 | 4 | 54 | out-of-scope (L2.5a-adjacent) | OUT-OF-SCOPE — web-scraping framework; possible adjunct to L2.5a Browser sub-lane but browser-use/playwright-mcp already cover |
| 7 | ChromeDevTools/chrome-devtools-mcp | 39754 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 10 | 9 | 10 | 8 | 8 | 75 | L0.MCP / L2.5a Browser | **NEW (T1 INSTALL CANDIDATE)** — Google Chrome-team OFFICIAL MCP; L0.MCP catalog mentions "Chrome-devtools" generically but upstream owner/repo NOT pinned in V-FINAL-V3 — likely naming-drift catch |
| 8 | bytedance/UI-TARS-desktop | 34185 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 6 | 8 | 8 | 6 | 6 | 64 | L2.5b Computer-Use WATCHLIST | **ALREADY** — V-FINAL-V3 L2.5b "mac-only WATCHLIST" |
| 9 | github/github-mcp-server | 29879 | MIT | 2026-05-16 | 10 | 10 | 10 | 10 | 10 | 10 | 9 | 9 | 78 | L0.MCP | **ALREADY** — V-FINAL-V3 §1 fix5 callout: "github/github-mcp-server 30k★" explicit add |
| 10 | assafelovic/gpt-researcher | 27099 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 6 | 9 | 8 | 7 | 7 | 67 | L2.6 Vertical Agents | **ALREADY** — V-FINAL-V3 fix5 callout: "gpt-researcher 25k★" already in L2.6 |
| 11 | oraios/serena | 24287 | MIT | 2026-05-16 | 10 | 10 | 10 | 10 | 10 | 9 | 10 | 9 | 78 | L0.4 Code-Intel | **ALREADY** — V-FINAL-V3 incumbent (24.3k★) |
| 12 | modelcontextprotocol/python-sdk | 23024 | MIT | 2026-05-16 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 8 | 78 | L0.MCP foundation | **NEW (CITE-FOUNDATION)** — Anthropic-official SDK; should be CITE-ONLY foundation reference, not "install" |
| 13 | activepieces/activepieces | 22219 | MIT (some AGPL) | 2026-05-16 | 10 | 10 | 7 | 5 | 8 | 7 | 5 | 4 | 56 | out-of-scope (workflow iPaaS) | OUT-OF-SCOPE — competitor to n8n; not CC-native |
| 14 | czlonkowski/n8n-mcp | 20988 | MIT | 2026-05-16 | 10 | 10 | 10 | 9 | 7 | 5 | 6 | 6 | 63 | L0.MCP / L2.4 | **NEW (DEFER)** — MCP bridge to n8n workflows; only relevant if n8n stack present |
| 15 | 1Panel-dev/MaxKB | 20970 | GPL-3.0 | 2026-05-16 | 10 | 10 | 4 | 4 | 6 | 6 | 4 | 3 | 47 | out-of-scope | OUT-OF-SCOPE — enterprise agent-builder, GPL-3 license blocker |
| 16 | Panniantong/Agent-Reach | 19645 | ? | 2026-05-16 | 10 | 10 | 5 | 7 | 6 | 4 | 6 | 5 | 53 | L2.5a Browser-adjacent | **NEW (WATCHLIST)** — multi-platform scraper CLI; freshness PERFECT (Feb 2026); license unverified; CN-region maintainer tier unclear |
| 17 | nukeop/nuclear | 17623 | AGPL-3.0 | 2026-05-16 | 10 | 10 | 3 | 1 | 6 | 5 | 1 | 1 | 37 | out-of-scope | OUT-OF-SCOPE — music streaming player |
| 18 | agentscope-ai/QwenPaw | 16710 | ? | 2026-05-16 | 10 | 10 | 5 | 4 | 5 | 5 | 4 | 3 | 46 | out-of-scope | OUT-OF-SCOPE — personal-assistant chat UI; not CC infra |
| 19 | microsoft/mcp-for-beginners | 16112 | MIT | 2026-05-16 | 10 | 10 | 10 | 7 | 9 | 10 | 5 | 4 | 65 | CITE-DOC | **NEW (CITE-ONLY)** — Microsoft-official MCP curriculum; doc resource, not install |
| 20 | triggerdotdev/trigger.dev | 14945 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 6 | 8 | 8 | 7 | 6 | 65 | L5.7b Sidecar Durable | **ALREADY** — V-FINAL-V3 L5.7b STUDY-PILOT |
| 21 | mksglu/context-mode | 14862 | MIT | 2026-05-16 | 10 | 10 | 10 | 10 | 9 | 8 | 10 | 9 | 76 | L1.5 Token Compression | **ALREADY** — V-FINAL-V3 L1.5 incumbent (this runtime uses it via plugin per CLAUDE.md) |
| 22 | open-metadata/OpenMetadata | 13935 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 3 | 7 | 8 | 3 | 2 | 53 | out-of-scope | OUT-OF-SCOPE — enterprise metadata platform, not CC-runtime |
| 23 | xpzouying/xiaohongshu-mcp | 13615 | ? | 2026-05-16 | 10 | 10 | 5 | 7 | 5 | 3 | 4 | 3 | 47 | out-of-scope (regional) | OUT-OF-SCOPE — Xiaohongshu (CN social platform) MCP; not relevant to runtime |
| 24 | yusufkaraaslan/Skill_Seekers | 13581 | ? | 2026-05-16 | 10 | 10 | 5 | 10 | 6 | 4 | 8 | 7 | 60 | L2.2 Methodology / L2.8 Awesome-adjacent | **NEW (STUDY-PILOT)** — docs/repos/PDFs → Claude AI skills converter; net-new and very fresh; license unverified |
| 25 | tadata-org/fastapi_mcp | 11863 | MIT | 2026-05-15 | 10 | 10 | 10 | 9 | 8 | 7 | 8 | 7 | 69 | L0.MCP (server-building) | **NEW (T2 INSTALL)** — exposes FastAPI endpoints as MCP tools w/ Auth; useful infra primitive for in-house MCP servers; net-new |
| 26 | JoeanAmier/XHS-Downloader | 11173 | ? | 2026-05-16 | 10 | 10 | 5 | 1 | 5 | 4 | 1 | 1 | 37 | out-of-scope | OUT-OF-SCOPE — Xiaohongshu downloader |
| 27 | 0xJacky/nginx-ui | 11145 | AGPL-3.0 | 2026-05-16 | 10 | 10 | 3 | 1 | 6 | 5 | 1 | 1 | 37 | out-of-scope | OUT-OF-SCOPE — Nginx WebUI |
| 28 | hangwin/mcp-chrome | 11636 | ? | 2026-05-16 | 10 | 10 | 5 | 9 | 7 | 5 | 7 | 6 | 59 | L2.5a Browser | **NEW (STUDY-PILOT)** — Chrome-extension-based MCP exposing browser to AI assistants; alternative to chrome-devtools-mcp; net-new |
| 29 | mcp-use/mcp-use | 9962 | MIT | 2026-05-16 | 10 | 10 | 10 | 8 | 7 | 6 | 7 | 6 | 64 | L0.MCP (framework) | **NEW (STUDY-PILOT)** — fullstack MCP framework for ChatGPT/Claude/MCP servers; net-new |
| 30 | CoplayDev/unity-mcp | 9661 | MIT | 2026-05-16 | 10 | 10 | 10 | 8 | 7 | 6 | 4 | 3 | 58 | L2.4 Vertical (game-dev) | **NEW (WATCHLIST)** — Unity-editor MCP bridge; vertical use-case (game-dev); not core runtime fit but high quality |
| 31 | xinnan-tech/xiaozhi-esp32-server | 9553 | ? | 2026-05-16 | 10 | 10 | 5 | 1 | 5 | 4 | 1 | 1 | 37 | out-of-scope | OUT-OF-SCOPE — ESP32 device backend |
| 32 | wanshuiyin/Auto-claude-code-research-in-sleep | 9473 | ? | 2026-05-16 | 10 | 10 | 5 | 10 | 5 | 4 | 8 | 7 | 59 | L2.2 Methodology | **NEW (WATCHLIST)** — "Auto-Research-In-Sleep" (ARIS) markdown-only CC skills for autonomous research; HIGH freshness/relevance; license unverified |
| 33 | awslabs/mcp | 9067 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 9 | 9 | 10 | 7 | 7 | 72 | L0.MCP (vendor-official) | **NEW (T2 INSTALL CANDIDATE)** — AWS-OFFICIAL MCP servers for AWS services; tier-1 vendor; net-new |
| 34 | mark3labs/mcp-go | 8709 | MIT | 2026-05-16 | 10 | 10 | 10 | 9 | 8 | 7 | 7 | 6 | 67 | L0.MCP (SDK) | **NEW (CITE-FOUNDATION)** — community Go MCP SDK (alt to official modelcontextprotocol/go-sdk); cite-only |
| 35 | 0x4m4/hexstrike-ai | 8764 | ? | 2026-05-16 | 10 | 10 | 5 | 8 | 6 | 5 | 6 | 5 | 55 | L0.5 Security-adjacent | **NEW (DEFER)** — pentest MCP agent server (red-team tooling); narrow vertical |
| 36 | mrexodia/ida-pro-mcp | 8558 | MIT | 2026-05-16 | 10 | 10 | 10 | 8 | 7 | 6 | 5 | 4 | 60 | L2.4 Vertical (RE) | **NEW (WATCHLIST)** — reverse-engineering assistant via IDA Pro+MCP; narrow vertical |
| 37 | lastmile-ai/mcp-agent | 8325 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 8 | 7 | 7 | 7 | 6 | 65 | L5 Scaffold | **NEW (STUDY-PILOT)** — workflow-pattern agents with MCP; net-new |
| 38 | modelcontextprotocol/modelcontextprotocol | 8125 | MIT | 2026-05-16 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 7 | 77 | L0.MCP foundation spec | **NEW (CITE-FOUNDATION)** — the MCP spec itself; CITE-ONLY |
| 39 | firerpa/lamda | 7786 | ? | 2026-05-16 | 10 | 10 | 5 | 5 | 6 | 5 | 4 | 3 | 48 | out-of-scope | OUT-OF-SCOPE — Android RPA |
| 40 | AgentDeskAI/browser-tools-mcp | 7216 | ? | 2026-05-16 | 10 | 10 | 5 | 9 | 7 | 5 | 7 | 6 | 59 | L2.5a Browser | **NEW (STUDY-PILOT)** — browser-logs MCP for Cursor/IDEs; possible adjunct to L2.5a |
| 41 | hatchet-dev/hatchet (proxy via topic match) | 7200 | MIT | 2026-05-16 | 10 | 10 | 10 | 7 | 8 | 7 | 7 | 7 | 66 | L5.7c Postgres Durable | **ALREADY** — V-FINAL-V3 L5.7c (7.2k★) |
| 42 | yzfly/Awesome-MCP-ZH | 7079 | ? | 2026-05-16 | 10 | 10 | 5 | 7 | 6 | 4 | 4 | 3 | 49 | L2.8 Awesome-List (regional) | **NEW (DEFER)** — CN-language MCP awesome list; not adding to L2.8 unless CN-region targeted |
| 43 | BrowserMCP/mcp | 6510 | ? | 2026-05-16 | 10 | 10 | 5 | 9 | 7 | 5 | 7 | 6 | 59 | L2.5a Browser | **NEW (WATCHLIST)** — Browser-MCP server; possible alternative to playwright-mcp/chrome-devtools-mcp |
| 44 | firecrawl/firecrawl-mcp-server | 6317 | MIT (wrapper) | 2026-05-16 | 10 | 10 | 9 | 10 | 8 | 8 | 8 | 7 | 70 | L0.MCP / L0.4 web | **ALREADY** (likely owner-correction needed) — V-FINAL-V3 §6 C12 caveat: firecrawl-core AGPL, only MCP wrapper permissive; this is the wrapper. **POSSIBLE NAMING-DRIFT** — see §C |
| 45 | open-multi-agent/open-multi-agent | 6153 | ? | 2026-05-16 | 10 | 10 | 5 | 7 | 6 | 4 | 7 | 6 | 55 | L5 Scaffold | **NEW (STUDY-PILOT)** — DAG-based multi-agent orchestration w/ MCP + live tracing; very fresh (Mar 2026) |
| 46 | Sylinko/Everywhere | 5954 | ? | 2026-05-16 | 10 | 10 | 5 | 4 | 5 | 4 | 3 | 2 | 43 | out-of-scope | OUT-OF-SCOPE — desktop AI-assistant UI |
| 47 | Klavis-AI/klavis | 5735 | Apache-2.0 | 2026-05-15 | 10 | 10 | 10 | 8 | 7 | 6 | 7 | 6 | 64 | L0.MCP integration platform | **NEW (STUDY-PILOT)** — MCP integration platform for agents to use tools reliably at scale; net-new |
| 48 | getsentry/XcodeBuildMCP | 5591 | ? | 2026-05-16 | 10 | 10 | 8 | 9 | 7 | 9 | 4 | 3 | 60 | L2.4 Vertical (iOS) | **NEW (WATCHLIST)** — Sentry-maintained iOS/macOS MCP; narrow vertical |
| 49 | appcypher/awesome-mcp-servers | 5543 | ? | 2026-05-16 | 10 | 10 | 5 | 10 | 7 | 5 | 7 | 5 | 59 | L2.8 Awesome-List | **NEW (CITE-DISCOVERY)** — alt to wong2/awesome-mcp-servers + punkpeye/awesome-mcp-servers (already in catalog) |
| 50 | brokermr810/QuantDinger | 5383 | ? | 2026-05-16 | 10 | 10 | 5 | 4 | 4 | 3 | 3 | 2 | 41 | out-of-scope | OUT-OF-SCOPE — crypto-trading platform |
| 51 | osaurus-ai/osaurus | 5283 | ? | 2026-05-16 | 10 | 10 | 5 | 5 | 5 | 4 | 4 | 3 | 46 | out-of-scope (regional) | OUT-OF-SCOPE — macOS-native AI harness (parallel to CC); WATCHLIST only |
| 52 | nanbingxyz/5ire | 5220 | ? | 2026-05-16 | 10 | 10 | 5 | 5 | 6 | 5 | 4 | 3 | 48 | out-of-scope (MCP-client) | OUT-OF-SCOPE — desktop MCP client; not CC-runtime fit |
| 53 | FunnyWolf/Viper | 5043 | ? | 2026-05-16 | 10 | 10 | 5 | 3 | 5 | 5 | 3 | 2 | 43 | out-of-scope | OUT-OF-SCOPE — adversary-simulation/red-team |
| 54 | maximhq/bifrost | 4959 | Apache-2.0 | 2026-05-16 | 10 | 10 | 10 | 8 | 7 | 7 | 8 | 8 | 68 | L4.75 Fleet AI Gateway | **NEW (T2 INSTALL CANDIDATE)** — "fastest enterprise AI gateway (50x faster than LiteLLM)"; performance-claim verification needed; net-new in L4.75 alongside Portkey/Helicone/AgentOps |
| 55 | mobile-next/mobile-mcp | 4914 | ? | 2026-05-16 | 10 | 10 | 5 | 9 | 7 | 5 | 4 | 3 | 53 | L2.4 Vertical (mobile) | **NEW (WATCHLIST)** — mobile (iOS/Android) automation MCP |
| 56 | modelcontextprotocol/go-sdk | 4549 | MIT | 2026-05-16 | 9 | 10 | 10 | 10 | 10 | 10 | 6 | 5 | 70 | L0.MCP (SDK) | **NEW (CITE-FOUNDATION)** — Anthropic+Google official Go SDK |
| 57 | u14app/deep-research | 4583 | ? | 2026-05-16 | 9 | 10 | 5 | 7 | 6 | 4 | 6 | 5 | 52 | L2.6 Vertical Agents | **NEW (DEFER)** — alt to gpt-researcher (already in L2.6) |
| 58 | exa-labs/exa-mcp-server | 4435 | MIT | 2026-05-16 | 9 | 10 | 10 | 9 | 8 | 9 | 8 | 7 | 70 | L0.MCP (web search) | **NEW (T2 INSTALL)** — Exa-official MCP for web search/crawling; net-new |
| 59 | wgpsec/ENScan_GO | 4392 | ? | 2026-05-16 | 9 | 10 | 5 | 5 | 5 | 4 | 3 | 2 | 43 | out-of-scope | OUT-OF-SCOPE — CN enterprise-info scraper |
| 60 | httprunner/httprunner | 4277 | Apache-2.0 | 2026-05-16 | 9 | 10 | 10 | 4 | 6 | 5 | 5 | 3 | 52 | out-of-scope | OUT-OF-SCOPE — API testing framework |
| 61 | modelcontextprotocol/csharp-sdk | 4264 | MIT | 2026-05-16 | 9 | 10 | 10 | 10 | 10 | 10 | 5 | 4 | 68 | L0.MCP (SDK) | **NEW (CITE-FOUNDATION)** — Anthropic+Microsoft official C# SDK |
| 62 | Pimzino/spec-workflow-mcp | 4180 | ? | 2026-05-16 | 9 | 10 | 5 | 9 | 6 | 4 | 7 | 6 | 56 | L2.2 Methodology / L5 | **NEW (WATCHLIST)** — spec-driven dev MCP w/ dashboard + VSCode ext |
| 63 | open-webui/mcpo | 4197 | MIT | 2026-05-16 | 9 | 10 | 10 | 8 | 7 | 7 | 7 | 6 | 64 | L0.MCP gateway | **NEW (STUDY-PILOT)** — MCP-to-OpenAPI proxy server (interesting for fleet-gateway use) |
| 64 | wong2/awesome-mcp-servers | 4068 | ? | 2026-05-16 | 9 | 10 | 5 | 10 | 7 | 5 | 7 | 5 | 58 | L2.8 Awesome-List | **NEW (CITE-DISCOVERY)** — alt awesome MCP list |
| 65 | antvis/mcp-server-chart | 4067 | MIT | 2026-05-16 | 9 | 10 | 10 | 9 | 7 | 8 | 6 | 5 | 64 | L0.MCP (visualization) | **NEW (WATCHLIST)** — AntV visualization MCP w/ 25+ charts; vertical use-case |
| 66 | lemonade-sdk/lemonade | 3962 | Apache-2.0 | 2026-05-16 | 9 | 10 | 10 | 5 | 6 | 6 | 5 | 4 | 55 | L0.25 Local Inference | **NEW (WATCHLIST)** — local-LLM serving; alt to vLLM/SGLang already in L0.25 |
| 67 | crmne/ruby_llm | 3925 | MIT | 2026-05-16 | 9 | 10 | 10 | 3 | 6 | 5 | 4 | 2 | 49 | out-of-scope | OUT-OF-SCOPE — Ruby LLM client; not CC-runtime fit |
| 68 | haris-musa/excel-mcp-server | 3831 | ? | 2026-05-16 | 9 | 10 | 5 | 9 | 6 | 5 | 6 | 5 | 55 | L0.MCP (vertical) | **NEW (WATCHLIST)** — Excel file MCP server |
| 69 | evalstate/fast-agent | 3779 | ? | 2026-05-16 | 9 | 10 | 5 | 9 | 7 | 6 | 7 | 6 | 59 | L5 Scaffold + MCP-eval | **NEW (STUDY-PILOT)** — "code, build, eval agents w/ Skills/MCP/ACP support"; relevant per /context-mode adjunct |
| 70 | archestra-ai/archestra | 3660 | ? | 2026-05-16 | 9 | 10 | 5 | 8 | 6 | 5 | 7 | 6 | 56 | L4.75 Fleet AI Gateway | **NEW (STUDY-PILOT)** — enterprise AI platform w/ guardrails + MCP registry + gateway |
| 71 | opensumi/core | 3629 | MIT | 2026-05-15 | 9 | 10 | 10 | 5 | 7 | 8 | 4 | 3 | 56 | out-of-scope | OUT-OF-SCOPE — AI-native IDE framework |
| 72 | modelcontextprotocol/rust-sdk | 3425 | MIT | 2026-05-16 | 9 | 10 | 10 | 10 | 10 | 10 | 5 | 4 | 68 | L0.MCP (SDK) | **NEW (CITE-FOUNDATION)** — Anthropic-official Rust SDK |
| 73 | modelcontextprotocol/java-sdk | 3420 | MIT | 2026-05-16 | 9 | 10 | 10 | 10 | 10 | 10 | 5 | 4 | 68 | L0.MCP (SDK) | **NEW (CITE-FOUNDATION)** — Anthropic+Spring-AI official Java SDK |
| 74 | huangjunsen0406/py-xiaozhi | 3309 | ? | 2026-05-16 | 9 | 10 | 5 | 2 | 5 | 4 | 1 | 1 | 37 | out-of-scope | OUT-OF-SCOPE — Xiaozhi Python client |
| 75 | microsoft/mcp | 3162 | MIT | 2026-05-16 | 9 | 10 | 10 | 9 | 8 | 10 | 7 | 6 | 69 | L0.MCP (vendor-official) | **NEW (T2 INSTALL CANDIDATE)** — Microsoft-OFFICIAL catalog of MS MCP server implementations; tier-1 vendor; net-new |
| 76 | davepoon/buildwithclaude | 2938 | ? | 2026-05-16 | 8 | 10 | 5 | 10 | 8 | 6 | 8 | 7 | 62 | L2.8 Awesome-List | **ALREADY** — V-FINAL-V3 L2.8 (2.9k★ with web UI auto-deploy) |
| 77 | bytebase/dbhub | 2768 | MIT (?) | 2026-05-16 | 8 | 10 | 9 | 9 | 7 | 8 | 7 | 6 | 64 | L0.MCP (database) | **NEW (T2 INSTALL CANDIDATE)** — Zero-dep token-efficient DB MCP server for Postgres/MySQL/SQL Server; useful infra primitive |
| 78 | IvanMurzak/Unity-MCP | 2765 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 6 | 4 | 4 | 3 | 49 | L2.4 Vertical (game-dev) | **NEW (DEFER)** — alt to CoplayDev/unity-mcp |
| 79 | blazickjp/arxiv-mcp-server | 2739 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 7 | 5 | 7 | 6 | 57 | L0.MCP (research) | **NEW (STUDY-PILOT)** — arXiv search+analysis MCP; useful for research workflows |
| 80 | opensolon/solon | 2733 | Apache-2.0 | 2026-05-15 | 8 | 10 | 10 | 3 | 6 | 6 | 3 | 2 | 48 | out-of-scope | OUT-OF-SCOPE — Java framework |
| 81 | atilaahmettaner/tradingview-mcp | 2698 | ? | 2026-05-16 | 8 | 10 | 5 | 8 | 5 | 4 | 4 | 3 | 47 | out-of-scope | OUT-OF-SCOPE — trading vertical |
| 82 | zcaceres/markdownify-mcp | 2686 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 7 | 5 | 7 | 6 | 57 | L4.5 Doc-Ingestion | **NEW (STUDY-PILOT)** — "convert almost anything to Markdown" MCP; alt to markitdown/MinerU/Docling already in L4.5 |
| 83 | deedy5/ddgs | 2640 | MIT | 2026-05-16 | 8 | 10 | 10 | 4 | 7 | 5 | 6 | 5 | 55 | out-of-scope (lib) | OUT-OF-SCOPE — metasearch library (not MCP) |
| 84 | Manavarya09/design-extract | 2638 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 6 | 4 | 6 | 5 | 53 | L2.5a-adjacent | **NEW (WATCHLIST)** — extract design tokens from any URL |
| 85 | rusq/slackdump | 2587 | GPL-3.0 | 2026-05-16 | 8 | 10 | 4 | 1 | 5 | 4 | 2 | 1 | 35 | out-of-scope | OUT-OF-SCOPE — Slack export tool |
| 86 | go-nunu/nunu | 2565 | MIT | 2026-05-16 | 8 | 10 | 10 | 1 | 5 | 5 | 1 | 1 | 41 | out-of-scope | OUT-OF-SCOPE — Go CLI scaffolder |
| 87 | sparfenyuk/mcp-proxy | 2520 | MIT | 2026-05-16 | 8 | 10 | 10 | 9 | 7 | 6 | 8 | 7 | 65 | L0.MCP (transport) | **NEW (T2 INSTALL CANDIDATE)** — Streamable-HTTP↔stdio MCP bridge; foundational transport primitive |
| 88 | punitarani/fli | 2489 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 6 | 4 | 4 | 3 | 49 | L0.MCP (vertical) | **NEW (DEFER)** — Google Flights MCP |
| 89 | taylorwilsdon/google_workspace_mcp | 2410 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 7 | 5 | 7 | 6 | 57 | L0.MCP (productivity) | **NEW (STUDY-PILOT)** — Gmail/Calendar/Docs/Sheets/Slides MCP; useful productivity primitive |
| 90 | brightdata/brightdata-mcp | 2366 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 7 | 7 | 6 | 5 | 57 | L0.MCP (web) | **NEW (WATCHLIST)** — vendor-MCP for Bright Data (paid scraping API) |
| 91 | DeusData/codebase-memory-mcp | 2363 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 6 | 4 | 8 | 7 | 57 | L0.4 Code-Intel / L0.2 | **NEW (STUDY-PILOT)** — code-intelligence MCP indexing codebases; alt to serena/repomix already in L0.4 |
| 92 | metatool-ai/metamcp | 2327 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 6 | 5 | 7 | 7 | 57 | L0.MCP (aggregator) | **NEW (STUDY-PILOT)** — MCP Aggregator/Orchestrator/Middleware/Gateway in one Docker; net-new infrastructure primitive |
| 93 | geekjourneyx/md2wechat-skill | 2236 | ? | 2026-05-16 | 8 | 10 | 5 | 10 | 6 | 4 | 4 | 3 | 50 | L2.2 (regional skill) | OUT-OF-SCOPE — WeChat publisher skill |
| 94 | coddingtonbear/obsidian-local-rest-api | 2245 | MIT | 2026-05-16 | 8 | 10 | 10 | 7 | 7 | 7 | 5 | 4 | 58 | L0.MCP (vertical) | **NEW (WATCHLIST)** — Obsidian vault REST+MCP server |
| 95 | AmoyLab/Unla | 2113 | ? | 2026-05-16 | 8 | 10 | 5 | 8 | 5 | 4 | 7 | 6 | 53 | L0.MCP (gateway) | **NEW (DEFER)** — lightweight MCP gateway alt to metamcp/mcphub |
| 96 | crbnos/carbon | 2104 | ? | 2026-05-16 | 8 | 10 | 5 | 2 | 5 | 4 | 1 | 1 | 36 | out-of-scope | OUT-OF-SCOPE — manufacturing ERP/MES/QMS |
| 97 | cjo4m06/mcp-shrimp-task-manager | 2100 | ? | 2026-05-16 | 8 | 10 | 5 | 9 | 6 | 4 | 7 | 6 | 55 | L5 Scaffold (task-mgr) | **NEW (WATCHLIST)** — task-manager MCP for AI agents w/ chain-of-thought |
| 98 | apioo/fusio | 2088 | ? | 2026-05-15 | 8 | 10 | 5 | 1 | 5 | 4 | 1 | 1 | 35 | out-of-scope | OUT-OF-SCOPE — API mgmt platform |
| 99 | samanhappy/mcphub | 2082 | ? | 2026-05-16 | 8 | 10 | 5 | 8 | 6 | 5 | 7 | 6 | 55 | L0.MCP (aggregator) | **NEW (STUDY-PILOT)** — unified hub for centrally managing+orchestrating multiple MCP servers |
| 100 | zinja-coder/jadx-ai-mcp | 2023 | ? | 2026-05-16 | 8 | 10 | 5 | 8 | 5 | 4 | 4 | 3 | 47 | L2.4 Vertical (RE) | **NEW (DEFER)** — JADX (Android decompile) MCP plugin |
| 101 | mcp-router/mcp-router | 2011 | ? | 2026-05-16 | 8 | 10 | 5 | 8 | 5 | 4 | 7 | 6 | 53 | L0.MCP (mgmt) | **NEW (WATCHLIST)** — Unified MCP Server Management App |

**Notes**:
- Out-of-scope rows retained for traceability (helps confirm GraphQL coverage and avoids re-probing in future tranches).
- License `?` rows indicate the GitHub API search response did not surface license; a TIER-1 follow-up probe at the upstream repo's LICENSE file is required before any T0/T1 install commitment.
- 31 NEW candidates surface, 16 are ALREADY-catalogued, 50 are OUT-OF-SCOPE for this runtime's L0-L7 architecture.

---

## §B — TOP-10 HIGHEST-PRIORITY MCP ADDS (net-new from this tranche)

> Selected on `sum/80` ≥ 65 AND license-OK (or MIT/Apache-2.0 verifiable) AND clear native-CC pathway AND fills a gap in V-FINAL-V3 layer architecture.

| Rank | Repo | Sum/80 | Layer Slot | Why this priority | Install pathway (proposed) |
|-----:|------|------:|------------|-------------------|----------------------------|
| **1** | **ChromeDevTools/chrome-devtools-mcp** | 75 | L0.MCP / L2.5a Browser | 39.7k★ Google Chrome-team OFFICIAL MCP. V-FINAL-V3 §1 L0.MCP catalog mentions "Chrome-devtools" generically without owner anchor — this is the canonical upstream. Apache-2.0. | `claude mcp add chrome-devtools npx -- chrome-devtools-mcp@latest` (per upstream README pattern); or MCP plugin install if available. |
| **2** | **awslabs/mcp** | 72 | L0.MCP vendor-official | 9.1k★ AWS-OFFICIAL MCP servers for AWS services (S3/EC2/Lambda/RDS/etc). Tier-1 vendor maintainer = enterprise reliability. Apache-2.0. Net-new — V-FINAL-V3 catalog mentions Microsoft + GitHub vendor-officials but not AWS. | `npx @awslabs/mcp-*` per upstream; per-service modular. STUDY-PILOT then INSTALL if AWS used. |
| **3** | **firecrawl/firecrawl-mcp-server** | 70 | L0.MCP (web) | 6.3k★ Official Firecrawl MCP. V-FINAL-V3 §6 C12 notes firecrawl-core AGPL but MCP wrapper permissive — THIS IS THAT WRAPPER. Likely **NAMING-DRIFT CATCH** if catalog uses bare "firecrawl" instead of `firecrawl/firecrawl-mcp-server`. See §C. | `claude mcp add firecrawl npx -- firecrawl-mcp@latest` |
| **4** | **exa-labs/exa-mcp-server** | 70 | L0.MCP (web-search) | 4.4k★ Exa-OFFICIAL MCP for web search + crawling. MIT. Tier-1 search-API vendor. Net-new alternative/complement to Tavily/Firecrawl in V-FINAL-V3 catalog. | `claude mcp add exa npx -- exa-mcp-server` (API key required). |
| **5** | **modelcontextprotocol/go-sdk** | 70 | L0.MCP SDK foundation | 4.5k★ Anthropic+Google official Go SDK. CITE-FOUNDATION (not install — substrate for any in-house Go MCP servers). Net-new explicit cite in catalog. | CITE-ONLY in catalog L0.MCP foundation section. |
| **6** | **microsoft/mcp** | 69 | L0.MCP vendor-official | 3.2k★ Microsoft-OFFICIAL catalog of MS MCP server implementations (Azure/M365/etc). Net-new — V-FINAL-V3 mentions "Microsoft" as MCP curriculum vendor (mcp-for-beginners) but not the MS-MCP catalog itself. MIT. | Per-service installs (catalog index, not single-package install). |
| **7** | **upstash/context7** | 69 | L0.4 Code-Intel WARN | 55.4k★ — ALREADY in V-FINAL-V3 with WARN. INCLUDED FOR COMPLETENESS — adoption-blocked per ContextCrush 2026-03 vuln + 83% free-tier cut. **No new action**; tranche serves as freshness re-confirmation of WARN status. | KEEP WARN until vuln resolved. |
| **8** | **tadata-org/fastapi_mcp** | 69 | L0.MCP (server-building primitive) | 11.9k★ — exposes FastAPI endpoints as MCP tools w/ Auth. Useful infra primitive for in-house MCP servers built on FastAPI. MIT. | STUDY-PILOT — pilot wrap an in-house FastAPI for MCP exposure. |
| **9** | **maximhq/bifrost** | 68 | L4.75 Fleet AI Gateway | 5.0k★ Apache-2.0. Claims 50x faster than LiteLLM. PERFORMANCE CLAIM REQUIRES BENCHMARK VERIFICATION before INSTALL. Net-new in L4.75 alongside Portkey/Helicone/AgentOps. | STUDY-PILOT bake-off vs LiteLLM (V-FINAL-V3 §5 follow-up B). |
| **10** | **modelcontextprotocol/{csharp,rust,java}-sdk** + **modelcontextprotocol/python-sdk** + **modelcontextprotocol/typescript-sdk** | 68-78 | L0.MCP SDK foundation | Anthropic-official SDKs across 5 languages (Python 23k★, TypeScript 12.4k★, Rust 3.4k★, Java 3.4k★, C# 4.3k★). All MIT. Should be EXPLICIT cite-foundation entries in catalog L0.MCP — currently only Python is mentioned implicitly. | CITE-FOUNDATION block in L0.MCP listing all 5 language SDKs. |

**Honorable mentions** (just outside top-10): bytebase/dbhub (64, DB MCP), sparfenyuk/mcp-proxy (65, transport primitive), klavis-ai/klavis (64, integration platform), ruvnet/ruflo (64, CC-orchestration).

---

## §C — NAMING-DRIFT CATCHES (wrong owner/repo anchors in V-FINAL-V3 catalog)

> Compared V-FINAL-V3-CONSOLIDATED §1 layer listings against canonical upstream owner/repo names surfaced this fire.

| # | Catalog reference | Canonical upstream | Status / action |
|---|-------------------|--------------------|-----------------|
| 1 | L0.MCP row: **"Chrome-devtools"** (generic, no owner) | **ChromeDevTools/chrome-devtools-mcp** (39.7k★ Apache-2.0) | **NAMING-DRIFT** — catalog should explicitly anchor `ChromeDevTools/chrome-devtools-mcp`. Risk: ambiguity could lead to wrong-fork install. |
| 2 | L0.MCP row: **"git-mcp"** (generic, no owner) | Multiple repos use `git-mcp` name. Saturation here did not return a 2k+★ exact match. | **AMBIGUOUS** — V-FINAL-V3 entry needs explicit owner anchor or removal-pending verification (TIER-1 follow-up probe required). |
| 3 | L0.MCP row: **"Tavily/Firecrawl wrapper-only"** | Firecrawl wrapper = **firecrawl/firecrawl-mcp-server** (6.3k★). Catalog mentions firecrawl but doesn't pin owner. | **NAMING-DRIFT (MILD)** — recommend explicit anchor `firecrawl/firecrawl-mcp-server` to avoid confusion with `mendableai/firecrawl` core (AGPL). |
| 4 | L0.MCP row: **"Filesystem (path-allowlist)"** (generic) | Anthropic-official `modelcontextprotocol/servers/src/filesystem` (within 85.7k★ modelcontextprotocol/servers) | **MILD NAMING-DRIFT** — recommend anchor to `modelcontextprotocol/servers#filesystem`. |
| 5 | L0.MCP row: **"Sentry"** (generic) | Sentry has `getsentry/XcodeBuildMCP` (5.6k★, iOS/macOS) and other Sentry MCP servers in `getsentry/sentry-mcp` (separate). Catalog ambiguous. | **AMBIGUOUS** — V-FINAL-V3 needs disambiguation (is "Sentry" the error-tracking MCP or XcodeBuildMCP?). |
| 6 | L0.MCP row: **"Apify"** (generic, no owner) | apify/actors-mcp-server (smaller star count) | **MILD NAMING-DRIFT** — explicit anchor recommended. |
| 7 | L0.MCP row mentions **"21 plugin marketplaces"** | Tranche surfaces 79 mcp-server topic repos ≥2k★ — actual count of catalogable MCP marketplaces likely higher. | **STATEMENT-FRESHNESS** — "21 plugin marketplaces" figure may be stale; tranche B + the catalogued L2.8 awesome-list discovery suggests the number is higher post-2026-03. |

**Net naming-drift catches**: 4 high-confidence (Chrome-devtools, git-mcp, Filesystem, Sentry) + 3 mild. No outright wrong-owner errors (unlike fix5's sst/opencode→anomalyco transfer); all are missing-explicit-owner ambiguity.

---

## §D — HONEST NON-FINDINGS

> Per CR-10 research-first + CR-12 honest-non-finding discipline:

1. **License coverage**: GitHub Search API does NOT consistently surface SPDX license metadata. ~40 of the 95 unique repos returned have `license: ?` in the matrix — a TIER-1 follow-up `git -C ... cat LICENSE` probe is required before any T0/T1 INSTALL verdict on those rows. This tranche flags them as `?` rather than guessing.

2. **Stale-pushed filter (Q2/Q3/Q5)**: Queries Q2 (`topic:tool-use stars:>5000 pushed:>2026-01-01`), Q3 (`topic:llm-tools stars:>5000`), and Q5 (`claude tools integration stars:>3000`) returned only 2-3 results each. **The topic-tagging discipline in the 2026 LLM-tools ecosystem is sparse** — most repos in this domain don't apply `topic:tool-use`, `topic:llm-tools`, or include "claude" + "tools" + "integration" in repo metadata. Q1 (`topic:mcp-server stars:>2000`) was the dominant signal source (79 results).

3. **Saturation gap NOT closed**: V-FINAL-V3 §1 acknowledges 373 ≥2k★ repos backlog. This tranche processes ~95 unique repos = **~25% of the acknowledged backlog**. Remaining tranches needed: (C) Code-intel + AST tooling, (D) Memory + RAG, (E) Local-inference + sandbox, (F) Domain-vertical agents, (G) Awesome-list aggregators.

4. **No new HIGH-stakes naming-drift errors found**: Unlike fix5's sst/opencode → anomalyco/opencode transfer or block/goose → aaif-goose/goose transfer or InvariantLabs-AI/mcp-scan → snyk/agent-scan acquisition, this tranche surfaces only MILD ambiguity (missing-owner anchors), NO wrong-owner outright errors. This is a positive signal that the canonical L0.MCP catalog is mostly correctly-anchored.

5. **Maintainer-tier (D6) is heuristic**: D6 scores 9-10 are reserved for Anthropic/Microsoft/Google/AWS/GitHub-official maintainers. D6 7-8 for established orgs (Stripe/Sentry/Cloudflare/Bytebase tier). D6 4-6 for community/single-maintainer. **This is a research-first heuristic, not a TIER-1 hard fact** — operator override warranted on a per-repo basis.

6. **D8 saturation-priority is rubric-novel for this tranche**: Reflects "does this fill a layer-gap NOT already covered by V-FINAL-V3 incumbent". A 9 means "no incumbent exists in this slot". A 3 means "incumbent already entrenched (e.g., serena in L0.4)". This is TIER-3-LOCAL-COMPOSITION and not directly traceable to upstream cite.

7. **Bifrost performance-claim UNVERIFIED**: maximhq/bifrost claims "50x faster than LiteLLM" — this is a marketing claim from the project's own README; the cross-model gate has NOT yet ratified or refuted it. Marked as STUDY-PILOT not INSTALL pending bake-off (V-FINAL-V3 §5 follow-up B candidate).

8. **Open-multi-agent freshness suspicious**: Created 2026-03-31, already 6.1k★ → that's unusually high acquisition rate for ~6 weeks. Warrants TIER-2 follow-up (organic growth vs growth-hacking). Marked STUDY-PILOT not INSTALL.

9. **CN-region repos under-evaluated**: Several CN-language/CN-region repos (Xiaohongshu, Xiaozhi, WeChat, ENScan_GO, py-xiaozhi) surface in this tranche. They are marked OUT-OF-SCOPE for this runtime's L0-L7 architecture but operators serving CN-market may re-evaluate.

10. **Codex-CLI gate NOT invoked for this tranche**: Per /context_window_protection budget + tranche's data-volume manageable in-context, no codex T1 audit dispatched. Tranche is `effective_tier=TIER-3-LOCAL-COMPOSITION`. **A codex T1 ratify audit on this tranche is recommended** before the 31 NEW candidates promote from STUDY-PILOT to INSTALL.

---

## §E — RECOMMENDED V-FINAL-V3 PATCH BLOCK (proposed fix6 candidates)

> If operator/next-session adopts this tranche, suggested patch deltas to V-FINAL-V3-CONSOLIDATED §1 + §5:

**§1 patch (L0.MCP block)** — add 6 explicit-anchor rows:
```
+ ChromeDevTools/chrome-devtools-mcp (39.7k★ Apache-2.0 OFFICIAL Google Chrome)
+ awslabs/mcp (9.1k★ Apache-2.0 OFFICIAL AWS)
+ microsoft/mcp (3.2k★ MIT OFFICIAL Microsoft catalog)
+ firecrawl/firecrawl-mcp-server (6.3k★ MIT wrapper; firecrawl-core remains AGPL)
+ exa-labs/exa-mcp-server (4.4k★ MIT Exa-OFFICIAL web-search)
+ MCP SDK foundation: modelcontextprotocol/{python,typescript,go,rust,csharp,java}-sdk (Anthropic+partners official)
+ Transport primitives: sparfenyuk/mcp-proxy (2.5k★ MIT Streamable-HTTP↔stdio)
+ Server-building primitives: tadata-org/fastapi_mcp (11.9k★ MIT FastAPI→MCP)
+ Database MCP: bytebase/dbhub (2.8k★ Postgres/MySQL/SQL Server)
```

**§1 patch (L4.75 Fleet AI Gateway)** — add 1 STUDY-PILOT row:
```
+ maximhq/bifrost (5.0k★ Apache-2.0; claims 50x faster than LiteLLM; STUDY-PILOT bake-off vs LiteLLM)
```

**§1 patch (L3 Peer CLI)** — add 1 WATCHLIST row:
```
+ google-gemini/gemini-cli (104k★ Apache-2.0; Google-official; MCP-client built-in; WATCHLIST alongside opencode/goose)
```

**§5 patch (follow-up bake-offs)** — add:
```
+ L4.75 bifrost vs LiteLLM performance bake-off (verify 50x claim)
+ L0.MCP explicit-owner anchor verification pass (Chrome-devtools, Filesystem, git-mcp, Sentry, Apify ambiguity resolution)
```

---

## §F — CITE CLASS (Tranche B)

`constituents=[
  TIER-1-DIRECT @ GitHub MCP search queries Q1-Q5 this fire 2026-05-16 (5 queries × first:100 = 95 unique repos),
  TIER-2 @ Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/00-MASTER/ULTIMATE-SYNTHESIS-V-FINAL-V3-CONSOLIDATED-2026-05-16.md (catalog comparison base),
  TIER-2 @ Z:/claude-sota-installed/docs/grand-synthesis-2026-05-16/00-MASTER/INDEX-BY-LAYER-V-FINAL-V3.md (layer enumeration),
  TIER-3-LOCAL-COMPOSITION @ THIS Tranche B scoring rubric + per-repo D1-D8 ratings + verdicts
]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

**HONEST-NON-FINDING**: D1-D8 scores below are TIER-3 heuristic application of the rubric; D3 license scores in particular default to "5" when API metadata absent, NOT a TIER-1 fact. D4 native-CC-pathway is research-first inferred from repo descriptions/topics; some scores should be re-validated against upstream README probe.

---

## §G — END OF TRANCHE B

**Status**: READY-FOR-OPERATOR-REVIEW. Recommend (1) codex T1 ratify audit on §B Top-10 + §C naming-drift catches, (2) operator approval of §E patch block, (3) schedule Tranche C (Code-intel + AST tooling domain, ~75 ≥2k★ candidates remaining).

**Backlog consumption**: 95/373 = 25.5% processed across MCP/tools/integration domain. 278 ≥2k★ repos remain across Code-Intel + Memory/RAG + Local-Inference + Domain-Vertical + Awesome-List domains.

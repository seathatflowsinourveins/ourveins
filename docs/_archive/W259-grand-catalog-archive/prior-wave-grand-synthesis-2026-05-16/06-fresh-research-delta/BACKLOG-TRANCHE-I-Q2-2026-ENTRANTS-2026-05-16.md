# BACKLOG TRANCHE I — Q2-2026 New Entrants (Saturation Sweep)

Date: 2026-05-16
Owner: claude-sota-installed grand-synthesis effort
Scope: Repositories created or substantially grown in 2026-Q2 (created:>2026-03-01) — i.e. the 75-day window from 2026-03-01 to 2026-05-16. This is the "freshness frontier" — anything appearing here is younger than every primitive currently on the install manifest.

## Method

GraphQL/REST searches executed via `mcp__github__search_repositories` against `api.github.com` on 2026-05-16:

| # | Query | Total matches | Sampled |
|--:|---|---:|---:|
| Q1 | `stars:>500 created:>2026-03-01 topic:claude-code OR topic:claude OR topic:anthropic` | 113 (claude-code) | 100 |
| Q2 | `stars:>1000 created:>2026-03-01 topic:llm OR topic:ai-agent` | 53 (llm) + 29 (ai-agent) | 82 |
| Q3 | `stars:>1000 pushed:>2026-05-01 topic:mcp OR topic:mcp-server` | 289 (mcp) | 100 (only ~5 created in Q2) |
| Q4 | `stars:>500 created:>2026-04-01 topic:agentic OR topic:agent-framework` | 2 + 5 | 7 |
| Q5 | `stars:>5000 pushed:>2026-05-08 topic:llm OR topic:ai` | 209 (llm) | 100 (only ~10 created in Q2) |
| Q6 | `stars:>500 created:>2026-04-01 topic:mcp-server` | 7 | 7 |
| Q7 | `stars:>500 created:>2026-03-01 topic:anthropic` | 28 | 28 |

After deduplication by full_name across Q1-Q7 with `created_at >= 2026-03-01`, the corpus is **106 distinct Q2-2026 entrants** at star ≥500. The matrix below shows 60+ rows; the long tail at 500-700 stars is summarized in §A2.

D1-D8 scoring follows the rubric used in the saturation series (D1 install-ability, D2 freshness/momentum, D3 install-priority alignment, D4 cardinal-rule fit, D5 mechanism-novel-content, D6 risk, D7 reversibility, D8 operator-class fit). D2 ceiling-pinned at 10 for the entire corpus because everything is ≤75 days old; D2 differentiation collapses; D3 and D5 do the discriminating work.

## §A — New entrant matrix (60+ rows)

Legend
- `D2`: freshness/momentum (created:>2026-03-01 + ongoing weekly star velocity) — pinned at 9-10 across the corpus by definition
- `D3`: install-priority alignment with W254 §3 set (5 = directly extends installed plugin; 1 = parallel/incompatible mechanism)
- `D5`: mechanism-novel-content vs existing W258 manifest entries (5 = primitive not yet seen; 1 = pure dup of existing P0 INSTALL)
- `Verdict`: `INSTALL-CANDIDATE` / `WATCH` / `STUDY` / `REJECT-NOISE` / `REJECT-DUP`
- `Risk`: `R-LOW` (npm/marketplace, MIT, >1 maintainer) / `R-MED` (single-maintainer or fast-rebase) / `R-HIGH` (leaked-code claim, dropship, suspicious provenance)

### §A1 — Top 60 ranked by stars (Q2-2026 entrants only)

| # | Stars | Created | Repo | D2 | D3 | D5 | Primitive class | Risk | Verdict |
|--:|------:|---|---|--:|--:|--:|---|---|---|
| 1 | 60,937 | 2026-04-04 | `JuliusBrussee/caveman` | 10 | 4 | 4 | Skill: token-reduction via persona-prompting (65% claim) | R-LOW | STUDY (claim verification needed; meme-vector risk) |
| 2 | 52,308 | 2026-04-05 | `MemPalace/mempalace` | 10 | 5 | 5 | Memory system (claims best-benchmarked OSS, MCP-shaped) | R-LOW | INSTALL-CANDIDATE (P0) — direct compete to mem0/Graphiti incumbents |
| 3 | 48,500 | 2026-04-03 | `safishamsi/graphify` | 10 | 4 | 4 | Skill: codebase→knowledge-graph (Leiden community detection) | R-LOW | INSTALL-CANDIDATE (P1) — complements installed Graphiti, different graph model |
| 4 | 44,992 | 2026-04-04 | `santifer/career-ops` | 10 | 2 | 2 | Vertical agent (job search) — 14-skill suite | R-LOW | REJECT-NOISE (out-of-domain for harness work) |
| 5 | 18,579 | 2026-03-10 | `heygen-com/hyperframes` | 10 | 3 | 4 | Skill: HTML→video rendering for agents (HeyGen-backed) | R-LOW | WATCH (corporate-backed; multimodal lane) |
| 6 | 14,865 | 2026-03-13 | `JCodesMore/ai-website-cloner-template` | 10 | 2 | 1 | Template repo (single command web cloning) | R-MED | REJECT-NOISE (template, not primitive) |
| 7 | 14,835 | 2026-03-15 | `Lum1104/Understand-Anything` | 10 | 4 | 4 | Skill: knowledge→teaching graphs (Karpathy LLM-wiki pattern) | R-LOW | INSTALL-CANDIDATE (P1) — Karpathy-aligned |
| 8 | 13,026 | 2026-04-18 | `kyegomez/OpenMythos` | 10 | 1 | 2 | Speculative-architecture reconstruction (kyegomez authorship) | R-HIGH | REJECT-NOISE (kyegomez known speculative-fic; FM-class risk per W229+ historical) |
| 9 | 11,236 | 2026-03-06 | `jnMetaCode/agency-agents-zh` | 10 | 3 | 3 | Skill: 211 agent persona library (zh, multi-CLI) | R-LOW | WATCH (compete to wshobson/agents — incumbent installed; zh-only is gap-niche) |
| 10 | 9,635 | 2026-03-31 | `Kuberwastaken/claurst` | 10 | 2 | 2 | Coding-agent harness (alternative CLI) | R-MED | REJECT-DUP (Claude Code re-implementation; competes with CC itself) |
| 11 | 9,476 | 2026-03-10 | `wanshuiyin/Auto-claude-code-research-in-sleep` (ARIS) | 10 | 4 | 4 | Skill: autonomous ML research / cross-model review loops | R-LOW | INSTALL-CANDIDATE (P1) — complements existing autoresearch pattern |
| 12 | 9,203 | 2026-04-23 | `op7418/guizang-ppt-skill` | 10 | 3 | 3 | Skill: HTML slide deck generation (vertical multimodal) | R-LOW | WATCH (vertical-creative lane) |
| 13 | 7,795 | 2026-03-18 | `rohitg00/ai-engineering-from-scratch` | 10 | 1 | 1 | Tutorial/curriculum | R-LOW | REJECT-NOISE (docs, not primitive) |
| 14 | 7,434 | 2026-04-01 | `HKUDS/Vibe-Trading` | 10 | 1 | 2 | Vertical agent (trading) | R-LOW | REJECT-NOISE (out-of-domain) |
| 15 | 6,741 | 2026-04-10 | `yizhiyanhua-ai/fireworks-tech-graph` | 10 | 3 | 3 | Skill: SVG diagram generation from natural language | R-LOW | WATCH (visual-rendering lane) |
| 16 | 6,554 | 2026-04-13 | `getagentseal/codeburn` | 10 | 4 | 3 | Tool: TUI dashboard for Claude Code / Codex token spend | R-LOW | INSTALL-CANDIDATE (P2) — observability gap-filler |
| 17 | 6,153 | 2026-03-31 | `open-multi-agent/open-multi-agent` | 10 | 3 | 4 | TypeScript multi-agent orchestration with MCP + live tracing | R-LOW | INSTALL-CANDIDATE (P1) — extends agent-teams pattern |
| 18 | 5,968 | 2026-04-18 | `OpenCoworkAI/open-codesign` | 10 | 2 | 2 | Vertical app (design alternative) | R-LOW | REJECT-NOISE (out-of-domain) |
| 19 | 5,627 | 2026-03-22 | `holaboss-ai/holaOS` | 10 | 2 | 3 | Agent-OS / runtime (electron, MCP) | R-MED | WATCH (rival harness; not install-able into existing CC) |
| 20 | 5,059 | 2026-04-07 | `AgriciDaniel/claude-obsidian` | 10 | 4 | 3 | Skill: Obsidian-backed compounding wiki (Karpathy-pattern) | R-LOW | INSTALL-CANDIDATE (P2) — complements karpathy-skills installed |
| 21 | 4,797 | 2026-03-12 | `tw93/Waza` | 10 | 4 | 3 | Skill collection: engineering habits → Claude-runnable | R-LOW | INSTALL-CANDIDATE (P2) — complements obra/superpowers |
| 22 | 4,487 | 2026-03-13 | `uditgoenka/autoresearch` | 10 | 4 | 3 | Skill: autonomous goal-directed iteration | R-LOW | WATCH (overlap with addy-agent-skills/source-driven-dev) |
| 23 | 3,396 | 2026-03-26 | `revfactory/harness` | 10 | 4 | 4 | Meta-skill: designs domain-specific agent teams | R-LOW | INSTALL-CANDIDATE (P1) — meta-orchestration; complements agent-teams plugin |
| 24 | 3,282 | 2026-03-31 | `lintsinghua/claude-code-book` | 10 | 1 | 3 | Book/docs (Chinese, 42-万字 deep dive on Claude Code) | R-LOW | STUDY (citation source only — not installable) |
| 25 | 3,256 | 2026-03-20 | `jnMetaCode/superpowers-zh` | 10 | 3 | 2 | Localization fork of superpowers (zh) | R-LOW | REJECT-DUP (already running upstream obra/superpowers) |
| 26 | 3,208 | 2026-03-31 | `yasasbanukaofficial/claude-code` | 10 | 0 | 0 | "Leaked source" claim (topic: leaked-claude-code) | R-HIGH | REJECT-NOISE (TOS/legal risk + provenance fraud risk) |
| 27 | 3,135 | 2026-03-31 | `oboard/claude-code-rev` | 10 | 0 | 0 | "Runnable ClaudeCode source code" — same family as #26 | R-HIGH | REJECT-NOISE (same leaked-code class) |
| 28 | 2,791 | 2026-03-31 | `motiful/cc-gateway` | 10 | 2 | 3 | Reverse proxy that normalizes device fingerprints | R-HIGH | REJECT-NOISE (TOS evasion / multi-account abuse pattern) |
| 29 | 2,669 | 2026-03-31 | `codeany-ai/open-agent-sdk-typescript` | 10 | 3 | 3 | Open SDK alternative to claude-agent-sdk | R-MED | WATCH (architectural-fork; not yet stable enough to install) |
| 30 | 2,626 | 2026-03-26 | `nicedreamzapp/claude-code-local` | 10 | 2 | 4 | MLX-native local Anthropic-API server (Apple-silicon) | R-LOW | WATCH (platform-niche; Mac-only) |
| 31 | 2,605 | 2026-03-31 | `codeaashu/claude-code` | 10 | 0 | 0 | Another "leaked" Claude Code clone | R-HIGH | REJECT-NOISE (same family as #26/#27 — saturation noise pattern) |
| 32 | 2,569 | 2026-03-17 | `stablyai/orca` | 10 | 4 | 4 | IDE for parallel agent fleets (any coding agent) | R-LOW | INSTALL-CANDIDATE (P2) — complements superpowers using-git-worktrees |
| 33 | 2,521 | 2026-03-05 | `op7418/Claude-to-IM-skill` | 10 | 3 | 3 | Skill: bridge Claude Code/Codex to IM platforms | R-LOW | WATCH (notifications lane) |
| 34 | 2,520 | 2026-03-18 | `rullerzhou-afk/clawd-on-desk` | 10 | 1 | 1 | Desktop pet (gimmick) | R-LOW | REJECT-NOISE (toy / D8-fit-zero) |
| 35 | 2,490 | 2026-03-08 | `FreedomIntelligence/OpenClaw-Medical-Skills` | 10 | 2 | 4 | Vertical skill library (medical) for OpenClaw | R-LOW | REJECT-DUP (OpenClaw ecosystem, not Claude Code) |
| 36 | 2,486 | 2026-03-15 | `collaborator-ai/collab-public` | 10 | 3 | 3 | Multi-agent collaboration platform | R-MED | WATCH |
| 37 | 2,372 | 2026-03-31 | `Windy3f3f3f3f/how-claude-code-works` | 10 | 0 | 3 | Source-code deep-dive docs | R-LOW | STUDY (citation source — like #24) |
| 38 | 2,369 | 2026-05-11 | `nexu-io/html-anything` | 10 | 3 | 3 | Skill: agentic HTML editor (75 skills × 9 surfaces) | R-LOW | WATCH (vertical-creative; 5 days old as of audit) |
| 39 | 2,303 | 2026-05-06 | `strukto-ai/mirage` | 10 | 4 | 5 | Unified virtual filesystem for AI agents (FUSE-based) | R-LOW | INSTALL-CANDIDATE (P1) — novel primitive: agent-filesystem layer |
| 40 | 2,262 | 2026-03-22 | `CoderLuii/HolyClaude` | 10 | 1 | 2 | Docker workstation (Claude Code + 7 CLIs + browser) | R-MED | REJECT-NOISE (container assembly, not primitive) |
| 41 | 2,231 | 2026-03-29 | `graykode/abtop` | 10 | 4 | 4 | htop-style monitor for Claude Code/Codex sessions | R-LOW | INSTALL-CANDIDATE (P2) — observability gap-filler (related to #16 codeburn) |
| 42 | 2,221 | 2026-04-18 | `VoltAgent/awesome-claude-design` | 10 | 2 | 2 | Awesome-list of design-system inspirations (DESIGN.md) | R-LOW | REJECT-NOISE (awesome-list class — already saturated) |
| 43 | 2,221 | 2026-04-20 | `cosmicstack-labs/mercury-agent` | 10 | 2 | 3 | "Soul-driven" agent w/ token budgets & multi-channel | R-MED | WATCH |
| 44 | 2,114 | 2026-03-08 | `shuvonsec/claude-bug-bounty` | 10 | 3 | 3 | Skill: bug-bounty hunting from terminal | R-LOW | WATCH (security-vertical) |
| 45 | 1,962 | 2026-03-07 | `romgX/openrelay` | 10 | 2 | 3 | Free LLM API quota aggregator (proxy) | R-HIGH | REJECT-NOISE (TOS evasion / quota-pump pattern) |
| 46 | 1,941 | 2026-03-13 | `himself65/finance-skills` | 10 | 2 | 3 | Vertical skill collection (financial analysis) | R-LOW | WATCH (vertical) |
| 47 | 1,919 | 2026-03-20 | `alvinreal/awesome-autoresearch` | 10 | 2 | 2 | Awesome-list | R-LOW | REJECT-NOISE (list, not primitive) |
| 48 | 1,855 | 2026-04-13 | `iamzhihuix/skills-manage` | 10 | 4 | 4 | Desktop app: manage skills across CC/Cursor/Gemini/Codex | R-LOW | INSTALL-CANDIDATE (P2) — skill-mgmt UX gap-filler |
| 49 | 1,716 | 2026-04-23 | `GammaLabTechnologies/harmonist` | 10 | 4 | 4 | Portable agent orchestration (186 agents, zero deps) | R-LOW | INSTALL-CANDIDATE (P2) — complements agent-teams |
| 50 | 1,701 | 2026-03-21 | `samber/cc-skills-golang` | 10 | 4 | 3 | Skill collection: Golang agentic skills | R-LOW | WATCH (language-vertical; samber is known maintainer) |
| 51 | 1,689 | 2026-03-31 | `tanbiralam/claude-code` | 10 | 0 | 0 | Yet another "Claude Code clone" — leaked-code family | R-HIGH | REJECT-NOISE (same as #26/#27/#31) |
| 52 | 1,686 | 2026-03-02 | `zubair-trabzada/ai-marketing-claude` | 10 | 2 | 3 | Vertical (15 marketing skills + parallel subagents) | R-LOW | REJECT-NOISE (out-of-domain) |
| 53 | 1,676 | 2026-03-23 | `yvgude/lean-ctx` | 10 | 4 | 4 | Rust binary: shell hook + MCP server, 49 tools | R-LOW | INSTALL-CANDIDATE (P1) — token-optimization + MCP (rivals context-mode) |
| 54 | 1,654 | 2026-03-15 | `cytostack/openwolf` | 10 | 3 | 3 | TypeScript middleware for Claude Code | R-MED | WATCH (token-optimization lane; same lane as #53) |
| 55 | 1,544 | 2026-04-07 | `phuryn/claude-usage` | 10 | 4 | 3 | Local dashboard for Claude Code token usage/costs | R-LOW | INSTALL-CANDIDATE (P2) — observability (related #16/#41) |
| 56 | 1,478 | 2026-03-06 | `conorbronsdon/avoid-ai-writing` | 10 | 4 | 3 | Skill: audit/rewrite to remove AI-writing patterns | R-LOW | WATCH (content/writing vertical) |
| 57 | 1,453 | 2026-05-04 | `WenyuChiou/awesome-agentic-ai-zh` | 10 | 1 | 1 | Awesome-list (zh learning map) | R-LOW | REJECT-NOISE (list) |
| 58 | 1,422 | 2026-03-31 | `openedclaude/claude-reviews-claude` | 10 | 0 | 3 | Source-code deep dive (17 chapters) | R-LOW | STUDY (citation source, like #24/#37) |
| 59 | 1,399 | 2026-04-16 | `ciembor/agent-rules-books` | 10 | 4 | 3 | AGENTS.md rules from Clean Code / DDD / Refactoring books | R-LOW | INSTALL-CANDIDATE (P2) — coding-standards skill complement |
| 60 | 1,362 | 2026-03-28 | `0xSteph/pentest-ai-agents` | 10 | 3 | 3 | Skill: offensive security subagents | R-LOW | WATCH (security vertical, related #44) |

### §A2 — Long-tail summary (60 additional entrants in 500-1,400 star band)

| Cluster | Representative repos | Count | Net verdict |
|---|---|---:|---|
| Claude Code "rebuild from scratch" tutorials | `Windy3f3f3f3f/claude-code-from-scratch`, `czl9707/build-your-own-openclaw`, `lintsinghua/claude-code-book` | 6 | STUDY-only (citation sources) |
| Token-optimization / context-mgmt | `Houseofmvps/codesight`, `yvgude/lean-ctx`, `cytostack/openwolf`, `24kchengYe/MemoMind`, `theDakshJaitly/mex`, `lucasrosati/claude-code-memory-setup` | 9 | Lane is saturated; pick 1-2 P1 (lean-ctx + MemoMind), reject rest |
| Coding-agent UI/IDE/multiplex | `stablyai/orca`, `hanshuaikang/nezha`, `Ataraxy-Labs/opensessions`, `ogulcancelik/herdr`, `elirantutia/vibeyard`, `dohooo/helmor`, `MiniMax-AI/OpenRoom`, `jonwiggins/optio` | 11 | Pick 1-2 (orca, opensessions) for git-worktrees lane; reject rest |
| Karpathy LLM-wiki implementations | `lucasastorian/llmwiki`, `Astro-Han/karpathy-llm-wiki`, `atomicstrata/llm-wiki-compiler`, `AgriciDaniel/claude-obsidian` | 4 | Pick 1 (already covered by karpathy-skills install + #20 obsidian variant) |
| Memory / knowledge-graph | `MemPalace/mempalace`, `safishamsi/graphify`, `Tencent/TencentDB-Agent-Memory`, `FlowElement-ai/m_flow`, `Bitterbot-AI/bitterbot-desktop` | 7 | mempalace + graphify already in §A1 P0/P1; rest WATCH |
| Skills-libraries (vertical or language) | `samber/cc-skills-golang`, `op7418/guizang-ppt-skill`, `worldwonderer/oh-story-claudecode`, `eugeniughelbur/obsidian-second-brain`, `utkusen/sast-skills`, `realkimbarrett/advertising-skills`, `jherrodthomas/robotics-skills-suite`, `PrathamLearnsToCode/paper2code`, `0xSteph/pentest-ai-agents` | 15+ | Mostly vertical; INSTALL ONLY if exact domain-need surfaces |
| Multi-CLI / cross-agent skill mgmt | `iamzhihuix/skills-manage`, `caliber-ai-org/ai-setup`, `Storybloq/storybloq`, `LeoYeAI/openclaw-master-skills` | 5 | Pick 1 (iamzhihuix already P2 in §A1) |
| "Leaked source / clone" suspect family | `yasasbanukaofficial/claude-code`, `oboard/claude-code-rev`, `codeaashu/claude-code`, `tanbiralam/claude-code`, `777genius/claude-code-source-code`, `soongenwong/claudecode`, `0Chencc/clawgod` | 7 | REJECT-NOISE all (legal/TOS/provenance fraud cluster) |
| Auth/proxy/quota-pump (TOS-evasion lane) | `motiful/cc-gateway`, `romgX/openrelay`, `mnfst/awesome-free-llm-apis`, `ThinkWatchProject/ThinkWatch`, `CommonstackAI/UncommonRoute` | 5 | REJECT-NOISE 3/5 (TOS); WATCH ThinkWatch (legitimate enterprise gateway) |
| MCP servers (Q2-2026 created) | `Manavarya09/design-extract`, `irinabuht12-oss/google-meta-ads-ga4-mcp`, `nduckmink/arkon`, `Storybloq/storybloq`, `MinishLab/semble` | 5 | semble (code-search MCP) is P2 candidate; others vertical-WATCH |
| Books/tutorials | `Windy3f3f3f3f/how-claude-code-works`, `openedclaude/claude-reviews-claude`, `Windy3f3f3f3f/claude-code-from-scratch`, `VILA-Lab/Dive-into-Claude-Code`, `lintsinghua/claude-code-book` | 5 | STUDY-only (no install) |
| "OpenClaw" ecosystem (separate harness, not Claude Code) | `dataelement/Clawith`, `aiming-lab/MetaClaw`, `AMAP-ML/SkillClaw`, `FreedomIntelligence/OpenClaw-Medical-Skills`, `CodePhiliaX/youclaw`, `SafeRL-Lab/cheetahclaws`, `czl9707/build-your-own-openclaw`, `wuji-labs/nopua`, `0xMassi/webclaw`, `Narcooo/inkos` | 12+ | REJECT-DUP-OR-OFFTOPIC (different harness ecosystem) |

## §B — Top-10 NEW (created 2026-Q2) with rapid star-growth

Star-velocity computed as `stars / days_since_creation` on 2026-05-16. Velocity ≥150 stars/day = "viral"; 50-150 = "fast"; <50 = "organic".

| Rank | Repo | Stars | Days | Velocity (★/day) | Class | Honest read |
|---:|---|---:|---:|---:|---|---|
| 1 | `JuliusBrussee/caveman` | 60,937 | 42 | **1,451** | viral | Meme-vector amplified — token-savings claim ≈ 65% needs empirical verification; D5 (mechanism-novel) is real (persona-prompt as compression hack), D7 (reversibility) very high |
| 2 | `MemPalace/mempalace` | 52,308 | 41 | **1,276** | viral | "Best-benchmarked OSS memory" — benchmark methodology not yet probed, but the lane is real and incumbent (mem0) is mature; mempalace's claim warrants a head-to-head probe |
| 3 | `safishamsi/graphify` | 48,500 | 43 | **1,128** | viral | Multi-CLI skill (Claude Code/Codex/OpenCode/Cursor/Gemini) with Leiden community detection — broad-surface install hook |
| 4 | `santifer/career-ops` | 44,992 | 42 | **1,071** | viral | Vertical (job-search) — high velocity but out-of-domain for harness work |
| 5 | `heygen-com/hyperframes` | 18,579 | 67 | 277 | fast | HeyGen-backed (commercial); HTML→video lane; corporate marketing-bump likely contributes |
| 6 | `JCodesMore/ai-website-cloner-template` | 14,865 | 64 | 232 | fast | Template repo — high star-to-substance ratio; "one command" gimmick |
| 7 | `Lum1104/Understand-Anything` | 14,835 | 62 | 239 | fast | Karpathy-aligned + bilingual + multi-CLI — broader-fit lane |
| 8 | `kyegomez/OpenMythos` | 13,026 | 28 | **465** | viral | kyegomez authorship — historically speculative-fiction reconstructions; high D6 (risk) per W229+ historical pattern |
| 9 | `jnMetaCode/agency-agents-zh` | 11,236 | 71 | 158 | fast | 211 agent personas (zh) — overlap with wshobson/agents installed; zh-niche gap |
| 10 | `Kuberwastaken/claurst` | 9,635 | 46 | 210 | fast | Alternative coding-agent CLI — competes with Claude Code itself, not complement |

Additional rapid-growth entrants 11-20 by velocity:
- `wanshuiyin/Auto-claude-code-research-in-sleep` (ARIS): 9,476★/67d = 141/d
- `op7418/guizang-ppt-skill`: 9,203★/23d = **400/d** (viral, 23-day creation)
- `nexu-io/html-anything`: 2,369★/5d = **474/d** (viral, 5-day creation — strong velocity but unprobed)
- `strukto-ai/mirage`: 2,303★/10d = 230/d (FUSE-based agent-filesystem — D5 high)
- `getagentseal/codeburn`: 6,554★/33d = 199/d (observability lane)
- `yizhiyanhua-ai/fireworks-tech-graph`: 6,741★/36d = 187/d (SVG diagram lane)
- `open-multi-agent/open-multi-agent`: 6,153★/46d = 134/d (multi-agent + MCP lane)

## §C — Saturation impact

### §C1 — Verdict tally (106-entrant corpus)

| Verdict | Count | % of corpus |
|---|---:|---:|
| INSTALL-CANDIDATE P0 (immediate add to W254 §3) | 1 | 0.9% |
| INSTALL-CANDIDATE P1 (next-cycle add) | 8 | 7.5% |
| INSTALL-CANDIDATE P2 (gap-filler / observability) | 7 | 6.6% |
| WATCH (track, may flip P1/P2 with more evidence) | 18 | 17.0% |
| STUDY (citation source only, not installable) | 5 | 4.7% |
| REJECT-DUP (already-covered upstream installed) | ~13 | 12.3% |
| REJECT-NOISE (out-of-domain, gimmick, awesome-list) | ~38 | 35.8% |
| REJECT-HIGH-RISK (leaked-source, TOS-evasion, fraud) | ~16 | 15.1% |

**Headline**: of 106 Q2-2026 entrants with ≥500 stars, only **16 (15.1%)** rise to install-candidate status across P0/P1/P2 tiers. Of those 16, only **1 (mempalace, 0.9% of corpus)** is P0-ready for the W254 §3 install set this cycle. The other 15 are P1/P2 follow-ons or gap-fillers.

### §C2 — Adds vs noise (P0 INSTALL deltas)

| Cycle | P0 add | Rationale | Replaces / complements |
|---|---|---|---|
| W254 §3 (current install set) | (already-decided 9-skill set) | Per W254 BEHAVIORAL-LAYER-ARCHITECTURE | (baseline) |
| **W254 +Q2-2026 delta (this tranche)** | **`MemPalace/mempalace`** | Direct compete to mem0/Graphiti; claims best-benchmarked OSS; D2=10, D5=5; >50k stars in 41 days | **Memory layer** — install AFTER head-to-head probe vs mem0 (existing incumbent in W258 manifest §"Memory") |
| P1 follow-ons (8 candidates) | `graphify`, `Lum1104/Understand-Anything`, `ARIS` (autoresearch), `open-multi-agent`, `revfactory/harness`, `strukto-ai/mirage`, `yvgude/lean-ctx`, `karpathy-llm-wiki` family | Each requires a domain-fit probe — none yet at "install-without-question" tier | Various lanes |
| P2 gap-fillers (7 candidates) | `codeburn`, `abtop`, `phuryn/claude-usage`, `iamzhihuix/skills-manage`, `harmonist`, `stablyai/orca`, `ciembor/agent-rules-books` | Observability + skill-mgmt + IDE/worktree lane | Various |

### §C3 — Saturation-pressure analysis

The Q2-2026 frontier shows **classic late-cycle saturation patterns**:

1. **Clone-fraud cluster** (15.1% of corpus): 7 distinct repos all claiming to be "Claude Code leaked source", 5 quota-pump/TOS-evasion proxies, several speculative-architecture reconstructions. This is a known late-cycle anti-pattern; per W229+ historical, these self-amplify via meme-vector and dropship-marketing.
2. **"Awesome-list" / curation overload**: at least 6 new "awesome-X" lists in Q2 (autoresearch, Claude-design, claude-skills, free-llm-apis, agentic-ai-zh, opensource-ai). Per W258 manifest, the lane is already saturated by `affaan-m/everything-claude-code` (184k stars) and `sickn33/antigravity-awesome-skills` (37k stars). Net delta from Q2 awesome-lists is near-zero.
3. **"From scratch / reverse-engineer Claude Code" tutorial cluster**: 6+ repos in Q2 (Windy3f3f3f3f×2, lintsinghua/claude-code-book, openedclaude/claude-reviews-claude, VILA-Lab/Dive-into-Claude-Code). These are citation sources, not installable primitives. Together they evidence Claude Code reaching "deconstruction phase" of the hype cycle.
4. **Real-primitive frontier is narrow**: the genuinely novel primitives (mempalace memory benchmark claim, mirage virtual-filesystem, lean-ctx Rust shell-hook, open-multi-agent task-DAG-from-goal) are <10% of the corpus.

### §C4 — Cardinal-rule fit check

Per cardinal-rule-1 (install primitives only from trusted plugins/skills/agents), the 16 INSTALL-CANDIDATE rows above all need plugin/skill/marketplace verification before install. The 1 P0 candidate (mempalace) is shipped as Python + MCP-shaped, not as a Claude Code plugin per se — meaning install would route through `.mcp.json` not `/plugin install`, per cardinal-rule-2 hook discipline (MCP server invocation is acceptable when declared in `.claude/settings.json` / `.mcp.json` per docs).

## §D — Honest non-findings

### §D1 — Star-pump detection (per CR-12 honest-reporting)

Multiple Q2-2026 repos display **star-pump red flags**:

1. **Anomalous star-to-fork ratio** (suspect):
   - `safishamsi/graphify`: 48,500★ / 5,263 forks = 9.2:1 (normal for "skill" lib)
   - `JuliusBrussee/caveman`: 60,937★ / 3,392 forks = 18.0:1 (high — but "meme/skill" template explains it)
   - `santifer/career-ops`: 44,992★ / 9,455 forks = 4.8:1 (very low star-to-fork — possible coordinated forking)
   - `MemPalace/mempalace`: 52,308★ / 6,914 forks = 7.6:1 (low — possible coordinated forking)
   - `kyegomez/OpenMythos`: 13,026★ / 2,970 forks = 4.4:1 (very low — kyegomez-pattern)
   - **Honest interpretation**: low star-to-fork ratios on theoretical/educational repos are weak-signal of either (a) genuine "learn by forking" engagement or (b) coordinated launch campaigns. **No conclusive determination possible from metadata alone**. Operator should sample fork-quality before adopting any of these as P0.

2. **Same-week creation cluster pattern**:
   - 2026-03-31: ≥10 distinct Claude-Code-clone or "deep dive" repos created (Windy3f3f3f3f×2, openedclaude/claude-reviews-claude, lintsinghua/claude-code-book, yasasbanukaofficial/claude-code, oboard/claude-code-rev, codeaashu/claude-code, tanbiralam/claude-code, 777genius/claude-code-source-code, codeany-ai/open-agent-sdk-typescript, motiful/cc-gateway) — strongly suggests **coordinated drop or shared template/dropship origin**. Anthropic CC source-code release or leak event on or around 2026-03-30 should be investigated as confounder.
   - 2026-04-04: caveman (60.9k★) + career-ops (45k★) + graphify (1 day prior) + several others — another suspicious cluster.

3. **"Leaked source" topic-tag cluster**: 4-5 distinct repos all tagging `leaked-claude-code` and similar — pattern matches W229+ FM-class known dropship attack vectors against Claude Code distribution.

### §D2 — Growth-hacking patterns detected

| Pattern | Examples | Class |
|---|---|---|
| Meme-vector amplification | `caveman` (meme topic), `wuji-labs/nopua` ("love your AI") | Legitimate-meme, low-risk |
| Vertical-domain spam | `career-ops` (job search), `Vibe-Trading`, `inkos` (novel writing), `oh-story-claudecode`, `realkimbarrett/advertising-skills`, `worldwonderer/oh-story-claudecode` | Vertical-spam, not harness-relevant |
| Localization fork hijack | `jnMetaCode/superpowers-zh` (forks installed obra/superpowers) | Legitimate-localization, but adds no harness value |
| "Claude Code clone" fraud cluster | 5-7 repos claiming "leaked source" or "runnable source code" | High-risk anti-pattern |
| "Awesome-list" launch | 6+ awesome-* repos created Q2 | Low-effort SEO pattern |
| Tutorial-bait | "build your own X from scratch" cluster (Windy3f3f3f3f×2, czl9707, etc.) | Legitimate-educational, not installable |
| Multi-CLI compatibility claim | "works with Claude Code, Cursor, Gemini, Codex, OpenCode" (graphify, ai-setup, semble, etc.) | Genuine cross-vendor lane, but inflates compatibility surface |

### §D3 — What this tranche does NOT find

1. **No clear "kill-shot" for existing P0 incumbents**: mempalace claims to beat mem0 on benchmarks but the benchmark methodology has not been audited in this pass. No Q2 entrant clearly displaces any installed W254 §3 skill.
2. **No new MCP server pattern**: the 7 Q2-2026 MCP servers found (design-extract, google-meta-ads-ga4-mcp, llmwiki, ThinkWatch, semble, arkon, storybloq) all fit established MCP-server patterns; none introduce a novel transport, capability, or auth model.
3. **No new harness-architecture pattern**: open-multi-agent + harmonist + revfactory/harness + holaOS all extend existing multi-agent / orchestration patterns; none introduce a new cardinal architectural primitive (cf. W258 Wave-Keep architecture-diagrams §6 layers).
4. **No verified replacement for `everything-claude-code` (184k★) or `affaan-m` library** as primary install hub — the canonical hubs remain stable.
5. **Honest non-finding on velocity**: 1,000+ stars/day on caveman/mempalace/graphify/career-ops is **2-4x normal viral repo velocity** and warrants suspicion. No public source on GitHub's API gives star-acquisition timestamps in this query path; **velocity verification deferred** to a follow-on tranche with `GET /repos/{owner}/{repo}/stargazers` time-series.
6. **Honest non-finding on benchmark claims**: 4 entrants claim measurable wins (mempalace "best-benchmarked", lean-ctx "60-95% token reduction", graphify "71.5x fewer tokens per session", caveman "65% token cut"). **None of these benchmarks have been independently audited in this pass**. The corresponding INSTALL-CANDIDATE verdicts are conditional on benchmark verification.
7. **Honest non-finding on `created:>2026-04-01 topic:mcp` query**: only **0** repos matched (total Q6 result with `mcp-server` topic was 7, all from 2026-04+, but these were captured under Q6 not Q3). The "MCP frontier" in Q2-2026 is much narrower than the "claude-code skill frontier".
8. **Q5 (`stars:>5000 pushed:>2026-05-08`) is dominated by INCUMBENTS** (AutoGPT, ollama, transformers, langchain, vllm) with only ~10 Q2-2026-created repos exceeding 5k stars. The "high-star fresh-push" surface is overwhelmingly old-repo-still-active, not new entrant.

### §D4 — Sample-coverage caveats

- API page-size limit is 100; queries returning >100 (Q1: 113, Q2-llm: 53, Q3-mcp: 289, Q5-llm: 209) are sampled. Q3 specifically may contain Q2-2026-created MCP servers below the rank-100 cutoff. A follow-on paginated sweep (`page=2,3`) is warranted for Q3.
- "Stars >500" cutoff excludes the genuine long-tail of late-Q2 launches still in 100-499 band. A separate tranche at stars:50-500 would expose the "next-month-promotion-candidates" cohort.
- Time-bounded queries miss repos created pre-2026-03-01 that **first crossed star thresholds in Q2** (e.g. `affaan-m/everything-claude-code` created 2026-01-18 but reached 184k★ in Q2 — these are equally relevant but fall under TRANCHE-A 50k-star surface, not this tranche).
- `created:>` operator returns server-validated timestamps but does NOT verify backfill / star-time-series. Several entrants may have been bulk-imported from prior internal/closed repos with star history reset.

## Appendix — Raw query persistence

Persisted full-100-row JSON results for fork-quality + author-history follow-up audit:

- Q1 (claude-code topic): `Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed\179ae394-d0a1-4904-ba71-946903c64b03\tool-results\toolu_01LvWh5KCjqXxnzcHKz8J7G8.json`
- Q3 (mcp topic): `Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed\179ae394-d0a1-4904-ba71-946903c64b03\tool-results\toolu_017nQfozQMvfcnaqgUYvoMS7.json`
- Q5 (stars>5000 llm): `Z:\claude-sota-installed\.claude\projects\Z--claude-sota-installed\179ae394-d0a1-4904-ba71-946903c64b03\tool-results\toolu_01ALpsJwSBrp95EJU7Jritvf.json`

Inline (≤30-row) results for Q2/Q4/Q6/Q7 are captured in this session's tool-call output and reproducible via the GraphQL queries listed under "Method".

## §0 Mission Status

**Status**: COMPLETE 2026-05-15/16.

**Inputs read**
- `Z:/claude-sota-installed/docs/outer research/README.md`
- `Z:/claude-sota-pure/docs/install-provenance.md` last 100 lines
- `Z:/claude-sota-pure/docs/sota-installed-manifest.md` sections 0-5 plus visible continuation into §6 from `-TotalCount 260`
- `Z:/claude-sota-pure/.claude/settings.json`
- `Z:/claude-sota-pure/.mcp.json`
- `Z:/claude-sota-pure/.claude/agents/**`

**GitHub metadata method**: `gh api search/repositories` and `gh api repos/{owner}/{repo}` live queries. Star counts are live at query time, not kit-claimed counts.

**W237 roster filter**: treated both full slugs and repo-name aliases as known where the W237 roster supplied only short names (for example `context-mode`, `claude-squad`, `awesome-claude-code`, `get-shit-done`).

**README GitHub-like slugs mined before filtering**
`0xhimanshu/governor`, `abhisekjha/pith`, `agor/parallel-worktrees`, `buildoak/wet`, `ccswarm/sandcastle`, `claude-market/marketplace`, `daintreehq/daintree`, `daymade/claude-code-skills`, `DiversioTeam/agent-skills-marketplace`, `fynnfluegge/agtx`, `gabrielkoerich/orchestrator`, `glebis/claude-skills`, `gnhf/starter-kit`, `juyterman1000/entroly`, `matt1398/claude-devtools`, `mhattingpete/claude-skills-marketplace`, `mksglu/context-mode`, `safishamsi/graphify`, `sirmalloc/ccstatusline`, `smtg-ai/claude-squad`, `the911fund/skill-of-skills`, `wshobson/agents`, `Yeachan-Heo/oh-my-claudecode`.

Known-by-W237 or alias-filtered from that list: `mksglu/context-mode`, `smtg-ai/claude-squad`, `wshobson/agents`.

## §1 Net-New Repos from Outer Research README

| Repo | Stars | License | Description | Notes |
|---|---:|---|---|---|
| `safishamsi/graphify` | 48,366 | MIT | AI coding assistant skill that turns folders, schemas, docs, papers, images, or videos into a queryable knowledge graph. | Claude Code topic present; high adoption signal but prior local notes classify as already-disposed in old wave context. |
| `Yeachan-Heo/oh-my-claudecode` | 33,963 | MIT | Teams-first multi-agent orchestration for Claude Code. | Claude Code topic present; likely overlaps with GSD/agent-team stack. |
| `sirmalloc/ccstatusline` | 9,309 | MIT | Customizable Claude Code CLI statusline with powerline support and themes. | Claude-native utility; adoption value depends on statusline gap. |
| `matt1398/claude-devtools` | 3,389 | MIT | Visual DevTools for Claude Code sessions, tool calls, token usage, subagents, and context window. | Claude Code topic present; observability candidate. |
| `daymade/claude-code-skills` | 1,045 | MIT | Professional Claude Code skills marketplace for development workflows. | No topics returned; README description is Claude-specific. |
| `fynnfluegge/agtx` | 1,041 | Apache-2.0 | Blackboard for coding agents. | Claude Code topic present; cross-agent coordination candidate. |
| `mhattingpete/claude-skills-marketplace` | 577 | Apache-2.0 | Claude Code skills for software engineering workflows, git automation, testing, and code review. | Claude skills marketplace candidate; overlap likely with current skills/plugins. |
| `juyterman1000/entroly` | 376 | Apache-2.0 | Context engine that catches AI hallucinations and reduces token cost via grounding/RAG. | MCP topic present; Claude Code topic present; overlaps with context-mode/RTK/Serena. |
| `glebis/claude-skills` | 191 | NOASSERTION | Collection of Claude Code skills for enhanced AI workflows. | License unresolved; low-confidence adoption candidate. |
| `abhisekjha/pith` | 95 | MIT | Hook for making Claude Code sessions last longer via token optimization. | Claude Code plugin topic present; overlap with context-mode/RTK. |
| `0xhimanshu/governor` | 74 | MIT | Claude Code usage governor for compact output, context slimming, tool-output filtering, telemetry, and drift guardrails. | Claude Code plugin topic present; README already notes prior age/recheck disposition. |
| `buildoak/wet` | 37 | MIT | API proxy that compresses stale tool results in Claude Code sessions. | Low-star but direct token-efficiency fit. |
| `daintreehq/daintree` | 34 | NOASSERTION | Delegation environment for orchestrating Claude, Gemini, and Codex sessions across git worktrees. | No license visible; agent-worktree overlap. |
| `claude-market/marketplace` | 12 | MIT | Open-source curated marketplace for Claude Code tools, agents, and skills. | Low-star discovery surface. |
| `the911fund/skill-of-skills` | 8 | MIT | Discovery engine indexing skills, plugins, MCP servers, agents, and integrations across Claude Code, Codex, Gemini CLI, and more. | Low-star discovery candidate. |
| `gabrielkoerich/orchestrator` | 5 | NOASSERTION | Lightweight bash autonomous coding agents orchestrator. | License unresolved and low-star. |
| `DiversioTeam/agent-skills-marketplace` | 2 | MIT | Agent Skills marketplace using the open standard with Claude marketplace metadata. | Low-star but explicit marketplace metadata. |
| `agor/parallel-worktrees` | NOT_FOUND | UNKNOWN | Mentioned in README as `agor/parallel-worktrees`. | GitHub repo API returned 404; no repo metadata visible. |
| `ccswarm/sandcastle` | NOT_FOUND | UNKNOWN | Mentioned in README as `ccswarm/sandcastle`. | GitHub repo API returned 404; no repo metadata visible. |
| `gnhf/starter-kit` | NOT_FOUND | UNKNOWN | Mentioned in README as `gnhf/starter-kit`. | GitHub repo API returned 404; no repo metadata visible. |

## §2 Z:/claude-sota-pure Current Install State

### MCP Servers Installed

Source: `Z:/claude-sota-pure/.mcp.json`.

Installed MCP names:
`ccusage`, `chrome-devtools`, `context7`, `deepwiki`, `fetch`, `filesystem`, `git`, `github`, `gitnexus`, `memory`, `playwright`, `repomix`, `sequentialthinking`, `serena`, `time`.

Details:
- `memory`: `mcp-memory-server` with sqlite_vec DB at `Z:/claude-sota-pure-state/.mcp-memory/memory.db`
- `github`: `npx -y @modelcontextprotocol/server-github`
- `context7`: hosted HTTP `https://mcp.context7.com/mcp`
- `deepwiki`: hosted HTTP `https://mcp.deepwiki.com/mcp`
- `repomix`: `npx -y repomix --mcp`
- `git`: `npx -y @modelcontextprotocol/server-git`
- `fetch`: `npx -y @modelcontextprotocol/server-fetch`
- `time`: `npx -y @modelcontextprotocol/server-time`
- `sequentialthinking`: `npx -y @modelcontextprotocol/server-sequentialthinking`
- `filesystem`: `npx -y @modelcontextprotocol/server-filesystem Z:/claude-sota-pure`
- `gitnexus`: `npx -y gitnexus mcp`
- `chrome-devtools`: `npx -y chrome-devtools-mcp@latest`
- `playwright`: `npx -y @playwright/mcp@latest`
- `serena`: `uvx --from git+https://github.com/oraios/serena serena mcp --context ide-assistant`
- `ccusage`: `npx -y @ccusage/mcp`

### Plugins Installed / Enabled

Source: `Z:/claude-sota-pure/.claude/settings.json:enabledPlugins`.

Enabled plugins:
`agent-orchestration@claude-code-workflows`, `agent-sdk-dev@claude-plugins-official`, `agent-skills@addy-agent-skills`, `agent-teams@claude-code-workflows`, `code-review@claude-plugins-official`, `codex@openai-codex`, `commit-commands@claude-plugins-official`, `compound-engineering@compound-engineering-plugin`, `comprehensive-review@claude-code-workflows`, `context-management@claude-code-workflows`, `context-mode@context-mode`, `debugging-toolkit@claude-code-workflows`, `ecc@ecc`, `explanatory-output-style@claude-plugins-official`, `feature-dev@claude-plugins-official`, `frontend-design@claude-plugins-official`, `hookify@claude-plugins-official`, `intelligent-compact@claude-settings`, `pr-review-toolkit@claude-plugins-official`, `ralph-loop@claude-plugins-official`, `security-guidance@claude-plugins-official`, `skill-creator@claude-plugins-official`, `superpowers@superpowers-dev`, `tdd-workflows@claude-code-workflows`.

Known marketplaces configured:
`anthropics/claude-plugins-official`, `wshobson/agents`, `addyosmani/agent-skills`, `openai/codex-plugin-cc`, `mksglu/context-mode`, `obra/superpowers`, `affaan-m/everything-claude-code`, `fcakyon/claude-codex-settings`, `EveryInc/compound-engineering-plugin`.

Latest provenance tail says W229 installed/enabled:
- `EveryInc/compound-engineering-plugin`: `compound-engineering@compound-engineering-plugin`, live-pending-reload.
- `explanatory-output-style@claude-plugins-official`, live-pending-reload.

### Hooks Wired

Source: `Z:/claude-sota-pure/.claude/settings.json:hooks`.

| Event | Matcher | Command |
|---|---|---|
| `SessionStart` | N/A | `Z:/tools/nodejs/node.exe Z:/claude-sota-pure/.claude/hooks/context-mode-cache-heal.mjs` |
| `SessionStart` | N/A | `node.exe Z:/claude-sota-pure/.claude/hooks/gsd-check-update.js` |
| `SessionStart` | N/A | `bash.exe Z:/claude-sota-pure/.claude/hooks/gsd-session-state.sh` |
| `PreToolUse` | `*` | `bash.exe Z:/claude-sota-pure/.claude/hooks/scripts/kill-switch.sh` |
| `PreToolUse` | `*` | `bash.exe Z:/claude-sota-pure/.claude/hooks/scripts/steer.sh` |
| `PreToolUse` | `Read` | `bash.exe Z:/claude-sota-pure/.claude/hooks/scripts/track-read.sh` |
| `PreToolUse` | `Write|Edit` | `bash.exe Z:/claude-sota-pure/.claude/hooks/scripts/verify-gate.sh` |
| `PreToolUse` | `Write|Edit` | `node.exe Z:/claude-sota-pure/.claude/hooks/gsd-prompt-guard.js` |
| `PreToolUse` | `Write|Edit` | `node.exe Z:/claude-sota-pure/.claude/hooks/gsd-read-guard.js` |
| `PreToolUse` | `Write|Edit` | `node.exe Z:/claude-sota-pure/.claude/hooks/gsd-workflow-guard.js` |
| `PreToolUse` | `Bash` | `bash.exe Z:/claude-sota-pure/.claude/hooks/gsd-validate-commit.sh` |
| `Stop` | N/A | `bash.exe Z:/claude-sota-pure/.claude/hooks/scripts/commit-on-stop.sh` |
| `PostToolUse` | `Bash|Edit|Write|MultiEdit|Agent|Task` | `node.exe Z:/claude-sota-pure/.claude/hooks/gsd-context-monitor.js` |
| `PostToolUse` | `Read` | `node.exe Z:/claude-sota-pure/.claude/hooks/gsd-read-injection-scanner.js` |
| `PostToolUse` | `Write|Edit` | `bash.exe Z:/claude-sota-pure/.claude/hooks/gsd-phase-boundary.sh` |

Status line command:
- `node.exe Z:/claude-sota-pure/.claude/hooks/gsd-statusline.js`

### Agents Present

Source: `Z:/claude-sota-pure/.claude/agents/`.

35 agent files:
`evaluator.md`, `gsd-advisor-researcher.md`, `gsd-ai-researcher.md`, `gsd-assumptions-analyzer.md`, `gsd-code-fixer.md`, `gsd-code-reviewer.md`, `gsd-codebase-mapper.md`, `gsd-debug-session-manager.md`, `gsd-debugger.md`, `gsd-doc-classifier.md`, `gsd-doc-synthesizer.md`, `gsd-doc-verifier.md`, `gsd-doc-writer.md`, `gsd-domain-researcher.md`, `gsd-eval-auditor.md`, `gsd-eval-planner.md`, `gsd-executor.md`, `gsd-framework-selector.md`, `gsd-integration-checker.md`, `gsd-intel-updater.md`, `gsd-nyquist-auditor.md`, `gsd-pattern-mapper.md`, `gsd-phase-researcher.md`, `gsd-plan-checker.md`, `gsd-planner.md`, `gsd-project-researcher.md`, `gsd-research-synthesizer.md`, `gsd-roadmapper.md`, `gsd-security-auditor.md`, `gsd-ui-auditor.md`, `gsd-ui-checker.md`, `gsd-ui-researcher.md`, `gsd-user-profiler.md`, `gsd-verifier.md`.

### Manifest Sections 0-5 Summary

- §0 Marketplaces planned/registered: `anthropics/claude-plugins-official`, `wshobson/agents`, `addyosmani/agent-skills`, `openai/codex-plugin-cc`, `mksglu/context-mode`, `obra/superpowers`.
- §1 Plugins Phase 2A originally planned 11 plugins; settings now show 24 enabled plugins, including later W229 additions.
- §1B/§1C Anthropic official/skills planned or adopted: `agent-sdk-dev`, `frontend-design`, cwc primitives, cwc `evaluator.md`, `claude-api`, example skills, document skills cached-not-enabled.
- §2 MCP starter set: memory, context7, github, deepwiki, repomix. Current `.mcp.json` has these plus 10 additional MCPs.
- §2B/§2C planned/adopted MCP expansions: git, fetch, time, sequentialthinking, filesystem, markitdown, vet. Current `.mcp.json` includes the first five; markitdown/vet not wired as MCPs in `.mcp.json`.
- §3 hooks: manifest expected plugin-shipped hooks; actual settings now wire SessionStart, PreToolUse, Stop, and PostToolUse hooks listed above.
- §4 CLI tools: git, gh, rg, jq as Tier-1; fd, yq, uv, bun as Tier-2; plus lazygit, ast-grep, typos.
- §5 promotion blockers remain documented: smoke probes, coordinate verification, T1-T5 gap disposition, compact stack, cwc scaffolding.

## §3 GitHub Topic Harvest Net-New Repos

### Query 1: `topic:claude-code sort:stars-desc pushed:>2026-04-01`

Known-roster filtered out from top results: `affaan-m/everything-claude-code`, `gsd-build/get-shit-done`, `hesreallyhim/awesome-claude-code`, `addyosmani/agent-skills`.

| Repo | Stars | License | Description | Native Claude Code pathway |
|---|---:|---|---|---|
| `NousResearch/hermes-agent` | 152,018 | MIT | Agent that grows with you. | YES: `claude-code` topic tag. |
| `nextlevelbuilder/ui-ux-pro-max-skill` | 79,035 | MIT | AI skill for professional UI/UX design across platforms. | YES: `claude-code` topic, `CLAUDE.md`, `.claude/`. |
| `thedotmack/claude-mem` | 75,995 | Apache-2.0 | Persistent context across sessions for agents. | YES: `claude-code` topic, `CLAUDE.md`, `.claude/`. |
| `farion1231/cc-switch` | 71,831 | MIT | Cross-platform desktop assistant/provider manager for Claude Code, Codex, OpenCode, Gemini, Hermes Agent. | YES: `claude-code` topic. |
| `JuliusBrussee/caveman` | 60,734 | MIT | Claude Code skill for compact token-saving speech. | YES: `claude-code` topic, `CLAUDE.md`. |
| `shareAI-lab/learn-claude-code` | 60,672 | MIT | Educational nano Claude Code-like agent harness. | YES: `claude-code` topic. |
| `ComposioHQ/awesome-claude-skills` | 60,006 | NOASSERTION | Curated list of Claude Skills and resources. | YES: `claude-code` topic. |
| `code-yeongyu/oh-my-openagent` | 57,959 | NOASSERTION | Agent harness previously named oh-my-opencode. | YES: `claude-code` topic. |
| `shanraisshan/claude-code-best-practice` | 53,175 | MIT | Claude Code best practices for agentic engineering. | YES: `claude-code` topic, `CLAUDE.md`, `.claude/`. |
| `ruvnet/ruflo` | 51,553 | MIT | Agent orchestration platform for Claude with native Claude Code/Codex integration. | YES: `claude-code` topic, `CLAUDE.md`, `.claude/`. |
| `rtk-ai/rtk` | 48,545 | Apache-2.0 | CLI proxy reducing token consumption on common dev commands. | YES: `claude-code` topic, `CLAUDE.md`, `.claude/`. |
| `safishamsi/graphify` | 48,366 | MIT | AI coding assistant skill that builds queryable knowledge graphs. | YES: `claude-code` topic. |
| `jeecgboot/JeecgBoot` | 46,276 | Apache-2.0 | AI low-code platform with MCP/plugins and code generation. | YES: `claude-code` topic. |
| `CherryHQ/cherry-studio` | 45,733 | AGPL-3.0 | AI productivity studio with chat, agents, and assistants. | YES: `claude-code` topic, `CLAUDE.md`, `.claude/`. |
| `santifer/career-ops` | 44,903 | MIT | AI-powered job search system built on Claude Code. | YES: `claude-code` topic, `CLAUDE.md`, `.claude/`. |
| `HKUDS/nanobot` | 42,543 | MIT | Ultra-lightweight personal AI agent. | YES: `claude-code` topic, `CLAUDE.md`. |

### Query 2: `topic:mcp-server stars:>500`

Known-roster filtered out from top results: `upstash/context7`, `mksglu/context-mode`.

| Repo | Stars | License | Description | Native Claude Code pathway |
|---|---:|---|---|---|
| `n8n-io/n8n` | 188,013 | NOASSERTION | Fair-code workflow automation platform with native AI capabilities. | YES: `CLAUDE.md`, `.claude/`. |
| `google-gemini/gemini-cli` | 104,070 | Apache-2.0 | Open-source AI agent in the terminal. | NO: no `claude-code` topic / no root `CLAUDE.md` / no `.claude` found. |
| `sansan0/TrendRadar` | 57,620 | GPL-3.0 | AI-driven public opinion and trend monitor with MCP support. | NO: no detected Claude-native path. |
| `ruvnet/ruflo` | 51,553 | MIT | Claude-oriented multi-agent orchestration platform. | YES: topic + `CLAUDE.md` + `.claude/`. |
| `D4Vinci/Scrapling` | 49,966 | BSD-3-Clause | Adaptive web scraping framework. | NO: no detected Claude-native path. |
| `ChromeDevTools/chrome-devtools-mcp` | 39,715 | Apache-2.0 | Chrome DevTools for coding agents. | NO: MCP-native, not Claude-Code-native by checked markers; already installed in pure. |
| `bytedance/UI-TARS-desktop` | 34,094 | Apache-2.0 | Multimodal AI agent stack for GUI/computer use. | NO: no detected Claude-native path. |
| `github/github-mcp-server` | 29,867 | MIT | GitHub official MCP server. | NO: MCP-native; already functionally present via `server-github` in pure. |
| `assafelovic/gpt-researcher` | 27,090 | Apache-2.0 | Autonomous deep research agent. | YES: `.claude/` present. |
| `oraios/serena` | 24,271 | MIT | MCP toolkit for semantic coding retrieval/editing. | YES: `claude-code` topic, `CLAUDE.md`; already installed in pure. |
| `activepieces/activepieces` | 22,209 | NOASSERTION | AI workflow automation with MCPs/agents. | YES: `CLAUDE.md`, `.claude/`. |
| `1Panel-dev/MaxKB` | 20,970 | GPL-3.0 | Enterprise agent/knowledge-base platform. | NO: no detected Claude-native path. |
| `czlonkowski/n8n-mcp` | 20,894 | MIT | MCP for Claude Desktop/Claude Code/Windsurf/Cursor to build n8n workflows. | YES: description, `CLAUDE.md`, `.claude/`. |
| `nukeop/nuclear` | 17,622 | AGPL-3.0 | Streaming music player with MCP topic. | NO: no detected Claude-native path. |
| `microsoft/mcp-for-beginners` | 16,110 | MIT | MCP curriculum and examples. | NO: no detected Claude-native path. |
| `triggerdotdev/trigger.dev` | 14,936 | Apache-2.0 | Managed AI agents and workflows. | YES: `CLAUDE.md`, `.claude/`. |
| `open-metadata/OpenMetadata` | 13,930 | Apache-2.0 | Metadata/data governance platform with MCP topic. | YES: `CLAUDE.md`, `.claude/`. |
| `xpzouying/xiaohongshu-mcp` | 13,601 | NOASSERTION | MCP for xiaohongshu.com. | YES: `CLAUDE.md`. |

### Query 3: `topic:claude-agent stars:>100`

| Repo | Stars | License | Description | Native Claude Code pathway |
|---|---:|---|---|---|
| `miantiao-me/aigc-weekly` | 529 | AGPL-3.0 | AIGC weekly generated by an Agentic AI agent. | YES: `claude-code` topic, `CLAUDE.md`; domain fit weak. |

### Query 4: `topic:ai-agent-framework stars:>1000`

| Repo | Stars | License | Description | Native Claude Code pathway |
|---|---:|---|---|---|
| `VoltAgent/awesome-claude-code-subagents` | 19,891 | MIT | 100+ specialized Claude Code subagents. | YES: Claude-specific, `CLAUDE.md`, `.claude/`. |
| `triggerdotdev/trigger.dev` | 14,936 | Apache-2.0 | Managed AI agents and workflows. | YES: `CLAUDE.md`, `.claude/`. |
| `MervinPraison/PraisonAI` | 7,763 | MIT | Multi-agent AI framework with memory/RAG and 100+ LLM support. | NO: no detected Claude-native path. |
| `crestalnetwork/intentkit` | 6,499 | MIT | Self-hosted cloud agent cluster. | YES: `CLAUDE.md`, `.claude/`. |
| `Intelligent-Internet/ii-agent` | 3,342 | Apache-2.0 | Framework to build and deploy intelligent agents. | YES: `CLAUDE.md`. |
| `jim-schwoebel/awesome_ai_agents` | 1,747 | Apache-2.0 | Large awesome list of AI-agent resources. | NO: no detected Claude-native path. |

### Query 5: `topic:llm-orchestration stars:>500`

| Repo | Stars | License | Description | Native Claude Code pathway |
|---|---:|---|---|---|
| `massgen/MassGen` | 1,014 | NOASSERTION | Terminal multi-agent scaling system for frontier model collaboration. | YES: `CLAUDE.md`. |
| `ChesterRa/cccc` | 845 | Apache-2.0 | Group-chat style coordination for coding agents with read receipts and remote ops. | YES: `claude-code` topic. |

## §4 Top Adoption Candidates (ranked, with Probe DAG scores)

Scoring rubric: 10 = strong install/study candidate. Components: Axis-1 adoption signal, Axis-2 license/trust, Axis-3 freshness/stars, Axis-4 direct fit for `claude-sota-pure`, Axis-5 non-duplication vs current MCP/plugin/hook/agent stack.

| Rank | Repo | Score | Verdict | Rationale |
|---:|---|---:|---|---|
| 1 | `rtk-ai/rtk` | 8.7 | STUDY-PILOT / install check | Apache-2.0, 48.5k stars, Claude-native markers, direct token-efficiency layer. Verify whether pure already has RTK before install; installed-runtime docs mention RTK but pure settings do not wire it. |
| 2 | `matt1398/claude-devtools` | 8.3 | STUDY-PILOT | MIT, 3.3k stars, direct Claude Code observability gap coverage. Not installed in pure state found. |
| 3 | `sirmalloc/ccstatusline` | 8.0 | STUDY-PILOT | MIT, 9.3k stars, highly targeted Claude Code statusline. Pure has `gsd-statusline.js`, so requires collision/benefit probe before adoption. |
| 4 | `safishamsi/graphify` | 7.8 | STUDY-PILOT / likely duplicate-risk | MIT, 48.3k stars, Claude Code skill + graph/RAG value. Current pure already has `gitnexus`, `serena`, `repomix`, `memory`; non-duplication risk is the main blocker. |
| 5 | `ChromeDevTools/chrome-devtools-mcp` | 7.6 | ALREADY-INSTALLED / keep | Apache-2.0, 39.7k stars, strong MCP utility. Already wired as `chrome-devtools` in `.mcp.json`; no new install action. |
| 6 | `czlonkowski/n8n-mcp` | 7.3 | STUDY-PILOT if n8n workflows become a use case | MIT, 20.8k stars, Claude markers. Fit depends on actual n8n demand; otherwise avoid tool sprawl. |
| 7 | `fynnfluegge/agtx` | 7.2 | STUDY-PILOT | Apache-2.0, 1.0k stars, Claude/Codex/Gemini coordination board. Overlaps with GSD agents and git-worktree orchestration; probe harness fit first. |
| 8 | `VoltAgent/awesome-claude-code-subagents` | 7.0 | CITE/STUDY | MIT, 19.8k stars, Claude-specific subagent catalog. Pure already has 35 agents plus CE plugin agents; mine for gaps, do not bulk import. |
| 9 | `thedotmack/claude-mem` | 6.8 | DEFER / duplicate-risk | Apache-2.0, 75.9k stars, strong Claude-native memory story. Pure already has `memory`, `mcp-memory-service`, context-mode, and GSD context hooks. |
| 10 | `ChesterRa/cccc` | 6.6 | STUDY-PILOT | Apache-2.0, 845 stars, coordination primitive for Claude/Codex/Gemini/opencode. Small but direct orchestration fit. |
| 11 | `massgen/MassGen` | 6.0 | CITE/STUDY | Multi-agent terminal orchestration. License unresolved (`NOASSERTION`) lowers score. |
| 12 | `ruvnet/ruflo` | 5.8 | DEFER | MIT and high stars, but broad platform scope and likely overlap with existing GSD/agent-team/orchestration stack. |

Immediate non-candidates despite high stars:
- `n8n-io/n8n`: high value generally, but `NOASSERTION` from API and broad workflow-platform scope; only adopt if workflow automation becomes a concrete runtime requirement.
- `CherryHQ/cherry-studio`: AGPL-3.0.
- `sansan0/TrendRadar`, `1Panel-dev/MaxKB`, `nukeop/nuclear`, `miantiao-me/aigc-weekly`: GPL/AGPL/domain-fit blockers.
- `google-gemini/gemini-cli`: excellent terminal agent but not net-new for Claude SOTA runtime fit; Gemini CLI class already known operationally.
- `oraios/serena`, `context7`, `context-mode`, `github MCP`, `chrome-devtools MCP`: already installed or functionally represented in pure.

## §5 Verdict Summary

**Mission 1 verdict**: Outer README contains 20 net-new GitHub repo slugs after W237 filtering plus 3 GitHub 404/ambiguous slugs. Highest-signal README net-new repos are `safishamsi/graphify`, `Yeachan-Heo/oh-my-claudecode`, `sirmalloc/ccstatusline`, `matt1398/claude-devtools`, `daymade/claude-code-skills`, `fynnfluegge/agtx`.

**Mission 2 verdict**: `Z:/claude-sota-pure` is not empty. It currently has 15 MCP servers in `.mcp.json`, 24 enabled plugins in settings, 15 wired hook commands plus statusline, and 35 agent files under `.claude/agents/`. W229 provenance tail confirms `compound-engineering` and `explanatory-output-style` were installed/enabled and pending `/reload-plugins`.

**Mission 3 verdict**: Topic harvest surfaced many high-star net-new repos, but the top actionable candidates are narrower: token-efficiency/observability/statusline/graph-context/coordination repos. The runtime already has substantial MCP, plugin, hook, and agent coverage; adoption should proceed by single-candidate Probe DAG, not bulk import.

**Recommended next probes**
1. Verify pure RTK state (`rtk --version`, launcher/env wiring, settings hooks) before any RTK action.
2. Probe `matt1398/claude-devtools` for install path, data access risk, and overlap with `ccusage`/GSD context monitor.
3. Probe `sirmalloc/ccstatusline` against existing `gsd-statusline.js` and Claude settings `statusLine`.
4. Mine `VoltAgent/awesome-claude-code-subagents` and `daymade/claude-code-skills` for one or two genuinely missing roles/skills only.
5. Treat high-star broad platforms (`n8n`, `trigger.dev`, `Cherry Studio`, `JeecgBoot`) as demand-triggered, not baseline runtime installs.

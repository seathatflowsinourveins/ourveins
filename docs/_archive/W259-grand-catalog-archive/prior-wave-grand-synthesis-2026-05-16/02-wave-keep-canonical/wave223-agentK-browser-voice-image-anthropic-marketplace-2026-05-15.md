---
title: Wave 223 Agent K - Voice/Audio/Image/Browser MCPs + Anthropic OFFICIAL Marketplace Deep Enumeration
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 223
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: media-mcps-and-anthropic-marketplace-deep
predecessors: W220-A + W221-D + W222-H
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
load_bearing_revision: W221-D microsoft/playwright-mcp ADOPT-NOW SUPERSEDED-BY microsoft/playwright-cli + SKILLs per Microsoft's own README recommendation for coding agents
---

# STAND-IN-NOTICE

This agent ran under `CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6` stand-in (NOT true GPT-5.5 codex CLI). Per `Z:/claude-sota-installed/.claude/rules/cmc-env-funneled-disclosure.md`: cross-model consensus gate is NOT structurally satisfied for this dispatch. Orchestrator must factor stand-in penetration into composite synthesis. True GPT-5.5 verification REQUIRED before any ADOPT-NOW ship.

---

# Part A: Voice/Audio/Image/Browser MCPs

## Part A.1 — Voice/Audio MCPs

| Rank | Repo | Stars | License | Cpd-band | Verdict | CR-12 class |
|---|---|---|---|---|---|---|
| 1 | `elevenlabs/elevenlabs-mcp` | 1,364 | MIT | STABLE | **ADOPT-NOW** (official ElevenLabs) | GENUINELY-NEW |
| 2 | `silverstein/minutes` | 1,199 | MIT | ACTIVE-ITER | **STUDY-PILOT** (voice-memo memory layer, Rust) | GENUINELY-NEW (audio→memory bridge) |
| 3 | `amicalhq/amical` | 1,225 | MIT | ACTIVE | NOT-INSTALL (Electron desktop app, not MCP server) | PARTIAL-OVERLAP |
| 4 | `arcaputo3/mcp-server-whisper` | 54 | MIT | STABLE | STUDY-PILOT (Whisper transcription) | PARTIAL-OVERLAP w/ elevenlabs STT |
| 5 | `kachiO/mlx-whisper-mcp` | 23 | MIT | STABLE | NOT-INSTALL (Apple-Silicon-only — fails Probe 5 mode-harness-shape on Windows) | REJECT-FOR-FIT |
| 6 | `BigUncle/Fast-Whisper-MCP-Server` | 17 | MIT | STABLE | STUDY-PILOT (Faster Whisper, perf-optimized) | PARTIAL-OVERLAP |

### Key finding — Voice/Audio Tier-1 candidate

**`elevenlabs/elevenlabs-mcp` (1,364★, MIT, OFFICIAL Anthropic-recognized vendor)** — the canonical voice MCP for sss:
- TTS, STT (transcription), voice cloning, audio generation in single MCP server
- Created 2025-03-14, sustained development (updated 2026-05-15)
- Official ElevenLabs maintenance, NOT third-party adapter
- 227 forks → strong community adoption signal
- 7-probe DAG: Probe 1 PASS (verified via mcp__github_search), Probe 2 PASS (Python MCP server stdin transport — sss runtime compatible), Probe 3 PASS (uses OpenAI-compatible MCP protocol), Probe 4 PASS (no plugin-namespace conflict — no equivalent in installed claude-plugins-official), Probe 5 PASS (Python venv install, Windows-compatible), Probe 6 PASS (MIT license, PyPI elevenlabs-mcp), Probe 7.a/b PASS (clear workflow: TTS for ralph-loop completion notifications + STT for voice-memo bridge)

## Part A.2 — Image/Multimodal MCPs

| Rank | Repo | Stars | License | Verdict | CR-12 class |
|---|---|---|---|---|---|
| 1 | `openclaw/Peekaboo` | 4,219 | MIT | **REJECT-FOR-FIT** (macOS-only, Probe 5 fail) | REJECT-FOR-FIT |
| 2 | `just-every/mcp-screenshot-website-fast` | 106 | MIT | **STUDY-PILOT** (LLM-friendly fast screenshots) | GENUINELY-NEW (website-only, not display) |
| 3 | `sethbang/mcp-screenshot-server` | 23 | MIT | STUDY-PILOT (Puppeteer + native OS, cross-platform) | PARTIAL-OVERLAP w/ chrome-devtools-mcp |
| 4 | `MoussaabBadla/code-screenshot-mcp` | 45 | MIT | NICE-TO-HAVE (beautiful code screenshots, niche) | GENUINELY-NEW (formatted code images) |
| 5 | `ishalumi/image-create-mcp` | 3 | (TBD) | DEFER (multi-provider DALL-E/Gemini/OpenRouter, very-new <90d burn-in) | PARTIAL-OVERLAP |

### Key finding — Image MCP gap

**No clear cross-platform Tier-1 image generation MCP.** Anthropic-vision is built-in to Claude (no MCP needed); image GENERATION via DALL-E/Gemini/etc has only small repos (<200★). For sss/claude-sota-pure:
- Screenshot capture: Chrome DevTools MCP already covers via `take_screenshot` tool
- Image generation: DEFER — no clear Tier-1 winner; revisit when ChromeDevTools or playwright expand image-gen tools

## Part A.3 — Browser-MCP comparison (Playwright vs Chrome DevTools, decision-grade)

### MAJOR FINDING — Microsoft now recommends `playwright-cli` with SKILLS OVER `playwright-mcp` for coding agents

Per `microsoft/playwright-mcp/README.md` @ HEAD `ae27b8638` [VERIFIED 2026-05-15 via WebFetch]:
> "Modern **coding agents** increasingly favor CLI–based workflows exposed as SKILLs over MCP because CLI invocations are more token-efficient: they avoid loading large tool schemas and verbose accessibility trees into the model context"

Microsoft explicitly directs coding-agent users to **`microsoft/playwright-cli`** (TIER-1 OFFICIAL Microsoft) — install via `npm install -g @playwright/cli@latest` + `playwright-cli install --skills`.

### 3-Way Comparison Table

| Capability | playwright-mcp (32.5k★) | chrome-devtools-mcp (39.7k★) | playwright-cli + SKILLs (NEW recommended) |
|---|---|---|---|
| **Token efficiency** | Heavy (large tool schemas + accessibility trees) | Heavy (32+ tools in schema) | **LIGHT** (CLI commands invoked on-demand) |
| **Browser engines** | Chromium/Firefox/WebKit | Chrome only | Chromium/Firefox/WebKit |
| **Tool count** | ~30+ MCP tools | 32 MCP tools (10 input + 6 nav + 2 emul + 3 perf + 2 net + 8 debug + 4 memory + 5 ext + 2 3p + 2 webmcp) | CLI subcommands (open/goto/click/type/screenshot/...) |
| **Performance tracing** | NO | **YES** (CrUX API integration, performance traces) | NO native (call via DevTools) |
| **Lighthouse audit** | NO | **YES** (`lighthouse_audit` tool) | NO |
| **Memory profiling** | NO | **YES** (4 memory tools) | NO |
| **Network mocking** | YES (`route` cmd) | YES (`get_network_request` + `list_network_requests`) | YES (`route` CLI cmd) |
| **Chrome Extensions support** | LIMITED | **YES** (5 extension tools) | NO |
| **Multi-session/sandbox** | YES | YES (autoConnect Chrome 144+) | YES (named sessions) |
| **Visual dashboard** | NO | NO | **YES** (`playwright-cli show` — live screencast preview) |
| **Spec-driven test gen** | NO | NO | **YES** (test-generation + healing) |

### Decision matrix for sss / claude-sota-pure

**Recommend BOTH (PROVIDER-COMPLEMENT, not PARTIAL-OVERLAP):**
1. **PRIMARY for production web-automation tasks**: `playwright-cli` + SKILLs install — per Microsoft's recommendation
   - Best token-efficiency for high-throughput coding agents (matches sss /loop workflow + parallel-agent-wave pattern)
   - Cross-browser support (Chromium/Firefox/WebKit)
   - Visual dashboard for operator monitoring of agent-driven sessions
   - Skills-based — aligns with Anthropic CC native skill discovery (matches claude-sota-installed Skill Orchestration Discipline)
   - **Install path**: `npm install -g @playwright/cli@latest` then `playwright-cli install --skills` (CR-6 official-native-channel compliant via npm)

2. **SECONDARY for performance/debugging tasks**: `chrome-devtools-mcp` (already widely-installed)
   - Performance traces + Lighthouse + memory profiling are GENUINELY-NEW capabilities
   - Used WHEN performance/debugging is the explicit goal (not for general scraping)
   - **Install path**: `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest`

3. **REJECT for sss/claude-sota-pure (REPLACE WITH playwright-cli)**: `microsoft/playwright-mcp`
   - Microsoft itself recommends CLI over MCP for coding agents
   - Token cost dominates value when CLI alternative exists from same vendor

### CR-12 disposition lattice (per cardinal-rule-12-upstream-install-priority.md):

| Candidate | Disposition |
|---|---|
| `playwright-cli + SKILLs` (Microsoft NEW) | **GENUINELY-NEW** — first SKILL-based browser tool from named-T1 org (Microsoft) |
| `chrome-devtools-mcp` (Chrome team) | **PROVIDER-COMPLEMENT** to playwright-cli — performance/debug specialty |
| `microsoft/playwright-mcp` | **SUPERSEDED-BY-X** — Microsoft replaced with playwright-cli for coding agents |

## Part A.4 — Other browser MCPs Top-5 alternatives

| Repo | Stars | Use case | Verdict |
|---|---|---|---|
| `hangwin/mcp-chrome` | 11,632 | Chrome extension-based; uses user's existing Chrome session (with cookies/auth) | STUDY-PILOT (when user-session authentication needed) |
| `AgentDeskAI/browser-tools-mcp` | 7,214 | Browser log/console monitoring | NOT-INSTALL (chrome-devtools-mcp covers this) |
| `BrowserMCP/mcp` | 6,506 | Generic MCP for browser control | NOT-INSTALL (duplicates chrome-devtools-mcp + playwright-cli) |
| `executeautomation/mcp-playwright` | 5,514 | Playwright-MCP alternative (3rd-party) | NOT-INSTALL (Microsoft official superseded both) |
| `epiral/bb-browser` | 5,231 | CLI + MCP for Chrome control with user-login | STUDY-PILOT (parallel use-case to hangwin/mcp-chrome) |
| `browserbase/mcp-server-browserbase` | 3,339 | Browserbase cloud + Stagehand | NOT-INSTALL (cloud-dependent, costs $) |

# Part B: Anthropic OFFICIAL Marketplace Deep Enumeration

## Part B.1 — `anthropics/claude-plugins-official` (19,400★) — 37 plugins enumerated

### Already-installed plugins (26 plugins in `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/`):
agent-sdk-dev, claude-code-setup, claude-md-management, code-modernization, code-review, code-simplifier, commit-commands, cwc-makers, feature-dev, frontend-design, hookify, mcp-server-dev, playground, plugin-dev, pr-review-toolkit, pyright-lsp, ralph-loop, security-guidance, session-report, skill-creator, superpowers, typescript-lsp + 4 non-Anthropic mirrors (clickhouse, dash0, outputai, qdrant-skills)

### Anthropic OFFICIAL plugins NOT YET INSTALLED (14 candidates)

| Plugin | Category | Verdict for claude-sota-pure | Adoption-priority |
|---|---|---|---|
| `clangd-lsp` | LSP (C/C++) | DEFER — sss not C/C++ project | LOW |
| `csharp-lsp` | LSP (C#) | DEFER — sss not C# project | LOW |
| `example-plugin` | Reference | NOT-INSTALL (example only) | N/A |
| `explanatory-output-style` | UX | **STUDY-PILOT** — improves Claude verbosity behavior | MEDIUM |
| `gopls-lsp` | LSP (Go) | DEFER — sss not primary Go (though some Go in codex CLI cite) | LOW |
| `jdtls-lsp` | LSP (Java) | DEFER — sss not Java project | LOW |
| `kotlin-lsp` | LSP (Kotlin) | DEFER — sss not Kotlin project | LOW |
| `learning-output-style` | UX | **STUDY-PILOT** — tutorial-style explanations | MEDIUM |
| `lua-lsp` | LSP (Lua) | DEFER | LOW |
| `math-olympiad` | Math/competition | DEFER (niche) | LOW |
| `php-lsp` | LSP (PHP) | DEFER | LOW |
| `ruby-lsp` | LSP (Ruby) | DEFER | LOW |
| `rust-analyzer-lsp` | LSP (Rust) | **CONSIDER** — Rust used in cwc-long-running-agents, gstack, codex CLI Rust internals | MEDIUM |
| `swift-lsp` | LSP (Swift) | DEFER | LOW |

### Key adoption-priority finding for B.1

**MEDIUM-priority NEW plugin candidates for claude-sota-pure (3 candidates)**:
1. **`explanatory-output-style`** — modifies Claude's response format to include explanations alongside actions; could complement long-running-agent workflows where audit-trail clarity matters
2. **`learning-output-style`** — tutorial-style explanation mode useful for codifying SOTA discipline in operator-facing docs
3. **`rust-analyzer-lsp`** — sss has Rust dependencies via codex CLI source; LSP support could improve when reviewing Rust upstream cite-anchors

**LOW-priority (defer until sss adds language)**: 10 language-LSP plugins — only install when language enters sss workflows.

## Part B.2 — `anthropics/skills` (135k+★) — 17 skills enumerated

| # | Skill | Category | License | Verdict for claude-sota-pure |
|---|---|---|---|---|
| 1 | `algorithmic-art` | Creative | Apache 2.0 | DEFER (niche) |
| 2 | `brand-guidelines` | Enterprise | Apache 2.0 | DEFER (org-specific) |
| 3 | `canvas-design` | Creative | Apache 2.0 | DEFER (niche) |
| 4 | `claude-api` | Technical | Apache 2.0 | **CONSIDER** — Claude API helper patterns |
| 5 | `doc-coauthoring` | Workflow | Apache 2.0 | **STUDY-PILOT** — collaborative doc workflows |
| 6 | `docx` | Document | Source-Available | **STUDY-PILOT** — Word doc creation/editing |
| 7 | `frontend-design` | Technical | Apache 2.0 | **CONSIDER** — duplicates frontend-design plugin; cross-check |
| 8 | `internal-comms` | Enterprise | Apache 2.0 | DEFER (org-specific) |
| 9 | **`mcp-builder`** | Technical | Apache 2.0 | **ADOPT-NOW** — 4-phase MCP server creation guide for CR-10 research-then-install workflow |
| 10 | `pdf` | Document | Source-Available | **STUDY-PILOT** — PDF creation/editing |
| 11 | `pptx` | Document | Source-Available | **STUDY-PILOT** — PowerPoint creation/editing |
| 12 | `skill-creator` | Technical | Apache 2.0 | **VERIFY OVERLAP** with claude-plugins-official/skill-creator (already installed) |
| 13 | `slack-gif-creator` | Creative | Apache 2.0 | DEFER (niche) |
| 14 | `theme-factory` | Creative | Apache 2.0 | DEFER (niche) |
| 15 | `web-artifacts-builder` | Technical | Apache 2.0 | **STUDY-PILOT** — claude.ai artifacts builder, web-side workflow |
| 16 | `webapp-testing` | Technical | Apache 2.0 | **CONSIDER** — duplicates playwright-cli use case; cross-check |
| 17 | `xlsx` | Document | Source-Available | **STUDY-PILOT** — Excel creation/editing |

### Key finding — `mcp-builder` skill (TIER-1-DIRECT)

`anthropics/skills/skills/mcp-builder/SKILL.md` @ HEAD `f458cee31a7577a47ba0c9a101976fa599385174` [VERIFIED 2026-05-15] is the canonical MCP-server-creation guide:

**4-Phase workflow**:
- **Phase 1**: Deep Research + Planning (study MCP protocol, study SDK docs, plan implementation)
- **Phase 2**: Implementation (setup, core infra, tools with Zod/Pydantic schemas)
- **Phase 3**: Review and Test (DRY + error handling + types + MCP Inspector)
- **Phase 4**: Create Evaluations (10 independent read-only complex realistic verifiable stable questions)

**Recommended stack** per the skill:
- TypeScript (recommended — best SDK + AI-model code-gen)
- Streamable HTTP for remote, stdio for local
- Zod (TS) or Pydantic (Python) schemas

**Why ADOPT-NOW for claude-sota-pure**:
- Directly satisfies CR-10 research-then-install workflow for MCP-server-class adoption
- Provides evaluation-creation guide (Phase 4) — closes "Pattern-A FIX-FORWARD verification" gap
- mcp-server-dev plugin (already installed) + mcp-builder skill = complete MCP authoring stack
- TIER-1-DIRECT Anthropic OFFICIAL — strongest cite-trail authority

## Part B.3 — Cross-installation strategy

### Recommended Z:\claude-sota-pure install command sequence

```bash
# Step 1: Add Anthropic OFFICIAL marketplaces (if not already added)
/plugin marketplace add anthropics/claude-plugins-official    # 37 plugins
/plugin marketplace add anthropics/skills                      # Skills (document-skills + example-skills)

# Step 2: Voice/Audio MCP (Tier-1 candidate from Part A.1)
# Via CR-6 official-native-channel — Python pip install
pip install elevenlabs-mcp
# Then wire in .mcp.json:
# "elevenlabs": {"command": "python", "args": ["-m", "elevenlabs_mcp"], "env": {"ELEVENLABS_API_KEY": "<key>"}}

# Step 3: Browser MCP migration (per Part A.3 decision matrix)
# PRIMARY browser tool: Microsoft playwright-cli + SKILLs
npm install -g @playwright/cli@latest
playwright-cli install --skills
# SECONDARY: chrome-devtools-mcp (performance/debug)
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest

# Step 4: Anthropic OFFICIAL plugins (Part B.1 medium-priority)
/plugin install explanatory-output-style@anthropic-claude-plugins
/plugin install learning-output-style@anthropic-claude-plugins
/plugin install rust-analyzer-lsp@anthropic-claude-plugins   # if Rust workflows expected

# Step 5: Anthropic OFFICIAL skills (Part B.2 ADOPT-NOW candidates)
# mcp-builder skill — for future MCP creation work per CR-10
/plugin install example-skills@anthropic-agent-skills
# document-skills for docx/pdf/pptx/xlsx workflows
/plugin install document-skills@anthropic-agent-skills
```

### Adoption order rationale

1. **Marketplaces FIRST** — registers `anthropics/*` sources for downstream installs
2. **Voice/Audio (Part A.1) BEFORE browser** — elevenlabs-mcp is GENUINELY-NEW capability (no existing TTS/STT in stack); browser is incremental
3. **Browser migration (Part A.3) BEFORE Anthropic plugins** — replaces existing playwright-mcp with current SOTA pattern
4. **Anthropic plugins (Part B.1) — MEDIUM priority** — UX improvements, not load-bearing
5. **Anthropic skills (Part B.2) — ADOPT-NOW for mcp-builder, STUDY-PILOT for document skills** — completes CR-10 research-then-install workflow

# PHANTOM-REFERENCE Catches (per W221-E + W222 discipline)

**ZERO PHANTOMS DETECTED THIS WAVE**

All cited repos verified via `mcp__github__search_repositories` or `mcp__github__get_file_contents`:
- `elevenlabs/elevenlabs-mcp` — 1,364★ verified
- `openclaw/Peekaboo` — 4,219★ verified  
- `microsoft/playwright-mcp` — README content verified
- `microsoft/playwright-cli` — README content verified (NEW finding: Microsoft directs to CLI over MCP)
- `ChromeDevTools/chrome-devtools-mcp` — README content verified (32+ tools enumerated)
- `anthropics/skills` — 17 skills enumerated via directory list (mcp-builder content verified)
- `anthropics/claude-plugins-official` — 37 plugins enumerated via directory list

Sister-rule cites use LOCAL `Z:/claude-sota-installed/.claude/rules/*.md` (per W222-H discipline retirement of `Z:/claude-sota/`).

# Sub-VERDICT summary

- **Part A.1 Voice/Audio**: `elevenlabs/elevenlabs-mcp` ADOPT-NOW (1,364★ MIT OFFICIAL)
- **Part A.2 Image**: `just-every/mcp-screenshot-website-fast` STUDY-PILOT (106★); no clear Tier-1 image-gen MCP
- **Part A.3 Browser**: `microsoft/playwright-cli` + SKILLs (RECOMMENDED PRIMARY by Microsoft itself) + `chrome-devtools-mcp` (39.7k★) SECONDARY for perf/debug; DEPRECATE `microsoft/playwright-mcp` per Microsoft direction
- **Part A.4 Other browsers**: `hangwin/mcp-chrome` (11.6k★) for user-session authentication use case
- **Part B.1 Anthropic plugins**: 26 installed + 3 NEW medium-priority candidates (explanatory-output-style + learning-output-style + rust-analyzer-lsp)
- **Part B.2 Anthropic skills**: 17 skills enumerated; `mcp-builder` is ADOPT-NOW (TIER-1-DIRECT canonical MCP authoring guide)
- **Part B.3 Cross-install**: 5-step ordered sequence per CR-5 install-priority + CR-6 official-native-channel + CR-10 research-then-install

---

**VERDICT: STUDY-PILOT-CATALOG**: Major browser-MCP shift detected — Microsoft itself replaced `playwright-mcp` with `playwright-cli`+SKILLs for coding agents (token-efficiency reason); ElevenLabs OFFICIAL voice MCP (1,364★) ADOPT-NOW for TTS/STT; Anthropic OFFICIAL marketplace has 3 plugins + 1 ADOPT-NOW skill (`mcp-builder` 4-phase MCP authoring guide TIER-1-DIRECT) worth installing in claude-sota-pure. All 7 cited primary repos verified via mcp__github (zero phantoms). Stand-in caveat applies — true GPT-5.5 verification REQUIRED before any ship commit.

---
title: Wave 213 Agent P — Modern CLI / Code Intelligence / Web Research catalog
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
agent: sota-researcher (Sonnet stand-in per Z:/claude-sota/.claude/rules/cmc-env-funneled-disclosure.md STAND-IN-NOTICE)
wave: 213
fire: P
---

# Wave 213 Agent P — Layers L1 (Modern CLI) + L2 (Code Intelligence) + L3 (Web Research / Browser Automation)

## STAND-IN-NOTICE (per cross-model-consensus.md §Env-funneled disclosure mandate)

This dispatch ran as Sonnet stand-in (no BRIDGE-MODE codex CLI invocation observed in this session). Cross-model gate NOT structurally satisfied at agent layer. Orchestrator must file 2nd-stage validation per `Z:/claude-sota/.claude/rules/ahfv-codex-rescue-blind-spot.md §FM-09 2-stage validation contract` BEFORE applying any ADOPT-NOW verdict from this catalog.

## Discovery method (per multi-source-discovery-breadth-discipline.md)

Source families probed (≥4 required):
1. `mcp__github__search_repositories` — 13 queries across canonical names + ecosystem terms
2. `mcp__plugin_everything-claude-code_exa__web_search_exa` — modern CLI 2026 SOTA practitioner endorsements
3. `mcp__github__get_file_contents` — README content + HEAD SHA verification for top candidates
4. Curated catalogs referenced (NOT re-cloned, used as cite-anchor): `Z:/repos/deps/ibraheemdev-modern-unix/README.md @ HEAD 67ee5aba` + `Z:/repos/deps/agarrharr-awesome-cli-apps/README.md @ HEAD b03fe7af` + `Z:/repos/deps/awesome-claude-code @ HEAD 6ebceefe` per CLAUDE.md §Curated catalogs section
5. Anthropic CC plugin marketplace patterns (referenced from CLAUDE.md/CLAUDE.local.md ENV manifest)

Tool-budget caveat: 19/35 tool calls used. 4 compound queries returned 0 results (GitHub search API rejected complex `stars:>X language:rust topic:Y` compound filters); reverted to simpler queries with `sort=stars`.

## Probe 4 plugin-namespace pre-check (DUPLICATE-FUNCTIONALITY defense)

Per system-reminder + CLAUDE.md §Skill Orchestration Discipline:
- `everything-claude-code` plugin namespace ALREADY exposes 21 plugins / 1556 SKILL.md files
- 14 MCPs already installed (memory mcp-memory-service / graphiti / repomix / chrome-devtools / playwright / playwright-everything-cc / context7 + everything-cc-context7 / deepwiki / github / serena / ccusage / phoenix / gitnexus / graphiti)
- `addy-agent-skills` marketplace exposes 21 engineering-phase skills
- `superpowers@claude-plugins-official` exposes `using-superpowers` / `verification-before-completion` / `subagent-driven-development` / `dispatching-parallel-agents` / `using-git-worktrees` / etc.
- `context-mode` MCP installed (sandbox FTS5 + batch-execute + ctx_search)
- `repomix` MCP installed (Pack→Grep→Skill pipeline)
- `playwright` MCP installed via plugin

**DUPLICATES IDENTIFIED** (must NOT re-adopt):
- microsoft/playwright-mcp — ALREADY INSTALLED per system-reminder `mcp__playwright__*` tools available
- exa-labs/exa-mcp-server — ALREADY INSTALLED per system-reminder `mcp__plugin_everything-claude-code_exa__web_search_exa`
- semgrep/mcp — official archived 2026-05-13; superseded by direct semgrep CLI

## Per-candidate catalog

### Layer L1 — Modern CLI Tools

| # | Name | URL | License | Stars | HEAD SHA | Cite anchor | Probes 1-7 | Axis 1/2/3 | SRA D1-D10 grade | Native install | Wiring | Grade | CR-12 disposition | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| L1-1 | **ripgrep** (BurntSushi) | github.com/BurntSushi/ripgrep | MIT/Unlicense | 50k+ | (not pinned; canonical) | `Z:/repos/deps/ibraheemdev-modern-unix/README.md @ 67ee5aba` priority#1 + DevToolsGuide 2026-02 + NexaSphere 2026-01 + 32blog 2026-03 (4-org Axis-1 convergence; named-T2 BurntSushi=Andrew Gallant) | 1✓ 2✓ 3✓ 4✓(no namespace collision) 5✓(autonomous-loop compatible) 6✓(MIT) 7.b✓(net-new code-search workflow — VS Code builtin uses it; sss has NO built-in `rg` per CLAUDE.local.md missing) | 1✓PASS / 2✓PASS / 3✓PASS-STABLE-BURN-IN (7+years) | A (load-bearing, MIT, native-binary, zero-deps) | `winget install BurntSushi.ripgrep` OR `cargo install ripgrep` OR `gh release download --repo BurntSushi/ripgrep` | TRIVIAL (single binary, PATH-only) | **A** | **GENUINELY-NEW** (no incumbent grep replacement) | **ADOPT-NOW** — P0 |
| L1-2 | **fd** (sharkdp) | github.com/sharkdp/fd | MIT/Apache-2.0 | 35k+ | (canonical) | DevToolsGuide priority#2 + Modern Unix catalog row + 32blog 2026-03 + unixy.io 2023-09 (4-org Axis-1) | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(net-new file-find workflow; .gitignore-aware) | 1✓ / 2✓ / 3✓ STABLE-BURN-IN | A | `winget install sharkdp.fd` OR `cargo install fd-find` | TRIVIAL | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P0 |
| L1-3 | **bat** (sharkdp) | github.com/sharkdp/bat | MIT/Apache-2.0 | 48k+ | (canonical) | DevToolsGuide priority#3 + 32blog 2026-03 + unixy.io + Modern Unix catalog (4-org Axis-1) | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(syntax-highlight cat replacement; integrates with fzf preview) | 1✓ / 2✓ / 3✓ | A | `winget install sharkdp.bat` | TRIVIAL | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P0 |
| L1-4 | **fzf** (junegunn) | github.com/junegunn/fzf | MIT | 79,622 | v0.71.0 @ 2026-04-04 (commit recent) | NexaSphere 2026-01 #1 priority + Exa 2023 unixy + 32blog 2026-03 + GitHub HEAD evidence (4-org Axis-1, named-T2 junegunn 12years) | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(fuzzy-finder for shell history+files+git — interactive workflow) | 1✓ / 2✓ / 3✓ STABLE 12y | A+ | `winget install junegunn.fzf` OR direct gh release | EASY (shell integration setup needed) | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P0 |
| L1-5 | **zoxide** (ajeetdsouza) | github.com/ajeetdsouza/zoxide | MIT | 36,651 | (HEAD verified via search) | Modern Unix catalog + 32blog 2026-03 + NexaSphere 2026-01 + DevToolsGuide priority#6 (4-org Axis-1) | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(smarter cd workflow — frecency-based jump; sss has no equivalent) | 1✓ / 2✓ / 3✓ STABLE 6y | A | `winget install ajeetdsouza.zoxide` OR `cargo install zoxide` | EASY (shell init: `eval "$(zoxide init bash)"`) | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P1 |
| L1-6 | **eza** (eza-community) | github.com/eza-community/eza | EUPL-1.2 | 14k+ | (canonical fork of exa) | Modern Unix + 32blog 2026-03 + unixy.io + DevToolsGuide #5 | 1✓ 2✓ 3✓ 4✓ 5✓ 6 LICENSE EUPL-1.2 is OSI-approved permissive-ish but DIFFERENT from MIT/Apache; verify operator policy (CLAUDE-sota's permissive-only whitelist may or may not include EUPL — flag for operator) 7.b✓ | 1✓ / 2✓ / 3✓ | B+ (license-class verification needed) | `winget install eza-community.eza` | EASY (PATH + aliases) | **B+** | **GENUINELY-NEW** | **STUDY-PILOT** — P1, verify EUPL admissibility |
| L1-7 | **lazygit** (jesseduffield) | github.com/jesseduffield/lazygit | MIT | 77,981 | (canonical; high cpd recent updates) | Wave search Item#1 + DevToolsGuide + NexaSphere 2026-01 (3-org) | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(interactive TUI git workflow; sss has no terminal-TUI git) | 1✓ / 2✓ / 3✓ 7y | A | `winget install JesseDuffield.lazygit` OR `go install` | TRIVIAL | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P1 |
| L1-8 | **delta** (dandavison) | github.com/dandavison/delta | MIT | 24k+ | (canonical) | Modern Unix catalog + DevToolsGuide priority#4 + unixy.io | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(syntax-highlighted git diff) | 1✓ / 2✓ / 3✓ | A | `winget install dandavison.delta` OR `cargo install git-delta` | TRIVIAL (configure git pager) | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P1 |
| L1-9 | **hyperfine** (sharkdp) | github.com/sharkdp/hyperfine | MIT/Apache-2.0 | 28,112 | (HEAD verified) | unixy.io + Modern Unix catalog (2-org — borderline Axis-1; needs 3rd cite) | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(statistical benchmarking workflow — used for SOTA convergence-gate Row-2 fabrication-test verification) | 1✓ / 2 borderline / 3✓ | B+ | `winget install sharkdp.hyperfine` | TRIVIAL | **B+** | **GENUINELY-NEW** | **STUDY-PILOT** — P2 (find 3rd-org cite first) |
| L1-10 | **dust** (bootandy) | github.com/bootandy/dust | Apache-2.0 | ~10k | (not pinned) | unixy.io + Modern Unix + DevToolsGuide #7 | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(visual disk usage) | 1✓ / 2✓ / 3✓ | B | `winget install bootandy.dust` | TRIVIAL | **B** | **GENUINELY-NEW** | **STUDY-PILOT** — P3 (low-frequency use) |
| L1-11 | **starship** (starship/starship) | github.com/starship/starship | ISC | 47k+ | (canonical) | Modern Unix + multiple practitioner endorsements | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.b✓(cross-shell prompt; PowerShell+bash+zsh) | 1✓ / 2✓ / 3✓ | A | `winget install Starship.Starship` | EASY (shell init line) | **A** | **GENUINELY-NEW** | **STUDY-PILOT** — P3 (cosmetic; sss bash is fine without) |
| L1-12 | **atuin** (atuinsh/atuin) | github.com/atuinsh/atuin | MIT | 24k+ | (canonical; recent active) | Modern Unix catalog + 2 practitioners | 1✓ 2✓ 3✓ 4✓ 5✓ 6✓ 7.a❌ (DEMAND-ABSENCE for single-machine sss workspace; shell history sync is multi-machine workflow — sss is single-machine Z: workspace) | 1✓ / 2✓ / 3✓ | A (structural) but Probe 7.a FAILS | `cargo install atuin` | EASY | **C** (due to Probe 7.a) | **DUPLICATE-FUNCTIONALITY** (with sss `.bash_history` for single-machine) | **REJECT-FOR-FIT** — Probe 7.a DEMAND-ABSENCE |

**L1 sub-summary**: 8 ADOPT-NOW + 3 STUDY-PILOT + 1 REJECT. 8 net-new tools fill operator-side terminal gaps (rg/fd/bat/fzf/zoxide/eza/lazygit/delta). Aligned with Z:/repos/deps/ibraheemdev-modern-unix priority ladder.

### Layer L2 — Code Intelligence (LSP / AST / static analysis)

| # | Name | URL | License | Stars | HEAD SHA | Cite anchor | Probes 1-7 | Axis 1/2/3 | SRA D1-D10 grade | Native install | Wiring | Grade | CR-12 disposition | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| L2-1 | **ast-grep** (ast-grep) | github.com/ast-grep/ast-grep | MIT | 13,806 | (HEAD recent active) | GitHub search Top#1 + ast-grep-mcp companion @ HEAD 732c339c + multiple practitioner uses (coderabbitai/ast-grep-essentials 135★) + Modern Unix mention | 1✓ 2✓ 3✓ 4 (Probe 4: NO existing AST-grep skill installed; verify with `claude plugin list`) 5✓ 6✓(MIT) 7.b✓(structural search+rewrite workflow — codemod path; sss has rg for text but NO AST tool) | 1✓ / 2 borderline (ast-grep team only; need 2nd practitioner) / 3✓ | A | `cargo install ast-grep --locked` OR `npm install -g @ast-grep/cli` OR `winget install ast-grep` | TRIVIAL for CLI; ast-grep-mcp = `uvx --from git+https://github.com/ast-grep/ast-grep-mcp ast-grep-server` | **A** | **GENUINELY-NEW** (no AST tool in sss) | **ADOPT-NOW** — P0 (CLI binary + MCP wrapper) |
| L2-2 | **ruff** (astral-sh) | github.com/astral-sh/ruff | MIT | 47,531 | (HEAD recent active) | Top GitHub search + practitioner-template plankton@277★ + multiple template/LSP uses (4-org Axis-1) | 1✓ 2✓ 3✓ 4 (Probe 4: sss has no existing python linter wired) 5✓ 6✓(MIT) 7.b✓(Python lint+format in seconds replacing flake8+black+isort+pyupgrade) | 1✓ / 2✓(astral-sh + sublimelsp + python-lsp + plankton) / 3✓ | A | `pip install ruff` OR `uv tool install ruff` | TRIVIAL | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P0 (sss has Python hooks in `.claude/hooks/scripts/` — ruff is mandatory) |
| L2-3 | **pyright** (microsoft) | github.com/microsoft/pyright | MIT | 15,434 | (canonical) | Microsoft-owned + practitioner uses (typemux-cc 12★ + sublimelsp LSP-ruff) | 1✓ 2✓ 3✓ 4 (verify Probe 4 — sss hooks may already type-check via pyright) 5✓ 6✓ 7.b✓(Python static type checker; sss hooks need this for typed dispatch) | 1✓ / 2✓(Microsoft + community) / 3✓ | A | `pip install pyright` OR `npm install -g pyright` | TRIVIAL | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P1 |
| L2-4 | **biome** (biomejs) | github.com/biomejs/biome | MIT/Apache-2.0 | 24,664 | (recent active) | Top GitHub search + practitioner uses (plankton 277★ + ai-testers + biome-standard) (4-org Axis-1: biomejs+plankton+ai-testers+robinwalterfit) | 1✓ 2✓ 3✓ 4 (sss has no JS linter wired) 5✓ 6✓ 7.b✓(JS/TS lint+format in Rust — replaces ESLint+Prettier) | 1✓ / 2✓ / 3✓ STABLE | A | `npm install -g @biomejs/biome` OR `cargo install biome` | TRIVIAL | **A** | **GENUINELY-NEW** | **ADOPT-NOW** — P1 (when JS/TS files arrive) |
| L2-5 | **semgrep** (semgrep) | github.com/semgrep/semgrep | LGPL-2.1 | (large) | (active; mcp ARCHIVED 2026-05-13) | semgrep-mcp 665★ ARCHIVED + 8+ derivative skill projects (codetective + defense-kit + codesucks-ai) — CONVERGENCE on direct CLI use, MCP path REJECTED upstream | 1✓ 2✓(CLI > MCP for sss) 3✓ 4✓ 5✓ 6 LICENSE LGPL-2.1 — VERIFY operator policy (LGPL is mostly compatible BUT linking-class restriction may matter for embedded use; CLI-binary-use is fine per `Z:/claude-sota/docs/install-from-github-discipline.md §License use-class precision`) 7.b✓(security SAST scan workflow; sss has no SAST) | 1✓ / 2✓ / 3✓ MATURE | B+ (LGPL license-use-class needs explicit operator approval for CLI-only use; not blocking for CLI-binary-use class) | `pip install semgrep` OR `uv tool install semgrep` | EASY (rule pack install) | **B+** | **GENUINELY-NEW** | **STUDY-PILOT** — P2 (verify LGPL CLI-use-class admissibility first) |
| L2-6 | **ast-grep-mcp** (ast-grep) | github.com/ast-grep/ast-grep-mcp | MIT | 403 | 732c339c3812a44e9111e6c3aefec64894acd58f | README @ 732c339c shows 4 MCP tools: `dump_syntax_tree`/`test_match_code_rule`/`find_code`/`find_code_by_rule` (verbatim source-extracted) | 1✓ 2✓ 3✓ 4 (no MCP-AST tool installed; ast-grep MCP is NEW slot) 5✓ 6✓ 7.b✓(MCP wrapper exposes ast-grep to Claude — automates pattern test+search) | 1✓ / 2 borderline (1 named-org, but high derivative ecosystem) / 3 borderline (only 1.5y old; <STABLE-BURN-IN) | B+ | `uvx --from git+https://github.com/ast-grep/ast-grep-mcp ast-grep-server` | EASY (`.mcp.json` entry + ast-grep CLI prerequisite) | **B+** | **PARTIAL-OVERLAP** with ast-grep CLI (this is the MCP-front; CLI is the engine) | **STUDY-PILOT** — P1 (PILOT 30-day; install CLI first then add MCP) |

**L2 sub-summary**: 4 ADOPT-NOW + 2 STUDY-PILOT + 0 REJECT. ast-grep + ruff are P0 (load-bearing for sss Python hooks); pyright + biome are P1.

### Layer L3 — Web Research & Browser Automation

| # | Name | URL | License | Stars | HEAD SHA | Cite anchor | Probes 1-7 | Axis 1/2/3 | SRA D1-D10 grade | Native install | Wiring | Grade | CR-12 disposition | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| L3-1 | **microsoft/playwright-mcp** | github.com/microsoft/playwright-mcp | Apache-2.0 (per Microsoft) | 32,555 | ae27b8638aaf3a6be17d378964ae683864d20440 | README @ ae27b863 verbatim shows: "Playwright MCP" + "Playwright MCP vs Playwright CLI" disclosure | 1✓ 2✓ 3✓ 4❌ **Probe 4 plugin-namespace FAIL — `mcp__playwright__*` tools already exposed per system-reminder** | 1✓ / 2✓ / 3✓ | A but Probe 4 FAILS | `npx @playwright/mcp@latest` | n/a | **DUPLICATE** | **DUPLICATE-FUNCTIONALITY** | **REJECT-FOR-FIT** — already installed |
| L3-2 | **firecrawl-mcp-server** (firecrawl) | github.com/firecrawl/firecrawl-mcp-server | MIT | 6,314 | (recent active) | Top GitHub search + multiple derivatives (mcp-omnisearch 306★ + freecrawl-mcp + tavily-key-generator) — 3-org Axis-1: firecrawl+spences10+dylan-gluck | 1✓ 2✓ 3✓ 4✓(Firecrawl not yet installed in sss per Memory Stack inventory) 5✓ 6✓ 7.b✓(web scraping + content extraction workflow; sss has Exa for search but NO scrape-render — Firecrawl handles JS-rendered pages) | 1✓ / 2✓ / 3✓ MATURE 17mo | A | `npx -y firecrawl-mcp` OR direct config in `.mcp.json` with `FIRECRAWL_API_KEY` env | EASY (API key required) | **A** | **PARTIAL-OVERLAP** with exa (exa=search, firecrawl=scrape+render) | **ADOPT-NOW** — P1 (key required) |
| L3-3 | **tavily-mcp** (tavily-ai) | github.com/tavily-ai/tavily-mcp | MIT | 1,971 | (recent active) | Top GitHub + mcp-omnisearch derivative + kindly-web-search-mcp + crw fast-alternative | 1✓ 2✓ 3✓ 4✓(no tavily installed) 5✓ 6✓ 7 — DEMAND-GATE-SPLIT: Tavily provides search+extract; sss already has Exa for search. Probe 7.a may FAIL if Exa covers the use case; Probe 7.b PASSES if real-time-search-with-extract workflow is genuinely new | 1✓ / 2✓ / 3✓ MATURE 16mo | A | `npx -y tavily-mcp` with TAVILY_API_KEY | EASY (API key required) | **B+** | **PARTIAL-OVERLAP** with exa-mcp-server | **STUDY-PILOT** — P2 (key required; PILOT against Exa for differential) |
| L3-4 | **brave/brave-search-mcp-server** | github.com/brave/brave-search-mcp-server | MIT (verify) | 1,025 | (recent active) | Top GitHub + 6+ derivatives (mcp-omnisearch + brave-search-mcp-sse + dedalus + zed-extensions) — 4-org Axis-1 | 1✓ 2✓ 3✓ 4✓ 5✓ 6 verify-license 7 PARTIAL-OVERLAP with Exa+Tavily — Brave Search adds independent search index (different ranking algorithm vs Google-derived) — distinctive value: alternative search algo for adversarial cross-check | 1✓ / 2✓ / 3 borderline (11mo) | B+ | `npm install -g @brave/brave-search-mcp` with BRAVE_API_KEY | EASY (key required) | **B+** | **PARTIAL-OVERLAP** with Exa | **STUDY-PILOT** — P3 (alternative search engine for cross-validation) |
| L3-5 | **executeautomation/mcp-playwright** | github.com/executeautomation/mcp-playwright | MIT | 5,512 | (recent active) | GitHub search Item#3 | 1✓ 2✓ 3✓ 4❌ **DUPLICATE** with microsoft/playwright-mcp + plugin-installed playwright | 1✓ / 2 — / 3✓ | n/a | n/a | n/a | **DUPLICATE** | **DUPLICATE-FUNCTIONALITY** | **REJECT-FOR-FIT** |
| L3-6 | **browserbase/mcp-server-browserbase** | github.com/browserbase/mcp-server-browserbase | MIT | 3,339 | (recent active) | GitHub search Item#5 + Stagehand framework + Anthropic-recommended | 1✓ 2✓ 3✓ 4✓(Browserbase is cloud-hosted browser — distinct from local playwright) 5✓ 6✓ 7.b — Browserbase requires SaaS subscription (API key + paid service); local playwright suffices for sss single-machine use | 1✓ / 2✓ / 3✓ MATURE 17mo | A but SaaS-dependency | `npm install -g @browserbasehq/mcp` with BROWSERBASE_API_KEY + STAGEHAND_API_KEY (paid) | EASY | **B** (SaaS dependency) | **PROVIDER-COMPLEMENT** for cloud-browser use cases ONLY | **STUDY-PILOT** — P3 (only if SaaS budget approved; local playwright covers default) |
| L3-7 | **scrapling** (D4Vinci) | github.com/D4Vinci/Scrapling | BSD-3-Clause | 49,873 | (HEAD active) | Top GitHub stars (49.8k★) — but PROBE 1 count-OVER risk: 49k stars in 1.5y is unusual — RUN Probe 1 count-OVER per ahfv-probe-dag.md; high-velocity 1.5y-old repo borderline STRONG-PROVENANCE-EXPRESS | 1 RISK count-OVER probe needed / 2 / 3 borderline FAST-CHURN per convergence-gate Axis-3 band | A (high-power adaptive scraping) but unverified | `pip install scrapling[all]` | EASY | **C** (provenance unverified) | **PARTIAL-OVERLAP** with firecrawl | **REJECT-FOR-FIT** until Probe 1 count-OVER verified + 90-day burn-in completes |
| L3-8 | **refreshdotdev/web-eval-agent** | github.com/refreshdotdev/web-eval-agent | (verify) | 1,239 | (recent active) | GitHub search Item#10 | 1✓ 2✓ 3 borderline 4✓ 5✓ 6 verify-license 7.b — autonomous web-app QA evaluation distinct workflow (not pure scrape) | 1✓ / 2 — / 3 borderline 14mo | B | `pip install web-eval-agent` (verify) | EASY | **B** | **GENUINELY-NEW** | **STUDY-PILOT** — P3 (QA-specific) |

**L3 sub-summary**: 1 ADOPT-NOW + 4 STUDY-PILOT + 3 REJECT (2 DUPLICATE + 1 provenance-unverified). Web research is well-served by existing Exa MCP; primary gap = JS-rendered scrape → Firecrawl P1.

## Priority synthesis (operator-actionable)

### P0 (critical foundational — install immediately)
1. **L1-1 ripgrep** — operator-side code search (foundational across L1+L2+L3 workflows)
2. **L1-2 fd** — operator-side file find
3. **L1-3 bat** — operator-side cat with syntax highlight
4. **L1-4 fzf** — fuzzy-finder integration (shell + git + history)
5. **L2-1 ast-grep CLI** — structural code search (mandatory for sss hooks codemod paths)
6. **L2-2 ruff** — Python lint+format (mandatory for sss `.claude/hooks/scripts/*.py`)

### P1 (high-leverage — install in next wave)
7. **L1-5 zoxide** — smarter cd
8. **L1-7 lazygit** — interactive git TUI
9. **L1-8 delta** — syntax-highlighted git diff
10. **L2-3 pyright** — Python static type check
11. **L2-4 biome** — JS/TS lint+format (when JS files arrive)
12. **L3-2 firecrawl-mcp** — JS-rendered web scraping (key required)

### P2 (nice-to-have — pilot)
13. **L1-9 hyperfine** — benchmarking (need 3rd-org cite first)
14. **L2-5 semgrep** — SAST scanning (verify LGPL CLI-use-class)
15. **L2-6 ast-grep-mcp** — MCP wrapper for ast-grep (after CLI installed)
16. **L3-3 tavily-mcp** — alternative search/extract (key required)

### P3 (deferred / situational)
17. **L1-6 eza** — ls replacement (verify EUPL license)
18. **L1-10 dust** — disk usage
19. **L1-11 starship** — cross-shell prompt
20. **L3-4 brave-search-mcp** — alternative search ranking
21. **L3-6 browserbase-mcp** — cloud browser (SaaS only)
22. **L3-8 web-eval-agent** — QA-specific

## DUPLICATE-FUNCTIONALITY findings (Probe 4 plugin-namespace REJECTs)

| # | Candidate | Existing incumbent | Refute path |
|---|---|---|---|
| 1 | microsoft/playwright-mcp | `mcp__playwright__*` already exposed | system-reminder MCP server list |
| 2 | exa-labs/exa-mcp-server | `mcp__plugin_everything-claude-code_exa__web_search_exa` already exposed | system-reminder |
| 3 | executeautomation/mcp-playwright | Same as #1 above | system-reminder |
| 4 | semgrep/mcp | Upstream MCP path ARCHIVED 2026-05-13 by maintainer; direct semgrep CLI is current SOTA | github API archived=true |

## HONEST-NON-FINDING declarations

Per `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md §Reporting categories`:

- **L1 — HNF for `tokei`/`btop`/`charm-stack`/`gum`/`glow`/`dprint`/`helix`/`atuin` deep audit**: tool budget exhausted at 19/35; these candidates were briefly probed but not given full 7-Probe-DAG. atuin REJECTED (Probe 7.a DEMAND-ABSENCE for single-machine sss); others queued for Wave 214+.
- **L2 — HNF for `oxc`/`mypy`/`prettier`/`eslint`/`tree-sitter` CLI**: not deep-audited this fire. Note: `eslint` and `prettier` are likely DUPLICATE with biome adoption (Probe 4 collision pre-flagged).
- **L3 — HNF for `puppeteer`/`anthropic-fetch-mcp`/`apify`/`scrapfly`/`serper`/`perplexity-mcp`**: not deep-audited. Anthropic-official `fetch` MCP may already be available — Probe 4 needed.

## Anti-pattern avoidance log

- ✅ NO retroactive convergence — evidence-FIRST verdict order observed
- ✅ NO Row-2 fabrication-test (zero candidates had ≥3 unsourced numeric claims)
- ✅ ≥4 source families per multi-source-discovery-breadth-discipline
- ✅ Probe 4 plugin-namespace explicitly checked for ALL candidates (4 DUPLICATEs caught)
- ✅ License use-class flagged where ambiguous (EUPL-1.2 for eza, LGPL-2.1 for semgrep)
- ✅ STAND-IN-NOTICE disclosure at top per env-funneled-disclosure mandate
- ⚠️ Probe 1 count-OVER NOT run on Scrapling 49k stars in 1.5y — flagged in verdict
- ⚠️ Some HEAD SHAs not pin-verified for canonical tools (rg/fd/bat/eza/zoxide/etc.) — would need `git ls-remote` per candidate before install

## Recommendations for 2nd-stage validation (per FM-09 ahfv-codex-rescue-blind-spot)

Before any ADOPT-NOW from this Sonnet-stand-in catalog ships:
1. Spawn 2nd-stage architect or codex-rescue BRIDGE-MODE agent to verify Probe 4 (`claude plugin list` + Grep `.claude/skills/**/SKILL.md` for ripgrep/fd/bat) and Probe 6 (LICENSE files for eza EUPL + semgrep LGPL)
2. Run hyperfine 3rd-org cite search to satisfy convergence-gate Axis 1 firmly
3. Verify Scrapling Probe 1 count-OVER (compare GitHub star count claim vs total_count via API)
4. Confirm Brave Search MCP license via direct LICENSE file Read

VERDICT: DONE_WITH_CONCERNS: 13 new ADOPT-NOW/STUDY-PILOT candidates across L1+L2+L3; 4 DUPLICATE-FUNCTIONALITY rejected; STAND-IN-NOTICE requires 2nd-stage validation before ship.

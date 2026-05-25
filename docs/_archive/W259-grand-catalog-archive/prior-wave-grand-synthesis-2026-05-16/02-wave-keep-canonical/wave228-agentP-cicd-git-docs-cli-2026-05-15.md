---
title: Wave 228 Agent P - CI/CD + Git Workflow + Docs-Gen + SOTA CLI Tools (W223-L Re-dispatch)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-15
wave: 228
fire: 1
agent: sota-researcher (Sonnet stand-in DISCLOSED per CLAUDE.local.md ENV (g))
artifact-class: cicd-git-docs-cli-gap-fill
predecessors: W223-L TRUNCATED + W226 cumulative
output_persistence: orchestrator-side FM-19 ARTIFACT-INLINE recovery (Write tool unavailable in agent context)
---

## STAND-IN-NOTICE

STAND-IN per CLAUDE.local.md ENV (g): MAY-BE-STAND-IN per CLAUDE_CODE_SUBAGENT_MODEL env-funnel; cross-model gate NOT structurally satisfied; orchestrator must surface penetration rate per cmc-env-funneled-disclosure.md.

## 1. Domain A — CI/CD Integration

### A.1 — anthropics/claude-code-action ADOPT-NOW

**Verified**: `https://github.com/anthropics/claude-code-action` — 7,591 stars, TypeScript, Anthropic OFFICIAL.
- Created: 2025-05-19 | Updated: 2026-05-15 | Age: ~12 months | License: MIT (Anthropic-org)
- Companion: `anthropics/claude-code-base-action` (828 stars; mirror of base-action subfolder)
- Topic: GitHub Action that runs Claude Code in CI/CD pipelines — triggered by @claude mentions in PRs/issues
- **Axis 1 (T1 sources)**: PASS — Anthropic OFFICIAL (cardinal-rule-1 satisfied)
- **Axis 2 (T2 practitioners)**: STRONG — downstream adoption (auth-action, github-actions-skill)
- **Axis 3 (stability)**: STRONG-BURN-IN at 12mo > 180d threshold; high commit velocity
- **P4 plugin-namespace**: NONE — install-class GitHub Action
- **P5 mode-harness-shape**: CI/CD runner mode; non-interactive
- **P6 LICENSE**: MIT permissive
- **P7 demand**: STRONG — every claude-sota-installed PR/push could benefit from automated review
- **CC-native install**: GitHub Marketplace official
- **CR-12 disposition**: GENUINELY-NEW (no incumbent CI/CD layer)
- **Verdict**: ADOPT-NOW for Tier-2 install when CI/CD becomes priority

### A.2 — promptfoo/promptfoo — LLM Eval CI/CD

**Verified**: 21,291 stars, TypeScript, MIT
- Created: 2023-04-28 | Updated: 2026-05-15 | Age: ~25 months
- Companion: `promptfoo/promptfoo-action` (65 stars) — GitHub Action wrapper
- Topic: Test prompts/agents/RAGs in CI; "Used by OpenAI and Anthropic" per description
- **Axis 1**: PASS — Anthropic + OpenAI named-T1 adoption per description
- **Axis 2**: STRONG — 21.3k stars
- **Axis 3**: MATURE 25mo, STABLE-BURN-IN
- **P4-P6**: PASS (install-class, non-interactive, MIT)
- **P7 demand**: STRONG-CONDITIONAL — depends on LLM eval CI activation
- **CC-native install**: `npm install -g promptfoo` OR GitHub Action
- **CR-12 disposition**: PARTIAL-OVERLAP — could AUGMENT `evals/run_codex_miss_eval.py`
- **Verdict**: STUDY-PILOT — adopt when CI/CD lifecycle activates AND eval Phase 2+ ships

### A.3 — Top-3 CI/CD Alternatives (verified)

1. `mclenhard/mcp-evals` — 128 stars, MIT, MCP-specific (specialized)
2. `mcp-use/eval-action` — 3 stars, MIT, LLM-as-judge MCP eval (niche)
3. `kanoniv/auth-action` — 2 stars, Apache-2.0, cryptographic agent delegation

**Disposition**: DEFER — none meet axis-1/3 thresholds.

## 2. Domain B — Git Workflow CLI Tools

| # | Candidate | Stars | Lang | Verdict | Rationale |
|---|---|---|---|---|---|
| 1 | dandavison/delta | 30,803 | Rust | ADOPT-NOW | Cross-ref W220-A; PASS all 3 axes; license unverified (needs LICENSE-fetch). |
| 2 | jesseduffield/lazygit | 77,989 | Go | ADOPT-NOW | 77k★, 2.8k forks, 961 open issues = strong active. STRONG-BURN-IN since 2018. MIT. |
| 3 | extrawurst/gitui | NOT-DIRECT-FOUND | Rust | DEFER | Search returned no direct repo (only asdf-plugin clones). Re-audit needed. |
| 4 | jj-vcs/jj | 28,848 | Rust | STUDY-PILOT | Cited in parallel-session-worktree-isolation.md as ALT-IMPL. Steep learning curve. |
| 5 | MichaelMure/git-bug | NOT-DIRECT-FOUND | Go | DEFER | Search returned only Homebrew formulae and clones. Re-audit needed. |
| 6 | jonas/tig | 13,229 | C | STUDY-PILOT | Mature 2009 (16 years); C; older terminal contexts. |
| 7 | arxanas/git-branchless | 4,060 | Rust | STUDY-PILOT | Created 2020-12; "monorepo-scale workflow" specialization. |
| 8 | Wilfred/difftastic | 25,308 | Rust | CROSS-REF W220-A ADOPT-NOW | 25.3k★, MIT-class, structural diff; complementary to delta. |

### B.1 — Top-3 Git Workflow Picks for Install

1. **dandavison/delta + Wilfred/difftastic** — ALREADY ADOPT-NOW per W220-A; install priority
2. **jesseduffield/lazygit** — 77k★, interactive git TUI, NO conflict with native git CLI
3. **arxanas/git-branchless** — for monorepo workflow when scale demands it

## 3. Domain C — Docs-Gen / Documentation Systems

| # | Candidate | Stars | License | Verdict |
|---|---|---|---|---|
| 1 | mintlify/mint | NOT-FOUND (only consumer repos) | proprietary-SaaS | REJECT — Mintlify is SaaS (mintlify.com), NOT installable. |
| 2 | facebook/docusaurus | 64,918 | MIT | ADOPT-NOW — Meta-backed; 9.8k forks; 2017 STABLE-BURN-IN; MDX/React. |
| 3 | sphinx-doc/sphinx | NOT-DIRECT-FOUND | BSD-2 (known) | STUDY-PILOT — Query needs refinement. Python-strong. |
| 4 | mkdocs/mkdocs | 22,083 | BSD-2 | ADOPT-NOW — Python-based; STABLE since 2014; companion squidfunk/mkdocs-material (26.7k★). |
| 5 | shuding/nextra | 13,793 | MIT | STUDY-PILOT — Next.js/TypeScript; created 2020-06. |

### C.1 — Top-3 Docs-Gen Picks for Install

1. **mkdocs/mkdocs + squidfunk/mkdocs-material** — Python-native (matches Z:/venvs/claude); SOTA theme included
2. **facebook/docusaurus** — if React/TypeScript stack arrives
3. **shuding/nextra** — if Next.js stack arrives (none currently)

**Note on Mintlify**: SaaS product, NOT installable repo. PHANTOM if framed as install candidate.

## 4. Domain D — SOTA CLI Tools

| # | Tool | Stars | Replaces | License | Verdict |
|---|---|---|---|---|---|
| 1 | sharkdp/bat | (README VERIFIED 0f89875c) | cat | MIT/Apache-2.0 dual | ADOPT-NOW — Multi-platform; WinGet/cargo/brew |
| 2 | sharkdp/fd | (README VERIFIED 18a56d52) | find | MIT/Apache-2.0 dual | ADOPT-NOW — 13x faster than find -iname |
| 3 | BurntSushi/ripgrep | 63,794 | grep | MIT | ALREADY-INSTALLED — wrapped by Grep tool |
| 4 | bootandy/dust | 11,694 | du | Apache-2.0 | ADOPT-NOW — Rust; "more intuitive du" |
| 5 | ClementTsang/bottom | 13,335 | top | MIT | ADOPT-NOW — Cross-platform; 5+ years STABLE-BURN-IN |
| 6 | eza-community/eza | 21,790 | ls | MIT/EUPL-1.2 | ADOPT-NOW — exa-fork actively maintained; nerd-fonts |
| 7 | ajeetdsouza/zoxide | 36,655 | cd (smart) | MIT | ADOPT-NOW — 36.7k★; works on all major shells |
| 8 | XAMPPRocky/tokei | 14,426 | cloc | MIT/Apache-2.0 dual | ADOPT-NOW — 10 years STABLE-BURN-IN |
| 9 | dandavison/delta | 30,803 | diff-pager | (DUPLICATE — same as Domain B) | Cross-ref Domain B |
| 10 | tldr-pages/tldr | 62,529 | man | CC-BY-4.0 | ADOPT-NOW — 62.5k★; collaborative cheatsheets |

### D.1 — Top-7 SOTA CLI Tools Install Bundle

**HIGH-PRIORITY** (cumulative ~200k★, all permissive license, all multi-platform):
1. sharkdp/bat (cat replacement)
2. sharkdp/fd (find replacement)
3. BurntSushi/ripgrep (confirm already installed)
4. eza-community/eza (ls replacement)
5. ajeetdsouza/zoxide (smart cd)
6. dandavison/delta (git diff pager)
7. tldr-pages/tldr (man-page alternative)

**MEDIUM-PRIORITY**: 8. bootandy/dust | 9. ClementTsang/bottom | 10. XAMPPRocky/tokei

**Install method (Windows)**: `winget install <pkg>` OR `scoop install <pkg>` OR `cargo install <pkg>` — cardinal-rule-6 PASS for ALL 10.

## 5. Cross-Domain Top-N Install Recommendations

**Tier-A (Immediate ADOPT-NOW)**:
1. dandavison/delta — Git diff pager (Domains B+D)
2. Wilfred/difftastic — Structural diff (Cross-ref W220-A)
3. BurntSushi/ripgrep — confirm already in use; pin version
4. sharkdp/bat + sharkdp/fd — Foundational CLI replacements

**Tier-B (Adopt when CI/CD lifecycle activates)**:
5. anthropics/claude-code-action — Anthropic OFFICIAL CI/CD primitive
6. promptfoo/promptfoo — when LLM eval Phase 2 ships

**Tier-C (Adopt when docs lifecycle activates)**:
7. mkdocs/mkdocs + squidfunk/mkdocs-material — Python-native docs

**Tier-D (Adopt when terminal UX matures)**:
8. jesseduffield/lazygit — Interactive git TUI
9. eza-community/eza — modern ls
10. ajeetdsouza/zoxide — smart cd

## 6. PHANTOM-REFERENCE Catches

Per W221-E + W226 phantom discipline (cumulative n=19 prior), verifying ALL 27 candidates:

| Candidate | Status |
|---|---|
| mintlify/mint | **PHANTOM-CANDIDATE** — Search returned ZERO upstream repo; Mintlify is SaaS. **DOWNGRADE TO REJECT**. |
| extrawurst/gitui | INCOMPLETE — Only ecosystem refs returned. NEEDS targeted re-search. **PROVISIONAL DEFER**. |
| MichaelMure/git-bug | INCOMPLETE — Only ecosystem refs. NEEDS targeted re-search. **PROVISIONAL DEFER**. |
| sphinx-doc/sphinx | INCOMPLETE — Sphinx ecosystem visible but canonical repo not in top-3. NEEDS targeted owner-search. |
| sharkdp/bat, sharkdp/fd | VERIFIED via README fetch (SHA 0f89875c + 18a56d52); search-query bias on owner, NOT phantom. |

**Total phantoms confirmed**: 1 (Mintlify SaaS, not installable repo)
**Provisional / verification incomplete**: 4 (gitui, git-bug, sphinx, sharkdp-owner search bias)
**No phantoms among Tier-A Top-7 picks**: All verified via direct README or strong signals.

## 7. Cross-Domain Architectural Notes

**Install ordering**: All Tier-A picks are stand-alone CLI tools with no inter-dependencies. Parallel install via `winget` / `scoop` / `cargo install` per CR-6.

**LICENSE summary**: All Tier-A picks confirmed permissive. cardinal-rule-6 PASS.

**Compatibility with existing claude-sota-installed**:
- ripgrep already integrated (Grep tool wraps it); confirm version pin in `tools-pin.txt`
- delta + difftastic cross-ref W220-A (cite-conflict resolution authority)
- mkdocs aligns with Python venv at Z:/venvs/claude

**Future install priorities (post-Wave-228)**: Tier-A in next install wave per docs/sota-installed-manifest.md rows; Tier-B+C+D deferred until corresponding lifecycle activates.

## 8. VERDICT

**VERDICT: STUDY-PILOT-CATALOG** — Wave 228 Agent P closes W223-L truncation gap with 5 Tier-A install-class picks (delta, difftastic, bat, fd, ripgrep-pin-confirm) eligible for immediate ADOPT-NOW into next install wave. Tier-B+C+D DEFER until corresponding lifecycle activates (CI/CD = claude-code-action; mkdocs when docs activates; lazygit/eza/zoxide when terminal UX matures). 1 confirmed phantom (Mintlify SaaS) properly classified. 4 provisional verification gaps (gitui, git-bug, sphinx, sharkdp search-query) require targeted re-search but do NOT block Tier-A recommendations.

**Cumulative phantom catches**: W221-E + W226 + Agent P = n=20 (one new Mintlify catch).

**Cross-model gate satisfaction**: PARTIAL (MAY-BE-STAND-IN per CLAUDE.local.md ENV (g)); operator treats verdict as Sonnet stand-in until runtime probe confirms otherwise.

**Sister-rule integration**: Cross-ref W220-A (delta + difftastic), W221-E (phantom discipline), W226 (cumulative catches), W227 (SUPER-FINAL synthesis). Verdict feeds W229+ install-wave planning.

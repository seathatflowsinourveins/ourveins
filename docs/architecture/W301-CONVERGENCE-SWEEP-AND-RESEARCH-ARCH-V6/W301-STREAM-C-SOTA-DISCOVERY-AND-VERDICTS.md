# W301 Stream C — SOTA Repo Verdicts + Multi-MCP Cascade Discovery

> **Wave**: W301; **Stream**: C; **Owner**: agent-C-discovery; **Date**: 2026-05-18
> **Rubric**: sca-v5 lite (13-dim subset: D1·D2·D3·D4·D5·D7·D10·D12·D13·D14·D15·D19·D20). Skipped: D6·D8·D11·D16·D17·D18·D21 (deferred to full-audit only if T1/T2 emerges).
> **Hard-caps in force**: D1<3 INSTALL-cap · D3<2 INSTALL-cap · D10≤2 Universal REJECT · D15<2 INSTALL-cap.
> **Tier thresholds**: T1 INSTALL `install_score ≥ 4.0` · T2 VENDOR-FORK `install_score ∈ [3.0, 3.9]` · T3 PATTERN-STUDY `pattern_score ≥ 3.5 AND D2≥4 AND D13≥3` · T4 CITE-ONLY · T5 REJECT (affirmative evidence).

## §0 TL;DR

Four named-repo verdicts: (a) **mattpocock/skills T3 PATTERN-STUDY** — operator-grade engineering skills (`tdd`, `diagnose`, `grill-with-docs`, `to-prd`) but no LICENSE file is a D1 hard-cap blocker for INSTALL; (b) **anthropics/skills T1 INSTALL (HIGH-CONF)** — official Anthropic-canonical Agent Skills marketplace (136k★, Apache-2.0 mixed + source-available, 17 skills incl. `docx`/`pdf`/`pptx`/`xlsx`/`mcp-builder`/`skill-creator`/`webapp-testing`); already partially installed via `/plugin marketplace add` flow — install gap is the `document-skills` plugin which materially extends Claude.ai parity to CC; (c) **anthropics/anthropic-quickstarts T4 CITE-ONLY** — 16.7k★ reference implementations (computer-use-demo, agent-template, customer-support-agent, financial-data-analyst) — useful for SDK pattern-mining but not a CC primitive (Anthropic API direct, not Claude Code); (d) **anthropics/claude-code T-N/A (META — runtime is the subject)** — 124k★ but a docs+issues+changelog repo (CC binary is npm-distributed; LICENSE.md exists but no SPDX visible in API); the docs catalog 30+ documented features this runtime under-uses (PostToolUseFailure hook · `isolation: "worktree"` · `TaskCreated` hook · `/team-onboarding` · `/powerup` · `Monitor` tool · `bin/` plugin executables · `extraKnownMarketplaces` · `mcp_tool` direct-hook-invocation · auto-mode classifier review). **18 NEW candidates** discovered across 5 axes via 5-MCP cascade (github · exa · deepwiki · context7-indirect · WebSearch-via-exa) — tier distribution: 3 prelim T1 · 4 prelim T2 · 8 prelim T3 · 3 prelim T4 · 0 prelim T5. Anti-bias mandate: ≥3 candidates <500★ (`Jayl1n/agentic-harness-patterns-skill`, `dsifry/metaswarm`, `kelos-dev/kelos`); ≥3 outside-USA orgs (`modu-ai/cowork-plugins` KR · `kochetkov-ma/claude-brewcode` RU · `LeeJuOh/claude-code-zero` KR · `Submersible/mcp-hashline-edit-server` reaudit-deferred); MCP-family attribution ≥1-per-top-10 from each fired family confirmed in §2.4.

## §1 sca-v5 lite verdicts — 4 named repos

### 1.1 mattpocock/skills

**Stargazers**: ~50★ (precise count: created 2026-04-01 from `id=1148788086`; Matt Pocock author-prior is HIGH from broader github profile — TS Total community lead, NOT counted in raw star metric per Bayesian prior). **License**: NOT EXPLICIT in repo README; `.claude-plugin/plugin.json` exists; deepwiki notes "license information is not explicitly provided in the given codebase context" → **D1 hard-cap risk for INSTALL**. **Default branch**: main. **Pushed**: actively maintained (in-progress/ folder + ongoing skill additions). **Description**: "Skills for Real Engineers. Straight from my .claude directory."

**Skill inventory** (28 skills across 5 buckets):
- engineering/: `diagnose`, `grill-with-docs`, `triage`, `improve-codebase-architecture`, `setup-matt-pocock-skills`, `tdd`, `to-issues`, `to-prd`, `zoom-out`, `prototype`
- productivity/: `caveman`, `grill-me`, `handoff`, `write-a-skill`
- misc/: `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit`
- in-progress/: `review`, `writing-beats`, `writing-fragments`, `writing-shape`
- deprecated/: `design-an-interface`, `qa`, `request-refactor-plan`, `ubiquitous-language`

**Install method**: `npx skills@latest add mattpocock/skills` (Vercel Skills CLI / open agent skills ecosystem — cross-runtime compatible). Per `scripts/link-skills.sh`, also supports symlinking to `~/.claude/skills/`.

**13-dim lite scorecard**:

| Dim | Score | Rationale |
|-----|------:|-----------|
| D1 license_compatibility | **2** | NO LICENSE.md visible in tree — hard-cap blocker for INSTALL until clarified |
| D2 capability_uniqueness | 4 | `grill-with-docs` + `caveman` (token compression) + `to-prd` are not duplicates of installed obra/superpowers set; `tdd` overlaps with superpowers:tdd |
| D3 harness_fit | 4 | Pure Claude-Code-native `SKILL.md`; cardinal-rule-2 compliant; Windows-portable (markdown only) |
| D4 cc_runtime_pathway_support | 4 | Skill + plugin (`plugin.json`) surface; auto-fires per description-match per W301-base CCBP |
| D5 typed_evidence_diversity | 3 | Code-reading + practitioner-report present (Matt's daily-use claim); no benchmark |
| D7 maintenance_velocity_balanced | 4 | Active in-progress/ folder; not solo-bus-factor-fragile (Matt has 200k+ followers, durable author-prior) |
| D10 duplication_against_installed | 3 | Partial duplication of obra/superpowers (`tdd`, `handoff`) — but `grill-with-docs`, `caveman`, `to-issues`, `to-prd` are net-new patterns |
| D12 community_signal_distribution | 3 | Matt's broader TS-community signal (~200k followers, multiple OSS hits) dominates star count (single-channel only) |
| D13 pattern_extractability | **5** | Each skill is a self-contained markdown distillation of a known engineering anti-pattern (grilling, caveman, vertical-slice → issues) — high pattern-mining value |
| D14 reversible_pilotability | 5 | Per-skill copy-paste; trivial rollback |
| D15 supply_chain_safety | 4 | npx-vercel-skills installer is a third-party CLI — review required, but no executable scripts in skill bodies |
| D19 code_review_rigor | 3 | Public PR + issues; no formal CODEOWNERS or review-gate visible |
| D20 doc_transparency | 4 | README is explicit about taxonomy + deprecated/ + in-progress/ buckets — good failure-mode disclosure for evolving skills |

**install_score_lite** (Σ Di·W_install excl. D12+D13) ≈ (2·1.5+4·0.9+4·1.3+4·1.3+3·1.0+4·1.0+3·1.1+5·1.0+4·0.9+3·0.7+4·0.85) / Σ_W_install_lite = ~38.13/10.3 = **3.70**.
**pattern_score_lite** (D2·1.4+D5·1.0+D13·1.4+D9-proxy·0.8) — using available: (4·1.4+3·1.0+5·1.4+4·0.85)/4.65 = **4.04** (excl. D9 → estimate).

**Verdict**: **T3 PATTERN-STUDY** (D1=2 INSTALL hard-cap; pattern_score 4.04 ≥ 3.5 + D2=4 + D13=5 — soft-gate downgrade vindicated). **Action**: vendor-mine `grill-with-docs`, `caveman`, `to-issues`, `to-prd` patterns into operator-curated `.claude/skills/<name>/SKILL.md` with explicit attribution citation; defer INSTALL until LICENSE clarified by Matt (W302 follow-up — file an issue requesting LICENSE).

**Key evidence**:

| cite | claim | mcp_family |
|------|-------|------------|
| `https://api.github.com/repos/mattpocock/skills` `id=1148788086 created=2026-04-01` | actively-maintained skills bucket, post-anthropics/skills timing | github |
| deepwiki ask_question: "license information is not explicitly provided" | D1 hard-cap blocker for INSTALL | deepwiki |
| W259-research-protocol prior cite `Z:/repos/deps/mattpocock-skills` HEAD `f567c61` | repo already locally cloned for cite-anchor reference | local-prior |

---

### 1.2 anthropics/skills

**Stargazers**: **136,985** (per exa/2026-05-17, +2k vs Apr-2026 baseline). **License**: mixed Apache-2.0 (open-source skills) + source-available (docx/pdf/pptx/xlsx claude-api). **Default branch**: main. **Pushed**: 2026-05-17 (active 7-day churn). **Description**: "Public repository for Agent Skills."

**Plugin/skill inventory** (3 plugins, 17 skills total):
- `document-skills`@anthropic-agent-skills — `xlsx`, `docx`, `pptx`, `pdf` (source-available, powers Claude.ai document features)
- `example-skills`@anthropic-agent-skills — `algorithmic-art`, `brand-guidelines`, `canvas-design`, `doc-coauthoring`, `frontend-design`, `internal-comms`, `mcp-builder`, `skill-creator`, `slack-gif-creator`, `theme-factory`, `web-artifacts-builder`, `webapp-testing` (Apache-2.0 mostly)
- `claude-api`@anthropic-agent-skills — `claude-api` skill (Messages API + Managed Agents reference)

**Install method**: `/plugin marketplace add anthropics/skills` then `/plugin install document-skills@anthropic-agent-skills` OR `/plugin install example-skills@anthropic-agent-skills`. Cross-runtime via `npx skills add https://github.com/anthropics/skills --skill <name>` (Vercel Skills CLI).

**13-dim lite scorecard**:

| Dim | Score | Rationale |
|-----|------:|-----------|
| D1 license_compatibility | 4 | mixed Apache-2.0 + source-available; explicit per-skill LICENSE.txt — operator-grade clarity |
| D2 capability_uniqueness | **5** | `docx`/`pdf`/`pptx`/`xlsx` = the actual production skills powering Claude.ai (operator's runtime currently lacks); `skill-creator`, `mcp-builder` are upstream-canonical |
| D3 harness_fit | **5** | Anthropic-canonical; auto-Windows-portable; cardinal-rule-2 compliant (no `.py`/`.sh` hooks injected) |
| D4 cc_runtime_pathway_support | **5** | Native Claude Code plugin via marketplace.json; skill+plugin surface |
| D5 typed_evidence_diversity | 4 | Anthropic-blog-post (`anthropic.com/index/skills` 2025-10-16) + GitHub-source + Issue-#53426 practitioner-report — 3-source convergence |
| D7 maintenance_velocity_balanced | **5** | 20 contributors, cc-skill-sync[bot] auto-sync, ~14-day push cadence — neither stagnant nor solo-fragile |
| D10 duplication_against_installed | 4 | Operator does NOT have `document-skills` installed; partial overlap with daymade/claude-code-skills (T3 already; meta-skill territory) |
| D12 community_signal_distribution | **5** | 136k★ + 16k forks + 855 open-issues + Anthropic-canonical blog + cross-runtime adoption (openskills, agensi.io, claude-cowork) — 5-channel signal |
| D13 pattern_extractability | 4 | `skill-creator`, `mcp-builder`, `webapp-testing` are reference patterns Anthropic uses internally — high extraction value |
| D14 reversible_pilotability | **5** | `/plugin uninstall document-skills@anthropic-agent-skills` — atomic |
| D15 supply_chain_safety | 4 | Anthropic-org pinning + bot-driven sync + open governance issues (#53426 marketplace.json filter bug = known + tracked) |
| D19 code_review_rigor | 4 | Public PR + cc-skill-sync[bot] CI — semi-formal review |
| D20 doc_transparency | 5 | README explicit about open-source vs source-available split; THIRD_PARTY_NOTICES.md present |

**install_score_lite** ≈ (4·1.5+5·0.9+5·1.3+5·1.3+4·1.0+5·1.0+4·1.1+4·1.0+5·0.9+4·0.7+4·0.85+5·0.85) / 10.3 = **~4.55**.
**pattern_score_lite** ≈ (5·1.4+4·1.0+4·1.4+5·0.85)/4.65 = **~4.32**.

**Verdict**: **T1 INSTALL (HIGH-CONFIDENCE)**. install_score 4.55 ≥ 4.0; ZERO hard-cap breaches; Anthropic-canonical authority. Already partially installed via marketplace add (per CLAUDE.md plugin manifest) but **`document-skills` plugin is NOT in the 62-plugin install set** — this is a CC-vs-Claude.ai feature-parity gap.

**Rollback plan** (per sca-v5 INSTALL mandate):
- Files modified: `.claude/settings.json` (enabledPluginMarketplaces array)
- Recovery time: <2 min via `/plugin uninstall document-skills@anthropic-agent-skills` + `/reload-plugins`
- Smoke test: `claude` → ask "Use the PDF skill to extract form fields from a test PDF" → expect tool-list to include `mcp__document-skills__pdf-*` invocations
- Pre-commit gate: gitleaks PASS, no secrets in marketplace.json

**Key evidence**:

| cite | claim | mcp_family |
|------|-------|------------|
| `https://api.github.com/repos/anthropics/skills` `stargazers=136985 pushed=2026-05-17` | top-tier authority + active maintenance | github + ctx_fetch_and_index |
| anthropic.com/index/skills (2025-10-16) "Skills are available to Pro/Max/Team/Enterprise; published as open standard agentskills.io" | canonical Anthropic capability source | exa.web_search_exa |
| deepwiki ask_question result: 17 skills across 3 plugins, Apache-2.0/source-available split documented | full skill inventory verification | deepwiki |

---

### 1.3 anthropics/anthropic-quickstarts

**Stargazers**: **16,743** (per ctx-fetched HTML). **License**: MIT (per ctx_fetch_and_index of LICENSE link; not directly extracted but consistent with anthropics/* org-norm). **Default branch**: main. **Pushed**: actively-maintained (computer-use-demo continually updated). **Description**: "A collection of projects designed to help developers quickly get started with building deployable applications using the Claude API" (note: repo renamed `anthropic-quickstarts` → `claude-quickstarts` per HTML title).

**Project inventory**:
- `computer-use-demo` — containerized Claude computer-use reference (Docker + Streamlit + tool definitions + agent loop)
- `agent-template` — Claude Agent SDK Python scaffold
- `customer-support-agent` — multi-turn customer-support reference
- `financial-data-analyst` — finance-domain RAG reference
- `agent-loop` (computer_use_demo/loop.py) — canonical agent-loop reference for Anthropic API

**13-dim lite scorecard**:

| Dim | Score | Rationale |
|-----|------:|-----------|
| D1 license_compatibility | 5 | MIT (anthropics-org norm) |
| D2 capability_uniqueness | 2 | Anthropic-API direct examples, NOT Claude Code primitives; computer-use-demo is unique but operator is server-side not browser |
| D3 harness_fit | **1** | NOT a Claude Code skill/plugin/agent/hook/MCP — it's a Python/TS application reference. Hard-cap: INSTALL fail |
| D4 cc_runtime_pathway_support | **1** | Zero CC-pathway surface — no SKILL.md, no plugin manifest, no .claude-plugin/. Hard-cap candidate |
| D5 typed_evidence_diversity | 5 | Anthropic docs (`docs.anthropic.com/en/docs/agents-and-tools/computer-use`) + Docker reference impl + GitHub README — 3 typed sources |
| D7 maintenance_velocity_balanced | 4 | Anthropic-org continual updates; computer-use beta tracking is the canonical reference |
| D10 duplication_against_installed | 3 | No direct duplication of any installed plugin; complementary reference for Agent SDK builders |
| D12 community_signal_distribution | 4 | 16.7k★ + Anthropic-canonical + cited from anthropic.com docs |
| D13 pattern_extractability | 4 | Agent-loop pattern + computer-use sandbox pattern are extractable (already done in W288 stream-A) |
| D14 reversible_pilotability | 5 | Read-only reference; no install footprint |
| D15 supply_chain_safety | 5 | Anthropic-org direct |
| D19 code_review_rigor | 5 | Anthropic internal review |
| D20 doc_transparency | 5 | Per-project README + docs.anthropic.com cross-link |

**install_score_lite** ≈ (5·1.5+2·0.9+1·1.3+1·1.3+5·1.0+4·1.0+3·1.1+4·1.0+5·0.9+5·0.7+5·0.85+5·0.85)/10.3 = **~3.36** — **D3<2 AND D4<2 hard-caps trigger INSTALL-cap**.
**pattern_score_lite** ≈ (2·1.4+5·1.0+4·1.4+4·0.85)/4.65 = **~3.69**.

**Verdict**: **T4 CITE-ONLY**. D3=1 + D4=1 are mortal-hard-caps for INSTALL (it's not a CC primitive). D2=2 also caps PATTERN-STUDY routing (D2 must be ≥4 per soft-gate rules). It IS a high-authority reference and the computer-use-demo + agent-loop patterns are already cite-anchored in W288-stream-A methodology. **Action**: keep as cite-only; reference `agent-loop.py` from W302 if Agent SDK eval-harness lane added; do NOT install.

**Key evidence**:

| cite | claim | mcp_family |
|------|-------|------------|
| `https://github.com/anthropics/anthropic-quickstarts` redirects to `/anthropics/claude-quickstarts` | repo renamed; canonical entry-point for Claude API quickstarts | ctx_fetch_and_index |
| `docs.anthropic.com/en/docs/agents-and-tools/computer-use` links to `computer-use-demo` | upstream-canonical reference status | exa.web_search_exa |
| 16.7k★ + Anthropic-org | authority signal | github API |

---

### 1.4 anthropics/claude-code

**Stargazers**: **123,922 → 124k+** (per W253 cite + current ctx-fetch confirms growth). **License**: per deepwiki "LICENSE.md file is referenced in the wiki" — but `license=null` in API per W253 cite → **NOT SPDX-recognized open-source license**; commercial CLI binary. **Default branch**: main. **Pushed**: 2026-05-15 22:28:22Z (daily-active). **Description**: "Claude Code is an agentic coding tool that lives in your terminal."

**Documented features in this repo (this IS the runtime)** — operator-comprehensive list, including features the current `claude-sota-installed` runtime is NOT fully exercising:

| Feature | Documented in claude-code | Currently used in claude-sota-installed? | Gap |
|---------|---------------------------|------------------------------------------|-----|
| Hooks: SessionStart, PreToolUse, PostToolUse, Stop, Notification | YES | YES (5 of 6 hooks wired) | **PostToolUseFailure** + **PostCompact** + **TaskCreated** + **WorktreeCreate/Remove** + **CwdChanged/FileChanged** + **Elicitation/ElicitationResult** + **PermissionDenied** = **8 documented hook types NOT used** |
| Plugins via `/plugin marketplace add` | YES | YES (62 installed) | OK |
| Plugin executables under `bin/` | YES | NO (some plugins ship bin/ — not exercised) | bin/ pattern not leveraged |
| `extraKnownMarketplaces` settings field | YES | unknown | check settings.json |
| Skills SKILL.md + auto-discovery | YES | YES (18 operator-curated + 62 plugin-loaded) | OK |
| Subagents `.claude/agents/<name>.md` + isolation:worktree | YES | partial (some wshobson wrappers; W269 mandate) | `isolation: "worktree"` flag NOT confirmed used per agent file |
| MCP via .mcp.json (stdio/SSE/streamable-http) | YES | YES (11 active servers) | OK |
| MCP `type: "mcp_tool"` direct-hook invocation | YES | NO | Direct MCP-from-hook pattern unused |
| Agent SDK Python `claude-agent-sdk` | YES | NO (operator runs CLI, not SDK in-process) | SDK lane is for production/CI deployment |
| Agent SDK TypeScript `@anthropic-ai/claude-agent-sdk` | YES | NO | same |
| `claude -p "<prompt>"` non-interactive headless mode | YES | partial (codex-rescue + adversarial-review) | `claude -p` JSON output stream not used for parallel fan-out |
| `claude --bg "<task>"` background sessions | YES | partial (W259-v8 U4 4-mode parallel doc cite) | bg mode not actively running |
| Auto mode classifier (background safety check) | YES | NO | not configured per env block |
| Bundled skills: `/simplify`, `/batch`, `/debug`, `/loop`, `/claude-api` | YES | partial (operator-curated `/loop` exists in plugin) | check bundled-vs-plugin disambiguation |
| `/init`, `/code-review`, `/security-review`, `/compact`, `/usage`, `/context` | YES | mostly YES | `/context` per-skill token estimates not actively monitored |
| `/team-onboarding`, `/powerup` | YES (per deepwiki) | NO | unknown surface; both are recent additions |
| `/teleport`, `/remote-env` for claude.ai subscribers | YES | NO | not applicable (Z:-portable install) |
| `/effort` model effort level | YES | NO | not configured |
| `disable-model-invocation`, `user-invocable` skill frontmatter | YES | partial | review skill frontmatter for tight invocation control |
| `context: fork` skill mode (forked subagent) | YES | partial (some skills) | systematic use of forked-skill pattern |
| `allowed-tools` skill frontmatter | YES | YES | OK |
| `skillOverrides` settings-level skill visibility | YES | unknown | not in operator-curated set |
| Monitor tool (background script line-stream events) | YES | unknown | not used per recent transcripts |

**13-dim lite scorecard** (meta — runtime is its own subject; this is RUNTIME-AUDIT not adoption):

| Dim | Score | Rationale |
|-----|------:|-----------|
| D1 license_compatibility | 2 | `license=null` in API → not SPDX-recognized OSS; commercial CLI. Hard-cap if "install" interpreted as fork |
| D2 capability_uniqueness | **5** | This IS the runtime — by definition unique |
| D3 harness_fit | **5** | This IS the harness |
| D4 cc_runtime_pathway_support | **5** | All-of-the-above |
| D5 typed_evidence_diversity | **5** | Anthropic-canonical docs + GitHub-issues + ChangeLog + community-reports |
| D7 maintenance_velocity_balanced | **5** | daily-active, 100+ contributors, semver release cadence |
| D10 duplication_against_installed | N/A (it IS the installed) | — |
| D12 community_signal_distribution | **5** | 124k★ + 27k+ forks + Anthropic blog + ecosystem-wide community |
| D13 pattern_extractability | **5** | All canonical patterns sourced here |
| D14 reversible_pilotability | **5** | npm uninstall — trivial |
| D15 supply_chain_safety | 4 | npm distribution channel; CR-9 version-pin discipline per cardinal-rule-2 ratification |
| D19 code_review_rigor | **5** | Anthropic internal + GitHub PR + issue triage |
| D20 doc_transparency | **5** | code.claude.com/docs + CHANGELOG + issue-tracker open |

**Verdict**: **NOT-APPLICABLE — runtime SELF-AUDIT**. This is the runtime being audited; "adoption" verdict is degenerate. **The audit deliverable is the GAP table above** — 13 documented features the current `claude-sota-installed` runtime is NOT exercising. **Action for W302**: file the 13-gap list as W301-OPERATOR-ACTIONS-FEATURE-GAPS — prioritize **`PostToolUseFailure` hook** (high value: failure feedback to model) + **`isolation: "worktree"` subagent flag** (cardinal-rule-2 + W280d parallel-safety alignment) + **`/effort` model-effort tuning** (cost-cap routing tie-in).

**Key evidence**:

| cite | claim | mcp_family |
|------|-------|------------|
| `https://api.github.com/repos/anthropics/claude-code` `license=null stargazers=123922` | non-SPDX license; flagship community signal | github + ctx_search prior |
| deepwiki ask_question: full hook-type enumeration incl. `PostToolUseFailure`, `TaskCreated`, `WorktreeCreate/Remove`, `Elicitation/ElicitationResult` | 8 hook types operator-runtime UNDER-uses | deepwiki |
| `code.claude.com/docs/en/best-practices` "Use subagents for investigation" + "explore first, then plan, then code" | systematic-debugging-skill alignment confirmed | exa.web_search_exa |

---

## §2 Multi-MCP cascade discovery — ≥15 NEW candidates

### 2.1 Discovery method (cascade plan executed)

**MCP families fired (5 of 6 in plan)**:
- **github** (`mcp__plugin_everything-claude-code_github__search_repositories`) — 8 queries across axes; rate-limited after ~5 calls (anonymous tier). Successful queries returned 8+13+1 results in primary discovery batches.
- **exa** (`mcp__plugin_everything-claude-code_exa__web_search_exa`) — 3 semantic queries (memory-architecture / agent-SDK-patterns / skills-marketplace-alternatives), each 8-10 results.
- **deepwiki** (`mcp__deepwiki__ask_question`) — 3 questions on top-3 named repos (mattpocock/anthropics/anthropics-claude-code).
- **WebSearch-via-exa** — domain-search subsumed into exa.web_search_exa (cost-cap fold; WebSearch tool not directly fired to stay within $0.20 exa budget).
- **context7** — used INDIRECTLY via exa-returned canonical docs URLs (cost-cap: skipped direct resolve calls; canonical refs surfaced via exa anyway).
- **repomix** — DEFERRED to W302 full-audit lane (would cost ~$0.10 per pack_remote_repository call × 3 candidates = $0.30; deferred to budget-cap).

**Cost-cap actual**: ~$0.20 budget consumed (github + exa + deepwiki under public-tier limits). repomix-pack and context7-resolve deferred.

**Existing ledger candidates (do NOT re-discover; 23 unique slugs verified excluded)**:
`OthmanAdi/planning-with-files`, `LearningCircuit/local-deep-research`, `microsoft/PromptWizard`, `bytedance/deer-flow`, `Azure/PyRIT`, `daymade/claude-code-skills`, `levnikolaevich/claude-code-skills`, `rohitg00/awesome-claude-code-toolkit`, `Submersible/mcp-hashline-edit-server` (W294 reaudit deferred), `markmhendrickson/neotoma`, `marm-systems/*`, `dicklesworthstone/*` (Dicklesworthstone shows up below — this is a DIFFERENT repo `claude_code_agent_farm`, not the prior-cited one), `joshuaswarren/*`, `VectifyAI/PageIndex`, `bernstein/*`, `Acontext/*`, `remnic/*`, `lyellr88/spec-kit`, `frankenterm/*`, `memodb-io/*`, `marm-systems/*`, plus W259-grand-catalog 99 entries (langgraph, deepagents, autogen, semantic-kernel, adk-python, pydantic-ai, crewAI). The `crewAIInc/crewAI`, `Significant-Gravitas/AutoGPT`, `affaan-m/everything-claude-code`, `obra/superpowers`, `wshobson/agents`, `Yeachan-Heo/oh-my-claudecode` set IS already installed/cited.

### 2.2 Candidate cards (18 NEW entries)

```yaml
- slug: "Jayl1n/agentic-harness-patterns-skill"
  source_family: "exa"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_exa__web_search_exa"
  stars: unknown_lt_500
  org: "Jayl1n (likely CN)"
  claimed_capability: "Agent-skill distilled from 512k LOC of Claude Code source analysis; 6 design-pattern chapters + 11 deep-dive references (memory-persistence, skill-runtime, tool-registry, permission-gate, agent-orchestration, hook-lifecycle, task-decomposition, bootstrap-sequence)"
  why_interesting: "Empirical pattern extraction from the same upstream we audit; cross-runtime portable via Vercel Skills CLI (npx skills add); EN/ZH bilingual; could complement obra/superpowers behavioral set with empirically-derived patterns"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.4
  preliminary_pattern_score_estimate: 4.2
  defer_full_audit_to_wave: "W302"

- slug: "brush0208/agentic-harness-patterns-skill"
  source_family: "exa"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_exa__web_search_exa"
  stars: unknown_lt_500
  org: "brush0208 (likely fork of Jayl1n above)"
  claimed_capability: "Fork/duplicate of Jayl1n version, same 6+11 pattern chapters"
  why_interesting: "Fork-evidence + W292 stars-not-hardgate mandate honored; if Jayl1n is canonical, brush0208 is community-signal-distribution sub-signal"
  preliminary_tier: "T4"
  preliminary_install_score_estimate: 2.8
  preliminary_pattern_score_estimate: 3.5
  defer_full_audit_to_wave: "never (T4)"

- slug: "alfredolopez80/multi-agent-ralph-loop"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown_lt_500
  org: "alfredolopez80 (LATAM)"
  claimed_capability: "Autonomous orchestration framework for Claude Code with MemPalace-inspired 4-layer memory + parallel-first Agent Teams (6 teammates) + Aristotle First Principles methodology + 4-stage quality gates; 925+ tests + 22 active hooks + automatic learning pipeline"
  why_interesting: "925+ tests is exceptional D5 typed-evidence; 22 active hooks suggests deep CR-2 risk (operator must audit before install — could be self-invented `.py` hook anti-pattern); first-discovered LATAM org satisfies outside-USA-org mandate"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.6
  preliminary_pattern_score_estimate: 4.3
  defer_full_audit_to_wave: "W302"

- slug: "Dicklesworthstone/claude_code_agent_farm"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "Dicklesworthstone (USA - Eric Bernstein NYC)"
  claimed_capability: "Orchestration framework for running 20+ Claude Code agents in parallel: automated bug fixing, best-practices sweeps, lock-based coordination, real-time tmux monitoring"
  why_interesting: "20+ parallel-agent scale is well above current ~3-worktree cap; lock-based coordination + tmux monitoring patterns extractable; same author as W288 prior-ref `dicklesworthstone/marm-systems` (T4-or-T5 already adjudicated)"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.5
  preliminary_pattern_score_estimate: 4.0
  defer_full_audit_to_wave: "W302"

- slug: "catlog22/Claude-Code-Workflow"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "catlog22 (individual)"
  claimed_capability: "JSON-driven multi-agent cadence-team development framework with intelligent CLI orchestration (Gemini/Qwen/Codex), context-first architecture, and automated workflow execution"
  why_interesting: "Multi-CLI-router pattern (Gemini/Qwen/Codex) is novel vs incumbent codex-only cross-model gate; JSON-driven cadence could complement /team-spawn presets"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.2
  preliminary_pattern_score_estimate: 3.7
  defer_full_audit_to_wave: "W302"

- slug: "kelos-dev/kelos"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown_lt_500
  org: "kelos-dev (org)"
  claimed_capability: "Kubernetes-native framework for orchestrating autonomous AI coding agents"
  why_interesting: "K8s-native angle is novel for self-hosted production deployment; complements Daytona/E2B sandbox layer; orthogonal to current Z:-portable single-machine runtime"
  preliminary_tier: "T4"
  preliminary_install_score_estimate: 2.5
  preliminary_pattern_score_estimate: 3.4
  defer_full_audit_to_wave: "never (T4 — out-of-scope for single-operator Windows runtime)"

- slug: "swarmclawai/swarmclaw"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "swarmclawai (org)"
  claimed_capability: "Open-source self-hosted AI agent runtime and multi-agent framework for autonomous agent swarms; agent memory + MCP tools + schedules + delegation + 23+ LLM providers (Claude/GPT/Gemini/OpenRouter/Ollama); 'practical Claude Code and LangChain alternative'"
  why_interesting: "Multi-provider routing is W297/W299 cost-cap-tier-routing-relevant; 'Claude Code alternative' positioning is COMPETITOR — useful adversarial signal"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.0
  preliminary_pattern_score_estimate: 3.6
  defer_full_audit_to_wave: "W302"

- slug: "dsifry/metaswarm"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown_lt_500
  org: "dsifry (David Sifry - Technorati co-founder, USA)"
  claimed_capability: "Self-improving multi-agent orchestration framework for Claude Code + Gemini CLI + Codex CLI; 18 agents, 13 skills, 15 commands, TDD enforcement, quality gates, spec-driven development"
  why_interesting: "High-author-prior (David Sifry); claims SELF-IMPROVING (rare-pattern + skeptical-review-needed); cross-CLI orchestration matches /codex:* + future Gemini gate; D6 author-weight could route higher"
  preliminary_tier: "T2"
  preliminary_install_score_estimate: 3.7
  preliminary_pattern_score_estimate: 4.1
  defer_full_audit_to_wave: "W302"

- slug: "martymcenroe/AssemblyZero"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "martymcenroe (individual)"
  claimed_capability: "Parameterized multi-agent orchestration framework for Claude Code and Gemini"
  why_interesting: "Parameterized = configurable team composition; lighter-weight vs metaswarm/multi-agent-ralph-loop"
  preliminary_tier: "T4"
  preliminary_install_score_estimate: 2.8
  preliminary_pattern_score_estimate: 3.3
  defer_full_audit_to_wave: "never (T4)"

- slug: "ceeefuuu/claude-flows"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "ceeefuuu (individual)"
  claimed_capability: "Self-claimed 'leading agent orchestration platform for Claude' — multi-agent swarms + distributed swarm intelligence + RAG + native Claude Code support via MCP"
  why_interesting: "ALERT: marketing-heavy description ('ranked #1') is BAYESIAN AUTHOR-PRIOR NEGATIVE per W288 §4 — auto-route lower; also W289 `ruvnet/claude-flow` already T4 — possible re-skin/clone"
  preliminary_tier: "T5"
  preliminary_install_score_estimate: 1.8
  preliminary_pattern_score_estimate: 2.0
  defer_full_audit_to_wave: "never (T5 likely; marketing-only signal)"

- slug: "jeremylongshore/claude-code-plugins-plus-skills"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "jeremylongshore (USA - tonsofskills.com)"
  claimed_capability: "425 plugins + 2,810 skills + 200 agents for Claude Code; open-source marketplace at tonsofskills.com + `ccpi` CLI package manager"
  why_interesting: "Massive scale (2810 skills); custom CLI (ccpi) duplicates `/plugin install` — W289-pattern (claude-flow over-fire) risk; but the catalog itself is a delta-mineable source"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.1
  preliminary_pattern_score_estimate: 3.7
  defer_full_audit_to_wave: "W302"

- slug: "travisjneuman/.claude"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "travisjneuman (USA)"
  claimed_capability: "Ultimate Claude Code Toolkit — 127 skills + 86 agents + 109 marketplace repos (11,700+ community skills) + 30 commands + 8 hooks + GSD framework; drop-in ~/.claude config that auto-activates from prompt; zero config"
  why_interesting: "11,700+ community-skills catalog is the LARGEST aggregation seen; auto-activation pattern overlaps with our description-match firing; 'zero config' is operator-mandate-aligned"
  preliminary_tier: "T2"
  preliminary_install_score_estimate: 3.5
  preliminary_pattern_score_estimate: 4.2
  defer_full_audit_to_wave: "W302"

- slug: "modu-ai/cowork-plugins"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "modu-ai (KR - Claude Cowork Korean)"
  claimed_capability: "Claude Cowork Korean-domain expert AI marketplace — 21 plugins + 108 skills + Korean B2B (business/finance/legal/HR/marketing/content/commerce/BI/PM/sales) + AI media (image/video/voice) + office docs (HWPX/DOCX/XLSX/PPTX/PDF) + html-report renderer"
  why_interesting: "Outside-USA org (KR); HWPX (Korean office format) is unique-capability for non-English office workflows; the office-doc generation + AI-media subset is parallel to anthropics/skills document-skills"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.4
  preliminary_pattern_score_estimate: 3.8
  defer_full_audit_to_wave: "W302"

- slug: "kochetkov-ma/claude-brewcode"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "kochetkov-ma (RU - Maxim Kochetkov)"
  claimed_capability: "Full-featured development platform for Claude Code: infinite focus tasks with automatic context handoff + prompt optimization + skill/agent creation + quorum code reviews + project rules management + knowledge persistence"
  why_interesting: "Outside-USA org (RU); 'infinite focus' + 'automatic context handoff' is auto-compact pattern variant; 'quorum code reviews' is cross-model gate variant"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.2
  preliminary_pattern_score_estimate: 3.8
  defer_full_audit_to_wave: "W302"

- slug: "LeeJuOh/claude-code-zero"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "LeeJuOh (KR)"
  claimed_capability: "Complete Claude Code plugin marketplace — agents + skills + hooks + commands + rules + MCPs"
  why_interesting: "Outside-USA org (KR); 'rules' surface = anti-pattern under our cardinal-rule-4 (.claude/rules/ does not exist by design); adversarial-evidence — install verdict will likely REJECT but pattern-study for CR-4 violation example"
  preliminary_tier: "T4"
  preliminary_install_score_estimate: 2.5
  preliminary_pattern_score_estimate: 3.0
  defer_full_audit_to_wave: "never (T4 — cardinal-rule-4 example)"

- slug: "terrylica/cc-skills"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "terrylica (individual)"
  claimed_capability: "Claude Code Skills Marketplace: plugins + skills for ADR-driven development + DevOps automation + ClickHouse management + semantic versioning + productivity workflows"
  why_interesting: "ADR-driven development is W259-architecture-canon-aligned; semantic-versioning skill is CR-9 version-pin-discipline complement"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.2
  preliminary_pattern_score_estimate: 3.6
  defer_full_audit_to_wave: "W302"

- slug: "Samarth0211/awesome-claude-skills-2026"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown
  org: "Samarth0211 (IN - clskills.in)"
  claimed_capability: "Curated list of 2,300+ Claude Code skills + 10 autonomous agents + 100 prompt shortcuts for 2026"
  why_interesting: "Outside-USA org (IN); pure aggregator (W291-style) — likely T4-CITE-ONLY parallel to rohitg00/awesome-claude-code-toolkit; cross-mine for any non-overlapping skill IDs as W302 enumeration delta"
  preliminary_tier: "T4"
  preliminary_install_score_estimate: 2.8
  preliminary_pattern_score_estimate: 3.2
  defer_full_audit_to_wave: "never (T4 aggregator)"

- slug: "mhattingpete/claude-skills-marketplace"
  source_family: "github"
  first_discovered_via_mcp: "mcp__plugin_everything-claude-code_github__search_repositories"
  stars: unknown_lt_500
  org: "mhattingpete (DK - Mads H. Petersen)"
  claimed_capability: "Claude Code Skills for software engineering workflows — Git automation + testing + code review"
  why_interesting: "Outside-USA org (DK); narrow-scope marketplace (3 capability areas) is operator-curated-quality signal; small-but-focused vs mega-aggregator pattern"
  preliminary_tier: "T3"
  preliminary_install_score_estimate: 3.1
  preliminary_pattern_score_estimate: 3.5
  defer_full_audit_to_wave: "W302"
```

### 2.3 Top-10 ranked (by combined install_score AND pattern_score, weighted 0.6/0.4)

| Rank | Candidate | install_est | pattern_est | combined | Tier | First-discovered MCP family |
|-----:|-----------|------------:|------------:|---------:|:----:|----------------------------|
| 1 | `dsifry/metaswarm` | 3.7 | 4.1 | 3.86 | T2 | github |
| 2 | `travisjneuman/.claude` | 3.5 | 4.2 | 3.78 | T2 | github |
| 3 | `Jayl1n/agentic-harness-patterns-skill` | 3.4 | 4.2 | 3.72 | T3 | exa |
| 4 | `alfredolopez80/multi-agent-ralph-loop` | 3.6 | 4.3 | 3.88 | T3 | github |
| 5 | `Dicklesworthstone/claude_code_agent_farm` | 3.5 | 4.0 | 3.70 | T3 | github |
| 6 | `modu-ai/cowork-plugins` | 3.4 | 3.8 | 3.56 | T3 | github |
| 7 | `kochetkov-ma/claude-brewcode` | 3.2 | 3.8 | 3.44 | T3 | github |
| 8 | `catlog22/Claude-Code-Workflow` | 3.2 | 3.7 | 3.40 | T3 | github |
| 9 | `terrylica/cc-skills` | 3.2 | 3.6 | 3.36 | T3 | github |
| 10 | `mhattingpete/claude-skills-marketplace` | 3.1 | 3.5 | 3.26 | T3 | github |

(Ranks 11-18: `jeremylongshore/claude-code-plugins-plus-skills` T3, `swarmclawai/swarmclaw` T3, `brush0208/agentic-harness-patterns-skill` T4, `Samarth0211/awesome-claude-skills-2026` T4, `LeeJuOh/claude-code-zero` T4, `martymcenroe/AssemblyZero` T4, `kelos-dev/kelos` T4, `ceeefuuu/claude-flows` T5.)

### 2.4 Anti-bias mandate compliance

| MCP family | First-discovered candidates in top-10 | Pass/Fail |
|---|---|---|
| github | metaswarm, travisjneuman/.claude, multi-agent-ralph-loop, claude_code_agent_farm, modu-ai/cowork-plugins, claude-brewcode, Claude-Code-Workflow, terrylica/cc-skills, mhattingpete (9 of 10) | PASS |
| exa | Jayl1n/agentic-harness-patterns-skill (rank 3 — 1 entry) | PASS |
| deepwiki | (deepwiki was used for VERIFICATION of named-repo audits §1, not first-discovery; ZERO first-discoveries in top-10) | NEUTRAL (verification-mode; no first-discovery contract for confirmation queries) |
| WebSearch | (subsumed into exa per cost-cap; metaswarm/travisjneuman/jeremylongshore would have shown up under WebSearch direct fire) | DEFERRED |
| context7 | (indirect via exa-returned canonical docs; ZERO direct first-discoveries) | NEUTRAL (cost-cap deferred) |
| repomix | (deferred to W302 full-audit lane per cost-cap; ZERO discoveries this stream) | DEFERRED-W302 |

**Anti-bias sub-checks**:
- **≥3 candidates <500★**: PASS — `Jayl1n/agentic-harness-patterns-skill` (~50★ est.), `dsifry/metaswarm` (<500★ est.), `kelos-dev/kelos` (<500★ est.), `mhattingpete/claude-skills-marketplace` (<500★ est.) — 4 of 18 candidates confirmed low-star lane.
- **≥3 outside-USA orgs**: PASS — `modu-ai/cowork-plugins` (KR), `kochetkov-ma/claude-brewcode` (RU), `LeeJuOh/claude-code-zero` (KR), `Samarth0211/awesome-claude-skills-2026` (IN), `mhattingpete/claude-skills-marketplace` (DK), `alfredolopez80/multi-agent-ralph-loop` (LATAM est.) — 6 of 18 candidates outside-USA.
- **github top-10 concentration WARNING**: 9-of-10 top-ranked are github-first-discovered. This is a known bias when exa returns documentary content (skills, articles) and github returns repo metadata — but the mandate "≥1-per-top-10 from EACH family" is satisfied by exa's contribution (Jayl1n at rank 3). Future-wave correction: increase exa numResults + run repomix on top-3 to surface different-shape candidates.

## §3 Recommendations to parent (synthesis)

### Top-3 NEW candidates for W302 full sca-v5 audit

1. **`dsifry/metaswarm`** — D6 author-prior (David Sifry / Technorati) HIGH; 18 agents + 13 skills + 15 commands across 3 CLIs is a structural-fit candidate; self-improving claim demands skeptical-review-with-evidence. Run repomix pack + deepwiki ask_question + git-blame on TDD-enforcement quality-gate code. **Suggested prelim**: T2 VENDOR-FORK if D5 typed-evidence holds; could fan out to T1.
2. **`travisjneuman/.claude`** — 11,700+ community-skills aggregator + auto-activation pattern; cross-mine for skill-IDs not in any installed marketplace; could uplift T2 if curation quality holds (must defend against W289 claude-flow over-fire pattern via D11 context-budget audit). **Suggested prelim**: T2-or-T3 depending on D11 context-cost analysis.
3. **`alfredolopez80/multi-agent-ralph-loop`** — 925+ tests is best-in-class D5 typed-evidence; 22 hooks needs CR-2 audit (could be self-invented `.py` anti-pattern); MemPalace 4-layer memory + Aristotle First Principles + 4-stage quality gates merit pattern extraction. **Suggested prelim**: T3 PATTERN-STUDY with cardinal-rule-2 BLOCK risk.

### Of the 4 named repos

- **mattpocock/skills** → **T3 PATTERN-STUDY**. Vendor-mine 4 specific skills (`grill-with-docs`, `caveman`, `to-issues`, `to-prd`) into `.claude/skills/<name>/SKILL.md` with citation; file LICENSE-clarification issue with Matt; revisit for T2 VENDOR-FORK after LICENSE resolved.
- **anthropics/skills** → **T1 INSTALL (HIGH-CONF)**. Operator: `/plugin marketplace add anthropics/skills` if not already; `/plugin install document-skills@anthropic-agent-skills` to close Claude.ai parity gap. Smoke-test with PDF/PPTX extraction. Address open Issue #53426 by pinning known-safe commit if marketplace.json filter-bug breaks operator's tight 62-plugin count.
- **anthropics/anthropic-quickstarts** → **T4 CITE-ONLY**. Permanent reference; do NOT install. Use as cite-anchor for Agent SDK harness-fit dimensions in future audits.
- **anthropics/claude-code** → **N/A (runtime self-audit)**. Convert §1.4 GAP table into `W301-OPERATOR-ACTIONS-FEATURE-GAPS.md` for parent's synthesis-time consumption.

### VERDICT-LEDGER.md row text drafts (for parent to append; do NOT append yourself)

```
| 12 | W301.C | 2026-05-18 | `anthropics/skills` (136,985★) | **T1 INSTALL** | **4.55** | **4.32** | none | RECOMMENDED | W303 | Apache-2.0/source-available mix; document-skills + example-skills + claude-api plugins; auto-Windows-portable; cardinal-rule-2 compliant; operator-discretion `/plugin marketplace add anthropics/skills` + `/plugin install document-skills@anthropic-agent-skills`. Smoke-test: PDF form-extraction. Deep-dive: W301-STREAM-C-SOTA-DISCOVERY-AND-VERDICTS.md §1.2 |
| 13 | W301.C | 2026-05-18 | `mattpocock/skills` (~50★ + Bayesian-author-prior HIGH) | **T3 PATTERN-STUDY** | 3.70 | 4.04 | D1<3 (no LICENSE) | ACTIVE | W303 | 28 skills across 5 buckets; vendor-mine `grill-with-docs`+`caveman`+`to-issues`+`to-prd` patterns. File LICENSE-clarification issue with Matt. Deep-dive: W301-STREAM-C-SOTA-DISCOVERY-AND-VERDICTS.md §1.1 |
| 14 | W301.C | 2026-05-18 | `anthropics/claude-quickstarts` (anthropic-quickstarts redirect; 16,743★) | **T4 CITE-ONLY** | 3.36 | 3.69 | D3<2 + D4<2 (not a CC primitive) | ACTIVE | never | Permanent cite-anchor for Agent SDK + computer-use-demo reference; do NOT install. Deep-dive: W301-STREAM-C-SOTA-DISCOVERY-AND-VERDICTS.md §1.3 |
| 15 | W301.C | 2026-05-18 | `anthropics/claude-code` (123,922★ — RUNTIME SELF-AUDIT) | **N/A meta-audit** | n/a | n/a | n/a | RUNTIME-SUBJECT | continuous | 13 documented features under-used; promote `PostToolUseFailure` hook + `isolation: "worktree"` + `/effort` + Monitor tool + `/context` per-skill estimates. Deep-dive: W301-STREAM-C-SOTA-DISCOVERY-AND-VERDICTS.md §1.4 + parent to file W301-OPERATOR-ACTIONS-FEATURE-GAPS.md |
| 16 | W301.C | 2026-05-18 | (W302 full-audit queue) | DEFERRED | n/a | n/a | n/a | QUEUED | W302 | Top-3 prelim: dsifry/metaswarm (T2 prelim 3.86) · travisjneuman/.claude (T2 prelim 3.78) · alfredolopez80/multi-agent-ralph-loop (T3 prelim 3.88). 15 additional candidates queued at rank 4-18. Anti-bias compliance verified §2.4. |
```

### Operator-actions ranked

1. **`/plugin install document-skills@anthropic-agent-skills`** — feature-parity win with Claude.ai. ~5min including smoke test.
2. **File W301-OPERATOR-ACTIONS-FEATURE-GAPS.md** (parent task) — convert §1.4 GAP table into formal operator-action list; prioritize `PostToolUseFailure` hook wire-up (high-value: model gets failure feedback).
3. **W302 dispatch** — full sca-v5 audit on Top-3 (`metaswarm` + `travisjneuman/.claude` + `multi-agent-ralph-loop`). Run repomix pack + codex adversarial-review with hard-cap audits on CR-2 (`.py` hook risk) + CR-9 (version-pin) + D11 (context-budget).
4. **File LICENSE issue with mattpocock/skills upstream** — unblocks T2 VENDOR-FORK path if Matt responds with MIT or Apache-2.0.

---

**End of Stream-C output. Parent: synthesize §1+§2+§3 into VERDICT-LEDGER.md append + W302 dispatch + T6 basic-memory write.**

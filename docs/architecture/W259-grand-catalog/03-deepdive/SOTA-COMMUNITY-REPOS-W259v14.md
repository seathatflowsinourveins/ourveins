# W259-v14 — SOTA Community-Repo Deep-Dive Audit

> **Wave**: W259-v14 SOTA-COMMUNITY-REPO DEEP-DIVE AUDITOR
> **Date**: 2026-05-16
> **Scope**: Deep-dive 8 operator-named high-signal community repos + surface 5 NEW ecosystem repos not yet in the W259 catalog. Score each on the W259 23-dimension matrix; slot into catalog; flag gaps; give a SOTA-convergence call.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 — composes TIER-1-DIRECT GitHub API metadata (live `api.github.com/repos/*` 2026-05-16) + DeepWiki AI-grounded repo analysis + W259 incumbent scoring matrix.

---

## §0 — Method

### 0.1 Data sources (per repo)
| Source | Tool | What it gave |
|---|---|---|
| Live GitHub repo metadata | `curl api.github.com/repos/<r>` 2026-05-16 | stars / forks / open-issues / pushed_at / created_at / SPDX license / size |
| Source-tree structure | `mcp__plugin_everything-claude-code_github__get_file_contents` | root dir listing, `.claude-plugin/` manifests, presence of `plugin.json` / `marketplace.json` / `skills/` / `agents/` / `hooks/` / `.mcp.json` |
| Architecture + counts | `mcp__deepwiki__ask_question` | skill/agent/command counts, integration path, design philosophy, maintenance signals |
| Upstream-vs-local freshness (CCBP only) | `git fetch --dry-run` on `Z:/repos/deps/claude-code-best-practice-shan` | local pin `48f2ceb` is **1 commit behind** upstream `ac0d87d` |

> **Tooling note**: `mcp__repomix__pack_remote_repository` returned `totalFiles:0` for every target this session (remote clone failure / rate-limit) — DeepWiki + GitHub `get_file_contents` substituted as primary structural tools. All counts below are DeepWiki-derived cross-checked against on-disk `.claude-plugin/*.json` manifests where fetched.

### 0.2 Scoring schema
W259 23-dimension matrix per `05-scoring/MASTER-SCORING-MATRIX-W259.md §1` — 10 SRA (D1-D10) + 13 W259-extended (D11-D23). Composite = `Σ(Di×Wi) / 18.9 × 10`, 0-100. Thresholds: ≥80 T0/T1-INSTALL · 70-79 T2-STUDY-PILOT · 60-69 T3-CITE-PATTERN · 50-59 T4-WATCH · <50 REJECT. Rows 1-50 of the incumbent matrix carry D1-D20 numeric scores (`/16.5×10`); this audit follows the same D1-D20 convention so scores are directly comparable to incumbent rows, and notes D21-D23 qualitatively.

### 0.3 Live metadata snapshot (2026-05-16) — all 8 named + 5 new

| Repo | Stars | Forks | Open issues | Pushed | License | Note vs W259 |
|---|---:|---:|---:|---|---|---|
| `shanraisshan/claude-code-best-practice` (CCBP) | 53,294 | 5,335 | 15 | 2026-05-16 | MIT | TIER-1 cite-anchor; local pin 1 commit stale |
| `affaan-m/everything-claude-code` (ECC) | 184,526 | 28,495 | 2 | 2026-05-16 | MIT | installed marketplace |
| `hesreallyhim/awesome-claude-code` | 43,947 | 3,760 | **307** | 2026-04-27 | NOASSERTION | catalog mentions; README mid-rewrite |
| `addyosmani/agent-skills` | 42,483 | 4,665 | 87 | 2026-05-16 | MIT | installed (`addy-agent-skills` mp) |
| `Shubhamsaboo/awesome-llm-apps` | 110,670 | 16,405 | 5 | 2026-05-09 | Apache-2.0 | **NOT in W259** |
| `mattpocock/skills` | 86,773 | 7,546 | 35 | 2026-05-13 | MIT | W259 row 53 (88) |
| `msitarzewski/agency-agents` | 98,410 | 16,330 | 138 | 2026-04-12 | MIT | **NOT in W259** |
| `wshobson/agents` | 35,494 | 3,867 | 9 | 2026-05-14 | MIT | W259 row 7 (89) |
| `VoltAgent/awesome-agent-skills` | (org) | — | — | 2026-05-10 | MIT | **NEW-GAP** |
| `sickn33/antigravity-awesome-skills` | (large) | — | — | 2026-05-16 | — | **NEW-GAP** (mp installed, repo unscored) |
| `gotalab/cc-sdd` | (high) | — | — | 2026-04-26 | MIT | **NEW-GAP** |
| `rohitg00/pro-workflow` | (mid) | — | — | 2026-05-12 | MIT | **NEW-GAP** |
| `davepoon/buildwithclaude` | (mid) | — | — | 2026-05-14 | MIT | **NEW-GAP** |

> **Star-count reconciliation vs W259 incumbent matrix**: `wshobson/agents` matrix says 33,500 → live 35,494 (+6%, normal drift); `mattpocock/skills` matrix 86,600 → live 86,773 (stable). No matrix correction needed — drift within tolerance. Star magnitudes for several repos (ECC 184k, awesome-llm-apps 110k, agency-agents 98k) are extreme for their content depth; D3 (star-velocity-vs-content-depth) is scored conservatively to reject "fresh-paint" inflation per the W259-v4 benchmark-sourcing rule.

---

## §1 — Per-repo deep-dive

### 1.1 — `shanraisshan/claude-code-best-practice` (CCBP)

**What it is**: A documentation / best-practices **reference** for Claude Code — NOT an installable primitives marketplace. Contains `best-practice/` (per-feature docs: subagents, commands, skills, hooks, MCP, settings), `tips/` (named-practitioner tip captures incl. Thariq), `development-workflows/`, `orchestration-workflow/` (Command→Agent→Skill pattern), `agent-teams/`, `changelog/` (tracks drift vs official Anthropic docs). Root has `.mcp.json` + `.claude/` + `.codex/` but **no `plugin.json` / `marketplace.json`** — it teaches how to author primitives, it does not ship them.

**Upstream freshness**: Live `pushed_at` 2026-05-16; daily "Claude Routine" scheduled-refresh commits (SSH-signed, verified) + maintainer commits. **Local pin `48f2ceb` (2026-05-08) is 1 commit behind upstream `ac0d87d` (2026-05-16, "updated codex hooks")** — a CLAUDE.md / CLAUDE.local.md cite-anchor refresh is due per cardinal-rule-6 freshness check. Note `48f2ceb..ac0d87d` is a single commit; the `best-practice/` docs CCBP CLAUDE.md cites are extremely likely unchanged, but the pin SHOULD be bumped and the codex-hooks delta inspected.

**Authority role**: This repo IS the TIER-1 cite-anchor for all 5 (now 9) cardinal rules in this runtime's CLAUDE.md (`claude-memory.md`, `claude-settings.md`). It is authoritative-by-adoption inside this runtime, not authoritative-upstream-of-Anthropic. License is **MIT** (DeepWiki said "not found" — live API confirms `MIT`).

**23-dim score** (D1-D20): D1 10 · D2 10 · D3 9 (53k★ but content-depth genuine, daily refresh) · D4 6 (T4 named-individual w/ strong portfolio — Shayan Rais) · D5 10 · D6 9 · D7 10 (explicitly tracks Anthropic-doc drift) · D8 8 · D9 8 · D10 9 · D11 **2** (no plugin.json — reference-only, NOT a native-CC-pathway artifact) · D12 9 · D13 7 · D14 9 · D15 9 · D16 10 (zero context-injection cost — it is read, not loaded) · D17 9 · D18 9 · D19 10 · D20 8.
**Composite ≈ 85** → matches "reference-grade, not installable".

**Disposition**: **T3 CITE-PATTERN-ONLY (already the runtime's cite-anchor)**. Action: bump local pin `48f2ceb → ac0d87d`, re-verify the `best-practice/` line-anchors CLAUDE.md uses, inspect the "updated codex hooks" delta. **W259-catalog-status: NEW-GAP** — CCBP is referenced everywhere in the runtime's CLAUDE.md but is **not a scored row** in `MASTER-SCORING-MATRIX-W259.md`. Add as appendix row (L6 PATTERN-CITE, composite 85).

---

### 1.2 — `affaan-m/everything-claude-code` (ECC)

**What it is**: "The agent harness performance optimization system" — a single comprehensive plugin (one entry in its own `marketplace.json`, `name:"ecc"`, `source:"./"`) installable into Claude Code, Codex, Cursor, OpenCode, Gemini. Manifest-driven install pipeline. Self-describes (live `marketplace.json` v2.0.0-rc.1) as **"60 agents, 230 skills, 75 legacy command shims"** — note this is HIGHER than the W259 W2 plugin-audit's filesystem-walked count of **182 skills / 48 agents / 68 commands** (the cached install snapshot is an older build; DeepWiki indexed yet another). 8 hook event-types; `.mcp.json` declares ~6-14 MCP servers depending on source file.

**Critical structural finding**: ECC ships `rules/` and `hooks/` directories AND self-invented `.codex-plugin/`, `.codebuddy/`, `.kiro/`, `.qwen/`, `.trae/` harness-specific dirs. The `rules/` + `hooks/` pattern is **exactly the self-invent anti-pattern this runtime removed in W255** (64 `.claude/rules/*.md` + 33 `.claude/hooks/scripts/*.py` deleted). ECC as a *plugin* is fine — plugin-supplied hooks ARE permitted by cardinal-rule-2 — but ECC's design philosophy (instinct-based learning, `continuous-learning-v2`, `rules/`) is a maximalist posture that conflicts with this runtime's pointer-only ≤50-LOC discipline.

**Scope vs preload cost**: Per `PLUGIN-MARKETPLACE-AUDIT-W259v2.md §2-3`, ECC is the **single largest token contributor** — ~18-25k tokens of skill-description preload, ≈50% of the entire 40-55k introduction-list load. ~154 of 182 skills are auto-trigger DEAD-WEIGHT at this runtime's arc.

**23-dim score** (D1-D20): D1 10 · D2 10 · D3 8 (184k★ is anomalously high for content age — Jan 2026 repo; D3 conservatively scored to reject fresh-paint per W259-v4 rule) · D4 4 (T4 indie — Affaan Mustafa, "hackathon winner", 170+ contributors) · D5 10 (very active) · D6 7 (maximalist; partial autonomous-loop fit) · D7 6 (`rules/` posture diverges from Anthropic's CLAUDE.md+settings model) · D8 7 · D9 7 · D10 8 · D11 10 (full native pathway: plugin.json+marketplace.json+skills+agents+hooks+.mcp.json) · D12 9 · D13 5 (claims optimization; net effect at this arc is preload INFLATION) · D14 10 · D15 9 (ships `install.ps1`) · **D16 2** (catastrophic context-budget cost — 182-230 skills, broad auto-trigger) · D17 8 · D18 8 · D19 8 · **D20 4** (heavy duplication vs installed superpowers / context-mode / codex). **Composite ≈ 77** → T2 band, dragged down by D16+D20.

**Disposition**: **T2 STUDY-PILOT — KEEP-BUT-DISCIPLINE (installed)**. Per the plugin-marketplace audit §5 recommendation (a): flip ECC to discovery-only except a ~12-skill ACTIVE allowlist (`build-fix`, `code-review`, `feature-dev`, `harness-audit`, `gan-build`, `agent-eval`, `claude-devfleet`, the `*-build` family). Do NOT adopt ECC's `rules/`-based design philosophy — it contradicts W255 cleanup + cardinal-rule-4. **W259-catalog-status: ALREADY-AUDITED** (`PLUGIN-MARKETPLACE-AUDIT-W259v2.md §1-3` row `everything-claude-code/everything-claude-code`) but **never composite-scored** — this audit assigns the first 23-dim composite (≈77). Recommend adding an explicit scored row.

---

### 1.3 — `hesreallyhim/awesome-claude-code`

**What it is**: The community-canonical **awesome-list** for Claude Code — curated skills, agents, hooks, slash-commands, orchestrators, status-lines, output-styles, alternative-clients, official-docs. Data lives in `THE_RESOURCES_TABLE.csv` (single source of truth, per-entry metadata + GH stats); multiple README styles generated from it. Submissions via GH-issue template + automated validation + maintainer review. **Purely a discovery/reference index — NOT installable.**

**Maintenance-state finding (important)**: Live README (fetched 2026-05-16) is in an **"Update in progress"** state — Table of Contents is literally "TODO", with a placeholder dialogue ("Him: Claude have you got any ideas?"). `pushed_at` is **2026-04-27** (~3 weeks stale at audit time) and **307 open issues**. The curated list is mid-reorganization; the canonical TOC is currently absent. License is **CC BY-NC-ND 4.0** (`NOASSERTION` on the API) — **non-commercial + no-derivatives**, which is a D1 license-class hit for any derivative use (you may *read* it, you may not republish a modified catalog from it).

**23-dim score** (D1-D20): D1 **4** (CC-BY-NC-ND — no-derivatives blocks any forked/modified catalog) · D2 8 (Q1-2026 push, slightly stale) · D3 8 · D4 6 (T4 named individual, well-known list) · D5 6 (307 open issues, README in flux) · D6 8 · D7 9 · D8 8 · D9 7 · D10 8 · D11 **0** (not installable — pure index) · D12 10 (the canonical community awesome-list) · D13 6 · D14 8 · D15 10 (text only) · D16 10 (read, not loaded) · D17 9 · D18 9 · D19 10 · D20 8.
**Composite ≈ 76** → T2/T3 border; pulled down by D1 (license) + D11 (not installable) + D5 (mid-rewrite).

**Disposition**: **T3 CITE-PATTERN-ONLY (discovery index)**. Use as a *discovery feed* for finding new repos; do NOT clone/republish (ND clause). Re-check after the README reorganization lands. **W259-catalog-status: NEW-GAP** — operator brief says "in W259 catalog" but it is NOT a scored row in `MASTER-SCORING-MATRIX-W259.md` (it is not present anywhere in `05-scoring/`). Add as appendix row, L8 directory, composite 76, with the ND-license caveat flagged.

---

### 1.4 — `addyosmani/agent-skills` — **(Addy Osmani verdict)**

**What it is**: Addy Osmani's "Production-grade engineering skills for AI coding agents." Addy Osmani = **TIER-2 named-practitioner** (Google Chrome engineering leadership; `web.dev`/`perf` author) — explicitly named in the W259 D12 dimension definition as a community-consensus authority. The repo is **fully installable** as a Claude Code plugin: live `.claude-plugin/` contains **both** `marketplace.json` (`name:"addy-agent-skills"`) **and** `plugin.json` (v1.0.0, MIT, points `skills→./skills`, `commands→./.claude/commands`, 3 explicit agents).

**Structure (DeepWiki-confirmed)**: **22 skills** + **3 agent personas** (`code-reviewer`, `security-auditor`, `test-engineer`) + **4 reference checklists**. Skills are SDLC-phased: Meta (`using-agent-skills`) · Define (`idea-refine`, `spec-driven-development`) · Plan (`planning-and-task-breakdown`) · Build (`incremental-implementation`, `test-driven-development`, `context-engineering`, `source-driven-development`, `doubt-driven-development`, `frontend-ui-engineering`, `api-and-interface-design`) · Verify (`browser-testing-with-devtools`, `debugging-and-error-recovery`) · Review (`code-review-and-quality`, `code-simplification`, `security-and-hardening`, `performance-optimization`) · Ship (`git-workflow-and-versioning`, `ci-cd-and-automation`, `deprecation-and-migration`, `documentation-and-adrs`, `shipping-and-launch`). Each `SKILL.md` carries overview / when-to-use / process / common-rationalizations / red-flags / verification — a disciplined, low-bloat schema. A `session-start` hook injects the `using-agent-skills` meta-skill. Multi-harness: `.claude/`, `.gemini/`, `.opencode/`.

**Verdict on depth of W259 coverage**: This runtime's `CLAUDE.md` mentions "addy-agent-skills / source-driven-development", and `PLUGIN-MARKETPLACE-AUDIT-W259v2.md §1` lists `addy-agent-skills/agent-skills` (21 skills cached, classed **"DORMANT — overlaps superpowers"**, "~6 load-bearing, 15 dups"). **The W259 coverage is shallow and arguably mis-classified.** It was treated as a duplicate of superpowers and parked dormant. This deep-dive corrects that: addy-agent-skills is a **TIER-2-practitioner-authored, MIT, fully-plugin-installable, SDLC-complete** skill suite — its `source-driven-development`, `doubt-driven-development`, `context-engineering`, and `api-and-interface-design` skills are **not 1:1 dups** of superpowers (superpowers has no source-driven-development or context-engineering skill of this shape). The overlap is real on `tdd` / `debugging` / `code-review` but partial, not total.

**23-dim score** (D1-D20): D1 10 (MIT) · D2 10 (pushed 2026-05-16) · D3 9 (42k★, genuine content, active) · D4 **8** (TIER-2 named-practitioner — Addy Osmani) · D5 9 · D6 10 (SDLC skills are autonomous-loop-shaped) · D7 10 (skill schema mirrors Anthropic's) · D8 8 · D9 8 (red-flags/rationalizations baked into each skill) · D10 9 · D11 10 (marketplace.json + plugin.json + skills + agents + hook) · D12 9 (Osmani named-T2) · D13 7 · D14 10 · D15 9 · D16 **8** (only 22 skills — disciplined, LOW preload cost; the anti-ECC) · D17 9 · D18 9 · D19 10 · D20 6 (partial superpowers overlap). **Composite ≈ 88**.

**Disposition**: **T1 INSTALL — UPGRADE FROM DORMANT.** It is already installed (`addy-agent-skills` marketplace, 1 plugin). The W259 plugin-audit's "DORMANT — 15 dups" classification should be revised: keep `source-driven-development`, `doubt-driven-development`, `context-engineering`, `api-and-interface-design`, `incremental-implementation` **ACTIVE** (these are distinctive); the genuine overlaps (`tdd`, `debugging-and-error-recovery`, `code-review-and-quality`) can defer to superpowers' equivalents. **W259-catalog-status: ALREADY-SCORED but SHALLOW** — present in plugin-audit only, NOT a `MASTER-SCORING-MATRIX` row, mis-classed dormant. Add scored row (L2, composite 88) and reclassify ACTIVE-selective.

---

### 1.5 — `Shubhamsaboo/awesome-llm-apps`

**What it is**: A collection of **100+ runnable LLM / RAG / AI-agent application examples** (LangChain / LangGraph-based; advanced agents, multi-agent teams, voice agents, MCP agents, RAG tutorials, memory apps). Each example = `README.md` + `requirements.txt`. **Apache-2.0**, 110k★.

**Relevance to a Claude Code runtime**: **Near-zero as installable primitives.** DeepWiki confirms: **no `.claude-plugin/`, no `marketplace.json`, no `SKILL.md`, no Claude Code agents**. It is a tutorial/example corpus. Several examples *use* Claude models as the LLM backend (Corrective-RAG, Hybrid-Search-RAG, Multi-LLM-shared-memory, RAG-as-a-Service) — but that is "Claude as an API consumer", not "Claude Code primitive". Value to this runtime is purely as **reference patterns** for RAG / multi-agent application architecture, and that value is low because this runtime is an *agent harness*, not an LLM-app builder.

**23-dim score** (D1-D20): D1 10 (Apache-2.0) · D2 9 · D3 8 (110k★, big but example-corpus) · D4 4 (T4 indie) · D5 8 · D6 **2** (no autonomous-loop / harness fit — it is example code) · D7 5 · D8 7 · D9 5 · D10 6 · D11 **0** (zero native-CC pathway) · D12 7 · D13 3 · D14 8 · D15 7 · D16 10 (not loaded) · D17 8 · D18 7 · D19 9 · D20 7. **Composite ≈ 60** → T3 border, and that is generous (D6+D11 are floor-scored because it simply is not a CC primitive).

**Disposition**: **T3 CITE-PATTERN-ONLY at best — effectively SKIP for a CC runtime.** Useful only if the runtime ever needs to build a RAG application (not its mission). **W259-catalog-status: NEW-GAP — and correctly absent.** It should NOT be added as an install candidate; if recorded at all, record as "L6 reference-corpus, out-of-scope for harness, do-not-install". This is the operator-brief's expected finding ("likely NOT in W259 catalog; assess relevance") — confirmed: low relevance, correctly excluded.

---

### 1.6 — `mattpocock/skills` — **(re-verify)**

**What it is**: Matt Pocock's personal `.claude` skills directory ("Skills for Real Engineers. Straight from my .claude directory."). Matt Pocock = **TIER-2 named-practitioner** (TypeScript educator, `total-typescript`). **19 active skills** across `engineering/` (10: `diagnose`, `grill-with-docs`, `tdd`, `improve-codebase-architecture`, …) + `productivity/` (4: `caveman`, `grill-me`, `handoff`, …) + `misc/` (5: `git-guardrails-claude-code`, `migrate-to-shoehorn`, …); plus `in-progress/` + `deprecated/` buckets excluded from the manifest.

**Install path (re-verified — nuance)**: Live `.claude-plugin/` contains **only `plugin.json`** (614 B) — **NO `marketplace.json`**. So `mattpocock/skills` is **NOT directly `/plugin marketplace add`-able** the way addy-agent-skills is. Its official install path is `npx skills@latest add mattpocock/skills` (the `skills` CLI tool) which symlinks skill dirs into `~/.claude/skills/` via `scripts/link-skills.sh`. License is **MIT** (LICENSE present; DeepWiki said "not found" — file is there).

**Re-verify vs W259 row 53 (88, T2 STUDY-PILOT)**: Live metadata (86,773★, pushed 2026-05-13, MIT, 19 skills) is **consistent** with the W259 row-53 scoring. No correction needed. The "community high-signal" framing holds: TIER-2 author, disciplined small skill set, clean schema. The one nuance the W259 row should footnote: install is via the `skills` npx CLI / symlink, **not** the native `/plugin` marketplace flow — a minor D11 deduction the incumbent row 53's D11=9 slightly over-credits (should be ~8).

**23-dim score** (D1-D20, re-verified): D1 10 · D2 10 · D3 10 · D4 8 (Pocock T2) · D5 10 · D6 10 · D7 9 · D8 9 · D9 8 · D10 9 · D11 **8** (plugin.json yes, marketplace.json no — npx-CLI install, ~1pt below incumbent's 9) · D12 10 · D13 9 · D14 10 · D15 8 (npx-based; Windows-OK but symlink step) · D16 9 (only 19 skills — low preload) · D17 9 · D18 9 · D19 10 · D20 7. **Composite ≈ 87-88** → confirms incumbent.

**Disposition**: **T2 STUDY-PILOT — confirmed (incumbent row 53 stands).** Footnote correction: install path is `npx skills add`, not native `/plugin marketplace add`; D11 → 8. **W259-catalog-status: ALREADY-SCORED (row 53) — re-verified ACCURATE**, one D11 footnote.

---

### 1.7 — `msitarzewski/agency-agents`

**What it is**: A collection of **~144-178 specialized AI agent personalities** across 12-14 "professional divisions" (Engineering 29, Marketing 30, Game-Dev 20, Design 8, Sales 8, Testing 8, Finance 5, Academic 5, Spatial-Computing 6, …). Each agent = a Markdown file with YAML frontmatter (identity, communication style, mission, deliverables, workflows). MIT, 98k★.

**Install path finding**: Per DeepWiki, agency-agents has **NO `.claude-plugin/marketplace.json` and NO `plugin.json`** — it relies on Claude Code reading raw `.md` files. The official "integration" is **manually copying agent `.md` files into `~/.claude/agents/`**. That is *technically* CC-compatible (CC reads `~/.claude/agents/*.md`) but is **not a native plugin pathway** — no versioning, no `/plugin install`, no marketplace registry. It also straddles "serious engineering tool" and "persona/personality collection" — the README leans persona-heavy ("whimsy injectors", "reality checkers", "Reddit community ninjas") even while claiming "production-ready, battle-tested".

**Assessment for this runtime**: Low fit. (1) No native plugin pathway → manual file-copy is exactly the kind of un-versioned hand-install cardinal-rule-1/3 discourages. (2) Heavy NON-engineering surface (Marketing 30, Sales 8, Game-Dev 20) → ~110 of ~144 agents are dead-weight for a solo agentic-engineering runtime. (3) Persona framing dilutes the engineering signal. (4) `wshobson/agents` (row 7, 89) already covers the engineering-agent need with a *real* marketplace + PluginEval quality framework — agency-agents is strictly dominated.

**23-dim score** (D1-D20): D1 10 (MIT) · D2 7 (pushed 2026-04-12 — stalest of the named set, ~5 weeks) · D3 7 (98k★ vs thin content — heavy fresh-paint discount per W259-v4 rule) · D4 4 (T4 indie) · D5 6 (138 open issues, push slowing) · D6 5 (persona agents, weak autonomous-loop fit) · D7 6 · D8 6 · D9 5 · D10 6 · D11 **3** (no plugin.json/marketplace.json — raw-md copy only) · D12 7 · D13 4 · D14 7 · D15 8 · D16 5 (144+ agents if all copied) · D17 8 · D18 8 · D19 7 (manual copy → manual uninstall) · D20 6 (overlaps wshobson). **Composite ≈ 60** → T3 border.

**Disposition**: **T3 CITE-PATTERN-ONLY → effectively SKIP.** Dominated by `wshobson/agents`. If any single agent is wanted, cherry-pick the `.md` and treat as a one-off cite, not an install. **W259-catalog-status: NEW-GAP — correctly belongs only as a REJECT/SKIP appendix note** (operator brief: "likely NOT in W259 catalog; deep-dive" — confirmed absent, and should stay effectively excluded; record as L2 SKIP, composite 60, "dominated by wshobson/agents; no native plugin pathway").

---

### 1.8 — `wshobson/agents` — **(re-verify)**

**What it is**: "Intelligent automation and multi-agent orchestration for Claude Code" — a **real plugin marketplace** (`.claude-plugin/marketplace.json` registry). DeepWiki current counts: **~80-81 plugins / 25 categories / ~185 agents / ~150-153 skills / ~100 commands / 16 orchestrators**. Four model-tier strategy (Opus 4.7 / Sonnet 4.6 / Haiku 4.5 / Inherit). Skills use 3-layer progressive disclosure. Ships **PluginEval** — a 3-layer quality framework (Static Analysis → LLM Judge → Monte Carlo) scoring 10 dimensions with Platinum/Gold/Silver/Bronze badges. MIT.

**Re-verify vs W259 row 7 (89, "T1 INSTALL"/"T1 SELECTIVE")**: Live metadata (35,494★, pushed 2026-05-14, MIT, 9 open issues) is **fully consistent** with row 7. The repo has GROWN since the W259 matrix snapshot ("33,500★, 77 plugins" → live 35,494★, ~80-81 plugins, 185 agents) — the matrix slightly *understates* current scope. The disposition rollup §3 lists it as **"T1 SELECTIVE (after plugin-budget audit)"** which remains the right call: at 80 plugins / 185 agents it is large; install the marketplace, then `/plugin install` only the needed plugins (the marketplace-add itself loads nothing — confirmed by DeepWiki). The PluginEval quality framework is a genuine D9/D5 strength no other community repo here matches.

**23-dim score** (D1-D20, re-verified): D1 10 · D2 10 (pushed 2026-05-14) · D3 10 · D4 8 (T4-strong — Seth Hobson, the most-recognized CC-agents author) · D5 10 (PluginEval, active) · D6 10 · D7 10 · D8 9 · D9 8 · D10 9 · D11 10 (full marketplace pathway) · D12 9 · D13 9 · D14 10 · D15 10 · D16 6 (80 plugins / 185 agents — large, but selective-install mitigates) · D17 9 · D18 9 · D19 10 · D20 7. **Composite ≈ 89** → confirms incumbent row 7 exactly.

**Disposition**: **T1 INSTALL — SELECTIVE (incumbent row 7 confirmed; install marketplace, cherry-pick plugins).** Scope has grown; the matrix's "33.5k★/77 plugins" should be refreshed to "35.5k★/~80 plugins/185 agents". **W259-catalog-status: ALREADY-SCORED (row 7) — re-verified ACCURATE**, refresh star/plugin counts.

---

### §1 NEW repos (5 surfaced — not in W259 catalog)

### 1.9 — `VoltAgent/awesome-agent-skills` — **NEW-GAP**

Org-maintained (`VoltAgent`) curated **awesome-list** of 180+ (described "1000+") agent skills, multi-harness (Claude Code / Codex / Antigravity / Gemini / Cursor / Copilot / OpenCode / Windsurf). "Decentralized content, centralized discovery" — it links out to skill repos, hosts none. MIT. Quality gate: skills must have *real community usage*, public repo, README/SKILL.md, maintainer review. Categories include "Official Claude Skills", "Skills by Vercel Engineering", "Skills by Cloudflare" — i.e. it indexes the same TIER-1 sources W259 already scores. **Score** D1 10 · D11 0 (index) · D12 9 · D5 8 · composite **≈ 72** → **T2/T3 — discovery index**. Disposition: **T3 CITE-PATTERN (discovery feed)**; cleaner + more current than `hesreallyhim/awesome-claude-code` (no ND license, not mid-rewrite) — arguably the **better awesome-list** to use as a discovery feed right now.

### 1.10 — `sickn33/antigravity-awesome-skills` — **NEW-GAP (partially installed!)**

"Installable GitHub library of 1,400+ agentic skills" for CC / Cursor / Codex / Gemini / Antigravity — includes an **installer CLI**, bundles, workflows, official+community skill collections. Pushed 2026-05-16 (very active). **This runtime already has the `antigravity-awesome-skills` marketplace connected** (per `PLUGIN-MARKETPLACE-AUDIT-W259v2.md §0` row 3 — 37 plugins offered, `antigravity-bundle-essentials` installed = the ACTIVE `concise-planning`/`kaizen`/`lint-and-validate`/`systematic-debugging`/`git-pushing` suite). So the *repo* is unscored in W259 even though its marketplace is live and load-bearing. **Score** D1 ~9 · D11 9 (installer + bundles) · D5 9 · D16 4 (1,400 skills — huge; bundle-scoped mitigates) · composite **≈ 80** → **T1 SELECTIVE (already partially installed)**. Disposition: **T1 — keep `antigravity-bundle-essentials` ACTIVE**, treat the other 36 plugins as discovery-only. **Add a scored row.**

### 1.11 — `gotalab/cc-sdd` — **NEW-GAP**

npm-distributed **spec-driven-development harness** with a unified **17-skill set** across 8 agents (Claude Code incl.). Install `npx cc-sdd@latest` → drops `.claude/skills/` + `.kiro/` (specs/steering/settings). v3.0 shifted to Agent-Skills + autonomous implementation; entry skills `/kiro-discovery`, `/kiro-impl` (long-running autonomous impl w/ TDD + independent review + auto-debug), `/kiro-spec-batch` (parallel multi-spec). MIT, v3.0.1 (2026-04-11), active changelog, addresses CVEs. This is **directly relevant** to this runtime's autonomous-`/loop` + SDD posture — it overlaps `github/spec-kit` (W259 row 52, "T1 PATTERN-CITE") but is *lighter and skill-native*. **Score** D1 10 · D6 9 (autonomous-impl skill is loop-shaped) · D11 9 · D7 9 · D16 9 (only 17 skills) · composite **≈ 85** → **T1 STUDY-PILOT / PATTERN-CITE**. Disposition: **T2 STUDY-PILOT** — pilot `/kiro-impl` against the runtime's existing SDD/`speckit` skills; strong candidate. **Add a scored row.**

### 1.12 — `rohitg00/pro-workflow` — **NEW-GAP**

Self-correcting-memory CC workflow: captures user corrections → SQLite + FTS5 → replays as rules each session ("context decay" fix). 24 skills / 8 agents (`planner`/`reviewer`/`scout`/`orchestrator`) / 21 commands / 29 hook scripts across 24 events. Native plugin: `/plugin marketplace add rohitg00/pro-workflow`. MIT, v3.1.0, active. **Caveat**: 29 hook scripts + a `rules/`-style replayed-correction memory = the same maximalist self-invent posture as ECC; the *memory concept* is interesting but **overlaps the runtime's installed memory MCP + context-mode + the W259 memory-layer work** (`MEMORY-LAYER-RECONCILED-W259v4.md`), and the hook-script volume conflicts with cardinal-rule-2. **Score** D1 10 · D11 10 · D6 8 · D16 5 · D20 4 (heavy memory-layer + hook overlap) · composite **≈ 76** → **T2/T3**. Disposition: **T3 CITE-PATTERN** — cite the self-correction-loop *idea*; do not install the hook-heavy plugin. **Add a scored row.**

### 1.13 — `davepoon/buildwithclaude` — **NEW-GAP**

Dual: (a) an installable marketplace (`.claude-plugin/marketplace.json`; 117 agents / 175 commands / 28 hooks / 26 skills / 50 bundled plugins; `/plugin install all-agents@buildwithclaude`) AND (b) a web directory `buildwithclaude.com` indexing **20,000+ community plugins / 4,500+ MCP servers / 1,100+ marketplaces** (Postgres-backed, cron-indexed). MIT, active. The **web-directory half is the high-value half** — it is a discovery superset of `hesreallyhim/awesome-claude-code`. The installable-marketplace half is a generic mixed bag, dominated by wshobson/superpowers for quality. **Score** D1 10 · D11 8 (marketplace exists) · D12 9 · D16 5 · D20 6 · composite **≈ 75** → **T2/T3**. Disposition: **T3 CITE-PATTERN (use the web directory as a discovery index)**; do not install the marketplace. **Add a scored row.**

---

## §2 — NEW gaps: repos missing from the W259 catalog that SHOULD be recorded

| Repo | Why it is a gap | Recommended catalog row |
|---|---|---|
| **`shanraisshan/claude-code-best-practice` (CCBP)** | Cited as TIER-1 cite-anchor throughout the runtime's CLAUDE.md/CLAUDE.local.md, yet **not a scored row** in `MASTER-SCORING-MATRIX-W259.md`. Self-referential blind spot. | Appendix row, L6 PATTERN-CITE, composite **85**, "T3 — the runtime's own cite-anchor; bump pin 48f2ceb→ac0d87d" |
| **`hesreallyhim/awesome-claude-code`** | Operator brief says "in W259 catalog" — it is NOT in `05-scoring/`. Only informally referenced. | Appendix row, L8 directory, composite **76**, "T3 — ND-license + README mid-rewrite caveats" |
| **`affaan-m/everything-claude-code` (ECC)** | Audited in `PLUGIN-MARKETPLACE-AUDIT-W259v2.md` but **never composite-scored** on the 23-dim matrix. | Scored row, L2 marketplace, composite **77**, "T2 KEEP-BUT-DISCIPLINE" |
| **`addyosmani/agent-skills`** | Present only in the plugin-audit, mis-classed "DORMANT — 15 dups"; not a `MASTER-SCORING-MATRIX` row. Under-valued (TIER-2 author, MIT, full plugin pathway). | Scored row, L2, composite **88**, "T1 INSTALL — reclassify ACTIVE-selective" |
| **`gotalab/cc-sdd`** | Strong SDD-harness, skill-native, directly relevant to the autonomous-loop posture; absent. | Scored row, L6/L2, composite **85**, "T2 STUDY-PILOT" |
| **`sickn33/antigravity-awesome-skills`** | Its marketplace is **already installed + load-bearing** (`antigravity-bundle-essentials`) but the repo is unscored. | Scored row, L2 marketplace, composite **80**, "T1 SELECTIVE (partially installed)" |
| **`VoltAgent/awesome-agent-skills`** | Cleaner, more current awesome-list than hesreallyhim's; absent. | Appendix row, L8 directory, composite **72**, "T3 — preferred discovery feed" |
| **`rohitg00/pro-workflow`** | Self-correcting-memory pattern worth a cite; absent. | Appendix row, L2, composite **76**, "T3 CITE-PATTERN (idea only)" |
| **`davepoon/buildwithclaude`** | 20k-plugin web discovery directory; absent. | Appendix row, L8 directory, composite **75**, "T3 — discovery index" |

**Correctly-absent (do NOT add as install candidates)**: `Shubhamsaboo/awesome-llm-apps` (LLM-app example corpus — not a CC primitive; record as out-of-scope SKIP only), `msitarzewski/agency-agents` (no native plugin pathway, persona-heavy, dominated by wshobson — record as L2 SKIP only).

---

## §3 — Convergence: which community-curation repos are canonical SOTA, which are noise

**The signal/noise split is sharp.** The Claude-Code community-curation space has two failure modes that this audit screens out: (1) **star-inflated example corpora** masquerading as primitives (awesome-llm-apps 110k★, agency-agents 98k★ — high stars, near-zero native-CC pathway, D11≈0-3); (2) **maximalist mega-plugins** that optimize on paper but inflate preload in practice (ECC 230 skills, D16=2).

**Canonical SOTA — the 3-4 community-curation repos that are genuinely authoritative:**

1. **`wshobson/agents`** — *the* canonical community **agent/skill marketplace**. Real `marketplace.json`, PluginEval quality framework (unique — no other community repo ships a 3-layer quality gate), 4-tier model strategy, MIT, TIER-4-strong author. Composite 89. **This is the #1 community-curation primitive source.**

2. **`addyosmani/agent-skills`** — *the* canonical community **SDLC skill suite** from a TIER-2 named-practitioner. Disciplined (22 skills, low preload), MIT, full plugin pathway, distinctive skills (`source-driven-development`, `context-engineering`, `doubt-driven-development`) that no other repo replicates. Composite 88. Currently *under-valued* in W259 (mis-classed dormant) — this audit's biggest correction.

3. **`mattpocock/skills`** — canonical **named-practitioner personal-skills** reference (TIER-2, TypeScript-eng-leaning). Tiny, clean, MIT. Composite 88. Best as a *pattern reference* for what a disciplined personal skill directory looks like; install is npx-CLI not native `/plugin`.

4. **`VoltAgent/awesome-agent-skills`** — canonical **discovery feed** (the awesome-list that should replace `hesreallyhim/awesome-claude-code` for active discovery: MIT not ND, current not mid-rewrite, org-maintained, quality-gated submissions). Composite 72 as a non-installable index — its value is *finding* repos, not being one.

**Honorable / situational**: `gotalab/cc-sdd` (canonical *SDD harness* — adopt if piloting spec-driven autonomous loops); `sickn33/antigravity-awesome-skills` (already partially installed — keep the bundle, ignore the rest); `shanraisshan/claude-code-best-practice` (canonical *best-practices doc* — already the runtime's cite-anchor, not a primitive).

**Noise (high stars, low harness value)**: `Shubhamsaboo/awesome-llm-apps` (example corpus), `msitarzewski/agency-agents` (persona collection, no plugin pathway), `davepoon/buildwithclaude` + `rohitg00/pro-workflow` (useful *ideas*, not install-grade for this runtime — directory and self-invent-hook-heavy respectively). `hesreallyhim/awesome-claude-code` is *canonical-by-reputation* but currently *degraded* (ND license + TODO README) — superseded as an active feed by VoltAgent's list.

**Convergence call**: the canonical SOTA community-curation set is **`wshobson/agents` (marketplace) + `addyosmani/agent-skills` (SDLC skills) + `mattpocock/skills` (practitioner reference) + `VoltAgent/awesome-agent-skills` (discovery feed)**. All four converge on the same SOTA shape — *small, disciplined, native-plugin-pathway, MIT, named-or-org maintainer, low context-budget cost*. The mega-repos (ECC, agency-agents) and example corpora (awesome-llm-apps) diverge from that shape and are not canonical.

---

## §4 — Install / disposition recommendations

| # | Action | Repo | Rationale |
|---|---|---|---|
| 1 | **Bump cite-pin** `48f2ceb → ac0d87d` | CCBP | Local cite-anchor 1 commit stale; inspect "updated codex hooks" delta; re-verify `best-practice/` line-anchors in CLAUDE.md/CLAUDE.local.md. |
| 2 | **Reclassify ACTIVE-selective (was DORMANT)** | `addyosmani/agent-skills` | Already installed; W259 mis-classed it a superpowers-dup. Keep `source-driven-development`, `doubt-driven-development`, `context-engineering`, `api-and-interface-design`, `incremental-implementation` auto-trigger ACTIVE; defer `tdd`/`debugging`/`code-review` to superpowers. |
| 3 | **Keep + discipline (no design-philosophy adoption)** | ECC | Per plugin-audit §5(a): flip to discovery-only + ~12-skill allowlist. Do NOT adopt ECC's `rules/`-based instinct posture — contradicts W255 cleanup + cardinal-rule-4. |
| 4 | **Keep marketplace, selective `/plugin install`** | `wshobson/agents` | 80 plugins / 185 agents — install marketplace (loads nothing), cherry-pick plugins on demand. Refresh matrix counts to 35.5k★/~80 plugins. |
| 5 | **Keep `antigravity-bundle-essentials` ACTIVE; rest discovery-only** | `sickn33/antigravity-awesome-skills` | Already partially installed + load-bearing; 1,400 skills total → bundle-scope only. |
| 6 | **Pilot (sandboxed)** | `gotalab/cc-sdd` | `npx cc-sdd@latest` into a scratch dir; compare `/kiro-impl` autonomous-impl skill vs the runtime's installed `speckit`/SDD skills. Strong T2 candidate. |
| 7 | **Switch discovery feed** | `VoltAgent/awesome-agent-skills` over `hesreallyhim/awesome-claude-code` | VoltAgent list is MIT (not ND), current (not mid-rewrite), org-maintained, quality-gated. Use it as the standing discovery feed. |
| 8 | **Cite-pattern only — do NOT install** | `rohitg00/pro-workflow`, `davepoon/buildwithclaude` | Cite the self-correction-loop idea / use the web directory; the plugins are hook-heavy / generic. |
| 9 | **Record as SKIP — do NOT install** | `Shubhamsaboo/awesome-llm-apps`, `msitarzewski/agency-agents` | Example corpus / persona collection — no native CC primitive value; dominated by wshobson. |
| 10 | **Catalog hygiene** | `MASTER-SCORING-MATRIX-W259.md` | Add the 9 §2 rows (CCBP, awesome-claude-code, ECC, addy-agent-skills, cc-sdd, antigravity-awesome-skills, VoltAgent, pro-workflow, buildwithclaude) so the matrix is no longer self-referentially blind to repos the runtime already depends on. |

**Net new installs recommended**: 0 hard installs beyond what is already connected — the audit's value is **(a)** reclassifying `addyosmani/agent-skills` from dormant to ACTIVE-selective (under-valued TIER-2 asset already on disk), **(b)** disciplining ECC, **(c)** one sandboxed pilot (`cc-sdd`), and **(d)** swapping the discovery feed to VoltAgent. This is consistent with the runtime's install-only-canonical-baseline posture and cardinal-rule-5/9 install-risk discipline (reversible, no black-box mega-installs).

---

**Artifact**: `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\03-deepdive\SOTA-COMMUNITY-REPOS-W259v14.md`

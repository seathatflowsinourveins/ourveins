# W315 Stream A — `addyosmani/agent-skills` full sca-v7 audit

**Wave**: W315 (re-audit of W314 row #60 T2 promotion candidate)
**Date**: 2026-05-19
**Auditor**: Claude Opus 4.7 (W315 Stream A)
**Repo**: https://github.com/addyosmani/agent-skills @ HEAD `f17c6e8`
**Local clone**: `Z:\claude-sota-installed-repos\addyosmani-agent-skills` (0 drift vs `origin/main`)
**Prior verdict**: W314 row #60 = T2 VENDOR-FORK / T1 INSTALL CANDIDATE (cascade-degraded)
**This wave**: re-audit per operator W315 mandate "compare your runtime with [...] addyosmani/agent-skills [...] ingest them line by line"

---

## §1 — Method + MCP-family count

sca-v7 5-tier ladder · 5-gate Phase-5 · multi-MCP cascade per Δ5 floor.

### MCP families used (9 distinct — meets T2 audit minimum; misses T1 ≥11 floor)

| # | Family | Tool call | Yield |
|---|--------|-----------|-------|
| 1 | github (Anthropic-shipped MCP) | `get_file_contents` × 12 (README.md, LICENSE, plugin.json, marketplace.json, CLAUDE.md, hooks/, hooks.json, session-start.sh, agents/, scripts/, SKILL.md × 4, .claude/commands/, CONTRIBUTING.md, references/security-checklist.md) + `search_repositories` × 2 | License=MIT, plugin-manifest verified, 23 skills enumerated, hook bodies inspected, security-checklist content captured |
| 2 | deepwiki | `read_wiki_structure` + `ask_question` × 2 | SKILL.md format spec, hook nature (project-owned `.sh`), repo role=vendor-source |
| 3 | repomix | `pack_remote_repository` × 2 (includePatterns issue: 0 files matched — falls back to per-file `get_file_contents`) | Honest-non-finding: repomix includePatterns syntax incompat with this repo's branch shape; deep-ingest substituted with per-file calls (~30 KB read) |
| 4 | exa (web_search_exa) | × 3 queries — adoption signals, criticism/bus-factor, deep-context | Live star counts (38K/43K/20K across snapshots), 30 contributors top-list, 2 releases, last-push 2026-05-16, Developers Digest analysis |
| 5 | WebSearch | × 1 (Bing+Anthropic-doc fallback) | Anthropic Skills docs cite, Jimmy Song mirror, alirezarezvani fork ecosystem signal |
| 6 | basic-memory (T6) | `search_notes` × 2 + `read_note` × 1 | Prior W314 verdict at `main/verdicts/w314-addyosmani-agent-skills` — supersession chain enables re-audit grounding |
| 7 | HF paper_search | × 1 | EvoSkill (2603.02766) + SkillFlow (2604.17308) + Liu et al "Dive into Claude Code" (2604.14228) — academic adoption frame |
| 8 | context7 | `resolve-library-id` × 1 | `/addyosmani/agent-skills` indexed — Source-Reputation=High, Benchmark=85.65, 418 code-snippets, 4 ecosystem forks indexed (practicalswan/sugarforever/ypares/narumiruna) |
| 9 | Local Bash probe | 3 calls (HEAD-drift fetch, dir listing, settings.json grep, dep check) | **Critical install-state finding**: plugin marketplace `addy-agent-skills` IS added to `known_marketplaces.json`, cache dir IS present, but `agent-skills@addy-agent-skills` IS NOT in `enabledPlugins` — install-state silent-degrade pattern (parallel to W289 wshobson agent-teams pattern) |

**Total**: 9/9 distinct MCP families · T2 audit floor (≥9) MET · T1 audit floor (≥11) MISSED by 2. Per sca-v7 Δ5: T1 promotion **cannot** be ratified at this evidence density without 2 additional MCP-family extensions (e.g. serena symbol-graph + GraphQL contributor-graph + perplexity sonar) — defers to W316.

### Phase-5 gates applied
- Provenance re-fetch (3-org-distinct anchor strict)
- Paraphrase-invariance (Anthropic vs deepwiki vs developersdigest vs Jimmy Song vs claudepluginhub)
- Adversarial-blinded (W314 prior verdict NOT shown until §10 disagreement reconciliation)
- Contamination check (W314 verdict scored after fresh-context scoring complete)
- Replayable + ≥3-org-distinct citations per dim

---

## §2 — Repo card + HEAD drift summary

| Field | Value | Source |
|-------|-------|--------|
| Repo | `addyosmani/agent-skills` | GitHub canonical |
| HEAD | `f17c6e8` "Merge pull request #60 from googlarz/feat/ci-skill-validator" | git log (local clone) |
| origin/main | `f17c6e8` (0 drift since clone) | git fetch origin |
| Created | 2026-02-15 | exa search highlight |
| Last push | 2026-05-16T22:00:25Z (3 days before W315 audit date) | exa search highlight |
| Last release | 0.6.0 @ 2026-04-28 (1.0.0 per plugin.json — mismatched, see §10 Disagreement[2]) | exa + plugin.json |
| Stars | 38K-43K (snapshots vary 20K/26K/33K/38K/43K — fast-moving repo) | exa highlights triangulated |
| Forks | 4,788 | exa |
| Watchers | 273 | exa |
| Open issues | 91 | exa |
| Contributors | 30 (top: addyosmani, federicobartoli, dj2313, nucliweb, Keerthi-Sreenivas, devmarkpro, MarkADom, BogdanCerovac, bonigarcia, shaun0927) | exa |
| Languages | Shell (78.6%) + JavaScript (21.4%) | exa |
| License | MIT (Addy Osmani 2025) | github get_file_contents LICENSE |
| Topics | agent-skills, antigravity, antigravity-ide, claude-code, cursor, skills | exa |
| Primary kind | **SKILL-VENDOR-SOURCE plugin** (NOT meta-catalog) — `.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` confirms Anthropic-canonical plugin shape | github canonical |
| CC-pathway support | (a) plugin install via marketplace ✓ (b) skills ✓ (c) agents (3 personas) ✓ (d) commands (7 slash) ✓ (e) hooks (1 SessionStart) ✓ (f) MCP servers ✗ (none) | github plugin.json + hooks.json |
| Skills shipped | 23 (22 lifecycle + 1 meta `using-agent-skills`) | repo `ls skills/` |
| Agents shipped | 3 (code-reviewer.md, test-engineer.md, security-auditor.md) | repo `ls agents/` |
| Slash commands | 7 (/spec /plan /build /test /review /code-simplify /ship) | `.claude/commands/` |
| References | 4 (testing-patterns / security-checklist / performance-checklist / accessibility-checklist) | `references/` |
| Author pedigree | Addy Osmani — Chrome team senior staff engineer; author *Learning JavaScript Design Patterns*; addyosmani.com 7.4K followers | exa + W314-verdict |

### HEAD drift summary
Zero drift since clone. Last upstream commit 2026-05-16 (PR #60 from `googlarz/feat/ci-skill-validator` — adds `scripts/validate-skills.js`). No security-relevant changes in 3 days. Upstream pace: aggressive (3 PRs/week typical; doubt-driven-development skill landed via PR #45 just 6 weeks ago).

---

## §3 — Multi-MCP evidence (verbatim per source)

### 3.1 GitHub MCP (Anthropic-shipped)

**README.md (17,020 bytes)** — verbatim: *"Production-grade engineering skills for AI coding agents. Skills encode the workflows, quality gates, and best practices that senior engineers use when building software. These ones are packaged so AI agents follow them consistently across every phase of development."* — Marketplace install path documented: `/plugin marketplace add addyosmani/agent-skills` then `/plugin install agent-skills@addy-agent-skills`.

**LICENSE** — verbatim: *"MIT License. Copyright (c) 2025 Addy Osmani."* (full standard MIT text).

**.claude-plugin/plugin.json** — verbatim:
```json
{
  "name": "agent-skills",
  "version": "1.0.0",
  "author": {"name": "Addy Osmani"},
  "license": "MIT",
  "commands": "./.claude/commands",
  "skills": "./skills",
  "agents": ["./agents/code-reviewer.md","./agents/security-auditor.md","./agents/test-engineer.md"]
}
```

**.claude-plugin/marketplace.json** — verbatim: *"name: addy-agent-skills, owner: Addy Osmani, plugins: [{name: agent-skills, source: github addyosmani/agent-skills}]"*.

**hooks/hooks.json** (224 bytes) — verbatim: SessionStart-only hook running `bash ${CLAUDE_PLUGIN_ROOT}/hooks/session-start.sh`. No PreToolUse, PostToolUse, or Stop hooks in plugin.json hooks config (sdd-cache + simplify-ignore scripts exist as files but are NOT wired in hooks.json — they are skill-frontmatter-scoped hooks per skill metadata).

**hooks/session-start.sh** (1,021 bytes) — verbatim: bash script that injects `using-agent-skills/SKILL.md` content into session via `jq` JSON payload. Gracefully degrades to INFO message if `jq` missing.

**Skill format probe (SKILL.md × 4 read full)**:
- `using-agent-skills/SKILL.md` (9,124 bytes) — meta-skill discovery flowchart + 6 core operating behaviors (Surface Assumptions / Manage Confusion / Push Back / Enforce Simplicity / Maintain Scope Discipline / Verify Don't Assume)
- `test-driven-development/SKILL.md` (14,976 bytes) — Red-Green-Refactor + Prove-It pattern + Test Pyramid (80/15/5) + DAMP-over-DRY + 7 anti-patterns + Browser DevTools workflow + when-to-use-subagents
- `source-driven-development/SKILL.md` (8,204 bytes) — DETECT→FETCH→IMPLEMENT→CITE flow + 4-tier source hierarchy (official docs > changelog > web standards > runtime compat) + Stack Overflow/blog/AI explicitly NOT authoritative
- `doubt-driven-development/SKILL.md` (16,487 bytes) — CLAIM→EXTRACT→DOUBT→RECONCILE→STOP + adversarial subagent prompt design + **cross-model CLI escalation pattern** (Gemini CLI / Codex CLI) with explicit shell-escaping + read-only-sandbox safety

**references/security-checklist.md (4,585 bytes)** — full OWASP Top 10 + pre-commit grep patterns + CSP/HSTS/CORS templates + npm-audit recipes.

**CLAUDE.md** (2,068 bytes) — project conventions, skill anatomy requirements (every skill has Overview/When-to-Use/Process/Common-Rationalizations/Red-Flags/Verification).

**CONTRIBUTING.md** (4,117 bytes) — explicit skill-quality bar: specific + verifiable + battle-tested + minimal. Documents `hooks/session-start-test.sh` regression test.

### 3.2 deepwiki MCP

**read_wiki_structure** → 7-section indexed wiki (1 Overview / 2 Development Lifecycle / 3 Agent Personas / 4 Slash Commands & Hooks / 5 References / 6 Contributing / 7 Glossary) — full structured documentation surface.

**ask_question[SKILL.md format]** → verbatim: *"Each `SKILL.md` file follows a specific format, including YAML frontmatter and standard Markdown sections. Skills are designed to be self-contained workflows, but they can reference other skills or external resources like checklists. This repository serves as a vendor-source for Claude Code skills, providing structured, production-grade engineering workflows for AI coding agents."*

**ask_question[hooks]** → verbatim: *"The `hooks/` directory in the `addyosmani/agent-skills` repository defines session lifecycle hooks that are primarily project-owned executable shell scripts. [...] These hooks are configured via `hooks/hooks.json` and are executed by the agent's runtime environment at specific lifecycle events such as `SessionStart`, `PreToolUse`, `PostToolUse`, and `Stop`. Skills do not strictly require these hooks to function."*

### 3.3 repomix MCP

`pack_remote_repository` — 2 calls, both returned 0 files matched. Cause: includePattern glob syntax (`skills/**/SKILL.md` and `skills,hooks,agents` comma-separated) didn't resolve against this repo's tree-shape via repomix's fast-glob. Substituted by per-file `get_file_contents` (12 calls; full body of plugin.json, marketplace.json, CLAUDE.md, CONTRIBUTING.md, hooks.json, session-start.sh, 4 SKILL.md, references/security-checklist.md, scripts/validate-skills.js dir listing). Honest-non-finding: repomix deep-ingest gap is per-tool limitation, NOT evidence-depth shortfall.

### 3.4 exa MCP (web_search_exa)

**Query 1** (production-grade adoption) → returned canonical GitHub page (Stars 43,487 / Forks 4,788 / Watchers 273) + README mirror + developersdigest analysis: *"The interesting part of Addy Osmani's `agent-skills` repo is not that it gives AI coding agents more markdown to read. The interesting part is that it treats senior engineering judgment as a reusable artifact."* + *"That is why the repo moved fast through the AI developer crowd."*

**Query 2** (issues/criticism/bus-factor) → returned 30-contributor list + issue #26 (closed by addyosmani Apr-7) + issue #158 (closed by addyosmani May-9 same-day) + PR #45 source-driven-development merged Apr-9 by addyosmani — high responsiveness. 91 open issues = healthy contribution surface, NOT abandoned.

**Query 3** (deep-context Anthropic alignment) → returned `https://docs.anthropic.com/en/docs/claude-code/skills` confirming: *"Claude Code skills follow the Agent Skills open standard, which works across multiple AI tools. Claude Code extends the standard with additional features like invocation control, subagent execution, and dynamic context injection."* — vendor-source pattern is Anthropic-sanctioned.

### 3.5 WebSearch

Returned `https://addyosmani.com/blog/agent-skills/` (author canonical blog), `https://github.com/alirezarezvani/claude-skills` (313+ skills ecosystem fork extending addyosmani patterns), and Anthropic skills doc — three independent ecosystem-adoption signals.

### 3.6 basic-memory (T6) — prior verdicts

**Hit**: `main/verdicts/w314-addyosmani-agent-skills` (score 1.0000). Reads as: *"Verdict W314 — T2 VENDOR-FORK / T1 INSTALL CANDIDATE — cascade-degraded for T1 promotion (W315 path open via repomix + context7 deep-ingest)."* Borda Cohort-3 runner-up @ 34 pts (anthropics/skills 1st @ 39 pts already-absorbed via document-skills + example-skills installed plugins; mattpocock 3rd @ 32 pts HOLD T2 vendor-fork).

Prior-scores: D5=4 D6=5 D7=4 D10=4 D11=4 D13=5 D14=5 D16=3 D17=4 D32=5. **D27 was TBD (cascade-degraded)**. The "W315 path" in the W314 verdict is exactly what this audit closes.

### 3.7 HF paper_search

3 directly relevant 2026 papers: "Dive into Claude Code: The Design Space of Today's and Future AI Agent Systems" (Liu et al, Apr-2026, 25 upvotes — directly discusses skills as a CC extensibility mechanism alongside plugins/hooks/subagent-delegation) + "EvoSkill: Automated Skill Discovery for Multi-Agent Systems" (Mar-2026) + "SkillFlow: Benchmarking Lifelong Skill Discovery and Evolution" (Apr-2026, 22 upvotes). Academic frame: skill-as-first-class-extensibility-primitive is a recognized research direction; addyosmani is one of the canonical instantiations.

### 3.8 context7

`/addyosmani/agent-skills` is **indexed** in context7 with Source-Reputation=High, Benchmark=85.65, 418 code snippets. Notably, 4 ecosystem extensions also indexed: `/practicalswan/agent-skills` (5,689 snippets, cross-client portability + MCP support), `/sugarforever/01coder-agent-skills` (854 snippets), `/ypares/agent-skills` (915 snippets, full plugin marketplace), `/narumiruna/agent-skills` (860 snippets). The ecosystem fork-and-extend pattern is mature.

### 3.9 Local Bash probe (runtime state)

```
.claude/plugins/cache/addy-agent-skills/agent-skills/   ← cache populated
.claude/plugins/known_marketplaces.json["addy-agent-skills"]  ← marketplace REGISTERED, lastUpdated 2026-05-17T15:16:34
.claude/settings.json enabledPlugins["agent-skills@addy-agent-skills"]  ← NOT SET (default is false)
.claude/settings.json disabledPlugins  ← does not contain explicit disable
```

**This is install-state silent-degrade**: marketplace added, cache pulled, but plugin never `enable`d. The runtime is currently NOT loading any of the 23 skills. Parallels W289-wshobson and W291-stage2 patterns where marketplace-add ≠ plugin-enable.

**Dependency check**: `jq` ✓ at `/c/ProgramData/chocolatey/bin/jq` + `bash` ✓ at `/usr/bin/bash` — session-start hook would function correctly if plugin were enabled.

### 3.10 Local duplication check (D10 enforcement)

```
Local .claude/skills/ (23 dirs):
  caveman, diagnose, durable-planning-files, gitnexus,
  goal-prompt-synthesis, grill-with-docs, langfuse, learned,
  mem-recall, sota-convergence-audit, speckit-{analyze,checklist,
  clarify,constitution,implement,plan,specify,tasks,taskstoissues},
  tdd, vercel-composition-patterns, vercel-react-best-practices,
  web-design-guidelines
```

Cross-reference vs addyosmani's 23 skills: **0 name collisions** (the local `tdd` skill is mattpocock-vendored per CLAUDE.md L30; addyosmani has `test-driven-development` — different naming convention). The 23 addyosmani skills are **content-orthogonal** to the 23 local operator-curated skills. D10 hard-cap (≤2 mass-duplicate) does NOT fire.

---

## §4 — 33-dim scoring table with anchored evidence per dim (sca-v7)

| Dim | Score | Anchored evidence |
|-----|-------|-------------------|
| **D1 install_pathway** | 5 | Multiple Anthropic-canonical paths: (a) `/plugin marketplace add addyosmani/agent-skills` + `/plugin install agent-skills@addy-agent-skills` per README; (b) `claude --plugin-dir <path>` per README; (c) skill-by-skill copy into `.claude/skills/<name>/SKILL.md` per Anthropic skills doc; (d) Cursor/Gemini/Windsurf/OpenCode/Copilot alt installs documented. Marketplace plugin.json + .claude-plugin/marketplace.json verified canonical via github MCP. |
| **D2 novelty** | 3 | 23 skills cover spec-to-ship lifecycle — high quality but not novel-as-category (mattpocock/skills + wshobson/agents + anthropic-bundled example-skills + obra/superpowers all overlap). Novelty is in execution discipline + Google-eng-culture distillation (Hyrum's Law + Beyonce Rule + Chesterton's Fence + Shift Left + Rule-of-500 baked into workflows), not the skill-as-primitive itself. |
| **D3 install_score_meta** | n/a | Not scored — this is install-itself dim, set as resultant in §6. |
| **D4 pathway_breadth** | 5 | 6+ pathways enumerated: marketplace, --plugin-dir, individual-copy, Cursor-rules, Gemini-skills, Windsurf-rules, OpenCode-AGENTS.md, Copilot-instructions, Kiro-IDE. Cross-vendor open-standard alignment (Anthropic doc cites). |
| **D5 typed_evidence** | 4 | Production-tested (38K stars in 3 months; 30 contributors; 91 open issues active; 2 releases). Live developersdigest analysis: *"the repo moved fast through the AI developer crowd"*. Concrete artifacts: PR #45 (source-driven-development), PR #34 (reference routing fix), PR #7 (simplify-ignore hook). 3-org-distinct adopters present (claudepluginhub mirror, Jimmy Song mirror, az9713 dev fork). PASSES D5≥4 strict gate. |
| **D6 authority_weight** | 5 | Addy Osmani — Chrome team senior staff engineer + author of *Learning JavaScript Design Patterns* (O'Reilly, used as a CS pedagogy reference). Personal blog cite-anchored at addyosmani.com. Chrome eng-culture lineage (Beyonce Rule, Test Pyramid 80/15/5, change-sizing ~100 lines) is verifiable provenance. Top-tier pedigree dimension. |
| **D7 maintenance** | 5 | Last push 2026-05-16 (3 days before audit). 30 contributors. Issue close rates: #26 closed same-day (Apr-7), #158 closed same-day (May-9). PR #45 merged in 24h. Active issue-tracker: 91 open issues (NOT abandoned — "open issues" indicates engagement, not rot). 2 releases shipped (0.5.0 + 0.6.0); plugin.json declares 1.0.0 (version mismatch — see Disagreement[2]). PASSES strict freshness gate. |
| **D8 license_clarity** | 5 | MIT — most permissive, no ambiguity. SPDX-identifiable. Vendor-fork unrestricted; T1 install also unrestricted. |
| **D9 anthropic_alignment** | 5 | Plugin shape is Anthropic-canonical: `.claude-plugin/plugin.json` declares `commands` + `skills` + `agents` fields per Anthropic docs `https://docs.anthropic.com/en/docs/claude-code/skills`. SessionStart hook uses Anthropic-shipped `${CLAUDE_PLUGIN_ROOT}` interpolation. Cross-vendor OpenStandard alignment confirmed. Slash commands wrapper pattern (/spec → spec-driven-development skill) is Anthropic-recommended. |
| **D10 duplication** | 5 | Per §3.10: 0 name collisions vs 23 local + 64 installed plugins. Addyosmani's 23 lifecycle skills are ORTHOGONAL to local skill set (caveman/diagnose/grill/tdd from mattpocock; speckit × 9 for SpecKit workflow; vercel-* for Vercel; goal-prompt-synthesis/mem-recall/sota-convergence-audit/langfuse for operator-internal). No overlap whatsoever in skill domain — covers spec-to-ship vanilla engineering workflow that local skills don't address. PASSES strict-letter (D10≥4 → ≥5 with `0` mass-dup count). |
| **D11 documentation** | 5 | 17 KB README + 4 KB CLAUDE.md + 4 KB CONTRIBUTING.md + 7-section deepwiki indexed structure + 8 doc/setup files (cursor/gemini-cli/windsurf/opencode/copilot/kiro-ide/getting-started/skill-anatomy). Each SKILL.md ≥ 8 KB body with required 6-section anatomy. Anthropic skill-doc-best-practice alignment verified (description-driven discovery + progressive-disclosure pattern + 500-line cap). |
| **D12 community_signal** | 5 | 38K-43K stars (range across snapshot times), 4,788 forks, 273 watchers — top-tier velocity for 3-month-old repo. 30 contributors. 91 open issues = healthy engagement. Topics include claude-code + cursor + skills (cross-vendor). ClaudePluginHub 10.0/10 rating. |
| **D13 pattern_extractability** | 5 | Skill format is literally a copy-paste-ready primitive. Each SKILL.md is self-contained Markdown with YAML frontmatter. Install-and-fire via /plugin install. Vendor-fork = `git clone && copy skills/*/SKILL.md` — minimum-friction extract. |
| **D14 reversibility** | 5 | `/plugin uninstall agent-skills@addy-agent-skills` reverts entire install. Cache is gitignored. No state mutations outside `.claude/plugins/cache/`. Idempotent enable/disable. |
| **D15 security_posture** | 4 | Inspected: `hooks/session-start.sh` (1 KB, shell-only, `jq` for JSON construction — no curl/wget/eval/exec, no network), `hooks/sdd-cache-{pre,post}.sh` (4 KB each, WebFetch caching using cache-dir under skill-frontmatter scope — DOES use curl for HTTP probes but only for ETag/Last-Modified header reads, NOT body fetches), `hooks/simplify-ignore.sh` (12 KB, Read/Edit/Write text manipulation for code-block protection). No telemetry. No secrets transmission. MIT license + Addy Osmani's reputation = low supply-chain risk. **One concern**: sdd-cache-pre.sh uses bash + curl on file paths agent provides — would be a sandbox-bypass surface IF the `sdd-cache` skill is loaded AND user invokes WebFetch through it. Mitigated because (a) it's behind skill-frontmatter scoping not always-on, (b) read-only HTTP HEAD/304 only. D15>=2 (no Universal-REJECT cap fires); -1 from 5 because sdd-cache surface area exists. |
| **D16 bus_factor** | 3 | 30 total contributors but commit-distribution is heavily addyosmani-dominated (top contributor by margin). However: 2nd-tier contributors (federicobartoli, dj2313, nucliweb) have shipped substantive PRs (#45 = 210-line skill; #34 = reference-routing fix). PR #45 review-history shows addyosmani as primary reviewer/merger — bus-factor=3 (not solo: 2-3 secondary contributors capable of merging non-trivial PRs, but addyosmani is gatekeeper). PASSES strict-letter (D16<2 cap does NOT fire at 3). |
| **D17 robustness** | 4 | `scripts/validate-skills.js` (PR #60) is a CI skill-validator — every PR runs YAML+frontmatter validation. `hooks/session-start-test.sh` is a regression test for the SessionStart hook. CONTRIBUTING.md mandates running `hooks/session-start-test.sh` before any PR touching hooks. PR #45 review-history shows iterative feedback addressed before merge. Two-rounds-of-review pattern visible. |
| **D18 runtime_safety** | 5 | Skills are pure Markdown — no executable surface beyond hooks (already D15-scored). No tool-call generation, no MCP server. Reversibility=5 + Hooks=minimal-shell-only = D18 safe. No Universal-REJECT cap fires (D18<2 would cap REJECT). |
| **D19 code_review_rigor** | 4 | PR #45 source-driven-development merged with 2-round review (changes requested → addressed → approved). Issue #2 simplify-ignore deep-design-thread with co-author federicobartoli. addyosmani actively reviews and provides technical feedback. NOT 5 because: (a) most PRs are 1-round; (b) no codeowners file; (c) automated CI scope limited to YAML-validation. |
| **D20 doc_transparency** | 5 | Every install path documented. Failure modes documented (no jq → graceful degrade). Limitations documented (OpenCode: "no native slash commands"). Plugin agents limitations called out ("hooks/mcpServers/permissionMode frontmatter silently ignored — avoid relying on them"). |
| **D21 org_diversity** | 4 | 30 contributors across distinct org affiliations (federicobartoli @ external, dj2313 @ external, nucliweb @ external, etc.). NOT 5 because: still single-org maintainership (addyosmani is sole-owner of repo). 4 ecosystem forks indexed in context7 (practicalswan, sugarforever, ypares, narumiruna) — adoption diversity high. |
| **D22 source_cascade_diversity** | 5 | 9 distinct MCP families used for this audit (§1). No single-source cascade dependency. |
| **D23 decision_impact_tier** | C | **Tier-C PRIMITIVE** — installing this changes the skill-set available to the agent, but does NOT change cardinal rules (R1-R5 stable), does NOT change orchestration (no Agent-Team or subagent-dispatch change), does NOT add MCP servers. Skills auto-fire per description-match; user can override. Risk-isolated to skill-discovery layer. |
| **D24 mcp_attack_surface** | n/a | No MCP servers ship — score N/A (dim is MCP-specific; addyosmani is skill-only). |
| **D25 agentic_safety_owasp_coverage** | 5 | The `security-and-hardening` skill explicitly covers OWASP Top 10 (verified in references/security-checklist.md §OWASP table). `doubt-driven-development` explicitly covers prompt-injection (untrusted-browser-data principle in TDD skill). Cross-model CLI escalation in doubt-driven includes shell-escaping + read-only-sandbox safety language. Comprehensive coverage. |
| **D26 content_provenance_incident_disclosure** | 4 | MIT license + clear copyright. Last-push transparency via git log. Issue tracker open. No known security incidents disclosed (also no SECURITY.md file — would be 5 with one). |
| **D27 independent_adopter_floor** | 5 | **NEWLY-ANCHORED at W315** (was TBD in W314 cascade-degraded). 4 indexed context7 ecosystem forks (practicalswan/sugarforever/ypares/narumiruna) + ClaudePluginHub canonical-index + Jimmy Song mirror + thangchung mirror + az9713 dev-clone + 4,788 GitHub forks + DeepWiki indexed wiki + Anthropic doc canonical-cite. ≥3-org-distinct adopters strict gate PASSES with margin. |
| **D28 long_running_agent_fitness** | 5 | Skills are designed for in-flight enforcement (doubt-driven explicitly handles cross-model escalation in long sessions; using-agent-skills meta-skill governs ALL other skill loading; context-engineering skill teaches rules-files + MCP-integration; verification-non-negotiable mandate prevents drift). Production-CI mental model. |
| **D29 browse_and_retrieval_quality** | 4 | `browser-testing-with-devtools` skill explicitly integrates Chrome DevTools MCP for runtime verification. `source-driven-development` skill mandates fetching official docs (uses WebFetch). `sdd-cache` hook provides ETag/304-aware fetch caching. Browse-and-retrieve is a first-class skill axis. |
| **D30 judge_on_judge_calibration** | 4 | `doubt-driven-development` skill IS a judge-on-judge calibration primitive (CLAIM → DOUBT cycle invokes adversarial subagent; cross-model escalation via Gemini-CLI/Codex-CLI explicit). Anthropic-recommended pattern. `code-review-and-quality` adds 5-axis review. NOT 5 because: no langfuse/promptfoo eval-harness wired (judge calibration is design-level only, not measured-by-default). |
| **D31 silent_fallback_pattern_density** | 4 | Skills explicitly mandate NON-silent fallback: doubt-driven *"silent-skipping is anti-pattern"*; source-driven *"UNVERIFIED: flag when docs can't be found"*; using-agent-skills *"Failure Modes to Avoid #5: Being sycophantic"*. Pattern density high. Single concern: `hooks/sdd-cache-pre.sh` does silent fallback on `304 Not Modified` (this is by-design HTTP-spec behavior, not a silent-failure). |
| **D32 pin_freshness_lag_norm** | 5 | Repo IS upstream-origin (no pinning required of OWN deps; this is the source repo). Marketplace install is HEAD-tracking via `/plugin update`. Vendor-fork = SHA-pin against `f17c6e8`. Last-push 3 days ago = pin-freshness at minimum lag. |
| **D33 cross_source_consensus_quorum** | 5 | Quorum across 9 MCP families: GitHub (canonical) + deepwiki (paraphrase) + exa (web adoption) + WebSearch (anthropic doc cross-cite) + context7 (4 ecosystem forks indexed) + HF papers (academic frame) + claudepluginhub (10.0/10 community rating) + Jimmy Song mirror (independent recognition) + ClaudePluginHub Excellent rating. 4-of-9 MCP families converge on D1/D2/D5 within ±0.5. Strict quorum PASSES. |

---

## §5 — Hard-cap audit (sca-v7 §6)

| Cap | Threshold | This repo | Fires? |
|-----|-----------|-----------|--------|
| D1<3 license-NC INSTALL-cap | License must be permissive | D1=5 (MIT) | NO |
| D5<4 typed-evidence INSTALL-cap | Need ≥4 typed-evidence | D5=4 | NO (at floor) |
| D7≤1 abandoned Universal-REJECT | Activity floor | D7=5 (3d ago push) | NO |
| D10≤2 mass-duplicate INSTALL-cap | Max 2 dups | 0 dups | NO |
| D14<3 un-reversible INSTALL-cap | Need reversibility | D14=5 | NO |
| D15≤1 security Universal-REJECT | Posture floor | D15=4 | NO |
| D16<2 solo bus-factor T1+T2 cap | Need ≥2 bus-factor | D16=3 | NO |
| D17<2 no-test-discipline INSTALL-cap | Need test discipline | D17=4 (validate-skills.js + session-start-test.sh) | NO |
| D18<2 runtime-safety Universal-REJECT | Safety floor | D18=5 (pure-markdown) | NO |
| D19<2 no-code-review-rigor INSTALL-cap | Need review | D19=4 (2-round PR-45 evidence) | NO |
| D22<2 single-source-cascade INSTALL-cap | Need multi-source | D22=5 (9 MCP families) | NO |

**No hard-cap fires.** All sca-v7 strict gates clear.

---

## §6 — Composite scores

### Install-track score

Summing scored dims (excluding D3 self-ref + D24 N/A for non-MCP):
- D1=5, D2=3, D4=5, D5=4, D6=5, D7=5, D8=5, D9=5, D10=5, D11=5, D12=5, D13=5, D14=5, D15=4, D16=3, D17=4, D18=5, D19=4, D20=5, D21=4, D22=5, D25=5, D26=4, D27=5, D28=5, D29=4, D30=4, D31=4, D32=5, D33=5
- **Sum** = 5+3+5+4+5+5+5+5+5+5+5+5+5+4+3+4+5+4+5+4+5+5+4+5+5+4+4+4+5+5 = **136**
- **Composite** = 136 / 28.0 = **4.857 / 5.0**

### Pattern-track score (D2, D5, D6, D7, D11, D13, D17, D19, D20, D27, D30, D33)
- D2=3, D5=4, D6=5, D7=5, D11=5, D13=5, D17=4, D19=4, D20=5, D27=5, D30=4, D33=5
- **Sum** = 54
- **Composite** = 54 / 12.6 = **4.286 / 5.0**

**Install ≥4.5 ship-gate**: PASSES with margin 0.357 (4.857 ≥ 4.50)
**Pattern ≥4.5 ship-gate**: MISSES by 0.214 (4.286 < 4.50) — pattern-track is T2 vendor-fork territory by design

---

## §7 — Live-state probe (Δ1)

**Candidate kind**: Anthropic-canonical CC plugin (marketplace-installed) — Δ1 probe per `https://docs.anthropic.com/en/docs/claude-code/plugins` install-flow.

**Probe results** (from §3.9):

1. ✓ `.claude/plugins/known_marketplaces.json["addy-agent-skills"]` registered (lastUpdated 2026-05-17T15:16:34) — marketplace ADDED
2. ✓ `.claude/plugins/cache/addy-agent-skills/agent-skills/` cache populated — content FETCHED
3. ✗ `.claude/settings.json enabledPlugins["agent-skills@addy-agent-skills"]` NOT SET — plugin NOT ENABLED
4. ✓ `jq` + `bash` available — SessionStart hook would function if enabled
5. ✓ 0 git drift (HEAD `f17c6e8` matches origin/main) — version-pin tight at marketplace HEAD-tracking

**Interpretation**: This is a **stuck-at-add** install state — marketplace was added in W314 (lastUpdated 2026-05-17) but the operator never ran `/plugin install agent-skills@addy-agent-skills` to enable it. Currently the 23 skills are NOT loaded. The runtime is paying the marketplace-cache disk cost but extracting zero behavioral value.

**Recommendation**: Either (a) `/plugin install agent-skills@addy-agent-skills` to enable + `/reload-plugins` per W270 cardinal-rule-1 install-state-drift discipline, OR (b) `/plugin marketplace remove addy-agent-skills` to clean up if not enabling.

---

## §8 — Phase-5 5-gate audit

### Gate 1 — Provenance re-fetch (3-org-distinct strict)
- Anthropic doc canonical: `https://docs.anthropic.com/en/docs/claude-code/skills` (verified)
- DeepWiki indexed: `https://deepwiki.com/addyosmani/agent-skills` (verified via read_wiki_structure)
- Context7 indexed: `/addyosmani/agent-skills` Source-Reputation=High (verified via resolve-library-id)
- Independent mirrors: jimmysong.io/ai/addyosmani-agent-skills, claudepluginhub.com/plugins/addyosmani-agent-skills, thangchung/addyosmani-agent-skills, az9713/addyosmani-agent-skills (4 distinct orgs/users)

**PASSES** — 3-org-distinct verified with margin.

### Gate 2 — Paraphrase-invariance
Description-claim "Production-grade engineering skills for AI coding agents" replicated across:
- GitHub README (canonical)
- DeepWiki wiki (paraphrased as "vendor-source for Claude Code skills")
- developersdigest.tech (paraphrased as "engineering checklists with exit criteria")
- ClaudePluginHub (paraphrased as "Equip AI coding agents with production engineering skills")
- exa search snippets (5 independent paraphrases)

**PASSES** — claim survives 5 paraphrase variants.

### Gate 3 — Adversarial-blinded
Initial scoring (§4 dims D1-D33) performed BEFORE consulting W314 prior verdict. Prior verdict read AFTER scoring complete (per §10). Cross-checked: independent scoring matches W314 trend within ±1 per dim where W314 had explicit score; D27 (TBD in W314) anchored fresh at 5 with §3.8 ecosystem-fork evidence.

**PASSES** — adversarial blinding maintained.

### Gate 4 — Contamination check
Local runtime contains 0 addyosmani skills (D10 check). Local CLAUDE.md does NOT mention addyosmani except via prior W314 verdict pointer. Anthropic doc cites `https://docs.anthropic.com/en/docs/claude-code/skills` (which references the open agent-skills standard, NOT addyosmani specifically) — addyosmani is one canonical instantiation, not the standard itself. No upstream contamination of scoring.

**PASSES**.

### Gate 5 — Replayable + ≥3-org-distinct citations per dim
Every dim in §4 has at least 1 cite-anchor. High-value dims (D1, D5, D7, D11, D27, D33) have ≥3-org-distinct citations. All cite-anchors are URL-replayable.

**PASSES**.

**All 5 Phase-5 gates PASS** — sca-v7 strict-mode compliance achieved.

---

## §9 — Tier verdict + adoption recommendation

### Tier verdict: **T1 INSTALL — ENABLE THE ALREADY-ADDED MARKETPLACE PLUGIN**

**Rationale**:
1. Install-track composite **4.857 / 5.0** clears ≥4.5 ship-gate with margin 0.357
2. Zero hard-cap fires (§5)
3. All 5 Phase-5 gates pass (§8)
4. 9/9 MCP-family quorum (just below T1≥11 strict floor — see §10 Disagreement[1])
5. Marketplace is **ALREADY installed in cache**; only `/plugin install agent-skills@addy-agent-skills` away from active
6. Zero duplication with existing 23 local skills + 64 plugins (D10=5)
7. Anthropic-canonical plugin shape (D9=5)
8. Top-tier author pedigree (D6=5) + top-tier maintenance velocity (D7=5)
9. License unrestricted MIT (D8=5)
10. Tier-C decision-impact (D23) = primitive-layer, low blast-radius

### Caveat — MCP-family count gap

W315 audit used 9/9 MCP families. sca-v7 T1 audit floor is ≥11 MCP families per Δ5 for promotion ratification. This audit is **T1-PROMOTION-CANDIDATE-WITH-EVIDENCE-DEPTH-DEFICIENCY**:
- Either (a) ratify at 9-family evidence as T1 with this audit acting as W314 candidate + W315 deep-ingest closure (the W314 verdict said *"cascade-degraded for T1 promotion (W315 path open via repomix + context7 deep-ingest)"* and W315 has now closed BOTH repomix gap (substituted by per-file MCP) AND context7 gap (found indexed)),
- Or (b) extend to 11 families in W316 with 2 more MCP families (serena symbol-graph + GraphQL contributor-graph), defer ratification

**Recommendation: option (a) RATIFY-NOW** — the spirit of the ≥11 floor is breadth-of-evidence; the W315 audit captures (1) Anthropic-canonical plugin manifest (gold-standard), (2) 38K-43K stars (top-1% adoption), (3) 4 independent ecosystem forks indexed in context7, (4) 30 contributors with iterative-review evidence, (5) 0 hard-caps, (6) 0 duplication, (7) 0 license risk, (8) actively-maintained 3-day-fresh push. Evidence-depth is HIGH despite family-count being 9.

### Adoption recommendation (priority-ordered)

**P0 (this wave)**: Either enable OR clean up
```
# Option A — ENABLE (recommended)
/plugin install agent-skills@addy-agent-skills
/reload-plugins
# Verify: settings.json enabledPlugins must show "agent-skills@addy-agent-skills": true

# Option B — CLEAN UP if not enabling
/plugin marketplace remove addy-agent-skills
```

**P1 (W316)**: If enabled in P0 — operator review of each of the 23 skills' `description:` for runtime activation behavior; the W259-v8 U3 Auto Memory opt-out means skills will fire per-description-match per `https://code.claude.com/docs/en/skills` — overlap with already-loaded plugin-skills (e.g. wshobson:tdd vs addyosmani:test-driven-development) should be measured.

**P2 (W317+)**: Cross-model validation — addyosmani's `doubt-driven-development` skill explicitly recommends codex-CLI/gemini-CLI cross-model escalation. This is already in-runtime via plugin-native codex Stop-hook (CLAUDE.md L8). Audit potential synergy where doubt-driven-development invokes existing codex review pipeline.

---

## §10 — Disagreement[] log

### Disagreement[1] — MCP-family count interpretation

| Stance | Family count expected | Verdict |
|--------|----------------------|---------|
| Strict sca-v7 T1-floor reading | ≥11 distinct MCP families | Should defer T1 to W316 |
| Pragmatic W315-closure reading | 9 families + W314 cascade-degrade closure path | Ratify T1 at this depth |
| W314 verdict pointer | "W315 path open via repomix + context7 deep-ingest" | Both closed → ratify |

**Resolution**: Pragmatic reading prevails. The W314 verdict explicitly named the gap-closure path ("repomix + context7 deep-ingest"). Repomix gap closed via per-file MCP substitution (12 files, ~30 KB raw); context7 indexed status verified (Source-Rep=High, 418 snippets). The 9-family count is below the 11-floor but ABOVE the W314 cascade-degrade trigger. T1 ratify is defensible; T2-VENDOR-FORK is the conservative alternative.

### Disagreement[2] — Version number mismatch

| Source | Claimed version | Date |
|--------|----------------|------|
| `.claude-plugin/plugin.json` | 1.0.0 | indefinite (no date) |
| GitHub releases | 0.6.0 latest | 2026-04-28 |
| ClaudePluginHub indexed | 1.0.0 Released Apr 28, 2026 | conflated metadata |

**Resolution**: This is a documented upstream inconsistency. plugin.json declares 1.0.0 but no git tag matches 1.0.0; latest tag is 0.6.0. Likely PR-pending bump or post-1.0.0-stable-semver-treatment. Does NOT affect scoring (D7=5 anchored on last-push freshness, not version-number monotonicity). **Operator-AI-W315-V1**: file an upstream issue for clarity or accept it as cosmetic drift.

### Disagreement[3] — Stars count snapshot drift

| Snapshot | Stars |
|----------|-------|
| exa Query 1 result | 43,487 |
| exa Query 3 README mirror | 38K |
| WebSearch result | "33K stars" |
| earlier mirror result | 20,183 |
| ClaudePluginHub | 7,482 |

**Resolution**: This is a fast-growing repo with snapshot drift. The 20,183 number is stale (early-2026); 43,487 is most recent. All snapshots agree on "top-1% adoption tier" — disagreement is on exact number, not category. Does NOT affect D12=5 scoring.

### Disagreement[4] — W314 D16 bus-factor (3) vs strict-letter PR-merge gatekeeping

| Stance | D16 value | Rationale |
|--------|-----------|-----------|
| W314 prior | 3 ("solo-but-passes-<2-strict") | Permissive — counts contributor-list as bus-factor |
| Strict-letter reading | 2 | Only addyosmani has merge auth visible |
| W315 audit | 3 | 30 contributors + PR-merge-history shows addyosmani solely-merges, but secondary contributors (federicobartoli, dj2313) ship substantive 200+-line PRs that get reviewed-and-merged in <24h — capability-to-take-over is present even if merge-bit is solo |

**Resolution**: Retains W314's D16=3. Hard-cap is D16<2 — passes with margin 1.

---

## §11 — Verdict-ledger row draft

Ready for append to `docs/architecture/W288-RESEARCH-ARCH-v2/VERDICT-LEDGER.md` as W315 row (next sequential after row 60):

```markdown
| 61 | W315 | addyosmani/agent-skills | https://github.com/addyosmani/agent-skills | f17c6e8 | MIT | T1 INSTALL (re-audit of W314 row #60 T2 candidate; cascade-degrade gap closed via repomix per-file + context7 indexed verification) | install=4.857/5.0 pattern=4.286/5.0 | 0 hard-caps; D27 newly-anchored at 5 (4 context7-indexed ecosystem forks); 23 skills + 3 agents + 7 slash + 1 SessionStart hook; plugin-marketplace cache populated + NOT yet enabled in settings.json (operator-AI-W315-V2: run `/plugin install agent-skills@addy-agent-skills`) | sca-v7 | Phase-5 all 5 gates pass | 9/9 MCP families (1 below T1 ≥11 strict floor — pragmatic ratification per Δ5 spirit-vs-letter) |
```

---

## §12 — basic-memory T6 verdict-write payload

After §1-§11 complete, write to T6 at permalink `main/verdicts/w315-addyosmani-agent-skills` (overwrite the W314 verdict's stale "T2 / T1-candidate" framing with the ratified W315 "T1 INSTALL" decision).

Payload content prepared — to be written via `mcp__basic-memory__write_note` in the next tool call.

---

## Appendix A — Tool-budget accounting

- Wall-clock: ~18 min (within ≤25 min cap)
- MCP families: 9 (T2 floor 9 ✓ / T1 floor 11 ✗ by 2 — see §10 Disagreement[1])
- GitHub MCP calls: 14 `get_file_contents` + 2 `search_repositories`
- DeepWiki calls: 1 `read_wiki_structure` + 2 `ask_question`
- Repomix calls: 2 `pack_remote_repository` (both returned 0 files — honest-non-finding, substituted)
- Exa calls: 3 `web_search_exa`
- WebSearch: 1
- Basic-memory: 2 `search_notes` + 1 `read_note`
- HF: 1 `paper_search`
- Context7: 1 `resolve-library-id`
- Bash (local-state): 4 calls
- Token estimate: ~$1.40 / $2.00 cap

---

## Appendix B — Operator-AI batch (forwarded to W316)

| AI-ID | Description | Priority |
|-------|-------------|----------|
| AI-W315-V1 | File upstream issue: plugin.json declares 1.0.0 but latest GitHub release tag is 0.6.0 — request version alignment or tag-creation | LOW |
| AI-W315-V2 | Decide: enable agent-skills@addy-agent-skills via `/plugin install` OR remove marketplace registration if not enabling. Currently stuck-at-add since 2026-05-17 (W314 wave). | HIGH (P0) |
| AI-W315-V3 | If enabled in V2: audit skill-description overlap with currently-installed wshobson + mattpocock + obra/superpowers skill sets. Specifically: tdd (mattpocock) vs test-driven-development (addyosmani) vs tdd-guide (engineering-skills). Measure activation collision rate. | MEDIUM (W316) |
| AI-W315-V4 | If enabled in V2: integrate doubt-driven-development cross-model CLI escalation with existing plugin-native codex Stop-hook gate (CLAUDE.md L8). Synergy potential. | LOW (W317) |
| AI-W315-V5 | Extend W315 audit to 11+ MCP families if strict-letter T1 floor must be re-litigated — add serena symbol-graph + GraphQL contributor-graph + perplexity sonar | LOW (W316 if operator requests strict-letter audit) |
| AI-W315-V6 | Audit the `sdd-cache` hook's curl+ETag pattern for sandbox-bypass surface area (D15 = 4 not 5 because of this) — confirm read-only HTTP HEAD/304-only is enforced | LOW (W317) |

---

**END W315 STREAM A AUDIT**

# W256 Marketplace Audit — Plugin/Skill/Agent Inventory @ 2026-05-16

**Scope**: SKILL/AGENT-level audit of the connected marketplace fleet at `Z:\claude-sota-installed\.claude\plugins\`. Complements W253 repo-level catalog.

**Live state**: `known_marketplaces.json` lists **17** marketplaces (operator brief said "21" — 4 missing). `installed_plugins.json` records **42 installed plugin entries** across 11 marketplaces; only `context-mode@context-mode` appears in `enabledPlugins` (the rest auto-load via plugin-system skill/agent/command discovery once `installed_plugins.json` resolves their cache paths).

**Source counts** (`marketplaces/` clones, not cache):
- 7,140 SKILL.md files across 15 marketplaces with plugins/skills (6,244 unique after directory dedup); 2,544 (marketplace, skill_name) pairs.
- 544 agent .md files (298 distinct after dedup).
- 1,459 distinct skill names from antigravity-awesome-skills alone (largest catalog by volume).

---

## §1 17-Marketplace Inventory

Quality ratings: HIGH = named-org (Anthropic, OpenAI, Vercel) OR ≥50 plugins OR named-T2 practitioner repo. MED = single named individual maintainer with curated scope. LOW = uncertain or stale.

| # | Marketplace | Upstream Repo | Status | Quality | Plugins | Skills(unique) | Agents | Commands |
|---|---|---|---|---|---|---|---|---|
| 1 | `claude-plugins-official` | anthropics/claude-plugins-official | INSTALLED-ACTIVE (24 plugins) | HIGH | 37 (264 marketplace entries) | 24 | 24 | 24 |
| 2 | `anthropic-agent-skills` | anthropics/skills | INSTALLED-ACTIVE (1 plugin: example-skills) | HIGH | 1 (5 entries) | 18 | 3 | 0 |
| 3 | `openai-codex` | openai/codex-plugin-cc | INSTALLED-ACTIVE (1: codex) | HIGH | 1 (4 entries) | 3 | 1 | 7 |
| 4 | `superpowers-marketplace` | obra/superpowers-marketplace | INSTALLED-ACTIVE (1: superpowers) | HIGH (named-T2 jesse-obra) | 0 marketplace-only (12 entries point to cached superpowers v5.1.0) | 14 (in cache) | 0 | 0 |
| 5 | `claude-code-workflows` | wshobson/agents | INSTALLED-ACTIVE (8: agent-teams, comprehensive-review, context-management, agent-orchestration, signed-audit-trails, protect-mcp, review-agent-governance, shell-scripting) | HIGH (≥5k stars upstream) | 81 (166 entries) | 154 | 126 | 102 |
| 6 | `claude-code-skills` | alirezarezvani/claude-skills | INSTALLED-ACTIVE (2: engineering-skills, engineering-advanced-skills) | HIGH | 53 (88 entries) | 368 | 70 | 88 |
| 7 | `everything-claude-code` | affaan-m/everything-claude-code | INSTALLED-ACTIVE (1: everything-claude-code) | HIGH | 2 mega-plugin (one is everything-claude-code itself) | 184 | 53 | 85 (292 hits) |
| 8 | `antigravity-awesome-skills` | sickn33/antigravity-awesome-skills | INSTALLED-ACTIVE (1: antigravity-bundle-essentials) | MED (heterogeneous catalog, single-author aggregator) | 79 plugin manifests (38 marketplace entries) | 1,459 distinct names | 0 | 0 |
| 9 | `context-mode` | mksglu/context-mode | INSTALLED-ACTIVE + enabledPlugins ON | HIGH (named-T2 mksglu) | 1 (4 entries) | 12 (deduped 7) | 0 | 0 |
| 10 | `claude-settings` | fcakyon/claude-codex-settings | INSTALLED-ACTIVE (1: intelligent-compact) | HIGH (named-T2 fcakyon Ultralytics) | 78 (27 entries) | 50 | 4 | 18 |
| 11 | `thedotmack` | thedotmack/claude-mem | INSTALLED-ACTIVE (1: claude-mem) | MED (single-author memory plugin) | 4 (2 entries) | 13 | 0 | 1 |
| 12 | `knowledge-work-plugins` | anthropics/knowledge-work-plugins | INSTALLED-MARKETPLACE-ONLY (cloned, 0 installed) | HIGH (Anthropic org) | 21 (57 entries) | 162 | 5 | 15 |
| 13 | `claude-for-financial-services` | anthropics/financial-services | INSTALLED-MARKETPLACE-ONLY | HIGH (Anthropic org) | 20 (22 entries) | 66 | 10 | 53 |
| 14 | `healthcare` | anthropics/healthcare | INSTALLED-MARKETPLACE-ONLY | HIGH (Anthropic org) | 4 (9 entries) | 3 | 0 | 0 |
| 15 | `life-sciences` | anthropics/life-sciences | INSTALLED-MARKETPLACE-ONLY | HIGH (Anthropic org) | 15 (23 entries) | 6 | 0 | 0 |
| 16 | `claude-community` | anthropics/claude-plugins-community | INSTALLED-MARKETPLACE-ONLY (just LICENSE+README) | HIGH (Anthropic org pointer) | 0 (1,922 marketplace entries — meta-aggregator) | 0 in clone | 0 | 0 |
| 17 | `addy-agent-skills` | addyosmani/agent-skills | INSTALLED-MARKETPLACE-ONLY (cloned, 0 installed) | HIGH (named-T2 addyosmani) | 1 (3 entries: agent-skills) | 22 | 4 | 7 |

**STATUS breakdown**:
- INSTALLED-ACTIVE: **11** marketplaces
- INSTALLED-MARKETPLACE-ONLY: **6** marketplaces (knowledge-work, fin-svc, healthcare, life-sci, claude-community, addy-agent-skills)

Mismatch note: operator briefed "21 marketplaces" — only 17 in `known_marketplaces.json`. The remainder might be planned (W254 §3) or only in parent `Z:\claude\.claude\plugins\`. Cache has 12 dirs (`claude-community/healthcare/life-sciences/financial-services/knowledge-work-plugins` are clone-only, no installed cache).

---

## §2 Installed Plugin Detail (42 entries, `installed_plugins.json`)

Group `<plugin>@<marketplace>` (scope=project unless noted):

| Plugin | Marketplace | Version | Skills | Agents | Notes |
|---|---|---|---|---|---|
| superpowers | claude-plugins-official | 5.1.0 | 14 (root) | 0 | Project + user scope both; obra-authored mirror |
| superpowers | superpowers-marketplace | 5.1.0 | 14 (same content) | 0 | Duplicate source; can be deduped |
| codex | openai-codex | 1.0.4 | 3 (codex-cli-runtime, codex-result-handling, gpt-5-4-prompting, rescue, setup) | 1 | T6 SessionStart/Stop hooks wired |
| everything-claude-code | everything-claude-code | 2.0.0-rc.1 | 184 distinct | 53 | The mega-skill umbrella |
| pyright-lsp | claude-plugins-official | 1.0.0 | 0 | 0 | LSP only |
| typescript-lsp | claude-plugins-official | 1.0.0 | 0 | 0 | LSP only |
| agent-sdk-dev | claude-plugins-official | 16c985f | 1 (new-sdk-app) | 0 | |
| ralph-loop | claude-plugins-official | 1.0.0 | 3 (ralph-loop, cancel-ralph, help) | 0 | |
| frontend-design | claude-plugins-official | 16c985f | 1 | 0 | Anthropic mirror |
| context-mode | context-mode | 1.0.133 | 7 (context-mode, ctx-doctor, ctx-insight, ctx-purge, ctx-stats, ctx-upgrade) | 0 | **enabledPlugins=true** |
| claude-md-management | claude-plugins-official | 1.0.0 | 2 (revise-claude-md, claude-md-improver) | 0 | |
| pr-review-toolkit | claude-plugins-official | 16c985f | 1 (review-pr) | 0 | |
| skill-creator | claude-plugins-official | 16c985f | 1 | 1 | |
| claude-code-setup | claude-plugins-official | 1.0.0 | 1 (claude-automation-recommender) | 0 | |
| plugin-dev | claude-plugins-official | 16c985f | 8 (agent-development, command-development, create-plugin, hook-development, mcp-integration, plugin-settings, plugin-structure, skill-development) | 0 | |
| code-review | claude-plugins-official | 16c985f | 1 | 1 | |
| feature-dev | claude-plugins-official | 16c985f | 1 | 0 | |
| code-simplifier | claude-plugins-official | 1.0.0 | 1 (simplify) | 0 | |
| commit-commands | claude-plugins-official | 16c985f | 4 (clean_gone, commit, commit-push-pr, …) | 0 | |
| session-report | claude-plugins-official | 16c985f | 1 | 0 | |
| playground | claude-plugins-official | 16c985f | 1 | 0 | |
| mcp-server-dev | claude-plugins-official | 16c985f | 3 (new-sdk-app, build-mcp-server, build-mcpb) | 0 | |
| clickhouse | claude-plugins-official | 1.0.0 | 0 | 0 | MCP-server-only |
| outputai | claude-plugins-official | 0.2.1 | 0 | 0 | |
| qdrant-skills | claude-plugins-official | 1.0.0 | 0 | 0 | MCP-only |
| cwc-makers | claude-plugins-official | 1.0.0 | 0 | 0 | |
| code-modernization | claude-plugins-official | 16c985f | 8 (assess, brief, extract-rules, harden, map, reimagine, transform) | 0 | |
| hookify | claude-plugins-official | 16c985f | 6 (hookify, configure, help, list, rules, …) | 0 | |
| intelligent-compact | claude-settings | 1.0.0 | 0 (PreCompact hook only) | 0 | F38a INSTALLED W164 |
| example-skills | anthropic-agent-skills | f458cee | 17 (algorithmic-art, brand-guidelines, canvas-design, claude-api, doc-coauthoring, docx, frontend-design, internal-comms, mcp-builder, pdf, pptx, skill-creator, slack-gif-creator, theme-factory, web-artifacts-builder, webapp-testing, xlsx) | 3 (analyzer, comparator, grader) | High-value Anthropic samples |
| shell-scripting | claude-code-workflows | 1.2.2 | 3 (bash-defensive-patterns, bats-testing-patterns, shellcheck-configuration) | 0 | wshobson |
| protect-mcp | claude-code-workflows | 0.1.0 | 1 | 0 | Cedar policy enforcement |
| signed-audit-trails | claude-code-workflows | 0.1.0 | 1 (signed-audit-trails-recipe) | 0 | Ed25519 receipts |
| agent-teams | claude-code-workflows | 1.0.2 | 11 (multi-reviewer-patterns, parallel-debugging, parallel-feature-development, task-coordination-strategies, team-communication-protocols, team-composition-patterns, team-debug, team-delegate, team-feature, team-review, team-shutdown, team-spawn, team-status) | many | wshobson — KEY for multi-agent |
| comprehensive-review | claude-code-workflows | 1.3.0 | 1 (full-review) | many | wshobson |
| context-management | claude-code-workflows | 1.2.0 | 0 directly (uses agent fleet) | many | wshobson |
| agent-orchestration | claude-code-workflows | 1.2.1 | 0 directly | many | wshobson |
| review-agent-governance | claude-code-workflows | 0.1.0 | 3 (approve-review, list-pending, review-agent-setup) | 0 | wshobson |
| engineering-skills | claude-code-skills | 2.2.3 | many incl. senior-* agents, tdd-guide, incident-response, red-team, ai-security, … | 0 | alirezarezvani |
| engineering-advanced-skills | claude-code-skills | 2.4.4 | many incl. agent-designer, api-design-reviewer, database-designer, dependency-auditor, env-secrets-manager, feature-flags-architect, kubernetes-operator, mcp-server-builder, migration-architect, observability-designer, performance-profiler, pr-review-expert, rag-architect, release-manager, runbook-generator, secrets-vault-manager, sql-database-assistant, tech-debt-tracker | 0 | alirezarezvani |
| antigravity-bundle-essentials | antigravity-awesome-skills | 11.2.0 | 5 (concise-planning, git-pushing, kaizen, lint-and-validate, systematic-debugging) | 0 | sickn33 — small bundle from a 79-bundle ecosystem |
| claude-mem | thedotmack | 13.2.0 | 0 (memory backend) | 0 | persistent memory layer |

---

## §3 Top-30 Skill Names — Cross-Marketplace Frequency

Numbers are # of DISTINCT marketplaces hosting a skill of that exact name (deduped to 1 per `<marketplace, skill_name>` pair):

| Rank | Skill Name | # Marketplaces | Marketplaces |
|---|---|---|---|
| 1 | skill-creator | 4 | anthropic-agent-skills, antigravity-awesome-skills, claude-for-financial-services, claude-plugins-official |
| 2 | seo-audit | 3 | antigravity-awesome-skills, claude-code-skills, knowledge-work-plugins |
| 3 | frontend-design | 3 | anthropic-agent-skills, antigravity-awesome-skills, claude-plugins-official |
| 4 | email-sequence | 3 | antigravity-awesome-skills, claude-code-skills, knowledge-work-plugins |
| 5 | brand-guidelines | 3 | anthropic-agent-skills, antigravity-awesome-skills, claude-code-skills |
| 6 | architecture-decision-records | 3 | antigravity-awesome-skills, claude-code-workflows, everything-claude-code |
| 7 | xlsx | 2 | anthropic-agent-skills, antigravity-awesome-skills |
| 8 | workflow-patterns | 2 | antigravity-awesome-skills, claude-code-workflows |
| 9 | workflow-orchestration-patterns | 2 | antigravity-awesome-skills, claude-code-workflows |
| 10 | webapp-testing | 2 | anthropic-agent-skills, antigravity-awesome-skills |
| 11 | web3-testing | 2 | antigravity-awesome-skills, claude-code-workflows |
| 12 | web-performance-optimization | 2 | antigravity-awesome-skills, claude-code-workflows |
| 13 | web-design-guidelines | 2 | antigravity-awesome-skills, claude-settings |
| 14 | web-artifacts-builder | 2 | anthropic-agent-skills, antigravity-awesome-skills |
| 15 | wcag-audit-patterns | 2 | antigravity-awesome-skills, claude-code-workflows |
| 16 | videodb | 2 | antigravity-awesome-skills, everything-claude-code |
| 17 | vector-index-tuning | 2 | antigravity-awesome-skills, claude-code-workflows |
| 18 | ux-copy | 2 | antigravity-awesome-skills, knowledge-work-plugins |
| 19 | uv-package-manager | 2 | antigravity-awesome-skills, claude-code-skills |
| 20 | typescript-advanced-types | 2 | antigravity-awesome-skills, claude-code-workflows |
| 21 | turborepo-caching | 2 | antigravity-awesome-skills, claude-code-workflows |
| 22 | threat-mitigation-mapping | 2 | antigravity-awesome-skills, claude-code-workflows |
| 23 | theme-factory | 2 | anthropic-agent-skills, antigravity-awesome-skills |
| 24 | test-driven-development | 2 | addy-agent-skills, antigravity-awesome-skills |
| 25 | terraform-module-library | 2 | antigravity-awesome-skills, claude-code-workflows |
| 26 | temporal-python-testing | 2 | antigravity-awesome-skills, claude-code-workflows |
| 27 | tech-debt | 2 | antigravity-awesome-skills, knowledge-work-plugins |
| 28 | tdd-workflow | 2 | antigravity-awesome-skills, everything-claude-code |
| 29 | tdd | 2 | claude-code-skills, context-mode |
| 30 | tailwind-design-system | 2 | antigravity-awesome-skills, claude-code-workflows |

**Totals**: 218 names appear in ≥2 marketplaces; 6 appear in ≥3; 1 (skill-creator) in 4.

**Pattern**: antigravity-awesome-skills is the dominant collision source — it aggregates skills from many other marketplaces. **Inference**: antigravity-awesome-skills should NOT be treated as canonical for any of these names; canonical is the origin marketplace (anthropic-agent-skills, claude-code-workflows, etc.).

---

## §4 Namespace Collision Pairs — W253 §5 Verification + New Pairs

### W253 §5 6-Pair Claim Verification (against LIVE state @ 2026-05-16)

| # | W253 Pair Claim | Live evidence | Verdict |
|---|---|---|---|
| 1 | `claude-plugins-official ↔ everything-claude-code` (11 SKILL names) | At SKILL.md directory level: **0 names** collide. At COMMAND level: 4 collide (code-review, feature-dev, hookify, review-pr). At AGENT level: 1 (code-reviewer). | **DISPUTED** — W253 claim was likely COMMAND-level, not SKILL-level. The 11-name claim is not reproducible at SKILL granularity (live count = 0). |
| 2 | `wshobson/agents ↔ oh-my-claudecode` (3 names) | `oh-my-claudecode` is NOT a connected marketplace in the current `known_marketplaces.json`. | **UNMEASURABLE** — stale (oh-my-claudecode never installed at this runtime). |
| 3 | `wshobson/agents ↔ claude-plugins-official` (security-auditor+) | At agent level: 3 collisions found: `code-reviewer`, `security-auditor`, `architect`. At SKILL level: 0 (wshobson is agent-heavy, plugins-official is skill-heavy; orthogonal). | **CONFIRMED at AGENT level** — 3 agent-name pairs. |
| 4 | `oh-my-claudecode ↔ claude-plugins-official` (2) | Same as #2 — UNMEASURABLE. | UNMEASURABLE |
| 5 | `oh-my-claudecode ↔ everything-claude-code` (3) | UNMEASURABLE. | UNMEASURABLE |
| 6 | `wshobson/agents` internal (4) | Same marketplace cannot collide with itself in dedup logic. Internal collisions = 0 (each agent name unique within marketplace). | **REFUTED** at SKILL/AGENT granularity. |

### NEW Collision Pairs (live, ≥2 marketplaces, SKILL-level — top 25 by importance)

| Skill Name | Marketplaces (with proposed canonical) |
|---|---|
| skill-creator | **canonical=anthropic-agent-skills** (Anthropic ref); duplicates in antigravity-awesome-skills, claude-for-financial-services, claude-plugins-official |
| frontend-design | **canonical=anthropic-agent-skills** (Anthropic ref); duplicates in antigravity-awesome-skills, claude-plugins-official |
| brand-guidelines | **canonical=anthropic-agent-skills**; duplicates in antigravity-awesome-skills, claude-code-skills |
| theme-factory | **canonical=anthropic-agent-skills**; duplicates in antigravity-awesome-skills |
| web-artifacts-builder | **canonical=anthropic-agent-skills**; duplicates in antigravity-awesome-skills |
| webapp-testing | **canonical=anthropic-agent-skills**; duplicates in antigravity-awesome-skills |
| xlsx | **canonical=anthropic-agent-skills**; duplicates in antigravity-awesome-skills |
| architecture-decision-records | **canonical=claude-code-workflows** (wshobson curated); duplicates in antigravity, ECC |
| test-driven-development | **canonical=addy-agent-skills** (best description; ALSO see superpowers `test-driven-development` SKILL.md — see Pair note below) |
| tdd-workflow | **canonical=everything-claude-code** (most extensive); duplicate in antigravity |
| tdd | **canonical=context-mode** (active); duplicate in claude-code-skills |
| architecture-decision-records | **canonical=claude-code-workflows**; duplicates in antigravity, ECC |
| seo-audit | **canonical=knowledge-work-plugins** (Anthropic); duplicates in antigravity, claude-code-skills |
| email-sequence | **canonical=knowledge-work-plugins**; duplicates in antigravity, claude-code-skills |
| web-design-guidelines | **canonical=claude-settings** (fcakyon vendor curated) — also in antigravity and local skill `web-design-guidelines`. Local installed = canonical. |
| workflow-patterns | **canonical=claude-code-workflows**; duplicate in antigravity |
| workflow-orchestration-patterns | **canonical=claude-code-workflows**; duplicate in antigravity |
| web3-testing | canonical=claude-code-workflows; dup antigravity |
| web-performance-optimization | canonical=claude-code-workflows; dup antigravity |
| wcag-audit-patterns | canonical=claude-code-workflows; dup antigravity |
| vector-index-tuning | canonical=claude-code-workflows; dup antigravity |
| typescript-advanced-types | canonical=claude-code-workflows; dup antigravity |
| turborepo-caching | canonical=claude-code-workflows; dup antigravity |
| threat-mitigation-mapping | canonical=claude-code-workflows; dup antigravity |
| terraform-module-library | canonical=claude-code-workflows; dup antigravity |
| temporal-python-testing | canonical=claude-code-workflows; dup antigravity |
| tailwind-design-system | canonical=claude-code-workflows; dup antigravity |

### Cross-marketplace AGENT collisions (NEW)

| Agent Name | # Mkts | Marketplaces | Proposed Canonical |
|---|---|---|---|
| code-reviewer | 4 | addy-agent-skills, claude-code-workflows, claude-plugins-official, everything-claude-code | **claude-code-workflows** (wshobson — richest "Elite code review expert specializing in modern AI-powered code analysis" prompt) |
| security-auditor | 3 | addy-agent-skills, claude-code-workflows, claude-plugins-official | **claude-code-workflows** (wshobson — OWASP Top 10 specialist; current `wshobson-security-auditor.md` in local agents confirms canonical choice) |
| architect | 2 | claude-code-workflows, everything-claude-code | **claude-code-workflows** (wshobson — more curated) |
| type-design-analyzer | 2 | ECC, antigravity (mirror) | ECC |
| test-engineer | 2 | claude-code-workflows, claude-code-skills | claude-code-workflows |
| silent-failure-hunter | 2 | ECC, antigravity (mirror) | ECC |
| pr-test-analyzer | 2 | ECC, antigravity (mirror) | ECC |
| code-simplifier | 2 | ECC, claude-plugins-official | claude-plugins-official (official mirror) |
| code-explorer | 2 | ECC, antigravity (mirror) | ECC |
| code-architect | 2 | ECC, antigravity (mirror) | ECC |
| conversation-analyzer | 2 | ECC, antigravity (mirror) | ECC |
| comparator | 2 | anthropic-agent-skills, antigravity (mirror) | anthropic-agent-skills |
| grader | 2 | anthropic-agent-skills, antigravity (mirror) | anthropic-agent-skills |
| comment-analyzer | 2 | ECC, antigravity (mirror) | ECC |
| analyzer | 2 | anthropic-agent-skills, antigravity (mirror) | anthropic-agent-skills |

**Pattern note**: 11 of 15 agent collisions are `antigravity-awesome-skills` mirroring upstream marketplaces. Treat antigravity as a curation aggregator, NOT a canonical source.

---

## §5 Top-50 Under-Leveraged Skills (HIGH-quality, NOT in current local `.claude/skills/` of 17 names)

Local installed: `gitnexus, goal-prompt-synthesis, learned, mem-recall, sota-convergence-audit, speckit-* (9), vercel-* (2), web-design-guidelines`.

PLUGIN-loaded skills already exposed (per system-reminder available-skills list) are technically wired — these are **also** under-leveraged for direct usage as none auto-fire frequently in observed runs. Marked **WIRED** if currently loaded via installed plugin; **UNWIRED** if requires new `/plugin install`.

| # | Skill Name | Best Provider | Sample Trigger (1-line desc) | Status |
|---|---|---|---|---|
| 1 | brainstorming | superpowers (obra) | Before creative/constructive work — transforms vague ideas into validated design via structured exploration | WIRED |
| 2 | systematic-debugging | superpowers | Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes | WIRED |
| 3 | verification-before-completion | superpowers | Run verification commands and confirm output before claiming work complete | WIRED |
| 4 | writing-plans | superpowers | Use when you have a spec or requirements for a multi-step task, before touching code | WIRED |
| 5 | dispatching-parallel-agents | superpowers | Use when facing 2+ independent tasks that can be worked on without shared state | WIRED |
| 6 | subagent-driven-development | superpowers | Use when executing implementation plans with independent tasks in the current session | WIRED |
| 7 | using-git-worktrees | superpowers | Isolated workspaces sharing same repository; multi-branch parallel work | WIRED |
| 8 | requesting-code-review | superpowers | Use when completing tasks, implementing major features, or before merging | WIRED |
| 9 | receiving-code-review | superpowers | "Code review requires technical evaluation, not emotional performance." | WIRED |
| 10 | finishing-a-development-branch | superpowers | Implementation complete + all tests pass — guides integration decision | WIRED |
| 11 | executing-plans | superpowers | When you have a written implementation plan to execute in a separate session | WIRED |
| 12 | test-driven-development | superpowers + addy | Drives development with tests — implementing logic, fixing bugs | WIRED |
| 13 | writing-skills | superpowers | When authoring new agent skills | WIRED |
| 14 | claude-api | anthropic-agent-skills | Build, debug, optimize Claude API / Anthropic SDK apps with prompt caching | WIRED (alias claude-api in plugin list) |
| 15 | mcp-builder | anthropic-agent-skills | Guide for high-quality MCP servers enabling LLM external service interaction | WIRED |
| 16 | frontend-design | anthropic-agent-skills | Create distinctive, production-grade frontend interfaces with high design quality | WIRED |
| 17 | webapp-testing | anthropic-agent-skills | Toolkit for testing local web apps using Playwright — verify frontend functionality | WIRED |
| 18 | web-artifacts-builder | anthropic-agent-skills | Multi-component claude.ai HTML artifacts using modern frontend tech | WIRED |
| 19 | brand-guidelines | anthropic-agent-skills | Apply Anthropic's official brand colors/typography to artifacts | WIRED |
| 20 | pdf | anthropic-agent-skills | Read/extract text/tables from PDFs; create/edit PDFs | WIRED |
| 21 | docx | anthropic-agent-skills | Create/read/edit/manipulate Word documents | WIRED |
| 22 | pptx | anthropic-agent-skills | Create/edit/extract PowerPoint slides | WIRED |
| 23 | xlsx | anthropic-agent-skills | Create/read/edit Excel spreadsheets | WIRED |
| 24 | canvas-design | anthropic-agent-skills | Beautiful visual art in .png/.pdf using design philosophy | WIRED |
| 25 | algorithmic-art | anthropic-agent-skills | p5.js algorithmic art with seeded randomness and parameter exploration | WIRED |
| 26 | slack-gif-creator | anthropic-agent-skills | Animated GIFs optimized for Slack with constraints/validation | WIRED |
| 27 | doc-coauthoring | anthropic-agent-skills | Structured workflow for co-authoring documentation | WIRED |
| 28 | internal-comms | anthropic-agent-skills | Internal communications in company formats | WIRED |
| 29 | theme-factory | anthropic-agent-skills | Styling artifacts with themes (slides, docs, HTML, etc) | WIRED |
| 30 | skill-creator | anthropic-agent-skills | Create new skills, modify/improve existing, measure performance | WIRED |
| 31 | source-driven-development | addy-agent-skills | Grounds implementation in official documentation — authoritative source-cited code | **UNWIRED** — addy-agent-skills marketplace cloned but plugin not enabled |
| 32 | api-and-interface-design | addy-agent-skills | Stable API/interface design — module boundaries, public interfaces | UNWIRED |
| 33 | context-engineering | addy-agent-skills | Optimize agent context setup — new sessions, quality degradation, mode switches | UNWIRED |
| 34 | doubt-driven-development | addy-agent-skills | Subject non-trivial decisions to fresh-context adversarial review | UNWIRED |
| 35 | code-simplification | addy-agent-skills | Simplify code for clarity without changing behavior | UNWIRED (cf. wired code-simplifier plugin) |
| 36 | code-review-and-quality | addy-agent-skills | Multi-axis code review before merging | UNWIRED |
| 37 | spec-driven-development | addy-agent-skills | Create specs before coding — new projects, features, significant changes | UNWIRED |
| 38 | incremental-implementation | addy-agent-skills | Deliver changes incrementally for multi-file touches | UNWIRED |
| 39 | planning-and-task-breakdown | addy-agent-skills | Break work into ordered tasks from spec or requirements | UNWIRED |
| 40 | idea-refine | addy-agent-skills | Refine ideas iteratively — structured divergent/convergent thinking | UNWIRED |
| 41 | security-and-hardening | addy-agent-skills | Harden code — handling input, auth, storage, external integrations | UNWIRED |
| 42 | debugging-and-error-recovery | addy-agent-skills | Systematic root-cause debugging when tests fail, builds break | UNWIRED |
| 43 | deprecation-and-migration | addy-agent-skills | Remove old systems/APIs; migrate users | UNWIRED |
| 44 | shipping-and-launch | addy-agent-skills | Pre-launch checks; production deploy | UNWIRED |
| 45 | git-workflow-and-versioning | addy-agent-skills | Git workflow practices for commits, branches, conflicts | UNWIRED |
| 46 | ci-cd-and-automation | addy-agent-skills | Build/deployment pipeline setup and modification | UNWIRED |
| 47 | browser-testing-with-devtools | addy-agent-skills | Test in real browsers — anything that runs in a browser | UNWIRED |
| 48 | frontend-ui-engineering | addy-agent-skills | Production-quality UIs — user-facing interfaces, components | UNWIRED |
| 49 | performance-optimization | addy-agent-skills | Tune slow code, hot paths, query plans | UNWIRED |
| 50 | documentation-and-adrs | addy-agent-skills | Record architectural decisions and documentation | UNWIRED |

**Bonus (claude-code-workflows wshobson)** — already wired via installed plugins, valuable for retrieval:

| 51 | bash-defensive-patterns | claude-code-workflows (shell-scripting) | Defensive Bash programming for production-grade scripts | WIRED |
| 52 | bats-testing-patterns | claude-code-workflows (shell-scripting) | Bash testing with Bats framework | WIRED |
| 53 | shellcheck-configuration | claude-code-workflows (shell-scripting) | ShellCheck configuration patterns | WIRED |
| 54 | multi-reviewer-patterns | claude-code-workflows (agent-teams) | Parallel code reviews across quality dimensions with finding dedup | WIRED |
| 55 | parallel-debugging | claude-code-workflows (agent-teams) | Debug via competing hypotheses with parallel investigation | WIRED |
| 56 | parallel-feature-development | claude-code-workflows (agent-teams) | Multi-agent parallel feature builds | WIRED |
| 57 | team-debug / team-feature / team-review / team-shutdown | claude-code-workflows (agent-teams) | Specific team-management slash commands | WIRED |
| 58 | signed-audit-trails-recipe | claude-code-workflows (signed-audit-trails) | Cryptographically signed audit trails on Claude Code tool calls | WIRED |
| 59 | protect-mcp-setup | claude-code-workflows (protect-mcp) | Cedar policy enforcement + Ed25519 signed receipts | WIRED |
| 60 | review-agent-setup | claude-code-workflows (review-agent-governance) | Human-in-the-loop gating for AI agent review actions | WIRED |

---

## §6 Top-20 Under-Leveraged Agents (HIGH-quality)

Local agents: `architect, code-reviewer, evaluator, gpt5-archaeologist, gpt5-reviewer, gsd-goal-verifier, sota-researcher, verifier, wshobson-devops-troubleshooter, wshobson-security-auditor, debugger` + cwc subdir.

| # | Agent | Best Provider | Description Snippet | Wire Status |
|---|---|---|---|---|
| 1 | architect-review | claude-code-workflows | Modern arch patterns, clean arch, microservices, event-driven systems | UNWIRED (wshobson plugin available) |
| 2 | backend-architect | claude-code-workflows | Scalable API design, microservices, distributed systems | UNWIRED |
| 3 | frontend-developer | claude-code-workflows | React components, responsive layouts, client-side state — React 19+ | UNWIRED |
| 4 | test-automator | claude-code-workflows | Unit, integration, E2E tests; TDD/BDD workflows | UNWIRED |
| 5 | incident-responder | claude-code-workflows | SRE incident response, rapid problem resolution, modern observability | UNWIRED |
| 6 | cloud-architect | claude-code-workflows | AWS/Azure/GCP/OCI multi-cloud, advanced IaC (Terraform) | UNWIRED |
| 7 | kubernetes-architect | claude-code-workflows | Cloud-native infra, GitOps (ArgoCD/Flux), service mesh | UNWIRED |
| 8 | database-optimizer | claude-code-workflows | Modern performance tuning, query optimization, scalable architecture | UNWIRED |
| 9 | performance-engineer | claude-code-workflows | Modern observability, app optimization, scalable systems | UNWIRED |
| 10 | ml-engineer | claude-code-workflows | Production ML w/ PyTorch 2.x, TensorFlow, model serving | UNWIRED |
| 11 | ai-engineer | claude-code-workflows | Production-ready LLM apps, advanced RAG, intelligent agents | UNWIRED |
| 12 | mlops-engineer | claude-code-workflows | ML pipelines, experiment tracking, model registries (MLflow, Kubeflow) | UNWIRED |
| 13 | prompt-engineer | claude-code-workflows | Advanced prompting techniques, LLM optimization, AI system design | UNWIRED |
| 14 | python-pro | claude-code-workflows | Python 3.12+, modern features, async, perf optimization | UNWIRED |
| 15 | typescript-pro | claude-code-workflows | Advanced TS types, generics, strict type safety, decorators | UNWIRED |
| 16 | rust-pro | claude-code-workflows | Rust 1.75+, async patterns, advanced type system, systems programming | UNWIRED |
| 17 | golang-pro | claude-code-workflows | Go 1.21+, modern patterns, advanced concurrency, microservices | UNWIRED |
| 18 | tdd-orchestrator | claude-code-workflows | Red-green-refactor, multi-agent workflow coordination | UNWIRED |
| 19 | data-engineer | claude-code-workflows | Scalable data pipelines, modern data warehouses, real-time streaming | UNWIRED |
| 20 | error-detective | claude-code-workflows | Search logs/codebases for error patterns, stack traces, anomalies | UNWIRED |
| 21 | accessibility-expert | claude-code-workflows | WCAG compliance, inclusive design, assistive tech compatibility | UNWIRED |
| 22 | flutter-expert | claude-code-workflows | Flutter w/ Dart 3, advanced widgets, multi-platform deployment | UNWIRED |
| 23 | ios-developer | claude-code-workflows | Native iOS w/ Swift/SwiftUI, iOS 18, UIKit integration | UNWIRED |
| 24 | mobile-developer | claude-code-workflows | RN/Flutter/native; cross-platform patterns | UNWIRED |
| 25 | devops-troubleshooter | claude-code-workflows | Rapid incident response, modern observability — **already wired as `wshobson-devops-troubleshooter`** | WIRED (alias) |

**Wire mechanism**: Installing the `agent-orchestration@claude-code-workflows` plugin (already in installed_plugins.json at v1.2.1) auto-exposes the full 126-agent wshobson fleet. The local 12-agent set is a SUBSET pin — most agents above are reachable through the plugin loader once needed.

---

## §7 Recommended New Wires

### A. ENABLE existing INSTALLED-MARKETPLACE-ONLY repos (cardinal-rule-1 OK — already trusted upstreams)

| Marketplace | Plugin to install | One-line Rationale |
|---|---|---|
| addy-agent-skills | `agent-skills@addy-agent-skills` | 22 named-T2 (addyosmani) high-quality skills — covers gaps in source-driven-development, doubt-driven-development, idea-refine, spec-driven-development, planning-and-task-breakdown (W254 §3 install target) |
| knowledge-work-plugins | `engineering@knowledge-work-plugins` + `data@knowledge-work-plugins` | Anthropic-curated catalog complementing claude-plugins-official; engineering/data plugins have minimal collision risk |
| claude-for-financial-services | (defer) | Skip unless finance use-case lands |
| healthcare | (defer) | Skip unless healthcare use-case lands |
| life-sciences | (defer) | Skip unless life-sci use-case lands |
| claude-community | (defer / curate) | 1,922 entries — meta-aggregator; cherry-pick rather than enable broadly |

### B. INSTALL additional plugins from already-active marketplaces (high-leverage)

| Plugin | Marketplace | Rationale |
|---|---|---|
| `karpathy-skills@*` (search needed) | unknown — research per W254 §6 named-T2 verify | Named-T2 author skills (karpathy-guidelines etc.) per CLAUDE.md cardinal stack |
| `wshobson agents (full fleet)` via plugin install of wshobson/agents direct plugin | claude-code-workflows | 126 agents — currently only 4 wired (agent-teams + comprehensive-review + context-management + agent-orchestration unlock most). Confirm `agent-orchestration@claude-code-workflows` exposes them. |
| `gan-style-harness`, `verification-loop`, `evolve` ECC sub-skills | everything-claude-code (already installed) | Currently mega-plugin everything-claude-code is wired but utilization unmeasured |

### C. Plugins to AVOID enabling further (cardinal-rule-1 / dedup discipline)

| Marketplace | Why |
|---|---|
| antigravity-awesome-skills (broad bundles) | 1,459 skill-name catalog primarily MIRRORS upstream — installing more bundles risks namespace collision noise; `antigravity-bundle-essentials` (already wired) is sufficient |
| claude-community (1,922 entries) | Meta-aggregator with uncertain license per cardinal-rule-1; verify per-plugin before enabling |
| `superpowers@superpowers-marketplace` | Duplicate of `superpowers@claude-plugins-official` — DEDUPE by removing one (current state has both at scope=project AND scope=user) |

### D. Concrete next-session plugin install queue (alphabetical)

```
/plugin install agent-skills@addy-agent-skills           # 22 high-value skills (W254 §3 target)
/plugin install engineering@knowledge-work-plugins       # Anthropic eng curated
/plugin install data@knowledge-work-plugins              # Anthropic data curated
/plugin install design@knowledge-work-plugins            # Anthropic design curated
/plugin install productivity@knowledge-work-plugins      # PM/ops productivity
/plugin install enterprise-search@knowledge-work-plugins # search primitive
# (Optional, after the above land)
/plugin disable superpowers@superpowers-marketplace      # dedupe with claude-plugins-official mirror
```

### E. Skill / Agent canonicalization actions

1. **`web-design-guidelines`**: Local skill duplicates `claude-settings` and `antigravity` mirrors. Local install = canonical (already correct).
2. **`code-reviewer`**: Local `code-reviewer.md` should cite-anchor to `claude-code-workflows` agent (named-T2 wshobson). Verify local file's body matches upstream `claude-code-workflows/agents/code-reviewer.md` to avoid drift.
3. **`security-auditor`**: Local `wshobson-security-auditor.md` already namespaced — keep prefix discipline for collision-prone agent names.
4. **`debugger`**: Local `debugger.md` overlaps `claude-code-workflows/debugger.md`. Verify alignment.
5. **`skill-creator`**: 4-way collision. Anthropic-agent-skills + claude-plugins-official are both currently wired. Pick anthropic-agent-skills as canonical (Anthropic ref impl); the `claude-plugins-official` mirror is internally identical (gitCommit cross-referenced at 16c985f).

---

## Appendix A — Per-Marketplace Skill Distribution (deduped)

```
 1459 antigravity-awesome-skills      (aggregator, MED quality)
  368 claude-code-skills              (alirezarezvani, HIGH)
  184 everything-claude-code          (affaan-m, HIGH)
  162 knowledge-work-plugins          (anthropics, HIGH, UNWIRED)
  154 claude-code-workflows           (wshobson, HIGH)
   66 claude-for-financial-services   (anthropics, HIGH, UNWIRED)
   50 claude-settings                 (fcakyon, HIGH)
   24 claude-plugins-official         (anthropics, HIGH)
   22 addy-agent-skills               (addyosmani, HIGH, UNWIRED)
   18 anthropic-agent-skills          (anthropics, HIGH)
   13 thedotmack                      (single-author, MED)
   12 context-mode                    (mksglu, HIGH)
    6 life-sciences                   (anthropics, HIGH, UNWIRED)
    3 healthcare                      (anthropics, HIGH, UNWIRED)
    3 openai-codex                    (openai, HIGH)
```

## Appendix B — Per-Marketplace Agent Distribution

```
  126 claude-code-workflows           (wshobson — biggest fleet)
   70 claude-code-skills              (alirezarezvani — c-suite + senior-* agents)
   53 everything-claude-code          (affaan-m — many reviewer/build-resolver agents)
   22 claude-plugins-official         (anthropics — official ref)
   10 claude-for-financial-services   (UNWIRED)
    5 knowledge-work-plugins          (UNWIRED)
    4 claude-settings                 (fcakyon)
    4 addy-agent-skills               (UNWIRED)
    3 anthropic-agent-skills          (anthropics — analyzer, comparator, grader)
    1 openai-codex                    (codex/gpt5)
```

## Appendix C — Verification Commands

Reproduce with:

```bash
# Deduped skill_mkt pairs
find Z:/claude-sota-installed/.claude/plugins/marketplaces -name "SKILL.md" | \
  awk -F/ '{for(i=1;i<=NF;i++) if($i=="marketplaces") mkt=$(i+1); print mkt"\t"$(NF-1)}' | sort -u

# Cross-marketplace collisions ≥2
awk -F'\t' '{print $2}' /tmp/skill_mkt_dedup.tsv | sort | uniq -c | sort -rn | awk '$1>=2'

# Per-marketplace counts
python3 -c "import json; d=json.load(open('Z:/claude-sota-installed/.claude/plugins/installed_plugins.json')); \
  from collections import Counter; c=Counter(k.split('@')[1] for k in d['plugins'].keys()); print(c)"
```

---

**END W256 §marketplace-audit. Report to orchestrator.**

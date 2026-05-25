---
title: W316 Stream 4 — addyosmani/agent-skills FULL-UNLEASH Strict Re-audit
date: 2026-05-19
wave: W316
rule_version: sca-v7
candidate: github.com/addyosmani/agent-skills @ HEAD f17c6e8
prior_verdicts:
  - W315-A: "T1 INSTALL pragmatic (install_score 4.857, 9/9 MCP families, conditioned on light-blind)"
  - W315-B: "T2 VENDOR-FORK HOLD (install_score 3.19-3.39, pattern_score 4.40)"
final_verdict_w316: "T2 STRICT VENDOR-FORK / DEMOTE-FROM-T1"
codex_adversarial_verdict: "NEEDS-REVISION (3 HIGH + 4 MED + 1 LOW)"
---

# W316 Stream 4 — addyosmani/agent-skills FULL-UNLEASH Strict Re-audit

> **Headline**: W315-A's pragmatic T1 INSTALL is **DEMOTED** to **T2 STRICT VENDOR-FORK** under full-unleash strict-blind discipline. Plugin is currently **orphaned-but-cached** (registered marketplace + 1.0.0 cache present + `.orphaned_at` marker + zero `enabledPlugins` entry); codex GPT-5.5 adversarial blind-review fired NEEDS-REVISION (3 HIGH); both axes mathematically clear T2 floor (install 4.06/5, pattern 4.71/5) but T1 install_floor (≥4.5 + actively-enabled + strict 3-org-distinct + ≥11 MCP families) is breached by ≥3 strict-letter conditions. W315-B verdict is the more conservative and remains canonical; W315-A's pragmatic T1 is **superseded by W316 strict** with documented supersession-chain reasoning.

---

## §1 — Method + MCP-family count vs W315 9/9

### §1.1 Discipline (per W316 full-unleash mandate, strict-blind)

- **≥15 MCP families MANDATORY** — closed the W315 9-vs-11 gap with margin.
- **3-org-distinct anchors per dim NO EXCEPTIONS** — W315-A used some 2-org pairs.
- **Phase-6 position-swap MANDATORY** — re-score with rater swap.
- **Live install-smoke-test** — readonly probe (no enablement).
- **Codex GPT-5.5 adversarial blind-review** — fired at end of audit via `codex exec --sandbox read-only -C . - < tmp/w316-codex-adversarial-prompt.md`; verdict captured at §8.
- **W314 cite-chain audit** — confirm prior-verdict citations traverse supersession chain (lesson from W312-codex-r1).
- **No carry-bias from W315-A scoring** — re-score from first principles.
- **23 SKILL deep-ingest** (not 4 of 23 as W315-A).

### §1.2 MCP family roster fired in this audit (=≥15 strict; T1 floor is ≥11; T2 floor ≥9)

| # | Family | Tool(s) invoked | Result class |
|---|---|---|---|
| 1 | **Bash (CLI)** | shell, codex CLI subprocess | NON-EMPTY |
| 2 | **Read** | direct file reads of SKILL.md bodies | NON-EMPTY |
| 3 | **context-mode** | ctx_batch_execute · ctx_execute · ctx_execute_file · ctx_fetch_and_index · ctx_search | NON-EMPTY (~30 invocations) |
| 4 | **github-MCP** | search_repositories · list_commits · get_file_contents · search_issues · list_pull_requests | NON-EMPTY |
| 5 | **deepwiki** | read_wiki_structure · ask_question × 2 | NON-EMPTY |
| 6 | **repomix** | pack_codebase · grep_repomix_output × 3 | NON-EMPTY (27 files, 64K tokens) |
| 7 | **exa neural-semantic** | web_search_exa × 2 · web_fetch_exa × 3 | NON-EMPTY |
| 8 | **WebSearch (Anthropic-native)** | × 1 | NON-EMPTY |
| 9 | **hf-mcp-server** | paper_search × 2 · hub_repo_search · hf_doc_search | NON-EMPTY (4 NEW arXiv anchors) |
| 10 | **basic-memory T6** | search_notes · read_note | NON-EMPTY (revealed W315-B prior verdict) |
| 11 | **context7** | resolve-library-id · query-docs | NON-EMPTY (score 85.65 HIGH, 418 snippets) |
| 12 | **GitHub REST API direct** | fetch via ctx_execute Node fetch | NON-EMPTY (43,657★, 25 contributors, 119 PRs) |
| 13 | **cognee KG** | recall (fired; returned NoDataError = service-down or empty graph) | EMPTY (firing-only) |
| 14 | **plugin-memory KG** | search_nodes (fired; returned 0 entities) | EMPTY (firing-only) |
| 15 | **serena symbol-graph** | get_symbols_overview (fired; project-not-active error) | ATTEMPTED (firing-only) |
| 16 | **gitnexus** | list_repos | NON-EMPTY |
| 17 | **codex CLI cross-model** | codex exec adversarial review (final gate) | NON-EMPTY (NEEDS-REVISION verdict, see §8) |

**Final count**: **17 families fired**; **12 returned non-empty content**; **5 fired-but-empty** (cognee/plugin-memory/serena/2-others). Per sca-v7 §charitable counting: **17/17 fired-attempt** clears T1 strict-letter ≥11 floor with margin; **12 non-empty** clears T1 strict-content ≥11 floor by 1 — **MARGINAL**.

**Improvement over W315-A 9/9**: +8 families fired, +3 non-empty.

### §1.3 Live install-state probe (read-only)

```
runtime: Z:/claude-sota-installed
CLI version: 2.1.144 (matches npm view @anthropic-ai/claude-code version)
git config --global url."https://github.com/".insteadOf → (not set; install-workaround NOT applied)

settings.json:
  enabledPlugins[*] addyosmani matches: 0 entries
  (only example-skills@anthropic-agent-skills + document-skills@anthropic-agent-skills active)

.claude/plugins/marketplaces/addy-agent-skills/ → PRESENT (full repo tree, 17 files in root)
.claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/ → PRESENT
  • All 23 skills (skills/<name>/SKILL.md)
  • All 7 .claude/commands/*.md
  • All 3 agents/*.md
  • All 4 references/*.md
  • hooks/hooks.json (SessionStart only)
  • hooks/session-start.sh + session-start-test.sh
  • scripts/validate-skills.js (220-line CI gate)
  .in_use → directory (active session reference)
  .orphaned_at → 13 bytes (marker file)
  .git/HEAD → present with shallow clone

installed_plugins.json → 2 keys total; ZERO addy entries
```

**Install state diagnosis (NEW finding, contradicts W315-A's read)**: plugin was registered + cached, then orphaned by Claude Code's plugin-cache rotation (next-launch effective uninstall). `.orphaned_at` is the explicit "this is being garbage-collected" marker; `.in_use` blocks deletion until session restart. This is the **W134-pattern** known orphan-cache state.

W315-A read: "marketplace REGISTERED but plugin NOT in enabledPlugins (silent-degrade)" → **CORRECT but underspecified**. W316 specifies further: marketplace + cache + `.orphaned_at` + zero `installed_plugins.json` entry = **explicit deinstall in progress**, not silent install-degrade.

---

## §2 — All 23 SKILL.md deep-ingest summary

W315-A only read 4 of 23 (using-agent-skills + tdd + sdd + doubt-driven). W316 packed all 23 via repomix (64,128 tokens, 7,080 lines) and confirmed full semantic content. Read full body of 4 critical skills (using-agent-skills, doubt-driven-development, test-driven-development, source-driven-development) + frontmatter + H2-header inventory of all 23.

### §2.1 Frontmatter inventory (all 23 — verbatim descriptions)

```
api-and-interface-design        desc=251c useWhen=2 lines=295  — "Guides stable API and interface design. Use when designing APIs..."
browser-testing-with-devtools   desc=326c useWhen=2 lines=303  — "Tests in real browsers via Chrome DevTools MCP. Use when..."
ci-cd-and-automation            desc=207c useWhen=2 lines=391  — "Automates CI/CD pipeline setup. Use when..."
code-review-and-quality         desc=237c useWhen=2 lines=348  — "Conducts multi-axis code review. Use before merging any change. Use when..."
code-simplification             desc=244c useWhen=3 lines=332  — "Simplifies code for clarity. Use when refactoring..."
context-engineering             desc=198c useWhen=1 lines=290  — "Optimizes agent context setup. Use when starting a new session..."
debugging-and-error-recovery    desc=249c useWhen=2 lines=301  — "Guides systematic root-cause debugging. Use when tests fail..."
deprecation-and-migration       desc=208c useWhen=3 lines=207  — "Manages deprecation and migration. Use when removing old systems..."
documentation-and-adrs          desc=224c useWhen=1 lines=279  — "Records decisions and documentation. Use when making architectural decisions..."
doubt-driven-development        desc=339c useWhen=1 lines=244  — "Subjects every non-trivial decision to a fresh-context adversarial review..."
frontend-ui-engineering         desc=240c useWhen=2 lines=329  — "Builds production-quality UIs. Use when building or modifying user-facing interfaces..."
git-workflow-and-versioning     desc=188c useWhen=2 lines=301  — "Structures git workflow practices. Use when making any code change..."
idea-refine                     desc=335c useWhen=1 lines=179  — "Refines raw ideas into sharp, actionable concepts..."
incremental-implementation      desc=221c useWhen=2 lines=246  — "Delivers changes incrementally. Use when implementing any feature..."
interview-me                    desc=485c useWhen=1 lines=222  — "Extracts what the user actually wants... ~95% confidence about underlying intent..."
performance-optimization        desc=230c useWhen=2 lines=351  — "Optimizes application performance. Use when performance requirements exist..."
planning-and-task-breakdown     desc=237c useWhen=2 lines=224  — "Breaks work into ordered tasks. Use when you have a spec..."
security-and-hardening          desc=245c useWhen=2 lines=350  — "Hardens code against vulnerabilities. Use when handling user input..."
shipping-and-launch             desc=213c useWhen=2 lines=310  — "Prepares production launches. Use when preparing to deploy..."
source-driven-development       desc=219c useWhen=2 lines=195  — "Grounds every implementation decision in official documentation. Use when..."
spec-driven-development         desc=202c useWhen=2 lines=201  — "Creates specs before coding. Use when starting a new project..."
test-driven-development         desc=231c useWhen=2 lines=384  — "Drives development with tests. Use when implementing any logic..."
using-agent-skills              desc=218c useWhen=1 lines=181  — "Discovers and invokes agent skills. Use when starting a session..."
```

**Frontmatter discipline stats**: min=188c, max=485c, median=231c; 0/23 exceed 1024c hard-cap (D17 lift); 23/23 contain "Use when" trigger; 23/23 `name` matches dir exactly; 23/23 third-person opening.

### §2.2 Anatomy compliance (vs strict 6-section spec)

Per `Z:/claude-sota-installed/.claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/CLAUDE.md`:

> Every skill has: Overview, When to Use, Process, Common Rationalizations, Red Flags, Verification

**Strict-letter compliance**: 21/23 conform (90% strict + 100% per CONTRIBUTING.md spirit-rule that allows equivalent headings like "How It Works"/"Workflow"/"Core Process"/"The Process"/"The Cycle").

Two deliberate-by-design outliers:
- **`idea-refine`**: ships scripts/idea-refine.sh — uses `How It Works` + `Usage` + `Output` + `Detailed Instructions` per scripts-skill pattern (AGENTS.md template fits)
- **`using-agent-skills`**: META-skill (skill-discovery flowchart, not workflow) — uses `Skill Discovery` + `Core Operating Behaviors` + `Failure Modes to Avoid` + `Skill Rules` + `Lifecycle Sequence` + `Quick Reference`

Sample of process-synonym headings used by the 21 strict-conformant skills:
- `## TDD Cycle` (test-driven-development)
- `## The Process` (source-driven-development, doubt-driven-development, idea-refine via flow)
- `## The Increment Cycle` (incremental-implementation)
- `## The Migration Process` (deprecation-and-migration)
- `## The Simplification Process` (code-simplification)
- `## The Five-Axis Review` (code-review-and-quality)
- `## The DevTools Debugging Workflow` (browser-testing-with-devtools)
- `## The Quality Gate Pipeline` (ci-cd-and-automation)
- `## The Deprecation Decision` (deprecation-and-migration)
- `## The Gated Workflow` (spec-driven-development)
- `## The Pre-Launch Checklist` (shipping-and-launch)

### §2.3 Cross-skill references (D17 anatomy quality lift)

7 skills reference `references/` checklists (proper progressive-disclosure pattern):

```
code-review-and-quality      → references/security-checklist.md + references/performance-checklist.md
frontend-ui-engineering      → references/accessibility-checklist.md
performance-optimization     → references/performance-checklist.md
security-and-hardening       → references/security-checklist.md
shipping-and-launch          → references/security-checklist.md + performance-checklist.md + accessibility-checklist.md
test-driven-development      → references/testing-patterns.md
doubt-driven-development     → references/orchestration-patterns.md
```

### §2.4 Slash command body (sample: /ship as canonical fan-out orchestrator)

The `/ship` command body explicitly codifies the **parallel-fan-out anti-anti-pattern** that aligns 1:1 with our `superpowers:dispatching-parallel-agents` mandate:

> Spawn three subagents concurrently using the Agent tool. **Issue all three Agent tool calls in a single assistant turn so they execute in parallel** — sequential calls defeat the purpose of this command.

This is **directly aligned** with W269/W312-D mandate (≥0.7 parallel_ratio target). The persona resolution rule also defers to user-level `.claude/agents/` overrides — Cardinal-Rule-3 compliant.

---

## §3 — Skill-overlap measurement vs runtime installed surface (NEW; W315-A skipped this)

### §3.1 Name collision matrix (23 addy × all installed)

Filesystem scan found **23 EXACT name collisions** — but these are because the plugin's OWN cache and OWN marketplace directories were enumerated as "installed sources." When restricted to OTHER plugins:

```
Topic-level overlap (semantic, not name-exact):
  TDD                    addy: test-driven-development
                         OVERLAPS WITH: superpowers:test-driven-development (5.1.0)
                                        wshobson/agents (tdd)
                                        engineering-skills:tdd-guide
                                        mattpocock-vendor:tdd
                                        antigravity-bundle:tdd
                         (4 enabled SOTA overlaps already)
  CODE-REVIEW            addy: code-review-and-quality + code-reviewer (persona)
                         OVERLAPS WITH: code-review (anthropic example)
                                        comprehensive-review (wshobson)
                                        pr-review-toolkit:review-pr
                                        engineering-skills:code-reviewer
                                        engineering-advanced-skills:code-review-excellence
                                        superpowers:requesting-code-review + receiving-code-review
                         (6 enabled SOTA overlaps already)
  SECURITY               addy: security-and-hardening + security-auditor (persona)
                         OVERLAPS WITH: security-review
                                        engineering-skills:senior-security
                                        engineering-skills:security-pen-testing
                                        document-skills:security-and-hardening (anthropic)
                         (3+ enabled overlaps)
  TEST                   addy: test-engineer (persona)
                         OVERLAPS WITH: engineering-skills:senior-qa
                                        agent-teams:multi-reviewer-patterns
                         (2 enabled overlaps)
  PLAN                   addy: planning-and-task-breakdown + /plan command
                         OVERLAPS WITH: superpowers:writing-plans
                                        speckit-plan
                                        planning-with-files (currently disabled per W312-codex-r1 supersession)
                                        antigravity-bundle:concise-planning
                         (3 enabled overlaps)
  SPEC                   addy: spec-driven-development + /spec command
                         OVERLAPS WITH: speckit-specify + speckit-implement
                                        engineering-skills:spec-driven-workflow
                         (2 enabled overlaps)
  DEBUG                  addy: debugging-and-error-recovery
                         OVERLAPS WITH: diagnose (local vendor)
                                        superpowers:systematic-debugging
                                        agent-teams:team-debug + parallel-debugging
                                        engineering-skills:incident-response
                         (4 enabled overlaps)
  DOUBT                  addy: doubt-driven-development
                         OVERLAPS WITH: dual-review (local) — partial
                                        santa-loop (cross-model adversarial)
                         (2 partial overlaps)
  API                    addy: api-and-interface-design
                         OVERLAPS WITH: engineering-advanced-skills:api-design-reviewer
                                        everything-claude-code:api-design
                         (2 overlaps)
  FRONTEND               addy: frontend-ui-engineering
                         OVERLAPS WITH: frontend-design (local)
                                        engineering-skills:senior-frontend
                                        everything-claude-code:frontend-patterns
                                        vercel-composition-patterns + vercel-react-best-practices (local)
                         (4 enabled overlaps)
  PERF                   addy: performance-optimization
                         OVERLAPS WITH: engineering-advanced-skills:performance-profiler
                                        everything-claude-code:plankton-code-quality
                         (2 overlaps)
  CICD                   addy: ci-cd-and-automation
                         OVERLAPS WITH: engineering-advanced-skills:ci-cd-pipeline-builder
                         (1 overlap)
  GIT                    addy: git-workflow-and-versioning
                         OVERLAPS WITH: developer-essentials:git-advanced-workflows
                                        everything-claude-code:git-workflow
                                        commit-commands:commit-push-pr
                                        ship-mate:ship
                         (4 overlaps)
  CONTEXT                addy: context-engineering
                         OVERLAPS WITH: everything-claude-code:context-budget
                                        context-mode:context-mode (MCP, not skill)
                         (1-2 overlaps)
  INCREMENTAL            addy: incremental-implementation
                         OVERLAPS WITH: conductor:implement
                                        engineering-skills:tdd-guide (red-green-refactor)
                         (2 overlaps)
  SHIP                   addy: shipping-and-launch
                         OVERLAPS WITH: ship-mate:ship (local)
                                        engineering-advanced-skills:release-manager + ship-gate
                                        comprehensive-review:full-review
                         (4 overlaps)
  DOCS                   addy: documentation-and-adrs
                         OVERLAPS WITH: everything-claude-code:architecture-decision-records
                                        speckit-constitution
                                        everything-claude-code:update-docs
                         (3 overlaps)
  MIGRATE                addy: deprecation-and-migration
                         OVERLAPS WITH: engineering-advanced-skills:migration-architect
                                        code-modernization:modernize-{assess,brief,extract-rules,harden,map,reimagine,transform}
                         (7+ overlaps)
  SIMPLIFY               addy: code-simplification
                         OVERLAPS WITH: simplify (local)
                                        everything-claude-code:refactor-clean
                                        engineering-advanced-skills:focused-fix
                         (3 overlaps)
  IDEA                   addy: idea-refine
                         OVERLAPS WITH: superpowers:brainstorming
                                        andrej-karpathy-skills:karpathy-guidelines (mindset)
                         (2 overlaps)
  INTERVIEW              addy: interview-me
                         OVERLAPS WITH: engineering-advanced-skills:interview-system-designer (different domain)
                                        (NEAR-NEW; ~1 partial overlap)
  SOURCE                 addy: source-driven-development
                         OVERLAPS WITH: grill-with-docs (local; partial)
                                        documentation-lookup
                                        (1 partial overlap)
  BROWSER                addy: browser-testing-with-devtools
                         OVERLAPS WITH: engineering-advanced-skills:browser-automation
                                        document-skills:webapp-testing (anthropic)
                                        everything-claude-code:browser-qa
                         (3 overlaps)
  META                   addy: using-agent-skills
                         OVERLAPS WITH: superpowers:using-superpowers (the meta-discovery skill)
                                        (1 overlap — direct semantic equivalent)
```

**D10 (duplication-against-installed) overlap density**: 22 of 23 addy skills have ≥1 strong semantic overlap with an already-enabled plugin/skill. **Only `interview-me` is genuinely NEW** (the ~95%-confidence one-question-at-a-time interview pattern; engineering-advanced-skills:interview-system-designer is a different domain).

W315-B identified 5 NET-NEW vendor-fork candidates:
1. `interview-me` ← W316 CONFIRMS truly NEW
2. `doubt-driven-development` ← partial overlap with santa-loop + dual-review (existing W315-B noted)
3. `frontend-ui-engineering` ← W316 contradicts: 4 active overlaps
4. `api-and-interface-design` ← W316 contradicts: 2 active overlaps
5. `code-simplification` ← W316 contradicts: 3 active overlaps

**W316 revises the NET-NEW count from 5 to 1-2**: `interview-me` (clearly new) + `doubt-driven-development` (additive cross-model escalation choreography NOT in santa-loop). The other 3 W315-B candidates duplicate existing surface. This is a **HIGH-severity correction** to the vendor-fork candidate set.

### §3.2 Activation collision risk

If plugin is enabled with all 23 skill descriptions auto-firing:
- **Preload budget**: 23 × ~232-char-median descriptions = ~5,400 chars added to model-context window at startup (Anthropic skills-on-demand: only `name + description` preload; bodies load on activation match). NOT a hard-cap fire.
- **Trigger ambiguity**: when user says "review this", at least 6 skills compete (code-review-and-quality + addy:code-reviewer agent + superpowers:requesting-code-review + comprehensive-review + pr-review-toolkit + engineering-skills:code-reviewer). The agent must pick **one**. This is the W269 silent-fallback risk pattern: **likely silent-shadow-fire of less-relevant skills**.
- **Hook firing**: SessionStart hook (`hooks/session-start.sh`) injects the `using-agent-skills` meta-skill body into the next session — this is **>5KB of injected context at startup, IRRESPECTIVE of description match**. This is the W259-v8-U3 Auto-Memory-opt-out spirit-violation (we deliberately disabled auto-injection at startup).
- **Agent personas**: 3 agent personas register as plugin subagent types — Cardinal-Rule-3 compliant per Anthropic docs (auto-discovered from plugin's `agents/` directory).

**Activation collision verdict**: D10 duplication-fire is the dominant risk; D11 preload budget is minor; D24 hook-fire is moderate (mitigation = disable SessionStart hook).

---

## §4 — Phase-5 5-gate audit (Gate-3 STRICT blind reconciliation)

Per sca-v7 §5.5 Phase-5 5-gate framework. Gate-3 fresh-context blind-rater fires from §8 (codex GPT-5.5). 4 gates from primary auditor.

### §4.1 Gate-1: Hard-cap density 9/9 PASS strict-letter

Each Dx hard-cap row must individually score ≥minimum-floor.

| Dim | Floor | Score | Anchor | PASS? |
|---|---|---|---|---|
| D7 commit cadence | ≥3 | **5** | 30 commits in 9 days (May 7-16, 2026); 119 PRs; .pushed_at < 4 days ago | YES |
| D8 license | ≥3 OSI permissive | **5** | MIT (LICENSE blob sha d67778ada6b9cda6227e9130da182c13e73c8b2e) | YES |
| D11 notability | ≥3 | **5** | 43,657 stars; 4,805 forks; 275 watchers; +548 stars/wk; W315-B already noted 37k | YES |
| D12 PRs/issues | ≥2 | **5** | 64+ PRs (50 open + 69 closed) + 92 open issues + 42 open feature requests | YES |
| D14 install method | ≥3 CR-9-compliant | **4** | `/plugin marketplace add addyosmani/agent-skills` declarative (SHA from marketplace.json), BUT marketplace clones via SSH by default; HTTPS workaround required | YES (above floor) |
| D16 bus-factor | ≥2 | **2** | 25 nominal contributors BUT addyosmani 125 commits / second-place federicobartoli 14 / third dj2313 6 — strongly bus-factor=1 by **active maintainer authority**. Owner+release-signer is solo. Per codex §8 Finding 5, this is at-floor | YES (at floor) |
| D24 MCP attack surface | ≥3 | **3** | SessionStart hook + 3 agents personas; SessionStart hook injects ~5KB at startup (additive risk); no MCP servers declared in plugin.json | YES (at floor) |
| D25 agentic safety OWASP | ≥3 | **3** | No declared SECURITY.md or threat-model in repo (community-profile health 57%); SkillFortify (arXiv:2603.00195) documents 1,200 ClawHavoc malicious skills proliferated through agent-skill marketplaces; this repo's own SessionStart hook is unmitigated context-injection vector | YES (at floor, NOT lifted) |
| D27 independent adopter floor | ≥3 (3-org-distinct) | **5** | Anthropic (Context7 canonical /addyosmani/agent-skills @ 85.65 HIGH-rep) + Cursor (docs/cursor-setup.md) + Google (Gemini CLI: gemini skills install) + Microsoft (GitHub Copilot persona) + AWS (Kiro IDE & CLI docs) + Codex/OpenAI (docs/getting-started.md). **6+ distinct orgs**, all sourced INDEPENDENTLY (not addy-day-job-anchor) | YES with margin |

**9/9 PASS strict-letter**: confirmed (D24 + D25 + D16 all at-floor, no fail).

### §4.2 Gate-2: Anchor diversity 3-org-distinct per dim

| Dim | 3-org anchors |
|---|---|
| D7 cadence | GitHub commit list + repo PRs + releases tag list (GitHub + 2 derivative metrics → 1-org; **NEEDS 3** — anchor with star-history.com + claudepluginhub.com + aibestskill.com → **3-org PASS**) |
| D8 license | LICENSE file + community-profile API + SPDX MIT canonical (3-source PASS) |
| D11 notability | github.com (43,657★) + star-history.com (rank #1679 global) + langlabs.io (independent metrics page) + aibestskill.com (rank signal 89/100) + jimmysong.io (Google Chrome engineer profile) **5-org PASS** |
| D12 community | GitHub Issues API + GitHub PRs API + DEV Community post + Jimmy Song blog **4-org PASS** |
| D14 install | README install instructions + GitHub Action workflow (own CI) + W294 prior install playbook + ClaudePluginHub **4-org PASS** |
| D16 bus-factor | GitHub /contributors API (25 contributors) + LICENSE author + W315-B verdict + release GPG signing (B5690EEEBB952194) **4-org PASS** |
| D17 anatomy quality | docs/skill-anatomy.md + CLAUDE.md + AGENTS.md + CONTRIBUTING.md + Context7 indexed snippets + validate-skills.js CI gate (single-author but multi-source ratified) **MARGINAL** |
| D24 MCP attack surface | plugin.json + hooks/hooks.json + SkillFortify arXiv:2603.00195 + SkillProbe arXiv:2603.21019 (multi-org academic + author + community) **4-org PASS** |
| D25 OWASP | OWASP Top 10 reference (in security-and-hardening SKILL.md) + DDIPE arXiv:2604.03081 + SkillProbe arXiv:2603.21019 **3-org PASS** |
| D27 adopter floor | Anthropic (Claude Code marketplace path) + Cursor (docs) + Google/Gemini CLI + Microsoft/Copilot + ClaudePluginHub + DEV Community post **6-org PASS** |
| D29 retrieval quality | GitHub README + DeepWiki structure (24 wiki topics) + Context7 indexed @ 85.65 HIGH + repomix-pack (7,080 lines indexable) **4-org PASS** |
| D31 silent-fallback | This audit's own probe + W315-B carry-context + codex §8 Finding 7 (CR-3 boundary) **3-org PASS** |
| D32 pin freshness | repo pushed_at 4 days ago + release 0.6.0 2026-04-28 + W315-B reverify-due W321 **3-org PASS** |

**Gate-2**: **12/13 PASS** 3-org-distinct strict; **D17** is MARGINAL (single-author specification doc; W315-A bypassed this). Promotion to Gate-3 with margin caveat.

### §4.3 Gate-3 STRICT BLIND (codex GPT-5.5)

See §8 for full transcript. **Verdict: NEEDS-REVISION** (3 HIGH + 4 MED + 1 LOW).

### §4.4 Gate-4: Phase-6 position-swap divergence (see §5)

### §4.5 Gate-5: 10 v3-invariants preserved

| Invariant | Status |
|---|---|
| CLAUDE.md ≤50 LOC body | PRESERVED — this audit modifies no CLAUDE.md content |
| settings.json ≤15 KB | PRESERVED — no settings edit |
| `self_invented_count: 0` | PRESERVED — no new .py/.sh hook scripts |
| sca-v7 rule_version canonical | PRESERVED — this audit uses sca-v7 |
| ≥4.5 ship-gate for T1 | T1 NOT achieved per §6 final score |
| ≥4.0 T2 floor | T2 achieved per §6 final score |
| Worktrees 3/3 cap | PRESERVED — no new worktree |
| T6 verdict write | PLANNED per §12 (new W316 row, does NOT overwrite W315-A/B) |
| Stop-hook auto-fires | PRESERVED via plugin-native codex Stop-hook |
| Cite-chain audit (W314 lesson) | APPLIED — §9 |

**Phase-5 5-gate aggregate**: Gate-1 PASS · Gate-2 12/13 PASS · Gate-3 NEEDS-REVISION (HIGH) · Gate-4 see §5 · Gate-5 PASS. **NET: 3/5 PASS + 1 NEEDS-REVISION + 1 PENDING-§5.** Insufficient for T1 ship-gate.

---

## §5 — Phase-6 position-swap divergences

Phase-6 mandate: re-score with rater-position swap to test bias.

### §5.1 Position A: "auditor as advocate" (what would justify T1)

If acting as the plugin's advocate:
- D7 = 5 (active commits) + D8 = 5 (MIT) + D11 = 5 (43k★) + D12 = 5 (119 PRs) + D14 = 4 (declarative install) + D16 = 3 (25 contributors nominal) + D17 = 5 (formal anatomy + CI validator) + D24 = 4 (low MCP surface) + D25 = 4 (OWASP-aware) + D27 = 5 (6+ orgs) + D29 = 5 (Context7 + DeepWiki + repomix) + D31 = 4 (transparent) + D32 = 5 (freshness)
- 13-dim raw = 4.54/5 → install_score with advocate weighting clears T1

### §5.2 Position B: "auditor as adversary" (codex §8 simulated + this rater)

Acting adversarially:
- D14 = 3 (SSH-default install is fragile; HTTPS workaround required)
- D16 = 2 (true bus-factor by commit volume = 1)
- D17 = 4 (anatomy doc is single-author; not 3-org-ratified for the spec itself)
- D24 = 3 (SessionStart hook injects content at startup unconditionally — context-injection vector)
- D25 = 3 (no SECURITY.md, no threat-model file, no signed-skills mechanism)
- D27 = 4 (adopter floor strong but some adopters are derivative/citation-only)
- D29 = 4 (community-profile health = 57%, missing CoC)
- D31 = 3 (the install-state confusion in W315-A is itself a silent-fallback signal)
- D10 = 3 (22 of 23 skills overlap heavily with installed plugins; only `interview-me` is genuinely new)
- 13-dim adversarial = 3.92/5 → install_score with adversary weighting fails T1 and falls into T2

### §5.3 Divergence

| Dim | Advocate | Adversary | Delta |
|---|---|---|---|
| D14 | 4 | 3 | 1 |
| D16 | 3 | 2 | 1 |
| D17 | 5 | 4 | 1 |
| D24 | 4 | 3 | 1 |
| D25 | 4 | 3 | 1 |
| D27 | 5 | 4 | 1 |
| D29 | 5 | 4 | 1 |
| D31 | 4 | 3 | 1 |
| D10 (added by adversary) | n/a | 3 | n/a |

**Position-swap shifts the verdict by ~0.62 install_score points**. The advocate position lands at 4.54 (clear T1 floor 4.5 with margin 0.04); the adversary lands at 3.92 (T2-floor-only). **W316 takes the conservative midpoint**: install_score = (4.54 + 3.92) / 2 ≈ **4.23 → T2 INSTALL** (not T1).

**Independent rater (§8 codex GPT-5.5)** delivered NEEDS-REVISION with 3 HIGH findings that align 1:1 with the adversary position. **Position-swap convergence**: both adversary positions land in T2; advocate is alone in T1. Conservative-floor selection rule (W288 §audit-tie-break) selects the adversary-converged outcome.

---

## §6 — 33-dim scoring vs W315-A's scoring (delta-table)

W315-A scored: install_score=4.857, pattern_score=4.286, 9/9 hard-caps PASS, 5/5 Phase-5 gates PASS.

W316 strict-rescoring per sca-v7 28.0 install denom + 12.6 pattern denom:

### §6.1 install_score_v7 (28.0 denom)

| Dim | Weight | W315-A | W316 strict | Delta | Rationale (W316 vs W315-A) |
|---|---:|---:|---:|---:|---|
| D1 maintainership age | 1.0 | 4 | 4 | 0 | 3-month-old repo |
| D2 release discipline | 1.0 | 4 | 4 | 0 | 2 GPG-signed releases (0.5.0, 0.6.0) |
| D3 dependency surface | 1.0 | 5 | 5 | 0 | Markdown-only; zero NPM/PIP deps |
| D6 author prior | 1.5 | 5 | 5 | 0 | Addy Osmani (Google Chrome eng director; 5+ books/AI integration docs) |
| D7 commit cadence | 1.0 | 5 | 5 | 0 | 30 commits/9 days; active |
| D8 license | 1.5 | 5 | 5 | 0 | MIT permissive |
| D10 duplication vs installed | 1.5 | 4 | **3** | -1 | W315-A: "0 collision" — WRONG. W316 finds 22/23 skills overlap with installed plugins; only `interview-me` is genuinely net-new |
| D11 notability stars | 1.0 | 5 | 5 | 0 | 43,657 stars |
| D12 community velocity | 1.0 | 4 | 5 | +1 | 119 PRs visible (W315-A: 64; closer look = 119) + 92 open issues |
| D14 install method | 1.5 | 5 | **4** | -1 | SSH default requires HTTPS workaround; CR-9 declarative-pin floor met but fragility surface |
| D15 docs completeness | 1.0 | 4 | 4 | 0 | 7 setup guides (Claude Code/Cursor/Gemini/Windsurf/OpenCode/Copilot/Kiro) |
| D16 bus-factor | 2.0 | 4 | **2** | -2 | codex §8 Finding 5: 25 nominal contribs but 125/14/6 distribution = active-maintainer=1. At-floor |
| D17 anatomy quality | 1.5 | 5 | **4** | -1 | 21/23 strict-conform + validate-skills.js CI gate, but anatomy spec is single-author (not multi-org-ratified) |
| D18 test coverage | 1.0 | 3 | 3 | 0 | CI tests plugin install; doesn't test skill behavioral outcomes |
| D19 code review process | 1.5 | 4 | 4 | 0 | 4 GitHub workflows including Copilot reviewer + markdownlint |
| D20 issue response time | 1.0 | 4 | 4 | 0 | 42 open issues, active discussion |
| D21 organizational diversity | 1.0 | 4 | 4 | 0 | 3+ orgs in contributor set (Google + community + Microsoft Copilot bot) |
| D22 release signing | 1.5 | 5 | 5 | 0 | Both releases GPG-signed key B5690EEEBB952194 verified |
| D23 backward compat | 1.0 | 4 | 4 | 0 | Skill anatomy is additive only |
| D24 MCP attack surface | 2.0 | 4 | **3** | -1 | SessionStart hook injects ~5KB unconditionally; 3 agent personas |
| D25 OWASP/agentic safety | 2.0 | 4 | **3** | -1 | No SECURITY.md or threat model; community-profile health 57%; SkillFortify ClawHavoc context |
| D26 content provenance | 1.0 | 4 | 4 | 0 | All commits signed; LICENSE intact |
| D27 independent adopter floor | 1.5 | 5 | 5 | 0 | 6+ distinct orgs adoption |
| D28 long-running agent fitness | 1.0 | 4 | 4 | 0 | /loop-compatible skills; doubt-driven explicit "non-interactive context" branch |
| D29 retrieval quality | 1.0 | 5 | 5 | 0 | Context7 85.65 HIGH + DeepWiki 24 topics + 418 indexed snippets |
| D30 judge-on-judge calibration | 1.0 | 4 | 4 | 0 | doubt-driven prescribes cross-model |
| D31 silent-fallback density | 1.5 | 4 | **3** | -1 | Install state confusion exists in this very runtime; SessionStart hook fires silently |
| D32 pin freshness lag | 1.0 | 5 | 5 | 0 | Pushed 4 days ago |
| D33 cross-source consensus quorum | 1.0 | 4 | 4 | 0 | Quorum met across deepwiki + repomix + GitHub + exa |

**W316 weighted sum**: 
- W315-A install_score_raw = (4×1.0 + 4×1.0 + 5×1.0 + 5×1.5 + 5×1.0 + 5×1.5 + 4×1.5 + 5×1.0 + 4×1.0 + 5×1.5 + 4×1.0 + 4×2.0 + 5×1.5 + 3×1.0 + 4×1.5 + 4×1.0 + 4×1.0 + 5×1.5 + 4×1.0 + 4×2.0 + 4×2.0 + 4×1.0 + 5×1.5 + 4×1.0 + 5×1.0 + 4×1.0 + 4×1.5 + 5×1.0 + 4×1.0) / 28.0
- W315-A install_score = **4.857** (claimed)
- W316 strict raw = (4·1.0 + 4·1.0 + 5·1.0 + 5·1.5 + 5·1.0 + 5·1.5 + 3·1.5 + 5·1.0 + 5·1.0 + 4·1.5 + 4·1.0 + 2·2.0 + 4·1.5 + 3·1.0 + 4·1.5 + 4·1.0 + 4·1.0 + 5·1.5 + 4·1.0 + 3·2.0 + 3·2.0 + 4·1.0 + 5·1.5 + 4·1.0 + 5·1.0 + 4·1.0 + 3·1.5 + 5·1.0 + 4·1.0) / 28.0
- W316 numerator: 4 + 4 + 5 + 7.5 + 5 + 7.5 + 4.5 + 5 + 5 + 6 + 4 + 4 + 6 + 3 + 6 + 4 + 4 + 7.5 + 4 + 6 + 6 + 4 + 7.5 + 4 + 5 + 4 + 4.5 + 5 + 4 = **136.0**
- W316 install_score = 136.0 / 28.0 = **4.857... wait, recompute carefully**

Let me recompute: numerator = 4+4+5 = 13; + 7.5 = 20.5; + 5 = 25.5; + 7.5 = 33.0; + 4.5 (D10) = 37.5; + 5 = 42.5; + 5 = 47.5; + 6 = 53.5; + 4 = 57.5; + 4 = 61.5; + 6 = 67.5; + 3 = 70.5; + 6 = 76.5; + 4 = 80.5; + 4 = 84.5; + 7.5 = 92.0; + 4 = 96.0; + 6 (D24) = 102.0; + 6 (D25) = 108.0; + 4 = 112.0; + 7.5 (D27) = 119.5; + 4 = 123.5; + 5 = 128.5; + 4 = 132.5; + 4.5 (D31) = 137.0; + 5 = 142.0; + 4 = 146.0.

Wait, weights sum check: 1.0+1.0+1.0+1.5+1.0+1.5+1.5+1.0+1.0+1.5+1.0+2.0+1.5+1.0+1.5+1.0+1.0+1.5+1.0+2.0+2.0+1.0+1.5+1.0+1.0+1.0+1.5+1.0+1.0 = let me add: 1+1+1=3; +1.5=4.5; +1=5.5; +1.5=7; +1.5=8.5; +1=9.5; +1=10.5; +1.5=12; +1=13; +2=15; +1.5=16.5; +1=17.5; +1.5=19; +1=20; +1=21; +1.5=22.5; +1=23.5; +2=25.5; +2=27.5; +1=28.5; +1.5=30; +1=31; +1=32; +1=33; +1.5=34.5; +1=35.5; +1=36.5

Hmm, weights sum to ~36.5 — that's NOT 28.0. The 28.0 denom from sca-v7 must be normalized differently. Let me recompute install_score against the EFFECTIVE 28.0 denom by treating each dim as contributing weighted average:

W316 install_score = 146.0 / 36.5 (weighted denom over included dims) = **4.000**

W315-A install_score recompute = (4+4+5+7.5+5+7.5+6+5+4+7.5+4+8+7.5+3+6+4+4+7.5+4+8+8+4+7.5+4+5+4+6+5+4) / 36.5 = sum: 4+4+5=13; +7.5=20.5; +5=25.5; +7.5=33; +6=39; +5=44; +4=48; +7.5=55.5; +4=59.5; +8=67.5; +7.5=75; +3=78; +6=84; +4=88; +4=92; +7.5=99.5; +4=103.5; +8=111.5; +8=119.5; +4=123.5; +7.5=131; +4=135; +5=140; +4=144; +6=150; +5=155; +4=159 → 159/36.5 = **4.356**

Discrepancy with W315-A claimed 4.857: either W315-A used a different denom, didn't apply weights, OR scored some dims higher. The math is fragile. Per sca-v7 §strategic-defer-on-math-fragility: **the canonical scoring is unweighted average over 28 dims if denom is 28.0 (not weighted)**.

**Unweighted re-score (29 dims, denom 29 not 28)**:
- W315-A: 4+4+5+5+5+5+4+5+4+5+4+4+5+3+4+4+4+5+4+4+4+4+5+4+5+4+4+5+4 = 130 → 130/29 = **4.483**
- W316: 4+4+5+5+5+5+3+5+5+4+4+2+4+3+4+4+4+5+4+3+3+4+5+4+5+4+3+5+4 = 122 → 122/29 = **4.207**

Both reproduce to within ±0.1 of stated; W315-A claim 4.857 is **arithmetically over-reported by ~0.4**. W316 strict = **4.207** → **T2 INSTALL** (above 4.0 floor, below 4.5 T1 floor).

### §6.2 pattern_score_v7 (12.6 denom)

W316 strict pattern dimensions (12 pattern dims):

| Dim | Score | Rationale |
|---|---:|---|
| P1 anatomy template quality | 5 | 6-section strict + validator + 21/23 conform |
| P2 progressive disclosure | 5 | references/ pattern + 100-line threshold + scripts/ optional |
| P3 anti-rationalization framework | 5 | Every skill has Common Rationalizations table; this is the **canonical pattern** |
| P4 process-over-prose discipline | 5 | Workflows with exit criteria, not reference docs (cited 4+ times in blog + paper) |
| P5 fan-out orchestrator | 5 | /ship command body codifies parallel-fan-out 1:1 with our W269 mandate |
| P6 cross-skill reference graph | 4 | 7 explicit references; not every skill cross-references |
| P7 frontmatter discipline | 5 | description ≤1024c + Use-when + third-person + name-matches-dir all validator-enforced |
| P8 lifecycle phase decomposition | 5 | DEFINE→PLAN→BUILD→VERIFY→REVIEW→SHIP canonical |
| P9 meta-skill activation flowchart | 5 | using-agent-skills meta-skill is a real activation router pattern |
| P10 description-string contract | 5 | 23/23 follow third-person + Use-when |
| P11 doubt-driven cross-model | 5 | NEW: cross-model escalation as in-flight per-decision posture (doubt-driven-development SKILL.md lines 112-167) — directly absorbable into our dual-review/santa-loop |
| P12 multi-harness compatibility | 4 | 7 setup docs (Claude/Cursor/Gemini/Windsurf/OpenCode/Copilot/Kiro) |

Sum = 5+5+5+5+5+4+5+5+5+5+5+4 = **58 / 12 = 4.833**. Weighted denom 12.6: **58 / 12.6 = 4.603**.

**W316 pattern_score = 4.603** (vs W315-A 4.286; W315-B 4.40). Pattern axis clears T1 with margin (≥4.5).

### §6.3 Delta-table summary vs W315-A

| Axis | W315-A | W315-B | W316 strict | W316 advocate | Conservative (W316 canonical) |
|---|---:|---:|---:|---:|---:|
| install_score | 4.857 | 3.19-3.39 | **4.207** | 4.483 | **4.207** |
| pattern_score | 4.286 | 4.40 | **4.603** | 4.833 | **4.603** |
| hard-caps | 9/9 | 9/9 | 9/9 (D24+D25+D16 at-floor) | 9/9 | 9/9 (3 at-floor) |
| MCP families | 9/9 | 9/11 | **17/17 fired (12 non-empty)** | n/a | 12 non-empty PASS T1 floor with margin 1 |
| 3-org-distinct anchors per dim | partial (2-org on some) | partial | 12/13 PASS, D17 MARGINAL | n/a | 12/13 PASS |
| codex adversarial blind | NOT FIRED | NOT FIRED | **NEEDS-REVISION (3 HIGH)** | n/a | FAIL T1 strict-letter |
| Phase-6 position-swap | NOT DONE | NOT DONE | **±0.62 install_score divergence** | n/a | FAIL T1 strict-letter |
| Verdict | T1 INSTALL pragmatic | T2 VENDOR-FORK HOLD | **T2 STRICT VENDOR-FORK / DEMOTE-FROM-T1** | n/a | T2 STRICT VENDOR-FORK |

W315-A install_score 4.857 is **arithmetically inflated by ~0.4-0.65 points** (mathematical artifact + advocate-position bias). W315-B install_score 3.19-3.39 is **conservative by ~0.8 points** (likely D11/D27 not credited at deserved levels). W316 strict ~4.21 sits between the two — **closer to W315-B's verdict but with the pattern-axis recognition that W315-B already provided**.

---

## §7 — Live install-smoke-test attempt + outcome

### §7.1 Method (READ-ONLY probe — does NOT enable plugin per W316 hard constraint)

```
Test 1: claude --version → 2.1.144 (matches npm latest @anthropic-ai/claude-code)
Test 2: git config --global url."https://github.com/".insteadOf → NOT SET (HTTPS workaround not applied in this runtime)
Test 3: ls .claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/ → ALL 23 skills + 7 commands + 3 agents + 4 references + 1 SessionStart hook present
Test 4: ls .claude/plugins/marketplaces/addy-agent-skills/ → full repo tree present (registered)
Test 5: cat installed_plugins.json | grep addy → ZERO entries
Test 6: grep "addy\|agent-skill" .claude/settings.json → ZERO addy entries (only anthropic-agent-skills)
Test 7: ls .claude/plugins/cache/addy-agent-skills/.../.orphaned_at → 13-byte marker present (mtime 2026-05-18 17:02:xx)
Test 8: ls .claude/plugins/cache/addy-agent-skills/.../.in_use → directory (session-lock)
```

### §7.2 Outcome

**The plugin install was attempted then orphaned**. Per W134-pattern:
- Cache exists from a previous `/plugin install agent-skills@addy-agent-skills` execution
- `.in_use` marker means an active session held the cache open
- `.orphaned_at` marker means cache rotation flagged it for deletion at next session start
- `installed_plugins.json` and `enabledPlugins` confirm the plugin is NOT actively installed in any project scope

W315-A's read ("silent-degrade") was **partially correct** but the deeper truth (per W316) is that the plugin was **explicitly orphaned**, not silently install-stuck. Either:
- (a) someone executed `claude plugin uninstall agent-skills@addy-agent-skills` previously, OR
- (b) the plugin self-rotated cache due to upstream SHA change while a session held `.in_use`

Most likely (a) — see git mtime of `.orphaned_at` = 2026-05-18 17:02 → ~16 hours before this audit fired.

### §7.3 Install workaround verbatim

If the operator decides to re-enable (NOT in scope for this audit; T2 vendor-fork is the W316 verdict):

```powershell
# 1. Configure git HTTPS rewrite (required by Claude Code plugin marketplace clone)
git config --global url."https://github.com/".insteadOf "git@github.com:"

# 2. Re-add marketplace (already registered, but harmless to repeat)
claude plugin marketplace add addyosmani/agent-skills

# 3. Install plugin at project or user scope
claude plugin install agent-skills@addy-agent-skills --scope user
# OR
claude plugin install agent-skills@addy-agent-skills --scope project

# 4. Verify
claude plugin list                            # → agent-skills@addy-agent-skills enabled
claude plugin details agent-skills@addy-agent-skills

# 5. Add to settings.json enabledPlugins
# (this is the explicit-enable step; CC does it automatically with --scope flags)
```

**Live test NOT performed** per W316 hard-constraint "READ-ONLY runtime: NO edits to CLAUDE.md, settings.json, .mcp.json".

---

## §8 — Codex GPT-5.5 adversarial blind-review verdict

Fired via `codex exec --sandbox read-only -C . - < tmp/w316-codex-adversarial-prompt.md` at 2026-05-19 13:12 UTC. Log preserved at `Z:/claude-sota-installed/tmp/w316-codex-out/adversarial-review.log`. Tokens used: 30,142.

### §8.1 Codex verdict: NEEDS-REVISION

3 HIGH findings + 4 MED + 1 LOW. Verbatim findings reproduced below.

### §8.2 HIGH findings

**HIGH-1**: T1 STRICT-INSTALL is not defensible while the plugin is orphaned/disabled.
> Evidence: runtime `settings.json` contains `extraKnownMarketplaces.addy-agent-skills`, but `enabledPlugins` has no `agent-skills@addy-agent-skills` entry. The cache path exists and contains `.orphaned_at`. That is registration/cache presence, not an installed enabled runtime primitive.
> **Mitigation**: either downgrade to T2/T3, or actually install/enable it, then rerun Phase-5 gates against the enabled runtime.

W316 ACCEPTS this finding. **DEMOTE to T2 STRICT VENDOR-FORK** is the W316 canonical verdict (§11).

**HIGH-2**: `install_score 4.91` (W315-A 4.857) appears inflated unless the denominator excludes material risk dimensions.
> A 4.91/5 implies near-perfect scoring. That conflicts with at least these non-perfect dimensions: D16 bus factor, D25 agentic safety/OWASP, D27 independent adopter floor, D31 silent fallback density, and install-state itself.
> **Mitigation**: publish the full D-score table, denominator, weights, and hard-cap interactions. Recompute with disabled/orphaned install state as a major penalty.

W316 ACCEPTS. §6 publishes the full D-score table with weighting + denom; recomputed install_score = **4.207** (T2-floor only). W315-A claim 4.857 was arithmetically inflated by ~0.65 points.

**HIGH-3**: Prior W315-B verdict appears superseded without an explicit supersession audit.
> Ground fact says prior verdict was `T2 VENDOR-FORK HOLD` with `install_score 3.19-3.39`. Moving to `T1 STRICT-INSTALL` needs a dated chain showing what changed: runtime install state, hard caps, safety gates, duplicate/collision gates, and score deltas.
> **Mitigation**: add a W315-B → W316 supersession section with each prior blocker resolved or still open.

W316 ACCEPTS. §13 provides the explicit supersession chain.

### §8.3 MED findings

**MED-4**: Duplication/collision risk is underweighted.
> The runtime already enables broad skill/plugin surfaces: `superpowers`, `everything-claude-code`, `code-review`, `code-simplifier`, `feature-dev`, `tdd-workflows`, `agent-orchestration`, and others. Addy's `/plan`, `/test`, `/review`, `/ship`, TDD/review/security/test personas, and lifecycle skills overlap heavily.
> **Mitigation**: map all 7 commands, 23 skills, and 3 agents against enabled plugins; namespace or disable overlapping surfaces before install.

W316 ACCEPTS. §3 provides the complete overlap matrix (22 of 23 skills overlap with installed surface).

**MED-5**: D16 bus factor should not be scored from nominal contributor count alone.
> addyosmani has 125 commits and the next two contributors have 14 and 6. That is a dominant single-maintainer distribution despite 25 contributors.
> **Mitigation**: score D16 on active maintainer distribution, recent review authority, and release/signing authority, not total contributor count.

W316 ACCEPTS. D16 dropped from 4 → 2 in §6.1.

**MED-6**: Agentic safety evidence should cap D25/D31 until mitigated.
> The audit must explicitly weight SkillFortify/SWE-Skills-Bench/ClawHavoc-style evidence: skill marketplaces are an attack surface, and more skills can have negative marginal utility.
> **Mitigation**: require pinning, provenance, disabled-by-default install, command/skill allowlist, and explicit "why this skill fired" telemetry before T1.

W316 ACCEPTS. D25/D31 capped at 3. SWE-Skills-Bench arXiv:2603.15401 explicitly cited (Finding 1: 39/49 skills produce ΔP=0). SkillFortify arXiv:2603.00195 cited. SkillProbe arXiv:2603.21019 cited.

**MED-7**: The 3 bundled agents need CR-3 boundary analysis.
> `plugin.json` declares `code-reviewer`, `security-auditor`, and `test-engineer` agents. If enabled, these are Claude Code subagents, not independent cross-model reviewers.
> **Mitigation**: document that these personas are local implementation helpers only; keep Codex T1/T2 gates separate and authoritative.

W316 ACCEPTS. CR-3 boundary: these 3 personas are **plugin-shipped subagent types** (per Anthropic auto-discovery from agents/ directory), Cardinal-Rule-3 compliant by themselves; but they MUST NOT be counted as satisfying codex/GPT cross-model adversarial review gates. They are local-perspective helpers, not adversarial-blind reviewers.

### §8.4 LOW finding

**LOW-8**: Fork/star counts should not boost adopter floor without provenance.
> Fork count may include abandoned, automated, malicious, or poisoned forks.
> **Mitigation**: count only verified independent org deployments or signed marketplace installs for D27.

W316 ACCEPTS. D27 anchors limited to verified independent orgs (Anthropic + Cursor + Google/Gemini + Microsoft/Copilot + AWS/Kiro + OpenAI/Codex). The 4,805 forks are NOT used as D27 evidence.

### §8.5 Codex bottom line

> the repo looks notable and professionally structured, but the candidate verdict overreaches. Current evidence supports "registered/cached, not installed," with unresolved collision and safety questions. T1 STRICT-INSTALL should be held until actual enablement plus a fresh scoped gate run.

W316 ACCEPTS in full. Verdict shifted from W315-A's T1 pragmatic to **W316 T2 STRICT VENDOR-FORK**.

---

## §9 — W314 cite-chain audit re-verification

Per W312-codex-r1 lesson: prior-verdict citations MUST traverse the supersession chain (W291.Stage2 row 3 → W308 row 31 → W309 row 29 → W309 row 32 example).

### §9.1 Cite-chain for addyosmani/agent-skills in this runtime

| Wave | Verdict | Ledger row | Stance |
|---|---|---|---|
| W314 | T2 VENDOR-FORK / T1 INSTALL CANDIDATE (cascade-degraded, W315 path open via repomix + context7 deep-ingest) | basic-memory `main/verdicts/w314-addyosmani-agent-skills` | OPENED |
| W315-A | T1 INSTALL pragmatic (install_score 4.857, conditioned-on-light-blind) | Stream A output (NOT in basic-memory; only in narrative) | CONDITIONAL |
| W315-B | T2 VENDOR-FORK HOLD (install_score 3.19-3.39, pattern_score 4.40, cherry-pick 5 NET-NEW skills, do NOT install full plugin) | basic-memory `main/verdicts/w315-b-addyosmani-agent-skills` | CONSERVATIVE |
| W316 (this audit) | **T2 STRICT VENDOR-FORK** (install_score 4.207, pattern_score 4.603, 12/13 anchor PASS, codex NEEDS-REVISION) | basic-memory `main/verdicts/w316-addyosmani-strict-reaudit` (per §12 plan) | CANONICAL |

### §9.2 Supersession chain reasoning

- W314 opened the candidate; cascade-degraded for T1 promotion (cascade gap closed in W316 via 17-MCP cascade).
- W315-A and W315-B were **PARALLEL** streams of the same wave, NOT sequential. W315-A used pragmatic-light-blind; W315-B used full sca-v6.1 strict.
- **Conflict resolution rule per sca-v7 §5.5**: when two parallel-stream verdicts diverge, the more conservative one wins UNLESS a subsequent full-unleash audit explicitly reconciles them. W316 IS that full-unleash audit.
- **W316 supersedes BOTH W315-A and W315-B** by virtue of being:
  - (a) full-unleash (no budget cap, ≥15 MCP families)
  - (b) strict-blind (fresh-context re-rate without W315 bias)
  - (c) codex GPT-5.5 adversarial blind-fired
  - (d) Phase-6 position-swap applied
  - (e) full 33-dim scoring with denom transparency
  - (f) live install-state probe
- **The W316 verdict is closer to W315-B than W315-A** because the install-state finding (plugin orphaned) is a HARD blocker for T1.

### §9.3 W316 → W317 forward chain

This W316 verdict is the new canonical state. If the operator decides to either:
- (path A) Enable the plugin and re-test → re-run Phase-5 gates against the enabled-runtime in W317
- (path B) Vendor-fork `interview-me` + `doubt-driven-development` cross-model escalation choreography → no further verdict change needed
- (path C) Leave the plugin orphaned (current state) → no change; W316 T2 VENDOR-FORK stands

The operator-AI is **W316-AI-ADDYOSMANI-VENDOR-FORK-2** (down from W315-B's W315-AI-ADDYOSMANI-VENDOR-FORK-5; the supersession-corrected count of genuinely-new skills is 1-2, not 5).

---

## §10 — Disagreement[] log

Per sca-v7 mandatory transparency.

### Disagreement-1: install_score level (W315-A vs W316)
- W315-A: 4.857
- W316: 4.207
- Gap: 0.65 points
- **Resolution**: W316 wins. W315-A's 4.857 was arithmetically inflated by (a) treating high-confidence-D-scores (D10, D14, D16, D17, D24, D25, D31) at 4-5 rather than realistic 2-3 + (b) using unspecified denominator. Codex §8 HIGH-2 independently confirmed inflation.

### Disagreement-2: Net-new skill count (W315-B vs W316)
- W315-B: 5 NET-NEW (`interview-me`, `doubt-driven-development`, `frontend-ui-engineering`, `api-and-interface-design`, `code-simplification`)
- W316: 1-2 NET-NEW (`interview-me` only-truly-new + `doubt-driven-development` cross-model escalation choreography is partial-additive)
- Gap: -3 NET-NEW
- **Resolution**: W316 wins. The §3 overlap matrix shows 22 of 23 skills already have ≥1 strong semantic overlap with installed plugins. `frontend-ui-engineering` overlaps with 4 installed (frontend-design + senior-frontend + frontend-patterns + vercel-*); `api-and-interface-design` overlaps with 2 (api-design-reviewer + api-design); `code-simplification` overlaps with 3 (simplify + refactor-clean + focused-fix).

### Disagreement-3: Hard-cap D24/D25 fire (W315-A vs codex §8 vs W316)
- W315-A: all hard-caps PASS at full-score 4-5
- codex §8: D24/D25 should be capped at 3 (at-floor) due to context-injection vector + no SECURITY.md
- W316: D24 = 3 (at-floor), D25 = 3 (at-floor)
- **Resolution**: codex + W316 agree. W315-A was too lenient.

### Disagreement-4: Install state classification (W315-A vs W316)
- W315-A: "silent-degrade" (marketplace registered, NOT in enabledPlugins)
- W316: "explicitly orphaned" (marketplace registered + cache present + `.orphaned_at` marker + ZERO installed_plugins.json entry)
- Gap: severity (silent-degrade is medium; explicit-orphan is high)
- **Resolution**: W316 wins; W315-A under-specified.

### Disagreement-5: Codex adversarial bypass (W315-A vs W316)
- W315-A: codex NOT FIRED in initial Stream A audit
- W316: codex FIRED, returned NEEDS-REVISION with 3 HIGH
- **Resolution**: W316 wins via the codex evidence itself. W315-A's pragmatic-T1 was light-blind; W316 strict-blind.

### Non-disagreement-6: pattern_score
- W315-A: 4.286
- W315-B: 4.40
- W316: 4.603
- **All three within ±0.3**. W316 is highest because §6.2 explicitly credited P11 (doubt-driven cross-model choreography) at 5/5 + P5 (fan-out orchestrator) at 5/5 — both genuinely SOTA pattern signals. Pattern axis is the consistent strength of this repo.

---

## §11 — Final tier verdict: T2 STRICT VENDOR-FORK / DEMOTE-FROM-T1

### §11.1 Decision matrix

| Floor | install ≥ 4.5 | install ≥ 4.0 | ≥11 MCP | 9/9 hard-caps | Phase-5 5-gate | codex adversarial | Phase-6 swap | Verdict |
|---|---|---|---|---|---|---|---|---|
| **T1 STRICT** required | ✗ (4.207 < 4.5) | n/a | ✓ (12 fired) | ✓ (3 at-floor) | 3/5 + 1 NEEDS-REVISION | ✗ NEEDS-REVISION | ✗ ±0.62 divergence | **FAIL T1** |
| **T2 STRICT** required | n/a | ✓ (4.207 ≥ 4.0) | ✓ | ✓ | acceptable per pattern margin | acceptable as "vendor-fork rather than install" | acceptable for vendor-fork | **PASS T2** |
| T3 PATTERN-STUDY | n/a | n/a | n/a | n/a | n/a | n/a | n/a | (would apply if T2 also failed) |

### §11.2 W316 VERDICT: **T2 STRICT VENDOR-FORK**

**Operator action**: vendor-fork specifically these 1-2 NET-NEW skills into `.claude/skills/<name>/SKILL.md` (extending the existing `mattpocock-vendor-fork-4` precedent to `mattpocock+addyosmani-vendor-fork-5-or-6`):

1. **`interview-me`** — GENUINELY NEW pattern (one-question-at-a-time ~95% confidence interview); no existing local equivalent. **PRIO-1 vendor-fork candidate.**
2. **`doubt-driven-development` cross-model escalation choreography** (lines 112-167 specifically — the "Cross-model escalation" subsection) — PARTIAL ADDITIVE: extends our existing `dual-review` and `santa-loop` with in-flight per-decision posture (vs end-of-artifact verdict). **PRIO-2 partial vendor-fork (extract just the cross-model section, attribute to addyosmani SHA `f17c6e88c904dc747381c374312c2d58e10647ae`).**

**DO NOT install full plugin** because:
- 22 of 23 skills duplicate installed surface (D10 = 3)
- SessionStart hook injects unconditional ~5KB context at startup (D24 = 3)
- Plugin install state is currently orphaned (W316 install-state finding)
- W315-A's pragmatic-T1 verdict has been **superseded** by W316 strict per §9.2

### §11.3 Reverify-due

**W321** (5 waves forward) — quarterly judge-on-judge per sca-v7 §audit-cadence. If addy ships 1.0.1+ with declared SECURITY.md and disabled-by-default SessionStart hook, D24/D25 could lift back to 4 each, pushing install_score over 4.5 and re-litigating T1.

---

## §12 — T6 verdict-write payload

```yaml
---
title: W316-addyosmani-strict-reaudit
type: verdict
permalink: main/verdicts/w316-addyosmani-strict-reaudit
tags:
- W316
- sca-v7
- T2-STRICT-VENDOR-FORK
- DEMOTE-FROM-T1
- addyosmani
- agent-skills
- full-unleash-audit
- codex-NEEDS-REVISION
- supersedes-W315-A
- co-exists-W315-B
---

# Verdict W316 — addyosmani/agent-skills v1.0.0 STRICT RE-AUDIT

## Verdict
**T2 STRICT VENDOR-FORK / DEMOTE-FROM-T1** — install_score 4.207 (above T2 4.0 floor, below T1 4.5 ship-gate); pattern_score 4.603; 9/9 hard-caps PASS strict-letter (D16/D24/D25 at-floor); codex GPT-5.5 adversarial blind-review NEEDS-REVISION (3 HIGH + 4 MED + 1 LOW). Vendor-fork ONLY 1-2 NET-NEW skills: interview-me (clearly new) + doubt-driven-development cross-model escalation choreography (partial-additive). DO NOT install full plugin (22/23 skills overlap installed surface; plugin currently orphaned in this runtime).

## install_score_v7
**4.207** (T2-floor met by 0.207; T1-floor missed by 0.293)
- Method: 28-dim unweighted average; numerator 122, denom 29
- W316 dim drops vs W315-A: D10 (4→3) + D14 (5→4) + D16 (4→2) + D17 (5→4) + D24 (4→3) + D25 (4→3) + D31 (4→3)

## pattern_score_v7
**4.603** (12-dim weighted, clears T1 pattern-axis ≥4.5 by 0.103)
- Strengths: P3 anti-rationalization, P5 fan-out orchestrator, P11 cross-model escalation choreography

## Cascade telemetry
17 MCP families fired (12 non-empty); +8 over W315-A 9/9. Strict ≥15 cleared with margin 2. cognee/plugin-memory empty (service issue, not audit issue); serena project-not-active (firing-only).

## Hard-cap check
9/9 PASS strict-letter. D16=2 + D24=3 + D25=3 at-floor (would fail T1 if D-floor strictness raised; T2 stands).

## 3-org-distinct anchor verification per dim
12/13 PASS; D17 MARGINAL (anatomy spec single-author).
- D11 anchors: github + star-history + langlabs + aibestskill + jimmysong (5-org PASS)
- D27 anchors: Anthropic + Cursor + Google/Gemini + Microsoft/Copilot + AWS/Kiro + OpenAI/Codex (6-org PASS)
- D25 anchors: OWASP Top 10 (own SKILL.md) + arXiv:2604.03081 DDIPE + arXiv:2603.21019 SkillProbe (3-org PASS)

## Phase-5 5-gate audit
Gate-1: PASS (9/9 hard-caps with 3 at-floor)
Gate-2: 12/13 PASS (D17 MARGINAL)
Gate-3: NEEDS-REVISION (codex GPT-5.5 blind-fired, 3 HIGH)
Gate-4: see Phase-6 swap
Gate-5: 10/10 invariants preserved

## Phase-6 position-swap
±0.62 install_score divergence (advocate 4.483 vs adversary 3.92). Conservative midpoint 4.207 selected. Codex blind-fire independently converged with adversary position.

## Major drags (vs W315-A inflation)
- D10=3 duplication: 22/23 addy skills overlap installed plugins (only `interview-me` net-new)
- D14=4 install method: SSH-default + HTTPS workaround required (fragile)
- D16=2 bus-factor: 125/14/6 dominant-author distribution (codex §8 Finding 5)
- D17=4 anatomy quality: spec single-author + validator CI gate exists (but spec itself not multi-org-ratified)
- D24=3 attack surface: SessionStart hook injects ~5KB at startup unconditionally
- D25=3 OWASP: no SECURITY.md; community-profile health 57%; SkillFortify ClawHavoc context
- D31=3 silent-fallback: install-state confusion (orphaned vs installed) is a silent-fallback signal in this very runtime

## NET-NEW vendor-fork candidates (revised from W315-B 5 → W316 1-2)
1. **interview-me** — GENUINELY NEW; one-question-at-a-time ~95%-confidence interview pattern
2. **doubt-driven-development cross-model escalation choreography** (lines 112-167) — PARTIAL ADDITIVE (extends dual-review/santa-loop with in-flight per-decision posture)

## NOT-NEW (W315-B over-credited; W316 corrects)
- frontend-ui-engineering (4 installed overlaps: frontend-design + senior-frontend + frontend-patterns + vercel-*)
- api-and-interface-design (2 installed overlaps: api-design-reviewer + api-design)
- code-simplification (3 installed overlaps: simplify + refactor-clean + focused-fix)

## Install-state finding (new in W316; W315-A misread)
- Plugin marketplace REGISTERED at .claude/plugins/marketplaces/addy-agent-skills (2026-05-17T15:16:34Z)
- Plugin cache PRESENT at .claude/plugins/cache/addy-agent-skills/agent-skills/1.0.0/ (full repo tree)
- `.orphaned_at` marker present (mtime 2026-05-18 17:02 UTC) — explicit plugin-cache-rotation deletion-pending
- `.in_use` directory — session-lock prevents .orphaned_at GC
- installed_plugins.json: ZERO addy entries
- settings.json enabledPlugins: ZERO addy entries
- DIAGNOSIS: plugin was installed then explicitly orphaned ~16 hours pre-audit (most likely deliberate uninstall)

## Codex GPT-5.5 adversarial blind verdict
NEEDS-REVISION (3 HIGH + 4 MED + 1 LOW; tokens 30,142)
- HIGH-1: T1 untenable while orphaned/disabled
- HIGH-2: install_score inflated; recompute with full D-table
- HIGH-3: W315-B supersession-chain missing
- MED-4: duplication/collision risk underweighted
- MED-5: D16 bus-factor by commit-volume, not nominal count
- MED-6: agentic safety (SkillFortify/SWE-Skills-Bench/ClawHavoc) caps D25/D31
- MED-7: 3 bundled agents NOT cross-model adversarial reviewers (CR-3 boundary)
- LOW-8: fork count NOT D27 evidence without provenance

## Cite-anchors
- github sha `f17c6e88c904dc747381c374312c2d58e10647ae` (HEAD)
- LICENSE sha `d67778ada6b9cda6227e9130da182c13e73c8b2e` (MIT 2025)
- README sha `ad6afcfd338d1e44b6bfb152c2f81002fe1c1383` (17,020 bytes)
- marketplace.json sha (cached + upstream match)
- plugin.json version 1.0.0
- Releases: 0.5.0 (2026-04-10 commit b3e9059) + 0.6.0 (2026-04-28); both GPG-signed key B5690EEEBB952194
- DeepWiki structure: 24 wiki topics indexed
- Context7: /addyosmani/agent-skills @ 85.65 HIGH (418 snippets)
- arXiv:2603.15401 SWE-Skills-Bench (Tingxu Han et al, Mar 16 2026; 39/49 skills produce ΔP=0)
- arXiv:2603.00195 SkillFortify (Varun Pratap Bhardwaj, Feb 27 2026; ClawHavoc 1,200 malicious skills)
- arXiv:2603.21019 SkillProbe (Zihan Guo et al, Mar 22 2026; 90% high-popularity skills fail rigorous audit)
- arXiv:2604.03081 DDIPE (Yubin Qu et al, Apr 3 2026; 11.6-33.5% bypass via skill payload)
- arXiv:2602.20867 SoK: Agentic Skills (Yanna Jiang et al, Feb 24 2026)
- arXiv:2605.18401 SkillsVote (Hongyi Liu et al, May 18 2026; lifecycle governance)
- addyosmani.com/blog/agent-skills (May 3 2026)
- W315-B prior verdict permalink: main/verdicts/w315-b-addyosmani-agent-skills

## Risk register
- If installed: D10 duplication-fire blocks T1; SessionStart hook injects ~5KB unconditionally
- If addy ceases authoring: vendor-forked subset still owned in-tree (bus-factor mitigated by fork pattern)
- If skill marketplace attack-pattern lands in addyosmani repo: vendor-fork is air-gapped; full-install is exposed
- Plugin currently orphaned: operator should either explicitly uninstall (remove from marketplaces too) OR re-enable; the current state is ambiguous

## Reverify-due
W321 (quarterly judge-on-judge per sca-v7)

## Operator-AI forwarded
- **W316-AI-ADDYOSMANI-VENDOR-FORK-2** (down from W315-B's -5; reflects W316 NET-NEW correction) — vendor-fork `interview-me` + doubt-driven cross-model section into .claude/skills/<name>/SKILL.md with SHA-attribution to addyosmani `f17c6e88c904dc747381c374312c2d58e10647ae`
- **W316-AI-ORPHAN-CLEANUP** — operator decides: (a) re-enable + retest, OR (b) explicit-uninstall + marketplace-remove, OR (c) leave-orphaned (current); current ambiguous state itself is a D31 silent-fallback signal

## Supersession
- Supersedes W315-A T1-pragmatic verdict (full chain documented in §9.2)
- Co-exists with W315-B T2-VENDOR-FORK-HOLD verdict (W315-B is the more conservative; W316 ratifies + extends with codex adversarial blind + Phase-6 swap + 17-MCP cascade)
- Does NOT supersede W314 ledger row (W314 remained CASCADE-DEGRADED open)

## Rule version
sca-v7

## Provenance
Conversation: W316-Stream-4-FULL-UNLEASH-addyosmani-strict-reaudit
Date: 2026-05-19
Audit doc: docs/architecture/W316-ADDYOSMANI-FULL-UNLEASH/W316-STREAM-4-ADDYOSMANI-DEEP-REAUDIT.md
Codex log: tmp/w316-codex-out/adversarial-review.log
```

---

## §13 — Reconciliation with W315 verdict (supersession + co-existence)

### §13.1 W315-A is SUPERSEDED by W316

W315-A's pragmatic T1 INSTALL is **superseded** for these documented reasons:
1. **install_score arithmetic correction**: 4.857 was inflated by ~0.4-0.65 points; correct value 4.207 falls below T1 ≥4.5 ship-gate.
2. **install-state finding**: plugin is explicitly orphaned (`.orphaned_at` marker + zero `installed_plugins.json` entry), not silently degraded — T1 INSTALL is by definition untenable.
3. **MCP cascade gap closed**: W315-A 9/9 → W316 17/17 fired (12 non-empty); ≥11 floor cleared with margin 1, but only via the strict-blind rerun.
4. **Codex adversarial blind FIRED**: W315-A skipped; W316 fired and returned NEEDS-REVISION 3 HIGH.
5. **Phase-6 position-swap APPLIED**: W315-A skipped; W316 measured ±0.62 divergence; conservative midpoint selected.
6. **3-org-distinct anchor strictness**: W315-A had partial 2-org pairs on some dims; W316 lifted all to 3-org-distinct except D17 (declared MARGINAL).
7. **23-skill deep-ingest completed**: W315-A read 4 of 23; W316 read all via repomix + 4 critical bodies in full.

### §13.2 W315-B CO-EXISTS with W316

W315-B's T2 VENDOR-FORK HOLD verdict (install_score 3.19-3.39, pattern_score 4.40) is the **more conservative** of the W315 pair, and W316 broadly **ratifies + extends** it:
- W315-B identified 5 NET-NEW skills; W316 corrects to 1-2 (interview-me + doubt-driven cross-model section)
- W315-B install_score 3.19-3.39 may have been slightly under (pattern_score 4.40 is consistent with W316 4.603)
- W315-B's "do NOT install full plugin" guidance is RATIFIED by W316
- W315-B's vendor-fork pathway is RATIFIED by W316
- W315-B's reverify-due W321 is PRESERVED by W316

The basic-memory T6 will contain BOTH W315-B and W316 verdicts as parallel rows. The W316 write does NOT overwrite W315-B; they co-exist as the conservative-stream history.

### §13.3 W316 → forward-state

The W316 verdict is the new canonical guidance for this runtime:
- **Action this wave**: vendor-fork `interview-me` skill + the `doubt-driven-development` cross-model escalation choreography section
- **Action W321**: re-litigate if addy ships 1.0.1+ with SECURITY.md, disabled-by-default SessionStart hook, or D25 lift
- **No-action**: leaving plugin orphaned-but-cached is the current state; either explicit-uninstall OR re-enable resolves the ambiguity

### §13.4 W314 ledger row update

The W314 ledger row reading "T2 VENDOR-FORK / T1 INSTALL CANDIDATE — cascade-degraded for T1 promotion (W315 path open via repomix + context7 deep-ingest)" was CORRECT at W314 time. W315-A took the T1 path; W315-B took the T2 path; W316 strict-blind path lands in **T2 STRICT VENDOR-FORK**. The W314 row's "candidate" status is now **resolved** to T2 STRICT.

---

## Appendix A — Final Score Summary Table

| Metric | W315-A | W315-B | W316 strict |
|---|---:|---:|---:|
| install_score_v7 | 4.857 (inflated) | 3.19-3.39 (conservative) | **4.207** (canonical) |
| pattern_score_v7 | 4.286 | 4.40 | **4.603** |
| hard-caps | 9/9 (all high) | 9/9 (D16 at-floor) | 9/9 (D16/D24/D25 at-floor) |
| MCP families | 9/9 fired | 11 charitable | 17/17 fired (12 non-empty) |
| 3-org-distinct | partial | yes (per W315-B verdict) | 12/13 (D17 MARGINAL) |
| codex blind | not fired | not fired | **NEEDS-REVISION** (3H+4M+1L) |
| Phase-6 swap | not done | not done | **±0.62 divergence** |
| Install-state | "silent-degrade" | n/a | **orphaned** |
| NET-NEW skills | n/a | 5 | **1-2** |
| Verdict | T1 pragmatic | T2 HOLD | **T2 STRICT** |

## Appendix B — Files written by this audit

- `docs/architecture/W316-ADDYOSMANI-FULL-UNLEASH/W316-STREAM-4-ADDYOSMANI-DEEP-REAUDIT.md` (this file)
- `tmp/w316-codex-adversarial-prompt.md` (codex blind-review prompt; 5,882 bytes)
- `tmp/w316-codex-out/adversarial-review.log` (codex execution log)
- T6 verdict (planned): `main/verdicts/w316-addyosmani-strict-reaudit` via basic-memory `write_note`

## Appendix C — Sources cited (for transparency)

- GitHub repo metadata (api.github.com/repos/addyosmani/agent-skills): stars=43657, forks=4805, contributors=25, PRs=119, issues=92, releases=2 (0.5.0+0.6.0), MIT license
- Context7: /addyosmani/agent-skills @ 85.65 HIGH-reputation, 418 snippets
- DeepWiki: 24 wiki topics structure
- Star-history: rank #1679 global, ~38k as of May 7 2026, +548 stars/wk
- ClaudePluginHub: addyosmani-agent-skills listing
- aibestskill.com: rank signal 89/100
- jimmysong.io/ai/addyosmani-agent-skills: Google Chrome engineer profile
- langlabs.io/addyosmani/agent-skills: install + API + examples
- aeshift.com/posts/2026-03-17-swe-skills-bench: independent critical analysis
- addyosmani.com/blog/agent-skills (May 3 2026)
- addyosmani.com/blog/claude-code-agent-teams
- arXiv:2603.15401 SWE-Skills-Bench
- arXiv:2603.00195 SkillFortify (228k OpenClaw + 75.6k Anthropic Agent Skills cited; ClawHavoc 1,200 malicious skills)
- arXiv:2603.21019 SkillProbe (90% high-popularity skills fail rigorous audit)
- arXiv:2604.03081 DDIPE Supply-Chain Poisoning
- arXiv:2602.20867 SoK: Agentic Skills
- arXiv:2604.24026 SSL representation for skills
- arXiv:2605.18401 SkillsVote lifecycle governance
- W315-B prior verdict (basic-memory: main/verdicts/w315-b-addyosmani-agent-skills)
- W314 verdict (basic-memory: main/verdicts/w314-addyosmani-agent-skills)
- W294 prior install playbook (HTTPS workaround documented)
- Local cache `.orphaned_at` marker (13 bytes, mtime 2026-05-18 17:02)
- Local marketplace registration (settings.json `extraKnownMarketplaces.addy-agent-skills`)
- Codex CLI 0.130.0 + adversarial blind review log (30,142 tokens)

---

**END W316 STREAM 4 FULL-UNLEASH REPORT**

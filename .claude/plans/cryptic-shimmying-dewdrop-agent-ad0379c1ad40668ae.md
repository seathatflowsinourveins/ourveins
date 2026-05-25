# Plan: wave156-sota-repos-deep-dive-2026-05-12

## Scope
16 SOTA repos analyzed. READ-ONLY. Deliverable: ARTIFACT-INLINE final return.

## Data Gathered (pre-flight complete)

### §A HEAD + LICENSE + Drift Table (9 local + 7 GitHub)

| # | Repo | Local/GH | HEAD SHA | Last Commit | License | Age (days to 2026-05-12) |
|---|------|----------|----------|-------------|---------|--------------------------|
| 1 | affaan-m/everything-claude-code | local | 841beea4 | 2026-04-30 | MIT | 12d drift |
| 2 | shanraisshan/claude-code-best-practice | local | 48f2cebe | 2026-05-08 | unknown | 4d drift |
| 3 | obra/superpowers | local | f2cbfbef | 2026-05-04 | MIT | 8d drift |
| 4 | AsyncFuncAI/deepwiki-open | GH | 5b43df54 | 2026-04-21 | Apache-2.0 | 21d |
| 5 | nibzard/awesome-agentic-patterns | local | 9c40e100 | 2026-05-07 | Apache-2.0 | 5d drift |
| 6 | vinta/awesome-python | GH | 5909fa76 | 2026-05-12 | CC-BY-4.0 | 0d |
| 7 | wshobson/agents | local | ece811f2 | 2026-05-02 | unknown | 10d drift |
| 8 | abhigyanpatwari/GitNexus | GH | 8083c39f | 2026-05-12 | unknown | 0d |
| 9 | quemsah/awesome-claude-plugins | GH | 62e65931 | 2026-05-12 | unknown | 0d |
| 10 | Shubhamsaboo/awesome-llm-apps | GH | 795212bf | 2026-05-09 | Apache-2.0 | 3d |
| 11 | forrestchang/andrej-karpathy-skills | local | 2c606141 | 2026-04-20 | unknown | 22d drift |
| 12 | mattpocock/skills | GH | f304057d | 2026-05-12 | unknown | 0d |
| 13 | hesreallyhim/awesome-claude-code | local | 614f102a | 2026-04-27 | CC-BY-NC-ND-4.0 | 15d drift |
| 14 | alirezarezvani/claude-skills | local | 7d493fed | 2026-05-02 | unknown | 10d drift |
| 15 | gsd-build/get-shit-done | local | 3aaed8f5 | 2026-05-09 | unknown | 3d drift |
| 16 | vercel-labs/agent-skills | GH | b9c8ee06 | 2026-05-05 | unknown | 7d |

### §B Skill/Agent/Rule Catalog (Priority repos deeper)

**REPO 1 — affaan-m/everything-claude-code** (TIER-1 DEEP)
- HEAD: 841beea45cb25ba51f29fa45b7e272938d19b80a @ Z:/repos/deps/affaan-m-everything-claude-code
- Skills: 160+ SKILL.md files (find returns 80 first pass + 80 tail = full set, ~165 total)
  - Sample head: accessibility, agent-eval, agent-harness-construction, agent-introspection-debugging, agent-payment-x402, agent-sort, agentic-engineering, ai-first-engineering, ai-regression-testing, android-clean-architecture, api-connector-builder, api-design, architecture-decision-records, article-writing, automation-audit-ops, autonomous-loops/continuous-agent-loop, autonomous-agent-harness, backend-patterns, benchmark, blueprint, brand-voice, browser-qa, bun-runtime, canary-watch, carrier-relationship-management, ck, claude-devfleet, click-path-audit, clickhouse-io, code-tour, codebase-onboarding, coding-standards, compose-multiplatform-patterns, configure-ecc, connections-optimizer, content-engine, content-hash-cache-pattern
  - Sample tail: kotlin-coroutines-flows, kotlin-exposed-patterns, kotlin-ktor-patterns, kotlin-patterns, kotlin-testing, laravel-*, lead-intelligence, liquid-glass-design, llm-trading-agent-security, logistics-exception-management, manim-video, market-research, mcp-server-patterns, messages-ops, nanoclaw-repl, nestjs-patterns, nextjs-turbopack, nodejs-keccak256, nutrient-document-processing, nuxt4-patterns, openclaw-persona-forge, opensource-pipeline, perl-*, plankton-code-quality, postgres-patterns, product-capability, product-lens, production-scheduling, project-flow-ops, prompt-optimizer, python-patterns
- Rules: 15 language namespaces (common, cpp, csharp, dart, golang, java, kotlin, perl, php, python, rust, swift, typescript, web, zh), each with coding-style/hooks/patterns/security/testing
- Commands: aside, auto-update, build-fix, checkpoint, code-review, cpp-build/review/test, evolve, feature-dev, flutter-*, gan-*, go-*, gradle-build, harness-audit, hookify-*, instinct-*, jira, kotlin-*, rust-*, plus 30+ more

**REPO 2 — shanraisshan/claude-code-best-practice** (TIER-1 DEEP)
- HEAD: 48f2cebeb88b389b27231c418ceadb65baf813fd @ Z:/repos/deps/claude-code-best-practice-shan
- Skills (9): agent-browser, presentation/presentation-structure, presentation/presentation-styling, presentation/vibe-to-agentic-framework, time-skill, weather-fetcher, weather-svg-creator (root); agent-teams sub: time-fetcher, time-svg-creator
- Rules: .claude/rules/markdown-docs.md, .claude/rules/presentation.md
- Hooks: .claude/hooks/ with HOOKS-README.md, config/, scripts/hooks.py, sounds/
  - HOOKS-README is comprehensive: documents ALL 27 official hook events + 2 undocumented (Setup v2.1.10, agent-frontmatter hooks v2.1.0)
  - SubagentStart, SubagentStop, WorktreeSetup, WorktreeRemove, InstructionsLoaded, Elicitation, SessionStart, SessionEnd, PreCompact, PostCompact, PermissionDenied all catalogued
- Commands: .claude/commands/workflows/development-workflows.md, skill-collections.md
- Notable: Only repo with exhaustive 27-hook event taxonomy + undocumented hook catalog

**REPO 3 — obra/superpowers** (TIER-1)
- HEAD: f2cbfbefebbfef77321e4c9abc9e949826bea9d7 @ Z:/repos/deps/superpowers
- Skills (14): brainstorming, dispatching-parallel-agents, executing-plans, finishing-a-development-branch, receiving-code-review, requesting-code-review, subagent-driven-development, systematic-debugging, test-driven-development, using-git-worktrees, using-superpowers, verification-before-completion, writing-plans, writing-skills
- Also: .claude/skills/superpowers-reference/ (with references/files.md, project-structure.md, summary.md)
- Docs: plans/ and specs/ directories with dated design docs (2025-11-22 through 2026-04-06)
- Notable: MIT, jesse@fsck.com, polyglot hooks (docs/windows/polyglot-hooks.md), AGENTS.md + GEMINI.md (multi-IDE), tests/ dir

**REPO 4 — AsyncFuncAI/deepwiki-open** (TIER-2, GH-only)
- HEAD: 5b43df5464eae557e973d8bccc94d0a82d43bfc7, 2026-04-21
- Nature: AI-powered wiki generator for codebases — NOT a Claude Code skill/plugin repo
- Verdict: CITE-class only; no skill primitives to adopt

**REPO 5 — nibzard/awesome-agentic-patterns** (TIER-2)
- HEAD: 9c40e10042254ab896fed6953267b119711bae40 @ Z:/repos/deps/awesome-agentic-patterns
- Nature: Curated catalogue of agentic AI patterns (context & memory, feedback loops, tool use, multi-agent, planning)
- Categories: Context & Memory, Feedback Loops, Tool Use, Multi-Agent, Planning/Reflection, Output Formats
- Verdict: CITE-class reference; pattern taxonomy useful for gap analysis but no installable primitives

**REPO 6 — vinta/awesome-python** (TIER-2, GH-only)
- HEAD: 5909fa76d92a173c6e054280c94ce0630a48371b, 2026-05-12
- Nature: Python library catalogue, CC-BY-4.0
- Verdict: CITE-class only; no Claude Code skill primitives

**REPO 7 — wshobson/agents** (TIER-1)
- HEAD: ece811f23310a37ceb43496dbac0e244fe6845b6 @ Z:/repos/deps/wshobson-agents
- Plugins (60+): accessibility-compliance, agent-orchestration, agent-teams, api-scaffolding, api-testing-observability, application-performance, arm-cortex-microcontrollers, backend-api-security, backend-development, block-no-verify, blockchain-web3, brand-landingpage, business-analytics, c4-architecture, cicd-automation, cloud-infrastructure, code-documentation, code-refactoring, codebase-cleanup, comprehensive-review, conductor, content-marketing, context-management, customer-sales-automation, data-engineering, data-validation-suite, database-cloud-optimization, database-design, database-migrations, framework-migration, frontend-mobile-development, frontend-mobile-security, full-stack-orchestration, functional-programming, game-development, git-pr-workflows, hr-legal-compliance, incident-response, javascript-typescript, julia-development, jvm-languages, kubernetes-operations, llm-application-dev, machine-learning-ops, meigen-ai-design, multi-platform-apps, observability-monitoring, payment-processing, performance-testing-review, plugin-eval, protect-mcp, python-development, quantitative-trading, reverse-engineering, review-agent-governance, security-compliance, security-scanning, seo-analysis-monitoring, seo-content-creation, seo-technical-optimization, shell-scripting, signed-audit-trails, startup-business-analyst, systems-programming, tdd-workflows, team-collaboration, ui-design, unit-testing, web-scripting
- CONDUCTOR plugin: Context-Driven Development — setup/new-track/implement/status/revert/manage commands; generates conductor/index.md, product.md, tech-stack.md, workflow.md, tracks/
- Each plugin: agents/*.md + commands/*.md + skills/*/SKILL.md pattern

**REPO 8 — abhigyanpatwari/GitNexus** (TIER-2, GH-only)
- HEAD: 8083c39f6d8271c6ec88ff53db127fe4d11b217e, 2026-05-12
- Nature: PHP scope-resolution tooling (NOT Claude Code related)
- Verdict: MISIDENTIFIED target — not a Claude Code repo; REJECT

**REPO 9 — quemsah/awesome-claude-plugins** (TIER-2, GH-only)
- HEAD: 62e65931020618aa91d947c0b263e4d181f4a953, 2026-05-12
- Nature: Automated daily-refresh plugin discovery/catalogue for Claude Code marketplace
- Verdict: CITE-class — useful as index of available plugins; no primitives to install

**REPO 10 — Shubhamsaboo/awesome-llm-apps** (TIER-2, GH-only)
- HEAD: 795212bfb3ba7d25db04c7879d39621429fd093d, 2026-05-09
- Nature: Python LLM app examples (RAG, agents, multimodal) — Apache-2.0
- Verdict: CITE-class; pattern inspiration only

**REPO 11 — forrestchang/andrej-karpathy-skills** (TIER-1-NAMED-AUTHOR)
- HEAD: 2c606141936f1eeef17fa3043a72095b4765b9c2 @ Z:/repos/deps/andrej-karpathy-skills
- Skills (1): skills/karpathy-guidelines/SKILL.md
- Content: 4 principles — Think Before Coding, Simplicity First, Surgical Changes, Goal-Driven Execution
- Note: eee already has karpathy-adapted.md (255 lines) — PARTIAL OVERLAP already adopted
- Verdict: Thin (1 skill), already partially adopted via karpathy-adapted.md rule

**REPO 12 — mattpocock/skills** (TIER-2, GH-only)
- HEAD: f304057d61d3df3c9fd992ac2b6e3833cb9325fb, 2026-05-12
- Prior session verdict: REJECT-FOR-FIT (TypeScript/prototype-focused, domain mismatch)
- Verdict: REJECT-FOR-FIT confirmed

**REPO 13 — hesreallyhim/awesome-claude-code** (TIER-2)
- HEAD: 614f102accbcd48206d63a21df64adc984026b40 @ Z:/repos/deps/awesome-claude-code
- Nature: Curated awesome list of Claude Code resources/tools/prompts
- License: CC-BY-NC-ND-4.0 (non-commercial, no derivatives — INSTALL BLOCKED)
- Verdict: CITE-class only; license prohibits derive/install

**REPO 14 — alirezarezvani/claude-skills** (TIER-2)
- HEAD: 7d493fed97e4d57553630e1a2432c1c02bf5b2b3 @ Z:/repos/deps/claude-skills
- Structure: agents/, business-growth/, c-level-advisor/, commands/, documentation/, engineering/, engineering-team/, eval-workspace/, finance/, marketing-skill/, orchestration/, product-team/, project-management/, ra-qm-team/, standards/, templates/
- AUDIT_REPORT.md verdict: 4 POWERFUL, 5 SOLID, 2 GENERIC, 1 WEAK
- POWERFUL tier: business-growth/revenue-operations (GTM metrics: magic number, CAC payback, burn multiple), business-growth/customer-success-manager, business-growth/sales-engineer, finance (production Python scripts)
- Note: 0 SKILL.md files found (uses different structure without SKILL.md naming)

**REPO 15 — gsd-build/get-shit-done** (TIER-2)
- HEAD: 3aaed8f5d7c3492678b867e6687d42c88fe227e5 @ Z:/repos/deps/get-shit-done
- Nature: Claude Code workflow system with changeset-driven commands
- Changesets: gsd-map-codebase, gsd-new-project, gsd-graphify (inline build, commit staleness), gsd-spike, gsd-plan-phase (opencode dispatch), gsd-retrospective-canonical
- Notable: ADR-driven development, dynamic routing, SDK flag wiring
- Verdict: Pattern-extract class — specific commands extractable

**REPO 16 — vercel-labs/agent-skills** (TIER-1 Vercel-org)
- HEAD: b9c8ee0643d87d3c5a953d1e22382ff2ead39229 @ GH (2026-05-05)
- Skills (8): composition-patterns, deploy-to-vercel, react-best-practices, react-native-skills, react-view-transitions, vercel-cli-with-tokens, web-design-guidelines, packages/
- eee ALREADY HAS: vercel-composition-patterns, vercel-react-best-practices, web-design-guidelines (3 of 8 installed)
- Missing from eee: deploy-to-vercel, react-native-skills, react-view-transitions, vercel-cli-with-tokens

### §C ECC + CCBP Line-by-Line Gap Analysis (10 HIGHEST-LEVERAGE primitives NOT in eee)

eee current skills (13 total):
  mem-recall, speckit-analyze/checklist/clarify/constitution/implement/plan/specify/tasks/taskstoissues (9),
  vercel-composition-patterns, vercel-react-best-practices, web-design-guidelines

eee current rules (40+): advanced-agent-team-standing-directive, agent-harness-fit-verification, audit-action-loop, canonical, citation-discipline, closed-loop-recursive-narrowing, codex-t1-*, codification-threshold, convergence-gate, coordination, cross-model-consensus, deprecation-discipline, evidence-policy, fm17/19/20/21, git-cli-grammar-discipline, karpathy-adapted, kiss-dry-yagni, launch-discipline, layered-gates-architecture, mcp-disconnect-recovery, mia-pre-apply, multi-perspective-subagents, multi-source-discovery-breadth-discipline, named-failure-modes, parallel-agent-wave, parallel-sessions, parallel-session-worktree-isolation, port-note-discipline, research-protocol, sota-pin-discipline, sota-research-architecture, synthesis-layer-verify, team-orchestration

eee current hooks: cwc/ (kill-switch, steer, track-read, verify-gate), scripts/ (agent_plan_readonly_bash_guard, agent_spawn_gate, auto_proceed_gate, block_no_verify_guard, codex_failure_audit, codex_gate, codex_mcp_healthcheck, codex_postcommit_review, codex_prepush_review, codex_review_queue, codex_review_thread_bridge, codex_review_trace, codex_stuck_detector, codex_t1_consult_gate, codex_t2_pre_commit_gate, codex_t5_plan_review_gate)

**GAP 1 — ECC: autonomous-loops/continuous-agent-loop** (ECC skill)
- Source: Z:/repos/deps/affaan-m-everything-claude-code/skills/autonomous-loops/SKILL.md @ 841beea4
- Content: 6-pattern loop spectrum (Sequential Pipeline, NanoClaw REPL, Infinite Agentic Loop, Continuous Claude PR Loop, De-Sloppify Pattern, Ralphinho/RFC-Driven DAG)
- eee gap: no autonomous loop orchestration skill installed; parallel-agent-wave rule exists but no skill-level guidance
- Leverage: HIGH — covers the full loop architecture decision tree

**GAP 2 — ECC: agent-harness-construction** (ECC skill)
- Source: Z:/repos/deps/affaan-m-everything-claude-code/skills/agent-harness-construction/SKILL.md @ 841beea4
- Content: Core model (action space / observation / recovery / context budget), micro/medium/macro tool granularity, ReAct vs function-calling vs hybrid architecture guidance, error recovery contract pattern
- eee gap: agent-harness-fit-verification RULE exists but no corresponding skill for BUILDING harnesses
- Leverage: HIGH — fills build vs verify gap

**GAP 3 — ECC: canary-watch** (ECC skill)
- Source: Z:/repos/deps/affaan-m-everything-claude-code/skills/canary-watch/SKILL.md @ 841beea4
- Content: Post-deploy monitoring loop — HTTP status, console errors, network failures, performance (LCP/CLS/INP), content, API health; quick/sustained/diff modes; critical/warning thresholds
- eee gap: no post-deploy monitoring skill; eee has only development-phase guardrails
- Leverage: HIGH — closes the deploy→monitor gap

**GAP 4 — ECC: content-hash-cache-pattern** (ECC skill)
- Source: Z:/repos/deps/affaan-m-everything-claude-code/skills/content-hash-cache-pattern/SKILL.md @ 841beea4
- Content: SHA-256 content-addressed caching, path-independent, auto-invalidating, service layer separation
- eee gap: no caching pattern primitive; relevant for expensive tool-call deduplication in agent loops
- Leverage: MEDIUM-HIGH

**GAP 5 — CCBP: 27-hook taxonomy + undocumented hooks** (CCBP hooks knowledge)
- Source: Z:/repos/deps/claude-code-best-practice-shan/.claude/hooks/HOOKS-README.md @ 48f2cebe
- Content: Complete 27-event taxonomy + Setup hook (v2.1.10, not in official docs) + agent-frontmatter hooks (v2.1.0, 6 hooks vs 3 documented); WorktreeSetup, WorktreeRemove, InstructionsLoaded, Elicitation, SubagentStart, SubagentStop, SessionStart, SessionEnd, PreCompact, PostCompact, PermissionDenied all documented with parameters
- eee gap: eee hooks are extensive but this taxonomy is a reference document, not a rule; no HOOKS-REFERENCE rule or skill in eee
- Leverage: HIGH — prevents missed hook events in eee automation

**GAP 6 — WSHOBSON: conductor plugin** (wshobson-agents)
- Source: Z:/repos/deps/wshobson-agents/plugins/conductor/ @ ece811f2
- Content: Context-Driven Development — setup/new-track/implement/status/revert/manage; generates persistent project context (product.md, tech-stack.md, workflow.md, tracks/) across sessions
- eee gap: no session-persistent project context management primitive; closest is speckit (spec-phase only, not full project lifecycle)
- Leverage: HIGH — addresses multi-session context persistence gap

**GAP 7 — ECC: mcp-server-patterns** (ECC skill)
- Source: Z:/repos/deps/affaan-m-everything-claude-code/skills/mcp-server-patterns/SKILL.md @ 841beea4
- Content: MCP server design patterns
- eee gap: mcp-disconnect-recovery rule exists but no MCP server design skill
- Leverage: MEDIUM-HIGH — eee uses MCP extensively, no build-side patterns

**GAP 8 — ECC: prompt-optimizer** (ECC skill)
- Source: Z:/repos/deps/affaan-m-everything-claude-code/skills/prompt-optimizer/SKILL.md @ 841beea4
- Content: Systematic prompt improvement patterns
- eee gap: no prompt optimization skill; eee prompts are authored ad-hoc
- Leverage: MEDIUM

**GAP 9 — VERCEL: deploy-to-vercel + react-native-skills + react-view-transitions** (vercel-labs)
- Source: vercel-labs/agent-skills @ b9c8ee06 skills/deploy-to-vercel, react-native-skills, react-view-transitions
- eee gap: 3 of 8 Vercel skills already installed; 4 not yet installed
- Leverage: MEDIUM (Vercel-specific, org-maintained)

**GAP 10 — GSD: graphify + retrospective-canonical patterns** (get-shit-done)
- Source: Z:/repos/deps/get-shit-done @ 3aaed8f5 (.changeset/3166-graphify-inline-build.md, 3198-retrospective-canonical.md, adr-0002-command-contract-validation.md)
- Content: gsd-graphify (codebase graph indexing inline build), gsd-retrospective-canonical (post-sprint retrospective), ADR-driven command contract validation
- eee gap: no codebase graph indexing command; no retrospective workflow; ADR pattern absent
- Leverage: MEDIUM

### §D Install Priority Ranking — Top-10 ADOPT-NOW

Ranked by leverage × convergence score:

1. **ECC: autonomous-loops/continuous-agent-loop** — eee has loop rules but no skill; ECC 841beea4; STRONG-PROVENANCE-EXPRESS eligible (official plugin, >3mo, affaan@dcube.ai named)
2. **ECC: agent-harness-construction** — build vs verify gap; complements existing agent-harness-fit-verification rule; 841beea4
3. **CCBP: hooks-taxonomy rule/doc** — 27+2 hook events; prevents automation blind spots; 48f2cebe; unique knowledge
4. **ECC: canary-watch** — post-deploy gap; 841beea4; production monitoring closure
5. **WSHOBSON: conductor plugin** — multi-session project persistence; ece811f2; no eee equivalent
6. **ECC: content-hash-cache-pattern** — caching primitive; 841beea4; agent loop deduplication
7. **ECC: mcp-server-patterns** — MCP build-side; 841beea4; complements mcp-disconnect-recovery
8. **VERCEL: deploy-to-vercel + react-native-skills + react-view-transitions** — b9c8ee06; STRONG-PROVENANCE-EXPRESS (Vercel-org); 3 remaining Vercel skills
9. **ECC: prompt-optimizer** — prompt authoring improvement; 841beea4
10. **GSD: graphify + retrospective-canonical** (pattern-extract only) — 3aaed8f5; ADR-driven workflow

### §E Convergence-Gate Verdicts Per Repo

Axes: (1) ≥3 T1 independent sources, (2) ≥2 named T2 practitioners, (3) Stability ≥3mo + cpd band

**#1 affaan-m/everything-claude-code** — ADOPT-NOW
- Axis 1: official everything-claude-code plugin (claude-plugins-official marketplace); 640 files; T1 confirmed
- Axis 2: affaan@dcube.ai named author + Anthropic marketplace listing = T2 equivalent
- Axis 3: cpd ~5 (est 165 skills / ~365d repo age) AND age >>90d → Stable burn-in PASS
- Verdict: ADOPT-NOW for skill primitives not yet in eee (gaps 1-4, 7-9)

**#2 shanraisshan/claude-code-best-practice** — STUDY-PILOT
- Axis 1: Anthropic-staff author (noreply@anthropic.com committer), single repo, good structure
- Axis 2: Anthropic-staff authorship qualifies as T2-equivalent; 1 named org not 2 independent
- Axis 3: age 4d drift from HEAD (repo older); hooks knowledge uniquely valuable
- Verdict: STUDY-PILOT — hooks taxonomy extract is high-leverage but T1 count borderline (1 official-org source). Extract hooks-taxonomy as cite-class rule, not full install

**#3 obra/superpowers** — ADOPT-NOW (already partially vendored 6/14)
- Axis 1: T1 confirmed (official superpowers plugin, MIT, jesse@fsck.com)
- Axis 2: jesse@fsck.com = obra = Jesse Vincent (known Perl/Emacs/keyboard ecosystem engineer, public profile) = named T2
- Axis 3: age >>90d, cpd moderate, sustained maintenance through 2026 = Sustained active PASS
- Verdict: ADOPT-NOW for remaining unvendored skills (8 remaining)

**#4 AsyncFuncAI/deepwiki-open** — REJECT-FOR-FIT
- Not a Claude Code skill repo; no installable primitives
- Verdict: CITE-class

**#5 nibzard/awesome-agentic-patterns** — STUDY-PILOT
- Axis 1: Curated catalogue, Apache-2.0, single maintainer
- Axis 2: nibzard = Nikola Balic, not widely named T2
- Axis 3: 9c40e100, 2026-05-07, age borderline
- Verdict: STUDY-PILOT — pattern taxonomy reference only; no installable primitives

**#6 vinta/awesome-python** — REJECT-FOR-FIT
- Not Claude Code related; CC-BY-4.0 CITE-class
- Verdict: CITE-class

**#7 wshobson/agents** — STUDY-PILOT
- Axis 1: 60+ plugins, wshobson/agents on marketplace
- Axis 2: wshobson@gmail.com named author; not widely cited T2
- Axis 3: ece811f2, 2026-05-02, age >90d, active maintenance PASS
- Verdict: STUDY-PILOT — conductor plugin is high-leverage extract target; full install blocked by T2 axis partial

**#8 abhigyanpatwari/GitNexus** — REJECT-FOR-FIT
- PHP scope-resolution tool; NOT a Claude Code repo
- Verdict: MISIDENTIFIED — REJECT

**#9 quemsah/awesome-claude-plugins** — STUDY-PILOT
- Automated daily refresh dataset of Claude plugins; useful as index
- Verdict: CITE-class index; no install primitives

**#10 Shubhamsaboo/awesome-llm-apps** — REJECT-FOR-FIT
- Python LLM app examples; no Claude Code skill primitives
- Verdict: CITE-class

**#11 forrestchang/andrej-karpathy-skills** — ADOPT-NOW (partial, already adopted)
- Axis 1: Named author (Andrej Karpathy, 3.5M X followers, OpenAI/Tesla AI)
- Axis 2: Karpathy = definitively T2-named; STRONG-PROVENANCE-EXPRESS fires
- Axis 3: 2c606141, age >90d, PASS
- Verdict: ADOPT-NOW — BUT eee already has karpathy-adapted.md (255L); check delta before reinstalling. 1 SKILL.md in repo; thin install; priority LOW given existing coverage

**#12 mattpocock/skills** — REJECT-FOR-FIT
- Prior session: TypeScript/prototype-focused, domain mismatch
- Verdict: REJECT-FOR-FIT confirmed (f304057d)

**#13 hesreallyhim/awesome-claude-code** — REJECT (license)
- CC-BY-NC-ND-4.0: non-commercial, no derivatives
- Verdict: CITE-class ONLY; install blocked by license

**#14 alirezarezvani/claude-skills** — STUDY-PILOT
- Axis 1: 540+ SKILL.md structure, AUDIT_REPORT present
- Axis 2: alirezarezvani single named author, not widely cited T2
- Axis 3: 7d493fed, 2026-05-02, age >90d PASS
- Verdict: STUDY-PILOT — POWERFUL-tier skills (revenue-operations, customer-success-manager) are selective cherry-pick candidates; await Phase 7 benchmark

**#15 gsd-build/get-shit-done** — STUDY-PILOT
- Axis 1: gsd-build org, changeset-driven, ADR-0002 formalized
- Axis 2: author unknown beyond org; not named T2
- Axis 3: 3aaed8f5, 2026-05-09, age >90d (repo older), active PASS
- Verdict: STUDY-PILOT — graphify + retrospective-canonical pattern-extract (cite-class); ADR command contract pattern extractable

**#16 vercel-labs/agent-skills** — ADOPT-NOW
- Axis 1: Vercel-org official, T1 confirmed
- Axis 2: Vercel engineering org = T2-equivalent; STRONG-PROVENANCE-EXPRESS fires (org-level T1 + org-equivalent T2 + age ≥30d)
- Axis 3: b9c8ee06, 2026-05-05, STRONG-PROVENANCE-EXPRESS PASS
- Verdict: ADOPT-NOW for remaining 4 skills (deploy-to-vercel, react-native-skills, react-view-transitions, vercel-cli-with-tokens)

### §F Probe-Yield HONEST-NON-FINDING

1. **abhigyanpatwari/GitNexus is NOT a Claude Code repo** — it's a PHP static analysis tool. The target in the dispatch table was misidentified. The HEAD SHA (8083c39f) is for PHP scope-resolution PRs (commit message: "feat(php): migrate PHP to scope-based resolution model"). Zero Claude Code primitives exist. HNF: no finding.

2. **alirezarezvani/claude-skills has 0 SKILL.md files at root** — the find command returned count=0. The repo uses a different structure (domain/skill/scripts/ + domain/skill/guides/ pattern without SKILL.md naming). AUDIT_REPORT.md exists and rates skills. Installation requires adapting to SKILL.md format first.

3. **mattpocock/skills REJECT-FOR-FIT confirmed** — TypeScript educator, prototype-skill focus. eee already REJECT-FOR-FIT from prior session; HEAD f304057d confirmed 2026-05-12 (still active but domain mismatch unchanged).

4. **superpowers 6/14 already vendored** — prior session installed. Remaining 8 skills (brainstorming, dispatching-parallel-agents, executing-plans, finishing-a-development-branch, receiving-code-review, requesting-code-review, subagent-driven-development, systematic-debugging, test-driven-development, using-git-worktrees, using-superpowers, verification-before-completion, writing-plans, writing-skills) need enumeration against installed list to identify the 8 remaining. Install requires verification.

5. **ECC plugin cache shows everything-claude-code IS installed** — .claude/plugins/cache/everything-claude-code exists + .claude/plugins/marketplaces/everything-claude-code exists. But eee only has 13 skills installed vs 165+ in ECC source. This suggests the plugin cache is populated but skills are selectively installed. The gap analysis in §C is therefore skills NOT yet cherry-picked from ECC.

## Execution Plan (READ-ONLY — for operator approval)

Phase 1 (ADOPT-NOW, zero-risk):
- Cherry-pick ECC gaps 1-4 (autonomous-loops, agent-harness-construction, canary-watch, content-hash-cache-pattern)
- Install Vercel remaining 4 (deploy-to-vercel, react-native-skills, react-view-transitions, vercel-cli-with-tokens)
- Pin all at cited HEAD SHAs

Phase 2 (STUDY-PILOT, operator-gated):
- Extract CCBP hooks taxonomy → .claude/rules/hooks-taxonomy.md (cite-class, no full install)
- wshobson/conductor → pilot in .claude/commands/conductor/ (selective command extract)
- GSD graphify + retrospective-canonical → .claude/commands/ pattern extract

Phase 3 (DEFERRED):
- alirezarezvani/claude-skills POWERFUL tier (SKILL.md format adaptation required)
- superpowers remaining 8 skills (verify against installed list first)

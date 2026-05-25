# Stream D — wshobson + addyosmani + mattpocock + mksglu line-by-line ingest

> Probed 2026-05-20 via mcp__github__list_commits + mcp__github__get_file_contents + mcp__perplexity__perplexity_ask (after 2 agent-spawn Overloaded retries; direct-MCP fallback).

## §1 wshobson/agents — MAJOR FINDING — NOT INSTALLED

**HEAD**: 2026-05-20 active. **README.md** (20305 bytes, sha 035d11c5) self-describes as Claude Code marketplace plugin collection:

- **185 specialized AI agents** across 25 categories
- **153 agent skills** with progressive-disclosure architecture
- **80 focused plugins** (avg 3.6 components per plugin)
- **100 commands** + **16 multi-agent workflow orchestrators**
- **PluginEval framework** — 3-layer eval (static analysis instant + LLM judge + Monte Carlo statistical) on **10 quality dimensions** (triggering accuracy, orchestration fitness, output quality, scope calibration, progressive disclosure, token efficiency, robustness, structural completeness, code template quality, ecosystem coherence). **Anti-pattern detection**: OVER_CONSTRAINED, EMPTY_DESCRIPTION, MISSING_TRIGGER, BLOATED_SKILL, ORPHAN_REFERENCE, DEAD_CROSS_REF. Statistical rigor: **Wilson CI, bootstrap CI, Clopper-Pearson CI, Elo ranking**.
- **Three-tier model strategy** ratified for Opus 4.7 / Sonnet 4.6 / Haiku 4.5 (matches runtime's CLAUDE.md L26 frontier-peer policy)
- **agent-teams plugin** at `agent-teams@claude-code-workflows` — **7 team presets**: review, debug, feature, fullstack, research, security, migration. This is the upstream source for the `agent-teams:team-*` allowlist entries (W326) — **runtime already gets this via claude-code-workflows@claude-code-workflows marketplace install**.
- **Conductor plugin** — Context → Spec & Plan → Implement workflow (NEW: not in runtime). Includes `/conductor:setup`, `/conductor:new-track`, `/conductor:implement`, `/conductor:revert` + state persistence + 3 skills.
- Top-30 agents (representative sample via perplexity): security-reviewer-pro, multi-agent-security-assessor, dependency-security-scan, infra-security-auditor, secure-architecture-reviewer, code-reviewer-pro, bug-hunter, refactoring-architect, test-strategy-designer, devops-pro, kubernetes-ops, github-actions-orchestrator, observability-engineer, ai-engineer-pro, rag-system-designer, mlops-engineer, data-pipeline-engineer, python-pro, django-pro, fastapi-pro, microservices-architect, frontend-pro, react-ui-architect, design-system-integrator, system-architect, domain-driven-design-coach, event-driven-architect, agent-orchestrator, agent-teams-coordinator, coverage-gap-analyzer.

**Runtime install state**: NOT installed as marketplace. Cache dirs show NO `wshobson` entry. The `claude-code-workflows@claude-code-workflows` marketplace (`agent-teams`, `conductor`, `comprehensive-review`, `agent-orchestration`, `debugging-toolkit`, etc.) is likely a DIFFERENT publisher (anthropics or wshobson partner) shipping a subset.

**Recommendation**: **P0 INSTALL** `/plugin marketplace add wshobson/agents` then selectively install `plugin-eval`, `agent-teams`, `conductor` for direct gap-closure. PluginEval alone is worth the install (replaces sca-v7..v12 hand-rolled ranking with peer-reviewed framework — frees `tools/sca-*.py/sh` hand-rolled scripts as deletable).

## §2 addyosmani/agent-skills — AT HEAD, NO DRIFT ✓

**HEAD**: `f17c6e88c904dc747381c374312c2d58e10647ae` 2026-05-16 22:00 ("Merge PR #60 from googlarz/feat/ci-skill-validator"). **EXACT MATCH** to CLAUDE.md L52 fork-cite. **Zero drift.**

Notable upstream: googlarz CI skill validator (PR #60) — automated YAML-frontmatter + auto-fire-trigger validation. Worth pattern-studying (could replace runtime's `tools/precommit-msys-hooks-form.mjs` MSYS validator with upstream-mature framework).

Runtime vendored 5 (addyosmani-incremental-implementation, addyosmani-performance-optimization, addyosmani-security-and-hardening, addyosmani-source-driven-development, addyosmani-spec-driven-development) + 3 NS-namespaced (api-and-interface-design, doubt-driven-development, frontend-ui-engineering). Stream-E noted: NS-namespaced 3 may have DROPPED `addyosmani-` prefix during vendor-fork; CLAUDE.md L31 originally said "+13 silent additions" — verify all 8 still match upstream content.

**Recommendation**: **HOLD** (no drift). Schedule W340 re-litigation. Consider pattern-adopting googlarz CI validator.

## §3 mattpocock/skills — 5 COMMITS AHEAD — REFRESH FORK

**HEAD**: `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` 2026-05-20 08:46 (merge main of mattpocock/skills). Runtime fork @ `d54c497aa94400a496d3f2c38be10fa5f284c5a9` 2026-05-19 16:07. **5 commits ahead**:
1. `b8be62ff` 2026-05-20 — Merge branch main
2. `a36584e0` 2026-05-20 — **Updated ICA** (skill update)
3. `e7df78bb` 2026-05-19 — Removed relationships, example dialogue, flagged ambiguities from CONTEXT.md template
4. `bc32841b` 2026-05-19 — Update /handoff skill documentation (saving-location clarification)
5. `feaaf420` 2026-05-19 — Added redaction info to handoff skill

**Themes**: skills focusing on (a) ICA, (b) /handoff (matt's signature pattern — save-state-before-context-loss), (c) CONTEXT.md as glossary not implementation-doc, (d) writing-fragments capture.

Runtime has matpocock-vendor-fork-10 per CLAUDE.md L52. Skills not visible in `.claude/skills/` top-level (may be plugin-vendored under cache).

**Recommendation**: **P1 REFRESH fork** to `b8be62ff` — pull /handoff redaction + ICA update. Pattern: matt's "save context as files" doctrine maps to OthmanAdi/planning-with-files; verify they don't conflict.

## §4 mksglu/context-mode — 5 COMMITS AHEAD, P0 SECURITY-RELEVANT FIX

**HEAD**: `4dcbd451` 2026-05-20 12:47 (ci stats). Runtime @ **v1.0.141**; latest **v1.0.146** released 2026-05-20 08:17 by Mert Koseoglu. **5 commits ahead**:
1. `4dcbd451` 2026-05-20 — ci: update install stats
2. `55b51d31` 2026-05-20 — ci: rebuild server.bundle.mjs + cli.bundle.mjs + session-hook + security bundles
3. `b0c4c5cb` 2026-05-20 — version bump 1.0.146
4. `fa1e71d0` 2026-05-20 — ci: rebuild bundles for v1.0.146
5. `d09585eb` 2026-05-20 — **fix(openclaw): route SessionDB through resolveSessionDbPath (#645 follow-up)** — Pi + OMP same-bug class. macOS uppercase projectDir + worktree-suffix bug. Affects `ctx_stats` (zero history) and `ctx_search(sort: "timeline")` (sort dropped) silently. **REGRESSION TEST**: 96/96 + 134/134 passing.

**Recommendation**: **P0 UPGRADE** via `/ctx-upgrade` (already advertised by `ctx_batch_execute` output preamble — context-mode v1.0.141 outdated → v1.0.146 available). The openclaw fix alone justifies P0: Windows-portable Z:-install + worktree-heavy workflow = exact bug-trigger condition.

## §5 Cross-Repo Convergence + Top-5 Actions

**Convergence patterns** (appearing in ≥2 of these 4 repos):
- **Progressive disclosure** (wshobson + addyosmani) — name+description always loaded, instructions+resources on-demand
- **Skill validation** (addyosmani CI validator + wshobson PluginEval) — automated quality gate
- **Three-tier model strategy** (wshobson docs + frontier-peer in this runtime) — Opus/Sonnet/Haiku assignment
- **/handoff pattern** (mattpocock) + **/plan-attest** (OthmanAdi planning-with-files via Stream E) — context-as-file persistence
- **MCP-native** (mksglu context-mode) — SQLite + FTS5 for context reduction

**Top-5 SOTA actions** (priority order):
1. **P0** `/ctx-upgrade` — context-mode v1.0.141 → v1.0.146 (openclaw fix; ctx_stats + timeline-sort affected)
2. **P0** `/plugin marketplace add wshobson/agents` + install plugin-eval + conductor — replaces hand-rolled sca-v7..v12 (tools/sca-*.py/sh deletable post-install)
3. **P1** refresh mattpocock fork d54c497a → b8be62ff — pull /handoff redaction + ICA + CONTEXT.md glossary discipline
4. **P2** pattern-adopt addyosmani CI skill validator (PR #60 googlarz) — replace tools/precommit-msys-hooks-form.mjs with upstream-mature framework
5. **P2** hold addyosmani vendor-fork @ f17c6e88 — re-litigate W340 (zero drift, no rush)

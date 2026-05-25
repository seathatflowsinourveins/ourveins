# W337 Stream D — wshobson + addyosmani + mattpocock + mksglu Line-by-Line Ingest

**Date**: 2026-05-20
**Fork**: Stream D (parent W337 audit)
**Scope**: 4 SOTA agent/skill repos — drift, gaps, install decisions

---

## §1 wshobson/agents

**HEAD**: `08ded5e7b0fe57e7f40194775885eba539c3d8e7` 2026-05-17 ("fix: agent teams coordination guardrails (#535)") — Seth Hobson, PR #535

**Recent activity (last 5 commits)**:
- `08ded5e7` 2026-05-17 fix(agent-teams): coordination guardrails
- `3e17b71b` 2026-05-17 feat(machine-learning-ops): add **recsys-pipeline-architect** skill (#533) — six-stage Source→Hydrator→Filter→Scorer→Selector→SideEffect, xAI X-For-You-derived
- `112197c6` 2026-05-14 fix(plugin-eval): broaden MISSING_TRIGGER pattern (#530) — adds "should be used when", "use after/before/whenever", "auto-loads when", "trigger when" canonical forms
- `83d70bcc` 2026-05-14 fix(plugin-eval): surface plugin-level depth downgrades loudly (#532)
- `86bad08b` 2026-05-14 meigen-ai-design v1.0.7 (Veo 3.1 + Seedance 2.0 ref-video)

**Architecture** (per deepwiki structure):
- 11 plugin categories: Backend, Infrastructure/Cloud, Testing/QA, Security/RE, AI/ML, Frontend/Mobile/UI, DevEx, Docs/C4, Business/Data, SEO, Specialized Langs
- 9 multi-agent workflows: full-stack, multi-platform, incident-response, perf-opt, code-review, legacy-mod, data-driven, git-pr-automation, **agent-teams parallel**
- Governance layer: **Protect-MCP Cedar Policy**, Review-Agent-Governance, Block-No-Verify, **Signed Audit Trails**
- **PluginEval** quality framework: static + judge + Monte Carlo

**Runtime cache status**: `NO-WSHOBSON` — wshobson marketplace NOT directly installed. BUT: `claude-code-workflows` plugin v1.0.2 (cached) ships `agent-teams/`, `comprehensive-review/`, `context-management/`, `agent-orchestration/`, `block-no-verify/`, `protect-mcp/`, `review-agent-governance/`, `signed-audit-trails/`, `plugin-eval/`, `qa-orchestra/`, `ship-mate/`, `tdd-workflows/`, etc. — this is the wshobson-derived marketplace re-packaged for the Claude Code plugin format.

**Subagent allowlist evidence** (`.claude/state/subagent-type-allowlist.json`):
- `agent-teams:team-debugger`, `team-implementer`, `team-lead`, `team-reviewer` ← from claude-code-workflows/agent-teams/1.0.2
- `comprehensive-review:architect-review`, `code-reviewer`, `security-auditor` ← claude-code-workflows
- `context-management:context-manager` ← claude-code-workflows
- `wshobson-devops-troubleshooter`, `wshobson-security-auditor` ← bare-name direct wshobson (likely from claude-plugins-official or another marketplace)

**Gap vs upstream**:
- **MISSING from runtime**: recsys-pipeline-architect (just landed 2026-05-17, novel pattern — recommendation pipelines)
- **MISSING**: PluginEval depth-downgrade callout in current runtime's plugin-eval invocation (cosmetic but improves transparency)
- **MISSING**: agent-teams coordination guardrails fix (commit `08ded5e7`) — if claude-code-workflows v1.0.2 was packaged before 2026-05-17, this fix is NOT in runtime cache. Verify by checking plugin update date.

**Install decision**: claude-code-workflows IS the wshobson-derivative. Installing wshobson/agents marketplace directly would DUPLICATE 80%+ of skills/agents. **RECOMMENDATION**: refresh `claude-code-workflows` to pull in agent-teams coordination guardrail fix (#535); cherry-pick recsys-pipeline-architect as a runtime skill ONLY IF a future ML/recsys project arises (defer).

---

## §2 addyosmani/agent-skills

**Upstream HEAD**: `f17c6e88c904dc747381c374312c2d58e10647ae` 2026-05-16 ("Merge PR #60: CI skill validator")
**Runtime fork pin** (CLAUDE.md L52): `addyosmani-vendor-fork-5 @ f17c6e88` ← **IDENTICAL TO HEAD**. **Zero drift.**

**Last 5 upstream commits**:
- `f17c6e88` 2026-05-16 PR #60 CI skill validator merge
- `5b4c6dade` 2026-05-14 README cleanup (drop ASCII diagram)
- `f7edc6c4` 2026-05-14 README visual add
- `b1162539` 2026-05-14 PR #164 feat: **interview-me** skill (Define phase)
- `12ae36e0` 2026-05-14 interview-me review feedback

**Lifecycle architecture** (deepwiki):
- Define → Plan → Build → Verify → Review → Ship
- 6 phases × multiple skills per phase
- 3 Agent Personas: code-reviewer, test-engineer, security-auditor

**Runtime coverage** (5 prefixed + 3 NS-vendor):
- ✅ Build/Plan/Review: addyosmani-incremental-implementation, addyosmani-performance-optimization, addyosmani-security-and-hardening, addyosmani-source-driven-development, addyosmani-spec-driven-development
- ✅ NS-prefix (cherry-picked unprefixed): api-and-interface-design, doubt-driven-development, frontend-ui-engineering

**Gap (upstream sections NOT in runtime)**:
- **Define phase**: `idea-refine`, `interview-me` (NEW PR #164 2026-05-14) — both useful for product brainstorm
- **Verify phase**: browser-testing-with-devtools, debugging-and-error-recovery (have generic skills but addyosmani's are TDD-disciplined)
- **Review phase**: code-review-and-quality (addyosmani's persona-driven), code-simplification (runtime has `code-simplification` but unprefixed — verify lineage match)
- **Ship phase**: git-workflow-and-versioning, ci-cd-and-automation, documentation-adrs-and-deprecation, shipping-and-launch
- **Agent Personas**: code-reviewer-persona, test-engineer-and-security-auditor-personas, **orchestration-patterns** (a reference doc)
- **Slash Commands + Session Hooks** (sections 4.1, 4.2) — runtime uses Anthropic-native hooks; addyosmani's may have additional patterns worth pattern-only adoption
- **CI skill validator** (PR #60) — could integrate into runtime's pre-commit gate

**Trigger quality** (per CLAUDE.md cardinal-rule-4 corollary: ≤8 distinct triggers, no overlap >50%, auto-fire rule stated): runtime's 5 addyosmani-prefixed skills appear well-bounded per their SKILL.md descriptions visible in the system prompt skill listing. No drift concerns.

**Verdict**: NO REFRESH NEEDED for vendored skills (zero drift). **Recommended cherry-picks**: `interview-me` (Define phase, distinct from runtime's brainstorming), `idea-refine` (Define phase). Add CI skill validator pattern to runtime's `.pre-commit-config.yaml` if not duplicating existing gate.

---

## §3 mattpocock/skills

**Upstream HEAD**: `b8be62ffacb0118fa3eaa29a0923c87c8c11985c` 2026-05-20 ("Merge branch 'main'") — Matt Pocock
**Runtime fork pin** (CLAUDE.md L52): `mattpocock-vendor-fork-10 @ d54c497aa944` ← 2026-05-19 16:07

**Drift**: 2 commits ahead since runtime fork:
- `a36584e0` 2026-05-20 "Updated ICA"
- `b8be62ff` 2026-05-20 Merge

**Runtime coverage** (vendored, prefix-clean):
- ✅ caveman, handoff (8.1 Productivity)
- ✅ grill-with-docs (7.1)
- ✅ diagnose (7.3 disciplined debugging)
- ✅ tdd (4.1.x TDD)
- ✅ improve-codebase-architecture (5.3)
- ✅ triage (7.2), to-issues (companion)
- ✅ code-simplification (likely upstream-lineage; verify)
- ✅ review (likely upstream lineage)

**Gap (upstream sections NOT in runtime)**:
- 3.1 writing-product-requirement-documents (PRDs)
- 3.2 breaking-prds-into-vertical-slices
- 3.3 planning-code-refactors
- 4.1.3 mocking-at-system-boundaries
- 4.1.4 designing-deep-modules
- 4.1.5 interface-design-for-testability
- 4.1.6 identifying-refactoring-candidates
- 4.2 prototyping
- 4.3 designing-interfaces-with-design-it-twice
- 4.4 setting-up-pre-commit-hooks (runtime has direct-invocation `.pre-commit-config.yaml` — pattern-only adopt)
- 5.1 improving-type-safety-with-shoehorn ← **NOTABLE**: TypeScript-specific, runtime is Node v22.22.0
- 5.2 git-operation-guardrails
- 6.x scaffolding-exercise-dirs, obsidian-vaults, editing-articles (lower priority)
- 9.1/9.2 in-progress writing-skills + code-review (experimental — defer)

**Frontend/TypeScript fit**: Node.js v22.22.0 runtime — shoehorn type-safety pattern is high-value. mattpocock's TypeScript focus aligns directly.

**Verdict**: **REFRESH FORK** to b8be62ff (trivial 2-commit advance). **Cherry-pick** shoehorn-type-safety + designing-deep-modules + interface-design-for-testability + planning-code-refactors. Skip Obsidian-specific skills.

---

## §4 mksglu/context-mode

**Upstream HEAD**: `4dcbd45144b2a7fb60907ec7983c6acaaef51d6b` 2026-05-20 ("ci: update install stats")
**Latest tag**: **v1.0.146** (commit `b0c4c5cb` 2026-05-20)
**Cache version**: **1.0.136** (per `.claude/plugins/cache/context-mode/context-mode/1.0.136/plugin.json`)
**Running version**: **1.0.141** (per ctx_batch_execute upgrade-notice fired this session)

**Drift**: cache 1.0.136 → upstream 1.0.146 = **10 patch versions behind**; running 1.0.141 → upstream 1.0.146 = **5 patches behind**. Cache is older than runtime — running is loaded from plugins/installed mechanism, cache may reflect last `/plugin update` attempt.

**npm registry confirmation**: `npm view context-mode version` = **1.0.146** ✅. Note: `@mksglu/context-mode` scoped form 404s — unscoped `context-mode` is the canonical npm name.

**License**: **Elastic-2.0** — CLAUDE.md cardinal-rule-1 #3 trust-tuple says MIT/Apache/BSD/ISC/MPL OK; AGPL/SSPL/proprietary case-by-case. Elastic-2.0 is source-available but NOT OSI-approved — already-installed pragmatic acceptance (W286 P0C ratified npm-pin model), but worth flagging for re-litigation.

**Tool inventory** (no new tools visible in 1.0.142-1.0.146 commits, mostly bundle rebuilds + session/security hook patches per `55b51d31` "ci: update server.bundle.mjs, cli.bundle.mjs, session hook & security bundles"):
- Confirmed runtime tools match upstream: ctx_batch_execute, ctx_search, ctx_execute, ctx_execute_file, ctx_fetch_and_index, ctx_index, ctx_insight, ctx_stats, ctx_doctor, ctx_purge, ctx_upgrade
- **No new tools in v1.0.146** — internal hardening only

**Update action**:
- MCP-side: `mcp__plugin_context-mode_context-mode__ctx_upgrade` returns the exact upgrade shell command (per skill description)
- Slash command: `/ctx-upgrade` (registered)
- Pull-mechanism: typically `git -C cache/context-mode/context-mode pull` + bundle rebuild; the MCP tool wraps this

**Verdict**: **EXECUTE /ctx-upgrade THIS WAVE**. Low risk (patch versions, internal hardening), 5 versions behind on live. Same shape as W286-P0C npx-pin model. Verify post-upgrade by re-running `ctx_stats` to confirm version bump.

---

## §5 Cross-Repo Convergence

| Pattern | wshobson | addyosmani | mattpocock | runtime |
|---|---|---|---|---|
| TDD | (via tdd-workflows) | ✓ §2.4.1 | ✓ §4.1.x | ✓ tdd |
| Code review persona | comprehensive-review plugin | ✓ §3.1 | (§9.2 experimental) | ✓ review |
| Pre-commit hooks | block-no-verify | (none explicit) | ✓ §4.4 | ✓ direct invoke |
| Disciplined debugging | debugging-toolkit | ✓ §2.4.3 | ✓ §7.3 diagnose | ✓ diagnose |
| Handoff/session-continuity | (session hooks) | (§4.2) | ✓ §8.1 | ✓ handoff |
| Architecture improvement | (architect-review) | (none) | ✓ §5.3 | ✓ improve-codebase-architecture |
| Agent-teams parallel | ✓ §5.9 (originator) | ✓ §3.3 orch | (none) | ✓ agent-teams plugin |
| **Type-safety/shoehorn** | (none) | (none) | ✓ §5.1 unique | ✗ MISSING |
| **Design-It-Twice** | (none) | (none) | ✓ §4.3 unique | ✗ MISSING |
| **interview-me** | (none) | ✓ NEW §2.1 | (none) | ✗ MISSING |
| **recsys-pipeline-architect** | ✓ NEW (5/17) | (none) | (none) | ✗ MISSING |

**Convergent SOTA-of-the-year signals** (3-way ≥2 repos): TDD discipline, code-review-persona, agent-teams parallel orchestration, disciplined-debugging, pre-commit-hooks. ALL already in runtime.

**Single-source novel patterns worth cherry-pick consideration**: shoehorn type-safety (mattpocock unique), design-it-twice (mattpocock unique), interview-me (addyosmani NEW), recsys-pipeline-architect (wshobson NEW — defer unless project demand).

**Community signals** (per maintainer activity in commit logs):
- wshobson: very active (PRs #530-535 in 4 days), team of contributors (Seth Hobson, jondwillis, mehmet turac, jau123)
- addyosmani: Addy Osmani solo-maintainer + community PRs (#60 from googlarz, #164 own), moderate activity
- mattpocock: Matt Pocock solo, very active doc-iteration cadence (multiple commits/day)
- mksglu: solo maintainer Mert Köseoğlu, automated CI commits + occasional manual releases

---

## §6 wshobson Install Decision

wshobson/agents IS already absorbed into runtime via `claude-code-workflows` marketplace (cached v1.0.2, ships agent-teams + comprehensive-review + context-management + protect-mcp + signed-audit-trails + plugin-eval + 13 more plugins). Installing wshobson/agents directly as a 2nd marketplace would create **duplicate plugin name collisions** and double-load identical agents/skills.

**Action**: do NOT add wshobson/agents marketplace. INSTEAD, **refresh claude-code-workflows** to a version that includes wshobson commit `08ded5e7` (agent-teams coordination guardrails). Check via: `cat .claude/plugins/cache/claude-code-workflows/.claude-plugin/plugin.json` → version field; if <1.0.3 or release-date <2026-05-17, schedule refresh.

---

## Top-5 SOTA Agent/Skill Repo Actions

1. **EXECUTE /ctx-upgrade** — context-mode runtime 1.0.141 → 1.0.146 (5 patches behind; internal hardening only; low risk; verify via post-upgrade `ctx_stats`).
2. **REFRESH mattpocock-vendor-fork-10** d54c497aa944 → b8be62ff (2 commits ahead, trivial doc updates including improved /handoff wording).
3. **CHERRY-PICK 4 mattpocock SOTA-unique skills**: shoehorn type-safety (TS), designing-deep-modules, interface-design-for-testability, planning-code-refactors — fit Node.js v22.22.0 runtime.
4. **CHERRY-PICK 2 addyosmani Define-phase skills**: interview-me (PR #164 2026-05-14), idea-refine — fills Define-phase gap in runtime skill bundle.
5. **REFRESH claude-code-workflows plugin** — pull version that includes wshobson commit `08ded5e7` (agent-teams coordination guardrails 2026-05-17); defer recsys-pipeline-architect cherry-pick until ML project demand.

---

**Citations**:
- wshobson: github.com/wshobson/agents @ `08ded5e7` (2026-05-17); deepwiki structure 12 sections
- addyosmani: github.com/addyosmani/agent-skills @ `f17c6e88` (2026-05-16); deepwiki structure 7 sections
- mattpocock: github.com/mattpocock/skills @ `b8be62ff` (2026-05-20); deepwiki structure 10 sections
- mksglu: github.com/mksglu/context-mode @ `4dcbd451` HEAD, tag v1.0.146 `b0c4c5cb` (2026-05-20); npm `context-mode` registry confirms 1.0.146
- Runtime: `.claude/plugins/cache/` enum (15 dirs), `.claude/state/subagent-type-allowlist.json`, `.claude/plugins/cache/context-mode/context-mode/1.0.136/plugin.json`
- CLAUDE.md L52 vendor-fork pins, L52 cardinal-rule-1 trust-tuple, cardinal-rule-4 trigger-quality corollary

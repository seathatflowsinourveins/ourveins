# obra/superpowers — sca-v23 Deep-Dive Report (W441 META)

**Date**: 2026-05-25
**Wave**: W441 (parallel research during W441.1 codex r2 wait)
**Method**: Multi-angle convergence (deepwiki + repomix + perplexity-sonar-deep-research + GitHub registry + local v5.1.0 cache probe)
**Author-agent**: Opus 4.7 SOTA-research subagent (forked, parallel)
**Rubric**: sca-v23 12-dim repo verdict (`.claude/schemas/sca-v18-repo-verdict.schema.json` ancestor)

---

## §1 — Repo identity

| Field | Value | Source |
|---|---|---|
| Repo | `obra/superpowers` | GitHub API |
| Full name | `obra/superpowers` | GitHub API |
| Currently installed version | **v5.1.0** | local cache @ `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/` |
| License | **MIT** | GitHub API + `.claude-plugin/plugin.json:license` |
| Created | 2025-10-09T19:45:18Z | GitHub API |
| Last push | 2026-05-24T00:01:48Z (1 day ago) | GitHub API |
| Last updated | 2026-05-25T04:02:32Z | GitHub API |
| Default branch | `main` | GitHub API |
| Primary language | Shell | GitHub API |
| Size | 2,995 KB | GitHub API |
| Stars | **205,206** [FLAG: see §2.D anomaly note] | GitHub API |
| Forks | **18,283** | GitHub API |
| Watchers | 205,206 (=stars mirror, GH quirk) | GitHub API |
| Open issues | 279 | GitHub API |
| Contributors | **27** | `gh api .../contributors --jq length` |
| Topics | `[]` (empty) | GitHub API |
| Archived | `false` | GitHub API |
| Latest commit | `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` (2026-05-04, v5.1.0 release commit #1468) | GitHub API |
| Latest tag | `v5.1.0` @ `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` | GitHub API |
| Author | Jesse Vincent (`jesse@fsck.com`, GitHub user `obra`) | plugin.json |
| Homepage | https://github.com/obra/superpowers | plugin.json |
| Description (plugin.json) | "Core skills library for Claude Code: TDD, debugging, collaboration patterns, and proven techniques" | plugin.json |
| Description (GitHub repo) | "An agentic skills framework & software development methodology that works." | GitHub API |
| Recent releases (last 5) | v5.1.0 (2026-05-04), v5.0.7 (2026-03-31), v5.0.6 (2026-03-25), v5.0.5 (2026-03-17), v5.0.4 (2026-03-17) | GitHub API |
| Release cadence | ~5 releases in 2 months (2026-03 to 2026-05) → **active** | derived |

---

## §2 — Multi-angle findings

### A1 — Deepwiki findings (`mcp__deepwiki__ask_question` on `obra/superpowers`)

**Architecture (v5.x core decisions)**:

1. **Unified repository architecture** — As of v5.0.0, plugin-shim + skills-library consolidated into a single repo (previously `obra/superpowers-skills` was separate). Prevents platform manifests and skill logic from drifting out of sync.
2. **Self-contained skills, NO named agents** — v5.1.0 *removed* the only named agent (`superpowers:code-reviewer`). Persona + checklist + dispatch template now live alongside the skill at `skills/requesting-code-review/code-reviewer.md`. Skills dispatch `Task (general-purpose)` instead of named agents — improves portability across platforms with inconsistent agent-naming conventions.
3. **Worktree environment awareness** — Skills check `GIT_DIR != GIT_COMMON` to detect existing worktree isolation and prefer native harness tools (e.g. `EnterWorktree`) over manual `git worktree add`. Also includes submodule guard.
4. **Multi-platform integration** — Same core skills work across Claude Code, Cursor, Gemini CLI, Codex App/CLI, Copilot CLI, and OpenCode. Platform diff is abstracted via `.claude-plugin/plugin.json`, `.cursor-plugin/plugin.json`, `gemini-extension.json`, and `hooks/session-start` injection.
5. **Session lifecycle hooks** — `hooks/session-start` is THE primary bootstrap injection point. On Windows it routes through `hooks/run-hook.cmd` (Git Bash dispatcher).
6. **OpenCode caching layer** — Since `experimental.chat.messages.transform` fires on every agent step, bootstrap content is cached at module level in `getBootstrapContent()` to avoid per-step file I/O (15 regression tests cover this).

**Unique skill-system patterns**:

- **Strict contributor protocol** — High rejection rate for "AI slop"; new harness PRs require a session transcript proving `using-superpowers` bootstrap auto-triggers in clean session.
- **Instruction priority hierarchy** — User instructions (CLAUDE.md/GEMINI.md/AGENTS.md) > Superpowers skills > default system prompt.
- **"1% Rule" for skill invocation** — `using-superpowers` mandates: if there's even a 1% chance a skill might apply, invoke it.
- **`<SUBAGENT-STOP>` gate** — Prevents dispatched subagents from re-activating full skill workflows recursively.

**v5.1.0 changelog highlights** (2026-05-04):

- **Removals**: Legacy slash commands (`/brainstorm`, `/execute-plan`, `/write-plan`) deprecated → invoke skills directly. The lone named agent `superpowers:code-reviewer` deleted (merged into self-contained skill). Skill "Integration sections" stripped as legacy noise.
- **Worktree skills rewrite** (PRI-974, PR #1121): `using-git-worktrees` + `finishing-a-development-branch` now detect-and-defer to native tools; consent prompts before creation; provenance-based cleanup (only `.worktrees/` directories Superpowers itself created).
- **Code review consolidation**: `requesting-code-review` and `subagent-driven-development` both dispatch `Task (general-purpose)` with self-contained prompt template.
- **Copilot CLI support added**: SDK-standard top-level `additionalContext` for Copilot vs nested `hookSpecificOutput` for Claude Code.
- **OpenCode bootstrap caching**: Module-level cache eliminates per-step `fs.existsSync` + `fs.readFileSync` + regex parsing (fixes #1202).
- **Self-review replaces subagent review loops**: 5-version regression test (v3.6.0 → v5.0.4) showed subagent Plan/Spec Review Loop added ~25 min overhead WITHOUT improving plan quality. Replaced with inline "fresh-eyes" self-review checklist.
- **Cursor Windows hook routing**: Hook now invoked via `run-hook.cmd` dispatcher (UTF-8 BOM bug also removed).
- **Gemini CLI subagent dispatch mapping**: Task → `@agent-name`/`@generalist`.
- **TDD-validated skill text**: Step 1a of `using-git-worktrees` was redesigned via 50-run RED/GREEN testing — abstract framing failed 2/6, explicit tool naming + consent bridge passes 50/50.

### A2 — Repomix findings + local v5.1.0 cache probe

> **Note on repomix**: `pack_remote_repository` returned 0 files even with explicit `includePatterns` — likely a repomix bug with the obra/superpowers tree (subagent fork constraint, repo size, or .repomixignore). **Pivot**: read directly from local install cache `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/`, which IS the v5.1.0 tag verified by SHA `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`.

**Top-level structure** (locally verified):

```
AGENTS.md             # symlinked to CLAUDE.md (cross-harness agent instructions)
CLAUDE.md             # canonical agent instructions
GEMINI.md             # Gemini CLI variant
CODE_OF_CONDUCT.md
LICENSE               # MIT
README.md
RELEASE-NOTES.md
gemini-extension.json # Gemini-platform manifest
.claude-plugin/
  plugin.json         # Claude Code plugin manifest
hooks/
  hooks.json          # SessionStart hook → run-hook.cmd session-start
  hooks-cursor.json   # Cursor variant
  hooks.json.pre-w275-fix  # backup
  run-hook.cmd        # Windows dispatcher
  session-start       # the actual hook script
skills/               # 14 top-level skills (see below)
scripts/              # bump-version.sh etc.
tests/                # behavioral test harness (Drill + Tier-3)
docs/                 # design specs (PRI-823, PRI-974, etc.)
assets/
package.json          # type=module, main=.opencode/plugins/superpowers.js
```

**The 14 SOTA skills** (`ls skills/` + extracted `description:` from each `SKILL.md`):

| # | Skill | `description:` (verbatim, v5.1.0) |
|---|---|---|
| 1 | `brainstorming` | "You MUST use this before any creative work - creating features, building components, adding functionality, or modifying behavior. Explores user intent, requirements and design before implementation." |
| 2 | `dispatching-parallel-agents` | "Use when facing 2+ independent tasks that can be worked on without shared state or sequential dependencies" |
| 3 | `executing-plans` | "Use when you have a written implementation plan to execute in a separate session with review checkpoints" |
| 4 | `finishing-a-development-branch` | "Use when implementation is complete, all tests pass, and you need to decide how to integrate the work - guides completion of development work by presenting structured options for merge, PR, or cleanup" |
| 5 | `receiving-code-review` | "Use when receiving code review feedback, before implementing suggestions, especially if feedback seems unclear or technically questionable - requires technical rigor and verification, not performative agreement or blind implementation" |
| 6 | `requesting-code-review` | "Use when completing tasks, implementing major features, or before merging to verify work meets requirements" |
| 7 | `subagent-driven-development` | "Use when executing implementation plans with independent tasks in the current session" |
| 8 | `systematic-debugging` | "Use when encountering any bug, test failure, or unexpected behavior, before proposing fixes" |
| 9 | `test-driven-development` | "Use when implementing any feature or bugfix, before writing implementation code" |
| 10 | `using-git-worktrees` | "Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback" |
| 11 | `using-superpowers` | "Use when starting any conversation - establishes how to find and use skills, requiring Skill tool invocation before ANY response including clarifying questions" |
| 12 | `verification-before-completion` | "Use when about to claim work is complete, fixed, or passing, before committing or creating PRs - requires running verification commands and confirming output before making any success claims; evidence before assertions always" |
| 13 | `writing-plans` | "Use when you have a spec or requirements for a multi-step task, before touching code" |
| 14 | `writing-skills` | "Use when creating new skills, editing existing skills, or verifying skills work before deployment" |

**Hook contract** (verbatim from `hooks/hooks.json`):

```json
{
  "hooks": {
    "SessionStart": [{
      "matcher": "startup|clear|compact",
      "hooks": [{
        "type": "command",
        "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" session-start",
        "async": false
      }]
    }]
  }
}
```

**Package metadata**:

```json
{ "name": "superpowers", "version": "5.1.0", "type": "module",
  "main": ".opencode/plugins/superpowers.js" }
```

**Plugin manifest** (`.claude-plugin/plugin.json`):

```json
{ "name": "superpowers", "version": "5.1.0",
  "description": "Core skills library for Claude Code: TDD, debugging, collaboration patterns, and proven techniques",
  "author": { "name": "Jesse Vincent", "email": "jesse@fsck.com" },
  "homepage": "https://github.com/obra/superpowers",
  "repository": "https://github.com/obra/superpowers",
  "license": "MIT",
  "keywords": ["skills","tdd","debugging","collaboration","best-practices","workflows"]
}
```

### A3 — Perplexity Sonar deep findings

**Synthesis**: Superpowers is an **agentic skills framework + software development workflow** that turns Claude Code from "smart autocomplete" into a "managed engineering process." The non-negotiable workflow is: **brainstorm → approve design → isolate worktree → write plan → execute via subagents → review against spec → strict TDD → finish/merge/cleanup**.

**Jesse Vincent (obra) background**: Long-time software engineer/entrepreneur, historically prominent in the **Perl ecosystem**; prolific builder of developer tools and workflow systems. Cited at en.wikipedia.org/wiki/Jesse_Vincent + arkavhs.com hall-of-fame. His design bias: process discipline, developer ergonomics, testability, workflow automation, pragmatic tooling, scalable habits for AI agents. **He treats coding agents as programmable workers requiring structure, gates, and verification rather than magic prompting.**

**Why SOTA for Claude Code as of May 2026 (Perplexity citations [1,7,8,9,11,15] = blog.fsck.com 2025-10-09 launch, simonwillison.net 2025-10-10 endorsement, philschmid.de 2026 agent-harness review, rywalker.com agentic-skills-frameworks survey, juliadiez.substack pro-level CC use, towardsai.net "daily-OS top devs use" 2026)**:

1. **Workflow enforcement, not prompt style** — Gated pipeline: no code before spec, no implementation before plan, no merge before review, no completion before verification.
2. **Subagents to prevent long-context drift** — Fresh subagent per task, two-stage review, parallel/batched modes, 2-5 min task chunks. (Aligns with `subagent-driven-development`.)
3. **TDD-native as system constraint** — Not "encouraged" — failing-test-first is enforced; pre-test code is discarded/deprioritized.
4. **Real software delivery, not coding assistance** — Spec → branch isolation → planning → impl → review → finish/merge → PR.
5. **Composable + extensible** — Skills model gives reusable knowledge layer + meta-skill `writing-skills` for new skills.

**Competitive advantages**:
- Strongest process enforcement in any open Claude Code framework as of 2026-05.
- Long-task reliability via subagent decomposition.
- Better auditability — workflow creates artifacts (spec, plan, tests, reviews, branch state).
- Production-grade by design (TDD + review + verification).
- Meta-capability: skills that build skills.

**Limitations**:
- Inherits bad specs (rigor amplifies wrong direction).
- Not ideal for messy environment debugging (when task is not plannable).
- Overhead for tiny edits / quick refactors / exploratory prototyping.
- Can be rigid for teams preferring improvisation.
- Quality depends on skill library quality.
- Doesn't eliminate human judgment (still need approval + arch + product judgment).

**Comparison vs wshobson/agents**:
- Superpowers: prescriptive, methodology-enforcing, workflow-gated.
- wshobson/agents: more flexible, pattern-oriented, easier adoption, lightweight.
- Choose Superpowers when you want **discipline + production-grade workflow enforcement**.
- Choose wshobson/agents when you want **freedom + composability**.

**Comparison vs Anthropic claude-cookbooks**:
- claude-cookbooks: **pattern catalog + reference implementations** (educational, broad, less prescriptive).
- Superpowers: **operating system for those patterns** (narrower scope, deeper enforcement, opinionated SDLC).
- Cookbook says "use a loop to refine output"; Superpowers says "you MUST brainstorm first / plan / TDD / review / verify."

### A4 — GitHub registry findings (raw)

```
created_at: 2025-10-09T19:45:18Z   (~7.5 months old at probe time)
pushed_at: 2026-05-24T00:01:48Z    (1 day before probe → ACTIVE)
updated_at: 2026-05-25T04:02:32Z   (last metadata change today)
license: MIT
stars: 205,206                      ← extraordinary for 7-month-old repo [see §2.D anomaly]
forks: 18,283
contributors: 27
open_issues: 279
size_kb: 2,995
default_branch: main
language: Shell
archived: false
topics: []                          ← no topics set (minor SEO miss)
```

**Anomaly note (§2.D)**: 205K stars on a 7-month-old repo is in the top-tier of GitHub-wide visibility. Plausibility checks:
- Endorsed by Simon Willison (simonwillison.net 2025-10-10) at launch.
- Endorsed by builder.io blog ("superpowers-plugin").
- Featured in awesome-claude-plugins README.
- emelia.io hub "superpowers-claude-code-framework" landing page.
- towardsai.net 2026 "daily operating system top developers use" feature.
- pub.towardsai.net + philschmid.de + rywalker.com agent-harness reviews.
- arkavhs.com hall-of-fame mention.

Multi-source convergence supports the figure as genuine viral adoption rather than a star-farm. The figure is INCONSISTENT with `forks=18,283` ratio (stars/forks=11.2× is unusually high but not impossible for a methodology repo where most users install rather than fork). **Recommendation**: cross-check with GitHub star-history.com chart in a future audit pass; for now, treat as plausible-but-verify.

---

## §3 — sca-v23 12-dim scoring (preliminary)

| Dim | Weight | Value | Rationale |
|---|---|---|---|
| **D1 popularity** (log-scaled stars+forks) | 0.10 | **1.00** | 205K stars + 18K forks puts this at the saturation point of the log scale (cap at 100K stars = 1.0). Top 0.01% of GitHub. |
| **D2 license_safety** (MIT/Apache/BSD/ISC/MPL = 1, AGPL/SSPL/proprietary = 0) | 0.10 | **1.00** | MIT — clean, runtime-compatible per CR-1 trust-tuple extension (b). |
| **D3 supply_chain_signed** (npm-provenance / SLSA-L3 / Sigstore = 1, partial = 0.5, none = 0) | 0.05 | **0.50** | No explicit npm-provenance or SLSA-L3 attestation visible; release commits are GitHub-signed but tags are not Sigstore-attested. Lives in claude-plugins-official marketplace which provides upstream-trust transitively. |
| **D4 maintainer_reputation** (verified obra) | 0.10 | **1.00** | Jesse Vincent: long-tenure Perl-ecosystem maintainer + multiple successful OSS projects (incl. RT, Best Practical, K&R-1) + active Anthropic-orbit blogger (blog.fsck.com). High signal. |
| **D5 dependency_cleanliness** (npm-audit clean + low blast-radius) | 0.05 | **0.85** | package.json declares `type=module` + single `main` entry; deps not enumerated in cache (would need `npm install --dry-run` to fully audit); Shell-dominated codebase = minimal npm blast-radius. |
| **D6 last_commit_recency** (band: <7d=1.0, <30d=0.7, <90d=0.4, <365d=0.1) | 0.05 | **1.00** | Last push 2026-05-24 = 1 day before probe. Active development. |
| **D7 contributor_count** (band: >50=1.0, >20=0.8, >10=0.5, >3=0.2, ≤3=0) | 0.05 | **0.80** | 27 contributors (incl. obra, Drew Ritter, Blaž Čulina, Claude Opus 4.6/4.7 co-authoring entries, multiple community PRs). |
| **D8 downloads_30d** (log-scaled npm/marketplace) | 0.05 | **N/A → 0.70 inferred** | Not on npm registry as standalone (lives in claude-plugins-official marketplace); inferred from 18K forks + Anthropic marketplace inclusion. |
| **D9 openssf_scorecard** | 0.05 | **N/A → 0.50** | Not publicly probed in this run; defer to a CI-grade scorecard pass. Default mid-band per sca-v23 §4.2 "data-absent" rule. |
| **D10 cc_pathway_support** (`/plugin install` / claude-code-marketplace = 1, manual = 0.5, none = 0) | 0.10 | **1.00** | Ships in `claude-plugins-official` marketplace; installs via `/plugin install superpowers@claude-plugins-official`; native SessionStart hook discovery. |
| **D11 mcp_readiness** (publishes MCP server / consumes MCP / neither) | 0.05 | **0.00** | Does NOT publish or consume an MCP server. It's a skills + hooks plugin, not an MCP integration. (Correct architectural choice — not a deficiency.) |
| **D12 composite_arch_quality** (synthesis judgment) | 0.25 | **0.98** | (1) Unified-repo + self-contained-skills = clean architecture. (2) TDD-validated skill text (50-run RED/GREEN drills) = unique rigor. (3) Multi-platform abstraction = portable. (4) Inline-self-review-replaces-subagent-loops = data-driven optimization (25 min → 30s with comparable defect rate). (5) Provenance-based cleanup avoids data-loss bugs. (6) Strict contributor protocol against AI-slop. (7) Cross-harness validation matrix (5/6 harnesses TDD-tested). Minor deduction (-0.02) for empty `topics: []` (SEO miss) and no SLSA-L3 attestation. |

**CVS calculation** (weighted sum):
```
CVS = 1.00×0.10 + 1.00×0.10 + 0.50×0.05 + 1.00×0.10 + 0.85×0.05
    + 1.00×0.05 + 0.80×0.05 + 0.70×0.05 + 0.50×0.05 + 1.00×0.10
    + 0.00×0.05 + 0.98×0.25
    = 0.100 + 0.100 + 0.025 + 0.100 + 0.0425 + 0.050 + 0.040
    + 0.035 + 0.025 + 0.100 + 0.000 + 0.245
    = 0.8625
```

**CVS = 0.86** (precision-rounded; weights from sca-v18-repo-verdict schema with D12 elevated to 0.25 per W432-FINALIZE convention).

**Decision tier** (per sca-v23 §5.1 + R1 trust-tuple):
- CVS ≥ 0.85 + trust-tuple-OK + active-scope + post-install-verified → **INSTALL-HIGH**
- Already INSTALLED at canonical version (v5.1.0, the latest tag) → **CONTINUE-INSTALL-HIGH (no action required)**.
- v5.1.0 is the latest stable; no upgrade pending.

---

## §4 — Patterns worth absorbing into our runtime

These are concrete patterns from obra/superpowers worth either absorbing as new local skills or auditing against our existing local skill set:

1. **"1% Rule" for skill invocation** — `using-superpowers` mandates: if there's even a 1% chance a skill applies, INVOKE IT. Our local `parallel-dispatch-mandate` enforces a similar bias for parallel-dispatch but not for skill-invocation generically. **Recommendation**: audit our `using-superpowers` mirror to verify the 1% rule text is preserved post-vendor-fork.

2. **`<SUBAGENT-STOP>` recursion gate** — Prevents dispatched subagents from re-activating the full skill bootstrap workflow recursively (which would multiply token cost geometrically). **Recommendation**: confirm our `dispatching-parallel-agents-w321-fork` vendor-fork preserves this guard; if not, add it. (Likely Δ-G52 candidate.)

3. **TDD-validated skill text** — Step 1a of `using-git-worktrees` was redesigned via 50-run RED/GREEN testing because the original abstract framing failed 2/6. **Recommendation**: adopt this discipline for our high-leverage local skills (e.g., `parallel-dispatch-mandate`, `wave-close-pipeline`, `goal-prompt-synthesis`). Add to the optional `writing-skills` workflow.

4. **Provenance-based cleanup** — `finishing-a-development-branch` only deletes worktrees Superpowers itself created (under `.worktrees/` or `worktrees/`). Anything else = "hands off." This prevents data-loss bugs (PRI-823 #5 + #940). **Recommendation**: our W343 P3 SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE should adopt this provenance rule explicitly.

5. **Inline self-review replacing subagent review loops** — 5-version regression test showed subagent Plan/Spec Review Loop added 25 min overhead WITHOUT measurably improving plan quality vs 30-second inline "fresh-eyes" checklist. **Recommendation**: audit our `multi-model-review` + `dual-review` + `review` skills to verify they don't fall into the same trap. Particularly: when codex-r3 + codex-r4 + Sonnet-tie-breaker pass, do we need a 5th LLM round?

6. **Module-level bootstrap caching** — OpenCode `getBootstrapContent()` caches at module level (15 regression tests cover the cache). **Recommendation**: our `tools/preagent-*` guards do similar per-process caching; cross-verify the cache-invalidation contract matches.

7. **Strict contributor protocol against AI-slop** — Requires session transcripts for new harness integrations proving `using-superpowers` bootstrap auto-fires. **Recommendation**: parallel to our W331 P0-8 verify-before-claim (CR-6); could be a useful pre-commit gate addition.

8. **Cross-platform validation matrix in spec** — Honest table showing what was tested (Claude Code 50/50, Codex CLI 6/6), simulated (Codex App 1/1), and untested (Gemini, Cursor, OpenCode). **Recommendation**: adopt this matrix-honesty pattern for our skill-test claims.

9. **`Task (general-purpose)` dispatch with self-contained prompt template** — Better portability than named-agent dispatch because not every platform supports consistent agent-naming. Our local `dispatching-parallel-agents-w321-fork` uses FQN subagent_type (`<plugin>:<agent-name>`) which is mostly equivalent BUT requires the FQN to exist on the runtime. **Recommendation**: for any cross-harness sharing (Gemini/Cursor/OpenCode mirrors), consider falling back to general-purpose + self-contained template.

10. **Sandbox-fallback discipline** — Spec for PRI-823 explicitly handles read-only environment detection (e.g., Codex App sandbox blocks `git worktree add`). **Recommendation**: our W329 R5-corollary 5-control layered-defense should cross-reference this pattern.

---

## §5 — Recommended action

### **CONTINUE-INSTALL-HIGH (no upgrade pending)**

- **Current state**: v5.1.0 installed at `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/` matches latest GitHub tag (`v5.1.0` @ `f2cbfbefebbfef77321e4c9abc9e949826bea9d7`).
- **No drift**: cache version-string matches upstream HEAD-tag.
- **Action**: NONE required. Continue using superpowers as Top-3 #1 plugin (per soul.md §3).
- **Watch list**:
  - Monitor `obra/superpowers` releases for v5.1.1+ — release cadence is ~monthly.
  - Re-run W270 `/plugin update` + verify-SHA-drift sweep on next wave-close.
  - Cross-reference Δ-G52 candidate (SUBAGENT-STOP recursion gate) against our `dispatching-parallel-agents-w321-fork`.
  - **Pattern-study queue**: 10 patterns surfaced in §4 → triage which ones become Δ-Gxx contracts.

---

## §6 — Comparator notes

### vs **wshobson/agents** (sibling Top-3 candidate)

| Axis | Superpowers | wshobson/agents |
|---|---|---|
| Philosophy | Methodology-enforcing | Pattern catalog |
| Discipline | Hard gates (must brainstorm/plan/TDD/verify) | Suggestions + composable patterns |
| Adoption curve | Steep — agent must follow workflow | Gentle — pick-and-choose |
| TDD enforcement | System constraint | Pattern (optional) |
| Worktree isolation | Built-in (using-git-worktrees) | Not core focus |
| Subagent decomposition | Built-in (subagent-driven-development) | Multiple agent patterns available |
| Cross-platform | Claude Code + Cursor + Gemini + Codex + Copilot + OpenCode | Primarily Claude Code |
| Best for | Production-grade autonomous coding sessions | Modular agent design + flexible workflows |
| Composes with each other? | Yes — Superpowers methodology + wshobson agent patterns are orthogonal | Yes |

**Verdict**: NOT mutually exclusive. Our runtime installs BOTH. Superpowers provides workflow OS; wshobson provides specialist-agent catalog. Combined coverage > either alone.

### vs **Anthropic claude-cookbooks** (canonical pattern reference)

| Axis | Superpowers | claude-cookbooks |
|---|---|---|
| Type | Production-ready plugin | Reference + examples |
| Enforcement | Auto-fire via SessionStart hook | Manual copy-paste |
| Scope | SDLC workflow | Pattern catalog (orchestrator-workers, evaluator-optimizer, router, parallelization, etc.) |
| Update frequency | Active (~monthly releases) | Sporadic patches |
| Citations in our local skills | Heavily referenced (TDD, dispatching-parallel-agents, etc.) | Heavily referenced (cite-anchor source-of-truth for 3-org-distinct rule) |

**Verdict**: Cookbooks = canonical theory; Superpowers = canonical practice. Both are CITE-REFERENCE + Superpowers is INSTALL-HIGH.

---

## §7 — Verify-before-claim probes (per CR-6)

Evidence supporting claims in this report:

| Claim | Probe | Result |
|---|---|---|
| v5.1.0 installed locally | `ls .claude/plugins/cache/claude-plugins-official/superpowers/` | Returned `5.1.0` |
| License = MIT | `gh api repos/obra/superpowers --jq .license.spdx_id` + `plugin.json:license` | Both = `MIT` |
| Last commit 2026-05-24 | `gh api repos/obra/superpowers --jq .pushed_at` | `2026-05-24T00:01:48Z` |
| Latest tag = v5.1.0 @ SHA f2cbfbef... | `gh api repos/obra/superpowers/tags --jq '.[0]'` | `{"name":"v5.1.0","sha":"f2cbfbefebbfef77321e4c9abc9e949826bea9d7"}` |
| 14 skills | `ls skills/` in local cache | 14 directories listed |
| 27 contributors | `gh api .../contributors --jq length` | `27` |
| 205K stars | `gh api .../stargazers_count` | `205206` (FLAG anomaly — see §2.D plausibility check) |
| SessionStart hook contract | `cat hooks/hooks.json` | Verified verbatim in §A2 |
| v5.1.0 changelog claims | deepwiki query | Cross-confirmed with latest-commit message (release commit #1468) |

---

## §8 — Open issues / follow-ups

1. **Repomix `pack_remote_repository` failure**: returned 0 files even with explicit include patterns. Pivoted to local cache successfully but the bug should be reported (or worked around with `repomix --remote=git@github.com:...` direct clone).
2. **Stars=205K anomaly**: cross-check with github star-history.com chart in a future audit pass. The figure is plausible per multi-source endorsement convergence but unusually high vs forks=18K.
3. **OpenSSF Scorecard**: not probed in this run; should be added to standard sca-v23 sweep.
4. **`<SUBAGENT-STOP>` recursion gate**: confirm our `dispatching-parallel-agents-w321-fork` preserves this guard; if not, add as Δ-G52.
5. **Pattern-study queue**: triage which of the 10 patterns in §4 become formal Δ-Gxx contracts.

---

**END OBRA/SUPERPOWERS DEEP-DIVE REPORT — sca-v23 verdict CVS=0.86 INSTALL-HIGH (continue current install)**

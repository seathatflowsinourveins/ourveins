# STREAM-B-addyosmani-agent-skills — W319 Stream B

## HEAD-SHA-AT-INGEST
- `f17c6e88c904dc747381c374312c2d58e10647ae` @ 2026-05-16 15:00:25 -0700
- 23 skills, 3 agents (code-reviewer, security-auditor, test-engineer), 9 hook files

## CITE-DRIFT

| Cite location | Cited value | Current truth | Action |
|---|---|---|---|
| CLAUDE.md L30 | `addyosmani-vendor-fork-5: ... @ addyosmani/agent-skills f17c6e88 2026-05-19` | Matches `f17c6e88c904dc747381c374312c2d58e10647ae` | **ZERO DRIFT** — repo unchanged since W316 vendor-fork |
| CLAUDE.md L41 (W316 Stream D) | "addyosmani 5-skill vendor-fork from `f17c6e88c904dc747381c374312c2d58e10647ae`" | Matches exactly | **ZERO DRIFT** |
| `.claude/skills/addyosmani-*/SKILL.md` (4 skills) + `.claude/skills/{api-and-interface-design,code-simplification,doubt-driven-development,frontend-ui-engineering,interview-me}/SKILL.md` | All cite `f17c6e88` | Matches | none |
| `docs/architecture/W315-NEW-REPO-AUDITS/...addyosmani...` | Cites `f17c6e88` | Matches | none |

ZERO CITE-DRIFT. All vendor-fork SHA cites are exact-match against upstream HEAD.

## NET-NEW-PATTERNS (since vendor-fork)

The vendor-fork SHA matches the current HEAD exactly, so this repo has had ZERO upstream changes since we last pulled it. Net-new since fork:

| PRIO | Pattern | Cite (path:line) | Why net-new |
|---|---|---|---|
| — | (no new commits since vendor-fork) | — | — |

But there are 18 skills NOT-YET-VENDORED that could be evaluated:

| PRIO | Not-yet-vendored skill | Cite | Should-we-vendor reasoning |
|---|---|---|---|
| 2 | `browser-testing-with-devtools` | `skills/browser-testing-with-devtools/SKILL.md` | We have `mcp__chrome-devtools__*` MCP — augmenting with skill-side guidance is duplicative. PRIO-2 informational. |
| 2 | `ci-cd-and-automation` | `skills/ci-cd-and-automation/SKILL.md` | Generic; our `.claude/settings.json` direct-CLI gitleaks/ruff/shellcheck hooks already cover CI. PRIO-2. |
| 2 | `code-review-and-quality` | `skills/code-review-and-quality/SKILL.md` | Overlaps with installed `code-review:code-review` + `engineering-skills:code-reviewer`. PRIO-2. |
| 2 | `context-engineering` | `skills/context-engineering/SKILL.md` | We have `superpowers:dispatching-parallel-agents` + own `parallel-dispatch-mandate`. PRIO-2 (could be unique angle). |
| 2 | `debugging-and-error-recovery` | `skills/debugging-and-error-recovery/SKILL.md` | We have `diagnose` (mattpocock) + `systematic-debugging` (superpowers). PRIO-2. |
| 2 | `deprecation-and-migration` | `skills/deprecation-and-migration/SKILL.md` | We have `code-modernization:*` plugin suite (8 skills). PRIO-2. |
| 2 | `documentation-and-adrs` | `skills/documentation-and-adrs/SKILL.md` | ADRs are anchoring pattern; we don't have a dedicated ADR-management skill. **PRIO-2 candidate for W320 audit.** |
| 2 | `git-workflow-and-versioning` | `skills/git-workflow-and-versioning/SKILL.md` | We have `developer-essentials:git-advanced-workflows`. PRIO-2. |
| 2 | `idea-refine` | `skills/idea-refine/SKILL.md` | Pre-spec ideation; we have `superpowers:brainstorming`. PRIO-2 (could be a refinement). |
| 2 | `incremental-implementation` | `skills/incremental-implementation/SKILL.md` | TDD-adjacent; we have `tdd-workflows:*`. PRIO-2. |
| 2 | `performance-optimization` | `skills/performance-optimization/SKILL.md` | We have `engineering-advanced-skills:performance-profiler`. PRIO-2. |
| 2 | `planning-and-task-breakdown` | `skills/planning-and-task-breakdown/SKILL.md` | We have `planning-with-files` plugin. PRIO-2. |
| 2 | `security-and-hardening` | `skills/security-and-hardening/SKILL.md` | We have `engineering-skills:senior-security` + `:senior-secops`. PRIO-2. |
| 2 | `shipping-and-launch` | `skills/shipping-and-launch/SKILL.md` | We have `engineering-advanced-skills:ship-gate`. PRIO-2. |
| 2 | `source-driven-development` | `skills/source-driven-development/SKILL.md` | CLAUDE.md L11 lists `addy-agent-skills (source-driven-development)` — appears already wired via the `addy-agent-skills` marketplace declaration. Verify; if so ZERO DRIFT. |
| 2 | `spec-driven-development` | `skills/spec-driven-development/SKILL.md` | We have full `speckit-*` suite (10 commands). PRIO-2. |
| 2 | `test-driven-development` | `skills/test-driven-development/SKILL.md` | We have `tdd` (mattpocock) + `tdd-workflows:*`. PRIO-2. |
| 3 | `using-agent-skills` | `skills/using-agent-skills/SKILL.md` | Meta-skill for skill usage. PRIO-3 informational. |
| 3 | `agents/security-auditor.md` | `agents/security-auditor.md` | Specialized agent we don't have. PRIO-3 candidate. |
| 3 | `agents/test-engineer.md` | `agents/test-engineer.md` | Specialized agent. PRIO-3 candidate. |
| 3 | `agents/code-reviewer.md` | `agents/code-reviewer.md` | We have multiple code-reviewer agents already. PRIO-3. |
| 3 | `hooks/sdd-cache-pre.sh` + `sdd-cache-post.sh` — spec-driven-development cache hooks | `hooks/sdd-cache-*.sh` | Hook scripts for SDD caching. Cardinal-rule-2 compliant. PRIO-3 informational. |
| 3 | `hooks/simplify-ignore.sh` + `simplify-ignore-test.sh` | `hooks/simplify-ignore*.sh` | Simplify-ignore convention. PRIO-3. |
| 4 | `hooks/session-start.sh` + `session-start-test.sh` | `hooks/session-start*.sh` | Session-start hook example. We have `hindsight-recall` patterns. |
| 5 | `references/` dir for skill anchors | `references/` | Reference-only files. |

## STALE-IN-UPSTREAM
None. Our 5 vendored skills (interview-me, doubt-driven-development, frontend-ui-engineering, api-and-interface-design, code-simplification) match upstream exactly at f17c6e88.

## HARNESS-FIT
- Decision: VENDOR-FORK HOLD; 5 skills vendored, 18 skills available NOT YET adopted
- Action W320 audit candidates (PRIO-2 cherry-pick): `documentation-and-adrs` (no current ADR-management skill), `idea-refine` (pre-spec ideation gap)
- License: MIT
- 3 pre-existing addyosmani-skill dupes flagged in W316-3-OBS-1: confirmed today, the 5 we vendor have both prefix-namespaced + bare-name variants (`addyosmani-doubt-driven-development` + `doubt-driven-development`). This dupe pattern should be resolved in W320 cleanup.

## License
MIT

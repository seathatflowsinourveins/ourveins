# W287 Stream G — Deep-dive Audit: ChristopherKahler/paul

**Date**: 2026-05-18 (W287, /goal P3(g))
**Repo**: https://github.com/ChristopherKahler/paul (924★)
**HEAD audited**: `1ae07e0` (docs: update Skool link, sole commit since v1.2 tag)
**Rubric**: W284a v2 SOTA convergence audit + 3-source-typed-evidence floor
**Stream D claim re-tested**: Plan-Apply-Unify loop with mandatory UNIFY per-plan reconciliation; CARL dynamic rule-engine; BDD-first acceptance criteria

## VERDICT: REJECT (structural duplicate)

Adoption recommendation: REJECT-with-cherry-pick (one ergonomic phrase only). PAU loop is structurally identical to the installed **speckit-plan / speckit-implement / speckit-analyze** trio plus **superpowers:writing-plans / executing-plans / verification-before-completion** lifecycle. CARL is a sibling repo (not in this audit's scope) integrated via shell-env vars in `src/carl/PAUL` — NOT a distinct primitive. BDD Given/When/Then is already trivially available via superpowers template language. Single-maintainer × 35-commit project with 1 contributor in last 90d does not justify a 28-command surface area.

## Per-component evidence

### 1. Plan-Apply-Unify loop primitive

**Implementation found** (`tmp/repo-probes/paul/`):

- `src/commands/{plan,apply,unify}.md` — `/paul:{plan,apply,unify}` slash commands (PLAN/APPLY/UNIFY phase entries)
- `src/workflows/plan-phase.md:1-385` — full PLAN with scope-classify routing (quick-fix / standard / complex)
- `src/workflows/apply-phase.md:1-393` — APPLY with E/Q (Execute/Qualify) loop + escalation statuses (DONE / DONE_WITH_CONCERNS / NEEDS_CONTEXT / BLOCKED)
- `src/workflows/unify-phase.md:1-290` — UNIFY: gather_results → compare_plan_vs_actual → audit_skill_invocations → create_summary

**Loop enforcement**: `src/carl/PAUL:12` (`PAUL_RULE_3=Every APPLY must be followed by UNIFY`) — declared as shell-env rule string. Not a runtime guard; relies on agent obedience to file content.

**Structural-duplicate matrix vs installed primitives**:

| PAUL primitive | Installed equivalent | Cite | Verdict |
|---|---|---|---|
| `/paul:plan` (scope-classify + plan generation) | `speckit-plan` | `.claude/skills/speckit-plan/SKILL.md:1-19` | DUPLICATE |
| `/paul:plan` plan-document authoring | `superpowers:writing-plans` (Iron-Law verification gate, bite-sized tasks 2-5 min) | `.claude/plugins/cache/superpowers-marketplace/superpowers/5.1.0/skills/writing-plans/SKILL.md:1-60` | DUPLICATE (superpowers stricter) |
| `/paul:apply` (execute approved plan task-by-task) | `speckit-implement` + `superpowers:executing-plans` + `superpowers:test-driven-development` | `.claude/skills/speckit-implement/SKILL.md:1-20` + superpowers skills | DUPLICATE |
| `/paul:unify` (reconcile plan vs actual) | `speckit-analyze` (cross-artifact consistency) + `superpowers:verification-before-completion` (evidence-before-assertions gate) | `.claude/skills/speckit-analyze/SKILL.md:1-20` + superpowers skill | DUPLICATE |
| Boundaries "DO NOT CHANGE" hard constraints | speckit plan template scope/constraints section + superpowers writing-plans boundaries | spec-kit templates | OVERLAP (trivially expressible) |
| BDD Given/When/Then ACs | superpowers:writing-plans template language; any plan doc verbatim | `tmp/repo-probes/paul/src/references/plan-format.md:152-157` | DUPLICATE-trivial |

**Conclusion**: PAU loop structurally equivalent to installed speckit trio + superpowers stack. Only genuine differentiator is *mandatory* UNIFY enforcement — but enforcement is purely advisory (LLM reads `PAUL_RULE_3` and expected to obey). Equivalent guardrails available via `superpowers:verification-before-completion` SKILL auto-trigger.

### 2. CARL dynamic rule-engine

**Source**: `tmp/repo-probes/paul/src/carl/PAUL:1-26` + `tmp/repo-probes/paul/src/carl/PAUL.manifest:1-12`

**Implementation**: 12 shell-style env-var declarations:
```
PAUL_STATE=active
PAUL_ALWAYS_ON=false
PAUL_RULE_0=PAUL governs structured AI development...
PAUL_RULE_1=LOAD BEFORE EXECUTE: ...
...
PAUL_RULE_12=Urgent work uses decimal phases (2.1, 2.2)...
```

**Manifest**: `PAUL_RECALL=paul,plan phase,apply phase,unify phase,PLAN.md,STATE.md,...` — comma-delimited keyword-recall list.

**Is this a distinct primitive? NO.**
- CARL "engine" lives at `github.com/ChristopherKahler/carl-core` (separate repo per `README.md:323`)
- This repo only ships **the PAUL domain file** intended to be appended to `~/.carl/manifest`
- Shell-environment-variable text, not an engine — no executable code, no parser, no JIT-loader logic
- README pitches "just-in-time rule loading" but actual mechanism is "KEY=VALUE strings LLM reads when context matches `PAUL_RECALL` keywords" — structurally equivalent to a CLAUDE.md preload section or skill `description:` auto-trigger, but without production-tested SKILL-frontmatter ergonomics per `https://code.claude.com/docs/en/skills`

**CARL-as-shipped is YAML/INI-config-by-another-name. NOT a primitive worth installing.**

### 3. BDD-first acceptance criteria

Confirmed Given/When/Then format mandated:
- `src/carl/PAUL:20` — `PAUL_RULE_9=Use BDD acceptance criteria: Given [precondition] / When [action] / Then [outcome]`
- `src/references/plan-format.md:152-157` — template language
- `src/templates/PLAN.md:75-91` — example AC blocks all in Given/When/Then form

**Adoption-relevance**: BDD ACs universally expressible in any plan doc. `superpowers:writing-plans` supports them; speckit `spec.md` is scenario-based. **No installation needed to use BDD ACs.**

### 4. Maintainer activity

- Total commits (all branches): 35
- Last-90d commits: 6 (v1.1 satellite manifest, /paul:register, v1.2 quality-depth, ecosystem docs, Skool link update)
- Contributors: 1 (Christopher Kahler — bus-factor = 1)
- Tags: v0.1, v0.2, v1.0.3, v1.2.0 — semver discipline present
- License: MIT
- 924★ relative to single-maintainer × 35-commit codebase indicates marketing reach (npm + Skool community at `chrisai.cv/skool`) more than community-driven engineering investment

**Bus-factor concern**: 1 contributor + 6 commits in 90d ≠ runtime that should sit on critical path of SOTA-converged harness. Cannot meet W284a v2 rubric's `commit-SHA-freshness × multi-contributor-redundancy` floor.

### 5. Harness-fit

- **Anthropic/CC-native?** YES — installs to `~/.claude/commands/paul/` via `bin/install.js`
- **Vendor SDK dependency?** Zero non-Anthropic deps (`package.json` has no `dependencies`; pure markdown + JS installer)
- **Self-invent hooks?** NO — installs slash commands + markdown reference files only. Cardinal-rule-2 compliant
- **State files written**: `.paul/STATE.md`, `.paul/PROJECT.md`, `.paul/ROADMAP.md`, `.paul/phases/{N}/{plan}-PLAN.md`, `.paul/phases/{N}/{plan}-SUMMARY.md`, `.paul/HANDOFF-{date}.md` — NEW project-state files PAUL invents. Conflicts with `Z:\claude-sota-installed-state\` state-outside-repo policy unless redirected
- **CARL companion**: optional, separate repo. Without CARL, the PAUL rule file is dead

**Harness-fit verdict**: Technically installable cleanly, but `.paul/` state-tree conflicts with state-outside-repo discipline + requires redirect plumbing. Net: friction > value.

## Structural-duplicate matrix vs 4 installed primitives

| Component | `everything-claude-code:plan` | `superpowers:writing-plans` | `speckit-plan/-implement/-analyze` | `gsd-build/get-shit-done` |
|---|---|---|---|---|
| PAU loop (Plan / Apply / Unify) | NOT distinct; ecc:plan = plan-doc authoring only | DUPLICATE — superpowers end-to-end | **EXACT TRIO MATCH** | DUPLICATE — GSD pioneered PLAN→EXECUTE |
| Mandatory UNIFY/reconciliation gate | n/a | `superpowers:verification-before-completion` | `speckit-analyze` reconciles | GSD has implicit review |
| CARL rule-engine | n/a (CLAUDE.md preload + skill description: auto-trigger is SOTA equivalent) | n/a | n/a | n/a |
| BDD Given/When/Then ACs | n/a | DUPLICATE | DUPLICATE | n/a |
| Boundaries / DO-NOT-CHANGE | n/a | scope-check section | speckit plan-template constraints | scope guidance |

**Net duplicate-overlap**: 5/5 PAUL components have ≥1 structural equivalent. Adoption creates surface-area redundancy, not capability uplift.

## What to cherry-pick

If the operator wants ONE phrase from PAUL: the **mandatory-UNIFY ergonomic frame** — public-facing language "every plan closes with UNIFY; no orphan plans" is a clean teachable concept. Could be added as one sentence to `CLAUDE.md` cardinal rule 1 commentary OR to a custom hook description. **No installation; just borrow the framing.**

## Final verdict block

```
ADOPT/STUDY/REJECT: REJECT
RATIONALE: Structural duplicate of speckit-plan/implement/analyze trio + superpowers writing-plans/executing-plans/verification-before-completion stack. CARL is shell-env-var config, not a distinct primitive. BDD ACs are template language available everywhere. Single-maintainer × 6-commit-90d bus factor below floor.
CHERRY-PICK: borrow the "mandatory UNIFY / no orphan plans" framing into a CLAUDE.md sentence; do not install the 28-command surface area or `.paul/` state tree.
```

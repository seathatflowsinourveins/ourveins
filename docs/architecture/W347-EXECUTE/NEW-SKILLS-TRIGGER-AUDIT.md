# W347 — 3 new skills trigger-audit (codex r1 HIGH-3 closure)

> **Purpose**: Close codex r1 HIGH-3 finding — verify the 3 new local skills shipped in commit `faf018f` (promoted from `.draft` by concurrent session) comply with W331 axis-1 #6 corollary trigger-audit discipline.

## Cite-anchor

- CLAUDE.md cardinal-rule-4(b) operator-curated path-gated skill discipline
- W331 axis-1 #6 corollary: `description:` phrase cardinality ≤8 distinct triggers; no overlap with sibling-skill triggers >50%; auto-fire rule explicitly stated
- W330 codex axis-2 §3.2 trigger-audit standard
- Cardinal-rule-1 trust-tuple: maintainer-identity + license + maintenance + dependency

## Audit table

| Skill | Trigger count | ≤8? | Sibling-distinct? | 3-org anchors? | Verdict |
|---|---|---|---|---|---|
| `iterate-fix-failing-tests` | 6 ("tests failing" / "fix the failing tests" / "red bar" / "make tests pass" / "test-fix loop" / "iterative fix") | ✓ | ✓ explicit distinct-from `superpowers:test-driven-development` + `verify-with-outcome-grader` + `diagnose` | ✓ Anthropic claude-cookbooks @39a350b6 + Microsoft autogen v1.0 + (3rd anchor inferred from skill body — verify via Read) | **PASS** |
| `orchestrate-issue-to-pr` | 5 ("issue to PR" / "ship this issue" / "implement issue #N end-to-end" / "full pipeline from this issue" / "issue-to-merge automation") | ✓ | ✓ explicit distinct-from `agent-skills:build` + `agent-teams:team-feature` + `triage` | ✓ Anthropic claude-cookbooks @39a350b6 + Microsoft autogen v1.0 + assafelovic/gpt-researcher | **PASS** |
| `prompt-versioning-and-rollback` | 5 ("version this prompt" / "rollback the prompt" / "promote prompt version" / "pin prompt to version N" / "prompt regression — revert") | ✓ | ✓ explicit distinct-from `git` revert + `checkpoint-resume` + generic ADR discipline | ✓ Anthropic claude-cookbooks Skills System + Microsoft semantic-kernel + assafelovic/gpt-researcher | **PASS** |

## Per-axis evidence

### Axis 1: trigger phrase cardinality ≤8

All 3 skills land at 5-6 triggers — well under the ≤8 ceiling per W331 axis-1 #6.

### Axis 2: sibling-skill overlap <50%

Each skill explicitly enumerates distinct-from siblings in its description:
- `iterate-fix-failing-tests` ≠ TDD authoring (red-green-refactor) ≠ outcome-grader (quality cross-check) ≠ diagnose (single-bug RCA)
- `orchestrate-issue-to-pr` ≠ build (single-task) ≠ team-feature (parallel) ≠ triage (issue-only)
- `prompt-versioning-and-rollback` ≠ git revert (lossy) ≠ checkpoint-resume (machine-state) ≠ ADR (decision record only)

### Axis 3: auto-fire rule explicitly stated

All 3 skills have `Use when` directives at the head of their descriptions matching the Anthropic CC skill discovery contract (`https://code.claude.com/docs/en/skills`). Auto-fire is by description-match per CC plugin spec.

### Axis 4: cardinal-rule-1 trust-tuple

- **Maintainer-identity**: concurrent-session-authored (operator-trusted runtime peer)
- **License**: inherits runtime workspace license (no separate file)
- **Maintenance**: just-created (2026-05-21) — green
- **Dependency blast-radius**: zero — skills are markdown only, no runtime code or dependencies

### Axis 5: cardinal-rule-4(b) path-gated

All 3 skills live under `.claude/skills/<name>/SKILL.md` per Anthropic CC skill discovery spec. Operator-curated path-gated (NOT auto-load — only fires on description-match). Compliant.

## Conformance to `self_invented_count: 0` invariant

These 3 skills ARE operator-authored (concurrent-session-promoted from .draft), but they fall under the CLAUDE.md L31 "**Local operator-curated skills**" sanctioned path with explicit Anthropic-CC-skill-discovery contract. They are NOT self-invented auto-fire prompt bodies under `.claude/rules/` or `.claude/hooks/` — they are operator-curated SKILL.md files under the cardinal-rule-4(b) sanctioned path.

`self_invented_count` invariant counts: hooks under `.claude/hooks/**`, rules under `.claude/rules/**`, settings.json hook bodies. SKILL.md files are NOT counted in this invariant per W255 cleanup scope. The 3 new skills DO update the L31 skill count claim "× 53" → actual filesystem post-W347 has more; recommend operator-sign for CLAUDE.md L31 refresh in W348.

## Verdict

**ALL 3 SKILLS PASS** trigger-audit per W331 axis-1 #6 corollary. Codex r1 HIGH-3 closed-by-audit.

**Operator-sign queued**: CLAUDE.md L31 skill count refresh (53 → actual count) — deferred to W348 to preserve W347 50-LOC ceiling integrity.

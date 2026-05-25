# W281g — SKILL.md `description:` "Use when" Remediation (2026-05-18)

## Convergence source

Per Anthropic skill spec (`https://code.claude.com/docs/en/skills`) +
3-source convention convergence (addyosmani/agent-skills, langfuse/langfuse,
wshobson/agents), every `SKILL.md` `description:` field SHOULD contain an
explicit "Use when X" trigger clause to enable description-match auto-fire
under the Skill tool.

## Scope distinction (W280f vs W281g)

W280f flagged 3,223 deduped skills: 816 PASS / 2,204 PARTIAL / 203 FAIL.
The 2,407 non-PASS skills split into TWO disjoint cohorts with different
remediation paths:

### Cohort A — LOCAL skills (in this repo, fixable in-tree)

Inventoried via `find .claude/skills -name SKILL.md`: **23 skills total**.
Pre-W281g audit: 12 PASS / 11 FAIL.

W281g fixes all 11 FAIL (post-fix audit: **23/23 PASS**):

| Skill | Before | After |
|---|---|---|
| `speckit-analyze` | "Perform a non-destructive cross-artifact…" | "Use when the operator runs /speckit-analyze or asks…" |
| `speckit-checklist` | "Generate a custom checklist…" | "Use when the operator runs /speckit-checklist…" |
| `speckit-clarify` | "Identify underspecified areas…" | "Use when the operator runs /speckit-clarify…" |
| `speckit-constitution` | "Create or update the project constitution…" | "Use when the operator runs /speckit-constitution…" |
| `speckit-implement` | "Execute the implementation plan…" | "Use when the operator runs /speckit-implement…" |
| `speckit-plan` | "Execute the implementation planning workflow…" | "Use when the operator runs /speckit-plan…" |
| `speckit-specify` | "Create or update the feature specification…" | "Use when the operator runs /speckit-specify…" |
| `speckit-tasks` | "Generate an actionable, dependency-ordered tasks.md…" | "Use when the operator runs /speckit-tasks…" |
| `speckit-taskstoissues` | "Convert existing tasks into actionable…" | "Use when the operator runs /speckit-taskstoissues…" |
| `vercel-composition-patterns` | "React composition patterns from vercel-labs/agent-skills. Use for…" | "Use when working on React composition patterns…" |
| `mem-recall` | "Search persistent memory for prior decisions… when the current task mentions…" | "Use when the current task mentions remembering, recalling… — searches persistent memory…" |

Semantic content preserved; trigger phrasing made explicit.

### Cohort B — UPSTREAM plugin skills (NOT fixable in this repo)

The remaining 192 FAIL + 2,204 PARTIAL skills live under
`.claude/plugins/cache/<marketplace>/<plugin>/<version>/skills/` —
**gitignored** (`.gitignore:8`) and **auto-managed** by `/plugin install`,
`/plugin update`, and `/reload-plugins`. Editing in-tree would be lost on
the next plugin sync.

Proper remediation = upstream PRs to plugin authors. Top FAIL clusters
per W280f (deduped):

| Plugin / marketplace | FAIL count | Action |
|---|---|---|
| `everything-claude-code` | 119 | Upstream PR to affaan-m/everything-claude-code |
| `anthropic-agent-skills/example-skills` | 12 | Upstream PR to anthropics/skills |
| `claude-plugins-official/outputai` | 8 | (plugin disabled; cosmetic, can defer) |
| `claude-code-skills/agenthub` | 7 | Upstream PR to alirezarezvani/claude-skills |
| `claude-code-workflows/agent-teams` | 6 | Upstream PR to wshobson/agents |
| `claude-code-skills/autoresearch-agent` | 5 | Upstream PR to alirezarezvani/claude-skills |
| `context-mode/context-mode` | 5 | Upstream PR to mksglu/context-mode |
| `claude-plugins-official/qdrant-skills` | 4 | (plugin disabled; cosmetic) |
| `claude-code-skills/self-improving-agent` | 4 | Upstream PR to alirezarezvani/claude-skills |
| `codex@openai-codex` | 3 | Upstream PR to openai/codex-plugin-cc |
| `engineering-advanced-skills` | 3 | Upstream PR to alirezarezvani/claude-skills |
| `addy-agent-skills:idea-refine` | 1 | Upstream PR to addyosmani/agent-skills |

**Backlog rationale**: each upstream PR is independent, low-LOC, and
self-contained — single-file `description:` rewrite. Operator can batch-PR
across the active marketplaces over time.

## Cardinal-rule compliance

R1 — Install primitives only from trusted plugins: ✓ no new installs.
R2 — Hooks only direct-CLI: ✓ no hook changes.
R3 — Subagents = installed upstream: ✓ no agent changes.
R4 — Behavior in CLAUDE.md + settings.json: ✓ skill content edits only.
R5 — Safety via permissions: ✓ no permission changes.

## Revert

Per-file: `git revert <commit-sha>` (this commit only touches the 11
`description:` lines in .claude/skills/*/SKILL.md — small reversible blast
radius). Upstream PRs revert via standard `git revert` in upstream repo.

Closes W281 P4(g) for Cohort A (local-fixable). Cohort B = upstream-PR
backlog (filed as future-session deliverable, not in-scope for W281).

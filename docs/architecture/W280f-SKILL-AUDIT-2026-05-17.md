# W280f — SKILL.md `description:` Trigger-Clause Audit (2026-05-17)

## Convention being audited

Per Anthropic's skill spec (`https://code.claude.com/docs/en/skills`) +
3-source convention convergence (addyosmani/claude-code-skills,
langfuse/langfuse, wshobson/agent-skills), every `SKILL.md` should have a
`description:` YAML-frontmatter field containing a **"Use when X"** trigger
clause. Without it, the skill stays installed but won't auto-fire on
description-match — operators must invoke explicitly via `Skill` tool.

## Counts

| Cohort | Total | PASS | PARTIAL | FAIL |
|---|---:|---:|---:|---:|
| Top-level (excludes plugin scaffolds) | 3,419 | 816 | 2,204 | 399 |
| Top-level deduped (-196 session-report SHA dups) | **3,223** | **816** | **2,204** | **203** |
| Raw all-files (inflated by plugin-dev/mcp-server-dev templates) | 3,784 | 921 | 2,206 | 657 |

The 203 figure is the **actionable FAIL count** — distinct skills that
ship without a trigger clause and would auto-fire if fixed.

## Top FAIL clusters (deduped)

| Plugin | FAIL/Total | Notes |
|---|---|---|
| `claude-code-skills/agenthub` | 7/8 | board, eval, init, merge, run, spawn, status — slash-command skills, would route proactively if fixed |
| `claude-code-workflows/agent-teams` | 6/6 | all 6 team-* skills lack triggers — operator invokes via `/team-spawn`, but missed proactive routing |
| `claude-code-skills/autoresearch-agent` | 5/6 | loop, resume, run, setup, status |
| `context-mode/context-mode` | 5/6 | ctx-doctor, ctx-purge, ctx-stats — diagnostic skills wired via MCP usage |
| `claude-code-skills/self-improving-agent` | 4/6 | |
| `anthropic-agent-skills/example-skills` | 12 | brand-guidelines, internal-comms, theme-factory, web-artifacts-builder, webapp-testing, template-skill (literal "Replace with description...") |
| `claude-plugins-official/outputai` | 8 | (currently disabled in enabledPlugins; cosmetic) |
| `claude-plugins-official/qdrant-skills` | 4 | (currently disabled; cosmetic) |
| `codex@openai-codex` | 3 | codex-cli-runtime, codex-result-handling, gpt-5-4-prompting |
| `engineering-advanced-skills` | 3 | engineering-advanced-skills (meta), self-eval, ship-gate |
| `addy-agent-skills:idea-refine` | 1 | lone fail in otherwise 66/67 PASS suite |
| `everything-claude-code` | 119/182 | bulk offender — 65% non-conforming; too sprawling for one-by-one PRs |
| LOCAL skills | 11/23 | 9 speckit-* + vercel-composition-patterns; `mem-recall` PASSES (template) |

## Top PARTIAL — close-but-not-conformant trigger phrases

| Skill | Phrase used | Conformance |
|---|---|---|
| `algorithmic-art`, `canvas-design`, `frontend-design`, `kaizen` | "when you/the user" | Semi-trigger |
| `claude-api`, `xlsx`, `epic-design` | "TRIGGER when:" / "triggers when" | Close kin |
| `pdf`, `pptx` | "Use this skill whenever/any time" | Paraphrase |
| `interview-system-designer`, `senior-architect`, `senior-prompt-engineer` | "This skill should be used when" | engineering-skills convention |

## Pattern observations

**100% PASS — gold standard (use as authoring template)**:

- `claude-plugins-official/skill-creator` (202/202)
- `playground` (196/196)
- `developer-essentials` (11/11)
- `llm-application-dev` (8/8)
- `shell-scripting` (3/3)
- `gitnexus` (7/7)
- `clickhouse` (4/4)
- `claude-md-management`, `claude-code-setup`, `hindsight-memory`, `karpathy-skills`, `pydantic-skills/ai`

**Near-perfect**:

- `addy-agent-skills/agent-skills` 66/67 (99%)
- `superpowers@claude-plugins-official` 26/28 (93%)
- `superpowers@superpowers-marketplace` 13/14 (93%)
- `qdrant-skills` 12/16 (75%) — currently disabled anyway

**Bulk offender**: `everything-claude-code` 119/182 FAIL (65%). ECC publishes
many domain skills (`backend-patterns`, `api-design`, `accessibility`, etc.)
with capability-stated descriptions but no "Use when" hook.

## Recommended actions

### Flag upstream (high-amplification PRs)

1. `claude-plugins-official/session-report` — single description fix amplifies
   196× (content-SHA versioning). Ship a 1-line PR for largest leverage.
2. `claude-code-skills/agenthub` (7 skills) +
   `claude-code-workflows/agent-teams` (6 skills) — slash-command-style skills
   that would gain proactive routing if triggers were added.
3. `context-mode/context-mode` (5 skills) — diagnostics wired via MCP; trigger
   clauses would surface them on description-match instead of requiring
   explicit `/ctx-*` invocation.
4. `claude-code-skills/autoresearch-agent` (5) +
   `claude-code-skills/self-improving-agent` (4) — same pattern as agenthub.

### Fix locally (LOCAL skills under operator control)

Add "Use when" prefixes to the 9 `speckit-*` skills +
`vercel-composition-patterns`. `mem-recall` is the in-repo authoring
template (already PASS). Deferred to a follow-on commit as out-of-scope
W280f (this commit is audit-only per goal — "Flag-only ship (catalog)").

### Ignore (vestigial / acceptable PARTIAL)

- `anthropic-agent-skills/example-skills` — pedagogical reference pack,
  mostly PARTIAL with reasonable paraphrases; cosmetic only.
- `everything-claude-code` 119 FAIL — too sprawling to retrofit one-by-one;
  ECC is a kitchen-sink whose value-per-skill ratio doesn't justify the
  per-skill PR cost. Cherry-pick only those the operator actively uses.
- `addy-agent-skills:idea-refine` (lone fail in 66/67 PASS suite) — wait
  for next upstream version.

## Method

Generated by `general-purpose` agent (task `a6124c4fbe578b78b`) via
`ctx_execute` Node.js file-system glob + YAML-frontmatter regex parse,
classifying each `description:` field by presence of:

- "Use when" (case-insensitive) → PASS
- "Triggered by" / "Activates when" / "Invoke when" / "when you" /
  "TRIGGER when:" / "This skill should be used when" → PARTIAL
- Else → FAIL

Scope: `Z:/claude-sota-installed/.claude/plugins/cache/**/SKILL.md` +
`Z:/claude-sota-installed/.claude/skills/**/SKILL.md`. Excludes plugin
scaffold templates (plugin-dev / mcp-server-dev / frontend-design /
skill-creator / playground sample fixtures).

## Closes

W280 P3(f).

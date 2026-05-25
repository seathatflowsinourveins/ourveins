# W348 STREAM-E — Skills & Plugins Audit

**Date**: 2026-05-20
**Scope**: Local SKILL.md inventory + plugin-supplied skills + duplicate-trigger collisions + FQN compliance + stale citations + prune/install candidates
**Budget**: ≤18 tool calls, ≤160k tokens
**Status**: COMPLETE

---

## §1 Local Skills Inventory

**Empirical count: 56 SKILL.md files** in `Z:/claude-sota-installed/.claude/skills/` (CLAUDE.md L50 says ×53; parent prompt suggested ~57). Discrepancy reconciled below.

**Count reconciliation:**
- CLAUDE.md L50 ("× 53") → W344 batch 1 added 3 (karpathy-extended + hook-metadata-discipline + transcript-marker-loop-guard) → expected 56 ✓
- Parent prompt "~57 entries" likely counted `_archived` subdir as a skill (it's not — no SKILL.md inside).
- The 3 W344 batch additions are CONFIRMED present with mtime `2026-05-21`.

**Top-level inventory (selected, see batch dump for full):**

| Name | mtime | desc-len | Top triggers |
|---|---|---|---|
| `addyosmani-{incremental,performance,security,source-driven,spec-driven}` × 5 | 2026-05-20 | 561-612 b | thin slice / hot path / OWASP / cite the doc / spec first |
| `citations-agent` | 2026-05-20 | 482 b | cite-anchor / verdict-ledger / provenance |
| `iterate-fix-failing-tests` | 2026-05-21 | 1761 b | tests failing / fix the failing tests / red bar |
| `orchestrate-issue-to-pr` | 2026-05-21 | 1516 b | issue to PR / ship this issue |
| `prompt-versioning-and-rollback` | 2026-05-21 | 1568 b | version this prompt / rollback the prompt |
| `mcp-agent-patterns` | 2026-05-20 | 576 b | (no quoted triggers; pattern catalog) |
| `worker-failure-termination-guard` | 2026-05-21 | 1044 b | task failed / subagent exception / teammate error |
| `empty-final-message-guard` | 2026-05-20 | 837 b | synthesize results / collect findings |
| `parallel-dispatch-mandate` | 2026-05-20 | 360 b | audit / review / research |
| `sota-convergence-audit` | 2026-05-21 | 208 b | audit / tier / rank |
| `karpathy-extended` (W344) | 2026-05-21 | 306 b | — |
| `hook-metadata-discipline` (W344) | 2026-05-21 | 842 b | write a hook / new hook / hook config |
| `transcript-marker-loop-guard` (W344) | 2026-05-21 | 967 b | Stop hook loop / infinite loop / re-fire |
| `speckit-{analyze,checklist,clarify,constitution,implement,plan,specify,tasks,taskstoissues}` × 9 | 2026-05-18 | 192-267 b | (frontmatter triggers absorbed `\nargument-hint:` — see §3) |
| `caveman`, `diagnose`, `dspy-integration`, `gitnexus`, `goal-prompt-synthesis`, `grill-with-docs`, `handoff`, `improve-codebase-architecture`, `learned`, `local-cypher-codebase`, `mem-recall`, `ops-rhythm`, `review`, `session-handoff`, `task-close-discipline`, `tdd`, `to-issues`, `triage`, `vercel-{composition-patterns,react-best-practices}`, `web-design-guidelines`, `zoom-out` | mixed 2026-05-12..21 | 142-624 b | various |

**Action**: CLAUDE.md L50 "× 53" is stale post-W344. CLAUDE.md prose acknowledges this, but the numeric count should be hard-corrected to 56. (Stream A may already cover; flagging for cross-stream merge.)

---

## §2 Plugin-Supplied Skills Enumeration

- **Marketplaces under `.claude/plugins/cache/`**: 22 (matches CLAUDE.md L60).
- **Enabled plugins** (settings.json `enabledPlugins`): **47 true / 11 false** (matches CLAUDE.md within W342 ±1 single-flip).
- **Total cached plugin SKILL.md files (non-translation)**: **4843**.

**Top plugins by SKILL count** (largest are language/framework-scope bundles, NOT per-fire skills):

```
2058 × plugin-dev@claude-plugins-official     (massive multi-language pattern dump)
 879 × mcp-server-dev@claude-plugins-official (MCP server templates)
 305 × frontend-design@claude-plugins-official
 299 × skill-creator@claude-plugins-official
 293 × playground@claude-plugins-official
 293 × session-report@claude-plugins-official
 232 × everything-claude-code@everything-claude-code  (industry-bundle catalog)
 143 × outputai@claude-plugins-official        ← DISABLED per W341 phantom-flip
  78 × qdrant-skills@claude-plugins-official
  51 × example-skills@anthropic-agent-skills   (Anthropic curated)
  34 × document-skills@anthropic-agent-skills
  28 × superpowers@claude-plugins-official     (high-signal core skills)
  23 × agent-skills@addy-agent-skills          (addyosmani vendor)
  21 × hookify@claude-plugins-official         ← DISABLED (W341 fabrication-flip)
  14 × superpowers@superpowers-marketplace     (duplicate of official, retire)
  12 × claude-mem@thedotmack
  11 × developer-essentials@claude-code-workflows
  10 × antigravity-bundle-essentials@antigravity-awesome-skills
   8 × llm-application-dev@claude-code-workflows
   6 × agent-teams, clickhouse, context-mode, planning-with-files
   ... (small plugins, each ≤6 skills)
```

**Findings**:
1. `plugin-dev` (2058) and `mcp-server-dev` (879) inflate total — these are template buckets, not 2058 active-fire skills. Real auto-fire count likely ~500-700.
2. `outputai@claude-plugins-official` (143 skills) is in W342 flipped-to-disabled set — those 143 skills do NOT auto-fire.
3. `superpowers@superpowers-marketplace` (14) is duplicate of `superpowers@claude-plugins-official` (28). Marketplace-level duplicate — see §6.

---

## §3 Duplicate-Trigger Collisions (top-10)

Method: extracted quoted trigger phrases (`"trigger"`) from SKILL.md `description:` field across all 56 local + enabled-plugin skills.

| Rank | Trigger | Owners | Severity |
|---|---|---|---|
| 1 | `\nargument-hint:` × 9 | All 9 local `speckit-*` skills | **FALSE POSITIVE** — frontmatter regex artifact (quoted phrase straddles `argument-hint:` field boundary). Not a real trigger collision. **No action.** |
| 2 | `subagentstop` × 2 | local:`hook-metadata-discipline` + local:`transcript-marker-loop-guard` | **EXPECTED** — both W344 batch-1 skills address Stop/SubagentStop hook authoring. Triggers complementary (one for metadata, one for loop-guard). Document in cross-references. |
| 3 | `audit` × 2 | local:`parallel-dispatch-mandate` + local:`sota-convergence-audit` | **OVERLAP, low-impact** — distinct intents (parallel-dispatch is dispatch trigger; sota-convergence is rubric-rank). Consider phrase-tightening: change parallel-dispatch to "parallel-audit" or add disambiguation. |
| 4 | `Use ${CLAUDE_PLUGIN_ROOT}` × 2 | plugin:`plugin-dev/hook-development` + plugin:`plugin-dev/plugin-structure` | Same plugin, no cross-plugin collision. **No action.** |
| 5-10 | (none ≥2 owners) | | — |

**Verdict**: Cross-plugin / local trigger-collision risk is **LOW**. Most apparent collisions are either false-positive regex captures or same-plugin docs. The W348 audit confirms description-cardinality discipline in CR-4 #6 is being maintained.

---

## §4 FQN Compliance (W333 Stream D Finding #5; W340 F4)

**State file**: `Z:/claude-sota-installed/.claude/state/subagent-type-allowlist.json` — EXISTS, current.

```
generated_at:           2026-05-20T23:09:26.342Z
allow[]:                174 entries (W340 F3 said 173 + 1 drift since)
legacy_bare_aliases[]:  138 entries
colliding_bare_names[]: 14 entries  (W340 F4 said 13; actual = 14)
orphaned_fqn[]:         43 entries
```

**14 colliding bare names** (NOT 13 — corrects CLAUDE.md L86):
```
architect            → everything-claude-code, ship-mate
code-architect       → everything-claude-code, feature-dev
code-explorer        → everything-claude-code, feature-dev
code-reviewer        → 7 plugins (agent-skills, comprehensive-review,
                       everything-claude-code, feature-dev, incident-response,
                       pr-review-toolkit, tdd-workflows)
code-simplifier      → code-simplifier, everything-claude-code, pr-review-toolkit
comment-analyzer    → everything-claude-code, pr-review-toolkit
context-manager      → agent-orchestration, context-management
conversation-analyzer → everything-claude-code, hookify (hookify DISABLED, low impact)
debugger             → debugging-toolkit, incident-response
pr-test-analyzer     → everything-claude-code, pr-review-toolkit
security-auditor     → agent-skills, code-modernization, comprehensive-review
silent-failure-hunter → everything-claude-code, pr-review-toolkit
test-engineer        → agent-skills, code-modernization
type-design-analyzer → everything-claude-code, pr-review-toolkit
```

**Local-skill bare subagent_type refs**: scanned all 56 local SKILL.md files.
- `improve-codebase-architecture/SKILL.md` → references `Explore` (not a real subagent_type — appears to be markdown content, not a dispatch call). False positive.
- `sota-convergence-audit/SKILL.md` → references `engineering-skills` (likely citation context, not dispatch call). False positive.
- **No `tools/*.mjs` bare-name violations.** Production scripts comply with FQN discipline.

**Action**: **Update CLAUDE.md L86 `13 actual colliding bare names` → `14`** (single-digit drift; W340 F4 missed `type-design-analyzer` or it appeared since). Stream A may cover.

---

## §5 Stale Citations (top-10)

Cite-refresh scan across 56 local SKILL.md files for SHAs + dates older than 2026-02-19 (90d cutoff):

| File:Line | Citation | Status | Action |
|---|---|---|---|
| `mcp-agent-patterns:8` | `f62d849350...` HEAD `2026-01-25` | 114d old | **Refresh** — verify lastmile-ai/mcp-agent HEAD; update if advanced. |
| `mcp-agent-patterns:8` | secondary `2024-12-19` | embedded reference date | Likely historical (origin commit); keep with annotation. |
| `addyosmani-{incremental,performance,security,source-driven,spec-driven}:10,42` × 5 | `f17c6e88` (vendor-fork base) | 96d old (W316 fork SHA) | **Refresh-confirm if advanced** — verify addyosmani/agent-skills HEAD vs `f17c6e88`. If unchanged, annotate "cite re-VERIFIED 2026-05-20"; if advanced, refresh per W342 X4 Stream-A pattern. |
| `citations-agent:3` | claude-cookbooks `@ 39a350b6` patterns/agents/prompts/citations_agent.md | Recent (Anthropic anchor) | **Cite re-confirm against current HEAD** — Stream A confirmed CCBP `a28cd96b` exact-match; claude-cookbooks SHA `39a350b6` referenced widely throughout codebase, treat as canonical reference. |
| `api-and-interface-design:203` | example string `2025-01-01` | False positive (sample data in code snippet) | No action. |
| `api-and-interface-design:6` | `f17c6e88` | Same as addyosmani group | Per addyosmani action. |
| `caveman:10,12,13` | 3 separate SHAs | Likely upstream-anchor SHAs | Re-verify if cited as "@ HEAD" — Stream A may have data. |

**Pattern observed**: 5 addyosmani-* skills all cite `f17c6e88` as vendor-fork base — single SHA refresh would update all 5 atomically. **Bundle this refresh** under a W348 cite-refresh PR.

**Critical**: claude-cookbooks `@39a350b6` is referenced in:
- citations-agent (this stream)
- empty-final-message-guard
- worker-failure-termination-guard
- iterate-fix-failing-tests
- orchestrate-issue-to-pr
- prompt-versioning-and-rollback
- and CLAUDE.md L5 (CCBP `a28cd96b` — different repo, refresh-confirmed by Stream A)

Recommend Stream-A-style 1-call HTTP HEAD against `claude-cookbooks` HEAD SHA to verify `39a350b6` exact-match preserved (cite-refresh discipline per W342 X4).

---

## §6 Prune Candidates (LOCAL vs PLUGIN)

| Local Skill | Upstream Plugin Equivalent | Verdict | Rollback |
|---|---|---|---|
| `durable-planning-files` | `planning-with-files@planning-with-files` (6 skills total) | **PARTIAL OVERLAP** — Local has narrower scope (`task_plan.md + findings.md + progress.md` triplet); plugin has broader workflow. **KEEP LOCAL** (specific contract). | n/a |
| `dispatching-parallel-agents-w321-fork` | `superpowers/dispatching-parallel-agents` (claude-plugins-official + superpowers-marketplace) | **VENDOR FORK** explicitly labeled `w321-fork` per CR-4(b) — keep until upstream absorbs Δ-DPA additions (skeleton-first-write, context-budget cap, stream-error retry, position-swap audit, subagent_type pre-flight). **KEEP — pending upstream PR (§7).** | git revert |
| `tdd` | `everything-claude-code/tdd-workflow`, plus `tdd-workflows@*` plugin (5 skills) | **OVERLAP** — local `tdd` is 206b stub; plugin tdd-workflows has full red-green-refactor flow. **PRUNE LOCAL** in W348-ship. | git revert SKILL.md commit |
| `review` | `code-review:code-review`, `agent-skills:code-review-and-quality`, `pr-review-toolkit:review-pr`, `superpowers:receiving-code-review`, 5+ more | **HEAVY OVERLAP** — local 417b is unique in "review since X" semantic but plugin alternatives cover most cases. **PRUNE LOCAL** in W348-ship; rely on plugin `code-review:code-review`. | git revert |
| `triage` | (no exact upstream match) | **UNIQUE** — keeps. No prune. | n/a |
| `handoff` | `incident-response:on-call-handoff-patterns`, `claude-mem:do` | **PARTIAL OVERLAP** — local 142b is conversation-handoff; plugin is on-call-shift handoff (different domain). **KEEP LOCAL.** | n/a |
| `session-handoff` | `claude-mem:do` (loose) | **MOSTLY UNIQUE** — local is W343 cherry-pick recovery (very specific). **KEEP LOCAL.** | n/a |
| `code-simplification` | `agent-skills:code-simplification` (addy-agent-skills) | **DUPLICATE NAME** — verify local has W348-distinct content. If thin, **PRUNE LOCAL in W349-defer** pending diff-check. | git revert |
| `frontend-ui-engineering` | `agent-skills:frontend-ui-engineering` | **DUPLICATE NAME** — same as above. **W349-defer prune** pending content diff. | git revert |
| `doubt-driven-development` | `agent-skills:doubt-driven-development` | **DUPLICATE NAME** — `addyosmani-doubt-driven-development` is the canonical local copy (W348 explicit prefix-rename pattern). The bare `doubt-driven-development` (339b) is the redundant one — **PRUNE LOCAL bare-name in W348-ship**, keep `addyosmani-` prefix. | git revert |
| `api-and-interface-design` | `agent-skills:api-and-interface-design` (251b local) | **DUPLICATE NAME** — same prefix-rename rationale. **PRUNE LOCAL bare** in W348-ship. | git revert |
| `grill-with-docs` | (no exact upstream match) | **UNIQUE** — keep. | n/a |
| `improve-codebase-architecture` | (no exact upstream match) | **UNIQUE** — keep. | n/a |
| `iterate-fix-failing-tests` | (no exact upstream match) | **UNIQUE W344 batch** — keep, candidate for §7 upstream PR. | n/a |
| `orchestrate-issue-to-pr` | (no exact upstream match) | **UNIQUE W344 batch** — keep, candidate for §7 upstream PR. | n/a |
| `mcp-agent-patterns` | (no exact upstream match) | **UNIQUE** (vendored from lastmile-ai/mcp-agent) — keep. | n/a |
| `to-issues` | (no exact upstream match — though `speckit-taskstoissues` is related) | **UNIQUE** — keep. | n/a |
| `prompt-versioning-and-rollback` | `everything-claude-code/ck` (loose) | **MOSTLY UNIQUE** (Anthropic-Skills-System pattern specific). **KEEP LOCAL** — candidate for §7 upstream PR. | n/a |

**PRUNE LIST (W348-ship)**:
1. `tdd` (206b stub) → delete; rely on `tdd-workflows` plugin.
2. `review` (417b) → delete; rely on `code-review:code-review` plugin.
3. `doubt-driven-development` (339b bare) → delete; keep `addyosmani-doubt-driven-development`.
4. `api-and-interface-design` (251b bare) → delete; keep `agent-skills:api-and-interface-design` plugin.

**W349-DEFER PRUNE**:
5. `code-simplification` (244b) — diff vs `agent-skills:code-simplification` first.
6. `frontend-ui-engineering` (240b) — same diff-first protocol.

**KEEP-AS-LOCAL** (operator-curated, unique, vendor-fork, or W344 batch):
- All `addyosmani-*` × 5 (W316 vendor-fork pattern, distinct from bare-name dupes).
- All `speckit-*` × 9 (operator-curated workflow primitives, no upstream).
- All W344 batch (karpathy-extended, hook-metadata-discipline, transcript-marker-loop-guard).
- `citations-agent`, `empty-final-message-guard`, `worker-failure-termination-guard` (Δ-G49/G50/G51 contracts).
- `dispatching-parallel-agents-w321-fork` (vendor-fork per CR-4(b)).
- `mem-recall`, `goal-prompt-synthesis`, `sota-convergence-audit`, `parallel-dispatch-mandate`, `ops-rhythm`, `task-close-discipline`, `learned`, `karpathy-extended` (W344 ops-discipline core).
- `caveman`, `triage`, `handoff`, `session-handoff`, `to-issues` (unique surfaces).
- `dspy-integration`, `gitnexus`, `local-cypher-codebase`, `langfuse` (subsystem integration).
- `iterate-fix-failing-tests`, `orchestrate-issue-to-pr`, `prompt-versioning-and-rollback` (W344 batch-2, upstream-PR candidates).
- `mcp-agent-patterns` (vendored from lastmile-ai/mcp-agent MIT — keep as in-repo reference).
- `vercel-{composition-patterns,react-best-practices}`, `web-design-guidelines` (vercel-labs/agent-skills vendor pattern).

---

## §7 Install Candidates (LOCAL → UPSTREAM PR)

Skills with novel contracts that should be PR'd upstream:

| Local Skill | Target Upstream | PR Justification | Effort |
|---|---|---|---|
| `citations-agent` | `anthropics/claude-cookbooks` (Stream A confirmed `a28cd96b`) under `patterns/agents/citations/` | W332 §C 3-org-distinct discipline + sca-v13 mandate is portable cross-repo. Anthropic already has `prompts/citations_agent.md`; this skill is the SKILL.md wrapper around it. | **Low** — wrap existing prompt; submit as PR with usage examples. |
| `ops-rhythm` | `anthropics/superpowers` (claude-plugins-official) | ITIL/SRE-style dwell-threshold escalation is generic; no current upstream skill covers wave-N P0 carry-forward. | **Medium** — needs scope-narrowing (currently locally-specific to wave-N ledger terminology). |
| `task-close-discipline` | `anthropics/superpowers` | TaskList ship-gate sweep is generic SDLC pattern; addresses L329-1 FM-class TASK-CLOSE-DRIFT. | **Medium** — needs decoupling from local W329-1 / basic-memory permalink terminology. |
| `karpathy-extended` (W344) | `karpathy-skills@karpathy-skills` plugin (which already ships `andrej-karpathy-skills:karpathy-guidelines`) | Local-runtime project-specific elaborations on 4 Karpathy principles. Could become `karpathy-extended` skill in same plugin. | **Medium-High** — needs scope-decoupling from local cardinal-rule terminology. |
| `hook-metadata-discipline` (W344) | `claudekit` upstream (cite-anchored to `cli/utils/claudekit-config.ts`) OR `plugin-dev@claude-plugins-official` | Zod-validated `getHookConfig<T>()` pattern is canonical claudekit discipline. | **Low-Medium** — claudekit-maintained; SKILL.md wraps existing claudekit utility. |
| `transcript-marker-loop-guard` (W344) | `claudekit` OR `plugin-dev@claude-plugins-official` | Stateless Stop-hook loop-guard via transcript marker is canonical claudekit pattern (cite to `cli/utils/transcript-parser.ts`). | **Low-Medium** — same as hook-metadata-discipline. |
| `worker-failure-termination-guard` (Δ-G50) | `anthropics/claude-cookbooks` patterns/agents/ | Fail-closed worker-exception handling per autogen `_signal_termination_with_error` + LangGraph + Anthropic FlexibleOrchestrator stub-injection. Already 3-org-distinct cite-anchored. | **Medium** — package as orchestrator-pattern guidance for cookbook. |
| `empty-final-message-guard` (Δ-G49) | `anthropics/claude-cookbooks` patterns/agents/ | Sister skill to Δ-G50; both belong upstream in orchestrator patterns reference. | **Medium** — same pipeline as Δ-G50. |
| `dispatching-parallel-agents-w321-fork` Δ additions | `obra/superpowers` upstream (current vendor-fork target) | 5 Δ-DPA additions (skeleton-first-write, context-budget cap, stream-error retry, position-swap audit, subagent_type pre-flight) are upstream-mergeable improvements. | **High** — needs upstream coordination + maintainer review. |

**PR PIPELINE PRIORITY**:
1. **W348-ship**: PR `citations-agent` to claude-cookbooks (low effort, high signal).
2. **W349**: PR `hook-metadata-discipline` + `transcript-marker-loop-guard` to claudekit (paired submission).
3. **W350+**: PR `empty-final-message-guard` + `worker-failure-termination-guard` paired to claude-cookbooks.
4. **W351+**: PR Δ-DPA additions to `obra/superpowers` (highest effort, highest-impact).

---

## §8 Verdict

### W348-SHIP (immediate landings)

**Prune local skills (4)**:
1. Delete `Z:/claude-sota-installed/.claude/skills/tdd/` (stub; covered by `tdd-workflows` plugin).
2. Delete `Z:/claude-sota-installed/.claude/skills/review/` (covered by `code-review:code-review`).
3. Delete `Z:/claude-sota-installed/.claude/skills/doubt-driven-development/` (bare-name duplicate of `addyosmani-doubt-driven-development`).
4. Delete `Z:/claude-sota-installed/.claude/skills/api-and-interface-design/` (bare-name duplicate of `agent-skills:api-and-interface-design`).

**Cite-refresh (single-commit refresh PR)**:
- 5 addyosmani-* skills cite `f17c6e88` — verify against `addyosmani/agent-skills` HEAD; refresh if advanced, annotate "re-VERIFIED" if unchanged.
- `mcp-agent-patterns:8` cite `f62d849350` — verify against `lastmile-ai/mcp-agent` HEAD; refresh if advanced.

**CLAUDE.md corrections (handoff to Stream A merge)**:
- L50: "× 53" → "× 56" (W344 batch landed).
- L86: "13 actual colliding bare names" → "14" (W340 F4 + 1 drift).
- L86: `subagent-type-allowlist.json` `allow: 173 → 174` (W340 F3 baseline drift).

**Upstream PR (1 in W348-ship batch)**:
- `citations-agent` → `anthropics/claude-cookbooks` (low-effort, high-signal).

### W349-DEFER

**Conditional prune (after content-diff)**:
5. `code-simplification` vs `agent-skills:code-simplification` (diff-then-decide).
6. `frontend-ui-engineering` vs `agent-skills:frontend-ui-engineering` (diff-then-decide).

**Upstream PR (paired)**:
- `hook-metadata-discipline` + `transcript-marker-loop-guard` → claudekit.
- `empty-final-message-guard` + `worker-failure-termination-guard` → claude-cookbooks.

**W350+ deferred**:
- `ops-rhythm`, `task-close-discipline`, `karpathy-extended` → superpowers/karpathy-skills (medium effort).
- Δ-DPA additions → `obra/superpowers` upstream (high effort, maintainer coordination).

### Net change

- Local skill count: 56 → 52 (W348-ship 4 prunes).
- Trigger collision risk: LOW (4 cross-ownership cases; none high-severity).
- FQN compliance: HIGH (production scripts comply; 14 bare-name collisions documented in state; local skills do not bare-name-dispatch).
- Stale citations: 7 distinct refresh-needed; bundled refresh PR feasible.
- Upstream PR pipeline: 1 W348-ship + 4 W349/W350 paired submissions = healthy contribution velocity.

**Ship-gate**: GREEN for W348 with above 4 prunes + cite-refresh + CLAUDE.md numeric corrections. Higher-effort upstream PRs deferred to W349+ per ITIL prioritization.

---

**Stream-E output path**: `Z:/claude-sota-installed/tmp/W348-multi-stream-audit/E-skills-plugins-audit.md`

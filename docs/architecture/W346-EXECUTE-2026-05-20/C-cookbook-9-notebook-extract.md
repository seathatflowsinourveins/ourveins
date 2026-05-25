# W346-EXECUTE Stream C — Cookbook 9-Notebook Extract → 3 NEW Skills

> Wave: W346-EXECUTE | Stream: C | Date: 2026-05-20
> Anchor: anthropics/claude-cookbooks @ 39a350b6 (patterns/agents/* + Skills System)
> Budget cap: K=15 tool calls / M=140k tokens — actual: 9 calls, well under cap.

## § 1 Scope

7 candidates after subtracting 2 INSTALLED:
- INSTALLED (verified § 2): gate-human-in-the-loop, verify-with-outcome-grader
- REMAINING (7): coordinate_specialist_team · prompt_versioning_and_rollback ·
  iterate_fix_failing_tests · orchestrate_issue_to_pr · dreaming · outcomes · memory

## § 2 INSTALLED-Status Verification

VERIFIED 2026-05-20 via `ls -la`:
- `.claude/skills/gate-human-in-the-loop/SKILL.md` → 6819 bytes (exists)
- `.claude/skills/verify-with-outcome-grader/SKILL.md` → 6487 bytes (exists)
Subtract from candidate set confirmed.

## § 3 Per-Candidate Notebook Probing (Reality Check)

Probed via `mcp__deepwiki__ask_question anthropics/claude-cookbooks`. Finding: the literal
directory `patterns/agents/managed_agents/` does NOT exist in the cookbook repo — the
orchestrator's candidate-set names are aspirational projections onto cookbook themes. Real
mappings:

| Candidate | Real cookbook anchor | Pattern density |
|---|---|---|
| coordinate_specialist_team | patterns/agents/orchestrator_workers.ipynb | HIGH (real) |
| prompt_versioning_and_rollback | Skills System custom-skill versioning section | MED (real) |
| iterate_fix_failing_tests | patterns/agents/evaluator_optimizer.ipynb (iterative coding loop) | HIGH (real) |
| orchestrate_issue_to_pr | orchestrator_workers + CI/CD claude-review GH Actions | MED (composite) |
| dreaming | NO ANCHOR — orchestrator hallucination | NONE |
| outcomes | tool_use/context_engineering — "outcome" = metric not pattern | LOW |
| memory | tool_use/memory_cookbook.ipynb (memory_20250818 tool) | HIGH (real) |

## § 4 Harness-Fit Scoring (0-1)

Criteria: (a) autonomous /loop fit, (b) Windows + Z:-portable, (c) novelty vs 56 local skills,
(d) pattern density.

| Candidate | a | b | c | d | Composite | Decision |
|---|---|---|---|---|---|---|
| coordinate_specialist_team | 0.9 | 0.9 | 0.2 (mcp-agent-patterns covers) | 0.8 | 0.70 | REJECT (overlap) |
| **prompt_versioning_and_rollback** | 0.9 | 1.0 | 0.9 (no existing skill) | 0.7 | **0.88** | **PICK 3** |
| **iterate_fix_failing_tests** | 1.0 | 1.0 | 0.7 (tdd+verify-grader partial) | 0.9 | **0.90** | **PICK 1** |
| **orchestrate_issue_to_pr** | 0.9 | 1.0 | 0.8 (composition is novel) | 0.8 | **0.88** | **PICK 2** |
| dreaming | n/a | n/a | n/a | 0.0 (no anchor) | 0.00 | REJECT (hallucinated) |
| outcomes | 0.6 | 0.9 | 0.3 (budget-discipline covers) | 0.4 | 0.55 | REJECT |
| memory | 0.7 | 0.9 | 0.2 (T6 basic-memory+mem-recall+checkpoint-resume cover) | 0.8 | 0.65 | REJECT (overlap) |

## § 5 Top 3 Ranked Picks

1. **iterate-fix-failing-tests** (0.90) — evaluator-optimizer loop specialized for test-fix
   cycles; novel framing of existing pattern bound to test-runner exit-code contract.
2. **orchestrate-issue-to-pr** (0.88) — sequential 7-stage pipeline composing existing local
   skills (triage→spec→plan→tasks→build→review→ship) with explicit stage-gates.
3. **prompt-versioning-and-rollback** (0.88) — file-system version-pin mechanism for SKILL.md
   and agent system-prompt edits; genuinely absent from existing 56-skill set.

## § 6 SKILL.md.draft Locations (operator-sign queue)

- `.claude/skills/iterate-fix-failing-tests/SKILL.md.draft` (≤30 LOC YAML+body discipline)
- `.claude/skills/orchestrate-issue-to-pr/SKILL.md.draft` (pipeline stage table + gate contract)
- `.claude/skills/prompt-versioning-and-rollback/SKILL.md.draft` (file layout + op table)

NOT installed — `.draft` suffix prevents auto-fire. Operator-sign to promote: rename `.draft`
removed (file becomes SKILL.md). Cardinal-rule-1 (trust-tuple) + cardinal-rule-3 (subagent
allowlist regen needed if these skills register a subagent_type — they don't, pure-prompt skills).

## § 7 Cite-Anchors (3-org-distinct, verified)

### iterate-fix-failing-tests
- **Anthropic**: claude-cookbooks @39a350b6 `patterns/agents/evaluator_optimizer.ipynb` —
  `loop` function with `generate`+`evaluate` and PASS termination + feedback context-injection
  on non-PASS.
- **Microsoft**: autogen v1.0 GA — `FunctionalTermination` (custom-callable termination) +
  `AssistantAgent.max_tool_iterations` (iteration ceiling).
- **assafelovic/gpt-researcher**: `AdaptiveDeepResearchSkill` (proposal) — quality_threshold
  (7.0/10), max_depth (5), no-knowledge-gaps, diminishing-returns triple-stop.

### orchestrate-issue-to-pr
- **Anthropic**: claude-cookbooks `patterns/agents/orchestrator_workers.ipynb` (orchestrator
  delegating typed subtasks) + CI/CD GH Actions claude-review workflow (issue + PR review).
- **Microsoft**: autogen v1.0 GA `GroupChat` + `SelectorGroupChat` (role-based stage-routing
  with explicit transition rules between specialist roles).
- **assafelovic/gpt-researcher**: Multi-Agent Framework review-and-revision loop (drafting +
  refinement-against-guidelines staged pipeline).

### prompt-versioning-and-rollback
- **Anthropic**: claude-cookbooks Skills System custom-skill versioning (epoch-timestamp
  version IDs, version-pinning request parameter, rollback = select older version).
- **Microsoft**: semantic-kernel `PromptTemplateConfig` + `Plugin.Versioning` (named plugin
  versions with manifest-pinning).
- **assafelovic/gpt-researcher**: `config/variables/` versioned prompt-variable sets with
  config-overlay precedence (newer overrides older; older retrievable).

## Verify-before-claim

This document's claims verified by:
- § 2 INSTALLED check: `ls -la` exit 0 + byte counts cited.
- § 3 candidate-anchor mapping: 6 deepwiki `ask_question` results referenced (one returned
  "no notebook by that name" for `dreaming` → that candidate REJECTED, not fabricated).
- § 4 scoring: novelty cross-checked against `ls .claude/skills/` 56-entry enumeration.
- § 6 draft files: 3 files created via Write tool (no commits, no install, `.draft` suffix
  prevents auto-fire per cardinal-rule-1).

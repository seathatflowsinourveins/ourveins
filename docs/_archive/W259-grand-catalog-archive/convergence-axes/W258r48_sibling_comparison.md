# W258r48 — Sibling `claude-sota` Comparison (2026-05-16)

**Critical finding upfront:** `Z:/claude-sota/` **DOES NOT EXIST** as a live sibling — the directory is `Z:/claude-sota(retired)/` (renamed/retired). CLAUDE.md/CLAUDE.local.md cite-anchors to `Z:/claude-sota/.claude/rules/*.md` are **stale** — those rules exist only in the retired snapshot (last activity 2026-05-13 via `history.jsonl` mtime).

This means v8 already operates as the *canonical reference* — there is no live SOTA-evolving sibling diverging from it.

---

## §1 Sibling directory inventory (retired snapshot)

**Z:/claude-sota(retired)/.claude/** had: rules/ (37 .md files), skills/ (31 SKILL.md across 24 dirs), agents/ (12 .md), hooks/, teams/, prompts/, schemas/, scheduled_tasks.lock, homunculus/, agent-memory/, paste-cache/, file-history/, telemetry/ + 11.3MB of bash-commands.log+cost-tracker.log+history.jsonl

**This runtime has:** skills/ (22 SKILL.md across 18 dirs), agents/ (13 .md), NO rules/ directory (removed in W255 cleanup per CLAUDE.md by design).

## §2 High-value items to potentially borrow (top 7)

1. **`skills/autonomous-agent-harness/SKILL.md`** + **`skills/continuous-agent-loop/SKILL.md`** — codified /loop discipline that this 48-round /loop arc operates by intuition. Promote to skill.
2. **`skills/codex-cli-runtime/SKILL.md`** + **`skills/codex-result-handling/SKILL.md`** — operator runs codex Path P 5× in W258; this codifies it. Higher leverage than the inline pattern.
3. **`skills/sota-research/SKILL.md`** + **`skills/sota-cli-tools/SKILL.md`** — predecessor to operator's `sota-convergence-audit` (already installed). Worth diffing for missed primitives.
4. **`skills/agent-eval/SKILL.md`** + **`skills/account-cost-tracking/SKILL.md`** — directly relevant to v8 evals-first + r45 cost tracking. Likely fold patterns into operator's Promptfoo + ccusage setup.
5. **`skills/anthropics-mcp-builder/SKILL.md`** + **`skills/anthropics-skill-creator/SKILL.md`** — Anthropic-OFFICIAL-pattern builders for MCP servers + skills. Inspiration for skill authoring discipline (TDD-for-skills).
6. **`skills/superpowers/{tdd, debug, plan, requesting-code-review, subagent-driven-development, verification-before-completion, hitl-gate}/SKILL.md`** — 7 superpowers patterns. Verify which of these operator's `superpowers@claude-plugins-official` plugin already exposes; clone any gaps.
7. **`agents/codex-rescue.md`** + **`agents/team-lead.md`** + **`agents/silent-failure-hunter.md`** — sibling-only agents. `codex-rescue` is the Path P helper operator references via inline patterns; promoting to subagent saves dispatch overhead.

## §3 Sibling has, but this runtime improves upon (no action)

- **37 rules/*.md files**: explicitly REMOVED in W255 cleanup per CLAUDE.md (`self_invented_count: 0`). This runtime moved cardinal rules to CLAUDE.md + plugin-loaded skills. Sibling kept the bloat; this runtime is cleaner by design.
- **Sibling hooks/** likely held custom `.py` scripts: also removed in W255 cleanup. Direct-CLI hooks only (ruff/pyright/shellcheck/gitleaks) is the canonical shape.
- **homunculus/ + paste-cache/ + agent-memory/** sibling-local state: replaced by external `Z:/claude-sota-installed-state/` per ENV (f) discipline.
- **bash-commands.log (5.5MB) + cost-tracker.log (5.8MB) in-tree**: this runtime redirects all telemetry to OTel + Phoenix MCP + ccusage MCP. Better.

## §4 GENUINELY-NEW primitives from sibling not in v8

**Three sibling-only items v8 r1-r47 entirely missed:**

1. **`skills/grill-me/SKILL.md`** — adversarial self-critique skill. Not in W258 candidate set. Likely complements r16 architect-review (operator-invoked rather than spawn-on-demand). Worth inspection.
2. **`skills/think-in-code-pattern/SKILL.md`** — predates Anthropic Nov 2025 "Code-execution-with-MCP" (per r23). Sibling identified this pattern earlier; same direction Anthropic ratified later. Validates pattern direction but no new content.
3. **`skills/task-lifecycle-pattern/SKILL.md`** — task-state-machine for long-running agent work. Aligns with r45 finding of 4,680 subagent dispatches/week. v8 has no equivalent formalization of task lifecycle.

## §5 Verdict

**Sibling LAGS v8 architecturally** — v8 is the canonical reference. The retirement of `claude-sota` was deliberate; operator built `claude-sota-installed` to replace it with cleaner discipline (no self-invent rules, plugin-loaded skills, external state).

**Recommended actions** (none block v8 ship):
- **DOC FIX**: update CLAUDE.md L48-50 + CLAUDE.local.md L29 cite-anchors from `Z:/claude-sota/` → `Z:/claude-sota(retired)/` (frozen historical reference) OR remove the "sibling SOTA-evolving runtime" framing entirely
- **SELECTIVE PORT** (optional, low priority): clone 4 skills into operator's `.claude/skills/`: `autonomous-agent-harness`, `continuous-agent-loop`, `codex-cli-runtime`, `task-lifecycle-pattern`
- **AGENT PORT** (optional): clone `agents/codex-rescue.md` + `agents/team-lead.md` (operator-actionable subagents)

**v8 itself NEEDS NO REVISION based on this comparison.** Sibling is a retired snapshot; v8 is operator's canonical SOTA reference.

Confidence: 0.85.

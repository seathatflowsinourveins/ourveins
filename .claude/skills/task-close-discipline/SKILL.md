---
name: task-close-discipline
description: Use BEFORE any wave-ship, commit, push, or wave-close action — sweeps the TaskList for in_progress/pending entries owned by the current wave, prompts close-or-carry-forward decision per task, and BLOCKS ship until 0 unresolved entries OR every survivor carries an explicit-carry-forward annotation. Triggers on "wave ship", "ship complete", "wave close", "commit", "push", "pre-ship sweep", "task close", "pending tasks", "carry-forward", "close out the wave", "wrap up", or any operator phrasing that signals end-of-wave closure. Addresses L329-1 FM-class TASK-CLOSE-DRIFT (basic-memory permalink `main/learnings/w329-learnings-ledger`).
---

<!-- Reference: anthropics CC Skills doc `https://code.claude.com/docs/en/skills` (description-match auto-fire semantics). W330 P0-D codification of L329-1 FM-class TASK-CLOSE-DRIFT (200+ waves accumulated 373 orphan tasks because wave-ship protocol omitted task-close). Sibling lesson L329-2 ADVISORY-WITHOUT-ENFORCEMENT informs the BLOCK semantics. Operator-curated path-gated per cardinal-rule-4(b). -->

# task-close-discipline

Description-triggered pre-ship gate. Sweeps the harness TaskList tool for orphan in_progress/pending entries owned by the current wave, forces an explicit close-or-carry-forward decision per task, and BLOCKS ship until either 0 pending or every survivor carries an explicit-carry-forward annotation. Companion to `ops-rhythm` (dwell-threshold escalation) and `learned` (named-failure-mode ledger).

## When to invoke

Trigger keywords/contexts (description-match per `https://code.claude.com/docs/en/skills`):

- "wave ship" / "ship complete" / "ship the wave" / "ready to ship"
- "wave close" / "close out the wave" / "wrap up the wave" / "close the wave"
- "commit" / "push" / "pre-ship" / "pre-commit sweep"
- "task close" / "close tasks" / "pending tasks" / "any open tasks"
- "carry-forward" / "carry forward" / "carry over"
- Stop-hook context where the runtime is about to enter a commit-and-push sequence
- SessionEnd context where unresolved tasks would otherwise become orphans

## When NOT to invoke

- Mid-wave inflight work — tasks are still legitimately in_progress; sweeping mid-stream just creates churn
- Pure read-only audits that produce no new tasks — there is nothing to close
- Autonomous `/loop` cron re-entries that re-issue the same active /goal — those are routine continuations, NOT ship events
- Single-fire trivial tasks that never opened a TaskList entry in the first place

## TaskList tool semantics (Anthropic deferred-tools)

The harness exposes TaskList management via deferred tools (`TaskUpdate`, `TaskStop`, and the implicit task-ledger surfaced through the `TodoWrite`-style mechanism). Per Anthropic CC sub-agents + skills docs (`https://code.claude.com/docs/en/sub-agents`, `https://code.claude.com/docs/en/skills`), the assistant manages a stateful task ledger; each entry carries `status ∈ {pending, in_progress, completed, deleted}`, an optional `metadata` block (including `wave:`), and a `content` field.

Load schemas via `ToolSearch` BEFORE invoking:

```
ToolSearch(query: "select:TaskUpdate,TaskStop", max_results: 2)
```

Then list current tasks (read-only) to obtain the pending/in_progress set. If the runtime exposes a list tool (e.g. `TaskList`), use it; otherwise reconstruct from the most recent `TodoWrite` snapshot in the session transcript.

## "Owned by current-wave" heuristic

A task is considered owned by the current wave if ANY of:

1. **metadata.wave match**: `metadata.wave == <current-wave-id>` (e.g. `W330`)
2. **session-created**: the task was created during the current Claude Code session (no prior-session provenance marker)
3. **content prefix match**: `content` begins with the current wave prefix (e.g. `W330-*`, `[W330] *`, `Wave 330 *`)
4. **agent-of-origin match**: the task was created by a sub-agent dispatched in the current wave (carries the wave id in its `agent_id` or `task_id`)

If NONE of these match, the task belongs to a prior wave — treat as a CARRY-FORWARD candidate (do NOT auto-close someone else's wave artifacts; surface for operator triage).

## Close-or-carry-forward decision matrix

For each in_progress/pending task owned by the current wave:

| Outcome | Action | TaskUpdate call |
|---|---|---|
| Work is **done** | Close as completed | `TaskUpdate(task_id, status="completed")` |
| Work is **blocked by external dependency** | Carry forward with explicit annotation | `TaskUpdate(task_id, status="in_progress", annotation="CARRY-FORWARD: <reason> — operator-decision-required")` |
| Work is **stale / superseded / no-longer-relevant** | Delete with rationale | `TaskUpdate(task_id, status="deleted", annotation="STALE: <rationale>")` |
| Work is **partially done** and remainder belongs to a future wave | Carry forward with scope-split annotation | `TaskUpdate(task_id, status="in_progress", annotation="CARRY-FORWARD: <remaining-scope> — split from <parent-task-id>")` |
| Work was **incorrect** and needs rework | Re-open with rework annotation | `TaskUpdate(task_id, status="pending", annotation="REWORK: <reason> — carry to next wave")` |

## Ship-block protocol

After the sweep:

1. **Count survivors**: tasks in `{in_progress, pending}` after the decision matrix applied.
2. **Verify annotations**: every survivor MUST have an `annotation` field matching one of the CARRY-FORWARD / REWORK / STALE patterns above.
3. **BLOCK if violated**: return a structured block message to the orchestrator BEFORE any commit/push/ship action:

```
TASK-CLOSE-DISCIPLINE: BLOCK
Unresolved tasks owned by <current-wave>: N
  - task_id=<id1> status=<status> content=<excerpt>
  - task_id=<id2> status=<status> content=<excerpt>
  ...
Resolve via TaskUpdate per decision matrix in
.claude/skills/task-close-discipline/SKILL.md §4. Ship is gated.
```

4. **PASS if 0 violators**: return `TASK-CLOSE-DISCIPLINE: PASS — N tasks closed, M carried forward with annotation.` and allow ship to proceed.

## Output format

Always emit a single-block report (no prose narrative):

```
## TASK-CLOSE SWEEP — Wave <id>
Total tasks scanned: <N>
Owned by current wave: <M>
  completed (closed this sweep): <a>
  in_progress (carried with annotation): <b>
  deleted (stale): <c>
  in_progress / pending WITHOUT annotation: <d>

VERDICT: <PASS | BLOCK>
```

## Anti-patterns

- **DO NOT** silently auto-close tasks the operator never marked done — every close-action MUST be evidence-backed (commit SHA, file diff, or explicit operator confirmation in this session)
- **DO NOT** carry forward without annotation — that is the L329-1 failure mode (orphan accumulation)
- **DO NOT** delete prior-wave tasks owned by another wave — surface for operator triage instead
- **DO NOT** invoke recursively — single-fire per ship event; if the sweep blocks, the orchestrator resolves THEN re-invokes
- **DO NOT** treat the sweep as advisory — the BLOCK is enforceable; L329-2 ADVISORY-WITHOUT-ENFORCEMENT is the sibling failure mode

## Provenance

- **L329-1 FM-class TASK-CLOSE-DRIFT**: basic-memory permalink `main/learnings/w329-learnings-ledger` (cite-anchor for the prescription this skill enforces).
- **L329-2 ADVISORY-WITHOUT-ENFORCEMENT**: same ledger; informs the BLOCK semantics (advisory-only mandates silently drift; harness-level enforcement is the SOTA fix).
- **Anthropic CC Skills doc**: `https://code.claude.com/docs/en/skills` (description-match auto-fire semantics).
- **Anthropic CC Sub-agents doc**: `https://code.claude.com/docs/en/sub-agents` (TaskList ledger semantics).
- **W330 P0-D wave**: this codification. Deliverable record at `docs/architecture/W330-SOTA-DISCIPLINE-CLOSURE/W330-D-TASK-CLOSE-DISCIPLINE-CODIFY.md`.

## Cardinal-rule conformance

- **CR-1**: TIER-1-DIRECT cites at Anthropic CC docs + basic-memory permalink for L329-1.
- **CR-3**: this skill is itself a subagent-discipline primitive; it does NOT spawn subagents, it gates the ship-commit point of the orchestrator.
- **CR-4**: operator-curated path-gated SKILL.md per cardinal-rule-4(b) — NOT an ad-hoc auto-fire prompt, frontmatter-gated description match.
- **CR-5**: read-only sweep + TaskUpdate calls only — no new filesystem state outside the TaskList ledger.

## INDEPENDENCE-PROOF

- **FOUNDATION-ANCHOR**: Anthropic CC Skills doc `https://code.claude.com/docs/en/skills` (description-match auto-fire semantics enabling this skill to gate the ship-commit context).
- **COUNTERFACTUAL**: IF the Anthropic Skills system were deprecated tomorrow, the close-tasks-on-ship discipline would remain valid BECAUSE GitHub Actions' "auto-close issue on PR merge" pattern (introduced 2013) codifies the same close-on-ship workflow on a different org, different platform, different mechanism per GitHub docs `https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword` (keywords `closes`, `fixes`, `resolves` auto-close linked issues on PR merge).
  - (a) **ORG-DISTINCT**: Anthropic (Claude Code skills) ≠ GitHub (CI auto-close on merge)
  - (b) **CAUSAL-DISTINCT**: GitHub's auto-close keyword feature predates Claude Code skills by ~10 years; the discipline was not derived from Anthropic doctrine
  - (c) **TEMPORAL-DISTINCT**: GitHub auto-close on merge shipped 2013; Anthropic Claude Code skills shipped 2025 — the codify-tasks-close-on-ship pattern existed long before the substrate this skill runs on

The discipline survives substrate change. The substrate this skill happens to use today is Anthropic's Skills surface; if that surface vanished, a Stop-hook (CR-2 sanctioned-exception, ≤2KB) or a CI gate would preserve the same gate.

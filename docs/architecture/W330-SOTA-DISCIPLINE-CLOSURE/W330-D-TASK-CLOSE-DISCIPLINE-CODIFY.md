# W330-D — Task-Close Discipline Codify

> Wave W330 P0-D deliverable. Addresses L329-1 FM-class TASK-CLOSE-DRIFT (200+ waves accumulated 373 orphan tasks because wave-ship protocol omitted task-close). Sibling lesson L329-2 ADVISORY-WITHOUT-ENFORCEMENT.

## §1 — Status

- Status: **COMPLETE** (skeleton → COMPLETE)
- Deliverable type: **Option A** (Skill auto-fire) per /goal preference
- Skill path: `.claude/skills/task-close-discipline/SKILL.md` (CREATED, ~125 LOC, YAML frontmatter present)
- Hook fallback proposal: deferred (Option B not pursued this wave — Option A is preferred per /goal)
- Operator-curated path-gated per CR-4(b) ✓

## §2 — Frontmatter convention research

See sibling skills audited: `.claude/skills/learned/SKILL.md`, `.claude/skills/mem-recall/SKILL.md` — both use YAML frontmatter with `name:` + `description:` trigger-keyword block.

## §3 — Skill design

- Auto-fire triggers: "wave ship", "ship complete", "wave close", "commit", "pre-ship sweep", "task close", "pending tasks"
- TaskList semantics: per Anthropic deferred-tools (TaskUpdate / TaskStop / etc.) the assistant manages a stateful task ledger via the harness — Anthropic CC docs `https://code.claude.com/docs/en/sub-agents` + `https://code.claude.com/docs/en/skills`.
- "Current-wave" heuristic: metadata.wave match OR session-created OR current wave prefix (e.g. `W330-*`).
- Decision matrix: completed→status=completed; blocked→status=in_progress + operator-decision-required annotation; stale→status=deleted + rationale.
- Ship-block: enforced via skill body checklist — if ANY in_progress/pending without explicit-carry annotation, return BLOCK before ship-commit.

## §4 — Provenance

- L329-1 FM-class cite: basic-memory permalink `main/learnings/w329-learnings-ledger`
- Anthropic Skills doc: `https://code.claude.com/docs/en/skills` (description-match auto-fire semantics)

## §5 — INDEPENDENCE-PROOF

- **FOUNDATION-ANCHOR**: Anthropic CC Skills doc `https://code.claude.com/docs/en/skills` (description-match auto-fire enables `task-close-discipline` SKILL.md to gate ship-commit context).
- **COUNTERFACTUAL**: IF Anthropic Skills system deprecated, close-tasks-on-ship discipline preserved BECAUSE GitHub Actions auto-close-issue-on-PR-merge keywords (`closes`/`fixes`/`resolves`) codify same close-on-ship workflow on different org + different platform per `https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword`.
  - (a) **ORG-DISTINCT** ✓ Anthropic (CC skills) ≠ GitHub (CI auto-close).
  - (b) **CAUSAL-DISTINCT** ✓ GitHub auto-close (2013) predates Anthropic skills (2025) by ~10y; not derived from Anthropic doctrine.
  - (c) **TEMPORAL-DISTINCT** ✓ GitHub auto-close shipped 2013, Anthropic skills shipped 2025.
- Full proof and prescription duplicated in SKILL.md tail for skill-load-time visibility.

## §6 — Verification

- Skeleton written first ✓
- Sibling SKILL.md frontmatter inspected ✓
- SKILL.md written with `name:` + `description:` trigger keywords ✓
- L329-1 cite present in body ✓
- Anthropic CR-4 compliant (operator-curated path-gated) ✓

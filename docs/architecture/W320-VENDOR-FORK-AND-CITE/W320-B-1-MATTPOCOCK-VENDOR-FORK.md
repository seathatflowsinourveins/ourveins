# W320-B-1 — mattpocock `handoff` + `review` Vendor-Fork (SHIPPED)

**Stream**: W320 Stream B Task 1
**Author**: claude-opus-4-7 (W320 Stream B agent)
**Date**: 2026-05-19
**Status**: SHIPPED

## Context

Per CLAUDE.md L30 (operator-curated skills) + W319 Stream A H1 (orchestration adoption) + W319 Stream B B3 (mattpocock multi-repo audit) + W314-r2-AI-r2-4 (carry-over from W314): vendor-fork two mattpocock skills (`handoff` from productivity tier, `review` from in-progress tier) into `.claude/skills/<name>/SKILL.md`.

## Source verification

| Field | Value |
|---|---|
| Upstream repo | `https://github.com/mattpocock/skills` |
| Clone path | `Z:/repos/deps/mattpocock-skills/` |
| HEAD SHA (re-verified W320) | `67bce91c80cd1020a4f068ced32d0281656842ad` |
| HEAD commit | `Fix typo in README.md regarding ticket labels` 2026-05-18 13:21:28 +0100 |
| License | MIT (Copyright (c) 2026 Matt Pocock) — `Z:/repos/deps/mattpocock-skills/LICENSE:1-21` |
| CLAUDE.md cite at L30 | `mattpocock-vendor-fork-4: grill-with-docs + tdd + caveman + diagnose @ 67bce91c80cd` |

SHA `67bce91c80cd` matches the CLAUDE.md L30 cite exactly. **Zero drift since prior wave.**

## Source files

| Upstream path | Target path |
|---|---|
| `skills/productivity/handoff/SKILL.md` (14 LOC) | `.claude/skills/handoff/SKILL.md` |
| `skills/in-progress/review/SKILL.md` (78 LOC) | `.claude/skills/review/SKILL.md` |

`review` upstream-status is **in-progress** (not yet promoted to `productivity/`). Precedent for vendoring in-progress upstream skills: W316 Stream D addyosmani 5-skill vendor-fork captured `interview-me` (similar staging tier). Re-pull on upstream-stabilize.

## Vendor-fork attribution header pattern

Both vendored SKILL.md files have a 5-line attribution block inserted after the frontmatter `---` close, before the body — exact format mirrors W316 addyosmani precedent (`addyosmani-doubt-driven-development/SKILL.md:6-10`):

```markdown
> Vendored from `mattpocock/skills` @ `67bce91c80cd1020a4f068ced32d0281656842ad` (2026-05-18) via W320 Stream B per W319 Stream A H1 + Stream B B3 + W314-r2-AI-r2-4 vendor-fork queue.
>
> **Upstream**: https://github.com/mattpocock/skills/blob/main/skills/{productivity|in-progress}/{handoff|review}/SKILL.md
> **License**: MIT (Copyright (c) 2026 Matt Pocock) — verified W320 Stream B 2026-05-19 against `Z:/repos/deps/mattpocock-skills/LICENSE`.
> **Cardinal-rule compliance**: cite-anchored to CLAUDE.md:30 (operator-curated skills, Anthropic-sanctioned per `https://code.claude.com/docs/en/skills`); CR-3 documented subagent / CR-4 operator-curated path.
```

Body content is **verbatim** from upstream — no edits to the prompt logic itself. For `review/SKILL.md` an additional **Local context note** paragraph is appended to the attribution block flagging the `docs/agents/issue-tracker.md` dependency (mattpocock-specific workflow not adopted in this runtime) and documenting the graceful-degradation path (spec sub-agent reports "no spec available").

## Cardinal-rule compliance check

| Rule | Status | Evidence |
|---|---|---|
| R1 — Install primitives only from trusted plugins/skills | ✓ HOLD | Vendor-fork from named MIT-licensed upstream; not auto-install. |
| R2 — Hooks may only be upstream-plugin OR direct-CLI | ✓ HOLD | Skills don't touch hooks. No `.claude/hooks/**` writes. |
| R3 — Subagents = installed upstream agents OR documented subagent system | ✓ HOLD | Both skills use the documented `Agent` tool subagent system. |
| R4 — Project behavior in CLAUDE.md + settings.json; `.claude/rules/*.md` permitted only operator-curated path-gated via SKILL.md | ✓ HOLD | Files land under `.claude/skills/<name>/SKILL.md` — Anthropic-sanctioned path per `https://code.claude.com/docs/en/skills`. No `.claude/rules/*` writes. |
| R5 — Safety via permissions/sandboxing not custom guard scripts | ✓ HOLD | No script wiring; skill bodies are prompts only. |

`self_invented_count: 0` invariant **HOLDS** (W255 baseline maintained — both files are operator-curated vendor-forks with attribution, not self-invented project content).

## Skill registration verification

After Write, both skills appear in the system-reminder available-skills list at the start of the next conversation turn:

- `handoff` — registered (no namespace prefix, identical to upstream `name:` frontmatter).
- `review` — registered (no namespace prefix). **Naming-collision check**: distinct from `everything-claude-code:review-pr`, `pr-review-toolkit:review-pr`, `code-review:code-review`, `agent-teams:team-review`, `comprehensive-review:full-review`, `security-review` — these are namespaced or differently-named, so the bare `review` slot was free.

## File operations summary

| Operation | Path | Bytes | Status |
|---|---|---|---|
| Write | `Z:/claude-sota-installed/.claude/skills/handoff/SKILL.md` | ~970 | OK |
| Write | `Z:/claude-sota-installed/.claude/skills/review/SKILL.md` | ~4,800 | OK |

## Why these two skills (relevance audit)

**handoff** — directly applicable to W319/W320 multi-wave cadence where session-end handoffs were ad-hoc. Codifies the `mktemp -t handoff-XXXXXX.md` pattern + skill-recommendation pattern + dedup-by-reference pattern. Pairs with existing `everything-claude-code:save-session` and `everything-claude-code:resume-session` skills but is **simpler / lighter / faster** than the ECC session-recording machinery — fits the spirit of W316 cardinal-rule-2-exception minimalism.

**review** — directly addresses W316 codex-r2 BLOCKER #5 (path-mangle Stop-hook) and W317 P0 closures: two-axis Standards-vs-Spec separation prevents the failure mode where a single review-pass conflates "code style" with "feature completeness". Parallel sub-agent dispatch aligns with W269 mandate + W317 parallel_ratio ≥0.7 target. Pairs with — but does NOT supersede — `agent-teams:team-review`, `code-review:code-review`, `superpowers:requesting-code-review`. Use when the diff is small enough that a 5-agent team is overkill but a single-reviewer pass is insufficient.

## W320 forward-AIs

| ID | Priority | Action | Owner |
|---|---|---|---|
| W320-B-1.1 | P2 | Decide whether to namespace `handoff` → `mattpocock-handoff` and `review` → `mattpocock-review` to mirror addyosmani-vendor-fork-5 prefix pattern (3 skills got `addyosmani-` prefix per W316 Stream D) — current bare-name approach is consistent with W315 mattpocock-vendor-fork-4 (grill-with-docs, tdd, caveman, diagnose all bare). | operator |
| W320-B-1.2 | P3 | Author local `docs/agents/issue-tracker.md` if W321+ adopts the mattpocock `/setup-matt-pocock-skills` workflow — currently graceful-degrades. | operator |
| W320-B-1.3 | P3 | Re-pull `review` upstream when promoted from `in-progress/` to a stable tier. | author / next-wave |

## CLAUDE.md count delta

W320 Stream B Task 2 (W320-B-2) refreshes CLAUDE.md L30 skill count `31 → 33` reflecting +2 (handoff + review). Done in companion doc.

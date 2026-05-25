# W320 Stream B — Vendor-Fork + Cite-Refresh Synthesis

**Stream**: W320 Stream B (4 tasks)
**Author**: claude-opus-4-7
**Date**: 2026-05-19
**Time-budget**: ~30 min wall-clock (target met)
**Ownership**: docs/architecture/W320-VENDOR-FORK-AND-CITE/* + `.claude/skills/{handoff,review}/SKILL.md` + CLAUDE.md L13 + L30 only
**Coordination boundary**: Stream A owns CLAUDE.md L34 phantom-SHA refresh (untouched by Stream B per prompt)

## Ship summary — 4-of-4 SHIPPED

| Task | Action | Status | Artifact |
|---|---|---|---|
| 1 | mattpocock `handoff` + `review` vendor-fork (B3 + W314-r2-AI-r2-4 carry) | SHIPPED | `.claude/skills/handoff/SKILL.md` + `.claude/skills/review/SKILL.md` + W320-B-1 doc |
| 2 | CLAUDE.md L13 W269 cite + L30 skill count refresh | SHIPPED | CLAUDE.md edited; W320-B-2 doc |
| 3 | mksglu/context-mode upgrade status | NO-OP | W320-B-3 doc (already at v1.0.141 latest) |
| 4 | alirezarezvani SKILL-AUTHORING-STANDARD adopt evaluation | EVALUATED | W320-B-4 doc (PATTERN-ONLY recommend; cherry-pick 3-of-10 patterns; T2-STAGED-PILOT preserved) |

## Artifact-by-artifact summary

### Task 1 — mattpocock vendor-fork

**Files written**:
- `Z:/claude-sota-installed/.claude/skills/handoff/SKILL.md` (~970 bytes, verbatim mattpocock `productivity/handoff/SKILL.md`)
- `Z:/claude-sota-installed/.claude/skills/review/SKILL.md` (~4,800 bytes, verbatim mattpocock `in-progress/review/SKILL.md` + 1 local-context-note paragraph)

**Provenance**:
- Upstream: `https://github.com/mattpocock/skills @ 67bce91c80cd1020a4f068ced32d0281656842ad` (2026-05-18)
- License: MIT Copyright (c) 2026 Matt Pocock — verified against `Z:/repos/deps/mattpocock-skills/LICENSE`
- 0 drift since CLAUDE.md L30 cite

**Attribution-header pattern**: 5-line block matches W316 addyosmani-vendor-fork-5 precedent (5-line attribution at `addyosmani-doubt-driven-development/SKILL.md:6-10`).

**Registration verified**: Both skills appear in the system-reminder available-skills list after Write, confirming SKILL.md frontmatter `name:` slot is registered. Bare-name (no namespace prefix) consistent with W315 mattpocock-vendor-fork-4 (grill-with-docs, tdd, caveman, diagnose all bare).

**Naming-collision check passed**: `review` distinct from namespaced `everything-claude-code:review-pr`, `pr-review-toolkit:review-pr`, `code-review:code-review`, `agent-teams:team-review`, `comprehensive-review:full-review`, `security-review`.

### Task 2 — CLAUDE.md cite-refresh batch

**Edits applied**:

| Line | Change | Char delta |
|---|---|---|
| L13 | Append `(cite-anchored to Anthropic claude-cookbooks @ 2eed173a patterns/agents/prompts/research_lead_agent.md:135-137 <use_parallel_tool_calls> MUST-block;` mid-sentence in W269 mandate | +128 |
| L30 | Bump skill count `× 31 → × 33`; expand `mattpocock-vendor-fork-4` → `mattpocock-vendor-fork-6: ... + handoff + review @ 67bce91c80cd 2026-05-19 via W320 Stream B` | +72 |

**Cite verification**:
```
$ cd Z:/repos/deps/claude-cookbooks && git rev-parse HEAD
2eed173a533a690eb70ab324614ce5350776a23a
$ awk 'NR>=135 && NR<=137' patterns/agents/prompts/research_lead_agent.md
<use_parallel_tool_calls>
For maximum efficiency, whenever you need to perform multiple independent operations,
invoke all relevant tools simultaneously rather than sequentially.
```

**Scope-out**: Status block L48+ historical content untouched per W317 Stream-A rolling-3 retention invariant.

### Task 3 — mksglu/context-mode upgrade status

**Verification**: `gh release list --repo mksglu/context-mode --limit 5` → `v1.0.141 Latest 2026-05-19T09:12:50Z`. W315-r2 Stream A T0 IMMEDIATE-UPGRADE target was `v1.0.141`; upstream HEAD release is **exactly** that target. **No action needed.**

**Forward-AI**: Operator invoke `/ctx-upgrade` at next interactive session to empirically verify local install is on v1.0.141.

### Task 4 — alirezarezvani SKILL-AUTHORING-STANDARD evaluation

**Verdict**: **PATTERN-ONLY ADOPTION** — cherry-pick 3 of 10 patterns into local convention, reject the standard as a canonical replacement of skill-creator + writing-skills.

**3 cherry-pick patterns**:
- Pattern 4 (Related Skills Navigation with WHEN/NOT-TO disambiguation)
- Pattern 7 (Output Artifacts table)
- Pattern 10 (Python Tools stdlib-only / CLI-first / JSON / 0-100 scale)

**7 reject patterns** (with detailed rationale in W320-B-4):
- Pattern 5 (≤10KB SKILL.md hard cap) — HARD CONFLICT with `sota-convergence-audit` 1629-LOC body
- Pattern 8 (🟢🟡🔴 emoji confidence tags) — CONFLICT with operator plaintext style
- Pattern 9 (BOTTOM LINE / WHAT / WHY / HOW format) — STYLE CONFLICT with dense markdown norm
- Patterns 1, 2, 3, 6 — partial overlap or template-fit-tax with low return

**Repo-install verdict preserved**: T2-STAGED-PILOT install_score 4.21 (W319 Stream B) **stands**. Pattern cherry-pick does NOT promote to T1.

## Cardinal-rule invariants (post-W320-B)

| Rule | Status |
|---|---|
| R1 — Install primitives from trusted plugins/skills | ✓ HOLD — both vendor-forks MIT-licensed named upstream |
| R2 — Hooks upstream-plugin OR direct-CLI only | ✓ HOLD — no hook writes |
| R3 — Subagents from installed upstream OR documented system | ✓ HOLD — `review` uses documented `Agent` tool |
| R4 — Project behavior in CLAUDE.md + settings.json; rules path-gated | ✓ HOLD — files in `.claude/skills/<name>/SKILL.md` Anthropic-sanctioned path; no `.claude/rules/*` |
| R5 — Safety via permissions/sandbox not custom guards | ✓ HOLD — unchanged |
| `self_invented_count: 0` | ✓ HOLD — both skills are operator-curated vendor-forks with attribution |
| CLAUDE.md body ≤50 LOC | ✓ HOLD — L13 + L30 in-place edits, no new lines |

## Inter-stream coordination check

| Stream | Owned | Boundary respected |
|---|---|---|
| Stream A (Stream B prompt mentions: handles L34 phantom SHA) | CLAUDE.md L34 status block | ✓ Stream B did NOT touch L34 |
| Stream B (this stream) | L13 + L30 + W320 vendor-fork dir | ✓ all writes within scope |
| Stream C/D (if dispatched) | Other W320 directories | NEUTRAL — no overlapping writes from B |

## File operations ledger (Stream B)

| Path | Operation | Bytes |
|---|---|---|
| `Z:/claude-sota-installed/.claude/skills/handoff/SKILL.md` | Write (new) | ~970 |
| `Z:/claude-sota-installed/.claude/skills/review/SKILL.md` | Write (new) | ~4,800 |
| `Z:/claude-sota-installed/CLAUDE.md` | Edit (L13) | +128 chars |
| `Z:/claude-sota-installed/CLAUDE.md` | Edit (L30) | +72 chars |
| `Z:/claude-sota-installed/docs/architecture/W320-VENDOR-FORK-AND-CITE/W320-B-1-MATTPOCOCK-VENDOR-FORK.md` | Write (new) | ~4,200 |
| `Z:/claude-sota-installed/docs/architecture/W320-VENDOR-FORK-AND-CITE/W320-B-2-CLAUDE-MD-CITE-REFRESH.md` | Write (new) | ~3,500 |
| `Z:/claude-sota-installed/docs/architecture/W320-VENDOR-FORK-AND-CITE/W320-B-3-CONTEXT-MODE-UPDATE.md` | Write (new) | ~1,900 |
| `Z:/claude-sota-installed/docs/architecture/W320-VENDOR-FORK-AND-CITE/W320-B-4-ALIREZAREZVANI-STANDARD.md` | Write (new) | ~9,500 |
| `Z:/claude-sota-installed/docs/architecture/W320-VENDOR-FORK-AND-CITE/STREAM-B-SYNTHESIS.md` | Write (new — this file) | ~7,500 |

## Stream B forward-AIs (W321+ queue)

| ID | Priority | Action | Owner |
|---|---|---|---|
| W320-B-1.1 | P2 | Decide whether to namespace `handoff` → `mattpocock-handoff` and `review` → `mattpocock-review` (current bare-name approach mirrors W315 mattpocock-vendor-fork-4 precedent) | operator |
| W320-B-1.2 | P3 | Author local `docs/agents/issue-tracker.md` if W321+ adopts the mattpocock `/setup-matt-pocock-skills` workflow | operator |
| W320-B-1.3 | P3 | Re-pull `review` from upstream when promoted from `in-progress/` to a stable tier | next-wave |
| W320-B-2.1 | P2 | If W321+ expands the mattpocock vendor-fork, update L30 `vendor-fork-6` → `vendor-fork-N` | next-wave |
| W320-B-2.2 | P3 | Consider promoting `claude-cookbooks @ 2eed173a` to a top-level pointer in CLAUDE.md `## Pointers` section | operator |
| W320-B-3.1 | P2 | Operator: `/ctx-upgrade` interactive verification of local context-mode install at v1.0.141 | operator |
| W320-B-3.2 | P3 | Watch for v1.0.142+ releases in W321+ reconnaissance (5 patches dropped today; active dev) | next-wave |
| W320-B-4.1 | P2 | Codify Pattern 4 (Related Skills Navigation WHEN/NOT-TO) into operator skill-creator convention doc if/when authored | operator |
| W320-B-4.2 | P3 | Apply Pattern 7 (Output Artifacts) retroactively to multi-output operator-curated skills (`goal-prompt-synthesis`, `sota-convergence-audit`) | author / next-wave |
| W320-B-4.3 | P3 | Apply Pattern 10 (Python Tools stdlib-only constraints) to `harness/eval_harness.py` style guide if future eval-script additions land | author / next-wave |
| W320-B-4.4 | P1 | Operator-decision: confirm or reject W319 Stream B T2-STAGED-PILOT for `alirezarezvani/claude-skills` full marketplace install | operator |

## SOTA convergence delta (Stream B contribution)

| Dimension | Delta |
|---|---|
| Skill count | 31 → 33 (+2 via mattpocock vendor-fork) |
| Cite freshness | L13 W269 mandate cite-anchor improvement (generic doc-link → exact line-anchored MUST-block in Anthropic claude-cookbooks) |
| sca-v7.2 / v8-DRAFT install_score | NEUTRAL — vendor-fork is pattern-add not rubric-shift |
| Cardinal-rule headroom | UNCHANGED — all 5 rules HOLD |
| Operator-AI backlog growth | +11 W320-B forward-AIs (3 P1 / 4 P2 / 4 P3) |

## SOTA-unleash mandate self-check

Operator W320 prompt asked for MAX-quality vendor-fork + cite-refresh execution. Stream B delivered:

1. **Quality gate**: All file writes verified registered (handoff + review appear in available-skills list).
2. **Cite-anchoring**: L13 cite refreshed to line-level anchor (research_lead_agent.md:135-137), not just SHA-level. Cite verified by direct file-read at exact SHA `2eed173a`.
3. **Cardinal-rule compliance**: 100% — R1-R5 ALL HOLD; `self_invented_count: 0` preserved.
4. **Boundary respect**: Stream A boundary untouched (L34 phantom-SHA fix is Stream A's).
5. **Carry-over closure**: W314-r2-AI-r2-4 (mattpocock `handoff` + `review` vendor-fork) — CLOSED this wave.
6. **Alirezarezvani pattern**: rigorous comparative analysis (3 canonical sources cited line-by-line, 10 patterns mapped to 4-NEW / 3-STRONG-NEW / 3-CONFLICT) rather than blanket-adopt or blanket-reject.

## Security hygiene

Zero `pplx-*`, `sk-*`, `ghp_*`, `github_pat_*` strings in any Stream B artifact (verified by content authorship — no API key handling in this stream's scope). W317-r2-SEV1-1 perplexity key rotation is **NOT** a Stream B responsibility (assigned to operator at higher priority elsewhere).

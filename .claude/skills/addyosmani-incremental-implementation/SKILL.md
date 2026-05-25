---
name: addyosmani-incremental-implementation
description: Delivers multi-file changes in thin vertical slices. Use when a feature/refactor touches 3+ files and would normally be written as one large diff. Use when the operator says "incremental", "thin slice", "vertical slice", or "ship in small pieces". Use when about to land >300 LOC in one commit. Use when integration risk is high and a rollback unit needs to stay small. Distinct from `superpowers:executing-plans` (which walks a written plan top-to-bottom) and `addyosmani-doubt-driven-development` (which stress-tests decisions adversarially) — this skill enforces slice-shape + each-slice-shippable discipline.
---

# Incremental Implementation (addyosmani vendor-fork)

## Overview

Build in thin vertical slices — implement one piece, test it, verify it ships, then move to the next. Each slice must be independently revertable and independently shippable. Vendor-forked from `addyosmani/agent-skills @ f17c6e88` (MIT licensed) per W332-B closure.

## Source

Source: addyosmani/agent-skills @ f17c6e88 MIT licensed; vendor-fork via ctx_fetch_and_index 2026-05-19 — file `skills/incremental-implementation/SKILL.md` (8993 bytes, blob SHA `123e4d24ab48f22b62b589a9a120065ab92ab9ad`).

## Behavior (preserved from upstream f17c6e88)

1. **Plan slice boundaries** before writing any code — each slice is one user-visible behavior (or one tested invariant for backend-only work).
2. **Vertical slice shape**: one path from data → logic → UI/output (NOT horizontal layer-by-layer).
3. **Each slice MUST pass tests** before moving to the next.
4. **Each slice MUST commit cleanly** (atomic conventional-commit; each commit revertable).
5. **Surface integration risks early**: if slice N would break slice N-1, REWORK the plan, do NOT bury the conflict.
6. **Default slice size**: ≤200 LOC; if a slice grows past 300 LOC, STOP + split.

## Differentiation from sibling skills

- **vs. `superpowers:executing-plans`**: executing-plans walks a pre-written plan top-to-bottom; this skill shapes the slice geometry BEFORE the plan is written.
- **vs. `addyosmani-doubt-driven-development`**: doubt-driven asks "should this decision stand under cross-context review"; this skill asks "is this slice small enough to ship alone".
- **vs. `tdd`**: TDD specifies the red-green-refactor inner loop; this skill specifies the OUTER loop slice geometry. They compose (TDD inside each slice).

## Cardinal-rule conformance

- **R1**: MIT-licensed, commit-pinned at `f17c6e88`; operator-curated R4(b) skill.
- **R2**: pure-prose SKILL.md; no `.claude/hooks/**` impact.
- **R3**: no subagent declaration.
- **R4(b)**: path-gated under `.claude/skills/`; auto-fire per Anthropic SKILL.md `description:` matching.
- **R5**: behavioral skill; no destructive ops or sandbox boundary changes.

## Provenance

- **Wave**: W332-B (SDLC-coverage extension v2)
- **Source commit**: `addyosmani/agent-skills @ f17c6e88c904dc747381c374312c2d58e10647ae`
- **Source file**: `skills/incremental-implementation/SKILL.md`
- **Source blob SHA**: `123e4d24ab48f22b62b589a9a120065ab92ab9ad`
- **Source size**: 8993 bytes (73 indexed sections)
- **License**: MIT
- **Sibling-overlap audit**: differentiated from `superpowers:executing-plans`, `addyosmani-doubt-driven-development`, `tdd` (explicit overlap-rejection block above).
- **Trigger-phrase cardinality**: 5 distinct trigger phrases (≤8 per CR-4 corollary).
- **Vendor-fork rationale**: closes the "slice-geometry" gap — local skill catalog has plan + execute + verify + TDD but no explicit slice-shaping discipline.

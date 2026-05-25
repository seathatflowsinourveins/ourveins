---
name: addyosmani-spec-driven-development
description: Writes a lightweight pre-coding spec when no formal `speckit-*` workflow is appropriate. Use when starting a small-to-medium feature where formal SpecKit constitution/plan/tasks workflow is overkill but ad-hoc coding is risky. Use when requirements are vague or only exist as a one-line operator request. Use when the operator says "spec first", "write a quick spec", "before coding". Distinct from `speckit-specify` (which uses the full SpecKit constitution/plan/tasks pipeline) — this skill produces a single 1-2 page lightweight spec that fits inline in the conversation.
---

# Spec-Driven Development (addyosmani vendor-fork — lightweight variant)

## Overview

Write a structured specification before writing any code, BUT keep it lightweight — 1-2 pages, inline-conversation-friendly, no separate constitution.md/plan.md/tasks.md file tree. Vendor-forked from `addyosmani/agent-skills @ f17c6e88` (MIT licensed) per W332-B closure.

## Source

Source: addyosmani/agent-skills @ f17c6e88 MIT licensed; vendor-fork via ctx_fetch_and_index 2026-05-19 — file `skills/spec-driven-development/SKILL.md` (7784 bytes, blob SHA `929dd0cc4962f00d81fa6251883ffa952459ac65`).

## Behavior (preserved from upstream f17c6e88)

A lightweight spec covers:

1. **Goal**: one paragraph — what the change accomplishes for the user.
2. **Non-goals**: explicit list of what is OUT of scope (prevents scope creep).
3. **User stories** OR **invariants** (2-5 items).
4. **Acceptance criteria**: testable conditions (each maps to a test you will write).
5. **Open questions**: anything the operator must decide before coding.
6. **Risks**: known failure modes + mitigation.

Length budget: 200-600 lines markdown. If the spec exceeds 600 lines, **switch to `speckit-specify`** — at that scale the full SpecKit pipeline is the right tool.

## Differentiation from sibling skills

- **vs. `speckit-specify`** (and the 8 other `speckit-*` skills): SpecKit produces a multi-file constitution.md + plan.md + tasks.md + checklist.md workflow with cross-artifact analysis. This skill produces a single inline spec, no file tree, no constitution.
- **vs. `superpowers:writing-plans`**: writing-plans turns a known spec into a multi-step task plan. This skill creates the spec itself.
- **vs. `superpowers:brainstorming`**: brainstorming explores design space; this skill PINS the design once explored.
- **vs. `grill-with-docs`**: grill-with-docs stress-tests an existing plan against project docs; this skill writes the original spec.

**Trigger threshold**: only fire when SpecKit is overkill AND ad-hoc coding is risky. For trivial 1-file changes, skip the spec; for ≥5-file changes touching public contracts, prefer `speckit-specify`.

## Cardinal-rule conformance

- **R1**: MIT-licensed; commit-pinned `f17c6e88`; operator-curated R4(b) skill.
- **R2**: pure-prose SKILL.md.
- **R3**: no subagent declaration.
- **R4(b)**: path-gated; auto-fire per SKILL.md `description:`. Trigger phrasing explicitly avoids `/speckit-*` slash-command-collision.
- **R5**: read-mostly skill; spec output is a markdown artifact, no destructive ops.

## Provenance

- **Wave**: W332-B (SDLC-coverage extension v2)
- **Source commit**: `addyosmani/agent-skills @ f17c6e88c904dc747381c374312c2d58e10647ae`
- **Source file**: `skills/spec-driven-development/SKILL.md`
- **Source blob SHA**: `929dd0cc4962f00d81fa6251883ffa952459ac65`
- **Source size**: 7784 bytes (57 indexed sections)
- **License**: MIT
- **Sibling-overlap audit**: HIGH-RISK overlap with `speckit-*` family (9 skills); mitigated via explicit length-budget + multi-file vs. single-file differentiation + trigger-threshold rule.
- **Trigger-phrase cardinality**: 5 distinct trigger phrases (≤8 per CR-4 corollary).
- **Vendor-fork rationale**: SpecKit family is too heavyweight for small-feature work; addyosmani's lightweight spec pattern fills the 200-600 LOC tier gap.

---
name: addyosmani-source-driven-development
description: Grounds framework/library decisions in official documentation before writing code. Use when implementing with React, Next.js, Vue, Svelte, Astro, or any third-party SDK where API correctness matters. Use when an LLM is tempted to emit a deprecated pattern. Use when the operator says "cite the doc", "official source", or "source-driven". Use when reviewing AI-generated code that claims to use a library API. Distinct from grill-with-docs (which stress-tests a plan against project docs) — this skill enforces upstream-doc lookup before primary code synthesis.
---

# Source-Driven Development (addyosmani vendor-fork)

## Overview

Every framework-specific code decision must be backed by official documentation. Vendor-forked from `addyosmani/agent-skills @ f17c6e88` (MIT licensed) per W332-B closure for the v2 SDLC-coverage extension that complements the W316 vendor-fork-5 set (doubt-driven-development / frontend-ui-engineering / api-and-interface-design / code-simplification / interview-me).

## Source

Source: addyosmani/agent-skills @ f17c6e88 MIT licensed; vendor-fork via ctx_fetch_and_index 2026-05-19 — file `skills/source-driven-development/SKILL.md` (8204 bytes, blob SHA `9ef02877e446bd2d31862006ef4e3a79d5c38b9a`).

## Behavior (preserved from upstream f17c6e88)

When you fire, follow the source-driven loop:

1. **Identify the framework/library** the user is building against.
2. **Locate the official doc URL** (prefer `*.dev` / official subdomain over Stack Overflow / blog posts / Medium).
3. **Fetch + cite** the specific section that authorizes the pattern you propose.
4. **Reject deprecated patterns** even if widely seen in training data; if the doc deprecates an API, surface the deprecation note + the modern replacement.
5. **For SDK calls** prefer the SDK's official changelog over generic prose docs (catches version-pinning drift).

Cite-anchor pattern: `<framework> <feature> @ <official-doc-URL>#section`.

## Cardinal-rule conformance

- **R1 (trusted source)**: addyosmani/agent-skills is MIT-licensed; commit `f17c6e88` pinned; operator-curated R4(b) path-gated skill (no plugin-install needed).
- **R2 (no hook bodies)**: skill is pure prose under `.claude/skills/<name>/SKILL.md` — no `.claude/hooks/**` impact.
- **R3 (no new subagents)**: skill does not declare a subagent_type; runs inline in current Agent context.
- **R4(b)**: operator-curated path-gated skill per `https://code.claude.com/docs/en/skills` SKILL.md spec. Auto-fire cardinal rule stated in description (Anthropic SKILL.md `description:` matching).
- **R5 (sandbox)**: read-only doc-lookup behavior; no destructive ops; CR-5 layered-defense unaffected.

## Provenance

- **Wave**: W332-B (vendor-fork of SDLC-coverage set v2)
- **Source commit**: `addyosmani/agent-skills @ f17c6e88c904dc747381c374312c2d58e10647ae`
- **Source file**: `skills/source-driven-development/SKILL.md`
- **Source blob SHA**: `9ef02877e446bd2d31862006ef4e3a79d5c38b9a`
- **Source size**: 8204 bytes (52 indexed sections per ctx_fetch_and_index 2026-05-19)
- **License**: MIT (preserved upstream attribution)
- **Sibling-overlap audit**: 0 high-overlap siblings; differentiated from `grill-with-docs` in description.
- **Trigger-phrase cardinality**: 6 distinct trigger phrases (≤8 per W331 axis-1 #6 CR-4 corollary).
- **Vendor-fork rationale**: addyosmani signature methodology; preserves the upstream-doc-first discipline that complements W316 doubt-driven-development.

---
name: vercel-composition-patterns
description: Use when working on React composition patterns from vercel-labs/agent-skills — reusable component APIs, compound components, state lifting, boolean prop proliferation, or React 19 composition decisions.
license: MIT
metadata:
  author: vercel
  source: Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/SKILL.md
  source_head: b9c8ee0643d87d3c5a953d1e22382ff2ead39229
---

# Vercel Composition Patterns

Before applying this skill, read:
`Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/SKILL.md`.

Load only the specific rule files needed from:
`Z:/repos/deps/vercel-labs-agent-skills/skills/composition-patterns/rules/`.

Prefer these upstream patterns when they fit the codebase:
- Compound components for complex shared context.
- Explicit variant components instead of boolean mode props.
- Provider-owned state with generic state/action/meta interfaces.
- Children-based composition over render-prop sprawl.


---
name: sota-diagram-expression
description: Use when expressing structural artifacts as diagrams rather than prose. Triggers on "architecture diagram", "system topology", "workflow diagram", "visualize", "C4 model", "diagram-as-code", "render as diagram", "show the layers".
---

# SOTA Diagram Expression

## Overview

When the topic is **structural** — architecture, topology, workflow, layered
stacks, data flow, component layout, MCP/plugin fabric, memory tiers, repo
relationships, progress states — the SOTA-current expression is
**diagrams-as-code** (Mermaid or D2 source in fenced blocks), NOT prose
narration about the structure, and NOT research about which diagram tool to use.

**Auto-fire cardinal** (per CLAUDE.md Cardinal Rule 4(b) operator-curated
path-gated SKILL): when triggers match, default to diagram source. Do NOT
silently fall back to prose.

## When to use

Fire when the operator asks something whose honest answer is shape-shaped:

- "show me the architecture / runtime / system"
- "express the X layer / tier / topology"
- "diagram the workflow / pipeline / sequence"
- "what's the structure of …"
- "visualize the MCP fabric / plugin layout / memory stack"
- "list the repos and how they relate"
- "render this as a diagram"
- any time you catch yourself about to emit 3+ paragraphs naming components
  and their relationships — that's a diagram in disguise

## When NOT to use

- Single-sentence factual answers ("what port?" → "8000")
- Code reviews of non-architectural code
- Trivial lists with no inter-element relationships (just emit the list)
- Operator explicitly asked for prose ("describe in words why …")
- Aesthetic / decorative asks ("make this look pretty")

## Format selection by fitness

| Topic shape | Format | Why |
|---|---|---|
| Architecture topology (containers, cross-edges, hierarchy) | **D2** + TALA layout note | designed for software architecture; handles dense edge graphs |
| Layered stack (L1 → Ln) | **Mermaid** `flowchart TD` or `BT` | native GitHub render, zero install |
| Sequence / handshake / call flow | **Mermaid** `sequenceDiagram` | native, compact |
| State machine / lifecycle | **Mermaid** `stateDiagram-v2` | native |
| Memory / tier / capability grid | **Mermaid** `flowchart` with subgraphs OR a table | depends on whether relations matter |
| Repo list / capability matrix | **Markdown table** | tabular data is a table, not a diagram |
| Progress / wave / milestone | **Markdown table** with status column, OR Mermaid `gantt` if time axis matters | choose by whether time matters |
| Inline doc diagram in CLAUDE.md / README / PR / issue | **Mermaid** | GitHub renders natively, zero install |

## Required output shape (the default)

When firing, produce in one response:

1. A **terminal-native Unicode** rendering (header bars + indented bullets +
   `▼`/`├─` connectors, no right-border alignment required) so the operator
   sees structure immediately in the CLI.
2. The **Mermaid source** in a ` ```mermaid ` fenced block — renders on
   GitHub, claude.ai, IDE previews with zero install.
3. For *architecture* views: ALSO a **D2 source** block with a TALA layout
   render note (`d2 --layout tala <file>.d2 <file>.svg`).
4. A short **provenance line** stating what's `verified-live` vs
   `self-reported` per CLAUDE.md Cardinal Rule 6 (verify-before-claim).
5. For non-trivial diagrams worth persisting: **offer** to commit to
   `docs/architecture/diagrams/` following the exemplar README + the
   W335 codex-trailer gate dance shown by `030e3aa`.

## C4 framing for architecture views

When expressing the *whole runtime* or *whole-system* architecture, use the
**C4 model** (c4model.com): start at **Container** level (one box per major
subsystem), then drill to **Component** as needed in follow-up views. Do NOT
mix levels in one diagram.

In-repo exemplars to mirror:

- `docs/architecture/diagrams/master-architecture.d2` — C4 Container view
- `docs/architecture/diagrams/sota-5layer-stack.mmd` — focused subsystem stack
- `docs/architecture/diagrams/memory-tiers.mmd` — Component-level drill-down
- `docs/architecture/diagrams/README.md` — provenance + render guide template

## Render-claim honesty (CR-6)

NEVER claim "render-verified" or "renders correctly" unless you actually ran
`mmdc` or `d2` and captured the output. If render tooling is absent in this
runtime (which it is by design, install-minimal), state plainly: "GitHub-
native Mermaid is the render target; not locally render-tested." Mermaid
syntax can be hand-validated against the v11 flowchart grammar; that's the
ceiling of what you can honestly claim without a renderer.

## Common rationalizations (close before they trigger)

| Excuse | Reality |
|---|---|
| "The operator asked a question, prose answers it" | Structural questions get structural answers. A diagram IS the answer for topology/workflow/layers. |
| "Let me first research which diagram tool is best" | Don't research tools when asked to express the thing. Mermaid + D2 are the SOTA defaults — use them. (This was the natural-baseline failure in the conversation that spawned this skill.) |
| "This is too small to diagram" | If you're about to emit 3+ paragraphs naming components and their relationships, it's a diagram in disguise. |
| "The architecture is too complex to fit" | Split into C4 levels: Container view (whole), then Component (drill). Don't prose-blob to avoid splitting. |
| "I'll add the diagram later as a follow-up" | Later = never. Produce the diagram in the same turn as the structural answer. |
| "There's no installed render tool, so source code is useless" | Source code IS the artifact. GitHub renders Mermaid server-side; D2 has a CLI; both are SOTA practice. |
| "Plain Unicode is enough; skip Mermaid" | Unicode is the CLI rendering; Mermaid is the exportable git-tracked source. Provide BOTH for non-trivial views. |
| "I'll just describe the diagram in words" | If you're describing a diagram, you should be emitting a diagram. |

## Red flags — STOP and re-frame as diagram

- About to write 3+ paragraphs naming components or planes
- About to use the phrase "X talks to Y which forwards to Z"
- About to enumerate layers / tiers / stages in prose
- About to list repos and inter-repo relations in prose
- About to describe a workflow with "first… then… finally…"
- About to research diagram tools instead of producing a diagram
- About to claim a diagram "renders correctly" without having rendered it

**All of these mean: emit a Mermaid (and/or D2) source block as the answer.**

## Sister-skill discrimination (no >50% overlap with any)

- `frontend-design`, `frontend-ui-engineering` — UI/visual product design;
  NOT architecture diagrams
- `code-modernization:modernize-map` — multi-step dependency-mapping
  pipeline (workflow), not single-response expression
- `agent-skills:documentation-and-adrs` — ADRs / decision records; this
  skill is the visualization layer those ADRs reference
- `improve-codebase-architecture` — refactor actions on the codebase, not
  visualization of current state
- `playground:playground` — interactive HTML explorers; this skill is the
  static-source diagram layer

## Cite-anchors (the SOTA reference set)

Drawn from the diagram-tooling research catalogued at
`docs/architecture/diagrams/README.md`:

- **Mermaid v11** flowchart / sequence / state grammar — GitHub-native
  server-side render
- **D2 + TALA** — Terrastruct's architecture-tuned layout engine
  (head-to-head comparisons at terrastruct/text-to-diagram-site)
- **C4 model** — c4model.com (Simon Brown), Container → Component drill-down
- **`veelenga/claude-mermaid`** + **`yctimlin/mcp_excalidraw`** — the 2026
  vision-feedback render-evaluate-refine pattern (not installed here; opt-in)
- **`terrastruct/awesome-diagrams`** — curated catalog of the space

## Regen-on-source-change discipline (borrowed pattern)

Diagrams-as-code are only honest if they track the system they describe.
Pattern borrowed from `safishamsi/graphify` (`graphify export callflow-html`
+ `graphify hook install` — "Mermaid architecture/call-flow HTML auto-
regenerates on every git commit if hook is installed"): treat `.mmd` / `.d2`
sources under `docs/architecture/diagrams/` as **canonical** and the
PNG/SVG/HTML renders as **derived**; when the architecture changes (new
plugin tier, retired MCP server, new wave-N closure landing), update the
`.mmd` / `.d2` source in the SAME commit as the architecture change, not
in a later cleanup wave. We do NOT install graphify or a regen hook
(CR-1/CR-2/CR-9 install-minimal); we adopt the *discipline*, enforced by
this skill firing whenever structural drift is being introduced.

## Real-world impact

The in-repo exemplar set under `docs/architecture/diagrams/` (commit
`030e3aa`) demonstrates the discipline end-to-end: 5 source files
(README + master-architecture in Mermaid+D2 + L1-L5 stack + memory tiers),
provenance table separating `verified-live ✅` from `self-reported ⚠`,
codex GPT-5.5 round-2 `APPROVE` after a round-1 catch of gate-name drift.
That commit is the shape-template for future structural-expression answers.

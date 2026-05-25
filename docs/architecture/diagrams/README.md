# Runtime Architecture Diagrams — `claude-sota-installed`

Diagrams-as-code for this runtime. **The source files are the canonical
artifact; images are renders.** Mermaid (`.mmd`) renders natively on GitHub and
claude.ai with zero tooling; D2 (`.d2`) is the high-fidelity architecture view
(TALA layout) and renders via the `d2` CLI.

## Provenance (verify-before-claim, CR-6)

State shown in the diagrams, and how it was sourced as of 2026-05-21:

| Fact | Source | Status |
|---|---|---|
| 5 git worktrees (main + W359/W360/W361/W362a) | `git worktree list` | ✅ verified live |
| 17 MCP servers | `.mcp.json` read | ✅ verified live |
| Orchestrator = Opus 4.7 · 1M ctx | session env | ✅ verified live |
| Commit gates (commitlint · codex-trailer · provenance-lint · bare-subagent-grep · cr2-2kb · cr7-collision) | `.pre-commit-config.yaml` | ✅ verified live |
| codex GPT-5.5 reviewer / qwen3 triage / Sonnet tie-break | CLAUDE.md Architecture | ⚠ self-reported |
| ~58 local skills, 6 memory tiers, L1–L5 stack | CLAUDE.md (≈W350) | ⚠ self-reported |

> **Drift:** live worktree branches are W359–W362a, but CLAUDE.md root memory
> still reports ≈W350. Treat self-reported *counts* as approximate-as-of-W350;
> the ✅ rows are exact-as-of-now. Regenerate after reconciling root memory.

## Views

| File | View | Format | Why this format |
|---|---|---|---|
| `master-architecture.mmd` | Whole runtime, 8 planes | Mermaid | GitHub-native render, zero install |
| `master-architecture.d2` | Whole runtime (C4 Container) | D2 | TALA layout for architecture topology |
| `sota-5layer-stack.mmd` | Named L1–L5 parallel-git-hook stack | Mermaid | simple layered stack |
| `memory-tiers.mmd` | T1–T6 memory tiers (live/retired) | Mermaid | simple stack |

Format selection follows the fitness rule: **D2 + TALA** for architecture
topology (container nesting, many cross-edges); **Mermaid** for layered stacks
and anything that must render with no local toolchain.

## Rendering

**GitHub / claude.ai (zero install):** open any `.mmd` here, or paste its body
into a ` ```mermaid ` fenced block — rendered server-side.

**Local PNG/SVG export (optional toolchain — not installed in this runtime):**

```bash
# Mermaid -> SVG/PNG
npx -y @mermaid-js/mermaid-cli -i master-architecture.mmd -o master-architecture.svg

# D2 -> SVG (TALA layout) — requires the d2 binary
#   scoop install d2     (Windows)   |   brew install d2   (macOS)
d2 --layout tala master-architecture.d2 master-architecture.svg
```

Neither tool is installed here by design (install-minimal, governed runtime;
every MCP/plugin pays the trust-tuple + version-pin + codex-gate tax).
GitHub-native Mermaid covers documentation; image export is opt-in.

> **Not done:** these source files were **not** locally render-tested (no
> `d2`/`mmdc` present). Mermaid syntax is hand-validated against the v11
> flowchart grammar; GitHub's renderer is the authority. No "render-verified"
> claim is made here per CR-6.

## C4 mapping

`master-architecture.d2` is a **C4 Container** view: each container = one runtime
subsystem (orchestration core, review gate, skills, parallel execution, memory,
MCP fabric, governance, substrate). Drill to **Component** level by expanding any
single container in a follow-up diagram (e.g. `memory-tiers.mmd` expands the
memory container).

## Regeneration

Source of truth = `CLAUDE.md` (Architecture + Runtime-state sections) + live
probes (`git worktree list`, `.mcp.json`, `.pre-commit-config.yaml`). When the
architecture changes, edit these source files and re-render. Keep the provenance
table honest: re-probe the ✅ rows; re-date the ⚠ rows.

## Auto-fire skill

This exemplar set is referenced by the local operator-curated skill
[`sota-diagram-expression`](../../../.claude/skills/sota-diagram-expression/SKILL.md)
(per CLAUDE.md Cardinal Rule 4(b)), which auto-fires whenever the operator
asks to express architecture, topology, workflow, layered stacks, or other
structural artifacts — and defaults to diagram source instead of prose.
The skill uses the files here as its shape-template.

## SOTA practices applied

- [x] Diagrams-as-code — text source, git-tracked, PR-reviewable
- [x] Rendered at point of consumption (GitHub-native Mermaid)
- [x] Format selected by fitness (D2/TALA vs Mermaid)
- [x] C4 model framing for the architecture view
- [x] Provenance annotated — verified-live vs self-reported (CR-6)
- [x] Regenerable with a single source-of-truth pointer
- [x] Layout-engine guidance documented (TALA / ELK / dagre)
- [x] State drift surfaced (root-memory vs live)

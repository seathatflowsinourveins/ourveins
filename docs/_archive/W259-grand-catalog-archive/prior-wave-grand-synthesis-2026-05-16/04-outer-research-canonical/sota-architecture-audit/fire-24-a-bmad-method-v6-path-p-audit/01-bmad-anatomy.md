# 01 — BMAD-METHOD v6.6.0 Line-by-Line Anatomy

> **Probe method**: direct local `Z:/repos/deps/BMAD-METHOD` filesystem read at HEAD `e36f219c`
> **Cite class**: TIER-1-DIRECT (file:line at pinned SHA — immutable cite anchor)
> **Verification**: cross-confirmed by Path P codex T1 deep-review-exec run 2026-05-10

## Repo metadata

| Field | Value | Cite |
|---|---|---|
| HEAD SHA | `e36f219c` | `git -C Z:/repos/deps/BMAD-METHOD log -1 --oneline` |
| License | MIT | `Z:/repos/deps/BMAD-METHOD/LICENSE:1` ("MIT License") |
| Org | bmad-code-org (named GitHub org) | repo URL canonical |
| Author | Brian (BMad) Madison | `Z:/repos/deps/BMAD-METHOD/.claude-plugin/marketplace.json:3-4` |
| Version | 6.6.0 (`bmad-method` npm package) | `marketplace.json:14` |
| Node.js req | ≥20.0.0 | README.md:5 badge |
| Python req | ≥3.10 | README.md:6 badge |
| Package manager | uv | README.md:7 badge |
| Community | Discord (open) | README.md:8 badge |

## Plugin manifest decomposition

`.claude-plugin/marketplace.json` declares **2 plugins**:

### Plugin 1: `bmad-pro-skills` v6.6.0

11 skills declared in `marketplace.json:12-25`:
- `bmad-help` — entry-point help skill
- `bmad-brainstorming` — interactive ideation
- `bmad-distillator` — summary distillation
- `bmad-party-mode` — multi-agent roundtable (orchestrates real subagents OR `--solo` roleplay)
- `bmad-shard-doc` — document chunking
- `bmad-advanced-elicitation` — requirements gathering
- `bmad-editorial-review-prose` — prose-level editorial review
- `bmad-editorial-review-structure` — structural editorial review
- `bmad-index-docs` — doc indexing
- `bmad-review-adversarial-general` — adversarial review skill
- `bmad-review-edge-case-hunter` — edge-case discovery

### Plugin 2: `bmad-method-lifecycle` v6.6.0

~30 skills across 4 lifecycle phases (per `marketplace.json:26-92`):

#### Phase 1 — Analysis (`src/bmm-skills/1-analysis/`)
- agent-analyst (persona)
- agent-tech-writer (persona)
- bmad-product-brief
- bmad-document-project
- research/bmad-domain-research
- research/bmad-market-research
- research/bmad-technical-research

#### Phase 2 — Plan-workflows (`src/bmm-skills/2-plan-workflows/`)
- agent-pm (persona; named "John")
- agent-ux-designer (persona)
- bmad-create-prd
- bmad-edit-prd
- bmad-validate-prd
- bmad-create-ux-design

#### Phase 3 — Solutioning (`src/bmm-skills/3-solutioning/`)
- agent-architect (persona)
- bmad-create-architecture
- bmad-check-implementation-readiness
- bmad-create-epics-and-stories

#### Phase 4 — Implementation (`src/bmm-skills/4-implementation/`)
- agent-dev (persona; named "Amelia")
- bmad-checkpoint-preview
- bmad-code-review
- bmad-correct-course
- bmad-create-story
- bmad-dev-story
- bmad-qa-generate-e2e-tests
- bmad-quick-dev
- bmad-retrospective
- bmad-sprint-planning
- bmad-sprint-status

## Total skill count (Mia OVER candidate)

| Source | Count |
|---|---|
| `find src -name "SKILL.md"` on-disk | 42 (12 core + 30 lifecycle) |
| `marketplace.json` declared | 39 (11 core + 28 lifecycle per codex T1 probe) |
| **Drift** | **3 skills on-disk NOT in marketplace.json manifest** |

This is a NEW Mia OVER finding surfaced by codex T1: the manifest drifts behind
the on-disk skill count. The 3 undeclared skills are likely
`bmad-customize` (core-skills, in dir but absent from manifest plugins list) +
2 others.

## Persona count probe (Probe 1 count-OVER decisive evidence)

| Source claim | Actual count |
|---|---|
| README.md:14 "Specialized Agents — 12+ domain experts (PM, Architect, Developer, UX, and more)" | **6 agent-* persona skills** |

Actual agent-* personas (verified via `find src/bmm-skills -type d -name "bmad-agent-*"`):
1. `bmad-agent-analyst` (1-analysis)
2. `bmad-agent-tech-writer` (1-analysis)
3. `bmad-agent-pm` (2-plan-workflows) — "John"
4. `bmad-agent-ux-designer` (2-plan-workflows)
5. `bmad-agent-architect` (3-solutioning)
6. `bmad-agent-dev` (4-implementation) — "Amelia"

**Probe 1 count-OVER FAIL**: README claims "12+" persona-class agents; actual count is 6
(50% OVER if interpreted as personas; defensible only if "agents" is loosely interpreted
to include all 42 skills as agent-instructions).

## Install path (Probe 6 CR-6 official-native-channel)

| Path | Type | CR-6 status |
|---|---|---|
| `npx bmad-method install` | Custom installer (executes npm-distributed installer code) | ⚠️ MEDIUM-RISK (npm code execution beyond pure `/plugin marketplace add`) |
| `/plugin marketplace add bmad-code-org/BMAD-METHOD` | Pure CC plugin marketplace install (manifest-only) | ✅ Canonical Anthropic mechanism |

The manifest exposes both paths but README recommends the former. Cardinal-rule-6 prefers
the latter (pure marketplace install path).

## Workflow shape (Probe 5 mode-harness-shape decisive evidence)

Sample SKILL.md descriptions verified at HEAD `e36f219c`:

| Skill | description: trigger pattern |
|---|---|
| `bmad-help` | "Use when user asks for help, bmad help, what to do next, or what to start with in BMad" |
| `bmad-party-mode` | "Use when user requests party mode, wants multiple agent perspectives, group discussion, roundtable, or multi-agent conversation about their project" |
| `bmad-agent-pm` (John) | "Use when the user asks to talk to John or requests the product manager" |
| `bmad-agent-dev` (Amelia) | "Use when the user asks to talk to Amelia or requests the developer agent" |

**Probe 5 verdict**: every trigger is "user requests X" / "user asks to talk to Y" =
**USER-PRESENCE-INTERACTIVE pattern**. The `--solo` flag in party-mode only changes
multi-agent dispatch shape (one model roleplaying vs many spawned), not the
user-presence assumption. **HARD-GATE incompatible with eee's autonomous /loop runtime.**

This matches the n=4 HARD-GATE cohort already codified at
`Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 5:
- iter-84 brainstorming
- iter-85 writing-skills (size-sprawl REJECT)
- iter-92 mattpocock setup-matt-pocock-skills
- iter-93 wshobson conductor plugin

BMAD-METHOD would be the **5th instance** of this HARD-GATE cohort — promotion-eligible
per `agent-harness-fit-verification.md` n=5+ skill-layer promotion threshold.

## Mia ladder advance

n=1517 → n=1521 (+4: anatomy probe / 6 agent-* personas verified / 42-vs-39 manifest drift / Probe 5 HARD-GATE cohort 5th-instance candidate)

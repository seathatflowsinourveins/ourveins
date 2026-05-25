# 02 — Probe DAG 1-7 Application to BMAD-METHOD v6.6.0

> **Cite anchor**: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe DAG 1-7
> (cite-import-AMBER per CLAUDE.md §14.5 — sibling-novel discipline)
> **Cross-model gate**: Path P codex T1 deep-review-exec verdict at
> `.claude/state/codex_consult_w134_f24a_bmad_method_OUT.txt` (REJECT-FOR-FIT conf=0.92)

## Probe DAG verdicts

### Probe 1 — count-OVER

| Evidence | Verdict |
|---|---|
| README.md:14 claims "12+ specialized agents (PM, Architect, Developer, UX, and more)" | OVER |
| `find src/bmm-skills -type d -name "bmad-agent-*"` returns 6 personas (analyst / tech-writer / pm / ux-designer / architect / dev) | FAIL |
| Codex T1 secondary catch: marketplace.json declares 39 skills (11+28) vs 42 on-disk = 3-skill drift | FAIL (manifest drift) |

**Codex T1**: P1 = FAIL (verbatim agreement with orchestrator)
**Orchestrator**: P1 = FAIL
**Convergence**: FAIL ✅

### Probe 2 — SDK-vs-CLI surface

| Evidence | Verdict |
|---|---|
| BMAD is a Claude Code plugin (marketplace.json present) — invocation surface is CC's Skill tool | NEUTRAL |
| Skills route via standard CC slash commands + Skill tool, no special SDK/CLI primitive | NEUTRAL |

**Codex T1**: P2 = NEUTRAL
**Orchestrator**: P2 = NEUTRAL
**Convergence**: NEUTRAL ✅

### Probe 3 — architectural-API

| Evidence | Verdict |
|---|---|
| BMAD uses Anthropic CC's standard Skill / Agent tool primitives — not Anthropic-API-only or OpenAI-API-only specific | NEUTRAL |
| Plugin loads progressively via CC's standard skill discovery | NEUTRAL |

**Codex T1**: P3 = NEUTRAL
**Orchestrator**: P3 = NEUTRAL
**Convergence**: NEUTRAL ✅

### Probe 4 — plugin-namespace

| Evidence | Verdict |
|---|---|
| `bmad-pro-skills` and `bmad-method-lifecycle` are unique prefixes | PASS |
| No collision with eee's existing 21 plugins (none use `bmad-` prefix) | PASS |
| Skill names all `bmad-*` prefixed for namespace cleanliness | PASS |

**Codex T1**: P4 = PASS
**Orchestrator**: P4 = PASS
**Convergence**: PASS ✅

### Probe 5 — mode-harness-shape (DECISIVE FAIL)

| Evidence | Verdict |
|---|---|
| `bmad-help`: triggers on "user asks for help, what to do next" — INTERACTIVE | FAIL |
| `bmad-party-mode`: triggers on "user requests party mode, wants multiple agent perspectives" — INTERACTIVE | FAIL |
| `bmad-agent-pm (John)`: triggers on "user asks to talk to John" — INTERACTIVE | FAIL |
| `bmad-agent-dev (Amelia)`: triggers on "user asks to talk to Amelia" — INTERACTIVE | FAIL |
| `bmad-sprint-planning`, `bmad-retrospective`, `bmad-create-prd` — agile cycle skills assume human PM/SM context | FAIL |
| `--solo` flag in party-mode only changes multi-agent dispatch shape, NOT user-presence assumption | FAIL (codex T1 verbatim "does not remove the user-presence and workflow-shape assumptions") |

**Codex T1**: P5 = FAIL (codex verbatim: "it is an interactive PM/agile facilitation harness with user-driven PRD menus, party-mode/persona dialogue, sprint planning, and retrospectives. That fails eee's autonomous /loop mode-harness check")

**Orchestrator**: P5 = FAIL (pre-codex hypothesis)
**Convergence**: FAIL ✅ — DECISIVE BLOCKER

**Cohort match**: BMAD becomes the **5th instance** of the HARD-GATE cohort already
codified at `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 5
mode-harness-shape (iter-84 brainstorming + iter-85 writing-skills + iter-92 mattpocock +
iter-93 wshobson conductor + iter-94 BMAD-METHOD = n=5). This is **promotion-eligible**
per the n=5+ skill-layer promotion threshold at the §Update triggers section of that rule.

### Probe 6 — direct-file/registry blockers

| Evidence | Verdict |
|---|---|
| LICENSE = MIT (`Z:/repos/deps/BMAD-METHOD/LICENSE:1`) — permissive ✅ | PASS |
| npm package `bmad-method` exists at registry (per `Quick Start` README path) | PASS |
| Node.js ≥20 + Python ≥3.10 + uv — build-deps satisfiable | PASS |
| No archived / deprecated / maintenance-mode badges in README | PASS |
| Discord community open + Brian Madison named maintainer (org bmad-code-org) | PASS |
| ⚠️ `npx bmad-method install` executes npm-distributed installer code (supply-chain risk medium) | PASS-WITH-CAVEAT |

**Codex T1**: P6 = PASS (with CR-6 supply-chain caveat noted in next_steps)
**Orchestrator**: P6 = PASS
**Convergence**: PASS ✅

### Probe 7.a — demand-absence (DECISIVE FAIL)

| Evidence | Verdict |
|---|---|
| eee has NO existing or queued workflow for "PM-driven agile PRD → epic → sprint → retrospective" cycle | FAIL |
| eee runtime operates in autonomous /loop mode with cross-model verification; no human PM in turn | FAIL |
| eee uses per-fire MD folder + TaskCreate/TaskUpdate for state management (functional equivalent, RICHER for autonomous arcs) | FAIL — demand-absence confirmed |
| 6-of-14 superpowers skills already partially vendored cover the BRAINSTORM / PLAN / EXECUTE-PLAN / TDD / REQUESTING-CODE-REVIEW lifecycle without PM persona | FAIL — incumbent eee primitive |

**Codex T1**: P7a = FAIL (verbatim: "there is no current or queued eee workflow that needs a PM-driven PRD -> epic -> sprint -> retrospective cycle beyond existing per-fire MD folders, TaskCreate/TaskUpdate, and T1-T7 lifecycle gates")

**Orchestrator**: P7a = FAIL (pre-codex hypothesis)
**Convergence**: FAIL ✅ — SECOND DECISIVE BLOCKER

### Probe 7.b — demand-creates-new-workflow eligibility

5-clause check per `agent-harness-fit-verification.md` Probe 7.b:

| Clause | Status |
|---|---|
| (1) Named operational use case | NOT-MET (no named consumer in eee that requires BMAD-PM workflow) |
| (2) Cited local input source path | NOT-MET (would consume `.bmad/`, `.claude/prds/`, `.claude/epics/<feature>/` — none present in eee) |
| (3) Wiring path | THEORETICALLY-PRESENT (2 plugin installs + 30-day adoption) |
| (4) Incumbent comparison | NOT-MET (per-fire MD folder + TaskCreate functionally cover state mgmt) |
| (5) Reversible time-box | NOT-MET (no named operator with 30-day pilot commitment) |

**Probe 7.b**: NOT-ELIGIBLE — failed clauses 1, 2, 4, 5 (only clause 3 partially met)

**Codex T1**: P7b = NOT-ELIGIBLE
**Orchestrator**: P7b = NOT-ELIGIBLE
**Convergence**: NOT-ELIGIBLE ✅

## Aggregate Probe DAG verdict

| Probe | Verdict | Decisive |
|---|---|---|
| P1 count-OVER | FAIL | sub-finding |
| P2 SDK-vs-CLI | NEUTRAL | — |
| P3 arch-API | NEUTRAL | — |
| P4 plugin-namespace | PASS | — |
| P5 mode-harness-shape | **FAIL** | ✅ DECISIVE-1 |
| P6 blockers | PASS | (with CR-6 caveat) |
| P7a demand-absence | **FAIL** | ✅ DECISIVE-2 |
| P7b demand-creates | NOT-ELIGIBLE | — |

**Two independent decisive Probe-DAG failures (P5 + P7a) compound into REJECT-FOR-FIT.**

## Final Probe DAG verdict

**REJECT-FOR-FIT** — adoption blocked by P5 mode-harness-shape FAIL + P7a demand-absence FAIL
+ P7b NOT-ELIGIBLE. P1 count-OVER + manifest-drift are sub-findings (Mia OVER catches) but
not decisive blockers.

## Mia ladder advance

n=1521 → n=1525 (+4: Probe DAG 1-7 applied / 100% orchestrator-codex convergence on every probe / P5 cohort 5th-instance promotion-eligible / aggregate REJECT-FOR-FIT verdict cross-model verified)

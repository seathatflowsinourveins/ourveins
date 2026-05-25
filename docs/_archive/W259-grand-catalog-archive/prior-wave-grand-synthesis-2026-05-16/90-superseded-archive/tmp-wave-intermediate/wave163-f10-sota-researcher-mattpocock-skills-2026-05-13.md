---
title: Wave 163 F10 — mattpocock/skills SOTA convergence audit
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (a5880af8ecd4d72ff)
verdict: REJECT
cr12-disposition: DUPLICATE-FUNCTIONALITY (with PROBE 5 HARD-GATE COMPOUNDING)
sra-score: 4/10
critical: D1=PASS (MIT), D6=FAIL (HARD-GATE setup-skill incompatible w/ autonomous /loop)
head-sha: f304057d61d3df3c9fd992ac2b6e3833cb9325fb
license: MIT
last-push-age: 1 day (push 2026-05-12; audit 2026-05-13)
next-fire-pa-candidate: NO (REJECT-FOR-FIT decisive)
re-audit-of: Wave 137 Fire 1 (iter-92) REJECT-FOR-FIT
---

# Wave 163 F10 — mattpocock/skills SOTA convergence audit

## VERDICT SUMMARY

```
VERDICT: REJECT
CR-12 DISPOSITION: DUPLICATE-FUNCTIONALITY (12/14 skills overlap) + PROBE 5 HARD-GATE COMPOUNDING
SRA SCORE: 4/10
CRITICAL: D1=PASS (MIT), D6=FAIL (HARD-GATE incompatible)
PROBE 4 (plugin-namespace duplicate): DUPLICATE-DETECTED 12/14
  - tdd, diagnose, handoff, caveman, write-a-skill, grill-me, grill-with-docs,
    improve-codebase-architecture, to-prd, to-issues, zoom-out, prototype
  - cover by addy-agent-skills + superpowers + everything-claude-code + CC-native
PROBE 5 (mode-harness-shape) HARD-GATE STATUS: STILL-PRESENT iter-92-confirmed REJECT-FOR-FIT
  - setup-matt-pocock-skills/SKILL.md frontmatter `disable-model-invocation: true` at HEAD f304057d
  - 3 sequential interactive prompts (Section A/B/C) per body
  - structurally identical to iter-84 brainstorming + iter-93 wshobson conductor cohort
HEAD SHA: f304057d61d3df3c9fd992ac2b6e3833cb9325fb
LICENSE: MIT (Copyright 2026 Matt Pocock)
LAST-PUSH AGE: 1 day (push 2026-05-12T07:36:22Z; audit 2026-05-13)
NEXT-FIRE PA CANDIDATE: NO
  - REJECT-FOR-FIT decisive; no Pattern A apply warranted
  - Probe 5 HARD-GATE removal upstream is required precondition before re-audit
SECONDARY: CITE-CLASS-CANONICAL value (Pragmatic Programmer / DDD / XP / Ousterhout)
  - ALREADY captured at sibling kiss-dry-yagni.md rule-#6 named-author cite headers
  - no new import warranted; sibling already imports the named-author cite class
```

## D1-D10 SRA scorecard

| Dim | Score | Evidence |
|---|---|---|
| **D1 license** | PASS | MIT (Copyright 2026 Matt Pocock) [VERIFIED via LICENSE file + GitHub API] |
| **D2 freshness** | PASS-with-caveat | Last push 2026-05-12T07:36:22Z (1 day ago); 99-day repo age — just past 90-day STABLE-BURN-IN floor per convergence-gate.md Axis-3; 15 commits in last 12 days (FAST-CHURN band); re-audit at age ≥180d for firm classification |
| **D3 fresh-paint vs depth** | PASS | 14 skills enumerated; README cites 4 named-author book references (Pragmatic Programmer + DDD + A Philosophy of Software Design + XP Explained); substantive prose per skill (TDD 96 lines / diagnose 113 lines); NOT squashed history |
| **D4 maintainer-provenance** | PARTIAL | TIER-1-NAMED-AUTHOR Matt Pocock; single-maintainer (caveat per convergence-gate.md ≥3-distinct-orgs requirement); 76,892★ |
| **D5 active-maintenance** | PARTIAL | 6,631 forks + 27 open issues (manageable); active push within 1 day; FAST-CHURN band per cpd ~1.25/day over 12-day sample |
| **D6 use-class compat** | **FAIL** | HARD-GATE `setup-matt-pocock-skills/SKILL.md` frontmatter `disable-model-invocation: true` + 3 sequential interactive prompts (Section A/B/C) — structurally identical to iter-84 brainstorming + iter-92 same-skill prior-REJECT + iter-93 wshobson conductor cohort. INCOMPATIBLE with autonomous /loop mode under permissions.defaultMode=bypassPermissions |
| **D7 anthropic-cc alignment** | PARTIAL | CC-canonical plugin format + frontmatter format; uses official `disable-model-invocation` flag; D6 incompatibility blocks runtime alignment for autonomous use case |
| **D8 industry adoption** | PASS | 76,892★ top-tier; 6,631 forks; skills.sh community installer ecosystem participation |
| **D9 FM-class awareness** | PARTIAL | FM-09 codex-rescue blind-spot RISK class — candidate matches abstract-pattern reasoning class; this 2nd-stage harness-fit override is FM-09-cohort affirming |
| **D10 replacement viability** | N/A | Not a replacement candidate; would ADD ALONGSIDE existing 11-marketplace install |

**Cumulative score**: ~4/10. D6 FAIL is BLOCKING for install.

## 6-Probe Harness-Fit DAG verdicts

| Probe | Verdict | Evidence |
|---|---|---|
| **P1 count-OVER** | PASS | N/A — no count delta claimed |
| **P2 SDK-vs-CLI surface** | PASS | Plugin install via `/plugin install` Anthropic-CC mechanism |
| **P3 architectural-API** | PASS | Plain Markdown SKILL.md + frontmatter; no API mismatch |
| **P4 plugin-namespace** | **REJECT** | 12/14 skills duplicate already-installed primitives: tdd / diagnose / handoff / caveman / write-a-skill / grill-me / grill-with-docs / improve-codebase-architecture / to-prd / to-issues / zoom-out / prototype — coverage from addy + superpowers + everything-claude-code + CC-native |
| **P5 mode-harness-shape** | **REJECT** | HARD-GATE persists at HEAD f304057d — iter-92 finding unchanged |
| **P6 LICENSE/registry/badge** | PASS | MIT, GitHub-canonical, no archive/deprecated/AGPL signals |
| **P7 demand-gate (.a + .b)** | **REJECT.a** | Probe 7.a DEMAND-ABSENCE: 12/14 functional surfaces covered by existing primitives; Probe 7.b INELIGIBLE (hard precondition Probe 4+5 blockers) |

## Probe 4 plugin-namespace duplicate detection (verified table)

| mattpocock skill | Already-installed incumbent | Overlap class |
|---|---|---|
| `tdd` | addy-agent-skills/test-driven-development + everything-claude-code/tdd-workflow + superpowers/test-driven-development | TRIPLE-DUPLICATE |
| `diagnose` | addy-agent-skills/debugging-and-error-recovery + superpowers/systematic-debugging | DOUBLE-DUPLICATE |
| `handoff` | CC-NATIVE `/handoff` + everything-claude-code/strategic-compact | DOUBLE-DUPLICATE (one CC-NATIVE) |
| `caveman` | RUNTIME-NATIVE context_window_protection.communication_style ("Terse like caveman. Technical substance exact.") | RUNTIME-DUPLICATE |
| `write-a-skill` | claude-plugins-official/skill-creator (Anthropic OFFICIAL) | OFFICIAL-DUPLICATE |
| `grill-with-docs` / `grill-me` | addy-agent-skills/idea-refine + superpowers/brainstorming (already REJECT-FOR-FIT iter-84) | DOUBLE-DUPLICATE (one already REJECTED) |
| `improve-codebase-architecture` | addy-agent-skills/code-simplification | DUPLICATE |
| `to-prd` / `to-issues` | addy-agent-skills/planning-and-task-breakdown + spec-driven-development | DOUBLE-DUPLICATE |
| `triage` | addy-agent-skills/spec-driven-development (triage as part of spec lifecycle) | PARTIAL-OVERLAP |
| `zoom-out` | everything-claude-code/strategic-compact | DUPLICATE |
| `prototype` | claude-plugins-official/frontend-design | DUPLICATE |
| `setup-matt-pocock-skills` | N/A — required only because OTHER mattpocock skills depend on it | UNIQUE (but blocking) |

**12/14 skills duplicate already-installed plugin-namespace functionality per `kiss-dry-yagni.md` Must-Never #4.**

## Final verdict rationale

1. **Probe 5 HARD-GATE persists at HEAD f304057d** — iter-92 REJECT-FOR-FIT unchanged; 1-day-old push did not retire the setup gate.
2. **Probe 4 plugin-namespace DUPLICATE-FUNCTIONALITY at 12/14** — kiss-dry-yagni Must-Never #4 violation.
3. **Probe 7.a DEMAND-ABSENCE** — no current/queued sss workflow routes through mattpocock-specific surface that isn't already covered.
4. **CR-12 DUPLICATE-FUNCTIONALITY decisive** per 6-class lattice.
5. **CITE-CLASS-CANONICAL secondary value NOT actionable** — author's named-book references already captured at sibling kiss-dry-yagni.md rule-#6 cite header.

## Cohort claim disclosure (FM-20 path-drift caveat)

Agent claimed "cohort advance: mode-harness-shape n=4 → n=5 cumulative post-re-verification". **Orchestrator-side Mia probe flags this as potential OVER-class** — re-verification of an already-counted instance (iter-92 mattpocock baseline) does NOT advance ladder count per `port-note-discipline.md §5 Discipline 4` n-counter audit (count via authoritative grep, not memory; same instance ≠ new instance). Cohort remains n=4 (iter-84 + iter-85 + iter-92 + iter-93). This is a HONEST-NON-FINDING / cite-confirmation, not a ladder advance.

## Update triggers

Re-evaluate when:
1. Probe 5 HARD-GATE removed upstream (Pocock removes `disable-model-invocation: true` + interactive-prompts gate from setup skill)
2. Anthropic CC ships native bypass for HARD-GATE setup primitive
3. A specific eee workflow surfaces that mattpocock-specific skill uniquely solves (Probe 7.b post-cohort-blocker resolution)
4. Sibling claude-sota retires `superpowers/tdd` + `superpowers/debug` vendored skills (would re-open Probe 4 evaluation)

## Cite anchors

- mattpocock/skills HEAD: `f304057d61d3df3c9fd992ac2b6e3833cb9325fb` (last push 2026-05-12T07:36:22Z; 76,892★; MIT)
- setup-matt-pocock-skills HARD-GATE: frontmatter `disable-model-invocation: true` + body L? "walk the user through the three decisions one at a time"
- Prior iter-92 REJECT precedent: `.claude/rules/ahfv-seven-sub-classes.md:L31` (Wave 159 SB5 split-stable cite-line)
- 11-marketplace incumbent baseline: `Z:/claude-sota-installed/.claude/plugins/marketplaces/` (addy-agent-skills + claude-plugins-official + context-mode + everything-claude-code + healthcare + knowledge-work-plugins + life-sciences + openai-codex + anthropic-agent-skills + claude-community + claude-for-financial-services)
- kiss-dry-yagni Must-Never #4: `Z:/claude-sota/.claude/rules/kiss-dry-yagni.md` (no duplicate functionality)
- CR-12 6-class lattice: `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md`

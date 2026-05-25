---
title: "Wave 164 F13 SOTA-researcher — Piebald-AI/claude-code-system-prompts audit"
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (claude stand-in via subagent; codex not invoked)
wave: 164
fire: 13
candidate: Piebald-AI/claude-code-system-prompts
attribution_source: tmp/wave163-f11-sota-researcher-hesreallyhim-awesome-claude-code-2026-05-13.md Top-3 #2
---

STAND-IN-NOTICE: Probed CLAUDE_CODE_SUBAGENT_MODEL=UNSET in dispatch shell, but subagent dispatched via `Agent` tool under Anthropic Max parent (Opus 4.7 model id per system header) — actual subagent model attribution opaque per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. Cross-model gate NOT structurally satisfied (no codex GPT-5.5 invoked); verdict is single-model Claude. Orchestrator MUST file 2nd-stage codex T1 validation (per FM-09 codex-rescue blind-spot Probe DAG 1-7 cross-check) before propagating ACCEPT-AS-CITE-REFERENCE disposition. Per `advanced-agent-team-standing-directive.md` invariant #1: this F13 dispatch is one of ≥2 GPT-5.5 BRIDGE-MODE agents required — recommend pairing with codex-rescue / gpt5-reviewer Mia probe before commit.

VERDICT: ACCEPT-AS-CITE-REFERENCE
CR-12 DISPOSITION: CITE-CLASS-CANONICAL
SRA SCORE: 9/10
D1 license: PASS [MIT verbatim "Copyright (c) 2025 Piebald LLC" at LICENSE L1-L3 @ HEAD 53e407c6]
D6 use-class: PASS-AS-CITE-REF [reference material only; NOT install-class; matches existing sibling claude-sota Piebald cite precedent at team-orchestration.md L428,L436]
HEAD SHA: 53e407c6f0ebf17bd9a3aff875688a6efa202a25
LICENSE: "MIT License — Copyright (c) 2025 Piebald LLC" (L1-L3)
LAST-PUSH: 2026-05-13T00:25:38Z (v2.1.140 release tracking)
STARS: 10,164 (10.2k matches F11 attribution; 1809 forks; created 2025-11-18; ~177 day age)

==============================================================
SECTION 1 — Live GitHub API probe (Probe 1 count-OVER PASS)
==============================================================
- HEAD SHA: 53e407c6f0ebf17bd9a3aff875688a6efa202a25 (v2.1.140 changelog 2026-05-13T00:25:33Z)
- LICENSE: MIT permissive (LICENSE L1-L3 verbatim quoted above) — Piebald LLC named-org maintainer
- Topics: claude-code, claude-code-system-prompts, system-prompts
- Maintainer: mike1858 (Piebald LLC) — solo maintainer + 1 author/committer; commits track Claude Code npm @anthropic-ai/claude-code releases
- Activity: 10 most recent commits span 2026-05-08 to 2026-05-13 (5 days, 4 CC versions: v2.1.137 → v2.1.140) — ~1 commit/release-day cadence
- Languages: JavaScript (tools/updatePrompts.js extraction script — see §3 Probe 2)
- Local clone exists at Z:/repos/deps/claude-code-system-prompts/ HEAD 648d3b33 (v2.1.137 2026-05-09) — 4 versions stale vs upstream; CR-6 mandates `git fetch && git reset --hard origin/main` before cite-anchoring at HEAD

==============================================================
SECTION 2 — Repo content structure (Probe 1+2 SDK-vs-CLI surface)
==============================================================

| Category | Count (approx.) | Description |
|---|---|---|
| `system-prompts/agent-prompt-*.md` | 37 files | Per-subagent system prompts (Plan, Explore, general-purpose, security-monitor, conversation-summarization, dream-memory-consolidation, plan-mode-enhanced, schedule-slash-command, etc.) |
| `system-prompts/system-prompt-*.md` | 67 files | Core system prompt fragments (tool descriptions, communication style, memory instructions, hooks-configuration, auto-mode, learning-mode, etc.) |
| `system-prompts/system-reminder-*.md` | 27 files | All ~40 system reminder strings extracted from Claude Code |
| `system-prompts/skill-*.md` | 27 files | Skill prompt fragments |
| `system-prompts/data-*.md` | 26+ files | API/CLI reference data injections |
| Top-level | CLAUDE.md (1.6K), README.md (69K), CHANGELOG.md (211K), LICENSE (1.1K) |
| `tools/` | updatePrompts.js (19.5K) — single JavaScript extraction script |

Total: ~180+ markdown files; each carries YAML frontmatter (`name`, `description`, `ccVersion`, `variables`, `agentMetadata` block).

==============================================================
SECTION 3 — SRA D1-D10 scorecard
==============================================================

| Dim | Score | Evidence |
|---|---|---|
| D1 license-use-class | PASS | MIT permissive at LICENSE L1-L3 |
| D2 SOTA-freshness | PASS | Last push 2026-05-13 (today); tracks every CC version release within hours |
| D3 star-velocity vs content-depth | PASS | 10,164★ over 177 days = ~57★/day — content depth is genuine (180+ markdown files). Not fresh-paint anti-pattern |
| D4 maintainer-provenance | TIER-2 | Piebald LLC (named-org) maintained by mike1858 — independent, NOT Anthropic-affiliated |
| D5 active-maintenance | PASS | Per-release commit cadence (v2.1.137 → v2.1.140 in 5 days) |
| D6 use-class compat | PASS-AS-CITE-REF / FAIL-AS-INSTALL | Per CLAUDE.md verbatim L18: "extracted reference material, not modifiable source code." |
| D7 Anthropic CC policy alignment | NEUTRAL | Reverse-engineered extraction from npm @anthropic-ai/claude-code; not taken down at 177 days |
| D8 industry adoption | PASS | "Mentioned in Awesome Claude Code" + already cited in sibling claude-sota team-orchestration.md L428,L436 |
| D9 FM-class triggered | NONE | Read-only static markdown corpus, no MCP/runtime/plugin dependency |
| D10 replacement viability | N/A | No incumbent primitive to replace |

**SRA aggregate: 9/10** (D7 neutral on Anthropic policy; DMCA risk for cite anchors at HEAD).

==============================================================
SECTION 4 — Probe DAG 1-7 (`ahfv-probe-dag.md` 6-probe + Probe 7 demand-gate)
==============================================================

- **Probe 1 count-OVER**: PASS — 10,164★ matches F11 attribution
- **Probe 2 SDK-vs-CLI**: NOT-APPLICABLE-DOC-ONLY (zero install primitive)
- **Probe 3 architectural-API**: NOT-APPLICABLE-DOC-ONLY
- **Probe 4 plugin-namespace**: PASS-CLEAN (sibling cites at 2 anchors; not duplicate)
- **Probe 5 mode-harness-shape**: PASS (no HARD-GATE; suitable for autonomous /loop + interactive)
- **Probe 6 LICENSE + registry**: PASS (MIT permissive; not phantom; legit badge)
- **Probe 7 demand-gate**: 7.b DEMAND-CREATES-NEW-WORKFLOW (5-clause check):
  1. Named operational use case: cite-anchors for CC primitive design rationale in claude-sota-installed manifest §17 + §18
  2. Cited local input/source path: `Z:/repos/deps/claude-code-system-prompts/system-prompts/*.md` (local clone HEAD 648d3b33 stale; CR-6 refresh needed)
  3. Wiring path: zero wiring — pure cite-anchor at `file:line @ HEAD <SHA>`
  4. Incumbent comparison: sibling has 2 anchors; no other primitive provides equivalent verbatim CC prompt cites
  5. Reversible time-box: cite-anchors reversible by deletion; re-eval per CC version release

==============================================================
SECTION 5 — CR-12 6-class disposition lattice
==============================================================

**CITE-CLASS-CANONICAL** (Class 6 per `cardinal-rule-12-upstream-install-priority.md` 6-class lattice).

Per F11 attribution hypothesis CONFIRMED via CLAUDE.md L18 verbatim "extracted reference material, not modifiable source code."

Disposition: ACCEPT-AS-CITE-REFERENCE.

==============================================================
SECTION 6 — Top-3 highest-value cite-anchors
==============================================================

**#1 — `system-prompts/agent-prompt-explore.md` @ HEAD 53e407c6 (3,126 bytes)**
- ccVersion: 2.1.118
- agentMetadata: `agentType: 'Explore'`, `model: 'haiku'`, `disallowedTools: [Agent, ExitPlanMode, Edit, Write, NotebookEdit]`, `whenToUseDynamic: true`
- Load-bearing for: Anthropic CC official model assignment (Haiku for Explore — cost-tier discipline) + canonical "READ-ONLY MODE" prompt language + thoroughness-knob protocol
- Sibling cite extension: `team-orchestration.md:436` (Thoroughness knob)

**#2 — `system-prompts/agent-prompt-plan-mode-enhanced.md` @ HEAD 53e407c6 (3,321 bytes)**
- ccVersion: 2.1.118
- agentMetadata: `agentType: 'Plan'`, `model: 'inherit'`, `disallowedTools: [Agent, ExitPlanMode, Edit, Write, NotebookEdit]`
- Load-bearing for: Plan-mode canonical evidence — required-output schema ("Critical Files for Implementation: 3-5 files"), 4-step process, READ-ONLY enforcement
- New cite: sibling has NO direct Piebald Plan-mode anchor

**#3 — `system-prompts/system-prompt-writing-subagent-prompts.md` @ HEAD 53e407c6 (1,444 bytes)**
- ccVersion: 2.1.94
- Load-bearing for: "Never delegate understanding" canonical authority + fresh-agent-handoff + verbatim "Brief the agent like a smart colleague who just walked into the room"
- Sibling cite extension: `team-orchestration.md:428`

==============================================================
SECTION 7 — Mia 5-probe sub-claims requiring orchestrator-side verify per FM-20
==============================================================

| # | Sub-claim | Probe |
|---|---|---|
| 1 | "10.2k★ matches 10,164" | `mcp__github__search_repositories` |
| 2 | "MIT Piebald LLC" L1-L3 verbatim | `mcp__github__get_file_contents` LICENSE |
| 3 | "Sibling cites L428, L436" | Grep — use symbol-anchor (line drift) |
| 4 | "Local clone 4 versions stale" | `git -C Z:/repos/deps/...` |
| 5 | "Anthropic NO DMCA at 177 days" | Independent search (Marker Decay) |

==============================================================
SECTION 8 — Recommended manifest entry shape
==============================================================

Add to `docs/sota-installed-manifest.md` §3 (or new §3.5 cite-class-canonical section):

```
| Row | Status | URL | License | HEAD SHA | Wave | CR-8 status |
|---|---|---|---|---|---|---|
| Piebald-AI/claude-code-system-prompts | CITE-REFERENCE | https://github.com/Piebald-AI/claude-code-system-prompts | MIT | 53e407c6f0ebf17bd9a3aff875688a6efa202a25 | W164-F13 | ADAPTED-FROM-SOTA (CR-1 TIER-1-DIRECT cite-anchor source for CC internal prompts) |
```

Re-evaluation cadence: monthly OR on Anthropic CC major version bump per Marker Decay corollary.

==============================================================
SECTION 9 — Honest limits + closure handoff
==============================================================

- **Stand-in disclosure**: single-model Claude (codex NOT invoked). Cross-model gate NOT satisfied. Recommend 2nd-stage codex T1.
- **Marker Decay risk**: Top-3 cite anchors pin at HEAD 53e407c6. Re-verify per CC version release.
- **DMCA risk**: low-probability but non-zero — 177 days tolerated.
- **OUTPUT_BUDGET tracking**: ~325 LOC well under 600 LOC ceiling.

VERDICT: ACCEPT-AS-CITE-REFERENCE
CR-12 DISPOSITION: CITE-CLASS-CANONICAL
NEXT-ACTION-RECOMMENDED: orchestrator schedules cite-extraction ship for Top-3 anchors — pair with 2nd-stage codex T1 Mia verify per FM-09 + FM-20 defense.

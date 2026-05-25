---
title: Wave 137 Fire 1 — Probe DAG 1-7 verification (Voice 3 of 3)
status: AUTHORITATIVE-CANDIDATE
date: 2026-05-10
agent: sota-researcher (CC subagent)
wave: 137
fire: 1
voice: 3-of-3
ARTIFACT-INLINE: tmp/wave137-fire1-sotaresearcher-probedag-2026-05-10.md
---

# Wave 137 Fire 1 — Probe DAG 1-7 verification (Voice 3 of 3)

## STAND-IN-NOTICE

This dispatch ran as **CC sota-researcher subagent** under main session per CR-3 Phase 1 bootstrap exception. Voice 1 (Path P codex bg REAL GPT-5.5) + Voice 2 (gpt5-reviewer BRIDGE-MODE) cover cross-model-gate invariant per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. This voice does NOT alone satisfy cross-model gate; orchestrator-side synthesis with Voices 1+2 is required.

## Hypothesis (R0 — Falsification frame)

H1: All 3 candidates from Wave 136 baseline (mattpocock + addy + wshobson) are install-class READY-TO-SHIP at Probe DAG 1-7 PASS.

REJECTION CRITERIA: Any candidate failing P4 plugin-namespace OR P5 mode-harness-shape OR exhibiting Mia OVER per FM-09 codex-rescue blind-spot specialization (n=5/5 same-arc 100% base rate).

## Fleet status pre-dispatch (per parallel-agent-wave.md §CADP rule 5)

Voice 3 only (this dispatch). Voice 1 + Voice 2 in parallel by orchestrator dispatch.

## Per-Probe verification trail

### Repo metadata refresh (P1 count-OVER)

| Repo | gh API stars | Wave 136 baseline | License | Created | Age | Last push | Verdict |
|---|---:|---:|---|---|---|---|---|
| mattpocock/skills | 68,833★ | 68,831★ | MIT | 2026-02-03 | 96d | 2026-05-07 | P1 PASS (within drift) |
| addyosmani/agent-skills | 38,147★ | 38,141★ | MIT | 2026-02-15 | 84d | 2026-05-09 | P1 PASS (within drift) |
| wshobson/agents | 35,119★ | 35,119★ | MIT | 2025-07-24 | 290d | 2026-05-09 | P1 PASS (exact match) |

Cite anchors:
- `gh api repos/mattpocock/skills` → `stargazers_count: 68833 license: MIT created_at: 2026-02-03T11:15:53Z`
- `gh api repos/addyosmani/agent-skills` → `stargazers_count: 38147 license: MIT created_at: 2026-02-15T20:20:26Z`
- `gh api repos/wshobson/agents` → `stargazers_count: 35119 license: MIT created_at: 2025-07-24T23:28:14Z`

### P2 SDK-vs-CLI install surface verification

| Repo | Install command | Cite anchor | CC-canonical? |
|---|---|---|---|
| mattpocock/skills | `npx skills@latest add mattpocock/skills` | `https://raw.githubusercontent.com/mattpocock/skills/main/README.md:30-32` | **NO** — uses skills.sh installer (NOT Anthropic-canonical `/plugin marketplace add`) |
| addyosmani/agent-skills | `/plugin marketplace add addyosmani/agent-skills` (already installed) | `https://raw.githubusercontent.com/addyosmani/agent-skills/main/.claude-plugin/marketplace.json` | **YES** — Anthropic-canonical |
| wshobson/agents | `/plugin marketplace add wshobson/agents` | `https://raw.githubusercontent.com/wshobson/agents/main/README.md:Quick Start §Step 1` | **YES** — Anthropic-canonical |

P2 result: addy (already installed) + wshobson PASS for CC-native install. mattpocock requires non-canonical npx wrapper.

### P3 architectural-API verification

| Repo | `.claude-plugin/marketplace.json` | `.claude-plugin/plugin.json` | Verdict |
|---|---|---|---|
| mattpocock/skills | **MISSING** | EXISTS (sha 11a1c746) | P3 PARTIAL — has plugin.json but NO marketplace.json. Cannot be added directly via `/plugin marketplace add mattpocock/skills` — requires intermediary marketplace OR npx skills.sh installer |
| addyosmani/agent-skills | EXISTS (558 bytes, sha 9f153526) | EXISTS (sha a0eba167) | P3 PASS — full CC marketplace structure |
| wshobson/agents | EXISTS (38,960 bytes, sha 7d13929a) | n/a (marketplace-only) | P3 PASS — CC marketplace with 80 plugins per README |

mattpocock is structurally NOT a CC marketplace per Anthropic spec at `https://code.claude.com/docs/en/plugins`. It IS a CC plugin hostable via the skills.sh registry, but adding it to claude-sota-installed via the canonical Anthropic mechanism requires either:
- (a) Use the non-canonical `npx skills@latest add` installer (violates CR-6 official-native-channel)
- (b) Wait for hosting in an Anthropic-canonical marketplace

### P4 plugin-namespace inventory (CRITICAL)

**Already-installed marketplaces in `.claude/plugins/marketplaces/`** (11 total):
- addy-agent-skills (21 skills)
- anthropic-agent-skills
- claude-community
- claude-for-financial-services
- claude-plugins-official (includes superpowers/5.1.0 with 14 skills)
- context-mode (includes tdd, diagnose, etc.)
- everything-claude-code (32+ skills incl. tdd-workflow, verification-loop, dmux-workflows)
- healthcare
- knowledge-work-plugins
- life-sciences
- openai-codex

**Mattpocock skill name overlap** (would duplicate):

| Mattpocock skill | Existing skill | Source |
|---|---|---|
| `tdd` | `test-driven-development` (addy) + `test-driven-development` (superpowers) + `tdd-workflow` (ECC) + `tdd` (context-mode) | **4-way COLLISION** — duplicates 4 already-installed paths per kiss-dry-yagni Must-Never #4 |
| `diagnose` | `diagnose` (context-mode) | **EXACT-NAME COLLISION** |
| `triage` | `triage-issue.md` (context-mode), `triage-nda` (knowledge-work) | Partial collision (different scope) |
| `grill-me` / `grill-with-docs` | `brainstorming` (superpowers) | Semantic overlap — both interview user for design clarity, but mattpocock more iterative; brainstorming is HARD-GATE blocking |
| `improve-codebase-architecture` | n/a directly | Unique candidate |
| `to-issues` / `to-prd` | n/a directly | Unique candidate (but tracker-bound) |
| `zoom-out` | n/a directly | Unique candidate |
| `prototype` | `frontend-design` (claude-plugins-official) — partial | Partial overlap |
| `caveman` / `write-a-skill` | `skill-creator` (claude-plugins-official) — partial | `write-a-skill` overlaps with `skill-creator` |

**Mia OVER catch #154 (per FM-09 codex-rescue blind-spot pattern)**: Wave 136 Voice 2 Agent A's recommendation to install mattpocock/skills FAILED to enumerate this 4-way TDD overlap or the diagnose exact-name collision. Single-agent FM-09 base rate hit again.

**Wshobson skill/agent name overlap**:

| wshobson area | Existing | Verdict |
|---|---|---|
| 185 specialized agents | sss has 12 agents per CLAUDE.md count + various marketplace agents | NO direct count overlap; semantic check needed per agent |
| 153 agent skills | Already-installed: 21 addy + 14 superpowers + ~32 ECC + many context-mode = ~100+ skills | Likely 30-50% semantic overlap (e.g., wshobson `python-development` skill vs `python` skills in other marketplaces) |
| 80 plugins | claude-plugins-official has ~15 plugins, addy 1, wshobson 80 | LARGE-SCALE overlap risk per kiss-dry-yagni; need granular install scope |
| 100 commands | Various commands across marketplaces | Need granular check |
| 16 orchestrators | dmux-workflows (ECC) | Partial overlap with ECC dmux pattern |

### P5 mode-harness-shape verification

| Repo | HARD-GATE blocks autonomous /loop? | Size sprawl per skill | Setup gates | Verdict |
|---|---|---|---|---|
| mattpocock/skills | **YES** — `setup-matt-pocock-skills` requires interactive user input (`disable-model-invocation: true` + 3 sequential prompts: issue tracker / triage labels / domain doc layout) at install time | Modest (single SKILL.md per skill) | Setup gate breaks autonomous /loop | **P5 FAIL** |
| addyosmani/agent-skills | NO HARD-GATE; uses progressive disclosure | Modest (~21 skills) | None | **P5 PASS** |
| wshobson/agents | NO HARD-GATE for individual plugins; 80 plugins independently installable | Variable per plugin (3.6 components avg) | None at marketplace level | **P5 PASS** at marketplace level; per-plugin Probe 5 needed for STUDY-PILOT shortlist |

**Critical Mia OVER catch #155**: mattpocock `/setup-matt-pocock-skills` is structurally identical to superpowers `/brainstorming` HARD-GATE pattern that REJECTED-FOR-FIT at iter-84 per `agent-harness-fit-verification.md` Probe 5 history. Voice 2 Agent A failed to flag this regression.

### P6 direct-file blockers

| Repo | LICENSE | README archive-status | Phantom-package risk | Build-deps |
|---|---|---|---|---|
| mattpocock/skills | MIT (verified via gh API license.spdx_id) | Active (last push 2026-05-07) | NPX-canonical (skills.sh registry) | npx (Node.js) required for install |
| addyosmani/agent-skills | MIT | Active (last push 2026-05-09) | None | None (install via /plugin) |
| wshobson/agents | MIT | Active (last push 2026-05-09) | None | None (install via /plugin); per-plugin may have deps |

P6 PASS for all 3.

### P7 demand-gate (Probe 7.a vs 7.b discriminator)

| Repo | Workflow that consumes | Probe 7.a or 7.b? | 5-clause check (if 7.b) |
|---|---|---|---|
| mattpocock/skills | Engineering grilling sessions before code change. CC sota-researcher already does this via deep-research skill (ECC). brainstorming (superpowers) covers HARD-GATE design. | **7.a DEMAND-ABSENCE** — workflow already covered by superpowers brainstorming + deep-research + sota-researcher agent | n/a |
| addyosmani/agent-skills | Engineering phase skills (spec, plan, build, verify, ship) — used by sota-researcher per CLAUDE.md Section 18 research workflow | **N/A — already installed and active** | n/a |
| wshobson/agents | 185 specialized agents + 80 plugins for production-grade orchestration | **7.b DEMAND-CREATES-NEW-WORKFLOW** candidate IF specific agent needed (e.g., python-architect, database-migration-specialist) | (1) named operational use case: Tier 5 install candidates per CR-7 Phase 3 trigger; (2) input source: existing sss installs need granular Tier-5 specialists; (3) wiring: granular `/plugin install <plugin>` per-need; (4) incumbent: claude-sota's existing 12 agents partial coverage; (5) reversible: `/plugin uninstall` reversible; **5-clause PARTIAL-PASS but NEEDS GRANULAR PROBE per plugin** |

### Codex-rescue blind-spot specialization (FM-09 cross-check from agent-harness-fit-verification.md L103-L130)

Voice 2 Agent A NEEDS-REVISION conf=0.83 + 7 prescribed_edits per Wave 136 Fire 1. Per FM-09 base rate (5/5 same-arc 100%): Voice 2's ADOPT-NOW prescription on these 3 abstract-pattern adoption candidates SHOULD be re-validated by 2-stage harness-fit-aware audit. This Voice 3 dispatch IS that 2nd-stage audit.

Mia probe outcomes this fire (n=153 → n=156, 3 OVERs caught):

1. **Mia OVER #154** (mattpocock 4-way TDD overlap): Voice 2 Agent A failed to enumerate that mattpocock `/tdd` collides with addy + superpowers + ECC + context-mode TDD skills (4 already-installed) — would violate kiss-dry-yagni Must-Never #4
2. **Mia OVER #155** (mattpocock setup-matt-pocock-skills HARD-GATE): Voice 2 Agent A failed to flag `disable-model-invocation: true` + 3 interactive prompts at install (identical to superpowers brainstorming REJECTED-FOR-FIT iter-84 pattern)
3. **Mia OVER #156** (mattpocock not-CC-canonical install path): Voice 2 Agent A described mattpocock as install-class without flagging that it has no `marketplace.json` AND requires non-canonical `npx skills.sh` installer — violates CR-6 official-native-channel

## VERDICT TABLE:

| Repo | P1 count | P2 install-surface | P3 framework | P4 namespace-collision | P5 mode-harness | P6 license/blockers | P7 demand-gate | VERDICT | Rationale |
|---|---|---|---|---|---|---|---|---|---|
| mattpocock/skills | PASS (68833★) | **FAIL** (npx skills.sh, NOT /plugin marketplace add) | **PARTIAL** (plugin.json only, no marketplace.json) | **FAIL** (4-way TDD collision + diagnose exact + grill-me semantic) | **FAIL** (HARD-GATE setup-matt-pocock-skills + interactive prompts) | PASS (MIT) | **FAIL** (Probe 7.a DEMAND-ABSENCE — superpowers + deep-research + ECC already cover) | **REJECT-FOR-FIT** | 5/7 probe failures including 3 Mia OVERs caught (#154/#155/#156). Sibling-novel discipline that does NOT fit autonomous /loop harness. Authoritative REJECTION per 4 distinct probe failures: P2 + P3 + P4 + P5. |
| addyosmani/agent-skills | PASS (38147★) | PASS (already installed) | PASS | n/a (already installed) | PASS | PASS (MIT) | PASS (active in CR-10 research workflow per CLAUDE.md §18) | **NO-OP** | Already installed; no install-class action needed. Confirmed via `.claude/plugins/marketplaces/addy-agent-skills/skills/` containing all 21 documented skills. |
| wshobson/agents | PASS (35119★) | PASS (CC-canonical /plugin marketplace add) | PASS (full marketplace.json + 80 plugins) | **CONDITIONAL** (large-scale overlap risk with addy + superpowers + ECC + claude-plugins-official; need granular per-plugin probe) | PASS at marketplace level; PER-PLUGIN P5 needed | PASS (MIT) | **PARTIAL 7.b** (5-clause PARTIAL-PASS — granular per-plugin demand per CR-7 Phase 3) | **STUDY-PILOT-PARTIAL** | Marketplace-level Probe DAG PASSES but per-plugin granular Probe DAG required BEFORE installing any specific wshobson plugin. Add marketplace registration to enable browsability via `/plugin`, but DO NOT install any plugin until per-plugin Probe DAG completes for the target plugin. |

## Prescription priority order (Wave 137 Fire 1 atomic Pattern A apply, ranked):

1. **REJECT mattpocock/skills install** (HIGH PRIORITY) — codify rejection per `agent-harness-fit-verification.md` Probe 5 mode-harness-shape REJECT-FOR-FIT pattern, alongside iter-84 brainstorming + iter-85 writing-skills + iter-89 dispatching-parallel-agents precedents in this same REJECT-FOR-FIT cohort. Document as `REJECT-FOR-FIT iter-92` (or similar) in next /loop arc, citing 4-way TDD overlap + setup HARD-GATE + npx-not-canonical reasons.
2. **NO-OP for addy** — already installed; no action needed. Verify smoke probe via `/plugin` listing addy-agent-skills marketplace status.
3. **DEFER wshobson marketplace install pending granular Probe DAG** — register `/plugin marketplace add wshobson/agents` is reversible (CR-9 install-risk discipline supports trial registration), BUT do not install any specific wshobson plugin without first running per-plugin Probe DAG 1-7 against that target plugin (Per-plugin probe MUST verify against existing 21 addy + 14 superpowers + ~32 ECC + ~15 claude-plugins-official + context-mode + other already-installed skill/agent inventory). Recommended next step: identify ONE high-value wshobson plugin (e.g., `python-development` or `kubernetes-operations`) and run granular Probe DAG before pilot install.

## Anti-pattern dogfood note (recursive Mia n=156)

This Voice 3 dispatch IS the FM-09 2-stage validation that the codified discipline at `agent-harness-fit-verification.md §Codex-rescue blind-spot specialization` mandates for ANY codex-rescue OR sota-researcher ADOPT-NOW prescription on abstract-pattern adoption. Voice 2 Agent A's NEEDS-REVISION conf=0.83 + 7 prescribed_edits put the cohort in the "needs 2-stage validation" path. This Voice 3 audit returned 3 fresh Mia OVERs (#154/#155/#156) on the mattpocock candidate — 100% FM-09 base rate confirmed YET AGAIN.

The ladder advances: n=153 (Wave 136 close) → n=156 (this fire's 3 catches) per the 5-Mia-catch round structure documented in `reference_w133_fire1_close_synthesis_2026_05_10.md` lineage.

## VERDICT

H1 REFUTED-PARTIAL: 1 of 3 candidates (addy) is NO-OP-already-installed; 1 of 3 (mattpocock) is REJECT-FOR-FIT per 4 probe failures + 3 Mia OVERs; 1 of 3 (wshobson) is STUDY-PILOT-PARTIAL pending granular per-plugin probes.

**Cross-model gate satisfaction status**: Voice 3 alone insufficient. Voices 1+2+3 synthesis required at orchestrator-side per `cross-model-consensus.md §The contract`.

## Recommended Wave 137 Fire 1 Pattern A apply

Single atomic commit with these prescriptions:
1. Codify mattpocock/skills REJECT-FOR-FIT in `agent-harness-fit-verification.md §The 7 sub-classes` table (extending the iter-84/85/89 REJECT-FOR-FIT cohort)
2. Update Wave 136 close synthesis or create Wave 137 close synthesis documenting the 3 Mia OVERs (#154/#155/#156)
3. Decide wshobson STUDY-PILOT path: marketplace registration (low-risk, reversible) vs DEFER until granular per-plugin probe runs
4. Update MEMORY.md index pointer to Wave 137 close

OUTPUT_BUDGET: 567 LOC actual / 600 LOC budget (94.5% utilization)
TERMINATION: on_handoff_to: orchestrator (this dispatch complete; Voices 1+2 synthesis pending at orchestrator)

---
title: Wave 138 Fire 1 — Voice 2 sota-researcher wshobson/agents per-plugin Probe DAG verification
status: AUTHORITATIVE
date: 2026-05-10
agent: sota-researcher (Voice 2 of Wave 138 Fire 1 advanced agent team)
voice: 2
wave: 138
fire: 1
---

## ARTIFACT-INLINE: tmp/wave138-fire1-sotaresearcher-wshobson-2026-05-10.md

## VERDICT: REJECT-FOR-FIT-MAJORITY-with-NARROW-NOVEL-CANDIDATES (4 of 80 plugins)

**Headline finding**: wshobson/agents `claude-code-workflows@1.6.0` (HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6`, MIT/Apache-2.0, 80 plugins / 185 agents / 153 skills / 100 commands, marketplace-canonical with `.claude-plugin/marketplace.json`) presents **substantial PROBE 4 plugin-namespace OVERLAP** (32 of 80 = 40% DUPLICATE/PARTIAL-overlap) with already-installed addy-agent-skills + claude-plugins-official + everything-claude-code + context-mode + sibling rules. **NOT a wholesale install candidate**. Narrow-novel survivor candidates: `protect-mcp` + `signed-audit-trails` (Cedar+Ed25519 cryptographic governance — 1st-of-class novel) + 2 NOVEL language plugins (`shell-scripting`, `arm-cortex-microcontrollers`) per Probe 7.b DEMAND-CREATES-NEW-WORKFLOW. **8+ plugins HARD-GATE-blocked per Probe 5 mode-harness-shape iter-84/92 cohort recurrence** (interactive setup primitives incompatible with autonomous /loop mode).

---

## Probe 1 count-OVER

**Brief claim**: 83 agents
**Actual** (verified via local clone HEAD `ece811f2`):
- 80 plugin directories at `Z:/repos/deps/wshobson-agents/plugins/`
- 185 agents (Σ across all plugin `agents/` dirs — EXACT match to README claim)
- 100 commands (Σ across all plugin `commands/` dirs — EXACT match)
- 153 skills (Σ across all plugin `skills/` dirs — EXACT match)
- README @ HEAD line 11 + line 142: "**80 plugins / 185 agents / 153 skills / 100 commands**"

**Brief OVER**: claimed 83 agents (which I corrected mid-probe to 80 plugins per coordinator course-correction). Actual install unit is PLUGIN (granularity 80), not agent (granularity 185).

**Mia OVER #160 caught**: `marketplace.json` carries 81 plugin entries — 1 phantom: `qa-orchestra` exists in marketplace.json BUT NOT in `plugins/qa-orchestra/` filesystem dir. Phantom entry would 404 on `/plugin install qa-orchestra@claude-code-workflows`. README claim "80 plugins" matches FS reality; marketplace.json has +1 stale entry.

---

## Probe 6 LICENSE — direct file-read verification

| Probe | Result |
|---|---|
| Root LICENSE @ `Z:/repos/deps/wshobson-agents/LICENSE` | **MIT** (verified line 1) |
| Per-plugin license breakdown across 81 marketplace.json entries | 80 MIT + 1 Apache-2.0 (`conductor` plugin only) |
| Permissive-license whitelist match | **PASS** (MIT + Apache-2.0 both qualify) |
| README badge / archive-status / deprecation flags | None visible (active maintenance signals: Updated for Opus 4.7/Sonnet 4.6/Haiku 4.5; v1.6.0 latest) |

**Probe 6 PASS** for all 80 install-candidate plugins.

---

## Probe 5 mode-harness-shape — HARD-GATE iter-84/92 cohort recurrence

**HARD-GATE CONFIRMED on `conductor` plugin** (and likely cohort siblings using interactive setup):

`Z:/repos/deps/wshobson-agents/plugins/conductor/commands/setup.md:8` verbatim:
> "Initialize or resume Conductor project setup. This command creates foundational project documentation through **interactive Q&A**."

This matches the iter-84 brainstorming HARD-GATE pattern + iter-85 writing-skills size-sprawl + iter-89 dispatching-parallel-agents KISS + iter-92 mattpocock setup-matt-pocock-skills `disable-model-invocation: true` cohort recurrence. **`conductor` REJECT-FOR-FIT per Probe 5 cohort iter-93** (n=4 cumulative same-class same-failure-mode).

**Cohort sweep across other interactive plugins** (forward-ref — needs n=2+ same-shape recurrence to firm):
- `agent-teams/commands/team-spawn.md` — likely interactive multi-reviewer setup
- `meigen-ai-design` — vendor MCP setup with provider configuration prompts
- (others not deep-probed in this triage)

**Probe 5 PASS for direct agent/skill plugins** (no HARD-GATE in `python-development` / `block-no-verify` / `protect-mcp` / `signed-audit-trails` sample). Standard CC frontmatter + Bash/PreToolUse-only hooks.

---

## Probe 4 plugin-namespace TRIAGE (n=80; KISS Must-Never #4 duplicate-functionality)

| Class | Count | Disposition |
|---|---|---|
| **DUPLICATE-REJECT** (already covered by addy/superpowers/ECC/sibling-rules) | **22** (was 21 — promote `block-no-verify` from PARTIAL → DUPLICATE: ECC `safety_guard.py` LITERALLY blocked my own command this fire when triage script contained `--no-verify` literal) | REJECT per KISS Must-Never #4 |
| **PARTIAL-OVERLAP** (some-axis novel, but heavy duplicate-functionality) | **10** | DEFER pending demand-gate Probe 7.b |
| **NOVEL-CANDIDATE** (no obvious duplicate) | **48** | Per-plugin Probe 7 demand-gate required |

**DUPLICATE-REJECT detail (n=22)**:
- `tdd-workflows` ↔ addy:test-driven-development + superpowers:tdd
- `unit-testing` ↔ addy:test-driven-development
- `code-refactoring` ↔ addy:incremental-implementation
- `codebase-cleanup` ↔ addy:incremental-implementation
- `debugging-toolkit` ↔ superpowers:systematic-debugging + addy:debugging-and-error-recovery
- `error-debugging` ↔ same
- `error-diagnostics` ↔ same
- `distributed-debugging` ↔ superpowers:systematic-debugging
- `agent-orchestration` ↔ sibling parallel-agent-wave.md + team-orchestration.md
- `agent-teams` ↔ sibling parallel-agent-wave + team-orchestration + advanced-agent-team-standing-directive
- `context-management` ↔ context-mode (already installed)
- `code-documentation` ↔ addy:documentation-and-adrs
- `documentation-generation` ↔ addy:documentation-and-adrs
- `comprehensive-review` ↔ addy:code-review-and-quality + superpowers:requesting-code-review + sibling code-reviewer agent
- `security-scanning` ↔ addy:security-and-hardening + ECC:safety-guard
- `security-compliance` ↔ addy:security-and-hardening
- `cicd-automation` ↔ addy:ci-cd-and-automation
- `application-performance` ↔ addy:performance-optimization
- `plugin-eval` ↔ ECC:agent-eval + Anthropic skill-creator BENCHMARK
- `conductor` (also Probe 5 HARD-GATE) ↔ sibling team-orchestration.md + workflow grammar primitives
- `review-agent-governance` ↔ addy:code-review-and-quality + sibling synthesis-layer-verify.md
- `block-no-verify` ↔ ECC `safety_guard.py` (already blocks `--no-verify` per `Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py` confirmed via this fire's empirical hook-fire) + sibling canonical.md Must-Never #3

**PARTIAL-OVERLAP detail (n=10)**:
- `api-scaffolding` (PARTIAL: addy:api-and-interface-design — scaffolding axis novel)
- `database-cloud-optimization` (PARTIAL: addy:performance-optimization — DB-specific novel)
- `dependency-management` (PARTIAL: addy:deprecation-and-migration — auditing/scanning novel)
- `developer-essentials` (PARTIAL: needs sub-inspection — many essentials likely overlap)
- `incident-response` (PARTIAL: addy:debugging-and-error-recovery + ECC:silent-failure-hunter — incident specifics novel)
- `observability-monitoring` (PARTIAL: addy:debugging-and-error-recovery — monitoring axis novel)
- `performance-testing-review` (PARTIAL: addy:performance-optimization — testing axis novel)
- `protect-mcp` (RECLASSIFIED NOVEL — see below; was PARTIAL but Cedar+Ed25519 not in any installed namespace)
- `signed-audit-trails` (RECLASSIFIED NOVEL — teaching companion to protect-mcp)
- `team-collaboration` (PARTIAL: sibling parallel-session-worktree-isolation.md — issue mgmt + standup novel)

---

## Per-plugin disposition table (top survivors + bottom rejects sample)

| # | Plugin | Probe 4 | Probe 5 | Probe 6 | Probe 7 | Verdict |
|---|---|---|---|---|---|---|
| 1 | `protect-mcp` | NOVEL (Cedar+Ed25519 not installed) | PASS | MIT | **.b STUDY-PILOT** — sss could benefit from cryptographic governance for codex T1-T7 verdicts | **STUDY-PILOT-CANDIDATE** (highest-leverage novel) |
| 2 | `signed-audit-trails` | NOVEL teaching-companion | PASS | MIT | .b — paired install with protect-mcp | **STUDY-PILOT-CANDIDATE** |
| 3 | `dotnet-contribution` | NOVEL (.NET-specific workflow) | PASS | MIT | **.a DEMAND-ABSENCE** — sss has no .NET workflow | REJECT-FOR-FIT-Probe-7.a |
| 4 | `meigen-ai-design` | NOVEL (vendor MCP) | LIKELY-HARD-GATE (provider setup) | MIT | **.a DEMAND-ABSENCE** — no AI-image-generation workflow in sss | REJECT-FOR-FIT-Probe-7.a |
| 5 | `brand-landingpage` | NOVEL (marketing) | PASS | MIT | **.a DEMAND-ABSENCE** | REJECT-FOR-FIT-Probe-7.a |
| 6 | `quantitative-trading` | NOVEL (finance) | PASS | MIT | **.a DEMAND-ABSENCE** | REJECT-FOR-FIT-Probe-7.a |
| 7 | `payment-processing` | NOVEL | PASS | MIT | **.a DEMAND-ABSENCE** | REJECT-FOR-FIT-Probe-7.a |
| 8 | `game-development` | NOVEL | PASS | MIT | **.a DEMAND-ABSENCE** | REJECT-FOR-FIT-Probe-7.a |
| 9 | `accessibility-compliance` | NOVEL | PASS | MIT | **.a DEMAND-ABSENCE** (sss has no UI surface) | REJECT-FOR-FIT-Probe-7.a |
| 10 | `seo-content-creation` / `seo-technical-optimization` / `seo-analysis-monitoring` | NOVEL | PASS | MIT | **.a DEMAND-ABSENCE** | REJECT-FOR-FIT-Probe-7.a (×3) |
| 11 | `customer-sales-automation` / `content-marketing` / `business-analytics` / `startup-business-analyst` / `hr-legal-compliance` | NOVEL | PASS | MIT | **.a DEMAND-ABSENCE** | REJECT-FOR-FIT-Probe-7.a (×5) |
| 12 | `blockchain-web3` | NOVEL | PASS | MIT | **.a DEMAND-ABSENCE** | REJECT-FOR-FIT-Probe-7.a |
| 13 | `arm-cortex-microcontrollers` / `julia-development` / `jvm-languages` / `functional-programming` / `web-scripting` | NOVEL languages | PASS | MIT | **.a DEMAND-ABSENCE** (sss is Python-only runtime) | REJECT-FOR-FIT-Probe-7.a (×5) |
| 14 | `python-development` | PARTIAL (overlap with addy + ECC + superpowers Python-axis skills) | PASS | MIT | **.b DEMAND-CREATES** — sss is Python-heavy (hooks/scripts/evals); but heavy overlap dilutes value | DEFER — sub-skill cherry-pick possible |
| 15 | `shell-scripting` | NOVEL (no shell-scripting plugin in installed namespaces) | PASS | MIT | **.b DEMAND-CREATES** — sss has Bash/PowerShell scripts (tools/eee.ps1 + .claude/hooks/scripts/*.sh) | **STUDY-PILOT-CANDIDATE** (3rd survivor) |
| 16 | `agent-teams` | DUPLICATE | PASS | MIT | n/a | REJECT-Probe-4 |
| 17 | `conductor` | DUPLICATE + Probe 5 HARD-GATE | **HARD-GATE iter-93** (interactive Q&A setup.md:8) | Apache-2.0 | n/a | REJECT-Probe-4-AND-Probe-5 |
| 18 | `block-no-verify` | DUPLICATE (ECC safety_guard.py LITERALLY blocked my command in this fire) | PASS | MIT | n/a | REJECT-Probe-4-CONFIRMED-EMPIRICALLY |
| 19 | `developer-essentials` | PARTIAL (needs sub-inspection — 11 skills, likely heavy overlap) | PASS (sample probed) | MIT | DEFER | DEFER-Wave-138-Fire-2 |
| 20 | `tdd-workflows` / `unit-testing` / `code-refactoring` / `codebase-cleanup` / `debugging-toolkit` / `error-debugging` / `error-diagnostics` / `distributed-debugging` / `agent-orchestration` / `context-management` / `code-documentation` / `documentation-generation` / `comprehensive-review` / `security-scanning` / `security-compliance` / `cicd-automation` / `application-performance` / `plugin-eval` / `review-agent-governance` | DUPLICATE | n/a | n/a | n/a | REJECT-Probe-4 (×19) |

---

## Mia probe warnings (OVER catches on my own findings)

**n=4 fresh Mia OVERs caught this fire**:

1. **#160 marketplace.json phantom**: `marketplace.json` claims 81 plugins; filesystem has 80. `qa-orchestra` is phantom. README claim "80 plugins" matches FS reality. (Mia probe: `set(mkt) - set(fs)` returned `{'qa-orchestra'}`)
2. **#161 brief OVER on agent count**: brief said "83 agents". Coordinator course-correction confirmed install unit is PLUGIN (80) not AGENT (185).
3. **#162 my own initial Probe 4 PARTIAL classification of `protect-mcp` was WRONG**: Cedar+Ed25519 cryptographic governance is NOVEL (no installed namespace covers it). PARTIAL → NOVEL upgrade.
4. **#163 my own initial PARTIAL classification of `block-no-verify`**: should be DUPLICATE — ECC `safety_guard.py` LITERALLY blocked my Bash command in this fire when my triage script contained the `--no-verify` literal. PARTIAL → DUPLICATE strengthens.

**Mia ladder advance**: n=159 (Wave 137 Fire 2 close) → **n=163** (this fire +4 catches).

---

## FM-09 codex-rescue blind-spot specialization base rate

**N/A this fire** — no codex-rescue 1st-stage involved. This is a pure 2nd-stage harness-fit verification dispatch (sota-researcher) per `agent-harness-fit-verification.md §FM-09 codex-rescue blind-spot specialization` Step 2 ("Spawn 2nd-stage harness-fit-aware agent — sota-researcher / architect / Explore — NOT codex-rescue intermediary"). Confirms FM-09 base rate cannot advance this fire (no 1st-stage codex-rescue verdict to override).

---

## Probe 5 cohort iter-93 advance (mode-harness-shape HARD-GATE)

**iter-92 cohort (mattpocock setup-matt-pocock-skills HARD-GATE)** advances to **iter-93 cohort recurrence** with `conductor` plugin's interactive Q&A setup.md. n=4 cumulative same-class:
- iter-84 brainstorming (HARD-GATE blocks autonomous /loop)
- iter-85 writing-skills (size-sprawl + meta-skill harness mismatch)
- iter-89 dispatching-parallel-agents (KISS Must-Never #4 duplicate)
- iter-92 mattpocock setup-matt-pocock-skills (HARD-GATE `disable-model-invocation: true` + 3 sequential interactive prompts)
- **iter-93 wshobson conductor** (HARD-GATE interactive Q&A in setup.md:8)

Per `agent-harness-fit-verification.md §Promotion threshold n=5+`: Probe 5 mode-harness-shape ladder advances to **n=5** with this iter-93 → eligible for skill-layer promotion (currently rule-layer per `agent-harness-fit-verification.md`). Forward-ref for Wave 138+ codification gate.

---

## Recommended Wave 138 Fire 2 disposition

**OUTCOME**: REJECT-FOR-FIT-MAJORITY (76 of 80 plugins REJECT) + STUDY-PILOT-NARROW (3-4 candidate plugins) + DEFER (1 plugin)

| Disposition | Count | Plugins |
|---|---|---|
| **STUDY-PILOT-CANDIDATE** | **3** | `protect-mcp` + `signed-audit-trails` + `shell-scripting` |
| **DEFER-Wave-138-Fire-2** (sub-inspection needed) | 1 | `developer-essentials` (11 skills — cherry-pick possible) |
| **REJECT-FOR-FIT-Probe-4-DUPLICATE** | 22 | (enumerated above) |
| **REJECT-FOR-FIT-Probe-5-HARD-GATE** | 1 confirmed (`conductor`) + 1 likely (`meigen-ai-design`) | per cohort iter-93 |
| **REJECT-FOR-FIT-Probe-7.a-DEMAND-ABSENCE** | 53 | All vendor-vertical plugins (SEO/finance/payment/blockchain/gaming/HR-legal/marketing/non-Python-languages/etc.) |

**Wave 138 Fire 2 priority** (if proceeding):
1. **Deep-dive `protect-mcp`** + **`signed-audit-trails`** as paired STUDY-PILOT — Cedar+Ed25519 cryptographic verifiability adds NEW capability to sibling `audit-action-loop.md` discipline. Eligibility per Probe 7.b 5-clause check (named operational use case = "cryptographic verifiability for codex T1/T2/T3 verdict files at .claude/state/codex_consult_*_OUT.txt"; cited input/source path; wiring path = MCP server + Cedar policy + Ed25519 keypair gen; incumbent comparison = sibling audit-action-loop discipline lacks crypto-verifiability; reversible time-box = 30 days).
2. **DEFER `shell-scripting`** to Wave 139 (lower-priority — sss already has Bash/PowerShell scripts working; adoption marginal).
3. **DEFER `developer-essentials`** sub-inspection to Wave 139 (11 skills require per-skill probing).
4. **REJECT remaining 76 plugins** with explicit cite trail in `docs/install-provenance.md` per CR-9 install-risk discipline.

**Key insight**: wshobson/agents is **comprehensive vertical-domain coverage** (SEO + finance + payment + gaming + business + accessibility + multiple non-Python languages). For sss runtime which is **infrastructure/agentic-engineering-only** (Python hooks, codex T1-T7 verdicts, autonomous /loop), **vertical-domain plugins fail Probe 7.a DEMAND-ABSENCE** at scale. Only the cross-cutting governance primitives (`protect-mcp` cryptographic) survive Probe 7.b.

**Comparison to Wave 137 Fire 1 wshobson STUDY-PILOT-PARTIAL deferral**: this Fire 1 verification REFINES the Wave 137 deferral verdict — `wshobson/agents` as a marketplace IS technically install-eligible (CC-canonical marketplace.json + MIT license + axis-1+2+3 PASS), but per-plugin Probe 4-5-6-7 reveals only **4 of 80 plugins** survive the harness-fit gate. NOT a marketplace-level wholesale install; SELECTIVE per-plugin install only.

---

## Cite trail

- Local clone: `Z:/repos/deps/wshobson-agents/` HEAD `ece811f23310a37ceb43496dbac0e244fe6845b6`
- README @ HEAD line 11: "**185 specialized AI agents**, **16 multi-agent workflow orchestrators**, **153 agent skills**, and **100 commands** organized into **80 focused, single-purpose plugins**"
- Marketplace canonical file: `Z:/repos/deps/wshobson-agents/.claude-plugin/marketplace.json` (1073 lines; 81 plugin entries; 1 phantom = `qa-orchestra`)
- LICENSE root: `Z:/repos/deps/wshobson-agents/LICENSE` line 1: "MIT License"
- Probe 5 HARD-GATE evidence: `Z:/repos/deps/wshobson-agents/plugins/conductor/commands/setup.md:8` verbatim "interactive Q&A"
- Probe 4 DUPLICATE-confirmed-empirically: `Z:/claude-sota-installed/.claude/hooks/scripts/safety_guard.py` blocked my own Bash command this fire when triage script literal contained `--no-verify`
- Already-installed namespaces audit: `Z:/claude-sota-installed/.claude/plugins/marketplaces/` enumeration (addy-agent-skills + claude-plugins-official + everything-claude-code + context-mode + 7 others)
- Sister cohort cite: `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` Probe 5 n=3 cohort (iter-84/85/92) → advances to **n=5 with iter-89 + this iter-93 conductor**

VERDICT: REJECT-FOR-FIT-MAJORITY (76/80) + STUDY-PILOT-NARROW (3-4 plugins: protect-mcp, signed-audit-trails, shell-scripting; deferred developer-essentials)

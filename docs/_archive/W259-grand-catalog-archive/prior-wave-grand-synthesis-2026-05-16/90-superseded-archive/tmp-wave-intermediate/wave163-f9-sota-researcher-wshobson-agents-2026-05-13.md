---
title: Wave 163 F9 — wshobson/agents SOTA convergence audit (RE-AUDIT)
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (a113fb3f6210646df)
verdict: DEFER (3 STUDY-PILOT-NARROW survivors with Phase 7 benchmark gate pending)
cr12-disposition: PARTIAL-OVERLAP
re-audit-of: Wave 138 Fire 1 (iter-93) REJECT-FOR-FIT-MAJORITY 76/80
---

# Wave 163 F9 — wshobson/agents SOTA convergence audit (RE-AUDIT)

## CRITICAL CONTEXT — This is a RE-AUDIT, not a fresh evaluation

claude-sota-installed already executed wshobson/agents convergence audit at **Wave 138 Fire 1 (iter-93, 2026-05-10)**:
- HEAD audited: `ece811f23310a37ceb43496dbac0e244fe6845b6`
- Voice 2 sota-researcher REJECT-FOR-FIT-MAJORITY verdict: **76/80 = 95% rejection**
- Verdict file: `.claude/state/codex_consult_w138f1_3axis_ship_OUT.txt` (codex T1 NEEDS-REVISION conf=0.88)
- 3 STUDY-PILOT-NARROW survivors: `protect-mcp` + `signed-audit-trails` + `shell-scripting`
- Outcome: Phase 7 benchmark gate codified in `ahfv-probe-dag.md` SPECIFICALLY because of this wshobson audit
- Conductor HARD-GATE codified as Probe 5 mode-harness-shape iter-93 evidence in `ahfv-seven-sub-classes.md:21`

This re-audit at HEAD `34632bcb` (2026-05-13, 3 days later, 5 commits ahead) reconfirms the prior REJECT-FOR-FIT-MAJORITY classification — pattern unchanged at upstream, no new mitigation primitives shipped that would flip the disposition.

[VERIFIED 2026-05-13 via grep across .claude/rules/ahfv-seven-sub-classes.md L21 + ahfv-probe-dag.md "Phase 7 benchmark gate" subsection]

## D1-D10 SRA scorecard

| Dim | Score | Evidence |
|---|---|---|
| **D1 license-use-class** | PASS | MIT for 79/81 plugins; Apache-2.0 for `conductor` sub-plugin [VERIFIED 2026-05-13 via LICENSE file `MIT License Copyright (c) 2024 Seth Hobson` + marketplace.json `conductor.license: Apache-2.0`]. CLI-binary-use class — distributed as marketplace install via `/plugin install`, NOT linked library / network-served / SaaS. MIT permits cite-adaptation + fork-modify. |
| **D2 freshness** | PASS | Last push 2026-05-11T23:29:31Z (1 day ago) [VERIFIED via `mcp__github__search_repositories` updated_at]. HEAD commit `34632bcb` "feat: add ship-mate plugin (#505)" 2026-05-11. Active daily commit cadence. |
| **D3 fresh-paint vs depth** | PASS | Created 2025-07-24 (16 months old) → NOT fresh-paint anti-pattern; 35,282 stars / 3,834 forks / 7 open issues; substantive content (80 plugins × avg 3.6 components = ~288 distinct artifacts; 185 agents + 153 skills + 100 commands = 438 files). PluginEval framework + Gemini CLI integration in May 2026 = continued deepening. |
| **D4 maintainer-provenance** | PASS | Named-author Seth Hobson (@wshobson, github.com/553618 → major7apps.com) — individual maintainer with consistent commit cadence; co-maintainer Mike Henke + community contributors (Ryan Snodgrass / Dávid Balatoni / etc.). NOT org-backed (no Anthropic / Microsoft / LangChain provenance). |
| **D5 active-maintenance** | PASS | 5 commits in last 11 days; dependabot active; PR #505 (ship-mate), #522 (count-sync docs), #512 (Gemini CLI extension), #516 (dead-link cleanup), #517 (count-sync follow-up). Maintainer responsive to issues. |
| **D6 use-class compat** | **FAIL** | 3 distinct incompatibility classes for autonomous /loop mode + already-installed marketplace baseline: |
|   |   | **(a) HARD-GATE installer (Probe 5 REJECT)**: `conductor` plugin `commands/setup.md` enforces "CRITICAL RULES: Ask ONE question per turn / Wait for user response before proceeding" + `setup_state.json` interactive Q&A across 5 sections (max 5/3/5/4/2 questions = 19 sequential interactive prompts). Structurally identical to iter-93 REJECT precedent (HEAD `ece811f2` → `34632bcb` pattern unchanged). [VERIFIED 2026-05-13 via direct Read of `plugins/conductor/commands/setup.md` SHA `bf94b56e3da68b5759c446facd5f8e9c5580ecab`] |
|   |   | **(b) DUPLICATE-FUNCTIONALITY (Probe 4 REJECT majority)**: massive plugin-namespace overlap with 11 already-installed marketplaces — wshobson `code-refactoring` ↔ addy `code-simplification`; wshobson `error-debugging` + `error-diagnostics` + `distributed-debugging` ↔ addy `debugging-and-error-recovery` + everything-claude-code `debugger`; wshobson `comprehensive-review` ↔ claude-plugins-official `code-review` + `pr-review-toolkit` + `superpowers`; wshobson `security-scanning` + `security-compliance` ↔ addy `security-and-hardening`; wshobson `cicd-automation` ↔ addy `ci-cd-and-automation`; wshobson `git-pr-workflows` ↔ addy `git-workflow-and-versioning`; wshobson `documentation-generation` ↔ addy `documentation-and-adrs`; wshobson `performance-testing-review` ↔ addy `performance-optimization`. Per `kiss-dry-yagni.md` Must-Never #4 (no duplicate functionality). |
|   |   | **(c) agent-teams plugin REQUIRES experimental env-flag**: `agent-teams/README.md` mandates `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` env + `~/.claude/settings.json` `teammateMode: "tmux"` config. claude-sota-installed has neither set per `.claude/settings.json` env-block grep. Would require codification ship to enable (separate fire). |
| **D7 Anthropic-CC alignment** | PASS | Native Claude Code plugin/marketplace format (`.claude-plugin/marketplace.json` schema valid); uses official `/plugin install`; cites Claude Code docs at multiple places; integrates with Anthropic Agent Teams + Skills. |
| **D8 industry adoption** | PASS | Star History chart confirms steady growth; cited as "/agents marketplace" in CC ecosystem; protect-mcp sub-plugin has Microsoft AGT (microsoft/agent-governance-toolkit PR #667 merged) + Cedar contribution (cedar-policy/cedar-for-agents PR #64 merged); 10K+ monthly npm downloads for protect-mcp. |
| **D9 FM-class awareness** | PASS | Prior iter-93 REJECT-FOR-FIT-MAJORITY codified at `ahfv-seven-sub-classes.md:21` (Probe 5 mode-harness-shape iter-93 evidence) + `ahfv-probe-dag.md` "Phase 7 benchmark gate" (codified BECAUSE of wshobson audit). FM-09 codex-rescue blind-spot specialization at `ahfv-codex-rescue-blind-spot.md` validated against this candidate at iter-93. |
| **D10 replacement viability** | N/A | Not a replacement candidate for an existing single primitive; bulk-marketplace addition would create namespace collision with 11 incumbents |

**Cumulative score**: 5 PASS + 1 FAIL + 1 N/A (effective 5/9 substantive dims). D6 FAIL is BLOCKING for whole-marketplace install per CR-12 disposition lattice "DUPLICATE-FUNCTIONALITY = REJECT install" rule.

## 6-Probe Harness-Fit DAG verdicts

| Probe | Verdict | Evidence |
|---|---|---|
| **P1 count-OVER** | PASS | Marketplace.json counts (80 plugins / 185 agents / 153 skills / 100 commands) self-audited by maintainer in commit `9f9ba323` 2026-05-09; CodeRabbit fix-forward synced model distribution (54/62/20/49 = 185). Counts verified internally consistent. |
| **P2 SDK-vs-CLI surface** | PASS | Native Claude Code `/plugin install` + `/plugin marketplace add` primitives (TIER-1-DIRECT Anthropic CC supported). NO custom CLI installation required. |
| **P3 architectural-API** | PASS | Anthropic-CC native architecture (plugins / agents / skills / commands / hooks). No OpenAI / Mistral / vendor-neutral OTel mismatch. |
| **P4 plugin-namespace** | **REJECT (majority)** | 18+ plugins functionally duplicate already-installed primitives in addy-agent-skills (21 skills), claude-plugins-official (20+ plugins including superpowers / pr-review-toolkit / code-review), everything-claude-code (deep-research / skill-comply / etc.), skill-creator. Per `kiss-dry-yagni.md` Must-Never #4 — REJECT bulk install. |
| **P5 mode-harness-shape** | **REJECT** | `conductor` plugin HARD-GATE interactive Q&A setup at `plugins/conductor/commands/setup.md:8-23` — structurally identical to iter-84 brainstorming + iter-92 mattpocock + iter-93 wshobson cohort already codified. Incompatible with autonomous /loop mode (cardinal-rule-7 graduated unleash + Wave 82d permissions.defaultMode=bypassPermissions). |
| **P6 LICENSE/registry/badge** | PASS | MIT verbatim at LICENSE file SHA `326f0a55`; Apache-2.0 for conductor (also permissive-compatible per `kiss-dry-yagni.md` license whitelist). NO archive-banner / deprecation-status / phantom-package signals. Smithery badge active; protect-mcp npm 10K+ monthly downloads. |
| **P7 demand-gate** | **REJECT.a for majority** (DEMAND-ABSENCE) — runtime already has incumbent primitives covering CI/CD / debugging / code-review / security / docs / git / testing / scaffolding workflows via 11 existing marketplaces. **PASS.b for 3 STUDY-PILOT-NARROW survivors** with explicit demand-creates-new-workflow: protect-mcp (Cedar policy + Ed25519 receipts — no incumbent), signed-audit-trails (governance teaching skill, complements protect-mcp), shell-scripting (POSIX bash-pro depth — partial overlap with addy but justifiable for bash deep-dive). |

## CR-12 6-class disposition

**Final classification: PARTIAL-OVERLAP** with the following breakdown:

1. **DUPLICATE-FUNCTIONALITY** (~60 plugins / 75%): namespace overlap with addy-agent-skills + claude-plugins-official + everything-claude-code incumbents. Per CR-12 disposition lattice → REJECT install at marketplace level.

2. **PROVIDER-COMPLEMENT** (~17 plugins / 21%): wshobson-unique surfaces (blockchain-web3 / quantitative-trading / payment-processing / game-development / arm-cortex-microcontrollers / dotnet-contribution / meigen-ai-design / brand-landingpage / qa-orchestra) — but NONE have demonstrable demand in claude-sota-installed runtime (Probe 7.a DEMAND-ABSENCE). Per CR-12 → DEFER pending demand.

3. **CITE-CLASS-CANONICAL** (3 plugins / 4%): `protect-mcp` (governance/Cedar/Ed25519) + `signed-audit-trails` (pairs with protect-mcp) + `shell-scripting` (POSIX depth) — Wave 138 Fire 1 STUDY-PILOT-NARROW survivors. Per CR-12 → CITE-ADAPT with Phase 7 benchmark gate per `ahfv-probe-dag.md` §"Phase 7 benchmark gate for ADOPT-NOW multi-agent kits".

4. **HARD-GATE REJECT** (1 plugin: `conductor`): Probe 5 mode-harness-shape iter-93 cohort REJECT-FOR-FIT — never install.

5. **GENUINELY-NEW**: 0 plugins (every superficially-novel surface either duplicates existing primitives OR lacks Probe 7 demand).

6. **ECOSYSTEM-IMPORT**: agent-teams sub-plugin requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` env-flag NOT currently set; would graduate to ECOSYSTEM-IMPORT class IF Wave 164+ ships the env enablement + tmux pane mode config. Currently DEFER.

## Recommended action (NOT install whole marketplace)

**DEFER whole-marketplace install. Pursue narrow Pattern A apply on 3 STUDY-PILOT-NARROW survivors per Phase 7 benchmark gate.**

### Path A — narrow Pattern A apply (if /goal P5 awesome-list queue continues this fire)

Per `ahfv-probe-dag.md` Phase 7 benchmark gate (codified BECAUSE of this candidate's iter-93 audit):

> If a multi-agent kit or plugin bundle receives `ADOPT-NOW`, require `BENCHMARK-PASS` evidence before install/enable. Acceptable evidence is a reproducible benchmark repo, inline benchmark fixtures with commands, or a local eval artifact tied to the claimed improvement. If the README makes >=3 numeric improvement claims without reproducible methodology, route through `convergence-gate.md:127-149` Row-2 fabrication-test FAIL.

The 3 survivors need fabrication-test verification BEFORE install commit:
1. **protect-mcp**: verify Cedar policy enforcement claims via README example policy + Ed25519 receipt signing benchmarks (npm package smoke-test)
2. **signed-audit-trails**: verify cookbook teaching content is operational not aspirational
3. **shell-scripting**: verify bats-testing-patterns + bash-defensive-patterns content depth vs addy-agent-skills `ci-cd-and-automation` overlap

Per `convergence-gate.md` Row-2 anti-pattern fabrication-test FAIL: count numeric README claims (e.g. "10K+ monthly downloads", "65% fewer tokens", etc.) — flag any >=3 unsourced claims as auto-FAIL. **protect-mcp README has cites to RFC 8032 / RFC 8785 / Cedar / Microsoft AGT PR — methodology backing is strong. APPROVE conditional on smoke probe.**

### Path B — defer all (recommended in absence of specific demand)

DEFER the entire candidate. The 3 STUDY-PILOT-NARROW survivors create new workflows but no operator-explicit demand from claude-sota-installed runtime today (no /goal directive citing protect-mcp / Cedar policy / Ed25519 receipts as current workflow). Per Probe 7.b 5-clause check: (1) named operational use case ABSENT, (2) wiring path UNDEFINED, (3) incumbent comparison NOT done, (4) reversible time-box NOT specified, (5) 30-day success criterion NOT defined. Probe 7.b FAILS — fall back to DEFER.

### Path C — STUDY-PILOT NARROW (next-fire candidate if /goal P5 cycles back)

If next fire materially advances /goal P5 awesome-list synthesis AND operator-trigger surfaces governance/audit-trail workflow demand: install `protect-mcp` as ECOSYSTEM-IMPORT (Cedar = NEW workflow surface, no incumbent) with Phase 7 benchmark gate verification + 30-day burn-in time-box. Companion `signed-audit-trails` teaching plugin co-installs naturally. `shell-scripting` defer until bash deep-dive demand surfaces.

## Cite anchors

- **wshobson/agents HEAD**: `mcp__github__search_repositories` 2026-05-13 returned `sha:34632bcbea28176ba25bbbc43cd4017d88b1cac6` updated_at `2026-05-13T06:04:30Z`, stars 35282, license MIT
- **LICENSE file**: blob SHA `326f0a55c96e672fedf9d807ca043c00df05ba0e` "MIT License Copyright (c) 2024 Seth Hobson"
- **.claude-plugin/marketplace.json**: blob SHA `8d65e2c6226b659997376878b482ca3db0c41163` (81 plugins enumerated; 80 local + 1 git-subdir qa-orchestra)
- **plugins/conductor/commands/setup.md HARD-GATE evidence**: blob SHA `bf94b56e3da68b5759c446facd5f8e9c5580ecab` L8-23 "CRITICAL RULES: Ask ONE question per turn"
- **README.md**: blob SHA `035d11c52ad8131933f4e1eed5980857cd0c7d1e`
- **Prior iter-93 REJECT precedent**: `.claude/rules/ahfv-seven-sub-classes.md:21` (Probe 5 mode-harness-shape table — iter-93 wshobson conductor at HEAD `ece811f2`)
- **Phase 7 benchmark gate codification**: `.claude/rules/ahfv-probe-dag.md` §"Phase 7 benchmark gate for ADOPT-NOW multi-agent kits"
- **Incumbent marketplace inventory** (Probe 4 duplicate detection baseline): 11 marketplaces
- **kiss-dry-yagni Must-Never #4**: `.claude/rules/kiss-dry-yagni.md` (no duplicate functionality)
- **convergence-gate Row-2 fabrication-test FAIL**: `.claude/rules/convergence-gate.md:127-149`
- **CR-12 6-class disposition lattice**: `.claude/rules/cardinal-rule-12-upstream-install-priority.md`

## Honest non-finding disclosures

- **Phase 7 benchmark gate fabrication-test NOT executed**: forward-ref for next-fire Pattern A apply
- **Numeric README claim count NOT exhaustive**: spot-check showed protect-mcp cites RFC 8032/8785/Cedar/MS-AGT — methodology backing strong but full Row-2 audit deferred
- **agent-teams env-flag enablement cost NOT estimated**: separate fire required
- **Smithery operator usage UNKNOWN**: not probed

## Conclusion

**DEFER whole-marketplace install. The Wave 138 Fire 1 iter-93 REJECT-FOR-FIT-MAJORITY precedent stands at HEAD `34632bcb`** — no upstream changes mitigate the Probe 4 duplicate-namespace + Probe 5 HARD-GATE failures. The 3 STUDY-PILOT-NARROW survivors (protect-mcp + signed-audit-trails + shell-scripting) remain narrow Pattern A apply candidates pending Phase 7 benchmark gate verification + Probe 7.b 5-clause demand-creates-new-workflow check + operator-trigger surfacing governance/audit-trail workflow demand.

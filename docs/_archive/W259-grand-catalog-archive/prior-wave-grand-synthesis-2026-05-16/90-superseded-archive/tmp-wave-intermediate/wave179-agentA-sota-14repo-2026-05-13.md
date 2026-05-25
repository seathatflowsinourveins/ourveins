---
title: Wave 179 Agent A — 14-Repo SOTA Audit Deep-Dive
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (BRIDGE-MODE Sonnet stand-in)
wave: 179
fire: 2 P0
artifact-class: ARTIFACT-INLINE (FM-19 readonly-guard sidestep)
stand-in-notice: STAND-IN per CLAUDE.local.md ENV (f) CLAUDE_CODE_SUBAGENT_MODEL=claude-sonnet-4-6; codex CLI not invoked from within this subagent; cross-model gate satisfaction is via orchestrator-side Path P codex T1 dispatch on this artifact per cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate
---

# Wave 179 Agent A — 14-Repo SOTA Deep-Dive Audit

## Executive verdict

**VERDICT: NEEDS-REVISION conf=0.84** — audit complete across 14 repos with Probe DAG 1-7 + Axis 1+2+3 convergence + CR-12 disposition. 5 ADOPT-NOW + 5 STUDY-PILOT identified; 4 routed to REJECT/CITE-ONLY lattice. Orchestrator MUST Mia-pre-apply per `Z:/claude-sota/.claude/rules/mia-pre-apply.md` n=140+ ladder BEFORE any install Edit. 2 high-confidence catches require operator-decision (vercel-labs LICENSE-MISSING blocker; awesome-claude-skills LICENSE-MISSING blocker — Probe 6 FAIL).

## Mia verification log (FM-20 path-drift defense)

All evidence Mia-probed at acquisition:
- [VERIFIED 2026-05-13 via `git -C /z/repos/deps/<repo> log -1 --format='%h %s'`] — HEAD SHAs for 13 local clones
- [VERIFIED 2026-05-13 via `head -3 LICENSE`] — license content for permissive-license whitelist check
- [VERIFIED 2026-05-13 via `find <repo> -name SKILL.md | wc -l`] — count claims for Probe 1 OVER detection
- [VERIFIED 2026-05-13 via Glob/Bash structural enumeration] — plugin/skill directory inventories
- [INFERRED] — Probe 7.b 5-clause demand checks (no live workflow probes; reasoning from sss invocation surface)

FM-20 catches in this audit:
- **catch-1**: Shubhamsaboo/awesome-llm-apps clone is at `Z:/repos/deps/awesome-llm-apps/` NOT `Z:/repos/deps/Shubhamsaboo-awesome-llm-apps/` per brief — path-rewrite applied per CR-9 sibling-bleed defense.
- **catch-2**: forrestchang/andrej-karpathy-skills now resolves to `multica-ai/andrej-karpathy-skills` per W171 FM-20.A — local clone at `Z:/repos/deps/andrej-karpathy-skills/` HEAD `2c606141936f`.
- **catch-3**: get-shit-done HEAD claim in brief was `eeaf9c5` — actual local HEAD `3aaed8f5d7c3`. Brief HEAD is stale; report on actual local HEAD.
- **catch-4**: hesreallyhim/awesome-claude-code HEAD claim in brief was `6ebceef` — actual local HEAD `614f102accbc`. Brief HEAD stale.
- **catch-5**: alirezarezvani/claude-skills HEAD claim in brief was `f567c61` — actual local HEAD `7d493fed97e4`. Brief HEAD stale.
- **catch-6**: shanraisshan/claude-code-best-practice brief HEAD `48f2ceb` matches local HEAD `48f2cebeb88b` ✓ FRESH.
- **catch-7**: vinta/awesome-python brief HEAD `07ad943` — actual local HEAD `5f725c25d7a7`. Brief HEAD stale.
- **catch-8**: quemsah is NOT a local clone — does not exist at `Z:/repos/deps/quemsah*/`. REMOTE-ONLY status required.
- **catch-9**: wshobson/agents brief HEAD `34632bc` — actual local HEAD `ece811f23310`. Brief HEAD stale.

**Forward-only disposition per `port-note-discipline.md §6`**: report uses actual local HEADs not brief HEADs. Brief stale-HEAD class is FM-20 sub-class candidate (n+1 forward-only).

---

## Repo 1: wshobson/agents

**Cite**: `Z:/repos/deps/wshobson-agents @ HEAD ece811f23310 (latest 2026-05-13 local)` — License MIT.

- **Probe 1 count-OVER**: 80 plugins confirmed via `ls plugins/ | wc -l` (matches README claim).
- **Probe 2 SDK-vs-CLI**: claude-sota-installed has plugin marketplace surface (`.claude/plugins/marketplaces/`). 3 plugins already INSTALLED via cite-import-AMBER per W165: `shell-scripting` / `gitnexus-pr-review` / `protect-mcp` (per W177 P0 commit 8119746). Top-3 INSTALL PATH VALIDATED.
- **Probe 3 architectural-API**: Anthropic CC plugin-format; matches sss architecture.
- **Probe 4 plugin-namespace**: 3 wshobson plugins ALREADY installed; remaining 77 are install-candidates not duplicates.
- **Probe 5 mode-harness-shape**: `conductor` plugin has HARD-GATE interactive Q&A setup per W138 codification (REJECT for autonomous /loop). All others PASS.
- **Probe 6**: MIT ✓ + canonical channel `/plugin install <name>@wshobson-agents` available ✓.
- **Probe 7.b**: NEW workflow created — wshobson-agents enables 77 unmet workflows (DevOps / security / domain-specific). 5-clause check PASSES selectively per-plugin.
- **Axis 1+2+3**: PASS (multi-org TIER-1; named-author Seth Hobson; >180d STABLE-BURN-IN).
- **CR-12 disposition**: ECOSYSTEM-IMPORT (most plugins GENUINELY-NEW workflows; small DUPLICATE-FUNCTIONALITY overlap with claude-plugins-official).

**Verdict**: ADAPT-NOW per-plugin (Top-3 already installed). Add 2-3 more per fire as workflows demand.

---

## Repo 2: davidsec/gitnexus

**Cite**: `Z:/repos/deps/gitnexus @ HEAD 98addbd6c4e7 (latest 2026-05-13 local)` — License **PolyForm Noncommercial 1.0.0** (PROBE-6 BLOCKER for permissive-license-only sss).

- **Probe 1**: CLI v1.6.4-rc.112 + 13 MCP tools + indexed against runtime (6008 symbols / 6396 edges / 27 flows per W164 F38b) ✓.
- **Probe 2**: ALREADY-INSTALLED + WIRED in `.mcp.json` as runtime CLI per W164 F38b `gitnexus analyze` execution.
- **Probe 3**: MCP server architecture; native Anthropic CC integration.
- **Probe 4**: gitnexus-pr-review@wshobson-agents installed W177 P0. CLI itself is install-class primitive (NOT plugin-namespace duplicate).
- **Probe 5**: Autonomous-mode compatible; runtime indexed.
- **Probe 6**: **PolyForm Noncommercial 1.0.0** — restrictive license. Per CR-1 + `convergence-gate.md §Probe 6 LICENSE/badge`: **STRUCTURAL ADOPTION BLOCKER for permissive-license sss**. HOWEVER — gitnexus is INCUMBENT-INSTALLED (per manifest §7 ADAPTED-FROM-SOTA W164 F35); license-class shift mid-incumbent requires forward-only ACCEPT-WITH-DOC per `closed-loop-recursive-narrowing.md §Outcome A` + operator decision.
- **Probe 7.a/7.b**: workflow ALREADY-ACTIVE (W164 F38b indexed against runtime; MCP tools available). N/A.
- **Axis 1+2+3**: PARTIAL — Axis 6 license blocker preempts.
- **CR-12 disposition**: INCUMBENT-PRIMARY KEEP (already installed; non-commercial license is acceptable for non-commercial sss use; queue license-class review).

**Verdict**: KEEP-AS-INCUMBENT-WITH-LICENSE-CAVEAT. Operator must acknowledge PolyForm-Noncommercial restricts commercial redistribution; sss internal use is acceptable.

---

## Repo 3: quemsah

**Cite**: NOT-A-LOCAL-CLONE — `ls -d /z/repos/deps/quemsah*` returns no results.

- **Probe 1-6**: BLOCKED — no local source for line-cite verification.
- **Probe 6**: REMOTE-ONLY; LICENSE unknown per W164 F20 quemsah LICENSE-MISSING + W164 F20 PROBE-6-BLOCKED verdict.

**Verdict**: **REJECT-FOR-FIT** — Probe 6 LICENSE-MISSING blocker confirmed from W164 F20 evidence; no fresh local probe possible.

---

## Repo 4: Shubhamsaboo/awesome-llm-apps

**Cite**: `Z:/repos/deps/awesome-llm-apps @ HEAD 844cda76bfff (latest 2026-05-13 local)` — License **Apache-2.0** ✓.

- **Probe 1**: Multi-category directory: starter_ai_agents/ advanced_ai_agents/ rag_tutorials/ mcp_ai_agents/ voice_ai_agents/ awesome_agent_skills/. The `awesome_agent_skills/` subdirectory contains 16+ named skill subdirs (academic-researcher / code-reviewer / content-creator / data-analyst / debugger / decision-helper / deep-research / editor / email-drafter / fact-checker / fullstack-developer / meeting-notes / project-planner / python-expert / self-improving-agent-skills / etc.).
- **Probe 2**: skill format is cite-class reference, not directly install-class (no `.claude-plugin/marketplace.json`).
- **Probe 3**: Mixed framework (LangChain / CrewAI / etc.) — generic Python AI-agent tutorials, not CC-native.
- **Probe 4**: Plugin-namespace check — NO direct match with installed plugins; reference catalog mode.
- **Probe 5**: Tutorial / reference mode — fits research-protocol Gate 2 INVESTIGATE menu.
- **Probe 6**: Apache-2.0 ✓; permissive-license clean.
- **Probe 7.b**: NEW workflow — cite-anchor for research-protocol Gate 2 multi-source ecosystem discovery. 5-clause check: (1) named ops use case = research-protocol INVESTIGATE; (2) source path = `Z:/repos/deps/awesome-llm-apps/awesome_agent_skills/`; (3) wiring = read via Glob/Grep cite-anchor pattern; (4) incumbent comparison = supplements (NOT replaces) wshobson + addy + claude-skills; (5) reversible = doc-only cite, removable in 1 LOC.
- **Axis 1+2+3**: PASS — multi-org (named-author Shubham Saboo), 38k★ per W164 F20, >180d STABLE.
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — reference catalog for ecosystem discovery; cite-anchor at file:line; no install-class artifact.

**Verdict**: ADOPT-NOW-AS-CITE-CLASS-CANONICAL — add to research-protocol.md §curated catalogs subsection (similar to vinta/awesome-python existing entry).

---

## Repo 5: multica-ai/andrej-karpathy-skills

**Cite**: `Z:/repos/deps/andrej-karpathy-skills @ HEAD 2c606141936f` — License **MISSING file** (README claims MIT per W171; needs operator confirmation).

- **Probe 1**: 1 top-level skill `karpathy-guidelines/`; ~67 LOC SKILL.md per existing claude-sota cite anchors. Light.
- **Probe 2**: ALREADY-CITED extensively in claude-sota rules (`karpathy-adapted.md`, `mia-pre-apply.md`, `synthesis-layer-verify.md`). Already mature cite-anchor.
- **Probe 3**: SKILL.md format; Anthropic CC native.
- **Probe 4**: `everything-claude-code:agent-introspection-debugging` and similar already plugin-exposed. Karpathy guidelines is NOT plugin-namespace-exposed but content is already cited extensively.
- **Probe 5**: Autonomous-mode compatible; mature cite-source.
- **Probe 6**: **LICENSE FILE MISSING** at `Z:/repos/deps/andrej-karpathy-skills/LICENSE` ❌. README may claim MIT; needs verify. Per `Probe 6 LICENSE`: STRUCTURAL CAVEAT — without LICENSE file, install-class adoption is BLOCKED; cite-class adoption still works per immutable-at-SHA convention.
- **Probe 7.a/7.b**: Already cite-class incumbent (n>20 cite-anchors across claude-sota rules); no new workflow needed.
- **Axis 1+2+3**: PASS — named-author Andrej Karpathy (TIER-1-NAMED-AUTHOR-QUOTE); >180d STABLE.
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — cite-anchor pinned at HEAD SHA per cardinal-rule-1; install-class blocked by Probe 6.

**Verdict**: KEEP-AS-CITE-CLASS-INCUMBENT — already mature cite-source; no install required; queue LICENSE verify probe to operator (n=1 user-decision sub-class).

---

## Repo 6: mattpocock/skills

**Cite**: `Z:/repos/deps/mattpocock-skills @ HEAD 733d312884b3` — License **MIT** ✓ — 48,857★.

- **Probe 1**: Skill directories: deprecated/ engineering/ in-progress/ misc/ personal/ productivity/. `engineering/` contains diagnose/ grill-with-docs/ improve-codebase-architecture/ prototype/ setup-matt-pocock-skills/ tdd/ to-issues/ to-prd/ triage/ zoom-out/ ≈ 10+ skills.
- **Probe 2**: SKILL.md format; Anthropic CC native.
- **Probe 3**: Native CC SKILL invocation surface.
- **Probe 4**: **PLUGIN-NAMESPACE COLLISION**: `tdd` already in `everything-claude-code:tdd-workflow` + claude-sota's `.claude/skills/superpowers/tdd/`. `diagnose` already in `context-mode:diagnose`. `triage` already in `everything-claude-code:` (via various skills). DUPLICATE-FUNCTIONALITY for ~50% of skills.
- **Probe 5**: HARD-GATE in `setup-matt-pocock-skills`: interactive setup with 3 sequential prompts (issue tracker / triage labels / domain doc layout) — incompatible with autonomous /loop per W137 codification at `ahfv-seven-sub-classes.md`.
- **Probe 6**: MIT ✓ permissive-license clean.
- **Probe 7.b**: NEW workflows include `grill-with-docs` / `improve-codebase-architecture` / `to-issues` / `to-prd` / `zoom-out` — selectively NEW. ~5 of ~10 engineering skills are net-new.
- **Axis 1+2+3**: PASS — named-author Matt Pocock (TIER-1-NAMED-AUTHOR-QUOTE), TIER-2 DDD/XP/Pragmatic Programmer quotes; >180d STABLE.
- **CR-12 disposition**: **PARTIAL-OVERLAP** — selective per-skill adoption; ~50% DUPLICATE / ~50% GENUINELY-NEW.

**Verdict**: STUDY-PILOT — selectively adopt 4-5 GENUINELY-NEW skills (`grill-with-docs` / `to-issues` / `to-prd` / `zoom-out` / `improve-codebase-architecture`); REJECT `setup-matt-pocock-skills` (HARD-GATE); SKIP duplicates per CR-12 DUPLICATE-FUNCTIONALITY routing.

---

## Repo 7: hesreallyhim/awesome-claude-code

**Cite**: `Z:/repos/deps/awesome-claude-code @ HEAD 614f102accbc` — License **CC-BY-NC-ND-4.0** (cite-only no-fork-modify).

- **Probe 1**: 226 resource-table rows per existing claude-sota cite at `research-protocol.md` 10 CSV categories.
- **Probe 2**: README + CSV table format; cite-class only.
- **Probe 3**: Markdown reference catalog; no API.
- **Probe 4**: Reference catalog mode; not plugin-namespace.
- **Probe 5**: Cite-class mode fits research-protocol.md Gate 2 INVESTIGATE menu.
- **Probe 6**: **CC-BY-NC-ND-4.0** — cite-only license; no fork-modify allowed. Per existing claude-sota cite-anchor at `research-protocol.md`: ALREADY-EXEMPTED for cite-class use.
- **Probe 7.a/7.b**: Already cite-class incumbent in `research-protocol.md`. No new workflow.
- **Axis 1+2+3**: PASS — named curator hesreallyhim, ~28mo old per `research-protocol.md` cite; STABLE-BURN-IN.
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — already incumbent; no install needed.

**Verdict**: KEEP-AS-CITE-CLASS-INCUMBENT — refresh HEAD if cite drift; n=0 install required.

---

## Repo 8: alirezarezvani/claude-skills

**Cite**: `Z:/repos/deps/claude-skills @ HEAD 7d493fed97e4` — License **MIT** ✓ — 5,200+ stars.

- **Probe 1**: **542 SKILL.md** files [VERIFIED via `find claude-skills -name SKILL.md | wc -l`] + 72 agent files — MATCHES research-protocol.md cite claim of "540 SKILL.md".
- **Probe 2**: SKILL.md format; Anthropic CC native.
- **Probe 3**: Native CC SKILL invocation; cross-tool support claimed (12 AI coding tools per `research-protocol.md`).
- **Probe 4**: **HIGH PLUGIN-NAMESPACE COLLISION RISK**: 542 skills across engineering/business-growth/marketing-skill/product-team/c-level-advisor/project-management/ra-qm-team/finance/standards — many likely DUPLICATE-FUNCTIONALITY with addy-agent-skills + everything-claude-code + claude-plugins-official.
- **Probe 5**: Cross-tool wrappers may include autonomous-incompatible setup.
- **Probe 6**: MIT ✓ permissive-license clean. AUDIT_REPORT.md exists (maintainer self-audit POWERFUL/SOLID/GENERIC/WEAK classification).
- **Probe 7.b**: NEW workflows in non-engineering domains (business-growth / marketing-skill / c-level-advisor) — GENUINELY-NEW for sss if those domains needed.
- **Axis 1+2+3**: PASS — 5,200★ MIT; ~28mo+ STABLE.
- **CR-12 disposition**: **PARTIAL-OVERLAP** — engineering domain heavily DUPLICATE; non-engineering domains GENUINELY-NEW but DEMAND-ABSENT per sss workflow (Probe 7.a REJECT).

**Verdict**: STUDY-PILOT-NARROW — engineering subset duplicates incumbents; non-engineering subset has Probe 7.a demand-absence in sss runtime. Pilot ONLY if/when sss expands to non-engineering domains (operator decision).

---

## Repo 9: gsd-build/get-shit-done

**Cite**: `Z:/repos/deps/get-shit-done @ HEAD 3aaed8f5d7c3` — License **MIT** ✓ — 58,543★.

- **Probe 1**: Meta-prompting + context-engineering + spec-driven development system; 13-runtime cross-tool support per existing `research-protocol.md` cite.
- **Probe 2**: CC slash-command format (`/gsd-graphify` / `/gsd-spike` / `/gsd-sketch`); install-class.
- **Probe 3**: Native CC commands surface.
- **Probe 4**: **PLUGIN-NAMESPACE INDIRECT COLLISION**: `/gsd-graphify` overlaps with gitnexus dependency graphs (INCUMBENT); `/gsd-spike` / `/gsd-sketch` GENUINELY-NEW. ~30% overlap.
- **Probe 5**: `--minimal` install option (~700 vs 12K cold-start tokens) ✓ autonomous-compatible. PreToolUse prompt-guard + path traversal prevention + JSON sanitization fit sss safety floor.
- **Probe 6**: MIT ✓ permissive-license clean.
- **Probe 7.b**: NEW workflows (`/gsd-spike` 2-5 focused experiments / `/gsd-sketch` HTML mockup variants / fresh-context subagent dispatch). 5-clause check: (1) named ops = focused spike / mockup; (2) source path = `Z:/repos/deps/get-shit-done/`; (3) wiring = `/plugin install` or selective adapt; (4) incumbent = `everything-claude-code:` overlap minimal; (5) reversible = uninstall single command.
- **Axis 1+2+3**: PASS — 58,543★ MIT, 132 contributors / 49 releases per `research-protocol.md` cite; STABLE-BURN-IN.
- **CR-12 disposition**: **PARTIAL-OVERLAP** — `/gsd-graphify` duplicates gitnexus; `/gsd-spike` + `/gsd-sketch` GENUINELY-NEW.

**Verdict**: STUDY-PILOT — selectively adopt `/gsd-spike` + `/gsd-sketch` (2-week pilot per Probe 7.b 5-clause check); SKIP `/gsd-graphify` (gitnexus INCUMBENT-PRIMARY).

---

## Repo 10: vercel-labs/agent-skills

**Cite**: `Z:/repos/deps/vercel-labs-agent-skills @ HEAD b9c8ee0643d8` — License **MISSING** ❌ (LICENSE file absent).

- **Probe 1**: Skills enumerated: composition-patterns/ deploy-to-vercel/ react-best-practices/ react-native-skills/ react-view-transitions/ vercel-cli-with-tokens/ web-design-guidelines/ + 4 .zip artifacts.
- **Probe 2**: SKILL.md format per `https://agentskills.io/`; Anthropic CC native.
- **Probe 3**: Native CC SKILL invocation.
- **Probe 4**: ALREADY-INSTALLED as `vercel-composition-patterns` + `vercel-react-best-practices` + `web-design-guidelines` per session-list. DUPLICATE-FUNCTIONALITY for those 3.
- **Probe 5**: react-native + deploy-to-vercel are Vercel-platform-specific (autonomous-mode compatible but DEMAND-ABSENT in sss runtime if no Vercel deployment).
- **Probe 6**: **LICENSE FILE MISSING** ❌ — STRUCTURAL ADOPTION BLOCKER per `convergence-gate.md §Probe 6 LICENSE`. README + AGENTS.md exist but no LICENSE file. Per cardinal-rule-9 §"Pre-cite-import REVERT check": this aligns with W164 F20 PROBE-6-BLOCKED pattern (vercel-labs LICENSE-MISSING).
- **Probe 7.b**: react-native + deploy-to-vercel + view-transitions = NEW workflows IF sss adopts Vercel/React-Native; otherwise Probe 7.a DEMAND-ABSENT.
- **Axis 1+2+3**: PASS — Vercel-Labs-org TIER-1 distinct-org cite (Axis-1 reinforcement); STABLE.
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** (3 already installed) + **PROBE-6-BLOCKED** (remaining 4 awaiting LICENSE add).

**Verdict**: 3 SKILLS ALREADY-INSTALLED (KEEP); remaining 4 BLOCKED by Probe 6 LICENSE-MISSING — REJECT until upstream adds LICENSE file.

---

## Repo 11: affaan-m/everything-claude-code

**Cite**: `Z:/repos/deps/affaan-m-everything-claude-code @ HEAD 841beea45cb2` — License **MIT** ✓.

- **Probe 1**: ECC canonical RULES.md + skills/ + agents/ + plugins/ exhaustive.
- **Probe 2**: ALREADY-INSTALLED + WIRED as `everything-claude-code@everything-claude-code` plugin per `.claude/settings.json:enabledPlugins`.
- **Probe 3**: Native CC plugin format.
- **Probe 4**: INCUMBENT — already installed.
- **Probe 5**: Autonomous-mode compatible.
- **Probe 6**: MIT ✓.
- **Probe 7.a/7.b**: Already ACTIVE incumbent (multiple cite-anchors across claude-sota rules).
- **Axis 1+2+3**: PASS — multi-org cite, named-author affaan-m, 28+ mo STABLE.
- **CR-12 disposition**: **INCUMBENT-PRIMARY KEEP**.

**Verdict**: KEEP-AS-INCUMBENT. Refresh HEAD periodically per CR-6 freshness.

---

## Repo 12: shanraisshan/claude-code-best-practice

**Cite**: `Z:/repos/deps/claude-code-best-practice-shan @ HEAD 48f2cebeb88b` — License **MIT** ✓. **Brief HEAD matches local HEAD ✓ FRESH.**

- **Probe 1**: TIER-1 CCBP authority — best-practice/ + development-workflows/ + tips/ + reports/ + implementation/.
- **Probe 2**: Documentation reference + claude-md/claude-mcp/claude-settings/claude-subagents/claude-skills/claude-memory/claude-cli-startup-flags + cross-model-workflow.
- **Probe 3**: Reference for Anthropic CC native primitives.
- **Probe 4**: Cite-class incumbent (50+ cite-anchors across claude-sota + claude-sota-installed CLAUDE.md).
- **Probe 5**: Mature; autonomous-mode compatible.
- **Probe 6**: MIT ✓.
- **Probe 7.a**: Already ACTIVE incumbent; no new workflow.
- **Axis 1+2+3**: PASS — named-author shanraisshan independent third-party CCBP author (NOT Anthropic-affiliate per Wave 50 fire 10 Pattern A on Agent L F-P1 Dimension 3); >180d STABLE; multi-org Axis 1 ≥3-distinct-orgs reinforcement.
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — TIER-1-DIRECT cite-anchor for cardinal rules 1-4.

**Verdict**: KEEP-AS-CITE-CLASS-INCUMBENT — refresh per CR-6 freshness.

---

## Repo 13: vinta/awesome-python

**Cite**: `Z:/repos/deps/awesome-python @ HEAD 5f725c25d7a7` — License **CC-BY-4.0** ✓.

- **Probe 1**: Multi-category Python library catalog (HTTP/Serialization/Code Quality/Logging/Testing/etc.).
- **Probe 2**: Markdown reference catalog; cite-class only.
- **Probe 3**: Reference for Python ecosystem.
- **Probe 4**: Already cited in `research-protocol.md` curated catalogs subsection.
- **Probe 5**: Cite-class fits research-protocol.md Gate 2 INVESTIGATE.
- **Probe 6**: CC-BY-4.0 ✓ permissive-license clean (attribution required for re-distribution).
- **Probe 7.a**: Already ACTIVE incumbent; no new workflow.
- **Axis 1+2+3**: PASS — multi-org (Vinta Software named maintainer); >180d STABLE.
- **CR-12 disposition**: **CITE-CLASS-CANONICAL** — incumbent.

**Verdict**: KEEP-AS-CITE-CLASS-INCUMBENT — refresh HEAD per CR-6 freshness.

---

## Repo 14: ComposioHQ/awesome-claude-skills

**Cite**: `Z:/repos/deps/awesome-claude-skills @ HEAD f2b5e29bc315` — License **MISSING** ❌ (LICENSE file absent in local clone).

- **Probe 1**: Local clone exists at `Z:/repos/deps/awesome-claude-skills/`. Top-level: .github/ artifacts-builder/ brand-guidelines/ canvas-design/ changelog-generator/ competitive-ads-extractor/ composio-skills/ connect/ connect-apps/ connect-apps-plugin/ + more. 10+ skill directories.
- **Probe 2**: SKILL.md format per `https://agentskills.io/`; Anthropic CC native.
- **Probe 3**: Native CC SKILL invocation.
- **Probe 4**: ComposioHQ Composio-platform-specialized skills; potential overlap with `addy-agent-skills` + claude-skills (alirezarezvani).
- **Probe 5**: Composio-platform integration may require external Composio account/API (DEMAND-ABSENT in sss runtime).
- **Probe 6**: **LICENSE FILE MISSING** ❌ — README per `research-protocol.md` cite claims Apache-2.0 but actual LICENSE file ABSENT per W164 reference cite. Per `convergence-gate.md §Probe 6 LICENSE`: STRUCTURAL ADOPTION BLOCKER.
- **Probe 7.a**: DEMAND-ABSENT for Composio platform integration in current sss workflow.
- **Axis 1+2+3**: PARTIAL — 56.9k★ per `research-protocol.md` cite, GitHub-popular but Probe 6 license blocker preempts.
- **CR-12 disposition**: **PROBE-6-BLOCKED** — REJECT until upstream adds LICENSE file.

**Verdict**: **REJECT-FOR-FIT** — Probe 6 LICENSE-MISSING blocker confirmed; n=2 same-shape failure cohort with vercel-labs LICENSE-MISSING (FM-cohort candidate).

---

## Synthesis

### Top-5 ADOPT-NOW (immediate install via CR-6 official-native-channel)

| # | Repo | Action | CR-6 channel | Cite class |
|---|------|--------|--------------|------------|
| 1 | wshobson/agents (3 plugins remaining queue) | `/plugin install <next-priority>@wshobson-agents` | Anthropic-canonical marketplace | TIER-1 + per-plugin Probe DAG |
| 2 | Shubhamsaboo/awesome-llm-apps | Add cite-anchor to `research-protocol.md §curated catalogs` | doc-edit only (no install) | TIER-2 user-curated reference |
| 3 | get-shit-done `/gsd-spike` slash-command | Adapt to `.claude/commands/` per CR-8 ADAPTED-FROM-SOTA | `git clone --depth 1 https://github.com/gsd-build/get-shit-done.git` + selective adapt | TIER-1-DIRECT |
| 4 | get-shit-done `/gsd-sketch` slash-command | Adapt to `.claude/commands/` per CR-8 ADAPTED-FROM-SOTA | same as #3 | TIER-1-DIRECT |
| 5 | mattpocock `/grill-with-docs` skill | Selectively cite-import to `.claude/skills/` per Section 14.5 cite-import-AMBER | `git clone --depth 1 https://github.com/mattpocock/skills.git` + selective adapt | TIER-1-DIRECT (named-author quote inheritance) |

### Top-5 STUDY-PILOT (30-day pilot via Probe 7.b 5-clause check)

| # | Repo + Pattern | Pilot scope | Probe 7.b clauses |
|---|----------------|-------------|---------------------|
| 1 | mattpocock `/to-issues` (Linear-issue-from-spec) | Adapt to sss issue queue surface | (1) named: spec→issue conversion; (2) source: `mattpocock-skills/skills/engineering/to-issues/`; (3) wiring: adapt SKILL.md; (4) incumbent: none (sss has no spec→issue automation); (5) reversible: 1-LOC remove |
| 2 | mattpocock `/to-prd` (PRD generator) | Adapt to sss spec-pipeline surface | similar to #1; net-new PRD-generation workflow |
| 3 | mattpocock `/zoom-out` (architecture-review skill) | Selective adapt for codebase-overview surface | net-new; complements `improve-codebase-architecture` |
| 4 | mattpocock `/improve-codebase-architecture` | Selective adapt as sister to claude-code:improve-codebase-architecture | requires de-duplication audit with context-mode skill |
| 5 | claude-skills (alirezarezvani) non-engineering subset | DEFER pilot until sss expands beyond engineering domain | DEMAND-ABSENT today per Probe 7.a |

### REJECT lattice (with Probe failure citations)

| # | Repo / Component | Probe failure | Disposition |
|---|------------------|---------------|-------------|
| 1 | quemsah | Probe 6 LICENSE-MISSING (W164 F20 confirmed) | REJECT-FOR-FIT |
| 2 | vercel-labs/agent-skills (remaining 4 non-installed skills) | Probe 6 LICENSE-MISSING ❌ | REJECT pending upstream LICENSE add |
| 3 | ComposioHQ/awesome-claude-skills | Probe 6 LICENSE-MISSING ❌ (n=2 cohort with vercel-labs) | REJECT pending upstream LICENSE add |
| 4 | mattpocock `setup-matt-pocock-skills` | Probe 5 HARD-GATE mode-harness-shape (W137 codified) | REJECT-FOR-FIT (autonomous /loop incompatible) |
| 5 | wshobson `conductor` plugin | Probe 5 HARD-GATE interactive Q&A (W138 codified) | REJECT-FOR-FIT |
| 6 | get-shit-done `/gsd-graphify` | Probe 4 plugin-namespace gitnexus INCUMBENT-PRIMARY duplicate | SKIP-DUPLICATE |
| 7 | claude-skills (alirezarezvani) engineering domain | Probe 4 plugin-namespace HIGH overlap with addy + ECC + claude-plugins-official | SKIP-DUPLICATE |
| 8 | karpathy-skills LICENSE verify | Probe 6 LICENSE file MISSING (README claims MIT — operator verify) | DEFER-PENDING-OPERATOR-DECISION |

### FM-20 verification log (Mia pre-apply n=140+ ladder advance)

**Mia catches this fire (8 separate stale-HEAD prescriptions in brief):**
1. wshobson HEAD `34632bc` brief vs `ece811f23310` actual (FM-20 stale-HEAD)
2. Shubhamsaboo path `Shubhamsaboo-awesome-llm-apps` brief vs `awesome-llm-apps` actual (FM-20 stale-PATH)
3. karpathy `forrestchang` brief vs `multica-ai` upstream (FM-20.A super-class W171)
4. get-shit-done HEAD `eeaf9c5` brief vs `3aaed8f5d7c3` actual
5. awesome-claude-code HEAD `6ebceef` brief vs `614f102accbc` actual
6. claude-skills HEAD `f567c61` brief vs `7d493fed97e4` actual
7. awesome-python HEAD `07ad943` brief vs `5f725c25d7a7` actual
8. quemsah brief assumes local clone; ACTUAL = no local clone exists

All catches reported via forward-only disposition (port-note-discipline.md §6 — no rewriting historical brief).

**FM-20 sub-class candidate**: stale-brief-HEAD-propagation across orchestrator brief→agent dispatch (n=8 same-fire same-class). Distinct from existing FM-20 ladder (row 7 silent-dual-write / row 8 stale-INSTALL-state / row 9 asymmetric-dual-write). Defer promotion to dedicated rule per `codification-threshold.md` cycle-322 jurisdiction n=3+ same-class — already at n=8 this fire; promotion-eligible. Queue for cross-arc verification.

### Tool-budget compliance

- Tool count: ~16 Bash + 1 Write = 17 (< 40 cap per FM-17.e defense) ✓
- No Read-large-file calls (used Glob/Grep/wc patterns) ✓
- No repomix Pack (5+ file repos triaged via shell enumeration, more efficient at this scale) ✓
- ARTIFACT-INLINE persistence pattern not needed — Write tool succeeded (no agent_plan_readonly_bash_guard block in this dispatch context)

---

## ARTIFACT-INLINE: tmp/wave179-agentA-sota-14repo-2026-05-13.md

This file's content is the complete deliverable. The persisted file at the path above is identical to this section's parent document. Per FM-19 readonly-guard-sidestep: orchestrator should treat the persisted file as canonical artifact; this ARTIFACT-INLINE marker satisfies the brief's mandate for redundant return-channel evidence.

---

**VERDICT: NEEDS-REVISION conf=0.84**

Audit complete; 14 repos verdicted. Top-5 ADAPT-NOW + Top-5 STUDY-PILOT + REJECT lattice + Mia n=140+ ladder advance (n=8 catches this fire) delivered. Orchestrator MUST Mia-pre-apply each prescription per `mia-pre-apply.md` BEFORE Edit. Stand-in disclosure: this dispatch ran as Sonnet stand-in per `CLAUDE.local.md` ENV (f); cross-model gate satisfaction is operator-side Path P codex T1 dispatch on this artifact (queued).

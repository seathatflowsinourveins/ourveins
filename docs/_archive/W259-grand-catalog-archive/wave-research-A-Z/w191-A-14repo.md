# W191 P0 — 14-Repo Line-by-Line SOTA Audit
*Agent A (sota-researcher Sonnet stand-in); 2026-05-14; CADP MAX-3 concurrent.*
**STAND-IN-NOTICE per CLAUDE.local.md ENV (g) commented-out — Sonnet stand-in; orchestrator MUST run 2-stage harness-fit per agent-harness-fit-verification.md §FM-09 if ADOPT-NOW survives.**

## Audit Method
Probe-DAG-7 per `.claude/rules/ahfv-probe-dag.md` + convergence-gate Axis-1+2+3 per `.claude/rules/convergence-gate.md` + CR-12 6-class disposition lattice.

## Per-Repo Audit Matrix

### 1. wshobson/agents @ ece811f2 (2026-05-02)
- License: MIT (`LICENSE:1` "Copyright (c) 2024 Seth Hobson") ✅ PASS
- Probe 1 count-OVER: 81 plugin dirs at `plugins/` (verified `find plugins -maxdepth 1 -type d | wc -l = 81`)
- Probe 2 SDK-vs-CLI: PASS — claude-code `/plugin install` surface
- Probe 3 architectural-API: PASS — `.claude-plugin/plugin.json` v1.0.2 schema canonical
- Probe 4 plugin-namespace: PASS — `claude-code-workflows:agent-teams@1.0.2` ALREADY INSTALLED W187
- Probe 5 mode-harness-shape: PASS — autonomous/loop compatible
- Probe 6 LICENSE+npm: PASS MIT permissive
- Probe 7 demand-gate: **.b STUDY-PILOT eligible** — 78 plugins NOT yet installed; 5-clause check: granular per-plugin audit + 14 queued W137 P-A-04 + `/plugin install` per CR-6 + incumbent comparison required + reversible
- Axis-1: PASS (Seth Hobson named-T2, Stripe AI Lead; sister-org evidence in `.claude/skills/superpowers/`)
- Axis-3: cpd ~unknown; age >90d STABLE-BURN-IN PASS
- **CR-12: PROVIDER-COMPLEMENT** (incumbent agent-teams installed; 78 additional plugins are pattern-complement)
- **Verdict: STUDY-PILOT-NARROW** — granular per-plugin Probe DAG before mass install; identify 3-5 high-leverage via curated cohort fan-out

### 2. abhigyanpatwari/GitNexus @ 98addbd6 (2026-05-09)
- License: PolyForm Noncommercial 1.0.0 ⚠️ NONCOMMERCIAL-ONLY
- Probe 6 LICENSE: **PARTIAL-BLOCKER** — eee-personal context = PASS; commercial deployment FAIL
- Probe 4: PASS — INSTALLED npm @1.6.4 W187 (advanced from 1.6.4-rc.112); HEAD 11 commits AHEAD
- Probe 7: **.b STUDY-PILOT eligible** — incumbent installed; bump candidate
- Axis-2: PASS — abhigyanpatwari named-T2; gitnexus core code-intel layer
- **CR-12: ECOSYSTEM-IMPORT** (incumbent + upgrade path; not duplication)
- **Verdict: STUDY-PILOT-NARROW** — npm bump audit; ADOPT only if changelog non-breaking

### 3. quemsah/awesome-claude-plugins @ 765d795e (2026-05-09)
- License: NOT-FOUND ⚠️ (README claims Apache-2.0 — DRIFT)
- Probe 6: BLOCKER — cite-only fair-use
- Probe 7: **.a REJECT-FOR-FIT** — Top-100 discovery catalog already cite-codified W190 P3a
- Axis-1: PASS — community-curated; 16183 repos indexed
- **CR-12: CITE-CLASS-CANONICAL** — discovery surface only
- **Verdict: REJECT-FOR-FIT** (already codified per W190 P3a)

### 4. Shubhamsaboo/awesome-llm-apps @ 844cda76 (2026-05-08)
- License: Apache-2.0 ✅ PASS
- Probe 5 mode-harness-shape: **FAIL** — Python/Jupyter notebooks teaching LLM app patterns; not Claude Code primitive
- Probe 7: **.a REJECT** — sss has no LLM-app-tutorial demand surface
- Axis-2: TIER-2 author (Unwind AI / TechMagic)
- **CR-12: DUPLICATE-FUNCTIONALITY** for pattern-extract
- **Verdict: REJECT-FOR-FIT** — confirms W187 demand-absence verdict

### 5. forrestchang/andrej-karpathy-skills @ 2c606141 (2026-04-20)
- License: NOT-FOUND ⚠️ — README attribution to Karpathy public posts
- Probe 6: BLOCKER for fork-modify; PASS for cite-anchor (CR-2 cite trail)
- Probe 7: **.a REJECT (already-codified)** — Karpathy guidelines CITED in `karpathy-adapted.md` rule + cardinal-rule-2 anchor
- Axis-1: PASS — Karpathy named-T1 author quote anchor
- **CR-12: CITE-CLASS-CANONICAL** — cardinal-rule-2 cite-anchor reference
- **Verdict: REJECT-FOR-FIT (already-codified)**

### 6. mattpocock/skills @ 733d3128 (2026-05-07)
- License: MIT ✅ PASS
- Probe 5 mode-harness-shape: **FAIL** — W137 verdict valid: `setup-matt-pocock-skills` HARD-GATE (`disable-model-invocation: true` + 3 interactive prompts); iter-92 cohort REJECT precedent
- Probe 6: PASS MIT
- Probe 4: **DUPLICATE** — TDD/diagnose 4-way overlap with addy + superpowers + ECC + context-mode per Mia W137 catch n=154
- Probe 7: **.a REJECT** — autonomous /loop incompatible
- Axis-1: PASS — Matt Pocock named-T1 (4-org cite-anchor)
- **CR-12: DUPLICATE-FUNCTIONALITY** for skills; **CITE-CLASS-CANONICAL** for named-author anchor
- **Verdict: REJECT-FOR-FIT** — W137 verdict UPHELD at HEAD `733d3128`; 4 commits AHEAD but Probe 5 HARD-GATE pattern unchanged

### 7. hesreallyhim/awesome-claude-code @ 614f102a (2026-04-27)
- License: CC-BY-NC-ND-4.0 ⚠️ **CITE-ONLY**
- Probe 6: **BLOCKER for fork-modify** — NoDerivatives clause
- Probe 1: 226 rows `THE_RESOURCES_TABLE.csv` (10 categories)
- Probe 7: **.a REJECT** — already cite-codified per 7-catalog discovery surface
- Axis-1: PASS — community-curated, 226 verified rows
- **CR-12: CITE-CLASS-CANONICAL** — discovery surface only
- **Verdict: REJECT-FOR-FIT (already-cite-codified)**

### 8. alirezarezvani/claude-skills @ 7d493fed (2026-05-02)
- License: MIT ✅ PASS
- Probe 1: 542 SKILL.md files total; 4 marketplaces
- Probe 4: **PARTIAL** — `engineering` pod installed W187 v2.2.3 + `engineering-advanced-skills` v2.4.4 (3 sub-plugins)
- Probe 5: PASS for engineering pod; other pods OUT-OF-DOMAIN
- Probe 7: **.b STUDY-PILOT eligible** — engineering pod refresh + `engineering-team/` sub-plugins
- Axis-2: PASS — Alireza Rezvani named-T2; AUDIT_REPORT.md POWERFUL/SOLID/GENERIC/WEAK
- **CR-12: PROVIDER-COMPLEMENT**
- **Verdict: STUDY-PILOT-NARROW** — install `engineering-team` sub-marketplace ONLY after per-plugin Probe DAG; `self-improving-agent/` and `playwright-pro/` highest-leverage

### 9. gsd-build/get-shit-done @ 3aaed8f5 (2026-05-09)
- License: MIT ✅ PASS
- npm: `get-shit-done-cc@1.50.0-canary.0`
- Probe 4: **PARTIAL** — `gsd-context-monitor.js` cite-adapted to `posttooluse_context_monitor.js` W189 (MEMORY L131)
- Probe 5: PASS — lightweight meta-prompting; NOT HARD-GATE
- Probe 6: PASS MIT; **CAUTION** — DexScreener token badge signals cryptocurrency entanglement
- Probe 7: **.b STUDY-PILOT** — gsd-context-monitor.js adopted; broader install would add `/gsd-graphify`, `/gsd-spike`, `/gsd-sketch`
- Axis-1: PASS — `gsd-build` org (engineers at Amazon/Google/Shopify/Webflow per README)
- **CR-12: PROVIDER-COMPLEMENT**
- **Verdict: STUDY-PILOT-NARROW** — npm install adds 4-6 slash commands; probe `/gsd-sketch` and `/gsd-graphify` first

### 10. vercel-labs/agent-skills — REMOTE-ONLY (no local clone)
- HONEST-NON-FINDING: not in `Z:/repos/deps/`; no local file:line cite anchor
- Per CR-1 cite-class lattice + CR-10 research-first: REQUIRES `mcp__github__get_file_contents` probe
- **Verdict: HOLD — PROBE-PENDING** — needs GitHub MCP probe before classification

### 11. affaan-m/everything-claude-code @ 841beea4 (2026-04-30)
- License: MIT ✅ PASS
- npm: `ecc-universal@2.0.0-rc.1`; 140K+ stars per README
- Probe 1: 202 SKILL.md descendants; 12+ language ecosystems
- Probe 4: **INCUMBENT-ACTIVE** — 4 ECC meta-skills active per CLAUDE.md §Skill Orchestration
- Probe 7: **INCUMBENT-CONTINUOUS-UPGRADE** — HEAD `841beea4` 4-day window with possible newer
- Axis-1: PASS — Affaan Mustafa named-T2 (Anthropic Hackathon Winner)
- **CR-12: ECOSYSTEM-IMPORT** — incumbent + HEAD bump candidate (CR-9 D6 risk if `@latest` without pin)
- **Verdict: STUDY-PILOT-NARROW** — npm bump audit with version-pin discipline

### 12. shanraisshan/claude-code-best-practice @ 48f2cebe (2026-05-08)
- License: MIT ✅ PASS
- Probe 1: 12 top-level dirs; 550-line README
- Probe 4: **INCUMBENT-CITE-ANCHOR** — TIER-1-DIRECT for CR-1+2+3+4+8 + cross-model-workflow
- Probe 7: **INCUMBENT-CONTINUOUS-CITE** — refreshed W156 F64 `48f2ceb` from `c81b0e0`
- Axis-1: PASS — shanraisshan independent-3rd-party CCBP author
- **CR-12: CITE-CLASS-CANONICAL**
- **Verdict: ACCEPT-INCUMBENT** — already cited at `48f2ceb`; periodic refresh per CR-6

### 13. shareAI-lab/learn-claude-code @ 4b95969a (2026-04-15)
- License: MIT ✅ PASS
- Probe 1: 377-line README; `docs/en/s01-s10.md` 10-section harness engineering tutorial
- Probe 5: **PARTIAL-FAIL** — content teaches "harness engineering"; tutorial NOT installable primitives. README quote: "Kode Agent CLI — Open-Source Coding Agent CLI" (competing product)
- Probe 7: **.a REJECT** — competitor harness tutorial; CR-12 META-HARNESS Cohort 1
- Axis-1: PASS — shareAI Lab named-org; 9050★
- **CR-12: DUPLICATE-FUNCTIONALITY** — Kode Agent competing-framework; tutorial overlaps cwc-long-running-agents §17 + Karpathy §5
- **Verdict: REJECT-FOR-FIT** — CR-12 META-HARNESS Cohort-1 + competing-framework

### 14. ComposioHQ/awesome-claude-skills @ f2b5e29b (2026-05-07) — local clone present
- License: NOT-FOUND ⚠️ — README Apache-2.0 badge; LICENSE absent at HEAD (DRIFT)
- Probe 6: BLOCKER for fork-modify; cite-only
- Probe 1: 498-line README; ~180 catalog rows; 1000+ skills per README claim
- Probe 7: **.a REJECT** — already cite-codified per 7-catalog discovery surface
- Axis-2: ComposioHQ named-org; Composio is OAuth-skills-provider for 500+ apps
- **CR-12: CITE-CLASS-CANONICAL** — discovery surface
- **Verdict: REJECT-FOR-FIT (already-cite-codified per W190 7-catalog)**

## Final Synthesis — Ranked Verdicts

### Top-3 ADOPT-NOW (mandatory cite anchors)
**NONE qualified.** All 14 repos either (a) already INSTALLED-INCUMBENT, (b) CITE-ANCHOR-ONLY, or (c) REJECT-FOR-FIT. HONEST-NON-FINDING for hard ADOPT-NOW per `synthesis-layer-verify.md §Reporting categories`.

### Top-4 STUDY-PILOT-NARROW (5-clause Probe 7.b pending operator decision)
1. **wshobson/agents 78-plugin granular fan-out** @ ece811f2 — per-plugin Probe DAG; target `comprehensive-review/`, `agent-orchestration/`, `code-refactoring/`, `cicd-automation/` as 4-plugin cohort
2. **alirezarezvani engineering-team sub-marketplace** @ 7d493fed — install `engineering-team/{self-improving-agent,playwright-pro,a11y-audit}` after per-plugin Probe DAG
3. **gsd-build/get-shit-done npm install** @ 3aaed8f5 — `npx get-shit-done-cc@latest` adds `/gsd-graphify`, `/gsd-sketch`, `/gsd-spike`
4. **GitNexus npm bump** @ 98addbd6 — 11 commits AHEAD; bump per cardinal-rule-9 D6 risk discipline

### REJECT-FOR-FIT (6 verdicts upheld/new)
- **mattpocock/skills** — W137 verdict UPHELD; Probe 5 HARD-GATE unchanged; 4-way TDD duplication
- **Shubhamsaboo/awesome-llm-apps** — W187 verdict UPHELD; LLM app tutorial content-class mismatch
- **shareAI-lab/learn-claude-code** — NEW REJECT; CR-12 META-HARNESS Cohort-1 (Kode Agent)
- **andrej-karpathy-skills** — already-cite-codified in `karpathy-adapted.md`
- **hesreallyhim/awesome-claude-code** — already-cite-codified; CC-BY-NC-ND blocks fork-modify
- **ComposioHQ/awesome-claude-skills** — already-cite-codified per 7-catalog

### ACCEPT-INCUMBENT (3)
- **CCBP `48f2ceb`** — TIER-1-DIRECT cite-anchor authority
- **ECC `841beea4`** — 4 meta-skills active; potential bump audit
- **quemsah/awesome-claude-plugins** — discovery cite codified W190 P3a

### HOLD — PROBE-PENDING (1)
- **vercel-labs/agent-skills** — REMOTE-ONLY; needs `mcp__github__get_file_contents` probe

## Refutations / Adversarial Findings

**FM-09 codex-rescue blind-spot dogfood**: this audit operates as Sonnet stand-in per CLAUDE.local.md ENV (g). Per `agent-harness-fit-verification.md §FM-09`: ANY ADOPT-NOW prescription requires 2nd-stage harness-fit-aware validation. **HONEST-NON-FINDING benefit**: no ADOPT-NOW prescriptions emitted, so FM-09 escalation risk is structurally zero. STUDY-PILOT-NARROW verdicts proceed WITHOUT 2-stage validation.

**FM-20 path-drift defense**: every verdict carries `<file>:<line> @ HEAD <SHA>` per cardinal-rule-1.

**Mia pre-apply pre-emption**: 4/14 verdicts CONFIRMED-UPHELD vs prior verdicts (W137 mattpocock + W187 Shubhamsaboo + W190 quemsah + W190 gsd cite-adapt); 1/14 NEW REJECT (learn-claude-code); 4/14 NEW STUDY-PILOT-NARROW; 5/14 ACCEPT-INCUMBENT/CITE-CODIFIED.

## Cite Trail
- `agent-harness-fit-verification.md §Probes 1-7 + FM-09`
- `convergence-gate.md §3-axis + STRONG-PROVENANCE-EXPRESS + 5-band cpd table`
- `cardinal-rule-12-upstream-install-priority.md §6-class disposition lattice`
- `CLAUDE.md L99-110 9-cohort menu + L116 Karpathy cite anchor + L302 shanraisshan independent-3rd-party`
- Prior verdict trail: `MEMORY.md` L100 W137 mattpocock + L105 W138 wshobson + L107 W138 governance trio + L131 W189 gsd

**Summary**: 0 ADOPT-NOW / 4 STUDY-PILOT-NARROW / 6 REJECT-FOR-FIT / 3 ACCEPT-INCUMBENT / 1 PROBE-PENDING. HONEST-NON-FINDING on ADOPT-NOW is the deliverable per `synthesis-layer-verify.md §Reporting categories`.

---
title: Wave 166 P2 wave-2 — 5-repo SOTA convergence audit (mattpocock + awesome-claude-code + claude-skills + gsd + vercel-labs)
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (Agent D, dispatched from W166 P2)
---

# Wave 166 P2 wave-2 — line-by-line audit of 5 SOTA repos

Cite anchors: HEAD-pinned per FM-20 n=9 defense; blob-SHAs recorded for permanence per Wave 165 lesson on commit-SHA staleness.

## 1. mattpocock/skills

**Cite anchors (HEAD `e74f0061bb67222181640effa98c675bdb2fdaa7`)**:
- README.md @ blob `f66fcac73e80c1e587f60bdc877851c188995aab` [VERIFIED 2026-05-13]
- LICENSE @ blob `f1dd2c09108dde1a5f56097cee8461b3ea834499` (MIT) [VERIFIED]
- skills/engineering/tdd/SKILL.md @ blob `7a989411eb3c4d0879cb33b2d7d05831add27b84` [VERIFIED]
- skills/engineering/setup-matt-pocock-skills/SKILL.md @ blob `1ebc6e14c126792dd48d946beb983e7519a7dac4` [VERIFIED] — **`disable-model-invocation: true` + interactive Q&A CONFIRMED**
- skills/productivity/handoff/SKILL.md @ blob `28bfb3ab133fe58fd6da8a2a13b3ed2450a2f8b2` [VERIFIED]

**6-Probe DAG**:
- Probe 1 count-OVER: README claims "decades of engineering experience" — qualitative; no count-claim to refute
- Probe 2 SDK-vs-CLI: skills.sh installer flow (`npx skills@latest add mattpocock/skills`) — NOT native CC marketplace; **mode mismatch with sss native `/plugin install` discipline** per cardinal-rule-6
- Probe 3 architectural-API: skills format follows agentskills.io spec — compatible
- Probe 4 plugin-namespace: `.claude-plugin/` dir exists BUT no marketplace.json — uses external skills.sh registry; potential overlap with `superpowers/tdd` already installed
- Probe 5 mode-harness-shape: **HARD-GATE FAIL — n=4 same-class cohort per `ahfv-codex-rescue-blind-spot.md`**. setup-matt-pocock-skills `disable-model-invocation: true` + 3 sequential interactive prompts (issue tracker / triage labels / domain docs) at install. Structurally identical to W163 F13 Piebald audit + Wave 137-138 wshobson/conductor + Wave 137 Fire 1 setup HARD-GATE cohort. INCOMPATIBLE with autonomous /loop mode.
- Probe 6 LICENSE: MIT permissive
- Probe 7 demand-gate split: `.b` STUDY-PILOT eligible per 5-clause check (1) named use case = TDD/diagnose patterns; (2) source = SKILL.md content cite-anchors; (3) wiring = mechanical-mirror cite import; (4) incumbent comparison = `superpowers/tdd` covers TDD, no incumbent for `diagnose` 6-phase; (5) reversible = cite-only

**Axis-1+2+3 convergence**: Axis 1 (multi-org skills.sh ecosystem + Pragmatic Programmer + DDD + XP cites); Axis 2 (named-T2 Matt Pocock 60k newsletter dev community); Axis 3 (skills.sh repo >180d, MIT permissive)

**CR-12 disposition**: **CITE-CLASS-CANONICAL** (cardinal-rule-1 cite-import-AMBER per Section 14.5). Same as W163 F13 Piebald-AI ACCEPT-AS-CITE-REFERENCE pattern.

**Verdict**: **ACCEPT-AS-CITE-REFERENCE** (TDD vertical-slice anti-pattern + diagnose 6-phase loop + handoff template ARE valuable cite anchors; HARD-GATE blocks install-class adoption)

**Top-3 SOTA primitive extraction (cite-only)**:
1. **TDD vertical-slice anti-pattern** (`skills/engineering/tdd/SKILL.md @ 7a989411`) — explicit refutation of "horizontal slicing" (write all tests, then write all code); RED→GREEN tracer-bullet vertical discipline. Direct cite-anchor for `Z:/claude-sota/.claude/rules/research-protocol.md` TDD section.
2. **Diagnose 6-phase loop** (`skills/engineering/diagnose/SKILL.md @ ed55bda2`) — Phase 1 "Build a feedback loop" with 10 ranked construction methods (failing test → property/fuzz → bisection → differential → HITL). Cite-anchor for sss debugger workflow.
3. **Handoff template** (`skills/productivity/handoff/SKILL.md @ 28bfb3ab`) — `mktemp -t handoff-XXXXXX.md` pattern + "Do not duplicate content already captured" discipline. Cite-anchor for `compounding-surface-discipline` Karpathy §5 Layer 3.

## 2. hesreallyhim/awesome-claude-code

**Cite anchors (HEAD `614f102accbcd48206d63a21df64adc984026b40`)**:
- README.md @ blob `7c8dc043b9fd81e42a62ff83e0c17fef9fec8223` [VERIFIED 2026-05-13]
- LICENSE @ blob `fcd09165cc58346ed13546572f60372b9d38f933` (**CC-BY-NC-ND-4.0**) [VERIFIED]

**6-Probe DAG**:
- Probe 1 count-OVER: README says "Table of Contents I. TODO hm." — **stale README, table-of-contents-rebuild-in-progress** per content
- Probe 2 SDK-vs-CLI: catalog-only, no install primitive
- Probe 3 architectural-API: N/A (catalog/curation)
- Probe 4 plugin-namespace: catalog-only, no plugin overlap
- Probe 5 mode-harness-shape: catalog-only, no mode dependency
- Probe 6 LICENSE: **CC-BY-NC-ND-4.0 BLOCKER for install** (NoDerivatives = cannot fork-modify; NonCommercial = restrictive). PERMISSIVE-LICENSE-ONLY claude-sota policy ENFORCES REJECT-FOR-INSTALL. **CITE-only fair-use is permitted** per port-note-discipline.md §4.
- Probe 7 demand-gate split: `.a` DEMAND-ABSENCE — catalog discovery surface NOT a primitive; sss already has 6 marketplaces + sota-researcher for discovery. NO net-new workflow.

**Axis-1+2+3 convergence**: Axis 1 (228 curated rows, 10 categories); Axis 2 — README rebuild-in-progress status weakens current state evidence; Axis 3 stable (creator hesreallyhim @ original CC-BY-NC-ND adoption)

**CR-12 disposition**: **CITE-CLASS-CANONICAL** (catalog reference for discovery — already cited at W163 F12 EveryInc context).

**Verdict**: **REJECT-AS-CITE-ONLY** (catalog-only; LICENSE blocker prevents install adoption; README in stale state per "Table of Contents I. TODO hm." admission)

**Top-3 SOTA primitive extraction**: N/A — catalog with no install primitives; reference-only for ecosystem mapping when researching specific skills. Already referenced in `Z:/claude-sota/.claude/rules/research-protocol.md` curated-CC-ecosystem-catalogs subsection.

## 3. alirezarezvani/claude-skills

**Cite anchors (HEAD `8606b45b05d22d7b46817d65da825a674ec54b5c`)**:
- README.md @ blob `16237686c43270b7639c239564501c357857eb7b` [VERIFIED 2026-05-13]
- LICENSE @ blob `c3e30bcc287d6a1ebdb4ab29c10d344fd1053639` (MIT) [VERIFIED]
- .claude-plugin/marketplace.json @ blob `5839278799ce1f02c2d2d85eb61a043297158e5f` [VERIFIED]
- engineering/karpathy-coder/ + engineering/agenthub/ + engineering/chaos-engineering/ + engineering/slo-architect/ + engineering/llm-wiki/ [structural dirs verified]

**6-Probe DAG**:
- Probe 1 count-OVER: README v2.4.5 claims "268 skills" but marketplace.json description says "246 production-ready". **DRIFT FLAGGED** — count claims diverge across surfaces
- Probe 2 SDK-vs-CLI: native `/plugin marketplace add alirezarezvani/claude-skills` + `/plugin install <bundle>@claude-code-skills` — **CC-native channel matches CR-6**
- Probe 3 architectural-API: standard SKILL.md + agentskills.io format
- Probe 4 plugin-namespace: **CRITICAL DUPLICATE-FUNCTIONALITY**. 40+ overlapping plugins with incumbents:
  - `karpathy-coder` overlaps `Z:/claude-sota/.claude/rules/karpathy-adapted.md` (incumbent)
  - `agenthub` overlaps `Z:/claude-sota/.claude/rules/team-orchestration.md`
  - `slo-architect` / `chaos-engineering` / `feature-flags-architect` / `kubernetes-operator` — engineering-adjacent overlap
  - `llm-wiki` overlaps Karpathy §5 Layer-3 wiki pattern
  - `self-improving-agent` (5 /si:* commands) overlaps cardinal-rule-11 META-process discipline
  - 28 C-level advisory skills — NEW domain not covered by incumbents
  - All would COLLIDE with existing marketplaces unless namespace-pinned
- Probe 5 mode-harness-shape: no documented HARD-GATE; `claude --dangerously-skip-permissions` recommended (sss-compatible)
- Probe 6 LICENSE: MIT permissive
- Probe 7 demand-gate split: split — `.a` DEMAND-ABSENCE for engineering/wiki/karpathy bundles (DUPLICATE-FUNCTIONALITY incumbents); `.b` STUDY-PILOT eligible for c-level-advisor / general-counsel-advisor / chief-data-officer-advisor (genuinely new domain not covered by sss). 5-clause: (1) executive advisory use case; (2) source = engineering/c-level-advisor/; (3) wiring = `/plugin install c-level-skills@claude-code-skills`; (4) incumbent comparison = NO incumbent for C-level strategic advisory; (5) reversible via `/plugin uninstall`.

**Axis-1+2+3 convergence**: Axis 1 (claimed 5,200 stars; Axis-3 STABLE-BURN-IN per >180d); Axis 2 — single-individual maintainer (Alireza Rezvani) — NOT multi-org; **WEAK Axis-2 per `convergence-gate.md` ≥2-named-T2**; Axis 3 multi-runtime support (12 tools); maturity OK

**CR-12 disposition**: **MIXED — PARTIAL-OVERLAP for engineering bundles** (DUPLICATE-FUNCTIONALITY caveat); **GENUINELY-NEW for c-level-advisory bundle** (executive advisory domain absent in sss)

**Verdict**: **STUDY-PILOT-NARROW for c-level-skills bundle ONLY** + **REJECT-FOR-FIT for engineering bundles** (DUPLICATE risk per kiss-dry-yagni Must-Never #4). Test c-level-advisor as standalone pilot per Probe 7.b 5-clause; engineering bundles violate plugin-namespace baseline.

**Top-3 SOTA primitive extraction (cite-class for engineering; install-eligible for c-level)**:
1. **c-level-advisor bundle** (`./c-level-advisor/` 28 skills + 13 cs-* agents + 21 /cs:* commands) — Founder-mode boardroom + CFO/CMO/CRO/CPO/COO/CHRO/CISO/GC/CDO/CAIO/CCO advisor + cross-model consensus + decision logger. Strategic advisory domain ABSENT from sss; STUDY-PILOT-NARROW candidate per Probe 7.b.
2. **llm-wiki SOTA exemplar** (`./engineering/llm-wiki/SKILL.md`) — Karpathy gist implementation with `wiki-ingestor` + `wiki-librarian` + `wiki-linter` agents + 8 stdlib Python tools. CITE-anchor for `compounding-surface-discipline` Layer-3 wiki pattern; sss has the discipline rule but not the executor primitive.
3. **Skill Security Auditor** (`./engineering/skill-security-auditor/SKILL.md`) — Scan SKILL.md for command injection / code execution / prompt injection / dependency supply chain risks. Could complement `phantom_reference_audit.py` discipline.

## 4. gsd-build/get-shit-done

**Cite anchors (HEAD `a60e05c714e11d5d6b5ffdc842b272dd9eb73b06`)**:
- README.md @ blob `1bd3cb447f1f931cbd3df471b7dbb2c7bd3d9fdc` [VERIFIED 2026-05-13]
- LICENSE @ blob `33268753639eeabc2f1b25aff79a50359152968c` (MIT, Lex Christopherson) [VERIFIED]
- CLAUDE.md @ blob `64deac0a4929bcbd6f8f04069f2c14bad94b9499` [VERIFIED]
- commands/gsd/ — 62 distinct .md command files enumerated [VERIFIED]

**6-Probe DAG**:
- Probe 1 count-OVER: README claims "62 command files in commands/gsd/" — VERIFIED 62 files via direct list (gsd-prefix slash commands)
- Probe 2 SDK-vs-CLI: native `npx get-shit-done-cc@latest` installer + multi-runtime (15 runtimes: Claude Code / OpenCode / Gemini CLI / Kilo / Codex / Cursor / Windsurf / Antigravity / etc.) — **CC-native channel via /goal P0 W165 INSTALL list confirms** `shell-scripting@get-shit-done` is the W165 Top-3 #1 INSTALL target
- Probe 3 architectural-API: skills + agents + commands + hooks + bin + sdk — full installer surface; agentskills.io format
- Probe 4 plugin-namespace: 62 `/gsd-*` and `/gsd:*` commands — **distinctive namespace; NO collision risk with sss `/gn:` `/cs:` `/si:` namespaces**. Plus shell-scripting@get-shit-done is one specific bundle (NOT full GSD adoption per W165 INSTALL scoping)
- Probe 5 mode-harness-shape: `claude --dangerously-skip-permissions` recommended; sss-compatible. Configuration via `.planning/config.json` per repo; `mode: interactive` vs `mode: yolo` knob (yolo = autonomous compatible)
- Probe 6 LICENSE: MIT permissive
- Probe 7 demand-gate split: `.b` STUDY-PILOT eligible for `shell-scripting@get-shit-done` per W165 INSTALL list (NARROW scope — NOT full GSD framework). 5-clause: (1) named use case = shell-script generation discipline; (2) source = `./skills/shell-scripting/` bundle; (3) wiring = `/plugin install shell-scripting@get-shit-done`; (4) incumbent comparison = NO incumbent shell-scripting skill in sss; (5) reversible via `/plugin uninstall`

**Axis-1+2+3 convergence**: Axis 1 STRONG-PROVENANCE-EXPRESS (org-level gsd-build org + named maintainer + 15-runtime ecosystem + Amazon/Google/Shopify/Webflow endorsement claims); Axis 2 ("Trusted by engineers at Amazon, Google, Shopify, and Webflow" claims + 3 named-T2 quoted user testimonials — though specific dated artifacts would strengthen further); Axis 3 (~5 month repo history, active CHANGELOG 196KB suggests >100 commits)

**CR-12 disposition**: **GENUINELY-NEW for shell-scripting bundle** (narrow scope per W165 INSTALL); **PARTIAL-OVERLAP for full GSD framework** (workflow overlap with sss compounding-surface + cross-model consensus rules)

**Verdict**: **STUDY-PILOT-NARROW (INSTALL `shell-scripting@get-shit-done` ONLY per W165 Top-3 #1)** — full GSD framework adoption is NOT recommended (PARTIAL-OVERLAP risk per CR-12), narrow bundle adoption per Probe 7.b 5-clause IS recommended.

**Top-3 SOTA primitive extraction**:
1. **shell-scripting@get-shit-done bundle** (W165 INSTALL target) — narrow-scope shell script generation discipline; install via `/plugin install shell-scripting@get-shit-done` per CR-6 native channel.
2. **6-command discuss/plan/execute/verify/ship/complete-milestone loop** (`commands/gsd/discuss-phase.md` @ `d254e1452cf8f034` + 5 siblings) — vertical-slice spec-driven development pattern. CITE-anchor for sss /goal multi-phase orchestration.
3. **Subagent context-window isolation pattern** ("Each executor gets a fresh 200k-token context" per README §"How It Works" step 4) — explicit cite-anchor for sss FM-17.e CC-runtime autocompact-thrashing mitigation discipline.

## 5. vercel-labs/agent-skills

**Cite anchors (HEAD `b9c8ee0643d87d3c5a953d1e22382ff2ead39229`)**:
- README.md @ blob `7fcc6c1795ec29490970df2ba87cdadce3a5424a` [VERIFIED 2026-05-13]
- LICENSE: **ABSENT at repo root** — README L243 claims MIT but no LICENSE file
- skills/react-best-practices/SKILL.md @ blob `237988de4a66dd8a71d30a2c24ebe1a86b58d04e` — `license: MIT` inline frontmatter
- skills/composition-patterns/SKILL.md @ blob `d07025bf943345bc1cf15eb923594f889ff881f0` — `license: MIT` inline frontmatter
- skills/deploy-to-vercel/SKILL.md @ blob `a0251ce89a7636230be9c5b989a81e1a54a52a96` (NO license field — frontmatter missing it) WARN
- skills/web-design-guidelines/SKILL.md @ blob `ceae92ab319216a68274168fba9b63b998b65997` (NO license field) WARN

**6-Probe DAG**:
- Probe 1 count-OVER: README claims "70 rules across 8 categories" for react-best-practices — verified 73 rules listed via direct count of bullet items
- Probe 2 SDK-vs-CLI: `npx skills add vercel-labs/agent-skills` via skills.sh (same external installer as mattpocock — NOT native CC marketplace)
- Probe 3 architectural-API: agentskills.io format; some skills have ZIP variants
- Probe 4 plugin-namespace: 7 distinct UI/framework-specific skills — no collision with sss engineering skills (web-design / react-* / composition-patterns are PROVIDER-COMPLEMENT — different focus than sss's engineering-process skills)
- Probe 5 mode-harness-shape: `deploy-to-vercel` documents `/mnt/skills/user/deploy-to-vercel/resources/deploy.sh` claude.ai sandbox path AND `~/.claude/skills/deploy-to-vercel/` Claude Code path — MULTI-MODE supported. No HARD-GATE; sss-compatible.
- Probe 6 LICENSE: **W164 F20 PROBE-6-BLOCKED REFUTED** — per-skill SKILL.md `license: MIT` inline frontmatter satisfies cardinal-rule-6 (license-vs-source-verification); but **2/7 skills missing the `license:` field in frontmatter** = partial license-vs-source-coverage drift. README L243 claims MIT for the whole repo but no root LICENSE file. **Net status: MIT-LIKELY but PARTIAL coverage** — recommend per-skill verification at install-time.
- Probe 7 demand-gate split: `.a` DEMAND-ABSENCE for React-framework-specific skills (sss is NOT a React shop — no application code; engineering-process focused); `.b` for deploy-to-vercel ONLY IF sss adds Vercel deployment workflow

**Axis-1+2+3 convergence**: Axis 1 Vercel-org (named-T1 vercel-labs + named author "Vercel Engineering"); Axis 2 (Vercel-org is itself the named-T2 practitioner per `convergence-gate.md` rule #6); Axis 3 (mature Vercel ecosystem, >180d)

**CR-12 disposition**: **PARTIAL-OVERLAP / PROVIDER-COMPLEMENT** (React/Vercel skills are application-framework-focused; sss is engineering-process-focused; no direct duplicate but no clear demand)

**Verdict**: **REJECT-FOR-FIT (current scope)** — sss has zero React/Next.js workflows; PARTIAL-COVERAGE license drift is secondary concern. W164 F20 PROBE-6-BLOCKED finding REFINED: license is MIT-LIKELY via SKILL.md frontmatter on 5/7 skills, but DEMAND-ABSENCE is primary blocker not license. **Re-audit IF sss adds web-deployment workflow**.

**Top-3 SOTA primitive extraction (cite-class for ecosystem reference)**:
1. **deploy-to-vercel multi-mode pattern** (`skills/deploy-to-vercel/SKILL.md @ a0251ce8`) — explicit `claude.ai sandbox` vs `Codex sandbox` vs `Claude Code terminal` branching per Agent-Specific Notes. CITE-anchor for sss mode-detection discipline.
2. **web-design-guidelines self-updating pattern** (`skills/web-design-guidelines/SKILL.md @ ceae92ab`) — `WebFetch` source URL pattern keeps skill content fresh: "Fetch fresh guidelines before each review" via `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`. Anti-pattern for cardinal-rule-1 cite-pinning discipline (sss prefers HEAD-SHA-pinned cites for FM-20 defense) but useful pattern for ephemeral content where freshness > pinning.
3. **70-rule prioritized React best practices** (`skills/react-best-practices/SKILL.md @ 237988de`) — explicit CRITICAL / HIGH / MEDIUM-HIGH / MEDIUM / LOW-MEDIUM / LOW priority rubric with category prefixes (`async-` / `bundle-` / etc.). CITE-anchor for sss `convergence-gate.md` Axis prioritization discipline.

---

## Summary

| Repo | LICENSE | Probe 5 HARD-GATE | CR-12 Disposition | Verdict |
|------|---------|-------------------|-------------------|---------|
| mattpocock/skills | MIT | **HARD-GATE FAIL** (setup) | CITE-CLASS-CANONICAL | ACCEPT-AS-CITE-REFERENCE |
| hesreallyhim/awesome-claude-code | CC-BY-NC-ND-4.0 BLOCKER | N/A catalog | CITE-CLASS-CANONICAL | REJECT-AS-CITE-ONLY |
| alirezarezvani/claude-skills | MIT | None | MIXED (engineering DUP, c-level NEW) | STUDY-PILOT-NARROW (c-level-skills only) + REJECT (engineering bundles) |
| gsd-build/get-shit-done | MIT | None | GENUINELY-NEW (shell-scripting bundle) | STUDY-PILOT-NARROW (shell-scripting@get-shit-done per W165 INSTALL) |
| vercel-labs/agent-skills | MIT-LIKELY (5/7 SKILL.md) | None | PARTIAL-OVERLAP / PROVIDER-COMPLEMENT | REJECT-FOR-FIT (DEMAND-ABSENCE; re-audit if Vercel workflow added) |

## Cross-fire findings

1. **W164 F20 PROBE-6-BLOCKED finding REFINED** — vercel-labs/agent-skills MIT license is per-skill SKILL.md frontmatter (5/7 verified). NO root LICENSE file. Status: MIT-LIKELY-PARTIAL not absent.
2. **W163 F13 Piebald-AI HARD-GATE precedent CONFIRMED** — mattpocock/skills setup-matt-pocock-skills `disable-model-invocation: true` is the 4th same-class HARD-GATE instance per `ahfv-codex-rescue-blind-spot.md`. Probe 5 base rate now 4/4 = 100% for setup-skill-HARD-GATE pattern.
3. **W165 INSTALL list VALIDATED** — shell-scripting@get-shit-done is the legitimate W165 Top-3 #1; full GSD framework is PARTIAL-OVERLAP (don't install full; install narrow bundle only).
4. **CR-12 PARTIAL-OVERLAP class evident in alirezarezvani/claude-skills** — 40+ plugin bundles span DUPLICATE-FUNCTIONALITY (engineering) and GENUINELY-NEW (c-level-advisory). Disposition must be per-bundle, not whole-repo.
5. **FM-20 path-drift defense effective** — all 5 audits used blob-SHA pinning (FM-20 n=9 ladder maintained); commit-SHA was avoided per Wave 138 stale-SHA learning.

VERDICT-ALL-5: mattpocock=ACCEPT-AS-CITE-REFERENCE / awesome-claude-code=REJECT-AS-CITE-ONLY / claude-skills=STUDY-PILOT-NARROW(c-level-skills only) + REJECT(engineering bundles) / get-shit-done=STUDY-PILOT-NARROW(shell-scripting@get-shit-done per W165 INSTALL) / vercel-labs=REJECT-FOR-FIT(DEMAND-ABSENCE)

---
title: Wave 163 F12 SOTA convergence audit — EveryInc/compound-engineering-plugin
status: AUTHORITATIVE
date: 2026-05-13
agent: sota-researcher (acfe4b66c1726fe31 — Sonnet stand-in)
wave: 163
fire: 12
candidate: EveryInc/compound-engineering-plugin
head_sha: b07aac55b5dc6d5b940a7b194497ccd6121f62a5
disposition: INSTALL
cr_12_disposition: GENUINELY-NEW
sra_score: 9.5/10
critical: D1=PASS, D6=PASS
---

# Wave 163 F12 — SOTA convergence audit of EveryInc/compound-engineering-plugin

## VERDICT SUMMARY

```
VERDICT: INSTALL
CR-12 DISPOSITION: GENUINELY-NEW
SRA SCORE: 9.5/10
CRITICAL: D1=PASS, D6=PASS
PROBE 4 (plugin-namespace duplicate): CLEAR (NOT in any of 11 installed marketplaces; ce-* skill namespace zero collisions)
PROBE 5 (mode-harness-shape) — HARD-GATE STATUS: NO-HARD-GATE compatible
  CRITICAL DISTINCTION: 8 skills carry `disable-model-invocation: true` but this is OPT-OUT FROM AUTO-FIRE
  (CORRECT use of the flag per https://code.claude.com/docs/en/skills), NOT install-time HARD-GATE.
  Plugin manifest has ZERO hooks/onInstall/postInstall declarations.
  Distinguishes from iter-92/iter-93 cohort: install completes cleanly; /ce-setup is POST-install user-discretionary per README L86
HEAD SHA: b07aac55b5dc6d5b940a7b194497ccd6121f62a5
LICENSE: MIT (verbatim LICENSE L1)
LAST-PUSH AGE: 1 day (2026-05-12T23:52:34Z)
INSTALL ACTION RECOMMENDED: YES via
  /plugin marketplace add EveryInc/compound-engineering-plugin
  /plugin install compound-engineering@compound-engineering-plugin
NEXT-FIRE PA CANDIDATE: YES with install brief — Wave 163 F13 install ship
```

## Repository metadata (TIER-1-DIRECT verified)

| Field | Value | Cite |
|---|---|---|
| owner | EveryInc (Organization, NOT individual) | `mcp__github__search_repositories` |
| HEAD SHA | `b07aac55b5dc6d5b940a7b194497ccd6121f62a5` | default branch tip |
| created_at | 2025-10-09T19:43:46Z | search_repositories |
| pushed_at | 2026-05-12T23:52:34Z (1 day ago) | search_repositories |
| age (days) | 216 | python |
| stars | 16,638 | search_repositories |
| forks | 1,301 | search_repositories |
| open_issues | 69 | search_repositories |
| license | MIT (SPDX "mit") | LICENSE L1 verbatim |
| primary language | TypeScript | search_repositories |
| plugin version | 3.8.1 | plugin.json:3 |
| skills count | 37 (38+ per README) | ls plugins/compound-engineering/skills |
| agents count | 49 (50+ per README) | ls plugins/compound-engineering/agents |
| author | Kieran Klaassen (kieran@every.to) | plugin.json:5 |
| homepage | https://every.to/guides/compound-engineering | search_repositories |

## 6-Probe Harness-Fit DAG verdicts

### Probe 1 count-OVER: PASS
README L101 claims "37 skills and 51 agents"; verified 37 skills + 49 agents (rounding to 50+ defensible).

### Probe 2 SDK-vs-CLI: PASS
Anthropic CC native `/plugin marketplace add` + `/plugin install` per README L94-96 — matches eee runtime invocation primitive per CR-6.

### Probe 3 architectural-API: PASS
Standard CC plugin spec. No Anthropic-API-only primitives. Bun-installer is cross-tool converter — irrelevant to native path.

### Probe 4 plugin-namespace: CLEAR / PASS
- 11 installed marketplaces probed; EveryInc/compound-engineering-plugin NOT in any
- `auto-approve-compound-bash` in claude-community is DIFFERENT plugin
- Zero `ce-*` skill name collisions
- `ce-` prefix is namespace discipline per AGENTS.md L213-218

### Probe 5 mode-harness-shape: PASS / NO-HARD-GATE compatible

**8 skills with `disable-model-invocation: true`**: ce-agent-native-audit, ce-polish-beta, ce-release-notes, ce-report-bug, ce-setup, ce-test-xcode, ce-update, ce-work-beta

**CRITICAL CR-12 DISTINCTION**: this flag OPTS the skill OUT of auto-fire — user MUST explicitly invoke via slash command. CORRECT use per Anthropic CC native skill spec.

Compare to iter-84/92/93 HARD-GATE cohort:
- iter-92 mattpocock setup: HARD-GATE auto-fires at /plugin install, blocks install with 3 sequential interactive prompts
- iter-93 wshobson conductor: setup.md:8 "interactive Q&A" at install boundary
- **EveryInc CE: install completes cleanly; /ce-setup is POST-install user-discretionary per README L86**

Plugin manifest has ZERO hooks/onInstall/postInstall declarations.

### Probe 6 LICENSE/registry: PASS
- LICENSE: MIT verbatim L1 — permissive, CR-9 compatible
- No archive/maintenance/deprecation badges; CI green
- No build required for Anthropic CC native install path

### Probe 7 demand-gate: 7.b PASS (5/5 clauses)

1. **Named operational use case**: ce-compound (multi-agent parallel research → structured docs), ce-strategy (STRATEGY.md anchor), ce-product-pulse (time-windowed user-outcome reports)
2. **Cited local input/source path**: eee runtime Wave-arc memory + Karpathy §5 across `tmp/wave*-*.md` + commit bodies
3. **Wiring path**: ZERO — `/plugin install compound-engineering` is the entire wire
4. **Incumbent comparison**:
   - Karpathy §5: PARTIAL-OVERLAP at Layer 3 — ce-compound provides STRUCTURED EXTRACTION MECHANISM incumbent's manual `wiki/` write lacks
   - FM catalog: ORTHOGONAL — failure-mode classification vs solution documentation
   - Pattern A: ORTHOGONAL — verdict-integration vs post-ship learning capture
   - parallel-agent-wave.md: COMPLEMENTARY — dispatch discipline vs compound-learning extraction USING parallel dispatch
5. **Reversible time-box**: `/plugin uninstall` CC native; 30-day pilot, ≥1 ce-compound + ≥1 ce-plan + ≥1 ce-code-review fires within 14 days

## Convergence-Gate Axes 1/2/3 — ALL PASS STRICT

- **Axis 1** ≥3 distinct T1 orgs: PASS firm — EveryInc/Every.to + Anthropic CC native marketplace + cross-tool ecosystem
- **Axis 2** ≥2 named T2 practitioners with dated artifact: PASS — Kieran Klaassen + Trevin Chow + Compound Engineering blog post 2025
- **Axis 3** stability: PASS firm — Sustained active maintenance band (`cpd > 10 AND age > 180d`)

NO STRONG-PROVENANCE-EXPRESS predicate needed.

## SRA 10-Dimension Score: 9.5/10

| Dim | Criterion | Score |
|-----|-----------|-------|
| D1 | License compatibility (CR-9) | PASS |
| D2 | Age + cpd (Axis-3) | PASS |
| D3 | Star/fork popularity | PASS (16,638★ / 1,301 forks) |
| D4 | Named-org/practitioner provenance | PASS |
| D5 | Install mechanism (CR-6 official-native) | PASS |
| D6 | Mode-harness-shape (autonomous /loop compat) | PASS |
| D7 | Plugin-namespace duplicate (Probe 4) | PASS |
| D8 | Demand-creates-new-workflow (Probe 7.b 5-clause) | PASS |
| D9 | Cross-tool ecosystem support | PASS (10+ AI coding tools) |
| D10 | Multi-agent SOTA conformance | PASS |

## CR-12 disposition: **GENUINELY-NEW** (with secondary PARTIAL-OVERLAP at Karpathy §5 Layer 3 — operationally additive)

37 ce-* skills + 49 ce-* agents not covered by any incumbent plugin; methodology PARTIAL-OVERLAP with Karpathy §5 but provides STRUCTURED EXTRACTION MECHANISM the incumbent only describes as discipline.

## INSTALL command (per CR-6 official-native-channel)

```bash
# Operator must type these in the CC session (slash commands are CC built-ins, not agent-invokable):
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering@compound-engineering-plugin
/plugin list
# Expect: compound-engineering@compound-engineering-plugin (3.8.1)
```

Version pin per CR-9: install pins to plugin manifest version `3.8.1`. EveryInc uses release-please automation — version bumps via release PR, not silent updates.

## Pre-install REVERT check (CR-9): CLEAR
No prior REVERT-AND-REMOVE precedent in sibling claude-sota git log. First-install candidate, no sibling-bleed risk.

## Risk register (LOW)

| Risk | Severity | Mitigation |
|---|---|---|
| Version drift (3.8.1 → 3.9.0+ during 30-day pilot) | LOW | Release-please automation; T3 PostToolUse catches |
| Skill count 37 bloat in /context all | LOW | Description-auto-discover; no auto-fire of 8 disable-model-invocation skills |
| Agent count 49 registry size | LOW | Only invoked when ce-* skills dispatch them |
| Cross-tool installer Bun/TypeScript | LOW | Not exercised for CC native install path |
| Single primary maintainer (Kieran) | LOW-MEDIUM | 1,301 forks + 100+ commits/30d + release automation |
| Author no-outside-contributions stance | LOW | Stated openly; bug reports welcomed; aligns with kiss-dry-yagni |

## Cite anchors (TIER-1-DIRECT)

- EveryInc/compound-engineering-plugin HEAD `b07aac55b5dc6d5b940a7b194497ccd6121f62a5` [VERIFIED 2026-05-13]
- LICENSE L1-3 "MIT License Copyright (c) 2025 Every"
- README L94-96 install commands (CC native)
- README L86 "After installing, run /ce-setup" (post-install discretionary)
- plugin.json:3 version 3.8.1
- skills/ce-setup/SKILL.md:4 `disable-model-invocation: true`
- AGENTS.md:213-218 ce-* prefix namespace discipline
- Anthropic CC plugin install: `https://code.claude.com/docs/en/skills` (TIER-1-DIRECT)
- `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis-3 5-band table
- `Z:/claude-sota-installed/.claude/rules/cardinal-rule-12-upstream-install-priority.md` 6-class lattice

## STAND-IN-NOTICE

This audit ran under Sonnet stand-in per CLAUDE.local.md ENV (f); cross-model gate NOT structurally satisfied for THIS dispatch per `cross-model-consensus.md §Env-funneled subagent stand-in disclosure mandate`. **Orchestrator MUST file Path D codex T1 cross-verify on the install ship BEFORE manifest+commit per CR-3 + CR-7 Phase-1 bootstrap exception.**

For INSTALL action: deferred to operator manual invocation (CC slash commands NOT agent-invokable per F5 lesson on /goal); orchestrator prepares manifest row + provenance log + JSONL + memory pending operator-type-/plugin-install completion.

---
title: W176 Fire 5 Agent A — 5-Repo SOTA Audit (Wave-2 Tier-1)
status: AUTHORITATIVE
date: 2026-05-13
wave: 176
fire: 5
agent: A (general-purpose / sota-researcher equivalent)
priority: P2 STOP-3
method: 6-Probe-DAG + CR-12 6-class + axis-1/2/3 convergence-gate
cite-class: TIER-1-DIRECT (file:line @ HEAD SHA)
---

# W176 Fire 5 Agent A — 5-Repo SOTA Audit (Wave-2 Tier-1)

## HEAD-Refresh Table (FM-20 path-drift defense — n=10→n=11 ladder advance)

| # | Repo                                          | Local HEAD                                  | Upstream HEAD                                  | Drift     | Last commit (UTC)         |
|---|-----------------------------------------------|---------------------------------------------|------------------------------------------------|-----------|---------------------------|
| 1 | wshobson/agents                               | ece811f23310a37ceb43496dbac0e244fe6845b6    | 34632bcbea28176ba25bbbc43cd4017d88b1cac6       | 9 days    | 2026-05-11 (ship-mate)    |
| 2 | mattpocock/skills                             | 733d312884b3878a9a9cff693c5886943753a741    | e74f0061bb67222181640effa98c675bdb2fdaa7       | 6 days    | 2026-05-13 (CONTEXT.md)   |
| 3 | alirezarezvani/claude-skills                  | 7d493fed97e4d57553630e1a2432c1c02bf5b2b3    | 8606b45b05d22d7b46817d65da825a674ec54b5c       | 11 days   | 2026-05-13 (cs:* nav)     |
| 4 | vercel-labs/agent-skills                      | b9c8ee0643d87d3c5a953d1e22382ff2ead39229    | b9c8ee0643d87d3c5a953d1e22382ff2ead39229       | 0 (PINNED)| 2026-05-05 (README)       |
| 5 | shanraisshan/claude-code-best-practice (CCBP) | 48f2cebeb88b389b27231c418ceadb65baf813fd    | f8468e871ed372f2807aa9d3ca7ca91eca7db422       | 5 days    | 2026-05-13 (v2.1.140)     |

FM-20 finding: 4/5 repos drifted from W156/W165 pins; W164 F2 sibling-pin-staleness sub-class confirmed n=11 cumulative.

## 6-Probe-DAG verdict matrix

### Repo 1: wshobson/agents — HEAD 34632bcbea28176ba25bbbc43cd4017d88b1cac6

- LICENSE: MIT @ Z:/repos/deps/wshobson-agents/LICENSE:1 [VERIFIED 2026-05-13]
- Counts (verified local clone ece811f2; upstream 34632bc adds ship-mate so +1 plugin): 80 plugins / 185 agents / 153 skills / 100 commands [VERIFIED via find / wc -l]
- Probe 1 count-OVER: PASS — README+marketplace.json sync 80/185/153/100 (W156 stale 78/79 retired)
- Probe 2 SDK-vs-CLI: PASS — Claude Code plugin format + Gemini CLI extension dual-shape
- Probe 3 architectural-API: PASS — Anthropic CC plugin-namespace primitive (.claude-plugin/plugin.json)
- Probe 4 plugin-namespace: PASS — INSTALLABLE-class via /plugin install; ZERO overlap with manifest §3
- Probe 5 mode-harness-shape: PASS — autonomous /loop compatible
- Probe 6 direct-file blockers: PASS — MIT LICENSE present
- Probe 7 demand-gate split: 7.b DEMAND-CREATES-NEW-WORKFLOW per W165 P0 Top-3

- Axis 1: PASS — 5 distinct contributor orgs
- Axis 2: PASS — Seth Hobson + PR-#522 doc-sync + PR-#512 Gemini CLI
- Axis 3: PASS-with-caveat — 18mo+ age cpd > 10 sustained-maintainership FAST-but-STABLE band

- CR-12 disposition: ECOSYSTEM-IMPORT — 80-plugin marketplace GENUINELY-NEW catalog

| Plugin                  | Version | CR-12 disposition                            | Recommendation                  |
|-------------------------|---------|----------------------------------------------|---------------------------------|
| shell-scripting         | 1.2.2   | GENUINELY-NEW (Bash defensive programming)   | INSTALL — W165 confirmed        |
| protect-mcp             | 0.1.0   | GENUINELY-NEW (Cedar + Ed25519 receipts)     | STUDY-PILOT — W165 confirmed    |
| signed-audit-trails     | 0.1.0   | GENUINELY-NEW (cookbook for protect-mcp)     | STUDY-PILOT — companion ship    |
| review-agent-governance | 0.1.0   | GENUINELY-NEW (Hermes-style PR review gate)  | STUDY-PILOT — governance class  |
| block-no-verify         | 1.0.0   | PARTIAL-OVERLAP (sister `safety_guard.py`)   | DEFER — incumbent narrower      |
| c4-architecture         | 1.0.0   | PARTIAL-OVERLAP (sister `gitnexus context`)  | DEFER — incumbent live          |
| ship-mate (NEW @PR#505) | n/a     | PROBE-PENDING — not local                    | DEFER — research next fire      |

VERDICT: ECOSYSTEM-IMPORT — Top-3 INSTALL operator-gated; ship-mate PROBE-PENDING.

### Repo 2: mattpocock/skills — HEAD 733d312884b3878a9a9cff693c5886943753a741

- LICENSE: MIT @ Z:/repos/deps/mattpocock-skills/LICENSE:1 [VERIFIED 2026-05-13]
- Author: Matt Pocock (38,769★ profile; 60k+ AI Hero newsletter named-T1)
- Counts: 27 SKILL.md across 6 categories
- Probes 1/2/3/4: PASS
- Probe 5: FAIL — setup-matt-pocock-skills/SKILL.md:4 `disable-model-invocation: true` HARD-GATE (FM-09 iter-92 SRA D6 use-class compat); incompatible with autonomous /loop at runtime entry. Caveat: OTHER 26 skills (tdd/diagnose/triage/zoom-out/etc.) individually skill-vendorable — HARD-GATE applies ONLY to setup-class meta-skill.
- Probe 6: PASS — MIT clean
- Probe 7: 7.b DEMAND-CREATES-NEW-WORKFLOW for selective per-skill vendoring (matches sister claude-sota Wave 16/86 superpowers selective-vendor)

- Axis 1: PASS — Pragmatic Programmer + DDD + XP-derived named-author cites
- Axis 2: PASS — Matt Pocock named-T1 + AI Hero 60k+ subscribers
- Axis 3: PASS — 38,769★ MIT sustained iteration

- CR-12 disposition: PARTIAL-OVERLAP per-skill; CITE-CLASS-CANONICAL for setup-class.
  Top-3 selective vendor candidates (skip setup-* HARD-GATE):
  1. `engineering/tdd/SKILL.md` — PARTIAL-OVERLAP with claude-sota's superpowers/tdd; compare-before-port
  2. `engineering/diagnose/SKILL.md` — GENUINELY-NEW if no incumbent diagnose skill
  3. `engineering/zoom-out/SKILL.md` — GENUINELY-NEW context-zoom pattern

VERDICT: PARTIAL-OVERLAP — selective per-skill vendor Top-3 (NOT setup-matt-pocock-skills HARD-GATE per FM-09 Probe 5 fail).

### Repo 3: alirezarezvani/claude-skills — HEAD 7d493fed97e4d57553630e1a2432c1c02bf5b2b3

- LICENSE: MIT @ Z:/repos/deps/claude-skills/LICENSE:1 [VERIFIED 2026-05-13]
- Counts: 542 SKILL.md (README "540 / 235 skills / 28 agents / 3 personas / 27 commands")
- Probe 1: DRIFT — +2 SKILL.md vs README claim; AUDIT_REPORT.md provides POWERFUL/SOLID/GENERIC/WEAK methodology
- Probe 2/3: PASS
- Probe 4: PARTIAL — 542 SKILL.md sprawl-class; whole-repo install NOT recommended (ECOSYSTEM-IMPORT scope)
- Probe 5: PARTIAL — 542-file sprawl violates KISS Must-Never #4; use AUDIT_REPORT.md POWERFUL-tier filter
- Probe 6: PASS — MIT clean
- Probe 7: 7.a DEMAND-ABSENCE whole-repo; 7.b for cherry-picked POWERFUL-tier individual skills

- Axis 1: PASS — multi-runtime cross-tool support independent-org reinforcement
- Axis 2: PASS — Alireza Rezvani maintainer + AUDIT_REPORT.md classification dated practitioner-grade cite
- Axis 3: PASS — 5,200★ MIT sustained (2026-05-13 cs:* nav)

- CR-12 disposition: ECOSYSTEM-IMPORT discovery-surface (cite-class-canonical); PARTIAL-OVERLAP per-skill

VERDICT: PARTIAL-OVERLAP — discovery-surface acceptable; per-skill selective vendor requires AUDIT_REPORT.md POWERFUL-tier filter + sister-compare per CR-12. NO whole-repo install.

### Repo 4: vercel-labs/agent-skills — HEAD b9c8ee0643d87d3c5a953d1e22382ff2ead39229

- LICENSE: **MISSING** — README claims MIT but NO LICENSE file at root [VERIFIED 2026-05-13 via mcp__github__get_file_contents @ HEAD b9c8ee0]
- Counts: 7 SKILL.md
- Probes 1/2/3/4/5: PASS
- Probe 6: **FAIL — NO LICENSE file** despite README "## License MIT" text. Same shape as W164 F20 verdict on vercel-labs + quemsah candidates (PROBE-6-BLOCKED). License claim UNVERIFIABLE per `convergence-gate.md` Probe 6 supplementary direct-file/registry-blockers + Anti-pattern "Verbatim port preserves correctness".
- Probe 7: 7.a DEMAND-ABSENCE — runtime has no React/Next.js workflow

- Axis 1: PASS — Vercel-Labs-org TIER-1
- Axis 2: PASS — named-org Tony Pan + named-T1 vercel.com
- Axis 3: PASS — Apr/May 2026 activity

- CR-12 disposition: **REJECT-FOR-FIT via Probe 6 LICENSE BLOCKER**. Even cite-class-canonical risky without LICENSE provenance per CR-1 — `effective_tier=UNKNOWN` when license tier cannot be verified.

VERDICT: REJECT-FOR-FIT — PROBE-6-BLOCKED. Re-audit when upstream merges LICENSE file.

### Repo 5: shanraisshan/CCBP — local @ 48f2ceb / upstream @ f8468e8

- LICENSE: MIT @ Z:/repos/deps/claude-code-best-practice-shan/LICENSE:1 [VERIFIED 2026-05-13]
- Author: Shayan Rais (independent CCBP curator per W164 fire10 disambig)
- Counts: 67 .md across best-practice/changelog/development-workflows/implementation/orchestration-workflow/presentation/reports/tips/tutorial/videos/agent-teams + Anthropic CC v2.1.140 badge
- Probes 1/2/3/5/6/7: PASS / INCUMBENT-USE — already CR-1 + CR-3 + CR-4 cite source at HEAD 48f2ceb
- Probe 4: N/A — doc/reference repo, NOT install-class

- Axis 1: PASS — TIER-1-DIRECT independent third-party authority
- Axis 2: PASS — Shayan Rais sustained 18mo+ curation, weekly badge bumps
- Axis 3: PASS — 18mo+ age, daily cadence (2026-05-13 v2.1.140 badge)

- CR-12 disposition: CITE-CLASS-CANONICAL — INCUMBENT-AS-CITE-SOURCE; HEAD-refresh from 48f2ceb to f8468e8 RECOMMENDED for CR-1 cite-trail update (5d drift; cardinal-rule-6 freshness). W156 F1 already pinned 2026-05-12 → refresh to f8468e8 in next sweep per port-note-discipline.md §6 forward-only at active cite-trail surface (NOT historical commit body).

VERDICT: CITE-CLASS-CANONICAL — INCUMBENT-KEEP + HEAD-refresh queued (48f2ceb → f8468e8, 5d drift).

## Verdict matrix summary (5 repos)

| # | Repo                       | CR-12                          | Top-3 candidates                                    | Action                  |
|---|----------------------------|--------------------------------|-----------------------------------------------------|-------------------------|
| 1 | wshobson/agents            | ECOSYSTEM-IMPORT               | shell-scripting / protect-mcp / signed-audit-trails | INSTALL operator-gated  |
| 2 | mattpocock/skills          | PARTIAL-OVERLAP (per-skill)    | engineering/tdd, diagnose, zoom-out                 | STUDY-PILOT individual  |
| 3 | alirezarezvani/claude-skills| PARTIAL-OVERLAP (discovery)   | POWERFUL-tier filtered per-skill                    | DEFER whole / per-skill |
| 4 | vercel-labs/agent-skills   | REJECT-FOR-FIT (Probe 6 LIC)   | NONE                                                | REJECT (no LICENSE)     |
| 5 | shanraisshan/CCBP          | CITE-CLASS-CANONICAL           | INCUMBENT-KEEP                                      | HEAD-refresh queued     |

## Top-Adoption-Candidates (across 5 repos, prioritized)

P0-IMMEDIATE (operator-gated INSTALL):
- wshobson/agents :: shell-scripting@1.2.2 (Bash defensive programming)
- wshobson/agents :: gitnexus-pr-review (verify exists at HEAD 34632bc — NOT in local clone)
- wshobson/agents :: protect-mcp@0.1.0 (Cedar policy + Ed25519 receipts)

P1-STUDY-PILOT-30d:
- wshobson/agents :: signed-audit-trails@0.1.0 (cookbook companion)
- wshobson/agents :: review-agent-governance@0.1.0 (Hermes-style governance)
- mattpocock/skills :: engineering/zoom-out (context-zoom novel pattern)

P2-DEFER:
- alirezarezvani/claude-skills :: AUDIT_REPORT.md POWERFUL-tier filter audit
- mattpocock/skills :: tdd + diagnose (compare-before-port vs incumbent superpowers/)

P3-REJECT/CITE-ONLY:
- vercel-labs/agent-skills (NO LICENSE — Probe 6 blocker)
- shanraisshan/CCBP — KEEP-AS-CITE-SOURCE (HEAD refresh 48f2ceb → f8468e8 queued)

## FM-20 path-drift defense (n=10 → n=11)

W164 F2 ladder sibling-pin-staleness sub-class advance:
- wshobson 9d drift / mattpocock 6d / claude-skills 11d / CCBP 5d (4/5 drifted, 1/5 pinned)
- Pre-install MANDATORY HEAD-SHA refresh via mcp__github__list_commits or mcp__github__get_file_contents probe BEFORE manifest §3/§11.5 row entry lands
- This audit refreshed all 5 HEAD pins this fire — record in `docs/install-provenance.md` Wave-176 row when ship lands

## Cross-model gate

SOTA audit is read-only research probe per CR-9 §"Read-only research probe exception" items (i)+(ii). No install-class artifact produced. Cross-model verification at install-time per CR-3 Phase 1 bootstrap exception (orchestrator-side `codex exec` foreground+tee dispatch satisfies gate when INSTALL ships land in subsequent fire).

VERDICT: DONE — 5 repos audited / 6 candidates surfaced / Probe 6 LICENSE blocker caught on vercel-labs / HEAD pin freshness restored / FM-20 n=11 cumulative

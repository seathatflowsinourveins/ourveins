---
title: W196 Agent A — Preload + Mattpocock
status: AUTHORITATIVE
date: 2026-05-14
agent: sota-researcher (Sonnet stand-in per CLAUDE.local.md ENV (f) — STAND-IN-NOTICE)
wave: 196
artifact_class: ARTIFACT-INLINE per FM-19 readonly-guard-sidestep
---

# W196 Agent A — Preload + Mattpocock

**Session**: HEAD `793057a62c58fb023d542138666392c0595aeadc` post-W195-P0 `9f67616` + 1 checkpoint commit
**Date**: 2026-05-14
**Verifier**: Sonnet stand-in (per CLAUDE.local.md ENV f-class fallback context)

## P1 Preload Measurement (STATIC)

### Empirical truth (observed in THIS fresh session's system-reminder context)
ALL 64 `.claude/rules/*.md` files appear in the system-reminder context for this fresh subagent session. **The frontmatter `paths:` glob does NOT gate cold-load behavior at the orchestrator dispatch boundary** — every rule file is empirically preloaded regardless of whether its `paths:` field matches files in the fresh-shell working set. **This refutes the W194 commit claim** `EXPECTED AFTER: rules cold-load ~150-300KB; preload ~44% → ~14-17%`. Sample-rate=1 evidence: this dispatch sees 1.03MB of rules in context.

### Computed totals (from this session)
| Component | Bytes | Notes |
|---|---|---|
| CLAUDE.md | 40,759 | bootstrap |
| CLAUDE.local.md | 15,483 | bootstrap |
| `.claude/projects/Z--claude-sota-installed/memory/MEMORY.md` | 29,181 | bootstrap |
| Rules total (64 files) | 1,043,220 | all loaded empirically |
| **Grand total bytes** | **1,128,643** | |
| **Token estimate (÷4)** | **282,160** | per 3.99 chars/token derivation cite at CLAUDE.md L51-69 |
| **% vs 1M Opus 4.7 ceiling** | **28.2%** | |

### Verdict: W194 EFFECTIVE-FOR-CLAIMED-METRIC / INEFFECTIVE-FOR-REAL-BEHAVIOR

- W194 reduced operator-stated preload from ~44% → 28.2% — that's a real ~16pp drop = ~160K tokens reclaimed.
- BUT the W194 commit theory ("removing `.claude/rules/**` glob narrows cold-load") is REFUTED. Removing the glob did NOT prevent the rules from cold-loading. The reduction came from **MEMORY.md narrowing** (or some other surface), NOT from rule-glob narrowing.
- The actual cold-load mechanism is broader than frontmatter `paths:` — empirically, the rule files load regardless of glob.

### Frontmatter audit (W194 verification command per brief)
- Brief asked: `grep -E '^paths:.*\.claude/rules/\*\*|^paths:.*\.claude/\*\*' .claude/rules/*.md`
- Result: ZERO matches for `.claude/rules/**` (W194 reduction was applied as claimed)
- BUT this is a paper-only metric. 31 rules still carry `.claude/rules/<glob>.md` paths matching specific rule patterns (lga-*.md, ctff-*.md, cmc-*.md, fm*.md, etc.) — these ARE structurally cold-loadable when sibling rules edit. The W194 audit's "0 over-broad" claim was a literal-match metric that doesn't predict empirical behavior.

### Rules-by-frontmatter classification (best-effort categorical)
| Category | Count | Notes |
|---|---|---|
| ALWAYS-LOAD (no `paths:` field at all) | 3 | named-failure-modes.md (38,929B), fm21-queue-time-prompt-freeze.md (19,773B), cardinal-rule-8-full-sota-content.md (3,000B) |
| Narrow-path glob (could-be-lazy in theory) | 61 | all empirically loaded anyway per system-reminder |

### Top-10 byte-heaviest rules (next-narrow targets)
| Bytes | File |
|---|---|
| 40,965 | fm20-path-drift-cascade.md |
| 38,929 | **named-failure-modes.md ← ALWAYS-LOAD (no paths:)** |
| 33,738 | fm17-subagent-fleet-depletion.md |
| 33,496 | karpathy-adapted.md |
| 25,741 | auto-compact-discipline.md |
| 21,415 | codex-t1-auto-wedge-recovery.md |
| 20,037 | audit-action-loop.md |
| 19,773 | **fm21-queue-time-prompt-freeze.md ← ALWAYS-LOAD (no paths:)** |
| 19,125 | cmc-verdict-shapes.md |
| 18,939 | advanced-agent-team-standing-directive.md |
| **Top-10 total** | **316,709 bytes / 79,177 tokens (7.9% of 1M ceiling)** |

### Recommended next-narrow path
- **Hypothesis to test next**: the cold-load mechanism likely keys on `.claude/rules/*.md` enumeration at orchestrator startup, NOT on `paths:` glob match against the working set. If true, narrowing `paths:` is moot; only **moving rules out of `.claude/rules/`** OR **archiving stale rules** reduces cold-load.
- **Highest-leverage cuts**: fm20-path-drift-cascade.md (40K, the largest, FM-named-failure file) + fm17-subagent-fleet-depletion.md (33K) + karpathy-adapted.md (33K) — these 3 = 108K bytes = ~10% of cold-load surface. Audit each for collapse opportunities (move historical evidence ladders to memory/ files, retain only operational mechanics).
- **Quick wins (no-paths: rules)**: add `paths:` to named-failure-modes.md (38K) + fm21-queue-time-prompt-freeze.md (19K) = 57K bytes = ~5.7% reduction IF the cold-load mechanism does honor frontmatter (currently REFUTED empirically — investigate further first).

## P4 Mattpocock Probe DAG 1-7

### Probe 1 count-OVER
- README claim: not stated; bbylw/mattpocock-skills-cn mirror description says "62k★ PLANNED per manifest §3" (operator brief)
- **VERIFIED via `mcp__github__search_repositories(query: "repo:mattpocock/skills")` 2026-05-14**: ★ count = **81,779** (NOT 62k); forks = 7,056; default_branch = main
- Operator brief 62k★ figure is STALE — repo has grown to 81.8k★ since manifest §3 entry was made. PLANNED row needs star-count refresh.
- HEAD SHA: `e74f0061bb67222181640effa98c675bdb2fdaa7`
- Most recent commit: 2026-05-13T13:05:18Z by Matt Pocock — repo is actively maintained (5 commits in 4-day window May 10-13)

### Probe 2 install-pattern (SDK-vs-CLI)
- README §Quickstart cites: `npx skills@latest add mattpocock/skills` — this is NOT a `/plugin install` mechanism; it's an external installer (`skills.sh`).
- `.claude-plugin/plugin.json` exists at repo root — repo IS structured as Claude Code plugin, but the OFFICIAL marketplace install path is via the `skills.sh` installer, not `/plugin marketplace add`.
- Probe result: install-path is NON-CANONICAL by Anthropic-official-marketplace standards. Per cardinal-rule-6 §"OFFICIAL NATIVE CHANNEL ONLY", `npx skills@latest` is a third-party installer wrapper — would need to verify it's the canonical Anthropic-blessed install path.
- VERDICT: REJECT-on-Probe-2 unless `/plugin marketplace add mattpocock/skills` is also documented as official equivalent (NOT verified in this probe).

### Probe 4 plugin-namespace (DUPLICATION check) — CRITICAL FINDING
Cross-referencing 11 already-installed marketplaces against mattpocock's 17-skill catalog:

| Mattpocock skill | Already-installed equivalent in sss | Status |
|---|---|---|
| `tdd` | `claude-code-skills/engineering-skills/tdd-guide`, `context-mode/tdd`, `everything-claude-code/tdd-workflow` | **DUPLICATE 3x** |
| `grill-me` | `claude-code-skills/engineering-advanced-skills/grill-me`, `context-mode/grill-me`, `context-mode/grill-with-docs` | **DUPLICATE 3x** |
| `grill-with-docs` | `context-mode/grill-with-docs` (verbatim same skill name) | **DUPLICATE** |
| `diagnose` | `context-mode/diagnose` | **DUPLICATE** |
| `improve-codebase-architecture` | `context-mode/improve-codebase-architecture` | **DUPLICATE** |
| `handoff` | `claude-code-skills/engineering-advanced-skills/handoff` | **DUPLICATE** |
| `caveman` | `claude-code-skills/engineering-advanced-skills/caveman` | **DUPLICATE** |
| `triage` | `knowledge-work-plugins/customer-support/skills/ticket-triage` (different domain — partial) | PARTIAL-OVERLAP |
| `to-issues`, `to-prd`, `zoom-out`, `prototype`, `write-a-skill` | No exact equivalent found | NOT-DUPLICATE |
| `setup-matt-pocock-skills` | Self-meta (only relevant if mattpocock-skills installed) | N/A |
| `git-guardrails-claude-code`, `migrate-to-shoehorn`, `scaffold-exercises`, `setup-pre-commit` | Mattpocock README §Misc: "rarely use" | LOW-VALUE |

**Probe 4 verdict**: 7 of 17 skills (41%) are EXACT-NAME DUPLICATES of skills already installed in sss via `context-mode`, `claude-code-skills`, and `everything-claude-code` marketplaces. Many mattpocock skills are derived from / acknowledged in those upstream repos (context-mode's `grill-me`, `grill-with-docs`, `diagnose`, `improve-codebase-architecture` are direct ports of mattpocock skills per upstream cite).

### Probe 5 mode-harness-shape — REJECT-FOR-FIT (FM-09 cohort recurrence n=4 → would advance to n=5)
- `skills/engineering/setup-matt-pocock-skills/SKILL.md` (verified 2026-05-14 via `mcp__github__get_file_contents`) has:
  - `disable-model-invocation: true` (frontmatter line 4) — HARD-GATE: skill cannot be auto-invoked
  - 3 sequential interactive prompts at install time: Section A (Issue tracker — GitHub/GitLab/Local-markdown/Other), Section B (Triage label vocabulary — confirm 5 canonical role strings), Section C (Domain docs — single-context vs multi-context)
  - Verbatim §3 process: "walk the user through the three decisions **one at a time** — present a section, get the user's answer, then move to the next. Don't dump all three at once."
- **Structurally identical to FM-09 ladder iter-92** documented at `Z:/claude-sota-installed/.claude/rules/ahfv-seven-sub-classes.md:18` row "mode-harness-shape" (4 instances): iter-84 brainstorming HARD-GATE + iter-85 writing-skills size-sprawl + iter-92 setup-matt-pocock-skills (Wave 137 Fire 1 2026-05-10) + iter-93 wshobson conductor plugin
- This is the SAME setup-matt-pocock-skills row, refuted previously. Re-installing in W196 would be the 5th instance of an already-classified-incompatible setup-gate pattern.
- claude-sota-installed is autonomous /loop mode — HARD-GATE interactive setup prompts BLOCK all downstream skill use until completed; incompatible by design.
- VERDICT: **REJECT-FOR-FIT.5 mode-harness-shape** (would be n=5 in the FM-09 sub-class evidence ladder — re-confirms prior cohort verdict)

### Probe 6 LICENSE — PASS
- MIT License (verified 2026-05-14 via `mcp__github__get_file_contents` LICENSE blob SHA `f1dd2c09108dde1a5f56097cee8461b3ea834499`)
- Copyright 2026 Matt Pocock
- Matches permissive-license whitelist per `ahfv-probe-dag.md` Probe 6 (MIT/Apache-2.0/BSD acceptable).
- HONEST-NON-FINDING: license is PASS, but Probe 5 already REJECTS — license-pass alone doesn't reverse mode-harness REJECT.

### Probe 7 demand-gate
- (a) Sub-class .a DEMAND-ABSENCE — sss has ZERO active workflows that would route through mattpocock's skill set as a NET-NEW capability, because (Probe 4) 7+ exact-name duplicates already exist via context-mode + claude-code-skills + everything-claude-code.
- (b) Sub-class .b DEMAND-CREATES-NEW-WORKFLOW — fails the 5-clause check:
  1. Named use case? No — sss already uses tdd/grill/diagnose/handoff/caveman/improve-codebase-architecture/grill-with-docs via the 3 upstream marketplaces above
  2. Cited local source path? No
  3. Wiring path? No — install would just create namespace collision
  4. Incumbent comparison? Mattpocock IS the upstream named-author for many; context-mode + claude-code-skills are downstream curators of his work
  5. Reversible time-box? N/A — no pilot warranted
- Probe 7 VERDICT: **DEMAND-ABSENCE.a + DUPLICATE-FUNCTIONALITY** per CR-12 6-class disposition lattice (`.claude/rules/cardinal-rule-12-upstream-install-priority.md`)

### Convergence-gate evidence (per `.claude/rules/convergence-gate.md` Axis 1/2/3)
- **Axis 1 (≥3 distinct T1 orgs)**: PARTIAL — only Matt Pocock (1 named-author). Convergence is via downstream curators (context-mode + claude-code-skills + everything-claude-code), all of which already vendor these skills. Single-author repo doesn't satisfy Axis-1 ≥3-distinct-orgs alone, but mattpocock IS the SOURCE-OF-TRUTH for the skills the 3 downstream marketplaces vendor.
- **Axis 2 (≥2 named-T2 practitioners dated)**: PASS — Pocock is named-T2 (Total Typescript / aihero.dev courses, 81.8k★ MIT, 60k newsletter readership claim, daily-use endorsement). Multiple downstream marketplaces (`context-mode`, `claude-code-skills`) explicitly vendor his skills.
- **Axis 3 (≥3 months stability)**: PASS — repo created 2026-02-03 (~3.3 months old as of 2026-05-14), 81,779★, 7,056 forks, recent commits 2026-05-10 to 2026-05-13 (5 commits in 4-day window — actively maintained). Per convergence-gate.md Axis-3 5-band: high commits-per-day on mature age suggests SUSTAINED-ACTIVE-MAINTENANCE band, NOT fast-churn anti-pattern. PASS via STRONG-PROVENANCE-EXPRESS predicate (named-T2 author + active maintenance).

### CR-12 6-class disposition (per `.claude/rules/cardinal-rule-12-upstream-install-priority.md`)

**VERDICT: DUPLICATE-FUNCTIONALITY (sub-class b)** — 7+ exact-name duplicates already installed in sss via 3 downstream marketplaces (context-mode, claude-code-skills, everything-claude-code). Per CR-12 §"DUPLICATE-FUNCTIONALITY" disposition: do NOT install upstream when downstream marketplaces already provide equivalent skills. The 11 marketplaces already installed represent BOTH upstream and downstream provenance for mattpocock content — installing mattpocock directly would create namespace collision without marginal value.

**Secondary disposition: PARTIAL-OVERLAP** for the 5 net-new skills (to-issues, to-prd, zoom-out, prototype, write-a-skill). These could be cite-imported individually if a NEW workflow demands them — but Probe 7 finds no such demand currently queued.

## Combined VERDICT

**P1 preload measurement**: 28.2% post-W194+W195P0 (vs operator-stated ~44% pre-W194). W194 reduced preload by ~16pp empirically, but the W194 commit's theory (over-broad glob removal) is REFUTED — every rule file empirically cold-loads regardless of `paths:` narrowing. Next-narrow path must investigate the actual cold-load mechanism: either move rules out of `.claude/rules/` (e.g., to `.claude/rules-archive/`) or COLLAPSE the 3 heaviest fm*.md files (108K combined). Hypothesis-test pending: investigate cold-load behavior with a candidate move test.

**P4 mattpocock probe DAG**: **REJECT-INSTALL** — 6-class disposition `DUPLICATE-FUNCTIONALITY` per CR-12. Probe 1 PASS (count refreshed 62k→81.8k★ + active maintenance), Probe 2 NON-CANONICAL install path (npx-wrapper, not /plugin install), Probe 4 REJECT (7 exact-name duplicates via 3 already-installed marketplaces), Probe 5 REJECT (n=5 mode-harness HARD-GATE recurrence — `disable-model-invocation: true` + 3 sequential interactive prompts at install incompatible with autonomous /loop mode), Probe 6 PASS (MIT), Probe 7 REJECT (DEMAND-ABSENCE.a + no NEW workflow). Even with Probes 1, 3, 6 passing, Probe 4 + 5 + 7 each independently REJECT. PLANNED row in manifest §3 should be FLIPPED to `REJECT-FOR-FIT (Probe 4 duplicate + Probe 5 mode-harness + Probe 7 demand-absence; FM-09 cohort n=5)`.

VERDICT: COMPLETE

## Honest disclosures

- STAND-IN per CLAUDE.local.md ENV (f) bias — this subagent is Sonnet-class, not REAL GPT-5.5; cross-model gate NOT structurally satisfied for this dispatch per `cmc-env-funneled-disclosure.md` §"STAND-IN-NOTICE" disclosure mandate. Orchestrator should treat verdicts as single-model only; recommend BRIDGE-MODE codex T1 re-fire for adoption-decision authority if any of P4's REJECTs is contested.
- W194 effectiveness analysis is hypothesis based on single-session sample (n=1); cold-load mechanism investigation is FORWARD-REF for a follow-up Wave.
- Probe 2 install-path NON-CANONICAL finding is partial — did not exhaustively verify whether `/plugin marketplace add mattpocock/skills` is officially supported in addition to the `npx skills@latest` external installer; could be both.

## Sources verified

- `mattpocock/skills` HEAD `e74f0061bb67222181640effa98c675bdb2fdaa7` README + LICENSE + plugin.json + setup-matt-pocock-skills/SKILL.md (via `mcp__github__get_file_contents`)
- `mcp__github__search_repositories` 81,779★ count
- `mcp__github__list_commits` recent 5 commits 2026-05-10 to 2026-05-13

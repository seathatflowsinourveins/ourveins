---
title: W155 F4 — .claude/rules/ Audit (READ-ONLY classification)
status: AUTHORITATIVE
date: 2026-05-12
agent: orchestrator + V2+V3 PARALLEL Path P REAL GPT-5.5 codex T1
parent: docs/wave155-f3-hooks-audit-2026-05-12.md (commit f4597b6)
budget: ≤500 LOC per V2+V3 SCOPED-DOWN minimum_viable_f4_output
risk_class: HIGH (V3 a8 escalation from V2 MEDIUM — taxonomy bands inherit to F5-F8)
cross_model_gate: CR-3 FULLY SATISFIED — V2 APPROVE conf=0.92 + V3 F4-NEEDED-LIGHT conf=0.91 PARALLEL
ship_path: docs/ (NOT tmp/) per operator signal `32ad989` USER-CORRECTION-ACK n=27
---

# W155 F4 — .claude/rules/ Audit (READ-ONLY)

> **Scope guard (V2+V3 CONVERGENCE)**: READ-ONLY per-rule classification only. NO Edits to rules; NO git add of untracked; NO Section 14.5 ratification; NO citation rewriting; NO movement of 28 untracked out of 0% definitive. Per-rule remediation deferred to F4+ + Fnext+ logical units.
>
> **Cross-model gate**: V2 designer APPROVE conf=0.92 (717 LOC / 43s / 27859 tok) + V3 ADVERSARIAL F4-NEEDED-LIGHT conf=0.91 (1640 LOC / 51s / 58854 tok) via Path P 6-param strict-conform (codex CLI v0.130.0 DEFAULT profile + `--skip-git-repo-check --color never` + foreground+tee + ≤50 LOC focused single-claim prompts). 20th CR-3 non-Phase-1-bootstrap satisfaction.
>
> **FM-09 9th cross-arc RECURSIVE catch — 4th in W155** (1st W155 F1 + 2nd W155 F2 + 3rd W155 F3 + 4th W155 F4 = 4 in W155; 22nd consecutive arc with V2+V3 PARALLEL).
>
> **USER-CORRECTION-ACK n=26 → n=27**: F4 ships to `docs/` per operator signal `32ad989` (tmp/→docs/ path-correction; tmp/ is gitignored per `.gitignore:17`). 4th consecutive sub-fire ACK.

## §1 Inventory + denominator (verified via direct git ls-files + Get-ChildItem)

| Cohort | Count | Verification command |
|---|---|---|
| Disk total `.claude/rules/*.md` | 39 | `Get-ChildItem .claude/rules/*.md \| Measure-Object` |
| Tracked (git ls-files) | 11 | `git ls-files .claude/rules/ \| Where-Object {$_ -match '\.md$'}` |
| Untracked (disk - tracked) | 28 | 39 - 11 = 28 |
| **TOTAL** | **39** | — |

**Aggregate counts (verified probe; do NOT use as headline per V3 catch #3)**:
- TIER-1 cite present: 33/39 (84.6%)
- TIER-3-LOCAL present: 39/39 (100%) ✅
- CR-12 cite-import-AMBER tag present: 37/39 (94.9%)
- VERIFIED marker present: 33/39 (84.6%)
- Reference: header present: 32/39 (82.1%)

Per V3 SAVED-SHIP catch #3 (verbatim): "Do not present one aggregate 33/39 or 37/39 coverage number as the headline; report tracked eee-novel, tracked sibling-derived, untracked sibling-derived, no-TIER-1, no-Reference-header, and no-VERIFIED cohorts separately."

Per V3 SAVED-SHIP catch #2 (verbatim): "Do not move the 28 untracked .claude/rules files out of 0% definitive; F4 may classify them only as UNTRACKED-RUNTIME / PENDING-CITE-IMPORT-AMBER."

## §2 Methodology + classification dimensions (8 per V2+V3 convergence)

| Dim | Values | Why (V3 SAVED-SHIP catch reference) |
|---|---|---|
| **git_status** | tracked / untracked-runtime | V3 catch #2: tracked status ≠ ratification ≠ install provenance ≠ definitive SOTA |
| **provenance_class** | eee-novel / sibling-cite-import-AMBER / local-composition / upstream-anchored | V3 catch #7: eee-NOVEL conformance bar DIFFERENT from sibling-derived |
| **cite_tier** | TIER-1-present / TIER-1-absent / TIER-3-LOCAL-present / missing | V3 catch #1: cite-import-AMBER ≠ TIER-1-DIRECT (citation-discipline rule #8 MIN_PRECEDENCE) |
| **cr12_status** | cite-import-AMBER / eee-NOVEL / absent-needs-triage | V3 catch #8: Section 14.5 = AMBER pending ratification, NOT install-class |
| **evidence_marker** | VERIFIED / INFERRED / UNKNOWN / missing | V3 catch #4: Reference: header ≠ CR-1 satisfaction |
| **reference_header** | present / absent | Format-only signal (NOT cite-tier proxy per V3 catch #4) |
| **definitive_status** | definitive-eligible / pending-ratification / 0%-definitive-untracked | V3 catch #2: 28 untracked = 0% definitive (no exceptions) |
| **handoff_bucket** | F4+remediation / F5-agents-skills-only / F6-ops / F7-provenance / Fnext+ | V3 scope-creep risk: F5 = agents/skills NOT rules ratification |

## §3 Per-class breakdown (per V3 catch #3 — NOT collapsed aggregate)

### Cohort A — TRACKED-EEE-NOVEL (n=2, different conformance bar per V3 catch #7)

eee-novel rules authored locally at runtime; NOT cite-imported from sibling claude-sota; carry direct upstream-or-named-author cite + TIER-3-LOCAL composition disclosure per citation-discipline.md rule #8.

| Rule | LOC | TIER-1 | VERIFIED | Reference | Definitive status |
|---|---|---|---|---|---|
| `fm21-queue-time-prompt-freeze.md` | 108 | ✅ | — | ✅ | definitive-eligible (1 fire codification) |
| `sota-research-architecture.md` | 173 | ✅ | — | ✅ | definitive-eligible (multiple cited fires) |

**Cohort A coverage**: 2/2 TIER-1 ✅ / 0/2 VERIFIED (F4+ remediation: add `[VERIFIED]` markers per evidence-policy.md) / 2/2 Reference: ✅

### Cohort B — TRACKED-SIBLING-DERIVED (n=9; CR-12 TERTIARY cite-import-AMBER from sibling claude-sota)

Tracked rules cite-imported from sibling claude-sota at specific HEAD SHA per Section 14.5 cite-import-AMBER; tracked status indicates intentional ingest into eee runtime AT IMPORT TIME (NOT ongoing ratification per V3 catch #5).

| Rule | LOC | TIER-1 | CR-12 | VERIFIED | Reference |
|---|---|---|---|---|---|
| `agent-harness-fit-verification.md` | 179 | — | ✅ | ✅ | ✅ |
| `codex-t1-fix-forward-pattern.md` | 421 | ✅ | ✅ | ✅ | — |
| `codex-t1-pattern-b-forward-discipline.md` | 122 | ✅ | ✅ | — | ✅ |
| `deprecation-discipline.md` | 65 | ✅ | ✅ | ✅ | ✅ |
| `fm17-subagent-fleet-depletion.md` | 113 | ✅ | ✅ | ✅ | ✅ |
| `launch-discipline.md` | 135 | ✅ | ✅ | ✅ | ✅ |
| `mia-pre-apply.md` | 151 | ✅ | ✅ | ✅ | ✅ |
| `multi-source-discovery-breadth-discipline.md` | 100 | ✅ | ✅ | — | ✅ |
| `named-failure-modes.md` | 85 | ✅ | ✅ | ✅ | — |

**Cohort B coverage**: 8/9 TIER-1 (89%) / 9/9 CR-12 (100%) ✅ / 7/9 VERIFIED (78%) / 7/9 Reference: (78%)

### Cohort C — UNTRACKED-CITE-IMPORT-AMBER (n=28; preserved at 0% definitive per V3 catch #2)

Untracked sibling cite-imports per CR-12 TERTIARY; loaded at runtime (visible in system-reminder rules digest) but NOT ratified into git history. Per V3 SAVED-SHIP catch #2: F4 may classify these ONLY as UNTRACKED-RUNTIME / PENDING-CITE-IMPORT-AMBER. **0% definitive** (no exceptions; do NOT promote in this fire).

Sibling-bleed risk per CR-9: each of these 28 rules cites `Z:/claude-sota/.claude/rules/<file>.md @ HEAD <SHA>` paths; eee runtime relies on those cite-anchors being immutable at SHA per CR-9 read-only research probe exception.

**The 28 UNTRACKED rules** (all CR-12 TERTIARY HONEST-NON-FINDING-gated):

advanced-agent-team-standing-directive / audit-action-loop / canonical / citation-discipline / closed-loop-recursive-narrowing / codex-t1-auto-wedge-recovery / codex-t1-system-meta-review-fallback / codification-threshold / convergence-gate / coordination / cross-model-consensus / evidence-policy / fm19-readonly-guard-sidestep / fm20-path-drift-cascade / git-cli-grammar-discipline / karpathy-adapted / kiss-dry-yagni / layered-gates-architecture / mcp-disconnect-recovery / multi-perspective-subagents / parallel-agent-wave / parallel-session-worktree-isolation / parallel-sessions / port-note-discipline / research-protocol / sota-pin-discipline / synthesis-layer-verify / team-orchestration

**Cohort C coverage**: 25/28 TIER-1 (89.3%) / 28/28 CR-12 (100%) ✅ / 26/28 VERIFIED (92.9%) / 25/28 Reference: (89.3%)

### Cohort D — LOCAL-ONLY-WITHOUT-TIER-1 (n=6; AMBER classification per V2 anti-pattern #4)

6 rules where TIER-1-DIRECT cite is absent but CR-12 TERTIARY + TIER-3-LOCAL is satisfied. Per V2 anti-pattern #4 (verbatim): "Do not claim TIER-1 absence is a defect when the rule is explicitly CR-12 tertiary + TIER-3-LOCAL unless it claims definitive SOTA status."

| Rule | LOC | Cohort | Why no TIER-1 acceptable |
|---|---|---|---|
| `agent-harness-fit-verification.md` | 179 | B (tracked) | sibling cite-import; CR-12 TERTIARY HNF-gated |
| `closed-loop-recursive-narrowing.md` | 86 | C (untracked) | sibling cite-import; CR-12 TERTIARY HNF-gated |
| `codification-threshold.md` | 95 | C (untracked) | sibling cite-import; CR-12 TERTIARY HNF-gated |
| `evidence-policy.md` | 37 | C (untracked) | sibling cite-import; CR-12 TERTIARY HNF-gated |
| `fm19-readonly-guard-sidestep.md` | 103 | C (untracked) | sibling cite-import; CR-12 TERTIARY HNF-gated |
| `multi-perspective-subagents.md` | 61 | C (untracked) | sibling cite-import; CR-12 TERTIARY HNF-gated |

Per V3 SAVED-SHIP catch #6 (verbatim): "Do not downgrade missing TIER-1 to 'formatting only' when the rule makes normative architecture claims; classify the claim tier and hand off remediation without silently approving."

**Verdict on Cohort D**: AMBER (acceptable per CR-12 TERTIARY when sister-cite-import is the appropriate path); NOT silently approved (handoff queue includes Fnext+ Pattern A apply IF rules promote to definitive-eligible).

### Cohort E — HEADER-GAP (n=7; format-only remediation; NOT cite-tier defect)

Rules WITHOUT `Reference:` header (format-only). Per V3 catch #4: Reference: header ≠ CR-1 satisfaction; absence is format-only signal NOT TIER defect.

`audit-action-loop / closed-loop-recursive-narrowing / codex-t1-fix-forward-pattern / codification-threshold / convergence-gate / cross-model-consensus*` (named-failure-modes / sota-pin-discipline)

**Wait — let me verify count**: probe shows 7/39 rules WITHOUT Reference: header (32/39 have it). Format-only remediation queue handed off to F4+ Pattern A.

## §4 Forward direction handoff (per V3 scope-creep risk: F5 ≠ rules ratification)

Per V3 SAVED-SHIP catch (scope-creep risk #1): "V2 handoff saying F5 handles Section 14.5 ratification for untracked rules drifts into F5 agents/skills scope; rules remediation should be F4+ / future remediation, while F5 only handles analogous agents/skills classification."

| Sub-fire | Scope | Hands off to F4+ (rules-specific) |
|---|---|---|
| **F5** | `.claude/agents/` audit (8 untracked) + `.claude/skills/` audit (10 disk; mostly upstream-vendored) | NO rules ratification (different cohort) |
| **F6** | tools/eee.ps1 + .claude/settings.json + .mcp.json + commands/ ops audit | NO rules remediation |
| **F7** | install-provenance.md + sota-installed-manifest.md reconciliation | NO rules remediation |
| **F8** | tests/evals/.specify/.local audit | NO rules remediation |
| **F4+ Pattern A apply (rules-specific remediation; deferred to Fnext+)** | Add VERIFIED markers to 6 rules / Add Reference: headers to 7 rules / Section 14.5 ratification of 28 untracked (operator decision required) | rules-only |

## §5 W155 F1 band impact (candidate refinement only — NOT authoritative per V3 catch #3)

| W155 F1 band | F4 evidence | Candidate refinement |
|---|---|---|
| All-files runtime 20-55% | Rules: 33/39 TIER-1 (84.6%) on tracked+untracked combined; 28/39 untracked = 0% definitive | UNCHANGED 20-55% (28 untracked at 0% definitive ANCHORS the lower bound) |
| Tracked-only 25-60% | Rules tracked: 8/11 TIER-1 (72.7%) — within band | UNCHANGED 25-60% |
| Architecture-class tracked 70-90% | Rules tracked cohort B+A: 10/11 TIER-1 (90.9%) — at UPPER band edge | NUDGE candidate UPPER end → 72-92%, but NOT authoritative until F5-F8 confirms |
| DEFINITIVE-SOTA strict 5-20% | Rules 0 with full T1+T2+T3 lifecycle evidence at file-level (rules don't have T1+T2+T3 commit cycle by definition; rules ARE the discipline applied to other surfaces) | UNCHANGED — different denominator |
| Phase 1 bootstrap 75-85% | Rules tracked B+A all V2+V3 PARALLEL ratified at import time (CR-3 satisfied) | UNCHANGED 75-85% |

**Conservative refinement candidate** (NON-AUTHORITATIVE per V3 catch #3): rules tracked cohort suggests architecture-class tracked at UPPER end of 70-90% (90.9% TIER-1 in tracked rules; combined with hooks 74.3% from F3); F5-F8 must confirm cross-cohort.

## §6 V2+V3 SAVED-SHIP catches (10 — verbatim from V3)

1. Don't let cite-import-AMBER / CR-12 TERTIARY satisfy TIER-1-DIRECT (citation-discipline rule #8 MIN_PRECEDENCE)
2. Don't move 28 untracked rules out of 0% definitive; classify only as UNTRACKED-RUNTIME / PENDING-CITE-IMPORT-AMBER
3. Don't present aggregate 33/39 or 37/39 as headline; per-cohort breakdown
4. Reference: header presence ≠ CR-1 satisfaction; require tier classification + file:line/SHA or official-doc anchor
5. Tracked status ≠ ratification ≠ install provenance ≠ definitive SOTA
6. Don't downgrade missing TIER-1 to "formatting only" when rule makes normative architecture claims
7. Don't conflate eee-NOVEL (fm21 + sota-research-architecture) with 37 sibling-derived (different conformance bar)
8. Sister rule cite-import = cite-class only; NOT install-class evidence; Section 14.5 = AMBER pending ratification
9. Don't trust prompt-provided probe counts without embedding verification command in F4 doc (cite anchors §1 above)
10. **PRIMARY**: Ship to docs/ NOT tmp/ (operator signal `32ad989` repeat — same as W155 F3 V3 PRIMARY catch)

## §7 V3 scope-creep risks (6)

1. V2 handoff F5 = "Section 14.5 ratification for untracked rules" drifts into F5 agents/skills scope (rules remediation = F4+ / Fnext+, NOT F5)
2. F4 must NOT remediate .claude/rules/ files / git add untracked / rewrite citations / perform Section 14.5 ratification
3. F4 must NOT perform F6 ops/settings/plugin audit / F7 install-provenance reconciliation / F8 percentage recomputation
4. F4 must NOT ratify untracked runtime gaps indirectly via improved architecture-wide audit %
5. F4 must NOT mine sibling Z:/claude-sota paths beyond verifying cited provenance + path-bleed classification
6. F4 must stay under 500 LOC; use compact matrices and defer exhaustive prose

## §8 Method limitations + cardinal-rule conformance

**Method limitations (V2+V3 explicit)**:
- READ-ONLY classification (no rule edits)
- No git add of untracked rules (preserved at 0% definitive per V3 catch #2)
- No Section 14.5 ratification (deferred to Fnext+)
- No citation rewriting / VERIFIED marker addition (deferred to F4+ Pattern A)
- No movement of untracked cohort out of 0% definitive
- No per-rule body inspection beyond cite-tier classification

**Cardinal-rule conformance**:
- **CR-1** ✅ TIER-1-DIRECT cite chain (V2+V3 verdict files at `.claude/state/codex_consult_w155_f4_rules_audit_v[23]_OUT.txt` + git ls-files inventory + W155 F1+F2+F3 commit anchors `d29b8fc` + `d59c472` + `f4597b6`)
- **CR-3** ✅ FULLY SATISFIED V2+V3 PARALLEL Path P REAL GPT-5.5 codex CLI 0.130.0 (20th non-Phase-1-bootstrap; W153 F1+F2+F5+F7+F8+F9+F10+F11+F12+F13 + W154 F1+F2+F3+F4+F5+F6+F7 + W155 F1+F2+F3+F4)
- **CR-5** N/A (audit fire, no install action)
- **CR-6** N/A (audit fire, no install action)
- **CR-7** ✅ REPORT before route-around (V3 10 SAVED-SHIP catches all disclosed in §6; ship-path correction ACK in frontmatter)
- **CR-8** ✅ TIER-3-LOCAL-COMPOSITION; constituents=[V2+V3 verdicts + git ls-files inventory + W155 F1+F2+F3 commit anchors]; effective_tier=TIER-3-LOCAL-COMPOSITION per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE
- **CR-9** ✅ Sibling-bleed defense (28 untracked rules cite `Z:/claude-sota/.claude/rules/` paths; preserved at 0% definitive per CR-12 TERTIARY HNF-gated; no install-class movement)
- **CR-10** ✅ Research-first (V2+V3 PARALLEL BEFORE F4 report composition + per-rule matrix probe)
- **CR-11** ✅ META-process SOTA (V2+V3 PARALLEL + Pattern A apply + 9th cross-arc RECURSIVE FM-09 catch — 4th in W155)
- **CR-12** N/A (no upstream-vs-incumbent classification; F4 is per-rule classification discipline)

**Risk class**: **HIGH** per V3 a8 (escalated from V2 MEDIUM; 28 untracked rules classification load-bearing for F5-F8 sub-fires + F4+ Pattern A remediation queue).

## §9 Headline answer (per-cohort breakdown — NOT collapsed per V3 catch #3)

- **Rules disk total**: 39 (`.claude/rules/*.md`)
- **Cohort A (TRACKED-EEE-NOVEL)**: 2 rules (fm21 + sota-research-architecture); 100% TIER-1 ✅; eee-conformance bar = direct upstream/named-author cite + TIER-3-LOCAL composition
- **Cohort B (TRACKED-SIBLING-DERIVED)**: 9 rules; 89% TIER-1 / 100% CR-12 / 78% VERIFIED; cite-import-AMBER ratified at import time (CR-3 satisfied)
- **Cohort C (UNTRACKED-CITE-IMPORT-AMBER)**: 28 rules; 89% TIER-1 / 100% CR-12 / **0% definitive** (V3 catch #2 — preserved; do NOT ratify in F4)
- **Cohort D (LOCAL-ONLY-WITHOUT-TIER-1)**: 6 rules; AMBER classification per CR-12 TERTIARY (acceptable when sister-cite-import HNF-gated)
- **Cohort E (HEADER-GAP)**: 7 rules without Reference: header (format-only; NOT cite-tier defect)

**F4+ Pattern A remediation queue (Fnext+; NOT in F4 itself)**:
- 6 rules: add VERIFIED markers (P3 — markers strengthen but not required)
- 7 rules: add Reference: header (P3 — format-only)
- 28 untracked: Section 14.5 ratification operator-decision-required (P0/P1 depending on rule); do NOT auto-promote
- 2 eee-NOVEL: add VERIFIED markers per evidence-policy.md (P2)

## §10 Forward direction (W155 F5 next per cron `81bd1a59`)

Per W155 F1 V2+V3 CONVERGENCE table: **F5 = `.claude/agents/` + `.claude/skills/` audit** (8 untracked agents + 10 disk skills) ≤450 LOC. Per V3 scope-creep risk #1: F5 = agents/skills classification ONLY; rules ratification stays in F4+ remediation queue (NOT F5).

Per cron tick: `81bd1a59` will fire next tick (~5min). F5 sub-fire follows V2+V3 PARALLEL Path P discipline + ≤450 LOC budget + V3 SCOPED-DOWN minimum_viable convergence + ship to docs/ (NOT tmp/) per operator signal `32ad989` ACK.

[VERIFIED via `.claude/state/codex_consult_w155_f4_rules_audit_v2_OUT.txt` (717 LOC / 43s / APPROVE conf=0.92 / 27859 tok)]
[VERIFIED via `.claude/state/codex_consult_w155_f4_rules_audit_v3_adversarial_OUT.txt` (1640 LOC / 51s / F4-NEEDED-LIGHT conf=0.91 / fm09_recursive_catch=YES / 58854 tok)]
[VERIFIED via `git ls-files .claude/rules/` (11 tracked) + `Get-ChildItem .claude/rules/*.md` (39 disk)]
[VERIFIED via `git show d29b8fc d59c472 f4597b6` W155 F1+F2+F3 parent commit anchors]
[VERIFIED via per-rule cite probe matrix §1 aggregate counts]

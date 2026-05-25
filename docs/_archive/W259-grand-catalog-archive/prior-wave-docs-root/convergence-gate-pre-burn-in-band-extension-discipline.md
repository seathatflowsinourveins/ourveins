# Convergence-Gate Pre-Burn-In Single-Maintainer Band Extension (Fire 43 W134-F-CG-UPDATE codification)

> **Purpose**: codify the convergence-gate.md Axis-3 5-band table EXTENSION surfaced at Wave 134 Fire 33b bnomei/frigg deep-dive. The 5 named bands (Stable burn-in / Active iteration / Sustained active maintenance / Fast-churn anti-pattern / STRONG-PROVENANCE-EXPRESS) do NOT cleanly classify candidates with cpd<10 AND age 30-90d AND single-individual maintainer (Tier-4 per SRA D4). NEW 6th band "Pre-burn-in single-maintainer SOTA" + default verdict + re-audit trigger.
> **Parent rule**: `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 3 5-band table (cite-import-AMBER per CR-12 tertiary path; direct sibling rule edit out-of-scope per CR-9 sibling-bleed defense).
> **Cite class**: `constituents=[TIER-1-OPERATOR-OBSERVED @ Wave 134 Fire 33b bnomei/frigg cpd 1.13/day age 68d single-individual Bruno Meilick falls outside 5 named bands, TIER-2 sister-rule cite-import-AMBER @ Z:/claude-sota/.claude/rules/convergence-gate.md Axis 3 + Z:/claude-sota/.claude/rules/sota-research-architecture.md D4 maintainer-provenance + Z:/claude-sota/.claude/rules/codification-threshold.md cycle-322 + Z:/claude-sota-installed/CLAUDE.md cardinal-rule-9 install-risk + Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md (Fire 37) + Z:/claude-sota-installed/docs/evidence-governed-harness-8-gate-discipline.md (Fire 41 Gate 1 + Gate 4) + Z:/claude-sota-installed/docs/4class-memory-taxonomy-discipline.md (Fire 42 Class 3 PROCEDURAL gate), TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 33b empirical gap + Fire 41 Gate 1 Registry Trust framework + Fire 42 evidence-synthesis ladder]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## The gap (empirically surfaced at Fire 33b)

`Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 3 (stability) defines 5 bands:

| Band | cpd × age condition | Classification | Implication |
|---|---|---|---|
| 1 | `cpd < 10` AND `age ≥ 90d` | Stable burn-in | Firm axis-3 PASS |
| 2 | `10 ≤ cpd ≤ 20` AND `90d ≤ age ≤ 180d` | Active iteration | Borderline — PASS-with-caveat |
| 3 | `cpd > 10` AND `age > 180d` | Sustained active maintenance | Firm axis-3 PASS |
| 4 | `cpd > 10` AND `age < 100d` | Fast-churn anti-pattern | Treat age-PASS as borderline |
| 5 | STRONG-PROVENANCE-EXPRESS predicate | Firm axis-3 PASS — relaxed maturity | `age ≥ 30d` AND axis-1 = official-org + axis-2 named-T2 |

**Empirically observed gap (Wave 134 Fire 33b — bnomei/frigg)**:
- cpd = 1.13/day → Band 1 condition `cpd < 10` matches
- age = 68d → Band 1 condition `age ≥ 90d` does NOT match
- single-individual Bruno Meilick (Tier-4 per SRA D4) → STRONG-PROVENANCE-EXPRESS clause-2 FAIL (not official-org; not named-T2)

Result: cpd<10 + age 30-90d + Tier-4 maintainer = UNCLASSIFIED. The 5 bands do NOT cover this region. Fire 33b deferred verdict to "STUDY-PILOT-NARROW DEFER-PENDING-AXIS-3-MATURATION (re-audit 2026-06-04)" as ad-hoc disposition without a named band.

## NEW 6th band — "Pre-burn-in single-maintainer SOTA"

| Band | cpd × age × maintainer condition | Classification | Default verdict |
|---|---|---|---|
| **6** | `cpd < 10` AND `30d ≤ age < 90d` AND (Tier-4 single-individual OR Tier-5 anonymous) maintainer | **Pre-burn-in single-maintainer SOTA** | **DEFER-PENDING-AXIS-3-MATURATION** (re-audit at age=90d trigger) |

**CRITICAL semantic clarification (Pattern A fix-forward edit #1 per codex T1 prescription)**: Band 6 is a **DEFER-ONLY study classification**. It does NOT authorize INSTALL or pilot execution BEFORE the age=90d re-audit. The "STUDY" in STUDY-PILOT-NARROW refers to **READ-ONLY methodology investigation** (Probe DAG 1-7 / source-code line-by-line review / SRA D1-D10 scoring / Mia probe of fit), NOT runtime adoption. Active pilot execution requires a SEPARATE higher-trust pathway (e.g., reclassification to Band 1 after age=90d re-audit, OR STRONG-PROVENANCE-EXPRESS upgrade if named-T2 endorsement arrives, OR explicit user-trigger MANUAL-OVERRIDE per `closed-loop-recursive-narrowing.md` Outcome C).

### Band-6 sub-classification (per maintainer tier + activity status)

| Sub-band | Maintainer tier + activity | Default verdict | Activity threshold |
|---|---|---|---|
| 6a | Tier-4 named-individual + **active commits** (≥1 commit in last 14d) | DEFER-PENDING-AXIS-3-MATURATION (re-audit at age=90d) | active |
| **6c (Pattern A fix-forward edit #2)** | Tier-4 named-individual + **stale/near-zero activity** (<1 commit in last 14d during 30d-90d window) | DEFER-PENDING-ACTIVITY-VERIFICATION | stale |
| 6b | Tier-5 anonymous OR single-org with no named practitioners | DEFER-PENDING-MAINTAINER-VERIFICATION + **MUST first satisfy Fire 41 Gate 1 Tier-D minimum** (Pattern A fix-forward edit #3) | n/a |

**Pattern A fix-forward edit #3 — Tier-5 Gate 1 Tier-D minimum mandate**: Band 6b Tier-5 anonymous candidates MUST first satisfy Fire 41 Gate 1 Registry Trust **Tier-D (unsigned-individual)** minimum. If the candidate cannot meet Tier-D (i.e., falls to Tier-E unknown-provenance), Band 6 is **NOT AVAILABLE**; the candidate remains BLOCKED until Tier-D verification (named-author intent verification, sigstore signature, OR explicit maintainer org-affiliation surfacing). Per Fire 41 Gate 1 verdict shape, Tier-E candidates fall outside the adoption envelope entirely.

## Why this band is necessary

**Empirical evidence (Fire 33b bnomei/frigg)**:
- Frigg surface signals strong (MIT/MPL-2.0 + Rust 2024 + rmcp 1.2.0 + axum + tantivy + scip + 7 tree-sitter grammars + native MCP + 11-language + 24+ MCP tools)
- BUT Axis-3 maturity gap (68d age below 90d burn-in threshold)
- AND STRONG-PROVENANCE-EXPRESS clause-2 FAIL (single-individual maintainer; no official-org)
- Result: pattern is GENUINELY-NEW per CR-12 disposition but premature for INSTALL

Without Band 6, candidates in this region receive ad-hoc dispositions that vary across fires (DEFER vs REJECT vs STUDY-PILOT all defensible without codified discipline). Band 6 standardizes the verdict.

**Cross-fire consistency (FM-20 defense)**:
- Future fires hitting same cpd × age × maintainer region apply Band 6 verdict uniformly
- Re-audit trigger codified (age reaches 90d → re-evaluate against Bands 1 or 2)
- Promotion path codified (60d-burn-in transition pathway via cycle-322 ≥2 dogfood)

## Re-audit triggers (operational discipline)

### Primary trigger — age=90d milestone

When a Band-6 candidate's repo bumps to `age ≥ 90d`:
1. Recompute cpd at the 90d mark (may have changed if commit velocity shifted)
2. Reclassify per Bands 1-5 (the candidate now falls into one of the original 5 named bands)
3. If reclassified to Band 1 (Stable burn-in) → STUDY-PILOT → INSTALL pathway resumes
4. If reclassified to Band 2 (Active iteration) → borderline — combine with SRA D4 to decide
5. If reclassified to Band 4 (Fast-churn anti-pattern) → upgrade-velocity-warning; defer further

### Early re-audit triggers (Pattern A fix-forward edit #4 per codex T1 prescription)

Re-audit BEFORE the age=90d milestone when ANY of the following early triggers fires:

| Trigger | Re-audit reason | Effect on Band 6 classification |
|---|---|---|
| **Material commit-velocity change** (cpd shifts by ≥2× in either direction) | Velocity change may push candidate into Band 4 (fast-churn) OR signal stagnation (Band 6c stale) | Recompute cpd × age × maintainer; reclassify per Bands 1-6 |
| **Maintainer identity/provenance change** (new contributor joins; old maintainer departs; transfer to new org) | SRA D4 maintainer tier shift may unlock Band 5 STRONG-PROVENANCE-EXPRESS OR push to Tier-3 NAMED-ORG | Re-run SRA D4 + Probe DAG 1-7 |
| **Named-T2 practitioner endorsement** (dated artifact: tweet / blog / talk / conference paper cites the repo) | Unlocks Band 5 STRONG-PROVENANCE-EXPRESS predicate clause-2 | Promote to Band 5 if other STRONG-PROVENANCE-EXPRESS clauses hold |
| **Official-org adoption** (Anthropic / OpenAI / Microsoft / Google / Apache / Linux Foundation surfaces dependency on or endorsement of the repo) | Unlocks SRA D4 Tier-1 OFFICIAL classification | Promote to Band 5 unconditionally |
| **License change** (e.g., MIT → AGPL OR AGPL → MIT OR proprietary clause inserted) | Affects SRA D1 use-class precision; may invalidate Band 6 adoption pathway entirely | Re-run SRA D1 per use-class lattice |
| **Security/advisory event** (CVE disclosure / supply-chain incident / known-FM-class trigger documented) | SRA D9 failure-mode awareness shift; may invalidate Band 6 candidacy | Re-classify with SRA D9 fresh probe |

Per Fire 41 Gate 3 Context Freshness composition: Mia probe of Band-6 candidate's repo state should fire at synthesis-time AND at any session referencing the candidate; Marker Decay corollary applies if `[VERIFIED YYYY-MM-DD]` > 30 days old.

## Composition with sister rules

### With CR-12 5-class disposition lattice (Fire 27 series)

Band 6 candidates default to **GENUINELY-NEW** (CR-12 class 1) IF the primitive's mechanism is novel; otherwise apply normal CR-12 classification. Band-6-class candidates still must pass Probe DAG 1-7; Band 6 is the **Axis-3 stability defer**, NOT a CR-12 disposition override.

### With Fire 41 Gate 1 Registry Trust (post-Fire-41 compose)

Band 6 candidates require **Gate 1 Tier-D (unsigned-individual) verdict at minimum** per Fire 41 framework. Tier-D candidates qualify for Band 6 6a sub-classification IF named-author intent verified (per SRA D4); Tier-E (unknown-provenance) candidates fall to Band 6 6b.

### With Fire 42 4-class memory taxonomy (post-Fire-42 compose)

When recording Band-6 verdicts:
- Episode of running the audit + reaching Band-6 verdict → Class 2 EPISODIC-TRACE → graphiti
- The Band-6 verdict ITSELF (e.g., "frigg = Band 6a DEFER until 2026-06-04") → Class 1 SEMANTIC-FACT → mcp-memory
- The re-audit trigger schedule → Class 4 OPERATIONAL-RUNBOOK → MEMORY.md OR scheduled task

### With SRA D4 maintainer-provenance tier

Band 6 is **only triggered** when SRA D4 returns Tier-4 OR Tier-5. Tier-1 OFFICIAL or Tier-2 NAMED-PRACTITIONER candidates use STRONG-PROVENANCE-EXPRESS predicate (Band 5) instead. Tier-3 NAMED-ORG candidates fall into Band 1 or Band 2 based on cpd × age alone (org-multi-contributor mitigates the single-maintainer risk).

## Sister-rule integration target

This discipline doc is **TIER-3-LOCAL-COMPOSITION cite-extension only** — does NOT directly edit sibling `Z:/claude-sota/.claude/rules/convergence-gate.md`. Per CR-12 tertiary path + CR-9 sibling-bleed defense:
- Sibling rule edit requires explicit sibling-rule-codification ship in sibling repo (out-of-scope for this fire)
- This discipline doc codifies the Band 6 extension LOCALLY at claude-sota-installed; sibling rule REMAINS at 5-band table
- Operator MUST cite BOTH (sibling 5-band + this doc Band 6) when applying Band 6 in eee runtime
- Future sibling-rule-codification ship MAY upstream-port Band 6 into sibling convergence-gate.md (queued as `W134-F-CG-UPSTREAM` Forward candidate)

## Anti-patterns

- **Apply Band 6 default verdict without re-audit trigger** — refuted by §Re-audit trigger discipline. Band 6 is TEMPORAL-PENDING; without re-audit scheduling, the candidate stays in DEFER limbo indefinitely.
- **Use Band 6 to bypass STRONG-PROVENANCE-EXPRESS** — refuted by §Why this band is necessary. Band 5 (STRONG-PROVENANCE-EXPRESS) is the OFFICIAL-ORG fast-path; Band 6 is the SINGLE-MAINTAINER pre-burn-in DEFER. They cover different cases; conflating them produces wrong adoption decisions.
- **Apply Band 6 to org-maintained candidates** — refuted by maintainer-tier scoping. Band 6 only applies to Tier-4 + Tier-5 (single-individual + anonymous). Tier-3 NAMED-ORG candidates have multi-contributor mitigation and fall back to Bands 1-4.
- **Skip Band 6 sub-classification (6a vs 6b)** — refuted by maintainer-verification-before-adoption discipline. Tier-5 anonymous candidates need maintainer intent verification BEFORE even STUDY-PILOT; Tier-4 named-individual candidates may proceed directly to STUDY-PILOT.
- **Conflate Band 6 (pre-burn-in maturity) with Band 4 (fast-churn anti-pattern)** — refuted by `cpd × age` mapping. Band 4 is HIGH cpd (`cpd > 10`) + LOW age (`age < 100d`); Band 6 is LOW cpd (`cpd < 10`) + LOW age (`30d ≤ age < 90d`). Different failure modes; different recovery paths.
- **Treat Band 6 as soft substitute for STRONG-PROVENANCE-EXPRESS OR Fire 41 Gate 1 registry-trust requirements** (Pattern A fix-forward edit #5 per codex T1 prescription) — refuted by §Why this band is necessary + Fire 41 Gate 1 composition. STRONG-PROVENANCE-EXPRESS (Band 5) is the **OFFICIAL-ORG fast-path** for relaxed maturity gate when provenance is firm; Band 6 is the **SINGLE-MAINTAINER pre-burn-in DEFER** for the OPPOSITE provenance situation. Conflating them lets weak-provenance candidates slip into adoption pathways via Band 6 mis-application. Per Pattern A edit #3: Tier-5 anonymous candidates MUST satisfy Fire 41 Gate 1 Tier-D minimum BEFORE Band 6 applies; Band 6 NEVER substitutes for missing registry-trust verification.

## Promotion threshold (this discipline's own cycle-322 promotion path)

This rule is codified as **TIER-3-LOCAL-COMPOSITION discipline doc** at n=1 (Fire 33b bnomei/frigg empirical surfacing). Per cycle-322 jurisdiction:
- n=1 (this fire) → discipline doc shipped at `docs/convergence-gate-pre-burn-in-band-extension-discipline.md`
- n=2+ (future fires hitting Band-6 conditions) → evidence ladder accumulates
- n=3+ same-arc OR user-trigger explicit → promote to formal sibling-rule-port via `W134-F-CG-UPSTREAM` Forward candidate
- Sibling promotion path: ship sibling rule edit in `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 3 5-band table → 6-band table (separate fire; cite-import-AMBER discipline)

**Promotion-deferred** until n=3 dogfood evidence accumulates. Fire 43 ships the DISCIPLINE; promotion-to-sibling-rule happens after Band 6 is validated through repeated application.

## How to apply (operator-side discipline)

When auditing a SOTA candidate at any fire:

1. Compute cpd × age per Fire 33b bnomei/frigg methodology
2. Determine SRA D4 maintainer tier
3. Apply Band 1-5 first (per `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 3)
4. If candidate falls outside Bands 1-5 (cpd<10 AND age 30-90d AND Tier-4 OR Tier-5) → apply Band 6
5. Sub-classify into 6a (Tier-4 named-individual) or 6b (Tier-5 anonymous)
6. Default verdict: STUDY-PILOT-NARROW DEFER-PENDING-AXIS-3-MATURATION
7. Cite in commit body: `axis-3-band: 6a (pre-burn-in single-maintainer SOTA per docs/convergence-gate-pre-burn-in-band-extension-discipline.md)` + re-audit-date (age + (90 - current_age) days)
8. Schedule re-audit via CronCreate OR queue in OPERATIONAL-RUNBOOK per Fire 42 Class 4

## Update triggers

Re-evaluate this discipline when:
- A 7th band emerges in the gap analysis (e.g., cpd<10 AND age<30d AND any-tier maintainer = "Day-0 SOTA hype detection")
- Sibling `Z:/claude-sota/.claude/rules/convergence-gate.md` upstream-ports Band 6 as 6th-band → flip this doc to RETIRED-SUPERSEDED pointer
- A Band-6 candidate's re-audit at age=90d shifts cpd dramatically (e.g., velocity spike to fast-churn) → may require sub-band refinement
- cycle-322 n=3 dogfood evidence accumulates → promote to formal sibling-rule-port via W134-F-CG-UPSTREAM Forward candidate
- A Band-6 candidate adopted via STUDY-PILOT-NARROW produces incident → debug + refine Band-6 default verdict (e.g., tighten to REJECT-PENDING-MATURATION)

## Cite class for this discipline

`constituents=[TIER-1-OPERATOR-OBSERVED @ Wave 134 Fire 33b empirical gap, TIER-2 sister-rule cite-import-AMBER @ 7 sister rules, TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 41 Gate 1 + Fire 42 Class 3 + cumulative Wave 134 series]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Recursive dogfood note

This Fire 43 codification is the 9th Forward Discipline #2 recursive dogfood instance (post-cycle-322 promotion ladder advance n=8→n=9). The discipline doc itself classifies as Class 3 PROCEDURAL-SKILL-OR-RULE per Fire 42 4-class taxonomy; ships at n=1 (discipline-doc tier); promotion-to-formal-rule deferred to cycle-322 cross-arc evidence accumulation per Fire 42 evidence-synthesis ladder Stage 2 trigger.

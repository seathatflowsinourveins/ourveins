# Weighted Rubric for SOTA Candidate Evaluation (Fire 40 IMP-B codification)

> **Purpose**: formal quantitative weighted-rubric for SOTA candidate adoption verdicts. Operationalizes Fire 28 IMP-B + Fire 29c GPT-5.5 Axis-5 prescription "trace-first behavioral A/B gate + Pass^3 repeated trials".
> **Cite class**: `constituents=[TIER-1-USER-DIRECTIVE @ user-doc Part 5 Weighted Decision Matrix (6-dim S25/M20/C25/Co15/L10/P5), TIER-2 sister-rule cite-import-AMBER @ Z:/claude-sota/.claude/rules/sota-research-architecture.md SRA D1-D10 10-dimension lattice + Z:/claude-sota/.claude/rules/convergence-gate.md 3-axis convergence + Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md 7-probe DAG, TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 28 IMP-B codification + Fire 29c REAL GPT-5.5 Axis-5 prescription + Fire 33b empirical validation (frigg Axis-3 STRICT reading)]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.
> **Closed-loop**: Sister-rule edit to `sota-research-architecture.md` §"Quantitative rubric (rubric.md)" reference is QUEUED as SEPARATE next-fire scope per cycle-300 ONE-LOGICAL-UNIT-PER-FIRE.

## The two-variant rubric

eee uses BOTH variants. **eee-native SRA D1-D10 variant** is PRIMARY (10 dimensions, lattice-derived); **user-doc 6-dim variant** is CROSS-CHECK (6 dimensions, weighted simple). Both produce 0-10 normalized score; agreement within ±0.5 is convergence-PASS; divergence > ±0.5 triggers Mia investigation.

## Variant A — eee SRA D1-D10 Primary (10-dimension weighted)

Per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` D1-D10 lattice (cite-import-AMBER per CR-12 tertiary):

| Dim | Subject | Weight | Inputs (raw signals) | Score formula |
|---|---|---|---|---|
| **D1** | License-use-class precision | 15% | SPDX + use-class lookup (CLI-binary vs library-link vs network-served vs SaaS) | 0 = REJECT-FOR-FIT (D1 FAIL = blocking) / 0.5 = LGPL/MPL conditional / 1 = MIT/Apache-2.0/BSD permissive |
| **D2** | SOTA-freshness (last-push age) | 12% | `gh api repos/<owner>/<repo>` `pushed_at` field | Active <30d=1.0 / Maintained 30-90d=0.85 / Stable-burn-in 90-180d=0.75 / Stale 180-365d=0.4 / Dormant >365d=0 |
| **D3** | Star-velocity vs content-depth | 5% | stars + age + repo-size + git-history pattern | Fresh-paint suspect → 0.2 / Standard → 0.7 / Sustained-quality → 1.0 |
| **D4** | Maintainer provenance tier | 12% | gh api users/<user> + Sigstore + org-affiliation | TIER-1-OFFICIAL=1.0 / TIER-2-NAMED-PRACTITIONER=0.85 / TIER-3-NAMED-ORG=0.7 / TIER-4-NAMED-INDIVIDUAL=0.5 / TIER-5-UNKNOWN=0.2 |
| **D5** | Active-maintenance signals | 10% | issue-close-rate + PR-merge-rate + contributor-diversity + release-cadence (90d windows) | 0/4 signals=0 / 1-2/4=0.4 / 3/4=0.7 / 4/4=1.0 |
| **D6** | Use-class compatibility (mode-harness-shape) | 10% | Probe 5 mode-harness-shape per agent-harness-fit-verification.md | 0 = REJECT (D6 FAIL = blocking) / 0.5 = partial-fit / 1 = full-fit |
| **D7** | Anthropic CC official policy alignment | 8% | code.claude.com/docs check + anthropics/claude-plugins-official marketplace check | 0 = contradicted by Anthropic / 0.5 = silent / 1 = endorsed |
| **D8** | Industry adoption signal | 8% | multi-org-adoption + named-T2-endorsement + conference-talks + forum-mentions | 0 sources=0 / 1=0.4 / 2=0.7 / ≥3=1.0 |
| **D9** | Failure-mode awareness | 5% | named-failure-modes.md cross-ref + CVE/security-advisory probe + issue-tracker patterns | UNDOCUMENTED-FAIL-CLASS=0 / known-with-recovery=0.7 / clear-no-failures=1 |
| **D10** | Replacement viability (when applicable) | 15% (or proportional) | Y satisfies D1-D9 + Y freshness ≤ X freshness + Y functional coverage | 0 = REJECT-REPLACEMENT / 1 = viable |

**Total weight**: 100% (D10 only applied for replacement decisions; when not applicable, weight redistributes proportionally across D1-D9).

**D10 redistribution formula (per Pattern A codex T1 Fire 40 prescription #1)**: when D10 is N/A (non-replacement decision):
```
effective_weight_D_n = original_weight_D_n × (1.0 / (1.0 - 0.15))
                     = original_weight_D_n × 1.1765
```
Resulting effective weights (D1-D9 only): D1=17.6% / D2=14.1% / D3=5.9% / D4=14.1% / D5=11.8% / D6=11.8% / D7=9.4% / D8=9.4% / D9=5.9% → SUM=100%. Apply this proportional renormalization for ALL non-replacement adoption decisions.

**Score computation**: `score = sum(dimension_weight × dimension_score) / 1.0` → produces 0-10 normalized score (multiply by 10).

**Hard gates**: D1 FAIL OR D6 FAIL = blocking REJECT-FOR-FIT regardless of other dimensions. Per Pattern A codex T1 Fire 40 next_steps #2: do NOT add D2 freshness as hard-gate (keep only D1 + D6 as blocking gates unless separate policy mandates freshness minimums).

## Variant B — user-doc Part 5 6-dimension (CROSS-CHECK)

Per user-doc Part 5 template (TIER-1-USER-DIRECTIVE inspiration); **weights S25/M20/C25/Co15/L10/P5 preserved verbatim from user-doc Part 5; dimension names spelled out inline per Pattern A codex T1 Fire 40 prescription #3**:

| Dim short-code | Full name | Weight | Inputs |
|---|---|---|---|
| **S25** = **Security** | Vulnerability + safety posture | 25% | 0.5 × Scorecard/10 + 0.3 × (1 − grype_high_cve_rate) + 0.2 × (best-practices-badge {0,0.7,0.85,1}) |
| **M20** = **Maintenance** | Active maintenance + bus-factor | 20% | 0.5 × (commits_90d/100, capped) + 0.3 × (contributors_active, capped) + 0.2 × Scorecard.Maintained/10 |
| **C25** = **Capability** | Behavioral A/B pass-rate vs task prompts | 25% | subjective 0-1 from skill-creator eval pass-rate (Fire 28 IMP-D codification target) |
| **Co15** = **Community** | Adoption + responsiveness | 15% | 0.4 × (log10(stars)/5, capped) + 0.3 × forks_velocity + 0.3 × issue_response_time_inv |
| **L10** = **License/Compliance** | SPDX allowlist + copyleft penalty | 10% | {MIT/Apache/BSD=1, MPL=0.7, LGPL=0.5, GPL=0.2 if compatible else 0} |
| **P5** = **Performance** | Micro-benchmarks | 5% | subjective from own micro-benchmarks if applicable, else neutral 0.7 |

**Total**: 100%. Short codes S25/M20/C25/Co15/L10/P5 are preserved verbatim from user-doc Part 5 to maintain cite-import-AMBER alignment.

## Variant-mapping table (eee SRA D1-D10 ↔ user-doc 6-dim) — Pattern A apply: FULL/PARTIAL/EEE-NOVEL labels per codex T1 Fire 40 prescription #2

| eee Dim | user-doc Dim | Mapping class | Notes |
|---|---|---|---|
| D1 License-use-class | L10 License/Compliance | **PARTIAL** | eee adds use-class precision (CLI-binary / library-link / network-served / SaaS); user-doc is single-axis SPDX-with-copyleft-penalty |
| D2 SOTA-freshness | M20 Maintenance | **PARTIAL** | eee splits freshness from active-maintenance; user-doc bundles into single Maintenance dim |
| D3 Star-velocity | Co15 Community | **PARTIAL** | eee adds fresh-paint detection (squashed history + age + star ratio anti-pattern); user-doc uses log-scaled stars only |
| D4 Maintainer-provenance | Co15 Community + S25 Security | **PARTIAL** | eee adds 5-tier maintainer-provenance lattice (TIER-1-OFFICIAL through TIER-5-UNKNOWN); user-doc has no formal maintainer-tier |
| D5 Active-maintenance | M20 Maintenance | **FULL** | Same surface (commits-90d + contributors-active + Scorecard.Maintained + signals) |
| D6 Use-class compat (Probe 5) | C25 Capability | **PARTIAL** | eee adds mode-harness-shape Probe 5 (autonomous /loop / HARD-GATE / meta-skill harness); user-doc Capability is skill-creator eval pass-rate only |
| D7 Anthropic CC alignment | (no user-doc equivalent) | **EEE-NOVEL** | Reflects eee local-runtime alignment with code.claude.com/docs + anthropics/claude-plugins-official; no user-doc parity |
| D8 Industry adoption | Co15 Community | **FULL** | Same surface (multi-org adoption + named-T2 endorsement + conference/forum signals) |
| D9 Failure-mode awareness | S25 Security | **PARTIAL** | eee adds named-failure-modes.md cross-ref (FM-N catalog awareness); user-doc Security is Scorecard + grype + best-practices-badge |
| D10 Replacement viability | (no user-doc equivalent) | **EEE-NOVEL** | Per SRA D10 replacement gate (Y satisfies D1-D9 + Y freshness ≤ X freshness); no user-doc parity |

**Mapping class summary**: 2 FULL (D5+D8) / 6 PARTIAL (D1+D2+D3+D4+D6+D9) / 2 EEE-NOVEL (D7+D10).

## Sensitivity analysis discipline

Per user-doc Caveat #2 + Fire 29c GPT-5.5 Axis-5 Pass^3 prescription:

1. **Standard fire**: compute Variant A + Variant B scores; check convergence (Variant A vs Variant B agreement within ±0.5 = PASS)
2. **±5% weight perturbation** (per Pattern A codex T1 Fire 40 prescription #5 — precision spec): **RELATIVE perturbation** — each dimension weight is multiplied by (1.0 ± 0.05); i.e., D1=15% becomes either 15% × 1.05 = 15.75% OR 15% × 0.95 = 14.25%. After perturbation, **renormalize ALL weights** so they sum to 100% again (since only one dim is perturbed at a time, renormalize by dividing each by (sum_post_perturbation / 1.0)). Re-compute total score; if rank flips between candidates → DOWNGRADE-WITH-DISCLOSURE. Run perturbation per dimension separately (not all dims simultaneously).
3. **Pass^3 repeated trials** (high-risk architecture changes only — per Fire 29c IMP-R): run 3 independent skill-creator A/B evaluations for D6 Capability score; average across 3 trials; standard-deviation > 0.3 → re-evaluate

## Tie-breaker hierarchy (when scores agree within ±0.5)

Per user-doc Part 5 tie-break analysis + SRA D2+D10 freshness gate:

1. **Bus-factor**: ≥3 active contributors wins over solo-maintainer
2. **OpenSSF Best Practices badge tier**: Gold > Silver > Passing > none
3. **Time-decay (90d commit slope)**: positive slope wins
4. **Downstream blast radius**: less-coupled dependency tree wins
5. **Sigstore-signed releases**: signed wins
6. **Anthropic CC alignment (D7)**: explicit endorsement wins
7. **Codex T1 verdict from prior fire** (if available): APPROVE > NEEDS-REVISION > REJECT

## Source quality scoring (IMP-K integration)

Per Fire 28 IMP-K + Fire 29a multi-source-discovery-breadth-discipline.md §Counting rules:

Source quality scoring (sub-multiplier on Variant A D8 Industry adoption + Variant B Community):

| Source class | Quality multiplier |
|---|---|
| TIER-1-OFFICIAL named-org first-party API (GitHub / arXiv / deps.dev / Anthropic CC docs) | 1.0 |
| TIER-2 user-curated reference + community catalog (awesome-* + PulseMCP + DeepWiki Directory) | 0.7 |
| TIER-3 scraped HTML (general WebFetch) | 0.5 |
| Multi-endpoint same provider (per multi-source-discovery-breadth-discipline.md §Counting rules) | counts as 1 source only |

Effective source-count for D8: weighted-by-quality (NOT raw count).

## How to apply

1. **Per-fire**: when SOTA candidate audit fires, compute Variant A + Variant B scores
2. **Sensitivity check**: ±5% weight perturbation per dimension
3. **Convergence verification**: Variant A vs Variant B agreement within ±0.5 = PASS; > ±0.5 = Mia investigation required
4. **Hard-gate enforcement**: D1 OR D6 FAIL → REJECT-FOR-FIT regardless of other dimensions
5. **Score record**: write to fire's close-synthesis.md with full rubric table + sensitivity + tie-breakers used
6. **ADR record**: per Fire 28 IMP-C log4brains (when adopted) — every score event becomes ADR entry
7. **Eval corpus version**: per Fire 29c IMP-L (when codified) — rubric scores cite eval-corpus-version + rubric-version

## Example application — frigg (Fire 33b) — Pattern A apply per codex T1 Fire 40 prescription #4: full per-dimension arithmetic trace

| Dim | Score | Effective weight (D10 N/A → 1.1765× redistribution) | Weighted contribution | Cite |
|---|---|---|---|---|
| D1 License-use-class | 1.0 (MIT + MPL-2.0 permissive) | 17.6% | 1.0 × 0.176 = **0.176** | Cargo.toml line 16 |
| D2 SOTA-freshness | 0.85 (last-push 2026-04-17 ≈ 24 days at fire-time, Maintained band) | 14.1% | 0.85 × 0.141 = **0.120** | gh api pushed_at |
| D3 Star-velocity | 0.7 (low velocity; standard; no fresh-paint markers) | 5.9% | 0.7 × 0.059 = **0.041** | (need explicit star count probe — flagged) |
| D4 Maintainer-provenance | 0.5 (TIER-4-NAMED-INDIVIDUAL bnomei) | 14.1% | 0.5 × 0.141 = **0.071** | gh api users/bnomei |
| D5 Active-maintenance | 0.4 (1-2/4 signals: solo + low PR-merge-rate; needs more probing) | 11.8% | 0.4 × 0.118 = **0.047** | list_commits + issues |
| D6 Use-class compat (Probe 5) | 1.0 (autonomous /loop compatible MCP HTTP) | 11.8% | 1.0 × 0.118 = **0.118** | README + native Claude Code integration |
| D7 Anthropic CC alignment | 0.5 (silent; no explicit endorsement found) | 9.4% | 0.5 × 0.094 = **0.047** | code.claude.com/docs search |
| D8 Industry adoption | 0.4 (1 source: Fire 30 spillover; no named-T2 endorsement) | 9.4% | 0.4 × 0.094 = **0.038** | multi-source probe |
| D9 Failure-mode awareness | 0.7 (no known FM-class issues) | 5.9% | 0.7 × 0.059 = **0.041** | named-failure-modes.md cross-ref |
| D10 Replacement viability | N/A | — | — | (frigg GENUINELY-NEW for cross-language call-graph; not replacing existing) |
| **TOTAL Variant A** | — | 100.0% | **0.699 = 6.99/10 → ~7.0/10** | STUDY-PILOT-NARROW upper band |

**eee Variant A total**: 0.176 + 0.120 + 0.041 + 0.071 + 0.047 + 0.118 + 0.047 + 0.038 + 0.041 = **0.699 = 7.0/10** (STUDY-PILOT-NARROW band per SRA verdict thresholds 5-7).

**Cross-check Variant B**:
- Security: 0.6 (no Scorecard; Trivy/Grype not run; no best-practices-badge) = 25% × 0.6 = 0.15
- Maintenance: 0.4 (cpd 1.13 × 90 ≈ 102 capped at 100/100 = 1.0; contributors 1; Scorecard N/A) = mid range = 20% × 0.4 = 0.08
- Capability: N/A (no skill-creator eval run; reserved 0.7 neutral) = 25% × 0.7 = 0.175
- Community: 0.4 (log10(stars-unknown); no fork data; no issue-response-time) = 15% × 0.4 = 0.06
- License: 1.0 (MIT/MPL permissive) = 10% × 1.0 = 0.10
- Performance: 0.7 (neutral; no benchmarks) = 5% × 0.7 = 0.035

**user-doc Variant B score** (per-dim arithmetic per Pattern A codex T1 Fire 40 prescription #4):

| Dim | Score | Weight | Weighted contribution |
|---|---|---|---|
| S25 Security | 0.6 (no Scorecard; Trivy/Grype not run; no best-practices-badge) | 25% | 0.6 × 0.25 = **0.15** |
| M20 Maintenance | 0.4 (cpd 1.13/day capped; contributors=1; Scorecard.Maintained N/A) | 20% | 0.4 × 0.20 = **0.08** |
| C25 Capability | 0.7 (neutral — no skill-creator eval run) | 25% | 0.7 × 0.25 = **0.175** |
| Co15 Community | 0.4 (log10(stars unknown); no fork data; no issue-response-time) | 15% | 0.4 × 0.15 = **0.06** |
| L10 License/Compliance | 1.0 (MIT + MPL-2.0 permissive) | 10% | 1.0 × 0.10 = **0.10** |
| P5 Performance | 0.7 (neutral; no benchmarks) | 5% | 0.7 × 0.05 = **0.035** |
| **TOTAL Variant B** | — | 100% | **0.60 = 6.0/10** |

**Convergence check (Variant A 7.0 vs Variant B 6.0)**: divergence = |7.0 − 6.0| = **1.0 > 0.5 threshold → Mia investigation TRIGGERED**. Likely causes per Pattern A trace:
1. Variant A counts D4 (TIER-4 maintainer = 0.5) + D7 (Anthropic CC alignment = 0.5) — eee-novel dimensions absent from Variant B that pull Variant A score up
2. Variant B's C25 Capability uses 0.7 neutral (no skill-creator eval run) — would shift down with empirical eval
3. Missing inputs across BOTH variants (Scorecard / star count / skill-creator eval) — gather before final score record

Per discipline, gather missing inputs before final score record. **Frigg final score class: STUDY-PILOT-NARROW with ±1.0 divergence flag → DEFER-PENDING-AXIS-3-MATURATION + queue full input gathering for Fire 33c pre-pilot probe.**

**Frigg final verdict per rubric**: STUDY-PILOT-NARROW band with ±0.5 divergence flag → **DEFER-PENDING-AXIS-3-MATURATION** + queue full input gathering for Fire 33c pre-pilot probe (matches Fire 33b verdict per independent path).

## Anti-patterns

- **Use ONE variant without cross-check** — refuted by §Variant-mapping convergence requirement. ALWAYS compute both variants; ±0.5 agreement = PASS.
- **Score without sensitivity analysis** — refuted by user-doc Caveat #2 + Fire 29c IMP-R Pass^3 prescription. ±5% weight perturbation MANDATORY for high-stakes verdicts.
- **Skip hard-gate D1/D6 enforcement** — refuted by SRA D1+D6 blocking-fail discipline. Other dimensions cannot rescue D1/D6 FAIL.
- **Equate raw star count with Community score** — refuted by Fire 30+Fire 33b empirical (Sourcegraph MCP high stars + commercial license = REJECT). Star count is INPUT to D3 + Community; not VERDICT.
- **Skip tie-break hierarchy when scores agree** — refuted by §Tie-breaker hierarchy. Apply tie-breakers DETERMINISTICALLY.
- **Compose Variant A + Variant B scores** (e.g., average them) — refuted by §Cross-check discipline. Variant B is INDEPENDENT cross-check, NOT additive component.
- **Apply rubric to non-adoption decisions** — refuted by §How to apply step 1. Rubric is for ADOPTION VERDICT only (not for design choices, methodology codification, etc.).

## Sister-rule integration — 12 cites (Pattern A apply per codex T1 Fire 40 prescription #6 dedup: previously claimed "11 cites" was undercount; explicit count = 12 = 8 sister rules + 1 CLAUDE.md + 3 forward-ref IMPs)

**Sister rules (8)**:
1. `Z:/claude-sota/.claude/rules/sota-research-architecture.md` SRA D1-D10 (TIER-2 cite-import-AMBER per CR-12 tertiary) — provides the 10-dimension lattice; this rubric is the QUANTITATIVE codification
2. `Z:/claude-sota/.claude/rules/convergence-gate.md` Axis 1+2+3 — orthogonal axes (multi-org / named-T2 / 3-month stable); rubric D2+D4+D8 partially overlap with convergence-gate axes (DIFFERENT mechanism — rubric is quantitative score, convergence-gate is binary PASS/FAIL gate)
3. `Z:/claude-sota/.claude/rules/agent-harness-fit-verification.md` 7-probe DAG — rubric D6 explicitly references Probe 5 mode-harness-shape
4. `Z:/claude-sota-installed/.claude/rules/multi-source-discovery-breadth-discipline.md` (Fire 29a) — IMP-K source-quality scoring sub-multiplier on D8
5. `Z:/claude-sota-installed/.claude/rules/codex-t1-pattern-b-forward-discipline.md` (Fire 37) — codex T1 verdict used as tie-break #7
6. `Z:/claude-sota/.claude/rules/codex-t1-fix-forward-pattern.md` §Pattern A — fix-forward applies on NEEDS-REVISION verdicts on rubric scores; sensitivity-perturbation-flips trigger Pattern A
7. `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md` §Reporting categories — rubric divergence > ±0.5 triggers Mia investigation OR HONEST-NON-FINDING category
8. `Z:/claude-sota/.claude/rules/named-failure-modes.md` — D9 cross-references FM catalog

**Cardinal rule integration (1)**:
9. `Z:/claude-sota-installed/CLAUDE.md` cardinal-rule-3 (cross-model consensus) — rubric scoring fires under T1-T7 lifecycle gates

**Forward-ref IMPs (3)**:
10. Fire 28 IMP-C log4brains ADR — every score event becomes ADR entry (when log4brains installed)
11. Fire 28 IMP-D skill-creator A/B harness — D6 Capability score sourced from skill-creator eval pass-rate (when skill-creator installed + harness codified)
12. Fire 29c IMP-L benchmark/eval corpus versioning — rubric scores cite eval-corpus-version + rubric-version (when codified)

**Total integration count**: 12 (8 sister rules + 1 cardinal rule + 3 forward-ref IMPs). Updated from prior "11 cites" claim per codex T1 dedup; original count missed forward-ref IMPs being separately addressable.

## Update triggers

Re-evaluate this rubric when:
- A new SRA dimension emerges (D11+ candidate per `Z:/claude-sota/.claude/rules/sota-research-architecture.md` Update triggers)
- A new user-doc variant lands (e.g., user provides updated weighting)
- Sensitivity analysis ±5% perturbation FLIPS verdict frequently (>3 instances/month) — re-band the weights
- IMP-K source-quality scoring lands as separate codification — update D8 sub-multiplier formula
- IMP-L eval corpus versioning lands — add eval-corpus-version + rubric-version cite requirement
- Fire 32c first skill-creator A/B trial completes — calibrate D6 Capability score formula with empirical data
- Pass^3 repeated trials surface variance > 0.3 across 3 trials — investigate D6 score volatility
- Anthropic ships official rubric or ranking primitive — re-evaluate this rubric vs Anthropic-canonical surface

## Cite class for this rubric

`constituents=[TIER-1-USER-DIRECTIVE @ user-doc Part 5 Weighted Decision Matrix S25/M20/C25/Co15/L10/P5 + Fire 29c REAL GPT-5.5 SOTA Convergence Insights Axis-3 Pass^3 + Axis-5 trace-first eval-gate, TIER-2 sister-rule cite-import-AMBER @ Z:/claude-sota/.claude/rules/sota-research-architecture.md SRA D1-D10 + convergence-gate.md Axis 1+2+3 + agent-harness-fit-verification.md 7-probe DAG + mia-pre-apply.md + codex-t1-fix-forward-pattern.md §Pattern A + synthesis-layer-verify.md + named-failure-modes.md, TIER-3-LOCAL-OPERATOR-DERIVED @ Fire 28 IMP-B codification + Fire 29c GPT-5.5 Axis recommendations + Fire 33b frigg empirical validation + Fire 37 cycle-322 promotion precedent]; effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8 MIN_PRECEDENCE.

## Recursive promotion-fire dogfood note

This rubric ship dogfoods cross-model T1 review per CR-3 + Forward Discipline #2 (6th recursive dogfood instance — n=5 ladder advance from Fire 37 promotion completion). The rubric itself is META-process Tier-2 codification (defines HOW future adoption decisions get scored); Forward Discipline #2 applies to its codex T1 review.

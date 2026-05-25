# W326 Stream-6 — Streamlined CC-Pathway Pre-Screen Rubric (sca-PRE-v1)

> **Wave**: W326 | **Author**: w326-fork-6-cc-pathway | **Date**: 2026-05-19
> **Purpose**: 6-dim fast-screen rubric (<5 min) BEFORE escalating to full sca-v12 cascade (~60 min T1).
> **Lineage**: complements (NOT replaces) sca-v12 49+ dim cascade; pre-filter for cost-control.
> **cascade_degraded**: false (5/5 MCP-family floor met: dimensions.md local read + perplexity + WebSearch + ToolSearch + Bash/Glob)

## §1. Design rationale + non-goals

sca-v12 is comprehensive (49+ dims, ~$0.50–$0.00 cost, 15-60 min) but **too heavy for the 80% of candidates that screen out as T4/T5 cite-only or skip**. The Anthropic Multi-Agent Research blog notes 15× token-burn for multi-agent vs single-agent; that cost discipline forces a cheap up-front filter.

`sca-PRE-v1` is a **pre-screen**, not a replacement. It:

- Costs <$0.05 + <5 min wall-time per candidate
- Reuses 6 highest-leverage sca-v12 signals (D35, D7+R1-R5, D2, D22, D-EMP, "rollback")
- Outputs a **routing verdict**: ESCALATE-FULL-SCA-V12 / OPERATOR-DECISION / AUTO-T4 / AUTO-T5-SKIP
- Carries forward the D-EMP HARD GATE semantics (D-EMP=0 blocks T1/T1-PROV/T2 even at pre-screen)

**Non-goals**: replacing Phase-5 5-gate, Phase-6 codex GPT-5.5 cross-model review, Δ47 frontier-retention, or any T1-INSTALL ratification path. Pre-screen ≥3.5 ALWAYS hands off to full sca-v12.

## §2. Streamlined CC-pathway rubric (6 dims, final)

| Code | Name | sca-v12 source | W_pre | Hard-gate? |
|---|---|---|---|---|
| **P1** | `cc_pathway_fit` | D35 (D-CCRT) | 1.0 | Yes — P1=1 caps at T3 |
| **P2** | `install_cost_x_cardinal_compat` | D7 ∩ R1-R5 | 1.0 | Yes — P2=0 → T5 REJECT-CR-VIOLATION |
| **P3** | `ecosystem_momentum` | D2 + D12 (90d-weighted) | 0.7 | No |
| **P4** | `cross_source_corroboration` | D22 (MCP-family count) | 0.8 | Yes — P4=1 caps at T4 |
| **P5** | `empirical_viability_shim` | D-EMP proxy | 1.0 | Yes — P5=0 blocks T1/T1-PROV/T2 |
| **P6** | `rollback_simplicity` | NEW (cost-control axis) | 0.5 | No |

**`composite_denom_pre = 5.0`** (sum of weights).
**`composite_pre = Σ(P_i × W_i) / 5.0`** → range [1.0, 5.0].

**Why 6 not 8**: the proposed CODEX-CONSENSUS dim is a Phase-6 sca-v12 concern (codex rounds fire AFTER pre-screen, not during). The proposed CARDINAL-RULE dim is folded into P2 (install-cost AND CR-compat must both pass for non-zero P2); single combined dim is cheaper to evaluate.

## §3. Scoring guides per dim (1–5 anchors)

### P1 — `cc_pathway_fit` (W=1.0; hard-gate P1=1 → T3 cap)

| Score | Anchor |
|---|---|
| 5 | Ships as **native MCP server** with `.mcp.json` `npx -y <pkg>@<ver>` (CR-9 compliant) |
| 4 | Ships as **CC plugin** (`.claude/plugins/cache/.../<plugin>/<version>/`) |
| 3 | Ships as **standalone skill** (SKILL.md + auto-fire description-match) |
| 2 | Ships as **agent pattern** (subagent_type-resolvable) |
| 1 | **Repo-clone-only / pattern-extract** (no CC primitive — manual vendor required) |

### P2 — `install_cost_x_cardinal_compat` (W=1.0; hard-gate P2=0 → T5)

| Score | Anchor |
|---|---|
| 5 | **Zero-config MCP** (drop into `.mcp.json` env-interp + Stop-hook auto-wire) |
| 4 | **One-line `/plugin install`** OR plugin-marketplace add + reload |
| 3 | **Plugin import** with manual config edit (<5 LOC) |
| 2 | **Vendor-fork required** (per W316/W317 mattpocock/addyosmani precedent) |
| 0 | **Breaks cardinal rule** R1 (untrusted) / R2 (custom hook body) / R3 (custom subagent) / R4 (self-invented `.claude/rules/*.md`) / R5 (custom guard script) |

### P3 — `ecosystem_momentum` (W=0.7; soft signal)

Weighted-z-score: `0.4 × commits_90d_z + 0.3 × maintainer_velocity_z + 0.2 × star_trajectory_z + 0.1 × release_cadence_z`

| Score | Anchor |
|---|---|
| 5 | ≥1 commit/week × 90d + ≥3 maintainers + ≥1 release/90d + star-trajectory positive |
| 4 | ≥1 commit/2-weeks × 90d + ≥2 maintainers |
| 3 | Active but slow (1-3 commits/90d) |
| 2 | Sporadic (1 commit in 90d) |
| 1 | Archived / no commits 90d+ |

**Anchor cite**: OpenSSF Scorecard `Maintained` metric (90d window) at https://scorecard.dev (Linux Foundation/OSSF).

### P4 — `cross_source_corroboration` (W=0.8; hard-gate P4=1 → T4 cap)

Count of distinct MCP families that surface the candidate.

| Score | Anchor |
|---|---|
| 5 | ≥6 MCP families (github + perplexity + deepwiki + exa + tavily + repomix + hf-mcp + awesome-list) |
| 4 | 4-5 families |
| 3 | 2-3 families |
| 2 | 1 family (github-only) |
| 1 | Stage-0 probe failed on ≥2 families (suspect/hallucinated discovery) |

**Anti-bias**: per sca-v12 §2 Phase 1, top-10 ranking MUST surface ≥1 candidate first-discovered by EACH fired MCP family.

### P5 — `empirical_viability_shim` (W=1.0; HARD GATE — P5=0 blocks T1/T1-PROV/T2)

| Score | Anchor |
|---|---|
| 5 | Multi-wave soak (≥4 waves) + adversarial-survival in OUR runtime |
| 4 | Multi-wave soak (≥4 waves) in OUR runtime |
| 3 | Tested + multi-day production in OUR runtime |
| 2 | Tested + 1-cycle uneventful in OUR runtime |
| 1 | Tested in sandbox-only (3rd-party demo only; no smoke in OUR runtime) |
| 0 | **Untested in OUR runtime / smoke fails** → HARD BLOCK from T1/T1-PROV/T2 |

### P6 — `rollback_simplicity` (W=0.5; cost-control axis)

| Score | Anchor |
|---|---|
| 5 | `git revert <sha>` single-shot |
| 4 | Cache delete + `/plugin uninstall` + `/reload-plugins` |
| 3 | Config edit (`.claude/settings.json` + `.mcp.json` revert) |
| 2 | Multi-step: cache + config + state-dir cleanup + service restart |
| 1 | Undocumented / state-irreversible (DB migrations, secret rotation needed) |

## §4. Composite formula + thresholds

```
composite_pre = (P1×1.0 + P2×1.0 + P3×0.7 + P4×0.8 + P5×1.0 + P6×0.5) / 5.0

Hard gates (executed BEFORE composite):
  P2 = 0 → T5 REJECT-CR-VIOLATION (terminate)
  P1 = 1 AND target_tier ≥ T2 → demote to T3 PATTERN-STUDY
  P4 = 1 → suspect-discovery; cap at T4 + re-run Stage-0 probe
  P5 = 0 → BLOCK from T1/T1-PROV/T2 (route T3-or-lower)
```

## §5. Decision-tree router (5-min screen → full sca-v12 Y/N)

```
START → Stage-0 existence-probe (≥2 MCP families return hit)
  │
  ├─ Stage-0 FAIL → T5 NON-EXISTENT (terminate; 30 sec)
  │
  ├─ P2 = 0 → T5 REJECT-CR-VIOLATION (terminate; 60 sec)
  │
  ├─ composite_pre ≥ 3.5 → ESCALATE-FULL-SCA-V12
  │     • Pre-route hint: P1=5 → T1-INSTALL candidate
  │     • Pre-route hint: P1=3-4 → T1-INSTALL or T2-VENDOR-FORK
  │     • Pre-route hint: P1=2  → T2-CHERRY or T3
  │
  ├─ 2.5 ≤ composite_pre < 3.5 → OPERATOR-DECISION
  │     • Surface to ledger row: dwell_class fresh; require operator-sig
  │     • Default-on-no-decision: T3 PATTERN-STUDY (5-wave dwell escalates to ops-rhythm)
  │
  ├─ 1.5 ≤ composite_pre < 2.5 → AUTO-T4 CITE-ONLY
  │     • Skip full sca-v12; write ledger row + reference in docs
  │
  └─ composite_pre < 1.5 → AUTO-T5 SKIP
        • Skip full sca-v12; write ledger row with REJECT rationale
```

**Wall-time targets**: Stage-0 + 6-dim scoring + decision = **2-5 min** per candidate (vs 15-60 min full sca-v12).

## §6. Worked comparison: gpt-researcher vs paper-qa (agentic-research gap)

| Dim | `assafelovic/gpt-researcher` | `Future-House/paper-qa` |
|---|---|---|
| Stage-0 | PASS (github + repomix + deepwiki + perplexity) | PASS (github + repomix + deepwiki + perplexity + hf-mcp) |
| **P1** cc_pathway_fit | **2** (agent pattern; no CC primitive ships natively) | **2** (pattern-only; Python lib import pattern) |
| **P2** install_cost × CR | **3** (config + API keys + venv; CR-compliant) | **3** (Python lib + LLM provider config; CR-compliant) |
| **P3** ecosystem_momentum | **5** (≥1 commit/week × 90d; ≥5 maintainers; 16k stars trajectory positive) | **5** (FutureHouse active; PaperQA2 release cycle; 6k stars) |
| **P4** cross_source_corroboration | **5** (≥6 families: github, perplexity, exa, deepwiki, repomix, awesome-list) | **5** (≥5 families + arxiv paper-backing 2312.07559) |
| **P5** empirical_viability_shim | **1** (3rd-party demo only; not soaked in OUR runtime) | **1** (3rd-party demo only; not soaked in OUR runtime) |
| **P6** rollback_simplicity | **3** (config edit + venv state cleanup) | **3** (config edit + venv state cleanup) |
| **composite_pre** | (2+3+3.5+4+1+1.5)/5 = **3.00** | (2+3+3.5+4+1+1.5)/5 = **3.00** |

**Both → OPERATOR-DECISION zone (2.5-3.5)**. Differentiator MUST come from full sca-v12 cascade:

- D9 benchmark_anchor: paper-qa has PaperQA2 arxiv paper + LitQA2/LAB-Bench → likely D9=5; gpt-researcher community-bench only → likely D9=3
- D17 robustness: paper-qa peer-reviewed paper-backing → likely higher
- D29 browse_and_retrieval_quality: both compete on DeepResearch-Bench; gpt-researcher has wider production deployment
- D38 mcp_integration_native: NEITHER ships native MCP → BOTH cap at T2-VENDOR-FORK or T3-PATTERN-STUDY

**Pre-screen verdict**: ESCALATE BOTH to full sca-v12. **Pre-route hint**: both T2-T3 zone (P1=2 caps). **Operator-default**: route paper-qa to T3 PATTERN-STUDY first (paper-backing = stronger D5 anchor); gpt-researcher to T2-CHERRY-FRONTIER (broader feature coverage).

## §7. Impact on decision-making at 4 levels

| Level | Trigger | Action |
|---|---|---|
| **(a) INSTALL (T1/T0)** | composite_pre ≥3.5 AND P1≥3 AND P5≥2 AND P2≥3 | ESCALATE to sca-v12 with pre-route hint=T1; full cascade adds D-EMP soak + Phase-5 5-gate + Phase-6 codex |
| **(b) PATTERN-STUDY (T3)** | composite_pre 2.5-3.4 OR P1=1-2 OR P5=1 | Run sca-v12 pattern-track (W_pattern weights); ledger row + study-doc; no install |
| **(c) CITE-ONLY (T4)** | composite_pre 1.5-2.4 OR P4=1 | Skip full sca-v12; write 1-paragraph ledger note; cite in docs only |
| **(d) SKIP (T5)** | composite_pre <1.5 OR P2=0 OR Stage-0 FAIL | Terminate; T5 ledger row with rationale; no further work |

**Cost-control delta**: assuming a 20-candidate-per-wave research cadence with prior-baseline 100% sca-v12 escalation: pre-screen filters ~60% to T4/T5 at 5 min/each (savings: 60% × 55min ≈ 33min/candidate × 12 candidates = **~6.6 hours saved per wave**).

## §8. Integration with sca-v12 (handoff contract)

```yaml
sca_pre_v1_output:
  candidate_slug: <owner>/<repo>
  stage_0_passed: bool
  p1_cc_pathway_fit: 1..5
  p2_install_cost_x_cr_compat: 0..5
  p3_ecosystem_momentum: 1..5
  p4_cross_source_corroboration: 1..5
  p5_empirical_viability_shim: 0..5
  p6_rollback_simplicity: 1..5
  composite_pre: 0.0..5.0
  routing_verdict: ESCALATE-FULL-SCA-V12 | OPERATOR-DECISION | AUTO-T4 | AUTO-T5-SKIP
  pre_route_tier_hint: T0 | T1 | T1-PROV | T2 | T2-CHERRY | T3 | T4 | T5
  hard_gate_triggered: null | P2-CR | P1-T3-CAP | P4-T4-CAP | P5-EMPIRICAL
  cost_actual_usd: <$0.00..$0.05>
  wall_time_seconds: <60..300>
  cascade_degraded: bool
  mcp_families_fired: [list]
  wave: W<NNN>
  rule_version: sca-pre-v1
```

**Handoff to sca-v12**: when `routing_verdict = ESCALATE-FULL-SCA-V12`, sca-v12 §2 Phase 1 inherits `mcp_families_fired[]` and skips re-discovery; Phase 4 weighted-sum runs against the FULL 49+ dim set; `pre_route_tier_hint` is informational only (not binding on sca-v12 tier outcome).

**Anti-bias**: pre-screen P-scores ARE NOT inputs to sca-v12 D-scores (no anchoring leak). Pre-screen is a **routing** decision; sca-v12 is the **ratification** decision.

## §9. 3-org-distinct cite-anchors per dim

| Dim | Anchor 1 | Anchor 2 | Anchor 3 |
|---|---|---|---|
| **P1** cc_pathway_fit | Anthropic Claude Code plugin docs (https://code.claude.com/docs/en/plugins) | MCP spec 2025-06-18 §Transport (modelcontextprotocol.io) | wshobson/agents (community CC-agent corpus) |
| **P2** install_cost × CR | OpenSSF Scorecard `Pinned-Dependencies` + `Binary-Artifacts` (scorecard.dev/Linux Foundation) | NIST 800-53 CM-7 Least-Functionality (NIST/US DoC) | Anthropic CCBP `claude-settings.md:877-921` cardinal-rule R1-R5 |
| **P3** ecosystem_momentum | OpenSSF Scorecard `Maintained` 90d-window (scorecard.dev) | CHAOSS `code-contribution-velocity` (chaoss.community / Linux Foundation) | ISO/IEC 25010 §6 maintainability quality model (ISO) |
| **P4** cross_source_corroboration | NIST AI 600-1 MEASURE-2.7 multi-source verification (NIST/US DoC) | ISO 31000:2018 §6.4.2 risk-treatment cross-corroboration (ISO) | W3C VC 2.0 §Proof multi-issuer (W3C Consortium) |
| **P5** empirical_viability_shim | NIST AI 600-1 MEASURE-2.3 empirical testing (NIST/US DoC) | OpenSSF Brittle-Tests guidance (OpenSSF/Linux Foundation) | Google SRE Book Ch.17 testing-for-reliability (Google LLC) |
| **P6** rollback_simplicity | NIST 800-53 CP-10 Recovery-and-Reconstitution (NIST/US DoC) | SLSA v1.0 Build L3 immutable provenance (slsa.dev/OpenSSF) | Anthropic CCBP plugin-uninstall + `/reload-plugins` (Anthropic PBC) |

**Org-diversity validation**: 18 distinct anchors across 6 dims; ≥3 organizationally-distinct per dim; Anthropic appears in 3/6 (R1-R5 cardinal-rule discipline is Anthropic-doc-authority — acceptable per sca-v12 §I1).

## §10. Ledger schema additions (T6 basic-memory write)

Pre-screen rows write to T6 basic-memory canonical-primary with `note_type: sca-pre-v1-verdict`:

```yaml
title: "sca-PRE-v1 W<NNN> <owner>/<repo>"
note_type: sca-pre-v1-verdict
tags: [sca-pre-v1, w326, pre-screen, <routing_verdict>]
content: |
  <sca_pre_v1_output yaml block>
  ## Rationale
  <2-3 sentence pre-route rationale>
  ## Handoff (if ESCALATE)
  - sca-v12 pre_route_tier_hint: <T0..T5>
  - mcp_families_fired: [list]
  - hard_gate_triggered: <null | P-dim>
  ## Rollback plan
  <1 sentence per P6 score>
```

**Cross-link**: pre-screen ledger rows link to sca-v12 final-verdict rows via `parent_pre_screen_uri` when escalation lands.

---

## Lineage + invariants

- **sca-PRE-v1 W326** initial publication (this artifact).
- **Decay**: composite_pre re-evaluation ×0.95 weight when sca-v12 final-verdict diverges by ≥1 tier from pre_route_tier_hint (calibration loop; if divergence-rate >20% over 4 waves → sca-PRE-v1 needs P-weight re-fit).
- **W295 I9 EXTENDED**: arch-itself (sca-PRE-v1 evaluating itself) — P1 T-skip (sca-PRE-v1 IS the CC-primitive surface authority); P4 T-skip (sca-PRE-v1 IS the cross-corroboration rubric).
- **Δ47 carry-forward**: T2-CHERRY-FRONTIER tier-promotion path remains valid post-pre-screen (sca-v12 retains frontier-retention when D33 quorum_unmet on full cascade).

## Open carry-forwards (W326 → W327)

1. **W326-A**: validate sca-PRE-v1 against W315 ledger (re-score historical T1/T2/T3/T4/T5 verdicts; check divergence rate).
2. **W326-B**: instrument `tools/sca-pre-screen.mjs` for batch-mode pre-screening of awesome-list dumps.
3. **W326-C**: codex GPT-5.5 cross-model review of THIS sca-PRE-v1 rubric (round-1 self-eval).

---

**END OF SKELETON-FILL** | `composite_denom_pre = 5.0` | `cascade_degraded = false` | `wave = W326` | `rule_version = sca-pre-v1`

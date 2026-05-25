# W326 §07 — Decision Framework: How Scoring Impacts Decisions Across 5 Levels

> Decision-cadence ladder + how each dim/score class drives outcomes at L0/L1/L2/L3/L4.
> Inputs: `sca-PRE-v1` (Fork-6, 6-dim 5-min) → `sca-v12` (current, 49+dim 60-min) → Phase-6 codex Stop-hook → post-install soak + D-REGRET → ops-rhythm dwell escalation.
> Replaces: ad-hoc per-skill invocation pattern with explicit 5-level ladder.

## §1 — L0 Quick-Screen (5-min, `sca-PRE-v1`)

**Trigger**: any new repo/MCP/skill/plugin named or surfaced via discovery cascade.

**6 dims** (per Fork-6 `05-CC-PATHWAY-SCORING-FRAMEWORK.md`):
- P1 `cc_pathway_fit` (1-5): ships-as-MCP=5 / plugin=4 / skill=3 / agent-pattern=2 / repo-clone-only=1
- P2 `install_cost_x_cardinal_compat` (0-5): cardinal-rule violation → 0 (HARD STOP); else cost-tier
- P3 `ecosystem_momentum` (1-5): 90d-commits + maintainer-velocity weighted-z-score
- P4 `cross_source_corroboration` (1-5): ≥7 families T3 floor / ≥11 families T1 floor
- P5 `empirical_viability_shim` (0-5): proxy from README + install-doc; D-EMP=0 → HARD STOP
- P6 `rollback_simplicity` (1-5): git-revert (5) → cache-delete (4) → config-edit (3) → multi-step (2) → undocumented (1)

**Routes**:

| Pre-score | Route | Action |
|---|---|---|
| ≥3.5 | ESCALATE-FULL | Proceed to L1 sca-v12 cascade |
| 2.5–3.5 | OPERATOR-DECISION | Manual review; tag for next-wave L1 |
| <2.5 | AUTO-T4-CITE-ONLY | Reference in docs; no install |
| CR violation OR D-EMP=0 | AUTO-T5-SKIP | Reject with rationale |

**ROI**: ~6.6 hr/wave saved at empirical 60% T4/T5 filter rate.

## §2 — L1 Full Verdict (60-min, sca-v12)

**Trigger**: pre-screen ≥3.5 OR operator override.

**Pipeline** (sca-v12 6-phase):
1. **Stage-0** existence-probe (≥2 family confirmations; AUTO-T5-NONEXISTENT on 2+ zero-hits)
2. **Phase-1** multi-MCP cascade (T1=11 families / T2=9 / T3=7 / T4=3); cost-cap routing; cascade_degraded flag if ≥2 fallbacks fire
3. **Phase-2** cross-source triangulation (≥3-org-distinct per any score ≥4 on D2/D5/D9; codex-mediation on disagreement≥2)
4. **Phase-3** anti-bias gate (stars-only → D12 cap 3; "trending" <30d → auto-T2; single-author-week → auto-T4)
5. **Phase-4** weighted-sum (49+ dims; D-EMP HARD GATE FIRST; EC-PROMETHEE committee-aggregation on confidence_factor<1)
6. **Phase-5** 5-gate validation (provenance / paraphrase / adversarial / contamination / replayable+≥3-org)

**Outputs**: 9-tier verdict (T0/T1/T1-PROV/T2/T2-CHERRY-FRONTIER/T2-CHERRY/T3/T4/T5) + composite install/pattern scores + audit-trail.

**Ship-gate floors** (sca-v12 §7):
| Tier | install_score | pattern_score | D-EMP | D-CCRT (D35) |
|---|---|---|---|---|
| T0 IMMEDIATE | ≥4.7 | n/a | ≥3 | ≥2 |
| T1 INSTALL | ≥4.5 | n/a | ≥2 | ≥2 |
| T1-PROV | ≥3.8 | n/a | ≥1 | ≥1 |
| T2 VENDOR-FORK | ≥3.2 | ≥4.0 | ≥1 | ≥1 |
| T2-CHERRY-FRONTIER | ≥3.0 | ≥3.8 | ≥1 | ≥1 |
| T3 PATTERN-STUDY | ≥2.5 | ≥3.5 | n/a | 0 |
| T4 CITE-ONLY | n/a | ≥3.0 | n/a | 0 |
| T5 REJECT | <2.5 | <3.0 | 0 | n/a |

## §3 — L2 Codex Cross-Model Gate (Phase-6, plugin Stop-hook)

**Trigger**: Auto-fires session-end via `openai-codex/1.0.4/hooks/hooks.json:24-37` (timeout 900s).

**Codex GPT-5.5 reviews**: verdict + evidence + scoring trace.

**Round-N flow**:
- Round-1 default (always for T1/T1-PROV/T2)
- Round-2 if Round-1 REVISE or NEEDS-REVISION (operator absorbs findings; re-dispatch)
- Round-N operator-extended

**Verdict codes**: APPROVE / REVISE / NEEDS-REVISION / BLOCK

**Position-swap MANDATORY for T1**: codex re-invoked with verdict-evidence order swapped (Zheng+ 2023 MT-Bench + JudgeLM 3-org defeat position-bias).

**G13 upgrade path (sca-v13 Δ54)**: promote Δ50 single-swap → `Layer(N)>>MaxPoolUnit` ensemble with N=3 + Borda-vote aggregation.

## §4 — L3 Post-Install Soak + Regret Eval (D-EMP + D-REGRET sca-v13)

**Trigger**: post-T1-INSTALL plumbing-into-runtime.

**Multi-wave soak ladder** (sca-v12 D-EMP):
- 0 = untested → HARD BLOCK from T1/T1-PROV/T2
- 1 = sandbox-only → SOFT WARN; T2-CHERRY ceiling
- 2 = 1-cycle uneventful → normal weighted-sum
- 3 = multi-day production → normal
- 4 = ≥4-wave soak → +0.5 D2 governance lift
- 5 = ≥8-wave soak + adversarial-survival → +1.0 D2 lift

**NEW sca-v13 Δ57 — D-REGRET dim** (closes G2):
- 0 = unknown
- 1 = post-install regression detected (revert recommended)
- 2 = stable
- 3 = positive ROI confirmed by inspect_ai EvalLog
- 4 = positive ROI + cross-wave generalization
- 5 = positive ROI + adversarial-survival + W269 telemetry uplift

**inspect_ai** (G2 resolution) provides replayable EvalLog per verdict; `model_graded_qa` with `--model-role grader=openai/gpt-5.5` folds Phase-6 codex into the eval harness directly.

## §5 — L4 Retirement Triggers (ops-rhythm escalation)

**Triggers**:
- **3-wave dwell** → owner-assignment + ETA required (no score effect)
- **5-wave dwell** → operator-decision-block; ledger surfaces `dwell_disposition_signed:` row
- **8-wave dwell** → SHIP-BLOCKER + −0.5 install_score arch-itself penalty per sca-v12 §7
- **D-REGRET ≤1** (sca-v13) → auto-revert recommendation
- **CR violation discovered post-install** → AUTO-T5-RETIRE
- **License revocation upstream** → AUTO-T5-RETIRE
- **Cascade-degraded persistence ≥3 waves** → re-cascade with G7 dependencies closed

## §6 — Integration Diagram (5-level ladder)

```
Discovery (multi-MCP cascade)
        │
        ▼
[L0 sca-PRE-v1 5-min]──────► AUTO-T4-CITE / AUTO-T5-SKIP / OPERATOR-DECISION
        │ (≥3.5 ESCALATE-FULL)
        ▼
[L1 sca-v12 60-min: Stage-0 → Phase-1..5]──────► 9-tier verdict
        │ (T1/T1-PROV/T2 require codex)
        ▼
[L2 Phase-6 Codex GPT-5.5 Stop-hook]──────► APPROVE / REVISE / BLOCK
        │ (APPROVE = ship)
        ▼
[L3 Post-install soak D-EMP + D-REGRET]──────► +0.5/+1.0 lift OR auto-revert
        │ (regret signal closes loop)
        ▼
[L4 ops-rhythm dwell escalation]──────► retain / re-eval / retire
```

## §7 — Quality-Gate Philosophy (per user mandate: NOT hard-gate)

**Stars are sub-signal of D12 ONLY** (sca-v12 I5):
- D12 caps at 3 when stars-only
- Anti-bias hard-stops: star-only T1 → auto-demote to T3; "trending" <30d → auto-T2; single-author-week → auto-T4

**Low-star + high-quality pathway** (per user request):
- T3 PATTERN-STUDY tier reserved for "low-star high-pattern-quality" candidates
- T2-CHERRY-FRONTIER (sca-v12 Δ47) retains candidates with D33 quorum_unmet BUT top-3 on any non-empty dim-subset
- Operator `+frontier` justification annotation promotes T2-CHERRY-FRONTIER → T2 with documented rationale

**Multi-dim, NOT mono-dim**: 49+ dims (sca-v12) → ranking distribution via EC-PROMETHEE (Δ49) → fragile-winner / robust-compromise classification → confidence_factor 0.7 applied to fragile.

## §8 — How Repos Impact Decisions at Different Levels

| Level | Decision class | Input signals | Output |
|---|---|---|---|
| **L0** | Worth-evaluating Y/N | 6-dim pre-screen | ESCALATE / OPERATOR / AUTO-T4 / AUTO-T5 |
| **L1** | Adoption tier | 49+ dims, multi-MCP cascade, 5-gate validation | T0-T5 verdict + scores |
| **L2** | Codex consensus | GPT-5.5 adversarial review | APPROVE / REVISE / BLOCK |
| **L3** | Soak + regret | inspect_ai EvalLog, D-EMP ladder, D-REGRET dim | +lift / auto-revert |
| **L4** | Retain / retire | Dwell-count, regret-signal, CR-status | retain / re-eval / retire |

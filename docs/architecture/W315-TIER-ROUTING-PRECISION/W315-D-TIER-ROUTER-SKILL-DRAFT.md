# W315 Stream-D — `sca-tier-router` SKILL.md paste-ready body

> Paste-ready body for `.claude/skills/sca-tier-router/SKILL.md`. Per W315 operator directive: "Decision-tree-as-skill (W312 operator-AI D-5 carry-forward): propose drop-in body for `.claude/skills/sca-tier-router/SKILL.md` that auto-fires when a candidate-card is being scored. Operator-decision queued for W316 actual creation."

**Status**: DRAFT — propose-only. **DO NOT CREATE** the file at this audit step. Operator must decide W316 whether to ship this skill or defer.

**Ship-decision controls**:
1. Whether to introduce a SECOND skill that auto-fires alongside `sota-convergence-audit` (preload-budget consideration)
2. Whether v7.1 Δ34-Δ38 refinements are absorbed into `sota-convergence-audit` SKILL.md directly (current approach), into a new `sca-tier-router` skill (decision-tree-as-skill approach), or split between the two
3. Whether to ship as `description:`-auto-fire skill (preload-cost; ~3KB per SKILL.md) or as `.claude/commands/sca-tier-router.md` slash-command (zero-preload, opt-in)

**Recommendation**: defer the new skill creation to W316. Refinements Δ34-Δ38 are valuable enough to ship as v7.1 PATCH to the existing `sota-convergence-audit` SKILL.md (paste-applied inline edits per `W315-D-V7-1-DECISION-RULES.md`). A separate `sca-tier-router` skill duplicates content and adds preload-budget cost without commensurate routing precision gain. The decision-tree codified in §6 + Δ29 + Δ34-Δ38 is sufficient for in-flow tier-routing; a separate skill is only needed if the operator wants TIER-ROUTING to fire as an auto-skill across non-SCA workflows.

---

## Paste-ready body (if operator chooses to ship at W316)

````markdown
---
name: sca-tier-router
description: Use when scoring a candidate adoption decision under sca-v7.1+ and the candidate has been scored on D1-D34 dims. Routes the candidate to one of {T1 INSTALL, T1-PROVISIONAL, T2 VENDOR-FORK, T2-CHERRY, T3 PATTERN-STUDY, T4 CITE-ONLY, T5 REJECT, BLOCK-pre-flight} via a 13-node decision tree. Auto-fires when input contains the strings "tier-route" / "tier-routing" / "verdict-routing" OR when a candidate-card with `dim_scores: {D1..D34}` is being prepared for ledger-write. Skips for adoption-decisions that already have a verdict (re-litigation uses the supersession-chain audit Δ34, not this router).
---

# sca-tier-router (v7.1) — Tier-routing skill for sca-v7.1 verdict decisions

> This skill codifies the 13-node decision tree from `sota-convergence-audit` SKILL.md §Δ29 + W315-D Δ34-Δ38 v7.1 refinements. Use it when scoring a candidate has produced `install_score`, `pattern_score`, and `dim_scores[D1..D34]` and you need to derive the final tier verdict.

## When to use

Fires when the orchestrator is preparing a ledger-write payload AND the candidate has:
- `install_score` (1.0-5.0, computed per sca-v7.1 / denom 28.7)
- `pattern_score` (1.0-5.0, computed per sca-v7.1 / denom 12.9)
- `dim_scores: {D1..D34}` (full 32+ dim sheet OR explicit `cascade_degraded: true` flag with missing-dim list)
- `kind: agent|orchestrator|skill|hook|mcp_server|pattern_only|library|standard|process` (per `live_state_probe` schema)

Does NOT fire for:
- Re-litigation of an existing ledger row (use `sota-convergence-audit` §Δ34 supersession-chain pre-flight audit instead)
- Cohort/aggregate audits with multiple candidates (use `sota-convergence-audit` §6.6 cross-candidate ranking instead)
- Non-adoption decisions (process verdicts, runtime self-audits, governance decisions)

## Inputs (expected payload shape)

```yaml
candidate: <owner>/<repo>
kind: agent|orchestrator|skill|hook|mcp_server|pattern_only|library|standard|process
install_score: <float, 1.0-5.0>
pattern_score: <float, 1.0-5.0>
dim_scores:
  D1: <int 1-5>
  D2: <int 1-5>
  # ... D3-D34
cascade_degraded: <bool>
cascade_missing_dims: ["D1", "D27", ...]  # only present if cascade_degraded: true
cardinal_rule_violations: []  # list of CR-1..CR-9 violations, empty if none
phase_5_5_gates: {gate_1: pass|fail, gate_2: ..., gate_3: ..., gate_4: ..., gate_5: ...}
phase_6_position_swap: consistent|inconsistent|advisory
adversarial_review: {security: APPROVE|REVISE|BLOCK, architect: ..., code_reviewer: ...}
license_per_component_coverage_pct: <float 0-100>  # NEW v7.1 Δ38
prior_ledger_rows: []  # for fresh audits, empty; for re-litigation, list of rows w/ candidate==self
```

## Decision tree (13 nodes)

Process queries in order. First-matching query terminates with the indicated tier.

### Q1 — Universal hardcap: D18 runtime_safety_and_privacy_risk

```
IF dim_scores.D18 < 2 → T5 REJECT
   Reason: universal-REJECT hardcap (sca-v3.1 W293)
```

### Q2 — Cardinal-rule violation

```
IF cardinal_rule_violations is non-empty → T5 REJECT
   Reason: CLAUDE.md cardinal rules R1-R5 are inviolable
```

### Q3 — Agentic-safety floor (v7 Δ17)

```
IF kind in {agent, orchestrator, mcp_server} AND dim_scores.D25 < 2 → T5 REJECT
   Reason: OWASP Top-10 Agentic Apps 2026 floor
```

### Q4 — Pure-aggregator filter

```
IF dim_scores.D5 < 2 (typed-evidence-diversity below floor) → T4 CITE-ONLY
   Reason: pure-aggregator without novel primitive, fails install + fork
```

### Q5 — Supersession-chain pre-flight (v7.1 Δ34)

```
IF prior_ledger_rows is non-empty AND cited_authority_row != latest(prior_ledger_rows) → BLOCK pre-flight
   Reason: re-litigation must cite chronologically-latest superseder
```

### Q6 — Cascade-completion gate (v7.1 Δ35)

```
IF cascade_degraded == true AND install_score >= 3.8 AND any cascade_missing_dim has W_install >= 0.5 → T1-PROVISIONAL
   Issue cascade_completion_required[] payload; final verdict blocked until re-cascade pass (24h SLA)
```

### Q7 — Pattern-extractable but not deployable

```
IF dim_scores.D13 >= 3 AND install_score < 3.0 → T3 PATTERN-STUDY
   Reason: pattern extractable, fork-deployment infeasible
```

### Q8 — D33 quorum (advisory; record but do not auto-demote per v7 W313-AI-7)

```
IF dim_scores.D33 < 2 → record `quorum_unmet: true` in payload; continue (do not auto-demote at v7.1)
```

### Q9 — Cohort-saturation soft-cap (v7.1 Δ37)

```
IF dim_scores.D34 >= 4 AND dim_scores.D13 < 4 → cap at T4 CITE-ONLY
   Reason: saturated-cohort without novel pattern extracts no marginal value
```

### Q10 — Install-only hard-caps (composite)

```
IF any of:
  dim_scores.D1 < 3 (license)
  dim_scores.D14 < 3 (reversible-pilotability)
  dim_scores.D17 < 2 (robustness)
  dim_scores.D19 < 2 (code-review rigor)
  dim_scores.D16 < 2 (bus-factor)
  dim_scores.D24 < 2 (MCP-attack-surface)
  → DEMOTE to T2 + Δ2 re_enable_phase5_gate=true
```

### Q11 — T1 INSTALL gate with T2-CHERRY check (v7.1 Δ36 + Δ38)

```
IF install_score >= 4.0 AND A1 axis >= 4 AND A4 axis >= 4 AND A2/A3/A5/A6 axes >= 3:
   IF license_per_component_coverage_pct < 100 AND dim_scores.D1 == 4 (per-component partial-coverage):
     → T2-CHERRY (with cherrypicked_components[] enumeration)
   ELSE:
     → T1 INSTALL (Δ2 flag check; rollback plan written)
```

### Q12 — T2 VENDOR-FORK with cherry-pick option (Δ36)

```
IF (A1 OR A4) >= 4 AND no axis < 2:
   IF cherrypicked_components mode preferred (operator-discretion):
     → T2-CHERRY
   ELSE:
     → T2 VENDOR-FORK
```

### Q13 — T3 vs T4 fallthrough

```
IF dim_scores.D13 >= 3 → T3 PATTERN-STUDY
ELSE → T4 CITE-ONLY
```

## Output (verdict payload addition)

```yaml
sca_tier_router_v7_1_output:
  tree_node_terminated: Q<N>
  routing_rationale: "<one-line summary of which dim/cap fired>"
  intermediate_states_emitted: []  # e.g. ["T1-PROVISIONAL", "BLOCK-pre-flight"]
  final_tier: T1|T1-PROVISIONAL|T2|T2-CHERRY|T3|T4|T5|BLOCK-pre-flight
  follow_up_required:
    - cascade_completion if T1-PROVISIONAL (24h SLA)
    - operator_re_cite if BLOCK-pre-flight (Δ34)
    - cherrypicked_components[] enumeration if T2-CHERRY
  next_step:
    - if T1 → run §5 adversarial review + §5.5 Phase-5 + §5.6 Phase-6
    - if T1-PROVISIONAL → trigger cascade-completion gate; re-run router on completion
    - if T2/T2-CHERRY → run §5 adversarial review; for T2-CHERRY also enumerate component-level eligibility
    - if T3 → emit pattern_doc_path artifact
    - if T4 → emit cite_location
    - if T5 → emit affirmative_evidence_of_unfitness
    - if BLOCK-pre-flight → operator must re-cite supersession-chain
```

## Cross-references

- `sota-convergence-audit` SKILL.md §6 (5-tier ladder), §6.6 (cross-candidate ranking), §Δ29 (10-node v7 tree), §Δ34-Δ38 (v7.1 refinements)
- `W315-D-V7-1-DECISION-RULES.md` (v7.1 spec)
- `W315-D-VERDICT-AUDIT-30-ROWS.md` (35-row audit producing the refinement requirements)
- `VERDICT-LEDGER.md` schema (target write contract)

## Anti-patterns

- Do NOT use this router for cohort audits (>1 candidate). Use `sota-convergence-audit` §6.6 cross-candidate ranking matrix instead.
- Do NOT use this router to override the §6 5-tier ladder. The router is a CODIFICATION of the ladder, not an alternative.
- Do NOT use this router when `live_state_probe.kind` is uncertain. Resolve kind first via `sota-convergence-audit` §1.5 live-state-probe.
- Do NOT silently downgrade T1-PROVISIONAL to T2 without re-cascading the missing dims. The 24h cascade-completion gate is mandatory under Δ35.
````

---

## Notes on deployment

**If operator ships this skill at W316**:
- Place at `.claude/skills/sca-tier-router/SKILL.md`
- Preload-budget cost: ~3-4KB per session (description-auto-fire match)
- Companion file: NONE — this skill embeds the full decision tree
- Disabled-by-default: NO — auto-fires on tier-routing language match

**If operator defers and absorbs Δ34-Δ38 into `sota-convergence-audit` SKILL.md directly**:
- Apply paste-edits from `W315-D-V7-1-DECISION-RULES.md` §1-§5
- SKILL.md grows from 1245L to ~1280L (~280 bytes preload addition; well within budget)
- No new skill auto-fire surface created
- Operator preserves existing single-skill audit flow

**Recommendation**: **DEFER the new skill creation to W316**. Apply v7.1 refinements as paste-edits to `sota-convergence-audit` SKILL.md per `W315-D-V7-1-DECISION-RULES.md` instead. Re-evaluate at W317 if operator needs tier-routing to auto-fire across non-SCA workflows.

The DRAFT body in this file is preserved as a contingency option if the operator chooses to ship the new skill at W316.

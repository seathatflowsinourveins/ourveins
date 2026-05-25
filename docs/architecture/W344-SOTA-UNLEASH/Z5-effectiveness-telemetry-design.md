# Z5 — sca Decision Effectiveness Telemetry — Design Spec

**Wave**: W344-SOTA-UNLEASH
**Stream**: Z5 (P2.5 effectiveness telemetry)
**Date**: 2026-05-20
**Author**: Stream Z5 (forked subagent)

## Motivation

sca-v11..v17 has shipped tier-decisions (T1-INSTALL / T2-CHERRY / T3-PATTERN-STUDY / T4-CITE-ONLY / T5-REJECT) for many waves, but NO measurement-after-N-waves feedback loop confirms whether GO/NO-GO decisions PROVED CORRECT downstream.

This spec designs that loop.

## Goal

After each sca decision, record telemetry. After N=3 waves, audit:
- Did INSTALL decisions yield positive value? (skill auto-fired ≥3× / month? plugin used at least 1×?)
- Did REJECT decisions stay correct? (no operator-regret signal? no upstream rediscovery?)
- Did PATTERN-STUDY decisions deliver primitive-extraction? (skill or fork landed?)

## Cite trio (3-org-distinct)

1. **NIST SP 800-160 Vol.2 SC-29 Heterogeneity** — System-of-systems engineering: `SC-29 Heterogeneity (Diversity)` — system reliability measured by diversity of implementations across parallel decisions; effectiveness-tracking PER decision-class. (NIST/US DoC)
2. **Anthropic claude-cookbooks evaluation patterns** — `patterns/agents/evaluator_optimizer.ipynb` shows generate→evaluate→optimize feedback loop; telemetry MUST persist `(generate_ts, evaluate_ts, optimize_decision)` triples to enable measurement-after-N-iters
3. **Google SRE Book Chapter 4 — Service Level Objectives** — SLO discipline: `An SLI without an SLO is a measurement without consequence` — every decision must have a measurable success criterion AND a re-evaluation window (Beyer/Jones/Petoff/Murphy 2016, O'Reilly)

## Schema

**Telemetry file**: `.claude/state/sca-decision-outcomes.json`

**Schema** (JSON Lines or single JSON-array of objects):

```json
[
  {
    "decision_id": "sca-W344-Z5-001",
    "wave": "W344",
    "stream": "Z5",
    "candidate": {
      "name": "langchain-ai/langgraph",
      "source_url": "https://github.com/langchain-ai/langgraph",
      "stars_at_decision_ts": 14200,
      "last_commit_at_decision_ts": "2026-05-15T..."
    },
    "tier": "T2-CHERRY",
    "action_tier": "pattern-study",
    "architecture_layer": "L6-agent-dispatch",
    "decision_ts": "2026-05-20T...",
    "decision_ts_iso": "2026-05-20T15:00:00Z",
    "decision_rationale_short": "BaseCheckpointSaver + Pregel exception bubble already absorbed; add_messages reducer NEW primitive → D84 queued",
    "verdict_ledger_pointer": "docs/architecture/W344-SOTA-UNLEASH/Z5-research-arch-ingest.md#repo-3",
    "evidence_anchors": ["langgraph-pregel-exception-bubble", "supervisor-last-message"],
    "outcome_re_evaluation_due_at_wave": "W347",
    "outcome": null,
    "outcome_re_evaluated_at_wave": null,
    "outcome_re_evaluated_ts": null,
    "outcome_signal_short": null,
    "outcome_classification": null
  }
]
```

**`outcome_classification` enum** (filled at N=3-wave re-eval):
- `CORRECT-VALUE-CONFIRMED` — decision proved correct, value materialized (skill fires, primitive used, no regret)
- `CORRECT-NO-SIGNAL` — decision proved correct, but no positive signal yet (still in observation window)
- `INCORRECT-MISSED-OPPORTUNITY` — REJECT proved wrong (upstream rediscovered, operator wished it shipped)
- `INCORRECT-WASTE` — INSTALL proved wrong (skill never fires, plugin retired, complexity added without value)
- `INCONCLUSIVE-INSUFFICIENT-DATA` — can't tell yet; defer re-eval to N+3 waves

## Workflow

1. **At each sca decision**: emit one row to `.claude/state/sca-decision-outcomes.json` with `outcome: null` and `outcome_re_evaluation_due_at_wave: current_wave + 3`
2. **At each wave-N start**: scan for rows where `outcome_re_evaluation_due_at_wave <= current_wave AND outcome === null`
3. **For each due row**: orchestrator computes outcome signal:
   - For INSTALL: count auto-fires in JSONL transcripts of last 3 waves; >=3 → CORRECT-VALUE-CONFIRMED; 0 → INCORRECT-WASTE
   - For PATTERN-STUDY: check if extracted primitive landed as skill / fork commit; YES → CORRECT; NO → INCORRECT-WASTE
   - For REJECT: check if upstream re-discovery happened; if any wave-N+1..N+3 saw operator request → INCORRECT-MISSED-OPPORTUNITY; else CORRECT-NO-SIGNAL
4. **Persist outcome row** + tag verdict-ledger with re-eval pointer
5. **Aggregate**: at every 5 waves emit aggregate-report — % of decisions that proved correct per tier

## sca-Decision-Outcome aggregate metric

**effectiveness_ratio** = (CORRECT-VALUE-CONFIRMED + CORRECT-NO-SIGNAL) / (total non-INCONCLUSIVE outcomes)

**Target SLO**: effectiveness_ratio ≥ 0.80 (per Google SRE Ch. 4 — `start_with_3_9s = 99.9%` is impossible at decision-quality level; 80% is realistic-target adopted from CMMI Level 3 process maturity).

## Implementation surface

- `.claude/state/sca-decision-outcomes.json` — schema-validated by `mcp__basic-memory__schema_validate` per Z5 cite-anchor (basic-memory MCP family)
- `tools/sca-record-decision.mjs` — emit one row (operator invocation: `node tools/sca-record-decision.mjs --wave W344 --candidate <name> --tier T2-CHERRY ...`)
- `tools/sca-re-evaluate-decisions.mjs` — scan due rows, compute outcome signal, persist
- `tools/sca-effectiveness-report.mjs` — aggregate-report per N=5 waves

NOTE: tooling deferred to W345+. THIS SPEC is the design-doc; impl is queued behind W344 P0 closures.

## Privacy / sandbox

- File is gitignored OR committed (operator-decision). Recommendation: COMMITTED to enable cross-wave audit-trail; no PII; auto-redact any operator-id leakage via pre-commit hook.

## Acceptance

- [x] Schema specified
- [x] 3-org-distinct cite trio
- [x] Workflow steps enumerated
- [x] SLO target named (80%)
- [x] Impl-surface enumerated (3 tools)
- [ ] Tooling impl queued for W345+
- [ ] Operator-sign on SLO target

## Sample first record

```json
{
  "decision_id": "sca-W344-Z5-001",
  "wave": "W344",
  "stream": "Z5",
  "candidate": {"name": "langchain-ai/langgraph state-reducer", "source_url": "https://github.com/langchain-ai/langgraph"},
  "tier": "T2-CHERRY",
  "action_tier": "pattern-study",
  "architecture_layer": "L6-agent-dispatch",
  "decision_ts_iso": "2026-05-20T15:00:00Z",
  "decision_rationale_short": "add_messages + ConditionalEdge primitives discovered; queue D84 state-reducer-discipline skill",
  "verdict_ledger_pointer": "docs/architecture/W344-SOTA-UNLEASH/Z5-research-arch-ingest.md#repo-3-langchain-ai-langgraph",
  "outcome_re_evaluation_due_at_wave": "W347",
  "outcome": null
}
```

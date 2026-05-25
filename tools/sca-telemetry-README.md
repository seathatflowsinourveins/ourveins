# sca-v17 §4 Decision-Impact Telemetry Suite

W347 P0(a) ship — SHIPS the W344 Z5 effectiveness-telemetry-design.md spec (impl was unshipped per E §4 audit).

## 3-tool surface

| Tool | Purpose | Exit |
|---|---|---|
| `tools/sca-record-decision.mjs` | Append new install/pattern-study decision to state file | 0 ok / 2 validation-fail |
| `tools/sca-re-evaluate-decisions.mjs` | Re-score prior decisions vs current sca-v17 rubric; surface drift | 0 (non-fatal) |
| `tools/sca-effectiveness-report.mjs` | Emit effectiveness metrics + Wilson CI vs 80% SLO | 0 |

All tools ≤2 KB each (CR-2 SPIRIT). Core logic in `tools/lib/sca-telemetry-core.mjs` (lib, not hook body — CR-2 exempt).

## State schema

- **File**: `.claude/state/sca-decision-outcomes.json`
- **Shape**: `Decision[]` per sca-v17 §10 ledger schema (subset enforced; full schema preserved).
- **Required fields**: `slug, wave, verdict, install_score, pattern_score, rule_version, mcp_family_attribution, date`.
- **Optional outcome field**: `outcome_tracked: 'effective'|'regret'|'neutral'|null` populated after N=3 waves.
- **Subsumes** the unshipped W287 P2.iii `author-prior-registry.json` — author-prior data can live as a sibling field in each Decision row (`author_prior_priorbeta: {...}`).
- **Anti-regression** (W295 codex-r13): NO secret-class data — slug+tier+date+scores only.

## Integration points

1. **sca-convergence-audit skill** (`.claude/skills/sota-convergence-audit/SKILL.md` §10) — after each T1/T1-PROV/T2 verdict is written to T6 basic-memory, ALSO invoke `sca-record-decision.mjs` to populate telemetry.
2. **Wave-close discipline** (CLAUDE.md §Status) — at wave-N close, run `sca-re-evaluate-decisions.mjs --markdown` to surface drift; run `sca-effectiveness-report.mjs --current-wave=W<N>` for SLO check.
3. **Codex GPT-5.5 gate** (§10 round-1) — codex review consumes effectiveness report as additional context for cross-model consensus.

## Smoke tests

```bash
# 1. record
echo '{"slug":"foo/bar","wave":"W347","verdict":"T1","install_score":4.3,"pattern_score":3.8,"rule_version":"sca-v17","mcp_family_attribution":["github","deepwiki"],"date":"2026-05-20"}' | node tools/sca-record-decision.mjs
# 2. re-eval
node tools/sca-re-evaluate-decisions.mjs --markdown
# 3. effectiveness
node tools/sca-effectiveness-report.mjs --current-wave=W350
```

## Anchors

- 80% SLO target: Google SRE Ch.4 + Anthropic claude-cookbooks evaluator-optimizer (`patterns/agents/orchestrator_workers.ipynb`).
- Wilson 1927 small-n binomial CI: NIST/SEMATECH e-Handbook §1.3.5.2.
- N=3-waves outcome-tracking: W344 Z5 design rationale.

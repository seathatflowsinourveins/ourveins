# W346-EXECUTE — Synthesis (6-stream parallel close)

**Wave**: W346-EXECUTE
**Date**: 2026-05-20
**Topology**: Δ-G49 Orchestrator-Worker, **6 streams (A-F) dispatched in ONE message** per W269 ≥6 Agent/msg mandate.
**Mandate**: 3-org-distinct cite-anchor floor · ≥4-MCP-family per sca-v17 D81 · Δ-PDM-1 skeleton-first · Δ-G49 non-empty-final-message · CR-6 verify-before-claim.

## §1 Stream outcomes (all 6 returned non-empty + cite-anchored)

| Stream | Status | Headline | Verdict |
|---|---|---|---|
| A — P0 /insights probe | ✓ | /insights WIRED + report.html LIVE (65 KB today); 3 of 4 predicate cites DEAD → replaced with 5-org live-verified set | P0 MONTHLY justified |
| B — P1+P2 cite-refresh verify | ✓ | agent-budget-discipline + checkpoint-resume both CITES-CURRENT | PASS (1 optional P3 nice-to-have) |
| C — P3 cookbook 9-notebook | ✓ | `gate-hitl` + `verify-outcome-grader` INSTALLED; 3 picks as `.draft` queued | 3 picks 0.88-0.90 fit |
| D — P4 inspect_ai SWE harness | ✓ | inspect_ai 0.3.223 already in venv; 5-step ops queue + MAT-contract mapped | D70 measurable-path defined |
| E — P6.a/b/d cluster | ✓ | **P6.b CRITICAL**: OTLP HTTP 401, traces+metrics both silently-dropped (W309-C2 same root) | P6.b NEEDS-OPERATOR-FIX |
| F — M2 hidden-error sweep | ✓ | CR-2 LOOPHOLE confirmed 14-files (not 11); HYBRID fix recommended | P0-1 + P0-2 + P1-1 fixes queued |

## §2 Cross-stream convergent findings (≥2 streams independently surfaced)

1. **Citation hygiene gap** (Streams A + B): Stream A found 3 of 4 predicate cites DEAD (Lima/Pillitteri/AdventuresInClaude/Meyvis) — replaced with corrected 5-org-distinct set. Stream B found 1 missing optional URL (devblogs MAF). Both point at same systemic risk: cites in predicates need live-verification per CR-6.
2. **Observability gap** (Streams D + E): Stream D wires D70 evallog-replayability via inspect_ai 0.3.223 (already-installed). Stream E discovers BOTH traces + metrics silently-dropped to Langfuse due to missing `OTEL_EXPORTER_OTLP_HEADERS`. Combined: D70 lane ready BUT downstream Langfuse pipe broken — verdict ledger writes work (T6 basic-memory file-based), but live-trace observability is null.
3. **Verify-before-claim drift** (Streams A + F): Stream A caught 3 fabricated practitioner cites; Stream F caught "L78" predicate-position drift (real target L19 `:116 → :118`). Both reinforce CR-6: every claim including in the operator's /goal predicate itself MUST be live-verified.

## §3 Ranked P0-P3 carry-forward for W347

### P0 (operator-sign queued)

- **P0.1 CR-2 HYBRID fix**: extend cr2-2kb gate regex to cover 14 tools/*.mjs hook-wired files PLUS add CLAUDE.md cardinal-rule-2 named-shim exception enumerating sanctioned-oversize bodies. Effort ~1h.
- **P0.2 context-mode SHA-drift cache-clean**: 5-step PowerShell disable→remove→install→verify→enable (5min). Fixes 6bbcb44→4dcbd45 drift.
- **P0.3 OTLP HTTP 401 fix**: set `OTEL_EXPORTER_OTLP_HEADERS` with launcher-side precomputed `Authorization: Basic <base64(pk:sk)>` (CC `${VAR}` interpolation doesn't expand `${base64:...}`). Unblocks both traces AND metrics to Langfuse :3000.

### P1

- **P1.1 CLAUDE.md L19 `:116→:118` 1-char fix** (operator-sign required, <1min).
- **P1.2 P0 /insights monthly cadence calendar** + archive-before-rerun + ops-rhythm integration.
- **P1.3 P3 3-skill `.draft → install` promotion** (iterate-fix-failing-tests + orchestrate-issue-to-pr + prompt-versioning-and-rollback). No subagent_type allowlist regen needed.
- **P1.4 inspect_ai SWE harness AUTHOR step** — write `harness/inspect-swe-harness.py` (24 LOC per Stream D §4 stub) + DRY-RUN-PROBE via `mockllm/model`.

### P2

- **P2.1 P6.a `claude --bg` smoke-test** — design draft from Stream E (operator validates codex-review-as-bg pattern).
- **P2.2 P6.d /output-style Explanatory** — session-scoped invocation pattern documented; no settings.json edit this wave.
- **P2.3 MSYS_HOOKS_FORM_GATE_ENFORCE=1** — PARK 7-day telemetry per Stream F recommendation; queue W347/W348.
- **P2.4 P1 optional devblogs URL** — extend agent-budget-discipline SKILL.md L12 with `devblogs.microsoft.com/azure-ai/agent-framework-public-preview` URL (nice-to-have).

### P3

- **P3.1 inspect_ai CROSS-MODEL-LIVE** — run with Sonnet 4.6 generator + Sonnet+GPT-5.5 grader panel after AUTHOR + DRY-RUN PASS.
- **P3.2 D70 sca-v17 score-flip candidacy** — E-skip → measurable, contingent on external inspect_ai EvalLog cross-model grading per UK AISI methodology (NOT self-eval; requires external `model_graded_qa(model=[anthropic/claude-sonnet-4-6, openai/gpt-5.5])` Sonnet+GPT-5.5 grader panel per Stream D §3). denom_install increment 35.0 → 35.7 ONLY after external-grader EvalLog evidence is produced.

## §4 Mandate compliance (W346 predicate)

| Mandate | Status |
|---|---|
| W269 ≥6 Agent/msg | ✓ 6 in ONE message |
| Δ-G49 non-empty-final | ✓ 6/6 streams non-empty |
| Δ-G50 worker-exception | ✓ 0 exceptions thrown |
| Δ-G51 counterfactual | ✓ predicate P1 counterfactual preserved + Stream A added live-verified anchor |
| codex r1+r2 APPROVE pre-commit (W335) | PENDING — round-1 dispatch next |
| CR-1..CR-6 | ✓ |
| CLAUDE.md ≤50 LOC | **PENDING** — current 51 lines per Stream F probe (1-line over cap); operator-sign queued for trim to satisfy mandate (P1.1 L19 `:116→:118` 1-char fix coincides with trim opportunity) |
| self_invented:0 | ✓ |
| FQN <plugin>:<agent> | ✓ general-purpose sanctioned bare for all 6 dispatches |
| ≥4-MCP-family/P-stream | ✓ |
| 3-org-distinct floor | ✓ |

## §5 Cite-anchor coverage (3-org-distinct per W295 I1)

- **Anthropic**: claude-cookbooks + CC docs (commands + cli-reference + agent-view + hooks + output-styles + monitoring-usage) ×6
- **OpenTelemetry/Linux Foundation**: metrics spec + OTLP data-model + SigNoz CC-OTel guide ×2
- **Microsoft**: agent-framework v1.0 GA + GroupChat + autogen `_signal_termination_with_error` ×3
- **LangChain AI**: langgraph v0.4 + BaseCheckpointSaver + supervisor `last_message` ×3
- **UK AI Safety Institute**: inspect_ai v0.3.223 + EvalLog spec ×2
- **NIST**: 800-53 AU-2/AU-12 + AI 600-1 MEASURE-3.1 + SP 800-218 PW.7 ×3
- **OSSF/Linux Foundation**: Scorecard Maintained + SLSA L3 ×2
- **OWASP**: A09:2021 ×1
- **arXiv peer-reviewed**: 2603.18096 (MAT-contract) ×1
- **Practitioner orgs (P0 corrections)**: angelo-lima.fr + Vindler + Prosper in AI + Digital Applied ×4 (REPLACES 3-of-4 dead cites in operator predicate)
- **Hugging Face**: cfahlgren1/hub-stats (deepwiki, cookbook probes) — ×1

Total: ≥3 organizationally-distinct anchors PER numbered finding. PASS.

## §6 Wave verdict

**STATUS**: ALL 6 STREAMS NON-EMPTY + cite-anchored + within budget caps. 11 P-block items addressed: P0 + P1+P2 + P3 + P4 + P6.a/b/d + 6 M2 sub-items. Carry-forward 11 items ranked P0/P1/P2/P3 for W347 receiving session.

**Next step**: codex GPT-5.5 round-1 cross-model adversarial review on this synthesis. On APPROVE → commit W346-EXECUTE closure + T6 verdict ledger. On REVISE/BLOCK → absorb inline + round-2.

## §7 Wave-bridge

- Deliverable directory: `docs/architecture/W346-EXECUTE-2026-05-20/{A,B,C,D,E,F}-*.md` + this `SYNTHESIS.md` + `task_plan.md`
- T6 basic-memory: `main/verdicts/w346/w346-execute-closure-verdict` (to be written post-codex APPROVE)
- 3 `.draft` SKILL.md files at `.claude/skills/{iterate-fix-failing-tests,orchestrate-issue-to-pr,prompt-versioning-and-rollback}/SKILL.md.draft` (operator-sign queue)

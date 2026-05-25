ARTIFACT-INLINE: wave110-agentD-arch-v2-summary-2026-05-09

# Wave110 Arch V2 Summary

Source note: the requested background output file
`tmp/claude/Z--claude-sota-installed/c2c40b29-787f-44cb-8e94-42bb62199e60/tasks/a3c48b6aed8ece998.output`
was present but zero bytes. This summary is derived from the likely completed artifact:
`tmp/wave110-agentC-arch-opt-research-v2-2026-05-09.md`.

## Repos / Tools Evaluated

1. `langchain-ai/langgraph`
   - Verdict: D1 NEW-USE-CASE / ADOPT-NOW candidate.
   - Purpose: durable DAG/state-machine orchestration for long-running research workflows.
   - Recommended scope: use for workflows that need persisted node state, resumability, branch outcomes, unresolved objections, and auditable decision paths.

2. `openai/openai-agents-python`
   - Verdict: D3 AUGMENTATION / ADOPT-NOW for structured reviewer coordination.
   - Purpose: formalized multi-agent roles, handoffs, and tool boundaries.
   - Recommended scope: blind A/B team-of-rivals review where independent pro/adversarial reviewers score the same evidence packet.

3. `confident-ai/deepeval`
   - Verdict: D1 NEW-USE-CASE / ADOPT-NOW candidate.
   - Purpose: executable assertion layer for research claims and adoption verdicts.
   - Recommended scope: pre-final gates checking evidence freshness, primary-source availability, classification correctness, integration specificity, and risk disclosure.

4. `openai/evals`
   - Verdict: D1 NEW-USE-CASE / STUDY-PILOT.
   - Purpose: repeatable capability measurement when recommendations depend on model behavior, prompt reliability, or comparative agent performance.
   - Recommended scope: evaluate whether candidate-review agents improve recall, precision, and rejection of weak SOTA claims. Do not use as a general dependency scanner.

5. Arize Phoenix MCP
   - Verdict: D1 NEW-USE-CASE / STUDY-PILOT to ADOPT where trace emission already exists.
   - Purpose: trace-query surface for wire-surface-close validation.
   - Recommended scope: verify actual tool/hook/span behavior, failures, latency, and missing instrumentation before marking integrations operationally closed.

6. GitHub Releases/Stargazers APIs, arXiv API, HN Algolia, Reddit search/API, package-manager metadata, plugin registry metadata
   - Verdict: ADOPT-NOW as architecture mechanisms; no mandatory new install.
   - Purpose: temporal freshness, external recency corroboration, and marketplace/package drift detection.

## Arch V2 Design Recommendations

1. Add a Temporal Freshness Sentinel.
   - Poll releases, tags, commits, stargazer velocity, contributor activity, issue response freshness, and release cadence.
   - Force every candidate verdict to include temporal deltas, not only static popularity.

2. Add Source Freshness Cohort C10.
   - Build recency-weighted evidence cohorts from primary docs/repos, release notes, arXiv when relevant, HN/Algolia, Reddit, and issue/PR activity.
   - Use independent recent corroboration to reduce stale-source risk.

3. Add Executable SOTA-Claim Audit.
   - Use `deepeval` assertions before final synthesis.
   - Gate D1/D3 recommendations on evidence freshness, traceability, uniqueness, integration specificity, and disclosed constraints.

4. Add Blind A/B Team-of-Rivals Review.
   - Use `openai-agents` to separate pro-adoption and adversarial reviewer roles.
   - Require synthesis to resolve disagreements against explicit evidence and local convergence rules.

5. Add Durable Research DAG.
   - Use `langgraph` for multi-session research paths: seed question, discovery, freshness poll, source cohort, gap table, rival review, claim audit, final artifact.
   - Persist timestamps, node inputs/outputs, unresolved objections, and convergence state.

6. Add Trace-Backed Wire-Surface Close.
   - Use Phoenix MCP where traces exist.
   - Attach trace-query summaries proving candidate tools were actually exercised and instrumentation covers expected surfaces.

7. Add Marketplace Freshness Reconciler.
   - Compare local plugin manifests, marketplace metadata, package-manager latest versions, upstream release metadata, and recommended commands.
   - Flag stale commands, renamed/removed packages, version drift, and local/upstream mismatch.

## Verdicts

ADOPT-NOW:
- `langgraph` for durable, auditable research DAGs when workflows are long-running or resumable.
- `deepeval` for executable SOTA/adoption claim gates.
- `openai-agents` for structured team-of-rivals review as an augmentation layer.
- Temporal freshness polling via GitHub APIs.
- Marketplace/package/plugin drift reconciliation.
- Source Freshness Cohort C10 as a research protocol upgrade.

STUDY-PILOT:
- `openai/evals` for measuring reviewer-agent and model-behavior improvements before broad adoption.
- Phoenix MCP where Phoenix service plus reliable trace emission already exist; otherwise instrumentation is a prerequisite.

Do not adopt blindly:
- Do not let `langgraph` replace simple one-shot scripts where persistent graph state adds overhead.
- Do not treat `openai-agents` as governance; local convergence rules still own policy.
- Do not reduce architecture judgment to a single eval score.
- Do not claim wire-surface closure without traces or equivalent telemetry evidence.

## Gaps / Blockers

1. Static-popularity bias remains the top gap.
   - Star count can select mature but slowing repos while missing fast-moving SOTA projects.

2. Stale-source risk is not closed by local clones.
   - A repo at local HEAD does not capture recent external ecosystem movement, practitioner reports, or issue/release dynamics.

3. Prose-only adoption verdicts are too weak.
   - D1/D3 classifications need executable assertions before final synthesis.

4. Multi-agent review can be shallow unless adversarial and evidence-bounded.
   - Parallel agreement is not enough; blind challenge and explicit disagreement resolution are required.

5. Research state is too file-oriented.
   - Current artifacts persist outputs but not always branch state, unresolved objections, node decisions, or provenance across sessions.

6. Wire-surface claims need telemetry proof.
   - Phoenix MCP is blocked by the need for a running Phoenix service and consistent trace emission.

7. Marketplace/plugin/package drift is a separate risk.
   - Local plugin metadata, upstream package versions, and recommended install commands can diverge independently.

## Actionable Next Steps

1. Implement Temporal Freshness Sentinel first because it directly closes the highest-risk static-popularity bias.
2. Add `deepeval` gates before increasing candidate volume, so the pipeline scales stronger claims rather than more weak conclusions.
3. Pilot `langgraph` on one research workflow that needs resumability and branch-state persistence.
4. Formalize team-of-rivals review with `openai-agents` after evidence packets are standardized.
5. Introduce Phoenix MCP only after trace emission is reliable enough for absence/presence queries to mean something.
6. Add a scheduled marketplace freshness reconciler before issuing future install recommendations.

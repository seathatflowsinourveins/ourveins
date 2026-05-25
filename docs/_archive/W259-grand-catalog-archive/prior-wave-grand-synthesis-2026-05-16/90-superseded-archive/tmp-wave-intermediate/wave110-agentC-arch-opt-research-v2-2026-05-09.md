---
title: "Wave110 AgentC Architecture Optimization Research V2"
status: "complete"
date: "2026-05-09"
agent: "wave110-agentC"
---

# Wave110 AgentC Architecture Optimization Research V2

## Scope

This artifact reconstructs the completed codex-rescue BRIDGE-MODE research output for `wave110-agentC`. It focuses on architectural gaps in the current research and install-candidate selection pipeline, with emphasis on closing stale-source risk, static-popularity bias, and unverifiable SOTA adoption claims.

## Cite Anchors

- langgraph: `Z:/repos/deps/langchain-ai/langgraph @ HEAD`
- deepeval: `https://docs.confident-ai.com/docs/getting-started`
- phoenix: `https://docs.arize.com/phoenix`
- openai-agents: `Z:/repos/deps/openai/openai-agents-python @ HEAD`
- research-protocol: `Z:/claude-sota/.claude/rules/research-protocol.md`
- convergence-gate: `Z:/claude-sota/.claude/rules/convergence-gate.md`
- synthesis-layer-verify: `Z:/claude-sota/.claude/rules/synthesis-layer-verify.md`

## Executive Finding

The dominant architectural gap is not a lack of candidate discovery. The system already has several discovery and synthesis surfaces. The real gap is that install recommendations can still over-trust static GitHub popularity signals, especially stars, without enough temporal velocity, source freshness, adversarial review, or executable claim-audit gates.

The V2 architecture should add temporal freshness polling, multi-source recency cohorts, executable LLM-eval assertions, team-of-rivals review, durable DAG execution, trace-backed wire-surface validation, and marketplace drift reconciliation.

## Gap Table

| Axis | Current State | Gap Verdict | Evidence / Risk | V2 Closure |
|---|---|---:|---|---|
| 1. Temporal repository signal | GitHub repository metadata is considered, but static popularity dominates. | Real gap | Star count alone can select mature but slowing projects while missing fast-rising SOTA repos. | Temporal Freshness Sentinel polls releases and stargazer velocity. |
| 2. Source freshness breadth | Research uses established source anchors and local repos. | Real gap | Static docs and cloned repos do not capture recent arXiv, HN, Reddit, or ecosystem shifts. | Source Freshness Cohort C10 adds recency-weighted external signals. |
| 3. Executable claim audit | Adoption verdicts are reasoned but not consistently executable. | Real gap | A written D1/D3 verdict can pass without automated assertions over evidence quality. | deepeval gate asserts traceable evidence, freshness, and convergence criteria. |
| 4. Multi-agent adversarial review | Some synthesis exists, but review can be single-threaded. | Real gap | A single analyst can normalize weak assumptions or miss contrary evidence. | Blind A/B Team-of-Rivals review challenges candidates independently. |
| 5. Durable research state | Research artifacts are persisted, but process state is file-oriented. | Real gap | Multi-session research can lose branch state, unresolved objections, or candidate provenance. | langgraph durable DAG persists node state and decisions across turns. |
| 6. Wire-surface telemetry close | Wire-surface closure is a known discipline. | Partly closed | Hooks and traces exist, but research recommendations need direct query-backed closure. | Phoenix MCP exposes trace-query checks for telemetry-backed validation. |
| 7. Marketplace/plugin drift | Plugin and install metadata exists in scattered surfaces. | Real gap | Installed versions, marketplace metadata, and upstream latest can diverge silently. | Marketplace Freshness Reconciler detects version and command drift. |
| 8. Synthesis/convergence governance | Research protocol, convergence gate, and synthesis verification rules exist. | Already closed, needs enforcement | The rules are present, but candidate research must explicitly map mechanisms to them. | Convergence Map binds every mechanism to a TIER-1 SOTA pattern and cite anchor. |

## Top-5 Install Candidates

### 1. `langchain-ai/langgraph`

- Install command: `pip install -U langgraph`
- Cite anchor: `Z:/repos/deps/langchain-ai/langgraph @ HEAD`
- Classification: D1 NEW-USE-CASE
- Primary use case: Durable DAG execution with state persistence across turns.
- Convergence verdict: Adopt as the durable orchestration substrate for long-running research workflows where node state, branch outcomes, and unresolved objections must survive session boundaries.
- Integration point: Mechanism 5, Durable Research DAG. Wrap research as explicit nodes: discover, freshness poll, source cohort, candidate score, adversarial review, executable audit, final synthesis.
- Risk / constraint: Keep it scoped to research orchestration first. Do not replace existing lightweight one-shot scripts where persistent graph state adds overhead without operational value.

### 2. `openai/openai-agents-python`

- Install command: `pip install openai-agents`
- Cite anchor: `Z:/repos/deps/openai/openai-agents-python @ HEAD`
- Classification: D3 AUGMENTATION
- Primary use case: Structured multi-agent coordination SDK.
- Convergence verdict: Use as an augmentation layer for formalized reviewer roles, handoffs, and tool boundaries, especially when team-of-rivals review must be reproducible.
- Integration point: Mechanism 4, Blind A/B Team-of-Rivals Review. Define independent candidate-pro and candidate-red-team agents with controlled evidence packets and blind scoring.
- Risk / constraint: This is not a replacement for convergence-gate policy. It provides coordination mechanics; governance still comes from local rules and audit artifacts.

### 3. `confident-ai/deepeval`

- Install command: `pip install deepeval`
- Cite anchor: `https://docs.confident-ai.com/docs/getting-started`
- Classification: D1 NEW-USE-CASE
- Primary use case: LLM evaluation and assertion framework with SOTA metrics.
- Convergence verdict: Adopt as the executable assertion layer for research claims and adoption verdicts.
- Integration point: Mechanism 3, Executable SOTA-Claim Audit. Assert that each install candidate has current sources, a non-static popularity signal, a specific integration point, and a defensible D1/D3 classification.
- Risk / constraint: Metrics must evaluate evidence quality and reasoning structure rather than attempt to turn all architecture judgment into a single score.

### 4. `openai/evals`

- Install command: `pip install evals`
- Cite anchor: upstream package and repository install path for OpenAI eval harness
- Classification: D1 NEW-USE-CASE
- Primary use case: Evaluation harness for model capability measurement.
- Convergence verdict: Adopt for repeatable capability measurement when research recommendations depend on model behavior, prompt reliability, or comparative agent performance.
- Integration point: Mechanism 3 and Mechanism 4. Use eval suites to measure whether candidate-review agents actually improve recall, precision, and rejection of weak SOTA claims.
- Risk / constraint: Best used for model capability benchmarks and regression suites; do not overload it as a general dependency scanner.

### 5. Arize Phoenix MCP

- Install command: `npx -y @arizeai/phoenix-mcp@latest --baseUrl http://127.0.0.1:16006`
- Cite anchor: `https://docs.arize.com/phoenix`
- Classification: D1 NEW-USE-CASE
- Primary use case: Trace-query surface for closed-loop wire-surface-close discipline.
- Convergence verdict: Adopt where research recommendations must be verified against actual tool, hook, and trace behavior.
- Integration point: Mechanism 6, Trace-Backed Wire-Surface Close. Query traces for installed candidate usage, failure modes, hook coverage, latency, and missing spans.
- Risk / constraint: Requires a running Phoenix service and consistent trace emission. The MCP server is only as useful as the instrumentation behind it.

## V2 Research Architecture

### Mechanism 1: Temporal Freshness Sentinel

- TIER-1 SOTA pattern: Freshness-weighted evidence and delta-aware repository analysis.
- Install command: no new install required for baseline; use GitHub Releases API and Stargazers API. Optional implementation dependency: existing HTTP client stack.
- Integration point: Candidate discovery and scoring stage before synthesis.
- Design: Poll GitHub releases, tags, commit activity, and stargazer velocity over recent windows. Compute recency and momentum features: latest release age, release cadence, star delta, contributor activity, and issue response freshness.
- Closure: Prevents static-star over-selection by forcing every candidate verdict to include temporal deltas.
- Cite anchors: research-protocol, convergence-gate.

### Mechanism 2: Source Freshness Cohort C10

- TIER-1 SOTA pattern: Multi-source recency cohort with independent corroboration.
- Install command: no mandatory install; use arXiv API, Reddit search/API where available, and HN Algolia API.
- Integration point: Evidence collection stage.
- Design: Build a C10 source cohort of recent sources around each candidate or architectural claim. Include primary docs/repos, arXiv when relevant, HN/Algolia discussion, Reddit practitioner signal, release notes, and issue/PR activity.
- Closure: Reduces stale-source risk and forces candidate selection to reflect current ecosystem movement.
- Cite anchors: research-protocol, synthesis-layer-verify.

### Mechanism 3: Executable SOTA-Claim Audit

- TIER-1 SOTA pattern: Claims become executable assertions rather than prose-only conclusions.
- Install command: `pip install deepeval`
- Integration point: Pre-final synthesis gate for every D1/D3 adoption verdict.
- Design: Encode assertions for evidence freshness, primary-source availability, classification correctness, candidate uniqueness, integration specificity, and risk disclosure. Fail the gate when a recommendation lacks current evidence or clear operational fit.
- Closure: Converts adoption claims into reproducible checks and catches unsupported SOTA language.
- Cite anchors: deepeval, convergence-gate, synthesis-layer-verify.

### Mechanism 4: Blind A/B Team-of-Rivals Review

- TIER-1 SOTA pattern: Adversarial independent review before convergence.
- Install command: `pip install openai-agents`
- Integration point: Review stage between initial candidate ranking and final convergence.
- Design: Run independent reviewer roles against the same evidence bundle. One reviewer argues for adoption, another argues against, and a synthesis reviewer resolves disagreements with explicit references to evidence and rules.
- Closure: Reduces single-agent anchoring, exposes weak assumptions, and raises the bar for install recommendations.
- Cite anchors: openai-agents, convergence-gate.

### Mechanism 5: Durable Research DAG

- TIER-1 SOTA pattern: Durable state machine for multi-session, auditable research workflows.
- Install command: `pip install -U langgraph`
- Integration point: Research orchestration layer.
- Design: Model research as a DAG with persisted state: `seed_question`, `candidate_discovery`, `freshness_poll`, `source_cohort`, `gap_table`, `rivals_review`, `claim_audit`, `final_artifact`. Persist node inputs, outputs, timestamps, unresolved objections, and final convergence state.
- Closure: Avoids losing context across turns and makes interrupted research resumable without flattening all state into a final markdown artifact.
- Cite anchors: langgraph, research-protocol.

### Mechanism 6: Trace-Backed Wire-Surface Close

- TIER-1 SOTA pattern: Observability-backed validation of claimed integration behavior.
- Install command: `npx -y @arizeai/phoenix-mcp@latest --baseUrl http://127.0.0.1:16006`
- Integration point: Post-install and pre-ship validation stage.
- Design: Query Phoenix traces to verify that candidate tools are actually called, hooks emit spans, errors are visible, and the intended telemetry surfaces are wired. Attach trace-query summaries to final artifacts.
- Closure: Moves wire-surface-close from checklist language to trace-backed proof.
- Cite anchors: phoenix, synthesis-layer-verify.

### Mechanism 7: Marketplace Freshness Reconciler

- TIER-1 SOTA pattern: Dependency drift reconciliation across local install state and upstream marketplace metadata.
- Install command: no mandatory install; use package-manager metadata commands and existing plugin registry files.
- Integration point: Scheduled maintenance and pre-recommendation validation.
- Design: Compare local plugin manifests, marketplace entries, package-manager latest versions, upstream release metadata, and recommended install commands. Flag version drift, stale commands, removed packages, and renamed projects.
- Closure: Prevents artifacts from recommending stale install commands or assuming local marketplace metadata is current.
- Cite anchors: research-protocol, convergence-gate.

## Adversarial Findings

1. The current architecture can appear rigorous while still ranking candidates by static GitHub popularity. This is the highest-risk gap because it looks evidence-backed but may miss temporal decay.
2. A repository with many stars but no recent releases should not automatically outrank a smaller, faster-moving project with current releases and active maintainers.
3. Prose-only adoption verdicts are too easy to overfit to analyst confidence. Executable assertions should gate final D1 and D3 classifications.
4. Source freshness cannot be inferred from local clone presence. A cloned repository at HEAD is useful, but it does not replace external ecosystem recency signals.
5. Multi-agent review only helps if it is genuinely adversarial and evidence-bounded. Parallel agreement without blind challenge does not close the bias gap.
6. Trace-backed verification is required for wire-surface-close claims. A candidate should not be marked operationally closed until traces or equivalent telemetry show it was exercised.
7. Marketplace freshness is a separate architecture concern. Local plugin availability, upstream package versions, and recommended install commands can drift independently.

## Convergence Map

| Mechanism | Candidate / Tool | TIER-1 Pattern | Rule Anchor | Convergence Result |
|---|---|---|---|---|
| Temporal Freshness Sentinel | GitHub API | Freshness-weighted delta evidence | research-protocol, convergence-gate | Closes static-popularity bias. |
| Source Freshness Cohort C10 | arXiv, Reddit, HN/Algolia, primary docs | Independent recent corroboration | research-protocol, synthesis-layer-verify | Closes stale-source blind spots. |
| Executable SOTA-Claim Audit | deepeval | Executable assertion gate | deepeval, convergence-gate | Closes unsupported adoption claims. |
| Blind A/B Team-of-Rivals Review | openai-agents-python | Adversarial review and role separation | openai-agents, convergence-gate | Closes single-reviewer anchoring. |
| Durable Research DAG | langgraph | Persistent auditable state machine | langgraph, research-protocol | Closes cross-session state loss. |
| Trace-Backed Wire-Surface Close | Phoenix MCP | Observability-backed verification | phoenix, synthesis-layer-verify | Closes unverified hook/trace claims. |
| Marketplace Freshness Reconciler | package and plugin metadata | Drift detection across install surfaces | research-protocol, convergence-gate | Closes stale install-command risk. |

## Implementation Notes

- First build the Temporal Freshness Sentinel because it addresses the key adversarial finding directly.
- Add deepeval gates before expanding candidate volume; otherwise the pipeline may scale weak conclusions.
- Use langgraph only for workflows that need resumability, branch state, or explicit audit trails.
- Introduce Phoenix MCP after trace emission is reliable, so query results prove actual behavior rather than absence of instrumentation.
- Keep all final artifacts under the existing convergence rules and include cite anchors for every install recommendation.

## Final Verdict

The top install priorities are `langgraph`, `openai-agents`, `deepeval`, `evals`, and Phoenix MCP, but the core architecture improvement is broader than installing tools. V2 should reweight the research pipeline around temporal evidence, executable claim audits, adversarial review, durable state, and trace-backed closure.

FILE_WRITTEN

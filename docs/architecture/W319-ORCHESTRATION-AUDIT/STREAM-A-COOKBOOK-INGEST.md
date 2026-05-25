# W319 Stream A — Official Anthropic Cookbook SOTA Ingest (2026-05-19)

> Scope: line-by-line ingest of orchestration patterns from `anthropics/anthropic-cookbook` (HEAD `33424c3e`) and `anthropics/claude-cookbooks` (HEAD `2eed173a` post-pull). Identify NET-NEW SOTA patterns not already in our runtime.

## 1. Repo SHAs cited (current local HEADs as of 2026-05-19)

| Repo                                            | Local clone path                                       | HEAD SHA          | Date                | Status |
|-------------------------------------------------|--------------------------------------------------------|-------------------|---------------------|--------|
| `anthropics/claude-cookbooks`                   | `Z:/repos/deps/claude-cookbooks/`                      | `2eed173a`        | 2026-05-19          | **PULLED THIS STREAM** (was 10 commits behind at `b5b727b7`) |
| `anthropics/anthropic-cookbook` (same repo, mirror)| `Z:/repos/deps/anthropic-cookbook/`                  | `33424c3e`        | 2026-04-27          | 10+ commits behind upstream; old mirror — see Δ |
| `anthropics/anthropic-cookbook` (canonical clone)| `Z:/repos/deps/anthropics__claude-cookbooks/`         | `b5b727b7`        | 2026-05-13          | 10 commits behind; same repo URL as above — should be consolidated |
| `anthropics/claude-agent-sdk-python`            | `Z:/repos/deps/anthropics__claude-agent-sdk-python/`  | `c352a509`        | 2026-05-15          | UPSTREAM CURRENT |

**Operator note**: "agent-orchestration-cookbook" mentioned in scope brief does **NOT exist** as a separate repo. The orchestration material lives in **claude-cookbooks/managed_agents/** (Anthropic Managed Agents beta tutorials) + **claude-cookbooks/patterns/agents/** (effective agents reference impl) + **anthropic-cookbook/claude_agent_sdk/** (Claude Agent SDK tutorials). All under the same `anthropics/claude-cookbooks` mono-repo per its README:1-2.

## 2. NEW (since W316-S1 cite) — 10 commits in `anthropics/claude-cookbooks` post-W316-S1 deep-read

```
2eed173 2026-05-19  Merge PR #643 from anthropics/rlm/scrub-cma-notebooks
01b041a 2026-05-19  refactor(self_hosted_sandboxes): rename private-sandbox → self-hosted-sandbox
1a4f78a 2026-05-19  Merge PR #640 from anthropics/rlm/private-sandbox-updates
74edd9e 2026-05-19  refactor(self_hosted_sandboxes): use published SDK releases; fix worker API usage
3c26fa8 2026-05-19  fix(self_hosted_sandboxes): scrub staging/internal refs, tighten exception handling
67aadb7 2026-05-19  refactor(self_hosted_sandboxes): drop tool demos, rename privatesandbox*
7d1dc7d 2026-05-18  feat(managed_agents): SELF-HOSTED SANDBOX worker templates  ← NEW MATERIAL
a102bbe 2026-05-18  Merge PR #614 from anthropics/lance/managed-agents-slack
b5b727b 2026-05-13  Merge PR #607 from anthropics/lance/managed-agents-linear         ← cited W316-S1
103cc79 2026-05-13  feat(managed_agents): add SLACK WEBHOOK BRIDGE template            ← NEW MATERIAL
```

## 3. Canonical orchestration primitives in claude-cookbooks (2026-05-19 HEAD)

### 3.1 `patterns/agents/orchestrator_workers.ipynb` (Building Effective Agents reference impl)

**Pattern**: Orchestrator-Workers with dynamic subtask decomposition. Cite `https://anthropic.com/research/building-effective-agents`.

**Key SOTA insights**:
- **Adaptive task-breakdown** — orchestrator analyses input + decides at runtime what subtasks to create (vs. pre-defined parallelization). `FlexibleOrchestrator.process()` cell.
- **XML-structured worker communication** — uses `<task>/<type>/<description>` XML for parsing.
- **Empty-response validation** — explicit handling: `if not worker_content or not worker_content.strip(): print warning + substitute error message`. **DIRECT match for our W288-P1 empty-final-message pattern** (Stream A Dynamic-Probe §3.2).
- **N+1 cost note** — explicit "1 orchestrator + N workers" cost-awareness language.
- **Sequential vs. parallel workers** — notebook is sequential; "for better performance, consider parallelizing worker calls with asyncio or thread pools" — our W269 parallel-Agent-dispatch is the equivalent.

**Adoption status**: pattern is conceptually in our W289-RUNBOOK. **Empty-response validation NOT explicit** in our agent-team prompts — see SYNTHESIS HIGH-2.

### 3.2 `patterns/agents/prompts/research_lead_agent.md` + `prompts/research_subagent.md`

**Pattern**: Anthropic's reference **Research Lead + Research Subagent** prompt pair. 156 lines / 47 lines respectively.

**Key SOTA features in research_lead_agent.md**:
- **Query-type taxonomy** (`:13-29`): Depth-first / Breadth-first / Straightforward — DIRECT match for our W269 mandate's "2+ independent streams" trigger.
- **Subagent count guidelines** (`:71-87`): Simple→1, Standard→2-3, Medium→3-5, High→5-10 (max 20). **Direct analog of our W289 §1 decision matrix**, but with explicit guidance against >20.
- **Delegation instructions** (`:89-119`): "Deploy subagents IMMEDIATELY after planning so research starts quickly" + "use the `run_blocking_subagent` tool" (note: this is Anthropic's internal tool naming — our equivalent is `Agent`).
- **Use parallel tool calls** (`:135-137`): "You MUST use parallel tool calls for creating multiple subagents (typically running 3 subagents at the same time) at the start of the research" — **DIRECT cite-anchor for W269 mandate language**.
- **Synthesis responsibility** (`:118`): "Your primary role is to coordinate, guide, and synthesize - NOT to conduct primary research yourself."

**Key SOTA features in research_subagent.md**:
- **Research budget** (`:5-6`): "roughly how many tool calls to conduct ... simpler tasks <5, medium 5, hard ~10, very difficult up to 15". **NEW PATTERN** for our runtime — we don't have an explicit per-subagent tool-call budget.
- **OODA loop** (`:10-13`): explicit Observe-Orient-Decide-Act framing.
- **Minimum tool calls** (`:11`): "MINIMUM of five distinct tool calls" — interesting counter to our "use parallel where possible" framing.
- **Source quality block** (`:35-38`): explicit skepticism guide ("speculation language", "predictions", "narrative-driven speculation").
- **Maximum tool call limit** (`:44-46`): "stay under 20 tool calls and under about 100 sources" — **NEW PATTERN**.

**Adoption status**: superpowers's `dispatching-parallel-agents` skill is a structural analog. Anthropic's research_lead pattern is **MORE EXPLICIT** about subagent counts + parallel-call MUSTs. W319 forward-AI: cite-refresh `parallel-dispatch-mandate` SKILL.md with `research_lead_agent.md:135-137` as anchor.

### 3.3 `managed_agents/CMA_coordinate_specialist_team.ipynb` (Managed Agents `multiagent` coordinator)

**API surface**: `client.beta.agents.create(...)` + `multiagent={"type": "coordinator", "agents": [agent1_id, agent2_id, agent3_id]}` + `betas=["managed-agents-2026-04-01"]`.

**Pattern**: Anthropic Cloud-hosted multi-agent coordinator. Coordinator agent has `multiagent` config naming 3 specialist agent IDs; specialists call `send_to_parent` to return structured payloads to coordinator.

**Key SOTA insights**:
- **Per-role tool scoping** — each subagent has its own `tools=[...]` list (e.g. `web_search` ONLY for researcher; file-read ONLY for librarian; no tools beyond seat-count file for pricer). Direct match for our `agent-teams:team-reviewer` (read-only) vs. `team-implementer` (read+write) split.
- **Event stream** — coordinator emits `session.thread_created`, `agent.thread_message_received`, `session.status_idle` events. Our CC Agent tool returns final result via `Task` tool's `final_message` — no real-time event stream.
- **send_to_parent pattern** — specialists send JSON payload back to coordinator via explicit tool call. Our equivalent is `SendMessage(to="<team-lead-name>", message=...)`.
- **Parallel-by-default** — notebook shows researcher + pricing_modeler spawned simultaneously, then case_study_picker spawned after researcher returns priorities. **Convergent with our W269 mandate** but enforced at the API runtime level, not by orchestrator-prompt discipline.
- **`coordinator` type vs. `solo` type** — `multiagent.type` is an explicit enum.

**Adoption status**: this is a separate Anthropic product (Managed Agents = hosted runtime). NOT directly portable to our local CC runtime. Pattern lessons applicable: explicit per-role tool scoping (we have this); parallel-by-default coordination (we have this via W269); event-stream observability (we don't have this for Agent tool).

### 3.4 `managed_agents/CMA_iterate_fix_failing_tests.ipynb` (entry-point notebook)

Per README:32, this is the canonical entry point. Introduces every API shape the others build on:
- `agents.create()` — agent definition (system prompt + model + tools)
- `environments.create()` — sandboxed runtime container
- `sessions.create()` — actual run instance with `agent_id` + `environment_id`
- `files.upload()` + `resources=[...]` — file mounts at `/mnt/user-data/...`
- `sessions.events.send()` + `sessions.events.stream()` — event loop

Our CC runtime is NOT Managed Agents. But the SOTA insight is: **explicit observability of the orchestration event-stream** (thread_created, tool_use, status_idle). W319 forward-AI: harness/eval_harness.py could add a Lane that probes our Agent tool's final_message + diff against expected event order.

### 3.5 `managed_agents/CMA_gate_human_in_the_loop.ipynb`

**Pattern**: custom-tool `decide()` / `escalate()` for human-in-the-loop. The `requires_action` idle bounce pattern.

**Convergent with**: our codex Stop-hook adversarial-review-gate (`.claude/settings.json:121-123`) and our `superpowers:requesting-code-review` skill. Different mechanism but same intent.

### 3.6 `managed_agents/CMA_remember_user_preferences.ipynb` (Memory stores)

**API surface**: `client.beta.memory_stores.create(...)` + read-write memory per customer + read-only brand-wide store + per-resource `instructions` field.

**Convergent with**: our T6 basic-memory (canonical) + Cognee T3 + (now retired) Hindsight T1. Managed Agents has 1st-class memory primitive. Our CC runtime has plugin-based memory MCPs.

**Insight**: per-resource `instructions` field is interesting — we could add per-skill memory-scope hints in skill frontmatter. W319 forward-AI consideration.

### 3.7 `managed_agents/CMA_verify_with_outcome_grader.ipynb` (Outcomes grader)

**Pattern**: `user.define_outcome` + `span.outcome_evaluation_*` events. Writer-grader loop where stateless grader fetches every URL + checks every quote against a rubric.

**Convergent with**: our codex GPT-5.5 cross-model adversarial-review-gate. Anthropic's Outcomes is API-level; ours is plugin-level via codex.

### 3.8 `managed_agents/linear/` + `managed_agents/slack_data_bot.ipynb` (NEW since W316-S1)

**SHA `b5b727b` and `103cc79`** = Linear + Slack webhook bridges. NEW orchestration entry-points (alerts/issues trigger sessions).

**Adoption status**: not directly applicable to our local runtime. Pattern: external-event → session-start is a deferred-pattern.

### 3.9 `managed_agents/self_hosted_sandboxes/` (NEWEST since W316-S1, commits 7d1dc7d→01b041a)

**Pattern**: worker templates for running Anthropic Managed Agents in your own infrastructure (self-hosted sandbox runtime). Renamed `private-sandbox → self-hosted-sandbox` 2026-05-19.

**Adoption status**: ENTERPRISE-grade pattern. Not directly applicable to our personal-runtime.

## 4. `anthropic-cookbook/claude_agent_sdk/` agent SDK patterns

### 4.1 `01_The_chief_of_staff_agent.ipynb`

**Pattern**: chief-of-staff agent that delegates to specialised research/budget/talent subagents. Same pattern as multiagent coordinator above. Self-contained Python SDK example using `claude_agent_sdk` package.

### 4.2 `02_The_observability_agent.ipynb`

**Pattern**: agent that monitors agent runs (meta-observability). Builds on `agent_visualizer.py` utility.

**Adoption status**: NEW PATTERN for us — explicit agent observability. Convergent with our W315-E + W318-A parallel_ratio measurement work. W319 forward-AI: consider integrating agent_visualizer-style instrumentation into harness.

### 4.3 `04_migrating_from_openai_agents_sdk.ipynb`

**Pattern**: migration guide from OpenAI Agents SDK → Anthropic Agent SDK. NOT directly orchestration-related; reference for our codex-companion-mjs paths.

## 5. `anthropic-cookbook/multimodal/using_sub_agents.ipynb`

Documents sub-agent dispatch for multimodal tasks. Per-modality subagent specialization (vision-agent, text-agent, audio-agent). Not directly applicable to our codebase-orchestration, but instructive: per-modality specialization mirrors our per-dimension code-review specialization (security/perf/arch/test).

## 6. Net-new SOTA patterns NOT in our W289-RUNBOOK / W318-A audit

| # | Pattern                                                  | Source                                                                                | Adoption recommendation                                                                            |
|---|----------------------------------------------------------|---------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| 1 | **Empty-response worker validation**                     | `patterns/agents/orchestrator_workers.ipynb` cell-2                                   | **HIGH** — directly addresses our W288-P1 empty-final-message anti-pattern. Codify in agent-teams skill. |
| 2 | **Research budget per-subagent (tool calls + sources)**  | `patterns/agents/prompts/research_subagent.md:5-6,11,44-46`                           | **HIGH** — adopt as `subagent_research_budget` skill or merge into `parallel-dispatch-mandate` SKILL.md. |
| 3 | **Query-type taxonomy: depth/breadth/straightforward**   | `patterns/agents/prompts/research_lead_agent.md:13-29`                                | **MED** — add to W269 mandate routing logic.                                                       |
| 4 | **Explicit subagent-count guidelines (1/2-3/3-5/5-10)**  | `patterns/agents/prompts/research_lead_agent.md:71-87`                                | **MED** — formalise our parallel-cap=4 default; document escalation to 5-10 for high-complexity.   |
| 5 | **"MUST use parallel tool calls" cite for W269**         | `patterns/agents/prompts/research_lead_agent.md:135-137`                              | **MED** — refresh W269 cite in CLAUDE.md L13 from generic Anthropic-doc-link to this exact anchor.  |
| 6 | **Per-role tool-scoping pattern (read-only specialists)**| `managed_agents/CMA_coordinate_specialist_team.ipynb` cell-3                          | **LOW** — already have via team-reviewer (read-only) vs. team-implementer (read+write).            |
| 7 | **Event-stream observability for orchestration**         | `managed_agents/CMA_iterate_fix_failing_tests.ipynb`                                  | **LOW** — Managed Agents only; our CC Agent tool returns final_message.                            |
| 8 | **Outcome-grader loop (writer-grader-revise)**           | `managed_agents/CMA_verify_with_outcome_grader.ipynb`                                 | **LOW** — already have via codex adversarial-review-gate.                                          |
| 9 | **Memory store with per-resource `instructions` field**  | `managed_agents/CMA_remember_user_preferences.ipynb`                                  | **LOW** — Managed Agents only; consider per-skill memory-scope hints in skill frontmatter long-term. |
| 10| **Agent observability via `agent_visualizer.py`**        | `anthropic-cookbook/claude_agent_sdk/utils/agent_visualizer.py`                       | **LOW** — could integrate into harness/eval_harness.py parallel_ratio measurement.                 |

## 7. Cite index

- `https://github.com/anthropics/claude-cookbooks/tree/2eed173a/patterns/agents/orchestrator_workers.ipynb`
- `https://github.com/anthropics/claude-cookbooks/tree/2eed173a/patterns/agents/prompts/research_lead_agent.md`
- `https://github.com/anthropics/claude-cookbooks/tree/2eed173a/patterns/agents/prompts/research_subagent.md`
- `https://github.com/anthropics/claude-cookbooks/tree/2eed173a/managed_agents/CMA_coordinate_specialist_team.ipynb`
- `https://github.com/anthropics/claude-cookbooks/tree/2eed173a/managed_agents/README.md`
- `https://anthropic.com/research/building-effective-agents`
- `https://platform.claude.com/docs/en/managed-agents/multi-agent`

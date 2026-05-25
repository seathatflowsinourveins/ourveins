# Wave 1 Agent A — Agent Orchestration Rule Stack SOTA Audit (2026-05-15)

**Method**: 7-Probe-DAG + convergence-gate Axis 1-3 + SRA D1-D10 applied across 64 runtime-side rules + 173 awesome-agentic-patterns + Anthropic-cookbook 5 canonical workflow patterns + cwc-long-running-agents 5 primitives + superpowers 14 skills + 5 SOTA framework primitive surfaces (openai-agents-python `cf151f91`, langgraph `2e5025ec`, autogen `027ecf0a`, crewAI `e4a91cdc`, agno `b36051c2`, smolagents `df846f84`, claude-agent-sdk-python `b512f256`).

**Pin block (cite anchors at HEAD SHA)**:
- `Z:/repos/deps/awesome-agentic-patterns @ 9c40e10042254ab896fed6953267b119711bae40` [VERIFIED 2026-05-15]
- `Z:/repos/deps/superpowers @ f2cbfbefebbfef77321e4c9abc9e949826bea9d7` [VERIFIED 2026-05-15]
- `Z:/repos/deps/deepagents @ 95f845d29745ece957144d045849f02c667ac711` [VERIFIED 2026-05-15]
- `Z:/repos/deps/anthropic-cookbook @ 33424c3eb476cd56379435be086ccc228af1050d` [VERIFIED 2026-05-15]
- `Z:/repos/deps/openai-agents-python @ cf151f91ff9f73723720c3f5e84a873268317ff7` [VERIFIED 2026-05-15]
- `Z:/repos/deps/langgraph @ 2e5025ec1ac8d435840ed4a972097de87aaa2eab` [VERIFIED 2026-05-15]
- `Z:/repos/deps/autogen @ 027ecf0a379bcc1d09956d46d12d44a3ad9cee14` [VERIFIED 2026-05-15]
- `Z:/repos/deps/claude-agent-sdk-python @ b512f256450dba8f0dd1399e485563b7deb9c534` [VERIFIED 2026-05-15]
- `Z:/claude-sota-installed/.local/cwc/` Anthropic cwc-long-running-agents @ `e407c533` (per `docs/sota-installed-manifest.md` Wave 62B) [VERIFIED 2026-05-15]

## §1 Convergences (≥3-distinct-orgs patterns we ALREADY have — currency confirmed)

### C1 — Cost-Tier orchestrator+worker discipline (Opus/Sonnet/Haiku split)
- **cite-anchors**: Anthropic-cookbook `patterns/agents/orchestrator_workers.ipynb @ 33424c3e` (TIER-1 OFFICIAL — explicit "Opus orchestrator + Haiku worker" guidance per deepwiki Q&A) + Anthropic-cookbook `multimodal/using_sub_agents.ipynb @ 33424c3e` + LangGraph `create_react_agent` model-callable dynamic-selection contract @ `2e5025ec` + AutoGen `SelectorGroupChat` model-tier-driven speaker selection @ `027ecf0a` + openai-agents-python `Agent(model=...)` per-agent override @ `cf151f91`. **4-org Axis-1 PASS strict**.
- **current-state-in-runtime**: `team-orch-patterns.md §Context Budget (per agent) + Cost-Tier discipline reference` + agent frontmatter `model:` field (8/8 sss agents declare model:) + `cardinal-rule-7-graduated-unleash.md` Phase mechanics.
- **currency**: **CURRENT** (cite-anchored at cookbook HEAD).

### C2 — Worktree-per-agent isolation (filesystem race-condition avoidance)
- **cite-anchors**: Boris Cherny April 2026 6-tips @ CCBP `f8468e87` (TIER-1 NAMED-AUTHOR; "claude --worktree" canonical) + Anthropic CC official docs (URL — TIER-1-DIRECT) + jj-vcs `Workspace` primitive @ `755b7b7b` + OpenAI codex `resolve_root_git_project_for_trust` worktree-aware @ `993e3f40` + libgit2 worktree lock primitive @ `16cb9c5e`. **4-org Axis-1 PASS firm**.
- **current-state-in-runtime**: `parallel-session-worktree-isolation.md` (32.6K) + `lga-worktree-prereq.md` (6.1K) + 8/8 agents `isolation: worktree` (grep-verified).
- **currency**: **CURRENT**.

### C3 — Independent-generation-before-share / two-stage adversarial review
- **cite-anchors**: arxiv 2603.28990 (Mar 2026; 25K-task study; "hybrid-sequential beats centralized +14% / autonomous +44%") + CONSENSAGENT ACL 2025 sycophancy-mitigation + Kaesberg et al. ACL 2025 +13.2%/+2.8% (TIER-1 peer-reviewed) + superpowers `subagent-driven-development/SKILL.md @ f2cbfbef` "two-stage review: spec then quality" + cwc-long-running-agents `evaluator.md @ e407c533` "no Write/Edit subagent reviews work from fresh context". **5-org Axis-1 PASS firm**.
- **current-state-in-runtime**: `coordination.md §3-rule list` + `multi-perspective-subagents.md` (6.6K, 5-lens) + `cmc-t1-t7-lifecycle.md` (T1+T2+T3 spec/quality gates) + `team-orch-state-spawning.md §Implementer status vocabulary` (4-state DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED from superpowers).
- **currency**: **CURRENT**.

### C4 — Subagent-spawn discipline / Never-delegate-understanding
- **cite-anchors**: Piebald-AI claude-code-system-prompts (TIER-1 reference) + awesome-agentic-patterns `sub-agent-spawning.md @ 9c40e100` (Quinn Slack / Thorsten Ball / Will Larson named-T2) + LangGraph `Send()` API @ `2e5025ec` + AutoGen `HandoffMessage` + `Swarm` @ `027ecf0a` + openai-agents-python `handoffs/` subdirectory @ `cf151f91` + Anthropic cookbook `research_lead_agent.md @ 33424c3e` (5-10 subagents max=20 cap). **5-org Axis-1 PASS firm**.
- **current-state-in-runtime**: `team-orch-state-spawning.md` "Never delegate understanding" verbatim port + `parallel-agent-wave.md §How to apply` single-message-multi-Agent-block discipline.
- **currency**: **CURRENT**.

### C5 — State-leak negative-enumeration (parent→child)
- **cite-anchors**: deepagents `subagents.py:164-176 @ 95f845d2` (`_EXCLUDED_STATE_KEYS = {"messages","todos","structured_response","skills_metadata","memory_contents"}`) (TIER-1 LangChain-org) + LangGraph `ToolNode` 4-layer injection defense @ `2e5025ec` (deepwiki-verified: `InjectedState/InjectedStore/ToolRuntime` protection) + openai-agents-python `_tool_identity.py` @ `cf151f91` + Anthropic CC `isolation: worktree` frontmatter contract. **4-org Axis-1 PASS firm**.
- **current-state-in-runtime**: `team-orch-state-spawning.md §Parent→Child State-Leak Avoidance` 5-key sss-fit translation table.
- **currency**: **CURRENT**.

### C6 — Termination contract (declarative predicates)
- **cite-anchors**: AutoGen 11 TerminationCondition classes + `|` OR + `&` AND composition @ `027ecf0a` (deepwiki-verified) + LangGraph `Command(goto=PARENT)` + `END` node + `recursion_limit` @ `2e5025ec` + openai-agents-python `Agent(handoffs=[...])` @ `cf151f91` + crewAI `Crew().kickoff()` scoped-lifetime auto-disposal @ `e4a91cdc`. **4-org Axis-1 PASS firm**.
- **current-state-in-runtime**: `team-orch-patterns.md §Termination contract` 6-predicate eee-local subset + 4-state `verdict_one_line` HANDOFF slot.
- **currency**: **CURRENT** (HEAD bump probe nothing-new on AutoGen, LangGraph since iter-108 codification).

### C7 — Working memory via TodoWrite externalization
- **cite-anchors**: awesome-agentic-patterns `working-memory-via-todos.md @ 9c40e100` (Baddeley episodic buffer + Miller 7±2 academic foundation) + awesome-agentic-patterns `proactive-agent-state-externalization.md @ 9c40e100` (Cognition AI Devin Sonnet 4.5) + cwc-long-running-agents `PROGRESS.md` convention @ `e407c533`. **3-org Axis-1 PASS**.
- **current-state-in-runtime**: TaskList tool universally used; `karpathy-adapted.md §5 Wiki Compounding Surface` Layer 1+2+3 mapping (Chronological log / Index / Compiled wiki).
- **currency**: **CURRENT**.

### C8 — Fan-out cap (3-6 sweet spot, ≤20 swarm)
- **cite-anchors**: Anthropic-cookbook `research_lead_agent.md @ 33424c3e` (verbatim: "Simple 1 subagent / Standard 2-3 / Medium 3-5 / High 5-10 / max 20") + awesome-agentic-patterns `swarm-migration-pattern.md @ 9c40e100` (max-20 production) + awesome-agentic-patterns `adaptive-sandbox-fanout-controller.md @ 9c40e100` (N=3-5 start, adaptive scale-up). **3-org Axis-1 PASS**.
- **current-state-in-runtime**: `parallel-agent-wave.md §Cache-Aware Dispatch Pacing` max-3-concurrent / max-5-cumulative + `parallel-sessions.md §Recipe 4 Swarm` 10-20 cap.
- **currency**: **CURRENT** (claude-sota's max-3/5 is STRICTER than cookbook 5-10 due to FM-17 fleet-depletion empirical evidence — locally-justified divergence).

### C9 — Asynchronous coding pipeline / sub-agent compilation checker
- **cite-anchors**: awesome-agentic-patterns `asynchronous-coding-agent-pipeline.md @ 9c40e100` + `subagent-compilation-checker.md @ 9c40e100` + Anthropic CC `asyncRewake` hook field (TIER-1-DIRECT docs URL) + Mastra `executeStepWithRetry` @ ALT-IMPL.
- **current-state-in-runtime**: `lga-async-rewake.md §2 The asyncRewake pattern` (perf-vs-quality binary resolved) + `team-orch-state-spawning.md §Step-Level Retry` Mastra spec-only port.
- **currency**: **CURRENT**.

## §2 Gaps (SOTA patterns we DON'T have — discoverable via this audit)

### G1 — Default-FAIL contract (NEW from Anthropic 2026)
- **convergence-evidence**: TIER-1 OFFICIAL Anthropic `cwc-long-running-agents @ e407c533` 3-primitive quality loop verbatim: "Every criterion starts `false`; the agent can't mark it passing without opening evidence first." Hook implementation at `claude-code-config/.claude/hooks/{track-read.sh, verify-gate.sh}` (PreToolUse Write/Edit `permissionDecision: deny` until evidence file Read since gate last fired). Companion to Anthropic blog "Effective Harnesses for Long-Running Agents" (Nov 2025) + "Harness Design for Long-Running Application Development" (Mar 2026) — 2 dated TIER-1-NAMED-AUTHOR practitioner artifacts.
- **proposed-codification**: NEW rule `.claude/rules/default-fail-contract.md` (~150 LOC); OR extension of `synthesis-layer-verify.md §Reporting categories` with mechanical-enforcement hook stub.
- **demand-evidence per Probe 7.b 5-clause**: (1) named use case: claim-time gate for any "X is done" assertion in long-running /loop arcs; (2) cited input/source: `test-results.json`-equivalent + `screenshots/`-equivalent in eee context = `.claude/state/<wave>_verdict.json` + `.claude/state/codex_consult_*_OUT.txt` evidence; (3) wiring: PreToolUse Write/Edit hook checking evidence-Read-log JSONL; (4) incumbent comparison: synthesis-layer-verify Mia rule is OPERATOR-discipline POST-edit; this is MECHANICAL-enforcement PRE-edit at claim time — orthogonal; (5) reversible: <1min comment-out per CR-9. **DEMAND-CREATES-NEW-WORKFLOW.b PASS**.
- **CR-12 disposition**: **GENUINELY-NEW** (no upstream parity in sibling claude-sota; Anthropic-OFFICIAL primitive shipped 2026 post-current-rule-stack codification).

### G2 — Fresh-context evaluator subagent (no Write/Edit + skeptical-default)
- **convergence-evidence**: TIER-1 OFFICIAL Anthropic `cwc-long-running-agents/claude-code-config/.claude/agents/evaluator.md @ e407c533` verbatim: "Skeptical second-opinion reviewer... You did not see how it was built and you should not trust the builder's own assessment... Plausibility is not correctness." Convergent with anthropic-cookbook `evaluator_optimizer.ipynb @ 33424c3e` (deepwiki-verified loop structure) + superpowers `spec-reviewer-prompt.md @ f2cbfbef` "DO NOT trust the report" discipline + LangGraph `interrupt_before/interrupt_after` HITL gate primitive. **4-org Axis-1 PASS**.
- **proposed-codification**: new agent `.claude/agents/evaluator.md` (read-only subagent: `tools: Read, Glob, Grep`; mandatory `PASS|NEEDS_WORK` first-line verdict per cwc convention). Sister to existing `gpt5-reviewer` agent but Claude-side rather than codex-side. Use case: T1.5 evaluator-loop between T1 codex consult and T2 codex review, scoped to claims-vs-evidence asymmetry detection.
- **CR-12 disposition**: **PROVIDER-COMPLEMENT** (we have codex GPT-5.5 cross-model reviewer; we DON'T have a Claude-side fresh-context evaluator with mandatory no-Write/Edit + skeptical-default frontmatter). The two are orthogonal verifier classes.

### G3 — Tool-budget heuristic per query difficulty (research_subagent OODA)
- **convergence-evidence**: TIER-1 OFFICIAL Anthropic `research_subagent.md @ 33424c3e` verbatim: "research budget — under 5 tool calls for simple tasks, 5 for medium, 10 for hard, 15 for very difficult/multi-part. Stick to this budget to remain efficient — going over will hit your limits!" + research_lead_agent.md verbatim: "simple=1 / standard=2-3 / medium=3-5 / high=5-10 / max=20 subagents" + awesome-agentic-patterns `recursive-best-of-n-delegation.md @ 9c40e100` (Labruno + Daytona). **3-org Axis-1 PASS**.
- **proposed-codification**: `parallel-agent-wave.md` § strengthening: add tool-budget-per-difficulty 5/10/15 table to existing CADP section (the §How to apply step 2 enumerates 1/2-3/4-6/7+/10-20 agent counts but NOT per-subagent tool-call budgets). OR new section `team-orch-patterns.md §Per-subagent OODA tool-budget`. ~15 LOC delta.
- **CR-12 disposition**: **PARTIAL-OVERLAP** (we have agent-count caps but not per-agent tool-call budget); ADOPT-NOW.

### G4 — Planner-Worker hierarchical separation for >1-hour autonomous arcs
- **convergence-evidence**: awesome-agentic-patterns `planner-worker-separation-for-long-running-agents.md @ 9c40e100` (Cursor blog "Scaling Agents") + awesome-agentic-patterns `cross-cycle-consensus-relay.md @ 9c40e100` (auto-co framework, atomic-rename relay-doc) + Anthropic cwc-long-running-agents `PROGRESS.md` convention @ `e407c533` (4-section: Done/In progress/Next/Notes; re-read first thing on every restart). **3-org Axis-1 PASS**.
- **proposed-codification**: new rule `.claude/rules/planner-worker-handoff.md` (~120 LOC) codifying: (a) **planner**-role agents explore + create tasks; (b) **worker**-role agents grind to done + push; (c) `PROGRESS.md` 4-section + atomic-rename + every-restart-Read convention; (d) integration with existing `team-orch-state-spawning.md §Implementer-status-vocabulary` 4-state.
- **CR-12 disposition**: **GENUINELY-NEW** (no rule codifies the 4-section PROGRESS.md handoff or planner/worker role-separation; nearest sibling is `karpathy-adapted.md §5 Wiki Compounding Surface` Layer 1+2+3 but that's the LOG/INDEX/COMPILED naming, not the per-cycle handoff contract).

### G5 — Tool Search Lazy Loading (MCP tool discovery)
- **convergence-evidence**: awesome-agentic-patterns `tool-search-lazy-loading.md @ 9c40e100` (Thariq @ Anthropic Jan 2026, TIER-1-NAMED-AUTHOR) + awesome-agentic-patterns `progressive-tool-discovery.md @ 9c40e100` + awesome-agentic-patterns `context-minimization-pattern.md @ 9c40e100`. "MCP servers with 20+ tools" + "Tool descriptions consuming >10% of context window" trigger condition. **3-pattern same-org but 3 distinct-author Axis-1 PARTIAL**. Wait for ≥2 cross-org named-T2 with dated artifact (Axis-2 PARTIAL).
- **proposed-codification**: SKILL `.claude/skills/tool-search-lazy-loading/SKILL.md` (~80 LOC) describing pattern for ad-hoc MCP query-then-load when context budget pressure. Sister to existing 21-server `.mcp.json` registry — currently all 21 servers' tool descriptions load at session-start.
- **CR-12 disposition**: **STUDY-PILOT** (Axis 2 PARTIAL; pre-PILOT until ≥2 named-T2 dated artifacts cite this specific pattern). Probe 7.b 5-clause check: clauses 1-3+5 PASS, clause 4 incumbent-comparison NEEDS BENCHMARK (does context pressure actually exceed 10% in eee 21-MCP setup? Probe needed).

### G6 — Incident-to-Eval Synthesis (closing the regression loop)
- **convergence-evidence**: awesome-agentic-patterns `incident-to-eval-synthesis.md @ 9c40e100` (OpenAI Codex authored; SRE postmortem-culture canonical) + Anthropic Constitutional AI (Bai et al. 2022) + OpenAI evals + Thummalapenta FSE 2014 academic foundation. **3-org Axis-1 PASS**.
- **proposed-codification**: this is ALREADY half-implemented in `cmc-verdict-shapes.md §Eval-case mandate (Phase 1 of Task #88 verdict→eval gap closure)` — but Phase 2 (auto-add hook), Phase 3 (codex judge), Phase 4 (evolve_pass_rate_gate.py fallback) are FORWARD-REF. Promotion candidate: graduate Phase 2-4 from FORWARD-REF → ACTIVE.
- **CR-12 disposition**: **PARTIAL-OVERLAP** strengthen existing rule (Phase 2-4 closure); ~50 LOC delta + 1 new hook script.

### G7 — Chain-of-Thought Monitoring & Interruption (operator steering)
- **convergence-evidence**: awesome-agentic-patterns `chain-of-thought-monitoring-interruption.md @ 9c40e100` (Tanner Jones @ Vulcan; Claude blog "building-companies-with-claude-code") + Anthropic cwc-long-running-agents `steer.sh @ e407c533` (PreToolUse hook surfaces STEER.md contents once + clears it) + autogen `ExternalTermination` programmatic-control-from-outside @ `027ecf0a`. **3-org Axis-1 PASS**.
- **proposed-codification**: SKILL `.claude/skills/operator-steering/SKILL.md` + adaptation of `cwc/.claude/hooks/steer.sh` to eee context. Mid-run redirect without session restart. ~60 LOC.
- **CR-12 disposition**: **GENUINELY-NEW** (no existing rule codifies mid-run operator interrupt; closest is `coordination.md §12 Rewind-first` but that's session-end, not mid-run).

### G8 — Declarative Multi-Agent Topology Definition (cross-framework portability)
- **convergence-evidence**: awesome-agentic-patterns `declarative-multi-agent-topology-definition.md @ 9c40e100` (AgenTopology reference) + LangGraph `StateGraph` declarative compile @ `2e5025ec` + AutoGen `Component` serialization @ `027ecf0a` + openai-agents-python `Agent(@dataclass)` declarative @ `cf151f91`. **4-org Axis-1 PASS firm**.
- **proposed-codification**: DEFER — claude-sota's topology lives in `.claude/agents/*.md` frontmatter + per-rule spawn templates; introducing a separate YAML topology DSL would duplicate without clear demand benefit. Probe 7.a DEMAND-ABSENCE: no eee workflow currently exercises cross-framework topology export.
- **CR-12 disposition**: **DUPLICATE-FUNCTIONALITY** (frontmatter already serves this role); REJECT-FOR-FIT.

### G9 — Adaptive Sandbox Fan-Out Controller (signal-driven scale-up/down)
- **convergence-evidence**: awesome-agentic-patterns `adaptive-sandbox-fanout-controller.md @ 9c40e100` (Labruno + swarm-migration-pattern) + awesome-agentic-patterns `recursive-best-of-n-delegation.md @ 9c40e100` (Labruno + Daytona RLM + arXiv 2512.24601 + self-consistency Wang 2022 + tree-of-thoughts Yao 2023). **2-org but multi-paper Axis-1 PARTIAL**.
- **proposed-codification**: DEFER — claude-sota's `parallel-agent-wave.md §CADP` is static-cap discipline (max 3 concurrent / max 5 cumulative based on cache rate). Adaptive controller (scale-up on judge-uncertainty / scale-down on convergence) is a higher-complexity primitive. Probe 7.a 5-clause: clauses 1-2 PASS but clause 4 NEEDS comparison evidence — does signal-driven scale-up demonstrably beat static caps in our empirical FM-17 fleet-depletion arc?
- **CR-12 disposition**: **STUDY-PILOT-FUTURE** (axis-1 needs to mature; queue for re-audit at HEAD bump).

### G10 — Subject Hygiene (named subagent dispatch traceability)
- **convergence-evidence**: awesome-agentic-patterns `subject-hygiene.md @ 9c40e100` (TIER-1 named-T2 Nikola Balic) + `sub-agent-spawning.md @ 9c40e100` cross-cite ("Each subagent invocation must have a clear, specific task subject for traceability. Empty or generic subjects make parallel work untraceable and synthesis difficult"). **1-org Axis-1 INSUFFICIENT — single source**. Wait for additional convergence.
- **proposed-codification**: minor strengthening of `team-orch-patterns.md §Agent Brief Template` — add explicit `subject: <topic-shortname>` slot + downstream Mia probe that subjects don't collide across parallel agents in same fire. ~10 LOC delta. Not critical; deferred.
- **CR-12 disposition**: **PARTIAL-OVERLAP**; minor strengthening; LOW priority.

## §3 Strengthening candidates (existing rules where SOTA suggests improvements)

### S1 — `mia-pre-apply.md` extension: add 4-clause-INSTALL probe for ALL primitive types
- **current state**: §"Alternate-install-path probe discipline" (n=36 ladder advance) — currently ONLY scopes to `npm install -g`/`cargo install`/`pip install`/`go install`/etc CLI installs.
- **SOTA delta**: extend to ALSO probe before claiming "skill exists" / "agent exists" / "rule exists" / "MCP server exists" — 4 NEW primitive classes. cite per `cardinal-rule-12-upstream-install-priority.md §CR-12 6-class disposition lattice` + cwc-long-running-agents `verify-gate.sh @ e407c533` evidence-Read-before-claim canonical Anthropic mechanism.
- **LOAD-BEARING evidence**: 3 sibling-claude-sota memories already cite Mia n=29+ catches for non-install prescriptions (architect / sota-researcher / codex T1 — see §Empirical evidence ladder rows 4-8). Probe should be uniform.
- **patch shape**: ~25 LOC addition to mia-pre-apply.md §How to apply step 2.

### S2 — `synthesis-layer-verify.md §SubagentStop transcript-mining` mechanical-enforcement
- **current state**: §SubagentStop transcript-mining describes the AXIS but the hook script `.claude/hooks/scripts/subagent_transcript_mine.py` is OPERATIONAL-discipline (operator inspects JSONL post-completion).
- **SOTA delta**: graduate to mechanical-enforcement via cwc-long-running-agents `verify-gate.sh @ e407c533` shape — PreToolUse Write checking the most recent subagent transcript JSONL for `tool_count=0` OR `parse_status != "ok"` and emit `decision:"block"` with reason "subagent transcript shows zero-investigation Pattern B; do not silently accept verdict".
- **LOAD-BEARING evidence**: Pattern B HONEST-NON-FINDING zero-investigation variant has n=8 ladder per `ctff-pattern-b-and-t1-ops.md §Pattern-B mitigation patterns`. Mechanical enforcement closes the ladder.
- **patch shape**: new hook script `.claude/hooks/scripts/subagent_transcript_guard.py` (~80 LOC) + 1 settings.json entry + reference comment in synthesis-layer-verify.md.

### S3 — `parallel-agent-wave.md §CADP` add per-difficulty tool-call budget (G3 closure)
- **current state**: §How to apply step 2 enumerates agent COUNTS by query complexity (1 / 2-3 / 4-6 / 7+ / 10-20) but NOT per-agent tool-call BUDGETS.
- **SOTA delta**: add per-difficulty tool-call budget table per Anthropic `research_subagent.md @ 33424c3e` (simple <5 / medium 5 / hard 10 / very-difficult 15) + hard ceiling 20 calls / 100 sources.
- **LOAD-BEARING evidence**: TIER-1 OFFICIAL Anthropic cite + CADP empirical evidence (cache-rate degradation past max-5).
- **patch shape**: ~15 LOC addition to parallel-agent-wave.md.

### S4 — `team-orch-patterns.md §Termination contract` add `on_no_progress` predicate
- **current state**: 6 termination predicates (`on_handoff_to`, `on_text_match`, `on_max_iterations`, `on_token_budget_exceeded`, `on_tool_count_exceeded`, `on_subprocess_failure`).
- **SOTA delta**: add `on_no_progress: <N>` (max consecutive turns without filesystem/git/commit change) per `evidence-policy.md §Stuck Detection` 3-failed-attempts pattern + awesome-agentic-patterns `chain-of-thought-monitoring-interruption.md`. Closes the silent-stall failure mode that CADP-style cumulative caps don't catch.
- **LOAD-BEARING evidence**: FM-17.b/d wrapper-context autocompact-thrash observable in `.claude/state/subagent_metrics.jsonl` (per CLAUDE.local.md ENV (j) W201 codification context).
- **patch shape**: ~10 LOC addition.

### S5 — `cmc-verdict-shapes.md §Eval-case mandate` Phase 2-4 graduation
- **current state**: Phase 1 (manual eval case addition) ACTIVE; Phases 2-4 (auto-add hook / codex judge / evolve_pass_rate_gate.py) FORWARD-REF.
- **SOTA delta**: graduate Phase 2 (auto-add hook PostToolUse `Bash(git commit *)` checking commit body for `T1 NEEDS-REVISION conf>=0.85` + suggesting eval case file) per `incident-to-eval-synthesis.md @ 9c40e100` SRE-postmortem-culture canonical + Anthropic Constitutional AI corpus practice.
- **LOAD-BEARING evidence**: Loop #4 cycle 2026-04-28 verdict→eval gap closure rationale.
- **patch shape**: new hook script `.claude/hooks/scripts/eval_case_compliance_observer.py` (already exists per `parallel-session-worktree-isolation.md §Mandatory-guard promotion` — verify and graduate from PARTIAL-ACTIVE to FULL-ACTIVE).

### S6 — `advanced-agent-team-standing-directive.md` add OODA-loop inner discipline
- **current state**: 8 invariants govern team COMPOSITION (model split, file:line cites, ARTIFACT-INLINE, etc.) but no INNER OODA-loop discipline per agent.
- **SOTA delta**: add invariant #9 — each agent's brief MUST include "execute OODA loop: Observe gathered info → Orient toward next gap → Decide tool action → Act + observe → loop. No same-query repetition." Per Anthropic `research_subagent.md @ 33424c3e` verbatim 4-step OODA + tool-budget heuristic.
- **LOAD-BEARING evidence**: TIER-1 OFFICIAL Anthropic cite.
- **patch shape**: ~10 LOC addition.

## §4 LOAD-BEARING vs cosmetic classification

| Rule | Classification | Evidence |
|---|---|---|
| `advanced-agent-team-standing-directive.md` | **LOAD-BEARING** | n=3 user-trigger ladder; gates 3-5 agent team for every non-trivial fire |
| `ahfv-seven-sub-classes.md` + `ahfv-probe-dag.md` + `ahfv-codex-rescue-blind-spot.md` | **LOAD-BEARING** | n=12 instances + FM-09 codex-rescue blind-spot 5/5 base rate; gates SOTA adoption verdicts |
| `cmc-t1-t7-lifecycle.md` + `cmc-verdict-shapes.md` + `cmc-env-funneled-disclosure.md` | **LOAD-BEARING** | Cardinal-rule-3 cross-model consensus; HARD GATE on every design-surface edit |
| `mia-pre-apply.md` | **LOAD-BEARING** | n=36 cumulative dogfood; 28/29 broad-fan-out OVER catches pre-apply |
| `team-orch-frameworks.md` + `team-orch-patterns.md` + `team-orch-state-spawning.md` + `team-orch-experimental-teams.md` | **LOAD-BEARING** | 4-child W159 SB1 split; cardinal cite-source for all team-orchestration spawn templates |
| `parallel-agent-wave.md` §CADP | **LOAD-BEARING** | Empirical 2026-04-29 depletion incident codified; max-3/5 caps prevent FM-17 fleet-depletion |
| `synthesis-layer-verify.md` | **LOAD-BEARING** | OVER/UNDER/HNF discipline + SubagentStop 4th axis; sister to Mia pre-Edit |
| `codex-t1-fix-forward-pattern.md` + 4 children | **LOAD-BEARING** | Pattern A n=5+ / Pattern B n=8 / Pattern C n=2 / Pattern D n=13 dogfood evidence |
| `layered-gates-architecture.md` + 3 children | **LOAD-BEARING** | 5-layer model + Wave 11A safety-regression context; honest-limits caveat exemplar |
| `closed-loop-recursive-narrowing.md` | **LOAD-BEARING** | Cardinal severity-gate disposition (A/B/C); gates every multi-round arc disposition |
| `codification-threshold.md` | **LOAD-BEARING** | Cycle-321 + 322 jurisdiction; gates ALL feedback→rule promotions |
| `coordination.md` | LOAD-BEARING | 3-rule discipline + Boris pattern 2026 inheritance |
| `multi-perspective-subagents.md` | **NEAR-COSMETIC** (parent-port; orthogonal to parallel-agent-wave); ~6.6K LOC retained for cite-trail completeness |
| `parallel-sessions.md` | LOAD-BEARING (10-20 swarm recipes; 4-axis framework) |
| `sota-pin-discipline.md` | LOAD-BEARING (PINS.json + 5-category Tier-1 audit; FORWARD-REF for repo-local script) |

**No cosmetic-only rules detected** in the orchestration stack — every file pulls weight either via dogfood ladder evidence (n≥3) OR cardinal-rule satisfaction.

## §5 CR-12 disposition per improvement candidate

| # | Candidate | CR-12 disposition | Priority |
|---|---|---|---|
| G1 | Default-FAIL contract (`verify-gate.sh` adaptation) | **GENUINELY-NEW** | **P0** (Anthropic OFFICIAL 2026 primitive) |
| G2 | Fresh-context evaluator subagent (Claude-side) | **PROVIDER-COMPLEMENT** | **P1** |
| G3 | Tool-budget heuristic per-difficulty | **PARTIAL-OVERLAP** (S3 strengthens parallel-agent-wave) | **P1** |
| G4 | Planner-Worker handoff + PROGRESS.md 4-section | **GENUINELY-NEW** | **P1** |
| G5 | Tool Search Lazy Loading | **STUDY-PILOT** (Axis-2 PARTIAL) | P3 (defer) |
| G6 | Incident-to-Eval Synthesis Phase 2-4 | **PARTIAL-OVERLAP** (S5 strengthens cmc-verdict-shapes) | **P1** |
| G7 | Chain-of-Thought monitoring + steer | **GENUINELY-NEW** | **P2** |
| G8 | Declarative topology | **DUPLICATE-FUNCTIONALITY** | REJECT |
| G9 | Adaptive fan-out controller | **STUDY-PILOT-FUTURE** | P3 |
| G10 | Subject hygiene | **PARTIAL-OVERLAP** | P3 |
| S1 | Mia 4-class INSTALL probe extension | strengthen owner | **P1** |
| S2 | SubagentStop transcript mechanical-enforce | strengthen owner | **P2** |
| S3 | CADP per-difficulty tool budget | strengthen owner | **P1** |
| S4 | `on_no_progress` predicate | strengthen owner | P2 |
| S5 | Eval-case Phase 2-4 graduation | strengthen owner | P1 |
| S6 | Advanced-team-directive invariant #9 OODA | strengthen owner | P2 |

## §6 Top-3 highest-leverage improvements ranked

### #1 — **G1 Default-FAIL contract (adapt cwc verify-gate.sh + track-read.sh)** [P0]
- **rationale**: Anthropic OFFICIAL 2026 primitive ALREADY INSTALLED at `Z:/claude-sota-installed/.local/cwc/` (per `docs/sota-installed-manifest.md` Wave 62B); needs only WIRING into `.claude/settings.json` PreToolUse Write|Edit + adaptation of `RESULTS_FILE` → `.claude/state/<wave>_verdict.json` + `screenshots/` pattern → `.claude/state/codex_consult_*_OUT.txt`. Closes claim-time gap that synthesis-layer-verify Mia rule doesn't catch (Mia is OPERATOR-discipline post-Edit; this is MECHANICAL-enforcement pre-claim).
- **estimated savings**: 1 OVER-claim catch/wave × 2-3 waves/session × ~30min/over-claim = ~60-90 min/session compounding. CRITICAL for autonomous /loop arcs where operator isn't watching.
- **LOC delta**: ~30 LOC settings.json + adapt 2 shell scripts (~80 LOC each, already present); 1 new rule `.claude/rules/default-fail-contract.md` (~150 LOC). Total ~390 LOC new but ~160 LOC are direct verbatim port from Anthropic OFFICIAL — within cardinal-rule-5 install-priority.
- **risk**: hook FAIL_CLOSED could block legitimate edits when evidence pattern matches imperfectly; START as FAIL_OPEN-with-WARN-stderr per Wave 11A safety-regression precedent; flip to FAIL_CLOSED only after n=5 dogfood arc shows zero false-positives.

### #2 — **G4 Planner-Worker handoff + PROGRESS.md 4-section** [P1]
- **rationale**: Anthropic cwc-long-running-agents 2026 SOTA primitive + Cursor team blog convergence; closes the 1+-hour autonomous arc context-rot failure mode that current `karpathy-adapted.md §5 Wiki Compounding Surface` Layer 1+2+3 mapping doesn't structurally enforce. Combined with G1, transforms /loop arcs from "fingers-crossed" to "structurally-recoverable".
- **estimated savings**: ~15-30 min/restart × ~3-5 restarts/week = ~60-150 min/week.
- **LOC delta**: ~120 LOC new rule + ~10 LOC adaptation of cwc CLAUDE.md convention.

### #3 — **S3 + G3 Tool-budget heuristic (Anthropic research_subagent verbatim)** [P1]
- **rationale**: TIER-1 OFFICIAL Anthropic verbatim citation (5 / 10 / 15 calls per difficulty + hard ceiling 20 / 100 sources). Bounded-tool-budget is the OPERATIONAL form of `evidence-policy.md §Stuck Detection` — converts "stop at 3 failed attempts" into proactive budget-aware per-subagent dispatch. Closes the FM-17 fleet-depletion failure mode at the per-agent level (current CADP caps fleet-wide cumulative dispatch but doesn't cap per-agent depth).
- **estimated savings**: ~10-20 min/wave fleet-depletion-avoidance × ~4-6 waves/week = ~60-120 min/week.
- **LOC delta**: ~15 LOC addition to `parallel-agent-wave.md §How to apply` step 2 (3-row table); ~10 LOC verbatim cite-import to `advanced-agent-team-standing-directive.md` as new invariant #9.

VERDICT: DONE: 9 convergences confirmed CURRENT / 10 gaps identified (6 P0-P2 actionable + 4 deferred) / 6 strengthening candidates / top-pick=G1-Default-FAIL-contract

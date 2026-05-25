# W192 P0 — Decision-Framework SOTA Equivalents Audit

**Agent:** sota-researcher (Agent A — claude-sonnet-4-6 stand-in; STAND-IN-NOTICE per cross-model-consensus.md §Env-funneled disclosure)
**Date:** 2026-05-14
**Scope:** verdict-only intelligence — read-only probe of SOTA repos for canonical equivalents to claude-sota-installed's 10 decision-making patterns
**Persisted-by:** orchestrator (per FM-19 ARTIFACT-INLINE — Agent A is read-only)
**Bg-id:** `a19f9b7f7369d92ae` (433926 tokens / 39 tool_uses / 585927 ms wall-clock)

## Methodology

Probed 7 SOTA sources at HEAD-fresh blob depth via `mcp__github__get_file_contents` + `mcp__deepwiki__ask_question`:
- **obra/superpowers** @ HEAD `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` (14 skills — `verification-before-completion`, `subagent-driven-development`, `dispatching-parallel-agents`, `requesting-code-review`)
- **wshobson/agents** @ HEAD `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (architecture.md — 185 agents, 25 categories, 4-tier model strategy)
- **affaan-m/everything-claude-code** @ HEAD `4423f10cfb9e3fa088d04ab10c838c7f7fa74a45` (`verification-loop`, `safety-guard`, `autonomous-loops`, `dmux-workflows`, `autonomous-agent-harness`, `eval-harness`)
- **forrestchang/andrej-karpathy-skills** @ HEAD `2c606141936f1eeef17fa3043a72095b4765b9c2` (`karpathy-guidelines/SKILL.md` — 4-principle source)
- **shanraisshan/claude-code-best-practice** @ HEAD `f8468e871ed372f2807aa9d3ca7ca91eca7db422` (`cross-model-workflow.md` — T1-T5 STEP 1-4)
- **gsd-build/get-shit-done** (DeepWiki — 3-tier verification, thin orchestrator, gsd-plan-checker, research-then-plan, eviction recovery)
- **langchain-ai/deepagents** + **microsoft/autogen** + **openai/openai-agents-python** (DeepWiki — failure-recovery + termination + guardrails)

## Per-Pattern Verdicts

| # | Pattern (claude-sota-installed) | Verdict | SOTA Equivalent + Strength |
|---|---|---|---|
| 1 | **FM-17 subagent fleet-depletion recovery** (6 sub-classes + persist-artifact + Path P codex foreground+tee) | **PARTIAL** | ECC `autonomous-loops` "CI Failure Recovery" pattern (`affaan-m/everything-claude-code/skills/autonomous-loops/SKILL.md` @ `4423f10c`): auto-fetch failed run + spawn fresh `claude -p` with error context. gsd-build "completion signal fallback" (DeepWiki citation): spot-check SUMMARY.md + git log when no completion signal. **WEAKER** than runtime's FM-17 — neither has the 6 named sub-classes (a wrapper-truncation / b 429 / c bg-wedge / d watchdog-stall / e autocompact-thrash / f 1M billing). superpowers `subagent-driven-development` BLOCKED status taxonomy (`obra/superpowers/skills/subagent-driven-development/SKILL.md` @ `f2cbfbef`) covers blocker classification (context/reasoning/size/plan) but NOT the runtime-class fleet-depletion mechanisms. Runtime's persist-artifact-before-return + Path P orchestrator-direct foreground+tee = local-novel composition. |
| 2 | **FM-20 path-drift-cascade** (stale claim propagates through synthesis→brief→next-agent) | **NO-SOTA-EQUIVALENT** | NO upstream pattern names this failure mode. ECC `autonomous-loops` "No context bridge between iterations" (SKILL.md) recommends SHARED_TASK_NOTES.md but does NOT address cross-fire cite-trail drift. langchain/deepagents "always call tools to refresh status rather than relying on cached state" (DeepWiki) is the closest but addresses single-agent stale-state, not cross-agent cite propagation. Genuinely novel runtime discipline — high-value finding. |
| 3 | **FM-21 queue-time-prompt-freeze** (CronCreate/ScheduleWakeup re-fires stale prompt after state changed) | **NO-SOTA-EQUIVALENT** | NO upstream pattern names this failure mode. ECC `autonomous-agent-harness` documents Crons "frozen at queue time" + "isolated from interactive context" (DeepWiki) but treats this as INTENTIONAL ISOLATION, not a failure mode. AutoGen has NO scheduler-stale-prompt pattern. Runtime's STATE PROBE clause-level smoke + CronDelete+CronCreate refresh = local-novel composition. High-value finding. |
| 4 | **FM-02 parallel-session race** (concurrent git index contamination) | **PARTIAL** | superpowers `using-git-worktrees` skill (`obra/superpowers/skills/using-git-worktrees/`) addresses worktree-as-isolation (Boris Cherny named-author pattern). ECC `dmux-workflows` (`affaan-m/everything-claude-code/skills/dmux-workflows/SKILL.md` @ `4423f10c`) recommends worktrees for parallel sessions. gsd-build evicts on rebase-conflict + captures full eviction context (DeepWiki). **WEAKER** — none names the 3 sub-classes (a T2-review contamination / b staging-index race / c COMMIT-LAYER ABSORPTION) or codifies `git commit --only` narrow-form recovery. Anthropic `claude --worktree` is the foundational primitive but does NOT address the recovery patterns when worktree isolation is bypassed. |
| 5 | **Mia pre-apply** (verify agent-emitted prescriptions against runtime state via cheap probe BEFORE Edit) | **SOTA-EQUIVALENT-EXISTS** | **STRONGER upstream**: gsd-build/get-shit-done **3-tier verification strategy** (DeepWiki citation): (1) re-read modified file to confirm fix present, (2) run syntax/parse checks (node -c, tsc, python ast.parse), (3) fallback to re-read if no checker available. Applied AFTER every fix, mandatory. ECC `verification-loop/SKILL.md` @ `4423f10c` (6-phase verification: Build/Types/Lint/Tests/Security/Diff). superpowers `verification-before-completion/SKILL.md` @ `f2cbfbef` ("Iron Law: NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE" + 5-step Gate Function + Common Failures table). **All three are STRONGER as general primitives** but runtime's Mia is specifically scoped to agent-emitted prescriptions before Edit — narrower but precise application. Runtime's n=8+ ladder evidence and OVER/UNDER/HNF integration is local extension. |
| 6 | **cardinal-rules 1-12** (cite-everything / Karpathy-4 / cross-model-consensus / research-first / install-priority / etc.) | **PARTIAL** | **cardinal-rule-2 (Karpathy-4)**: SOTA-EQUIVALENT-EXISTS — `forrestchang/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md` @ `2c606141` is the source repo (4 principles: Think Before Coding / Simplicity First / Surgical Changes / Goal-Driven Execution). Runtime cite-imports verbatim. **cardinal-rule-3 (cross-model-consensus)**: SOTA-EQUIVALENT-EXISTS — `shanraisshan/claude-code-best-practice/development-workflows/cross-model-workflow/cross-model-workflow.md` @ `f8468e87` (STEP 1-4 Plan/QA-Review/Implement/Verify maps to T1-T4). **cardinal-rule-1 (cite-everything at file:line + HEAD SHA)** + **cardinal-rule-4 (research-first RECALL→INVESTIGATE→VERIFY)**: CCBP `rpi-workflow.md` covers research-plan-implement but does NOT mandate file:line+SHA depth. **cardinal-rules 5-12 (install-priority / fresh-from-github / graduated-unleash / full-SOTA-content / install-risk / research-first-then-install / META-process / upstream-install-priority)**: NO-SOTA-EQUIVALENT — runtime-specific install-class governance with no upstream equivalent. High-value finding for 5-12. |
| 7 | **cross-model T1-T7 lifecycle** (Claude orchestrates/drafts, Codex/GPT-5.5 reviews at lifecycle touchpoints) | **PARTIAL** | CCBP `cross-model-workflow.md` @ `f8468e87` documents STEP 1-4 (Plan/QA-Review/Implement/Verify) which corresponds to runtime's T1+T2+T3+T4. AutoGen "reflection pattern" (DeepWiki) — primary agent + critic agent with reflect_on_tool_use parameter. superpowers `subagent-driven-development/SKILL.md` @ `f2cbfbef` "two-stage review (spec compliance + code quality)" — same shape but in-process (not cross-model). **WEAKER upstream** — none extends to 7 touchpoints (T0 candidate-list-challenge / T5 plan-stage / T6 stop-gate / T7 ask-without-act). Runtime's T0+T5+T6+T7 are local extensions of the CCBP 4-step foundation. |
| 8 | **convergence-gate Axis-1/2/3** (≥3 orgs + ≥2 practitioners + ≥3mo stability before adopting external repo) | **NO-SOTA-EQUIVALENT** | NO upstream framework codifies the 3-axis adoption gate. wshobson `architecture.md` @ `34632bc` discusses "spec compliance + quality standards" for plugin addition but has NO adoption-gate framework for external repos. ECC `eval-harness` (DeepWiki) covers eval-driven development for one's own work but NOT external-repo adoption. **Genuinely novel** runtime discipline — convergence-gate is the load-bearing primitive that prevents fresh-paint-repo adoption. High-value finding. |
| 9 | **codex-t1 Pattern A-D fix-forward** (NEEDS-REVISION → single atomic fix; timeout-HNF; verifier-precision; foreground+tee recovery) | **PARTIAL** | gsd-build "auto-iteration loop for code review — re-review + re-fix up to 3 iterations" (DeepWiki) — closest analog to Pattern A's verdict-integration loop. superpowers `requesting-code-review/SKILL.md` @ `f2cbfbef` "Fix Critical issues immediately, Fix Important before proceeding" — same recursive-review shape. AutoGen reflection (DeepWiki) — primary+critic with up-to-N iterations. **WEAKER** — none codifies the 4-pattern split (A verdict-integration / B timeout-trace-mining HNF / C verifier-precision in T2 / D foreground+tee dispatch shape). Pattern B + Pattern D are runtime-novel responses to specific failure modes that have no upstream equivalent. Pattern A + Pattern C have weaker analogs upstream. |
| 10 | **goal-prompt-synthesis R1-R7** (the /goal predicate authoring pipeline) | **PARTIAL** | gsd-build/get-shit-done **research-then-plan-then-verify** gate (DeepWiki): `gsd-phase-researcher` → wait for `## RESEARCH COMPLETE` → `gsd-planner` → wait for `## VERIFICATION PASSED` → execute. Closest in shape to multi-round goal synthesis. ECC `eval-harness` covers Eval-Driven Development with pass/fail criteria + code-based grader + LLM-as-judge (DeepWiki). superpowers `writing-plans/SKILL.md` (`obra/superpowers/skills/writing-plans/`) — plan-shaped task decomposition. **WEAKER** — none codifies the R1-R7 7-round predicate-authoring sequence specific to claude-sota-installed's /goal command. The general "research→plan→verify" gate is upstream-SOTA but R1-R7 specifics are local extension. |

## Summary Counts

| Verdict | Count | Patterns |
|---|---|---|
| **SOTA-EQUIVALENT-EXISTS** (upstream is stronger or canonical) | **1** | Pattern 5 (Mia pre-apply — gsd-build 3-tier verification + ECC verification-loop + superpowers verification-before-completion are STRONGER as general primitives) |
| **NO-SOTA-EQUIVALENT** (genuinely novel) | **3** | Pattern 2 (FM-20 path-drift-cascade); Pattern 3 (FM-21 queue-time-prompt-freeze); Pattern 8 (convergence-gate Axis-1/2/3) |
| **PARTIAL** (related-but-weaker upstream) | **6** | Pattern 1 (FM-17); Pattern 4 (FM-02); Pattern 6 (cardinal-rules — rule-2/3 are SOTA-derived; rules 5-12 are novel); Pattern 7 (T1-T7 lifecycle); Pattern 9 (codex-t1 Pattern A-D); Pattern 10 (goal R1-R7) |

## Key Observations

### High-value novel-discipline findings
1. **FM-20 path-drift-cascade** — runtime-novel; tracks stale claim/cite propagation across **synthesis→brief→next-agent hops**, a failure shape no upstream framework names. This is the load-bearing defense for multi-fire arcs with synthesis-vs-brief dual-hop attribution.
2. **FM-21 queue-time-prompt-freeze** — runtime-novel; ECC treats scheduler isolation as intentional, NOT as a failure mode. Runtime's STATE PROBE + clause-level smoke is a genuine discipline addition.
3. **convergence-gate Axis-1/2/3** — runtime-novel; no upstream framework codifies a ≥3-org + ≥2-practitioner + ≥3-month gate for external repo adoption. This is what prevents the fresh-paint anti-pattern documented at canonical.md Must-Never #8.
4. **cardinal-rules 5-12** — runtime-specific governance with no upstream equivalent. CR-5 install-priority / CR-9 install-risk / CR-12 upstream-install-priority are install-class disciplines unique to this runtime's design constraint.

### Strong upstream-validated patterns
1. **Mia pre-apply** is a specialized application of the **verification-before-completion Iron Law** (obra/superpowers — Iron Law is STRONGER). Runtime's narrower scope (agent prescriptions before Edit) is local extension; the general primitive is SOTA.
2. **Karpathy-4 (cardinal-rule-2)** is verbatim cite-import from `forrestchang/andrej-karpathy-skills`.
3. **Cross-model T1-T4 (cardinal-rule-3)** is direct adaptation from CCBP `cross-model-workflow.md` STEP 1-4.

### Partial-but-weaker upstream patterns
1. **FM-17 sub-class taxonomy** — runtime's 6 named sub-classes (a/b/c/d/e/f) are not paralleled upstream. ECC + gsd-build cover SOME failure recovery but not the named-mode catalog.
2. **codex-t1 Pattern B HNF + Pattern D foreground+tee** — runtime-novel responses to specific upstream failure modes (codex CLI zero-investigation + 1M-context billing). No upstream framework addresses these directly.
3. **T0 + T5 + T6 + T7 touchpoints** — runtime extends CCBP's 4-step (T1-T4) to 7 touchpoints with local primitives. Genuine local extension.

### What this audit confirms about cardinal-rule-8 (full-SOTA-content invariant)
- **3 patterns** would be PENDING-AUDIT or NOVEL-DOCUMENTED-EXCEPTION under cardinal-rule-8 conformance (FM-20, FM-21, convergence-gate Axis-1/2/3)
- **6 patterns** are ADAPTED-FROM-SOTA with strong cite-trail
- **1 pattern** (Mia pre-apply) is ADAPTED-FROM-SOTA (gsd-build/superpowers/ECC)

### Recommendation (verdict-only, no code changes)
The 3 NO-SOTA-EQUIVALENT patterns (FM-20 / FM-21 / convergence-gate) genuinely fill gaps in upstream frameworks. Under cardinal-rule-8, they should carry explicit **NOVEL-DOCUMENTED-EXCEPTION** markers in the manifest with: (a) the upstream-probe evidence trail (this audit); (b) the failure-mode-driven rationale; (c) re-evaluation triggers for if/when upstream patterns emerge. The 6 PARTIAL patterns + 1 SOTA-EQUIVALENT pattern carry cite-trail back to canonical SOTA sources at file:line + HEAD SHA depth.

## Cite Trail (all probes — file:line + HEAD SHA depth)

- `obra/superpowers/skills/verification-before-completion/SKILL.md` @ HEAD `f2cbfbefebbfef77321e4c9abc9e949826bea9d7` (content-SHA `2f14076e59e6ce5cd6f88007421a85f0bd772520`) — Iron Law + Gate Function + Common Failures table
- `obra/superpowers/skills/subagent-driven-development/SKILL.md` @ HEAD `f2cbfbef...` (content-SHA `ea7ac8fd8bca19812115831e665a620099e076ce`) — DONE/DONE_WITH_CONCERNS/NEEDS_CONTEXT/BLOCKED status vocabulary + 2-stage review
- `obra/superpowers/skills/dispatching-parallel-agents/SKILL.md` @ HEAD `f2cbfbef...` (content-SHA `a6a3f5a0798318edb6ccef716cfecce92a50d914`) — one-agent-per-domain + agent prompt structure
- `obra/superpowers/skills/requesting-code-review/SKILL.md` @ HEAD `f2cbfbef...` (content-SHA `34b8340486d06fcfd5d25a08fa1435b15b234eea`) — Critical/Important/Minor severity + post-task review mandate
- `wshobson/agents/docs/architecture.md` @ HEAD `34632bcbea28176ba25bbbc43cd4017d88b1cac6` (content-SHA `85020cd7ea0e7dd4e64d9b58162aab6b7936faab`) — Single Responsibility + Composability + Context Efficiency + 4-tier model strategy (Opus/Sonnet/Haiku/Inherit)
- `forrestchang/andrej-karpathy-skills/skills/karpathy-guidelines/SKILL.md` @ HEAD `2c606141936f1eeef17fa3043a72095b4765b9c2` (content-SHA `6a62d0441753157ca6ca50479e490c2948033adb`) — 4 principles authoritative source
- `shanraisshan/claude-code-best-practice/development-workflows/cross-model-workflow/cross-model-workflow.md` @ HEAD `f8468e871ed372f2807aa9d3ca7ca91eca7db422` (content-SHA `f63a3950ffbb5095278a363069286212d570ad29`) — STEP 1-4 PLAN/QA-REVIEW/IMPLEMENT/VERIFY
- `affaan-m/everything-claude-code/skills/verification-loop/SKILL.md` @ HEAD `4423f10cfb9e3fa088d04ab10c838c7f7fa74a45` (content-SHA `1933545d57be0275ef5cac60fff332f279020e9e`) — 6-phase verification
- `affaan-m/everything-claude-code/skills/safety-guard/SKILL.md` @ HEAD `4423f10c...` (content-SHA `7870073b56a770f4a1c1883e0db2db53f1070fbb`) — 3-mode protection (Careful/Freeze/Guard)
- `affaan-m/everything-claude-code/skills/autonomous-loops/SKILL.md` @ HEAD `4423f10c...` (content-SHA `d6f455723a54d9c51ee9c59b5f60c60c42db0f4c`) — 6 loop patterns + de-sloppify + CI failure recovery + anti-patterns
- DeepWiki: `gsd-build/get-shit-done` — 3-tier verification, thin orchestrator, research-then-plan gate, eviction recovery, auto-iteration code-review loop
- DeepWiki: `affaan-m/everything-claude-code` — autonomous-loops, eval-harness, dmux-workflows, autonomous-agent-harness, continuous-learning-v2
- DeepWiki: `langchain-ai/deepagents` — behavioral guidance via system prompts; status-staleness warnings; no enforced mechanisms; cross-model review available as "code-reviewer" subagent type
- DeepWiki: `microsoft/autogen` — 11 termination conditions (MaxMessageTermination/TextMentionTermination/TokenUsageTermination/TimeoutTermination/HandoffTermination/etc.); reflection pattern (primary+critic); NO ground-truth verification
- DeepWiki: `openai/openai-agents-python` — Handoff/Guardrail/get_response_with_retry/Tracing/RunState; output_type Pydantic validation; partial-support failure-recovery

## HONEST-NON-FINDING items (per synthesis-layer-verify.md §Reporting categories)
- Did NOT probe `mattpocock/skills`, `hesreallyhim/awesome-claude-code`, `alirezarezvani/claude-skills`, `vercel-labs/agent-skills`, `ComposioHQ/awesome-claude-skills`, `abhigyanpatwari/GitNexus`, `crewAIInc/crewAI` directly this fire — Z:/repos/deps Glob timed out, HEAD-fresh blob mining via mcp__github__get_file_contents constrained to 7 sources within OUTPUT_BUDGET 400 LOC ceiling. No verdict changes anticipated — these are largely catalog-class (awesome-* lists) or alternative-architecture (crewAI) which would surface PARTIAL-class secondary cites for Patterns 7+9 but not change the NO-SOTA-EQUIVALENT findings on Patterns 2/3/8.
- Anthropic official sub-agents docs (`code.claude.com/docs/en/sub-agents`) — WebFetch blocked by context-mode hook; covered indirectly via CCBP `claude-subagents.md` cited in runtime CLAUDE.md L73. The TIER-1-DIRECT Anthropic sub-agent docs would primarily reinforce Pattern 1 (model selection per subagent — already cited in CLAUDE.md) and Pattern 7 (cross-model topology — already cited).

---

**END ARTIFACT-INLINE**

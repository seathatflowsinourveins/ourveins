# W258r16 — Adversarial Architecture Critique (2026-05-16)

> Reviewer: software-architect (adversarial). Sources: W258 r1-r8 evidence files. Verdict-class: TIER-3-LOCAL-COMPOSITION.

## TOP-3 ARCHITECTURAL CONCERNS

### C1 — L7+L6+L5 stack-stuffing for a 1-agent-at-a-time operator (over-engineering)

L7 multica kanban exists to coordinate **3+ concurrent agents across heterogeneous CLIs** (CC + Codex + Copilot + OpenCode). The brief states "Single-developer running 1 agent at a time." That is a kanban-for-zero-coordination-load. W258r6 §3 flags multica + Geoffrey-Litt independent convergence on the *shape* — **shape convergence is not need convergence**. Worse: L5 OpenHands (Docker-isolated SWE-bench scaffold at 68.4%) is a competitor scaffold to CC, not an augmentation. Operator already runs Opus 4.7 inside CC at 87.6% (W258r5 §1). Installing the 68.4% scaffold to replace the 87.6% native path is a *regression*, not augmentation. L6 Archon is explicitly tagged "pattern-cite, not install" — yet it appears as a layer. A non-installed layer is not a layer; it is a reading list.

### C2 — Observability/eval triple-overlap (Phoenix + Langfuse + Promptfoo) violates DRY

W258r4/r5 list all three as "Reference/selective tools." Phoenix already covers OTel-trace + eval. Langfuse adds production OTel + Postgres + ClickHouse + a second :3000 port collision with OpenHands UI. Promptfoo adds regression eval that Phoenix's experiment runner already does. Three stores, three UIs, three retention policies, **one developer**. The proposal does not specify the unique workload Langfuse handles that Phoenix cannot (round-7 §3 hobbyist-vs-production divergence is acknowledged but unresolved). Decision-class: pick ONE eval store; the other two are dead weight that will rot.

### C3 — Cross-model proxy duplication + Windows-portable regression risk

Operator already has **codex CLI installed + `openai-codex` plugin** (W258 §5 explicit). LiteLLM exists to abstract provider choice for code that calls many LLMs — operator's runtime calls Opus 4.7 (CC) and GPT-5.5 (codex exec, Path P). Both paths are already cross-model. LiteLLM adds a pip-or-Docker sidecar with **no new capability** the operator's Path P cross-model-consensus pattern lacks. Worse: prior `codex_review_HEAD_18fdbf0f.txt` no-ship verdict explicitly flagged "Z:/-absolute-path hook commands" as a portability bug. Six new installs across Docker + npm + bun + pip multiply that surface — each can re-introduce the same class of regression unless every command path is env-derived.

## TOP-3 SIMPLIFICATIONS

### S1 — Collapse L7+L6+L5 into L4-only with skills (saves Docker + bun + Go-Postgres-Next)

Use the **already-installed 37 plugins** for harness behaviour: `superpowers:writing-plans`, `engineering-skills:senior-architect`, `agent-teams:team-feature` give planning + multi-reviewer parallelism without new servers. Cite Archon's ralph-dag *pattern* in CLAUDE.md as a discipline reference, not an install. Defer multica until concurrent agents become a real, measured load.

### S2 — Pick ONE observability store; defer the other two

Keep **Phoenix only** (already in `.mcp.json`). Reject Langfuse + Promptfoo until a documented eval failure mode hits production. Per W216 verdict, langfuse was INSTALL-NOW for `claude-sota-pure` — that runtime, not this install-only baseline. Cardinal-rule-1 (trusted plugins/skills only) plus cardinal-rule-9 (install-risk discipline) both bite here.

### S3 — Strangler-fig via reversibility-budget, not parallel-stack

Replace the 8-layer install with a **single-install-per-wave gate**: install one component, measure, fall back if no win in 1 week. Each install MUST have a documented revert (env-var comment-out per ENV-block (h)/(i)/(j) precedent). Bun + Docker + ClickHouse + Postgres + Go are NOT 1-minute-revertible.

## MISSED REQUIREMENTS

- No **local-dev debugging loop** layer (only production observability).
- No **secret-management** (`.env` proliferation across 6 services unmodeled).
- No **port-allocation map** (OpenHands :3000 vs Langfuse :3000 collide).
- No **cost-ceiling** for the LLM proxy path (LiteLLM can fan out to paid APIs silently).

## VERDICT

**ARCHITECTURE-OVER-BUILT** — convergence evidence shows shape, not operator-fit. Cardinal-rule-9 reversibility + cardinal-rule-1 trusted-plugins favor a 2-install delta (Langfuse OR Promptfoo + claude-code-action) over an 8-layer rebuild. Adopt incrementally; reject the stack as a single commit.

# W436-AGENT-TEAM-SOTA — Integration Map (SOTA install primitive -> orchestration capability)

> Cross-reference: which SOTA install primitive ships which agent-orchestration capability. Generated 2026-05-24 in worktree `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/`.

## Primitive lookup

| # | SOTA primitive | Install location | Provides | License | Verified 2026-05-24 |
|---|---|---|---|---|---|
| 1 | agent-teams plugin v1.0.2 | `.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/` | `/team-spawn`, `TeamCreate` API, mailbox `SendMessage`, 7 presets | MIT (Seth Hobson) | YES (manifest read) |
| 2 | superpowers:dispatching-parallel-agents v5.1.0 | `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/dispatching-parallel-agents/` | Agent fan-out pattern + decision diagram | MIT (obra) | YES (SKILL.md read) |
| 3 | superpowers:subagent-driven-development v5.1.0 | `.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/subagent-driven-development/` | Fresh-subagent-per-task + two-stage review (spec then quality) | MIT (obra) | YES (SKILL.md read) |
| 4 | ai@pydantic-skills v0.1.0 (building-pydantic-ai-agents) | `.claude/plugins/cache/pydantic-skills/ai/0.1.0/skills/building-pydantic-ai-agents/` | Typed agent contracts + Pydantic AI patterns | MIT (Pydantic) | YES (cache present) |
| 5 | math-olympiad plugin | `.claude/settings.json:enabledPlugins["math-olympiad@claude-plugins-official"]=true` (install-pending, cache not yet populated per W434 INSTALL queue) | Adversarial verification pattern | MIT (Anthropic) | enabled-not-cached |
| 6 | engineering plugin (knowledge-work-plugins) | `.claude/settings.json:enabledPlugins["engineering@knowledge-work-plugins"]=true` (install-pending) | Engineering-workflow skills | MIT (Anthropic) | enabled-not-cached |
| 7 | context7 plugin | `.claude/settings.json:enabledPlugins["context7@claude-plugins-official"]=true` | Up-to-date docs MCP surface (Upstash) | MIT (Upstash) | enabled |
| 8 | sequential-thinking MCP server | (planned W434-INSTALL-L2) | Multi-step planning before fan-out | MIT (Anthropic) | install-pending |
| 9 | codex@openai-codex plugin v1.0.4 | `.claude/plugins/cache/openai-codex/codex/1.0.4/` | Cross-model consensus via GPT-5.5 | OpenAI | YES (per CLAUDE.md L9) |
| 10 | parallel-dispatch-mandate local skill | `.claude/skills/parallel-dispatch-mandate/SKILL.md` | W269 enforcement (2+-Agent-in-1-message) | (local) | YES (anchor cite) |
| 11 | dispatching-parallel-agents-w321-fork local skill | `.claude/skills/dispatching-parallel-agents-w321-fork/SKILL.md` | Vendor-fork adding skeleton-write + context-budget caps + position-swap audit | (local) | YES |
| 12 | mcp-agent-patterns local skill | `.claude/skills/mcp-agent-patterns/SKILL.md` | lastmile-ai mcp-agent topology catalog (Router/ParallelLLM/Orchestrator/Evaluator-Optimizer/MCPAggregator) | (local) | YES |
| 13 | wait-agent local skill | `.claude/skills/wait-agent/SKILL.md` | Non-blocking first-completion / N-of-M join after dispatch | (local) | YES |
| 14 | empty-final-message-guard local skill | `.claude/skills/empty-final-message-guard/SKILL.md` | Delta-G49 empty-completion fail-CLOSED on collection | (local) | YES |
| 15 | worker-failure-termination-guard local skill | `.claude/skills/worker-failure-termination-guard/SKILL.md` | Delta-G50 worker-exception fail-CLOSED | (local) | YES |
| 16 | agent-team-sota (NEW W436) | `.claude/skills/agent-team-sota/SKILL.md` | THIS WAVE — dispatch-side decision skill | (local) | YES (created W436) |

## Capability -> primitive matrix

| Capability you want | Use primitive | And these helpers |
|---|---|---|
| Spawn a team with `/team-spawn <preset>` | #1 agent-teams plugin | `tools/agent-team-helpers.ps1` `Start-AgentTeam` |
| Decide between team-spawn and bare fan-out | #16 agent-team-sota skill | (decision diagram inside SKILL.md) |
| Enforce 2+ Agent calls in 1 message | #10 parallel-dispatch-mandate | `tools/preagent-parallel-guard.mjs` |
| Add skeleton-write + position-swap audit to fan-out | #11 dispatching-parallel-agents-w321-fork | (in-skill discipline) |
| Coordinate worker mailbox | #1 agent-teams team-lead.md | `SendMessage` tool |
| Run two-stage review (spec then quality) | #3 superpowers:subagent-driven-development | (in-skill prompt templates) |
| Adversarial verification (dual derivation) | #5 math-olympiad (when installed) | `dual-review` skill (cross-model variant) |
| Cross-model consensus (Claude + GPT-5.5) | #9 codex plugin + `dual-review` skill | `/codex:review`, `/codex:adversarial-review` |
| Non-blocking join on N agents | #13 wait-agent skill | (in-skill polling pattern) |
| Catch empty-completion teammate | #14 empty-final-message-guard | (auto-fires on collection) |
| Catch failed-with-exception teammate | #15 worker-failure-termination-guard | (auto-fires on failure notification) |
| Typed agent contracts | #4 ai@pydantic-skills | building-pydantic-ai-agents SKILL.md |
| Up-to-date library docs in agent context | #7 context7 plugin | MCP `mcp__context7__*` tools |
| Plan-then-fan-out | #8 sequential-thinking MCP (when installed) | sequential_thinking tool then fan-out |
| List active teams | `Get-ActiveAgentTeams` helper | `tools/agent-team-helpers.ps1` |
| Snapshot team state | `Get-AgentTeamReport` helper | `tools/agent-team-helpers.ps1` |
| Verify env + plugin cache | `Test-AgentTeamRuntime` helper | `tools/agent-team-helpers.ps1` |

## Sibling-skill non-overlap audit (W331 axis-1 #6 R1 floor)

The new skill `agent-team-sota` was authored with the following overlap budget:

| Sibling skill | Triggers | Overlap with agent-team-sota? | Mitigation |
|---|---|---|---|
| parallel-dispatch-mandate | "audit", "review", "fan-out", "in parallel", "Stream A/B/C", "investigate" | LOW (~10%) — sibling focuses on HOW-MANY-CALLS rule; agent-team-sota focuses on dispatch-mode choice | description-block explicitly differentiates |
| dispatching-parallel-agents-w321-fork | "2+ independent tasks", "parallel agent dispatch", "skeleton-first" | LOW (~15%) — sibling focuses on QUALITY-DISCIPLINE for ad-hoc fan-out | description-block calls out non-overlap |
| mcp-agent-patterns | "agent-workflow topology", "fan-out vs orchestrator vs router", "MCP-server-aggregation" | LOW (~20%) — sibling is mcp-agent (lastmile-ai) lib-specific pattern catalog | distinct topology vocabulary |
| wait-agent | "wait for agents", "wait_agent", "collect when ready", "first-completed" | NONE — sibling is CONSUME-side after dispatch | sequential composition, not overlap |
| empty-final-message-guard | "synthesize results", "collect findings", "merge teammate outputs" | NONE — sibling is COLLECTION-validation | sequential composition |
| worker-failure-termination-guard | "task FAILED", "subagent exception", "agent crashed" | NONE — sibling is EXCEPTION-handling | sequential composition |
| orchestrate-issue-to-pr | "issue to PR", "ship this issue", "implement issue end-to-end" | LOW (~5%) — sibling is sequential-pipeline for issue-to-merge | distinct entry-point |
| autoship-orchestration | "auto-ship", "ship pipeline", "full automative workflow" | LOW (~5%) — sibling is LAUNCH-side after branch ready | distinct stage |

**Verdict**: max overlap 20% (with mcp-agent-patterns); R1 floor 50% NOT exceeded.

## Cite-anchor floor (>=3 distinct orgs) audit

| Cite | Org | Anchor |
|---|---|---|
| 1 | Anthropic | claude-cookbooks @ 39a350b6 `research_lead_agent.md:135-137` |
| 2 | Anthropic | docs.anthropic.com/en/docs/claude-code/sub-agents |
| 3 | Anthropic | code.claude.com/docs/en/sub-agents |
| 4 | Anthropic | knowledge-work-plugins (math-olympiad upstream) |
| 5 | GitHub / Seth Hobson | agent-teams@1.0.2 MIT |
| 6 | GitHub / obra | superpowers@5.1.0 MIT |
| 7 | OpenAI | codex@openai-codex plugin v1.0.4 |
| 8 | Pydantic | ai@pydantic-skills v0.1.0 |
| 9 | Upstash | context7 plugin |
| 10 | lastmile-ai | mcp-agent library (cite via mcp-agent-patterns sibling) |
| 11 | NIST | SP 800-218 PW.7 + RV.1 (independent verification SDLC) |
| 12 | bytedance | deer-flow planner-worker pattern (architecture-reference) |

**Distinct orgs**: Anthropic + GitHub + OpenAI + Pydantic + Upstash + lastmile-ai + NIST + bytedance = **8 distinct orgs**, well above the >=3 floor.

## Cite-anchor URL-set (sca-v13 W352-S9 hook visibility)

Each cite below has a verifiable URL anchor so the cite-floor pre-commit hook can count distinct orgs.

- Anthropic claude-cookbooks: https://github.com/anthropics/claude-cookbooks
- Anthropic sub-agents docs: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Anthropic code.claude.com: https://code.claude.com/docs/en/sub-agents
- Anthropic knowledge-work-plugins (math-olympiad): https://github.com/anthropics/knowledge-work-plugins
- wshobson agent-teams: https://github.com/wshobson/agent-teams
- obra superpowers: https://github.com/obra/superpowers
- OpenAI codex: https://openai.com/codex
- OpenAI platform: https://platform.openai.com/docs/guides/agents
- Pydantic ai: https://ai.pydantic.dev/
- Pydantic AI repo: https://github.com/pydantic/pydantic-ai
- Upstash context7: https://context7.com/
- Upstash docs: https://upstash.com/docs/context7
- NIST SSDF: https://csrc.nist.gov/projects/ssdf
- NIST publication: https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf
- bytedance deer-flow: https://github.com/bytedance/deer-flow
- lastmile-ai mcp-agent: https://github.com/lastmile-ai/mcp-agent

## Deliverable cross-references

| Deliverable | Location |
|---|---|
| Local skill | `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/.claude/skills/agent-team-sota/SKILL.md` |
| Pattern catalog | `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/docs/architecture/W436-AGENT-TEAM-SOTA/ORCHESTRATION-PATTERNS.md` |
| PowerShell helpers | `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/tools/agent-team-helpers.ps1` |
| Integration map (this file) | `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/docs/architecture/W436-AGENT-TEAM-SOTA/INTEGRATION-MAP.md` |
| Wave-lock | `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/.claude/state/wave-lock-W436.json` |

# W436-AGENT-TEAM-SOTA — Orchestration Pattern Catalog

> Generated 2026-05-24 for wave W436. Operator mandate: "experimental agent team, advanced agent orchestration from sota install repos".
>
> Cite-anchors are reproducible against the local plugin cache at `Z:/claude-sota-installed/.claude/plugins/cache/` unless otherwise noted. Upstream Anthropic cite-anchors are at the commit SHAs given inline.

## Pattern matrix overview

| # | Pattern | Topology | Best for | Cite-anchor (primary) |
|---|---|---|---|---|
| 1 | Parallel fan-out | flat (N workers, 0 lead) | independent investigations, no cross-talk | Anthropic cookbook `research_lead_agent.md` |
| 2 | Team-lead + workers | star (1 lead, N workers, mailbox) | file-ownership feature work | agent-teams `team-lead.md` |
| 3 | Adversarial verification | dual (worker + verifier) | high-stakes correctness | math-olympiad upstream knowledge-work-plugins |
| 4 | Two-stage review | sequential (impl -> spec-rev -> quality-rev) | implementing tasks per a plan | superpowers `subagent-driven-development/SKILL.md` |
| 5 | Cross-model consensus | dual-model (Claude + GPT-5.5 codex + tie-break) | architecture / security decisions | Anthropic sub-agents docs + codex plugin |
| 6 | Sequential-thinking + parallel-fan-out | plan-then-fan-out | non-trivial coordination requiring upfront plan | Anthropic `sequential-thinking` MCP + research_lead_agent.md |

---

## Pattern 1: Parallel fan-out (W269 mandate)

### Topology

```
Orchestrator (you)
     |
     +--> Agent_1 (worker, isolated context)
     +--> Agent_2 (worker, isolated context)
     +--> Agent_3 (worker, isolated context)

  all 3 dispatched in ONE assistant message
  (no shared state, no cross-talk)
```

### When to use

- 2+ independent investigations / audits / reviews / research questions
- No shared state between workers
- No need for one worker to read another's findings mid-flight
- Worker count <= 5 (per W350 META-AUDIT cognitive + token cap)

### Example invocation pseudocode

```text
# In ONE assistant message, emit N Agent tool calls:
Agent(subagent_type="general-purpose", prompt="Audit module A for OWASP A03 ...")
Agent(subagent_type="general-purpose", prompt="Audit module B for OWASP A03 ...")
Agent(subagent_type="general-purpose", prompt="Audit module C for OWASP A03 ...")
# Then in your NEXT assistant turn, all 3 results arrive and you synthesize.
```

### Cite-anchor

Anthropic claude-cookbooks @ `39a350b6790c132337dcc3ec35240728fcc1dc0e` path `patterns/agents/prompts/research_lead_agent.md:135-137` ships an explicit `<use_parallel_tool_calls>` MUST-block that mandates this topology. The W269 mandate in this runtime's CLAUDE.md is the local-binding restatement.

### Failure modes

| FM | Symptom | Mitigation |
|---|---|---|
| FM1.a | Serial Agent dispatch (1 call per message) | Pre-Agent guard `tools/preagent-parallel-guard.mjs` flags 2nd violation with `exit 2`. Use 1st violation as a warning, fix on 2nd. |
| FM1.b | Worker context inheritance pollution | NEVER pass `CLAUDE_CODE_FORK_SUBAGENT=1` AND a stuffed prompt; choose isolated-context (default) and construct exact context the worker needs. |
| FM1.c | Empty / failed worker final message swallowed silently | Fire `empty-final-message-guard` (Delta-G49) on collection; `worker-failure-termination-guard` (Delta-G50) on exception. |
| FM1.d | Position-swap (worker N's result attributed to worker M) | Use `dispatching-parallel-agents-w321-fork` skill which adds position-swap audit. |

---

## Pattern 2: Team-lead + workers (mailbox-coordinated)

### Topology

```
Orchestrator (you, optional)
     |
     v
Team-lead (agent-teams:team-lead)
     |
     +--<SendMessage>--> Worker_1 (agent-teams:team-implementer)
     +--<SendMessage>--> Worker_2 (agent-teams:team-implementer)
     +--<SendMessage>--> Worker_3 (agent-teams:team-reviewer)
     |
     ^ TaskUpdate / SendMessage flows back from workers
```

### When to use

- File-ownership boundary semantics (worker X owns module A, worker Y owns module B)
- Workers need to read each other's findings during execution
- Synthesis step needs an explicit role rather than the parent orchestrator's main turn
- Presets: `feature`, `fullstack`, `migration`

### Example invocation

```bash
# Operator command:
/team-spawn feature --members 3 --name w436-impl

# Resolves to (per cache/.../commands/team-spawn.md Phase 2):
TeamCreate(team_name="w436-impl", description="W436 feature dev")
Agent(team_name="w436-impl", name="impl-lead", subagent_type="agent-teams:team-lead", prompt="...")
Agent(team_name="w436-impl", name="frontend", subagent_type="agent-teams:team-implementer", prompt="...")
Agent(team_name="w436-impl", name="backend",  subagent_type="agent-teams:team-implementer", prompt="...")
TaskCreate(team_name="w436-impl", assignee="frontend", subject="Implement components ...")
TaskCreate(team_name="w436-impl", assignee="backend",  subject="Implement endpoints ...")
```

### Communication contract (verbatim from `team-lead.md:67-73`)

1. Use `SendMessage` with `message` for direct teammate communication (default)
2. Use `broadcast` only for critical team-wide announcements
3. Never send structured JSON status messages — use `TaskUpdate` instead
4. Read team config from `~/.claude/teams/{team-name}/config.json` for teammate discovery
5. Refer to teammates by their actual spawned NAME, never by UUID or role alias
6. If a spawned name is suffixed to avoid collision, use the suffixed name from config/Agent output for all messages and tasks

### Cite-anchor

`Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/agents/team-lead.md` + `commands/team-spawn.md`. Plugin manifest at `.claude-plugin/plugin.json` (Seth Hobson MIT v1.0.2).

### Failure modes

| FM | Symptom | Mitigation |
|---|---|---|
| FM2.a | Teammate name == `team-lead` | reserved role-name auto-suffixes; use unique descriptive names like `impl-lead`, `feature-lead` |
| FM2.b | SendMessage to UUID instead of NAME | read `~/.claude/teams/{team-name}/config.json` for canonical names |
| FM2.c | Two teammates editing same file (file-ownership violation) | TaskCreate.description MUST list owned-files per team-lead.md File Ownership Rules |
| FM2.d | Lead spawned without TeamCreate first | always TeamCreate BEFORE the first Agent() call with the team_name |
| FM2.e | `/team-shutdown` skipped, state leak | always shutdown after collection; orphaned configs accumulate in `~/.claude/teams/` |

---

## Pattern 3: Adversarial verification (dual worker+verifier)

### Topology

```
Orchestrator
     |
     +--> Worker (produces answer)
     |        |
     |        v answer
     |
     +--> Verifier (independently re-derives / falsifies)
              |
              v verdict (CONFIRM | REFUTE + reasoning)
```

### When to use

- High-stakes correctness (security, financial, irreversible)
- Single-answer problems with verifiable structure (math, proofs, formal-spec compliance)
- When CR-6 verify-before-claim demands independent re-derivation
- math-olympiad-style competition problems

### Example invocation pseudocode

```text
# Worker:
Agent(subagent_type="general-purpose", prompt="Solve problem X. Show full work.")
# Then in next turn after worker returns:
Agent(subagent_type="general-purpose",
      prompt="The following solution was produced for problem X. Independently re-derive WITHOUT reading the worker's reasoning except for the final answer. Report CONFIRM or REFUTE with your own derivation. Worker's final answer: <answer>")
```

### Cite-anchor

Upstream `anthropics/knowledge-work-plugins` plugin `math-olympiad` (enabled in `.claude/settings.json:enabledPlugins.math-olympiad@claude-plugins-official:true` — cache-pending per W434 install). Pattern is the canonical Anthropic-published "verify by independent re-derivation" recipe. Cite secondary: NIST SP 800-218 PW.7 "Review/Analyze Code" + RV.1 "Identify+Confirm Vulnerabilities Ongoing" — independent confirmation is the SDLC discipline.

### Failure modes

| FM | Symptom | Mitigation |
|---|---|---|
| FM3.a | Verifier inherits worker's reasoning (not independent) | construct verifier prompt with ONLY the final answer + problem statement; do NOT include worker's chain-of-thought |
| FM3.b | Verifier rubber-stamps (lazy agreement) | seed verifier prompt with adversarial framing: "your job is to FIND a flaw or REFUTE" |
| FM3.c | Single verifier insufficient for high-stakes | apply N>=2 verifiers + majority vote; tie-break via cross-model gate (Pattern 5) |

---

## Pattern 4: Two-stage review (impl -> spec-rev -> quality-rev)

### Topology

```
Plan task T
     |
     v
Implementer subagent (fresh context)
     | implements + tests + commits + self-reviews
     v
Spec reviewer subagent (fresh context)
     | "does the code match the spec?"
     v PASS / FAIL
       |
       v on FAIL: implementer fixes spec gaps, re-review
       v on PASS:
     |
     v
Code quality reviewer subagent (fresh context)
     | "is the code clean/maintainable/idiomatic?"
     v PASS / FAIL
       |
       v on FAIL: implementer fixes quality issues, re-review
       v on PASS: mark task complete in TodoWrite
```

### When to use

- Executing a written implementation plan in the current session
- Tasks mostly independent (so subagent-per-task makes sense)
- Want fresh context per task to avoid pollution
- Want explicit quality gate before integration

### Example invocation

Read `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/superpowers/5.1.0/skills/subagent-driven-development/SKILL.md` for the canonical impl + spec-reviewer + code-quality-reviewer prompt templates. Skill ships:
- `./implementer-prompt.md`
- `./spec-reviewer-prompt.md`
- `./code-quality-reviewer-prompt.md`

### Cite-anchor

obra `superpowers@5.1.0` MIT, `skills/subagent-driven-development/SKILL.md` (cite-anchored above + W269 mandate restatement in CLAUDE.md).

### Failure modes

| FM | Symptom | Mitigation |
|---|---|---|
| FM4.a | Implementer skips self-review | explicitly require self-review in implementer-prompt.md (already present) |
| FM4.b | Spec reviewer re-implements instead of reviewing | spec-reviewer-prompt.md explicitly bounds scope to review-only |
| FM4.c | Quality reviewer rubber-stamps on iteration 5+ | use sibling `iterate-fix-failing-tests` ceiling (N=5 iterations OR M=3 no-progress cycles) |
| FM4.d | Reviewers approve but downstream integration breaks | dispatch a FINAL `general-purpose` reviewer on the entire integrated implementation per superpowers `finishing-a-development-branch` |

---

## Pattern 5: Cross-model consensus (Claude + GPT-5.5 codex + tie-break)

### Topology

```
High-stakes decision needed
     |
     v
Round 1: codex GPT-5.5 (authority)
     |
     +---> /codex:review or /codex:adversarial-review
     |
     v verdict (APPROVE | REJECT | UNCLEAR)
       |
       v on APPROVE: ship
       v on REJECT: rewrite + back to R1
       v on UNCLEAR:
     |
     v Round 2: codex GPT-5.5 (re-verify with fresh frame)
     |
     v
     diverge?
       no  -> ship
       yes -> Round 3: Sonnet 4.6 tie-breaker
```

### When to use

- HIGH-STAKES decisions (security, correctness, irreversible architecture)
- CR-6 verify-before-claim discipline mandates independent model
- Codex plugin installed at `cache/openai-codex/codex/1.0.4/`
- Frontier-peer policy per CLAUDE.md cardinal-rule architecture L4 / W331 P0.7

### Example invocation

```bash
# Operator commands (via codex@openai-codex plugin):
/codex:review              # round 1
/codex:adversarial-review  # round 2 if r1 UNCLEAR
# If r1 + r2 diverge, escalate to Sonnet 4.6 via sibling `dual-review` skill
```

### Cite-anchor

- Anthropic `https://docs.anthropic.com/en/docs/claude-code/sub-agents` model-precedence rules
- Anthropic `https://code.claude.com/docs/en/sub-agents` cross-model consensus pattern
- OpenAI `codex` plugin (verified via `.claude/plugins/cache/openai-codex/codex/1.0.4/`)
- CLAUDE.md L21 W331 P0.7 frontier-peer policy

### Failure modes

| FM | Symptom | Mitigation |
|---|---|---|
| FM5.a | codex plugin missing / auth-expired | `dual-review` skill returns `VERDICT: BLOCK` per fail-CLOSED contract |
| FM5.b | local Ollama used as adversarial-authority | EXPLICITLY excluded by CLAUDE.md L21: Ollama = cheap-triage-only, NOT authority |
| FM5.c | Sonnet used as round-1 authority | Sonnet = tie-breaker only; round-1 authority = codex GPT-5.5 |
| FM5.d | rate-limit or quota-exhausted | `dual-review` returns BLOCK, escalate to operator |

---

## Pattern 6: Sequential-thinking + parallel fan-out

### Topology

```
Complex multi-step problem
     |
     v
Stage A: sequential-thinking MCP (1 agent, multi-step plan)
     | emits structured task DAG: { tasks: [...], blockedBy: {...} }
     v plan
     |
     v
Stage B: parallel fan-out (Pattern 1)
     | dispatch N Agents on independent sub-tasks per plan
     v individual results
     |
     v
Stage C: orchestrator synthesizes
```

### When to use

- Problem is too complex for naive fan-out (workers would conflict / miss interactions)
- But after planning, sub-tasks become independent and parallelizable
- Examples: multi-file refactor (plan first, then parallel by file), distributed system audit (plan-axes first, then parallel-per-axis)

### Example invocation pseudocode

```text
# Stage A: planner
sequential_thinking_tool(thought="break problem X into 5 parallel-safe sub-tasks ...", ...)
# Stage A returns a DAG of sub-tasks with explicit independence.

# Stage B: fan-out (Pattern 1)
Agent(subagent_type="general-purpose", prompt="<sub-task 1 from plan>")
Agent(subagent_type="general-purpose", prompt="<sub-task 2 from plan>")
Agent(subagent_type="general-purpose", prompt="<sub-task 3 from plan>")
# all in 1 assistant message

# Stage C: synthesize
# In next turn, merge results + handle any integration issues identified by the planner
```

### Cite-anchor

- Anthropic `sequential-thinking` MCP server (canonical reference; expected to be installed at W434-INSTALL-L2 per operator mandate)
- Anthropic claude-cookbooks `research_lead_agent.md` parallel-fan-out + planner-worker decomposition
- bytedance `deer-flow` (architecture-reference) — planner-worker pattern at scale
- lastmile-ai `mcp-agent` Orchestrator pattern (cite via sibling `mcp-agent-patterns` skill)

### Failure modes

| FM | Symptom | Mitigation |
|---|---|---|
| FM6.a | Planner emits non-parallel-safe sub-tasks (false independence) | inspect plan output BEFORE Stage B fan-out; if any sub-task has shared-state, use Pattern 2 (team-lead) instead |
| FM6.b | Sub-task count > 5 | apply chunking: run 2 waves of <=5 each, synthesize between waves |
| FM6.c | Plan staleness (Stage B finds the world differs from plan) | abort Stage B, re-plan in Stage A with current state |

---

## Pattern selection decision diagram

```
                            Multi-agent coordination needed?
                                       |
                                       v
                            ----------------------
                            | Single-shot answer  |
                            | + verification?     |
                            ----------------------
                                  yes / no
                          +-------+    +-------+
                          v               v
                      Pattern 3      ----------------
                      (adversarial)  | Implementing |
                                     | a plan?      |
                                     ----------------
                                          yes / no
                                  +-------+    +-------+
                                  v               v
                              Pattern 4    ----------------
                              (two-stage)  | Complex multi-|
                                           | step problem? |
                                           ----------------
                                                yes / no
                                       +--------+    +-------+
                                       v               v
                                   Pattern 6    ----------------
                                   (plan+fan)   | File-ownership|
                                                | boundaries?   |
                                                ----------------
                                                     yes / no
                                          +-----------+    +-------+
                                          v                    v
                                      Pattern 2          Pattern 1
                                      (team-lead)        (fan-out)

  Pattern 5 (cross-model consensus) is ORTHOGONAL — layer on top of
  any of 1-4-6 when high-stakes decisions need a verification gate.
```

## Composition example: a full W436-style wave

A realistic complex wave layers multiple patterns:

1. **Pattern 6 Stage A**: sequential-thinking planner emits sub-task DAG
2. **Pattern 2 OR Pattern 1**: if sub-tasks share files -> Pattern 2 with team-lead; else Pattern 1
3. **Pattern 4**: each worker subagent runs two-stage review (impl -> spec-rev -> quality-rev)
4. **Pattern 3**: high-stakes sub-tasks get adversarial verifier
5. **Pattern 5**: final ship verdict via codex GPT-5.5 r1+r2 + Sonnet tie-break

## Anti-pattern catalog (across all patterns)

1. **Serial-when-parallel-possible** (W312-D, measured 29%) — solo dispatch when 2+ streams exist
2. **Stuffed-prompt-as-context-leak** — passing entire session context to subagent rather than constructing what they need
3. **Empty-final-message swallow** — accepting empty subagent completion as success (Delta-G49 guard)
4. **Worker-exception swallow** — silently exit-0'ing a thrown subagent (Delta-G50 guard)
5. **Mailbox without TeamCreate** — Agent() without prior TeamCreate is a hard error
6. **Bare subagent_type with collision** — `code-reviewer` collides 6 plugins; always FQN
7. **Skipping shutdown** — `/team-shutdown` leak accumulates in `~/.claude/teams/`
8. **Tie-breaker as authority** — Sonnet 4.6 is TIE-BREAKER not round-1 authority; codex GPT-5.5 is authority
9. **Rubber-stamping verifier** — verifier prompt must EXPLICITLY frame "find flaw / refute" not "approve"
10. **Plan staleness** (Pattern 6) — assuming the planner's world-state holds during fan-out execution

## Cross-references

- `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/.claude/skills/agent-team-sota/SKILL.md` — local trigger surface
- `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/docs/architecture/W436-AGENT-TEAM-SOTA/INTEGRATION-MAP.md` — SOTA-repo-to-pattern map
- `Z:/claude-sota-installed-W436-AGENT-TEAM-SOTA/tools/agent-team-helpers.ps1` — PowerShell helpers

## Cite-anchor floor (>=3 distinct orgs)

Actual count: 9 distinct orgs (URL-anchored for sca-v13 W352-S9 hook visibility).

1. **Anthropic** — claude-cookbooks `research_lead_agent.md`, sub-agents docs, sequential-thinking MCP, knowledge-work-plugins math-olympiad
   - https://github.com/anthropics/claude-cookbooks (commit `39a350b6790c132337dcc3ec35240728fcc1dc0e`)
   - https://docs.anthropic.com/en/docs/claude-code/sub-agents
   - https://code.claude.com/docs/en/sub-agents
   - https://github.com/anthropics/knowledge-work-plugins
2. **wshobson (Seth Hobson)** — agent-teams@1.0.2 plugin MIT
   - https://github.com/wshobson/agent-teams
3. **obra** — superpowers@5.1.0 MIT (dispatching-parallel-agents, subagent-driven-development)
   - https://github.com/obra/superpowers
4. **OpenAI** — codex plugin (1.0.4) for cross-model consensus
   - https://openai.com/codex
   - https://platform.openai.com/docs/guides/agents
5. **Pydantic** — ai@pydantic-skills v0.1.0 building-pydantic-ai-agents
   - https://ai.pydantic.dev/
   - https://github.com/pydantic/pydantic-ai
6. **Upstash** — context7 MCP up-to-date docs surface
   - https://context7.com/
   - https://upstash.com/docs/context7
7. **NIST** — SP 800-218 PW.7 + RV.1 SDLC verification discipline
   - https://csrc.nist.gov/projects/ssdf
   - https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf
8. **bytedance** — deer-flow planner-worker pattern (architecture-reference)
   - https://github.com/bytedance/deer-flow
9. **lastmile-ai** — mcp-agent topology library (Router, ParallelLLM, Orchestrator, Evaluator-Optimizer, MCPAggregator)
   - https://github.com/lastmile-ai/mcp-agent

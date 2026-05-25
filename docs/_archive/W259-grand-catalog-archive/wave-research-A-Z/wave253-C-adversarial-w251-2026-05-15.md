# Wave 253-C Adversarial Review of W251 GRAND-SYNTHESIS

## BRIDGE-MODE Status

cross-model gate: FULL — this is codex CLI dispatch

Scope: adversarial review of W251/W252 for the `Z:/claude-sota-pure` pure-SOTA runtime arc. W251/W252 still carries installed-runtime cleanup bias. This review treats every inherited component as suspect until a fresh 2026 reference, license, and native integration path survives live probes.

## Part 1 — Stale Verdict Verdicts

### 1. `mksglu/context-mode` — CONFIRMED BLOCKER

Verdict: CONFIRMED. Not MIT. It is Elastic License 2.0 / NOASSERTION at repo level and plugin manifest level.

Evidence:

- GitHub API: `https://api.github.com/repos/mksglu/context-mode` fields observed by `gh api`: `stargazers_count=14827`, `pushed_at=2026-05-15T14:24:31Z`, `license.spdx_id=NOASSERTION`, `archived=false`.
- Raw license: `https://raw.githubusercontent.com/mksglu/context-mode/main/LICENSE` begins `Elastic License 2.0 (ELv2) Copyright 2026 Mert Koseoglu`.
- Plugin manifest: `https://github.com/mksglu/context-mode/blob/main/.claude-plugin/plugin.json` declares `"license": "Elastic-2.0"`.

Impact: W251 correctly removed it from clean ADOPT-NOW. For pure runtime, do not install by default. At most cite/pilot under explicit source-available acceptance.

### 2. `topoteretes/cognee` — OVERTURNED UPWARD

Verdict: OVERTURNED. W251's "pilot comparator" is too timid if pure runtime has a memory layer slot. It should be MEMORY-INSTALL-PILOT-NOW, not REJECT, because the repo is active, Apache-2.0, and has a Claude Code plugin lifecycle path.

Evidence:

- GitHub API: `https://api.github.com/repos/topoteretes/cognee` fields observed by `gh api`: `stargazers_count=17248`, `pushed_at=2026-05-15T22:59:09Z`, `license.spdx_id=Apache-2.0`, `archived=false`.
- Raw license: `https://raw.githubusercontent.com/topoteretes/cognee/main/LICENSE` is Apache License Version 2.0 and includes `Copyright 2024 Topoteretes UG`.
- Claude Code integration repo: `https://api.github.com/repos/topoteretes/cognee-integrations` fields observed: `pushed_at=2026-05-12T15:45:25Z`, `stargazers_count=27`, `license=null`.
- Claude Code integration path exists at `topoteretes/cognee-integrations/integrations/claude-code` with `.claude-plugin`, `agents`, `hooks`, `scripts`, and `skills` directories.
- Public release evidence: `https://newreleases.io/project/github/topoteretes/cognee/release/v1.0.1` says v1.0.1 was published four weeks before crawl and documents a new Claude Code memory plugin.
- Cognee blog evidence: `https://www.cognee.ai/blog/deep-dives/cognee-cli-replaces-mcp-oauth` states the Claude Code plugin wraps `cognee-cli` and performs register-login-token before first command.

Impact: For pure runtime, run cognee head-to-head against Graphiti, mem0, and any new memory challenger. Do not inherit Graphiti as incumbent.

### 3. `mem0ai/mem0` — OVERTURNED UPWARD

Verdict: OVERTURNED. DEFER-then-PILOT is stale. It now has active Apache-2.0 repo status, native Claude Code integration paths, skills, and a marketplace/plugin surface.

Evidence:

- GitHub API: `https://api.github.com/repos/mem0ai/mem0` fields observed by `gh api`: `stargazers_count=55805`, `pushed_at=2026-05-16T00:17:28Z`, `license.spdx_id=Apache-2.0`, `archived=false`.
- Raw license: `https://raw.githubusercontent.com/mem0ai/mem0/main/LICENSE` is Apache License Version 2.0 and includes `Copyright [2023] [Taranjeet Singh]`.
- Native paths found by GitHub code search in `mem0ai/mem0`: `.claude-plugin/marketplace.json`, `mem0-plugin/README.md`, `mem0-plugin/hooks/hooks.json`, `docs/integrations/claude-code.mdx`, `skills/mem0`, `skills/mem0-integrate`, and `skills/mem0-test-integration`.
- Public repo README snippet at `https://github.com/mem0ai/mem0` advertises `npx skills add https://github.com/mem0ai/mem0 --skill mem0`, `/mem0-integrate`, and `/mem0-test-integration`.
- 2026 benchmark evidence exists but is mixed. Mem0's own `https://mem0.ai/blog/state-of-ai-agent-memory-2026` reports LOCOMO results for Mem0/Mem0g and token/latency savings. Independent `https://vectorize.io/articles/mem0-vs-zep` reports LongMemEval with Mem0 49.0% and Zep 63.8%. This is enough to require a benchmark, not enough to crown mem0.

Impact: Pure runtime should install-pilot mem0 memory plugin/skills in an isolated memory profile and benchmark. It should not silently replace temporal KG.

### 4. `volcengine/OpenViking` — AMBER, LICENSE BOUNDARY NOT CLEAN

Verdict: AMBER. W251's AGPL rejection is correct for repo root, but the Claude Code plugin subpath is more interesting than W251 admits. The AGPL blocker is not cleanly overturned because there is no separate LICENSE file inside `examples/claude-code-memory-plugin`; however, plugin metadata claims Apache-2.0 and a separate marketplace repo is Apache-2.0.

Evidence:

- GitHub API: `https://api.github.com/repos/volcengine/OpenViking` fields observed by `gh api`: `stargazers_count=23965`, `pushed_at=2026-05-15T14:23:05Z`, `license.spdx_id=AGPL-3.0`, `archived=false`.
- Root license: `https://github.com/volcengine/OpenViking/blob/main/LICENSE` begins GNU Affero General Public License Version 3.
- Subpath listing at `examples/claude-code-memory-plugin` contains `.claude-plugin`, `.mcp.json`, `README.md`, commands, hooks, scripts, package files, and setup-helper, but no `LICENSE` file.
- Subpath plugin manifest `examples/claude-code-memory-plugin/.claude-plugin/plugin.json` declares `"license": "Apache-2.0"`.
- Subpath README at `https://raw.githubusercontent.com/volcengine/OpenViking/main/examples/claude-code-memory-plugin/README.md` says the plugin is a Claude Code memory plugin with `UserPromptSubmit`, `Stop`, and MCP tools; it also says `License Apache-2.0 — same as OpenViking`, which conflicts with the root AGPL API result.
- Separate marketplace repo `https://api.github.com/repos/Castor6/openviking-plugins` fields observed: `license.spdx_id=Apache-2.0`, `pushed_at=2026-04-13T09:13:12Z`, `stargazers_count=11`.

Impact: Do not default install. But do not bury it as simple reject. W254 needs legal/source-boundary verification: is the plugin code legally Apache-2.0 despite living under an AGPL root? If yes, plugin-only pilot is possible; if no, reject.

### 5. `FalkorDB/FalkorDB` — OVERTURNED FROM HARD BLOCK TO EXPLICIT-ACCEPTANCE AMBER

Verdict: AMBER. SSPL at root is confirmed. W251 is right to block silent default. But local-only Docker use likely does not trigger SSPL Section 13 service-source obligations. The blocker is policy/legal-review, not automatic technical impossibility.

Evidence:

- GitHub API: `https://api.github.com/repos/FalkorDB/FalkorDB` fields observed by `gh api`: `stargazers_count=4415`, `pushed_at=2026-05-14T12:04:33Z`, `license.spdx_id=NOASSERTION`, `archived=false`.
- Root license: `https://github.com/FalkorDB/FalkorDB/blob/master/LICENSE.txt` begins Server Side Public License Version 1.
- FalkorDB docs `https://docs.falkordb.com/References/license.html` state SSPL applies when using FalkorDB as part of a service made available to others, and says evaluation, prototyping, and internal testing are allowed without source release if not provided as a public service.
- MongoDB SSPL FAQ `https://www.mongodb.com/legal/licensing/server-side-public-license/faq` states there is no copyleft condition for other SaaS applications that use MongoDB as a database and separately discusses internal-only service use.
- OpenTechHub SSPL summary `https://www.opentechhub.io/resource/license-sspl-v3/` says safe for internal use and flags managed SaaS as the risk.

Impact: For pure runtime: never make FalkorDB a silent backend. But if Graphiti/FalkorDB is uniquely best after benchmark, local-only single-user Docker can be considered with explicit SSPL acceptance and a no-managed-service guardrail.

### 6. `protect-mcp` by Trail of Bits — OVERTURNED / PRIOR CATALOG WRONG

Verdict: OVERTURNED. `trailofbits/protect-mcp` repo does not exist. `@trailofbits/protect-mcp` npm is 404. The unscoped `protect-mcp` npm endpoint likely exists or at least returns a body before local npm cache EPERM, but it is not Trail of Bits. W251 quarantine is correct but too vague.

Evidence:

- GitHub API `https://api.github.com/repos/trailofbits/protect-mcp`: 404 Not Found.
- `gh search repos protect-mcp` top relevant Trail of Bits result is `trailofbits/mcp-context-protector`, not `protect-mcp`; fields observed: Apache-2.0, `pushedAt=2026-04-14T12:07:30Z`, `stargazersCount=219`.
- npm `npm view @trailofbits/protect-mcp` returned E404 from `https://registry.npmjs.org/@trailofbits%2fprotect-mcp`.
- `wshobson/agents` marketplace includes a plugin named `protect-mcp` with author Tom Farley / Scopeblind, license MIT, source `./plugins/protect-mcp`. That is not Trail of Bits.
- `gh search repos protect-mcp` also found `tomjwxf/scopeblind-gateway` description with `npx protect-mcp`, MIT, pushed 2026-04-11, but only 8 stars and says active development moved to ScopeBlind/scopeblind-gateway.

Impact: Remove "Trail of Bits protect-mcp" from catalog. Replace with two separate rows: `trailofbits/mcp-context-protector` and `wshobson protect-mcp / ScopeBlind` governance plugin, each independently audited.

### 7. cognee REJECT-then-PILOT — OVERTURNED TO MEMORY-INSTALL-PILOT-NOW

Verdict: OVERTURNED. Current state supports isolated install-pilot. It should be W252 P1 if memory architecture is in scope.

Evidence:

- `topoteretes/cognee`: Apache-2.0, 17,248 stars, pushed 2026-05-15.
- `topoteretes/cognee-integrations`: Claude Code plugin tree with `.claude-plugin`, hooks, agents, scripts, skills, pushed 2026-05-12.
- Cognee v1.0.1 release and blog document Claude Code plugin lifecycle.

Limit: integration repo has no GitHub API license. The core is Apache-2.0; integration license must be checked before default.

### 8. mem0 DEFER-then-PILOT — OVERTURNED TO MEMORY-INSTALL-PILOT-NOW

Verdict: OVERTURNED. mem0 has a stronger native Claude Code path than W251 credited.

Evidence:

- `mem0ai/mem0`: Apache-2.0, 55,805 stars, pushed 2026-05-16.
- Native paths: `.claude-plugin/marketplace.json`, `mem0-plugin`, Claude Code docs, hooks, and skills.
- 2026 memory benchmarks exist and include Graphiti/Zep comparisons; results conflict, so benchmark locally.

Limit: mem0 may lose to Zep/Graphiti on temporal KG accuracy in independent comparisons. It should be installed for head-to-head evaluation, not promoted as the default winner.

## Part 2 — Missing Categories

| category | top candidate | stars | license | pushed_at | should-add |
|---|---:|---:|---|---|---|
| Multi-agent debate/consensus | `Yeachan-Heo/oh-my-claudecode` | 33,966 | MIT | 2026-05-15T22:39:04Z | YES P1. W251 missed team-first orchestration as a primary architecture, not just plugin garnish. |
| Multi-agent debate/consensus, weak exact query | `SutejReddyPudiparthi/Mixture_of_Agents_LLM_App` | 1 | MIT | 2025-04-17T08:50:47Z | NO. Exact `mixture of agents llm` search did not surface a mature repo. Use as query refutation, not candidate. |
| Cross-cycle state / workflows | `temporalio/temporal` | 20,287 | MIT | 2026-05-16T02:03:58Z | YES P1 research. W251 underweights durable workflow engines for cross-cycle state and retries. |
| Cross-cycle state / workflows | `inngest/inngest` | 5,362 | NOASSERTION | 2026-05-15T23:43:34Z | YES P2/AMBER. Fresh and agent-relevant, but license field needs review. |
| Skill/agent quality eval | `confident-ai/deepeval` | 15,458 | Apache-2.0 | 2026-05-14T15:36:33Z | YES P1. W251 eval layer is too narrow around SWE-only harnesses. |
| Skill/agent quality eval | `openai/evals` | 18,470 | NOASSERTION | 2026-04-14T15:29:57Z | YES cite/P2. Useful reference but license field needs direct package/license check. |
| Local model serving for T1 fallback | `ollama/ollama` | 171,475 | MIT | 2026-05-15T23:23:55Z | YES P1. W251 assumes external Codex/Claude gates; pure runtime needs degraded/local fallback path. |
| Local model serving, exact query result | `anurmatov/mac-studio-server` | 303 | MIT | 2026-01-24T16:48:30Z | NO default. Good ops recipe, not core runtime primitive. |
| LLM router beyond LiteLLM | `lm-sys/RouteLLM` | 4,891 | Apache-2.0 | 2024-08-10T19:10:15Z | YES cite/P2 despite stale push; still a canonical router reference beyond LiteLLM. |
| LLM router beyond LiteLLM, exact query result | `electricessence/lm-gateway-rs` | 1 | Other | 2026-03-24T23:18:18Z | NO. Exact query produced low-signal repos; use broader search terms. |

Missing category conclusion: W251's P1 is biased toward MCP additions and installed-runtime cleanup. Pure runtime needs first-class lanes for orchestration, durable workflows, evals, local fallback, and routing.

## Part 3 — Orchestration Plugin Primary Pick

Primary picks for `Z:/claude-sota-pure`:

1. `anthropics/claude-code` official marketplace baseline.
2. `Yeachan-Heo/oh-my-claudecode` as the primary multi-agent/team orchestration plugin.

Secondary, curated-only:

- `wshobson/agents` for audited plugin slices, not bulk install.
- `obra/superpowers` for skills/TDD/debugging discipline, not orchestration control plane.

Evidence:

- `https://api.github.com/repos/anthropics/claude-code`: `stargazers_count=123922`, `pushed_at=2026-05-15T22:28:22Z`, `license=null`, `archived=false`.
- `anthropics/claude-code/.claude-plugin/marketplace.json` lists official bundled plugins including `agent-sdk-dev`, `code-review`, `commit-commands`, `feature-dev`, `hookify`, `plugin-dev`, `pr-review-toolkit`, `security-guidance`.
- `https://api.github.com/repos/Yeachan-Heo/oh-my-claudecode`: `stargazers_count=33966`, `pushed_at=2026-05-15T22:39:04Z`, `license.spdx_id=MIT`, `archived=false`. Repo has `.claude-plugin`, `.mcp.json`, `agents`, `commands`, `hooks`, `skills`, `missions`, `bridge`, and benchmark folders.
- `https://api.github.com/repos/wshobson/agents`: `stargazers_count=35459`, `pushed_at=2026-05-14T13:04:35Z`, `license.spdx_id=MIT`, `archived=false`.
- `wshobson/agents/.claude-plugin/marketplace.json` declares `80 focused plugins, 185 specialized agents, and 153 skills`, including `agent-orchestration`, `agent-teams`, `conductor`, `comprehensive-review`, `protect-mcp`, `ship-mate`, and many domain plugins.
- `https://api.github.com/repos/obra/superpowers`: `stargazers_count=192881`, `pushed_at=2026-05-14T23:32:25Z`, `license.spdx_id=MIT`, `archived=false`. Plugin manifest describes core skills library for TDD, debugging, collaboration patterns, and proven techniques.
- `chand1012/oh-my-claudecode` is wrong: `https://api.github.com/repos/chand1012/oh-my-claudecode` 404. GitHub search resolves the actual high-star repo to `Yeachan-Heo/oh-my-claudecode`.

Conflict analysis per Probe 4 plugin namespace:

- `anthropics/claude-code` and `wshobson/agents` duplicate code review, PR review, commit workflows, feature development, security guidance, hook creation, plugin development, and frontend-design categories.
- `Yeachan-Heo/oh-my-claudecode` and `wshobson/agents` duplicate agent teams, orchestration, commands, hooks, skills, and mission/workflow patterns.
- `obra/superpowers` overlaps with wshobson TDD/debugging/code review skills but is narrower and discipline-oriented.
- Primary two should not be `wshobson + oh-my-claudecode` together at first boot; that produces two competing orchestration layers. Use official baseline plus one non-official orchestration stack.

## Part 4 — Token Optimization Stack 2026-may

Convergent stack:

1. Native 1M Claude models first. Anthropic models overview `https://platform.claude.com/docs/en/about-claude/models/overview` lists Claude Opus 4.7 and Sonnet 4.6 with 1M token context windows and Claude Opus 4.7 as generally available for complex reasoning/agentic coding.
2. Prompt caching second. Anthropic prompt caching docs `https://platform.claude.com/docs/en/build-with-claude/prompt-caching` say prompt caching is supported on all active Claude models, includes automatic caching, 5-minute and 1-hour TTL, cache reads at 0.1x base input price, and examples using `model="claude-opus-4-7"`.
3. Server-side compaction/context editing third. Anthropic context window docs `https://platform.claude.com/docs/en/build-with-claude/context-windows` state server-side compaction is the primary strategy for long-running agentic workflows and context editing handles tool result/thinking block clearing.
4. Repomix for codebase packing/compression. `https://api.github.com/repos/yamadashy/repomix` fields observed: MIT, 24,892 stars, pushed 2026-05-16T00:38:33Z.
5. Serena/GitNexus-style symbol retrieval and selective file reads before whole-repo packing. W251 mentions Serena/GitNexus but underweights the design principle: retrieve semantically first, pack only when needed.
6. Context-mode is not in the clean stack. `mksglu/context-mode` is ELv2 / Elastic-2.0 and cannot be a permissive default even if technically strong.
7. Remove legacy token-efficient-tools beta header. Anthropic migration guide `https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/token-efficient-tool-use` redirects to the migration guide and states to remove `token-efficient-tools-2025-02-19`; all Claude 4+ models have built-in token-efficient tool use and the headers have no effect.
8. Use task budgets, not old token headers, for agentic loop budget control. The Anthropic migration guide lists `task-budgets-2026-03-13` as beta for Claude Opus 4.7.
9. Do not claim `anthropics/anthropic-sdk-python` proves Opus 4.7 by itself. API repo is current MIT and pushed 2026-05-15, but README example still showed `claude-opus-4-6`; the official docs are the stronger source for Opus 4.7/1M claims.

Rejected/removed:

- LLMLingua-style lossy compression as default. W251 was correct to remove it.
- `token-efficient-tools-2025-02-19` as an active header. It is legacy/no-effect for Claude 4+.
- context-mode as default due ELv2.

## Part 5 — Architectural Blind Spots

### Blind spot 1: Hook-first architecture is inherited, not proven fresh-SOTA

W251 assumes Claude Code `PreToolUse`/hooks as the core safety and memory injection layer. Fresh evidence shows plugin hooks are real and powerful, but W251 did not compare against gateway/proxy enforcement, MCP capability wrappers, signed receipts, or policy engines.

Adversarial correction: pure runtime should compare hook-first against MCP gateway/policy layers. `trailofbits/mcp-context-protector`, `wshobson protect-mcp`, ScopeBlind, and formal MCP security papers are category inputs. Hooks are necessary but not sufficient because they sit inside one client runtime; gateway/policy can guard multiple clients and remote MCP boundaries.

### Blind spot 2: Codex CLI T1-T7 gate is incumbent bias

W251 treats Codex CLI as the cross-model gate because installed runtime already does. Pure runtime should ask what the gate is for: independent reasoning, adversarial review, local fallback, policy verification, or benchmark scoring. Those may be separate systems.

Adversarial correction: evaluate a gate matrix: Claude Opus 4.7 primary, GPT-5.5/Codex reviewer, local Ollama fallback for degraded operation, DeepEval/promptfoo/autoevals for repeatable score gates, and policy/verifier layers for tool permission. Do not hardcode Codex as the only T1-T7 truth source.

### Blind spot 3: Agent worktree isolation pattern may be obsolete for durable workflows

W251 carries worktree/subagent assumptions from `Z:/claude-sota`. It did not compare durable workflow engines such as Temporal/Inngest, state machines, resumable task queues, or event-sourced agent loops.

Adversarial correction: pure runtime should prototype cross-cycle state on `temporalio/temporal` or Inngest-like primitives before reusing ad hoc worktree/session state. Worktrees isolate files; they do not solve retries, idempotency, durable timers, stuck-agent recovery, or stateful multi-day orchestration.

### Blind spot 4: Graphiti + FalkorDB as L3 temporal KG is not settled SOTA

W251 keeps Graphiti as incumbent and debates FalkorDB licensing. That is too narrow. 2026 memory work includes mem0 temporal reasoning, cognee, Zep/Graphiti, Letta/LangMem, OpenViking, MAGMA, WorldDB, EngramaBench, and new benchmark critiques.

Adversarial correction: pure runtime memory should start with a benchmark harness and multiple backends. Include mem0 and cognee install-pilots now. Treat Graphiti as one contestant. FalkorDB is only a backend option after SSPL acceptance.

### Blind spot 5: MCP-addition bias crowds out runtime architecture

W252 top-3 are Kubernetes MCP, Browserbase MCP, mini-swe-agent. Those are useful, but they are peripheral. They do not decide pure runtime architecture.

Adversarial correction: W254 should prioritize orchestration plane, durable state, memory benchmark, security enforcement boundary, eval gates, and token strategy before adding more MCP adapters. MCPs are capabilities; they are not the architecture.

## Wave 254 P0 MUST-FIX Queue

1. Rewrite W252 as a fresh-runtime architecture plan, not installed-runtime cleanup. Required sections: orchestration plane, durable state, memory layer, security boundary, eval gate, local fallback, token strategy, plugin namespace policy.
2. Promote `Yeachan-Heo/oh-my-claudecode` to P1 orchestration comparison against official `anthropics/claude-code` marketplace. Correct the wrong `chand1012` repo path.
3. Add memory install-pilot lane for `mem0ai/mem0`, `topoteretes/cognee`, Graphiti/Zep, and OpenViking-plugin-AMBER. Define benchmark before selecting default.
4. Replace "Trail of Bits protect-mcp" with accurate rows: `trailofbits/mcp-context-protector` and `wshobson/agents`/ScopeBlind `protect-mcp`.
5. Reclassify FalkorDB from absolute reject to SSPL-AMBER-local-only-explicit-acceptance, while still blocking silent default.
6. Reclassify OpenViking from simple AGPL reject to LICENSE-BOUNDARY-AMBER: root AGPL, plugin manifest Apache-2.0, no subpath LICENSE, separate marketplace Apache-2.0.
7. Add durable workflow research lane: `temporalio/temporal` P1 and `inngest/inngest` P2/AMBER.
8. Add local fallback lane: `ollama/ollama` P1 for offline/degraded cross-model gate, not as primary intelligence.
9. Add eval lane beyond SWE-only: `confident-ai/deepeval`, `promptfoo`, `openai/evals`, `braintrustdata/autoevals`.
10. Update token plan: prompt caching + compaction/context editing + repomix + symbol retrieval + task budgets; remove legacy token-efficient-tools header and reject context-mode default.

## VERDICT JSON

```json
{
  "stale_verdicts_confirmed": [
    "mksglu/context-mode is ELv2/Elastic-2.0, not MIT",
    "FalkorDB root is SSPL/NOASSERTION and cannot be silent default",
    "OpenViking root is AGPL-3.0"
  ],
  "stale_verdicts_overturned": [
    "topoteretes/cognee should move from reject/weak pilot to MEMORY-INSTALL-PILOT-NOW",
    "mem0ai/mem0 should move from defer to MEMORY-INSTALL-PILOT-NOW",
    "Trail of Bits protect-mcp catalog row is wrong; repo/package identity is not Trail of Bits",
    "FalkorDB is not an automatic no for local-only use, but requires explicit SSPL acceptance",
    "OpenViking plugin subpath creates license-boundary AMBER rather than simple reject"
  ],
  "missing_categories": [
    "multi-agent/team orchestration",
    "durable cross-cycle workflow state",
    "agent/skill quality evaluation beyond SWE harnesses",
    "local model serving fallback",
    "LLM routing beyond LiteLLM"
  ],
  "license_amber_unresolved": [
    "OpenViking Claude Code plugin: root AGPL, subpath manifest Apache-2.0, no subpath LICENSE",
    "cognee-integrations license null despite Apache-2.0 core",
    "inngest/inngest GitHub API license NOASSERTION",
    "openai/evals GitHub API license NOASSERTION",
    "anthropics/claude-code repo license null"
  ],
  "orchestration_plugins_primary_pick": "anthropics/claude-code official marketplace + Yeachan-Heo/oh-my-claudecode; wshobson/agents curated-only; obra/superpowers secondary skills discipline",
  "token_optimization_stack": [
    "Claude Opus 4.7/Sonnet 4.6 1M context",
    "Anthropic prompt caching",
    "server-side compaction and context editing",
    "repomix codebase packing",
    "symbol retrieval before whole-repo packing",
    "task budgets beta for agentic loop control",
    "remove legacy token-efficient-tools header",
    "exclude context-mode from permissive default due ELv2"
  ],
  "architectural_blind_spots": [
    "hook-first safety/memory architecture inherited without comparing MCP gateway/policy enforcement",
    "Codex CLI T1-T7 gate inherited without evaluating eval frameworks or local fallback",
    "worktree isolation inherited without durable workflow engine comparison",
    "Graphiti/FalkorDB incumbent bias in memory layer",
    "MCP-addition bias masking pure-runtime architecture decisions"
  ],
  "wave254_p0_must_fix": [
    "rewrite W252 around fresh-runtime architecture",
    "add oh-my-claudecode orchestration comparison",
    "add memory benchmark lane with mem0/cognee/Graphiti/OpenViking-AMBER",
    "fix protect-mcp identity",
    "resolve OpenViking plugin license boundary",
    "add Temporal/Inngest durable workflow lane",
    "add Ollama local fallback lane",
    "add DeepEval/promptfoo/openai-evals/autoevals eval lane",
    "update token stack and remove legacy token-efficient-tools/context-mode-default assumptions"
  ]
}
```

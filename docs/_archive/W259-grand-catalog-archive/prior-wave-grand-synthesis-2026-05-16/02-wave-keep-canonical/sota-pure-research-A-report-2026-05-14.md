# Agent A SOTA-Pure Runtime Research Report
Date: 2026-05-14
Target: `Z:/claude-sota-pure/`
Output: Agent A synthesis after Agent B NEEDS-REVISION audit.
Recommendation: keep Option A as production; build Option B as a parallel evaluation runtime until it passes plugin/MCP smoke tests.

## Inputs Read
1. Agent B verdict: `Z:/claude-sota-installed/tmp/sota-pure-codex-B-2026-05-14.md`
2. Agent A prior-output glob: `Z:/claude-sota-installed/tmp/sota-pure-research-A-*.md`
3. Prior Agent A files found: none.

## Convergence Gate
Axis 1: capability closure.
Does the candidate close a concrete gap Agent B found in the four-starter set?
Axis 2: upstream provenance.
Does it come from an upstream plugin marketplace, upstream MCP repo, or official Claude Code docs?
Axis 3: fresh-runtime viability.
Can `Z:/claude-sota-pure/` install/register it with minimal bootstrap files and without copying local rules, hooks, skills, or agents?
Verdicts: APPROVE, APPROVE-PARTIAL, NEEDS-REVISION, REJECT.

## Upstream Cite Anchors
1. Claude Code plugins docs: https://code.claude.com/docs/en/plugins
2. Claude Code MCP docs: https://code.claude.com/docs/en/mcp
3. Claude Code hooks docs: https://code.claude.com/docs/en/hooks
4. Claude Code settings docs: https://code.claude.com/docs/en/settings
5. Claude Code sub-agents docs: https://code.claude.com/docs/en/sub-agents
6. Plugin marketplace structure: `Z:/repos/deps/claude-plugins-official/README.md:1-17 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
7. Plugin directory layout: `Z:/repos/deps/claude-plugins-official/README.md:30-42 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
8. `wshobson/agents` scale: `Z:/repos/deps/wshobson-agents/README.md:7-19 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
9. `wshobson/agents` install model: `Z:/repos/deps/wshobson-agents/README.md:44-82 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
10. `agent-teams` setup/features: `Z:/repos/deps/wshobson-agents/plugins/agent-teams/README.md:1-65 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
11. `agent-teams` agents/skills: `Z:/repos/deps/wshobson-agents/plugins/agent-teams/README.md:67-85 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
12. `agent-teams` workflows: `Z:/repos/deps/wshobson-agents/plugins/agent-teams/README.md:87-119 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
13. `comprehensive-review` command: `Z:/repos/deps/wshobson-agents/plugins/comprehensive-review/commands/full-review.md:1-18 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
14. `comprehensive-review` phases: `Z:/repos/deps/wshobson-agents/plugins/comprehensive-review/commands/full-review.md:93-120 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
15. `protect-mcp` purpose: `Z:/repos/deps/wshobson-agents/plugins/protect-mcp/README.md:1-19 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
16. `protect-mcp` included resources: `Z:/repos/deps/wshobson-agents/plugins/protect-mcp/README.md:37-47 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
17. `review-agent-governance`: `Z:/repos/deps/wshobson-agents/plugins/review-agent-governance/README.md:25-57 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
18. `context-mode`: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-31 @ HEAD e73a6cd56a4eb0a01794b9187902e3f805515286`
19. `ralph-loop` Stop hook: `Z:/repos/deps/claude-plugins-official/plugins/ralph-loop/README.md:11-27 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
20. `ralph-loop` commands: `Z:/repos/deps/claude-plugins-official/plugins/ralph-loop/README.md:48-61 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
21. `mcp-server-dev`: `Z:/repos/deps/claude-plugins-official/plugins/mcp-server-dev/README.md:1-32 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
22. `hookify`: `Z:/repos/deps/claude-plugins-official/plugins/hookify/README.md:1-15 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
23. `hookify` rule shape: `Z:/repos/deps/claude-plugins-official/plugins/hookify/README.md:71-120 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
24. GitHub MCP remote: `Z:/repos/deps/github-mcp-server/README.md:19-24 @ HEAD 62266f804b1e24b5c22f158c4c79b1db4950967c`
25. GitHub MCP config: `Z:/repos/deps/github-mcp-server/README.md:42-75 @ HEAD 62266f804b1e24b5c22f158c4c79b1db4950967c`
26. Context7: `Z:/repos/deps/context7/README.md:19-61 @ HEAD 78b98266954d35da8aa93ad40c67df33a3ff4443`
27. Playwright MCP: `Z:/repos/deps/playwright-mcp/README.md:1-18 @ HEAD 8116437ffcfee1309cebc07dd30cee37720d2d19`
28. Playwright MCP config: `Z:/repos/deps/playwright-mcp/README.md:28-45 @ HEAD 8116437ffcfee1309cebc07dd30cee37720d2d19`
29. Repomix: `Z:/repos/deps/repomix/README.md:50-82 @ HEAD b99706131b26b68e0d72aab7f93fccebad1460c0`
30. Repomix install: `Z:/repos/deps/repomix/README.md:83-100 @ HEAD b99706131b26b68e0d72aab7f93fccebad1460c0`
31. Serena: `Z:/repos/deps/serena/README.md:17-25 @ HEAD ab98ea676253e7a4efee7bc9f9aa7caf51cc6c52`
32. Serena client/MCP support: `Z:/repos/deps/serena/README.md:68-87 @ HEAD ab98ea676253e7a4efee7bc9f9aa7caf51cc6c52`
33. GitNexus purpose: `Z:/repos/deps/gitnexus/README.md:29-42 @ HEAD 98addbd6c4e7aff77b5c33242d08155afe94ed35`
34. GitNexus install/storage: `Z:/repos/deps/gitnexus/README.md:51-63 @ HEAD 98addbd6c4e7aff77b5c33242d08155afe94ed35`

## Agent B Gap Synthesis
Starter set audited by Agent B:
1. `claude-plugins-official` from `anthropics/claude-plugins-official`.
2. `claude-code-workflows` from `wshobson/agents`.
3. `addy-agent-skills` from `addyosmani/agent-skills`.
4. `openai-codex` from `openai/codex-plugin-cc`.
Overall interpretation: the four starters are a clean upstream seed, not a complete runtime.
Gap 1: MCP fleet.
The starters do not install GitHub, Context7, DeepWiki, Playwright, Repomix, Serena, GitNexus, memory, temporal graph memory, or observability MCPs.
Gap 2: context continuity and compaction.
Claude Code has official context/settings surfaces, but the starter four do not provide a complete quality-aware pre-rot compaction primitive.
Gap 3: auto-iteration.
`openai-codex` review gating is not a generic Stop-hook auto-continue loop.
Gap 4: orchestration breadth.
`agent-orchestration` is not the same as a broad specialist team surface; `agent-teams` is the stronger upstream choice.
Gap 5: review and hook chain.
The four starters do not supply the installed runtime's full local pre-edit, commit-time, post-commit, pre-push, plan-stage, and stop-stage chain.
Gap 6: runtime hardening.
Secrets policy, review-surface controls, and tool-call authorization are not complete in the starter set.
Gap 7: observability and telemetry.
Phoenix-style tracing and cost telemetry are outside the four-starter seed.
Gap 8: memory strategy.
The starter set does not pick a canonical memory layer.
Gap 9: semantic code navigation.
Serena and GitNexus are not included by default.
Gap 10: cookbook patterns.
Anthropic cookbook recipes are useful upstream references but are not installable Claude Code runtime primitives by themselves.

## Top-5 Additional Plugins/MCPs
### 1. `context-mode@context-mode`
Gap closed: context continuity, context offload, compaction recovery.
Evidence: plugin metadata describes an MCP server, context-window savings, session continuity, FTS5 knowledge base, and state restore across compactions.
Cite: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-31 @ HEAD e73a6cd56a4eb0a01794b9187902e3f805515286`
Axis 1: APPROVE-PARTIAL.
It closes continuity/offload, not a proven autonomous quality-aware compact trigger.
Axis 2: APPROVE.
It is an upstream plugin with plugin metadata and MCP registration.
Axis 3: APPROVE-PARTIAL.
It is installable, but license and local state location require operator acceptance.
Convergence-gate verdict: APPROVE-PARTIAL.
Install priority: first plugin wave after marketplaces.

### 2. `agent-teams@claude-code-workflows`
Gap closed: multi-agent orchestration breadth.
Evidence: covers preset teams, multi-reviewer code review, hypothesis debugging, parallel feature development, research, security audit, migration, task coordination, and team communication.
Cite: `Z:/repos/deps/wshobson-agents/plugins/agent-teams/README.md:43-65 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
Evidence: ships team agents and skills.
Cite: `Z:/repos/deps/wshobson-agents/plugins/agent-teams/README.md:67-85 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
Axis 1: APPROVE.
It directly closes the broad-team gap without local agent copies.
Axis 2: APPROVE.
It is from the upstream `wshobson/agents` marketplace.
Axis 3: APPROVE-PARTIAL.
It requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` and teammate display settings.
Convergence-gate verdict: APPROVE-PARTIAL.
Install priority: first session if parallel research/review is required.

### 3. `comprehensive-review@claude-code-workflows`
Gap closed: specialist review depth without local hook copying.
Evidence: orchestrates review across architecture, security, performance, testing, and best practices.
Cite: `Z:/repos/deps/wshobson-agents/plugins/comprehensive-review/commands/full-review.md:1-18 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
Evidence: includes code quality, architecture, security, performance, testing, documentation, standards, and consolidation phases.
Cite: `Z:/repos/deps/wshobson-agents/plugins/comprehensive-review/commands/full-review.md:93-120 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
Axis 1: APPROVE-PARTIAL.
It closes command-driven review depth, not the full installed local hook chain.
Axis 2: APPROVE.
It is upstream marketplace content.
Axis 3: APPROVE.
It installs as a focused plugin and requires no local hook copy.
Convergence-gate verdict: APPROVE-PARTIAL.
Install priority: immediately after context/team baseline, or before teams if review is first workload.

### 4. `ralph-loop@claude-plugins-official`
Gap closed: Stop-hook auto-iteration.
Evidence: implements a Stop hook that intercepts exit attempts and feeds the same prompt back inside the current session.
Cite: `Z:/repos/deps/claude-plugins-official/plugins/ralph-loop/README.md:11-27 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
Evidence: exposes `/ralph-loop` with completion promise and max-iteration options.
Cite: `Z:/repos/deps/claude-plugins-official/plugins/ralph-loop/README.md:48-61 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
Axis 1: APPROVE.
It closes the auto-iteration gap better than a review-only Stop gate.
Axis 2: APPROVE.
It is in `claude-plugins-official`.
Axis 3: APPROVE-PARTIAL.
It should be used with finite iteration limits and explicit completion criteria.
Convergence-gate verdict: APPROVE-PARTIAL.
Install priority: after review/context primitives, before long autonomous runs.

### 5. MCP Baseline Pack
Gap closed: missing MCP fleet.
Pack contents: GitHub MCP, Context7, DeepWiki, Playwright MCP, Repomix, Serena, GitNexus.
GitHub MCP cite: `Z:/repos/deps/github-mcp-server/README.md:19-24 @ HEAD 62266f804b1e24b5c22f158c4c79b1db4950967c`
Context7 cite: `Z:/repos/deps/context7/README.md:19-61 @ HEAD 78b98266954d35da8aa93ad40c67df33a3ff4443`
Playwright MCP cite: `Z:/repos/deps/playwright-mcp/README.md:1-18 @ HEAD 8116437ffcfee1309cebc07dd30cee37720d2d19`
Repomix cite: `Z:/repos/deps/repomix/README.md:50-82 @ HEAD b99706131b26b68e0d72aab7f93fccebad1460c0`
Serena cite: `Z:/repos/deps/serena/README.md:17-25 @ HEAD ab98ea676253e7a4efee7bc9f9aa7caf51cc6c52`
GitNexus cite: `Z:/repos/deps/gitnexus/README.md:29-42 @ HEAD 98addbd6c4e7aff77b5c33242d08155afe94ed35`
Axis 1: APPROVE.
It closes the largest Agent B gap.
Axis 2: APPROVE-PARTIAL.
All are upstream, but not all are Anthropic-controlled and licensing/trust differs.
Axis 3: APPROVE-PARTIAL.
HTTP MCPs are easy; local stdio MCPs require binaries, package managers, and smoke tests.
Convergence-gate verdict: APPROVE-PARTIAL.
Install priority: HTTP MCPs first, local stdio MCPs second.

## Secondary Additions
`protect-mcp@claude-code-workflows`.
Use for Cedar policy enforcement and signed tool-call receipts.
Cite: `Z:/repos/deps/wshobson-agents/plugins/protect-mcp/README.md:1-19 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
Verdict: APPROVE-PARTIAL because policies still require local operator-selected policy files.
`review-agent-governance@claude-code-workflows`.
Use for PR/review-surface human approval gates.
Cite: `Z:/repos/deps/wshobson-agents/plugins/review-agent-governance/README.md:25-57 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
Verdict: APPROVE-PARTIAL because approval windows are operational policy.
`hookify@claude-plugins-official`.
Use only when a hook behavior must be expressed through an upstream hook-authoring plugin.
Cite: `Z:/repos/deps/claude-plugins-official/plugins/hookify/README.md:1-15 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
Verdict: APPROVE-PARTIAL because local rule files become operator-selected policy.
`mcp-server-dev@claude-plugins-official`.
Use when building or evaluating MCP servers.
Cite: `Z:/repos/deps/claude-plugins-official/plugins/mcp-server-dev/README.md:1-32 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
Verdict: APPROVE, but not required for first-session runtime use.
Workload-specific plugins.
Install `python-development`, `javascript-typescript`, `backend-development`, `frontend-mobile-development`, `security-scanning`, or `incident-response` only when the first workload needs them.
Cite: `Z:/repos/deps/wshobson-agents/README.md:62-82 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
Verdict: APPROVE-PARTIAL because breadth should be demand-loaded.

## Fresh Bootstrap `CLAUDE.md` Content
Proposed content for `Z:/claude-sota-pure/CLAUDE.md`.
This is a manifest, not a local framework.

````markdown
# CLAUDE.md — claude-sota-pure

## Runtime Intent
Fresh Claude Code runtime composed from upstream plugin marketplaces, upstream MCP servers, and official Claude Code configuration surfaces.

## Official Claude Code Documentation
- Plugins: https://code.claude.com/docs/en/plugins
- MCP: https://code.claude.com/docs/en/mcp
- Hooks: https://code.claude.com/docs/en/hooks
- Settings: https://code.claude.com/docs/en/settings
- Sub-agents: https://code.claude.com/docs/en/sub-agents

## Upstream Marketplace Cite Anchors
- `claude-plugins-official`: `Z:/repos/deps/claude-plugins-official/README.md:1-17 @ HEAD 76b35e91d1c99c090b1a08dade53bcc5e352c1b2`
- `wshobson/agents`: `Z:/repos/deps/wshobson-agents/README.md:7-19 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
- `wshobson/agents` install model: `Z:/repos/deps/wshobson-agents/README.md:44-82 @ HEAD ece811f23310a37ceb43496dbac0e244fe6845b6`
- `context-mode`: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-31 @ HEAD e73a6cd56a4eb0a01794b9187902e3f805515286`
- `superpowers`: `Z:/repos/deps/superpowers/.claude-plugin/plugin.json:1-20 @ HEAD f2cbfbefebbfef77321e4c9abc9e949826bea9d7`
- `addy-agent-skills`: `Z:/repos/deps/addyosmani-agent-skills/README.md:63-136 @ HEAD 4c585c3721a3da180f760a91142d704c9b97c80c`

## Plugin Marketplaces
```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add wshobson/agents
/plugin marketplace add mksglu/context-mode
/plugin marketplace add obra/superpowers
/plugin marketplace add addyosmani/agent-skills
/plugin marketplace add openai/codex-plugin-cc
```

## First-Session Plugin Installs
```text
/plugin install codex@openai-codex
/plugin install context-mode@context-mode
/plugin install superpowers@superpowers
/plugin install agent-skills@addy-agent-skills
/plugin install agent-teams@claude-code-workflows
/plugin install comprehensive-review@claude-code-workflows
/plugin install ralph-loop@claude-plugins-official
```

## Optional Hardening Plugins
```text
/plugin install protect-mcp@claude-code-workflows
/plugin install review-agent-governance@claude-code-workflows
/plugin install hookify@claude-plugins-official
```

## Optional Builder Plugins
```text
/plugin install mcp-server-dev@claude-plugins-official
/plugin install plugin-dev@claude-plugins-official
/plugin install skill-creator@claude-plugins-official
```

## Workload-Specific Plugin Examples
```text
/plugin install python-development@claude-code-workflows
/plugin install javascript-typescript@claude-code-workflows
/plugin install backend-development@claude-code-workflows
/plugin install frontend-mobile-development@claude-code-workflows
/plugin install security-scanning@claude-code-workflows
/plugin install incident-response@claude-code-workflows
```

## MCP Baseline Cite Anchors
- GitHub MCP: `Z:/repos/deps/github-mcp-server/README.md:19-24 @ HEAD 62266f804b1e24b5c22f158c4c79b1db4950967c`
- Context7: `Z:/repos/deps/context7/README.md:19-61 @ HEAD 78b98266954d35da8aa93ad40c67df33a3ff4443`
- Playwright MCP: `Z:/repos/deps/playwright-mcp/README.md:1-18 @ HEAD 8116437ffcfee1309cebc07dd30cee37720d2d19`
- Repomix: `Z:/repos/deps/repomix/README.md:50-82 @ HEAD b99706131b26b68e0d72aab7f93fccebad1460c0`
- Serena: `Z:/repos/deps/serena/README.md:17-25 @ HEAD ab98ea676253e7a4efee7bc9f9aa7caf51cc6c52`
- GitNexus: `Z:/repos/deps/gitnexus/README.md:29-42 @ HEAD 98addbd6c4e7aff77b5c33242d08155afe94ed35`

## MCP Baseline Registration Shape
```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/",
      "headers": { "Authorization": "Bearer ${GITHUB_TOKEN}" }
    },
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp",
      "headers": { "CONTEXT7_API_KEY": "${CONTEXT7_API_KEY}" }
    },
    "deepwiki": {
      "type": "http",
      "url": "https://mcp.deepwiki.com/mcp"
    },
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "repomix": {
      "type": "stdio",
      "command": "npx",
      "args": ["repomix@latest", "--mcp"]
    },
    "serena": {
      "type": "stdio",
      "command": "uvx",
      "args": ["--from", "git+https://github.com/oraios/serena@ab98ea676253e7a4efee7bc9f9aa7caf51cc6c52", "serena", "start-mcp-server", "--context", "claude-code"]
    },
    "gitnexus": {
      "type": "stdio",
      "command": "gitnexus",
      "args": ["mcp"]
    }
  }
}
```

## Environment Toggles
```powershell
$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS = "1"
$env:CLAUDE_AUTOCOMPACT_PCT_OVERRIDE = "50"
```

## First Smoke Checks
```text
/plugin
/team-status
/codex:status
/context-mode:status
```

## External Trust Notes
- `claude-plugins-official` includes internal and external plugins; trust is per plugin homepage and source.
- `wshobson/agents` plugins are upstream marketplace components, not Anthropic-internal plugins.
- MCP servers may require secrets, local binaries, or service daemons.
- License review belongs to each upstream repository.
````

## Bootstrap Content Review
Included:
1. Official docs URLs.
2. Upstream cite anchors.
3. Marketplace registrations.
4. Plugin install commands.
5. MCP registration shape.
6. Environment toggles.
7. Smoke-check commands.
8. Trust notes.
Excluded:
1. Local copied agents.
2. Local copied skills.
3. Local copied hook scripts.
4. Local review policies copied from Option A.
5. Operator-specific named patterns.
6. Any claim that the starter four are complete.

## Plugin Install Order
Priority 0: initialize empty runtime and Claude Code baseline.
Rationale: prove the plugin system works before adding third-party behavior.
Priority 1: add marketplaces.
```text
/plugin marketplace add anthropics/claude-plugins-official
/plugin marketplace add wshobson/agents
/plugin marketplace add mksglu/context-mode
/plugin marketplace add obra/superpowers
/plugin marketplace add addyosmani/agent-skills
/plugin marketplace add openai/codex-plugin-cc
```
Priority 2: install command/review/context baseline.
```text
/plugin install codex@openai-codex
/plugin install context-mode@context-mode
/plugin install superpowers@superpowers
/plugin install agent-skills@addy-agent-skills
```
Priority 3: install team and review specialists.
```text
/plugin install agent-teams@claude-code-workflows
/plugin install comprehensive-review@claude-code-workflows
```
Priority 4: install explicit Stop-loop iteration.
```text
/plugin install ralph-loop@claude-plugins-official
```
Priority 5: register HTTP MCPs.
Register GitHub MCP, Context7, and DeepWiki first.
Priority 6: register local stdio MCPs.
Register Playwright MCP, Repomix, Serena, and GitNexus after local binary checks.
Priority 7: add hardening plugins after baseline behavior is stable.
```text
/plugin install protect-mcp@claude-code-workflows
/plugin install review-agent-governance@claude-code-workflows
/plugin install hookify@claude-plugins-official
```
Priority 8: add workload-specific plugins by first workload, not by default.

## Option A vs Option B
Decision: Option A remains production.
Option B should be built as a measured parallel runtime, not promoted immediately.
Reason 1: Agent B's NEEDS-REVISION verdict means the pure approach is viable but incomplete.
Reason 2: the four-starter set is a clean upstream seed, not a parity runtime.
Reason 3: Option A already has proven local behavior and cold-load reduction results.
Reason 4: Option B's advantage is auditability and lower local invention, but that advantage disappears if gaps are filled by local policy copies.
Reason 5: Option B must mark any no-upstream-primitive gap explicitly instead of re-creating local behavior.
Reason 6: MCP parity is the biggest unresolved operational surface.
Reason 7: full cross-model hook parity is not currently proven by the starter plugin set.
Reason 8: third-party upstream plugins are not the same trust class as Anthropic-internal plugins.
Promotion condition 1: plugin install smoke passes.
Promotion condition 2: HTTP MCP smoke passes.
Promotion condition 3: local stdio MCP smoke passes.
Promotion condition 4: team/review command smoke passes.
Promotion condition 5: context continuity smoke passes.
Promotion condition 6: bounded Stop-loop smoke passes.
Promotion condition 7: hardening plugin smoke passes if enabled.
Promotion condition 8: license/trust review passes for every non-Anthropic primitive.

## Residual Risks
1. `context-mode` is continuity/offload, not proven quality-aware autonomous compaction.
2. `agent-teams` requires experimental feature activation.
3. `comprehensive-review` is command-driven review, not full hook-chain parity.
4. `ralph-loop` needs finite iteration limits.
5. MCPs bring separate binaries, secrets, services, local state, and licenses.
6. Third-party marketplaces can be upstream-sourced without being Anthropic-controlled.
7. `@latest` improves freshness but weakens reproducibility; pin before parity claims.
8. Observability and memory layers should be second wave unless first-session workload requires them.

## Final Recommendation
Build `Z:/claude-sota-pure/`.
Do not claim parity yet.
Keep `Z:/claude-sota-installed/` as production.
Keep pure-runtime local files limited to manifests, settings, and MCP selection.
Install the top five: `context-mode`, `agent-teams`, `comprehensive-review`, `ralph-loop`, and the MCP baseline pack.
Use smoke-test results, not architecture preference, as the promotion gate.

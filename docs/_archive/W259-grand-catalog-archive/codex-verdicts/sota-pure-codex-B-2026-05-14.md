## Codex GPT-5.5 audit verdict
Verdict: NEEDS-REVISION (conf 0.87)

Scope: cross-model audit of plugin and MCP coverage for a fresh runtime at `Z:/claude-sota-pure/` using only upstream SOTA repos and no hand-coded runtime primitives.

Starter marketplace set audited:

1. `claude-plugins-official` from `anthropics/claude-plugins-official`.
2. `claude-code-workflows` from `wshobson/agents`.
3. `addy-agent-skills` from `addyosmani/agent-skills`.
4. `openai-codex` from `openai/codex-plugin-cc`.

Primary local evidence roots:

- `Z:/repos/deps/claude-plugins-official`
- `Z:/repos/deps/superpowers`
- `Z:/repos/deps/wshobson-agents`
- `Z:/repos/deps/addyosmani-agent-skills`
- `Z:/repos/deps/anthropic-cookbook`
- `Z:/repos/deps/claude-code-best-practice-shan`
- `Z:/claude-sota-installed/.claude/plugins/cache`
- `Z:/claude-sota-installed/.mcp.json`

Top-level verdict:

The four-starter marketplace set is a good clean bootstrap, but it is not sufficient for a fresh parallel runtime that claims complete coverage with zero local invention. It provides broad engineering skills, agent-team recipes, command-driven Codex reviews, and one plugin-shipped Stop review gate. It does not provide the full hook chain currently represented by the installed runtime, does not provide a complete MCP fleet, does not provide an official auto-compact-before-rot primitive as a plugin, does not provide comprehensive specialist-agent coverage unless more `wshobson/agents` plugins are installed, and does not eliminate the need for operator-level bootstrap settings.

The recommended path is to keep the four starters, install additional upstream plugins from the same marketplaces plus context/memory-specific marketplaces, and make the bootstrap file explicitly minimal: plugin marketplace registrations, plugin install commands, MCP registrations, and environment toggles only. Do not hand-code agents, rules, or skills into `Z:/claude-sota-pure/`.

## 10 audit-question answers

### Q1. Coverage gap analysis
Verdict: NEEDS-REVISION (conf 0.90)

With only the four starter marketplaces, the fresh runtime is missing these capability classes:

1. Full MCP fleet.
   The starter plugins do not install `github`, `context7`, `deepwiki`, `playwright`, `repomix`, `serena`, `memory`, `graphiti`, `phoenix`, or `gitnexus` as a complete ready-to-run MCP set. The installed runtime's MCP surface is in `.mcp.json`, not in the four starter plugins: GitHub lines 13-19, Context7 lines 20-26, DeepWiki lines 27-30, Playwright lines 31-35, Repomix lines 41-45, Serena lines 46-50, Memory lines 51-59, Graphiti lines 60-94, Phoenix lines 95-99, GitNexus lines 100-104. Cite: `Z:/claude-sota-installed/.mcp.json:12-104`.

2. Official auto-compact-before-rot policy.
   Claude Code has built-in auto-compaction controls, but the starter set does not ship a plugin that proactively compacts at the human-recommended 30-50 percent threshold. CCBP documents `/compact` and auto-compact env knobs: `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` at `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826`, `CLAUDE_CODE_AUTO_COMPACT_WINDOW` at line 967, and `DISABLE_AUTO_COMPACT` at line 968. CCBP also says manual `/compact` with a hint beats letting auto-compact fire at `Z:/repos/deps/claude-code-best-practice-shan/README.md:199`.

3. Full T1-T7 hook chain.
   The `openai-codex` plugin ships slash commands and a Stop hook, but the installed runtime's T1/T2/T3/T4/T5-style hooks are local `.claude/hooks/scripts/*.py` entries in `.claude/settings.json`, not supplied by the plugin itself. Cite: `Z:/claude-sota-installed/.claude/settings.json:75-96`, `Z:/claude-sota-installed/.claude/settings.json:203-233`, `Z:/claude-sota-installed/.claude/settings.json:245-335`, `Z:/claude-sota-installed/.claude/settings.json:388-410`.

4. Broad specialist agents.
   The selected `agent-orchestration` plugin is only a small slice. `wshobson/agents` as a marketplace advertises 185 specialized agents, 16 orchestrators, 153 skills, 100 commands, and 80 plugins. Cite: `Z:/repos/deps/wshobson-agents/README.md:7-19`.

5. Runtime setup and hardening.
   Official plugin structure supports `.mcp.json`, commands, agents, and skills, but the starter set does not by itself define a full per-machine portable launcher, secrets policy, git hook policy, or local state layout. Cite for plugin structure: `Z:/repos/deps/claude-plugins-official/README.md:30-42`.

6. Observability and cost telemetry.
   The starter set lacks Phoenix MCP and ccusage-style runtime telemetry by default. Installed evidence: Phoenix in `.mcp.json` lines 95-99 and ccusage lines 105-109.

7. Codebase semantic navigation.
   Starter plugins do not include GitNexus or Serena by default. Installed evidence: Serena lines 46-50 and GitNexus lines 100-104 in `.mcp.json`.

8. Local persistent memory policy.
   The starter set has no canonical choice between file memory, vector memory, and temporal graph memory. Anthropic cookbook memory is a client-side tool handler, not a Claude Code plugin or MCP fleet install. Cite: `Z:/repos/deps/anthropic-cookbook/tool_use/memory_tool.py:1-19`.

Q1 recommendation:

APPROVE the four marketplaces as seed installs only. NEEDS-REVISION for any claim that they are complete without additional official plugin and MCP installs.

### Q2. Auto-compact mechanism
Verdict: NEEDS-REVISION (conf 0.88)

No plugin in the four starter marketplaces was found that ships a SOTA-grade automatic "compact before context rot" mechanism as a complete Claude Code primitive.

Closest official equivalent:

Claude Code's built-in context management and environment controls are the closest official primitive:

- `/compact [instructions]` compacts conversation with optional focus instructions. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-commands.md:111-112`.
- `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` sets auto-compact threshold percentage. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826`.
- `CLAUDE_CODE_AUTO_COMPACT_WINDOW` changes the context capacity used for compaction calculations. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:967`.
- `DISABLE_AUTO_COMPACT` disables automatic compaction while leaving manual `/compact` available. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:968`.

Where it gaps:

1. Built-in auto-compact is threshold-driven, not quality-driven.
2. It does not inspect task state and choose what to preserve.
3. It does not automatically compact at the 30-50 percent "before quality drop" range unless the operator sets the env threshold.
4. It does not replace manual `/compact` with a focus hint.
5. It is not packaged by any of the four starter plugins.

Closest plugin-adjacent replacement outside the starter four:

`context-mode` advertises "automatic state restore across compactions" and an MCP server that saves context window usage. Cite: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-30`. This is not the same as triggering compaction before rot; it is continuity and context offload.

Q2 recommendation:

Set `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50` in the bootstrap environment if the operator accepts built-in early compaction. Add `context-mode@context-mode` for continuity across compactions. Do not claim a plugin-shipped auto-compact-before-rot mechanism exists in the starter four.

### Q3. Auto-proceed / Stop-hook auto-continue
Verdict: APPROVE-PARTIAL (conf 0.82)

Finding:

The starter set does include a plugin-shipped Stop hook pattern in `codex@openai-codex`, but it is a stop-time review gate, not a generic auto-continue loop using `additionalContext`.

Evidence:

- `openai-codex` plugin `hooks.json` wires `SessionStart`, `SessionEnd`, and `Stop`. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:3-37`.
- The Stop hook runs `stop-review-gate-hook.mjs`. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-33`.
- The Stop hook emits JSON with `decision: "block"` on failed review. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:177-182`.
- The Stop prompt contract returns `ALLOW` or `BLOCK`. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/prompts/stop-review-gate.md:14-25`.

Gap:

I found no `additionalContext` output in the `openai-codex` plugin Stop hook. Search evidence found `decision: "block"` but not `additionalContext` in the plugin scripts. The hook blocks with `reason`, not a continuation prompt payload. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:179-182`.

Closest official plugin equivalent:

`ralph-loop@claude-plugins-official` is an Anthropic marketplace plugin that uses a Stop hook to block exit and feed the same prompt back inside the session:

- README describes Stop hook intercepting exit attempts. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:13-27`.
- It repeats until a completion promise is met. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:19-27`.
- It advises `--max-iterations` as a safety net. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:119-134`.

Q3 recommendation:

Install `ralph-loop@claude-plugins-official` if the operator wants official Stop-hook auto-iteration. Use `codex@openai-codex` Stop hook for review gating, not auto-proceed. HNF for `additionalContext` specifically: no evidence in the four starter plugin files inspected.

### Q4. Multi-agent orchestration
Verdict: NEEDS-REVISION (conf 0.89)

`agent-orchestration@claude-code-workflows` alone is not enough for the operator's apparent need.

Evidence:

- `agent-orchestration` includes a `multi-agent-optimize` command that describes general multi-agent coordination, performance profiling, context window optimization, and example pseudo-code. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-orchestration/1.2.1/commands/multi-agent-optimize.md:1-16`, `:69-121`.
- It includes only one local agent file in this plugin slice: `context-manager.md`. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-orchestration/1.2.1/agents/context-manager.md:75-93`.
- `agent-teams@claude-code-workflows` is the stronger orchestration plugin. It explicitly covers parallel review, debugging, feature development, research, security, migration, coordination, and communication. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:43-85`.
- `agent-teams` requires the experimental Agent Teams feature and teammate display mode. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:7-27`.
- The wider `wshobson/agents` repo provides much more breadth: 185 agents, 16 workflow orchestrators, 153 skills, 100 commands, and 80 plugins. Cite: `Z:/repos/deps/wshobson-agents/README.md:7-19`.

Conclusion:

`agent-orchestration` is a conceptual optimization and context plugin. It does not by itself provide the broad specialized agent team the operator is using today. Add `agent-teams@claude-code-workflows` and then install focused `wshobson/agents` plugins by need: `comprehensive-review`, `backend-development`, `frontend-mobile-development`, `python-development`, `javascript-typescript`, `security-scanning`, `incident-response`, and `full-stack-orchestration`.

Q4 recommendation:

Do not add a hand-coded 90-agent directory. Instead, install the relevant upstream `wshobson/agents` plugins. The marketplace itself is the official source in this audit context.

### Q5. Cross-model T1-T7 hook chain
Verdict: REJECT for "all wired by plugin itself" (conf 0.91)

The `codex@openai-codex` plugin does not wire the entire T1-T7 chain by itself.

What the plugin itself wires:

- `SessionStart`
- `SessionEnd`
- `Stop`

Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:3-37`.

What the plugin provides as slash commands:

- `/codex:review` runs a local git-state review. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/review.md:1-16`.
- `/codex:review` supports foreground and background execution. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/review.md:18-61`.
- `/codex:adversarial-review` challenges implementation approach and design choices. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/adversarial-review.md:1-19`.
- `/codex:adversarial-review` supports foreground and background execution. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/adversarial-review.md:21-66`.

What is local and not plugin-supplied:

- Pre-edit consult gate in installed runtime: `codex_t1_consult_gate.py`. Cite: `Z:/claude-sota-installed/.claude/settings.json:75-96`.
- Commit-time/pre-commit gate: `codex_t2_pre_commit_gate.py`. Cite: `Z:/claude-sota-installed/.claude/settings.json:203-233`.
- Post-commit review: `codex_postcommit_review.py`. Cite: `Z:/claude-sota-installed/.claude/settings.json:245-286`.
- Pre-push review: `codex_prepush_review.py`. Cite: `Z:/claude-sota-installed/.claude/settings.json:293-328`.
- Plan-stage gate: `codex_t5_plan_review_gate.py`. Cite: `Z:/claude-sota-installed/.claude/settings.json:88-96`.
- Ask-without-act behavior is not represented as a plugin hook in `hooks.json`; it must be implemented as operator instructions or a separate upstream command/skill.
- Stop gate is plugin-provided. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-33`.

Q5 recommendation:

For a zero self-invented fresh runtime, do not copy local hook scripts. Use `codex@openai-codex` for official command-driven review plus Stop gate. If full T1-T7 is mandatory, either locate an upstream plugin that explicitly ships those hooks or lower the requirement to official `codex` command surfaces.

### Q6. Anthropic-official cookbook runnable patterns
Verdict: APPROVE-PARTIAL (conf 0.84)

`multimodal/using_sub_agents.ipynb`:

Runnable pattern: yes, as an API/Jupyter recipe. It is not a Claude Code plugin, agent, or hook.

Evidence:

- Notebook states it demonstrates using Haiku sub-agent models to extract information from earnings PDFs and Opus to generate a response and graph. Cite: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:7-9`.
- It installs dependencies with `%pip install anthropic IPython PyMuPDF matplotlib`. Cite: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:17-26`.
- It uses `from anthropic import Anthropic` and `client = Anthropic()`. Cite: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:43-47`.
- It uses Opus to create prompts for sub-agents. Cite: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:106-142`.
- It uses Haiku sub-agent model calls to process PDFs. Cite: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:238-247`.
- It then calls Opus to answer and generate matplotlib code. Cite: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:264-337`.

Wire-able into `Z:/claude-sota-pure/`:

- As a cookbook reference for an API script.
- As a custom skill only if packaged through upstream `skill-creator` or imported from an official skill repository.
- Not directly wire-able as a plugin command without creating a new plugin wrapper.

`managed_agents/*`:

Runnable pattern: yes, as managed-agent notebooks and supporting Python utilities. Not directly a Claude Code plugin.

Evidence:

- The repo has `managed_agents/README.md`, `pyproject.toml`, utilities, notebooks, and example data. Cite inventory: `Z:/repos/deps/anthropic-cookbook/managed_agents/README.md`, `Z:/repos/deps/anthropic-cookbook/managed_agents/pyproject.toml`, and notebooks found under `Z:/repos/deps/anthropic-cookbook/managed_agents/*.ipynb`.
- Example runnable notebooks include `sre_incident_responder.ipynb`, `slack_data_bot.ipynb`, `data_analyst_agent.ipynb`, and CMA workflow notebooks. Cite inventory from `rg --files Z:/repos/deps/anthropic-cookbook | rg "managed_agents"` output in this audit.
- Example data includes SRE alerts/runbooks, Slack app manifest/thread image, gate policy/receipts, iterate tests, and orchestrate issue/source/tests. Cite inventory paths under `Z:/repos/deps/anthropic-cookbook/managed_agents/example_data`.

`claude_agent_sdk/*`:

Runnable pattern: yes, as SDK examples. Not plugin-wired by default.

Evidence:

- The repo contains SDK notebooks `00_The_one_liner_research_agent.ipynb` through `05_Building_a_session_browser.ipynb` and more in the `claude-cookbooks` mirror. Cite inventory from `rg --files Z:/repos/deps/anthropic-cookbook | rg "claude_agent_sdk"`.
- It includes runnable agent Python modules such as `research_agent/agent.py`, `observability_agent/agent.py`, `chief_of_staff_agent/agent.py`, and SRE MCP server examples. Cite inventory from same command.

Q6 recommendation:

Use cookbook notebooks as official upstream design and code references. Treat them as runnable API examples, not as installable Claude Code runtime primitives. For zero self-invented runtime, install official plugins and skills; do not manually port notebooks into local rules unless packaging them as an upstream plugin or skill.

### Q7. Risk assessment of fresh-runtime zero self-invented approach
Verdict: NEEDS-REVISION (conf 0.90)

Q7a. Is there any official SOTA pattern for compact-self near threshold?

There is an official built-in auto-compaction mechanism and official manual `/compact`, but I found no starter-plugin-shipped compact-self policy that proactively compacts before degradation.

Evidence:

- Manual `/compact` exists. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-commands.md:111-112`.
- Auto-compact threshold env exists. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826`.
- Auto-compact window env exists. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:967`.
- Community/operator best practice recommends manual compact earlier than built-in auto-compact. Cite: `Z:/repos/deps/claude-code-best-practice-shan/README.md:196-200`.

Q7b. Does the official plugin ecosystem cover all current needs?

No. It covers many primitives but not all operator-specific policy. The official plugin marketplace itself warns that Anthropic does not control third-party plugin internals and cannot verify future behavior. Cite: `Z:/repos/deps/claude-plugins-official/README.md:3-5`.

Major risks:

1. "Zero self-invented" can become "under-specified" unless bootstrap settings declare exact marketplace, plugin, MCP, and env choices.
2. Third-party plugins are upstream, but not automatically equivalent to Anthropic-official primitives.
3. MCPs are separate runtime dependencies and must be pinned, configured, and smoke-tested.
4. Full T1-T7 hook coverage cannot be claimed from `codex@openai-codex` alone.
5. The four starter set lacks a canonical memory strategy.

Q7 recommendation:

Use zero local agents/rules/skills as the goal, but allow a minimal bootstrap manifest containing only official install commands and settings. This is not inventing primitives; it is selecting upstream primitives.

### Q8. Auto-launch agent team
Verdict: NEEDS-REVISION (conf 0.86)

With no standing directive, Claude will not reliably fan out automatically merely because plugins exist. The operator must either:

1. Ask directly: "Use agent teams for this task."
2. Use plugin commands like `/team-review`, `/team-debug`, `/team-feature`, or `/team-spawn`.
3. Install and enable a plugin that defines team commands and team-lead behavior.
4. Use official Agent Teams feature settings where available.

Evidence:

- `agent-teams` requires enabling the experimental feature. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:7-13`.
- It documents display modes in settings. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:15-27`.
- It provides commands for spawning, status, shutdown, review, debugging, feature work, and delegation. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:55-65`.
- It documents example invocations for review, debugging, feature development, research, security, and migration. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:89-135`.

Closest plugin-shipped equivalent:

`agent-teams@claude-code-workflows`, not `agent-orchestration` alone.

Q8 recommendation:

Install `agent-teams@claude-code-workflows` and use command-triggered fan-out. For automatic fan-out on natural-language tasks, rely on the model's native agent-selection behavior plus concise bootstrap instruction in `AGENTS.md`; do not create local agent-team rules.

### Q9. Memory persistence across sessions
Verdict: NEEDS-REVISION (conf 0.85)

Canonical choice depends on the memory type:

1. Anthropic-shipped memory primitive:
   The cookbook includes a production-ready client-side memory tool handler for Claude's `memory_20250818` tool. It is file-like memory under `/memories`, with path validation and command handling. Cite: `Z:/repos/deps/anthropic-cookbook/tool_use/memory_tool.py:1-19`, `:37-74`, `:76-117`.

2. `doobidoo/mcp-memory-service`:
   Best canonical choice for local semantic memory MCP if the operator wants durable local vector-backed recall. Installed config uses `sqlite_vec`. Cite: `Z:/claude-sota-installed/.mcp.json:51-59`. Local repo HEAD: `Z:/repos/deps/mcp-memory-service @ 7c697327eb48`, license file present.

3. Graphiti:
   Best canonical choice for temporal knowledge graph and relationship memory. Installed config runs Graphiti with FalkorDB and explicit model/embedder settings. Cite: `Z:/claude-sota-installed/.mcp.json:60-94`. Local repo HEAD: `Z:/repos/deps/graphiti @ c42761504467`, license file present.

4. `context-mode`:
   Best for context-window continuity and state restore, not a replacement for knowledge graph or semantic memory. Cite: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-30`.

Recommendation:

Use layered memory:

- Anthropic memory tool pattern as the official reference for file-scoped memory semantics.
- `mcp-memory-service` for local semantic memory.
- Graphiti for temporal/relational memory.
- `context-mode` for context offload and restore.

Do not call any one of these universally canonical. They solve different layers.

### Q10. Additional plugins beyond the four starter set
Verdict: APPROVE with install-order revisions (conf 0.83)

Axis definitions used:

- Axis-1: multi-org convergence - same capability appears in at least three independent upstream orgs or ecosystems.
- Axis-2: named practitioner / named maintainer evidence - plugin or repo has a named maintainer, org, or practitioner provenance in local metadata.
- Axis-3: stability - installable from a repo/marketplace with local HEAD and not merely a local hand-coded primitive; prefer pinned version or explicit marketplace install.

Top recommendation:

Install additional plugins from upstream marketplaces, not copied local files. `claude-plugins-official` documents direct marketplace install syntax at `Z:/repos/deps/claude-plugins-official/README.md:12-18`. `wshobson/agents` documents marketplace add/install at `Z:/repos/deps/wshobson-agents/README.md:44-82`. `addyosmani/agent-skills` documents marketplace install at `Z:/repos/deps/addyosmani-agent-skills/README.md:41-52`.

Detailed top-10 plugin table appears below.

## Coverage-gap matrix

| Capability | Starter-marketplace coverage | Gap | Closest SOTA replacement | Cite |
|---|---|---|---|---|
| Software dev methodology | `superpowers` plus Addy skills | Good seed but not full runtime policy | `superpowers@claude-plugins-official` plus `agent-skills@addy-agent-skills` | `Z:/repos/deps/superpowers/README.md:3-19`; `Z:/repos/deps/addyosmani-agent-skills/README.md:1-32` |
| Skill creation | `skill-creator` | Covered | `skill-creator@claude-plugins-official` | `Z:/repos/deps/claude-plugins-official/README.md:30-42` |
| Lifecycle commands | Addy skills commands | Covered for spec-plan-build-test-review-ship | `agent-skills@addy-agent-skills` | `Z:/repos/deps/addyosmani-agent-skills/README.md:18-32` |
| Multi-agent teams | `agent-orchestration` partial | Needs actual team command plugin | `agent-teams@claude-code-workflows` | `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:43-85` |
| Specialist agents | Minimal in starter subset | Need focused wshobson plugins | `comprehensive-review`, `python-development`, `javascript-typescript`, etc. | `Z:/repos/deps/wshobson-agents/README.md:7-19` |
| Stop review gate | `codex@openai-codex` | Covered only for Stop review | `codex@openai-codex` | `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-33` |
| Full cross-model hook chain | Partial | T1/T2/T3/T4/T5 local hooks not plugin-shipped | Use Codex commands or find upstream hook plugin | `Z:/claude-sota-installed/.claude/settings.json:75-96`; `:203-335` |
| Auto-continue Stop loop | Not in four starter subset unless installing more official plugins | Missing `additionalContext`; generic loop missing | `ralph-loop@claude-plugins-official` | `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:13-27` |
| Auto-compact-before-rot | Not covered | Built-in env only; no starter plugin policy | Built-in env + `context-mode` | `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826`; `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-30` |
| MCP server development | Not in named starter subset unless installing more official plugins | Missing MCP building guidance | `mcp-server-dev@claude-plugins-official` | `Z:/repos/deps/claude-plugins-official/README.md:30-42` |
| Plugin development | Not in named starter subset unless installed | Missing plugin authoring guidance | `plugin-dev@claude-plugins-official` | `Z:/repos/deps/claude-plugins-official/README.md:30-42` |
| Code review agents | Codex review command, Addy 3 agents | Good seed, but not broad | `comprehensive-review@claude-code-workflows`; `code-review@claude-plugins-official` | `Z:/repos/deps/wshobson-agents/docs/agents.md:113-123` |
| Security agents | Addy security skill and agents | Partial | `security-scanning@claude-code-workflows` | `Z:/repos/deps/wshobson-agents/docs/plugins.md:73-89`; `Z:/repos/deps/wshobson-agents/docs/agents.md:117-123` |
| UI/frontend | Addy frontend skill | Partial | `frontend-mobile-development@claude-code-workflows`; `frontend-design@claude-plugins-official` | `Z:/repos/deps/wshobson-agents/docs/plugins.md:47-61` |
| Backend/API | Addy API skill | Partial | `backend-development@claude-code-workflows` | `Z:/repos/deps/wshobson-agents/docs/plugins.md:37-45` |
| Python | Not covered as specialist plugin | Missing Python specialist agents | `python-development@claude-code-workflows` | `Z:/repos/deps/wshobson-agents/README.md:64-68` |
| JS/TS | Not covered as specialist plugin unless official LSP installed separately | Missing JS/TS agents and LSP | `javascript-typescript@claude-code-workflows`, `typescript-lsp@claude-plugins-official` | `Z:/repos/deps/wshobson-agents/README.md:64-68` |
| Local semantic memory | Not in starter set | Missing semantic memory MCP | `mcp-memory-service` | `Z:/claude-sota-installed/.mcp.json:51-59` |
| Temporal graph memory | Not in starter set | Missing relationship memory | Graphiti MCP | `Z:/claude-sota-installed/.mcp.json:60-94` |
| Context offload | Not in starter set | Missing context continuity MCP | `context-mode@context-mode` | `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-30` |
| Browser automation | Not in starter set | Missing e2e browser MCP | Playwright MCP | `Z:/claude-sota-installed/.mcp.json:31-35` |
| Repo packing | Not in starter set | Missing codebase compression | Repomix MCP | `Z:/claude-sota-installed/.mcp.json:41-45` |
| Code semantic navigation | Not in starter set | Missing LSP/semantic MCPs | Serena + GitNexus | `Z:/claude-sota-installed/.mcp.json:46-50`; `:100-104` |
| Observability | Not in starter set | Missing trace/eval MCP | Phoenix MCP | `Z:/claude-sota-installed/.mcp.json:95-99` |

## Plugin install priority (top-10 beyond starter set)

| Rank | Plugin | Marketplace | Axis-1 | Axis-2 | Axis-3 | Install command |
|---:|---|---|---|---|---|---|
| 1 | `context-mode` | `context-mode` | PASS: context offload appears in Claude built-ins, CCBP, and context-mode | PASS: named maintainer in plugin metadata | PASS: local HEAD `e73a6cd56a4e`, plugin metadata | `/plugin marketplace add mksglu/context-mode`; `/plugin install context-mode@context-mode` |
| 2 | `agent-teams` | `claude-code-workflows` | PASS: Anthropic Agent Teams, wshobson orchestration, cookbook sub-agent patterns | PASS: wshobson marketplace | PASS: installed version 1.0.2 in cache | `/plugin install agent-teams@claude-code-workflows` |
| 3 | `comprehensive-review` | `claude-code-workflows` | PASS: Codex review, Addy review skill, wshobson review agents | PASS: wshobson marketplace | PASS: installed version 1.3.0 in cache | `/plugin install comprehensive-review@claude-code-workflows` |
| 4 | `ralph-loop` | `claude-plugins-official` | PASS: Stop hooks, continuous loops, command automation | PASS: Anthropic marketplace | PASS: installed version 1.0.0 in cache | `/plugin install ralph-loop@claude-plugins-official` |
| 5 | `mcp-server-dev` | `claude-plugins-official` | PASS: MCP SDK, Apps SDK, plugin structure | PASS: Anthropic marketplace | PASS: installed cache observed | `/plugin install mcp-server-dev@claude-plugins-official` |
| 6 | `hookify` | `claude-plugins-official` | PASS: Claude hooks, safety policies, plugin rules | PASS: Anthropic marketplace | PASS: installed cache observed | `/plugin install hookify@claude-plugins-official` |
| 7 | `code-review` | `claude-plugins-official` | PASS: Codex review, wshobson review, Anthropic review plugin | PASS: Anthropic marketplace | PASS: installed cache observed | `/plugin install code-review@claude-plugins-official` |
| 8 | `typescript-lsp` | `claude-plugins-official` | PASS: LSP, TypeScript specialist agents, compiler tooling | PASS: Anthropic marketplace | PASS: installed version 1.0.0 in cache | `/plugin install typescript-lsp@claude-plugins-official` |
| 9 | `backend-development` | `claude-code-workflows` | PASS: Addy API skill, wshobson backend agents, cookbook agent patterns | PASS: wshobson marketplace | PASS: local marketplace repo HEAD `ece811f23310` | `/plugin install backend-development@claude-code-workflows` |
| 10 | `python-development` | `claude-code-workflows` | PASS: Python specialist agents, cookbook Python examples, Addy skills | PASS: wshobson marketplace | PASS: local marketplace repo HEAD `ece811f23310` | `/plugin install python-development@claude-code-workflows` |

Plugin priority notes:

- `context-mode` is outside the four starters but is the highest-value context continuity plugin. Cite: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-30`.
- `agent-teams` is preferable to only `agent-orchestration` for actual fan-out commands. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:55-85`.
- `ralph-loop` is the closest official Stop-hook auto-iteration plugin. Cite: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:13-27`.
- `wshobson/agents` marketplace avoids copying local agents directly. Cite: `Z:/repos/deps/wshobson-agents/README.md:32-40`, `:82-100`.

## MCP install priority (top-10)

| Rank | MCP | Repo + HEAD SHA | License | Install command | Why |
|---:|---|---|---|---|---|
| 1 | Context7 | `Z:/repos/deps/context7 @ 78b98266954d` | LICENSE present | HTTP config: `https://mcp.context7.com/mcp` | Current docs lookup; installed config lines 20-26 |
| 2 | GitHub readonly MCP | `Z:/repos/deps/github-mcp-server @ 62266f804b1e` | LICENSE present | HTTP config: `https://api.githubcopilot.com/mcp/readonly` | Repo and PR context; installed config lines 13-19 |
| 3 | DeepWiki | `Z:/repos/deps/asyncfuncai__deepwiki-open @ 5b43df5464ea` | LICENSE present | HTTP config: `https://mcp.deepwiki.com/mcp` | Repository wiki research; installed config lines 27-30 |
| 4 | Playwright MCP | `Z:/repos/deps/playwright-mcp @ 8116437ffcfe` | LICENSE present | `node .../@playwright/mcp/cli.js` | Browser automation and UI verification; installed config lines 31-35 |
| 5 | Repomix MCP | `Z:/repos/deps/repomix @ b99706131b26` | LICENSE present | `node .../repomix/bin/repomix.cjs --mcp` | Codebase packing/compression; installed config lines 41-45 |
| 6 | Serena | `Z:/repos/deps/serena @ ab98ea676253` | LICENSE present | `uvx --from git+https://github.com/oraios/serena@<pin> serena start-mcp-server --context claude-code` | Semantic code navigation; installed config lines 46-50 |
| 7 | MCP Memory Service | `Z:/repos/deps/mcp-memory-service @ 7c697327eb48` | LICENSE present | `memory.exe server` with sqlite_vec env | Local semantic memory; installed config lines 51-59 |
| 8 | Graphiti | `Z:/repos/deps/graphiti @ c42761504467` | LICENSE present | `uv run ... main.py --transport stdio --database-provider falkordb` | Temporal knowledge graph; installed config lines 60-94 |
| 9 | Phoenix MCP | `Z:/repos/deps/phoenix @ 419c3a06978a` | LICENSE present | `node .../@arizeai/phoenix-mcp/build/index.js --baseUrl ...` | Observability and tracing; installed config lines 95-99 |
| 10 | GitNexus | `Z:/repos/deps/gitnexus @ 98addbd6c4e7` | LICENSE present | `gitnexus mcp` | Code intelligence, impact analysis, detect changes; installed config lines 100-104 |

MCP priority notes:

- The four starter plugins do not supply this fleet automatically.
- The fresh runtime should declare MCPs separately from plugins.
- Prefer HTTP MCPs for hosted services and pinned stdio commands for local packages.
- Smoke probe each MCP with `/mcp` after install and disable any server that cannot start in under the operator's acceptable startup budget.

## Risk surfaces

### Risk 1. Under-covered runtime due to zero local rules

Zero self-invented primitives reduce drift, but they also remove operator policies that are not available in upstream packages. The biggest examples are early compaction policy, complete cross-model hook lifecycle, local safety hardening, and exact MCP selection.

Evidence:

- Built-in compaction controls exist but no starter plugin policy was found. Cite: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826`, `:967-968`.
- Full local hook chain exists in `.claude/settings.json`, not in `openai-codex` plugin hooks. Cite: `Z:/claude-sota-installed/.claude/settings.json:75-96`, `:203-335`.

Mitigation:

Use a minimal bootstrap manifest and upstream installs. Do not copy hook scripts unless an upstream plugin owns them.

### Risk 2. Plugin trust and third-party drift

Anthropic's official plugin directory says it is curated, but warns that Anthropic does not control included MCP servers/files/software and cannot verify future behavior for every plugin.

Cite: `Z:/repos/deps/claude-plugins-official/README.md:3-5`.

Mitigation:

Pin plugin versions where possible, record source repo and HEAD, and run a first-fire smoke probe.

### Risk 3. MCP fleet operational fragility

MCPs require secrets, local services, network access, and sometimes external daemons. The fresh runtime will fail if it assumes the plugin system alone provides memory, graph, browser, docs, and observability.

Evidence:

- Graphiti config depends on FalkorDB and local OpenAI-compatible endpoints. Cite: `Z:/claude-sota-installed/.mcp.json:60-94`.
- Memory config depends on local `memory.exe` and sqlite path. Cite: `Z:/claude-sota-installed/.mcp.json:51-59`.
- Phoenix depends on local base URL. Cite: `Z:/claude-sota-installed/.mcp.json:95-99`.

Mitigation:

Install MCPs in tiers: hosted docs/repo first, local code tools second, memory/graph third, observability fourth.

## Recommendation to architect

### Build-order sequence

1. Create `Z:/claude-sota-pure/`.
2. Add only bootstrap docs and settings required to install upstream primitives.
3. Register marketplaces:
   - `anthropics/claude-plugins-official`
   - `wshobson/agents`
   - `addyosmani/agent-skills`
   - `openai/codex-plugin-cc`
   - `mksglu/context-mode`
4. Install starter plugins:
   - `superpowers@claude-plugins-official`
   - `skill-creator@claude-plugins-official`
   - `agent-skills@addy-agent-skills`
   - `context-management@claude-code-workflows`
   - `agent-orchestration@claude-code-workflows`
   - `review-agent-governance@claude-code-workflows`
   - `codex@openai-codex`
5. Install recommended additions:
   - `context-mode@context-mode`
   - `agent-teams@claude-code-workflows`
   - `comprehensive-review@claude-code-workflows`
   - `ralph-loop@claude-plugins-official`
   - `mcp-server-dev@claude-plugins-official`
   - `hookify@claude-plugins-official`
   - `code-review@claude-plugins-official`
   - `typescript-lsp@claude-plugins-official`
   - `backend-development@claude-code-workflows`
   - `python-development@claude-code-workflows`
6. Register MCPs in the order in the MCP install priority table.
7. Set early compaction env using official Claude Code env variables.
8. Run first-fire smoke probe.

### Bootstrap file content

Keep bootstrap content narrow:

1. Project identity and source-of-truth statement.
2. Marketplace add commands.
3. Plugin install commands.
4. MCP config install commands and required env placeholders.
5. Official env knobs:
   - `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=50`
   - optional `CLAUDE_CODE_AUTO_COMPACT_WINDOW=<tokens>`
   - `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` if using `agent-teams`
6. Smoke probe checklist.
7. No hand-coded rules, agents, skills, or copied hook scripts.

### Plugin install order

1. `superpowers@claude-plugins-official`
2. `skill-creator@claude-plugins-official`
3. `agent-skills@addy-agent-skills`
4. `codex@openai-codex`
5. `context-management@claude-code-workflows`
6. `agent-orchestration@claude-code-workflows`
7. `review-agent-governance@claude-code-workflows`
8. `context-mode@context-mode`
9. `agent-teams@claude-code-workflows`
10. `comprehensive-review@claude-code-workflows`
11. `ralph-loop@claude-plugins-official`
12. `mcp-server-dev@claude-plugins-official`
13. `hookify@claude-plugins-official`
14. `code-review@claude-plugins-official`
15. Language/domain plugins by project need.

### First-fire smoke probe

1. Run `/plugin` and confirm all marketplaces are visible.
2. Run `/mcp` and confirm hosted MCPs connect:
   - GitHub
   - Context7
   - DeepWiki
3. Confirm local MCPs start:
   - Playwright
   - Repomix
   - Serena
4. Confirm memory tier:
   - memory MCP can write/read a test note.
   - Graphiti can create and query a small test entity.
5. Confirm Codex plugin:
   - `/codex:setup`
   - `/codex:review --wait` on a tiny scratch diff.
   - Enable Stop review gate only after setup passes.
6. Confirm team orchestration:
   - `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
   - `/team-spawn research --name smoke-research`
   - `/team-status`
   - `/team-shutdown`
7. Confirm compaction controls:
   - `/context`
   - verify env has `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`.
8. Confirm no local primitive drift:
   - list `.claude/agents`, `.claude/skills`, `.claude/commands`, `.claude/hooks`.
   - every file should be plugin-provided or bootstrap-only.

## Audit evidence appendix

001. Starter plugin completeness is rejected because `.mcp.json` carries MCPs outside the four plugin installs.
002. GitHub MCP evidence: `Z:/claude-sota-installed/.mcp.json:13-19`.
003. Context7 MCP evidence: `Z:/claude-sota-installed/.mcp.json:20-26`.
004. DeepWiki MCP evidence: `Z:/claude-sota-installed/.mcp.json:27-30`.
005. Playwright MCP evidence: `Z:/claude-sota-installed/.mcp.json:31-35`.
006. Repomix MCP evidence: `Z:/claude-sota-installed/.mcp.json:41-45`.
007. Serena MCP evidence: `Z:/claude-sota-installed/.mcp.json:46-50`.
008. Memory MCP evidence: `Z:/claude-sota-installed/.mcp.json:51-59`.
009. Graphiti MCP evidence: `Z:/claude-sota-installed/.mcp.json:60-94`.
010. Phoenix MCP evidence: `Z:/claude-sota-installed/.mcp.json:95-99`.
011. GitNexus MCP evidence: `Z:/claude-sota-installed/.mcp.json:100-104`.
012. Superpowers methodology evidence: `Z:/repos/deps/superpowers/README.md:3-19`.
013. Superpowers official Claude install evidence: `Z:/repos/deps/superpowers/README.md:35-45`.
014. Superpowers plugin metadata evidence: `Z:/repos/deps/superpowers/.claude-plugin/plugin.json:1-20`.
015. Addy lifecycle command evidence: `Z:/repos/deps/addyosmani-agent-skills/README.md:18-32`.
016. Addy marketplace install evidence: `Z:/repos/deps/addyosmani-agent-skills/README.md:41-52`.
017. Addy plugin metadata evidence: `Z:/repos/deps/addyosmani-agent-skills/.claude-plugin/plugin.json:1-18`.
018. Official plugin marketplace warning evidence: `Z:/repos/deps/claude-plugins-official/README.md:3-5`.
019. Official plugin install evidence: `Z:/repos/deps/claude-plugins-official/README.md:12-18`.
020. Official plugin structure evidence: `Z:/repos/deps/claude-plugins-official/README.md:30-42`.
021. `wshobson/agents` breadth evidence: `Z:/repos/deps/wshobson-agents/README.md:7-19`.
022. `wshobson/agents` minimal loading evidence: `Z:/repos/deps/wshobson-agents/README.md:32-40`.
023. `wshobson/agents` marketplace add evidence: `Z:/repos/deps/wshobson-agents/README.md:44-52`.
024. `wshobson/agents` plugin install evidence: `Z:/repos/deps/wshobson-agents/README.md:54-82`.
025. `wshobson/agents` plugin-vs-agent evidence: `Z:/repos/deps/wshobson-agents/README.md:84-100`.
026. `wshobson/agents` essential plugins evidence: `Z:/repos/deps/wshobson-agents/docs/plugins.md:7-35`.
027. Backend plugin evidence: `Z:/repos/deps/wshobson-agents/docs/plugins.md:37-45`.
028. Frontend/mobile plugin evidence: `Z:/repos/deps/wshobson-agents/docs/plugins.md:47-61`.
029. Testing plugin evidence: `Z:/repos/deps/wshobson-agents/docs/plugins.md:63-71`.
030. Ops plugin evidence: `Z:/repos/deps/wshobson-agents/docs/plugins.md:73-89`.
031. Review/security agent evidence: `Z:/repos/deps/wshobson-agents/docs/agents.md:113-123`.
032. Debug/test agent evidence: `Z:/repos/deps/wshobson-agents/docs/agents.md:124-132`.
033. Performance/observability agent evidence: `Z:/repos/deps/wshobson-agents/docs/agents.md:133-140`.
034. Context command `/compact` evidence: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-commands.md:111-112`.
035. Context window status evidence: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:673-677`.
036. Auto-compact threshold env evidence: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:826`.
037. Auto-compact window env evidence: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:967`.
038. Disable auto-compact env evidence: `Z:/repos/deps/claude-code-best-practice-shan/best-practice/claude-settings.md:968`.
039. Context rot guidance evidence: `Z:/repos/deps/claude-code-best-practice-shan/README.md:196-200`.
040. Context-mode plugin metadata evidence: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:1-30`.
041. Codex plugin hook evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:3-37`.
042. Codex Stop hook evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json:26-33`.
043. Codex review command evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/review.md:1-16`.
044. Codex review execution evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/review.md:18-61`.
045. Codex adversarial command evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/adversarial-review.md:1-19`.
046. Codex adversarial execution evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/commands/adversarial-review.md:21-66`.
047. Codex Stop review prompt evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/prompts/stop-review-gate.md:1-12`.
048. Codex Stop output contract evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/prompts/stop-review-gate.md:14-25`.
049. Codex Stop grounding evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/prompts/stop-review-gate.md:28-36`.
050. Codex Stop hook parse evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:69-96`.
051. Codex Stop hook run evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:98-140`.
052. Codex Stop hook decision evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/stop-review-gate-hook.mjs:177-182`.
053. Codex setup report evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs:179-210`.
054. Codex setup enable gate evidence: `Z:/claude-sota-installed/.claude/plugins/cache/openai-codex/codex/1.0.4/scripts/codex-companion.mjs:212-235`.
055. Local pre-edit hook evidence: `Z:/claude-sota-installed/.claude/settings.json:75-96`.
056. Local commit hook evidence: `Z:/claude-sota-installed/.claude/settings.json:203-233`.
057. Local post-commit hook evidence: `Z:/claude-sota-installed/.claude/settings.json:245-286`.
058. Local pre-push hook evidence: `Z:/claude-sota-installed/.claude/settings.json:293-328`.
059. Local Stop hook evidence: `Z:/claude-sota-installed/.claude/settings.json:388-410`.
060. Local plugin enable evidence: `Z:/claude-sota-installed/.claude/settings.json:553`.
061. Agent-teams purpose evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:1-4`.
062. Agent-teams env evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:7-13`.
063. Agent-teams display setting evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:15-27`.
064. Agent-teams install evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:29-41`.
065. Agent-teams features evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:43-53`.
066. Agent-teams commands evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:55-65`.
067. Agent-teams agents evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:67-75`.
068. Agent-teams skills evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:76-85`.
069. Agent-teams review example evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:89-95`.
070. Agent-teams debug example evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:97-103`.
071. Agent-teams feature example evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:105-111`.
072. Agent-teams research example evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:113-119`.
073. Agent-teams security example evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:121-127`.
074. Agent-teams migration example evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-teams/1.0.2/README.md:129-135`.
075. Agent-orchestration capabilities evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-orchestration/1.2.1/commands/multi-agent-optimize.md:1-16`.
076. Agent-orchestration context optimization evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-orchestration/1.2.1/commands/multi-agent-optimize.md:69-89`.
077. Agent-orchestration framework evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/agent-orchestration/1.2.1/commands/multi-agent-optimize.md:91-121`.
078. Context-management agent memory evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/context-management/1.2.0/agents/context-manager.md:47-63`.
079. Context-management multi-agent evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/context-management/1.2.0/agents/context-manager.md:75-83`.
080. Context-management quality evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-code-workflows/context-management/1.2.0/agents/context-manager.md:85-93`.
081. Ralph-loop Stop hook evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:13-27`.
082. Ralph-loop self-reference evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:29-33`.
083. Ralph-loop quickstart evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:35-47`.
084. Ralph-loop command evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:48-70`.
085. Ralph-loop safety evidence: `Z:/claude-sota-installed/.claude/plugins/cache/claude-plugins-official/ralph-loop/1.0.0/README.md:119-134`.
086. Cookbook sub-agent intro evidence: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:7-9`.
087. Cookbook sub-agent deps evidence: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:17-26`.
088. Cookbook Anthropic client evidence: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:43-47`.
089. Cookbook prompt-generation evidence: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:106-142`.
090. Cookbook Haiku call evidence: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:238-247`.
091. Cookbook final Opus call evidence: `Z:/repos/deps/anthropic-cookbook/multimodal/using_sub_agents.ipynb:264-337`.
092. Cookbook memory tool purpose evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/memory_tool.py:1-19`.
093. Cookbook memory path validation evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/memory_tool.py:37-74`.
094. Cookbook memory execute evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/memory_tool.py:76-117`.
095. Cookbook memory view/create evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/memory_tool.py:119-197`.
096. Cookbook memory tests evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/tests/test_memory_tool.py:47-80`.
097. Cookbook memory tests extension evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/tests/test_memory_tool.py:126-142`.
098. Cookbook memory tests replace evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/tests/test_memory_tool.py:145-192`.
099. Cookbook requirements evidence: `Z:/repos/deps/anthropic-cookbook/tool_use/requirements.txt:1-5`.
100. Managed agents inventory evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/README.md`.
101. Managed agents pyproject evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/pyproject.toml`.
102. Managed agents utilities evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/utilities.py`.
103. Managed agents SRE notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/sre_incident_responder.ipynb`.
104. Managed agents Slack notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/slack_data_bot.ipynb`.
105. Managed agents data analyst notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/data_analyst_agent.ipynb`.
106. Managed agents preferences notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_remember_user_preferences.ipynb`.
107. Managed agents prompt versioning notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_prompt_versioning_and_rollback.ipynb`.
108. Managed agents issue-to-PR notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_orchestrate_issue_to_pr.ipynb`.
109. Managed agents production notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_operate_in_production.ipynb`.
110. Managed agents test iteration notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_iterate_fix_failing_tests.ipynb`.
111. Managed agents human gate notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_gate_human_in_the_loop.ipynb`.
112. Managed agents codebase exploration notebook evidence: `Z:/repos/deps/anthropic-cookbook/managed_agents/CMA_explore_unfamiliar_codebase.ipynb`.
113. Claude Agent SDK README evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/README.md`.
114. Claude Agent SDK pyproject evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/pyproject.toml`.
115. Claude Agent SDK one-liner notebook evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/00_The_one_liner_research_agent.ipynb`.
116. Claude Agent SDK chief-of-staff notebook evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/01_The_chief_of_staff_agent.ipynb`.
117. Claude Agent SDK observability notebook evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/02_The_observability_agent.ipynb`.
118. Claude Agent SDK SRE notebook evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/03_The_site_reliability_agent.ipynb`.
119. Claude Agent SDK migration notebook evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/04_migrating_from_openai_agents_sdk.ipynb`.
120. Claude Agent SDK session browser notebook evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/05_Building_a_session_browser.ipynb`.
121. Claude Agent SDK research agent evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/research_agent/agent.py`.
122. Claude Agent SDK observability agent evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/observability_agent/agent.py`.
123. Claude Agent SDK chief-of-staff agent evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/chief_of_staff_agent/agent.py`.
124. Claude Agent SDK SRE MCP evidence: `Z:/repos/deps/anthropic-cookbook/claude_agent_sdk/site_reliability_agent/sre_mcp_server.py`.
125. Local plugin registry evidence: `Z:/claude-sota-installed/.claude/plugins/known_marketplaces.json`.
126. Installed plugin registry evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
127. Installed `codex@openai-codex` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
128. Installed `agent-teams` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
129. Installed `context-management` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
130. Installed `agent-orchestration` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
131. Installed `review-agent-governance` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
132. Installed `context-mode` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
133. Installed `mcp-server-dev` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
134. Installed `hookify` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
135. Installed `code-review` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
136. Installed `typescript-lsp` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
137. Installed `ralph-loop` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
138. Installed `superpowers` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
139. Installed `skill-creator` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
140. Installed `agent-skills` evidence: `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json`.
141. Context7 repo HEAD evidence: `Z:/repos/deps/context7 @ 78b98266954d`.
142. DeepWiki repo HEAD evidence: `Z:/repos/deps/asyncfuncai__deepwiki-open @ 5b43df5464ea`.
143. GitHub MCP repo HEAD evidence: `Z:/repos/deps/github-mcp-server @ 62266f804b1e`.
144. GitNexus repo HEAD evidence: `Z:/repos/deps/gitnexus @ 98addbd6c4e7`.
145. Graphiti repo HEAD evidence: `Z:/repos/deps/graphiti @ c42761504467`.
146. Memory service repo HEAD evidence: `Z:/repos/deps/mcp-memory-service @ 7c697327eb48`.
147. Phoenix repo HEAD evidence: `Z:/repos/deps/phoenix @ 419c3a06978a`.
148. Playwright MCP repo HEAD evidence: `Z:/repos/deps/playwright-mcp @ 8116437ffcfe`.
149. Repomix repo HEAD evidence: `Z:/repos/deps/repomix @ b99706131b26`.
150. Serena repo HEAD evidence: `Z:/repos/deps/serena @ ab98ea676253`.
151. `everything-claude-code` repo HEAD evidence: `Z:/repos/deps/everything-claude-code @ 841beea45cb2`.
152. `wshobson/agents` repo HEAD evidence: `Z:/repos/deps/wshobson-agents @ ece811f23310`.
153. Addy skills repo HEAD evidence: `Z:/repos/deps/addyosmani-agent-skills @ 4c585c3721a3`.
154. Superpowers repo HEAD evidence: `Z:/repos/deps/superpowers @ f2cbfbefebbf`.
155. Anthropic skills repo HEAD evidence: `Z:/repos/deps/anthropics__skills @ f458cee31a75`.
156. Context-mode repo HEAD evidence: `Z:/repos/deps/context-mode @ e73a6cd56a4e`.
157. `claude-plugins-official` repo HEAD evidence: `Z:/repos/deps/claude-plugins-official @ 76b35e91d1c9`.
158. Addy plugin license evidence: `Z:/repos/deps/addyosmani-agent-skills/.claude-plugin/plugin.json:10`.
159. Superpowers plugin license evidence: `Z:/repos/deps/superpowers/.claude-plugin/plugin.json:11`.
160. Context-mode plugin license evidence: `Z:/repos/deps/context-mode/.claude-plugin/plugin.json:11`.
161. Official plugin license policy evidence: `Z:/repos/deps/claude-plugins-official/README.md:45-47`.
162. Plugin directory docs evidence: `Z:/repos/deps/claude-plugins-official/README.md:49-51`.
163. Addy cross-agent compatibility evidence: `Z:/repos/deps/addyosmani-agent-skills/README.md:63-120`.
164. Addy all-skills count evidence: `Z:/repos/deps/addyosmani-agent-skills/README.md:128-136`.
165. Superpowers multi-harness evidence: `Z:/repos/deps/superpowers/README.md:5-7`.
166. Superpowers Codex support evidence: `Z:/repos/deps/superpowers/README.md:63-87`.
167. Plugin bootstrapping can remain non-primitive if it only lists installs.
168. Rules, skills, agents, and hooks should remain upstream-owned.
169. MCP config should be treated as bootstrap selection, not primitive invention.
170. Fresh runtime should not copy `.claude/hooks/scripts` from installed runtime.
171. Fresh runtime should not copy `.claude/agents` from installed runtime.
172. Fresh runtime should not copy `.claude/skills` from installed runtime.
173. Fresh runtime may install plugins that provide agents.
174. Fresh runtime may install plugins that provide skills.
175. Fresh runtime may install plugins that provide commands.
176. Fresh runtime may install plugins that provide hooks.
177. Fresh runtime may register MCP servers from upstream repos or hosted endpoints.
178. Fresh runtime should pin local stdio MCP package versions or SHAs where possible.
179. Fresh runtime should document every MCP secret placeholder.
180. Fresh runtime should separate hosted MCPs from local MCPs in smoke probes.
181. Starter marketplaces cover methodology and commands better than infrastructure.
182. Starter marketplaces do not cover local memory with a single canonical answer.
183. Anthropic cookbook memory is official but client-side and file-scoped.
184. MCP memory service is semantic but third-party local MCP.
185. Graphiti is temporal graph memory but requires local graph database setup.
186. Context-mode is context continuity, not universal memory.
187. Agent-teams requires env activation and command invocation.
188. Agent-orchestration is not the same as broad specialist-agent marketplace install.
189. Codex plugin Stop gate is official for the plugin but not equivalent to full local hook chain.
190. Codex plugin commands are sufficient for review workflows if the operator accepts command-driven gates.
191. Full pre-edit/commit/push hooks require upstream equivalents or must be dropped.
192. Auto-compact policy requires official env variables or a context plugin; no starter plugin owns it.
193. The operator should avoid claiming "complete" until the MCP fleet passes smoke probes.
194. The operator should avoid claiming "official Anthropic only" if using third-party marketplace plugins.
195. The operator can claim "upstream-sourced" if every primitive comes from external repos/marketplaces.
196. The operator can claim "no local primitive invention" if local files are manifests and settings only.
197. The operator should log plugin repo, version, and HEAD at install time.
198. The operator should log MCP repo, version, and HEAD at install time.
199. The operator should not rely on unversioned `@latest` for local stdio MCPs.
200. The operator should avoid direct local hook scripts unless upstream plugin-provided.
201. Recommended verdict for Q1: NEEDS-REVISION.
202. Recommended verdict for Q2: NEEDS-REVISION.
203. Recommended verdict for Q3: APPROVE-PARTIAL.
204. Recommended verdict for Q4: NEEDS-REVISION.
205. Recommended verdict for Q5: REJECT for full plugin-wired hook claim.
206. Recommended verdict for Q6: APPROVE-PARTIAL.
207. Recommended verdict for Q7: NEEDS-REVISION.
208. Recommended verdict for Q8: NEEDS-REVISION.
209. Recommended verdict for Q9: NEEDS-REVISION.
210. Recommended verdict for Q10: APPROVE with install-order revisions.
211. Overall audit verdict remains NEEDS-REVISION, not REJECT, because all gaps have upstream replacements.
212. Highest-impact plugin addition is `context-mode`.
213. Highest-impact team addition is `agent-teams`.
214. Highest-impact review addition is `comprehensive-review`.
215. Highest-impact Stop-loop addition is `ralph-loop`.
216. Highest-impact official build addition is `mcp-server-dev`.
217. Highest-impact hook-authoring addition is `hookify`.
218. Highest-impact language addition depends on target repo; default Python and JS/TS are recommended.
219. Highest-impact docs MCP is Context7.
220. Highest-impact repo MCP is GitHub readonly.
221. Highest-impact research MCP is DeepWiki.
222. Highest-impact browser MCP is Playwright.
223. Highest-impact packer MCP is Repomix.
224. Highest-impact semantic code MCP is Serena.
225. Highest-impact impact-analysis MCP is GitNexus.
226. Highest-impact semantic memory MCP is `mcp-memory-service`.
227. Highest-impact temporal memory MCP is Graphiti.
228. Highest-impact observability MCP is Phoenix.
229. Smoke probes should run before any architectural claim about coverage.
230. Build order should install plugins before MCPs to let plugin-provided MCPs register cleanly.
231. MCPs with secrets should fail closed and document missing envs.
232. Hosted MCPs should be probed before local daemon MCPs.
233. Local daemon MCPs should have explicit port/process ownership.
234. Graphiti should be optional if the fresh runtime wants a lighter first bootstrap.
235. Phoenix should be optional if tracing is not part of the first launch.
236. GitNexus should be optional if no index exists yet, but recommended before code edits.
237. Repomix should be included early because it is low-friction and high leverage.
238. Serena should be included early for semantic code navigation.
239. Playwright should be included when frontend/browser verification is expected.
240. Context7 should be included for up-to-date docs.
241. DeepWiki should be included for repo-level explanations.
242. GitHub readonly should be included for public/private repo metadata where token exists.
243. The starter four should not be called a "complete runtime".
244. The starter four can be called a "clean upstream seed".
245. Additional upstream installs are required for parity with the installed runtime.
246. Local bootstrap should never contain copied upstream code when a marketplace install exists.
247. Local bootstrap can include install ordering and smoke commands.
248. The architect should prefer plugin commands over hidden local policies.
249. The architect should prefer MCP config over custom wrapper scripts.
250. The architect should prefer official built-in env knobs over custom compaction hooks.
251. Final instruction to architect: ship a minimal manifest, not a local framework.
252. Final instruction to architect: use upstream plugin marketplaces as the primitive source.
253. Final instruction to architect: keep all local state outside repo where practical.
254. Final instruction to architect: document trust level and license for every third-party primitive.
255. Final instruction to architect: re-run the smoke probe after every plugin or MCP update.
256. Final instruction to architect: if a gap has no upstream primitive, mark it explicit rather than filling it locally.


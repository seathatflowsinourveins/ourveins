# All-in-One Claude Code SOTA V61



---

# File: README.md

# Claude Code SOTA V61 Ultimate Elite Execution Kit

This kit is for Claude Code CLI to read and execute. It is the hard-convergence version: high-star repos are discovery signals, not install permission.

## Read first
1. `CLAUDE.md`
2. `AGENTS.md`
3. `EXECUTE_V61_ELITE_PLAN.md`
4. `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md`
5. `TOKEN_CONTEXT_ARCHITECTURE.md`
6. `MEMORY_MCP_AGENT_ORCHESTRATION.md`
7. `MODEL_ROUTING_AND_SUBAGENTS.md`
8. `CODEX_PLUGIN_CC_WORKFLOW.md`
9. `SOURCE_AUDIT_NOTES.md`

## Default runtime
Claude Code + Codex CLI + codex-plugin-cc + ccusage + RTK + Serena + Repomix + rg/fd/jq/yq/gh + pre-commit/just/mise/uv.

## Principle
Keep the default stack small. Add selective tools only after audit and benchmark.



---

# File: CLAUDE.md

# Claude Code SOTA V61 Runtime Rules

Keep this file short. Load detailed playbooks from Skills and Markdown docs only when needed.

## Operating rules
- Prefer semantic retrieval before full-file reads.
- Prefer `rg`, `fd`, `jq`, `yq`, `gh`, `git diff --stat`, and focused test commands.
- Use RTK or equivalent for noisy Bash output.
- Use Serena before broad code exploration.
- Use Repomix only for deliberate context capsules.
- Use worktrees for parallel work; one task = one branch = one worktree.
- Use Codex through `openai/codex-plugin-cc` as second-model reviewer/rescue, not as a permission boundary.
- Run deterministic quality gates before final answers: format, lint, typecheck, tests, secrets, security scans.
- Treat MCP servers, plugins, hooks, dashboards, memory tools, and bridge plugins as executable software requiring source audit.
- Preserve durable memory in Git, GitHub issues/PRs, ADRs, `AGENTS.md`, Skills, and task state before using memory plugins.

## Default stack
Claude Code + Codex CLI + codex-plugin-cc + ccusage + RTK + Serena + Repomix + rg/fd/jq/yq/gh + pre-commit/just/mise/uv.



---

# File: AGENTS.md

# AGENTS.md — Cross-Agent Contract

This repository may be used by Claude Code, Codex, Gemini CLI, OpenCode, or other coding agents.

## Shared contract
- Respect this repo's build/test/lint/security commands.
- Never edit secrets or production data.
- Never run destructive commands without explicit approval.
- Use worktrees for parallel sessions.
- Keep changes scoped to the task.
- Before finalizing, summarize files changed, tests run, risks, and next steps.

## Done criteria
- Relevant tests pass or failures are documented.
- Lint/typecheck/format pass for changed surfaces.
- Security/secret scans pass for changed surfaces.
- Diff is reviewed by primary agent and second-model reviewer when risk warrants.
- Durable docs/ADRs/tasks updated when behavior or architecture changes.



---

# File: SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md

# SOTA Repos Best-of-Best Final List V61

Curated for Claude Code CLI. Stars are discovery signals, not install permission. The default stack is small; MCPs, memory, hooks, dashboards, bridge plugins, and one-line installers are audit-required.

## Foundation official

- `anthropics/claude-code`
- `openai/codex`
- `openai/codex-plugin-cc`
- `anthropics/skills`
- `openai/skills`
- `agentskills/agentskills`
- `modelcontextprotocol/modelcontextprotocol`
- `modelcontextprotocol/servers`
- `modelcontextprotocol/inspector`
- `github/github-mcp-server`
- `microsoft/playwright-mcp`
- `upstash/context7`
- `anthropics/claude-code-action`
- `anthropics/claude-code-base-action`
- `anthropics/claude-code-security-review`
- `anthropics/claude-agent-sdk-python`
- `anthropics/claude-agent-sdk-typescript`
- `anthropics/anthropic-sdk-python`
- `anthropics/anthropic-sdk-typescript`
- `openai/openai-agents-python`
- `openai/openai-python`
- `openai/openai-node`
- `github/codeql-action`
- `github/spec-kit`

## Default install core

- `ryoppippi/ccusage`
- `rtk-ai/rtk`
- `oraios/serena`
- `yamadashy/repomix`
- `BurntSushi/ripgrep`
- `sharkdp/fd`
- `jqlang/jq`
- `mikefarah/yq`
- `cli/cli`
- `pre-commit/pre-commit`
- `casey/just`
- `jdx/mise`
- `astral-sh/uv`

## Measurement visibility

- `ryoppippi/ccusage`
- `matt1398/claude-devtools`
- `sirmalloc/ccstatusline`
- `mcpware/cross-code-organizer`
- `jarrodwatts/claude-hud`
- `jeongwookie/WhereMyTokens`
- `spences10/claude-code-analytics`
- `phuryn/claude-usage`

## Token context elite

- `rtk-ai/rtk`
- `mksglu/context-mode`
- `chopratejas/headroom`
- `buildoak/wet`
- `jordan112/skinny-jeans`
- `ArthurDEV44/distill`
- `z19r/whetstone`
- `alexgreensh/token-optimizer`
- `juyterman1000/entroly`
- `zilliztech/claude-context`
- `aider-ai/aider`
- `mixedbread-ai/mgrep`
- `ast-grep/ast-grep`
- `tree-sitter/tree-sitter`
- `tirth8205/code-review-graph`
- `safishamsi/graphify`
- `mufeedvh/code2prompt`
- `mcpware/cross-code-organizer`
- `upstash/context7`
- `microsoft/playwright-mcp`

## Codebase intelligence

- `oraios/serena`
- `yamadashy/repomix`
- `zilliztech/claude-context`
- `aider-ai/aider`
- `mixedbread-ai/mgrep`
- `ast-grep/ast-grep`
- `tree-sitter/tree-sitter`
- `tirth8205/code-review-graph`
- `safishamsi/graphify`
- `mufeedvh/code2prompt`

## Memory MCP audit required

- `thedotmack/claude-mem`
- `mkreyman/mcp-memory-keeper`
- `doobidoo/mcp-memory-service`
- `supermemoryai/claude-supermemory`
- `supermemoryai/supermemory-mcp`
- `itsjwill/claude-memory`
- `GMaN1911/claude-cognitive`
- `lucasrosati/claude-code-memory-setup`
- `chopratejas/headroom`
- `runtimenoteslabs/memory-layer`
- `yoloshii/ClawMem`
- `mem0ai/mem0`
- `coleam00/mcp-mem0`
- `getzep/graphiti`
- `getzep/zep`
- `klaviyo/graphiti_mcp`
- `letta-ai/letta`
- `letta-ai/letta-code`
- `letta-ai/ai-memory-sdk`
- `chenxiaofie/memory-mcp`
- `DeusData/codebase-memory-mcp`

## High-star workflow reference selective

- `obra/superpowers`
- `affaan-m/everything-claude-code`
- `github/spec-kit`
- `garrytan/gstack`
- `gsd-build/get-shit-done`
- `mattpocock/skills`
- `bmad-code-org/BMAD-METHOD`
- `Fission-AI/OpenSpec`
- `Yeachan-Heo/oh-my-claudecode`
- `addyosmani/agent-skills`
- `EveryInc/compound-engineering-plugin`
- `humanlayer/humanlayer`
- `shanraisshan/claude-code-best-practice`
- `shareAI-lab/learn-claude-code`
- `Piebald-AI/claude-code-system-prompts`
- `Piebald-AI/tweakcc`

## Workflow harness elite

- `bmad-code-org/BMAD-METHOD`
- `eyaltoledano/claude-task-master`
- `automazeio/ccpm`
- `coleam00/context-engineering-intro`
- `Wirasm/PRPs-agentic-eng`
- `github/spec-kit`
- `gsd-build/get-shit-done`
- `maxritter/pilot-shell`
- `wshobson/agents`
- `shanraisshan/claude-code-best-practice`
- `affaan-m/everything-claude-code`
- `opensesh/KARIMO`
- `agent-sh/agentsys`
- `SethGammon/Citadel`
- `sipyourdrink-ltd/bernstein`
- `nutthouse/tutti`
- `humanlayer/advanced-context-engineering-for-coding-agents`
- `humanlayer/humanlayer`
- `rohitg00/pro-workflow`
- `shareAI-lab/learn-claude-code`
- `VILA-Lab/Dive-into-Claude-Code`

## Parallel operator elite

- `smtg-ai/claude-squad`
- `ComposioHQ/agent-orchestrator`
- `yxwucq/CCUI`
- `jamesrochabrun/AgentHub`
- `BloopAI/vibe-kanban`
- `stravu/crystal`
- `manaflow-ai/cmux`
- `fynnfluegge/agtx`
- `raine/workmux`
- `superset-sh/superset`
- `agent-next/cc-manager`
- `farion1231/cc-switch`
- `DanWahlin/ai-agent-board`
- `nwiizo/ccswarm`
- `preset-io/agor`
- `vnovick/itervox`
- `Sterll/claude-terminal`
- `gastownhall/gastown`

## Codex and second model bridges

- `openai/codex-plugin-cc`
- `bfly123/claude_codex_bridge`
- `xiaolai/codex-toolkit-for-claude`
- `promptadvisers/claudex`
- `sakibsadmanshajib/gemini-plugin-cc`
- `nikuscs/codex-cc-plugin`
- `tasict/opencode-plugin-cc`

## Official SDK provider surfaces

- `anthropics/claude-agent-sdk-python`
- `anthropics/claude-agent-sdk-typescript`
- `anthropics/anthropic-sdk-python`
- `anthropics/anthropic-sdk-typescript`
- `openai/openai-agents-python`
- `openai/openai-python`
- `openai/openai-node`
- `openai/skills`
- `microsoft/semantic-kernel`
- `microsoft/agent-framework`
- `microsoft/autogen`
- `google/adk-python`
- `google/adk-js`
- `google/adk-web`
- `strands-agents/sdk-python`
- `strands-agents/sdk-typescript`

## Agent frameworks reference

- `langchain-ai/langgraph`
- `langchain-ai/deepagents`
- `microsoft/agent-framework`
- `microsoft/autogen`
- `microsoft/semantic-kernel`
- `google/adk-python`
- `google/adk-js`
- `google/adk-web`
- `strands-agents/sdk-python`
- `strands-agents/sdk-typescript`
- `pydantic/pydantic-ai`
- `crewAIInc/crewAI`
- `agno-agi/agno`
- `huggingface/smolagents`
- `OpenHands/OpenHands`
- `OpenHands/software-agent-sdk`
- `aaif-goose/goose`
- `martimfasantos/ai-agents-frameworks`

## Eval benchmark observability

- `swe-bench/SWE-bench`
- `swe-agent/swe-agent`
- `SWE-agent/mini-swe-agent`
- `OpenHands/benchmarks`
- `openai/evals`
- `promptfoo/promptfoo`
- `confident-ai/deepeval`
- `braintrustdata/braintrust-sdk`
- `langfuse/langfuse`
- `explodinggradients/ragas`
- `evo-hq/evo`
- `Human-Agent-Society/CORAL`
- `Vvkmnn/awesome-ai-eval`
- `hparreao/Awesome-AI-Evaluation-Guide`
- `vysotin/agentic_evals_docs`
- `danielrosehill/Awesome-AI-Evaluations-Tools`

## Security quality grammar

- `trailofbits/claude-code-config`
- `trailofbits/claude-code-devcontainer`
- `edimuj/vexscan-claude-code`
- `snyk/agent-scan`
- `cisco-ai-defense/mcp-scanner`
- `cisco-ai-defense/skill-scanner`
- `cisco-ai-defense/defenseclaw`
- `InvariantLabs-ai/mcp-scan`
- `MCP-Defender/MCP-Defender`
- `mintmcp/agent-security`
- `slowmist/MCP-Security-Checklist`
- `aws-samples/sample-mcp-security-scanner`
- `semgrep/semgrep`
- `github/codeql-action`
- `gitleaks/gitleaks`
- `trufflesecurity/trufflehog`
- `aquasecurity/trivy`
- `google/osv-scanner`
- `ossf/scorecard`
- `step-security/harden-runner`
- `pre-commit/pre-commit`
- `astral-sh/ruff`
- `biomejs/biome`
- `oxc-project/oxc`
- `koalaman/shellcheck`
- `rhysd/actionlint`
- `hadolint/hadolint`
- `crate-ci/typos`
- `terraform-linters/tflint`
- `golangci/golangci-lint`
- `bridgecrewio/checkov`
- `evilmartians/lefthook`
- `woodruffw/zizmor`
- `oxsecurity/megalinter`
- `errata-ai/vale`
- `DavidAnson/markdownlint`
- `textlint/textlint`
- `get-alex/alex`
- `remarkjs/remark-lint`

## Architecture documentation quality

- `joelparkerhenderson/architecture-decision-record`
- `adr/madr`
- `structurizr/dsl`
- `arc42/arc42-template`
- `C4-PlantUML/C4-PlantUML`
- `mermaid-js/mermaid`

## Discovery only

- `hesreallyhim/awesome-claude-code`
- `onmyway133/awesome-claude-code`
- `subinium/awesome-claude-code`
- `bradAGI/awesome-cli-coding-agents`
- `sorrycc/awesome-code-agents`
- `RoggeOhta/awesome-codex-cli`
- `VoltAgent/awesome-agent-skills`
- `ComposioHQ/awesome-claude-skills`
- `andyrewlee/awesome-agent-orchestrators`
- `Agent-Analytics/awesome-multi-agent-orchestrators`
- `Picrew/awesome-agent-harness`
- `quemsah/awesome-claude-plugins`
- `jqueryscript/awesome-claude-code`
- `efij/awesome-claude-code-security`
- `ai-for-developers/awesome-ai-coding-tools`
- `caramaschiHG/awesome-ai-agents-2026`
- `ARUNAGIRINATHAN-K/awesome-ai-agents`
- `ai-boost/awesome-harness-engineering`
- `TsinghuaC3I/Awesome-Memory-for-Agents`
- `letta-ai/awesome-letta`

## Unique count

`230` unique entries.


---

# File: EXECUTE_V61_ELITE_PLAN.md

# Execute V61 Elite Plan for Claude Code

## Phase 0 — Baseline
1. Run `git status --short`.
2. Run `npx ccusage@latest session` or equivalent usage baseline.
3. Record current `CLAUDE.md`, `AGENTS.md`, `.claude/settings.json`, `.mcp.json`, and Codex config.
4. Run `scripts/verify.sh` if present; otherwise run the smallest known lint/typecheck/test set.

## Phase 1 — Install only the default core
Install or verify:
- Claude Code
- Codex CLI
- `openai/codex-plugin-cc`
- `ccusage`
- RTK
- Serena
- Repomix
- `rg`, `fd`, `jq`, `yq`, `gh`
- `pre-commit`, `just`, `mise`, `uv`

Do not install memory tools, MCP servers, dashboards, bridge plugins, or marketplace packs yet.

## Phase 2 — Configure durable context
1. Keep `CLAUDE.md` under 200 lines.
2. Add `AGENTS.md` for cross-agent instructions.
3. Move repeated workflows into `.claude/skills/*/SKILL.md`.
4. Add architecture docs under `docs/architecture` and ADRs under `docs/decisions`.
5. Prefer GitHub issues/PRs and task files over conversation memory.

## Phase 3 — Token/context architecture
1. Use RTK for noisy Bash output.
2. Use Serena before full-file reads.
3. Use Repomix for deliberate repo capsules.
4. Use Context Mode only when large raw outputs dominate.
5. Use Headroom only when cross-agent compression/memory is needed.
6. Use memory MCPs only after a measured repeated-context-reconstruction problem.

## Phase 4 — Parallel worktree execution
1. Run `git fetch --all --prune`.
2. Run `git remote set-head origin -a`.
3. Add `.claude/worktrees/` to `.gitignore`.
4. Use `claude --worktree <task-id>` or `/batch` for independent units.
5. Use Claude Squad / Agent Orchestrator / CCUI only after audit and benchmark.

## Phase 5 — Codex second-model review
Use Codex as witness:
```text
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, data loss, auth bugs, rollback gaps, concurrency risks, and test holes --background
/codex:rescue --background investigate CI failure and propose the smallest safe fix
```
Reconcile findings as true positive / false positive / uncertain / blocking / non-blocking.

## Phase 6 — Quality and security gates
Run relevant gates:
- format
- lint
- typecheck
- unit/integration tests
- secret scan
- dependency scan
- IaC scan
- action/shell/docker lint
- prose/grammar gates for docs

## Phase 7 — Benchmark-before-adoption
Before installing heavy tools, compare against baseline:
- tokens used
- wall time
- correctness
- test pass rate
- review quality
- security risk
- failure recovery
- uninstallability

## Phase 8 — Audit-required additions
Audit before installing:
- MCP servers
- memory plugins
- hooks
- dashboards
- bridge plugins
- one-line installers
- system-prompt/tool mutation packages
- provider/proxy switchers



---

# File: HIGH_STAR_RESEARCH_METHODS.md

# High-Star Research Methods V61

## Discovery surfaces
- GitHub topics: `claude-code`, `claude-code-skills`, `token-optimization`, `mcp`, `ai-agents`, `llm-evaluation`, `agent-orchestration`.
- Official docs: Claude Code, Claude Agent SDK, Anthropic SDKs, OpenAI Codex, OpenAI Agents SDK, OpenAI Skills.
- Awesome lists: Claude Code, Codex CLI, agent skills, agent harness engineering, AI coding agents, AI eval tools, memory for agents.
- Community consensus: Boris Cherny / Claude Code workflow tips, Karpathy agentic-engineering framing, Claude Code best-practice repositories.

## Keep criteria
Keep only if the repo improves at least one architecture lever:
- context admission
- semantic retrieval
- read-path compression
- worktree isolation
- workflow state
- second-model review
- deterministic quality/security gates
- eval/benchmark feedback
- source auditability
- official provider integration

## Demote criteria
Demote if the repo is:
- a prompt pack without enforcement
- a memory tool without retention/security model
- a dashboard without worktree/diff/cleanup discipline
- a bridge plugin replacing official Codex plugin without clear advantage
- a provider switcher or proxy without a hard need
- a domain-specific skill that does not improve the general harness
- a system-prompt mutator that changes behavior invisibly



---

# File: HIGH_STAR_TRIAGE_AND_CONVERGENCE.md

# High-Star Triage and Convergence V61

## Final convergence
```text
Context admission > prompt engineering
Semantic retrieval > file dumping
Read-path compression > shell-output-only compression
Skills/rules > giant CLAUDE.md
Slash commands > repeated prompting
Hooks > hoping the model remembers
Subagents = context isolation
Worktrees = file isolation
Codex/GPT-class model = second-model witness
Opus-class model = deep architect/security/research subagent
Memory plugins = audit-required, not default
MCPs = selective, not global
Benchmarks/evals = proof, not vibes
Operator dashboards = multi-agent control plane
CLI quality gates > vibes
GitHub issues/PRs/ADRs = durable memory
```

## Default install
Claude Code, Codex CLI, Codex plugin, ccusage, RTK, Serena, Repomix, rg/fd/jq/yq/gh, pre-commit, just, mise, uv, baseline language/security/prose gates.

## Selective install
Context Mode, Headroom, Wet, Claude Context, Context7, Playwright MCP, Claude HUD, dashboards, eval platforms.

## Audit-required
Memory repos, MCP servers, bridge plugins, hooks, dashboards, one-line installers, provider proxies, system-prompt mutators.

## Reference only
Large workflow packs, external agent frameworks, awesome lists, peer-agent platforms, benchmarking frameworks.



---

# File: TOKEN_CONTEXT_ARCHITECTURE.md

# Token and Context Architecture V61

## Layers
1. **Measure**: ccusage, claude-devtools, statusline, cross-code-organizer.
2. **Shell-output compression**: RTK.
3. **Read-path optimization**: Serena, Claude Context, AST-grep, Tree-sitter, mgrep, code-review-graph.
4. **Repo capsules**: Repomix, code2prompt.
5. **Large-output sandboxing**: Context Mode.
6. **Cross-agent compression/memory**: Headroom.
7. **Context profiling and cleanup**: Wet, Whetstone, Distill, token-optimizer, Entroly.

## Rules
- Use semantic retrieval before file dumping.
- Use diff stats before full diffs.
- Use focused tests before full suites.
- Use Skills instead of long always-loaded instructions.
- Use subagents for noisy exploration and return structured summaries only.
- Use memory plugins only after proving repeated reconstruction cost.



---

# File: MEMORY_MCP_AGENT_ORCHESTRATION.md

# Memory, MCP, and Agent Orchestration Policy V61

## Memory default
Use durable project artifacts first:
- Git commits
- GitHub issues and PRs
- ADRs
- AGENTS.md
- CLAUDE.md
- .claude/skills
- Task Master / CCPM state
- repo-map docs

## Memory candidates — audit-required
- thedotmack/claude-mem
- mkreyman/mcp-memory-keeper
- doobidoo/mcp-memory-service
- supermemoryai/claude-supermemory
- supermemoryai/supermemory-mcp
- itsjwill/claude-memory
- GMaN1911/claude-cognitive
- lucasrosati/claude-code-memory-setup
- runtimenoteslabs/memory-layer
- yoloshii/ClawMem
- mem0ai/mem0
- getzep/graphiti
- getzep/zep
- letta-ai/letta

## MCP categories
- Semantic retrieval: Serena, Claude Context.
- Browser/e2e: Playwright MCP.
- Documentation/API lookup: Context7.
- GitHub: GitHub MCP server.
- Memory: mcp-memory-service, memory-layer, supermemory MCP.
- Security: mcp-scan, MCP Defender, Cisco MCP Scanner, Snyk agent-scan.
- Large output: Context Mode.

## MCP installation rule
No global MCP install without:
- source audit
- command audit
- network/filesystem permission audit
- prompt/tool-description audit
- retention/deletion audit
- uninstall path
- benchmark evidence

## Agent orchestration rule
Use native worktrees and `/batch` first. Add operator dashboards only if they improve branch ownership, diff review, cleanup, kill controls, cost/session visibility, and local/remote data clarity.



---

# File: MODEL_ROUTING_AND_SUBAGENTS.md

# Model Routing and Subagents V61

Do not hard-code model names in repo config. Check availability first.

## Routing policy
- **Claude Opus-class**: complex architecture, hard debugging, security review, deep research, harness design, multi-file reasoning.
- **Claude Sonnet-class**: ordinary implementation, refactoring, test writing, documentation.
- **Claude Haiku-class**: cheap classification or summarization when available.
- **Codex / GPT-5.5-class**: independent review, adversarial review, CI rescue, alternative implementation hypothesis, research-heavy second opinion.
- **Codex mini-class**: lightweight triage, summary, quick review.

## Subagent roles
- planner
- implementer
- reviewer
- verifier
- security-reviewer
- codex-bridge
- source-auditor
- token-budget-guardian
- worktree-operator
- eval-benchmark-architect
- cli-quality-architect

## Required output contract for subagents
Return only:
- finding
- evidence
- files/symbols touched
- commands run
- risks
- recommended next action

No raw logs unless explicitly requested.



---

# File: OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md

# Official SDKs and Provider Surfaces V61

## Anthropic / Claude
- anthropics/claude-code
- anthropics/skills
- anthropics/claude-agent-sdk-python
- anthropics/claude-agent-sdk-typescript
- anthropics/anthropic-sdk-python
- anthropics/anthropic-sdk-typescript
- anthropics/claude-code-action
- anthropics/claude-code-security-review

## OpenAI / Codex
- openai/codex
- openai/codex-plugin-cc
- openai/skills
- openai/openai-agents-python
- openai/openai-python
- openai/openai-node

## Other reference frameworks
- microsoft/agent-framework
- microsoft/semantic-kernel
- microsoft/autogen
- google/adk-python
- google/adk-js
- google/adk-web
- strands-agents/sdk-python
- strands-agents/sdk-typescript
- langchain-ai/langgraph
- pydantic/pydantic-ai
- crewAIInc/crewAI
- agno-agi/agno
- huggingface/smolagents

## Rule
Use Claude Code and Codex for terminal workflows. Use SDKs only when building custom harnesses, managed agents, eval environments, or orchestration services.



---

# File: EVAL_BENCHMARK_OBSERVABILITY.md

# Eval, Benchmark, and Observability V61

## Goal
No heavy tool is adopted unless it beats baseline Claude Code on tokens, correctness, wall time, review quality, failure recovery, and safety.

## Reference repos
- swe-bench/SWE-bench
- swe-agent/swe-agent
- SWE-agent/mini-swe-agent
- OpenHands/benchmarks
- openai/evals
- promptfoo/promptfoo
- confident-ai/deepeval
- braintrustdata/braintrust-sdk
- langfuse/langfuse
- explodinggradients/ragas
- Vvkmnn/awesome-ai-eval
- hparreao/Awesome-AI-Evaluation-Guide
- vysotin/agentic_evals_docs
- danielrosehill/Awesome-AI-Evaluations-Tools

## Benchmark gate
For each candidate tool:
1. Define a representative task.
2. Run baseline Claude Code.
3. Run Claude Code + candidate tool.
4. Compare tokens, time, tests, quality, diff size, risk.
5. Keep only if value is measurable.



---

# File: CODEX_PLUGIN_CC_WORKFLOW.md

# Codex Plugin CC Workflow V61

Use `openai/codex-plugin-cc` as second-model reviewer, adversarial challenger, and rescue worker.

## Commands
```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, auth bugs, data loss, rollback gaps, race conditions, and test holes --background
/codex:rescue --background investigate failing CI and propose the smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

## Boundary
Codex is not Claude Code's permission boundary. Configure Codex separately. Keep Codex MCP surface minimal for plugin-launched reviews.

## Reconciliation
For each finding:
- true positive / false positive / uncertain
- blocking / non-blocking
- minimal fix
- test to prove fix



---

# File: PARALLEL_WORKTREE_AUTOMATION.md

# Parallel Worktree Automation V61

## Native first
```bash
git fetch --all --prune
git remote set-head origin -a
printf '
.claude/worktrees/
' >> .gitignore
claude --worktree cc-123-feature
```

## Manual worktrees
```bash
git worktree add ../repo-cc-123 -b cc/123-feature origin/main
cd ../repo-cc-123
claude
```

## Large changes
Use `/batch` only for independent units. Avoid multiple agents editing the same files.

## Operator tools
Evaluate only after audit/benchmark:
- Claude Squad
- Composio Agent Orchestrator
- CCUI
- AgentHub
- Vibe Kanban
- Workmux
- itervox

## Merge discipline
```bash
git status --short
git diff --stat
git diff --check
just test || scripts/verify.sh
/codex:review --base main --background
```



---

# File: CLI_TERMINAL_CODE_QUALITY_GUIDE.md

# CLI, Code, Security, and Prose Quality Gates V61

## Default CLI foundation
- rg / ripgrep
- fd
- jq
- yq
- gh
- pre-commit
- just
- mise
- uv

## Code quality
- Python: ruff, pyright/mypy, pytest.
- TypeScript/JS: biome, oxc, tsc, vitest/jest.
- Go: gofmt, go test, golangci-lint.
- Rust: cargo fmt, clippy, cargo test.
- Shell: shellcheck.
- Docker: hadolint.
- GitHub Actions: actionlint.
- Terraform/IaC: tflint, checkov, trivy.

## Security
- semgrep
- CodeQL
- gitleaks
- trufflehog
- trivy
- osv-scanner
- scorecard
- harden-runner
- MCP/security scanners for MCP/plugin ecosystems

## Prose / grammar / docs
- vale
- markdownlint
- textlint
- typos
- alex/remark-lint when relevant

## Rule
Do not let LLM review replace deterministic gates. LLMs explain and investigate; gates decide.



---

# File: COMMUNITY_CONSENSUS_2026.md

# Community Consensus 2026 V61

## Boris / Claude Code team signal
- Run parallel worktrees.
- Start complex work in plan mode.
- Keep `CLAUDE.md` living but concise.
- Turn repeated work into Skills and slash commands.
- Use subagents for noisy exploration.
- Keep usage/status visibility.
- Treat MCPs and plugins as powerful but not free.

## Karpathy-style agentic engineering
- Write specs.
- Supervise plans.
- Inspect diffs.
- Write tests and evals.
- Manage permissions.
- Isolate worktrees.
- Preserve quality.

## Final operator pattern
```text
Claude coordinates.
Worktrees isolate.
Semantic tools retrieve.
Hooks enforce.
RTK/Context Mode filter.
Codex challenges.
CI decides.
Git remembers.
```



---

# File: SOURCE_AUDIT_NOTES.md

# Source Audit Notes V61

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit.

## Audit before installing
- MCP servers
- memory plugins
- hooks
- dashboards/operator UIs
- Claude↔Codex/Gemini/OpenCode bridges
- one-line installers
- provider/proxy switchers
- system-prompt/tool mutators

## Audit checklist
1. Inspect install script.
2. Inspect package manifest and dependencies.
3. Inspect executable entrypoints.
4. Inspect network access.
5. Inspect filesystem access.
6. Inspect prompts/tool descriptions for injection risk.
7. Inspect secrets/telemetry handling.
8. Inspect memory retention/deletion policy.
9. Inspect license.
10. Verify uninstall path.
11. Run in isolated worktree/container first.
12. Benchmark against baseline.

## Never default-install
- leaked/unofficial Claude Code source
- hidden prompt mutators
- global MCP servers with broad filesystem/network access
- memory plugins without deletion/export controls
- bridge plugins that ignore separate permissions



---

# File: WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md

# What More Was Not Covered Enough — V61 Closure

## Previously under-covered
- Agent frameworks outside Claude Code.
- Evaluation and observability platforms.
- Memory repo risk and lifecycle.
- MCP governance and scanning.
- Official SDK/provider surfaces.
- Model routing across Opus-class and Codex/GPT-class models.
- Prose/grammar/documentation quality gates.
- Architecture documentation/ADR quality.
- Source audit of plugins, hooks, MCPs, dashboards, and bridges.

## V61 closure
- Adds official SDK/provider layer.
- Adds external agent-framework references as reference/selective, not defaults.
- Adds eval/benchmark/observability layer.
- Adds memory/MCP policy with audit-first stance.
- Adds code/prose/architecture quality gates.
- Adds model routing and subagent output contracts.
- Keeps default runtime small.

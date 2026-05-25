# Final SOTA Repo List — Frontier V7 Quality-Curated

Total unique entries: **219**.  
Elite core entries (Tier 0 + Tier 1): **64**.  
Selective entries (Tier 2): **104**.  
Watchlist / audit-required entries (Tier 3): **51**.

The point of V7 is not maximum breadth. It is **high-quality convergence**: repos that are official, high-star, architecture-defining, or operationally valuable for Claude Code CLI automation.

## Tier 0 + Tier 1: adopt/evaluate first

- `agentskills/agentskills` — **Official foundation / Tier 0 / FOUNDATION**: Portable Agent Skills format for Claude Code, Codex, Gemini, Cursor-style agents.
- `anthropics/claude-agent-sdk-python` — **Official foundation / Tier 0 / FOUNDATION**: Python SDK for building agentic Claude Code-like workflows.
- `anthropics/claude-agent-sdk-typescript` — **Official foundation / Tier 0 / FOUNDATION**: TypeScript SDK for agentic Claude workflows.
- `anthropics/claude-code` — **Official foundation / Tier 0 / FOUNDATION**: Core Claude Code CLI: commands, hooks, skills, subagents, worktrees, git automation.
- `anthropics/claude-code-action` — **Official foundation / Tier 0 / FOUNDATION**: Official GitHub Action for Claude Code automation in PRs/issues.
- `anthropics/claude-code-base-action` — **Official foundation / Tier 0 / FOUNDATION**: Lower-level official action for custom Claude Code GitHub workflows.
- `anthropics/claude-code-security-review` — **Official foundation / Tier 0 / FOUNDATION**: Official Claude Code security-review action for trusted PRs.
- `anthropics/claude-plugins-official` — **Official foundation / Tier 0 / FOUNDATION**: Official plugin marketplace/directory reference.
- `anthropics/skills` — **Official foundation / Tier 0 / FOUNDATION**: Official skill examples; canonical pattern for progressive disclosure.
- `github/codeql-action` — **Official foundation / Tier 0 / FOUNDATION**: Deterministic code security analysis; objective CI gate.
- `github/gh-aw` — **Official foundation / Tier 0 / FOUNDATION**: GitHub Agentic Workflows: markdown workflows to GitHub Actions-based AI flows.
- `modelcontextprotocol/inspector` — **Official foundation / Tier 0 / FOUNDATION**: MCP inspection/debugging tool.
- `modelcontextprotocol/modelcontextprotocol` — **Official foundation / Tier 0 / FOUNDATION**: MCP protocol specification.
- `modelcontextprotocol/servers` — **Official foundation / Tier 0 / FOUNDATION**: Reference MCP servers; use as examples, not default production install.
- `openai/codex` — **Official foundation / Tier 0 / FOUNDATION**: OpenAI terminal coding agent; peer to Claude Code for cross-model workflows.
- `openai/codex-plugin-cc` — **Official foundation / Tier 0 / FOUNDATION**: Bridge that lets Claude Code call Codex for review, adversarial review, rescue, status/result/cancel.
- `openai/symphony` — **Official foundation / Tier 0 / FOUNDATION**: OpenAI autonomous implementation-run research surface; inspiration for isolated execution loops.
- `aquasecurity/trivy` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Container/IaC/dependency vulnerability scanning.
- `astral-sh/ruff` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Fast Python linter/formatter.
- `biomejs/biome` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: JS/TS formatter/linter.
- `casey/just` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Task runner for reproducible commands.
- `gitleaks/gitleaks` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Secret scanning.
- `hadolint/hadolint` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Dockerfile linter.
- `jdx/mise` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Tool/version/task environment manager.
- `koalaman/shellcheck` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Shell script linter.
- `pre-commit/pre-commit` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Local pre-commit quality framework.
- `rhysd/actionlint` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: GitHub Actions workflow linter.
- `semgrep/semgrep` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Static analysis/security rules.
- `trufflesecurity/trufflehog` — **CLI, terminal, code quality, and security gates / Tier 1 / CLI_FOUNDATION**: Secret scanning with verification.
- `ast-grep/ast-grep` — **Code intelligence and CLI foundations / Tier 1 / EVALUATE_SELECTIVELY**: AST-aware search/refactor; precise structural edits.
- `BurntSushi/ripgrep` — **Code intelligence and CLI foundations / Tier 1 / CLI_FOUNDATION**: Fast text search; default search primitive.
- `cli/cli` — **Code intelligence and CLI foundations / Tier 1 / CLI_FOUNDATION**: GitHub CLI; often cheaper/context-cleaner than GitHub MCP.
- `jqlang/jq` — **Code intelligence and CLI foundations / Tier 1 / CLI_FOUNDATION**: JSON slicing for small context results.
- `mikefarah/yq` — **Code intelligence and CLI foundations / Tier 1 / CLI_FOUNDATION**: YAML/XML/TOML slicing for small context results.
- `sharkdp/fd` — **Code intelligence and CLI foundations / Tier 1 / CLI_FOUNDATION**: Fast file discovery; avoid noisy find output.
- `tree-sitter/tree-sitter` — **Code intelligence and CLI foundations / Tier 1 / EVALUATE_SELECTIVELY**: Parser foundation for structural code understanding.
- `ryoppippi/ccusage` — **Measurement and observability / Tier 1 / DEFAULT_INSTALL**: Token/cost/session accounting from local Claude Code JSONL; also useful around Codex/OpenCode logs.
- `ComposioHQ/agent-orchestrator` — **Parallel execution and operator UI / Tier 1 / EVALUATE_SELECTIVELY**: Distributed dashboard: Claude Code/Codex/Aider/OpenCode in isolated worktrees with PRs.
- `fynnfluegge/agtx` — **Parallel execution and operator UI / Tier 1 / EVALUATE_SELECTIVELY**: Kanban blackboard for coding agents; orchestrator, skills, MCP, worktrees, tmux.
- `nutthouse/tutti` — **Parallel execution and operator UI / Tier 1 / EVALUATE_SELECTIVELY**: Versioned agent-operations layer with roles, workflows, hooks, gates, policies, worktrees, dashboards, token usage.
- `smtg-ai/claude-squad` — **Parallel execution and operator UI / Tier 1 / EVALUATE_SELECTIVELY**: Local terminal/TUI for multiple coding agents in separate workspaces.
- `yxwucq/CCUI` — **Parallel execution and operator UI / Tier 1 / EVALUATE_SELECTIVELY**: Runs Claude Code and Codex CLI in isolated git worktrees with diff/cost/merge controls.
- `Agent-Analytics/awesome-multi-agent-orchestrators` — **Skills, plugins, and discovery / Tier 1 / DISCOVERY_ONLY**: Parallel coding-agent orchestrator list.
- `andyrewlee/awesome-agent-orchestrators` — **Skills, plugins, and discovery / Tier 1 / DISCOVERY_ONLY**: Multi-agent orchestrators list.
- `bradAGI/awesome-cli-coding-agents` — **Skills, plugins, and discovery / Tier 1 / DISCOVERY_ONLY**: Terminal-native AI coding agents and orchestrators directory.
- `ComposioHQ/awesome-claude-skills` — **Skills, plugins, and discovery / Tier 1 / DISCOVERY_ONLY**: Large curated Claude Skills resources/tools.
- `hesreallyhim/awesome-claude-code` — **Skills, plugins, and discovery / Tier 1 / DISCOVERY_ONLY**: Curated Claude Code skills/hooks/commands/orchestrators/apps/plugins list.
- `subinium/awesome-claude-code` — **Skills, plugins, and discovery / Tier 1 / DISCOVERY_ONLY**: High-star Claude Code/Codex/Gemini/Cursor resources.
- `VoltAgent/awesome-agent-skills` — **Skills, plugins, and discovery / Tier 1 / DISCOVERY_ONLY**: 1000+ cross-agent skills compatible with Claude Code/Codex/Gemini/Cursor.
- `aider-ai/aider` — **Token and context architecture / Tier 1 / EVALUATE_SELECTIVELY**: Alternative terminal coding agent with repo-map pattern.
- `chopratejas/headroom` — **Token and context architecture / Tier 1 / EVALUATE_SELECTIVELY**: Cross-agent context optimization, compression, MCP/proxy/memory layer.
- `mksglu/context-mode` — **Token and context architecture / Tier 1 / EVALUATE_SELECTIVELY**: Large-output sandbox and summary/search layer.
- `oraios/serena` — **Token and context architecture / Tier 1 / DEFAULT_INSTALL**: Semantic code retrieval/editing via MCP, symbol-level navigation.
- `rtk-ai/rtk` — **Token and context architecture / Tier 1 / DEFAULT_INSTALL**: Command-output compression/proxy for shell-heavy Claude Code workflows.
- `yamadashy/repomix` — **Token and context architecture / Tier 1 / DEFAULT_INSTALL**: Repo packing / token counting / deliberate context capsules.
- `zilliztech/claude-context` — **Token and context architecture / Tier 1 / EVALUATE_SELECTIVELY**: Semantic code search/RAG for Claude Code and agents.
- `affaan-m/everything-claude-code` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: Massive pattern library; longform guide on token economics, memory, verification, parallelization.
- `automazeio/ccpm` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: GitHub-native PRD/epic/task/worktree workflow.
- `bmad-code-org/BMAD-METHOD` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: PRD → architecture → stories → implementation → QA lifecycle.
- `coleam00/context-engineering-intro` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: PRP/spec-driven implementation workflow.
- `eyaltoledano/claude-task-master` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: PRD decomposition and task graph.
- `opensesh/KARIMO` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: PRD-driven orchestration with research/planning/tasks/review/waves.
- `shanraisshan/claude-code-best-practice` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: Course/reference for commands, agents, skills, hooks, workflows.
- `wshobson/agents` — **Workflow, harness, and lifecycle / Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**: Large modular plugin/agent/skill/workflow catalog.

## Tier 2: high value, selective adoption

- `astral-sh/uv` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Fast Python package/project manager.
- `bridgecrewio/checkov` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: IaC security scanner.
- `crate-ci/typos` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Fast typo checker.
- `dandavison/delta` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Git diff viewer upstream/alternate entry.
- `evilmartians/lefthook` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Git hooks manager.
- `eza-community/eza` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Modern ls/tree alternative.
- `golangci/golangci-lint` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Go linter aggregator.
- `InvariantLabs-ai/mcp-scan` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: MCP security scanner.
- `junegunn/fzf` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Fuzzy finder.
- `MCP-Defender/MCP-Defender` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: MCP security runtime/guard.
- `ossf/scorecard` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: OpenSSF project health/security scoring.
- `oxc-project/oxc` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: JS/TS compiler/lint/parser toolchain.
- `oxsecurity/megalinter` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Multi-language mega linter aggregator.
- `sharkdp/bat` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Better cat with syntax context.
- `sharkdp/hyperfine` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Command benchmarking.
- `step-security/harden-runner` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: GitHub Actions runner hardening.
- `sxyazi/yazi` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Terminal file manager.
- `terraform-linters/tflint` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: Terraform linter.
- `woodruffw/zizmor` — **CLI, terminal, code quality, and security gates / Tier 2 / CLI_FOUNDATION**: GitHub Actions security linter.
- `mixedbread-ai/mgrep` — **Code intelligence and CLI foundations / Tier 2 / EVALUATE_SELECTIVELY**: Semantic grep / code retrieval tool.
- `sourcegraph/cody` — **Code intelligence and CLI foundations / Tier 2 / EVALUATE_SELECTIVELY**: Code intelligence/search reference for large codebases.
- `yoanbernabeu/grepai` — **Code intelligence and CLI foundations / Tier 2 / EVALUATE_SELECTIVELY**: AI-assisted grep/search pattern.
- `alexanderatallah/redline` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Review/critique layer for coding agents.
- `bfly123/claude_codex_bridge` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Bridge between Claude and Codex flows.
- `nikuscs/codex-cc-plugin` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Codex plugin for Claude Code.
- `promptadvisers/claudex` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Claude/Codex bridge/plugin.
- `RoggeOhta/awesome-codex-cli` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Codex CLI ecosystem list.
- `sakibsadmanshajib/gemini-plugin-cc` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Gemini plugin for Claude Code.
- `sendbird/cc-plugin-codex` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Codex plugin for Claude Code.
- `tasict/opencode-plugin-cc` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: OpenCode plugin for Claude Code.
- `xiaolai/codex-toolkit-for-claude` — **Codex and multi-model bridges / Tier 2 / AUDIT_REQUIRED**: Codex MCP integration for Claude Code: audit, implement, verify, review, debug.
- `anipotts/claude-code-tips` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code tips and tricks.
- `awattar/claude-code-best-practices` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code best-practices reference.
- `Cranot/claude-code-guide` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Complete auto-updated Claude Code guide.
- `danielrosehill/Awesome-AI-Coding-Tools` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: AI coding tools discovery.
- `davepoon/buildwithclaude` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude ecosystem learning/reference.
- `efij/awesome-claude-code-security` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code security discovery.
- `FlorianBruniaux/claude-code-ultimate-guide` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Beginner-to-power-user Claude Code guide/templates.
- `gmh5225/awesome-ai-security` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: AI security resources.
- `hashgraph-online/awesome-ai-plugins` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: AI plugin discovery.
- `lawwu/claude-code-field-guide` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code field guide.
- `luongnv89/claude-howto` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code commands/how-to guide.
- `MuhammadUsmanGM/claude-code-best-practices` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code best-practices reference.
- `rosmur/claudecode-best-practices` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code best-practices reference.
- `sorrycc/awesome-code-agents` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Code-agent ecosystem discovery.
- `VILA-Lab/Dive-into-Claude-Code` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code internals/guide reference.
- `wesammustafa/Claude-Code-Everything-You-Need-to-Know` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Broad Claude Code setup/workflow reference.
- `ykdojo/claude-code-tips` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Practical Claude Code tips.
- `zebbern/claude-code-guide` — **Guides and discovery references / Tier 2 / REFERENCE_ONLY**: Claude Code setup/workflow guide.
- `0xhimanshu/governor` — **Measurement and observability / Tier 2 / EVALUATE_SELECTIVELY**: Usage/budget governance pattern for agent runs.
- `Abinesh-L/claude-crusts` — **Measurement and observability / Tier 2 / EVALUATE_SELECTIVELY**: Claude Code telemetry/statusline ecosystem component.
- `jeongwookie/WhereMyTokens` — **Measurement and observability / Tier 2 / EVALUATE_SELECTIVELY**: Token location / token attribution helper.
- `matt1398/claude-devtools` — **Measurement and observability / Tier 2 / EVALUATE_SELECTIVELY**: Visual session, context, tool-call, token, and subagent inspection.
- `sirmalloc/ccstatusline` — **Measurement and observability / Tier 2 / EVALUATE_SELECTIVELY**: Statusline for model/git/context/cost state.
- `spences10/claude-code-analytics` — **Measurement and observability / Tier 2 / EVALUATE_SELECTIVELY**: Claude Code analytics dashboard.
- `toolsu/ccost` — **Measurement and observability / Tier 2 / EVALUATE_SELECTIVELY**: Cost/status monitoring for Claude Code sessions.
- `basnijholt/agent-cli` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: CLI to create worktrees and launch agents/editors with env/setup.
- `BloopAI/vibe-kanban` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Kanban/operator layer for coding agents.
- `gabrielkoerich/orchestrator` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: GitHub Issues → isolated worktree agents → merged PR with tmux sessions.
- `jamesrochabrun/AgentHub` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Operator UI for agents.
- `johannesjo/parallel-code` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Parallel code agents in worktrees.
- `manaflow-ai/cmux` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Multiple coding-agent session manager.
- `max-sixty/worktrunk` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Worktree workflow simplifier for Claude/Codex.
- `milisp/codexia` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Codex/Claude agent orchestration UI.
- `preset-io/agor` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Multiplayer canvas for Claude/Codex/Gemini sessions and worktrees.
- `slopus/happy` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Parallel agent/operator workflow.
- `stravu/crystal` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Multi-agent coding workspace.
- `superset-sh/superset` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: Parallel CLI-agent orchestration with worktree isolation.
- `winfunc/opcode` — **Parallel execution and operator UI / Tier 2 / EVALUATE_SELECTIVELY**: OpenCode/Claude/Codex workflow operator.
- `alirezarezvani/claude-skills` — **Skills, plugins, and discovery / Tier 2 / EVALUATE_SELECTIVELY**: Large Claude Code skills and agent plugins.
- `antfu/skills` — **Skills, plugins, and discovery / Tier 2 / EVALUATE_SELECTIVELY**: Antfu skill collection.
- `claude-market/marketplace` — **Skills, plugins, and discovery / Tier 2 / DISCOVERY_ONLY**: Curated Claude Code plugin marketplace.
- `daymade/claude-code-skills` — **Skills, plugins, and discovery / Tier 2 / EVALUATE_SELECTIVELY**: Professional Claude Code skills marketplace with skill-reviewer.
- `DiversioTeam/agent-skills-marketplace` — **Skills, plugins, and discovery / Tier 2 / DISCOVERY_ONLY**: Cross-agent skill portability guidance.
- `K-Dense-AI/scientific-agent-skills` — **Skills, plugins, and discovery / Tier 2 / EVALUATE_SELECTIVELY**: Scientific/research skills.
- `microsoft/skills` — **Skills, plugins, and discovery / Tier 2 / EVALUATE_SELECTIVELY**: Microsoft skill collection.
- `quemsah/awesome-claude-plugins` — **Skills, plugins, and discovery / Tier 2 / DISCOVERY_ONLY**: Plugin trend/adoption radar.
- `rohitg00/awesome-claude-code-toolkit` — **Skills, plugins, and discovery / Tier 2 / DISCOVERY_ONLY**: Large toolkit index of agents/skills/commands/plugins/hooks/rules.
- `the911fund/skill-of-skills` — **Skills, plugins, and discovery / Tier 2 / DISCOVERY_ONLY**: Autonomous discovery engine for skills/plugins/MCP/agents.
- `TrailofBits/skills` — **Skills, plugins, and discovery / Tier 2 / EVALUATE_SELECTIVELY**: Security-focused skills from Trail of Bits.
- `abhisekjha/pith` — **Token and context architecture / Tier 2 / EVALUATE_SELECTIVELY**: Output compression modes and auto-escalation as context fills.
- `AgusRdz/chop` — **Token and context architecture / Tier 2 / EVALUATE_SELECTIVELY**: CLI output compressor supporting common dev tools.
- `alexgreensh/token-optimizer` — **Token and context architecture / Tier 2 / EVALUATE_SELECTIVELY**: Ghost-token/context-decay/compaction diagnostic layer.
- `buildoak/wet` — **Token and context architecture / Tier 2 / EVALUATE_SELECTIVELY**: Claude-driven meta-compression/proxy for stale tool result blocks.
- `claudioemmanuel/squeez` — **Token and context architecture / Tier 2 / EVALUATE_SELECTIVELY**: Cross-agent bash/output token optimizer for Claude Code, Codex, Gemini, OpenCode.
- `fastmcp-me/mcp-ComputeGauge` — **Token and context architecture / Tier 2 / EVALUATE_SELECTIVELY**: MCP/tool cost/computation measurement.
- `ojuschugh1/sqz` — **Token and context architecture / Tier 2 / EVALUATE_SELECTIVELY**: Context compression/dedup with session stats.
- `agent-sh/agentsys` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Multi-plugin, multi-agent, multi-skill system across Claude Code/Codex/OpenCode.
- `alexei-led/cc-thingz` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Plugin suite with skills/agents/hooks/commands and export to Codex/Gemini/AGENTS.md.
- `bdfinst/agentic-dev-team` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Agentic dev team workflow.
- `garrytan/gstack` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Startup/agentic workflow patterns.
- `github/spec-kit` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Spec-driven development kit from GitHub.
- `gotalab/cc-sdd` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Spec-driven development for Claude Code.
- `humanlayer/advanced-context-engineering-for-coding-agents` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Advanced context-engineering patterns for coding agents.
- `intellectronica/ruler` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Rule/context management across coding agents.
- `maxritter/pilot-shell` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Agentic shell/operator workflow.
- `obra/superpowers` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Cross-agent skills framework.
- `obra/superpowers-marketplace` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Superpowers marketplace and Claude Code plugin/dev skills.
- `pablomarin/claude-codex-forge` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Claude/Codex forge workflow.
- `rawr-ai/codex-linear-method-toolkit` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Linear-method ticket decomposition with worktree-per-agent pattern.
- `SethGammon/Citadel` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Parallel agents, isolated worktrees, campaign memory, routing, hooks, skills.
- `shinpr/claude-code-workflows` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Requirements/design/implementation/quality workflow recipes.
- `SuperClaude-Org/SuperClaude_Framework` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: Commands/personas/modes/MCP framework.
- `Wirasm/PRPs-agentic-eng` — **Workflow, harness, and lifecycle / Tier 2 / EVALUATE_SELECTIVELY**: PRP agentic engineering patterns.

## Tier 3: watchlist / source-audit / specialized inspiration

- `AikidoSec/aikido-claude-plugin` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Aikido security plugin.
- `ananddtyagi/cc-marketplace` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Claude Code plugin/agent marketplace.
- `c9r-io/orchestrator` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agent orchestrator pattern.
- `changoo89/claude-pilot` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Claude pilot workflow.
- `cocaxcode/token-optimizer-mcp` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: MCP token optimizer.
- `croakingtoad/context-engineering-mcp` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Context engineering MCP.
- `danielrosehill/spec-starter-plugin` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Spec starter plugin.
- `deepklarity/harness-kit` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Harness kit patterns.
- `different-ai/openwork` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Open work agent platform.
- `disler/claude-code-hooks-multi-agent-observability` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Hooks/observability for multi-agent Claude Code.
- `edimuj/vexscan-claude-code` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Claude Code security scanner plugin.
- `elicpeter/pitboss` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agent manager/control pattern.
- `Enderfga/openclaw-claude-code` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: OpenClaw/Claude bridge pattern.
- `frankbria/ralph-claude-code` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Ralph Claude Code workflow.
- `Gitlawb/openclaude` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Open Claude Code alternative/experimental.
- `glebis/claude-skills` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Claude skills collection.
- `google-gemini/gemini-cli` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Gemini CLI peer agent.
- `google-github-actions/run-gemini-cli` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: GitHub Action for Gemini CLI.
- `harish-garg/security-scanner-plugin` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Security scanner plugin.
- `infiniV/ultra-instinct-claude-code` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Claude Code optimization/reference.
- `Itachi-1824/claude-god-mode` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Token/reasoning optimization toolkit; audit claims/source.
- `JuliusBrussee/blueprint` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Blueprint/spec pattern.
- `Kilo-Org/kilocode` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Open coding-agent ecosystem tool.
- `kodustech/agent-readiness` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agent readiness checks.
- `levnikolaevich/claude-code-skills` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Plugin suite with workflow/audit/bootstrap skills.
- `littlebearapps/contextdocs` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Context docs management.
- `memvid/claude-brain` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Memory layer; audit privacy.
- `ogulcancelik/herdr` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agent orchestration/herding pattern.
- `oxygen-fragment/claude-modular` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Modular Claude Code framework with token optimization and commands.
- `pugliatechs/polpo` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agent operator/harness pattern.
- `QwenLM/qwen-code` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Qwen terminal coding agent.
- `saltbo/agent-kanban` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agent Kanban.
- `sampleXbro/agentsmesh` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agents mesh.
- `simion/reviewd` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Review daemon.
- `sonatype/sonatype-guide-claude-plugin` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Sonatype guide/plugin.
- `SpillwaveSolutions/sdd-skill` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Spec-driven development skill.
- `sst/opencode` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: OpenCode terminal coding agent.
- `subsy/ralph-tui` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Ralph terminal UI.
- `tngwilkins/agentic-engineering-starter-pack` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agentic engineering starter pack.
- `Vinix24/vnx-orchestration` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Agent orchestration pattern.
- `wanshuiyin/Auto-claude-code-research-in-sleep` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Skill/CLI research automation; useful for long research loops.
- `webdevtodayjason/context-forge` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Context forge.
- `Weizhena/Deep-Research-skills` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Deep research skills.
- `willywg/prp-manager` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: PRP manager.
- `zircote/claude-spec` — **Selective frontier and peer ecosystem / Tier 3 / AUDIT_REQUIRED**: Spec workflow.
- `mhattingpete/claude-skills-marketplace` — **Skills, plugins, and discovery / Tier 3 / DISCOVERY_ONLY**: Plugin/skills marketplace.
- `Token-Eater/skills-marketplace` — **Skills, plugins, and discovery / Tier 3 / DISCOVERY_ONLY**: Community Claude skills marketplace.
- `cytostack/openwolf` — **Token and context architecture / Tier 3 / EVALUATE_SELECTIVELY**: Memory/read-deduping and project anatomy layer.
- `edouard-claude/snip` — **Token and context architecture / Tier 3 / EVALUATE_SELECTIVELY**: YAML-driven CLI output filter.
- `mpecan/tokf` — **Token and context architecture / Tier 3 / EVALUATE_SELECTIVELY**: Config-driven output filter.
- `yvgude/lean-ctx` — **Token and context architecture / Tier 3 / EVALUATE_SELECTIVELY**: Hook + MCP context layer.

---

# Full category breakdown

## CLI, terminal, code quality, and security gates

- `aquasecurity/trivy` — **Tier 1 / CLI_FOUNDATION**. Container/IaC/dependency vulnerability scanning.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/aquasecurity/trivy
- `astral-sh/ruff` — **Tier 1 / CLI_FOUNDATION**. Fast Python linter/formatter.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/astral-sh/ruff
- `biomejs/biome` — **Tier 1 / CLI_FOUNDATION**. JS/TS formatter/linter.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/biomejs/biome
- `casey/just` — **Tier 1 / CLI_FOUNDATION**. Task runner for reproducible commands.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/casey/just
- `gitleaks/gitleaks` — **Tier 1 / CLI_FOUNDATION**. Secret scanning.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/gitleaks/gitleaks
- `hadolint/hadolint` — **Tier 1 / CLI_FOUNDATION**. Dockerfile linter.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/hadolint/hadolint
- `jdx/mise` — **Tier 1 / CLI_FOUNDATION**. Tool/version/task environment manager.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/jdx/mise
- `koalaman/shellcheck` — **Tier 1 / CLI_FOUNDATION**. Shell script linter.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/koalaman/shellcheck
- `pre-commit/pre-commit` — **Tier 1 / CLI_FOUNDATION**. Local pre-commit quality framework.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/pre-commit/pre-commit
- `rhysd/actionlint` — **Tier 1 / CLI_FOUNDATION**. GitHub Actions workflow linter.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/rhysd/actionlint
- `semgrep/semgrep` — **Tier 1 / CLI_FOUNDATION**. Static analysis/security rules.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/semgrep/semgrep
- `trufflesecurity/trufflehog` — **Tier 1 / CLI_FOUNDATION**. Secret scanning with verification.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/trufflesecurity/trufflehog
- `astral-sh/uv` — **Tier 2 / CLI_FOUNDATION**. Fast Python package/project manager.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/astral-sh/uv
- `bridgecrewio/checkov` — **Tier 2 / CLI_FOUNDATION**. IaC security scanner.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/bridgecrewio/checkov
- `crate-ci/typos` — **Tier 2 / CLI_FOUNDATION**. Fast typo checker.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/crate-ci/typos
- `dandavison/delta` — **Tier 2 / CLI_FOUNDATION**. Git diff viewer upstream/alternate entry.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/dandavison/delta
- `evilmartians/lefthook` — **Tier 2 / CLI_FOUNDATION**. Git hooks manager.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/evilmartians/lefthook
- `eza-community/eza` — **Tier 2 / CLI_FOUNDATION**. Modern ls/tree alternative.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/eza-community/eza
- `golangci/golangci-lint` — **Tier 2 / CLI_FOUNDATION**. Go linter aggregator.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/golangci/golangci-lint
- `InvariantLabs-ai/mcp-scan` — **Tier 2 / CLI_FOUNDATION**. MCP security scanner.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/InvariantLabs-ai/mcp-scan
- `junegunn/fzf` — **Tier 2 / CLI_FOUNDATION**. Fuzzy finder.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/junegunn/fzf
- `MCP-Defender/MCP-Defender` — **Tier 2 / CLI_FOUNDATION**. MCP security runtime/guard.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/MCP-Defender/MCP-Defender
- `ossf/scorecard` — **Tier 2 / CLI_FOUNDATION**. OpenSSF project health/security scoring.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/ossf/scorecard
- `oxc-project/oxc` — **Tier 2 / CLI_FOUNDATION**. JS/TS compiler/lint/parser toolchain.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/oxc-project/oxc
- `oxsecurity/megalinter` — **Tier 2 / CLI_FOUNDATION**. Multi-language mega linter aggregator.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/oxsecurity/megalinter
- `sharkdp/bat` — **Tier 2 / CLI_FOUNDATION**. Better cat with syntax context.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/sharkdp/bat
- `sharkdp/hyperfine` — **Tier 2 / CLI_FOUNDATION**. Command benchmarking.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/sharkdp/hyperfine
- `step-security/harden-runner` — **Tier 2 / CLI_FOUNDATION**. GitHub Actions runner hardening.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/step-security/harden-runner
- `sxyazi/yazi` — **Tier 2 / CLI_FOUNDATION**. Terminal file manager.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/sxyazi/yazi
- `terraform-linters/tflint` — **Tier 2 / CLI_FOUNDATION**. Terraform linter.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/terraform-linters/tflint
- `woodruffw/zizmor` — **Tier 2 / CLI_FOUNDATION**. GitHub Actions security linter.  
  Why: Deterministic quality gates make autonomous agent output testable and mergeable.  
  Risk: Pin versions and run in CI/local hooks before allowing autonomous merge.  
  URL: https://github.com/woodruffw/zizmor

## Code intelligence and CLI foundations

- `ast-grep/ast-grep` — **Tier 1 / EVALUATE_SELECTIVELY**. AST-aware search/refactor; precise structural edits.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/ast-grep/ast-grep
- `BurntSushi/ripgrep` — **Tier 1 / CLI_FOUNDATION**. Fast text search; default search primitive.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/BurntSushi/ripgrep
- `cli/cli` — **Tier 1 / CLI_FOUNDATION**. GitHub CLI; often cheaper/context-cleaner than GitHub MCP.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/cli/cli
- `jqlang/jq` — **Tier 1 / CLI_FOUNDATION**. JSON slicing for small context results.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/jqlang/jq
- `mikefarah/yq` — **Tier 1 / CLI_FOUNDATION**. YAML/XML/TOML slicing for small context results.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/mikefarah/yq
- `sharkdp/fd` — **Tier 1 / CLI_FOUNDATION**. Fast file discovery; avoid noisy find output.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/sharkdp/fd
- `tree-sitter/tree-sitter` — **Tier 1 / EVALUATE_SELECTIVELY**. Parser foundation for structural code understanding.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/tree-sitter/tree-sitter
- `mixedbread-ai/mgrep` — **Tier 2 / EVALUATE_SELECTIVELY**. Semantic grep / code retrieval tool.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/mixedbread-ai/mgrep
- `sourcegraph/cody` — **Tier 2 / EVALUATE_SELECTIVELY**. Code intelligence/search reference for large codebases.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/sourcegraph/cody
- `yoanbernabeu/grepai` — **Tier 2 / EVALUATE_SELECTIVELY**. AI-assisted grep/search pattern.  
  Why: Precise retrieval and small outputs are core token-optimization primitives.  
  Risk: Generally safe CLI/tooling, but still pin versions in production.  
  URL: https://github.com/yoanbernabeu/grepai

## Codex and multi-model bridges

- `alexanderatallah/redline` — **Tier 2 / AUDIT_REQUIRED**. Review/critique layer for coding agents.  
  Why: Adversarial review pattern.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/alexanderatallah/redline
- `bfly123/claude_codex_bridge` — **Tier 2 / AUDIT_REQUIRED**. Bridge between Claude and Codex flows.  
  Why: Second-model witness pattern.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/bfly123/claude_codex_bridge
- `nikuscs/codex-cc-plugin` — **Tier 2 / AUDIT_REQUIRED**. Codex plugin for Claude Code.  
  Why: Alternative bridge; use official plugin first.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/nikuscs/codex-cc-plugin
- `promptadvisers/claudex` — **Tier 2 / AUDIT_REQUIRED**. Claude/Codex bridge/plugin.  
  Why: Cross-model review/delegation pattern.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/promptadvisers/claudex
- `RoggeOhta/awesome-codex-cli` — **Tier 2 / AUDIT_REQUIRED**. Codex CLI ecosystem list.  
  Why: Discovery layer for Codex peer tooling.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/RoggeOhta/awesome-codex-cli
- `sakibsadmanshajib/gemini-plugin-cc` — **Tier 2 / AUDIT_REQUIRED**. Gemini plugin for Claude Code.  
  Why: Gemini as research/review peer.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/sakibsadmanshajib/gemini-plugin-cc
- `sendbird/cc-plugin-codex` — **Tier 2 / AUDIT_REQUIRED**. Codex plugin for Claude Code.  
  Why: Alternative bridge; use official plugin first.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/sendbird/cc-plugin-codex
- `tasict/opencode-plugin-cc` — **Tier 2 / AUDIT_REQUIRED**. OpenCode plugin for Claude Code.  
  Why: OpenCode peer-review bridge.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/tasict/opencode-plugin-cc
- `xiaolai/codex-toolkit-for-claude` — **Tier 2 / AUDIT_REQUIRED**. Codex MCP integration for Claude Code: audit, implement, verify, review, debug.  
  Why: Alternative/companion to codex-plugin-cc; audit carefully.  
  Risk: Bridge plugins can cross permission boundaries. Audit auth, sandboxing, MCP, shell access, and history/state isolation before use.  
  URL: https://github.com/xiaolai/codex-toolkit-for-claude

## Guides and discovery references

- `anipotts/claude-code-tips` — **Tier 2 / REFERENCE_ONLY**. Claude Code tips and tricks.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/anipotts/claude-code-tips
- `awattar/claude-code-best-practices` — **Tier 2 / REFERENCE_ONLY**. Claude Code best-practices reference.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/awattar/claude-code-best-practices
- `Cranot/claude-code-guide` — **Tier 2 / REFERENCE_ONLY**. Complete auto-updated Claude Code guide.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/Cranot/claude-code-guide
- `danielrosehill/Awesome-AI-Coding-Tools` — **Tier 2 / REFERENCE_ONLY**. AI coding tools discovery.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/danielrosehill/Awesome-AI-Coding-Tools
- `davepoon/buildwithclaude` — **Tier 2 / REFERENCE_ONLY**. Claude ecosystem learning/reference.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/davepoon/buildwithclaude
- `efij/awesome-claude-code-security` — **Tier 2 / REFERENCE_ONLY**. Claude Code security discovery.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/efij/awesome-claude-code-security
- `FlorianBruniaux/claude-code-ultimate-guide` — **Tier 2 / REFERENCE_ONLY**. Beginner-to-power-user Claude Code guide/templates.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/FlorianBruniaux/claude-code-ultimate-guide
- `gmh5225/awesome-ai-security` — **Tier 2 / REFERENCE_ONLY**. AI security resources.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/gmh5225/awesome-ai-security
- `hashgraph-online/awesome-ai-plugins` — **Tier 2 / REFERENCE_ONLY**. AI plugin discovery.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/hashgraph-online/awesome-ai-plugins
- `lawwu/claude-code-field-guide` — **Tier 2 / REFERENCE_ONLY**. Claude Code field guide.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/lawwu/claude-code-field-guide
- `luongnv89/claude-howto` — **Tier 2 / REFERENCE_ONLY**. Claude Code commands/how-to guide.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/luongnv89/claude-howto
- `MuhammadUsmanGM/claude-code-best-practices` — **Tier 2 / REFERENCE_ONLY**. Claude Code best-practices reference.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/MuhammadUsmanGM/claude-code-best-practices
- `rosmur/claudecode-best-practices` — **Tier 2 / REFERENCE_ONLY**. Claude Code best-practices reference.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/rosmur/claudecode-best-practices
- `sorrycc/awesome-code-agents` — **Tier 2 / REFERENCE_ONLY**. Code-agent ecosystem discovery.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/sorrycc/awesome-code-agents
- `VILA-Lab/Dive-into-Claude-Code` — **Tier 2 / REFERENCE_ONLY**. Claude Code internals/guide reference.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/VILA-Lab/Dive-into-Claude-Code
- `wesammustafa/Claude-Code-Everything-You-Need-to-Know` — **Tier 2 / REFERENCE_ONLY**. Broad Claude Code setup/workflow reference.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know
- `ykdojo/claude-code-tips` — **Tier 2 / REFERENCE_ONLY**. Practical Claude Code tips.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/ykdojo/claude-code-tips
- `zebbern/claude-code-guide` — **Tier 2 / REFERENCE_ONLY**. Claude Code setup/workflow guide.  
  Why: Reference layer for Claude Code to mine patterns, not default install.  
  Risk: Reference content can go stale; verify commands and security before execution.  
  URL: https://github.com/zebbern/claude-code-guide

## Measurement and observability

- `ryoppippi/ccusage` — **Tier 1 / DEFAULT_INSTALL**. Token/cost/session accounting from local Claude Code JSONL; also useful around Codex/OpenCode logs.  
  Why: Measurement before optimization; install first.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/ryoppippi/ccusage
- `0xhimanshu/governor` — **Tier 2 / EVALUATE_SELECTIVELY**. Usage/budget governance pattern for agent runs.  
  Why: Budget guardrails are required for unleashed automation.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/0xhimanshu/governor
- `Abinesh-L/claude-crusts` — **Tier 2 / EVALUATE_SELECTIVELY**. Claude Code telemetry/statusline ecosystem component.  
  Why: Watch usage and session health.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Abinesh-L/claude-crusts
- `jeongwookie/WhereMyTokens` — **Tier 2 / EVALUATE_SELECTIVELY**. Token location / token attribution helper.  
  Why: Useful to debug where context budget is going.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/jeongwookie/WhereMyTokens
- `matt1398/claude-devtools` — **Tier 2 / EVALUATE_SELECTIVELY**. Visual session, context, tool-call, token, and subagent inspection.  
  Why: Best forensic UI when automation behaves unexpectedly.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/matt1398/claude-devtools
- `sirmalloc/ccstatusline` — **Tier 2 / EVALUATE_SELECTIVELY**. Statusline for model/git/context/cost state.  
  Why: Low-friction operator feedback in every session.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/sirmalloc/ccstatusline
- `spences10/claude-code-analytics` — **Tier 2 / EVALUATE_SELECTIVELY**. Claude Code analytics dashboard.  
  Why: Good secondary usage-analysis layer.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/spences10/claude-code-analytics
- `toolsu/ccost` — **Tier 2 / EVALUATE_SELECTIVELY**. Cost/status monitoring for Claude Code sessions.  
  Why: Budget observability for longer autonomous runs.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/toolsu/ccost

## Official foundation

- `agentskills/agentskills` — **Tier 0 / FOUNDATION**. Portable Agent Skills format for Claude Code, Codex, Gemini, Cursor-style agents.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/agentskills/agentskills
- `anthropics/claude-agent-sdk-python` — **Tier 0 / FOUNDATION**. Python SDK for building agentic Claude Code-like workflows.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/claude-agent-sdk-python
- `anthropics/claude-agent-sdk-typescript` — **Tier 0 / FOUNDATION**. TypeScript SDK for agentic Claude workflows.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/claude-agent-sdk-typescript
- `anthropics/claude-code` — **Tier 0 / FOUNDATION**. Core Claude Code CLI: commands, hooks, skills, subagents, worktrees, git automation.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/claude-code
- `anthropics/claude-code-action` — **Tier 0 / FOUNDATION**. Official GitHub Action for Claude Code automation in PRs/issues.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/claude-code-action
- `anthropics/claude-code-base-action` — **Tier 0 / FOUNDATION**. Lower-level official action for custom Claude Code GitHub workflows.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/claude-code-base-action
- `anthropics/claude-code-security-review` — **Tier 0 / FOUNDATION**. Official Claude Code security-review action for trusted PRs.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/claude-code-security-review
- `anthropics/claude-plugins-official` — **Tier 0 / FOUNDATION**. Official plugin marketplace/directory reference.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/claude-plugins-official
- `anthropics/skills` — **Tier 0 / FOUNDATION**. Official skill examples; canonical pattern for progressive disclosure.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/anthropics/skills
- `github/codeql-action` — **Tier 0 / FOUNDATION**. Deterministic code security analysis; objective CI gate.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/github/codeql-action
- `github/gh-aw` — **Tier 0 / FOUNDATION**. GitHub Agentic Workflows: markdown workflows to GitHub Actions-based AI flows.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/github/gh-aw
- `modelcontextprotocol/inspector` — **Tier 0 / FOUNDATION**. MCP inspection/debugging tool.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/modelcontextprotocol/inspector
- `modelcontextprotocol/modelcontextprotocol` — **Tier 0 / FOUNDATION**. MCP protocol specification.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/modelcontextprotocol/modelcontextprotocol
- `modelcontextprotocol/servers` — **Tier 0 / FOUNDATION**. Reference MCP servers; use as examples, not default production install.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/modelcontextprotocol/servers
- `openai/codex` — **Tier 0 / FOUNDATION**. OpenAI terminal coding agent; peer to Claude Code for cross-model workflows.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/openai/codex
- `openai/codex-plugin-cc` — **Tier 0 / FOUNDATION**. Bridge that lets Claude Code call Codex for review, adversarial review, rescue, status/result/cancel.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/openai/codex-plugin-cc
- `openai/symphony` — **Tier 0 / FOUNDATION**. OpenAI autonomous implementation-run research surface; inspiration for isolated execution loops.  
  Why: Official or standards-layer component; build around these before community repos.  
  Risk: Official/standards layer. Still audit configs and permissions in your environment.  
  URL: https://github.com/openai/symphony

## Parallel execution and operator UI

- `ComposioHQ/agent-orchestrator` — **Tier 1 / EVALUATE_SELECTIVELY**. Distributed dashboard: Claude Code/Codex/Aider/OpenCode in isolated worktrees with PRs.  
  Why: Best enterprise-like multi-agent operator pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/ComposioHQ/agent-orchestrator
- `fynnfluegge/agtx` — **Tier 1 / EVALUATE_SELECTIVELY**. Kanban blackboard for coding agents; orchestrator, skills, MCP, worktrees, tmux.  
  Why: Strong task-board → agent-worktree pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/fynnfluegge/agtx
- `nutthouse/tutti` — **Tier 1 / EVALUATE_SELECTIVELY**. Versioned agent-operations layer with roles, workflows, hooks, gates, policies, worktrees, dashboards, token usage.  
  Why: Best emerging ops-layer architecture.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/nutthouse/tutti
- `smtg-ai/claude-squad` — **Tier 1 / EVALUATE_SELECTIVELY**. Local terminal/TUI for multiple coding agents in separate workspaces.  
  Why: Best local multi-agent operator console.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/smtg-ai/claude-squad
- `yxwucq/CCUI` — **Tier 1 / EVALUATE_SELECTIVELY**. Runs Claude Code and Codex CLI in isolated git worktrees with diff/cost/merge controls.  
  Why: Strong Claude+Codex operator UI.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/yxwucq/CCUI
- `basnijholt/agent-cli` — **Tier 2 / EVALUATE_SELECTIVELY**. CLI to create worktrees and launch agents/editors with env/setup.  
  Why: Practical worktree launcher.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/basnijholt/agent-cli
- `BloopAI/vibe-kanban` — **Tier 2 / EVALUATE_SELECTIVELY**. Kanban/operator layer for coding agents.  
  Why: High-quality multi-agent control plane pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/BloopAI/vibe-kanban
- `gabrielkoerich/orchestrator` — **Tier 2 / EVALUATE_SELECTIVELY**. GitHub Issues → isolated worktree agents → merged PR with tmux sessions.  
  Why: Excellent lightweight issue-to-PR orchestration pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/gabrielkoerich/orchestrator
- `jamesrochabrun/AgentHub` — **Tier 2 / EVALUATE_SELECTIVELY**. Operator UI for agents.  
  Why: Multi-agent supervision pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/jamesrochabrun/AgentHub
- `johannesjo/parallel-code` — **Tier 2 / EVALUATE_SELECTIVELY**. Parallel code agents in worktrees.  
  Why: Good focused runner.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/johannesjo/parallel-code
- `manaflow-ai/cmux` — **Tier 2 / EVALUATE_SELECTIVELY**. Multiple coding-agent session manager.  
  Why: Operator/control plane pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/manaflow-ai/cmux
- `max-sixty/worktrunk` — **Tier 2 / EVALUATE_SELECTIVELY**. Worktree workflow simplifier for Claude/Codex.  
  Why: Good worktree ergonomics.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/max-sixty/worktrunk
- `milisp/codexia` — **Tier 2 / EVALUATE_SELECTIVELY**. Codex/Claude agent orchestration UI.  
  Why: Operator/bridge pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/milisp/codexia
- `preset-io/agor` — **Tier 2 / EVALUATE_SELECTIVELY**. Multiplayer canvas for Claude/Codex/Gemini sessions and worktrees.  
  Why: Interesting session genealogy / canvas pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/preset-io/agor
- `slopus/happy` — **Tier 2 / EVALUATE_SELECTIVELY**. Parallel agent/operator workflow.  
  Why: Worktree operator watchlist.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/slopus/happy
- `stravu/crystal` — **Tier 2 / EVALUATE_SELECTIVELY**. Multi-agent coding workspace.  
  Why: Operator UI pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/stravu/crystal
- `superset-sh/superset` — **Tier 2 / EVALUATE_SELECTIVELY**. Parallel CLI-agent orchestration with worktree isolation.  
  Why: Good operator/dashboard pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/superset-sh/superset
- `winfunc/opcode` — **Tier 2 / EVALUATE_SELECTIVELY**. OpenCode/Claude/Codex workflow operator.  
  Why: Operator watchlist.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/winfunc/opcode

## Selective frontier and peer ecosystem

- `AikidoSec/aikido-claude-plugin` — **Tier 3 / AUDIT_REQUIRED**. Aikido security plugin.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/AikidoSec/aikido-claude-plugin
- `ananddtyagi/cc-marketplace` — **Tier 3 / AUDIT_REQUIRED**. Claude Code plugin/agent marketplace.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/ananddtyagi/cc-marketplace
- `c9r-io/orchestrator` — **Tier 3 / AUDIT_REQUIRED**. Agent orchestrator pattern.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/c9r-io/orchestrator
- `changoo89/claude-pilot` — **Tier 3 / AUDIT_REQUIRED**. Claude pilot workflow.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/changoo89/claude-pilot
- `cocaxcode/token-optimizer-mcp` — **Tier 3 / AUDIT_REQUIRED**. MCP token optimizer.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/cocaxcode/token-optimizer-mcp
- `croakingtoad/context-engineering-mcp` — **Tier 3 / AUDIT_REQUIRED**. Context engineering MCP.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/croakingtoad/context-engineering-mcp
- `danielrosehill/spec-starter-plugin` — **Tier 3 / AUDIT_REQUIRED**. Spec starter plugin.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/danielrosehill/spec-starter-plugin
- `deepklarity/harness-kit` — **Tier 3 / AUDIT_REQUIRED**. Harness kit patterns.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/deepklarity/harness-kit
- `different-ai/openwork` — **Tier 3 / AUDIT_REQUIRED**. Open work agent platform.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/different-ai/openwork
- `disler/claude-code-hooks-multi-agent-observability` — **Tier 3 / AUDIT_REQUIRED**. Hooks/observability for multi-agent Claude Code.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/disler/claude-code-hooks-multi-agent-observability
- `edimuj/vexscan-claude-code` — **Tier 3 / AUDIT_REQUIRED**. Claude Code security scanner plugin.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/edimuj/vexscan-claude-code
- `elicpeter/pitboss` — **Tier 3 / AUDIT_REQUIRED**. Agent manager/control pattern.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/elicpeter/pitboss
- `Enderfga/openclaw-claude-code` — **Tier 3 / AUDIT_REQUIRED**. OpenClaw/Claude bridge pattern.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Enderfga/openclaw-claude-code
- `frankbria/ralph-claude-code` — **Tier 3 / AUDIT_REQUIRED**. Ralph Claude Code workflow.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/frankbria/ralph-claude-code
- `Gitlawb/openclaude` — **Tier 3 / AUDIT_REQUIRED**. Open Claude Code alternative/experimental.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Gitlawb/openclaude
- `glebis/claude-skills` — **Tier 3 / AUDIT_REQUIRED**. Claude skills collection.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/glebis/claude-skills
- `google-gemini/gemini-cli` — **Tier 3 / AUDIT_REQUIRED**. Gemini CLI peer agent.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/google-gemini/gemini-cli
- `google-github-actions/run-gemini-cli` — **Tier 3 / AUDIT_REQUIRED**. GitHub Action for Gemini CLI.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/google-github-actions/run-gemini-cli
- `harish-garg/security-scanner-plugin` — **Tier 3 / AUDIT_REQUIRED**. Security scanner plugin.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/harish-garg/security-scanner-plugin
- `infiniV/ultra-instinct-claude-code` — **Tier 3 / AUDIT_REQUIRED**. Claude Code optimization/reference.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/infiniV/ultra-instinct-claude-code
- `Itachi-1824/claude-god-mode` — **Tier 3 / AUDIT_REQUIRED**. Token/reasoning optimization toolkit; audit claims/source.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Itachi-1824/claude-god-mode
- `JuliusBrussee/blueprint` — **Tier 3 / AUDIT_REQUIRED**. Blueprint/spec pattern.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/JuliusBrussee/blueprint
- `Kilo-Org/kilocode` — **Tier 3 / AUDIT_REQUIRED**. Open coding-agent ecosystem tool.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Kilo-Org/kilocode
- `kodustech/agent-readiness` — **Tier 3 / AUDIT_REQUIRED**. Agent readiness checks.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/kodustech/agent-readiness
- `levnikolaevich/claude-code-skills` — **Tier 3 / AUDIT_REQUIRED**. Plugin suite with workflow/audit/bootstrap skills.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/levnikolaevich/claude-code-skills
- `littlebearapps/contextdocs` — **Tier 3 / AUDIT_REQUIRED**. Context docs management.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/littlebearapps/contextdocs
- `memvid/claude-brain` — **Tier 3 / AUDIT_REQUIRED**. Memory layer; audit privacy.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/memvid/claude-brain
- `ogulcancelik/herdr` — **Tier 3 / AUDIT_REQUIRED**. Agent orchestration/herding pattern.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/ogulcancelik/herdr
- `oxygen-fragment/claude-modular` — **Tier 3 / AUDIT_REQUIRED**. Modular Claude Code framework with token optimization and commands.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/oxygen-fragment/claude-modular
- `pugliatechs/polpo` — **Tier 3 / AUDIT_REQUIRED**. Agent operator/harness pattern.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/pugliatechs/polpo
- `QwenLM/qwen-code` — **Tier 3 / AUDIT_REQUIRED**. Qwen terminal coding agent.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/QwenLM/qwen-code
- `saltbo/agent-kanban` — **Tier 3 / AUDIT_REQUIRED**. Agent Kanban.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/saltbo/agent-kanban
- `sampleXbro/agentsmesh` — **Tier 3 / AUDIT_REQUIRED**. Agents mesh.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/sampleXbro/agentsmesh
- `simion/reviewd` — **Tier 3 / AUDIT_REQUIRED**. Review daemon.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/simion/reviewd
- `sonatype/sonatype-guide-claude-plugin` — **Tier 3 / AUDIT_REQUIRED**. Sonatype guide/plugin.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/sonatype/sonatype-guide-claude-plugin
- `SpillwaveSolutions/sdd-skill` — **Tier 3 / AUDIT_REQUIRED**. Spec-driven development skill.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/SpillwaveSolutions/sdd-skill
- `sst/opencode` — **Tier 3 / AUDIT_REQUIRED**. OpenCode terminal coding agent.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/sst/opencode
- `subsy/ralph-tui` — **Tier 3 / AUDIT_REQUIRED**. Ralph terminal UI.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/subsy/ralph-tui
- `tngwilkins/agentic-engineering-starter-pack` — **Tier 3 / AUDIT_REQUIRED**. Agentic engineering starter pack.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/tngwilkins/agentic-engineering-starter-pack
- `Vinix24/vnx-orchestration` — **Tier 3 / AUDIT_REQUIRED**. Agent orchestration pattern.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Vinix24/vnx-orchestration
- `wanshuiyin/Auto-claude-code-research-in-sleep` — **Tier 3 / AUDIT_REQUIRED**. Skill/CLI research automation; useful for long research loops.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep
- `webdevtodayjason/context-forge` — **Tier 3 / AUDIT_REQUIRED**. Context forge.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/webdevtodayjason/context-forge
- `Weizhena/Deep-Research-skills` — **Tier 3 / AUDIT_REQUIRED**. Deep research skills.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Weizhena/Deep-Research-skills
- `willywg/prp-manager` — **Tier 3 / AUDIT_REQUIRED**. PRP manager.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/willywg/prp-manager
- `zircote/claude-spec` — **Tier 3 / AUDIT_REQUIRED**. Spec workflow.  
  Why: Useful pattern or frontier candidate; include for inspiration and selective audit, not default install.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/zircote/claude-spec

## Skills, plugins, and discovery

- `Agent-Analytics/awesome-multi-agent-orchestrators` — **Tier 1 / DISCOVERY_ONLY**. Parallel coding-agent orchestrator list.  
  Why: Good parallel-runner discovery.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/Agent-Analytics/awesome-multi-agent-orchestrators
- `andyrewlee/awesome-agent-orchestrators` — **Tier 1 / DISCOVERY_ONLY**. Multi-agent orchestrators list.  
  Why: Best operator/orchestration discovery.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/andyrewlee/awesome-agent-orchestrators
- `bradAGI/awesome-cli-coding-agents` — **Tier 1 / DISCOVERY_ONLY**. Terminal-native AI coding agents and orchestrators directory.  
  Why: Best CLI-agent ecosystem map.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/bradAGI/awesome-cli-coding-agents
- `ComposioHQ/awesome-claude-skills` — **Tier 1 / DISCOVERY_ONLY**. Large curated Claude Skills resources/tools.  
  Why: Best broad Claude Skills discovery.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/ComposioHQ/awesome-claude-skills
- `hesreallyhim/awesome-claude-code` — **Tier 1 / DISCOVERY_ONLY**. Curated Claude Code skills/hooks/commands/orchestrators/apps/plugins list.  
  Why: Best Claude Code discovery list.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/hesreallyhim/awesome-claude-code
- `subinium/awesome-claude-code` — **Tier 1 / DISCOVERY_ONLY**. High-star Claude Code/Codex/Gemini/Cursor resources.  
  Why: Good high-signal discovery source.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/subinium/awesome-claude-code
- `VoltAgent/awesome-agent-skills` — **Tier 1 / DISCOVERY_ONLY**. 1000+ cross-agent skills compatible with Claude Code/Codex/Gemini/Cursor.  
  Why: Best cross-agent skill discovery.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/VoltAgent/awesome-agent-skills
- `alirezarezvani/claude-skills` — **Tier 2 / EVALUATE_SELECTIVELY**. Large Claude Code skills and agent plugins.  
  Why: Good selective skill source.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/alirezarezvani/claude-skills
- `antfu/skills` — **Tier 2 / EVALUATE_SELECTIVELY**. Antfu skill collection.  
  Why: High-quality personal skill patterns.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/antfu/skills
- `claude-market/marketplace` — **Tier 2 / DISCOVERY_ONLY**. Curated Claude Code plugin marketplace.  
  Why: Discovery; audit before install.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/claude-market/marketplace
- `daymade/claude-code-skills` — **Tier 2 / EVALUATE_SELECTIVELY**. Professional Claude Code skills marketplace with skill-reviewer.  
  Why: Good skill-quality layer.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/daymade/claude-code-skills
- `DiversioTeam/agent-skills-marketplace` — **Tier 2 / DISCOVERY_ONLY**. Cross-agent skill portability guidance.  
  Why: Good compatibility guidance for Claude/Codex skills.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/DiversioTeam/agent-skills-marketplace
- `K-Dense-AI/scientific-agent-skills` — **Tier 2 / EVALUATE_SELECTIVELY**. Scientific/research skills.  
  Why: Good domain skills.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/K-Dense-AI/scientific-agent-skills
- `microsoft/skills` — **Tier 2 / EVALUATE_SELECTIVELY**. Microsoft skill collection.  
  Why: Trusted vendor skill source.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/microsoft/skills
- `quemsah/awesome-claude-plugins` — **Tier 2 / DISCOVERY_ONLY**. Plugin trend/adoption radar.  
  Why: Discovery; popularity is not trust.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/quemsah/awesome-claude-plugins
- `rohitg00/awesome-claude-code-toolkit` — **Tier 2 / DISCOVERY_ONLY**. Large toolkit index of agents/skills/commands/plugins/hooks/rules.  
  Why: Discovery/reference; avoid bulk install.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/rohitg00/awesome-claude-code-toolkit
- `the911fund/skill-of-skills` — **Tier 2 / DISCOVERY_ONLY**. Autonomous discovery engine for skills/plugins/MCP/agents.  
  Why: Good discovery engine for cross-agent skills.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/the911fund/skill-of-skills
- `TrailofBits/skills` — **Tier 2 / EVALUATE_SELECTIVELY**. Security-focused skills from Trail of Bits.  
  Why: High-trust security skills.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/TrailofBits/skills
- `mhattingpete/claude-skills-marketplace` — **Tier 3 / DISCOVERY_ONLY**. Plugin/skills marketplace.  
  Why: Discovery; audit before install.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/mhattingpete/claude-skills-marketplace
- `Token-Eater/skills-marketplace` — **Tier 3 / DISCOVERY_ONLY**. Community Claude skills marketplace.  
  Why: Discovery; audit before install.  
  Risk: Discovery/marketplace entries are not a security guarantee; audit each plugin or skill before installing.  
  URL: https://github.com/Token-Eater/skills-marketplace

## Token and context architecture

- `aider-ai/aider` — **Tier 1 / EVALUATE_SELECTIVELY**. Alternative terminal coding agent with repo-map pattern.  
  Why: Repo-map architecture is a core design pattern even if Claude Code remains primary.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/aider-ai/aider
- `chopratejas/headroom` — **Tier 1 / EVALUATE_SELECTIVELY**. Cross-agent context optimization, compression, MCP/proxy/memory layer.  
  Why: Use when Claude Code, Codex, Aider, and custom agents share context/memory.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/chopratejas/headroom
- `mksglu/context-mode` — **Tier 1 / EVALUATE_SELECTIVELY**. Large-output sandbox and summary/search layer.  
  Why: Best for browser dumps, Playwright, API JSON, CSV, docs, test logs.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/mksglu/context-mode
- `oraios/serena` — **Tier 1 / DEFAULT_INSTALL**. Semantic code retrieval/editing via MCP, symbol-level navigation.  
  Why: Best architecture-level token optimizer for large repos; avoid blind full-file reads.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/oraios/serena
- `rtk-ai/rtk` — **Tier 1 / DEFAULT_INSTALL**. Command-output compression/proxy for shell-heavy Claude Code workflows.  
  Why: Highest simple ROI for git/tree/test/log/bash output noise.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/rtk-ai/rtk
- `yamadashy/repomix` — **Tier 1 / DEFAULT_INSTALL**. Repo packing / token counting / deliberate context capsules.  
  Why: Best controlled snapshotter for architecture review and handoff.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/yamadashy/repomix
- `zilliztech/claude-context` — **Tier 1 / EVALUATE_SELECTIVELY**. Semantic code search/RAG for Claude Code and agents.  
  Why: Good complement to Serena for large-codebase retrieval.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/zilliztech/claude-context
- `abhisekjha/pith` — **Tier 2 / EVALUATE_SELECTIVELY**. Output compression modes and auto-escalation as context fills.  
  Why: Useful when verbosity/output tokens are the constraint.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/abhisekjha/pith
- `AgusRdz/chop` — **Tier 2 / EVALUATE_SELECTIVELY**. CLI output compressor supporting common dev tools.  
  Why: Good lightweight alternative to RTK for command output.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/AgusRdz/chop
- `alexgreensh/token-optimizer` — **Tier 2 / EVALUATE_SELECTIVELY**. Ghost-token/context-decay/compaction diagnostic layer.  
  Why: Good forensic tool after baseline.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/alexgreensh/token-optimizer
- `buildoak/wet` — **Tier 2 / EVALUATE_SELECTIVELY**. Claude-driven meta-compression/proxy for stale tool result blocks.  
  Why: Advanced frontier pattern: agent profiles and rewrites its own context blocks.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/buildoak/wet
- `claudioemmanuel/squeez` — **Tier 2 / EVALUATE_SELECTIVELY**. Cross-agent bash/output token optimizer for Claude Code, Codex, Gemini, OpenCode.  
  Why: RTK competitor/companion; evaluate if multi-agent CLI compression needed.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/claudioemmanuel/squeez
- `fastmcp-me/mcp-ComputeGauge` — **Tier 2 / EVALUATE_SELECTIVELY**. MCP/tool cost/computation measurement.  
  Why: Useful for MCP-heavy stacks.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/fastmcp-me/mcp-ComputeGauge
- `ojuschugh1/sqz` — **Tier 2 / EVALUATE_SELECTIVELY**. Context compression/dedup with session stats.  
  Why: Good compression benchmark/reference.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/ojuschugh1/sqz
- `cytostack/openwolf` — **Tier 3 / EVALUATE_SELECTIVELY**. Memory/read-deduping and project anatomy layer.  
  Why: Promising for repeated-read reduction; pilot first.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/cytostack/openwolf
- `edouard-claude/snip` — **Tier 3 / EVALUATE_SELECTIVELY**. YAML-driven CLI output filter.  
  Why: Watchlist command filter.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/edouard-claude/snip
- `mpecan/tokf` — **Tier 3 / EVALUATE_SELECTIVELY**. Config-driven output filter.  
  Why: Watchlist command filter.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/mpecan/tokf
- `yvgude/lean-ctx` — **Tier 3 / EVALUATE_SELECTIVELY**. Hook + MCP context layer.  
  Why: Advanced context layer; validate claims locally.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/yvgude/lean-ctx

## Workflow, harness, and lifecycle

- `affaan-m/everything-claude-code` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. Massive pattern library; longform guide on token economics, memory, verification, parallelization.  
  Why: Use as reference/config source; install selectively.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/affaan-m/everything-claude-code
- `automazeio/ccpm` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. GitHub-native PRD/epic/task/worktree workflow.  
  Why: Best when GitHub Issues are source of truth.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/automazeio/ccpm
- `bmad-code-org/BMAD-METHOD` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. PRD → architecture → stories → implementation → QA lifecycle.  
  Why: Best structured product-to-code workflow.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/bmad-code-org/BMAD-METHOD
- `coleam00/context-engineering-intro` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. PRP/spec-driven implementation workflow.  
  Why: Best lightweight context-engineering template.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/coleam00/context-engineering-intro
- `eyaltoledano/claude-task-master` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. PRD decomposition and task graph.  
  Why: Strong local task state for long-running work.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/eyaltoledano/claude-task-master
- `opensesh/KARIMO` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. PRD-driven orchestration with research/planning/tasks/review/waves.  
  Why: Strong autonomous-harness pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/opensesh/KARIMO
- `shanraisshan/claude-code-best-practice` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. Course/reference for commands, agents, skills, hooks, workflows.  
  Why: High-quality reference for assembling primitives into workflows.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/shanraisshan/claude-code-best-practice
- `wshobson/agents` — **Tier 1 / REFERENCE_OR_SELECTIVE_INSTALL**. Large modular plugin/agent/skill/workflow catalog.  
  Why: Best selective plugin ecosystem; avoid bulk loading.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/wshobson/agents
- `agent-sh/agentsys` — **Tier 2 / EVALUATE_SELECTIVELY**. Multi-plugin, multi-agent, multi-skill system across Claude Code/Codex/OpenCode.  
  Why: Good cross-agent plugin architecture.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/agent-sh/agentsys
- `alexei-led/cc-thingz` — **Tier 2 / EVALUATE_SELECTIVELY**. Plugin suite with skills/agents/hooks/commands and export to Codex/Gemini/AGENTS.md.  
  Why: Strong portable workflow knowledge pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/alexei-led/cc-thingz
- `bdfinst/agentic-dev-team` — **Tier 2 / EVALUATE_SELECTIVELY**. Agentic dev team workflow.  
  Why: Good team-of-agents pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/bdfinst/agentic-dev-team
- `garrytan/gstack` — **Tier 2 / EVALUATE_SELECTIVELY**. Startup/agentic workflow patterns.  
  Why: Reference layer for product-to-code workflows.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/garrytan/gstack
- `github/spec-kit` — **Tier 2 / EVALUATE_SELECTIVELY**. Spec-driven development kit from GitHub.  
  Why: Canonical spec workflow input for agents.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/github/spec-kit
- `gotalab/cc-sdd` — **Tier 2 / EVALUATE_SELECTIVELY**. Spec-driven development for Claude Code.  
  Why: Useful for rigorous requirements-driven work.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/gotalab/cc-sdd
- `humanlayer/advanced-context-engineering-for-coding-agents` — **Tier 2 / EVALUATE_SELECTIVELY**. Advanced context-engineering patterns for coding agents.  
  Why: High-signal architecture reference.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/humanlayer/advanced-context-engineering-for-coding-agents
- `intellectronica/ruler` — **Tier 2 / EVALUATE_SELECTIVELY**. Rule/context management across coding agents.  
  Why: Helps keep guidance portable and scoped.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/intellectronica/ruler
- `maxritter/pilot-shell` — **Tier 2 / EVALUATE_SELECTIVELY**. Agentic shell/operator workflow.  
  Why: Good terminal-first orchestration pattern.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/maxritter/pilot-shell
- `obra/superpowers` — **Tier 2 / EVALUATE_SELECTIVELY**. Cross-agent skills framework.  
  Why: Portable skills for Claude Code/Codex/Gemini-style workflows.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/obra/superpowers
- `obra/superpowers-marketplace` — **Tier 2 / EVALUATE_SELECTIVELY**. Superpowers marketplace and Claude Code plugin/dev skills.  
  Why: Good skill marketplace/reference layer.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/obra/superpowers-marketplace
- `pablomarin/claude-codex-forge` — **Tier 2 / EVALUATE_SELECTIVELY**. Claude/Codex forge workflow.  
  Why: Bridge/harness pattern for Claude + Codex.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/pablomarin/claude-codex-forge
- `rawr-ai/codex-linear-method-toolkit` — **Tier 2 / EVALUATE_SELECTIVELY**. Linear-method ticket decomposition with worktree-per-agent pattern.  
  Why: Good ticket → worktree → PR architecture.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/rawr-ai/codex-linear-method-toolkit
- `SethGammon/Citadel` — **Tier 2 / EVALUATE_SELECTIVELY**. Parallel agents, isolated worktrees, campaign memory, routing, hooks, skills.  
  Why: Strong multi-agent harness concept.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/SethGammon/Citadel
- `shinpr/claude-code-workflows` — **Tier 2 / EVALUATE_SELECTIVELY**. Requirements/design/implementation/quality workflow recipes.  
  Why: Recipe-driven workflows for Claude Code.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/shinpr/claude-code-workflows
- `SuperClaude-Org/SuperClaude_Framework` — **Tier 2 / EVALUATE_SELECTIVELY**. Commands/personas/modes/MCP framework.  
  Why: Powerful but can be context-heavy; use selectively.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/SuperClaude-Org/SuperClaude_Framework
- `Wirasm/PRPs-agentic-eng` — **Tier 2 / EVALUATE_SELECTIVELY**. PRP agentic engineering patterns.  
  Why: Strong spec-to-code reference.  
  Risk: Audit install scripts, hooks, MCP servers, permissions, and network/file access before production use.  
  URL: https://github.com/Wirasm/PRPs-agentic-eng

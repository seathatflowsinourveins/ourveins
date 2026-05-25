

---

<!-- FILE: README.md -->

# Claude Code SOTA Frontier V8 — Elite Quality Markdown Kit

Purpose: give Claude Code CLI a strict, high-quality, convergence-oriented knowledge base for advanced automation.

This V8 pass prioritizes best-of-best repos and architecture patterns over raw repository count.

Repo entries: 176 curated unique repos/tools/surfaces.

Read order:
1. `CLAUDE.md`
2. `AGENTS.md`
3. `SOTA_REPOS_FINAL_LIST.md`
4. `FRONTIER_V8_ELITE_FINAL_REPORT.md`
5. `REPO_ARCHITECTURE_PATTERN_MATRIX.md`
6. `TOKEN_OPTIMIZATION_ARCHITECTURE.md`
7. `CODEX_PLUGIN_CC_WORKFLOW.md`
8. `PARALLEL_GIT_WORKTREE_PLAYBOOK.md`
9. `CLI_TERMINAL_CODE_QUALITY_GUIDE.md`
10. `SOURCE_AUDIT_NOTES.md`

# Elite quality rule
Treat this kit as a curated operating system, not a shopping list. Install the default core first. Use advanced repos only when the architecture need exists.

Quality gates for any repo before install:
1. Read README, install script, hooks, MCP config, package manifests, CI, license, and security policy.
2. Prefer repos with clear docs, visible source, tests/CI, recent commits, issue hygiene, and uninstall path.
3. Reject cracked/unlocked/leaked Claude Code repos or bypass-only tools.
4. For hooks/MCP/plugins/memory/operator dashboards, require local source review before execution.
5. Measure before and after with ccusage and /usage; keep a rollback branch.


---

<!-- FILE: CLAUDE.md -->

# Claude Code Operating Rules — SOTA Elite

Use this repository as a Claude Code automation harness.

## Core behavior
- Keep the main context small. Use skills, subagents, and files for deep procedures.
- Search symbols before reading whole files. Prefer Serena / semantic tools / rg / ast-grep.
- Prefer `git diff --stat`, `git diff --name-only`, and focused hunks before full diffs.
- Do not dump full logs. Tail, filter, summarize, or use RTK / Context Mode.
- Use git worktrees for parallel tasks. One task = one branch = one worktree.
- Use Codex via `/codex:review`, `/codex:adversarial-review`, and `/codex:rescue` as an independent witness.
- Run deterministic quality gates before declaring work complete.
- Do not install plugins, MCP servers, hooks, or memory layers without source-audit steps.

## Token economics
- The best token is the one never admitted to context.
- Move long workflows from `CLAUDE.md` into `.claude/skills/*/SKILL.md`.
- Use `context: fork` for noisy skills where only the final summary matters.
- Use `/clear` between unrelated tasks and `/compact` only with explicit preservation instructions.

## Completion standard
Before completion, report:
- files changed
- tests/quality commands run
- risks remaining
- whether Codex second-opinion was run
- next action


---

<!-- FILE: AGENTS.md -->

# AGENTS.md — Cross-Agent Contract

This file is for Claude Code, Codex, Gemini CLI, OpenCode, Aider, and any agent harness reading the repo.

## Architecture contract
- Follow task scope. Do not widen scope without explicit reason.
- Prefer minimal diffs and reversible changes.
- Use repo-local scripts and quality gates before ad hoc commands.
- Do not edit secrets, credentials, or production config unless explicitly requested.
- Keep durable lessons in ADRs, rules, skills, or task files, not chat history.

## Multi-agent contract
- One agent owns one branch/worktree.
- Do not edit files owned by another active agent.
- Communicate through report files, PR comments, task ledgers, or explicit handoff docs.
- Reviewer agents are read-only unless explicitly promoted.
- Merge serially through PRs or an orchestrator.

## Review contract
Use a two-model witness for high-risk work:
1. Claude implementer creates patch.
2. Claude reviewer checks requirements and tests.
3. Codex reviews with `/codex:review`.
4. Codex challenges with `/codex:adversarial-review` for risky changes.
5. Claude reconciles true positives only.
6. CI/static analysis decides.


---

<!-- FILE: SOTA_REPOS_FINAL_LIST.md -->

# Final SOTA Repo List — Frontier V8 Elite Quality

Curated unique entries: **176**

This is intentionally narrower than earlier frontier kits. The goal is not to include every trendy repo; it is to keep the ecosystem Claude Code can actually use for high-quality automation.

## Foundation Official

- `anthropics/claude-code`
- `openai/codex`
- `openai/codex-plugin-cc`
- `anthropics/skills`
- `agentskills/agentskills`
- `modelcontextprotocol/modelcontextprotocol`
- `modelcontextprotocol/servers`
- `modelcontextprotocol/inspector`
- `github/github-mcp-server`
- `anthropics/claude-plugins-official`
- `anthropics/claude-code-action`
- `anthropics/claude-code-base-action`
- `anthropics/claude-code-security-review`
- `anthropics/claude-agent-sdk-python`
- `anthropics/claude-agent-sdk-typescript`
- `github/codeql-action`
- `github/gh-aw`
- `github/spec-kit`

## Default Install Core

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

## Token Context Advanced

- `mksglu/context-mode`
- `chopratejas/headroom`
- `buildoak/wet`
- `fastmcp-me/mcp-ComputeGauge`
- `alexgreensh/token-optimizer`
- `matt1398/claude-devtools`
- `sirmalloc/ccstatusline`
- `spences10/claude-code-analytics`
- `jeongwookie/WhereMyTokens`
- `toolsu/ccost`
- `0xhimanshu/governor`
- `luongnv89/context-stats`
- `ojuschugh1/sqz`
- `claudioemmanuel/squeez`
- `yvgude/lean-ctx`
- `cytostack/openwolf`

## Code Intelligence Retrieval

- `zilliztech/claude-context`
- `aider-ai/aider`
- `mixedbread-ai/mgrep`
- `ast-grep/ast-grep`
- `tree-sitter/tree-sitter`
- `mufeedvh/code2prompt`
- `safishamsi/graphify`
- `sourcegraph/cody`
- `yoanbernabeu/grepai`
- `aidenybai/react-grab`
- `littlebearapps/contextdocs`
- `croakingtoad/context-engineering-mcp`
- `webdevtodayjason/context-forge`

## Workflow Harness Best

- `bmad-code-org/BMAD-METHOD`
- `eyaltoledano/claude-task-master`
- `automazeio/ccpm`
- `coleam00/context-engineering-intro`
- `Wirasm/PRPs-agentic-eng`
- `gotalab/cc-sdd`
- `LiorCohen/sdd`
- `mkhrdev/cc-spec-driven`
- `intellectronica/ruler`
- `wshobson/agents`
- `shanraisshan/claude-code-best-practice`
- `affaan-m/everything-claude-code`
- `opensesh/KARIMO`
- `agent-sh/agentsys`
- `SethGammon/Citadel`
- `bdfinst/agentic-dev-team`
- `ComposioHQ/agent-orchestrator`
- `nutthouse/tutti`
- `shanraisshan/agentic-engineering`
- `humanlayer/advanced-context-engineering-for-coding-agents`
- `humanlayer/humanlayer`
- `HKUDS/OpenHarness`
- `shareAI-lab/learn-claude-code`

## Parallel Operator Ui

- `smtg-ai/claude-squad`
- `yxwucq/CCUI`
- `jamesrochabrun/AgentHub`
- `basnijholt/agent-cli`
- `milisp/codexia`
- `kbwo/ccmanager`
- `asheshgoplani/agent-deck`
- `preset-io/agor`
- `BloopAI/vibe-kanban`
- `stravu/crystal`
- `manaflow-ai/cmux`
- `superset-sh/superset`
- `max-sixty/worktrunk`
- `johannesjo/parallel-code`
- `frankbria/parallel-cc`
- `fynnfluegge/agtx`
- `gabrielkoerich/orchestrator`
- `oxgeneral/ORCH`
- `axeldelafosse/loop`
- `patrickdappollonio/dux`
- `adamwulf/ittybitty`
- `nutthouse/tutti`

## Codex Multi Model Bridges

- `openai/codex-plugin-cc`
- `bfly123/claude_codex_bridge`
- `xiaolai/codex-toolkit-for-claude`
- `promptadvisers/claudex`
- `alexanderatallah/redline`
- `nikuscs/codex-cc-plugin`
- `sakibsadmanshajib/gemini-plugin-cc`
- `tasict/opencode-plugin-cc`
- `goldmar/openclaw-code-agent`
- `pablomarin/claude-codex-forge`

## Skills Plugins Marketplaces

- `anthropics/skills`
- `agentskills/agentskills`
- `wshobson/agents`
- `daymade/claude-code-skills`
- `alirezarezvani/claude-skills`
- `levnikolaevich/claude-code-skills`
- `mhattingpete/claude-skills-marketplace`
- `netresearch/claude-code-marketplace`
- `claude-market/marketplace`
- `sjnims/plugin-dev`
- `emdashcodes/claude-code-plugins`
- `davila7/claude-code-templates`
- `shakacode/claude-code-commands-skills-agents`
- `troykelly/claude-skills`
- `microsoft/skills`
- `antfu/skills`
- `TrailofBits/skills`
- `K-Dense-AI/scientific-agent-skills`
- `Orchestra-Research/AI-Research-SKILLs`
- `microsoft/skills`
- `ComposioHQ/awesome-claude-skills`
- `VoltAgent/awesome-agent-skills`

## Security Quality Gates

- `semgrep/semgrep`
- `github/codeql-action`
- `gitleaks/gitleaks`
- `trufflesecurity/trufflehog`
- `aquasecurity/trivy`
- `google/osv-scanner`
- `ossf/scorecard`
- `step-security/harden-runner`
- `InvariantLabs-ai/mcp-scan`
- `MCP-Defender/MCP-Defender`
- `snyk/agent-scan`
- `AikidoSec/aikido-claude-plugin`
- `sonatype/sonatype-guide-claude-plugin`
- `edimuj/vexscan-claude-code`
- `woodruffw/zizmor`
- `rhysd/actionlint`
- `koalaman/shellcheck`
- `hadolint/hadolint`
- `crate-ci/typos`
- `oxsecurity/megalinter`
- `bridgecrewio/checkov`
- `terraform-linters/tflint`
- `golangci/golangci-lint`
- `biomejs/biome`
- `oxc-project/oxc`
- `astral-sh/ruff`
- `evilmartians/lefthook`

## Cli Terminal Foundation

- `sharkdp/bat`
- `sharkdp/delta`
- `dandavison/delta`
- `eza-community/eza`
- `junegunn/fzf`
- `sxyazi/yazi`
- `sharkdp/hyperfine`
- `astral-sh/uv`
- `jdx/mise`
- `casey/just`
- `evilmartians/lefthook`
- `pre-commit/pre-commit`

## Awesome Discovery Reference

- `hesreallyhim/awesome-claude-code`
- `subinium/awesome-claude-code`
- `onmyway133/awesome-claude-code`
- `bradAGI/awesome-cli-coding-agents`
- `andyrewlee/awesome-agent-orchestrators`
- `RoggeOhta/awesome-codex-cli`
- `Picrew/awesome-agent-harness`
- `AutoJunjie/awesome-agent-harness`
- `walkinglabs/awesome-harness-engineering`
- `ai-boost/awesome-harness-engineering`
- `rohitg00/awesome-claude-code-toolkit`
- `quemsah/awesome-claude-plugins`
- `shanraisshan/claude-code-best-practice`
- `affaan-m/everything-claude-code`


---

<!-- FILE: FRONTIER_V8_ELITE_FINAL_REPORT.md -->

# Frontier V8 Elite Final Report

## Mission
Create a Claude Code CLI-readable operating guide for a high-quality, fully automated, token-optimized coding harness using only the best convergent repos and patterns.

## V8 decision
Previous passes maximized breadth. V8 optimizes for quality:
- official first
- proven primitives second
- broad marketplaces as discovery only
- hooks/MCP/operator dashboards behind source-audit gates
- worktree orchestration as the parallelism standard
- Codex as a second-model witness rather than primary permission boundary

## Final operating architecture

```text
Issue / PRD / task
  -> plan/spec/task graph
  -> context capsule: symbols + repo map + relevant docs
  -> isolated worktree worker
  -> filtered shell/tool output
  -> local quality gates
  -> Claude reviewer
  -> Codex review/adversarial review/rescue
  -> PR / CI / static analysis
  -> durable memory update: ADRs, skills, rules, AGENTS.md
```

## Best-of-best default install

```text
anthropics/claude-code
openai/codex
openai/codex-plugin-cc
ryoppippi/ccusage
rtk-ai/rtk
oraios/serena
yamadashy/repomix
BurntSushi/ripgrep
sharkdp/fd
jqlang/jq
mikefarah/yq
cli/cli
pre-commit/pre-commit
casey/just
jdx/mise
astral-sh/uv
```

## Best advanced stack by dimension

```text
Measurement: ccusage + claude-devtools + ccstatusline
Context: RTK + Context Mode + Headroom + Wet
Code intelligence: Serena + Repomix + Claude Context + Aider repo-map + ast-grep/tree-sitter
Workflow: BMAD + Task Master or CCPM + PRPs + Ruler + wshobson/agents
Parallel: native worktrees + /batch + Claude Squad / Agent Orchestrator / Tutti / CCUI
Second model: codex-plugin-cc + direct Codex CLI + optional bridge plugins
Quality: pre-commit + ruff/biome/oxc + semgrep + CodeQL + gitleaks + trivy
```

## Convergence findings

1. **Context admission beats prompt engineering.** RTK, Context Mode, Headroom, Wet, hooks, and CLI filtering all prevent low-value bytes from entering context.
2. **Semantic retrieval beats file dumping.** Serena, Claude Context, Aider, Repomix, ast-grep, tree-sitter, and mgrep converge on structural retrieval.
3. **Skills/rules beat giant CLAUDE.md.** Claude and Codex both converge on durable global guidance plus on-demand skills.
4. **Worktrees are the filesystem isolation primitive.** Native Claude worktrees, `/batch`, Composio AO, Tutti, Claude Squad, CCUI, AgentHub, agtx, and Vibe Kanban all converge here.
5. **Codex is the second-model witness.** Codex plugin review/adversarial review/rescue is strongest as challenge/review, not as the main permission boundary.
6. **Operator dashboards are becoming the control plane.** The editor becomes one instrument; dashboards manage branches, diffs, terminals, PRs, costs, and agent state.
7. **Quality gates beat vibes.** Static analysis, tests, pre-commit, CodeQL, Semgrep, Gitleaks, Trivy, actionlint, and typos form the objective gate layer.
8. **GitHub issues/PRs/ADRs are durable memory.** Chat is not the project database.

## High-quality repo interpretation

- `shanraisshan/claude-code-best-practice`: reference implementation for Claude Code skills, subagents, commands, and hooks.
- `affaan-m/everything-claude-code`: broad pattern library for agent harness performance, skills, memory, security, and research-first development.
- `openai/codex-plugin-cc`: official bridge for Codex review/adversarial review/rescue inside Claude Code.
- `wshobson/agents`: high-quality modular plugin ecosystem with progressive disclosure and plugin evaluation concepts.
- `ComposioHQ/agent-orchestrator` and `nutthouse/tutti`: strongest architecture signals for local multi-agent worktree operations.
- `rtk-ai/rtk`, `mksglu/context-mode`, `oraios/serena`, `yamadashy/repomix`: highest leverage token/context architecture stack.

## Install policy

```text
Install by default:
  ccusage, RTK, Serena, Repomix, CLI quality tools.

Install selectively:
  Context Mode, Headroom, workflow frameworks, plugin packs, operator dashboards.

Audit before install:
  hooks, MCP servers, bridge plugins, memory layers, dashboards, one-line installers.

Use as reference only:
  broad awesome lists, mega marketplaces, experimental harnesses.
```


---

<!-- FILE: REPO_ARCHITECTURE_PATTERN_MATRIX.md -->

# Repo Architecture Pattern Matrix

| Pattern | Primary repos | Use when | Risk |
|---|---|---|---|
| Native Claude automation | anthropics/claude-code | Always | Low |
| Cross-model review | openai/codex-plugin-cc | High-risk PRs, CI failures, design challenge | Medium; separate Codex permissions |
| Usage ledger | ccusage, claude-devtools, ccstatusline | Any serious automation | Low |
| Shell output compression | RTK, sqz, squeez | Bash/git/test/log output is noisy | Medium; hooks rewrite commands |
| Large-output sandboxing | Context Mode, Headroom, Wet | Browser/API/log/CSV/JSON dumps | Medium; MCP/hook boundaries |
| Semantic retrieval | Serena, Claude Context, Aider, ast-grep, tree-sitter | Large repos | Medium; index accuracy |
| Repo snapshots | Repomix, code2prompt | Architecture review, onboarding, PR capsule | Low/Medium; avoid dumping secrets |
| Task graph / PM | Task Master, CCPM, BMAD, PRPs, Ruler | Multi-day features | Medium; context/tool overhead |
| Operator UI | Claude Squad, AO, Tutti, CCUI, AgentHub, Vibe Kanban | 3+ agents/worktrees | High; shell + git + credentials |
| Skills marketplace | anthropics/skills, wshobson, daymade, alirezarezvani | Repeat workflows | Medium; review instructions/scripts |
| Security gates | Semgrep, CodeQL, Gitleaks, Trivy, MCP Scan | Always for production | Low |
| Awesome discovery | awesome-claude-code, awesome-cli-coding-agents | Research only | Low |


---

<!-- FILE: TOKEN_OPTIMIZATION_ARCHITECTURE.md -->

# Token Optimization Architecture

## Core principle
The best token is the one never admitted into context.

## Layers

1. **Measurement**: `/usage`, `/context`, ccusage, statusline, devtools.
2. **Admission control**: RTK for Bash/git/test/log output; Context Mode for giant external outputs; Headroom/Wet for advanced cross-agent context control.
3. **Semantic retrieval**: Serena, Claude Context, ast-grep, tree-sitter, mgrep, Aider repo-map patterns.
4. **Repo capsules**: Repomix only for deliberate snapshots with include/exclude rules.
5. **Instruction loading**: concise `CLAUDE.md`; deeper docs in Skills; use `context: fork` for noisy tasks.
6. **Parallel isolation**: subagents for context isolation; worktrees for filesystem isolation.
7. **Compaction discipline**: compact only after saving goal, decisions, touched files, tests, risks, and next actions.

## Recommended policy

```text
Search before read.
Outline before implementation.
Diff stat before full diff.
Tail/filter before full logs.
Skill before giant prompt.
Worktree before parallel edit.
Codex review before risky merge.
```

## Canonical command preferences

Bad defaults:
```bash
tree .
cat huge.log
git diff
npm test
docker compose logs
find . -type f
```

Better defaults:
```bash
fd -e ts -e tsx src
rg "PaymentClient|createInvoice|refund" src -n
git status --short
git diff --stat
git diff --name-only
git diff --check
npm test 2>&1 | tail -n 120
docker compose logs --tail=120 api
jq '.errors[] | {message, path, code}' result.json
```

Best when RTK is installed:
```bash
rtk git diff
rtk git show
rtk tree
rtk npm test
```


---

<!-- FILE: CODEX_PLUGIN_CC_WORKFLOW.md -->

# Codex Plugin CC Workflow

Use `openai/codex-plugin-cc` as a second-model witness inside Claude Code.

## Role split

```text
Claude Code: plan, edit, test, orchestrate, manage worktrees.
Codex: review, adversarial challenge, rescue investigation.
CI/static analysis: objective gate.
Human: judgment on architecture, risk, and merge.
```

## Commands

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for auth bugs, race conditions, rollback gaps, data loss, hidden coupling, and reliability risks --background
/codex:rescue --background investigate why CI is failing
/codex:status
/codex:result
/codex:cancel
```

## Reconciliation prompt

```text
Compare Claude reviewer findings, Codex review findings, Codex adversarial findings, and CI/test results.
For each finding: true positive / false positive / uncertain; affected file/symbol; minimal fix; blocks merge? Apply only blocking true positives. Do not broaden scope.
```

## Safety
- Do not treat Codex plugin as Claude's permission boundary.
- Keep Codex config and MCP servers minimal.
- Avoid unattended review-gate loops unless monitored.
- Run in a clean worktree when possible.


---

<!-- FILE: PARALLEL_GIT_WORKTREE_PLAYBOOK.md -->

# Parallel Git Worktree Playbook

## Rule
One task = one branch = one worktree = one agent owner.

## Native Claude Code
```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-auth-refresh
claude --worktree cc-124-payment-timeout
```

Add:
```gitignore
.claude/worktrees/
```

## Manual worktrees
```bash
git worktree add ../repo-auth -b cc/123-auth-refresh origin/main
git worktree add ../repo-payments -b cc/124-payment-timeout origin/main
git worktree list
```

## Merge discipline
```bash
git status --short
git diff --stat
git diff --name-only
git diff --check
just verify || scripts/verify.sh
gh pr create --fill
```

Then run:
```text
/codex:review --base main --background
/codex:adversarial-review --base main look for hidden coupling, rollback gaps, auth bugs, data loss, and race conditions --background
```

## Parallel roles
- Planner: decomposes, no edits.
- Implementer: owns patch.
- Verifier: runs tests and summarizes failures only.
- Reviewer: read-only.
- Codex bridge: second-model review/rescue.

## Avoid
- two agents editing same files
- shared working tree for parallel implementation
- unbounded review loops
- secret copying into every worktree


---

<!-- FILE: CLI_TERMINAL_CODE_QUALITY_GUIDE.md -->

# CLI / Terminal / Code Quality Guide

## Foundation CLI
```bash
brew install ripgrep fd jq yq gh git-delta eza fzf bat hyperfine just mise pre-commit
# language dependent
uv tool install ruff
npm i -g @biomejs/biome oxc
```

## Search and code intelligence
- `rg`: text search
- `fd`: file discovery
- `ast-grep`: structural search/rewrite
- `tree-sitter`: parser foundation
- `mgrep`: semantic/search augmentation
- Serena: live symbol retrieval
- Repomix: deliberate repo capsule

## JavaScript/TypeScript quality
```bash
npm run typecheck
npx biome check .
npx oxc --help
```

## Python quality
```bash
uv run ruff check .
uv run ruff format .
uv run pytest -q
```

## Shell/YAML/GitHub quality
```bash
shellcheck scripts/*.sh
actionlint .github/workflows/*.yml
yq '.name' .github/workflows/ci.yml
```

## Security gates
```bash
gitleaks detect --source .
trufflehog filesystem .
trivy fs .
semgrep scan --config auto
gh codeql database create codeql-db --language=javascript-typescript
```

## Speed benchmarking
```bash
hyperfine 'npm test' 'npm test -- --runInBand'
```

## Agent-safe command pattern
- deterministic
- bounded output
- no raw secrets
- no full logs unless explicitly needed
- small verification first, full suite later


---

<!-- FILE: MCP_SECURITY_AND_TOOLING.md -->

# MCP / Plugin / Hook Security

## Audit before install
Any repo that installs hooks, MCP servers, shell wrappers, memory stores, dashboards, bridge plugins, or background daemons needs source review.

Inspect:
```text
install scripts
package manifests
postinstall hooks
MCP server command lines
network calls
credential handling
file read/write paths
auto-update behavior
telemetry
uninstall path
```

## Deny by default
- `.env`, `.env.*`
- `secrets/**`
- private keys
- credential files
- production kube/cloud configs

## Good gates
- InvariantLabs-ai/mcp-scan
- MCP-Defender/MCP-Defender
- gitleaks/gitleaks
- trufflesecurity/trufflehog
- semgrep/semgrep
- github/codeql-action
- ossf/scorecard
- step-security/harden-runner

## Rule
A tool that saves 20% tokens but opens credentials, spawns arbitrary shells, or bypasses permission boundaries is not an optimizer. It is a liability.


---

<!-- FILE: INSTALLATION_ORDER_AND_DECISION_MATRIX.md -->

# Installation Order and Decision Matrix

## Phase 1 — baseline
```text
Claude Code
Codex CLI
codex-plugin-cc
ccusage
short CLAUDE.md
AGENTS.md
```

## Phase 2 — token/context
```text
RTK
Serena
Repomix
CLI tools: rg, fd, jq, yq, gh
```

## Phase 3 — quality gates
```text
pre-commit
just/mise/uv
ruff/biome/oxc as needed
semgrep/gitleaks/trivy/actionlint/shellcheck
```

## Phase 4 — workflow
Choose one or two, not all:
```text
BMAD for lifecycle
Task Master or CCPM for task graph
context-engineering-intro / PRPs for PRP workflows
wshobson/agents for focused plugins
```

## Phase 5 — parallel operator
Choose when you supervise 3+ agents:
```text
native /batch and claude --worktree first
Claude Squad / Agent Orchestrator / Tutti / CCUI / AgentHub / Vibe Kanban selectively
```

## Phase 6 — advanced context
Use only if proven by measurement:
```text
Context Mode
Headroom
Wet
Token Optimizer
```


---

<!-- FILE: SOURCE_AUDIT_NOTES.md -->

# Source Audit Notes

This kit is based on public docs, READMEs, repo file trees, and architecture surfaces. It is not a line-by-line security audit of every repo.

## Local audit workflow for Claude Code

1. Clone the candidate repo into an isolated worktree or sandbox.
2. Read README, LICENSE, SECURITY, CONTRIBUTING, install scripts, package manifests.
3. Search for network, shell, credential, filesystem, and telemetry behavior:
```bash
rg -n "curl|wget|fetch|axios|child_process|spawn|exec|eval|openai|anthropic|token|secret|telemetry|postinstall|MCP|mcp" .
```
4. Inspect hooks and MCP configs.
5. Run static scanners where applicable.
6. Install only in a throwaway repo first.
7. Measure token/cost impact before promoting to default.

## Audit levels
- Level 0: documentation only, no install.
- Level 1: read source tree and scripts.
- Level 2: run tests / inspect package lock.
- Level 3: sandbox install.
- Level 4: production allowlist.


---

<!-- FILE: ADVANCED_RESEARCH_METHODS.md -->

# Advanced Research Methods

## Dimensions used
- star/adoption signal
- official source proximity
- architecture leverage
- token/control-plane impact
- worktree/parallel maturity
- source transparency
- license clarity
- recent activity
- composability
- security posture

## Angles used
- Native Claude Code primitive alignment
- Codex compatibility and `AGENTS.md` compatibility
- Skills/progressive disclosure fit
- Hooks/MCP risk surface
- Terminal command quality
- Git/worktree safety
- CI/static-analysis integration
- Multi-agent operator UX
- Repeatable workflow packaging

## Scoring heuristic
```text
10 = official or infrastructure-grade foundation
9  = best-of-best default install
8  = strong selective install
7  = reference/pattern library
6  = discovery source
<6 = excluded from elite list unless uniquely useful
```


---

<!-- FILE: SOURCE_APPENDIX.md -->

# Source Appendix

Primary sources to re-check when refreshing:

- Claude Code commands: https://code.claude.com/docs/en/commands
- Claude Code costs: https://code.claude.com/docs/en/costs
- Claude Code worktrees: https://code.claude.com/docs/en/worktrees
- Claude Code skills: https://code.claude.com/docs/en/skills
- Claude Code hooks: https://code.claude.com/docs/en/hooks
- OpenAI Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- OpenAI Codex best practices: https://developers.openai.com/codex/learn/best-practices
- OpenAI codex-plugin-cc: https://github.com/openai/codex-plugin-cc
- shanraisshan/claude-code-best-practice: https://github.com/shanraisshan/claude-code-best-practice
- affaan-m/everything-claude-code: https://github.com/affaan-m/everything-claude-code
- everything-claude-code longform: https://github.com/affaan-m/everything-claude-code/blob/main/the-longform-guide.md
- RTK: https://github.com/rtk-ai/rtk
- Serena: https://github.com/oraios/serena
- Repomix: https://github.com/yamadashy/repomix
- ccusage: https://github.com/ryoppippi/ccusage
- Context Mode: https://github.com/mksglu/context-mode
- Headroom: https://github.com/chopratejas/headroom
- Composio Agent Orchestrator: https://github.com/ComposioHQ/agent-orchestrator
- Tutti: https://github.com/nutthouse/tutti
- Addy Osmani Code Agent Orchestra: https://addyosmani.com/blog/code-agent-orchestra/

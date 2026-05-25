# README.md

# V60 Ultimate Definitive Claude Code SOTA Kit

Date: 2026-05-06

This kit is for Claude Code CLI to read and execute. It is a convergence-filtered research kit, not a broad repo dump.

Core rule:

```text
high-star discovery
→ convergence filtering
→ source-surface audit
→ benchmark-before-adoption
→ keep only best-of-best architecture repos
→ execute with Claude Code using worktrees, Skills, hooks, deterministic gates, and Codex review
```

The default runtime remains small. Heavy tools, plugins, MCP servers, memory layers, bridge plugins, dashboards, and one-line installers are selective or audit-required.


## Read order

```text
CLAUDE.md
AGENTS.md
EXECUTE_V60_ELITE_PLAN.md
SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md
TOKEN_CONTEXT_ARCHITECTURE.md
MEMORY_MCP_AGENT_ORCHESTRATION.md
MODEL_ROUTING_AND_SUBAGENTS.md
OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md
EVAL_BENCHMARK_OBSERVABILITY.md
CODEX_PLUGIN_CC_WORKFLOW.md
PARALLEL_WORKTREE_AUTOMATION.md
CLI_TERMINAL_CODE_QUALITY_GUIDE.md
COMMUNITY_CONSENSUS_2026.md
SOURCE_AUDIT_NOTES.md
```

## Default runtime stack

- `anthropics/claude-code`
- `openai/codex`
- `openai/codex-plugin-cc`
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
- `semgrep/semgrep`
- `github/codeql-action`
- `gitleaks/gitleaks`
- `trufflesecurity/trufflehog`
- `aquasecurity/trivy`
- `google/osv-scanner`

## Selective additions

- `mksglu/context-mode`
- `chopratejas/headroom`
- `buildoak/wet`
- `zilliztech/claude-context`
- `upstash/context7`
- `microsoft/playwright-mcp`
- `mcpware/cross-code-organizer`
- `ComposioHQ/agent-orchestrator`
- `smtg-ai/claude-squad`
- `yxwucq/CCUI`
- `BloopAI/vibe-kanban`
- `raine/workmux`

## Audit-required examples

- `DeusData/codebase-memory-mcp`
- `GMaN1911/claude-cognitive`
- `bfly123/claude_codex_bridge`
- `chenxiaofie/memory-mcp`
- `chopratejas/headroom`
- `cisco-ai-defense/mcp-scanner`
- `doobidoo/mcp-memory-service`
- `itsjwill/claude-memory`
- `jarrodwatts/claude-hud`
- `lucasrosati/claude-code-memory-setup`
- `mcpware/cross-code-organizer`
- `microsoft/playwright-mcp`
- `mkreyman/mcp-memory-keeper`
- `mksglu/context-mode`
- `nikuscs/codex-cc-plugin`
- `promptadvisers/claudex`
- `sakibsadmanshajib/gemini-plugin-cc`
- `snyk/agent-scan`
- `supermemoryai/claude-supermemory`
- `supermemoryai/supermemory-mcp`
- `tasict/opencode-plugin-cc`
- `thedotmack/claude-mem`
- `upstash/context7`
- `xiaolai/codex-toolkit-for-claude`

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

## Copy into a project

```bash
unzip claude_code_sota_v60_ultimate_definitive_md_kit.zip
cp -r claude_code_sota_v60_ultimate_definitive_md_kit/* /path/to/your/repo/
cp -r claude_code_sota_v60_ultimate_definitive_md_kit/.claude /path/to/your/repo/
cd /path/to/your/repo
claude
```

---

# CLAUDE.md

# Claude Code operating rules

- Keep this file short. Put long procedures into `.claude/skills`.
- Use semantic code tools before reading whole files.
- Prefer `rg`, `fd`, `jq`, `yq`, `git diff --stat`, and focused tests.
- Use RTK-style filtering for noisy command output.
- Use Serena/semantic retrieval and Repomix-style context capsules before broad file dumping.
- Use one branch/worktree per nontrivial task.
- Use subagents for noisy exploration and return summaries only.
- Run deterministic quality gates before final response.
- Use Codex plugin as independent reviewer/adversarial reviewer/rescue worker, not as the permission boundary.
- Audit every plugin, MCP server, hook, memory layer, bridge, dashboard, and one-line installer before adoption.

---

# AGENTS.md

# AGENTS.md

## Purpose

This repository uses Claude Code as primary orchestrator and Codex as second-model reviewer/rescue worker.

## Done criteria

- The change is scoped to the task.
- Tests/lint/typecheck/security gates relevant to the change pass.
- `git diff --stat` and `git diff --check` are clean.
- Risky changes receive independent review via `/codex:review` or `/codex:adversarial-review`.
- No secrets, `.env`, private keys, credentials, or generated artifacts are exposed.
- Any tool/plugin/MCP/memory/dashboard installation was source-audited first.

## Tool policy

- Prefer CLI tools for simple operations.
- Use MCP only when it adds real structured context or capability.
- Keep `CLAUDE.md` concise; use Skills for long repeatable workflows.
- Use worktrees for parallel sessions.
- Use GitHub issues/PRs/ADRs as durable memory.

---

# SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md

# SOTA_REPOS_BEST_OF_BEST_FINAL_LIST

Total curated entries: **205**.

These are grouped by role. Default installs are intentionally small; selective/reference/audit-required categories are not bulk-installed.

## FOUNDATION_OFFICIAL

```text
anthropics/claude-code
openai/codex
openai/codex-plugin-cc
anthropics/skills
agentskills/agentskills
modelcontextprotocol/modelcontextprotocol
modelcontextprotocol/servers
modelcontextprotocol/inspector
github/github-mcp-server
microsoft/playwright-mcp
upstash/context7
anthropics/claude-code-action
anthropics/claude-code-base-action
anthropics/claude-code-security-review
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
openai/openai-agents-python
openai/openai-python
openai/openai-node
openai/skills
github/spec-kit
github/codeql-action
```

## DEFAULT_INSTALL_CORE

```text
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

## MEASUREMENT_VISIBILITY

```text
ryoppippi/ccusage
matt1398/claude-devtools
sirmalloc/ccstatusline
mcpware/cross-code-organizer
jarrodwatts/claude-hud
jeongwookie/WhereMyTokens
spences10/claude-code-analytics
phuryn/claude-usage
```

## TOKEN_CONTEXT_ELITE

```text
rtk-ai/rtk
mksglu/context-mode
chopratejas/headroom
buildoak/wet
jordan112/skinny-jeans
ArthurDEV44/distill
z19r/whetstone
alexgreensh/token-optimizer
juyterman1000/entroly
zilliztech/claude-context
aider-ai/aider
mixedbread-ai/mgrep
ast-grep/ast-grep
tree-sitter/tree-sitter
tirth8205/code-review-graph
safishamsi/graphify
mufeedvh/code2prompt
mcpware/cross-code-organizer
upstash/context7
microsoft/playwright-mcp
```

## CODEBASE_INTELLIGENCE

```text
oraios/serena
yamadashy/repomix
zilliztech/claude-context
aider-ai/aider
mixedbread-ai/mgrep
ast-grep/ast-grep
tree-sitter/tree-sitter
tirth8205/code-review-graph
safishamsi/graphify
mufeedvh/code2prompt
```

## MEMORY_MCP_AUDIT_REQUIRED

```text
thedotmack/claude-mem
mkreyman/mcp-memory-keeper
doobidoo/mcp-memory-service
supermemoryai/claude-supermemory
supermemoryai/supermemory-mcp
itsjwill/claude-memory
GMaN1911/claude-cognitive
lucasrosati/claude-code-memory-setup
chopratejas/headroom
chenxiaofie/memory-mcp
DeusData/codebase-memory-mcp
```

## HIGH_STAR_WORKFLOW_REFERENCE_SELECTIVE

```text
obra/superpowers
affaan-m/everything-claude-code
github/spec-kit
garrytan/gstack
gsd-build/get-shit-done
mattpocock/skills
bmad-code-org/BMAD-METHOD
Fission-AI/OpenSpec
Yeachan-Heo/oh-my-claudecode
addyosmani/agent-skills
EveryInc/compound-engineering-plugin
humanlayer/humanlayer
shanraisshan/claude-code-best-practice
shareAI-lab/learn-claude-code
Piebald-AI/claude-code-system-prompts
Piebald-AI/tweakcc
VILA-Lab/Dive-into-Claude-Code
```

## WORKFLOW_HARNESS_ELITE

```text
bmad-code-org/BMAD-METHOD
eyaltoledano/claude-task-master
automazeio/ccpm
coleam00/context-engineering-intro
Wirasm/PRPs-agentic-eng
github/spec-kit
gsd-build/get-shit-done
maxritter/pilot-shell
wshobson/agents
shanraisshan/claude-code-best-practice
affaan-m/everything-claude-code
opensesh/KARIMO
agent-sh/agentsys
SethGammon/Citadel
sipyourdrink-ltd/bernstein
nutthouse/tutti
humanlayer/advanced-context-engineering-for-coding-agents
humanlayer/humanlayer
rohitg00/pro-workflow
shareAI-lab/learn-claude-code
VILA-Lab/Dive-into-Claude-Code
```

## PARALLEL_OPERATOR_ELITE

```text
smtg-ai/claude-squad
ComposioHQ/agent-orchestrator
yxwucq/CCUI
jamesrochabrun/AgentHub
BloopAI/vibe-kanban
stravu/crystal
manaflow-ai/cmux
fynnfluegge/agtx
raine/workmux
superset-sh/superset
agent-next/cc-manager
farion1231/cc-switch
DanWahlin/ai-agent-board
nwiizo/ccswarm
preset-io/agor
vnovick/itervox
Sterll/claude-terminal
gastownhall/gastown
```

## CODEX_SECOND_MODEL_BRIDGES

```text
openai/codex-plugin-cc
bfly123/claude_codex_bridge
xiaolai/codex-toolkit-for-claude
promptadvisers/claudex
sakibsadmanshajib/gemini-plugin-cc
nikuscs/codex-cc-plugin
tasict/opencode-plugin-cc
```

## EVAL_PEER_AGENT_ARCHITECTURE

```text
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/OpenHands
OpenHands/software-agent-sdk
OpenHands/benchmarks
aaif-goose/goose
evo-hq/evo
NousResearch/hermes-agent
langchain-ai/langgraph
langchain-ai/deepagents
microsoft/agent-framework
microsoft/autogen
google/adk-python
google/adk-js
google/adk-web
pydantic/pydantic-ai
crewAIInc/crewAI
agno-agi/agno
huggingface/smolagents
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
```

## SECURITY_CODE_QUALITY_ELITE

```text
trailofbits/claude-code-config
trailofbits/claude-code-devcontainer
edimuj/vexscan-claude-code
edimuj/vexscan
cisco-ai-defense/mcp-scanner
cisco-ai-defense/skill-scanner
InvariantLabs-ai/mcp-scan
MCP-Defender/MCP-Defender
mintmcp/agent-security
snyk/agent-scan
slowmist/MCP-Security-Checklist
semgrep/semgrep
github/codeql-action
gitleaks/gitleaks
trufflesecurity/trufflehog
aquasecurity/trivy
google/osv-scanner
ossf/scorecard
step-security/harden-runner
pre-commit/pre-commit
casey/just
jdx/mise
astral-sh/uv
astral-sh/ruff
biomejs/biome
oxc-project/oxc
koalaman/shellcheck
rhysd/actionlint
hadolint/hadolint
crate-ci/typos
terraform-linters/tflint
golangci/golangci-lint
bridgecrewio/checkov
evilmartians/lefthook
woodruffw/zizmor
oxsecurity/megalinter
errata-ai/vale
DavidAnson/markdownlint
textlint/textlint
```

## DISCOVERY_ONLY

```text
hesreallyhim/awesome-claude-code
onmyway133/awesome-claude-code
subinium/awesome-claude-code
bradAGI/awesome-cli-coding-agents
sorrycc/awesome-code-agents
RoggeOhta/awesome-codex-cli
VoltAgent/awesome-agent-skills
ComposioHQ/awesome-claude-skills
andyrewlee/awesome-agent-orchestrators
Agent-Analytics/awesome-multi-agent-orchestrators
Picrew/awesome-agent-harness
quemsah/awesome-claude-plugins
jqueryscript/awesome-claude-code
efij/awesome-claude-code-security
ai-for-developers/awesome-ai-coding-tools
infiniV/ultra-instinct-claude-code
```

## TUTORIAL_CONSENSUS_REFERENCE

```text
shanraisshan/claude-code-best-practice
affaan-m/everything-claude-code
VILA-Lab/Dive-into-Claude-Code
Cranot/claude-code-guide
FlorianBruniaux/claude-code-ultimate-guide
zebbern/claude-code-guide
ykdojo/claude-code-tips
howborisusesclaudecode.com
karpathy.bearblog.dev/sequoia-ascent-2026
```

---

# EXECUTE_V60_ELITE_PLAN.md

# EXECUTE_V60_ELITE_PLAN

## Objective

Turn a repo into a token-optimized, worktree-parallel, Codex-reviewed Claude Code harness without bulk-installing untrusted packages.

## Phase 0 — baseline

```bash
git status --short
git remote set-head origin -a || true
npx ccusage@latest daily || true
npx ccusage@latest session || true
```

Capture baseline:

```text
tokens
wall time
test status
lint/typecheck status
CI status
open security findings
current MCP servers
current hooks
current Claude/Codex config
```

## Phase 1 — install only the default core

```bash
# examples; adjust package manager
brew install ripgrep fd jq yq gh just mise
python -m pip install uv
npx ccusage@latest --help
```

Install only after review:

```text
RTK
Serena
Repomix
```

Do not install memory tools, dashboards, bridge plugins, MCP servers, or hook packs until source-audited.

## Phase 2 — create repo instruction skeleton

Create:

```text
CLAUDE.md
AGENTS.md
.claude/skills/source-repo-audit/SKILL.md
.claude/skills/codex-second-opinion/SKILL.md
.claude/skills/token-optimized-implementation/SKILL.md
.claude/skills/parallel-worktree-harness/SKILL.md
```

## Phase 3 — token/context discipline

Use this order:

```text
1. search symbols
2. read focused files
3. inspect diff stats
4. run focused tests
5. only then read broader context
```

Bad defaults:

```bash
cat huge.log
tree .
git diff
docker compose logs
npm test
```

Better defaults:

```bash
rg "symbol|error|test name" src tests -n
git diff --stat
git diff --name-only
git diff --check
npm test -- --runInBand 2>&1 | tail -n 120
docker compose logs --tail=120 api
```

## Phase 4 — worktree parallelism

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
claude --worktree cc-124-fix
claude --worktree cc-125-review
```

Add:

```gitignore
.claude/worktrees/
```

## Phase 5 — Codex second-model witness

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for data loss, rollback gaps, race conditions, auth bugs, hidden coupling, and missing tests --background
/codex:status
/codex:result
```

## Phase 6 — deterministic gates

Use a repo-specific `just verify` or `scripts/verify.sh`.

Example:

```bash
just fmt
just lint
just typecheck
just test
git diff --check
```

Security/prose gates as applicable:

```bash
semgrep scan
gitleaks detect
trivy fs .
osv-scanner -r .
typos
vale docs || true
markdownlint "**/*.md" || true
```

## Phase 7 — selective heavy-tool benchmark

Before adopting a selective tool, compare against baseline:

```text
tokens used
wall time
tests passed
review findings
files touched
false positives
operator burden
security risk
uninstall complexity
```

Keep only if it beats baseline materially.

## Phase 8 — memory policy

Use durable artifacts first:

```text
Git commits
GitHub issues/PRs
ADRs
AGENTS.md
CLAUDE.md
Skills
Task Master/CCPM state
repo-map docs
```

Adopt memory MCPs only after source audit and benchmark.

## Phase 9 — continuous improvement

After each completed task:

```text
update ADR if architecture changed
update AGENTS.md if a durable rule emerged
update a Skill if a repeat workflow emerged
remove stale instructions
record tool benchmark result
```

---

# TOKEN_CONTEXT_ARCHITECTURE.md

# TOKEN_CONTEXT_ARCHITECTURE

## Layered design

```text
Measurement:
  ccusage
  claude-devtools
  statusline
  cross-code-organizer

Shell-output compression:
  RTK

Read-path optimization:
  Serena
  Claude Context
  Aider repo-map pattern
  AST-grep
  Tree-sitter
  mgrep

Repo capsule:
  Repomix
  code2prompt

Large-output sandbox:
  Context Mode
  Wet
  Distill
  Skinny Jeans

Cross-agent memory/compression:
  Headroom
```

## Key distinction

RTK compresses Bash output. It does not solve Claude Code built-in `Read`, `Grep`, and `Glob` exploration. That requires semantic retrieval, repo maps, and deliberate context capsules.

## Admission policy

```text
Before context:
  filter
  summarize
  slice
  index
  measure

After context:
  compact only with a handoff summary
  clear when switching tasks
  save durable facts to docs/issues/ADRs
```

---

# MEMORY_MCP_AGENT_ORCHESTRATION.md

# MEMORY_MCP_AGENT_ORCHESTRATION

## Default memory

Use durable project state first:

```text
Git commits
GitHub issues and PRs
ADRs
AGENTS.md
CLAUDE.md
.claude/skills
Task Master / CCPM state
repo-map docs
test logs stored as artifacts
```

## Audit-required memory candidates

```text
thedotmack/claude-mem
mkreyman/mcp-memory-keeper
doobidoo/mcp-memory-service
supermemoryai/claude-supermemory
supermemoryai/supermemory-mcp
itsjwill/claude-memory
GMaN1911/claude-cognitive
lucasrosati/claude-code-memory-setup
chopratejas/headroom
chenxiaofie/memory-mcp
DeusData/codebase-memory-mcp
```

## Memory adoption gate

Adopt only if:

```text
repeated context reconstruction is measurable
retention policy is explicit
delete/export are available
secret filtering works
prompt injection risk is tested
index location is known
background processes are cleaned up
uninstall path is clear
```

## Agent orchestration policy

Use native Claude Code first:

```text
worktrees
/batch
subagents
hooks
Skills
GitHub PRs
```

Then benchmark operator tools:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
```

Keep only those that improve worktree isolation, branch ownership, diff review, cleanup, kill controls, and session visibility.

---

# MODEL_ROUTING_AND_SUBAGENTS.md

# MODEL_ROUTING_AND_SUBAGENTS

Do not hard-code model names into repo config. Check availability first.

## Routing

```text
Claude Opus-class:
  complex architecture
  hard debugging
  security review
  deep research
  harness design
  multi-file reasoning

Claude Sonnet-class:
  normal implementation
  routine refactor
  test writing

Claude Haiku-class:
  cheap classification/summarization if supported

Codex / GPT-5.5-class:
  independent review
  adversarial review
  CI rescue
  alternative implementation hypothesis
  research-heavy second opinion when available

Codex mini-class:
  cheaper/faster lightweight review
  summarization
  subagent triage
```

## Subagent contracts

Every subagent must return:

```text
task summary
files inspected
files changed
commands run
tests run
findings
risks
next action
```

Subagents must not return raw logs unless explicitly requested.

---

# OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md

# OFFICIAL_SDKS_AND_PROVIDER_SURFACES

## Anthropic

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
```

Use for programmatic Claude Code/Claude agent workflows.

## OpenAI

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
```

Use Codex as second-model witness and OpenAI Agents SDK as a reference/selective framework for multi-agent systems.

## External agent-framework references

```text
langchain-ai/langgraph
langchain-ai/deepagents
microsoft/agent-framework
microsoft/autogen
google/adk-python
google/adk-js
google/adk-web
pydantic/pydantic-ai
crewAIInc/crewAI
agno-agi/agno
huggingface/smolagents
```

These are not default Claude Code installs. Use them as architecture references for state, workflows, graph execution, observability, and structured agents.

---

# EVAL_BENCHMARK_OBSERVABILITY.md

# EVAL_BENCHMARK_OBSERVABILITY

## Eval references

```text
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/OpenHands
OpenHands/software-agent-sdk
OpenHands/benchmarks
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
evo-hq/evo
```

## Benchmark-before-adoption gate

A selective tool must beat baseline on:

```text
tokens
wall time
correctness
test pass rate
review quality
false positives
safety risk
operator burden
uninstall complexity
```

## Local benchmark template

```text
Task: <repeatable real repo task>
Baseline: Claude Code default core only
Candidate: Claude Code + tool
Metrics:
  tokens in/out
  duration
  files touched
  tests passed
  reviewer findings
  security findings
Decision:
  keep / reject / revisit
```

---

# CODEX_PLUGIN_CC_WORKFLOW.md

# CODEX_PLUGIN_CC_WORKFLOW

## Role

Claude Code is the primary orchestrator and editor.
Codex is an independent reviewer, adversarial reviewer, and rescue worker.

## Install

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Standard review

```text
/codex:review --base main --background
/codex:status
/codex:result
```

## Adversarial review

```text
/codex:adversarial-review --base main look for:
- data loss
- auth bugs
- rollback gaps
- hidden coupling
- race conditions
- missing tests
- unsafe migrations
--background
```

## Rescue

```text
/codex:rescue --background investigate why CI is failing and propose the smallest safe fix
```

## Boundary

Codex plugin is not Claude Code's permission boundary. Configure Codex sandbox/permissions separately. Avoid unattended loops.

---

# PARALLEL_WORKTREE_AUTOMATION.md

# PARALLEL_WORKTREE_AUTOMATION

## Native first

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
claude --worktree cc-124-fix
claude --worktree cc-125-review
```

Add:

```gitignore
.claude/worktrees/
```

## Manual worktrees

```bash
git worktree add ../repo-feature -b cc/feature origin/main
cd ../repo-feature
claude
```

## Operator tools

Use only when they add supervision:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
```

## Parallelism rule

```text
Subagents isolate context.
Worktrees isolate files.
PRs isolate merge risk.
Codex isolates model bias.
CI isolates correctness.
```

---

# CLI_TERMINAL_CODE_QUALITY_GUIDE.md

# CLI_TERMINAL_CODE_QUALITY_GUIDE

## Core CLI

```text
ripgrep
fd
jq
yq
gh
just
mise
uv
pre-commit
```

## Code gates

```text
ruff
biome
oxc
shellcheck
actionlint
hadolint
typos
tflint
golangci-lint
checkov
semgrep
CodeQL
gitleaks
trufflehog
trivy
osv-scanner
```

## Prose/grammar gates

```text
vale
markdownlint
textlint
typos
```

## Default command policy

Prefer:

```bash
git status --short
git diff --stat
git diff --name-only
git diff --check
rg "symbol|error|test" src tests -n
fd -e ts -e py -e go src
jq '.errors[] | {message,path,code}' result.json
```

Avoid:

```bash
cat huge.log
tree .
git diff
docker logs
npm test
```

---

# COMMUNITY_CONSENSUS_2026.md

# COMMUNITY_CONSENSUS_2026

## Consensus patterns

```text
Use plan mode for non-trivial work.
Run multiple isolated worktrees.
Keep CLAUDE.md concise.
Use Skills for repeated workflows.
Use subagents for noisy exploration.
Use hooks for deterministic enforcement.
Use status/usage visibility.
Inspect diffs.
Write tests/evals.
Treat AI output as untrusted until verified.
```

## Agentic engineering

The engineering role shifts from typing code to designing specs, supervising plans, inspecting diffs, writing tests/evals, managing permissions, isolating worktrees, and preserving quality.

## Practical default

```text
Claude Code coordinates.
Codex challenges.
Worktrees isolate.
Semantic retrieval finds.
Hooks enforce.
CI decides.
Git remembers.
```

---

# SOURCE_AUDIT_NOTES.md

# SOURCE_AUDIT_NOTES

This kit is not a line-by-line security audit of every repo.

Before installing any executable surface, inspect:

```text
install scripts
postinstall hooks
shell commands
network calls
telemetry
MCP server definitions
tool descriptions
tool permissions
hook triggers
bridge plugin behavior
memory retention
secret handling
license
uninstall path
background processes
```

## High-risk categories

```text
MCP servers
Claude Code plugins
hooks
bridge plugins
memory tools
operator dashboards
one-line installers
system-prompt mutation tools
provider/proxy switchers
```

## Audit commands

```bash
git clone <repo>
cd <repo>
git log --oneline -n 20
fd
rg "curl|wget|eval|exec|spawn|child_process|subprocess|rm -rf|chmod|sudo|token|api_key|telemetry|postinstall" .
rg "mcp|hook|PreToolUse|PostToolUse|SessionStart|Stop|permissions|allow|deny" .
```

## Decision

```text
default install / selective / reference only / discovery only / reject
```

---

# HIGH_STAR_RESEARCH_METHODS.md

# HIGH_STAR_RESEARCH_METHODS

## Discovery channels

```text
GitHub topics:
  claude-code
  claude-code-skills
  token-optimization
  awesome-claude-code
  cli-coding-agents
  mcp-security
  agent-skills
  ai-agent-orchestration

Official docs:
  Claude Code docs
  Claude Agent SDK
  OpenAI Codex docs
  OpenAI Agents SDK
  Agent Skills specification

Community consensus:
  Boris/Cherny workflow tips
  Karpathy agentic engineering
  Claude Code best practice repos
  Everything Claude Code longform guide

External architecture:
  LangGraph
  OpenAI Evals
  Promptfoo
  Langfuse
  Braintrust
  SWE-bench
  OpenHands
```

## Scoring

A repo survives if it improves at least one:

```text
context control
semantic retrieval
read-path compression
worktree isolation
workflow state
independent review
quality/security gates
eval feedback
source auditability
```

Stars are discovery signal only.

---

# HIGH_STAR_TRIAGE_AND_CONVERGENCE.md

# HIGH_STAR_TRIAGE_AND_CONVERGENCE

## Keep by default

```text
Claude Code
Codex
codex-plugin-cc
ccusage
RTK
Serena
Repomix
rg/fd/jq/yq/gh
pre-commit/just/mise/uv
security and quality gates
```

## Selective

```text
Context Mode
Headroom
Wet
Claude Context
Context7
Playwright MCP
operator dashboards
agent frameworks
eval/observability stacks
```

## Reference only

```text
everything-claude-code
claude-code-best-practice
BMAD
Task Master
CCPM
context-engineering-intro
Spec Kit
Get Shit Done
Superpowers
OpenSpec
```

## Audit required

```text
MCP servers
plugins
hooks
bridge tools
memory tools
dashboards
system-prompt mutation tools
provider switchers
one-line installers
```

## Discovery only

Awesome lists are not runtimes. Use them to source candidates, not to install.

---

# WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md

# WHAT_MORE_WAS_NOT_COVERED_ENOUGH

The latest gaps closed in V60:

```text
1. Agent-framework references outside Claude Code:
   LangGraph, Deep Agents, Microsoft Agent Framework, Autogen, Google ADK, PydanticAI, CrewAI, Agno, smolagents.

2. Eval/benchmark observability:
   OpenAI Evals, promptfoo, DeepEval, Braintrust, Langfuse, RAGAS, SWE-bench, SWE-agent, OpenHands benchmarks.

3. Memory/MCP governance:
   memory tools are audit-required, not default.

4. Model routing:
   Opus-class deep subagents and Codex/GPT-class second-model witness.

5. Prose/grammar quality:
   vale, markdownlint, textlint, typos.

6. Official SDKs:
   Anthropic Agent SDK, Anthropic SDKs, OpenAI Agents SDK, OpenAI SDKs, OpenAI Skills.

7. Source-audit discipline:
   every executable extension needs local audit before install.
```

---

# REPOS_BY_CATEGORY.md

# SOTA_REPOS_BEST_OF_BEST_FINAL_LIST

Total curated entries: **205**.

These are grouped by role. Default installs are intentionally small; selective/reference/audit-required categories are not bulk-installed.

## FOUNDATION_OFFICIAL

```text
anthropics/claude-code
openai/codex
openai/codex-plugin-cc
anthropics/skills
agentskills/agentskills
modelcontextprotocol/modelcontextprotocol
modelcontextprotocol/servers
modelcontextprotocol/inspector
github/github-mcp-server
microsoft/playwright-mcp
upstash/context7
anthropics/claude-code-action
anthropics/claude-code-base-action
anthropics/claude-code-security-review
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
openai/openai-agents-python
openai/openai-python
openai/openai-node
openai/skills
github/spec-kit
github/codeql-action
```

## DEFAULT_INSTALL_CORE

```text
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

## MEASUREMENT_VISIBILITY

```text
ryoppippi/ccusage
matt1398/claude-devtools
sirmalloc/ccstatusline
mcpware/cross-code-organizer
jarrodwatts/claude-hud
jeongwookie/WhereMyTokens
spences10/claude-code-analytics
phuryn/claude-usage
```

## TOKEN_CONTEXT_ELITE

```text
rtk-ai/rtk
mksglu/context-mode
chopratejas/headroom
buildoak/wet
jordan112/skinny-jeans
ArthurDEV44/distill
z19r/whetstone
alexgreensh/token-optimizer
juyterman1000/entroly
zilliztech/claude-context
aider-ai/aider
mixedbread-ai/mgrep
ast-grep/ast-grep
tree-sitter/tree-sitter
tirth8205/code-review-graph
safishamsi/graphify
mufeedvh/code2prompt
mcpware/cross-code-organizer
upstash/context7
microsoft/playwright-mcp
```

## CODEBASE_INTELLIGENCE

```text
oraios/serena
yamadashy/repomix
zilliztech/claude-context
aider-ai/aider
mixedbread-ai/mgrep
ast-grep/ast-grep
tree-sitter/tree-sitter
tirth8205/code-review-graph
safishamsi/graphify
mufeedvh/code2prompt
```

## MEMORY_MCP_AUDIT_REQUIRED

```text
thedotmack/claude-mem
mkreyman/mcp-memory-keeper
doobidoo/mcp-memory-service
supermemoryai/claude-supermemory
supermemoryai/supermemory-mcp
itsjwill/claude-memory
GMaN1911/claude-cognitive
lucasrosati/claude-code-memory-setup
chopratejas/headroom
chenxiaofie/memory-mcp
DeusData/codebase-memory-mcp
```

## HIGH_STAR_WORKFLOW_REFERENCE_SELECTIVE

```text
obra/superpowers
affaan-m/everything-claude-code
github/spec-kit
garrytan/gstack
gsd-build/get-shit-done
mattpocock/skills
bmad-code-org/BMAD-METHOD
Fission-AI/OpenSpec
Yeachan-Heo/oh-my-claudecode
addyosmani/agent-skills
EveryInc/compound-engineering-plugin
humanlayer/humanlayer
shanraisshan/claude-code-best-practice
shareAI-lab/learn-claude-code
Piebald-AI/claude-code-system-prompts
Piebald-AI/tweakcc
VILA-Lab/Dive-into-Claude-Code
```

## WORKFLOW_HARNESS_ELITE

```text
bmad-code-org/BMAD-METHOD
eyaltoledano/claude-task-master
automazeio/ccpm
coleam00/context-engineering-intro
Wirasm/PRPs-agentic-eng
github/spec-kit
gsd-build/get-shit-done
maxritter/pilot-shell
wshobson/agents
shanraisshan/claude-code-best-practice
affaan-m/everything-claude-code
opensesh/KARIMO
agent-sh/agentsys
SethGammon/Citadel
sipyourdrink-ltd/bernstein
nutthouse/tutti
humanlayer/advanced-context-engineering-for-coding-agents
humanlayer/humanlayer
rohitg00/pro-workflow
shareAI-lab/learn-claude-code
VILA-Lab/Dive-into-Claude-Code
```

## PARALLEL_OPERATOR_ELITE

```text
smtg-ai/claude-squad
ComposioHQ/agent-orchestrator
yxwucq/CCUI
jamesrochabrun/AgentHub
BloopAI/vibe-kanban
stravu/crystal
manaflow-ai/cmux
fynnfluegge/agtx
raine/workmux
superset-sh/superset
agent-next/cc-manager
farion1231/cc-switch
DanWahlin/ai-agent-board
nwiizo/ccswarm
preset-io/agor
vnovick/itervox
Sterll/claude-terminal
gastownhall/gastown
```

## CODEX_SECOND_MODEL_BRIDGES

```text
openai/codex-plugin-cc
bfly123/claude_codex_bridge
xiaolai/codex-toolkit-for-claude
promptadvisers/claudex
sakibsadmanshajib/gemini-plugin-cc
nikuscs/codex-cc-plugin
tasict/opencode-plugin-cc
```

## EVAL_PEER_AGENT_ARCHITECTURE

```text
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/OpenHands
OpenHands/software-agent-sdk
OpenHands/benchmarks
aaif-goose/goose
evo-hq/evo
NousResearch/hermes-agent
langchain-ai/langgraph
langchain-ai/deepagents
microsoft/agent-framework
microsoft/autogen
google/adk-python
google/adk-js
google/adk-web
pydantic/pydantic-ai
crewAIInc/crewAI
agno-agi/agno
huggingface/smolagents
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
```

## SECURITY_CODE_QUALITY_ELITE

```text
trailofbits/claude-code-config
trailofbits/claude-code-devcontainer
edimuj/vexscan-claude-code
edimuj/vexscan
cisco-ai-defense/mcp-scanner
cisco-ai-defense/skill-scanner
InvariantLabs-ai/mcp-scan
MCP-Defender/MCP-Defender
mintmcp/agent-security
snyk/agent-scan
slowmist/MCP-Security-Checklist
semgrep/semgrep
github/codeql-action
gitleaks/gitleaks
trufflesecurity/trufflehog
aquasecurity/trivy
google/osv-scanner
ossf/scorecard
step-security/harden-runner
pre-commit/pre-commit
casey/just
jdx/mise
astral-sh/uv
astral-sh/ruff
biomejs/biome
oxc-project/oxc
koalaman/shellcheck
rhysd/actionlint
hadolint/hadolint
crate-ci/typos
terraform-linters/tflint
golangci/golangci-lint
bridgecrewio/checkov
evilmartians/lefthook
woodruffw/zizmor
oxsecurity/megalinter
errata-ai/vale
DavidAnson/markdownlint
textlint/textlint
```

## DISCOVERY_ONLY

```text
hesreallyhim/awesome-claude-code
onmyway133/awesome-claude-code
subinium/awesome-claude-code
bradAGI/awesome-cli-coding-agents
sorrycc/awesome-code-agents
RoggeOhta/awesome-codex-cli
VoltAgent/awesome-agent-skills
ComposioHQ/awesome-claude-skills
andyrewlee/awesome-agent-orchestrators
Agent-Analytics/awesome-multi-agent-orchestrators
Picrew/awesome-agent-harness
quemsah/awesome-claude-plugins
jqueryscript/awesome-claude-code
efij/awesome-claude-code-security
ai-for-developers/awesome-ai-coding-tools
infiniV/ultra-instinct-claude-code
```

## TUTORIAL_CONSENSUS_REFERENCE

```text
shanraisshan/claude-code-best-practice
affaan-m/everything-claude-code
VILA-Lab/Dive-into-Claude-Code
Cranot/claude-code-guide
FlorianBruniaux/claude-code-ultimate-guide
zebbern/claude-code-guide
ykdojo/claude-code-tips
howborisusesclaudecode.com
karpathy.bearblog.dev/sequoia-ascent-2026
```

---

# ELITE_CONVERGENCE_DESIGN.md

# V60 Ultimate Definitive Claude Code SOTA Kit

Date: 2026-05-06

This kit is for Claude Code CLI to read and execute. It is a convergence-filtered research kit, not a broad repo dump.

Core rule:

```text
high-star discovery
→ convergence filtering
→ source-surface audit
→ benchmark-before-adoption
→ keep only best-of-best architecture repos
→ execute with Claude Code using worktrees, Skills, hooks, deterministic gates, and Codex review
```

The default runtime remains small. Heavy tools, plugins, MCP servers, memory layers, bridge plugins, dashboards, and one-line installers are selective or audit-required.


## Read order

```text
CLAUDE.md
AGENTS.md
EXECUTE_V60_ELITE_PLAN.md
SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md
TOKEN_CONTEXT_ARCHITECTURE.md
MEMORY_MCP_AGENT_ORCHESTRATION.md
MODEL_ROUTING_AND_SUBAGENTS.md
OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md
EVAL_BENCHMARK_OBSERVABILITY.md
CODEX_PLUGIN_CC_WORKFLOW.md
PARALLEL_WORKTREE_AUTOMATION.md
CLI_TERMINAL_CODE_QUALITY_GUIDE.md
COMMUNITY_CONSENSUS_2026.md
SOURCE_AUDIT_NOTES.md
```

## Default runtime stack

- `anthropics/claude-code`
- `openai/codex`
- `openai/codex-plugin-cc`
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
- `semgrep/semgrep`
- `github/codeql-action`
- `gitleaks/gitleaks`
- `trufflesecurity/trufflehog`
- `aquasecurity/trivy`
- `google/osv-scanner`

## Selective additions

- `mksglu/context-mode`
- `chopratejas/headroom`
- `buildoak/wet`
- `zilliztech/claude-context`
- `upstash/context7`
- `microsoft/playwright-mcp`
- `mcpware/cross-code-organizer`
- `ComposioHQ/agent-orchestrator`
- `smtg-ai/claude-squad`
- `yxwucq/CCUI`
- `BloopAI/vibe-kanban`
- `raine/workmux`

## Audit-required examples

- `DeusData/codebase-memory-mcp`
- `GMaN1911/claude-cognitive`
- `bfly123/claude_codex_bridge`
- `chenxiaofie/memory-mcp`
- `chopratejas/headroom`
- `cisco-ai-defense/mcp-scanner`
- `doobidoo/mcp-memory-service`
- `itsjwill/claude-memory`
- `jarrodwatts/claude-hud`
- `lucasrosati/claude-code-memory-setup`
- `mcpware/cross-code-organizer`
- `microsoft/playwright-mcp`
- `mkreyman/mcp-memory-keeper`
- `mksglu/context-mode`
- `nikuscs/codex-cc-plugin`
- `promptadvisers/claudex`
- `sakibsadmanshajib/gemini-plugin-cc`
- `snyk/agent-scan`
- `supermemoryai/claude-supermemory`
- `supermemoryai/supermemory-mcp`
- `tasict/opencode-plugin-cc`
- `thedotmack/claude-mem`
- `upstash/context7`
- `xiaolai/codex-toolkit-for-claude`

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

## Copy into a project

```bash
unzip claude_code_sota_v60_ultimate_definitive_md_kit.zip
cp -r claude_code_sota_v60_ultimate_definitive_md_kit/* /path/to/your/repo/
cp -r claude_code_sota_v60_ultimate_definitive_md_kit/.claude /path/to/your/repo/
cd /path/to/your/repo
claude
```


# HIGH_STAR_TRIAGE_AND_CONVERGENCE

## Keep by default

```text
Claude Code
Codex
codex-plugin-cc
ccusage
RTK
Serena
Repomix
rg/fd/jq/yq/gh
pre-commit/just/mise/uv
security and quality gates
```

## Selective

```text
Context Mode
Headroom
Wet
Claude Context
Context7
Playwright MCP
operator dashboards
agent frameworks
eval/observability stacks
```

## Reference only

```text
everything-claude-code
claude-code-best-practice
BMAD
Task Master
CCPM
context-engineering-intro
Spec Kit
Get Shit Done
Superpowers
OpenSpec
```

## Audit required

```text
MCP servers
plugins
hooks
bridge tools
memory tools
dashboards
system-prompt mutation tools
provider switchers
one-line installers
```

## Discovery only

Awesome lists are not runtimes. Use them to source candidates, not to install.
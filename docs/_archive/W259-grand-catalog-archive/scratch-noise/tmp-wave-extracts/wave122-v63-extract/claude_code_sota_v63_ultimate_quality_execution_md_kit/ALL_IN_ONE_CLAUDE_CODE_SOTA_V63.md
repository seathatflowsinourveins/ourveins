<!-- FILE: README.md -->

# V63 Ultimate Quality Execution Claude Code SOTA Kit

Date: 2026-05-06

This kit is designed for Claude Code CLI to read and execute.

It is not a broad repo dump. It is a convergence-filtered architecture kit:

```text
high-star discovery
→ convergence filtering
→ source-surface audit
→ benchmark-before-adoption
→ keep only best-of-best architecture repos
→ execute with Claude Code plan
```

Unique curated repos/tools/surfaces: **217**.

## Read first

```text
CLAUDE.md
AGENTS.md
EXECUTE_V63_ELITE_PLAN.md
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

## Default stack

```text
Claude Code
Codex CLI
openai/codex-plugin-cc
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
pre-commit / just / mise / uv
Semgrep / CodeQL / Gitleaks / Trivy / OSV Scanner
```


# Core convergence

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


## Install into a repo

```bash
unzip claude_code_sota_v63_ultimate_quality_execution_md_kit.zip
cp -r claude_code_sota_v63_ultimate_quality_execution_md_kit/* /path/to/your/repo/
cp -r claude_code_sota_v63_ultimate_quality_execution_md_kit/.claude /path/to/your/repo/
cd /path/to/your/repo
claude
```



<!-- FILE: CLAUDE.md -->

# CLAUDE.md

Use this repo as a disciplined agentic-engineering workspace.

## Operating rules

- Keep context small.
- Use semantic retrieval before reading whole files.
- Use `rg`, `fd`, `jq`, `yq`, and `git diff --stat` before large outputs.
- Do not dump full logs; summarize and tail only relevant failure output.
- Use worktrees for parallel work.
- Use Skills for long repeatable workflows; do not bloat this file.
- For risky changes, run reviewer subagent plus Codex second-model review.
- For plugins, MCPs, memory tools, dashboards, bridges, or hooks: run source audit first.
- Before finish: run focused tests and relevant quality gates.



<!-- FILE: AGENTS.md -->

# AGENTS.md

This file is for Claude Code, Codex, and other coding agents.

## Done criteria

A task is done only when:

```text
implementation is minimal and scoped
focused tests pass
lint/typecheck pass where relevant
security/secret gates pass where relevant
diff is reviewed
Codex second opinion is reconciled for risky changes
documentation or ADR updated if behavior/architecture changed
```

## Cross-agent roles

```text
Claude Code:
  primary orchestrator, editing, git, local tests, worktrees

Codex:
  independent reviewer, adversarial review, rescue worker

Opus-class Claude:
  architecture, security, deep reasoning, long-horizon plan/review

Sonnet-class Claude:
  normal implementation and refactor

Mini/cheap model:
  summarization, triage, classification
```

## Forbidden defaults

```text
no blind global MCP installs
no one-line installer without audit
no huge CLAUDE.md
no full log dumps
no parallel sessions in same working tree
no merge without tests or diff review
```



<!-- FILE: EXECUTE_V63_ELITE_PLAN.md -->

# Execute V63 Elite Plan for Claude Code

This file is written as instructions for Claude Code CLI.

## Objective

Adopt only the best-of-best SOTA Claude Code ecosystem components, with measured token efficiency, correctness, safety, and workflow quality. Do not install broad packs blindly.

## Phase 0 — classify current repo

1. Read `CLAUDE.md`, `AGENTS.md`, package manifests, CI configs, and test commands.
2. Identify languages, package manager, test runner, lint/typecheck/security gates.
3. Produce `docs/agentic-harness/repo-baseline.md`:
   - language stack
   - build/test/lint/typecheck commands
   - CI workflow names
   - risky domains: auth, payments, data loss, infra, PII
   - current known flaky tests
   - branch strategy

## Phase 1 — baseline token/cost and context

Install / verify only the default core first:

```bash
# Use your preferred package manager; examples are intentionally conservative.
npx ccusage@latest daily || true
npx ccusage@latest session || true
rg --version
fd --version
jq --version
gh --version
```

Create a baseline report:

```text
docs/agentic-harness/baseline.md
```

Record:

```text
current Claude model
context usage
average session cost
tools loaded by MCP
largest context contributors
```

## Phase 2 — context admission stack

Default:

```text
RTK for Bash-output compression.
Serena for semantic retrieval/editing.
Repomix for deliberate repo capsules.
```

Rules:

```text
diff stat before full diff
search before read
symbols before file bodies
tail logs before full logs
focused tests before full suite
skills before giant CLAUDE.md
```

Do not install Context Mode, Headroom, Wet, Claude Context, or memory MCP until benchmarked.

## Phase 3 — project instruction architecture

Keep `CLAUDE.md` below 200 lines.

Use:

```text
CLAUDE.md = small always-loaded router
AGENTS.md = cross-agent contract for Claude/Codex/OpenAI/Gemini/OpenHands-style tools
.claude/skills = long repeatable procedures
.claude/agents = focused roles
docs/adr = durable decisions
docs/agentic-harness = logs and benchmark evidence
```

## Phase 4 — quality gates

Create or verify:

```bash
just test
just lint
just typecheck
just security
```

If absent, create a `justfile` that wraps existing commands.

Minimum gates:

```text
format
lint
typecheck
unit tests
focused integration tests
secret scan
dependency scan
action lint
markdown/prose lint if docs-heavy
```

## Phase 5 — Codex second-model witness

Install and configure only official bridge:

```text
openai/codex-plugin-cc
```

Use:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on data loss, auth bypass, rollback gaps, hidden coupling, concurrency, and migration risk --background
/codex:rescue --background investigate failing CI and propose the smallest safe fix
```

Never treat Codex plugin as permission boundary. Treat it as reviewer, adversary, or rescue worker.

## Phase 6 — worktree parallelism

Use one task per branch/worktree.

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
```

For large independent changes:

```text
/batch <task with acceptance criteria, split guidance, test requirements, and conflict constraints>
```

Merge only after:

```text
focused tests pass
diff reviewed
Codex review reconciled
CI passes
security gates pass
```

## Phase 7 — benchmark-before-adoption

For every selective/audit-required tool:

1. Run source audit.
2. Install in a disposable worktree.
3. Run the same benchmark task:
   - baseline Claude Code
   - Claude Code + tool
   - Claude Code + tool + Codex review
4. Compare:
   - token use
   - wall time
   - files touched
   - tests passed
   - defects found
   - false positives
   - security/privacy risk
   - cleanup/uninstall quality

Keep only if it wins clearly.

## Phase 8 — memory/MCP adoption

Default to durable artifacts first:

```text
git commits
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
skills
Task Master / CCPM state
repo maps
```

Only evaluate memory MCPs if repeated context reconstruction is expensive and measurable.

For any MCP:

```text
audit tool descriptions
audit prompts
audit env vars
audit filesystem/network access
audit install scripts
audit telemetry
audit secrets handling
audit uninstall path
scan with MCP/security scanners
```

## Phase 9 — operating loop

For every meaningful task:

```text
issue/spec
plan
context capsule
worktree
implement
focused tests
diff review
Codex review
adversarial review if risky
CI
PR
ADR/update skills if reusable
```

## Phase 10 — continuous pruning

Every week:

```text
remove unused MCP servers
prune stale skills
delete dead worktrees
summarize active context
archive decisions into ADRs
review ccusage
review failed benchmark candidates
```



<!-- FILE: SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md -->

# V63 SOTA repos best-of-best final list

Date: 2026-05-06

This list is intentionally not a raw dump. It is a convergence-filtered set. Default installs are small; selective/reference/audit-required repos are mined or benchmarked before adoption.

Unique curated repos/tools/surfaces: **217**

## Foundation Official

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
github/codeql-action
github/spec-kit
```

## Default Install Core

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

## Measurement Visibility

```text
ryoppippi/ccusage
matt1398/claude-devtools
sirmalloc/ccstatusline
mcpware/cross-code-organizer
jarrodwatts/claude-hud
jeongwookie/WhereMyTokens
spences10/claude-code-analytics
florianbruniaux/ccboard
```

## Token Context Elite

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

## Codebase Intelligence

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
sourcegraph/cody
campfirein/cipher
```

## Workflow Harness References

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
VILA-Lab/Dive-into-Claude-Code
ykdojo/claude-code-tips
```

## Workflow Harness Elite

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
mattgierhart/PRD-driven-context-engineering
```

## Parallel Operator Elite

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

## Codex Second Model Bridges

```text
openai/codex-plugin-cc
bfly123/claude_codex_bridge
xiaolai/codex-toolkit-for-claude
promptadvisers/claudex
sakibsadmanshajib/gemini-plugin-cc
nikuscs/codex-cc-plugin
tasict/opencode-plugin-cc
```

## Memory Audit Required

```text
thedotmack/claude-mem
mkreyman/mcp-memory-keeper
doobidoo/mcp-memory-service
supermemoryai/claude-supermemory
supermemoryai/supermemory-mcp
itsjwill/claude-memory
GMaN1911/claude-cognitive
lucasrosati/claude-code-memory-setup
runtimenoteslabs/memory-layer
yoloshii/ClawMem
mem0ai/mem0
getzep/graphiti
getzep/zep
letta-ai/letta
chenxiaofie/memory-mcp
DeusData/codebase-memory-mcp
chopratejas/headroom
```

## Mcp Security Governance

```text
snyk/agent-scan
cisco-ai-defense/mcp-scanner
cisco-ai-defense/skill-scanner
InvariantLabs-ai/mcp-scan
MCP-Defender/MCP-Defender
mintmcp/agent-security
slowmist/MCP-Security-Checklist
edimuj/vexscan-claude-code
edimuj/vexscan
affaan-m/agentshield
aws-samples/sample-mcp-security-scanner
efij/awesome-claude-code-security
```

## Evaluation Peer Architecture

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
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
Arize-ai/phoenix
```

## Agent Framework References

```text
langchain-ai/langgraph
langchain-ai/deepagents
microsoft/agent-framework
microsoft/autogen
microsoft/semantic-kernel
google/adk-python
google/adk-js
google/adk-web
pydantic/pydantic-ai
crewAIInc/crewAI
agno-agi/agno
huggingface/smolagents
```

## Security Code Quality Elite

```text
trailofbits/claude-code-config
trailofbits/claude-code-devcontainer
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

## Discovery Only

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
caramaschiHG/awesome-ai-agents-2026
hparreao/Awesome-AI-Evaluation-Guide
Zijian-Ni/awesome-ai-agents-2026
ARUNAGIRINATHAN-K/awesome-ai-agents
```

## System Prompt Reference Audit Only

```text
Piebald-AI/claude-code-system-prompts
Piebald-AI/tweakcc
repowise-dev/claude-code-prompts
```



<!-- FILE: TOKEN_CONTEXT_ARCHITECTURE.md -->

# Token and context architecture

## Core principle

Token optimization is architectural, not just prompt shortening.

## Layers

```text
Measurement:
  ccusage
  claude-devtools
  ccstatusline
  cross-code-organizer

Shell-output compression:
  RTK

Read-path compression:
  Serena
  Repomix
  Claude Context
  AST-grep
  Tree-sitter
  mgrep
  code-review-graph

Large-output sandboxing:
  Context Mode
  Headroom
  Wet
  Distill

Docs/browser:
  Context7
  Playwright MCP

Memory:
  audit-required only
```

## Admission rule

```text
Search before read.
Symbols before file bodies.
Diff stat before diff.
Tail logs before full logs.
Focused tests before full suite.
Skills before CLAUDE.md bloat.
Worktrees before parallel edits.
```



<!-- FILE: MEMORY_MCP_AGENT_ORCHESTRATION.md -->

# Memory, MCP, and agent orchestration policy

## Default memory

Use durable project memory before memory plugins:

```text
Git commits
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
.claude/skills
Task Master / CCPM state
repo-map docs
```

## Memory plugins

Memory plugins are audit-required and benchmark-required. They are not defaults.

Candidates:

```text
thedotmack/claude-mem
mkreyman/mcp-memory-keeper
doobidoo/mcp-memory-service
supermemoryai/claude-supermemory
supermemoryai/supermemory-mcp
itsjwill/claude-memory
GMaN1911/claude-cognitive
lucasrosati/claude-code-memory-setup
runtimenoteslabs/memory-layer
yoloshii/ClawMem
mem0ai/mem0
getzep/graphiti
getzep/zep
letta-ai/letta
chenxiaofie/memory-mcp
DeusData/codebase-memory-mcp
chopratejas/headroom
```

Risks:

```text
retention
deletion failure
privacy
secret capture
prompt injection
index poisoning
embedding leakage
unbounded process growth
cloud dependency
unclear telemetry
```

## MCP categories

```text
Semantic/code MCP:
  Serena
  Claude Context
  code-review-graph

Documentation/browser MCP:
  Context7
  Playwright MCP

Memory MCP:
  memory service
  memory keeper
  supermemory
  mem0 / zep / graphiti

Security MCP:
  mcp-scan
  MCP Defender
  Cisco MCP Scanner
  Snyk agent-scan

Large-output/context MCP:
  Context Mode
  Headroom
```

## MCP install gate

Never install an MCP globally without:

```text
source audit
tool description audit
env var audit
filesystem/network access review
secrets handling review
prompt injection test
uninstall test
benchmark vs CLI alternative
```

## Agent orchestration

Use native Claude Code first:

```text
subagents = context isolation
worktrees = file isolation
/batch = native parallel decomposition
```

External operators are selective:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
ccswarm
AgentHub
```

Keep only if they improve worktree isolation, branch ownership, diff review, cleanup, kill controls, and session visibility.



<!-- FILE: MODEL_ROUTING_AND_SUBAGENTS.md -->

# Model routing and subagents

Do not hard-code unavailable model names. Check availability first.

## Routing map

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
  cheap classification / summarization if supported

Codex / GPT-5.5-class:
  independent review
  adversarial review
  CI rescue
  alternative implementation hypothesis
  research-heavy second opinion when available

Codex mini-class:
  lightweight review
  summarization
  subagent triage
```

## Subagent roles

```text
planner:
  converts issue/spec into plan, acceptance criteria, test strategy

implementer:
  makes minimal scoped changes

reviewer:
  reviews diff, edge cases, compatibility, test adequacy

security-reviewer:
  focuses auth, data loss, injection, secrets, permissions, rollback

verifier:
  runs focused commands, summarizes output, avoids dumping logs

codex-bridge:
  runs codex-plugin-cc review/adversarial/rescue

token-budget-guardian:
  enforces context admission and output filtering

source-auditor:
  audits third-party plugin/MCP/hook/tool before installation

eval-benchmark-architect:
  compares baseline vs candidate tools with reproducible benchmark tasks
```

## Two-model witness

```text
Claude implements.
Claude reviewer checks.
Codex reviews.
Codex adversarial-review challenges.
Claude reconciles.
CI decides.
Human/policy gate merges.
```



<!-- FILE: OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md -->

# Official SDKs and provider surfaces

## Anthropic

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
```

Use the Claude Agent SDK when you need a custom programmatic harness with Claude Code-like tool use, command execution, file editing, and context management.

## OpenAI

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
```

Use Codex for local agentic coding, `codex-plugin-cc` for second-model review inside Claude Code, and OpenAI Agents SDK for custom multi-agent workflows.

## Design rule

Prefer official SDKs when building provider-level harnesses. Community repos are pattern sources or selective operators unless audited.



<!-- FILE: EVAL_BENCHMARK_OBSERVABILITY.md -->

# Eval, benchmark, and observability

## Reference/selective repos

```text
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
Arize-ai/phoenix
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/benchmarks
```

## Benchmark gate

A candidate tool must beat baseline on:

```text
token use
wall time
correctness
tests passed
defects found
false positives
review quality
security risk
rollback complexity
maintainability
```

## Benchmark protocol

```text
1. Create task fixture.
2. Run baseline Claude Code.
3. Run Claude Code + candidate.
4. Run Claude Code + candidate + Codex review.
5. Record commands, tokens, changed files, tests, failures.
6. Keep only if result is materially better.
```



<!-- FILE: CODEX_PLUGIN_CC_WORKFLOW.md -->

# Codex plugin workflow

Default bridge:

```text
openai/codex-plugin-cc
```

Commands:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on data loss, auth bypass, rollback gaps, concurrency, hidden coupling --background
/codex:rescue --background investigate failing CI and propose the smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

Policy:

```text
Codex is second-model witness.
Codex is adversarial reviewer.
Codex is rescue worker.
Codex is not Claude Code's permission boundary.
```

Reconciliation table:

```text
finding
source: Claude reviewer | Codex review | Codex adversarial | CI
true/false/uncertain
blocking/non-blocking
file/symbol
minimal fix
test evidence
```



<!-- FILE: PARALLEL_WORKTREE_AUTOMATION.md -->

# Parallel worktree automation

## Native first

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
```

## Manual worktree

```bash
git worktree add ../repo-cc-123 -b cc/123-feature origin/main
cd ../repo-cc-123
claude
```

## Batch

```text
/batch implement migration from A to B. Split by package. Avoid same-file conflicts. Add focused tests. Open PRs per branch.
```

## Merge gate

```text
git status --short
git diff --stat
git diff --check
focused tests
lint/typecheck
security scan
/codex:review
/codex:adversarial-review if risky
CI pass
```



<!-- FILE: CLI_TERMINAL_CODE_QUALITY_GUIDE.md -->

# CLI, code, security, and grammar quality gates

## Default CLI tools

```text
rg
fd
jq
yq
gh
just
mise
uv
pre-commit
```

## Code quality

```text
ruff
biome
oxc
shellcheck
actionlint
hadolint
typos
golangci-lint
tflint
checkov
zizmor
megalinter
```

## Security

```text
semgrep
CodeQL
gitleaks
trufflehog
trivy
osv-scanner
scorecard
harden-runner
mcp-scan
MCP Defender
agent-scan
Cisco MCP Scanner
skill-scanner
```

## Prose / grammar / docs

```text
vale
markdownlint
textlint
typos
```

## Command policy

Bad:

```bash
cat huge.log
npm test
git diff
tree .
find .
```

Better:

```bash
tail -n 120 huge.log
npm test -- --runInBand path/to/test 2>&1 | tail -n 160
git diff --stat
git diff --name-only
fd -e ts -e tsx src
rg "symbol|function|class" src -n
jq '.errors[] | {message,path,code}' result.json
```



<!-- FILE: COMMUNITY_CONSENSUS_2026.md -->

# Community consensus 2026

## Boris / Claude Code team style

Consensus pattern:

```text
run multiple sessions in parallel
use git worktrees
start hard work in plan mode
keep CLAUDE.md concise
turn repeat workflows into Skills and commands
use subagents for noisy exploration
keep statusline/usage visible
avoid overloading MCP servers
review diffs
```

## Karpathy-style agentic engineering

```text
write specs
supervise plans
inspect diffs
write tests/evals
manage permissions
isolate worktrees
preserve quality
```

## Practical rule

Do not “vibe merge.” Every agentic change needs:

```text
clear task
limited scope
diff review
tests
second-model review for risky changes
CI
rollback path
```



<!-- FILE: SOURCE_AUDIT_NOTES.md -->

# Source audit notes

This kit is a README/docs/source-surface convergence audit. It is not a line-by-line security audit.

Audit before installing:

```text
plugins
MCP servers
hooks
bridge tools
memory systems
dashboards
one-line installers
system prompt mutators
provider switchers
```

Audit checklist:

```text
license
install script
postinstall behavior
network access
filesystem access
secrets access
MCP tool descriptions
prompt injection surface
telemetry
data retention
uninstall path
dependency risk
CI status
maintainer activity
open security issues
```

Safe default:

```text
Prefer official docs/SDKs.
Prefer CLI tools over always-on MCP when equivalent.
Prefer project-local config over global install.
Prefer worktree sandbox before adoption.
Benchmark before production use.
```

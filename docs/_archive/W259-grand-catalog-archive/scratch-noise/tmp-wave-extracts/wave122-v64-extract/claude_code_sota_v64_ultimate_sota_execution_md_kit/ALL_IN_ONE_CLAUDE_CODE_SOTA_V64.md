# Claude Code SOTA V64: Ultimate Quality Execution Kit

This kit is built for Claude Code CLI to read and execute.

Hard rule:

```text
high-star discovery
→ convergence filtering
→ source-surface audit
→ benchmark-before-adoption
→ keep only best-of-best architecture repos
→ execute through Claude Code worktrees, Skills, hooks, and Codex review
```

This is not a bulk install list. It is a curated architecture map.

Curated unique repos/tools/surfaces: **226**.

Default runtime remains intentionally small:

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
quality/security/prose gates
```

Everything executable beyond that is selective or audit-required.


## Read order

```text
CLAUDE.md
AGENTS.md
EXECUTE_V64_ELITE_PLAN.md
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

## Operating principle

```text
Claude coordinates.
Worktrees isolate.
Serena retrieves.
Repomix snapshots.
RTK compresses.
Skills disclose progressively.
Hooks enforce.
Codex challenges.
CI decides.
Git remembers.
```


---

# CLAUDE.md — SOTA Claude Code Operating Contract

Keep this file short. Load deep playbooks only when needed.

## Core rules

- Use semantic code retrieval before reading many files.
- Prefer `rg`, `fd`, `jq`, `yq`, `git diff --stat`, `git diff --name-only`, focused tests, and small logs.
- Never dump full logs or whole repositories into context.
- Use worktrees for parallel sessions and large tasks.
- Use subagents for noisy exploration, research, verification, and review.
- Use Skills for repeat workflows instead of expanding this file.
- Run focused tests before broad tests.
- For risky changes, run Claude review plus Codex review/adversarial review.
- Treat plugins, MCP servers, hooks, memory tools, dashboards, and bridge tools as executable software requiring source audit.
- Prefer durable memory: GitHub issues, PRs, ADRs, AGENTS.md, CLAUDE.md, skills, repo maps, and task files.

## Default tool policy

Default core:

```text
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
pre-commit / just / mise / uv
```

Selective / audit-required:

```text
Context Mode
Headroom
Claude Context
Context7
Playwright MCP
memory plugins
MCP servers
operator dashboards
bridge plugins
system-prompt mutators
```

## Done means

- The implementation is minimal and scoped.
- Tests or verification commands were run.
- Diff was inspected.
- Security and quality gates passed or failures are documented.
- Codex was used for independent review on high-risk work.
- Durable state was updated if a reusable lesson emerged.


---

# AGENTS.md — Cross-Agent Contract

This file is for Claude Code, Codex, OpenAI Agents SDK workers, and other coding agents.

## Project rules

- Use the smallest context required.
- Prefer semantic retrieval and targeted reads.
- Use worktrees for parallel work.
- Do not run destructive commands without explicit approval.
- Do not read secrets, `.env`, credentials, tokens, private keys, or production data unless explicitly authorized.
- Keep patches minimal.
- Run quality gates before declaring completion.
- Use source-audit flow before installing executable plugins, MCP servers, hooks, bridge tools, dashboards, or memory tools.

## Build / test / lint

Claude Code should discover actual project commands, then write them here:

```bash
# install
# lint
# typecheck
# test
# security
# format
```

## Review protocol

Use Codex as independent second-model witness for:

- auth/security changes
- payments/billing
- migrations
- concurrency
- data loss risk
- public API changes
- failing CI rescue
- large refactors

Commands:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, rollback, data loss, hidden coupling, race conditions --background
/codex:rescue --background investigate CI failure
```


---

# EXECUTE_V64_ELITE_PLAN.md

## Goal

Turn a repo into a token-optimized, worktree-parallel, Codex-reviewed Claude Code automation harness.

## Phase 0 — baseline

```bash
git status --short
git remote -v
git branch --show-current
git rev-parse --show-toplevel
npx ccusage@latest daily || true
```

Capture:

```text
current branch
test commands
lint commands
typecheck commands
CI provider
security gates
repo size
languages
package managers
```

## Phase 1 — install default core only

```bash
# CLI foundation
# choose package manager for your OS
# install: rg, fd, jq, yq, gh, pre-commit, just, mise, uv

# Claude usage
npx ccusage@latest daily
npx ccusage@latest session
```

Adopt only:

```text
RTK
Serena
Repomix
ccusage
```

Do not install memory plugins, dashboards, MCP servers, or bridge plugins yet.

## Phase 2 — create project harness files

```text
CLAUDE.md
AGENTS.md
.claude/skills/
.claude/agents/
docs/architecture/
docs/decisions/
scripts/verify.sh
```

`CLAUDE.md` stays short. Put long workflows in Skills.

## Phase 3 — semantic context before edits

Use this order:

```text
repo map
symbol search
references
targeted file reads
targeted tests
full diff
```

Avoid:

```text
cat huge.log
tree .
git diff with no scope
reading entire repository
```

## Phase 4 — worktree execution

```bash
git fetch --all --prune
git remote set-head origin -a
echo ".claude/worktrees/" >> .gitignore

claude --worktree feature-x
```

Manual fallback:

```bash
git worktree add ../repo-feature-x -b cc/feature-x origin/main
cd ../repo-feature-x
claude
```

## Phase 5 — Codex second-model review

Inside Claude Code:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, data loss, rollback, concurrency, hidden coupling, test gaps --background
/codex:result
```

## Phase 6 — quality gates

Run only relevant gates first:

```bash
git diff --check
just lint
just typecheck
just test
pre-commit run --all-files
```

Security gates:

```bash
semgrep scan
gitleaks detect
trivy fs .
osv-scanner -r .
```

Prose/docs:

```bash
typos
vale .
markdownlint-cli2 "**/*.md"
textlint "**/*.md"
```

## Phase 7 — benchmark before adopting heavy tools

A candidate tool must improve one or more:

```text
tokens
wall time
correctness
tests passed
review quality
security
rollback complexity
operator visibility
```

If not measured, do not adopt.

## Phase 8 — memory/MCP gate

Before memory/MCP install:

```text
source audit
license check
network/file permissions review
secret/PII retention review
uninstall path
process cleanup test
benchmark vs durable memory
```

Default memory remains:

```text
Git
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
Skills
Task Master / CCPM
repo-map docs
```


---

# SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md

Curated unique repos/tools/surfaces: **226**.

The default stack is intentionally small. Most items below are selective, reference-only, discovery-only, or audit-required.

## OFFICIAL_FOUNDATION

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
anthropics/claude-code-action
anthropics/claude-code-base-action
anthropics/claude-code-security-review
anthropics/claude-plugins-official
anthropics/knowledge-work-plugins
modelcontextprotocol/modelcontextprotocol
modelcontextprotocol/servers
modelcontextprotocol/inspector
github/github-mcp-server
github/codeql-action
github/spec-kit
openai/codex
openai/codex-plugin-cc
openai/openai-agents-python
openai/openai-python
openai/openai-node
openai/skills
openai/evals
agentskills/agentskills
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
unclecode/crawl4ai
microsoft/markitdown
docling-project/docling
firecrawl/firecrawl
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

## HIGH_STAR_PATTERN_SOURCES_REFERENCE_ONLY

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

## CODEX_BRIDGES_AUDIT_REQUIRED_EXCEPT_OFFICIAL

```text
openai/codex-plugin-cc
bfly123/claude_codex_bridge
xiaolai/codex-toolkit-for-claude
promptadvisers/claudex
sakibsadmanshajib/gemini-plugin-cc
nikuscs/codex-cc-plugin
tasict/opencode-plugin-cc
```

## AGENT_FRAMEWORK_REFERENCES_SELECTIVE

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
OpenHands/OpenHands
OpenHands/software-agent-sdk
aaif-goose/goose
google-gemini/gemini-cli
QwenLM/qwen-code
sst/opencode
Kilo-Org/kilocode
Gitlawb/openclaude
```

## EVAL_BENCHMARK_OBSERVABILITY

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
hparreao/Awesome-AI-Evaluation-Guide
```

## SECURITY_MCP_GOVERNANCE

```text
trailofbits/claude-code-config
trailofbits/claude-code-devcontainer
edimuj/vexscan-claude-code
edimuj/vexscan
snyk/agent-scan
cisco-ai-defense/mcp-scanner
cisco-ai-defense/skill-scanner
InvariantLabs-ai/mcp-scan
MCP-Defender/MCP-Defender
mintmcp/agent-security
slowmist/MCP-Security-Checklist
aws-samples/sample-mcp-security-scanner
semgrep/semgrep
github/codeql-action
gitleaks/gitleaks
trufflesecurity/trufflehog
aquasecurity/trivy
google/osv-scanner
ossf/scorecard
step-security/harden-runner
woodruffw/zizmor
oxsecurity/megalinter
bridgecrewio/checkov
```

## CODE_CLI_PROSE_QUALITY

```text
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
evilmartians/lefthook
sharkdp/hyperfine
sharkdp/bat
sharkdp/delta
eza-community/eza
junegunn/fzf
sxyazi/yazi
errata-ai/vale
DavidAnson/markdownlint-cli2
textlint/textlint
streetsidesoftware/cspell
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
ARUNAGIRINATHAN-K/awesome-ai-agents
caramaschiHG/awesome-ai-agents-2026
```


## Cut / demote rules

```text
Cut or demote:
  low-signal one-off skills
  large marketplaces as runtime dependencies
  prompt packs that do not enforce behavior
  memory tools without clear retention/deletion model
  dashboards without worktree/diff/cleanup discipline
  non-official Claude ↔ Codex bridges unless audited
  token tools without clear interception point
  domain-specific skills that do not improve general harness
  system-prompt mutation tools unless explicitly needed and audited
  leaked/unofficial Claude Code repos
```


---

# HIGH_STAR_RESEARCH_METHODS.md

## Research channels

```text
GitHub topics sorted by stars
official docs and changelogs
awesome lists
community consensus posts
source-tree surface inspection
README architecture claims
security/adoption risk
benchmark/eval availability
```

## Keep criteria

```text
context control
semantic retrieval
read-path compression
worktree isolation
workflow state
independent review
quality/security gates
benchmark/eval feedback
source auditability
official provider support
```

## Demote criteria

```text
star count without architecture leverage
prompt-only packs
marketplace bulk-install incentives
memory without retention/deletion policy
dashboards without worktree/diff cleanup
MCPs without security review
bridges without source audit
system-prompt mutation unless explicitly needed
```


---

# HIGH_STAR_TRIAGE_AND_CONVERGENCE.md

High-star repos are discovery input, not adoption permission.

## Keep

Keep repos that materially improve:

```text
context admission
semantic retrieval
read-path compression
worktree isolation
workflow state
review independence
quality/security gates
benchmark/eval feedback
source auditability
official provider integration
```

## Default install

```text
ccusage
RTK
Serena
Repomix
rg/fd/jq/yq/gh
pre-commit/just/mise/uv
Codex plugin
quality/security/prose gates
```

## Selective

```text
Context Mode
Headroom
Claude Context
Context7
Playwright MCP
operator dashboards
agent frameworks
eval frameworks
memory systems
```

## Audit-required

```text
plugins
MCP servers
hooks
memory
bridges
dashboards
system prompt mutators
one-line installers
```


---

# WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md

V64 closes these gaps:

```text
memory repos and retention risk
MCP governance and scanners
agent orchestration outside Claude Code
official SDK/provider surfaces
GPT-5.5 / Codex second-model routing
Opus-class deep subagents
eval/benchmark observability
code quality and prose/grammar gates
docs/web ingestion
source audit execution
```

Remaining truth:

```text
No static list can safely authorize installing all repos.
Every plugin/MCP/hook/dashboard/memory tool must be source-audited locally.
The best SOTA pattern is architectural convergence, not maximum repo count.
```


---

# TOKEN_CONTEXT_ARCHITECTURE.md

## Token optimization is architecture, not shorter prompts

Best stack:

```text
measurement:
  ccusage
  statusline
  devtools
  cross-code-organizer

shell-output compression:
  RTK

semantic retrieval:
  Serena
  Claude Context

repo capsule:
  Repomix

large-output sandbox:
  Context Mode

cross-agent compression/memory:
  Headroom

read-path/context profiling:
  Wet
  Distill
  Skinny Jeans
  Whetstone

docs/browser:
  Context7
  Playwright MCP
```

## Default stack

```text
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
```

## Important distinction

RTK optimizes shell output. It does not optimize Claude Code built-in reads/searches.

Therefore pair:

```text
RTK       -> Bash output
Serena    -> symbol-level code navigation
Repomix   -> controlled repo snapshots
Skills    -> progressive disclosure
Subagents -> noisy exploration isolation
Worktrees -> file isolation
```

## Context admission policy

Before context enters the model, ask:

```text
Is this needed now?
Can it be summarized deterministically?
Can a symbol/reference answer it?
Can a focused command answer it?
Can a subagent inspect it and return only findings?
Can it live in a Skill or supporting file?
```

## Anti-patterns

```text
giant CLAUDE.md
always-on MCP buffet
memory plugins before durable memory
whole repo dumps every turn
cat huge logs
multi-agent swarm reading same files
```


---

# MEMORY_MCP_AGENT_ORCHESTRATION.md

## Default memory

Use durable project memory first:

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

## Memory adoption gate

Adopt only if it beats durable memory on:

```text
context reconstruction time
token cost
retrieval relevance
privacy/retention controls
deletion controls
secret exclusion
process cleanup
prompt-injection resistance
```

## MCP categories

```text
semantic:
  Serena
  Claude Context

docs:
  Context7

browser:
  Playwright MCP

memory:
  claude-mem / memory keepers / supermemory

security:
  mcp-scan
  MCP Defender
  Snyk agent-scan
  Cisco MCP Scanner
  Skill Scanner

large-output:
  Context Mode
```

## MCP security rule

Never connect a new MCP server globally before:

```text
source audit
tool list review
network/file access review
secret handling review
prompt injection review
process cleanup review
license review
uninstall test
```

## Orchestration policy

Start native:

```text
claude --worktree
/batch
subagents
Claude reviewer
Codex reviewer
CI gate
```

Add dashboards only if they provide:

```text
worktree isolation
branch ownership
diff review
session visibility
kill/cleanup controls
cost visibility
clear data boundary
```


---

# MODEL_ROUTING_AND_SUBAGENTS.md

Do not hard-code model names without checking availability.

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
  classification
  summarization
  cheap triage if supported

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

## Subagent split

```text
planner:
  requirements, decomposition, risks

researcher:
  docs, prior art, external references

implementer:
  scoped patch

verifier:
  tests, lint, typecheck, repro

security-reviewer:
  threat model, secret leakage, auth, injection, rollback

codex-bridge:
  second-model review/adversarial review/rescue
```

## Two-model witness

```text
Claude writes.
Claude reviewer checks.
Codex reviews.
Codex adversarially challenges.
Claude reconciles.
CI decides.
Git records.
```


---

# OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md

## Anthropic

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
anthropics/claude-code-action
anthropics/claude-code-security-review
```

Use Claude Agent SDK for custom automation when Claude Code CLI is not enough. Keep CLI-first for normal local engineering.

## OpenAI

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
openai/evals
```

Use Codex plugin for second-model review/rescue inside Claude Code.

Use OpenAI Agents SDK and evals as reference/selective layers for custom multi-agent harnesses and benchmark gates.

## MCP / GitHub

```text
modelcontextprotocol/modelcontextprotocol
modelcontextprotocol/servers
modelcontextprotocol/inspector
github/github-mcp-server
```

MCPs are selective. Prefer CLI tools when the CLI is enough.


---

# EVAL_BENCHMARK_OBSERVABILITY.md

## Reference/selective eval stack

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

## Tool adoption rule

No heavy tool survives unless it beats baseline on:

```text
tokens
correctness
wall time
test pass rate
review quality
safety
rollback complexity
operator visibility
```

## Minimal local benchmark

```text
Baseline:
  Claude Code + default stack

Candidate:
  Claude Code + candidate tool

Compare:
  token cost
  commands run
  files read
  files changed
  test result
  review findings
  time to mergeable PR
```


---

# CODEX_PLUGIN_CC_WORKFLOW.md

Use `openai/codex-plugin-cc` as a second-model witness inside Claude Code.

## Install

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Core commands

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, data loss, rollback, race conditions, hidden coupling --background
/codex:rescue --background investigate CI failure
/codex:status
/codex:result
/codex:cancel
```

## Policy

Codex is:

```text
independent reviewer
adversarial challenger
CI rescue worker
alternative hypothesis generator
```

Codex is not:

```text
Claude Code permission boundary
secret access boundary
blind auto-merge authority
```

## Review reconciliation

For every finding:

```text
true positive / false positive / uncertain
blocking / non-blocking
minimal fix
test needed
risk if ignored
```


---

# PARALLEL_WORKTREE_AUTOMATION.md

## Native first

```bash
claude --worktree feature-name
```

Claude `/batch` for large independent changes:

```text
/batch migrate X to Y. Split into independent worktree branches. Avoid same-file conflicts. Run focused tests. Open PRs.
```

## Manual fallback

```bash
git fetch --all --prune
git remote set-head origin -a
git worktree add ../repo-feature -b cc/feature origin/main
cd ../repo-feature
claude
```

## Cleanup

```bash
git worktree list
git worktree remove ../repo-feature
git branch -d cc/feature
```

## Operator candidates

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
AgentHub
cmux
Crystal
agtx
```

Adopt only if they improve:

```text
worktree isolation
branch ownership
diff review
session visibility
kill/cleanup controls
cost visibility
local/remote data clarity
```


---

# CLI_TERMINAL_CODE_QUALITY_GUIDE.md

## Default CLI foundation

```text
rg
fd
jq
yq
gh
pre-commit
just
mise
uv
```

## Efficient command style

Bad:

```bash
cat huge.log
tree .
git diff
npm test
docker logs app
```

Better:

```bash
tail -n 120 huge.log
fd -e ts -e tsx src
git diff --stat
git diff --name-only
git diff --check
npm test -- --runInBand path/to/test
docker logs --tail=120 app
jq '.errors[] | {message,path,code}' result.json
```

## Code quality gates

```text
Python:
  ruff
  pyright/mypy if present
  uv

JS/TS:
  biome
  oxc
  tsc
  eslint if present

Shell:
  shellcheck

GitHub Actions:
  actionlint

Docker:
  hadolint

Terraform:
  tflint
  checkov

Go:
  golangci-lint

Secrets / security:
  gitleaks
  trufflehog
  trivy
  osv-scanner
  semgrep
  CodeQL
```

## Prose/grammar gates

```text
typos
vale
markdownlint-cli2
textlint
cspell
```

## Required final check

```bash
git status --short
git diff --stat
git diff --check
just lint || true
just test || true
pre-commit run --all-files || true
```


---

# COMMUNITY_CONSENSUS_2026.md

## Boris / Claude Code team style

Convergent practices:

```text
parallel worktrees
plan mode for hard tasks
concise CLAUDE.md
Skills and commands for repeated work
subagents for noisy exploration
statusline / usage visibility
permissions and hooks
MCP discipline
```

## Karpathy-style agentic engineering

Serious agentic engineering means:

```text
write specs
supervise plans
inspect diffs
write tests/evals
manage permissions
isolate worktrees
preserve quality
avoid blind auto-merge
```

## Translation into this kit

```text
CLAUDE.md = short always-loaded contract
AGENTS.md = cross-agent instructions
Skills = reusable workflows
Subagents = context isolation
Worktrees = file isolation
Codex = second-model witness
CI/evals = objective gate
Git/GitHub/ADRs = durable memory
```


---

# SOURCE_AUDIT_NOTES.md

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit of every repository.

Before installing executable surfaces, run source audit.

## Audit targets

```text
plugins
MCP servers
hooks
bridge tools
dashboards
memory tools
one-line installers
system-prompt mutators
provider switchers
binary downloads
```

## Audit checklist

```bash
git clone --depth 1 <repo>
cd <repo>
fd .
rg -n "postinstall|curl|wget|eval|exec|spawn|child_process|subprocess|os.system|shell=True|token|secret|OPENAI|ANTHROPIC|MCP|telemetry|analytics|upload|http"
rg -n "hooks|mcp|server|stdio|sse|websocket|filesystem|readFile|writeFile|rm -rf"
```

Inspect:

```text
README
package.json / pyproject.toml / Cargo.toml
install scripts
bin entries
postinstall
network calls
filesystem permissions
MCP tool definitions
hook behavior
telemetry
license
uninstall path
```

Run:

```bash
gitleaks detect
trivy fs .
osv-scanner -r .
semgrep scan
```

Approve only when:

```text
install path is clear
permissions are bounded
secrets are excluded
telemetry is known/off
uninstall works
benchmark proves value
```

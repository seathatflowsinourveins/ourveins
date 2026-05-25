# Claude Code SOTA V58 — Definitive Elite Consensus Kit

This kit is for Claude Code CLI to read and execute. It intentionally separates default runtime, selective tools, reference-only repos, audit-required tools, and discovery-only lists.

Core rule:

```text
high-star discovery → convergence filtering → source audit → benchmark-before-adoption → only best-of-best runtime
```


## Read order

1. `CLAUDE.md`
2. `AGENTS.md`
3. `EXECUTE_V58_ELITE_PLAN.md`
4. `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md`
5. `TOKEN_CONTEXT_ARCHITECTURE.md`
6. `MEMORY_MCP_AGENT_ORCHESTRATION.md`
7. `MODEL_ROUTING_AND_SUBAGENTS.md`
8. `OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md`
9. `CODEX_PLUGIN_CC_WORKFLOW.md`
10. `PARALLEL_WORKTREE_AUTOMATION.md`
11. `CLI_TERMINAL_CODE_QUALITY_GUIDE.md`
12. `EVAL_BENCHMARK_OBSERVABILITY.md`
13. `SOURCE_AUDIT_NOTES.md`

## Default runtime stack

```text
CORE: Claude Code + Codex CLI + openai/codex-plugin-cc
MEASUREMENT: ccusage + claude-devtools + ccstatusline + cross-code-organizer
TOKEN/CONTEXT: RTK + Serena + Repomix
CLI: rg + fd + jq + yq + gh + pre-commit + just + mise + uv
QUALITY: semgrep + CodeQL + gitleaks + trufflehog + trivy + osv-scanner + ruff + biome + oxc + shellcheck + actionlint + typos + vale + markdownlint + textlint
```

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


---

# SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md

Total curated repos/tools/surfaces: **203**. Default runtime is intentionally much smaller.

## Foundation

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
jarrodwatts/claude-hud
mcpware/cross-code-organizer
jeongwookie/WhereMyTokens
spences10/claude-code-analytics
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
ooples/token-optimizer-mcp
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
```

## High Star Workflow Reference

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
VILA-Lab/Dive-into-Claude-Code
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

## Memory Mcp Audit Required

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
```

## Eval Peer Architecture

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
```

## Agent Framework Reference

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
langchain-ai/langchain
```

## Eval Observability

```text
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
OpenHands/benchmarks
swe-bench/SWE-bench
```

## Security Quality Elite

```text
trailofbits/claude-code-config
trailofbits/claude-code-devcontainer
edimuj/vexscan-claude-code
snyk/agent-scan
cisco-ai-defense/mcp-scanner
cisco-ai-defense/skill-scanner
InvariantLabs-ai/mcp-scan
MCP-Defender/MCP-Defender
mintmcp/agent-security
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
eslint/eslint
prettier/prettier
microsoft/pyright
python/mypy
pytest-dev/pytest
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
```



---

# EXECUTE_V58_ELITE_PLAN.md

This is the concrete Claude Code CLI adoption plan.

## Phase 0 — baseline without new tools

```bash
git status --short
git diff --stat
scripts/verify.sh || true
npx ccusage@latest session || true
```

Record:

```text
tokens used
wall time
tests passed
files read
commands run
PR/diff quality
review findings
```

## Phase 1 — install the minimal default core

Install only:

```text
ccusage
RTK
Serena
Repomix
rg / fd / jq / yq / gh
pre-commit / just / mise / uv
```

Do not install memory tools, broad MCP packs, dashboards, or bridge plugins yet.

## Phase 2 — set repo instruction structure

Create:

```text
CLAUDE.md       small always-loaded rule file
AGENTS.md       cross-agent contract
.claude/skills  repeatable workflows
.claude/agents  focused subagents
docs/adr         durable architecture decisions
docs/repo-map    module map and invariants
```

## Phase 3 — define quality gates

Create `justfile` or `scripts/verify.sh` with:

```bash
just lint
just typecheck
just test
just security
just verify
```

Recommended gates:

```text
ruff / biome / oxc / eslint / prettier / pyright / mypy
shellcheck / actionlint / hadolint / typos
semgrep / CodeQL / gitleaks / trivy / osv-scanner
vale / markdownlint / textlint for docs
```

## Phase 4 — configure parallel worktree harness

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-001-feature
claude --worktree cc-002-tests
```

Rules:

```text
one task = one branch = one worktree
no same-file collisions unless intentionally competing
merge serially
review diff before PR
```

## Phase 5 — add Codex review

Inside Claude Code:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on auth, data loss, rollback, race conditions, hidden coupling --background
/codex:status
/codex:result
```

Codex is a witness, not the permission boundary.

## Phase 6 — selective tool benchmark gate

Before installing Context Mode, Headroom, Claude Context, memory MCPs, dashboards, or orchestrators:

```text
run baseline task
run candidate-tool task
compare tokens, wall time, correctness, tests, diff quality, security risk
keep only if measurable benefit > operational risk
```

## Phase 7 — memory/MCP gate

Use durable memory first:

```text
GitHub issue/PR
ADR
repo-map docs
AGENTS.md
CLAUDE.md
skills
Task Master / CCPM
```

Only evaluate memory MCPs after repeated context-reconstruction cost is measured.

## Phase 8 — final shipping gate

```text
git diff --stat
git diff --check
just verify
/codex:review --base main --background
/codex:adversarial-review --base main --background
human or policy merge gate
```


---

# HIGH_STAR_RESEARCH_METHODS.md

## Method

1. Scan GitHub topics: `claude-code`, `claude-code-skills`, `token-optimization`, `awesome-cli-coding-agents`, `agent-orchestrators`, `mcp`, `ai-evaluation`.
2. Separate stars from architecture value.
3. Keep only repos that improve one of:
   - context control
   - semantic retrieval
   - read-path compression
   - worktree isolation
   - workflow state
   - review independence
   - quality/security gates
   - eval feedback
   - source auditability
4. Demote broad catalogs, prompt packs, memory tools without retention policy, and dashboards without worktree/diff controls.
5. Audit all executable surfaces before installing.

## High-star is not enough

High-star repos are candidates. Adoption requires architecture leverage and measured benefit.

## Consensus sources used

- Official Claude Code docs: commands, cost, skills, hooks, worktrees, Agent SDK.
- Official OpenAI Codex docs: Codex models, Codex plugin, AGENTS.md, skills, Agents SDK.
- GitHub topics and high-star community repos.
- 2026 agentic-engineering commentary: worktrees, plans, diffs, tests/evals, permissions, quality.


---

# HIGH_STAR_TRIAGE_AND_CONVERGENCE.md

## Keep by default

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
quality/security gates
```

## Selective

```text
Context Mode
Headroom
Wet
Claude Context
Context7
Playwright MCP
Claude Squad / CCUI / Vibe Kanban / agent-orchestrator / Workmux
memory MCPs
agent frameworks such as LangGraph / Microsoft Agent Framework / Google ADK / Pydantic AI
LLM eval tools such as promptfoo / DeepEval / Braintrust / Langfuse / OpenAI Evals
```

## Reference-only

```text
Everything Claude Code
Claude Code Best Practice
BMAD
Task Master
CCPM
Spec Kit
OpenHands / SWE-agent / mini-SWE-agent / Goose
awesome lists
system prompt trackers
```

## Audit-required

```text
plugins
hooks
MCP servers
memory tools
dashboards
bridge plugins
one-line installers
provider/proxy switchers
system prompt mutation tools
```

## Cut/demote

```text
one-off skills without architecture leverage
large marketplaces as runtime dependencies
prompt packs without enforcement
memory tools without retention/deletion/security model
operator dashboards without worktree/diff/cleanup discipline
non-official Claude↔Codex bridges unless audited
leaked/unofficial Claude Code internals
```


---

# TOKEN_CONTEXT_ARCHITECTURE.md

## Layers

```text
measurement: ccusage, devtools, statusline, cross-code-organizer
shell-output compression: RTK
large-output sandbox: Context Mode
semantic retrieval: Serena, Claude Context
repo capsules: Repomix
read-path profiling/compression: Wet, Distill, Skinny Jeans, code-review-graph
cross-agent memory/compression: Headroom
```

## Rule

Do not dump files or logs. Use:

```text
symbols before files
summaries before raw logs
diff stat before full diff
focused tests before full suites
skills before giant prompts
worktrees before parallel edits
```

## Default

```text
RTK + Serena + Repomix
```

## Selective

```text
Context Mode if logs/API/browser/MCP outputs dominate
Headroom if cross-agent memory/compression is required
Claude Context if semantic search/RAG is better than Serena for the repo
Wet/Distill/Skinny Jeans if read-path profiling is a measured bottleneck
```


---

# MEMORY_MCP_AGENT_ORCHESTRATION.md

## Durable memory first

Use these before memory plugins:

```text
Git commits
GitHub issues / PRs
ADRs
AGENTS.md
CLAUDE.md
.claude/skills
Task Master / CCPM state
repo-map docs
architecture docs
test fixtures
```

## Memory tools are audit-required

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
```

Audit:

```text
retention
indexing
secrets handling
deletion
telemetry
embedding provider
prompt injection exposure
process cleanup
uninstall path
```

## MCP categories

```text
semantic code: Serena, Claude Context
browser/docs: Playwright MCP, Context7
large-output sandbox: Context Mode
memory: memory MCPs, Headroom
security: MCP Defender, mcp-scan, Cisco MCP Scanner, Snyk agent-scan
```

## Agent orchestration

Native first:

```text
/batch
claude --worktree
subagents
hooks
skills
```

Then evaluate:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
Vibe Kanban
Workmux
itervox
LangGraph / Microsoft Agent Framework / Google ADK / OpenAI Agents SDK / Pydantic AI / CrewAI / Agno / smolagents
```


---

# MODEL_ROUTING_AND_SUBAGENTS.md

Do not hard-code model names. Check availability first.

## Routing

```text
Claude Opus 4.7-class:
  complex architecture
  hard debugging
  security review
  deep research
  harness design
  multi-file reasoning

Sonnet-class:
  implementation
  refactor
  tests
  routine review

Haiku-class:
  cheap classification
  summarization
  log triage

Codex / GPT-5.5-class:
  independent review
  adversarial review
  CI rescue
  alternative implementation hypothesis
  research-heavy second opinion

Codex mini-class:
  lightweight review
  summarization
  subagent triage
```

## Two-model witness

```text
Claude writes
Claude reviewer subagent reviews
Codex normal review checks
Codex adversarial review challenges
Claude reconciles only true positives
CI decides
```


---

# OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md

## Anthropic / Claude

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
```

Use Claude Agent SDK for custom harnesses requiring Claude Code-like tools, agent loop, and context management.

## OpenAI / Codex

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
```

Use Codex plugin for review/adversarial review/rescue inside Claude Code.
Use OpenAI Agents SDK only for custom multi-agent workflows that need programmable orchestration outside Claude Code.

## Other provider references

```text
google-gemini/gemini-cli
QwenLM/qwen-code
sst/opencode
Kilo-Org/kilocode
Gitlawb/openclaude
google/adk-python
google/adk-js
google/adk-web
microsoft/agent-framework
langchain-ai/langgraph
pydantic/pydantic-ai
```

These are reference/selective, not default Claude Code runtime.


---

# CODEX_PLUGIN_CC_WORKFLOW.md

Use `openai/codex-plugin-cc` as the default Claude ↔ Codex bridge.

## Install

```text
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex
/reload-plugins
/codex:setup
```

## Commands

```text
/codex:review --base main --background
/codex:adversarial-review --base main look for data loss, auth bugs, race conditions, rollback gaps, hidden coupling --background
/codex:rescue --background investigate CI failure and propose smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

## Policy

- Codex is a second-model witness.
- Codex is not Claude Code's permission boundary.
- Keep review gate monitored; avoid unattended loops.
- Keep Codex MCP config minimal during plugin-launched reviews.


---

# PARALLEL_WORKTREE_AUTOMATION.md

## Native first

```bash
git fetch --all --prune
git remote set-head origin -a
claude --worktree cc-123-feature
claude --worktree cc-124-tests
```

Add:

```gitignore
.claude/worktrees/
```

## Manual worktree

```bash
git worktree add ../repo-cc-123 -b cc/123-feature origin/main
cd ../repo-cc-123
claude
```

## Rule

```text
one task = one branch = one worktree
no unrelated same-file collisions
merge serially
review diff before PR
use Codex second opinion before merge
```

## Selective operator tools

```text
Claude Squad
Composio Agent Orchestrator
CCUI
AgentHub
Vibe Kanban
Workmux
itervox
```


---

# CLI_TERMINAL_CODE_QUALITY_GUIDE.md

## Universal CLI foundation

```text
ripgrep / fd / jq / yq / gh
pre-commit / just / mise / uv
```

## Code gates

```text
Python: ruff, pyright, mypy, pytest
JS/TS: biome, oxc, eslint, prettier, tsc
Shell: shellcheck
GitHub Actions: actionlint
Docker: hadolint
Terraform/IaC: tflint, checkov
Go: golangci-lint
Docs/prose: vale, markdownlint, textlint, typos
Security: semgrep, CodeQL, gitleaks, trufflehog, trivy, osv-scanner
MCP/agent security: mcp-scan, MCP Defender, Snyk agent-scan, Cisco MCP Scanner
```

## Quality invariant

No PR without:

```text
git diff --stat
git diff --check
focused tests
lint/typecheck/security checks
Codex review for risky changes
```


---

# EVAL_BENCHMARK_OBSERVABILITY.md

## Eval references

```text
swe-bench/SWE-bench
swe-agent/swe-agent
SWE-agent/mini-swe-agent
OpenHands/benchmarks
openai/evals
promptfoo/promptfoo
confident-ai/deepeval
braintrustdata/braintrust-sdk
langfuse/langfuse
explodinggradients/ragas
```

## Benchmark-before-adoption

Heavy tool adoption requires measured improvement over baseline:

```text
tokens
wall time
correctness
tests passed
diff quality
security risk
review quality
failure recovery
```

If a tool only adds complexity, remove it.


---

# COMMUNITY_CONSENSUS_2026.md

## 2026 agentic-engineering consensus

```text
plan before execution
use worktrees for parallelism
use concise CLAUDE.md and durable AGENTS.md
convert repeated procedures to Skills
use subagents for noisy exploration
use hooks for deterministic enforcement
track usage/cost/context
inspect diffs
write tests/evals
use second-model review
avoid broad MCP/plugin trust
```

## Boris/Cherny-style workflow signal

```text
parallel sessions
worktrees
plan mode
skills and slash commands
subagents
permissions
statusline/usage visibility
```

## Karpathy-style agentic engineer signal

```text
specs
plans
diffs
tests/evals
permission management
worktree isolation
quality preservation
```


---

# WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md

V58 closes these formerly under-covered dimensions:

```text
1. Agent-framework references beyond Claude Code:
   LangGraph, Microsoft Agent Framework, Google ADK, Pydantic AI, CrewAI, Agno, smolagents.

2. Evaluation and observability:
   OpenAI Evals, promptfoo, DeepEval, Braintrust, Langfuse, Ragas.

3. Memory/MCP governance:
   memory tools are audit-required, not default.

4. Grammar/prose quality:
   Vale, markdownlint, textlint, typos.

5. Official SDK/provider surfaces:
   Anthropic Agent SDK, Anthropic SDKs, OpenAI Agents SDK, OpenAI SDKs, OpenAI Skills.

6. Model routing:
   Opus-class as deep architect/security/research subagent; Codex/GPT-class as second-model witness.

7. MCP security:
   MCP Defender, mcp-scan, Cisco MCP Scanner, Snyk agent-scan, skill-scanner.
```


---

# SOURCE_AUDIT_NOTES.md

This kit is a README/docs/source-surface convergence audit, not a line-by-line security audit.

Before installing any executable repo, audit:

```text
install scripts
postinstall hooks
MCP server definitions
tool permissions
filesystem/network access
secret handling
telemetry
memory retention and deletion
license
uninstall path
update mechanism
bridge/plugin commands
worktree cleanup
```

## Red flags

```text
curl | sh
unbounded --dangerously-skip-permissions
secret reads
broad filesystem MCP
unreviewed memory plugins
remote dashboards without data policy
system prompt mutation
provider/proxy switchers
leaked/unofficial Claude Code internals
```

## Required output

```text
ALLOW / DENY / AUDIT-ONLY
risk summary
files reviewed
commands reviewed
permissions requested
rollback path
```

# ALL IN ONE — Claude Code SOTA V65



---

# FILE: README.md

# V65 Ultimate Comprehensive Claude Code SOTA Kit

Purpose: give Claude Code CLI a compact, executable, high-quality map of the current SOTA Claude Code/Codex/agentic-engineering ecosystem.

Read first:

```text
CLAUDE.md
AGENTS.md
EXECUTE_V65_ELITE_PLAN.md
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
ADVANCED_SOURCE_DEEP_DIVE_PROTOCOL.md
```

Operating rule:

```text
High-star discovery -> convergence filter -> source audit -> benchmark gate -> keep/drop.
```

Default runtime:

```text
Claude Code + Codex + codex-plugin-cc
ccusage + RTK + Serena + Repomix
rg/fd/jq/yq/gh + pre-commit/just/mise/uv
Codex as second-model reviewer
quality/security/prose gates
worktrees for parallelism
```


---

# FILE: CLAUDE.md

# Claude Code operating contract

- Keep base context small. Do not load every reference file by default.
- Prefer semantic retrieval and repo capsules before full-file reading.
- Use `rg`, `fd`, `jq`, `yq`, `gh`, `git diff --stat`, and focused tests.
- Use worktrees for parallel sessions.
- Use Codex through `openai/codex-plugin-cc` for independent review, adversarial review, and rescue.
- Never install plugins, MCP servers, bridge tools, hooks, memory layers, dashboards, or one-line installers without source audit.
- Benchmark heavy tools against baseline before keeping them.
- Store durable memory in git, issues, PRs, ADRs, AGENTS.md, CLAUDE.md, skills, and task-state files before adding memory MCPs.
- Before completion, run the narrowest relevant verification command and summarize evidence.


---

# FILE: AGENTS.md

# Cross-agent contract

Applies to Claude Code, Codex, GitHub agents, and external CLI agents.

## Roles

- Claude Code: primary orchestrator, editor, tester, worktree operator.
- Codex: independent reviewer, adversarial challenger, CI rescue, alternative hypothesis generator.
- Opus-class subagents: architecture, security, deep debugging, research synthesis.
- Sonnet-class workers: implementation, tests, routine refactors.
- Mini/lightweight agents: summarization, triage, classification.

## Done criteria

- Diff is minimal and scoped.
- Quality gates pass or failures are documented.
- Codex review findings are triaged.
- No new secrets, unsafe permissions, unbounded MCPs, or hidden memory writes.
- Handoff includes goal, files touched, commands run, test results, unresolved risks, and next actions.


---

# FILE: EXECUTE_V65_ELITE_PLAN.md

# Execute V65 Elite Plan

## Stage 0 — Baseline

```bash
git status --short
git branch --show-current
npx ccusage@latest daily || true
npx ccusage@latest session || true
git diff --stat
```

Record baseline tokens, runtime, errors, and current quality gates.

## Stage 1 — Install only the default core

Default core is intentionally small:

```text
ccusage
RTK
Serena
Repomix
rg fd jq yq gh
pre-commit just mise uv
```

Do not install MCP/memory/dashboard/bridge/plugin extras yet.

## Stage 2 — Build context capsule

1. Use Serena or code-intelligence tool for symbols.
2. Use Repomix for a scoped repo capsule.
3. Use `rg`/`fd` for narrow discovery.
4. Avoid reading giant files/logs unless necessary.

## Stage 3 — Define task-state

Use one of:

```text
GitHub Issues / PRs
Task Master
CCPM
BMAD
Spec Kit
PRP/context-engineering docs
```

Every task needs acceptance criteria, verification command, risk class, branch/worktree name, and owner.

## Stage 4 — Parallel worktree execution

```bash
git fetch --all --prune
git remote set-head origin -a || true
git worktree add ../repo-task-123 -b cc/task-123 origin/main
cd ../repo-task-123
claude
```

Claude native:

```text
claude --worktree task-123
/batch <large independent migration>
```

## Stage 5 — Codex second-model review

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on correctness, security, data loss, race conditions, rollback, hidden coupling --background
/codex:status
/codex:result
```

Use Codex as reviewer/rescue, not as permission boundary.

## Stage 6 — Quality gates

```bash
git diff --check
just test || true
pre-commit run --all-files
```

Language gates:

```text
Python: ruff, mypy/pyright, pytest
TS/JS: biome/oxc/eslint/tsc/vitest
Shell: shellcheck
GitHub Actions: actionlint
Docker: hadolint
IaC: checkov/tflint
Docs: vale/markdownlint/textlint/cspell
```

## Stage 7 — Audit before installing extras

For every plugin/MCP/memory/dashboard/bridge:

```bash
git clone <repo> /tmp/audit/repo
cd /tmp/audit/repo
find . -maxdepth 3 -type f | sort | sed -n '1,200p'
rg -n "curl|wget|bash|sudo|chmod|eval|exec|child_process|subprocess|token|secret|telemetry|analytics|MCP|mcp|postinstall|install" .
```

Reject if there is no clear permission model, uninstall path, data-retention policy, or safe failure mode.

## Stage 8 — Benchmark-before-adoption

Compare baseline vs candidate on:

```text
tokens
wall time
correctness
tests passed
review quality
security findings
operator visibility
rollback complexity
```

Keep only tools that beat baseline for your actual repo.

## Stage 9 — Durable learning

Only save general lessons to:

```text
CLAUDE.md
AGENTS.md
.claude/skills
ADRs
repo-map docs
Task Master / CCPM state
GitHub issue templates
```

Do not add memory plugins until repeated context-reconstruction cost is proven.


---

# FILE: SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md

# SOTA Repos Best-of-Best Final List — V65

This is convergence-filtered. Stars are discovery input, not install permission. Default installs are deliberately small; plugin, MCP, memory, dashboard, bridge, hook, and installer surfaces require source audit before use.

## Foundation / official surfaces

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
github/gh-aw
github/spec-kit
github/codeql-action
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
```

## Default install core

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

## Measurement / visibility

```text
ryoppippi/ccusage
matt1398/claude-devtools
sirmalloc/ccstatusline
mcpware/cross-code-organizer
jarrodwatts/claude-hud
jeongwookie/WhereMyTokens
spences10/claude-code-analytics
```

## Token / context elite

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

## Codebase intelligence

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

## High-star workflow references / selective pattern sources

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

## Workflow / harness elite

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
```

## Parallel / operator elite

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

## Codex / second-model bridges

```text
openai/codex-plugin-cc
bfly123/claude_codex_bridge
xiaolai/codex-toolkit-for-claude
promptadvisers/claudex
sakibsadmanshajib/gemini-plugin-cc
nikuscs/codex-cc-plugin
tasict/opencode-plugin-cc
```

## Memory / MCP audit-required

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

## MCP / document / browser / research ingestion

```text
upstash/context7
microsoft/playwright-mcp
docling-project/docling
microsoft/markitdown
unclecode/crawl4ai
firecrawl/firecrawl
jina-ai/reader
BjornMelin/ai-docs-vector-db-hybrid-scraper
```

## Agent framework references

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
sst/opencode
google-gemini/gemini-cli
QwenLM/qwen-code
Kilo-Org/kilocode
Gitlawb/openclaude
```

## Eval / benchmark / observability

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
evo-hq/evo
Human-Agent-Society/CORAL
```

## Security / code / prose quality

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
aws-samples/sample-mcp-security-scanner
semgrep/semgrep
github/codeql-action
gitleaks/gitleaks
trufflesecurity/trufflehog
aquasecurity/trivy
google/osv-scanner
ossf/scorecard
step-security/harden-runner
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
streetsidesoftware/cspell
```

## Discovery only

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
```

## Cut / demote rules

```text
low-signal one-off skills
large marketplaces as runtime dependencies
prompt packs that do not enforce behavior
memory tools without retention/deletion/security model
operator dashboards without worktree/diff/cleanup discipline
non-official Claude↔Codex bridges unless audited
token tools without clear interception point
workflow frameworks duplicating stronger systems without stronger evidence
system-prompt mutators unless explicitly needed and audited
provider/proxy switchers unless explicitly needed and audited
leaked/unofficial Claude Code repos
```


---

# FILE: WHAT_MORE_WAS_NOT_COVERED_ENOUGH.md

# What More Was Not Covered Enough — V65 Closure

V65 closes these remaining gaps:

```text
1. Source deep-dive execution protocol, not just list-making.
2. Documentation/research ingestion: Docling, MarkItDown, Crawl4AI, Firecrawl.
3. Agent-framework references: LangGraph, Deep Agents, Microsoft Agent Framework, AutoGen, Semantic Kernel, Google ADK, PydanticAI, CrewAI, Agno, smolagents.
4. Evals/observability: OpenAI Evals, promptfoo, DeepEval, Braintrust, Langfuse, RAGAS, Phoenix, SWE-bench.
5. Memory governance: durable state first, memory plugins audit-required.
6. MCP governance: scanners before MCP installation.
7. Model routing: Opus-class for deep subagents, Codex/GPT-class for second-model review.
8. Prose/grammar quality: Vale, markdownlint, textlint, cspell, typos.
9. Worktree operators: keep only those with isolation, diffs, cleanup, visibility.
10. Benchmark-before-adoption across tokens, correctness, time, safety, rollback.
```


---

# FILE: HIGH_STAR_RESEARCH_METHODS.md

# High-Star Research Methods

High stars are discovery, not adoption.

## Search dimensions

```text
claude-code
claude-code-skills
claude-code-workflow
claude-code-hooks
claude-code-mcp
claude-code-memory
token-optimization
agentic-engineering
cli-coding-agents
multi-agent-orchestrators
agent-skills
codex-cli
mcp-security
```

## Keep criteria

```text
context admission
semantic retrieval
read-path compression
worktree isolation
workflow state
second-model review
quality/security gates
benchmark/eval feedback
source auditability
```

## Demote criteria

```text
stars only
prompt pack only
marketplace only
memory without governance
operator without worktrees/diffs/cleanup
bridge without clear permission model
MCP without audit plan
```


---

# FILE: HIGH_STAR_TRIAGE_AND_CONVERGENCE.md

# High-Star Triage and Convergence

## Keep as defaults

```text
ccusage
RTK
Serena
Repomix
rg/fd/jq/yq/gh
pre-commit/just/mise/uv
Codex plugin cc
quality/security/prose gates
```

## Keep as selective

```text
Context Mode
Headroom
Wet
Claude Context
Context7
Playwright MCP
operator dashboards
memory MCPs
agent frameworks
evals/observability
```

## Keep as references

```text
BMAD
Task Master
CCPM
context-engineering-intro
wshobson/agents
shanraisshan/claude-code-best-practice
everything-claude-code
LangGraph / AutoGen / ADK / CrewAI / PydanticAI
SWE-bench / OpenHands / Goose
```

## Discovery only

```text
awesome lists
large skill catalogs
marketplaces
high-star domain-specific packs
system prompt trackers
provider switchers
```


---

# FILE: TOKEN_CONTEXT_ARCHITECTURE.md

# Token / Context Architecture

## Layers

```text
Measure: ccusage, devtools, statusline
Shell output: RTK
Semantic retrieval: Serena, Claude Context, Aider repo map, ast-grep, tree-sitter, mgrep
Repo capsule: Repomix, code2prompt
Large-output sandbox: Context Mode
Cross-agent compression/memory: Headroom
Read-path compression: Wet, Skinny Jeans, Distill, code-review-graph
Cross-harness visibility: Cross-Code Organizer
Docs/browser MCPs: Context7, Playwright MCP, Firecrawl/Crawl4AI/Docling/MarkItDown as selective ingestion tools
```

## Default

```text
ccusage + RTK + Serena + Repomix
```

Do not install every context tool. Add one layer only when the measured bottleneck matches it.


---

# FILE: MEMORY_MCP_AGENT_ORCHESTRATION.md

# Memory / MCP / Agent Orchestration Policy

## Durable memory first

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

## Memory repos are audit-required

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

## MCP categories

```text
Semantic code: Serena, Claude Context
Browser/docs: Playwright MCP, Context7, Firecrawl/Crawl4AI MCPs
Memory: memory MCPs above
Security: mcp-scan, MCP Defender, Cisco MCP Scanner, Snyk agent-scan
Large-output control: Context Mode
```

## Rule

Do not globally enable MCPs. Enable per-project, per-task, and only after source audit.


---

# FILE: MODEL_ROUTING_AND_SUBAGENTS.md

# Model Routing and Subagents

Do not hard-code unavailable model names. Check availability in Claude Code/Codex first.

```text
Claude Opus-class:
  architecture, security review, deep debugging, harness design, long-horizon research

Claude Sonnet-class:
  implementation, test writing, refactors, normal feature work

Claude Haiku-class:
  cheap summarization/classification when available

Codex / GPT-5.5-class:
  independent review, adversarial review, CI rescue, alternative implementation hypotheses

Codex mini-class:
  lightweight review, summarization, subagent triage
```

Subagent policy:

```text
Use subagents to isolate noisy exploration.
Use worktrees to isolate files.
Use Codex to challenge, not to replace permission gates.
```


---

# FILE: OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md

# Official SDKs and Provider Surfaces

## Anthropic

```text
anthropics/claude-code
anthropics/skills
anthropics/claude-agent-sdk-python
anthropics/claude-agent-sdk-typescript
anthropics/anthropic-sdk-python
anthropics/anthropic-sdk-typescript
```

## OpenAI

```text
openai/codex
openai/codex-plugin-cc
openai/skills
openai/openai-agents-python
openai/openai-python
openai/openai-node
```

## GitHub / MCP

```text
github/gh-aw
github/spec-kit
github/github-mcp-server
modelcontextprotocol/modelcontextprotocol
modelcontextprotocol/servers
modelcontextprotocol/inspector
```

Prefer official provider surfaces for production harnesses; use community repos as patterns unless audited.


---

# FILE: EVAL_BENCHMARK_OBSERVABILITY.md

# Eval / Benchmark / Observability

Reference/selective layer:

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
evo-hq/evo
Human-Agent-Society/CORAL
```

Adoption scorecard:

```text
baseline tokens vs candidate tokens
wall time
correctness
tests passed
review quality
security findings
operator visibility
rollback complexity
```

No heavy tool survives without a local benchmark win.


---

# FILE: CODEX_PLUGIN_CC_WORKFLOW.md

# Codex Plugin CC Workflow

Default bridge:

```text
openai/codex-plugin-cc
```

Commands:

```text
/codex:review --base main --background
/codex:adversarial-review --base main focus on correctness, security, data loss, race conditions, rollback, hidden coupling --background
/codex:rescue --background investigate the CI failure and propose the smallest safe fix
/codex:status
/codex:result
/codex:cancel
```

Policy:

```text
Claude Code writes and orchestrates.
Codex reviews, challenges, rescues, and proposes alternatives.
CI and deterministic gates decide.
Codex is not the permission boundary.
```


---

# FILE: PARALLEL_WORKTREE_AUTOMATION.md

# Parallel Worktree Automation

Worktrees isolate files; subagents isolate context.

```bash
git fetch --all --prune
git remote set-head origin -a || true
git worktree add ../repo-task-123 -b cc/task-123 origin/main
cd ../repo-task-123
claude
```

Native Claude Code:

```text
claude --worktree task-123
/batch <large independent change>
/autofix-pr only fix CI, lint, type errors, and review comments
```

Operator tools to evaluate:

```text
Claude Squad
Composio Agent Orchestrator
CCUI
AgentHub
Vibe Kanban
Workmux
itervox
Agor
ccswarm
```

Keep only if tool has: worktree isolation, branch ownership, diff review, cleanup, kill controls, local/remote data clarity.


---

# FILE: CLI_TERMINAL_CODE_QUALITY_GUIDE.md

# CLI / Terminal / Code / Prose Quality Gates

## CLI foundation

```text
rg fd jq yq gh git pre-commit just mise uv
```

## Code gates

```text
Python: ruff, mypy/pyright, pytest
TS/JS: biome, oxc, eslint, tsc, vitest
Shell: shellcheck
Actions: actionlint
Docker: hadolint
IaC: checkov, tflint
Secrets: gitleaks, trufflehog
Vulns: trivy, osv-scanner, CodeQL, Semgrep
```

## Prose / grammar / docs gates

```text
typos
cspell
vale
markdownlint
textlint
```

## Final pre-PR checks

```bash
git diff --check
git diff --stat
pre-commit run --all-files
just test || true
```


---

# FILE: ADVANCED_SOURCE_DEEP_DIVE_PROTOCOL.md

# Advanced Source Deep-Dive Protocol

This is the execution protocol for real source inspection.

## Clone and inventory

```bash
mkdir -p /tmp/agent-audit
cd /tmp/agent-audit
git clone --depth=1 <repo-url> repo
cd repo
printf "repo=%s\ncommit=%s\n" "$(git remote get-url origin)" "$(git rev-parse HEAD)"
find . -maxdepth 3 -type f | sort > FILE_INDEX.txt
```

## Classify source risk

```text
LOW: docs-only, examples-only, static reference list.
MEDIUM: CLI or scripts with local file access but no network/secrets.
HIGH: MCP server, hook, plugin, memory layer, dashboard, bridge, one-line installer.
CRITICAL: downloads binaries, modifies shell/profile, broad filesystem/network, hidden telemetry, credential access.
```

## Inspect dangerous surfaces

```bash
rg -n "curl|wget|bash|sh -c|sudo|chmod|chown|eval|exec|child_process|subprocess|spawn|postinstall|preinstall|install.sh" .
rg -n "MCP|mcp|tools|permissions|allowed-tools|deny|hook|PreToolUse|PostToolUse|Stop|Subagent" .
rg -n "token|secret|api_key|OPENAI|ANTHROPIC|GITHUB_TOKEN|DATABASE_URL|telemetry|analytics|sentry" .
rg -n "memory|sqlite|vector|embedding|qdrant|chromadb|weaviate|redis|postgres" .
```

## Keep/drop decision

Keep only if:

```text
purpose is clear
permission model is explicit
network/filesystem behavior is justified
telemetry is absent or opt-in
uninstall path exists
license is acceptable
maintainer activity is credible
candidate beats baseline benchmark
```


---

# FILE: COMMUNITY_CONSENSUS_2026.md

# Community Consensus 2026

Convergent practice from Claude Code team tips, Boris/Cherny-style workflows, Karpathy-style agentic engineering, and high-quality community repos:

```text
parallel worktrees
plan mode before hard work
concise CLAUDE.md
AGENTS.md for cross-agent contract
Skills/commands for repeat work
subagents for noisy exploration
Codex/GPT-class model as second witness
inspect diffs
tests/evals as proof
permissions and MCPs as security surfaces
operator dashboards only with worktree/diff/cleanup discipline
```

Agentic engineering means designing specs, supervising plans, inspecting diffs, writing tests/evals, managing permissions, isolating worktrees, and preserving quality.


---

# FILE: SOURCE_AUDIT_NOTES.md

# Source Audit Notes

This kit is a README/docs/source-surface convergence audit, not blanket approval to install every repository.

Audit every:

```text
plugin
MCP server
hook
bridge plugin
memory layer
dashboard
one-line installer
system-prompt mutator
provider/proxy switcher
```

Audit checklist:

```text
install path
uninstall path
permissions
network access
filesystem access
secret handling
telemetry/analytics
memory retention/deletion
dependency health
license
maintainer activity
supply-chain risk
```

Recommended scanners:

```text
snyk/agent-scan
cisco-ai-defense/mcp-scanner
cisco-ai-defense/skill-scanner
InvariantLabs-ai/mcp-scan
MCP-Defender/MCP-Defender
mintmcp/agent-security
semgrep
CodeQL
gitleaks
trufflehog
trivy
osv-scanner
```


---

# FILE: SOURCE_APPENDIX.md

# Source Appendix

- Claude Code commands: https://code.claude.com/docs/en/commands
- Claude Code cost optimization: https://code.claude.com/docs/en/costs
- Claude Code skills: https://code.claude.com/docs/en/skills
- Claude Code worktrees: https://code.claude.com/docs/en/worktrees
- Claude Code subagents: https://code.claude.com/docs/en/sub-agents
- Claude Agent SDK: https://code.claude.com/docs/en/agent-sdk/overview
- Codex models: https://developers.openai.com/codex/models
- Codex best practices: https://developers.openai.com/codex/learn/best-practices
- Codex plugin cc: https://github.com/openai/codex-plugin-cc
- GitHub Agentic Workflows: https://github.github.com/gh-aw/
- GitHub Agent HQ: https://github.blog/news-insights/company-news/pick-your-agent-use-claude-and-codex-on-agent-hq/
- Karpathy 2026: https://karpathy.bearblog.dev/sequoia-ascent-2026/
- Boris Claude Code tips: https://howborisusesclaudecode.com/
- RTK: https://github.com/rtk-ai/rtk
- Serena: https://github.com/oraios/serena
- Repomix: https://github.com/yamadashy/repomix
- Context Mode: https://github.com/mksglu/context-mode
- Headroom: https://github.com/chopratejas/headroom
- Snyk agent scan: https://github.com/snyk/agent-scan
- Cisco MCP Scanner: https://github.com/cisco-ai-defense/mcp-scanner
- Cisco Skill Scanner: https://github.com/cisco-ai-defense/skill-scanner
- MCP Defender: https://github.com/MCP-Defender/MCP-Defender
- OpenAI Evals: https://github.com/openai/evals
- promptfoo: https://github.com/promptfoo/promptfoo
- DeepEval: https://github.com/confident-ai/deepeval
- LangGraph: https://github.com/langchain-ai/langgraph
- OpenAI Agents SDK: https://github.com/openai/openai-agents-python
- Docling: https://github.com/docling-project/docling
- MarkItDown: https://github.com/microsoft/markitdown
- Crawl4AI: https://github.com/unclecode/crawl4ai
- Firecrawl: https://github.com/firecrawl/firecrawl

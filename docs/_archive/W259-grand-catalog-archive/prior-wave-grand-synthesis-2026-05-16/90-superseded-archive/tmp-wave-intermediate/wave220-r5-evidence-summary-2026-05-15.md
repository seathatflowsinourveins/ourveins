# Wave 220 R5 evidence summary

## A. outer-research kits inventory & primary doc heads

Kits found: 7
- docs/outer research/kits/v60
- docs/outer research/kits/v61
- docs/outer research/kits/v62
- docs/outer research/kits/v63
- docs/outer research/kits/v64
- docs/outer research/kits/v65
- docs/outer research/wave52

### Primary docs HEAD-40 captured (deep-dive):

**docs/outer research/kits/v60/MANIFEST.md**
  # MANIFEST
  - `.claude/agents/cli-quality-architect.md`
  - `.claude/agents/codex-bridge.md`
  - `.claude/agents/eval-benchmark-architect.md`
  - `.claude/agents/source-auditor.md`
  - `.claude/agents/token-budget-guardian.md`
  - `.claude/agents/worktree-operator.md`
  - `.claude/skills/benchmark-eval-gate/SKILL.md`

**docs/outer research/kits/v60/README.md**
  # V60 Ultimate Definitive Claude Code SOTA Kit
  Date: 2026-05-06
  This kit is for Claude Code CLI to read and execute. It is a convergence-filtered research kit, not a broad repo dump.
  Core rule:
  ```text
  high-star discovery
  → convergence filtering
  → source-surface audit

**docs/outer research/kits/v60/CLAUDE.md**
  # Claude Code operating rules
  - Keep this file short. Put long procedures into `.claude/skills`.
  - Use semantic code tools before reading whole files.
  - Prefer `rg`, `fd`, `jq`, `yq`, `git diff --stat`, and focused tests.
  - Use RTK-style filtering for noisy command output.
  - Use Serena/semantic retrieval and Repomix-style context capsules before broad file dumping.
  - Use one branch/worktree per nontrivial task.
  - Use subagents for noisy exploration and return summaries only.

**docs/outer research/kits/v60/AGENTS.md**
  # AGENTS.md

**docs/outer research/kits/v61/MANIFEST.md**
  # Manifest V61
  - `AGENTS.md`
  - `ALL_IN_ONE_CLAUDE_CODE_SOTA_V61.md`
  - `CLAUDE.md`
  - `CLI_TERMINAL_CODE_QUALITY_GUIDE.md`
  - `CODEX_PLUGIN_CC_WORKFLOW.md`
  - `COMMUNITY_CONSENSUS_2026.md`
  - `EVAL_BENCHMARK_OBSERVABILITY.md`

**docs/outer research/kits/v61/README.md**
  # Claude Code SOTA V61 Ultimate Elite Execution Kit
  This kit is for Claude Code CLI to read and execute. It is the hard-convergence version: high-star repos are discovery signals, not install permission

**docs/outer research/kits/v61/CLAUDE.md**
  # Claude Code SOTA V61 Runtime Rules
  Keep this file short. Load detailed playbooks from Skills and Markdown docs only when needed.

**docs/outer research/kits/v61/AGENTS.md**
  # AGENTS.md — Cross-Agent Contract
  This repository may be used by Claude Code, Codex, Gemini CLI, OpenCode, or other coding agents.


## B. Additional topic-search Top-6 (8 layers)


### topic:claude-security-audit

| stars | repo | license | description |
|---:|---|---|---|

### topic:llm-testing

| stars | repo | license | description |
|---:|---|---|---|
| 16161 | raga-ai-hub/RagaAI-Catalyst | apache-2.0 | Python SDK for Agent AI Observability, Monitoring and Evaluation Framework. Incl |
| 557 | PacificAI/langtest | apache-2.0 | Deliver safe & effective language models |
| 289 | faiscadev/fakecloud | agpl-3.0 | Free, open-source AWS emulator. LocalStack alternative: 33 services, 2,422 opera |
| 211 | LLAMATOR-Core/llamator | other | Red Teaming python-framework for testing chatbots and GenAI systems. |
| 98 | Free-AI-Things/g4f-working | other | g4f-working is a daily-updated list of working no-auth AI providers and models f |
| 95 | Addepto/contextcheck | mit |  MIT-licensed Framework for LLMs, RAGs, Chatbots testing. Configurable via YAML  |

### topic:claude-typescript

| stars | repo | license | description |
|---:|---|---|---|
| 1 | amber009-js/claude-code-src |  | Claude's typescript full 513K lines of code fully structured |

### topic:llm-formatter

| stars | repo | license | description |
|---:|---|---|---|

### topic:ast-analyzer

| stars | repo | license | description |
|---:|---|---|---|
| 1 | GabrielAv0301/DBPredictor | mit |  |

### topic:claude-debug

| stars | repo | license | description |
|---:|---|---|---|

### topic:claude-refactor

| stars | repo | license | description |
|---:|---|---|---|

### topic:cli-tool

| stars | repo | license | description |
|---:|---|---|---|
| 23987 | HKUDS/DeepTutor | apache-2.0 | "DeepTutor: Agent-Native Personalized Learning Assistant" |
| 6103 | Narcooo/inkos | agpl-3.0 | Autonomous novel writing AI Agent — agents write, audit, and revise novels with  |
| 6017 | mixn/carbon-now-cli | mit | 🎨 Beautiful images of your code — from right inside your terminal. |
| 4737 | unhappychoice/gitlogue | isc | A cinematic Git commit replay tool for the terminal, turning your Git history in |
| 4346 | FlorianBruniaux/claude-code-ultimate-guide | cc-by-sa-4.0 | A tremendous feat of documentation, this guide covers Claude Code from beginner  |
| 4257 | fosslife/awesome-ricing |  | A curated list of awesome tools and technology to help you out with ricing on li |

## C. Anthropic ecosystem repos

| repo | stars | pushed | license | description |
|---|---:|---|---|---|
| anthropics/anthropic-quickstarts | parse-err | | | |
| anthropics/courses | parse-err | | | |
| anthropics/claude-cookbooks | parse-err | | | |
| anthropics/prompt-eng-interactive-tutorial | 35671 | 2026-03-01 | ? | Anthropic's Interactive Prompt Engineering Tutorial |
| anthropics/anthropic-cookbook | parse-err | | | |
| anthropics/dxt | parse-err | | | |

## D. wshobson plugin ecosystem inventory

wshobson/agents top-level:
.claude-plugin, .github, .gitignore, CLAUDE.md, GEMINI.md, LICENSE, Makefile, README.md, docs, gemini-extension.json, plugins, tools

wshobson/agents/plugins/ contents (50 entries):
accessibility-compliance, agent-orchestration, agent-teams, api-scaffolding, api-testing-observability, application-performance, arm-cortex-microcontrollers, backend-api-security, backend-development, block-no-verify, blockchain-web3, brand-landingpage, business-analytics, c4-architecture, cicd-automation, cloud-infrastructure, code-documentation, code-refactoring, codebase-cleanup, comprehensive-review, conductor, content-marketing, context-management, customer-sales-automation, data-engineering, data-validation-suite, database-cloud-optimization, database-design, database-migrations, debugging-toolkit, dependency-management, deployment-strategies, deployment-validation, developer-essentials, distributed-debugging, documentation-generation, documentation-standards, dotnet-contribution, error-debugging, error-diagnostics, framework-migration, frontend-mobile-development, frontend-mobile-security, full-stack-orchestration, functional-programming, game-development, git-pr-workflows, hr-legal-compliance, incident-response, javascript-typescript

wshobson/commands top-level:
.github, .gitignore, LICENSE, README.md, examples, tools, workflows

## E. anthropics/skills repo top-level inventory

(7 entries)
.claude-plugin, .gitignore, README.md, THIRD_PARTY_NOTICES.md, skills, spec, template

## F. addyosmani/agent-skills repo top-level inventory

(16 entries)
.claude-plugin, .claude, .gemini, .github, .gitignore, .opencode, AGENTS.md, CLAUDE.md, CONTRIBUTING.md, LICENSE, README.md, agents, docs, hooks, references, skills

## G. ruvnet/ruflo top-level + README HEAD

dir entries: .agents, .claude-plugin, .claude, .githooks, .github, .gitignore, .npmignore, AGENTS.md, CHANGELOG.md, CLAUDE.local.md, CLAUDE.md, LICENSE, README.md, SECURITY.md, agentdb.rvf, agentdb.rvf.lock, bin, docs, package-lock.json, package.json, plugin, plugins, pnpm-lock.yaml, ruflo-plugins.gif, ruflo

README head:
  <div align="center">
  [![Ruflo Banner](ruflo/assets/ruflo-small.jpeg)](https://flo.ruv.io/)
  [![Try the UI Beta — flo.ruv.io](https://img.shields.io/badge/_Try_the_UI_Beta-flo.ruv.io-6366f1?style=for-the-badge&logoColor=white&logo=sv
  [![Goal Planner — goal.ruv.io](https://img.shields.io/badge/_Goal_Planner-goal.ruv.io-8b5cf6?style=for-the-badge&logoColor=white&logo=react)
  [![Live Agents — goal.ruv.io/agents](https://img.shields.io/badge/_Live_Agents-goal.ruv.io%2Fagents-10b981?style=for-the-badge&logoColor=whi
  [![Star on GitHub](https://img.shields.io/github/stars/ruvnet/claude-flow?style=for-the-badge&logo=github&color=gold)](https://github.com/ru
  [![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![Claude Code](https://img.shields.io/badge/Claude%20Code-Plugin-D97757?style=for-the-badge&logoColor=white&logo=anthropic)](https://github
  [![Codex Plugin](https://img.shields.io/badge/Codex-Plugin-412991?style=for-the-badge&logoColor=white&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64
  [![🕸️ RuVector Graph Ai](https://img.shields.io/badge/RuVector_Agentic-DB-06b6d4?style=for-the-badge&logoColor=white&logo=graphql)](https://
  [![ruFlo Summit — Budapest, June 2–3, 2026](v3/docs/assets/ruFlo-Summit.jpg)](https://github.com/ruvnet/ruflo/issues/1967)
  # Ruflo
  **Multi-agent AI orchestration for Claude Code**

## H. safishamsi/graphify top-level + README HEAD

dir entries: .github, .gitignore, AGENTS.md, ARCHITECTURE.md, CHANGELOG.md, LICENSE, README.md, SECURITY.md, docs, graphify, pyproject.toml, tests, worked

README head:
  <p align="center">
    <a href="https://graphifylabs.ai"><img src="https://raw.githubusercontent.com/safishamsi/graphify/v4/docs/logo-text.svg" width="260" heigh
  </p>
  <p align="center">
    🇺🇸 <a href="README.md">English</a> | 🇨🇳 <a href="docs/translations/README.zh-CN.md">简体中文</a> | 🇯🇵 <a href="docs/translations/README.ja-JP.
  </p>
  <p align="center">
    <a href="https://safishamsi.gumroad.com/l/qetvlo"><img src="https://img.shields.io/badge/Book-The%20Memory%20Layer-2ea44f?style=flat&logo=
    <a href="https://github.com/safishamsi/graphify/actions/workflows/ci.yml"><img src="https://github.com/safishamsi/graphify/actions/workflo
    <a href="https://pypi.org/project/graphifyy/"><img src="https://img.shields.io/pypi/v/graphifyy" alt="PyPI"/></a>
    <a href="https://clickpy.clickhouse.com/dashboard/graphifyy"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fsql-cli
    <a href="https://github.com/sponsors/safishamsi"><img src="https://img.shields.io/badge/sponsor-safishamsi-ea4aaa?logo=github-sponsors" al
    <a href="https://www.linkedin.com/in/safi-shamsi"><img src="https://img.shields.io/badge/LinkedIn-Safi%20Shamsi-0077B5?logo=linkedin" alt=
    <a href="https://x.com/graphifyy"><img src="https://img.shields.io/badge/X-graphifyy-000000?logo=x&logoColor=white" alt="X"/></a>
  </p>
  <p align="center">
    <a href="https://star-history.com/#safishamsi/graphify&Date">

## I. thedotmack/claude-mem top-level + README HEAD

dir entries: .agent, .agents, .claude-plugin, .claude, .codex-plugin, .dockerignore, .gitattributes, .github, .gitignore, .markdownlint.json, .mcp.json, .npmignore, .npmrc, .plan, .translation-cache.json, .windsurf, CHANGELOG.md, CLAUDE.md, Dockerfile.test-installer, LICENSE, NOTICE, README.md, SECURITY.md, WARP.md, bunfig.toml

README head:
  <h1 align="center">
    <br>
    <a href="https://github.com/thedotmack/claude-mem">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/thedotmack/claude-mem/main/docs/public/claude-m
        <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/thedotmack/claude-mem/main/docs/public/claude-
        <img src="https://raw.githubusercontent.com/thedotmack/claude-mem/main/docs/public/claude-mem-logo-for-light-mode.webp" alt="Claude-Me
      </picture>
    </a>
    <br>
  </h1>
  <p align="center">
    <a href="docs/i18n/README.zh.md">🇨🇳 中文</a> •
    <a href="docs/i18n/README.zh-tw.md">🇹🇼 繁體中文</a> •
    <a href="docs/i18n/README.ja.md">🇯🇵 日本語</a> •
    <a href="docs/i18n/README.pt.md">🇵🇹 Português</a> •
    <a href="docs/i18n/README.pt-br.md">🇧🇷 Português</a> •
    <a href="docs/i18n/README.ko.md">🇰🇷 한국어</a> •
    <a href="docs/i18n/README.es.md">🇪🇸 Español</a> •

## EOF summary

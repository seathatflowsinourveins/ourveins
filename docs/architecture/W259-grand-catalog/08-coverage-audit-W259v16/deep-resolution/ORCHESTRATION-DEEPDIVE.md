# W259-v16 MAX-DEPTH Gap Resolution — Orchestration Layer (L2)

> **Mission**: deep-dive the 4 orchestration-layer coverage-audit gap repos to definitive, primary-source-backed resolutions. The W259-v16 coverage audit (`08-coverage-audit-W259v16/ORCHESTRATION-COVERAGE.md` + `05-scoring/MASTER-SCORING-MATRIX-W259.md §5` rows A1-A4) gave each a QUICK disposition. This document confirms or revises each from the ACTUAL source.
> **Repos**: `agno-agi/agno`, `langchain-ai/deepagents`, `mastra-ai/mastra`, `strands-agents/sdk-python`.
> **Method**: GitHub MCP file-tree + raw file reads (LICENSE, pyproject.toml, package.json, README, `.mcp.json`, `action.yml`, `.claude/`, `.claude-plugin/`), DeepWiki architecture queries, GitHub REST metadata (stars, issues, commit cadence, archived flag). All data pulled live 2026-05-17.
> **Cite-class**: `effective_tier=TIER-3-LOCAL-COMPOSITION`; underlying repo data = TIER-1-DIRECT live GitHub API + raw-file reads.
> **Runtime-fit frame**: Windows 11 Z:-portable Claude Code runtime, single operator, shared venv `Z:\venvs\claude`. **Claude Code IS the orchestrator** (L2 incumbent = CC + anthropics/skills + obra/superpowers + wshobson/agents + agent-teams, Master row 1 composite 97). A peer orchestration framework earns INSTALL-NOW only if it fills a hole CC + installed plugins cannot. Otherwise CITE-PATTERN at best.

---

## BOTTOM LINE FIRST

**All 4 quick dispositions are CONFIRMED. No INSTALL-grade surprises.** None of the 4 ships a Claude Code plugin (`.claude-plugin/plugin.json` returned HTTP 404 on all four — verified, not inferred). All four are *peer agent frameworks* that would substitute for the CC orchestrator, which is not load-bearing for this runtime. The deep dive did surface **three catalog-accuracy corrections** that the orchestrator should fold into the master matrix:

1. **Agno license is Apache-2.0, NOT MPL-2.0.** The coverage audit's GAP-1 entry states "License: MPL-2.0". The actual `LICENSE` file is verbatim Apache License 2.0 (`Copyright 2025-2026 Agno Inc.`). MPL-2.0 was wrong — the correct license is *more* permissive, not less. **Correct the master matrix row A1.**
2. **Mastra is dual-licensed (Apache-2.0 + Mastra Enterprise License on `ee/`), NOT plain Apache-2.0.** The audit GAP-2 says "Apache-2.0 core (verify per-package)". Verified: the `ee/` directories (`packages/core/src/auth/ee/`, `packages/server/src/server/auth/ee/`) are source-available under a proprietary Enterprise License. The 99% non-`ee/` core is Apache-2.0. The audit's "verify per-package" hedge was correct in spirit; the resolution is now explicit: **core Apache-2.0, auth/`ee/` proprietary.**
3. **Strands is Production/Stable, not early-stage.** `pyproject.toml` declares `Development Status :: 5 - Production/Stable`. The audit treated its 5.9k stars as a maturity signal; the maturity is higher than the star count implies (AWS-official, prod-stable classifier, A2A/Swarm/Graph orchestration shipped).

The disposition *tier* for each repo (STUDY-PILOT ×3, CITE-PATTERN ×1) is unchanged — all four are non-install. No install-set change.

---

## REPO 1 — `agno-agi/agno` (ex-Phidata)

### Source-verified capabilities
Agno is a **multi-layer agent platform SDK**, not a single-agent toolkit. Verified from `README.md` + DeepWiki architecture read. Three layers:
- **SDK** — `Agent`, `Team` (specialized agents collaborating, shared memory/context), `Workflow` (chained agents/teams/functions into deterministic pipelines). So it *is* a genuine multi-agent orchestration framework, not just an agent runner.
- **Runtime — `AgentOS`** — a built-in FastAPI server (50+ endpoints, SSE + websockets, sessions, OpenTelemetry tracing, cron scheduling with no external infra, JWT RBAC, multi-tenant isolation). Notable: `AgentOS` ships **adapters for Claude Agent SDK, LangGraph, and DSPy** — it can host agents built in *other* frameworks.
- **Control plane** — `AgentOS UI` (os.agno.com), a hosted dashboard.
- 100+ tool toolkits; context providers (Slack/Drive/wikis/MCP); human-approval gates; Slack/Telegram/WhatsApp/Discord/AG-UI/A2A interfaces.

### Native-CC pathway — **VERIFIED: NO**
- `.claude-plugin/` — **absent** (HTTP 404 confirmed). No `plugin.json`.
- The repo ships a root `CLAUDE.md` (7,145 B) + `AGENTS.md` (6,233 B) + `.cursorrules` — these are **the Agno repo's own contributor dev-guidance files** (instructions for coding agents working *on* Agno), NOT a distributable CC surface. The audit was right that the only CC mention is oblique.
- No `SKILL.md`, no `.mcp.json` in the tree.
- Mechanism if used: Python library / subprocess only. Agno offers its docs as an MCP server (`docs.agno.com/mcp`) and an `llms-full.txt` index — that is a *documentation* endpoint for coding agents, not an agent-orchestration integration.

### License — **Apache-2.0** (CORRECTION — audit said MPL-2.0)
Verified verbatim: `LICENSE` is the full Apache License 2.0 text, `Copyright 2025-2026 Agno Inc.` Clean permissive license, fine for library-link. **The coverage audit GAP-1 "MPL-2.0" is an error; correct master matrix row A1 to Apache-2.0.**

### Windows-compat
Not explicitly claimed. Pure-Python (`pip install`, `fastapi dev`); no documented POSIX-only dependency. `AgentOS` is a FastAPI app — cross-platform. Deployment story is container-first (Docker/Railway/AWS/GCP). **Likely Windows-OK for library use**; no Windows CI matrix found to confirm hard.

### Maintenance velocity
- 40,156 stars; created 2022-05-04 (the longest-lived of the 4 — it is ex-Phidata). 5,387 forks, 236 watchers. Not archived.
- `pushed_at` 2026-05-16 (1 day before audit). Last-100-commits window is dense within May 2026 — high commit velocity.
- **Open issues: 904** — by far the highest of the 4. For a 40k-star repo this is not alarming on its own (large user base), but it is a real triage-load signal; the repo trades velocity for a sizeable open-issue backlog.

### Duplication vs installed stack
Agno's `Team`/`Workflow` orchestration directly overlaps the runtime's installed `agent-teams` plugin + CC subagents + git-worktrees + background-sessions (the 4 parallel-work modes). `AgentOS` (server + RBAC + scheduling) is a *product surface* the solo Z:-portable runtime has no use for. The Claude-Agent-SDK adapter is interesting but inverts the dependency (Agno hosting CC, not CC using Agno).

### DEFINITIVE RESOLUTION — **STUDY-PILOT** (confirms quick disposition)
Genuine, large, well-maintained multi-agent framework — a real catalog-completeness gap, correctly added as scored row A1. But it is a **peer orchestrator**: adopting it means running agents *inside Agno* instead of inside CC. No native-CC pathway. For this runtime CC is the orchestrator and is not load-bearing-replaceable. Disposition stays **STUDY-PILOT** (study the `Team`/`Workflow` + `AgentOS` scheduling patterns; do not install). **Action: correct license MPL-2.0 → Apache-2.0 in the master matrix.**

---

## REPO 2 — `langchain-ai/deepagents`

### Source-verified capabilities
LangChain's official **"batteries-included agent harness"**. This is the highest-fidelity codification of the Claude-Code architecture pattern of the four — the README states verbatim: *"Inspired by Claude Code: an attempt to identify what makes it general-purpose, and push that further"*, and `libs/code/README.md` repeats it. Verified from source tree + DeepWiki:
- **Middleware-stack architecture** — `create_deep_agent()` assembles a LangGraph agent from an ordered middleware stack. Source: `libs/deepagents/deepagents/graph.py` (37 KB), `middleware/`, `_subagent_transformer.py`.
- Built-in tools/middleware (DeepWiki-confirmed): `TodoListMiddleware` (`write_todos` planning tool) → `SkillsMiddleware` (loads `SKILL.md` files) → `FilesystemMiddleware` (`ls`/`read_file`/`write_file`/`edit_file`/`glob`/`grep`, pluggable local/sandboxed/remote backends) → `SubAgentMiddleware` + `AsyncSubAgentMiddleware` (`task` tool, isolated-context sub-agents) → `SummarizationMiddleware` (auto-compaction + offload-to-disk) → `PatchToolCallsMiddleware` → `AnthropicPromptCachingMiddleware` → `MemoryMiddleware` (loads `AGENTS.md`) → `HumanInTheLoopMiddleware`.
- **`libs/code` — "Deep Agents Code"** (`deepagents-code` / `dcode`): a pre-built terminal coding agent, *an explicit Claude-Code competitor* — interactive TUI, conversation resume, web search, remote sandboxes (LangSmith/AgentCore/Daytona/Modal/Runloop), persistent memory, custom skills as slash-commands, headless mode, HITL. Ships its own 59 KB `THREAT_MODEL.md`.
- `libs/acp` — Agent Context Protocol support. `libs/evals` — eval suite + Harbor integration. JS/TS twin at `deepagentsjs`.

### Native-CC pathway — **VERIFIED: PARTIAL (but not a CC plugin)**
- `.claude-plugin/` — **absent** (HTTP 404 confirmed). It is **not** a Claude Code plugin.
- `.mcp.json` — **present** at repo root. Content verified: it registers two **HTTP MCP servers** (`docs-langchain` → `https://docs.langchain.com/mcp`, `reference-langchain` → `https://reference.langchain.com/mcp`). This is a *documentation* MCP config for coding agents working on the deepagents repo — useful as a pattern, but it does not expose deepagents itself as an MCP server.
- `action.yml` — **present**: a composite GitHub Action ("Deep Agents Code") that runs `deepagents-code` headless in CI, with `actions/cache`-backed cross-run agent memory, a `skills_repo` input that clones any `owner/repo` of `SKILL.md` dirs, and a `--shell-allow-list`. This is a real, well-built CI primitive.
- `AGENTS.md` (25.8 KB) — the deepagents monorepo's own contributor dev-guide (uv/make/ruff/ty). Not a CC surface.
- Mechanism if used: Python library (`uv add deepagents`) or the `dcode` CLI / GitHub Action. **Not** CC-pluggable.

### License — **MIT** (clean; audit said MIT — confirmed)
`LICENSE` verified verbatim: MIT, `Copyright (c) LangChain, Inc.` The cleanest license of the four.

### Windows-compat
Python ≥3.11. Core SDK is cross-platform Python. **Caveats**: (a) the `execute` shell tool assumes a POSIX-ish shell; (b) the install path is `curl -LsSf https://langch.in/dcode | bash` (bash); (c) `action.yml` steps are all `shell: bash`. The *library* is Windows-usable; the `dcode` CLI install + the GitHub Action are POSIX-shell-shaped. For a Z:-portable Windows runtime that already runs Git-Bash this is a soft caveat, not a blocker.

### Maintenance velocity
- 22,860 stars; created 2025-07-27 (youngest repo, ~10 months old — 23k stars in 10 months is steep adoption). 3,231 forks. Not archived.
- `pushed_at` 2026-05-17 (audit day); last-30-commits all within 2026-05-12..17 — very high velocity.
- **Open issues: 171** — healthy for a 23k-star repo; the best issue-health ratio of the four. LangChain-official maintenance.

### Duplication vs installed stack
deepagents is a *direct re-implementation of the Claude-Code harness pattern* — planning tool, sub-agents, filesystem, skills, compaction, HITL. Every one of those the runtime already gets natively from CC itself. `libs/code`/`dcode` is a CC competitor. Installing deepagents = running a parallel harness; pure duplication for this runtime.

### DEFINITIVE RESOLUTION — **CITE-PATTERN** (confirms quick disposition)
This is the canonical LangChain-official codification of the Plan-Execute-Review / sub-agent-delegation harness pattern the catalog's `02-layer-deepdive §7 Convergence #2` already discusses. It is **explicitly modeled on Claude Code** — so for a runtime where CC *is* the harness, deepagents is a *mirror*, not an upgrade. Correctly added as scored row A2. Disposition stays **CITE-PATTERN**: cite its middleware-ordering and the `action.yml` CI-memory pattern (`actions/cache`-keyed cross-run agent memory keyed by agent-name + scope is a clean, portable idea); do **not** install a peer harness. The catalog's representative-inconsistency note (it listed only the weaker 3rd-party `vstorm-co/pydantic-deepagents` ~1.5k★) stands — A2 correctly closes it.

---

## REPO 3 — `mastra-ai/mastra`

### Source-verified capabilities
Mastra is the leading **TypeScript-native** agent framework (Y-Combinator W25; built by ex-Gatsby team). Verified from `README.md` + repo tree:
- **Agents** — autonomous LLM+tool agents with internal iteration loops.
- **Workflows** — a graph-based engine with explicit control-flow primitives (`.then()`, `.branch()`, `.parallel()`); deterministic multi-step orchestration.
- **Model routing** — one interface over 40+ providers.
- **Human-in-the-loop** — suspend/resume on storage-backed execution state (pause indefinitely, resume).
- **Context management / memory** — conversation history, RAG retrieval, working + semantic memory.
- **MCP** — authors MCP *servers* (exposes agents/tools over MCP) and is an MCP *client*.
- Built-in evals + observability; deploys embedded in React/Next/Node or as a standalone server.
- Large pnpm monorepo: `packages/`, `workflows/`, `stores/`, `deployers/`, `voice/`, `client-sdks/`, `integrations/`, `mastracode/` (its own coding-agent), `server-adapters/`, `observability/`.

### Native-CC pathway — **VERIFIED: NO** (the `.claude/` directory is a decoy)
- `.claude-plugin/` — **absent** (HTTP 404 confirmed). Not a CC plugin.
- The repo **does** contain a `.claude/` directory — but inspection shows it is the **Mastra repo's own contributor tooling**, not a distributable plugin:
  - `.claude/settings.json` (79 B) — verified content: `{"enabledPlugins": {"ralph-wiggum@claude-plugins-official": true}}`. This enables an upstream plugin *for people doing CC-assisted development on the Mastra repo*.
  - `.claude/skills/` — 13 skills, all **repo-internal dev skills**: `mastra-docs`, `mastra-smoke-test`, `builder-smoke-test`, `pr-explainer`, `pr-splitter`, `e2e-tests-studio`, `testing-core-processors`, `testing-mastracode-tui`, `react-best-practices`, `tailwind-best-practices`, `debugging-difficult-bugs`, `ralph-plan`, `smoke-test`. These help contributors build/test Mastra — they are not a reusable orchestration capability for an external runtime.
  - `.claude/commands/` — likewise repo-dev slash-commands.
  - The repo also ships `.cursor/`, `.opencode/`, `.mastracode/`, `.agents/` — the same pattern across every coding-agent tool. This is "we dogfood many agents on our own monorepo," not "we ship a CC integration."
- Mechanism if used: `npm`/`pnpm` library (`npm create mastra@latest`) — a TypeScript package, off the runtime's Python surface entirely.

### License — **Dual: Apache-2.0 + Mastra Enterprise License** (REFINEMENT of audit's "Apache-2.0 core")
Verified from `LICENSE.md` + `README.md §Licensing`: the core framework and "the vast majority of this codebase" is **Apache-2.0** (`Copyright (c) 2025 Kepler Software, Inc.`). Any directory named `ee/` (e.g. `packages/core/src/auth/ee/`, `packages/server/src/server/auth/ee/`) is **source-available under the proprietary Mastra Enterprise License** — free for dev/test, requires a paid license for production. The audit's "verify per-package" hedge is now resolved: **core open Apache-2.0; auth-related `ee/` code proprietary.**

### Windows-compat
TypeScript / Node.js — generally cross-platform. Standard `npm`/`pnpm` install. No Python. No Windows-specific blocker found; but this is *off the operator's Python-centric surface* regardless.

### Maintenance velocity
- 23,945 stars; created 2024-08-06. 2,080 forks. Not archived.
- `pushed_at` 2026-05-17 (audit day); last-30-commits all 2026-05-15..17 — very high velocity.
- **Open issues: 412** — moderate for a 24k-star monorepo; healthy.

### Duplication vs installed stack
Mastra's value proposition is a *TypeScript* agent+workflow stack. The runtime is Python-centric (`Z:\venvs\claude`). The catalog already carries `vercel/ai` (Master row 96) as the TS-stack entry — Mastra partially duplicates that slot (Mastra is a fuller agent+workflow framework where `vercel/ai` is an SDK). Mastra's orchestration overlaps installed `agent-teams` + CC subagents conceptually.

### DEFINITIVE RESOLUTION — **STUDY-PILOT** (confirms quick disposition)
A genuine 24k-star coverage gap, correctly added as scored row A3. But: (1) no native-CC plugin — the `.claude/` directory is repo-internal dogfooding, explicitly *not* a shippable integration; (2) TypeScript stack, off the operator's Python surface; (3) dual-license `ee/` caveat on auth code; (4) peer orchestrator that would replace CC. Disposition stays **STUDY-PILOT** (study the `.then()/.branch()/.parallel()` workflow-control syntax + the storage-backed suspend/resume HITL model — both are clean ideas; do not install). **Action: refine master matrix row A3 license to "Apache-2.0 core + proprietary `ee/`".**

---

## REPO 4 — `strands-agents/sdk-python` (AWS Strands Agents)

### Source-verified capabilities
Strands is **AWS's official model-driven Python agent SDK** — production-stable. Verified from `pyproject.toml` (`name = "strands-agents"`, `authors = [{name="AWS", email="opensource@amazon.com"}]`, `Development Status :: 5 - Production/Stable`), `README.md`, source tree (`src/strands/`), DeepWiki:
- **Agent loop** — a simple, fully-customizable `Agent` loop; `@tool`-decorator tools; hot-reload tools from a `./tools/` directory.
- **Multi-agent orchestration** (`src/strands/multiagent/`, DeepWiki-confirmed): **Swarm** (autonomous tool-based handoffs via an injected `handoff_to_agent` tool + `SharedContext` shared memory; `max_handoffs`/`max_iterations`/timeouts as loop guards) · **Graph** (deterministic dependency-driven DAG; `GraphBuilder`; parallel batch execution via `asyncio`; supports cyclic graphs + nested Swarm/Graph nodes) · **A2A protocol** (`A2AServer` + `StrandsA2AExecutor`; the `a2a` extra pulls `a2a-sdk`).
- **Model-agnostic** — built-in providers for Amazon Bedrock, Anthropic, Gemini, Cohere, LiteLLM, llama.cpp, LlamaAPI, Mistral, Ollama, OpenAI (+ Responses API), SageMaker, Writer.
- **Native MCP** — `MCPClient` over stdio; OpenTelemetry-native telemetry (`opentelemetry-*` are core deps, not optional).
- Experimental bidirectional (voice) streaming (Nova Sonic / Gemini Live / OpenAI Realtime).
- Has a `src/strands/plugins/` + `src/strands/vended_plugins/` — these are *Strands' own* plugin system (Python entry-point plugins), unrelated to Claude Code plugins.

### Native-CC pathway — **VERIFIED: NO**
- `.claude-plugin/` — **absent** (HTTP 404 confirmed). DeepWiki explicitly confirms no Claude Code plugin / skill / `.claude-plugin` manifest ships.
- `AGENTS.md` (24.4 KB) — the Strands repo's contributor dev-guide. Not a CC surface.
- Anthropic support is a *model provider* abstraction (`anthropic` extra), not a CC integration.
- Mechanism if used: Python library (`pip install strands-agents strands-agents-tools`) or subprocess. Note: it is a *clean* Python library (`hatchling` build, `src/` layout, `mypy --strict`, Python 3.10–3.14, full ruff/pydocstyle) — well-engineered, just not CC-pluggable.

### License — **Apache-2.0** (clean; audit said Apache-2.0 — confirmed)
Verified from both `LICENSE` (full Apache-2.0 text) and `pyproject.toml` (`license = {text = "Apache-2.0"}`, `License :: OSI Approved :: Apache Software License`). The repo also ships a `NOTICE` file (Apache convention). Clean.

### Windows-compat
`pyproject.toml` classifiers: `Operating System :: OS Independent`, Python 3.10–3.14. README install instructions explicitly include the Windows venv path (`.venv\Scripts\activate`). **Best Windows story of the four** — explicitly OS-independent + Windows-documented. No Windows CI matrix verified, but the OS-Independent classifier is an explicit maintainer claim.

### Maintenance velocity
- 5,870 stars; created 2025-05-14 (~12 months old). 840 forks. Not archived. Production/Stable classifier.
- `pushed_at` 2026-05-15 (2 days before audit). Commit cadence is active through May 2026, somewhat lighter than the 23k+-star repos but steady.
- **Open issues: 498** — high relative to 5.9k stars; the issue-to-star ratio is the heaviest of the four. Partially expected for an AWS-official repo with broad provider surface (12+ model providers, A2A, bidi-streaming), but it is a real triage-load signal.

### Duplication vs installed stack
Strands' Swarm/Graph/A2A multi-agent orchestration overlaps the runtime's installed `agent-teams` plugin + CC subagents (`Agent` tool) + the documented 4 parallel-work modes. It is the AWS-official entry in the catalog's "consolidated 4-5 frameworks" set (LangGraph/MAF/CrewAI/OpenAI-SDK/ADK) — a real asymmetry that ADK (Google) and MAF (Microsoft) are scored while AWS's Strands was not.

### DEFINITIVE RESOLUTION — **STUDY-PILOT** (confirms quick disposition)
A genuine gap — AWS-official, production-stable, and the catalog scored Google's ADK and Microsoft's MAF but omitted the AWS equivalent. Correctly added as scored row A4. But it is a **peer Python orchestrator** with no native-CC pathway; it would replace the CC orchestrator. Its strong-org status (AWS-official, the operator's "low-star OK if strong-org" rule) justified the *scored-row add*, not an install. Disposition stays **STUDY-PILOT** (study the Swarm `handoff_to_agent` + `SharedContext` pattern and the Graph `GraphBuilder` cyclic-DAG model — both are well-designed; do not install a peer framework). Strands has the **best Windows-compat story** of the four (explicit `OS Independent` classifier) — worth noting if a future wave ever needs a Python peer-framework pilot, Strands is the most Windows-portable candidate.

---

## CONSOLIDATED RESOLUTION TABLE

| Repo | Quick disp. (audit) | Deep-dive verdict | Native-CC pathway (verified) | License (verified) | Windows | Maint. (stars / issues / pushed) | Evidence-driven note |
|---|---|---|---|---|---|---|---|
| `agno-agi/agno` | STUDY-PILOT | **STUDY-PILOT — confirmed** | **NO** — `.claude-plugin/` 404; root `CLAUDE.md`/`AGENTS.md` are repo dev-config; Python lib only | **Apache-2.0** (audit said MPL-2.0 — **WRONG, correct it**) | likely OK (pure Python, no CI proof) | 40.2k / **904** / 2026-05-16 | Multi-layer platform (`Team`/`Workflow` + `AgentOS` server). Peer orchestrator. Highest open-issue load. |
| `langchain-ai/deepagents` | CITE-PATTERN | **CITE-PATTERN — confirmed** | **PARTIAL** — `.claude-plugin/` 404; ships `.mcp.json` (docs MCP only) + `action.yml` CI primitive; not CC-pluggable | **MIT** (confirmed) | lib OK; `dcode` install + Action are bash-shaped | 22.9k / **171** / 2026-05-17 | Explicitly "inspired by Claude Code"; a *mirror* of the CC harness. `libs/code`=CC competitor. Best issue health. |
| `mastra-ai/mastra` | STUDY-PILOT | **STUDY-PILOT — confirmed** | **NO** — `.claude-plugin/` 404; the `.claude/` dir is repo-internal dev tooling (13 dev skills, dogfooding), not shippable | **Apache-2.0 core + proprietary `ee/`** (audit hedged "verify" — **resolved**) | OK (Node/TS) but off Python surface | 23.9k / 412 / 2026-05-17 | Leading TS-native framework (YC W25). Partially duplicates `vercel/ai` slot. TS stack. |
| `strands-agents/sdk-python` | STUDY-PILOT | **STUDY-PILOT — confirmed** | **NO** — `.claude-plugin/` 404 (DeepWiki-confirmed); `src/strands/plugins/` is Strands' own plugin system | **Apache-2.0** (confirmed) | **best of 4** — `OS Independent` classifier + Windows install documented | 5.9k / **498** / 2026-05-15 | AWS-official, Production/Stable. Swarm/Graph/A2A. The "6th framework" the catalog omitted vs ADK/MAF. |

## ACTIONS FOR THE ORCHESTRATOR (catalog hygiene — not install changes)

1. **`MASTER-SCORING-MATRIX-W259.md §5` row A1 (`agno-agi/agno`)** — change license `MPL-2.0` → `Apache-2.0`. The coverage-audit `ORCHESTRATION-COVERAGE.md §(c) GAP-1` carries the same MPL-2.0 error; correct both.
2. **Row A3 (`mastra-ai/mastra`)** — refine license to `Apache-2.0 core + proprietary Mastra Enterprise License on ee/`.
3. **Row A4 (`strands-agents/sdk-python`)** — optionally annotate `Development Status: Production/Stable` + `OS Independent` (its maturity and Windows-portability exceed what the 5.9k star count alone signals).
4. **No install-set change.** All 4 confirmed non-install. The W259 L2 install picks (anthropics/skills + obra/superpowers + wshobson/agents on the CC-native side; LangGraph/MAF/ADK/OpenAI-SDK as STUDY-PILOT peers) remain on the Pareto frontier. None of these 4 ships a `.claude-plugin/plugin.json` — verified by HTTP 404 on all four, so none is even installable as a CC plugin without a wrapper.

> **Honest non-finding**: no Windows CI matrix was located for Agno, deepagents, or Strands within this dive — Windows-compat verdicts rest on pure-Python/Node portability + (for Strands) the explicit `OS Independent` PyPI classifier and Windows-documented install. None of the four is a Windows *blocker*; none is a verified Windows *guarantee*. This does not change any disposition (all four are non-install regardless of OS).

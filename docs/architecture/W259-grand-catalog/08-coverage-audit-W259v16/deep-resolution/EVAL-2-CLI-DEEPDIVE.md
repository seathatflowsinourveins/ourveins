# W259-v16 MAX-DEPTH Gap Resolution — EVAL / OBSERVABILITY / PEER-CLI cluster

> **Mission.** The W259-v16 coverage audit (`08-coverage-audit-W259v16/EVAL-OBSERVABILITY-COVERAGE.md` §c + `KNOWLEDGE-CLI-COVERAGE.md` §L3.c) gave each catalog-completeness gap a *QUICK* disposition. The operator wants **MAX DEPTH** — every gap repo deep-dived via **primary source** (the actual repository tree + load-bearing files, not README marketing), and its quick disposition either **confirmed** or **revised** with hard evidence.
>
> **This document covers 4 gap repos** — `evidentlyai/evidently` (ML/LLM eval+monitoring), `langwatch/langwatch` (LLM observability + agent testing), `evilmartians/agent-prism` (agent-trace UI library), `QwenLM/qwen-code` (Alibaba peer coding CLI, a gemini-cli fork).
>
> **Method.** repomix remote-clone packing failed in this sandbox (0-file output — network-isolated clone). Primary-source verification was therefore done via **GitHub MCP direct file/tree reads** — repo root trees, `LICENSE`/`LICENSE.md`, `pyproject.toml`/`package.json`, `README.md`, `.mcp.json`, `SKILL.mdx`, `.claude/` + `.qwen/` directory listings, and `list_commits` for maintenance velocity. Every claim below is anchored to a file actually read in the repository tree at the SHA noted.
>
> **Date.** 2026-05-17. **Authority.** W259-v16 MAX-DEPTH gap-resolution agent (EVAL/CLI cluster). **Cite-class.** `effective_tier=TIER-3-LOCAL-COMPOSITION`; repo metadata (stars/license/push-date/tree-contents) is TIER-2 (GitHub API live, 2026-05-17).
>
> **Runtime-fit frame.** Windows 11 Z:-portable single-operator Claude Code runtime. Eval/observability is **already LIVE** — `inspect_ai` + `promptfoo` (in `harness/eval_harness.py`) + `Phoenix` (T0-INSTALLED incumbent obs). The L3 peer-CLI incumbent is the **OpenAI Codex CLI** (the installed cross-model reviewer, Path P); `gemini-cli` is catalogued **T4 WATCH**. A new eval/observability/CLI repo earns **INSTALL-NOW only if it fills a real hole** the live stack does not.

---

## §0 — Headline verdict (4 repos)

| Repo | W259-v16 QUICK disposition | MAX-DEPTH resolution | Changed? |
|---|---|---|---|
| `evidentlyai/evidently` | "GAP (minor) — ADD as named LAYER-C candidate" | **CONFIRMED — CITE-PATTERN / named LAYER-C candidate.** Real 7.5k★ Apache-2.0 ML+LLM eval lib, but **no native-CC pathway** (plain `pip` lib + a `typer` CLI); duplicates DeepEval-on-metrics + Phoenix-on-obs. Not an install. | NO |
| `langwatch/langwatch` | "GAP (minor) — note in LAYER-C … MIT core (+EE dir)" | **REVISED on two hard facts.** (1) **License is NOT MIT — it is Business Source License 1.1** (BSL-1.1, non-production-use-only until a 2099 Change Date). (2) Native-CC pathway is **stronger** than the audit said — it ships a published `@langwatch/mcp-server` (explicit `claude mcp add` docs), a `.claude/skills/` dir, and a CC-compatible `skills/scenarios/SKILL.mdx`. Net resolution: **STUDY-PILOT the MCP server only** (the MCP server is genuinely useful + the `scenarios` skill is independently MIT); **the platform itself is REJECT-FOR-FIT** (BSL-1.1 + duplicates Phoenix). | **YES** — license correction + pathway upgrade |
| `evilmartians/agent-prism` | "MARGINAL GAP — note only … not an install candidate" | **CONFIRMED, hardened to WATCH/REJECT-FOR-FIT.** Verified: self-described **Alpha**, **last real commit 2026-02-21** (~3 months stale), **no npm-installable UI package** (install = `npx degit` copy-paste of source), no CC pathway. Strong-org (Evil Martians) is the only positive. Not an install. | NO (hardened) |
| `QwenLM/qwen-code` | "GAP-LOW … add T4 WATCH row, do not pilot, do not install" | **CONFIRMED — T4 WATCH, do not install.** Deep-dive *confirms* it is a gemini-cli fork ("parser-level adaptations for Qwen-Coder", verified in README Acknowledgments) — BUT it is materially more capable than the audit implied (24.4k★, native Skills+SubAgents+Commands, TS/Python/Java SDKs, ACP daemon, Windows installer). Still **Terminal-Bench 37.5%** (own README) vs Codex CLI 82%, and adds no cross-model-review capability Codex does not already provide. Disposition stands. | NO (disposition); metadata corrected |

**Net: 0 INSTALL-NOW surprises.** One disposition materially **revised** (`langwatch` — BSL-1.1 license correction is the load-bearing finding; the platform is a *firmer reject* than "minor gap", while its MCP server is a *better pilot candidate* than the audit saw). The other three QUICK dispositions are **confirmed by primary source**; `agent-prism` is hardened (stale + no installable package).

---

## §1 — `evidentlyai/evidently`

### §1.1 Source-verified metadata

| Field | Value (primary source) |
|---|---|
| Stars / forks | 7,498 ★ / 847 forks (GitHub API, 2026-05-17) |
| License | **Apache-2.0** — verified from `/LICENSE` (full Apache 2.0 text, "Copyright 2021-2023 Evidently AI, Inc.") and `pyproject.toml` `license = {text = "Apache License 2.0"}`. The audit's "Apache-2.0" is **correct**. |
| Org | Evidently AI, Inc. — established ML-monitoring company, repo created **2020-11-25** (a genuine 5+ year org, not a 2025 startup). |
| Maintenance | Last commit **2026-05-02** on `main` (`a4aa4c2`). `list_commits` shows steady multi-contributor flow (security hardening of CI, NumPy-2.4 compat fixes, examples refresh). Healthy, not hyper-active. |
| Language / packaging | Python (`requires-python = ">=3.10"`, supports 3.10-3.13). `hatchling` build. PyPI package `evidently`; conda-forge available. |
| Windows-compat | Pure-Python; `classifiers` declare "Operating System :: OS Independent". `litestar` + `uvicorn` UI server is cross-platform. **Windows-compatible** (no Windows-specific CI lane, but no POSIX-only deps in the core `dependencies` block). |

### §1.2 Source-verified capabilities (from `README.md` + `pyproject.toml`)

- **What it actually is**: an open-source **Python library** to "evaluate, test, and monitor ML and LLM systems — from experiments to production". Two primitives: **Reports** (compute/summarise data+ML+LLM quality metrics) and **Test Suites** (Reports + pass/fail conditions — for CI/CD/regression).
- **Metric breadth**: README claims "100+ built-in metrics". `pyproject.toml` `[project.optional-dependencies].llm` pulls `openai`, `transformers[torch]`, `sentence-transformers`, `litellm`, `llama-index`, `faiss-cpu` — so LLM-as-judge, semantic similarity, RAG-retrieval-relevance evals are real, not vapor.
- **Eval surface**: text descriptors (length, sentiment, toxicity, regex), LLM-output evals (semantic similarity, retrieval relevance, summarization quality, LLM-judge), data drift (20+ statistical tests), classification/regression/ranking/recommendation metrics.
- **Monitoring UI**: a self-hostable dashboard (`evidently ui` — served by `litestar`/`uvicorn`) OR Evidently Cloud (the commercial tier).

### §1.3 Native-CC pathway — verified from the tree

**None.** The repo root tree was read in full: there is **no `plugin.json`, no `.mcp.json`, no `.claude/` directory, no `SKILL.md`**. The only CLI surface is `pyproject.toml` `[project.scripts] evidently = "evidently.cli:app"` — a `typer`-based human CLI for launching the UI, not an agent-callable interface. Integration is library-level (`from evidently import Report`) or via the standalone monitoring service. A Claude-orchestrated runtime would invoke it as a plain Python dependency.

### §1.4 Duplication vs the installed stack

- **vs `inspect_ai` / `promptfoo`** (the installed eval lanes): Evidently's *eval* surface (LLM-judge, pass/fail Test Suites) overlaps the installed eval harness — but Evidently's distinctive strength is **data-drift / tabular-ML monitoring** (20+ statistical drift tests), which `inspect_ai`/`promptfoo` do **not** cover. That is a genuinely different use-class — but it is an *ML-monitoring* use-class this LLM-orchestration runtime does not have.
- **vs `Phoenix`** (T0-INSTALLED obs): Evidently's monitoring UI overlaps Phoenix on the "metrics over time" axis (D20-overlap), with Phoenix being the LLM-trace-native incumbent.
- **vs `DeepEval`** (catalogued T2): direct overlap on the LLM-eval-metrics axis.

### §1.5 DEFINITIVE resolution — `evidently`

> **CONFIRMED — CITE-PATTERN / named LAYER-C candidate. NOT an install.** The W259-v16 QUICK disposition ("GAP (minor) — ADD as named LAYER-C candidate") is **correct and confirmed by primary source**. Evidently is a real, mature (5-yr org), Apache-2.0, Windows-compatible SOTA-adjacent tool that the catalog legitimately should *name* — but it has **no native-CC pathway** (plain library + a human `typer` CLI), and its capabilities are met by the installed stack: LLM-eval by `inspect_ai`/`promptfoo`/`DeepEval`, obs by `Phoenix`. Its one non-duplicative strength — tabular-ML data-drift monitoring — is an ML-Ops use-class outside this LLM-orchestration runtime's scope. **Resolution: record as a LAYER-C named candidate with a CITE-PATTERN disposition (parity with `trulens`/`helm`/`mlflow` — real tools, cite-not-install). No install, no pilot.** Evidence basis: `/LICENSE`, `pyproject.toml`, `README.md`, root tree, `list_commits` — all read 2026-05-17.

---

## §2 — `langwatch/langwatch`  ← disposition REVISED

### §2.1 Source-verified metadata — **two corrections to the audit**

| Field | Value (primary source) | vs W259-v16 audit |
|---|---|---|
| Stars / forks | 3,257 ★ / 320 forks (2026-05-17) | audit said 3.3k — ✅ correct |
| **License** | **Business Source License 1.1 (BSL-1.1)** — verified from `/LICENSE.md`: *"The Business Source License (this document …) is **not an Open Source license**"*. Licensor **Reasoning Engine B.V.**; **Additional Use Grant: None**; **Change Date: 2099-12-31**; Change License: Apache-2.0. GitHub API reports the license as `NOASSERTION` (a third corroboration it is not a standard OSI license). | ❌ **audit WRONG** — audit said "MIT core (+EE dir)" / "MIT (8/10)". It is **BSL-1.1**: non-production use is permitted, **production use requires a commercial license** until 2099. This is the load-bearing correction. |
| Org | Reasoning Engine B.V. (trading as LangWatch) — a funded startup; repo created 2023-09-09. | audit said "funded startup" — ✅ correct |
| Maintenance | Last commit **2026-05-16** (`5ecc9e0`) — pushed *today-minus-one*. PR numbers in the #4000s. **Very active.** | ✅ correct |
| Language / packaging | Polyglot monorepo: TypeScript (Next.js app), a **Go** AI-gateway service (`sdk-go/`, `services/gateway/`), a Python NLP service (`langwatch_nlp/`), Python + TS + Go SDKs. | — |
| Windows-compat | Self-host path is **Docker Compose / Kubernetes-Helm** (`compose.yml`, `charts/`) — runs on Windows via Docker Desktop. The `npx @langwatch/server` local-dev path installs `uv`+`postgres`+`redis`+`clickhouse` into `~/.langwatch/` — Node-driven, nominally cross-platform but heavy. **Practically: Docker-on-Windows, like the runtime's existing FalkorDB.** |

### §2.2 Source-verified capabilities (from `README.md` + `FEATURE_MAP.md` tree)

LangWatch self-describes as "the platform for LLM evaluations and AI agent testing". Verified subsystems from the repo tree:
- **Agent simulations / scenario testing** — `skills/scenarios/`, the `@langwatch/scenario` SDK (user-simulator + judge + multi-turn + adversarial red-team).
- **Eval + observability + prompts in one loop** — trace → dataset → evaluate → optimize-prompts → re-test. `langevals/` is the evaluator library; `langwatch_nlp/` the NLP/DSPy service.
- **OpenTelemetry/OTLP-native** tracing (the obs layer).
- **AI Gateway** — an OpenAI/Anthropic-compatible proxy with virtual keys, budgets, guardrails, provider fallback, Anthropic `cache_control` passthrough. Ships as a separate **Go binary** (`services/gateway/`).
- **DSPy-native** prompt optimization (the `dspy` GitHub topic is on the repo; `langwatch_nlp` hosts it).

### §2.3 Native-CC pathway — verified from the tree → **stronger than the audit said**

The audit claimed "3 — OTel ingestion; Python/TS SDK; **no plugin/MCP**". Primary-source reading of the tree **contradicts this**:

1. **`@langwatch/mcp-server` — a real, published MCP server.** Verified from `/mcp-server/README.md` + `/mcp-server/package.json`. It is "an MCP server that gives AI coding agents access to LangWatch observability data, prompts, datasets, scenarios, evaluators, and documentation". The README gives **explicit Claude Code install instructions**: `claude mcp add langwatch -- npx -y @langwatch/mcp-server --apiKey …`. It exposes ~30 MCP tools: `search_traces`, `get_trace`, `get_analytics`, `discover_schema`, full prompt/dataset/scenario/evaluator CRUD, with a `digest` (AI-readable markdown) output mode. **This is a genuine native-CC pathway the audit missed.**
2. **`skills/scenarios/SKILL.mdx`** — a real Agent-Skill file with frontmatter `name: scenarios`, `description:`, `user-prompt:`, and `compatibility: Works with Claude Code and similar AI assistants`. Its own frontmatter declares **`license: MIT`** — i.e. the *skill content* is MIT even though the platform is BSL-1.1. It teaches an agent to write `@langwatch/scenario` simulation tests + red-team tests.
3. **`.claude/` directory** — the repo carries `.claude/skills/`, `.claude/settings.json`, `.claude/README.md` (LangWatch dogfoods Claude Code in its own dev). Note: the repo's root `.mcp.json` only wires Playwright (LangWatch's *own* dev tooling) — it is **not** a consumer-facing MCP manifest; the consumer-facing artifact is the published `@langwatch/mcp-server` npm package.

**Pathway re-score: 3 → 6.** A published, Claude-Code-documented MCP server + a CC-compatible skill is a materially better native-CC surface than "no plugin/MCP".

### §2.4 The BSL-1.1 problem — why the license correction is load-bearing

BSL-1.1 with **"Additional Use Grant: None"** means: you may copy/modify/run LangWatch for **non-production use only**; **any production use requires purchasing a commercial license** until the 2099-12-31 Change Date (after which each version converts to Apache-2.0 four years post-release). For a single-operator runtime "production" is arguable — but BSL-1.1 is **not an OSI-approved open-source license**, and the W259 catalog's disposition language elsewhere (e.g. `langchain-ai/langsmith` → "T3 REJECT-FOR-FIT, proprietary") treats non-OSS-self-host platforms as reject-for-fit. The audit's "minor gap, MIT core" framing **understated the adoption barrier**: this is closer to the `langsmith` reject-class than to a casual "note in LAYER-C". Self-hosting the *platform* is encumbered; only two pieces are cleanly usable — the `@langwatch/mcp-server` npm package and the MIT-licensed `scenarios` skill (both, being separately-published artifacts, would need their own license headers re-confirmed at install time, but the skill's frontmatter explicitly says MIT).

### §2.5 Duplication vs the installed stack

- **vs `Phoenix`** (T0-INSTALLED obs) — LangWatch's OTel tracing + obs dashboard is a **direct functional overlap**. The runtime already has its incumbent obs.
- **vs `inspect_ai`/`promptfoo`** — LangWatch's eval loop overlaps the installed eval lanes.
- **Non-duplicative bits**: the **agent-simulation / scenario red-teaming** surface (`@langwatch/scenario`) is a genuinely distinct capability (multi-turn user-simulated adversarial agent testing) the installed stack does not have — and the `scenarios` SKILL.mdx is the cleanly-MIT, cleanly-CC-native delivery of exactly that. The **AI Gateway** overlaps the catalog's router/proxy layer (LiteLLM-class).

### §2.6 DEFINITIVE resolution — `langwatch`

> **REVISED.** Split the verdict, because primary source splits the repo:
>
> - **The LangWatch platform itself → REJECT-FOR-FIT** (firmer than the audit's "minor gap"). Reason: **BSL-1.1, not MIT** — not an OSS license, production use commercially encumbered until 2099 — *and* it duplicates the T0-INSTALLED `Phoenix` on obs + the installed eval lanes. Same reject-class as the catalogued `langsmith` (proprietary, no clean self-host). The audit's "MIT core" premise was factually wrong; on the correct license the platform does not clear the bar.
> - **`@langwatch/mcp-server` (npm) + `skills/scenarios/SKILL.mdx` → STUDY-PILOT.** This is the *upgrade* half of the revision: the audit said "no plugin/MCP", but there **is** a published, Claude-Code-documented MCP server (~30 tools) and a CC-compatible, **MIT-licensed** skill for agent-simulation red-team testing. The MCP server is only useful if you run a LangWatch backend (which re-imports the BSL-1.1 problem) — so its pilot value is conditional. The **`scenarios` skill is the genuinely interesting artifact**: independently MIT, CC-native, and it teaches multi-turn adversarial agent-simulation testing, a capability the runtime's `inspect_ai`+`promptfoo`+`Phoenix` stack lacks. **Recommended action: catalog LangWatch-platform as T3 REJECT-FOR-FIT (BSL-1.1 + Phoenix-overlap); separately record `@langwatch/scenario` + its MIT `scenarios` skill as a STUDY-PILOT watch-line for the agent-simulation-testing gap.** No platform install. Evidence basis: `/LICENSE.md`, `/mcp-server/README.md`, `/mcp-server/package.json`, `/skills/scenarios/SKILL.mdx`, `/.claude/` tree, `/README.md`, root tree, `list_commits` — all read 2026-05-17.

---

## §3 — `evilmartians/agent-prism`

### §3.1 Source-verified metadata

| Field | Value (primary source) |
|---|---|
| Stars / forks | 344 ★ / 18 forks (2026-05-17) |
| License | **MIT** — verified from `/LICENSE` (1,253-byte standard MIT text). Audit's "MIT" is **correct**. |
| Org | **Evil Martians** — a well-known, reputable dev-tools/consultancy org (the audit's "strong org" signal is **legitimate**). |
| Maintenance | **This is the key finding.** Repo `pushed_at` shows 2026-04-14, but `list_commits` reveals the latest *real code* commit is **2026-02-21** (`dd8b685`, "Fix span auto-selecting on mobile"). The bulk of substantive commits cluster 2025-11 to 2026-02. **~3 months since the last real change** — the repo is **quiescent**, consistent with its own README banner: *"**⚠️ Alpha Release** — This library is under active development. APIs may change."* |
| Language / packaging | TypeScript monorepo (`pnpm` workspace). `packages/`: `ui`, `data`, `types`, `storybook`, `demo-app`, `saas`. |
| Windows-compat | N/A in any meaningful sense — it is browser React components; the dev tooling (Vite/Storybook/pnpm) is cross-platform. |

### §3.2 Source-verified capabilities (from `readme.md` + `packages/` tree)

- **What it actually is**: "an open source **library of React components** for visualizing traces from AI agents". It turns OpenTelemetry (and Langfuse-format) agent traces into a hierarchical timeline UI — `TraceViewer`, `TraceList`, `TreeView`, `DetailsView` components.
- **Data adapters**: `@evilmartians/agent-prism-data` ships `openTelemetrySpanAdapter` + `langfuseSpanAdapter` — converts raw OTLP / Langfuse documents into a normalized `TraceSpan` tree. Recognizes OpenTelemetry GenAI (`gen_ai.*`), OpenInference (`llm.*`, `retrieval.*`) semantic conventions.
- **Prerequisites**: React 19+, Tailwind CSS 3, TypeScript.

### §3.3 Native-CC pathway — verified from the tree

**None, and worse — not even cleanly installable.** Root tree read in full: no `plugin.json`, no `.mcp.json`, no `.claude/`, no `SKILL.md`. It is a frontend component library. Critically, per `readme.md` the **UI components are not published as an installable npm package** — installation is *"Copy the UI components to your project: `npx degit evilmartians/agent-prism/packages/ui/src/components …`"* — i.e. a **source-copy / shadcn-style vendoring** model. Only the `-data` and `-types` packages are npm-installable. There is **no runnable artifact** a CC runtime can consume; it is raw React source for a human-facing web app.

### §3.4 Duplication / fit

It is not in the same use-class as anything in the runtime — it is a **UI-component library**, not a harness primitive, eval tool, or CLI. A headless, single-operator, terminal Claude Code runtime has **no surface to mount React trace-viz components on**. The runtime's trace inspection is served by `Phoenix` (which has its own web UI). agent-prism would only matter if the operator were *building a custom web dashboard* — out of scope.

### §3.5 DEFINITIVE resolution — `agent-prism`

> **CONFIRMED and hardened — WATCH (strong-org signal only); effectively REJECT-FOR-FIT.** The W259-v16 QUICK disposition ("MARGINAL GAP — note only … not an install candidate") is **correct**; primary source *hardens* it. Three independently disqualifying facts: (1) **Alpha**, self-declared API-unstable; (2) **~3 months stale** (last real commit 2026-02-21) — momentum has stalled; (3) **no installable runnable artifact** — the UI is consumed by `npx degit` source-copy, and there is **no CC pathway** (no plugin/MCP/skill). The Evil Martians org pedigree is real and is the *sole* reason to keep a one-line WATCH note rather than a hard REJECT. **Resolution: keep as a LAYER-C one-line WATCH row ("Evil Martians; React agent-trace-viz components; Alpha + quiescent; no CC pathway — strong-org watch only"). Not an install, not a pilot, not a cite-pattern (nothing to cite for a terminal runtime).** Evidence basis: `/LICENSE`, `/readme.md`, `/packages` tree, root tree, `list_commits` — all read 2026-05-17.

---

## §4 — `QwenLM/qwen-code`

### §4.1 Source-verified metadata — audit metadata corrected

| Field | Value (primary source) | vs W259-v16 audit |
|---|---|---|
| Stars / forks | **24,429 ★** / 2,375 forks (2026-05-17) | audit listed stars as "TIER-1 (Alibaba/QwenLM)" without a number — **24.4k is a major repo**, out-starring most of the catalogued L3 field except opencode/gemini-cli/OpenHands. |
| License | **Apache-2.0** — verified from `/LICENSE` (full Apache-2.0 text, 11,361 bytes) + GitHub API `apache-2.0`. Audit's "Apache-2.0" is **correct**. |
| Org | **Alibaba / QwenLM** — a TIER-1-OFFICIAL model-lab org (the audit's "strong org" is correct). |
| Maintenance | Last commit **2026-05-17** (`ef29700`) — pushed *today*. 785 open issues, 2,375 forks. **Hyper-active.** |
| Language / packaging | TypeScript monorepo (`pnpm`). npm package `@qwen-code/qwen-code`. Node ≥ 22. |
| Windows-compat | **Yes, first-class.** README ships a dedicated **Windows installer** (`install-qwen.bat`, "Works in both Command Prompt and PowerShell") alongside the Linux/macOS script; also `npm install -g`. The runtime's existing peer-CLI (Codex) is also Windows-runnable, so no fit gap here. |
| Fork lineage | **CONFIRMED** — README "Acknowledgments": *"This project is based on [Google Gemini CLI]. … Our main contribution focuses on **parser-level adaptations** to better support Qwen-Coder models."* The audit's "fork of gemini-cli" is **verified from primary source**. |

### §4.2 Source-verified capabilities — richer than the audit implied

Primary-source reading of `README.md` + the `.qwen/` and `packages/` trees shows qwen-code is **substantially more than a "weaker gemini-cli fork"** — it has tracked Claude-Code-class features:

- **Native Skills + SubAgents + Commands** — the repo tree carries `.qwen/agents/`, `.qwen/skills/`, `.qwen/commands/`. README: "rich built-in tools (**Skills, SubAgents**) for a full agentic workflow and **a Claude Code-like experience**." This is a real agent architecture, not a thin Gemini wrapper.
- **5 usage modes** — interactive TUI; headless (`qwen -p` for CI); IDE integration (VS Code, Zed, JetBrains); **SDKs (TypeScript, Python, Java)**; **daemon mode** (`qwen serve` — exposes **ACP over HTTP+SSE** so multiple clients share one agent session).
- **Multi-protocol providers** — OpenAI- / Anthropic- / Gemini-compatible APIs, Alibaba Cloud Coding Plan, OpenRouter, Fireworks, local Ollama/vLLM. Configured via `~/.qwen/settings.json`.
- It even ships a `.qwen/skills/qwen-code-claw/SKILL.md` for being driven *as a coding agent by another agent* via `acpx`.

### §4.3 Native-CC pathway — verified from the tree

**None for Claude Code specifically.** No `plugin.json`, no `.mcp.json` consumer manifest, no `SKILL.md` *for CC*. qwen-code has its **own parallel agent ecosystem** (`.qwen/` dir = its analogue of `.claude/`) — it is a *competitor harness*, not a CC-extending primitive. It *can* be driven by another agent via its ACP daemon (`qwen serve`) + SDKs, the same way Codex CLI is driven as a subprocess — but that is a peer-CLI integration pattern, not a CC plugin/MCP/skill pathway.

### §4.4 The decisive metric — capability vs the incumbent

`README.md` → **Benchmark Results → Terminal-Bench**: `Qwen Code + Qwen3-Coder-480A35 = 37.5%`; `Qwen Code + Qwen3-Coder-30BA3B = 31.3%`. The catalogued incumbent **Codex CLI scores 82.0% on Terminal-Bench 2.0** (`KNOWLEDGE-CLI-COVERAGE.md` §L3.a row 1 / SCORECARD-C). qwen-code is **less than half** the incumbent's agentic-coding capability. The runtime's cross-model-review gate (Path P) is already satisfied by Codex CLI; adding a Qwen-model peer CLI provides multi-provider redundancy that — exactly as W259 already ruled for the parent `gemini-cli` (T4 WATCH, "multi-provider redundancy not load-bearing") — is **not load-bearing** for this runtime.

### §4.5 Duplication vs the installed stack

Direct overlap with **Codex CLI** (the installed peer/reviewer CLI) and with the catalogued **`gemini-cli`** (its own upstream, T4 WATCH). qwen-code adds a *Qwen-model* peer CLI — but cross-model consensus is already covered by Codex (a *different* model family from Claude), so a third CLI adds breadth without filling a hole.

### §4.6 DEFINITIVE resolution — `qwen-code`

> **CONFIRMED — T4 WATCH; do not pilot, do not install.** The W259-v16 QUICK disposition ("GAP-LOW … add one T4 WATCH catalog row … do not pilot, do not install") is **correct and confirmed by primary source** — though the audit *understated the repo's heft* (it is a 24.4k★, hyper-active, Apache-2.0, Windows-first-class, SDK-rich, ACP-daemon-capable CLI with a native Skills/SubAgents architecture — a serious project, not a toy). The disposition nonetheless **stands**, on two verified facts: (1) it is a **confirmed fork of the already-catalogued `gemini-cli`** ("parser-level adaptations for Qwen-Coder", README Acknowledgments) — cataloguing it at the same T4-WATCH tier as its upstream is consistent; (2) **Terminal-Bench 37.5%** vs the installed Codex CLI's **82.0%** — it adds no cross-model-review capability the incumbent does not already provide, and per W259's own `gemini-cli` ruling, multi-provider peer-CLI redundancy is not load-bearing for this runtime. It also has **no CC-native pathway** — it is a *competitor* agent harness (its own `.qwen/` ecosystem), not a CC primitive. **Resolution: add one T4 WATCH catalog row (gemini-cli parity — "Alibaba Qwen-tuned gemini-cli fork; 24.4k★; native Skills/SubAgents + ACP daemon + TS/Py/Java SDKs; Terminal-Bench 37.5% « Codex 82%; multi-provider redundancy not load-bearing; competitor harness, not a CC primitive"). No pilot, no install.** Evidence basis: `/LICENSE`, `/README.md`, `/.qwen/` tree, `/packages` tree, root tree, `list_commits` — all read 2026-05-17.

---

## §5 — Cross-repo synthesis

### §5.1 INSTALL-grade surprises

**None.** All four repos deep-dive to **non-install** verdicts. The single most consequential finding is a **license correction** (`langwatch` is **BSL-1.1, not MIT**), which moves the LangWatch *platform* from the audit's soft "minor gap" toward a firmer **REJECT-FOR-FIT** — i.e. the deep-dive made one verdict *more* negative, not less. The one mild *upside* surprise is that `langwatch` has a **better native-CC surface than the audit recorded** (a published `@langwatch/mcp-server` + an MIT `scenarios` skill) — but that surface is gated behind the BSL-1.1 backend, so it lands at STUDY-PILOT (watch-line), not INSTALL.

### §5.2 Why nothing installs — the consistent pattern

The runtime's L4 eval/observability layer is **already saturated by live incumbents** — `inspect_ai` + `promptfoo` + `Phoenix` all running. The L3 peer-CLI layer is **anchored by Codex CLI** (the installed cross-model reviewer). For a *new* repo to earn INSTALL-NOW it must fill a hole the live stack does not — and:
- `evidently` — duplicates DeepEval (metrics) + Phoenix (obs); its one unique strength (tabular-ML drift) is an out-of-scope ML-Ops use-class. No CC pathway.
- `langwatch` (platform) — duplicates Phoenix (obs) + the eval lanes; **BSL-1.1** caps it regardless.
- `agent-prism` — wrong use-class entirely (React UI components), Alpha + stale, not even installable as a package.
- `qwen-code` — duplicates Codex CLI + gemini-cli; 37.5% « 82% Terminal-Bench; a competitor harness, not a CC primitive.

### §5.3 Recommended catalog edits (non-blocking; this agent does NOT commit)

| Repo | Catalog action |
|---|---|
| `evidentlyai/evidently` | LAYER-C named candidate, **CITE-PATTERN** disposition (parity with `trulens`/`helm`). |
| `langwatch/langwatch` | **Correct the license** in `EVAL-OBSERVABILITY-COVERAGE.md` §b/§c: "MIT" → **"BSL-1.1 (Business Source License; non-OSS; Change Date 2099-12-31)"**. Disposition: platform → **T3 REJECT-FOR-FIT** (BSL-1.1 + Phoenix-overlap). Separately add a STUDY-PILOT watch-line for **`@langwatch/scenario` + its MIT `scenarios` SKILL.mdx** as the candidate for the agent-simulation-testing gap. |
| `evilmartians/agent-prism` | Keep as LAYER-C one-line **WATCH** (strong-org only); annotate "Alpha + quiescent since 2026-02; no installable package; no CC pathway". |
| `QwenLM/qwen-code` | Add the **T4 WATCH** row as the audit recommended; correct the metadata (24.4k★, native Skills/SubAgents, ACP daemon, SDKs) so a future wave does not re-surface it as under-characterized. |

---

**Artifact:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\08-coverage-audit-W259v16\deep-resolution\EVAL-2-CLI-DEEPDIVE.md`
**Cross-links:** `08-coverage-audit-W259v16/EVAL-OBSERVABILITY-COVERAGE.md` §c (the QUICK dispositions for evidently/langwatch/agent-prism) · `08-coverage-audit-W259v16/KNOWLEDGE-CLI-COVERAGE.md` §L3.c (the QUICK disposition for qwen-code) · `05-scoring/MASTER-SCORING-MATRIX-W259.md` §5 · `02-layer-deepdive/LAYER-C-evals-obs-serving-routers.md` · `02-layer-deepdive/LAYER-B-orchestration-multiagent-skills.md` §5.
**Sources:** All repo metadata, license text, tree contents, key files (`LICENSE`/`LICENSE.md`, `pyproject.toml`, `package.json`, `README.md`, `.mcp.json`, `mcp-server/README.md`, `skills/scenarios/SKILL.mdx`, `.claude/` + `.qwen/` directory listings) and commit history pulled live from GitHub via `mcp__github__*` on 2026-05-17. repomix remote-clone packing was attempted first but failed in this sandbox (0-file output — network-isolated clone); GitHub MCP direct reads were the primary-source substitute. W259 catalog dispositions imported as-is, not re-litigated. Cite-class `effective_tier=TIER-3-LOCAL-COMPOSITION`.

# R5 — Mystery Fresh-Find Deep-Dive (RETRY)

> **Research stream**: R5 (mystery fresh-2026 high-star finds) — RETRY after skeleton-only failure
> **Author**: Claude Opus 4.7 [1M] orchestrator subagent
> **Date**: 2026-05-22
> **Scope**: 6 mystery candidates verified at HEAD via gh API + deepwiki + exa
> **Discipline**: CR-6 verify-before-claim; skeleton-first incremental fill per W342-Z fix
> **Status**: IN PROGRESS — filling §1.1 → §1.6 → §2 → §3 → §4 → §5 sequentially with disk-save after each

---

## TL;DR (filled after §1)

| # | Repo | Stars | Verdict | Confidence | sca-v18 tier |
|---|---|---|---|---|---|
| 1 | HKUDS/CLI-Anything | 39.5k | [filled in §1.1] | — | — |
| 2 | open-multi-agent/open-multi-agent | 6.2k | [filled in §1.2] | — | — |
| 3 | espressif/esp-claw | 1.3k | [filled in §1.3] | — | — |
| 4 | microsoft/agent-governance-toolkit | 1.8k | [filled in §1.4] | — | — |
| 5 | rcortx/kiwiq | 1.0k | [filled in §1.5] | — | — |
| 6 | salesforce/agentscript | 233 | [filled in §1.6] | — | — |

---

## §1 Per-candidate deep-dive

### §1.1 HKUDS/CLI-Anything (39.5k★)

- **What it actually does** (verified via README `gh api repos/HKUDS/CLI-Anything/contents/README.md` 2026-05-22 + root-dir listing + `cli-anything-plugin/.claude-plugin/plugin.json` 216-byte manifest): It is a **mega-catalog of ~80 CLI wrappers** around GUI/desktop software (Blender, FreeCAD, GIMP, OBS, Krita, LibreOffice, Audacity, Inkscape, NotebookLM, Mermaid, Obsidian, KDEnlive, Calibre, Drawio, Godot, QGIS, Slay-the-Spire-II, etc.). The premise from the README headline: *"Today's Software Serves Humans. Tomorrow's Users will be Agents. CLI-Anything: Bridging the Gap Between AI Agents and the World's Software."* The mechanism: each subdirectory contains a generated CLI + skill manifest, exposed via a Claude-Code-compatible `.claude-plugin/plugin.json` (declares the plugin as "Build powerful, stateful CLI interfaces for any GUI application using the cli-anything harness methodology") and an `cli-anything-hub` pip-installable index (`pip install cli-anything-hub`). A `registry.json` (49 KB) + `public_registry.json` (15 KB) at root catalog the wrappers.
- **Is it an autonomous runtime?**: **NO** — deepwiki probe 2026-05-22 verdict: *"CLI-Anything primarily functions as a tool catalog and plugin-pack, enabling external agents to interact with various CLIs. It is not an autonomous-agent runtime with its own dispatch loop or LLM call orchestration. The architecture's main role is to provide a structured way for external agents to discover and utilize command-line interfaces."* The `CliAnything` class exposes `addCli` / `generatePlugins` / `run` — `run` "dispatches the call to the appropriate CLI" but does NOT loop / re-plan / call an LLM. It is a **tool-surface for external runtimes** (Claude Code, Codex, Cursor, OpenCode — note `opencode-commands/` and `codex-skill/` dirs in the tree).
- **Dispatch shape**: **CC plugin** (`.claude-plugin/plugin.json`) + **standalone CLIs** (~80 subdirectories each shipping a wrapper) + **OpenCode commands** + **Codex skill** + **Qoder plugin** (multi-IDE / multi-agent-runtime distribution). NOT REST / MCP / SDK.
- **Architecture depth**: Volume-driven research artifact. Quality varies per CLI (some are mature: blender/, freecad/, obs-studio/; some are exotic: slay_the_spire_ii/, eth2-quickstart/). The cross-cutting `cli-anything-plugin` core is a thin facade (216-byte manifest, lean class API). HKU Data Science Lab (one of the top universities in HK) ships it — credible academic source — but feel is "academic-momentum + community-contribution flywheel", NOT a production runtime.
- **Real users**: NONE VERIFIED. README cites Trendshift placement (badge for `repositories/22991`) but no named-production-org deployments. Repo emphasises CLI-Hub PR-driven contribution model — community-driven add-CLI flywheel, not enterprise-customer-attested.
- **Why so many stars in 2.5 months**: **Legitimate buzz + multi-IDE viral momentum + HKU brand lift**. Created 2026-03-08 → 39.5k★ by 2026-05-22 = ~530★/day average. Drivers: (a) "Agent-Native" thesis is hot in 2026; (b) catalog approach addresses real "how do agents drive Blender?" pain; (c) HKU Data Science has prior viral repos (LightRAG); (d) trendshift.io trending-list spillover; (e) multi-IDE plugin shape (Claude Code + Cursor + Codex + OpenCode + Qoder) hits 5+ agent communities simultaneously. NOT pure fork-tree-inflation — repo content is substantive.
- **License + maintainership**: Apache-2.0 (`LICENSE` 11357 B). README cites `cli-anything contributors` as plugin author. Active CONTRIBUTING.md + SECURITY.md + multi-language READMEs (CN/JA). No signed-commits verified at this depth; main-branch activity from contributor-pile-on.
- **SOTA-claim verifiability**: No benchmarks. No comparison-to-other-systems table. No peer-reviewed paper cited. The value-prop is *coverage breadth* of CLI wrappers, not algorithmic SOTA. Trendshift trending badge is a third-party signal but not benchmark.
- **Sca-v18 verdict**: **PATTERN-STUDY** (NOT INSTALL as autonomous runtime — wrong category). The CLI-wrapper-per-app pattern + `.claude-plugin` distribution model is worth studying as a TOOLBELT augmentation. Specific cherry-pick candidates: blender/, freecad/, obs-studio/, gimp/, libreoffice/ wrappers if/when operator needs to drive those apps from CC.
- **Confidence**: **HIGH** (gh API + deepwiki both confirm catalog-not-runtime; manifest is 216 bytes — leaves no room for hidden runtime).
- **Comparison to V1 top picks (OpenHands/Letta/Goose)**: **NOT COMPARABLE** — different layer. OpenHands/Letta/Goose are dispatch-loop runtimes with sandboxed exec + memory + LLM-orchestration; CLI-Anything is a TOOL CATALOG those runtimes (or CC) would CALL. The orchestrator pre-verified-existence claim ("contains `.claude-plugin` directory") is true but does NOT make it a CC runtime competitor — it's a CC plugin-pack. For the operator's "SOTA runtime" question, this entry is a category-error candidate: it's not in the running.

### §1.2 open-multi-agent/open-multi-agent (6.2k★)

- **What it actually does** (verified via README + repo tree + CLAUDE.md + package.json `gh api repos/open-multi-agent/open-multi-agent/contents/README.md` 2026-05-22): **TypeScript-native multi-agent orchestration framework** (`@open-multi-agent/core` on npm). Single pitch: *"From a goal to a task DAG, automatically."* Three runtime dependencies. API: `OpenMultiAgent` orchestrator class + `createTeam()` / `runTeam(team, goal)` / `runTasks()` / `runAgent()`. A "Coordinator" decomposes the goal into a task DAG at runtime, auto-parallelises independents, synthesises result. Optional explicit-pipeline mode via `runTasks()`; MapReduce fan-out via `AgentPool.runParallel()`. 10 built-in providers (Anthropic, OpenAI, Azure, Bedrock, Gemini, Grok, DeepSeek, MiniMax, Qiniu, Copilot) + OpenAI-compatible (Ollama, vLLM, LM Studio, OpenRouter, Groq) + Vercel AI SDK pluggable. 6 built-in tools (`bash`, `file_read/write/edit`, `grep`, `glob`), opt-in `delegate_to_agent`, custom tools via `defineTool() + Zod`, stdio MCP servers via `connectMCPTools()`. Streaming, Zod structured output with auto-retry, `onProgress`/`onTrace` observability, post-run HTML dashboard, pluggable shared memory (default in-process KV; Redis/Postgres/custom via `MemoryStore`).
- **Is it an autonomous runtime?**: **YES, partial.** It is a goal-to-DAG orchestrator with conversation-loop AgentRunner, tool dispatch, MCP server connection, retry/loop-detection, token-budget enforcement. NOT a standalone CLI tool (no `oma` command surface beyond the optional binary — see `docs/cli.md` mention); rather, it is an **embeddable orchestration library** for Node.js backends. Comparable to LangGraph JS or Mastra in the TS ecosystem.
- **Dispatch shape**: **TypeScript SDK + npm package** (`@open-multi-agent/core`) + optional **`oma` JSON-first binary** for shell/CI per `docs/cli.md`. No MCP-server surface, no REST. Library-shape — must be embedded in a host Node.js process.
- **Architecture depth**: Production-grade: dependency-graph TaskQueue with auto-unblock + cascade-failure, AgentPool with Semaphore, MessageBus, SharedMemory abstraction, multi-adapter LLM layer (AnthropicAdapter, OpenAIAdapter, AzureOpenAIAdapter, BedrockAdapter, etc.), ToolRegistry, AgentRunner with conversation loop, conversation-bound `maxTurns` + context strategies (`sliding-window`/`summarize`/`compact`/`custom`), per-tool output-cap, exponential-backoff retry, loop detection, hard token-budget caps. README "Production Checklist" is genuinely production-shape (not aspirational copy). CLAUDE.md exists (11 KB) — indicates the project itself is dogfooded with CC.
- **Real users**: **ONE verified production user** per README:`temodar-agent` (~60★) — WordPress security analysis platform by `Ali Sünbül (xeloxa)` using OMA built-in tools inside Docker — confirmed production. Two integrations: Engram (Git-for-AI-memory) + `@agentsonar/oma` (sidecar cycle/repetition detector). MiniMax provider partnership with 12%-off code (limited-time, until 2026-06-30). NOT yet enterprise-scale; the production-user count is "one named small repo + two ecosystem sidecars".
- **Why so many stars in 2.5 months**: 6.2k★ from 2026-03-31 launch → **~115★/day**. Drivers: (a) TS-native niche under-served vs Python's CrewAI/AutoGen dominance; (b) "three runtime deps" minimalism resonates; (c) goal-to-DAG framing is differentiated vs LangGraph JS's graph-first model; (d) MiniMax provider partnership amplifies in CN community; (e) Coordinator-auto-decomposition demo is impressive. Pattern feels organic-buzz, not promotional inflation. Contributor list (visible in README footer) is 25+ named contributors — diverse.
- **License + maintainership**: MIT (`LICENSE` 1086 B). Authoring entity is `open-multi-agent` GitHub org (not a recognised enterprise). Active CI badge (GitHub Actions `ci.yml`). Codecov coverage badge. v* npm package at `@open-multi-agent/core`. Migration note in README: deprecated `@jackchen_me/open-multi-agent` package implies a 2026-Q1 one-developer-prior origin, now scoped to org. NO verified signed-releases or SLSA-L3 provenance.
- **SOTA-claim verifiability**: No benchmarks vs LangGraph JS / Mastra / CrewAI in repo. Architecture diagram is real (in README) and matches behaviour-promise. Token usage numbers cited in example output (~12,847 output tokens) but no comparative claims.
- **Sca-v18 verdict**: **PATTERN-STUDY** for TS-runtime architecture; **MONITOR** for production-org adoption. NOT install in claude-sota-installed (this runtime is CC-centric, not Node.js-embedded). The goal-to-DAG Coordinator pattern is a strong reference for our orchestrator-driven dispatch (W269 mandate analogue).
- **Confidence**: **HIGH** for what it is (README + CLAUDE.md + provider list + 25+ contributor base verify shape); **MEDIUM** on long-term viability (one named production user, no enterprise customer-citation, dependency on continued contributor diversity).
- **Comparison to V1 top picks (OpenHands/Letta/Goose)**: Different category (TS embeddable library vs sandboxed-exec runtime). Closer to Letta in spirit (multi-agent + memory) but Letta is a server-runtime + REST + own UI; OMA is a library you embed. For CC-orchestrator augmentation, **does NOT compete with OpenHands** for SWE-bench-shape workloads. Pattern-study only.

### §1.3 espressif/esp-claw (1.3k★)
[pending — fill after §1.2]

### §1.4 microsoft/agent-governance-toolkit (1.8k★)
[pending — fill after §1.3]

### §1.5 rcortx/kiwiq (1.0k★)
[pending — fill after §1.4]

### §1.6 salesforce/agentscript (233★)
[pending — fill after §1.5]

---

## §2 Hype-curve detection
[populated after §1]

---

## §3 Hidden-gem detection
[populated after §1]

---

## §4 If any mystery candidate IS the SOTA
[populated after §1]

---

## §5 Citations
[populated incrementally]

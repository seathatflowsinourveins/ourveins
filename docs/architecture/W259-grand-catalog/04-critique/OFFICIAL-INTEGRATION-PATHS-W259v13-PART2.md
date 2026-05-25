# W259-v13 — OFFICIAL CLAUDE CODE INTEGRATION PATHS — PART 2 (upper layers)

> **Wave:** W259-v13 OFFICIAL-INTEGRATION-PATH AUDITOR — Part 2. **Date:** 2026-05-16.
> **Operator directive:** *"all the repos official docs guide, claude code integration official path, best practice, plugins, cli tools — what is next and what gaps need to be resolved."*
> **Working directory:** `Z:\claude-sota-installed\`
> **Output:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\04-critique\OFFICIAL-INTEGRATION-PATHS-W259v13-PART2.md`
>
> **Scope (Part 2):** L2.5 Knowledge/Structured-Output · L3 Peer CLI · L4 Eval · L4 Observability · L5 Scaffold · L6 Pattern-cite · L0.6-L0.9 (Identity / Fine-tune / Wiki / Meta-graph) · L8 Multi-MAX · L9 FM-catalog · Layer-C Serving.
> **Source repos:** top 2-4 ranked per layer from `05-scoring/MASTER-SCORING-MATRIX-W259.md` + `BENCHMARK-SCORECARD-{B,C,D}-W259v6.md` + `PER-LAYER-BENCHMARK-SCORECARD-W259v6.md` + `02-layer-deepdive/LAYER-{C,E,F}-*.md`.
> **Method:** each repo audited against its OWN official docs via `mcp__deepwiki__ask_question` ("does X have an official Claude Code integration + official install path") + master-matrix cross-reference. Runtime state cross-checked vs `.claude/plugins/installed_plugins.json` (40 plugin rows), `.claude/plugins/known_marketplaces.json` (17 marketplaces), `.mcp.json` (13 MCP servers), `tools/`, `harness/`.
> **Cite-class:** `effective_tier=TIER-3-LOCAL-COMPOSITION` per `Z:/claude-sota/.claude/rules/citation-discipline.md` rule #8.

---

## §0 — Method note + headline finding

The W259 catalog repeatedly classifies upper-layer repos as **"library install only — no native-CC pathway"** (D11 scored 7-8 for most L2.5 / L4 rows). **This Part-2 audit found that classification materially understates reality for 6 repos.** Live deepwiki probes of each repo's *own* documentation surfaced **official Claude Code integration paths the W259 master matrix does not record**:

| Repo | W259 catalog says | Repo's OWN official docs say | Verdict |
|---|---|---|---|
| `pydantic/pydantic-ai` | "library; CC-aware `.claude/`" | **Official CC skill** — `claude plugin marketplace add pydantic/skills` → `claude plugin install ai@pydantic-skills` | **catalog INCOMPLETE** |
| `promptfoo/promptfoo` | "T1 INSTALL — CLI red-team" | **Official CC integration**: `ClaudeAgentSdkProvider` (`anthropic:claude-code` alias) + portable `promptfoo-evals` Agent Skill + `promptfoo mcp` MCP server | **catalog INCOMPLETE** |
| `langfuse/langfuse` | "T1 INSTALL — obs; no MCP support" | **Official MCP server** — `claude mcp add` HTTP transport at `/api/public/mcp` | **catalog WRONG** (it explicitly said "no MCP support") |
| `comet-ml/opik` | "T2 — obs; overlaps Phoenix" | **Official `opik-mcp` npm MCP server** + official CC OTel-telemetry route + `make claude` rule-sync | **catalog INCOMPLETE** |
| `vllm-project/vllm` | "T2 — local serving" | **Official CC backend integration** via `ANTHROPIC_BASE_URL` env (vLLM-served model as CC backend) | **catalog INCOMPLETE** |
| `foambubble/foam` | "VSCode PKM; no runtime" | **Official `@foam/mcp` MCP server** — `npm i -g foam-cli` → `foam mcp` (read-only flag supported) | **catalog INCOMPLETE** |

These are corrections, not contradictions of the *install decisions* — but they change the **integration mechanism** the runtime should use (MCP-server / plugin-skill, not bare library). The per-layer tables below carry the corrected mechanism.

---

## §1 — L2.5 Knowledge / Structured-Output

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **pydantic/pydantic-ai** | `ai.pydantic.dev` | **Official CC skill** via the `pydantic/skills` marketplace — repo's own `docs/coding-agent-skills.md`: `claude plugin marketplace add pydantic/skills` then `claude plugin install ai@pydantic-skills`. Also acts as MCP **client**; uses CC-style JSON MCP config w/ env-expansion. | `pip/uv add "pydantic-ai-slim[anthropic]"` (lib); plugin via `claude plugin install ai@pydantic-skills` | **NO** — neither lib nor `pydantic/skills` marketplace present | Add `pydantic/skills` marketplace + install `ai@pydantic-skills` (skill gives CC up-to-date framework knowledge). Lib install only when a CC-built Python app needs it. |
| **567-labs/instructor** | `python.useinstructor.com` | **NO official CC plugin/skill/MCP.** Repo's `CLAUDE.md` is for *developing instructor itself*. Integration is Python-library-only: patches the Anthropic client to add `response_model`. | `pip install "instructor[anthropic]"` | **NO** | Pattern-cite / demand-gated. No CC-surface to install — only adopt as a library inside a CC-authored Python app. |
| **BoundaryML/baml** | `docs.boundaryml.com` | **NO official CC plugin.** VSCode extension + DSL build-step; works with cloud APIs incl. Anthropic. Off-CC asset format. | `npm`/`pip` per language; VSCode ext | **NO** | T2 study-pilot only (catalog correct). Build-step (D16) unjustified for solo Python runtime. No CC-native path to close. |
| **dottxt-ai/outlines** | `dottxt-ai.github.io/outlines` | **NO official CC path.** Constrained decoding needs model-weight logit access → unusable on Claude/GPT cloud APIs. | `pip install outlines` | **NO** | Pattern-cite ONLY (catalog T3 correct). No integration gap — there is nothing to integrate on a cloud-API runtime. |

**What's next (L2.5):** install the `pydantic/skills` marketplace + `ai@pydantic-skills` plugin — it is a genuine, official, low-cost CC skill the catalog missed; instructor/baml/outlines remain library/pattern-cite with no CC-surface gap.

---

## §2 — L3 Peer CLI

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **openai/codex** (Codex CLI) | `developers.openai.com/codex/cli` + repo `README.md` | **No plugin-marketplace CC integration from the codex repo itself** — BUT the **`openai/codex-plugin-cc` marketplace** (a separate OpenAI repo) IS the official CC↔Codex bridge (master-matrix row 55, composite 92). Separately, Codex CLI can run as an **MCP server**: `codex mcp-server` (other MCP clients use Codex as a tool). | `npm install -g @openai/codex` (or `brew install --cask codex`) | **YES** — `codex@openai-codex` plugin v1.0.4 installed (project+user scope); marketplace `openai-codex` → `openai/codex-plugin-cc` registered | None for the bridge. **Optional gap:** Codex-CLI-as-MCP-server (`codex mcp-server`) is NOT wired into `.mcp.json` — would let CC call Codex as a tool directly (alternative to Path P `codex exec`). |
| **anomalyco/opencode** | `opencode.ai/docs` | **NO official CC plugin** — opencode is a *standalone peer CLI*, not a CC extension. Pattern-cite only. | `npm i -g opencode-ai` / `curl -fsSL opencode.ai/install \| bash` | **NO** | Catalog **demoted T1→T2** (Terminal-Bench #53, not 160k★ capability). No CC-integration gap — it is a competing CLI. Pilot standalone only. |
| **AAIF/goose** (block/goose) | `block.github.io/goose` | **NO official CC plugin** — standalone agent CLI; can itself host MCP "extensions". Pattern-cite. | `pipx install goose-ai` / official installer script | **NO** | T2 staged-adopt (catalog correct). No CC-surface; goose is a peer, not an extension. |

**What's next (L3):** the peer-CLI layer is correctly served — `codex@openai-codex` is installed and is the official bridge. Only optional next step: evaluate wiring `codex mcp-server` into `.mcp.json` as a tool-call path beside the existing Path P `codex exec` foreground+tee.

---

## §3 — L4 Eval

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **UKGovernmentBEIS/inspect_ai** | `inspect.aisi.org.uk` | **Official CC integration** via `sandbox_agent_bridge()` — repo's `docs/agent-bridge.qmd` names Claude Code explicitly: the bridge runs a proxy at `http://localhost:13131`; the sandboxed CC agent targets that URL with model name `"inspect"`, so Inspect evaluates whatever model the harness pins. In-process variant `agent_bridge()` patches the `anthropic` client directly. | `pip install inspect-ai` (Anthropic supported OOTB; set `ANTHROPIC_API_KEY`) | **NO** | Install `inspect-ai` in `Z:/venvs/claude`; wire the `sandbox_agent_bridge()` path into an Agent-SDK eval harness (the W259-v9 harness is the natural host). #1-ranked L4-Eval — clean UK-AISI signals. |
| **promptfoo/promptfoo** | `promptfoo.dev/docs` | **Official CC integration — three mechanisms** (repo wiki §3.8): (1) `ClaudeAgentSdkProvider`, aliased `anthropic:claude-code`, evaluates CC agents incl. tool-use/FS/session; (2) portable **`promptfoo-evals` Agent Skill** (open Agent Skills standard — works in CC + Codex); (3) **`promptfoo mcp`** starts promptfoo as an MCP server exposing eval/red-team tools. | `npm install -g promptfoo` (provider needs `@anthropic-ai/claude-agent-sdk`) | **PARTIAL** — `harness/promptfooconfig.yaml` exists (config present); promptfoo binary itself not confirmed installed; no `promptfoo-evals` skill, no `promptfoo mcp` server wired | Install `promptfoo` globally; decide between the 3 official paths — `promptfoo-evals` skill is the lowest-cost CC-native option; `promptfoo mcp` if eval-as-tool is wanted. |
| **confident-ai/deepeval** | `deepeval.com/docs` | **No first-party CC plugin** in scope; pytest-native (slots into CI), 50+ metrics. | `pip install deepeval` | **NO** | T2 study-pilot (catalog correct). No CC-native surface — adopt only if application-metric breadth becomes load-bearing. |

**What's next (L4-Eval):** install `inspect-ai` + `promptfoo` and host them in the existing W259-v9 Agent-SDK harness; `inspect_ai`'s `sandbox_agent_bridge()` and promptfoo's `promptfoo-evals` skill are both genuine official CC paths. This is the highest-ROI Part-2 gap.

---

## §4 — L4 Observability

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **arize-ai/phoenix** | `arize.com/docs/phoenix` | **Official MCP server** — `@arizeai/phoenix-mcp` (already wired). OTel/OpenInference-native trace ingestion. | `npm`/`pip` Phoenix server; MCP via `@arizeai/phoenix-mcp` | **YES** — `.mcp.json` `phoenix` stdio server (`@arizeai/phoenix-mcp` → `http://127.0.0.1:16006`); backing Phoenix port OPEN | None — incumbent, correctly integrated. |
| **langfuse/langfuse** | `langfuse.com/docs` | **Official MCP server** (repo `web/src/pages/api/public/mcp/index.ts`): `claude mcp add` w/ `--transport http`, endpoint `http://localhost:3000/api/public/mcp`, BasicAuth via base64 project keys. Tools: `getPrompt`/`listPrompts`/`createTextPrompt`/`createChatPrompt`/`updatePromptLabels`. **W259 catalog claim "no MCP support" is WRONG.** | self-host: `git clone` + `docker compose up` (web on **:3000**, worker :3030, minio :9090/:9091, clickhouse :8123/:9000, redis :6379, postgres :5432) | **NO** | Catalog correction: Langfuse DOES have an official MCP server (prompt-management). Install gap stands — but **port :3000 conflict-check** before self-host; D20 duplication vs Phoenix means install only if a 2nd obs tool is justified. |
| **comet-ml/opik** | `comet.com/docs/opik` | **Official `opik-mcp` npm MCP server** (`npx -y opik-mcp --apiKey ...` or `--apiBaseUrl` for self-host) + **official CC OTel route** (`OTEL_EXPORTER_OTLP_ENDPOINT` → Opik) + `make claude` syncs AI-coding rules for CC. | `pip install opik`; self-host `git clone` + `./opik.sh` (Windows: `powershell -ExecutionPolicy ByPass -c ".\opik.ps1"`) | **NO** | Catalog incomplete (it said "no D11"). T2 study-pilot stands — overlaps Phoenix (D20). Pilot only if Phoenix proves insufficient. |
| **langchain-ai/langsmith** | `docs.smith.langchain.com` | Proprietary; OTel ingestion exists but LangChain-coupled; no self-host. | (SaaS only) | **NO** | **REJECT-FOR-FIT** (catalog correct, composite 66) — proprietary, prompt-retention/data-boundary risk. No gap to close — do not install. |

**What's next (L4-Obs):** Phoenix incumbent stays. The catalog's "Langfuse has no MCP support" line must be corrected — Langfuse ships an official prompt-management MCP server. Still, with Phoenix already wired, Langfuse/Opik are demand-gated (D20 overlap); install only if a second obs tool becomes load-bearing.

---

## §5 — L5 Scaffold

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **anthropics Managed Agents** (Claude Code scaffold) | `docs.anthropic.com/en/docs/claude-code` + Agent SDK docs | **IS the CC scaffold** — not an external integration; the canonical scaffold itself. Direct programmatic use = Agent SDK. | n/a (native); Agent SDK `pip install claude-agent-sdk` | **YES** (native CC) — Agent-SDK harness exists (`harness/eval_harness.py`) per W259-v9 | None — pattern is native. ToS-gated for any "managed" hosted variant; the scaffold design is already the runtime. |
| **SWE-agent / mini-SWE-agent** | `swe-agent.com` / `github.com/SWE-agent/mini-swe-agent` | **NO official CC plugin** — research scaffolds (Princeton/Stanford). mini-SWE-agent is the SWE-bench Pro *measuring harness*. Pattern-cite. | `pip install swe-agent` / `pip install mini-swe-agent` | **NO** | T1/T2 PATTERN-CITE (catalog correct). Cite the minimal-ReAct-loop architecture; no CC-surface to integrate. |
| **OpenHands** (All Hands AI) | `docs.all-hands.dev` | **NO official CC plugin** — standalone agent platform. WSL2-gated on Windows (D15=5). | docker / `pip install openhands-ai` | **NO** | T2 study-pilot, WSL2-gated (catalog correct). No CC-native path; competing scaffold. |
| **Live-SWE-agent** | `live-swe-agent.github.io` | **NO official CC path.** WSL2-gated; "79.2%" is contaminated SWE-bench Verified. | (research repo) | **NO** | **DOWNGRADED T3 PATTERN-CITE-ONLY** (catalog correct — Pro=45.8%, beaten by Kimi K2). Do not install; no gap. |

**What's next (L5):** the scaffold layer needs no external install — the Claude Code scaffold (Anthropic Managed Agents class) IS the runtime, and the W259-v9 Agent-SDK harness already exercises the programmatic path. SWE-agent family is pattern-cite only.

---

## §6 — L6 Pattern-cite

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **anthropics/claude-cookbooks** | `github.com/anthropics/claude-cookbooks` | **Official Anthropic recipe repo** — clone-for-reference; no plugin (it is content, not an extension). TIER-1-DIRECT Anthropic authority. | `git clone` (reference only) | **NO** (not cloned locally) | PATTERN-CITE (catalog correct). Optional: clone to `Z:/repos/deps/` for offline cite-verification. No runtime install. |
| **anthropics/claude-quickstarts** | `github.com/anthropics/claude-quickstarts` | **Official Anthropic quickstart repo** — autonomous-coding + computer-use best-practices. Pattern-clone. | `git clone` | **NO** | T1 PATTERN-CLONE (catalog correct). Clone for the autonomous-coding harness pattern; no install. |
| **github/spec-kit** | `github.com/github/spec-kit` | **Official GitHub SDD toolkit** — ships `speckit-*` slash-commands; the **`speckit-*` skills are already present in this runtime's skill list** (speckit-analyze/checklist/clarify/constitution/implement/plan/specify/tasks/taskstoissues). | `uvx --from git+https://github.com/github/spec-kit specify init` | **YES (effectively)** — `speckit-*` skill family available in the runtime skill set | None — SDD methodology already surfaced as skills. |
| **iannuttall/ralph** | `github.com/iannuttall/ralph` | **NO official CC plugin from ralph itself** — but the **`ralph-loop@claude-plugins-official` plugin IS installed** (autonomous-loop pattern, official marketplace). | n/a (pattern); `ralph-loop` plugin via `/plugin install` | **YES** — `ralph-loop@claude-plugins-official` v1.0.0 installed | None — the autonomous-coding-loop pattern is installed via the official `ralph-loop` plugin. |

**What's next (L6):** pattern-cite layer is well-covered — `ralph-loop` and `speckit-*` are installed as official plugins/skills. Only optional: clone `claude-cookbooks` + `claude-quickstarts` to `Z:/repos/deps/` for offline reference.

---

## §7 — L0.6-L0.9 — Identity / Fine-tune / Wiki / Meta-graph

These are GAP-layer primitives (per `LAYER-E` + `LAYER-F`). For a single-dev runtime most have **no official CC integration by design** — they are infrastructure, not CC extensions.

| Repo | Layer | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|---|
| **better-auth** | L0.6 Identity | `better-auth.com/docs` | **NO official CC path** — TS auth library for *your* app; CC OAuth is Anthropic-hosted. | `npm install better-auth` | **NO** | No CC-integration gap — adopt only when building a user-facing app. Multi-session plugin matches multi-MAX pattern but is app-side. |
| **openfga/openfga** | L0.6 Authz | `openfga.dev/docs` | **NO official CC path** — Zanzibar ReBAC engine; would gate per-tenant MCP allowlists only if a tool-gating layer is built. | `openfga.exe run` (single Win-native binary) | **NO** | Demand-gated. No CC-surface; relevant only for a hypothetical multi-tenant tool-gating layer. |
| **unslothai/unsloth** | L0.7 Fine-tune | `docs.unsloth.ai` | **Unsloth Studio lists "Claude Code" + "Codex" as integration docs** for its API inference endpoints, and `build_mcp_providers` supports stdio/sse/streamable_http MCP providers. Core fine-tuning lib has no CC plugin. | core: `pip install unsloth`; Studio (Windows-native): `irm https://unsloth.ai/install.ps1 \| iex` | **NO** | Fine-tune ops demand-gated (no local-model fine-tune need declared). Unsloth Studio's CC link is for serving tuned models, not a CC plugin. Adopt only if local fine-tuning becomes load-bearing. |
| **foambubble/foam** | L0.8 Wiki | `foambubble.github.io/foam` | **Official `@foam/mcp` MCP server** — `npm i -g foam-cli` then `foam mcp` (subcommand). Exposes knowledge-graph tools (list resources, workspace info, tags); `--read-only` flag suppresses write tools. **W259 catalog ("VSCode PKM, no runtime") is incomplete.** | `npm install -g foam-cli` (CLI+MCP); VSCode ext from Marketplace | **NO** | Catalog correction: Foam ships an official MCP server. Install gap: `foam mcp` could expose a CLAUDE.md-adjacent PKM to CC as MCP tools (read-only flag = safe). **License flag:** deepwiki reports MIT; GitHub-API metadata in `LAYER-F` reported `NOASSERTION` — **operator must verify the license before install** (cardinal-rule-1). |
| **getzep/graphiti** | L0.9 Meta-graph | `help.getzep.com/graphiti` | **Official MCP server** (`graphiti/mcp_server`) — already wired. Temporal KG. | `uv run` graphiti `mcp_server` | **YES** — `.mcp.json` `graphiti` stdio server (FalkorDB :16379 OPEN; **Ollama :11700 CLOSED** → ingest LLM calls fail until Ollama is up) | **Operational gap, not integration gap:** Graphiti MCP is wired but its backing Ollama LLM is down — ingest is non-functional until Ollama starts. |

**What's next (L0.6-L0.9):** identity/authz/fine-tune are demand-gated with no CC-surface gap. Two real items: (1) Foam ships an official MCP server the catalog missed — pilot `foam mcp --read-only` *after* verifying its license; (2) the installed Graphiti MCP needs its Ollama backend started to be functional.

---

## §8 — L8 Multi-MAX

**L8 "Multi-MAX" is an operator-runtime concept, not an external repo layer.** Per `07-final-synthesis/CC-DIMENSIONS-UNLEASHED-W259v7.md` §3 + §D9, "Multi-MAX" = the operator's multiple MAX subscriptions making **parallel sessions cheap**, and the relevant primitive is **native Claude Code background sessions** (`claude --bg "<task>"` + `claude agents`/`logs`/`attach`/`stop`) — the 4th parallel-execution mode beside subagents / agent-teams / git-worktrees.

| "Repo" | Official docs URL | Official CC integration path | Install | Installed here? | GAP |
|---|---|---|---|---|---|
| **Claude Code background sessions** | `code.claude.com/docs/en/headless` + `claude --bg` docs | **Native CC feature** — no install; `claude --bg`, `claude agents`, `claude logs`, `claude attach`, `claude stop`. | n/a (native) | **Available** (native CLI) — but W259v7 §D9 notes "**zero built artifacts**": the runtime never uses `claude --bg` as a first-class layer | **GAP (usage, not install):** background sessions are the best fit for independent long-runners (codex-review dispatch, nightly eval, PR-babysitting) on a multi-MAX fleet but are not yet operationalized. Adopt `claude --bg` as the 4th parallel mode. |
| **`mcp__ccusage__*`** (ccusage) | `github.com/ryoppippi/ccusage` | **Official MCP server** — tracks multi-account/MAX usage. | `@ccusage/mcp` | **YES** — `.mcp.json` `ccusage` stdio server | None — multi-MAX usage telemetry is wired. |

**What's next (L8):** no repo to install. Operationalize the native `claude --bg` background-session mode — W259v7 flags it as a high-ROI dormant dimension perfectly matched to the multi-MAX fleet.

---

## §9 — L9 FM-catalog

**L9 "FM-catalog" (failure-mode catalog) is an operator-runtime artifact, not an external repo layer.** Per `CC-DIMENSIONS-UNLEASHED-W259v7.md` §D14, the FM-catalog is the runtime's named-failure-mode corpus (`docs/verified-avoid.md`, `fm17-*`, `fm20-*` deep-dives); its "next step" is **automation tooling built on the Anthropic Agent SDK**.

| "Repo" | Official docs URL | Official CC integration path | Install | Installed here? | GAP |
|---|---|---|---|---|---|
| **anthropics/claude-agent-sdk-python** | `docs.anthropic.com/en/api/agent-sdk/python` | **Official Anthropic SDK** — the canonical programmatic CC harness path; the host for FM-catalog publication/cite-refresh tooling. | `pip install claude-agent-sdk` | **YES** — installed in `Z:/venvs/claude`; W259-v9 harness `harness/eval_harness.py` exists | **GAP (scope):** the Agent-SDK harness exists but only as one eval script. FM-catalog automation (catalog publication, cite-refresh bots, regression replay) is not yet built on it. |
| **`mcp__memory__*`** (memory MCP) | local sqlite_vec memory server | **Official MCP server** — stores FM-class recoveries, mistake-notes, named-failure-mode rows. | `memory.exe server` | **YES** — `.mcp.json` `memory` stdio server (sqlite_vec backend) | None — the FM-catalog persistence substrate is wired. |

**What's next (L9):** no repo to install. Extend the existing W259-v9 Agent-SDK harness to host FM-catalog automation (publication + cite-refresh) — clears multiple dormant Agent-SDK dimensions at once per W259v7 §D14.

---

## §10 — Layer-C Serving (T1 fallback for local models)

| Repo | Official docs URL | Official CC integration path (mechanism + cite) | Install best-practice cmd | Installed here? | GAP |
|---|---|---|---|---|---|
| **vllm-project/vllm** | `docs.vllm.ai` | **Official CC backend integration** — repo docs: serve a tool-capable model (`vllm serve ... --enable-auto-tool-choice --tool-call-parser ...`), then point CC at it via `ANTHROPIC_BASE_URL` / `ANTHROPIC_API_KEY` / `ANTHROPIC_DEFAULT_OPUS_MODEL` env. Experimental in-server MCP tool-calling via `VLLM_USE_EXPERIMENTAL_PARSER_CONTEXT=1` + `--tool-server demo`. | `uv pip install vllm --torch-backend=auto` (CUDA); docker `vllm/vllm-openai:latest`. **No native Windows — WSL2 required.** | **NO** | Catalog incomplete (it omitted the official `ANTHROPIC_BASE_URL` CC-backend path). T2 study-pilot stands; **WSL2-gated on Windows** (D15). Install only if a local-model serving need (DeepSeek/Qwen escape valve) becomes load-bearing. |
| **sgl-project/sglang** | `docs.sglang.ai` | **NO documented official CC plugin** — OpenAI-compatible server; same `ANTHROPIC_BASE_URL`-style pattern would apply but not first-party-documented for CC. | `pip install "sglang[all]"`; docker. WSL2 on Windows. | **NO** | T2 (catalog correct — InferenceMAX TTFT/disagg leader). WSL2-gated; demand-gated. |
| **NVIDIA/TensorRT-LLM** | `nvidia.github.io/TensorRT-LLM` | **NO official CC plugin** — NVIDIA inference engine; Triton/OpenAI-compatible serving. | `pip install tensorrt-llm`; NGC docker. Linux/WSL2. | **NO** | T2 study-pilot (catalog correct). WSL2-gated; demand-gated vs vLLM. |

**What's next (Layer-C):** serving is correctly demand-gated — no local-model serving need is declared, and all three are WSL2-gated on this Windows runtime. If a serving need arises, vLLM is the pick and its **official `ANTHROPIC_BASE_URL` CC-backend path** (which the catalog omitted) is the integration mechanism.

---

## §11 — Consolidated Part-2 GAP list

**A — Catalog corrections (repo official docs contradict / exceed the W259 catalog):**

1. **`langfuse/langfuse` — catalog WRONG.** Master matrix + Scorecard-D say "no MCP support"; Langfuse ships an **official prompt-management MCP server** (`/api/public/mcp`, HTTP transport). Correct the catalog text.
2. **`pydantic/pydantic-ai` — catalog INCOMPLETE.** Has an **official CC skill** (`claude plugin install ai@pydantic-skills` via `pydantic/skills` marketplace) — not "library only".
3. **`promptfoo/promptfoo` — catalog INCOMPLETE.** Has **three official CC paths** (`ClaudeAgentSdkProvider` / `promptfoo-evals` skill / `promptfoo mcp` server) — not "CLI red-team only".
4. **`comet-ml/opik` — catalog INCOMPLETE.** Has an **official `opik-mcp` MCP server** + official CC OTel route + `make claude` rule-sync.
5. **`vllm-project/vllm` — catalog INCOMPLETE.** Has an **official CC-backend integration** via `ANTHROPIC_BASE_URL`.
6. **`foambubble/foam` — catalog INCOMPLETE.** Ships an **official `@foam/mcp` MCP server** (`foam mcp`, `--read-only` flag) — not "VSCode PKM, no runtime".
7. **`foambubble/foam` — license ambiguity.** deepwiki says MIT; `LAYER-F` GitHub-API metadata says `NOASSERTION`. **Operator must resolve before any install** (cardinal-rule-1).

**B — Real install gaps (official CC path exists, not yet integrated):**

8. **L4-Eval (highest ROI):** install `inspect-ai` (`pip install inspect-ai`) + `promptfoo` (`npm i -g promptfoo`); wire `inspect_ai.sandbox_agent_bridge()` + the `promptfoo-evals` skill into the W259-v9 Agent-SDK harness.
9. **L2.5:** add the `pydantic/skills` marketplace + install `ai@pydantic-skills` (official, low-cost CC skill).
10. **L0.8 Wiki:** pilot `foam mcp --read-only` as a PKM MCP surface — *after* license verification.

**C — Operational gaps (integration present, not functional / not operationalized):**

11. **Graphiti MCP** is wired but its backing **Ollama (127.0.0.1:11700) is CLOSED** — ingest is non-functional until Ollama starts.
12. **L8 Multi-MAX:** native `claude --bg` background sessions are available but have **zero built artifacts** — operationalize as the 4th parallel-execution mode.
13. **L9 FM-catalog:** the Agent SDK is installed and one harness exists, but **FM-catalog automation** (publication, cite-refresh) is not yet built on it.

**D — No-gap (correctly served or correctly demand-gated):** L3 peer-CLI (`codex@openai-codex` installed = official bridge); L5 scaffold (CC scaffold is native); L6 pattern-cite (`ralph-loop` + `speckit-*` installed); Phoenix obs (incumbent, wired); identity/authz/fine-tune/serving (demand-gated, mostly WSL2-gated, no declared need).

**Where the W259 catalog's recommended install path contradicts a repo's official docs:** only one hard contradiction — **Langfuse** ("no MCP support" in Scorecard-D §B is false; an official MCP server exists). The other five (pydantic-ai, promptfoo, opik, vllm, foam) are *omissions* — the catalog's install decision is not wrong, but it records "library only / no D11" where the repo's own docs document a real CC-native path. No case was found where the catalog recommends an install command the repo's docs reject.

---

**Artifact path:** `Z:\claude-sota-installed\docs\architecture\W259-grand-catalog\04-critique\OFFICIAL-INTEGRATION-PATHS-W259v13-PART2.md`

**Sources:** per-repo official-docs probes via `mcp__deepwiki__ask_question` 2026-05-16 (pydantic-ai, inspect_ai, langfuse, instructor, promptfoo, opik, openai/codex, vllm, foam, openai-agents-python, unsloth). Runtime state from `Z:/claude-sota-installed/.claude/plugins/installed_plugins.json` + `known_marketplaces.json` + `.mcp.json` + `tools/` + `harness/`. W259 rankings from `05-scoring/MASTER-SCORING-MATRIX-W259.md` + `BENCHMARK-SCORECARD-{B,C,D}-W259v6.md` + `PER-LAYER-BENCHMARK-SCORECARD-W259v6.md` + `02-layer-deepdive/LAYER-{C,E,F}-*.md`.

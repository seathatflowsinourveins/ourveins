---
title: Per-Category Head-to-Head Comparison Matrices (v2 Deep Synthesis)
parent_doc: ULTIMATE_SOTA_RUNTIME_DESIGN.md
companion: COMPREHENSIVE_SCORING_MATRIX_v2.md
scope: 9 layers × head-to-head per category with win-over-alternates analysis
---

# Per-Category Head-to-Head Comparison v2

> Direct head-to-head matrices per category, showing **why each top pick wins over its closest competitor** and **which to install vs adapt-pattern vs reference**. Pairs with the COMPREHENSIVE_SCORING_MATRIX_v2.md (15-dim numbers) — this doc explains the WHY.

---

## §1 — Marketplaces head-to-head

| Axis | anthropics/claude-plugins-official | obra/superpowers-marketplace | addyosmani/agent-skills | wshobson/agents | davepoon/buildwithclaude |
|------|-----------------------------------|------------------------------|------------------------|------------------|--------------------------|
| **Stars** | n/a (internal) | 967 (mkt) + **192,855** (core) | 42,097 | 35,459 | 2,934 |
| **Authoring org** | Anthropic OFFICIAL | obra (Jesse Vincent) named-T2 | Addy Osmani T1 Google Chrome | wshobson named-T2 | davepoon community |
| **Curation discipline** | Anthropic-vetted submission | obra named-T2 curation + 4 plugins | named-T1 curated 23 skills | granular per-domain 80 plugins | community discovery hub |
| **Native CC path** | S-tier (canonical marketplace) | S-tier (`/plugin install superpowers@claude-plugins-official` works via OFFICIAL) | S-tier (own marketplace) | S-tier (own marketplace) | C-tier (discovery hub; cite-only) |
| **Convergence Axis-1** | 10 (Anthropic ground-truth) | 10 (8-harness integration) | 10 (Google Chrome team + 7-harness) | 9 (Anthropic CC + Gemini CLI Extension + Smithery) | 8 (multi-runtime hub) |
| **Wire** | 1 (implicit) | 1 (alt path) | 1 (`/plugin install agent-skills@addy-agent-skills`) | 1 (`/plugin marketplace add wshobson/agents`) | 5 (cite-only) |
| **Score** | **97** | 84 (for superpowers core) | **93** | **92** | 74 |
| **Verdict** | INSTALL (mandatory canonical) | INSTALL alt-path for superpowers | INSTALL | INSTALL granularly | REFERENCE |
| **WIN-OVER**: claude-plugins-official | n/a | Beats obra's alt path because OFFICIAL marketplace | n/a | n/a | n/a (different concern) |
| **WIN-OVER**: addyosmani | for engineering-LIFECYCLE workflow with anti-rationalization | beats obra for engineering process discipline | n/a | wshobson for breadth+granular | n/a |
| **WIN-OVER**: wshobson | for plugin BREADTH (80 plugins/185 agents/153 skills/16 multi-agent workflows) + Q2 2026 NEW (PluginEval + Agent Teams + Conductor) | beats obra for component-level granularity | beats addy for plugin breadth | n/a | n/a |
| **WIN-OVER**: obra | for METHODOLOGY DEPTH (TDD mandatory + 7-phase workflow) + 8-harness | n/a | beats addy for process-discipline depth + cross-harness | beats wshobson for methodology depth | n/a |

**Net recommendation**: co-install all 4 active marketplaces (anthropics + obra + addyosmani + wshobson). They are PROVIDER-COMPLEMENT (different concerns: canonical / methodology / engineering-lifecycle / breadth+orchestration), NOT duplicates.

---

## §2 — Memory MCPs head-to-head

| Axis | doobidoo/mcp-memory-service | getzep/graphiti | thedotmack/claude-mem | Gentleman-Programming/engram | DeusData/codebase-memory-mcp |
|------|----------------------------|------------------|---------------------|------------------------------|------------------------------|
| **Stars** | 1,843 | 25,800 | **75,999** | 3,529 | 2,357 |
| **Tier** | L1 capture + L2 vector (sqlite_vec) | L3 temporal-KG (FalkorDB) | Cross-session memory (ChromaDB + AI compression) | L1+L2 (SQLite + FTS5) | Code-intel KG (155 languages, sub-ms queries) |
| **License** | Apache-2.0 | Apache-2.0 | (verify Probe 6) | (verify) | (verify) |
| **Backing store** | sqlite_vec embedded | FalkorDB Docker | ChromaDB + SQLite | SQLite + FTS5 | persistent KG static-binary |
| **Native CC path** | S (MCP stdio) | S (MCP + Docker) | S (plugin + skill multi-runtime) | A (MCP + HTTP + CLI + TUI) | A (MCP static binary) |
| **Wire** | 2 (`pip install`) | 3 (pip + docker) | 2 (plugin install) | 2 | 2 (binary) |
| **Multi-runtime support** | Claude Code only | Claude Code | **Claude+Codex+Gemini+Hermes+Copilot+OpenCode+OpenClaw** | agent-agnostic Go | Claude+Codex+Cursor+Gemini+Windsurf+Aider+Kilocode+Opencode |
| **AI compression** | ✗ | ✗ | ✓ AI compression on capture | ✗ | ✗ |
| **Wave 2B verdict** | INSTALLED baseline | INSTALLED baseline | NOT AUDITED (Wave 3A queued) | NOT AUDITED | NOT AUDITED |
| **Score** | **86** | **88** | **89** | 78 | 80 |
| **Verdict** | ADOPT-NOW (L1+L2 baseline) | ADOPT-NOW (L3 baseline) | STUDY-PILOT-FAV (Wave 3A verify) | STUDY-PILOT-FAV | STUDY-PILOT-FAV |

**WIN-OVER analysis**:

- **doobidoo wins for L1+L2 baseline**: pip-installable, Apache-2.0, no cloud dep, named-author (Heinrich Krupp), already wired in claude-sota-installed Memory Stack
- **getzep/graphiti wins for L3 temporal-KG**: official Zep AI agent-memory derivative (zep is parent platform; graphiti is the canonical agent-derivative); Apache-2.0; FalkorDB backend
- **thedotmack/claude-mem wins for cross-runtime persistence**: 76k★ ecosystem leader (7-75x stars margin over competitors); supports 7 runtimes; AI compression layer; but Wave 2B did NOT audit (Wave 3A queued)
- **engram wins for ALT L1+L2**: agent-agnostic Go binary; SQLite+FTS5; multi-interface (MCP + HTTP + CLI + TUI) — alternative if doobidoo gaps surface
- **DeusData/codebase-memory-mcp wins for code-intel-shape**: 155 languages indexed; sub-ms queries; 99% fewer tokens claim — narrowly scoped to code-intel memory

**Memory Stack ARCHITECTURE recommendation**:
```
L1 capture: doobidoo (baseline; ADOPT-NOW)
L2 vector: embedded in doobidoo (sqlite_vec)  OR  upgrade to Qdrant if scale demands
L3 temporal-KG: getzep/graphiti + FalkorDB (baseline; ADOPT-NOW)
L4 cross-runtime: thedotmack/claude-mem (after Wave 3A Probe 4-6 PASS)
Optional code-intel L: DeusData/codebase-memory-mcp (if 155-language KG needed)
```

---

## §3 — Token optimization head-to-head

| Axis | rtk-ai/rtk | JuliusBrussee/caveman | mksglu/context-mode | chopratejas/headroom | yvgude/lean-ctx | LangChain deepagents pattern |
|------|-----------|----------------------|---------------------|---------------------|----------------|------------------------------|
| **Stars** | 48,553 | 60,743 | 14,826 | 1,759 | 1,669 | n/a (sub-module) |
| **Layer compressed** | CLI command output | Prompt-side rewrite | Tool-output sandbox | Tool outputs / logs / RAG chunks | Cross-runtime "Context OS" | Orchestrator-side arg-truncation |
| **Savings claim** | **60-90%** on dev commands | **65%** prompt rewrite | **98%** on tool outputs | 60-95% on outputs | 60-95% (99% cached reads) | pattern reference |
| **Mechanism** | Single Rust binary CLI proxy (process boundary) | Skill plugin (prompt rewrite at LLM call) | Plugin + MCP + hook + skill (sandboxes large outputs) | Library + proxy + MCP server | Rust binary + Shell Hook + MCP (49 tools / 10 read modes) | Pre-emptive arg truncation discipline |
| **Native CC path** | A (CLI; cargo install) | S (skill plugin via /plugin install) | S (plugin + MCP + hook + skill multi-path) | A (MCP server) | A (Rust + Shell Hook + MCP) | C (cite/discipline) |
| **Wire** | 2 (cargo install) | 1 (plugin install) | ❌ (license-blocked — ELv2) | 2 | 2 | n/a |
| **Composable with others** | ✓ (different layer from caveman) | ✓ (different from RTK) | ❌ REJECT — adapt-pattern only | ✓ (alt to context-mode shape) | ✓ (Shell Hook orthogonal) | ✓ (pattern) |
| **HARD-GATE risk** | NONE | NONE (Wave 3A VERIFIED auto-activates; --with-init for always-on) | LICENSE-KEY HARD-GATE (ELv2 enforcement) | NONE | NONE | NONE |
| **Convergence Axis-1** | 8 (rtk-ai + community) | 7 | 7 (15 platforms claim — but unreachable) | 6 | 6 | 10 (LangChain + Karpathy cite) |
| **Score** | **92** | **92** (Wave 3A VERIFIED) | **REJECT-FOR-FIT** (Wave 3A LICENSE: ELv2 non-permissive) | 80 | 80 | n/a (CITE) |
| **Verdict** | ADOPT-NOW | ADOPT-NOW | **REJECT** (ADAPT-PATTERN cite only) | STUDY-PILOT-FAV | STUDY-PILOT-FAV | ADAPT-PATTERN |

**Compose for stacked savings** (all layers different, no overlap):

```
Anthropic prompt-cache (60-90% reuse)                     ← runtime substrate
  × Anthropic /compact + autocompact 70% threshold          ← runtime decay
    × rtk-ai/rtk (60-90% CLI command outputs)               ← process-level
      × chopratejas/headroom (60-95% on tool outputs)       ← tool-boundary (REPLACED context-mode per Wave 3A REJECT)
        × yamadashy/repomix compress (70% tree-sitter)       ← code-pack
          × JuliusBrussee/caveman (65% prompt rewrite)       ← prompt-level
            ≈ ~95-99% cumulative on eligible context surfaces

NOTE: mksglu/context-mode REJECTED per Wave 3A LICENSE verify (ELv2 non-permissive);
      replaced by chopratejas/headroom (MIT) at the tool-boundary layer.
      Alternatively: yvgude/lean-ctx (MIT) for cross-runtime shell-hook integration.
```

**WIN-OVER analysis**:

- **rtk wins for CLI process boundary**: single binary, zero-deps, universal applicability across any CLI (works on git/test/grep/curl/etc.)
- **caveman wins for prompt-side**: 61k★ ecosystem leader at skill-level rewrite; complementary to RTK (different layer)
- **context-mode wins for tool-output**: 98% reduction on largest noise source (tool outputs); multi-path native CC (plugin+MCP+hook+skill all work)
- **headroom wins for library+proxy+MCP shape**: alternative to context-mode if you want library-API control
- **lean-ctx wins for cross-runtime**: shell-hook based; works on Cursor/Windsurf/Copilot too
- **deepagents pattern wins for orchestrator-side discipline**: pre-emptive arg truncation per pattern reference; not install

**The REJECT case**:

- microsoft/LLMLingua (stale 2025-10-28 + per-Edit anti-pattern under Anthropic prompt-cache): replaced by the 6-primitive composition above

---

## §4 — Code intelligence head-to-head

| Axis | oraios/serena | yamadashy/repomix | ast-grep/ast-grep | tree-sitter | safishamsi/graphify | zilliztech/claude-context |
|------|---------------|-------------------|-------------------|-------------|---------------------|---------------------------|
| **Stars** | 24,271 | active (18M dl/mo) | ~40k | substrate | 48,374 | currently disabled per FM-16 |
| **Mechanism** | LSP semantic retrieval + editing | Tree-sitter code pack + ~70% compression | AST search via tree-sitter patterns | Tree-sitter parser substrate | Code→KG via tree-sitter + Leiden | Milvus vector search over code |
| **Native CC path** | S (MCP stdio) | S (MCP + CLI + skill via `generate_skill`) | A (CLI; NOT phantom `@anthropic/mcp-ast-grep`) | substrate (transitive) | A (skill) | A (MCP + Milvus auth-gated) |
| **Wire** | 2 | 2 | 2 (CLI; cargo or npm) | substrate | 2 | 4 (Milvus + MILVUS_TOKEN) |
| **Score** | **92** | **94** | **86** | 84 | 85 | **62** (disabled) |
| **Verdict** | ADOPT-NOW | ADOPT-NOW | ADOPT-NOW (CLI only) | ADOPT-NOW substrate | STUDY-PILOT-FAV | STUDY-PILOT-NARROW |

**WIN-OVER**:
- **serena wins for semantic retrieval + editing**: LSP-class code understanding; symbol-tree navigation
- **repomix wins for code packing + compression**: 70% tree-sitter compression + Pack→Grep→Skill pipeline; 18M downloads/month + Warp endorsement
- **ast-grep wins for AST-pattern search**: complementary to serena (LSP) and repomix (pack); orthogonal layer; CLI install ONLY (NOT phantom MCP package per FM-09 n=5)
- **graphify wins for code→KG (RAG-shape)**: tree-sitter + Leiden clustering — useful when you want a KG view; STUDY-PILOT
- **claude-context (zilliztech)** is currently DISABLED in claude-sota — auth-gate (MILVUS_TOKEN); re-enable when scale demands Milvus vector search

**Install order**: 1. serena → 2. repomix → 3. ast-grep CLI → (optional) graphify + claude-context

---

## §5 — Orchestration runtime head-to-head

| Axis | cwc-long-running-agents | ralph-loop plugin | langchain-ai/langgraph | langchain-ai/deepagents | crewAIInc/crewAI | microsoft/autogen | ComposioHQ/agent-orchestrator |
|------|------------------------|-------------------|----------------------|------------------------|------------------|-------------------|------------------------------|
| **Authoring org** | Anthropic OFFICIAL | Anthropic OFFICIAL | LangChain | LangChain | CrewAI | Microsoft | Composio |
| **Mechanism** | 5 primitives (Default-FAIL contract + Fresh-context evaluator + PROGRESS.md handoff + Kill-switch + Steer-mid-run) | Anthropic-canonical ralph-loop primitive | State-graph orchestration | Sub-agent + ACP + TruncateArgsSettings | Crews + Flows | Multi-agent debate | DAG mission dispatch (macOS) |
| **Native CC path** | S (.claude/ primitives mount) | S (`/plugin install ralph-loop@claude-plugins-official`) | B (Python SDK) | B (Python+JS SDK + ACP) | C (Python SDK) | C (Python framework) | B (Composio SDK) |
| **Wire** | 2 (git clone + cp .claude/) | 1 | 3 | 3 | 4 | 4 | 3 |
| **CR-12 disposition** | CITE-CLASS-CANONICAL | CITE-CLASS-CANONICAL | STUDY-PILOT (ADAPT-PATTERN for state-graph) | STUDY-PILOT (ADAPT-PATTERN for arg-truncation + ACP) | DEFER (DUPLICATE-FUNCTIONALITY for CC scope) | DEFER (Microsoft framework; out-of-CC native scope) | STUDY-PILOT-FAV (macOS DAG dispatch) |
| **Score** | **94** | **91** | **80** | **78** | 74 | 76 | **76** |
| **Verdict** | ADOPT-NOW | ADOPT-NOW | STUDY-PILOT-FAV (ADAPT-PATTERN) | STUDY-PILOT-FAV (ADAPT-PATTERN) | DEFER | STUDY-PILOT-NARROW (ADAPT-PATTERN) | STUDY-PILOT-FAV |

**Architecture insight**: cwc + ralph-loop are NATIVE CC primitives (S-tier). All Python/JS orchestration frameworks are TIER-B/C — useful as PATTERN REFERENCES (langgraph state-graph / deepagents arg-truncation + ACP / autogen debate / mastra event-sourced workflow). DO NOT install crewAI / agno / smolagents for CC native scope — they DUPLICATE cwc + claude-agent-sdk functionality at a different abstraction layer.

---

## §6 — Cross-model gate / Eval head-to-head

| Axis | openai/codex CLI + codex-plugin-cc | promptfoo/promptfoo | UKGovernmentBEIS/inspect_ai | confident-ai/deepeval | anthropic-cookbook | openai/evals |
|------|-----------------------------------|---------------------|------------------------------|----------------------|--------------------|--------------|
| **Mechanism** | Cross-model T1-T7 gate substrate | LLM-as-judge eval + red-teaming + pentesting | Eval framework with 200+ pre-built evals | LLM Evaluation Framework | TIER-1 Anthropic recipes (evaluator_optimizer / Cost-Tier / sub-agents) | OpenAI-curated eval framework |
| **Authoring org** | OpenAI OFFICIAL | promptfoo (now OpenAI-owned MIT) | UK AISI / UK Gov | confident-ai | Anthropic OFFICIAL | OpenAI OFFICIAL |
| **Used by** | All Claude Code adversarial review per cardinal-rule-3 | OpenAI + Anthropic (named-T1 endorsement in README) | UK government AISI | community | TIER-1 reference | OpenAI |
| **Wire** | 2 (npm install -g codex + /plugin install codex@openai-codex) | 2 (npm install -g promptfoo) | 3 (pip install) | 3 (pip install) | n/a (cite-only) | 3 |
| **Score** | **94+92** | **88** | 78 | 76 | **84** (CITE-CLASS-CANONICAL) | 80 |
| **Verdict** | ADOPT-NOW | ADOPT-NOW | STUDY-PILOT-FAV | STUDY-PILOT-FAV | ADAPT-PATTERN | STUDY-PILOT-FAV |

**WIN-OVER**:
- **codex CLI + codex-plugin-cc wins for adversarial review GATE**: structurally locked-in topology per cardinal-rule-3 (Claude orchestrates / Codex audits) — Anthropic + CCBP + OpenAI 3-org Axis-1 PASS
- **promptfoo wins for LLM-as-judge primitive**: 21k★ + "Used by OpenAI and Anthropic" + red-team in same tool + MIT (OpenAI-acquired)
- **inspect_ai wins for pre-built evals**: 200+ evals; UK AISI / UK Gov backing strong T1 provenance
- **deepeval wins for "LLM Evaluation Framework"**: comprehensive eval-metric library
- **anthropic-cookbook wins for pattern reference**: evaluator_optimizer + sub-agents + Cost-Tier discipline — CITE-CLASS-CANONICAL

---

## §7 — Observability head-to-head (NEW v2 LAYER)

| Axis | langfuse/langfuse | mlflow/mlflow | comet-ml/opik | Arize-ai/phoenix | Helicone/helicone | pydantic/logfire | matt1398/claude-devtools |
|------|-------------------|---------------|---------------|------------------|-------------------|------------------|--------------------------|
| **Stars** | **27,283** | 25,957 | 19,307 | 9,694 | 5,673 | 4,248 | 3,389 |
| **Provenance** | YC W23 | open-source AI platform | Comet ML | Arize AI named-org | YC W23 | Pydantic-org | community CC-specific |
| **What it provides** | LLM obs + metrics + evals + prompt mgmt + playground + datasets (5 surfaces) | Full ML+LLM platform; team-scale | debug + evaluate + monitor LLM apps + RAG + agentic | AI obs + eval | One-line code monitor | AI obs for production LLM/agent systems | CC-specific session log UI + tool calls + token usage + subagents + context window |
| **Self-host** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ (cloud-preferred) | ✓ (Electron) |
| **OTel-native** | ✓ (integrates) | ✓ | ✓ | ✓ | n/a | ✓ (OTel) | n/a (CC hook-based) |
| **CC native path** | A (MCP+SDK+cloud) | A (Python) | A (CC plugin disabled per FM-16) | A (Python MCP) | A (one-line code) | A (Python; Pydantic-AI integration) | A (Electron desktop app) |
| **Score** | **86** | **84** | 80 | **80** | **78** | **80** | **82** |
| **Verdict** | ADOPT-NOW | STUDY-PILOT-FAV | STUDY-PILOT (re-enable CC plugin verify) | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-FAV (Pydantic ecosystem) | ADOPT-NOW (CC-specific UI) |

**WIN-OVER**:
- **langfuse wins for end-to-end LLM observability platform**: 5 surfaces (obs+metrics+evals+prompt-mgmt+playground+datasets); YC W23; OTel + LangChain + OpenAI SDK + LiteLLM 4-way integration
- **mlflow wins for ML+LLM team-scale platform**: 26k★; Apache Spark integration; well-established
- **opik wins for debug + agentic workflows**: 19k★; Comet ML org; CC plugin (currently disabled per FM-16) — re-enable when ready
- **phoenix wins for AI eval focus**: 10k★ + Arize AI named-org
- **helicone wins for one-line monitoring**: minimal install friction
- **logfire wins for Pydantic-AI ecosystem fit**: Pydantic-org; FastAPI/Pydantic-AI integration
- **matt1398/claude-devtools wins for CC-SPECIFIC UI**: 3.4k★; Electron desktop app showing session logs / tool calls / token usage / subagents / context window — the missing CC DevTools

**Install recommendation**:
- **Phase 4a mandatory**: langfuse 7.1 + promptfoo 7.3 + claude-devtools 7.19 + claude-code-hooks-multi-agent-observability 7.24
- **Phase 4b optional** (pick ONE for OTel stack): phoenix OR openllmetry OR logfire (based on existing stack alignment)

---

## §8 — LLM Routers head-to-head (NEW v2 LAYER)

| Axis | mnfst/manifest | katanemo/plano | tensorzero/tensorzero | router-for-me/CLIProxyAPI | LiteLLM | BlockRunAI/ClawRouter |
|------|---------------|----------------|----------------------|---------------------------|---------|----------------------|
| **Stars** | 6,496 | 6,480 | 11,372 | **32,826** | ~10k+ | 6,468 |
| **Layer** | LLM gateway + cost tracking | AI-native proxy + safety + observability + routing (4-in-1) | LLMOps platform (gateway + obs + eval + opt) | Wraps Gemini/Codex/CC as OpenAI-compat | OpenAI-format proxy 100+ LLMs | OpenClaw-focused router |
| **Savings claim** | 70% cost cut via smart routing | n/a (mixed-feature) | n/a | n/a (free CC API service) | n/a | n/a |
| **Wire** | 3 | 3 (Rust) | 3 | 3 (Go proxy) | 3 (Python) | 3 (TS) |
| **Score** | **78** | **76** | **78** | **82** | 76 | 74 |
| **Verdict** | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-NARROW (OpenClaw-focused) |

**WIN-OVER**:
- **manifest wins for smart cost routing**: 70% cost-cut claim + BYOK + cost tracking; single-purpose router
- **plano wins for AI-native multi-feature proxy**: combines router + safety + observability + LLM gateway in one Rust proxy
- **tensorzero wins for full LLMOps platform**: gateway + obs + eval + optimization (broader than just router)
- **CLIProxyAPI wins for "free CC/Codex/Gemini API service"**: wraps the CLIs as OpenAI-compatible API; high-stars (33k)
- **LiteLLM wins for OpenAI-format compatibility**: 100+ LLM providers in one proxy; widespread adoption

**Architectural decision**: LLM routers are NOT mandatory for the CC runtime — install ONLY if multi-provider cost optimization is needed or cross-provider fallback is required.

---

## §9 — CC Hooks + Safety head-to-head (NEW v2 DEPTH)

| Axis | kenryu42/claude-code-safety-net | diet103/claude-code-infrastructure-showcase | disler/claude-code-hooks-mastery | parcadei/Continuous-Claude-v3 | rohitg00/pro-workflow | CloudAI-X/claude-workflow-v2 |
|------|--------------------------------|-------------------------------------------|--------------------------------|------------------------------|----------------------|-----------------------------|
| **Stars** | 1,334 | 9,639 | 3,674 | 3,771 | 2,124 | 1,356 |
| **What it does** | Catches destructive git/filesystem commands before execute | Examples of CC infrastructure (skill auto-activation + hooks + agents) | Master CC hooks (tutorial + examples) | Context mgmt via hooks (ledgers + handoffs + MCP isolation) | Self-correcting memory + 17 skills + parallel worktrees + agent teams | Universal CC workflow plugin (agents+skills+hooks+commands) |
| **Native CC path** | A (hook + Codex/CC/OpenCode/Gemini support) | C (example reference) | C (tutorial reference) | A (hooks installed) | S (plugin) | S (plugin) |
| **Wire** | 2 (hook install) | 5 (cite/ADAPT-PATTERN) | 5 (cite/ADAPT-PATTERN) | 2 | 1 (plugin install) | 1 |
| **D14 security** | **10** (destructive command catcher — direct safety) | 8 (cite-pattern) | 7 (educational) | 7 | 7 | 7 |
| **Score** | **82** | **80** | 76 | **80** | **78** | **76** |
| **Verdict** | ADOPT-NOW | STUDY-PILOT-FAV (ADAPT-PATTERN) | STUDY-PILOT-FAV (ADAPT-PATTERN) | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-FAV |

**WIN-OVER**:
- **safety-net wins for OPERATIONAL SAFETY**: directly catches destructive commands at hook layer (PreToolUse Bash); cross-runtime (Claude/Codex/OpenCode/Gemini/Copilot CLI); ADOPT-NOW as defensive safety floor
- **infrastructure-showcase wins for COMPREHENSIVE PATTERN REFERENCE**: 9.6k★; well-organized examples of skill auto-activation + hooks + agents
- **hooks-mastery wins for HOOKS TUTORIAL**: educational; deep examples
- **Continuous-Claude-v3 wins for CONTEXT MGMT via hooks**: ledgers + handoffs + MCP isolation pattern
- **pro-workflow wins for SELF-CORRECTING MEMORY**: 17 battle-tested skills + agent teams + worktrees
- **claude-workflow-v2 wins for UNIVERSAL workflow plugin**: cross-runtime workflow primitive

---

## §10 — Workflow methodologies head-to-head

| Axis | obra/superpowers | bmad-code-org/BMAD-METHOD | github/spec-kit | eyaltoledano/claude-task-master | Wirasm/PRPs-agentic-eng | automazeio/ccpm | gsd-build/get-shit-done |
|------|------------------|---------------------------|------------------|--------------------------------|------------------------|------------------|-------------------------|
| **Stars** | **192,855** | ~10k+ | per baseline | per baseline | per baseline | per baseline | 62,471 |
| **Mechanism** | TDD + 7-phase mandatory workflow | Multi-day feature task graphs | Spec-driven dev GitHub-official | PRD-driven task master | PRP methodology | PM workflow | Meta-prompting + context-eng + spec-driven dev |
| **Wire** | 1 (plugin) | 3 | 3 (GH integration) | 3 | 3 | 3 | 2 |
| **Score** | **97** | **80** | 84 | **78** | 74 | 74 | **80** |
| **Verdict** | ADOPT-NOW | STUDY-PILOT-FAV | ADOPT-NOW (selective) | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-FAV | STUDY-PILOT-FAV |

**Install per project type**:
- **Default**: superpowers (any project)
- **Multi-day feature**: + BMAD-METHOD
- **Spec-driven dev**: + spec-kit + OpenSpec
- **PRD-driven**: + claude-task-master
- **Marketing-flavored meta-prompting**: + gsd-build

---

## §11 — Decision matrix: which repo solves which gap

| Operational gap in current claude-sota-installed | Solution layer | Top picks |
|-----------------------------------------------|---------------|-----------|
| **Methodology discipline** (TDD, 7-phase, anti-rationalization) | Layer 2 | superpowers + addy-osmani + wshobson granular |
| **Cross-session memory** (sessions lose context across boundaries) | Layer 4 | thedotmack/claude-mem (76k★; Wave 3A verify) |
| **L1+L2 baseline memory** | Layer 4 | doobidoo/mcp-memory-service (current) |
| **L3 temporal-KG memory** | Layer 4 | getzep/graphiti + FalkorDB (current) |
| **Token budget pressure** (long arcs hit 300-400k decay) | Layer 5 | 6-primitive token-eff stack |
| **Cross-model adversarial review** | Layer 3+8 | codex CLI + codex-plugin-cc + promptfoo |
| **Browser/web context** (CC can't see web pages) | Layer 5+10 | ChromeDevTools-MCP + playwright-MCP + crawl4ai |
| **Code intelligence** (semantic search vs grep) | Layer 6 | serena + repomix + ast-grep CLI |
| **SAST/security gates** | Layer 9 | semgrep MCP + gitleaks + trivy + codeql + safety-net |
| **Autonomous-loop workflow** | Layer 3 | Anthropic ralph-loop plugin + cwc primitives |
| **Multi-agent orchestration** | Layer 3 | wshobson agent-teams + Composio AO + Tutti |
| **Token cost telemetry** | Layer 5+7 | ccusage + tokencost |
| **LLM observability** (NEW v2) | Layer 7 | langfuse + matt1398/claude-devtools + disler hooks-observability |
| **LLM eval / red-team** (NEW v2) | Layer 7 | promptfoo + inspect_ai + garak |
| **LLM routing / cost optimization** (NEW v2) | Layer 8 | manifest + plano + LiteLLM |
| **Up-to-date framework docs in context** | Layer 5 | upstash/context7 |
| **Destructive command safety** (NEW v2) | Layer 9 | kenryu42/claude-code-safety-net |
| **Self-correcting memory across sessions** (NEW v2) | Layer 9 | rohitg00/pro-workflow + coleam00/claude-memory-compiler |

---

## §12 — INSTALL vs ADAPT-PATTERN vs REFERENCE summary

### INSTALL (binary on filesystem) — Top picks

```text
# Phase 1 Foundation (Wire 1-2)
anthropics/claude-plugins-official (canonical marketplace)
anthropics/skills
anthropics/cwc-long-running-agents (.claude/ primitives)
anthropics/claude-agent-sdk-python
openai/codex CLI + codex-plugin-cc
modelcontextprotocol/servers (filesystem+git+fetch+sequential-thinking)
github/github-mcp-server
modelcontextprotocol/python-sdk
modelcontextprotocol/inspector (dev-time)

# Phase 2 Methodology (Wire 1)
obra/superpowers via /plugin install
addyosmani/agent-skills via /plugin install
wshobson granular: python-development + agent-teams + comprehensive-review
ralph-loop@claude-plugins-official
agent-sdk-dev@claude-plugins-official

# Phase 3 MCP servers (Wire 2-3)
doobidoo/mcp-memory-service
getzep/graphiti + FalkorDB Docker
microsoft/playwright-mcp
ChromeDevTools/chrome-devtools-mcp
semgrep/semgrep MCP via /plugin install
oraios/serena
yamadashy/repomix
upstash/context7
[OPTIONAL after Wave 3A] thedotmack/claude-mem

# Phase 4 Token-eff + Observability (Wire 1-2)
rtk-ai/rtk
mksglu/context-mode
yamadashy/repomix compress
[OPTIONAL after Probe 5] JuliusBrussee/caveman
ryoppippi/ccusage
AgentOps-AI/tokencost
langfuse self-host or cloud
promptfoo
matt1398/claude-devtools
disler/claude-code-hooks-multi-agent-observability
kenryu42/claude-code-safety-net

# Phase 5 Optional + STUDY-PILOT (Wire 2-3)
ast-grep CLI (cargo install — NOT phantom MCP)
anthropics/claude-code-action (CI)
anthropics/claude-code-security-review (CI)
CLI substrate: rg/fd/jq/yq/gh/just/mise/uv/ruff/biome/delta/fzf/bat/eza
github/codeql-action (CI)
gitleaks + trivy + osv-scanner + zizmor (security)
```

### ADAPT-PATTERN (cite-only architectural idea)

```text
shanraisshan/claude-code-best-practice (methodology cite)
affaan-m/everything-claude-code (cherry-pick patterns)
garrytan/gstack (codex-companion Pattern-B mitigation)
gsd-build/get-shit-done (meta-prompting pattern)
anthropic-cookbook (Cost-Tier + sub-agents + evaluator_optimizer recipes)
langchain-ai/deepagents TruncateArgsSettings (pre-emptive arg-truncation)
langchain-ai/langgraph (state-graph orchestration reference)
microsoft/autogen (multi-agent debate pattern)
mastra-ai/mastra (event-sourced workflow + time-travel re-execution)
diet103/claude-code-infrastructure-showcase (CC infrastructure pattern)
ChrisWiles/claude-code-showcase (comprehensive CC examples)
disler/claude-code-hooks-mastery (hooks educational)
revfactory/harness (meta-skill that designs agent teams)
```

### REFERENCE (discovery aggregators — never install)

```text
hesreallyhim/awesome-claude-code (44k)
ComposioHQ/awesome-claude-skills (60k; CC-BY-NC-ND license)
VoltAgent/awesome-agent-skills (22k)
sickn33/antigravity-awesome-skills (38k)
VoltAgent/awesome-openclaw-skills (49k; cross-ecosystem)
davepoon/buildwithclaude (3k; multi-runtime hub)
rohitg00/awesome-claude-code-toolkit (curated toolkit)
asgeirtj/system_prompts_leaks (40k; verify ethical use)
github/awesome-copilot (cross-ecosystem)
ai-boost/awesome-harness-engineering
ComposioHQ/awesome-claude-plugins
```

### REJECT-FOR-FIT (do NOT install)

```text
microsoft/LLMLingua + LLMLingua-2 + LongLLMLingua (stale + anti-pattern)
volcengine/OpenViking (AGPLv3 STRUCTURAL)
topoteretes/cognee (DUPLICATE of graphiti L3)
getzep/zep (SUPERSEDED-BY-graphiti)
campfirein/cipher → byterover-cli (ELv2 + META-HARNESS + HARD-GATE)
supermemoryai/supermemory-mcp (DEPRECATED-BANNER v1)
mkreyman/mcp-memory-keeper (DUPLICATE of doobidoo)
ressl/mcp-firewall (AGPL + wrong category)
gifflet/graphiti-mcp-server (DUPLICATE of canonical getzep/graphiti)
stravu/crystal (deprecated Feb 2026)
@anthropic/mcp-ast-grep (PHANTOM npm package per FM-09 n=5)
Yeachan-Heo/oh-my-claudecode (META-HARNESS Cohort 1)
shinpr/claude-code-workflows (HARD-GATE iter-84)
microsoft/agent-framework + crewAIInc/crewAI + agno-agi/agno (DUPLICATE for CC native scope)
13 anonymous-zip-drop kits v53-v65 (Cohort 7 STRUCTURAL REJECT)
open-compress/claw-compactor (maintenance-mode cpd=0.72)
jia-gao/leanctx (LLMLingua-derivative; inherits anti-pattern)
```

---

## VERDICT

**Per-category head-to-head v2** delivers:
- **12 head-to-head category matrices** (Marketplaces / Memory / Token-opt / Code-intel / Orchestration / Cross-model / Observability NEW / LLM Routers NEW / Hooks NEW / Methodology / Decision-matrix / Install-vs-adapt-vs-reference)
- **Win-over-alternates analysis** per category showing why each top pick wins
- **CR-12 disposition** per repo (PROVIDER-COMPLEMENT vs DUPLICATE vs CITE-CLASS-CANONICAL etc.)
- **Decision matrix** mapping operational gap → solution layer → top picks
- **Install vs adapt-pattern vs reference** summary with concrete Phase 1-5 install plan

**Status**: AUTHORITATIVE-CANDIDATE pending Wave 3A source-code verification on 5 high-priority repos.

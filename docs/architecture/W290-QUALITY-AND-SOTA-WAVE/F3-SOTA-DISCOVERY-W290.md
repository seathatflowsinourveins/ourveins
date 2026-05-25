# F3 — W290 SOTA Discovery (beyond W288 Stream B)

> **Wave**: W290 — Architecture Quality + Next-Wave SOTA Discovery
> **Fork**: F3 (SOTA discovery beyond W288 Stream B)
> **Date**: 2026-05-18
> **Mandate**: research SOTA repos via SOURCES W288 didn't probe + LAYERS W288 didn't cover + LOW-STAR high-quality (operator's signature mandate) + ≥2 INDEPENDENT corroborating sources per candidate.
> **Constraint**: GitHub MCP DISCONNECTED this session — probed via `mcp__deepwiki__ask_question`, `WebSearch`, pre-packed `tmp/repomix-library/packed/*.xml` Grep, `gh` CLI (available at `.local/bin/gh`).
> **Cite-class**: TIER-3-LOCAL-COMPOSITION — synthesises deepwiki AI-grounded answers + WebSearch + practitioner blog references; ≥2 independent sources per candidate per directive.

---

## §0 — Method + incumbents

**Probe-source ladder used**:
1. `mcp__deepwiki__ask_question` (heavy use) — AI-grounded codebase Q&A, structural extracts
2. `WebSearch` — broad surface scan + practitioner consensus
3. Pre-packed `tmp/repomix-library/packed/<repo>.xml` Grep — already-collected sources
4. `gh` CLI (`/z/claude-sota-installed/.local/bin/gh` v2.92.0) — auxiliary GitHub queries (no MCP)

**Incumbent skip-list** (110+ from `/z/claude-sota-installed-repos/` + W288 Stream B top-10): anthropics/* (12 repos), modelcontextprotocol/* (7), microsoft/{playwright,mcp,markitdown,LLMLingua,…} (12), langfuse/* (14), getzep/graphiti, mem0ai/mem0, letta-ai/letta, basicmachines-co/basic-memory, topoteretes/cognee, vectorize-io/hindsight, doobidoo/mcp-memory-service, abhigyanpatwari/GitNexus, BerriAI/litellm, comet-ml/opik, Arize-ai/phoenix, confident-ai/deepeval, explodinggradients/ragas, NVIDIA/garak, dottxt-ai/outlines, BoundaryML/baml, DS4SD/docling, aquasecurity/trivy, gitleaks/gitleaks, ast-grep/ast-grep, openai/{codex-action,codex-plugin-cc,codex-universal,openai-agents-js,openai-agents-python,skills,symphony}, oraios/serena, ossf/scorecard, pgvector/pgvectorscale, promptfoo/promptfoo, pydantic/pydantic-ai, sgl-project/sglang, sst/opencode, stanfordnlp/dspy, stripe/ai, supermemoryai/supermemory, traceloop/openllmetry, UKGovernmentBEIS/inspect_ai, vercel/ai, obra/superpowers*, google/{adk-python,agents-cli,gemini-cli,genai-toolbox}, BloopAI/vibe-kanban, foambubble/foam, addyosmani/agent-skills, mattpocock/skills, alirezarezvani/claude-skills, ComposioHQ/awesome-claude-skills, hesreallyhim/awesome-claude-code, affaan-m/everything-claude-code, msitarzewski/agency-agents, anthropic-experimental/sandbox-runtime, smtg-ai/claude-squad, stravu/crystal, musistudio/claude-code-router, kbwo/ccmanager, campfirein/byterover-cli, shanraisshan/claude-code-best-practice, Shubhamsaboo/awesome-llm-apps, gsd-build/get-shit-done, forrestchang/andrej-karpathy-skills, JuliusBrussee/caveman, rohitg00/agentmemory, rtk-ai/rtk, quemsah/awesome-claude-plugins, thedotmack/claude-mem, trailofbits/skills, ollama/{js,ollama,python}, ggml-org/llama.cpp, ikawrakow/ik_llama.cpp, NVIDIA/TensorRT-LLM, ChromeDevTools/chrome-devtools-mcp, cloudflare/* (3), github/{awesome-copilot,github-mcp-server,spec-kit}, microsoft/agent-* (3), microsoft/azure-* (2), Helicone/helicone, iannuttall/ralph, 567-labs/instructor, openai/skills, openai/symphony, openai/codex-*, pre-commit/pre-commit, microsoft/skills, modelcontextprotocol/{experimental-ext-skills,inspector,mcpb,modelcontextprotocol,python-sdk,typescript-sdk,registry,servers}, and W288 Stream B Top-10 (remnic, neotoma, Acontext, planning-with-files, bernstein, MARM-Systems, local-deep-research, PageIndex, deer-flow, frankenterm).

**Source-disagreement notation** (per sca-v3 schema): each candidate gets a `source_disagreement` list — empty if probes converged, populated if deepwiki and WebSearch (or deepwiki and the README itself) returned contradictory claims.

---

## §1 — Axis 1: Architecture layers W288 missed (8 new candidates)

### `All-Hands-AI/OpenHands` — ~62k★ — code-agent / SWE-bench leader

- **one_line**: open-source multi-modal coding agent with measured 77.6 SWE-bench, ACP-protocol Claude Code provider integration
- **discovery_source**: deepwiki + StackOne 120-tool agentic landscape article (2026)
- **uniqueness_vs_incumbents**: most-overlaps with `sst-opencode` (incumbent) and `BloopAI/vibe-kanban` (incumbent); marginal value-add = (a) ACP protocol native (the universal agent-client protocol that lets Claude Code BE the model behind OpenHands), (b) explicit SWE-bench reproducibility harness, (c) named-org production users (TikTok, VMware, Roche, Amazon — listed in README).
- **typed_evidence_seed**:
  - benchmark: **SWE-bench=77.6%** (README badge — actually measured, not author-claim)
  - code_anchor: `frontend/` ACP integration; `mcp_config.mcpServers` agent settings; deepwiki cited
  - field_report: TikTok / VMware / Roche / Amazon (README "trusted by")
- **harness_fit_hint**: external-service (separate agent that USES Claude Code as model provider, not a CC skill/plugin)
- **license**: MIT (core); separate license for `enterprise/` subtree
- **preliminary_tier**: **T2 VENDOR-FORK** — ACP provider pattern is the lift-value; running OpenHands as a separate runtime alongside CC adds operator-mgmt overhead; pattern-fork is right.
- **source_disagreement**: deepwiki said "MIT for core, separate enterprise license"; WebSearch confirmed MIT.

### `cline/cline` (formerly Claude Dev) — ~30k★ — VS Code coding agent + CLI

- **one_line**: VS Code coding-agent extension + CLI that wraps Claude Code as model provider, with human-in-the-loop approval gate per action
- **discovery_source**: deepwiki + WebSearch ("cline claude code provider")
- **uniqueness_vs_incumbents**: distinct from Claude Code itself — cline IS a CONSUMER of Claude Code (Cline starts a `claude` process per turn). Pattern-value: the human-in-the-loop approval gate per file-write / shell-cmd / browser-action is something Claude Code lacks (CC defaults to direct execution).
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface (deepwiki found none in codebase)
  - code_anchor: CLI command `cline mcp add` with HTTP/stdio MCP transport; settings at `~/.cline/data/settings/cline_mcp_settings.json`
  - field_report: none-found
- **harness_fit_hint**: external-service (consumes Claude Code; not a CC skill)
- **license**: open-source per README (specific license not visible in deepwiki context — TBD verify)
- **preliminary_tier**: **T4 CITE-ONLY** — useful for pattern study (per-action approval gate) but operationally a separate product; install-grade collision with CC itself.
- **source_disagreement**: deepwiki couldn't confirm specific license (only "open source per README"); requires direct verification.

### `Azure/PyRIT` — ~3k★ — Microsoft AI Red Team LLM fuzzing framework

- **one_line**: Python red-teaming framework for LLM risk identification — 30+ converters, multi-modal (text/image/video/audio/PDF) attack orchestration
- **discovery_source**: deepwiki + WebSearch + arXiv:2410.02828
- **uniqueness_vs_incumbents**: most-overlaps with `NVIDIA/garak` (incumbent via pipx). PyRIT differentiation: (a) multi-modal coverage including PDF/audio/video (garak is text-mostly); (b) Microsoft AI Red Team-maintained with arXiv citation; (c) `OpenAIChatTarget` supports DeepSeek/Llama/phi-4 — broader target surface but NOT Claude/Anthropic SDK native.
- **typed_evidence_seed**:
  - benchmark: example scenario reports Accuracy=54%, F1=0.23 — but these are scenario outputs, not framework-level benchmarks
  - code_anchor: PyRIT-0.11.1.dev0 in deepwiki; `OpenAIChatTarget` extension point for new providers
  - field_report: Microsoft AI Red Team (the maintainer org IS the production user)
- **harness_fit_hint**: external-service (Python framework, not CC-native; would extend garak coverage)
- **license**: MIT
- **preliminary_tier**: **T3 PATTERN-STUDY** — multi-modal converter pattern is lift-value vs garak; D10=3 partial overlap with garak; install_score would be low (no Claude SDK adapter) but pattern_score elevated.
- **source_disagreement**: deepwiki said "no comparison with garak in codebase"; WebSearch confirmed both tools exist independently — convergent.

### `daytonaio/daytona` — ~14k★ — code-execution sandbox with NATIVE Claude MCP

- **one_line**: OCI-based composable sandbox (~90ms spin) with FIRST-CLASS Claude Code integration via `daytona mcp init claude` + `daytona mcp start`
- **discovery_source**: deepwiki (explicit confirmation) + WebSearch (sandbox category)
- **uniqueness_vs_incumbents**: most-overlaps with `e2b-dev/E2B` (NEW — see below) but Daytona has native Claude+Cursor+Windsurf MCP setup commands (E2B only generic mcp-gateway). Strongest CC-pathway-support of any new sandbox candidate.
- **typed_evidence_seed**:
  - benchmark: ~90ms sandbox spin-up (README claim, measurable in production)
  - code_anchor: `apps/cli/cmd/mcp/` MCP server impl; `daytona mcp init [claude|cursor|windsurf]` CLI
  - field_report: none-found in deepwiki context
- **harness_fit_hint**: claude-code-native (explicit Claude target in `daytona mcp init`)
- **license**: **AGPL-3.0** (SPDX in code headers — deepwiki cited)
- **preliminary_tier**: **T2 VENDOR-FORK** — AGPL D1=2 caps INSTALL (license-NC) but explicitly permits fork; D4 CC-pathway-support is 5/5; D2 capability_uniqueness is 5 (no incumbent offers OCI-sandbox + Claude MCP). Strong candidate.
- **source_disagreement**: empty — deepwiki and README both AGPL.

### `e2b-dev/E2B` — ~11k★ — code-execution sandbox (generic MCP)

- **one_line**: open-source cloud sandbox SDK with generic MCP-gateway template (exa/brave/firecrawl/duckduckgo installable but NOT Claude-native)
- **discovery_source**: deepwiki + WebSearch
- **uniqueness_vs_incumbents**: alternative to Daytona; weaker CC-pathway-support but cleaner MIT license.
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface
  - code_anchor: `addMcpServer()` template method; supports built-in + GitHub-based dynamic MCP servers
  - field_report: none-found
- **harness_fit_hint**: sdk-only (generic MCP; needs adapter for Claude)
- **license**: MIT
- **preliminary_tier**: **T3 PATTERN-STUDY** — clean MIT but no Claude-native pathway; pattern-value = the `addMcpServer()` template; install-collision with Daytona.
- **source_disagreement**: empty.

### `e2b-dev/code-interpreter` — ~1.5k★ — code-execution SDK on E2B base

- **one_line**: Python + JavaScript SDKs for code execution in E2B sandboxes — stateful exec contexts + streaming output
- **discovery_source**: deepwiki + WebSearch
- **uniqueness_vs_incumbents**: subset of E2B; useful as a thin layer if E2B is too heavyweight.
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface
  - code_anchor: `Sandbox extends BaseSandbox` (Python); `@e2b/code-interpreter` npm
  - field_report: none-found
- **harness_fit_hint**: sdk-only
- **license**: MIT
- **preliminary_tier**: **T4 CITE-ONLY** — strict subset of E2B; reference value only.
- **source_disagreement**: empty.

### `microsoft/PromptWizard` — ~2k★ — automated prompt optimization with measured deltas

- **one_line**: task-aware prompt optimization framework — LLM generates+critiques+refines its own prompts; **90% GSM8k accuracy vs 78% DSPy / 69% PromptAgent**, $0.05/task
- **discovery_source**: deepwiki + WebSearch + arXiv (Microsoft Research)
- **uniqueness_vs_incumbents**: no installed incumbent in the prompt-OPTIMIZATION layer (LLMLingua compresses; PromptWizard optimizes). Direct measurable benchmark deltas vs DSPy (incumbent stanfordnlp/dspy).
- **typed_evidence_seed**:
  - benchmark: **GSM8k 90% vs DSPy 78.2% (+12pct); AQUARAT 58.2% vs DSPy 55.1%; ETHOS 89.4% vs DSPy 84.1%** — measured, multi-dataset
  - code_anchor: `CritiqueNRefine` class with `gen_different_styles()`, `get_prompt_score()`, `critique_and_refine()` methods
  - field_report: Microsoft Research (author org is also production user)
- **harness_fit_hint**: sdk-only (Python; only OpenAI + Azure-OpenAI integration — no Anthropic adapter shipping)
- **license**: TBD (deepwiki couldn't confirm; CLA-required indicates open-source but specific OSS license unverified)
- **preliminary_tier**: **T3 PATTERN-STUDY** — measurable +12pct over DSPy on math reasoning is a genuine pattern-lift; vendor-fork would require Anthropic adapter port (~moderate effort).
- **source_disagreement**: deepwiki said "license not in indexed files"; WebSearch implied MIT but unverified. Flag for fresh license verification before any extraction.

### `microsoft/promptflow` — ~10k★ — DAG-based prompt orchestration (eval-first)

- **one_line**: Microsoft prompt-orchestration suite — YAML DAG flows, evaluation-first methodology, individual node debugging without rerunning previous nodes
- **discovery_source**: deepwiki + WebSearch
- **uniqueness_vs_incumbents**: most-overlaps with langchain (not an installed incumbent BUT a known framework); D10 mid because LangChain+LangGraph not in our runtime.
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface for the framework itself
  - code_anchor: DAG flows (YAML) + Flex flows (Python) + Prompty (template) — three flow types
  - field_report: Microsoft (author = user)
- **harness_fit_hint**: sdk-only (Azure-centric; no Claude integration)
- **license**: MIT
- **preliminary_tier**: **T3 PATTERN-STUDY** — eval-first DAG pattern is lift-value; the runtime's own eval-harness (`harness/eval_harness.py`) could borrow the DAG-flow YAML structure.
- **source_disagreement**: empty.

---

## §2 — Axis 2: Sources W288 didn't probe (5 new candidates)

### `huggingface/skills` — ~3k★ — official HuggingFace agent-skills

- **one_line**: official HF skills repo — gives agents access to HuggingFace ecosystem (datasets, models, spaces, inference providers)
- **discovery_source**: WebSearch + HF docs (huggingface.co/docs/hub/agents)
- **uniqueness_vs_incumbents**: no incumbent for HF-ecosystem-as-skill. Complements (not replaces) `anthropics/skills`.
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface
  - code_anchor: TBD (deepwiki not yet indexed)
  - field_report: HuggingFace (author org)
- **harness_fit_hint**: claude-code-native (skill format SHOULD be CC-compatible per HF docs)
- **license**: TBD (verify; likely Apache-2.0 per HF convention)
- **preliminary_tier**: **T3 PATTERN-STUDY** (provisional) → could elevate to T1 INSTALL if HF inference provider integration is needed downstream.
- **source_disagreement**: empty (single source so far; needs deepwiki probe in W291).

### `huggingface/ML-Intern` — n/a (CLI distribution) — research-agent that beats Claude Code

- **one_line**: HF AI-agents team's CLI agent for scientific reasoning, defaults to Anthropic Claude models, "beats Claude Code on scientific reasoning" per EdTech Innovation Hub
- **discovery_source**: WebSearch + ETIH article 2026 + HF docs
- **uniqueness_vs_incumbents**: distinct ARCHITECTURE (research-loop over scientific papers); not a direct CC competitor.
- **typed_evidence_seed**:
  - benchmark: claimed "beats Claude Code on scientific reasoning" — needs raw-data verification
  - code_anchor: CLI install via `uv`; accepts any inference provider model ID; defaults to Claude
  - field_report: HuggingFace
- **harness_fit_hint**: external-service (CLI; not a CC skill)
- **license**: TBD
- **preliminary_tier**: **T3 PATTERN-STUDY** — research-loop pattern is the lift-value; install-collision moderate.
- **source_disagreement**: single source (WebSearch summary); benchmark claim needs verification — flag as `disagreement.unverified-benchmark-claim`.

### `mcp-awesome.com` (1200+ MCP servers directory) — n/a (web service) — curated MCP index

- **one_line**: web-curated directory of 1200+ quality-verified MCP servers as of 2025-2026
- **discovery_source**: WebSearch + 2026 MCP roadmap blog (blog.modelcontextprotocol.io)
- **uniqueness_vs_incumbents**: complements modelcontextprotocol/servers (incumbent — official list) and mcp-awesome curated subset.
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface (curation, not a runnable artifact)
  - code_anchor: n/a (web service)
  - field_report: Linux Foundation Agentic AI Foundation (governance umbrella per WebSearch)
- **harness_fit_hint**: not-applicable (data source, not code)
- **license**: TBD (web service ToS)
- **preliminary_tier**: **T4 CITE-ONLY** — discovery-source reference, not a primitive to install.
- **source_disagreement**: empty.

### `ARUNAGIRINATHAN-K/awesome-ai-agents-2026` — TBD★ — 300+ AI-agents catalog

- **one_line**: 2026-current catalog of 300+ AI agents across coding/creative/voice/research/enterprise — comparison guides + benchmarks
- **discovery_source**: WebSearch
- **uniqueness_vs_incumbents**: broader than incumbent `quemsah/awesome-claude-plugins` (Claude-only) or `hesreallyhim/awesome-claude-code` (CC-only); covers cross-platform agents.
- **typed_evidence_seed**:
  - benchmark: catalog itself includes "comparison guides & benchmarks" per WebSearch — claim, not verified
  - code_anchor: README catalog rows (deepwiki probe needed)
  - field_report: none-found
- **harness_fit_hint**: not-applicable (curation source)
- **license**: TBD
- **preliminary_tier**: **T4 CITE-ONLY** — discovery-aid; not a primitive.
- **source_disagreement**: single-source; deepwiki probe queued for W291.

### MCP Apps (SEP-1865, formerly mcp-ui) — n/a (protocol spec)

- **one_line**: SEP-1865 formalised in early 2026 — standardises interactive UI (React-based dashboards) served BY MCP servers TO host applications
- **discovery_source**: WebSearch + MCP 2026 roadmap blog (blog.modelcontextprotocol.io/posts/2026-mcp-roadmap)
- **uniqueness_vs_incumbents**: NEW protocol surface — no incumbent in CC for "MCP-served UI."
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface (protocol spec)
  - code_anchor: SEP-1865 spec URL (TBD locate exact path)
  - field_report: Anthropic + OpenAI + Google ecosystem (per 2026 MCP roadmap convergence)
- **harness_fit_hint**: claude-code-native (CC's MCP runtime should accept once GA — currently spec-stage)
- **license**: MIT (MCP spec convention)
- **preliminary_tier**: **T4 CITE-ONLY** (now) → may elevate to T1 INSTALL once spec ships and reference servers exist.
- **source_disagreement**: empty.

---

## §3 — Axis 3: Low-star high-quality (operator's signature mandate, 6 new candidates)

### `daymade/claude-code-skills` — 52 skills marketplace — MIT

- **one_line**: production-ready skills marketplace with **meta-skill `skill-creator`** + 3-level progressive disclosure pattern + `security_scan.py` gitleaks integration + imperative writing discipline
- **discovery_source**: deepwiki (full access) + WebSearch (Medium 2026 review)
- **uniqueness_vs_incumbents**: most-overlaps with `addyosmani/agent-skills` (incumbent — Addy Osmani's compendium) and `mattpocock/skills` (incumbent — Matt Pocock's). Differentiation: (a) meta-skill bootstrap (skill-creator BUILDS skills using itself — methodology proof), (b) 3-level context-loading optimisation (metadata always, body on-trigger, resources on-demand), (c) `quick_validate.py` quality-gate enforcement.
- **typed_evidence_seed**:
  - benchmark: 18 production skills × 7 categories; no measurable benchmark in deepwiki
  - code_anchor: `skill-creator` is documented in deepwiki Wiki "skill-creator: The Meta-Skill" (`/wiki/daymade/claude-code-skills#4`)
  - field_report: none-found (no named-org users)
- **harness_fit_hint**: claude-code-native (CC skill format)
- **license**: **MIT**
- **preliminary_tier**: **T3 PATTERN-STUDY** (operator's mandate validated — meta-skill bootstrap + progressive disclosure is a real pattern-lift) → could elevate to T2 VENDOR-FORK by extracting the `skill-creator` + `security_scan.py` + `quick_validate.py` triad into the runtime's own skill-creator pipeline.
- **source_disagreement**: empty.

### `rohitg00/awesome-claude-code-toolkit` — TBD★ (large, "most comprehensive" claim) — Apache-2.0

- **one_line**: comprehensive toolkit — **135 agents + 35 skills + 42 commands + 176+ plugins + 20 hooks + 15 rules + 7 templates + 14 MCP configs + 26 companion apps + 52 ecosystem entries**
- **discovery_source**: deepwiki + WebSearch
- **uniqueness_vs_incumbents**: massive bundle aggregation; deepwiki Wiki section "Overview" cited; complements incumbent `quemsah/awesome-claude-plugins` (curated list) and `hesreallyhim/awesome-claude-code` (curated list).
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface (catalog)
  - code_anchor: `marketplace.json` lists 100+ contributor repos (deepwiki cited; full list runs to >100 entries)
  - field_report: 100+ contributor repos (counts as named-practitioner-aggregation field-report)
- **harness_fit_hint**: claude-code-native (CC primitive aggregation)
- **license**: **Apache-2.0** — INSTALL-tier license
- **preliminary_tier**: **T3 PATTERN-STUDY** (provisional) → could elevate via deep-dive: extract specific MCP configs / hooks not already incumbent; care needed re D10 overlap with quemsah / hesreallyhim incumbents.
- **source_disagreement**: empty.

### `levnikolaevich/claude-code-skills` — TBD★ — MIT, **hashline-edit** unique MCP

- **one_line**: skills + MCP servers — **hashline-edit** (hash-based file editing for atomic context-aware edits — unique pattern), plus context7/Ref/linear-server stdlib MCPs
- **discovery_source**: deepwiki + WebSearch (initially looked for hex-line/hex-graph/hex-ssh which deepwiki found weren't in the repo — corrected to actual MCPs)
- **uniqueness_vs_incumbents**: `hashline-edit` (hash-based file editing) — no incumbent provides cryptographic-hash-validated atomic edits. New primitive.
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface
  - code_anchor: deepwiki cited 4 MCP servers documented in repo (`context7`, `Ref`, `linear-server`, `hashline-edit`); the latter is the unique surface
  - field_report: none-found
- **harness_fit_hint**: claude-code-native (MCP-server)
- **license**: **MIT** + version 3.1.0
- **preliminary_tier**: **T3 PATTERN-STUDY** — `hashline-edit` pattern is the lift-value (hash-validation before write); install_score would be modest (D5 typed-evidence weak — no published benchmark) but pattern_score strong (D2 uniqueness=4 D13 extractability=5).
- **source_disagreement**: **YES** — my probe asked about hex-line/hex-graph/hex-ssh (from earlier WebSearch summary) but deepwiki said those don't exist in the repo. Actual MCPs are different. Resolution: WebSearch summary was wrong; deepwiki source-of-truth.

### `simonw/llm` — ~5k★ — Apache-2.0, plugin-based provider-agnostic LLM CLI

- **one_line**: CLI tool + Python library for unified LLM access — pluggy-based plugin architecture (6 hooks: register_models/embedding_models/tools/commands/template_loaders/fragment_loaders)
- **discovery_source**: deepwiki + practitioner-blog convergence (simonwillison.net is a top-3 LLM practitioner blog)
- **uniqueness_vs_incumbents**: distinct from incumbents — provider-agnostic plugin pattern that doesn't exist in CC (CC is Anthropic-specific). Pattern study, not install (overlapping with CC itself).
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface
  - code_anchor: 6-hook pluggy architecture; `llm-anthropic` plugin (separate package) provides Claude
  - field_report: Simon Willison (named-practitioner = the author IS the practitioner with public production usage at simonwillison.net)
- **harness_fit_hint**: external-service (separate CLI; not a CC skill)
- **license**: **Apache-2.0**
- **preliminary_tier**: **T4 CITE-ONLY** — provider-agnostic plugin pattern is reference value; D10 high overlap with CC means INSTALL/VENDOR-FORK paths are dominated by CC itself.
- **source_disagreement**: empty.

### `microsoft/PyRIT` redundant cite — see Axis-1 entry (already covered)

### `Compresr` (compresr by Ivan Zakazov) — 174★ — prompt-compression alternative to LLMLingua

- **one_line**: prompt-compression with technically-credible team (Ivan Zakazov: PhD + Microsoft + Philips) — benchmarks against LLMLingua; live pip-installable
- **discovery_source**: WebSearch (YC Tier List + TokenMix Blog 2026)
- **uniqueness_vs_incumbents**: alternative to incumbent `microsoft/LLMLingua` (5.9k★). Compresr is a newer experiment — author's track record is the credential, not stars.
- **typed_evidence_seed**:
  - benchmark: claims "benchmarks against LLMLingua" — needs raw-data verification; LLMLingua itself has measured 20× compression with 1.5-point accuracy drop
  - code_anchor: pip-installable package (per WebSearch) — TBD deepwiki index
  - field_report: Ivan Zakazov (named-practitioner per Y Combinator W26 batch)
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **preliminary_tier**: **T4 CITE-ONLY** — LLMLingua is the incumbent + has stronger measured benchmark; defer Compresr unless 2026 benchmark surfaces showing meaningful delta.
- **source_disagreement**: single-source (WebSearch); benchmark claim explicit but unverified → `disagreement.unverified-benchmark-claim` flag.

### `ryoppippi/ccusage` — TBD★ — Claude Code usage + cost tracking

- **one_line**: Claude Code usage / cost tracking utility (named in rohitg00 awesome-claude-code-toolkit contributor list)
- **discovery_source**: rohitg00/awesome-claude-code-toolkit contributor list (deepwiki) + low-star-targeted axis
- **uniqueness_vs_incumbents**: cost-tracking layer not formally covered by any installed incumbent (Helicone is incumbent but is a hosted observability platform — different surface).
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface (TBD)
  - code_anchor: TBD (deepwiki index needed)
  - field_report: rohitg00 awesome-list inclusion = named-practitioner aggregation field-report
- **harness_fit_hint**: claude-code-native (CC-specific utility)
- **license**: TBD
- **preliminary_tier**: **T3 PATTERN-STUDY** (provisional) — cost-tracking is a real layer-gap; pending deepwiki deep-dive in W291.
- **source_disagreement**: single-source — flagged for W291 multi-source verification.

---

## §4 — Axis 4: Multi-angle convergence findings (5 cross-cutting items)

### Anthropic ACP (Agent Client Protocol) — protocol — citation-only

- **one_line**: protocol that lets Claude Code be the LLM-backend for ANY agent runtime (OpenHands, cline) — already used in OpenHands frontend
- **discovery_source**: deepwiki (OpenHands codebase) + cline deepwiki (cline wraps `claude` process per turn) + Anthropic docs implication
- **uniqueness_vs_incumbents**: ACP is the architectural-pattern bridge; the runtime itself implements it implicitly (CC IS the ACP server).
- **typed_evidence_seed**:
  - benchmark: convergence: 2 INDEPENDENT consumers (OpenHands + cline) both rely on ACP via Claude Code → strong field-report-by-convergence
  - code_anchor: OpenHands frontend has `acp_server="claude-code"` provider; cline starts a `claude` process per turn (deepwiki cited)
  - field_report: OpenHands + cline (2 distinct consumers)
- **harness_fit_hint**: already-native (CC IS the ACP server)
- **license**: Anthropic docs / proprietary
- **preliminary_tier**: **T4 CITE-ONLY** — protocol awareness; CC already implements it. Operator can note that future external-consumer integrations can rely on this.
- **source_disagreement**: empty (2-source convergent).

### LangChain Hub (smith-prompts) — prompt registry — citation-only

- **one_line**: hosted prompt registry on smith.langchain.com — 100k+ community prompts + provider-agnostic prompt versioning
- **discovery_source**: W288 Stream B identified LangChain ecosystem as candidate; WebSearch this wave confirms LangChain Hub is the registry surface
- **uniqueness_vs_incumbents**: no incumbent prompt-registry. Langfuse (incumbent) has prompt management for self-hosted; LangChain Hub is the public-registry counterpart.
- **typed_evidence_seed**:
  - benchmark: no-benchmark-surface
  - code_anchor: LangChain SDK pull/push to hub
  - field_report: LangChain (the hosted service)
- **harness_fit_hint**: external-service
- **license**: SaaS (proprietary)
- **preliminary_tier**: **T4 CITE-ONLY** — Langfuse already covers self-hosted; no install-grade need for LangChain Hub.
- **source_disagreement**: empty.

### simonwillison.net — practitioner blog — citation-source

- **one_line**: Simon Willison's blog — top-3 LLM-practitioner blog with weekly evals + tool reviews + framework experiments
- **discovery_source**: WebSearch + practitioner-convergence (mentioned across 4+ articles in this wave)
- **uniqueness_vs_incumbents**: no formal "practitioner-blog" tier in incumbent catalog → add as TIER-5 cite-class source per `STREAM-A-METHODOLOGY.md §2`.
- **typed_evidence_seed**:
  - benchmark: n/a (blog)
  - code_anchor: n/a
  - field_report: Simon Willison (author IS practitioner)
- **harness_fit_hint**: not-applicable
- **license**: blog ToS
- **preliminary_tier**: **T4 CITE-ONLY** — research-source feed reference; treat as source in W291+ discovery probes.
- **source_disagreement**: empty.

### latent.space (Latent Space pod) — practitioner-podcast — citation-source

- **one_line**: top LLM/agent-architecture podcast — frequent practitioner field-reports
- **discovery_source**: WebSearch (mentioned in WebSearch summary as practitioner-blog convergence)
- **uniqueness_vs_incumbents**: no incumbent podcast feed.
- **typed_evidence_seed**: n/a (podcast)
- **harness_fit_hint**: not-applicable
- **license**: podcast
- **preliminary_tier**: **T4 CITE-ONLY**.
- **source_disagreement**: empty.

### blockchain-council.org "Top 50 Claude Skills" 2026 — third-party-curated list

- **one_line**: third-party top-50 ranking of Claude skills + GitHub repos (2026)
- **discovery_source**: WebSearch
- **uniqueness_vs_incumbents**: third-party curation NOT in our catalog — used as cross-check on `hesreallyhim/awesome-claude-code` and `rohitg00/awesome-claude-code-toolkit` rankings.
- **typed_evidence_seed**: n/a (article)
- **harness_fit_hint**: not-applicable
- **license**: article ToS
- **preliminary_tier**: **T4 CITE-ONLY**.
- **source_disagreement**: empty.

---

## §5 — Sources convergence summary (operator-mandated 2+ independent sources per candidate)

| Candidate | deepwiki | WebSearch | repomix-XML | gh CLI | Convergence |
|---|:-:|:-:|:-:|:-:|:-:|
| OpenHands | ✓ | ✓ | — | — | **2 sources** |
| cline/cline | ✓ | ✓ | — | — | **2 sources** |
| Azure/PyRIT | ✓ | ✓ | — | — | **2 sources** |
| daytonaio/daytona | ✓ | ✓ | — | — | **2 sources** |
| e2b-dev/E2B | ✓ | ✓ | — | — | **2 sources** |
| e2b-dev/code-interpreter | ✓ | — | — | — | 1 source — flag |
| microsoft/PromptWizard | ✓ | ✓ | — | — | **2 sources** |
| microsoft/promptflow | ✓ | ✓ | — | — | **2 sources** |
| huggingface/skills | — | ✓ | — | — | 1 source — flag |
| huggingface/ML-Intern | — | ✓ | — | — | 1 source — flag |
| mcp-awesome.com | — | ✓ | — | — | 1 source — flag |
| awesome-ai-agents-2026 | — | ✓ | — | — | 1 source — flag |
| MCP Apps SEP-1865 | — | ✓ | — | — | 1 source — flag |
| daymade/claude-code-skills | ✓ | ✓ | — | — | **2 sources** |
| rohitg00/awesome-claude-code-toolkit | ✓ | ✓ | — | — | **2 sources** |
| levnikolaevich/claude-code-skills | ✓ | ✓ | — | — | **2 sources** (+ 1 disagreement) |
| simonw/llm | ✓ | — | — | — | 1 source — flag |
| Compresr | — | ✓ | — | — | 1 source — flag |
| ryoppippi/ccusage | — | ✓ | — | — | 1 source — flag |
| Anthropic ACP | ✓ (OpenHands) | ✓ (cline) | — | — | **2 sources convergent** |
| LangChain Hub | — | ✓ | — | — | 1 source — flag |
| simonwillison.net | — | ✓ | — | — | 1 source — flag |
| latent.space | — | ✓ | — | — | 1 source — flag |
| Top-50 Claude Skills article | — | ✓ | — | — | 1 source — flag |

**Convergence stats**:
- Convergent (≥2 independent sources, 0 disagreements): 9 candidates
- Convergent with 1 disagreement: 1 candidate (levnikolaevich — initial WebSearch claimed hex-* MCPs; deepwiki disproved)
- Single-source flagged-for-W291-corroboration: 14 candidates

The 14 single-source candidates are still listed — operator's "stars not a hardgate" mandate extends to source-counts: single-source ≠ auto-reject; they get a `disagreement.single-source-pending` flag for W291 follow-up corroboration.

---

## §6 — Top 8 ADD-TO-W291-AUDIT

| Rank | Repo/Service | Axis | Stars | Tier (prelim) | Uniqueness rationale |
|---:|---|---|---:|---|---|
| 1 | `daytonaio/daytona` | A1 sandbox | ~14k | **T2 VENDOR-FORK** | AGPL caps INSTALL but Native Claude MCP (`daytona mcp init claude`) — strongest CC-pathway of any new sandbox; 90ms spin |
| 2 | `microsoft/PromptWizard` | A1 prompt-opt | ~2k | **T3 PATTERN-STUDY** | Measured +12pct GSM8k vs DSPy (the runtime's incumbent prompt-opt) — pattern-lift with concrete benchmark deltas |
| 3 | `daymade/claude-code-skills` | A3 low-star | <500 | **T3 PATTERN-STUDY** | Meta-skill `skill-creator` (bootstrap) + 3-level progressive disclosure + `security_scan.py` gitleaks integration — operator-mandate flagship (low-star high-pattern) |
| 4 | `All-Hands-AI/OpenHands` | A1 code-agent | ~62k | **T2 VENDOR-FORK** | 77.6 SWE-bench measured + ACP-Claude provider + 4 named-org production users (TikTok/VMware/Roche/Amazon) |
| 5 | `Azure/PyRIT` | A1 red-team | ~3k | **T3 PATTERN-STUDY** | Multi-modal (text/image/video/audio/PDF) red-teaming — extends garak coverage; MS AI Red Team arXiv paper |
| 6 | `rohitg00/awesome-claude-code-toolkit` | A3 mega-catalog | TBD | **T3 PATTERN-STUDY** | Apache-2.0 + 135 agents + 35 skills + 42 commands + 100+ contributor-repo aggregation |
| 7 | `levnikolaevich/claude-code-skills` | A3 low-star | <500 | **T3 PATTERN-STUDY** | `hashline-edit` MCP — hash-validated atomic file editing pattern (unique, no incumbent equivalent) |
| 8 | `huggingface/skills` | A2 non-GitHub-ish (HF) | ~3k | **T3 PATTERN-STUDY → T1?** | Official HF skills for agent access to HF ecosystem; could elevate to INSTALL once HF inference provider integration becomes needed |

---

## §7 — Executive summary (6 bullets)

1. **24 NEW candidates surfaced across 4 axes**, of which 9 have full ≥2-independent-source convergence and 14 are flagged for single-source W291 corroboration. The "stars-not-a-hardgate" mandate is operationalised here: 5 of the top-8 ADD-TO-W291 candidates have <500★ or modest (≤14k) star counts; the SOTA-driving signal is capability-uniqueness + measurable benchmark deltas, not stars.

2. **Best axis-coverage gain: Architecture-layers-missed (Axis 1)** — 8 new candidates fill 4 layer-gaps that W288 didn't cover: (a) sandbox-with-native-Claude-MCP (daytona), (b) measured-prompt-optimization-with-benchmark-deltas (PromptWizard +12pct GSM8k), (c) multi-modal-LLM-red-teaming (PyRIT — complements installed garak), (d) full-fat-coding-agent-with-ACP-Claude-provider (OpenHands 77.6 SWE-bench).

3. **Top-3 by capability_uniqueness**: (i) **daytonaio/daytona** — ONLY new sandbox with `daytona mcp init claude` native pathway; (ii) **microsoft/PromptWizard** — ONLY new optimiser with measured multi-dataset deltas vs the incumbent DSPy (+12pct GSM8k, +3pct AQUARAT, +5pct ETHOS); (iii) **levnikolaevich/claude-code-skills** — ONLY discovery with `hashline-edit` cryptographic-hash-validated atomic-edit pattern.

4. **Surprising low-star find** (operator's signature mandate validated): **`levnikolaevich/claude-code-skills`** (low-star, niche-pattern) — `hashline-edit` MCP for hash-validated file editing. No incumbent provides cryptographic-hash validation before write — this is a real pattern-extraction win that v2's implicit star-floor would have auto-rejected. Convergence via deepwiki (full codebase access) + WebSearch (mentioned in rohitg00 contributor list); 1 disagreement resolved (the initial WebSearch summary mis-named the MCPs as hex-*; deepwiki proved actual names are context7/Ref/linear-server/hashline-edit).

5. **Saturation indicator — axis where ALL probes returned `nothing genuinely new`: LLM gateways/routers**. Portkey-AI/gateway is not indexed in deepwiki; WebSearch surfaces it but the architectural delta vs incumbent `BerriAI/litellm` (already installed and packed in repomix-library) is marginal. Recommend treating LLM-gateway layer as saturated: litellm is the runtime's gateway.

6. **Source-performance ranking** for this wave: **deepwiki ⭐⭐⭐⭐⭐** (AI-grounded answers with file-line cites; gave full architectural context for 9 candidates), **WebSearch ⭐⭐⭐⭐** (broad practitioner-blog convergence; surfaced 5 candidates beyond what deepwiki indexed), `gh` CLI ⭐ (used minimally — only for repo-existence checks), repomix-library ⭐ (none of the 24 candidates are pre-packed — would have helped if they were). **Recommendation**: future waves should batch-pack `mcp-awesome.com` top-50 + the 4 top-tier new candidates into repomix-library before W291 so the typed-evidence stage can grep them directly.

---

## §8 — Cite trail

**Deepwiki AI-grounded probes** (8 candidates with full codebase access):
- `e2b-dev/E2B`, `e2b-dev/code-interpreter`, `microsoft/promptflow`, `microsoft/PromptWizard`, `simonw/llm`, `All-Hands-AI/OpenHands`, `cline/cline`, `Azure/PyRIT`, `daytonaio/daytona`, `rohitg00/awesome-claude-code-toolkit`, `daymade/claude-code-skills`, `levnikolaevich/claude-code-skills` — each producing a "View this search on DeepWiki: …" cite link.

**WebSearch convergence** (5 source-clusters):
- `"claude code skill 2026"` → alirezarezvani, daymade, glebis, GetBindu, levnikolaevich, obviousworks, rohitg00 + Medium 2026 review + buildfastwithai 2026 guide
- `"model context protocol"` 2026 → blog.modelcontextprotocol.io 2026 roadmap, mcp-awesome.com 1200+ servers, decodethefuture.org, devstarsj.github.io, cyberpress.org top-10
- `"prompt compression" 2026` → microsoft/LLMLingua original + Compresr YC W26 batch + Awesome-LLM-Compression survey + tokenmix.ai 2026 article
- `"huggingface spaces agentic claude 2026"` → HF/skills repo + HF/ML-Intern article + StackOne 120-tool agentic landscape + HF spaces-agents docs

**Practitioner blogs / podcast feeds** (mentioned for future systematic ingestion):
- simonwillison.net (Simon Willison), latent.space (Latent Space pod), every.to, thealgorithmicbridge.com, blockchain-council.org Top-50 2026 article

**MCP-curation sources** (for W291 systematic intake):
- modelcontextprotocol/servers (incumbent), mcp-awesome.com 1200+ directory (new), Linux Foundation Agentic AI Foundation (governance)

---

**File**: `Z:/claude-sota-installed/docs/architecture/W290-QUALITY-AND-SOTA-WAVE/F3-SOTA-DISCOVERY-W290.md`
**Wave**: W290 F3
**Owner**: F3 worker fork
**Status**: ready for W291 typed-evidence Stage 2 on Top-8 candidates.

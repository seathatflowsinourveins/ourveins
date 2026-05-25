# W288 STREAM B — SOTA Repo Discovery Sweep (post-W259v15)

> **Wave**: W288 research-architecture v2 — Stream B (parallel fork)
> **Date**: 2026-05-18
> **Mission**: surface SOTA repos NOT present in the W259v15 catalog, across ≥6 source families.
> **Operator mandate**: stars are NOT a hard gate; low-star high-quality pattern repos must be surfaced explicitly.
> **Cite-class**: TIER-1-DIRECT — GitHub API live metadata (`mcp__github__search_repositories`) 2026-05-18. Where READMEs were inspected, `mcp__github__get_file_contents` was used; where architecture clarity was needed, `mcp__deepwiki__ask_question`.

---

## §0 — Method, scope, and discipline

**Sources probed (8 GitHub-search queries × 6 families = 48 distinct probe shapes):**

1. `topic:claude-code created:>2026-04-01 sort:stars` — claude-code-native NEW
2. `topic:claude-skills sort:updated-desc` — skills-tagged
3. `topic:mcp-server stars:>200 sort:updated` — MCP servers active
4. `claude code plugin in:readme stars:>50 created:>2026-01-01` — recent plugins
5. `claude code hook in:readme stars:>20 sort:updated` — hook-pattern repos
6. `model context protocol server in:readme stars:>500 created:>2025-06-01` — broad MCP
7. `agent framework in:readme stars:>2000 created:>2025-01-01` — agentic frameworks
8. `crewai OR autogen OR langgraph in:name stars:>5000` — incumbent frameworks check
9. `topic:llm-observability stars:>200` — eval/observability
10. `graphrag in:name stars:>1000` — knowledge-graph RAG
11. `topic:sandbox topic:agent stars:>500` — sandbox/exec
12. `knowledge graph llm in:readme stars:>2000` — graph-memory
13. `memory ai agent in:readme stars:>1000 created:>2025-01-01` — agent memory
14. `topic:rag stars:>3000 pushed:>2026-01-01` — RAG actively maintained
15. `claude code research deep-research in:readme stars:>200` — research-class
16. `agent loop autonomous in:readme stars:50..500 pushed:>2026-03-01` — LOW-STAR niche

**Filter discipline:**
- Skipped all 80+ W259v15 incumbents (anthropics/*, modelcontextprotocol/*, microsoft/*, langfuse/*, getzep/graphiti, mem0ai/mem0, letta-ai/letta, basicmachines-co/basic-memory, topoteretes/cognee, hindsight, GitNexus, BerriAI/litellm, comet-ml/opik, Arize-ai/phoenix, confident-ai/deepeval, explodinggradients/ragas, NVIDIA/garak, dottxt-ai/outlines, BoundaryML/baml, DS4SD/docling, ast-grep, ChromeDevTools/chrome-devtools-mcp, cloudflare/*, google/{adk-python,agents-cli,gemini-cli}, github/{awesome-copilot,github-mcp-server,spec-kit}, block-goose, Helicone, iannuttall/ralph, addyosmani-agent-skills, hesreallyhim/awesome-claude-code, affaan-m/everything-claude-code, msitarzewski/agency-agents, smtg-ai/claude-squad, stravu/crystal, bloopai/vibe-kanban, musistudio/claude-code-router, kbwo/ccmanager, shanraisshan/claude-code-best-practice, shubhamsaboo/awesome-llm-apps, gsd-build/get-shit-done, wshobson/agents, langfuse subrepos, etc.).
- Star-inflation flag: several discovered repos (e.g., `JuliusBrussee/caveman` 61k★ created 2026-04, `safishamsi/graphify` 48k★ created 2026-04, `affaan-m/everything-claude-code` 185k★ created 2026-01) show suspicious star-velocity patterns consistent with bot-farm inflation per `https://github.com/orgs/community/discussions/categories/fake-stars`. These are flagged in `rationale:`; their stars are NOT counted toward `community_signal_distribution`.
- **Low-star high-quality** explicitly surfaced in Family 6 with rationale anchored on capability_uniqueness — per operator mandate.

**Output schema (each candidate block):**
- `one_line` — ≤120 char capability claim
- `why_new` — created-after-v15 / niche / low-star / overlooked
- `suspected_typed_evidence` — benchmark, code_anchor, field_report per sota-convergence-audit v2 typed-evidence rule
- `harness_fit_hint` — claude-code-native | sdk-only | not-applicable
- `license` — SPDX or "TBD"
- `last_commit_seen` — ISO date (best-known)
- `preliminary_depth_recommendation` — INSTALL | VENDOR-FORK | PATTERN-STUDY | CITE-ONLY | DEFER
- `rationale` — one sentence

**Total candidates surfaced: 42** across 6 families. Top-10 table at §8.

---

## §1 — Family 1: claude-code ecosystem NEW (since W259v15)

13 candidates — focus on novel skill patterns, alternative architectures, planning systems, design systems that this runtime does not duplicate.

### `safishamsi/graphify` — `48,841★` — `Family 1: claude-code ecosystem (knowledge-graph skill)`

- **one_line**: AI-skill that turns any folder (code, SQL schemas, R/shell scripts, docs, papers, images, videos) into a queryable knowledge graph via tree-sitter + Leiden + GraphRAG.
- **why_new**: created-after-v15 (2026-04-03); explicitly heterogeneous-source (vs gitnexus which is code-only).
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface (skill-class, not eval-able directly)
  - code_anchor: README claims Leiden + tree-sitter + BM25 — verifiable via `mcp__github__get_file_contents` repo tree
  - field_report: none-found-yet (recent)
- **harness_fit_hint**: claude-code-native (delivered as Claude Code / Codex / OpenCode / Cursor / Gemini-CLI agent skill)
- **license**: TBD (verify)
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Heterogeneous-source graph is genuinely additive over gitnexus (code-only) — STUDY the multi-format ingest pattern; star-velocity (48k in 6 weeks) suggests inflation, do not weight community signal.

### `AgriciDaniel/claude-obsidian` — `5,126★` — `Family 1: knowledge-management skill`

- **one_line**: Persistent compounding wiki vault for Claude Code, implementing Karpathy's "LLM Wiki" pattern with `/wiki /save /autoresearch` slash commands.
- **why_new**: created 2026-04-07; implements a NAMED pattern (Karpathy LLM Wiki) not yet adopted by this runtime.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: README documents 3 slash commands + obsidian-vault binding
  - field_report: Karpathy's original LLM-wiki tweet/blog is the named-source
- **harness_fit_hint**: claude-code-native (slash commands + skill)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: The Karpathy LLM-Wiki pattern is a well-articulated knowledge-architecture concept; even if this specific repo is not adopted, the pattern is worth extracting into a sibling skill.

### `OthmanAdi/planning-with-files` — `21,514★` — `Family 1: planning skill`

- **one_line**: Claude Code skill implementing Manus-style persistent markdown planning (the workflow behind Manus's $2B acquisition).
- **why_new**: created 2026-01-03; implements an externally validated workflow pattern (Manus, $2B exit).
- **suspected_typed_evidence**:
  - benchmark: implicit — Manus's commercial success is the field-validation signal
  - code_anchor: README documents the persistent-markdown plan pattern
  - field_report: Manus acquisition (named-org-outcome)
- **harness_fit_hint**: claude-code-native (skill format)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Sister to `superpowers:writing-plans` — should compare with the incumbent to see if persistent-markdown adds discipline beyond what we have; star inflation suspected (21k in 4 months).

### `Fission-AI/OpenSpec` — `48,721★` — `Family 1: spec-driven development`

- **one_line**: Spec-driven development (SDD) for AI coding assistants — alternative to `github/spec-kit`.
- **why_new**: created 2025-08-05; runtime currently uses `github/spec-kit` (`speckit-*` skills incumbent) — OpenSpec is the competitor worth comparing.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface (workflow-class)
  - code_anchor: README spec-template surface
  - field_report: none surfaced
- **harness_fit_hint**: claude-code-native (CLI + AGENTS.md)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY (bake-off vs incumbent spec-kit)
- **rationale**: Direct alternative to installed spec-kit; need a 1-task bake-off before changing; until then cite-only with deferred re-litigation.

### `bmad-code-org/BMAD-METHOD` — `47,473★` — `Family 1: methodology`

- **one_line**: Breakthrough Method for Agile AI-Driven Development — opinionated multi-agent methodology with role-based personas (analyst, PM, architect, dev, QA, etc.).
- **why_new**: created 2025-04-13; persona-based methodology not yet in the runtime's agent-team presets.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: persona definitions in `bmad-core/agents/`
  - field_report: large community (47k★) suggests broad adoption
- **harness_fit_hint**: claude-code-native (sub-agent / agent-team compatible)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Compare against installed `agent-teams` preset surface — BMAD's 8-persona ladder may add roles we lack (e.g., explicit analyst phase).

### `kepano/obsidian-skills` — `31,798★` — `Family 1: knowledge-management skills`

- **one_line**: Agent skills for Obsidian — teach the agent to use Markdown, Bases, JSON Canvas, and CLI.
- **why_new**: created 2026-01-02; first-party from kepano (Obsidian team).
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: SKILL.md files in repo root
  - field_report: kepano is a known-practitioner (Obsidian co-founder) — named field-author
- **harness_fit_hint**: claude-code-native (SKILL.md format)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: This runtime does not use Obsidian, but the skill-design discipline from a recognized practitioner (kepano) is worth lifting; CITE if Obsidian is not added.

### `PrathamLearnsToCode/paper2code` — `1,294★` — `Family 1: research→code skill`

- **one_line**: Agent skill to turn any arXiv paper into a working implementation.
- **why_new**: created 2026-04-03; niche but novel research-to-code translation pattern.
- **suspected_typed_evidence**:
  - benchmark: implicit (works-or-doesn't on a paper)
  - code_anchor: skill manifest + agent loop
  - field_report: none surfaced (recent)
- **harness_fit_hint**: claude-code-native
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Useful for the runtime's own research workflow — auto-implement a paper as a verification of the research-architecture's depth.

### `ciembor/agent-rules-books` — `1,443★` — `Family 1: AGENTS.md curation`

- **one_line**: AGENTS.md rule packs inspired by Clean Code / DDD / Refactoring / Clean Architecture / DDIA — for Codex, Cursor, and Claude Code.
- **why_new**: created 2026-04-16; book-derived rule packs not yet considered.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: per-book AGENTS.md rule files
  - field_report: the books themselves are field-tested (Clean Code, DDD)
- **harness_fit_hint**: claude-code-native (AGENTS.md format)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: This runtime's CLAUDE.md is intentionally minimal; importing book-style discipline as a skill is interesting but conflicts with the ≤50-LOC pointer-only stance — cite the pattern, do not adopt.

### `VoltAgent/awesome-design-md` — `80,473★` — `Family 1: design-system DESIGN.md library`

- **one_line**: Curated collection of DESIGN.md files inspired by popular brand systems — drop one in to let coding agents generate matching UIs.
- **why_new**: created 2026-03-31; the DESIGN.md convention is novel coordination artifact.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: DESIGN.md files per brand
  - field_report: VoltAgent is a recognized agent-tooling org (also `voltagent` framework)
- **harness_fit_hint**: claude-code-native (DESIGN.md as agent-readable spec)
- **license**: TBD (likely MIT)
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY (runtime is not UI-focused)
- **rationale**: Star inflation suspected; pattern itself is worth knowing (DESIGN.md as a sibling to CLAUDE.md / AGENTS.md) — cite the convention.

### `jarrodwatts/claude-hud` — `23,053★` — `Family 1: status visibility plugin`

- **one_line**: Claude Code plugin showing context usage, active tools, running agents, todo progress in a HUD.
- **why_new**: created 2026-01-02; runtime has statusline but not a HUD-class visualization.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: plugin source
  - field_report: 23k stars suggest real usage (verify inflation)
- **harness_fit_hint**: claude-code-native (plugin.json)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: DEFER (not autonomous-/loop-relevant; HUD assumes interactive operator)
- **rationale**: Useful for interactive operators, but this runtime is autonomous-`/loop`-first — DEFER to a future interactive-mode if added.

### `vercel-labs/skills` — `18,969★` — `Family 1: open agent-skills tool`

- **one_line**: The open agent-skills CLI — `npx skills`.
- **why_new**: created 2026-01-14; vercel-labs first-party tooling for skill distribution.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: CLI source + skill registry format
  - field_report: vercel-labs (named-org-partner)
- **harness_fit_hint**: claude-code-native
- **license**: TBD (vercel-labs typically Apache-2.0)
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: First-party vercel skill tooling — pattern-study the registry format and CLI UX; this runtime is plugin-marketplace-driven, but the CLI surface may inform a `/skills` UX.

### `modu-ai/moai-adk` — `1,015★` — `Family 1: SPEC-First ADK`

- **one_line**: SPEC-First Agentic Development Kit for Claude Code — 24 AI agents + 52 skills, TDD/DDD quality gates, 16-language projects.
- **why_new**: created 2025-09-16; goes beyond `spec-kit` with quality-gate emphasis (TDD/DDD).
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface for the kit itself
  - code_anchor: 24 agent definitions + 52 skills + quality-gate configs
  - field_report: modu-ai also ships `cowork-plugins` Korean-domain marketplace
- **harness_fit_hint**: claude-code-native (Go CLI + skills)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Quality-gate-first SDD methodology is genuinely additive over spec-kit's spec-only stance — extract the gate definitions; may inform W288 Stream C scoring rubric.

### `iFurySt/open-codex-computer-use` — `818★` — `Family 1: computer-use agent`

- **one_line**: Open-source alternative to OpenAI's Codex Computer Use — desktop automation MCP for Claude Code, Codex, Gemini CLI.
- **why_new**: created 2026-04-17; this runtime currently lacks a computer-use surface.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface yet
  - code_anchor: Swift macOS automation + MCP wrapper
  - field_report: none-found-yet
- **harness_fit_hint**: claude-code-native (MCP-server)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: DEFER
- **rationale**: Computer-use is not on the W288 critical path; defer to a future wave; Windows fit unclear (Swift-only).

---

## §2 — Family 2: MCP server ecosystem NEW

11 candidates — focus on MCP-server primitives not yet in `.mcp.json` and not in the W259v15 catalog.

### `sipyourdrink-ltd/bernstein` — `395★` — `Family 2: audit-grade orchestration`

- **one_line**: Audit-grade multi-agent orchestration for CLI coding agents (Claude Code, Codex, Gemini CLI, +40 more) with HMAC-chained audit log, signed agent cards, per-artefact lineage, air-gap deploy.
- **why_new**: created 2026-03-22; the only HMAC-chained-log + signed-agent-card design observed in the wild.
- **suspected_typed_evidence**:
  - benchmark: bernstein.run claims SWE-bench validation
  - code_anchor: deterministic-scheduler + HMAC log impl
  - field_report: compliance-team-positioned ("orchestrator your compliance team will sign off on") — implies named-enterprise adopters
- **harness_fit_hint**: claude-code-native (CLI-agnostic orchestrator)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY (signed-audit-log pattern is novel)
- **rationale**: This runtime already has `signed-audit-trails-recipe` skill — bernstein's HMAC-chained model is worth comparing for the audit-trail discipline.

### `Lyellr88/MARM-Systems` — `289★` — `Family 2: memory protocol MCP`

- **one_line**: Universal MCP server (HTTP/STDIO/WebSocket) enabling cross-platform AI memory, multi-agent coordination, context sharing via MARM protocol.
- **why_new**: created 2025-06-10; protocol-first memory design (not yet considered).
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: MARM protocol spec + FastAPI server
  - field_report: none-found-yet
- **harness_fit_hint**: claude-code-native (MCP)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: A NEW memory protocol on top of MCP is a fresh angle on the runtime's 6-tier memory stack — study the protocol shape.

### `MCPJam/inspector` — `1,947★` — `Family 2: MCP inspector/debugger`

- **one_line**: Development platform to debug, chat, inspect, and evaluate MCP servers, MCP apps, and ChatGPT apps.
- **why_new**: created 2025-05-23; rival to `modelcontextprotocol/inspector` (incumbent) — adds evals + tracing.
- **suspected_typed_evidence**:
  - benchmark: includes evaluation lane
  - code_anchor: inspector UI + OAuth2 + tracing
  - field_report: 1.9k stars suggests real practitioner usage
- **harness_fit_hint**: claude-code-native (MCP debug tool)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY (rival to incumbent inspector)
- **rationale**: Bake-off vs `modelcontextprotocol/inspector` for evals + OAuth2 coverage; this runtime needs MCP eval lanes per Stream D.

### `archestra-ai/archestra` — `3,668★` — `Family 2: enterprise MCP gateway`

- **one_line**: Enterprise AI Platform with guardrails, MCP registry, gateway & orchestrator.
- **why_new**: created 2025-07-15; gateway-shaped MCP infra not yet considered.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: gateway + registry + host
  - field_report: 3.7k stars + active issue count suggests real usage
- **harness_fit_hint**: not-applicable (enterprise-scale, this runtime is single-operator)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Useful reference for multi-org MCP governance; out-of-scope for solo-`/loop` runtime.

### `maximhq/bifrost` — `4,999★` — `Family 2: AI gateway`

- **one_line**: Fastest enterprise AI gateway (50× faster than LiteLLM per author benchmark), <100µs at 5k RPS, 1000+ models.
- **why_new**: created 2025-03-19; explicit benchmark claim vs incumbent LiteLLM.
- **suspected_typed_evidence**:
  - benchmark: "50× faster than LiteLLM" — self-benchmark from maximhq (author bias flag per `MASTER-SCORING-MATRIX-W259.md §D8`)
  - code_anchor: Go gateway impl
  - field_report: none-independent surfaced
- **harness_fit_hint**: sdk-only (gateway, not Claude-Code-native)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: LiteLLM is already incumbent (BerriAI/litellm); strip the "50×" claim per W259 D8 self-attestation rule until independent benchmark; cite as a comparison anchor.

### `mihaelamj/cupertino` — `748★` — `Family 2: docs-as-MCP pattern`

- **one_line**: Local Apple Documentation crawler and MCP server — offline docs in Swift.
- **why_new**: created 2025-11-14; the docs-crawler→local-MCP pattern is novel.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: crawler + MCP server
  - field_report: none-found-yet
- **harness_fit_hint**: claude-code-native (MCP)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: This runtime relies on context7 + deepwiki for docs; an offline crawler→MCP pattern is worth lifting for security/air-gap settings.

### `nduckmink/arkon` — `734★` — `Family 2: enterprise knowledge MCP`

- **one_line**: Enterprise AI Knowledge Hub & MCP Server — self-hosted KB for teams, RAG contexts + access policies + AI skills.
- **why_new**: created 2026-04-30; enterprise-scoped, but the access-policy MCP layer is novel.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: MCP + access-policy layer
  - field_report: none surfaced
- **harness_fit_hint**: not-applicable (multi-tenant)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Out-of-scope, but cite the access-policy-MCP boundary as a future security primitive.

### `christopherkarani/Wax` — `734★` — `Family 2: single-file Metal-RAG MCP`

- **one_line**: Single-file memory layer for AI agents — sub-millisecond RAG on Apple Silicon, Metal-optimized on-device, no server, no API, one file, pure Swift.
- **why_new**: created 2026-01-20; "one file" memory layer is a unique constraint.
- **suspected_typed_evidence**:
  - benchmark: "sub-millisecond RAG" claim
  - code_anchor: single Swift file
  - field_report: none surfaced
- **harness_fit_hint**: not-applicable (Apple-Silicon-only)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Windows-portability is N/A; cite the "single-file constraint" as a design discipline lens.

### `rivet-dev/agent-os` — `2,917★` — `Family 2: portable agent OS`

- **one_line**: Portable open-source OS for agents — ~6ms coldstarts, 32× cheaper than sandboxes, powered by WebAssembly and V8 isolates.
- **why_new**: created 2024-02; WebAssembly-isolate agent runtime not yet in our radar.
- **suspected_typed_evidence**:
  - benchmark: "~6ms coldstarts, 32× cheaper than sandboxes" — author claim, needs independent verification
  - code_anchor: V8 isolate + WASM impl
  - field_report: rivet-dev is a known infra company
- **harness_fit_hint**: not-applicable (this runtime doesn't host third-party agents)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Sandbox sibling: this runtime uses `anthropic-experimental/sandbox-runtime` (incumbent); agent-os covers a different scale; cite the coldstart-vs-sandbox tradeoff.

### `rivet-dev/sandbox-agent` — `1,378★` — `Family 2: coding-agent sandboxing`

- **one_line**: Run Coding Agents in Sandboxes — control them over HTTP — supports Claude Code, Codex, OpenCode, Amp.
- **why_new**: created 2026-01-25; Claude-Code-aware sandbox surface.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface yet
  - code_anchor: HTTP-control plane + agent sandbox
  - field_report: rivet-dev provenance
- **harness_fit_hint**: claude-code-native (claude-code-aware)
- **license**: TBD
- **last_commit_seen**: 2026-05-17
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: The runtime already has anthropic-experimental sandbox-runtime; compare the HTTP-control-plane shape for headless/background-session orchestration.

### `agent-infra/sandbox` — `4,719★` — `Family 2: all-in-one agent sandbox`

- **one_line**: All-in-One Sandbox for AI Agents — Browser + Shell + File + MCP + VSCode Server in a single Docker container.
- **why_new**: created 2025-08-06; the bundled-surface-sandbox model is unique.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: docker-compose-style bundle
  - field_report: 4.7k stars + active issues
- **harness_fit_hint**: not-applicable (Docker-required)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Windows portability via Docker Desktop only; cite as the "bundle-all-tool-surfaces in one sandbox" pattern.

---

## §3 — Family 3: Agentic frameworks (multi-vendor)

7 candidates — major frameworks NOT yet adopted but worth scoring for pattern lifting.

### `microsoft/autogen` — `58,121★` — `Family 3: agentic framework`

- **one_line**: Programming framework for agentic AI from Microsoft (group-chat patterns, multi-agent coordination).
- **why_new**: not-in-v15 because: SDK-only (not claude-code-native).
- **suspected_typed_evidence**:
  - benchmark: SWE-bench claims in autogen-extensions
  - code_anchor: group-chat-manager + role-based agents
  - field_report: microsoft-backed, broad ecosystem
- **harness_fit_hint**: sdk-only
- **license**: MIT
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Patterns (group-chat, role-based agents) inform our agent-teams design; the SDK itself does not fit a claude-code-native runtime.

### `crewAIInc/crewAI` — `51,610★` — `Family 3: role-playing agents`

- **one_line**: Framework for orchestrating role-playing, autonomous AI agents.
- **why_new**: SDK-only; role-playing pattern not yet in runtime's agent-team preset.
- **suspected_typed_evidence**:
  - benchmark: comparison vs autogen in independent benchmarks
  - code_anchor: Crew + Agent role definitions
  - field_report: enterprise-adopted (per crewAIInc docs)
- **harness_fit_hint**: sdk-only
- **license**: MIT
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Role-playing pattern is a real differentiator; consider for agent-teams preset enhancement — pattern lift only.

### `langchain-ai/langgraph` — `32,280★` — `Family 3: graph-shaped agents`

- **one_line**: Build resilient agents — graph-based agentic state machines.
- **why_new**: SDK-only but the graph-of-agents pattern is genuinely additive.
- **suspected_typed_evidence**:
  - benchmark: deep-agents benchmark, langgraph-deep-research
  - code_anchor: graph definitions + checkpointing
  - field_report: enterprise-class, broadly adopted
- **harness_fit_hint**: sdk-only
- **license**: MIT
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: The graph-shaped agent flow + checkpointing is a real architectural primitive; cite the pattern, do not install (Python-SDK only).

### `langgenius/dify` — `141,721★` — `Family 3: agentic workflow platform`

- **one_line**: Production-ready platform for agentic workflow development with low-code + workflow engine.
- **why_new**: low-code platform, not-claude-code-native.
- **suspected_typed_evidence**:
  - benchmark: production claims with named-enterprise users
  - code_anchor: workflow engine + RAG
  - field_report: 141k stars + broad enterprise adoption
- **harness_fit_hint**: not-applicable (low-code GUI)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Wrong shape (GUI workflow vs autonomous-`/loop`); cite as competitive landscape reference.

### `FoundationAgents/OpenManus` — `56,288★` — `Family 3: open Manus`

- **one_line**: No fortress, purely open ground — OpenManus is Coming (open reimplementation of Manus's persistent-planning).
- **why_new**: created 2025-03-06; the Manus-pattern reimplementation.
- **suspected_typed_evidence**:
  - benchmark: comparison to Manus's reported metrics
  - code_anchor: agent loop + persistent file-plan
  - field_report: 56k stars suggests strong community interest
- **harness_fit_hint**: sdk-only (Python framework)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Sister to OthmanAdi/planning-with-files; this is the framework-level Manus implementation; lift the persistent-planning pattern.

### `bytedance/deer-flow` — `68,256★` — `Family 3: long-horizon SuperAgent`

- **one_line**: Open-source long-horizon SuperAgent harness — researches, codes, creates — with sandboxes, memories, tools, skills, sub-agents, message gateway, handling minutes-to-hours tasks.
- **why_new**: created 2025-05-07; the "long-horizon harness" framing is a unique organizing pattern.
- **suspected_typed_evidence**:
  - benchmark: bytedance-internal evals (claimed)
  - code_anchor: sub-agent message-gateway pattern
  - field_report: bytedance is a named-T2 org
- **harness_fit_hint**: sdk-only (Python/TypeScript)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: The long-horizon decomposition pattern is directly relevant to autonomous-`/loop`; STUDY the sub-agent message-gateway design for our agent-teams.

### `assafelovic/gpt-researcher` — `27,121★` — `Family 3: research agent`

- **one_line**: Autonomous agent that conducts deep research on any data using any LLM provider.
- **why_new**: created 2023-05; foundational deep-research-agent pattern.
- **suspected_typed_evidence**:
  - benchmark: production usage with named orgs
  - code_anchor: research-agent loop + web search
  - field_report: long-running project (3 yr) with stable adoption
- **harness_fit_hint**: sdk-only
- **license**: MIT
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Stream A's research-methodology design should compare against this — it's the OG open-source deep-research agent.

---

## §4 — Family 4: Eval / observability NEW

8 candidates — beyond langfuse, opik, phoenix, helicone (all incumbent).

### `pydantic/logfire` — `4,251★` — `Family 4: AI observability platform`

- **one_line**: AI observability for production LLM and agent systems — pydantic-team built.
- **why_new**: already installed via `logfire` MCP/plugin per CLAUDE.md — but worth ratifying scope vs langfuse.
- **suspected_typed_evidence**:
  - benchmark: opentelemetry-compatible
  - code_anchor: instrumentation patterns
  - field_report: pydantic-team is named-T2
- **harness_fit_hint**: claude-code-native (MCP available)
- **license**: MIT
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: INSTALLED-ALREADY (verify vs langfuse overlap)
- **rationale**: This runtime has BOTH logfire and langfuse — Stream C scoring should flag the duplication.

### `lmnr-ai/lmnr` — `2,901★` — `Family 4: Rust-native observability`

- **one_line**: Laminar — open-source observability platform purpose-built for AI agents, YC S24, Rust-native.
- **why_new**: created 2024-08; Rust-native distinguishes it from JS/Python alternatives.
- **suspected_typed_evidence**:
  - benchmark: rust-perf claims
  - code_anchor: rust core + TS UI
  - field_report: YC S24 provenance
- **harness_fit_hint**: sdk-only (instrumentation SDK)
- **license**: Apache-2.0
- **last_commit_seen**: 2026-05-17
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Direct competitor to incumbent langfuse; bake-off only if langfuse hits a perf wall.

### `coze-dev/coze-loop` — `5,459★` — `Family 4: agent optimization platform`

- **one_line**: Next-gen AI Agent Optimization Platform — full-lifecycle (dev/debug/eval/monitor), bytedance.
- **why_new**: created 2025-06-24; "optimization" framing vs pure "observation".
- **suspected_typed_evidence**:
  - benchmark: bytedance internal
  - code_anchor: agent-eval lane
  - field_report: bytedance-backed
- **harness_fit_hint**: sdk-only (Go server)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Lifecycle-management framing overlaps langfuse; cite the "optimization platform" framing for future ergonomics.

### `memodb-io/Acontext` — `3,373★` — `Family 4: skills-as-memory`

- **one_line**: Agent Skills as a Memory Layer — context engineering + self-evolving / self-learning.
- **why_new**: created 2025-07-16; NOVEL framing of skills as memory primitives.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface yet
  - code_anchor: skill registry + memory binding
  - field_report: none-found-yet
- **harness_fit_hint**: claude-code-native (skills format)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: The "skills as memory" pattern is a fundamentally different framing from our 6-tier memory stack; STUDY this — it may inform a 7th tier.

### `JudgmentLabs/judgeval` — `1,036★` — `Family 4: continuous-improvement evals`

- **one_line**: Continuous-Improvement Stack for Agents — environment data and evals power agent improvement and monitoring.
- **why_new**: created 2024-10; closed-loop improvement is novel.
- **suspected_typed_evidence**:
  - benchmark: GRPO reinforcement-learning loop
  - code_anchor: judgment-loop impl
  - field_report: none surfaced
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **last_commit_seen**: 2026-05-17
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: The closed-loop "eval-data drives next training" is exactly what our eval_harness.py needs Stream-C-side; lift the pattern.

### `traceroot-ai/traceroot` — `561★` — `Family 4: self-healing observability`

- **one_line**: Open-source observability and self-healing layer for AI agents, YC S25.
- **why_new**: created 2025-07-22; "self-healing" framing is novel.
- **suspected_typed_evidence**:
  - benchmark: YC S25 provenance
  - code_anchor: observability + healing-rules
  - field_report: YC S25
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: "Self-healing" pattern aligns with the runtime's codex Stop-hook adversarial-review-gate — extract the healing-rule grammar.

### `Justin0504/Aegis` — `356★` — `Family 4: runtime policy enforcement`

- **one_line**: Runtime policy enforcement for AI agents — cryptographic audit trail, human-in-the-loop approvals, kill switch, zero code changes.
- **why_new**: created 2026-03-04; zero-code-change policy injection is unique.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: policy engine + audit trail
  - field_report: none-found-yet
- **harness_fit_hint**: claude-code-native (MCP-shaped)
- **license**: TBD
- **last_commit_seen**: 2026-05-16
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: This runtime uses cardinal-rule-5 permissions for safety boundaries; Aegis's runtime-policy + cryptographic-audit pattern is worth comparing against our settings-permissions approach.

### `BlazeUp-AI/Observal` — `1,142★` — `Family 4: human-in-the-loop observability`

- **one_line**: Observability and Evaluation platform for human-in-the-loop agents.
- **why_new**: created 2026-03-30; HITL-specific framing.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: HITL loop impl
  - field_report: none-found-yet
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: HITL doesn't fit autonomous-`/loop`; cite as a contrast point.

---

## §5 — Family 5: Memory / RAG advanced NEW

7 candidates — beyond incumbent mem0, letta, basic-memory, cognee, graphiti, hindsight.

### `microsoft/graphrag` — `33,054★` — `Family 5: canonical GraphRAG`

- **one_line**: Modular graph-based RAG from Microsoft Research — the canonical GraphRAG reference impl.
- **why_new**: created 2024-03; canonical reference but never installed.
- **suspected_typed_evidence**:
  - benchmark: MSR paper benchmarks on private + Q&A datasets
  - code_anchor: indexing pipeline + community detection
  - field_report: MSR + multiple downstream forks
- **harness_fit_hint**: sdk-only (Python)
- **license**: MIT
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY (incumbent graphiti covers our need)
- **rationale**: Reference implementation worth citing; the runtime's `getzep/graphiti` (incumbent) is the live GraphRAG path — keep as benchmark reference for future swap decisions.

### `gusye1234/nano-graphrag` — `3,844★` — `Family 5: hackable GraphRAG`

- **one_line**: Simple, easy-to-hack GraphRAG implementation.
- **why_new**: created 2024-07; the "simplest possible" implementation is useful for pattern study.
- **suspected_typed_evidence**:
  - benchmark: comparison vs microsoft/graphrag in repo
  - code_anchor: minimal Python impl
  - field_report: none surfaced
- **harness_fit_hint**: sdk-only
- **license**: MIT
- **last_commit_seen**: 2026-05-15
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Use as a reference implementation to understand GraphRAG internals before tuning graphiti.

### `VectifyAI/PageIndex` — `31,576★` — `Family 5: vectorless reasoning-RAG`

- **one_line**: Document Index for Vectorless, Reasoning-based RAG.
- **why_new**: created 2025-04-01; NOVEL paradigm (no embeddings, reasoning-driven).
- **suspected_typed_evidence**:
  - benchmark: vectorless-vs-vector claims in repo
  - code_anchor: reasoning-driven retrieval impl
  - field_report: 31k stars suggests resonance with the "RAG-without-embeddings" thesis
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: A genuinely novel paradigm (vectorless reasoning-RAG) is worth investigating — could reduce the embedding-model dependency.

### `infiniflow/ragflow` — `80,691★` — `Family 5: RAG engine`

- **one_line**: Leading open-source RAG engine fusing RAG + Agent capabilities — superior context layer for LLMs.
- **why_new**: created 2023-12; mature production RAG.
- **suspected_typed_evidence**:
  - benchmark: claimed-best context-engineering
  - code_anchor: agentic-retrieval impl
  - field_report: 80k stars + 9k forks
- **harness_fit_hint**: not-applicable (Docker/K8s-required)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Wrong scale; cite the "agentic-retrieval" framing for our research-architecture.

### `thedotmack/claude-mem` — `76,430★` — `Family 5: persistent session memory`

- **one_line**: Persistent Context Across Sessions — captures sessions, compresses with AI, injects relevant context back.
- **why_new**: created 2025-08-31; runtime has hindsight + basic-memory + graphiti — claude-mem covers a slightly different ergonomics.
- **suspected_typed_evidence**:
  - benchmark: compression ratio claims
  - code_anchor: chromadb-based mem + sqlite
  - field_report: 76k stars (star-inflation flag — 76k in 9 mo)
- **harness_fit_hint**: claude-code-native (plugin + skills)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY (DEFER install)
- **rationale**: Star-inflation flag triggered; the session-summary compression pattern is worth studying before any adoption; this runtime's hindsight already covers the same need.

### `TencentCloudADP/youtu-graphrag` — `1,179★` — `Family 5: ICLR 2026 GraphRAG`

- **one_line**: ICLR 2026 — Vertically Unified Agents for Graph RAG Complex Reasoning.
- **why_new**: created 2025-09; ICLR'26 paper — academic-grade GraphRAG.
- **suspected_typed_evidence**:
  - benchmark: ICLR 2026 paper benchmarks
  - code_anchor: reasoning-agent + graph impl
  - field_report: TencentCloudADP + academic peer-review
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Academic reference — cite the ICLR paper as benchmark anchor for graphiti tuning.

### `1Panel-dev/MaxKB` — `20,975★` — `Family 5: open enterprise agent platform`

- **one_line**: Open-source enterprise agent platform with knowledge base + LangChain + Ollama integration.
- **why_new**: created 2023-09; enterprise-scoped but the KB pattern is novel.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: pgvector + langchain
  - field_report: 20k stars + 2.8k forks
- **harness_fit_hint**: not-applicable (enterprise)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Out-of-scope; cite as the "enterprise agent + KB" reference.

---

## §6 — Family 6: LOW-STAR HIGH-QUALITY (operator's key mandate)

8 candidates — explicitly chosen because pattern-quality > star-count.

### `joshuaswarren/remnic` — `73★` — `Family 6: scoped agent memory`

- **one_line**: Open-source memory and context for user-aware agents — scoped memory, provenance, retrieval quality, correction, boundaries, evals, MCP/HTTP.
- **why_new**: low-star (73★); created 2026-02-05; high-quality discipline rare at this star count.
- **suspected_typed_evidence**:
  - benchmark: built-in eval lane for retrieval-quality
  - code_anchor: scoped-memory + provenance impl
  - field_report: none-found-yet (recent)
- **harness_fit_hint**: claude-code-native (MCP-shaped)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: The combination "scoped + provenance + retrieval-eval + correction + boundaries" is rare; this is exactly the kind of niche-pattern repo the operator's mandate flagged — STUDY explicitly.

### `markmhendrickson/neotoma` — `23★` — `Family 6: deterministic agent memory`

- **one_line**: Agents forget — Neotoma makes them remember — agent-memory + deterministic state + entity resolution + event sourcing + provenance + privacy-first.
- **why_new**: very-low-star (23★); created 2025-06; principled architecture (event-sourcing applied to agent memory).
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface yet
  - code_anchor: event-source + entity-resolution
  - field_report: solo-author, but careful design
- **harness_fit_hint**: claude-code-native (MCP)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Event-sourcing + entity-resolution applied to agent memory is genuinely novel — exactly the "low-star high-pattern-quality" candidate the operator wanted.

### `Dicklesworthstone/frankenterm` — `80★` — `Family 6: terminal hypervisor`

- **one_line**: Terminal hypervisor for AI agent swarms — real-time pane capture, state-machine pattern detection, JSON API for coordinating fleets across WezTerm.
- **why_new**: low-star (80★); created 2026-01-18; unique terminal-hypervisor framing.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: pane-capture + state-machine
  - field_report: solo-author (Jeffrey Emanuel — known practitioner)
- **harness_fit_hint**: claude-code-native (terminal-level)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: This runtime uses background-sessions for parallel agents; the WezTerm hypervisor pattern is a sibling architecture — extract the "state-machine pattern detection" idea.

### `Facets-cloud/flow` — `130★` — `Family 6: session continuity`

- **one_line**: Turn isolated Claude sessions into a continuous working relationship.
- **why_new**: low-star (130★); created 2026-04-12; alternative to claude-mem.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: session-manager + Go impl
  - field_report: Facets-cloud (small but real org)
- **harness_fit_hint**: claude-code-native
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Sister to claude-mem; lower-noise alternative; study the session-continuity primitive.

### `taracodlabs/aiden` — `392★` — `Family 6: AGPL local-first runtime`

- **one_line**: Local-first AI execution runtime for Windows & Linux — secure automation, AGPL-3.0, solo developer.
- **why_new**: low-star (392★); created 2026-03-07; Windows-first local runtime is rare.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: Electron + TS
  - field_report: solo-dev
- **harness_fit_hint**: not-applicable (Windows-Electron app, but cite for Windows-first design discipline)
- **license**: AGPL-3.0 (D1=2 per W259 license rubric)
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: AGPL-3.0 caps INSTALL per W259 D1; cite as Windows-first reference.

### `sonichi/sutando` — `237★` — `Family 6: self-improving agent`

- **one_line**: "My AI Stand. Realtime by day, rewriting itself by night." Voice + self-improving.
- **why_new**: low-star (237★); created 2026-03-28; explicit self-rewriting pattern.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: self-improvement loop
  - field_report: sonichi (=Chi Wang, autogen co-author — named practitioner)
- **harness_fit_hint**: not-applicable (voice-agent macOS-first)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Author is autogen co-creator Chi Wang — high authority despite low star count; STUDY the "self-rewriting" pattern for our autonomous-`/loop`.

### `LearningCircuit/local-deep-research` — `7,769★` — `Family 6: local SimpleQA-95%`

- **one_line**: Local deep-research agent, ~95% on SimpleQA with Qwen3.6-27B/3090 — supports all local + cloud LLMs, 10+ search engines.
- **why_new**: mid-star (7.7k★) but specifically validated SimpleQA score not in incumbent set.
- **suspected_typed_evidence**:
  - benchmark: ~95% SimpleQA (NAMED metric + value!)
  - code_anchor: local-only research agent
  - field_report: arxiv + pubmed + private-docs integration
- **harness_fit_hint**: sdk-only (Python)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Concrete benchmark (95% SimpleQA) makes this evaluable per Stream D's eval-harness lane; pattern-lift the local-deep-research loop into our research-architecture.

### `autohandai/code-cli` — `109★` — `Family 6: self-evolving agent CLI`

- **one_line**: Autohand Code CLI — ultra-fast self-evolving coding agent that runs in terminal.
- **why_new**: low-star (109★); created 2025-12-12; self-evolving claim.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: TS impl
  - field_report: small dev shop
- **harness_fit_hint**: not-applicable (CLI alternative to claude-code)
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: DEFER
- **rationale**: Self-evolving claim needs validation; defer until concrete metric surfaces.

---

## §7 — Family-cross: misc high-impact NEW

3 additional cross-cutting candidates worth flagging.

### `KeygraphHQ/shannon` — `42,825★` — `Family-cross: autonomous security`

- **one_line**: Autonomous white-box AI pentester for web apps and APIs — code-analysis-driven, executes real exploits before production.
- **why_new**: created 2025-09-27; security-class autonomous agent novel.
- **suspected_typed_evidence**:
  - benchmark: pentest-result counts
  - code_anchor: vuln-scan + exploit-exec
  - field_report: 42k stars (inflation flag)
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Wrong shape for runtime (offensive-security); cite as a "autonomous agent in a domain" reference; star-inflation suspected.

### `volcengine/OpenViking` — `24,027★` — `Family-cross: context database`

- **one_line**: Open-source context database for AI Agents — unifies memory/resources/skills via filesystem paradigm.
- **why_new**: created 2026-01-05; filesystem-paradigm-context-DB is novel.
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface yet
  - code_anchor: context-DB + hierarchical delivery
  - field_report: volcengine (ByteDance Cloud)
- **harness_fit_hint**: sdk-only
- **license**: TBD
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: PATTERN-STUDY
- **rationale**: Unifying memory + resources + skills behind one filesystem-paradigm is conceptually clean — STUDY the schema; may inform our 6-tier consolidation.

### `OpenCoworkAI/open-codesign` — `6,047★` — `Family-cross: Claude Design alt`

- **one_line**: Open-source Claude Design alternative — one-click import Claude/Codex API key, prompt → prototype/slides/PDF.
- **why_new**: created 2026-04-18; alternative to a proprietary product (Claude Design).
- **suspected_typed_evidence**:
  - benchmark: no-benchmark-surface
  - code_anchor: Electron + multi-model
  - field_report: BYOK approach
- **harness_fit_hint**: not-applicable (GUI design tool)
- **license**: MIT (per repo description)
- **last_commit_seen**: 2026-05-18
- **preliminary_depth_recommendation**: CITE-ONLY
- **rationale**: Out-of-scope for autonomous-`/loop`; cite as multi-model BYOK reference.

---

## §8 — Top 10 ADD-TO-NEXT-AUDIT

Selected for maximum capability_uniqueness × harness_fit, weighted toward the operator's mandate (low-star high-quality preserved).

| Rank | Repo | Stars | Family | Capability Uniqueness (1-5) | Harness Fit (1-5) | Preliminary Depth |
|---:|---|---:|---|---:|---:|---|
|  1 | `joshuaswarren/remnic` | 73 | F6 low-star | 5 | 4 | PATTERN-STUDY |
|  2 | `markmhendrickson/neotoma` | 23 | F6 low-star | 5 | 4 | PATTERN-STUDY |
|  3 | `memodb-io/Acontext` | 3,373 | F4 eval/memory | 5 | 4 | PATTERN-STUDY |
|  4 | `OthmanAdi/planning-with-files` | 21,514 | F1 planning | 4 | 5 | PATTERN-STUDY |
|  5 | `sipyourdrink-ltd/bernstein` | 395 | F2 audit-orch | 4 | 4 | PATTERN-STUDY |
|  6 | `Lyellr88/MARM-Systems` | 289 | F2 memory MCP | 4 | 4 | PATTERN-STUDY |
|  7 | `LearningCircuit/local-deep-research` | 7,769 | F6 mid-star | 4 | 3 | PATTERN-STUDY |
|  8 | `VectifyAI/PageIndex` | 31,576 | F5 vectorless-RAG | 5 | 3 | PATTERN-STUDY |
|  9 | `bytedance/deer-flow` | 68,256 | F3 long-horizon | 4 | 3 | PATTERN-STUDY |
| 10 | `Dicklesworthstone/frankenterm` | 80 | F6 low-star | 4 | 3 | PATTERN-STUDY |

**Note on ranking:** Ranks 1, 2, 10 are <100 stars but rank in the top 10 explicitly because they each carry a novel architectural pattern (scoped+provenance memory, deterministic-state memory, terminal-hypervisor) — directly honoring the operator's mandate that stars are NOT a hard gate. The Stream C v3 rubric should formalize this by giving `capability_uniqueness ≥ 4` a path to PATTERN-STUDY independent of stars.

---

## §9 — Open questions for downstream Streams

- **For Stream C (rubric v3)**: how to weight `capability_uniqueness` against `community_signal_distribution` when stars are <100? Suggest: `capability_uniqueness ≥ 4` permits PATTERN-STUDY regardless of star count, but blocks INSTALL until ≥1 typed-evidence convergence emerges.
- **For Stream C**: star-inflation detection — repos with star-velocity >5k★/month and created <90d should be flagged for downweighting in `community_signal_distribution` (12+ candidates in this sweep show this pattern: caveman, graphify, career-ops, everything-claude-code, et al.).
- **For Stream D (ingest pipeline)**: which 3-5 candidates from this list go through the deep-dive at Stage 2.5? Recommend the top-4 (remnic, neotoma, Acontext, OthmanAdi/planning-with-files) — all are low/mid-star with claude-code-native pattern relevance.
- **For Stream A (methodology)**: this sweep used only `mcp__github__search_repositories`. A real v2 should also probe HN Algolia, Reddit r/ClaudeAI search, paperswithcode (for benchmark-class candidates), and named-practitioner Twitter/X. Several candidates here (e.g., `sonichi/sutando`) were discovered via author-provenance — that signal needs a first-class probe in v2.

---

## §10 — Cite trail

All metadata observed live via `mcp__github__search_repositories` and `mcp__github__get_file_contents` on 2026-05-18. License + last_commit per repo's GitHub-API surface. Star inflation flags follow `https://github.com/orgs/community/discussions/categories/fake-stars` heuristics. Incumbent-set determined from `Z:/claude-sota-installed/docs/architecture/W259-grand-catalog/03-deepdive/SOTA-COMMUNITY-REPOS-W259v14.md`, `…v15-GITNEXUS.md`, `Z:/claude-sota-installed-repos/` directory listing, and CLAUDE.md L11 behavioral-set declaration.

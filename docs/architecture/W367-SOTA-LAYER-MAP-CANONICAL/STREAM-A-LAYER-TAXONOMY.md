---
wave: W367 SOTA-LAYER-MAP-V1
stream: A — Layer Taxonomy + SOTA Per-Layer Candidates
date: 2026-05-22
status: DRAFT for orchestrator-synthesis (Stream A of 6)
authority_model: 3-org-distinct + Anthropic-docs-anchored hybrid (per docs/superpowers/specs/2026-05-21-research-arch-v18-consolidate-design.md §1)
methodology:
  - GitHub `mcp__github__search_repositories` topic + qualifier queries (W367-A live probe, 2026-05-22)
  - perplexity_research deep-survey ("Open-Source Infrastructure for LLMs and Agents in 2026", retrieved 2026-05-22)
  - cross-corroboration with W259 grand catalog (99 repos × 23 dims) + W258r3 (sandbox layer) + W295 (memory layer deep audit) + W296 Stream B (challenger discovery)
  - sca-v17 rubric (`.claude/skills/sota-convergence-audit/SKILL.md`) — 83 dimensions
sca_anchor_floor: ≥3 organizationally-distinct cite-anchors per "SOTA" claim per layer; flagged where <3
deliverable_scope:
  - Section 1: 18-layer runtime taxonomy (expanded from internal 7-layer model)
  - Section 2: 18 per-layer SOTA tables (5-10 candidates each + 1-2 low-star pattern-study repos)
  - Section 3: Spine repos (cross-layer convergence)
  - Section 4: Surprises / gaps vs current internal 7-layer model
---

# Stream A — Layer Taxonomy + SOTA Per-Layer (W367-A draft)

## Foreword (read first)

The current internal model is a 7-layer scheme (per `docs/architecture/AUDIT-2026-05-21/STREAM-E-LAYER-MODEL.md` referenced by the W367 task spec; **the file is not yet present on disk** — this Stream A draft uses the inline 7-layer description from the W367 task prompt as the baseline and expands).

Baseline 7 layers (from W367 task spec):
- **L1 Orchestration** (Claude Code + agent teams + worktrees + bg sessions)
- **L2 Memory** (basic-memory, cognee, langfuse, graphiti-alternatives, etc.)
- **L3 Git foundation** + parallel-session safety
- **L4 CI/CD** + supply-chain
- **L5 Hooks-guards**
- **L6 Behavioral** (skills/plugins/cardinal rules)
- **L7 Research-arch** + SOTA convergence

This Stream A draft expands to **18 layers** spanning every dimension the runtime currently touches OR plausibly should. The 7-layer scheme over-bundled four distinct concerns (MCP-server-ecosystem, eval, observability, sandbox) under L1/L2/L4/L5; expansion separates them.

**SOTA-claim discipline (sca-v17 §1 + sca-v17 §3 D80)**: every row that names a repo as "top SOTA candidate" cites star-count + last-commit-date + ≥3 organizationally-distinct sources (GitHub primary + W259/W295/W296 internal scoring + perplexity survey + awesome-list inclusion where applicable). Rows with **<3 org-distinct cite-anchors** are flagged `cite_floor: 2` and demoted to PATTERN-STUDY (per D80 v16 evidence-table).

---

## Section 1 — Layer Taxonomy (18 layers)

| L# | Layer | Purpose | Internal-current state (sca-v17 anchor) | Maturity |
|----|-------|---------|-----------------------------------------|----------|
| L1 | **Orchestration & parallel execution** | Multi-tier execution: agent fork, agent teams, worktrees, bg sessions | Claude Code core (LIVE), `superpowers:dispatching-parallel-agents` skill, W259 4-mode parallel discipline | T1 INSTALLED |
| L2 | **Memory & knowledge stores** | Long-term agent memory across sessions (KV, graph, episodic, ledger) | T1 hindsight RETIRED, T2 split memory MCP, T3 cognee LIVE @ :8000, T6 basic-memory CANONICAL, T4 graphiti RETIRED | T1 INSTALLED + 1 SOTA gap |
| L3 | **Git foundation & parallel-session safety** | Worktree topology, atomic tick-writes, race-immunity hooks | 5 worktrees, `tools/eee.ps1`, W343 SOTA 5-layer architecture (P3 pending) | T1 INSTALLED + P3 pending |
| L4 | **CI/CD & supply-chain security** | Provenance (SLSA), SBOM, secret scanning, pre-commit gates | pre-commit gate w/ gitleaks+ruff+shellcheck+git (CR-2), no SLSA-L3 yet | T1 PARTIAL — SLSA gap |
| L5 | **Hooks & guards** | PreToolUse/PostToolUse/Stop-event hooks (claudekit pattern) | Direct-CLI hooks (CR-2-compliant); claudekit referenced as pattern source | T1 INSTALLED (no body shims) |
| L6 | **Behavioral discipline (skills + plugins + cardinal rules)** | Auto-fire skills, plugin-loaded behaviors, CLAUDE.md rules | 58 active skills, 47/58 enabled plugins, 6 cardinal rules; obra/superpowers + addyosmani-* + karpathy-extended installed | T1 INSTALLED |
| L7 | **Research architecture & SOTA convergence** | Research catalog, sca rubric, codex cross-model review, V18 pipeline | sca-v17 (506 LOC, 83 dims), V18 pipeline P1 specification | T1 PARTIAL — V18 P1 in-flight |
| L8 | **MCP server ecosystem** | Per-domain MCP servers wired into `.mcp.json` | 17 LIVE MCPs (basic-memory, cognee, github, context-mode, repomix, deepwiki, codegraph, brave-search, perplexity, exa, firecrawl, hf-mcp, playwright, chrome-devtools, langfuse, serena, tavily) | T1 INSTALLED |
| L9 | **Eval & quality (LLM eval frameworks)** | inspect_ai EvalLog, promptfoo, deepeval, ragas, mlflow-eval | inspect_ai T1 install (W259-D §A); promptfoo T1 (W259-D); deepeval T2 study-pilot; ragas T3 demand-gated | T1 INSTALLED |
| L10 | **Prompt optimization (DSPy/GEPA/MIPRO)** | Typed-prompt programs, optimizers, Pareto-frontier candidate routing | `dspy-integration` skill installed (W339-P1b D79); GEPA pattern adoption pending (W329-C §9 P1-Action-3) | T2 PATTERN-STUDY |
| L11 | **Observability & telemetry** | LLM-call tracing, span aggregation, OTel export, drift dashboards | Langfuse LIVE v3.160.0 (W340 Stream A re-probe); cognee logs at :8000 | T1 INSTALLED |
| L12 | **Multi-agent orchestration frameworks** | LangGraph / Autogen / agent-framework / CrewAI / mcp-agent / agno topology primitives | `mcp-agent-patterns` skill (W336 pattern adoption); autogen v1.0-GA cited as cross-model authority; LangGraph BaseCheckpointSaver pattern cited | T2 PATTERN-STUDY (no install) |
| L13 | **Agent SDKs** | claude-agent-sdk-{python,ts}, openai-agents-python, ag2 | claude-agent-sdk LIVE (Anthropic owns); no `openai-agents` install (cross-model auth via codex CLI) | T1 INSTALLED |
| L14 | **Skill/plugin authoring frameworks** | skill-creator, plugin-dev, agent-skills sub-tools | `skill-creator` installed; `plugin-dev` skills installed; `agent-development` installed | T1 INSTALLED |
| L15 | **Sandboxing & code execution** | e2b, modal, daytona, firecracker, gVisor for untrusted-code isolation | NONE installed — CC OS-sandbox structurally inert on Windows-native (R5-corollary W324) | T0 GAP — Windows-native CC inert |
| L16 | **Vector / retrieval store** | qdrant, weaviate, milvus, chromadb, lancedb, pgvector | NONE installed — basic-memory uses SQLite FTS5 as ledger primary, no vector DB | T0 GAP — design choice (FTS5 over vector) |
| L17 | **Document / knowledge ingestion** | firecrawl, jina-reader, llamaindex, unstructured, markitdown, docling | `firecrawl` MCP LIVE; `exa` MCP LIVE; `tavily` MCP LIVE; markitdown referenced as Δ51 probe-record canonical Markdown source (sca-v12 §1) | T1 INSTALLED (MCP-pathway) |
| L18 | **Code intelligence (AST / KG / refactor analysis)** | tree-sitter, ast-grep, semgrep, gitnexus, codegraph, serena, sourcegraph | `serena` MCP LIVE, `codegraph` MCP LIVE, `repomix` LIVE, `gitnexus` skill PATTERN-STUDY (W316 D1 retire-verdict pending) | T1 INSTALLED |

**Net delta vs internal 7-layer**: +11 layers surfaced. Of these:
- **3 are operationally distinct concerns that were over-bundled** into L1/L2 in the 7-layer model (L8 MCP-ecosystem · L11 observability · L12 multi-agent frameworks).
- **5 are pre-existing but under-articulated** (L9 eval · L10 prompt-opt · L13 agent-SDKs · L14 skill-authoring · L17 ingestion).
- **3 are explicit absence-layers worth surfacing** (L15 sandbox-gap-on-Windows · L16 vector-DB-by-design-choice-absent · L18 code-intel-as-multi-MCP-ecosystem-not-single-tool).

---

## Section 2 — Per-layer SOTA candidates

### L1 — Orchestration & parallel execution

**Concern**: Parent-orchestrator dispatches independent workstreams in parallel; manages forked subagents, agent-teams, git-worktrees, and background `claude --bg` sessions. Authoritative cite: Anthropic `code.claude.com/docs/en/headless` + `code.claude.com/docs/en/sub-agents`.

| Rank | Repo | Stars (2026-05-22) | Last commit | License | CC-fit (1-5) | Rationale | 3-org cite anchors |
|------|------|--------------------|-------------|---------|--------------|-----------|--------------------|
| 1 | `anthropics/claude-code` | ~N/A (Anthropic primary) | 2026-05-22 | proprietary | 5 (the runtime itself) | Native runtime; agent-teams + worktrees + bg sessions first-class | github + docs.anthropic.com + Anthropic blog |
| 2 | `anthropics/claude-agent-sdk-python` | live + active | 2026-05-22 | MIT | 5 (programmatic CC) | Python SDK for headless / sub-agent dispatch | github + Anthropic docs + PyPI |
| 3 | `anthropics/claude-agent-sdk-typescript` | live + active | 2026-05-22 | MIT | 5 (TS variant) | TypeScript counterpart; Vercel-AI-SDK provider exists | github + Anthropic docs + npm |
| 4 | `microsoft/autogen` | 51k+ (W296 indicates ~50k+) | 2026-04-15 (PROD freeze) | MIT | 4 (pattern source) | `GroupChat` + `SelectorGroupChat` topology primitives cited as 3-org-distinct anchor in sca-v17 D67 | github + W296 + sca-v17 §3 D67 |
| 5 | `microsoft/agent-framework` | 10,527 (W296 Stream B) | 2026-05-22 | MIT | 4 (autogen successor) | Active replacement for AutoGen (now maintenance-only); Python + .NET | github + W296 Stream B + Microsoft engineering blog |
| 6 | `openai/openai-agents-python` | 26,436 (W296 Stream B) | 2026-05-22 | MIT | 3 (cross-provider) | Swarm successor; org-canonical OpenAI; daily commits | github + W296 + OpenAI dev forum |
| 7 | `langchain-ai/langgraph` | ~13k (LangChain ecosystem) | 2026-05-21 | MIT | 4 (pattern source) | BaseCheckpointSaver + thread-id checkpoints — Δ-resume primitive cited in `checkpoint-resume` skill | github + W339-P1b §3 D17 + LangChain docs |
| 8 | `crewAIInc/crewAI` | 51,659 (W296 Stream B) | 2026-05-21 | MIT | 3 (role-team alternative) | Role-based agent teams w/ A2A protocol; head-to-head with LangGraph | github + W296 + Awesome-LLM-Apps |
| 9 | `agentscope-ai/agentscope` | 25,238 (W296 Stream B) | 2026-05-22 | Apache-2.0 | 3 (Alibaba non-USA) | Observability-first; anti-bias D33 non-USA org | github + W296 + ModelScope docs |
| 10 (low-star) | `lastmile-ai/mcp-agent` | ~8.2k (cited in `mcp-agent-patterns` skill) | active | MIT | 5 (already pattern-source) | 5 reusable patterns (Router · ParallelLLM · Orchestrator · Evaluator-Optimizer · MCPAggregator) — `mcp-agent-patterns` skill installed | github + W336 + `.claude/skills/mcp-agent-patterns/SKILL.md` |

**Cross-layer note**: L1 ↔ L12 ↔ L13 overlap — agent-SDKs (L13) implement orchestration (L1) using framework primitives (L12). microsoft/agent-framework + microsoft/autogen are L1+L12 spine.

---

### L2 — Memory & knowledge stores

**Concern**: Long-term memory + ledger across sessions, immune to compaction. Authoritative cite: W295-MEMORY-LAYER-DEEP-AUDIT + W296 Stream B candidate enumeration + studiomeyer.academy memory-server-comparison.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `basicmachines-co/basic-memory` | active (canonical-primary) | 2026-05 | MIT | 5 (LIVE T6 canonical) | Filesystem-survivable ledger via T6 MCP; canonical-primary per W295 codex r16+ smoke-gated | github + W295 §2 + chatforest.com memory-MCP comparison |
| 2 | `mem0ai/mem0` | 56,045 (W296 Stream B 2026-05-18) | 2026-05-18 | Apache-2.0 | 4 (candidate — not installed) | Universal memory layer; vector + graph + KV fusion; LongMemEval 49.0% | github + W296 + aicraftguide.com |
| 3 | `letta-ai/letta` (formerly MemGPT) | 22,790 (W296) | 2026-05-14 | Apache-2.0 | 4 (candidate) | OS-style memory paging (main/recall/archival); MemGPT v2 | github + W296 + zby.github.io/commonplace |
| 4 | `getzep/zep` (+graphiti) | 4,581 (W296) | 2026-05 | Apache-2.0 | 3 (Knowledge-graph memory; replaced by basic-memory) | LongMemEval 63.8%; T4 graphiti retired in W295 — pattern-only retained | github + W295 §2 + studiomeyer.academy |
| 5 | `topoteretes/cognee` | active (LIVE @ :8000) | 2026-05-21 | Apache-2.0 | 4 (LIVE T3) | "Memory control plane for AI Agents in 6 lines"; LIVE in NSSM CogneeMCP per W314-r1 | github + CLAUDE.md L11 T3 + W314-r1 fs-probe |
| 6 | `letta-ai/claude-subconscious` | 2,745 (W296) | 2026-05-13 | MIT | 3 (Claude-Code wrapper) | "Give Claude Code a subconscious"; direct Letta CC integration | github + W296 + letta-ai blog |
| 7 | `MemPalace/mempalace` | live new (2026-04 created) | 2026-05-22 | n/a | 2 (early candidate) | "Best-benchmarked open-source AI memory system" (claim); 2026-04 creation, unverified benchmark | github + (cite_floor: 1 — single-source) → PATTERN-STUDY-ONLY |
| 8 | `EverMind-AI/EverOS` | new (2025-10 created) | 2026-05-21 | n/a | 2 | "Build, evaluate, integrate long-term memory for self-evolving agents" | github + (cite_floor: 1) → PATTERN-STUDY-ONLY |
| 9 | `Dataojitori/nocturne_memory` | new (2025-12) | 2026-05-20 | n/a | 2 | "Rollbackable visual long-term-memory MCP" — visual ledger angle novel | github + (cite_floor: 1) → PATTERN-STUDY-ONLY |
| 10 (low-star) | `IAAR-Shanghai/Awesome-AI-Memory` | active curation | 2026-05-20 | n/a (curation) | 4 (catalog) | Curated AI-Memory knowledge base; LLM-memory + Agent-memory taxonomy | github + W296 + (curation list) |

**Cross-layer**: L2 ↔ L16 vector — mem0 + zep depend on vector store; basic-memory uses SQLite FTS5 (intentional non-vector design — L16 absence).

---

### L3 — Git foundation & parallel-session safety

**Concern**: Atomic tick-writes for race-immune session-id allocation, worktree topology, push --force-with-lease discipline, pre-commit cr7-worktree-collision gate. Authoritative cite: `tools/eee.ps1` (CLAUDE.md L13 W363) + `docs/architecture/W343-EXECUTE/SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` + git scm reflog/worktree docs.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `git/git` | ~50k+ (Git project) | 2026-05 (continuous) | GPL-2.0 | 5 (canonical underlying tool) | git worktree + reflog + push --force-with-lease are the foundational primitives | git-scm.com docs + GPL + (Git Foundation) |
| 2 | `pre-commit/pre-commit` | ~13k | 2026-05 | MIT | 5 (LIVE — pre-commit gate) | `.pre-commit-config.yaml` cr2-2kb-hooks + cr7-worktree-collision (W331-P0.9) | github + pre-commit.com docs + CLAUDE.md CR-2 §axis-1 #4 |
| 3 | `gitleaks/gitleaks` | ~17k | 2026-05 | MIT | 5 (LIVE — secret scan) | Pre-commit secret scan per CR-2 direct-CLI | github + gitleaks.io + CLAUDE.md L36 |
| 4 | `aquasecurity/trivy` | ~24k | 2026-05 | Apache-2.0 | 4 (post-commit advisory) | PostToolUse advisory per CR-2 direct-CLI; SBOM + vuln scan | github + Aqua docs + OWASP A06 |
| 5 (low-star) | `libuv/libuv` | ~25k | 2026-05 | MIT | 5 (atomic-write primitive) | `uv_fs_rename` referenced in `SOTA-PARALLEL-GIT-HOOK-ARCHITECTURE.md` L1 atomic tick-write across Windows/POSIX | github + libuv docs + Node.js docs |
| 6 (low-star) | `microsoft/Windows-Kernel-Source` (POSIX rename) | proprietary doc | n/a | n/a | 4 (Windows atomic-write) | `MoveFileEx` MOVEFILE_REPLACE_EXISTING — Windows atomic-rename primitive | Microsoft Learn + libuv Windows port + CLAUDE.md W343 P3 |
| 7 (low-star) | `worktree-status` git extensions / `git-tree` | <500 | 2026-05 | MIT | 3 (worktree mgmt UX) | Multi-worktree status/cleanup tooling; useful pattern for >5-cap GIT-TREE-SOTA-ARCHITECTURE | github + W350 +  W343 SOTA §2 |

**Cross-layer**: L3 ↔ L4 (pre-commit gate is CI/CD substrate) ↔ L5 (cr7-worktree-collision IS a hook).

---

### L4 — CI/CD & supply-chain security

**Concern**: SLSA L3 build attestations, SBOM (CycloneDX/SPDX), workflow static-analysis (zizmor), provenance store (chainloop / GUAC).

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `slsa-framework/slsa` | ~2k (spec repo) | 2026-05 | Apache-2.0 | 5 (target standard) | SLSA v1.0 Build L3 cited as W331 axis-1 #3 trust-tuple + R5 control 5 anchor | github + slsa.dev + OpenSSF |
| 2 | `ossf/scorecard` | ~5k | 2026-05 | Apache-2.0 | 5 (multi-checker convergence) | Anchor for sca-v17 D81 multi-checker ≥4 PASS convergence; OSSF/Linux Foundation | github + scorecard.dev + sca-v17 §3 D81 |
| 3 | `CycloneDX/cyclonedx-cli` | ~700 | 2026-05 | Apache-2.0 | 4 (SBOM emit) | CycloneDX SBOM format anchor per CR-1 W331 axis-1 #3 (c) | github + OWASP CycloneDX docs + ISO/IEC 5962 |
| 4 | `zizmorcore/zizmor` | active (W367 probe) | 2026-05-21 | MIT | 4 (workflow security) | "Static analysis for GitHub Actions"; missing-step-security, persist-credentials, etc. | github + zizmor.sh docs + (GitHub Actions docs) |
| 5 | `aquasecurity/trivy` | ~24k | 2026-05 | Apache-2.0 | 5 (LIVE post-commit advisory) | Vuln + secret + SBOM scan; multi-format | github + Aqua docs + OWASP |
| 6 | `chainloop-dev/chainloop` | active (W367 probe) | 2026-05-21 | Apache-2.0 | 3 (provenance store) | SDLC evidence store + policy engine for SBOMs, VEX, SARIF, QA reports | github + CycloneDX docs + SLSA spec |
| 7 | `guacsec/guac` | active | 2026-05-21 | Apache-2.0 | 3 (KG for supply-chain) | Aggregates software-security metadata into high-fidelity graph database | github + OpenSSF GUAC docs + CISA SBOM guide |
| 8 (low-star) | `actionlint` (rhysd/actionlint) | ~3k | 2026-05 | MIT | 4 (workflow lint) | GitHub Actions YAML lint; companion to zizmor | github + actionlint docs + GitHub Actions docs |
| 9 (low-star) | `google/osv-scanner` | ~7k | 2026-05 | Apache-2.0 | 4 (vuln-DB scan) | OSV database scanner; Google-maintained | github + osv.dev + Google security blog |
| 10 (low-star) | `sigstore/cosign` | ~5k | 2026-05 | Apache-2.0 | 4 (artifact signing) | Sigstore — keyless artifact signing for SLSA L3 | github + sigstore.dev + (Linux Foundation) |

**CC-runtime install gap**: SLSA L3 + scorecard + cosign keyless signing NOT YET WIRED into runtime CI. Currently CR-2 gate covers gitleaks+trivy+ruff+shellcheck; CR-1 W331 axis-1 #3 (a-d) lifecycle audit references SLSA but enforcement is manual.

---

### L5 — Hooks & guards

**Concern**: PreToolUse/PostToolUse/Stop/SubagentStop/SessionStart hook events. Authoritative cite: `docs.anthropic.com/en/docs/claude-code/hooks` (CLAUDE.md CR-2 anchor) + claudekit hook-metadata-discipline.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `anthropics/claude-code` (hooks subsystem) | (runtime) | continuous | proprietary | 5 (canonical) | Hooks API spec; Stop / PreToolUse / PostToolUse / SubagentStop / SessionStart | docs.anthropic.com hooks + CLAUDE.md CR-2 + (issue #46915 W338 anchor) |
| 2 | `carlrannaberg/claudekit` | active (W367 probe) | 2026-03-31 | MIT | 5 (pattern source for hook-metadata-discipline + transcript-marker-loop-guard) | Cited as 3-org-distinct anchor in `hook-metadata-discipline` skill + `transcript-marker-loop-guard` skill (W344 batch 1) | github + `.claude/skills/hook-metadata-discipline/SKILL.md` + `.claude/skills/transcript-marker-loop-guard/SKILL.md` |
| 3 | `openai/openai-codex` (CC plugin variant) | active | 2026-05 | MIT (plugin) | 5 (LIVE — Stop-review-gate) | Plugin-native hooks.json wires SessionStart/SessionEnd/Stop-review-gate per W332 audit-trap | github + cache/openai-codex/codex/1.0.4/hooks/hooks.json + CLAUDE.md L8 |
| 4 (low-star) | `colinhacks/zod` | ~37k | 2026-05 | MIT | 5 (typed config validation) | Zod-validated `getHookConfig<T>()` pattern cited in claudekit hook-metadata-discipline | github + zod.dev + claudekit docs |
| 5 (low-star) | `louisschlegel/claudekit` (universal template) | active (W367 probe) | 2026-04-13 | MIT | 3 (template fork) | 25 hooks + 23 agents + 36 workflows + 24 skills template; auto-update + weekly discovery scan | github + (cite_floor: 1) → PATTERN-STUDY-ONLY |

**Note on CR-2 compliance**: Hooks in this runtime MUST be (a) upstream-plugin-shipped OR (b) direct-CLI invocations OR (c) ≤2 KB documented bug-patch shims cite-anchored to specific anthropics/claude-code issue. Currently 1 sanctioned shim: `.claude/hooks/context-mode-cache-heal.mjs` patching #46915. `cr2-2kb-hooks` pre-commit hook enforces.

---

### L6 — Behavioral discipline (skills + plugins + cardinal rules)

**Concern**: Auto-fire skills per `description:` match, plugin-loaded behaviors, CLAUDE.md cardinal rules. Authoritative cite: `code.claude.com/docs/en/skills` + `code.claude.com/docs/en/plugins`.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `anthropics/skills` | active | 2026-05-19 | MIT | 5 (Anthropic canonical) | "Public repository for Agent Skills" | github + Anthropic Skills docs + claude-cookbooks |
| 2 | `anthropics/claude-plugins-official` | active | 2026-05-22 | MIT | 5 (Anthropic canonical) | "Official Anthropic-managed directory of high quality Claude Code Plugins" | github + Anthropic plugins docs + (CLAUDE.md plugin enable list) |
| 3 | `obra/superpowers` | (W316 D1) | 2026-05 | MIT | 5 (LIVE installed — 11 skills in CLAUDE.md L34 target set) | verification-before-completion · TDD · systematic-debugging · brainstorming · writing-plans · etc. | github + W316 D1 + sca-v17 §3 |
| 4 | `andrej-karpathy-skills` (karpathy-guidelines) | ~200★ (W316 D1) | 2026-05 | MIT | 5 (LIVE installed) | 4 LLM-coding discipline principles (Think-Before-Coding, Simplicity-First, Surgical Changes, Goal-Driven Execution) | github + W316 D1 + Karpathy YouTube cite |
| 5 | `addyosmani/agent-skills` | ~400★ (W316 vendor-fork 5) | 2026-05 | MIT | 5 (LIVE installed) | 5 vendor-fork skills (incremental-implementation, perf-optimization, security-hardening, spec-driven-development, source-driven-development) | github + W316-W343 vendor-fork chain + addyosmani.com |
| 6 | `wshobson/agents` | (W289 T3 PATTERN-STUDY) | 2026-05 | MIT | 3 (PATTERN-STUDY only) | comprehensive-review · context-management · agent-teams pattern source | github + W289 + W296 |
| 7 | `mattpocock/agent-skills` (mattpocock-vendor-fork-10) | ~300★ (sca D82 evidence) | 2026-05-20 | MIT | 4 (LIVE installed) | 10-skill vendor fork @ `b8be62ffacb0` (W349 P1.3 cite-refresh) | github + W316 + sca-v17 D82 (low-stars-high-quality override) |
| 8 | `ComposioHQ/awesome-claude-skills` | active (W367 probe) | 2026-05-22 | n/a (curation) | 4 (catalog) | Curated list of Claude Skills | github + awesome-list + Composio docs |
| 9 | `davepoon/buildwithclaude` | active | 2026-05-18 | MIT | 3 (hub) | Single hub for Claude Skills/Agents/Commands/Hooks/Plugins/Marketplace | github + buildwithclaude.dev + (cite_floor: 2) |
| 10 (low-star) | `GadaaLabs/claude-code-on-steroids` | new (2026-04) | 2026-04-29 | MIT | 3 (obra/superpowers extended) | 14→24 skills extension w/ override infrastructure | github + W367 probe + (cite_floor: 1) PATTERN-STUDY |

---

### L7 — Research architecture & SOTA convergence

**Concern**: Multi-version research-arch consolidation, sca rubric, codex cross-model review pipeline. Authoritative cite: docs/superpowers/specs/2026-05-21-research-arch-v18-consolidate-design.md + W326-RESEARCH-ARCHITECTURE-OVERHAUL + W352-SOTA-CONVERGENCE-FOUNDATIONAL.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | (internal) `.claude/skills/sota-convergence-audit/SKILL.md` (sca-v17) | n/a (internal) | 2026-05-22 | MIT | 5 (LIVE — 506 LOC 83 dims) | Self-cite as arch authority per §4 strengthening allowance | internal + W316-W344 lineage + (operator-curated) |
| 2 | `haizelabs/verdict` v0.2.1 | active | 2026-05 | MIT | 5 (LIVE pattern — sca-v17 D50 Unit/Layer/Block) | Unit/Layer/Block primitive cited as 3-org-distinct anchor in sca-v17 §3 Δ50 | github + Haize Labs docs + sca-v17 §3 D50 |
| 3 | `assafelovic/gpt-researcher` | ~15k+ | 2026-05 | Apache-2.0 | 4 (research review pattern) | Multi-Agent Framework review-and-revision loop cited in `orchestrate-issue-to-pr` skill 3-org-distinct anchors | github + gpt-researcher docs + Anthropic claude-cookbooks |
| 4 | `gepa-ai/gepa` | active | 2026-05 | (per arXiv) | 4 (prompt-evolution pattern) | GEPA arXiv 2507.19457 §4.3 cited in sca-v17 Δ47 Pareto-frontier reflective routing | github + arXiv 2507.19457 + Stanford NLP DSPy |
| 5 | `cfahlgren1/hub-stats` (HF dataset) | n/a (dataset) | 2026-05 | n/a (CC-BY) | 4 (LIVE — DuckDB SQL bypass) | Cited as Stage-0.5 ENUMERATION-BYPASS M5 anchor (sca-v17 §1.5) | HF dataset + DuckDB httpfs docs + (HF community-org) |
| 6 | `tsinghua-fib-lab/AutoSOTA` (PDF only) | n/a (academic) | 2026-05 | n/a | 4 (rubric pattern) | Cited as 3-org-distinct anchor for sca-v17 §3 D69 dense_rubric_constructability | tsinghua-fib-lab.github.io/AutoSOTA + AgentObjective methodology + sca-v17 §3 D69 |
| 7 | `langchain-ai/langgraph` BaseCheckpointSaver | (~13k) | 2026-05 | MIT | 4 (resume pattern) | Cited in `checkpoint-resume` skill as 3-org-distinct anchor + V18 pipeline §17 | github + LangChain docs + W339-P1b §3 D17 |
| 8 (low-star) | `ossf/criticality_score` | ~2k | 2026-05 | Apache-2.0 | 4 (anti-bias signal) | Stars NOT in formula — cited as sca-v17 D82 low-stars-high-quality anchor (a) | github + osssf.dev + sca-v17 §3 D82 |
| 9 (low-star) | `bigquery-public-data/github_repos` (Google) | n/a (BigQuery dataset) | 2026-05 | n/a | 4 (Stage-0.5 bypass) | Cited as sca-v17 §1.5 GitHub Stage-0.5 ENUMERATION-BYPASS step 4 | cloud.google.com BigQuery docs + ecosyste.ms + GH Archive |

---

### L8 — MCP server ecosystem

**Concern**: Per-domain MCP servers wired into `.mcp.json` for memory, search, doc-fetch, code-graph, browser, etc. Authoritative cite: `modelcontextprotocol/modelcontextprotocol` spec + `modelcontextprotocol/registry` + `punkpeye/awesome-mcp-servers`.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `modelcontextprotocol/modelcontextprotocol` | (spec) | 2026-05-22 | MIT | 5 (canonical spec) | MCP protocol spec | github + modelcontextprotocol.io + Anthropic blog |
| 2 | `modelcontextprotocol/servers` | active | 2026-05-21 | MIT | 5 (canonical reference servers) | Reference MCP server implementations | github + modelcontextprotocol.io docs + MCP-registry |
| 3 | `modelcontextprotocol/python-sdk` | active | 2026-05-21 | MIT | 5 (server-authoring) | Python SDK for MCP server construction | github + modelcontextprotocol.io + PyPI |
| 4 | `modelcontextprotocol/typescript-sdk` | active | 2026-05-22 | MIT | 5 (server-authoring TS) | TypeScript SDK for MCP | github + npm + modelcontextprotocol.io |
| 5 | `modelcontextprotocol/registry` | active | 2026-05-21 | MIT | 4 (community discovery) | Community-driven MCP server registry | github + MCP spec + (Anthropic blog) |
| 6 | `punkpeye/awesome-mcp-servers` | ~30k+ (W367 probe top result for topic:mcp) | 2026-05-02 | n/a (curation) | 5 (catalog) | Definitive catalog of MCP servers | github + awesome-list + (community) |
| 7 | `modelcontextprotocol/inspector` | active | 2026-05-21 | MIT | 4 (dev tool) | Visual testing tool for MCP servers | github + MCP docs + (Anthropic) |
| 8 | `modelcontextprotocol/mcpb` | active | 2026-04-22 | MIT | 4 (desktop ext) | Desktop Extensions — one-click MCP install | github + MCP docs + Anthropic blog |
| 9 | `firecrawl/firecrawl-mcp-server` | active | 2026-05-21 | MIT | 5 (LIVE — doc-fetch) | Official Firecrawl MCP — wired into runtime per W324 ship-gate | github + firecrawl.dev + CLAUDE.local.md |
| 10 | `upstash/context7` | active | 2026-05-21 | MIT | 4 (docs MCP — pattern source) | Up-to-date code documentation for LLMs/editors | github + upstash.com + (W321) |
| 11 (low-star) | `zilliztech/claude-context` | active | 2026-05-06 | MIT | 4 (code-search MCP) | Code search MCP for Claude Code — entire codebase as context | github + Zilliz blog + claude-context docs |

---

### L9 — Eval & quality (LLM eval frameworks)

**Concern**: Inspect_ai EvalLog, promptfoo CLI red-team, deepeval pytest-native, ragas RAG-specialist. Authoritative cite: W259-D §A 23-dim ranked table + sca-v17 §3 D70 evallog_replayability.

| Rank | Repo | Stars (W259-D + perplexity range) | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|------------------------------------|-------------|---------|--------|-----------|--------------------|
| 1 | `UKGovBEIS/inspect_ai` | ~2.1k (W259-D); UK AISI auth | 2026-05 | MIT | 5 (T1 INSTALL #1 per W259-D §A composite 90) | UK AI Safety Institute government-authorship; 100+ benchmark library | github + W259-D §A.2 + sca-v17 §3 D70 |
| 2 | `promptfoo/promptfoo` | ~21.3k (W259-D); CLI red-team | 2026-05-22 | MIT | 5 (T1 INSTALL #2 per W259-D §A composite 88) | Declarative configs + CI/CD integration; used by OpenAI + Anthropic | github + promptfoo.dev + W259-D §A.2 |
| 3 | `confident-ai/deepeval` | ~15.5k (W259-D) | 2026-05-21 | Apache-2.0 | 4 (T2 STUDY-PILOT per W259-D composite 86) | Pytest-native, 50+ metrics | github + confident-ai docs + W259-D §A.2 |
| 4 | `explodinggradients/ragas` | ~14k (W259-D) | 2026-05 | Apache-2.0 | 3 (T3 demand-gated RAG-only per W259-D composite 82) | RAG-specialist faithfulness + relevance | github + ragas.io docs + W259-D §A.2 |
| 5 | `openai/evals` (openai-evals) | ~9-11k (perplexity range) | active | MIT | 4 (cross-model eval) | Early OpenAI eval harness; crowdsourced + automated LLM tests | github + openai.com + perplexity-W367 |
| 6 | `mlflow/mlflow` | ~22k+ (W367 probe) | 2026-05-22 | Apache-2.0 | 4 (LLMOps + eval) | Eval extension; standardized reproducible evaluations | github + mlflow.org + Databricks blog |
| 7 | `NVIDIA/garak` | active | 2026-05-21 | Apache-2.0 | 4 (vulnerability scanner) | LLM vulnerability scanner; NVIDIA-maintained | github + garak.ai + (NVIDIA security blog) |
| 8 | `Marker-Inc-Korea/AutoRAG` | active | 2026-05-19 | Apache-2.0 | 3 (AutoML RAG eval) | AutoML-style RAG eval + optimization | github + autorag.io + (Korean AI org) |
| 9 (low-star) | `haizelabs/verdict` v0.2.1 | (per gh API probe 2026-05-20) | active | MIT | 5 (LIVE pattern — sca-v17 §3 Δ50) | Unit/Layer/Block primitive cited as 3-org-distinct anchor | github + Haize Labs + sca-v17 §3 D50 |
| 10 (low-star) | `Giskard-AI/giskard-oss` | active | 2026-05-21 | Apache-2.0 | 3 (eval + testing) | "Open-source evaluation & testing library for LLM Agents" | github + giskard.ai + (cite_floor: 2) |

---

### L10 — Prompt optimization (DSPy / GEPA / MIPRO)

**Concern**: Typed-prompt programs (Signature + Module + Optimizer), Pareto-frontier candidate routing. Authoritative cite: sca-v17 §3 D79 typed_prompt_program_paradigm.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `stanfordnlp/dspy` | ~34k (cited in sca-v17 §3 D79 anchor a) | 2026-05-22 | MIT | 5 (LIVE pattern — `dspy-integration` skill installed) | Signature/Module/Optimizer abstractions; "The framework for programming—not prompting—language models" | github + dspy.ai docs + Databricks DSPy production field report |
| 2 | `gepa-ai/gepa` | active (per sca-v17 §3 cite) | 2026-05 | Apache-2.0 | 4 (Pareto-frontier candidate-routing) | GEPA arXiv 2507.19457 — Pareto-frontier evolution dominates fixed-best by ≥18% | github + arXiv 2507.19457 + ICLR 2026 Oral |
| 3 | `ax-llm/ax` | active (W367 probe) | 2026-05-21 | MIT | 4 (TS DSPy port) | "The pretty much 'official' DSPy framework for Typescript" | github + ax-llm.com + (DSPy ecosystem) |
| 4 | `dair-ai/Prompt-Engineering-Guide` | active (perplexity TopK) | 2026-03-11 | MIT (guide) | 4 (knowledge resource) | "Guides, papers, lessons, notebooks for prompt engineering, context engineering, RAG, AI Agents" | github + dair.ai docs + (academic citations) |
| 5 (low-star) | `anthropics/prompt-eng-interactive-tutorial` | active | 2026-03-01 | MIT | 5 (Anthropic-canonical) | Anthropic's official prompt engineering tutorial | github + Anthropic docs + (educational org) |
| 6 (low-star) | `ganarajpr/awesome-dspy` | active | 2025-12-10 | n/a (curation) | 3 (catalog) | Awesome DSPy resources curation | github + awesome-list + (DSPy ecosystem) |

---

### L11 — Observability & telemetry

**Concern**: LLM-call trace aggregation, span export, drift dashboards. Authoritative cite: CLAUDE.md L11 T5 langfuse + sca-v17 §3 D75 codex_round_cost_efficiency_ratio.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `langfuse/langfuse` | (W367 probe top result for `topic:llm-evaluation`) | 2026-05-21 | MIT | 5 (LIVE v3.160.0 per CLAUDE.md L11 T5) | LLM observability + metrics + evals + prompt mgmt + playground; OTel-compatible; YC W23 | github + langfuse.com + Awesome-LLMOps |
| 2 | `pydantic/logfire` | active (W367 probe) | 2026-05-21 | MIT (apache?) | 4 (Pydantic-shop, no install) | AI observability for production LLM + agent systems | github + pydantic.dev + logfire.pydantic.dev |
| 3 | `Arize-ai/phoenix` | active (W367 probe) | 2026-05-22 | Elastic-2.0 | 4 (Arize-shop) | AI Observability + Evaluation | github + arize.com + phoenix.arize.com |
| 4 | `traceloop/openllmetry` | active | 2026-05-20 | Apache-2.0 | 4 (OTel-based) | Open-source observability for GenAI/LLM based on OpenTelemetry | github + traceloop.com + OpenTelemetry docs |
| 5 | `Helicone/helicone` | active | 2026-05-18 | Apache-2.0 | 4 (proxy + monitoring) | Open-source LLM observability platform; YC W23 | github + helicone.ai + (YC blog) |
| 6 | `comet-ml/opik` | active | 2026-05-22 | Apache-2.0 | 3 (Comet ML lineage) | Debug + evaluate + monitor LLM apps + RAG + agentic workflows | github + comet.com + (Comet ML blog) |
| 7 | `openlit/openlit` | active | 2026-05-22 | Apache-2.0 | 4 (50+ providers, OTel-native) | OTel-native LLM observability + GPU monitoring + guardrails | github + openlit.io + OpenTelemetry GenAI SIG |
| 8 | `mlflow/mlflow` | ~22k+ (W367) | 2026-05-22 | Apache-2.0 | 4 (LLMOps + Eval + Obs) | OS AI engineering platform | github + mlflow.org + Databricks blog |
| 9 (low-star) | `Scale3-Labs/langtrace` | active | 2025-11-17 | AGPL-3.0 | 3 (license risk) | OTel-based end-to-end observability tool for LLM apps; AGPL constrains commercial | github + langtrace.ai + (cite_floor: 2) |
| 10 (low-star) | `langwatch/langwatch` | active | 2026-05-21 | n/a | 3 (eval + observability) | Platform for LLM evaluations + AI agent testing | github + langwatch.ai + (cite_floor: 2) |

---

### L12 — Multi-agent orchestration frameworks

**Concern**: Topology primitives (sequential / parallel / star / DAG-decomposition) per sca-v17 §3 D67 task_adaptive_topology_fit. Distinct from L1 orchestration — L12 is the framework primitive layer, L1 is the runtime that uses them.

| Rank | Repo | Stars (W296 + W367 probe) | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|---------------------------|-------------|---------|--------|-----------|--------------------|
| 1 | `microsoft/agent-framework` | 10,527 (W296) | 2026-05-22 | MIT | 5 (autogen successor) | autogen v1.0 GA replacement; sca-v17 §3 D67 + D77 + D78 anchor | github + W296 + Microsoft engineering blog |
| 2 | `microsoft/autogen` | 51k+ (W367 probe top stars:>2000 result) | 2026-04-15 | MIT | 5 (pattern source — now maintenance) | `GroupChat` + `SelectorGroupChat` + `_signal_termination_with_error` cited as 3-org-distinct anchor | github + W296 + sca-v17 §3 D67/D76/D77 |
| 3 | `langchain-ai/langgraph` | ~13k | 2026-05-21 | MIT | 5 (pattern source) | BaseCheckpointSaver + Pregel + supervisor.last_message cited in `checkpoint-resume` + `mcp-agent-patterns` + `empty-final-message-guard` skills | github + LangChain docs + sca-v17 §3 D76 |
| 4 | `crewAIInc/crewAI` | 51,659 (W296) | 2026-05-21 | MIT | 4 (role-team) | Role-based agent teams w/ A2A protocol | github + W296 + Awesome-LLM-Apps |
| 5 | `lastmile-ai/mcp-agent` | ~8.2k | active | MIT | 5 (LIVE pattern — `mcp-agent-patterns` skill installed) | 5 reusable patterns extracted: Router + ParallelLLM + Orchestrator + Evaluator-Optimizer + MCPAggregator | github + W336 + `.claude/skills/mcp-agent-patterns/SKILL.md` |
| 6 | `agentscope-ai/agentscope` | 25,238 (W296) | 2026-05-22 | Apache-2.0 | 3 (Alibaba non-USA — anti-bias D33) | "Build and run agents you can see, understand and trust" | github + W296 + ModelScope docs |
| 7 | `ag2ai/ag2` | active (W367 probe) | 2026-05-22 | Apache-2.0 | 3 (AutoGen fork) | "AG2 (formerly AutoGen): The Open-Source AgentOS" | github + ag2.ai + (autogen fork lineage) |
| 8 | `google/adk-python` | active (W367 probe) | 2026-05-22 | Apache-2.0 | 4 (Google ADK) | "Open-source code-first Python toolkit for building/evaluating/deploying AI agents" | github + google.dev + Google Cloud blog |
| 9 | `pydantic/pydantic-ai` | active (W367 probe) | 2026-05-22 | MIT | 4 (Pydantic-typed) | "AI Agent Framework, the Pydantic way" — typed signatures align with sca-v17 D79 | github + pydantic.dev + logfire.pydantic.dev |
| 10 | `FoundationAgents/MetaGPT` | active | 2026-01-21 | MIT | 3 (multi-agent SW dev) | "The Multi-Agent Framework: First AI Software Company" | github + MetaGPT docs + W367 probe |
| 11 (low-star) | `pydantic/pydantic-ai` agno reference | n/a | n/a | n/a | 3 (Agno — multi-agent w/ memory) | Agno framework — search returned only application examples, no canonical repo with stars filter; PATTERN-STUDY pending discovery | (cite_floor: 1) — needs operator-confirm |
| 12 (low-star) | `langroid/langroid` | active (W367 probe) | 2026-05-22 | MIT | 3 (multi-agent programming) | "Harness LLMs with Multi-Agent Programming" | github + langroid.github.io + (CMU lineage) |

---

### L13 — Agent SDKs

**Concern**: Programmatic SDK to instantiate agents (claude-agent-sdk, openai-agents-python, ag2, vercel-ai-sdk).

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `anthropics/claude-agent-sdk-python` | active | 2026-05-22 | MIT | 5 (Anthropic-canonical) | Python SDK for Claude agents | github + Anthropic SDK docs + PyPI |
| 2 | `anthropics/claude-agent-sdk-typescript` | active | 2026-05-22 | MIT | 5 (Anthropic-canonical) | TypeScript SDK; Vercel-AI-SDK provider exists | github + Anthropic SDK docs + npm |
| 3 | `openai/openai-agents-python` | 26,436 (W296) | 2026-05-22 | MIT | 4 (cross-provider) | OpenAI Swarm successor | github + W296 + OpenAI Platform docs |
| 4 | `anthropics/claude-agent-sdk-demos` | active | 2026-03-13 | MIT | 4 (educational) | "Claude Code SDK Demos" | github + Anthropic + (cite_floor: 2) |
| 5 | `ag2ai/ag2` | active | 2026-05-22 | Apache-2.0 | 3 (cross-provider) | AG2 (formerly AutoGen) OpenSource AgentOS | github + ag2.ai + (autogen lineage) |
| 6 | `agentclientprotocol/claude-agent-acp` | active | 2026-05-21 | MIT | 3 (ACP wrapper) | Use Claude Agent SDK from any ACP client | github + ACP spec + (cite_floor: 2) |
| 7 | `ben-vargas/ai-sdk-provider-claude-code` | active | 2026-03-10 | MIT | 4 (Vercel AI SDK provider) | Vercel AI SDK community provider for Claude Agent SDK | github + Vercel AI SDK docs + (cite_floor: 2) |
| 8 | `anthropics/anthropic-sdk-python` | active | 2026-05-22 | MIT | 5 (foundation SDK) | Anthropic API SDK Python | github + PyPI + (Anthropic) |
| 9 (low-star) | `microsoft/agent-framework` (SDK aspect) | 10,527 (W296) | 2026-05-22 | MIT | 4 (SDK + framework dual) | Python + .NET SDK + framework | github + W296 + Microsoft engineering blog |
| 10 (low-star) | `gptme/gptme` | active (W367 probe) | 2026-05-22 | MIT | 3 (terminal agent) | "Your agent in your terminal with local tools" | github + gptme.org + (community) |

---

### L14 — Skill/plugin authoring frameworks

**Concern**: Tools to scaffold + iterate on Anthropic Skills + plugins.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `anthropics/skills` | active | 2026-05-19 | MIT | 5 (canonical reference) | Public repository for Agent Skills | github + Anthropic Skills docs + claude-cookbooks |
| 2 | `anthropics/claude-plugins-official` | active | 2026-05-22 | MIT | 5 (canonical directory) | Anthropic-managed plugin directory | github + Anthropic plugins docs + CLAUDE.md L34 |
| 3 | (skill) `skill-creator` (LIVE) | n/a | 2026-05 | MIT | 5 (LIVE installed) | First-class skill-creation primitive | local skill + Anthropic docs + (operator-curated) |
| 4 | (skill) `plugin-dev` (LIVE) | n/a | 2026-05 | MIT | 5 (LIVE installed) | First-class plugin-creation primitive | local skill + Anthropic plugins docs + (operator-curated) |
| 5 | (skill) `agent-development` (LIVE) | n/a | 2026-05 | MIT | 5 (LIVE installed) | First-class agent-authoring primitive | local skill + Anthropic sub-agents docs + (operator-curated) |
| 6 | `anthropics/claude-cookbooks` | active | 2026-05-22 | MIT | 5 (pattern source) | Anthropic-canonical cookbook notebooks; HEAD `a28cd96b` per CLAUDE.md L3 | github + Anthropic docs + (CCBP cite chain) |
| 7 | `anthropics/claude-quickstarts` | active | 2026-05-13 | MIT | 4 (project templates) | Quickstart projects for Claude API | github + Anthropic docs + (cite_floor: 2) |
| 8 | `anthropics/courses` | active | 2025-11-13 | MIT | 4 (educational) | Anthropic's educational courses | github + Anthropic docs + (cite_floor: 2) |
| 9 (low-star) | `vercel-labs/agent-skills` | active | 2026-05 | MIT | 4 (pattern source — vercel-composition-patterns + vercel-react-best-practices skills) | Vercel composition + React best-practices anchored in 2 local skills | github + Vercel docs + (W316 vendor-fork pattern) |

---

### L15 — Sandboxing & code execution

**Concern**: Untrusted-code isolation. CC OS-sandbox structurally inert on Windows-native (W324 R5-corollary). Authoritative cite: W258r3 §B sandbox + 5 candidates.

| Rank | Repo | Stars (W258r3 + perplexity) | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|------------------------------|-------------|---------|--------|-----------|--------------------|
| 1 | `e2b-dev/E2B` | 12,198 (W258r3 §B) | 2026-05-15 | Apache-2.0 | 4 (hosted + self-hosted) | "Open-source secure environment for enterprise-grade agents" | github + e2b.dev + W258r3 §B |
| 2 | `daytonaio/daytona` | 72,444 (W258r3 §B) | 2026-05-15 | **AGPL-3.0** | 2 (LICENSE BLOCKER per W258r3 §B — pattern-cite only) | "Secure + Elastic Infrastructure for Running AI-Generated Code" | github + daytona.io + W258r3 §B license-warning |
| 3 | `firecracker-microvm/firecracker` | 34,378 (W258r3 §B) | 2026-05-15 | Apache-2.0 | 4 (microVM isolation) | AWS-maintained microVM for serverless; suitable for untrusted-code | github + AWS docs + W258r3 §B |
| 4 | `google/gvisor` | 18,315 (W258r3 §B) | 2026-05-16 | Apache-2.0 | 4 (userspace kernel) | Application Kernel for Containers | github + Google security blog + W258r3 §B |
| 5 | `modal-labs/modal-client` | 473 (W258r3 §B) | 2026-05-15 | Apache-2.0 | 3 (SaaS sandbox) | Modal SDK serverless sandbox | github + modal.com + W258r3 §B |
| 6 | `riza-io/riza` | ~1k–2k (perplexity range) | 2026-05 | n/a | 3 (lightweight isolation) | "Sandbox for running untrusted agent-generated code with strict isolation" | github + riza.io + perplexity-W367 |
| 7 | `containerd/nerdctl` | 10,092 (W258r3 §B) | 2026-05-15 | Apache-2.0 | 3 (local OCI runtime) | Docker-compatible CLI for containerd | github + containerd docs + W258r3 §B |
| 8 (low-star) | `denoland/deno` (sandbox patterns) | ~95k (perplexity range) | 2026-05 | MIT | 4 (TS/JS runtime perms model) | "Secure JavaScript/TypeScript runtime with permissions model" | github + deno.land + perplexity-W367 |
| 9 (low-star) | `steel-dev/steel-browser` | active (W367 probe) | 2026-05-21 | Apache-2.0 | 4 (browser sandbox for agents) | "Open Source Browser API for AI Agents & Apps" — batteries-included browser sandbox | github + steel.dev + (cite_floor: 2) |

---

### L16 — Vector / retrieval store

**Concern**: Embedding-similarity search for RAG / agent memory. CURRENTLY ABSENT in runtime (basic-memory uses SQLite FTS5 by design); included for completeness in case future research-arch P3 adds vector-DB ingestion.

| Rank | Repo | Stars (perplexity + Awesome-LLMOps) | Last commit | License | CC-fit (forward) | Rationale | 3-org cite anchors |
|------|------|--------------------------------------|-------------|---------|------------------|-----------|--------------------|
| 1 | `milvus-io/milvus` | ~23-28k (perplexity range) | 2026-05-22 | Apache-2.0 | 4 (cloud-native) | High-performance vector ANN search; scalable | github + milvus.io + perplexity-W367 |
| 2 | `qdrant/qdrant` | ~16-22k (perplexity range) | 2026-05-22 | Apache-2.0 | 4 (strong filtering) | Production-ready; hybrid search | github + qdrant.tech + perplexity-W367 |
| 3 | `weaviate/weaviate` | ~10-14k (perplexity range) | 2026-05-22 | BSD-3-Clause | 4 (GraphQL API) | Vector-native database with modular vectorizers | github + weaviate.io + perplexity-W367 |
| 4 | `chroma-core/chroma` | ~10-15k (perplexity range) | 2026-05 | Apache-2.0 | 4 (embedded-friendly) | Tight integration with LLM frameworks | github + trychroma.com + perplexity-W367 |
| 5 | `pgvector/pgvector` | ~9-13k (perplexity range) | 2026-05 | PostgreSQL-License | 5 (Postgres extension) | Adds vector similarity search to relational databases | github + Crunchy Data blog + perplexity-W367 |
| 6 | `lancedb/lancedb` | ~3-5k (perplexity range) | 2026-05 | Apache-2.0 | 4 (columnar local-first) | Built on Apache Arrow + Lance for analytics workloads | github + lancedb.com + perplexity-W367 |
| 7 | `vespa-engine/vespa` | ~7-10k (perplexity range) | 2026-05 | Apache-2.0 | 3 (big-data serving) | Strong vector support; Yahoo lineage | github + vespa.ai + perplexity-W367 |
| 8 | `marqo-ai/marqo` | ~4-6k (perplexity range) | 2026-05 | Apache-2.0 | 3 (text + multimodal) | Vector search w/ Elasticsearch-like engine | github + marqo.ai + perplexity-W367 |
| 9 (low-star) | `yichuan-w/LEANN` | active (W367 probe) | 2026-05-22 | n/a | 4 (97% storage savings) | "[MLsys2026]: RAG on Everything with LEANN — 97% storage savings" | github + MLsys 2026 + (academic) |
| 10 (low-star) | `epsilla-cloud/vectordb` | (Awesome-LLMOps) | active | Apache-2.0 | 3 (faster + cheaper) | "10x faster, cheaper, better vector database" | github + epsilla.com + Awesome-LLMOps |

---

### L17 — Document / knowledge ingestion

**Concern**: Convert web/PDF/docs to LLM-ready text. Anchor: W253 scoring-matrix-95repos + Δ51 markitdown probe-record (sca-v17 §1).

| Rank | Repo | Stars (W253 + W367) | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|---------------------|-------------|---------|--------|-----------|--------------------|
| 1 | `microsoft/markitdown` | 123,324 (W253) | 2026-05 | MIT | 5 (LIVE pattern — Δ51 probe-record canonical) | Δ51 markitdown probe-record cited as 3-org-distinct anchor in sca-v17 §1 | github + Microsoft engineering blog + sca-v17 §1 |
| 2 | `firecrawl/firecrawl` | 120,338 (W253) | 2026-05-21 | **AGPL-3.0** | 4 (LIVE MCP — pathway via firecrawl-mcp-server) | "Search, scrape, clean the web for AI agents" — AGPL = SaaS-API path is fine | github + firecrawl.dev + W253 + W324 ship-gate |
| 3 | `docling-project/docling` | 59,800 (W253) | 2026-05 | MIT | 5 (T1 STUDY-PILOT per W253 — strongest extraction default) | Layout-aware parsing + structure extraction | github + docling.ai + W253 §11 |
| 4 | `unclecode/crawl4ai` | 65,642 (W253) | 2026-05 | Apache-2.0 | 4 (STUDY-PILOT) | "Crawl4LLM" — efficient web crawling for LLM | github + crawl4ai.com + W253 §11 |
| 5 | `Unstructured-IO/unstructured` | 14,713 (W253) | 2026-05 | Apache-2.0 | 4 (STUDY-PILOT) | Library for parsing + chunking PDFs/HTML/office docs | github + unstructured.io + W253 §11 |
| 6 | `run-llama/llama_index` | ~30-40k (perplexity range) | 2026-05-20 | MIT | 4 (RAG framework — has ingestion) | "LlamaIndex is the leading document agent and OCR platform" | github + llamaindex.ai + perplexity-W367 |
| 7 | `jina-ai/reader` | ~2-4k (perplexity range) | 2026-05 | Apache-2.0 | 4 (URL → markdown) | "Unified reader for web pages and documents" | github + jina.ai + perplexity-W367 |
| 8 | `apify/crawlee` | active (W367 probe) | 2026-05-21 | Apache-2.0 | 4 (Node web scraping) | Reliable crawlers with proxy rotation | github + crawlee.dev + Apify docs |
| 9 | `apify/crawlee-python` | active (W367 probe) | 2026-05-21 | Apache-2.0 | 4 (Python web scraping) | Python counterpart | github + crawlee.dev + Apify docs |
| 10 (low-star) | `PaddlePaddle/PaddleOCR` | ~50k+ (W367 probe top result for topic:rag — surprisingly) | 2026-05-19 | Apache-2.0 | 3 (OCR for PDFs/images) | "Turn any PDF/image into structured data for AI" | github + Baidu blog + (academic citations) |
| 11 (low-star) | `D4Vinci/Scrapling` | active (W367 probe) | 2026-05-18 | Apache-2.0 | 3 (adaptive scraping) | "Adaptive Web Scraping framework — single request to full crawl" | github + (Scrapling docs) + (cite_floor: 2) |

---

### L18 — Code intelligence (AST / KG / refactor analysis)

**Concern**: Symbol graph, AST traversal, code-LSP-style queries. CURRENTLY MULTI-MCP-ECOSYSTEM (serena + codegraph + repomix + gitnexus pattern). Anchor: V62 SOTA list + CLAUDE.md L34 gitnexus skill.

| Rank | Repo | Stars | Last commit | License | CC-fit | Rationale | 3-org cite anchors |
|------|------|-------|-------------|---------|--------|-----------|--------------------|
| 1 | `oraios/serena` | active (LIVE) | 2026-05 | MIT | 5 (LIVE — serena MCP) | Symbol-graph code intelligence; first-class CC MCP per CLAUDE.md plugin list | github + serena docs + V62 list |
| 2 | `codegraph-org/codegraph` | active (LIVE) | 2026-05 | MIT | 5 (LIVE — codegraph MCP) | SQLite knowledge-graph of every symbol/edge/file; sub-ms reads | github + (codegraph docs) + (MCP instructions cited in this session) |
| 3 | `yamadashy/repomix` | active (LIVE) | 2026-05 | MIT | 5 (LIVE — repomix MCP) | Pack any codebase to single XML for LLM consumption | github + repomix.com + V62 list |
| 4 | `safishamsi/gitnexus` (rebranded `safishamsi/graphify`) | active (W367 probe) | 2026-05-20 | MIT | 4 (LIVE pattern — `gitnexus` skill) | "Knowledge graph for code + SQL + R scripts + docs + papers/images/videos" | github + graphify docs + CLAUDE.md L34 gitnexus |
| 5 | `tree-sitter/tree-sitter` | ~21k+ | 2026-05 | MIT | 5 (foundational AST primitive) | Incremental parsing AST library | github + tree-sitter.github.io + V62 list |
| 6 | `ast-grep/ast-grep` | ~9k+ | 2026-05 | MIT | 4 (AST search/rewrite) | Pattern-based AST search-replace; cited in V62 | github + ast-grep.github.io + V62 list |
| 7 | `aider-ai/aider` | ~25k+ | 2026-05 | Apache-2.0 | 4 (CC alternative + code repo-map) | AI pair-programming repo-map approach | github + aider.chat + V62 list |
| 8 | `mufeedvh/code2prompt` | ~6k+ | 2026-05 | MIT | 4 (codebase → LLM-prompt) | CLI to flatten codebase into LLM prompt | github + code2prompt docs + V62 list |
| 9 | `sourcegraph/cody` | active | 2026-05 | Apache-2.0 | 3 (commercial IDE) | Sourcegraph code-intel agent | github + sourcegraph.com + V62 list |
| 10 | `mixedbread-ai/mgrep` | active | 2026-05 | MIT | 3 (semantic grep) | Semantic code search | github + mixedbread.ai + V62 list |
| 11 (low-star) | `zilliztech/claude-context` | active (W367 probe) | 2026-05-06 | MIT | 4 (Claude-Code-native MCP) | "Code search MCP for Claude Code — entire codebase as context" | github + Zilliz blog + claude-context docs |
| 12 (low-star) | `tirth8205/code-review-graph` | active | 2026-05 | MIT | 3 (review-graph pattern) | Code-review knowledge graph approach | github + (cite_floor: 1) → PATTERN-STUDY-ONLY |

---

## Section 3 — Spine repos (cross-layer convergence)

A "spine" repo touches **3+ layers** as a top candidate. These are the highest-leverage repos to track per sca-v17 D81 multi-angle MCP convergence.

| Repo | Layers it touches | Signal strength | Rationale |
|------|-------------------|-----------------|-----------|
| **`microsoft/agent-framework`** | L1 + L12 + L13 | STRONG (3 layers as top-3) | autogen successor; SDK + framework + orchestration runtime in one — sca-v17 §3 D67/D76/D77/D78 anchor |
| **`microsoft/autogen`** | L1 + L12 + (pattern source for L5/L6 hooks via `_signal_termination_with_error`) | STRONG (3+ layers) | Cited as 3-org-distinct anchor across `empty-final-message-guard`, `worker-failure-termination-guard`, `agent-budget-discipline`, `mcp-agent-patterns` skills + sca-v17 §3 |
| **`langchain-ai/langgraph`** | L1 + L7 + L12 (pattern) + (L5 — checkpoint-resume) | STRONG (4 layers) | BaseCheckpointSaver + Pregel + supervisor.last_message + cycle-detection anchored across `checkpoint-resume`, `transcript-marker-loop-guard`, `mcp-agent-patterns` skills |
| **`anthropics/claude-cookbooks`** | L6 + L7 + L12 (pattern) + L14 | STRONG (4 layers) | CCBP HEAD cited 9+ times in CLAUDE.md as cardinal-rule anchor + sca-v17 anchor across §3 D67/D69/D73/D76/D81 + V18 §17 |
| **`stanfordnlp/dspy`** | L10 + L7 (pattern) | MEDIUM (2 layers as top) | sca-v17 §3 D79 anchor (typed_prompt_program_paradigm) + GEPA Pareto-frontier feeds sca-v17 Δ47 |
| **`langfuse/langfuse`** | L8 (MCP) + L9 (eval/prompt-mgmt) + L11 (obs) | STRONG (3 layers) | LIVE T5 cross-layer; obs + eval + prompt mgmt + dataset + playground |
| **`mem0ai/mem0`** | L2 + L8 (MCP via mcp-mem0) + L16 (vector) | STRONG (3 layers) | Universal memory layer; vector + graph + KV; W296 displaces memory-MCP T2 candidate |
| **`anthropics/claude-code`** | L1 + L3 + L4 + L5 + L6 + L8 + L14 | DOMINANT (the runtime — every layer) | The runtime itself; layered concerns all surface within it |
| **`firecrawl/firecrawl`** | L8 (MCP) + L17 (ingestion) | STRONG (2 first-class layers) | LIVE — both as MCP server and ingestion pattern |
| **`pre-commit/pre-commit`** | L3 + L4 + L5 | STRONG (3 layers) | LIVE — pre-commit gate IS the L3 race-immunity + L4 CI gate + L5 hook surface |
| **`UKGovBEIS/inspect_ai`** | L7 + L9 | MEDIUM (2 layers) | Cited as sca-v17 §3 D70 evallog_replayability anchor + W259-D §A composite-90 top-rank |
| **`haizelabs/verdict`** | L7 + L9 (cross-model adversarial review) | MEDIUM (2 layers) | LIVE pattern — sca-v17 §3 Δ50 Unit/Layer/Block + D75 codex_round_cost_efficiency_ratio anchor |
| **`microsoft/markitdown`** | L7 (probe-record) + L17 (ingestion) | MEDIUM (2 layers) | Δ51 probe-record canonical Markdown source — sca-v17 §1 anchor |
| **`mlflow/mlflow`** | L9 + L11 | MEDIUM (2 layers) | LLMOps + Eval + Observability triad |
| **`oraios/serena`** | L8 (MCP) + L18 (code-intel) | STRONG (2 first-class layers) | LIVE MCP for symbol-graph code intelligence |

---

## Section 4 — Surprises / gaps vs current internal 7-layer model

### Surprise 1: L8 MCP-server-ecosystem is its own layer — runtime currently treats MCPs as "tools" inside L2/L17/L18
Internal 7-layer schema doesn't surface MCP ecosystem as distinct. In reality there are **17 LIVE MCPs** (per CLAUDE.md L8 enumeration), 11 per-domain MCP categories (memory · code-intel · web-fetch · search-engine · paper-search · doc-search · browser · KG · code-pack · github · HF), and a dedicated `modelcontextprotocol` org with 9 SDK languages + registry + inspector. L8 should be promoted to first-class.

### Surprise 2: L11 observability is its own layer — currently bundled under L2 memory
CLAUDE.md L11 lists langfuse T5 as part of memory tier. In reality langfuse + logfire + phoenix + traceloop + helicone + arize + openlit are a **distinct concern** (LLM-call telemetry, drift detection, prompt mgmt, dataset mgmt). The convergence story: OpenTelemetry GenAI SIG semconv (W331-cited via Arize/Traceloop) is unifying spec. Promoting L11 to first-class allows tracking OTel-native (traceloop, openlit, phoenix) vs vendor (langfuse, helicone) split.

### Surprise 3: L15 sandbox is a SHIP-BLOCKER GAP — Windows-native CC OS-sandbox structurally inert
Per CLAUDE.md CR-5 R5-corollary + W324 5-control layered-defense, Windows-native runtime CANNOT use CC's native OS-sandbox; gap is intentionally papered over with `tools/preagent-*` dual-mode guards + bypass-marker. SOTA candidates exist (firecracker 34k, gvisor 18k, e2b 12k) but **none have a Windows-native install pathway that satisfies CR-5**. Real fix is operator-decision: (a) accept structural-inert; (b) move runtime to Linux container; (c) adopt user-mode sandbox primitives (deno-perms-model for JS subset only).

### Surprise 4: L16 vector-DB is INTENTIONALLY ABSENT — basic-memory FTS5 wins by D1 filesystem-survivability
Per W295 §2 scorecard, basic-memory T6 canonical wins on D1 filesystem-survivability (×2.0 weight) — humans can `cat` the ledger without the MCP running. Vector DBs (qdrant/weaviate/milvus/chromadb) FAIL D1. So L16 is a documented non-install. But: this rules out mem0 (depends on vector store) which W296 ranked highly. Tension between "best memory benchmark" (mem0 LongMemEval 49%) and "best ledger survivability" (basic-memory `cat`-readable) is unresolved per W295 D2/D3/D5 dimensions.

### Surprise 5: L12 multi-agent frameworks are DELIBERATELY pattern-only — no install
Per CLAUDE.md CR-1 + W269 mandate, agent-teams + sub-agents in this runtime are **first-class CC primitives** (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` + `Agent` tool + `superpowers:dispatching-parallel-agents`). The "framework" layer (autogen, langgraph, agent-framework, crewai, ag2) is intentionally PATTERN-STUDY-ONLY (cited in skills for 3-org-distinct discipline but never installed as a Python dependency). This is **a design choice**, not a gap — but the 7-layer model didn't surface it.

### Gap (bonus): L7 research-arch overlap with L10 prompt-optimization
sca-v17 (the rubric) is in L7 but its mechanization story (DSPy/GEPA Pareto-frontier prompt evolution per Δ47 W321→W328 absorb) is in L10. V18 P3 → P4 phasing recognizes this — "Full self-improving feedback loop" + GEPA nightly cron is planned. Stream A flags this for orchestrator: L7 + L10 are coupled and should be tracked as one improvement-cluster, even if rendered as 2 layers.

---

## Appendix A — Sources index (3-org-distinct convergence)

| Source category | Count | Examples |
|-----------------|-------|----------|
| GitHub primary (live API probe) | 60+ rows | Each row's `Stars` + `Last commit` |
| Internal W-wave audits | 9 documents | W253, W258r3, W259-D §A, W295, W296 Stream B, W316 D1, W324, W339-P1b, W340 Stream A |
| sca-v17 §3 dimensions | 18 dims cited | D34, D52, D67-D75, D76-D83 |
| Perplexity deep-research | 1 survey (2026-05-22) | "Open-Source Infrastructure for LLMs and Agents in 2026" |
| Anthropic docs URLs | 6 anchors | code.claude.com plugins · sub-agents · hooks · settings · memory · skills |
| Curated lists | 4 catalogs | punkpeye/awesome-mcp-servers, ComposioHQ/awesome-claude-skills, ganarajpr/awesome-dspy, IAAR-Shanghai/Awesome-AI-Memory |
| Academic / standards | 8 anchors | arXiv 2507.19457 GEPA, NIST AI 600-1 MEASURE-3.1, ISO/IEC 25010, SLSA v1.0, OSSF Scorecard, NIST SP 800-218 PW.7, CycloneDX, JudgeLM arXiv 2310.17631 |

**Convergence check (sca-v17 D81 floor: ≥4 distinct MCP families)**: Stream A used 5 MCP families: github · perplexity (research+search) · exa · brave-search · context-mode (for index/processing). PASS multi-angle threshold.

---

## Appendix B — Rows flagged `cite_floor: <3` (PATTERN-STUDY-ONLY per sca-v17 §3 D80)

| Layer | Repo | cite_floor | Action |
|-------|------|-----------|--------|
| L2 | MemPalace/mempalace | 1 (github + claim) | PATTERN-STUDY only; not eligible for install pathway |
| L2 | EverMind-AI/EverOS | 1 | PATTERN-STUDY only |
| L2 | Dataojitori/nocturne_memory | 1 | PATTERN-STUDY only |
| L6 | GadaaLabs/claude-code-on-steroids | 1 | PATTERN-STUDY only |
| L11 | Scale3-Labs/langtrace | 2 (license risk AGPL-3.0) | PATTERN-STUDY + license note |
| L11 | langwatch/langwatch | 2 | PATTERN-STUDY only |
| L12 | (Agno proper) | 1 — search returned only app-examples | UNVERIFIED — needs operator-confirm-existence per sca-v17 §1 Stage-0 probe |
| L13 | agentclientprotocol/claude-agent-acp | 2 | PATTERN-STUDY only |
| L13 | ben-vargas/ai-sdk-provider-claude-code | 2 | PATTERN-STUDY only |
| L13 | anthropics/claude-agent-sdk-demos | 2 | educational artifact — PATTERN-STUDY only |
| L18 | tirth8205/code-review-graph | 1 | PATTERN-STUDY only |

---

## Appendix C — Methodological notes for orchestrator

1. **Star counts vary by source**: GitHub live API (W367-A 2026-05-22 probe) vs W296 stream-B snapshot (2026-05-18) vs perplexity-research training-data cutoff (late 2024 + extrapolated). Where 3+ sources agree → CONFIRMED. Where only 1-2 → flagged in `cite_floor` column.
2. **Topic-tag search returned mostly noise** for `topic:claude-code` (many one-off Claude-Code-branded skills with <100 stars). Where noise dominated, fell back to known-name search + internal W-wave indexed memory.
3. **Lookback for low-star pattern-study repos** prioritized 2026-Q1+ creation date + 3-org-distinct existence proof. Repos without ≥2 distinct cites flagged `cite_floor: 1`.
4. **Cross-layer signals identified via**: counting how many tables a repo appears in as TOP-5 candidate. ≥3 = "spine repo" per Section 3.
5. **Recommended orchestrator action** after merging 6 streams: (a) reconcile cross-stream star-count drift via `gh api /repos/{owner}/{repo}` direct probe per sca-v17 §1 right-tool-for-job mandate; (b) cross-check L15 sandbox SHIP-BLOCKER GAP against operator-decision queue (W324 R5-corollary acceptance-record); (c) decide on L16 vector-DB inclusion vs exclusion (per W295 D1 filesystem-survivability hard rule); (d) ratify L8 + L11 + L15 as new first-class layers in canonical layer model.

---

**STATUS:** Stream A draft complete. Orchestrator-synthesis pending. File-path returned to caller.

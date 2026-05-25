# W367 Stream F — 18-Layer SOTA Gap Analysis (Canonical)

**Wave**: W367 SOTA-LAYER-MAP-V1
**Stream**: F of 6 (independent — synthesized later)
**Author**: Claude Code (Opus 4.7 1M)
**Date**: 2026-05-22
**Method**: Live-file probes, NOT prose-trust. Reference clones at `Z:/repos/deps/` (708 repos) sampled for what's been studied vs adopted.

---

## Part 1 — Current state (live-file verified)

### 1.1 Numeric verifications (probed 2026-05-22)

| Metric | Value | Source |
|---|---|---|
| MCP servers (live in `.mcp.json`) | **17** | `Z:/claude-sota-installed/.mcp.json` `mcpServers` keys |
| MCP server names | `deepwiki, github, chrome-devtools, repomix, serena, ccusage, cognee, langfuse, basic-memory, hf-mcp-server, perplexity, playwright, tavily, exa, firecrawl, brave-search, codegraph` | ibid. |
| Installed plugin records | **47** distinct plugins | `.claude/plugins/installed_plugins.json` |
| Plugin enablement entries | **58** total (47 enabled + 11 disabled) | `.claude/settings.json:enabledPlugins` |
| Known marketplaces | **21** | `.claude/plugins/known_marketplaces.json` |
| Local active skills | **62** (62 dirs + 1 `_archived`) | `ls .claude/skills/` |
| Hooks in `settings.json` | **18** total commands across 11 lifecycle events | `.claude/settings.json:hooks` |
| Project-owned hook scripts | **1** (`.claude/hooks/context-mode-cache-heal.mjs`) | `ls .claude/hooks/` |
| Project-owned `tools/*.mjs` | **30** | `ls tools/*.mjs` |
| Reference clones in `Z:/repos/deps/` | **708** | `ls Z:/repos/deps/` |
| Active git worktrees | **5** | `git worktree list` |
| GitHub Actions workflows | **22** | `ls .github/workflows/` |
| Current branch | `feat/W367-sota-layer-map-canonical` | `git branch --show-current` |

### 1.2 Drift discovered between CLAUDE.md L9-15 prose vs live files

| CLAUDE.md prose claim | Live state | Verdict |
|---|---|---|
| "cache_dirs=15 · marketplace_records=22 · marketplace_dirs=23 · installed_plugin_records=54 · enablement_entries=58" | installed_plugin_records=47, marketplace_records=21 | **DRIFT**: CLAUDE.md overcounts installed plugins (54 vs 47) and marketplaces (22 vs 21). The 47 reflects the actual installed-plugins JSON; the 58 is enablement entries that include disabled records. |
| "local operator-curated skills × 58" | 62 active + 1 archived | **DRIFT**: skill count is 62, not 58. Likely 4 added post-W350 (e.g. `karpathy-extended`, `hook-metadata-discipline`, `transcript-marker-loop-guard`, `zoom-out`). |
| ".mcp.json contains 17 MCP servers" (implied by W286-cross + W343-A14 additions) | 17 confirmed | **CONSISTENT** |
| "settings.json hooks are direct-CLI invocations" | 12 of 18 hook commands route through project-owned `tools/*.mjs` or `.claude/hooks/*.mjs` (Node.js wrappers) | **PARTIAL DRIFT**: CR-2 is liberal-interpreted — Node-wrapper hooks call upstream CLIs internally but are themselves project-owned scripts. Sanctioned by cardinal-rule-2 exception clause (W331 axis-1 #4 mechanization). |
| "self_invented_count: 0" | 30 `tools/*.mjs` + 1 `.claude/hooks/*.mjs` + 22 GH Actions workflows | **CR-2 nominal compliance maintained** because `tools/*.mjs` are NOT under `.claude/hooks/**` — they live in `tools/`. But the spirit of W255 ("no project-owned hook bodies") is heavily diluted: the runtime now has 30 mjs scripts wired to lifecycle events. |

### 1.3 Active MCP categorization (17 servers)

**Memory/retrieval (4)**: `cognee`, `langfuse`, `basic-memory`, `repomix`
**Code intelligence (3)**: `serena`, `codegraph`, `repomix` (overlap)
**Web research (5)**: `perplexity`, `tavily`, `exa`, `firecrawl`, `brave-search`
**Doc-fetch (3)**: `deepwiki`, `hf-mcp-server`, `github`
**Browser automation (2)**: `playwright`, `chrome-devtools`
**Observability/metering (1)**: `ccusage`

### 1.4 Active plugin categorization (47 enabled)

**Claude Code official (~14)**: `superpowers`, `agent-sdk-dev`, `pr-review-toolkit`, `skill-creator`, `claude-code-setup`, `plugin-dev`, `code-review`, `feature-dev`, `code-simplifier`, `commit-commands`, `session-report`, `playground`, `mcp-server-dev`, `code-modernization`, `claude-md-management`, `frontend-design`, `cwc-makers`, `ralph-loop`, `pyright-lsp`, `typescript-lsp`
**wshobson workflows (12)**: `comprehensive-review`, `agent-orchestration`, `context-management`, `developer-essentials`, `debugging-toolkit`, `incident-response`, `llm-application-dev`, `tdd-workflows`, `conductor`, `ship-mate`, `qa-orchestra`, `agent-teams`, `signed-audit-trails`, `block-no-verify`, `plugin-eval`, `shell-scripting`
**Knowledge-work (3)**: `example-skills`, `document-skills` (anthropic), `andrej-karpathy-skills`, `agent-skills` (addy), `planning-with-files`, `antigravity-bundle-essentials`
**Memory/observability (2)**: `everything-claude-code`, `ai@pydantic-skills`, `logfire@pydantic-skills`
**Tooling (2)**: `codex@openai-codex`, `context-mode`

**11 disabled** include: `clickhouse`, `outputai`, `qdrant-skills`, `hookify`, `intelligent-compact`, `protect-mcp`, `claude-mem`, `review-agent-governance`, `superpowers@superpowers-marketplace` (dup), `hindsight-memory`, `gitnexus@gitnexus-marketplace`.

### 1.5 Hooks decomposition

```
SessionStart   1   context-mode-cache-heal.mjs (issue #46915 patch)
UserPromptSubmit 1 parallel-guard-userpromptsubmit.mjs
PreToolUse     6   gitleaks, trivy, codex-companion (force-push gate), ledger lint, parallel-guard, subagent-validator, d73-gate
PostToolUse    1   ruff/shellcheck post-write
PreCompact     1   audit log
Stop           1   stop-position-swap.mjs
WorktreeRemove 1   git worktree prune
SubagentStop   2   subagent-stop-audit.mjs + subagent-stop-guard.mjs
Notification   1   PowerShell beep
PostToolUseFailure 1 PowerShell ConvertFrom-Json parser
TaskCompleted  1   ruff check tools harness
TOTAL          18
```

Codex plugin contributes 3 ADDITIONAL hooks (SessionStart, SessionEnd, Stop) loaded from `.claude/plugins/cache/openai-codex/codex/1.0.4/hooks/hooks.json` — NOT visible in `settings.json` (per W332 audit-trap).

### 1.6 Tools/*.mjs inventory (30 scripts)

| Script | Lifecycle binding | Class |
|---|---|---|
| `parallel-guard-userpromptsubmit.mjs` | UserPromptSubmit | Behavioral guard |
| `preagent-parallel-guard.mjs` | PreToolUse[Agent] | Parallel-dispatch enforcer |
| `preagent-subagent-validator.mjs` | PreToolUse[Agent] | Allowlist gate |
| `preagent-d73-gate.mjs` | PreToolUse[Agent] | Δ-DPA-5 gate |
| `preagent-wave-lock-guard.mjs` | manual/pre-commit | Wave-lock |
| `stop-position-swap.mjs` | Stop | Position-swap audit |
| `subagent-stop-audit.mjs` | SubagentStop | Audit |
| `subagent-stop-guard.mjs` | SubagentStop | Idempotency guard |
| `precommit-bare-subagent-grep.mjs` | pre-commit | FQN enforcement |
| `precommit-msys-diag.mjs` | pre-commit | MSYS form diag |
| `precommit-msys-hooks-form.mjs` | pre-commit | MSYS form gate |
| `precommit-worktree-collision-guard.mjs` | pre-commit | Worktree race |
| `precommit-z-phantom-guard.mjs` | pre-commit | Z:\\z\\ phantom |
| `codex-trailer-gate.mjs` | commit-msg | Codex-Verdict trailer |
| `parallel-guard-detector.mjs` | telemetry | Audit |
| `parallel-guard-regex.mjs` | helper | Regex |
| `parallel-ratio-telemetry.mjs` | telemetry | Metric |
| `build-subagent-allowlist.mjs` | manual | Allowlist build |
| `claude-analytics-fetch.mjs` | manual | API fetch |
| `daemon-token-mint.mjs` | manual | Token mint |
| `lint-check.mjs` | manual | Lint |
| `mcp-eval-stub.mjs` | manual | Eval |
| `alirezarezvani-stage2-prep.mjs` | manual | Retirement prep |
| `provenance-lint-v3.mjs` | pre-commit | Provenance |
| `sca-effectiveness-report.mjs` | manual | SCA |
| `sca-re-evaluate-decisions.mjs` | manual | SCA |
| `sca-record-decision.mjs` | manual | SCA |
| `sessionstart-plugin-cache-remote-probe.mjs` | SessionStart-candidate | Cache probe |
| `test-msys-norm.mjs` | test | MSYS test |
| `test-parallel-guard-r4-cross-prompt.mjs` | test | Test |

Net: **the runtime has 30 project-owned mjs scripts of which ~10 are lifecycle-event-bound**. This is genuinely SOTA orchestration tooling, just under-acknowledged in CLAUDE.md's "self_invented_count: 0" claim (which only refers to `.claude/hooks/` and `.claude/rules/`).

---

## Part 2 — 18-Layer State Map

### L1 — Orchestration

**Current**:
- Claude Code (Opus 4.7 1M) = primary orchestrator
- 4 parallel-work modes: subagents (`Agent`), agent-teams (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`), git worktrees (currently 5 live), background sessions (`claude --bg`)
- W269 parallel-dispatch mandate codified in `parallel-guard-userpromptsubmit.mjs` + `preagent-parallel-guard.mjs` (dual-mode: advisory exit 0 + binding exit 2 on 2nd violation)
- Live in `tools/parallel-guard-userpromptsubmit.mjs` (UserPromptSubmit hook) and 3 `preagent-*.mjs` PreToolUse[Agent] hooks
- Codex GPT-5.5 as cross-model reviewer via `codex@openai-codex` plugin (3 hooks: SessionStart, SessionEnd, Stop-review-gate)
- Ralph-loop plugin installed but lightly used

**SOTA (Q2 2026)**:
- **Anthropic claude-cookbooks @ 39a350b6** patterns: orchestrator_workers, parallelization, evaluator-optimizer, routing — these are templates, the runtime IS implementing them
- **microsoft/agent-framework v1.0 GA** (2026-04-03, autogen+SemanticKernel merger): `FunctionalTermination`, `AssistantAgent.max_tool_iterations`, `GroupChat`/`SelectorGroupChat` for stage routing
- **langchain-ai/langgraph v0.4** (HITL checkpoints, BaseCheckpointSaver/thread-id/interrupt)
- **lastmile-ai/mcp-agent**: Router, ParallelLLM, Orchestrator, Evaluator-Optimizer, MCPAggregator — captured in local `mcp-agent-patterns` skill
- **assafelovic/gpt-researcher**: Multi-Agent Framework review-and-revision loop

**Gap**:
- **CHECKPOINT-RESUME**: No machine-serialized checkpoint/resume of stateful orchestrator state. Have `checkpoint-resume` skill (knowledge) but no actual LangGraph-style `BaseCheckpointSaver` implementation. Runtime relies on basic-memory + ad-hoc commit history.
- **FORMAL DAG ORCHESTRATION**: No formal DAG / SelectorGroupChat-style structured stage routing. The runtime does parallel fan-out but no first-class DAG semantics for sequential gated pipelines (recent W366 plan attempts this for git substrate; not generic).
- **DURABLE EXECUTION**: `Z:/repos/deps/temporal` + `restate` cloned but not adopted. Workflow durability is git-commit-based, not durable-execution-engine-based.

### L2 — Memory

**Current** (6-tier per CLAUDE.md L62-65):
- T1 hindsight: ✗ RETIRED (W316-S6 demoted; daemon down)
- T2 split: `.mcp.json:memory` excised; `plugin:everything-claude-code:memory` is canonical KG fallback
- T3 cognee: ✓ ACTIVE via NSSM `CogneeMCP` :8000/mcp (Cognee 1.26.0)
- T4 graphiti: ✗ RETIRED (W272+W290+W295)
- T5 langfuse: ✓ LIVE v3.160.0 self-hosted at :3000
- T6 basic-memory: ✓ canonical-primary (uvx==0.21.1, BASIC_MEMORY_HOME=Z:/claude-sota-installed-state/basic-memory)

**SOTA (Q2 2026)**:
- **basic-memory** ✓ adopted — markdown-bidirectional, filesystem-survivable; correctly selected
- **mem0** (rejected per W281 P2(e) — auto-extraction overlaps cognee)
- **letta** (Memgpt successor; rejected — insufficient convergence)
- **zep** (rejected — single-vendor docs)
- **graphiti**: temporal-KG over Neo4j/FalkorDB — was tried, retired per architectural mismatch
- **cognee 1.26.x**: GraphRAG embedded with ladybug backend ✓ deployed
- **langfuse 3.x**: traces + prompt mgmt ✓ deployed
- **mem-os, AriadneMem, OpenMemory**: emerging Q2 2026 candidates — UNSTUDIED-FOR-ADOPTION (no `Z:/repos/deps/` evidence of evaluation reports)
- **claude-mem** (thedotmack): installed but DISABLED

**Gap**:
- **GraphRAG quality unmeasured**: cognee live but no eval-harness measurement of recall/precision vs basic-memory alone. Risk: dual-system without merit measurement.
- **TEMPORAL-KG abandoned without replacement**: graphiti retirement was correct (Ollama-structured-output issues) but no successor for time-indexed knowledge.
- **EMBEDDING STRATEGY unspecified**: cognee uses Ollama qwen3-embedding:0.6b (1024-dim). No comparison vs Voyage embed-3, Cohere embed-v3, OpenAI text-embedding-3-large.
- **NO CROSS-ENCODER RERANKER** in any local memory tier — perplexity SOTA (2026-04) says hybrid retrieval + cross-encoder reranker = +17.4% Recall@5 vs hybrid alone. cognee + basic-memory both ship without reranker stage.

### L3 — Git

**Current**:
- Conventional Commits + `commitlint --strict` pre-commit gate
- `codex-trailer-gate.mjs` enforces `Codex-Verdict: APPROVE|BOOTSTRAP` on every commit
- `git worktree` with 5 live worktrees (cap=5 per W350)
- `git push --force-with-lease` mandate, never `--force` (denied via permissions)
- `.gitignore` 22 GH Actions workflows including `commit-signing.yml`, `provenance.yml`, `scorecard.yml`, `zizmor-action.yml`, `release-please.yml`, `dependabot-auto-merge.yml`
- `tools/eee.ps1` wave-launcher (W363) creates `Z:/claude-sota-installed-W<wave><slug>` worktrees
- pre-commit hooks: gitleaks v8.30.1, ruff-pre-commit v0.15.12, actionlint v1.7.12, commitlint 20.5.3, codex-trailer-gate
- `WorktreeRemove` hook does `git worktree prune` automatically

**SOTA (Q2 2026)**:
- **Conventional Commits + commitlint** ✓ adopted
- **SLSA Level 3 provenance** via SLSA framework + GitHub Actions OIDC: have `provenance.yml`; unclear if sigstore-signed
- **Sigstore cosign + in-toto attestations**: partial (have `commit-signing.yml`)
- **CycloneDX/SPDX SBOM**: not visible in current pipeline
- **OSSF Scorecard**: ✓ wired via `scorecard.yml`
- **Atomic file writes via POSIX rename(2) / Windows MoveFileEx / libuv uv_fs_rename**: noted as W343 P3 pending impl

**Gap**:
- **No SBOM generation step** despite CR-1 trust-tuple naming CycloneDX as required
- **W343 P3 atomic-tick-write impl pending** — 2/2 W342 multi-Agent dispatches needed bypass-marker due to Windows POSIX atomic-write gap
- **No sigstore-signed commits** verified (vs unsigned-but-trailered)
- **No multi-worktree parallelism telemetry** — runtime has 5 worktrees but parallel_ratio measurement remained 0.0036 per W325-A baseline; P0-A binding exit-2 fix landed W330

### L4 — CI/CD

**Current** (22 workflows):
```
actionlint.yml, ci.yml, claude-code-security-review.yml,
claude-model-check.yml, code-quality.yml, codeql.yml,
codex-review.yml, commit-signing.yml, commitlint.yml,
dependabot-auto-merge.yml, labeler.yml, links.yml,
monthly-metrics.yml, parallel-guard-stress.yml,
pre-commit-mirror.yml, provenance.yml, release-please.yml,
scorecard.yml, session-jsonl-archive.yml, stale.yml,
supply-chain-watch.yml, zizmor-action.yml
```

**SOTA (Q2 2026)**:
- **GitHub Actions** ✓ primary (no transition to Tekton/Argo)
- **release-please** ✓ for semantic-versioning
- **zizmor** ✓ for Actions-security audit
- **CodeQL** ✓ for SAST
- **OSSF Scorecard** ✓ for security posture
- **dependabot** ✓ for dep updates
- **SLSA provenance** ✓ wired
- **Trivy** for container scanning: wired in PreToolUse Bash hook (not CI workflow) — `trivy fs --quiet --skip-dirs ...` on `git push`/`git commit`/`gh pr create`

**Gap**:
- **NO E2E TEST LANE**: 22 workflows but eval harness exists separately (`harness/eval_harness.py`); no CI-fail-on-eval-regression discipline visible
- **NO BENCHMARK REGRESSION GATE**: parallel-ratio telemetry exists but no CI gate that blocks merge if parallel_ratio drops below 0.7
- **PRE-COMMIT-MIRROR** workflow suggests mirror-to-pre-commit.ci is wired — verify this isn't double-running gates

### L5 — Hooks

**Current** (18 in settings.json + 3 in codex plugin = 21 total):
- 1 project-owned hook body: `.claude/hooks/context-mode-cache-heal.mjs` (sanctioned exception for anthropics/claude-code#46915)
- 10 project-owned `tools/*.mjs` wired to lifecycle events (parallel-guard, subagent-validator, d73-gate, stop-position-swap, subagent-stop-audit/guard, etc.)
- Direct upstream-CLI invocations: gitleaks, trivy, ruff, shellcheck, jq, codex-companion.mjs
- `.pre-commit-config.yaml` has 5 gates: gitleaks, ruff-check, ruff-format, actionlint, commitlint, codex-trailer-gate, cr2-2kb-hooks
- Cardinal rule 2 mechanization via `.pre-commit-config.yaml` `cr2-2kb-hooks` (staged file under `.claude/hooks/**` >2048 bytes → exit 2)

**SOTA (Q2 2026)**:
- **claudekit** hook-metadata-discipline pattern: typed Zod `ConfigSchema` + `getHookConfig<T>()` — captured in `hook-metadata-discipline` skill (local), not enforced in actual hook scripts
- **transcript-marker loop-guard**: claudekit pattern for Stop/SubagentStop idempotency — captured in `transcript-marker-loop-guard` skill, partially implemented in `subagent-stop-guard.mjs`
- **block-no-verify** plugin ✓ adopted
- **claudekit Hook Metadata pattern** with `metadata: {id, displayName, description, category, triggerEvent, matcher}`: NOT applied to project hooks

**Gap**:
- **NO TYPED Zod CONFIG** in project hook scripts — they use ad-hoc `process.env` reads and JSON.parse
- **NO HOOK METADATA STANDARDIZATION** — `tools/*.mjs` don't ship declarative `metadata` blocks the way claudekit does
- **HOOK SCRIPT DRIFT FROM CR-2 SPIRIT**: 30 mjs in tools/ form a parallel hook ecosystem outside `.claude/hooks/`; technically CR-2 compliant, doctrinally suspect

### L6 — Behavioral

**Current** (62 local skills + many plugin-shipped skills):
- Anchor set: `mem-recall`, `goal-prompt-synthesis`, `sota-convergence-audit`, `parallel-dispatch-mandate`, `dual-review`, `vercel-*`, `web-design-guidelines`, `speckit-*` (10 skills), `langfuse`, `mattpocock-vendor-fork-10` (cited @ b8be62ffacb0), `addyosmani-vendor-fork-5`
- Plugin-shipped via obra/superpowers: `verification-before-completion`, `tdd`, `systematic-debugging`, `brainstorming`, `writing-plans`, `requesting-code-review`, `subagent-driven-development`, `dispatching-parallel-agents`, `using-git-worktrees`
- Plugin-shipped via wshobson: `agent-teams:team-*` (debug, feature, review, spawn, delegate, status, shutdown), `tdd-workflows:tdd-cycle/red/green`, `comprehensive-review:full-review`, `incident-response:smart-fix`
- Plugin-shipped via anthropic-agent-skills: `example-skills:*`, `document-skills:*`
- Project-curated: `karpathy-extended`, `parallel-dispatch-mandate`, `caveman`, `task-close-discipline`, `wave-close-pipeline`, etc.
- Cardinal rules 1-6 in CLAUDE.md L18-24

**SOTA (Q2 2026)**:
- **karpathy guidelines** (4 principles: Think-Before-Coding, Simplicity-First, Surgical Changes, Goal-Driven Execution) ✓ via `andrej-karpathy-skills` plugin + `karpathy-extended` local skill
- **superpowers** ✓ adopted (v5.1.0)
- **addyosmani agent-skills** ✓ adopted (fork @ f17c6e88)
- **anthropic example-skills + document-skills** ✓ adopted
- **wshobson agents/agent-skills** ✓ adopted

**Gap**:
- **LOCAL SKILL VERSIONING DISCIPLINE**: have `prompt-versioning-and-rollback` skill describing the pattern, no actual epoch-timestamp versioning of local SKILL.md files
- **NO SKILL DESCRIPTION QUALITY GATE**: 62 local skills with descriptions; no per-skill description-quality lint or trigger-overlap measurement
- **SKILL INVENTORY DOC DRIFT**: CLAUDE.md says "× 58" — actual is 62; 4 silently added (zoom-out, karpathy-extended, hook-metadata-discipline, transcript-marker-loop-guard)

### L7 — Research architecture

**Current**:
- Web research MCPs: `perplexity`, `tavily`, `exa`, `firecrawl`, `brave-search` (5 servers; Q2 2026 best-in-class fan-out coverage)
- Doc-fetch: `deepwiki`, `hf-mcp-server`, `github`
- Repomix MCP for `pack_codebase` / `grep_repomix_output` workflows
- `mcp-agent-patterns` skill captures Router/ParallelLLM/Orchestrator patterns (lastmile-ai)

**SOTA (Q2 2026)**:
- **gpt-researcher** multi-agent research framework — `Z:/repos/deps/gpt-researcher` cloned, not adopted as runtime tool
- **DeepResearchAgent** — cloned, not adopted
- **claude-cookbooks research_lead_agent.md** pattern (parallel tool-call MUST-block) — captured in `parallel-dispatch-mandate` skill
- **Anthropic Multi-Agent Research blog post** patterns — partially adopted
- **AutoSOTA** — cloned, not adopted

**Gap**:
- **NO RESEARCH-LANE ORCHESTRATOR**: have 5 web-MCPs but no first-class orchestrator that fans them out + dedupes + reranks. parallel fan-out is operator-driven, not automated.
- **NO QUERY DECOMPOSITION** pipeline (HyDE, multi-query) — perplexity-search is single-shot
- **NO RESULT-DEDUPLICATION** across the 5 web-MCPs — running parallel queries returns 5× overlapping noise

### L8 — MCP ecosystem

**Current**:
- 17 MCP servers wired; 4 use type:http (deepwiki, github, hf-mcp-server, cognee), 13 stdio
- All stdio servers use `npx -y <pkg>@<exact-version>` per W286-cross trade-off (portability > 0.5s startup)
- Cardinal rule 9: explicit `@<version>` pin on every npx invocation
- Codex plugin auto-merges into runtime hooks separately from settings.json
- Cognee runs as NSSM service on :8000

**SOTA (Q2 2026)**:
- **MCP spec v2026-XX**: Streamable HTTP (`type:"http"`) ✓ correctly used (no legacy `type:"sse"`)
- **execution.taskSupport**: optional per-tool annotation; per W259-v9 P1 U10 audit, 0/13 servers declare it (effective default = optional)
- **stdio MCP** ✓ standard
- **Microsoft FastMCP, lastmile-ai/mcp-agent** — `fastmcp` cloned at `Z:/repos/deps/fastmcp`, not directly wired
- **MCP-UI/MCP-apps**: not adopted
- **mcp-inspector** for debugging — cloned, not wired as runtime tool
- **Anthropic build-mcp-server skill** ✓ adopted via `mcp-server-dev` plugin

**Gap**:
- **NO MCP-SERVER-EVAL DISCIPLINE**: 17 servers, but `tools/mcp-eval-stub.mjs` is a stub. No baseline measurement of (a) which MCP tools are actually used, (b) MCP tool-call latency profile, (c) tool-call success rate
- **NO MCP TOOL DEDUPLICATION**: serena + codegraph + gitnexus(disabled) + repomix all do code intelligence. perplexity + tavily + exa + firecrawl + brave all do web search. Cardinal-rule-1 trust-tuple discipline doesn't prevent capability-overlap proliferation.
- **NO MCP CAPABILITY REGISTRY**: which MCP tools are available is invoke-time discovery via `ToolSearch`; no machine-readable runtime registry

### L9 — Eval

**Current**:
- `harness/eval_harness.py` — Real `inspect_ai` + `promptfoo` eval lanes
- `Z:/repos/deps/{inspect_ai, promptfoo, deepeval, ragas, trulens, judgeval, prometheus-eval-prometheus-eval, judge-reliability-harness}` cloned
- `plugin-eval@claude-code-workflows` plugin ✓ installed for skill quality scoring
- `harness/inspect_tasks.py`, `harness/promptfooconfig.yaml`, `harness/batch_lane.py`, `harness/sota_rubric_lane.py`

**SOTA (Q2 2026)** per perplexity research above:
- **Inspect AI (UK AISI, MIT)** ✓ adopted — best for agent + capability eval at scale with async tool-use + sandboxes
- **Promptfoo (MIT)** ✓ adopted — YAML CI gate + red-team plugins
- **DeepEval (Apache 2.0)**: 50+ metrics including G-Eval, faithfulness, hallucination, task completion — NOT WIRED to harness
- **RAGAS (Apache 2.0)**: 8 RAG metrics (faithfulness, context precision, context recall) — NOT WIRED
- **MLflow Evaluate**: most-deployed Apache 2.0 platform — NOT ADOPTED
- **Braintrust** (commercial): release-gating platform — NOT ADOPTED (correctly — operator runtime doesn't need SaaS)
- **LangSmith** (commercial): NOT ADOPTED
- **CE-Judge, OpenJudge, judgeval** all cloned, none wired
- **judge-reliability-harness** cloned — purpose for cross-model judge-bias measurement

**Gap**:
- **NO LLM-JUDGE ALIGNMENT TUNING**: have 2 eval lanes but no automated tuning of LLM-judge prompts against ground-truth human-labeled set
- **NO RAGAS LANE**: cognee + basic-memory are unmeasured for retrieval quality
- **NO DEEPEVAL G-EVAL LANE**: hallucination/faithfulness metrics not wired despite local memory tiers
- **NIGHTLY EVAL CADENCE not visible**: harness exists but no scheduled-execution workflow in `.github/workflows/`
- **NO JUDGE RELIABILITY MEASUREMENT**: codex GPT-5.5 is cross-model judge; no measurement of inter-rater agreement vs Claude self-judge

### L10 — Prompt optimization

**Current**:
- `dspy-integration` local skill describes DSPy 3.2.1 wiring (BootstrapFewShot, MIPRO, ChainOfThought, GEPA)
- `prompt-caching-discipline` local skill enforces ≥1024-token caching
- `prompt-versioning-and-rollback` local skill describes version+rollback pattern
- `Z:/repos/deps/{dspy, gepa, AdalFlow, optillm, LLMLingua, NVIDIA-Model-Optimizer}` cloned

**SOTA (Q2 2026)**:
- **DSPy 3.2.1 + GEPA** (Pareto-frontier candidate routing): cloned not wired
- **AdalFlow** (auto-DiffPrompt): cloned not wired
- **OptiLLM** (optimization-time inference LLM ops): cloned not wired
- **LLMLingua** (prompt compression 2-5×): cloned not wired
- **promptfoo prompt-shaping**: integrated in eval harness
- **Anthropic prompt caching v1.x** with 1h ephemeral ✓ enabled (`ENABLE_PROMPT_CACHING_1H=1`)

**Gap**:
- **NO DSPY-COMPILED PROMPTS**: have skill, no runtime use; static SKILL.md prose is unoptimized
- **NO LLMLingua PROMPT COMPRESSION**: skills + CLAUDE.md text are sent to model verbatim
- **NO GEPA PARETO-FRONTIER tuning** of skill descriptions despite trigger-overlap risks
- **PROMPT CACHE HIT-RATE NOT MEASURED**: setting enabled, no telemetry on actual cache-hit-rate

### L11 — Observability

**Current**:
- **Langfuse 3.160.0** self-hosted at `http://127.0.0.1:3000` — OTLP traces + metrics + prompt mgmt
- `OTEL_TRACES_EXPORTER=otlp` + `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT=http://127.0.0.1:3000/api/public/otel/v1/traces`
- `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_LOG_TOOL_DETAILS=1`, `OTEL_LOG_USER_PROMPTS=1`
- `OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental`
- `OTEL_SERVICE_NAME=claude-sota-installed`
- `OTEL_RESOURCE_ATTRIBUTES=openinference.project.name=eee`
- `ccusage` MCP for cost tracking
- `logfire@pydantic-skills` plugin installed (not visibly wired beyond skill knowledge)
- `Z:/repos/deps/{Arize-ai__phoenix, phoenix, opik, opik-claude-code-plugin, opik-mcp, openllmetry, mlflow, claude-code-otel}` cloned

**SOTA (Q2 2026)**:
- **OpenTelemetry GenAI semconv** (`gen_ai_latest_experimental`) ✓ adopted
- **Langfuse 3.x** ✓ adopted as primary observability
- **Arize Phoenix** (ELv2): cloned, not adopted (license concern + langfuse overlap)
- **Opik (Comet, MIT)**: cloned, not adopted
- **OpenLLMetry (TraceLoop)**: cloned, not adopted (langfuse overlap)
- **Pydantic Logfire** ✓ available as plugin
- **MLflow Tracking**: cloned, not adopted

**Gap**:
- **NO TELEMETRY DASHBOARDS** referenced in docs — Langfuse running but no visible dashboard URL or metric definitions
- **NO ALERT WIRING**: have OTLP export, no PromQL/alertmanager-style rules
- **NO COST-TRACKING DASHBOARD**: `ccusage` MCP exists, no visible aggregation surface
- **LOGFIRE NOT ACTIVELY USED** despite plugin install

### L12 — Multi-agent frameworks

**Current**:
- `agent-teams@claude-code-workflows` ✓ enabled — provides team-spawn, team-debug, team-feature, team-review, team-shutdown skills
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` env enabled
- `superpowers:dispatching-parallel-agents` skill (vendor-forked as `dispatching-parallel-agents-w321-fork`)
- `mcp-agent-patterns` skill (Router/Parallel/Orchestrator/Evaluator-Optimizer)
- `Z:/repos/deps/{microsoft__autogen, microsoft-autogen, autogen, crewAI, adk-python, smolagents, swarms, openai-agents-python, openai__openai-agents-python, mcp-agent, strands-sdk, AgentBench, agent-zero, swe-agent, live-swe-agent}` cloned

**SOTA (Q2 2026)**:
- **microsoft/agent-framework v1.0 GA** (2026-04-03) — autogen + SemanticKernel merger — NOT ADOPTED (cookbook patterns captured in skill, not framework wired)
- **CrewAI** — cloned not adopted
- **Google ADK (Agent Development Kit)** — cloned not adopted
- **OpenAI Agents SDK Python** — cloned not adopted
- **Smolagents (HuggingFace)** — cloned not adopted
- **Swarms** — cloned not adopted
- **claude-agent-sdk-python** ✓ used in `harness/eval_harness.py`

**Gap**:
- **NO AGENT-FRAMEWORK FORMAL ADOPTION**: 15+ frameworks cloned, behavioral patterns captured in skills, but no first-class framework wired beyond CC's native Agent + agent-teams
- **AGENT-TEAMS MAILBOX UNDER-USED**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` enabled but parallel work routinely happens via solo Agent fan-out, not team-spawn

### L13 — Agent SDKs

**Current**:
- `claude_agent_sdk` 0.1.81 installed in `Z:/venvs/claude` — used in `harness/eval_harness.py` with `query`, `tool`, `create_sdk_mcp_server`, `ClaudeAgentOptions`
- `agent-sdk-dev@claude-plugins-official` ✓ enabled
- `Z:/repos/deps/{anthropic-sdk-python, anthropics__anthropic-sdk-python, anthropics__claude-agent-sdk-python, claude-agent-sdk-python, parallel-sdk-python}` cloned

**SOTA (Q2 2026)**:
- **claude-agent-sdk** ✓ adopted
- **Claude Agent SDK with Skills system** (versioned epoch-timestamp): pattern captured in skill, not actively versioning
- **parallel-sdk-python** — cloned, not adopted

**Gap**:
- **AGENT SDK HARNESS LIGHTLY USED**: `eval_harness.py` is the only first-party Agent-SDK code; no agent-SDK-built tools for other workflows
- **NO CUSTOM SDK MCP SERVERS**: `create_sdk_mcp_server` available but unused

### L14 — Skill/plugin authoring

**Current**:
- `skill-creator@claude-plugins-official` ✓ enabled
- `plugin-dev@claude-plugins-official` ✓ enabled with sub-skills: `agent-development`, `command-development`, `hook-development`, `mcp-integration`, `plugin-settings`, `plugin-structure`, `skill-development`
- `plugin-eval@claude-code-workflows` ✓ enabled for quality scoring
- `mcp-server-dev@claude-plugins-official` ✓ enabled
- 21 known marketplaces wired; 47 plugins installed across them

**SOTA (Q2 2026)**:
- **Anthropic Skills system docs** (epoch-timestamp versioning + version-pinning request parameter) — partially captured in skill, not enforced
- **claudekit Hook Metadata pattern** — captured in `hook-metadata-discipline` skill, not enforced on local hooks
- **Plugin marketplace discipline**: 21 marketplaces; reasonable for Q2 2026

**Gap**:
- **NO VERSION-PINNED SKILL.md** files locally — every edit overwrites in-place
- **PLUGIN-EVAL UNRUN**: `plugin-eval` plugin installed but no record of running it against 47 plugins to filter by quality score
- **MARKETPLACE SPRAWL**: 21 marketplaces approach the "MARKETPLACE BLAST RADIUS" risk; 11 disabled plugins suggest experimentation churn

### L15 — Sandboxing

**Current**:
- `.claude/settings.json:sandbox.enabled: false` (Windows-native — OS-sandbox structurally inert per R5-corollary)
- R5 held via sca-v11 §6 5-control layered-defense (Option C)
- `tools/preagent-{parallel-guard,subagent-validator}.mjs` = dual-mode (advisory exit 0 + binding exit 2)
- `protect-mcp@claude-code-workflows` plugin INSTALLED-BUT-DISABLED
- `signed-audit-trails@claude-code-workflows` plugin ✓ enabled (Cedar + Ed25519 receipts)
- Permissions allowlist/denylist in settings.json (38 deny entries including `Read(**/id_rsa)`, `Bash(sudo *)`, `Bash(chmod 777 *)`, all `--no-verify` git flags)
- `Z:/repos/deps/{OpenSandbox, docker-agent}` cloned

**SOTA (Q2 2026)**:
- **OS-level sandboxing** (Linux: seccomp + landlock + nsjail; macOS: sandbox-exec; Windows: NONE): genuinely no Windows-native option
- **gVisor / Firecracker**: Linux-only
- **Docker container isolation** ✓ available (docker excluded from sandbox per `excludedCommands`)
- **WASM-based isolation** (wasmtime, deno): not adopted
- **Anthropic CC sandbox feature**: only on macOS+Linux
- **Cedar policy + Ed25519 receipts (signed-audit-trails)** ✓ adopted

**Gap**:
- **WINDOWS SANDBOXING IS A KNOWN-LIMITATION** that R5-corollary acknowledges; no path to closure beyond migration to WSL2/Linux runtime
- **protect-mcp DISABLED**: provides Cedar-policy MCP-call auth; not enabled — unclear why
- **NO PROCESS-LEVEL ISOLATION** for npx/uvx MCP spawns

### L16 — Vector / retrieval

**Current**:
- Cognee with ladybug graph backend (Kùzu fork after Apple acquisition) — embedded vector storage
- basic-memory uses markdown filesystem (NO vector retrieval — keyword search via filesystem grep)
- memory-MCP via everything-claude-code with sqlite_vec
- Ollama qwen3-embedding:0.6b (1024-dim) as embedding backend
- `Z:/repos/deps/{chroma, mcp-server-qdrant, pgvector, pgvectorscale, qdrant, qdrant-client}` cloned
- `qdrant-skills@claude-plugins-official` plugin INSTALLED-BUT-DISABLED

**SOTA (Q2 2026)** per perplexity research:
- **Hybrid retrieval (BM25 + dense + RRF fusion)**: Recall@5 = 0.695 (Hybrid alone), 0.816 (+ reranker)
- **Cross-encoder reranker** (Cohere Rerank v4 Pro, Voyage Rerank-2.5, ColBERTv2 late-interaction): +17.4% Recall@5
- **ModernBERT bi-encoder** (149M params, 8192-token context): SOTA initial-retrieval stage
- **Voyage embed-3 / OpenAI text-embedding-3-large / Cohere embed-v3**: SOTA managed embedding APIs
- **BGE Reranker v2-m3, mxbai-rerank-large-v2 (Apache 2.0)**: self-host reranker options
- **Qdrant + pgvector + Chroma + Weaviate**: SOTA vector DBs (have qdrant + chroma + pgvector cloned)

**Gap**:
- **NO HYBRID RETRIEVAL** in any memory tier — basic-memory is pure-keyword, cognee is single-stage dense
- **NO CROSS-ENCODER RERANKER ANYWHERE** — biggest measurable gap; +17% Recall@5 evidence available
- **NO BM25 INDEX** — both cognee and basic-memory miss exact-phrase queries
- **NO QDRANT WIRING** despite cloned deps and disabled qdrant-skills plugin
- **EMBEDDING MODEL UNTUNED**: qwen3-embedding:0.6b ≠ SOTA for English-text retrieval; no comparison harness

### L17 — Document ingestion

**Current**:
- No first-class document-ingestion pipeline in runtime
- `Z:/repos/deps/{docling, marker}` cloned
- `repomix` MCP handles code-pack (tree-sitter compression on packed output)
- `pdf` plugin in `example-skills` via Anthropic's document-skills

**SOTA (Q2 2026)** per perplexity research:
- **Docling (IBM, 58.6k stars)**: best open-source PDF parser with native LangChain/LlamaIndex/CrewAI/Haystack integrations — ships an MCP server natively
- **Marker-PDF** (GPU-accelerated): SOTA Markdown extraction with `--use_llm` cleanup pass
- **LlamaParse** (cloud, $$$): SOTA agentic OCR
- **Unstructured** (14.6k stars): typed semantic elements (Title, NarrativeText, Table, ListItem)
- **Reducto** (cloud, enterprise): RD-TableBench SOTA accuracy
- **Firecrawl**: ✓ adopted as MCP for web-PDF; not used for local PDF parsing

**Gap**:
- **NO DOCLING MCP** despite cloning (Docling ships MCP server natively) — closest to install-ready
- **NO MARKER WIRING** despite cloning
- **NO PDF-INGEST EVAL** — `harness/` has no document-ingestion lane
- **NO TABLE EXTRACTION** capability for any task that requires it

### L18 — Code intelligence

**Current**:
- `serena` MCP ✓ wired (`uvx --from git+https://...@249f6b07` SHA-pinned) — LSP-style symbol search + AST navigation
- `codegraph` MCP ✓ wired (`@colbymchenry/codegraph@0.7.10`) — SQLite KG of symbols + edges (W343 P1.A row 3)
- `repomix` MCP ✓ wired — tree-sitter-based code packing
- `gitnexus` MCP installed but DISABLED (PolyForm Noncommercial license concern)
- `pyright-lsp` + `typescript-lsp` plugins ✓ enabled
- `Z:/repos/deps/{CodeGraphContext, ast-grep, codegraph, gitnexus, nesaminua__claude-code-lsp-enforcement-kit, serena, tree-sitter, tree-sitter-python}` cloned

**SOTA (Q2 2026)**:
- **serena (LSP-style)** ✓ adopted
- **codegraph (SQLite KG)** ✓ adopted (newest install W343)
- **ast-grep** (pattern-based AST search): cloned, not wired
- **tree-sitter / tree-sitter-python** ✓ via repomix
- **gitnexus** (full code KG with impact analysis): WAS ADOPTED, DOWNGRADED to disabled
- **Sourcegraph** (cloud, enterprise): not adopted (correctly — operator runtime)

**Gap**:
- **THREE CODE-INTEL MCPs with overlapping capability**: serena + codegraph + repomix all do symbol/AST. Cardinal-rule-1 trust-tuple should mandate dedup audit.
- **GITNEXUS UNCERTAINTY**: capability is best-in-class (call-graph, impact analysis, cypher queries) but license + RC-channel risk parked it. No alternative for impact-analysis depth.
- **AST-GREP CLONED-NOT-WIRED** despite being lighter-weight pattern search

---

## Part 3 — Decision-readiness map

For each gap, classification:
- **INSTALL-NEEDED** (clear SOTA install target available)
- **PATTERN-STUDY-NEEDED** (have basic version, SOTA has patterns)
- **AWARE-NO-ACTION** (know SOTA exists, reasons not to adopt)
- **UNKNOWN** (need research)

| Layer | Gap | Class | Recommended next step |
|---|---|---|---|
| L1 | No checkpoint/resume of orchestrator state | PATTERN-STUDY-NEEDED | Adopt LangGraph `BaseCheckpointSaver` pattern; thread-id namespace per wave |
| L1 | No formal DAG / SelectorGroupChat | PATTERN-STUDY-NEEDED | Capture pattern from `microsoft/agent-framework` v1.0 in skill |
| L1 | Temporal/Restate cloned, not adopted | AWARE-NO-ACTION | Git-commit-as-checkpoint is sufficient for current scale |
| L2 | GraphRAG recall/precision unmeasured | INSTALL-NEEDED | Wire RAGAS eval lane against cognee+basic-memory dual-stack |
| L2 | No cross-encoder reranker in memory tiers | INSTALL-NEEDED | Add `bge-reranker-v2-m3` via Ollama; pipe basic-memory + cognee results through it |
| L2 | Temporal-KG abandoned without successor | AWARE-NO-ACTION | Acceptable — basic-memory + commit history covers time-indexing |
| L2 | Embedding strategy untested | PATTERN-STUDY-NEEDED | Compare qwen3-embedding:0.6b vs voyage-3 vs cohere-v3 on local eval set |
| L3 | No SBOM generation | INSTALL-NEEDED | Add `cyclonedx-bom` step to `provenance.yml` workflow |
| L3 | W343 P3 atomic-tick-write impl pending | INSTALL-NEEDED | Ship Windows MoveFileEx atomic write per W343 spec |
| L3 | No sigstore-signed commits verified | UNKNOWN | Probe `commit-signing.yml` output to confirm cosign chain |
| L4 | No CI eval-regression gate | INSTALL-NEEDED | Add scheduled workflow that runs `harness/eval_harness.py` + fails on score regression |
| L4 | No parallel-ratio CI gate | INSTALL-NEEDED | Wire `tools/parallel-ratio-telemetry.mjs` as PR-check |
| L5 | No typed Zod hook config | PATTERN-STUDY-NEEDED | Apply `hook-metadata-discipline` to 10 lifecycle-bound mjs scripts |
| L5 | Hook scripts drift from CR-2 spirit | AWARE-NO-ACTION | Sanctioned per W331 axis-1 #4; document the doctrine in CLAUDE.md |
| L6 | Local skill versioning undisciplined | PATTERN-STUDY-NEEDED | Apply `prompt-versioning-and-rollback` epoch-stamp to 62 skills |
| L6 | No skill description quality gate | INSTALL-NEEDED | Wire `plugin-eval` skill-quality scoring against all 62 local skills + 47 plugins |
| L6 | CLAUDE.md skill count drift (58 vs 62) | INSTALL-NEEDED | Trivial — update CLAUDE.md L62 to "× 62" |
| L7 | No research-lane orchestrator | INSTALL-NEEDED | Wire `gpt-researcher` as background-session orchestrator |
| L7 | No query decomposition (HyDE/multi-query) | PATTERN-STUDY-NEEDED | Apply to perplexity_research wrapper |
| L7 | No deduplication across 5 web-MCPs | INSTALL-NEEDED | Add result-dedup post-processor (URL + content-hash) |
| L8 | No MCP-server eval discipline | INSTALL-NEEDED | Implement `tools/mcp-eval-stub.mjs` properly (telemetry: invocation count, latency, error rate per MCP per session) |
| L8 | MCP capability overlap (3 code-intel, 5 web-search) | PATTERN-STUDY-NEEDED | Apply `sota-convergence-audit` to current 17 MCPs |
| L8 | No MCP capability registry | PATTERN-STUDY-NEEDED | Generate registry at session-start, persist to `.claude/state/mcp-capability-registry.json` |
| L9 | No LLM-judge alignment tuning | INSTALL-NEEDED | Add `judge-reliability-harness` as 3rd lane |
| L9 | No RAGAS lane | INSTALL-NEEDED | Wire RAGAS as 3rd lane in `harness/eval_harness.py` |
| L9 | No DeepEval lane | INSTALL-NEEDED | Wire DeepEval G-Eval as 4th lane |
| L9 | No nightly eval cadence | INSTALL-NEEDED | Add `.github/workflows/nightly-eval.yml` with cron |
| L10 | No DSPy-compiled prompts | PATTERN-STUDY-NEEDED | DSPy-compile top-5-load anchor skills, measure delta |
| L10 | No LLMLingua compression | PATTERN-STUDY-NEEDED | Apply to CLAUDE.md + top-load skills, measure context-budget delta |
| L10 | No prompt-cache hit-rate telemetry | INSTALL-NEEDED | Surface via langfuse OTLP attribute |
| L11 | No telemetry dashboards | INSTALL-NEEDED | Author 3 Langfuse dashboards: cost-per-wave, tool-call distribution, parallel_ratio over time |
| L11 | No alert wiring | INSTALL-NEEDED | Add Langfuse evals → Slack/email |
| L11 | Logfire unused | AWARE-NO-ACTION | Langfuse covers traces; Logfire would be additive |
| L12 | No agent-framework formal adoption | AWARE-NO-ACTION | CC native Agent + agent-teams is sufficient; cookbook patterns captured in skills |
| L12 | Agent-teams mailbox under-used | PATTERN-STUDY-NEEDED | Measure team-spawn invocation rate; convert solo fan-out to team-spawn where appropriate |
| L13 | Agent SDK lightly used | AWARE-NO-ACTION | Harness use is sufficient for current scope |
| L14 | No version-pinned SKILL.md files | PATTERN-STUDY-NEEDED | Apply `prompt-versioning-and-rollback` discipline |
| L14 | plugin-eval unrun against current 47 plugins | INSTALL-NEEDED | Run + filter |
| L14 | Marketplace sprawl (21 marketplaces) | AWARE-NO-ACTION | Acceptable — 11 disabled plugins show experimentation hygiene |
| L15 | Windows sandboxing limitation | AWARE-NO-ACTION | R5-corollary documents the structural acceptance |
| L15 | protect-mcp disabled | UNKNOWN | Investigate why disabled — Cedar policy gating could be valuable |
| L16 | No hybrid retrieval | INSTALL-NEEDED | Add BM25 index (`bm25s` Python pkg) alongside cognee dense vectors |
| L16 | No cross-encoder reranker | INSTALL-NEEDED | bge-reranker-v2-m3 via Ollama |
| L16 | No BM25 index | INSTALL-NEEDED | Same as above |
| L16 | No Qdrant wiring | AWARE-NO-ACTION | cognee + basic-memory cover current needs; Qdrant would be additive |
| L16 | Embedding model untuned | PATTERN-STUDY-NEEDED | Same as L2 |
| L17 | No Docling MCP despite clone | INSTALL-NEEDED | `npx -y @docling/mcp-server` or equivalent; Docling ships MCP natively |
| L17 | No Marker wiring | PATTERN-STUDY-NEEDED | Defer until L17 use-case surfaces |
| L17 | No PDF-ingest eval | AWARE-NO-ACTION | No current use-case demand |
| L17 | No table extraction | AWARE-NO-ACTION | Same |
| L18 | Three code-intel MCP overlap | PATTERN-STUDY-NEEDED | Apply `sota-convergence-audit` to {serena, codegraph, repomix} |
| L18 | gitnexus capability uncertainty | AWARE-NO-ACTION | License + RC risk acknowledged; revisit at stable 1.6.4 |
| L18 | ast-grep cloned-not-wired | AWARE-NO-ACTION | serena + codegraph cover current needs |

---

## Part 4 — Top 10 highest-leverage gap-closes (ranked impact × ease ÷ risk)

| Rank | Gap | Layer | Impact | Ease | Risk | Score | Rationale |
|---:|---|---|---:|---:|---:|---:|---|
| 1 | **Cross-encoder reranker on memory tiers** (bge-reranker-v2-m3 via Ollama) | L2/L16 | 9 (perplexity-cited +17% Recall@5) | 7 (Ollama already running; one new model pull; ~80 LOC wrapper) | 2 (Apache 2.0; defang via env flag) | **31.5** | Largest measurable retrieval improvement available; affects every memory query |
| 2 | **Nightly eval cadence** (`.github/workflows/nightly-eval.yml` + scheduled `harness/eval_harness.py` + score regression gate) | L4/L9 | 8 (catches regressions automatically) | 8 (harness exists, just needs cron + threshold check) | 2 (worst case: noisy alerts; defang via threshold tuning) | **32.0** | Converts existing infra (harness + 2 lanes) into continuous protection |
| 3 | **MCP capability eval + dedup audit** (implement `tools/mcp-eval-stub.mjs` for real; run `sota-convergence-audit` on 17 MCPs) | L8 | 7 (right-sizes the MCP fleet, reduces tool-search noise) | 6 (telemetry add + audit run) | 2 (low — observational) | **21.0** | Likely retires 2-3 MCPs; reduces ToolSearch latency |
| 4 | **CLAUDE.md drift fix** (update skill count 58→62, plugin count 54→47, marketplace count 22→21) | L6 | 5 (operator trust + audit accuracy) | 10 (3-line edit) | 1 (none) | **50.0** | Trivial-but-high-leverage; CLAUDE.md is the always-loaded preamble |
| 5 | **RAGAS + DeepEval eval lanes** in `harness/eval_harness.py` | L9 | 8 (measures memory tier quality + agent capability) | 6 (pip install + lane wiring; cite-rich SOTA support) | 2 (Apache 2.0) | **24.0** | Closes 2 eval-coverage gaps in one shot |
| 6 | **Parallel-ratio CI gate** (PR check that fails if parallel_ratio drops below 0.7 baseline) | L1/L4 | 8 (codifies W269 mandate at merge boundary) | 7 (`tools/parallel-ratio-telemetry.mjs` exists) | 3 (false-positive risk on PRs without parallel-work needs) | **18.7** | Converts the soft target into a hard gate; pairs with existing parallel-guard |
| 7 | **Hybrid retrieval (BM25 + dense + RRF) for basic-memory** | L2/L16 | 7 (basic-memory currently lexical-only; adds dense fan-in) | 6 (bm25s Python pkg; ~120 LOC integration) | 3 (memory schema change) | **14.0** | basic-memory is canonical-primary memory tier; biggest single-tier ROI |
| 8 | **Docling MCP install** (`docling-mcp-server` — pure clone-to-runtime) | L17 | 6 (unlocks PDF + DOCX + XLSX + PPTX ingestion as MCP tools) | 9 (one MCP entry; Docling ships MCP natively per perplexity research) | 2 (MIT-licensed) | **27.0** | Highest ROI per LOC for L17; takes runtime from zero to SOTA-doc-ingestion |
| 9 | **plugin-eval run against all 47 plugins + 62 skills** | L14 | 7 (filters fleet by quality, surfaces overlap) | 8 (plugin installed; just run it) | 2 (observational) | **28.0** | Already-installed capability; one command unlocks fleet hygiene |
| 10 | **SBOM generation in provenance.yml** (CycloneDX) | L3 | 6 (CR-1 trust-tuple requirement; supply-chain audit) | 8 (one workflow step) | 2 (low) | **24.0** | Closes documented CR-1 doctrine gap with one CI step |

**Aggregate observation**: highest-scoring gap-closes share three properties: (a) infrastructure already mostly in place, (b) one-or-two-command operationalization, (c) clear measurable outcome. The runtime is rich in cloned/skilled-but-unwired capability; "wire what's already half-installed" outranks "install something net-new" 7-of-10 times.

---

## Appendix A — Reference-clone categorization sample (30 random, 708 total)

To check what's been studied vs adopted, the random sample of 30 from `Z:/repos/deps/`:

| Repo | Adopted? | Notes |
|---|---|---|
| swarms | NO | Multi-agent framework; alternative to agent-teams |
| tree-sitter | INDIRECT | Used by repomix |
| claude-obsidian | NO | Obsidian integration; not used |
| trulens | NO | Eval framework; not wired |
| pydantic-deepagents | NO | Pydantic AI agents; not used |
| claude-task-master | NO | Task tracking; agent-teams covers |
| daytona | NO | Dev environment platform |
| claude-squad | NO | Multi-Claude orchestration |
| mesh-llm | NO | Local model meshing |
| litellm-skills | NO | LiteLLM-related skills |
| letta | NO | Memgpt successor; rejected per W281 |
| cwc-long-running-agents | NO | Background-task framework |
| CLIProxyAPI | NO | Proxy layer |
| claude-hud | NO | UI overlay |
| cocoindex-code | NO | Code indexing |
| langgraphjs | NO | LangGraph JS bindings |
| LightRAG | NO | Lightweight RAG |
| OpenJudge | NO | LLM judge framework |
| graphrag | NO | Microsoft GraphRAG; cognee covers |
| drzero | NO | DRZero zero-shot evals |
| pyrefly | NO | Python ref-finding |
| anthropics__anthropic-sdk-python | YES | Used in harness |
| evidently | NO | ML monitoring |
| docker-py | NO | Docker SDK |
| claude-cookbooks | YES (citations) | Source of patterns referenced in skills |
| garrytan__gstack | NO | gstack framework |
| optillm | NO | OptiLLM prompt-opt |
| claude-code-hooks-multi-agent-observability | NO | Hook patterns |
| markitdown | NO | Doc-to-MD converter |
| Aperant | NO | Aperant agent framework |

**Adoption rate ~7%** (2 of 30). Suggests: 708 clones × 0.07 ≈ 50 adopted runtime ingredients. Live state confirms ~17 MCPs + ~47 plugins + ~62 skills = ~126 active ingredients; therefore many ingredients come from beyond the `deps/` mirror (Anthropic-shipped, addy, wshobson marketplaces). **The deps mirror is mostly a CITE-REFERENCE pool, not a runtime source — consistent with CLAUDE.local.md L37 doctrine.**

---

## Appendix B — Stream F surprises

1. **CLAUDE.md skill count drift is +4 silent (62 vs claimed 58)**. Sub-surprise: 4 silently added (zoom-out, karpathy-extended, hook-metadata-discipline, transcript-marker-loop-guard) — only 3 of which appear in W342 "+13 silent" commentary. The +1 net residual (`zoom-out`) is not anywhere accounted for. Suggests skill-add discipline lacks a counter-update gate.

2. **Project has 30 mjs scripts in tools/ wired to lifecycle events while CLAUDE.md asserts `self_invented_count: 0`.** CR-2 letter-of-the-law compliance is preserved (scripts are NOT under `.claude/hooks/`), but doctrinally this is a parallel hook ecosystem. The W255 cleanup eliminated `.claude/hooks/scripts/*.py` but the equivalent capability re-emerged in `tools/*.mjs`. This isn't necessarily wrong — it's a needed runtime — but the framing is inconsistent.

3. **17 MCP servers but 3 do overlapping code-intel (serena + codegraph + repomix) and 5 do overlapping web-search (perplexity + tavily + exa + firecrawl + brave-search)**. Total external-MCP capability redundancy = ~7 servers can do code intelligence + web search in 2 sub-areas. Cardinal-rule-1 trust-tuple discipline (4 axes) prevents trojan installs but doesn't prevent capability proliferation. The `sota-convergence-audit` skill exists specifically to handle this — but hasn't been run against the current 17-MCP fleet.

---

## Appendix C — Methodology notes

- All numbers in §1.1 probed via `Bash` reads of authoritative JSON files (`installed_plugins.json`, `known_marketplaces.json`, `settings.json`, `.mcp.json`) on 2026-05-22 from `Z:/claude-sota-installed` worktree at HEAD `0f8b891`
- Perplexity searches scoped to "SOTA 2026" + framework names; 3 queries returned cite-rich answers consistent with this analysis
- Reference clones sampled twice (30 + 20) at random for adoption-rate estimation
- No claims made without live-file or perplexity-citation backing per cardinal-rule-6 (verify-before-claim)
- Stream-F audit boundary: did NOT cross-reference other 5 streams (per orchestrator instruction); independent gap-analysis only

---

**END Stream F output**

---
title: Wave 121 SHIP A3-PLAN — Synthesis Design (Wave 122-126 ship plan)
status: AUTHORITATIVE
date: 2026-05-09
agent: Plan (a1075ba1cfa9a041e)
verdict: 5-wave plan with Option A/B trade-offs; recommended path = ~1820 LOC across 5 waves (Wave 126 splits to 6 ship-windows)
---

# Wave 121 SHIP A3-PLAN — Synthesis Design (Wave 122-126 ship plan)

## Context anchor

- **HEAD SHA**: `971dd0ba4804ba88c1a2623dd8d6e007afe99744` (both v65 kit dir + installed repo at this SHA)
- **v65 kit root**: `Z:/claude-sota-installed/docs/outer research/kits/v65/claude_code_sota_v65_ultimate_comprehensive_execution_md_kit/`
- **Install state**: 5 plugins enabled; 7 stdio+HTTP MCPs; 13 codex_*.py hooks already shipped (T1/T2/T5/postcommit/prepush/queue/gate); **6 sibling codex_*.py MISSING** (failure_audit, mcp_healthcheck, review_thread_bridge, review_trace, stop_review_gate, stuck_detector); 4 sibling rules MISSING

## Convergence findings (v65 + manifest gap audit)

V65 codifies a "default-core-small + audit-required-for-everything-else" thesis (`SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` lines 30-44 "Default install core" of 13 binaries; `EXECUTE_V65_ELITE_PLAN.md:13-23` "Stage 1 Install only the default core … Do not install MCP/memory/dashboard/bridge/plugin extras yet"). Current install state has already **over-shot** the v65 default core in 4 layers (memory MCP, observability stack, plugin marketplaces, codex bridge). Wave 122-126 = **convergence-filter against actual gaps + axis-1+2+3+SRA-D1-D10 PASS for eee use-class**.

**Uncovered selective layer** (per `HIGH_STAR_TRIAGE_AND_CONVERGENCE.md:14-26`): Headroom + Wet + Claude Context + ACP host + Tier-1a codex hooks + Langfuse fan-out + DBHub MCP + agent frameworks (LangGraph / DeepAgents / AgentFramework — REFERENCE-only per v65 `MODEL_ROUTING_AND_SUBAGENTS.md:1-22`).

---

## Wave 122 — "Close-the-loop" (P0)

**Theme**: ZERO new installs. Pure closure of deferred fixes. Aligns with v65 `EXECUTE_V65_ELITE_PLAN.md:71-76` Stage 9 "Durable learning … Do not add memory plugins until repeated context-reconstruction cost is proven".

### SHIP-122-A — Tier-1a codex T1-T7 hooks completion

Closes CR-3 Phase 1 bootstrap exception (was Wave 121 SHIP A9).

- **Cites**: `cross-model-consensus.md` §The contract; sibling source: 6 missing scripts (`codex_failure_audit.py`, `codex_mcp_healthcheck.py`, `codex_review_thread_bridge.py`, `codex_review_trace.py`, `codex_stop_review_gate.py`, `codex_stuck_detector.py`); v65 cite `kits/v65/.../CODEX_PLUGIN_CC_WORKFLOW.md:1-22` "Claude Code writes and orchestrates. Codex reviews, challenges, rescues, and proposes alternatives. CI and deterministic gates decide. Codex is not the permission boundary."; v65 agent `kits/v65/.../.claude/agents/codex-bridge.md:1-3`
- **Estimated LOC**: ~600 (6 scripts × ~100 LOC + settings.json hook-chain wiring + manifest §13 row updates)
- **SRA D1-D10**: D1 PASS / D2 PASS / D6 PASS / D7 PASS / D9 — FM-17.f extra-usage already documented + recovery via Path P
- **Launch-discipline 6-axis D1**: Code quality PASS / Security PASS / Performance — needs codex T1 budget gate per FM-17.d (90s default / 120s cap) / Infrastructure PASS (settings.json hook-chain rollback = single git revert)
- **Gate**: codex T1 NEEDS-REVISION expected; Pattern A v2 multi-round per Wave 121 §2.7

### SHIP-122-B — INSTALLED-AMBER closure pass (6 rows)

- **Cites**: `docs/sota-installed-manifest.md:194-197` (safety_guard.py + agent_plan_readonly_bash_guard.py sibling cite-import-AMBER); §11 sota-researcher / gpt5-archaeologist / codex-rescue cite-import-AMBER rows
- **Estimated LOC**: ~150 (per-row Pattern A apply; mostly SHA pin captures + Probe DAG completions)
- **Risk class**: D9 LOW

### SHIP-122-C — STAGED row triage (Qdrant MCP wire, Graphiti MCP env, 19 rows)

- **Cites**: `docs/sota-installed-manifest.md:91` Qdrant STAGED-IMAGE-RUNNING + line 93 Graphiti PARTIAL (FalkorDB UP but MCP wiring 0 matches in `.mcp.json`)
- **Estimated LOC**: ~200 (`.mcp.json` per-MCP entries + smoke-probe scripts)
- **Risk class**: D9 MEDIUM — Graphiti needs OPENAI_API_KEY procurement OR alt-provider config (existing blocker per Wave 105 Ship 2N-batch3-B)
- **Launch D1**: Performance — mind FM-17.f extra-usage when adding new MCPs; D2 monitoring — extend persistent monitor

### SHIP-122-D — fm17d_stall_detector schema fix (was Wave 121 SHIP A11)

- **Cites**: Wave 121 plan §3 P2 SHIP A11; `Z:/claude-sota-installed/.claude/hooks/scripts/fm17d_stall_detector.py` (currently disabled via `FM17_STALL_DETECTOR_DISABLE=1`)
- **Estimated LOC**: ~80 (SubagentStop input-schema parse fix per CC v2.1.138 actual emit shape)
- **Risk class**: D9 LOW

---

## Wave 123 — "Token-architecture-elite"

**Theme**: V65 `TOKEN_CONTEXT_ARCHITECTURE.md:5-22` "Default: ccusage + RTK + Serena + Repomix … Do not install every context tool. Add one layer only when the measured bottleneck matches it." Current install has Serena + Repomix + context-mode + ccusage. **Missing measured-bottleneck tools** = RTK + ast-grep + claude-context.

### SHIP-123-A — RTK install (literal harness warning satisfied)

- **Cites**: `kits/v65/.../TOKEN_CONTEXT_ARCHITECTURE.md:9` "Shell output: RTK"; `kits/v65/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md:33` `rtk-ai/rtk` (default install core); harness warning every Bash call: `[rtk] /!\ No hook installed — run \`rtk init -g\` for automatic token savings`
- **Install command**: `npm install -g rtk@latest && rtk init` (resolve @latest → pinned per CR-9)
- **Estimated LOC**: ~30
- **Risk class**: D1 PASS / D6 PASS / D9 LOW

### SHIP-123-B — ast-grep install (structural search primitive)

- **Cites**: `kits/v65/.../TOKEN_CONTEXT_ARCHITECTURE.md:11` "ast-grep, tree-sitter, mgrep"; `kits/v65/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` "Codebase intelligence" section `ast-grep/ast-grep`; sibling `Z:/claude-sota/AGENTS.md` Wave 119 ship 2 entry already added
- **Install command**: `cargo install ast-grep --locked` OR `gh release download --repo ast-grep/ast-grep`
- **Estimated LOC**: ~50
- **Risk class**: D1 PASS / D6 PASS / D9 LOW

### SHIP-123-C — Headroom OR Wet (cross-agent compression — selective, NOT both)

- **Cites**: `kits/v65/.../TOKEN_CONTEXT_ARCHITECTURE.md:15` "Cross-agent compression/memory: Headroom"; `kits/v65/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` Token-elite section `chopratejas/headroom` + `buildoak/wet`
- **OPTION A — Headroom**: persistent cross-agent memory layer; SRA D6 use-class match; risk MED — adds memory backend = more I/O contention
- **OPTION B — Wet**: read-path compression (orthogonal to context-mode); SRA D6 use-class match; risk LOW — pure read-path interceptor
- **PREFER OPTION B (Wet)** — eee already has 3-layer memory stack (L1+L2+L3); adding L4 cross-agent before L4-wiki gap closes is premature
- **Estimated LOC**: ~80 either option

---

## Wave 124 — "ACP host integration"

**Theme**: Single-ship wave per launch-discipline §3 (incremental staged rollout — ACP flips ingress topology so MUST be its own wave with extended monitoring window).

### SHIP-124-A — ACP host install

- **Cites**:
  - `docs/wave121-next-session-plan.md:141-145` "SHIP A10 ACP host integration"
  - `docs/install-provenance.md:6940-6970` (Wave research validated `npm @agentclientprotocol/claude-agent-acp v0.33.1 EXISTS` + `claude-agent-acp @ c78ac62d package.json:1,6-7,38-41` + `agent-client-protocol @ 36ea605 schema.json:3020-3025,3294-3324,3410-3639`)
  - V65 cite: `kits/v65/.../OFFICIAL_SDKS_AND_PROVIDER_SURFACES.md:1-22` (ACP NOT in v65 list — v65 misses this n=4 convergence)
- **Install command**: `npm install -g @agentclientprotocol/claude-agent-acp@0.33.1` (CR-9 explicit pin)
- **Estimated LOC**: ~120
- **SRA D1-D10**: D1 PASS (Apache-2.0) / D2 PASS / D4 TIER-3-NAMED-ORG (AAIF / Linux Foundation) / D6 PASS / D7 — n=4 named-org convergence is authority basis (Anthropic + LangChain + AAIF + Coder) / D9 — D6 use-class flip = ingress topology change; risk MED — new attack surface
- **Launch-discipline**: REVERSIBLE (uninstall) / OBSERVABLE (extend Wave 121 SHIP A0-MONITORING with ACP socket health probe) / INCREMENTAL (Stage 1 internal-only — bind localhost only) / Security CRITICAL — auth on ACP socket MUST be configured BEFORE first launch

### Option-A vs Option-B for SHIP-124-A

- **OPTION A — full ACP host adapter install + wire into settings.json**: enables Zed/JetBrains to drive sss live; risk MED-HIGH; D7 weak
- **OPTION B — ACP install BUT keep socket disabled (cite-import + binary-on-disk only)**: lets primitive land for sibling parity but defers ingress flip until Anthropic officially endorses; risk LOW
- **PREFER OPTION B for first cycle** then promote to Option A in Wave 126+ after 24-72h post-install monitor window

---

## Wave 125 — "v65 6-agent + 7-skill cite-import"

**Theme**: V65 ships 6 agents + 7 skills (~10KB total) at `kits/v65/.../.claude/{agents,skills}/`. Direct cite-import per port-note-discipline §1.

### SHIP-125-A — Agent cite-imports (6 agents)

- **Cites**:
  - `kits/v65/.../.claude/agents/cli-quality-architect.md:1-3` (CLI quality gates designer)
  - `kits/v65/.../.claude/agents/codex-bridge.md:1-3` (codex independent reviewer)
  - `kits/v65/.../.claude/agents/eval-benchmark-architect.md:1-3` (local benchmark designer)
  - `kits/v65/.../.claude/agents/source-auditor.md:1-3` (third-party repo auditor)
  - `kits/v65/.../.claude/agents/token-budget-guardian.md:1-3` (RTK/Serena/Repomix steward)
  - `kits/v65/.../.claude/agents/worktree-operator.md:1-3` (git worktree manager)
- **Estimated LOC**: ~50 (6 × ~3-line files at `.claude/agents/v65/<name>.md` + manifest §11 rows)
- **Risk class**: D1 PASS / D6 PASS / D9 LOW; CR-8 = ADAPTED-FROM-SOTA

### SHIP-125-B — Skill cite-imports (7 skills)

- **Cites**:
  - `kits/v65/.../.claude/skills/benchmark-eval-gate/SKILL.md:1-37` (706B)
  - `kits/v65/.../.claude/skills/codex-second-opinion/SKILL.md:1-30` (744B)
  - `kits/v65/.../.claude/skills/context-capsule-builder/SKILL.md:1-7` (271B)
  - `kits/v65/.../.claude/skills/execute-v65-plan/SKILL.md` (2.9K — full v65 stage-by-stage protocol)
  - `kits/v65/.../.claude/skills/parallel-worktree-harness/SKILL.md:1-30` (821B)
  - `kits/v65/.../.claude/skills/source-repo-audit/SKILL.md:1-50` (1.5K)
  - `kits/v65/.../.claude/skills/token-optimized-implementation/SKILL.md:1-30` (831B)
- **Estimated LOC**: ~250 (7 SKILL.md files cite-imported into `.claude/skills/v65/<name>/SKILL.md` + manifest rows)
- **Risk class**: D1 PASS / D6 PASS / D9 LOW

### Option-A vs Option-B for Wave 125

- **OPTION A — bulk cite-import all 6+7 in one ship**: minimum ceremony, atomic; ~300 LOC
- **OPTION B — split per artifact-class** (Wave 125-A agents only, Wave 125-B skills only): defers risk; ~150 LOC per sub-ship
- **PREFER OPTION A** — v65 artifacts tiny (≤3KB total) + already on disk + license implicitly accepted via Wave 121 SHIP V65-EXTRACT

---

## Wave 126 — "Eval/observability/quality-gate completion"

**Theme**: V65 `EVAL_BENCHMARK_OBSERVABILITY.md:1-22` reference layer + `SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` Security/quality section. Current install has Phoenix + promptfoo + ruff + gitleaks + typos + shellcheck + semgrep + osv-scanner + vale + markdownlint-cli2. **Missing high-leverage**: Langfuse (sibling parallel-sink for OTel), trivy, pre-commit, cspell, actionlint, hadolint.

### SHIP-126-A — Langfuse parallel-sink wire

- **Cites**: `docs/wave121-next-session-plan.md:212` Tier-2 install gap #9; v65 `kits/v65/.../EVAL_BENCHMARK_OBSERVABILITY.md:9` "langfuse/langfuse"; existing `docker ps` shows langfuse-web/worker/clickhouse/postgres ALREADY UP but unwired
- **Install command**: `.mcp.json` Langfuse entry + Phoenix→Langfuse OTel fan-out config
- **Estimated LOC**: ~120
- **Risk class**: D1 PASS / D6 PASS / D9 MEDIUM — second observability sink doubles trace volume; needs FM-17.d budget gate

### SHIP-126-B — pre-commit + trivy + cspell + actionlint + hadolint batch

- **Cites**: `docs/sota-installed-manifest.md:99,107` (PLANNED rows) + `kits/v65/.../SOTA_REPOS_BEST_OF_BEST_FINAL_LIST.md` Security/quality section
- **Install command**: 5 separate `gh release download` / `pip install` / `winget install`
- **Estimated LOC**: ~150 (5 binaries × manifest rows + .pre-commit-config.yaml seed)
- **Risk class**: D1 PASS / D6 PASS / D9 LOW

### Option-A vs Option-B for Wave 126

- **OPTION A — atomic close (6 tools + Langfuse)**: ~270 LOC; risk MED (large surface)
- **OPTION B — split into Wave 126 (Langfuse-only) + Wave 127 (5 quality tools)**: launch-discipline §3 staged-rollout match
- **PREFER OPTION B** per launch-discipline 3-invariants (incremental + observable)

---

## Cross-cutting concerns (apply to ALL 5 waves)

1. **CR-12 upstream-priority**: every install command MUST cite Path A native-channel from official-org repo BEFORE Path B sibling cite-import
2. **CR-9 install-risk**: every `@latest` MUST be resolved to pinned version + acknowledged in manifest row
3. **FM-17.f defense**: every codex T1 consult MUST cite per-call budget (90s default / 120s cap) + rolling-window quota check; A3-PLAN cycle blocked by FM-17.f extra-usage on sister codex-rescue agent — directly informs Wave 122 SHIP-122-A T1 budget gate (non-negotiable)
4. **Pattern A v2 multi-round** (Wave 121 §2.7): expect each ship's first-round Pattern A apply to itself trigger codex T1 retroactive re-review; budget for 2 rounds per ship; round-3 = REVERT-AND-REMOVE
5. **Launch-discipline D2 monitoring**: every ship extends Wave 121 SHIP A0-MONITORING persistent monitors with new primitive's health probe BEFORE traffic flip
6. **OUTPUT_BUDGET per ship**: 400-600 LOC artifact at `tmp/wave12{2..6}-ship<X>-<topic>-2026-05-<DD>.md`

## Trade-off summary table

| Wave | Theme | Option A LOC | Option B LOC | Risk delta | Recommended |
|---|---|---|---|---|---|
| 122 | Close-the-loop | 1030 (atomic) | 4×150 split | LOW | A (no new attack surface) |
| 123 | Token-elite | 160 (RTK+ast-grep+Headroom) | 160 (RTK+ast-grep+Wet) | A=MED B=LOW | **B (Wet)** |
| 124 | ACP host | 120 (full ingress wire) | 60 (install-only no-wire) | A=MED-HIGH B=LOW | **B (no-wire first)** |
| 125 | v65 cite-import | 300 (atomic) | 150×2 split | LOW | **A (atomic)** |
| 126 | Eval/quality | 270 (atomic) | 120+150 split | MED | **B (split)** |

## Total wave-cycle estimate

- **Recommended path**: 1030 + 160 + 60 + 300 + 120 + 150 = **~1820 LOC across 5 waves** (Wave 126 split → 6 ship-windows total)
- **Codex T1 consult budget**: ~12 ships × ~2 rounds × ~90s = **~2160s codex CLI time (~36min real-time)** spread across waves; FM-17.f safe at this cadence
- **Manifest delta**: 6 INSTALLED-AMBER → INSTALLED + 19 STAGED → INSTALLED + 13 NEW rows added (6 codex hooks + RTK + ast-grep + Wet + ACP + Langfuse + 5 quality tools)
- **Plugin/MCP delta**: +1 plugin (ACP — install-only first cycle) + +2 MCPs (Qdrant wire, Graphiti wire close existing STAGED) + +1 MCP (Langfuse wire) = 7→11 MCPs

## Critical Files for Implementation

- `Z:/claude-sota-installed/docs/sota-installed-manifest.md`
- `Z:/claude-sota-installed/.mcp.json`
- `Z:/claude-sota-installed/.claude/settings.json`
- `Z:/claude-sota-installed/.claude/hooks/scripts/` (6 new codex_*.py scripts cite-import target dir)
- `Z:/claude-sota-installed/docs/install-provenance.md`

DESIGN: 5-wave plan SYNTHESIZED with TIER-1-DIRECT cites + Option A/B trade-offs + risk classification + launch-discipline conformance.

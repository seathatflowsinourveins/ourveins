# Current-State Baseline — eee Runtime Architecture Inventory

**Snapshot time:** 2026-05-10 (Wave 134 Fire 2)
**Method:** Direct probes via `ctx_batch_execute` against `.claude/settings.json` + `.mcp.json` + plugin cache dirs

> Cross-ref `00-master-tracker.md` for methodology + 8-axis architecture dimension framework + SRA D1-D10 verdict gate.
> Per `port-note-discipline.md §6`: this is a SNAPSHOT in time; future drift NOT retroactively re-written here — append corrections instead.

---

## §1 — Topology / orchestration (Dimension 1)

### Current primitives

| Primitive | Source | Status | Notes |
|---|---|---|---|
| Claude Code CLI v2.1.x | Anthropic OFFICIAL | INSTALLED | binary at user PATH, env-block per CCBP `claude-settings.md:877-921 @ 64fffd53` |
| eee launcher | bootstrap (`tools/eee.ps1`) | INSTALLED | per CR-5 hand-coded exception (cannot be installed; calls upstream `claude.exe` after env setup) |
| codex CLI v0.130.0 | OpenAI OFFICIAL | INSTALLED | `npm install -g @openai/codex` |
| codex-plugin-cc | openai-codex marketplace | INSTALLED | `/plugin install codex@openai-codex@1.0.4` |
| superpowers v5.1.0 | claude-plugins-official | INSTALLED | 14 skills (workflow grammar: brainstorming → writing-plans → SDD → TDD → review → finishing) |
| Agent tool fan-out | Anthropic CC builtin | NATIVE | `Agent({subagent_type, prompt})` with `isolation: worktree` per `parallel-agent-wave.md` |
| Subagent skills (advanced-agent-team-standing-directive) | sibling cite-import-AMBER | LOADED | 3-5 agent waves, BRIDGE-MODE for ≥2 |
| /loop autonomous arc | Anthropic CC builtin | NATIVE | runtime-driven cron-style |
| ralph-loop plugin | claude-plugins-official | INSTALLED | persistent loop pattern |
| cwc-long-running-agents 5 primitives | anthropics OFFICIAL | INSTALLED at `.local/cwc/` | Default-FAIL / Fresh-context evaluator / PROGRESS.md handoff / Kill-switch / Steer mid-run |

### Dimension 1 scoring (preview — full SRA in 02-gap-matrix.md)

- **Anthropic CC binary**: D1✅ D2✅ (active dev) D6✅ D7✅ → INSTALL — locked
- **Subagent fan-out**: native primitive; no replacement candidate
- **cwc-long-running primitives**: D1✅ D2✅ D4✅(T1 OFFICIAL) D6✅ D7✅ — fully aligned
- **ralph-loop plugin**: D1✅ D6✅ — keeper (orthogonal to /loop)

### KNOWN GAPS

- **No formal eval-as-orchestrator pattern** (e.g., GAN harness from ECC). Currently relies on operator-driven /loop convergence.
- **No DAG mission dispatcher mechanism** — DevFleet plugin from ECC is reference-only (MCP backend not wired per `team-orchestration.md §Reference-only ECC skills NOT wired in sss`).
- **Single-level fork invariant** is policy-only — no mechanical enforcement (subagents could in principle spawn grandchildren).

---

## §2 — Memory / knowledge (Dimension 2)

### Current primitives

| Layer | Primitive | Source | Version | Status |
|---|---|---|---|---|
| **L1 capture** | doobidoo/mcp-memory-service | PyPI | v10.51.3 | INSTALLED (sqlite_vec backend at `Z:/claude-sota-installed-state/.mcp-memory/memory.db`) |
| **L2 vector** | qdrant/qdrant Docker | dockerhub | v1.17.0 | STAGED-IMAGE-RUNNING (container UP; MCP wiring NOT in `.mcp.json` yet) |
| **L3 temporal-KG (Graphiti)** | getzep/graphiti | PyPI | v0.29.0 | PARTIAL (FalkorDB v1.6.1 UP at port 16379; MCP wiring incomplete; needs `OPENAI_API_KEY` for embeddings) |
| **L4 wiki** | Karpathy gist guide-class | github | n/a | CITE-ONLY (no install-class equiv) |
| Repomix MCP | mcp-style | npm | latest | INSTALLED (in `.mcp.json`) |
| Serena MCP (LSP) | uvx | latest | INSTALLED (pinned per `_comment_serena_pin`) |
| context7 MCP | docs lookup | http | n/a | INSTALLED (in `.mcp.json`) |
| deepwiki MCP | docs lookup | http | n/a | INSTALLED (in `.mcp.json`) |

### KNOWN GAPS

- **L2 Qdrant MCP wiring**: container UP but not exposed via MCP — operator can't `mcp__qdrant__*` query
- **L3 Graphiti MCP wiring blocked on `OPENAI_API_KEY`**: 12+ Graphiti tools invisible despite backend UP
- **No L4 wiki implementation**: Karpathy's wiki pattern is documented in skills but not operationalized as a primitive
- **No semantic-router** (claude-side dispatch layer per task #61 — pending)
- **No lateral cognee/cognee-mcp** (BLOCKED until SOTA HTTP-supervisor migration per `iter3a-install-plan.md §C1`)

---

## §3 — Cross-model verification (Dimension 3)

### Current primitives

| Primitive | Source | Status | Cite |
|---|---|---|---|
| codex T1 pre-edit consult gate | sibling cite-import-AMBER | INSTALLED-AMBER (warns but doesn't block in default mode) | `.claude/hooks/scripts/codex_t1_consult_gate.py` |
| codex T2 pre-commit gate | sibling cite-import-AMBER | INSTALLED-AMBER | `.claude/hooks/scripts/codex_t2_pre_commit_gate.py` |
| codex T3 postcommit auto | sibling cite-import-AMBER | INSTALLED-AMBER | `.claude/hooks/scripts/codex_postcommit_review.py` |
| codex T4 post-push cumulative | sibling cite-import-AMBER | INSTALLED-AMBER | `.claude/hooks/scripts/codex_prepush_review.py` |
| codex T5 plan-stage `/plan-codex-review` | sibling cite-import-AMBER | (status PENDING) | sibling-rule reference |
| codex T6 stop-gate | sibling cite-import-AMBER | INSTALLED-AMBER | `.claude/hooks/scripts/codex_stop_review_gate.py` |
| codex T7 ask-without-act gate | sibling cite-import-AMBER | INSTALLED-AMBER | `.claude/hooks/scripts/auto_proceed_gate.py` |
| Pattern A fix-forward | sibling rule | LOADED | `codex-t1-fix-forward-pattern.md` |
| Pattern B HNF disposition | sibling rule | LOADED | same |
| FM-17 fleet-depletion (a/b/c/d/e/f sub-classes) | sibling rule | LOADED | `fm17-subagent-fleet-depletion.md` |
| BRIDGE-MODE GPT-5.5 dispatch | wrapper around `codex exec` | LIVE per Wave 130/132/133 fires | `cross-model-consensus.md §Profile selection rule` |
| Path P (codex exec foreground+tee) | TIER-1-DIRECT recovery path | OPERATIONAL | `cross-model-consensus.md §"On codex unavailable"` |
| Path D (`CLAUDE_CODE_DISABLE_1M_CONTEXT=1`) | TIER-1-DIRECT recovery path | UNSET (default) | `CLAUDE.local.md` ENV (h) |

### KNOWN GAPS

- **T1 in WARN mode by default** (not STRICT/FAIL_CLOSED) per current `CODEX_T1_GATE_STRICT` env
- **T5 plan-stage gate**: PENDING (slash command `/plan-codex-review` referenced but install status unclear)
- **No automated cross-model verdict-aggregation primitive** (operator manually reads verdict files, no aggregation hook)
- **codex T1 timeout HONEST-NON-FINDING discipline**: relies on operator following Pattern B; no mechanical fallback
- **FM-17.f billing-class blocker** (n=3 same-arc 2026-05-09): partial mitigation via Path P; Path D requires explicit env opt-in

---

## §4 — Plugin / skill ecosystem (Dimension 4)

### Current state — 26 plugins enabled / 1 disabled

```
ENABLED (26):
  agent-sdk-dev@claude-plugins-official
  agent-skills@addy-agent-skills            ← 21 engineering-phase skills (Addy Osmani)
  claude-code-setup@claude-plugins-official
  claude-md-management@claude-plugins-official
  clickhouse@claude-plugins-official
  code-modernization@claude-plugins-official
  code-review@claude-plugins-official
  code-simplifier@claude-plugins-official
  codex@openai-codex                        ← T1-T7 backbone
  commit-commands@claude-plugins-official
  context-mode@context-mode                  ← LARGE (1.0.111 — token-savings)
  cwc-makers@claude-plugins-official
  everything-claude-code@everything-claude-code  ← ECC v2.0.0-rc.1 (CR-9 RC risk)
  feature-dev@claude-plugins-official
  frontend-design@claude-plugins-official
  mcp-server-dev@claude-plugins-official
  outputai@claude-plugins-official
  playground@claude-plugins-official
  plugin-dev@claude-plugins-official
  pr-review-toolkit@claude-plugins-official
  pyright-lsp@claude-plugins-official
  qdrant-skills@claude-plugins-official
  ralph-loop@claude-plugins-official
  session-report@claude-plugins-official
  skill-creator@claude-plugins-official
  superpowers@claude-plugins-official        ← 14 workflow-grammar skills (obra)

DISABLED (1):
  hookify@claude-plugins-official            ← runtime-spam gen — fixed W134-F2
```

### Skill ecosystem (per claude-sota CLAUDE.md §"Skill orchestration discipline")

- **1,556 SKILL.md** files across 21 active plugins + 14 marketplaces
- **4 meta-skills active**: `using-superpowers` (1% rule) / `using-agent-skills` (Osmani discovery) / `skill-comply` (post-invoke verify) / `skill-creator` (authoring loop)
- **Subagent dispatch** via Agent tool with `isolation: worktree` (per `parallel-session-worktree-isolation.md`)

### Plugin cache (1-deep)

```
addy-agent-skills/         ← 21 engineering-phase skills
claude-plugins-official/   ← 24 official plugins (incl. superpowers, codex, hookify-DISABLED)
context-mode/              ← v1.0.111 token-saving primitive
everything-claude-code/    ← ECC v2.0.0-rc.1 — 60+ skills
openai-codex/              ← codex@1.0.4 plugin
```

### KNOWN GAPS

- **mattpocock/skills (62k★ MIT)**: PLANNED in §3 manifest, NOT YET INSTALLED (Section 3 manifest)
- **VoltAgent/awesome-openclaw-skills**: REFERENCE-ONLY (Claude-derivative, not direct-Claude)
- **garrytan/gbrain + gbrain-evals**: TIER-1 mega-exemplar per `convergence-gate.md` §"Anti-pattern Row-2 fabrication-test FAIL"; cite-only, not adopted
- **Hookify** is the ONLY disabled plugin — DISABLED for `CLAUDE_PLUGIN_ROOT`-not-exported failure (W134-F2 patched; can re-enable after CC restart)

---

## §5 — Hooks / gates (Dimension 5)

### Current state — 23 PreToolUse hooks across 7 matchers

```
PreToolUse: 7 matchers / 23 hooks
  Edit|Write|MultiEdit:    2 hooks  (codex T1 + impact-guard)
  ExitPlanMode:            1 hook
  Agent:                   1 hook   (worktree-verify-gate)
  *:                       2 hooks  (universal pre-checks)
  Read:                    1 hook
  Write|Edit|MultiEdit:    1 hook
  Bash:                   15 hooks  (HEAVY — codex T2 + safety_guard + agent_plan_readonly + ...)
PostToolUse: 3 matchers / 15 hooks
  Bash:                   13 hooks  (HEAVY — codex T3/T4 audit + ruff/pyright/shellcheck/healthcheck)
  Edit|Write|MultiEdit:    1 hook
  Agent:                   1 hook
PostToolUseFailure: 1
SessionStart: 2
SessionEnd: 1
Stop: 1
SubagentStop: 1
UserPromptSubmit: 1
```

### Layered Gates Architecture (per `layered-gates-architecture.md` §1 — 5 layers)

| Layer | Event | Role | Sync mode | Status |
|---|---|---|---|---|
| 0 | (pre-session) | Worktree isolation | structural | NATIVE (`eee --worktree`) |
| 1 | PreToolUse | Front gates: observers + asyncRewake | sync OR asyncRewake | INSTALLED-AMBER |
| 2 | PreToolUse `Bash(git commit *)` | Commit-gate enforcer | sync, STRICT, FAIL_CLOSED | INSTALLED (codex T2) |
| 3 | PostToolUse | Audit trail | async | INSTALLED-AMBER |
| 4 | Stop | Session-end enforcer | sync, deep-review-exec | INSTALLED-AMBER |

### KNOWN GAPS

- **Hookify W134-F2 fixed** but plugin still DISABLED in settings; fix is for cache-renewal resilience only
- **Several hooks `INSTALLED-AMBER`**: technically wired but `STRICT` env not set for key ones
- **`fm17d_stall_detector.py` is DISABLED** per `FM17_STALL_DETECTOR_DISABLE=1` (schema-rot in CC v2.1.119/132 SubagentStop input shape)
- **5 ECC hooks disabled** per `ECC_DISABLED_HOOKS` (overhead-justified; doc-warning + JS/TS-targeted hooks irrelevant in this Anthropic-CC runtime)
- **gateguard-fact-force**: known overhead-class hook silenced

---

## §6 — Eval / benchmark / observability (Dimension 6)

### Current primitives

| Primitive | Source | Status |
|---|---|---|
| promptfoo | npm | INSTALLED v0.121.11 |
| deepeval | PyPI | INSTALLED v4.0.0 |
| openlit (OTel-native) | PyPI | INSTALLED-PILOT (Wave 109; Apache-2.0) |
| Phoenix MCP | http | INSTALLED (in `.mcp.json`) |
| ccusage | npx (zero-install) | INSTALLED |
| codex_review JSONL trail | local hooks | OPERATIONAL (`.claude/state/codex_review_HEAD_*.txt`) |
| MEMORY.md decision-history index | local | OPERATIONAL |
| `tmp/wave*-*.md` ARTIFACT-INLINE | per `fm19-readonly-guard-sidestep.md` | OPERATIONAL |
| OTEL_EXPORTER_OTLP_TRACES_ENDPOINT | env-set | configured (per env vars) |

### KNOWN GAPS

- **No SWE-bench / BrowseComp / GAIA / HumanEval scaffold** (per `iter3a-install-plan.md §C4`: REJECTED-as-out-of-runtime-scope)
- **No persistent regression eval suite** (each fire's smoke-probes are ad-hoc)
- **Phoenix observability UNDER-utilized** (per Wave 119 Ship 4 honest-correction)
- **Langfuse / OpenLLMetry**: NOT INSTALLED (potential SOTA candidate per Wave 47 grand catalog)
- **No formal benchmark CI** (e.g., `evals/run_codex_miss_eval.py` Phase 1 from cross-model-consensus is parent-side reference)

---

## §7 — Token efficiency (Dimension 7)

### Current primitives

| Primitive | Source | Status |
|---|---|---|
| RTK | github (binary on disk) | INSTALLED — token-saving CLI; init pending per task #61 |
| ccusage | npx | INSTALLED — usage analyzer |
| context-mode plugin | context-mode marketplace | INSTALLED v1.0.111 — keeps raw tool output in sandbox; only printed summary enters context |
| repomix MCP | npm | INSTALLED — pack→grep→skill pattern per `research-protocol.md §"Repomix Pack→Grep→Skill sub-rule"` |
| `/compact` + `/rewind` discipline | Anthropic CC builtin | NATIVE per `coordination.md §12 rewind-first` |
| ENABLE_PROMPT_CACHING_1H | env | SET |
| ENABLE_TOOL_SEARCH | env | SET (deferred-tools mechanism) |
| MAX_MCP_OUTPUT_TOKENS | env | SET |
| BASH_MAX_OUTPUT_LENGTH | env | SET |
| ANTHROPIC_SMALL_FAST_MODEL | env | SET (haiku for inline hook eval) |
| CLAUDE_AUTOCOMPACT_PCT_OVERRIDE | env | SET |
| asyncRewake hook pattern | per `layered-gates-architecture.md §2` | OPERATIONAL |

### KNOWN GAPS

- **RTK init pending** — binary on disk but not wired (task #61 STAGE-2)
- **No BMAD-METHOD or OpenSpec** workflow primitives (per `iter3a-install-plan.md §A4-B2`)
- **No semantic-router** (Wave 118 Ship A4 PILOT pending — claude-side dispatch layer)
- **No deepagents-style pre-emptive arg truncation middleware** for long arcs (cite-only per `team-orchestration.md §"Pre-emptive arg truncation discipline"`)

---

## §8 — Research / discovery architecture (Dimension 8)

### Current primitives

| Primitive | Source | Status |
|---|---|---|
| sota-researcher subagent | sibling cite-import-AMBER | LOADED (acts as Tier-1b research-then-install primitive per `research-protocol.md §3 Pre-empt`) |
| Probe DAG (P1 LICENSE → P2 registry → P3 plugin-namespace → P4 GraphQL → P5 README → P6 deep audit) | sibling rule | LOADED |
| 9-cohort fan-out menu | CLAUDE.md §"SOTA Repository Discovery" L99-110 | LOADED (C1-C9; ≥2-cohort mandate per cite) |
| T0 candidate-list challenge | sibling cross-model-consensus.md §T0 | OPERATIONAL (cost-gated; foreground+tee invocation) |
| 6 ecosystem catalogs | per `research-protocol.md §"Curated CC-ecosystem catalogs"` | LOADED (awesome-agentic-patterns / awesome-agent-skills / awesome-claude-code / claude-skills / ComposioHQ + sickn33) |
| 4-MCP ecosystem crawl | github + exa + perplexity + firecrawl | OPERATIONAL |
| **SOTA Research Architecture (SRA) 10-dimension gate** | local rule (`sota-research-architecture.md`) | LOADED 2026-05-10 (this fire) |
| Mia pre-apply discipline | sibling rule | OPERATIONAL (n=130+ ladder) |
| FM-09 codex-rescue blind-spot specialization (n=5/5 same-arc) | sibling rule | LOADED |
| FM-20 path-drift cascade defense | sibling rule | LOADED (n=5 cumulative) |
| advanced-agent-team-standing-directive (3-5 agents per fire, BRIDGE-MODE for ≥2) | sibling rule | LOADED |
| `parallel-agent-wave.md §CADP rules 2-5` (max 3 concurrent / max 5 cumulative) | sibling rule | LOADED |

### KNOWN GAPS

- **No mechanical SRA verdict-aggregator** (operator runs SRA per-candidate manually)
- **codex T1 cite-discovery latency** (Pattern B HNF) — research budget can exhaust without verdict landing
- **Research provenance tracking is per-wave** (not persistent across waves) — `MEMORY.md` indexes one-line entries; full ARTIFACT-INLINE returns live in `tmp/wave<N>-*.md`
- **No automated kit-extract pipeline**: v63/v64/v65 zips were extracted manually per task #74

---

## Inventory totals

- **Plugins**: 26 enabled / 1 disabled / 11 marketplaces registered (5 with cached content)
- **MCP servers**: 10 active (context7, deepwiki, github, gitnexus, graphiti, memory, phoenix, playwright, repomix, serena) + 0 explicitly disabled (was 4-5 in Wave 50; resolved post-Wave-100)
- **Hooks**: 23 PreToolUse + 15 PostToolUse + 2 SessionStart + 1 each {SessionEnd, Stop, SubagentStop, UserPromptSubmit, PostToolUseFailure} = 45 total hook entries
- **Env vars**: 35 explicit (excluding `_comment_*`)
- **Cardinal rules**: 12 (CR-1 through CR-12) per `CLAUDE.md`
- **eee runtime rules** (separate from inherited claude-sota rules): 3 (`sota-research-architecture.md` + `deprecation-discipline.md` + `launch-discipline.md`)
- **Memory layers**: L1 INSTALLED + L2 STAGED-RUNNING-PARTIAL + L3 PARTIAL-PENDING-MCP-WIRE + L4 CITE-ONLY
- **Cumulative dogfood**: Wave 132/133 closed (n=130+ Mia ladder); Wave 134 Fire 2 active

---

## What's covered vs uncovered (vs operator directive)

### COVERED (current eee already has)
- ✅ Cross-model verification (T1-T7)
- ✅ Plugin / skill discovery (1,556 SKILL.md, 4 meta-skills)
- ✅ Memory L1+L2 (Qdrant pending MCP-wire)
- ✅ Long-running agent primitives (cwc 5)
- ✅ Worktree isolation
- ✅ SRA 10-dimension gate (loaded 2026-05-10)
- ✅ 6-ecosystem catalog discovery surface
- ✅ Pattern A fix-forward + Mia pre-apply + FM catalog

### PARTIAL (current has, but gaps)
- 🟡 Memory L3 (Graphiti — needs OPENAI_API_KEY for embeddings)
- 🟡 Memory L4 (wiki — pattern documented, no install-class)
- 🟡 RTK token-savings (binary INSTALLED, init pending)
- 🟡 Eval scaffolds (promptfoo + deepeval shipped; no formal regression CI)
- 🟡 Observability (openlit + phoenix INSTALLED-PILOT; under-utilized)
- 🟡 codex T1/T2/T3/T4/T6/T7 in WARN-not-STRICT mode
- 🟡 Permission mode `bypassPermissions` (W82d operator override; revert target = `auto` post-classifier-stable)

### UNCOVERED (target SOTA — proposed in 03-sota-target-architecture.md)
- ❌ Mechanical SRA verdict aggregator
- ❌ semantic-router claude-side dispatch
- ❌ deepagents-style pre-emptive arg truncation
- ❌ Persistent regression eval CI
- ❌ DAG mission dispatcher (devfleet MCP backend not wired)
- ❌ Cognee HTTP-supervisor migration
- ❌ Multi-org plugin install (mattpocock/skills, others)
- ❌ Wiki layer (L4 implementation)
- ❌ Automated kit-extract pipeline
- ❌ T5 plan-stage `/plan-codex-review` slash command (status unclear)

---

## Sources

- Manifest: `Z:\claude-sota-installed\docs\sota-installed-manifest.md` (single source of truth)
- Provenance: `Z:\claude-sota-installed\docs\install-provenance.md` (append-only install log)
- Inspiration: `Z:\claude-sota-installed\docs\outer research\` (kits v10-v65, wave52 iter1a-3a, archives)
- CLAUDE.md cardinal rules: `Z:\claude-sota-installed\CLAUDE.md` (12 rules)
- Sibling rules: `Z:\claude-sota\.claude\rules\*.md` (cite-import-AMBER per CR-9 + CR-12)

